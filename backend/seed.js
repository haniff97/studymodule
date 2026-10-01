import db, { init } from './db.js'
import bcrypt from 'bcryptjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { realNotes } from '../src/data/real/real-notes.js'
import { realQuizzes } from '../src/data/real/real-quizzes.js'
import { realFlashcards } from '../src/data/real/real-flashcards.js'
import { realTips } from '../src/data/real/real-tips.js'
import { realQuestionSets } from '../src/data/real/real-questions.js'

// Subject -> (code, titleMS, titleEN, icon), keyed by the 3-digit key used in
// the real data files.
const SUBJECTS = {
  '1103': { code: 'hpgd1103', titleMs: 'Pembangunan Kurikulum', titleEn: 'Curriculum Development', icon: 'route' },
  '1203': { code: 'hpgd1203', titleMs: 'Teori & Amalan P&P', titleEn: 'Theory and Practice of Teaching and Learning', icon: 'psychology' },
  '2303': { code: 'hpgd2303', titleMs: 'Penilaian Pendidikan', titleEn: 'Educational Assessment', icon: 'fact_check' },
  '1303': { code: 'hpgd1303', titleMs: 'Sejarah Pendidikan', titleEn: 'History of Education', icon: 'history_edu' },
  '5103': { code: 'hmml5103', titleMs: 'Teori Linguistik dalam Pendidikan Bahasa Melayu', titleEn: 'Linguistic Theory in Malay Language Education', icon: 'translate' },
  '5533': { code: 'hmml5533', titleMs: 'Inovasi Pedagogi dalam Pendidikan Bahasa Melayu', titleEn: 'Pedagogical Innovation in Malay Language Education', icon: 'lightbulb' },
}

// Clean display titles for HPGD2303 (the raw note titles in real-notes.js are
// concatenated/odd — mirror src/data/topics.js mockMeta).
const TITLE_OVERRIDE = {
  '2303': [
    'Konsep Penilaian',
    'Ujian & Pengukuran',
    'Taksonomi Penilaian',
    'Rubrik',
    'Pentaksiran Formatif/Sumatif',
    'Kesahan & Kebolehpercayaan',
    'Analisis Item',
    'Pentaksiran Autentik',
    'Perekodan & Pelaporan',
    'Pentaksiran Alternatif',
  ],
}

function cleanTitle(subjKey, index, note) {
  if (TITLE_OVERRIDE[subjKey]) return TITLE_OVERRIDE[subjKey][index]
  return (note && note.title) || ''
}

