import { realTips } from './real/real-tips.js'

// Real tips from pdgthub.com (30 tips). Preserve the bilingual structure.
export const tips = realTips

// Shuffled subset for the Tips page (6 at a time)
export function getRandomTipSubset(n = 6) {
  const shuffled = realTips.slice().sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}

// Random single tip of the day
export function getRandomTip() {
  return realTips[Math.floor(Math.random() * realTips.length)]
}

export const achievements = [
  {
    id: 'welcome',
    emoji: '👋',
    title: 'Selamat Datang!',
    desc: 'Log masuk pertama kali',
    unlocked: true,
  },
  {
    id: 'night',
    emoji: '🌙',
    title: 'Ulang Kaji Malam',
    desc: 'Belajar antara 10 malam hingga 5 pagi',
    unlocked: false,
  },
  {
    id: 'firstnote',
    emoji: '📖',
    title: 'Nota Pertama',
    desc: 'Selesaikan topik nota pertama',
    unlocked: false,
  },
  {
    id: 'quiz',
    emoji: '🏆',
    title: 'Mahir Kuis',
    desc: 'Skor penuh dalam 1 kuiz topik',
    unlocked: false,
  },
]

export const missions = [
  { id: 1, title: 'Selesaikan 1 topik nota', icon: 'task_alt', done: true },
  { id: 2, title: 'Cuba 1 sesi peperiksaan', icon: 'radio_button_unchecked', done: false },
  { id: 3, title: 'Kekalkan streak harian', icon: 'radio_button_unchecked', done: false },
]

export const examSets = [
  { id: 'mock', name: 'Set Mock', questions: 10 },
  { id: 'final', name: 'Final Exam', questions: 20 },
]
