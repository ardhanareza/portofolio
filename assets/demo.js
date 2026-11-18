/* Demo dashboard operasi tambang (data dummy dari data.js). Satu halaman, lima tab; tab tersimpan di alamat (#ringkasan, #armada, ...)
   supaya bisa dibagikan langsung. Semua teks lewat I18N.t, jadi ganti bahasa menggambar ulang tanpa memuat ulang halaman. */
(function(){
  const {esc, garis, batang, spark} = Grafik, D = DATA, t = (k, v) => I18N.t(k, v);
  I18N.tambah({
    id: {lewati: "Lewati ke isi", keportofolio: "Kembali ke portofolio", bahasa: "Bahasa", tema: "Ganti tema", eyebrow: "Demo · Data dummy",
      pita: "Semua angka, nama orang, pit, dan unit di demo ini adalah data karangan untuk portofolio.",
      t_ringkasan: "Ringkasan produksi", t_armada: "Armada", t_tim: "Performa tim", t_roster: "Roster shift", t_tentang: "Tentang demo",
      m_ringkasan: "Ringkasan", m_armada: "Armada", m_tim: "Tim", m_roster: "Roster", m_tentang: "Tentang",
      sub_periode: "{a} – {b} · {n} hari", hari: "{n} hari", semua_pit: "Semua pit", pit: "Pit",
      k_ob: "Overburden", k_coal: "Batubara", k_pa: "Physical availability", k_ua: "Use of availability", k_ct: "Cycle time", k_hujan: "Jam hujan",
      dari_rencana: "{p} dari rencana", rata: "rata-rata", menit: "menit", jam: "jam", total: "total periode",
      g_ob: "Overburden harian: aktual vs rencana", g_ob_sub: "BCM per hari. Arahkan kursor (atau ketuk) grafik untuk melihat angka harian.",
      aktual: "Aktual", rencana: "Rencana", hujan_tip: "Hujan", g_pit: "Overburden per pit", g_pit_sub: "Total BCM pada periode terpilih.",
      g_pa: "Ketersediaan alat (rata-rata harian)", g_pa_sub: "PA = alat siap pakai; UA = alat siap yang benar-benar dipakai.",
      lihat_tabel: "Lihat sebagai tabel", tanggal: "Tanggal", rb: "rb", jt: "jt",
      a_ringkas: "Status armada saat ini", a_ringkas_sub: "{n} unit di semua pit.", semua_jenis: "Semua jenis", semua_status: "Semua status", cari_unit: "Cari kode unit",
      s_OPERASI: "Operasi", s_STANDBY: "Standby", s_BREAKDOWN: "Breakdown", s_SERVIS: "Servis",
      j_EX: "Excavator", j_DT: "Dump truck", j_DZ: "Dozer", j_GD: "Grader",
      kol_unit: "Unit", kol_jenis: "Jenis", kol_model: "Model", kol_status: "Status", kol_jam: "Jam kerja hari ini", kol_pa: "PA 30 hari", kol_hm: "Hour meter",
      tidak_ada_unit: "Tidak ada unit yang cocok dengan filter.", pilih_unit: "Pilih unit di tabel untuk melihat detailnya.", tutup: "Tutup",
      d_pa_unit: "PA harian 30 hari terakhir", d_lokasi: "Lokasi", d_rata_pa: "Rata-rata PA",
      tim_sub: "Skor keaktifan harian (0–100) tiap dispatcher. Hanya hari bertugas yang dihitung.", kol_peringkat: "#", kol_nama: "Nama", kol_skor: "Rata-rata skor", kol_shift: "Shift",
      pilih_orang: "Pilih nama untuk melihat tren skornya.", d_tren: "Tren skor harian", skor: "Skor", tidak_bertugas: "tidak bertugas",
      ro_sub: "Pola 6:2:6:2 (6 siang, 2 libur, 6 malam, 2 libur). Kolom biru = hari ini.", ro_jml_d: "Jumlah siang", ro_jml_n: "Jumlah malam",
      kd_D: "Siang", kd_N: "Malam", kd_OFF: "Libur", kd_C: "Cuti", kd_IND: "Induksi",
      ten_judul: "Apa yang ditunjukkan demo ini", ten_isi1: "Dashboard operasional untuk tim dispatcher tambang: memantau produksi terhadap rencana, kesiapan armada, performa tim, dan jadwal shift dalam satu tempat.",
      ten_fitur: "Fitur yang bisa dicoba", f1: "Filter periode (7/30/90 hari) dan pit; semua kartu dan grafik ikut berubah.", f2: "Tooltip interaktif di grafik; setiap grafik juga bisa dibaca sebagai tabel.",
      f3: "Pencarian dan filter armada, dengan detail unit dan tren ketersediaannya.", f4: "Papan peringkat tim dengan tren skor tiap orang.", f5: "Roster shift 14 hari dengan pola 6:2:6:2, cuti, dan induksi.",
      f6: "Dua bahasa, mode terang/gelap, dan tampilan ponsel.",
      ten_teknis: "Teknis", ten_tek: "HTML, CSS, dan JavaScript tanpa framework; grafik SVG buatan sendiri; data dummy dibangkitkan di peramban dengan benih tetap. Berjalan sebagai situs statis (GitHub Pages).",
      ten_balik: "Lihat portofolio"},
    en: {lewati: "Skip to content", keportofolio: "Back to portfolio", bahasa: "Language", tema: "Toggle theme", eyebrow: "Demo · Dummy data",
      pita: "All figures, people, pits, and units in this demo are made up for portfolio purposes.",
      t_ringkasan: "Production overview", t_armada: "Fleet", t_tim: "Team performance", t_roster: "Shift roster", t_tentang: "About this demo",
      m_ringkasan: "Overview", m_armada: "Fleet", m_tim: "Team", m_roster: "Roster", m_tentang: "About",
      sub_periode: "{a} – {b} · {n} days", hari: "{n} days", semua_pit: "All pits", pit: "Pit",
      k_ob: "Overburden", k_coal: "Coal", k_pa: "Physical availability", k_ua: "Use of availability", k_ct: "Cycle time", k_hujan: "Rain hours",
      dari_rencana: "{p} of plan", rata: "average", menit: "min", jam: "hours", total: "period total",
      g_ob: "Daily overburden: actual vs plan", g_ob_sub: "BCM per day. Hover (or tap) the chart to read daily figures.",
      aktual: "Actual", rencana: "Plan", hujan_tip: "Rain", g_pit: "Overburden by pit", g_pit_sub: "Total BCM in the selected period.",
      g_pa: "Equipment availability (daily average)", g_pa_sub: "PA = equipment ready to work; UA = ready equipment actually used.",
      lihat_tabel: "View as table", tanggal: "Date", rb: "k", jt: "M",
      a_ringkas: "Current fleet status", a_ringkas_sub: "{n} units across all pits.", semua_jenis: "All types", semua_status: "All statuses", cari_unit: "Search unit code",
      s_OPERASI: "Operating", s_STANDBY: "Standby", s_BREAKDOWN: "Breakdown", s_SERVIS: "Service",
      j_EX: "Excavator", j_DT: "Dump truck", j_DZ: "Dozer", j_GD: "Grader",
      kol_unit: "Unit", kol_jenis: "Type", kol_model: "Model", kol_status: "Status", kol_jam: "Working hours today", kol_pa: "PA 30 days", kol_hm: "Hour meter",
      tidak_ada_unit: "No units match the filters.", pilih_unit: "Select a unit in the table to see its details.", tutup: "Close",
      d_pa_unit: "Daily PA, last 30 days", d_lokasi: "Location", d_rata_pa: "Average PA",
      tim_sub: "Daily activity score (0–100) per dispatcher. Only days on duty count.", kol_peringkat: "#", kol_nama: "Name", kol_skor: "Average score", kol_shift: "Shifts",
      pilih_orang: "Select a name to see their score trend.", d_tren: "Daily score trend", skor: "Score", tidak_bertugas: "off duty",
      ro_sub: "6:2:6:2 pattern (6 day, 2 off, 6 night, 2 off). Blue column = today.", ro_jml_d: "Day count", ro_jml_n: "Night count",
      kd_D: "Day", kd_N: "Night", kd_OFF: "Off", kd_C: "Leave", kd_IND: "Induction",
      ten_judul: "What this demo shows", ten_isi1: "An operations dashboard for a mine dispatch team: production against plan, fleet readiness, team performance, and shift schedules in one place.",
      ten_fitur: "Things to try", f1: "Period (7/30/90 days) and pit filters; every card and chart follows.", f2: "Interactive chart tooltips; every chart can also be read as a table.",
      f3: "Fleet search and filters, with unit details and availability trend.", f4: "Team leaderboard with each person's score trend.", f5: "14-day shift roster with the 6:2:6:2 pattern, leave, and induction.",
      f6: "Two languages, light/dark mode, and a phone layout.",
      ten_teknis: "Technical", ten_tek: "Plain HTML, CSS, and JavaScript with no framework; hand-built SVG charts; dummy data generated in the browser from a fixed seed. Runs as a static site (GitHub Pages).",
      ten_balik: "View portfolio"},
  });

  const TAB = [["ringkasan", "chart-line-up"], ["armada", "truck"], ["tim", "trophy"], ["roster", "calendar-blank"], ["tentang", "info"]];
  const S = {tab: "ringkasan", periode: 30, pit: "", jenis: "", status: "", cari: "", unit: null, orang: null};
  const awal = location.hash.slice(1); if(TAB.some(x => x[0] === awal)) S.tab = awal;

  /* ---------- format ---------- */
  const singkat = v => Math.abs(v) >= 1e6 ? I18N.angka(v / 1e6, 1) + " " + t("jt") : Math.abs(v) >= 1e3 ? I18N.angka(v / 1e3, v >= 1e5 ? 0 : 1) + " " + t("rb") : I18N.angka(v);
  const persen = (v, d = 1) => I18N.angka(v, d) + "%";
  const rata = a => { const v = a.filter(x => x != null); return v.length ? v.reduce((p, q) => p + q, 0) / v.length : null; };
  const jumlah = a => a.reduce((p, q) => p + q, 0);
  const tglPendek = iso => I18N.tanggal(iso, {day: "numeric", month: "short"});
  const tglPanjang = iso => I18N.tanggal(iso, {weekday: "long", day: "numeric", month: "long"});
  const inisial = n => n.slice(0, 2).toUpperCase();

  /* ---------- kerangka ---------- */
  function gambarTab(){
    $("#tabs").innerHTML = TAB.map(([k, ik]) => `<button type="button" data-tab="${k}" aria-label="${esc(t("m_" + k))}"${S.tab === k ? ' aria-current="page"' : ""}><i class="ph ${S.tab === k ? "ph-isi " : ""}ph-${ik}" aria-hidden="true"></i><span class="tip">${esc(t("m_" + k))}</span></button>`).join("");
    $("#tabs").querySelectorAll("button").forEach(b => b.onclick = () => { S.tab = b.dataset.tab; history.replaceState(null, "", "#" + S.tab); gambar(); $("#isi").focus({preventScroll: true}); scrollTo(0, 0); });
  }
  function chip(nama, nilai, label){ return `<button type="button" class="chip" data-${nama}="${nilai}" aria-pressed="${String(S[nama === "per" ? "periode" : nama] == nilai)}">${esc(label)}</button>`; }
  function gambarSaring(){
    const el = $("#saring");
    if(S.tab === "ringkasan" || S.tab === "tim") el.innerHTML = [7, 30, 90].map(n => chip("per", n, t("hari", {n}))).join("") + `<select class="cari" id="fPit" aria-label="${esc(t("pit"))}"><option value="">${esc(t("semua_pit"))}</option>${D.PIT.map(p => `<option value="${p.id}"${S.pit === p.id ? " selected" : ""}>${esc(p.nama)}</option>`).join("")}</select>`;
    else el.innerHTML = "";
    el.querySelectorAll("[data-per]").forEach(b => b.onclick = () => { S.periode = +b.dataset.per; gambar(); });
    const fp = $("#fPit"); if(fp) fp.onchange = () => { S.pit = fp.value; gambar(); };
  }
  function gambar(){
    gambarTab(); gambarSaring();
    $("#judul").textContent = t("t_" + S.tab);
    const h = D.hari.slice(-S.periode);
    $("#subjudul").textContent = S.tab === "ringkasan" || S.tab === "tim" ? t("sub_periode", {a: tglPendek(h[0].tgl), b: tglPendek(h[h.length - 1].tgl), n: h.length}) : tglPanjang(D.hari_ini);
    document.title = t("t_" + S.tab) + " · Mine Ops Dashboard (demo)";
    ({ringkasan: vRingkasan, armada: vArmada, tim: vTim, roster: vRoster, tentang: vTentang})[S.tab]();
  }
  const $ = s => document.querySelector(s);

  /* ---------- Ringkasan ---------- */
  function vRingkasan(){
    const h = D.hari.slice(-S.periode), pit = S.pit, rasioPit = pit ? x => x.pit[pit] / x.ob : () => 1;
    const ob = h.map(x => pit ? x.pit[pit] : x.ob), obPlan = h.map((x, i) => Math.round(x.ob_plan * rasioPit(x))), coal = h.map(x => Math.round(x.coal * rasioPit(x))), coalPlan = h.map(x => Math.round(x.coal_plan * rasioPit(x)));
    const pObs = jumlah(ob) / jumlah(obPlan) * 100, pCoal = jumlah(coal) / jumlah(coalPlan) * 100;
    const tanda = p => `<span class="${p >= 100 ? "naik" : "turun"}"><i class="ph ph-${p >= 100 ? "trend-up" : "trend-down"}" aria-hidden="true"></i>${esc(t("dari_rencana", {p: persen(p)}))}</span>`;
    const kpi = [["mountains", "k_ob", singkat(jumlah(ob)) + " BCM", tanda(pObs)], ["cube", "k_coal", singkat(jumlah(coal)) + " t", tanda(pCoal)],
      ["wrench", "k_pa", persen(rata(h.map(x => x.pa))), `<span>${esc(t("rata"))}</span>`], ["gauge", "k_ua", persen(rata(h.map(x => x.ua))), `<span>${esc(t("rata"))}</span>`],
      ["timer", "k_ct", I18N.angka(rata(h.map(x => x.ct)), 1) + " " + t("menit"), `<span>${esc(t("rata"))}</span>`], ["cloud-rain", "k_hujan", I18N.angka(jumlah(h.map(x => x.hujan)), 1) + " " + t("jam"), `<span>${esc(t("total"))}</span>`]];
    $("#isi").innerHTML = `<section class="kpi" aria-label="KPI">${kpi.map(k => `<div class="kartu"><small><i class="ph ph-${k[0]}" aria-hidden="true"></i>${esc(t(k[1]))}</small><b>${esc(k[2])}</b>${k[3]}</div>`).join("")}</section>
      <div class="grid2">
        <section class="kartu"><div class="kartu-kepala"><div><h2><i class="ph ph-chart-line-up" aria-hidden="true"></i>${esc(t("g_ob"))}</h2><p class="sub">${esc(t("g_ob_sub"))}</p></div>
          <div class="lgd" aria-hidden="true"><span><i style="background:var(--s1)"></i>${esc(t("aktual"))}</span><span><i class="putus"></i>${esc(t("rencana"))}</span></div></div>
          <div class="gf" id="gOb"></div>${tabel([t("tanggal"), t("aktual") + " (BCM)", t("rencana") + " (BCM)", t("hujan_tip") + " (" + t("jam") + ")"], h.map((x, i) => [tglPendek(x.tgl), I18N.angka(ob[i]), I18N.angka(obPlan[i]), I18N.angka(x.hujan, 1)]))}</section>
        <section class="kartu"><h2><i class="ph ph-chart-bar" aria-hidden="true"></i>${esc(t("g_pit"))}</h2><p class="sub">${esc(t("g_pit_sub"))}</p><div class="gf" id="gPit"></div>
          ${tabel([t("pit"), "BCM"], D.PIT.map(p => [p.nama, I18N.angka(jumlah(h.map(x => x.pit[p.id])))]))}</section>
      </div>
      <section class="kartu"><div class="kartu-kepala"><div><h2><i class="ph ph-wrench" aria-hidden="true"></i>${esc(t("g_pa"))}</h2><p class="sub">${esc(t("g_pa_sub"))}</p></div>
        <div class="lgd" aria-hidden="true"><span><i style="background:var(--s1)"></i>PA</span><span><i style="background:var(--s3)"></i>UA</span></div></div>
        <div class="gf" id="gPa"></div>${tabel([t("tanggal"), "PA (%)", "UA (%)"], h.map(x => [tglPendek(x.tgl), I18N.angka(x.pa, 1), I18N.angka(x.ua, 1)]))}</section>`;
    garis($("#gOb"), {x: h.map(x => x.tgl), labelX: tglPendek, labelXPanjang: tglPanjang, format: (v, sumbu) => sumbu ? singkat(v) : I18N.angka(v) + " BCM", label: t("g_ob"),
      seri: [{nama: t("aktual"), warna: "var(--s1)", nilai: ob}, {nama: t("rencana"), warna: "var(--muted)", nilai: obPlan, putus: true}],
      ekstra: i => h[i].hujan ? `<span><i class="ph ph-cloud-rain" aria-hidden="true" style="background:none;width:auto"></i>${esc(t("hujan_tip"))}<em>${I18N.angka(h[i].hujan, 1)} ${esc(t("jam"))}</em></span>` : ""});
    batang($("#gPit"), {kategori: D.PIT.map(p => p.nama.replace("Pit ", "")), nilai: D.PIT.map(p => jumlah(h.map(x => x.pit[p.id]))), warna: "var(--s1)", namaSeri: "Overburden", format: (v, s) => singkat(v) + (s ? "" : " BCM"), label: t("g_pit")});
    garis($("#gPa"), {x: h.map(x => x.tgl), labelX: tglPendek, labelXPanjang: tglPanjang, format: v => persen(v), tinggi: 220, maks: 100, label: t("g_pa"),
      seri: [{nama: "PA", warna: "var(--s1)", nilai: h.map(x => x.pa)}, {nama: "UA", warna: "var(--s3)", nilai: h.map(x => x.ua)}]});
  }
  function tabel(kepala, baris){
    return `<details class="tabel"><summary>${esc(t("lihat_tabel"))}</summary><div class="gulir"><table class="t"><thead><tr>${kepala.map((k, i) => `<th${i ? ' class="n"' : ""}>${esc(k)}</th>`).join("")}</tr></thead>
      <tbody>${baris.map(r => `<tr>${r.map((c, i) => `<td${i ? ' class="n"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
  }

  /* ---------- Armada ---------- */
  const IKON_ST = {OPERASI: "check-circle", STANDBY: "pause-circle", BREAKDOWN: "warning-octagon", SERVIS: "wrench"};
  const WARNA_ST = {OPERASI: "var(--st-good)", STANDBY: "var(--st-warn)", BREAKDOWN: "var(--st-crit)", SERVIS: "var(--st-serious)"};
  const st = s => `<span class="st ${s}"><i class="ph ph-isi ph-${IKON_ST[s]}" aria-hidden="true"></i>${esc(t("s_" + s))}</span>`;
  const namaPit = id => (D.PIT.find(p => p.id === id) || {}).nama || id;
  function vArmada(){
    const n = s => D.unit.filter(u => u.status === s).length, tot = D.unit.length;
    const daftar = D.unit.filter(u => (!S.jenis || u.jenis === S.jenis) && (!S.status || u.status === S.status) && (!S.cari || u.id.toLowerCase().includes(S.cari.toLowerCase())));
    const pilih = D.unit.find(u => u.id === S.unit);
    $("#isi").innerHTML = `<section class="kartu" style="margin-bottom:16px"><h2><i class="ph ph-truck" aria-hidden="true"></i>${esc(t("a_ringkas"))}</h2><p class="sub">${esc(t("a_ringkas_sub", {n: tot}))}</p>
        <div class="rasio" role="img" aria-label="${esc(D.STATUS.map(s => t("s_" + s) + " " + n(s)).join(", "))}">${D.STATUS.map(s => `<span style="width:${n(s) / tot * 100}%;background:${WARNA_ST[s]}"></span>`).join("")}</div>
        <div class="rasio-ket">${D.STATUS.map(s => `<button type="button" class="chip" data-status="${s}" aria-pressed="${String(S.status === s)}">${st(s)} <b>${n(s)}</b></button>`).join("")}</div></section>
      <div class="dua-kolom">
        <section class="kartu"><div class="saring" style="margin-bottom:10px">
            <input class="cari" id="fCari" type="search" placeholder="${esc(t("cari_unit"))}" aria-label="${esc(t("cari_unit"))}" value="${esc(S.cari)}">
            <select class="cari" id="fJenis" aria-label="${esc(t("kol_jenis"))}"><option value="">${esc(t("semua_jenis"))}</option>${["EX", "DT", "DZ", "GD"].map(j => `<option value="${j}"${S.jenis === j ? " selected" : ""}>${esc(t("j_" + j))}</option>`).join("")}</select>
            <select class="cari" id="fStatus" aria-label="${esc(t("kol_status"))}"><option value="">${esc(t("semua_status"))}</option>${D.STATUS.map(s => `<option value="${s}"${S.status === s ? " selected" : ""}>${esc(t("s_" + s))}</option>`).join("")}</select></div>
          ${daftar.length ? `<div class="gulir"><table class="t"><thead><tr><th>${esc(t("kol_unit"))}</th><th>${esc(t("kol_jenis"))}</th><th>${esc(t("pit"))}</th><th>${esc(t("kol_status"))}</th><th class="n">${esc(t("kol_jam"))}</th><th>${esc(t("kol_pa"))}</th></tr></thead>
            <tbody>${daftar.map(u => `<tr class="pilih" tabindex="0" data-unit="${u.id}" aria-selected="${String(u.id === S.unit)}"><td><b>${esc(u.id)}</b></td><td>${esc(t("j_" + u.jenis))}</td><td>${esc(namaPit(u.pit).replace("Pit ", ""))}</td><td>${st(u.status)}</td><td class="n">${I18N.angka(u.jam_hari, 1)}</td><td>${spark(u.pa, "var(--s1)", 96, 26)}</td></tr>`).join("")}</tbody></table></div>`
            : `<p class="kosong">${esc(t("tidak_ada_unit"))}</p>`}</section>
        <aside class="kartu panel-detail" aria-live="polite">${pilih ? `<div class="kartu-kepala"><h2><i class="ph ph-truck" aria-hidden="true"></i>${esc(pilih.id)}</h2><button type="button" class="btn" id="tutupUnit" style="min-height:36px;padding:0 12px">${esc(t("tutup"))}</button></div>
            <p class="sub">${esc(t("j_" + pilih.jenis))} · ${esc(pilih.model)}</p>
            <div class="kpi" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="kartu"><small>${esc(t("kol_status"))}</small><div style="margin-top:8px">${st(pilih.status)}</div></div>
              <div class="kartu"><small>${esc(t("d_lokasi"))}</small><b style="font-size:18px">${esc(namaPit(pilih.pit))}</b></div>
              <div class="kartu"><small>${esc(t("d_rata_pa"))}</small><b style="font-size:18px">${persen(rata(pilih.pa))}</b></div>
              <div class="kartu"><small>${esc(t("kol_hm"))}</small><b style="font-size:18px">${I18N.angka(pilih.hm)}</b></div></div>
            <h3 style="font-size:14px;margin:4px 0 6px">${esc(t("d_pa_unit"))}</h3><div class="gf" id="gUnit"></div>` : `<p class="kosong"><i class="ph ph-hand-pointing" aria-hidden="true" style="font-size:28px;display:block;margin-bottom:6px"></i>${esc(t("pilih_unit"))}</p>`}</aside>
      </div>`;
    const ubah = (k, v) => { S[k] = v; S.unit = null; gambar(); };
    $("#fCari").oninput = e => { S.cari = e.target.value; const pos = e.target.selectionStart; vArmada(); const c = $("#fCari"); c.focus(); c.setSelectionRange(pos, pos); };
    $("#fJenis").onchange = e => ubah("jenis", e.target.value); $("#fStatus").onchange = e => ubah("status", e.target.value);
    document.querySelectorAll("[data-status]").forEach(b => b.onclick = () => ubah("status", S.status === b.dataset.status ? "" : b.dataset.status));
    document.querySelectorAll("tr[data-unit]").forEach(r => { const buka = () => { S.unit = r.dataset.unit; vArmada(); if(innerWidth <= 1100) $(".panel-detail").scrollIntoView({behavior: "smooth"}); };
      r.onclick = buka; r.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); buka(); } }; });
    const tu = $("#tutupUnit"); if(tu) tu.onclick = () => { const id = S.unit; S.unit = null; vArmada(); const r = document.querySelector(`tr[data-unit="${id}"]`); if(r) r.focus(); };
    if(pilih){ const tg = D.hari.slice(-30).map(x => x.tgl);
      garis($("#gUnit"), {x: tg, labelX: tglPendek, labelXPanjang: tglPanjang, format: v => persen(v), tinggi: 200, maks: 100, label: t("d_pa_unit"), seri: [{nama: "PA", warna: "var(--s1)", nilai: pilih.pa}]}); }
  }

  /* ---------- Tim ---------- */
  function vTim(){
    const n = S.periode, tg = D.hari.slice(-n).map(x => x.tgl);
    const baris = D.tim.filter(o => !S.pit || o.pit === S.pit).map(o => { const sk = o.skor.slice(-n); return {...o, sk, rata: rata(sk), shift: sk.filter(x => x != null).length}; })
      .sort((a, b) => b.rata - a.rata).map((o, i) => ({...o, rank: i + 1}));
    const pilih = baris.find(o => o.id === S.orang);
    const pod = [baris[1], baris[0], baris[2]].map((o, k) => o ? `<button type="button" class="pod${o.rank === 1 ? " p1" : ""}" data-orang="${o.id}" aria-label="${esc(o.nama)}, #${o.rank}, ${I18N.angka(o.rata, 1)}"><div class="ava" style="background:var(--acc)">${esc(inisial(o.nama))}</div><b>${esc(o.nama)}</b><em>${I18N.angka(o.rata, 1)}</em><span class="muted">#${o.rank} · ${esc(namaPit(o.pit))}</span></button>` : "<div></div>").join("");
    $("#isi").innerHTML = `<div class="dua-kolom">
        <section class="kartu"><h2><i class="ph ph-trophy" aria-hidden="true"></i>${esc(t("t_tim"))}</h2><p class="sub">${esc(t("tim_sub"))}</p>
          <div class="podium">${pod}</div>
          <div class="gulir"><table class="t"><thead><tr><th>${esc(t("kol_peringkat"))}</th><th>${esc(t("kol_nama"))}</th><th>${esc(t("pit"))}</th><th class="n">${esc(t("kol_shift"))}</th><th class="n">${esc(t("kol_skor"))}</th><th></th></tr></thead>
            <tbody>${baris.map(o => `<tr class="pilih" tabindex="0" data-orang="${o.id}" aria-selected="${String(o.id === S.orang)}"><td>${o.rank}</td><td><span class="ava-kecil" style="background:var(--acc)" aria-hidden="true">${esc(inisial(o.nama))}</span><b>${esc(o.nama)}</b></td>
              <td>${esc(namaPit(o.pit).replace("Pit ", ""))}</td><td class="n">${o.shift}</td><td class="n"><b>${I18N.angka(o.rata, 1)}</b></td><td><span class="batang-h" aria-hidden="true"><i style="width:${o.rata}%"></i></span></td></tr>`).join("")}</tbody></table></div></section>
        <aside class="kartu panel-detail" aria-live="polite">${pilih ? `<div class="kartu-kepala"><h2><span class="ava-kecil" style="background:var(--acc)" aria-hidden="true">${esc(inisial(pilih.nama))}</span>${esc(pilih.nama)}</h2><button type="button" class="btn" id="tutupOrang" style="min-height:36px;padding:0 12px">${esc(t("tutup"))}</button></div>
            <p class="sub">${esc(namaPit(pilih.pit))} · #${pilih.rank} · ${pilih.shift} ${esc(t("kol_shift").toLowerCase())}</p><h3 style="font-size:14px;margin:4px 0 6px">${esc(t("d_tren"))}</h3><div class="gf" id="gOrang"></div>
            ${tabel([t("tanggal"), t("skor")], tg.map((x, i) => [tglPendek(x), pilih.sk[i] == null ? t("tidak_bertugas") : String(pilih.sk[i])]))}`
          : `<p class="kosong"><i class="ph ph-hand-pointing" aria-hidden="true" style="font-size:28px;display:block;margin-bottom:6px"></i>${esc(t("pilih_orang"))}</p>`}</aside></div>`;
    document.querySelectorAll("[data-orang]").forEach(r => { const buka = () => { S.orang = +r.dataset.orang; vTim(); if(innerWidth <= 1100) $(".panel-detail").scrollIntoView({behavior: "smooth"}); };
      r.onclick = buka; if(r.tagName === "TR") r.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); buka(); } }; });
    const tu = $("#tutupOrang"); if(tu) tu.onclick = () => { const id = S.orang; S.orang = null; vTim(); const r = document.querySelector(`tr[data-orang="${id}"]`); if(r) r.focus(); };
    if(pilih) garis($("#gOrang"), {x: tg, labelX: tglPendek, labelXPanjang: tglPanjang, format: v => I18N.angka(v), tinggi: 220, maks: 100, label: t("d_tren"), seri: [{nama: t("skor"), warna: "var(--s1)", nilai: pilih.sk}]});
  }

  /* ---------- Roster ---------- */
  function vRoster(){
    const tg = D.tglRoster, hi = tg.indexOf(D.hari_ini);
    const hitung = k => tg.map((_, i) => D.roster.filter(o => o.sel[i] === k).length);
    const hd = tg.map(x => new Date(x + "T00:00:00"));
    $("#isi").innerHTML = `<section class="kartu"><h2><i class="ph ph-calendar-blank" aria-hidden="true"></i>${esc(t("t_roster"))}</h2><p class="sub">${esc(t("ro_sub"))}</p>
      <div class="lgd" style="margin-bottom:10px">${["D", "N", "OFF", "C", "IND"].map(k => `<span><span class="kd ${k}" aria-hidden="true">${k}</span> ${esc(t("kd_" + k))}</span>`).join("")}</div>
      <div class="gulir"><table class="t ro"><thead><tr><th>${esc(t("kol_nama"))}</th>${hd.map((d, i) => `<th class="${i === hi ? "hari-ini" : ""}">${d.getDate()}<br><small class="muted">${esc(d.toLocaleDateString(I18N.lang === "id" ? "id-ID" : "en-US", {weekday: "short"}))}</small></th>`).join("")}</tr></thead>
        <tbody>${D.roster.map(o => `<tr><td><b>${esc(o.nama)}</b> <small class="muted">${esc(namaPit(o.pit).replace("Pit ", ""))}</small></td>${o.sel.map((k, i) => `<td class="${i === hi ? "hari-ini" : ""}"><span class="kd ${k}" title="${esc(t("kd_" + k))}">${k}</span><span class="sr">${esc(t("kd_" + k))}</span></td>`).join("")}</tr>`).join("")}
        <tr><td><b>${esc(t("ro_jml_d"))}</b></td>${hitung("D").map((v, i) => `<td class="n ${i === hi ? "hari-ini" : ""}" style="text-align:center">${v}</td>`).join("")}</tr>
        <tr><td><b>${esc(t("ro_jml_n"))}</b></td>${hitung("N").map((v, i) => `<td class="n ${i === hi ? "hari-ini" : ""}" style="text-align:center">${v}</td>`).join("")}</tr></tbody></table></div></section>`;
  }

  /* ---------- Tentang ---------- */
  function vTentang(){
    $("#isi").innerHTML = `<section class="kartu tentang" style="max-width:860px"><h2><i class="ph ph-info" aria-hidden="true"></i>${esc(t("ten_judul"))}</h2><p>${esc(t("ten_isi1"))}</p>
      <h3 style="font-size:16px;margin-top:14px">${esc(t("ten_fitur"))}</h3><ul>${["f1", "f2", "f3", "f4", "f5", "f6"].map(k => `<li>${esc(t(k))}</li>`).join("")}</ul>
      <h3 style="font-size:16px;margin-top:14px">${esc(t("ten_teknis"))}</h3><p>${esc(t("ten_tek"))}</p>
      <a class="btn pri" href="../"><i class="ph ph-user-circle" aria-hidden="true"></i>${esc(t("ten_balik"))}</a></section>`;
  }

  I18N.saatGanti(gambar);
  window.addEventListener("temaganti", () => document.querySelectorAll(".gf").forEach(g => g._gambarUlang && g._gambarUlang()));
  window.addEventListener("hashchange", () => { const k = location.hash.slice(1); if(TAB.some(x => x[0] === k) && k !== S.tab){ S.tab = k; gambar(); } });
  document.addEventListener("DOMContentLoaded", gambar);
})();
