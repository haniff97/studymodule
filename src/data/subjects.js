import { realQuestionSets } from './real/real-questions.js'

const setKeyFor = {
  1103: 'hpgd1103',
  1203: 'hpgd1203',
  2303: 'hpgd2303',
  1303: 'hpgd1303',
  5103: 'hmml5103',
  5533: 'hmml5533',
}

const setListFor = (code) =>
  (realQuestionSets[setKeyFor[code]] || []).map((s) => ({
    id: s.id,
    title: s.title,
    desc: s.desc,
    num: s.num != null ? s.num : s.id,
    questions: s.questions || [],
  }))

const makeSubject = (code, name, title, titleEn, icon) => ({
  code,
  name,
  title,
  titleEn,
  icon,
  topics: [],
  sets: setListFor(code).length,
  questions: setListFor(code).reduce((sum, s) => sum + s.questions.length, 0),
  topicsCount: code === '1303' ? 9 : 10,
  setsList: setListFor(code),
})

export const subjects = {
  '1103': makeSubject('1103', 'HPGD1103', 'Pembangunan Kurikulum', 'Curriculum Development', 'route'),
  '1203': makeSubject('1203', 'HPGD1203', 'Teori & Amalan P&P', 'Theory and Practice of Teaching and Learning', 'psychology'),
  '2303': makeSubject('2303', 'HPGD2303', 'Penilaian Pendidikan', 'Educational Assessment', 'fact_check'),
  '1303': makeSubject('1303', 'HPGD1303', 'Sejarah Pendidikan', 'History of Education', 'history_edu'),
  '5103': makeSubject('5103', 'HMML5103', 'Teori Linguistik dalam Pendidikan Bahasa Melayu', 'Linguistic Theory in Malay Language Education', 'translate'),
  '5533': makeSubject('5533', 'HMML5533', 'Inovasi Pedagogi dalam Pendidikan Bahasa Melayu', 'Pedagogical Innovation in Malay Language Education', 'lightbulb'),
}

export const totalStats = {
  subjects: 6,
  topics: 59,
  questions: 1000,
  flashcards: 181,
  progressDenominator: 174,
}
