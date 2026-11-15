// ===== Preposizioni: significati, usi, differenze, esercizi =====
// [preposizione, caso, [[significato, esempio DE, traduzione IT], ...]]
const PREPOS = [
  ["an", "Akk./Dat.", [["al bordo di, attaccato a (superficie verticale)", "Das Bild hängt an der Wand.", "Il quadro è appeso al muro."], ["al mare, al lago, al fiume", "Wir fahren ans Meer.", "Andiamo al mare."], ["giorni, date, parti del giorno", "Am Montag habe ich frei.", "Lunedì sono libera."], ["all'università (an der Uni)", "Sie studiert an der Universität Wien.", "Studia all'Università di Vienna."]]],
  ["auf", "Akk./Dat.", [["sopra (a contatto, superficie orizzontale)", "Das Handy liegt auf dem Tisch.", "Il cellulare è sul tavolo."], ["luoghi aperti, eventi, uffici pubblici", "Ich gehe auf den Markt / auf eine Party / auf die Bank.", "Vado al mercato / a una festa / in banca."], ["in una lingua", "Wie heißt das auf Deutsch?", "Come si dice in tedesco?"], ["isole", "Wir machen Urlaub auf Sizilien.", "Facciamo vacanza in Sicilia."]]],
  ["in", "Akk./Dat.", [["dentro (luoghi chiusi, città, Paesi)", "Ich wohne in München.", "Abito a Monaco."], ["andare dentro (+Akk.)", "Wir gehen ins Kino.", "Andiamo al cinema."], ["Paesi con articolo", "Sie fliegt in die USA.", "Vola negli Stati Uniti."], ["mesi, stagioni, anni con 'Jahr'", "Im Winter fahre ich Ski.", "D'inverno scio."], ["tra (nel futuro)", "In einer Stunde bin ich da.", "Tra un'ora sono lì."]]],
  ["über", "Akk./Dat.", [["sopra (senza contatto)", "Die Lampe hängt über dem Tisch.", "La lampada è sopra il tavolo."], ["attraverso, passando per", "Wir fahren über die Brücke / über Bologna nach Rom.", "Passiamo sul ponte / per Bologna fino a Roma."], ["su un argomento (+Akk.)", "Ein Buch über die Geschichte Berlins.", "Un libro sulla storia di Berlino."], ["più di", "Das kostet über 100 Euro.", "Costa più di 100 euro."]]],
  ["unter", "Akk./Dat.", [["sotto", "Die Katze schläft unter dem Sofa.", "Il gatto dorme sotto il divano."], ["meno di", "Kinder unter 12 Jahren zahlen nichts.", "I bambini sotto i 12 anni non pagano."], ["tra, fra (in mezzo a molti)", "Unter uns gesagt …", "Detto tra noi…"]]],
  ["vor", "Akk./Dat.", [["davanti a", "Wir warten vor dem Kino.", "Aspettiamo davanti al cinema."], ["fa (tempo, +Dat.)", "Vor zwei Jahren war ich in Berlin.", "Due anni fa ero a Berlino."], ["prima di", "Vor dem Essen wasche ich die Hände.", "Prima di mangiare mi lavo le mani."], ["per (causa emotiva)", "Er zitterte vor Kälte.", "Tremava dal freddo."]]],
  ["hinter / neben / zwischen", "Akk./Dat.", [["dietro", "Der Garten ist hinter dem Haus.", "Il giardino è dietro la casa."], ["accanto a", "Sie sitzt neben mir.", "È seduta accanto a me."], ["tra (due cose o due date)", "Zwischen Weihnachten und Neujahr ist das Büro zu.", "Tra Natale e Capodanno l'ufficio è chiuso."]]],
  ["aus", "Dat.", [["provenienza (Paese, città)", "Ich komme aus Italien.", "Vengo dall'Italia."], ["uscire da un luogo chiuso", "Sie kommt gerade aus dem Büro.", "Esce adesso dall'ufficio."], ["materiale", "Der Tisch ist aus Holz.", "Il tavolo è di legno."], ["motivo (aus Liebe, aus Angst)", "Er hat das aus Liebe getan.", "L'ha fatto per amore."]]],
  ["bei", "Dat.", [["presso, da (una persona, un'azienda)", "Ich wohne bei meinen Eltern. Sie arbeitet bei Siemens.", "Abito dai miei genitori. Lavora alla Siemens."], ["vicino a (città)", "Potsdam liegt bei Berlin.", "Potsdam è vicino a Berlino."], ["durante un'attività", "Beim Kochen höre ich Musik.", "Mentre cucino ascolto musica."], ["con (condizioni)", "Bei Regen bleiben wir zu Hause.", "Se piove restiamo a casa."]]],
  ["mit", "Dat.", [["con (compagnia)", "Ich gehe mit Anna ins Kino.", "Vado al cinema con Anna."], ["mezzo di trasporto", "Ich fahre mit dem Zug.", "Vado in treno."], ["strumento", "Ich schreibe mit einem Kuli.", "Scrivo con una penna."], ["età", "Mit 18 Jahren habe ich den Führerschein gemacht.", "A 18 anni ho preso la patente."]]],
  ["nach", "Dat.", [["verso città e Paesi senza articolo", "Morgen fliege ich nach Wien.", "Domani volo a Vienna."], ["a casa (nach Hause)", "Ich gehe jetzt nach Hause.", "Adesso vado a casa."], ["direzioni", "Gehen Sie nach links / nach oben.", "Vada a sinistra / su."], ["dopo (tempo)", "Nach dem Kurs gehen wir essen.", "Dopo il corso andiamo a mangiare."], ["secondo", "Meiner Meinung nach …", "Secondo me…"]]],
  ["seit", "Dat.", [["da (azione iniziata nel passato che dura ancora)", "Ich wohne seit drei Jahren hier.", "Abito qui da tre anni."]]],
  ["von", "Dat.", [["da (punto di partenza, persona)", "Ich komme gerade vom Arzt.", "Torno adesso dal medico."], ["di (appartenenza, invece del genitivo)", "Das ist das Auto von meinem Bruder.", "È la macchina di mio fratello."], ["da … a (von … bis)", "Von Montag bis Freitag arbeite ich.", "Lavoro dal lunedì al venerdì."], ["da (agente nel passivo)", "Das Buch wurde von Goethe geschrieben.", "Il libro è stato scritto da Goethe."]]],
  ["zu", "Dat.", [["verso persone, negozi, istituzioni", "Ich gehe zum Arzt / zu Maria / zur Post.", "Vado dal medico / da Maria / in posta."], ["a casa (essere): zu Hause", "Heute bleibe ich zu Hause.", "Oggi resto a casa."], ["occasioni", "Zum Geburtstag bekomme ich ein Buch.", "Per il compleanno ricevo un libro."], ["a piedi (zu Fuß)", "Ich gehe zu Fuß zur Arbeit.", "Vado al lavoro a piedi."], ["scopo", "Zum Lernen brauche ich Ruhe.", "Per studiare ho bisogno di tranquillità."]]],
  ["gegenüber / ab / außer", "Dat.", [["di fronte a", "Die Apotheke ist gegenüber dem Bahnhof.", "La farmacia è di fronte alla stazione."], ["a partire da", "Ab Montag arbeite ich wieder.", "Da lunedì lavoro di nuovo."], ["tranne", "Außer mir waren alle da.", "C'erano tutti tranne me."]]],
  ["für", "Akk.", [["per (destinatario, scopo)", "Das Geschenk ist für dich.", "Il regalo è per te."], ["per (durata prevista)", "Ich fahre für zwei Wochen nach Spanien.", "Vado in Spagna per due settimane."], ["a favore di", "Ich bin für den Vorschlag.", "Sono a favore della proposta."], ["prezzo", "Ich habe das Fahrrad für 200 Euro gekauft.", "Ho comprato la bici per 200 euro."]]],
  ["durch", "Akk.", [["attraverso", "Wir gehen durch den Park.", "Attraversiamo il parco."], ["per mezzo di, grazie a", "Ich habe die Wohnung durch einen Freund gefunden.", "Ho trovato l'appartamento tramite un amico."]]],
  ["gegen", "Akk.", [["contro", "Ich bin gegen den Krieg.", "Sono contro la guerra."], ["verso, circa (ora)", "Ich komme gegen acht Uhr.", "Arrivo verso le otto."]]],
  ["ohne", "Akk.", [["senza", "Ich trinke Kaffee ohne Milch.", "Bevo il caffè senza latte."]]],
  ["um", "Akk.", [["alle (ora precisa)", "Der Film beginnt um 20 Uhr.", "Il film inizia alle 20."], ["intorno a", "Wir sitzen um den Tisch.", "Siamo seduti intorno al tavolo."], ["girare (um die Ecke)", "Die Bäckerei ist gleich um die Ecke.", "Il panificio è proprio dietro l'angolo."]]],
  ["bis", "Akk.", [["fino a (tempo e luogo)", "Ich arbeite bis 18 Uhr. Der Zug fährt bis Hamburg.", "Lavoro fino alle 18. Il treno va fino ad Amburgo."], ["entro", "Bitte antworten Sie bis Freitag.", "Risponda entro venerdì, per favore."]]],
  ["wegen / trotz / während", "Gen.", [["a causa di", "Wegen des Regens bleiben wir zu Hause.", "A causa della pioggia restiamo a casa."], ["nonostante", "Trotz der Kälte gehen wir spazieren.", "Nonostante il freddo andiamo a passeggiare."], ["durante", "Während des Urlaubs habe ich viel gelesen.", "Durante le vacanze ho letto molto."]]]
];

