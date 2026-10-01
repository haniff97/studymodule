import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { AppShell } from '../components/AppShell.jsx'
import { LEARNIFY_AVATARS } from '../data/learnifyData.js'
import './app.css'

export default function Home() {
  const { user } = useAuth()
  const { lang } = useLang()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [courses, setCourses] = useState([])
  const [bookmarkedIds, setBookmarkedIds] = useState({})

  useEffect(() => {
    fetch('/api/content/subjects')
      .then(res => res.json())
      .then(data => {
        const colors = [
          { cardColor: 'var(--pop-yellow)', tagBg: '#23272c', tagColor: '#ffffff', badgeBg: '#23272c', badgeColor: '#ffffff' },
          { cardColor: 'var(--pop-purple)', tagBg: 'var(--pop-yellow)', tagColor: '#23272c', badgeBg: 'var(--pop-yellow)', badgeColor: '#23272c' },
          { cardColor: 'var(--pop-blue)', tagBg: 'var(--pop-peach)', tagColor: '#23272c', badgeBg: 'var(--pop-peach)', badgeColor: '#23272c' },
          { cardColor: 'var(--pop-peach)', tagBg: 'var(--pop-green)', tagColor: '#23272c', badgeBg: 'var(--pop-green)', badgeColor: '#23272c' },
          { cardColor: 'var(--pop-green)', tagBg: 'var(--pop-yellow)', tagColor: '#23272c', badgeBg: 'var(--pop-yellow)', badgeColor: '#23272c' }
        ]
        
        const mapped = data.map((sub, i) => {
          const color = colors[i % colors.length]
          return {
            id: sub.code,
            title: lang === 'en' ? sub.titleEn : sub.titleMs,
            category: sub.code.toUpperCase(),
            ...color,
            progressLabel: `0/${sub.topicCount} topics`,
            percent: 0,
            avatars: [
              LEARNIFY_AVATARS.student1,
              LEARNIFY_AVATARS.student2,
              LEARNIFY_AVATARS.student3,
            ],
            badgeText: '+120',
            targetUrl: `/notes-hub.html?subj=${sub.code}`,
            subjectCode: sub.code,
          }
        })
        setCourses(mapped)
        
        // Auto bookmark the first two courses to match previous behaviour
        if (mapped.length > 1) {
          setBookmarkedIds({
            [mapped[0].id]: true,
            [mapped[1].id]: true
          })
        }
      })
      .catch(err => console.error("Failed to fetch subjects:", err))
  }, [lang])

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const filters = [
    { id: 'all', label: lang === 'en' ? 'All courses' : 'Semua kursus' }
  ]

  const filteredCourses = courses.filter((c) => {
    if (selectedFilter === 'all') return true
    return c.category === selectedFilter
  })

  return (
    <AppShell icon="school" title="Dashboard" showSearch={true} sidebarVariant="home">
      <div className="learnify-dashboard">
        {/* Top Section: My courses */}
        <section className="courses-section">
          <div className="courses-header">
            <h1 className="courses-title">
              {lang === 'en' ? 'My courses' : 'Kursus saya'}
            </h1>

            <div className="filter-pills" role="tablist">
              <button
                type="button"
                className="filter-pill active"
                onClick={() => setSelectedFilter('all')}
              >
                {lang === 'en' ? 'All courses' : 'Semua kursus'}
              </button>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="course-cards-grid">
            {filteredCourses.map((course) => {
              const isBookmarked = bookmarkedIds[course.id]
              return (
                <div
                  key={course.id}
                  className="course-card"
                  style={{ backgroundColor: course.cardColor }}
                >
                  {/* Card Header Tag & Bookmark Ribbon */}
                  <div className="card-top-row">
                    <span
                      className="category-badge"
                      style={{
                        backgroundColor: course.tagBg,
                        color: course.tagColor,
                      }}
                    >
                      {course.category}
                    </span>
                    <button
                      type="button"
                      className="bookmark-btn"
                      onClick={() => toggleBookmark(course.id)}
                      aria-label="Bookmark course"
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    >
                      <i className="material-symbols-rounded">
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </i>
                    </button>
                  </div>

                  {/* Course Title */}
                  <h3 className="course-name">{course.title}</h3>

                  {/* Progress Row & Track */}
                  <div className="progress-section">
                    <div className="progress-labels">
                      <span className="prog-label">
                        {lang === 'en' ? 'Progress' : 'Kemajuan'}
                      </span>
                      <span className="prog-count">{course.progressLabel}</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Footer: Student Avatars & Coral Continue Button */}
                  <div className="card-bottom-row">
                    <div className="avatar-cluster" style={{ visibility: 'hidden' }}></div>
                    <Link to={course.targetUrl} className="btn-continue">
                      {lang === 'en' ? 'Continue' : 'Teruskan'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
