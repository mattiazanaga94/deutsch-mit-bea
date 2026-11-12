// ===== Stato e salvataggio =====
const KEY = "deutsch-bea-v1";
let S = load();
function load() {
  try { return Object.assign({ xp: 0, streak: 0, last: null, done: {}, words: {}, rate: 0.9, level: "B2", goal: 50, day: null, dayXP: 0, custom: [], exams: [], errors: [] }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch { return { xp: 0, streak: 0, last: null, done: {}, words: {}, rate: 0.9 }; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} renderStats(); }
function today() { return new Date().toISOString().slice(0, 10); }
function addXP(n) {
  const t = today();
  if (S.last !== t) {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak = S.last === y ? S.streak + 1 : 1;
    S.last = t;
  }
  if (S.day !== t) { S.day = t; S.dayXP = 0; }
  S.xp += n; S.dayXP += n; save();
}
function markWord(de, ok) {
  const w = S.words[de] || { box: 0, seen: 0 };
  w.seen++; w.box = ok ? Math.min(w.box + 1, 5) : 0;
  S.words[de] = w; save();
}
function renderStats() {
  document.getElementById("streak").textContent = "🔥 " + S.streak;
  document.getElementById("xp").textContent = "⭐ " + S.xp;
}

// ===== Voce: text-to-speech =====
let deVoice = null;
function pickVoice() {
  const v = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith("de"));
  deVoice = v.find(x => /natural|online|google|anna|petra|katja/i.test(x.name)) || v[0] || null;
}
if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text, rate) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE"; u.rate = rate || S.rate; if (deVoice) u.voice = deVoice;
  speechSynthesis.speak(u);
}