const PREPOS_DIFF = [
  { t: "«a / in» + luogo: nach, in, zu, bei, an, auf", h: `
    <p>L'italiano dice «a» o «in» quasi sempre; il tedesco sceglie in base al <b>tipo di luogo</b>:</p>
    <ul><li><b>nach</b>: città e Paesi <i>senza</i> articolo → <i>nach Berlin, nach Italien</i> · e <i>nach Hause</i></li>
      <li><b>in</b>: Paesi con articolo e luoghi in cui si <i>entra</i> → <i>in die Schweiz, ins Kino, in die Schule</i></li>
      <li><b>zu</b>: persone, negozi, istituzioni, luoghi che sono una meta → <i>zu Maria, zum Arzt, zur Bank, zum Bahnhof</i></li>
      <li><b>an</b>: acqua e bordi → <i>ans Meer, an den See, an die Grenze</i></li>
      <li><b>auf</b>: luoghi aperti, eventi, alcuni uffici → <i>auf den Markt, auf eine Party, auf die Post (anche: zur Post)</i></li></ul>
    <p>Quando sei già lì: nach → <b>in</b> (in Berlin) · zu → <b>bei</b> (beim Arzt) · ins → <b>im</b> · ans → <b>am</b> · nach Hause → <b>zu Hause</b>.</p>` },
  { t: "«da»: aus, von, bei, seit", h: `
    <ul><li><b>aus</b> = provenienza da un luogo chiuso o Paese: <i>Ich komme aus Rom / aus dem Kino.</i></li>
      <li><b>von</b> = da una persona, un luogo aperto, un punto di partenza: <i>Ich komme vom Arzt / von Maria / vom Strand.</i></li>
      <li><b>bei</b> = «da» nel senso di «a casa di, presso»: <i>Ich bin bei Maria.</i> (sono da Maria)</li>
      <li><b>seit</b> = «da» temporale (dura ancora): <i>seit Montag, seit zwei Jahren.</i></li></ul>` },
  { t: "Tempo: seit, vor, für, in, ab", h: `
    <ul><li><b>seit</b> + Dat.: da (è iniziato e continua) → <i>Ich lerne seit einem Jahr Deutsch.</i></li>
      <li><b>vor</b> + Dat.: fa (è finito) → <i>Ich habe vor einem Jahr angefangen.</i></li>
      <li><b>für</b> + Akk.: per (durata prevista) → <i>Ich fahre für eine Woche weg.</i></li>
      <li><b>in</b> + Dat.: tra (futuro) → <i>In einer Woche fahre ich weg.</i></li>
      <li><b>ab</b>: a partire da → <i>Ab Montag habe ich Urlaub.</i> · <b>bis</b>: fino a / entro → <i>bis Freitag.</i></li></ul>
    <p>Errore tipico italiano: «Ich wohne hier <s>für</s> drei Jahre» → giusto: <b>seit</b> drei Jahren.</p>` },
  { t: "Ore, giorni, mesi: um, am, im", h: `
    <ul><li><b>um</b> + ora: <i>um 8 Uhr</i> · <b>gegen</b> + ora: verso le… <i>gegen 8 Uhr</i></li>
      <li><b>am</b> + giorno, data, parte del giorno, fine settimana: <i>am Montag, am 5. Mai, am Morgen, am Wochenende</i></li>
      <li><b>im</b> + mese, stagione: <i>im März, im Sommer</i> · ma <b>in der Nacht</b>, <b>in der Woche</b></li>
      <li>anno: <i>2025</i> oppure <i>im Jahr 2025</i> (mai «in 2025»)</li></ul>` },
  { t: "an, auf o über? (sopra)", h: `
    <ul><li><b>auf</b> = sopra, appoggiato su una superficie orizzontale: <i>auf dem Tisch</i></li>
      <li><b>an</b> = attaccato a una superficie verticale o al bordo: <i>an der Wand, an der Tür, am Fenster</i></li>
      <li><b>über</b> = sopra, senza contatto: <i>Die Lampe hängt über dem Tisch.</i></li></ul>` },
  { t: "mit o bei? zu o nach?", h: `
    <ul><li><b>mit</b> = con (compagnia, mezzo): <i>Ich wohne mit meinem Freund zusammen.</i> · <b>bei</b> = a casa di: <i>Ich wohne bei meinem Freund.</i></li>
      <li><b>zu</b> + persona/edificio: <i>Ich gehe zum Bäcker.</i> · <b>nach</b> + città/Paese: <i>Ich fahre nach Köln.</i></li>
      <li>Mezzi di trasporto sempre <b>mit</b>: <i>mit dem Auto, mit dem Zug</i> · ma <b>zu Fuß</b> (a piedi).</li></ul>` }
];

