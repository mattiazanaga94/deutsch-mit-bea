// ===== Verbi B2: forme, significato, uso =====
// [infinito, "3ª pers. presente, Präteritum, Perfekt", italiano, frase con {forma coniugata}, traduzione, nota/reggenza]
const B2_VERBS = [
  ["abschließen", "schließt ab, schloss ab, hat abgeschlossen", "concludere; chiudere a chiave", "Sie {schloss} ihr Studium 2023 mit Auszeichnung {ab}.", "Ha concluso gli studi nel 2023 con lode.", "separabile, forte · einen Vertrag abschließen"],
  ["anbieten", "bietet an, bot an, hat angeboten", "offrire", "Die Firma {hat} mir eine feste Stelle {angeboten}.", "L'azienda mi ha offerto un posto fisso.", "separabile, forte · das Angebot"],
  ["annehmen", "nimmt an, nahm an, hat angenommen", "accettare; supporre", "Ich {nehme} an, dass der Zug Verspätung hat.", "Suppongo che il treno sia in ritardo.", "separabile, forte · ein Angebot annehmen"],
  ["ablehnen", "lehnt ab, lehnte ab, hat abgelehnt", "rifiutare", "Der Antrag {wurde} leider {abgelehnt}.", "La domanda purtroppo è stata respinta.", "separabile, debole · die Ablehnung"],
  ["auffallen", "fällt auf, fiel auf, ist aufgefallen", "saltare all'occhio, notare", "Mir {ist} sofort {aufgefallen}, dass etwas fehlt.", "Ho notato subito che manca qualcosa.", "separabile, forte, con sein + Dat."],
  ["ausgehen (von)", "geht aus, ging aus, ist ausgegangen", "partire dal presupposto", "Wir {gehen} davon {aus}, dass die Preise steigen.", "Partiamo dal presupposto che i prezzi salgano.", "separabile, con sein · von + Dat."],
  ["beantragen", "beantragt, beantragte, hat beantragt", "fare domanda per, richiedere", "Ich {habe} ein Visum {beantragt}.", "Ho richiesto un visto.", "inseparabile: Partizip senza ge-"],
  ["begründen", "begründet, begründete, hat begründet", "motivare, giustificare", "Bitte {begründen} Sie Ihre Meinung.", "Motivi la Sua opinione, per favore.", "inseparabile · die Begründung"],
  ["behaupten", "behauptet, behauptete, hat behauptet", "affermare, sostenere", "Er {behauptet}, dass er nichts gewusst hat.", "Sostiene di non aver saputo niente.", "inseparabile · die Behauptung"],
  ["beitragen (zu)", "trägt bei, trug bei, hat beigetragen", "contribuire", "Jeder {kann} etwas zum Klimaschutz {beitragen}.", "Ognuno può contribuire alla tutela del clima.", "separabile, forte · zu + Dat."],
  ["beraten", "berät, beriet, hat beraten", "consigliare, fare consulenza", "Die Verkäuferin {hat} uns sehr gut {beraten}.", "La commessa ci ha consigliato molto bene.", "inseparabile, forte · die Beratung"],
  ["beschließen", "beschließt, beschloss, hat beschlossen", "decidere, deliberare", "Der Bundestag {beschloss} ein neues Gesetz.", "Il Bundestag ha approvato una nuova legge.", "inseparabile, forte · der Beschluss"],
  ["betonen", "betont, betonte, hat betont", "sottolineare", "Die Ministerin {betonte} die Bedeutung der Bildung.", "La ministra ha sottolineato l'importanza dell'istruzione.", "inseparabile · die Betonung"],
  ["betreffen", "betrifft, betraf, hat betroffen", "riguardare", "Die neue Regel {betrifft} alle Mitarbeiter.", "La nuova regola riguarda tutti i dipendenti.", "inseparabile, forte · betroffen sein"],
  ["beurteilen", "beurteilt, beurteilte, hat beurteilt", "giudicare, valutare", "Das {kann} ich nicht {beurteilen}.", "Non sono in grado di giudicarlo.", "inseparabile · die Beurteilung"],
  ["bevorzugen", "bevorzugt, bevorzugte, hat bevorzugt", "preferire", "Viele {bevorzugen} das Homeoffice.", "Molti preferiscono il lavoro da casa.", "inseparabile"],
  ["bewältigen", "bewältigt, bewältigte, hat bewältigt", "affrontare, superare", "Wir {haben} die Krise gemeinsam {bewältigt}.", "Abbiamo superato la crisi insieme.", "inseparabile"],
  ["darstellen", "stellt dar, stellte dar, hat dargestellt", "rappresentare, costituire", "Das {stellt} ein großes Problem {dar}.", "Questo costituisce un grande problema.", "separabile · die Darstellung"],
  ["durchführen", "führt durch, führte durch, hat durchgeführt", "eseguire, svolgere", "Die Umfrage {wurde} im März {durchgeführt}.", "Il sondaggio è stato svolto a marzo.", "separabile"],
  ["sich durchsetzen", "setzt sich durch, setzte sich durch, hat sich durchgesetzt", "imporsi, affermarsi", "Elektroautos {werden} sich langfristig {durchsetzen}.", "Le auto elettriche si affermeranno a lungo termine.", "separabile, riflessivo"],
  ["einführen", "führt ein, führte ein, hat eingeführt", "introdurre", "2002 {wurde} der Euro {eingeführt}.", "Nel 2002 è stato introdotto l'euro.", "separabile · die Einführung"],
  ["einhalten", "hält ein, hielt ein, hat eingehalten", "rispettare (regole, scadenze)", "Bitte {halten} Sie die Frist {ein}.", "Rispetti la scadenza, per favore.", "separabile, forte"],
  ["einschätzen", "schätzt ein, schätzte ein, hat eingeschätzt", "valutare, stimare", "Wie {schätzen} Sie die Lage {ein}?", "Come valuta la situazione?", "separabile · die Einschätzung"],
  ["empfinden", "empfindet, empfand, hat empfunden", "provare, percepire", "Viele {empfinden} die Stadt als zu laut.", "Molti percepiscono la città come troppo rumorosa.", "inseparabile, forte"],
  ["entstehen", "entsteht, entstand, ist entstanden", "nascere, sorgere", "Durch das Missverständnis {sind} Probleme {entstanden}.", "Dal malinteso sono nati dei problemi.", "inseparabile, forte, con sein"],
  ["entwickeln", "entwickelt, entwickelte, hat entwickelt", "sviluppare", "Das Team {hat} eine neue App {entwickelt}.", "Il team ha sviluppato una nuova app.", "inseparabile · die Entwicklung"],
  ["erfahren", "erfährt, erfuhr, hat erfahren", "venire a sapere", "Ich {habe} es erst gestern {erfahren}.", "L'ho saputo solo ieri.", "inseparabile, forte · die Erfahrung"],
  ["erfordern", "erfordert, erforderte, hat erfordert", "richiedere, esigere", "Diese Arbeit {erfordert} viel Geduld.", "Questo lavoro richiede molta pazienza.", "inseparabile · erforderlich"],
  ["ergreifen", "ergreift, ergriff, hat ergriffen", "afferrare, adottare (misure)", "Die Regierung {ergriff} sofort Maßnahmen.", "Il governo ha adottato subito delle misure.", "inseparabile, forte · Maßnahmen ergreifen"],
  ["erhöhen", "erhöht, erhöhte, hat erhöht", "aumentare", "Die Miete {wurde} um zehn Prozent {erhöht}.", "L'affitto è stato aumentato del dieci per cento.", "inseparabile · die Erhöhung"],
  ["erleichtern", "erleichtert, erleichterte, hat erleichtert", "facilitare", "Die App {erleichtert} den Alltag.", "L'app facilita la vita quotidiana.", "inseparabile · erleichtert sein"],
  ["ermöglichen", "ermöglicht, ermöglichte, hat ermöglicht", "rendere possibile", "Das Stipendium {ermöglichte} ihr ein Studium im Ausland.", "La borsa di studio le ha permesso di studiare all'estero.", "inseparabile"],
  ["erreichen", "erreicht, erreichte, hat erreicht", "raggiungere", "Wir {haben} unser Ziel {erreicht}.", "Abbiamo raggiunto il nostro obiettivo.", "inseparabile"],
  ["erwerben", "erwirbt, erwarb, hat erworben", "acquisire", "Im Praktikum {erwarb} sie wichtige Kenntnisse.", "Durante il tirocinio ha acquisito conoscenze importanti.", "inseparabile, forte"],
  ["erziehen", "erzieht, erzog, hat erzogen", "educare", "Sie {haben} ihre Kinder zweisprachig {erzogen}.", "Hanno cresciuto i figli bilingui.", "inseparabile, forte · die Erziehung"],
  ["fördern", "fördert, förderte, hat gefördert", "promuovere, sostenere", "Der Staat {fördert} erneuerbare Energien.", "Lo Stato sostiene le energie rinnovabili.", "debole · diverso da fordern!"],
  ["gelingen", "gelingt, gelang, ist gelungen", "riuscire", "Es {ist} mir {gelungen}, die Prüfung zu bestehen.", "Sono riuscita a superare l'esame.", "impersonale + Dat., con sein"],
  ["gelten (als)", "gilt, galt, hat gegolten", "valere; essere considerato", "Goethe {gilt} als größter deutscher Dichter.", "Goethe è considerato il più grande poeta tedesco.", "forte · gelten als + Nom."],
  ["genehmigen", "genehmigt, genehmigte, hat genehmigt", "autorizzare, approvare", "Mein Urlaub {wurde} {genehmigt}.", "Le mie ferie sono state approvate.", "inseparabile · die Genehmigung"],
  ["herstellen", "stellt her, stellte her, hat hergestellt", "produrre", "Die Möbel {werden} in Schweden {hergestellt}.", "I mobili vengono prodotti in Svezia.", "separabile · der Hersteller"],
  ["hervorheben", "hebt hervor, hob hervor, hat hervorgehoben", "evidenziare", "Ich möchte zwei Punkte {hervorheben}.", "Vorrei evidenziare due punti.", "separabile, forte"],
  ["nachweisen", "weist nach, wies nach, hat nachgewiesen", "dimostrare, provare", "Sie müssen Ihre Deutschkenntnisse {nachweisen}.", "Deve dimostrare le Sue conoscenze di tedesco.", "separabile, forte · der Nachweis"],
  ["sich niederlassen", "lässt sich nieder, ließ sich nieder, hat sich niedergelassen", "stabilirsi", "Viele Römer {ließen} sich am Rhein {nieder}.", "Molti romani si stabilirono sul Reno.", "separabile, forte, riflessivo"],
  ["schaffen", "schafft, schuf, hat geschaffen", "creare", "Die Firma {hat} 200 neue Arbeitsplätze {geschaffen}.", "L'azienda ha creato 200 nuovi posti di lavoro.", "forte nel senso di «creare» · schaffen (riuscire) è debole: hat geschafft"],
  ["senken", "senkt, senkte, hat gesenkt", "abbassare, ridurre", "Wir müssen die Kosten {senken}.", "Dobbiamo ridurre i costi.", "debole · ≠ sinken (intransitivo)"],
  ["sinken", "sinkt, sank, ist gesunken", "scendere, calare", "Die Arbeitslosigkeit {ist} deutlich {gesunken}.", "La disoccupazione è calata nettamente.", "forte, con sein"],
  ["steigen", "steigt, stieg, ist gestiegen", "salire, aumentare", "Die Preise {sind} stark {gestiegen}.", "I prezzi sono aumentati molto.", "forte, con sein"],
  ["teilnehmen (an)", "nimmt teil, nahm teil, hat teilgenommen", "partecipare", "Über 500 Personen {nahmen} an der Umfrage {teil}.", "Oltre 500 persone hanno partecipato al sondaggio.", "separabile, forte · an + Dat."],
  ["überlegen", "überlegt, überlegte, hat überlegt", "riflettere, pensarci", "Ich {habe} es mir anders {überlegt}.", "Ho cambiato idea.", "inseparabile · sich etwas überlegen"],
  ["übernehmen", "übernimmt, übernahm, hat übernommen", "assumersi, rilevare", "Wer {übernimmt} die Verantwortung?", "Chi si assume la responsabilità?", "inseparabile, forte"],
  ["überwiegen", "überwiegt, überwog, hat überwogen", "prevalere", "Meiner Meinung nach {überwiegen} die Vorteile.", "Secondo me prevalgono i vantaggi.", "inseparabile, forte · ottimo per la Erörterung"],
  ["umgehen (mit)", "geht um, ging um, ist umgegangen", "gestire, trattare", "Sie {geht} sehr professionell mit Kritik {um}.", "Gestisce le critiche in modo molto professionale.", "separabile, con sein · mit + Dat."],
  ["unterscheiden", "unterscheidet, unterschied, hat unterschieden", "distinguere", "Man muss zwischen Fakten und Meinungen {unterscheiden}.", "Bisogna distinguere tra fatti e opinioni.", "inseparabile, forte"],
  ["unterstützen", "unterstützt, unterstützte, hat unterstützt", "sostenere, aiutare", "Meine Familie {hat} mich immer {unterstützt}.", "La mia famiglia mi ha sempre sostenuta.", "inseparabile · die Unterstützung"],
  ["verbessern", "verbessert, verbesserte, hat verbessert", "migliorare", "Ich möchte mein Deutsch {verbessern}.", "Vorrei migliorare il mio tedesco.", "inseparabile"],
  ["verbieten", "verbietet, verbot, hat verboten", "vietare", "Das Rauchen {ist} hier {verboten}.", "Qui è vietato fumare.", "inseparabile, forte · das Verbot"],
  ["verbringen", "verbringt, verbrachte, hat verbracht", "trascorrere", "Wir {verbrachten} den Sommer an der Ostsee.", "Abbiamo trascorso l'estate sul Baltico.", "inseparabile, misto"],
  ["verfassen", "verfasst, verfasste, hat verfasst", "redigere, scrivere", "Sie {hat} einen Leserbrief {verfasst}.", "Ha scritto una lettera al giornale.", "inseparabile · der Verfasser"],
  ["vergleichen", "vergleicht, verglich, hat verglichen", "confrontare", "{Vergleichen} Sie die Situation in Ihrem Heimatland.", "Confronti la situazione nel Suo Paese.", "inseparabile, forte · tipico del Goethe Sprechen"],
  ["verhindern", "verhindert, verhinderte, hat verhindert", "impedire, evitare", "Der Unfall {hätte} {verhindert} werden können.", "L'incidente avrebbe potuto essere evitato.", "inseparabile"],
  ["verlangen", "verlangt, verlangte, hat verlangt", "pretendere, chiedere", "Der Kunde {verlangt} sein Geld zurück.", "Il cliente pretende indietro i soldi.", "inseparabile"],
  ["vermeiden", "vermeidet, vermied, hat vermieden", "evitare", "Ich {vermeide} es, abends zu viel zu essen.", "Evito di mangiare troppo la sera.", "inseparabile, forte"],
  ["vermitteln", "vermittelt, vermittelte, hat vermittelt", "trasmettere; fare da intermediario", "Die Schule soll Werte {vermitteln}.", "La scuola deve trasmettere valori.", "inseparabile"],
  ["vertreten", "vertritt, vertrat, hat vertreten", "rappresentare; sostituire", "Wer {vertritt} Sie während Ihres Urlaubs?", "Chi La sostituisce durante le ferie?", "inseparabile, forte · eine Meinung vertreten"],
  ["verursachen", "verursacht, verursachte, hat verursacht", "causare", "Der Sturm {hat} große Schäden {verursacht}.", "La tempesta ha causato grandi danni.", "inseparabile · die Ursache"],
  ["voraussetzen", "setzt voraus, setzte voraus, hat vorausgesetzt", "presupporre", "Die Stelle {setzt} gute Englischkenntnisse {voraus}.", "Il posto presuppone una buona conoscenza dell'inglese.", "separabile · die Voraussetzung"],
  ["vorschlagen", "schlägt vor, schlug vor, hat vorgeschlagen", "proporre", "Ich {schlage} {vor}, dass wir uns am Montag treffen.", "Propongo di vederci lunedì.", "separabile, forte · der Vorschlag"],
  ["vorziehen", "zieht vor, zog vor, hat vorgezogen", "preferire; anticipare", "Ich {ziehe} es {vor}, mit dem Zug zu fahren.", "Preferisco viaggiare in treno.", "separabile, forte"],
  ["wahrnehmen", "nimmt wahr, nahm wahr, hat wahrgenommen", "percepire; cogliere", "Sie {nahm} die Chance sofort {wahr}.", "Ha colto subito l'occasione.", "separabile, forte · einen Termin wahrnehmen"],
  ["zunehmen", "nimmt zu, nahm zu, hat zugenommen", "aumentare; ingrassare", "Der Verkehr {hat} in den letzten Jahren stark {zugenommen}.", "Il traffico è aumentato molto negli ultimi anni.", "separabile, forte · ≠ abnehmen"],
  ["zurückführen (auf)", "führt zurück, führte zurück, hat zurückgeführt", "ricondurre a, attribuire a", "Das Problem {lässt} sich auf zu wenig Personal {zurückführen}.", "Il problema si può ricondurre alla mancanza di personale.", "separabile · auf + Akk."],
  ["zusammenfassen", "fasst zusammen, fasste zusammen, hat zusammengefasst", "riassumere", "{Fassen} Sie den Text kurz {zusammen}.", "Riassuma brevemente il testo.", "separabile · die Zusammenfassung"],
  ["zustimmen", "stimmt zu, stimmte zu, hat zugestimmt", "essere d'accordo, approvare", "Dieser Meinung {stimme} ich voll {zu}.", "Sono pienamente d'accordo con questa opinione.", "separabile · + Dat."]
];
const b2Forms = v => { const [pr, pt, pf] = v[1].split(", "); return { pr, pt, pf }; };
const b2Key = v => "b2:" + v[0];
function b2Mark(v, ok) {
  S.prep = S.prep || {}; const k = b2Key(v), s = S.prep[k] || { box: 0, ok: 0, ko: 0 };
  if (ok) { s.ok++; s.box = Math.min(5, s.box + 1); } else { s.ko++; s.box = 0; } S.prep[k] = s; save();
}
const b2Weak = () => B2_VERBS.filter(v => { const s = (S.prep || {})[b2Key(v)]; return s && s.ko && s.box < 2; });
const b2Known = () => B2_VERBS.filter(v => ((S.prep || {})[b2Key(v)] || {}).box >= 3).length;

