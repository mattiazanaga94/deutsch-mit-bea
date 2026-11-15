// ===== Verbi con preposizione e avverbi pronominali wo(r)-/da(r)- =====
// [verbo, preposizione, caso (A = Akkusativ, D = Dativ), italiano, frase con {lacune}, traduzione, livello]
const PREP_VERBS = [
  // ---- auf + Akk.
  ["warten", "auf", "A", "aspettare", "Wir warten schon seit einer Stunde {auf} {den} Bus.", "Aspettiamo l'autobus già da un'ora.", "B1"],
  ["sich freuen", "auf", "A", "non vedere l'ora di (futuro)", "Ich freue mich schon {auf} {das} Wochenende.", "Non vedo l'ora che arrivi il fine settimana.", "B1"],
  ["Lust haben", "auf", "A", "avere voglia di", "Hast du Lust {auf} {einen} Kaffee?", "Hai voglia di un caffè?", "B1"],
  ["sich vorbereiten", "auf", "A", "prepararsi a/per", "Bea bereitet sich {auf} {die} Prüfung vor.", "Bea si prepara per l'esame.", "B1"],
  ["achten", "auf", "A", "fare attenzione a", "Achten Sie bitte {auf} {die} Rechtschreibung.", "Faccia attenzione all'ortografia, per favore.", "B1"],
  ["antworten", "auf", "A", "rispondere a (qualcosa)", "Er hat noch nicht {auf} {meine} E-Mail geantwortet.", "Non ha ancora risposto alla mia e-mail.", "B1"],
  ["aufpassen", "auf", "A", "badare a, sorvegliare", "Kannst du heute {auf} {die} Kinder aufpassen?", "Puoi badare ai bambini oggi?", "B1"],
  ["sich konzentrieren", "auf", "A", "concentrarsi su", "Ich kann mich nicht {auf} {den} Text konzentrieren.", "Non riesco a concentrarmi sul testo.", "B1"],
  ["sich verlassen", "auf", "A", "contare su, fidarsi di", "Du kannst dich {auf} {deinen} Bruder verlassen.", "Puoi contare su tuo fratello.", "B2"],
  ["reagieren", "auf", "A", "reagire a", "Wie hat er {auf} {die} Nachricht reagiert?", "Come ha reagito alla notizia?", "B1"],
  ["hoffen", "auf", "A", "sperare in", "Wir hoffen {auf} {einen} sonnigen Sommer.", "Speriamo in un'estate soleggiata.", "B1"],
  ["sich einigen", "auf", "A", "accordarsi su", "Wir haben uns {auf} {einen} Termin geeinigt.", "Ci siamo accordati su una data.", "B2"],
  ["verzichten", "auf", "A", "rinunciare a", "Heute verzichte ich {auf} {den} Nachtisch.", "Oggi rinuncio al dolce.", "B2"],
  ["ankommen", "auf", "A", "dipendere da (es kommt auf … an)", "Es kommt {auf} {das} Wetter an.", "Dipende dal tempo.", "B2"],
  ["stolz sein", "auf", "A", "essere fiero di", "Die Eltern sind stolz {auf} {ihre} Tochter.", "I genitori sono fieri della figlia.", "B1"],
  ["sich beziehen", "auf", "A", "riferirsi a", "Ich beziehe mich {auf} {Ihre} Anzeige vom 3. Mai.", "Mi riferisco al Suo annuncio del 3 maggio.", "B2"],
  ["hinweisen", "auf", "A", "far notare, segnalare", "Ich möchte Sie {auf} {einen} Fehler hinweisen.", "Vorrei segnalarLe un errore.", "B2"],
  ["sich spezialisieren", "auf", "A", "specializzarsi in", "Die Kanzlei hat sich {auf} {das} Arbeitsrecht spezialisiert.", "Lo studio si è specializzato in diritto del lavoro.", "B2"],
  ["Bezug nehmen", "auf", "A", "fare riferimento a", "Ich nehme Bezug {auf} {unser} Telefonat von gestern.", "Faccio riferimento alla nostra telefonata di ieri.", "B2"],
  ["neugierig sein", "auf", "A", "essere curioso di", "Ich bin schon neugierig {auf} {das} Ergebnis.", "Sono già curiosa di sapere il risultato.", "B1"],
  // ---- auf + Dat.
  ["bestehen", "auf", "D", "insistere su", "Der Kunde besteht {auf} {einer} schriftlichen Entschuldigung.", "Il cliente insiste per avere delle scuse scritte.", "B2"],
  // ---- an + Akk.
  ["denken", "an", "A", "pensare a", "Ich denke oft {an} {meine} Kindheit.", "Penso spesso alla mia infanzia.", "B1"],
  ["sich erinnern", "an", "A", "ricordarsi di", "Erinnerst du dich noch {an} {den} Abend in Rom?", "Ti ricordi ancora della sera a Roma?", "B1"],
  ["erinnern (jdn.)", "an", "A", "ricordare a qualcuno qualcosa", "Erinnere mich bitte {an} {den} Termin beim Zahnarzt!", "Ricordami l'appuntamento dal dentista, per favore!", "B1"],
  ["sich gewöhnen", "an", "A", "abituarsi a", "Ich habe mich schnell {an} {das} Klima gewöhnt.", "Mi sono abituata in fretta al clima.", "B1"],
  ["glauben", "an", "A", "credere in", "Er glaubt fest {an} {den} Erfolg des Projekts.", "Crede fermamente nel successo del progetto.", "B1"],
  ["sich wenden", "an", "A", "rivolgersi a", "Bitte wenden Sie sich {an} {den} Kundenservice.", "Si rivolga al servizio clienti, per favore.", "B2"],
  ["schreiben", "an", "A", "scrivere a", "Ich schreibe heute {an} {die} Hausverwaltung.", "Oggi scrivo all'amministrazione condominiale.", "B1"],
  ["sich anpassen", "an", "A", "adattarsi a", "Man muss sich {an} {die} neue Situation anpassen.", "Bisogna adattarsi alla nuova situazione.", "B2"],
  // ---- an + Dat.
  ["teilnehmen", "an", "D", "partecipare a", "Sie nimmt {an} {einem} Sprachkurs teil.", "Partecipa a un corso di lingua.", "B1"],
  ["sich beteiligen", "an", "D", "partecipare, contribuire a", "Alle haben sich {an} {der} Diskussion beteiligt.", "Tutti hanno partecipato alla discussione.", "B2"],
  ["arbeiten", "an", "D", "lavorare a", "Sie arbeitet gerade {an} {einem} neuen Projekt.", "Sta lavorando a un nuovo progetto.", "B1"],
  ["zweifeln", "an", "D", "dubitare di", "Ich zweifle nicht {an} {deiner} Ehrlichkeit.", "Non dubito della tua sincerità.", "B2"],
  ["leiden", "an", "D", "soffrire di (malattia)", "Er leidet {an} {einer} seltenen Krankheit.", "Soffre di una malattia rara.", "B2"],
  ["erkennen", "an", "D", "riconoscere da", "Ich habe ihn sofort {an} {der} Stimme erkannt.", "L'ho riconosciuto subito dalla voce.", "B2"],
  ["liegen", "an", "D", "dipendere da, essere dovuto a", "Das Problem liegt {an} {der} schlechten Verbindung.", "Il problema è dovuto alla cattiva connessione.", "B2"],
  ["interessiert sein", "an", "D", "essere interessato a", "Wir sind sehr {an} {einer} Zusammenarbeit interessiert.", "Siamo molto interessati a una collaborazione.", "B2"],
  // ---- über + Akk.
  ["sich freuen", "über", "A", "rallegrarsi di (presente/passato)", "Sie hat sich sehr {über} {das} Geschenk gefreut.", "Si è rallegrata molto del regalo.", "B1"],
  ["sich ärgern", "über", "A", "arrabbiarsi per", "Ich ärgere mich {über} {den} Lärm der Nachbarn.", "Mi arrabbio per il rumore dei vicini.", "B1"],
  ["sich beschweren", "über", "A", "lamentarsi di", "Die Gäste haben sich {über} {das} Essen beschwert.", "Gli ospiti si sono lamentati del cibo.", "B1"],
  ["sprechen", "über", "A", "parlare di", "Wir müssen dringend {über} {das} Problem sprechen.", "Dobbiamo parlare urgentemente del problema.", "B1"],
  ["diskutieren", "über", "A", "discutere di", "Im Kurs diskutieren wir {über} {die} Zukunft der Arbeit.", "Al corso discutiamo del futuro del lavoro.", "B1"],
  ["nachdenken", "über", "A", "riflettere su", "Ich muss noch {über} {dein} Angebot nachdenken.", "Devo ancora riflettere sulla tua offerta.", "B1"],
  ["sich informieren", "über", "A", "informarsi su", "Ich habe mich {über} {die} Kurse informiert.", "Mi sono informata sui corsi.", "B1"],
  ["sich aufregen", "über", "A", "innervosirsi per", "Reg dich nicht {über} {jede} Kleinigkeit auf!", "Non innervosirti per ogni sciocchezza!", "B2"],
  ["lachen", "über", "A", "ridere di", "Alle haben {über} {den} Witz gelacht.", "Tutti hanno riso della barzelletta.", "B1"],
  ["sich wundern", "über", "A", "stupirsi di", "Ich wundere mich {über} {seine} Reaktion.", "Mi stupisco della sua reazione.", "B2"],
  ["berichten", "über", "A", "riferire, fare un servizio su", "Die Zeitung berichtet {über} {den} Unfall.", "Il giornale riferisce dell'incidente.", "B2"],
  ["sich unterhalten", "über", "A", "conversare su", "Wir haben uns lange {über} {den} Film unterhalten.", "Abbiamo parlato a lungo del film.", "B1"],
  ["verfügen", "über", "A", "disporre di", "Das Hotel verfügt {über} {einen} großen Parkplatz.", "L'hotel dispone di un grande parcheggio.", "B2"],
  ["sich Gedanken machen", "über", "A", "pensare a, porsi domande su", "Du solltest dir {über} {deine} Zukunft Gedanken machen.", "Dovresti pensare al tuo futuro.", "B2"],
  // ---- um + Akk.
  ["sich kümmern", "um", "A", "occuparsi di, prendersi cura di", "Wer kümmert sich {um} {den} Hund?", "Chi si occupa del cane?", "B1"],
  ["sich Sorgen machen", "um", "A", "preoccuparsi per", "Ich mache mir Sorgen {um} {meine} Oma.", "Sono preoccupata per mia nonna.", "B1"],
  ["sich bewerben", "um", "A", "candidarsi per (un posto)", "Sie bewirbt sich {um} {eine} Stelle als Ingenieurin.", "Si candida per un posto da ingegnera.", "B1"],
  ["bitten", "um", "A", "chiedere (per ottenere)", "Darf ich Sie {um} {einen} Gefallen bitten?", "Posso chiederLe un favore?", "B1"],
  ["gehen (es geht um)", "um", "A", "trattarsi di", "In dem Film geht es {um} {eine} Familie in Berlin.", "Il film parla di una famiglia a Berlino.", "B1"],
  ["sich handeln (es handelt sich um)", "um", "A", "trattarsi di", "Es handelt sich {um} {ein} Missverständnis.", "Si tratta di un malinteso.", "B2"],
  // ---- für + Akk.
  ["sich interessieren", "für", "A", "interessarsi di", "Sie interessiert sich sehr {für} {die} deutsche Geschichte.", "Si interessa molto di storia tedesca.", "B1"],
  ["sich entscheiden", "für", "A", "decidere per, scegliere", "Wir haben uns {für} {die} günstigere Wohnung entschieden.", "Abbiamo scelto l'appartamento più economico.", "B1"],
  ["sich bedanken", "für", "A", "ringraziare per", "Ich bedanke mich herzlich {für} {die} Einladung.", "La ringrazio di cuore per l'invito.", "B1"],
  ["sich entschuldigen", "für", "A", "scusarsi per", "Er hat sich {für} {die} Verspätung entschuldigt.", "Si è scusato per il ritardo.", "B1"],
  ["sich engagieren", "für", "A", "impegnarsi per", "Viele Jugendliche engagieren sich {für} {den} Umweltschutz.", "Molti giovani si impegnano per la tutela dell'ambiente.", "B2"],
  ["sorgen", "für", "A", "provvedere a, occuparsi di", "Die Musik sorgt {für} {eine} gute Stimmung.", "La musica crea una bella atmosfera.", "B2"],
  ["halten (jdn./etw.)", "für", "A", "ritenere, considerare", "Ich halte das {für} {eine} gute Idee.", "Lo ritengo una buona idea.", "B2"],
  ["sich eignen", "für", "A", "essere adatto a", "Er eignet sich gut {für} {diese} Stelle.", "È adatto per questo posto.", "B2"],
  ["kämpfen", "für", "A", "lottare per", "Sie kämpft {für} {die} Rechte der Frauen.", "Lotta per i diritti delle donne.", "B2"],
  ["verantwortlich sein", "für", "A", "essere responsabile di", "Wer ist {für} {die} Organisation verantwortlich?", "Chi è responsabile dell'organizzazione?", "B2"],
  // ---- gegen + Akk.
  ["protestieren", "gegen", "A", "protestare contro", "Tausende protestieren {gegen} {die} neue Regelung.", "Migliaia di persone protestano contro la nuova norma.", "B2"],
  ["sich wehren", "gegen", "A", "difendersi da, opporsi a", "Die Bürger wehren sich {gegen} {den} Bau der Autobahn.", "I cittadini si oppongono alla costruzione dell'autostrada.", "B2"],
  // ---- in + Akk.
  ["sich verlieben", "in", "A", "innamorarsi di", "Er hat sich {in} {eine} Kollegin verliebt.", "Si è innamorato di una collega.", "B1"],
  ["einwilligen", "in", "A", "acconsentire a", "Der Patient hat {in} {die} Operation eingewilligt.", "Il paziente ha acconsentito all'operazione.", "B2"],
  // ---- mit + Dat.
  ["sich beschäftigen", "mit", "D", "occuparsi di", "Ich beschäftige mich gerade {mit} {dem} Thema Nachhaltigkeit.", "Mi sto occupando del tema della sostenibilità.", "B1"],
  ["anfangen", "mit", "D", "cominciare (con)", "Wann fangen wir {mit} {dem} Unterricht an?", "Quando cominciamo la lezione?", "B1"],
  ["aufhören", "mit", "D", "smettere di", "Er hat endlich {mit} {dem} Rauchen aufgehört.", "Ha finalmente smesso di fumare.", "B1"],
  ["telefonieren", "mit", "D", "telefonare a", "Ich habe gestern {mit} {meiner} Schwester telefoniert.", "Ieri ho telefonato a mia sorella.", "B1"],
  ["sprechen", "mit", "D", "parlare con", "Haben Sie schon {mit} {dem} Chef gesprochen?", "Ha già parlato con il capo?", "B1"],
  ["sich streiten", "mit", "D", "litigare con", "Sie streitet sich oft {mit} {ihrem} Bruder.", "Litiga spesso con suo fratello.", "B1"],
  ["rechnen", "mit", "D", "aspettarsi, mettere in conto", "Wir rechnen {mit} {einer} Verspätung von zehn Minuten.", "Mettiamo in conto un ritardo di dieci minuti.", "B2"],
  ["einverstanden sein", "mit", "D", "essere d'accordo con", "Ich bin {mit} {dem} Vorschlag einverstanden.", "Sono d'accordo con la proposta.", "B1"],
  ["zufrieden sein", "mit", "D", "essere soddisfatto di", "Der Chef ist {mit} {der} Arbeit zufrieden.", "Il capo è soddisfatto del lavoro.", "B1"],
  ["sich treffen", "mit", "D", "incontrarsi con", "Ich treffe mich heute {mit} {meinen} Freunden.", "Oggi mi vedo con i miei amici.", "B1"],
  ["vergleichen", "mit", "D", "paragonare a", "Man kann Berlin nicht {mit} {einer} Kleinstadt vergleichen.", "Non si può paragonare Berlino a una cittadina.", "B2"],
  ["sich verabreden", "mit", "D", "darsi appuntamento con", "Ich habe mich {mit} {einer} Freundin verabredet.", "Ho un appuntamento con un'amica.", "B1"],
  ["sich verstehen", "mit", "D", "andare d'accordo con", "Ich verstehe mich gut {mit} {meiner} Mitbewohnerin.", "Vado d'accordo con la mia coinquilina.", "B1"],
  ["sich auseinandersetzen", "mit", "D", "confrontarsi con, analizzare", "Man muss sich kritisch {mit} {den} Folgen auseinandersetzen.", "Bisogna analizzare criticamente le conseguenze.", "B2"],
  // ---- nach + Dat.
  ["fragen", "nach", "D", "chiedere di/informazioni su", "Ein Tourist hat mich {nach} {dem} Weg gefragt.", "Un turista mi ha chiesto la strada.", "B1"],
  ["sich erkundigen", "nach", "D", "informarsi su", "Sie erkundigt sich {nach} {den} Öffnungszeiten.", "Si informa sugli orari di apertura.", "B2"],
  ["suchen", "nach", "D", "cercare", "Die Polizei sucht {nach} {dem} Täter.", "La polizia cerca il colpevole.", "B1"],
  ["riechen", "nach", "D", "avere odore di", "Hier riecht es {nach} {frischem} Kaffee.", "Qui c'è profumo di caffè fresco.", "B1"],
  ["sich sehnen", "nach", "D", "desiderare, avere nostalgia di", "Im Winter sehne ich mich {nach} {der} Sonne.", "D'inverno ho nostalgia del sole.", "B2"],
  ["sich richten", "nach", "D", "attenersi a, regolarsi secondo", "Wir richten uns {nach} {den} Wünschen der Kunden.", "Ci regoliamo secondo i desideri dei clienti.", "B2"],
  // ---- vor + Dat.
  ["Angst haben", "vor", "D", "avere paura di", "Viele Kinder haben Angst {vor} {dem} Zahnarzt.", "Molti bambini hanno paura del dentista.", "B1"],
  ["sich fürchten", "vor", "D", "temere", "Sie fürchtet sich {vor} {der} Dunkelheit.", "Ha paura del buio.", "B2"],
  ["warnen", "vor", "D", "mettere in guardia da", "Die Polizei warnt {vor} {dem} Glatteis.", "La polizia mette in guardia dal ghiaccio sulle strade.", "B2"],
  ["schützen", "vor", "D", "proteggere da", "Die Creme schützt {vor} {der} Sonne.", "La crema protegge dal sole.", "B1"],
  // ---- von + Dat.
  ["träumen", "von", "D", "sognare (di)", "Ich träume {von} {einer} Reise nach Japan.", "Sogno un viaggio in Giappone.", "B1"],
  ["erzählen", "von", "D", "raccontare di", "Erzähl mir {von} {deinem} Urlaub!", "Raccontami delle tue vacanze!", "B1"],
  ["abhängen", "von", "D", "dipendere da", "Das hängt {von} {der} Situation ab.", "Dipende dalla situazione.", "B1"],
  ["sich erholen", "von", "D", "riprendersi da", "Ich muss mich erst {von} {der} Reise erholen.", "Prima devo riprendermi dal viaggio.", "B2"],
  ["halten (etw. von)", "von", "D", "pensare di (opinione)", "Was hältst du {von} {der} Idee?", "Cosa ne pensi dell'idea?", "B1"],
  ["überzeugen", "von", "D", "convincere di", "Er hat mich {von} {seiner} Idee überzeugt.", "Mi ha convinta della sua idea.", "B2"],
  ["sich verabschieden", "von", "D", "congedarsi da", "Wir haben uns {von} {den} Gästen verabschiedet.", "Ci siamo congedati dagli ospiti.", "B1"],
  ["begeistert sein", "von", "D", "essere entusiasta di", "Alle waren {von} {dem} Konzert begeistert.", "Tutti erano entusiasti del concerto.", "B1"],
  // ---- zu + Dat.
  ["gehören", "zu", "D", "far parte di", "Das gehört nicht {zu} {meinen} Aufgaben.", "Questo non fa parte dei miei compiti.", "B1"],
  ["einladen", "zu", "D", "invitare a", "Sie hat mich {zu} {ihrer} Hochzeit eingeladen.", "Mi ha invitata al suo matrimonio.", "B1"],
  ["gratulieren", "zu", "D", "congratularsi per", "Wir gratulieren dir {zu} {deinem} Erfolg!", "Ci congratuliamo per il tuo successo!", "B1"],
  ["passen", "zu", "D", "stare bene con, essere adatto a", "Die Schuhe passen gut {zu} {deiner} Hose.", "Le scarpe stanno bene con i tuoi pantaloni.", "B1"],
  ["beitragen", "zu", "D", "contribuire a", "Jeder kann {zu} {einer} saubereren Umwelt beitragen.", "Ognuno può contribuire a un ambiente più pulito.", "B2"],
  ["führen", "zu", "D", "portare a, causare", "Der Streit führte {zu} {einer} Trennung.", "La lite ha portato a una separazione.", "B2"],
  ["sich entschließen", "zu", "D", "decidersi a", "Er hat sich {zu} {einem} Neuanfang entschlossen.", "Si è deciso a ricominciare da capo.", "B2"],
  ["raten", "zu", "D", "consigliare", "Der Arzt rät mir {zu} {einer} längeren Pause.", "Il medico mi consiglia una pausa più lunga.", "B2"],
  ["zählen", "zu", "D", "essere tra, annoverarsi tra", "Berlin zählt {zu} {den} beliebtesten Städten Europas.", "Berlino è tra le città più amate d'Europa.", "B2"],
  // ---- bei + Dat.
  ["sich bedanken", "bei", "D", "ringraziare (qualcuno)", "Ich möchte mich {bei} {meinen} Kollegen bedanken.", "Vorrei ringraziare i miei colleghi.", "B1"],
  ["sich entschuldigen", "bei", "D", "scusarsi con", "Du solltest dich {bei} {deiner} Mutter entschuldigen.", "Dovresti scusarti con tua madre.", "B1"],
  ["helfen", "bei", "D", "aiutare in/con", "Kannst du mir {bei} {den} Hausaufgaben helfen?", "Puoi aiutarmi con i compiti?", "B1"],
  ["sich bewerben", "bei", "D", "candidarsi presso", "Ich bewerbe mich {bei} {einer} Bank in Frankfurt.", "Mi candido presso una banca a Francoforte.", "B1"],
  ["sich beschweren", "bei", "D", "lamentarsi con", "Ich habe mich {bei} {der} Hausverwaltung beschwert.", "Mi sono lamentata con l'amministrazione.", "B1"],
  // ---- aus + Dat. / unter + Dat.
  ["bestehen", "aus", "D", "consistere di, essere composto da", "Die Wohnung besteht {aus} {einem} Wohnzimmer und zwei Schlafzimmern.", "L'appartamento è composto da un soggiorno e due camere.", "B2"],
  ["leiden", "unter", "D", "soffrire per/a causa di", "Viele Menschen leiden {unter} {dem} Stress im Büro.", "Molte persone soffrono lo stress in ufficio.", "B2"],
  ["verstehen (etw.)", "unter", "D", "intendere per", "Was verstehst du {unter} {einer} guten Freundschaft?", "Cosa intendi per una buona amicizia?", "B2"]
];

