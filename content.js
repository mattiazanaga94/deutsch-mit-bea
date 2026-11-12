// ===== Contenuti v4: grammatica aggiuntiva, Landeskunde, dettati, struttura esami =====

// Categoria delle lezioni esistenti
const LESSON_CAT = { b4: "Kommunikation", b5: "Kommunikation", b6: "Kommunikation", b16: "Wortschatz", a6: "Alltag" };

LESSONS.push(
  { id: "g1", level: "B1", cat: "Grammatik", title: "Modalverben",
    theory: `<b>können</b> (potere/saper fare) · <b>müssen</b> (dovere, necessità) · <b>dürfen</b> (avere il permesso) · <b>sollen</b> (dovere, consiglio/ordine altrui) · <b>wollen</b> (volere) · <b>mögen / möchten</b> (piacere / vorrei).<br>
      Struttura: modale coniugato in 2ª posizione, infinito alla fine: <i>Ich <b>muss</b> heute länger <b>arbeiten</b>.</i><br>
      Attenzione: <b>nicht müssen</b> = non essere obbligati; <b>nicht dürfen</b> = essere vietato.`,
    vocab: [["Ich kann gut kochen", "So cucinare bene"], ["Hier darf man nicht rauchen", "Qui è vietato fumare"], ["Sie müssen nicht kommen", "Non è obbligato a venire"],
      ["Der Arzt sagt, ich soll mehr schlafen", "Il medico dice che dovrei dormire di più"], ["Ich möchte einen Termin vereinbaren", "Vorrei fissare un appuntamento"], ["Wir wollen im Sommer nach Wien fahren", "In estate vogliamo andare a Vienna"]] },
  { id: "g2", level: "B1", cat: "Grammatik", title: "Imperativ – Aufforderungen",
    theory: `<b>du</b>: radice senza -st → <i>Komm! Lies! Fahr!</i> · <b>ihr</b>: <i>Kommt! Lest!</i> · <b>Sie</b>: <i>Kommen Sie! Lesen Sie!</i><br>
      Con verbi separabili il prefisso va in fondo: <i>Ruf mich an!</i> · Più cortese: <i>Würden Sie bitte …?</i>`,
    vocab: [["Kommen Sie bitte herein!", "Entri, prego!"], ["Ruf mich morgen an!", "Chiamami domani!"], ["Seien Sie bitte pünktlich!", "Sia puntuale, per favore!"],
      ["Lies den Text noch einmal!", "Rileggi il testo!"], ["Nehmen Sie bitte Platz!", "Si accomodi!"], ["Hab keine Angst!", "Non avere paura!"]] },
  { id: "g3", level: "B1", cat: "Grammatik", title: "Futur I & Plusquamperfekt",
    theory: `<b>Futur I</b>: werden + infinito → <i>Ich <b>werde</b> nächstes Jahr in Berlin <b>studieren</b>.</i> Si usa per previsioni e promesse; per il futuro vicino basta il presente.<br>
      <b>Plusquamperfekt</b>: hatte/war + participio → azione anteriore a un'altra nel passato: <i>Nachdem ich gegessen <b>hatte</b>, ging ich spazieren.</i>`,
    vocab: [["Es wird morgen regnen", "Domani pioverà"], ["Ich werde dich anrufen", "Ti chiamerò"], ["Als ich ankam, war der Zug schon abgefahren", "Quando arrivai, il treno era già partito"],
      ["Nachdem sie gelernt hatte, ging sie aus", "Dopo aver studiato, uscì"], ["Bis dahin werde ich fertig sein", "Per allora avrò finito"]] },
  { id: "g4", level: "B1", cat: "Grammatik", title: "Genitiv & Possessivartikel",
    theory: `Possessivi: <b>mein, dein, sein, ihr, unser, euer, ihr, Ihr</b> — si declinano come <i>ein</i>.<br>
      <b>Genitiv</b>: des/der/des + -s/-es al maschile e neutro: <i>das Auto <b>des</b> Vater<b>s</b></i>, <i>die Tasche <b>der</b> Frau</i>.<br>
      Nel parlato spesso si usa <b>von + Dat.</b>: <i>das Auto von meinem Vater</i>.`,
    vocab: [["das Haus meiner Eltern", "la casa dei miei genitori"], ["der Name des Lehrers", "il nome dell'insegnante"], ["Ist das Ihr Koffer?", "È la sua valigia?"],
      ["die Hauptstadt Deutschlands", "la capitale della Germania"], ["unsere neue Wohnung", "il nostro nuovo appartamento"]] },
  { id: "g5", level: "B2", cat: "Grammatik", title: "n-Deklination",
    theory: `Alcuni nomi maschili prendono <b>-(e)n</b> in tutti i casi tranne il nominativo singolare.<br>
      Tipici: nomi in <b>-e</b> che indicano persone/animali (<i>der Kollege, der Junge, der Löwe</i>), in <b>-ent, -ant, -ist, -oge</b> (<i>der Student, der Praktikant, der Journalist, der Biologe</i>), e <i>der Herr, der Mensch, der Nachbar</i>.<br>
      <i>Ich frage den Kollege<b>n</b>. · Ich helfe dem Studente<b>n</b>. · Das Büro des Präsidente<b>n</b>.</i>`,
    vocab: [["Ich habe den Praktikanten eingearbeitet", "Ho formato il tirocinante"], ["Sehr geehrter Herr Müller", "Egregio signor Müller"], ["Wir danken dem Kunden", "Ringraziamo il cliente"],
      ["Ich kenne den Journalisten persönlich", "Conosco il giornalista di persona"], ["die Meinung des Experten", "l'opinione dell'esperto"]] },
  { id: "g6", level: "B2", cat: "Grammatik", title: "Wortstellung: TeKaMoLo & Mittelfeld",
    theory: `Ordine dei complementi nel mezzo della frase: <b>Te</b>mporal – <b>Ka</b>usal – <b>Mo</b>dal – <b>Lo</b>kal.<br>
      <i>Ich fahre <b>morgen</b> <b>wegen der Prüfung</b> <b>mit dem Zug</b> <b>nach Köln</b>.</i><br>
      Pronomi prima dei nomi: <i>Ich gebe <b>es</b> dem Kollegen.</i> · Dativo prima di accusativo (se nomi): <i>Ich gebe <b>dem Kollegen</b> das Buch.</i><br>
      <b>nicht</b> va prima dell'elemento negato o alla fine.`,
    vocab: [["Ich fahre morgen wegen der Arbeit mit dem Auto nach Hamburg", "Domani vado ad Amburgo in auto per lavoro"], ["Ich habe es ihm gestern gegeben", "Gliel'ho dato ieri"],
      ["Sie kommt heute nicht", "Oggi non viene"], ["Ich habe ihr den Brief geschickt", "Le ho mandato la lettera"]] },
  { id: "g7", level: "B2", cat: "Grammatik", title: "Konjunktiv II Vergangenheit mit Modalverb",
    theory: `Doppio infinito: <b>hätte + infinito + modale all'infinito</b>.<br>
      <i>Ich <b>hätte</b> früher <b>lernen sollen</b>.</i> = Avrei dovuto studiare prima.<br>
      <i>Du <b>hättest</b> mich <b>anrufen können</b>.</i> = Avresti potuto chiamarmi.<br>
      Nella secondaria <b>hätte</b> va prima del doppio infinito: <i>…, dass ich früher <b>hätte</b> lernen sollen.</i>`,
    vocab: [["Ich hätte früher anfangen sollen", "Avrei dovuto iniziare prima"], ["Sie hätten uns informieren müssen", "Avrebbero dovuto informarci"], ["Das hätte ich nicht sagen dürfen", "Non avrei dovuto dirlo"],
      ["Wir hätten den Zug nehmen können", "Avremmo potuto prendere il treno"], ["Schade, dass du nicht hättest kommen können", "Peccato che tu non saresti potuto venire"]] },
  { id: "g8", level: "B2", cat: "Grammatik", title: "Futur II & Vermutungen",
    theory: `<b>Futur II</b>: werden + participio + haben/sein → azione conclusa nel futuro o <b>supposizione sul passato</b>.<br>
      <i>Bis Juni <b>werde</b> ich die Prüfung <b>bestanden haben</b>.</i><br>
      <i>Er <b>wird</b> den Zug <b>verpasst haben</b>.</i> = Avrà perso il treno (probabilmente).<br>
      Futur I per supposizioni sul presente: <i>Sie <b>wird</b> wohl krank <b>sein</b>.</i>`,
    vocab: [["Bis dahin werde ich alles erledigt haben", "Per allora avrò sbrigato tutto"], ["Sie wird wohl im Stau stehen", "Sarà probabilmente in coda"],
      ["Er wird es vergessen haben", "Se ne sarà dimenticato"], ["In zehn Jahren werden wir viel erreicht haben", "Tra dieci anni avremo raggiunto molto"]] }
);

