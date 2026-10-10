/* =====================================================================
   DATA SITUS — Danny Mamesah · Project Studio
   ---------------------------------------------------------------------
   Semua isi situs diatur dari file ini. Tidak perlu mengubah HTML.

   ARTIKEL (window.ARTICLES) — satu artikel = satu video panjang YouTube
     id        ID video YouTube (bagian setelah ?v= pada link video)
     slug      alamat artikel: huruf kecil + tanda hubung, harus unik
     title     judul artikel
     date      tanggal tayang, format TTTT-BB-HH
     duration  durasi video dalam detik
     country   kunci negara dari window.COUNTRIES (atau null)
     city      nama kota / lokasi
     category  kunci kategori dari window.CATEGORIES
     excerpt   ringkasan 1–2 kalimat (tampil di kartu & di bawah judul)
     body      isi artikel. Setiap item boleh berupa:
                 "teks"                         -> paragraf
                 { h: "Subjudul" }              -> subjudul
                 { list: ["poin 1", "poin 2"] } -> daftar
                 { quote: "kutipan" }           -> kutipan
                 { img: "assets/img/foto.jpg", caption: "keterangan" } -> foto
     image     (opsional) foto sendiri, mis. "assets/img/st-andrews.jpg".
               Jika kosong, situs memakai cuplikan dari video YouTube.
     still     (opsional) cuplikan video yang dipakai: maxres1 | maxres2 | maxres3
     vertical  (opsional) true jika cuplikan video direkam vertikal
     playlist  (opsional) ID playlist YouTube (bagian setelah list= pada link),
               video lalu diputar di dalam playlist + muncul tombol "Tonton playlist lengkap"

   SLIDE UTAMA (window.HERO) — gambar besar bergeser di halaman utama
     slug      slug artikel yang ditampilkan
     label     nama pendek di tombol navigasi slide
     image     (opsional) foto lain untuk slide ini:
                 "assets/img/foto.jpg"  atau  { id: 'ID video', still: 'maxres2' }
                 Foto tegak (mis. still 'oar1' dari Shorts) otomatis tampil sebagai kartu potret.

   VIDEO SINGKAT (window.SHORTS) — YouTube Shorts, tampil sebagai video saja
   ===================================================================== */

window.SITE = {
  name: 'Danny Mamesah',
  studio: "Danny's Project Studio",
  tagline: 'Catatan perjalanan dalam tulisan dan video',
  channelUrl: 'https://www.youtube.com/@dannymamesahstudio',
  instagramUrl: 'https://www.instagram.com/dannymamesah/',
  instagramHandle: '@dannymamesah',
  about:
    'Kumpulan film dokumentasi perjalanan dan kegiatan bersama kawan-kawan, sahabat, keluarga, dan kunjungan pekerjaan. Seputar destinasi, kuliner, events, Vespa, Harley Davidson, Moto Guzzi, budaya, dan olahraga.',
  topics: ['Destinasi', 'Kuliner', 'Events', 'Vespa', 'Harley Davidson', 'Moto Guzzi', 'Budaya', 'Olahraga'],
};

/* Negara: cover = foto tegak untuk kartu destinasi,
   banner = foto mendatar untuk bagian atas halaman negara (opsional). */
window.COUNTRIES = {
  amerika:    { name: 'Amerika Serikat', blurb: 'Dari Times Square dan Harvard sampai Hollywood dan Miami Open.', cover: { id: 'KwF7X0uuEZ4', still: 'oardefault' }, banner: { id: 'E3rCxGVV3WE', still: 'maxres1' } },
  inggris:    { name: 'Inggris', blurb: 'London, Brighton, dan budaya Mods yang masih hidup.', cover: { id: 'IJjygDXQLb8', still: 'oardefault' }, banner: { id: 'doUrZbBnED8', still: 'maxres1' } },
  irlandia:   { name: 'Irlandia', blurb: 'Temple Bar, Guinness, Jameson, dan Titanic Belfast.', cover: { id: 'rWg4186j2TY', still: 'oardefault' }, banner: { id: 'mlHUCAMkUfI', still: 'maxres2' } },
  uea:        { name: 'Uni Emirat Arab', blurb: 'Istana kepresidenan, Ferrari World, dan petualangan daging onta.', cover: { id: 'XxKHfLL-g4w', still: 'oardefault' }, banner: { id: '6wctwf3QuKw', still: 'maxres1' } },
  skotlandia: { name: 'Skotlandia', blurb: 'St Andrews, kota tempat lahirnya golf.', cover: { id: '-Hg09FwQbS4', still: 'maxres2' }, banner: { id: 'aTkVF-SiFa4', still: 'maxres1' } },
  indonesia:  { name: 'Indonesia', blurb: 'Dari Istana Negara dan Vespa World Days Bali sampai Danau Kelimutu di Flores.', cover: { id: 'fgSj4RwsrPY', still: 'oardefault' }, banner: { id: 'Syv-jTi1Xlk', still: 'maxres3' } },
  austria:    { name: 'Austria', blurb: 'The Alp Days: ribuan Vespa berkumpul di kaki Pegunungan Alpen.', cover: { id: 'wwmHdZ1xxgk', still: 'maxres2' }, banner: { id: '6lqCKCfAF3Q', still: 'maxres1' } },
  prancis:    { name: 'Prancis', blurb: 'Sore di bawah Menara Eiffel.', cover: { id: 'DAsu0ZiJhPw', still: 'oardefault' } },
  italia:     { name: 'Italia', blurb: 'Museum Vespa pribadi di bawah tanah kota Milan.', cover: { id: '3evj-xGA4uY', still: 'oardefault' } },
};