// Domande e risposte con wo(r)- / da(r)- e preposizione + pronome (persone)
const WODA_ITEMS = [
  // domanda su una cosa → wo(r)+prep
  { s: "– {Worauf} wartest du? – Auf den Bus.", it: "– Cosa aspetti? – L'autobus.", x: "Cosa (der Bus) → wo + r + auf = worauf." },
  { s: "– {Woran} denkst du gerade? – An meinen Urlaub.", it: "– A cosa stai pensando? – Alle mie vacanze.", x: "Cosa → wo + r + an = woran." },
  { s: "– {Worüber} habt ihr gesprochen? – Über die Arbeit.", it: "– Di cosa avete parlato? – Del lavoro.", x: "Cosa → wo + r + über = worüber." },
  { s: "– {Wofür} interessierst du dich? – Für Kunst und Musik.", it: "– Per cosa ti interessi? – Per l'arte e la musica.", x: "für inizia per consonante → wo + für = wofür (senza r)." },
  { s: "– {Womit} beschäftigst du dich zurzeit? – Mit meiner Masterarbeit.", it: "– Di cosa ti occupi adesso? – Della mia tesi.", x: "mit inizia per consonante → womit." },
  { s: "– {Wovon} träumst du? – Von einem Haus am Meer.", it: "– Cosa sogni? – Una casa al mare.", x: "von → wovon." },
  { s: "– {Wovor} hast du Angst? – Vor Spinnen.", it: "– Di cosa hai paura? – Dei ragni.", x: "vor → wovor." },
  { s: "– {Worum} geht es in dem Buch? – Um eine Liebesgeschichte.", it: "– Di cosa parla il libro? – Di una storia d'amore.", x: "um inizia per vocale → wo + r + um = worum." },
  { s: "– {Wonach} hat er gefragt? – Nach dem Preis.", it: "– Cosa ha chiesto? – Il prezzo.", x: "nach → wonach." },
  { s: "– {Wozu} hat sie dich eingeladen? – Zu ihrer Geburtstagsparty.", it: "– A cosa ti ha invitata? – Alla sua festa di compleanno.", x: "zu → wozu." },
  { s: "– {Worauf} freust du dich am meisten? – Auf die Ferien.", it: "– Cosa aspetti con più gioia? – Le vacanze.", x: "sich freuen auf → worauf." },
  { s: "– {Worüber} ärgerst du dich so? – Über den Stau.", it: "– Per cosa ti arrabbi così? – Per il traffico.", x: "sich ärgern über → worüber." },
  { s: "– {Woran} erinnerst du dich noch? – An unsere erste Wohnung.", it: "– Di cosa ti ricordi ancora? – Del nostro primo appartamento.", x: "sich erinnern an → woran." },
  { s: "– {Wobei} kann ich Ihnen helfen? – Beim Ausfüllen des Formulars.", it: "– In cosa posso aiutarLa? – A compilare il modulo.", x: "helfen bei → wobei." },
  { s: "– {Wogegen} protestieren die Studenten? – Gegen die Studiengebühren.", it: "– Contro cosa protestano gli studenti? – Contro le tasse universitarie.", x: "gegen → wogegen." },
  { s: "– {Woraus} besteht der Kuchen? – Aus Mehl, Eiern und Zucker.", it: "– Di cosa è fatta la torta? – Di farina, uova e zucchero.", x: "aus inizia per vocale → woraus." },
  // domanda su una persona → prep + wen/wem
  { s: "– {Auf wen} wartest du? – Auf meine Freundin.", it: "– Chi aspetti? – La mia amica.", x: "Persona → preposizione + pronome interrogativo: auf + Akk. → auf wen." },
  { s: "– {An wen} denkst du? – An meine Mutter.", it: "– A chi pensi? – A mia madre.", x: "Persona + an (Akk.) → an wen. Mai «woran» per le persone." },
  { s: "– {Mit wem} hast du telefoniert? – Mit meinem Chef.", it: "– Con chi hai telefonato? – Con il mio capo.", x: "Persona + mit (Dat.) → mit wem." },
  { s: "– {Von wem} hast du das gehört? – Von Thomas.", it: "– Da chi l'hai sentito? – Da Thomas.", x: "Persona + von (Dat.) → von wem." },
  { s: "– {Um wen} kümmert sich die Pflegerin? – Um meinen Opa.", it: "– Di chi si occupa la badante? – Di mio nonno.", x: "Persona + um (Akk.) → um wen." },
  { s: "– {Über wen} lacht ihr? – Über den Clown.", it: "– Di chi ridete? – Del clown.", x: "Persona + über (Akk.) → über wen." },
  { s: "– {Bei wem} hast du dich beschwert? – Beim Vermieter.", it: "– Con chi ti sei lamentata? – Con il padrone di casa.", x: "Persona + bei (Dat.) → bei wem." },
  { s: "– {Vor wem} hat das Kind Angst? – Vor dem großen Hund des Nachbarn… und vor dem Nachbarn!", it: "– Di chi ha paura il bambino? – Del cane grande del vicino… e del vicino!", x: "Persona + vor (Dat.) → vor wem." },
  // risposta con da(r)+prep (cosa già nominata)
  { s: "– Denkst du an den Termin? – Ja, ich denke {daran}.", it: "– Pensi all'appuntamento? – Sì, ci penso.", x: "Cosa già nominata → da + r + an = daran." },
  { s: "– Freust du dich auf die Reise? – Ja, ich freue mich sehr {darauf}.", it: "– Non vedi l'ora di partire? – Sì, non vedo l'ora.", x: "da + r + auf = darauf." },
  { s: "– Hast du dich über das Geschenk gefreut? – Ja, ich habe mich {darüber} sehr gefreut.", it: "– Ti è piaciuto il regalo? – Sì, mi ha fatto molto piacere.", x: "da + r + über = darüber." },
  { s: "– Bist du mit dem Ergebnis zufrieden? – Nein, ich bin {damit} nicht zufrieden.", it: "– Sei soddisfatta del risultato? – No, non ne sono soddisfatta.", x: "mit → damit (consonante: niente r)." },
  { s: "– Interessierst du dich für Politik? – Nein, {dafür} interessiere ich mich nicht.", it: "– Ti interessi di politica? – No, non mi interessa.", x: "für → dafür." },
  { s: "– Hat er von seinem Urlaub erzählt? – Ja, er hat viel {davon} erzählt.", it: "– Ha raccontato delle vacanze? – Sì, ne ha raccontato molto.", x: "von → davon." },
  { s: "– Hast du Angst vor der Prüfung? – Ein bisschen habe ich Angst {davor}.", it: "– Hai paura dell'esame? – Un po' sì.", x: "vor → davor." },
  { s: "– Kümmerst du dich um die Getränke? – Ja, ich kümmere mich {darum}.", it: "– Ti occupi tu delle bevande? – Sì, me ne occupo io.", x: "um → darum." },
  { s: "– Hast du dich an das frühe Aufstehen gewöhnt? – Nein, {daran} gewöhne ich mich nie!", it: "– Ti sei abituata ad alzarti presto? – No, non mi ci abituerò mai!", x: "an → daran." },
  { s: "– Hast du über meinen Vorschlag nachgedacht? – Ja, ich habe lange {darüber} nachgedacht.", it: "– Hai pensato alla mia proposta? – Sì, ci ho riflettuto a lungo.", x: "über → darüber." },
  { s: "– Wartest du noch auf das Paket? – Ja, ich warte immer noch {darauf}.", it: "– Aspetti ancora il pacco? – Sì, lo aspetto ancora.", x: "auf → darauf." },
  { s: "– Hast du schon mit dem Projekt angefangen? – Nein, ich fange morgen {damit} an.", it: "– Hai già cominciato il progetto? – No, comincio domani.", x: "mit → damit." },
  // risposta con persona → prep + pronome personale
  { s: "– Denkst du oft an deine Oma? – Ja, ich denke oft {an sie}.", it: "– Pensi spesso a tua nonna? – Sì, penso spesso a lei.", x: "Persona → preposizione + pronome personale (an + Akk. → an sie). «daran» sarebbe sbagliato." },
  { s: "– Wartest du auf Paul? – Ja, ich warte {auf ihn}.", it: "– Aspetti Paul? – Sì, aspetto lui.", x: "Persona maschile, auf + Akk. → auf ihn." },
  { s: "– Hast du mit deiner Chefin gesprochen? – Ja, ich habe schon {mit ihr} gesprochen.", it: "– Hai parlato con la tua capa? – Sì, ho già parlato con lei.", x: "Persona femminile, mit + Dat. → mit ihr." },
  { s: "– Ärgerst du dich über deine Kollegen? – Ja, ich ärgere mich oft {über sie}.", it: "– Ti arrabbi con i colleghi? – Sì, mi arrabbio spesso con loro.", x: "Persone (plurale), über + Akk. → über sie." },
  { s: "– Hast du dich bei Herrn Weber bedankt? – Ja, ich habe mich {bei ihm} bedankt.", it: "– Hai ringraziato il signor Weber? – Sì, l'ho ringraziato.", x: "Persona maschile, bei + Dat. → bei ihm." },
  // da(r)+prep che anticipa una frase (dass / zu + infinito)
  { s: "Ich freue mich {darauf}, dass du nächste Woche kommst.", it: "Non vedo l'ora che tu venga la settimana prossima.", x: "Il da-composto anticipa la frase con dass: sich freuen auf → darauf, dass …" },
  { s: "Ich habe keine Lust {darauf}, heute zu kochen.", it: "Non ho voglia di cucinare oggi.", x: "Lust haben auf → darauf + zu + infinito." },
  { s: "Er hat sich {darüber} beschwert, dass das Zimmer zu klein war.", it: "Si è lamentato del fatto che la stanza era troppo piccola.", x: "sich beschweren über → darüber, dass …" },
  { s: "Es kommt {darauf} an, ob wir rechtzeitig fertig werden.", it: "Dipende da se finiamo in tempo.", x: "ankommen auf → es kommt darauf an, ob …" },
  { s: "Bitte denken Sie {daran}, die Rechnung bis Freitag zu bezahlen.", it: "Si ricordi di pagare la fattura entro venerdì.", x: "denken an → daran + zu + infinito." },
  { s: "Wir müssen uns {darum} kümmern, dass alle informiert werden.", it: "Dobbiamo occuparci che tutti vengano informati.", x: "sich kümmern um → darum, dass …" },
  { s: "Ich bin {damit} einverstanden, dass wir den Termin verschieben.", it: "Sono d'accordo a spostare l'appuntamento.", x: "einverstanden sein mit → damit, dass …" },
  { s: "Sie träumt {davon}, eines Tages in Wien zu leben.", it: "Sogna di vivere un giorno a Vienna.", x: "träumen von → davon + zu + infinito." },
  { s: "Ich möchte Sie {darauf} hinweisen, dass die Frist morgen endet.", it: "Vorrei farLe notare che il termine scade domani.", x: "hinweisen auf → darauf, dass … (molto usato nelle e-mail formali)." },
  { s: "Das hängt {davon} ab, wie viel Zeit wir haben.", it: "Dipende da quanto tempo abbiamo.", x: "abhängen von → davon, wie/ob …" },
  { s: "Viele Studien weisen {darauf} hin, dass Sport gegen Stress hilft.", it: "Molti studi indicano che lo sport aiuta contro lo stress.", x: "hinweisen auf → darauf, dass …" },
  { s: "Er hat sich {dafür} entschuldigt, dass er zu spät gekommen ist.", it: "Si è scusato di essere arrivato tardi.", x: "sich entschuldigen für → dafür, dass …" }
];