// ===== Voce: riconoscimento vocale =====
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(onResult, onEnd) {
  if (!SR) { alert("Il riconoscimento vocale non è disponibile su questo browser. Usa Edge/Chrome su Windows o Safari su iPhone."); onEnd && onEnd(); return null; }
  const r = new SR();
  r.lang = "de-DE"; r.interimResults = false; r.maxAlternatives = 3;
  r.onresult = e => onResult([...e.results[0]].map(a => a.transcript));
  r.onerror = e => { if (e.error !== "no-speech" && e.error !== "aborted") alert("Microfono: " + e.error); };
  r.onend = () => onEnd && onEnd();
  r.start(); return r;
}
function norm(s) { return s.toLowerCase().replace(/ß/g, "ss").replace(/[.,!?;:¿¡"'«»–-]/g, "").replace(/\s+/g, " ").trim(); }
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function similarity(a, b) { a = norm(a); b = norm(b); const m = Math.max(a.length, b.length) || 1; return 1 - lev(a, b) / m; }

// ===== Utility =====
const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const allVocab = () => LESSONS.flatMap(l => l.vocab.map(([de, it]) => ({ de, it, lesson: l.id }))).concat((S.custom || []).map(w => ({ de: w.de, it: w.it, lesson: "mie" })));
const sayBtn = t => `<button class="say" data-say="${esc(t)}" aria-label="Ascolta">🔊</button>`;
function view(title, html, back = true) {
  document.getElementById("title").textContent = title;
  document.getElementById("back").hidden = !back;
  $app.innerHTML = html; window.scrollTo(0, 0);
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-say]"); if (b) speak(b.dataset.say);
  const g = e.target.closest("[data-go]"); if (g) go(g.dataset.go);
});
document.addEventListener("click", e => {
  if (e.target.id === "slow" && window._htext && location.hash.startsWith("#lab")) speak(window._htext, .7);
  if (e.target.id === "show") { const t = document.getElementById("txt"); if (t) t.hidden = false; }
});
document.getElementById("back").onclick = () => history.back();
window.addEventListener("hashchange", route);
function go(h) { location.hash = h; }

// ===== Router =====
function route() {
  const [p, arg] = location.hash.slice(1).split("/");
  speechSynthesis && speechSynthesis.cancel();
  ({ lezioni: lessonsList, lezione: () => lesson(arg), flash: () => flashcards(arg), quiz: () => quiz(arg),
     memory: () => memory(arg), dettato: () => dictation(arg), ascolto: listening, parla: () => speaking(arg),
     dialoghi: dialoguesList, tutor, lab: () => lab(arg), esame: () => exam(arg), dialogo: () => dialogue(arg), progressi: progress }[p] || home)();
}

// ===== Schermate =====
function home() {
  const [de, it] = pick(QUOTES);
  const t = today(), dx = S.day === t ? S.dayXP : 0, pct = Math.min(100, dx / S.goal * 100);
  view("Deutsch mit Bea", `
    <div class="card"><div class="row"><b style="flex:1">Obiettivo di oggi: ${dx}/${S.goal} XP ${pct >= 100 ? "🎯" : ""}</b>
    <select id="lvl" class="say"><option ${S.level === "B1" ? "selected" : ""}>B1</option><option ${S.level === "B2" ? "selected" : ""}>B2</option></select></div>
    <div class="progress"><i style="width:${pct}%"></i></div><small class="muted">${pct >= 100 ? "Obiettivo raggiunto, " + pick(PRAISE) : "Ogni esercizio ti avvicina all'obiettivo."}</small></div>
    <div class="card quote"><div class="row"><div style="flex:1"><div class="de">${esc(de)}</div><div class="it">${esc(it)}</div></div>${sayBtn(de)}</div></div>
    <div class="grid">
      ${tile("lezioni", "📘", "Lezioni", "Grammatica e teoria")}
      ${tile("flash", "🃏", "Vocabolario", "Flashcard con voce")}
      ${tile("quiz", "✅", "Test", "Quiz a scelta")}
      ${tile("memory", "🧩", "Gioco coppie", "Abbina le parole")}
      ${tile("ascolto", "🎧", "Ascolto", "Capisci senza leggere")}
      ${tile("dettato", "✍️", "Dettato", "Ascolta e scrivi")}
      ${tile("parla", "🎤", "Pronuncia", "Parla e vieni capita")}
      ${tile("tutor", "🧑‍🏫", "Tutor IA", "Conversa a voce con Frau Keller")}
      ${tile("lab", "🧪", "Allenamento IA", "Esercizi infiniti con Gemini")}
      ${tile("esame", "🎓", "Simulazione esame", "Goethe " + S.level + " completo")}
      ${tile("dialoghi", "💬", "Dialoghi guidati", "Situazioni formali")}
      ${tile("progressi", "🏆", "Progressi", "XP, serie, parole")}
    </div>`, false);
  document.getElementById("lvl").onchange = e => { S.level = e.target.value; save(); home(); };
}
const tile = (h, e, t, s) => `<button class="tile" data-go="${h}"><span class="e">${e}</span><b>${t}</b><small>${s}</small></button>`;

function lessonsList() {
  const mine = (S.custom || []).length ? `<button class="tile" data-go="lezione/mie"><span><b>⭐ Le mie parole</b><small>${S.custom.length} parole salvate</small></span></button>` : "";
  view("Lezioni " + S.level, mine + `<p class="muted">Livello attivo: ${S.level} (cambialo dalla home).</p><div class="list">${LESSONS.filter(l => l.level === S.level).map(l => `
    <button class="tile" data-go="lezione/${l.id}"><span><b>${esc(l.title)}</b><small>${l.vocab.length} parole</small></span>
    <span>${S.done[l.id] ? "✅" : `<span class="badge">${l.level}</span>`}</span></button>`).join("")}</div>`);
}

function lesson(id) {
  const l = id === "mie" ? { id: "mie", level: S.level, title: "Le mie parole", theory: "Parole salvate dall'Allenamento IA.", vocab: (S.custom || []).map(w => [w.de, w.it]) } : LESSONS.find(x => x.id === id); if (!l) return home();
  view(l.title, `
    <div class="card"><span class="badge">${l.level}</span><p>${l.theory}</p></div>
    <div class="card"><h3>Vocabolario</h3>${l.vocab.map(([de, it]) => `
      <div class="vocab"><div><b>${esc(de)}</b><br><span class="muted">${esc(it)}</span></div>${sayBtn(de)}</div>`).join("")}</div>
    <div class="card"><h3>Esercitati</h3><div class="row">
      <button class="btn" data-go="flash/${id}">🃏 Flashcard</button>
      <button class="btn" data-go="quiz/${id}">✅ Test</button>
      <button class="btn" data-go="memory/${id}">🧩 Coppie</button>
      <button class="btn" data-go="dettato/${id}">✍️ Dettato</button>
      <button class="btn" data-go="parla/${id}">🎤 Pronuncia</button>
    </div></div>`);
}

function vocabFor(id) { if (id === "mie") return (S.custom || []).slice(); const l = LESSONS.find(x => x.id === id); return l ? l.vocab.map(([de, it]) => ({ de, it })) : allVocab().filter(w => w.lesson === "mie" || (LESSONS.find(x => x.id === w.lesson) || {}).level === S.level); }

function flashcards(id) {
  // ripasso: prima le parole con box più basso
  const words = vocabFor(id).sort((a, b) => ((S.words[a.de] || {}).box || 0) - ((S.words[b.de] || {}).box || 0));
  let i = 0, flipped = false;
  const draw = () => {
    if (i >= words.length) { addXP(10); return done("Mazzo completato!", "+10 XP"); }
    const w = words[i];
    view("Vocabolario", `
      <div class="progress"><i style="width:${i / words.length * 100}%"></i></div>
      <div class="card flash" id="fc">${flipped ? `${esc(w.it)}<small>${esc(w.de)}</small>` : `${esc(w.de)}<small>tocca per girare</small>`}</div>
      <div class="row"><button class="btn ghost" data-say="${esc(w.de)}">🔊 Ascolta</button>
      ${flipped ? `<button class="btn ghost" id="no">😕 Da ripassare</button><button class="btn" id="yes">😊 La so</button>` : ""}</div>`);
    if (!flipped) speak(w.de);
    document.getElementById("fc").onclick = () => { flipped = !flipped; draw(); };
    if (flipped) {
      document.getElementById("yes").onclick = () => { markWord(w.de, true); i++; flipped = false; draw(); };
      document.getElementById("no").onclick = () => { markWord(w.de, false); words.push(w); i++; flipped = false; draw(); };
    }
  };
  draw();
}

function quiz(id) {
  const pool = vocabFor(id), all = allVocab();
  const qs = shuffle(pool).slice(0, 8);
  let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); if (id) { S.done[id] = true; save(); } return done(`${score}/${qs.length} corrette`, `+${score * 3} XP`); }
    const q = qs[i], dir = Math.random() < .5;
    const wrong = shuffle(all.filter(w => w.de !== q.de)).slice(0, 3);
    const opts = shuffle([q, ...wrong]);
    view("Test", `
      <div class="progress"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="card"><p class="muted">${dir ? "Come si dice in italiano?" : "Come si dice in tedesco?"}</p>
      <h2>${esc(dir ? q.de : q.it)} ${dir ? sayBtn(q.de) : ""}</h2>
      ${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(dir ? o.it : o.de)}</button>`).join("")}
      <div id="fb" class="feedback"></div></div>`);
    if (dir) speak(q.de);
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const ok = opts[b.dataset.k] === q; markWord(q.de, ok);
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (opts[x.dataset.k] === q) x.classList.add("ok"); });
      if (!ok) b.classList.add("bad"); else score++;
      const fb = document.getElementById("fb");
      fb.className = "feedback " + (ok ? "ok" : "bad"); fb.textContent = ok ? pick(PRAISE) : "Quasi! Risposta: " + q.de;
      speak(q.de); setTimeout(() => { i++; draw(); }, 1600);
    });
  };
  draw();
}

function memory(id) {
  const words = shuffle(vocabFor(id)).slice(0, 6);
  const left = shuffle(words), right = shuffle(words);
  let sel = null, found = 0, errors = 0;
  view("Gioco coppie", `<p class="muted">Abbina ogni parola tedesca alla sua traduzione.</p>
    <div class="pairs">${left.map((w, k) => `<button class="opt" data-side="de" data-w="${esc(w.de)}">${esc(w.de)}</button>
      <button class="opt" data-side="it" data-w="${esc(right[k].de)}">${esc(right[k].it)}</button>`).join("")}</div><div id="fb" class="feedback"></div>`);
  $app.querySelectorAll(".pairs .opt").forEach(b => b.onclick = () => {
    if (b.dataset.side === "de") speak(b.dataset.w);
    if (!sel || sel.dataset.side === b.dataset.side) { sel && sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
    if (sel.dataset.w === b.dataset.w) {
      sel.classList.add("done"); b.classList.add("done"); found++; markWord(b.dataset.w, true);
      if (found === words.length) { const xp = Math.max(5, 15 - errors * 2); addXP(xp); setTimeout(() => done(errors ? `Fatto con ${errors} errori` : "Perfetto, nessun errore!", `+${xp} XP`), 500); }
    } else { errors++; b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 500); }
    sel.classList.remove("sel"); sel = null;
  });
}

function dictation(id) {
  const qs = shuffle(vocabFor(id)).slice(0, 6); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 4); return done(`${score}/${qs.length} scritte bene`, `+${score * 4} XP`); }
    const q = qs[i];
    view("Dettato", `<div class="progress"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="card"><p class="muted">Ascolta e scrivi in tedesco.</p>
      <div class="row"><button class="btn big" data-say="${esc(q.de)}">🔊 Ascolta</button>
      <button class="btn ghost" id="slow">🐢 Lento</button></div><br>
      <input class="answer" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Scrivi qui…">
      <br><br><button class="btn" id="chk">Controlla</button><div id="fb" class="feedback"></div></div>`);
    speak(q.de);
    document.getElementById("slow").onclick = () => speak(q.de, .6);
    const chk = () => {
      const s = similarity(document.getElementById("ans").value, q.de), ok = s >= .9;
      if (ok) score++; markWord(q.de, ok);
      const fb = document.getElementById("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.innerHTML = ok ? pick(PRAISE) : `Corretto: <b>${esc(q.de)}</b> (${esc(q.it)})`;
      setTimeout(() => { i++; draw(); }, ok ? 1200 : 2800);
    };
    document.getElementById("chk").onclick = chk;
    document.getElementById("ans").onkeydown = e => e.key === "Enter" && chk();
  };
  draw();
}

function listening() {
  const qs = shuffle(LISTENING); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 4); return done(`${score}/${qs.length} capite`, `+${score * 4} XP`); }
    const q = qs[i];
    view("Ascolto", `<div class="progress"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="card"><p class="muted">Ascolta la frase (senza leggerla!) e scegli il significato.</p>
      <div class="row"><button class="btn big" data-say="${esc(q.de)}">🔊 Ascolta</button><button class="btn ghost" id="slow">🐢 Lento</button></div>
      ${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}<div id="fb" class="feedback"></div></div>`);
    speak(q.de);
    document.getElementById("slow").onclick = () => speak(q.de, .6);
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const ok = +b.dataset.k === q.a; if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("ok"); });
      if (!ok) b.classList.add("bad");
      const fb = document.getElementById("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.innerHTML = (ok ? pick(PRAISE) : "Ascolta di nuovo:") + ` <br><b>${esc(q.de)}</b>`;
      setTimeout(() => { i++; draw(); }, 2600);
    });
  };
  draw();
}

function speaking(id) {
  const qs = shuffle(vocabFor(id)).slice(0, 6); let i = 0, score = 0, rec = null;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 5); return done(`${score}/${qs.length} pronunciate bene`, `+${score * 5} XP`); }
    const q = qs[i];
    view("Pronuncia", `<div class="progress"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="card"><p class="muted">Ascolta, poi premi il microfono e ripeti.</p>
      <h2>${esc(q.de)}</h2><p class="muted">${esc(q.it)}</p>
      <div class="row"><button class="btn ghost" data-say="${esc(q.de)}">🔊 Ascolta</button>
      <button class="btn big mic" id="mic">🎤 Parla</button><button class="btn ghost" id="skip">Salta</button></div>
      <div id="fb" class="feedback"></div></div>`);
    speak(q.de);
    document.getElementById("skip").onclick = () => { i++; draw(); };
    document.getElementById("mic").onclick = () => {
      const m = document.getElementById("mic"); m.classList.add("on"); m.textContent = "… ascolto";
      speechSynthesis.cancel();
      rec = listen(alts => {
        const best = Math.max(...alts.map(a => similarity(a, q.de)));
        const ok = best >= .75; if (ok) score++; markWord(q.de, ok);
        const fb = document.getElementById("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
        fb.innerHTML = `Ho capito: “${esc(alts[0])}” · ${Math.round(best * 100)}%<br>` + (ok ? pick(PRAISE) : "Riprova, ascolta bene la pronuncia.");
        if (ok) setTimeout(() => { i++; draw(); }, 1800);
      }, () => { const m = document.getElementById("mic"); if (m) { m.classList.remove("on"); m.textContent = "🎤 Parla"; } });
    };
  };
  draw();
}

function dialoguesList() {
  view("Conversazione", `<p class="muted">Dialoghi in registro formale (Sie). Rispondi a voce o scegli una risposta.</p>
    <div class="list">${DIALOGUES.map(d => `<button class="tile" data-go="dialogo/${d.id}"><b>${esc(d.title)}</b><span>${S.done[d.id] ? "✅" : "💬"}</span></button>`).join("")}</div>`);
}

function dialogue(id) {
  const d = DIALOGUES.find(x => x.id === id); if (!d) return dialoguesList();
  let t = 0; const log = [];
  const draw = () => {
    const turn = d.turns[t];
    const bubbles = log.map(b => `<div class="bubble ${b.who}">${esc(b.de)}${b.it ? `<small>${esc(b.it)}</small>` : ""}</div>`).join("");
    if (!turn) { S.done[id] = true; addXP(20); view(d.title, bubbles + `<div class="card"><h2>🎉 ${pick(PRAISE)}</h2><p>Conversazione completata. +20 XP</p><button class="btn" data-go="dialoghi">Altri dialoghi</button></div>`); return; }
    view(d.title, bubbles + `<div class="bubble t">${esc(turn.tutor)} ${sayBtn(turn.tutor)}<small>${esc(turn.it)}</small></div>
      <div class="card"><p class="muted">Rispondi:</p>
      <button class="btn big mic" id="mic">🎤 Rispondi a voce</button>
      ${turn.answers.map((a, k) => `<button class="opt" data-k="${k}">${esc(a)} </button>`).join("")}
      <div id="fb" class="feedback"></div></div>`);
    speak(turn.tutor);
    const accept = text => { log.push({ who: "t", de: turn.tutor, it: turn.it }, { who: "u", de: text }); t++; addXP(3); draw(); };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => { speak(turn.answers[b.dataset.k]); setTimeout(() => accept(turn.answers[b.dataset.k]), 300); });
    document.getElementById("mic").onclick = () => {
      const m = document.getElementById("mic"); m.classList.add("on"); m.textContent = "… ascolto"; speechSynthesis.cancel();
      listen(alts => {
        let best = 0, match = null;
        alts.forEach(a => turn.answers.forEach(ans => { const s = similarity(a, ans); if (s > best) { best = s; match = ans; } }));
        const fb = document.getElementById("fb");
        if (best >= .6) { fb.className = "feedback ok"; fb.textContent = pick(PRAISE); setTimeout(() => accept(alts[0]), 900); }
        else { fb.className = "feedback bad"; fb.innerHTML = `Ho capito: “${esc(alts[0])}”. Prova con una delle frasi qui sotto.`; }
      }, () => { const m = document.getElementById("mic"); if (m) { m.classList.remove("on"); m.textContent = "🎤 Rispondi a voce"; } });
    };
  };
  draw();
}

function progress() {
  const all = allVocab(), known = all.filter(w => (S.words[w.de] || {}).box >= 3).length;
  const lessonsDone = LESSONS.filter(l => S.done[l.id]).length;
  view("Progressi", `
    <div class="card"><h2>⭐ ${S.xp} XP · 🔥 ${S.streak} giorni di fila</h2>
    <p>Livello: <b>${S.xp < 300 ? "B2 in Arbeit" : S.xp < 1000 ? "B2 sicher" : S.xp < 2500 ? "Auf dem Weg zu C1" : "Sprachmeisterin"}</b></p></div>
    <div class="card"><b>Parole imparate:</b> ${known}/${all.length}<div class="progress"><i style="width:${known / all.length * 100}%"></i></div>
    <b>Lezioni completate:</b> ${lessonsDone}/${LESSONS.length}<div class="progress"><i style="width:${lessonsDone / LESSONS.length * 100}%"></i></div></div>
    <div class="card"><b>Velocità della voce</b><br><input type="range" min="0.5" max="1.2" step="0.1" value="${S.rate}" id="rate" style="width:100%">
    <button class="btn ghost" data-say="Hallo Bea, wie geht es dir heute?">🔊 Prova voce</button>
    <div class="card"><b>Tutor IA (Gemini)</b><br><input class="answer" id="gkey" placeholder="Chiave API" value="${esc(S.gkey || "")}"><br><br>
    <input class="answer" id="gmodel" placeholder="Modello" value="${esc(S.gmodel || MODEL_FAST)}"><br><br>
    <input class="answer" id="gmodelpro" placeholder="Modello per le valutazioni" value="${esc(S.gmodelPro || MODEL_PRO)}"><p class="muted">Cambia i modelli solo se Google ne ritira uno (elenco su aistudio.google.com).</p></div>
    <div class="card"><b>Obiettivo giornaliero</b> <select id="goal" class="say">${[30, 50, 100, 150, 250].map(g => `<option ${g === S.goal ? "selected" : ""}>${g}</option>`).join("")}</select> XP</div>
    ${S.errors.length ? `<div class="card"><h3>Ultimi errori corretti</h3>${S.errors.slice(0, 8).map(e => `<div class="vocab"><div><s>${esc(e.you)}</s><br><span class="muted">${md(e.fix)}</span></div></div>`).join("")}<button class="btn ghost" data-go="lab/fehler">🔁 Esercitati sui tuoi errori</button></div>` : ""}
    <p class="muted">Voce: ${deVoice ? esc(deVoice.name) : "nessuna voce tedesca trovata (installala dalle impostazioni di sistema)"} · Microfono: ${SR ? "disponibile ✅" : "non disponibile ❌"}</p></div>`);
  document.getElementById("rate").oninput = e => { S.rate = +e.target.value; save(); };
  document.getElementById("goal").onchange = e => { S.goal = +e.target.value; save(); };
  document.getElementById("gkey").onchange = e => { S.gkey = e.target.value.trim(); save(); };
  document.getElementById("gmodel").onchange = e => { S.gmodel = e.target.value.trim(); save(); };
  document.getElementById("gmodelpro").onchange = e => { S.gmodelPro = e.target.value.trim(); save(); };
}

function done(msg, xp) {
  view("Bravissima!", `<div class="card" style="text-align:center"><h1>🎉</h1><h2>${pick(PRAISE)}</h2><p>${esc(msg)}</p><p><span class="badge">${esc(xp)}</span></p>
    <p class="muted">${esc(pick(QUOTES)[1])}</p><button class="btn" data-go="">Torna alla home</button></div>`);
  speak(pick(PRAISE));
}

renderStats(); route();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});

// ===== Tutor IA (Google Gemini, piano gratuito) =====
const MODES = {
  frei: { label: "Conversazione libera", start: "Guten Tag! Worüber möchten Sie heute sprechen?",
    sys: "Führe ein natürliches Gespräch auf Deutsch, Niveau B2. Stelle Rückfragen und bringe neue Themen ein (Arbeit, Gesellschaft, Umwelt, Kultur, Medien)." },
  praes: { label: "Esame: Präsentation (Teil 1)", start: "Willkommen zur mündlichen Prüfung. Bitte wählen Sie ein Thema für Ihre Präsentation: Homeoffice, soziale Medien oder Nachhaltigkeit im Alltag.",
    sys: "Du bist Prüferin der Goethe-Prüfung B2, Sprechen Teil 1. Lass die Kandidatin präsentieren, stelle danach eine Frage dazu und gib am Ende eine Bewertung nach den Goethe-Kriterien (Aufgabenerfüllung, Kohärenz, Wortschatz, Strukturen, Aussprache) mit Punkten von 0 bis 4." },
  disk: { label: "Esame: Diskussion (Teil 2)", start: "Wir diskutieren heute die Frage: Sollte das Auto aus den Innenstädten verbannt werden? Was ist Ihre Meinung?",
    sys: "Du bist Gesprächspartnerin in der Goethe-Prüfung B2, Sprechen Teil 2. Vertritt oft eine Gegenposition, bringe Argumente und versucht am Ende, gemeinsam einen Kompromiss zu finden." },
  brief: { label: "Correggi un testo scritto", start: "Bitte schicken Sie mir Ihren Text (zum Beispiel eine formelle E-Mail oder einen Forumsbeitrag). Ich korrigiere ihn ausführlich.",
    sys: "Korrigiere geschriebene Texte auf Niveau B2: gib eine verbesserte Version, liste die wichtigsten Fehler mit Erklärung auf und bewerte nach Goethe-B2-Kriterien Schreiben." }
};
const TUTOR_SYS = `Du bist Frau Dr. Keller, eine erfahrene, warmherzige und motivierende Deutschlehrerin. Deine Schülerin heißt Bea, ist 25 Jahre alt, Italienerin und bereitet sich auf die Goethe-Zertifikate B1 und B2 vor.
Regeln:
- Sprich mit Bea auf Deutsch, im formellen Register (Sie), auf dem aktuellen Niveau (siehe unten), mit natürlicher Sprache.
- Halte deine Antworten kurz (2–5 Sätze), damit ein echtes Gespräch entsteht. Ende meistens mit einer Frage.
- Wenn Bea Fehler macht, antworte zuerst inhaltlich. Dann füge eine neue Zeile hinzu, die mit "✏️" beginnt, und erkläre die Korrekturen KURZ auf Italienisch (korrekte Form fett mit **).
- Ihre Eingaben stammen oft aus Spracherkennung: ignoriere fehlende Satzzeichen und Großschreibung.
- Sei ermutigend und lobe konkrete Fortschritte.`;

let chat = [], mode = "frei", busy = false;
function tutor() {
  if (!S.gkey) {
    view("Tutor IA", `<div class="card"><h3>Attiva il tutor gratuito</h3>
      <p>1. Apri <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a> e accedi con un account Google.<br>
      2. Premi <b>Create API key</b> e copia la chiave.<br>3. Incollala qui sotto. Resta salvata solo su questo dispositivo.</p>
      <input class="answer" id="key" placeholder="Chiave API (AIza…)" autocomplete="off"><br><br>
      <button class="btn" id="savekey">Salva e inizia</button>
      <p class="muted">Piano gratuito: nessun costo, con limiti giornalieri. Google può usare le conversazioni per migliorare i suoi modelli.</p></div>`);
    document.getElementById("savekey").onclick = () => { const k = document.getElementById("key").value.trim(); if (k) { S.gkey = k; save(); tutor(); } };
    return;
  }
  if (!chat.length) chat = [{ role: "model", text: MODES[mode].start }];
  drawChat(true);
}
function drawChat(speakLast) {
  const html = chat.map(m => {
    const [de, fix] = m.text.split("✏️");
    return `<div class="bubble ${m.role === "user" ? "u" : "t"}">${md(de)}${m.role === "model" ? " " + sayBtn(de.replace(/\*\*/g, "")) : ""}${fix ? `<small>✏️ ${md(fix)}</small>` : ""}</div>`;
  }).join("");
  view("Tutor IA", `
    <div class="row"><select id="mode" class="answer" style="flex:1">${Object.entries(MODES).map(([k, v]) => `<option value="${k}" ${k === mode ? "selected" : ""}>${v.label}</option>`).join("")}</select>
    <button class="btn ghost" id="reset">↺ Nuova</button></div>
    <div id="log">${html}${busy ? `<div class="bubble t muted">…</div>` : ""}</div>
    <div class="card"><textarea class="answer" id="msg" rows="${mode === "brief" ? 6 : 2}" placeholder="Scrivi in tedesco, oppure usa il microfono"></textarea>
    <div class="row" style="margin-top:10px"><button class="btn big mic" id="mic">🎤 Parla</button><button class="btn" id="send">Invia</button></div>
    <div id="fb" class="feedback"></div></div>`);
  document.getElementById("mode").onchange = e => { mode = e.target.value; chat = []; tutor(); };
  document.getElementById("reset").onclick = () => { chat = []; tutor(); };
  const send = () => { const t = document.getElementById("msg").value.trim(); if (t && !busy) ask(t); };
  document.getElementById("send").onclick = send;
  document.getElementById("msg").onkeydown = e => { if (e.key === "Enter" && !e.shiftKey && mode !== "brief") { e.preventDefault(); send(); } };
  document.getElementById("mic").onclick = () => {
    const m = document.getElementById("mic"); m.classList.add("on"); m.textContent = "… ascolto"; speechSynthesis.cancel();
    listen(alts => ask(alts[0]), () => { const m = document.getElementById("mic"); if (m) { m.classList.remove("on"); m.textContent = "🎤 Parla"; } });
  };
  const last = chat[chat.length - 1];
  if (speakLast && last && last.role === "model") speak(last.text.split("✏️")[0].replace(/\*\*/g, ""));
  window.scrollTo(0, document.body.scrollHeight);
}
const md = s => esc(s.trim()).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
async function ask(text) {
  chat.push({ role: "user", text }); busy = true; drawChat(false);
  try {
    const out = await gemini(chat, TUTOR_SYS + "\nAktuelles Niveau: " + S.level + "\nModus: " + MODES[mode].sys.replace(/B2/g, S.level));
    chat.push({ role: "model", text: out }); addXP(5);
    const fix = out.split("✏️")[1]; if (fix) { S.errors.unshift({ d: today(), you: text, fix: fix.trim() }); S.errors = S.errors.slice(0, 200); save(); }
  } catch (e) {
    chat.pop(); busy = false; drawChat(false);
    document.getElementById("fb").className = "feedback bad";
    document.getElementById("fb").textContent = "Errore del tutor: " + e.message + (/key|API_KEY|permission/i.test(e.message) ? " – controlla la chiave in Progressi." : "");
    document.getElementById("msg").value = text; return;
  }
  busy = false; drawChat(true);
}

// ===== Gemini: funzione comune =====
// Piano gratuito (nov 2026): flash-lite ~500 richieste/giorno, 3.8-flash ~20/giorno → il "pro" solo per le valutazioni, con ripiego automatico.
const MODEL_FAST = "gemini-3.5-flash-lite", MODEL_PRO = "gemini-3.8-flash";
async function gemini(msgs, sys, json, pro) {
  if (!S.gkey) throw new Error("manca la chiave API (vai su Tutor IA o Progressi)");
  if (pro) { try { return await geminiCall(S.gmodelPro || MODEL_PRO, msgs, sys, json); } catch (e) { if (!/429|quota|exhausted|404|not found/i.test(e.message)) throw e; } }
  return geminiCall(S.gmodel || MODEL_FAST, msgs, sys, json);
}
async function geminiCall(model, msgs, sys, json) {
  const contents = typeof msgs === "string" ? [{ role: "user", parts: [{ text: msgs }] }] : msgs.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
  const body = { contents, systemInstruction: { parts: [{ text: sys }] } };
  if (json) body.generationConfig = { responseMimeType: "application/json" };
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": S.gkey }, body: JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((d.error ? d.error.message : "") + " (HTTP " + r.status + ")");
  const out = (d.candidates?.[0]?.content?.parts || []).map(p => p.text).join("");
  if (!json) return out;
  return JSON.parse(out.replace(/^```json|```$/g, "").trim());
}
const GEN_SYS = "Du bist Autorin offizieller Prüfungsmaterialien des Goethe-Instituts. Erstelle authentische, fehlerfreie Übungen. Erklärungen für die Lernende auf Italienisch. Antworte ausschließlich mit gültigem JSON.";
function loading(title, msg) { view(title, `<div class="card" style="text-align:center"><h2>⏳</h2><p>${esc(msg)}</p><p class="muted">Gemini sta preparando l'esercizio…</p></div>`); }
function aiError(title, e, retry) {
  view(title, `<div class="card"><p class="feedback bad">Errore: ${esc(e.message)}</p>
    <div class="row"><button class="btn" id="retry">Riprova</button><button class="btn ghost" data-go="${S.gkey ? "lab" : "tutor"}">${S.gkey ? "Indietro" : "Imposta la chiave"}</button></div></div>`);
  document.getElementById("retry").onclick = retry;
}
const opts = (arr, sel) => arr.map(x => `<option ${x === sel ? "selected" : ""}>${esc(x)}</option>`).join("");

