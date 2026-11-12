// Contenuti livello B2 (orientati all'esame Goethe-Zertifikat B2).
const LESSONS = [
  {
    id: "b1", level: "B2", title: "Konjunktiv II – Höflichkeit & Hypothesen",
    theory: `Il <b>Konjunktiv II</b> serve per ipotesi, desideri e richieste molto cortesi.<br>
      Forma: <b>würde + infinito</b>, oppure forme proprie: <b>wäre, hätte, könnte, müsste, dürfte, sollte</b>.<br>
      Passato: <b>hätte/wäre + participio</b> → <i>Wenn ich mehr gelernt hätte, wäre ich durchgekommen.</i><br><br>
      Registro formale: <i>Könnten Sie mir bitte erläutern, …?</i> · <i>Ich wäre Ihnen dankbar, wenn …</i>`,
    vocab: [
      ["Ich wäre Ihnen sehr dankbar, wenn Sie mir helfen könnten", "Le sarei molto grata se potesse aiutarmi"],
      ["Wenn ich Zeit hätte, würde ich mehr reisen", "Se avessi tempo, viaggerei di più"],
      ["Hätten Sie einen Moment Zeit?", "Avrebbe un momento?"],
      ["An Ihrer Stelle würde ich das anders machen", "Al suo posto lo farei diversamente"],
      ["Es wäre sinnvoll, wenn …", "Sarebbe sensato se …"],
      ["Wenn ich das gewusst hätte, wäre ich früher gekommen", "Se l'avessi saputo, sarei venuta prima"],
      ["Dürfte ich Sie etwas fragen?", "Potrei chiederle una cosa?"],
      ["Man müsste eigentlich mehr dafür tun", "Bisognerebbe in realtà fare di più"]
    ]
  },
  {
    id: "b2", level: "B2", title: "Passiv – Vorgangs- und Zustandspassiv",
    theory: `<b>Vorgangspassiv</b> (azione): <b>werden + participio</b> → <i>Das Gesetz wird verabschiedet.</i><br>
      <b>Zustandspassiv</b> (stato): <b>sein + participio</b> → <i>Das Gesetz ist verabschiedet.</i><br>
      Con modali: <i>Das Problem muss gelöst werden.</i> · Agente: <b>von</b> (persona) / <b>durch</b> (mezzo).<br><br>
      Alternative al passivo: <b>man</b>, <b>sich lassen</b> (<i>Das lässt sich lösen</i>), <b>sein + zu</b> (<i>Das ist zu beachten</i>).`,
    vocab: [
      ["Die Entscheidung wurde gestern getroffen", "La decisione è stata presa ieri"],
      ["Das Problem muss dringend gelöst werden", "Il problema deve essere risolto urgentemente"],
      ["Der Vertrag ist bereits unterschrieben", "Il contratto è già firmato"],
      ["Das lässt sich leicht erklären", "Si può spiegare facilmente"],
      ["Die Regeln sind unbedingt zu beachten", "Le regole vanno assolutamente rispettate"],
      ["Die Stadt wurde durch ein Erdbeben zerstört", "La città fu distrutta da un terremoto"],
      ["Es wird viel darüber diskutiert", "Se ne discute molto"],
      ["Die Ergebnisse werden nächste Woche veröffentlicht", "I risultati saranno pubblicati la settimana prossima"]
    ]
  },
  {
    id: "b3", level: "B2", title: "Konnektoren – Argumentieren",
    theory: `Per testi e discussioni B2 servono connettivi vari:<br>
      Causa: <b>da, weil, denn, nämlich, aufgrund + Gen.</b><br>
      Concessiva: <b>obwohl, trotzdem, dennoch, trotz + Gen.</b><br>
      Contrasto: <b>während, wohingegen, jedoch, allerdings</b><br>
      Conseguenza: <b>sodass, folglich, deshalb, daher</b><br>
      Doppi: <b>sowohl … als auch, weder … noch, entweder … oder, zwar … aber, je … desto</b><br><br>
      Attenzione all'ordine: <i>Obwohl es regnete, <b>gingen</b> wir spazieren.</i> (verbo alla fine nella secondaria)`,
    vocab: [
      ["Obwohl es teuer ist, lohnt es sich", "Anche se è caro, ne vale la pena"],
      ["Zwar ist das bequem, aber es schadet der Umwelt", "È comodo, certo, ma danneggia l'ambiente"],
      ["Je mehr man übt, desto besser spricht man", "Più ci si esercita, meglio si parla"],
      ["Aufgrund der hohen Kosten wurde das Projekt gestoppt", "A causa dei costi elevati il progetto è stato fermato"],
      ["Trotzdem bin ich anderer Meinung", "Ciononostante sono di un altro parere"],
      ["Sowohl Schüler als auch Lehrer profitieren davon", "Ne traggono vantaggio sia gli studenti sia gli insegnanti"],
      ["Während manche dafür sind, lehnen andere es ab", "Mentre alcuni sono favorevoli, altri lo rifiutano"],
      ["Folglich sollten wir handeln", "Di conseguenza dovremmo agire"]
    ]
  },
  {
    id: "b4", level: "B2", title: "Redemittel – Diskutieren (Sprechen Teil 2)",
    theory: `Nella prova orale B2 si discute con un partner per arrivare a una decisione. Frasi chiave:<br>
      <b>Opinione:</b> Meiner Ansicht nach … · Ich bin der Auffassung, dass …<br>
      <b>Accordo:</b> Da stimme ich Ihnen voll und ganz zu.<br>
      <b>Disaccordo cortese:</b> Da bin ich anderer Meinung. · Das sehe ich etwas anders.<br>
      <b>Compromesso:</b> Wie wäre es, wenn wir …? · Könnten wir uns darauf einigen, dass …?`,
    vocab: [
      ["Meiner Ansicht nach ist das nicht sinnvoll", "Secondo me non ha senso"],
      ["Ich bin der Auffassung, dass wir mehr investieren sollten", "Sono dell'opinione che dovremmo investire di più"],
      ["Da stimme ich Ihnen voll und ganz zu", "Su questo sono completamente d'accordo con lei"],
      ["Das sehe ich etwas anders", "La vedo in modo un po' diverso"],
      ["Darf ich kurz einhaken?", "Posso intervenire un attimo?"],
      ["Wie wäre es, wenn wir einen Kompromiss finden?", "Che ne dice se trovassimo un compromesso?"],
      ["Könnten wir uns darauf einigen?", "Potremmo accordarci su questo?"],
      ["Einerseits …, andererseits …", "Da un lato …, dall'altro …"]
    ]
  },
  {
    id: "b5", level: "B2", title: "Präsentation (Sprechen Teil 1)",
    theory: `Struttura di una presentazione B2 (circa 4 minuti):<br>
      1. <b>Einleitung:</b> Ich möchte heute über das Thema … sprechen.<br>
      2. <b>Gliederung:</b> Zunächst …, anschließend …, zum Schluss …<br>
      3. <b>Erfahrung personale/situazione in Italia:</b> In meinem Heimatland …<br>
      4. <b>Vor- und Nachteile</b><br>
      5. <b>Schluss + eigene Meinung:</b> Abschließend lässt sich sagen, dass …`,
    vocab: [
      ["Ich möchte heute über das Thema Homeoffice sprechen", "Oggi vorrei parlare del tema lavoro da casa"],
      ["Zunächst gehe ich auf die Vorteile ein", "Innanzitutto affronto i vantaggi"],
      ["In meinem Heimatland ist das ganz anders", "Nel mio paese d'origine è molto diverso"],
      ["Ein wesentlicher Nachteil besteht darin, dass …", "Uno svantaggio essenziale consiste nel fatto che …"],
      ["Abschließend lässt sich sagen, dass …", "Per concludere si può dire che …"],
      ["Vielen Dank für Ihre Aufmerksamkeit", "Grazie per l'attenzione"],
      ["Gibt es dazu noch Fragen?", "Ci sono ancora domande in merito?"]
    ]
  },
  {
    id: "b6", level: "B2", title: "Formelle E-Mail (Schreiben Teil 2)",
    theory: `Struttura di una e-mail formale:<br>
      <b>Anrede:</b> Sehr geehrte Frau Schmidt, / Sehr geehrte Damen und Herren,<br>
      <b>Motivo:</b> ich wende mich an Sie, weil … / bezugnehmend auf Ihre Anzeige …<br>
      <b>Richiesta:</b> Ich möchte Sie bitten, … · Könnten Sie mir mitteilen, ob …?<br>
      <b>Reclamo:</b> Leider muss ich mich über … beschweren.<br>
      <b>Chiusura:</b> Ich freue mich auf Ihre Rückmeldung. Mit freundlichen Grüßen`,
    vocab: [
      ["Sehr geehrte Damen und Herren", "Gentili Signore e Signori"],
      ["Ich wende mich an Sie, weil …", "Mi rivolgo a lei perché …"],
      ["Bezugnehmend auf Ihre Anzeige", "In riferimento al suo annuncio"],
      ["Leider muss ich mich über den Service beschweren", "Purtroppo devo lamentarmi del servizio"],
      ["Könnten Sie mir bitte mitteilen, ob …?", "Potrebbe comunicarmi se …?"],
      ["Ich freue mich auf Ihre Rückmeldung", "Attendo con piacere un suo riscontro"],
      ["Mit freundlichen Grüßen", "Cordiali saluti"],
      ["im Voraus vielen Dank", "grazie in anticipo"]
    ]
  },
  {
    id: "b7", level: "B2", title: "Nomen-Verb-Verbindungen",
    theory: `Tipiche del tedesco formale e degli esami: un sostantivo + verbo "vuoto" al posto di un verbo semplice.<br>
      <b>eine Entscheidung treffen</b> (= entscheiden) · <b>in Frage kommen</b> · <b>zur Verfügung stehen</b><br>
      <b>Kritik üben</b> · <b>einen Antrag stellen</b> · <b>in Kraft treten</b> · <b>Rücksicht nehmen auf</b>`,
    vocab: [
      ["eine Entscheidung treffen", "prendere una decisione"],
      ["zur Verfügung stehen", "essere a disposizione"],
      ["in Frage kommen", "entrare in considerazione"],
      ["Kritik üben an", "criticare"],
      ["einen Antrag stellen", "presentare una domanda/richiesta"],
      ["in Kraft treten", "entrare in vigore"],
      ["Rücksicht nehmen auf", "avere riguardo per"],
      ["Bezug nehmen auf", "fare riferimento a"],
      ["zum Ausdruck bringen", "esprimere"],
      ["in Anspruch nehmen", "usufruire di / richiedere"]
    ]
  },
  {
    id: "b8", level: "B2", title: "Verben mit Präpositionen",
    theory: `Molti verbi richiedono una preposizione fissa (da imparare a memoria!).<br>
      Domanda su cosa: <b>wo(r) + preposizione</b> → <i>Worauf warten Sie?</i><br>
      Riferimento: <b>da(r) + preposizione</b> → <i>Ich freue mich darauf.</i>`,
    vocab: [
      ["sich bewerben um", "candidarsi per"],
      ["sich beschäftigen mit", "occuparsi di"],
      ["abhängen von", "dipendere da"],
      ["sich gewöhnen an", "abituarsi a"],
      ["sich freuen auf", "non vedere l'ora di (futuro)"],
      ["sich freuen über", "rallegrarsi di (presente/passato)"],
      ["sich verlassen auf", "fare affidamento su"],
      ["teilnehmen an", "partecipare a"],
      ["sich einsetzen für", "impegnarsi per"],
      ["verzichten auf", "rinunciare a"]
    ]
  }
];