const PREP_ALL = ["an", "auf", "aus", "bei", "für", "gegen", "in", "mit", "nach", "über", "um", "unter", "von", "vor", "zu"];
const CASE_IT = { A: "Akkusativ", D: "Dativ" };
const woForm = p => "wo" + (/^[aeiouäöü]/.test(p) ? "r" : "") + p;
const daForm = p => "da" + (/^[aeiouäöü]/.test(p) ? "r" : "") + p;
const pvKey = v => v[0] + " " + v[1];
const pvLabel = v => `${v[0]} ${v[1]} + ${v[2] === "A" ? "Akk." : "Dat."}`;
const pvPool = () => { const l = S.prepLvl || "Tutti"; return PREP_VERBS.filter(v => l === "Tutti" || (l === "B1" ? v[6] === "B1" : true)); };
function pvMark(v, ok) {
  S.prep = S.prep || {}; const k = pvKey(v), s = S.prep[k] || { box: 0, ok: 0, ko: 0 };
  if (ok) { s.ok++; s.box = Math.min(5, s.box + 1); } else { s.ko++; s.box = 0; }
  S.prep[k] = s; save();
}
const pvWeak = () => PREP_VERBS.filter(v => { const s = (S.prep || {})[pvKey(v)]; return s && s.ko && s.box < 2; });
const pvKnown = () => PREP_VERBS.filter(v => ((S.prep || {})[pvKey(v)] || {}).box >= 3).length;