// Esecutore generico di domande a scelta multipla. items: [{q, options[], a, expl}]
function runMC(title, intro, items, perXP, onDone) {
  let i = 0, score = 0;
  const draw = () => {
    if (i >= items.length) { addXP(score * perXP); return onDone ? onDone(score, items.length) : done(`${score}/${items.length} corrette`, `+${score * perXP} XP`); }
    const q = items[i];
    view(title, `${intro || ""}<div class="progress"><i style="width:${i / items.length * 100}%"></i></div>
      <div class="card"><p><b>${i + 1}. ${esc(q.q)}</b></p>${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}
      <div id="fb" class="feedback"></div><button class="btn" id="next" hidden>Avanti →</button></div>`);
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const ok = +b.dataset.k === +q.a; if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === +q.a) x.classList.add("ok"); });
      if (!ok) b.classList.add("bad");
      const fb = document.getElementById("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.innerHTML = (ok ? pick(PRAISE) : "Non proprio.") + (q.expl ? `<br><span class="muted" style="font-weight:400">${esc(q.expl)}</span>` : "");
      const n = document.getElementById("next"); n.hidden = false; n.onclick = () => { i++; draw(); };
    });
  };
  draw();
}

// ===== Allenamento IA =====
function lab(kind) {
  const L = S.level;
  if (!kind) return view("Allenamento IA " + L, `<p class="muted">Esercizi nuovi ogni volta, generati da Gemini al livello ${L}.</p><div class="grid">
    ${tile("lab/lesen", "📰", "Lesen", "Testo + domande")}
    ${tile("lab/hoeren", "🎧", "Hören", "Ascolto + domande")}
    ${tile("lab/grammatik", "🧩", "Grammatica", "Esercizi mirati")}
    ${tile("lab/schreiben", "✍️", "Schreiben", "Scrivi e ricevi il voto")}
    ${tile("lab/wortschatz", "📚", "Vocabolario per tema", "Nuove parole nel tuo mazzo")}
    ${tile("lab/fehler", "🔁", "Ripasso errori", "Esercizi sui tuoi errori")}</div>`);
  const pickTopic = (title, list, label, go) => {
    view(title, `<div class="card"><p>${label}</p><select class="answer" id="sel">${opts(list, pick(list))}</select><br><br>
      <button class="btn" id="go">Genera esercizio</button></div>`);
    document.getElementById("go").onclick = () => go(document.getElementById("sel").value);
  };
  if (kind === "lesen" || kind === "hoeren") {
    const H = kind === "hoeren", T = H ? "Hören" : "Lesen";
    return pickTopic(T, TOPICS, "Scegli un tema:", async function gen(topic) {
      loading(T, topic);
      try {
        const d = await gemini(`Erstelle eine ${H ? "Hörverstehens" : "Leseverstehens"}aufgabe auf Niveau ${L} zum Thema "${topic}".
${H ? "Text: ein natürlicher Radiobeitrag oder Dialog (180–250 Wörter), der vorgelesen wird." : "Text: ein Zeitungsartikel oder Forumsbeitrag (250–350 Wörter)."}
JSON: {"title": "...", "text": "...", "questions": [{"q": "Frage auf Deutsch", "options": ["...","...","..."], "a": Index der richtigen Option, "expl": "Begründung auf Italienisch"}]} mit 6 Fragen.`, GEN_SYS, true);
        const intro = H ? `<div class="card"><b>${esc(d.title)}</b><div class="row" style="margin-top:8px"><button class="btn" data-say="${esc(d.text)}">🔊 Ascolta</button>
          <button class="btn ghost" id="slow">🐢 Lento</button><button class="btn ghost" id="show">Mostra testo</button></div><p id="txt" hidden>${esc(d.text)}</p></div>`
          : `<div class="card"><h3>${esc(d.title)}</h3><p>${esc(d.text).replace(/\n/g, "<br>")}</p></div>`;
        runMC(T, intro, d.questions, 4);
        if (H) speak(d.text);
        window._htext = d.text;
      } catch (e) { aiError(T, e, () => gen(topic)); }
    });
  }
  if (kind === "grammatik") return pickTopic("Grammatica", GRAMMAR, "Scegli l'argomento:", async function gen(g) {
    loading("Grammatica", g);
    try {
      const d = await gemini(`Erstelle 8 Multiple-Choice-Lückensätze zum Grammatikthema "${g}" auf Niveau ${L}. Die Lücke als "___".
JSON: {"items": [{"q": "Satz mit ___", "options": ["...","...","...","..."], "a": Index, "expl": "kurze Regel auf Italienisch"}]}`, GEN_SYS, true);
      runMC("Grammatica: " + g, "", d.items, 3);
    } catch (e) { aiError("Grammatica", e, () => gen(g)); }
  });
  if (kind === "wortschatz") return pickTopic("Vocabolario", TOPICS, "Scegli un tema:", async function gen(topic) {
    loading("Vocabolario", topic);
    try {
      const d = await gemini(`Erstelle 12 wichtige Wörter/Ausdrücke zum Thema "${topic}" auf Niveau ${L} (Nomen mit Artikel, Verben mit Präposition, feste Wendungen).
JSON: {"words": [{"de": "...", "it": "Übersetzung auf Italienisch", "ex": "Beispielsatz auf Deutsch"}]}`, GEN_SYS, true);
      view("Vocabolario: " + topic, `<div class="card">${d.words.map(w => `<div class="vocab"><div><b>${esc(w.de)}</b> – ${esc(w.it)}<br><span class="muted">${esc(w.ex)}</span></div>${sayBtn(w.de + ". " + w.ex)}</div>`).join("")}</div>
        <div class="row"><button class="btn" id="add">⭐ Aggiungi al mio mazzo</button><button class="btn ghost" id="again">Altre parole</button></div>`);
      document.getElementById("add").onclick = () => {
        const have = new Set(S.custom.map(w => w.de)); d.words.forEach(w => !have.has(w.de) && S.custom.push({ de: w.de, it: w.it })); addXP(5); go("flash/mie");
      };
      document.getElementById("again").onclick = () => gen(topic);
    } catch (e) { aiError("Vocabolario", e, () => gen(topic)); }
  });
  if (kind === "schreiben") return writingTask(L, null);
  if (kind === "fehler") {
    if (!S.errors.length) return view("Ripasso errori", `<div class="card"><p>Ancora nessun errore registrato. Parla con il Tutor IA: le sue correzioni finiscono qui.</p><button class="btn" data-go="tutor">Vai al tutor</button></div>`);
    return (async function gen() {
      loading("Ripasso errori", "Analizzo i tuoi errori recenti");
      try {
        const list = S.errors.slice(0, 15).map(e => `- Bea schrieb: "${e.you}" → Korrektur: ${e.fix}`).join("\n");
        const d = await gemini(`Hier sind Beas letzte Fehler:\n${list}\nErstelle 8 Multiple-Choice-Übungen, die genau diese Fehlertypen trainieren (Niveau ${L}).
JSON: {"summary": "kurze Analyse ihrer typischen Fehler auf Italienisch", "items": [{"q": "...", "options": ["...","...","..."], "a": Index, "expl": "Erklärung auf Italienisch"}]}`, GEN_SYS, true);
        runMC("Ripasso errori", `<div class="card quote"><b>Analisi:</b> ${esc(d.summary)}</div>`, d.items, 4);
      } catch (e) { aiError("Ripasso errori", e, gen); }
    })();
  }
}

