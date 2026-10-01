import { useEffect, useState, useMemo } from 'react'
import { AppShell } from '../components/AppShell.jsx'
import { useLang } from '../context/LangContext.jsx'
import './app.css'
import './assignments.css'

export function Assignments() {
  const { lang } = useLang()
  const isEn = lang === 'en'

  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(24)

  const [stats, setStats] = useState({ total: 297, hpgd1303: 99, hmml5533: 99, hmml5103: 99 })
  const [assignments, setAssignments] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(297)
  const [loading, setLoading] = useState(true)

  // Full Reading Modal State
  const [readingId, setReadingId] = useState(null)
  const [readingData, setReadingData] = useState(null)
  const [readingLoading, setReadingLoading] = useState(false)
  const [modalTab, setModalTab] = useState('essay') // 'essay' | 'toc' | 'ocp' | 'references'
  const [copyFeedback, setCopyFeedback] = useState(false)

  // Open Full Reading Modal
  const openReader = (id) => {
    setReadingId(id)
    setReadingLoading(true)
    setModalTab('essay')
    fetch(`/api/assignments/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject('Not found')))
      .then((data) => {
        setReadingData(data)
        setReadingLoading(false)
      })
      .catch((err) => {
        console.error('Error loading assignment detail:', err)
        setReadingLoading(false)
      })
  }

  const closeReader = () => {
    setReadingId(null)
    setReadingData(null)
    setModalTab('essay')
    setCopyFeedback(false)
  }

  // Read initial URL query parameters on mount
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search)
      const subj = sp.get('subject')
      const q = sp.get('search')
      const targetId = sp.get('id')
      if (subj && ['HPGD1303', 'HMML5533', 'HMML5103', 'ALL'].includes(subj.toUpperCase())) {
        setSelectedSubject(subj.toUpperCase())
      }
      if (q) {
        setSearchQuery(q)
        setActiveSearch(q)
      }
      if (targetId) {
        openReader(targetId)
      }
    } catch (e) {
      console.error('Error reading URL params:', e)
    }
  }, [])

  // Sync state to URL search params without page reload
  useEffect(() => {
    try {
      const sp = new URLSearchParams()
      if (selectedSubject !== 'ALL') sp.set('subject', selectedSubject)
      if (activeSearch.trim()) sp.set('search', activeSearch.trim())
      if (readingId) sp.set('id', readingId)
      const qs = sp.toString()
      const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
      window.history.replaceState(null, '', newUrl)
    } catch (e) {
      console.error('Error updating URL params:', e)
    }
  }, [selectedSubject, activeSearch, readingId])

  // Lock body scroll and close on Escape key when reader modal is open
  useEffect(() => {
    if (!readingId) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeReader()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [readingId])

  // Fetch Stats once
  useEffect(() => {
    fetch('/api/assignments/stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setStats(data)
      })
      .catch(() => {})
  }, [])

  // Fetch Paginated List
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const params = new URLSearchParams()
    if (selectedSubject !== 'ALL') params.set('subject', selectedSubject)
    if (activeSearch.trim()) params.set('search', activeSearch.trim())
    params.set('page', String(page))
    params.set('limit', String(limit))

    fetch(`/api/assignments?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : Promise.reject('Failed to load')))
      .then((data) => {
        if (cancelled) return
        setAssignments(data.items || [])
        setTotalPages(data.totalPages || 1)
        setTotalCount(data.total || 0)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        console.error('Error fetching assignments:', err)
        setAssignments([])
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [selectedSubject, activeSearch, page, limit])

  // Copy full essay text to clipboard
  const handleCopyText = () => {
    if (!readingData) return
    let text = `${readingData.courseCode} - ${readingData.courseTitle}\n`
    text += `SET ${readingData.setNumber} | ${readingData.topicFocus}\n\n`
    if (readingData.sections) {
      readingData.sections.forEach((sec) => {
        text += `\n${sec.heading}\n`
        if (sec.subsections) {
          sec.subsections.forEach((sub) => {
            text += `\n${sub.subheading}\n`
            if (sub.paragraphs) {
              sub.paragraphs.forEach((p) => {
                text += `${p}\n\n`
              })
            }
          })
        }
      })
    }
    if (readingData.references) {
      text += `\nSENARAI RUJUKAN\n`
      readingData.references.forEach((ref) => {
        text += `${ref}\n`
      })
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    })
  }

  // Handle Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    setActiveSearch(searchQuery)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setActiveSearch('')
    setPage(1)
  }

  const handleSelectSubject = (subj) => {
    setSelectedSubject(subj)
    setPage(1)
  }

  const subjectBadges = {
    HPGD1303: { label: 'HPGD1303', name: isEn ? 'History of Education' : 'Sejarah Pendidikan', count: stats.hpgd1303 || 99 },
    HMML5533: { label: 'HMML5533', name: isEn ? 'Pedagogical Innovation BM' : 'Inovasi Pedagogi BM', count: stats.hmml5533 || 99 },
    HMML5103: { label: 'HMML5103', name: isEn ? 'Linguistic Theory BM' : 'Teori Linguistik BM', count: stats.hmml5103 || 99 },
  }

  return (
    <AppShell
      icon="assignment"
      title={isEn ? 'Assignment Samples' : 'Contoh Assigment'}
      subBadge="Koleksi 297 Tugasan OUM"
      theme="theme-assignments"
      aurora="violet"
      sidebarVariant="assignments"
      selectedSubj={selectedSubject}
      onSelectSubj={handleSelectSubject}
    >
      {/* Top Hero Card */}
      <div className="hero-card hero-assignments">
        <div className="hero-card-body">
          <div className="hero-status-pill">
            <span className="pulse-dot" />
            <span>KOLEKSI 297 CONTOH TUGASAN OUM DPLI / MASTER</span>
          </div>
          <h2>Bank Contoh Tugasan Lengkap &amp; Rujukan Format 📚</h2>
          <p>
            {isEn
              ? 'Access 297 complete Open University Malaysia assignment exemplars across 3 core subjects. Each set includes critical essay analysis, 10-slide oral presentation scripts, 5 OCP discussion posts, and APA 7th references.'
              : 'Akses 297 contoh tugasan lengkap Open University Malaysia merangkumi 3 kursus pengkhususan. Setiap set mengandungi esei penilaian kritis, rangka slaid & skrip pembentangan lisan, 5 hantaran forum OCP myINSPIRE, dan rujukan lengkap format APA Edisi Ke-7.'}
          </p>

          <div className="hero-chips-row">
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">library_books</i> 297 Modul Lengkap
            </span>
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">description</i> Fail Asal Word (.docx)
            </span>
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">forum</i> 5 Hantaran OCP Setiap Set
            </span>
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">format_quote</i> Rujukan APA 7th
            </span>
          </div>

          <div className="hero-assignments-actions">
            <a
              href="/CONTOH FORMAT ASSIGMENT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-pdf"
            >
              <i className="material-symbols-rounded">picture_as_pdf</i>
              <span>{isEn ? 'Official Format Guidelines (PDF)' : 'Panduan Format Tugasan (PDF)'}</span>
            </a>
            <a
              href="/DOCX_FILES/HPGD1303_History_Of_Education/HPGD1303_Set_01.docx"
              download
              className="hero-btn-secondary"
            >
              <i className="material-symbols-rounded">download</i>
              <span>{isEn ? 'Sample Word (.docx)' : 'Muat Turun Contoh Word'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="assign-stats-row">
        <div className="assign-stat-card">
          <div className="assign-stat-icon purple">
            <i className="material-symbols-rounded">folder_special</i>
          </div>
          <div>
            <div className="assign-stat-val">{stats.total || 297}</div>
            <div className="assign-stat-title">{isEn ? 'Total Assignments' : 'Jumlah Keseluruhan'}</div>
          </div>
        </div>

        <div className="assign-stat-card">
          <div className="assign-stat-icon indigo">
            <i className="material-symbols-rounded">history_edu</i>
          </div>
          <div>
            <div className="assign-stat-val">{stats.hpgd1303 || 99} Set</div>
            <div className="assign-stat-title">HPGD1303 Sejarah Pendidikan</div>
          </div>
        </div>

        <div className="assign-stat-card">
          <div className="assign-stat-icon emerald">
            <i className="material-symbols-rounded">psychology</i>
          </div>
          <div>
            <div className="assign-stat-val">{stats.hmml5533 || 99} Set</div>
            <div className="assign-stat-title">HMML5533 Inovasi Pedagogi</div>
          </div>
        </div>

        <div className="assign-stat-card">
          <div className="assign-stat-icon amber">
            <i className="material-symbols-rounded">translate</i>
          </div>
          <div>
            <div className="assign-stat-val">{stats.hmml5103 || 99} Set</div>
            <div className="assign-stat-title">HMML5103 Teori Linguistik</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="assign-controls-wrap">
        <div className="assign-tabs-row">
          <button
            type="button"
            className={`assign-tab-btn ${selectedSubject === 'ALL' ? 'active' : ''}`}
            onClick={() => handleSelectSubject('ALL')}
          >
            <i className="material-symbols-rounded">grid_view</i>
            <span>{isEn ? 'All Subjects' : 'Semua Subjek'}</span>
            <span className="assign-tab-count">{stats.total || 297}</span>
          </button>

          {Object.entries(subjectBadges).map(([code, data]) => (
            <button
              key={code}
              type="button"
              className={`assign-tab-btn ${selectedSubject === code ? 'active' : ''}`}
              onClick={() => handleSelectSubject(code)}
            >
              <i className="material-symbols-rounded">
                {code === 'HPGD1303' ? 'history_edu' : code === 'HMML5533' ? 'psychology' : 'translate'}
              </i>
              <span>{code} · {data.name}</span>
              <span className="assign-tab-count">{data.count}</span>
            </button>
          ))}
        </div>

        <form className="assign-search-row" onSubmit={handleSearchSubmit}>
          <div className="assign-search-box">
            <i className="material-symbols-rounded search-icon">search</i>
            <input
              type="text"
              className="assign-search-input"
              placeholder={
                isEn
                  ? 'Search by topic focus, set number (e.g. Set 05), or subject...'
                  : 'Cari mengikut fokus topik, nombor set (cth: Set 10), atau kata kunci...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="assign-search-clear"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <i className="material-symbols-rounded">close</i>
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '9px 18px' }}>
            <i className="material-symbols-rounded">search</i>
            <span>{isEn ? 'Search' : 'Cari'}</span>
          </button>
        </form>

        <div className="assign-result-meta">
          <i className="material-symbols-rounded" style={{ fontSize: 16, color: '#8b5cf6' }}>info</i>
          <span>
            {isEn
              ? `Showing ${assignments.length} of ${totalCount} assignment samples (Page ${page} of ${totalPages})`
              : `Menunjukkan ${assignments.length} daripada ${totalCount} contoh tugasan (Halaman ${page} daripada ${totalPages})`}
          </span>
        </div>
      </div>

      {/* Grid of Assignment Cards */}
      {loading ? (
        <div className="assign-empty-state">
          <i className="material-symbols-rounded" style={{ animation: 'spin 1s infinite linear' }}>
            sync
          </i>
          <h4>{isEn ? 'Loading assignments...' : 'Memuatkan senarai contoh tugasan...'}</h4>
          <p>{isEn ? 'Please wait a moment.' : 'Sila tunggu sebentar.'}</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="assign-empty-state">
          <i className="material-symbols-rounded">folder_off</i>
          <h4>{isEn ? 'No assignments found' : 'Tiada contoh tugasan dijumpai'}</h4>
          <p>{isEn ? 'Try adjusting your search query or subject filter.' : 'Cuba ubah kata kunci carian atau pilih subjek lain.'}</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 12 }}
            onClick={handleClearSearch}
          >
            {isEn ? 'Reset Search' : 'Set Semula Carian'}
          </button>
        </div>
      ) : (
        <div className="assign-grid">
          {assignments.map((item) => (
            <div className="assign-card" key={item.id}>
              <div>
                <div className="assign-card-head">
                  <span className={`assign-code-badge ${item.subjectCode}`}>
                    {item.courseCode || item.subjectCode}
                  </span>
                  <span className="assign-set-chip">SET {String(item.setNumber).padStart(2, '0')}</span>
                </div>

                <h3 className="assign-card-title">{item.courseTitle}</h3>

                <div className="assign-focus-box">
                  <div className="assign-focus-label">Fokus Topik &amp; Analisis</div>
                  <div className="assign-focus-txt" title={item.topicFocus}>
                    {item.topicFocus}
                  </div>
                </div>

                <div className="assign-meta-row">
                  <div className="assign-meta-item">
                    <i className="material-symbols-rounded">menu_book</i>
                    <span>{item.wordCount || '2,800 perkataan'}</span>
                  </div>
                  <div className="assign-meta-item">
                    <i className="material-symbols-rounded">school</i>
                    <span>OUM Sem 2 / 2026</span>
                  </div>
                </div>
              </div>

              <div className="assign-card-actions">
                <button
                  type="button"
                  className="btn-read-assign"
                  onClick={() => openReader(item.id)}
                >
                  <i className="material-symbols-rounded">menu_book</i>
                  <span>{isEn ? 'Read Full' : 'Baca Lengkap'}</span>
                </button>

                <a
                  href={`/api/assignments/${item.id}/download`}
                  download
                  className="btn-docx-download"
                  title="Muat Turun Fail Asal Microsoft Word (.docx)"
                >
                  <i className="material-symbols-rounded">download</i>
                  <span>Word (.docx)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="assign-pagination">
          <button
            type="button"
            className="page-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <i className="material-symbols-rounded">chevron_left</i>
            <span>{isEn ? 'Prev' : 'Sebelumnya'}</span>
          </button>

          <span className="page-info-txt">
            {isEn ? `Page ${page} of ${totalPages}` : `Halaman ${page} daripada ${totalPages}`}
          </span>

          <button
            type="button"
            className="page-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <span>{isEn ? 'Next' : 'Seterusnya'}</span>
            <i className="material-symbols-rounded">chevron_right</i>
          </button>
        </div>
      )}

      {/* Full Reading Modal */}
      {readingId && (
        <div className="assign-modal-overlay" onClick={closeReader}>
          <div className="assign-modal-container" onClick={(e) => e.stopPropagation()}>
            {readingLoading || !readingData ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#cbd5e1' }}>
                <i className="material-symbols-rounded" style={{ fontSize: 48, animation: 'spin 1s infinite linear' }}>
                  sync
                </i>
                <h4 style={{ marginTop: 16 }}>Memuatkan modul lengkap tugasan...</h4>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className="assign-modal-header">
                  <div className="modal-head-left">
                    <div className="modal-badges-row">
                      <span className={`assign-code-badge ${readingData.subjectCode}`}>
                        {readingData.courseCode}
                      </span>
                      <span className="assign-set-chip">
                        SET {String(readingData.setNumber).padStart(2, '0')}
                      </span>
                      <span className="assign-set-chip" style={{ color: '#c4b5fd' }}>
                        {readingData.wordCount}
                      </span>
                    </div>
                    <h2 className="modal-title">{readingData.courseTitle}</h2>
                    <p className="modal-subtitle">{readingData.topicFocus}</p>
                  </div>

                  <div className="modal-head-actions">
                    <button
                      type="button"
                      className="hero-btn-secondary modal-btn-copy"
                      onClick={handleCopyText}
                    >
                      <i className="material-symbols-rounded">
                        {copyFeedback ? 'check' : 'content_copy'}
                      </i>
                      <span>{copyFeedback ? 'Disalin!' : 'Salin Teks'}</span>
                    </button>

                    <a
                      href={`/api/assignments/${readingData.id}/download`}
                      download
                      className="modal-btn-download"
                      title="Muat Turun Fail Word Asal"
                    >
                      <i className="material-symbols-rounded">download</i>
                      <span>Muat Turun .docx</span>
                    </a>

                    <button
                      type="button"
                      className="modal-btn-close"
                      onClick={closeReader}
                      aria-label="Tutup Paparan"
                    >
                      <i className="material-symbols-rounded">close</i>
                    </button>
                  </div>
                </div>

                {/* Modal Tabs */}
                <div className="assign-modal-tabs">
                  <button
                    type="button"
                    className={`modal-tab-item ${modalTab === 'essay' ? 'active' : ''}`}
                    onClick={() => setModalTab('essay')}
                  >
                    <i className="material-symbols-rounded">article</i>
                    <span>Kandungan Esei &amp; Slaid</span>
                  </button>

                  <button
                    type="button"
                    className={`modal-tab-item ${modalTab === 'toc' ? 'active' : ''}`}
                    onClick={() => setModalTab('toc')}
                  >
                    <i className="material-symbols-rounded">format_list_numbered</i>
                    <span>Jadual Kandungan ({readingData.toc?.length || 0})</span>
                  </button>

                  <button
                    type="button"
                    className={`modal-tab-item ${modalTab === 'ocp' ? 'active' : ''}`}
                    onClick={() => setModalTab('ocp')}
                  >
                    <i className="material-symbols-rounded">forum</i>
                    <span>Forum OCP ({readingData.ocpPosts?.length || 0} Hantaran)</span>
                  </button>

                  <button
                    type="button"
                    className={`modal-tab-item ${modalTab === 'references' ? 'active' : ''}`}
                    onClick={() => setModalTab('references')}
                  >
                    <i className="material-symbols-rounded">auto_stories</i>
                    <span>Senarai Rujukan ({readingData.references?.length || 0})</span>
                  </button>
                </div>

                {/* Modal Content Body */}
                <div className="assign-modal-body">
                  {/* TAB 1: ESEI & KANDUNGAN */}
                  {modalTab === 'essay' && (
                    <div>
                      {/* Cover Card */}
                      <div className="reader-cover-card">
                        <div className="cover-meta-cell">
                          <strong>Kod &amp; Nama Kursus</strong>
                          <span>{readingData.courseCode} - {readingData.courseTitle}</span>
                        </div>
                        <div className="cover-meta-cell">
                          <strong>Program Pengajian</strong>
                          <span>{readingData.program || 'Postgraduate Diploma in Teaching (PGDT) / MEd'}</span>
                        </div>
                        <div className="cover-meta-cell">
                          <strong>Semester Akademik</strong>
                          <span>{readingData.semester || 'Semester 2 / 2026'}</span>
                        </div>
                        <div className="cover-meta-cell">
                          <strong>Panjang Manuskrip</strong>
                          <span>{readingData.wordCount} (Mematuhi had 2,500 - 3,000 patah perkataan)</span>
                        </div>
                      </div>

                      {/* Sections */}
                      {readingData.sections && readingData.sections.length > 0 ? (
                        readingData.sections.map((sec, secIdx) => (
                          <div className="reader-section-block" key={secIdx}>
                            <h3 className="reader-section-title">{sec.heading}</h3>

                            {sec.subsections &&
                              sec.subsections.map((sub, subIdx) => (
                                <div className="reader-subsection-block" key={subIdx}>
                                  <h4 className="reader-subsection-title">{sub.subheading}</h4>

                                  {sub.paragraphs &&
                                    sub.paragraphs.map((p, pIdx) => (
                                      <p className="reader-p" key={pIdx}>
                                        {p}
                                      </p>
                                    ))}

                                  {/* Render Structured Table if present */}
                                  {sub.tableData && sub.tableData.headers && (
                                    <div className="reader-table-wrap">
                                      <table className="reader-table">
                                        <thead>
                                          <tr>
                                            {sub.tableData.headers.map((th, thIdx) => (
                                              <th key={thIdx}>{th}</th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {sub.tableData.rows.map((row, rIdx) => (
                                            <tr key={rIdx}>
                                              {row.map((cell, cIdx) => (
                                                <td key={cIdx}>{cell}</td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        ))
                      ) : (
                        <p className="reader-p">Tiada seksyen esei dijumpai.</p>
                      )}
                    </div>
                  )}

                  {/* TAB 2: JADUAL KANDUNGAN */}
                  {modalTab === 'toc' && (
                    <div className="toc-list">
                      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>
                        Struktur jadual kandungan lengkap tugasan berserta halaman rujukan:
                      </p>
                      {readingData.toc && readingData.toc.length > 0 ? (
                        readingData.toc.map((tItem, tIdx) => (
                          <div className="toc-item" key={tIdx}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span className="toc-no">{tItem.no}</span>
                              <span className="toc-title">{tItem.title}</span>
                            </div>
                            <span className="toc-page">Muka Surat {tItem.page}</span>
                          </div>
                        ))
                      ) : (
                        <p>Tiada data jadual kandungan.</p>
                      )}
                    </div>
                  )}

                  {/* TAB 3: OCP FORUM POSTS */}
                  {modalTab === 'ocp' && (
                    <div className="ocp-posts-list">
                      <div style={{ marginBottom: 10 }}>
                        <span className="hero-badge-chip" style={{ background: 'rgba(99,102,241,0.2)' }}>
                          BAHAGIAN II: PENYERTAAN KELAS DALAM TALIAN (OCP FORUM MYINSPIRE - 10%)
                        </span>
                      </div>
                      {readingData.ocpPosts && readingData.ocpPosts.length > 0 ? (
                        readingData.ocpPosts.map((post, pIdx) => (
                          <div className="ocp-card" key={pIdx}>
                            <div className="ocp-card-head">
                              <div className="ocp-author-box">
                                <div className="ocp-avatar">👨‍🎓</div>
                                <div>
                                  <div className="ocp-author-name">Pelajar DPLI</div>
                                  <div className="ocp-date">{post.date}</div>
                                </div>
                              </div>
                              <span className="ocp-topic-pill">{post.forum}</span>
                            </div>

                            <h4 className="ocp-post-title">{post.title}</h4>
                            <p className="ocp-post-content">{post.content}</p>
                          </div>
                        ))
                      ) : (
                        <p>Tiada hantaran forum OCP dijumpai.</p>
                      )}
                    </div>
                  )}

                  {/* TAB 4: SENARAI RUJUKAN */}
                  {modalTab === 'references' && (
                    <div className="references-list">
                      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>
                        Senarai bahan rujukan akademik yang diselaraskan mengikut format <strong>American Psychological Association (APA) 7th Edition</strong>:
                      </p>
                      {readingData.references && readingData.references.length > 0 ? (
                        readingData.references.map((ref, rIdx) => (
                          <div className="ref-item" key={rIdx}>
                            <i className="material-symbols-rounded">library_books</i>
                            <span>{ref}</span>
                          </div>
                        ))
                      ) : (
                        <p>Tiada senarai rujukan dijumpai.</p>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}

export default Assignments
