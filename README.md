# Portofolio · Ardhana

Website portofolio statis dengan demo dashboard operasi tambang yang interaktif.

- `index.html` — halaman portofolio (profil, proyek, keahlian, pengalaman, kontak).
- `demo/` — demo dashboard: ringkasan produksi, armada, performa tim, roster shift.
- Dua bahasa (ID/EN) dan mode terang/gelap. Tanpa framework dan tanpa server.

**Semua data di demo adalah data dummy** (`assets/data.js`), dibangkitkan dengan benih tetap.
Tidak ada data, nama, atau sistem perusahaan mana pun.

## Menjalankan di komputer sendiri

```
python -m http.server 8000
```

lalu buka http://localhost:8000.

## Mengubah isi

- Teks portofolio (dua bahasa): kamus `I18N.tambah({id: {...}, en: {...}})` di bagian bawah `index.html`.
  Teks di dalam tanda kurung siku `[...]` adalah contoh yang perlu diganti.
- Data dummy demo: `assets/data.js`.

Ikon: [Phosphor Icons](https://phosphoricons.com) (MIT).
