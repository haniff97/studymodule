# SmartBrain DPLI · Platform Ulang Kaji & Bank Tugasan OUM

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-lightblue.svg)](https://www.sqlite.org/)
[![Status](https://img.shields.io/badge/Test%20Suites-7%2F7%20Passed-brightgreen.svg)]()

**SmartBrain DPLI** ialah platform pembelajaran digital komprehensif yang direka khas untuk pelajar **Diploma Pascasiswazah Pendidikan (DPLI)** dan program Pascasiswazah **Open University Malaysia (OUM)**. Platform ini menggabungkan bank contoh tugasan lengkap, nota padat interaktif, simulator peperiksaan bermasa, dan permainan arked pendidikan dalam satu ekosistem moden yang responsif.

---

## 🌟 Modul & Ciri-Ciri Utama

### 1. Bank Contoh Tugasan Lengkap (297 Tugasan OUM) 📚
Koleksi lengkap 297 modul tugasan terperinci bagi 3 kursus teras:
- **HPGD1303** — *History of Education* (99 Set)
- **HMML5533** — *Inovasi Pedagogi dalam Pendidikan Bahasa Melayu* (99 Set)
- **HMML5103** — *Teori Linguistik dalam Pendidikan Bahasa Melayu* (99 Set)

Setiap set tugasan mengandungi:
- **Esei Penilaian Kritis Penuh**: Struktur tesis, analisis mendalam, cadangan intervensi, dan implikasi kurikulum (2,500 – 3,000 perkataan).
- **Rangka & Skrip Slaid Pembentangan**: 10 slaid tersusun berserta skrip pengucapan lisan (*speaker notes*).
- **Hantaran Forum OCP myINSPIRE**: 5 hantaran perbincangan interaktif lengkap untuk memenuhi rubrik penglibatan dalam talian.
- **Senarai Rujukan Format APA 7th**: Senarai literatur akademik terkini mengikut format rasmi.
- **Muat Turun Fail Microsoft Word (.docx)**: Setiap modul tugasan boleh dimuat turun terus dalam format fail `.docx` untuk rujukan luar talian.

### 2. Nota Padat Interaktif (59 Topik Modul) 📖
- **Struktur Berfokus Silibus**: Merangkumi 6 kursus utama (HPGD1103, HPGD1203, HPGD2303, HPGD1303, HMML5103, HMML5533).
- **Format Akordion Dinamik**: Navigasi bahagian nota yang kemas dengan kebolehan buka/tutup (*expand/collapse*).
- **Kawalan Pembacaan**: Pelarasan saiz fon teks secara langsung bagi keselesaan membaca di telefon pintar dan komputer riba.
- **Bahan Bantu Hafalan**: Jadual perbandingan konsep, kotak mnemonik hafalan, dan blok semakan kefahaman (*Quick Check*).
- **Kad Imbas (Flashcards)**: 181 kad imbas interaktif dwimuka dengan animasi pusingan pantas untuk pengukuhan istilah.

### 3. Simulasi Peperiksaan & Kuiz (1,000 Soalan MCQ) 📝
- **Mod Peperiksaan & Pembelajaran (*Exam & Learn*)**: Latihan soalan dengan maklum balas serta-merta, penerangan jawapan, dan rujukan silibus.
- **Mod Peperiksaan Akhir (*Final Exam Simulation*)**: Sesi bermasa 60 minit (40 soalan), penyerahan automatik apabila pemasa tamat, dan amaran modal serahan.
- **Palet Grid Soalan (*Question Palette*)**: Lompat pantas ke mana-mana soalan 1 hingga 40 dengan penunjuk status soalan (belum dijawab, telah dijawab, bertanda).
- **Ulasan Jawapan Terperinci**: Analisis prestasi penuh, peratusan markah, lencana pencapaian, dan semakan jawapan betul vs pilihan pelajar.

### 4. Arked Pembelajaran & Sistem Gamifikasi 🎮
6 mod permainan berasaskan bank soalan peperiksaan:
- **Kuiz Pantas (*Quick Quiz*)**: Sesi pantas 10 soalan untuk ujian kefahaman segera.
- **Mitos atau Fakta (*Myth or Fact*)**: Menilai pemikiran kritis terhadap pernyataan kurikulum.
- **Sprint**: Perlumbaan masa menjawab sebanyak mungkin soalan dalam 60 saat.
- **Blitz**: Ujian kepantasan maksimum dengan pemasa 10 saat setiap soalan.
- **Boss Battle**: Pertempuran HP interaktif — jawapan betul mengurangkan HP bos, jawapan salah mengurangkan HP pemain.
- **Survival**: Cabaran 3 nyawa untuk menguji ketahanan dan ketepatan menjawab.
- **Papan Pendahulu (*Leaderboard*) & Sistem XP**: Ganjaran mata pengalaman (XP), kiraan hari konsisten (*study streak*), dan penarafan tahap pengguna.

### 5. Pengalaman Pengguna Bersepadu & Dwibahasa 🌍
- **Togol Dwibahasa Serta-Merta (BM / EN)**: Suis pertukaran bahasa masa nyata merentasi semua halaman, nota, soalan, kuiz, dan antaramuka log masuk.
- **Mod Gelap & Mod Cerah (*Dark/Light Mode*)**: Penggayaan elegan bertaraf iOS dengan togol lancar yang disimpan secara setempat.
- **Aplikasi Web Progresif (PWA)**: Boleh dipasang (*installable*) terus ke skrin utama telefon pintar, tablet, atau desktop dengan sokongan luar talian.
- **Responsif Mudah Alih Penuh**: Bar navigasi bawah (*bottom navigation*), laci menu hamburger, dan reka bentuk bebas limpahan mendatar (*zero horizontal overflow*) pada paparan 375px.

### 6. Portal Pentadbir (*Admin Panel*) 🛡️
- **Pengurusan Pengguna**: Tambah pelajar baharu, tetapkan kata laluan semula, semak mata XP & kemajuan pembelajaran, atau lupuskan akaun.
- **Penyunting Bahan Kajian**: Antaramuka pengurusan nota, soalan MCQ, kuiz topik, kad imbas, dan tip peperiksaan.
- **Statistik & Analisis**: Pemantauan bilangan bahan dan aktiviti pelajar secara berpusat.

---

## 🛠️ Seni Bina Teknologi (Tech Stack)

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite 5, React Router 6 | Antaramuka SPA pantas dengan Hot Module Replacement (HMR) |
| **Penggayaan** | CSS Moden Berstruktur | Reka bentuk kaca beku (*frosted glass*), kesan aurora, dan tema CSS tersuai |
| **Backend** | Node.js, Express.js | RESTful API untuk pengesahan, bahan kursus, muat turun DOCX, dan kemajuan |
| **Pangkalan Data** | SQLite (`better-sqlite3`) | Pangkalan data pantas mod WAL dengan transaksi selamat |
| **Pengesahan** | `express-session`, `bcryptjs` | Kuki sesi `httpOnly` dengan penyulitan kata laluan selamat |
| **Ujian Kualiti** | Playwright, Node.js Test Suite | 7 suite ujian automasi menyeluruh bagi tingkah laku pengguna sebenar |
| **Penyampaian Awam**| Loophole TLS Tunnel | Terowong HTTPS disulitkan hujung-ke-hujung untuk akses luaran |

---

## 🚀 Panduan Memulakan (Getting Started)

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau ke atas
- Pengurus pakej `npm`

### Persediaan Tempatan (Local Development)

```bash
# 1. Pasang pakej frontend
npm install

# 2. Pasang pakej backend
cd backend && npm install && cd ..

# 3. Benihkan pangkalan data (SEKALI sahaja)
cd backend && npm run seed && cd ..

# 4. Mulakan backend (Port 4000) & frontend (Port 5173) secara berasingan
node --experimental-sqlite backend/server.js   # terminal 1
npm run dev                                    # terminal 2
```

---

## 🖥️ Panduan Deployment ke Server

> **Pangkalan data (`data.db`) tidak disertakan dalam repo** kerana mengandungi data pengguna. Ia akan dijana secara automatik apabila anda menjalankan `npm run seed`.

### Langkah-langkah Deployment

```bash
# 1. Pull kod terkini dari GitHub
git pull

# 2. Pasang semua pakej
npm install
cd backend && npm install && cd ..

# 3. Bina frontend untuk pengeluaran
npm run build

# 4. Sediakan fail .env dengan secret sebenar
echo "SESSION_SECRET=ganti-dengan-secret-rawak-yang-panjang" > backend/.env

# 5. Benihkan pangkalan data (SEKALI sahaja — jangan ulang jika DB sudah wujud)
cd backend && npm run seed && cd ..

# 6. Mulakan pelayan backend
cd backend && npm start
```

*Dalam mod pengeluaran, pelayan Express di `http://localhost:4000` akan menyajikan fail `dist/` secara automatik.*

### Apa yang Berlaku Secara Automatik

| Perkara | Automatik? | Catatan |
|---------|-----------|---------|
| Fail `data.db` dijana | ✅ Ya | Dijana serta-merta apabila `npm start` dijalankan |
| Skema jadual (`schema.sql`) diaplikasi | ✅ Ya | Hanya sekali — tidak berulang jika jadual sudah wujud |
| Kandungan kursus & akaun admin diisi | ❌ Manual | Perlu jalankan `npm run seed` **sekali** |
| `SESSION_SECRET` disediakan | ❌ Manual | Mesti tetapkan dalam `backend/.env` |

### ⚠️ Senarai Semak Keselamatan (Security Checklist)

- [ ] Tukar kata laluan `admin` selepas log masuk pertama
- [ ] Tetapkan `SESSION_SECRET` yang kuat dalam `backend/.env` (bukan nilai lalai)
- [ ] Pastikan `backend/.env` dan `backend/data.db` **tidak** dimasukkan ke dalam git
- [ ] Gunakan HTTPS (TLS) untuk persekitaran pengeluaran

---

## 🔑 Akaun Akses

| Peranan | Nama Pengguna | Kata Laluan | Laluan Akses |
| :--- | :--- | :--- | :--- |
| **Pentadbir (Admin)** | `admin` | `admin123` | `/admin-login.html` → `/admin.html` |
| **Pelajar Demo** | `demo` | `demo123` | `/login` → `/home` |
| **Pelajar Baharu** | *Daftar Sendiri* | *Pilihan Anda* | `/signup.html` |

---

## 🧪 Pengesahan Kualiti & Ujian Automasi

Platform ini dilengkapi dengan **7 suite ujian automasi** end-to-end berasaskan senario pengguna sebenar:

```bash
# Jalankan keseluruhan 7 suite ujian regresi:
node scripts/tests/run_all_tests.cjs
```

| Suite | Skrip Ujian | Skop Liputan |
| :-: | :--- | :--- |
| **1** | `test_auth_and_nav.cjs` | Log masuk, pendaftaran pelajar baharu, kuki sesi, togol dwibahasa, dan perlindungan laluan tetamu. |
| **2** | `test_notes_and_topics.cjs` | Navigasi topik 6 kursus (59 topik), QuizBlock MCQ interaktif, dan animasi kad imbas dwimuka. |
| **3** | `test_assignments_and_notes.cjs` | Modul 297 tugasan OUM, carian nombor set beralas ("set 01"), muat turun fail DOCX, pembaca esei/slaid/forum/rujukan APA, kunci tatal badan & Escape, pautan terus URL, akordion interaktif Topik 1, dan mod cerah. |
| **4** | `test_exam_simulator.cjs` | Lobi peperiksaan, mod *Exam & Learn*, simulasi peperiksaan akhir 60 minit, palet soalan (1..40), keputusan & ulasan jawapan. |
| **5** | `test_arcade_games.cjs` | 6 mod permainan arked, penapis kursus, HP bos/pemain, sistem nyawa, dan papan pendahulu. |
| **6** | `test_tips_and_admin.cjs` | Halaman tips, kawalan keselamatan pelajar, papan pemuka pentadbir 7 tab, dan pengurusan bahan/pengguna. |
| **7** | `test_mobile_responsive.cjs` | Paparan mudah alih (375x812), menu laci hamburger, bar navigasi bawah, dan pengesahan tiada limpahan mendatar. |

---

## 📁 Struktur Direktori Projek

```text
OnlineStudy_Platform/
├── backend/
│   ├── database/           # Fail data JSON tugasan (HPGD1303, HMML5103, HMML5533)
│   ├── server.js           # Pelayan Express API & pengendali fail statik
│   ├── db.js               # Pengurusan pangkalan data SQLite (better-sqlite3)
│   ├── schema.sql          # Skema jadual SQLite
│   └── seed.js             # Skrip pembenihan kandungan awal
├── public/
│   ├── DOCX_FILES/         # Fail asal Microsoft Word (.docx) bagi 297 contoh tugasan
│   ├── manifest.json       # Konfigurasi PWA
│   └── sw.js               # Service Worker PWA (Network-First Cache)
├── scripts/
│   └── tests/              # 7 suite ujian regresi automatik (Playwright)
├── src/
│   ├── components/         # Komponen UI (AppShell, TopBar, QuizRunner, Flashcard, dll.)
│   ├── context/            # Pengurusan status (AuthContext, ThemeContext, LangContext)
│   ├── data/               # Data subjek, topik, dan terjemahan
│   ├── pages/              # Halaman aplikasi (Landing, Home, Assignments, Exam, Arcade, dll.)
│   └── styles/             # Penggayaan global dan tema
├── package.json
└── README.md
```

---

## 📄 Hak Cipta & Penafian

Platform ini dibangunkan bagi tujuan kemudahan ulang kaji dan rujukan akademik para pelajar program pendidikan. Semua hak cipta modul rasmi kursus adalah kepunyaan pihak universiti yang berkenaan. Bahan contoh tugasan dan rujukan disediakan untuk membimbing kefahaman struktur dan format penulisan ilmiah.
