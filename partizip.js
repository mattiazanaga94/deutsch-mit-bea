// ===== Partizip II e Perfekt =====
// [infinito, Partizip II, ausiliare (h = haben, s = sein, hs = entrambi), italiano, frase con {ausiliare} e {participio}, traduzione]
const P2_VERBS = [
  // ---- regolari (ge- … -t)
  ["machen", "gemacht", "h", "fare", "Was {hast} du am Wochenende {gemacht}?", "Cosa hai fatto nel fine settimana?"],
  ["kaufen", "gekauft", "h", "comprare", "Ich {habe} ein neues Handy {gekauft}.", "Ho comprato un cellulare nuovo."],
  ["spielen", "gespielt", "h", "giocare, suonare", "Die Kinder {haben} im Garten {gespielt}.", "I bambini hanno giocato in giardino."],
  ["lernen", "gelernt", "h", "imparare, studiare", "Wir {haben} gestern viel {gelernt}.", "Ieri abbiamo studiato molto."],
  ["sagen", "gesagt", "h", "dire", "Was {hat} der Arzt {gesagt}?", "Cosa ha detto il medico?"],
  ["fragen", "gefragt", "h", "chiedere", "Ich {habe} den Lehrer {gefragt}.", "Ho chiesto all'insegnante."],
  ["hören", "gehört", "h", "sentire, ascoltare", "{Hast} du die Nachrichten {gehört}?", "Hai sentito il notiziario?"],
  ["wohnen", "gewohnt", "h", "abitare", "Sie {hat} drei Jahre in Wien {gewohnt}.", "Ha abitato tre anni a Vienna."],
  ["arbeiten", "gearbeitet", "h", "lavorare", "Ich {habe} heute zehn Stunden {gearbeitet}.", "Oggi ho lavorato dieci ore."],
  ["warten", "gewartet", "h", "aspettare", "Wir {haben} eine Stunde auf den Bus {gewartet}.", "Abbiamo aspettato l'autobus per un'ora."],
  ["kochen", "gekocht", "h", "cucinare", "Mein Mann {hat} heute {gekocht}.", "Oggi ha cucinato mio marito."],
  ["suchen", "gesucht", "h", "cercare", "Ich {habe} meinen Schlüssel überall {gesucht}.", "Ho cercato la chiave dappertutto."],
  ["brauchen", "gebraucht", "h", "avere bisogno", "Wir {haben} keine Hilfe {gebraucht}.", "Non abbiamo avuto bisogno di aiuto."],
  ["zeigen", "gezeigt", "h", "mostrare", "Sie {hat} mir die Stadt {gezeigt}.", "Mi ha mostrato la città."],
  ["glauben", "geglaubt", "h", "credere", "Das {habe} ich nicht {geglaubt}.", "Non ci ho creduto."],
  ["leben", "gelebt", "h", "vivere", "Er {hat} lange im Ausland {gelebt}.", "Ha vissuto a lungo all'estero."],
  ["lachen", "gelacht", "h", "ridere", "Wir {haben} viel {gelacht}.", "Abbiamo riso molto."],
  ["tanzen", "getanzt", "h", "ballare", "{Habt} ihr auf der Party {getanzt}?", "Avete ballato alla festa?"],
  ["putzen", "geputzt", "h", "pulire", "Ich {habe} die ganze Wohnung {geputzt}.", "Ho pulito tutto l'appartamento."],
  ["schicken", "geschickt", "h", "mandare", "Ich {habe} dir eine E-Mail {geschickt}.", "Ti ho mandato un'e-mail."],
  ["regnen", "geregnet", "h", "piovere", "Es {hat} den ganzen Tag {geregnet}.", "Ha piovuto tutto il giorno."],
  ["kosten", "gekostet", "h", "costare", "Das Ticket {hat} 50 Euro {gekostet}.", "Il biglietto è costato 50 euro."],
  ["öffnen", "geöffnet", "h", "aprire", "Wer {hat} das Fenster {geöffnet}?", "Chi ha aperto la finestra?"],
  ["reisen", "gereist", "s", "viaggiare", "Wir {sind} viel durch Europa {gereist}.", "Abbiamo viaggiato molto per l'Europa."],
  ["wandern", "gewandert", "s", "fare escursioni", "Am Sonntag {sind} wir in den Bergen {gewandert}.", "Domenica abbiamo fatto un'escursione in montagna."],
  ["folgen", "gefolgt", "s", "seguire", "Der Hund {ist} mir nach Hause {gefolgt}.", "Il cane mi ha seguito fino a casa."],
  ["landen", "gelandet", "s", "atterrare", "Das Flugzeug {ist} pünktlich {gelandet}.", "L'aereo è atterrato in orario."],
  ["joggen", "gejoggt", "s", "fare jogging", "Heute Morgen {bin} ich im Park {gejoggt}.", "Stamattina ho fatto jogging nel parco."],
  // ---- irregolari (ge- … -en, spesso con cambio vocalico)
  ["sein", "gewesen", "s", "essere", "{Bist} du schon mal in Berlin {gewesen}?", "Sei mai stata a Berlino?"],
  ["haben", "gehabt", "h", "avere", "Wir {haben} viel Glück {gehabt}.", "Abbiamo avuto molta fortuna."],
  ["werden", "geworden", "s", "diventare", "Sie {ist} Ärztin {geworden}.", "È diventata medico."],
  ["gehen", "gegangen", "s", "andare (a piedi)", "Wir {sind} ins Kino {gegangen}.", "Siamo andati al cinema."],
  ["kommen", "gekommen", "s", "venire", "Wann {bist} du nach Hause {gekommen}?", "Quando sei tornata a casa?"],
  ["fahren", "gefahren", "hs", "andare (con un mezzo); guidare", "Wir {sind} mit dem Zug nach Rom {gefahren}.", "Siamo andati a Roma in treno."],
  ["fliegen", "geflogen", "hs", "volare", "Letztes Jahr {bin} ich nach New York {geflogen}.", "L'anno scorso sono volata a New York."],
  ["laufen", "gelaufen", "s", "correre, camminare", "Ich {bin} heute zehn Kilometer {gelaufen}.", "Oggi ho corso dieci chilometri."],
  ["bleiben", "geblieben", "s", "restare", "Gestern {bin} ich zu Hause {geblieben}.", "Ieri sono rimasta a casa."],
  ["schwimmen", "geschwommen", "hs", "nuotare", "Wir {sind} im See {geschwommen}.", "Abbiamo nuotato nel lago."],
  ["steigen", "gestiegen", "s", "salire", "Die Preise {sind} stark {gestiegen}.", "I prezzi sono saliti molto."],
  ["fallen", "gefallen", "s", "cadere", "Das Glas {ist} auf den Boden {gefallen}.", "Il bicchiere è caduto per terra."],
  ["sterben", "gestorben", "s", "morire", "Goethe {ist} 1832 in Weimar {gestorben}.", "Goethe è morto nel 1832 a Weimar."],
  ["wachsen", "gewachsen", "s", "crescere", "Das Kind {ist} schnell {gewachsen}.", "Il bambino è cresciuto in fretta."],
  ["passieren", "passiert", "s", "succedere", "Was {ist} {passiert}?", "Cos'è successo?"],
  ["springen", "gesprungen", "s", "saltare", "Der Junge {ist} ins Wasser {gesprungen}.", "Il ragazzo è saltato in acqua."],
  ["essen", "gegessen", "h", "mangiare", "{Hast} du schon {gegessen}?", "Hai già mangiato?"],
  ["trinken", "getrunken", "h", "bere", "Ich {habe} zu viel Kaffee {getrunken}.", "Ho bevuto troppo caffè."],
  ["schlafen", "geschlafen", "h", "dormire", "{Hast} du gut {geschlafen}?", "Hai dormito bene?"],
  ["lesen", "gelesen", "h", "leggere", "Ich {habe} das Buch schon {gelesen}.", "Ho già letto il libro."],
  ["schreiben", "geschrieben", "h", "scrivere", "Sie {hat} mir einen Brief {geschrieben}.", "Mi ha scritto una lettera."],
  ["sehen", "gesehen", "h", "vedere", "{Habt} ihr den Film {gesehen}?", "Avete visto il film?"],
  ["sprechen", "gesprochen", "h", "parlare", "Ich {habe} mit der Chefin {gesprochen}.", "Ho parlato con la capa."],
  ["nehmen", "genommen", "h", "prendere", "Ich {habe} den Bus {genommen}.", "Ho preso l'autobus."],
  ["geben", "gegeben", "h", "dare", "Er {hat} mir seine Nummer {gegeben}.", "Mi ha dato il suo numero."],
  ["finden", "gefunden", "h", "trovare", "{Hast} du eine Wohnung {gefunden}?", "Hai trovato un appartamento?"],
  ["helfen", "geholfen", "h", "aiutare", "Meine Freunde {haben} mir beim Umzug {geholfen}.", "I miei amici mi hanno aiutata nel trasloco."],
  ["treffen", "getroffen", "h", "incontrare", "Ich {habe} gestern Anna {getroffen}.", "Ieri ho incontrato Anna."],
  ["tragen", "getragen", "h", "portare, indossare", "Sie {hat} ein rotes Kleid {getragen}.", "Indossava un vestito rosso."],
  ["waschen", "gewaschen", "h", "lavare", "Ich {habe} die Wäsche schon {gewaschen}.", "Ho già lavato i panni."],
  ["singen", "gesungen", "h", "cantare", "Wir {haben} zusammen {gesungen}.", "Abbiamo cantato insieme."],
  ["trinken", "getrunken", "h", "bere", "{Habt} ihr Wein {getrunken}?", "Avete bevuto vino?"],
  ["schließen", "geschlossen", "h", "chiudere", "{Hast} du die Tür {geschlossen}?", "Hai chiuso la porta?"],
  ["sitzen", "gesessen", "h", "essere seduto", "Wir {haben} lange im Café {gesessen}.", "Siamo stati seduti a lungo al bar."],
  ["stehen", "gestanden", "h", "stare in piedi", "Ich {habe} eine Stunde an der Kasse {gestanden}.", "Sono stata in piedi alla cassa per un'ora."],
  ["liegen", "gelegen", "h", "essere sdraiato", "Ich {habe} den ganzen Tag im Bett {gelegen}.", "Sono stata a letto tutto il giorno."],
  ["heißen", "geheißen", "h", "chiamarsi", "Wie {hat} das Restaurant {geheißen}?", "Come si chiamava il ristorante?"],
  ["rufen", "gerufen", "h", "chiamare", "Wir {haben} einen Krankenwagen {gerufen}.", "Abbiamo chiamato un'ambulanza."],
  ["vergessen", "vergessen", "h", "dimenticare", "Ich {habe} meinen Regenschirm {vergessen}.", "Ho dimenticato l'ombrello."],
  ["verlieren", "verloren", "h", "perdere", "Ich {habe} mein Portemonnaie {verloren}.", "Ho perso il portafoglio."],
  ["verstehen", "verstanden", "h", "capire", "{Haben} Sie alles {verstanden}?", "Ha capito tutto?"],
  ["gewinnen", "gewonnen", "h", "vincere", "Unsere Mannschaft {hat} {gewonnen}!", "La nostra squadra ha vinto!"],
  ["beginnen", "begonnen", "h", "cominciare", "Der Kurs {hat} schon {begonnen}.", "Il corso è già cominciato."],
  ["bekommen", "bekommen", "h", "ricevere", "Ich {habe} eine Antwort {bekommen}.", "Ho ricevuto una risposta."],
  ["bitten", "gebeten", "h", "pregare, chiedere", "Er {hat} mich um Hilfe {gebeten}.", "Mi ha chiesto aiuto."],
  ["ziehen", "gezogen", "hs", "tirare; trasferirsi (sein)", "Wir {sind} letztes Jahr nach Hamburg {gezogen}.", "L'anno scorso ci siamo trasferiti ad Amburgo."],
  ["streiten", "gestritten", "h", "litigare", "Die beiden {haben} sich {gestritten}.", "I due hanno litigato."],
  ["leiden", "gelitten", "h", "soffrire", "Sie {hat} sehr unter der Hitze {gelitten}.", "Ha sofferto molto il caldo."],
  ["schneiden", "geschnitten", "h", "tagliare", "Ich {habe} mir in den Finger {geschnitten}.", "Mi sono tagliata un dito."],
  ["greifen", "gegriffen", "h", "afferrare", "Er {hat} nach dem Glas {gegriffen}.", "Ha afferrato il bicchiere."],
  ["werfen", "geworfen", "h", "lanciare", "Wer {hat} den Ball {geworfen}?", "Chi ha lanciato la palla?"],
  ["helfen", "geholfen", "h", "aiutare", "{Hat} dir das Medikament {geholfen}?", "Ti ha aiutato la medicina?"],
  ["tun", "getan", "h", "fare", "Was {hast} du nur {getan}?", "Ma cosa hai fatto?"],
  ["lügen", "gelogen", "h", "mentire", "Du {hast} mich {gelogen}… nein: du {hast} {gelogen}!", "Hai mentito!"],
  ["riechen", "gerochen", "h", "odorare", "Es {hat} nach Kuchen {gerochen}.", "C'era profumo di torta."],
  ["schweigen", "geschwiegen", "h", "tacere", "Er {hat} die ganze Zeit {geschwiegen}.", "È stato zitto tutto il tempo."],
  ["scheinen", "geschienen", "h", "splendere; sembrare", "Die Sonne {hat} den ganzen Tag {geschienen}.", "Il sole ha splenduto tutto il giorno."],
  ["leihen", "geliehen", "h", "prestare", "Ich {habe} ihm Geld {geliehen}.", "Gli ho prestato dei soldi."],
  ["laden", "geladen", "h", "caricare", "{Hast} du das Handy {geladen}?", "Hai caricato il cellulare?"],
  ["fangen", "gefangen", "h", "prendere, catturare", "Die Katze {hat} eine Maus {gefangen}.", "Il gatto ha preso un topo."],
  ["halten", "gehalten", "h", "tenere; fermarsi", "Der Bus {hat} nicht {gehalten}.", "L'autobus non si è fermato."],
  ["lassen", "gelassen", "h", "lasciare", "Ich {habe} die Jacke im Auto {gelassen}.", "Ho lasciato la giacca in macchina."],
  // ---- misti (cambio vocalico ma -t)
  ["bringen", "gebracht", "h", "portare", "Er {hat} mir Blumen {gebracht}.", "Mi ha portato dei fiori."],
  ["denken", "gedacht", "h", "pensare", "Ich {habe} oft an dich {gedacht}.", "Ho pensato spesso a te."],
  ["kennen", "gekannt", "h", "conoscere", "Ich {habe} ihn nicht {gekannt}.", "Non lo conoscevo."],
  ["wissen", "gewusst", "h", "sapere", "Das {habe} ich nicht {gewusst}.", "Non lo sapevo."],
  ["nennen", "genannt", "h", "chiamare, nominare", "Sie {haben} ihre Tochter Lea {genannt}.", "Hanno chiamato la figlia Lea."],
  ["rennen", "gerannt", "s", "correre", "Ich {bin} zum Bahnhof {gerannt}.", "Sono corsa alla stazione."],
  ["brennen", "gebrannt", "h", "bruciare", "Das Haus {hat} die ganze Nacht {gebrannt}.", "La casa ha bruciato tutta la notte."],
  ["senden", "gesendet", "h", "inviare, trasmettere", "Ich {habe} die Nachricht schon {gesendet}.", "Ho già inviato il messaggio."],
  ["verbringen", "verbracht", "h", "trascorrere", "Wir {haben} den Urlaub in Spanien {verbracht}.", "Abbiamo trascorso le vacanze in Spagna."],
  // ---- separabili (prefisso + ge + …)
  ["einkaufen", "eingekauft", "h", "fare la spesa", "Ich {habe} schon {eingekauft}.", "Ho già fatto la spesa."],
  ["aufstehen", "aufgestanden", "s", "alzarsi", "Heute {bin} ich um sechs {aufgestanden}.", "Oggi mi sono alzata alle sei."],
  ["anrufen", "angerufen", "h", "telefonare", "{Hast} du deine Mutter {angerufen}?", "Hai chiamato tua madre?"],
  ["einladen", "eingeladen", "h", "invitare", "Sie {hat} uns zum Essen {eingeladen}.", "Ci ha invitati a cena."],
  ["aufräumen", "aufgeräumt", "h", "mettere in ordine", "{Hast} du dein Zimmer {aufgeräumt}?", "Hai messo in ordine la tua camera?"],
  ["anfangen", "angefangen", "h", "cominciare", "Wann {hat} der Film {angefangen}?", "Quando è cominciato il film?"],
  ["aufhören", "aufgehört", "h", "smettere", "Es {hat} endlich {aufgehört} zu regnen.", "Finalmente ha smesso di piovere."],
  ["ankommen", "angekommen", "s", "arrivare", "Wir {sind} spät in Berlin {angekommen}.", "Siamo arrivati tardi a Berlino."],
  ["abfahren", "abgefahren", "s", "partire", "Der Zug {ist} schon {abgefahren}.", "Il treno è già partito."],
  ["umziehen", "umgezogen", "s", "traslocare", "Sie {ist} nach München {umgezogen}.", "Si è trasferita a Monaco."],
  ["einschlafen", "eingeschlafen", "s", "addormentarsi", "Ich {bin} vor dem Fernseher {eingeschlafen}.", "Mi sono addormentata davanti alla TV."],
  ["aufwachen", "aufgewacht", "s", "svegliarsi", "Ich {bin} um drei Uhr nachts {aufgewacht}.", "Mi sono svegliata alle tre di notte."],
  ["mitkommen", "mitgekommen", "s", "venire con", "Warum {bist} du nicht {mitgekommen}?", "Perché non sei venuta anche tu?"],
  ["zurückkommen", "zurückgekommen", "s", "tornare", "Er {ist} gestern aus dem Urlaub {zurückgekommen}.", "Ieri è tornato dalle vacanze."],
  ["aussteigen", "ausgestiegen", "s", "scendere (da un mezzo)", "Wir {sind} an der falschen Haltestelle {ausgestiegen}.", "Siamo scesi alla fermata sbagliata."],
  ["einsteigen", "eingestiegen", "s", "salire (su un mezzo)", "{Seid} ihr schon {eingestiegen}?", "Siete già saliti?"],
  ["fernsehen", "ferngesehen", "h", "guardare la TV", "Gestern Abend {haben} wir {ferngesehen}.", "Ieri sera abbiamo guardato la TV."],
  ["mitbringen", "mitgebracht", "h", "portare con sé", "Ich {habe} Kuchen {mitgebracht}.", "Ho portato una torta."],
  ["vorbereiten", "vorbereitet", "h", "preparare", "{Hast} du dich auf die Prüfung {vorbereitet}?", "Ti sei preparata per l'esame?"],
  ["ausfüllen", "ausgefüllt", "h", "compilare", "Ich {habe} das Formular {ausgefüllt}.", "Ho compilato il modulo."],
  ["abholen", "abgeholt", "h", "andare a prendere", "Wer {hat} dich vom Flughafen {abgeholt}?", "Chi è venuto a prenderti all'aeroporto?"],
  ["vorschlagen", "vorgeschlagen", "h", "proporre", "Sie {hat} einen Kompromiss {vorgeschlagen}.", "Ha proposto un compromesso."],
  ["teilnehmen", "teilgenommen", "h", "partecipare", "Ich {habe} an einem Sprachkurs {teilgenommen}.", "Ho partecipato a un corso di lingua."],
  ["stattfinden", "stattgefunden", "h", "avere luogo", "Das Konzert {hat} im Park {stattgefunden}.", "Il concerto si è svolto nel parco."],
  ["aussehen", "ausgesehen", "h", "sembrare, avere l'aspetto", "Du {hast} müde {ausgesehen}.", "Avevi l'aria stanca."],
  ["kennenlernen", "kennengelernt", "h", "conoscere (per la prima volta)", "Wo {habt} ihr euch {kennengelernt}?", "Dove vi siete conosciuti?"],
  ["anziehen", "angezogen", "h", "vestire, mettersi", "Ich {habe} mich warm {angezogen}.", "Mi sono vestita pesante."],
  ["ausgeben", "ausgegeben", "h", "spendere", "Wir {haben} zu viel Geld {ausgegeben}.", "Abbiamo speso troppi soldi."],
  // ---- inseparabili (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-: senza ge-)
  ["besuchen", "besucht", "h", "visitare, andare a trovare", "Wir {haben} meine Oma {besucht}.", "Siamo andati a trovare mia nonna."],
  ["bezahlen", "bezahlt", "h", "pagare", "{Hast} du die Rechnung schon {bezahlt}?", "Hai già pagato il conto?"],
  ["erzählen", "erzählt", "h", "raccontare", "Sie {hat} mir alles {erzählt}.", "Mi ha raccontato tutto."],
  ["erklären", "erklärt", "h", "spiegare", "Der Lehrer {hat} die Regel gut {erklärt}.", "L'insegnante ha spiegato bene la regola."],
  ["verkaufen", "verkauft", "h", "vendere", "Wir {haben} unser altes Auto {verkauft}.", "Abbiamo venduto la vecchia macchina."],
  ["versuchen", "versucht", "h", "provare, tentare", "Ich {habe} es dreimal {versucht}.", "Ci ho provato tre volte."],
  ["gehören", "gehört", "h", "appartenere", "Das Haus {hat} meinem Opa {gehört}.", "La casa apparteneva a mio nonno."],
  ["gefallen", "gefallen", "h", "piacere", "Der Film {hat} mir gut {gefallen}.", "Il film mi è piaciuto."],
  ["entscheiden", "entschieden", "h", "decidere", "Wir {haben} uns für die Wohnung {entschieden}.", "Abbiamo scelto l'appartamento."],
  ["empfehlen", "empfohlen", "h", "consigliare", "Der Kellner {hat} uns den Fisch {empfohlen}.", "Il cameriere ci ha consigliato il pesce."],
  ["erleben", "erlebt", "h", "vivere (un'esperienza)", "Wir {haben} viel {erlebt}.", "Abbiamo vissuto molte esperienze."],
  ["vergessen", "vergessen", "h", "dimenticare", "{Hast} du meinen Geburtstag {vergessen}?", "Hai dimenticato il mio compleanno?"],
  ["zerstören", "zerstört", "h", "distruggere", "Der Sturm {hat} das Dach {zerstört}.", "La tempesta ha distrutto il tetto."],
  ["missverstehen", "missverstanden", "h", "fraintendere", "Du {hast} mich {missverstanden}.", "Mi hai frainteso."],
  ["entstehen", "entstanden", "s", "nascere, formarsi", "So {ist} die Idee {entstanden}.", "Così è nata l'idea."],
  ["verschwinden", "verschwunden", "s", "sparire", "Meine Brille {ist} {verschwunden}.", "I miei occhiali sono spariti."],
  ["gelingen", "gelungen", "s", "riuscire", "Der Kuchen {ist} mir gut {gelungen}.", "La torta mi è riuscita bene."],
  ["erscheinen", "erschienen", "s", "apparire, uscire (pubblicazione)", "Das Buch {ist} 2020 {erschienen}.", "Il libro è uscito nel 2020."],
  ["übersetzen", "übersetzt", "h", "tradurre", "Ich {habe} den Text ins Italienische {übersetzt}.", "Ho tradotto il testo in italiano."],
  ["wiederholen", "wiederholt", "h", "ripetere", "{Haben} Sie die Vokabeln {wiederholt}?", "Ha ripassato i vocaboli?"],
  ["unterschreiben", "unterschrieben", "h", "firmare", "Ich {habe} den Vertrag {unterschrieben}.", "Ho firmato il contratto."],
  // ---- verbi in -ieren (senza ge-)
  ["studieren", "studiert", "h", "studiare (all'università)", "Sie {hat} in Bologna Jura {studiert}.", "Ha studiato giurisprudenza a Bologna."],
  ["telefonieren", "telefoniert", "h", "telefonare", "Ich {habe} lange mit ihr {telefoniert}.", "Ho parlato a lungo al telefono con lei."],
  ["fotografieren", "fotografiert", "h", "fotografare", "Wir {haben} den Sonnenuntergang {fotografiert}.", "Abbiamo fotografato il tramonto."],
  ["reparieren", "repariert", "h", "riparare", "Der Mechaniker {hat} das Auto {repariert}.", "Il meccanico ha riparato la macchina."],
  ["diskutieren", "diskutiert", "h", "discutere", "Wir {haben} über Politik {diskutiert}.", "Abbiamo discusso di politica."],
  ["organisieren", "organisiert", "h", "organizzare", "Wer {hat} die Party {organisiert}?", "Chi ha organizzato la festa?"],
  ["informieren", "informiert", "h", "informare", "{Haben} Sie sich über die Kurse {informiert}?", "Si è informata sui corsi?"],
  ["probieren", "probiert", "h", "assaggiare, provare", "{Hast} du den Kuchen schon {probiert}?", "Hai già assaggiato la torta?"],
  ["funktionieren", "funktioniert", "h", "funzionare", "Der Drucker {hat} nicht {funktioniert}.", "La stampante non ha funzionato."],
  ["reservieren", "reserviert", "h", "prenotare", "Ich {habe} einen Tisch {reserviert}.", "Ho prenotato un tavolo."],
  ["trainieren", "trainiert", "h", "allenarsi", "Er {hat} jeden Tag {trainiert}.", "Si è allenato ogni giorno."],
  ["kontrollieren", "kontrolliert", "h", "controllare", "Der Schaffner {hat} die Tickets {kontrolliert}.", "Il controllore ha controllato i biglietti."],
  ["passieren", "passiert", "s", "succedere", "Mir {ist} etwas Komisches {passiert}.", "Mi è successa una cosa strana."],
  ["explodieren", "explodiert", "s", "esplodere", "Eine Gasflasche {ist} {explodiert}.", "È esplosa una bombola del gas."]
];
// Pulizia: rimuove eventuali doppioni e la riga di prova di «lügen»
const P2 = P2_VERBS.filter((v, i, a) => a.findIndex(x => x[0] === v[0] && x[4] === v[4]) === i && !/nein:/.test(v[4]))
  .concat([["lügen", "gelogen", "h", "mentire", "Du {hast} {gelogen}!", "Hai mentito!"]]);

