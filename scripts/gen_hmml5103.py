# scripts/gen_hmml5103.py
# Generates notes, quizzes, flashcards, and mock exam questions for HMML5103
import json

notes = [
    {
        "title": "Pengenalan kepada Pelbagai Teori Linguistik",
        "keywords": "Definisi linguistik, Teori Tradisional, Teori Struktural, Teori Transformasi Generatif, Za'ba, Saussure, Chomsky.",
        "sections": [
            {
                "h": "1.1 Jenis Teori Linguistik Utama",
                "text": "1.1 Jenis Teori Linguistik Utama\n\n⭐ Konsep Utama\nLinguistik didefinisikan sebagai kajian saintifik tentang bahasa (Kamus Dewan). Dalam pendidikan bahasa Melayu, terdapat tiga jenis teori linguistik utama yang berkembang secara evolusioner:\n\n1. Teori Linguistik Tradisional (Nahu Tradisional)\n- Berakar daripada tatabahasa Yunani dan Latin kuno.\n- Menghuraikan bahasa berasaskan pendekatan makna, nosional, dan logik.\n- Bersifat preskriptif (menentukan hukum betul/salah penggunaan bahasa).\n- Di Alam Melayu, dipelopori oleh Zainal Abidin Ahmad (Za'ba) melalui Pelita Bahasa Melayu.\n\n2. Teori Linguistik Struktural\n- Dipelopori oleh Ferdinand de Saussure (Bapa Linguistik Moden) melalui karya Course in General Linguistics (1916).\n- Menolak pendekatan makna tradisional; menekankan analisis struktur bahasa secara saintifik dan deskriptif.\n- Mengutamakan bahasa lisan berbanding bahasa tulisan (bahasa ialah pertuturan).\n- Mengkaji sistem bahasa mengikut hierarki: Fonem → Morfem → Sintaksis.\n\n3. Teori Linguistik Transformasi Generatif (TG)\n- Dipelopori oleh Noam Chomsky melalui penerbitan Syntactic Structures (1957) dan Aspects of the Theory of Syntax (1965).\n- Mengemukakan konsep bahawa penutur jati memiliki kecekapan bahasa (competence) yang membolehkan mereka menjana bilangan ayat yang tidak terhad daripada rumus yang terhad.\n- Membezakan Struktur Dalaman (Deep Structure) dan Struktur Luaran (Surface Structure)."
            },
            {
                "h": "1.2 Teori Tradisional & Pendekatan Makna",
                "text": "1.2 Teori Tradisional & Pendekatan Makna\n\n📘 Ciri dan Pendekatan Za'ba\n- Za'ba menghuraikan tatabahasa Melayu berlandaskan konsep makna dan fungsi logik ayat.\n- Penggolongan kata didasarkan pada makna nosional: Kata Nama (menamakan benda/orang), Kata Perbuatan (tindakan), Kata Sifat (keadaan), dan Kata Sendi (penyambung).\n- Memberi tumpuan kepada ketepatan gaya bahasa tulisan dan bahasa baku."
            },
            {
                "h": "1.3 Teori Struktural & Bahasa Lisan",
                "text": "1.3 Teori Struktural & Bahasa Lisan\n\n🎙️ Prinsip Bahasa Sebagai Pertuturan\n- Aliran struktural menegaskan bahawa bahasa lisan adalah primer, manakala tulisan hanyalah rakaman sekunder.\n- Hubungan antara penanda (signifier - bunyi/imej akustik) dan petanda (signified - konsep mental) bersifat arbitrar (sewenang-wenangnya).\n- Menekankan analisis konstituen terdekat (Immediate Constituent Analysis) dan kajian fonologi serta morfologi yang ketat."
            },
            {
                "h": "1.4 Teori Transformasi Generatif & Semantik",
                "text": "1.4 Teori Transformasi Generatif & Semantik\n\n🧠 Mentalisme dan Penjanaan Ayat\n- Mengkritik behaviourisme struktural; menegaskan manusia mempunyai keupayaan bawaan (Language Acquisition Device - LAD).\n- Komponen semantik mentafsir makna struktur dalaman, manakala rumus transformasi memetakan struktur dalaman kepada struktur luaran pertuturan."
            }
        ],
        "fokus": "Fokus Peperiksaan: Fahami perbezaan asas antara 3 aliran teori utama (Tradisional = makna/preskriptif; Struktural = deskriptif/lisan/Saussure; Transformasi Generatif = mentalisme/rumus/Chomsky).",
        "summary": "📋 Ringkasan Topik 1:\n- Tiga teori utama: Tradisional (Za'ba), Struktural (Saussure, Bloomfield), Transformasi Generatif (Chomsky).\n- Tradisional mengutamakan makna, tulisan, dan hukum tatabahasa preskriptif.\n- Struktural mengutamakan bahasa lisan, analisis deskriptif mengikut hierarki (fonem-morfem-ayat).\n- Transformasi Generatif menekankan kecekapan berbahasa, LAD, dan penerbitan ayat melalui rumus struktur frasa."
    },
    {
        "title": "Teori Linguistik Tradisional, Struktural dan Transformasi Generatif",
        "keywords": "Kekuatan & kelemahan teori, Panini, Aristotle, Bloomfield, IC Analysis, Competence, Performance.",
        "sections": [
            {
                "h": "2.1 Landasan Falsafah Aliran Tradisional",
                "text": "2.1 Landasan Falsafah Aliran Tradisional\n\n🏛️ Sejarah & Asal Usul\n- Bermula sejak zaman Yunani (Plato & Aristotle), sarjana Sanskrit Panini, dan sarjana Rom (Varro, Priscian).\n- Berpendapat bahasa adalah cerminan akal fikiran dan hukum tatabahasa adalah universal berasaskan logik falsafah.\n- Bahasa Latin dijadikan model tatabahasa ideal untuk menghuraikan semua bahasa lain di dunia."
            },
            {
                "h": "2.2 Ciri Aliran Struktural",
                "text": "2.2 Ciri Aliran Struktural\n\n🔬 Pendekatan Saintifik & Deskriptif\n- Leonard Bloomfield (Language, 1933) menerapkan fahaman behaviourisme (rangsangan-gerak balas) dalam analisis bahasa.\n- Menganalisis bahasa berdasarkan korpus lisan yang wujud secara empirikal tanpa merujuk kepada makna atau intuisi mental penutur.\n- Analisis Konstituen Terdekat (IC Analysis) memotong ayat kepada bahagian konstituen terkecil."
            },
            {
                "h": "2.3 Konsep Kunci Transformasi Generatif",
                "text": "2.3 Konsep Kunci Transformasi Generatif\n\n💡 Dikotomi Chomsky\n- Kecekapan Berbahasa (Competence): Pengetahuan sistem bahasa penutur yang bersifat bawah sedar.\n- Perlakuan Berbahasa (Performance): Penggunaan bahasa sebenar dalam situasi harian (boleh dipengaruhi gangguan ingatan, keletihan, dll).\n- Kreativiti bahasa: Kebolehan menghasilkan dan memahami ayat baharu yang tidak pernah didengar sebelumnya."
            },
            {
                "h": "2.4 Kekuatan dan Kelemahan Aliran",
                "text": "2.4 Kekuatan dan Kelemahan Aliran\n\n⚖️ Perbandingan Kritis\n- Tradisional:\n  + Kekuatan: Panduan tatabahasa jelas (preskriptif), mudah diajar di sekolah.\n  - Kelemahan: Memaksa acuan Latin ke atas bahasa Melayu; mengabaikan variasi lisan.\n- Struktural:\n  + Kekuatan: Kaedah saintifik empirikal, penghuraian fonologi & morfologi sangat terperinci.\n  - Kelemahan: Mengabaikan aspek makna (semantik) dan proses kognitif mental penutur.\n- Transformasi Generatif:\n  + Kekuatan: Menjelaskan hubungan struktur mendalam, fenomena kekaburan ayat (ambiguity), dan kreativiti bahasa.\n  - Kelemahan: Terlalu abstrak, sukar diaplikasikan secara langsung dalam pengajaran murid sekolah rendah."
            }
        ],
        "fokus": "Fokus Peperiksaan: Kuasai perbezaan competence vs performance, konsep IC Analysis, serta kekuatan dan kelemahan setiap teori dalam PdP BM.",
        "summary": "📋 Ringkasan Topik 2:\n- Aliran Tradisional berfalsafah nosional dan preskriptif.\n- Aliran Struktural berfokuskan empirikal-deskriptif dan analisis konstituen terdekat.\n- Aliran TG mengkaji sistem mental penutur jati dan rumus penjanaan ayat.\n- Setiap teori memiliki kekuatan dan batasan tersendiri dalam pengajaran bahasa."
    },
    {
        "title": "Tokoh dan Aliran Linguistik Tempatan",
        "keywords": "Za'ba, Raja Ali Haji, Asmah Haji Omar, Nik Safiah Karim, Ismail Dahaman, korpus bahasa Melayu.",
        "sections": [
            {
                "h": "3.1 Raja Ali Haji: Pelopor Nahu Melayu",
                "text": "3.1 Raja Ali Haji: Pelopor Nahu Melayu\n\n📜 Sumbangan Ulung di Kepulauan Riau\n- Menulis Bustan al-Katibin (1857) dan Kitab Pengetahuan Bahasa (1858).\n- Memanfaatkan acuan nahu bahasa Arab untuk menyusun dan menghuraikan tatabahasa serta leksikografi bahasa Melayu.\n- Menjadi titik tolak penyusunan bahasa Melayu secara ilmiah di nusantara."
            },
            {
                "h": "3.2 Za'ba: Pendeta dan Bapa Tatabahasa Melayu",
                "text": "3.2 Za'ba: Pendeta dan Bapa Tatabahasa Melayu\n\n🖋️ Sumbangan Zainal Abidin Ahmad\n- Menghasilkan karya monumental: Pelita Bahasa Melayu Penggal I, II, dan III (1940-an), Daftar Ejaan Melayu (Jawi-Rumi), Ilmu Mengarang Melayu.\n- Menyusun sistem Ejaan Sekolah (Ejaan Za'ba) yang diguna pakai sehingga pembaharuan Ejaan Bersama 1972.\n- Mengasaskan istilah tatabahasa Melayu seperti kata nama, perbuatan, sifat, sendi, dan ragam ayat."
            },
            {
                "h": "3.3 Profesor Emeritus Dato' Dr. Asmah Haji Omar",
                "text": "3.3 Profesor Emeritus Dato' Dr. Asmah Haji Omar\n\n📚 Tokoh Linguistik Struktural dan Deskriptif\n- Merintis penyelidikan dialektologi, morfologi, sintaksis, dan sosiolinguistik Melayu.\n- Menghasilkan karya agung Nahu Melayu Mutakhir, Morfologi Sintaksis Bahasa Melayu, dan Susur Galur Bahasa Melayu.\n- Mempelopori pendekatan nahu deskriptif berasaskan ciri khas struktur bahasa Melayu tanpa meniru acuan bahasa asing."
            },
            {
                "h": "3.4 Profesor Emeritus Datuk Dr. Nik Safiah Karim",
                "text": "3.4 Profesor Emeritus Datuk Dr. Nik Safiah Karim\n\n🏛️ Penggerak Tatabahasa Baku Kebangsaan\n- Ketua pengarang Tatabahasa Dewan (bersama Farid M. Onn, Hashim Hj. Musa, Abdul Hamid Mahmood).\n- Berperanan besar dalam pembakuan tatabahasa, perancangan korpus bahasa, dan sosiolinguistik di Malaysia."
            }
        ],
        "fokus": "Fokus Peperiksaan: Sumbangan tokoh tempatan, perbandingan karya Za'ba (Pelita Bahasa Melayu), Asmah Omar (Nahu Mutakhir), dan Nik Safiah Karim (Tatabahasa Dewan).",
        "summary": "📋 Ringkasan Topik 3:\n- Raja Ali Haji: nahu Melayu pertama berasaskan acuan Arab.\n- Za'ba: Bapa tatabahasa Melayu moden dengan Pelita Bahasa Melayu.\n- Asmah Haji Omar: pelopor linguistik deskriptif dan nahu Melayu mutakhir.\n- Nik Safiah Karim: arkitek utama pembakuan tatabahasa melalui Tatabahasa Dewan."
    },
    {
        "title": "Tokoh dan Aliran Linguistik Luar Negara",
        "keywords": "Saussure, Bloomfield, Chomsky, Sapir-Whorf, Halliday, Jakobson, linguistik fungsi.",
        "sections": [
            {
                "h": "4.1 Ferdinand de Saussure & Aliran Geneva",
                "text": "4.1 Ferdinand de Saussure & Aliran Geneva\n\n🌐 Konsep Tunjang Strukturalisme\n- Langue (sistem bahasa abstrak masyarakat) vs Parole (ujaran individu).\n- Signifié (konsep mental/petanda) vs Signifiant (citra bunyi/penanda).\n- Sinkronik (kajian bahasa pada satu masa tertentu) vs Diakronik (kajian perkembangan sejarah bahasa merentasi masa).\n- Sintagmatik (hubungan mendatar/linear) vs Paradigmatik (hubungan menegak/pilihan penggantian)."
            },
            {
                "h": "4.2 Leonard Bloomfield & Aliran Amerika",
                "text": "4.2 Leonard Bloomfield & Aliran Amerika\n\n🇺🇸 Strukturalisme Deskriptif & Behaviourisme\n- Menolak mentalisme; berpegang pada positivisme dan tingkah laku yang boleh dilihat (stimulus - response).\n- Menghuraikan bahasa secara mekanistik: fonem, alofon, morfem, alomorf, morfolofonemik.\n- Analisis konstituen terdekat (Immediate Constituent) menggunakan pemotongan binari."
            },
            {
                "h": "4.3 Noam Chomsky & Revolusi Kognitif",
                "text": "4.3 Noam Chomsky & Revolusi Kognitif\n\n⚡ Generatif & Universal Grammar\n- Mengemukakan Tatabahasa Sejagat (Universal Grammar - UG) yang dikongsi oleh semua bahasa manusia.\n- Memperkenalkan rumus struktur frasa (Phrase Structure Rules) dan rumus transformasi (gerakan, penyisipan, pemadaman)."
            },
            {
                "h": "4.4 Sapir, Whorf & M.A.K. Halliday",
                "text": "4.4 Sapir, Whorf & M.A.K. Halliday\n\n🌍 Relativiti Bahasa & Linguistik Sistemik Fungsional\n- Hipotesis Sapir-Whorf: Struktur bahasa mempengaruhi pandangan dunia (worldview) dan corak pemikiran penuturnya.\n- M.A.K. Halliday: Systemic Functional Linguistics (SFL) — bahasa sebagai semiotik sosial dengan tiga metafungsi: Ideasional, Interpersonal, dan Tekstual."
            }
        ],
        "fokus": "Fokus Peperiksaan: Langue vs parole, signifier vs signified, sinkronik vs diakronik, serta tiga metafungsi Halliday.",
        "summary": "📋 Ringkasan Topik 4:\n- Saussure: asas strukturalisme linguistik moden.\n- Bloomfield: pendekatan deskriptif saintifik berasaskan korpus pertuturan.\n- Chomsky: nahu generatif dan keupayaan kognitif bawaan manusia.\n- Halliday: linguistik sistemik fungsional berorientasikan konteks sosial."
    },
    {
        "title": "Kajian Teks Pelita Bahasa Melayu Penggal I",
        "keywords": "Pelita Bahasa Melayu, Za'ba, nosional, penggolongan kata, pembinaan ayat, gaya bahasa.",
        "sections": [
            {
                "h": "5.1 Latar Belakang dan Matlamat Pelita Bahasa",
                "text": "5.1 Latar Belakang dan Matlamat Pelita Bahasa\n\n📖 Karya Monumental Za'ba (1940)\n- Ditulis semasa Za'ba bertugas di Maktab Perguruan Sultan Idris (MPSI) Tanjung Malim.\n- Bertujuan menetapkan asas tatabahasa Melayu baku untuk sekolah-sekolah dan masyarakat umum.\n- Menjadi rujukan utama kurikulum bahasa Melayu selama lebih empat dekad."
            },
            {
                "h": "5.2 Pendekatan Nosional dan Semantik Za'ba",
                "text": "5.2 Pendekatan Nosional dan Semantik Za'ba\n\n🔍 Takrif Bahasa Berasaskan Logik Fikiran\n- Za'ba mendefinisikan nahu sebagai 'undang-undang bagi susunan perkataan pada membina ayat yang betul dan sedap didengar'.\n- Menganalisis perkataan mengikut apa yang dibayangkan dalam minda, bukan semata-mata bentuk fizikalnya."
            },
            {
                "h": "5.3 Klasifikasi Kata dalam Pelita Bahasa I",
                "text": "5.3 Klasifikasi Kata dalam Pelita Bahasa I\n\n🧱 4 Golongan Kata Utama Menurut Za'ba\n1. Nama (Kata Nama): Perkataan yang menyebutkan benda, orang, tempat, atau perkara maknawi.\n2. Perbuatan (Kata Kerja): Perkataan yang menyatakan perbuatan, kejadian, atau hal yang berlaku.\n3. Sifat (Kata Adjektif): Menerangkan sifat atau keadaan bagi nama atau perbuatan.\n4. Sendi (Kata Tugas): Perkataan yang menyambung, menyendikan, atau membantu kata-kata lain dalam ayat."
            },
            {
                "h": "5.4 Penilaian Kritis Teks Pelita Bahasa",
                "text": "5.4 Penilaian Kritis Teks Pelita Bahasa\n\n💡 Kekuatan dan Batasan\n- Kekuatan: Kaya dengan contoh bahasa Melayu tulen, peribahasa, dan huraian makna yang sangat halus.\n- Batasan: Ketiadaan rumus saintifik eksplisit; takrifan nosional kadang-kadang bertindih antara satu golongan dengan yang lain."
            }
        ],
        "fokus": "Fokus Peperiksaan: 4 golongan kata Za'ba, falsafah nahu nosional Za'ba, dan sumbangan Pelita Bahasa Penggal I dalam sejarah pendidikan bahasa Melayu.",
        "summary": "📋 Ringkasan Topik 5:\n- Pelita Bahasa Melayu Penggal I (1940) ialah batu asas tatabahasa Melayu sekolah.\n- Menggunakan pendekatan nahu nosional (makna dan logik fikiran).\n- Menggolongkan kata kepada Nama, Perbuatan, Sifat, dan Sendi."
    },
    {
        "title": "Teks Nahu Melayu Mutakhir Karya Asmah Omar",
        "keywords": "Nahu Melayu Mutakhir, Asmah Haji Omar, deskriptif, sistem morfologi, sintaksis fungsional.",
        "sections": [
            {
                "h": "6.1 Pendekatan Deskriptif Asmah Haji Omar",
                "text": "6.1 Pendekatan Deskriptif Asmah Haji Omar\n\n📘 Falsafah Penulisan Nahu Mutakhir\n- Diterbitkan pertama kali pada tahun 1980 (Dewan Bahasa dan Pustaka).\n- Menggunakan pendekatan deskriptif-struktural dengan mengambil kira data autentik bahasa Melayu moden.\n- Menghuraikan tatabahasa berasaskan struktur dalaman bahasa Melayu tanpa dipaksa mengikut pola bahasa Latin atau Arab."
            },
            {
                "h": "6.2 Analisis Morfologi dalam Nahu Mutakhir",
                "text": "6.2 Analisis Morfologi dalam Nahu Mutakhir\n\n🔬 Morfem dan Pembentukan Kata\n- Menghuraikan morfem terikat (awalan, akhiran, sisipan, apitan) dan morfem bebas secara saintifik.\n- Meneliti alomorf bagi awalan 'meN-' (me-, mem-, men-, meng-, menge-) dan 'peN-' berdasarkan lingkungan fonologi."
            },
            {
                "h": "6.3 Analisis Sintaksis & Klausa",
                "text": "6.3 Analisis Sintaksis & Klausa\n\n📐 Struktur Ayat dan Hubungan Fungsional\n- Membahagikan ayat kepada klausa bebas dan klausa terikat.\n- Mengenal pasti fungsi sintaksis: Subjek, Predikat, Objek, dan Keterangan.\n- Memberikan huraian mendalam tentang sistem ayat pasif bahasa Melayu (pasif diri pertama, kedua, dan ketiga)."
            }
        ],
        "fokus": "Fokus Peperiksaan: Pendekatan deskriptif Asmah Omar, analisis morfem & alomorf, dan pembezaan klausa serta ayat pasif dalam Nahu Melayu Mutakhir.",
        "summary": "📋 Ringkasan Topik 6:\n- Nahu Melayu Mutakhir (1980) menandakan era linguistik deskriptif moden di Malaysia.\n- Menghuraikan morfologi dan sintaksis berdasarkan fakta bahasa Melayu sebenar.\n- Menyediakan analisis saintifik alomorf, imbuhan, dan struktur ayat pasif."
    },
    {
        "title": "Teks Tatabahasa Dewan Edisi Ketiga",
        "keywords": "Tatabahasa Dewan, Nik Safiah Karim, 4 golongan kata, pola ayat dasar, ragam ayat.",
        "sections": [
            {
                "h": "7.1 Kedudukan Tatabahasa Dewan sebagai Rujukan Rasmi",
                "text": "7.1 Kedudukan Tatabahasa Dewan sebagai Rujukan Rasmi\n\n🏛️ Buku Pegangan Tatabahasa Baku Kebangsaan\n- Disusun oleh Nik Safiah Karim, Farid M. Onn, Hashim Hj. Musa, dan Abdul Hamid Mahmood.\n- Menjadi autoriti rasmi pengajaran bahasa Melayu di sekolah, institusi pengajian tinggi, dan urusan pentadbiran kerajaan.\n- Menggabungkan kekuatan aliran struktural dan generatif untuk kegunaan pedagogi."
            },
            {
                "h": "7.2 Empat Golongan Kata Tatabahasa Dewan",
                "text": "7.2 Empat Golongan Kata Tatabahasa Dewan\n\n🧱 Klasifikasi Kata Baku\n1. Kata Nama (Am, Khas, Ganti Nama):\n   - Berfungsi sebagai inti frasa nama yang mengisi subjek dan objek.\n2. Kata Kerja (Transitif dan Tak Transitif):\n   - Menyatakan tindakan; transitif memerlukan objek, tak transitif tidak memerlukan objek (ada yang berpelengkap/tanpa pelengkap).\n3. Kata Adjektif (9 jenis):\n   - Sifatan/keadaan, warna, ukuran, bentuk, pancaindera, waktu, cara, perasaan, jarak.\n4. Kata Tugas (16 jenis subgolongan):\n   - Kata hubung, kata seru, kata tanya, kata perintah, kata sendi nama, kata nafi, kata pemeri, kata penguat, kata bilangan, dll."
            },
            {
                "h": "7.3 Empat Pola Ayat Dasar Bahasa Melayu",
                "text": "7.3 Empat Pola Ayat Dasar Bahasa Melayu\n\n📐 Formula Ayat Asas\n- Pola 1: Frasa Nama + Frasa Nama (FN + FN)\n  Contoh: Encik Ahmad (FN) + guru sekolah (FN).\n- Pola 2: Frasa Nama + Frasa Kerja (FN + FK)\n  Contoh: Kanak-kanak itu (FN) + sedang bermain bola (FK).\n- Pola 3: Frasa Nama + Frasa Adjektif (FN + FA)\n  Contoh: Rumah baharu itu (FN) + sangat besar (FA).\n- Pola 4: Frasa Nama + Frasa Sendi Nama (FN + FS)\n  Contoh: Surat kiriman ini (FN) + daripada ibunya (FS)."
            },
            {
                "h": "7.4 Proses Pembentukan Ayat Terbitan",
                "text": "7.4 Proses Pembentukan Ayat Terbitan\n\n🔄 Tiga Rumus Transformasi\n1. Pengguguran (subjek serupa, frasa predikat, frasa nama mendahului frasa relatif).\n2. Penyusunan Semula (ayat pasif, songsang, penyusunan objek kembar).\n3. Peluasan (peluasan frasa nama, predikat, atau dengan kata hubung)."
            }
        ],
        "fokus": "Fokus Peperiksaan: 4 golongan kata utama, 4 pola ayat dasar (FN+FN, FN+FK, FN+FA, FN+FS), dan proses penerbitan ayat (pengguguran, penyusunan semula, peluasan).",
        "summary": "📋 Ringkasan Topik 7:\n- Tatabahasa Dewan ialah buku nahu rujukan baku tertinggi bahasa Melayu.\n- Mengklasifikasikan kata kepada Kata Nama, Kata Kerja, Kata Adjektif, dan Kata Tugas.\n- Menetapkan 4 pola ayat dasar dan 3 proses transformasi ayat terbitan."
    },
    {
        "title": "Analisis Tatabahasa bagi Pendekatan Wacana",
        "keywords": "Wacana, kohesi nahuan, kohesi leksikal, koheren, CDA, Fairclough, Asmah Omar.",
        "sections": [
            {
                "h": "8.1 Konsep dan Ciri Wacana",
                "text": "8.1 Konsep dan Ciri Wacana\n\n🌐 Unit Bahasa Tertinggi\n- Wacana ialah unit bahasa terlengkap yang melampaui batas ayat, mempunyai kesatuan fikiran dan tujuan komunikasi utuh.\n- Ciri utama wacana: Kohesi (kepaduan bentuk lahiriah) dan Koheren (kesinambungan makna logik)."
            },
            {
                "h": "8.2 Peranti Kohesi Nahuan dan Leksikal",
                "text": "8.2 Peranti Kohesi Nahuan dan Leksikal\n\n🔗 Alat Penghubung Teks\n- Kohesi Nahuan:\n  * Rujukan (kata ganti nama diri, tunjuk: ini, itu, beliau, mereka).\n  * Penggantian (substitusi).\n  * Elipsis (pengguguran unsur yang sudah diketahui).\n  * Konjungsi (kata hubung wacana: selain itu, oleh itu, sehubungan dengan itu).\n- Kohesi Leksikal:\n  * Pengulangan kata sama, sinonim, antonim, hiponim, kolokasi."
            },
            {
                "h": "8.3 Analisis Wacana Kritis (CDA)",
                "text": "8.3 Analisis Wacana Kritis (CDA)\n\n⚖️ Bahasa, Kuasa dan Ideologi\n- Norman Fairclough & Teun van Dijk: Wacana bukan neutral; ia membawa ideologi, hubungan kuasa, dan hegemoni sosial.\n- Kerangka tiga dimensi Fairclough: Teks (analisis linguistik) → Amalan Wacana (proses produksi & konsumsi teks) → Amalan Sosiobudaya (analisis kuasa & masyarakat)."
            }
        ],
        "fokus": "Fokus Peperiksaan: Perbezaan kohesi vs koheren, jenis peranti kohesi (nahuan vs leksikal), dan kerangka tiga dimensi Analisis Wacana Kritis Fairclough.",
        "summary": "📋 Ringkasan Topik 8:\n- Wacana adalah hierarki linguistik tertinggi selepas wacana > ayat > klausa > frasa > perkataan > morfem > fonem.\n- Kohesi menjamin keselarasan tatabahasa dan kosa kata; koheren menjamin keselarasan idea.\n- Analisis Wacana Kritis (CDA) mengkaji hubungan antara bahasa, ideologi dan kuasa sosial."
    },
    {
        "title": "Medan Makna",
        "keywords": "Semantik leksikal, hubungan makna, medan makna, analisis komponen makna, hiponim, sinonim.",
        "sections": [
            {
                "h": "9.1 Teori Medan Makna (Semantic Field Theory)",
                "text": "9.1 Teori Medan Makna (Semantic Field Theory)\n\n🗺️ Struktur Ruang Leksikal\n- Dipelopori oleh Jost Trier (1931) dan dikembangkan oleh Adrienne Lehrer.\n- Perbendaharaan kata sesuatu bahasa bukanlah senarai kata rawak, tetapi tersusun dalam jaringan medan makna saling berhubung (cth: medan makna warna, medan makna masakan, medan makna kekeluargaan).\n- Perubahan makna pada satu perkataan dalam medan makna akan memberi kesan kepada batas makna perkataan lain di sekitarnya."
            },
            {
                "h": "9.2 Hubungan Makna Leksikal",
                "text": "9.2 Hubungan Makna Leksikal\n\n🔗 Hubungan Antara Kata\n- Sinonim: Kesamaan atau kehampiran makna (cantik – jelita, pintar – cerdik).\n- Antonim: Pertentangan makna (hidup – mati [binari], besar – kecil [berperingkat], beli – jual [kebalikan]).\n- Hiponim: Hubungan pengkhususan dan hierarki (mawar, melati, melur ialah hiponim kepada hipernim 'bunga').\n- Homonim: Bentuk ejaan dan sebutan sama tetapi makna berbeza sama sekali (ketam = haiwan / alat mengetam).\n- Polisemik: Satu perkataan mempunyai pelbagai makna berkaitan (kaki = anggota badan / kaki bukit / kaki meja)."
            },
            {
                "h": "9.3 Analisis Komponen Makna (Componential Analysis)",
                "text": "9.3 Analisis Komponen Makna (Componential Analysis)\n\n🔬 Pemecahan Fitur Makna Semantik\n- Menganalisis makna kata kepada fitur binari [+ / -]:\n  * Lelaki: [+insan, +dewasa, +lelaki]\n  * Wanita: [+insan, +dewasa, -lelaki]\n  * Kanak-kanak: [+insan, -dewasa, ±lelaki]\n  * Anak lembu: [-insan, -dewasa, ±jantan]\n- Membantu menjelaskan ketepatan pemilihan kata dalam pengajaran bahasa."
            }
        ],
        "fokus": "Fokus Peperiksaan: Konsep medan makna Trier, hubungan leksikal (sinonim, antonim, hiponim, homonim, polisemi), dan analisis komponen makna fitur binari.",
        "summary": "📋 Ringkasan Topik 9:\n- Medan makna menstruktur kosa kata ke dalam kelompok semantik bersepadu.\n- Hubungan leksikal merangkumi sinonim, antonim, hiponim, homonim, dan polisemik.\n- Analisis komponen makna memecahkan kata kepada fitur distingtif [+ / -] semantik."
    },
    {
        "title": "Aplikasi Teori Linguistik dalam Pendidikan Bahasa",
        "keywords": "Aplikasi teori, PdP Bahasa Melayu, kaedah tatabahasa terjemahan, kaedah audiolingual, kaedah komunikatif.",
        "sections": [
            {
                "h": "10.1 Aplikasi Aliran Teori dalam Kaedah Pengajaran",
                "text": "10.1 Aplikasi Aliran Teori dalam Kaedah Pengajaran\n\n🎓 Jambatan Teori ke Bilik Darjah\n1. Aplikasi Teori Tradisional → Kaedah Tatabahasa Terjemahan (Grammar Translation Method):\n   - Menekankan penghafalan rumus nahu, hukum preskriptif, dan kemahiran membaca teks bertulis.\n2. Aplikasi Teori Struktural → Kaedah Dengar dan Sebut (Audiolingual Method):\n   - Pembelajaran bahasa sebagai pembentukan tabiat (habit formation) melalui latih tubi pola (pattern drills), peneguhan, dan keutamaan bahasa lisan.\n3. Aplikasi Teori Transformasi Generatif → Kaedah Kognitif & Komunikatif:\n   - Mengaktifkan keupayaan mental semula jadi murid untuk menjana ayat bermakna dalam konteks autentik."
            },
            {
                "h": "10.2 Pendekatan Pengajaran Tatabahasa: Induktif vs Deduktif",
                "text": "10.2 Pendekatan Pengajaran Tatabahasa: Induktif vs Deduktif\n\n⚙️ Strategi Pedagogi Berkesan\n- Pendekatan Deduktif (Rumus → Contoh):\n  * Guru menerangkan hukum tatabahasa terlebih dahulu, diikuti dengan contoh dan latihan.\n  * Sesuai untuk murid peringkat menengah atau konsep tatabahasa abstrak.\n- Pendekatan Induktif (Contoh → Rumus):\n  * Guru menyajikan pelbagai contoh ayat autentik, murid memerhati corak dan membuat generalisasi rumus sendiri.\n  * Lebih berpusatkan murid dan menggalakkan pemikiran kritis."
            }
        ],
        "fokus": "Fokus Peperiksaan: Memadankan teori linguistik dengan kaedah pengajaran (Tradisional-Terjemahan, Struktural-Audiolingual, TG-Komunikatif), serta pendekatan induktif vs deduktif.",
        "summary": "📋 Ringkasan Topik 10:\n- Teori linguistik menjadi asas pembinaan kaedah dan teknik pengajaran bahasa Melayu.\n- Pengajaran tatabahasa boleh disampaikan secara induktif (contoh kepada rumus) atau deduktif (rumus kepada contoh).\n- Pendekatan komunikatif menyepadukan ketepatan tatabahasa dengan kelancaran komunikasi."
    }
]

