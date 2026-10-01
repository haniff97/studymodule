import express from 'express'
import session from 'express-session'
import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import db, { init } from './db.js'
import { authRequired, adminRequired } from './middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

init()

app.use(express.json())

// Cookie sessions. MemoryStore is fine for dev only — swap for a production
// store (e.g. connect-redis / connect-sqlite3) before deploying.
app.use(
  session({
    name: 'pdgt.sid',
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
)

function publicUser(u) {
  return {
    id: u.id,
    username: u.username,
    displayName: u.display_name,
    role: u.role,
    xp: u.xp,
    streak: u.streak,
    level: u.level,
  }
}

// ---------------- Auth ----------------

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  const user = db.prepare('SELECT * FROM users WHERE lower(username) = lower(?)').get(String(username).trim())
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  req.session.userId = user.id
  req.session.role = user.role
  return res.json(publicUser(user))
})

app.post('/api/auth/register', (req, res) => {
  const { username, password, displayName } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Nama pengguna dan kata laluan diperlukan.' })
  }
  const cleanUser = String(username).trim()
  if (cleanUser.length < 3) {
    return res.status(400).json({ error: 'Nama pengguna mestilah sekurang-kurangnya 3 aksara.' })
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Kata laluan mestilah sekurang-kurangnya 4 aksara.' })
  }
  const existing = db.prepare('SELECT id FROM users WHERE lower(username) = lower(?)').get(cleanUser)
  if (existing) {
    return res.status(400).json({ error: 'Nama pengguna telah didaftarkan. Sila pilih nama lain.' })
  }
  const hash = bcrypt.hashSync(password, 10)
  try {
    const info = db.prepare(
      'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)'
    ).run(cleanUser, hash, displayName || cleanUser, 'user')
    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid)
    req.session.userId = newUser.id
    req.session.role = newUser.role
    return res.json(publicUser(newUser))
  } catch (err) {
    console.error('Registration error:', err)
    return res.status(500).json({ error: 'Pendaftaran gagal. Sila cuba sebentar lagi.' })
  }
})

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }))
})

app.get('/api/auth/me', (req, res) => {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'Unauthorized' })
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })
  return res.json(publicUser(user))
})

function findSubject(codeOrKey) {
  if (!codeOrKey) return null
  const clean = String(codeOrKey).toLowerCase().trim()
  return db
    .prepare('SELECT id, code, title_ms AS titleMs, title_en AS titleEn FROM subjects WHERE lower(code) = ? OR lower(code) LIKE ?')
    .get(clean, `%${clean}`)
}

// ---------------- Content ----------------