async function writingTask(L, onDone) {
  loading("Schreiben", "Preparo un compito di scrittura");
  let task;
  try {
    task = await gemini(`Erstelle eine Schreibaufgabe im Stil des Goethe-Zertifikats ${L} (${L === "B2" ? "formelle E-Mail oder Forumsbeitrag mit Meinung" : "E-Mail an eine Person oder Institution"}).
JSON: {"title": "...", "situation": "Situation auf Deutsch", "points": ["Inhaltspunkt 1", "...", "..."], "words": Mindestwortzahl}`, GEN_SYS, true);
  } catch (e) { return aiError("Schreiben", e, () => writingTask(L, onDone)); }
  view("Schreiben", `<div class="card"><h3>${esc(task.title)}</h3><p>${esc(task.situation)}</p><ul>${task.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
    <p class="muted">Almeno ${task.words} parole.</p><textarea class="answer" id="txt" rows="12" placeholder="Scrivi qui il tuo testo…"></textarea>
    <p class="muted" id="wc">0 parole</p><button class="btn" id="eval">Valuta il mio testo</button></div><div id="res"></div>`);
  const ta = document.getElementById("txt");
  ta.oninput = () => document.getElementById("wc").textContent = ta.value.trim().split(/\s+/).filter(Boolean).length + " parole";
  document.getElementById("eval").onclick = async () => {
    const res = document.getElementById("res"); res.innerHTML = `<div class="card">⏳ Valutazione in corso…</div>`;
    try {
      const r = await gemini(`Aufgabe: ${JSON.stringify(task)}\nText der Kandidatin:\n"""${ta.value}"""\nBewerte streng nach den offiziellen Kriterien Goethe ${L} Schreiben.
JSON: {"punkte": {"Aufgabenerfüllung": 0-5, "Kohärenz": 0-5, "Wortschatz": 0-5, "Strukturen": 0-5}, "gesamt_prozent": 0-100, "lob": "Was gut war (Italienisch)", "fehler": [{"original": "...", "korrektur": "...", "erklaerung": "Italienisch"}], "verbessert": "verbesserte Version des ganzen Textes"}`, GEN_SYS, true, true);
      addXP(Math.round(r.gesamt_prozent / 4));
      res.innerHTML = `<div class="card"><h2>${r.gesamt_prozent}%</h2>${Object.entries(r.punkte).map(([k, v]) => `${esc(k)}: <b>${v}/5</b>`).join(" · ")}
        <p>👍 ${esc(r.lob)}</p></div><div class="card"><h3>Correzioni</h3>${r.fehler.map(f => `<div class="vocab"><div><s>${esc(f.original)}</s> → <b>${esc(f.korrektur)}</b><br><span class="muted">${esc(f.erklaerung)}</span></div></div>`).join("")}</div>
        <div class="card"><h3>Versione migliorata</h3><p>${esc(r.verbessert).replace(/\n/g, "<br>")}</p>${sayBtn(r.verbessert)}</div>
        ${onDone ? `<button class="btn" id="cont">Continua l'esame →</button>` : `<button class="btn" data-go="lab/schreiben">Nuovo compito</button>`}`;
      r.fehler.slice(0, 5).forEach(f => S.errors.unshift({ d: today(), you: f.original, fix: f.korrektur + " – " + f.erklaerung })); save();
      if (onDone) document.getElementById("cont").onclick = () => onDone(r.gesamt_prozent);
    } catch (e) { res.innerHTML = `<div class="card feedback bad">Errore: ${esc(e.message)}</div>`; }
  };
}

