# scripts/gen_hpgd1303.py
# Generates notes, quizzes, flashcards, and mock exam questions for HPGD1303
import json

notes = [
    {
        "title": "The Roots of Education",
        "keywords": "Cultural transmission, oral traditions, informal learning, Mesopotamia, Ancient Egypt, Gurukula system, Confucian education.",
        "sections": [
            {
                "h": "1.1 Education as Cultural Transmission",
                "text": "1.1 Education as Cultural Transmission\n\n⭐ Key Concept\nLong before formal schooling, classrooms, or textbooks existed, education functioned as a natural process of cultural transmission. In early societies, education served three primary survival imperatives:\n1. Learning for Survival: Mastering hunting, gathering, tool-making, shelter building, and physical endurance.\n2. Transmission of Values and Beliefs: Preserving tribal customs, rituals, moral codes, and religious taboos.\n3. Socialisation and Identity Formation: Inculcating social cohesion, gender roles, kinship obligations, and communal solidarity."
            },
            {
                "h": "1.2 Oral Traditions and Informal Learning",
                "text": "1.2 Oral Traditions and Informal Learning\n\n🗣️ Modes of Pre-Literate Education\n- Storytelling as Education: Elders used folklore, myths, and legends to teach history, morality, and cosmology without written scripts.\n- Apprenticeship & Learning by Doing: Practical crafts, hunting, and herbal medicine learned through direct observation, imitation, and participatory practice alongside master craftspeople.\n- Communal Learning: The entire community acted as educators ('it takes a village to raise a child')."
            },
            {
                "h": "1.3 Early Civilisations: The Institutionalisation of Education",
                "text": "1.3 Early Civilisations: The Institutionalisation of Education\n\n🏛️ Shift from Informal to Formal Schooling\n- The Invention of Writing: The emergence of cuneiform in Mesopotamia (c. 3200 BCE) and hieroglyphics in Egypt made literacy indispensable for state administration, tax collection, and astronomy.\n- Mesopotamia (The Edubba): The 'tablet house' trained young male scribes in cuneiform writing, arithmetic, and accounting under strict discipline.\n- Ancient Egypt: Temple and court scribal schools emphasised moral order (Ma'at), calligraphy, religious literature, and administrative record-keeping.\n- Ancient India (Gurukula System): Students lived with their guru in a forest hermitage, studying the sacred Vedas, philosophy, astronomy, and grammar with deep guru-shishya reverence.\n- Ancient China: Confucian education prioritised filial piety (Xiao), moral benevolence (Ren), the Five Classics, and civil service examinations (Keju) which promoted meritocratic social mobility."
            }
        ],
        "fokus": "Exam Focus: Core functions of education in early societies, the impact of writing on the birth of formal schools (edubba, scribal schools), the Gurukula system, and Confucian civil service examinations.",
        "summary": "📋 Topic 1 Summary:\n- Education originated as informal cultural transmission and apprenticeship for survival.\n- The invention of writing institutionalised formal schools in Mesopotamia and Egypt to train scribes.\n- India's Gurukula system and China's Confucian examinations laid enduring ethical and meritocratic educational foundations."
    },
    {
        "title": "Classical and Philosophical Foundations of Education",
        "keywords": "Socrates, elenchus, Plato, The Republic, Aristotle, Golden Mean, Roman education, Humanitas, National Education Philosophy.",
        "sections": [
            {
                "h": "2.1 Socratic Philosophy: Education Through Inquiry",
                "text": "2.1 Socratic Philosophy: Education Through Inquiry\n\n💡 The Socratic Method (Elenchus)\n- Socrates (469–399 BCE) rejected passive rote memorisation; proposed that knowledge resides within the soul and must be drawn out through dialectical questioning.\n- Examined life: 'The unexamined life is not worth living.' Cultivated critical thinking, ethical self-examination, and questioning dogmatic assumptions."
            },
            {
                "h": "2.2 Plato's Idealism and The Republic",
                "text": "2.2 Plato's Idealism and The Republic\n\n🏛️ Education for an Ideal Just Society\n- The Allegory of the Cave: The transition from the shadowy illusion of sensory experience to the illumination of intellectual truth (the Form of the Good).\n- Three classes in the ideal state: Guardians (Philosopher-Kings guided by Wisdom), Auxiliaries (Soldiers guided by Courage), and Producers (Workers guided by Temperance).\n- State-controlled universal education: Equal opportunity for boys and girls to be tested and filtered into roles according to intellectual and moral merit."
            },
            {
                "h": "2.3 Aristotle's Realism and Roman Humanitas",
                "text": "2.3 Aristotle's Realism and Roman Humanitas\n\n📐 Empirical Observation & Practical Virtue\n- Aristotle: Knowledge originates in sensory experience of the physical world (Realism); education cultivates moral character through habit formation and the 'Golden Mean' (moderation between extremes).\n- Roman Education (Cicero & Quintilian): Adapted Greek Paideia into Roman Humanitas — training the ideal orator who is both eloquent and ethically virtuous ('the good man speaking well').\n- Legacy: Directly inspires the holistic Malaysian National Philosophy of Education (FPK) balancing intellectual, physical, emotional, and spiritual development."
            }
        ],
        "fokus": "Exam Focus: Socratic questioning (elenchus), Plato's Republic (Allegory of the Cave, Philosopher-Kings), Aristotle's Golden Mean, Roman Humanitas (Quintilian), and their reflection in the Malaysian FPK.",
        "summary": "📋 Topic 2 Summary:\n- Socrates championed inquiry-based dialectical learning.\n- Plato proposed a meritocratic, state-led educational system serving justice and truth.\n- Aristotle grounded learning in empirical realism and habituated moral virtue.\n- Rome synthesised Greek theory into practical civic eloquence (Humanitas)."
    },
    {
        "title": "Educational Thought Through the Ages",
        "keywords": "Al-Farabi, Ibn Sina, Al-Ghazali, Ibn Khaldun, Renaissance, Comenius, Pestalozzi, Froebel, John Dewey, Paulo Freire.",
        "sections": [
            {
                "h": "3.1 Islamic Contributions to Educational Thought",
                "text": "3.1 Islamic Contributions to Educational Thought\n\n🕌 The Golden Age of Islamic Scholarship\n- Al-Farabi (872–950): Synthesised Aristotelian philosophy with Islamic thought; education aims to develop the 'perfect human' (Al-Insan Al-Kamil) combining intellectual virtue with moral righteousness.\n- Ibn Sina / Avicenna (980–1037): The Canon of Medicine; emphasised early childhood education, tailoring instruction to a child's natural talents, and holistic balance.\n- Al-Ghazali (1058–1111): Ayyuha al-Walad (O Youth!); emphasised spiritual purification, moral conduct, and integrating knowledge with righteous action.\n- Ibn Khaldun (1332–1406): The Muqaddimah; pioneer of educational sociology; advocated gradual learning (from simple to complex), avoiding harsh punishment, and practical vocational training."
            },
            {
                "h": "3.2 Renaissance Humanism and 17th Century Realism",
                "text": "3.2 Renaissance Humanism and 17th Century Realism\n\n🌍 Revival of Learning & Universal Education\n- Renaissance Humanism (Erasmus, Petrarch): Revived classical humanities (literature, history, languages) to cultivate free, civic-minded individuals.\n- John Amos Comenius (1592–1670): 'Father of Modern Education'; Didactica Magna (The Great Didactic); advocated universal education for all ('pampaedia'), sensory learning, and created Orbis Sensualium Pictus (the first illustrated children's textbook)."
            },
            {
                "h": "3.3 19th and 20th Century Pioneers",
                "text": "3.3 19th and 20th Century Pioneers\n\n⚡ Modern Pedagogical Foundations\n- Johann Heinrich Pestalozzi (1746–1827): Educating the 'Head, Heart, and Hands' in a nurturing, home-like environment.\n- Friedrich Froebel (1782–1852): Founded the Kindergarten ('children's garden'); pioneered play-based learning and self-activity.\n- John Dewey (1859–1952): Pragmatism & Progressivism; 'learning by doing', democratic classrooms, and education as life itself, not mere preparation for future life.\n- Paulo Freire (1921–1997): Pedagogy of the Oppressed; rejected the oppressive 'banking concept' of education; championed dialogical problem-posing education and critical consciousness (conscientização)."
            }
        ],
        "fokus": "Exam Focus: Islamic scholars (Al-Farabi, Ibn Sina, Al-Ghazali, Ibn Khaldun), Comenius's Didactica Magna, Pestalozzi (Head, Heart, Hands), Froebel (Kindergarten), Dewey's experiential progressivism, and Freire's critical pedagogy.",
        "summary": "📋 Topic 3 Summary:\n- Islamic golden age scholars integrated spiritual ethics with rigorous scientific and sociological inquiry.\n- Comenius laid the groundwork for universal, structured, visual education.\n- Pestalozzi, Froebel, and Dewey shifted pedagogical focus toward the active, whole child.\n- Freire introduced transformative critical consciousness against passive rote schooling."
    },
    {
        "title": "Indigenous and Colonial Beginnings of Education in Malaya (Before 1941)",
        "keywords": "Indigenous education, pondok, madrasah, British colonial policy, divide and rule, vernacular schools, English schools, Penang Free School, MCKK.",
        "sections": [
            {
                "h": "4.1 Pre-Colonial Indigenous Education",
                "text": "4.1 Pre-Colonial Indigenous Education\n\n🌴 Community-Based and Religious Learning\n- Informal Learning: Transmission of agricultural skills, fishing, craftmanship, customs (Adat), and moral proverbs within village communities (kampung).\n- Islamic Religious Education: Quranic classes at homes/surau, evolving into the formal Pondok and Madrasah systems in Kedah, Kelantan, and Terengganu focusing on theology (Tauhid), jurisprudence (Fiqh), and Arabic."
            },
            {
                "h": "4.2 The British Colonial Framework (1824–1941)",
                "text": "4.2 The British Colonial Framework (1824–1941)\n\n⚖️ Laissez-Faire and 'Divide and Rule'\n- Following the Anglo-Dutch Treaty of 1824, British colonial administration adopted a laissez-faire policy toward social services.\n- Maintained ethnic division to prevent collective anti-colonial mobilisation ('divide and rule').\n- Established four separate, uncoordinated vernacular school systems divided by language, curriculum, and socio-economic destination."
            },
            {
                "h": "4.3 The Four Vernacular Schooling Streams",
                "text": "4.3 The Four Vernacular Schooling Streams\n\n🏫 Segregated Colonial Streams\n1. Malay Vernacular Schools: Government-funded but intentionally restricted to 4–5 years of basic literacy, numeracy, and gardening to keep Malays as peasant farmers and fishermen (Winstedt's rural bias policy). Sultan Idris Training College (SITC, 1922) became an unexpected crucible for Malay nationalist intellectual awakening.\n2. Chinese Vernacular Schools: Entirely funded and managed by Chinese clan associations and merchants. Imported textbooks and teachers from China; strongly influenced by political developments in China. Registration of Schools Ordinance 1920 introduced British surveillance.\n3. Tamil Vernacular Schools: Established on rubber estates under the Labour Code 1923. Poor infrastructure, single-teacher classrooms, high dropout rates; confined Indian labourers to estate economy.\n4. English-Medium Schools: Elite schools located in urban centres (Penang Free School 1816, Malacca Free School, Victoria Institution). Attended by British children and wealthy Malay, Chinese, and Indian elites. Provided access to colonial civil service and higher education. Malay College Kuala Kangsar (MCKK, 1905) trained traditional Malay aristocrats for colonial administration."
            }
        ],
        "fokus": "Exam Focus: The structural consequences of the four segregated colonial education streams, the 'divide and rule' policy, the role of SITC in Malay nationalism, and Furnivall's plural society theory.",
        "summary": "📋 Topic 4 Summary:\n- Pre-colonial education was rooted in informal village apprenticeship and pondok Islamic schooling.\n- British colonial policy fostered four distinct, segregated education streams.\n- This institutionalised socio-economic disparities and ethnic segmentation without a shared national identity."
    },
    {
        "title": "Education During the Japanese Occupation and Early Post-War Era",
        "keywords": "Japanese occupation, Nippon-go, Cheeseman Plan, Barnes Report 1951, Fenn-Wu Report 1951, Education Ordinance 1952, Razak Report 1956.",
        "sections": [
            {
                "h": "5.1 Education Under the Japanese Occupation (1941–1945)",
                "text": "5.1 Education Under the Japanese Occupation (1941–1945)\n\n🇯🇵 Nipponisation and Disruption\n- Total disruption of British colonial schools. English and Chinese schools banned or repurposed.\n- Compulsory learning of Japanese language (Nippon-go) and culture.\n- Morning assemblies: Singing Kimigayo, bowing to the Emperor (Tenno Heika), radio calisthenics (Rajio Taiso).\n- Emphasis on manual labour, discipline, and technical training.\n- Socio-political impact: Demolished the myth of European colonial invincibility; stimulated intense anti-colonial political consciousness."
            },
            {
                "h": "5.2 Post-War Reconstruction & The Barnes vs Fenn-Wu Controversy",
                "text": "5.2 Post-War Reconstruction & The Barnes vs Fenn-Wu Controversy\n\n📑 Conflicting Blueprints for National Unity (1951)\n- Cheeseman Plan (1946): Proposed free primary education in all four languages; failed due to financial constraints and Malayan Union opposition.\n- Barnes Report (1951): Chaired by L.J. Barnes. Proposed a single 'National School' system using only Malay and English, abolishing separate Chinese and Tamil vernacular schools. Strongly welcomed by Malays; vehemently opposed by Chinese and Indian communities who saw it as cultural assimilation.\n- Fenn-Wu Report (1951): Commissioned by British to investigate Chinese education (Dr. William Fenn & Dr. Wu Teh-yao). Defended the preservation of Chinese mother-tongue education while supporting Malay as the national language (trilingual model)."
            },
            {
                "h": "5.3 The Historic Razak Report (1956)",
                "text": "5.3 The Historic Razak Report (1956)\n\n🏛️ Foundation Stone of Malaysian National Education\n- Chaired by Education Minister Tun Abdul Razak Hussein on the eve of Merdeka.\n- Core Objective: Establish a national education system acceptable to all communities to foster national unity, while preserving the languages and cultures of non-Malay ethnic groups.\n- Landmark Recommendations:\n  * Malay as the National Language and main medium of instruction in secondary schools.\n  * Common content national curriculum and syllabi for all schools.\n  * Two categories of primary schools: National Schools (Sekolah Kebangsaan - Malay medium) and National-Type Schools (Sekolah Jenis Kebangsaan - Mandarin or Tamil medium).\n  * Standardised teacher training and unified teaching service."
            }
        ],
        "fokus": "Exam Focus: Comparison of the Barnes Report (1951), Fenn-Wu Report (1951), and the historic compromise of the Razak Report (1956) as the master blueprint of Malaysian education.",
        "summary": "📋 Topic 5 Summary:\n- Japanese occupation dismantled colonial schooling and ignited nationalist consciousness.\n- The Barnes Report's assimilationist single-school proposal triggered strong ethnic resistance.\n- The Razak Report (1956) achieved a historic consensus: national unity through a common curriculum, Malay as national language, while preserving vernacular primary schools."
    },
    {
        "title": "Building a National Identity: Post-Independence Reforms (1957–1979)",
        "keywords": "Rahman Talib Report 1960, Education Act 1961, comprehensive education 1965, National Education Policy, Mahathir Cabinet Committee 1979, 3M.",
        "sections": [
            {
                "h": "6.1 The Rahman Talib Report (1960) and Education Act 1961",
                "text": "6.1 The Rahman Talib Report (1960) and Education Act 1961\n\n📜 Legal Codification of the National System\n- Rahman Talib Report (1960): Reviewed the Razak Report recommendations. Key measures:\n  * Universal free primary education introduced in 1962.\n  * Automatic promotion up to Form 3.\n  * All public secondary examinations (LCE, MCE) conducted only in Malay or English.\n  * Secondary schools required to convert to national medium to receive full government grants.\n- Education Act 1961: Passed by Parliament, cementing these policies into statutory law (infamous Section 21(2) gave Minister power to convert National-Type primary schools)."
            },
            {
                "h": "6.2 Curriculum Reforms & The National Education Policy (1970–1979)",
                "text": "6.2 Curriculum Reforms & The National Education Policy (1970–1979)\n\n🇲🇾 Bahasa Melayu as Universal Medium\n- Comprehensive Education System (1965): Abolished the 11-plus selection exam (MSSEE), expanding secondary schooling access to age 15 with pre-vocational electives (woodwork, metalwork, agriculture, home science).\n- Following May 13, 1969: Education aligned with the Rukunegara and New Economic Policy (NEP) to eradicate poverty and restructure society.\n- Phased transition (1970–1982): English-medium schools gradually converted to Bahasa Melayu, starting from Standard 1 in 1970 to Upper Six in 1982. UKM established in 1970 as premier Malay-medium university."
            },
            {
                "h": "6.3 The Mahathir Cabinet Committee Report (1979)",
                "text": "6.3 The Mahathir Cabinet Committee Report (1979)\n\n🔍 Return to Basics (3M) and Moral Education\n- Chaired by Deputy Prime Minister Dr. Mahathir Mohamad.\n- Found curricula overly content-heavy and examination-focused with weak basic skills among rural students.\n- Recommended restructuring primary education around basic skills (3M: Membaca, Menulis, Mengira) and compulsory Islamic/Moral education, directly leading to the birth of KBSR."
            }
        ],
        "fokus": "Exam Focus: The Rahman Talib Report 1960, Education Act 1961, phased conversion of English schools to Bahasa Melayu (1970–1982), and the Mahathir Cabinet Report 1979 introducing 3M.",
        "summary": "📋 Topic 6 Summary:\n- The Rahman Talib Report and Education Act 1961 legally anchored the national education structure.\n- Between 1970 and 1982, Bahasa Melayu became the primary medium of instruction in all national secondary schools.\n- The 1979 Cabinet Committee Report shifted focus back to basic 3M competencies and character education, paving the way for KBSR."
    },
    {
        "title": "Reform and Modernisation: From the 1980s to Early 2000s",
        "keywords": "KBSR, KBSM, Falsafah Pendidikan Kebangsaan (FPK), Education Act 1996, Smart School, TVET, PPSMI.",
        "sections": [
            {
                "h": "7.1 KBSR, KBSM and the National Philosophy of Education",
                "text": "7.1 KBSR, KBSM and the National Philosophy of Education\n\n🌱 Integrated Holistic Curriculum\n- KBSR (Kurikulum Bersepadu Sekolah Rendah, 1982/83): Integrated curriculum focusing on child-centred 3M learning and student-active pedagogy.\n- KBSM (Kurikulum Bersepadu Sekolah Menengah, 1988/89): Continuation at secondary level, integrating values, language across the curriculum, and life skills (Kemahiran Hidup).\n- Falsafah Pendidikan Kebangsaan (FPK, 1988/1996): Explicitly formulated the ultimate goal of Malaysian education: developing the potential of individuals in a holistic and integrated manner across four dimensions — Jasmani (Physical), Emosi (Emotional), Rohani (Spiritual), and Intelek (Intellectual) — based on firm belief in God (JERI)."
            },
            {
                "h": "7.2 Legislative Overhaul: The Education Act 1996 (Act 550)",
                "text": "7.2 Legislative Overhaul: The Education Act 1996 (Act 550)\n\n🏛️ Modernising Legal Framework\n- Repealed the 1961 Act. Incorporated the FPK into the preamble.\n- Section 21(2) repealed, reassuring vernacular primary schools of their continued existence.\n- Regulated and integrated pre-school education into the national framework.\n- Parallel legislation: Private Higher Educational Institutions Act 1996 (Act 555) and LAN (now MQA) Act, catalysing Malaysia's emergence as an international higher education hub."
            },
            {
                "h": "7.3 Technology & Science: Smart Schools and PPSMI",
                "text": "7.3 Technology & Science: Smart Schools and PPSMI\n\n💻 ICT Transformation & Language Shifts\n- Smart School Initiative (Sekolah Bestari, 1997): Flagship Multimedia Super Corridor (MSC) application to transition from memory-based learning to thinking, technology-enabled learning.\n- PPSMI (2003): Teaching of Science and Mathematics in English to enhance global economic competitiveness; later phased out and replaced by MBMMBI in 2012 due to rural learning challenges."
            }
        ],
        "fokus": "Exam Focus: Core pillars of FPK (JERI), key features of KBSR and KBSM, the major advancements in the Education Act 1996, and the objectives of the Smart School initiative.",
        "summary": "📋 Topic 7 Summary:\n- The 1980s introduced KBSR, KBSM, and the foundational National Philosophy of Education (FPK).\n- The Education Act 1996 unified the national educational framework while accommodating private and pre-school sectors.\n- The Smart School initiative and ICT investments pioneered Malaysia's digital learning transformation."
    },
    {
        "title": "The Malaysian Education Blueprint (PPPM 2013–2025)",
        "keywords": "PPPM 2013-2025, 5 system aspirations, 6 student aspirations, 11 strategic shifts, 3 waves, MBMMBI, KSSR, KSSM, TIMSS, PISA.",
        "sections": [
            {
                "h": "8.1 Strategic Framework of PPPM 2013–2025",
                "text": "8.1 Strategic Framework of PPPM 2013–2025\n\n🎯 5 System Aspirations & 6 Student Aspirations\n- Developed in response to international benchmarking (TIMSS, PISA) showing stagnation in student performance.\n- 5 System Aspirations:\n  1. Access (100% enrolment from pre-school to upper secondary).\n  2. Quality (Top third of countries in international assessments within 15 years).\n  3. Equity (50% reduction in achievement gaps: urban-rural, socio-economic, gender).\n  4. Unity (Schools as shared spaces fostering national cohesion).\n  5. Efficiency (Maximising student outcomes within available government budgets).\n- 6 Student Aspirations:\n  Knowledge, Thinking Skills (KBAT/HOTS), Leadership Skills, Bilingual Proficiency, Ethics & Spirituality, National Identity."
            },
            {
                "h": "8.2 The 11 Strategic Shifts & 3 Waves",
                "text": "8.2 The 11 Strategic Shifts & 3 Waves\n\n🚀 Roadmap for Systemic Transformation\n- Shift 1: Provide equal access to quality education of an international standard (revamped KSSR & KSSM with 40% KBAT items).\n- Shift 2: Ensure every child is proficient in Bahasa Melayu and English (MBMMBI, CEFR alignment).\n- Shift 3: Develop values-driven Malaysians.\n- Shift 4: Transform teaching into a profession of choice (higher entry requirements, CPD).\n- Shift 5: Ensure high-performing school leaders in every school.\n- Shift 6: Empower JPNs, PPDs, and schools to tailor solutions based on need.\n- Shift 7: Leverage ICT to scale up quality learning across Malaysia.\n- Shift 8: Transform Ministry delivery capabilities and capacity (PADU).\n- Shift 9: Partner with parents, community, and private sector.\n- Shift 10: Maximise student outcomes for every ringgit.\n- Shift 11: Increase transparency for direct public accountability.\n\nThree Waves:\n- Wave 1 (2013–2015): Turn around system by supporting teachers and focusing on core skills.\n- Wave 2 (2016–2020): Accelerate system improvement, structural curriculum upgrades.\n- Wave 3 (2021–2025): Move towards excellence, operational school flexibility."
            }
        ],
        "fokus": "Exam Focus: 5 System Aspirations, 6 Student Aspirations, key shifts (Shift 1, 2, 4, 7), and the 3 implementation waves of the Blueprint.",
        "summary": "📋 Topic 8 Summary:\n- PPPM 2013–2025 constitutes the most comprehensive roadmap in Malaysian educational history.\n- Built on 5 system aspirations, 6 student competencies, and 11 strategic shifts.\n- Emphasises 21st-century higher-order thinking skills (KBAT), bilingual proficiency, and digital capability."
    },
    {
        "title": "Contemporary Educational Transformation in Malaysia (2026 Onwards)",
        "keywords": "Malaysia Education Plan 2026-2035, competency-based curriculum, authentic assessment, AI in education, teacher empowerment, student wellbeing.",
        "sections": [
            {
                "h": "9.1 Post-2025 Context & Malaysia Education Plan 2026–2035",
                "text": "9.1 Post-2025 Context & Malaysia Education Plan 2026–2035\n\n🔮 Future-Ready Learning Paradigm\n- Succeeding the PPPM 2013–2025, the new 10-year education plan addresses accelerated digital transformation (AI, big data), post-pandemic learning recovery, socio-emotional wellbeing, and workforce disruption.\n- Vision: Fostering agile, resilient, socially responsible, and globally competent lifelong learners."
            },
            {
                "h": "9.2 Four Pillars of Contemporary Reform",
                "text": "9.2 Four Pillars of Contemporary Reform\n\n🏛️ Teras Pembaharuan Kontemporari\n1. Pillar 1: A De-cluttered, Competency-Based Curriculum and Authentic Assessment\n   - Streamlining syllabus bloat to deepen mastery rather than superficial memorisation.\n   - Moving decisively away from high-stakes exam orientation toward continuous classroom-based assessment (PBD) and authentic portfolio demonstrations.\n2. Pillar 2: The Educator as an Empowered Professional and Learning Designer\n   - Reducing non-teaching clerical burdens; elevating teachers from curriculum deliverers to autonomous designers of adaptive learning experiences.\n3. Pillar 3: An Intelligent, Human-Centric Digital Learning Ecosystem\n   - Responsible integration of Generative AI, adaptive learning platforms, and digital equity for rural and marginalised students.\n4. Pillar 4: Holistic Student Development and Wellbeing as a Core Priority\n   - Systematic embedding of mental health literacy, social-emotional learning (SEL), character resilience, and physical wellness."
            }
        ],
        "fokus": "Exam Focus: The 4 core pillars of the 2026 onwards educational reform (de-cluttered curriculum, empowered teachers, intelligent digital ecosystem, and student wellbeing).",
        "summary": "📋 Topic 9 Summary:\n- Education 2026 onwards shifts towards competency-based, flexible, and human-centred learning.\n- Curricula are de-cluttered to prioritize deep understanding, critical problem-solving, and socio-emotional wellness.\n- Artificial intelligence and digital ecosystems are harnessed responsibly to empower teachers and personalize student growth."
    }
]