const PREP_THEORY = `
  <p>Molti verbi tedeschi reggono una <b>preposizione fissa</b>, spesso diversa dall'italiano (<i>warten <b>auf</b></i> = aspettare <i>qualcosa</i>, <i>denken <b>an</b></i> = pensare <i>a</i>). Va imparata insieme al verbo, come se fosse un'unica parola: <b>warten auf + Akk.</b></p>
  <p><b>Il caso dipende dalla preposizione:</b></p>
  <ul>
    <li>sempre <b>Akkusativ</b>: <i>für, um, gegen</i>, e quasi sempre <i>über</i></li>
    <li>sempre <b>Dativ</b>: <i>mit, nach, von, zu, bei, aus</i></li>
    <li><i>auf</i> e <i>an</i> con questi verbi sono quasi sempre <b>Akkusativ</b> (<i>warten auf den Bus, denken an den Termin</i>). Eccezioni da ricordare: <b>teilnehmen an</b>, <b>arbeiten an</b>, <b>zweifeln an</b>, <b>leiden an</b>, <b>erkennen an</b>, <b>liegen an</b>, <b>interessiert sein an</b>, <b>bestehen auf</b> + Dativ.</li>
    <li><i>vor</i> e <i>unter</i> con i verbi sono <b>Dativ</b> (<i>Angst haben vor dem Hund, leiden unter dem Stress</i>).</li>
  </ul>
  <p><b>Attenzione alle coppie:</b> <i>sich freuen <b>auf</b></i> (qualcosa che deve venire) / <i>sich freuen <b>über</b></i> (qualcosa che c'è già) · <i>sich bewerben <b>um</b></i> (il posto) / <i>bei</i> (l'azienda) · <i>sich bedanken <b>für</b></i> (la cosa) / <i>bei</i> (la persona) · <i>leiden <b>an</b></i> (malattia) / <i>unter</i> (situazione).</p>`;
