// ===== Dativo, Accusativo e preposizioni: teoria + esercizi =====
const CASI_THEORY = [
  { id: "base", t: "1. Che cosa sono i casi", h: `
    <p>In tedesco l'articolo cambia a seconda della <b>funzione</b> del nome nella frase. Per capire il caso, fai la domanda giusta:</p>
    <table class="tbl"><tr><th>Caso</th><th>Funzione</th><th>Domanda</th><th>Esempio</th></tr>
      <tr><td><b>Nominativ</b></td><td>soggetto</td><td>Wer? Was?</td><td><i><b>Der</b> Mann</i> schläft.</td></tr>
      <tr><td><b>Akkusativ</b></td><td>complemento oggetto (diretto)</td><td>Wen? Was?</td><td>Ich sehe <i><b>den</b> Mann</i>.</td></tr>
      <tr><td><b>Dativ</b></td><td>a chi? (indiretto)</td><td>Wem?</td><td>Ich helfe <i><b>dem</b> Mann</i>.</td></tr></table>
    <p style="margin-top:12px"><b>Trucco per italiani:</b> se in italiano diresti «<b>a</b> qualcuno» (dare <i>a</i> Marco, rispondere <i>a</i> lei), di solito in tedesco è <b>Dativ</b>. Se è l'oggetto diretto senza preposizione (vedo <i>Marco</i>, compro <i>il pane</i>) è <b>Akkusativ</b>.</p>` },
  { id: "art", t: "2. Gli articoli in tabella", h: `
    <p>Il cambiamento più importante: nell'Akkusativ cambia <b>solo il maschile</b> (der → <b>den</b>). Nel Dativ cambia tutto: <b>dem – der – dem – den(+n)</b>.</p>
    <table class="tbl"><tr><th></th><th>maschile</th><th>femminile</th><th>neutro</th><th>plurale</th></tr>
      <tr><td><b>Nom.</b></td><td>der / ein</td><td>die / eine</td><td>das / ein</td><td>die / –</td></tr>
      <tr><td><b>Akk.</b></td><td><b>den / einen</b></td><td>die / eine</td><td>das / ein</td><td>die / –</td></tr>
      <tr><td><b>Dat.</b></td><td><b>dem / einem</b></td><td><b>der / einer</b></td><td><b>dem / einem</b></td><td><b>den</b> / – (+<b>n</b>)</td></tr></table>
    <p style="margin-top:12px">Possessivi e <i>kein</i> seguono <i>ein</i>: <i>meinen</i> (Akk. m.), <i>meinem / meiner / meinem / meinen</i> (Dat.). Nel Dativ plurale il nome prende <b>-n</b>: <i>mit den Kinder<b>n</b></i>, <i>mit meinen Freunde<b>n</b></i> (non se finisce già in -n o -s: <i>mit den Autos</i>).</p>
    <table class="tbl" style="margin-top:8px"><tr><th>Pronomi</th><th>ich</th><th>du</th><th>er</th><th>sie</th><th>es</th><th>wir</th><th>ihr</th><th>sie/Sie</th></tr>
      <tr><td><b>Akk.</b></td><td>mich</td><td>dich</td><td>ihn</td><td>sie</td><td>es</td><td>uns</td><td>euch</td><td>sie/Sie</td></tr>
      <tr><td><b>Dat.</b></td><td>mir</td><td>dir</td><td>ihm</td><td>ihr</td><td>ihm</td><td>uns</td><td>euch</td><td>ihnen/Ihnen</td></tr></table>` },
  { id: "verbi", t: "3. Verbi: Akkusativ, Dativ o tutti e due", h: `
    <p><b>La maggior parte dei verbi vuole l'Akkusativ</b>: <i>Ich kaufe <b>einen</b> Tisch. Ich besuche <b>meinen</b> Bruder. Ich frage <b>den</b> Lehrer.</i> (Attenzione: <i>fragen</i> = Akk., anche se in italiano «chiedo <b>al</b> professore».)</p>
    <p><b>Verbi che vogliono il Dativ</b> (da imparare a memoria): <i>helfen, danken, gefallen, gehören, gratulieren, antworten, folgen, passen, schmecken, fehlen, vertrauen, glauben (jdm.), zuhören, zustimmen, widersprechen, raten, schaden, begegnen, wehtun, leidtun</i>.</p>
    <p>Esempi: <i>Ich helfe <b>dir</b>.</i> (Ti aiuto) · <i>Das Kleid gefällt <b>mir</b>.</i> (Il vestito mi piace) · <i>Das Buch gehört <b>meinem</b> Vater.</i> (Il libro è di mio padre) · <i>Ich danke <b>Ihnen</b>.</i> (La ringrazio)</p>
    <p><b>Verbi con Dativ (persona) + Akkusativ (cosa)</b>: <i>geben, schenken, zeigen, erklären, schicken, bringen, empfehlen, leihen, erzählen, sagen, kaufen</i>.<br>
      <i>Ich schenke <b>meiner Mutter</b> (Dat.) <b>einen Schal</b> (Akk.).</i> = Regalo una sciarpa a mia madre.</p>
    <p><b>Ordine:</b> con due nomi, prima il Dativ poi l'Akkusativ (<i>Ich gebe dem Kind den Ball</i>). Se l'Akkusativ è un pronome, viene prima lui (<i>Ich gebe <b>ihn</b> dem Kind</i> · <i>Ich gebe <b>ihn ihm</b></i>).</p>` },
  { id: "fisse", t: "4. Preposizioni con un caso fisso", h: `
    <p><b>Sempre Akkusativ</b> — ricordale con la parola <b>«DOGFUB»</b>: <b>d</b>urch, <b>o</b>hne, <b>g</b>egen, <b>f</b>ür, <b>u</b>m, <b>b</b>is (+ entlang dopo il nome).</p>
    <ul><li><i>Das Geschenk ist <b>für</b> <b>meinen</b> Bruder.</i> — Il regalo è per mio fratello.</li>
      <li><i>Wir gehen <b>durch den</b> Park.</i> — Attraversiamo il parco.</li>
      <li><i>Ich trinke Kaffee <b>ohne</b> Zucker.</i> — Bevo il caffè senza zucchero.</li>
      <li><i>Wir sitzen <b>um den</b> Tisch.</i> — Siamo seduti intorno al tavolo.</li></ul>
    <p><b>Sempre Dativ</b> — ricordale con la canzoncina <b>«aus, bei, mit, nach, seit, von, zu»</b> (+ gegenüber, außer, ab):</p>
    <ul><li><i>Ich komme <b>aus der</b> Schweiz.</i> — Vengo dalla Svizzera.</li>
      <li><i>Ich wohne <b>bei meinen</b> Eltern.</i> — Abito dai miei genitori.</li>
      <li><i>Sie fährt <b>mit dem</b> Fahrrad.</i> — Va in bicicletta.</li>
      <li><i><b>Nach dem</b> Essen gehen wir spazieren.</i> — Dopo pranzo andiamo a passeggiare.</li>
      <li><i>Ich lerne <b>seit einem</b> Jahr Deutsch.</i> — Studio tedesco da un anno.</li>
      <li><i>Das Geschenk ist <b>von meiner</b> Oma.</i> — Il regalo è di mia nonna.</li>
      <li><i>Ich gehe <b>zum</b> Arzt.</i> — Vado dal medico.</li></ul>
    <p><b>Genitivo</b> (B2, nella lingua scritta): <i>wegen, trotz, während, statt, innerhalb, außerhalb</i> → <i>wegen <b>des</b> Wetters</i>, <i>trotz <b>der</b> Kälte</i>. Nel parlato spesso si sente il Dativ.</p>` },
  { id: "wechsel", t: "5. Wo? o Wohin? Le preposizioni «a due vie»", h: `
    <p>Nove preposizioni possono reggere sia Akkusativ sia Dativ: <b>an, auf, hinter, in, neben, über, unter, vor, zwischen</b>.</p>
    <table class="tbl"><tr><th>Domanda</th><th>Significato</th><th>Caso</th><th>Esempio</th></tr>
      <tr><td><b>Wohin?</b></td><td>movimento verso un luogo, cambio di posizione</td><td><b>Akkusativ</b></td><td><i>Ich gehe <b>in den</b> Park.</i> (vado al parco)</td></tr>
      <tr><td><b>Wo?</b></td><td>posizione, stato, dove si trova/succede</td><td><b>Dativ</b></td><td><i>Ich bin <b>im</b> (in dem) Park.</i> (sono al parco)</td></tr></table>
    <p style="margin-top:12px"><b>Le coppie di verbi</b> che lo rendono chiarissimo:</p>
    <table class="tbl"><tr><th>Wohin? + Akk. (azione)</th><th>Wo? + Dat. (risultato)</th></tr>
      <tr><td><b>stellen</b> (mettere in piedi): <i>Ich stelle die Flasche <b>auf den</b> Tisch.</i></td><td><b>stehen</b>: <i>Die Flasche steht <b>auf dem</b> Tisch.</i></td></tr>
      <tr><td><b>legen</b> (mettere sdraiato): <i>Ich lege das Buch <b>auf das</b> Sofa.</i></td><td><b>liegen</b>: <i>Das Buch liegt <b>auf dem</b> Sofa.</i></td></tr>
      <tr><td><b>setzen</b> (sedersi/far sedere): <i>Ich setze mich <b>auf den</b> Stuhl.</i></td><td><b>sitzen</b>: <i>Ich sitze <b>auf dem</b> Stuhl.</i></td></tr>
      <tr><td><b>hängen</b> (appendere, hängte): <i>Ich hänge das Bild <b>an die</b> Wand.</i></td><td><b>hängen</b> (essere appeso, hing): <i>Das Bild hängt <b>an der</b> Wand.</i></td></tr>
      <tr><td><b>stecken</b> (infilare): <i>Ich stecke den Schlüssel <b>in die</b> Tasche.</i></td><td><b>stecken</b> (essere infilato): <i>Der Schlüssel steckt <b>in der</b> Tasche.</i></td></tr></table>
    <p style="margin-top:12px"><b>Attenzione:</b> muoversi <i>dentro</i> un luogo senza cambiarlo è Dativ: <i>Wir laufen <b>im</b> Park.</i> (corriamo nel parco). E nel <b>tempo</b> queste preposizioni vogliono sempre il Dativ: <i>am Montag, im Mai, vor einer Woche, in einem Monat, zwischen den Feiertagen</i>.</p>` },
  { id: "contr", t: "6. Le contrazioni", h: `
    <table class="tbl"><tr><th>Dativ</th><th>Akkusativ</th></tr>
      <tr><td>an dem → <b>am</b> · in dem → <b>im</b> · bei dem → <b>beim</b> · von dem → <b>vom</b> · zu dem → <b>zum</b> · zu der → <b>zur</b></td><td>an das → <b>ans</b> · in das → <b>ins</b> · auf das → (aufs, parlato)</td></tr></table>
    <p style="margin-top:12px"><i>Ich bin <b>im</b> Kino</i> (Wo?) ↔ <i>Ich gehe <b>ins</b> Kino</i> (Wohin?) · <i>Wir sind <b>am</b> Meer</i> ↔ <i>Wir fahren <b>ans</b> Meer</i>.</p>` },
  { id: "luoghi", t: "7. Come si usano: luoghi", h: `
    <table class="tbl"><tr><th></th><th>Wohin? (vado…)</th><th>Wo? (sono…)</th><th>Woher? (vengo da…)</th></tr>
      <tr><td>città, Paesi senza articolo</td><td><b>nach</b> Berlin, nach Italien</td><td><b>in</b> Berlin, in Italien</td><td><b>aus</b> Berlin</td></tr>
      <tr><td>Paesi con articolo</td><td><b>in die</b> Schweiz, in die USA</td><td><b>in der</b> Schweiz</td><td><b>aus der</b> Schweiz</td></tr>
      <tr><td>edifici, luoghi chiusi</td><td><b>ins</b> Kino, in die Schule</td><td><b>im</b> Kino, in der Schule</td><td><b>aus dem</b> Kino</td></tr>
      <tr><td>persone, negozi, istituzioni</td><td><b>zum</b> Arzt, zur Post, zu Maria</td><td><b>beim</b> Arzt, bei der Post, bei Maria</td><td><b>vom</b> Arzt, von Maria</td></tr>
      <tr><td>acqua, bordo</td><td><b>ans</b> Meer, an den See</td><td><b>am</b> Meer, am See</td><td><b>vom</b> Meer</td></tr>
      <tr><td>superfici, eventi, isole</td><td><b>auf den</b> Markt, auf eine Party</td><td><b>auf dem</b> Markt, auf der Party</td><td><b>vom</b> Markt</td></tr>
      <tr><td>casa</td><td><b>nach Hause</b></td><td><b>zu Hause</b></td><td><b>von zu Hause</b></td></tr></table>` },
  { id: "tempo", t: "8. Come si usano: tempo", h: `
    <ul>
      <li><b>um</b> + ora: <i>um acht Uhr</i> (alle otto)</li>
      <li><b>am</b> + giorno, data, parte del giorno: <i>am Montag, am 3. Mai, am Abend</i> (ma: <i>in der Nacht</i>)</li>
      <li><b>im</b> + mese, stagione: <i>im Juli, im Winter</i> · anno: <i>2024</i> oppure <i>im Jahr 2024</i> (mai «in 2024»)</li>
      <li><b>vor</b> + Dat. = fa: <i>vor zwei Jahren</i> (due anni fa) · <b>in</b> + Dat. = tra: <i>in einer Woche</i> (tra una settimana)</li>
      <li><b>seit</b> + Dat. = da (dura ancora): <i>seit drei Monaten</i> · <b>ab</b> = a partire da: <i>ab Montag</i> · <b>bis</b> = fino a: <i>bis Freitag</i></li>
      <li><b>nach</b> + Dat. = dopo: <i>nach der Arbeit</i> · <b>vor</b> + Dat. = prima di: <i>vor dem Essen</i> · <b>während</b> + Gen. = durante: <i>während des Urlaubs</i></li>
      <li><b>für</b> + Akk. = per (durata prevista): <i>für zwei Wochen</i> · <b>über</b> + Akk. = oltre: <i>über eine Stunde</i></li>
    </ul>` }
];

