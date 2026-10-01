import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell.jsx'
import { useLang } from '../context/LangContext.jsx'
import { LeaderboardTable } from '../components/LeaderboardTable.jsx'
import { games } from '../data/games.js'
import { subjectList } from '../data/questions.js'
import { leaderboard as fallbackLeaderboard } from '../data/leaderboard.js'
import { apiLeaderboard } from '../lib/api.js'
import './arcade.css'
import '../pages/quiz.css'

export default function ArcadeLobby() {
  const { lang, t } = useLang()
  const isEn = lang === 'en'
  const [filter, setFilter] = useState('all')
  const [board, setBoard] = useState(
    fallbackLeaderboard.map((r, i) => ({ ...r, badge: r.badge || 'Pelajar', rank: i + 1 }))
  )

  useEffect(() => {
    let cancelled = false
    apiLeaderboard()
      .then((data) => {
        if (cancelled) return
        setBoard(
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

  const today = new Date()
  const dateStr = today.toLocaleDateString(isEn ? 'en-US' : 'ms-MY', { weekday: 'long', day: 'numeric', month: 'long' })
  const hour = today.getHours()
  const timeWord = isEn
    ? (hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening')
    : (hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Tengah Hari' : 'Selamat Malam')

  const getBtnTheme = (id) => {
    switch (id) {
      case 'quick': return { btn: 'btn-purple', pill: 'purple' }
      case 'myth': return { btn: 'btn-teal', pill: 'teal' }
      case 'sprint': return { btn: 'btn-gold', pill: 'gold' }
      case 'blitz': return { btn: 'btn-orange', pill: 'orange' }
      case 'boss': return { btn: 'btn-violet', pill: 'purple' }
      case 'survival': return { btn: 'btn-crimson', pill: 'crimson' }
      default: return { btn: 'btn-purple', pill: 'purple' }
    }
  }

  return (
    <AppShell
      icon="sports_esports"
      title={isEn ? 'Arcade' : 'Arcade'}
      subBadge={t('allSubjects')}
      theme="theme-arcade"
      sidebarVariant="arcade"
      aurora="teal"
    >
      {/* Top Hero Banner */}
      <div className="hero-card hero-arcade">
        <div className="hero-card-body">
          <div className="hero-status-pill">
            <span className="pulse-dot" />
            <span>{timeWord} · {dateStr}</span>
          </div>
          <h2>{isEn ? 'Time to play, Student ⚡' : t('timeToPlay').replace('{name}', 'Pelajar')}</h2>
          <p>
            {isEn
              ? '6 game modes to test your DPLI knowledge. Every victory automatically adds XP.'
              : '6 mod permainan untuk menguji pengetahuan DPLI anda. Setiap kemenangan menambah XP automatik.'}
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
          <Link className="hero-white-btn" to="/arcade.html?game=quick&subject=all">
            <i className="material-symbols-rounded">play_arrow</i> {t('playNow')} →
          </Link>
        </div>
        <div className="hero-tahap-badge">
          <span className="hero-tahap-num">1</span>
          <span className="hero-tahap-label">{isEn ? 'LEVEL' : 'TAHAP'}</span>
        </div>
      </div>

      {/* 6 Mod Permainan Header & Subject Filter */}
      <div className="notes-topics-header">
        <div className="nth-left">
          <span className="nth-title">{isEn ? '6 Game Modes' : t('gameModes')}</span>
          <div className="nth-tabs">
            {['all', ...subjectList].map((f) => {
              const label = f === 'all'
                ? (isEn ? 'All Subjects' : 'Semua Subjek')
                : (f.startsWith('5') ? 'HMML' + f : 'HPGD' + f)
              return (
                <button
                  key={f}
                  className={`nth-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
        <span className="nth-right-badge">
          {filter === 'all'
            ? (isEn ? 'All Subjects' : 'Semua Subjek')
            : (filter.startsWith('5') ? 'HMML' + filter : 'HPGD' + filter)}
        </span>
      </div>

      {/* 4-Column Games Grid */}
      <section className="games-section">
        <div className="games-grid">
          {games.map((g) => {
            const theme = getBtnTheme(g.id)
            return (
              <div className="game-card-styled" key={g.id}>
                <div className="gc-icon-top">{g.emoji}</div>
                <div className="gc-title-wrap">
                  <span className="gc-title">{isEn ? g.titleEn : g.title}</span>
                  <span className="gc-subtitle">{isEn ? g.title : g.titleEn}</span>
                </div>
                <p className="gc-desc">{g.description}</p>
                <div className="gc-pills">
                  <span className={`gc-pill ${theme.pill}`}>{g.difficulty}</span>
                  <span className={`gc-pill ${theme.pill}`}>{g.meta}</span>
                  <span className={`gc-pill ${theme.pill}`}>+{g.xp} XP</span>
                </div>
                <Link
                  className={`gc-action-btn ${theme.btn}`}
                  to={`/arcade.html?game=${g.id}&subject=${filter}`}
                >
                  <i className="material-symbols-rounded">play_arrow</i> {isEn ? 'Start Now' : 'Mula Sekarang'}
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* Ranking Leaderboard */}
      <section className="lb-section">
        <div className="section-head">
          <h3 className="uppercase">{isEn ? 'Ranking Leaderboard' : 'Ranking Leaderboard'}</h3>
          <Link to="/arcade.html?view=leaderboard" className="link-link">
            {isEn ? 'Open Full Board' : 'Buka Papan Penuh'} <i className="material-symbols-rounded">chevron_right</i>
          </Link>
        </div>
        <div className="card">
          <LeaderboardTable data={board} />
        </div>
      </section>
    </AppShell>
  )
}