window.HERO = [
  { slug: 'qasr-al-watan-istana-kepresidenan-abu-dhabi', label: 'Qasr Al Watan' },
  { slug: 'washington-dc-le-meridien-lincoln-memorial', label: 'Washington DC' },
  { slug: 'the-alp-days-2019', label: 'The Alp Days 2019' },
  { slug: 'vespa-world-days-2022-bali', label: 'Vespa World Days 2022' },
  { slug: 'harvard-university-kampus-impian-dunia', label: 'Harvard', image: { id: 'prNpMcCLFYw', still: 'oar1' } },
];

window.CATEGORIES = {
  jalan:    { name: 'Jalan-jalan' },
  kuliner:  { name: 'Kuliner & Minuman' },
  budaya:   { name: 'Budaya & Sejarah' },
  otomotif: { name: 'Otomotif & Mods', blurb: 'Vespa, Harley Davidson, Moto Guzzi, dan budaya Mods: roda dua selalu jadi alasan untuk berangkat.' },
  olahraga: { name: 'Olahraga' },
};

window.ARTICLES = [
  {
    id: 'aTkVF-SiFa4', slug: 'jalan-jalan-st-andrews-ready-to-golf',
    title: 'Jalan-Jalan di St Andrews, Skotlandia: Ready to Golf!',
    date: '2026-09-10', duration: 292, country: 'skotlandia', city: 'St Andrews', category: 'olahraga', still: 'maxres1',
    excerpt: 'Menikmati suasana kota tempat lahirnya golf sambil berburu perlengkapan golf yang ikonik.',
    body: [
      'Berada di tempat lahirnya olahraga golf dunia seperti St Andrews rasanya kurang lengkap kalau belum keliling mencari perlengkapan golf yang ikonik.',
      "Di video kali ini, saya mengajak kalian jalan-jalan santai menikmati suasana kota St Andrews di Skotlandia sambil berburu beberapa peralatan dan aksesori golf baru. Sekarang semuanya sudah lengkap, and I'm ready to golf!",
    ],
  },
  {
    id: '-Hg09FwQbS4', slug: 'tiba-di-st-andrews-menginap-di-rusacks-hotel',
    title: 'Akhirnya Tiba di St Andrews dan Menginap di Rusacks Hotel',
    date: '2026-09-09', duration: 452, country: 'skotlandia', city: 'St Andrews', category: 'jalan', still: 'maxres2',
    excerpt: 'Dari bandara menuju St Andrews, lalu check-in di Rusacks, hotel ikonik yang berdiri tepat di samping Old Course.',
    body: [
      'Akhirnya kami tiba di St Andrews, Skotlandia! Setelah mendarat dan sempat menikmati suasana bandara, perjalanan berlanjut menuju St Andrews, kota yang sangat terkenal sebagai salah satu tempat paling bersejarah dalam dunia golf.',
      'Kali ini kami menginap di Rusacks St Andrews, hotel ikonik yang lokasinya sangat istimewa, tepat di samping Old Course. Dari hotel, kita bisa melihat langsung hamparan lapangan golf legendaris, termasuk area 18th hole.',
      'Ikuti perjalanan kami dari saat tiba di Skotlandia, perjalanan menuju St Andrews, sampai akhirnya check-in dan menikmati suasana Rusacks Hotel.',
    ],
  },
  {
    id: 'bFxcVNU-Cvk', slug: 'keliling-brighton-jump-the-gun-quadrophenia-alley',
    title: 'Keliling Brighton: Jump The Gun dan Quadrophenia Alley, Jejak Film Mods (1979)',
    date: '2026-09-08', duration: 393, country: 'inggris', city: 'Brighton', category: 'otomotif', still: 'maxres3',
    excerpt: 'Menyusuri Quadrophenia Alley dan sudut-sudut Brighton yang lekat dengan film legendaris dan budaya Mods.',
    body: [
      'Kali ini kami keliling Brighton, Inggris, dan menyusuri salah satu lokasi yang punya sejarah kuat dengan budaya Mods serta film legendaris Quadrophenia (1979).',
      'Kami mengunjungi Quadrophenia Alley, melihat berbagai jejak yang berkaitan dengan film, budaya Mod, fashion, hingga ikon skuter yang begitu identik dengan kehidupan anak muda Inggris era tersebut.',
      'Buat penggemar film Quadrophenia, The Who, dan sejarah subkultur Mods, kawasan ini punya atmosfer yang unik dan terasa seperti membawa kita kembali ke Brighton di era 1960–1970-an.',
    ],
  },
  {
    id: 'gwe8rIN5E2c', slug: 'modfather-clothing-brighton',
    title: 'Kiblat Pakaian Mods di Brighton: Bertemu Anak Pendiri Modfather',
    date: '2026-09-08', duration: 353, country: 'inggris', city: 'Brighton', category: 'otomotif', still: 'maxres2',
    excerpt: 'Masuk ke Modfather Clothing di North Laine, toko yang jadi rujukan gaya berpakaian para Mods.',
    body: [
      'Selamat datang di Modfather Clothing Brighton! Kali ini kita masuk dan melihat langsung salah satu toko pakaian paling ikonis untuk pencinta subkultur Mods.',
      'Berlokasi di kawasan North Laine, Brighton, Modfather Clothing adalah tempat berkumpulnya mode, musik, dan gaya hidup skuter klasik. Di sini ada deretan koleksi jaket parka, kemeja button-down, kaos polo rajut, hingga aksesori otentik khas Inggris.',
    ],
  },
  {
    id: 'WeMu4cvsrJA', slug: 'dari-indonesia-ke-brighton',
    title: 'Menuju Tempat Kelahiran Mods: Dari Indonesia, Transit Hong Kong, Berlabuh di Brighton',
    date: '2026-09-08', duration: 256, country: 'inggris', city: 'Brighton', category: 'jalan', still: 'maxres1',
    excerpt: 'Rute panjang melintasi benua: berangkat dari tanah air, transit di Hong Kong, lalu menuju kota pantai Brighton.',
    body: [
      'Dari Indonesia menuju rumahnya para Mods di Brighton, Inggris! Perjalanan kali ini sangat spesial karena menempuh rute panjang melintasi benua.',
      'Mulai dari keberangkatan di tanah air, cerita seru saat transit di Hong Kong, hingga akhirnya mendarat di Inggris dan langsung menuju kota pantai Brighton. Di kota inilah sejarah subkultur Mods dimulai pada tahun 1960-an.',
    ],
  },
  {
    id: '10IFeBwb7Yg', slug: 'whisky-tasting-markas-diageo',
    title: 'Whisky Tasting: Terbang Langsung ke Markas Diageo',
    date: '2026-09-05', duration: 223, country: null, city: 'Markas Diageo', category: 'kuliner', still: 'maxres1',
    excerpt: 'Terbang langsung menuju markas Diageo, salah satu produsen minuman terbesar di dunia, untuk sesi whisky tasting.',
    body: [],
  },
  {
    id: 'FsMv1sCmmRk', slug: 'washington-dc-le-meridien-lincoln-memorial',
    title: 'Menyusuri Washington DC dari Le Méridien ke Lincoln Memorial',
    date: '2026-09-05', duration: 592, country: 'amerika', city: 'Washington DC', category: 'jalan', still: 'maxres2',
    excerpt: 'Berjalan kaki dari hotel Le Méridien menyusuri pusat kota hingga Lincoln Memorial.',
    body: [],
  },
  {
    id: '6wctwf3QuKw', slug: 'qasr-al-watan-istana-kepresidenan-abu-dhabi',
    title: 'Qasr Al Watan: Megahnya Istana Kepresidenan Abu Dhabi',
    date: '2026-09-03', duration: 497, country: 'uea', city: 'Abu Dhabi', category: 'budaya', still: 'maxres1',
    excerpt: 'Menjelajahi ruang-ruang megah istana kepresidenan Abu Dhabi dan koleksi hadiah diplomatik dari berbagai negara.',
    body: [
      'Kali ini kami berkesempatan mengunjungi Qasr Al Watan, salah satu bangunan paling megah di Abu Dhabi, Uni Emirat Arab.',
      'Bukan hanya melihat kemegahan arsitektur istana, kami juga menjelajahi berbagai ruangan dan area di dalamnya, serta melihat koleksi hadiah diplomatik dari berbagai negara di dunia yang menjadi bagian dari hubungan dan pertukaran budaya antarnegara.',
      'Dari detail arsitektur yang luar biasa, ruangan-ruangan megah, hingga berbagai benda bersejarah dan hadiah kenegaraan, kunjungan ini memberikan pengalaman yang benar-benar berbeda.',
      { h: 'Yang akan Anda lihat di video ini' },
      { list: [
        'Kemegahan Qasr Al Watan dari luar hingga ke dalam',
        'Bagian dalam Istana Kepresidenan Abu Dhabi',
        'Arsitektur dan dekorasi istana yang luar biasa',
        'Koleksi hadiah diplomatik dari berbagai negara',
      ] },
    ],
  },
  {
    id: 'doUrZbBnED8', slug: 'the-bike-shed-london',
    title: 'The Bike Shed London: Surga Pecinta Motor di Tengah Kota',
    date: '2026-09-01', duration: 313, country: 'inggris', city: 'London', category: 'otomotif', still: 'maxres1',
    excerpt: 'Kafe, bar, galeri, barbershop, dan parkir motor indoor di bawah lengkung rel kereta Shoreditch.',
    body: [
      'Lokasinya di 384 Old Street, Shoreditch, London, dan tempat ini bukan sekadar kafe. Di dalam kompleksnya ada restoran, bar, toko apparel dan perlengkapan motor, galeri, barbershop, tattoo studio, serta parkir motor indoor.',
      'Yang menarik, Bike Shed menyebut dirinya sebagai "common ground" bagi orang-orang yang menyukai dunia roda dua, termasuk yang tidak mengendarai motor. Tempat ini mulai beroperasi sebagai venue permanen di Shoreditch pada 2015, di empat railway arches yang direnovasi.',
    ],
  },
  {
    id: 'yFwvjF0QzGw', slug: 'ace-cafe-london',
    title: 'Ace Cafe London: Titik Kumpul Para Bikers',
    date: '2026-09-01', duration: 354, country: 'inggris', city: 'London', category: 'otomotif', still: 'maxres3',
    excerpt: 'Berkunjung ke kafe legendaris yang lekat dengan sejarah dan budaya biker di Inggris.',
    body: [
      'Kali ini saya berkunjung ke Ace Cafe London, salah satu tempat ikonik yang lekat dengan sejarah dan budaya biker di Inggris.',
      'Bukan sekadar kafe biasa, Ace Cafe punya atmosfer yang berbeda: motor, mobil, musik, dan para pecinta otomotif bertemu dalam satu tempat. Di sini saya ingin melihat langsung seperti apa suasana tempat yang sudah begitu dikenal di kalangan biker dari berbagai negara.',
    ],
  },
  {
    id: 'rrtgVin2gz8', slug: 'museum-titanic-belfast',
    title: 'Suasana Museum Titanic di Belfast',
    date: '2026-08-31', duration: 298, country: 'irlandia', city: 'Belfast', category: 'budaya', still: 'maxres1',
    excerpt: 'Museum yang berdiri di bekas galangan kapal tempat RMS Titanic dibangun.',
    body: [
      'Titanic Belfast adalah museum ikonik di kota Belfast, Irlandia Utara, yang menceritakan sejarah pembangunan dan pelayaran kapal RMS Titanic.',
      'Museum ini berdiri di lokasi bekas galangan kapal tempat Titanic dibangun, lengkap dengan berbagai pameran tentang kehidupan di Belfast, proses pembuatannya, hingga kisah pelayaran Titanic.',
    ],
  },
  {
    id: 'mlHUCAMkUfI', slug: 'keliling-dublin-big-bus-hop-on-hop-off',
    title: 'Keliling Kota Dublin Naik Big Bus Hop-On Hop-Off',
    date: '2026-08-30', duration: 321, country: 'irlandia', city: 'Dublin', category: 'jalan', still: 'maxres2',
    excerpt: 'Melihat arsitektur dan tempat bersejarah Dublin dari atas bus tingkat beratap terbuka.',
    body: [
      'Mengisi waktu di Dublin, Irlandia, dengan cara terbaik: ikut city tour naik Big Bus Hop-On Hop-Off!',
      'Seru sekali bisa keliling melihat keindahan arsitektur kota, melewati tempat-tempat bersejarah, dan menikmati suasana Dublin dari atas bus tingkat beratap terbuka.',
    ],
  },
  {
    id: 'IjprLI0rgbE', slug: 'jameson-distillery-tour-dublin',
    title: 'Masuk ke Pabrik Whiskey Legendaris Irlandia: Jameson Distillery Tour',
    date: '2026-08-30', duration: 524, country: 'irlandia', city: 'Dublin', category: 'kuliner', still: 'maxres1',
    excerpt: 'Tur interaktif di Jameson Distillery Bow St., tempat lahirnya salah satu whiskey paling terkenal di dunia.',
    body: [
      'Tidak lengkap ke Dublin kalau belum mampir ke sini!',
      'Hari ini agenda kami fokus menjelajahi Jameson Distillery Bow St., tempat lahirnya salah satu whiskey paling terkenal di dunia sejak ratusan tahun lalu. Turnya interaktif, tempatnya estetik, dan kita bisa belajar banyak hal seputar sejarahnya di Irlandia.',
    ],
  },
  {
    id: 'iRqV2o8fVVs', slug: 'tiba-di-dublin',
    title: "Dublin, Irlandia: I'm Coming!",
    date: '2026-08-29', duration: 300, country: 'irlandia', city: 'Dublin', category: 'jalan', still: 'maxres1',
    excerpt: 'Hari pertama di Dublin, dari bandara menuju pusat kota.',
    body: [],
  },
  {
    id: 'H-knOlwnYnA', slug: 'guinness-storehouse-dublin',
    title: 'Menjelajahi Guinness Storehouse, Dublin',
    date: '2026-08-29', duration: 1076, country: 'irlandia', city: 'Dublin', category: 'kuliner', still: 'maxres1',
    excerpt: 'Tujuh lantai museum interaktif berbentuk gelas pint raksasa, dengan Gravity Bar di puncaknya.',
    body: [
      "Tempat ini adalah bekas pabrik fermentasi bir hitam legendaris Irlandia setinggi tujuh lantai yang kini diubah menjadi museum interaktif raksasa. Lokasinya berada di St. James's Gate, Dublin.",
      'Bagian dalam gedungnya unik karena dirancang menyerupai gelas pint raksasa. Di puncaknya terdapat Gravity Bar, bar kaca 360 derajat tempat pengunjung bisa menikmati kota Dublin dari ketinggian.',
    ],
  },
  {
    id: '2eOSspToabs', slug: 'lari-pagi-irvine-spectrum-center',
    title: 'Lari Pagi di Irvine Spectrum Center, California',
    date: '2026-08-28', duration: 190, country: 'amerika', city: 'Irvine', category: 'olahraga', still: 'maxres1', vertical: true,
    excerpt: 'Memulai hari dengan lari pagi di salah satu pusat belanja populer di California.',
    body: [],
  },
  {
    id: 'u91Vy7sdw9I', slug: 'huntington-beach-california',
    title: 'Akhirnya ke Huntington Beach',
    date: '2026-08-28', duration: 367, country: 'amerika', city: 'Huntington Beach', category: 'jalan', still: 'maxres3', vertical: true,
    excerpt: 'Menikmati suasana pantai dan dermaga Huntington Beach di California.',
    body: [],
  },
  {
    id: '-6KR8F6fFc4', slug: 'kunjungan-kerja-harvard-business-school',
    title: 'Kunjungan Kerja ke Harvard Business School',
    date: '2026-08-27', duration: 228, country: 'amerika', city: 'Boston', category: 'jalan', still: 'maxres2', vertical: true,
    excerpt: 'Kunjungan kerja sekaligus silaturahmi, bertukar pikiran seputar dunia bisnis global.',
    body: [
      'Kunjungan kerja sekaligus silaturahmi ke Harvard Business School. Banyak bertukar pikiran dan belajar hal baru seputar dunia bisnis global hari ini.',
    ],
  },
  {
    id: 'TZrJ7WIUYM4', slug: 'betsy-ross-house-philadelphia',
    title: 'Berkunjung ke Betsy Ross House, Rumah Penjahit Bendera Amerika Pertama',
    date: '2026-08-27', duration: 185, country: 'amerika', city: 'Philadelphia', category: 'budaya', still: 'maxres1', vertical: true,
    excerpt: 'Menelusuri sejarah bendera Amerika di rumah Betsy Ross, Philadelphia.',
    body: [],
  },
  {
    id: 'cBrOz-L76EM', slug: 'reading-terminal-market-philadelphia',
    title: 'Jalan-jalan ke Reading Terminal Market, Hard Rock Cafe & Pendawa Market',
    date: '2026-08-27', duration: 392, country: 'amerika', city: 'Philadelphia', category: 'kuliner', still: 'maxres1', vertical: true,
    excerpt: 'Mampir ke pasar bersejarah Reading Terminal Market dan Hard Rock Cafe di Philadelphia.',
    body: [],
  },
  {
    id: 'ZR1E9ptrV5A', slug: 'washington-dc-white-house-lincoln-memorial',
    title: 'Jalan-jalan di Washington DC: White House dan Lincoln Memorial',
    date: '2026-08-27', duration: 308, country: 'amerika', city: 'Washington DC', category: 'jalan', still: 'maxres2', vertical: true,
    excerpt: 'Dari Gedung Putih hingga Lincoln Memorial, menyusuri ikon-ikon ibu kota Amerika.',
    body: [],
  },
  {
    id: 'ZDJrK-fcS2k', slug: 'cek-harga-pasar-amerika',
    title: 'Market Visit: Cek Harga Pasar Amerika Setelah Kebijakan Baru Trump',
    date: '2026-08-26', duration: 468, country: 'amerika', city: null, category: 'jalan', still: 'maxres1', vertical: true,
    excerpt: 'Mampir ke Costco, PGA Tour Superstore, dan Dave & Buster\'s untuk melihat harga-harga terbaru.',
    body: [
      'Tiga tempat yang kami datangi di video ini:',
      { list: [
        'Costco: jaringan grosir terbesar di Amerika yang terkenal karena semua barang dijual dalam ukuran jumbo, dan pengunjung wajib memiliki kartu membership.',
        'PGA Tour Superstore: toko ritel perlengkapan golf terbesar dan terlengkap di Amerika. Surga bagi para pencinta golf.',
        "Dave & Buster's: tempat hiburan populer yang menggabungkan restoran besar dengan arena permainan arcade untuk orang dewasa.",
      ] },
    ],
  },
  {
    id: '37oQTYK5Na8', slug: 'hollywood-walk-of-fame-amoeba-music',
    title: 'Hollywood: Walk of Fame, Amoeba Music & Harry Potter Show',
    date: '2026-08-25', duration: 231, country: 'amerika', city: 'Los Angeles', category: 'jalan', still: 'maxres2', vertical: true,
    excerpt: 'Menyusuri Hollywood Walk of Fame, toko musik Amoeba, hingga pertunjukan Harry Potter.',
    body: [],
  },
  {
    id: 'KSnKrGa-Poo', slug: 'mendarat-di-la-santa-monica',
    title: 'Mendarat di LA: Jalan-jalan Sore di Santa Monica Yacht Harbor',
    date: '2026-08-25', duration: 206, country: 'amerika', city: 'Los Angeles', category: 'jalan', still: 'maxres3', vertical: true,
    excerpt: 'Rute hari pertama di Amerika: suasana pantai California dan jejak sejarah Route 66.',
    body: [],
  },
  {
    id: '4LLgqnUvhgY', slug: 'hut-ri-81-istana-negara',
    title: 'HUT RI ke-81 di Istana Negara',
    date: '2026-08-21', duration: 378, country: 'indonesia', city: 'Jakarta', category: 'budaya', still: 'maxres3',
    excerpt: 'Suasana perayaan Hari Ulang Tahun ke-81 Republik Indonesia di Istana Negara.',
    body: [],
  },
  {
    id: 'JxbYYaw61IQ', slug: 'harvard-university-kampus-impian-dunia',
    title: 'Harvard University: Kampus Impian Dunia',
    date: '2026-04-19', duration: 203, country: 'amerika', city: 'Cambridge', category: 'budaya', still: 'maxres1', vertical: true,
    excerpt: 'Menjelajahi lingkungan kampus, bangunan bersejarah, hingga Harvard Business School.',
    body: [
      'Akhirnya bisa menginjakkan kaki di salah satu kampus paling terkenal di dunia: Harvard University!',
      'Di video ini saya mengajak kamu menjelajahi suasana Harvard, mulai dari lingkungan kampus, bangunan bersejarah, hingga Harvard Business School. Seperti apa sebenarnya suasana kampus yang melahirkan begitu banyak tokoh dan pemimpin dunia?',
      'Bukan hanya melihat dari foto atau internet, kali ini saya melihatnya langsung dari dekat. Ada banyak hal menarik yang ternyata berbeda dari bayangan saya sebelumnya.',
    ],
  },
  {
    id: 'xAb3EWMAc-o', slug: 'transit-dubai-emirates-a380-business-class',
    title: 'Transit Dubai, Terbang ke London dengan Business Class Emirates A380',
    date: '2026-04-17', duration: 297, country: 'uea', city: 'Dubai', category: 'jalan', still: 'maxres2', vertical: true,
    excerpt: 'Transit di Dubai, lalu melanjutkan penerbangan ke London di kelas bisnis Emirates A380.',
    body: [],
  },
  {
    id: 'E3rCxGVV3WE', slug: 'keliling-miami-hard-rock-terrace',
    title: 'Keliling Miami: Makan Unik dan Berakhir di Hard Rock Terrace',
    date: '2026-04-15', duration: 361, country: 'amerika', city: 'Miami', category: 'kuliner', still: 'maxres1',
    excerpt: 'Berkeliling Miami, mencoba makanan unik, dan menutup hari di Hard Rock Terrace.',
    body: [],
  },
  {
    id: '0J8xmnqRTtQ', slug: 'espanola-way-miami',
    title: 'Hidden Gem Miami: Española Way dan Makan Malam',
    date: '2026-04-14', duration: 200, country: 'amerika', city: 'Miami', category: 'kuliner', still: 'maxres2',
    excerpt: 'Menyusuri Española Way yang hidup di malam hari, lalu makan malam di sana.',
    body: [],
  },
  {
    id: 'G58drdouivg', slug: 'miami-open-hard-rock-stadium',
    title: 'Pertama Kali Nonton Miami Open di Hard Rock Stadium',
    date: '2026-04-14', duration: 417, country: 'amerika', city: 'Miami', category: 'olahraga', still: 'maxres1',
    excerpt: 'Pengalaman pertama menonton tenis secara langsung, dengan atmosfer stadion yang luar biasa.',
    body: [
      'Akhirnya kesampaian juga merasakan langsung serunya Miami Open di Hard Rock Stadium, Miami!',
      'Ini adalah pengalaman pertama saya menonton pertandingan tenis secara langsung di salah satu venue olahraga terbesar di Miami. Bukan cuma pertandingannya yang seru, tapi atmosfer stadionnya benar-benar luar biasa. Dari suasana penonton, kemegahan stadion, sampai energi yang terasa sepanjang pertandingan, semuanya memberikan pengalaman yang berbeda dibanding menonton dari layar.',
      'Di video ini saya mengajak kalian melihat suasana Hard Rock Stadium dari dalam, mulai dari perjalanan masuk, kondisi stadion, area penonton, hingga atmosfer saat pertandingan berlangsung.',
    ],
  },
  {
    id: 'Syv-jTi1Xlk', slug: 'vespa-world-days-2022-bali',
    title: 'Vespa World Days 2022 Bali: Dari Mimpi, Akhirnya Terwujud demi Indonesia',
    date: '2025-07-05', duration: 249, country: 'indonesia', city: 'Bali', category: 'otomotif', still: 'maxres3',
    excerpt: 'Di balik terselenggaranya Vespa World Days Bali, event Vespa internasional pertama di Asia.',
    body: [
      'Bahagia bisa menjadi bagian dari perjalanan besar di balik terselenggaranya Vespa World Days (VWD) Bali, event Vespa internasional pertama di Asia.',
      'Dengan waktu persiapan yang sangat singkat, kami berusaha mewujudkan sesuatu yang belum pernah ada sebelumnya: menghadirkan ribuan pecinta Vespa dari seluruh dunia ke Pulau Dewata. Acara yang seharusnya digelar tahun 2020 akhirnya mundur ke 2022 karena Covid-19.',
      'Event ini bukan tanpa kekurangan. Namun dengan segala keterbatasan, tim dan komunitas kami berjuang sekuat tenaga untuk menghadirkan pengalaman tak terlupakan bagi semua peserta.',
      { quote: 'Ini bukan hanya soal Vespa, tapi tentang semangat, persaudaraan, dan mimpi yang menjadi nyata.' },
      'Terima kasih untuk semua yang hadir, mendukung, dan percaya bahwa Bali layak menjadi tuan rumah sejarah ini.',
    ],
  },
  {
    id: '6lqCKCfAF3Q', slug: 'the-alp-days-2019', playlist: 'PLKdbeN7DZ0hbK_2BHrwyJoMHkS_vbMC31',
    title: 'The Alp Days 2019: Sensasi Naik Vespa di Pegunungan Alpen',
    date: '2025-06-30', duration: 700, country: 'austria', city: 'Grossglockner', category: 'otomotif', still: 'maxres1',
    excerpt: 'Berkendara Vespa di jalur pegunungan Grossglockner, gunung tertinggi di Austria, dalam The Alp Days ke-10.',
    body: [
      'The Alp Days ke-10 pada tahun 2019 membawa kami berkendara Vespa di Grossglockner, gunung tertinggi di Austria.',
      'The Alp Days adalah perayaan tahunan Vespa terbesar di Eropa yang diadakan di Zell am See, Austria, sejak tahun 2010. Acara ini menarik lebih dari 5.000 penggemar Vespa dari berbagai negara untuk berkumpul dan menikmati keindahan pegunungan Alpen sambil berkendara dengan skuter klasik mereka.',
      'Video ini adalah pembuka playlist The Alp Days 2019 di channel kami. Ada sepuluh video yang mendokumentasikan perjalanan ini, dari unboxing goodie bag, aksi freestyle Vespa, perjalanan ke Bendungan Kaprun, sampai bendera Indonesia berkibar di acara penyambutan.',
    ],
  },
];

