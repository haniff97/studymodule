const fs = require('fs');
const path = require('path');

const { notes1303 } = require('./data_1303_notes.cjs');
const { quizzes1303 } = require('./data_1303_quizzes.cjs');
const { flashcards1303, questionSet1303 } = require('./data_1303_fc_and_questions.cjs');

console.log('=== STEP 1: Updating src/data/real/real-notes.js ===');
const notesPath = path.join(__dirname, '../src/data/real/real-notes.js');
let notesContent = fs.readFileSync(notesPath, 'utf8');

const startNotesMarker = "  '1303': [";
const endNotesMarker = "  '5103': [";
const startNotesIdx = notesContent.indexOf(startNotesMarker);
const endNotesIdx = notesContent.indexOf(endNotesMarker);

if (startNotesIdx === -1 || endNotesIdx === -1) {
  throw new Error('Could not find 1303 markers in real-notes.js');
}

const formattedNotes = "  '1303': " + JSON.stringify(notes1303, null, 2) + ",\n";
notesContent = notesContent.substring(0, startNotesIdx) + formattedNotes + notesContent.substring(endNotesIdx);
fs.writeFileSync(notesPath, notesContent, 'utf8');
console.log('Successfully updated real-notes.js');

console.log('\n=== STEP 2: Updating src/data/real/real-quizzes.js ===');
const quizzesPath = path.join(__dirname, '../src/data/real/real-quizzes.js');
let quizzesContent = fs.readFileSync(quizzesPath, 'utf8');

const startQuizMarker = "  '1303': {";
const endQuizMarker = "  '5103': {";
const startQuizIdx = quizzesContent.indexOf(startQuizMarker);
const endQuizIdx = quizzesContent.indexOf(endQuizMarker);

if (startQuizIdx === -1 || endQuizIdx === -1) {
  throw new Error('Could not find 1303 markers in real-quizzes.js');
}

const formattedQuizzes = "  '1303': " + JSON.stringify(quizzes1303, null, 2) + ",\n";
quizzesContent = quizzesContent.substring(0, startQuizIdx) + formattedQuizzes + quizzesContent.substring(endQuizIdx);
fs.writeFileSync(quizzesPath, quizzesContent, 'utf8');
console.log('Successfully updated real-quizzes.js');

console.log('\n=== STEP 3: Updating src/data/real/real-flashcards.js ===');
const flashcardsPath = path.join(__dirname, '../src/data/real/real-flashcards.js');
let flashcardsContent = fs.readFileSync(flashcardsPath, 'utf8');

const startFCMarker = "  '1303': [";
const endFCMarker = "  '5103': [";
const startFCIdx = flashcardsContent.indexOf(startFCMarker);
const endFCIdx = flashcardsContent.indexOf(endFCMarker);

if (startFCIdx === -1 || endFCIdx === -1) {
  throw new Error('Could not find 1303 markers in real-flashcards.js');
}

const formattedFC = "  '1303': " + JSON.stringify(flashcards1303, null, 2) + ",\n";
flashcardsContent = flashcardsContent.substring(0, startFCIdx) + formattedFC + flashcardsContent.substring(endFCIdx);
fs.writeFileSync(flashcardsPath, flashcardsContent, 'utf8');
console.log('Successfully updated real-flashcards.js');

console.log('\n=== STEP 4: Updating src/data/real/real-questions.js ===');
const questionsPath = path.join(__dirname, '../src/data/real/real-questions.js');
let questionsContent = fs.readFileSync(questionsPath, 'utf8');

const startQMarker = ' "hpgd1303": [';
const endQMarker = ' "hmml5103": [';
const startQIdx = questionsContent.indexOf(startQMarker);
const endQIdx = questionsContent.indexOf(endQMarker);

if (startQIdx === -1 || endQIdx === -1) {
  throw new Error('Could not find hpgd1303 markers in real-questions.js');
}

const formattedQuestions = ' "hpgd1303": ' + JSON.stringify(questionSet1303, null, 1) + ',\n';
questionsContent = questionsContent.substring(0, startQIdx) + formattedQuestions + questionsContent.substring(endQIdx);
fs.writeFileSync(questionsPath, questionsContent, 'utf8');
console.log('Successfully updated real-questions.js');

console.log('\n=== STEP 5: Updating backend/data.db ===');
const Database = require('../backend/node_modules/better-sqlite3');
const db = new Database(path.join(__dirname, '../backend/data.db'));

const subject = db.prepare("SELECT id, code FROM subjects WHERE code = 'hpgd1303'").get();
if (!subject) {
  throw new Error('Subject hpgd1303 not found in data.db');
}

console.log(`Found subject id: ${subject.id}`);

// 5.1 Update subjects table
db.prepare("UPDATE subjects SET title_ms = 'Sejarah Pendidikan', title_en = 'History of Education' WHERE id = ?").run(subject.id);

