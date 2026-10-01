import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { subjectList, getSubject } from '../data/questions.js'

const subjTitleKey = {
  '1103': 'subj1103',
  '1203': 'subj1203',
  '2303': 'subj2303',
  '1303': 'subj1303',
  '5103': 'subj5103',
  '5533': 'subj5533',
}

export function Sidebar({ open, onClose }) {
  const { t } = useLang()
  const { user } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/home', icon: 'home', label: 'dashboard' },
    { to: '/notes-hub.html', icon: 'menu_book', label: 'notes' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_document', label: 'exam' },
    { to: '/arcade-lobby.html', icon: 'sports_esports', label: 'games' },
    { to: '/assignments.html', icon: 'assignment', label: 'assignments' },
    { to: '/tips.html', icon: 'lightbulb', label: 'tips' },
  ]

  const isActive = (to) => {
    if (to === '/home') return location.pathname === '/home'
    return location.pathname === to
  }

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>


        <div className="sidebar-section">
          <div className="sidebar-label">{t('jumpToSubject')}</div>
          <Link className="sidebar-item" to="/home" onClick={onClose}>
            <i className="material-symbols-rounded">home</i>
            <span>{t('mainMenu')}</span>
          </Link>
          {subjectList.map((code) => {
            const sub = getSubject(code)
            return (
              <Link
                key={code}
                className="sidebar-item"
                to={`/notes-hub.html?subj=${code}`}
                onClick={onClose}
              >
                <i className="material-symbols-rounded">{sub.icon}</i>
                <div className="sb-subj-info">
                  <span className="sb-subj-code">{sub.name}</span>
                  <span className="sb-subj-desc">{t(subjTitleKey[code])}</span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">{t('studyModes')}</div>
          {nav.map((n) => (
            <Link
              key={n.to}
              className={`sidebar-item ${isActive(n.to) ? 'active' : ''}`}
              to={n.to}
              onClick={onClose}
            >
              <i className="material-symbols-rounded">{n.icon}</i>
              <span>{t(n.label)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">{t('progressSec')}</div>
          <div className="sidebar-progress">
            <div className="sp-header">
              <span className="sp-label">Topik Selesai</span>
              <span className="sp-txt">0/85</span>
            </div>
            <div className="sp-bar"><div className="sp-fill" style={{ width: '0%' }} /></div>
          </div>
          <Link className="sidebar-user" to="/profile.html" onClick={onClose}>
            <span className="su-avatar">👨‍🏫</span>
            <span className="su-meta">
              <span className="su-name">{user?.displayName || user?.username || 'Pelajar Demo'}</span>
              <span className="su-xp">⚡ {(user?.xp || 0).toLocaleString()} XP · 🔥 {user?.streak || 1}</span>
            </span>
            <span className="material-symbols-rounded">chevron_right</span>
          </Link>
        </div>
      </aside>
    </>
  )
}

// Notes-specific sidebar (with topic count badges [10] and subject-specific progress)
export function NotesSidebar({ open, onClose, selectedSubj = '1203', onSelectSubj }) {
  const { t } = useLang()
  const { user } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/home', icon: 'home', label: 'dashboard' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_document', label: 'exam' },
    { to: '/arcade-lobby.html', icon: 'sports_esports', label: 'games' },
    { to: '/assignments.html', icon: 'assignment', label: 'assignments' },
    { to: '/tips.html', icon: 'lightbulb', label: 'tips' },
  ]

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>


        <div className="sidebar-section">
          <div className="sidebar-label">{t('subjectsSec')}</div>
          {subjectList.map((code) => {
            const sub = getSubject(code)
            const isSubjActive = selectedSubj === code
            return (
              <Link
                key={code}
                className={`sidebar-item ${isSubjActive ? 'active' : ''}`}
                to={`/notes-hub.html?subj=${code}`}
                onClick={() => {
                  if (onSelectSubj) onSelectSubj(code)
                  if (onClose) onClose()
                }}
              >
                <i className="material-symbols-rounded">{sub.icon}</i>
                <div className="sb-subj-info">
                  <span className="sb-subj-code">{sub.name}</span>
                  <span className="sb-subj-desc">{t(subjTitleKey[code])}</span>
                </div>
                <span className="sb-count-badge">10</span>
              </Link>
            )
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">{t('progressSec')} HPGD{selectedSubj}</div>
          <div className="sidebar-progress">
            <div className="sp-header">
              <span className="sp-label">Topik Selesai</span>
              <span className="sp-txt">0/45</span>
            </div>
            <div className="sp-bar"><div className="sp-fill" style={{ width: '0%' }} /></div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">NAVIGASI</div>
          {nav.map((n) => (
            <Link
              key={n.to}
              className="sidebar-item"
              to={n.to}
              onClick={onClose}
            >
              <i className="material-symbols-rounded">{n.icon}</i>
              <span>{t(n.label)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-section sb-footer-sec">
          <Link className="sidebar-user" to="/profile.html" onClick={onClose}>
            <span className="su-avatar">👨‍🏫</span>
            <span className="su-meta">
              <span className="su-name">{user?.displayName || user?.username || 'Pelajar Demo'}</span>
              <span className="su-xp">⚡ {(user?.xp || 0).toLocaleString()} XP · 🔥 {user?.streak || 1} Streak</span>
            </span>
            <span className="material-symbols-rounded">chevron_right</span>
          </Link>
        </div>
      </aside>
    </>
  )
}

// Arcade-specific sidebar
export function ArcadeSidebar({ open, onClose }) {
  const { t } = useLang()
  const { user } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/home', icon: 'home', label: 'dashboard' },
    { to: '/notes-hub.html', icon: 'menu_book', label: 'notes' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_document', label: 'exam' },
    { to: '/assignments.html', icon: 'assignment', label: 'assignments' },
    { to: '/tips.html', icon: 'lightbulb', label: 'tips' },
    { to: '/arcade.html?view=leaderboard', icon: 'leaderboard', label: 'ranking_pelajar' },
  ]

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>


        <div className="sidebar-section">
          <div className="sidebar-label">{t('totalXp')}</div>
          <div className="sidebar-xp-box">
            <div className="sxp-row1">
              <span className="sxp-val">{(user?.xp || 0).toLocaleString()} XP</span>
              <span className="sxp-streak">🔥 {user?.streak || 1}</span>
            </div>
            <div className="sxp-row2">
              <span>Tahap {user?.level || 1}</span>
              <span>{(user?.xp || 0) % 500} / 500</span>
            </div>
            <div className="sp-bar">
              <div
                className="sp-fill"
                style={{ width: `${Math.min(Math.round((((user?.xp || 0) % 500) / 500) * 100), 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">PILIH SUBJEK</div>
          <Link className="sidebar-item active" to="/arcade-lobby.html" onClick={onClose}>
            <i className="material-symbols-rounded">grid_view</i>
            <span>{t('allSubjects')}</span>
            <span className="sb-count-badge">{subjectList.length}</span>
          </Link>
          {subjectList.map((code) => {
            const sub = getSubject(code)
            return (
              <Link
                key={code}
                className="sidebar-item"
                to={`/arcade-lobby.html?subj=${code}`}
                onClick={onClose}
              >
                <i className="material-symbols-rounded">{sub.icon}</i>
                <div className="sb-subj-info">
                  <span className="sb-subj-code">{sub.name}</span>
                  <span className="sb-subj-desc">{t(subjTitleKey[code])}</span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">NAVIGASI</div>
          {nav.map((n) => (
            <Link
              key={n.to}
              className={`sidebar-item ${location.pathname === n.to ? 'active' : ''}`}
              to={n.to}
              onClick={onClose}
            >
              <i className="material-symbols-rounded">{n.icon}</i>
              <span>{n.label === 'ranking_pelajar' ? t('studentRanking') : t(n.label)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-section sb-footer-sec">
          <Link className="sidebar-user" to="/profile.html" onClick={onClose}>
            <span className="su-avatar">👨‍🏫</span>
            <span className="su-meta">
              <span className="su-name">{user?.username || 'Pelajar'}</span>
              <span className="su-xp">⚡ {(user?.xp || 0).toLocaleString()} XP · 🔥 {user?.streak || 1}</span>
            </span>
            <span className="material-symbols-rounded">chevron_right</span>
          </Link>
        </div>
      </aside>
    </>
  )
}

// Exam-specific sidebar
export function ExamSidebar({ open, onClose }) {
  const { t } = useLang()
  const { user } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/home', icon: 'home', label: 'dashboard' },
    { to: '/notes-hub.html', icon: 'menu_book', label: 'notes' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_document', label: 'exam' },
    { to: '/arcade-lobby.html', icon: 'sports_esports', label: 'games' },
    { to: '/assignments.html', icon: 'assignment', label: 'assignments' },
    { to: '/tips.html', icon: 'lightbulb', label: 'tips' },
  ]

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>


        <div className="sidebar-section">
          <div className="sidebar-label">{t('examMode')}</div>
          <Link className="sidebar-item active" to="/Study_hub_exam_full.html" onClick={onClose}>
            <i className="material-symbols-rounded">quiz</i>
            <span>Mod Peperiksaan</span>
          </Link>
          <div className="sidebar-item">
            <i className="material-symbols-rounded">tune</i>
            <span>{t('setOptions')}</span>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">SET DIPILIH</div>
          <div className="sb-muted-text">Belum dipilih</div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">STATISTIK KUIZ</div>
          <div className="sb-stat-pair">
            <div className="sb-mini-box">
              <strong>9</strong>
              <span>Cubaan</span>
            </div>
            <div className="sb-mini-box">
              <strong>33%</strong>
              <span>Skor Terbaik</span>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">{t('subjectsSec')}</div>
          {subjectList.map((code) => {
            const sub = getSubject(code)
            return (
              <Link
                key={code}
                className="sidebar-item"
                to={`/Study_hub_exam_full.html?subj=${code}`}
                onClick={onClose}
              >
                <i className="material-symbols-rounded">{sub.icon}</i>
                <div className="sb-subj-info">
                  <span className="sb-subj-code">{sub.name}</span>
                  <span className="sb-subj-desc">{t(subjTitleKey[code])}</span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">{t('studyModes')}</div>
          {nav.map((n) => (
            <Link
              key={n.to}
              className={`sidebar-item ${location.pathname === n.to ? 'active' : ''}`}
              to={n.to}
              onClick={onClose}
            >
              <i className="material-symbols-rounded">{n.icon}</i>
              <span>{t(n.label)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">LATIHAN DISYORKAN</div>
          <div className="sidebar-item">
            <i className="material-symbols-rounded">star</i>
            <span>HPGD1103 · Set Mock</span>
          </div>
        </div>
      </aside>
    </>
  )
}

// Profile-specific sidebar
export function ProfileSidebar({ open, onClose, onLogout }) {
  const { t } = useLang()
  const { user } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/home', icon: 'home', label: 'dashboard' },
    { to: '/notes-hub.html', icon: 'menu_book', label: 'notes' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_document', label: 'exam' },
    { to: '/arcade-lobby.html', icon: 'sports_esports', label: 'games' },
    { to: '/assignments.html', icon: 'assignment', label: 'assignments' },
    { to: '/tips.html', icon: 'lightbulb', label: 'tips' },
  ]

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="profile-sb-head">
          <div className="psb-avatar">👨‍🏫</div>
          <div className="psb-name">{user?.username || 'Pelajar'}</div>
          <div className="psb-badge">
            <i className="material-symbols-rounded">military_tech</i> Mahir
          </div>
          <div className="psb-level-row">
            <span>Tahap {user?.level || 1}</span>
            <span>→ Tahap {(user?.level || 1) + 1}</span>
          </div>
          <div className="psb-xp-row">
            <span>{(user?.xp || 0) % 500} mata</span>
            <span>/ 500 mata</span>
          </div>
          <div className="sp-bar">
            <div
              className="sp-fill"
              style={{ width: `${Math.min(Math.round((((user?.xp || 0) % 500) / 500) * 100), 100)}%` }}
            />
          </div>

          <div className="sb-stat-pair psb-stats">
            <div className="sb-mini-box">
              <strong>{(user?.xp || 0).toLocaleString()}</strong>
              <span>⚡ XP</span>
            </div>
            <div className="sb-mini-box">
              <strong>{user?.streak || 1}</strong>
              <span>🔥 Streak</span>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">NAVIGASI</div>
          {nav.map((n) => (
            <Link
              key={n.to}
              className="sidebar-item"
              to={n.to}
              onClick={onClose}
            >
              <i className="material-symbols-rounded">{n.icon}</i>
              <span>{t(n.label)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-section sb-footer-sec">
          <button className="sb-logout-btn" onClick={onLogout}>
            <i className="material-symbols-rounded">logout</i>
            <span>{t('signOut')}</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// Assignments-specific sidebar
export function AssignmentsSidebar({ open, onClose, selectedSubject = 'ALL', onSelectSubject }) {
  const { lang, t } = useLang()
  const isEn = lang === 'en'
  const { user } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/home', icon: 'home', label: 'dashboard' },
    { to: '/notes-hub.html', icon: 'menu_book', label: 'notes' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_document', label: 'exam' },
    { to: '/arcade-lobby.html', icon: 'sports_esports', label: 'games' },
    { to: '/assignments.html', icon: 'assignment', label: 'assignments' },
    { to: '/tips.html', icon: 'lightbulb', label: 'tips' },
  ]

  const subjectsData = [
    { code: 'ALL', name: isEn ? 'All Courses' : 'Semua Kursus', count: 297, icon: 'folder_copy' },
    { code: 'HPGD1303', name: isEn ? 'History of Education' : 'Sejarah Pendidikan', count: 99, icon: 'history_edu' },
    { code: 'HMML5533', name: isEn ? 'Pedagogical Innovation BM' : 'Inovasi Pedagogi BM', count: 99, icon: 'psychology' },
    { code: 'HMML5103', name: isEn ? 'Linguistic Theory BM' : 'Teori Linguistik BM', count: 99, icon: 'translate' },
  ]

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>


        <div className="sidebar-section">
          <div className="sidebar-label">KURSUS TUGASAN (297 SET)</div>
          {subjectsData.map((s) => (
            <button
              key={s.code}
              type="button"
              className={`sidebar-item ${selectedSubject === s.code ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
              onClick={() => {
                if (onSelectSubject) onSelectSubject(s.code)
                if (onClose) onClose()
              }}
            >
              <i className="material-symbols-rounded">{s.icon}</i>
              <div className="sb-subj-info">
                <span className="sb-subj-code">{s.code === 'ALL' ? 'SEMUA' : s.code}</span>
                <span className="sb-subj-desc">{s.name}</span>
              </div>
              <span className="sb-count-badge">{s.count}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">PANDUAN FORMAT</div>
          <a
            className="sidebar-item"
            href="/CONTOH FORMAT ASSIGMENT.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <i className="material-symbols-rounded">picture_as_pdf</i>
            <div className="sb-subj-info">
              <span className="sb-subj-code">FORMAT RESMI</span>
              <span className="sb-subj-desc">Panduan Penulisan OUM (PDF)</span>
            </div>
            <i className="material-symbols-rounded" style={{ fontSize: 16, opacity: 0.6 }}>open_in_new</i>
          </a>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">{t('studyModes')}</div>
          {nav.map((n) => (
            <Link
              key={n.to}
              className={`sidebar-item ${location.pathname === n.to ? 'active' : ''}`}
              to={n.to}
              onClick={onClose}
            >
              <i className="material-symbols-rounded">{n.icon}</i>
              <span>{t(n.label)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-section sb-footer-sec">
          <Link className="sidebar-user" to="/profile.html" onClick={onClose}>
            <span className="su-avatar">👨‍🏫</span>
            <span className="su-meta">
              <span className="su-name">{user?.username || 'Pelajar'}</span>
              <span className="su-xp">⚡ {(user?.xp || 0).toLocaleString()} XP · 🔥 {user?.streak || 1}</span>
            </span>
            <span className="material-symbols-rounded">chevron_right</span>
          </Link>
        </div>
      </aside>
    </>
  )
}

