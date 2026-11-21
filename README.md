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
- Foto ada di folder `foto/`. Isinya masih gambar dummy. Timpa dengan foto Anda **dengan nama file yang sama persis**:
  - `foto/profil.png`: foto besar di hero. Sebaiknya PNG latar transparan (badan saja, tanpa background), potret ±3:4,
    lebar minimal 900 px. Bagian bawah foto menempel ke dasar layar.
  - `foto/tentang.jpg`: foto di bagian About. Rasio 4:5 (misalnya 840×1050 px), bebas foto di lapangan atau di kantor.
  Kalau nama atau formatnya beda (misalnya `.jpeg` atau `.webp`), ubah `src` pada `<img>` di `index.html`.
  Kompres foto dulu (misalnya di squoosh.app), usahakan di bawah 300 KB supaya halaman cepat terbuka.
- Data dummy demo: `assets/data.js`.

Ikon demo: [Phosphor Icons](https://phosphoricons.com) (MIT).
