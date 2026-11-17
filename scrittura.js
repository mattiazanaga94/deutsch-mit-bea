// ===== Scrittura: tracce B1/B2, correzione con Gemini, storico =====
// Tipi di testo con frasi utili (Redemittel). Le spiegazioni sono in italiano, le frasi in tedesco.
const SX_TYPES = {
  informell: { t: "E-mail informale", s: "a un amico o un'amica (du)", c: "#30b06a",
    tip: "Tono amichevole, <b>du</b>. Rispondi a <b>tutti i punti</b> della consegna, ognuno con almeno 2 frasi, e collegali con connettori (deshalb, außerdem, trotzdem).",
    rm: [["Saluto", ["Liebe Anna, / Lieber Marco,", "Hallo Tom,", "Hi Lisa,"]],
      ["Inizio", ["vielen Dank für deine Mail, ich habe mich sehr darüber gefreut.", "entschuldige, dass ich mich so lange nicht gemeldet habe.", "wie geht es dir? Bei mir ist alles in Ordnung."]],
      ["Raccontare", ["Stell dir vor, letzte Woche …", "Das Beste war, dass …", "Leider ist etwas Blödes passiert: …"]],
      ["Proporre", ["Hast du Lust, … zu …?", "Was hältst du davon, wenn wir …?", "Wie wäre es mit …?", "Ich schlage vor, dass wir …"]],
      ["Consigliare", ["An deiner Stelle würde ich …", "Du solltest unbedingt …", "Ich kann dir … empfehlen."]],
      ["Chiusura", ["Ich freue mich schon auf deine Antwort.", "Melde dich bald!", "Viele Grüße / Liebe Grüße / Bis bald", "Deine Bea"]]] },
  formell: { t: "Messaggio formale", s: "a un'insegnante, un ufficio, un capo (Sie)", c: "#0071e3",
    tip: "Sempre <b>Sie / Ihnen / Ihr</b> con la maiuscola. Frasi complete, niente abbreviazioni, niente <i>Hallo</i>. Spiega subito il motivo del messaggio.",
    rm: [["Saluto", ["Sehr geehrte Frau Weber,", "Sehr geehrter Herr Schmidt,", "Sehr geehrte Damen und Herren,", "Liebe Frau Weber, (se vi conoscete)"]],
      ["Motivo", ["ich schreibe Ihnen, weil …", "ich wende mich an Sie, da …", "leider muss ich Ihnen mitteilen, dass …"]],
      ["Scusarsi", ["Ich möchte mich dafür entschuldigen, dass …", "Es tut mir sehr leid, aber …", "Ich bitte um Ihr Verständnis."]],
      ["Chiedere", ["Könnten Sie mir bitte mitteilen, ob …?", "Ich wäre Ihnen dankbar, wenn Sie …", "Wäre es möglich, dass …?"]],
      ["Chiusura", ["Vielen Dank im Voraus.", "Für Rückfragen stehe ich Ihnen gern zur Verfügung.", "Mit freundlichen Grüßen", "Bea Rossi"]]] },
  forum: { t: "Opinione / Forumsbeitrag", s: "commento in un forum, argomentare", c: "#e8590c",
    tip: "Struttura: <b>tema → opinione → argomenti con esempi → contro-argomento → conclusione</b>. Varia i connettori e le espressioni d'opinione (non solo <i>ich denke</i>).",
    rm: [["Introdurre", ["In diesem Forum wird diskutiert, ob …", "Das Thema … betrifft uns alle.", "Ich möchte meine Meinung zu … äußern."]],
      ["Opinione", ["Meiner Meinung nach …", "Ich bin der Ansicht, dass …", "Ich halte … für sinnvoll / problematisch.", "Aus meiner Sicht …"]],
      ["Argomenti", ["Ein wichtiges Argument dafür ist, dass …", "Hinzu kommt, dass …", "Außerdem darf man nicht vergessen, dass …", "Ein Beispiel dafür ist …"]],
      ["Contro", ["Andererseits muss man bedenken, dass …", "Kritiker behaupten zwar, dass …, aber …", "Es stimmt zwar, dass …, trotzdem …"]],
      ["Esperienza", ["In meinem Heimatland ist es so, dass …", "Ich habe selbst erlebt, dass …", "Bei uns in Italien …"]],
      ["Conclusione", ["Zusammenfassend lässt sich sagen, dass …", "Alles in allem bin ich überzeugt, dass …", "Deshalb plädiere ich dafür, …"]]] },
  beschwerde: { t: "Reclamo", s: "lamentarsi in modo formale e chiedere una soluzione", c: "#ff375f",
    tip: "Fatti precisi (data, prodotto, numero d'ordine), tono <b>deciso ma cortese</b>, e una <b>richiesta concreta</b> con una scadenza.",
    rm: [["Motivo", ["hiermit möchte ich mich über … beschweren.", "leider war ich mit … überhaupt nicht zufrieden.", "am 12. Mai habe ich bei Ihnen … bestellt."]],
      ["Problema", ["Zu meiner großen Enttäuschung musste ich feststellen, dass …", "Entgegen Ihrer Beschreibung …", "Außerdem …, was besonders ärgerlich war."]],
      ["Richiesta", ["Ich erwarte deshalb, dass Sie …", "Ich bitte Sie, mir den Betrag bis zum … zurückzuerstatten.", "Ich bestehe auf einem Umtausch / einer Entschädigung."]],
      ["Chiusura", ["Ich hoffe auf eine baldige Lösung.", "Sollte ich bis … nichts von Ihnen hören, werde ich …", "Mit freundlichen Grüßen"]]] },
  anfrage: { t: "Richiesta di informazioni", s: "corsi, alloggi, lavoro, servizi", c: "#5e5ce6",
    tip: "Presentati in una frase, spiega <b>perché</b> scrivi e fai domande precise usando le domande indirette (<i>ob, wann, wie viel…</i>): verbo in fondo!",
    rm: [["Inizio", ["mit großem Interesse habe ich Ihre Anzeige in … gelesen.", "ich interessiere mich für …", "ich habe auf Ihrer Website gesehen, dass …"]],
      ["Presentarsi", ["Ich bin 25 Jahre alt und komme aus Italien.", "Zurzeit arbeite ich als …", "Ich lerne seit … Deutsch."]],
      ["Domande", ["Ich würde gern wissen, ob …", "Könnten Sie mir mitteilen, wann / wie viel / wie lange …?", "Außerdem interessiert mich, …", "Gibt es die Möglichkeit, …?"]],
      ["Chiusura", ["Über eine baldige Antwort würde ich mich sehr freuen.", "Vielen Dank für Ihre Mühe.", "Mit freundlichen Grüßen"]]] }
};