app.get('/api/content/subjects', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT s.id, s.code, s.title_ms AS titleMs, s.title_en AS titleEn, s.icon,
        COUNT(t.id) AS topicCount
       FROM subjects s LEFT JOIN topics t ON t.subject_id = s.id
       GROUP BY s.id ORDER BY s.id`
    )
    .all()
  res.json(rows)
})

app.get('/api/content/topics/:subjectCode', (req, res) => {
  const subj = findSubject(req.params.subjectCode)
  if (!subj) return res.status(404).json({ error: 'Subject not found' })
  const rows = db
    .prepare(
      `SELECT t.id, t.code, t.title_ms AS titleMs, t.title_en AS titleEn,
        (SELECT COUNT(*) FROM notes n WHERE n.topic_id = t.id AND n.is_fokus = 0) AS noteCount,
        (SELECT COUNT(*) FROM quizzes qz WHERE qz.topic_id = t.id) AS quizCount,
        (SELECT COUNT(*) FROM flashcards fc WHERE fc.topic_id = t.id) AS flashcardCount
       FROM topics t WHERE t.subject_id = ? ORDER BY t.id`
    )
    .all(subj.id)
  res.json(rows)
})

app.get('/api/content/notes/:topicId', (req, res) => {
  const rows = db
    .prepare(
      'SELECT id, section_order AS sectionOrder, heading, content_html AS contentHtml, is_fokus AS isFokus FROM notes WHERE topic_id = ? ORDER BY section_order'
    )
    .all(req.params.topicId)
  res.json(rows)
})

app.get('/api/content/sets/:subjectCode', (req, res) => {
  const subj = findSubject(req.params.subjectCode)
  if (!subj) return res.status(404).json({ error: 'Subject not found' })
  const rows = db
    .prepare(
      'SELECT id, code, title_ms AS titleMs, title_en AS titleEn, difficulty, num_questions AS numQuestions FROM sets WHERE subject_id = ? ORDER BY id'
    )
    .all(subj.id)
  res.json(rows)
})

app.get('/api/content/questions/:setId', (req, res) => {
  const rows = db
    .prepare(
      `SELECT q.id, q.q, q.opts_json AS opts, q.explanation, q.difficulty, q.cognitive, q.topic_id AS topicId,
        t.title_ms AS topicTitle
       FROM questions q LEFT JOIN topics t ON t.id = q.topic_id
       WHERE q.set_id = ? ORDER BY q.id`
    )
    .all(req.params.setId)
  res.json(rows.map((r) => ({ ...r, opts: JSON.parse(r.opts) })))
})

app.post('/api/content/check', (req, res) => {
  const { questionId, answer } = req.body || {}
  const q = db.prepare('SELECT correct, explanation, opts_json FROM questions WHERE id = ?').get(questionId)
  if (!q) return res.status(404).json({ error: 'Question not found' })
  const correct = Number(answer) === q.correct
  res.json({ correct, correctIndex: q.correct, explanation: q.explanation })
})

app.get('/api/content/quizzes/:topicId', (req, res) => {
  const rows = db
    .prepare('SELECT id, q, opts_json AS opts, explanation FROM quizzes WHERE topic_id = ? ORDER BY id')
    .all(req.params.topicId)
  res.json(rows.map((r) => ({ ...r, opts: JSON.parse(r.opts) })))
})

app.post('/api/content/quiz-check', (req, res) => {
  const { quizId, answer } = req.body || {}
  const q = db.prepare('SELECT correct, explanation FROM quizzes WHERE id = ?').get(quizId)
  if (!q) return res.status(404).json({ error: 'Quiz not found' })
  const correct = Number(answer) === q.correct
  res.json({ correct, correctIndex: q.correct, explanation: q.explanation })
})

app.get('/api/content/flashcards/:subjectCode', (req, res) => {
  const subj = findSubject(req.params.subjectCode)
  if (!subj) return res.status(404).json({ error: 'Subject not found' })
  const rows = db
    .prepare('SELECT id, topic_id AS topicId, front, back FROM flashcards WHERE subject_id = ? ORDER BY id')
    .all(subj.id)
  res.json(rows)
})

app.get('/api/content/tips', (_req, res) => {
  const rows = db
    .prepare(
      'SELECT id, title_ms AS titleMs, title_en AS titleEn, body_ms AS bodyMs, body_en AS bodyEn, tag FROM tips ORDER BY sort_order'
    )
    .all()
  res.json(rows)
})

app.get('/api/content/leaderboard', (_req, res) => {
  const rows = db
    .prepare(
      'SELECT username, display_name AS displayName, xp, streak, level FROM users ORDER BY xp DESC, streak DESC, id ASC LIMIT 10'
    )
    .all()
  res.json(rows)
})

// ---------------- Progress / XP / Bank ----------------

// GET per-topic completion + best scores for the logged-in user
app.get('/api/content/progress', authRequired, (req, res) => {
  const rows = db
    .prepare(
      `SELECT topic_id AS topicId, completed, best_score AS bestScore FROM progress
       WHERE user_id = ? ORDER BY topic_id`
    )
    .all(req.session.userId)
  res.json(rows)
})

// Upsert a user's per-topic progress (completed?, bestScore?)
app.post('/api/content/progress', authRequired, (req, res) => {
  const { topicId, completed, bestScore } = req.body || {}
  if (topicId == null) return res.status(400).json({ error: 'topicId required' })
  const existing = db
    .prepare('SELECT * FROM progress WHERE user_id = ? AND topic_id = ?')
    .get(req.session.userId, topicId)
  if (!existing) {
    db.prepare(
      'INSERT INTO progress (user_id, topic_id, completed, best_score, updated_at) VALUES (?, ?, ?, ?, datetime(\'now\'))'
    ).run(
      req.session.userId,
      topicId,
      completed ? 1 : 0,
      bestScore || 0
    )
  } else {
    db.prepare(
      'UPDATE progress SET completed = ?, best_score = ?, updated_at = datetime(\'now\') WHERE user_id = ? AND topic_id = ?'
    ).run(
      completed != null ? (completed ? 1 : 0) : existing.completed,
      bestScore != null ? bestScore : existing.best_score,
      req.session.userId,
      topicId
    )
  }
  res.json({ ok: true })
})

// Add XP to a user and recompute level (level = floor(xp/500) + 1)
app.post('/api/content/xp', authRequired, (req, res) => {
  const { amount } = req.body || {}
  const add = Number(amount) || 0
  const user = db.prepare('SELECT xp FROM users WHERE id = ?').get(req.session.userId)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const newXp = user.xp + add
  const level = Math.floor(newXp / 500) + 1
  db.prepare('UPDATE users SET xp = ?, level = ? WHERE id = ?').run(newXp, level, req.session.userId)
  const updated = db.prepare('SELECT id FROM users WHERE id = ?').get(req.session.userId)
  res.json({ xp: newXp, level })
})

// Shuffled question ids WITHOUT answers for arcade games
app.get('/api/content/bank', (req, res) => {
  const subject = req.query.subject || 'all'
  const limit = Math.min(Number(req.query.limit) || 40, 200)
  let rows
  if (subject === 'all') {
    rows = db.prepare('SELECT id, q, opts_json, difficulty, cognitive FROM questions').all()
  } else {
    const subj = findSubject(subject)
    if (!subj) return res.status(404).json({ error: 'Subject not found' })
    rows = db
      .prepare(
        'SELECT id, q, opts_json, difficulty, cognitive FROM questions WHERE set_id IN (SELECT id FROM sets WHERE subject_id = ?)'
      )
      .all(subj.id)
  }
  const mapped = rows.map((r) => ({ id: r.id, q: r.q, opts: JSON.parse(r.opts_json), difficulty: r.difficulty, cognitive: r.cognitive }))
  const shuffled = mapped.sort(() => Math.random() - 0.5).slice(0, limit)
  res.json(shuffled)
})

// ---------------- Assignments (Koleksi 297 Tugasan OUM) ----------------

let assignmentsSummary = []
try {
  const summaryPath = path.join(__dirname, 'database', 'all_assignments_summary.json')
  if (fs.existsSync(summaryPath)) {
    assignmentsSummary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
  }
} catch (err) {
  console.error('Failed to load assignments summary:', err)
}

app.get('/api/assignments', (req, res) => {
  const { subject, search, page = 1, limit = 24 } = req.query
  let filtered = assignmentsSummary

  if (subject && subject !== 'ALL') {
    filtered = filtered.filter(
      (a) => a.subjectCode.toUpperCase() === subject.toUpperCase()
    )
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim()
    filtered = filtered.filter(
      (a) =>
        a.courseTitle.toLowerCase().includes(q) ||
        a.topicFocus.toLowerCase().includes(q) ||
        a.courseCode.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.id.toLowerCase().replace(/_/g, ' ').includes(q) ||
        `set ${String(a.setNumber).padStart(2, '0')}`.includes(q) ||
        `set ${a.setNumber}`.includes(q)
    )
  }

  const p = Math.max(1, parseInt(page) || 1)
  const lim = limit === 'all' ? filtered.length : Math.max(1, parseInt(limit) || 24)
  const total = filtered.length
  const startIndex = (p - 1) * lim
  const paginated = filtered.slice(startIndex, startIndex + lim)

  res.json({
    total,
    page: p,
    limit: lim,
    totalPages: Math.ceil(total / lim) || 1,
    items: paginated,
  })
})

app.get('/api/assignments/stats', (_req, res) => {
  const stats = {
    total: assignmentsSummary.length,
    hpgd1303: assignmentsSummary.filter((a) => a.subjectCode === 'HPGD1303').length,
    hmml5533: assignmentsSummary.filter((a) => a.subjectCode === 'HMML5533').length,
    hmml5103: assignmentsSummary.filter((a) => a.subjectCode === 'HMML5103').length,
  }
  res.json(stats)
})

const datasetCache = {}
app.get('/api/assignments/:id', (req, res) => {
  const { id } = req.params
  const prefix = id.split('_')[0].toUpperCase() // HPGD1303, HMML5103, HMML5533
  const datasetFile = path.join(__dirname, 'database', `${prefix}_dataset.json`)

  try {
    if (!datasetCache[prefix]) {
      if (fs.existsSync(datasetFile)) {
        datasetCache[prefix] = JSON.parse(fs.readFileSync(datasetFile, 'utf8'))
      } else {
        return res.status(404).json({ error: 'Dataset file not found' })
      }
    }
    const item = datasetCache[prefix].find((a) => a.id.toLowerCase() === id.toLowerCase())
    if (!item) return res.status(404).json({ error: 'Assignment not found' })
    const sanitized = {
      ...item,
      ocpPosts: Array.isArray(item.ocpPosts)
        ? item.ocpPosts.map((p) => ({ ...p, author: 'Pelajar DPLI' }))
        : item.ocpPosts,
    }
    res.json(sanitized)
  } catch (err) {
    console.error('Error fetching assignment details:', err)
    res.status(500).json({ error: 'Failed to load assignment' })
  }
})

app.get('/api/assignments/:id/download', (req, res) => {
  const { id } = req.params
  const summaryItem = assignmentsSummary.find((a) => a.id === id || a.id.toLowerCase() === id.toLowerCase())
  if (!summaryItem) {
    return res.status(404).json({ error: 'Assignment not found' })
  }

  const filePath = path.join(__dirname, '..', 'public', summaryItem.docxPath)
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'DOCX file not found on server' })
  }

  const fileName = path.basename(filePath)
  res.download(filePath, fileName)
})

// ---------------- Admin ----------------

app.get('/api/admin/users', adminRequired, (_req, res) => {
  const rows = db
    .prepare(
      'SELECT id, username, display_name AS displayName, role, xp, level, streak, created_at AS createdAt FROM users ORDER BY id'
    )
    .all()
  res.json(rows)
})

app.post('/api/admin/users', adminRequired, (req, res) => {
  const { username, password, displayName } = req.body || {}
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
  if (exists) return res.status(409).json({ error: 'Username taken' })
  const info = db
    .prepare('INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)')
    .run(username, bcrypt.hashSync(password, 10), displayName || username, 'user')
  res.status(201).json({ id: info.lastInsertRowid, username, displayName: displayName || username })
})

app.delete('/api/admin/users/:id', adminRequired, (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  if (req.session.userId === user.id) return res.status(400).json({ error: 'Cannot delete yourself' })
  db.prepare('DELETE FROM progress WHERE user_id = ?').run(user.id)
  db.prepare('DELETE FROM users WHERE id = ?').run(user.id)
  res.json({ ok: true })
})

app.post('/api/admin/users/:id/reset-password', adminRequired, (req, res) => {
  const { password } = req.body || {}
  if (!password) return res.status(400).json({ error: 'password required' })
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(bcrypt.hashSync(password, 10), user.id)
  res.json({ ok: true })
})

app.get('/api/admin/users/:id/progress', adminRequired, (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const rows = db
    .prepare(
      `SELECT p.topic_id AS topicId, t.code, t.title_ms AS titleMs, p.completed, p.best_score AS bestScore, p.updated_at AS updatedAt
       FROM progress p JOIN topics t ON t.id = p.topic_id
       WHERE p.user_id = ?`
    )
    .all(user.id)
  res.json(rows)
})

app.get('/api/admin/materials/stats', adminRequired, (_req, res) => {
  const count = (t) => db.prepare(`SELECT COUNT(*) c FROM ${t}`).get().c
  res.json({
    subjects: count('subjects'),
    topics: count('topics'),
    notes: count('notes'),
    sets: count('sets'),
    questions: count('questions'),
    quizzes: count('quizzes'),
    flashcards: count('flashcards'),
    tips: count('tips'),
    users: count('users'),
  })
})

app.post('/api/admin/materials/notes', adminRequired, (req, res) => {
  const { topicId, sectionOrder, heading, contentHtml, isFokus } = req.body || {}
  const topic = db.prepare('SELECT id FROM topics WHERE id = ?').get(topicId)
  if (!topic) return res.status(404).json({ error: 'Topic not found' })
  const info = db
    .prepare(
      'INSERT INTO notes (topic_id, section_order, heading, content_html, is_fokus) VALUES (?, ?, ?, ?, ?)'
    )
    .run(topicId, sectionOrder ?? 0, heading || '', contentHtml || '', isFokus ? 1 : 0)
  res.status(201).json({ id: info.lastInsertRowid })
})

app.delete('/api/admin/materials/notes/:id', adminRequired, (req, res) => {
  db.prepare('DELETE FROM notes WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

app.post('/api/admin/materials/questions', adminRequired, (req, res) => {
  const { setId, q, opts, correct, explanation, difficulty, cognitive } = req.body || {}
  if (!setId || !q || !Array.isArray(opts) || opts.length !== 4)
    return res.status(400).json({ error: 'setId, q, and opts[4] required' })
  const set = db.prepare('SELECT id FROM sets WHERE id = ?').get(setId)
  if (!set) return res.status(404).json({ error: 'Set not found' })
  const info = db
    .prepare(
      'INSERT INTO questions (set_id, q, opts_json, correct, explanation, difficulty, cognitive) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .run(setId, q, JSON.stringify(opts), correct ?? 0, explanation || '', difficulty || 'medium', cognitive || '')
  db.prepare('UPDATE sets SET num_questions = (SELECT COUNT(*) FROM questions WHERE set_id = ?) WHERE id = ?').run(setId, setId)
  res.status(201).json({ id: info.lastInsertRowid })
})

app.delete('/api/admin/materials/questions/:id', adminRequired, (req, res) => {
  const q = db.prepare('SELECT set_id FROM questions WHERE id = ?').get(req.params.id)
  if (!q) return res.status(404).json({ error: 'Question not found' })
  db.prepare('DELETE FROM questions WHERE id = ?').run(req.params.id)
  db.prepare('UPDATE sets SET num_questions = (SELECT COUNT(*) FROM questions WHERE set_id = ?) WHERE id = ?').run(q.set_id, q.set_id)
  res.json({ ok: true })
})

app.post('/api/admin/materials/quizzes', adminRequired, (req, res) => {
  const { topicId, q, opts, correct, explanation } = req.body || {}
  if (!topicId || !q || !Array.isArray(opts)) return res.status(400).json({ error: 'topicId, q, opts required' })
  const topic = db.prepare('SELECT id FROM topics WHERE id = ?').get(topicId)
  if (!topic) return res.status(404).json({ error: 'Topic not found' })
  const info = db
    .prepare('INSERT INTO quizzes (topic_id, q, opts_json, correct, explanation) VALUES (?, ?, ?, ?, ?)')
    .run(topicId, q, JSON.stringify(opts), correct ?? 0, explanation || '')
  res.status(201).json({ id: info.lastInsertRowid })
})

app.delete('/api/admin/materials/quizzes/:id', adminRequired, (req, res) => {
  db.prepare('DELETE FROM quizzes WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

app.post('/api/admin/materials/flashcards', adminRequired, (req, res) => {
  const { subjectId, topicId, front, back } = req.body || {}
  if (!subjectId || !front || !back) return res.status(400).json({ error: 'subjectId, front, back required' })
  const info = db
    .prepare('INSERT INTO flashcards (subject_id, topic_id, front, back) VALUES (?, ?, ?, ?)')
    .run(subjectId, topicId ?? null, front, back)
  res.status(201).json({ id: info.lastInsertRowid })
})

app.delete('/api/admin/materials/flashcards/:id', adminRequired, (req, res) => {
  db.prepare('DELETE FROM flashcards WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

app.post('/api/admin/materials/tips', adminRequired, (req, res) => {
  const { titleMs, titleEn, bodyMs, bodyEn, tag } = req.body || {}
  if (!titleMs || !bodyMs) return res.status(400).json({ error: 'titleMs and bodyMs required' })
  const max = db.prepare('SELECT COALESCE(MAX(sort_order), -1) m FROM tips').get().m
  const info = db
    .prepare('INSERT INTO tips (sort_order, title_ms, title_en, body_ms, body_en, tag) VALUES (?, ?, ?, ?, ?, ?)')
    .run(max + 1, titleMs, titleEn || titleMs, bodyMs, bodyEn || bodyMs, tag || 'exam')
  res.status(201).json({ id: info.lastInsertRowid })
})

app.delete('/api/admin/materials/tips/:id', adminRequired, (req, res) => {
  db.prepare('DELETE FROM tips WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

app.post('/api/admin/subjects', adminRequired, (req, res) => {
  const { code, titleMs, titleEn, icon } = req.body || {}
  if (!code || !titleMs) return res.status(400).json({ error: 'code and titleMs required' })
  const exists = db.prepare('SELECT id FROM subjects WHERE code = ?').get(code)
  if (exists) return res.status(409).json({ error: 'Subject code taken' })
  const info = db
    .prepare('INSERT INTO subjects (code, title_ms, title_en, icon) VALUES (?, ?, ?, ?)')
    .run(code, titleMs, titleEn || titleMs, icon || 'route')
  res.status(201).json({ id: info.lastInsertRowid })
})

app.post('/api/admin/topics', adminRequired, (req, res) => {
  const { subjectCode, code, titleMs, titleEn } = req.body || {}
  if (!subjectCode || !code) return res.status(400).json({ error: 'subjectCode and code required' })
  const subj = db.prepare('SELECT id FROM subjects WHERE code = ?').get(subjectCode)
  if (!subj) return res.status(404).json({ error: 'Subject not found' })
  const info = db
    .prepare('INSERT INTO topics (subject_id, code, title_ms, title_en) VALUES (?, ?, ?, ?)')
    .run(subj.id, code, titleMs || code, titleEn || titleMs || code)
  res.status(201).json({ id: info.lastInsertRowid })
})

app.post('/api/admin/sets', adminRequired, (req, res) => {
  const { subjectCode, code, titleMs, titleEn, difficulty, numQuestions } = req.body || {}
  if (!subjectCode || !code) return res.status(400).json({ error: 'subjectCode and code required' })
  const subj = db.prepare('SELECT id FROM subjects WHERE code = ?').get(subjectCode)
  if (!subj) return res.status(404).json({ error: 'Subject not found' })
  const info = db
    .prepare(
      'INSERT INTO sets (subject_id, code, title_ms, title_en, difficulty, num_questions) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(subj.id, code, titleMs || code, titleEn || titleMs || code, difficulty || 'medium', numQuestions || 0)
  res.status(201).json({ id: info.lastInsertRowid })
})

// ---------------- Frontend (production) ----------------

const publicDir = path.join(__dirname, '..', 'public')
app.use(express.static(publicDir))

const distDir = path.join(__dirname, '..', 'dist')
app.use(express.static(distDir))
// Prevent stale / missing chunk requests from receiving index.html (which causes JS syntax errors)
app.use('/assets', (_req, res) => res.status(404).type('text/plain').send('Asset not found'))
app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')))

const PORT = process.env.PORT || 5008
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))

