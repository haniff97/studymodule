import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { AppShell } from '../components/AppShell.jsx'
import { TopicCard } from '../components/TopicCard.jsx'
import { getSubject, subjectList } from '../data/questions.js'
import { apiTopics } from '../lib/api.js'
import './notes.css'

const EMOJI = ['📚', '🧭', '📐', '🏫', '📊', '🔗', '🎭', '👨‍🏫', '📦', '💾', '📡', '🐕', '🧩', '🤝', '🔍', '💡', '💻', '🌸', '🧠', '⚡', '📋', '🖊️', '🎯', '📏', '🔄', '🧪', '🔬', '🗂️', '📈', '👥', '🏛️', '⚖️', '📜', '🌴', '⚔️', '🇲🇾', '📖', '🖋️', '🌐', '📗', '🎨']
const CARD_COLORS = ['var(--pop-yellow)', 'var(--pop-purple)', 'var(--pop-blue)', 'var(--pop-peach)', 'var(--pop-green)']

export default function NotesHub() {
  const { user } = useAuth()
  const { lang, t } = useLang()
  const isEn = lang === 'en'
  const [params] = useSearchParams()
  const initial = params.get('subj') || '1103'
  const validInitial = subjectList.includes(initial) ? initial : '1103'
  const [subj, setSubj] = useState(validInitial)
  const subject = getSubject(subj)
  const [topicRows, setTopicRows] = useState(null)

  useEffect(() => {
    let cancelled = false
    apiTopics(subj)
      .then((rows) => { if (!cancelled) setTopicRows(rows) })
      .catch(() => { if (!cancelled) setTopicRows(null) })
    return () => { cancelled = true }
  }, [subj])

  const today = new Date()
  const dateStr = today.toLocaleDateString(isEn ? 'en-US' : 'ms-MY', { weekday: 'long', day: 'numeric', month: 'long' })
  const hour = today.getHours()
  const timeWord = isEn
    ? (hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening')
    : (hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Tengah Hari' : 'Selamat Malam')

  useEffect(() => {
    document.body.classList.add('theme-notes')
    return () => document.body.classList.remove('theme-notes')
  }, [])

  const displayTopics = topicRows
    ? topicRows.map((row, i) => ({
        id: row.code,
        emoji: EMOJI[i % EMOJI.length],
        title: isEn ? (row.titleEn || row.titleMs) : row.titleMs,
        titleEn: row.titleEn || row.titleMs,
        titleMs: row.titleMs,
        keywords: `${row.noteCount} ${isEn ? 'notes' : 'nota'} · ${row.quizCount} ${isEn ? 'quizzes' : 'kuiz'}`,
      }))
    : subject.topics

  const routePrefix = `/notes-${subject.name.toLowerCase()}.html`

  return (
    <AppShell
      icon="menu_book"
      title={isEn ? 'Notes' : 'Nota'}
      subBadge={`${subject.name} - ${isEn ? subject.titleEn : subject.title}`}
      sidebarVariant="notes"
      selectedSubj={subj}
      onSelectSubj={setSubj}
      aurora="teal"
    >
      {/* Top Hero Banner */}
      <div className="hero-card hero-notes">
        <div className="hero-card-body">
          <div className="hero-status-pill">
            <span className="pulse-dot" />
            <span>{timeWord} · {dateStr}</span>
          </div>
          <h2>{t('notesIntro').replace('{name}', user?.username || 'Pelajar')}</h2>
          <p>
            {isEn
              ? '59 core topics across 6 subjects — complete with summaries, quizzes and flashcards.'
              : '59 topik teras merentas 6 subjek — lengkap dengan ringkasan, kuiz dan kad imbas.'}
          </p>
          <div className="hero-chips-row">
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">military_tech</i> {isEn ? 'Skilled' : 'Mahir'}
            </span>
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">bolt</i> {isEn ? `Level ${user?.level || 1}` : `Tahap ${user?.level || 1}`}
            </span>
            <span className="hero-badge-chip hot">
              <i className="material-symbols-rounded">local_fire_department</i> {user?.streak || 1} {isEn ? 'day streak' : 'hari streak'}
            </span>
          </div>
          <Link className="hero-white-btn" to={routePrefix}>
            <i className="material-symbols-rounded">menu_book</i> {t('startLearning')} →
          </Link>
        </div>
        <div className="hero-tahap-badge">
          <span className="hero-tahap-num">{user?.level || 1}</span>
          <span className="hero-tahap-label">{isEn ? 'LEVEL' : 'TAHAP'}</span>
        </div>
      </div>

      {/* 4 Action Cards */}
      <div className="notes-actions-grid">
        <Link className="notes-action-card" to={`${routePrefix}#flashcards`} style={{ backgroundColor: CARD_COLORS[0] }}>
          <i className="material-symbols-rounded">style</i>
          <span>{isEn ? 'Flashcards' : 'Kad Imbas'}</span>
        </Link>
        <Link className="notes-action-card" to={`${routePrefix}#progress`} style={{ backgroundColor: CARD_COLORS[1] }}>
          <i className="material-symbols-rounded">task_alt</i>
          <span>{isEn ? 'Progress' : 'Kemajuan'}</span>
        </Link>
        <Link className="notes-action-card" to="/Study_hub_exam_full.html" style={{ backgroundColor: CARD_COLORS[2] }}>
          <i className="material-symbols-rounded">edit_document</i>
          <span>{isEn ? 'Exam Practice' : 'Latihan Exam'}</span>
        </Link>
        <Link className="notes-action-card" to="/arcade-lobby.html" style={{ backgroundColor: CARD_COLORS[3] }}>
          <i className="material-symbols-rounded">sports_esports</i>
          <span>{isEn ? 'Games' : 'Permainan'}</span>
        </Link>
      </div>

      {/* Topics Header & Filter Tabs */}
      <div className="notes-topics-header">
        <div className="nth-left">
          <span className="nth-title">{t('coreTopics')}</span>
          <div className="nth-tabs">
            {subjectList.map((code) => {
              const s = getSubject(code)
              return (
                <button
                  key={code}
                  className={`nth-tab ${subj === code ? 'active' : ''}`}
                  onClick={() => setSubj(code)}
                >
                  {s.name}
                </button>
              )
            })}
          </div>
        </div>
        <span className="nth-right-badge">
          {subject.name} - {isEn ? subject.titleEn : subject.title}
        </span>
      </div>

      {/* 4-Column Topic Cards Grid */}
      <div className="topics-4col-grid">
        {displayTopics.map((topic, i) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            to={`${routePrefix}#${topic.id}`}
            color={CARD_COLORS[i % CARD_COLORS.length]}
          />
        ))}
      </div>
    </AppShell>
  )
}