const P2_SEP = ["ab", "an", "auf", "aus", "ein", "fern", "kennen", "mit", "statt", "teil", "um", "vor", "zurück", "zu", "los", "weg", "her", "hin"];
function p2Type(v) {
  const [inf, part] = v;
  if (/ieren$/.test(inf) && /iert$/.test(part)) return "ieren";
  if (P2_SEP.some(p => inf.startsWith(p) && part.startsWith(p) && part.slice(p.length).startsWith("ge"))) return "sep";
  if (!part.startsWith("ge") || /^ge(hör|fall|ling|winn|nieß|scheh|steh|wöhn)/.test(inf)) return "insep";
  if (/[ae]n$/.test(part)) return "irr";
  const stem = inf.replace(/e?n$/, "");
  return part === "ge" + stem + "t" || part === "ge" + stem + "et" ? "reg" : "misto";
}
const P2_TYPES = { reg: "Regolari", irr: "Irregolari", misto: "Misti", sep: "Separabili", insep: "Inseparabili", ieren: "Verbi in -ieren" };
const P2_TYPE_IT = { reg: "regolare: ge- + radice + -t", irr: "irregolare: ge- + radice (spesso con cambio vocalico) + -en", misto: "misto: cambio vocalico ma finale -t", sep: "separabile: prefisso + ge + participio", insep: "prefisso inseparabile: niente ge-", ieren: "verbo in -ieren: niente ge-" };
const p2Aux = v => v[2] === "s" ? "ist" : v[2] === "hs" ? "ist|hat" : "hat";
const p2AuxLabel = v => v[2] === "s" ? "ist" : v[2] === "hs" ? "ist (movimento) / hat (con oggetto)" : "hat";
const p2Key = v => "p2:" + v[0];
function p2Mark(v, ok) {
  S.prep = S.prep || {}; const k = p2Key(v), s = S.prep[k] || { box: 0, ok: 0, ko: 0 };
  if (ok) { s.ok++; s.box = Math.min(5, s.box + 1); } else { s.ko++; s.box = 0; } S.prep[k] = s; save();
}
const p2Uniq = () => P2.filter((v, i, a) => a.findIndex(x => x[0] === v[0]) === i);
const p2Weak = () => p2Uniq().filter(v => { const s = (S.prep || {})[p2Key(v)]; return s && s.ko && s.box < 2; });
const p2Known = () => p2Uniq().filter(v => ((S.prep || {})[p2Key(v)] || {}).box >= 3).length;

