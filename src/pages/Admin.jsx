import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { LangToggle } from '../components/LangToggle.jsx'
import './admin.css'

const api = (path, opts = {}) =>
  fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })

export default function Admin() {
  const { user, loading, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [tab, setTab] = useState('users')

  const [toast, setToast] = useState(null)
  const showToast = (msg, type = 'ok') => {
    setToast({ msg, type })
  }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    if (!loading && !user) navigate('/login', { replace: true })
    if (user && user.role !== 'admin') navigate('/home', { replace: true })
  }, [loading, user, navigate])

  if (loading || !user || user.role !== 'admin') {
    return null
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const tabs = [
    { id: 'users', label: 'Pengguna', icon: 'group' },
    { id: 'subjects', label: 'Subjek & Topik', icon: 'category' },
    { id: 'notes', label: 'Nota', icon: 'menu_book' },
    { id: 'questions', label: 'Set & Soalan', icon: 'quiz' },
    { id: 'quizzes', label: 'Kuiz', icon: 'fact_check' },
    { id: 'flashcards', label: 'Kad Imbas', icon: 'style' },
    { id: 'tips', label: 'Tips', icon: 'lightbulb' },
  ]

  return (
    <div className="admin-viewport">
      <div className="aurora" aria-hidden="true">
        <div className="aurora-band b1" />
        <div className="aurora-band b2" />
        <div className="aurora-band b3" />
      </div>

      <div className="admin-shell">
        <header className="admin-topbar">
          <div className="admin-tb-left">
            <div className="admin-tb-title">
              <i className="material-symbols-rounded">admin_panel_settings</i>
              <span className="admin-tb-brand">SmartBrain DPLI · </span>
              <span className="admin-tb-role">Portal Pentadbir</span>
            </div>
          </div>
          <div className="admin-tb-actions">
            <span className="admin-tb-user">
              <i className="material-symbols-rounded">account_circle</i>
              <span className="admin-user-name">{user.username}</span>
            </span>
            <LangToggle />
            <button
              className={`theme-switch-toggle ${isDark ? 'dark' : 'light'}`}
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              title={isDark ? 'Tukar ke mod cerah' : 'Tukar ke mod gelap'}
            >
              <span className="theme-switch-thumb" />
            </button>
            <button className="admin-logout-btn" onClick={handleLogout} title="Log Keluar">
              <i className="material-symbols-rounded">logout</i>
              <span className="admin-logout-text">Log Keluar</span>
            </button>
          </div>
        </header>


        <nav className="admin-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`admin-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <i className="material-symbols-rounded">{t.icon}</i>
              {t.label}
            </button>
          ))}
        </nav>

        <main className="admin-content">
          {tab === 'users' && <UsersTab showToast={showToast} currentId={user.id} />}
          {tab === 'subjects' && <SubjectsTab showToast={showToast} />}
          {tab === 'notes' && <NotesTab showToast={showToast} />}
          {tab === 'questions' && <QuestionsTab showToast={showToast} />}
          {tab === 'quizzes' && <QuizzesTab showToast={showToast} />}
          {tab === 'flashcards' && <FlashcardsTab showToast={showToast} />}
          {tab === 'tips' && <TipsTab showToast={showToast} />}
        </main>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}

/* ---------------- helpers ---------------- */

function errorMsg(res, fallback) {
  return res && res.error ? res.error : fallback
}

async function postJson(path, body, okMsg, showToast, errFallback) {
  const res = await api(path, { method: 'POST', body: JSON.stringify(body) })
  let data = null
  try {
    data = await res.json()
  } catch {}
  if (!res.ok) {
    showToast(errorMsg(data, errFallback), 'err')
    return null
  }
  showToast(okMsg)
  return data
}

async function delJson(path, okMsg, showToast) {
  const res = await api(path, { method: 'DELETE' })
  if (!res.ok) {
    let data = null
    try {
      data = await res.json()
    } catch {}
    showToast(errorMsg(data, 'Gagal memadam.'), 'err')
    return false
  }
  showToast(okMsg)
  return true
}

/* ---------------- Tab A: Users ---------------- */