const PREPOS_EX = {
  luogo: [
    { s: "Nächste Woche fahre ich {nach} Hamburg.", it: "La settimana prossima vado ad Amburgo.", x: "Città senza articolo → nach." },
    { s: "Meine Freundin wohnt {in} Köln.", it: "La mia amica abita a Colonia.", x: "Wo? + città → in." },
    { s: "Ich gehe heute Nachmittag {zum} Friseur.", it: "Oggi pomeriggio vado dal parrucchiere.", x: "Persona/negozio come meta → zu + dem = zum." },
    { s: "Gestern war ich {beim} Friseur.", it: "Ieri sono stata dal parrucchiere.", x: "Essere da una persona/negozio → bei + dem = beim." },
    { s: "Im August fahren wir {ans} Meer.", it: "Ad agosto andiamo al mare.", x: "Acqua, Wohin? → an + das = ans." },
    { s: "Wir verbringen den Sommer {am} See.", it: "Passiamo l'estate al lago.", x: "Acqua, Wo? → an + dem = am." },
    { s: "Samstags gehe ich {auf den} Markt.", it: "Il sabato vado al mercato.", x: "Luogo aperto → auf (Wohin? → Akk.)." },
    { s: "Mein Bruder lebt {in der} Türkei.", it: "Mio fratello vive in Turchia.", x: "Paese con articolo (die Türkei) → in der (Wo?)." },
    { s: "Ich komme {aus} Neapel.", it: "Vengo da Napoli.", x: "Provenienza da città → aus." },
    { s: "Ich komme gerade {von} meiner Oma.", it: "Torno adesso da mia nonna.", x: "Provenienza da una persona → von (non aus)." },
    { s: "Heute Abend bin ich {bei} Maria.", it: "Stasera sono da Maria.", x: "A casa di una persona → bei." },
    { s: "Kommst du morgen {zu} mir?", it: "Vieni da me domani?", x: "Andare da una persona → zu." },
    { s: "Ich muss jetzt {nach} Hause.", it: "Adesso devo andare a casa.", x: "Wohin? → nach Hause." },
    { s: "Bist du heute Abend {zu} Hause?", it: "Sei a casa stasera?", x: "Wo? → zu Hause." },
    { s: "Wir gehen {durch} den Park zum Bahnhof.", it: "Attraversiamo il parco fino alla stazione.", x: "attraverso → durch + Akk." },
    { s: "Die Apotheke ist direkt {gegenüber} der Post.", it: "La farmacia è proprio di fronte alla posta.", x: "di fronte a → gegenüber + Dat." },
    { s: "Die Bäckerei ist gleich {um} die Ecke.", it: "Il panificio è proprio dietro l'angolo.", x: "Espressione fissa: um die Ecke." },
    { s: "Der Zug fährt {über} Frankfurt nach Berlin.", it: "Il treno va a Berlino passando per Francoforte.", x: "passando per → über." },
    { s: "Wir machen dieses Jahr Urlaub {auf} Sardinien.", it: "Quest'anno facciamo le vacanze in Sardegna.", x: "Isole → auf." },
    { s: "Sie studiert Medizin {an der} Universität Heidelberg.", it: "Studia medicina all'Università di Heidelberg.", x: "an der Universität (fisso)." }
  ],
  tempo: [
    { s: "Ich lerne {seit} zwei Jahren Deutsch.", it: "Studio tedesco da due anni.", x: "Iniziato e continua → seit." },
    { s: "Ich habe {vor} zwei Jahren mit Deutsch angefangen.", it: "Ho cominciato il tedesco due anni fa.", x: "«fa» → vor." },
    { s: "Wir fahren {für} zehn Tage nach Portugal.", it: "Andiamo in Portogallo per dieci giorni.", x: "Durata prevista → für." },
    { s: "{In} zehn Tagen fahren wir nach Portugal.", it: "Tra dieci giorni andiamo in Portogallo.", x: "«tra» (futuro) → in." },
    { s: "Der Unterricht beginnt {um} halb neun.", it: "La lezione inizia alle otto e mezza.", x: "Ora → um." },
    { s: "{Am} Wochenende schlafe ich lange.", it: "Nel fine settimana dormo a lungo.", x: "am Wochenende (fisso)." },
    { s: "{Im} Frühling blühen die Bäume.", it: "In primavera gli alberi fioriscono.", x: "Stagioni → im." },
    { s: "Ich bin {am} 12. Mai geboren.", it: "Sono nata il 12 maggio.", x: "Date → am." },
    { s: "Das Büro ist {von} 9 {bis} 17 Uhr geöffnet.", it: "L'ufficio è aperto dalle 9 alle 17.", x: "von … bis = da … a." },
    { s: "{Ab} nächstem Monat wohne ich in Wien.", it: "Dal mese prossimo abito a Vienna.", x: "a partire da → ab." },
    { s: "Bitte schicken Sie mir die Unterlagen {bis} Freitag.", it: "Mi mandi i documenti entro venerdì.", x: "entro → bis." },
    { s: "{Nach} dem Abendessen sehen wir fern.", it: "Dopo cena guardiamo la TV.", x: "dopo → nach." },
    { s: "{Vor} dem Schlafengehen lese ich immer.", it: "Prima di andare a dormire leggo sempre.", x: "prima di → vor." },
    { s: "{Während} des Studiums habe ich gekellnert.", it: "Durante gli studi ho fatto la cameriera.", x: "durante → während + Genitivo." },
    { s: "{In} der Nacht hat es geschneit.", it: "Di notte ha nevicato.", x: "Eccezione: in der Nacht (non am)." },
    { s: "Ich komme {gegen} sieben Uhr.", it: "Arrivo verso le sette.", x: "verso (ora approssimativa) → gegen." },
    { s: "{Zwischen} Weihnachten und Neujahr habe ich frei.", it: "Tra Natale e Capodanno sono libera.", x: "tra due date → zwischen." },
    { s: "Ich wohne hier {seit} letztem Sommer.", it: "Abito qui dall'estate scorsa.", x: "da (continua) → seit." }
  ],
  altri: [
    { s: "Ich fahre jeden Tag {mit} dem Fahrrad zur Arbeit.", it: "Ogni giorno vado al lavoro in bicicletta.", x: "Mezzo di trasporto → mit." },
    { s: "Heute gehe ich {zu} Fuß.", it: "Oggi vado a piedi.", x: "Eccezione: zu Fuß." },
    { s: "Wie sagt man das {auf} Deutsch?", it: "Come si dice in tedesco?", x: "In una lingua → auf." },
    { s: "Der Ring ist {aus} Gold.", it: "L'anello è d'oro.", x: "Materiale → aus." },
    { s: "Ich trinke Tee {ohne} Zucker.", it: "Bevo il tè senza zucchero.", x: "senza → ohne + Akk." },
    { s: "Das ist ein Geschenk {für} meine Schwester.", it: "È un regalo per mia sorella.", x: "destinatario → für." },
    { s: "{Wegen} des Streiks fällt der Zug aus.", it: "A causa dello sciopero il treno è cancellato.", x: "a causa di → wegen." },
    { s: "{Trotz} des schlechten Wetters sind wir gewandert.", it: "Nonostante il brutto tempo abbiamo fatto un'escursione.", x: "nonostante → trotz." },
    { s: "{Bei} schönem Wetter essen wir im Garten.", it: "Col bel tempo mangiamo in giardino.", x: "condizione → bei." },
    { s: "{Beim} Autofahren telefoniere ich nie.", it: "Quando guido non telefono mai.", x: "durante un'attività → beim + verbo sostantivato." },
    { s: "{Zum} Geburtstag schenke ich ihr ein Buch.", it: "Per il compleanno le regalo un libro.", x: "occasione → zum." },
    { s: "Meiner Meinung {nach} ist das falsch.", it: "Secondo me è sbagliato.", x: "Espressione fissa: meiner Meinung nach (dopo il nome)." },
    { s: "Ich habe die Stelle {durch} eine Freundin gefunden.", it: "Ho trovato il lavoro tramite un'amica.", x: "tramite → durch." },
    { s: "Das Haus wurde {von} einem berühmten Architekten gebaut.", it: "La casa è stata costruita da un architetto famoso.", x: "Agente nel passivo → von." },
    { s: "{Außer} Paul kommen alle.", it: "Vengono tutti tranne Paul.", x: "tranne → außer." },
    { s: "Kinder {unter} sechs Jahren fahren kostenlos.", it: "I bambini sotto i sei anni viaggiano gratis.", x: "meno di → unter." },
    { s: "Die Reparatur hat {über} 300 Euro gekostet.", it: "La riparazione è costata più di 300 euro.", x: "più di → über." },
    { s: "{Mit} 20 Jahren bin ich nach Deutschland gezogen.", it: "A 20 anni mi sono trasferita in Germania.", x: "età → mit." },
    { s: "Er hat {aus} Angst nichts gesagt.", it: "Per paura non ha detto niente.", x: "motivo → aus (aus Angst, aus Liebe)." },
    { s: "Ich bin {gegen} diese Idee.", it: "Sono contrario a questa idea.", x: "contro → gegen." }
  ]
};
const PREPOS_SETS = [["luogo", "Luogo e direzione", "nach, in, zu, bei, an, auf, aus, von", "#0071e3"], ["tempo", "Tempo", "seit, vor, für, in, um, am, im, ab, bis", "#30b06a"], ["altri", "Mezzo, causa, modo", "mit, ohne, aus, wegen, trotz, bei…", "#e8590c"]];

