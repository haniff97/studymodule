import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export function LearnifyDock({ onLogout, onOpenSettings }) {
  const { lang, t } = useLang()
  const { logout } = useAuth()
  const location = useLocation()
  const path = location.pathname

  const handleSignOut = () => {
    if (onLogout) {
      onLogout()
    } else if (logout) {
      logout()
    }
  }

  const navItems = [
    {
      to: '/home',
      icon: 'grid_view',
      label: lang === 'en' ? 'Dashboard' : 'Papan Pemuka',
      active: path === '/home' || path === '/',
    },
    {
      to: '/notes-hub.html',
      icon: 'folder',
      label: lang === 'en' ? 'Courses & Notes' : 'Kursus & Nota',
      active: path.includes('notes-hub'),
    },
    {
      to: '/Study_hub_exam_full.html',
      icon: 'edit_note',
      label: lang === 'en' ? 'Exams & Practice' : 'Peperiksaan & Latihan',
      active: path.includes('exam') || path.includes('Study_hub'),
    },
    {
      to: '/tips.html',
      icon: 'chat_bubble_outline',
      label: lang === 'en' ? 'Tips & Community' : 'Tip & Komuniti',
      active: path.includes('tips'),
    },
    {
      to: '/arcade-lobby.html',
      icon: 'apps',
      label: lang === 'en' ? 'Arcade & Games' : 'Arked & Permainan',
      active: path.includes('arcade'),
    },
    {
      to: '/assignments.html',
      icon: 'bookmark_border',
      label: lang === 'en' ? 'Assignments Bank' : 'Bank Tugasan (297)',
      active: path.includes('assignments'),
    },
    {
      to: '/profile.html',
      icon: 'headphones',
      label: lang === 'en' ? 'Podcasts & Profile' : 'Audio & Profil',
      active: path.includes('profile'),
    },
  ]

  return (
    <aside className="learnify-dock" aria-label="Main Navigation">
      <div className="dock-group-top">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`dock-btn ${item.active ? 'active' : ''}`}
            title={item.label}
            aria-label={item.label}
          >
            <i className="material-symbols-rounded">{item.icon}</i>
          </Link>
        ))}
      </div>

      <div className="dock-group-bottom">
        <button
          type="button"
          className="dock-btn"
          onClick={onOpenSettings}
          title={lang === 'en' ? 'Settings' : 'Tetapan'}
          aria-label={lang === 'en' ? 'Settings' : 'Tetapan'}
        >
          <i className="material-symbols-rounded">settings</i>
        </button>

        <button
          type="button"
          className="dock-btn dock-logout"
          onClick={handleSignOut}
          title={lang === 'en' ? 'Sign Out' : 'Log Keluar'}
          aria-label={lang === 'en' ? 'Sign Out' : 'Log Keluar'}
        >
          <i className="material-symbols-rounded">logout</i>
        </button>
      </div>
    </aside>
  )
}
