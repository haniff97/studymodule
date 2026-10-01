import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from './Modal.jsx'
import { XPToast } from './XPToast.jsx'
import { useLang } from '../context/LangContext.jsx'
import { apiCheckQuestion } from '../lib/api.js'

// Shared quiz runner.
// Props:
//   questions: array of {qId, question, options[], explanation, topic, difficulty, cognitive}
//              (no `correct` needed when checkAnswer is provided)
//   checkAnswer: async (qId, answerIndex) => { correct, correctIndex, explanation }
//              When provided, correctness is resolved from the server per answer.
//   mode: 'learn' (show feedback after each) | 'final' (results only after submit)
//   title: shown in timer/heading
//   modeTitle: string shown in the .mode-badge (e.g. "EXAM & LEARN" or "SIMULASI Final Exam")
//   subjectCode: subject code for the meta chip (e.g. "HPGD1103")
//   topicLabel: optional topic label for the meta chip
//   setTitle: name of the set for header/timer
//   onFinish: (score, percentage) => void  (not required)

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export function QuizRunner({
  questions = [],
  mode = 'learn',
  title,
  modeTitle,
  subjectCode,
  topicLabel,
  setTitle,
  duration,
  onFinish,
  checkAnswer,
  onComplete,
}) {
  const { lang, t } = useLang()
  const isEn = lang === 'en'

  const wrapped = useMemo(() => {
    if (!Array.isArray(questions)) return []
    return questions.map((q) => ({
      ...q,
      answered: -1,
      correctIndex: undefined,
      checked: false,
      checkedCorrect: undefined,
    }))
  }, [questions])

  const [items, setItems] = useState(wrapped)
  const [index, setIndex] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [showPalette, setShowPalette] = useState(false)
  const [toast, setToast] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mode === 'final' ? (duration || 60 * 60) : null)
  const startRef = useRef(Date.now())

  const current = items[index]
  const total = items.length
  const answeredCount = items.filter((q) => q.answered >= 0).length
  const score = items.filter((q) =>
    q.correctIndex != null ? q.answered === q.correctIndex : q.answered === q.correct
  ).length

  const submit = async (isTimeout = false) => {
    setShowConfirm(false)
    setSubmitting(true)
    let finalItems = items
    if (checkAnswer) {
      const withResults = await Promise.all(
        items.map(async (q) => {
          if (q.qId == null) {
            return {
              ...q,
              correctIndex: q.correct,
              checked: true,
              checkedCorrect: q.answered >= 0 && q.answered === q.correct,
            }
          }
          try {
            const res = await checkAnswer(q.qId, q.answered)
            const correctIndex = res.correctIndex != null ? res.correctIndex : q.correct
            return {
              ...q,
              correctIndex,
              checked: true,
              checkedCorrect: res.correct,
              explanation: res.explanation || q.explanation,
            }
          } catch {
            return {
              ...q,
              correctIndex: q.correct,
              checked: true,
              checkedCorrect: q.answered >= 0 && q.answered === q.correct,
            }
          }
        })
      )
      finalItems = withResults
      setItems(withResults)
    }
    setSubmitting(false)
    if (isTimeout) {
      setTimedOut(true)
    }
    setFinished(true)
    showXP()
    const finalScore = finalItems.filter((q) =>
      q.correctIndex != null ? q.answered === q.correctIndex : q.answered === q.correct
    ).length
    const pct = total ? Math.round((finalScore / total) * 100) : 0
    if (onComplete) onComplete(finalScore, pct)
  }

  // final exam timer
  useEffect(() => {
    if (mode !== 'final' || finished || timeLeft === null) return
    if (timeLeft <= 0) {
      submit(true)
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, mode, finished])

  useEffect(() => {
    setItems(wrapped)
    setIndex(0)
    setFinished(false)
    setTimedOut(false)
    setShowConfirm(false)
    setReviewOpen(false)
    setShowPalette(false)
    setSubmitting(false)
    setTimeLeft(mode === 'final' ? (duration || 60 * 60) : null)
    startRef.current = Date.now()
  }, [wrapped, mode, duration])

  const selectAnswer = (optIdx) => {
    setItems((prev) =>
      prev.map((q, i) => (i === index ? { ...q, answered: optIdx, checked: false } : q))
    )
    if (mode === 'learn') {
      if (current.answered < 0) showXP()
      checkCurrent(optIdx)
    }
  }

  const checkCurrent = async (optIdx) => {
    if (checkAnswer && current.qId != null) {
      try {
        const res = await checkAnswer(current.qId, optIdx)
        const correctIndex = res.correctIndex != null ? res.correctIndex : current.correct
        setItems((prev) =>
          prev.map((q, i) =>
            i === index
              ? {
                  ...q,
                  correctIndex,
                  checked: true,
                  checkedCorrect: res.correct,
                  explanation: res.explanation || q.explanation,
                }
              : q
          )
        )
      } catch {
        // fall back to local answer
        setItems((prev) =>
          prev.map((q, i) =>
            i === index
              ? {
                  ...q,
                  checked: true,
                  checkedCorrect: optIdx === current.correct,
                }
              : q
          )
        )
      }
    } else {
      setItems((prev) =>
        prev.map((q, i) =>
          i === index
            ? {
                ...q,
                correctIndex: current.correct,
                checked: true,
                checkedCorrect: optIdx === current.correct,
              }
            : q
        )
      )
    }
  }

  const showXP = () => {
    setToast(true)
    setTimeout(() => setToast(false), 1800)
  }

  const restart = () => {
    setItems(wrapped)
    setIndex(0)
    setFinished(false)
    setTimedOut(false)
    setShowConfirm(false)
    setReviewOpen(false)
    setShowPalette(false)
    setSubmitting(false)
    setTimeLeft(mode === 'final' ? (duration || 60 * 60) : null)
    startRef.current = Date.now()
  }

  const next = () => setIndex((i) => Math.min(i + 1, total - 1))
  const prev = () => setIndex((i) => Math.max(i - 1, 0))

  const badge = modeTitle || (mode === 'final' ? (isEn ? 'SIMULATION Final Exam' : 'SIMULASI Final Exam') : 'EXAM & LEARN')

  // Empty questions state
  if (!items || items.length === 0 || !current) {
    return (
      <div className="quiz-runner quiz-session">
        <button className="session-back" onClick={() => onFinish && onFinish(0)} type="button">
          <i className="material-symbols-rounded">arrow_back</i> {isEn ? 'Change Selection' : 'Tukar Pilihan'}
        </button>
        <div className="q-card" style={{ textAlign: 'center', padding: '48px 20px' }}>
          <i className="material-symbols-rounded" style={{ fontSize: 52, color: 'var(--muted)', marginBottom: 12 }}>quiz</i>
          <h4 style={{ color: 'var(--text)', marginBottom: 8 }}>{isEn ? 'No questions available' : 'Tiada soalan tersedia'}</h4>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            {isEn ? 'Please choose another set or subject.' : 'Sila pilih set soalan atau subjek lain.'}
          </p>
        </div>
      </div>
    )
  }

  // ---------------- Finished screen ----------------
  if (finished) {
    const finalScore = items.filter((q) =>
      q.correctIndex != null ? q.answered === q.correctIndex : q.answered === q.correct
    ).length
    const pct = total ? Math.round((finalScore / total) * 100) : 0
    const elapsed = Math.floor((Date.now() - startRef.current) / 1000)
    const modeLabel = (modeTitle || (mode === 'final' ? 'Final Exam' : 'Exam & Learn')).toLowerCase()
    const mins = Math.round(elapsed / 60) || Math.round((duration || 0) / 60)
    const verdict = pickVerdict(pct, timedOut, t)
    if (timedOut) {
      verdict.sub = t('verdictTimeSub').replace('{mode}', modeLabel).replace('{mins}', mins)
    }
    const setLine = [subjectCode, setTitle, badge].filter(Boolean).join(' · ')
    return (
      <div className="qr-result">
        <div className="quiz-result-card">
          <i className="material-symbols-rounded qr-verdict-icon">{verdict.icon}</i>
          <div className="qr-pct-big">{pct}%</div>
          <h3 className="qr-verdict-title">{verdict.title}</h3>
          <p className="qr-verdict-sub">{verdict.sub}</p>
          {setLine && <div className="qr-set-line">{setLine}</div>}

          <div className="result-stats">
            <div className="rs-block">
              <span className="rs-value">{finalScore}</span>
              <span className="rs-label">{isEn ? 'Correct' : t('betul')}</span>
            </div>
            <div className="rs-block">
              <span className="rs-value">{total - finalScore}</span>
              <span className="rs-label">{isEn ? 'Wrong' : t('salah')}</span>
            </div>
            <div className="rs-block">
              <span className="rs-value">{pct}%</span>
              <span className="rs-label">{isEn ? 'Score' : t('markah')}</span>
            </div>
            <div className="rs-block">
              <span className="rs-value">{mmss(elapsed)}</span>
              <span className="rs-label">{isEn ? 'Time' : t('masa')}</span>
            </div>
          </div>

          <button className="btn-review" onClick={() => setReviewOpen((o) => !o)} type="button">
            <i className="material-symbols-rounded">fact_check</i>
            {reviewOpen ? (isEn ? 'Close Review' : t('tutupUlangkaji')) : (isEn ? 'Review Answers' : t('semakJawapan'))}
          </button>
          <button className="btn-retry" onClick={restart} type="button">
            <i className="material-symbols-rounded">replay</i>
            {isEn ? 'Try Again' : t('cubaLagi')}
          </button>
        </div>

        {reviewOpen && (
          <div className="review-section">
            <div className="review-header">
              <i className="material-symbols-rounded">fact_check</i>
              {isEn ? 'Answer Review' : t('ulangkajiJawapan')}
            </div>
            {items.map((q, qi) => {
              const rightIdx = q.correctIndex != null ? q.correctIndex : q.correct
              const isAnswered = q.answered >= 0
              const correct = isAnswered && q.answered === rightIdx
              const chosenLabel = isAnswered && q.options && q.options[q.answered] != null
                ? `${LETTERS[q.answered]}. ${q.options[q.answered]}`
                : (isEn ? 'Not answered' : 'Tidak dijawab')
              const rightLabel = rightIdx != null && q.options && q.options[rightIdx] != null
                ? `${LETTERS[rightIdx]}. ${q.options[rightIdx]}`
                : (isEn ? 'Not available' : 'Tiada maklumat')

              const diff = {
                easy: isEn ? 'Easy' : 'Mudah',
                medium: isEn ? 'Medium' : 'Sederhana',
                hard: isEn ? 'Hard' : 'Sukar',
                mock: isEn ? 'Mock' : 'Peperiksaan',
              }
              const badge1 = q.topic || setTitle || (isEn ? 'Question' : 'Soalan')
              const badge2 = diff[q.difficulty] || (isEn ? 'Medium' : 'Sederhana')
              const cogn = {
                recall: isEn ? 'Recall' : 'Ingatan',
                application: isEn ? 'Application' : 'Aplikasi',
                analysis: isEn ? 'Analysis' : 'Analisis',
              }
              const badge3 = cogn[q.cognitive] || (isEn ? 'Recall' : 'Ingatan')

              return (
                <div className={`review-item ${correct ? 'correct-item' : ''}`} key={qi}>
                  <div className="review-badges">
                    <span className="review-badge">{badge1}</span>
                    <span className="review-badge">{badge2}</span>
                    <span className="review-badge">{badge3}</span>
                  </div>
                  <div className="review-item-q">{qi + 1}. {q.question}</div>
                  <div className="review-item-ans">
                    {correct ? (
                      <span className="review-chip chip-right">
                        <i className="material-symbols-rounded">check_circle</i>
                        {isEn ? 'Your Answer' : t('andaLabel')}: {chosenLabel}
                      </span>
                    ) : (
                      <>
                        <span className="review-chip chip-wrong">
                          <i className="material-symbols-rounded">cancel</i>
                          {isEn ? 'Your Answer' : t('andaLabel')}: {chosenLabel}
                        </span>
                        <span className="review-chip chip-right-ans">
                          <i className="material-symbols-rounded">lightbulb</i>
                          {isEn ? 'Correct Answer' : t('betul')}: {rightLabel}
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
            })}
          </div>
        )}

        <XPToast visible={toast} xp={0} />
      </div>
    )
  }

  // ---------------- Confirm modal ----------------
  const confirmModal = (
    <Modal
      open={showConfirm}
      title={isEn ? 'Submit Exam?' : 'Hantar Peperiksaan?'}
      onCancel={() => setShowConfirm(false)}
      onConfirm={() => submit(false)}
      confirmText={isEn ? 'Submit' : 'Hantar'}
      cancelText={isEn ? 'Cancel' : 'Batal'}
    >
      <p>
        {isEn
          ? `You have answered ${answeredCount} of ${total} questions. Are you sure you want to submit now?`
          : `Anda telah menjawab ${answeredCount} daripada ${total} soalan. Anda pasti mahu hantar sekarang?`}
      </p>
    </Modal>
  )

  const diffMap = {
    easy: isEn ? 'Easy' : 'Mudah',
    medium: isEn ? 'Medium' : 'Sederhana',
    hard: isEn ? 'Hard' : 'Sukar',
    mock: isEn ? 'Mock' : 'Peperiksaan',
  }

  return (
    <div className="quiz-runner quiz-session">
      <button className="session-back" onClick={() => onFinish && onFinish(score)} type="button">
        <i className="material-symbols-rounded">arrow_back</i> {isEn ? 'Change Selection' : 'Tukar Pilihan'}
      </button>

      <div className="session-top">
        <div className="timer-wrap">
          <i className="material-symbols-rounded">timer</i>
          <span className="timer-label">{isEn ? 'Time Left:' : 'Masa Berbaki:'}</span>
          <span className="timer-value">{timeLeft !== null ? mmss(timeLeft) : mmss(duration || 60 * 60)}</span>
        </div>
        <div className="mode-badge">
          <i className="material-symbols-rounded">school</i>
          {badge}
        </div>
      </div>

      <div className="progress-wrap">
        <div className="pw-row">
          <span className="pw-title">{isEn ? 'Progress' : 'Kemajuan'}</span>
          <span className="pw-frac">{index + 1} / {total}</span>
          <button
            className="pw-palette-toggle"
            onClick={() => setShowPalette((p) => !p)}
            type="button"
            title={isEn ? 'Question Grid' : 'Grid Soalan'}
          >
            <i className="material-symbols-rounded">grid_view</i>
            <span>{showPalette ? (isEn ? 'Hide Grid' : 'Tutup Grid') : (isEn ? 'Grid' : 'Grid')}</span>
          </button>
          <span className="pw-score">{score} {isEn ? 'Correct' : 'Betul'}</span>
        </div>
        <div className="pw-bar">
          <div
            className="pw-fill"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>

        {showPalette && (
          <div className="q-palette-grid">
            {items.map((q, i) => {
              let pCls = 'palette-btn'
              if (i === index) pCls += ' current'
              if (q.answered >= 0) pCls += ' answered'
              if (mode === 'learn' && q.checked) {
                const right = q.correctIndex != null ? q.correctIndex : q.correct
                pCls += q.answered === right ? ' right' : ' wrong'
              }
              return (
                <button
                  key={i}
                  className={pCls}
                  onClick={() => {
                    setIndex(i)
                    setShowPalette(false)
                  }}
                  type="button"
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="q-card">
        <div className="q-head">
          <span className="q-title">{isEn ? `QUESTION ${index + 1}` : `SOALAN ${index + 1}`}</span>
          {subjectCode && <span className="q-chip">{subjectCode}</span>}
          {topicLabel && <span className="q-chip">{topicLabel}</span>}
          <span className="q-chip q-chip-diff">{diffMap[current.difficulty] || (isEn ? 'Medium' : 'Sederhana')}</span>
        </div>

        <h4 className="q-text">{current.question}</h4>

        <div className="opt-btns">
          {Array.isArray(current.options) && current.options.map((opt, i) => {
            let cls = 'opt-btn'
            if (mode === 'final' && current.answered >= 0) {
              cls += current.answered === i ? ' selected' : ''
            }
            if (mode === 'learn' && current.answered >= 0) {
              const right = current.correctIndex != null ? current.correctIndex : current.correct
              if (i === right) cls += ' correct'
              else if (i === current.answered) cls += ' wrong'
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => selectAnswer(i)}
                disabled={mode === 'learn' && current.answered >= 0}
                type="button"
              >
                <span className="obt-label">{LETTERS[i]}</span>
                <span className="obt-text">{opt}</span>
                {mode === 'final' && current.answered === i && (
                  <i className="material-symbols-rounded">check_circle</i>
                )}
              </button>
            )
          })}
        </div>

        {mode === 'learn' && current.answered >= 0 && (
          <div className={`qr-feedback ${current.checkedCorrect ? 'correct' : 'wrong'}`}>
            <i className="material-symbols-rounded">
              {current.checkedCorrect ? 'check_circle' : 'error'}
            </i>
            <span>
              {current.checkedCorrect ? (isEn ? 'Correct! ' : 'Betul! ') : (isEn ? 'Incorrect. ' : 'Salah. ')}
              {current.explanation}
            </span>
          </div>
        )}

        <div className="q-nav">
          <button className="btn-prev" onClick={prev} disabled={index === 0} type="button">
            <i className="material-symbols-rounded">arrow_back</i>
            {isEn ? 'Previous' : 'Sebelumnya'}
          </button>
          {index < total - 1 ? (
            <button className="btn-nav-next" onClick={next} type="button">
              {isEn ? 'Next' : 'Seterusnya'}
              <i className="material-symbols-rounded">arrow_forward</i>
            </button>
          ) : (
            <button className="btn-nav-next" onClick={() => setShowConfirm(true)} type="button">
              {isEn ? 'Submit' : 'Hantar'}
              <i className="material-symbols-rounded">arrow_forward</i>
            </button>
          )}
        </div>
      </div>

      {confirmModal}
      <XPToast visible={toast} xp={0} />
    </div>
  )
}

function mmss(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function pickVerdict(pct, timedOut, t) {
  if (timedOut) {
    return { icon: 'timer_off', title: t('verdictTimeTitle'), sub: t('verdictTimeSub') }
  }
  if (pct >= 80) return { icon: 'emoji_events', title: t('verdict80Title'), sub: t('verdict80Sub') }
  if (pct >= 60) return { icon: 'thumb_up', title: t('verdict60Title'), sub: t('verdict60Sub') }
  if (pct >= 40) return { icon: 'school', title: t('verdict40Title'), sub: t('verdict40Sub') }
  return { icon: 'menu_book', title: t('verdictElseTitle'), sub: t('verdictElseSub') }
}