export function seed(force = false) {
  init()
  const isEmpty = (() => {
    try {
      return db.prepare('SELECT COUNT(*) c FROM users').get().c === 0
    } catch {
      return false
    }
  })()

  if (!isEmpty && !force) {
    console.log('DB already seeded — skipping (idempotent).')
    return
  }

  if (force) {
    console.log('Force re-seeding: resetting data tables...')
    db.exec(`
      DELETE FROM sessions;
      DELETE FROM progress;
      DELETE FROM tips;
      DELETE FROM flashcards;
      DELETE FROM quizzes;
      DELETE FROM questions;
      DELETE FROM sets;
      DELETE FROM notes;
      DELETE FROM topics;
      DELETE FROM subjects;
      DELETE FROM users;
      DELETE FROM sqlite_sequence;
    `)
  }

  // ---- subjects + topics ----
  const insertSubject = db.prepare('INSERT INTO subjects (code, title_ms, title_en, icon) VALUES (?, ?, ?, ?)')
  const insertTopic = db.prepare('INSERT INTO topics (subject_id, code, title_ms, title_en) VALUES (?, ?, ?, ?)')
  const topicBySubjTitle = {} // subjKey -> note.title -> topicId

  for (const subjKey of Object.keys(SUBJECTS)) {
    const meta = SUBJECTS[subjKey]
    const info = insertSubject.run(meta.code, meta.titleMs, meta.titleEn, meta.icon)
    const subjectId = info.lastInsertRowid

    const notes = realNotes[subjKey] || []
    const topicCount = subjKey === '1303' ? 9 : 10
    for (let i = 0; i < topicCount; i++) {
      const note = notes[i]
      const code = 't' + (i + 1)
      const clean = cleanTitle(subjKey, i, note)
      const titleMs = (note && (note.titleMs || note.title)) || clean
      const titleEn = (note && (note.titleEn || note.title)) || clean
      const t = insertTopic.run(subjectId, code, titleMs, titleEn)
      const topicId = t.lastInsertRowid
      if (!topicBySubjTitle[subjKey]) topicBySubjTitle[subjKey] = {}
      if (note && note.title) topicBySubjTitle[subjKey][note.title] = topicId
      if (note && note.titleMs) topicBySubjTitle[subjKey][note.titleMs] = topicId
      if (note && note.titleEn) topicBySubjTitle[subjKey][note.titleEn] = topicId
      topicBySubjTitle[subjKey][titleMs] = topicId
      topicBySubjTitle[subjKey][titleEn] = topicId
      topicBySubjTitle[subjKey][clean] = topicId
    }
  }

  // ---- notes ----
  const insertNote = db.prepare(
    'INSERT INTO notes (topic_id, section_order, heading, content_html, is_fokus) VALUES (?, ?, ?, ?, ?)'
  )
  for (const subjKey of Object.keys(SUBJECTS)) {
    const notes = realNotes[subjKey] || []
    const topicCount = subjKey === '1303' ? 9 : 10
    for (let i = 0; i < topicCount; i++) {
      const note = notes[i]
      const topicId = topicBySubjTitle[subjKey][cleanTitle(subjKey, i, note)]
      let order = 0
      for (const sec of (note && note.sections) || []) {
        insertNote.run(topicId, order++, sec.h || '', sec.text || '', 0)
      }
      const fokus = ((note && note.fokus) || '').trim()
      if (fokus) {
        insertNote.run(topicId, order++, 'Fokus Peperiksaan', fokus, 1)
      }
    }
  }

  // ---- sets + questions ----
  const insertSet = db.prepare(
    'INSERT INTO sets (subject_id, code, title_ms, title_en, difficulty, num_questions) VALUES (?, ?, ?, ?, ?, ?)'
  )
  const insertQuestion = db.prepare(
    'INSERT INTO questions (set_id, topic_id, q, opts_json, correct, explanation, difficulty, cognitive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  )

  for (const subjKey of Object.keys(SUBJECTS)) {
    const meta = SUBJECTS[subjKey]
    const subject = db.prepare('SELECT id FROM subjects WHERE code = ?').get(meta.code)
    const sets = realQuestionSets[meta.code] || []
    for (const s of sets) {
      const difficulty = /^(easy|medium|hard)$/.test(s.id) ? s.id : 'mock'
      const setInfo = insertSet.run(
        subject.id,
        String(s.id),
        s.title || s.id,
        s.title || s.id,
        difficulty,
        s.questions ? s.questions.length : 0
      )
      const setId = setInfo.lastInsertRowid
      for (const q of s.questions || []) {
        let topicId = null
        if (q.topic && topicBySubjTitle[subjKey] && topicBySubjTitle[subjKey][q.topic]) {
          topicId = topicBySubjTitle[subjKey][q.topic]
        }
        insertQuestion.run(
          setId,
          topicId,
          q.q,
          JSON.stringify(q.opts || []),
          q.a,
          q.exp || '',
          q.difficulty || 'medium',
          q.cognitive || ''
        )
      }
    }
  }

  // ---- quizzes ----
  const insertQuiz = db.prepare(
    'INSERT INTO quizzes (topic_id, q, opts_json, correct, explanation) VALUES (?, ?, ?, ?, ?)'
  )
  for (const subjKey of Object.keys(SUBJECTS)) {
    const topicCodes = realQuizzes[subjKey] || {}
    const notes = realNotes[subjKey] || []
    const topicCount = subjKey === '1303' ? 9 : 10
    for (let i = 0; i < topicCount; i++) {
      const code = 't' + (i + 1)
      const list = topicCodes[code] || []
      const title = cleanTitle(subjKey, i, notes[i])
      const topicId = topicBySubjTitle[subjKey][title]
      for (const qu of list) {
        insertQuiz.run(topicId, qu.q, JSON.stringify(qu.opts || []), qu.a, qu.fb || '')
      }
    }
  }

  // ---- flashcards ----
  const insertFlash = db.prepare(
    'INSERT INTO flashcards (subject_id, topic_id, front, back) VALUES (?, ?, ?, ?)'
  )
  for (const subjKey of Object.keys(SUBJECTS)) {
    const meta = SUBJECTS[subjKey]
    const subject = db.prepare('SELECT id FROM subjects WHERE code = ?').get(meta.code)
    const cards = realFlashcards[subjKey] || []
    for (const c of cards) {
      insertFlash.run(subject.id, null, c.q || c.front || '', c.a || c.back || '')
    }
  }

  // ---- tips ----
  const insertTip = db.prepare(
    'INSERT INTO tips (sort_order, title_ms, title_en, body_ms, body_en, tag) VALUES (?, ?, ?, ?, ?, ?)'
  )
  realTips.forEach((tip, i) => {
    insertTip.run(
      i,
      tip.ms?.title || '',
      tip.en?.title || '',
      tip.ms?.message || '',
      tip.en?.message || '',
      tip.category || 'exam'
    )
  })

  // ---- users ----
  const insertUser = db.prepare(
    'INSERT INTO users (username, password_hash, display_name, role, xp, streak, level) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )
  insertUser.run('admin', bcrypt.hashSync('admin123', 10), 'Admin', 'admin', 0, 1, 1)
  insertUser.run('demo', bcrypt.hashSync('demo123', 10), 'Pelajar Demo', 'user', 0, 1, 1)

  console.log('Seed complete.')
}

// Run directly when executed as script.
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(new URL(import.meta.url)))

if (isMain) {
  const force = process.argv.includes('--force')
  seed(force)
}