# Quizzes: 5 per topic (45 questions)
quizzes = {
    "t1": [
        {"q": "In early prehistoric human societies, education primarily served the function of:", "opts": ["Passing standardized state examinations", "Cultural transmission and survival skills through experiential community living", "Writing literary novels on papyrus", "Training industrial factory managers"], "a": 1, "fb": "Early education was an informal community process transmitting survival skills, rituals, and customs."},
        {"q": "The invention of which technology catalyzed the transition from informal learning to formal institutional schools in Mesopotamia?", "opts": ["The printing press", "Cuneiform writing", "The steam engine", "The mechanical compass"], "a": 1, "fb": "The invention of cuneiform writing necessitated formal schools (edubba) to train scribes."},
        {"q": "In ancient India, the traditional residential system where students lived with their teacher in a hermitage was called the:", "opts": ["Gurukula system", "Madrasah system", "Paideia system", "Lyceum system"], "a": 0, "fb": "The Gurukula system was the traditional residential Vedic school under a guru's guidance."},
        {"q": "Confucian education in ancient China was uniquely characterised by:", "opts": ["An emphasis on military conquest and naval engineering", "Civil service examinations (Keju) promoting moral governance and meritocratic social mobility", "The total abolition of written texts", "Exclusive instruction in physical athletic games"], "a": 1, "fb": "Confucianism introduced the Keju examinations, allowing scholars to attain government office based on merit."},
        {"q": "The scribal schools of ancient Mesopotamia were known as:", "opts": ["Edubba ('Tablet House')", "Academy", "Gymnasium", "Pondok"], "a": 0, "fb": "Edubba, meaning 'tablet house', was the Sumerian and Babylonian school for training scribes."}
    ],
    "t2": [
        {"q": "The Socratic method of inquiry (elenchus) is fundamentally based on:", "opts": ["Lecturing to passive audiences for hours", "Disciplined dialectical questioning to uncover underlying assumptions and draw out truth", "Physical punishment for incorrect answers", "Strict memorisation of written poetry"], "a": 1, "fb": "Elenchus is Socrates' dialectical questioning method to stimulate critical thinking and expose contradictions."},
        {"q": "In Plato's 'The Republic', the highest governing class of the ideal state consists of:", "opts": ["Auxiliary soldiers", "Commercial merchants", "Philosopher-Kings guided by wisdom", "Foreign mercenary captains"], "a": 2, "fb": "Plato proposed that an ideal society should be ruled by Philosopher-Kings who possess wisdom and virtue."},
        {"q": "Aristotle's ethical concept of the 'Golden Mean' teaches that virtue is found in:", "opts": ["Extreme austerity and self-denial", "Accumulating the maximum amount of gold", "The balanced, moderate path between two extremes of excess and deficiency", "Blind obedience to military orders"], "a": 2, "fb": "The Golden Mean is the desirable middle between excess and deficiency (e.g. courage between cowardice and recklessness)."},
        {"q": "Roman educator Quintilian defined the ultimate goal of education as producing:", "opts": ["The silent warrior", "The good man speaking well (vir bonus dicendi peritus)", "The wealthy tax collector", "The contemplative hermit"], "a": 1, "fb": "Quintilian's ideal orator was 'vir bonus dicendi peritus' — an ethically upright person who speaks eloquently."},
        {"q": "How does classical educational philosophy connect to the modern Malaysian National Philosophy of Education (FPK)?", "opts": ["Both emphasize holistic development balancing intellectual, moral/spiritual, and physical faculties", "FPK completely rejects all classical philosophies", "Both require students to learn ancient Greek", "Both mandate military service for all students"], "a": 0, "fb": "Both share the ideal of holistic education cultivating a balanced, moral, and intellectually capable individual."}
    ],
    "t3": [
        {"q": "Which Islamic scholar wrote 'The Canon of Medicine' and emphasized tailored early childhood education?", "opts": ["Al-Ghazali", "Ibn Sina (Avicenna)", "Al-Farabi", "Ibn Khaldun"], "a": 1, "fb": "Ibn Sina (Avicenna) advocated holistic childhood learning aligned with natural inclinations."},
        {"q": "In 'The Muqaddimah', Ibn Khaldun advocated which revolutionary pedagogical principle?", "opts": ["Harsh corporal punishment is necessary for discipline", "Teaching should progress gradually from simple to complex, avoiding overloading young minds", "Children should only learn foreign languages", "Education should be restricted to wealthy nobles"], "a": 1, "fb": "Ibn Khaldun pioneered developmental pedagogy: gradual instruction from concrete basics to abstract concepts without harshness."},
        {"q": "John Amos Comenius is famously known as the 'Father of Modern Education' because he:", "opts": ["Wrote 'Didactica Magna' advocating universal education and created the first illustrated children's textbook", "Invented the computer mouse", "Abolished all universities in Europe", "Restricted schooling strictly to boys"], "a": 0, "fb": "Comenius championed 'pampaedia' (universal education for all) and authored the illustrated Orbis Sensualium Pictus."},
        {"q": "Johann Heinrich Pestalozzi's educational philosophy is best summarized as educating the:", "opts": ["Past, Present, and Future", "Head, Heart, and Hands", "Mind, Body, and Bank Account", "Reading, Writing, and Arithmetic"], "a": 1, "fb": "Pestalozzi's holistic triad was the harmonious cultivation of the Head (intellect), Heart (morals), and Hands (skills)."},
        {"q": "Paulo Freire's seminal work 'Pedagogy of the Oppressed' severely criticized which educational paradigm?", "opts": ["The 'banking concept' of education where students are treated as empty vessels to be filled with information", "Dialogical critical problem-posing learning", "Kindergarten play-based discovery", "The Socratic questioning method"], "a": 0, "fb": "Freire rejected the 'banking model' where teachers deposit knowledge into passive, compliant students."}
    ],
    "t4": [
        {"q": "Prior to British colonial intervention, formal Islamic religious education in Malaya was conducted primarily in:", "opts": ["British grammar academies", "Pondok and Madrasah institutions", "Royal palaces only", "English-medium missionary colleges"], "a": 1, "fb": "Pondok schools in northern states (Kedah, Kelantan, Terengganu) were the primary institutions for formal Islamic scholarship."},
        {"q": "What was the defining socio-economic consequence of the British colonial 'four vernacular streams' policy in Malaya?", "opts": ["It created a deeply unified national culture", "It reinforced ethnic segregation and divided communities along linguistic, geographical, and economic lines", "It eliminated all social classes in Malaya", "It ensured every child spoke fluent English and Malay"], "a": 1, "fb": "The four separate streams reinforced colonial 'divide and rule' and fragmented society into compartmentalised ethnic enclaves."},
        {"q": "British policy towards Malay vernacular schools under colonial directors like R.O. Winstedt aimed primarily to:", "opts": ["Train Malays to become corporate industrial leaders", "Provide basic primary literacy to make boys better farmers and fishermen while keeping them in rural areas", "Prepare Malay students for Oxford University", "Abolish traditional Malay culture completely"], "a": 1, "fb": "Colonial policy deliberately limited rural Malay education to basic agriculture and crafts to prevent urban migration and political unrest."},
        {"q": "Which institution, established in 1922, became known as the crucible for modern Malay nationalist intellectual awakening?", "opts": ["Malay College Kuala Kangsar (MCKK)", "Sultan Idris Training College (SITC)", "Penang Free School", "Raffles Institution"], "a": 1, "fb": "SITC in Tanjung Malim trained vernacular teachers who spearheaded Malay literary, cultural, and nationalist movements."},
        {"q": "The first English-medium school established in Malaya in 1816 was:", "opts": ["Victoria Institution", "Penang Free School", "Malacca High School", "St. John's Institution"], "a": 1, "fb": "Penang Free School, founded by Rev. Robert Sparke Hutchings in 1816, was the earliest English school in Southeast Asia."}
    ],
    "t5": [
        {"q": "During the Japanese Occupation (1941–1945), schools in Malaya were required to:", "opts": ["Teach the Japanese language (Nippon-go) and bow to the Emperor (Tenno Heika) during morning assemblies", "Conduct all classes in Latin", "Adopt the American high school curriculum", "Close permanently with no education permitted"], "a": 0, "fb": "The Japanese enforced Nipponisation, teaching Nippon-go, singing Kimigayo, and instilling military discipline."},
        {"q": "The Barnes Report of 1951 provoked fierce opposition from the Chinese and Tamil communities because it recommended:", "opts": ["Banning the English language entirely", "Establishing a single National School system using only Malay and English, effectively phasing out vernacular schools", "Extending school hours until midnight", "Mandatory study of Japanese history"], "a": 1, "fb": "The Barnes Report proposed abolishing separate Chinese and Tamil schools, which was perceived as forced cultural assimilation."},
        {"q": "Which report was commissioned in 1951 to represent the perspectives of Chinese education in Malaya?", "opts": ["The Cheeseman Plan", "The Fenn-Wu Report", "The Razak Report", "The Rahman Talib Report"], "a": 1, "fb": "The Fenn-Wu Report defended Chinese vernacular education and advocated a trilingual language framework."},
        {"q": "The landmark Razak Report of 1956 established the foundational principle that:", "opts": ["All schools must adopt American textbooks", "National unity would be fostered through a common curriculum and Malay as the national language, while preserving vernacular primary schools", "Education should be completely privatised", "English should be the sole language of all schooling"], "a": 1, "fb": "The Razak compromise balanced unity (common curriculum, national language) with cultural preservation (National-Type schools)."},
        {"q": "Under the Razak Report (1956), primary schools using Malay as the medium of instruction were designated as:", "opts": ["Sekolah Kebangsaan (National Schools)", "Sekolah Jenis Kebangsaan (National-Type Schools)", "Sekolah Pondok Moden", "Sekolah Menengah Kebangsaan"], "a": 0, "fb": "Malay-medium primary schools were designated as Sekolah Kebangsaan (SK), while vernacular schools were designated as SJK."}
    ],
    "t6": [
        {"q": "The Rahman Talib Report of 1960 introduced which major educational policy for all Malaysian children?", "opts": ["Universal free primary education commencing in 1962", "Compulsory military conscription at age 12", "Abolition of all primary school examinations", "Mandatory university attendance"], "a": 0, "fb": "The Rahman Talib Report introduced universal free primary education across all government-assisted schools."},
        {"q": "The phased conversion of English-medium schools to Bahasa Melayu began in 1970 and was fully completed across secondary schools by:", "opts": ["1975", "1982", "1990", "2000"], "a": 1, "fb": "The transition began in Standard 1 in 1970 and reached Upper Six in 1982, establishing Bahasa Melayu as universal medium."},
        {"q": "The 1965 Comprehensive Education System in Malaysia expanded secondary schooling access by:", "opts": ["Abolishing the competitive Malayan Secondary School Entrance Examination (MSSEE)", "Requiring all students to pass Latin", "Eliminating technical and vocational subjects", "Privatising all secondary schools"], "a": 0, "fb": "Abolishing the MSSEE exam allowed all primary students to transition automatically to lower secondary school."},
        {"q": "The Mahathir Cabinet Committee Report of 1979 led directly to the creation of which primary curriculum?", "opts": ["KBSR (Kurikulum Bersepadu Sekolah Rendah)", "KSSR Semakan 2017", "The Cambridge O-Level Curriculum", "The International Baccalaureate"], "a": 0, "fb": "The 1979 Cabinet Committee's focus on basic 3M skills led directly to the launch of KBSR in 1982/1983."},
        {"q": "Which public university was established in 1970 specifically to realise the aspiration of higher education in the National Language?", "opts": ["Universiti Malaya (UM)", "Universiti Kebangsaan Malaysia (UKM)", "Universiti Sains Malaysia (USM)", "Universiti Putra Malaysia (UPM)"], "a": 1, "fb": "UKM was founded on 18 May 1970 as the premier national university championing Bahasa Melayu as the language of knowledge."}
    ],
    "t7": [
        {"q": "The National Philosophy of Education (FPK) defines the ultimate goal of Malaysian education as developing individual potential across four dimensions known as:", "opts": ["JERI (Jasmani, Emosi, Rohani, Intelek)", "3M (Membaca, Menulis, Mengira)", "STEM (Science, Technology, Engineering, Math)", "SWOT (Strengths, Weaknesses, Opportunities, Threats)"], "a": 0, "fb": "JERI represents Physical (Jasmani), Emotional (Emosi), Spiritual (Rohani), and Intellectual (Intelek) harmony."},
        {"q": "A major legislative update in the Education Act 1996 (Act 550) was:", "opts": ["The inclusion of the National Philosophy of Education into its statutory preamble and the repeal of Section 21(2)", "The banning of pre-school education", "The elimination of Bahasa Melayu as the national language", "The closure of all private universities"], "a": 0, "fb": "The 1996 Act incorporated the FPK into its preamble and repealed the controversial Section 21(2)."},
        {"q": "The Smart School (Sekolah Bestari) initiative launched in 1997 aimed to:", "opts": ["Transform pedagogy from rote memorisation to critical thinking and technology-enabled learning", "Replace all human teachers with robots", "Ensure all students become computer programmers by age 10", "Sell computers to parents for school profit"], "a": 0, "fb": "The Smart School initiative pioneered technology-supported, student-centred, and thinking-skills-focused learning."},
        {"q": "The policy implemented in 2003 to teach Science and Mathematics in English was known by the acronym:", "opts": ["PPSMI", "MBMMBI", "KBSR", "KSSM"], "a": 0, "fb": "PPSMI (Pengajaran dan Pembelajaran Sains dan Matematik dalam Bahasa Inggeris) was introduced in 2003 and phased out in 2012."},
        {"q": "KBSM (Kurikulum Bersepadu Sekolah Menengah) introduced in 1988 emphasized:", "opts": ["The integration of values, language across the curriculum, and life skills (Kemahiran Hidup)", "Pure military drills", "The abolition of all science subjects", "Rote memorisation of historical dates only"], "a": 0, "exp": "KBSM integrated moral values, language proficiency, and practical life skills into secondary education.", "topic": "Reform and Modernisation"}
    ],
    "t8": [
        {"q": "The Malaysia Education Blueprint (PPPM 2013–2025) outlines how many System Aspirations?", "opts": ["3", "5 (Access, Quality, Equity, Unity, Efficiency)", "10", "15"], "a": 1, "fb": "The 5 System Aspirations are Access, Quality, Equity, Unity, and Efficiency."},
        {"q": "Which of the following is NOT one of the 6 Student Aspirations under PPPM 2013–2025?", "opts": ["Bilingual Proficiency", "Thinking Skills (KBAT)", "Accumulation of Personal Financial Wealth", "Ethics & Spirituality"], "a": 2, "fb": "The 6 Student Aspirations are Knowledge, Thinking Skills, Leadership Skills, Bilingual Proficiency, Ethics/Spirituality, and National Identity."},
        {"q": "Shift 1 of the Malaysia Education Blueprint focuses on:", "opts": ["Providing equal access to quality education of an international standard", "Closing all public schools", "Replacing teachers with automated software", "Abolishing all foreign language classes"], "a": 0, "fb": "Shift 1 aims to benchmark Malaysian education against high-performing international systems (TIMSS/PISA)."},
        {"q": "The language policy that replaced PPSMI in 2012, emphasizing the mastery of both national and global languages, is:", "opts": ["MBMMBI (Memartabatkan Bahasa Melayu, Memperkukuh Bahasa Inggeris)", "PPSMI Edisi 2", "Dasar Satu Bahasa", "Dasar Bahasa Inggeris Sahaja"], "a": 0, "fb": "MBMMBI upholds Bahasa Melayu as the national language while strengthening English proficiency."},
        {"q": "Wave 1 (2013–2015) of the PPPM primarily focused on:", "opts": ["Turning around system performance by supporting teachers and raising core literacy/numeracy skills", "Allowing schools complete financial independence", "Building universities in every village", "Privatising the entire education ministry"], "a": 0, "fb": "Wave 1 focused on stabilizing the system by boosting teacher quality and foundational literacy/numeracy."}
    ],
    "t9": [
        {"q": "The educational reform era from 2026 onwards under the new 10-year education plan emphasizes a decisive shift toward:", "opts": ["A de-cluttered, competency-based curriculum and authentic continuous assessment", "More high-stakes national paper exams every semester", "Banning all technology and artificial intelligence in schools", "Returning to 19th-century rote memorisation"], "a": 0, "fb": "The 2026 reform streamlines overcrowded syllabi to focus on deep competencies and authentic assessment."},
        {"q": "Under Pillar 2 of contemporary educational transformation, teachers are envisioned as:", "opts": ["Passive deliverers of standardized scripts", "Empowered professional learning designers with pedagogical autonomy", "Clerical administrative processors", "Strict disciplinarians relying on corporal punishment"], "a": 1, "fb": "Teachers are elevated to autonomous designers of personalized and adaptive learning experiences."},
        {"q": "Responsible integration of Artificial Intelligence (AI) in the 2026+ digital learning ecosystem aims to:", "opts": ["Personalize learning trajectories and empower educators while ensuring digital equity and human-centric ethics", "Eliminate the need for human teachers entirely", "Grade students based on their social media profiles", "Replace all physical textbooks with paid advertisements"], "a": 0, "fb": "AI serves as a personalized learning assistant supporting teachers while upholding ethics and equity."},
        {"q": "Pillar 4 of the new educational reform prioritizes which critical aspect of student development?", "opts": ["Mental health literacy, social-emotional wellbeing (SEL), and character resilience", "Passing exams with 100% memorisation", "Military readiness drills", "Commercial sales skills"], "a": 0, "fb": "Socio-emotional wellbeing and mental health are core pillars of contemporary Malaysian educational reform."},
        {"q": "Why is 'de-cluttering' the curriculum a central priority in contemporary curriculum transformation?", "opts": ["To allow students to master core competencies deeply rather than rushing through overly dense, superficial content", "Because books are too heavy to print", "To reduce school days to one day per week", "To eliminate science and mathematics completely"], "a": 0, "fb": "De-cluttering reduces curriculum bloat so students can engage in deep learning, problem-solving, and critical thinking."}
    ]
}

