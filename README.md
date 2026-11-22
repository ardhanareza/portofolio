# Portofolio · Reza Ardhana

Website portofolio statis dengan animasi "agen" yang membangun halaman, ditambah demo dashboard operasi tambang yang interaktif.

- `index.html`: halaman portofolio (hasil ekspor design tool). Dua bahasa (ID/EN), tombol di kanan atas.
  `support.js` adalah runtime ekspor tersebut. Jangan diedit.
- `studi-kasus-database.html`: studi kasus proyek 01 (Database & validation redesign), hasil ekspor design tool yang sama,
  dua bahasa. Dibuka dari kartu proyek 01 di halaman utama.
  Screenshot di bagian "The validator's view" (`assets/studi-kasus/`) adalah rekonstruksi layar Timesheet Validation
  dengan **data dummy**: frontend aslinya dijalankan, semua panggilan API dijawab data karangan. Tidak ada kode aplikasi di repo ini.
- `studi-kasus-dispatcher.html`: studi kasus proyek 02 (Dispatcher performance monitoring), dua bahasa.
  Dibuka dari kartu proyek 02 dan dari tautan "Berikutnya · 02" di studi kasus 01.
  Screenshot di bagian "Inside the dispatch app" (`assets/studi-kasus/dispatcher-fig*.webp`) adalah rekonstruksi
  Dashboard Dispatcher dengan **data dummy** (nama, unit, skor, dan pendingan karangan), dengan cara yang sama.
- `studi-kasus-shift-change.html`: studi kasus proyek 03 (Automated shift-change scheduling), dua bahasa
  (termasuk label diagram simulasi). Dibuka dari kartu proyek 03 dan dari tautan "Berikutnya" di studi kasus 02.
  Screenshot di bagian "Auto setting change shift" (`assets/studi-kasus/changeshift-fig*.webp`) adalah rekonstruksi
  alat Setting Change Shift dengan **data dummy** (lokasi CS, kode unit, kapasitas, dan prediksi karangan).
- `studi-kasus-fms.html`: studi kasus proyek 04 (FMS maintenance monitoring), dipasang apa adanya dari ekspor design tool
  (dua bahasa, tanpa screenshot; "ADS" diganti "FMS"; angka MTTR disamakan dengan CV: 4–6 jam menjadi di bawah 1 jam).
  Dibuka dari kartu proyek 04 dan dari tautan "Berikutnya" di studi kasus 03.
- `studi-kasus-simulasi.html`: studi kasus proyek 05 (Production simulation tool), dipasang apa adanya dari ekspor design tool,
  dua bahasa, tanpa screenshot. Dibuka dari kartu proyek 05 dan dari tautan "Berikutnya" di studi kasus 04.
- `demo/`: demo dashboard (ringkasan produksi, armada, performa tim, roster shift).
  **Semua data di demo adalah data dummy** (`assets/data.js`).
- `assets/CV-Muhammad-Reza-Ardhana.pdf`: CV untuk tombol "Unduh CV".

Catatan teknis: `index.html` memuat React dan Babel dari unpkg.com saat dibuka, lalu mengompilasi halaman di browser.
Kalau unpkg sedang gangguan, halaman utama tidak tampil (demo tetap jalan karena tanpa framework).

## Menjalankan di komputer sendiri

```
python -m http.server 8000
```

lalu buka http://localhost:8000.

## Mengubah isi

- Teks halaman utama: objek `KAMUS` (`en` dan `id`) di bagian `<script type="text/x-dc">` di `index.html`.
  Markup memakai `{{ t.kunci }}`. Nama, istilah teknis, dan kontak ditulis langsung di markup.
- Foto ada di folder `foto/`. Untuk mengganti, timpa dengan **nama file yang sama persis**:
  - `foto/profil.webp`: foto besar di hero. WebP latar transparan, rasio ±0,68 (1000×1470), dipotong dari atas kepala
    sampai paha. Bagian bawah foto menempel ke dasar hero (di HP: di bawah tulisan PORTOFOLIO).
  - `foto/tentang.jpg`: foto di bagian About. Rasio 4:5 (840×1050). Isi layar monitor sengaja diburamkan.
  Kalau nama atau formatnya beda, ubah `src` pada `<img>` di `index.html`.
  Kompres foto dulu (misalnya di squoosh.app), usahakan di bawah 300 KB supaya halaman cepat terbuka.
- Data dummy demo: `assets/data.js`.

Ikon demo: [Phosphor Icons](https://phosphoricons.com) (MIT).
