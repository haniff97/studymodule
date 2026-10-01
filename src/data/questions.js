import { subjects } from './subjects.js'
import { topic1103, topic1203, topic2303, topic1303, topic5103, topic5533 } from './topics.js'
import { realQuestionSets } from './real/real-questions.js'

// Attach topic arrays to subjects
subjects['1103'].topics = topic1103
subjects['1203'].topics = topic1203
subjects['2303'].topics = topic2303
subjects['1303'].topics = topic1303
subjects['5103'].topics = topic5103
subjects['5533'].topics = topic5533

export const subjectList = ['1103', '1203', '2303', '1303', '5103', '5533']

export function getSubject(code) {
  return subjects[code]
}

export function getAllTopics(subjectCode) {
  return (subjects[subjectCode] || {}).topics || []
}

export function getTopic(subjectCode, topicId) {
  return getAllTopics(subjectCode).find((t) => t.id === topicId)
}

// Real exam set catalog per subject
export function getSets(subjectCode) {
  return (subjects[subjectCode] || {}).setsList || []
}

export function getSet(subjectCode, setId) {
  return getSets(subjectCode).find((s) => s.id === setId)
}

export function getSetQuestions(subjectCode, setId) {
  const set = getSet(subjectCode, setId)
  return (set && set.questions) || []
}

// Merge all topic questions into one bank for a subject
export function getQuestionBank(subjectCode) {
  return getAllTopics(subjectCode).flatMap((t) => t.questions)
}

// Sample n questions from a subject question bank
export function sampleQuestions(subjectCode, n) {
  const bank = getQuestionBank(subjectCode)
  const shuffled = bank.slice().sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}

// Merge all games demo questions across all subjects for arcade play.
const normalizeArcadeQuestion = (q) => ({
  question: q.q,
  options: q.opts,
  correct: q.a,
  explanation: q.exp,
})

export function getArcadeBank() {
  return Object.values(realQuestionSets)
    .flat()
    .flatMap((set) => set.questions || [])
    .map(normalizeArcadeQuestion)
}

export default {
  subjects,
  subjectList,
  getSubject,
  getAllTopics,
  getTopic,
  getSets,
  getSet,
  getSetQuestions,
  getQuestionBank,
  sampleQuestions,
  getArcadeBank,
}