// ===== Landeskunde: storia, geografia, cultura =====
LESSONS.push(
  { id: "k1", level: "B1", cat: "Landeskunde", title: "Geschichte: Teilung und Wiedervereinigung",
    theory: `Dal 1949 al 1990 esistevano due Stati tedeschi: la <b>BRD</b> (Germania Ovest) e la <b>DDR</b> (Germania Est). Il <b>Muro di Berlino</b> cadde il 9 novembre 1989; la riunificazione avvenne il <b>3 ottobre 1990</b>, oggi festa nazionale.`,
    text: `Nach dem Zweiten Weltkrieg wurde Deutschland in vier Besatzungszonen aufgeteilt. 1949 entstanden zwei deutsche Staaten: im Westen die Bundesrepublik Deutschland und im Osten die Deutsche Demokratische Republik. Im Jahr 1961 baute die DDR-Regierung die Berliner Mauer, um die Flucht ihrer Bürger in den Westen zu verhindern. Viele Familien wurden dadurch getrennt.
In den Achtzigerjahren wuchs der Protest. Im Herbst 1989 gingen in Leipzig jeden Montag Tausende Menschen friedlich auf die Straße. Am 9. November 1989 fiel schließlich die Mauer. Weniger als ein Jahr später, am 3. Oktober 1990, wurde Deutschland wiedervereinigt. Dieser Tag ist heute der Nationalfeiertag, der „Tag der Deutschen Einheit“.`,
    vocab: [["die Wiedervereinigung", "la riunificazione"], ["die Mauer", "il muro"], ["die Flucht", "la fuga"], ["verhindern", "impedire"], ["friedlich", "pacifico"], ["der Nationalfeiertag", "la festa nazionale"]],
    questions: [
      { q: "Wann wurde die Berliner Mauer gebaut?", options: ["1949", "1961", "1989"], a: 1, expl: "Il testo dice: Im Jahr 1961 baute die DDR-Regierung die Berliner Mauer." },
      { q: "Was passierte in Leipzig im Herbst 1989?", options: ["Es gab friedliche Demonstrationen.", "Die Mauer wurde gebaut.", "Die Wiedervereinigung wurde gefeiert."], a: 0, expl: "'gingen … friedlich auf die Straße' = manifestazioni pacifiche (le Montagsdemonstrationen)." },
      { q: "Warum ist der 3. Oktober wichtig?", options: ["Die Mauer fiel.", "Die DDR wurde gegründet.", "Es ist der Tag der Deutschen Einheit."], a: 2, expl: "Il 3 ottobre 1990 è la data della riunificazione, oggi festa nazionale." }] },
  { id: "k2", level: "B1", cat: "Landeskunde", title: "Geografie: Die 16 Bundesländer",
    theory: `La Germania è una repubblica federale con <b>16 Länder</b>. Tre sono città-stato: <b>Berlin, Hamburg, Bremen</b>. Il più grande per superficie è la <b>Baviera</b>, il più popoloso il <b>Nordrhein-Westfalen</b>.`,
    text: `Deutschland liegt in der Mitte Europas und grenzt an neun Nachbarländer. Im Norden liegen die Nordsee und die Ostsee, im Süden die Alpen mit der Zugspitze, dem höchsten Berg Deutschlands. Der längste Fluss, der durch Deutschland fließt, ist der Rhein.
Das Land besteht aus sechzehn Bundesländern. Jedes Bundesland hat eine eigene Regierung und ist zum Beispiel für Schulen und Polizei zuständig. Bayern ist flächenmäßig das größte Bundesland, während in Nordrhein-Westfalen die meisten Menschen leben. Berlin, Hamburg und Bremen sind Stadtstaaten: Sie sind gleichzeitig Städte und Bundesländer.`,
    vocab: [["das Bundesland", "lo Stato federato"], ["grenzen an + Akk.", "confinare con"], ["der Fluss", "il fiume"], ["zuständig für", "competente per"], ["flächenmäßig", "per superficie"], ["der Stadtstaat", "la città-stato"]],
    questions: [
      { q: "Wie heißt der höchste Berg Deutschlands?", options: ["Der Brocken", "Die Zugspitze", "Der Feldberg"], a: 1, expl: "'den Alpen mit der Zugspitze, dem höchsten Berg Deutschlands'." },
      { q: "Wofür sind die Bundesländer zum Beispiel zuständig?", options: ["Für Schulen und Polizei", "Für die Armee", "Für die Außenpolitik"], a: 0, expl: "'zum Beispiel für Schulen und Polizei zuständig'." },
      { q: "Was ist ein Stadtstaat?", options: ["Eine Hauptstadt", "Eine Stadt, die auch ein Bundesland ist", "Eine Stadt an der Grenze"], a: 1, expl: "'gleichzeitig Städte und Bundesländer'." }] },
  { id: "k3", level: "B1", cat: "Landeskunde", title: "Österreich und die Schweiz",
    theory: `Il tedesco è lingua ufficiale anche in <b>Austria</b>, <b>Svizzera</b> (con francese, italiano e romancio), <b>Liechtenstein</b>, Lussemburgo e Belgio. Ogni paese ha parole proprie: in Austria <i>Jänner</i> (gennaio), <i>Paradeiser</i> (pomodoro); in Svizzera <i>Velo</i> (bici), <i>Grüezi</i> (buongiorno).`,
    text: `Deutsch wird nicht nur in Deutschland gesprochen. In Österreich ist Deutsch die Amtssprache, aber viele Wörter sind anders: Man sagt „Servus“ zur Begrüßung, und eine Tomate heißt „Paradeiser“. Die Hauptstadt Wien ist berühmt für ihre Kaffeehäuser und die klassische Musik.
Die Schweiz hat sogar vier Landessprachen: Deutsch, Französisch, Italienisch und Rätoromanisch. Im Alltag sprechen die meisten Deutschschweizer Dialekt, das sogenannte Schweizerdeutsch, während in der Schule und in den Zeitungen Hochdeutsch verwendet wird. Die Schweiz ist kein Mitglied der Europäischen Union.`,
    vocab: [["die Amtssprache", "la lingua ufficiale"], ["die Begrüßung", "il saluto"], ["berühmt für", "famoso per"], ["die Landessprache", "la lingua nazionale"], ["der Alltag", "la quotidianità"], ["das Mitglied", "il membro"]],
    questions: [
      { q: "Wie sagt man in Österreich zur Tomate?", options: ["Paradeiser", "Servus", "Velo"], a: 0, expl: "In Österreich heißt eine Tomate „Paradeiser“." },
      { q: "Wie viele Landessprachen hat die Schweiz?", options: ["Zwei", "Drei", "Vier"], a: 2, expl: "Deutsch, Französisch, Italienisch und Rätoromanisch." },
      { q: "Was stimmt über die Schweiz?", options: ["Sie ist Mitglied der EU.", "Im Alltag spricht man oft Dialekt.", "In der Schule spricht man nur Dialekt."], a: 1, expl: "'Im Alltag sprechen die meisten … Dialekt'; a scuola si usa Hochdeutsch." }] },
  { id: "k4", level: "B2", cat: "Landeskunde", title: "Politik: Das politische System",
    theory: `La Germania è una <b>democrazia parlamentare federale</b>. Il <b>Bundestag</b> (parlamento) elegge il <b>Bundeskanzler</b> (cancelliere), capo del governo. Il <b>Bundespräsident</b> è il capo dello Stato con funzioni soprattutto rappresentative. Il <b>Bundesrat</b> rappresenta i Länder.`,
    text: `Die Bundesrepublik Deutschland ist eine parlamentarische Demokratie. Alle vier Jahre wählen die Bürgerinnen und Bürger den Bundestag. Dabei hat jeder Wähler zwei Stimmen: Mit der Erststimme wählt man eine Person aus dem eigenen Wahlkreis, mit der Zweitstimme eine Partei. Die Zweitstimme ist entscheidend für die Verteilung der Sitze im Parlament.
Der Bundestag wählt den Bundeskanzler oder die Bundeskanzlerin, der die Richtlinien der Politik bestimmt. Da selten eine Partei allein die Mehrheit erreicht, werden meist Koalitionen gebildet. Über die Einhaltung des Grundgesetzes, der deutschen Verfassung, wacht das Bundesverfassungsgericht in Karlsruhe.`,
    vocab: [["die Erststimme / Zweitstimme", "il primo / secondo voto"], ["der Wahlkreis", "il collegio elettorale"], ["entscheidend", "decisivo"], ["die Mehrheit", "la maggioranza"], ["das Grundgesetz", "la Costituzione (Legge fondamentale)"], ["wachen über", "vigilare su"]],
    questions: [
      { q: "Wofür ist die Zweitstimme besonders wichtig?", options: ["Für die Wahl des Bundespräsidenten", "Für die Verteilung der Sitze im Parlament", "Für die Wahl des Bürgermeisters"], a: 1, expl: "'Die Zweitstimme ist entscheidend für die Verteilung der Sitze'." },
      { q: "Warum gibt es meistens Koalitionen?", options: ["Weil das Gesetz es verlangt", "Weil eine Partei selten allein die Mehrheit hat", "Weil der Präsident es entscheidet"], a: 1, expl: "'Da selten eine Partei allein die Mehrheit erreicht'." },
      { q: "Was macht das Bundesverfassungsgericht?", options: ["Es wählt den Kanzler.", "Es kontrolliert die Einhaltung der Verfassung.", "Es schreibt neue Gesetze."], a: 1, expl: "'Über die Einhaltung des Grundgesetzes … wacht das Bundesverfassungsgericht'." }] },
  { id: "k5", level: "B2", cat: "Landeskunde", title: "Literatur: Goethe, Schiller und die Klassik",
    theory: `<b>Johann Wolfgang von Goethe</b> (1749–1832) e <b>Friedrich Schiller</b> (1759–1805) sono i grandi autori della <b>Weimarer Klassik</b>. Opere chiave: <i>Faust</i>, <i>Die Leiden des jungen Werthers</i> (Goethe); <i>Wilhelm Tell</i>, <i>Ode an die Freude</i> (Schiller), il testo dell'inno europeo.`,
    text: `Weimar, eine kleine Stadt in Thüringen, wurde um 1800 zum kulturellen Zentrum Deutschlands. Hier lebten und arbeiteten Johann Wolfgang von Goethe und Friedrich Schiller, die eine enge Freundschaft verband. Gemeinsam prägten sie die Epoche der Weimarer Klassik, in der Harmonie, Humanität und Bildung im Mittelpunkt standen.
Goethes Roman „Die Leiden des jungen Werthers“ machte ihn bereits in jungen Jahren in ganz Europa berühmt. Sein Hauptwerk „Faust“ beschäftigt sich mit der Frage, was die Welt im Innersten zusammenhält. Schillers Gedicht „An die Freude“ wurde von Beethoven vertont und ist heute die Hymne der Europäischen Union.`,
    vocab: [["prägen", "segnare, caratterizzare"], ["die Epoche", "l'epoca"], ["im Mittelpunkt stehen", "essere al centro"], ["das Hauptwerk", "l'opera principale"], ["vertonen", "mettere in musica"], ["das Gedicht", "la poesia"]],
    questions: [
      { q: "Was verband Goethe und Schiller?", options: ["Eine enge Freundschaft", "Eine Rivalität", "Eine Verwandtschaft"], a: 0, expl: "'die eine enge Freundschaft verband'." },
      { q: "Womit beschäftigt sich „Faust“?", options: ["Mit der Liebe zu Weimar", "Mit der Frage, was die Welt zusammenhält", "Mit der Geschichte Europas"], a: 1, expl: "'was die Welt im Innersten zusammenhält' è una citazione celebre del Faust." },
      { q: "Was ist heute die Hymne der EU?", options: ["Ein Gedicht von Goethe", "Schillers „An die Freude“ mit Musik von Beethoven", "Ein Lied aus Weimar"], a: 1, expl: "Beethoven ha messo in musica l'Ode an die Freude (9ª sinfonia)." }] },
  { id: "k6", level: "B1", cat: "Landeskunde", title: "Feste und Traditionen",
    theory: `Feste tipiche: <b>Karneval/Fasching</b> (febbraio), <b>Ostern</b>, <b>Oktoberfest</b> (Monaco, settembre-ottobre), <b>Sankt Martin</b> (11 novembre, lanterne), <b>Advent</b> e <b>Weihnachtsmärkte</b>, <b>Silvester</b>.`,
    text: `In Deutschland gibt es das ganze Jahr über viele Feste. Im Februar feiert man vor allem im Rheinland Karneval: Die Menschen verkleiden sich und auf den Straßen finden große Umzüge statt. Das bekannteste Volksfest ist das Oktoberfest in München, das – anders als der Name vermuten lässt – meistens schon im September beginnt.
In der Adventszeit öffnen in fast allen Städten die Weihnachtsmärkte. Dort trinkt man Glühwein, isst Lebkuchen und kauft kleine Geschenke. Am 24. Dezember, dem Heiligabend, bekommen die Kinder ihre Geschenke. An Silvester begrüßt man das neue Jahr mit Feuerwerk.`,
    vocab: [["sich verkleiden", "travestirsi"], ["der Umzug", "la sfilata (anche: trasloco)"], ["das Volksfest", "la festa popolare"], ["vermuten lassen", "far supporre"], ["der Heiligabend", "la vigilia di Natale"], ["das Feuerwerk", "i fuochi d'artificio"]],
    questions: [
      { q: "Wann beginnt das Oktoberfest meistens?", options: ["Im Oktober", "Im September", "Im Februar"], a: 1, expl: "'meistens schon im September beginnt'." },
      { q: "Was macht man auf dem Weihnachtsmarkt?", options: ["Man verkleidet sich.", "Man trinkt Glühwein und kauft Geschenke.", "Man macht Feuerwerk."], a: 1, expl: "'trinkt man Glühwein, isst Lebkuchen und kauft kleine Geschenke'." },
      { q: "Wann bekommen Kinder in Deutschland ihre Weihnachtsgeschenke?", options: ["Am 24. Dezember", "Am 25. Dezember", "Am 6. Januar"], a: 0, expl: "Al Heiligabend, il 24 dicembre." }] },
  { id: "k7", level: "B2", cat: "Landeskunde", title: "Wirtschaft: „Made in Germany“",
    theory: `La Germania è la maggiore economia europea, forte nell'export: automobili, macchinari, chimica. Il <b>Mittelstand</b> (piccole e medie imprese) è la spina dorsale dell'economia; molte sono "hidden champions", leader mondiali poco conosciuti.`,
    text: `Ursprünglich wurde die Bezeichnung „Made in Germany“ 1887 in Großbritannien eingeführt, um vor angeblich minderwertigen deutschen Produkten zu warnen. Paradoxerweise entwickelte sie sich jedoch schon bald zu einem Qualitätssiegel.
Heute gehört Deutschland zu den größten Exportnationen der Welt. Neben bekannten Konzernen aus der Automobil- und Chemieindustrie prägt vor allem der Mittelstand die Wirtschaft. Zahlreiche dieser oft familiengeführten Unternehmen sind in ihrer Nische Weltmarktführer, obwohl sie in der Öffentlichkeit kaum bekannt sind. Man bezeichnet sie deshalb als „Hidden Champions“. Als Herausforderungen gelten derzeit der Fachkräftemangel und die Digitalisierung.`,
    vocab: [["ursprünglich", "originariamente"], ["minderwertig", "di qualità inferiore"], ["das Qualitätssiegel", "il marchio di qualità"], ["familiengeführt", "a conduzione familiare"], ["der Weltmarktführer", "il leader mondiale di mercato"], ["der Fachkräftemangel", "la carenza di personale qualificato"]],
    questions: [
      { q: "Warum wurde „Made in Germany“ ursprünglich eingeführt?", options: ["Als Werbung für deutsche Produkte", "Als Warnung vor deutschen Produkten", "Als Exportgesetz"], a: 1, expl: "'um vor angeblich minderwertigen deutschen Produkten zu warnen'." },
      { q: "Was sind „Hidden Champions“?", options: ["Große, bekannte Konzerne", "Wenig bekannte Weltmarktführer in einer Nische", "Neue Start-ups"], a: 1, expl: "'in ihrer Nische Weltmarktführer, obwohl … kaum bekannt'." },
      { q: "Welche Herausforderung wird genannt?", options: ["Der Fachkräftemangel", "Zu viele Arbeitskräfte", "Sinkende Exporte"], a: 0, expl: "'Als Herausforderungen gelten derzeit der Fachkräftemangel und die Digitalisierung'." }] },
  { id: "k8", level: "B2", cat: "Landeskunde", title: "Gesellschaft: Leben in Deutschland",
    theory: `Aspetti tipici: puntualità, raccolta differenziata (<i>Mülltrennung</i>), il <i>Pfand</i> sulle bottiglie, la domenica come giorno di riposo (<i>Ladenschluss</i>), l'uso diffuso della bici e la cultura dell'associazionismo (<i>Vereine</i>).`,
    text: `Wer nach Deutschland zieht, muss sich an einige Gewohnheiten gewöhnen. Am Sonntag sind die meisten Geschäfte geschlossen, denn der Sonntag gilt als Ruhetag. Viele Zugezogene empfinden das zunächst als unpraktisch, schätzen aber mit der Zeit die Ruhe.
Auch die Mülltrennung erfordert Aufmerksamkeit: Papier, Glas, Verpackungen und Restmüll werden getrennt gesammelt. Für viele Flaschen bezahlt man außerdem Pfand, das man zurückbekommt, wenn man die Flaschen im Supermarkt abgibt. Nicht zuletzt spielen Vereine eine große Rolle: Ob Sport, Musik oder Gartenarbeit – rund die Hälfte der Deutschen ist Mitglied in mindestens einem Verein.`,
    vocab: [["die Gewohnheit", "l'abitudine"], ["der Ruhetag", "il giorno di riposo"], ["empfinden als", "percepire come"], ["schätzen", "apprezzare / stimare"], ["das Pfand", "il vuoto a rendere (cauzione)"], ["nicht zuletzt", "non da ultimo"]],
    questions: [
      { q: "Wie reagieren viele Zugezogene auf den Sonntag als Ruhetag?", options: ["Sie finden ihn sofort ideal.", "Zuerst finden sie ihn unpraktisch, später schätzen sie ihn.", "Sie arbeiten trotzdem."], a: 1, expl: "'zunächst als unpraktisch, schätzen aber mit der Zeit die Ruhe'." },
      { q: "Wann bekommt man das Pfand zurück?", options: ["Wenn man die Flaschen im Supermarkt abgibt", "Am Ende des Monats", "Wenn man den Müll trennt"], a: 0, expl: "'wenn man die Flaschen im Supermarkt abgibt'." },
      { q: "Wie viele Deutsche sind Mitglied in einem Verein?", options: ["Etwa ein Viertel", "Rund die Hälfte", "Fast alle"], a: 1, expl: "'rund die Hälfte der Deutschen'." }] }
);

