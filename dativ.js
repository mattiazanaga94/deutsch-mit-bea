// ===== Verbi + Dativ: gruppi, frasi-gancio, flashcard IT→DE, errori, pronomi, ripasso a intervalli =====
// DV: [infinito, italiano, gruppo, frase IT, frase DE, trappola/nota]
const DV = [
  ["gefallen", "piacere", "sens", "Il vestito mi piace.", "Das Kleid gefällt mir.", "Come in italiano: la cosa che piace è il soggetto, la persona è al Dativ (mi → mir)."],
  ["schmecken", "piacere (cibo), avere un sapore", "sens", "La zuppa ci piace.", "Die Suppe schmeckt uns.", "Per cibo e bevande: Schmeckt dir der Kuchen?"],
  ["passen", "andare bene, stare (taglia, orario)", "sens", "La giacca ti sta bene.", "Die Jacke passt dir.", "Anche per gli appuntamenti: Passt Ihnen Montag? (Le va bene lunedì?)"],
  ["fehlen", "mancare", "sens", "Mi manchi.", "Du fehlst mir.", "Come in italiano: chi manca è il soggetto. Con vermissen invece è Akkusativ: Ich vermisse dich."],
  ["wehtun", "fare male", "sens", "Mi fa male la testa.", "Der Kopf tut mir weh.", "Separabile: tut … weh. Perfekt: hat wehgetan."],
  ["leidtun", "dispiacere", "sens", "Mi dispiace molto.", "Es tut mir sehr leid.", "Separabile: tut … leid. Er tut mir leid = mi fa pena."],
  ["antworten", "rispondere (a qualcuno)", "kom", "Perché non mi rispondi?", "Warum antwortest du mir nicht?", "Alla persona: Dativ. Alla domanda/e-mail: auf + Akk. (auf die Frage antworten)."],
  ["zuhören", "ascoltare (chi parla)", "kom", "Mi ascolti?", "Hörst du mir zu?", "Separabile. Con hören invece Akkusativ: Ich höre dich / Musik."],
  ["zustimmen", "essere d'accordo con", "kom", "Sono d'accordo con te.", "Ich stimme dir zu.", "Separabile: stimme … zu. Niente preposizione: non «mit dir»!"],
  ["widersprechen", "contraddire", "kom", "Non contraddire tuo padre!", "Widersprich deinem Vater nicht!", "In italiano è diretto (contraddire qualcuno), in tedesco Dativ. Inseparabile, e → i."],
  ["raten", "consigliare (a qualcuno)", "kom", "Che cosa mi consigli?", "Was rätst du mir?", "Con beraten invece Akkusativ: Der Verkäufer berät mich."],
  ["glauben", "credere (a qualcuno)", "kom", "Ti credo.", "Ich glaube dir.", "Persona → Dativ (Ich glaube dir). Cosa → Akk. (Ich glaube das nicht). Credere in → an + Akk."],
  ["helfen", "aiutare", "rel", "Ti aiuto.", "Ich helfe dir.", "Trappola: in italiano è diretto (ti aiuto = aiuto te), in tedesco sempre Dativ."],
  ["danken", "ringraziare", "rel", "La ringrazio.", "Ich danke Ihnen.", "Trappola: in italiano è diretto. Per qualcosa → für + Akk.: Ich danke dir für die Hilfe."],
  ["vertrauen", "fidarsi di", "rel", "Mi fido di te.", "Ich vertraue dir.", "Niente preposizione: non «von dir», ma direttamente il Dativ."],
  ["gratulieren", "fare gli auguri, congratularsi", "rel", "Faccio gli auguri a mia sorella per il compleanno.", "Ich gratuliere meiner Schwester zum Geburtstag.", "Per che cosa → zu + Dat.: zum Geburtstag, zur Hochzeit."],
  ["folgen", "seguire", "rel", "Seguimi!", "Folge mir!", "Trappola: in italiano è diretto. Perfekt con sein: Er ist mir gefolgt."],
  ["begegnen", "incontrare (per caso)", "rel", "Ieri ho incontrato per caso il mio vecchio insegnante.", "Gestern bin ich meinem alten Lehrer begegnet.", "Perfekt con sein! Con treffen invece Akkusativ: Ich treffe dich."],
  ["gehören", "appartenere, essere di", "rel", "Il libro è di mio padre.", "Das Buch gehört meinem Vater.", "Wem gehört das? = Di chi è? Con gehören zu = far parte di."],
  ["schaden", "nuocere, far male a", "rel", "Lo stress nuoce alla salute.", "Stress schadet der Gesundheit.", "Das schadet nicht = non fa male, non guasta."],
  // Dativ (persona) + Akkusativ (cosa)
  ["geben", "dare", "da", "Mi dai il sale?", "Gibst du mir das Salz?", "Chi riceve → Dativ, che cosa → Akkusativ."],
  ["schenken", "regalare", "da", "Che cosa regali a tua madre?", "Was schenkst du deiner Mutter?", "Chi riceve il regalo → Dativ."],
  ["zeigen", "mostrare", "da", "Ti mostro la città.", "Ich zeige dir die Stadt.", "A chi mostro → Dativ, che cosa → Akkusativ."],
  ["erklären", "spiegare", "da", "Mi può spiegare la regola?", "Können Sie mir die Regel erklären?", "A chi spiego → Dativ."],
  ["schicken", "mandare", "da", "Ti mando il link.", "Ich schicke dir den Link.", "Anche: an + Akk. (Ich schicke den Link an dich)."],
  ["bringen", "portare", "da", "Il cameriere ci porta il conto.", "Der Kellner bringt uns die Rechnung.", "A chi porto → Dativ."],
  ["empfehlen", "consigliare (qualcosa)", "da", "Che cosa ci consiglia?", "Was empfehlen Sie uns?", "e → ie: du empfiehlst, er empfiehlt."],
  ["leihen", "prestare", "da", "Mi presti la tua bici?", "Leihst du mir dein Fahrrad?", "Prendere in prestito: sich (Dat.) etwas leihen / ausleihen."],
  ["erzählen", "raccontare", "da", "Raccontami tutto!", "Erzähl mir alles!", "Raccontare di qualcosa → von + Dat."],
  ["sagen", "dire", "da", "Dimmi la verità.", "Sag mir die Wahrheit.", "A chi dico → Dativ."],
  ["kaufen", "comprare (per qualcuno)", "da", "Compro un gelato ai bambini.", "Ich kaufe den Kindern ein Eis.", "Plurale Dativ con -n: den Kinder<b>n</b>."]
];
const DV_GROUPS = {
  sens: { t: "Sensazioni: mi piace, mi manca, mi fa male", c: "#ff375f", hook: ["Das Essen schmeckt mir, aber der Kopf tut mir weh.", "Il cibo mi piace, ma mi fa male la testa."],
    tip: "Funzionano come «piacere» in italiano: la cosa è il soggetto, la persona che prova la sensazione è al Dativ. Se in italiano dici <b>mi</b> piace / <b>mi</b> manca / <b>mi</b> fa male, in tedesco è <b>mir</b>." },
  kom: { t: "Comunicazione: rispondere, ascoltare, credere", c: "#5e5ce6", hook: ["Ich höre dir zu, aber ich stimme dir nicht zu.", "Ti ascolto, ma non sono d'accordo con te."],
    tip: "Verbi del parlare e del giudicare <b>rivolti a una persona</b>: rispondere <b>a</b> te, credere <b>a</b> te, consigliare <b>a</b> te → <b>dir</b>." },
  rel: { t: "Relazioni: aiutare, ringraziare, fidarsi", c: "#0071e3", hook: ["Ich danke dir, weil du mir hilfst und ich dir vertraue.", "Ti ringrazio perché mi aiuti e mi fido di te."],
    tip: "Il gruppo più insidioso: in italiano molti sono <b>diretti</b> (aiuto <b>te</b>, ringrazio <b>te</b>, seguo <b>te</b>), ma in tedesco vogliono il Dativ. Impara la frase-gancio a memoria." },
  da: { t: "Dativ + Akkusativ: dare qualcosa a qualcuno", c: "#30b06a", hook: ["Ich gebe dir das Buch. – Ich gebe es dir.", "Ti do il libro. – Te lo do."],
    tip: "Persona che riceve → <b>Dativ</b>. Cosa → <b>Akkusativ</b>. L'ordine cambia con i pronomi: vedi la tabella qui sotto." }
};
const DV_GROUP_ORDER = ["sens", "kom", "rel", "da"];