function prepMC(item) {
  const right = item.s.match(/\{([^}|]+)/)[1];
  const pool = ["an", "auf", "in", "nach", "zu", "bei", "mit", "von", "aus", "seit", "vor", "für", "um", "am", "im", "zum", "beim", "über", "durch", "bis", "ab", "gegen", "ohne", "ans", "ins", "zur", "vom"];
  const low = right.toLowerCase(), cap = right[0] === right[0].toUpperCase() && right[0] !== right[0].toLowerCase();
  const fix = w => cap ? w[0].toUpperCase() + w.slice(1) : w;
  const groups = [["nach", "vor", "in", "seit", "für", "ab", "bis", "während", "zwischen"], ["zu", "mit", "bei", "von", "zum", "beim", "vom"], ["um", "gegen", "ab", "bis"], ["für", "gegen", "ohne"], ["durch", "über", "um"], ["aus", "von", "vom"]];
  const excl = new Set(groups.filter(g => g.includes(low.split(" ")[0])).flat());
  const opts = shuffle([low, ...shuffle(pool.filter(p => p !== low && !excl.has(p) && !p.startsWith(low.split(" ")[0]))).slice(0, 3)]).map(fix);
  return { opts, a: opts.indexOf(fix(low)) };
}
function preposChoose() {
  const all = Object.values(PREPOS_EX).flat().filter(x => (x.s.match(/\{/g) || []).length === 1);
  const qs = shuffle(all).slice(0, 15); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); return finished(`${score} su ${qs.length}`, "Quale preposizione?", score * 3, "preposizioni/scegli"); }
    const q = qs[i], { opts, a } = prepMC(q), full = q.s.replace(/\{([^}|]+)[^}]*\}/g, "$1");
    view("Quale preposizione?", `${stepbar(i, qs.length)}<div class="card"><span class="tag">SCEGLI LA PREPOSIZIONE</span>
      <div class="prompt" style="margin:12px 0 4px;font-size:1.2rem;line-height:1.5">${esc(q.s.replace(/\{[^}]+\}/g, "___"))}</div><p class="muted" style="margin:0">${esc(q.it)}</p>
      ${opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${k + 1}</span><span>${esc(o)}</span></button>`).join("")}
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Preposizioni", nav: "pratica" });
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = k === a; if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === a) x.classList.add("ok"); else if (+x.dataset.k === k) x.classList.add("bad"); });
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = `${ok ? pick(PRAISE) : "Non proprio."} <span class="muted">${esc(full)} · ${esc(q.x)}</span>`;
      speak(full); later(() => { i++; draw(); }, ok ? 2200 : 4300);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.k));
    const kh = e => { if (/^[1-4]$/.test(e.key)) answer(+e.key - 1); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}

