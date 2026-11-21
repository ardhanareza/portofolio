# Portofolio · Reza Ardhana

Website portofolio statis dengan animasi "agen" yang membangun halaman, ditambah demo dashboard operasi tambang yang interaktif.

- `index.html`: halaman portofolio (hasil ekspor design tool). Dua bahasa (ID/EN), tombol di kanan atas.
  `support.js` adalah runtime ekspor tersebut. Jangan diedit.
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