// ===== Simulazione esame Goethe =====
function exam(step) {
  const L = S.level;
  if (!step) {
    const hist = (S.exams || []).slice(0, 5).map(x => `<div class="vocab"><span>${x.d} · ${x.level}</span><b>${x.total}% ${x.total >= 60 ? "✅" : "❌"}</b></div>`).join("");
    return view("Simulazione " + L, `<div class="card"><h3>Goethe-Zertifikat ${L} – simulazione</h3>
      <p>Tre moduli generati da Gemini: <b>Lesen</b> (6 domande), <b>Hören</b> (6 domande, testo solo audio), <b>Schreiben</b> (testo valutato).
      Il <b>Sprechen</b> si allena con il Tutor IA in modalità esame. Per superarlo serve il <b>60%</b> in ogni modulo.</p>
      <button class="btn big" data-go="esame/start">Inizia la simulazione</button></div>${hist ? `<div class="card"><h3>Ultimi risultati</h3>${hist}</div>` : ""}`);
  }
  const R = {};
  const topic = () => pick(TOPICS);
  const part = async (H, next) => {
    const T = H ? "Esame · Hören" : "Esame · Lesen";
    loading(T, "Preparo il modulo");
    try {
      const d = await gemini(`Erstelle eine Prüfungsaufgabe ${H ? "Hören" : "Lesen"} Goethe ${L} zum Thema "${topic()}". ${H ? "Text: Radiointerview (200–260 Wörter)." : "Text: Sachtext/Zeitungsartikel (300–380 Wörter)."}
JSON: {"title": "...", "text": "...", "questions": [{"q": "...", "options": ["...","...","..."], "a": Index, "expl": "Italienisch"}]} mit 6 Fragen.`, GEN_SYS, true);
      const intro = H ? `<div class="card"><b>${esc(d.title)}</b><p class="muted">Puoi ascoltare al massimo due volte, come all'esame.</p><button class="btn" id="play">🔊 Ascolta (<span id="n">2</span>)</button></div>`
        : `<div class="card"><h3>${esc(d.title)}</h3><p>${esc(d.text).replace(/\n/g, "<br>")}</p></div>`;
      let plays = 2;
      const bindPlay = () => { const b = document.getElementById("play"); if (b) { document.getElementById("n").textContent = plays; b.disabled = plays <= 0; b.onclick = () => { if (plays > 0) { plays--; speak(d.text); bindPlay(); } }; } };
      runMC(T, intro, d.questions, 4, (sc, n) => next(Math.round(sc / n * 100)));
      if (H) { new MutationObserver(bindPlay).observe($app, { childList: true }); bindPlay(); }
    } catch (e) { aiError(T, e, () => part(H, next)); }
  };
  part(false, lesen => { R.Lesen = lesen;
    part(true, hoeren => { R.Hören = hoeren;
      writingTask(L, schreiben => { R.Schreiben = schreiben;
        const total = Math.round((R.Lesen + R.Hören + R.Schreiben) / 3);
        S.exams.unshift({ d: today(), level: L, total, ...R }); addXP(50);
        view("Risultato esame", `<div class="card" style="text-align:center"><h1>${total >= 60 ? "🎓" : "💪"}</h1><h2>${total}%</h2>
          <p>${total >= 60 && Object.values(R).every(v => v >= 60) ? "Bestanden! Saresti promossa." : "Non ancora: continua ad allenarti, ci sei quasi."}</p></div>
          <div class="card">${Object.entries(R).map(([k, v]) => `<div class="vocab"><span>${k}</span><b>${v}% ${v >= 60 ? "✅" : "❌"}</b></div>`).join("")}</div>
          <div class="row"><button class="btn" data-go="tutor">🎤 Allena il Sprechen</button><button class="btn ghost" data-go="">Home</button></div>`);
      });
    });
  });
}