// Completa pronome/articolo: v = verbo
const DV_GAP = [
  { v: "helfen", s: "Kannst du {mir} beim Umzug helfen?", hint: "ich", it: "Puoi aiutarmi con il trasloco?" },
  { v: "helfen", s: "Wir helfen {unserer} Nachbarin.", hint: "unsere Nachbarin", it: "Aiutiamo la nostra vicina." },
  { v: "danken", s: "Ich danke {Ihnen} für Ihre Hilfe.", hint: "Sie", it: "La ringrazio per il Suo aiuto." },
  { v: "danken", s: "Hast du {deinem} Opa schon gedankt?", hint: "dein Opa", it: "Hai già ringraziato tuo nonno?" },
  { v: "gefallen", s: "Die Wohnung gefällt {uns} sehr.", hint: "wir", it: "L'appartamento ci piace molto." },
  { v: "gefallen", s: "Gefällt {dir} der Film?", hint: "du", it: "Ti piace il film?" },
  { v: "gehören", s: "Wem gehört der Schlüssel? – Er gehört {meinem} Bruder.", hint: "mein Bruder", it: "Di chi è la chiave? – È di mio fratello." },
  { v: "gehören", s: "Gehört die Tasche {Ihnen}?", hint: "Sie", it: "La borsa è Sua?" },
  { v: "gratulieren", s: "Wir gratulieren {dir} zum Geburtstag!", hint: "du", it: "Ti facciamo gli auguri di compleanno!" },
  { v: "gratulieren", s: "Hast du {der} Chefin zur Beförderung gratuliert?", hint: "die Chefin", it: "Ti sei congratulato con la capa per la promozione?" },
  { v: "antworten", s: "Warum antwortest du {mir} nicht?", hint: "ich", it: "Perché non mi rispondi?" },
  { v: "antworten", s: "Der Lehrer antwortet {den} Schülern.", hint: "die Schüler (pl.)", it: "L'insegnante risponde agli studenti." },
  { v: "folgen", s: "Folgen Sie {mir} bitte!", hint: "ich", it: "Mi segua, per favore!" },
  { v: "folgen", s: "Der Hund folgt {dem} Kind überallhin.", hint: "das Kind", it: "Il cane segue il bambino dappertutto." },
  { v: "passen", s: "Die Hose passt {mir} nicht mehr.", hint: "ich", it: "I pantaloni non mi vanno più." },
  { v: "passen", s: "Passt {Ihnen} der Termin am Freitag?", hint: "Sie", it: "Le va bene l'appuntamento di venerdì?" },
  { v: "schmecken", s: "Schmeckt {euch} die Pizza?", hint: "ihr", it: "Vi piace la pizza?" },
  { v: "schmecken", s: "Das Essen hat {den} Gästen gut geschmeckt.", hint: "die Gäste (pl.)", it: "Il cibo è piaciuto agli ospiti." },
  { v: "fehlen", s: "Du fehlst {mir} so sehr!", hint: "ich", it: "Mi manchi tantissimo!" },
  { v: "fehlen", s: "Was fehlt {dir}? Bist du krank?", hint: "du", it: "Che cos'hai? Sei malato?" },
  { v: "vertrauen", s: "Ich vertraue {dir} total.", hint: "du", it: "Mi fido completamente di te." },
  { v: "vertrauen", s: "Sie vertraut {ihrem} Arzt.", hint: "ihr Arzt", it: "Si fida del suo medico." },
  { v: "glauben", s: "Ich glaube {dir} kein Wort.", hint: "du", it: "Non ti credo neanche una parola." },
  { v: "glauben", s: "Warum glaubst du {ihm} nicht?", hint: "er", it: "Perché non gli credi?" },
  { v: "zuhören", s: "Hör {mir} bitte zu!", hint: "ich", it: "Ascoltami, per favore!" },
  { v: "zuhören", s: "Die Kinder hören {der} Lehrerin aufmerksam zu.", hint: "die Lehrerin", it: "I bambini ascoltano attentamente la maestra." },
  { v: "zustimmen", s: "Da stimme ich {dir} völlig zu.", hint: "du", it: "Su questo sono completamente d'accordo con te." },
  { v: "zustimmen", s: "Wir stimmen {Ihrem} Vorschlag zu.", hint: "Ihr Vorschlag", it: "Siamo d'accordo con la Sua proposta." },
  { v: "widersprechen", s: "Ich muss {Ihnen} leider widersprechen.", hint: "Sie", it: "Purtroppo devo contraddirLa." },
  { v: "widersprechen", s: "Er widerspricht {seinem} Chef nie.", hint: "sein Chef", it: "Non contraddice mai il suo capo." },
  { v: "raten", s: "Was rätst du {mir}?", hint: "ich", it: "Che cosa mi consigli?" },
  { v: "raten", s: "Der Arzt hat {ihr} geraten, mehr zu schlafen.", hint: "sie (lei)", it: "Il medico le ha consigliato di dormire di più." },
  { v: "schaden", s: "Zu viel Zucker schadet {der} Gesundheit.", hint: "die Gesundheit", it: "Troppo zucchero nuoce alla salute." },
  { v: "schaden", s: "Ein bisschen Sport schadet {dir} nicht.", hint: "du", it: "Un po' di sport non ti fa male." },
  { v: "begegnen", s: "Gestern bin ich {meiner} Ex-Freundin begegnet.", hint: "meine Ex-Freundin", it: "Ieri ho incontrato per caso la mia ex." },
  { v: "begegnen", s: "Im Park sind wir {einem} alten Freund begegnet.", hint: "ein alter Freund", it: "Al parco abbiamo incontrato un vecchio amico." },
  { v: "wehtun", s: "Mein Rücken tut {mir} weh.", hint: "ich", it: "Mi fa male la schiena." },
  { v: "wehtun", s: "Tut {dir} der Fuß noch weh?", hint: "du", it: "Ti fa ancora male il piede?" },
  { v: "leidtun", s: "Es tut {mir} leid, dass ich zu spät bin.", hint: "ich", it: "Mi dispiace di essere in ritardo." },
  { v: "leidtun", s: "Der arme Hund tut {uns} leid.", hint: "wir", it: "Il povero cane ci fa pena." }
];