# Quizzes: 5 questions per topic (50 questions)
quizzes = {
    "t1": [
        {"q": "Siapakah yang digelar sebagai 'Bapa Tatabahasa Bahasa Melayu' dan merupakan tokoh utama Teori Tradisional tempatan?", "opts": ["Noam Chomsky", "Ferdinand de Saussure", "Zainal Abidin Ahmad (Za'ba)", "Raja Ali Haji"], "a": 2, "fb": "Za'ba digelar Bapa Tatabahasa Bahasa Melayu kerana sumbangan monumentalnya melalui Pelita Bahasa Melayu."},
        {"q": "Aliran linguistik manakah yang menegaskan bahawa bahasa lisan adalah primer manakala bahasa tulisan hanyalah rakaman sekunder?", "opts": ["Teori Tradisional", "Teori Struktural", "Teori Mentalis", "Teori Rasionalis"], "a": 1, "fb": "Aliran Struktural (Saussure & Bloomfield) mengutamakan bahasa pertuturan/lisan sebagai objek kajian primer."},
        {"q": "Apakah konsep utama yang dikemukakan oleh Noam Chomsky dalam Teori Transformasi Generatif?", "opts": ["Hubungan arbitrar antara penanda dan petanda", "Kecekapan bahasa (competence) dan perlakuan bahasa (performance)", "Pendekatan nosional dan preskriptif", "Pembentukan tabiat melalui latih tubi"], "a": 1, "fb": "Chomsky memperkenalkan dikotomi kecekapan berbahasa (competence) dan perlakuan bahasa (performance)."},
        {"q": "Karya manakah yang ditulis oleh Ferdinand de Saussure dan dianggap sebagai asas linguistik moden?", "opts": ["Syntactic Structures", "Course in General Linguistics", "Pelita Bahasa Melayu", "Bustan al-Katibin"], "a": 1, "fb": "Course in General Linguistics (1916) karya Ferdinand de Saussure mengasaskan linguistik struktural moden."},
        {"q": "Pendekatan Teori Tradisional dalam menghuraikan tatabahasa dikenali sebagai:", "opts": ["Pendekatan nosional dan berasaskan makna", "Pendekatan deskriptif empirikal", "Pendekatan transformasi rumus struktur frasa", "Pendekatan analisis wacana kritis"], "a": 0, "fb": "Nahu tradisional menghuraikan tatabahasa berasaskan makna nosional dan logik falsafah."}
    ],
    "t2": [
        {"q": "Leonard Bloomfield menerapkan fahaman psikologi manakah dalam analisis linguistik struktural?", "opts": ["Kognitivisme", "Behaviourisme", "Humanisme", "Konstruktivisme"], "a": 1, "fb": "Bloomfield menggunakan behaviourisme (rangsangan-gerak balas) dan menolak mentalisme."},
        {"q": "Teknik analisis sintaksis yang memotong ayat secara berpasangan kepada unit konstituen terkecil dikenali sebagai:", "opts": ["Analisis Wacana", "Analisis Komponen Makna", "Analisis Konstituen Terdekat (IC Analysis)", "Analisis Semantik Kolokasi"], "a": 2, "fb": "Immediate Constituent Analysis (IC Analysis) adalah teknik teras aliran struktural untuk memotong bahagian konstituen ayat."},
        {"q": "Apakah yang dimaksudkan dengan 'Language Acquisition Device' (LAD) menurut Noam Chomsky?", "opts": ["Alat bantu mengajar elektronik di makmal bahasa", "Mekanisme kognitif bawaan semula jadi pada manusia untuk menguasai bahasa", "Buku kamus nahu dwibahasa", "Sistem saraf pendengaran untuk meniru bunyi"], "a": 1, "fb": "LAD ialah keupayaan kognitif semula jadi bawaan manusia untuk memperoleh tatabahasa bahasa pertama."},
        {"q": "Kelemahan utama Teori Linguistik Tradisional ialah:", "opts": ["Terlalu menekankan aspek semantik sehingga mengabaikan fonetik", "Memaksa kerangka dan hukum tatabahasa Latin ke atas bahasa bukan Latin", "Menolak kajian bahasa bertulis", "Hanya mengkaji bahasa orang asli Amerika"], "a": 1, "fb": "Nahu tradisional sering memaksakan kerangka nahu Yunani-Latin ke atas bahasa lain termasuk bahasa Melayu."},
        {"q": "Apakah perbezaan utama antara kajian bahasa sinkronik dan diakronik?", "opts": ["Sinkronik mengkaji bahasa lisan, diakronik mengkaji bahasa tulisan", "Sinkronik mengkaji bahasa pada satu masa tertentu, diakronik mengkaji perkembangan bahasa merentasi sejarah", "Sinkronik untuk dialek, diakronik untuk bahasa baku", "Sinkronik berasaskan makna, diakronik berasaskan fonetik"], "a": 1, "fb": "Kajian sinkronik memfokuskan keadaan bahasa pada satu titik masa, manakala diakronik merentasi garis sejarah masa."}
    ],
    "t3": [
        {"q": "Karya tatabahasa Melayu terawal yang disusun oleh Raja Ali Haji pada tahun 1857 ialah:", "opts": ["Pelita Bahasa Melayu", "Kitab Pengetahuan Bahasa", "Bustan al-Katibin", "Nahu Melayu Mutakhir"], "a": 2, "fb": "Bustan al-Katibin (1857) ditulis oleh Raja Ali Haji menggunakan acuan nahu bahasa Arab."},
        {"q": "Sumbangan terbesar Za'ba kepada sistem persekolahan Melayu sebelum Perang Dunia Kedua ialah:", "opts": ["Memperkenalkan Tatabahasa Dewan", "Menyusun sistem Ejaan Sekolah (Ejaan Za'ba) dan Pelita Bahasa Melayu", "Mencipta tulisan Jawi", "Mengasaskan Universiti Kebangsaan Malaysia"], "a": 1, "fb": "Za'ba menyusun Pelita Bahasa Melayu dan Daftar Ejaan Melayu (Ejaan Sekolah Za'ba)."},
        {"q": "Profesor Emeritus Dato' Dr. Asmah Haji Omar terkenal dengan pendekatan kajian bahasa yang bersifat:", "opts": ["Preskriptif dan nosional", "Deskriptif struktural berasaskan bahasa Melayu sebenar", "Terjemahan nahu bahasa Arab semata-mata", "Pengabaian aspek fonologi"], "a": 1, "fb": "Asmah Omar terkenal dengan penghuraian linguistik deskriptif moden tanpa meniru acuan bahasa asing."},
        {"q": "Buku rujukan tatabahasa baku utama di Malaysia yang diketuai oleh Profesor Emeritus Datuk Dr. Nik Safiah Karim ialah:", "opts": ["Pelita Bahasa Melayu Penggal I", "Nahu Melayu Mutakhir", "Tatabahasa Dewan", "Kamus Dewan"], "a": 2, "fb": "Tatabahasa Dewan merupakan karya rujukan tatabahasa baku rasmi di Malaysia."},
        {"q": "Apakah fokus utama karya Za'ba 'Ilmu Mengarang Melayu'?", "opts": ["Panduan penulisan perenggan, gaya bahasa, kiasan, dan retorik Melayu", "Senarai istilah sains moden", "Kamus kata pinjaman bahasa Inggeris", "Hukum tajwid bahasa Melayu"], "a": 0, "fb": "Ilmu Mengarang Melayu membimbing seni penulisan, karang-mengarang, dan stilistik bahasa Melayu."}
    ],
    "t4": [
        {"q": "Ferdinand de Saussure membezakan antara sistem bahasa abstrak masyarakat dengan ujaran individu. Konsep ini dipanggil:", "opts": ["Signifier dan Signified", "Langue dan Parole", "Competence dan Performance", "Sinkronik dan Diakronik"], "a": 1, "fb": "Langue merujuk kepada sistem bahasa abstrak komuniti, manakala Parole ialah pertuturan individu."},
        {"q": "Apakah intipati Hipotesis Sapir-Whorf?", "opts": ["Bahasa dicipta melalui rangsangan dan tindak balas mekanikal", "Struktur bahasa membentuk dan mempengaruhi cara penuturnya melihat dunia dan berfikir", "Semua bahasa di dunia berasal daripada satu bahasa induk Sanskrit", "Bahasa tulisan mendahului bahasa lisan dalam perkembangan kognitif"], "a": 1, "fb": "Hipotesis relativiti linguistik Sapir-Whorf menyatakan bahasa mempengaruhi cara penutur memandang realiti."},
        {"q": "M.A.K. Halliday mengasaskan aliran linguistik yang dikenali sebagai:", "opts": ["Linguistik Transformasi Generatif", "Linguistik Struktural Amerika", "Linguistik Sistemik Fungsional (SFL)", "Linguistik Komparatif"], "a": 2, "fb": "M.A.K. Halliday mengasaskan Systemic Functional Linguistics (SFL) yang melihat bahasa sebagai semiotik sosial."},
        {"q": "Menurut M.A.K. Halliday, tiga metafungsi bahasa ialah:", "opts": ["Fonologi, Morfologi, Sintaksis", "Ideasional, Interpersonal, Tekstual", "Subjek, Predikat, Objek", "Makna, Bentuk, Bunyi"], "a": 1, "fb": "Tiga metafungsi bahasa Halliday ialah fungsi Ideasional, Interpersonal, dan Tekstual."},
        {"q": "Hubungan antara perkataan yang boleh saling menggantikan pada paksi menegak dalam tatabahasa Saussure disebut hubungan:", "opts": ["Sintagmatik", "Paradigmatik", "Diakronik", "Arbitrar"], "a": 1, "fb": "Hubungan paradigmatik ialah hubungan pilihan penggantian pada paksi menegak (associative/paradigmatic)."}
    ],
    "t5": [
        {"q": "Apakah empat golongan kata utama menurut Za'ba dalam Pelita Bahasa Melayu Penggal I?", "opts": ["Kata Nama, Kata Kerja, Kata Adjektif, Kata Tugas", "Nama, Perbuatan, Sifat, Sendi", "Isim, Fi'il, Huruf, Zaraf", "Kata Tunggal, Kata Terbitan, Kata Majmuk, Kata Ganda"], "a": 1, "fb": "Za'ba membahagikan perkataan kepada empat golongan: Nama, Perbuatan, Sifat, dan Sendi."},
        {"q": "Za'ba mendefinisikan 'Nahu' sebagai:", "opts": ["Kajian terhadap gelombang bunyi bahasa pertuturan", "Undang-undang bagi susunan perkataan pada membina ayat yang betul dan sedap didengar", "Himpunan kosa kata dan kamus bahasa Melayu", "Simbol tulisan yang merakamkan ujaran manusia"], "a": 1, "fb": "Definisi masyhur Za'ba: nahu ialah undang-undang susunan perkataan untuk menghasilkan ayat betul dan sedap didengar."},
        {"q": "Dalam Pelita Bahasa I, perkataan yang menyatakan perbuatan, hal, atau kejadian dikelaskan di bawah:", "opts": ["Kata Nama", "Kata Perbuatan", "Kata Sifat", "Kata Sendi"], "a": 1, "fb": "Kata Perbuatan merujuk kepada tindakan, kelakuan, atau keadaan yang berlaku."},
        {"q": "Apakah yang dimaksudkan dengan 'Pendekatan Nosional' dalam analisis Za'ba?", "opts": ["Menilai perkataan berasaskan maknanya dalam akal dan fungsi logik fikiran", "Mengukur panjang gelombang frekuensi bunyi perkataan", "Mengira bilangan huruf vokal dan konsonan", "Menolak makna dan mengkaji distribusi fonem"], "a": 0, "fb": "Pendekatan nosional Za'ba berpandukan makna perkataan dalam pemikiran."},
        {"q": "Kelebihan utama teks Pelita Bahasa Melayu Penggal I ialah:", "opts": ["Menggunakan analisis rumus matematik terkini", "Kaya dengan contoh ayat asli Melayu yang indah dan peribahasa bernilai tinggi", "Tidak mengandungi istilah tatabahasa langsung", "Menghapuskan perbezaan antara bahasa lisan dan tulisan"], "a": 1, "fb": "Pelita Bahasa kaya dengan contoh autentik, peribahasa, dan kehalusan gaya bahasa Melayu tulen."}
    ],
    "t6": [
        {"q": "Teks Nahu Melayu Mutakhir karya Asmah Haji Omar mula diterbitkan pada tahun:", "opts": ["1957", "1972", "1980", "2008"], "a": 2, "fb": "Nahu Melayu Mutakhir mula diterbitkan oleh Dewan Bahasa dan Pustaka pada tahun 1980."},
        {"q": "Apakah pendekatan yang diutamakan oleh Asmah Haji Omar dalam karya Nahu Melayu Mutakhir?", "opts": ["Pendekatan nosional Latin", "Pendekatan deskriptif berasaskan fakta struktur bahasa Melayu sebenar", "Pendekatan nahu terjemahan Inggeris", "Pendekatan preskriptif klasik"], "a": 1, "fb": "Asmah Omar menggunakan pendekatan deskriptif saintifik yang berpijak pada struktur bahasa Melayu."},
        {"q": "Bentuk awalan seperti 'me-', 'mem-', 'men-', 'meng-', dan 'menge-' dihuraikan oleh Asmah sebagai:", "opts": ["Morfem bebas", "Alofon bagi fonem vokal", "Alomorf bagi morfem awalan meN-", "Kata tugas penyambung ayat"], "a": 2, "fb": "Bentuk-bentuk ini ialah alomorf iaitu variasi bentuk bagi satu morfem terikat meN- berdasarkan lingkungan fonologi."},
        {"q": "Bagaimanakah Asmah Omar membahagikan kategori klausa dalam sintaksis bahasa Melayu?", "opts": ["Klausa bebas dan klausa terikat", "Klausa pendek dan klausa panjang", "Klausa bersuara dan tidak bersuara", "Klausa atas dan klausa bawah"], "a": 0, "fb": "Klausa dibahagikan kepada klausa bebas (boleh berdiri sendiri sebagai ayat) dan klausa terikat."},
        {"q": "Apakah sumbangan Nahu Melayu Mutakhir kepada pengajaran tatabahasa moden?", "opts": ["Menghapuskan penggunaan imbuhan dalam bahasa Melayu", "Memberikan huraian saintifik dan deskriptif tentang morfologi dan sintaksis bahasa Melayu", "Menolak penggunaan bahasa Melayu baku di sekolah", "Menggantikan tulisan Rumi dengan Jawi sepenuhnya"], "a": 1, "fb": "Karya ini menyediakan kerangka deskriptif saintifik yang mantap untuk kajian dan pengajaran BM moden."}
    ],
    "t7": [
        {"q": "Empat golongan kata rasmi dalam Tatabahasa Dewan Edisi Ketiga ialah:", "opts": ["Nama, Perbuatan, Sifat, Sendi", "Kata Nama, Kata Kerja, Kata Adjektif, Kata Tugas", "Kata Dasar, Kata Terbitan, Kata Majmuk, Kata Ganda", "Kata Utama, Kata Bantu, Kata Penguat, Kata Penegas"], "a": 1, "fb": "Tatabahasa Dewan membahagikan perkataan kepada Kata Nama, Kata Kerja, Kata Adjektif, dan Kata Tugas."},
        {"q": "Ayat 'Kanak-kanak itu sedang berenang di kolam' tergolong dalam pola ayat dasar manakah?", "opts": ["Pola 1 (FN + FN)", "Pola 2 (FN + FK)", "Pola 3 (FN + FA)", "Pola 4 (FN + FS)"], "a": 1, "fb": "Pola 2: Subjek Kanak-kanak itu (FN) + Predikat sedang berenang di kolam (FK)."},
        {"q": "Pola ayat dasar FN + FS ditunjukkan dalam contoh ayat:", "opts": ["Adik saya sangat comel.", "Encik Razak pengurus bank.", "Surat itu daripada peguam.", "Burung itu terbang tinggi."], "a": 2, "fb": "'Surat itu' (FN) + 'daripada peguam' (FS - Frasa Sendi Nama)."},
        {"q": "Apakah tiga proses utama penerbitan ayat menurut Tatabahasa Dewan?", "opts": ["Pencantuman, Pemisahan, Pemadaman", "Pengguguran, Penyusunan Semula, Peluasan", "Pengimbuhan, Penggandaan, Pemajmukan", "Penegasan, Penafian, Penyoalan"], "a": 1, "fb": "Tiga proses transformasi ayat terbitan ialah Pengguguran, Penyusunan Semula, dan Peluasan."},
        {"q": "Kata sendi nama, kata hubung, kata pemeri, dan kata seru tergolong dalam golongan kata:", "opts": ["Kata Nama", "Kata Kerja", "Kata Adjektif", "Kata Tugas"], "a": 3, "fb": "Kata-kata tersebut merupakan subgolongan di bawah Kata Tugas yang tidak dapat menjadi inti frasa utama."}
    ],
    "t8": [
        {"q": "Dua ciri utama yang mesti wujud untuk membentuk sebuah wacana yang utuh ialah:", "opts": ["Fonem dan alofon", "Kohesi dan koheren", "Morfem dan kata dasar", "Subjek dan predikat"], "a": 1, "fb": "Wacana utuh memerlukan kohesi (keserasian hubungan tatabahasa) dan koheren (kesinambungan makna)."},
        {"q": "Penggunaan kata hubung seperti 'namun demikian', 'selain itu', dan 'oleh hal yang demikian' tergolong dalam peranti:", "opts": ["Kohesi Nahuan (Konjungsi)", "Kohesi Leksikal (Sinonim)", "Elipsis fonologi", "Asimilasi bunyi"], "a": 0, "fb": "Konjungsi antara perenggan atau kalimat merupakan peranti kohesi nahuan yang menyambungkan idea wacana."},
        {"q": "Kerangka Analisis Wacana Kritis (CDA) yang dikemukakan oleh Norman Fairclough mengandungi tiga dimensi iaitu:", "opts": ["Fonetik, Fonologi, Morfologi", "Teks, Amalan Wacana, Amalan Sosiobudaya", "Sintaksis, Semantik, Pragmatik", "Pengarang, Pembaca, Pencetak"], "a": 1, "fb": "Fairclough membahagikan CDA kepada Teks (analisis linguistik), Amalan Wacana, dan Amalan Sosiobudaya."},
        {"q": "Apakah perbezaan utama antara kohesi dan koheren?", "opts": ["Kohesi melibatkan hubungan bentuk lahiriah teks, manakala koheren melibatkan keselarasan makna dalam fikiran", "Kohesi untuk teks lisan, koheren untuk teks tulisan", "Kohesi dikaji dalam fonetik, koheren dikaji dalam morfologi", "Kohesi tidak memerlukan tatabahasa manakala koheren memerlukan tanda baca"], "a": 0, "fb": "Kohesi ialah keterikatan bentuk lahiriah ayat; koheren ialah keterikatan makna fikiran pembaca/pendengar."},
        {"q": "Contoh peranti kohesi leksikal jenis kolokasi ialah:", "opts": ["Dia – beliau", "Hujan – lebat", "Pergi – kembali", "Rumah – bangunan"], "a": 1, "fb": "'Hujan lebat' ialah kolokasi (perkataan yang lazim hadir bersama secara alami dalam bahasa)."}
    ],
    "t9": [
        {"q": "Teori Medan Makna diasaskan oleh tokoh linguistik semantik bernama:", "opts": ["Noam Chomsky", "Jost Trier", "Leonard Bloomfield", "Edward Sapir"], "a": 1, "fb": "Jost Trier (1931) mengemukakan Teori Medan Makna (Bedeutungsfeld)."},
        {"q": "Perkataan 'kerusi', 'meja', 'almari', dan 'katil' tergolong dalam medan makna yang sama iaitu:", "opts": ["Alat tulis", "Perabot rumah", "Peralatan dapur", "Bahan binaan"], "a": 1, "fb": "Semua perkataan tersebut berkongsi medan makna leksikal yang sama iaitu perabot."},
        {"q": "Hubungan semantik antara kata umum 'haiwan' dengan kata khusus 'kucing', 'harimau', dan 'kambing' disebut:", "opts": ["Sinonim", "Antonim", "Hiponim dan Hipernim", "Homonim"], "a": 2, "fb": "'Haiwan' ialah hipernim (superordinate), manakala kucing/harimau/kambing ialah hiponim."},
        {"q": "Analisis yang memecahkan perkataan kepada ciri semantik binari [+ / -] dikenali sebagai:", "opts": ["Analisis Wacana Kritis", "Analisis Komponen Makna (Componential Analysis)", "Analisis Konstituen Terdekat", "Analisis Dialektologi"], "a": 1, "fb": "Componential analysis memecahkan makna kepada fitur binari seperti [+dewasa, +lelaki, +insan]."},
        {"q": "Perkataan 'bisa' yang bermaksud 'racun ular' dan 'bisa' yang bermaksud 'boleh/dapat' merupakan contoh fenomena:", "opts": ["Sinonim", "Antonim", "Homonim", "Hiponim"], "a": 2, "fb": "Homonim ialah dua kata yang sama ejaan dan sebutan tetapi membawa makna yang berbeza sama sekali tanpa hubungan sejarah."}
    ],
    "t10": [
        {"q": "Kaedah Tatabahasa Terjemahan (Grammar Translation Method) merupakan aplikasi langsung daripada aliran:", "opts": ["Teori Linguistik Tradisional", "Teori Linguistik Struktural", "Teori Transformasi Generatif", "Teori Sosiobudaya"], "a": 0, "fb": "Kaedah Tatabahasa Terjemahan lahir daripada tradisi nahu klasik Tradisional."},
        {"q": "Kaedah Dengar dan Sebut (Audiolingual Method) yang mementingkan latih tubi pola dan sebutan lisan dipengaruhi oleh:", "opts": ["Linguistik Struktural dan Psikologi Behaviourisme", "Linguistik Tradisional dan Falsafah Rasionalisme", "Linguistik Transformasi Generatif dan Kognitivisme", "Semantik Medan Makna"], "a": 0, "fb": "Kaedah audiolingual merupakan gabungan linguistik struktural Bloomfield dan psikologi behaviourisme Skinner."},
        {"q": "Apakah kelebihan utama pengajaran tatabahasa secara induktif?", "opts": ["Murid menghafal rumus dengan pantas tanpa perlu berfikir", "Murid membina kefahaman sendiri dengan menganalisis contoh-contoh ayat sebelum merumuskan konsep", "Guru menjimatkan masa kerana hanya membaca nota", "Murid tidak perlu membuat latihan bertulis"], "a": 1, "fb": "Pendekatan induktif (contoh → generalisasi rumus) membina pemikiran kritis dan pemahaman mendalam murid."},
        {"q": "Pendekatan Komunikatif dalam pendidikan bahasa menekankan:", "opts": ["Ketepatan rumus nahu semata-mata dalam kertas peperiksaan", "Keupayaan menggunakan bahasa secara bermakna dan tepat mengikut konteks komunikasi sebenar", "Penghafalan teks sastera klasik", "Pengasingan sepenuhnya antara kemahiran mendengar dan bertutur"], "a": 1, "fb": "Pendekatan komunikatif mengutamakan kecekapan komunikatif (penggunaan bahasa bermakna dalam situasi sebenar)."},
        {"q": "Dalam pendekatan deduktif pengajaran tatabahasa, langkah pertama guru ialah:", "opts": ["Meminta murid mencipta sajak", "Menyatakan dan menerangkan rumus atau hukum tatabahasa", "Memberi murid tugasan kumpulan tanpa bimbingan", "Mengadakan kuiz spontan tanpa penjelasan"], "a": 1, "fb": "Pendekatan deduktif bermula dengan penjelasan rumus/konsep tatabahasa diikuti aplikasi melalui contoh."}
    ]
}