// ===== Dettati: testi completi (B1/B2) =====
const DICTATIONS = [
  { id: "t1", level: "B1", title: "Ein neuer Anfang", text: "Seit drei Monaten wohne ich in Hamburg. Am Anfang war alles neu und ein bisschen schwierig. Inzwischen habe ich eine schöne Wohnung gefunden und nette Kollegen kennengelernt. Am Wochenende fahre ich oft mit dem Fahrrad an die Elbe." },
  { id: "t2", level: "B1", title: "Beim Arzt", text: "Gestern hatte ich starke Kopfschmerzen und Fieber. Deshalb habe ich bei meiner Ärztin angerufen und einen Termin vereinbart. Sie hat mich untersucht und mir ein Medikament verschrieben. Jetzt soll ich mich ein paar Tage ausruhen und viel trinken." },
  { id: "t3", level: "B1", title: "Eine Reise nach Wien", text: "Letzten Sommer bin ich mit meiner Schwester nach Wien gefahren. Wir haben das Schloss Schönbrunn besichtigt und in einem traditionellen Kaffeehaus Kuchen gegessen. Obwohl es sehr heiß war, sind wir viel zu Fuß gegangen." },
  { id: "t4", level: "B1", title: "Eine E-Mail an die Vermieterin", text: "Liebe Frau Schneider, leider funktioniert die Heizung in meiner Wohnung seit gestern nicht mehr. Könnten Sie bitte so schnell wie möglich einen Techniker schicken? Ich bin jeden Tag ab siebzehn Uhr zu Hause. Vielen Dank und viele Grüße" },
  { id: "t5", level: "B2", title: "Homeoffice", text: "Seit der Pandemie arbeiten viele Angestellte zumindest teilweise von zu Hause aus. Einerseits sparen sie dadurch Zeit und Geld für den Arbeitsweg, andererseits fehlt ihnen häufig der persönliche Austausch mit den Kollegen. Experten empfehlen deshalb ein Modell, das beide Arbeitsformen miteinander verbindet." },
  { id: "t6", level: "B2", title: "Nachhaltiger Konsum", text: "Immer mehr Verbraucher achten beim Einkaufen darauf, ob ein Produkt umweltfreundlich hergestellt wurde. Allerdings sind nachhaltige Produkte oft teurer, sodass sich nicht jeder Haushalt sie leisten kann. Kritiker fordern daher, dass die Politik entsprechende Anreize schafft." },
  { id: "t7", level: "B2", title: "Sprachen lernen", text: "Wer eine Fremdsprache lernt, erweitert nicht nur seine beruflichen Möglichkeiten, sondern auch seinen Horizont. Je regelmäßiger man übt, desto schneller macht man Fortschritte. Besonders wirksam ist es, die Sprache im Alltag anzuwenden, zum Beispiel durch Gespräche mit Muttersprachlern." },
  { id: "t8", level: "B2", title: "Formelle Beschwerde", text: "Sehr geehrte Damen und Herren, bezugnehmend auf meine Bestellung vom zwölften März muss ich Ihnen leider mitteilen, dass die gelieferte Ware beschädigt war. Ich bitte Sie daher, mir umgehend einen Ersatz zuzusenden oder den Kaufpreis zu erstatten. Mit freundlichen Grüßen" },
  { id: "t9", level: "B2", title: "Die Digitalisierung der Schule", text: "Obwohl die meisten Schulen inzwischen mit Tablets ausgestattet sind, fehlt es vielerorts an geschulten Lehrkräften. Digitale Medien allein verbessern den Unterricht nämlich nicht automatisch. Entscheidend ist vielmehr, wie sie pädagogisch sinnvoll eingesetzt werden." },
  { id: "t10", level: "B2", title: "Geschichte Berlins", text: "Kaum eine andere Stadt hat im zwanzigsten Jahrhundert so viele Umbrüche erlebt wie Berlin. Nachdem die Stadt jahrzehntelang durch eine Mauer geteilt gewesen war, wurde sie 1990 wieder zur Hauptstadt des vereinten Deutschlands. Heute gilt sie als eine der kreativsten Metropolen Europas." }
];