// Esercizi. Lacune {risposta|alternativa}
const CASI_EX = {
  verbi: [
    { s: "Kannst du {mir} bitte helfen?", hint: "ich", it: "Puoi aiutarmi, per favore?", x: "helfen + Dativ → mir." },
    { s: "Ich habe {meinen} Bruder gestern besucht.", hint: "mein Bruder", it: "Ieri sono andata a trovare mio fratello.", x: "besuchen + Akkusativ, maschile → meinen." },
    { s: "Das Kleid gefällt {mir} sehr gut.", hint: "ich", it: "Il vestito mi piace molto.", x: "gefallen + Dativ: chi prova il piacere è al Dativ." },
    { s: "Ich danke {Ihnen} für Ihre Hilfe.", hint: "Sie", it: "La ringrazio per il Suo aiuto.", x: "danken + Dativ → Ihnen." },
    { s: "Darf ich {Sie} etwas fragen?", hint: "Sie", it: "Posso chiederLe una cosa?", x: "fragen + Akkusativ (in italiano «chiedere a», in tedesco Akk.)." },
    { s: "Wem gehört das Auto? – Es gehört {meinem} Vater.", hint: "mein Vater", it: "Di chi è la macchina? – È di mio padre.", x: "gehören + Dativ, maschile → meinem." },
    { s: "Ich schenke {meiner} Mutter einen Schal.", hint: "meine Mutter", it: "Regalo una sciarpa a mia madre.", x: "schenken: persona al Dativ (femminile → meiner), cosa all'Akkusativ." },
    { s: "Ich schenke meiner Mutter {einen} Schal.", hint: "ein Schal (m.)", it: "Regalo una sciarpa a mia madre.", x: "La cosa regalata è Akkusativ: maschile → einen." },
    { s: "Kannst du {dem} Kind das Spiel erklären?", hint: "das Kind", it: "Puoi spiegare il gioco al bambino?", x: "erklären: persona al Dativ → dem Kind." },
    { s: "Die Suppe schmeckt {den} Kindern nicht.", hint: "die Kinder", it: "La zuppa non piace ai bambini.", x: "schmecken + Dativ, plurale → den Kindern (con -n)." },
    { s: "Wir gratulieren {dir} zum Geburtstag!", hint: "du", it: "Ti facciamo gli auguri di compleanno!", x: "gratulieren + Dativ → dir." },
    { s: "Ich sehe {ihn} jeden Tag im Bus.", hint: "er", it: "Lo vedo ogni giorno sull'autobus.", x: "sehen + Akkusativ → ihn." },
    { s: "Ich vertraue {ihm} nicht.", hint: "er", it: "Non mi fido di lui.", x: "vertrauen + Dativ → ihm." },
    { s: "Hör {mir} bitte zu!", hint: "ich", it: "Ascoltami, per favore!", x: "zuhören + Dativ → mir." },
    { s: "Die Hose passt {mir} nicht mehr.", hint: "ich", it: "I pantaloni non mi vanno più.", x: "passen + Dativ → mir." },
    { s: "Ich brauche {einen} neuen Laptop.", hint: "ein Laptop (m.)", it: "Ho bisogno di un nuovo portatile.", x: "brauchen + Akkusativ, maschile → einen." },
    { s: "Es tut {mir} leid.", hint: "ich", it: "Mi dispiace.", x: "leidtun + Dativ → mir." },
    { s: "Die Ärztin hat {dem} Patienten Ruhe empfohlen.", hint: "der Patient", it: "La dottoressa ha consigliato riposo al paziente.", x: "empfehlen: persona al Dativ → dem Patienten (n-Deklination)." },
    { s: "Ich stimme {dir} völlig zu.", hint: "du", it: "Sono completamente d'accordo con te.", x: "zustimmen + Dativ → dir." },
    { s: "Ich rufe {dich} morgen an.", hint: "du", it: "Ti chiamo domani.", x: "anrufen + Akkusativ → dich (in italiano «ti telefono», ma è Akk.)." }
  ],
  fisse: [
    { s: "Das Geschenk ist für {meinen} Freund.", hint: "mein Freund · für", it: "Il regalo è per il mio ragazzo.", x: "für + Akkusativ → meinen." },
    { s: "Ich fahre mit {dem} Zug nach München.", hint: "der Zug · mit", it: "Vado a Monaco in treno.", x: "mit + Dativ → dem." },
    { s: "Wir gehen durch {den} Wald.", hint: "der Wald · durch", it: "Attraversiamo il bosco.", x: "durch + Akkusativ → den." },
    { s: "Sie wohnt noch bei {ihren} Eltern.", hint: "ihre Eltern · bei", it: "Abita ancora dai suoi genitori.", x: "bei + Dativ plurale → ihren." },
    { s: "Ich komme gerade aus {der} Bibliothek.", hint: "die Bibliothek · aus", it: "Vengo adesso dalla biblioteca.", x: "aus + Dativ, femminile → der." },
    { s: "Ohne {meine} Brille sehe ich nichts.", hint: "meine Brille · ohne", it: "Senza occhiali non vedo niente.", x: "ohne + Akkusativ, femminile → meine (uguale al Nom.)." },
    { s: "Nach {dem} Unterricht gehen wir einen Kaffee trinken.", hint: "der Unterricht · nach", it: "Dopo la lezione andiamo a bere un caffè.", x: "nach + Dativ → dem." },
    { s: "Ich lerne seit {einem} Jahr Deutsch.", hint: "ein Jahr · seit", it: "Studio tedesco da un anno.", x: "seit + Dativ, neutro → einem." },
    { s: "Das ist ein Brief von {meiner} Oma.", hint: "meine Oma · von", it: "È una lettera di mia nonna.", x: "von + Dativ, femminile → meiner." },
    { s: "Viele sind gegen {den} Plan.", hint: "der Plan · gegen", it: "Molti sono contro il piano.", x: "gegen + Akkusativ → den." },
    { s: "Wir sitzen um {den} Tisch.", hint: "der Tisch · um", it: "Siamo seduti intorno al tavolo.", x: "um + Akkusativ → den." },
    { s: "Ich gehe heute {zum} Zahnarzt.", hint: "der Zahnarzt · zu", it: "Oggi vado dal dentista.", x: "zu + Dativ: zu dem → zum." },
    { s: "Kommst du {zur} Party?", hint: "die Party · zu", it: "Vieni alla festa?", x: "zu + Dativ femminile: zu der → zur." },
    { s: "Ich telefoniere gerade mit {den} Kunden.", hint: "die Kunden (Pl.) · mit", it: "Sto telefonando con i clienti.", x: "mit + Dativ plurale → den Kunden." },
    { s: "Gegenüber {dem} Bahnhof gibt es ein Hotel.", hint: "der Bahnhof · gegenüber", it: "Di fronte alla stazione c'è un hotel.", x: "gegenüber + Dativ → dem." },
    { s: "Außer {meinem} Bruder sind alle gekommen.", hint: "mein Bruder · außer", it: "Sono venuti tutti tranne mio fratello.", x: "außer + Dativ → meinem." },
    { s: "Wegen {des} Streiks fahren heute keine Züge.", hint: "der Streik · wegen (B2)", it: "A causa dello sciopero oggi non ci sono treni.", x: "wegen + Genitivo → des Streiks (nel parlato anche «wegen dem Streik»)." },
    { s: "Trotz {des} Regens sind wir spazieren gegangen.", hint: "der Regen · trotz (B2)", it: "Nonostante la pioggia siamo andati a passeggio.", x: "trotz + Genitivo → des Regens." }
  ],
  wechsel: [
    { s: "Ich gehe heute Abend {ins} Kino.", hint: "das Kino · Wohin?", it: "Stasera vado al cinema.", x: "Movimento (Wohin?) → Akk.: in das → ins." },
    { s: "Ich bin gerade {im} Kino.", hint: "das Kino · Wo?", it: "Sono al cinema in questo momento.", x: "Posizione (Wo?) → Dat.: in dem → im." },
    { s: "Ich stelle die Vase auf {den} Tisch.", hint: "der Tisch", it: "Metto il vaso sul tavolo.", x: "stellen = azione verso un luogo (Wohin?) → Akk. → den." },
    { s: "Die Vase steht auf {dem} Tisch.", hint: "der Tisch", it: "Il vaso è sul tavolo.", x: "stehen = posizione (Wo?) → Dat. → dem." },
    { s: "Leg das Handy bitte auf {den} Schreibtisch!", hint: "der Schreibtisch", it: "Metti il cellulare sulla scrivania, per favore!", x: "legen (Wohin?) → Akk." },
    { s: "Dein Handy liegt auf {dem} Schreibtisch.", hint: "der Schreibtisch", it: "Il tuo cellulare è sulla scrivania.", x: "liegen (Wo?) → Dat." },
    { s: "Wir hängen das Foto an {die} Wand.", hint: "die Wand", it: "Appendiamo la foto al muro.", x: "hängen (azione, Wohin?) → Akk. femminile → die." },
    { s: "Das Foto hängt an {der} Wand.", hint: "die Wand", it: "La foto è appesa al muro.", x: "hängen (stato, Wo?) → Dat. femminile → der." },
    { s: "Die Katze schläft unter {dem} Bett.", hint: "das Bett · Wo?", it: "Il gatto dorme sotto il letto.", x: "Posizione → Dat. → dem." },
    { s: "Die Katze läuft unter {das} Bett.", hint: "das Bett · Wohin?", it: "Il gatto corre sotto il letto (ci va).", x: "Movimento verso → Akk. → das." },
    { s: "Setz dich doch neben {mich}!", hint: "ich", it: "Siediti accanto a me!", x: "sich setzen (Wohin?) → Akk. → mich." },
    { s: "Sie sitzt neben {mir}.", hint: "ich", it: "È seduta accanto a me.", x: "sitzen (Wo?) → Dat. → mir." },
    { s: "Wir fahren im Sommer {ans} Meer.", hint: "das Meer · Wohin?", it: "D'estate andiamo al mare.", x: "an das → ans (Akk., movimento)." },
    { s: "Wir sind im Sommer {am} Meer.", hint: "das Meer · Wo?", it: "D'estate siamo al mare.", x: "an dem → am (Dat., posizione)." },
    { s: "Das Auto steht hinter {dem} Haus.", hint: "das Haus", it: "La macchina è dietro la casa.", x: "stehen → Wo? → Dat." },
    { s: "Fahr das Auto bitte hinter {das} Haus.", hint: "das Haus", it: "Porta la macchina dietro la casa, per favore.", x: "Movimento verso → Akk." },
    { s: "Wir joggen jeden Morgen {im} Park.", hint: "der Park", it: "Facciamo jogging ogni mattina nel parco.", x: "Ci si muove DENTRO il parco senza cambiare luogo → Wo? → Dat.: im." },
    { s: "Der Schlüssel steckt in {der} Tür.", hint: "die Tür", it: "La chiave è nella porta.", x: "stecken (stato) → Dat." },
    { s: "Die Lampe hängt über {dem} Esstisch.", hint: "der Esstisch", it: "La lampada è sopra il tavolo da pranzo.", x: "hängen (stato) → Dat." },
    { s: "Zwischen {den} Häusern ist ein kleiner Garten.", hint: "die Häuser", it: "Tra le case c'è un piccolo giardino.", x: "Posizione → Dat. plurale → den Häusern (con -n)." },
    { s: "Ich treffe dich {am} Montag vor {dem} Kino.", hint: "der Montag · das Kino", it: "Ci vediamo lunedì davanti al cinema.", x: "Tempo: am Montag (Dat.). Luogo: vor dem Kino (Wo?, Dat.)." },
    { s: "Vor {einer} Woche war ich in Wien.", hint: "eine Woche · tempo", it: "Una settimana fa ero a Vienna.", x: "vor nel senso di «fa» → sempre Dativ → einer." }
  ],
  verbipos: [
    { s: "Ich {stelle} die Flaschen in den Kühlschrank.", hint: "stellen / stehen", it: "Metto le bottiglie in frigo.", x: "Azione + in den (Akk.) → stellen." },
    { s: "Die Flaschen {stehen} im Kühlschrank.", hint: "stellen / stehen", it: "Le bottiglie sono in frigo.", x: "Stato + im (Dat.) → stehen." },
    { s: "Wohin hast du meine Brille {gelegt}?", hint: "legen / liegen · Perfekt", it: "Dove hai messo i miei occhiali?", x: "Wohin + azione → legen, Partizip gelegt." },
    { s: "Deine Brille {liegt} auf dem Nachttisch.", hint: "legen / liegen", it: "I tuoi occhiali sono sul comodino.", x: "Wo + stato → liegen." },
    { s: "Die Kinder {sitzen} schon am Tisch.", hint: "setzen / sitzen", it: "I bambini sono già seduti a tavola.", x: "Stato → sitzen + Dat." },
    { s: "Bitte {setzen} Sie sich auf das Sofa.", hint: "setzen / sitzen", it: "Si accomodi sul divano, prego.", x: "Azione → sich setzen + Akk." },
    { s: "Ich habe den Mantel an die Garderobe {gehängt}.", hint: "hängen (azione) · Perfekt", it: "Ho appeso il cappotto all'attaccapanni.", x: "hängen transitivo è debole: hängte, gehängt." },
    { s: "Der Mantel hat an der Garderobe {gehangen}.", hint: "hängen (stato) · Perfekt", it: "Il cappotto era appeso all'attaccapanni.", x: "hängen intransitivo è forte: hing, gehangen." },
    { s: "Wo {steht} dein Auto? – Vor der Tür.", hint: "stellen / stehen", it: "Dov'è la tua macchina? – Davanti alla porta.", x: "Wo? → stehen." },
    { s: "Er {legt} sich nach dem Mittagessen aufs Sofa.", hint: "sich legen / liegen", it: "Dopo pranzo si sdraia sul divano.", x: "Azione → sich legen + aufs (Akk.)." }
  ],
  luoghi: [
    { s: "Im Sommer fliegen wir {nach} Spanien.", hint: "Spanien", it: "D'estate voliamo in Spagna.", x: "Paese senza articolo, Wohin? → nach." },
    { s: "Meine Schwester wohnt {in} Hamburg.", hint: "Hamburg", it: "Mia sorella abita ad Amburgo.", x: "Città, Wo? → in." },
    { s: "Nächstes Jahr ziehe ich {in die} Schweiz.", hint: "die Schweiz", it: "L'anno prossimo mi trasferisco in Svizzera.", x: "Paese con articolo, Wohin? → in die." },
    { s: "Ich muss heute noch {zur} Post.", hint: "die Post", it: "Oggi devo ancora andare in posta.", x: "Istituzione/negozio, Wohin? → zu + der → zur." },
    { s: "Ich war heute Morgen {beim} Arzt.", hint: "der Arzt", it: "Stamattina sono stata dal medico.", x: "Persona/studio, Wo? → bei + dem → beim." },
    { s: "Ich gehe jetzt {nach} Hause.", hint: "casa · Wohin?", it: "Adesso vado a casa.", x: "Espressione fissa: nach Hause (Wohin?)." },
    { s: "Heute Abend bleibe ich {zu} Hause.", hint: "casa · Wo?", it: "Stasera resto a casa.", x: "Espressione fissa: zu Hause (Wo?)." },
    { s: "Kommst du heute Abend {zu} mir?", hint: "ich · persona", it: "Vieni da me stasera?", x: "Andare da una persona → zu + Dativ." },
    { s: "Ich übernachte {bei} meiner Freundin.", hint: "persona · Wo?", it: "Dormo dalla mia amica.", x: "Essere da una persona → bei + Dativ." },
    { s: "Sie kommt {aus} Italien.", hint: "Italien · Woher?", it: "Viene dall'Italia.", x: "Provenienza (Paese) → aus." },
    { s: "Ich komme gerade {vom} Sport.", hint: "der Sport · Woher?", it: "Torno adesso dallo sport.", x: "Provenienza da un'attività/luogo aperto → von + dem → vom." },
    { s: "Am Samstag gehen wir {auf den} Markt.", hint: "der Markt · Wohin?", it: "Sabato andiamo al mercato.", x: "Luogo aperto/superficie, Wohin? → auf den." },
    { s: "Wir treffen uns {um} acht Uhr.", hint: "orario", it: "Ci vediamo alle otto.", x: "Ora precisa → um." },
    { s: "Mein Geburtstag ist {im} Juli.", hint: "mese", it: "Il mio compleanno è a luglio.", x: "Mesi e stagioni → im." },
    { s: "Der Kurs beginnt {am} Montag.", hint: "giorno", it: "Il corso inizia lunedì.", x: "Giorni → am." },
    { s: "Ich wohne {seit} drei Jahren in Berlin.", hint: "da (dura ancora)", it: "Abito a Berlino da tre anni.", x: "Azione iniziata nel passato che continua → seit + Dativ (Jahren con -n)." },
    { s: "Der Zug kommt {in} zehn Minuten.", hint: "tra (futuro)", it: "Il treno arriva tra dieci minuti.", x: "«tra» nel futuro → in + Dativ." },
    { s: "Ich habe {vor} zwei Tagen angerufen.", hint: "fa (passato)", it: "Ho chiamato due giorni fa.", x: "«fa» → vor + Dativ (Tagen con -n)." },
    { s: "Das Geschäft ist {bis} 20 Uhr geöffnet.", hint: "fino a", it: "Il negozio è aperto fino alle 20.", x: "«fino a» → bis." },
    { s: "{Ab} nächster Woche arbeite ich in Teilzeit.", hint: "a partire da", it: "Dalla settimana prossima lavoro part-time.", x: "«a partire da» nel futuro → ab." }
  ]
};
const CASI_SETS = [
  ["verbi", "Verbi + Akk. o Dat.", "helfen, gefallen, fragen, schenken…", "#0071e3"],
  ["fisse", "Preposizioni fisse", "für, durch, mit, bei, aus, zu…", "#30b06a"],
  ["wechsel", "Wo? o Wohin?", "in, an, auf, unter, neben…", "#e8590c"],
  ["verbipos", "stellen o stehen?", "legen/liegen, setzen/sitzen, hängen", "#bf5af2"],
  ["luoghi", "Luogo e tempo", "nach, in, zu, bei · am, im, um, seit", "#0d9488"]
];