// Dativ + Akkusativ con pronomi e articoli
const DA_EX = [
  { v: "geben", s: "Ich gebe dem Mann das Buch. → Ich gebe {es} {ihm}.", x: "Due pronomi: prima l'Akkusativ (es), poi il Dativ (ihm)." },
  { v: "schenken", s: "Wir schenken unserer Mutter die Blumen. → Wir schenken {sie} {ihr}.", x: "Due pronomi: Akk. (sie = die Blumen) prima del Dat. (ihr = der Mutter)." },
  { v: "zeigen", s: "Ich zeige den Touristen den Weg. → Ich zeige {ihn} {ihnen}.", x: "Due pronomi: Akk. (ihn = den Weg) prima del Dat. (ihnen = den Touristen)." },
  { v: "erklären", s: "Der Lehrer erklärt dem Schüler die Regel. → Der Lehrer erklärt {sie} {ihm}.", x: "Due pronomi: Akk. (sie) prima del Dat. (ihm)." },
  { v: "schicken", s: "Ich schicke meiner Freundin das Foto. → Ich schicke {ihr} das Foto.", x: "Pronome + nome: il pronome va sempre prima (ihr das Foto)." },
  { v: "bringen", s: "Der Kellner bringt den Gästen die Rechnung. → Der Kellner bringt {ihnen} die Rechnung.", x: "Pronome Dativ prima del nome Akkusativ." },
  { v: "empfehlen", s: "Ich empfehle dir diesen Film. → Ich empfehle {ihn} {dir}.", x: "Due pronomi: Akk. (ihn) prima del Dat. (dir)." },
  { v: "leihen", s: "Leihst du mir dein Auto? → Leihst du {es} {mir}?", x: "Due pronomi: Akk. (es) prima del Dat. (mir)." },
  { v: "erzählen", s: "Oma erzählt den Kindern eine Geschichte. → Oma erzählt {ihnen} eine Geschichte.", x: "Pronome Dativ plurale: ihnen." },
  { v: "sagen", s: "Sag deinem Bruder die Wahrheit! → Sag {sie} {ihm}!", x: "Due pronomi: Akk. (sie = die Wahrheit) prima del Dat. (ihm)." },
  { v: "kaufen", s: "Ich kaufe meinem Sohn einen Hund. → Ich kaufe {ihm} einen Hund.", x: "Pronome Dativ prima del nome Akkusativ." },
  { v: "geben", s: "Gib dem Kind den Ball! → Gib {ihn} dem Kind!", x: "Pronome Akk. + nome Dat.: il pronome va prima (ihn dem Kind)." },
  { v: "schenken", s: "Was schenkst du deiner Schwester? – Ich schenke {ihr} ein Buch.", x: "deiner Schwester → ihr (Dativ femminile)." },
  { v: "zeigen", s: "Kannst du mir die Fotos zeigen? → Kannst du {sie} {mir} zeigen?", x: "Due pronomi: Akk. (sie = die Fotos) prima del Dat. (mir)." },
  { v: "erklären", s: "Erklären Sie mir bitte das Problem. → Erklären Sie {es} {mir} bitte.", x: "Due pronomi: Akk. (es) prima del Dat. (mir)." },
  { v: "schicken", s: "Ich schicke dem Chef die E-Mail. → Ich schicke {sie} dem Chef.", x: "Pronome Akk. + nome Dat.: il pronome va prima." },
  { v: "bringen", s: "Bringst du mir den Kaffee? → Bringst du {ihn} {mir}?", x: "Due pronomi: Akk. (ihn) prima del Dat. (mir)." },
  { v: "leihen", s: "Ich leihe meinen Freunden mein Zelt. → Ich leihe {es} {ihnen}.", x: "Due pronomi: Akk. (es = das Zelt) prima del Dat. (ihnen)." },
  { v: "sagen", s: "Hast du deiner Mutter die Nachricht schon gesagt? → Hast du {sie} {ihr} schon gesagt?", x: "Due pronomi: Akk. (sie) prima del Dat. (ihr)." },
  { v: "kaufen", s: "Er kauft seiner Frau die Kette. → Er kauft {sie} {ihr}.", x: "Due pronomi: Akk. (sie = die Kette) prima del Dat. (ihr = seiner Frau)." },
  { v: "zeigen", s: "Ich zeige {dem} Touristen {den} Weg.", hint: "der Tourist · der Weg", x: "Due nomi: prima il Dativ (a chi?), poi l'Akkusativ (che cosa?). Tourist → dem Touristen (n-Deklination)." },
  { v: "schenken", s: "Wir schenken {unserer} Lehrerin {einen} Blumenstrauß.", hint: "unsere Lehrerin · ein Blumenstrauß", x: "Dativ femminile -er, Akkusativ maschile einen." },
  { v: "empfehlen", s: "Der Arzt empfiehlt {dem} Patienten {eine} Pause.", hint: "der Patient · eine Pause", x: "Dativ maschile dem (Patienten: n-Deklination), Akkusativ femminile eine." },
  { v: "erzählen", s: "Ich erzähle {meinen} Freunden {den} Witz.", hint: "meine Freunde (pl.) · der Witz", x: "Dativ plurale meinen Freunden (-n), Akkusativ maschile den." }
];

