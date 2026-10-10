/* ============================================================
   DATA ARTIKEL — Danny's Project Studio
   Tambah artikel baru: salin satu blok { ... } di bawah, ganti isinya.
   - id       : ID video YouTube (bagian setelah ?v= di link video)
   - slug     : alamat artikel (huruf kecil, pakai tanda hubung, unik)
   - region   : uea | amerika | inggris | skotlandia | lainnya
   - category : Destinasi | Kuliner | Olahraga | Budaya
   - body     : daftar paragraf. Ganti/tambah dengan cerita asli Danny.
   ============================================================ */

window.SITE = {
  name: "Danny's Project Studio",
  channelUrl: "https://www.youtube.com/@dannymamesahstudio",
  channelId: "UCU2jb3aEWcQ9C4ktFD4upGQ",
  about:
    "Kumpulan film dokumentasi perjalanan dan kegiatan bersama kawan-kawan, sahabat, keluarga, dan kunjungan pekerjaan. Seputar destinasi, kuliner, events, Vespa, Harley Davidson, Moto Guzzi, budaya, dan olahraga.",
  topics: ["Destinasi", "Kuliner", "Events", "Vespa", "Harley Davidson", "Moto Guzzi", "Budaya", "Olahraga"],
};

window.REGIONS = {
  skotlandia: { label: "Skotlandia", places: "St Andrews", blurb: "Kota kelahiran golf, dan hotel yang menghadap fairway." },
  inggris: { label: "Inggris", places: "Brighton", blurb: "Menyusuri jejak budaya Mods di tepi pantai selatan." },
  amerika: { label: "Amerika Serikat", places: "New York & Washington DC", blurb: "Dari lampu Times Square sampai Lincoln Memorial." },
  uea: { label: "Uni Emirat Arab", places: "Dubai & Abu Dhabi", blurb: "Istana, taman bermain, dan makan malam yang tidak biasa." },
  lainnya: { label: "Lainnya", places: "", blurb: "" },
};