const WODA_THEORY = `
  <p><b>Cose → wo(r)- e da(r)-</b>. Quando l'oggetto della preposizione è una <b>cosa</b> o un'idea:</p>
  <ul>
    <li>per <b>domandare</b>: <b>wo + preposizione</b> → <i>Worauf wartest du?</i></li>
    <li>per <b>riprendere</b> qualcosa già detto: <b>da + preposizione</b> → <i>Ich warte darauf.</i></li>
    <li>se la preposizione inizia per <b>vocale</b> si inserisce una <b>r</b>: wo<b>r</b>an, wo<b>r</b>auf, wo<b>r</b>über, wo<b>r</b>um, wo<b>r</b>aus · da<b>r</b>an, da<b>r</b>auf, da<b>r</b>über… Con consonante niente r: wofür, womit, wovon, wonach, wozu, wovor, wobei · dafür, damit, davon…</li>
  </ul>
  <p><b>Persone → preposizione + pronome</b>: <i><b>Auf wen</b> wartest du? – Auf Paul. – Ich warte <b>auf ihn</b>.</i> · <i><b>Mit wem</b> sprichst du? – <b>Mit ihr</b>.</i> (wen = Akk., wem = Dat.)</p>
  <p><b>Il da-composto annuncia una frase</b> con <i>dass</i>, <i>ob</i>, <i>w-</i> o <i>zu + infinito</i>: <i>Ich freue mich <b>darauf</b>, dass du kommst.</i> · <i>Ich habe keine Lust <b>darauf</b>, zu kochen.</i> Molto usato nelle e-mail formali: <i>Ich möchte Sie <b>darauf</b> hinweisen, dass …</i></p>
  <table class="tbl" style="margin-top:8px"><tr><th>Prep.</th><th>Domanda (cosa)</th><th>Risposta</th><th>Persona</th></tr>
  ${[["an", "A"], ["auf", "A"], ["über", "A"], ["um", "A"], ["für", "A"], ["mit", "D"], ["von", "D"], ["nach", "D"], ["vor", "D"], ["zu", "D"]].map(([p, c]) => `<tr><td><b>${p}</b></td><td>${woForm(p)}</td><td>${daForm(p)}</td><td>${p} ${c === "A" ? "wen" : "wem"}</td></tr>`).join("")}</table>`;