// Trova l'errore: [frase con *parola sbagliata*, correzione, perché]; correzione null = la frase è giusta
const DV_ERR = [
  ["Kannst du *mich* helfen?", "mir", "helfen + Dativ → mir."],
  ["Ich danke *dich* für das Geschenk.", "dir", "danken + Dativ → dir."],
  ["Das Kleid gefällt *mich* sehr.", "mir", "gefallen + Dativ → mir."],
  ["Das Auto gehört *meinen* Vater.", "meinem", "gehören + Dativ → meinem Vater."],
  ["Ich gratuliere *dich* zum Geburtstag.", "dir", "gratulieren + Dativ → dir."],
  ["Bitte antworte *mich* schnell.", "mir", "antworten (a qualcuno) + Dativ → mir."],
  ["Der Hund folgt *den* Mann.", "dem", "folgen + Dativ → dem Mann."],
  ["Die Schuhe passen *ihn* nicht.", "ihm", "passen + Dativ → ihm."],
  ["Schmeckt *dich* der Kuchen?", "dir", "schmecken + Dativ → dir."],
  ["Du fehlst *mich* so sehr.", "mir", "fehlen + Dativ → mir (chi manca è il soggetto)."],
  ["Ich vertraue *meinen* Chef nicht.", "meinem", "vertrauen + Dativ → meinem Chef."],
  ["Ich glaube *dich* nicht.", "dir", "glauben a una persona + Dativ → dir."],
  ["Hört ihr *mich* zu?", "mir", "zuhören + Dativ → mir."],
  ["Ich stimme *dich* zu.", "dir", "zustimmen + Dativ → dir."],
  ["Er widerspricht *seine* Mutter.", "seiner", "widersprechen + Dativ → seiner Mutter."],
  ["Was rätst du *mich*?", "mir", "raten + Dativ → mir."],
  ["Stress schadet *die* Gesundheit.", "der", "schaden + Dativ → der Gesundheit."],
  ["Gestern *habe* ich meinem Lehrer begegnet.", "bin", "begegnen vuole sein al Perfekt: ich bin … begegnet."],
  ["Mein Kopf tut *mich* weh.", "mir", "wehtun + Dativ → mir."],
  ["Es tut *mich* leid.", "mir", "leidtun + Dativ → Es tut mir leid."],
  ["Ich schenke *meine* Schwester ein Buch.", "meiner", "Chi riceve il regalo → Dativ: meiner Schwester."],
  ["Kannst du *mich* den Weg zeigen?", "mir", "zeigen: a chi? → Dativ mir; che cosa? → den Weg."],
  ["Ich erkläre *dich* die Regel.", "dir", "erklären: a chi? → Dativ dir."],
  ["Wir helfen den *Kinder*.", "Kindern", "Dativ plurale: il nome prende -n → den Kindern."],
  ["Ich besuche *dir* morgen.", "dich", "Trappola: besuchen vuole l'Akkusativ → dich."],
  ["Ich frage *dir* etwas.", "dich", "Trappola: fragen vuole l'Akkusativ, anche se in italiano «chiedo a te»."],
  ["Ich rufe *dir* heute Abend an.", "dich", "Trappola: anrufen vuole l'Akkusativ → dich."],
  ["Ich treffe *meinem* Freund im Café.", "meinen", "Trappola: treffen vuole l'Akkusativ (begegnen invece il Dativ)."],
  ["Ich vermisse *dir*.", "dich", "Trappola: vermissen vuole l'Akkusativ. Con il Dativ si dice: Du fehlst mir."],
  ["Ich helfe dir gern.", null, "Giusta: helfen + Dativ."],
  ["Das Essen schmeckt mir.", null, "Giusta: schmecken + Dativ."],
  ["Ich sehe dich morgen.", null, "Giusta: sehen vuole l'Akkusativ."],
  ["Die Jacke gehört meiner Schwester.", null, "Giusta: gehören + Dativ femminile."],
  ["Ich gebe es ihm.", null, "Giusta: due pronomi, prima l'Akkusativ poi il Dativ."],
  ["Hör mir zu!", null, "Giusta: zuhören + Dativ."],
  ["Ich vermisse dich.", null, "Giusta: vermissen vuole l'Akkusativ."]
];

