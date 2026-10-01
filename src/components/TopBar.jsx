import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { LangToggle } from './LangToggle.jsx'

const titleKeyByPath = {
  '/home': 'titleHome',
  '/notes-hub.html': 'titleNotes',
  '/Study_hub_exam_full.html': 'titleExam',
  '/exam.html': 'titleExam',
  '/arcade-lobby.html': 'titleArcade',
  '/arcade.html': 'titleArcade',
  '/tips.html': 'titleTips',
  '/profile.html': 'titleProfile',
}

import { LEARNIFY_AVATARS } from '../data/learnifyData.js'

export function TopBar({ icon = 'school', title, subBadge, showSearch = true, onMenu, isScrolled }) {
  const { isDark, toggleTheme } = useTheme()
  const { lang, t } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const username = user?.displayName || user?.username || 'Kacie Velasquez'
  const handle = user?.username ? `@${user.username}` : '@k_velasquez'

  return (
    <header className={`topbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="topbar-left">
        <button className="btn-icon hamburger" onClick={onMenu} aria-label="Menu">
          <i className="material-symbols-rounded">menu</i>
        </button>
        <div className="tb-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
          <i className="material-symbols-rounded" style={{ color: 'var(--pop-blue)', fontSize: '26px' }}>school</i>
          <span style={{ fontWeight: '800', fontSize: '18px', color: 'var(--text)' }}>SmartBrain DPLI</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="tb-circle-btn has-badge" type="button" aria-label="Notifications" title={lang === 'en' ? 'Notifications' : 'Pemberitahuan'}>
          <i className="material-symbols-rounded">notifications_none</i>
          <span className="tb-notif-dot" />
        </button>

        <Link to="/profile.html" className="tb-profile-chip" title={lang === 'en' ? 'View Profile' : 'Lihat Profil'}>
          <div className="tb-chip-avatar">
            <i className="material-symbols-rounded" style={{ fontSize: '24px', color: '#64748b' }}>person</i>
          </div>
          <div className="tb-chip-info">
            <span className="tb-chip-name">{username}</span>
            <span className="tb-chip-handle">{handle}</span>
          </div>
        </Link>

        <LangToggle />

        <button
          className={`theme-switch-toggle ${isDark ? 'dark' : 'light'}`}
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle theme"
          title={isDark ? (lang === 'en' ? 'Switch to light mode' : 'Tukar ke mod cerah') : (lang === 'en' ? 'Switch to dark mode' : 'Tukar ke mod gelap')}
        >
          <span className="theme-switch-thumb" />
        </button>
      </div>
    </header>
  )
}