// Dialoghi formali in stile esame / vita professionale.
const DIALOGUES = [
  {
    id: "d1", title: "Vorstellungsgespräch – Colloquio di lavoro",
    turns: [
      { tutor: "Guten Tag, Frau Rossi. Erzählen Sie uns doch bitte etwas über sich.", it: "Buongiorno, signora Rossi. Ci parli un po' di sé.",
        answers: ["Sehr gern. Ich bin 25 Jahre alt und habe mein Studium in Italien abgeschlossen.", "Gern. Ich komme aus Italien und lerne seit einigen Jahren Deutsch."] },
      { tutor: "Warum haben Sie sich gerade bei uns beworben?", it: "Perché si è candidata proprio da noi?",
        answers: ["Ihr Unternehmen ist international tätig, und das entspricht genau meinen Zielen.", "Ich habe mich beworben, weil mich Ihre Projekte sehr interessieren."] },
      { tutor: "Was sind Ihrer Meinung nach Ihre Stärken?", it: "Secondo lei quali sono i suoi punti di forza?",
        answers: ["Ich bin zuverlässig, teamfähig und arbeite sehr strukturiert.", "Meine Stärken sind Flexibilität und Kommunikationsfähigkeit."] },
      { tutor: "Haben Sie noch Fragen an uns?", it: "Ha ancora domande per noi?",
        answers: ["Ja, könnten Sie mir bitte mehr über die Einarbeitung erzählen?", "Nein, vielen Dank. Ich freue mich auf Ihre Rückmeldung."] }
    ]
  },
  {
    id: "d2", title: "Diskussion: Homeoffice – Prova orale Teil 2",
    turns: [
      { tutor: "Ich finde, Homeoffice sollte für alle Angestellten zur Regel werden. Was meinen Sie?", it: "Trovo che il lavoro da casa dovrebbe diventare la regola per tutti. Cosa ne pensa?",
        answers: ["Da bin ich anderer Meinung. Der persönliche Kontakt ist meiner Ansicht nach sehr wichtig.", "Da stimme ich Ihnen zu, denn man spart viel Zeit für den Arbeitsweg."] },
      { tutor: "Aber viele Menschen arbeiten zu Hause konzentrierter. Das ist doch ein Vorteil, oder?", it: "Ma molti lavorano a casa con più concentrazione. È un vantaggio, no?",
        answers: ["Zwar ist das richtig, aber man fühlt sich auch schnell isoliert.", "Das stimmt, allerdings hängt das stark von der Person ab."] },
      { tutor: "Wie könnten wir uns einigen?", it: "Come potremmo metterci d'accordo?",
        answers: ["Wie wäre es mit einem Kompromiss: zwei Tage Homeoffice pro Woche?", "Ich schlage vor, dass jeder selbst entscheiden darf."] },
      { tutor: "Einverstanden. Das ist eine gute Lösung.", it: "D'accordo. È una buona soluzione.",
        answers: ["Freut mich, dass wir uns einigen konnten.", "Prima, dann halten wir das so fest."] }
    ]
  },
  {
    id: "d3", title: "Beschwerde – Reclamo al telefono",
    turns: [
      { tutor: "Kundenservice, Sie sprechen mit Herrn Weber. Was kann ich für Sie tun?", it: "Servizio clienti, parla con il signor Weber. Cosa posso fare per lei?",
        answers: ["Guten Tag, ich rufe an, weil meine Bestellung immer noch nicht angekommen ist.", "Guten Tag, ich möchte mich leider über eine fehlerhafte Lieferung beschweren."] },
      { tutor: "Das tut mir leid. Könnten Sie mir bitte Ihre Bestellnummer nennen?", it: "Mi dispiace. Potrebbe dirmi il numero d'ordine?",
        answers: ["Selbstverständlich, die Nummer lautet vier, sieben, zwei, neun.", "Ja, einen Moment bitte, ich suche sie gerade heraus."] },
      { tutor: "Wir können Ihnen einen Gutschein oder eine Rückerstattung anbieten.", it: "Possiamo offrirle un buono o un rimborso.",
        answers: ["Ich hätte lieber eine Rückerstattung, wenn das möglich ist.", "Ein Gutschein wäre für mich in Ordnung."] },
      { tutor: "Wird erledigt. Kann ich sonst noch etwas für Sie tun?", it: "Sarà fatto. Posso fare altro per lei?",
        answers: ["Nein, vielen Dank für Ihre Hilfe. Auf Wiederhören!", "Nein, das wäre alles. Einen schönen Tag noch!"] }
    ]
  }
];

