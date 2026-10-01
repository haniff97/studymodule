// Authentic Bahasa Melayu translations for HPGD1303 Flashcards & Mock Exam Questions
const flashcards1303 = [
  {
    q: "Apakah fungsi utama pendidikan dalam masyarakat manusia awal?",
    a: "Penyaluran budaya tidak formal, kemahiran hidup (memburu, membuat alatan), sosialisasi, dan pemeliharaan nilai serta adat resam puak."
  },
  {
    q: "Apakah 'Edubba' dalam tamadun Mesopotamia purba?",
    a: "'Rumah tablet' — institusi sekolah formal terawal di dunia untuk melatih jurutulis dalam tulisan kuneiform dan rekod pentadbiran."
  },
  {
    q: "Jelaskan konsep sistem Gurukula di India purba.",
    a: "Sistem pembelajaran Veda berpusatkan kediaman di mana murid tinggal di rumah pertapaan Guru untuk mendalami teks suci dan sahsiah diri."
  },
  {
    q: "Apakah kepentingan peperiksaan Keju di China purba?",
    a: "Peperiksaan perkhidmatan awam diraja berteraskan teks Konfusianisme, meletakkan sistem meritokrasi bersejarah bagi perkhidmatan kerajaan."
  },
  {
    q: "Apakah kaedah penyoalan Sokratik (elenchus)?",
    a: "Bentuk inkuiri dialektik berdisiplin untuk merangsang pemikiran kritis, memeriksa andaian, dan mencungkil pengetahuan daripada jiwa."
  },
  {
    q: "Apakah Alegori Gua Plato?",
    a: "Metafora dalam 'The Republic' yang menggambarkan pendidikan sebagai pembebasan jiwa daripada ilusi bayang pancaindera kepada cahaya kebenaran hakiki."
  },
  {
    q: "Jelaskan konsep 'Jalan Pertengahan' (Golden Mean) oleh Aristotle.",
    a: "Kebajikan moral yang terletak di tengah-tengah kesederhanaan antara dua ekstrem iaitu keterlaluan dan kekurangan (contohnya keberanian antara pengecut dan terburu-buru)."
  },
  {
    q: "Apakah maksud pendidik Rom Quintilian dengan ungkapan 'vir bonus dicendi peritus'?",
    a: "Matlamat utama pendidikan Rom: 'insan berbudi pekerti mulia yang petah berbicara' — menyatukan kefasihan berpidato dengan ketinggian akhlak."
  },
  {
    q: "Apakah prinsip pendidikan yang dianjurkan oleh Ibn Khaldun dalam 'Al-Muqaddimah'?",
    a: "Pembelajaran bertahap dan progresif daripada asas konkrit kepada konsep abstrak, mengikut perkembangan murid tanpa hukuman fizikal yang kasar."
  },
  {
    q: "Siapakah John Amos Comenius dan apakah sumbangan 'Didactica Magna'?",
    a: "'Bapa Pendidikan Moden' yang memperjuangkan pendidikan sejagat (pampaedia) dan menghasilkan buku teks bergambar pertama kanak-kanak."
  },
  {
    q: "Apakah triad pedagogi Pestalozzi?",
    a: "Mendidik murid secara holistik melalui pembangunan harmoni aspek 'Kepala, Hati, dan Tangan' dalam persekitaran penuh kasih sayang."
  },
  {
    q: "Siapakah pengasas Tadika (Kindergarten) dan apakah idea terasnya?",
    a: "Friedrich Froebel; menganggap kanak-kanak seperti bunga mekar di taman yang belajar melalui aktiviti bermain kendiri dan alatan deria."
  },
  {
    q: "Apakah falsafah progresivisme John Dewey?",
    a: "Pragmatisme dan konsep 'belajar sambil melakukan' (learning by doing): pendidikan adalah proses kehidupan sebenar dalam komuniti demokratik."
  },
  {
    q: "Apakah konsep 'pendidikan perbankan' yang dikritik oleh Paulo Freire?",
    a: "Kritikan terhadap amalan sekolah menindas di mana guru sekadar 'mendeposit' maklumat pasif ke dalam minda murid, bukannya dialog pembebasan."
  },
  {
    q: "Huraikan sistem pendidikan Pondok pra-kolonial di Tanah Melayu.",
    a: "Institusi pengajian agama Islam tradisional berasrama berpusatkan Tok Guru, memfokuskan kepada al-Quran, Fiqh, Tauhid, dan Bahasa Arab."
  },
  {
    q: "Apakah empat aliran persekolahan vernakular terasing zaman kolonial British?",
    a: "1. Vernakular Melayu (asas luar bandar)\n2. Vernakular Cina (tajaan persatuan klan)\n3. Vernakular Tamil (berasaskan estet)\n4. Aliran Inggeris (bandar/elit)."
  },
  {
    q: "Apakah kepentingan Maktab Perguruan Sultan Idris (MPSI/SITC, 1922)?",
    a: "Maktab perguruan premier di Tanjung Malim yang menjadi gelanggang kebangkitan intelek sastera dan nasionalisme Melayu menuntut kemerdekaan."
  },
  {
    q: "Apakah perbezaan teras antara Laporan Barnes (1951) dan Laporan Fenn-Wu (1951)?",
    a: "Barnes mencadangkan asimilasi semua murid ke dalam Sekolah Kebangsaan dwi-bahasa (Melayu/Inggeris); Fenn-Wu mempertahankan hak pendidikan bahasa ibunda vernakular."
  },
  {
    q: "Mengapakah Penyata Razak (1956) dianggap batu asas sistem pendidikan kebangsaan Malaysia?",
    a: "Mencapai kompromi bersejarah: perpaduan kebangsaan melalui kurikulum seragam dan Bahasa Melayu sebagai bahasa kebangsaan, sambil mengekalkan sekolah rendah vernakular (SK dan SJK)."
  },
  {
    q: "Apakah syor utama dalam Laporan Rahman Talib (1960)?",
    a: "Pendidikan rendah percuma untuk semua murid mulai 1962, kenaikan darjah automatik hingga Tingkatan 3, dan peperiksaan awam menengah hanya dalam Bahasa Melayu atau Bahasa Inggeris."
  },
  {
    q: "Apakah kesan utama Akta Pelajaran 1961?",
    a: "Memaktubkan kerangka perundangan sistem persekolahan kebangsaan dan memberi kuasa kepada menteri menyelaraskan bahasa pengantar serta peperiksaan awam."
  },
  {
    q: "Bilakah peralihan berperingkat Bahasa Melayu sebagai bahasa pengantar utama selesai?",
    a: "Bermula pada 1970 (Darjah 1) dan selesai sepenuhnya pada 1982 (Tingkatan 6), menukar sekolah aliran Inggeris kepada sekolah kebangsaan."
  },
  {
    q: "Apakah tumpuan Laporan Jawatankuasa Kabinet Mahathir (1979)?",
    a: "Penguasaan kemahiran asas 3M (Membaca, Menulis, Mengira) dan pendidikan nilai murni, yang melahirkan kurikulum KBSR pada 1982/83."
  },
  {
    q: "Apakah empat dimensi Falsafah Pendidikan Kebangsaan (FPK)?",
    a: "JERI: Jasmani, Emosi, Rohani, dan Intelek — diperkembangkan secara menyeluruh dan seimbang berteraskan kepercayaan kepada Tuhan."
  },
  {
    q: "Apakah kejayaan pembaharuan dalam Akta Pendidikan 1996 (Akta 550)?",
    a: "Memasukkan FPK dalam mukadimah perundangan, memansuhkan Seksyen 21(2), mengintegrasikan prasekolah, dan mengiktiraf institusi pendidikan tinggi swasta."
  },
  {
    q: "Apakah matlamat inisiatif Sekolah Bestari (1997)?",
    a: "Inisiatif perdana MSC bagi mentransformasi sekolah ke arah penggunaan teknologi digital, pembelajaran berpusatkan murid, dan kemahiran berfikir kritis."
  },
  {
    q: "Apakah yang dimaksudkan dengan MBMMBI?",
    a: "'Memartabatkan Bahasa Melayu, Memperkukuh Bahasa Inggeris' — dasar memperkukuh dwibahasa bagi memelihara bahasa kebangsaan dan daya saing global."
  },
  {
    q: "Apakah 5 Aspirasi Sistem dalam PPPM 2013–2025?",
    a: "Akses (100%), Kualiti (sepertiga teratas antarabangsa), Ekuiti (pengurangan 50% jurang), Perpaduan, dan Kecekapan."
  },
  {
    q: "Apakah 6 Aspirasi Murid dalam PPPM 2013–2025?",
    a: "Pengetahuan, Kemahiran Berfikir (KBAT), Kemahiran Memimpin, Kemahiran Dwibahasa, Etika & Kerohanian, dan Identiti Nasional."
  },
  {
    q: "Apakah 4 Teras pembaharuan pendidikan kontemporari (2026 dan seterusnya)?",
    a: "1. Kurikulum diringkaskan berasaskan kompetensi & pentaksiran autentik\n2. Pemerkasaan guru sebagai pereka pembelajaran\n3. Ekosistem digital AI pintar berpusatkan kemanusiaan\n4. Pembangunan kesejahteraan holistik murid."
  }
];