// Tracce d'esame (Goethe e telc). words = parole richieste, min = minuti consigliati.
const SX_TASKS = [
  // ---------- B1 · Goethe Teil 1: e-mail informale (80 parole, 3 punti)
  { id: "b1i1", lv: "B1", ty: "informell", ex: "Goethe B1 · Teil 1", words: 80, min: 20, title: "Ein neuer Job",
    sit: "Sie haben vor zwei Wochen eine neue Arbeitsstelle angefangen. Ihr Freund Jonas hat davon noch nichts gehört. Schreiben Sie Jonas eine E-Mail.",
    pts: ["Beschreiben Sie: Wie ist die neue Arbeit?", "Begründen Sie: Warum haben Sie die Stelle gewechselt?", "Machen Sie einen Vorschlag für ein Treffen."] },
  { id: "b1i2", lv: "B1", ty: "informell", ex: "Goethe B1 · Teil 1", words: 80, min: 20, title: "Umzug in eine neue Wohnung",
    sit: "Sie sind letzten Monat in eine neue Wohnung umgezogen. Ihre Freundin Clara wohnt in einer anderen Stadt. Schreiben Sie Clara eine E-Mail.",
    pts: ["Beschreiben Sie: Wie ist die neue Wohnung?", "Begründen Sie: Warum sind Sie umgezogen?", "Laden Sie Clara zu einer Einweihungsparty ein."] },
  { id: "b1i3", lv: "B1", ty: "informell", ex: "Goethe B1 · Teil 1", words: 80, min: 20, title: "Ein schönes Wochenende",
    sit: "Sie haben am Wochenende einen Ausflug in die Berge gemacht. Ihr Freund Paul konnte leider nicht mitkommen. Schreiben Sie Paul eine E-Mail.",
    pts: ["Beschreiben Sie: Was haben Sie erlebt?", "Begründen Sie: Was hat Ihnen am besten gefallen?", "Machen Sie einen Vorschlag für einen gemeinsamen Ausflug."] },
  { id: "b1i4", lv: "B1", ty: "informell", ex: "Goethe B1 · Teil 1", words: 80, min: 20, title: "Absage für die Geburtstagsfeier",
    sit: "Ihre Freundin Mia hat Sie zu ihrer Geburtstagsfeier am Samstag eingeladen. Sie können leider nicht kommen. Schreiben Sie Mia eine E-Mail.",
    pts: ["Bedanken Sie sich für die Einladung.", "Erklären Sie, warum Sie nicht kommen können.", "Schlagen Sie ein anderes Treffen vor."] },
  { id: "b1i5", lv: "B1", ty: "informell", ex: "Goethe B1 · Teil 1", words: 80, min: 20, title: "Ein Deutschkurs im Ausland",
    sit: "Sie haben im Sommer einen Deutschkurs in Wien besucht. Ihre Freundin Lena möchte auch einen Sprachkurs machen. Schreiben Sie Lena eine E-Mail.",
    pts: ["Beschreiben Sie den Kurs und die Stadt.", "Was war gut, was war nicht so gut?", "Geben Sie Lena einen Rat."] },
  { id: "b1i6", lv: "B1", ty: "informell", ex: "Goethe B1 · Teil 1", words: 80, min: 20, title: "Ein neues Hobby",
    sit: "Sie haben vor kurzem ein neues Hobby angefangen. Ihr Freund Max sucht auch eine Freizeitbeschäftigung. Schreiben Sie Max eine E-Mail.",
    pts: ["Beschreiben Sie Ihr neues Hobby.", "Begründen Sie: Warum macht es Ihnen Spaß?", "Machen Sie Max einen Vorschlag."] },
  // ---------- B1 · Goethe Teil 2: opinione nel forum (80 parole)
  { id: "b1f1", lv: "B1", ty: "forum", ex: "Goethe B1 · Teil 2", words: 80, min: 25, title: "Handys in der Schule",
    sit: "Sie haben im Radio eine Diskussionssendung zum Thema „Handyverbot an Schulen“ gehört. Im Online-Gästebuch der Sendung finden Sie folgende Meinung:",
    q: "„Ich finde, Handys sollten in der Schule komplett verboten werden. Die Schüler können sich sonst nicht konzentrieren.“ (Karin, 45)",
    pts: ["Schreiben Sie nun Ihre Meinung (ca. 80 Wörter)."] },
  { id: "b1f2", lv: "B1", ty: "forum", ex: "Goethe B1 · Teil 2", words: 80, min: 25, title: "Leben ohne Auto",
    sit: "Sie haben im Fernsehen eine Sendung zum Thema „Brauchen wir in der Stadt noch ein Auto?“ gesehen. Im Online-Gästebuch der Sendung finden Sie folgende Meinung:",
    q: "„Ohne Auto geht es bei mir nicht. Mit Bus und Bahn brauche ich viel zu lange zur Arbeit.“ (Stefan, 38)",
    pts: ["Schreiben Sie nun Ihre Meinung (ca. 80 Wörter)."] },
  { id: "b1f3", lv: "B1", ty: "forum", ex: "Goethe B1 · Teil 2", words: 80, min: 25, title: "Online einkaufen",
    sit: "In einem Internetforum wird diskutiert: „Kaufen Sie lieber im Internet oder im Geschäft ein?“ Sie lesen folgenden Beitrag:",
    q: "„Ich kaufe fast alles online. Das ist billiger und ich spare viel Zeit.“ (Julia, 27)",
    pts: ["Schreiben Sie nun Ihre Meinung (ca. 80 Wörter)."] },
  { id: "b1f4", lv: "B1", ty: "forum", ex: "Goethe B1 · Teil 2", words: 80, min: 25, title: "Haustiere in der Wohnung",
    sit: "In einer Radiosendung geht es um das Thema „Haustiere in der Stadtwohnung“. Im Online-Gästebuch lesen Sie:",
    q: "„Hunde gehören nicht in eine kleine Stadtwohnung. Das ist für die Tiere nicht gut.“ (Peter, 52)",
    pts: ["Schreiben Sie nun Ihre Meinung (ca. 80 Wörter)."] },
  { id: "b1f5", lv: "B1", ty: "forum", ex: "Goethe B1 · Teil 2", words: 80, min: 25, title: "Ein Jahr im Ausland",
    sit: "In einem Forum für junge Leute wird diskutiert: „Sollte jeder nach der Schule ein Jahr im Ausland verbringen?“ Sie lesen:",
    q: "„Ein Jahr im Ausland ist Zeitverschwendung. Man sollte lieber gleich studieren oder arbeiten.“ (Tim, 19)",
    pts: ["Schreiben Sie nun Ihre Meinung (ca. 80 Wörter)."] },
  // ---------- B1 · Goethe Teil 3: messaggio formale breve (40 parole)
  { id: "b1k1", lv: "B1", ty: "formell", ex: "Goethe B1 · Teil 3", words: 40, min: 15, title: "Absage beim Kursleiter",
    sit: "Ihr Kursleiter, Herr Bauer, hat Sie zu einem Kursabend in einem Restaurant eingeladen. Sie können leider nicht kommen. Schreiben Sie Herrn Bauer eine E-Mail.",
    pts: ["Entschuldigen Sie sich höflich und erklären Sie, warum Sie nicht kommen können."] },
  { id: "b1k2", lv: "B1", ty: "formell", ex: "Goethe B1 · Teil 3", words: 40, min: 15, title: "Termin beim Arzt verschieben",
    sit: "Sie haben morgen um 10 Uhr einen Termin bei Ihrer Hausärztin, Frau Dr. Lehmann. Sie müssen aber arbeiten. Schreiben Sie der Praxis.",
    pts: ["Entschuldigen Sie sich, nennen Sie den Grund und bitten Sie um einen neuen Termin."] },
  { id: "b1k3", lv: "B1", ty: "formell", ex: "Goethe B1 · Teil 3", words: 40, min: 15, title: "Später zur Arbeit",
    sit: "Ihre Chefin, Frau Neumann, erwartet Sie morgen früh zu einer wichtigen Besprechung. Sie haben ein Problem und kommen später. Schreiben Sie Frau Neumann.",
    pts: ["Erklären Sie die Situation und machen Sie einen Vorschlag."] },
  { id: "b1k4", lv: "B1", ty: "formell", ex: "Goethe B1 · Teil 3", words: 40, min: 15, title: "Bitte an die Nachbarin",
    sit: "Sie fahren für eine Woche in Urlaub. Ihre Nachbarin, Frau Koch, kennen Sie nur wenig. Schreiben Sie Frau Koch eine kurze Nachricht.",
    pts: ["Bitten Sie sie höflich, Ihre Blumen zu gießen, und bedanken Sie sich."] },
  // ---------- B1 · telc: lettera semiformale con 4 punti
  { id: "b1t1", lv: "B1", ty: "anfrage", ex: "telc B1 · Schreiben", words: 100, min: 30, title: "Anfrage an eine Sprachschule",
    sit: "Sie möchten im Sommer einen Intensivkurs Deutsch in Berlin machen und haben die Anzeige der Sprachschule „Sprachpunkt“ gelesen. Schreiben Sie an die Schule.",
    pts: ["Grund für Ihr Schreiben", "Kursniveau und Kurszeiten", "Unterkunft", "Preise und Ermäßigungen"] },
  { id: "b1t2", lv: "B1", ty: "beschwerde", ex: "telc B1 · Schreiben", words: 100, min: 30, title: "Probleme mit der Ferienwohnung",
    sit: "Sie haben eine Woche in einer Ferienwohnung an der Ostsee verbracht. Leider war vieles nicht so wie in der Anzeige. Schreiben Sie an die Vermieterin, Frau Petersen.",
    pts: ["Grund für Ihr Schreiben", "Was war nicht in Ordnung?", "Wie haben Sie reagiert?", "Was erwarten Sie jetzt?"] },
  { id: "b1t3", lv: "B1", ty: "informell", ex: "telc B1 · Schreiben", words: 100, min: 30, title: "Ein Brief an die Gastfamilie",
    sit: "Sie haben letzten Sommer drei Wochen bei einer Gastfamilie in Freiburg gewohnt. Schreiben Sie der Familie einen Brief.",
    pts: ["Dank für die Zeit", "Was haben Sie seitdem gemacht?", "Woran denken Sie besonders gern zurück?", "Einladung nach Italien"] },
  // ---------- B2 · Goethe Teil 1: contributo nel forum (150 parole, 4 punti)
  { id: "b2f1", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Homeoffice für alle?",
    sit: "Sie schreiben einen Beitrag in einem Online-Forum zum Thema „Arbeiten von zu Hause“.",
    pts: ["Äußern Sie Ihre Meinung zum Homeoffice.", "Nennen Sie Vorteile für Arbeitnehmer.", "Nennen Sie mögliche Nachteile für Teams und Firmen.", "Beschreiben Sie die Situation in Ihrem Heimatland."] },
  { id: "b2f2", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Soziale Medien und Jugendliche",
    sit: "In einem Elternforum wird diskutiert, ob soziale Medien erst ab 16 Jahren erlaubt sein sollten. Schreiben Sie einen Forumsbeitrag.",
    pts: ["Äußern Sie Ihre Meinung zu einer Altersgrenze.", "Welche Gefahren sehen Sie für Jugendliche?", "Welche positiven Seiten haben soziale Medien?", "Welche Alternativen zu einem Verbot gibt es?"] },
  { id: "b2f3", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Fleisch essen – noch zeitgemäß?",
    sit: "Ein Online-Magazin fragt seine Leserinnen und Leser: „Sollten wir aus Klimagründen weniger Fleisch essen?“ Schreiben Sie einen Beitrag.",
    pts: ["Äußern Sie Ihre Meinung zum Thema.", "Welche Rolle spielt Fleisch in Ihrer Esskultur?", "Welche Argumente sprechen für eine Steuer auf Fleisch?", "Was kann jeder Einzelne tun?"] },
  { id: "b2f4", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Studiengebühren",
    sit: "In einem Studentenforum wird über die Frage diskutiert, ob Universitäten Studiengebühren verlangen sollten. Schreiben Sie einen Beitrag.",
    pts: ["Äußern Sie Ihre Meinung zu Studiengebühren.", "Welche Folgen haben Gebühren für Studierende?", "Wie wird das Studium in Ihrem Heimatland finanziert?", "Machen Sie einen Vorschlag für eine gerechte Lösung."] },
  { id: "b2f5", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Die Vier-Tage-Woche",
    sit: "Ein Wirtschaftsmagazin fragt: „Sollte die Vier-Tage-Woche zur Regel werden?“ Schreiben Sie einen Beitrag für das Online-Forum.",
    pts: ["Äußern Sie Ihre Meinung zur Vier-Tage-Woche.", "Welche Vorteile hätte sie für die Gesundheit?", "Für welche Berufe ist sie schwer umzusetzen?", "Wie sieht die Arbeitszeit in Ihrem Heimatland aus?"] },
  { id: "b2f6", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Künstliche Intelligenz im Unterricht",
    sit: "Auf der Website einer Zeitung wird diskutiert, ob Schülerinnen und Schüler KI-Programme für Hausaufgaben benutzen dürfen. Schreiben Sie einen Beitrag.",
    pts: ["Äußern Sie Ihre Meinung zum Thema.", "Welche Chancen bietet KI beim Lernen?", "Welche Risiken sehen Sie?", "Wie sollten Schulen damit umgehen?"] },
  { id: "b2f7", lv: "B2", ty: "forum", ex: "Goethe B2 · Teil 1", words: 150, min: 50, title: "Tourismus in Städten",
    sit: "In einem Reiseforum wird über „Overtourism“ in Städten wie Venedig oder Barcelona diskutiert. Schreiben Sie einen Beitrag.",
    pts: ["Äußern Sie Ihre Meinung zum Massentourismus.", "Welche Probleme haben die Einwohner?", "Welche Vorteile bringt der Tourismus?", "Welche Maßnahmen halten Sie für sinnvoll?"] },
  // ---------- B2 · Goethe Teil 2: messaggio formale (100 parole, 4 punti)
  { id: "b2k1", lv: "B2", ty: "formell", ex: "Goethe B2 · Teil 2", words: 100, min: 25, title: "Teamausflug organisieren",
    sit: "Sie arbeiten in einer Firma und sollen den jährlichen Teamausflug organisieren. Ihr Abteilungsleiter, Herr Krüger, hat Sie um einen Vorschlag gebeten. Schreiben Sie Herrn Krüger.",
    pts: ["Entschuldigen Sie sich für die späte Antwort.", "Machen Sie einen Vorschlag für Ziel und Programm.", "Nennen Sie die Kosten.", "Bitten Sie um eine schnelle Entscheidung."] },
  { id: "b2k2", lv: "B2", ty: "formell", ex: "Goethe B2 · Teil 2", words: 100, min: 25, title: "Kurs nicht bestanden",
    sit: "Sie haben die Abschlussprüfung Ihres Weiterbildungskurses nicht bestanden, weil Sie am Prüfungstag krank waren. Schreiben Sie an die Kursleiterin, Frau Dr. Horn.",
    pts: ["Erklären Sie die Situation.", "Bitten Sie um einen Nachholtermin.", "Fragen Sie nach Unterlagen zur Vorbereitung.", "Bedanken Sie sich für ihr Verständnis."] },
  { id: "b2k3", lv: "B2", ty: "formell", ex: "Goethe B2 · Teil 2", words: 100, min: 25, title: "Vertretung im Verein",
    sit: "Sie sind im Vorstand eines Sportvereins und können an der nächsten Mitgliederversammlung nicht teilnehmen. Schreiben Sie an die Vorsitzende, Frau Albers.",
    pts: ["Erklären Sie, warum Sie nicht kommen können.", "Schlagen Sie eine Vertretung vor.", "Nennen Sie ein Thema, das besprochen werden sollte.", "Bieten Sie weitere Hilfe an."] },
  { id: "b2k4", lv: "B2", ty: "formell", ex: "Goethe B2 · Teil 2", words: 100, min: 25, title: "Praktikumsplatz",
    sit: "Ihre Praktikumsbetreuerin, Frau Vogel, hat Ihnen ein Praktikum in der Marketingabteilung angeboten. Sie haben aber noch Fragen. Schreiben Sie Frau Vogel.",
    pts: ["Bedanken Sie sich für das Angebot.", "Fragen Sie nach den Aufgaben.", "Klären Sie die Arbeitszeiten.", "Schlagen Sie einen Termin für ein Gespräch vor."] },
  // ---------- B2 · telc: lettera formale (reclamo / richiesta)
  { id: "b2t1", lv: "B2", ty: "beschwerde", ex: "telc B2 · Schreiben", words: 150, min: 30, title: "Beschwerde über einen Online-Shop",
    sit: "Sie haben bei einem Online-Shop einen Laptop bestellt. Er kam zwei Wochen zu spät und funktioniert nicht richtig. Der Kundenservice antwortet nicht. Schreiben Sie eine Beschwerde.",
    pts: ["Bestellung und Lieferung", "Mängel am Gerät", "Ihre bisherigen Versuche, den Kundenservice zu erreichen", "Ihre Forderungen"] },
  { id: "b2t2", lv: "B2", ty: "beschwerde", ex: "telc B2 · Schreiben", words: 150, min: 30, title: "Ärger mit der Hausverwaltung",
    sit: "Die Heizung in Ihrer Wohnung ist seit drei Wochen kaputt. Sie haben die Hausverwaltung schon zweimal angerufen, aber nichts ist passiert. Schreiben Sie an die Hausverwaltung.",
    pts: ["Beschreibung des Problems", "Folgen für Sie", "Bisherige Kontakte", "Ihre Forderungen und eine Frist"] },
  { id: "b2t3", lv: "B2", ty: "anfrage", ex: "telc B2 · Schreiben", words: 150, min: 30, title: "Bewerbung um ein Stipendium",
    sit: "Sie haben auf der Website einer deutschen Stiftung gelesen, dass sie Stipendien für einen Master in Deutschland vergibt. Schreiben Sie an die Stiftung.",
    pts: ["Grund für Ihr Schreiben und Ihr Studienziel", "Ihre Qualifikationen", "Fragen zu Bewerbungsfristen und Unterlagen", "Fragen zur Höhe des Stipendiums"] },
  { id: "b2t4", lv: "B2", ty: "anfrage", ex: "telc B2 · Schreiben", words: 150, min: 30, title: "Anfrage an ein Hotel für eine Firmenfeier",
    sit: "Ihre Firma plant eine Feier zum 20-jährigen Jubiläum mit 60 Gästen. Sie sollen ein passendes Hotel finden. Schreiben Sie an das Hotel „Seeblick“.",
    pts: ["Anlass und Datum", "Räume und Technik", "Essen und Getränke (auch vegetarisch)", "Preise und Übernachtungsmöglichkeiten"] }
];

