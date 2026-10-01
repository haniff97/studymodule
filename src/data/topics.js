// Topic data for all six subjects, wired to REAL site content.
// Each topic: id, emoji, title, titleEn, keywords[], sections[], fokus, summary,
//            quiz[], questions[], flashcards[]
import { realNotes } from './real/real-notes.js'
import { realQuizzes } from './real/real-quizzes.js'
import { realFlashcards } from './real/real-flashcards.js'

const emojisBySubject = {
  '1103': ['📚', '🧭', '📐', '🏫', '📊', '🔗', '🎭', '👨‍🏫', '📦', '💾'],
  '1203': ['📡', '🐕', '🧩', '🤝', '🔍', '💡', '💻', '🌸', '🧠', '⚡'],
  '2303': ['📋', '🖊️', '🎯', '📏', '🔄', '🧪', '🔬', '🗂️', '📈', '👥'],
  '1303': ['🏛️', '⚖️', '📜', '🌴', '⚔️', '🇲🇾', '🏫', '🎯', '🔮'],
  '5103': ['📖', '🔬', '🖋️', '🌐', '📗', '📘', '📕', '🔗', '🗺️', '🎓'],
  '5533': ['💡', '📐', '🎭', '🧠', '📰', '💻', '🎨', '🔍', '🗄️', '👨‍🏫'],
}

const mockMeta = {
  '1103': [
    ['Asas Kurikulum & Falsafah Pendidikan', 'Definisi • Falsafah • Matlamat'],
    ['Model Kurikulum', 'Tyler • Taba • Wheeler'],
    ['Reka Bentuk Kurikulum', 'Kandungan • Organisasi • Susunan'],
    ['Perlaksanaan Kurikulum', 'Guru • Sumber • Sokongan'],
    ['Penilaian Kurikulum', 'Formatif • Sumatif • Model'],
    ['Kurikulum & Pengajaran', 'Hubungan • Penyepaduan • Kesejajaran'],
    ['Kurikulum Tersembunyi', 'Nilai • Budaya • Iklim sekolah'],
    ['Peranan Guru dalam Kurikulum', 'Perancang • Pelaksana • Penilai'],
    ['Pembangunan Bahan Kurikulum', 'Buku teks • Modul • Sumber digital'],
    ['Kurikulum pada Zaman Digital', 'ICT • Blended • Fleksibel'],
  ],
  '1203': [
    ['Era Digital & ODL', 'Konektivisme • Anjakan paradigma • Pembelajaran sepanjang hayat'],
    ['Teori Behaviouris', 'Pavlov • Thorndike • Skinner • Gagne'],
    ['Teori Konstruktivis', 'Piaget • Vygotsky • Bruner • Gardner'],
    ['Pembelajaran Koperatif', 'STAD • Jigsaw • Penyiasatan Kumpulan'],
    ['Pembelajaran Penemuan', 'Inkuiri • Simulasi • Kes • Penerokaan'],
    ['Pembelajaran Berasaskan Masalah', 'PBL • 7 proses • Penilaian autentik'],
    ['Pengajaran dengan ICT', 'Perisian generik • Media sosial • IWB'],
    ['Taksonomi Bloom', '3 domain • 6 tahap kognitif • Hasil pembelajaran'],
    ['Kemahiran Berfikir', 'Kritis • Kreatif • 13 kemahiran mengajar'],
    ['Motivasi & Pembelajaran', 'Maslow • Bandura • Intrinsik vs ekstrinsik'],
  ],
  '2303': [
    ['Konsep Penilaian', 'Pentaksiran • Pengukuran • Eksistensi'],
    ['Ujian & Pengukuran', 'Jenis ujian • Pembinaan • Skor'],
    ['Taksonomi Penilaian', 'Kognitif • Afektif • Psikomotor'],
    ['Rubrik', 'Analitikal • Holistik • Skala'],
    ['Pentaksiran Formatif/Sumatif', 'Berterusan • Akhir • Diagnostik'],
    ['Kesahan & Kebolehpercayaan', 'Kesahan isi • Skala • Ralat'],
    ['Analisis Item', 'Kesukaran • Diskriminasi • Distraktor'],
    ['Pentaksiran Autentik', 'Projek • Portfolio • Prestasi'],
    ['Perekodan & Pelaporan', 'Rekod • Laporan • Interpretasi'],
    ['Pentaksiran Alternatif', 'Rakan sebaya • Kendiri • Pemerhatian'],
  ],
}

const defaultFokus = (keywords) =>
  `Fahami definisi dan aplikasi setiap konsep dalam ${keywords}. Soalan peperiksaan biasanya menguji kefahaman serta perbandingan antara konsep utama topik ini.`

const toQuizQuestions = (quiz) =>
  (quiz || []).map((qu, i) => ({
    id: 'q' + (i + 1),
    question: qu.q,
    options: qu.opts,
    correct: qu.a,
    explanation: qu.fb,
  }))

function buildSubject(subjCode, useRealTitles) {
  const maxCount = subjCode === '1303' ? 9 : 10
  const notes = (realNotes[subjCode] || []).slice(0, maxCount)
  const subjName = subjCode.startsWith('5') ? 'HMML' + subjCode : 'HPGD' + subjCode

  return notes.map((note, idx) => {
    const quiz = realQuizzes[subjCode]?.['t' + (idx + 1)] || []
    const allFc = realFlashcards[subjCode] || []
    const flashcards = allFc
      .filter((_, i) => i % maxCount === idx)
      .map((c, i) => ({ id: 'fc' + (idx + 1) + '-' + (i + 1), ...c }))

    const mock = mockMeta[subjCode]?.[idx] || [note.title, note.keywords]
    const [mockTitle, mockKeywords] = mock
    const title = useRealTitles ? (note.titleMs || note.title) : mockTitle
    const titleEn = note.titleEn || (useRealTitles ? note.title : mockTitle)
    const titleMs = note.titleMs || title
    const keywords = note.keywords && note.keywords.trim() ? note.keywords : mockKeywords
    const emojis = emojisBySubject[subjCode] || []

    return {
      id: 't' + (idx + 1),
      emoji: emojis[idx] || '📘',
      title,
      titleEn,
      titleMs,
      keywords,
      summary: note.summary || `Topik ini membincangkan konsep utama ${title} dalam modul ${subjName}.`,
      summary2: `Sebahagian daripada modul ${subjName} - ulang kaji, kuiz dan kad imbas.`,
      sections: note.sections || [],
      fokus: note.fokus && note.fokus.trim() ? note.fokus : defaultFokus(keywords),
      quiz,
      questions: toQuizQuestions(quiz),
      flashcards,
      subject: subjCode,
    }
  })
}

export const topic1103 = buildSubject('1103', true)
export const topic1203 = buildSubject('1203', true)
export const topic2303 = buildSubject('2303', false)
export const topic1303 = buildSubject('1303', true)
export const topic5103 = buildSubject('5103', true)
export const topic5533 = buildSubject('5533', true)