# Flashcards: 30 items
flashcards = [
    {"q": "What was the primary function of education in early human societies?", "a": "Informal cultural transmission, learning for survival (hunting, toolmaking), socialisation, and preserving tribal values and customs."},
    {"q": "What was an 'Edubba' in ancient Mesopotamia?", "a": "The 'tablet house' — the earliest institutional formal scribal school where boys were trained in cuneiform writing and administration."},
    {"q": "Explain the Gurukula system of ancient India.", "a": "A residential Vedic learning system where students lived with their guru in a forest hermitage, practicing devotion and studying sacred texts."},
    {"q": "What was the significance of China's Keju examinations?", "a": "Imperial civil service examinations based on Confucian classics, establishing a historic meritocracy for government service."},
    {"q": "What is the Socratic method (elenchus)?", "a": "A dialectical form of disciplined inquiry and questioning to stimulate critical thinking, examine assumptions, and draw out latent knowledge."},
    {"q": "What is Plato's Allegory of the Cave?", "a": "A metaphor in 'The Republic' representing education as the liberation of the soul from sensory illusions into the intellectual light of true forms."},
    {"q": "Explain Aristotle's concept of the 'Golden Mean'.", "a": "The ethical virtue found in moderation between the extremes of excess and deficiency (e.g. courage between cowardice and rashness)."},
    {"q": "What did Roman educator Quintilian mean by 'vir bonus dicendi peritus'?", "a": "The ultimate goal of Roman education: 'the good man speaking well' — uniting eloquent rhetorical speech with moral virtue."},
    {"q": "What educational principle did Ibn Khaldun advocate in 'The Muqaddimah'?", "a": "Gradual, progressive learning from concrete basics to abstract concepts, taking into account learner development without harsh punishment."},
    {"q": "Who was John Amos Comenius and what was 'Didactica Magna'?", "a": "The 'Father of Modern Education' who advocated universal education for all and authored the first illustrated children's textbook."},
    {"q": "What was Pestalozzi's pedagogical triad?", "a": "Educating the whole child through the harmonious development of the 'Head, Heart, and Hands' in a loving environment."},
    {"q": "Who founded the Kindergarten and what was its core idea?", "a": "Friedrich Froebel; viewing children as blooming plants in a garden, learning through self-activity, play, and structured gifts/occupations."},
    {"q": "What was John Dewey's core progressive philosophy?", "a": "Pragmatism and 'learning by doing': education is life itself in a democratic community, grounded in active, experiential problem-solving."},
    {"q": "What is Paulo Freire's 'banking concept' of education?", "a": "A critique of oppressive schooling where teachers 'deposit' static knowledge into passive students, rather than engaging in liberating dialogue."},
    {"q": "Describe the pre-colonial Pondok education system in Malaya.", "a": "Traditional residential religious schools centered around a Tok Guru, providing intensive study of Quran, Fiqh, Tauhid, and Arabic."},
    {"q": "What were the four segregated British colonial vernacular school streams?", "a": "1. Malay Vernacular (rural/basic)\n2. Chinese Vernacular (community-funded)\n3. Tamil Vernacular (estate-based)\n4. English Schools (urban/elite)."},
    {"q": "What was the significance of Sultan Idris Training College (SITC, 1922)?", "a": "The premier teacher training college in Tanjung Malim that became the intellectual cradle for the Malay literary and nationalist awakening."},
    {"q": "What was the core difference between the Barnes Report (1951) and Fenn-Wu Report (1951)?", "a": "Barnes proposed assimilating all children into bilingual National Schools (Malay/English); Fenn-Wu advocated preserving vernacular mother-tongue education."},
    {"q": "What made the Razak Report (1956) the foundational blueprint of Malaysian education?", "a": "It struck a historic consensus: national unity via a common curriculum and national language, while preserving vernacular primary schools (SK and SJK)."},
    {"q": "What was the main recommendation of the Rahman Talib Report (1960)?", "a": "Universal free primary education, universal schooling, and requiring secondary examinations (LCE/MCE) to be conducted only in Malay or English."},
    {"q": "What was the impact of the Education Act 1961?", "a": "Legally consolidated the national school system and empowered the government to convert schools and standardize public examinations."},
    {"q": "When did the phased transition to Bahasa Melayu as the medium of instruction occur?", "a": "From 1970 (beginning in Standard 1) until 1982 (reaching Upper Six), transforming former English-medium schools into National schools."},
    {"q": "What was the focus of the Mahathir Cabinet Committee Report (1979)?", "a": "Mastery of basic 3M skills (Membaca, Menulis, Mengira), moral values, and student character, which birthed the KBSR curriculum in 1982/83."},
    {"q": "What are the four dimensions of the Malaysian National Philosophy of Education (FPK)?", "a": "JERI: Jasmani (Physical), Emosi (Emotional), Rohani (Spiritual), and Intelek (Intellectual) — in harmony based on belief in God."},
    {"q": "What were the key achievements of the Education Act 1996 (Act 550)?", "a": "Incorporated FPK into its preamble, repealed controversial Section 21(2), regulated pre-school education, and recognized private tertiary institutions."},
    {"q": "What was the Smart School (Sekolah Bestari) initiative (1997)?", "a": "A flagship MSC Malaysia initiative to transition schools toward digital technology, student-centred inquiry, and critical thinking."},
    {"q": "What is MBMMBI?", "a": "'Memartabatkan Bahasa Melayu, Memperkukuh Bahasa Inggeris' — upholding Malay as the national language while strengthening English proficiency."},
    {"q": "What are the 5 System Aspirations of PPPM 2013–2025?", "a": "Access (100%), Quality (top-third international benchmark), Equity (50% gap reduction), Unity, and Efficiency."},
    {"q": "What are the 6 Student Aspirations in PPPM 2013–2025?", "a": "Knowledge, Thinking Skills (KBAT), Leadership Skills, Bilingual Proficiency, Ethics & Spirituality, and National Identity."},
    {"q": "What are the 4 Pillars of contemporary educational reform (2026 onwards)?", "a": "1. De-cluttered competency curriculum & authentic assessment\n2. Empowered teachers as learning designers\n3. Intelligent human-centric digital ecosystem (AI)\n4. Holistic student wellbeing & resilience."}
]

