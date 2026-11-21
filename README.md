# Portofolio · Reza Ardhana

Website portofolio statis dengan animasi "agen" yang membangun halaman, ditambah demo dashboard operasi tambang yang interaktif.

- `index.html`: halaman portofolio (hasil ekspor design tool). Dua bahasa (ID/EN), tombol di kanan atas.
  `support.js` dan `image-slot.js` adalah runtime ekspor tersebut. Jangan diedit.
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
- Foto: dua kotak foto (`data-foto="hero-portrait"` dan `data-foto="about-photo"`) disembunyikan karena belum ada fotonya.
  Taruh foto di `assets/`, tambahkan `src="assets/nama-foto.jpg"` pada `<image-slot>`-nya, lalu hapus `display:none;` di div pembungkusnya.
- Data dummy demo: `assets/data.js`.

Ikon demo: [Phosphor Icons](https://phosphoricons.com) (MIT).
