/* Grafik SVG kecil tanpa pustaka luar: garis (crosshair + tooltip), batang (tooltip per batang), dan sparkline.
   Aturan (panduan dataviz): satu sumbu Y, garis 2px, ujung batang membulat 4px menempel di garis dasar, grid tipis,
   warna seri dari token (--s1..--s3), teks memakai warna tinta (bukan warna seri). Ukuran mengikuti lebar wadah. */
(function(){
  const NS = "http://www.w3.org/2000/svg";
  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
  function skala(min, max, n){              // tik "bagus" untuk sumbu Y
    const rentang = max - min || 1, kasar = rentang / n, p = Math.pow(10, Math.floor(Math.log10(kasar))), f = kasar / p;
    const langkah = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * p, a = Math.floor(min / langkah) * langkah, b = Math.ceil(max / langkah) * langkah;
    const tik = []; for(let v = a; v <= b + langkah / 2; v += langkah) tik.push(+v.toFixed(6));
    return {a, b, tik};
  }
  function pasangUkuran(el, gambar){
    let lebar = 0;
    const jalan = () => { const w = Math.round(el.clientWidth); if(w && w !== lebar){ lebar = w; gambar(w); } };
    if(el._ro) el._ro.disconnect();
    el._ro = new ResizeObserver(jalan); el._ro.observe(el); jalan();
    el._gambarUlang = () => { lebar = 0; jalan(); };
  }
  function tip(el){ let t = el.querySelector(".gf-tip"); if(!t){ t = document.createElement("div"); t.className = "gf-tip"; t.setAttribute("role", "status"); el.appendChild(t); } return t; }
  function taruhTip(el, t, x, y){
    const w = el.clientWidth, tw = t.offsetWidth;
    t.style.left = Math.max(4, Math.min(w - tw - 4, x + 14 > w - tw ? x - tw - 14 : x + 14)) + "px"; t.style.top = Math.max(0, y - 10) + "px";
  }

  /* ---------- garis: seri = [{nama, warna, nilai: [...], putus: bool}] ; x = label per titik ---------- */
  function garis(el, o){
    const tinggi = o.tinggi || 260, kiri = 56, kanan = 64, atas = 14, bawah = 30;
    pasangUkuran(el, W => {
      const semua = o.seri.flatMap(s => s.nilai).filter(v => v != null);
      const sk = skala(o.min0 ? 0 : Math.min(...semua) * 0.97, Math.min(o.maks ?? Infinity, Math.max(...semua) * 1.02), 4);
      if(o.maks != null && sk.b > o.maks){ sk.b = o.maks; sk.tik = sk.tik.filter(v => v <= o.maks); if(sk.tik[sk.tik.length - 1] !== o.maks) sk.tik.push(o.maks); }   // skor/persen tidak pernah di atas 100
      const n = o.x.length, px = i => kiri + (n === 1 ? 0 : i * (W - kiri - kanan) / (n - 1)), py = v => atas + (1 - (v - sk.a) / (sk.b - sk.a)) * (tinggi - atas - bawah);
      let s = `<svg viewBox="0 0 ${W} ${tinggi}" width="100%" height="${tinggi}" role="img" aria-label="${esc(o.label || "")}">`;
      for(const v of sk.tik) s += `<line x1="${kiri}" x2="${W - kanan}" y1="${py(v)}" y2="${py(v)}" stroke="var(--grid)" stroke-width="1"/><text x="${kiri - 8}" y="${py(v) + 4}" text-anchor="end" class="gf-sumbu">${esc(o.format(v, true))}</text>`;
      const jarak = Math.max(1, Math.ceil(n / Math.max(2, Math.floor((W - kiri - kanan) / 70))));
      const tik = o.x.map((_, i) => i).filter(i => i % jarak === 0);
      if(tik[tik.length - 1] !== n - 1){ if(n - 1 - tik[tik.length - 1] < jarak * 0.6) tik.pop(); tik.push(n - 1); }   // label terakhir selalu tampil tanpa menumpuk label sebelumnya
      tik.forEach(i => { s += `<text x="${px(i)}" y="${tinggi - 8}" text-anchor="middle" class="gf-sumbu">${esc(o.labelX(o.x[i]))}</text>`; });
      for(const sr of o.seri){
        let d = "", baru = true;
        sr.nilai.forEach((v, i) => { if(v == null){ baru = true; return; } d += (baru ? "M" : "L") + px(i).toFixed(1) + " " + py(v).toFixed(1); baru = false; });
        s += `<path d="${d}" fill="none" stroke="${sr.warna}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${sr.putus ? ' stroke-dasharray="5 5"' : ""}/>`;
        const akhir = sr.nilai.length - 1;   // label langsung di ujung kanan (<= 4 seri)
        if(o.seri.length <= 4 && sr.nilai[akhir] != null) s += `<text x="${px(akhir) + 8}" y="${py(sr.nilai[akhir]) + 4}" class="gf-label">${esc(sr.nama)}</text>`;
      }
      s += `<line class="gf-silang" x1="0" x2="0" y1="${atas}" y2="${tinggi - bawah}" stroke="var(--axis)" stroke-width="1" visibility="hidden"/>`;
      s += o.seri.map((sr, k) => `<circle class="gf-titik" data-k="${k}" r="5" fill="${sr.warna}" stroke="var(--panel)" stroke-width="2" visibility="hidden"/>`).join("");
      s += `<rect x="${kiri}" y="${atas}" width="${W - kiri - kanan}" height="${tinggi - atas - bawah}" fill="transparent" class="gf-tangkap"/></svg>`;
      el.innerHTML = s;
      const svg = el.querySelector("svg"), garisSilang = svg.querySelector(".gf-silang"), titik = svg.querySelectorAll(".gf-titik"), t = tip(el);
      const tunjuk = cx => {
        const r = svg.getBoundingClientRect(), x = (cx - r.left) * W / r.width, i = Math.max(0, Math.min(n - 1, Math.round((x - kiri) / ((W - kiri - kanan) / Math.max(1, n - 1)))));
        garisSilang.setAttribute("x1", px(i)); garisSilang.setAttribute("x2", px(i)); garisSilang.setAttribute("visibility", "visible");
        titik.forEach(c => { const v = o.seri[+c.dataset.k].nilai[i]; c.setAttribute("visibility", v == null ? "hidden" : "visible"); if(v != null){ c.setAttribute("cx", px(i)); c.setAttribute("cy", py(v)); } });
        t.innerHTML = `<b>${esc(o.labelXPanjang ? o.labelXPanjang(o.x[i]) : o.labelX(o.x[i]))}</b>` + o.seri.map(sr => `<span><i style="background:${sr.warna}"></i>${esc(sr.nama)}<em>${sr.nilai[i] == null ? "–" : esc(o.format(sr.nilai[i]))}</em></span>`).join("") + (o.ekstra ? o.ekstra(i) : "");
        t.style.display = "block"; taruhTip(el, t, px(i) * r.width / W, 10);
      };
      const lepas = () => { garisSilang.setAttribute("visibility", "hidden"); titik.forEach(c => c.setAttribute("visibility", "hidden")); t.style.display = "none"; };
      svg.addEventListener("pointermove", e => tunjuk(e.clientX)); svg.addEventListener("pointerleave", lepas);
      svg.addEventListener("pointerdown", e => tunjuk(e.clientX));
    });
  }

  /* ---------- batang vertikal satu seri: kategori = [label], nilai = [...] ---------- */
  function batang(el, o){
    const tinggi = o.tinggi || 240, kiri = 56, kanan = 12, atas = 22, bawah = 30;
    pasangUkuran(el, W => {
      const sk = skala(0, Math.max(...o.nilai) * 1.08, 4), n = o.nilai.length, slot = (W - kiri - kanan) / n, lb = Math.min(64, slot * 0.56);
      const py = v => atas + (1 - (v - sk.a) / (sk.b - sk.a)) * (tinggi - atas - bawah), dasar = py(0);
      let s = `<svg viewBox="0 0 ${W} ${tinggi}" width="100%" height="${tinggi}" role="img" aria-label="${esc(o.label || "")}">`;
      for(const v of sk.tik) s += `<line x1="${kiri}" x2="${W - kanan}" y1="${py(v)}" y2="${py(v)}" stroke="var(--grid)"/><text x="${kiri - 8}" y="${py(v) + 4}" text-anchor="end" class="gf-sumbu">${esc(o.format(v, true))}</text>`;
      o.nilai.forEach((v, i) => {
        const x = kiri + i * slot + (slot - lb) / 2, y = py(v), r = Math.min(4, (dasar - y) / 2);
        s += `<path class="gf-batang" data-i="${i}" d="M${x} ${dasar}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + lb - r}Q${x + lb} ${y} ${x + lb} ${y + r}V${dasar}Z" fill="${o.warna}"/>`;
        if(n <= 6) s += `<text x="${x + lb / 2}" y="${y - 7}" text-anchor="middle" class="gf-label">${esc(o.format(v))}</text>`;
        s += `<text x="${x + lb / 2}" y="${tinggi - 8}" text-anchor="middle" class="gf-sumbu">${esc(o.kategori[i])}</text>`;
        s += `<rect class="gf-kena" data-i="${i}" x="${kiri + i * slot}" y="${atas}" width="${slot}" height="${dasar - atas}" fill="transparent"/>`;
      });
      s += `<line x1="${kiri}" x2="${W - kanan}" y1="${dasar}" y2="${dasar}" stroke="var(--axis)"/></svg>`;
      el.innerHTML = s;
      const t = tip(el), svg = el.querySelector("svg");
      svg.querySelectorAll(".gf-kena").forEach(k => {
        const i = +k.dataset.i, b = svg.querySelector(`.gf-batang[data-i="${i}"]`);
        const tampil = () => { svg.querySelectorAll(".gf-batang").forEach(x => x.style.opacity = x === b ? 1 : 0.55); t.innerHTML = `<b>${esc(o.kategori[i])}</b><span><i style="background:${o.warna}"></i>${esc(o.namaSeri || "")}<em>${esc(o.format(o.nilai[i]))}</em></span>` + (o.ekstra ? o.ekstra(i) : ""); t.style.display = "block";
          const r = svg.getBoundingClientRect(); taruhTip(el, t, (kiri + (i + 0.5) * slot) * r.width / W, 10); };
        k.addEventListener("pointerenter", tampil); k.addEventListener("pointerdown", tampil);
        k.addEventListener("pointerleave", () => { svg.querySelectorAll(".gf-batang").forEach(x => x.style.opacity = 1); t.style.display = "none"; });
      });
    });
  }

  /* ---------- sparkline (tanpa sumbu; untuk tren kecil di kartu/baris) ---------- */
  function spark(nilai, warna, w = 120, h = 32){
    const v = nilai.filter(x => x != null), min = Math.min(...v), max = Math.max(...v), px = i => 2 + i * (w - 4) / Math.max(1, nilai.length - 1), py = x => h - 3 - (x - min) / ((max - min) || 1) * (h - 6);
    let d = "", baru = true; nilai.forEach((x, i) => { if(x == null){ baru = true; return; } d += (baru ? "M" : "L") + px(i).toFixed(1) + " " + py(x).toFixed(1); baru = false; });
    const a = nilai.length - 1;
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><path d="${d}" fill="none" stroke="${warna}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${nilai[a] != null ? `<circle cx="${px(a)}" cy="${py(nilai[a])}" r="3" fill="${warna}"/>` : ""}</svg>`;
  }

  window.Grafik = {garis, batang, spark, esc};
})();