# Mock Exam Set: 40 questions
mock_set = {
    "id": "set-1",
    "title": "Mock Exam 1 (HPGD1303)",
    "desc": "40 MCQ questions covering all 9 module topics · Standard 60-minute mock exam",
    "num": 1,
    "questions": [
        {
            "q": "Which development directly transformed education from an informal tribal practice into formal institutionalized schooling in Mesopotamia and Egypt?",
            "opts": [
                "The invention of written scripts (cuneiform and hieroglyphics) requiring specialized scribal training",
                "The arrival of European colonial explorers",
                "The creation of computerized mechanical printing",
                "The abolition of agriculture in favour of factory manufacturing"
            ],
            "a": 0,
            "exp": "The invention of writing created the need for structured scribal schools (such as the Edubba) to master written records.",
            "topic": "The Roots of Education",
            "difficulty": "medium",
            "cognitive": "comprehension"
        },
        {
            "q": "In Plato's 'The Republic', education is fundamentally designed to achieve social justice by:",
            "opts": [
                "Allowing students to do whatever they please without civic duty",
                "Sorting individuals according to their intellectual and moral capacities into Guardians, Auxiliaries, and Producers",
                "Ensuring that all citizens earn identical commercial wages",
                "Banning the study of mathematics and dialectics"
            ],
            "a": 1,
            "exp": "Plato's Republic proposes state education that nurtures each individual's natural aptitude to serve their designated role in a harmonious state.",
            "topic": "Classical and Philosophical Foundations of Education",
            "difficulty": "medium",
            "cognitive": "comprehension"
        },
        {
            "q": "Which Islamic scholar's work 'Ayyuha al-Walad' (O Youth!) emphasized that knowledge without righteous moral action is spiritual bankruptcy?",
            "opts": ["Al-Ghazali", "Ibn Sina", "Al-Farabi", "Ibn Khaldun"],
            "a": 0,
            "exp": "Imam Al-Ghazali emphasized the indissoluble link between beneficial knowledge ('ilm nafi') and ethical deed ('amal).",
            "topic": "Educational Thought Through the Ages",
            "difficulty": "easy",
            "cognitive": "recall"
        },
        {
            "q": "John Amos Comenius's concept of 'pampaedia' in 'Didactica Magna' advocated for:",
            "opts": [
                "Universal education teaching all things to all human beings regardless of social class or gender",
                "Education reserved exclusively for military aristocrats",
                "Teaching children in Latin only and strictly banning mother tongues",
                "Replacing all books with manual agricultural labour"
            ],
            "a": 0,
            "exp": "Comenius pioneered the vision of universal education for all boys and girls of all stations in life.",
            "topic": "Educational Thought Through the Ages",
            "difficulty": "medium",
            "cognitive": "recall"
        },
        {
            "q": "What was the long-term socio-political impact of the British colonial education policy in Malaya prior to 1941?",
            "opts": [
                "It created a unified, culturally homogeneous society with a single shared language",
                "It fostered a compartmentalised plural society where ethnic communities remained divided by language, location, and economic role",
                "It eliminated all private and vernacular schooling across the peninsula",
                "It established Bahasa Melayu as the sole language of administration across all states"
            ],
            "a": 1,
            "exp": "British laissez-faire policy institutionalised J.S. Furnivall's 'plural society' where ethnic groups mixed only in the marketplace.",
            "topic": "Indigenous and Colonial Beginnings of Education in Malaya",
            "difficulty": "hard",
            "cognitive": "analysis"
        },
        {
            "q": "The historic compromise of the Razak Report (1956) was based on which key principle?",
            "opts": [
                "Fostering national unity through a common content curriculum and national language while safeguarding vernacular primary schools",
                "Immediate closure of all vernacular primary schools within 24 hours",
                "Adopting English as the sole language of instruction at all levels of education",
                "Abolishing all public examinations permanently"
            ],
            "a": 0,
            "exp": "The Razak Report balanced national unity with cultural pluralism through a common syllabus and preserved vernacular primary streams.",
            "topic": "Education During the Japanese Occupation and Early Post-War Era",
            "difficulty": "medium",
            "cognitive": "comprehension"
        },
        {
            "q": "Universal free primary education in Malaysia was officially introduced following the recommendations of the:",
            "opts": ["Rahman Talib Report (1960)", "Barnes Report (1951)", "Cheeseman Plan (1946)", "Education Ordinance of 1952"],
            "a": 0,
            "exp": "The Rahman Talib Report of 1960 led to universal free primary education commencing in 1962.",
            "topic": "Building a National Identity: Post-Independence Reforms",
            "difficulty": "easy",
            "cognitive": "recall"
        },
        {
            "q": "The phased conversion of former English-medium schools to Bahasa Melayu commenced in 1970 and concluded in 1982 in order to:",
            "opts": [
                "Fulfill the constitutional mandate of establishing the National Language as the common vehicle for national identity and social cohesion",
                "Prevent Malaysian students from attending overseas universities",
                "Ban the study of science and mathematics entirely",
                "Comply with colonial treaties signed with the Dutch in 1824"
            ],
            "a": 0,
            "exp": "The National Education Policy transitioned all national schools to Bahasa Melayu to unite the young generation under a common language.",
            "topic": "Building a National Identity: Post-Independence Reforms",
            "difficulty": "medium",
            "cognitive": "analysis"
        },
        {
            "q": "Which curriculum was introduced in 1982/1983 as a direct consequence of the 1979 Mahathir Cabinet Committee Report to address basic literacy and numeracy?",
            "opts": ["KBSR (Kurikulum Bersepadu Sekolah Rendah)", "KSSR Semakan", "The Cambridge Secondary Curriculum", "The New Economic Curriculum"],
            "a": 0,
            "exp": "KBSR focused on the basic 3M competencies (Membaca, Menulis, Mengira) with an integrated child-centred approach.",
            "topic": "Reform and Modernisation: From the 1980s to Early 2000s",
            "difficulty": "easy",
            "cognitive": "recall"
        },
        {
            "q": "The Malaysian National Philosophy of Education (FPK) emphasizes developing the potential of individuals in a balanced manner across the dimensions of:",
            "opts": [
                "Jasmani (Physical), Emosi (Emotional), Rohani (Spiritual), and Intelek (Intellectual) — JERI",
                "Reading, Writing, Computing, and Speaking",
                "Science, Technology, Commerce, and Agriculture",
                "Law, Medicine, Accounting, and Engineering"
            ],
            "a": 0,
            "exp": "FPK aims at holistic development encompassing intellectual, spiritual, emotional, and physical faculties based on belief in God.",
            "topic": "Reform and Modernisation: From the 1980s to Early 2000s",
            "difficulty": "easy",
            "cognitive": "recall"
        }
    ]
}