// Dativ o Akkusativ? Verbi trappola che vogliono l'Akkusativ: [verbo, italiano, esempio, nota]
const DV_AKK = [
  ["besuchen", "visitare, andare a trovare", "Ich besuche dich.", ""],
  ["fragen", "chiedere (a qualcuno)", "Ich frage dich.", "In italiano «chiedo a te», ma in tedesco Akkusativ."],
  ["anrufen", "telefonare (a qualcuno)", "Ich rufe dich an.", "In italiano «telefono a te», ma in tedesco Akkusativ."],
  ["treffen", "incontrare (su appuntamento)", "Ich treffe dich um acht.", "Incontrare per caso → begegnen + Dativ."],
  ["vermissen", "sentire la mancanza", "Ich vermisse dich.", "Stesso significato di «Du fehlst mir», ma Akkusativ."],
  ["unterstützen", "sostenere, aiutare", "Ich unterstütze dich.", "Significa quasi «aiutare», ma vuole l'Akkusativ (helfen il Dativ)."],
  ["hören", "sentire", "Ich höre dich nicht.", "Ascoltare chi parla → zuhören + Dativ."],
  ["beraten", "consigliare (qualcuno), dare consulenza", "Der Verkäufer berät mich.", "raten + Dativ, beraten + Akkusativ."],
  ["bitten", "pregare, chiedere (un favore)", "Ich bitte dich um Hilfe.", ""],
  ["kennen", "conoscere", "Ich kenne ihn gut.", ""],
  ["verstehen", "capire", "Ich verstehe dich.", ""],
  ["lieben", "amare", "Ich liebe dich.", ""],
  ["brauchen", "aver bisogno di", "Ich brauche dich.", ""],
  ["beglückwünschen", "congratularsi con", "Ich beglückwünsche dich.", "Stesso significato di gratulieren, ma Akkusativ."]
];

const DV_TABLE = `
  <table class="tbl"><tr><th>Che cosa c'è nella frase</th><th>Ordine</th><th>Esempio</th></tr>
    <tr><td>due <b>nomi</b></td><td><b>Dativ</b> → Akkusativ</td><td>Ich gebe <b>dem Mann</b> das Buch.</td></tr>
    <tr><td><b>pronome</b> + nome</td><td><b>pronome</b> prima</td><td>Ich gebe <b>ihm</b> das Buch. · Ich gebe <b>es</b> dem Mann.</td></tr>
    <tr><td>due <b>pronomi</b></td><td><b>Akkusativ</b> → Dativ</td><td>Ich gebe <b>es ihm</b>.</td></tr></table>
  <p style="margin-top:10px"><b>Come ricordarlo:</b> i pronomi sono corti e vanno avanti. Tra due pronomi vince l'Akkusativ: «es ihm», «sie mir», «ihn dir» (come in italiano «te <b>lo</b> do» si dice <i>ich gebe <b>es</b> dir</i>).</p>
  <table class="tbl" style="margin-top:8px"><tr><th>Pronomi</th><th>ich</th><th>du</th><th>er</th><th>sie</th><th>es</th><th>wir</th><th>ihr</th><th>sie/Sie</th></tr>
    <tr><td><b>Akk.</b></td><td>mich</td><td>dich</td><td>ihn</td><td>sie</td><td>es</td><td>uns</td><td>euch</td><td>sie/Sie</td></tr>
    <tr><td><b>Dat.</b></td><td><b>mir</b></td><td><b>dir</b></td><td><b>ihm</b></td><td><b>ihr</b></td><td><b>ihm</b></td><td>uns</td><td>euch</td><td><b>ihnen/Ihnen</b></td></tr></table>`;