const P2_THEORY = `
  <p>Il <b>Perfekt</b> (il passato prossimo tedesco, il più usato nel parlato) si forma con <b>haben</b> o <b>sein</b> coniugato + <b>Partizip II</b> alla fine della frase: <i>Ich <b>habe</b> gestern Pizza <b>gegessen</b>.</i></p>
  <table class="tbl"><tr><th>Tipo</th><th>Come si forma</th><th>Esempi</th></tr>
    <tr><td><b>Regolari</b></td><td><b>ge</b> + radice + <b>t</b> (radice in -t/-d: <b>-et</b>)</td><td>machen → <b>ge</b>mach<b>t</b> · arbeiten → <b>ge</b>arbeit<b>et</b></td></tr>
    <tr><td><b>Irregolari</b></td><td><b>ge</b> + radice + <b>en</b>, spesso con <b>cambio vocalico</b></td><td>fahren → <b>ge</b>fahr<b>en</b> · trinken → <b>ge</b>tr<b>u</b>nk<b>en</b> · gehen → <b>ge</b>g<b>a</b>ng<b>en</b></td></tr>
    <tr><td><b>Misti</b></td><td>cambio vocalico ma finale <b>-t</b></td><td>bringen → gebr<b>a</b>ch<b>t</b> · denken → ged<b>a</b>ch<b>t</b> · wissen → gew<b>u</b>ss<b>t</b> · kennen → gek<b>a</b>nn<b>t</b></td></tr>
    <tr><td><b>Separabili</b></td><td>prefisso + <b>ge</b> + participio</td><td>einkaufen → ein<b>ge</b>kauft · aufstehen → auf<b>ge</b>standen · anrufen → an<b>ge</b>rufen</td></tr>
    <tr><td><b>Inseparabili</b></td><td><b>niente ge-</b> (prefissi be-, emp-, ent-, er-, ge-, miss-, ver-, zer-)</td><td>besuchen → besucht · verstehen → verstanden · bekommen → bekommen</td></tr>
    <tr><td><b>-ieren</b></td><td><b>niente ge-</b>, finale -t</td><td>studieren → studiert · telefonieren → telefoniert</td></tr></table>
  <p style="margin-top:14px"><b>haben o sein?</b> La maggior parte dei verbi vuole <b>haben</b>. Vogliono <b>sein</b>:</p>
  <ul><li>i verbi di <b>movimento da un luogo a un altro</b> senza oggetto: <i>gehen, kommen, fahren, fliegen, laufen, reisen, ankommen…</i> → <i>Ich <b>bin</b> nach Rom gefahren.</i></li>
    <li>i verbi di <b>cambiamento di stato</b>: <i>aufstehen, einschlafen, aufwachen, werden, sterben, wachsen, entstehen…</i> → <i>Ich <b>bin</b> um 7 aufgestanden.</i></li>
    <li><b>sein, bleiben, passieren, gelingen, begegnen</b> → <i>Ich <b>bin</b> zu Hause geblieben. Was <b>ist</b> passiert?</i></li></ul>
  <p><b>Attenzione:</b> con un complemento oggetto si usa <i>haben</i>: <i>Ich <b>bin</b> nach Berlin gefahren</i> ma <i>Ich <b>habe</b> das Auto gefahren</i> (ho guidato la macchina). Diverso dall'italiano: <i>Ich <b>habe</b> geschlafen / gearbeitet</i> e <i>Ich <b>bin</b> gelaufen / gereist</i>.</p>`;