// Ascolto B2: frasi più lunghe, registro formale/giornalistico.
const LISTENING = [
  { de: "Aufgrund der anhaltenden Streiks kommt es heute bundesweit zu erheblichen Verspätungen im Bahnverkehr.",
    options: ["A causa degli scioperi oggi ci sono forti ritardi dei treni in tutta la Germania.", "Gli scioperi sono finiti e i treni sono puntuali.", "Domani ci sarà uno sciopero dei treni regionali."], a: 0 },
  { de: "Obwohl die Mieten in den Großstädten stark gestiegen sind, ziehen immer mehr junge Menschen dorthin.",
    options: ["I giovani lasciano le città perché gli affitti sono alti.", "Nonostante gli affitti molto aumentati, sempre più giovani si trasferiscono nelle grandi città.", "Gli affitti nelle grandi città sono diminuiti."], a: 1 },
  { de: "Die Regierung plant, bis zum Jahr zweitausendvierzig vollständig auf erneuerbare Energien umzusteigen.",
    options: ["Il governo ha già abbandonato le energie rinnovabili.", "Il governo prevede di usare il 40% di rinnovabili.", "Il governo prevede di passare completamente alle rinnovabili entro il 2040."], a: 2 },
  { de: "Wer sich für die Stelle interessiert, sollte seine Bewerbungsunterlagen bis spätestens Ende des Monats einreichen.",
    options: ["Chi è interessato deve inviare la candidatura entro la fine del mese.", "Le candidature sono chiuse da un mese.", "Il colloquio si terrà a fine mese."], a: 0 },
  { de: "Laut einer aktuellen Studie verbringen Jugendliche durchschnittlich mehr als vier Stunden täglich am Smartphone.",
    options: ["Secondo uno studio i giovani usano lo smartphone meno di un'ora al giorno.", "Secondo uno studio recente i giovani passano in media più di quattro ore al giorno allo smartphone.", "Uno studio vieta lo smartphone ai giovani."], a: 1 },
  { de: "Hätte ich früher gewusst, wie wichtig Sprachkenntnisse im Beruf sind, hätte ich schon in der Schule mehr gelernt.",
    options: ["Ha sempre studiato molto le lingue a scuola.", "Le lingue non sono importanti nel lavoro.", "Se avesse saputo prima quanto contano le lingue nel lavoro, avrebbe studiato di più a scuola."], a: 2 },
  { de: "Die Veranstaltung musste wegen schlechten Wetters kurzfristig abgesagt werden.",
    options: ["L'evento è stato annullato all'ultimo momento per il maltempo.", "L'evento è stato spostato al chiuso.", "L'evento si terrà nonostante il maltempo."], a: 0 },
  { de: "Viele Arbeitnehmer wünschen sich mehr Flexibilität, wohingegen Arbeitgeber oft auf Präsenz im Büro bestehen.",
    options: ["Datori e dipendenti vogliono tutti lavorare in ufficio.", "Molti dipendenti desiderano più flessibilità, mentre i datori insistono spesso sulla presenza in ufficio.", "I datori di lavoro offrono più flessibilità dei dipendenti."], a: 1 }
];