// Categorie di errore
const SX_CAT = { Grammatik: ["Grammatica", "#ff375f"], Wortschatz: ["Lessico", "#5e5ce6"], Rechtschreibung: ["Ortografia", "#e8590c"], Zeichensetzung: ["Punteggiatura", "#0d9488"], Stil: ["Stile / registro", "#0071e3"] };
const SX_CRIT = { "Erfüllung": "Svolgimento del compito", "Kohärenz": "Coerenza e struttura", "Wortschatz": "Lessico", "Strukturen": "Grammatica e strutture" };

const SX_SYS = "Du bist erfahrene Prüferin für die Goethe- und telc-Prüfungen B1 und B2 und DaF-Lehrerin. Du korrigierst die Texte der Italienerin Bea (25 Jahre) gründlich, genau und fair, wie in der echten Prüfung. Alle Erklärungen für Bea auf Italienisch, kurz und klar. Antworte ausschließlich mit gültigem JSON ohne Markdown.";
const sxList = () => (S.schreib = arr(S.schreib));
const sxWords = t => String(t || "").trim().split(/\s+/).filter(Boolean).length;
const sxDate = d => new Date(d).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
const sxTypeOf = t => SX_TYPES[t] || { t: "Testo libero", s: "", c: "#86868b", tip: "", rm: [] };
const sxDraftKey = k => "sx-draft-" + k;
const sxGet = k => { try { return localStorage.getItem(sxDraftKey(k)) || ""; } catch { return ""; } };
const sxSet = (k, v) => { try { v ? localStorage.setItem(sxDraftKey(k), v) : localStorage.removeItem(sxDraftKey(k)); } catch {} };
const sxScoreColor = p => p >= 80 ? "var(--ok)" : p >= 60 ? "#e8590c" : "var(--bad)";

