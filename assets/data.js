/* Data DUMMY operasi tambang (bukan data perusahaan mana pun). Dibangkitkan dengan benih tetap, jadi angkanya sama tiap kali dibuka,
   dan selalu berakhir kemarin supaya demo terasa "terkini". Semua nama orang, pit, dan unit adalah karangan. */
(function(){
  function acak(benih){ return function(){ benih |= 0; benih = benih + 0x6D2B79F5 | 0; let t = Math.imul(benih ^ benih >>> 15, 1 | benih); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const R = acak(20261118);
  const antara = (a, b) => a + (b - a) * R();
  const bulat = (x, k) => Math.round(x / k) * k;
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const PIT = [{id: "U", nama: "Pit Utara"}, {id: "S", nama: "Pit Selatan"}, {id: "B", nama: "Pit Barat"}];
  const BAGI = {U: 0.42, S: 0.35, B: 0.23};
  const N = 90, kemarin = new Date(); kemarin.setHours(0, 0, 0, 0); kemarin.setDate(kemarin.getDate() - 1);

  /* ---- produksi harian: rencana tetap per bulan, aktual = rencana × efisiensi; hari hujan menurunkan aktual */
  const hari = [];
  for(let i = N - 1; i >= 0; i--){
    const d = new Date(kemarin); d.setDate(d.getDate() - i);
    const hujan = R() < 0.28 ? bulat(antara(1, 7), 0.5) : 0;
    const efisiensi = antara(0.9, 1.06) - hujan * 0.035;
    const ob_plan = bulat(84000 + (d.getMonth() % 3) * 2500, 500), coal_plan = bulat(ob_plan / 4.6, 100);
    const ob = bulat(ob_plan * efisiensi, 50), coal = bulat(coal_plan * (efisiensi + antara(-0.03, 0.03)), 10);
    const pa = Math.min(96.5, antara(87, 94.5) - hujan * 0.2), ua = Math.min(92, antara(74, 86) - hujan * 1.4);
    const pit = {};
    for(const p of PIT) pit[p.id] = bulat(ob * BAGI[p.id] * antara(0.93, 1.07), 50);
    hari.push({tgl: iso(d), ob_plan, ob, coal_plan, coal, pa: +pa.toFixed(1), ua: +ua.toFixed(1), hujan, pit, ct: +(antara(22, 29) + hujan * 0.4).toFixed(1)});
  }

  /* ---- armada */
  const JENIS = [{k: "EX", n: 7, model: "EX-200T", no: 201}, {k: "DT", n: 34, model: "HD-100T", no: 1101}, {k: "DZ", n: 6, model: "DZ-D10", no: 401}, {k: "GD", n: 3, model: "GD-16M", no: 501}];
  const STATUS = ["OPERASI", "STANDBY", "BREAKDOWN", "SERVIS"];
  const unit = [];
  for(const j of JENIS) for(let k = 0; k < j.n; k++){
    const r = R(), status = r < 0.72 ? "OPERASI" : r < 0.84 ? "STANDBY" : r < 0.94 ? "BREAKDOWN" : "SERVIS";
    const dasar = antara(84, 95), pa = Array.from({length: 30}, () => +Math.min(99, Math.max(60, dasar + antara(-6, 4))).toFixed(1));
    unit.push({id: `${j.k}-${j.no + k}`, jenis: j.k, model: j.model, pit: PIT[Math.floor(R() * PIT.length)].id, status,
               hm: Math.round(antara(4000, 28000)), jam_hari: +antara(status === "OPERASI" ? 14 : 4, status === "OPERASI" ? 21 : 11).toFixed(1), pa});
  }

  /* ---- tim dispatcher: skor keaktifan harian 0-100 (dummy), dept = pit */
  const NAMA = ["Arga", "Bayu", "Citra", "Dimas", "Elsa", "Gilang", "Hana", "Irfan", "Kirana", "Laras", "Maya", "Nanda"];
  const tim = NAMA.map((nama, i) => {
    const bakat = antara(66, 90);
    return {id: i + 1, nama, pit: PIT[i % 3].id, skor: hari.map(() => (R() < 0.25 ? null : Math.round(Math.min(100, Math.max(35, bakat + antara(-14, 12))))))};   // null = tidak bertugas (libur/cuti)
  });

  /* ---- roster 6:2:6:2 (siang 6, libur 2, malam 6, libur 2) untuk 14 hari ke depan, mulai dari fase berbeda tiap orang */
  const POLA = ["D", "D", "D", "D", "D", "D", "OFF", "OFF", "N", "N", "N", "N", "N", "N", "OFF", "OFF"];
  const besok = new Date(kemarin); besok.setDate(besok.getDate() + 1);
  const tglRoster = Array.from({length: 14}, (_, i) => { const d = new Date(besok); d.setDate(d.getDate() + i - 1); return iso(d); });
  const roster = tim.map((t, i) => {
    const fase = (i * 5) % 16, sel = tglRoster.map((_, k) => POLA[(fase + k) % 16]);
    if(i === 4){ for(let k = 3; k < 10; k++) sel[k] = "C"; sel[10] = "IND"; for(let k = 11; k < 14; k++) sel[k] = "D"; }   // satu orang cuti, induksi, lalu langsung bekerja
    return {id: t.id, nama: t.nama, pit: t.pit, sel};
  });

  window.DATA = {PIT, hari, unit, STATUS, tim, roster, tglRoster, hari_ini: iso(besok)};
})();