function casiHub(a) {
  if (a === "test") {
    const items = shuffle(Object.values(CASI_EX).flatMap(l => shuffle(l).slice(0, 4))).slice(0, 20);
    return runCloze("Test sui casi", items, { again: "casi/test", crumb: "Dativo e Accusativo", back: "casi", task: "COMPLETA" });
  }
  if (CASI_EX[a]) {
    const set = CASI_SETS.find(s => s[0] === a);
    return runCloze(set[1], shuffle(CASI_EX[a]).slice(0, 12), { again: "casi/" + a, crumb: "Dativo e Accusativo", back: "casi", task: "COMPLETA LA FRASE" });
  }
  const open = a && CASI_THEORY.some(t => t.id === a) ? a : null;
  view("Dativo, Accusativo e preposizioni", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#0071e3">${ic("book")}</span><div style="flex:1"><h2 style="margin:0">Dativo, Accusativo e preposizioni</h2>
      <small class="muted">Tutte le regole in 8 schede, con esempi tradotti. Tocca una scheda per aprirla.</small></div></div></div>
    ${CASI_THEORY.map(t => `<details class="card acc" ${open === t.id || (!open && t.id === "base") ? "open" : ""}><summary><h3 style="margin:0">${esc(t.t)}</h3>${ic("right")}</summary><div class="theory" style="margin-top:12px">${t.h}</div></details>`).join("")}
    <div class="card"><h3>In sintesi: come decido?</h3><div class="theory"><ol style="margin:0;padding-left:20px">
      <li>C'è una <b>preposizione</b>? Se è fissa (für, mit…) usa il suo caso. Se è a due vie (in, an, auf…) chiediti <b>Wohin?</b> (Akk.) o <b>Wo?</b> (Dat.).</li>
      <li>Nessuna preposizione? Guarda il <b>verbo</b>: è un verbo col Dativ (helfen, gefallen…)? Oppure c'è una persona che riceve qualcosa (geben, schenken…)? → Dativ. Altrimenti l'oggetto è <b>Akkusativ</b>.</li>
      <li>È il soggetto? → <b>Nominativ</b>.</li>
      <li>Il verbo ha una preposizione fissa (warten auf, denken an…)? Vedi la sezione <a href="#prep">Verbi con preposizione</a>.</li></ol></div></div>
    <div class="sec"><h3>Esercitati</h3></div>
    <div class="mods">
      ${CASI_SETS.map(s => mod("casi/" + s[0], "pen", s[1], s[2], s[3])).join("")}
      ${mod("casi/test", "grad", "Test misto", "20 frasi su tutte le regole", "#b8860b")}
    </div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