// ============================================================ HUB
function prepHub(a, b) {
  if (a === "lista") return prepList();
  if (a === "card") return prepCards(b);
  if (a === "scegli") return prepChoose(b);
  if (a === "frasi") return prepCloze(b === "facile" ? "easy" : b === "errori" ? "weak" : "full");
  if (a === "wo") return wodaHub();
  if (a === "woforme") return wodaForms();
  if (a === "wofrasi") return wodaCloze();
  if (a === "test") return prepTest();
  const weak = pvWeak().length, known = pvKnown();
  view("Verbi con preposizione", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#0071e3">${ic("layers")}</span><div style="flex:1"><h2 style="margin:0">Verbi con preposizione</h2>
      <small class="muted">${PREP_VERBS.length} verbi B1–B2 · ${known} già consolidati${weak ? ` · ${weak} da ripassare` : ""}</small></div></div>
      <div class="progress thin" style="margin-top:14px"><i style="width:${known / PREP_VERBS.length * 100}%"></i></div></div>
    <div class="row" style="margin-bottom:16px"><span class="tag">Verbi da usare</span>${seg("plvl", ["B1", "Tutti"], S.prepLvl || "Tutti")}</div>
    <div class="sec"><h3>Impara i verbi</h3></div>
    <div class="mods">
      ${mod("prep/lista", "library", "Lista e regole", "Tutti i verbi con caso ed esempio", "#5e5ce6")}
      ${mod("prep/card", "layers", "Flashcard", "Verbo → preposizione e caso", "#0071e3")}
      ${mod("prep/scegli", "checksq", "Quale preposizione?", "Scegli preposizione + caso", "#30b06a")}
    </div>
    <div class="sec"><h3>Completa le frasi</h3></div>
    <div class="mods">
      ${mod("prep/frasi/facile", "pen", "Solo la preposizione", "Scrivi la preposizione giusta", "#0d9488")}
      ${mod("prep/frasi", "pen", "Preposizione + articolo", "Anche l'articolo al caso giusto", "#e8590c")}
      ${weak ? mod("prep/frasi/errori", "refresh", "Ripassa i tuoi errori", `${weak} verbi sbagliati di recente`, "#ff375f") : ""}
    </div>
    <div class="sec"><h3>Woran? Daran!</h3></div>
    <div class="mods">
      ${mod("prep/wo", "lightbulb", "Wo(r)- e da(r)-: regole", "Woran, worauf, daran, darauf…", "#bf5af2")}
      ${mod("prep/woforme", "checksq", "Forma le parole", "wo/da + preposizione", "#5e5ce6")}
      ${mod("prep/wofrasi", "chat", "Domande e risposte", "Cose, persone, dass/zu", "#d6336c")}
    </div>
    <div class="sec"><h3>Verifica</h3></div>
    <div class="mods">${mod("prep/test", "grad", "Test misto", "20 esercizi di tutti i tipi", "#b8860b")}</div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
  bindSeg("plvl", v => { S.prepLvl = v; save(); prepHub(); });
}

// ============================================================ LISTA
let prepQ = "";
function prepList() {
  const groups = PREP_ALL.map(p => [p, PREP_VERBS.filter(v => v[1] === p)]).filter(g => g[1].length);
  const rows = () => {
    const q = norm(prepQ);
    return groups.map(([p, vs]) => {
      const f = vs.filter(v => !q || norm(v[0] + " " + v[1] + " " + v[3]).includes(q));
      if (!f.length) return "";
      return `<div class="card"><h3>${esc(p)} <span class="tag">${[...new Set(f.map(v => CASE_IT[v[2]]))].join(" / ")}</span></h3>
        ${f.map(v => { const s = v[4].replace(/[{}]/g, ""), st = (S.prep || {})[pvKey(v)];
          return `<div class="vocab"><div style="flex:1"><b>${esc(v[0])} ${esc(v[1])}</b> <span class="badge${v[2] === "D" ? " amber" : ""}">${v[2] === "A" ? "Akk." : "Dat."}</span> <span class="tag">${v[6]}</span>${st && st.box >= 3 ? ` <span class="badge ok">${ic("check")}</span>` : ""}<br>
          <span class="muted">${esc(v[3])}</span><br><small>${esc(s)}</small><br><small class="muted">${esc(v[5])}</small></div>${sayBtn(v[0] + " " + v[1] + ". " + s)}</div>`; }).join("")}</div>`;
    }).join("") || `<div class="card empty"><p>Nessun verbo trovato.</p></div>`;
  };
  view("Lista e regole", `
    <div class="card"><h3>Le regole in breve</h3><div class="theory">${PREP_THEORY}</div></div>
    <input class="answer" id="pq" placeholder="Cerca un verbo o una traduzione…" value="${esc(prepQ)}" autocomplete="off" style="margin-bottom:16px">
    <div id="plist">${rows()}</div>
    <div class="row"><button class="btn" data-go="prep/card">${ic("layers")} Flashcard</button><button class="btn ghost" data-go="prep/frasi/facile">${ic("pen")} Completa le frasi</button></div>`, { back: true, crumb: "Verbi con preposizione", nav: "pratica" });
  $("pq").oninput = e => { prepQ = e.target.value; $("plist").innerHTML = rows(); };
}

// ============================================================ FLASHCARD
function prepCards(mode) {
  const pool = pvPool(), st = S.prep || {};
  const due = shuffle(pool.filter(v => (st[pvKey(v)] || { box: 0 }).box < 3));
  const cards = (due.length >= 12 ? due : due.concat(shuffle(pool.filter(v => !due.includes(v))))).slice(0, 15);
  let i = 0, known = 0;
  const draw = () => {
    if (i >= cards.length) { addXP(8 + known); return finished("Mazzo completato", `${known} verbi saputi su ${cards.length}`, 8 + known, "prep/card"); }
    const v = cards[i], s = v[4].replace(/[{}]/g, "");
    view("Flashcard verbi", `${stepbar(i, cards.length)}
      <div class="flash" id="fc"><div class="inner"><div class="face"><span class="tag">QUALE PREPOSIZIONE E QUALE CASO?</span><div class="prompt" style="margin-top:10px">${esc(v[0])} …</div><small>${esc(v[3])}</small></div>
        <div class="face back"><span class="tag" style="color:#fff;opacity:.8">${CASE_IT[v[2]].toUpperCase()}</span><div class="prompt" style="margin-top:10px">${esc(pvLabel(v))}</div><small>${esc(s)}</small></div></div></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" data-say="${esc(v[0] + " " + v[1] + ". " + s)}">${ic("volume")} Ascolta</button>
        <button class="btn danger" id="no">${ic("refresh")} Da ripassare</button><button class="btn" id="yes">${ic("check")} La so</button></div>
      <p class="muted" style="text-align:center;margin-top:14px">Prova a dire la preposizione e il caso ad alta voce, poi gira la carta.<br><span class="kbd">Spazio</span> gira · <span class="kbd">1</span> da ripassare · <span class="kbd">2</span> la so</p>`, { back: true, crumb: "Verbi con preposizione", nav: "pratica" });
    const fc = $("fc"); let flipped = false;
    const flip = () => { fc.classList.toggle("flip"); if (!flipped) { flipped = true; speak(v[0] + " " + v[1] + ". " + s); } };
    fc.onclick = flip;
    const yes = () => { pvMark(v, true); known++; i++; draw(); }, no = () => { pvMark(v, false); if (cards.filter(x => x === v).length < 2) cards.push(v); i++; draw(); };
    $("yes").onclick = yes; $("no").onclick = no;
    const kh = e => { if (e.target.tagName === "INPUT") return; if (e.code === "Space") { e.preventDefault(); flip(); } if (e.key === "2") yes(); if (e.key === "1") no(); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}

// ============================================================ SCELTA MULTIPLA
function prepMCQuestion(v) {
  const right = v[1] + " + " + CASE_IT[v[2]];
  const cand = new Set([right]);
  if (["an", "auf", "in", "über", "vor", "unter"].includes(v[1])) cand.add(v[1] + " + " + CASE_IT[v[2] === "A" ? "D" : "A"]);
  const others = shuffle(PREP_VERBS.filter(x => x[1] !== v[1] && !PREP_VERBS.some(y => y[0] === v[0] && y[1] === x[1])).map(x => x[1] + " + " + CASE_IT[x[2]]));
  for (const o of others) { if (cand.size >= 4) break; cand.add(o); }
  const options = shuffle([...cand]);
  const alt = PREP_VERBS.filter(x => x[0] === v[0] && x[1] !== v[1]);
  return { q: `**${v[0]}** … (${v[3]})`, options, a: options.indexOf(right), expl: `${pvLabel(v)} — ${v[4].replace(/[{}]/g, "")}${alt.length ? ` · Attenzione: anche ${alt.map(pvLabel).join(", ")} (${alt.map(x => x[3]).join("; ")}).` : ""}` };
}
function prepChoose() {
  const qs = shuffle(pvPool()).slice(0, 12); let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) { addXP(score * 3); return finished(`${score} su ${qs.length}`, score >= 10 ? "Ottimo: preposizioni e casi sotto controllo." : "Ripassa la lista e riprova.", score * 3, "prep/scegli"); }
    const v = qs[i], q = prepMCQuestion(v);
    view("Quale preposizione?", `${stepbar(i, qs.length)}<div class="card"><span class="tag">SCEGLI PREPOSIZIONE E CASO</span>
      <div class="prompt" style="margin:10px 0 6px">${md(q.q)}</div>
      ${q.options.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${k + 1}</span><span>${esc(o)}</span></button>`).join("")}
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: "Verbi con preposizione", nav: "pratica" });
    const answer = k => {
      if ($app.querySelector(".opt:disabled")) return;
      const ok = k === q.a; pvMark(v, ok); if (ok) score++;
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("ok"); });
      if (!ok) $app.querySelector(`.opt[data-k="${k}"]`).classList.add("bad");
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = `${ok ? pick(PRAISE) : "Non proprio."} <span class="muted">${esc(q.expl)}</span>`;
      speak(v[4].replace(/[{}]/g, "")); later(() => { i++; draw(); }, ok ? 2200 : 4200);
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.k));
    const kh = e => { if (/^[1-4]$/.test(e.key)) answer(+e.key - 1); };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}