window.SHORTS = [
  { id: 'Baf9E1ri1wQ', title: 'Times Square di Waktu Malam', date: '2026-09-05', duration: 145, country: 'amerika', city: 'New York', category: 'jalan', still: 'oar1' },
  { id: 'GA-YCa4840U', title: 'Ferrari World Abu Dhabi, Yas Island', date: '2026-09-03', duration: 102, country: 'uea', city: 'Abu Dhabi', category: 'otomotif', still: 'oar1' },
  { id: 'C58A2YXhzPk', title: 'Makan Arab Otentik di Najd Palace', date: '2026-09-03', duration: 90, country: 'uea', city: 'Dubai', category: 'kuliner' },
  { id: 'GkWPGpawZso', title: 'Padel House di Dubai', date: '2026-09-03', duration: 113, country: 'uea', city: 'Dubai', category: 'olahraga' },
  { id: 'XxKHfLL-g4w', title: 'Keliling Kota Dubai', date: '2026-09-03', duration: 150, country: 'uea', city: 'Dubai', category: 'jalan' },
  { id: 'sTYaPMghf6I', title: 'Akhirnya Nyoba Daging Onta di Zam Zam Restaurant', date: '2026-09-03', duration: 111, country: 'uea', city: 'Dubai', category: 'kuliner', still: 'oar2' },
  { id: '8VyDcSPdm6o', title: 'Masuk Qasr Al Watan, Istana Kepresidenan Abu Dhabi', date: '2026-09-03', duration: 163, country: 'uea', city: 'Abu Dhabi', category: 'budaya' },
  { id: 'EVjD-fNsenA', title: 'Daging Onta di Al Asalah, Buffet Favorit Warga Abu Dhabi', date: '2026-09-03', duration: 146, country: 'uea', city: 'Abu Dhabi', category: 'kuliner' },
  { id: 'iIHHy2HZvl4', title: 'Masuk Trinity College, Universitas Tertua di Irlandia', date: '2026-09-02', duration: 103, country: 'irlandia', city: 'Dublin', category: 'budaya' },
  { id: 'GHA5TOFMaj8', title: 'Di Antara Queen Victoria Memorial dan Buckingham Palace', date: '2026-09-02', duration: 134, country: 'inggris', city: 'London', category: 'budaya' },
  { id: 'dUOcIUfEYnw', title: 'Hard Rock Cafe Piccadilly Circus', date: '2026-09-02', duration: 61, country: 'inggris', city: 'London', category: 'kuliner' },
  { id: 'MkbXXEZ5aDk', title: 'Kembali Lagi ke Big Ben', date: '2026-09-02', duration: 140, country: 'inggris', city: 'London', category: 'jalan' },
  { id: 'y6chn-Io0jo', title: 'Whisky di The Temple Bar', date: '2026-08-31', duration: 139, country: 'irlandia', city: 'Dublin', category: 'kuliner' },
  { id: 'rWg4186j2TY', title: 'The Temple Bar, Dublin', date: '2026-08-30', duration: 119, country: 'irlandia', city: 'Dublin', category: 'kuliner' },
  { id: '8BjE427UrbA', title: '9/11 Memorial & World Trade Center', date: '2026-08-27', duration: 118, country: 'amerika', city: 'New York', category: 'budaya' },
  { id: 'KwF7X0uuEZ4', title: 'Times Square, New York', date: '2026-08-27', duration: 143, country: 'amerika', city: 'New York', category: 'jalan' },
  { id: '3fP31WkPVqo', title: "Philly Cheesesteak di Geno's Steaks", date: '2026-08-27', duration: 129, country: 'amerika', city: 'Philadelphia', category: 'kuliner' },
  { id: 'prNpMcCLFYw', title: 'Harvard Business School', date: '2026-04-21', duration: 137, country: 'amerika', city: 'Boston', category: 'budaya' },
  { id: 'Zuw_kMHmZSk', title: 'The Guitar Hotel', date: '2026-04-16', duration: 168, country: 'amerika', city: 'Hollywood, Florida', category: 'jalan' },
  { id: '6n0LkdiYFGI', title: 'Hard Rock Cafe Hollywood', date: '2026-04-16', duration: 125, country: 'amerika', city: 'Hollywood, Florida', category: 'kuliner' },
  { id: 'rpvW8yQ55Mc', title: 'Nonton Miami Open di Hard Rock Stadium', date: '2026-04-14', duration: 154, country: 'amerika', city: 'Miami', category: 'olahraga' },
  { id: 'RfpcGmamlE0', title: 'Brighton Mod Weekender', date: '2025-10-24', duration: 172, country: 'inggris', city: 'Brighton', category: 'otomotif' },
  { id: 'gnnPwWnoddQ', title: 'Di Balik Layar Project #24timeframe', date: '2025-10-24', duration: 118, country: 'inggris', city: 'Brighton', category: 'otomotif' },
  { id: 'ibKY8FgubJk', title: 'Menjelajahi Pasar Camden', date: '2025-10-23', duration: 156, country: 'inggris', city: 'London', category: 'jalan' },
  { id: 'IJjygDXQLb8', title: 'Pure Mod Spirit: Rider dan Skuter Union Jack', date: '2025-10-22', duration: 145, country: 'inggris', city: 'Brighton', category: 'otomotif' },
  { id: 'vXC33uLYHac', title: 'Bertemu Kalle di Brighton Beach', date: '2025-10-21', duration: 75, country: 'inggris', city: 'Brighton', category: 'otomotif' },
  { id: 'IYix2su7vWU', title: 'Big Ben, Menara Jam Paling Ikonik di Inggris', date: '2025-10-19', duration: 66, country: 'inggris', city: 'London', category: 'jalan' },
  { id: 'EMDVzKJJTAA', title: 'Dr. Martens Store di Camden', date: '2025-10-19', duration: 106, country: 'inggris', city: 'London', category: 'jalan' },
  { id: '6JIIYgwyR_8', title: 'Le Chiffre Organization & The Baron Four di Studio Bar', date: '2025-10-19', duration: 82, country: 'inggris', city: 'Brighton', category: 'otomotif' },
  { id: 'Y40olAEOhno', title: 'Jas yang Jadi Buku Tamu di Brighton Mod Weekender', date: '2025-10-18', duration: 152, country: 'inggris', city: 'Brighton', category: 'otomotif' },
  { id: 'NCvAPSI5Lu8', title: 'City Ride di Amerika', date: '2025-07-17', duration: 61, country: 'amerika', city: null, category: 'otomotif' },
  { id: 'DAsu0ZiJhPw', title: 'Paris!', date: '2025-07-15', duration: 60, country: 'prancis', city: 'Paris', category: 'jalan' },
  { id: '3evj-xGA4uY', title: 'Museum Vespa Pribadi di Bawah Tanah Kota Milan', date: '2025-07-14', duration: 59, country: 'italia', city: 'Milan', category: 'otomotif' },
  { id: 'TX6bpxDOpZU', title: 'Bukan Pelarian, Ini Adalah Perjalanan', date: '2025-07-05', duration: 59, country: null, city: null, category: 'otomotif' },
  { id: 'fgSj4RwsrPY', title: 'Danau Kelimutu, Flores', date: '2025-07-04', duration: 59, country: 'indonesia', city: 'Flores', category: 'jalan' },
  { id: 'uS0r1cwjSBs', title: 'Test Drive Corvette di Chicago', date: '2025-07-03', duration: 60, country: 'amerika', city: 'Chicago', category: 'otomotif' },
  { id: 'v_zrEDaY0ZU', title: 'First Ride Harley di Bawah Langit Chicago', date: '2025-07-02', duration: 60, country: 'amerika', city: 'Chicago', category: 'otomotif' },
  { id: 'P_gzUuxaWzc', title: 'Tes Perdana Kamera Insta360 di Chicago', date: '2025-07-02', duration: 44, country: 'amerika', city: 'Chicago', category: 'jalan' },
  { id: 'vxx4hfpTwws', title: 'Menelusuri Sejarah Bendera Amerika di Betsy Ross House', date: '2025-06-30', duration: 130, country: 'amerika', city: 'Philadelphia', category: 'budaya', still: 'oar2' },
];