const QUOTES = [
  ["Wer fremde Sprachen nicht kennt, weiß nichts von seiner eigenen.", "Chi non conosce le lingue straniere non sa nulla della propria. – Goethe"],
  ["Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.", "I limiti del mio linguaggio significano i limiti del mio mondo. – Wittgenstein"],
  ["Übung macht den Meister.", "La pratica rende maestri."],
  ["Es ist nicht genug zu wissen, man muss auch anwenden.", "Non basta sapere, bisogna anche applicare. – Goethe"],
  ["Der Weg ist das Ziel.", "Il cammino è la meta."],
  ["Fehler sind die Tore zu neuen Entdeckungen.", "Gli errori sono le porte verso nuove scoperte."],
  ["Du schaffst das B2, Bea!", "Ce la fai a prendere il B2, Bea!"],
  ["Mut steht am Anfang des Handelns, Glück am Ende.", "Il coraggio sta all'inizio dell'azione, la fortuna alla fine. – Demokrit"]
];

const PRAISE = ["Ausgezeichnet!", "Hervorragend!", "Sehr gut, Bea!", "Perfekt formuliert!", "Klasse!", "Genau so!"];

LESSONS.push(
  {
    id: "b9", level: "B2", title: "Relativsätze – Frasi relative",
    theory: `Il pronome relativo prende genere/numero dal nome, il <b>caso</b> dal verbo della relativa.<br>
      Nom: der/die/das · Akk: <b>den</b>/die/das · Dat: <b>dem</b>/<b>der</b>/<b>dem</b>/plurale <b>denen</b> · Gen: <b>dessen</b>/<b>deren</b><br>
      Con preposizione: <i>Das ist die Kollegin, <b>mit der</b> ich arbeite.</i><br>
      <b>wo / was / wer</b>: <i>Das Beste, was mir passiert ist …</i> · <i>Wer viel liest, schreibt besser.</i>`,
    vocab: [
      ["Das ist der Kollege, dem ich geholfen habe", "È il collega che ho aiutato (a cui)"],
      ["Die Firma, für die ich arbeite, ist international", "L'azienda per cui lavoro è internazionale"],
      ["Die Studentin, deren Arbeit ausgezeichnet war", "La studentessa il cui lavoro era eccellente"],
      ["Die Leute, mit denen ich spreche", "Le persone con cui parlo"],
      ["Alles, was Sie gesagt haben, stimmt", "Tutto ciò che ha detto è vero"],
      ["Wer rastet, der rostet", "Chi si ferma è perduto"]
    ]
  },
  {
    id: "b10", level: "B2", title: "Adjektivdeklination",
    theory: `<b>Dopo der/die/das</b> (debole): -e al Nom. sing. e Akk. femm./neutro, altrimenti -en.<br>
      <b>Dopo ein/kein/mein</b> (mista): come la debole, ma Nom. m. <b>-er</b>, Nom./Akk. n. <b>-es</b>.<br>
      <b>Senza articolo</b> (forte): l'aggettivo prende la desinenza dell'articolo: <i>mit groß<b>em</b> Interesse</i>, <i>bei schön<b>em</b> Wetter</i>, <i>gut<b>er</b> Wein</i>.`,
    vocab: [
      ["mit großem Interesse", "con grande interesse"],
      ["ein wichtiger Termin", "un appuntamento importante"],
      ["bei schönem Wetter", "con il bel tempo"],
      ["die neuen Mitarbeiter", "i nuovi collaboratori"],
      ["mit freundlichen Grüßen", "con cordiali saluti"],
      ["ein spannendes Projekt", "un progetto avvincente"],
      ["wegen des schlechten Wetters", "a causa del brutto tempo"]
    ]
  },
  {
    id: "b11", level: "B2", title: "Indirekte Rede – Konjunktiv I",
    theory: `Nel linguaggio giornalistico e formale si riporta il discorso altrui con il <b>Konjunktiv I</b>.<br>
      Forma: radice + -e: <i>er <b>komme</b>, sie <b>habe</b>, es <b>sei</b>, man <b>könne</b></i>.<br>
      Passato: <i>Er sagte, er <b>habe</b> das Problem gelöst / er <b>sei</b> gekommen.</i><br>
      Se il Konj. I coincide con l'indicativo, si usa il Konj. II: <i>Sie sagten, sie <b>hätten</b> keine Zeit.</i>`,
    vocab: [
      ["Der Minister sagte, die Lage sei ernst", "Il ministro disse che la situazione era seria"],
      ["Sie behauptet, sie habe nichts gewusst", "Lei sostiene di non aver saputo nulla"],
      ["Laut Bericht könne man das Problem lösen", "Secondo il rapporto si potrebbe risolvere il problema"],
      ["Er erklärte, er werde zurücktreten", "Dichiarò che si sarebbe dimesso"],
      ["Die Experten meinen, es gebe keine Alternative", "Gli esperti ritengono che non ci sia alternativa"]
    ]
  },
  {
    id: "b12", level: "B2", title: "Nominalisierung – Stile formale",
    theory: `Il tedesco formale (giornali, burocrazia, esame) trasforma i verbi in sostantivi.<br>
      <i>Weil die Preise steigen</i> → <b>Wegen des Anstiegs der Preise</b><br>
      <i>Nachdem er angekommen war</i> → <b>Nach seiner Ankunft</b><br>
      <i>Wenn man Fragen hat</i> → <b>Bei Fragen</b> · <i>Um Kosten zu sparen</i> → <b>Zur Kostenersparnis</b>`,
    vocab: [
      ["nach seiner Ankunft", "dopo il suo arrivo"],
      ["bei Fragen wenden Sie sich an uns", "in caso di domande si rivolga a noi"],
      ["wegen des Anstiegs der Preise", "a causa dell'aumento dei prezzi"],
      ["vor Beginn der Veranstaltung", "prima dell'inizio dell'evento"],
      ["zur Verbesserung der Situation", "per migliorare la situazione"],
      ["trotz intensiver Bemühungen", "nonostante sforzi intensi"]
    ]
  },
  {
    id: "b13", level: "B2", title: "Partizipialattribute",
    theory: `Il participio può fare da aggettivo davanti al nome:<br>
      <b>Partizip I</b> (attivo, in corso): <i>die <b>steigenden</b> Preise</i> = i prezzi che salgono<br>
      <b>Partizip II</b> (passivo/concluso): <i>das <b>veröffentlichte</b> Buch</i> = il libro pubblicato<br>
      Estesi: <i>die <b>im letzten Jahr deutlich gestiegenen</b> Mieten</i> = gli affitti nettamente aumentati l'anno scorso.`,
    vocab: [
      ["die steigenden Preise", "i prezzi in aumento"],
      ["das gestern veröffentlichte Ergebnis", "il risultato pubblicato ieri"],
      ["eine wachsende Zahl von Menschen", "un numero crescente di persone"],
      ["die im Text genannten Argumente", "gli argomenti citati nel testo"],
      ["ein gut ausgebildeter Mitarbeiter", "un collaboratore ben formato"]
    ]
  },
  {
    id: "b14", level: "B2", title: "Präpositionen mit Genitiv",
    theory: `Tipiche dello stile scritto: <b>während, wegen, trotz, statt, innerhalb, außerhalb, aufgrund, infolge, anlässlich, bezüglich, hinsichtlich, mithilfe</b>.<br>
      <i>Innerhalb <b>einer Woche</b></i> · <i>Bezüglich <b>Ihrer Anfrage</b></i> · <i>Anlässlich <b>des Jubiläums</b></i>`,
    vocab: [
      ["innerhalb einer Woche", "entro una settimana"],
      ["bezüglich Ihrer Anfrage", "riguardo alla sua richiesta"],
      ["anlässlich des Jubiläums", "in occasione dell'anniversario"],
      ["infolge des Unfalls", "in seguito all'incidente"],
      ["statt eines Briefes", "invece di una lettera"],
      ["hinsichtlich der Kosten", "per quanto riguarda i costi"]
    ]
  },
  {
    id: "b15", level: "B2", title: "Infinitivsätze & Modalverben subjektiv",
    theory: `<b>zu + infinito</b>: <i>Ich habe vor, nach Berlin <b>zu ziehen</b>.</i> · <b>um … zu</b> (scopo), <b>ohne … zu</b>, <b>(an)statt … zu</b>.<br>
      Modali "soggettivi" (supposizione): <i>Er <b>muss</b> krank sein</i> (sicuramente) · <i>Er <b>dürfte</b> krank sein</i> (probabilmente) ·
      <i>Er <b>könnte</b> krank sein</i> (forse) · <i>Er <b>soll</b> reich sein</i> (si dice) · <i>Er <b>will</b> das gesehen haben</i> (sostiene).`,
    vocab: [
      ["Ich habe vor, im Ausland zu arbeiten", "Ho intenzione di lavorare all'estero"],
      ["Er ging, ohne sich zu verabschieden", "Se ne andò senza salutare"],
      ["Statt zu lernen, sieht sie fern", "Invece di studiare guarda la TV"],
      ["Sie dürfte schon angekommen sein", "Dovrebbe essere già arrivata (probabilmente)"],
      ["Er soll sehr reich sein", "Si dice che sia molto ricco"],
      ["Sie will nichts davon gewusst haben", "Sostiene di non averne saputo nulla"]
    ]
  },
  {
    id: "b16", level: "B2", title: "Redewendungen – Espressioni idiomatiche",
    theory: `Un B2 "pro" si riconosce dalle espressioni idiomatiche usate al momento giusto.`,
    vocab: [
      ["Das ist nicht mein Bier", "Non sono affari miei"],
      ["Ich verstehe nur Bahnhof", "Non capisco niente"],
      ["Daumen drücken", "Incrociare le dita"],
      ["Tomaten auf den Augen haben", "Avere le fette di salame sugli occhi"],
      ["den Nagel auf den Kopf treffen", "Centrare il punto"],
      ["Schwein haben", "Avere fortuna"],
      ["etwas auf die lange Bank schieben", "Rimandare qualcosa"],
      ["ins Fettnäpfchen treten", "Fare una gaffe"],
      ["Hals- und Beinbruch!", "In bocca al lupo!"],
      ["die Kirche im Dorf lassen", "Non esagerare"]
    ]
  }
);

