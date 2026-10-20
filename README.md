# InvestCow — Interactive Research Presentation Website (SEHATI 2026)

Website presentasi interaktif untuk penelitian akademik yang dipresentasikan pada **Seminar Nasional Humaniora dan Aplikasi Teknologi Informasi (SEHATI 2026) · ISSN 2477-0078**.

---

## 📌 Identitas Penelitian

- **Judul Penelitian**: *InvestCow: Pengembangan Platform Crowdfunding Ternak Sapi Berbasis Mobile dengan Transparansi Data Real-Time dan Monitoring Visual*
- **Peneliti**: Moh. Syaiful Anam
- **NPM**: 2022020100078
- **Program Studi**: Teknik Informatika
- **Institusi**: Universitas Islam Madura, Pamekasan, Jawa Timur, Indonesia
- **Pembimbing I**: Aang Kisnu Darmawan, S.T., M.M.
- **Pembimbing II**: Anwari, S.Kom., M.T.
- **Forum Seminar**: SEHATI 2026
- **Repositori Proyek**: [https://github.com/siapaajaboleh888/InvestCow_Project](https://github.com/siapaajaboleh888/InvestCow_Project)

---

## 🚀 Panduan Deployment Gratis ke GitHub Pages

Website ini dibangun menggunakan **Vanilla HTML5, CSS3, dan JavaScript Modern (ES6+)** tanpa ketergantungan server backend, sehingga siap dihosting secara **100% gratis** melalui **GitHub Pages**.

### Cara Publikasi Menggunakan Folder `/docs` (Sangat Direkomendasikan):

1. **Push repositori ini ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete interactive presentation website for SEHATI 2026"
   git branch -M main
   git remote add origin https://github.com/siapaajaboleh888/Landing-Page_InvestCow.git
   git push -u origin main
   ```
2. **Aktifkan GitHub Pages**:
   - Buka repositori Anda di GitHub: `https://github.com/siapaajaboleh888/Landing-Page_InvestCow` (atau branch pada repo utama).
   - Masuk ke tab **Settings** > **Pages** (di menu sebelah kiri).
   - Di bagian **Build and deployment**:
     - **Source**: Pilih `Deploy from a branch`
     - **Branch**: Pilih `main`
     - **Folder**: Pilih `/docs`
     - Klik **Save**.
3. **Selesai!** Dalam 1–2 menit, website presentasi Anda akan live di:
   `https://siapaajaboleh888.github.io/Landing-Page_InvestCow/`

---

## 📁 Struktur Berkas

```
Landing-Page_InvestCow/
├── docs/                               <-- Folder utama publikasi GitHub Pages
│   ├── index.html                      <-- Halaman presentasi interaktif lengkap
│   ├── .nojekyll                       <-- Mematikan build Jekyll bawaan GitHub
│   ├── assets/
│   │   └── images/
│   │       ├── logo.png                <-- Logo resmi InvestCow
│   │       ├── hero_concept.jpg        <-- Visual komposisi AgriTech & FinTech
│   │       ├── devops_lifecycle.png    <-- Diagram siklus 8 tahap DevOps
│   │       ├── system_architecture.png <-- Diagram arsitektur 3 lapis
│   │       ├── layered_transparency.png<-- Diagram model transparansi berlapis
│   │       └── mobile_screens_grid.jpg <-- Dokumentasi 12 layar UI asli
│   ├── styles/
│   │   └── main.css                    <-- Styling bertema Deep Forest Green & Emerald
│   └── scripts/
│       ├── main.js                     <-- Navigasi, scroll tracker, tab switcher
│       ├── workflow.js                 <-- Diagram alur multi-aktor interaktif
│       ├── charts.js                   <-- Bar chart UAT & Price Engine simulator
│       └── presentation.js             <-- Mode Presentasi fokus slide (Shortcut [P])
├── presentation-site/                  <-- Folder cermin (mirror) sesuai spesifikasi
├── index.html                          <-- Redirect instan root ke docs/
└── README.md                           <-- Dokumentasi proyek
```

---

## 🎮 Fitur Interaktif & Mode Presentasi

1. **Mode Presentasi Fokus (Presentation Mode)**:
   - Tekan tombol **[P]** pada keyboard atau klik tombol **"Mode Presentasi"** di navbar.
   - Mode ini mengubah landing page menjadi slide-by-slide deck yang minim distraksi.
   - Gunakan tombol panah `Arrow Right` (maju), `Arrow Left` (mundur), dan `Escape` (keluar).
2. **Diagram Alur Multi-Aktor Interaktif**:
   - Filter alur: *Semua Alur*, *Alur Investor*, *Alur Pengelola/Admin*, dan *Alur Data & Visual*.
   - Klik aktor atau simpul tahapan untuk membaca tanggung jawab, input, proses, output, dan status verifikasi di panel inspektur.
3. **Simulasi Price Engine & CCTV**:
   - Pilihan timeframe interaktif (1 Minggu, 1 Bulan, 1 Tahun) pada Price Engine simulator.
   - Indikator timecode dinamis jam lokal WIB pada simulasi CCTV kandang.
4. **Visualisasi Data UAT 101 Responden**:
   - Animasi hitung angka (Counter Animation).
   - Horizontal progress bar untuk 4 variabel: Kualitas Informasi (4,12), Transparansi Sistem (4,17), Kepercayaan Pengguna (4,11), dan Usability (4,12).
   - Indikasi temuan tertinggi (Akurasi Data 4,28, CCTV 4,24, Mekanisme Harga 4,23) dan area perbaikan (Kelengkapan Portofolio 3,99).

---

## ⚖️ Integritas Akademik & Batasan Riset

Website presentasi ini disusun secara jujur berdasarkan dokumen materi presentasi SEHATI 2026:
- Nilai Grand Mean 4,13 merepresentasikan **persepsi dan penerimaan pengguna (UAT)** terhadap prototipe platform, bukan jaminan keuntungan finansial atau garansi nihil risiko.
- Transparansi berlapis (Price Engine + CCTV) berfungsi sebagai alat mitigasi asimetri informasi antara investor dan pengelola, melengkapi—bukan menggantikan—audit fisik dan pemeriksaan veteriner independen.
