import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { AppShell } from '../components/AppShell.jsx'
import { subjects } from '../data/subjects.js'
import { subjectList } from '../data/questions.js'
import { apiGetProgress } from '../lib/api.js'
import './app.css'
import './profile.css'

const SUBJECT_TOPIC_RANGES = {
  '1103': [1, 10],
  '1203': [11, 20],
  '1303': [21, 29],
  '2303': [30, 39],
  '5103': [40, 49],
  '5533': [50, 59],
}

export default function Profile() {
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const navigate = useNavigate()
  const [showInstallModal, setShowInstallModal] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [progress, setProgress] = useState([])
  const [platformTab, setPlatformTab] = useState(() => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'ios' : 'android'
  })

  useEffect(() => {
    apiGetProgress().then((p) => setProgress(p || [])).catch(() => setProgress([]))
  }, [])

  const currentXp = user?.xp || 0
  const currentLevel = user?.level || 1
  const streak = user?.streak || 1
  const xpInLevel = currentXp % 500
  const xpNeeded = 500

  const completedTopicIds = new Set(progress.filter((p) => p.completed).map((p) => p.topicId))
  const totalCompleted = completedTopicIds.size
  const totalTopics = 59
  const overallPct = Math.round((totalCompleted / totalTopics) * 100)

  const isEn = lang === 'en'
  const today = new Date()
  const dateStr = today.toLocaleDateString(isEn ? 'en-US' : 'ms-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null)
        }
      })
    } else {
      setShowInstallModal(true)
    }
  }

  const onLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <AppShell
      icon="account_circle"
      title={isEn ? 'Profile' : 'Profil'}
      sidebarVariant="profile"
      onLogout={onLogout}
      aurora="violet"
    >
      <div className="profile-page-container">
        {/* Top Hero Banner */}
        <div className="hero-card hero-profile">
          <div className="hero-card-body">
            <div className="hero-status-pill">
              <span className="pulse-dot" />
              <span>{dateStr}</span>
            </div>
            <h2>
              {isEn ? 'Hello, ' : 'Hai, '}
              {user?.displayName || user?.username || (isEn ? 'Student' : 'Pelajar')} 👋
            </h2>
            <p>
              {isEn
                ? 'Your record of achievements, badges and learning progress across SmartBrain DPLI.'
                : 'Rekod pencapaian, badge dan kemajuan pembelajaran anda di SmartBrain DPLI.'}
            </p>
            <div className="hero-chips-row">
              <span className="hero-badge-chip">
                <i className="material-symbols-rounded">military_tech</i> {isEn ? 'Skilled' : 'Mahir'}
              </span>
              <span className="hero-badge-chip">
                <i className="material-symbols-rounded">bolt</i> {isEn ? `Level ${currentLevel}` : `Tahap ${currentLevel}`}
              </span>
              <span className="hero-badge-chip hot">
                <i className="material-symbols-rounded">local_fire_department</i> {streak} {isEn ? (streak > 1 ? 'days streak' : 'day streak') : 'hari streak'}
              </span>
            </div>
          </div>
        </div>

        {/* Log Keluar Card */}
        <div className="profile-logout-card" onClick={onLogout} role="button" tabIndex={0}>
          <div className="plc-icon-box">
            <i className="material-symbols-rounded">logout</i>
          </div>
          <div className="plc-text">
            <span className="plc-title">{isEn ? 'Log Out' : 'Log Keluar'}</span>
            <span className="plc-sub">{isEn ? 'Log out from this device' : 'Log keluar daripada peranti ini'}</span>
          </div>
          <i className="material-symbols-rounded plc-arrow">chevron_right</i>
        </div>

        {/* 4 KPI Stats Grid (2x2) */}
        <div className="prof-kpi-grid">
          {/* Card 1: Jumlah XP */}
          <div className="prof-kpi-card gold-accent">
            <div className="pkc-top">
              <div className="pkc-icon gold">
                <i className="material-symbols-rounded">bolt</i>
              </div>
              <span className="pkc-label">{isEn ? 'Total XP' : 'Jumlah XP'}</span>
            </div>
            <div className="pkc-val">{currentXp.toLocaleString()}</div>
            <div className="pkc-sub">
              {isEn
                ? `${xpInLevel} / ${xpNeeded} points to level ${currentLevel + 1}`
                : `${xpInLevel} / ${xpNeeded} mata ke tahap ${currentLevel + 1}`}
            </div>
          </div>

          {/* Card 2: Tahap Semasa */}
          <div className="prof-kpi-card purple-accent">
            <div className="pkc-top">
              <div className="pkc-icon purple">
                <i className="material-symbols-rounded">emoji_events</i>
              </div>
              <span className="pkc-label">{isEn ? 'Current Level' : 'Tahap Semasa'}</span>
            </div>
            <div className="pkc-val">{isEn ? `Level ${currentLevel}` : `Tahap ${currentLevel}`}</div>
            <div className="pkc-sub">{isEn ? 'Skilled' : 'Mahir'}</div>
          </div>

          {/* Card 3: Streak Belajar */}
          <div className="prof-kpi-card orange-accent">
            <div className="pkc-top">
              <div className="pkc-icon orange">
                <i className="material-symbols-rounded">local_fire_department</i>
              </div>
              <span className="pkc-label">{isEn ? 'Study Streak' : 'Streak Belajar'}</span>
            </div>
            <div className="pkc-val">{streak} {isEn ? (streak > 1 ? 'days' : 'day') : 'hari'}</div>
            <div className="pkc-sub">{isEn ? 'Keep going every day!' : 'Teruskan setiap hari!'}</div>
          </div>

          {/* Card 4: Pencapaian */}
          <div className="prof-kpi-card teal-accent">
            <div className="pkc-top">
              <div className="pkc-icon teal">
                <i className="material-symbols-rounded">military_tech</i>
              </div>
              <span className="pkc-label">{isEn ? 'Achievements' : 'Pencapaian'}</span>
            </div>
            <div className="pkc-val">{Math.min(totalCompleted, 26)} <span className="pkc-val-sub">/ 26</span></div>
            <div className="pkc-progress-bar">
              <div className="pkc-progress-fill" style={{ width: `${Math.round((Math.min(totalCompleted, 26) / 26) * 100)}%` }} />
            </div>
            <div className="pkc-sub">{Math.round((Math.min(totalCompleted, 26) / 26) * 100)}% {isEn ? 'unlocked' : 'dibuka'}</div>
          </div>
        </div>

        {/* Info Text Note */}
        <div className="prof-info-note">
          <i className="material-symbols-rounded">info</i>
          <p>
            {isEn
              ? 'Levels are calculated from completed note topics and passed exam sets. XP and streaks are accumulated from Exams and Interactive Games.'
              : 'Tahap dikira daripada topik nota yang disiapkan dan set peperiksaan yang lulus. XP dan streak pula terkumpul daripada Peperiksaan dan Permainan Interaktif.'}
          </p>
        </div>

        {/* Install SmartBrain DPLI Card */}
        <div className="install-banner-card">
          <div className="ibc-icon-wrap">
            <i className="material-symbols-rounded">install_mobile</i>
          </div>
          <div className="ibc-content">
            <span className="ibc-title">Install SmartBrain DPLI</span>
            <span className="ibc-sub">
              {isEn
                ? 'Fast access from your home screen — without browser bar.'
                : 'Akses pantas dari skrin utama — tanpa browser bar.'}
            </span>
          </div>
          <button className="ibc-btn" onClick={handleInstallClick} type="button">
            Install
          </button>
        </div>

        {/* Progress Nota & Subtopik Section */}
        <section className="prof-subtopics-section">
          <div className="pss-header">
            <i className="material-symbols-rounded">menu_book</i>
            <span>{isEn ? 'Notes & Subtopics Progress' : 'Progress Nota & Subtopik'}</span>
          </div>

          {/* Total Overall Progress Card */}
          <div className="pss-overall-card">
            <div className="pss-overall-ring">
              <span>{overallPct}%</span>
            </div>
            <div className="pss-overall-info">
              <span className="pss-overall-num">
                {totalCompleted} <span className="pss-denom">/ 59 {isEn ? 'topics' : 'topik'}</span>
              </span>
              <span className="pss-overall-sub">
                {isEn ? 'Total progress across all 6 subjects' : 'Jumlah kemajuan merentas semua 6 subjek'}
              </span>
            </div>
          </div>

          {/* Subject Progress Rows */}
          <div className="pss-subjects-list">
            {subjectList.map((code, idx) => {
              const s = subjects[code]
              if (!s) return null
              const colors = ['purple', 'blue', 'amber', 'emerald', 'indigo', 'rose']
              const color = colors[idx % colors.length]
              const totalCount = s.topicsCount || 10
              const sTitle = isEn ? s.titleEn : s.title
              const [minId, maxId] = SUBJECT_TOPIC_RANGES[code] || [0, 0]
              const subjCompleted = progress.filter((p) => p.completed && p.topicId >= minId && p.topicId <= maxId).length
              const subjPct = Math.round((subjCompleted / totalCount) * 100)
              return (
                <div className="pss-subject-card" key={code}>
                  <div className="psc-top">
                    <div className={`psc-icon ${color}`}>
                      <i className="material-symbols-rounded">{s.icon}</i>
                    </div>
                    <div className="psc-title-wrap">
                      <span className="psc-code">{s.name}</span>
                      <span className="psc-name">{sTitle}</span>
                    </div>
                    <span className={`psc-pct ${color}`}>{subjPct}%</span>
                  </div>
                  <div className="psc-bar">
                    <div className={`psc-fill ${color}`} style={{ width: `${subjPct}%` }} />
                  </div>
                  <div className="psc-bottom-txt">
                    {isEn
                      ? `${subjCompleted} of ${totalCount} topics completed`
                      : `${subjCompleted} daripada ${totalCount} topik selesai`}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Install PWA Modal Pop-up */}
      {showInstallModal && (
        <div className="install-modal-backdrop" onClick={() => setShowInstallModal(false)}>
          <div className="install-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="imd-header">
              <div className="imd-logo">
                <i className="material-symbols-rounded">school</i>
              </div>
              <div className="imd-title-wrap">
                <h3>Install SmartBrain DPLI</h3>
                <p>{isEn ? 'Open like a real app on your phone.' : 'Buka seperti app sebenar di telefon anda.'}</p>
              </div>
            </div>

            <div className="imd-tabs">
              <button
                className={`imd-tab ${platformTab === 'ios' ? 'active' : ''}`}
                onClick={() => setPlatformTab('ios')}
                type="button"
              >
                iPhone / iPad
              </button>
              <button
                className={`imd-tab ${platformTab === 'android' ? 'active' : ''}`}
                onClick={() => setPlatformTab('android')}
                type="button"
              >
                Android / Chrome
              </button>
            </div>

            {platformTab === 'ios' ? (
              <div className="imd-guide-box">
                <div className="imd-guide-heading">iPhone / iPad (Safari)</div>
                <ol className="imd-steps">
                  <li>
                    <span>1.</span> {isEn ? 'Tap the' : 'Klik butang'} <strong>Share ( ⬆️ )</strong> {isEn ? 'button at the bottom of the screen' : 'di bawah skrin'}
                  </li>
                  <li>
                    <span>2.</span> {isEn ? 'Select' : 'Pilih'} <strong>Add to Home Screen / Tambah ke Skrin Utama</strong>
                  </li>
                  <li>
                    <span>3.</span> {isEn ? 'Tap' : 'Klik'} <strong>Add / Tambah</strong>
                  </li>
                </ol>
              </div>
            ) : (
              <div className="imd-guide-box">
                <div className="imd-guide-heading">Android (Chrome / Edge)</div>
                <ol className="imd-steps">
                  <li>
                    <span>1.</span> {isEn ? 'Tap the' : 'Klik butang'} <strong>Menu ( ⋮ )</strong> {isEn ? 'at the top right' : 'di penjuru atas skrin'}
                  </li>
                  <li>
                    <span>2.</span> {isEn ? 'Select' : 'Pilih'} <strong>Install app / Tambah ke Skrin Utama</strong>
                  </li>
                  <li>
                    <span>3.</span> {isEn ? 'Tap' : 'Klik'} <strong>Install / Pasang</strong>
                  </li>
                </ol>
              </div>
            )}

            <button className="imd-close-btn" onClick={() => setShowInstallModal(false)} type="button">
              {isEn ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      )}
    </AppShell>
  )
}
