import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell.jsx'
import { RankChip } from '../components/RankChip.jsx'
import { FlashcardCarousel } from '../components/Flashcard.jsx'
import { XPToast } from '../components/XPToast.jsx'
import { getSubject, getAllTopics, subjectList } from '../data/questions.js'
import {
  apiNotes,
  apiFlashcards,
  apiQuizzes,
  apiCheckQuiz,
  apiAddXp,
  apiSaveProgress,
  apiTopics,
  apiGetProgress,
} from '../lib/api.js'
import { useLang } from '../context/LangContext.jsx'
import './topic.css'
import './quiz.css'
import { formatMarkdownToHtml } from '../lib/formatNote.js'

// Reusable topic-note page driven by subject param (1103/1203/2303)
export function TopicNotes({ subjCode }) {
  const { lang } = useLang()
  const isEn = lang === 'en'
  const params = useParams()
  const [toast, setToast] = useState(false)
  const subject = getSubject(subjCode)

  // API-driven state
  const [topicList, setTopicList] = useState(getAllTopics(subjCode))
  const [notes, setNotes] = useState(null)
  const [flashcards, setFlashcards] = useState(null)
  const [quizzes, setQuizzes] = useState(null)
  const [progressRows, setProgressRows] = useState([])
  const [fontSizeDelta, setFontSizeDelta] = useState(0)

  const toggleAllAccordions = (open) => {
    const list = document.querySelectorAll('.notes-accordion-list details.edu-accordion')
    list.forEach((el) => {
      el.open = open
    })
  }

  const fallbackTopics = getAllTopics(subjCode)
  const fallbackTopic = fallbackTopics.find((t) => t.id === params.topicId) || fallbackTopics[0]

  useEffect(() => {
    document.body.classList.add('theme-notes')
    return () => document.body.classList.remove('theme-notes')
  }, [])

  // Load topic list + progress for the subject
  useEffect(() => {
    let cancelled = false
    apiTopics(subjCode)
      .then((rows) => {
        if (cancelled) return
        const mapped = rows.map((row, i) => ({
          id: row.code,
          code: row.code,
          numericId: row.id,
          emoji: EMOJI[i % EMOJI.length],
          title: isEn ? (row.titleEn || row.titleMs) : row.titleMs,
          titleEn: row.titleEn || row.titleMs,
          titleMs: row.titleMs,
          keywords: `${row.noteCount} ${isEn ? 'notes' : 'nota'} · ${row.quizCount} ${isEn ? 'quizzes' : 'kuiz'}`,
        }))
        setTopicList(mapped.length ? mapped : fallbackTopics)
      })
      .catch(() => { if (!cancelled) setTopicList(fallbackTopics) })
    apiGetProgress()
      .then((rows) => { if (!cancelled) setProgressRows(rows) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [subjCode, isEn])

  // Resolve active topic
  const activeTopic = topicList.find((t) => t.id === params.topicId) || topicList[0]

  // Load notes + flashcards + quizzes for the active topic
  useEffect(() => {
    let cancelled = false
    const topicId = activeTopic?.numericId
    if (topicId != null) {
      apiNotes(topicId)
        .then((rows) => { if (!cancelled) setNotes(rows) })
        .catch(() => { if (!cancelled) setNotes(null) })
      apiQuizzes(topicId)
        .then((rows) => { if (!cancelled) setQuizzes(rows) })
        .catch(() => { if (!cancelled) setQuizzes([]) })
    }
    apiFlashcards(subjCode)
      .then((rows) => {
        if (cancelled) return
        setFlashcards(rows)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [activeTopic, subjCode])

  const showXP = useCallback((xp = 0) => {
    setToast(true)
    setTimeout(() => setToast(false), 1800)
  }, [])

  const bestScore = progressRows.find((p) => p.topicId === activeTopic?.numericId)?.bestScore || 0
  const isCompleted = !!progressRows.find((p) => p.topicId === activeTopic?.numericId)?.completed
  const doneCount = progressRows.filter((p) => p.completed).length
  const totalTopics = topicList.length || fallbackTopics.length || 1

  // Render notes sections as modern interactive accordion cards with reading controls
  const renderSections = () => {
    const sectionsToRender =
      notes && notes.length
        ? notes
        : (fallbackTopic.sections || []).map((sec, i) => ({
            heading: sec.h,
            contentHtml: sec.text,
            isFokus: 0,
            order: i,
          }))

    return (
      <div className="notes-container" style={{ fontSize: `${1 + fontSizeDelta * 0.12}rem` }}>
        {/* Reading Controls Toolbar */}
        <div className="notes-toolbar">
          <div className="nt-group">
            <span className="nt-label">Saiz Fon:</span>
            <button
              type="button"
              className={`nt-btn ${fontSizeDelta === -1 ? 'active' : ''}`}
              onClick={() => setFontSizeDelta(-1)}
              title="Kecilkan Saiz Tulisan"
            >
              A-
            </button>
            <button
              type="button"
              className={`nt-btn ${fontSizeDelta === 0 ? 'active' : ''}`}
              onClick={() => setFontSizeDelta(0)}
              title="Saiz Asal"
            >
              Asal
            </button>
            <button
              type="button"
              className={`nt-btn ${fontSizeDelta === 1 ? 'active' : ''}`}
              onClick={() => setFontSizeDelta(1)}
              title="Besarkan Saiz Tulisan"
            >
              A+
            </button>
          </div>

          <div className="nt-group">
            <button
              type="button"
              className="nt-btn nt-toggle"
              onClick={() => toggleAllAccordions(true)}
            >
              Buka Semua
            </button>
            <button
              type="button"
              className="nt-btn nt-toggle"
              onClick={() => toggleAllAccordions(false)}
            >
              Kuncup Semua
            </button>
          </div>
        </div>

        {/* Accordion Cards List */}
        <div className="notes-accordion-list">
          {sectionsToRender.map((n, i) => {
            if (n.isFokus) {
              return (
                <details
                  key={n.id || i}
                  className="edu-accordion focus-accordion"
                  open
                >
                  <summary className="accordion-summary">
                    <div className="summary-left">
                      <span className="accordion-num-badge gold">⭐</span>
                      <span className="accordion-title">{n.heading || 'Fokus Peperiksaan'}</span>
                      <span className="accordion-tag gold">Fokus Peperiksaan</span>
                    </div>
                    <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div
                    className="accordion-content focus-content"
                    dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(n.contentHtml) }}
                  />
                </details>
              )
            }

            return (
              <details
                key={n.id || i}
                className="edu-accordion"
                open={i === 0}
              >
                <summary className="accordion-summary">
                  <div className="summary-left">
                    <span className="accordion-num-badge">{i + 1}</span>
                    <span className="accordion-title">{n.heading}</span>
                  </div>
                  <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div
                  className="accordion-content"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(n.contentHtml) }}
                />
              </details>
            )
          })}
        </div>
      </div>
    )
  }

  const title = activeTopic?.title || fallbackTopic.title
  const displayId = (activeTopic?.id || fallbackTopic.id).replace('t', '')
  const cardItems = flashcards && flashcards.length
    ? flashcards.map((fc) => ({ front: fc.front, back: fc.back }))
    : fallbackTopic.flashcards

  const baseRoute = `/notes-${subject.name.toLowerCase()}.html`

  return (
    <AppShell
      icon="menu_book"
      title={subject.name}
      subBadge={`${subject.name} - ${isEn ? subject.titleEn : subject.title}`}
      theme="theme-notes"
      sidebarVariant="notes"
      selectedSubj={subjCode}
      aurora="teal"
    >
      <div className="subject-tabs">
        {subjectList.map((code) => {
          const s = getSubject(code)
          const route = `/notes-${s.name.toLowerCase()}.html`
          return (
            <Link className={`subject-tab ${code === subjCode ? 'active' : ''}`} to={route} key={code}>
              {s.name}
            </Link>
          )
        })}
      </div>

      <div className="progress-block card">
        <div className="pb-top">
          <span className="uppercase">KEMAJUAN {subject.name}</span>
          <span>Topik Selesai {doneCount}/{totalTopics}</span>
        </div>
        <div className="pb-bar"><div className="pb-fill" style={{ width: `${totalTopics ? Math.round((doneCount / totalTopics) * 100) : 0}%` }} /></div>
      </div>

      <div className="page-head">
        <div className="ph-icon">{activeTopic?.emoji || fallbackTopic.emoji}</div>
        <div>
          <div className="uppercase">{totalTopics} Topik Utama · {subject.title}</div>
          <h2>Topik {displayId} · {title}</h2>
          <div className="muted">{activeTopic?.keywords || fallbackTopic.keywords}</div>
        </div>
      </div>

      <RankChip
        items={[
          { icon: 'task_alt', label: `Topik ${doneCount}/${totalTopics}` },
          { icon: 'bolt', label: `+${bestScore} XP` },
        ]}
      />

      <div className="topic-nav">
        {topicList.map((t) => (
          <Link
            key={t.id}
            className={`tn-chip ${t.id === activeTopic?.id ? 'active' : ''}`}
            to={`${baseRoute}/${t.id}`}
          >
            {t.id.replace('t', '')}
          </Link>
        ))}
      </div>

      {renderSections()}

      <section className="note-section">
        <QuizBlock
          quizzes={quizzes}
          fallbackQuestions={fallbackTopic.questions}
          numericTopicId={activeTopic?.numericId}
          onCorrect={(bestScore) => {
            if (activeTopic?.numericId != null) {
              apiSaveProgress(activeTopic.numericId, 1, bestScore).catch(() => {})
            }
            apiAddXp(2).catch(() => {})
            showXP(2)
          }}
        />
      </section>

      <section className="note-section" id="flashcards">
        <div className="section-head">
          <h3 className="uppercase">Kad Imbas</h3>
        </div>
        <FlashcardCarousel items={cardItems} />
      </section>

      <section className="note-section" id="progress">
        <div className="section-head">
          <h3 className="uppercase">Kemajuan</h3>
        </div>
        <div className="card progress-box">
          <div className="pb-top"><span>Topik ini</span><span>{isCompleted ? '1/1 disiapkan' : `${bestScore > 0 ? `${bestScore}% · ` : ''}0/1 disiapkan`}</span></div>
          <div className="pb-bar"><div className="pb-fill" style={{ width: `${isCompleted || bestScore > 0 ? 100 : 0}%` }} /></div>
        </div>
      </section>

      <XPToast visible={toast} xp={0} />
    </AppShell>
  )
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']

function QuizBlock({ quizzes, fallbackQuestions, numericTopicId, onCorrect }) {
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(-1)
  const [checked, setChecked] = useState({})

  const items = quizzes && quizzes.length ? quizzes : fallbackQuestions || []
  const current = items[idx]
  const total = items.length

  const qText = current ? (current.question || current.q || '') : ''
  const qOpts = current ? (current.options || current.opts || []) : []
  const correctIndex = current ? (current.correct != null ? current.correct : (current.a != null ? current.a : 0)) : 0
  const qExp = current ? (current.explanation || current.fb || current.exp || '') : ''

  const reset = () => { setIdx(0); setChosen(-1); setChecked({}) }

  const pick = async (i) => {
    if (chosen >= 0 || !current) return
    setChosen(i)
    let correct = false
    if (numericTopicId != null && current.id != null) {
      try {
        const res = await apiCheckQuiz(current.id, i)
        correct = res.correct
        setChecked((c) => ({ ...c, [idx]: { correct, explanation: res.explanation || qExp } }))
      } catch {
        correct = i === correctIndex
        setChecked((c) => ({ ...c, [idx]: { correct, explanation: qExp } }))
      }
    } else {
      correct = i === correctIndex
      setChecked((c) => ({ ...c, [idx]: { correct, explanation: qExp } }))
    }
    if (correct && onCorrect) {
      onCorrect(100)
    }
  }

  if (!total) {
    return (
      <div className="card note-content"><p className="muted">Tiada soalan untuk kuiz ini.</p></div>
    )
  }

  return (
    <div className="quiz-block-card">
      <div className="section-head">
        <h3 className="uppercase">Semak Kefahaman</h3>
        <span className="pw-frac">{idx + 1}/{total}</span>
      </div>
      <div className="progress-wrap">
        <div className="pw-bar">
          <div className="pw-fill" style={{ width: `${((chosen >= 0 ? idx + 1 : idx) / total) * 100}%` }} />
        </div>
      </div>
      <div className="card note-content">
        <h4 className="q-text">{qText}</h4>
        <div className="opt-btns">
          {qOpts.map((opt, i) => {
            let cls = 'opt-btn'
            if (chosen >= 0) {
              if (i === correctIndex) cls += ' correct'
              else if (i === chosen) cls += ' wrong'
            }
            return (
              <button key={i} className={cls} onClick={() => pick(i)} disabled={chosen >= 0}>
                <span className="obt-label">{LETTERS[i]}</span>
                <span className="obt-text">{opt}</span>
              </button>
            )
          })}
        </div>
        {checked[idx] && (
          <div className={`qr-feedback ${checked[idx].correct ? 'correct' : 'wrong'}`}>
            <i className="material-symbols-rounded">
              {checked[idx].correct ? 'check_circle' : 'error'}
            </i>
            <span>
              {checked[idx].correct ? 'Betul! ' : 'Salah. '}
              {checked[idx].explanation}
            </span>
          </div>
        )}
        <div className="q-nav">
          <button className="btn-prev" onClick={() => { setIdx((i) => Math.max(0, i - 1)); setChosen(-1) }} disabled={idx === 0}>
            Sebelumnya
          </button>
          {idx < total - 1 ? (
            <button className="btn-nav-next" onClick={() => { setIdx((i) => i + 1); setChosen(-1) }}>
              Seterusnya <i className="material-symbols-rounded">arrow_forward</i>
            </button>
          ) : (
            <button className="btn-nav-next" onClick={reset}>
              Ulang Semula <i className="material-symbols-rounded">replay</i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const EMOJI = ['📚', '🧭', '📐', '🏫', '📊', '🔗', '🎭', '👨‍🏫', '📦', '💾', '📡', '🐕', '🧩', '🤝', '🔍', '💡', '💻', '🌸', '🧠', '⚡', '📋', '🖊️', '🎯', '📏', '🔄', '🧪', '🔬', '🗂️', '📈', '👥']

function multiline(text) {
  return String(text || '')
    .split('\n')
    .map((line, i) => <p key={i}>{line}</p>)
}

// Convenience exports for each subject route
export const TopicNotes1103 = () => <TopicNotes subjCode="1103" />
export const TopicNotes1203 = () => <TopicNotes subjCode="1203" />
export const TopicNotes2303 = () => <TopicNotes subjCode="2303" />
export const TopicNotes1303 = () => <TopicNotes subjCode="1303" />
export const TopicNotes5103 = () => <TopicNotes subjCode="5103" />
export const TopicNotes5533 = () => <TopicNotes subjCode="5533" />