const TOPICS = ["Arbeit und Beruf", "Umwelt und Klimaschutz", "Digitalisierung und soziale Medien", "Bildung und Studium",
  "Gesundheit und Ernährung", "Wohnen und Stadtleben", "Reisen und Tourismus", "Kultur und Freizeit", "Gesellschaft und Familie",
  "Wirtschaft und Konsum", "Wissenschaft und Technik", "Politik und Engagement", "Medien und Nachrichten", "Mobilität und Verkehr"];
const GRAMMAR = ["Konjunktiv II", "Konjunktiv I / indirekte Rede", "Passiv mit Modalverben", "Passiv-Ersatzformen", "Relativsätze mit Präpositionen",
  "Adjektivdeklination", "Konnektoren und Satzbau", "Verben mit Präpositionen", "Nomen-Verb-Verbindungen", "Nominalisierung",
  "Partizipialattribute", "Präpositionen mit Genitiv", "Infinitivsätze", "Modalverben subjektiv", "n-Deklination", "Wortstellung im Nebensatz", "Futur I und II", "Plusquamperfekt"];

// ===== Livello B1 =====
LESSONS.push(
  {
    id: "a1", level: "B1", title: "Perfekt & Präteritum",
    theory: `<b>Perfekt</b> (parlato): haben/sein + participio. <b>sein</b> con verbi di movimento/cambiamento di stato: <i>Ich <b>bin</b> nach Berlin gefahren.</i><br>
      <b>Präteritum</b> (scritto, racconti): <i>ich ging, ich kam, ich sah</i>. Per <b>sein, haben</b> e modali si usa anche nel parlato: <i>ich war, ich hatte, ich konnte</i>.`,
    vocab: [
      ["Ich bin gestern nach München gefahren", "Ieri sono andata a Monaco"],
      ["Wir haben lange auf den Bus gewartet", "Abbiamo aspettato a lungo l'autobus"],
      ["Als Kind wohnte ich auf dem Land", "Da bambina abitavo in campagna"],
      ["Ich hatte keine Zeit", "Non avevo tempo"],
      ["Sie konnte nicht kommen", "Non poteva venire"],
      ["Was ist passiert?", "Cos'è successo?"]
    ]
  },
  {
    id: "a2", level: "B1", title: "Nebensätze: weil, dass, wenn, als, ob",
    theory: `Nella secondaria il verbo coniugato va <b>alla fine</b>.<br>
      <b>weil</b> (perché) · <b>dass</b> (che) · <b>ob</b> (se, domanda indiretta) · <b>wenn</b> (se/quando, ripetuto o presente-futuro) · <b>als</b> (quando, una volta nel passato).<br>
      Se la secondaria viene prima: <i>Weil ich krank <b>war</b>, <b>bin</b> ich zu Hause geblieben.</i>`,
    vocab: [
      ["Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte", "Studio tedesco perché vorrei lavorare in Germania"],
      ["Ich glaube, dass das richtig ist", "Credo che sia giusto"],
      ["Wissen Sie, ob der Zug pünktlich ist?", "Sa se il treno è puntuale?"],
      ["Als ich klein war, hatte ich einen Hund", "Quando ero piccola avevo un cane"],
      ["Wenn ich Zeit habe, lese ich gern", "Quando ho tempo leggo volentieri"]
    ]
  },
  {
    id: "a3", level: "B1", title: "Akkusativ & Dativ, Wechselpräpositionen",
    theory: `Akkusativ: <b>durch, für, gegen, ohne, um</b>. Dativ: <b>aus, bei, mit, nach, seit, von, zu</b>.<br>
      <b>Wechselpräpositionen</b> (in, an, auf, über, unter, vor, hinter, neben, zwischen): <b>Wohin?</b> → Akk. (movimento) · <b>Wo?</b> → Dat. (posizione).<br>
      <i>Ich lege das Buch auf <b>den</b> Tisch.</i> / <i>Das Buch liegt auf <b>dem</b> Tisch.</i>`,
    vocab: [
      ["Ich gehe in die Stadt", "Vado in città"],
      ["Ich bin in der Stadt", "Sono in città"],
      ["Ich fahre mit dem Zug", "Viaggio in treno"],
      ["Seit einem Jahr lerne ich Deutsch", "Studio tedesco da un anno"],
      ["Das Bild hängt an der Wand", "Il quadro è appeso al muro"],
      ["Ich hänge das Bild an die Wand", "Appendo il quadro al muro"]
    ]
  },
  {
    id: "a4", level: "B1", title: "Trennbare Verben & reflexive Verben",
    theory: `Verbi separabili: il prefisso va alla fine: <i>Ich <b>rufe</b> dich morgen <b>an</b>.</i> Participio: <i>an<b>ge</b>rufen</i>.<br>
      Riflessivi: <i>sich freuen, sich interessieren für, sich erinnern an</i>. Dativo se c'è un altro oggetto: <i>Ich wasche <b>mir</b> die Hände.</i>`,
    vocab: [
      ["Ich stehe jeden Tag um sieben Uhr auf", "Mi alzo ogni giorno alle sette"],
      ["Können Sie mich morgen anrufen?", "Può chiamarmi domani?"],
      ["Ich interessiere mich für Musik", "Mi interesso di musica"],
      ["Erinnern Sie sich an mich?", "Si ricorda di me?"],
      ["Der Zug kommt um acht Uhr an", "Il treno arriva alle otto"],
      ["Ich ziehe mich schnell an", "Mi vesto in fretta"]
    ]
  },
  {
    id: "a5", level: "B1", title: "Komparativ & Superlativ",
    theory: `<i>schnell → schneller → am schnellsten</i> · irregolari: <b>gut – besser – am besten</b>, <b>viel – mehr – am meisten</b>, <b>gern – lieber – am liebsten</b>.<br>
      Paragone: <i>so groß <b>wie</b></i> (uguaglianza) · <i>größer <b>als</b></i> (maggioranza).`,
    vocab: [
      ["Berlin ist größer als München", "Berlino è più grande di Monaco"],
      ["Ich trinke lieber Tee als Kaffee", "Preferisco il tè al caffè"],
      ["Das ist am besten", "Questa è la cosa migliore"],
      ["Sie ist so alt wie ich", "Ha la mia stessa età"],
      ["Immer mehr Menschen arbeiten online", "Sempre più persone lavorano online"]
    ]
  },
  {
    id: "a6", level: "B1", title: "Alltag & Behörden – Vita quotidiana",
    theory: `Situazioni tipiche del B1: medico, ufficio, appartamento, appuntamenti. Frasi formali di base:<br>
      <i>Ich hätte gern einen Termin.</i> · <i>Ich möchte mich anmelden.</i> · <i>Welche Unterlagen brauche ich?</i>`,
    vocab: [
      ["Ich hätte gern einen Termin beim Arzt", "Vorrei un appuntamento dal medico"],
      ["Ich möchte meinen Wohnsitz anmelden", "Vorrei registrare la mia residenza"],
      ["Welche Unterlagen brauche ich?", "Quali documenti mi servono?"],
      ["die Miete", "l'affitto"],
      ["die Nebenkosten", "le spese condominiali"],
      ["der Vertrag", "il contratto"],
      ["die Krankenversicherung", "l'assicurazione sanitaria"],
      ["Ich habe Kopfschmerzen", "Ho mal di testa"]
    ]
  }
);
