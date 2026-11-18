/* Bahasa (ID/EN) dan tema (terang/gelap) bersama untuk semua halaman.
   Teks statis: elemen dengan data-i18n="kunci" (isi teks) atau data-i18n-attr="aria-label:kunci;placeholder:kunci2".
   Teks dinamis: I18N.t("kunci", {n: 3}). Kamus ditambahkan tiap halaman lewat I18N.tambah({id: {...}, en: {...}}). */
(function(){
  const simpan = (k, v) => { try{ localStorage.setItem(k, v); }catch(e){} };
  const baca = k => { try{ return localStorage.getItem(k); }catch(e){ return null; } };
  const K = {id: {}, en: {}};
  const dariUrl = new URLSearchParams(location.search).get("lang");
  let lang = ["id", "en"].includes(dariUrl) ? dariUrl : (baca("lang") || ((navigator.language || "id").toLowerCase().startsWith("id") ? "id" : "en"));
  if(!["id", "en"].includes(lang)) lang = "id";
  const pendengar = [];
  const I18N = {
    get lang(){ return lang; },
    tambah(d){ for(const l of ["id", "en"]) Object.assign(K[l], d[l] || {}); },
    t(k, v){ let s = K[lang][k] ?? K.id[k] ?? k; if(v) for(const n in v) s = s.split("{" + n + "}").join(v[n]); return s; },
    terapkan(akar){
      const r = akar || document;
      r.querySelectorAll("[data-i18n]").forEach(e => { e.textContent = I18N.t(e.dataset.i18n); });
      r.querySelectorAll("[data-i18n-html]").forEach(e => { e.innerHTML = I18N.t(e.dataset.i18nHtml); });   // hanya teks kamus sendiri (bukan masukan pengguna)
      r.querySelectorAll("[data-i18n-attr]").forEach(e => e.dataset.i18nAttr.split(";").forEach(p => { const [a, k] = p.split(":"); if(a && k) e.setAttribute(a.trim(), I18N.t(k.trim())); }));
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-lang-btn]").forEach(b => { b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)); });
    },
    ganti(l){ if(!["id", "en"].includes(l) || l === lang) return; lang = l; simpan("lang", l); I18N.terapkan(); pendengar.forEach(f => f(l)); },
    saatGanti(f){ pendengar.push(f); },
    angka(n, d){ return Number(n).toLocaleString(lang === "id" ? "id-ID" : "en-US", {maximumFractionDigits: d ?? 0, minimumFractionDigits: d ?? 0}); },
    tanggal(iso, opsi){ return new Date(iso + "T00:00:00").toLocaleDateString(lang === "id" ? "id-ID" : "en-US", opsi || {day: "numeric", month: "short"}); },
  };
  window.I18N = I18N;

  /* tema: data-theme di <html> menimpa pengaturan OS; tersimpan per peramban */
  const tema = baca("tema");
  if(tema === "dark" || tema === "light") document.documentElement.setAttribute("data-theme", tema);
  window.gantiTema = function(){
    const gelap = document.documentElement.getAttribute("data-theme") === "dark" || (!document.documentElement.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    const baru = gelap ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", baru); simpan("tema", baru);
    document.querySelectorAll("[data-tema-btn] .ph").forEach(i => { i.className = "ph " + (baru === "dark" ? "ph-sun" : "ph-moon"); });
    window.dispatchEvent(new Event("temaganti"));
  };
  document.addEventListener("DOMContentLoaded", () => {
    const gelap = document.documentElement.getAttribute("data-theme") === "dark" || (!document.documentElement.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    document.querySelectorAll("[data-tema-btn]").forEach(b => { b.addEventListener("click", window.gantiTema); const i = b.querySelector(".ph"); if(i) i.className = "ph " + (gelap ? "ph-sun" : "ph-moon"); });
    document.querySelectorAll("[data-lang-btn]").forEach(b => b.addEventListener("click", () => I18N.ganti(b.dataset.langBtn)));
    I18N.terapkan();
  });
})();