# Flashcards: 30 items
flashcards = [
    {"q": "Apakah maksud linguistik?", "a": "Kajian saintifik tentang bahasa, merangkumi bunyi (fonetik/fonologi), pembentukan kata (morfologi), susunan ayat (sintaksis), dan makna (semantik)."},
    {"q": "Siapakah Bapa Linguistik Moden?", "a": "Ferdinand de Saussure, pengasas aliran strukturalisme melalui buku 'Course in General Linguistics' (1916)."},
    {"q": "Siapakah tokoh nahu tradisional terulung di Malaysia?", "a": "Zainal Abidin Ahmad (Za'ba), pengarang buku monumental 'Pelita Bahasa Melayu' (1940)."},
    {"q": "Bezakan Langue dan Parole.", "a": "Langue ialah sistem bahasa abstrak yang dikongsi bersama oleh masyarakat penutur. Parole ialah pertuturan sebenar oleh individu."},
    {"q": "Apakah signifier dan signified menurut Saussure?", "a": "Signifier (penanda) ialah imej bunyi atau lambang visual. Signified (petanda) ialah konsep mental yang dirujuk. Hubungan keduanya bersifat arbitrar."},
    {"q": "Apakah intipati Teori Transformasi Generatif Chomsky?", "a": "Bahasa dijana melalui rumus mental bawaan (LAD) yang membolehkan penerbitan ayat tanpa had berasaskan struktur dalaman dan luaran."},
    {"q": "Bezakan Competence dan Performance.", "a": "Competence ialah kecekapan pengetahuan tatabahasa bawah sedar penutur jati. Performance ialah perlakuan penggunaan bahasa sebenar dalam konteks harian."},
    {"q": "Apakah Analisis Konstituen Terdekat (IC Analysis)?", "a": "Kaedah aliran struktural memotong ayat secara binari kepada bahagian-bahagian konstituen terkecil sehingga ke peringkat morfem."},
    {"q": "Sebutkan 4 golongan kata menurut Za'ba.", "a": "1. Kata Nama\n2. Kata Perbuatan\n3. Kata Sifat\n4. Kata Sendi"},
    {"q": "Sebutkan 4 golongan kata mengikut Tatabahasa Dewan.", "a": "1. Kata Nama\n2. Kata Kerja\n3. Kata Adjektif\n4. Kata Tugas"},
    {"q": "Apakah 4 pola ayat dasar bahasa Melayu?", "a": "Pola 1: FN + FN\nPola 2: FN + FK\nPola 3: FN + FA\nPola 4: FN + FS"},
    {"q": "Sebutkan 3 proses penerbitan ayat menurut Tatabahasa Dewan.", "a": "1. Pengguguran (deletion)\n2. Penyusunan Semula (reordering)\n3. Peluasan (expansion)"},
    {"q": "Apakah sumbangan Raja Ali Haji dalam linguistik Melayu?", "a": "Menulis 'Bustan al-Katibin' (1857) dan 'Kitab Pengetahuan Bahasa' (1858) berasaskan kerangka nahu bahasa Arab."},
    {"q": "Apakah keistimewaan pendekatan nahu Asmah Haji Omar?", "a": "Bersifat deskriptif saintifik, berasaskan data autentik bahasa Melayu moden tanpa terikat dengan acuan Latin atau Arab."},
    {"q": "Apakah definisi wacana?", "a": "Unit bahasa terlengkap yang melampaui batas ayat, mempunyai kesatuan fikiran dan tujuan komunikasi yang utuh."},
    {"q": "Bezakan Kohesi dan Koheren.", "a": "Kohesi ialah kepaduan hubungan bentuk lahiriah tatabahasa dan leksikal teks. Koheren ialah kesinambungan dan kepaduan makna fikiran."},
    {"q": "Apakah 4 jenis peranti kohesi nahuan?", "a": "1. Rujukan (referens)\n2. Penggantian (substitusi)\n3. Pengguguran (elipsis)\n4. Konjungsi (kata hubung wacana)"},
    {"q": "Apakah tiga dimensi Analisis Wacana Kritis (CDA) Fairclough?", "a": "1. Analisis Teks (linguistik)\n2. Analisis Amalan Wacana (produksi teks)\n3. Analisis Amalan Sosiobudaya (kuasa & ideologi)"},
    {"q": "Apakah maksud Medan Makna (Semantic Field)?", "a": "Pengelompokan kata-kata dalam sesuatu bahasa ke dalam sistem atau jaringan makna yang saling berkait rapat (Jost Trier)."},
    {"q": "Apakah hubungan sinonim dan antonim?", "a": "Sinonim ialah kesamaan atau kehampiran makna antara perkataan. Antonim ialah pertentangan makna antara dua perkataan."},
    {"q": "Jelaskan konsep Hiponim dan Hipernim.", "a": "Hipernim ialah kata umum/payung (cth: burung). Hiponim ialah kata khusus di bawah hipernim (cth: merpati, helang, pipit)."},
    {"q": "Apakah Homonim dan Polisemik?", "a": "Homonim: ejaan & sebutan sama tetapi makna berlainan sama sekali (cth: buku). Polisemi: satu kata mempunyai banyak makna yang berkaitan (cth: kaki)."},
    {"q": "Apakah Analisis Komponen Makna (Componential Analysis)?", "a": "Kaedah menghuraikan makna kata melalui fitur-fitur semantik distingtif binari [+ / -] (cth: [+dewasa, +insan, +lelaki])."},
    {"q": "Apakah Kaedah Tatabahasa Terjemahan (Grammar Translation)?", "a": "Kaedah pengajaran bahasa berasaskan nahu tradisional yang menekankan hafalan rumus nahu preskriptif dan terjemahan teks bertulis."},
    {"q": "Apakah Kaedah Dengar dan Sebut (Audiolingual)?", "a": "Kaedah berakar daripada linguistik struktural dan behaviourisme yang menekankan pembentukan tabiat melalui latih tubi pola pertuturan."},
    {"q": "Bezakan pendekatan Induktif dan Deduktif dalam mengajar nahu.", "a": "Deduktif: Guru ajar rumus/hukum dahulu baru beri contoh dan latihan.\nInduktif: Guru beri contoh-contoh ayat dahulu, murid rumuskan hukum nahu."},
    {"q": "Apakah LAD (Language Acquisition Device)?", "a": "Konsep Chomsky tentang fakulti mental kognitif semula jadi pada otak manusia yang membolehkan pemerolehan bahasa berlaku secara pantas."},
    {"q": "Apakah tiga metafungsi bahasa menurut M.A.K. Halliday?", "a": "1. Metafungsi Ideasional (menyatakan pengalaman)\n2. Metafungsi Interpersonal (menjalin hubungan sosial)\n3. Metafungsi Tekstual (menyusun teks kohesif)"},
    {"q": "Apakah alomorf bagi morfem meN-?", "a": "me- (di hadapan l, m, n, r, w, y), mem- (b, p), men- (d, t, c, j), meng- (g, k, h, vokal), menge- (kata eka suku kata)."},
    {"q": "Apakah peranan tatabahasa dalam Pendekatan Komunikatif?", "a": "Tatabahasa bukan matlamat akhir, sebaliknya alat untuk mencapai kecekapan berkomunikasi secara bermakna dan berkesan mengikut konteks."}
]