// ---- Ripasso a intervalli (stato in S.dv: { verbo: {box, due, ok, ko} }, S.dvNew: {d, n})
const DV_GAPS_DAYS = [1, 1, 3, 7, 14, 30];
const DV_NEW_PER_DAY = 5;
const dvAdd = n => dstr(new Date(Date.now() + n * 864e5));
const dvSt = inf => (S.dv || {})[inf];
function dvMark(inf, ok, schedule) {
  S.dv = S.dv || {}; const s = S.dv[inf] || { box: 0, due: today(), ok: 0, ko: 0 };
  if (ok) { s.ok++; if (schedule) { s.box = Math.min(5, s.box + 1); s.due = dvAdd(DV_GAPS_DAYS[s.box]); } }
  else { s.ko++; s.box = 0; s.due = dvAdd(1); }
  S.dv[inf] = s; save();
}
const dvVerb = inf => DV.find(v => v[0] === inf);
const dvDue = () => DV.filter(v => { const s = dvSt(v[0]); return s && s.due <= today(); });
const dvNewLeft = () => { const n = S.dvNew && S.dvNew.d === today() ? S.dvNew.n : 0; return Math.max(0, DV_NEW_PER_DAY - n); };
const dvUnseen = () => DV.filter(v => !dvSt(v[0]));
const dvKnown = () => DV.filter(v => (dvSt(v[0]) || {}).box >= 3).length;
const dvTodayDeck = () => dvDue().concat(dvUnseen().slice(0, dvNewLeft()));
function dvIntroduce(inf) { if (dvSt(inf)) return; S.dvNew = S.dvNew && S.dvNew.d === today() ? S.dvNew : { d: today(), n: 0 }; S.dvNew.n++; }