// ===== Struttura ufficiale degli esami (Goethe-Zertifikat) =====
// type: mc = scelta multipla · rf = richtig/falsch · jn = ja/nein · match = abbinamento (domanda con opzioni = testi/persone)
const EXAM_SPEC = {
  B1: {
    Lesen: { min: 65, teile: [
      { n: 1, title: "Blogbeitrag", items: 6, type: "rf", desc: "Leggi un post di blog personale e decidi se le affermazioni sono giuste o sbagliate.", gen: "einen persönlichen Blogbeitrag (ca. 250 Wörter) und 6 Aussagen (richtig/falsch)" },
      { n: 2, title: "Zeitungsartikel", items: 6, type: "mc", desc: "Due brevi articoli di giornale, 3 domande a scelta multipla ciascuno.", gen: "zwei kurze Zeitungsartikel (je ca. 180 Wörter) und insgesamt 6 Multiple-Choice-Fragen mit je 3 Optionen" },
      { n: 3, title: "Anzeigen", items: 7, type: "match", desc: "Trova l'annuncio giusto per ogni persona (una persona non ha annuncio: opzione 0).", gen: "10 kurze Anzeigen (a–j) und 7 Situationen von Personen; jede Frage: 'Welche Anzeige passt zu …?' mit Optionen 'a'–'j' und 'keine'" },
      { n: 4, title: "Leserbriefe", items: 7, type: "jn", desc: "Lettere di lettori su un tema: la persona è a favore? Ja/Nein.", gen: "eine Diskussionsfrage und 7 kurze Leserbriefe (je 60–80 Wörter) mit Namen; Frage: 'Ist [Name] für …?' Optionen Ja/Nein" },
      { n: 5, title: "Regeln / Hausordnung", items: 4, type: "mc", desc: "Un regolamento o istruzioni, 4 domande a scelta multipla.", gen: "eine Hausordnung oder Kursregeln (ca. 250 Wörter) und 4 Multiple-Choice-Fragen" }] },
    Hören: { min: 40, teile: [
      { n: 1, title: "Kurze Ansagen", items: 10, type: "rf", plays: 2, desc: "5 brevi annunci (radio, segreteria, stazione). Per ognuno: 1 vero/falso e 1 scelta multipla.", gen: "5 kurze Ansagen/Nachrichten (je 50–70 Wörter); zu jeder eine Richtig/Falsch-Aussage und eine Multiple-Choice-Frage (insgesamt 10 Fragen, im Feld 'type' rf oder mc)" },
      { n: 2, title: "Führung / Vortrag", items: 5, type: "mc", plays: 1, desc: "Una guida o presentazione, ascolto unico. 5 domande.", gen: "eine Führung oder Präsentation (ca. 300 Wörter) mit 5 Multiple-Choice-Fragen" },
      { n: 3, title: "Gespräch", items: 7, type: "rf", plays: 1, desc: "Una conversazione tra due persone, ascolto unico. 7 vero/falso.", gen: "ein Alltagsgespräch zwischen zwei Personen (ca. 300 Wörter, Sprecher A und B) mit 7 Richtig/Falsch-Aussagen" },
      { n: 4, title: "Radiodiskussion", items: 8, type: "match", plays: 2, desc: "Discussione radiofonica: chi dice cosa? (moderatore / ospite 1 / ospite 2)", gen: "eine Radiodiskussion mit Moderator und zwei Gästen (ca. 400 Wörter, Sprecher mit Namen) und 8 Aussagen 'Wer sagt das?' mit den drei Namen als Optionen" }] },
    Schreiben: { min: 60, teile: [
      { n: 1, words: 80, register: "informell", desc: "E-mail informale a un amico (circa 80 parole), 3 punti da trattare." },
      { n: 2, words: 80, register: "Meinung", desc: "Opinione in un forum online (circa 80 parole)." },
      { n: 3, words: 40, register: "formell", desc: "Breve messaggio formale, ad es. per scusarsi o chiedere qualcosa (circa 40 parole)." }] },
    Sprechen: { min: 15, teile: [
      { n: 1, key: "planen", desc: "Pianificare qualcosa insieme (es. una festa, una gita)." },
      { n: 2, key: "praesentieren", desc: "Presentare un tema (circa 3 minuti) con 5 slide: esperienza, situazione nel paese d'origine, pro e contro, opinione." },
      { n: 3, key: "feedback", desc: "Rispondere alle domande sulla presentazione e dare un feedback a quella del partner." }] }
  },
  B2: {
    Lesen: { min: 65, teile: [
      { n: 1, title: "Meinungen", items: 9, type: "match", desc: "4 testi di persone diverse: a chi si riferisce ogni affermazione?", gen: "4 Meinungstexte von vier Personen (je ca. 120 Wörter, mit Namen) zu einem gemeinsamen Thema und 9 Aussagen 'Wer …?' mit den vier Namen als Optionen" },
      { n: 2, title: "Zeitungsartikel", items: 6, type: "mc", desc: "Articolo di giornale lungo, 6 domande a scelta multipla.", gen: "einen anspruchsvollen Zeitungsartikel (ca. 450 Wörter) und 6 Multiple-Choice-Fragen mit je 3 Optionen" },
      { n: 3, title: "Lückentext", items: 6, type: "match", desc: "Testo con lacune: scegli la frase giusta per ogni lacuna (ci sono frasi in più).", gen: "einen Sachtext (ca. 350 Wörter) mit 6 nummerierten Lücken ___(1)___ bis ___(6)___ und 8 Sätzen (a–h); jede Frage: 'Welcher Satz passt in Lücke n?' mit den Sätzen als Optionen" },
      { n: 4, title: "Stellungnahmen", items: 6, type: "match", desc: "Opinioni su un tema: quale titolo/affermazione corrisponde a ciascuna persona?", gen: "7 kurze Stellungnahmen (je 70–90 Wörter, mit Namen) zu einer Frage und 6 Aussagen; jede Frage: 'Welche Person vertritt diese Meinung?' mit den Namen als Optionen" },
      { n: 5, title: "Regelungen", items: 4, type: "mc", desc: "Regolamento formale (ufficio, università), 4 domande.", gen: "einen formellen Regeltext (ca. 300 Wörter, z.B. Benutzungsordnung) und 4 Multiple-Choice-Fragen" }] },
    Hören: { min: 40, teile: [
      { n: 1, title: "Kurze Texte", items: 10, type: "rf", plays: 2, desc: "5 brevi testi: per ciascuno 1 vero/falso e 1 scelta multipla.", gen: "5 kurze Hörtexte (Ansagen, Nachrichten, Gespräche, je 60–80 Wörter); zu jedem eine Richtig/Falsch-Aussage und eine Multiple-Choice-Frage (insgesamt 10, Feld 'type' rf oder mc)" },
      { n: 2, title: "Interview", items: 6, type: "mc", plays: 1, desc: "Intervista radiofonica, ascolto unico. 6 domande.", gen: "ein Radiointerview mit einer Expertin (ca. 450 Wörter, Sprecher Moderator und Gast) und 6 Multiple-Choice-Fragen" },
      { n: 3, title: "Talkshow", items: 6, type: "match", plays: 1, desc: "Talk show con tre persone: chi dice cosa?", gen: "eine Talkshow mit Moderatorin und zwei Gästen (ca. 450 Wörter, Sprecher mit Namen) und 6 Aussagen 'Wer sagt das?'" },
      { n: 4, title: "Vortrag", items: 8, type: "mc", plays: 2, desc: "Conferenza/lezione accademica, 8 domande.", gen: "einen wissenschaftlichen Vortrag (ca. 500 Wörter) und 8 Multiple-Choice-Fragen" }] },
    Schreiben: { min: 75, teile: [
      { n: 1, words: 150, register: "Forumsbeitrag", desc: "Contributo argomentativo in un forum (circa 150 parole), 4 punti da trattare." },
      { n: 2, words: 100, register: "formell", desc: "Messaggio formale (circa 100 parole), es. al responsabile o a un'istituzione." }] },
    Sprechen: { min: 15, teile: [
      { n: 1, key: "vortrag", desc: "Presentazione di circa 4 minuti su un tema a scelta, poi domande." },
      { n: 2, key: "diskussion", desc: "Discussione su una questione controversa (circa 5 minuti) con argomenti e compromesso." }] }
  }
};