# Add remaining 30 questions to reach 40 complete questions
more_questions = [
    # Topic 1-3
    {"q": "In ancient Egypt, moral instruction and cosmic balance were governed by the core principle of:", "opts": ["Ma'at (truth, balance, and order)", "Nippon-go", "Elenchus", "Pampaedia"], "a": 0, "exp": "Egyptian education aimed at cultivating Ma'at (righteous order, truth, and balance).", "topic": "The Roots of Education", "difficulty": "medium", "cognitive": "recall"},
    {"q": "What is the core difference between Aristotle's Realism and Plato's Idealism?", "opts": ["Aristotle grounded learning in sensory empirical observation of the material world, whereas Plato viewed physical reality as shadows of ideal mental forms", "Aristotle banned all athletic exercise", "Plato rejected the existence of the human soul", "Aristotle was an Egyptian priest"], "a": 0, "exp": "Aristotle founded realism (empirical observation), while Plato championed idealism (abstract forms).", "topic": "Classical and Philosophical Foundations of Education", "difficulty": "hard", "cognitive": "analysis"},
    {"q": "Friedrich Froebel founded the 'Kindergarten' based on the principle that young children:", "opts": ["Develop naturally through self-activity, guided play, and symbolic 'gifts' in a supportive environment", "Should be treated as miniature adult factory workers", "Must sit silently in desks for 8 hours without moving", "Should not be exposed to nature or plants"], "a": 0, "exp": "Froebel envisioned early childhood as a garden where children bloom through creative play.", "topic": "Educational Thought Through the Ages", "difficulty": "easy", "cognitive": "comprehension"},
    {"q": "John Dewey's educational progressivism strongly criticized traditional schooling for:", "opts": ["Treating education as mere preparation for distant adult life rather than an active, meaningful process of living in the present", "Giving children too much freedom to speak", "Using experiential hands-on laboratory activities", "Teaching vocational skills"], "a": 0, "exp": "Dewey insisted that 'education is not preparation for life; education is life itself.'", "topic": "Educational Thought Through the Ages", "difficulty": "medium", "cognitive": "comprehension"},
    # Topic 4-5
    {"q": "Why was the Registration of Schools Ordinance 1920 introduced by the British colonial government in Malaya?", "opts": ["To supervise, inspect, and curb rising anti-colonial political activism within Chinese vernacular schools", "To provide free laptops to all students", "To build new universities in rural areas", "To make Malay compulsory in Chinese schools"], "a": 0, "exp": "The 1920 Ordinance gave colonial authorities power to monitor and close schools propagating anti-colonial or Kuomintang politics.", "topic": "Indigenous and Colonial Beginnings of Education in Malaya", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "The Malay College Kuala Kangsar (MCKK), founded in 1905, was established with the specific objective of:", "opts": ["Training sons of Malay traditional royalty and nobility for junior administrative positions in the colonial civil service", "Educating impoverished estate workers", "Teaching classical Chinese literature", "Training marine sailors"], "a": 0, "exp": "MCKK ('the Malay Eton') groomed traditional aristocrats for recruitment into the Malay Administrative Service (MAS).", "topic": "Indigenous and Colonial Beginnings of Education in Malaya", "difficulty": "easy", "cognitive": "recall"},
    {"q": "During the Japanese Occupation (1941–1945), which song was sung every morning while facing toward the Imperial Palace in Tokyo?", "opts": ["Kimigayo", "God Save the King", "Negaraku", "Terang Bulan"], "a": 0, "exp": "Kimigayo was the Japanese national anthem sung during morning school ceremonies.", "topic": "Education During the Japanese Occupation and Early Post-War Era", "difficulty": "easy", "cognitive": "recall"},
    {"q": "The Barnes Report (1951) was rejected by non-Malay communities primarily because:", "opts": ["It recommended the abolition of separate Chinese and Tamil vernacular primary schools", "It required all classes to be taught in Dutch", "It banned all sport activities in schools", "It raised university tuition fees ten-fold"], "a": 0, "exp": "The Barnes proposal to assimilate all primary education into bilingual Malay-English schools was seen as an existential threat to mother-tongue schooling.", "topic": "Education During the Japanese Occupation and Early Post-War Era", "difficulty": "easy", "cognitive": "comprehension"},
    # Topic 6-7
    {"q": "Section 21(2) of the Education Act 1961 was a major point of political debate in Malaysia because it empowered the Minister to:", "opts": ["Convert National-Type primary schools into National schools when deemed expedient", "Close down all private colleges", "Abolish university degrees", "Impose curfews on teachers"], "a": 0, "exp": "Section 21(2) gave discretionary ministerial power to convert vernacular schools, causing ongoing community anxiety until its repeal in 1996.", "topic": "Building a National Identity: Post-Independence Reforms", "difficulty": "hard", "cognitive": "analysis"},
    {"q": "The 1965 Comprehensive Education reform expanded lower secondary schooling by providing electives in pre-vocational areas such as:", "opts": ["Woodwork, metalwork, agriculture, and home science (Sains Rumah Tangga)", "Astrophysics and nuclear engineering", "Ancient Greek and Hebrew", "Aviation piloting"], "a": 0, "exp": "Comprehensive education introduced practical pre-vocational electives to broaden career readiness.", "topic": "Building a National Identity: Post-Independence Reforms", "difficulty": "medium", "cognitive": "recall"},
    {"q": "The Education Act 1996 (Act 550) was landmark legislation because it:", "opts": ["Codified the National Philosophy of Education into law and explicitly regulated pre-school and private education", "Banned all foreign teachers from entering Malaysia", "Repealed the use of Bahasa Melayu in all courts and schools", "Privatised all national primary schools"], "a": 0, "exp": "The 1996 Act repealed the 1961 Act, incorporated FPK into law, and modernized the entire educational framework.", "topic": "Reform and Modernisation: From the 1980s to Early 2000s", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "The Multimedia Super Corridor (MSC) flagship application that pioneered digital educational transformation in Malaysia was:", "opts": ["Sekolah Bestari (Smart Schools)", "Sekolah Berasrama Penuh", "Sekolah Menengah Vokasional", "Sekolah Pondok Moden"], "a": 0, "exp": "Sekolah Bestari was launched in 1997 as a flagship MSC project to foster technology-integrated learning.", "topic": "Reform and Modernisation: From the 1980s to Early 2000s", "difficulty": "easy", "cognitive": "recall"},
    # Topic 8-9
    {"q": "How many System Aspirations are articulated in the Malaysia Education Blueprint (PPPM 2013–2025)?", "opts": ["5 (Access, Quality, Equity, Unity, Efficiency)", "3", "7", "11"], "a": 0, "exp": "The Blueprint articulates 5 systemic goals: Access, Quality, Equity, Unity, and Efficiency.", "topic": "The Malaysian Education Blueprint (PPPM 2013–2025)", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Shift 2 of the PPPM 2013–2025 focuses on ensuring every child achieves bilingual proficiency in:", "opts": ["Bahasa Melayu and English", "Bahasa Melayu and French", "Mandarin and Arabic", "English and Spanish"], "a": 0, "exp": "Shift 2 commits to operational fluency in both Bahasa Melayu (national language) and English (global language).", "topic": "The Malaysian Education Blueprint (PPPM 2013–2025)", "difficulty": "easy", "cognitive": "recall"},
    {"q": "The introduction of Higher-Order Thinking Skills (KBAT / HOTS) questions in Malaysian public examinations under the Blueprint aims to:", "opts": ["Move away from rote memorisation toward critical analysis, problem solving, and innovative application", "Make examinations so difficult that fewer students graduate", "Ensure all questions are answered in English only", "Eliminate multiple-choice questions entirely"], "a": 0, "exp": "KBAT trains students to analyze, evaluate, and create rather than simply regurgitate memorized facts.", "topic": "The Malaysian Education Blueprint (PPPM 2013–2025)", "difficulty": "easy", "cognitive": "comprehension"},
    {"q": "Pillar 1 of contemporary Malaysian educational reform (2026 onwards) is specifically focused on:", "opts": ["A de-cluttered, competency-based curriculum and authentic, continuous classroom assessment", "Increasing textbook page counts to over 1,000 pages per subject", "Adding four more national public examinations each year", "Banning all group projects"], "a": 0, "exp": "Pillar 1 addresses curriculum overcrowding to foster deep competency mastery and authentic assessment.", "topic": "Contemporary Educational Transformation in Malaysia", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Under contemporary educational reforms, continuous Classroom Assessment is known in Malaysia as:", "opts": ["Pentaksiran Bilik Darjah (PBD)", "PISA", "TIMSS", "SPM Ulangan"], "a": 0, "exp": "PBD (Pentaksiran Bilik Darjah) is the authentic formative and summative classroom assessment system.", "topic": "Contemporary Educational Transformation in Malaysia", "difficulty": "easy", "cognitive": "recall"},
    # Additional 13 questions to complete 40
    {"q": "In traditional pre-literate education, how did storytelling function as a pedagogical medium?", "opts": ["It preserved historical memory, transmitted cultural cosmology, and modeled moral virtues through oral narrative", "It was used purely for bedtime entertainment without educational purpose", "It was forbidden by tribal elders", "It was only performed once every century"], "a": 0, "exp": "Oral narrative was the primary cultural vehicle for transmitting tribal ethics, history, and survival knowledge.", "topic": "The Roots of Education", "difficulty": "easy", "cognitive": "comprehension"},
    {"q": "The Socratic maxim 'The unexamined life is not worth living' underpins which enduring educational aim?", "opts": ["Cultivating reflective, critical self-awareness and rational moral inquiry", "Maximising athletic physical stamina above all else", "Accumulating property and social prestige", "Accepting religious dogma without question"], "a": 0, "exp": "Socrates argued that true education consists of reflective moral self-examination and rational inquiry.", "topic": "Classical and Philosophical Foundations of Education", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "In 'The Republic', Plato's famous Allegory of the Cave illustrates that:", "opts": ["Sensory perception alone is incomplete and deceptive; true knowledge comes from philosophical enlightenment of abstract realities", "Living in underground caves is healthier than living in cities", "Only prisoners are capable of understanding mathematics", "Sunlight is harmful to the human brain"], "a": 0, "exp": "The cave represents the transition from unenlightened sensory perception to the true intellectual Form of the Good.", "topic": "Classical and Philosophical Foundations of Education", "difficulty": "hard", "cognitive": "analysis"},
    {"q": "Al-Farabi's concept of 'Al-Insan Al-Kamil' asserts that the truly educated person must combine:", "opts": ["Intellectual excellence with moral and spiritual virtue", "Military combat skills with commercial accounting", "Foreign language proficiency with musical mastery only", "Mathematical genius with political tyranny"], "a": 0, "exp": "Al-Farabi asserted that knowledge without moral and spiritual virtue produces harm rather than true human flourishing.", "topic": "Educational Thought Through the Ages", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Which 18th-century Swiss reformer revolutionized child-centred education with his motto 'Learning by Head, Hand, and Heart'?", "opts": ["Johann Heinrich Pestalozzi", "Friedrich Froebel", "John Locke", "Jean-Jacques Rousseau"], "a": 0, "exp": "Pestalozzi insisted on holistic child development combining the intellectual (head), vocational (hand), and moral (heart).", "topic": "Educational Thought Through the Ages", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Under the colonial British Labour Code of 1923, rubber plantation owners in Malaya were legally mandated to:", "opts": ["Provide and maintain a basic vernacular school if there were 10 or more children of school-going age on the estate", "Send all estate children to London universities", "Pay teachers the highest salary in the civil service", "Provide free private tuition in engineering"], "a": 0, "exp": "The 1923 Labour Code required estate managers to provide basic Tamil schooling if 10 or more children resided on the estate.", "topic": "Indigenous and Colonial Beginnings of Education in Malaya", "difficulty": "medium", "cognitive": "recall"},
    {"q": "What major socio-political change occurred following the end of the Japanese Occupation in 1945?", "opts": ["The myth of British colonial invincibility was shattered, accelerating the surge of local nationalist movements toward independence", "The entire population demanded to remain a permanent colony", "Schools permanently ceased teaching in English and Malay", "All educational institutions were relocated to Singapore"], "a": 0, "exp": "The defeat and internment of British forces shattered colonial prestige and energized demand for national self-determination.", "topic": "Education During the Japanese Occupation and Early Post-War Era", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "The Fenn-Wu Report (1951) made which significant contribution to the post-war educational debate?", "opts": ["It affirmed that Chinese schools in Malaya could foster loyalty to the nation without abandoning their linguistic and cultural heritage", "It demanded that all schools be taught exclusively in classical Mandarin", "It recommended the complete closure of all English schools", "It advised the British government to ban all examinations"], "a": 0, "exp": "Fenn and Wu argued that mother-tongue education and Malayan national loyalty were fully compatible, advocating multilingualism.", "topic": "Education During the Japanese Occupation and Early Post-War Era", "difficulty": "hard", "cognitive": "analysis"},
    {"q": "The introduction of the Rukunegara in 1970 influenced the Malaysian educational system by:", "opts": ["Embedding shared national values of unity, the rule of law, morality, and loyalty to King and Country into school culture and curricula", "Abolishing all religious studies", "Replacing school uniforms with traditional costumes only", "Cancelling all public examinations for a decade"], "a": 0, "exp": "Rukunegara became the national ideological compass shaping moral and civic education in schools after 1969.", "topic": "Building a National Identity: Post-Independence Reforms", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "In the Malaysian secondary curriculum, KBSM introduced 'Kemahiran Hidup Bersepadu' (Living Skills) to:", "opts": ["Equip all secondary students with practical life, technological, entrepreneurial, and domestic competencies", "Prepare students exclusively for military combat", "Replace science and mathematics instruction", "Teach students ancient Greek architecture"], "a": 0, "exp": "Kemahiran Hidup provided practical hands-on pre-vocational and life competencies across secondary schooling.", "topic": "Reform and Modernisation: From the 1980s to Early 2000s", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Which international assessments prompted the development of the Malaysia Education Blueprint 2013–2025 due to performance concerns?", "opts": ["TIMSS (Trends in International Mathematics and Science Study) and PISA (Programme for International Student Assessment)", "SAT and GRE", "IELTS and TOEFL", "TOEIC and GMAT"], "a": 0, "exp": "Stagnating scores in TIMSS and PISA galvanized policymakers to initiate the comprehensive PPPM reform.", "topic": "The Malaysian Education Blueprint (PPPM 2013–2025)", "difficulty": "easy", "cognitive": "recall"},
    {"q": "What is the primary role of the District Education Office (PPD) under Shift 6 of the PPPM 2013–2025?", "opts": ["To serve as supportive partners providing tailored coaching, data-driven interventions, and resource support to schools in their district", "To strictly discipline teachers without visiting classrooms", "To sell school uniforms directly to students", "To replace headmasters in managing daily school timetables"], "a": 0, "exp": "Shift 6 transformed PPDs from bureaucratic administrators into active instructional coaches and school support partners.", "topic": "The Malaysian Education Blueprint (PPPM 2013–2025)", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Contemporary educational reform (2026 onwards) emphasizes 'Social-Emotional Learning' (SEL) primarily to:", "opts": ["Cultivate self-awareness, emotional regulation, empathy, and collaborative relationship skills essential for life wellbeing", "Ensure students get 100% on factual history exams", "Replace all academic subjects with daily gym workouts", "Discourage students from forming friendships in class"], "a": 0, "exp": "Social-Emotional Learning builds resilience, emotional balance, empathy, and interpersonal problem-solving skills.", "topic": "Contemporary Educational Transformation in Malaysia", "difficulty": "easy", "cognitive": "comprehension"}
]

mock_set["questions"].extend(more_questions)

data_hpgd1303 = {
    "notes": notes,
    "quizzes": quizzes,
    "flashcards": flashcards,
    "sets": [mock_set]
}

with open("scripts/hpgd1303_data.json", "w", encoding="utf-8") as f:
    json.dump(data_hpgd1303, f, indent=2, ensure_ascii=False)

print(f"HPGD1303 generated: {len(notes)} topics, {sum(len(q) for q in quizzes.values())} quiz questions, {len(flashcards)} flashcards, {len(mock_set['questions'])} exam questions.")