function p2Hub(a, b) {
  if (a === "lista") return p2List();
  if (a === "card") return p2Cards();
  if (a === "forme") return p2Forms(b);
  if (a === "frasi") return p2Cloze(b === "errori");
  if (a === "aux") return p2AuxDrill();
  const weak = p2Weak().length, n = p2Uniq().length, known = p2Known();
  const counts = Object.keys(P2_TYPES).map(t => [t, p2Uniq().filter(v => p2Type(v) === t).length]);
  view("Partizip II e Perfekt", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#e8590c">${ic("clock")}</span><div style="flex:1"><h2 style="margin:0">Partizip II e Perfekt</h2>
      <small class="muted">${n} verbi · ${known} consolidati${weak ? ` · ${weak} da ripassare` : ""}</small></div></div>
      <div class="progress thin" style="margin-top:14px"><i style="width:${known / n * 100}%"></i></div></div>
    <details class="card acc" open><summary><h3 style="margin:0">Le regole in breve</h3>${ic("right")}</summary><div class="theory" style="margin-top:12px">${P2_THEORY}</div></details>
    <div class="mods">
      ${mod("partizip/lista", "library", "Lista dei verbi", "Per tipo, con esempio e audio", "#5e5ce6")}
      ${mod("partizip/card", "layers", "Flashcard", "Infinito → hat/ist + Partizip", "#0071e3")}
      ${mod("partizip/aux", "checksq", "haben o sein?", "Scegli l'ausiliare giusto", "#30b06a")}
      ${mod("partizip/frasi", "pen", "Completa le frasi", "Ausiliare + Partizip nel contesto", "#0d9488")}
      ${weak ? mod("partizip/frasi/errori", "refresh", "Ripassa i tuoi errori", `${weak} verbi sbagliati di recente`, "#ff375f") : ""}
    </div>
    <div class="sec"><h3>Scrivi il Partizip II per tipo</h3></div>
    <div class="mods">
      ${mod("partizip/forme", "pen", "Tutti i tipi", "Mix di tutti i verbi", "#b8860b")}
      ${counts.map(([t, c]) => mod("partizip/forme/" + t, "pen", P2_TYPES[t], `${c} verbi · ${P2_TYPE_IT[t].split(":")[1] || ""}`, "#e8590c")).join("")}
    </div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
function p2List() {
  view("Lista Partizip II", Object.keys(P2_TYPES).map(t => `<div class="card"><h3>${P2_TYPES[t]} <span class="tag">${esc(P2_TYPE_IT[t])}</span></h3>
    ${p2Uniq().filter(v => p2Type(v) === t).map(v => { const s = v[4].replace(/\{([^}|]+)[^}]*\}/g, "$1"), st = (S.prep || {})[p2Key(v)];
      return `<div class="vocab"><div style="flex:1"><b>${esc(v[0])}</b> → <b>${esc(p2AuxLabel(v))} ${esc(v[1])}</b>${st && st.box >= 3 ? ` <span class="badge ok">${ic("check")}</span>` : ""} <span class="muted">· ${esc(v[3])}</span><br><small>${esc(s)}</small> <small class="muted">${esc(v[5])}</small></div>${sayBtn(v[0] + ". " + p2AuxLabel(v).split(" ")[0] + " " + v[1] + ". " + s)}</div>`; }).join("")}</div>`).join(""),
    { back: true, crumb: "Partizip II", nav: "pratica" });
}
function p2Cards() {
  const st = S.prep || {}, all = p2Uniq();
  const due = shuffle(all.filter(v => (st[p2Key(v)] || { box: 0 }).box < 3));
  const cards = (due.length >= 15 ? due : due.concat(shuffle(all.filter(v => !due.includes(v))))).slice(0, 20);
  let i = 0, known = 0;
  const draw = () => {
    if (i >= cards.length) { addXP(8 + known); return finished("Mazzo completato", `${known} verbi saputi su ${cards.length}`, 8 + known, "partizip/card"); }
    const v = cards[i], s = v[4].replace(/\{([^}|]+)[^}]*\}/g, "$1");
    view("Flashcard Partizip II", `${stepbar(i, cards.length)}
      <div class="flash" id="fc"><div class="inner"><div class="face"><span class="tag">PERFEKT?</span><div class="prompt" style="margin-top:10px">${esc(v[0])}</div><small>${esc(v[3])}</small></div>
        <div class="face back"><span class="tag" style="color:#fff;opacity:.8">${esc(P2_TYPE_IT[p2Type(v)].toUpperCase())}</span><div class="prompt" style="margin-top:10px">${esc(p2AuxLabel(v).split(" (")[0])} ${esc(v[1])}</div><small>${esc(s)}</small></div></div></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" data-say="${esc(v[0] + ". " + s)}">${ic("volume")} Ascolta</button>
        <button class="btn danger" id="no">${ic("refresh")} Da ripassare</button><button class="btn" id="yes">${ic("check")} La so</button></div>
      <p class="muted" style="text-align:center;margin-top:14px">Di' ad alta voce «hat/ist + Partizip», poi gira la carta.<br><span class="kbd">Spazio</span> gira · <span class="kbd">1</span> da ripassare · <span class="kbd">2</span> la so</p>`, { back: true, crumb: "Partizip II", nav: "pratica" });
    const fc = $("fc"); let flipped = false;
    const flip = () => { fc.classList.toggle("flip"); if (!flipped) { flipped = true; speak(v[0] + ". " + s); } };
    fc.onclick = flip;
    const yes = () => { p2Mark(v, true); known++; i++; draw(); }, no = () => { p2Mark(v, false); if (cards.filter(x => x === v).length < 2) cards.push(v); i++; draw(); };
    $("yes").onclick = yes; $("no").onclick = no;
    const kh = e => { if (e.target.tagName === "INPUT") return; if (e.code === "Space") { e.preventDefault(); flip(); } if (e.key === "2") yes(); if (e.key === "1") no(); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
function p2Forms(type) {
  const pool = p2Uniq().filter(v => !type || p2Type(v) === type);
  const items = shuffle(pool).slice(0, 12).map(v => ({ s: `${v[0]} → er/sie {${p2Aux(v)}} {${v[1]}}`, it: v[3], v, p2: true, task: "SCRIVI AUSILIARE E PARTIZIP II",
    x: `${P2_TYPE_IT[p2Type(v)]} · ${p2AuxLabel(v)}` }));
  runCloze(type ? P2_TYPES[type] : "Partizip II", items, { again: "partizip/forme" + (type ? "/" + type : ""), crumb: "Partizip II", back: "partizip" });
}
function p2Cloze(weak) {
  const src = weak ? P2.filter(v => p2Weak().includes(v) || p2Weak().some(w => w[0] === v[0])) : P2;
  const items = shuffle(src).slice(0, 12).map(v => ({ s: v[4], it: v[5], v, p2: true, hint: `${v[0]} (${v[3]})`, task: "METTI IL VERBO AL PERFEKT", x: `${p2AuxLabel(v)} ${v[1]} · ${P2_TYPE_IT[p2Type(v)]}` }));
  runCloze(weak ? "Ripasso errori" : "Completa le frasi", items, { again: weak ? "partizip/frasi/errori" : "partizip/frasi", crumb: "Partizip II", back: "partizip" });
}
function p2AuxDrill() {
  const qs = shuffle(P2.filter(v => v[2] !== "hs")).slice(0, 15); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); return finished(`${score} su ${qs.length}`, "haben o sein?", score * 3, "partizip/aux"); }
    const v = qs[i], right = v[2] === "s" ? "sein" : "haben", full = v[4].replace(/\{([^}|]+)[^}]*\}/g, "$1");
    const gapped = v[4].replace(/\{([^}|]+)[^}]*\}/, "___").replace(/\{([^}|]+)[^}]*\}/g, "$1");
    view("haben o sein?", `${stepbar(i, qs.length)}<div class="card"><span class="tag">HABEN O SEIN?</span>
      <div class="prompt" style="margin:12px 0 4px;font-size:1.2rem;line-height:1.5">${esc(gapped)}</div><p class="muted" style="margin:0">${esc(v[5])}</p>
      ${["haben", "sein"].map((o, k) => `<button class="opt" data-k="${o}"><span class="k">${k + 1}</span><span>${o}</span></button>`).join("")}
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Partizip II", nav: "pratica" });
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = k === right; p2Mark(v, ok); if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (x.dataset.k === right) x.classList.add("ok"); else if (x.dataset.k === k) x.classList.add("bad"); });
      const why = right === "sein" ? (/^(sein|bleiben|passieren|gelingen|explodieren)$/.test(v[0]) ? "è uno dei verbi fissi con sein" : "movimento o cambiamento di stato → sein") : "nessun movimento verso un luogo né cambiamento di stato → haben";
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = `${ok ? pick(PRAISE) : "Non proprio."} <span class="muted">${esc(full)} · ${esc(v[0])}: ${why}.</span>`;
      speak(full); later(() => { i++; draw(); }, ok ? 2200 : 4300);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(b.dataset.k));
    const kh = e => { if (e.key === "1") answer("haben"); if (e.key === "2") answer("sein"); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