// 5.2 Update topics table
const updateTopic = db.prepare("UPDATE topics SET title_ms = ?, title_en = ? WHERE subject_id = ? AND code = ?");
const topicIdMap = {}; // code -> topicId

for (let i = 0; i < notes1303.length; i++) {
  const code = 't' + (i + 1);
  const note = notes1303[i];
  updateTopic.run(note.titleMs, note.titleEn, subject.id, code);
  const topicRow = db.prepare("SELECT id FROM topics WHERE subject_id = ? AND code = ?").get(subject.id, code);
  topicIdMap[code] = topicRow.id;
  topicIdMap[note.titleMs] = topicRow.id;
  topicIdMap[note.titleEn] = topicRow.id;
  topicIdMap[note.title] = topicRow.id;
}
console.log('Updated topics table with Malay title_ms and English title_en');

// 5.3 Update notes table
const topicIds = Object.values(topicIdMap).filter((v, idx, arr) => arr.indexOf(v) === idx);
const placeholders = topicIds.map(() => '?').join(',');
db.prepare(`DELETE FROM notes WHERE topic_id IN (${placeholders})`).run(...topicIds);

const insertNote = db.prepare(
  'INSERT INTO notes (topic_id, section_order, heading, content_html, is_fokus) VALUES (?, ?, ?, ?, ?)'
);

for (let i = 0; i < notes1303.length; i++) {
  const code = 't' + (i + 1);
  const topicId = topicIdMap[code];
  const note = notes1303[i];
  let order = 0;
  for (const sec of note.sections || []) {
    insertNote.run(topicId, order++, sec.h || '', sec.text || '', 0);
  }
  const fokus = (note.fokus || '').trim();
  if (fokus) {
    insertNote.run(topicId, order++, 'Fokus Peperiksaan', fokus, 1);
  }
}
console.log('Re-populated notes table for HPGD1303 in Malay');

// 5.4 Update quizzes table
db.prepare(`DELETE FROM quizzes WHERE topic_id IN (${placeholders})`).run(...topicIds);

const insertQuiz = db.prepare(
  'INSERT INTO quizzes (topic_id, q, opts_json, correct, explanation) VALUES (?, ?, ?, ?, ?)'
);

for (let i = 0; i < notes1303.length; i++) {
  const code = 't' + (i + 1);
  const topicId = topicIdMap[code];
  const list = quizzes1303[code] || [];
  for (const qu of list) {
    insertQuiz.run(topicId, qu.q, JSON.stringify(qu.opts || []), qu.a, qu.fb || '');
  }
}
console.log('Re-populated quizzes table for HPGD1303 in Malay');

// 5.5 Update flashcards table
db.prepare("DELETE FROM flashcards WHERE subject_id = ?").run(subject.id);

const insertFlash = db.prepare(
  'INSERT INTO flashcards (subject_id, topic_id, front, back) VALUES (?, ?, ?, ?)'
);

for (const c of flashcards1303) {
  insertFlash.run(subject.id, null, c.q, c.a);
}
console.log('Re-populated flashcards table for HPGD1303 in Malay');

// 5.6 Update sets and questions table
const setRow = db.prepare("SELECT id FROM sets WHERE subject_id = ? AND code = 'set-1'").get(subject.id);
let setId;
if (setRow) {
  setId = setRow.id;
  db.prepare("UPDATE sets SET title_ms = ?, title_en = ?, num_questions = ? WHERE id = ?").run(
    questionSet1303[0].title,
    questionSet1303[0].title,
    questionSet1303[0].questions.length,
    setId
  );
  db.prepare("DELETE FROM questions WHERE set_id = ?").run(setId);
} else {
  const setInfo = db.prepare("INSERT INTO sets (subject_id, code, title_ms, title_en, difficulty, num_questions) VALUES (?, ?, ?, ?, ?, ?)").run(
    subject.id,
    'set-1',
    questionSet1303[0].title,
    questionSet1303[0].title,
    'mock',
    questionSet1303[0].questions.length
  );
  setId = setInfo.lastInsertRowid;
}

const insertQuestion = db.prepare(
  'INSERT INTO questions (set_id, topic_id, q, opts_json, correct, explanation, difficulty, cognitive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);

for (const q of questionSet1303[0].questions) {
  const topicId = topicIdMap[q.topic] || null;
  insertQuestion.run(
    setId,
    topicId,
    q.q,
    JSON.stringify(q.opts || []),
    q.a,
    q.exp || '',
    q.difficulty || 'medium',
    q.cognitive || ''
  );
}
console.log('Re-populated questions table for HPGD1303 mock exam set in Malay');

console.log('\n🎉 ALL 1303 CONTENT UPDATED TO MALAY SUCCESSFULLY!');