const questionSet1303 = [
  {
    id: "set-1",
    title: "Peperiksaan Percubaan 1 (HPGD1303)",
    desc: "40 soalan MCQ format peperiksaan akhir · Meliputi 9 topik modul",
    num: 1,
    questions: [
      {
        q: "Perkembangan manakah yang secara langsung mengubah pendidikan daripada amalan puak tidak formal kepada persekolahan berinstitusi formal di Mesopotamia dan Mesir Purba?",
        opts: [
          "Penciptaan sistem tulisan (kuneiform dan hieroglif) yang memerlukan latihan khusus jurutulis",
          "Kedatangan penjelajah kolonial Eropah",
          "Penciptaan mesin cetak berkomputer",
          "Pemansuhan aktiviti pertanian demi perkilangan industri"
        ],
        a: 0,
        exp: "Penciptaan tulisan melahirkan keperluan terhadap sekolah berstruktur (seperti Edubba) untuk menguasai kemahiran rekod bertulis.",
        topic: "Akar Umbi & Asal Usul Pendidikan",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Dalam karya Plato 'The Republic', pendidikan pada asasnya direka bentuk untuk mencapai keadilan sosial melalui cara:",
        opts: [
          "Membiarkan murid melakukan apa sahaja tanpa tanggungjawab sivik",
          "Menapis dan membahagikan individu mengikut keupayaan intelek dan moral kepada Penjaga, Wira, dan Pengeluar",
          "Memastikan semua rakyat menerima upah komersial yang sama rata",
          "Mengharamkan pengajian matematik dan dialektik"
        ],
        a: 1,
        exp: "Republik Plato mencadangkan pendidikan negara yang memupuk bakat semula jadi setiap individu bagi memainkan peranan mereka dalam masyarakat yang harmoni.",
        topic: "Asas Klasik dan Falsafah Pendidikan",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Karya sarjana Islam manakah, iaitu 'Ayyuha al-Walad' (Wahai Anak!), yang menegaskan bahawa ilmu tanpa amal soleh adalah satu kebankrupan rohani?",
        opts: [
          "Imam Al-Ghazali",
          "Ibn Sina",
          "Al-Farabi",
          "Ibn Khaldun"
        ],
        a: 0,
        exp: "Imam Al-Ghazali menegaskan perkaitan yang tidak dapat dipisahkan antara ilmu yang bermanfaat ('ilm nafi') dan amal soleh ('amal).",
        topic: "Pemikiran Pendidikan Merentas Zaman",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Konsep 'pampaedia' oleh John Amos Comenius dalam karyanya 'Didactica Magna' memperjuangkan:",
        opts: [
          "Pendidikan sejagat yang mengajarkan segala ilmu kepada semua manusia tanpa mengira darjat atau jantina",
          "Pendidikan yang dikhaskan semata-mata untuk bangsawan tentera",
          "Mengajar kanak-kanak dalam bahasa Latin sahaja dan mengharamkan bahasa ibunda",
          "Menggantikan semua buku teks dengan kerja buruh pertanian manual"
        ],
        a: 0,
        exp: "Comenius mempelopori visi pendidikan sejagat untuk semua anak lelaki dan perempuan daripada pelbagai lapisan kehidupan.",
        topic: "Pemikiran Pendidikan Merentas Zaman",
        difficulty: "medium",
        cognitive: "recall"
      },
      {
        q: "Apakah kesan sosiopolitik jangka panjang dasar pendidikan kolonial British di Tanah Melayu sebelum 1941?",
        opts: [
          "Mewujudkan masyarakat bersatu padu dan homogen dengan satu bahasa pengantar kebangsaan",
          "Melahirkan masyarakat majmuk terpisah di mana setiap kaum terasing mengikut bahasa, lokasi petempatan, dan fungsi ekonomi",
          "Memansuhkan semua sekolah swasta dan vernakular di seluruh semenanjung",
          "Menetapkan Bahasa Melayu sebagai bahasa pentadbiran tunggal di semua negeri"
        ],
        a: 1,
        exp: "Dasar laissez-faire British menginstitusikan konsep 'masyarakat majmuk' J.S. Furnivall di mana kumpulan etnik hanya berinteraksi di pasar perniagaan.",
        topic: "Pendidikan Peribumi dan Era Kolonial di Tanah Melayu (Sebelum 1941)",
        difficulty: "hard",
        cognitive: "analysis"
      },
      {
        q: "Muafakat dan kompromi bersejarah dalam Penyata Razak (1956) diasaskan atas prinsip utama yang mana?",
        opts: [
          "Memupuk perpaduan kebangsaan melalui kurikulum kandungan seragam dan bahasa kebangsaan sambil mengekalkan sekolah rendah vernakular",
          "Penutupan serta-merta semua sekolah rendah vernakular dalam tempoh 24 jam",
          "Menggunakan Bahasa Inggeris sebagai bahasa pengantar tunggal di semua peringkat pendidikan",
          "Memansuhkan semua peperiksaan awam secara kekal"
        ],
        a: 0,
        exp: "Penyata Razak mengimbangi perpaduan nasional dengan kepelbagaian budaya melalui sukatan pelajaran sepunya dan pengekalan sekolah rendah vernakular.",
        topic: "Pendidikan Semasa Pendudukan Jepun dan Pasca-Perang",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Pendidikan rendah percuma untuk semua murid di Malaysia diperkenalkan secara rasmi berikutan syor daripada:",
        opts: [
          "Laporan Rahman Talib (1960)",
          "Laporan Barnes (1951)",
          "Rancangan Cheeseman (1946)",
          "Ordinan Pelajaran 1952"
        ],
        a: 0,
        exp: "Laporan Rahman Talib 1960 mengesyorkan pendidikan rendah percuma untuk semua murid sekolah bantuan kerajaan mulai tahun 1962.",
        topic: "Membina Identiti Nasional: Pembaharuan Pasca-Merdeka (1957–1979)",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Peralihan berperingkat sekolah aliran Inggeris kepada Bahasa Melayu bermula pada 1970 dan selesai pada 1982 dengan matlamat untuk:",
        opts: [
          "Memenuhi mandat perlembagaan menjadikan Bahasa Kebangsaan wahana perpaduan identiti nasional dan keharmonian sosial",
          "Menghalang pelajar Malaysia daripada melanjutkan pelajaran ke universiti luar negara",
          "Mengharamkan pengajian sains dan matematik sepenuhnya",
          "Mematuhi perjanjian kolonial dengan pihak Belanda pada tahun 1824"
        ],
        a: 0,
        exp: "Dasar Pendidikan Kebangsaan mengalihkan sekolah ke Bahasa Melayu untuk menyatukan generasi muda di bawah satu bahasa kebangsaan.",
        topic: "Membina Identiti Nasional: Pembaharuan Pasca-Merdeka (1957–1979)",
        difficulty: "medium",
        cognitive: "analysis"
      },
      {
        q: "Kurikulum manakah yang diperkenalkan pada 1982/1983 ekoran Laporan Jawatankuasa Kabinet Mahathir 1979 bagi menangani kelemahan literasi dan numerasi asas?",
        opts: [
          "KBSR (Kurikulum Bersepadu Sekolah Rendah)",
          "KSSR Semakan",
          "Kurikulum Menengah Cambridge",
          "Kurikulum Ekonomi Baru"
        ],
        a: 0,
        exp: "KBSR menumpukan kepada kemahiran asas 3M (Membaca, Menulis, Mengira) melalui pendekatan berpusatkan murid.",
        topic: "Pembaharuan dan Pemodenan: Era 1980-an hingga Awal 2000-an",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Falsafah Pendidikan Kebangsaan (FPK) memberi penekanan terhadap perkembangan potensi individu secara seimbang merentasi empat dimensi iaitu:",
        opts: [
          "Jasmani, Emosi, Rohani, dan Intelek (JERI)",
          "Membaca, Menulis, Mengira, dan Bertutur",
          "Sains, Teknologi, Perdagangan, dan Pertanian",
          "Undang-undang, Perubatan, Perakaunan, dan Kejuruteraan"
        ],
        a: 0,
        exp: "FPK bermatlamat melahirkan insan seimbang dan harmonis dari segi intelek, rohani, emosi dan jasmani berteraskan kepercayaan kepada Tuhan.",
        topic: "Pembaharuan dan Pemodenan: Era 1980-an hingga Awal 2000-an",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Di Mesir Purba, pendidikan akhlak dan keseimbangan kosmik dikawal oleh prinsip teras yang dikenali sebagai:",
        opts: [
          "Ma'at (kebenaran, keseimbangan, dan keadilan kosmik)",
          "Nippon-go",
          "Elenchus",
          "Pampaedia"
        ],
        a: 0,
        exp: "Pendidikan Mesir Purba bertujuan menyemai nilai Ma'at iaitu kebenaran, keadilan, dan ketertiban kosmik.",
        topic: "Akar Umbi & Asal Usul Pendidikan",
        difficulty: "medium",
        cognitive: "recall"
      },
      {
        q: "Apakah perbezaan asas antara Realisme Aristotle dan Idealisme Plato?",
        opts: [
          "Aristotle mengasaskan ilmu pada pemerhatian empirikal dunia fizikal, manakala Plato memandang realiti fizikal hanyalah bayang-bayang ilusi kepada bentuk idea abstrak",
          "Aristotle melarang sebarang senaman fizikal",
          "Plato menolak kewujudan jiwa manusia",
          "Aristotle merupakan seorang pendeta Mesir Purba"
        ],
        a: 0,
        exp: "Aristotle mempelopori realisme empirikal menerusi pancaindera, manakala Plato menekankan idealisme rasional terhadap bentuk kebenaran abadi.",
        topic: "Asas Klasik dan Falsafah Pendidikan",
        difficulty: "hard",
        cognitive: "analysis"
      },
      {
        q: "Friedrich Froebel mengasaskan institusi 'Tadika' (Kindergarten) berlandaskan prinsip bahawa kanak-kanak kecil:",
        opts: [
          "Berkembang secara semula jadi melalui aktiviti kendiri, permainan terancang, dan bahan deria dalam persekitaran penuh sokongan",
          "Perlu dilayan seperti pekerja kilang dewasa kerdil",
          "Wajib duduk diam di kerusi selama 8 jam tanpa bergerak",
          "Tidak boleh didedahkan kepada alam semula jadi atau tumbuh-tumbuhan"
        ],
        a: 0,
        exp: "Froebel mengibaratkan kanak-kanak seperti bunga di taman yang mekar melalui aktiviti bermain dan eksplorasi deria.",
        topic: "Pemikiran Pendidikan Merentas Zaman",
        difficulty: "easy",
        cognitive: "comprehension"
      },
      {
        q: "Aliran progresivisme pendidikan John Dewey mengkritik keras sistem persekolahan tradisional kerana:",
        opts: [
          "Menganggap pendidikan semata-mata sebagai persediaan untuk masa depan dewasa, bukannya proses kehidupan bermakna pada masa kini",
          "Memberikan kanak-kanak terlalu banyak kebebasan bersuara",
          "Menggunakan aktiviti makmal eksperimen berasaskan pengalaman",
          "Mengajarkan kemahiran vokasional praktikal"
        ],
        a: 0,
        exp: "Dewey menegaskan bahawa 'pendidikan bukan persediaan untuk hidup; pendidikan adalah kehidupan itu sendiri' melalui pembelajaran berasaskan pengalaman.",
        topic: "Pemikiran Pendidikan Merentas Zaman",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Mengapakah Enakmen Pendaftaran Sekolah 1920 diperkenalkan oleh kerajaan kolonial British di Tanah Melayu?",
        opts: [
          "Untuk memantau, memeriksa, dan menyekat penyebaran aktiviti politik anti-kolonial dalam kalangan sekolah vernakular Cina",
          "Untuk memberikan komputer riba percuma kepada murid",
          "Untuk membina universiti baharu di kawasan luar bandar",
          "Untuk mewajibkan Bahasa Melayu di sekolah Cina"
        ],
        a: 0,
        exp: "Enakmen 1920 memberi kuasa kepada pentadbiran British menutup sekolah yang menyebarkan doktrin politik anti-British atau pengaruh revolusi China.",
        topic: "Pendidikan Peribumi dan Era Kolonial di Tanah Melayu (Sebelum 1941)",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Maktab Melayu Kuala Kangsar (MCKK) yang ditubuhkan pada tahun 1905 diasaskan dengan objektif khusus untuk:",
        opts: [
          "Melatih anak-anak kerabat diraja dan bangsawan Melayu bagi memegang jawatan pentadbiran dalam perkhidmatan awam kolonial",
          "Mendidik anak-anak pekerja estet yang miskin",
          "Mengajarkan sastera klasik negara China",
          "Melatih pelayar angkatan tentera laut"
        ],
        a: 0,
        exp: "MCKK ditubuhkan sebagai 'Eton Melayu' untuk melatih golongan elit bangsawan Melayu memasuki Perkhidmatan Pentadbiran Melayu (MAS).",
        topic: "Pendidikan Peribumi dan Era Kolonial di Tanah Melayu (Sebelum 1941)",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Semasa zaman Pendudukan Jepun (1941–1945), lagu manakah yang wajib dinyanyikan setiap pagi sambil tunduk menghadap ke arah Istana Maharaja di Tokyo?",
        opts: [
          "Kimigayo",
          "God Save the King",
          "Negaraku",
          "Terang Bulan"
        ],
        a: 0,
        exp: "Lagu Kimigayo merupakan lagu kebangsaan Jepun yang wajib dinyanyikan setiap pagi semasa perhimpunan sekolah.",
        topic: "Pendidikan Semasa Pendudukan Jepun dan Pasca-Perang",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Laporan Barnes (1951) ditolak oleh masyarakat bukan Melayu terutamanya kerana syornya untuk:",
        opts: [
          "Memansuhkan sekolah rendah vernakular Cina dan Tamil demi mewujudkan satu jenis sekolah kebangsaan dwi-bahasa",
          "Mewajibkan semua mata pelajaran diajar dalam bahasa Belanda",
          "Mengharamkan aktiviti sukan di semua sekolah",
          "Menaikkan yuran tuisyen universiti sepuluh kali ganda"
        ],
        a: 0,
        exp: "Cadangan Barnes menghapuskan sekolah vernakular dilihat oleh masyarakat Cina dan India sebagai usaha asimilasi yang mengancam bahasa ibunda mereka.",
        topic: "Pendidikan Semasa Pendudukan Jepun dan Pasca-Perang",
        difficulty: "easy",
        cognitive: "comprehension"
      },
      {
        q: "Seksyen 21(2) dalam Akta Pelajaran 1961 menjadi pertikaian politik hangat di Malaysia kerana ia memberi kuasa kepada Menteri Pelajaran untuk:",
        opts: [
          "Menukar status Sekolah Jenis Kebangsaan kepada Sekolah Kebangsaan apabila difikirkan sesuai",
          "Menutup semua kolej swasta",
          "Memansuhkan kelayakan ijazah universiti",
          "Mengenakan perintah berkurung terhadap guru"
        ],
        a: 0,
        exp: "Seksyen 21(2) memberi kuasa budi bicara kepada Menteri untuk menukar SJK kepada SK, mencetuskan keresahan sehingga ia dimansuhkan dalam Akta 1996.",
        topic: "Membina Identiti Nasional: Pembaharuan Pasca-Merdeka (1957–1979)",
        difficulty: "hard",
        cognitive: "analysis"
      },
      {
        q: "Sistem Pendidikan Komprehensif 1965 memperluas peluang persekolahan menengah rendah dengan menyediakan mata pelajaran elektif pra-vokasional seperti:",
        opts: [
          "Seni Pertukangan Kayu, Logam, Sains Pertanian, dan Sains Rumah Tangga",
          "Astrofizik dan Kejuruteraan Nuklear",
          "Bahasa Yunani Kuno dan Ibrani",
          "Latihan Penerbangan Komersial"
        ],
        a: 0,
        exp: "Pendidikan komprehensif memperkenalkan mata pelajaran amali pra-vokasional untuk memperluas kemahiran hidup dan kerjaya murid.",
        topic: "Membina Identiti Nasional: Pembaharuan Pasca-Merdeka (1957–1979)",
        difficulty: "medium",
        cognitive: "recall"
      },
      {
        q: "Akta Pendidikan 1996 (Akta 550) merupakan perundangan mercu tanda kerana ia:",
        opts: [
          "Memaktubkan Falsafah Pendidikan Kebangsaan ke dalam statut perundangan serta mengawal selia pendidikan prasekolah dan institusi swasta",
          "Mengharamkan semua guru warga asing daripada mengajar di Malaysia",
          "Memansuhkan penggunaan Bahasa Melayu di mahkamah dan sekolah",
          "Menswastakan semua sekolah rendah kebangsaan"
        ],
        a: 0,
        exp: "Akta 1996 memansuhkan Akta 1961, memasukkan FPK ke dalam mukadimah perundangan, dan memodenkan sistem pendidikan kebangsaan secara menyeluruh.",
        topic: "Pembaharuan dan Pemodenan: Era 1980-an hingga Awal 2000-an",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Aplikasi perdana Koridor Raya Multimedia (MSC) yang memulakan era transformasi pendidikan digital di Malaysia ialah:",
        opts: [
          "Sekolah Bestari (Smart School)",
          "Sekolah Berasrama Penuh",
          "Sekolah Menengah Vokasional",
          "Sekolah Pondok Moden"
        ],
        a: 0,
        exp: "Sekolah Bestari dilancarkan pada tahun 1997 sebagai projek perdana MSC untuk membudayakan pembelajaran berbantukan teknologi dan kemahiran berfikir.",
        topic: "Pembaharuan dan Pemodenan: Era 1980-an hingga Awal 2000-an",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Berapakah bilangan Aspirasi Sistem yang digariskan dalam Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025)?",
        opts: [
          "5 (Akses, Kualiti, Ekuiti, Perpaduan, Kecekapan)",
          "3",
          "7",
          "11"
        ],
        a: 0,
        exp: "PPPM menggariskan 5 aspirasi sistem iaitu: Akses, Kualiti, Ekuiti, Perpaduan, dan Kecekapan.",
        topic: "Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025)",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Anjakan 2 dalam PPPM 2013–2025 memberi tumpuan khusus untuk memastikan setiap murid menguasai kemahiran dwibahasa dalam:",
        opts: [
          "Bahasa Melayu dan Bahasa Inggeris",
          "Bahasa Melayu dan Bahasa Perancis",
          "Bahasa Mandarin dan Bahasa Arab",
          "Bahasa Inggeris dan Bahasa Sepanyol"
        ],
        a: 0,
        exp: "Anjakan 2 bermatlamat memastikan setiap murid fasih dalam Bahasa Melayu sebagai bahasa kebangsaan dan Bahasa Inggeris sebagai bahasa komunikasi antarabangsa.",
        topic: "Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025)",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Penerapan soalan Kemahiran Berfikir Aras Tinggi (KBAT) dalam peperiksaan awam di bawah PPPM bertujuan untuk:",
        opts: [
          "Beralih daripada hafalan fakta kepada kemahiran analisis kritis, penyelesaian masalah, dan aplikasi inovatif",
          "Menjadikan soalan peperiksaan terlalu sukar agar bilangan graduan berkurangan",
          "Memastikan semua soalan dijawab dalam Bahasa Inggeris sahaja",
          "Menghapuskan format soalan aneka pilihan sepenuhnya"
        ],
        a: 0,
        exp: "KBAT melatih murid berfikir secara mendalam, menilai situasi kompleks, dan mengaplikasikan pengetahuan dalam senario dunia sebenar.",
        topic: "Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025)",
        difficulty: "easy",
        cognitive: "comprehension"
      },
      {
        q: "Teras 1 dalam pembaharuan kontemporari pendidikan Malaysia (2026 dan seterusnya) memberi tumpuan khusus kepada:",
        opts: [
          "Kurikulum diringkaskan berasaskan kompetensi serta pentaksiran bilik darjah yang autentik dan berterusan",
          "Menambah bilangan halaman buku teks melebihi 1,000 halaman setiap subjek",
          "Menambah empat lagi peperiksaan awam bertulis setiap tahun",
          "Mengharamkan sebarang tugasan kumpulan dalam kelas"
        ],
        a: 0,
        exp: "Teras 1 menangani kepadatan sukatan pelajaran (de-cluttering) bagi memberi ruang penguasaan kompetensi mendalam dan pentaksiran autentik.",
        topic: "Transformasi Pendidikan Kontemporari di Malaysia (2026 dan Seterusnya)",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Di bawah pembaharuan kontemporari, sistem pentaksiran bilik darjah berterusan di Malaysia dikenali sebagai:",
        opts: [
          "Pentaksiran Bilik Darjah (PBD)",
          "PISA",
          "TIMSS",
          "SPM Ulangan"
        ],
        a: 0,
        exp: "PBD merupakan kaedah pentaksiran formatif dan sumatif berterusan yang menilai perkembangan menyeluruh murid dalam bilik darjah.",
        topic: "Transformasi Pendidikan Kontemporari di Malaysia (2026 dan Seterusnya)",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Dalam pendidikan masyarakat prasejarah tanpa tulisan, bagaimanakah penceritaan lisan berfungsi sebagai wahana pedagogi?",
        opts: [
          "Mengekalkan memori sejarah puak, menyalurkan kosmologi budaya, dan memodelkan nilai moral melalui naratif lisan",
          "Digunakan semata-mata sebagai hiburan sebelum tidur tanpa tujuan pendidikan",
          "Dilarang sama sekali oleh ketua puak",
          "Hanya dipersembahkan sekali dalam tempoh satu abad"
        ],
        a: 0,
        exp: "Naratif lisan merupakan instrumen terpenting dalam menyalurkan nilai etika, salasilah keturunan, dan kemahiran kelangsungan hidup puak.",
        topic: "Akar Umbi & Asal Usul Pendidikan",
        difficulty: "easy",
        cognitive: "comprehension"
      },
      {
        q: "Prinsip Socrates 'Kehidupan yang tidak diperiksa tidak bernilai untuk dijalani' mendasari matlamat pendidikan abadi iaitu:",
        opts: [
          "Memupuk kesedaran diri reflektif, pemikiran kritis, dan inkuiri moral yang rasional",
          "Memaksimumkan kecergasan fizikal sukan melebihi segalanya",
          "Mengumpul harta kekayaan dan kedudukan sosial yang tinggi",
          "Menerima dogma kepercayaan tanpa sebarang persoalan"
        ],
        a: 0,
        exp: "Socrates menegaskan bahawa pendidikan hakiki adalah proses pemeriksaan moral diri secara berterusan melalui pemikiran kritis.",
        topic: "Asas Klasik dan Falsafah Pendidikan",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Dalam 'The Republic', Alegori Gua Plato yang masyhur menggambarkan hakikat bahawa:",
        opts: [
          "Persepsi pancaindera semata-mata adalah terhad dan mengelirukan; pengetahuan sebenar lahir daripada pencerahan falsafah terhadap kebenaran hakiki",
          "Tinggal di dalam gua bawah tanah lebih sihat daripada tinggal di bandar",
          "Hanya tawanan penjara yang mampu memahami matematik tinggi",
          "Cahaya matahari membahayakan otak manusia"
        ],
        a: 0,
        exp: "Alegori Gua melambangkan perjalanan jiwa daripada kegelapan ilusi pancaindera menuju cahaya kebenaran mutlak (Form of the Good).",
        topic: "Asas Klasik dan Falsafah Pendidikan",
        difficulty: "hard",
        cognitive: "analysis"
      },
      {
        q: "Konsep 'Al-Insan Al-Kamil' oleh Al-Farabi menegaskan bahawa individu yang benar-benar berpendidikan mestilah menggabungkan:",
        opts: [
          "Kecemerlangan intelek dengan kemuliaan akhlak dan nilai kerohanian",
          "Kemahiran tempur tentera dengan perakaunan perniagaan",
          "Penguasaan bahasa asing dengan kemahiran muzik sahaja",
          "Kebijaksanaan matematik dengan kezaliman politik"
        ],
        a: 0,
        exp: "Al-Farabi menegaskan bahawa kecerdasan intelek tanpa keluhuran akhlak dan rohani hanya akan mendatangkan kemudaratan kepada masyarakat.",
        topic: "Pemikiran Pendidikan Merentas Zaman",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Pembaharu pendidikan dari Switzerland pada abad ke-18 yang merevolusikan pendidikan berpusatkan murid melalui moto 'Kepala, Tangan, dan Hati' ialah:",
        opts: [
          "Johann Heinrich Pestalozzi",
          "Friedrich Froebel",
          "John Locke",
          "Jean-Jacques Rousseau"
        ],
        a: 0,
        exp: "Pestalozzi menekankan perkembangan seimbang antara aspek intelek (kepala), kemahiran praktikal (tangan), dan moraliti kasih sayang (hati).",
        topic: "Pemikiran Pendidikan Merentas Zaman",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Di bawah Kod Buruh British 1923, pemilik ladang getah di Tanah Melayu diwajibkan oleh undang-undang untuk:",
        opts: [
          "Menyediakan dan menyelenggara sekolah vernakular asas sekiranya terdapat 10 atau lebih kanak-kanak umur persekolahan di ladang tersebut",
          "Menghantar semua anak pekerja estet ke universiti di London",
          "Membayar gaji guru setaraf dengan pegawai tertinggi pentadbiran kolonial",
          "Menyediakan kelas tuisyen kejuruteraan secara percuma"
        ],
        a: 0,
        exp: "Kod Buruh 1923 mewajibkan pengurusan estet menyediakan kemudahan sekolah Tamil asas sekiranya terdapat sekurang-kurangnya 10 orang kanak-kanak.",
        topic: "Pendidikan Peribumi dan Era Kolonial di Tanah Melayu (Sebelum 1941)",
        difficulty: "medium",
        cognitive: "recall"
      },
      {
        q: "Apakah anjakan sosiopolitik terbesar yang berlaku sejurus selepas tamatnya Pendudukan Jepun pada tahun 1945?",
        opts: [
          "Mitos keunggulan kuasa penjajah Barat musnah sepenuhnya, mencetuskan kebangkitan gerakan nasionalisme tempatan menuntut kemerdekaan",
          "Seluruh penduduk menuntut untuk kekal menjadi tanah jajahan selama-lamanya",
          "Sekolah-sekolah berhenti mengajar Bahasa Melayu dan Bahasa Inggeris secara kekal",
          "Semua institusi pendidikan dipindahkan ke Singapura"
        ],
        a: 0,
        exp: "Kekalahan British kepada tentera Jepun menghapuskan tanggapan bahawa penjajah tidak boleh dikalahkan, membakar semangat kemerdekaan rakyat.",
        topic: "Pendidikan Semasa Pendudukan Jepun dan Pasca-Perang",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Laporan Fenn-Wu (1951) memberi sumbangan penting dalam wacana pendidikan pasca-perang kerana ia:",
        opts: [
          "Menegaskan bahawa sekolah vernakular Cina boleh memupuk kesetiaan kepada Tanah Melayu tanpa perlu mengorbankan warisan bahasa dan budaya mereka",
          "Menuntut agar semua sekolah di Tanah Melayu diajar dalam bahasa Mandarin klasik sahaja",
          "Mengesyorkan penutupan semua sekolah aliran Inggeris",
          "Menasihati pihak berkuasa British agar menghapuskan semua peperiksaan"
        ],
        a: 0,
        exp: "Dr. Fenn dan Dr. Wu membuktikan bahawa kesetiaan nasional dan pemeliharaan bahasa ibunda adalah serasi melalui pendekatan pelbagai bahasa.",
        topic: "Pendidikan Semasa Pendudukan Jepun dan Pasca-Perang",
        difficulty: "hard",
        cognitive: "analysis"
      },
      {
        q: "Pengenalan Rukunegara pada tahun 1970 mempengaruhi sistem pendidikan di Malaysia melalui cara:",
        opts: [
          "Menerapkan nilai sepunya perpaduan, kedaulatan undang-undang, keluhuran perlembagaan, dan kesetiaan kepada Raja dan Negara ke dalam kurikulum",
          "Memansuhkan semua mata pelajaran pendidikan agama dan moral",
          "Menggantikan pakaian seragam sekolah dengan pakaian tradisional sahaja",
          "Membatalkan semua peperiksaan awam selama satu dekad"
        ],
        a: 0,
        exp: "Rukunegara menjadi kompas ideologi kebangsaan yang membentuk falsafah, etika, dan kurikulum persekolahan pasca peristiwa 13 Mei 1969.",
        topic: "Membina Identiti Nasional: Pembaharuan Pasca-Merdeka (1957–1979)",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Dalam kurikulum sekolah menengah di Malaysia, KBSM memperkenalkan mata pelajaran 'Kemahiran Hidup Bersepadu' (KHB) bertujuan untuk:",
        opts: [
          "Membekalkan murid dengan kemahiran praktikal harian, teknologi asas, keusahawanan, dan pengurusan rumah tangga",
          "Menyediakan pelajar semata-mata untuk latihan peperangan tentera",
          "Menggantikan pengajaran subjek sains dan matematik",
          "Mengajarkan seni bina Yunani kuno"
        ],
        a: 0,
        exp: "Kemahiran Hidup Bersepadu memberikan kemahiran amali dan nilai keusahawanan yang relevan untuk kegunaan seharian murid.",
        topic: "Pembaharuan dan Pemodenan: Era 1980-an hingga Awal 2000-an",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Pentaksiran antarabangsa manakah yang mendorong penggubalan Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025) ekoran penurunan prestasi murid?",
        opts: [
          "TIMSS (Trends in International Mathematics and Science Study) dan PISA (Programme for International Student Assessment)",
          "SAT dan GRE",
          "IELTS dan TOEFL",
          "TOEIC dan GMAT"
        ],
        a: 0,
        exp: "Keputusan TIMSS dan PISA yang merosot menyedarkan pembuat dasar untuk melaksanakan pembaharuan sistemik menerusi PPPM.",
        topic: "Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025)",
        difficulty: "easy",
        cognitive: "recall"
      },
      {
        q: "Apakah peranan utama Pejabat Pendidikan Daerah (PPD) di bawah Anjakan 6 dalam PPPM 2013–2025?",
        opts: [
          "Bertindak sebagai rakan pembimbing yang menyediakan bimbingan khusus, intervensi berasaskan data, dan sokongan kepada sekolah di daerah mereka",
          "Menghukum guru secara ketat tanpa melawat bilik darjah",
          "Menjual pakaian seragam sekolah secara terus kepada murid",
          "Mengambil alih tugas pengetua dalam menyusun jadual waktu harian"
        ],
        a: 0,
        exp: "Anjakan 6 mengupayakan PPD daripada pentadbir birokrasi kepada rakan pembimbing instruksional (School Improvement Specialist Coaches - SISC+).",
        topic: "Pelan Pembangunan Pendidikan Malaysia (PPPM 2013–2025)",
        difficulty: "medium",
        cognitive: "comprehension"
      },
      {
        q: "Pembaharuan pendidikan kontemporari (2026 dan seterusnya) memberi penekanan kepada 'Pembelajaran Sosioemosi' (SEL) bertujuan untuk:",
        opts: [
          "Memupuk kesedaran kendiri, kawalan emosi, empati, dan kemahiran hubungan interpersonal yang penting bagi kesejahteraan hidup",
          "Memastikan murid mendapat markah 100% dalam peperiksaan hafalan sejarah",
          "Menggantikan semua mata pelajaran akademik dengan senaman gimnasium harian",
          "Menghalang murid daripada berkawan di dalam kelas"
        ],
        a: 0,
        exp: "Pembelajaran Sosioemosi membina daya tahan psikologi, keseimbangan emosi, empati, dan kemahiran kolaborasi murid.",
        topic: "Transformasi Pendidikan Kontemporari di Malaysia (2026 dan Seterusnya)",
        difficulty: "easy",
        cognitive: "comprehension"
      }
    ]
  }
];

module.exports = { flashcards1303, questionSet1303 };
