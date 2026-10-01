import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import {
  Sidebar,
  NotesSidebar,
  ArcadeSidebar,
  ExamSidebar,
  ProfileSidebar,
  AssignmentsSidebar,
} from './Sidebar.jsx'
import { LearnifyDock } from './LearnifyDock.jsx'
import { TopBar } from './TopBar.jsx'

export function AppShell({
  icon,
  title,
  subBadge,
  showSearch = true,
  children,
  theme,
  sidebarVariant = 'home',
  selectedSubj,
  onSelectSubj,
  onLogout,
  aurora,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = sidebarVariant === 'home'

  const handleScroll = (e) => {
    if (e.target.scrollTop > 10) {
      if (!isScrolled) setIsScrolled(true)
    } else {
      if (isScrolled) setIsScrolled(false)
    }
  }

  const renderSecondarySidebar = () => {
    switch (sidebarVariant) {
      case 'notes':
        return (
          <NotesSidebar
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            selectedSubj={selectedSubj}
            onSelectSubj={onSelectSubj}
          />
        )
      case 'arcade':
        return (
          <ArcadeSidebar
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        )
      case 'exam':
        return (
          <ExamSidebar
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        )
      case 'profile':
        return (
          <ProfileSidebar
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onLogout={onLogout}
          />
        )
      case 'assignments':
        return (
          <AssignmentsSidebar
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            selectedSubject={selectedSubj}
            onSelectSubject={onSelectSubj}
          />
        )
      default:
        // On mobile drawer mode, allow full menu access
        return menuOpen ? (
          <Sidebar
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        ) : null
    }
  }

  return (
    <div className="learnify-viewport">
      {aurora === 'teal' && <div className="aurora aurora-teal" aria-hidden="true" />}
      {aurora === 'violet' && (
        <div className="aurora" aria-hidden="true">
          <div className="aurora-band b1" />
          <div className="aurora-band b2" />
          <div className="aurora-band b3" />
        </div>
      )}

      {/* Main Tablet Frame with Rounded Bezel */}
      <div className={`learnify-tablet-frame ${theme || ''}`}>
        {/* Left Dark Icon Dock */}
        <LearnifyDock onLogout={onLogout} onOpenSettings={() => setMenuOpen(!menuOpen)} />

        {/* Inner Canvas Container */}
        <div className="learnify-inner-frame">
          <TopBar
            icon={icon}
            title={title}
            subBadge={subBadge}
            showSearch={showSearch}
            onMenu={() => setMenuOpen(true)}
            isScrolled={isScrolled}
          />

          <div className="learnify-body-row">
            {!isHome && renderSecondarySidebar()}
            {isHome && menuOpen && renderSecondarySidebar()}

            <main className={`learnify-content ${isHome ? 'full-bleed' : ''}`} onScroll={handleScroll}>
              {children}
            </main>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  )
}

function BottomNav() {
  const { pathname } = useLocation()
  const { lang } = useLang()
  const isEn = lang === 'en'
  const items = [
    { to: '/home', icon: 'grid_view', label: isEn ? 'Home' : 'Utama' },
    { to: '/notes-hub.html', icon: 'folder', label: isEn ? 'Courses' : 'Kursus' },
    { to: '/Study_hub_exam_full.html', icon: 'edit_note', label: isEn ? 'Exam' : 'Exam' },
    { to: '/arcade-lobby.html', icon: 'apps', label: isEn ? 'Games' : 'Arked' },
    { to: '/assignments.html', icon: 'bookmark_border', label: isEn ? 'Samples' : 'Tugasan' },
    { to: '/profile.html', icon: 'headphones', label: isEn ? 'Profile' : 'Profil' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          className={`bottom-nav-item ${pathname === it.to ? 'active' : ''}`}
        >
          <i className="material-symbols-rounded">{it.icon}</i>
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  )
}