function b2Hub(a) {
  if (a === "lista") return b2List();
  if (a === "card") return b2Cards();
  if (a === "forme") return b2FormsDrill();
  if (a === "frasi") return b2Cloze(false);
  if (a === "errori") return b2Cloze(true);
  if (a === "senso") return b2Meaning();
  const weak = b2Weak().length, known = b2Known();
  view("Verbi B2", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#5e5ce6">${ic("pen")}</span><div style="flex:1"><h2 style="margin:0">Verbi B2</h2>
      <small class="muted">${B2_VERBS.length} verbi chiave per il Goethe B2 · ${known} consolidati${weak ? ` · ${weak} da ripassare` : ""}</small></div></div>
      <div class="progress thin" style="margin-top:14px"><i style="width:${known / B2_VERBS.length * 100}%"></i></div></div>
    <div class="mods">
      ${mod("verbi/lista", "library", "Lista dei verbi", "Forme, significato, esempio", "#5e5ce6")}
      ${mod("verbi/card", "layers", "Flashcard", "Italiano → verbo tedesco", "#0071e3")}
      ${mod("verbi/senso", "checksq", "Significato", "Scegli il verbo giusto nel contesto", "#30b06a")}
      ${mod("verbi/forme", "pen", "Paradigmi", "Präteritum e Perfekt (hat/ist)", "#e8590c")}
      ${mod("verbi/frasi", "pen", "Completa le frasi", "Verbo coniugato al posto giusto", "#0d9488")}
      ${weak ? mod("verbi/errori", "refresh", "Ripassa i tuoi errori", `${weak} verbi sbagliati di recente`, "#ff375f") : ""}
      ${mod("prep", "layers", "Verbi con preposizione", "warten auf, denken an, woran…", "#bf5af2")}
    </div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
function b2List() {
  view("Lista dei verbi B2", `<div class="card"><p class="muted" style="margin-top:0">Forme: 3ª persona presente · Präteritum · Perfekt. «inseparabile» = prefissi be-, ent-, er-, ver-, zer-, über-, unter-: Partizip senza ge-.</p>
    ${B2_VERBS.map(v => { const s = v[3].replace(/[{}]/g, ""), st = (S.prep || {})[b2Key(v)];
      return `<div class="vocab"><div style="flex:1"><b>${esc(v[0])}</b>${st && st.box >= 3 ? ` <span class="badge ok">${ic("check")}</span>` : ""} <span class="muted">— ${esc(v[2])}</span><br><small>${esc(v[1])}</small><br><small>${esc(s)}</small><br><small class="muted">${esc(v[4])} · ${esc(v[5])}</small></div>${sayBtn(v[0] + ". " + v[1] + ". " + s)}</div>`; }).join("")}</div>`, { back: true, crumb: "Verbi B2", nav: "pratica" });
}
function b2Cards() {
  const st = S.prep || {};
  const due = shuffle(B2_VERBS.filter(v => (st[b2Key(v)] || { box: 0 }).box < 3));
  const cards = (due.length >= 12 ? due : due.concat(shuffle(B2_VERBS.filter(v => !due.includes(v))))).slice(0, 15);
  let i = 0, known = 0;
  const draw = () => {
    if (i >= cards.length) { addXP(8 + known); return finished("Mazzo completato", `${known} verbi saputi su ${cards.length}`, 8 + known, "verbi/card"); }
    const v = cards[i], s = v[3].replace(/[{}]/g, "");
    view("Flashcard verbi B2", `${stepbar(i, cards.length)}
      <div class="flash" id="fc"><div class="inner"><div class="face"><span class="tag">COME SI DICE IN TEDESCO?</span><div class="prompt" style="margin-top:10px">${esc(v[2])}</div><small>Tocca o premi Spazio per girare</small></div>
        <div class="face back"><span class="tag" style="color:#fff;opacity:.8">${esc(v[1])}</span><div class="prompt" style="margin-top:10px">${esc(v[0])}</div><small>${esc(s)}</small></div></div></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" data-say="${esc(v[0] + ". " + s)}">${ic("volume")} Ascolta</button>
        <button class="btn danger" id="no">${ic("refresh")} Da ripassare</button><button class="btn" id="yes">${ic("check")} La so</button></div>
      <p class="muted" style="text-align:center;margin-top:14px">Di' il verbo e le sue forme prima di girare.<br><span class="kbd">Spazio</span> gira · <span class="kbd">1</span> da ripassare · <span class="kbd">2</span> la so</p>`, { back: true, crumb: "Verbi B2", nav: "pratica" });
    const fc = $("fc"); let flipped = false;
    const flip = () => { fc.classList.toggle("flip"); if (!flipped) { flipped = true; speak(v[0] + ". " + s); } };
    fc.onclick = flip;
    const yes = () => { b2Mark(v, true); known++; i++; draw(); }, no = () => { b2Mark(v, false); if (cards.filter(x => x === v).length < 2) cards.push(v); i++; draw(); };
    $("yes").onclick = yes; $("no").onclick = no;
    const kh = e => { if (e.target.tagName === "INPUT") return; if (e.code === "Space") { e.preventDefault(); flip(); } if (e.key === "2") yes(); if (e.key === "1") no(); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
function b2FormsDrill() {
  const items = shuffle(B2_VERBS).slice(0, 10).map(v => {
    const f = b2Forms(v), [aux, ...p] = f.pf.split(" ");
    return { s: `${v[0]} → er/sie {${f.pr}} · Präteritum: {${f.pt}} · Perfekt: {${aux}} {${p.join(" ")}}`, it: v[2], v, b2: true, task: "SCRIVI LE FORME DEL VERBO",
      x: `${v[1]} · ${v[5]}` };
  });
  runCloze("Paradigmi", items, { again: "verbi/forme", crumb: "Verbi B2", back: "verbi" });
}
function b2Cloze(weak) {
  const src = weak ? b2Weak() : B2_VERBS;
  const items = shuffle(src).slice(0, 12).map(v => ({ s: v[3], it: v[4], v, b2: true, hint: `${v[0]} (${v[2]})`, task: "CONIUGA IL VERBO", x: `${v[1]} · ${v[5]}` }));
  runCloze(weak ? "Ripasso errori" : "Completa le frasi", items, { again: weak ? "verbi/errori" : "verbi/frasi", crumb: "Verbi B2", back: "verbi" });
}
function b2Meaning() {
  const qs = shuffle(B2_VERBS).slice(0, 12); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); return finished(`${score} su ${qs.length}`, "Significato dei verbi B2", score * 3, "verbi/senso"); }
    const v = qs[i], full = v[3].replace(/[{}]/g, ""), gapped = v[3].replace(/\{[^}]+\}/g, "___");
    const opts = shuffle([v, ...shuffle(B2_VERBS.filter(x => x !== v)).slice(0, 3)]);
    view("Significato", `${stepbar(i, qs.length)}<div class="card"><span class="tag">QUALE VERBO COMPLETA LA FRASE?</span>
      <div class="prompt" style="margin:10px 0 4px;font-size:1.2rem">${esc(gapped)}</div><p class="muted" style="margin:0">${esc(v[4])}</p>
      ${opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${k + 1}</span><span>${esc(o[0])} <span class="muted">· ${esc(o[2])}</span></span></button>`).join("")}
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Verbi B2", nav: "pratica" });
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = opts[k] === v; b2Mark(v, ok); if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (opts[x.dataset.k] === v) x.classList.add("ok"); });
      if (!ok) $app.querySelector(`.opt[data-k="${k}"]`).classList.add("bad");
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = `${ok ? pick(PRAISE) : "Non proprio."} <span class="muted">${esc(full)} · ${esc(v[1])}</span>`;
      speak(full); later(() => { i++; draw(); }, ok ? 2200 : 4000);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.k));
    const kh = e => { if (/^[1-4]$/.test(e.key)) answer(+e.key - 1); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