function sxRedemittel(ty, open) {
  const T = SX_TYPES[ty]; if (!T) return "";
  return `<details class="card acc" ${open ? "open" : ""}><summary><div><h3 style="margin:0">Frasi utili: ${esc(T.t)}</h3><small class="muted">${esc(T.s)}</small></div>${ic("right")}</summary>
    <p class="theory" style="margin-top:12px">${T.tip}</p>
    <div class="sx-rm">${T.rm.map(([h, l]) => `<div><span class="tag">${esc(h.toUpperCase())}</span>${l.map(x => `<button class="sx-ph" data-ph="${esc(x)}" title="Inserisci nel testo">${esc(x)}</button>`).join("")}</div>`).join("")}</div></details>`;
}

// ---------- HUB
function sxHub(a, b) {
  if (a === "t") return sxEditor(b === "ia" ? sxAiTask() : SX_TASKS.find(t => t.id === b));
  if (a === "ia") return sxAiPick();
  if (a === "libero") return sxFree();
  if (a === "storico") return b ? sxShow(b) : sxHistory();
  const L = S.level, list = sxList(), last = list.slice(0, 5), avg = last.length ? Math.round(last.reduce((s, e) => s + e.r.prozent, 0) / last.length) : 0;
  const tasks = SX_TASKS.filter(t => t.lv === L), groups = [...new Set(tasks.map(t => t.ex))];
  const doneIds = new Set(list.map(e => e.task.id));
  view("Scrittura", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#e8590c">${ic("edit")}</span><div style="flex:1"><h2 style="margin:0">Scrivi, ricevi la correzione, riscrivi</h2>
      <small class="muted">Tracce d'esame Goethe e telc ${L}. Gemini evidenzia ogni errore nel tuo testo, lo spiega in italiano, ti dà la versione corretta e un punteggio per criterio. Tutti i testi restano nello storico.</small></div></div>
      ${list.length ? `<div class="kpis sx-kpis"><div class="kpi"><b>${list.length}</b><small>testi corretti</small></div><div class="kpi"><b>${avg}%</b><small>media ultimi ${last.length}</small></div><div class="kpi"><b>${Math.max(...list.map(e => e.r.prozent))}%</b><small>miglior voto</small></div></div>` : ""}</div>
    <div class="row" style="margin:4px 0 16px">${seg("lvl", ["B1", "B2"], L)}<span class="spacer"></span><span class="tag">${tasks.length} tracce ${L}</span></div>
    <div class="mods">
      ${mod("scrittura/ia", "sparkles", "Traccia nuova con l'IA", "Scegli il tipo di testo, Gemini inventa la consegna", "#d6336c")}
      ${mod("scrittura/libero", "pen", "Correggi un mio testo", "Una mail vera, un tema libero, qualsiasi testo", "#0071e3")}
      ${mod("scrittura/storico", "clock", "Storico e progressi", list.length ? `${list.length} testi · errori più frequenti` : "I testi corretti finiscono qui", "#30b06a")}
    </div>
    <div class="sec"><h3>Tracce d'esame ${L}</h3></div>
    ${groups.map(g => { const ts = tasks.filter(t => t.ex === g), T = sxTypeOf(ts[0].ty); return `<div class="card"><div class="row"><span class="badge">${esc(g)}</span><span class="spacer"></span><small class="muted">${ts[0].words} parole · ${ts[0].min} min</small></div>
      <p class="muted" style="margin:8px 0 4px">${esc(T.t)}: ${esc(T.s)}</p>
      ${ts.map(t => `<a class="task" href="#scrittura/t/${t.id}" style="text-decoration:none;color:inherit"><span class="ck" style="${doneIds.has(t.id) ? "background:var(--ok);border-color:var(--ok);color:#fff" : ""}">${doneIds.has(t.id) ? ic("check") : ""}</span><span class="t"><b>${esc(t.title)}</b><small>${esc(sxTypeOf(t.ty).t)}${sxGet(t.id) ? " · bozza salvata" : ""}</small></span>${ic("right")}</a>`).join("")}</div>`; }).join("")}
    <div class="sec"><h3>Frasi utili per tipo di testo</h3></div>
    ${Object.keys(SX_TYPES).map(k => sxRedemittel(k)).join("")}
    <div class="card"><h3>Come si alza il punteggio</h3><ul class="theory">
      <li><b>Svolgimento:</b> tratta <b>tutti</b> i punti della consegna e rispetta la lunghezza (±10%). Un punto dimenticato costa più di qualche errore.</li>
      <li><b>Coerenza:</b> saluto e chiusura giusti per il registro, paragrafi, connettori vari (<i>deshalb, trotzdem, außerdem, obwohl</i>).</li>
      <li><b>Lessico:</b> evita di ripetere <i>sagen, machen, gut</i>: usa i verbi precisi (vedi «Verbi per scrivere» nel vocabolario).</li>
      <li><b>Strutture:</b> alterna frasi principali e subordinate, usa il Konjunktiv II per le richieste cortesi (<i>Könnten Sie…, Ich würde gern…</i>).</li>
      <li><b>Riscrivi:</b> dopo la correzione, riscrivi il testo da sola. È il passo che fa imparare di più.</li></ul></div>`, { nav: "scrittura" });
  bindSeg("lvl", v => { S.level = v; save(); sxHub(); });
  sxBindPhrases();
}
function sxBindPhrases(ta) {
  $app.querySelectorAll(".sx-ph").forEach(b => b.onclick = () => {
    const t = ta || $("sxtxt");
    if (!t) { navigator.clipboard?.writeText(b.dataset.ph).then(() => toast("Frase copiata."), () => {}); return; }
    const ph = b.dataset.ph.replace(/\s*\(.*\)$/, "").replace(/ \/ .*$/, ""), s = t.selectionStart ?? t.value.length;
    t.value = t.value.slice(0, s) + ph + " " + t.value.slice(t.selectionEnd ?? s); t.focus(); t.selectionStart = t.selectionEnd = s + ph.length + 1; t.dispatchEvent(new Event("input"));
  });
}

// ---------- TRACCIA CON L'IA
function sxAiTask() { try { return JSON.parse(sessionStorage.getItem("sx-ai") || "null"); } catch { return null; } }
function sxAiPick() {
  const L = S.level;
  view("Traccia con l'IA", `<div class="card"><label class="fl">Livello</label>${seg("lvl", ["B1", "B2"], L)}
    <label class="fl" style="margin-top:14px">Tipo di testo</label><select class="answer" id="ty">${Object.entries(SX_TYPES).map(([k, v]) => `<option value="${k}">${esc(v.t)} (${esc(v.s)})</option>`).join("")}</select>
    <label class="fl">Tema (facoltativo)</label><input class="answer" id="topic" placeholder="es. lavoro, ambiente, viaggi, salute, tecnologia…">
    <button class="btn lg" id="gen" style="margin-top:16px">${ic("sparkles")} Genera la traccia</button></div>`, { back: true, crumb: "Scrittura", nav: "scrittura" });
  let lv = L; bindSeg("lvl", v => { lv = v; $("lvl").querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.v === v)); });
  $("gen").onclick = async function gen() {
    const ty = $("ty")?.value || "forum", topic = $("topic")?.value.trim() || pick(TOPICS), T = SX_TYPES[ty];
    const words = { B1: { informell: 80, forum: 80, formell: 60, beschwerde: 100, anfrage: 100 }, B2: { informell: 120, forum: 150, formell: 100, beschwerde: 150, anfrage: 150 } }[lv][ty];
    loading("Traccia con l'IA", T.t + " · " + topic);
    try {
      const d = await gemini(`Erstelle eine realistische Schreibaufgabe im Stil der Prüfungen Goethe-Zertifikat / telc ${lv}. Textsorte: ${T.t} (${ty}). Thema: ${topic}. Länge: ca. ${words} Wörter.
${ty === "forum" ? "Gib im Feld \"q\" einen kurzen Ausgangsbeitrag (Meinung einer Person mit Name und Alter), auf den man reagiert, ODER lass \"q\" leer und gib 4 Inhaltspunkte." : "Lass \"q\" leer."}
Die Situation ist auf Deutsch, klar und konkret (Namen, Anlass). ${lv === "B2" ? "4 Inhaltspunkte." : "3 Inhaltspunkte."}
JSON: {"title": "kurzer deutscher Titel", "sit": "Situation und Aufgabe auf Deutsch", "q": "Ausgangstext oder leer", "pts": ["Inhaltspunkt", "..."]}`, GEN_SYS, true);
      const task = { id: "ia", lv, ty, ex: "Traccia IA · " + lv, words, min: Math.round(words / 4), title: d.title, sit: d.sit, q: d.q || "", pts: arr(d.pts) };
      try { sessionStorage.setItem("sx-ai", JSON.stringify(task)); } catch {}
      sxSet("ia", ""); go("scrittura/t/ia");
    } catch (e) { aiError("Traccia con l'IA", e, gen); }
  };
}

// ---------- TESTO LIBERO
function sxFree() {
  sxEditor({ id: "libero", lv: S.level, ty: "", ex: "Testo libero", words: 0, min: 0, title: "", sit: "", pts: [], free: true });
}

// ---------- EDITOR
function sxEditor(task, pre) {
  if (!task) return sxHub();
  const T = sxTypeOf(task.ty), dk = pre?.root ? "re-" + pre.root : task.id;
  const taskHtml = task.free ? `<div class="card"><h2 style="margin:0 0 6px">Correggi un mio testo</h2><p class="muted" style="margin:0">Incolla o scrivi qualsiasi testo: una mail vera, un tema, un messaggio. Gemini lo corregge al livello scelto.</p>
      <div class="row" style="margin-top:14px;gap:10px;flex-wrap:wrap">${seg("lvl", ["B1", "B2"], task.lv)}<select class="answer" id="fty" style="flex:1;min-width:180px;margin:0"><option value="">Tipo di testo: altro</option>${Object.entries(SX_TYPES).map(([k, v]) => `<option value="${k}">${esc(v.t)}</option>`).join("")}</select></div>
      <label class="fl">Che cosa dovevi scrivere? (facoltativo)</label><input class="answer" id="fgoal" placeholder="es. mail al proprietario di casa per la caldaia rotta"></div>`
    : `<div class="card"><div class="row"><span class="badge">${esc(task.ex)}</span><span class="tag" style="color:${T.c}">${esc(T.t)}</span><span class="spacer"></span>${task.min ? `<button class="btn ghost sm" id="tbtn">${ic("clock")} <span>Cronometro ${task.min} min</span></button>` : ""}</div>
      <h2 style="margin:10px 0 6px">${esc(task.title)}</h2><p class="theory" style="margin:0">${esc(task.sit)}</p>
      ${task.q ? `<div class="textbox"><span class="lbl">Testo di partenza</span>${esc(task.q)}</div>` : ""}
      ${task.pts.length ? `<ul class="theory sx-pts">${task.pts.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      <small class="muted">Circa ${task.words} parole${pre ? ` · tentativo ${pre.att}` : ""}</small></div>`;
  view(pre ? "Riscrivi" : task.free ? "Testo libero" : "Scrittura", `${taskHtml}
    ${pre ? `<div class="card flat"><p class="muted" style="margin:0">Ecco il tuo testo di prima. Correggi gli errori <b>da sola</b> guardando le spiegazioni (sono qui sotto), poi invialo di nuovo: vedrai se il punteggio sale.</p></div>` : ""}
    <div class="card"><textarea class="answer sx-ta" id="sxtxt" rows="14" placeholder="${task.free ? "Incolla o scrivi qui il tuo testo…" : `Scrivi qui il tuo testo (circa ${task.words} parole)…`}" spellcheck="false" autocapitalize="sentences"></textarea>
      <div class="row" style="margin-top:10px"><span class="tag" id="wc">0 parole</span><span class="tag" id="saved"></span><span class="spacer"></span><button class="btn" id="sxgo">${ic("sparkles")} Correggi</button></div></div>
    ${pre ? sxErrList(pre.entry) : ""}
    ${task.ty ? sxRedemittel(task.ty, !pre && !task.free) : ""}`, { back: true, crumb: "Scrittura", nav: "scrittura" });
  const ta = $("sxtxt");
  ta.value = sxGet(dk) || pre?.text || "";
  let lv = task.lv;
  if (task.free) bindSeg("lvl", v => { lv = v; $("lvl").querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.v === v)); });
  const wc = () => {
    const n = sxWords(ta.value), w = task.words;
    $("wc").textContent = `${n} parole` + (w ? ` / ${w}` : "");
    $("wc").style.color = !w || !n ? "" : n < w * .9 ? "#e8590c" : n > w * 1.3 ? "#e8590c" : "var(--ok)";
    sxSet(dk, ta.value); $("saved").textContent = ta.value ? "bozza salvata" : "";
  };
  ta.oninput = wc; wc();
  sxBindPhrases(ta);
  if ($("tbtn")) $("tbtn").onclick = () => {
    const b = $("tbtn"); if (b.dataset.on) return;
    b.dataset.on = 1; b.classList.add("timer");
    countdown(b, task.min * 60, () => { toast("Tempo scaduto. All'esame dovresti consegnare ora."); b.classList.add("low"); });
  };
  $("sxgo").onclick = async () => {
    const text = ta.value.trim();
    if (sxWords(text) < 15) return toast("Scrivi almeno 15 parole.");
    const t = task.free ? { ...task, lv, ty: $("fty").value, title: $("fgoal").value.trim() || "Testo libero", sit: $("fgoal").value.trim() } : task;
    $("sxgo").disabled = true; $("sxgo").innerHTML = `${ic("sparkles")} Correzione in corso…`;
    const box = document.createElement("div"); box.className = "card"; box.innerHTML = `<div class="skeleton"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:55%"></div><small class="muted">Gemini sta correggendo il testo parola per parola (può volerci un minuto)…</small>`;
    $("sxgo").closest(".card").after(box);
    try {
      const r = await sxCorrect(t, text);
      const id = "w" + Date.now().toString(36);
      const e = { id, d: new Date().toISOString(), task: { ...t, free: undefined }, text, r, att: pre ? pre.att : 1, root: pre?.root || id };
      const list = sxList(); list.unshift(e); if (list.length > 60) list.length = 60;
      S.writings++;
      arr(r.fehler).slice(0, 6).forEach(f => S.errors.unshift({ d: today(), you: f.original, fix: "**" + f.korrektur + "** – " + f.erklaerung }));
      S.errors = S.errors.slice(0, 200);
      sxSet(dk, ""); save(); addXP(Math.round(r.prozent / 4) + (pre ? 5 : 0));
      go("scrittura/storico/" + id);
    } catch (err) { box.innerHTML = aiErrBox(err); $("sxgo").disabled = false; $("sxgo").innerHTML = `${ic("sparkles")} Correggi`; }
  };
}

async function sxCorrect(t, text) {
  const exam = /telc/i.test(t.ex) ? "telc" : "Goethe-Zertifikat", up = t.lv === "B1" ? "B2" : "C1";
  const aufgabe = t.free ? (t.sit ? `Freier Text. Ziel laut Bea: ${t.sit}` : "Freier Text ohne Aufgabe: bewerte bei Erfüllung, ob der Text sein kommunikatives Ziel erreicht.")
    : `Prüfung: ${t.ex}. Textsorte: ${sxTypeOf(t.ty).t}. Titel: ${t.title}\nSituation: ${t.sit}\n${t.q ? "Ausgangstext: " + t.q + "\n" : ""}Inhaltspunkte:\n${t.pts.map(p => "- " + p).join("\n")}\nGewünschte Länge: ca. ${t.words} Wörter (Bea hat ${sxWords(text)} geschrieben).`;
  const r = await gemini(`Niveau: ${t.lv}. ${aufgabe}
${t.ty ? "Register: " + (t.ty === "informell" ? "informell (du)" : "formell (Sie)") + "." : ""}

Text von Bea:
"""
${text}
"""

Arbeitsschritte:
1. Finde ALLE Fehler: Grammatik, Wortschatz (falsches oder unpassendes Wort), Rechtschreibung (auch Groß-/Kleinschreibung), Zeichensetzung (v. a. Kommas vor Nebensätzen), Stil (Register du/Sie, unpassende Anrede/Gruß, Wiederholungen). Markiere nichts, was korrekt ist.
   Für jeden Fehler: "original" = die fehlerhafte Stelle, Zeichen für Zeichen exakt aus Beas Text kopiert (1–6 Wörter, so kurz wie möglich, damit man sie im Text wiederfindet); "korrektur" = die korrigierte Stelle; "typ" = Grammatik | Wortschatz | Rechtschreibung | Zeichensetzung | Stil; "erklaerung" = Erklärung auf Italienisch (1–2 Sätze, mit der Regel und warum); "regel" = Name der Regel auf Italienisch in 2–4 Wörtern (z. B. "verbo in fondo", "dativo dopo mit", "maiuscola dei nomi", "virgola prima di weil"). Reihenfolge wie im Text.
2. "korrigiert" = Beas Text mit NUR den nötigen Korrekturen (gleiche Sätze, gleiche Absätze, Inhalt und Stil nicht verändern).
3. "verbessert" = eine Musterversion auf Niveau ${up}, die Beas Ideen übernimmt, mit reicheren Konnektoren, präziserem Wortschatz und abwechslungsreichen Satzstrukturen (gleiche Länge ±20 %).
4. Bewertung streng nach den offiziellen Kriterien ${exam} ${t.lv} Schreiben, je 0–5 Punkte: "Erfüllung" (alle Inhaltspunkte, Länge, Register, Textsorte), "Kohärenz" (Aufbau, Konnektoren, Absätze), "Wortschatz" (Umfang und Korrektheit), "Strukturen" (Vielfalt und Korrektheit). Ein fehlender Inhaltspunkt oder ein viel zu kurzer Text senkt "Erfüllung" deutlich. "prozent" = Gesamtergebnis 0–100 (60 = bestanden). "niveau" = geschätztes Niveau des Textes (A2, B1, B1+, B2, B2+ oder C1).
5. Feedback auf Italienisch: "kommentar" je Kriterium (1–2 Sätze, konkret, mit Beispiel aus dem Text), "lob" (was gut ist, 1–2 Sätze), "tipps" (3 konkrete Tipps für den nächsten Text), "fehlende_punkte" (Inhaltspunkte, die fehlen oder zu knapp sind; leer, wenn alles da ist), "redemittel" (4 deutsche Ausdrücke, die in diesem Text gut gepasst hätten, jeweils mit italienischer Übersetzung in Klammern).

JSON: {"fehler": [{"original": "", "korrektur": "", "typ": "", "erklaerung": "", "regel": ""}], "korrigiert": "", "verbessert": "", "punkte": {"Erfüllung": 0, "Kohärenz": 0, "Wortschatz": 0, "Strukturen": 0}, "kommentar": {"Erfüllung": "", "Kohärenz": "", "Wortschatz": "", "Strukturen": ""}, "prozent": 0, "niveau": "", "lob": "", "tipps": [""], "fehlende_punkte": [""], "redemittel": [""]}`, SX_SYS, true, true, 0.3);
  r.fehler = arr(r.fehler).filter(f => f && f.original && f.korrektur && f.original.trim() !== f.korrektur.trim()).map(f => ({ ...f, typ: SX_CAT[f.typ] ? f.typ : "Grammatik" }));
  r.punkte = Object.fromEntries(Object.keys(SX_CRIT).map(k => [k, Math.max(0, Math.min(5, Math.round(+(r.punkte || {})[k] || 0)))]));
  r.prozent = Math.max(0, Math.min(100, Math.round(+r.prozent || Object.values(r.punkte).reduce((a, b) => a + b, 0) * 5)));
  r.fehlende_punkte = arr(r.fehlende_punkte).filter(x => String(x).trim());
  return r;
}

// ---------- EVIDENZIA GLI ERRORI NEL TESTO
function sxMark(text, errs) {
  const used = [], ranges = [];
  let cur = 0;
  errs.forEach((f, i) => {
    const o = f.original; if (!o) return;
    const free = (s) => s >= 0 && !used.some(([a, b]) => s < b && s + o.length > a);
    let s = text.indexOf(o, cur);
    if (!free(s)) { s = -1; let k = -1; while ((k = text.indexOf(o, k + 1)) >= 0) if (free(k)) { s = k; break; } }
    if (s < 0) { const lo = text.toLowerCase(), ol = o.toLowerCase(); let k = -1; while ((k = lo.indexOf(ol, k + 1)) >= 0) if (free(k)) { s = k; break; } }
    if (s < 0) return;
    used.push([s, s + o.length]); ranges.push({ s, e: s + o.length, i }); cur = s + o.length;
  });
  ranges.sort((a, b) => a.s - b.s);
  let out = "", p = 0;
  ranges.forEach(r => { const f = errs[r.i]; out += esc(text.slice(p, r.s)) + `<mark class="sxm" data-i="${r.i}" style="--c:${SX_CAT[f.typ][1]}">${esc(text.slice(r.s, r.e))}<sup>${r.i + 1}</sup></mark>`; p = r.e; });
  return { html: out + esc(text.slice(p)), found: new Set(ranges.map(r => r.i)) };
}
// Confronto parola per parola tra il testo originale e quello corretto
function sxDiff(a, b) {
  const A = a.split(/(\s+)/), B = b.split(/(\s+)/), n = A.length, m = B.length;
  if (n * m > 1.2e6) return esc(b);
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0, out = "", del = "", ins = "";
  const flush = () => { if (del.trim()) out += `<del>${esc(del.trim())}</del> `; if (ins.trim()) out += `<ins>${esc(ins.trim())}</ins>` + (/\s$/.test(ins) ? " " : ""); else if (ins) out += ins; del = ins = ""; };
  while (i < n || j < m) {
    if (i < n && j < m && A[i] === B[j]) { flush(); out += esc(B[j]); i++; j++; }
    else if (j < m && (i >= n || dp[i][j + 1] >= dp[i + 1][j])) { ins += B[j]; j++; }
    else { if (!/^\s+$/.test(A[i])) del += A[i] + " "; i++; }
  }
  flush();
  return out;
}

function sxErrList(e) {
  const errs = arr(e.r.fehler);
  if (!errs.length) return `<div class="card"><h3>Errori</h3><p class="muted" style="margin:0">Nessun errore trovato. Ausgezeichnet!</p></div>`;
  const counts = Object.keys(SX_CAT).map(k => [k, errs.filter(f => f.typ === k).length]).filter(x => x[1]);
  return `<div class="card"><div class="row"><h3 style="margin:0">Errori (${errs.length})</h3><span class="spacer"></span>${counts.map(([k, n]) => `<span class="sx-leg" style="--c:${SX_CAT[k][1]}">${SX_CAT[k][0]} ${n}</span>`).join("")}</div>
    <div class="sx-errs">${errs.map((f, i) => `<div class="sx-err" id="sxe${i}" style="--c:${SX_CAT[f.typ][1]}"><span class="n">${i + 1}</span><div><s>${esc(f.original)}</s> → <b>${esc(f.korrektur)}</b>${f.regel ? ` <span class="sx-rule">${esc(f.regel)}</span>` : ""}<br><small>${esc(f.erklaerung)}</small></div></div>`).join("")}</div></div>`;
}

// ---------- RISULTATO (dallo storico)
function sxShow(id) {
  const list = sxList(), e = list.find(x => x.id === id);
  if (!e) return sxHistory();
  const r = e.r, t = e.task, T = sxTypeOf(t.ty);
  const prev = list.filter(x => x.root === e.root && x.att < e.att).sort((a, b) => b.att - a.att)[0];
  const m = sxMark(e.text, arr(r.fehler));
  const delta = prev ? r.prozent - prev.r.prozent : null;
  const task = SX_TASKS.find(x => x.id === t.id) || (t.id === "ia" || t.id === "libero" ? null : t);
  view("Correzione", `
    <div class="card result sx-res"><div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap"><span class="badge">${esc(t.ex)}</span>${t.ty ? `<span class="tag" style="color:${T.c}">${esc(T.t)}</span>` : ""}<span class="tag">${sxDate(e.d)}${e.att > 1 ? ` · tentativo ${e.att}` : ""}</span></div>
      <h2 style="margin:10px 0 4px">${esc(t.title || "Testo libero")}</h2>
      <div class="big-num" style="color:${sxScoreColor(r.prozent)}">${r.prozent}%</div>
      <p class="muted" style="margin:0">${r.prozent >= 60 ? "Sufficiente per l'esame" : "Sotto la soglia del 60%"}${r.niveau ? ` · livello stimato del testo: <b>${esc(r.niveau)}</b>` : ""} · ${sxWords(e.text)} parole${t.words ? ` su ${t.words}` : ""}</p>
      ${delta !== null ? `<p style="margin:8px 0 0;font-weight:700;color:${delta >= 0 ? "var(--ok)" : "var(--bad)"}">${delta >= 0 ? "+" : ""}${delta} punti rispetto al tentativo ${prev.att}</p>` : ""}</div>
    <div class="cols">
      <div class="card c6"><h3>Criteri ${/telc/i.test(t.ex) ? "telc" : "Goethe"}</h3>${Object.entries(r.punkte).map(([k, v]) => `<div style="margin:12px 0"><div class="row"><span>${esc(SX_CRIT[k] || k)}</span><span class="spacer"></span><b>${v}/5</b></div><div class="progress thin" style="margin-top:6px"><i style="width:${v / 5 * 100}%"></i></div>${(r.kommentar || {})[k] ? `<small class="muted" style="display:block;margin-top:6px">${esc(r.kommentar[k])}</small>` : ""}</div>`).join("")}</div>
      <div class="card c6"><h3>Cosa va bene</h3><p class="theory">${esc(r.lob)}</p>
        ${r.fehlende_punkte.length ? `<h3 style="margin-top:14px;color:var(--bad)">Punti mancanti o troppo brevi</h3><ul class="theory">${r.fehlende_punkte.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        <h3 style="margin-top:14px">Consigli per il prossimo testo</h3><ul class="theory">${arr(r.tipps).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
    <div class="card"><div class="row"><h3 style="margin:0">Il tuo testo</h3><span class="spacer"></span><small class="muted">Tocca una parte evidenziata</small></div>
      <div class="sx-text" id="sxt">${m.html}</div><div id="sxd" class="sx-detail" hidden></div>
      ${arr(r.fehler).length > m.found.size ? `<small class="muted">${arr(r.fehler).length - m.found.size === 1 ? "1 errore non si può evidenziare" : arr(r.fehler).length - m.found.size + " errori non si possono evidenziare"} nel testo: li trovi nell'elenco.</small>` : ""}</div>
    ${sxErrList(e)}
    <div class="card"><div class="row"><h3 style="margin:0">Versione corretta</h3><span class="spacer"></span><span class="sx-leg" style="--c:var(--ok)">aggiunto</span><span class="sx-leg" style="--c:var(--bad)">tolto</span>${sayBtn(r.korrigiert)}</div>
      <div class="sx-text sx-diff">${sxDiff(e.text, String(r.korrigiert || ""))}</div></div>
    <div class="card"><div class="row"><h3 style="margin:0">Versione modello (${t.lv === "B1" ? "B2" : "C1"})</h3><span class="spacer"></span>${sayBtn(r.verbessert)}</div>
      <p class="muted" style="margin:6px 0 0">Le tue idee scritte da un madrelingua: rubale espressioni e connettori.</p><div class="sx-text">${esc(r.verbessert)}</div></div>
    ${arr(r.redemittel).length ? `<div class="card"><h3>Espressioni che avresti potuto usare</h3>${arr(r.redemittel).map(x => `<div class="vocab"><b>${esc(x)}</b>${sayBtn(String(x).replace(/\s*\(.*\)\s*$/, ""))}</div>`).join("")}</div>` : ""}
    ${t.sit || arr(t.pts).length ? `<details class="card acc"><summary><h3 style="margin:0">La consegna</h3>${ic("right")}</summary><p class="theory" style="margin-top:10px">${esc(t.sit)}</p>${t.q ? `<div class="textbox">${esc(t.q)}</div>` : ""}<ul class="theory">${arr(t.pts).map(p => `<li>${esc(p)}</li>`).join("")}</ul></details>` : ""}
    <div class="row" style="flex-wrap:wrap"><button class="btn lg" id="again">${ic("refresh")} Riscrivi il testo</button>${task ? `<button class="btn ghost" data-go="scrittura/t/${task.id}">Nuovo testo, stessa traccia</button>` : ""}<button class="btn ghost" data-go="scrittura">Altre tracce</button><span class="spacer"></span><button class="btn ghost" id="copy">Copia la versione corretta</button><button class="btn ghost" id="del" style="color:var(--bad)">Elimina</button></div>`, { back: true, crumb: "Scrittura", nav: "scrittura" });
  $app.querySelectorAll(".sxm").forEach(mk => mk.onclick = () => {
    const f = r.fehler[+mk.dataset.i], d = $("sxd");
    $app.querySelectorAll(".sxm.on").forEach(x => x.classList.remove("on")); mk.classList.add("on");
    d.hidden = false; d.style.setProperty("--c", SX_CAT[f.typ][1]);
    d.innerHTML = `<span class="tag" style="color:${SX_CAT[f.typ][1]}">${+mk.dataset.i + 1} · ${SX_CAT[f.typ][0].toUpperCase()}${f.regel ? " · " + esc(f.regel) : ""}</span><div style="margin-top:4px"><s>${esc(f.original)}</s> → <b>${esc(f.korrektur)}</b></div><small>${esc(f.erklaerung)}</small>`;
  });
  $("again").onclick = () => sxEditor({ ...t, id: t.id || "libero", free: false, words: t.words || 0, min: 0, pts: arr(t.pts) }, { text: e.text, root: e.root, att: Math.max(...list.filter(x => x.root === e.root).map(x => x.att)) + 1, entry: e });
  $("copy").onclick = () => navigator.clipboard?.writeText(r.korrigiert || "").then(() => toast("Copiato."), () => toast("Copia non riuscita."));
  $("del").onclick = () => { const b = $("del"); if (!b.dataset.ok) { b.dataset.ok = 1; b.textContent = "Tocca di nuovo per eliminare"; return; } S.schreib = list.filter(x => x.id !== id); save(); toast("Testo eliminato."); go("scrittura/storico"); };
}

// ---------- STORICO E PROGRESSI
function sxHistory() {
  const list = sxList();
  if (!list.length) return view("Storico", `<div class="card empty">${ic("info")}<p>Non hai ancora testi corretti. Scegli una traccia e scrivi il primo.</p><button class="btn" data-go="scrittura">Vai alle tracce</button></div>`, { back: true, crumb: "Scrittura", nav: "scrittura" });
  const recent = list.slice(0, 20), errs = recent.flatMap(e => arr(e.r.fehler));
  const cats = Object.keys(SX_CAT).map(k => [k, errs.filter(f => f.typ === k).length]).filter(x => x[1]).sort((a, b) => b[1] - a[1]);
  const rules = {}; errs.forEach(f => { const k = String(f.regel || "").trim().toLowerCase(); if (k) rules[k] = (rules[k] || 0) + 1; });
  const topRules = Object.entries(rules).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const chart = list.slice(0, 14).reverse();
  const maxC = Math.max(1, ...cats.map(c => c[1]));
  view("Storico", `
    <div class="cols">
      <div class="card c7"><div class="row"><h3 style="margin:0">Andamento dei voti</h3><span class="spacer"></span><span class="tag">ultimi ${chart.length}</span></div>
        <div class="sx-chart">${chart.map(e => `<a href="#scrittura/storico/${e.id}" title="${esc((e.task.title || "Testo libero") + " · " + e.r.prozent + "%")}"><i style="height:${Math.max(4, e.r.prozent)}%;background:${sxScoreColor(e.r.prozent)}"></i><small>${e.r.prozent}</small></a>`).join("")}</div>
        <small class="muted">La linea è la soglia del 60%.</small></div>
      <div class="card c5"><h3>I tuoi errori più frequenti</h3><small class="muted">Negli ultimi ${recent.length} testi</small>
        ${cats.map(([k, n]) => `<div style="margin:10px 0"><div class="row"><span>${SX_CAT[k][0]}</span><span class="spacer"></span><b>${n}</b></div><div class="progress thin" style="margin-top:6px"><i style="width:${n / maxC * 100}%;background:${SX_CAT[k][1]}"></i></div></div>`).join("") || `<p class="muted">Nessun errore. Perfetto.</p>`}
        ${topRules.length ? `<h3 style="margin-top:16px">Regole da ripassare</h3><div class="sx-rules">${topRules.map(([k, n]) => `<span class="sx-rule">${esc(k)} · ${n}</span>`).join("")}</div>
          <button class="btn ghost sm" data-go="lab/fehler" style="margin-top:12px">${ic("refresh")} Esercizi sui miei errori</button>` : ""}</div></div>
    <div class="card"><h3>Tutti i testi (${list.length})</h3>
      ${list.map(e => `<a class="task" href="#scrittura/storico/${e.id}" style="text-decoration:none;color:inherit"><span class="sx-score" style="--c:${sxScoreColor(e.r.prozent)}">${e.r.prozent}</span><span class="t"><b>${esc(e.task.title || "Testo libero")}${e.att > 1 ? ` <span class="tag">tentativo ${e.att}</span>` : ""}</b><small>${sxDate(e.d)} · ${esc(e.task.ex)} · ${sxWords(e.text)} parole · ${arr(e.r.fehler).length} errori</small></span>${ic("right")}</a>`).join("")}</div>`, { back: true, crumb: "Scrittura", nav: "scrittura" });
}
