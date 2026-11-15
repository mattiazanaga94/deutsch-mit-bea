"use strict";
/* Deutsch mit Bea – v4
   App PWA per la preparazione Goethe B1/B2. Nessuna dipendenza esterna.
   Dati salvati in localStorage; IA tramite Google Gemini (chiave dell'utente). */

// ============================================================ STATO
const KEY = "deutsch-bea-v1";
const DEFAULTS = { xp: 0, streak: 0, best: 0, last: null, done: {}, words: {}, rate: 0.95, level: "B2", goal: 50, day: null, dayXP: 0,
  custom: [], exams: [], errors: [], hist: {}, tutorMsgs: 0, writings: 0, dictations: 0, theme: "auto", accent: "blue", voice: "",
  freezes: 0, chest: null, badges: {}, gkey: "", gmodel: "", gmodelPro: "", lessonsSeen: {}, timed: true };
let S = load();
function load() {
  let d = {};
  try { d = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const s = Object.assign(structuredClone(DEFAULTS), d);
  ["done", "words", "hist", "badges", "lessonsSeen"].forEach(k => { if (!s[k] || typeof s[k] !== "object") s[k] = {}; });
  ["custom", "exams", "errors"].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
  return s;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} renderChrome(); }
const dstr = d => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 6e4); return z.toISOString().slice(0, 10); };
const today = () => dstr(new Date());
const daysAgo = n => dstr(new Date(Date.now() - n * 864e5));

function touchStreak() {
  const t = today(); if (S.last === t) return;
  if (S.last === daysAgo(1)) S.streak++;
  else if (S.last === daysAgo(2) && S.freezes > 0) { S.freezes--; S.streak++; toast("Scudo serie usato: la tua serie è salva."); }
  else S.streak = 1;
  S.last = t; S.best = Math.max(S.best, S.streak);
  if (S.streak > 0 && S.streak % 7 === 0 && S.freezes < 3) { S.freezes++; toast("Nuovo scudo serie guadagnato."); }
}
function addXP(n) {
  if (!n) return;
  const before = levelOf(S.xp).lv;
  touchStreak();
  const t = today(); if (S.day !== t) { S.day = t; S.dayXP = 0; }
  S.xp += n; S.dayXP += n; S.hist[t] = (S.hist[t] || 0) + n;
  save();
  const after = levelOf(S.xp).lv;
  if (after > before) setTimeout(() => { toast(`Livello ${after}: ${LEVEL_NAMES[after - 1]}`); confetti(); }, 400);
  checkBadges();
}
function levelOf(xp) {
  let lv = 1; for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i]) lv = i + 1;
  const cur = LEVELS[lv - 1], next = LEVELS[lv] ?? cur + 5000;
  return { lv, cur, next, pct: Math.min(100, (xp - cur) / (next - cur) * 100) };
}
function markWord(de, ok) {
  const w = S.words[de] || { box: 0, seen: 0, due: today() };
  w.seen++; w.box = ok ? Math.min(w.box + 1, 5) : 0;
  w.due = daysAgo(-[0, 1, 2, 4, 8, 16][w.box]);
  S.words[de] = w; save();
}
const dueWords = () => allVocab().filter(w => { const s = S.words[w.de]; return s && s.due <= today() && s.box < 5; });

