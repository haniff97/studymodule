import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { LangToggle } from '../components/LangToggle.jsx'
import { subjects, totalStats } from '../data/subjects.js'
import './landing.css'

export default function Landing() {
  const { lang, t } = useLang()
  const isEn = lang === 'en'
  const allSubjCodes = ['1103', '1203', '2303', '1303', '5103', '5533']
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    document.body.classList.add('theme-violet')
    return () => document.body.classList.remove('theme-violet')
  }, [])

  return (
    <div className="landing">
      {/* Background Aurora */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora-band b1" />
        <div className="aurora-band b2" />
        <div className="aurora-band b3" />
      </div>

      <TopNav t={t} isEn={isEn} />

      <Hero isEn={isEn} />

      <StatsBand isEn={isEn} />

      <AudienceSection isEn={isEn} />

      <FeatureSection isEn={isEn} />

      <SubjectsOverview codes={allSubjCodes} isEn={isEn} />

      <LanguageSection isEn={isEn} />

      <WhySection isEn={isEn} />

      <PricingSection isEn={isEn} />

      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} isEn={isEn} />

      <CtaBand isEn={isEn} />

      <Footer isEn={isEn} />
    </div>
  )
}

function TopNav({ t, isEn }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="landing-header">
      <nav className="landing-nav">
        <Link className="ln-logo" to="/">
          <span className="ln-logo-badge">
            <i className="material-symbols-rounded">school</i>
          </span>
          <span className="ln-logo-text">
            SmartBrain <span className="gradient-text">DPLI</span>
          </span>
        </Link>

        <div className="ln-right">
          <LangToggle />

          <button
            className={`theme-switch-toggle ${isDark ? 'dark' : 'light'}`}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            title={isDark ? (isEn ? 'Switch to light mode' : 'Tukar ke mod cerah') : (isEn ? 'Switch to dark mode' : 'Tukar ke mod gelap')}
          >
            <span className="theme-switch-thumb" />
          </button>

          <Link className="ln-btn-login" to="/login">
            <i className="material-symbols-rounded">login</i>
            <span>{isEn ? 'Log In' : 'Log Masuk'}</span>
          </Link>
          <Link className="ln-btn-signup" to="/signup.html">
            <i className="material-symbols-rounded">rocket_launch</i>
            <span>{isEn ? 'Sign Up' : 'Daftar'}</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

function Hero({ isEn }) {
  return (
    <section className="hero">
      <div className="hero-badge-pill">
        <span className="hbp-dot" />
        <i className="material-symbols-rounded">auto_awesome</i>
        <span>{isEn ? 'No. 1 Study Platform · OUM DPLI Semester 1 Dan Semester 2' : 'Platform Ulang Kaji No. 1 · OUM DPLI Semester 1 Dan Semester 2'}</span>
      </div>

      <h1 className="hero-title">
        {isEn ? 'Everything you need to excel in your DPLI exams ' : 'Semua yang anda perlukan untuk hadapi peperiksaan DPLI '}
        <span className="hero-highlight">{isEn ? '— in one unified place.' : '— dalam satu tempat.'}</span>
      </h1>

      <p className="hero-sub">
        {isEn
          ? 'Interactive notes, 1,000 exam-grade MCQs, 181 flashcards & 6 arcade games for all 6 DPLI subjects — in Malay and English.'
          : 'Nota padat interaktif, 1,000 soalan simulasi peperiksaan, 181 kad imbas & 6 mod permainan untuk kesemua 6 Subjek DPLI — dalam Bahasa Melayu dan English.'}
      </p>

      <div className="hero-cta">
        <Link className="hero-btn-main" to="/signup.html">
          <i className="material-symbols-rounded">rocket_launch</i>
          <span>{isEn ? 'Get Started Now' : 'Daftar Sekarang'}</span>
        </Link>
        <Link className="hero-btn-sec" to="/login">
          <i className="material-symbols-rounded">login</i>
          <span>{isEn ? 'I Already Have an Account' : 'Saya sudah ada akaun'}</span>
        </Link>
      </div>

      <div className="hero-trust-bar">
        <div className="trust-item">
          <i className="material-symbols-rounded">bolt</i>
          <span>{isEn ? 'Instant Access' : 'Akses Serta-Merta'}</span>
        </div>
        <div className="trust-item">
          <i className="material-symbols-rounded">lock</i>
          <span>{isEn ? 'One-Time Payment' : 'Bayar Sekali Sahaja'}</span>
        </div>
        <div className="trust-item">
          <i className="material-symbols-rounded">devices</i>
          <span>{isEn ? 'Phones, Tablets & PCs' : 'Telefon, Tablet & PC'}</span>
        </div>
        <div className="trust-item">
          <i className="material-symbols-rounded">all_inclusive</i>
          <span>{isEn ? 'No Monthly Subscription' : 'Tiada Langganan'}</span>
        </div>
      </div>
    </section>
  )
}

function StatsBand({ isEn }) {
  const stats = [
    {
      num: '6',
      label: isEn ? 'DPLI Subjects' : 'Subjek DPLI',
      sub: isEn ? 'Complete module coverage' : 'Liputan modul penuh',
      icon: 'library_books',
      color: 'teal'
    },
    {
      num: '59',
      label: isEn ? 'Compact Topic Notes' : 'Topik Nota Padat',
      sub: isEn ? 'Summaries & mnemonics' : 'Ringkasan & mnemonik',
      icon: 'menu_book',
      color: 'purple'
    },
    {
      num: '1,000',
      label: isEn ? 'Exam Questions (MCQs)' : 'Soalan Peperiksaan (MCQ)',
      sub: isEn ? '25 sets with explanations' : '25 set berserta huraian',
      icon: 'quiz',
      color: 'gold'
    },
    {
      num: '181',
      label: isEn ? 'Interactive Flashcards' : 'Kad Imbas Interaktif',
      sub: isEn ? 'Double-sided term mastery' : 'Hafalan konsep pantas',
      icon: 'style',
      color: 'orange'
    },
  ]

  return (
    <section className="stats-band">
      {stats.map((s, idx) => (
        <div className={`stat-card stat-${s.color}`} key={idx}>
          <div className="stat-icon-wrap">
            <i className="material-symbols-rounded">{s.icon}</i>
          </div>
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </section>
  )
}

function AudienceSection({ isEn }) {
  const audiences = [
    {
      icon: 'school',
      title: isEn ? 'DPLI Semester 1 & Semester 2 Students' : 'Pelajar DPLI Semester 1 Dan Semester 2',
      desc: isEn
        ? 'Notes and practice questions mapped directly to official OUM modules for structured revision.'
        : 'Nota dan soalan dipetakan terus kepada modul rasmi OUM untuk pembelajaran berstruktur.'
    },
    {
      icon: 'timer',
      title: isEn ? 'Approaching Final Exams' : 'Calon Peperiksaan Akhir',
      desc: isEn
        ? 'Targeted revision and 60-minute timed final exam simulations with full answer explanations.'
        : 'Ulang kaji intensif dan simulasi peperiksaan 60 minit bermasa dengan huraian jawapan lengkap.'
    },
    {
      icon: 'schedule',
      title: isEn ? 'Working Educators & Teachers' : 'Guru & Pendidik Bekerjaya',
      desc: isEn
        ? 'Micro-learning on any mobile device — revise anytime, anywhere in just 10 to 15 minutes.'
        : 'Sesi ulang kaji padat 10-15 minit di telefon pintar — belajar fleksibel mengikut jadual anda.'
    }
  ]

  return (
    <section className="audience">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'Targeted Design' : 'Reka Bentuk Khusus'}</div>
        <h2 className="section-title">
          {isEn ? 'Specially Built for OUM Education Students' : 'Dibina Khas untuk Pelajar Pendidikan OUM'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'Tailored specifically to help you study smarter, master challenging concepts, and score high marks.'
            : 'Diselaraskan khusus untuk membantu anda belajar lebih pantas, faham konsep sukar, dan skor cemerlang.'}
        </p>
      </div>

      <div className="audience-grid">
        {audiences.map((a, i) => (
          <div className="card audience-card" key={i}>
            <div className="card-icon-box">
              <i className="material-symbols-rounded">{a.icon}</i>
            </div>
            <h4>{a.title}</h4>
            <p>{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeatureSection({ isEn }) {
  const feats = [
    {
      icon: 'menu_book',
      badge: isEn ? 'Notes' : 'Nota',
      title: isEn ? '59 Topic Summaries with Exam Focus' : '59 Topik Nota Padat & Fokus Peperiksaan',
      desc: isEn
        ? 'Structured notes, comparison tables, mnemonics, and Quick Check comprehension checks for every module topic.'
        : 'Ringkasan padat, jadual perbandingan, blok mnemonik hafalan, dan semakan kefahaman setiap topik modul.'
    },
    {
      icon: 'edit_document',
      badge: isEn ? 'Exam' : 'Peperiksaan',
      title: isEn ? '1,000 Questions across 25 Exam Sets' : '1,000 Soalan Peperiksaan & 25 Set Lengkap',
      desc: isEn
        ? 'Two practical modes: Exam & Learn gives instant explanations after each question; Final Exam simulates real test conditions.'
        : 'Dua mod fleksibel: Mod Exam & Learn memberi jawapan serta-merta; Mod Final Exam simulasi peperiksaan bermasa 60 minit.'
    },
    {
      icon: 'style',
      badge: isEn ? 'Memory' : 'Hafalan',
      title: isEn ? '181 Flashcards & 295 Topical Quizzes' : '181 Kad Imbas & 295 Kuiz Topikal',
      desc: isEn
        ? 'Flip interactive double-sided cards to memorize technical terminology and reinforce knowledge at the end of each topic.'
        : 'Balikkan kad imbas interaktif untuk hafalan istilah penting; uji kefahaman topik dengan kuiz interaktif.'
    },
    {
      icon: 'sports_esports',
      badge: isEn ? 'Arcade' : 'Arked',
      title: isEn ? '6 Arcade Game Modes with XP' : '6 Mod Permainan Arked & Ganjaran XP',
      desc: isEn
        ? 'Quick Quiz, Myth or Fact, Sprint, Blitz, Boss Battle, and Survival. Turn revision into an engaging, gamified challenge.'
        : 'Kuiz Pantas, Mitos atau Fakta, Sprint, Blitz, Boss Battle, dan Survival. Jadikan sesi ulang kaji satu cabaran menyeronokkan.'
    },
    {
      icon: 'translate',
      badge: isEn ? 'Bilingual' : 'Dwibahasa',
      title: isEn ? 'Instant Bilingual Toggle (BM ⟷ EN)' : 'Togol Dwibahasa Serta-Merta (BM ⟷ EN)',
      desc: isEn
        ? 'Switch between Bahasa Melayu and English at any time with a single tap — perfect for exam questions and notes.'
        : 'Tukar bahasa soalan dan penerangan pada bila-bila masa dengan satu sentuhan — BM atau Bahasa Inggeris.'
    },
    {
      icon: 'trending_up',
      badge: isEn ? 'Progress' : 'Kemajuan',
      title: isEn ? 'Live Progress Tracking & Milestones' : 'Penjejakan Kemajuan & 26 Pencapaian',
      desc: isEn
        ? 'Earn XP, maintain your daily study streak, complete learning challenges, and monitor your exact completion percentage.'
        : 'Kumpul mata XP, kekalkan streak harian, selesaikan misi belajar, dan buka 26 lencana pencapaian istimewa.'
    },
  ]

  return (
    <section className="features" id="features">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'All-in-One Hub' : 'Lengkap & Komprehensif'}</div>
        <h2 className="section-title">
          {isEn ? 'Everything Included with Your Access' : 'Semua yang Anda Peroleh Selepas Mendaftar'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'A complete revision ecosystem crafted specifically to maximize your academic performance.'
            : 'Ekosistem ulang kaji serba lengkap yang direka khas untuk memaksimumkan gred peperiksaan anda.'}
        </p>
      </div>

      <div className="features-grid">
        {feats.map((f, i) => (
          <div className="card feature-card" key={i}>
            <div className="fc-top">
              <div className="fc-icon">
                <i className="material-symbols-rounded">{f.icon}</i>
              </div>
              <span className="fc-badge">{f.badge}</span>
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SubjectsOverview({ codes, isEn }) {
  const subjColors = {
    '1103': '#8b5cf6',
    '1203': '#3b82f6',
    '2303': '#10b981',
    '1303': '#f59e0b',
    '5103': '#ec4899',
    '5533': '#06b6d4',
  }

  return (
    <section className="subjects" id="subjects">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'Complete Curriculum' : 'Kurikulum Lengkap'}</div>
        <h2 className="section-title">
          {isEn ? 'All 6 Courses Included & Ready' : 'Kesemua 6 Subjek, Siap Sepenuhnya'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'Covering all foundational education and Malay language pedagogy modules for this semester.'
            : 'Merangkumi kesemua kursus teras pendidikan dan inovasi pedagogi semester ini.'}
        </p>
      </div>

      <div className="subjects-grid">
        {codes.map((c) => {
          const s = subjects[c]
          const color = subjColors[c] || '#8b5cf6'
          const sTitle = isEn ? (s.titleEn || s.title) : s.title

          return (
            <div className="card subject-card" key={c} style={{ '--subj-accent': color }}>
              <div className="sc-header">
                <div className="sc-code-pill" style={{ background: `${color}20`, color }}>
                  {s.name}
                </div>
                <div className="sc-icon" style={{ color }}>
                  <i className="material-symbols-rounded">{s.icon}</i>
                </div>
              </div>

              <h4 className="subject-title">{sTitle}</h4>

              <div className="sc-chips">
                <span className="sc-chip">
                  <i className="material-symbols-rounded">menu_book</i>
                  {s.topicsCount} {isEn ? 'Topics' : 'Topik'}
                </span>
                <span className="sc-chip">
                  <i className="material-symbols-rounded">quiz</i>
                  {s.questions} {isEn ? 'MCQs' : 'Soalan'}
                </span>
                <span className="sc-chip">
                  <i className="material-symbols-rounded">folder_open</i>
                  {s.sets} {isEn ? 'Sets' : 'Set'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function LanguageSection({ isEn }) {
  const [selectedDemo, setSelectedDemo] = useState(1)

  return (
    <section className="lang-section">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'Bilingual Support' : 'Dwi Bahasa'}</div>
        <h2 className="section-title">
          {isEn ? 'Study in Malay. Practice in English.' : 'Belajar dalam Bahasa Melayu. Jawab dalam English.'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'Seamlessly toggle language anytime with a single click across notes, quizzes, and simulated exams.'
            : 'Tukar bahasa pada bila-bila masa dengan satu sentuhan — BM atau English di semua nota dan soalan.'}
        </p>
      </div>

      <div className="card example-mcq">
        <div className="em-topbar">
          <div className="em-head">
            <i className="material-symbols-rounded">verified</i>
            <span>{isEn ? 'Interactive Question Preview' : 'Pratonton Soalan Interaktif'}</span>
          </div>
          <div className="em-lang-badge">
            <span className="em-badge-active">BM</span>
            <span>EN</span>
          </div>
        </div>

        <div className="em-q">
          {isEn
            ? 'Which of the following approaches is most effective for fostering cooperative learning?'
            : 'Antara berikut, kaedah pembelajaran manakah yang paling aktif dalam memupuk pembelajaran koperatif?'}
        </div>

        <div className="em-options">
          <div
            className={`em-opt ${selectedDemo === 0 ? 'selected wrong' : ''}`}
            onClick={() => setSelectedDemo(0)}
          >
            <span className="em-opt-letter">A</span>
            <span>{isEn ? 'Traditional lecture-based teaching' : 'Pembelajaran berasaskan kuliah tradisional'}</span>
          </div>
          <div
            className={`em-opt correct ${selectedDemo === 1 ? 'selected' : ''}`}
            onClick={() => setSelectedDemo(1)}
          >
            <span className="em-opt-letter">B</span>
            <span>{isEn ? 'Think-Pair-Share & Group Discussions' : 'Think-Pair-Share & Perbincangan Kumpulan'}</span>
            <i className="material-symbols-rounded em-check">check_circle</i>
          </div>
          <div
            className={`em-opt ${selectedDemo === 2 ? 'selected wrong' : ''}`}
            onClick={() => setSelectedDemo(2)}
          >
            <span className="em-opt-letter">C</span>
            <span>{isEn ? 'Isolated independent silent reading' : 'Pembacaan senyap bersendirian'}</span>
          </div>
        </div>

        <div className="em-exp">
          <i className="material-symbols-rounded">lightbulb</i>
          <span>
            {isEn
              ? 'Explanation: Cooperative learning thrives through structured peer collaboration like Think-Pair-Share.'
              : 'Penerangan: Kaedah koperatif berkesan melalui interaksi rakan sebaya berstruktur seperti Think-Pair-Share.'}
          </span>
        </div>
      </div>
    </section>
  )
}

function WhySection({ isEn }) {
  const items = [
    {
      icon: 'menu_book',
      t: isEn ? 'Direct from OUM Modules' : 'Terus daripada Modul OUM',
      d: isEn ? 'Content strictly mapped to the official syllabus.' : 'Kandungan dipetakan kepada silibus rasmi tanpa maklumat meleret.'
    },
    {
      icon: 'task_alt',
      t: isEn ? 'Single One-Time Payment' : 'Sekali Bayar Sahaja',
      d: isEn ? 'No subscriptions, no recurring bills, no expiry dates.' : 'Tiada langganan, tiada bayaran berulang, tiada tarikh luput.'
    },
    {
      icon: 'devices',
      t: isEn ? 'Up to 4 Devices' : 'Sehingga 4 Peranti Serentak',
      d: isEn ? 'Access seamlessly on phones, tablets, and laptops.' : 'Akses serentak di telefon, tablet, dan komputer riba.'
    },
    {
      icon: 'install_mobile',
      t: isEn ? 'Install as Mobile App (PWA)' : 'Pasang Sebagai Aplikasi (PWA)',
      d: isEn ? 'Install directly on home screen for rapid 1-tap access.' : 'Pasang terus ke skrin utama telefon untuk akses pantas 1-sentuhan.'
    },
    {
      icon: 'translate',
      t: isEn ? 'Bilingual BM & English' : 'Dwibahasa BM & English',
      d: isEn ? 'Switch languages instantly with one easy tap.' : 'Tukar bahasa soalan dan nota dengan satu sentuhan.'
    },
    {
      icon: 'timer',
      t: isEn ? '10-Minute Rapid Revision' : 'Ulang Kaji 10 Minit Padat',
      d: isEn ? 'Designed specifically for busy working students.' : 'Direka untuk sesi belajar pendek dan berimpak tinggi.'
    },
  ]

  return (
    <section className="why">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'Why Choose Us' : 'Kelebihan Utama'}</div>
        <h2 className="section-title">
          {isEn ? 'Why Educators & Students Choose SmartBrain DPLI' : 'Kenapa Pilih SmartBrain DPLI'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'Engineered to turn complex modules into clear, manageable, and high-scoring study sessions.'
            : 'Dibina untuk memudahkan pemahaman modul kompleks dan membantu anda mencapai gred tertinggi.'}
        </p>
      </div>

      <div className="why-grid">
        {items.map((i, idx) => (
          <div className="card why-card" key={idx}>
            <div className="wc-icon-box">
              <i className="material-symbols-rounded">{i.icon}</i>
            </div>
            <h5>{i.t}</h5>
            <p>{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Fixed PricingSection (Centered column, no side-by-side squishing, luxury frosted glass card)
function PricingSection({ isEn }) {
  return (
    <section className="pricing" id="pricing">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'Simple & Transparent' : 'Mudah & Telus'}</div>
        <h2 className="section-title">
          {isEn ? 'One Price. All 6 Courses. Lifetime Access.' : 'Satu Harga. Semua Subjek. Selamanya.'}
        </h2>
        <p className="section-sub">
          {isEn
            ? 'No monthly fees. No recurring renewals. Full unrestricted access to all current and future updates.'
            : 'Tiada bayaran bulanan. Tiada pembaharuan. Akses penuh tanpa had ke semua modul dan kemas kini.'}
        </p>
      </div>

      <div className="card pricing-card">
        <div className="pc-badge">
          <i className="material-symbols-rounded">stars</i>
          <span>{isEn ? 'BEST VALUE · FULL ACCESS' : 'NILAI TERBAIK · AKSES PENUH'}</span>
        </div>

        <div className="pc-title">{isEn ? 'SmartBrain DPLI Lifetime Pass' : 'Pas Akses Penuh SmartBrain DPLI'}</div>
        <div className="pc-desc">
          {isEn ? 'Complete access to all 6 courses and features' : 'Akses lengkap ke semua 6 kursus dan modul'}
        </div>

        <div className="pc-price-wrap">
          <span className="pc-rm">RM</span>
          <span className="pc-price">23.00</span>
        </div>
        <div className="pc-note">
          <i className="material-symbols-rounded">check_circle</i>
          <span>{isEn ? 'one single payment · lifetime access' : 'satu bayaran sahaja · akses kekal'}</span>
        </div>

        <div className="pc-features-list">
          <div className="pc-feat-item">
            <i className="material-symbols-rounded">check</i>
            <span>{isEn ? 'All 6 DPLI subjects unlocked' : 'Kesemua 6 Subjek DPLI'}</span>
          </div>
          <div className="pc-feat-item">
            <i className="material-symbols-rounded">check</i>
            <span>{isEn ? '1,000 exam MCQs with detailed explanations' : '1,000 soalan peperiksaan & huraian jawapan'}</span>
          </div>
          <div className="pc-feat-item">
            <i className="material-symbols-rounded">check</i>
            <span>{isEn ? '59 topic notes, comparison tables & mnemonics' : '59 topik nota padat, jadual & mnemonik'}</span>
          </div>
          <div className="pc-feat-item">
            <i className="material-symbols-rounded">check</i>
            <span>{isEn ? '181 flashcards & 6 arcade game modes' : '181 kad imbas & 6 mod arked permainan'}</span>
          </div>
          <div className="pc-feat-item">
            <i className="material-symbols-rounded">check</i>
            <span>{isEn ? 'Usable on up to 4 devices simultaneously' : 'Akses sehingga 4 peranti serentak'}</span>
          </div>
          <div className="pc-feat-item">
            <i className="material-symbols-rounded">check</i>
            <span>{isEn ? 'All future question sets & updates included' : 'Semua kemas kini bahan baharu percuma'}</span>
          </div>
        </div>

        <Link className="pc-btn" to="/signup.html">
          <i className="material-symbols-rounded">shopping_cart_checkout</i>
          <span>{isEn ? 'Register & Get Access Now' : 'Daftar & Bayar Sekarang'}</span>
        </Link>

        <div className="pc-guarantee">
          <i className="material-symbols-rounded">verified_user</i>
          <span>
            {isEn
              ? 'Secure payment via ToyyibPay. Your login credentials are automatically delivered to your registered email immediately upon payment.'
              : 'Pembayaran selamat diuruskan oleh ToyyibPay. ID log masuk anda dihantar secara automatik ke emel sebaik sahaja bayaran selesai.'}
          </span>
        </div>
      </div>
    </section>
  )
}

function FaqSection({ openFaq, setOpenFaq, isEn }) {
  const faqs = [
    {
      q: isEn ? 'Is this a monthly subscription?' : 'Adakah ini langganan bulanan?',
      a: isEn
        ? 'No. It is a single one-time payment of RM 23.00 for lifetime access — no monthly charges, no recurring fees, and no expiry dates.'
        : 'Tidak. Ia adalah bayaran sekali sahaja sebanyak RM 23.00 untuk akses kekal — tiada langganan bulanan dan tiada yuran tersembunyi.'
    },
    {
      q: isEn ? 'How do I receive my login account?' : 'Bagaimana saya menerima akaun saya?',
      a: isEn
        ? 'As soon as your payment is confirmed via ToyyibPay, your username and password are automatically generated and sent to your registered email address.'
        : 'Sebaik sahaja bayaran disahkan melalui ToyyibPay, nama pengguna dan kata laluan anda dijana secara automatik dan dihantar terus ke emel yang didaftarkan.'
    },
    {
      q: isEn ? 'Are all 6 courses included?' : 'Adakah kesemua 6 kursus termasuk dalam bayaran ini?',
      a: isEn
        ? 'Yes! You get immediate full access to HPGD1103, HPGD1203, HPGD2303, HPGD1303, HMML5103, and HMML5533 without paying anything extra.'
        : 'Ya! Anda mendapat akses penuh serta-merta ke HPGD1103, HPGD1203, HPGD2303, HPGD1303, HMML5103, dan HMML5533 tanpa sebarang caj tambahan.'
    },
    {
      q: isEn ? 'Can I study on my smartphone and laptop?' : 'Bolehkah saya gunakannya di telefon dan komputer?',
      a: isEn
        ? 'Yes! SmartBrain DPLI is fully responsive across phones, tablets, and laptops. You can also install it as a progressive web app (PWA) directly onto your mobile home screen.'
        : 'Ya! SmartBrain DPLI responsif sepenuhnya di telefon pintar, tablet, dan komputer. Anda juga boleh memasangnya sebagai aplikasi mudah alih (PWA) di skrin utama telefon anda.'
    },
    {
      q: isEn ? 'Are the questions based on real OUM exams?' : 'Adakah soalan ini berdasarkan peperiksaan sebenar OUM?',
      a: isEn
        ? 'All 1,000 questions are strictly based on the official OUM course modules and past semester exam trends, categorized by cognitive difficulty levels.'
        : 'Semua 1,000 soalan digubal berpandukan silibus modul rasmi OUM dan format peperiksaan sebenar, lengkap dengan tahap kesukaran kognitif.'
    }
  ]

  return (
    <section className="faq" id="faq">
      <div className="section-header">
        <div className="section-pill">{isEn ? 'Got Questions?' : 'Soalan Lazim'}</div>
        <h2 className="section-title">{isEn ? 'Frequently Asked Questions' : 'Soalan Lazim Pelajar'}</h2>
        <p className="section-sub">
          {isEn
            ? 'Everything you need to know about the platform, access, and payment.'
            : 'Segala jawapan kepada persoalan biasa mengenai akses, modul, dan pembayaran.'}
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((f, i) => (
          <div className={`card faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
            <button
              className="faq-q"
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              type="button"
            >
              <span>{f.q}</span>
              <div className="faq-icon-pill">
                <i className="material-symbols-rounded">{openFaq === i ? 'expand_less' : 'expand_more'}</i>
              </div>
            </button>
            {openFaq === i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

// Redesigned CtaBand (Frosted glass aurora card instead of flat bright purple box)
function CtaBand({ isEn }) {
  return (
    <section className="cta-band">
      <div className="cta-inner">
        <div className="cta-pill">
          <i className="material-symbols-rounded">alarm</i>
          <span>{isEn ? 'Exam Season is Near' : 'Musim Peperiksaan Semakin Dekat'}</span>
        </div>

        <h2 className="cta-title">
          {isEn
            ? 'Final exams are approaching. Start your revision today.'
            : 'Peperiksaan semakin hampir. Mula ulang kaji hari ini.'}
        </h2>

        <p className="cta-sub">
          {isEn
            ? 'Join fellow OUM educators and students who are already mastering their coursework and passing with flying colours.'
            : 'Sertai rakan-rakan pendidik dan pelajar OUM yang telah mula menguasai silibus dan bersiap sedia untuk cemerlang.'}
        </p>

        <div className="cta-actions">
          <Link className="cta-btn-main" to="/signup.html">
            <i className="material-symbols-rounded">rocket_launch</i>
            <span>{isEn ? 'Register Now · RM 23.00' : 'Daftar Sekarang · RM 23.00'}</span>
          </Link>
          <Link className="cta-btn-sec" to="/login">
            <i className="material-symbols-rounded">login</i>
            <span>{isEn ? 'Log In to Account' : 'Log Masuk'}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer({ isEn }) {
  return (
    <footer className="landing-footer">
      <div className="lf-top">
        <div className="lf-brand">
          <div className="lf-logo">
            <span className="ln-logo-badge">
              <i className="material-symbols-rounded">school</i>
            </span>
            <span className="ln-logo-text">
              SmartBrain <span className="gradient-text">DPLI</span>
            </span>
          </div>
          <p>
            {isEn
              ? 'Premier interactive revision and exam simulation platform for OUM Postgraduate Diploma in Teaching (PGDT & DPLI) students.'
              : 'Platform kajian interaktif dan simulasi peperiksaan terunggul untuk pelajar Diploma Pascasiswazah Pengajaran (PGDT & DPLI) OUM.'}
          </p>
          <div className="lf-contact-chip">
            <i className="material-symbols-rounded">phone</i>
            <a href="tel:+601125462804">011-2546 2804 (Bantuan WhatsApp)</a>
          </div>
        </div>

        <div className="lf-columns">
          <div className="lf-col">
            <div className="lf-col-title">{isEn ? 'Quick Navigation' : 'Navigasi Pantas'}</div>
            <a href="#features">{isEn ? 'Features' : 'Ciri-Ciri'}</a>
            <a href="#subjects">{isEn ? '6 Subjects' : '6 Modul Subjek'}</a>
            <a href="#pricing">{isEn ? 'Pricing' : 'Pelan Harga'}</a>
            <a href="#faq">{isEn ? 'FAQs' : 'Soalan Lazim'}</a>
          </div>

          <div className="lf-col">
            <div className="lf-col-title">{isEn ? 'Account & Access' : 'Akses Akaun'}</div>
            <Link to="/login">{isEn ? 'Student Log In' : 'Log Masuk Pelajar'}</Link>
            <Link to="/signup.html">{isEn ? 'Create New Account' : 'Daftar Akaun Baharu'}</Link>
            <Link to="/admin-login.html">{isEn ? 'Admin Portal' : 'Portal Pentadbir'}</Link>
          </div>

          <div className="lf-col">
            <div className="lf-col-title">{isEn ? 'Curriculum' : 'Kursus OUM'}</div>
            <span>DPLI 1103 · 1203 · 2303</span>
            <span>DPLI 1303 · Sejarah Edu</span>
            <span>HMML 5103 · 5533 Melayu</span>
          </div>
        </div>
      </div>

      <div className="lf-bottom">
        <div className="lf-copy">
          SmartBrain DPLI · OUM · © 2025. {isEn ? 'All rights reserved.' : 'Hak cipta terpelihara.'}
        </div>
        <div className="lf-meta">
          <span className="lf-version">v1.11.0</span>
          <span>·</span>
          <span>ToyyibPay Certified</span>
        </div>
      </div>
    </footer>
  )
}