# Mock Exam Set: 40 questions
mock_set = {
    "id": "set-1",
    "title": "Mock Exam 1 (HMML5103)",
    "desc": "40 soalan MCQ format peperiksaan akhir · Meliputi 10 topik modul",
    "num": 1,
    "questions": [
        {
            "q": "Pernyataan manakah yang paling tepat menerangkan perbezaan antara Teori Linguistik Tradisional dan Teori Linguistik Struktural?",
            "opts": [
                "Tradisional berpegang pada pendekatan makna dan preskriptif, manakala Struktural berpegang pada pendekatan deskriptif saintifik terhadap bahasa lisan",
                "Tradisional menolak bahasa tulisan manakala Struktural mengutamakan bahasa bertulis klasik",
                "Tradisional dipelopori oleh Bloomfield manakala Struktural dipelopori oleh Za'ba",
                "Tradisional mengkaji struktur mental penutur manakala Struktural mengkaji nahu Latin sahaja"
            ],
            "a": 0,
            "exp": "Aliran tradisional berasaskan makna nosional dan preskriptif, manakala struktural bersifat deskriptif berasaskan ujaran lisan.",
            "topic": "Pengenalan kepada Pelbagai Teori Linguistik",
            "difficulty": "medium",
            "cognitive": "comprehension"
        },
        {
            "q": "Konsep 'kecekapan bahasa' (competence) yang dikemukakan oleh Noam Chomsky merujuk kepada:",
            "opts": [
                "Kemampuan bertutur tanpa sebarang kesilapan sebutan di hadapan khalayak",
                "Pengetahuan intuitif bawah sedar penutur jati mengenai rumus sistem bahasanya",
                "Bilangan perbendaharaan kata yang dihafal daripada kamus dewan",
                "Markah gred A yang diperoleh dalam peperiksaan tatabahasa"
            ],
            "a": 1,
            "exp": "Competence ialah sistem rumus bahasa yang dikuasai secara dalaman oleh penutur jati.",
            "topic": "Teori Linguistik Tradisional, Struktural dan Transformasi Generatif",
            "difficulty": "medium",
            "cognitive": "recall"
        },
        {
            "q": "Hubungan arbitrar antara 'penanda' (signifier) dan 'petanda' (signified) menurut Saussure bermaksud:",
            "opts": [
                "Terdapat hubungan logik dan semula jadi antara bunyi perkataan dengan benda yang dirujuk",
                "Tiada kaitan wajib atau semula jadi antara lambang bunyi dengan konsep yang diwakilinya selain kelaziman masyarakat",
                "Makna perkataan ditentukan oleh keputusan raja atau pemerintah sesebuah negara",
                "Bunyi perkataan sentiasa meniru bunyi alam semula jadi (onimatopia)"
            ],
            "a": 1,
            "exp": "Arbitrar bermakna sewenang-wenangnya mengikut konvensi masyarakat penutur tanpa sebab fizikal yang mengikat.",
            "topic": "Tokoh dan Aliran Linguistik Luar Negara",
            "difficulty": "hard",
            "cognitive": "analysis"
        },
        {
            "q": "Karya tatabahasa manakah yang ditulis oleh Raja Ali Haji dan menerapkan acuan nahu bahasa Arab dalam huraian bahasa Melayu?",
            "opts": ["Pelita Bahasa Melayu", "Bustan al-Katibin", "Nahu Melayu Mutakhir", "Salasilah Melayu dan Bugis"],
            "a": 1,
            "exp": "Bustan al-Katibin (1857) ialah nahu Melayu berasaskan acuan bahasa Arab tulisan Raja Ali Haji.",
            "topic": "Tokoh dan Aliran Linguistik Tempatan",
            "difficulty": "easy",
            "cognitive": "recall"
        },
        {
            "q": "Dalam Pelita Bahasa Melayu Penggal I, Za'ba mengelaskan perkataan 'berjalan', 'makan', dan 'tidur' di bawah golongan:",
            "opts": ["Nama", "Perbuatan", "Sifat", "Sendi"],
            "a": 1,
            "exp": "Kata perbuatan ialah golongan kata Za'ba bagi perkataan yang menunjukkan tindakan atau perlakuan.",
            "topic": "Kajian Teks Pelita Bahasa Melayu Penggal I",
            "difficulty": "easy",
            "cognitive": "comprehension"
        },
        {
            "q": "Apakah ciri utama pendekatan deskriptif yang digunakan oleh Profesor Emeritus Dato' Dr. Asmah Haji Omar dalam Nahu Melayu Mutakhir?",
            "opts": [
                "Menghuraikan hukum tatabahasa berdasarkan data autentik bahasa Melayu moden tanpa dipaksa mengikut acuan Latin atau Arab",
                "Menetapkan denda kepada penutur yang melakukan kesalahan bahasa",
                "Mengabaikan aspek sintaksis dan hanya mengkaji etimologi perkataan purba",
                "Menterjemahkan terus buku nahu bahasa Inggeris ke dalam bahasa Melayu"
            ],
            "a": 0,
            "exp": "Pendekatan deskriptif Asmah Omar menghuraikan bahasa sebagaimana ia wujud secara alami dalam kalangan penutur Melayu.",
            "topic": "Teks Nahu Melayu Mutakhir Karya Asmah Omar",
            "difficulty": "medium",
            "cognitive": "comprehension"
        },
        {
            "q": "Ayat 'Bunga mawar itu sungguh harum' menepati pola ayat dasar manakah dalam Tatabahasa Dewan?",
            "opts": ["Pola 1 (FN + FN)", "Pola 2 (FN + FK)", "Pola 3 (FN + FA)", "Pola 4 (FN + FS)"],
            "a": 2,
            "exp": "'Bunga mawar itu' (Frasa Nama) + 'sungguh harum' (Frasa Adjektif) = Pola 3 (FN + FA).",
            "topic": "Teks Tatabahasa Dewan Edisi Ketiga",
            "difficulty": "easy",
            "cognitive": "application"
        },
        {
            "q": "Manakah antara berikut BUKAN peranti kohesi nahuan dalam analisis wacana?",
            "opts": ["Rujukan kata ganti nama (dia, mereka)", "Konjungsi wacana (oleh itu, seterusnya)", "Elipsis atau pengguguran kata", "Kolokasi kata lazim (hujan lebat)"],
            "a": 3,
            "exp": "Kolokasi ialah peranti kohesi leksikal, bukan kohesi nahuan.",
            "topic": "Analisis Tatabahasa bagi Pendekatan Wacana",
            "difficulty": "medium",
            "cognitive": "analysis"
        },
        {
            "q": "Dalam Analisis Komponen Makna, perkataan 'gadis' mempunyai ciri semantik distingtif:",
            "opts": [
                "[+insan, +dewasa, +lelaki]",
                "[+insan, -dewasa, -lelaki]",
                "[-insan, +dewasa, -lelaki]",
                "[+insan, +dewasa, -lelaki]"
            ],
            "a": 1,
            "exp": "Gadis ialah wanita muda/remaja: [+insan, -dewasa/muda, -lelaki].",
            "topic": "Medan Makna",
            "difficulty": "medium",
            "cognitive": "analysis"
        },
        {
            "q": "Guru yang memulakan pengajaran dengan memaparkan petikan berita, membimbing murid mengenal pasti ayat pasif, dan kemudian bersama-sama merumuskan hukum ayat pasif telah menggunakan pendekatan:",
            "opts": ["Deduktif", "Induktif", "Eklektik", "Hafalan"],
            "a": 1,
            "exp": "Pendekatan induktif bermula daripada contoh-contoh khusus menuju ke generalisasi rumus.",
            "topic": "Aplikasi Teori Linguistik dalam Pendidikan Bahasa",
            "difficulty": "medium",
            "cognitive": "application"
        }
    ]
}