// ============================================================ MOTORE FRASI DA COMPLETARE
// item: { s: "frase con {risposta|alternativa}", it, x, hint, fill: [indici lacune già compilate], v (verbo, opzionale) }
const gapAns = g => g.split("|");
const gapOK = (typed, g) => gapAns(g).some(a => norm(typed) === norm(a));
function clozeHTML(item) {
  let n = 0;
  return esc(item.s).replace(/\{([^}]+)\}/g, (_, g) => {
    const k = n++, w = Math.max(...gapAns(g).map(a => a.length));
    if ((item.fill || []).includes(k)) return `<b class="gapfix">${esc(gapAns(g)[0])}</b>`;
    return `<input class="gap" data-k="${k}" data-g="${esc(g)}" style="width:${w + 2.2}ch" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Lacuna ${k + 1}">`;
  });
}
function runCloze(title, items, opt = {}) {
  if (!items.length) return emptyState(title, "Nessun esercizio disponibile.");
  let i = 0, score = 0, total = 0; const wrong = [];
  const draw = () => {
    if (i >= items.length) {
      const pct = total ? Math.round(score / total * 100) : 0, xp = Math.round(score * 2.5); addXP(xp);
      view("Risultato", `<div class="card result"><div class="big-num">${pct}%</div><h2 style="margin-top:8px">${pct >= 90 ? "Eccellente" : pct >= 70 ? "Buon lavoro" : "Continua così"}</h2><p class="muted">${score} lacune corrette su ${total} · +${xp} punti</p></div>
        ${wrong.length ? `<div class="card"><h3>Da rivedere</h3>${wrong.map(w => `<div class="vocab"><div><b>${md(w.s.replace(/\{([^}|]+)[^}]*\}/g, "**$1**"))}</b><br><small class="muted">${esc(w.x || "")}</small></div>${sayBtn(w.s.replace(/\{([^}|]+)[^}]*\}/g, "$1").replace(/^– /, ""))}</div>`).join("")}</div>` : ""}
        <div class="row"><button class="btn" data-go="${opt.again}">${ic("refresh")} Ancora</button><button class="btn ghost" data-go="${opt.back || "prep"}">Torna agli esercizi</button></div>`, { back: true, nav: "pratica" });
      if (pct >= 90) confetti(); return;
    }
    const it = items[i];
    view(title, `${stepbar(i, items.length)}<div class="card"><span class="tag">${esc(it.task || opt.task || "COMPLETA LA FRASE")}</span>
      ${it.hint ? `<div style="margin-top:8px"><span class="badge">${esc(it.hint)}</span></div>` : ""}
      <p class="cloze">${clozeHTML(it)}</p>
      <p class="muted" style="margin:0">${esc(it.it || "")}</p>
      <div class="row" style="margin-top:16px"><button class="btn" id="chk">Controlla</button><button class="btn ghost" id="sol">Mostra soluzione</button><span class="spacer"></span><span class="tag"><span class="kbd">Invio</span> controlla / avanti</span></div>
      <div id="fb" class="feedback"></div></div>`, { back: true, crumb: opt.crumb || "Verbi con preposizione", nav: "pratica" });
    const gaps = [...$app.querySelectorAll("input.gap")];
    if (gaps[0]) gaps[0].focus();
    let done = false;
    const check = reveal => {
      if (done) { i++; return draw(); }
      done = true; let ok = 0;
      gaps.forEach(g => { const good = !reveal && gapOK(g.value, g.dataset.g); if (good) ok++; g.classList.add(good ? "ok" : "bad"); g.disabled = true; if (!good) { g.insertAdjacentHTML("afterend", `<span class="gapsol">${esc(gapAns(g.dataset.g)[0])}</span>`); } });
      score += ok; total += gaps.length;
      const all = ok === gaps.length;
      if (it.v) (it.b2 ? b2Mark : pvMark)(it.v, all);
      if (!all) wrong.push(it);
      const full = it.s.replace(/\{([^}|]+)[^}]*\}/g, "$1");
      const fb = $("fb"); fb.className = "feedback " + (all ? "ok" : "bad");
      fb.innerHTML = `${all ? pick(PRAISE) : reveal ? "Soluzione:" : "Non tutto giusto."} <span class="muted">${esc(it.x || "")}</span>`;
      speak(full.replace(/^– /, "").replace(/ – /g, ". "));
      $("chk").textContent = "Avanti"; $("sol").remove();
    };
    $("chk").onclick = () => check(false); $("sol").onclick = () => check(true);
    gaps.forEach((g, k) => g.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); if (!done && k < gaps.length - 1 && !gaps[k + 1].value) gaps[k + 1].focus(); else check(false); } });
    const kh = e => { if (e.key === "Enter" && done && e.target.tagName !== "INPUT") { e.preventDefault(); check(false); } };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
