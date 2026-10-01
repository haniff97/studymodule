# PDGT Hub — Frontend Clone Specification

Build a complete, self-contained **frontend clone** of the PDGT Hub study platform (https://www.pdgthub.com) in this directory. It is a bilingual (Malay/English) study platform for OUM HPGD diploma students: interactive notes, exam practice, flashcards, arcade games, XP/progress gamification.

## Stack & Conventions
- **Vite + React 18 + React Router** (react-router-dom v6+). Plain hand-written CSS (one global stylesheet + optional per-page CSS files). NO Tailwind, NO UI component library.
- **Dark theme only** (the original is dark): body background `rgb(28,28,33)`, text `rgba(255,255,255,0.94)`, muted text `rgba(255,255,255,0.6)`, card background `#232329`/`#1f1f24`, borders `rgba(255,255,255,0.08)`, accent/primary `#7c5cff` (violet) with hover `#8f74ff`, success green `#4ade80`, danger `#f87171`, warning amber `#fbbf24`, XP gold `#fbbf24`.
- **Font:** `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif`. Icons: Google **Material Symbols** (rounded) via Google Fonts CDN stylesheet link (e.g. `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`), used as `<span class="material-symbols-rounded">icon_name</span>`. Icon names used across the app: home, menu_book, edit_document, sports_esports, lightbulb, route, psychology, fact_check, leaderboard, bolt, local_fire_department, military_tech, rocket_launch, task_alt, check_circle, radio_button_unchecked, play_arrow, arrow_forward, chevron_right, search, dark_mode, light_mode, school, workspace_premium, assessment, quiz, library_books, tune, category, grid_view, refresh, account_circle, style, admin_panel_settings, verified_user, install_mobile, person, lock, visibility, visibility_off, menu, close, arrow_back, replay, fact_check, error.
- **Bilingual:** a `lang` state (ms/en) in a React context; `?lang=ms|en` URL param respected. Provide translations for all UI chrome (nav, buttons, headings). A BM/EN toggle in the top bar. Content strings (notes/questions) may stay Malay with English titles in parentheses where the original shows both (e.g. "Kuiz Pantas / Quick Quiz").
- **PWA-lite:** manifest.json + theme-color meta (nice-to-have; skip service worker).

## Data (mock, in `src/data/`)
- **Subjects:** 
  - `1103` HPGD1103 — "Pembangunan Kurikulum" (Curriculum Development) — 10 topik, 7 sets, 280 soalan
  - `1203` HPGD1203 — "Teori & Amalan P&P" (Theory and Practice of Teaching and Learning) — 10 topik, 8 sets, 320 soalan
  - `2303` HPGD2303 — "Penilaian Pendidikan" (Educational Assessment) — 10 topik, 7 sets, 280 soalan
  - Totals: 30 topik, 880 soalan, 91 kad imbas; progress denominator 85 (20+45+20).
- **HPGD1203 topics (10)** — each: `id` (t1..t10), emoji, title, keywords, short summary (2-3 sentences), 2-3 flashcards, 5 quiz questions (MCQ with 4 options + correct index + explanation):
  1. 📡 Era Digital & ODL — Konektivisme, anjakan paradigma, pembelajaran sepanjang hayat
  2. 🐕 Teori Behaviouris — Pavlov, Thorndike, Skinner, Gagne
  3. 🧩 Teori Konstruktivis — Piaget, Vygotsky, Bruner, Gardner
  4. 🤝 Pembelajaran Koperatif — STAD, Jigsaw, Penyiasatan Kumpulan
  5. 🔍 Pembelajaran Penemuan — Inkuiri, simulasi, kes, penerokaan
  6. 💡 Pembelajaran Berasaskan Masalah — PBL, 7 proses, penilaian autentik
  7. 💻 Pengajaran dengan ICT — Perisian generik, media sosial, IWB
  8. 🌸 Taksonomi Bloom — 3 domain · 6 tahap kognitif · Hasil pembelajaran
  9. 🧠 Kemahiran Berfikir — Kritis, kreatif, 13 kemahiran mengajar
  10. ⚡ Motivasi & Pembelajaran — Maslow, Bandura, intrinsik vs ekstrinsik
  - For subjects 1103 and 2303 create 10 plausible topic titles each with emoji + keywords (e.g. 1103: Kurikulum & Falsafah Pendidikan, Model Kurikulum, Reka Bentuk Kurikulum, Perlaksanaan Kurikulum, Pentaksiran Kurikulum, etc.; 2303: Konsep Penilaian, Ujian & Pengukuran, Taksonomi Penilaian, Rubrik, Pentaksiran Formatif/Sumatif, Kesahan & Kebolehpercayaan, Analisis Item, Pentaksiran Autentik, Perekodan & Pelaporan, Pentaksiran Alternatif).
- **Exam sets:** per subject `Set Mock` (10 questions sampled from topic questions) + a `Final Exam` simulation (20 questions, 60 min). Question bank = topic quizzes merged.
- **Games (6):**
  - `quick` — Kuiz Pantas / Quick Quiz — Mudah — 10 soalan — +80 XP — MCQ with immediate feedback
  - `myth` — Mitos atau Fakta / Myth or Fact — Cepat — +60 XP — true/false statements
  - `sprint` — Sprint Mode / Sprint Race — Hard — 20 soalan — +180 XP — dynamic timer +2s correct / −3s wrong
  - `blitz` — Mod Blitz / Blitz Mode — Hard — 60 saat — +140 XP — 20 questions in 60s, click cards
  - `boss` — Boss Battle / Epic Battle — Hard — 25s/soalan — +200 XP — 3 rounds vs bosses
  - `survival` — Survival / 3 Lives Mode — Hard — 3 nyawa — +150 XP — 3 mistakes = game over
- **Leaderboard (top 10):** ranks with name, rank badge, streak, XP — e.g. 1. Hana (Mahaguru, Streak 15, 42,217 XP), 2. Eba (25,719), 3. aqilah1 (25,316), 4. noraisyakmal (23,013), 5. Khalida (18,621), 6. nadhi (15,603), 7. nurmazila (14,748), 8. amirahaliyaa (9,784), 9. rosliza (9,635), 10. ayu (8,527). Current user: muhdadi — 0 XP, Tahap 1, rank "Baru Mula", 🔥 1 streak, Topik Selesai 0/85.
- **Tips (6):** "Perhatikan Syarat dan Had", "Cari Pertama, Seterusnya dan Akhir", "Cari TIDAK atau KECUALI", "Gunakan Petunjuk Definisi", "Berhati-hati dengan Semua di Atas", "Kenal Pasti Kata Tugas" — each with a 1-2 sentence explanation for MCQ exam strategy.
- **Achievements:** "Selamat Datang!" (welcome), "Ulang Kaji Malam" (night study) — shown as locked/unlocked chips.
- **Daily missions (3):** Selesaikan 1 topik nota / Cuba 1 sesi peperiksaan / Kekalkan streak harian — progress 1/3, first done, others pending.

## Routes (React Router, mirroring the original .html names)
- `/` — **Landing page** (marketing, public): top nav (logo PDGT Hub, BM/EN, theme, Log Masuk link, Daftar link). Hero: "OUM · PGDT Semester 1", headline "Nota interaktif, 880 soalan latihan gaya peperiksaan, kad imbas dan permainan untuk ketiga-tiga subjek HPGD. Dalam Bahasa Melayu dan English." CTAs: "Daftar Sekarang" + "Saya sudah ada akaun". Sub-line "Bayar sekali. Akses selamanya. Tiada langganan."
  - Stats band: **3** Subjek HPGD / **30** Topik Nota / **880** Soalan Latihan / **91** Kad Imbas.
  - "Bukan platform umum. Setiap topik dan setiap soalan dipetakan terus kepada modul HPGD anda." + 3 audience cards (pelajar HPGD1103/1203/2303, simulasi peperiksaan 60 minit, akses penuh serta-merta).
  - Features sections: **NOTA INTERAKTIF** (ringkasan padat, jadual perbandingan, blok mnemonik, kotak Fokus Peperiksaan, soalan Semak Kefahaman), **LATIHAN PEPERIKSAAN** (Mod Exam & Learn — jawapan selepas setiap soalan; Mod Final Exam — simulasi penuh; soalan berdasarkan modul HPGD rasmi OUM), **KAD IMBAS & KUIZ TOPIK** (balikkan kad; 5 soalan kuiz akhir setiap topik), **PERMAINAN ARCADE** (6 modes listed above), **KEMAJUAN & PENCAPAIAN** (XP, Tahap 1→50, streak harian, 3 misi harian, 26 pencapaian; tahap dikira dari topik disiapkan + set lulus).
  - Subjects overview: 3 cards (subject code, title, 10 topik · 7/8 set · 280/320 soalan).
  - Language section: "Tukar bahasa pada bila-bila masa dengan satu sentuhan" + BM/EN buttons + example MCQ question in Malay with 4 options (A. Pembelajaran berasaskan kuliah, B. Pembelajaran koperatif ✓, C. Pembelajaran individu terarah).
  - Why section: "Dibina oleh orang yang pernah melalui perjalanan yang sama" — features grid: Terus daripada modul OUM / Sekali bayar sahaja (Tiada langganan, tiada bayaran berulang, tiada tarikh luput) / Sehingga 4 peranti (Telefon, tablet, komputer riba) / Berfungsi luar talian (Pasang sebagai aplikasi) / Dwibahasa BM & English / Ulang kaji sepuluh minit (Direka untuk sesi pendek).
  - Pricing card: "Bayar sekali" — **Akses Penuh PDGT Hub — RM 9.00** — "satu bayaran · akses kekal" — button "Daftar & Bayar" — note: "Dikendalikan oleh ToyyibPay. ID pengguna dan kata laluan anda dihantar ke emel yang didaftarkan sebaik pembayaran disahkan."
  - FAQ accordion (4): "Adakah ini langganan bulanan?" / "Bagaimana saya menerima akaun saya?" / "Adakah ini soalan peperiksaan sebenar?" / "Bolehkah saya gunakannya di telefon?" — answers: once-only payment; credentials emailed after payment confirmation; based on official OUM modules with real exam questions added as available; works on phone/tablet/laptop, progress synced.
  - CTA band: "Akses penuh kepada semua subjek, sekali bayar, sebaik pembayaran disahkan." + Daftar Sekarang / Log Masuk.
  - Footer: PDGT Hub blurb, links (Ciri, Subjek, Harga, Soalan Lazim, Log Masuk, Daftar Akaun, 011-2546 2804, Portal Admin), "Platform Kajian HPGD · OUM · © 2025 PDGT Hub" + "v1.10.2".
- `/login` — **Log Masuk**: centered card, logo (PDGT Hub / "Nota · Peperiksaan · Permainan"), subtitle "Masukkan nama pengguna dan kata laluan anda untuk akses platform kajian HPGD.", feature chips (Nota Interaktif, Latihan Peperiksaan, Permainan & XP), username field (name=username, icon person), password field (icon lock, show/hide toggle visibility/visibility_off), submit "Log Masuk" with arrow_forward. On submit: accept any non-empty username/password (mock auth) → navigate to `/home`. Error state: show "Nama pengguna atau kata laluan tidak sah." (only if fields empty). Below: "ATAU" divider, "Belum ada akaun? Daftar sekarang" → /signup.html, "← Kembali ke laman utama", "Ada masalah? Hubungi +601125462804", "Install PDGT Hub di telefon" button, footer "Akses Terkawal" + "Portal Admin" → /admin-login.html.
- `/signup.html` — **Daftar** (simple mock form: nama pengguna, kata laluan, emel; button "Daftar & Bayar" linking to pricing note).
- `/admin-login.html` — **Portal Admin** (simple admin login card, mock).
- `/home` — **Dashboard (Laman Utama)** — the authenticated shell (see Layout below). Content:
  - Greeting: "Selamat Malam · Jumaat, 14 Ogos" (time-of-day word + current date) / "Hai, muhdadi!" + subtitle "Nota interaktif, latihan peperiksaan dan permainan HPGD — semua dalam satu tempat."
  - 4 stat cards: **1 TAHAP** (⚡ 0 XP — "Tahap 1 · Baru Mula" — "Mulakan topik pertama untuk naik tahap"), **🔥 1 hari Streak Belajar** ("Teruskan momentum hari ini"), **📖 0/85 Topik Selesai** ("Belum ada topik diselesaikan"), **🏅 — Skor Terbaik Peperiksaan** ("Belum cuba peperiksaan").
  - **SAMBUNG BELAJAR** card: HPGD1103 Pembangunan Kurikulum · 0/20 · 0% → button "Mula belajar" → /notes-hub.html?subj=1103.
  - **IDEA KECIL BOLEH MEMBANTU — Tip untuk Anda**: 3 tip cards (from tips list) + "Terokai Semua Tip →".
  - **Menu Utama** (subject progress): 3 cards (HPGD1103 Diteruskan 0/20, HPGD1203 0/45, HPGD2303 0/20, each with icon + chevron_right) + "Buka Nota →".
  - **Misi Harian 1/3**: 3 mission rows with radio_button_unchecked / check_circle states.
  - **Aktiviti Minggu Ini** (10 OGO – 16 OGO): 3 stat numbers (0 XP MINGGUAN, 0 TOPIK BARU, 0 CUBAAN EXAM) + empty-state text.
  - **Arcade & Pangkat**: rocket_launch "Baru Mula" 0 XP terkumpul + "Leaderboard →" + Top 5 Badge "Semua →" (2 achievement chips).
- `/notes-hub.html` — **Nota hub**: heading "Nota kajian HPGD, muhdadi" + subtitle "30 topik teras merentas 3 subjek — lengkap dengan ringkasan, kuiz dan kad imbas." Rank chip (military_tech Baru Mula, bolt Tahap 1, local_fire_department 1 hari streak) + "Mula Belajar" button. Tabs row: **Kad Imbas** (style), **Kemajuan** (task_alt), **Latihan Exam** (edit_document), **Permainan** (sports_esports). Subject filter tabs (Semua/H? no — subject tabs HPGD1103/HPGD1203/HPGD2303). "10 Topik Utama" section: topic cards (emoji, "Topik N", title, keywords line, arrow_forward) → `/notes-hpgd1203.html#tN` (or the selected subject's page). Default selected subject 1203 (per ?subj=1203).
- `/notes-hpgd1103.html`, `/notes-hpgd1203.html`, `/notes-hpgd2303.html` — **Topic note pages**: sidebar (same shell), top: subject tabs (HPGD1103/1203/2303), "KEMAJUAN HPGD1203 — Topik Selesai 0/45" progress bar, page icon "10 Topik Utama" + subject title. Topic list: each topic = card with emoji, "Topik N", title, keywords; clicking opens the note view (single page per topic via anchor/hash or expandable): note content sections (Ringkasan, Jadual Perbandingan/Blok Mnemonik, Fokus Peperiksaan box, Semak Kefahaman 5-question quiz with immediate feedback + XP toast "⚡ +0 XP · Kemajuan dikemas kini"), flashcard section (#flashcards: flip cards), progress (#progress).
- `/Study_hub_exam_full.html` — **Exam page**: heading "Sudahkah anda bersedia untuk menjawab peperiksaan?" + "PGDT Semester 1 Mock Exam · 60 min setiap set". Stats: 880 SOALAN / 3 SUBJEK / 0 SET. **MOD PEPERIKSAAN**: two mode cards — school **BELAJAR / Exam & Learn** ("Jawapan & penerangan selepas setiap soalan.") and workspace_premium **SIMULASI / Final Exam** ("Jawab semua dulu, keputusan hanya selepas hantar."). **SUBJEK** cards: HPGD1103 (route icon, quiz 280), HPGD1203 (psychology, quiz 320), HPGD2303 (assessment, quiz 280). **SET SOALAN**: "Pilih subjek untuk mula" → selectable set list ("HPGD1103 · Set Mock" etc.) → "Mula" button (+0 XP). Sidebar extra: "PEPERIKSAAN — edit_document Mod Peperiksaan — tune Tetapan Set — SET DIPILIH: Belum dipilih — STATISTIK KUIZ: 0 Cubaan, — Skor Terbaik" + "LATIHAN DISYORKAN: HPGD1103 · Set Mock" + leaderboard "Lihat Pencapaian".
  - **Quiz flow** (shared component): question card (progress "Soalan X/Y", timer for Final Exam), 4 options, "Soalan Seterusnya"/"Sebelumnya" nav, in Exam&Learn mode show correct/incorrect highlight + explanation after answering; final "Hantar Exam" → confirmation modal "Hantar Peperiksaan?" (Batal / Hantar) → results screen (score, Semak Jawapan, Cuba Lagi).
- `/arcade-lobby.html` — **Arcade**: heading "Masa untuk bermain, muhdadi ⚡" + "6 mod permainan untuk menguji pengetahuan HPGD anda. Setiap kemenangan menambah XP automatik." Rank chip row (Baru Mula / Tahap 1 / 1 hari streak) + "Main Sekarang" button. Subject filter chips: Semua Subjek / HPGD1103 / HPGD1203 / HPGD2303. **6 Mod Permainan**: cards each with emoji, BM title, EN title, description, difficulty badge (Mudah/Hard), meta (10 soalan / 60 saat / 3 nyawa / 25s/soalan / 20 soalan), "+NN XP", "Mula Sekarang" → `/arcade.html?game=X&subject=all`. **Ranking Leaderboard**: top-10 table (rank #, name, badge, streak, XP) + "Buka Papan Penuh" → /arcade.html?view=leaderboard.
- `/arcade.html` — **Game play screen**: query params game/subject/view. For view=leaderboard: full leaderboard. For games: mode-specific play UI (MCQ cards with timer/score/lives per mode), end screen with score + XP earned. Simplify but keep the mode mechanics distinct: quick (10 Q, feedback), myth (true/false), sprint (timed per question +2/-3), blitz (60s total), boss (3 rounds, per-question 25s), survival (3 lives).
- `/tips.html` — **Tips**: heading "SEDIKIT DORONGAN UNTUK HARI INI / Tip untuk Anda" + intro + "Tukar Tip" (refresh) button that rotates tips; tip cards list (6 tips with explanations).
- `/profile.html` — **Profile**: user card (👨🏫 muhdadi, ⚡ 0 XP · 🔥 1 Streak, Tahap 1), progress stats, achievements grid (locked/unlocked: Selamat Datang!, Ulang Kaji Malam), logout button (→ /login).

## App Shell & Layout (authenticated pages)
- Fixed left sidebar (~240px): top logo "school PDGT Hub"; search box (home only: "Cari... Ctrl+K"); section "LOMPAT KE SUBJEK": "home Menu Utama" + 3 subject links (route/psychology/fact_check icons); section "MOD BELAJAR": Laman Utama (home), Nota (menu_book), Peperiksaan (edit_document), Permainan (sports_esports), Tip (lightbulb); section "KEMAJUAN": "Topik Selesai 0/85" mini progress + user card (👨🏫 muhdadi · ⚡ 0 XP · 🔥 1 Streak · chevron_right → /profile.html). Active nav item highlighted (violet).
- Top bar: page icon + title ("school PDGT Hub · Laman Utama"), right: BM/EN pill toggle, dark_mode toggle (toggles theme class — keep dark only, toggle can be a no-op visual), avatar.
- Main content area: max-width ~1100px, cards with rounded corners (12-16px), subtle borders, section headings (uppercase, small, muted). Greeting block: "Selamat Malam · Jumaat, 14 Ogos" small muted + H2 "Hai, muhdadi!".
- XP toast: floating bottom-center pill "⚡ +0 XP · Kemajuan dikemas kini" after actions (quiz/game completion).
- Footer (muted): "Platform Kajian HPGD · OUM · © 2025" + "Versi baharu tersedia · Kemas kini" ghost buttons.
- Responsive: sidebar collapses to a hamburger drawer (menu icon) below 900px.
- All navigation should be functional (client-side routing); mock auth state (username from login) in a context; persist lang + username in localStorage.

## Deliverables & Quality Bar
- `npm create vite`-style structure: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/router.jsx` (or routes in App), `src/context/` (LangContext, AuthContext), `src/data/` (subjects, topics, questions, games, leaderboard, tips, translations), `src/pages/` (one file per route above), `src/components/` (Sidebar, TopBar, StatCard, TopicCard, QuizRunner, Flashcard, XPToast, Modal, RankChip, LeaderboardTable, LangToggle...), `src/styles/` (global.css + per-page css).
- Malay strings for UI chrome (as in spec); provide `translations.ms` / `translations.en` maps for nav/buttons/headings.
- **Must pass:** `npm install` clean, `npm run build` succeeds with no errors, `npm run dev` serves on http://localhost:5173 with all routes rendering (no blank pages), browser console free of runtime errors on the main routes.
- Do NOT attempt to contact or fetch the real pdgthub.com; everything is mocked/local.
- Keep the code clean and modular — components small, data separated from UI, no dead code. Comment non-obvious logic briefly in English.