# Expand mock set to 40 complete questions programmatically by generating remaining questions covering topics 1-10
additional_questions = [
    # Topic 1 & 2
    {"q": "Apakah perbezaan utama antara nahu preskriptif dan nahu deskriptif?", "opts": ["Preskriptif menetapkan hukum betul salah, manakala deskriptif menghuraikan penggunaan bahasa sebenar", "Preskriptif untuk bahasa lisan, deskriptif untuk tulisan", "Preskriptif diasaskan oleh Chomsky, deskriptif oleh Za'ba", "Preskriptif tidak mempedulikan tatabahasa"], "a": 0, "exp": "Preskriptif menentukan hukum apa yang 'sepatutnya' digunakan, manakala deskriptif mencatatkan apa yang 'sebenarnya' digunakan.", "topic": "Pengenalan kepada Pelbagai Teori Linguistik", "difficulty": "easy", "cognitive": "comprehension"},
    {"q": "Siapakah tokoh yang mengemukakan Analisis Konstituen Terdekat (IC Analysis)?", "opts": ["Leonard Bloomfield", "Zainal Abidin Ahmad", "Raja Ali Haji", "David Crystal"], "a": 0, "exp": "Leonard Bloomfield mempopularkan teknik IC Analysis dalam linguistik struktural Amerika.", "topic": "Teori Linguistik Tradisional, Struktural dan Transformasi Generatif", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Konsep 'Struktur Dalaman' (Deep Structure) dalam tatabahasa generatif menentukan aspek:", "opts": ["Makna semantik ayat", "Sebutan fonetik lahiriah", "Bilangan huruf dalam perkataan", "Tanda baca dalam tulisan"], "a": 0, "exp": "Struktur dalaman mengandungi maklumat semantik yang mendasari sesuatu ayat.", "topic": "Teori Linguistik Tradisional, Struktural dan Transformasi Generatif", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Kajian bahasa yang meneliti perubahan fonologi daripada bahasa Melayu Kuno abad ke-7 kepada bahasa Melayu Klasik abad ke-16 merupakan kajian:", "opts": ["Sinkronik", "Diakronik", "Paradigmatik", "Preskriptif"], "a": 1, "exp": "Kajian diakronik mengkaji perkembangan dan evolusi sejarah bahasa merentasi masa.", "topic": "Tokoh dan Aliran Linguistik Luar Negara", "difficulty": "medium", "cognitive": "application"},
    # Topic 3 & 4
    {"q": "Karya 'Kitab Pengetahuan Bahasa' (1858) karya Raja Ali Haji sebenarnya merupakan:", "opts": ["Sebuah kamus ekabahasa Melayu terawal berloghat Riau", "Sebuah novel fiksyen cinta", "Buku perundangan negeri Johor", "Buku teks sains moden"], "a": 0, "exp": "Kitab Pengetahuan Bahasa ialah kamus ensiklopedia ekabahasa Melayu pertama yang disusun oleh sarjana tempatan.", "topic": "Tokoh dan Aliran Linguistik Tempatan", "difficulty": "medium", "cognitive": "recall"},
    {"q": "Buku 'Morfologi Sintaksis Bahasa Melayu' ditulis oleh tokoh linguistik tempatan:", "opts": ["Za'ba", "Prof. Emeritus Dato' Dr. Asmah Haji Omar", "Raja Ali Haji", "Munshi Abdullah"], "a": 1, "exp": "Asmah Haji Omar menulis karya berautoriti tentang Morfologi dan Sintaksis Bahasa Melayu.", "topic": "Tokoh dan Aliran Linguistik Tempatan", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Apakah sumbangan utama M.A.K. Halliday kepada analisis wacana dan pendidikan bahasa?", "opts": ["Memperkenalkan Linguistik Sistemik Fungsional yang memandang bahasa sebagai alat sosial", "Menghapuskan kajian semantik", "Mencipta mesin penterjemah pertama", "Menyusun nahu Latin untuk sekolah"], "a": 0, "exp": "Halliday mengasaskan Systemic Functional Linguistics yang mengkaji fungsi bahasa dalam konteks sosial.", "topic": "Tokoh dan Aliran Linguistik Luar Negara", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Paksi mendatar yang menghubungkan perkataan secara berturutan dalam ayat menurut Saussure dikenali sebagai hubungan:", "opts": ["Paradigmatik", "Sintagmatik", "Asosiatif", "Semiotik"], "a": 1, "exp": "Hubungan sintagmatik ialah hubungan linear/mendatar antara unsur-unsur dalam rangkaian ayat.", "topic": "Tokoh dan Aliran Linguistik Luar Negara", "difficulty": "medium", "cognitive": "recall"},
    # Topic 5 & 6
    {"q": "Dalam Pelita Bahasa Penggal I, perkataan seperti 'di', 'dari', 'dan', dan 'kerana' digolongkan sebagai:", "opts": ["Kata Nama", "Kata Perbuatan", "Kata Sifat", "Kata Sendi"], "a": 3, "exp": "Kata Sendi merujuk kepada perkataan yang menyambung dan menyendikan kata lain.", "topic": "Kajian Teks Pelita Bahasa Melayu Penggal I", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Mengapakah huraian Za'ba tentang nahu dikatakan berasaskan 'makna nosional'?", "opts": ["Kerana perkataan dikelaskan mengikut konsep idea yang digambarkan dalam fikiran", "Kerana perkataan dikira mengikut abjad rumi", "Kerana Za'ba tidak mempercayai tatabahasa tulisan", "Kerana ia diterjemahkan daripada nahu Jerman"], "a": 0, "exp": "Pendekatan nosional mengklasifikasikan kata berasaskan makna dalam akal budi penutur.", "topic": "Kajian Teks Pelita Bahasa Melayu Penggal I", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Alomorf awalan 'meN-' yang hadir apabila bergabung dengan kata dasar yang bermula dengan huruf 't', 'd', dan 'c' ialah:", "opts": ["me-", "mem-", "men-", "meng-"], "a": 2, "exp": "Awalan 'men-' digunakan di hadapan huruf dental/alveolar t, d, c (cth: tari -> menari, duga -> menduga).", "topic": "Teks Nahu Melayu Mutakhir Karya Asmah Omar", "difficulty": "easy", "cognitive": "application"},
    {"q": "Ayat pasif 'Buku itu telah saya baca semalam' merupakan jenis ayat pasif:", "opts": ["Pasif diri pertama", "Pasif diri ketiga dengan awalan di-", "Pasif berimbuhan ter-", "Pasif berimbuhan ke-...-an"], "a": 0, "exp": "Ayat pasif dengan kata ganti nama diri pertama (saya) tidak menggunakan awalan di-, sebaliknya diletakkan mendahului kata kerja dasar.", "topic": "Teks Nahu Melayu Mutakhir Karya Asmah Omar", "difficulty": "medium", "cognitive": "analysis"},
    # Topic 7 & 8
    {"q": "Ayat 'Rumah pusaka itu di atas bukit' mempunyai pola ayat dasar:", "opts": ["FN + FN", "FN + FK", "FN + FA", "FN + FS"], "a": 3, "exp": "'Rumah pusaka itu' (FN) + 'di atas bukit' (FS) = Pola 4 (FN + FS).", "topic": "Teks Tatabahasa Dewan Edisi Ketiga", "difficulty": "easy", "cognitive": "application"},
    {"q": "Proses transformasi manakah yang mengubah susunan ayat susunan biasa menjadi ayat susunan songsang?", "opts": ["Pengguguran", "Penyusunan Semula", "Peluasan", "Penyebatian"], "a": 1, "exp": "Penyusunan semula (inversi/pendepanan) memindahkan frasa predikat ke hadapan subjek.", "topic": "Teks Tatabahasa Dewan Edisi Ketiga", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Dalam ayat 'Ahmad membeli kereta baharu. Kereta itu berwarna merah', peranti kohesi yang digunakan ialah:", "opts": ["Kohesi leksikal melalui pengulangan kata", "Elipsis frasa predikat", "Substitusi kata kerja", "Konjungsi pertentangan"], "a": 0, "exp": "Pengulangan kata 'kereta' berfungsi sebagai kohesi leksikal yang menghubungkan kedua-dua ayat.", "topic": "Analisis Tatabahasa bagi Pendekatan Wacana", "difficulty": "easy", "cognitive": "analysis"},
    {"q": "Apakah fokus utama Analisis Wacana Kritis (CDA) van Dijk dan Fairclough?", "opts": ["Membongkar bagaimana kuasa, ketidaksamarataan, dan ideologi dihasilkan dan dikekalkan melalui bahasa", "Menyemak ejaan perkataan dalam kamus", "Menghitung kekerapan kata hubung dalam novel", "Mengajar fonetik kepada murid prasekolah"], "a": 0, "exp": "CDA mengkaji kaitan antara teks bahasa dengan struktur kuasa dan dominasi sosial.", "topic": "Analisis Tatabahasa bagi Pendekatan Wacana", "difficulty": "hard", "cognitive": "analysis"},
    # Topic 9 & 10
    {"q": "Pasangan kata 'beli' dan 'jual' menunjukkan hubungan pertentangan jenis:", "opts": ["Antonim binari mutlak", "Antonim relasional (kebalikan)", "Antonim berperingkat (gradable)", "Hiponim tak bersilang"], "a": 1, "exp": "'Beli - jual' ialah antonim relasional/kebalikan (jika A membeli daripada B, maka B menjual kepada A).", "topic": "Medan Makna", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Kata 'pucuk' dalam 'pucuk paku', 'pucuk senapang', dan 'pucuk pimpinan' ialah contoh:", "opts": ["Homonim", "Polisemi", "Hiponim", "Antonim"], "a": 1, "exp": "Polisemi ialah satu perkataan yang mempunyai beberapa makna berlainan tetapi masih berkongsi akar konseptual yang sama.", "topic": "Medan Makna", "difficulty": "medium", "cognitive": "analysis"},
    {"q": "Kaedah Audiolingual menganggap pembelajaran bahasa sebagai proses:", "opts": ["Penaakulan mental logik semata-mata", "Pembentukan tabiat (habit formation) mekanikal melalui rangsangan dan peneguhan", "Penterjemahan teks klasik", "Pemerhatian tanpa sebarang latihan lisan"], "a": 1, "exp": "Audiolingual berasaskan behaviourisme Skinner iaitu pembelajaran bahasa ialah pembentukan tabiat.", "topic": "Aplikasi Teori Linguistik dalam Pendidikan Bahasa", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Pengajaran tatabahasa secara deduktif paling sesuai digunakan apabila:", "opts": ["Konsep tatabahasa sangat abstrak atau murid telah mempunyai asas tatabahasa yang mencukupi", "Murid belum tahu membaca", "Guru tidak mempunyai sukatan pelajaran", "Murid ingin bermain permainan bahasa di padang"], "a": 0, "exp": "Deduktif menjimatkan masa untuk konsep nahu rumit bagi pelajar dewasa atau peringkat menengah.", "topic": "Aplikasi Teori Linguistik dalam Pendidikan Bahasa", "difficulty": "medium", "cognitive": "application"},
    # Additional 10 questions to reach 40
    {"q": "Apakah konsep 'Universal Grammar' (UG) Noam Chomsky?", "opts": ["Satu set prinsip dan hukum tatabahasa asas yang wujud secara biologi dalam otak semua manusia", "Kamus bahasa Inggeris sejagat", "Sistem ejaan antarabangsa UNESCO", "Undang-undang penulisan akhbar"], "a": 0, "exp": "Universal Grammar ialah prinsip tatabahasa sejagat yang dikongsi semua bahasa manusia secara kognitif bawaan.", "topic": "Teori Linguistik Tradisional, Struktural dan Transformasi Generatif", "difficulty": "medium", "cognitive": "recall"},
    {"q": "Karya Za'ba yang memberi tumpuan kepada ejaan Jawi dan Rumi ialah:", "opts": ["Daftar Ejaan Melayu", "Ilmu Mengarang Melayu", "Pelita Bahasa Melayu Penggal II", "Rahsia Ejaan"], "a": 0, "exp": "Daftar Ejaan Melayu (1938) menyusun sistem ejaan Jawi dan Rumi sekolah.", "topic": "Tokoh dan Aliran Linguistik Tempatan", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Menurut Saussure, kajian bahasa pada satu titik masa tanpa melihat sejarah masa lalu disebut kajian:", "opts": ["Diakronik", "Sinkronik", "Etimologi", "Filologi"], "a": 1, "exp": "Sinkronik ialah kajian terhadap bahasa pada satu masa tertentu.", "topic": "Tokoh dan Aliran Linguistik Luar Negara", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Apakah yang dimaksudkan dengan istilah 'morfem bebas'?", "opts": ["Morfem yang boleh berdiri sendiri sebagai kata penuh bermakna (cth: rumah, tidur)", "Imbuhan awalan yang bebas berubah", "Tanda baca dalam ayat majmuk", "Bunyi vokal yang tidak bertekanan"], "a": 0, "exp": "Morfem bebas boleh wujud secara bersendirian sebagai perkataan bermakna.", "topic": "Teks Nahu Melayu Mutakhir Karya Asmah Omar", "difficulty": "easy", "cognitive": "comprehension"},
    {"q": "Manakah antara berikut BUKAN kata tugas dalam Tatabahasa Dewan?", "opts": ["Kata Hubung", "Kata Sendi Nama", "Kata Adjektif", "Kata Seru"], "a": 2, "exp": "Kata Adjektif ialah golongan kata utama yang boleh menjadi inti frasa adjektif, bukan kata tugas.", "topic": "Teks Tatabahasa Dewan Edisi Ketiga", "difficulty": "easy", "cognitive": "recall"},
    {"q": "Ayat 'Kereta baharu itu dibeli oleh ayah semalam' merupakan hasil proses penerbitan ayat:", "opts": ["Pengguguran subjek", "Penyusunan semula (pasif)", "Peluasan frasa komplemen", "Penafian predikat"], "a": 1, "exp": "Penyusunan semula struktur aktif kepada struktur pasif.", "topic": "Teks Tatabahasa Dewan Edisi Ketiga", "difficulty": "medium", "cognitive": "application"},
    {"q": "Elipsis dalam analisis wacana bermaksud:", "opts": ["Pengguguran kata atau frasa yang sudah difahami daripada konteks ayat sebelumnya", "Pengulangan kata berirama", "Penciptaan perkataan baharu", "Penggunaan kata pinjaman"], "a": 0, "exp": "Elipsis ialah pengguguran unsur tatabahasa yang telah sedia diketahui pembaca/pendengar.", "topic": "Analisis Tatabahasa bagi Pendekatan Wacana", "difficulty": "medium", "cognitive": "comprehension"},
    {"q": "Perkataan 'merpati', 'helang', dan 'rajawali' mempunyai hubungan medan makna:", "opts": ["Kohiponim bagi hipernim 'burung'", "Antonim binari", "Homonim dialek", "Polisemi istilah"], "a": 0, "exp": "Kata-kata ini berada pada tahap yang sama di bawah kategori umum (hipernim) burung.", "topic": "Medan Makna", "difficulty": "easy", "cognitive": "comprehension"},
    {"q": "Dalam kaedah Komunikatif, aktiviti bilik darjah yang paling sesuai dilaksanakan ialah:", "opts": ["Simulasi situasi sebenar, main peranan, dan penyelesaian masalah berpasukan", "Menyalin kamus perkataan demi perkataan secara individu", "Menghafal jadual tasrif kata", "Mendengar rakaman audio berulang kali tanpa bercakap"], "a": 0, "exp": "Aktiviti autentik seperti main peranan dan simulasi membina kecekapan komunikatif sebenar.", "topic": "Aplikasi Teori Linguistik dalam Pendidikan Bahasa", "difficulty": "easy", "cognitive": "application"},
    {"q": "Matlamat akhir pengajaran tatabahasa dalam Kurikulum Standard Bahasa Melayu ialah:", "opts": ["Melahirkan murid yang mampu menggunakan bahasa Melayu yang betul, gramatis, dan santun dalam lisan serta penulisan", "Menjadikan semua murid pakar bahasa Sanskrit kuno", "Memastikan murid menghafal semua nama tokoh linguistik", "Mengurangkan penggunaan bahasa Melayu dalam urusan rasmi"], "a": 0, "exp": "Pendidikan bahasa bertujuan membolehkan murid berkomunikasi secara berkesan, santun, dan gramatis.", "topic": "Aplikasi Teori Linguistik dalam Pendidikan Bahasa", "difficulty": "easy", "cognitive": "comprehension"}
]

mock_set["questions"].extend(additional_questions)

data_hmml5103 = {
    "notes": notes,
    "quizzes": quizzes,
    "flashcards": flashcards,
    "sets": [mock_set]
}

with open("scripts/hmml5103_data.json", "w", encoding="utf-8") as f:
    json.dump(data_hmml5103, f, indent=2, ensure_ascii=False)

print(f"HMML5103 generated: {len(notes)} topics, {sum(len(q) for q in quizzes.values())} quiz questions, {len(flashcards)} flashcards, {len(mock_set['questions'])} exam questions.")