function preposHub(a) {
  if (a === "scegli") return preposChoose();
  if (a === "test") return runCloze("Test sulle preposizioni", shuffle(Object.values(PREPOS_EX).flatMap(l => shuffle(l).slice(0, 7))), { again: "preposizioni/test", crumb: "Preposizioni", back: "preposizioni", task: "SCRIVI LA PREPOSIZIONE" });
  if (PREPOS_EX[a]) { const s = PREPOS_SETS.find(x => x[0] === a); return runCloze(s[1], shuffle(PREPOS_EX[a]).slice(0, 12), { again: "preposizioni/" + a, crumb: "Preposizioni", back: "preposizioni", task: "SCRIVI LA PREPOSIZIONE" }); }
  if (a === "elenco") return view("Tutte le preposizioni", `
    <div class="card"><p class="muted" style="margin:0">Ogni preposizione con il caso che regge e i suoi significati principali. Per scegliere tra Akkusativ e Dativ vedi anche <a href="#casi">Dativo o Accusativo?</a>.</p></div>
    ${PREPOS.map(([p, c, uses]) => `<div class="card"><h3>${esc(p)} <span class="badge${c.startsWith("Dat") ? " amber" : ""}">+ ${esc(c)}</span></h3>
      ${uses.map(([m, de, it]) => `<div class="vocab"><div style="flex:1"><small class="tag">${esc(m)}</small><br><b>${esc(de)}</b><br><span class="muted">${esc(it)}</span></div>${sayBtn(de)}</div>`).join("")}</div>`).join("")}`, { back: true, crumb: "Preposizioni", nav: "pratica" });
  view("Preposizioni", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#30b06a">${ic("globe")}</span><div style="flex:1"><h2 style="margin:0">Preposizioni: come si usano</h2>
      <small class="muted">Significati, differenze difficili ed esercizi. Il caso (Akk./Dat.) è spiegato in <a href="#casi">Dativo o Accusativo?</a></small></div></div></div>
    <div class="mods">${mod("preposizioni/elenco", "library", "Tutte le preposizioni", "22 schede con significati ed esempi", "#5e5ce6")}</div>
    <div class="sec"><h3>Le differenze più difficili</h3></div>
    ${PREPOS_DIFF.map((d, k) => `<details class="card acc" ${k === 0 ? "open" : ""}><summary><h3 style="margin:0">${esc(d.t)}</h3>${ic("right")}</summary><div class="theory" style="margin-top:12px">${d.h}</div></details>`).join("")}
    <div class="sec"><h3>Esercitati</h3></div>
    <div class="mods">
      ${mod("preposizioni/scegli", "checksq", "Quale preposizione?", "Scegli tra 4 opzioni", "#ff375f")}
      ${PREPOS_SETS.map(s => mod("preposizioni/" + s[0], "pen", s[1], s[2], s[3])).join("")}
      ${mod("preposizioni/test", "grad", "Test misto", "21 frasi da completare", "#b8860b")}
      ${mod("casi", "book", "Dativo o Accusativo?", "Il caso dopo la preposizione", "#e8590c")}
      ${mod("prep", "layers", "Verbi con preposizione", "warten auf, denken an…", "#bf5af2")}
    </div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