window.ARTICLES = [
  {
    id: "aTkVF-SiFa4",
    slug: "jalan-jalan-st-andrews-skotlandia",
    title: "Jalan-Jalan di St Andrews, Skotlandia: Ready to Golf!",
    date: "2026-09-10",
    region: "skotlandia",
    category: "Olahraga",
    excerpt: "Hari pertama berkeliling St Andrews, kota kecil di pesisir Skotlandia yang dikenal sebagai tempat kelahiran golf.",
    body: [
      "St Andrews adalah kota kecil di pesisir timur Skotlandia yang namanya nyaris identik dengan golf. Old Course, lapangan tertuanya, sudah dimainkan selama berabad-abad dan jadi alasan banyak pegolf menempuh perjalanan jauh ke sini.",
      "Di video ini Danny berjalan-jalan di sekitar kota dan bersiap untuk bermain. Tonton videonya untuk melihat suasana kota dan lapangannya langsung.",
    ],
  },
  {
    id: "-Hg09FwQbS4",
    slug: "tiba-di-st-andrews-menginap-di-rusacks-hotel",
    title: "Akhirnya Tiba di St Andrews dan Menginap di Rusacks Hotel",
    date: "2026-09-09",
    region: "skotlandia",
    category: "Destinasi",
    excerpt: "Tiba di St Andrews dan check-in di Rusacks Hotel, penginapan legendaris di tepi lapangan golf.",
    body: [
      "Setelah perjalanan panjang, rombongan akhirnya tiba di St Andrews. Pemberhentian pertama: Rusacks Hotel, hotel bersejarah yang berdiri di dekat Old Course.",
      "Video ini merekam momen kedatangan dan tur singkat penginapan, cocok buat yang sedang mempertimbangkan tempat menginap untuk perjalanan golf ke Skotlandia.",
    ],
  },
  {
    id: "bFxcVNU-Cvk",
    slug: "keliling-brighton-jump-the-gun-quadrophenia-alley",
    title: "Keliling Brighton: Jump The Gun dan Quadrophenia Alley, Jejak Film Mods (1979)",
    date: "2026-09-08",
    region: "inggris",
    category: "Budaya",
    excerpt: "Mampir ke toko Jump The Gun dan menyusuri Quadrophenia Alley, lokasi film Mods tahun 1979 di Brighton.",
    body: [
      "Brighton punya tempat khusus dalam sejarah subkultur Mods. Film Quadrophenia (1979) merekam bentrokan Mods dan Rockers di kota ini, dan sampai sekarang jejaknya masih bisa ditelusuri.",
      "Danny mampir ke Jump The Gun, lalu menyusuri Quadrophenia Alley. Cocok untuk penggemar film, musik, dan budaya skuter.",
    ],
  },
  {
    id: "gwe8rIN5E2c",
    slug: "kiblat-pakaian-mods-brighton-modfather",
    title: "Kiblat Pakaian Mods di Brighton, Bertemu Anak Founder Modfather",
    date: "2026-09-08",
    region: "inggris",
    category: "Budaya",
    excerpt: "Berkunjung ke toko yang jadi rujukan gaya berpakaian Mods dan berbincang dengan anak dari pendiri Modfather.",
    body: [
      "Gaya berpakaian adalah jantung budaya Mods: jas ramping, parka, dan detail yang rapi. Di Brighton, ada toko yang jadi rujukan bagi para penggemarnya.",
      "Di video ini Danny bertemu anak dari pendiri Modfather dan melihat langsung koleksinya.",
    ],
  },
  {
    id: "WeMu4cvsrJA",
    slug: "menuju-tempat-kelahiran-mods-brighton",
    title: "Menuju Tempat Kelahiran Mods: Dari Indonesia, Transit Hong Kong, Berlabuh di Brighton",
    date: "2026-09-08",
    region: "inggris",
    category: "Destinasi",
    excerpt: "Awal perjalanan: terbang dari Indonesia, transit di Hong Kong, lalu tiba di Brighton.",
    body: [
      "Setiap perjalanan panjang dimulai dari bandara. Rute kali ini: Indonesia, transit di Hong Kong, lalu mendarat dan berlabuh di Brighton, kota yang sering disebut sebagai tempat kelahiran Mods.",
      "Video ini jadi pembuka seri perjalanan Inggris dan Skotlandia.",
    ],
  },
  {
    id: "Baf9E1ri1wQ",
    slug: "times-square-new-york-malam-hari",
    title: "Times Square, New York di Waktu Malam",
    date: "2026-09-05",
    region: "amerika",
    category: "Destinasi",
    excerpt: "Berjalan di Times Square saat malam, ketika layar-layar raksasa dan keramaian New York mencapai puncaknya.",
    body: [
      "Times Square paling hidup setelah matahari terbenam. Layar iklan raksasa, lalu lalang orang dari seluruh dunia, dan hiruk pikuk Manhattan jadi satu.",
      "Video ini merekam suasana malamnya apa adanya, tanpa banyak narasi, supaya Anda bisa merasakan keramaiannya.",
    ],
  },
  {
    id: "10IFeBwb7Yg",
    slug: "whisky-tasting-markas-diageo",
    title: "Whisky Tasting: Terbang Langsung ke Markas Diageo",
    date: "2026-09-05",
    region: "lainnya",
    category: "Kuliner",
    excerpt: "Undangan langsung ke markas Diageo untuk sesi whisky tasting.",
    body: [
      "Diageo adalah salah satu produsen minuman beralkohol terbesar di dunia, dengan banyak merek whisky di bawah naungannya.",
      "Danny terbang langsung ke markasnya untuk sesi whisky tasting. Tonton videonya untuk melihat bagaimana sesi itu berlangsung.",
    ],
  },
  {
    id: "FsMv1sCmmRk",
    slug: "menyusuri-washington-dc-le-meridien-lincoln-memorial",
    title: "Menyusuri Washington DC dari Le Méridien ke Lincoln Memorial",
    date: "2026-09-05",
    region: "amerika",
    category: "Destinasi",
    excerpt: "Berjalan kaki dari hotel Le Méridien sampai Lincoln Memorial di jantung Washington DC.",
    body: [
      "Washington DC adalah kota yang nyaman dijelajahi dengan berjalan kaki. Rute dalam video ini dimulai dari Le Méridien dan berakhir di Lincoln Memorial.",
      "Sepanjang jalan, Danny merekam suasana kota, jalanan, dan monumen yang dilewati.",
    ],
  },
  {
    id: "GA-YCa4840U",
    slug: "ferrari-world-abu-dhabi-yas-island",
    title: "Ferrari World Abu Dhabi, Yas Island",
    date: "2026-09-04",
    region: "uea",
    category: "Destinasi",
    excerpt: "Berkunjung ke Ferrari World, taman bermain bertema Ferrari di Yas Island, Abu Dhabi.",
    body: [
      "Ferrari World berada di Yas Island, Abu Dhabi, dan merupakan taman hiburan bertema Ferrari. Untuk penggemar otomotif, tempat ini jadi destinasi yang sulit dilewatkan.",
      "Video ini mengajak Anda berkeliling di dalamnya.",
    ],
  },
  {
    id: "C58A2YXhzPk",
    slug: "daging-onta-najd-palace-dubai",
    title: "Daging Onta Lagi: Makan Arab Otentik di Dubai, Najd Palace",
    date: "2026-09-04",
    region: "uea",
    category: "Kuliner",
    excerpt: "Kembali mencoba daging onta, kali ini di restoran Najd Palace, Dubai, dengan sajian Arab otentik.",
    body: [
      "Setelah sebelumnya mencoba daging onta di tempat lain, Danny kembali mencicipinya di Najd Palace, restoran yang menyajikan masakan Arab otentik.",
      "Tonton videonya untuk melihat hidangan dan reaksinya.",
    ],
  },
  {
    id: "GkWPGpawZso",
    slug: "padel-house-dubai",
    title: "Padel House di Dubai",
    date: "2026-09-04",
    region: "uea",
    category: "Olahraga",
    excerpt: "Mampir ke Padel House di Dubai, tempat bermain padel yang sedang naik daun.",
    body: [
      "Padel, olahraga raket yang mirip campuran tenis dan squash, makin populer di banyak negara. Di Dubai, Danny mampir ke Padel House.",
      "Cocok buat yang ingin tahu seperti apa fasilitas padel di sana.",
    ],
  },
  {
    id: "XxKHfLL-g4w",
    slug: "keliling-kota-dubai",
    title: "Keliling Kota Dubai",
    date: "2026-09-04",
    region: "uea",
    category: "Destinasi",
    excerpt: "Berkeliling Dubai, dari jalanan kota sampai sudut-sudut yang jadi ciri khasnya.",
    body: [
      "Dubai terkenal dengan gedung-gedung tinggi dan kota yang tumbuh sangat cepat. Video ini mengajak Anda berkeliling kota dan melihat sisi sehari-harinya.",
    ],
  },
  {
    id: "sTYaPMghf6I",
    slug: "daging-onta-zamzam-restaurant-dubai",
    title: "Akhirnya Nyoba Daging Onta di Dubai! Zam Zam Restaurant",
    date: "2026-09-03",
    region: "uea",
    category: "Kuliner",
    excerpt: "Pertama kali mencoba daging onta di Zam Zam Restaurant, Dubai.",
    body: [
      "Salah satu hal yang paling bikin penasaran saat ke Dubai: daging onta. Di Zam Zam Restaurant, Danny akhirnya mencobanya.",
      "Video ini jadi bagian pertama dari petualangan kuliner onta di Dubai.",
    ],
  },
  {
    id: "6wctwf3QuKw",
    slug: "qasr-al-watan-hadiah-diplomatik-dunia",
    title: "Qasr Al Watan: Megahnya Istana Kepresidenan Abu Dhabi dan Hadiah Diplomatik Dunia",
    date: "2026-09-03",
    region: "uea",
    category: "Budaya",
    excerpt: "Melihat koleksi hadiah diplomatik dari berbagai negara yang dipajang di Qasr Al Watan.",
    body: [
      "Qasr Al Watan adalah istana kepresidenan di Abu Dhabi yang terbuka untuk pengunjung. Selain arsitekturnya, istana ini menyimpan hadiah-hadiah diplomatik dari berbagai penjuru dunia.",
      "Video ini fokus pada koleksi hadiah tersebut. Untuk tur bagian dalam istananya, tonton juga bagian pertamanya.",
    ],
  },
  {
    id: "8VyDcSPdm6o",
    slug: "masuk-qasr-al-watan-istana-kepresidenan-abu-dhabi",
    title: "Masuk Qasr Al Watan! Istana Kepresidenan Abu Dhabi yang Megah",
    date: "2026-09-03",
    region: "uea",
    category: "Destinasi",
    excerpt: "Melangkah masuk ke Qasr Al Watan, istana kepresidenan Abu Dhabi dengan interior yang megah.",
    body: [
      "Bagian pertama kunjungan ke Qasr Al Watan: dari gerbang masuk sampai aula-aula utama istana kepresidenan Abu Dhabi.",
      "Lanjutkan ke bagian kedua untuk melihat koleksi hadiah diplomatiknya.",
    ],
  },
];