// ============================================================ ICONE (stile Lucide, ISC)
const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5"/><path d="M20 19v3H6.5A2.5 2.5 0 0 1 4 19.5"/>',
  library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checksq: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m9 12 2 2 4-4"/>',
  puzzle: '<path d="M19.4 14.5a2 2 0 1 0 0-3.9V7a1 1 0 0 0-1-1h-3.6a2 2 0 1 0-3.9 0H7a1 1 0 0 0-1 1v3.6a2 2 0 1 1 0 3.9V18a1 1 0 0 0 1 1h3.6a2 2 0 1 1 3.9 0H18a1 1 0 0 0 1-1z"/>',
  headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  sparkles: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/><path d="M19 3v4"/><path d="M21 5h-4"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V8"/><path d="M17 16v-9"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
  slow: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.2.3 1.6 1.4 2.7 2.5 2.7"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22"/><path d="M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/>',
  play: '<path d="m6 3 14 9-14 9z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="M8.2 10.4 5 3h4l3 5 3-5h4l-3.2 7.4"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.1 14c.2-1 .7-1.7 1.4-2.5A5.5 5.5 0 1 0 7.5 11.5c.7.7 1.2 1.5 1.4 2.5"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  wand: '<path d="m15 4 5 5"/><path d="M3 21 15 9"/><path d="M19 3v2"/><path d="M21 5h-2"/><path d="M11 3v2"/><path d="M12 4h-2"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'
};
const ic = (n, cls = "") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.info}</svg>`;

// ============================================================ VOCE
let deVoices = [];
function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  deVoices = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith("de"));
  deVoices.sort((a, b) => score(b) - score(a));
  function score(v) { return (/natural|neural|online|premium|enhanced/i.test(v.name) ? 10 : 0) + (/anna|petra|katja|helena|marlene|vicki|google/i.test(v.name) ? 3 : 0) + (v.localService ? 1 : 0); }
}
if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
const mainVoice = () => deVoices.find(v => v.name === S.voice) || deVoices[0] || null;
function speak(text, rate, opt = {}) {
  if (!("speechSynthesis" in window) || !text) return;
  if (!opt.queue) speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/_{2,}|\*\*/g, " "));
  u.lang = "de-DE"; u.rate = rate || S.rate; u.pitch = opt.pitch || 1;
  const v = opt.voice || mainVoice(); if (v) u.voice = v;
  if (opt.onend) u.onend = opt.onend;
  speechSynthesis.speak(u);
}
// Riproduce un dialogo con voci diverse per ogni parlante
function speakSegments(segs, rate, onend) {
  speechSynthesis.cancel();
  const names = [...new Set(segs.map(s => s.speaker || "A"))];
  segs.forEach((s, i) => {
    const k = names.indexOf(s.speaker || "A");
    const voice = deVoices.length > 1 ? deVoices[k % deVoices.length] : mainVoice();
    speak(s.text, rate, { queue: true, voice, pitch: deVoices.length > 1 ? 1 : [1, 0.82, 1.18][k % 3], onend: i === segs.length - 1 ? onend : null });
  });
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(onResult, onEnd, opt = {}) {
  if (!SR) { toast("Riconoscimento vocale non disponibile qui: usa Chrome/Edge su PC o Safari su iPhone."); onEnd && onEnd(); return null; }
  const r = new SR();
  r.lang = "de-DE"; r.interimResults = !!opt.interim; r.continuous = !!opt.continuous; r.maxAlternatives = 3;
  r.onresult = e => {
    if (opt.continuous) { let fin = "", int = ""; for (const res of e.results) (res.isFinal ? (fin += res[0].transcript + " ") : (int += res[0].transcript)); onResult([fin.trim(), int]); }
    else onResult([...e.results[0]].map(a => a.transcript));
  };
  r.onerror = e => { opt.onError && opt.onError(e.error); if (!["no-speech", "aborted"].includes(e.error)) toast("Microfono: " + (e.error === "not-allowed" ? "permesso negato. Consentilo nelle impostazioni del browser." : e.error)); };
  r.onend = () => onEnd && onEnd();
  try { r.start(); } catch {}
  return r;
}

// Dettatura a mano libera: tocca per iniziare, tocca di nuovo per finire. Le pause non la interrompono
// (su iPhone il riconoscimento si chiude da solo: lo riavviamo finché l'utente non preme "Fine").
function dictate(btn, field, opt = {}) {
  const label = opt.label || "Parla";
  let on = false, rec = null, base = "", lastHit = 0, fatal = false;
  const ui = () => { btn.classList.toggle("rec", on); btn.innerHTML = on ? ic("check") + " Fine" : ic("mic") + " " + label; const h = opt.hint && $(opt.hint); if (h) h.textContent = on ? "Ti ascolto: prenditi tutto il tempo. Le pause non interrompono. Tocca «Fine» quando hai finito." : ""; };
  const start = () => {
    base = field.value.trim(); fatal = false;
    rec = listen(([fin, int]) => { lastHit = Date.now(); field.value = (base + " " + fin + " " + int).replace(/\s+/g, " ").trim(); opt.onText && opt.onText(field.value); },
      () => { rec = null; if (on && !fatal && Date.now() - lastHit < 120000) setTimeout(() => on && start(), 150); else stop(); },
      { continuous: true, interim: true, onError: err => { if (!["no-speech", "aborted", "network"].includes(err)) fatal = true; } });
    if (!rec) stop();
  };
  const stop = () => { const was = on; on = false; if (rec) { try { rec.stop(); } catch {} } ui(); if (was) { field.focus(); opt.onStop && opt.onStop(field.value.trim()); } };
  btn.onclick = () => { if (on) return stop(); speechSynthesis.cancel(); on = true; lastHit = Date.now(); ui(); start(); };
  ui();
  return { stop, get active() { return on; } };
}
const arr = x => Array.isArray(x) ? x : x && typeof x === "object" ? Object.values(x) : [];
const norm = s => String(s).toLowerCase().replace(/ß/g, "ss").replace(/[.,!?;:"'„“”«»()–—-]/g, " ").replace(/\s+/g, " ").trim();
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const similarity = (a, b) => { a = norm(a); b = norm(b); return 1 - lev(a, b) / (Math.max(a.length, b.length) || 1); };

// Confronto parola per parola (LCS) per il dettato
function wordDiff(expected, typed) {
  const E = expected.split(/\s+/).filter(Boolean), T = typed.split(/\s+/).filter(Boolean);
  const ne = E.map(w => norm(w)), nt = T.map(w => norm(w));
  const strict = !!S.strictCase;
  const eq = (i, j) => strict ? E[i].replace(/[.,!?;:„“"]/g, "") === T[j].replace(/[.,!?;:„“"]/g, "") : ne[i] === nt[j];
  const m = E.length, n = T.length, L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = eq(i, j) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = []; let i = 0, j = 0, ok = 0, errs = [];
  while (i < m && j < n) {
    if (eq(i, j)) { out.push({ t: E[i], k: "ok" }); ok++; i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) { out.push({ t: E[i], k: "miss" }); errs.push({ want: E[i], got: "" }); i++; }
    else { out.push({ t: T[j], k: "bad" }); errs.push({ want: "", got: T[j] }); j++; }
  }
  while (i < m) { out.push({ t: E[i++], k: "miss" }); errs.push({ want: E[i - 1], got: "" }); }
  while (j < n) { out.push({ t: T[j++], k: "bad" }); errs.push({ want: "", got: T[j - 1] }); }
  return { out, score: m ? ok / Math.max(m, n) : 0, errs };
}

// ============================================================ UTILITY UI
const $app = document.getElementById("app");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const md = s => esc(String(s ?? "").trim()).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const sayBtn = (t, label = "Ascolta") => `<button class="say" data-say="${esc(t)}" aria-label="${label}" title="${label}">${ic("volume")}</button>`;
const $ = id => document.getElementById(id);
const catOf = l => l.cat || LESSON_CAT[l.id] || "Grammatik";
const allVocab = () => LESSONS.flatMap(l => l.vocab.map(([de, it]) => ({ de, it, lesson: l.id, level: l.level })))
  .concat(VOCAB.map(v => ({ de: v.de, it: v.it, lesson: "dict", level: v.level })))
  .concat(S.custom.map(w => ({ de: w.de, it: w.it, lesson: "mie", level: S.level })));
let timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
let cleanup = [];

function view(title, html, opt = {}) {
  timers.forEach(clearTimeout); timers = []; cleanup.forEach(f => f()); cleanup = [];
  $("title").textContent = title; $("crumb").textContent = opt.crumb || "";
  $("back").hidden = !opt.back; $("back").innerHTML = ic("left");
  document.title = title === "Oggi" ? "Deutsch mit Bea" : title + " · Deutsch mit Bea";
  $app.innerHTML = html; $app.style.animation = "none"; void $app.offsetWidth; $app.style.animation = "";
  if (!opt.keepScroll) window.scrollTo(0, 0);
  renderNav(opt.nav);
}
function toast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2600); }
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("div"); c.className = "confetti";
  const cols = ["#0071e3", "#5e5ce6", "#bf5af2", "#ff9f0a", "#30d158", "#ff375f"];
  for (let i = 0; i < 70; i++) { const p = document.createElement("i"); p.style.left = Math.random() * 100 + "%"; p.style.background = pick(cols); p.style.animationDuration = 1.6 + Math.random() * 1.6 + "s"; p.style.animationDelay = Math.random() * .4 + "s"; c.appendChild(p); }
  document.body.appendChild(c); setTimeout(() => c.remove(), 3800);
}
const stepbar = (i, n) => `<div class="stepbar"><span class="tag">${Math.min(i + 1, n)} / ${n}</span><div class="progress"><i style="width:${i / n * 100}%"></i></div></div>`;
const opts = (arr, sel) => arr.map(x => `<option ${x === sel ? "selected" : ""}>${esc(x)}</option>`).join("");
const mod = (h, icon, t, s, c) => `<button class="mod" data-go="${h}"><span class="chip" style="--c:${c}">${ic(icon)}</span><b>${t}</b><small>${s}</small><span class="go">${ic("right")}</span></button>`;
const seg = (id, vals, cur) => `<div class="seg" id="${id}">${vals.map(v => `<button data-v="${v}" class="${v === cur ? "on" : ""}">${v}</button>`).join("")}</div>`;
function bindSeg(id, fn) { const el = $(id); if (el) el.querySelectorAll("button").forEach(b => b.onclick = () => fn(b.dataset.v)); }

document.addEventListener("click", e => {
  const b = e.target.closest("[data-say]"); if (b) { e.preventDefault(); speak(b.dataset.say, b.dataset.rate ? +b.dataset.rate : undefined); }
  const g = e.target.closest("[data-go]"); if (g) { e.preventDefault(); go(g.dataset.go); }
});
$("back").onclick = () => history.length > 1 ? history.back() : go("");
window.addEventListener("hashchange", route);
function go(h) { if (location.hash.slice(1) === h) route(); else location.hash = h; }

// ============================================================ TEMA E NAVIGAZIONE
function applyTheme() {
  const r = document.documentElement;
  if (S.theme === "auto") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", S.theme);
  const th = THEMES.find(t => t.id === S.accent) || THEMES[0];
  r.style.setProperty("--primary", th.c); r.style.setProperty("--primary2", th.c2);
  r.style.setProperty("--primary-soft", `color-mix(in srgb, ${th.c} 12%, transparent)`);
  r.style.setProperty("--hero", `linear-gradient(135deg, color-mix(in srgb, ${th.c} 55%, #000) 0%, ${th.c} 45%, ${th.c2} 100%)`);
}
const NAV = [
  ["Studio", [["", "home", "Oggi"], ["lezioni", "book", "Lezioni"], ["dizionario", "library", "Vocabolario"], ["pratica", "layers", "Esercizi"], ["dettato", "pen", "Dettato"]]],
  ["Intelligenza artificiale", [["tutor", "chat", "Tutor IA"], ["lab", "sparkles", "Allenamento IA"]]],
  ["Esame", [["esame", "grad", "Simulazioni Goethe"]]],
  ["Tu", [["progressi", "chart", "Progressi"], ["premi", "trophy", "Premi e traguardi"], ["impostazioni", "settings", "Impostazioni"]]]
];
const TABS = [["", "home", "Oggi"], ["lezioni", "book", "Lezioni"], ["dizionario", "library", "Parole"], ["tutor", "chat", "Tutor"], ["esame", "grad", "Esame"]];
function renderNav(active) {
  const cur = active ?? location.hash.slice(1).split("/")[0];
  const map = { lezione: "lezioni", flash: "pratica", quiz: "pratica", memory: "pratica", ascolto: "pratica", parla: "pratica", dialoghi: "pratica", dialogo: "pratica", prep: "pratica", verbi: "pratica", casi: "pratica", preposizioni: "pratica" };
  const a = map[cur] ?? cur;
  $("nav").innerHTML = NAV.map(([sec, items]) => `<div class="navsec">${sec}</div>` + items.map(([h, i, t]) => `<a class="navlink ${a === h ? "on" : ""}" href="#${h}">${ic(i)}${t}</a>`).join("")).join("");
  $("tabbar").innerHTML = TABS.map(([h, i, t]) => `<a class="${a === h ? "on" : ""}" href="#${h}">${ic(i)}${t}</a>`).join("");
}
function renderChrome() {
  const L = levelOf(S.xp);
  $("pills").innerHTML = `<span class="pill fire" title="Giorni consecutivi">${ic("flame")}<span>${S.streak}</span></span><span class="pill xp" title="Punti esperienza">${ic("star")}<span>${S.xp}</span></span>`;
  $("sidefoot").innerHTML = `<a class="card flat" href="#premi" style="display:block;padding:14px;text-decoration:none;color:inherit;margin:0"><div class="lvlbar"><span class="lv">${L.lv}</span><div style="flex:1"><b style="font-size:.9rem">${LEVEL_NAMES[L.lv - 1]}</b><div class="progress thin" style="margin-top:6px"><i style="width:${L.pct}%"></i></div></div></div></a>`;
}

// ============================================================ ROUTER
function route() {
  const [p, a, b] = location.hash.slice(1).split("/").map(decodeURIComponent);
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  const R = { lezioni: lessonsList, lezione: () => lesson(a), dizionario: () => dictionary(a), pratica: practice, flash: () => flashcards(a), quiz: () => quiz(a),
    memory: () => memory(a), dettato: () => dictation(a, b), ascolto: listening, parla: () => speaking(a), dialoghi: dialoguesList, dialogo: () => dialogue(a),
    tutor, lab: () => lab(a), prep: () => prepHub(a, b), verbi: () => b2Hub(a), casi: () => casiHub(a), preposizioni: () => preposHub(a), esame: () => exam(a, b), progressi: progress, premi: rewards, impostazioni: settings };
  (R[p] || home)();
}

// ============================================================ OGGI (dashboard)
function home() {
  const t = today(), dx = S.day === t ? S.dayXP : 0, pct = Math.min(100, dx / S.goal * 100);
  const h = new Date().getHours(), greet = h < 11 ? "Guten Morgen" : h < 18 ? "Guten Tag" : "Guten Abend";
  const L = levelOf(S.xp);
  const lvLessons = LESSONS.filter(l => l.level === S.level);
  const nextLesson = lvLessons.find(l => !S.done[l.id]) || lvLessons[0];
  const due = dueWords().length;
  const tasks = [
    { done: !!S.done[nextLesson.id] && nextLesson === lvLessons[0] && lvLessons.every(l => S.done[l.id]), t: "Lezione: " + nextLesson.title, s: catOf(nextLesson) + " · " + nextLesson.level, go: "lezione/" + nextLesson.id },
    { done: due === 0 && Object.keys(S.words).length > 0, t: due ? `Ripassa ${due} parole in scadenza` : "Impara parole nuove", s: "Ripasso intelligente a intervalli", go: "flash" },
    { done: (S.hist[t] || 0) >= S.goal, t: "Conversazione o allenamento IA", s: "10 minuti con Frau Dr. Keller", go: "tutor" }
  ];
  const wotd = VOCAB[Math.floor(Date.parse(t) / 864e5) % VOCAB.length];
  const [qde, qit] = QUOTES[Math.floor(Date.parse(t) / 864e5) % QUOTES.length];
  const chestReady = pct >= 100 && S.chest !== t;
  view("Oggi", `
    <section class="hero">
      <div class="hero-grid">
        <div style="flex:1;min-width:240px">
          <small style="opacity:.8;font-weight:600;letter-spacing:.06em;text-transform:uppercase">${new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</small>
          <h2>${greet}, Bea.</h2>
          <p>${pct >= 100 ? "Obiettivo di oggi raggiunto. Sehr gut!" : `Ti mancano ${S.goal - dx} punti per l'obiettivo di oggi.`}</p>
          <div class="kpis">
            <div class="kpi"><b>${S.streak}</b><small>giorni di fila</small></div>
            <div class="kpi"><b>${L.lv}</b><small>${LEVEL_NAMES[L.lv - 1]}</small></div>
            <div class="kpi"><b>${Object.values(S.words).filter(w => w.box >= 3).length}</b><small>parole consolidate</small></div>
          </div>
          <div style="margin-top:20px">${seg("lvl", ["B1", "B2"], S.level)}</div>
        </div>
        <div class="ring">${ring(pct)}<div class="v"><div><b>${dx}</b><br><small>/ ${S.goal} punti</small></div></div></div>
      </div>
    </section>
    ${chestReady ? `<div class="card" style="display:flex;gap:16px;align-items:center"><span class="chip lg" style="--c:#ff9f0a">${ic("gift")}</span><div style="flex:1"><b>Ricompensa giornaliera disponibile</b><br><small class="muted">Hai raggiunto l'obiettivo: ritira 25 punti bonus.</small></div><button class="btn" id="chest">Ritira</button></div>` : ""}
    <div class="cols">
      <div class="card c7"><div class="row"><h3 style="margin:0">Piano di oggi</h3><span class="spacer"></span><span class="tag">${tasks.filter(x => x.done).length}/3</span></div>
        ${tasks.map(x => `<a class="task ${x.done ? "done" : ""}" href="#${x.go}" style="text-decoration:none;color:inherit"><span class="ck">${x.done ? ic("check") : ""}</span><span class="t"><b>${esc(x.t)}</b><small>${esc(x.s)}</small></span>${ic("right")}</a>`).join("")}
      </div>
      <div class="card c5 wotd"><span class="tag">PAROLA DEL GIORNO · ${wotd.level}</span>
        <div class="row" style="margin-top:8px"><div class="prompt" style="flex:1">${esc(wotd.de)}</div>${sayBtn(wotd.de + ". " + wotd.exDe)}</div>
        <p style="margin:6px 0 0"><b>${esc(wotd.it)}</b> <span class="muted">· ${esc(wotd.gr)}</span></p>
        <p class="muted" style="margin:8px 0 0">${esc(wotd.exDe)}</p>
        <a href="#dizionario/${wotd.id}" class="tag" style="display:inline-block;margin-top:10px;color:var(--primary)">Apri nel vocabolario</a>
      </div>
      <div class="card c7"><div class="row"><h3 style="margin:0">Ultimi 7 giorni</h3><span class="spacer"></span><span class="tag">${week().reduce((a, b) => a + b.v, 0)} punti</span></div>${bars()}</div>
      <div class="card c5" style="display:flex;flex-direction:column;justify-content:center"><span class="tag">CITAZIONE</span><p class="quote" style="margin:10px 0 6px">„${esc(qde)}“</p><small class="muted">${esc(qit)}</small><div style="margin-top:12px">${sayBtn(qde)}</div></div>
    </div>
    <div class="sec"><h3>Studio</h3></div>
    <div class="mods">
      ${mod("lezioni", "book", "Lezioni", `${LESSONS.length} lezioni: grammatica, comunicazione, cultura`, "#0071e3")}
      ${mod("dizionario", "library", "Vocabolario", `${VOCAB.length} voci con spiegazioni ed esempi`, "#5e5ce6")}
      ${mod("pratica", "layers", "Esercizi", "Flashcard, test, coppie, ascolto, pronuncia", "#30b06a")}
      ${mod("casi", "book", "Dativo o Accusativo?", "Regole, preposizioni, Wo?/Wohin?, esercizi", "#e8590c")}
      ${mod("preposizioni", "globe", "Preposizioni", "Come si usano: luogo, tempo, differenze", "#30b06a")}
      ${mod("prep", "layers", "Verbi con preposizione", "warten auf, denken an · woran, darauf", "#0071e3")}
      ${mod("verbi", "pen", "Verbi B2", "Flashcard, paradigmi, frasi da completare", "#bf5af2")}
      ${mod("dettato", "pen", "Dettato", "Parole, frasi e testi completi", "#e8590c")}
    </div>
    <div class="sec"><h3>Con l'intelligenza artificiale</h3></div>
    <div class="mods">
      ${mod("tutor", "chat", "Tutor IA", "Conversazione a voce con correzioni", "#bf5af2")}
      ${mod("lab", "sparkles", "Allenamento IA", "Esercizi sempre nuovi su misura", "#d6336c")}
      ${mod("esame", "grad", "Simulazione Goethe " + S.level, "Tutti i moduli e le parti, con cronometro", "#b8860b")}
      ${mod("lab/fehler", "refresh", "Ripasso errori", `${S.errors.length} errori registrati`, "#0d9488")}
    </div>`, { nav: "" });
  bindSeg("lvl", v => { S.level = v; save(); home(); });
  if (chestReady) $("chest").onclick = () => { S.chest = t; addXP(25); confetti(); toast("25 punti bonus ritirati."); home(); };
}
function ring(p) { const r = 56, c = 2 * Math.PI * r; return `<svg viewBox="0 0 132 132"><circle cx="66" cy="66" r="${r}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="10"/><circle cx="66" cy="66" r="${r}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" style="transition:stroke-dashoffset 1s"/></svg>`; }
const week = () => Array.from({ length: 7 }, (_, i) => { const d = daysAgo(6 - i); return { d, v: S.hist[d] || 0 }; });
function bars() {
  const w = week(), max = Math.max(S.goal, ...w.map(x => x.v));
  return `<div class="bars">${w.map((x, i) => `<div class="b ${i === 6 ? "today" : ""}" title="${x.v} punti"><small>${x.v || ""}</small><i style="height:${Math.max(3, x.v / max * 100)}%"></i><small>${new Date(x.d).toLocaleDateString("it-IT", { weekday: "short" }).slice(0, 3)}</small></div>`).join("")}</div>`;
}

// ============================================================ LEZIONI
const CATS = ["Tutte", "Grammatik", "Kommunikation", "Wortschatz", "Landeskunde", "Alltag"];
const CAT_IT = { Grammatik: "Grammatica", Kommunikation: "Comunicazione", Wortschatz: "Lessico", Landeskunde: "Cultura e società", Alltag: "Vita quotidiana", Tutte: "Tutte" };
const CAT_ICON = { Grammatik: ["layers", "#0071e3"], Kommunikation: ["chat", "#bf5af2"], Wortschatz: ["library", "#5e5ce6"], Landeskunde: ["landmark", "#b8860b"], Alltag: ["home", "#30b06a"] };
let lessonFilter = { cat: "Tutte", q: "" };
function lessonsList() {
  const list = LESSONS.filter(l => l.level === S.level && (lessonFilter.cat === "Tutte" || catOf(l) === lessonFilter.cat) &&
    (!lessonFilter.q || norm(l.title + " " + l.theory).includes(norm(lessonFilter.q))));
  const all = LESSONS.filter(l => l.level === S.level), doneN = all.filter(l => S.done[l.id]).length;
  view("Lezioni", `
    <div class="row" style="margin-bottom:6px">${seg("lvl", ["B1", "B2"], S.level)}<span class="spacer"></span><span class="tag">${doneN}/${all.length} completate</span></div>
    <div class="progress thin" style="margin:10px 0 16px"><i style="width:${doneN / all.length * 100}%"></i></div>
    <div class="search"><input class="answer" id="q" placeholder="Cerca una lezione…" value="${esc(lessonFilter.q)}">${ic("search")}</div>
    <div class="filters">${CATS.map(c => `<button class="fchip ${c === lessonFilter.cat ? "on" : ""}" data-c="${c}">${CAT_IT[c]}</button>`).join("")}</div>
    ${S.custom.length ? `<button class="li" data-go="lezione/mie"><span class="chip" style="--c:#ff9f0a">${ic("bookmark")}</span><span class="t"><b>Le mie parole</b><small>${S.custom.length} parole salvate da te</small></span><span class="end">${ic("right")}</span></button><div style="height:10px"></div>` : ""}
    <div class="list">${list.map(l => { const [i, c] = CAT_ICON[catOf(l)] || CAT_ICON.Grammatik; return `
      <button class="li" data-go="lezione/${l.id}"><span class="chip" style="--c:${c}">${ic(i)}</span>
      <span class="t"><b>${esc(l.title)}</b><small>${CAT_IT[catOf(l)]} · ${l.vocab.length} espressioni${l.questions ? " · lettura con domande" : ""}</small></span>
      <span class="end">${S.done[l.id] ? `<span class="badge ok">${ic("check")} Fatta</span>` : ic("right")}</span></button>`; }).join("") || `<div class="empty">Nessuna lezione trovata.</div>`}</div>
    <div class="card" style="margin-top:18px;display:flex;gap:14px;align-items:center"><span class="chip" style="--c:#d6336c">${ic("wand")}</span><div style="flex:1"><b>Lezione su misura con l'IA</b><br><small class="muted">Qualsiasi argomento: storia, arte, scienza, attualità, grammatica.</small></div><button class="btn soft" data-go="lab/lezione">Crea</button></div>`, { nav: "lezioni" });
  bindSeg("lvl", v => { S.level = v; save(); lessonsList(); });
  $app.querySelectorAll(".fchip").forEach(b => b.onclick = () => { lessonFilter.cat = b.dataset.c; lessonsList(); });
  const q = $("q"); q.oninput = () => { lessonFilter.q = q.value; clearTimeout(q._t); q._t = setTimeout(() => { lessonsList(); const n = $("q"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 250); };
}
function getLesson(id) {
  if (id === "mie") return { id: "mie", level: S.level, cat: "Wortschatz", title: "Le mie parole", theory: "Le parole che hai salvato dal vocabolario e dall'Allenamento IA.", vocab: S.custom.map(w => [w.de, w.it]) };
  return LESSONS.find(x => x.id === id);
}
function lesson(id) {
  const l = getLesson(id); if (!l) return lessonsList();
  S.lessonsSeen[id] = today(); save();
  const [i, c] = CAT_ICON[catOf(l)] || CAT_ICON.Grammatik;
  view(l.title, `
    <div class="card"><div class="row"><span class="chip lg" style="--c:${c}">${ic(i)}</span><div style="flex:1"><span class="badge">${l.level}</span> <span class="tag">${CAT_IT[catOf(l)]}</span><h2 style="margin-top:4px">${esc(l.title)}</h2></div></div>
      <div class="theory" style="margin-top:14px">${l.theory}</div></div>
    ${l.text ? `<div class="card"><div class="row"><h3 style="margin:0">Lettura</h3><span class="spacer"></span><button class="btn ghost" data-say="${esc(l.text)}">${ic("volume")} Ascolta</button><button class="btn ghost" data-say="${esc(l.text)}" data-rate="0.75">${ic("slow")} Lento</button></div>
      <p class="reading" style="margin-top:12px">${esc(l.text)}</p></div>
      <div class="card"><h3>Comprensione</h3><div id="lq"></div></div>` : ""}
    <div class="card"><div class="row"><h3 style="margin:0">Espressioni chiave</h3><span class="spacer"></span><button class="btn ghost" id="playall">${ic("play")} Ascolta tutte</button></div>
      ${l.vocab.map(([de, it]) => `<div class="vocab"><div><b>${esc(de)}</b><br><span class="muted">${esc(it)}</span></div>${sayBtn(de)}</div>`).join("") || `<p class="muted">Nessuna parola ancora.</p>`}</div>
    ${l.vocab.length >= 4 ? `<div class="sec"><h3>Esercitati su questa lezione</h3></div>
    <div class="mods">
      ${mod("flash/" + id, "layers", "Flashcard", "Ripasso con voce", "#5e5ce6")}
      ${mod("quiz/" + id, "checksq", "Test", "Completa la lezione", "#0071e3")}
      ${mod("memory/" + id, "puzzle", "Coppie", "Abbina le traduzioni", "#30b06a")}
      ${mod("dettato/parole/" + id, "pen", "Dettato", "Ascolta e scrivi", "#e8590c")}
      ${mod("parla/" + id, "mic", "Pronuncia", "Parla e vieni capita", "#ff375f")}
      ${l.id === "a3" ? mod("casi", "book", "Dativo o Accusativo?", "Tutte le regole ed esercizi", "#e8590c") : ""}
      ${l.id === "b8" ? mod("prep", "layers", "Allenamento completo", "115 verbi, frasi, woran/daran", "#0071e3") : ""}
      ${l.id !== "mie" ? mod("lab/spiega/" + id, "lightbulb", "Approfondisci con l'IA", "Altri esempi ed esercizi", "#d6336c") : ""}
    </div>` : ""}`, { back: true, crumb: "Lezione", nav: "lezioni" });
  $("playall").onclick = () => { speechSynthesis.cancel(); l.vocab.forEach(([de]) => speak(de, null, { queue: true })); };
  if (l.questions) inlineMC($("lq"), l.questions, sc => { if (sc === l.questions.length) { S.done[id] = true; save(); } addXP(sc * 4); toast(`${sc}/${l.questions.length} corrette`); });
}
// Domande a scelta multipla tutte sulla stessa pagina, con correzione finale
function inlineMC(el, qs, onDone, opt = {}) {
  const letters = "ABCDEFGHIJK";
  el.innerHTML = qs.map((q, i) => `<div class="qblock" data-i="${i}" style="margin-bottom:22px"><div class="q" style="font-size:1.02rem">${i + 1}. ${md(q.q)}</div>
    ${q.options.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${letters[k]}</span><span>${esc(o)}</span></button>`).join("")}<div class="feedback"></div></div>`).join("") +
    `<button class="btn lg" id="${opt.btn || "mcdone"}">${opt.label || "Correggi"}</button>`;
  const ans = {};
  el.querySelectorAll(".qblock").forEach(b => b.querySelectorAll(".opt").forEach(o => o.onclick = () => {
    if (el.dataset.locked) return;
    b.querySelectorAll(".opt").forEach(x => x.classList.remove("sel")); o.classList.add("sel");
    o.style.borderColor = "var(--primary)"; b.querySelectorAll(".opt").forEach(x => { if (x !== o) x.style.borderColor = ""; });
    ans[b.dataset.i] = +o.dataset.k;
  }));
  const finish = () => {
    if (el.dataset.locked) return; el.dataset.locked = 1;
    let sc = 0;
    qs.forEach((q, i) => {
      const b = el.querySelector(`.qblock[data-i="${i}"]`), ok = ans[i] === +q.a; if (ok) sc++;
      b.querySelectorAll(".opt").forEach(x => { x.disabled = true; x.style.borderColor = ""; if (+x.dataset.k === +q.a) x.classList.add("ok"); else if (+x.dataset.k === ans[i]) x.classList.add("bad"); });
      const f = b.querySelector(".feedback"); f.className = "feedback " + (ok ? "ok" : "bad");
      f.innerHTML = (ok ? "Corretto." : ans[i] === undefined ? "Nessuna risposta." : "Sbagliato.") + (q.expl ? ` <span class="muted">${esc(q.expl)}</span>` : "");
    });
    const btn = $(opt.btn || "mcdone"); if (btn) btn.remove();
    onDone(sc, qs.length);
  };
  $(opt.btn || "mcdone").onclick = finish;
  return finish;
}

// ============================================================ VOCABOLARIO INTEGRATO
let dictF = { q: "", level: "Tutti", topic: "Tutti" };
function dictFiltered() {
  const q = norm(dictF.q);
  return VOCAB.filter(v => (dictF.level === "Tutti" || v.level === dictF.level) && (dictF.topic === "Tutti" || v.topic === dictF.topic) &&
    (!q || norm(v.de + " " + v.it + " " + v.note).includes(q)));
}
const WRITE_TOPIC = "Verben zum Schreiben";
function dictionary(openId) {
  const topics = ["Tutti", ...new Set(VOCAB.map(v => v.topic))];
  const res = dictFiltered();
  const scope = dictF.topic !== "Tutti" ? dictF.topic : dictF.level !== "Tutti" ? "livello " + dictF.level : "tutte le parole";
  const saved = new Set(S.custom.map(w => w.de));
  view("Vocabolario", `
    <div class="card"><div class="search"><input class="answer" id="q" placeholder="Cerca in tedesco o in italiano…" value="${esc(dictF.q)}" autocomplete="off">${ic("search")}</div>
      <div class="filters">${["Tutti", "B1", "B2"].map(l => `<button class="fchip ${dictF.level === l ? "on" : ""}" data-l="${l}">${l === "Tutti" ? "Tutti i livelli" : l}</button>`).join("")}</div>
      <select class="answer" id="topic">${topics.map(t => `<option ${t === dictF.topic ? "selected" : ""}>${t}</option>`).join("")}</select>
      <div class="row" style="margin-top:12px"><span class="tag">${res.length} voci</span><span class="spacer"></span><button class="btn soft" id="ai">${ic("sparkles")} Cerca con l'IA</button></div>
      ${res.length ? `<div class="row" style="margin-top:10px"><button class="btn" data-go="flash/dict">${ic("layers")} Flashcard: ${esc(scope)} (${Math.min(res.length, 40)})</button>${res.length >= 4 ? `<button class="btn ghost" data-go="quiz/dict">${ic("checksq")} Test</button>` : ""}</div>` : ""}</div>
    ${dictF.topic === "Tutti" && !dictF.q ? `<div class="card" style="cursor:pointer" id="wsec"><div class="row"><span class="chip" style="--c:#ff9f0a">${ic("pen")}</span><div><b>Verbi per scrivere un buon testo</b><br><small class="muted">${VOCAB.filter(v => v.topic === WRITE_TOPIC).length} verbi per e-mail, Forumsbeitrag e argomentazione · Schreiben B1/B2</small></div><span class="spacer"></span>${ic("right")}</div></div>` : dictF.topic === WRITE_TOPIC ? `<div class="card flat"><p class="muted" style="margin:0">Usa questi verbi al posto di <i>sagen, machen, finden</i>: rendono il testo più preciso e alzano il punteggio in <b>Wortschatz</b>. Ognuno ha l'esempio in una frase da esame.</p></div>` : ""}
    <div id="aires"></div>
    <div class="card">${res.map(v => `
      <details class="entry" ${String(v.id) === openId ? "open" : ""} id="e${v.id}"><summary><span class="t"><b>${esc(v.de)}</b><small>${esc(v.it)} · ${esc(v.gr)}</small></span><span class="badge">${v.level}</span>${sayBtn(v.de)}</summary>
        <div class="body"><p style="margin:0">${esc(v.note)}</p>
          <div class="ex"><span class="row">${esc(v.exDe)} ${sayBtn(v.exDe)}</span><i>${esc(v.exIt)}</i></div>
          <div class="row"><span class="tag">${esc(v.topic)}</span><span class="spacer"></span>${saved.has(v.de) ? `<span class="badge ok">${ic("check")} Nel tuo mazzo</span>` : `<button class="btn ghost" data-add="${v.id}">${ic("bookmark")} Salva</button>`}</div></div></details>`).join("") || `<div class="empty">Nessun risultato. Prova "Cerca con l'IA".</div>`}</div>`, { nav: "dizionario" });
  const qi = $("q"); qi.oninput = () => { dictF.q = qi.value; clearTimeout(qi._t); qi._t = setTimeout(() => { dictionary(); const n = $("q"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 300); };
  qi.onkeydown = e => { if (e.key === "Enter" && !res.length) aiLookup(qi.value); };
  $app.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { dictF.level = b.dataset.l; dictionary(); });
  $("topic").onchange = e => { dictF.topic = e.target.value; dictionary(); };
  if ($("wsec")) $("wsec").onclick = () => { dictF.topic = WRITE_TOPIC; dictF.level = "Tutti"; dictionary(); window.scrollTo(0, 0); };
  $("ai").onclick = () => aiLookup($("q").value);
  $app.querySelectorAll("[data-add]").forEach(b => b.onclick = e => { e.stopPropagation(); const v = VOCAB[b.dataset.add]; S.custom.push({ de: v.de, it: v.it }); save(); toast("Salvata nel tuo mazzo."); b.outerHTML = `<span class="badge ok">${ic("check")} Nel tuo mazzo</span>`; });
  if (openId) { const e = $("e" + openId); if (e) e.scrollIntoView({ block: "center" }); }
}
async function aiLookup(word) {
  word = (word || "").trim(); const box = $("aires");
  if (!word) return toast("Scrivi una parola tedesca o italiana.");
  box.innerHTML = `<div class="card"><div class="skeleton" style="width:40%"></div><div class="skeleton"></div><div class="skeleton" style="width:70%"></div></div>`;
  try {
    const d = await gemini(`Erkläre das Wort oder den Ausdruck "${word}" (kann Deutsch oder Italienisch sein) für eine italienische Lernende auf Niveau ${S.level}.
JSON: {"de": "deutsches Lemma (Nomen mit Artikel)", "gr": "Grammatik: Plural/Genitiv oder Verbformen (3. Pers., Präteritum, Perfekt), Rektion", "type": "Wortart", "it": "italienische Übersetzung(en)",
"note": "Erklärung auf Italienisch: Bedeutung, Gebrauch, Register, häufige Fehler", "examples": [{"de": "...", "it": "..."}, {"de": "...", "it": "..."}, {"de": "...", "it": "..."}],
"synonyme": ["..."], "gegenteil": "...", "wortfamilie": ["..."], "level": "A1-C2"}`, GEN_SYS, true);
    box.innerHTML = `<div class="card"><div class="dict-head"><span class="prompt">${esc(d.de)}</span>${sayBtn(d.de)}<span class="badge">${esc(d.level)}</span><span class="tag">${esc(d.type)}</span></div>
      <p style="margin:6px 0"><b>${esc(d.it)}</b> <span class="muted">· ${esc(d.gr)}</span></p><p class="theory">${esc(d.note)}</p>
      ${(d.examples || []).map(x => `<div class="ex" style="border-left:3px solid var(--primary);padding-left:12px;margin:10px 0"><span class="row">${esc(x.de)} ${sayBtn(x.de)}</span><i class="muted" style="font-style:normal">${esc(x.it)}</i></div>`).join("")}
      <p class="muted">${d.synonyme?.length ? "Sinonimi: " + esc(d.synonyme.join(", ")) + " · " : ""}${d.gegenteil ? "Contrario: " + esc(d.gegenteil) + " · " : ""}${d.wortfamilie?.length ? "Famiglia: " + esc(d.wortfamilie.join(", ")) : ""}</p>
      <button class="btn" id="saveai">${ic("bookmark")} Salva nel mio mazzo</button></div>`;
    $("saveai").onclick = () => { if (!S.custom.some(w => w.de === d.de)) S.custom.push({ de: d.de, it: d.it }); save(); toast("Salvata nel tuo mazzo."); addXP(2); };
  } catch (e) { box.innerHTML = `<div class="card">${aiErrBox(e)}</div>`; }
}

// ============================================================ ESERCIZI
function practice() {
  view("Esercizi", `
    <div class="row" style="margin-bottom:16px">${seg("lvl", ["B1", "B2"], S.level)}<span class="spacer"></span><span class="tag">${dueWords().length} parole da ripassare</span></div>
    <div class="mods">
      ${mod("casi", "book", "Dativo o Accusativo?", "Regole, preposizioni, Wo?/Wohin?, esercizi", "#e8590c")}
      ${mod("preposizioni", "globe", "Preposizioni", "Come si usano: luogo, tempo, differenze", "#30b06a")}
      ${mod("prep", "layers", "Verbi con preposizione", "warten auf, denken an · woran, darauf", "#0071e3")}
      ${mod("verbi", "pen", "Verbi B2", "Flashcard, paradigmi, frasi da completare", "#bf5af2")}
      ${mod("flash", "layers", "Flashcard", "Ripasso a intervalli con voce", "#5e5ce6")}
      ${mod("quiz", "checksq", "Test di vocabolario", "Tedesco ↔ italiano", "#0071e3")}
      ${mod("memory", "puzzle", "Gioco delle coppie", "Abbina parole e traduzioni", "#30b06a")}
      ${mod("ascolto", "headphones", "Comprensione orale", "Frasi da capire senza leggerle", "#0d9488")}
      ${mod("parla", "mic", "Pronuncia", "Parla e ricevi un punteggio", "#ff375f")}
      ${mod("dialoghi", "chat", "Dialoghi guidati", "Situazioni formali con il Sie", "#bf5af2")}
      ${mod("dettato", "pen", "Dettato", "Parole, frasi e testi completi", "#e8590c")}
      ${mod("lab/grammatik", "sparkles", "Grammatica con l'IA", "18 argomenti, esercizi sempre nuovi", "#d6336c")}
    </div>`, { nav: "pratica" });
  bindSeg("lvl", v => { S.level = v; save(); practice(); });
}
function vocabFor(id) {
  if (id === "mie") return S.custom.slice();
  if (id === "dict") return shuffle(dictFiltered()).slice(0, 40).map(v => ({ de: v.de, it: v.it }));
  const l = LESSONS.find(x => x.id === id); if (l) return l.vocab.map(([de, it]) => ({ de, it }));
  const pool = allVocab().filter(w => w.level === S.level || w.lesson === "mie");
  const due = dueWords().filter(w => pool.some(p => p.de === w.de));
  const fresh = shuffle(pool.filter(w => !S.words[w.de]));
  return [...due, ...fresh].slice(0, 20).concat(shuffle(pool)).filter((w, i, a) => a.findIndex(x => x.de === w.de) === i).slice(0, 20);
}
function flashcards(id) {
  const words = vocabFor(id); if (!words.length) return emptyState("Vocabolario", "Nessuna parola in questo mazzo.");
  let i = 0, known = 0;
  const draw = () => {
    if (i >= words.length) { addXP(10 + known); return finished("Mazzo completato", `${known} parole sapute su ${words.length}`, 10 + known, "flash/" + (id || "")); }
    const w = words[i];
    view("Flashcard", `${stepbar(i, words.length)}
      <div class="flash" id="fc"><div class="inner"><div class="face"><span class="tag">TEDESCO</span><div class="prompt" style="margin-top:10px">${esc(w.de)}</div><small>Tocca o premi Spazio per girare</small></div>
        <div class="face back"><span class="tag" style="color:#fff;opacity:.8">ITALIANO</span><div class="prompt" style="margin-top:10px">${esc(w.it)}</div><small>${esc(w.de)}</small></div></div></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" data-say="${esc(w.de)}">${ic("volume")} Ascolta</button>
        <button class="btn danger" id="no">${ic("refresh")} Da ripassare</button><button class="btn" id="yes">${ic("check")} La so</button></div>
      <p class="muted" style="text-align:center;margin-top:14px"><span class="kbd">Spazio</span> gira · <span class="kbd">1</span> da ripassare · <span class="kbd">2</span> la so</p>`, { back: true, crumb: "Esercizi", nav: "pratica" });
    speak(w.de);
    const fc = $("fc"); fc.onclick = () => fc.classList.toggle("flip");
    const yes = () => { markWord(w.de, true); known++; i++; draw(); }, no = () => { markWord(w.de, false); if (words.filter(x => x === w).length < 2) words.push(w); i++; draw(); };
    $("yes").onclick = yes; $("no").onclick = no;
    const kh = e => { if (e.target.tagName === "INPUT") return; if (e.code === "Space") { e.preventDefault(); fc.classList.toggle("flip"); } if (e.key === "2") yes(); if (e.key === "1") no(); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
function quiz(id) {
  const pool = vocabFor(id), all = allVocab();
  if (pool.length < 4) return emptyState("Test", "Servono almeno 4 parole.");
  const qs = shuffle(pool).slice(0, 10); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); if (id && getLesson(id) && score >= qs.length * .8) { S.done[id] = true; save(); } return finished(`${score} su ${qs.length}`, score >= qs.length * .8 ? "Ottimo risultato." : "Ripeti il test per consolidare.", score * 3, "quiz/" + (id || "")); }
    const q = qs[i], dir = i % 2 === 0;
    const wrong = shuffle(all.filter(w => w.de !== q.de && w.it !== q.it)).slice(0, 3), o = shuffle([q, ...wrong]);
    view("Test", `${stepbar(i, qs.length)}<div class="card"><span class="tag">${dir ? "TRADUCI IN ITALIANO" : "TRADUCI IN TEDESCO"}</span>
      <div class="row" style="margin:10px 0 6px"><div class="prompt" style="flex:1">${esc(dir ? q.de : q.it)}</div>${dir ? sayBtn(q.de) : ""}</div>
      ${o.map((x, k) => `<button class="opt" data-k="${k}"><span class="k">${k + 1}</span><span>${esc(dir ? x.it : x.de)}</span></button>`).join("")}
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
    if (dir) speak(q.de);
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = o[k] === q; markWord(q.de, ok); if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (o[x.dataset.k] === q) x.classList.add("ok"); });
      if (!ok) $app.querySelector(`.opt[data-k="${k}"]`).classList.add("bad");
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? pick(PRAISE) : `Risposta corretta: <b>${esc(dir ? q.it : q.de)}</b>`;
      speak(q.de); later(() => { i++; draw(); }, ok ? 1100 : 2200);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.k));
    const kh = e => { if (/^[1-4]$/.test(e.key)) answer(+e.key - 1); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
function memory(id) {
  const words = shuffle(vocabFor(id)).slice(0, 6); if (words.length < 3) return emptyState("Coppie", "Servono almeno 3 parole.");
  const left = shuffle(words), right = shuffle(words); let sel = null, found = 0, errors = 0; const t0 = Date.now();
  view("Gioco delle coppie", `<p class="muted">Abbina ogni espressione tedesca alla sua traduzione.</p>
    <div class="pairs">${left.map((w, k) => `<button class="opt" data-side="de" data-w="${esc(w.de)}">${esc(w.de)}</button><button class="opt" data-side="it" data-w="${esc(right[k].de)}">${esc(right[k].it)}</button>`).join("")}</div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
  $app.querySelectorAll(".pairs .opt").forEach(b => b.onclick = () => {
    if (b.dataset.side === "de") speak(b.dataset.w);
    if (!sel || sel.dataset.side === b.dataset.side) { sel && sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
    if (sel.dataset.w === b.dataset.w) {
      sel.classList.add("done"); b.classList.add("done"); found++; markWord(b.dataset.w, true);
      if (found === words.length) { const xp = Math.max(6, 18 - errors * 2), s = Math.round((Date.now() - t0) / 1000); addXP(xp); later(() => finished(errors ? `${errors} errori` : "Nessun errore", `Completato in ${s} secondi`, xp, "memory/" + (id || "")), 450); }
    } else { errors++; b.classList.add("bad"); const s = sel; later(() => { b.classList.remove("bad"); }, 450); s.classList.remove("sel"); }
    sel.classList.remove("sel"); sel = null;
  });
}
function listening() {
  const qs = shuffle(LISTENING); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 4); return finished(`${score} su ${qs.length}`, "Comprensione orale", score * 4, "ascolto"); }
    const q = qs[i];
    view("Comprensione orale", `${stepbar(i, qs.length)}<div class="card"><p class="muted">Ascolta senza leggere e scegli il significato corretto.</p>
      <div class="row"><button class="btn lg" data-say="${esc(q.de)}">${ic("play")} Ascolta</button><button class="btn ghost" data-say="${esc(q.de)}" data-rate="0.7">${ic("slow")} Lento</button></div>
      ${q.options.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${"ABC"[k]}</span><span>${esc(o)}</span></button>`).join("")}<div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
    speak(q.de);
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = +b.dataset.k === q.a; if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("ok"); });
      if (!ok) b.classList.add("bad");
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = `${ok ? pick(PRAISE) : "Non proprio."} <span class="muted">«${esc(q.de)}»</span>`;
      later(() => { i++; draw(); }, 2600);
    });
  };
  draw();
}
function speaking(id) {
  const qs = shuffle(vocabFor(id)).slice(0, 8); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 5); return finished(`${score} su ${qs.length}`, "Pronuncia", score * 5, "parla/" + (id || "")); }
    const q = qs[i];
    view("Pronuncia", `${stepbar(i, qs.length)}<div class="card" style="text-align:center"><span class="tag">RIPETI AD ALTA VOCE</span>
      <div class="prompt" style="margin:14px 0 4px">${esc(q.de)}</div><p class="muted">${esc(q.it)}</p>
      <div class="row" style="justify-content:center;margin-top:16px"><button class="btn ghost" data-say="${esc(q.de)}">${ic("volume")} Ascolta</button><button class="btn ghost" data-say="${esc(q.de)}" data-rate="0.7">${ic("slow")} Lento</button>
      <button class="btn lg" id="mic">${ic("mic")} Parla</button><button class="btn ghost" id="skip">Salta</button></div><div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
    speak(q.de);
    $("skip").onclick = () => { i++; draw(); };
    $("mic").onclick = () => {
      const m = $("mic"); m.classList.add("rec"); m.innerHTML = ic("mic") + " Ti ascolto…"; speechSynthesis.cancel();
      listen(alts => {
        const best = Math.max(...alts.map(a => similarity(a, q.de))), ok = best >= .75; markWord(q.de, ok);
        const d = wordDiff(q.de, alts[0]);
        const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
        fb.innerHTML = `${Math.round(best * 100)}% · ${ok ? pick(PRAISE) : "Riprova: ascolta di nuovo il modello."}<div class="diff" style="margin-top:8px;font-weight:500">${d.out.map(w => `<span class="w ${w.k}">${esc(w.t)}</span>`).join(" ")}</div>`;
        if (ok) { score++; later(() => { i++; draw(); }, 1800); }
      }, () => { const m = $("mic"); if (m) { m.classList.remove("rec"); m.innerHTML = ic("mic") + " Parla"; } });
    };
  };
  draw();
}
function dialoguesList() {
  view("Dialoghi guidati", `<p class="muted">Situazioni formali con il «Sie». Rispondi a voce o scegli una risposta.</p>
    <div class="list">${DIALOGUES.map(d => `<button class="li" data-go="dialogo/${d.id}"><span class="chip" style="--c:#bf5af2">${ic("chat")}</span><span class="t"><b>${esc(d.title)}</b><small>${d.turns.length} battute</small></span><span class="end">${S.done[d.id] ? `<span class="badge ok">${ic("check")} Fatto</span>` : ic("right")}</span></button>`).join("")}</div>
    <div class="card" style="margin-top:16px;display:flex;gap:14px;align-items:center"><span class="chip" style="--c:#d6336c">${ic("sparkles")}</span><div style="flex:1"><b>Vuoi infinite situazioni?</b><br><small class="muted">Il Tutor IA improvvisa qualsiasi scenario.</small></div><button class="btn soft" data-go="tutor">Apri il tutor</button></div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
function dialogue(id) {
  const d = DIALOGUES.find(x => x.id === id); if (!d) return dialoguesList();
  let t = 0; const log = [];
  const draw = () => {
    const turn = d.turns[t];
    const bub = log.map(b => `<div class="bubble ${b.who}">${esc(b.de)}${b.it ? `<span class="sub">${esc(b.it)}</span>` : ""}</div>`).join("");
    if (!turn) { S.done[id] = true; addXP(20); view(d.title, `<div class="chat">${bub}</div>` + resultCard("Dialogo completato", "Hai gestito la conversazione in registro formale.", 20, "dialoghi"), { back: true, nav: "pratica" }); confetti(); return; }
    view(d.title, `<div class="chat">${bub}<div class="bubble t">${esc(turn.tutor)} ${sayBtn(turn.tutor)}<span class="sub">${esc(turn.it)}</span></div></div>
      <div class="card"><span class="tag">LA TUA RISPOSTA</span><div style="margin:10px 0"><button class="btn lg" id="mic">${ic("mic")} Rispondi a voce</button></div>
      ${turn.answers.map((a, k) => `<button class="opt" data-k="${k}"><span class="k">${k + 1}</span><span>${esc(a)}</span></button>`).join("")}<div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Dialoghi", nav: "pratica" });
    speak(turn.tutor);
    const accept = text => { log.push({ who: "t", de: turn.tutor, it: turn.it }, { who: "u", de: text }); t++; addXP(3); draw(); };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => { speak(turn.answers[b.dataset.k]); later(() => accept(turn.answers[b.dataset.k]), 400); });
    $("mic").onclick = () => {
      const m = $("mic"); m.classList.add("rec"); m.innerHTML = ic("mic") + " Ti ascolto…"; speechSynthesis.cancel();
      listen(alts => {
        let best = 0; alts.forEach(a => turn.answers.forEach(x => best = Math.max(best, similarity(a, x))));
        const fb = $("fb");
        if (best >= .6) { fb.className = "feedback ok"; fb.textContent = pick(PRAISE); later(() => accept(alts[0]), 900); }
        else { fb.className = "feedback bad"; fb.innerHTML = `Ho capito: «${esc(alts[0])}». Prova con una delle frasi proposte.`; }
      }, () => { const m = $("mic"); if (m) { m.classList.remove("rec"); m.innerHTML = ic("mic") + " Rispondi a voce"; } });
    };
  };
  draw();
}

// ============================================================ DETTATO AVANZATO
function dictation(mode, arg) {
  if (!mode) return view("Dettato", `
    <p class="muted">Allena ascolto e ortografia insieme. Ogni errore viene evidenziato parola per parola.</p>
    <div class="row" style="margin:6px 0 16px">${seg("lvl", ["B1", "B2"], S.level)}<span class="spacer"></span>
      <label class="tag" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="strict" ${S.strictCase ? "checked" : ""}> Valuta maiuscole e punteggiatura</label></div>
    <div class="mods">
      ${mod("dettato/parole", "library", "Parole", "Lessico del livello, con articolo", "#5e5ce6")}
      ${mod("dettato/frasi", "chat", "Frasi", "Frasi complete dalle lezioni", "#0071e3")}
      ${mod("dettato/testi", "file", "Testi completi", `${DICTATIONS.filter(d => d.level === S.level).length} testi, frase per frase`, "#e8590c")}
      ${mod("dettato/ia", "sparkles", "Dettato IA", "Testi nuovi su qualsiasi tema", "#d6336c")}
    </div>
    <div class="sec"><h3>Testi ${S.level}</h3></div>
    <div class="list">${DICTATIONS.filter(d => d.level === S.level).map(d => `<button class="li" data-go="dettato/testo/${d.id}"><span class="chip" style="--c:#e8590c">${ic("pen")}</span><span class="t"><b>${esc(d.title)}</b><small>${d.text.split(/\s+/).length} parole · ${splitSent(d.text).length} frasi</small></span><span class="end">${ic("right")}</span></button>`).join("")}</div>`, { nav: "dettato" })
    || (bindSeg("lvl", v => { S.level = v; save(); dictation(); }), $("strict").onchange = e => { S.strictCase = e.target.checked; save(); });
  if (mode === "parole" || mode === "frasi") {
    let pool = vocabFor(arg).map(w => w.de);
    if (mode === "frasi") pool = (arg ? pool : LESSONS.filter(l => l.level === S.level).flatMap(l => l.vocab.map(v => v[0])).concat(VOCAB.filter(v => v.level === S.level).map(v => v.exDe))).filter(s => s.split(" ").length >= 4);
    if (mode === "parole") pool = pool.filter(s => s.split(" ").length <= 4);
    return runDictation(mode === "parole" ? "Dettato di parole" : "Dettato di frasi", shuffle(pool).slice(0, 8));
  }
  if (mode === "testi") return go("dettato/testo/" + pick(DICTATIONS.filter(d => d.level === S.level)).id);
  if (mode === "testo") { const d = DICTATIONS.find(x => x.id === arg); if (!d) return dictation(); return runDictation(d.title, splitSent(d.text), d.text); }
  if (mode === "ia") return pickTopicView("Dettato IA", TOPICS, "Scegli un tema per il testo:", async function gen(topic) {
    loading("Dettato IA", topic);
    try {
      const d = await gemini(`Schreibe einen Diktattext auf Niveau ${S.level} zum Thema "${topic}" (${S.level === "B2" ? "90–120 Wörter, komplexe Satzstrukturen, Nebensätze, Nominalstil" : "60–80 Wörter, klare Sätze, Perfekt und Nebensätze"}). Achte auf typische Rechtschreibschwierigkeiten (ß/ss, Groß-/Kleinschreibung, Kommas).
JSON: {"title": "...", "text": "..."}`, GEN_SYS, true);
      runDictation(d.title, splitSent(d.text), d.text);
    } catch (e) { aiError("Dettato IA", e, () => gen(topic)); }
  });
}
const splitSent = t => t.match(/[^.!?]+[.!?]+["“]?|[^.!?]+$/g).map(s => s.trim()).filter(Boolean);
function runDictation(title, items, full) {
  if (!items.length) return emptyState("Dettato", "Nessun contenuto disponibile.");
  let i = 0, total = 0, allErr = [];
  const draw = () => {
    if (i >= items.length) {
      const pct = Math.round(total / items.length * 100), xp = Math.round(pct / 5) + items.length; S.dictations++; addXP(xp);
      return view("Risultato dettato", `<div class="card result"><div class="big-num">${pct}%</div><h2 style="margin-top:8px">${pct >= 90 ? "Eccellente" : pct >= 70 ? "Buon lavoro" : "Continua così"}</h2><p class="muted">${esc(title)} · +${xp} punti</p></div>
        ${allErr.length ? `<div class="card"><h3>Da rivedere</h3><table class="tbl"><tr><th>Corretto</th><th>Hai scritto</th></tr>${allErr.slice(0, 30).map(e => `<tr><td><b>${esc(e.want || "—")}</b></td><td class="muted">${esc(e.got || "(mancante)")}</td></tr>`).join("")}</table></div>` : ""}
        ${full ? `<div class="card"><h3>Testo completo</h3><p class="reading">${esc(full)}</p>${sayBtn(full)}</div>` : ""}
        <div class="row"><button class="btn" data-go="dettato">Altri dettati</button><button class="btn ghost" data-go="">Torna a Oggi</button></div>`, { back: true, nav: "dettato" }), pct >= 90 && confetti();
    }
    const s = items[i];
    view(title, `${stepbar(i, items.length)}<div class="card"><span class="tag">ASCOLTA E SCRIVI</span>
      <div class="row" style="margin:12px 0"><button class="btn lg" id="play">${ic("play")} Ascolta</button><button class="btn ghost" id="slow">${ic("slow")} Lento</button>
      <button class="btn ghost" id="punct" title="Detta anche la punteggiatura">${ic("pen")} Con punteggiatura</button></div>
      <textarea class="answer" id="ans" rows="${s.split(" ").length > 8 ? 4 : 2}" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Scrivi qui quello che senti…"></textarea>
      <div class="row" style="margin-top:12px"><button class="btn" id="chk">Controlla</button><span class="spacer"></span><span class="tag"><span class="kbd">Ctrl</span>+<span class="kbd">Invio</span> controlla · <span class="kbd">Ctrl</span>+<span class="kbd">Spazio</span> riascolta</span></div>
      <div id="res"></div></div>`, { back: true, crumb: "Dettato", nav: "dettato" });
    const play = r => speak(s, r);
    later(() => play(), 300);
    $("play").onclick = () => play(); $("slow").onclick = () => play(0.65);
    $("punct").onclick = () => speak(s.replace(/,/g, " Komma, ").replace(/\.(\s|$)/g, " Punkt. ").replace(/\?/g, " Fragezeichen. ").replace(/!/g, " Ausrufezeichen. ").replace(/[„“"]/g, " Anführungszeichen "), 0.8);
    const ta = $("ans"); ta.focus();
    let checked = false;
    const chk = () => {
      if (checked) { i++; return draw(); }
      checked = true;
      const d = wordDiff(s, ta.value); total += d.score; allErr.push(...d.errs.filter(e => e.want));
      $("res").innerHTML = `<div class="feedback ${d.score >= .9 ? "ok" : "bad"}">${Math.round(d.score * 100)}% · ${d.score >= .9 ? pick(PRAISE) : "Ecco il confronto:"}</div>
        <div class="diff" style="margin-top:12px">${d.out.map(w => `<span class="w ${w.k}">${esc(w.t)}</span>`).join(" ")}</div>
        <p class="muted" style="margin-top:8px">Verde = corretto · Rosso = sbagliato · Arancione = mancante</p>`;
      $("chk").textContent = "Avanti";
    };
    $("chk").onclick = chk;
    ta.onkeydown = e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); chk(); } if (e.code === "Space" && e.ctrlKey) { e.preventDefault(); play(); } };
  };
  draw();
}

// ============================================================ RISULTATI E STATI VUOTI
function resultCard(title, sub, xp, again) {
  return `<div class="card result"><span class="chip lg" style="--c:#30b06a">${ic("check")}</span><h2>${esc(title)}</h2><p class="muted">${esc(sub)}</p>
    ${xp ? `<span class="badge amber" style="font-size:.9rem;padding:6px 14px">${ic("star")} +${xp} punti</span>` : ""}
    <p class="quote" style="margin-top:22px;font-size:1rem">„${esc(pick(QUOTES)[0])}“</p>
    <div class="row" style="justify-content:center;margin-top:18px">${again ? `<button class="btn" data-go="${again}">${ic("refresh")} Ancora</button>` : ""}<button class="btn ghost" data-go="">Torna a Oggi</button></div></div>`;
}
function finished(title, sub, xp, again) { view("Completato", resultCard(title, sub, xp, again), { back: true }); speak(pick(PRAISE)); if (xp >= 15) confetti(); }
function emptyState(title, msg) { view(title, `<div class="card empty">${ic("info")}<p>${esc(msg)}</p><button class="btn" data-go="">Torna a Oggi</button></div>`, { back: true }); }

// ============================================================ GEMINI
// Piano gratuito (verificato nov 2026): flash-lite ~500 richieste/giorno; 3.8-flash ~20/giorno → solo per valutazioni, con ripiego.
const MODEL_FAST = "gemini-3.5-flash-lite", MODEL_PRO = "gemini-3.8-flash";
const GEN_SYS = "Du bist Autorin offizieller Prüfungsmaterialien des Goethe-Instituts und erfahrene DaF-Lehrerin. Erstelle authentische, sprachlich fehlerfreie, abwechslungsreiche Materialien. Die richtige Antwort soll zufällig auf die Optionen verteilt sein. Erklärungen für die Lernende (Italienerin) auf Italienisch. Antworte ausschließlich mit gültigem JSON ohne Markdown.";
async function gemini(msgs, sys, json, pro) {
  if (!S.gkey) throw new Error("NOKEY");
  if (!navigator.onLine) throw new Error("OFFLINE");
  if (pro) { try { return await geminiCall(S.gmodelPro || MODEL_PRO, msgs, sys, json); } catch (e) { if (!/429|quota|exhausted|404|not found|503|overloaded/i.test(e.message)) throw e; } }
  try { return await geminiCall(S.gmodel || MODEL_FAST, msgs, sys, json); }
  catch (e) { if (/503|overloaded|unavailable/i.test(e.message)) { await new Promise(r => setTimeout(r, 1500)); return geminiCall(S.gmodel || MODEL_FAST, msgs, sys, json); } throw e; }
}
async function geminiCall(model, msgs, sys, json) {
  const contents = typeof msgs === "string" ? [{ role: "user", parts: [{ text: msgs }] }] : msgs.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
  const body = { contents, systemInstruction: { parts: [{ text: sys }] }, generationConfig: { temperature: json ? 0.9 : 0.8 } };
  if (json) body.generationConfig.responseMimeType = "application/json";
  const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 60000);
  let r;
  try { r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", "x-goog-api-key": S.gkey }, body: JSON.stringify(body) }); }
  catch (e) { throw new Error(e.name === "AbortError" ? "TIMEOUT" : "NETWORK"); } finally { clearTimeout(to); }
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((d.error?.message || "") + " (HTTP " + r.status + ")");
  const out = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("");
  if (!out) throw new Error("EMPTY");
  if (!json) return out;
  try { return JSON.parse(out.replace(/^\s*```(json)?/i, "").replace(/```\s*$/, "").trim()); } catch { throw new Error("BADJSON"); }
}
function aiMsg(e) {
  const m = e.message || "";
  if (m === "NOKEY") return "Il tutor IA non è ancora attivo: inserisci la chiave Gemini gratuita.";
  if (m === "OFFLINE" || m === "NETWORK") return "Sei offline. Le funzioni IA richiedono internet; tutto il resto dell'app funziona anche senza.";
  if (m === "TIMEOUT") return "Gemini non ha risposto in tempo. Riprova.";
  if (m === "BADJSON" || m === "EMPTY") return "La risposta dell'IA non era completa. Riprova: ogni generazione è diversa.";
  if (/429|quota|exhausted/i.test(m)) return "Hai raggiunto il limite gratuito di Gemini per ora. Riprova tra qualche minuto (o domani).";
  if (/API key|API_KEY|permission|403|401/i.test(m)) return "La chiave Gemini non è valida. Controllala nelle Impostazioni.";
  if (/404|not found/i.test(m)) return "Il modello Gemini indicato non esiste più. Aggiornalo nelle Impostazioni.";
  return "Errore dell'IA: " + m;
}
const aiErrBox = e => `<div class="feedback bad" style="display:block">${esc(aiMsg(e))}</div>${e.message === "NOKEY" ? `<button class="btn" data-go="impostazioni" style="margin-top:12px">Inserisci la chiave</button>` : ""}`;
function loading(title, msg) { view(title, `<div class="card"><div class="row"><span class="chip" style="--c:#d6336c">${ic("sparkles")}</span><div><b>${esc(msg)}</b><br><small class="muted">Gemini sta preparando il materiale…</small></div></div><div class="skeleton" style="margin-top:20px"></div><div class="skeleton" style="width:85%"></div><div class="skeleton" style="width:60%"></div></div>`, { back: true }); }
function aiError(title, e, retry) {
  view(title, `<div class="card">${aiErrBox(e)}<div class="row" style="margin-top:12px">${e.message !== "NOKEY" ? `<button class="btn" id="retry">${ic("refresh")} Riprova</button>` : ""}<button class="btn ghost" data-go="">Torna a Oggi</button></div></div>`, { back: true });
  if ($("retry")) $("retry").onclick = retry;
}
function pickTopicView(title, list, label, fn, extra = "") {
  view(title, `<div class="card"><label class="fl">${label}</label><select class="answer" id="sel">${opts(list, pick(list))}</select>
    <label class="fl">Oppure scrivi un tema libero</label><input class="answer" id="free" placeholder="es. la Bauhaus, il Danubio, l'intelligenza artificiale…">${extra}
    <button class="btn lg" id="gen" style="margin-top:16px">${ic("sparkles")} Genera</button></div>`, { back: true });
  $("gen").onclick = () => fn(($("free").value.trim() || $("sel").value));
}

// ============================================================ TUTOR IA
const MODES = {
  frei: { label: "Conversazione libera", start: "Guten Tag, Frau Rossi! Schön, Sie zu sehen. Worüber möchten Sie heute sprechen?", sys: "Führe ein natürliches Gespräch. Stelle Rückfragen und bringe neue Themen ein (Arbeit, Gesellschaft, Umwelt, Kultur, Medien, Reisen)." },
  rolle: { label: "Gioco di ruolo (ufficio, medico, colloquio…)", start: "Lassen Sie uns ein Rollenspiel machen. Wählen Sie eine Situation: beim Arzt, auf dem Bürgeramt, im Vorstellungsgespräch oder eine Wohnungsbesichtigung?", sys: "Spiele realistische Rollen (Beamtin, Ärztin, Personalchefin, Vermieterin). Bleibe in der Rolle, aber korrigiere Fehler wie vereinbart." },
  praes: { label: "Esame orale: presentazione", start: "Willkommen zur mündlichen Prüfung. Bitte wählen Sie ein Thema für Ihre Präsentation: Homeoffice, soziale Medien oder Nachhaltigkeit im Alltag. Sie haben etwa vier Minuten.", sys: "Du bist Prüferin der Goethe-Prüfung, Sprechen Teil 1. Lass die Kandidatin präsentieren, stelle danach eine Frage dazu und gib am Ende eine Bewertung nach den Goethe-Kriterien (Aufgabenerfüllung, Kohärenz, Wortschatz, Strukturen) mit Punkten." },
  disk: { label: "Esame orale: discussione", start: "Wir diskutieren heute die Frage: Sollte das Auto aus den Innenstädten verbannt werden? Was ist Ihre Meinung?", sys: "Du bist Gesprächspartnerin in der Goethe-Prüfung, Sprechen Teil 2. Vertritt oft eine Gegenposition, bringe Argumente und versuche am Ende, gemeinsam einen Kompromiss zu finden." },
  avvocato: { label: "Avvocato del diavolo (argomentare)", start: "Ich behaupte: Sprachen lernen ist im Zeitalter der KI überflüssig. Überzeugen Sie mich vom Gegenteil!", sys: "Du bist eine provokante, aber respektvolle Debattiererin. Vertritt konsequent die Gegenposition zu Beas Meinung, fordere Begründungen und Beispiele, und lobe gute Argumente. So trainiert sie Argumentieren auf hohem Niveau." },
  brief: { label: "Correggi un mio testo", start: "Bitte schicken Sie mir Ihren Text, zum Beispiel eine formelle E-Mail oder einen Forumsbeitrag. Ich korrigiere ihn ausführlich.", sys: "Korrigiere geschriebene Texte: gib eine verbesserte Version, liste die wichtigsten Fehler mit Erklärung auf und bewerte nach den Goethe-Kriterien Schreiben." },
  grammatik: { label: "Domande di grammatica (in italiano)", start: "Ciao Bea! Fammi qualsiasi domanda sulla grammatica o sul lessico tedesco: ti rispondo in italiano con esempi.", sys: "Beantworte Grammatik- und Wortschatzfragen ausführlich AUF ITALIENISCH, mit deutschen Beispielen. In diesem Modus ist keine Korrekturzeile nötig, außer Bea schreibt auf Deutsch mit Fehlern." }
};
const TUTOR_SYS = `Du bist Frau Dr. Keller, eine erfahrene, warmherzige und motivierende Deutschlehrerin (Goethe-Prüferin). Deine Schülerin heißt Bea Rossi, ist 25 Jahre alt, Italienerin und bereitet sich auf die Goethe-Zertifikate B1 und B2 vor.
Regeln:
- Sprich mit Bea auf Deutsch, im formellen Register (Sie), auf dem aktuellen Niveau, natürlich und idiomatisch.
- Antworte kurz (2–5 Sätze), damit ein echtes Gespräch entsteht. Ende meistens mit einer Frage.
- Wenn Bea Fehler macht: antworte zuerst inhaltlich. Dann schreibe in einer neuen Zeile "KORREKTUR:" und erkläre die Korrekturen KURZ auf Italienisch (korrekte Form fett mit **).
- Wenn sie keine Fehler macht, lass die Korrekturzeile weg; lobe gelegentlich besonders gute Formulierungen.
- Ihre Eingaben stammen oft aus Spracherkennung: ignoriere fehlende Satzzeichen und Großschreibung.
- Verwende keine Emojis.`;
let chat = [], tmode = "frei", busy = false;
function tutor() {
  if (!S.gkey) return keySetup();
  if (!chat.length) chat = [{ role: "model", text: MODES[tmode].start }];
  drawChat(true);
}
function keySetup() {
  view("Tutor IA", `<div class="cols"><div class="card c7"><span class="chip lg" style="--c:#bf5af2">${ic("sparkles")}</span><h2 style="margin-top:14px">Attiva il tutor gratuito</h2>
    <p class="muted">Il tutor, l'allenamento IA, le simulazioni e la ricerca nel vocabolario usano Google Gemini. Il piano gratuito non costa nulla.</p>
    <ol class="theory"><li>Apri <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a> e accedi con Google.</li><li>Premi <b>Create API key</b> e copiala.</li><li>Incollala qui sotto.</li></ol>
    <input class="answer" id="key" placeholder="AIza…" autocomplete="off" spellcheck="false"><button class="btn lg" id="savekey" style="margin-top:12px">Salva e prova</button><div id="kfb"></div></div>
    <div class="card c5"><h3>Da sapere</h3><p class="muted">La chiave resta solo su questo dispositivo. Sul piano gratuito Google può usare le conversazioni per migliorare i suoi modelli: non scrivere dati personali sensibili.</p>
    <p class="muted">Su ogni dispositivo (PC, iPhone) la chiave va inserita una volta.</p></div></div>`, { nav: "tutor" });
  $("savekey").onclick = async () => {
    const k = $("key").value.trim(); if (!k) return;
    S.gkey = k; save(); $("kfb").innerHTML = `<div class="feedback info">Verifico la chiave…</div>`;
    try { await gemini("Antworte nur mit: OK", "Antworte knapp."); $("kfb").innerHTML = `<div class="feedback ok">Chiave valida. Il tutor è pronto.</div>`; later(tutor, 900); }
    catch (e) { $("kfb").innerHTML = `<div class="feedback bad">${esc(aiMsg(e))}</div>`; if (/valida/.test(aiMsg(e))) { S.gkey = ""; save(); } }
  };
}
const splitFix = t => { const m = String(t).split(/\n?\s*KORREKTUR:\s*/i); return [m[0], m.slice(1).join(" ")]; };
function drawChat(speakLast) {
  const html = chat.map(m => {
    const [de, fix] = splitFix(m.text);
    if (m.role === "user") return `<div class="bubble u">${md(de)}</div>`;
    return `<div><div class="avatar"><span class="a">K</span>Frau Dr. Keller</div><div class="bubble t">${md(de)} ${sayBtn(de.replace(/\*\*/g, ""))}${fix ? `<div class="fix">${ic("pen")}<div>${md(fix)}</div></div>` : ""}</div></div>`;
  }).join("");
  view("Tutor IA", `
    <div class="row" style="margin-bottom:14px"><select id="mode" class="answer" style="flex:1;min-width:220px">${Object.entries(MODES).map(([k, v]) => `<option value="${k}" ${k === tmode ? "selected" : ""}>${v.label}</option>`).join("")}</select>
      <button class="btn ghost" id="reset">${ic("refresh")} Nuova</button>${chat.length > 3 ? `<button class="btn ghost" id="eval">${ic("medal")} Valuta la conversazione</button>` : ""}</div>
    <div class="chat" id="log">${html}${busy ? `<div class="bubble t typing"><span></span><span></span><span></span></div>` : ""}</div>
    <div class="composer"><textarea class="answer" id="msg" rows="${tmode === "brief" ? 6 : 2}" placeholder="${tmode === "grammatik" ? "Scrivi la tua domanda…" : "Scrivi in tedesco o usa il microfono…"}"></textarea>
      <div class="row"><button class="btn" id="mic">${ic("mic")} Parla</button><span class="spacer"></span><button class="btn" id="send">${ic("send")} Invia</button></div><small class="muted" id="mhint"></small><div id="fb"></div></div>`, { nav: "tutor", keepScroll: true });
  $("mode").onchange = e => { tmode = e.target.value; chat = []; tutor(); };
  $("reset").onclick = () => { chat = []; tutor(); };
  if ($("eval")) $("eval").onclick = evalChat;
  const send = () => { if (dk.active) dk.stop(); const t = $("msg").value.trim(); if (t && !busy) ask(t); };
  $("send").onclick = send;
  $("msg").onkeydown = e => { if (e.key === "Enter" && !e.shiftKey && tmode !== "brief") { e.preventDefault(); send(); } };
  const dk = dictate($("mic"), $("msg"), { hint: "mhint" }); cleanup.push(() => dk.stop());
  const last = chat[chat.length - 1];
  if (speakLast && last && last.role === "model" && tmode !== "grammatik") speak(splitFix(last.text)[0].replace(/\*\*/g, ""));
  window.scrollTo(0, document.body.scrollHeight);
}
async function ask(text) {
  chat.push({ role: "user", text }); busy = true; drawChat(false);
  try {
    const out = await gemini(chat.slice(-30), TUTOR_SYS + "\nAktuelles Niveau: " + S.level + "\nModus: " + MODES[tmode].sys);
    chat.push({ role: "model", text: out }); S.tutorMsgs++; addXP(5);
    const fix = splitFix(out)[1]; if (fix) { S.errors.unshift({ d: today(), you: text, fix: fix.trim() }); S.errors = S.errors.slice(0, 300); save(); }
    busy = false; drawChat(true);
  } catch (e) {
    chat.pop(); busy = false; drawChat(false);
    $("fb").innerHTML = aiErrBox(e); $("msg").value = text;
  }
}
async function evalChat() {
  const tr = chat.map(m => (m.role === "user" ? "Bea: " : "Lehrerin: ") + splitFix(m.text)[0]).join("\n");
  loading("Valutazione", "Analizzo la conversazione");
  try {
    const r = await gemini(`Gesprächsprotokoll:\n${tr}\n\nBewerte Beas mündliche Leistung (nur Beas Beiträge) nach Goethe ${S.level} Sprechen.
JSON: {"punkte": {"Aufgabenerfüllung": 0-5, "Interaktion": 0-5, "Wortschatz": 0-5, "Strukturen": 0-5}, "prozent": 0-100, "staerken": ["Italienisch"], "verbessern": ["Italienisch, konkret"], "redemittel": ["nützliche deutsche Ausdrücke für nächstes Mal"]}`, GEN_SYS, true, true);
    addXP(10);
    view("Valutazione", `<div class="card result"><div class="big-num">${r.prozent}%</div><p class="muted">Stima secondo i criteri Goethe ${S.level}</p></div>${critCard(r.punkte)}
      <div class="cols"><div class="card c6"><h3>Punti di forza</h3><ul class="theory">${arr(r.staerken).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="card c6"><h3>Da migliorare</h3><ul class="theory">${arr(r.verbessern).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
      <div class="card"><h3>Espressioni da usare la prossima volta</h3>${arr(r.redemittel).map(x => `<div class="vocab"><b>${esc(x)}</b>${sayBtn(x)}</div>`).join("")}</div>
      <button class="btn" data-go="tutor">Torna alla conversazione</button>`, { back: true, nav: "tutor" });
  } catch (e) { aiError("Valutazione", e, evalChat); }
}
const critCard = p => `<div class="card"><h3>Criteri</h3>${Object.entries(p).map(([k, v]) => `<div style="margin:10px 0"><div class="row"><span>${esc(k)}</span><span class="spacer"></span><b>${v}/5</b></div><div class="progress thin" style="margin-top:6px"><i style="width:${v / 5 * 100}%"></i></div></div>`).join("")}</div>`;

// ============================================================ ALLENAMENTO IA
function lab(kind) {
  const L = S.level, parts = location.hash.split("/");
  if (!kind) return view("Allenamento IA", `<p class="muted">Materiale sempre nuovo, generato al livello ${L}. Serve la connessione internet.</p>
    <div class="row" style="margin-bottom:16px">${seg("lvl", ["B1", "B2"], L)}</div>
    <div class="mods">
      ${mod("lab/lezione", "wand", "Lezione su misura", "Qualsiasi tema: storia, arte, scienza…", "#d6336c")}
      ${mod("lab/lesen", "file", "Lettura", "Testo autentico + domande", "#0071e3")}
      ${mod("lab/hoeren", "headphones", "Ascolto", "Dialoghi a più voci + domande", "#0d9488")}
      ${mod("lab/grammatik", "layers", "Grammatica", "Esercizi mirati su 18 argomenti", "#5e5ce6")}
      ${mod("lab/schreiben", "pen", "Scrittura con voto", "Compito Goethe + correzione", "#e8590c")}
      ${mod("lab/wortschatz", "library", "Lessico per tema", "12 parole nuove nel tuo mazzo", "#30b06a")}
      ${mod("lab/fehler", "refresh", "Ripasso errori", "Esercizi sui tuoi errori", "#ff375f")}
      ${mod("dettato/ia", "pen", "Dettato IA", "Testi nuovi da trascrivere", "#b8860b")}
    </div>`, { nav: "lab" }) || bindSeg("lvl", v => { S.level = v; save(); lab(); });
  if (kind === "lezione") return pickTopicView("Lezione su misura", ["Geschichte: das Heilige Römische Reich", "Geschichte: die Weimarer Republik", "Kunst: das Bauhaus", "Musik: Bach, Mozart, Beethoven", "Geografie: der Rhein", "Geografie: die Alpen", "Wissenschaft: Albert Einstein", "Philosophie: Kant", "Film: das deutsche Kino", "Essen: regionale Küche", "Sport: Fußball in Deutschland", "Grammatik: Präpositionen", "Grammatik: Passiv", "Umgangssprache und Jugendsprache"], "Scegli un argomento:", async function gen(topic) {
    loading("Lezione su misura", topic);
    try {
      const d = await gemini(`Erstelle eine vollständige Deutschlektion auf Niveau ${L} zum Thema "${topic}". Der Fokus liegt auf dem Deutschlernen (Wortschatz, Strukturen), das Thema ist der Inhalt.
JSON: {"title": "deutscher Titel", "intro": "Einführung auf Italienisch (3-4 Sätze)", "text": "deutscher Lesetext (${L === "B2" ? "250-320" : "180-230"} Wörter)", "vocab": [["deutsch", "italienisch"]] (10 Einträge), "grammar": "ein Grammatikpunkt aus dem Text, erklärt auf Italienisch mit Beispielen (HTML mit <b> erlaubt)", "questions": [{"q": "...", "options": ["...","...","..."], "a": 0, "expl": "Italienisch"}] (5 Fragen)}`, GEN_SYS, true);
      const l = { id: "ai" + Date.now(), level: L, cat: "Landeskunde", title: d.title, theory: esc(d.intro) + "<br><br><b>Grammatica:</b><br>" + d.grammar, text: d.text, vocab: d.vocab, questions: d.questions };
      LESSONS.push(l); S.aiLessons = (S.aiLessons || []).concat([l]).slice(-20); save(); go("lezione/" + l.id);
    } catch (e) { aiError("Lezione su misura", e, () => gen(topic)); }
  });
  if (kind === "spiega") { const l = getLesson(parts[2]); if (!l) return lab(); return (async function gen() {
    loading("Approfondimento", l.title);
    try {
      const d = await gemini(`Thema der Lektion: "${l.title}" (Niveau ${l.level}). Theorie: ${l.theory.replace(/<[^>]+>/g, " ")}
Erstelle eine Vertiefung: JSON {"erklaerung": "ausführlichere Erklärung auf Italienisch mit typischen Fehlern von Italienern", "beispiele": [{"de": "...", "it": "..."}] (6), "items": [{"q": "Lückensatz mit ___ oder Frage", "options": ["...","...","..."], "a": 0, "expl": "Italienisch"}] (8)}`, GEN_SYS, true);
      view("Approfondimento", `<div class="card"><h2>${esc(l.title)}</h2><p class="theory">${md(d.erklaerung)}</p>${arr(d.beispiele).map(x => `<div class="vocab"><div><b>${esc(x.de)}</b><br><span class="muted">${esc(x.it)}</span></div>${sayBtn(x.de)}</div>`).join("")}</div>
        <div class="card"><h3>Esercizi</h3><div id="mc"></div></div>`, { back: true, nav: "lezioni" });
      inlineMC($("mc"), d.items, sc => { addXP(sc * 3); toast(`${sc}/${arr(d.items).length} corrette`); });
    } catch (e) { aiError("Approfondimento", e, gen); }
  })(); }
  if (kind === "lesen" || kind === "hoeren") {
    const H = kind === "hoeren", T = H ? "Ascolto IA" : "Lettura IA";
    return pickTopicView(T, TOPICS, "Scegli un tema:", async function gen(topic) {
      loading(T, topic);
      try {
        const d = await gemini(`Erstelle eine ${H ? "Hörverstehens" : "Leseverstehens"}aufgabe auf Niveau ${L} zum Thema "${topic}".
${H ? `Text: ein natürliches Gespräch oder Radiointerview (200–280 Wörter) zwischen zwei Personen, aufgeteilt in "segments": [{"speaker": "Name", "text": "..."}].` : `Text: ein Zeitungsartikel oder Forumsbeitrag (${L === "B2" ? "320–400" : "230–280"} Wörter) im Feld "text".`}
JSON: {"title": "...", ${H ? '"segments": [...]' : '"text": "..."'}, "questions": [{"q": "Frage auf Deutsch", "options": ["...","...","..."], "a": Index, "expl": "Begründung auf Italienisch mit Zitat"}]} mit 6 Fragen.`, GEN_SYS, true);
        const full = H ? arr(d.segments).map(s => s.speaker + ": " + s.text).join("\n") : d.text;
        view(T, `<div class="card"><h2>${esc(d.title)}</h2>${H ? `<p class="muted">Ascolta il dialogo (voci diverse per ogni parlante), poi rispondi.</p>
          <div class="row"><button class="btn lg" id="play">${ic("play")} Ascolta</button><button class="btn ghost" id="slow">${ic("slow")} Lento</button><button class="btn ghost" id="show">${ic("eye")} Trascrizione</button></div><p class="reading" id="txt" hidden style="margin-top:12px">${esc(full)}</p>`
          : `<p class="reading" style="margin-top:12px">${esc(d.text)}</p>${sayBtn(d.text)}`}</div><div class="card"><h3>Domande</h3><div id="mc"></div></div>`, { back: true, nav: "lab" });
        if (H) { $("play").onclick = () => speakSegments(d.segments); $("slow").onclick = () => speakSegments(d.segments, .75); $("show").onclick = () => $("txt").hidden = false; speakSegments(d.segments); }
        inlineMC($("mc"), d.questions, sc => { addXP(sc * 4); if (H) $("txt").hidden = false; toast(`${sc}/${arr(d.questions).length} corrette`); });
      } catch (e) { aiError(T, e, () => gen(topic)); }
    });
  }
  if (kind === "grammatik") return pickTopicView("Grammatica IA", GRAMMAR, "Argomento:", async function gen(g) {
    loading("Grammatica", g);
    try {
      const d = await gemini(`Erstelle eine kurze Regel (Italienisch) und 10 abwechslungsreiche Übungen zum Grammatikthema "${g}" auf Niveau ${L} (Lückensätze mit ___, Satzumformungen, Fehler finden).
JSON: {"regel": "Regel auf Italienisch, max. 6 Sätze, Beispiele auf Deutsch", "items": [{"q": "...", "options": ["...","...","...","..."], "a": Index, "expl": "kurze Erklärung auf Italienisch"}]}`, GEN_SYS, true);
      view("Grammatica: " + g, `<div class="card"><span class="tag">REGOLA</span><p class="theory">${md(d.regel)}</p></div><div class="card"><div id="mc"></div></div>`, { back: true, nav: "lab" });
      inlineMC($("mc"), d.items, sc => { addXP(sc * 3); toast(`${sc}/${arr(d.items).length} corrette`); });
    } catch (e) { aiError("Grammatica", e, () => gen(g)); }
  });
  if (kind === "wortschatz") return pickTopicView("Lessico per tema", TOPICS, "Tema:", async function gen(topic) {
    loading("Lessico", topic);
    try {
      const d = await gemini(`Erstelle 12 wichtige Wörter/Ausdrücke zum Thema "${topic}" auf Niveau ${L} (Nomen mit Artikel und Plural, Verben mit Präposition, feste Wendungen).
JSON: {"words": [{"de": "...", "gr": "Grammatik", "it": "Italienisch", "note": "Hinweis auf Italienisch", "ex": "Beispielsatz", "exIt": "Übersetzung"}]}`, GEN_SYS, true);
      view("Lessico: " + topic, `<div class="card">${arr(d.words).map(w => `<details class="entry"><summary><span class="t"><b>${esc(w.de)}</b><small>${esc(w.it)} · ${esc(w.gr)}</small></span>${sayBtn(w.de)}</summary><div class="body"><p style="margin:0">${esc(w.note)}</p><div class="ex"><span class="row">${esc(w.ex)} ${sayBtn(w.ex)}</span><i>${esc(w.exIt)}</i></div></div></details>`).join("")}</div>
        <div class="row"><button class="btn" id="add">${ic("bookmark")} Aggiungi tutte al mio mazzo</button><button class="btn ghost" id="again">${ic("refresh")} Altre parole</button></div>`, { back: true, nav: "lab" });
      $("add").onclick = () => { const have = new Set(S.custom.map(w => w.de)); arr(d.words).forEach(w => !have.has(w.de) && S.custom.push({ de: w.de, it: w.it })); addXP(5); toast("Parole aggiunte."); go("flash/mie"); };
      $("again").onclick = () => gen(topic);
    } catch (e) { aiError("Lessico", e, () => gen(topic)); }
  });
  if (kind === "schreiben") return writingTask({ level: L, n: L === "B2" ? 1 : 1 }, null);
  if (kind === "fehler") {
    if (!S.errors.length) return view("Ripasso errori", `<div class="card empty">${ic("info")}<p>Nessun errore registrato. Le correzioni del tutor, dei testi scritti e dei dettati finiscono qui.</p><button class="btn" data-go="tutor">Vai al tutor</button></div>`, { back: true });
    return (async function gen() {
      loading("Ripasso errori", "Analizzo i tuoi errori");
      try {
        const list = S.errors.slice(0, 20).map(e => `- "${e.you}" → ${e.fix}`).join("\n");
        const d = await gemini(`Beas letzte Fehler:\n${list}\nAnalysiere die Muster und erstelle 10 Übungen, die genau diese Fehlertypen trainieren (Niveau ${L}).
JSON: {"summary": "Analyse der typischen Fehler auf Italienisch (3-4 Sätze)", "items": [{"q": "...", "options": ["...","...","..."], "a": Index, "expl": "Italienisch"}]}`, GEN_SYS, true);
        view("Ripasso errori", `<div class="card"><span class="tag">ANALISI</span><p class="theory">${esc(d.summary)}</p></div><div class="card"><div id="mc"></div></div>
          <div class="card"><h3>Ultimi errori</h3>${S.errors.slice(0, 10).map(e => `<div class="vocab"><div><s class="muted">${esc(e.you)}</s><br>${md(e.fix)}</div></div>`).join("")}</div>`, { back: true });
        inlineMC($("mc"), d.items, sc => { addXP(sc * 4); toast(`${sc}/${arr(d.items).length} corrette`); });
      } catch (e) { aiError("Ripasso errori", e, gen); }
    })();
  }
}

// ============================================================ SCRITTURA (usata da allenamento e esame)
async function writingTask(spec, onDone, examMode) {
  const L = spec.level, sp = EXAM_SPEC[L].Schreiben.teile.find(t => t.n === spec.n) || EXAM_SPEC[L].Schreiben.teile[0];
  loading("Scrittura · Teil " + sp.n, "Preparo il compito");
  let task;
  try {
    task = await gemini(`Erstelle eine Schreibaufgabe Goethe-Zertifikat ${L}, Schreiben Teil ${sp.n}: ${sp.register}, ca. ${sp.words} Wörter. Beschreibung: ${sp.desc}
Variiere Thema und Situation (z. B. ${pick(TOPICS)}). ${sp.register === "Forumsbeitrag" || sp.register === "Meinung" ? "Gib einen kurzen Ausgangsbeitrag/Kommentar an, auf den man reagiert." : ""}
JSON: {"title": "...", "situation": "Situation und Aufgabe auf Deutsch", "quelle": "optionaler Ausgangstext oder leer", "points": ["Inhaltspunkt", "..."], "words": ${sp.words}}`, GEN_SYS, true);
  } catch (e) { return aiError("Scrittura", e, () => writingTask(spec, onDone, examMode)); }
  const minutes = examMode ? Math.round(EXAM_SPEC[L].Schreiben.min / EXAM_SPEC[L].Schreiben.teile.length) : 0;
  view(`Scrittura · Teil ${sp.n}`, `<div class="card"><div class="row"><span class="badge">${L} · Teil ${sp.n}</span><span class="spacer"></span>${minutes && S.timed ? `<span class="timer" id="tm">${ic("clock")}<span></span></span>` : ""}</div>
    <h2 style="margin-top:8px">${esc(task.title)}</h2><p class="theory">${esc(task.situation)}</p>
    ${task.quelle ? `<div class="textbox"><span class="lbl">Testo di partenza</span>${esc(task.quelle)}</div>` : ""}
    <ul class="theory">${arr(task.points).map(p => `<li>${esc(p)}</li>`).join("")}</ul>
    <textarea class="answer" id="txt" rows="12" placeholder="Scrivi qui il tuo testo (almeno ${task.words} parole)…" spellcheck="false"></textarea>
    <div class="row" style="margin-top:10px"><span class="tag" id="wc">0 parole</span><span class="spacer"></span><button class="btn" id="eval">${ic("medal")} Valuta</button></div></div><div id="res"></div>`, { back: !examMode, nav: examMode ? "esame" : "lab" });
  const ta = $("txt"), key = "draft-" + L + sp.n;
  try { ta.value = sessionStorage.getItem(key) || ""; } catch {}
  const wc = () => { const n = ta.value.trim().split(/\s+/).filter(Boolean).length; $("wc").textContent = `${n} parole${n < task.words * .9 ? ` · obiettivo ${task.words}` : ""}`; try { sessionStorage.setItem(key, ta.value); } catch {} };
  ta.oninput = wc; wc();
  let stopTimer = () => {};
  if (minutes && S.timed) stopTimer = countdown($("tm"), minutes * 60, () => { toast("Tempo scaduto: consegna automatica."); evaluate(); });
  const evaluate = async () => {
    stopTimer();
    const text = ta.value.trim(); if (text.split(/\s+/).length < 10) { if (!examMode) return toast("Scrivi almeno qualche frase."); }
    $("eval").disabled = true; const res = $("res"); res.innerHTML = `<div class="card"><div class="skeleton"></div><div class="skeleton" style="width:70%"></div><small class="muted">Valutazione secondo i criteri Goethe…</small></div>`;
    try {
      const r = await gemini(`Aufgabe: ${JSON.stringify(task)}\nText der Kandidatin:\n"""${text || "(leer)"}"""\nBewerte streng nach den offiziellen Kriterien Goethe-Zertifikat ${L} Schreiben Teil ${sp.n}. Leerer oder viel zu kurzer Text = niedrige Punkte.
JSON: {"punkte": {"Aufgabenerfüllung": 0-5, "Kohärenz": 0-5, "Wortschatz": 0-5, "Strukturen": 0-5}, "gesamt_prozent": 0-100, "lob": "Was gut war (Italienisch)", "fehler": [{"original": "...", "korrektur": "...", "erklaerung": "Italienisch"}], "verbessert": "verbesserte Version des ganzen Textes", "tipp": "wichtigster Tipp auf Italienisch"}`, GEN_SYS, true, true);
      S.writings++; addXP(Math.round(r.gesamt_prozent / 4));
      try { sessionStorage.removeItem(key); } catch {}
      arr(r.fehler).slice(0, 6).forEach(f => S.errors.unshift({ d: today(), you: f.original, fix: "**" + f.korrektur + "** – " + f.erklaerung })); save();
      res.innerHTML = `<div class="card result" style="padding:28px"><div class="big-num">${r.gesamt_prozent}%</div><p class="muted">${r.gesamt_prozent >= 60 ? "Sufficiente per l'esame" : "Sotto la soglia del 60%"}</p></div>${critCard(r.punkte)}
        <div class="card"><h3>Cosa va bene</h3><p class="theory">${esc(r.lob)}</p><h3 style="margin-top:14px">Il consiglio più importante</h3><p class="theory">${esc(r.tipp)}</p></div>
        <div class="card"><h3>Correzioni</h3>${arr(r.fehler).map(f => `<div class="vocab"><div><s class="muted">${esc(f.original)}</s> → <b>${esc(f.korrektur)}</b><br><small class="muted">${esc(f.erklaerung)}</small></div></div>`).join("") || `<p class="muted">Nessun errore rilevante.</p>`}</div>
        <div class="card"><div class="row"><h3 style="margin:0">Versione migliorata</h3><span class="spacer"></span>${sayBtn(r.verbessert)}</div><p class="reading">${esc(r.verbessert)}</p></div>
        ${onDone ? `<button class="btn lg" id="cont">Continua ${ic("right")}</button>` : `<button class="btn" data-go="lab/schreiben">${ic("refresh")} Nuovo compito</button>`}`;
      if (onDone) $("cont").onclick = () => onDone(r.gesamt_prozent);
    } catch (e) { $("eval").disabled = false; res.innerHTML = `<div class="card">${aiErrBox(e)}</div>`; }
  };
  $("eval").onclick = evaluate;
}
function countdown(el, secs, onEnd) {
  let left = secs; const span = el.querySelector("span");
  const tick = () => { const m = Math.floor(left / 60), s = left % 60; span.textContent = `${m}:${String(s).padStart(2, "0")}`; el.classList.toggle("low", left < 120); if (left-- <= 0) { clearInterval(h); onEnd(); } };
  const h = setInterval(tick, 1000); tick(); cleanup.push(() => clearInterval(h));
  return () => clearInterval(h);
}

// ============================================================ SIMULAZIONI D'ESAME
function exam(a, b) {
  const L = S.level, spec = EXAM_SPEC[L];
  if (!a) {
    const hist = S.exams.slice(0, 8);
    return view("Simulazioni Goethe", `
      <section class="hero"><small style="opacity:.8;font-weight:600;letter-spacing:.06em">GOETHE-ZERTIFIKAT</small><h2>${L} · simulazione completa</h2>
        <p>Struttura ufficiale: ${Object.entries(spec).map(([m, v]) => `${m} ${v.min} min`).join(" · ")}. Si supera con almeno il 60% in ogni modulo.</p>
        <div style="margin-top:18px">${seg("lvl", ["B1", "B2"], L)}</div></section>
      <div class="card"><div class="row"><b>Cronometro come all'esame</b><span class="spacer"></span><label class="row tag"><input type="checkbox" id="timed" ${S.timed ? "checked" : ""}> Attivo</label></div>
        <p class="muted" style="margin:6px 0 0">Ogni simulazione è generata da zero: testi, temi e domande cambiano ogni volta.</p></div>
      <div class="mods">
        ${mod("esame/completo", "grad", "Esame completo", "Tutti e quattro i moduli in sequenza", "#b8860b")}
        ${Object.keys(spec).map(m => mod("esame/modulo/" + m, { Lesen: "file", Hören: "headphones", Schreiben: "pen", Sprechen: "mic" }[m], m, `${spec[m].teile.length} parti · ${spec[m].min} minuti`, { Lesen: "#0071e3", Hören: "#0d9488", Schreiben: "#e8590c", Sprechen: "#ff375f" }[m])).join("")}
      </div>
      <div class="sec"><h3>Allenati su una singola parte</h3></div>
      <div class="card">${Object.entries(spec).map(([m, v]) => v.teile.map(t => `<button class="li" style="margin-bottom:8px" data-go="esame/teil/${m}-${t.n}"><span class="badge">${m} ${t.n}</span><span class="t"><b>${esc(t.title || ({ informell: "E-mail informale", formell: "Messaggio formale", Meinung: "Opinione", Forumsbeitrag: "Contributo al forum" }[t.register] || t.key))}</b><small>${esc(t.desc)}</small></span><span class="end">${ic("right")}</span></button>`).join("")).join("")}</div>
      ${hist.length ? `<div class="sec"><h3>Storico</h3></div><div class="card"><table class="tbl"><tr><th>Data</th><th>Livello</th><th>Moduli</th><th>Esito</th></tr>${hist.map(x => `<tr><td>${x.d}</td><td>${x.level}</td><td>${Object.entries(x.mods || {}).map(([k, v]) => `${k} ${v}%`).join(" · ")}</td><td>${x.pass ? `<span class="badge ok">Superato</span>` : `<span class="badge">Non ancora</span>`}</td></tr>`).join("")}</table></div>` : ""}`, { nav: "esame" })
      || (bindSeg("lvl", v => { S.level = v; save(); exam(); }), $("timed").onchange = e => { S.timed = e.target.checked; save(); });
  }
  if (!S.gkey) return keySetup();
  const result = { level: L, mods: {}, detail: [] };
  const finishAll = () => {
    const pass = Object.values(result.mods).every(v => v >= 60);
    S.exams.unshift({ d: today(), level: L, mods: result.mods, pass }); S.exams = S.exams.slice(0, 50); addXP(a === "completo" ? 80 : 30); save();
    view("Risultato", `<div class="card result"><span class="chip lg" style="--c:${pass ? "#30b06a" : "#ff9f0a"}">${ic(pass ? "medal" : "target")}</span>
      <h2>${pass ? "Bestanden" : "Non ancora superato"}</h2><p class="muted">Goethe-Zertifikat ${L} · simulazione</p></div>
      <div class="card">${Object.entries(result.mods).map(([k, v]) => `<div style="margin:12px 0"><div class="row"><b>${k}</b><span class="spacer"></span><b>${v}%</b> ${v >= 60 ? `<span class="badge ok">OK</span>` : `<span class="badge">&lt; 60%</span>`}</div><div class="progress" style="margin-top:6px"><i style="width:${v}%"></i></div></div>`).join("")}</div>
      ${result.detail.length ? `<div class="card"><h3>Dettaglio per parte</h3><table class="tbl">${result.detail.map(d => `<tr><td>${esc(d.m)} Teil ${d.n}</td><td><b>${d.p}%</b></td></tr>`).join("")}</table></div>` : ""}
      <div class="row"><button class="btn" data-go="esame">Altre simulazioni</button><button class="btn ghost" data-go="lab/fehler">Ripassa gli errori</button></div>`, { nav: "esame" });
    if (pass) confetti();
  };
  if (a === "teil") { const [m, n] = b.split("-"); return runTeil(L, m, +n, p => { result.mods[m] = p; result.detail.push({ m, n, p }); finishAll(); }); }
  const mods = a === "completo" ? Object.keys(spec) : [b];
  let mi = 0;
  const nextMod = () => {
    if (mi >= mods.length) return finishAll();
    const m = mods[mi++]; const teile = spec[m].teile; let ti = 0, scores = [];
    view(m, `<div class="card result"><span class="chip lg" style="--c:#b8860b">${ic({ Lesen: "file", Hören: "headphones", Schreiben: "pen", Sprechen: "mic" }[m])}</span><h2>Modulo ${m}</h2>
      <p class="muted">${teile.length} parti · ${spec[m].min} minuti ${S.timed ? "(cronometro attivo)" : ""}</p>
      <ul class="theory" style="text-align:left;max-width:560px;margin:14px auto">${teile.map(t => `<li><b>Teil ${t.n}</b>: ${esc(t.desc)}</li>`).join("")}</ul>
      <button class="btn lg" id="start">Inizia ${ic("right")}</button></div>`, { nav: "esame" });
    $("start").onclick = () => {
      const deadline = S.timed && m !== "Sprechen" && m !== "Schreiben" ? Date.now() + spec[m].min * 6e4 : 0;
      const nextTeil = () => {
        if (ti >= teile.length) { result.mods[m] = Math.round(scores.reduce((x, y) => x + y, 0) / scores.length); return nextMod(); }
        const t = teile[ti++];
        runTeil(L, m, t.n, p => { scores.push(p); result.detail.push({ m, n: t.n, p }); nextTeil(); }, deadline);
      };
      nextTeil();
    };
  };
  nextMod();
}
function runTeil(L, m, n, done, deadline) {
  const t = EXAM_SPEC[L][m].teile.find(x => x.n === n);
  if (m === "Schreiben") return writingTask({ level: L, n }, done, true);
  if (m === "Sprechen") return speakingTeil(L, t, done);
  return receptiveTeil(L, m, t, done, deadline);
}
async function receptiveTeil(L, m, t, done, deadline) {
  const H = m === "Hören";
  loading(`${m} · Teil ${t.n}`, t.title);
  let d;
  try {
    d = await gemini(`Erstelle Goethe-Zertifikat ${L}, ${m} Teil ${t.n} ("${t.title}"), so authentisch wie möglich. Inhalt: ${t.gen}. Thema frei wählen, aktuell und abwechslungsreich (Anregung: ${pick(TOPICS)}).
${H ? `Alle Hörtexte als "segments": [{"speaker": "Name", "text": "..."}] in der richtigen Reihenfolge; bei mehreren kurzen Texten beginne jeden mit einem Segment speaker "Ansage", text "Text 1." usw.` : `Alle Lesetexte als "texts": [{"label": "Überschrift oder Buchstabe/Name", "text": "..."}].`}
Genau ${t.items} Fragen. Für Richtig/Falsch: options ["Richtig","Falsch"]. Für Ja/Nein: options ["Ja","Nein"]. Für Zuordnungen: options = die Namen/Buchstaben/Sätze.
JSON: {"title": "...", "instructions": "Aufgabenstellung auf Deutsch wie in der Prüfung", ${H ? '"segments": [...]' : '"texts": [...]'}, "questions": [{"q": "...", "options": [...], "a": Index, "expl": "Begründung auf Italienisch mit Textstelle"}]}`, GEN_SYS, true);
    if (!Array.isArray(d.questions) || !arr(d.questions).length) throw new Error("BADJSON");
  } catch (e) { return aiError(m, e, () => receptiveTeil(L, m, t, done, deadline)); }
  let plays = t.plays || 2;
  view(`${m} · Teil ${t.n}`, `<div class="card"><div class="row"><span class="badge">${L} · ${m} ${t.n}</span><span class="spacer"></span>${deadline ? `<span class="timer" id="tm">${ic("clock")}<span></span></span>` : ""}</div>
    <h2 style="margin-top:8px">${esc(d.title)}</h2><p class="theory">${esc(d.instructions)}</p>
    ${H ? `<div class="row"><button class="btn lg" id="play">${ic("play")} Ascolta (<span id="pl">${plays}</span>)</button><span class="tag">${plays === 1 ? "Ascolto unico, come all'esame" : "Puoi ascoltare due volte"}</span></div>`
      : arr(d.texts).map(x => `<div class="textbox"><span class="lbl">${esc(x.label)}</span><div class="reading">${esc(x.text)}</div></div>`).join("")}</div>
    <div class="card"><h3>Domande</h3><div id="mc"></div></div>`, { nav: "esame" });
  if (H) $("play").onclick = () => { if (plays <= 0) return; plays--; $("pl").textContent = plays; $("play").disabled = true; speakSegments(d.segments, null, () => { const p = $("play"); if (p) p.disabled = plays <= 0; }); };
  const finish = inlineMC($("mc"), d.questions, sc => {
    const p = Math.round(sc / arr(d.questions).length * 100); addXP(sc * 2);
    const box = document.createElement("div"); box.className = "card";
    box.innerHTML = `<div class="row"><b>Teil ${t.n}: ${sc}/${arr(d.questions).length} (${p}%)</b><span class="spacer"></span><button class="btn" id="nextT">Continua ${ic("right")}</button></div>
      ${H ? `<details style="margin-top:12px"><summary class="tag" style="cursor:pointer">Mostra la trascrizione</summary><p class="reading">${esc(arr(d.segments).map(s => s.speaker + ": " + s.text).join("\n"))}</p></details>` : ""}`;
    $app.appendChild(box); $("nextT").onclick = () => done(p);
  }, { label: "Consegna", btn: "submitT" });
  if (deadline) { const left = Math.max(5, Math.round((deadline - Date.now()) / 1000)); countdown($("tm"), left, () => { toast("Tempo del modulo scaduto: consegna automatica."); finish(); }); }
}
async function speakingTeil(L, t, done) {
  loading("Sprechen · Teil " + t.n, "Preparo il compito orale");
  let task;
  try {
    task = await gemini(`Erstelle eine Aufgabe Goethe-Zertifikat ${L}, Sprechen Teil ${t.n} (${t.key}): ${t.desc}
JSON: {"title": "...", "aufgabe": "Aufgabenstellung auf Deutsch", "punkte": ["Folie/Leitpunkt 1", "..."], "partner_start": "erster Satz der Prüferin/des Partners", "redemittel": ["5 nützliche Redemittel"]}`, GEN_SYS, true);
  } catch (e) { return aiError("Sprechen", e, () => speakingTeil(L, t, done)); }
  const interactive = ["planen", "diskussion", "feedback"].includes(t.key);
  const log = []; let rec = null, transcript = "";
  const draw = () => {
    view(`Sprechen · Teil ${t.n}`, `<div class="card"><span class="badge">${L} · Sprechen ${t.n}</span><h2 style="margin-top:8px">${esc(task.title)}</h2><p class="theory">${esc(task.aufgabe)}</p>
      <ul class="theory">${arr(task.punkte).map(p => `<li>${esc(p)}</li>`).join("")}</ul>
      <details><summary class="tag" style="cursor:pointer">Espressioni utili</summary>${arr(task.redemittel).map(r => `<div class="vocab"><span>${esc(r)}</span>${sayBtn(r)}</div>`).join("")}</details></div>
      ${interactive ? `<div class="chat">${log.map(x => `<div class="bubble ${x.u ? "u" : "t"}">${esc(x.t)}</div>`).join("")}</div>` : `<div class="card"><span class="tag">LA TUA PRESENTAZIONE (TRASCRIZIONE)</span><p class="reading" id="tr" style="min-height:80px">${esc(transcript) || '<span class="muted">Premi «Parla» e presenta il tema. Il testo apparirà qui.</span>'}</p></div>`}
      <div class="composer"><textarea class="answer" id="msg" rows="2" placeholder="Parla con il microfono o scrivi…"></textarea>
        <div class="row"><button class="btn" id="mic">${ic("mic")} ${interactive ? "Parla" : "Registra"}</button>${interactive ? `<button class="btn ghost" id="send">${ic("send")} Invia</button>` : ""}<span class="spacer"></span><button class="btn soft" id="fin">${ic("medal")} Termina e valuta</button></div><small class="muted" id="mhint"></small><div id="fb"></div></div>`, { nav: "esame" });
    if (interactive && !log.length) { log.push({ u: false, t: task.partner_start }); draw(); speak(task.partner_start); return; }
    const sendTurn = async txt => {
      if (!txt) return; log.push({ u: true, t: txt }); draw();
      try {
        const reply = await gemini(log.map(x => ({ role: x.u ? "user" : "model", text: x.t })), `Du bist Prüfungspartnerin in Goethe ${L} Sprechen Teil ${t.n}. Aufgabe: ${task.aufgabe}. Antworte natürlich, 2–4 Sätze, bringe eigene Ideen ein, vertritt teilweise andere Meinungen, ohne Korrekturen und ohne Emojis.`);
        log.push({ u: false, t: reply }); draw(); speak(reply);
      } catch (e) { $("fb").innerHTML = aiErrBox(e); }
    };
    if (!interactive) $("msg").value = transcript;
    const dk = dictate($("mic"), $("msg"), { label: interactive ? "Parla" : "Registra", hint: "mhint", onText: v => { if (!interactive) { transcript = v; const tr = $("tr"); if (tr) tr.textContent = v; } } });
    rec = null; cleanup.push(() => dk.stop());
    if (interactive) { const st = () => { if (dk.active) dk.stop(); sendTurn($("msg").value.trim()); }; $("send").onclick = st; $("msg").onkeydown = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); st(); } }; }
    else $("msg").oninput = e => { transcript = e.target.value; const tr = $("tr"); if (tr) tr.textContent = transcript; };
    $("fin").onclick = async () => {
      if (dk.active) dk.stop();
      const text = interactive ? log.map(x => (x.u ? "Kandidatin: " : "Partner: ") + x.t).join("\n") : transcript;
      if (!text.trim() || (interactive && !log.some(x => x.u))) return toast("Prima parla o scrivi qualcosa.");
      loading("Valutazione orale", "Valuto la tua prestazione");
      try {
        const r = await gemini(`Aufgabe: ${task.aufgabe}\n${interactive ? "Gesprächsprotokoll" : "Transkript der Präsentation (automatische Spracherkennung, Satzzeichen ignorieren)"}:\n${text}\n
Bewerte NUR die Kandidatin nach Goethe ${L} Sprechen (Aussprache kann aus dem Transkript nicht bewertet werden).
JSON: {"punkte": {"Aufgabenerfüllung": 0-5, "Kohärenz": 0-5, "Wortschatz": 0-5, "Strukturen": 0-5${interactive ? ', "Interaktion": 0-5' : ""}}, "prozent": 0-100, "staerken": ["Italienisch"], "verbessern": ["Italienisch"], "musterloesung": "kurze Musterlösung auf Deutsch"}`, GEN_SYS, true, true);
        addXP(Math.round(r.prozent / 5));
        view("Valutazione orale", `<div class="card result"><div class="big-num">${r.prozent}%</div><p class="muted">Sprechen Teil ${t.n} · stima</p></div>${critCard(r.punkte)}
          <div class="cols"><div class="card c6"><h3>Punti di forza</h3><ul class="theory">${arr(r.staerken).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div><div class="card c6"><h3>Da migliorare</h3><ul class="theory">${arr(r.verbessern).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
          <div class="card"><div class="row"><h3 style="margin:0">Esempio di risposta</h3><span class="spacer"></span>${sayBtn(r.musterloesung)}</div><p class="reading">${esc(r.musterloesung)}</p></div>
          <button class="btn lg" id="cont">Continua ${ic("right")}</button>`, { nav: "esame" });
        $("cont").onclick = () => done(r.prozent);
      } catch (e) { aiError("Valutazione orale", e, () => $("fin") && $("fin").click()); }
    };
  };
  draw();
}

// ============================================================ PROGRESSI
function progress() {
  const words = Object.values(S.words), boxes = [0, 1, 2, 3, 4, 5].map(b => words.filter(w => w.box === b).length);
  const lv = LESSONS.filter(l => !String(l.id).startsWith("ai")), done = lv.filter(l => S.done[l.id]).length;
  const days = Array.from({ length: 105 }, (_, i) => daysAgo(104 - i));
  const totalDays = Object.keys(S.hist).length, last = S.exams[0];
  view("Progressi", `
    <div class="stats">
      <div class="card"><span class="chip" style="--c:#ff9f0a">${ic("star")}</span><div class="stat"><b>${S.xp}</b><small>Punti totali</small></div></div>
      <div class="card"><span class="chip" style="--c:#ff375f">${ic("flame")}</span><div class="stat"><b>${S.streak}</b><small>Serie (record ${S.best})</small></div></div>
      <div class="card"><span class="chip" style="--c:#5e5ce6">${ic("library")}</span><div class="stat"><b>${boxes[3] + boxes[4] + boxes[5]}</b><small>Parole consolidate</small></div></div>
      <div class="card"><span class="chip" style="--c:#30b06a">${ic("book")}</span><div class="stat"><b>${done}/${lv.length}</b><small>Lezioni completate</small></div></div>
    </div>
    <div class="cols" style="margin-top:16px">
      <div class="card c7"><h3>Ultimi 7 giorni</h3>${bars()}</div>
      <div class="card c5"><h3>Attività (15 settimane)</h3><div class="cal">${days.map(d => { const v = S.hist[d] || 0; return `<i class="${v >= S.goal ? "l3" : v >= S.goal / 2 ? "l2" : v ? "l1" : ""}" title="${d}: ${v} punti"></i>`; }).join("")}</div><p class="muted" style="margin:10px 0 0">${totalDays} giorni di studio in totale</p></div>
      <div class="card c6"><h3>Memoria delle parole</h3>${["Nuove/da rifare", "Viste 1 volta", "In consolidamento", "Buone", "Ottime", "Padroneggiate"].map((n, i) => `<div style="margin:8px 0"><div class="row"><small>${n}</small><span class="spacer"></span><small><b>${boxes[i]}</b></small></div><div class="progress thin"><i style="width:${words.length ? boxes[i] / words.length * 100 : 0}%"></i></div></div>`).join("")}</div>
      <div class="card c6"><h3>Attività</h3><table class="tbl"><tr><td>Messaggi al tutor</td><td><b>${S.tutorMsgs}</b></td></tr><tr><td>Testi scritti valutati</td><td><b>${S.writings}</b></td></tr><tr><td>Dettati completati</td><td><b>${S.dictations}</b></td></tr><tr><td>Simulazioni d'esame</td><td><b>${S.exams.length}</b></td></tr>
        <tr><td>Ultima simulazione</td><td>${last ? `<b>${last.level}</b> ${last.pass ? "superata" : "non superata"}` : "—"}</td></tr></table></div>
    </div>
    ${S.errors.length ? `<div class="card"><div class="row"><h3 style="margin:0">Ultimi errori corretti</h3><span class="spacer"></span><button class="btn soft" data-go="lab/fehler">${ic("refresh")} Allenati</button></div>${S.errors.slice(0, 8).map(e => `<div class="vocab"><div><s class="muted">${esc(e.you)}</s><br>${md(e.fix)}</div></div>`).join("")}</div>` : ""}`, { nav: "progressi" });
}

// ============================================================ PREMI E TRAGUARDI
const BADGES = [
  ["first", "Primo passo", "Guadagna i primi 10 punti", s => s.xp >= 10, "star"],
  ["streak3", "Costanza", "3 giorni di fila", s => s.best >= 3, "flame"],
  ["streak7", "Una settimana", "7 giorni di fila", s => s.best >= 7, "flame"],
  ["streak30", "Disciplina d'acciaio", "30 giorni di fila", s => s.best >= 30, "shield"],
  ["xp500", "In crescita", "500 punti", s => s.xp >= 500, "zap"],
  ["xp2000", "Instancabile", "2000 punti", s => s.xp >= 2000, "zap"],
  ["words50", "Vocabolario solido", "50 parole consolidate", s => Object.values(s.words).filter(w => w.box >= 3).length >= 50, "library"],
  ["words200", "Dizionario vivente", "200 parole consolidate", s => Object.values(s.words).filter(w => w.box >= 3).length >= 200, "library"],
  ["b1all", "B1 completato", "Tutte le lezioni B1", s => LESSONS.filter(l => l.level === "B1" && !String(l.id).startsWith("ai")).every(l => s.done[l.id]), "book"],
  ["b2all", "B2 completato", "Tutte le lezioni B2", s => LESSONS.filter(l => l.level === "B2" && !String(l.id).startsWith("ai")).every(l => s.done[l.id]), "book"],
  ["chat20", "Chiacchierona", "20 messaggi al tutor", s => s.tutorMsgs >= 20, "chat"],
  ["write5", "Penna fine", "5 testi valutati", s => s.writings >= 5, "pen"],
  ["dict10", "Orecchio assoluto", "10 dettati completati", s => s.dictations >= 10, "headphones"],
  ["exam1", "Prima simulazione", "Completa una simulazione", s => s.exams.length >= 1, "grad"],
  ["pass", "Bestanden", "Supera una simulazione", s => s.exams.some(e => e.pass), "medal"],
  ["passB2", "Pronta per il B2", "Supera una simulazione B2 completa", s => s.exams.some(e => e.pass && e.level === "B2" && Object.keys(e.mods || {}).length === 4), "trophy"]
];
function checkBadges() {
  BADGES.forEach(([id, name, , test]) => { if (!S.badges[id] && test(S)) { S.badges[id] = today(); save(); later(() => { toast("Traguardo sbloccato: " + name); confetti(); }, 900); } });
}
function rewards() {
  const L = levelOf(S.xp);
  view("Premi e traguardi", `
    <section class="hero"><div class="hero-grid"><div><small style="opacity:.8;font-weight:600;letter-spacing:.06em">LIVELLO ${L.lv}</small><h2>${LEVEL_NAMES[L.lv - 1]}</h2>
      <p>${S.xp} punti · ${L.next - S.xp} al livello ${L.lv + 1}</p><div class="progress" style="margin-top:14px;background:rgba(255,255,255,.25);max-width:420px"><i style="width:${L.pct}%;background:#fff"></i></div></div>
      <div class="kpis"><div class="kpi"><b>${Object.keys(S.badges).length}/${BADGES.length}</b><small>traguardi</small></div><div class="kpi"><b>${S.freezes}</b><small>scudi serie</small></div></div></div></section>
    <div class="card"><h3>Come guadagnare punti</h3><p class="muted" style="margin:0">Ogni esercizio dà punti. Raggiungi l'obiettivo giornaliero per ritirare il bonus di 25 punti. Ogni 7 giorni di fila ricevi uno <b>scudo serie</b> (massimo 3): se salti un giorno, la serie non si azzera. Salendo di livello sblocchi nuovi colori dell'app.</p></div>
    <div class="sec"><h3>Colori sbloccabili</h3></div>
    <div class="ach">${THEMES.map(t => { const ok = L.lv >= t.lvl; return `<button class="reward" ${ok ? `data-accent="${t.id}"` : "disabled"} style="cursor:${ok ? "pointer" : "default"};opacity:${ok ? 1 : .5};${S.accent === t.id ? "border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-soft)" : ""}"><span class="swatch" style="background:linear-gradient(135deg,${t.c},${t.c2})"></span><span class="t" style="text-align:left"><b>${t.name}</b><br><small class="muted">${ok ? (S.accent === t.id ? "In uso" : "Tocca per usarlo") : "Livello " + t.lvl}</small></span>${ok ? "" : ic("lock")}</button>`; }).join("")}</div>
    <div class="sec"><h3>Traguardi</h3></div>
    <div class="ach">${BADGES.map(([id, name, desc, , icon]) => `<div class="card ${S.badges[id] ? "" : "lock"}"><span class="chip" style="--c:${S.badges[id] ? "#ff9f0a" : "#86868b"}">${ic(icon)}</span><div><b>${name}</b><br><small class="muted">${desc}${S.badges[id] ? " · " + S.badges[id] : ""}</small></div></div>`).join("")}</div>`, { nav: "premi" });
  $app.querySelectorAll("[data-accent]").forEach(b => b.onclick = () => { S.accent = b.dataset.accent; save(); applyTheme(); rewards(); });
}

// ============================================================ IMPOSTAZIONI
function settings() {
  view("Impostazioni", `
    <div class="cols">
    <div class="card c6"><h3>Studio</h3>
      <label class="fl">Livello</label>${seg("lvl", ["B1", "B2"], S.level)}
      <label class="fl">Obiettivo giornaliero</label>${seg("goal", ["30", "50", "100", "150", "250"], String(S.goal))}
      <label class="fl">Aspetto</label>${seg("theme", ["auto", "light", "dark"], S.theme)}
      <p class="muted" style="margin:6px 0 0"><small>auto = segue il sistema</small></p></div>
    <div class="card c6"><h3>Voce tedesca</h3>
      <label class="fl">Voce</label><select class="answer" id="voice"><option value="">Automatica (migliore disponibile)</option>${deVoices.map(v => `<option ${v.name === S.voice ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select>
      <label class="fl">Velocità: <span id="rv">${S.rate}</span></label><input type="range" min="0.5" max="1.2" step="0.05" value="${S.rate}" id="rate" style="width:100%">
      <button class="btn ghost" data-say="Guten Tag, Bea. Wie geht es Ihnen heute?" style="margin-top:10px">${ic("volume")} Prova</button>
      <p class="muted"><small>${deVoices.length ? deVoices.length + " voci tedesche trovate." : "Nessuna voce tedesca: su Windows aggiungila da Impostazioni › Ora e lingua › Voce; su iPhone da Impostazioni › Accessibilità › Contenuto letto ad alta voce › Voci."} Le voci «Natural/Enhanced» suonano molto meglio. Microfono: ${SR ? "disponibile" : "non disponibile in questo browser"}.</small></p></div>
    <div class="card c12"><h3>Intelligenza artificiale (Google Gemini)</h3>
      <label class="fl">Chiave API</label><input class="answer" id="gkey" type="password" placeholder="AIza…" value="${esc(S.gkey)}" autocomplete="off">
      <div class="cols" style="margin-top:4px"><div class="c6"><label class="fl">Modello veloce (conversazione, esercizi)</label><input class="answer" id="gmodel" value="${esc(S.gmodel || MODEL_FAST)}"></div>
      <div class="c6"><label class="fl">Modello per le valutazioni</label><input class="answer" id="gmodelpro" value="${esc(S.gmodelPro || MODEL_PRO)}"></div></div>
      <div class="row" style="margin-top:12px"><button class="btn" id="test">Verifica chiave</button><a class="btn ghost" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Crea una chiave</a></div><div id="kfb"></div></div>
    <div class="card c6"><h3>Backup dei progressi</h3><p class="muted">I progressi sono salvati su questo dispositivo. Esportali per spostarli tra PC e iPhone o per sicurezza.</p>
      <div class="row"><button class="btn" id="exp">${ic("download")} Esporta</button><label class="btn ghost" style="cursor:pointer">${ic("upload")} Importa<input type="file" id="imp" accept="application/json" hidden></label></div></div>
    <div class="card c6"><h3>Uso offline e installazione</h3><p class="muted">Lezioni, vocabolario, esercizi, dettati e voce funzionano senza internet. Il tutor e le funzioni IA richiedono la connessione.</p>
      <p class="muted"><small><b>PC:</b> in Chrome/Edge clicca «Installa» nella barra degli indirizzi. <b>iPhone/iPad:</b> Safari › Condividi › «Aggiungi a Home». <b>Mac:</b> Safari › File › «Aggiungi al Dock».</small></p>
      <p class="tag" id="offst">${navigator.serviceWorker?.controller ? "Contenuti disponibili offline" : "Apri l'app online una volta per salvarla per l'uso offline"}</p></div>
    <div class="card c12"><h3>Zona pericolosa</h3><button class="btn danger" id="reset">Azzera tutti i progressi</button></div>
    </div>`, { nav: "impostazioni" });
  bindSeg("lvl", v => { S.level = v; save(); settings(); });
  bindSeg("goal", v => { S.goal = +v; save(); settings(); });
  bindSeg("theme", v => { S.theme = v; save(); applyTheme(); settings(); });
  $("voice").onchange = e => { S.voice = e.target.value; save(); speak("Diese Stimme ist ausgewählt."); };
  $("rate").oninput = e => { S.rate = +e.target.value; $("rv").textContent = S.rate; save(); };
  $("gkey").onchange = e => { S.gkey = e.target.value.trim(); save(); };
  $("gmodel").onchange = e => { S.gmodel = e.target.value.trim(); save(); };
  $("gmodelpro").onchange = e => { S.gmodelPro = e.target.value.trim(); save(); };
  $("test").onclick = async () => { $("kfb").innerHTML = `<div class="feedback info">Verifico…</div>`; try { await gemini("Antworte nur mit: OK", "Antworte knapp."); $("kfb").innerHTML = `<div class="feedback ok">Chiave e modello funzionano.</div>`; } catch (e) { $("kfb").innerHTML = `<div class="feedback bad">${esc(aiMsg(e))}</div>`; } };
  $("exp").onclick = () => { const o = { ...S, gkey: "" }; const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(o, null, 1)], { type: "application/json" })); a.download = `deutsch-bea-backup-${today()}.json`; a.click(); toast("Backup esportato (senza chiave API)."); };
  $("imp").onchange = async e => { try { const d = JSON.parse(await e.target.files[0].text()); if (typeof d.xp !== "number") throw 0; const k = S.gkey; S = Object.assign(structuredClone(DEFAULTS), d); if (!S.gkey) S.gkey = k; save(); applyTheme(); toast("Progressi importati."); settings(); } catch { toast("File non valido."); } };
  $("reset").onclick = () => { if (confirm("Vuoi davvero cancellare tutti i progressi? L'operazione non si può annullare.")) { const k = S.gkey; S = structuredClone(DEFAULTS); S.gkey = k; save(); applyTheme(); toast("Progressi azzerati."); home(); } };
}

// ============================================================ AVVIO
(S.aiLessons || []).forEach(l => { if (!LESSONS.find(x => x.id === l.id)) LESSONS.push(l); });
applyTheme(); renderChrome(); route();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  const hadSW = !!navigator.serviceWorker.controller; let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadSW && !reloaded) { reloaded = true; location.reload(); } });
  navigator.serviceWorker.register("sw.js").then(r => r.update()).catch(() => {});
}
window.addEventListener("online", () => toast("Di nuovo online: funzioni IA disponibili."));
window.addEventListener("offline", () => toast("Sei offline: l'app continua a funzionare, tranne l'IA."));
