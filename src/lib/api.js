// Thin fetch wrapper for the SmartBrain DPLI backend API.
// All requests carry cookies so the session (and auth) applies per request.

async function request(path, { method = 'GET', body } = {}) {
  const opts = {
    method,
    credentials: 'include',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  }
  if (body !== undefined) opts.body = JSON.stringify(body)
  const res = await fetch(path, opts)
  if (!res.ok) {
    let err = new Error(`${method} ${path} failed (${res.status})`)
    try {
      const data = await res.json()
      err = new Error(data.error || err.message)
      err.status = res.status
    } catch {
      /* ignore parse errors */
    }
    throw err
  }
  return res.json()
}

const get = (path) => request(path)
const post = (path, body) => request(path, { method: 'POST', body })
const del = (path) => request(path, { method: 'DELETE' })

// ---- Auth ----
export const apiLogin = (username, password) => post('/api/auth/login', { username, password })
export const apiRegister = (username, password, email) => post('/api/auth/register', { username, password, email })
export const apiLogout = () => post('/api/auth/logout')
export const apiMe = () => get('/api/auth/me')

// Map frontend subject short keys to backend subject codes
const SUBJECT_CODE_MAP = {
  '1103': 'hpgd1103',
  '1203': 'hpgd1203',
  '2303': 'hpgd2303',
  '1303': 'hpgd1303',
  '5103': 'hmml5103',
  '5533': 'hmml5533',
}
const toBackendCode = (c) => {
  if (!c) return c
  const str = String(c).toLowerCase().trim()
  return SUBJECT_CODE_MAP[str] || str
}

// ---- Content ----
export const apiSubjects = () => get('/api/content/subjects')
export const apiTopics = (subjectCode) => get(`/api/content/topics/${toBackendCode(subjectCode)}`)
export const apiNotes = (topicId) => get(`/api/content/notes/${topicId}`)
export const apiSets = (subjectCode) => get(`/api/content/sets/${toBackendCode(subjectCode)}`)
export const apiQuestions = (setId) => get(`/api/content/questions/${setId}`)
export const apiQuizzes = (topicId) => get(`/api/content/quizzes/${topicId}`)
export const apiFlashcards = (subjectCode) => get(`/api/content/flashcards/${toBackendCode(subjectCode)}`)
export const apiTips = () => get('/api/content/tips')
export const apiLeaderboard = () => get('/api/content/leaderboard')
export const apiBank = (subject = 'all', limit = 40) =>
  get(`/api/content/bank?subject=${subject === 'all' ? 'all' : toBackendCode(subject)}&limit=${limit}`)

// ---- Checks (server-side) ----
export const apiCheckQuestion = (questionId, answer) =>
  post('/api/content/check', { questionId, answer })
export const apiCheckQuiz = (quizId, answer) =>
  post('/api/content/quiz-check', { quizId, answer })

// ---- Progress / XP ----
export const apiSaveProgress = (topicId, completed, bestScore) =>
  post('/api/content/progress', { topicId, completed, bestScore })
export const apiGetProgress = () => get('/api/content/progress')
export const apiAddXp = (amount) => post('/api/content/xp', { amount })

export default { get, post, del }