function dvHub(a) {
  if (a === "oggi") return dvCards(dvTodayDeck(), true);
  if (a === "card") return dvCards(null, false);
  if (a === "gruppi") return dvGroups();
  if (a === "errore") return dvFindError();
  if (a === "riconosci") return dvWhichCase();
  if (a === "pronome") return runCloze("Completa il pronome", shuffle(DV_GAP).slice(0, 12).map(dvItem), { again: "dativ/pronome", crumb: "Verbi + Dativ", back: "dativ", task: "METTI IL PRONOME O L'ARTICOLO AL DATIV" });
  if (a === "dadk") return runCloze("Dativ + Akkusativ", shuffle(DA_EX).slice(0, 12).map(dvItem), { again: "dativ/dadk", crumb: "Verbi + Dativ", back: "dativ", task: "SOSTITUISCI CON I PRONOMI O COMPLETA" });
  if (a === "test") {
    const items = shuffle(shuffle(DV_GAP).slice(0, 10).concat(shuffle(DA_EX).slice(0, 6))).map(dvItem);
    return runCloze("Test Verbi + Dativ", items, { again: "dativ/test", crumb: "Verbi + Dativ", back: "dativ" });
  }
  const deck = dvTodayDeck().length, due = dvDue().length, known = dvKnown(), seen = DV.length - dvUnseen().length;
  view("Verbi + Dativ", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#ff375f">${ic("target")}</span><div style="flex:1"><h2 style="margin:0">Verbi + Dativ</h2>
      <small class="muted">${DV.length} verbi · ${seen} iniziati · ${known} consolidati${due ? ` · ${due} da ripassare oggi` : ""}</small></div></div>
      <div class="progress thin" style="margin-top:14px"><i style="width:${known / DV.length * 100}%"></i></div>
      <p class="muted" style="margin:14px 0 0">Ogni giorno: i verbi in scadenza più ${DV_NEW_PER_DAY} nuovi. Quelli che sai tornano dopo 1, 3, 7, 14 e 30 giorni; quelli sbagliati domani.</p>
      <div class="row" style="margin-top:14px">${deck ? `<button class="btn" data-go="dativ/oggi">${ic("refresh")} Ripasso di oggi · ${deck} verbi</button>` : `<span class="badge ok">${ic("check")} Ripasso di oggi completato</span><button class="btn ghost" data-go="dativ/card">Ripassa comunque</button>`}</div></div>
    <details class="card acc"><summary><h3 style="margin:0">Come riconoscerli</h3>${ic("right")}</summary><div class="theory" style="margin-top:12px">
      <p><b>Trucco:</b> se in italiano puoi dire «<b>a</b> qualcuno» o usi <b>mi, ti, gli, le</b> (mi piace, ti rispondo, gli credo), in tedesco quasi sempre è <b>Dativ</b>.</p>
      <p><b>Attenzione alle trappole</b>, dove l'italiano è diretto ma il tedesco vuole il Dativ: <i>helfen</i> (aiuto <b>te</b> → ich helfe <b>dir</b>), <i>danken, folgen, gratulieren, widersprechen, vertrauen</i>.</p>
      <p>E all'inverso, verbi che in italiano hanno «a» ma vogliono l'<b>Akkusativ</b>: <i>fragen</i> (chiedo a te → ich frage <b>dich</b>), <i>anrufen</i> (telefono a te → ich rufe <b>dich</b> an).</p>
      <p><b>Coppie da non confondere:</b> fehlen + Dat. / vermissen + Akk. · begegnen + Dat. / treffen + Akk. · zuhören + Dat. / hören + Akk. · raten + Dat. / beraten + Akk. · helfen + Dat. / unterstützen + Akk.</p></div></details>
    <details class="card acc"><summary><h3 style="margin:0">Dativ + Akkusativ: l'ordine delle parole</h3>${ic("right")}</summary><div class="theory" style="margin-top:12px">${DV_TABLE}</div></details>
    <div class="sec"><h3>Impara</h3></div>
    <div class="mods">
      ${mod("dativ/gruppi", "library", "Gruppi e frasi-gancio", "4 gruppi, una frase da sapere a memoria per ognuno", "#5e5ce6")}
      ${mod("dativ/card", "layers", "Flashcard italiano → tedesco", "«Ti credo» → Ich glaube dir", "#0071e3")}
    </div>
    <div class="sec"><h3>Esercitati</h3></div>
    <div class="mods">
      ${mod("dativ/pronome", "pen", "Completa il pronome", "Das Kleid gefällt ___ (ich) → mir", "#30b06a")}
      ${mod("dativ/errore", "search", "Trova l'errore", "Ich helfe dich → dir", "#ff375f")}
      ${mod("dativ/riconosci", "checksq", "Dativ o Akkusativ?", "helfen o unterstützen? fehlen o vermissen?", "#e8590c")}
      ${mod("dativ/dadk", "pen", "Dativ + Akkusativ", "Ich gebe dem Mann das Buch → Ich gebe es ihm", "#0d9488")}
      ${mod("dativ/test", "grad", "Test misto", "16 frasi su tutti i verbi", "#b8860b")}
    </div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
function dvItem(it) {
  const v = dvVerb(it.v);
  return Object.assign({}, it, { hint: it.hint ? `${it.v} · ${it.hint}` : it.v, it: it.it || (v ? v[1] : ""), x: it.x || (v ? `${v[0]} + Dativ · ${v[5].replace(/<[^>]+>/g, "")}` : ""), mark: ok => dvMark(it.v, ok, false) });
}
function dvGroups() {
  view("Gruppi e frasi-gancio", `
    <p class="muted" style="margin:0 0 16px">Impara a memoria la frase-gancio di ogni gruppo e ripetila ad alta voce: quando hai un dubbio, ti basta ricordare la frase.</p>
    ${DV_GROUP_ORDER.map(g => { const G = DV_GROUPS[g]; return `<div class="card"><h3 style="margin-top:0"><span style="background:${G.c};width:12px;height:12px;display:inline-block;border-radius:4px;margin-right:8px"></span>${esc(G.t)}</h3>
      <div class="vocab" style="background:var(--primary-soft);border-radius:12px;padding:12px 14px"><div style="flex:1"><b>${esc(G.hook[0])}</b><br><small class="muted">${esc(G.hook[1])}</small></div>${sayBtn(G.hook[0])}</div>
      <p class="theory" style="margin:12px 0 4px">${G.tip}</p>
      ${g === "da" ? `<div class="theory">${DV_TABLE}</div>` : ""}
      ${DV.filter(v => v[2] === g).map(v => { const st = dvSt(v[0]); return `<div class="vocab"><div style="flex:1"><b>${esc(v[0])}</b> <span class="muted">· ${esc(v[1])}</span>${st && st.box >= 3 ? ` <span class="badge ok">${ic("check")}</span>` : ""}<br><small>${esc(v[4])}</small> <small class="muted">${esc(v[3])}</small><br><small class="muted">${v[5]}</small></div>${sayBtn(v[0] + ". " + v[4])}</div>`; }).join("")}</div>`; }).join("")}
    <div class="row"><button class="btn" data-go="dativ/card">${ic("layers")} Flashcard</button><button class="btn ghost" data-go="dativ">Torna agli esercizi</button></div>`,
    { back: true, crumb: "Verbi + Dativ", nav: "pratica" });
}
function dvCards(deck, daily) {
  let cards;
  if (deck) cards = shuffle(deck.slice());
  else {
    const weak = DV.filter(v => (dvSt(v[0]) || { box: 0 }).box < 3);
    cards = shuffle(weak).concat(shuffle(DV.filter(v => !weak.includes(v)))).slice(0, 15);
  }
  if (!cards.length) return emptyState("Ripasso di oggi", "Nessun verbo da ripassare oggi. Torna domani oppure usa le flashcard libere.");
  const total = cards.length, missed = new Set(); let i = 0, known = 0;
  const draw = () => {
    if (i >= cards.length) { const xp = 6 + known * 2; addXP(xp); return finished(daily ? "Ripasso di oggi completato" : "Mazzo completato", `${known} su ${total} giusti al primo colpo${daily ? " · i prossimi ripassi sono programmati" : ""}`, xp, daily ? "dativ" : "dativ/card"); }
    const v = cards[i], G = DV_GROUPS[v[2]];
    view(daily ? "Ripasso di oggi" : "Flashcard Verbi + Dativ", `${stepbar(i, cards.length)}
      <div class="flash" id="fc"><div class="inner"><div class="face"><span class="tag">COME SI DICE IN TEDESCO?</span><div class="prompt" style="margin-top:10px;font-size:1.5rem">${esc(v[3])}</div><small>verbo: ${esc(v[1])}</small></div>
        <div class="face back"><span class="tag" style="color:#fff;opacity:.8">${esc(v[0].toUpperCase())} + DATIV</span><div class="prompt" style="margin-top:10px;font-size:1.5rem">${esc(v[4])}</div><small>${esc(v[5].replace(/<[^>]+>/g, ""))}</small></div></div></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" data-say="${esc(v[4])}">${ic("volume")} Ascolta</button>
        <button class="btn danger" id="no">${ic("refresh")} Da ripassare</button><button class="btn" id="yes">${ic("check")} La so</button></div>
      <p class="muted" style="text-align:center;margin-top:14px">Di' la frase ad alta voce in tedesco, poi gira la carta.<br><small>Gruppo: ${esc(G.t)} · «${esc(G.hook[0])}»</small><br><span class="kbd">Spazio</span> gira · <span class="kbd">1</span> da ripassare · <span class="kbd">2</span> la so</p>`, { back: true, crumb: "Verbi + Dativ", nav: "pratica" });
    const fc = $("fc"); let flipped = false;
    const flip = () => { fc.classList.toggle("flip"); if (!flipped) { flipped = true; speak(v[4]); } };
    fc.onclick = flip;
    const yes = () => { if (!missed.has(v[0])) { dvIntroduce(v[0]); dvMark(v[0], true, true); known++; } i++; draw(); };
    const no = () => { if (!missed.has(v[0])) { dvIntroduce(v[0]); dvMark(v[0], false); missed.add(v[0]); cards.push(v); } i++; draw(); };
    $("yes").onclick = yes; $("no").onclick = no;
    const kh = e => { if (e.target.tagName === "INPUT") return; if (e.code === "Space") { e.preventDefault(); flip(); } if (e.key === "2") yes(); if (e.key === "1") no(); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
function dvFindError() {
  const qs = shuffle(DV_ERR.filter(e => e[1])).slice(0, 10).concat(shuffle(DV_ERR.filter(e => !e[1])).slice(0, 2));
  shuffle(qs); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); return finished(`${score} su ${qs.length}`, score >= 10 ? "Occhio da esaminatore." : "Rileggi i gruppi e le trappole, poi riprova.", score * 3, "dativ/errore"); }
    const [s, fix, why] = qs[i], words = s.split(" ");
    const bad = words.findIndex(w => w.includes("*")), right = words.map((w, k) => k === bad ? w.replace(/\*[^*]+\*/, fix) : w).join(" ");
    view("Trova l'errore", `${stepbar(i, qs.length)}<div class="card"><span class="tag">TOCCA LA PAROLA SBAGLIATA</span>
      <div class="prompt" style="margin:14px 0;font-size:1.3rem;line-height:2;display:flex;flex-wrap:wrap;gap:6px">${words.map((w, k) => `<button class="opt" data-k="${k}" style="width:auto;margin:0;padding:6px 12px">${esc(w.replace(/\*/g, ""))}</button>`).join("")}</div>
      <button class="btn ghost" id="none">${ic("check")} Non ci sono errori</button>
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Verbi + Dativ", nav: "pratica" });
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = fix ? k === bad : k === -1; if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (fix && +x.dataset.k === bad) x.classList.add("ok"); else if (+x.dataset.k === k) x.classList.add("bad"); });
      $("none").disabled = true;
      const m = why.match(/^(?:Trappola: )?([a-zäöüß]+)/), v = m && dvVerb(m[1]); if (v) dvMark(v[0], ok, false);
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.innerHTML = `${ok ? pick(PRAISE) : fix ? "L'errore era un altro." : "La frase era giusta."} ${fix ? `<b>${esc(right)}</b>` : ""} <span class="muted">${esc(why)}</span>`;
      speak(right); later(() => { i++; draw(); }, ok ? 2600 : 5000);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.k));
    $("none").onclick = () => answer(-1);
  };
  draw();
}
function dvWhichCase() {
  const pool = DV.filter(v => v[2] !== "da").map(v => ({ v: v[0], it: v[1], ex: v[4], k: "D", note: v[5] }))
    .concat(DV.filter(v => v[2] === "da").map(v => ({ v: v[0], it: v[1], ex: v[4], k: "DA", note: v[5] })))
    .concat(DV_AKK.map(a => ({ v: a[0], it: a[1], ex: a[2], k: "A", note: a[3] })));
  const akk = shuffle(pool.filter(p => p.k === "A")).slice(0, 6), rest = shuffle(pool.filter(p => p.k !== "A")).slice(0, 9);
  const qs = shuffle(akk.concat(rest)), names = { D: "Dativ", A: "Akkusativ", DA: "Dativ + Akkusativ" }, keys = ["D", "A", "DA"]; let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); return finished(`${score} su ${qs.length}`, score >= 12 ? "Distingui bene le trappole." : "Rileggi «Come riconoscerli» e riprova.", score * 3, "dativ/riconosci"); }
    const q = qs[i];
    view("Dativ o Akkusativ?", `${stepbar(i, qs.length)}<div class="card"><span class="tag">CHE CASO VUOLE IL VERBO?</span>
      <div class="prompt" style="margin:12px 0 2px;font-size:1.6rem">${esc(q.v)}</div><p class="muted" style="margin:0">${esc(q.it)}</p>
      ${keys.map((k, j) => `<button class="opt" data-k="${k}"><span class="k">${j + 1}</span><span>${names[k]}${k === "DA" ? " <small class=\"muted\">(a qualcuno qualcosa)</small>" : ""}</span></button>`).join("")}
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Verbi + Dativ", nav: "pratica" });
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = k === q.k; if (ok) score++; if (q.k !== "A") dvMark(q.v, ok, false);
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (x.dataset.k === q.k) x.classList.add("ok"); else if (x.dataset.k === k) x.classList.add("bad"); });
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad");
      fb.innerHTML = `${ok ? pick(PRAISE) : names[q.k] + "."} <b>${esc(q.ex)}</b> <span class="muted">${esc(q.note.replace(/<[^>]+>/g, ""))}</span>`;
      speak(q.ex); later(() => { i++; draw(); }, ok ? 2400 : 4800);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(b.dataset.k));
    const kh = e => { if (/^[1-3]$/.test(e.key)) answer(keys[+e.key - 1]); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