function UsersTab({ showToast, currentId }) {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ username: '', displayName: '', password: '' })
  const [progressOf, setProgressOf] = useState(null)

  const load = async () => {
    const res = await api('/api/admin/users')
    if (res.ok) setUsers(await res.json())
  }
  useEffect(() => {
    load()
  }, [])

  const create = async (e) => {
    e.preventDefault()
    const data = await postJson(
      '/api/admin/users',
      form,
      'Pengguna dicipta.',
      showToast,
      'Gagal mencipta pengguna.'
    )
    if (data) {
      if (data.error) showToast(data.error, 'err')
      setForm({ username: '', displayName: '', password: '' })
      load()
    }
  }

  const resetPw = async (u) => {
    const pw = window.prompt(`Tetapkan kata laluan baharu untuk ${u.username}:`)
    if (!pw) return
    await postJson(
      `/api/admin/users/${u.id}/reset-password`,
      { password: pw },
      'Kata laluan telah ditetapkan semula.',
      showToast,
      'Gagal menetapkan semula.'
    )
  }

  const deleteUser = async (u) => {
    if (!window.confirm(`Padam pengguna ${u.username}?`)) return
    const ok = await delJson(`/api/admin/users/${u.id}`, 'Pengguna dipadam.', showToast)
    if (ok) load()
  }

  const viewProgress = async (u) => {
    const res = await api(`/api/admin/users/${u.id}/progress`)
    if (!res.ok) {
      showToast('Gagal memuatkan progress.', 'err')
      return
    }
    setProgressOf({ user: u, rows: await res.json() })
  }

  return (
    <section className="admin-section">
      <div className="admin-panel">
        <h3 className="admin-panel-title">Cipta Pengguna</h3>
        <form className="admin-form admin-form-row" onSubmit={create}>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            placeholder="Nama paparan"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          />
          <input
            type="password"
            placeholder="Kata laluan"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Cipta</button>
        </form>
      </div>

      <div className="admin-panel">
        <h3 className="admin-panel-title">Senarai Pengguna</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nama</th>
                <th>Peranan</th>
                <th>XP</th>
                <th>Tahap</th>
                <th>Streak</th>
                <th>Dicipta</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.displayName}</td>
                  <td>
                    <span className={`admin-role admin-role-${u.role}`}>{u.role}</span>
                  </td>
                  <td>{u.xp}</td>
                  <td>{u.level}</td>
                  <td>{u.streak}</td>
                  <td>{u.createdAt}</td>
                  <td className="admin-actions">
                    <button onClick={() => resetPw(u)} title="Reset Password">
                      <i className="material-symbols-rounded">key</i>
                    </button>
                    <button onClick={() => viewProgress(u)} title="Progress">
                      <i className="material-symbols-rounded">assessment</i>
                    </button>
                    <button
                      onClick={() => deleteUser(u)}
                      disabled={u.id === currentId}
                      title={u.id === currentId ? 'Tidak boleh padam sendiri' : 'Padam'}
                    >
                      <i className="material-symbols-rounded">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {progressOf && (
        <div className="admin-panel admin-progress-panel">
          <div className="admin-panel-head">
            <h3 className="admin-panel-title">Progress · {progressOf.user.username}</h3>
            <button className="admin-close" onClick={() => setProgressOf(null)}>
              <i className="material-symbols-rounded">close</i>
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Topik</th>
                  <th>Siap</th>
                  <th>Skor Terbaik</th>
                  <th>Kemas kini</th>
                </tr>
              </thead>
              <tbody>
                {progressOf.rows.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="admin-empty">
                      Tiada progress.
                    </td>
                  </tr>
                ) : (
                  progressOf.rows.map((r, i) => (
                    <tr key={i}>
                      <td>{r.topicCode}</td>
                      <td>{r.completed ? 'Ya' : 'Belum'}</td>
                      <td>{r.bestScore != null ? `${r.bestScore}%` : '—'}</td>
                      <td>{r.updatedAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------------- Tab B: Subjects & Topics ---------------- */

function SubjectsTab({ showToast }) {
  const [subjects, setSubjects] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [topics, setTopics] = useState({})
  const [subjForm, setSubjForm] = useState({ code: '', titleMs: '', titleEn: '', icon: '' })
  const [topicForm, setTopicForm] = useState({ code: '', titleMs: '', titleEn: '' })

  const loadSubjects = async () => {
    const res = await api('/api/content/subjects')
    if (res.ok) setSubjects(await res.json())
  }
  useEffect(() => {
    loadSubjects()
  }, [])

  const toggle = async (subj) => {
    const next = expanded === subj.id ? null : subj.id
    setExpanded(next)
    if (next) {
      const res = await api(`/api/content/topics/${subj.code}`)
      const rows = res.ok ? await res.json() : []
      setTopics((p) => ({ ...p, [subj.id]: rows }))
    }
  }

  const createSubject = async (e) => {
    e.preventDefault()
    await postJson('/api/admin/subjects', subjForm, 'Subjek dicipta.', showToast, 'Gagal cipta subjek.')
    setSubjForm({ code: '', titleMs: '', titleEn: '', icon: '' })
    loadSubjects()
  }

  const createTopic = async (e, subj) => {
    e.preventDefault()
    const data = await postJson(
      '/api/admin/topics',
      { subjectCode: subj.code, ...topicForm },
      'Topik ditambah.',
      showToast,
      'Gagal tambah topik.'
    )
    if (data) {
      setTopicForm({ code: '', titleMs: '', titleEn: '' })
      toggle(subj)
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-panel">
        <h3 className="admin-panel-title">Cipta Subjek</h3>
        <form className="admin-form admin-form-row" onSubmit={createSubject}>
          <input
            placeholder="Kod (cth: hpgd1104)"
            value={subjForm.code}
            onChange={(e) => setSubjForm({ ...subjForm, code: e.target.value })}
            required
          />
          <input
            placeholder="Tajuk (BM)"
            value={subjForm.titleMs}
            onChange={(e) => setSubjForm({ ...subjForm, titleMs: e.target.value })}
            required
          />
          <input
            placeholder="Tajuk (EN)"
            value={subjForm.titleEn}
            onChange={(e) => setSubjForm({ ...subjForm, titleEn: e.target.value })}
          />
          <input
            placeholder="Ikon"
            value={subjForm.icon}
            onChange={(e) => setSubjForm({ ...subjForm, icon: e.target.value })}
          />
          <button type="submit">Cipta</button>
        </form>
      </div>

      <div className="admin-panel">
        <h3 className="admin-panel-title">Subjek & Topik</h3>
        {subjects.map((s) => (
          <div key={s.id} className="admin-subject">
            <button className="admin-subject-row" onClick={() => toggle(s)}>
              <span className="admin-subj-icon">
                <i className="material-symbols-rounded">{s.icon}</i>
              </span>
              <span className="admin-subj-info">
                <strong>{s.code}</strong> — {s.titleMs} · {s.titleEn}
              </span>
              <span className="admin-subj-count">{s.topicCount} topik</span>
              <i className="material-symbols-rounded admin-caret">
                {expanded === s.id ? 'expand_less' : 'expand_more'}
              </i>
            </button>

            {expanded === s.id && (
              <div className="admin-topic-list">
                {(topics[s.id] || []).map((t) => (
                  <div key={t.id} className="admin-topic-row">
                    <span className="admin-topic-code">{t.code}</span>
                    <span className="admin-topic-title">
                      {t.titleMs} · {t.titleEn}
                    </span>
                  </div>
                ))}
                <form
                  className="admin-form admin-form-row admin-form-inline"
                  onSubmit={(e) => createTopic(e, s)}
                >
                  <input
                    placeholder="Kod topik (t11)"
                    value={topicForm.code}
                    onChange={(e) => setTopicForm({ ...topicForm, code: e.target.value })}
                    required
                  />
                  <input
                    placeholder="Tajuk (BM)"
                    value={topicForm.titleMs}
                    onChange={(e) => setTopicForm({ ...topicForm, titleMs: e.target.value })}
                    required
                  />
                  <input
                    placeholder="Tajuk (EN)"
                    value={topicForm.titleEn}
                    onChange={(e) => setTopicForm({ ...topicForm, titleEn: e.target.value })}
                  />
                  <button type="submit">Tambah Topik</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- shared data loaders ---------------- */

function useLoad(loader) {
  const [state, setState] = useState({ data: null, loading: true })
  const load = async () => {
    setState((p) => ({ ...p, loading: true }))
    const res = await loader()
    if (res) setState({ data: res, loading: false })
    else setState({ data: null, loading: false })
  }
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { ...state, reload: load }
}

async function loadSubjects() {
  const res = await api('/api/content/subjects')
  return res.ok ? await res.json() : null
}

/* ---------------- shared selectors ---------------- */

function SubjectSelect({ subjects, value, onChange }) {
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">— Pilih subjek —</option>
      {subjects.map((s) => (
        <option key={s.id} value={s.id}>
          {s.code} — {s.titleMs}
        </option>
      ))}
    </select>
  )
}

/* ---------------- Tab C: Notes ---------------- */

function NotesTab({ showToast }) {
  const subjects = useLoad(loadSubjects)
  const [subjectId, setSubjectId] = useState('')
  const [topicId, setTopicId] = useState('')
  const [notes, setNotes] = useState([])
  const [addForm, setAddForm] = useState({ sectionOrder: '', heading: '', contentHtml: '', isFokus: false })

  const loadNotes = async (tid) => {
    const res = await api(`/api/content/notes/${tid}`)
    if (res.ok) setNotes(await res.json())
  }

  const onSubject = async (id) => {
    setSubjectId(id)
    setTopicId('')
    setNotes([])
  }

  const onTopic = async (id) => {
    setTopicId(id)
    loadNotes(id)
  }

  const addNote = async (e) => {
    e.preventDefault()
    await postJson(
      '/api/admin/materials/notes',
      { topicId: Number(topicId), ...addForm, sectionOrder: Number(addForm.sectionOrder) || 0 },
      'Seksyen nota ditambah.',
      showToast,
      'Gagal tambah nota.'
    )
    setAddForm({ sectionOrder: '', heading: '', contentHtml: '', isFokus: false })
    loadNotes(topicId)
  }

  const updateNote = async (n) => {
    const heading = window.prompt('Heading:', n.heading)
    const content = window.prompt('Content HTML:', n.contentHtml)
    const fokus = window.prompt('Fokus Peperiksaan? (ya/tidak):', n.isFokus ? 'ya' : 'tidak') === 'ya'
    await postJson(
      '/api/admin/materials/notes',
      {
        topicId: Number(topicId),
        sectionOrder: n.sectionOrder,
        heading,
        contentHtml: content,
        isFokus: fokus,
      },
      'Nota dikemas kini.',
      showToast,
      'Gagal kemas kini.'
    )
    loadNotes(topicId)
  }

  const deleteNote = async (n) => {
    if (!window.confirm('Padam seksyen nota ini?')) return
    const ok = await delJson(`/api/admin/materials/notes/${n.id}`, 'Nota dipadam.', showToast)
    if (ok) loadNotes(topicId)
  }

  return (
    <section className="admin-section">
      <SubjectSelect subjects={subjects.data || []} value={subjectId} onChange={onSubject} />
      <TopicsBySubject subjects={subjects.data || []} subjectId={subjectId} value={topicId} onChange={onTopic} />
      {topicId && (
        <>
          <div className="admin-panel">
            <h3 className="admin-panel-title">Tambah Seksyen Nota</h3>
            <form className="admin-form admin-form-stack" onSubmit={addNote}>
              <div className="admin-form-row">
                <input
                  type="number"
                  placeholder="sectionOrder"
                  value={addForm.sectionOrder}
                  onChange={(e) => setAddForm({ ...addForm, sectionOrder: e.target.value })}
                />
                <input
                  placeholder="Heading"
                  value={addForm.heading}
                  onChange={(e) => setAddForm({ ...addForm, heading: e.target.value })}
                  required
                />
              </div>
              <textarea
                placeholder="Content HTML"
                value={addForm.contentHtml}
                onChange={(e) => setAddForm({ ...addForm, contentHtml: e.target.value })}
                required
              />
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={addForm.isFokus}
                  onChange={(e) => setAddForm({ ...addForm, isFokus: e.target.checked })}
                />
                Fokus Peperiksaan
              </label>
              <button type="submit">Tambah Seksyen</button>
            </form>
          </div>

          <div className="admin-panel">
            <h3 className="admin-panel-title">Seksyen Nota</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Heading</th>
                    <th>Fokus</th>
                    <th>Pratonton</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((n) => (
                    <tr key={n.id}>
                      <td>{n.sectionOrder}</td>
                      <td>{n.heading}</td>
                      <td>{n.isFokus ? 'Ya' : 'Tidak'}</td>
                      <td className="admin-preview" dangerouslySetInnerHTML={{ __html: n.contentHtml }} />
                      <td className="admin-actions">
                        <button onClick={() => updateNote(n)} title="Edit">
                          <i className="material-symbols-rounded">edit</i>
                        </button>
                        <button onClick={() => deleteNote(n)} title="Padam">
                          <i className="material-symbols-rounded">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      )}
    </section>
  )
}

/* Loads topics for a selected subject and renders a select. */
function TopicsBySubject({ subjects, subjectId, value, onChange }) {
  const [topics, setTopics] = useState([])
  useEffect(() => {
    if (!subjectId) {
      setTopics([])
      return
    }
    const subj = subjects.find((s) => String(s.id) === String(subjectId))
    if (!subj) {
      setTopics([])
      return
    }
    api(`/api/content/topics/${subj.code}`).then(async (res) => {
      if (res.ok) setTopics(await res.json())
    })
  }, [subjectId, subjects])
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={!subjectId}>
      <option value="">— Pilih topik —</option>
      {topics.map((t) => (
        <option key={t.id} value={t.id}>
          {t.code} — {t.titleMs}
        </option>
      ))}
    </select>
  )
}

/* ---------------- Tab D: Sets & Questions ---------------- */

function QuestionsTab({ showToast }) {
  const subjects = useLoad(loadSubjects)
  const [subjectId, setSubjectId] = useState('')
  const [setId, setSetId] = useState('')
  const [questions, setQuestions] = useState([])
  const [setForm, setSetForm] = useState({ code: '', titleMs: '', titleEn: '', difficulty: 'medium', numQuestions: '' })
  const [qForm, setQForm] = useState({
    q: '',
    opts: ['', '', '', ''],
    correct: '0',
    explanation: '',
    difficulty: 'medium',
    cognitive: 'recall',
  })

  useEffect(() => {
    if (!subjectId) {
      setSetForm((p) => ({ ...p, subjectCode: '' }))
      return
    }
    const subj = (subjects.data || []).find((s) => String(s.id) === String(subjectId))
    setSetForm((p) => ({ ...p, subjectCode: subj?.code || '' }))
  }, [subjectId, subjects.data])

  const loadQuestions = async (sid) => {
    const res = await api(`/api/content/questions/${sid}`)
    if (res.ok) setQuestions(await res.json())
  }

  const onSubject = (id) => {
    setSubjectId(id)
    setSetId('')
    setQuestions([])
  }

  const onSet = (id) => {
    setSetId(id)
    loadQuestions(id)
  }

  const addSet = async (e) => {
    e.preventDefault()
    await postJson('/api/admin/sets', setForm, 'Set ditambah.', showToast, 'Gagal tambah set.')
    setSetForm((p) => ({ ...p, code: '', titleMs: '', titleEn: '', numQuestions: '' }))
  }

  const addQuestion = async (e) => {
    e.preventDefault()
    await postJson(
      '/api/admin/materials/questions',
      {
        setId: Number(setId),
        q: qForm.q,
        opts: qForm.opts,
        correct: Number(qForm.correct),
        explanation: qForm.explanation,
        difficulty: qForm.difficulty,
        cognitive: qForm.cognitive,
      },
      'Soalan ditambah.',
      showToast,
      'Gagal tambah soalan.'
    )
    setQForm({ q: '', opts: ['', '', '', ''], correct: '0', explanation: '', difficulty: 'medium', cognitive: 'recall' })
    loadQuestions(setId)
  }

  const deleteQuestion = async (q) => {
    if (!window.confirm('Padam soalan ini?')) return
    const ok = await delJson(`/api/admin/materials/questions/${q.id}`, 'Soalan dipadam.', showToast)
    if (ok) loadQuestions(setId)
  }

  return (
    <section className="admin-section">
      <SubjectSelect subjects={subjects.data || []} value={subjectId} onChange={onSubject} />
      <TopicsForSubject subjects={subjects.data || []} subjectId={subjectId} onSet={onSet} setId={setId} />

      {setId && (
        <>
          <div className="admin-panel">
            <h3 className="admin-panel-title">Tambah Set</h3>
            <form className="admin-form admin-form-row admin-form-wrap" onSubmit={addSet}>
              <input
                placeholder="Kod set (set-2)"
                value={setForm.code}
                onChange={(e) => setSetForm({ ...setForm, code: e.target.value })}
                required
              />
              <input
                placeholder="Tajuk (BM)"
                value={setForm.titleMs}
                onChange={(e) => setSetForm({ ...setForm, titleMs: e.target.value })}
                required
              />
              <input
                placeholder="Tajuk (EN)"
                value={setForm.titleEn}
                onChange={(e) => setSetForm({ ...setForm, titleEn: e.target.value })}
              />
              <select
                value={setForm.difficulty}
                onChange={(e) => setSetForm({ ...setForm, difficulty: e.target.value })}
              >
                <option value="easy">Mudah</option>
                <option value="medium">Sederhana</option>
                <option value="hard">Sukar</option>
                <option value="mock">Mock</option>
              </select>
              <input
                type="number"
                placeholder="Bilangan soalan"
                value={setForm.numQuestions}
                onChange={(e) => setSetForm({ ...setForm, numQuestions: e.target.value })}
              />
              <button type="submit">Tambah Set</button>
            </form>
          </div>

          <div className="admin-panel">
            <h3 className="admin-panel-title">Tambah Soalan</h3>
            <form className="admin-form admin-form-stack" onSubmit={addQuestion}>
              <textarea
                placeholder="Soalan"
                value={qForm.q}
                onChange={(e) => setQForm({ ...qForm, q: e.target.value })}
                required
              />
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <input
                  key={l}
                  placeholder={`Pilihan ${l}`}
                  value={qForm.opts[i]}
                  onChange={(e) => {
                    const opts = [...qForm.opts]
                    opts[i] = e.target.value
                    setQForm({ ...qForm, opts })
                  }}
                />
              ))}
              <div className="admin-form-row">
                <select
                  value={qForm.correct}
                  onChange={(e) => setQForm({ ...qForm, correct: e.target.value })}
                >
                  <option value="0">Jawapan A</option>
                  <option value="1">Jawapan B</option>
                  <option value="2">Jawapan C</option>
                  <option value="3">Jawapan D</option>
                </select>
                <select
                  value={qForm.difficulty}
                  onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                >
                  <option value="easy">Mudah</option>
                  <option value="medium">Sederhana</option>
                  <option value="hard">Sukar</option>
                </select>
                <select
                  value={qForm.cognitive}
                  onChange={(e) => setQForm({ ...qForm, cognitive: e.target.value })}
                >
                  <option value="recall">Ingatan</option>
                  <option value="application">Aplikasi</option>
                  <option value="analysis">Analisis</option>
                </select>
              </div>
              <input
                placeholder="Penerangan"
                value={qForm.explanation}
                onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
              />
              <button type="submit">Tambah Soalan</button>
            </form>
          </div>

          <div className="admin-panel">
            <h3 className="admin-panel-title">Soalan ({questions.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Soalan</th>
                    <th>Kesukaran</th>
                    <th>Kognitif</th>
                    <th>Jawapan</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q.id}>
                      <td className="admin-preview">{q.q}</td>
                      <td>{q.difficulty}</td>
                      <td>{q.cognitive}</td>
                      <td>{q.opts[Number(q.correct)]}</td>
                      <td className="admin-actions">
                        <button onClick={() => deleteQuestion(q)} title="Padam">
                          <i className="material-symbols-rounded">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      )}
    </section>
  )
}

function TopicsForSubject({ subjects, subjectId, onSet, setId }) {
  const [sets, setSets] = useState([])
  useEffect(() => {
    if (!subjectId) {
      setSets([])
      return
    }
    const subj = subjects.find((s) => String(s.id) === String(subjectId))
    if (!subj) {
      setSets([])
      return
    }
    api(`/api/content/sets/${subj.code}`).then(async (res) => {
      if (res.ok) setSets(await res.json())
    })
  }, [subjectId, subjects])
  return (
    <select value={setId || ''} onChange={(e) => onSet(e.target.value)} disabled={!subjectId}>
      <option value="">— Pilih set —</option>
      {sets.map((s) => (
        <option key={s.id} value={s.id}>
          {s.code} — {s.titleMs} ({s.difficulty})
        </option>
      ))}
    </select>
  )
}

/* ---------------- Tab E: Quizzes ---------------- */

function QuizzesTab({ showToast }) {
  const subjects = useLoad(loadSubjects)
  const [subjectId, setSubjectId] = useState('')
  const [topicId, setTopicId] = useState('')
  const [quizzes, setQuizzes] = useState([])
  const [form, setForm] = useState({ q: '', opts: ['', '', '', ''], correct: '0', explanation: '' })

  useEffect(() => {
    if (!subjectId) {
      setTopicId('')
      return
    }
    setTopicId('')
    setQuizzes([])
  }, [subjectId])

  const onTopic = async (id) => {
    setTopicId(id)
    const res = await api(`/api/content/quizzes/${id}`)
    if (res.ok) setQuizzes(await res.json().then((rows) => rows))
  }

  const addQuiz = async (e) => {
    e.preventDefault()
    await postJson(
      '/api/admin/materials/quizzes',
      { topicId: Number(topicId), q: form.q, opts: form.opts, correct: Number(form.correct), explanation: form.explanation },
      'Kuiz ditambah.',
      showToast,
      'Gagal tambah kuiz.'
    )
    setForm({ q: '', opts: ['', '', '', ''], correct: '0', explanation: '' })
    onTopic(topicId)
  }

  const deleteQuiz = async (qz) => {
    if (!window.confirm('Padam kuiz ini?')) return
    const ok = await delJson(`/api/admin/materials/quizzes/${qz.id}`, 'Kuiz dipadam.', showToast)
    if (ok) onTopic(topicId)
  }

  return (
    <section className="admin-section">
      <SubjectSelect subjects={subjects.data || []} value={subjectId} onChange={setSubjectId} />
      <TopicsForQuizzes subjects={subjects.data || []} subjectId={subjectId} onTopic={onTopic} topicId={topicId} />

      {topicId && (
        <>
          <div className="admin-panel">
            <h3 className="admin-panel-title">Tambah Kuiz</h3>
            <form className="admin-form admin-form-stack" onSubmit={addQuiz}>
              <textarea
                placeholder="Soalan"
                value={form.q}
                onChange={(e) => setForm({ ...form, q: e.target.value })}
                required
              />
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <input
                  key={l}
                  placeholder={`Pilihan ${l}`}
                  value={form.opts[i]}
                  onChange={(e) => {
                    const opts = [...form.opts]
                    opts[i] = e.target.value
                    setForm({ ...form, opts })
                  }}
                />
              ))}
              <select value={form.correct} onChange={(e) => setForm({ ...form, correct: e.target.value })}>
                <option value="0">Jawapan A</option>
                <option value="1">Jawapan B</option>
                <option value="2">Jawapan C</option>
                <option value="3">Jawapan D</option>
              </select>
              <input
                placeholder="Penerangan"
                value={form.explanation}
                onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              />
              <button type="submit">Tambah Kuiz</button>
            </form>
          </div>

          <div className="admin-panel">
            <h3 className="admin-panel-title">Kuiz ({quizzes.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Soalan</th>
                    <th>Pilihan</th>
                    <th>Penerangan</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((qz) => (
                    <tr key={qz.id}>
                      <td className="admin-preview">{qz.q}</td>
                      <td className="admin-preview">{String(qz.opts || []).join(' · ')}</td>
                      <td className="admin-preview">{qz.explanation}</td>
                      <td className="admin-actions">
                        <button onClick={() => deleteQuiz(qz)} title="Padam">
                          <i className="material-symbols-rounded">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      )}
    </section>
  )
}

function TopicsForQuizzes({ subjects, subjectId, onTopic, topicId }) {
  const [topics, setTopics] = useState([])
  useEffect(() => {
    if (!subjectId) {
      setTopics([])
      return
    }
    const subj = subjects.find((s) => String(s.id) === String(subjectId))
    if (!subj) {
      setTopics([])
      return
    }
    api(`/api/content/topics/${subj.code}`).then(async (res) => {
      if (res.ok) setTopics(await res.json())
    })
  }, [subjectId, subjects])
  return (
    <select value={topicId || ''} onChange={(e) => onTopic(e.target.value)} disabled={!subjectId}>
      <option value="">— Pilih topik —</option>
      {topics.map((t) => (
        <option key={t.id} value={t.id}>
          {t.code} — {t.titleMs}
        </option>
      ))}
    </select>
  )
}

/* ---------------- Tab F: Flashcards ---------------- */

function FlashcardsTab({ showToast }) {
  const subjects = useLoad(loadSubjects)
  const [subjectId, setSubjectId] = useState('')
  const [cards, setCards] = useState([])
  const [form, setForm] = useState({ front: '', back: '' })

  useEffect(() => {
    if (!subjectId) {
      setCards([])
      return
    }
    const subj = (subjects.data || []).find((s) => String(s.id) === String(subjectId))
    if (!subj) return
    api(`/api/content/flashcards/${subj.code}`).then(async (res) => {
      if (res.ok) setCards(await res.json())
    })
  }, [subjectId, subjects.data])

  const addCard = async (e) => {
    e.preventDefault()
    await postJson(
      '/api/admin/materials/flashcards',
      { subjectId: Number(subjectId), front: form.front, back: form.back },
      'Kad imbas ditambah.',
      showToast,
      'Gagal tambah kad.'
    )
    setForm({ front: '', back: '' })
    const subj = (subjects.data || []).find((s) => String(s.id) === String(subjectId))
    if (subj) {
      const res = await api(`/api/content/flashcards/${subj.code}`)
      if (res.ok) setCards(await res.json())
    }
  }

  const deleteCard = async (c) => {
    if (!window.confirm('Padam kad imbas ini?')) return
    const ok = await delJson(`/api/admin/materials/flashcards/${c.id}`, 'Kad dipadam.', showToast)
    if (ok) {
      const subj = (subjects.data || []).find((s) => String(s.id) === String(subjectId))
      if (subj) {
        const res = await api(`/api/content/flashcards/${subj.code}`)
        if (res.ok) setCards(await res.json())
      }
    }
  }

  return (
    <section className="admin-section">
      <SubjectSelect subjects={subjects.data || []} value={subjectId} onChange={setSubjectId} />

      {subjectId && (
        <>
          <div className="admin-panel">
            <h3 className="admin-panel-title">Tambah Kad Imbas</h3>
            <form className="admin-form admin-form-stack" onSubmit={addCard}>
              <input
                placeholder="Depan (front)"
                value={form.front}
                onChange={(e) => setForm({ ...form, front: e.target.value })}
                required
              />
              <textarea
                placeholder="Belakang (back)"
                value={form.back}
                onChange={(e) => setForm({ ...form, back: e.target.value })}
                required
              />
              <button type="submit">Tambah Kad</button>
            </form>
          </div>

          <div className="admin-panel">
            <h3 className="admin-panel-title">Kad Imbas ({cards.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Depan</th>
                    <th>Belakang</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((c) => (
                    <tr key={c.id}>
                      <td className="admin-preview">{c.front}</td>
                      <td className="admin-preview">{c.back}</td>
                      <td className="admin-actions">
                        <button onClick={() => deleteCard(c)} title="Padam">
                          <i className="material-symbols-rounded">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

/* ---------------- Tab G: Tips ---------------- */

function TipsTab({ showToast }) {
  const [tips, setTips] = useState([])
  const [form, setForm] = useState({ titleMs: '', titleEn: '', bodyMs: '', bodyEn: '', tag: 'exam' })

  useEffect(() => {
    api('/api/content/tips').then(async (res) => {
      if (res.ok) setTips(await res.json())
    })
  }, [])

  const addTip = async (e) => {
    e.preventDefault()
    await postJson('/api/admin/materials/tips', form, 'Tip ditambah.', showToast, 'Gagal tambah tip.')
    setForm({ titleMs: '', titleEn: '', bodyMs: '', bodyEn: '', tag: 'exam' })
    const res = await api('/api/content/tips')
    if (res.ok) setTips(await res.json())
  }

  const deleteTip = async (t) => {
    if (!window.confirm('Padam tip ini?')) return
    const ok = await delJson(`/api/admin/materials/tips/${t.id}`, 'Tip dipadam.', showToast)
    if (ok) {
      const res = await api('/api/content/tips')
      if (res.ok) setTips(await res.json())
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-panel">
        <h3 className="admin-panel-title">Tambah Tip</h3>
        <form className="admin-form admin-form-stack" onSubmit={addTip}>
          <div className="admin-form-row">
            <input
              placeholder="Tajuk (BM)"
              value={form.titleMs}
              onChange={(e) => setForm({ ...form, titleMs: e.target.value })}
              required
            />
            <input
              placeholder="Tajuk (EN)"
              value={form.titleEn}
              onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Isi (BM)"
            value={form.bodyMs}
            onChange={(e) => setForm({ ...form, bodyMs: e.target.value })}
            required
          />
          <textarea
            placeholder="Isi (EN)"
            value={form.bodyEn}
            onChange={(e) => setForm({ ...form, bodyEn: e.target.value })}
          />
          <input
            placeholder="Tag"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />
          <button type="submit">Tambah Tip</button>
        </form>
      </div>

      <div className="admin-panel">
        <h3 className="admin-panel-title">Tips ({tips.length})</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Tajuk</th>
                <th>Isi</th>
                <th>Tag</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((t, i) => (
                <tr key={t.id}>
                  <td>{i + 1}</td>
                  <td className="admin-preview">
                    {t.titleMs} · {t.titleEn}
                  </td>
                  <td className="admin-preview">{t.bodyMs}</td>
                  <td>{t.tag}</td>
                  <td className="admin-actions">
                    <button onClick={() => deleteTip(t)} title="Padam">
                      <i className="material-symbols-rounded">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