function pvItem(v, easy) {
  return { s: v[4], it: v[5], v, fill: easy ? [1] : [], hint: easy ? `${v[0]} … (${v[3]})` : `${v[0]} (${v[3]})`,
    task: easy ? "SCRIVI LA PREPOSIZIONE" : "SCRIVI PREPOSIZIONE E ARTICOLO", x: `${pvLabel(v)}${easy ? "" : ` → ${v[4].match(/\{[^}]+\}\s*\{([^}]+)\}/)[1]}`}` };
}
function prepCloze(mode) {
  const src = mode === "weak" ? pvWeak() : pvPool();
  const items = shuffle(src).slice(0, 12).map(v => pvItem(v, mode === "easy"));
  runCloze(mode === "easy" ? "Solo la preposizione" : mode === "weak" ? "Ripasso errori" : "Preposizione + articolo", items, { again: "prep/frasi" + (mode === "easy" ? "/facile" : mode === "weak" ? "/errori" : "") });
}

// ============================================================ WO(R)- / DA(R)-
function wodaHub() {
  view("Wo(r)- e da(r)-", `<div class="card"><h3>Woran? Daran! Le regole</h3><div class="theory">${WODA_THEORY}</div></div>
    <div class="mods">
      ${mod("prep/woforme", "checksq", "Forma le parole", "wo/da + preposizione", "#5e5ce6")}
      ${mod("prep/wofrasi", "chat", "Domande e risposte", "Cose, persone, dass/zu", "#d6336c")}
    </div>`, { back: true, crumb: "Verbi con preposizione", nav: "pratica" });
}
function wodaForms() {
  const pool = shuffle(pvPool().filter(v => !/^(gehen|sich handeln|ankommen|liegen)/.test(v[0]))).slice(0, 10);
  const items = pool.map(v => ({ s: `${v[0]} ${v[1]} → domanda: {${woForm(v[1])}}? · risposta: {${daForm(v[1])}}`, it: v[3], x: /^[aeiouäöü]/.test(v[1]) ? `«${v[1]}» inizia per vocale: serve la r → ${woForm(v[1])} / ${daForm(v[1])}.` : `«${v[1]}» inizia per consonante: niente r → ${woForm(v[1])} / ${daForm(v[1])}.`, task: "FORMA WO(R)- E DA(R)-" }));
  runCloze("Forma le parole", items, { again: "prep/woforme", crumb: "Wo(r)- e da(r)-" });
}
function wodaCloze() {
  runCloze("Domande e risposte", shuffle(WODA_ITEMS).slice(0, 12), { again: "prep/wofrasi", crumb: "Wo(r)- e da(r)-", task: "COMPLETA CON WO(R)-, DA(R)- O PREPOSIZIONE + PRONOME" });
}

// ============================================================ TEST MISTO
function prepTest() {
  const vs = shuffle(pvPool());
  const items = [
    ...vs.slice(0, 7).map(v => pvItem(v, false)),
    ...vs.slice(7, 11).map(v => pvItem(v, true)),
    ...shuffle(WODA_ITEMS).slice(0, 9)
  ];
  runCloze("Test misto", shuffle(items), { again: "prep/test" });
}
