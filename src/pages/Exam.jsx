import { useEffect, useState } from 'react'
import { AppShell } from '../components/AppShell.jsx'
import { useLang } from '../context/LangContext.jsx'
import { QuizRunner } from '../components/QuizRunner.jsx'
import { getSubject, subjectList } from '../data/questions.js'
import { realQuestionSets } from '../data/real/real-questions.js'
import { apiSets, apiQuestions, apiCheckQuestion, apiAddXp, apiGetProgress, apiSaveProgress } from '../lib/api.js'
import './exam.css'
import './quiz.css'

function getLocalSets(subjectCode) {
  const prefix = subjectCode.startsWith('5') ? 'hmml' : 'hpgd'
  const rawList = realQuestionSets[`${prefix}${subjectCode}`] || []
  return rawList.map((s, i) => ({
    id: s.id || `set-${i + 1}`,
    titleMs: s.title || `Set ${i + 1}`,
    title: s.title || `Set ${i + 1}`,
    desc: s.desc || '40 soalan MCQ · Modul penuh',
    numQuestions: s.questions ? s.questions.length : 40,
    questions: s.questions || [],
  }))
}

export default function Exam() {
  const { lang, t } = useLang()
  const isEn = lang === 'en'
  const [mode, setMode] = useState('learn')
  const [subj, setSubj] = useState('1103')
  const [setId, setSetId] = useState('set-1')
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedTitle, setSelectedTitle] = useState('')
  const [sets, setSets] = useState(() => getLocalSets('1103'))
  const [progress, setProgress] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const subject = getSubject(subj)
  const selectedSet = sets.find((s) => s.id === setId) || sets[0]

  const today = new Date()
  const dateStr = today.toLocaleDateString(isEn ? 'en-US' : 'ms-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const hour = today.getHours()
  const timeWord = isEn
    ? (hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening')
    : (hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Tengah Hari' : 'Selamat Malam')

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    const local = getLocalSets(subj)
    setSets(local)
    setSetId(local[0]?.id || 'set-1')

    apiSets(subj)
      .then((rows) => {
        if (!cancelled && rows && rows.length > 0) {
          setSets(rows)
          setSetId(rows[0].id)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    apiGetProgress()
      .then((rows) => {
        if (!cancelled && rows) setProgress(rows)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [subj])

  const startExam = async (targetSet) => {
    const target = targetSet || selectedSet || sets[0]
    if (!target) return

    // 1. Try fetching from API
    try {
      const qs = await apiQuestions(target.id)
      if (qs && qs.length > 0) {
        const mapped = qs.map((q) => ({
          qId: q.id,
          question: q.q,
          options: q.opts,
          explanation: q.explanation || q.exp,
          topic: q.topicTitle || subject.name,
          difficulty: q.difficulty || 'medium',
          cognitive: q.cognitive || 'application',
          topicId: q.topicId,
          correct: q.correct ?? q.a,
        }))
        setQuestions(mapped)
        setSetId(target.id)
        setSelectedTitle(target.titleMs || target.title || target.id)
        setStarted(true)
        return
      }
    } catch {
      /* fallback to local sets */
    }

    // 2. Fallback to local realQuestionSets
    const localSets = getLocalSets(subj)
    const matched = localSets.find((ls) => ls.id === target.id || ls.id === target.code) || localSets[0]
    if (matched && matched.questions && matched.questions.length > 0) {
      const mapped = matched.questions.map((q, idx) => ({
        qId: `${matched.id}-q${idx + 1}`,
        question: q.q,
        options: q.opts,
        explanation: q.exp || q.explanation,
        topic: q.topic || subject.name,
        difficulty: q.difficulty || 'medium',
        cognitive: q.cognitive || 'application',
        correct: q.a,
      }))
      setQuestions(mapped)
      setSetId(matched.id)
      setSelectedTitle(matched.titleMs || matched.title)
      setStarted(true)
    }
  }

  const pickSet = (s) => {
    setSetId(s.id)
    setSelectedTitle(s.titleMs || s.title || s.id)
  }

  const handleComplete = async (score, pct) => {
    const gained = (score || 0) * 5
    if (gained > 0) {
      try {
        await apiAddXp(gained)
      } catch {
        /* ignore */
      }
    }
    const topicId = questions[0] && questions[0].topicId
    if (selectedSet && topicId != null) {
      const existing = progress.find((p) => p.topicId === topicId)
      const best = Math.max(existing?.bestScore || 0, pct || 0)
      await apiSaveProgress(topicId, 1, best).catch(() => {})
    }
  }

  return (
    <AppShell
      icon="edit_document"
      title={isEn ? 'Exam' : 'Peperiksaan'}
      subBadge={`${subject.name} - ${isEn ? subject.titleEn : subject.title}`}
      sidebarVariant="exam"
      aurora="violet"
    >
      {!started && (
        <div className="exam-lobby-page">
          {/* Top Hero Banner */}
          <div className="hero-card hero-exam">
            <div className="hero-card-body">
              <div className="hero-status-pill">
                <span className="pulse-dot" />
                <span>{timeWord} · {dateStr}</span>
              </div>
              <h2>{isEn ? `${subject.name} Exam Practice` : `Latihan Peperiksaan ${subject.name}`}</h2>
              <p>
                {isEn
                  ? `${subject.name} Mock Exam · 60 minutes per set with comprehensive explanations.`
                  : `Mock Exam ${subject.name} · 60 minit setiap set dengan penerangan lengkap.`}
              </p>
              <div className="hero-chips-row">
                <span className="hero-badge-chip">
                  <i className="material-symbols-rounded">military_tech</i> {isEn ? 'Skilled' : 'Mahir'}
                </span>
                <span className="hero-badge-chip">
                  <i className="material-symbols-rounded">bolt</i> {isEn ? 'Level 1' : 'Tahap 1'}
                </span>
                <span className="hero-badge-chip hot">
                  <i className="material-symbols-rounded">local_fire_department</i> 1 {isEn ? 'day streak' : 'hari streak'}
                </span>
              </div>
              <button className="hero-white-btn" onClick={() => startExam()} type="button">
                <i className="material-symbols-rounded">play_arrow</i> {isEn ? 'Start Exam Now →' : 'Mula Exam Sekarang →'}
              </button>
            </div>
            <div className="hero-tahap-badge">
              <span className="hero-tahap-num">1</span>
              <span className="hero-tahap-label">{isEn ? 'LEVEL' : 'TAHAP'}</span>
            </div>
          </div>

          {/* Section: Mod Peperiksaan */}
          <section className="exam-section">
            <div className="exam-sec-title">{isEn ? 'EXAM MODE' : t('examMode')}</div>
            <div className="mode-grid-2col">
              <div
                className={`mode-card-styled ${mode === 'learn' ? 'active' : ''}`}
                onClick={() => setMode('learn')}
                role="button"
                tabIndex={0}
              >
                <div className="mc-top">
                  <i className="material-symbols-rounded mc-icon">school</i>
                  <span className="mc-badge">{isEn ? 'LEARN' : 'BELAJAR'}</span>
                </div>
                <div className="mc-title">Exam &amp; Learn</div>
                <div className="mc-desc">
                  {isEn
                    ? 'Answers & explanations shown immediately after each question.'
                    : 'Jawapan & penerangan selepas setiap soalan.'}
                </div>
              </div>

              <div
                className={`mode-card-styled ${mode === 'final' ? 'active' : ''}`}
                onClick={() => setMode('final')}
                role="button"
                tabIndex={0}
              >
                <div className="mc-top">
                  <i className="material-symbols-rounded mc-icon">workspace_premium</i>
                  <span className="mc-badge">{isEn ? 'SIMULATION' : 'SIMULASI'}</span>
                </div>
                <div className="mc-title">Final Exam</div>
                <div className="mc-desc">
                  {isEn
                    ? 'Answer all questions first, results only revealed after submission.'
                    : 'Jawab semua dulu, keputusan hanya selepas hantar.'}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Subjek */}
          <section className="exam-section">
            <div className="exam-sec-title">{isEn ? 'SUBJECT' : t('subjectsSec')}</div>
            <div className="subj-rows-list">
              {subjectList.map((code) => {
                const s = getSubject(code)
                const isSelected = subj === code
                const countBadge = s.questions || 40
                const sTitle = isEn ? s.titleEn : s.title
                return (
                  <div
                    key={code}
                    className={`subj-row-card ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setSubj(code)
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="src-icon">
                      <i className="material-symbols-rounded">{s.icon}</i>
                    </div>
                    <div className="src-info">
                      <span className="src-code">{s.name}</span>
                      <span className="src-title">{sTitle}</span>
                    </div>
                    <span className="src-badge">
                      <i className="material-symbols-rounded">quiz</i>
                      {countBadge}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Section: Set Soalan */}
          <section className="exam-section">
            <div className="exam-sec-title">{isEn ? 'QUESTION SETS' : t('questionSetsSec')}</div>
            <div className="sets-grid-wrap">
              {sets.map((s, idx) => {
                const isCurrent = setId === s.id
                return (
                  <div
                    key={s.id}
                    className={`set-tile ${isCurrent ? 'active' : ''}`}
                    onClick={() => pickSet(s)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="st-left">
                      <i className="material-symbols-rounded">quiz</i>
                      <span>
                        {subject.name} · {s.titleMs || s.title || `Set ${idx + 1}`}
                      </span>
                    </div>
                    <span className="st-count">{s.numQuestions || 40} {isEn ? 'questions' : 'soalan'}</span>
                  </div>
                )
              })}
              <button
                className="exam-start-btn"
                onClick={() => startExam(selectedSet)}
                type="button"
              >
                <i className="material-symbols-rounded">play_arrow</i> {isEn ? 'Start Exam' : 'Mula Peperiksaan'}
              </button>
            </div>
          </section>
        </div>
      )}

      {started && (
        <QuizRunner
          questions={questions}
          mode={mode === 'final' ? 'final' : 'learn'}
          modeTitle={mode === 'final' ? 'SIMULASI Final Exam' : 'EXAM & LEARN'}
          subjectCode={subject.name}
          setTitle={selectedTitle}
          duration={60 * 60}
          onFinish={() => setStarted(false)}
          onComplete={handleComplete}
          checkAnswer={async (qId, answer) => apiCheckQuestion(qId, answer)}
        />
      )}
    </AppShell>
  )
}
