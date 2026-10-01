import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell.jsx'
import { LeaderboardTable } from '../components/LeaderboardTable.jsx'
import { leaderboard as fallbackLeaderboard } from '../data/leaderboard.js'
import { games } from '../data/games.js'
import { apiBank, apiCheckQuestion, apiAddXp, apiLeaderboard } from '../lib/api.js'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './arcade.css'
import './quiz.css'

export default function Arcade() {
  const [params] = useSearchParams()
  const view = params.get('view')
  const gameId = params.get('game')

  // leaderboard view
  if (view === 'leaderboard') {
    return <LeaderboardView />
  }

  // game play view
  const game = games.find((g) => g.id === gameId) || games[0]
  const subjectKey = params.get('subject') || 'all'
  return (
    <AppShell icon="sports_esports" title={game.title} sidebarVariant="arcade">
      <ArcadeHud />
      <GamePlayer key={`${game.id}-${subjectKey}`} game={game} />
    </AppShell>
  )
}

function LeaderboardView() {
  const [rows, setRows] = useState(
    fallbackLeaderboard.map((r, i) => ({ ...r, name: r.name, badge: r.badge || 'Pelajar', rank: i + 1 }))
  )
  useEffect(() => {
    let cancelled = false
    apiLeaderboard()
      .then((data) => {
        if (cancelled) return
        setRows(
          data.map((u, i) => ({
            rank: i + 1,
            name: u.displayName || u.username,
            badge: 'Pelajar',
            streak: u.streak,
            xp: u.xp,
          }))
        )
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])
  return (
    <AppShell icon="leaderboard" title="Papan Peringkat" sidebarVariant="arcade">
      <div className="page-head">
        <h2>Papan Peringkat</h2>
        <p className="muted">Top 10 pelajar SmartBrain DPLI dengan XP tertinggi.</p>
      </div>
      <div className="card">
        <LeaderboardTable data={rows} full />
      </div>
    </AppShell>
  )
}

function ArcadeHud() {
  const { user } = useAuth()
  return (
    <div className="arcade-hud">
      <span className="ah-chip">{(user?.xp || 0).toLocaleString()} XP · Tahap {user?.level || 1}</span>
      <div className="xp-bar-track"><div className="xp-bar-fill" style={{ width: `${((user?.xp || 0) % 500) / 5}%` }} /></div>
      <span className="ah-progress">{(user?.xp || 0) % 500} / 500</span>
    </div>
  )
}

const MODE_COUNT = {
  quick: 10,
  myth: 8,
  sprint: 20,
  blitz: 20,
  boss: 15,
  survival: 8,
}

function GamePlayer({ game }) {
  const { lang, t } = useLang()
  const [params] = useSearchParams()
  const arcadeSubject = params.get('subject') || 'all'
  const questionCount = MODE_COUNT[game.id] || game.questions || 10

  const getInitialTime = () => {
    if (game.mode === 'sprint') return 30
    if (game.mode === 'blitz') return 60
    if (game.mode === 'boss') return 25
    return 0
  }

  const [bank, setBank] = useState([])
  const [bankReady, setBankReady] = useState(false)
  const [correctIdx, setCorrectIdx] = useState({})
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(getInitialTime)
  const [lives, setLives] = useState(3)
  const [round, setRound] = useState(0)
  const [bossHP, setBossHP] = useState(100)
  const [playerHP, setPlayerHP] = useState(100)
  const [answerLocked, setAnswerLocked] = useState(false)
  const [selectedOpt, setSelectedOpt] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const chosenRef = useRef({})
  const [reviewTab, setReviewTab] = useState('result')
  const xpGainedRef = useRef(0)

  const isMyth = game.id === 'myth'

  // Load question bank from the API (no answers), then resolve correct indices
  // for myth mode via the server check endpoint.
  useEffect(() => {
    let cancelled = false
    setBankReady(false)
    apiBank(arcadeSubject, questionCount)
      .then((rows) => {
        if (cancelled) return
        setBank(rows)
        setBankReady(true)
        if (game.id === 'myth') {
          rows.forEach((q, qi) => {
            resolveCorrect(q.id, qi)
          })
        }
      })
      .catch(() => { if (!cancelled) setBank([]) })
    return () => { cancelled = true }
  }, [game.id, arcadeSubject, questionCount])

  const resolveCorrect = async (qId, qi) => {
    for (let i = 0; i < 4; i++) {
      try {
        const res = await apiCheckQuestion(qId, i)
        if (res.correct) {
          setCorrectIdx((prev) => ({ ...prev, [qi]: i }))
          return
        }
      } catch { /* try next */ }
    }
  }

  // Pre-generate myth statements: randomly pick one option as the statement;
  // FAKTA if it is the correct option, else MITOS.
  const myths = useMemo(() => {
    if (!isMyth) return []
    return bank.map((q, qi) => {
      const correct = correctIdx[qi]
      if (correct == null) return { statement: q.opts[0], isFact: true, optionIdx: 0 }
      const isFact = Math.random() < 0.5
      const chosen = isFact ? correct : ((correct + 1 + Math.floor(Math.random() * (q.opts.length - 1))) % q.opts.length)
      return {
        statement: q.opts[chosen],
        isFact,
        optionIdx: chosen,
        qId: q.id,
      }
    })
  }, [bank, correctIdx, isMyth])

  const score = answers.length
  const current = bank[index]
  const myth = myths[index]

  // global timer per game
  useEffect(() => {
    if (gameOver || !bankReady || !bank.length) return
    if (game.mode !== 'blitz' && game.mode !== 'sprint' && game.mode !== 'boss') return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, gameOver, index, bankReady, bank.length])

  function handleTimeout() {
    if (!bankReady || !bank.length) return
    if (game.mode === 'sprint') {
      advance()
    } else if (game.mode === 'blitz') {
      setGameOver(true)
    } else if (game.mode === 'boss') {
      advance()
    }
  }

  function advance() {
    if (!bank || !bank.length) return
    if (index + 1 >= bank.length) {
      setGameOver(true)
      return
    }
    const next = index + 1
    setIndex(next)
    setAnswerLocked(false)
    setSelectedOpt(null)
    if (game.mode === 'sprint') setTimeLeft(30)
    if (game.mode === 'boss') {
      if (next % 5 === 0) setRound((r) => r + 1)
      setTimeLeft(25)
    }
  }

  async function answer(optIdx) {
    if (answerLocked || !current) return
    setAnswerLocked(true)
    setSelectedOpt(optIdx)

    let correct
    let exp = current.explanation
    if (isMyth) {
      const chosenIsFact = optIdx === 0
      correct = chosenIsFact === myth.isFact
    } else {
      try {
        const res = await apiCheckQuestion(current.id, optIdx)
        correct = res.correct
        if (res.correctIndex != null) {
          setCorrectIdx((prev) => ({ ...prev, [index]: res.correctIndex }))
        }
        if (res.explanation) exp = res.explanation
      } catch {
        correct = false
      }
    }
    chosenRef.current[index] = { optIdx, correct, explanation: exp }
    const wasLast = index + 1 >= bank.length

    const done = () => setTimeout(() => (wasLast ? setGameOver(true) : advance()), delay)
    const delay = game.mode === 'blitz' ? 300 : game.mode === 'sprint' || game.mode === 'boss' ? 400 : 500

    if (game.mode === 'survival') {
      if (correct) {
        setAnswers((a) => [...a, index])
      } else {
        setLives((l) => {
          const nl = l - 1
          if (nl <= 0) setTimeout(() => setGameOver(true), 400)
          return nl
        })
      }
      done()
    } else if (game.mode === 'sprint') {
      if (correct) {
        setAnswers((a) => [...a, index])
        setTimeLeft((t) => t + 2)
      } else {
        setTimeLeft((t) => Math.max(0, t - 3))
      }
      done()
    } else if (game.mode === 'boss') {
      if (correct) {
        setAnswers((a) => [...a, index])
        setTimeLeft((t) => t + 2)
      } else {
        setBossHP((h) => {
          const nh = Math.max(0, h - 20)
          return nh
        })
        setPlayerHP((p) => {
          const np = p - 25
          if (np <= 0) setTimeout(() => setGameOver(true), 400)
          return Math.max(0, np)
        })
      }
      done()
    } else {
      if (correct) setAnswers((a) => [...a, index])
      done()
    }
  }

  // award XP when the game ends
  useEffect(() => {
    if (gameOver) {
      const gained = Math.round((game.xp || 0) * (questionCount ? score / questionCount : 0))
      xpGainedRef.current = gained || Math.round((game.xp || 0) / 3)
      if (gained >= 0) {
        apiAddXp(xpGainedRef.current).catch(() => {})
      }
    }
  }, [gameOver]) // eslint-disable-line

  // loading state
  if (!bankReady) {
    return (
      <div className="qr-result">
        <div className="quiz-result-card">
          <i className="material-symbols-rounded qr-verdict-icon">hourglass_top</i>
          <div className="qr-pct-big">...</div>
          <h3 className="qr-verdict-title">{t('loadMemuatIntoS') || 'Memuatkan Soalan...'}</h3>
        </div>
      </div>
    )
  }

  // game over screen
  if (gameOver || (bankReady && bank.length > 0 && !current)) {
    return (
      <ArcadeResult
        score={score}
        total={questionCount}
        xp={xpGainedRef.current}
        lang={lang}
        t={t}
        reviewTab={reviewTab}
        setReviewTab={setReviewTab}
        chosen={chosenRef.current}
        bank={bank}
        correctIdx={correctIdx}
        isMyth={isMyth}
      >
        <div className="qr-actions">
          <Link className="btn btn-ghost" to={`/arcade-lobby.html`}>{t('arcadeKembali')}</Link>
          <button className="btn btn-primary replay" onClick={() => window.location.reload()}>{t('arcadeMainSemula')}</button>
        </div>
      </ArcadeResult>
    )
  }

  const isMythRend = isMyth
  const mythStatement = isMyth ? myth.statement : null

  return (
    <div>
      <div className={`arcade-game-head ${game.mode === 'boss' ? 'boss-head' : ''}`}>
        <div className="af-left">
          <div className="uppercase">{game.title}</div>
          {game.mode === 'boss' ? (
            <div className="boss-line">
              <span className="uppercase">BOSS BATTLE</span>
              <span>· SOALAN {index + 1}/{questionCount}</span>
              <span>| Pusingan {round + 1}/3</span>
            </div>
          ) : (
            <div className="uppercase">Soalan {index + 1}/{questionCount}</div>
          )}
        </div>
        <div className="ag-stats">
          {game.mode === 'sprint' || game.mode === 'blitz' || game.mode === 'boss' ? (
            <span className="ag-stat"><i className="material-symbols-rounded">schedule</i>{timeLeft}s</span>
          ) : game.mode === 'survival' ? (
            <span className="ag-stat lives">
              {'❤️'.repeat(Math.max(0, lives))}{'🖤'.repeat(Math.max(0, 3 - lives))}
            </span>
          ) : null}
          {game.mode === 'boss' && (
            <span className="ag-stat boss-score"><span className="star-ico">⭐</span>{score} betul</span>
          )}
          <span className="ag-stat"><i className="material-symbols-rounded">check_circle</i>{score} betul</span>
        </div>
      </div>

      {game.mode === 'boss' && (
        <div className="boss-hud">
          <div className="bh-row">
            <div className="bh-bar bh-boss">
              <span className="bh-label">👾 Boss</span>
              <div className="bh-track"><div className="bh-fill" style={{ width: `${bossHP}%` }} /></div>
              <span className="bh-num">{bossHP} HP</span>
            </div>
          </div>
          <div className="bh-row">
            <div className="bh-bar bh-player">
              <span className="bh-label">⚔️ Anda</span>
              <div className="bh-track"><div className="bh-fill" style={{ width: `${playerHP}%` }} /></div>
              <span className="bh-num">{playerHP} HP</span>
            </div>
          </div>
        </div>
      )}

      {game.mode === 'sprint' && (
        <div className="sprint-track">
          <div className="st-header"><span>🏃 SPRINT TRACK</span><span className="st-count">{score}/20</span></div>
          <div className="st-track">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={`st-seg ${i < index ? 'filled' : ''}`}>
                {i === index ? '🏃' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="quiz-runner">
        <div className="qr-question">
          <h4>{isMythRend ? `${mythStatement}` : current.q}</h4>
          {!isMythRend && (
            <div className="qr-options">
              {current.opts.map((opt, i) => {
                let cls = 'qr-option'
                if (answerLocked) {
                  const right = correctIdx[index]
                  if (right != null) {
                    if (i === right) cls += ' correct'
                    else if (i === selectedOpt) cls += ' wrong'
                    else cls += ' dim'
                  } else if (i === selectedOpt) {
                    cls += ' selected'
                  } else {
                    cls += ' dim'
                  }
                }
                return (
                  <button key={i} className={cls} onClick={() => answer(i)} disabled={answerLocked} type="button">
                    <span className="qr-optlabel">{String.fromCharCode(65 + i)}.</span>
                    <span className="qr-opttext">{opt}</span>
                  </button>
                )
              })}
            </div>
          )}
          {isMythRend && (
            <div className="qr-myth-actions">
              <button
                className={`btn qr-myth-btn myth-fakta ${answerLocked ? (myth.isFact ? 'correct' : 'dim') : ''}`}
                onClick={() => answer(0)} disabled={answerLocked} type="button">✅ FAKTA</button>
              <button
                className={`btn qr-myth-btn myth-mitos ${answerLocked ? (!myth.isFact ? 'correct' : 'dim') : ''}`}
                onClick={() => answer(1)} disabled={answerLocked} type="button">❌ MITOS</button>
            </div>
          )}
          {answerLocked && (
            <div className={`qr-feedback ${chosenRef.current[index]?.correct ? 'correct' : 'wrong'}`}>
              <i className="material-symbols-rounded">
                {chosenRef.current[index]?.correct ? 'check_circle' : 'cancel'}
              </i>
              <span>{chosenRef.current[index]?.explanation || current.explanation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const RING_R = 60
const RING_CIRC = 2 * Math.PI * RING_R

function ArcadeResult({ score, total, xp, t, reviewTab, setReviewTab, chosen, bank, correctIdx, isMyth, children }) {
  const pct = total ? Math.round((score / total) * 100) : 0
  const [ringOffset, setRingOffset] = useState(RING_CIRC)

  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
  const msgKey = stars === 3 ? 'arcadeMsg3' : stars === 2 ? 'arcadeMsg2' : 'arcadeMsg1'
  const streak = 1

  useEffect(() => {
    const id = setTimeout(() => setRingOffset(RING_CIRC - (RING_CIRC * pct) / 100), 60)
    return () => clearTimeout(id)
  }, [pct])

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  return (
    <div className="arcade-result">
      <div className="ar-ring-wrap">
        <svg className="ar-ring" viewBox="0 0 140 140">
          <circle className="ar-ring-track" cx="70" cy="70" r={RING_R} />
          <circle
            className="ar-ring-fill"
            cx="70" cy="70" r={RING_R}
            strokeDasharray={RING_CIRC}
            strokeDashoffset={ringOffset}
          />
        </svg>
        <div className="ar-ring-center">{pct}%</div>
      </div>
      <div className="ar-score">{score}/{total} {t('betul')}</div>

      <div className="ar-stars">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={`ar-star ${i < stars ? 'on' : ''}`}>⭐</span>
        ))}
      </div>
      <div className="ar-message">{t(msgKey)}</div>

      <div className="ar-stats">
        <span className="ar-stat">⚡ {xp} {t('arcadeXPDiraih')}</span>
        <span className="ar-stat">🔥 {streak}</span>
      </div>

      <div className="ar-tabs">
        <button className={`ar-tab ${reviewTab === 'result' ? 'active' : ''}`} onClick={() => setReviewTab('result')}>
          {t('arcadeKeputusan')}
        </button>
        <button className={`ar-tab ${reviewTab === 'review' ? 'active' : ''}`} onClick={() => setReviewTab('review')}>
          {t('semakJawapan')}
        </button>
      </div>

      {reviewTab === 'review' && (
        <div className="review-section ar-review">
          {bank.map((q, qi) => {
            const rec = chosen[qi]
            const answered = !!rec
            const correct = !!rec && rec.correct
            if (isMyth) {
              const truthIsFact = rec && (rec.correct ? (rec.optIdx === 0) : (rec.optIdx !== 0))
              return (
                <div className={`review-item ${correct ? 'correct-item' : ''}`} key={qi}>
                  <div className="review-item-q">{qi + 1}. {q.q}</div>
                  <div className="review-item-ans">
                    {correct ? (
                      <span className="review-chip chip-right">
                        <i className="material-symbols-rounded">check_circle</i>
                        {t('andaLabel')}: {rec.optIdx === 0 ? 'FAKTA ✅' : 'MITOS ❌'}
                      </span>
                    ) : (
                      <>
                        <span className="review-chip chip-wrong">
                          <i className="material-symbols-rounded">cancel</i>
                          {t('andaLabel')}: {rec.optIdx === 0 ? 'FAKTA ✅' : 'MITOS ❌'}
                        </span>
                        <span className="review-chip chip-right-ans">
                          <i className="material-symbols-rounded">lightbulb</i>
                          {t('betul')}: {truthIsFact ? 'FAKTA ✅' : 'MITOS ❌'}
                        </span>
                      </>
                    )}
                  </div>
                  {q.explanation && (
                    <div className="review-item-exp">
                      <i className="material-symbols-rounded">auto_stories</i>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )
            }
            const rightIdx = correctIdx[qi]
            const solved = rightIdx != null
            const chosenLabel = rec && q.opts[rec.optIdx] != null
              ? `${LETTERS[rec.optIdx]}. ${q.opts[rec.optIdx]}`
              : (lang === 'en' ? 'Not answered' : 'Tidak dijawab')
            const rightLabel = solved && q.opts[rightIdx] != null
              ? `${LETTERS[rightIdx]}. ${q.opts[rightIdx]}`
              : (lang === 'en' ? 'Not available' : 'Tiada maklumat')
            return (
              <div className={`review-item ${correct ? 'correct-item' : ''}`} key={qi}>
                <div className="review-item-q">{qi + 1}. {q.q}</div>
                <div className="review-item-ans">
                  {correct ? (
                    <span className="review-chip chip-right">
                      <i className="material-symbols-rounded">check_circle</i>
                      {t('andaLabel')}: {chosenLabel}
                    </span>
                  ) : (
                    <>
                      <span className="review-chip chip-wrong">
                        <i className="material-symbols-rounded">cancel</i>
                        {t('andaLabel')}: {chosenLabel}
                      </span>
                      {solved && (
                        <span className="review-chip chip-right-ans">
                          <i className="material-symbols-rounded">lightbulb</i>
                          {t('betul')}: {rightLabel}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {q.explanation && (
                  <div className="review-item-exp">
                    <i className="material-symbols-rounded">auto_stories</i>
                    {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="ar-actions">
        {children}
      </div>
    </div>
  )
}