// ===== Livelli e ricompense =====
const LEVELS = [0, 100, 250, 500, 850, 1300, 1900, 2700, 3700, 5000, 6500, 8500, 11000, 14000, 18000];
const LEVEL_NAMES = ["Einsteigerin", "Entdeckerin", "Lernende", "Fortgeschrittene", "Kennerin", "Könnerin", "Expertin", "Meisterin", "Virtuosin", "Sprachprofi", "Legende", "Ikone", "Goethe-Niveau", "Muttersprachlerin", "Unschlagbar"];
const THEMES = [
  { id: "blue", name: "Blu oceano", c: "#0071e3", c2: "#5e5ce6", lvl: 1 },
  { id: "violet", name: "Viola", c: "#8e44ec", c2: "#bf5af2", lvl: 3 },
  { id: "green", name: "Verde bosco", c: "#1a8a4a", c2: "#30b06a", lvl: 5 },
  { id: "orange", name: "Tramonto", c: "#e8590c", c2: "#ff9f0a", lvl: 7 },
  { id: "pink", name: "Magnolia", c: "#d6336c", c2: "#ff6b9d", lvl: 9 },
  { id: "graphite", name: "Grafite", c: "#3a3a3c", c2: "#6e6e73", lvl: 11 },
  { id: "gold", name: "Oro Goethe", c: "#b8860b", c2: "#e0b84a", lvl: 13 }
];
