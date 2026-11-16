// ===== Connettori: quale usare e dove va il verbo =====
const KONN_MAP = `
  <p>Molti connettori dicono <b>la stessa cosa</b> ma cambiano la <b>posizione del verbo</b>. Per scegliere ti servono due domande: <b>che cosa voglio dire?</b> e <b>dove sta il verbo?</b></p>
  <div class="konnmap">
    <div class="km"><div class="km-h"><b>causa</b> (perché)</div><div class="km-c"><span><small>Tipo 0</small>denn</span><span><small>In fondo</small>weil, da</span><span><small>Inversione</small>nämlich <i class="muted">(dopo il verbo)</i></span></div></div>
    <div class="km"><div class="km-h"><b>conseguenza</b> (perciò)</div><div class="km-c"><span><small>Tipo 0</small>—</span><span><small>In fondo</small>sodass, so … dass</span><span><small>Inversione</small>deshalb, deswegen, darum, daher, also</span></div></div>
    <div class="km"><div class="km-h"><b>contrasto</b> (ma, anche se)</div><div class="km-c"><span><small>Tipo 0</small>aber, doch</span><span><small>In fondo</small>obwohl</span><span><small>Inversione</small>trotzdem, dennoch, allerdings</span></div></div>
    <div class="km"><div class="km-h"><b>correzione</b> (non… ma)</div><div class="km-c"><span><small>Tipo 0</small>sondern</span><span><small>In fondo</small>—</span><span><small>Inversione</small>stattdessen</span></div></div>
    <div class="km"><div class="km-h"><b>condizione</b> (se)</div><div class="km-c"><span><small>Tipo 0</small>oder <i class="muted">(= altrimenti)</i></span><span><small>In fondo</small>wenn, falls</span><span><small>Inversione</small>sonst <i class="muted">(= altrimenti)</i></span></div></div>
    <div class="km"><div class="km-h"><b>scopo</b> (per)</div><div class="km-c"><span><small>Tipo 0</small>—</span><span><small>In fondo</small>damit · um … zu</span><span><small>Inversione</small>dafür</span></div></div>
    <div class="km"><div class="km-h"><b>tempo: prima / dopo</b></div><div class="km-c"><span><small>Tipo 0</small>—</span><span><small>In fondo</small>bevor · nachdem</span><span><small>Inversione</small>vorher · danach, dann</span></div></div>
    <div class="km"><div class="km-h"><b>tempo: contemporaneo</b></div><div class="km-c"><span><small>Tipo 0</small>—</span><span><small>In fondo</small>während</span><span><small>Inversione</small>währenddessen, inzwischen</span></div></div>
    <div class="km"><div class="km-h"><b>aggiunta</b></div><div class="km-c"><span><small>Tipo 0</small>und</span><span><small>In fondo</small>—</span><span><small>Inversione</small>außerdem</span></div></div></div>
  <p style="margin-top:12px">Esempio, stessa idea in tre modi:<br><i>Ich bleibe zu Hause, <b>denn</b> ich <b>bin</b> krank.</i><br><i>Ich bleibe zu Hause, <b>weil</b> ich krank <b>bin</b>.</i><br><i>Ich bin krank, <b>deshalb bleibe</b> ich zu Hause.</i></p>`;

const KONN_THEORY = [
  { id: "pos", t: "1. Le tre posizioni del verbo", h: `
    <table class="tbl"><tr><th>Tipo</th><th>Che cosa succede</th><th>Esempio</th></tr>
      <tr><td><b>0</b><br><small>und, aber, oder, denn, sondern</small></td><td>Il connettore sta «fuori» dalla frase (posizione 0). Dopo viene una frase normale: soggetto, <b>verbo</b>.</td><td>…, <b>aber</b> ich <b>habe</b> keine Zeit.</td></tr>
      <tr><td><b>Fondo</b><br><small>weil, dass, obwohl, wenn…</small></td><td>Subordinata: il <b>verbo coniugato va in fondo</b>.</td><td>…, <b>weil</b> ich keine Zeit <b>habe</b>.</td></tr>
      <tr><td><b>Inversione</b><br><small>deshalb, trotzdem, dann…</small></td><td>Il connettore occupa la posizione 1, quindi il <b>verbo viene subito dopo</b>, poi il soggetto.</td><td>…, <b>deshalb habe</b> ich keine Zeit.</td></tr></table>
    <p style="margin-top:12px"><b>Trucco per il tipo 0:</b> ricorda <b>ADUSO</b> = <b>A</b>ber, <b>D</b>enn, <b>U</b>nd, <b>S</b>ondern, <b>O</b>der. Sono (quasi) gli unici che non cambiano niente.</p>
    <p><b>Nella subordinata, che cosa va in fondo?</b></p>
    <ul><li>Verbo separabile: si riattacca → <i>…, weil der Kurs morgen <b>anfängt</b>.</i></li>
      <li>Verbo modale: infinito + modale → <i>…, weil ich arbeiten <b>muss</b>.</i></li>
      <li>Perfekt: participio + ausiliare → <i>…, weil ich lange gearbeitet <b>habe</b>.</i></li></ul>
    <p><b>Se la subordinata viene prima</b>, occupa la posizione 1 e la principale comincia col verbo: <b>verbo, virgola, verbo</b>.<br><i>Weil ich krank <b>bin</b>, <b>bleibe</b> ich zu Hause.</i> (non: <s>…, ich bleibe zu Hause</s>)</p>` },
  { id: "koord", t: "2. Tipo 0: und, aber, oder, denn, sondern, doch", h: `
    <ul><li><b>und</b> (e), <b>oder</b> (o): <i>Ich koche <b>und</b> mein Freund deckt den Tisch.</i></li>
      <li><b>aber</b> (ma, però): <i>Das Hotel ist teuer, <b>aber</b> es ist sehr schön.</i></li>
      <li><b>denn</b> (perché, infatti): <i>Ich nehme den Schirm mit, <b>denn</b> es regnet.</i> Non si usa a inizio frase né per rispondere a «Warum?» (lì si dice <i>Weil …</i>).</li>
      <li><b>sondern</b> (ma, bensì): solo dopo una <b>negazione</b>, quando correggi: <i>Ich komme nicht aus Rom, <b>sondern</b> aus Mailand.</i> Se non correggi ma aggiungi un contrasto, è <b>aber</b>: <i>Ich habe nicht viel Geld, <b>aber</b> ich bin glücklich.</i></li>
      <li><b>doch</b> (ma, eppure; più scritto): <i>Ich habe ihn angerufen, <b>doch</b> er hat nicht geantwortet.</i></li></ul>
    <p><b>Virgola:</b> sempre prima di <i>aber, denn, sondern, doch</i>. Prima di <i>und / oder</i> di solito no.</p>
    <p><b>Attenzione:</b> <i>jedoch</i> può essere tipo 0 o inversione: <i>…, jedoch er kam nicht</i> = <i>…, jedoch kam er nicht.</i></p>` },
  { id: "sub", t: "3. Tipo «fondo»: le subordinate", h: `
    <table class="tbl"><tr><th>Significato</th><th>Connettori</th><th>Esempio</th></tr>
      <tr><td>che</td><td><b>dass</b></td><td>Ich glaube, <b>dass</b> er recht hat.</td></tr>
      <tr><td>se (dubbio)</td><td><b>ob</b></td><td>Ich weiß nicht, <b>ob</b> sie kommt.</td></tr>
      <tr><td>domande indirette</td><td><b>wo, wann, warum, wie…</b></td><td>Weißt du, <b>wann</b> der Zug fährt?</td></tr>
      <tr><td>causa</td><td><b>weil, da</b></td><td><b>Da</b> es spät ist, gehe ich.</td></tr>
      <tr><td>concessiva</td><td><b>obwohl</b></td><td><b>Obwohl</b> er müde ist, arbeitet er.</td></tr>
      <tr><td>condizione</td><td><b>wenn, falls</b></td><td><b>Falls</b> es regnet, bleiben wir hier.</td></tr>
      <tr><td>scopo</td><td><b>damit</b></td><td>Ich erkläre es, <b>damit</b> du es verstehst.</td></tr>
      <tr><td>conseguenza</td><td><b>sodass</b>, <b>so … dass</b></td><td>Es war <b>so</b> kalt, <b>dass</b> wir drinnen blieben.</td></tr>
      <tr><td>modo</td><td><b>indem</b> (facendo), <b>ohne dass</b>, <b>(an)statt dass</b></td><td>Man lernt, <b>indem</b> man übt.</td></tr>
      <tr><td>tempo</td><td><b>als, wenn, während, bevor, nachdem, seit(dem), bis, sobald, solange</b></td><td><b>Sobald</b> ich ankomme, rufe ich an.</td></tr></table>
    <p style="margin-top:12px">Davanti a tutte queste parole c'è sempre la <b>virgola</b>.</p>` },
  { id: "adv", t: "4. Tipo «inversione»: deshalb, trotzdem, sonst…", h: `
    <ul><li><b>deshalb, deswegen, darum, daher</b> (perciò): <i>Ich habe Hunger, <b>deshalb esse</b> ich jetzt.</i></li>
      <li><b>also</b> (quindi): <i>Der Laden ist zu, <b>also gehen</b> wir morgen.</i></li>
      <li><b>trotzdem, dennoch</b> (lo stesso, comunque): <i>Es regnet. <b>Trotzdem gehen</b> wir raus.</i></li>
      <li><b>allerdings</b> (però, tuttavia): <i>Die Wohnung ist schön. <b>Allerdings ist</b> sie teuer.</i></li>
      <li><b>sonst</b> (altrimenti): <i>Beeil dich, <b>sonst verpassen</b> wir den Zug.</i></li>
      <li><b>dann, danach, anschließend</b> (poi, dopo), <b>vorher</b> (prima): <i>Zuerst lerne ich, <b>danach gehe</b> ich joggen.</i></li>
      <li><b>außerdem</b> (inoltre), <b>stattdessen</b> (invece): <i>Er hat nicht gelernt. <b>Stattdessen hat</b> er gespielt.</i></li></ul>
    <p>Questi avverbi possono anche stare <b>dopo il verbo</b>, nel centro della frase: <i>Ich bleibe <b>deshalb</b> zu Hause. Wir gehen <b>trotzdem</b> raus.</i> Mai però tra soggetto e verbo: <s>Ich deshalb bleibe…</s></p>
    <p><b>nämlich</b> (infatti, perché) non sta mai all'inizio: <i>Ich komme nicht, ich bin <b>nämlich</b> krank.</i></p>` },
  { id: "doppi", t: "5. Connettori doppi", h: `
    <table class="tbl"><tr><th>Connettore</th><th>Significato</th><th>Esempio</th></tr>
      <tr><td><b>sowohl … als auch</b></td><td>sia … sia</td><td>Sie spricht <b>sowohl</b> Englisch <b>als auch</b> Spanisch.</td></tr>
      <tr><td><b>nicht nur … sondern auch</b></td><td>non solo … ma anche</td><td>Er ist <b>nicht nur</b> klug, <b>sondern auch</b> nett.</td></tr>
      <tr><td><b>entweder … oder</b></td><td>o … o</td><td><b>Entweder</b> wir gehen ins Kino <b>oder</b> wir bleiben zu Hause.</td></tr>
      <tr><td><b>weder … noch</b></td><td>né … né</td><td>Ich habe <b>weder</b> Zeit <b>noch</b> Geld.</td></tr>
      <tr><td><b>zwar … aber</b></td><td>è vero che … ma</td><td>Das Auto ist <b>zwar</b> alt, <b>aber</b> es fährt gut.</td></tr>
      <tr><td><b>einerseits … andererseits</b></td><td>da un lato … dall'altro</td><td><b>Einerseits</b> will ich reisen, <b>andererseits</b> fehlt mir das Geld.</td></tr>
      <tr><td><b>je … desto / umso</b></td><td>più … più</td><td><b>Je</b> mehr ich übe, <b>desto</b> besser spreche ich.</td></tr></table>
    <p style="margin-top:12px"><b>je … desto</b> è il più difficile: dopo <b>je</b> il verbo va <b>in fondo</b>, dopo <b>desto</b> c'è <b>inversione</b>: <i>Je älter er <b>wird</b>, desto ruhiger <b>wird</b> er.</i></p>
    <p><b>weder … noch</b> è già negativo: niente <i>nicht</i> o <i>kein</i>. <s>Ich habe weder keine Zeit…</s></p>` },
  { id: "wenn", t: "6. wenn, als, ob o wann?", h: `
    <p>In italiano sono quasi tutti «quando» o «se». In tedesco:</p>
    <table class="tbl"><tr><th>Parola</th><th>Quando si usa</th><th>Esempio</th></tr>
      <tr><td><b>als</b></td><td>una sola volta nel <b>passato</b></td><td><b>Als</b> ich 18 war, habe ich den Führerschein gemacht.</td></tr>
      <tr><td><b>wenn</b> (tempo)</td><td>presente, futuro, oppure <b>ogni volta</b> nel passato</td><td><b>Wenn</b> ich in Rom war, habe ich <i>immer</i> Pizza gegessen.</td></tr>
      <tr><td><b>wenn</b> (condizione)</td><td>se = a condizione che</td><td><b>Wenn</b> du willst, helfe ich dir.</td></tr>
      <tr><td><b>ob</b></td><td>se = dubbio, domanda sì/no indiretta</td><td>Ich weiß nicht, <b>ob</b> er kommt.</td></tr>
      <tr><td><b>wann</b></td><td>quando? = domanda (diretta o indiretta)</td><td>Weißt du, <b>wann</b> er kommt?</td></tr></table>
    <p style="margin-top:12px"><b>Prova veloce:</b> se puoi dire «se … o no», è <b>ob</b>. Se puoi dire «ogni volta che», è <b>wenn</b>. Se è un fatto unico nel passato, è <b>als</b>.</p>` },
  { id: "zweck", t: "7. damit o um … zu? (e ohne/statt … zu)", h: `
    <ul><li><b>Stesso soggetto</b> nelle due frasi → <b>um … zu</b> + infinito (più naturale): <i>Ich lerne Deutsch, <b>um</b> in Wien <b>zu</b> arbeiten.</i></li>
      <li><b>Soggetti diversi</b> → <b>damit</b> + verbo in fondo: <i>Ich spreche langsam, <b>damit</b> du mich <b>verstehst</b>.</i></li>
      <li>Con <i>damit</i> non si usano <i>wollen</i> e <i>möchten</i> (lo scopo è già nel connettore).</li>
      <li>Errore tipico italiano: «per» ≠ <i>für</i>. <s>Ich lerne, für zu arbeiten</s> → <i>um zu arbeiten</i>.</li></ul>
    <p>Stesso schema per <b>ohne … zu</b> (senza) e <b>(an)statt … zu</b> (invece di): <i>Er geht, <b>ohne</b> sich <b>zu</b> verabschieden.</i> · <i><b>Statt</b> zu lernen, schaut er Serien.</i> Con soggetti diversi: <i>ohne dass, statt dass</i>.</p>
    <p><b>Verbo separabile:</b> lo <i>zu</i> va in mezzo: <i>um früh auf<b>zu</b>stehen</i>.</p>` },
  { id: "tempo", t: "8. nachdem, bevor, während, seit, bis", h: `
    <ul><li><b>nachdem</b> (dopo che): l'azione della subordinata è <b>già finita</b>, quindi un tempo «più indietro»:<br>principale al presente → subordinata al <b>Perfekt</b>: <i>Nachdem ich gegessen <b>habe</b>, gehe ich spazieren.</i><br>principale al passato → subordinata al <b>Plusquamperfekt</b>: <i>Nachdem ich gegessen <b>hatte</b>, ging ich spazieren.</i></li>
      <li><b>bevor</b> (prima che / prima di): <i><b>Bevor</b> du gehst, mach das Licht aus.</i></li>
      <li><b>während</b> (mentre): <i><b>Während</b> ich koche, telefoniert er.</i> Può anche voler dire «mentre invece»: <i>Ich mag Berge, <b>während</b> mein Freund das Meer liebt.</i> (+ Genitiv = durante: <i>während des Urlaubs</i>)</li>
      <li><b>seit / seitdem</b> (da quando): <i><b>Seit</b> ich hier wohne, bin ich glücklich.</i></li>
      <li><b>bis</b> (finché, fino a quando): <i>Warte, <b>bis</b> ich zurück bin.</i></li>
      <li><b>sobald</b> (appena), <b>solange</b> (finché, per tutto il tempo che).</li></ul>
    <p><b>Non confondere</b> <i>nachdem</i> (subordinante, verbo in fondo) con <i>danach</i> (avverbio, inversione) e <i>nach</i> (preposizione + Dativ): <i>Nachdem ich gegessen habe … / Danach gehe ich … / Nach dem Essen …</i></p>` },
  { id: "dass", t: "9. dass o das?", h: `
    <ul><li><b>dass</b> (con ss) = «che» congiunzione, introduce una frase: <i>Ich weiß, <b>dass</b> du müde bist.</i></li>
      <li><b>das</b> (con s) = articolo, pronome o relativo, si riferisce a un nome neutro: <i>Das Buch, <b>das</b> ich lese, ist spannend.</i></li></ul>
    <p><b>Prova:</b> se puoi sostituirlo con <i>dieses</i> o <i>welches</i>, è <b>das</b>. Altrimenti è <b>dass</b>.</p>` }
];

// ---- Quale connettore? {s con {giusta}, o: 3 opzioni sbagliate, it, x}
const KONN_MC = [
  { s: "Ich gehe heute nicht zur Arbeit, {weil} ich Fieber habe.", o: ["denn", "deshalb", "trotzdem"], it: "Oggi non vado al lavoro perché ho la febbre.", x: "Il verbo «habe» è in fondo → subordinata → weil. Con denn sarebbe: «denn ich habe Fieber»." },
  { s: "Ich gehe heute nicht zur Arbeit, {denn} ich habe Fieber.", o: ["weil", "deshalb", "obwohl"], it: "Oggi non vado al lavoro, perché ho la febbre.", x: "Dopo il connettore c'è soggetto + verbo (ich habe): ordine normale → denn (tipo 0)." },
  { s: "Ich habe Fieber. {Deshalb} gehe ich heute nicht zur Arbeit.", o: ["Weil", "Denn", "Trotzdem"], it: "Ho la febbre. Perciò oggi non vado al lavoro.", x: "Verbo subito dopo il connettore (gehe ich) → avverbio: deshalb. Trotzdem ha il senso opposto." },
  { s: "{Da} das Wetter so schlecht ist, bleiben wir zu Hause.", o: ["Denn", "Deshalb", "Trotzdem"], it: "Dato che il tempo è così brutto, restiamo a casa.", x: "Subordinata all'inizio con verbo in fondo (ist) → da (= weil). Denn non può aprire la frase." },
  { s: "Der Zug hatte Verspätung, {deshalb} bin ich zu spät gekommen.", o: ["weil", "denn", "obwohl"], it: "Il treno era in ritardo, perciò sono arrivata tardi.", x: "Dopo la virgola viene subito il verbo (bin ich) → inversione → deshalb." },
  { s: "Ich kann dir heute nicht helfen, ich habe {nämlich} keine Zeit.", o: ["weil", "denn", "deshalb"], it: "Oggi non posso aiutarti, perché non ho tempo.", x: "La parola sta dopo il verbo, nel centro della frase → nämlich (infatti)." },
  { s: "– Warum kommst du nicht mit? – {Weil} ich keine Zeit habe.", o: ["Denn", "Deshalb", "Darum"], it: "– Perché non vieni? – Perché non ho tempo.", x: "Per rispondere a «Warum?» si usa weil + verbo in fondo. Denn non può iniziare la risposta." },
  { s: "Es hat die ganze Nacht geschneit, {sodass} die Straßen gesperrt waren.", o: ["deshalb", "denn", "damit"], it: "Ha nevicato tutta la notte, così le strade erano chiuse.", x: "Conseguenza con verbo in fondo (waren) → sodass. Con deshalb: «deshalb waren die Straßen gesperrt»." },
  { s: "Ich habe den Bus verpasst. {Also} muss ich zu Fuß gehen.", o: ["Weil", "Denn", "Obwohl"], it: "Ho perso l'autobus. Quindi devo andare a piedi.", x: "Conseguenza + inversione (muss ich) → also (quindi)." },
  { s: "Er war {so} müde, dass er sofort eingeschlafen ist.", o: ["zu", "sehr", "also"], it: "Era così stanco che si è addormentato subito.", x: "«così … che» = so + aggettivo … dass." },
  { s: "{Obwohl} es regnet, gehen wir spazieren.", o: ["Trotzdem", "Aber", "Weil"], it: "Anche se piove, andiamo a fare una passeggiata.", x: "Subordinata all'inizio, verbo in fondo (regnet), poi verbo, virgola, verbo → obwohl." },
  { s: "Es regnet. {Trotzdem} gehen wir spazieren.", o: ["Obwohl", "Aber", "Deshalb"], it: "Piove. Andiamo lo stesso a fare una passeggiata.", x: "Verbo subito dopo (gehen wir) → avverbio: trotzdem. Obwohl vorrebbe il verbo in fondo." },
  { s: "Es regnet, {aber} wir gehen spazieren.", o: ["obwohl", "trotzdem", "sondern"], it: "Piove, ma andiamo a fare una passeggiata.", x: "Ordine normale (wir gehen) → tipo 0: aber. Sondern solo dopo una negazione che correggi." },
  { s: "Das ist nicht mein Handy, {sondern} das von meiner Schwester.", o: ["aber", "oder", "denn"], it: "Non è il mio cellulare, ma quello di mia sorella.", x: "Negazione + correzione (non A, ma B) → sondern." },
  { s: "Ich habe nicht viel Geld, {aber} ich bin glücklich.", o: ["sondern", "obwohl", "trotzdem"], it: "Non ho molti soldi, ma sono felice.", x: "C'è nicht, ma non correggi niente: aggiungi un contrasto → aber. Ordine normale (ich bin)." },
  { s: "Wir fahren dieses Jahr nicht ans Meer, {sondern} in die Berge.", o: ["aber", "oder", "und"], it: "Quest'anno non andiamo al mare, ma in montagna.", x: "Non il mare ma la montagna: sostituisci → sondern." },
  { s: "Er ist sehr reich, {trotzdem} ist er nicht glücklich.", o: ["obwohl", "aber", "weil"], it: "È molto ricco, eppure non è felice.", x: "Inversione (ist er) → trotzdem. Aber vorrebbe «aber er ist»." },
  { s: "{Während} mein Bruder sehr sportlich ist, liege ich lieber auf dem Sofa.", o: ["Trotzdem", "Denn", "Deshalb"], it: "Mentre mio fratello è molto sportivo, io preferisco stare sul divano.", x: "Contrasto con verbo in fondo (ist) → während (= mentre invece)." },
  { s: "Sie hat die Prüfung bestanden, {obwohl} sie wenig gelernt hat.", o: ["trotzdem", "aber", "deshalb"], it: "Ha passato l'esame anche se ha studiato poco.", x: "Verbo in fondo (hat) + concessiva → obwohl." },
  { s: "Ich wollte eigentlich kommen. {Allerdings} hatte ich dann keine Zeit.", o: ["Obwohl", "Sondern", "Weil"], it: "Volevo venire. Però poi non ho avuto tempo.", x: "Inversione (hatte ich) + contrasto → allerdings (tuttavia)." },
  { s: "Er war krank. {Trotzdem} ist er zur Arbeit gegangen.", o: ["Obwohl", "Aber", "Weil"], it: "Era malato. È andato lo stesso al lavoro.", x: "Inversione (ist er) → trotzdem." },
  { s: "{Obwohl} er krank war, ist er zur Arbeit gegangen.", o: ["Trotzdem", "Weil", "Denn"], it: "Anche se era malato, è andato al lavoro.", x: "Verbo in fondo (war) + concessiva → obwohl." },
  { s: "Ich habe mich beeilt, {trotzdem} habe ich den Zug verpasst.", o: ["obwohl", "weil", "aber"], it: "Mi sono sbrigata, eppure ho perso il treno.", x: "Inversione (habe ich) → trotzdem." },
  { s: "Er hat mich nicht angerufen, {obwohl} er es versprochen hatte.", o: ["trotzdem", "denn", "deshalb"], it: "Non mi ha chiamata, anche se l'aveva promesso.", x: "Verbo in fondo (hatte) → obwohl." },
  { s: "{Wenn} du Zeit hast, ruf mich an.", o: ["Als", "Ob", "Wann"], it: "Se hai tempo, chiamami.", x: "Condizione → wenn. Ob = se di dubbio; als = una volta nel passato." },
  { s: "Nimm einen Schirm mit, {sonst} wirst du nass.", o: ["wenn", "weil", "obwohl"], it: "Prendi un ombrello, altrimenti ti bagni.", x: "«altrimenti» + inversione (wirst du) → sonst." },
  { s: "{Falls} es morgen regnet, bleiben wir zu Hause.", o: ["Ob", "Als", "Denn"], it: "Nel caso in cui domani piova, restiamo a casa.", x: "Condizione → falls (= wenn)." },
  { s: "Du musst dich beeilen, {sonst} verpasst du den Zug.", o: ["wenn", "obwohl", "denn"], it: "Devi sbrigarti, altrimenti perdi il treno.", x: "Inversione (verpasst du) + «altrimenti» → sonst." },
  { s: "{Wenn} ich mehr Zeit hätte, würde ich mehr reisen.", o: ["Als", "Ob", "Wann"], it: "Se avessi più tempo, viaggerei di più.", x: "Condizione irreale (Konjunktiv II) → wenn." },
  { s: "Ich weiß nicht, {ob} er morgen kommt.", o: ["wenn", "dass", "als"], it: "Non so se domani viene.", x: "«se» di dubbio (viene o no?) → ob, mai wenn." },
  { s: "Kannst du mir sagen, {ob} der Supermarkt sonntags geöffnet hat?", o: ["wenn", "dass", "als"], it: "Mi sai dire se il supermercato è aperto la domenica?", x: "Domanda sì/no indiretta → ob." },
  { s: "Ich frage mich, {ob} ich die richtige Entscheidung getroffen habe.", o: ["wenn", "dass", "als"], it: "Mi chiedo se ho preso la decisione giusta.", x: "sich fragen + dubbio → ob." },
  { s: "Ich bin sicher, {dass} sie die Prüfung schafft.", o: ["ob", "das", "wenn"], it: "Sono sicura che passerà l'esame.", x: "«che» congiunzione → dass (con ss)." },
  { s: "Das Buch, {das} du mir geschenkt hast, ist super.", o: ["dass", "was", "ob"], it: "Il libro che mi hai regalato è fantastico.", x: "Si riferisce a «das Buch» → pronome relativo das (una s)." },
  { s: "Er hat gesagt, {dass} er später kommt.", o: ["das", "ob", "wenn"], it: "Ha detto che viene più tardi.", x: "«che» congiunzione dopo sagen → dass." },
  { s: "Kannst du mir sagen, {warum} du so traurig bist?", o: ["weil", "darum", "denn"], it: "Mi puoi dire perché sei così triste?", x: "Domanda indiretta → parola interrogativa warum + verbo in fondo." },
  { s: "{Als} ich zehn Jahre alt war, sind wir nach Berlin gezogen.", o: ["Wenn", "Wann", "Ob"], it: "Quando avevo dieci anni, ci siamo trasferiti a Berlino.", x: "Una sola volta nel passato → als." },
  { s: "{Wenn} ich in Berlin war, habe ich immer meine Tante besucht.", o: ["Als", "Wann", "Ob"], it: "Quando ero a Berlino, andavo sempre a trovare mia zia.", x: "Ogni volta nel passato (immer) → wenn." },
  { s: "{Wenn} ich nächstes Jahr in Berlin bin, besuche ich dich.", o: ["Als", "Wann", "Ob"], it: "Quando l'anno prossimo sarò a Berlino, vengo a trovarti.", x: "Futuro → wenn. Als solo per il passato." },
  { s: "{Als} wir letzten Sommer in Italien waren, hat es jeden Tag geregnet.", o: ["Wenn", "Wann", "Ob"], it: "Quando l'estate scorsa eravamo in Italia, ha piovuto ogni giorno.", x: "Un'unica vacanza nel passato (letzten Sommer) → als." },
  { s: "Weißt du, {wann} der Film anfängt?", o: ["wenn", "als", "damit"], it: "Sai quando comincia il film?", x: "Domanda (a che ora?) → wann." },
  { s: "{Nachdem} wir gegessen hatten, sind wir spazieren gegangen.", o: ["Bevor", "Während", "Damit"], it: "Dopo che avevamo mangiato, siamo andati a passeggiare.", x: "Plusquamperfekt (hatten gegessen) = azione già finita → nachdem." },
  { s: "{Bevor} du gehst, mach bitte das Fenster zu.", o: ["Nachdem", "Seit", "Als"], it: "Prima di andare, chiudi la finestra per favore.", x: "Prima di → bevor." },
  { s: "{Während} ich koche, hört mein Mann Musik.", o: ["Trotzdem", "Danach", "Denn"], it: "Mentre cucino, mio marito ascolta musica.", x: "Contemporaneità + verbo in fondo (koche) → während." },
  { s: "{Seit} ich in Hamburg wohne, fahre ich viel Fahrrad.", o: ["Bis", "Als", "Danach"], it: "Da quando abito ad Amburgo, vado molto in bici.", x: "Da quando (dura ancora) → seit / seitdem." },
  { s: "Warte hier, {bis} ich zurückkomme.", o: ["seit", "als", "nachdem"], it: "Aspetta qui finché torno.", x: "Finché → bis." },
  { s: "{Sobald} ich die Ergebnisse habe, schreibe ich dir.", o: ["Seit", "Als", "Damit"], it: "Appena ho i risultati, ti scrivo.", x: "Appena → sobald." },
  { s: "Ich rufe dich an, {sobald} ich angekommen bin.", o: ["seit", "bis", "als"], it: "Ti chiamo appena sono arrivata.", x: "Appena → sobald." },
  { s: "Ich habe zuerst gefrühstückt. {Danach} bin ich zur Uni gefahren.", o: ["Nachdem", "Bevor", "Als"], it: "Prima ho fatto colazione. Dopo sono andata all'università.", x: "Inversione (bin ich) → avverbio danach. Nachdem è subordinante (verbo in fondo)." },
  { s: "Ich habe gefrühstückt, {bevor} ich zur Uni gefahren bin.", o: ["danach", "vorher", "dann"], it: "Ho fatto colazione prima di andare all'università.", x: "Verbo in fondo (bin) → subordinante: bevor. Danach/vorher/dann vogliono l'inversione." },
  { s: "Sie hat so lange gewartet, {bis} der Bus endlich kam.", o: ["seit", "damit", "ob"], it: "Ha aspettato finché l'autobus finalmente è arrivato.", x: "Finché → bis." },
  { s: "{Seitdem} sie den neuen Job hat, ist sie viel glücklicher.", o: ["Bis", "Als", "Danach"], it: "Da quando ha il nuovo lavoro, è molto più felice.", x: "Da quando → seitdem." },
  { s: "Ich spare Geld, {um} mir ein neues Auto zu kaufen.", o: ["damit", "dass", "weil"], it: "Risparmio per comprarmi una macchina nuova.", x: "Stesso soggetto + zu + infinito → um … zu." },
  { s: "Ich spreche langsam, {damit} mich alle verstehen.", o: ["um", "deshalb", "ohne"], it: "Parlo lentamente perché tutti mi capiscano.", x: "Soggetti diversi (ich / alle) → damit + verbo in fondo." },
  { s: "Sie geht früh ins Bett, {um} morgen fit zu sein.", o: ["damit", "weil", "dass"], it: "Va a letto presto per essere in forma domani.", x: "Stesso soggetto + zu + infinito → um … zu." },
  { s: "Ich lerne Deutsch, {um} in der Schweiz zu arbeiten.", o: ["damit", "weil", "für"], it: "Studio tedesco per lavorare in Svizzera.", x: "«per» + infinito = um … zu. Mai für + zu (errore tipico)." },
  { s: "Ich lerne Deutsch, {weil} ich in der Schweiz arbeiten will.", o: ["um", "damit", "denn"], it: "Studio tedesco perché voglio lavorare in Svizzera.", x: "Verbo in fondo (will) + causa → weil. Con damit non si usa wollen." },
  { s: "Ich gebe dir meine Nummer, {damit} du mich anrufen kannst.", o: ["um", "ob", "für"], it: "Ti do il mio numero così puoi chiamarmi.", x: "Soggetti diversi (ich / du) → damit." },
  { s: "Er ist gegangen, {ohne} sich zu verabschieden.", o: ["um", "damit", "dass"], it: "Se n'è andato senza salutare.", x: "senza + infinito → ohne … zu." },
  { s: "{Statt} zu lernen, hat er den ganzen Tag gespielt.", o: ["Um", "Damit", "Obwohl"], it: "Invece di studiare, ha giocato tutto il giorno.", x: "invece di + infinito → (an)statt … zu." },
  { s: "Man lernt eine Sprache am besten, {indem} man viel mit Muttersprachlern spricht.", o: ["damit", "um", "ob"], it: "Si impara meglio una lingua parlando molto con madrelingua.", x: "Modo (facendo qualcosa) → indem." },
  { s: "Ich trinke {weder} Kaffee noch Tee.", o: ["entweder", "sowohl", "zwar"], it: "Non bevo né caffè né tè.", x: "né … né → weder … noch." },
  { s: "Wir fahren {entweder} nach Spanien oder nach Portugal.", o: ["weder", "sowohl", "zwar"], it: "Andiamo o in Spagna o in Portogallo.", x: "o … o → entweder … oder." },
  { s: "Sie spricht {sowohl} Englisch als auch Französisch.", o: ["weder", "entweder", "zwar"], it: "Parla sia inglese sia francese.", x: "sia … sia → sowohl … als auch." },
  { s: "Er ist nicht nur intelligent, {sondern} auch sehr nett.", o: ["aber", "und", "oder"], it: "Non è solo intelligente, ma anche molto gentile.", x: "nicht nur … sondern auch." },
  { s: "Die Wohnung ist {zwar} klein, aber sehr gemütlich.", o: ["weder", "sowohl", "entweder"], it: "L'appartamento è piccolo, è vero, ma molto accogliente.", x: "è vero che … ma → zwar … aber." },
  { s: "Je mehr ich übe, {desto} besser spreche ich.", o: ["so", "als", "dann"], it: "Più mi esercito, meglio parlo.", x: "je … desto (o umso) + inversione." },
  { s: "{Je} länger ich in Deutschland lebe, desto besser gefällt es mir.", o: ["Wenn", "Als", "So"], it: "Più a lungo vivo in Germania, più mi piace.", x: "più … più → je (verbo in fondo) … desto (inversione)." },
  { s: "{Einerseits} möchte ich im Ausland studieren, andererseits vermisse ich meine Familie.", o: ["Weder", "Entweder", "Sowohl"], it: "Da un lato vorrei studiare all'estero, dall'altro mi manca la famiglia.", x: "einerseits … andererseits." },
  { s: "Ich habe keine Lust auf die Party. {Außerdem} bin ich müde.", o: ["Weil", "Obwohl", "Denn"], it: "Non ho voglia della festa. Inoltre sono stanca.", x: "Aggiunta + inversione (bin ich) → außerdem." },
  { s: "Ich wollte ins Kino gehen, {stattdessen} bin ich zu Hause geblieben.", o: ["statt", "obwohl", "weil"], it: "Volevo andare al cinema, invece sono rimasta a casa.", x: "«invece» + inversione (bin ich) → stattdessen. Statt da solo vuole zu + infinito o un nome." },
  { s: "Das Konzert war ausverkauft. {Deshalb} haben wir keine Karten bekommen.", o: ["Weil", "Denn", "Obwohl"], it: "Il concerto era esaurito. Perciò non abbiamo avuto i biglietti.", x: "Inversione (haben wir) → deshalb." },
  { s: "Wir bleiben drinnen, {denn} draußen ist es zu kalt.", o: ["weil", "deshalb", "obwohl"], it: "Restiamo dentro perché fuori fa troppo freddo.", x: "Dopo il connettore: draußen ist es → ordine da frase principale → denn. Weil vorrebbe «weil es draußen zu kalt ist»." },
  { s: "Ich bin müde, {weil} ich gestern lange gearbeitet habe.", o: ["denn", "deshalb", "trotzdem"], it: "Sono stanca perché ieri ho lavorato a lungo.", x: "Ausiliare in fondo (habe) → weil." },
  { s: "Ich habe gestern lange gearbeitet, {deswegen} bin ich heute müde.", o: ["weil", "denn", "obwohl"], it: "Ieri ho lavorato a lungo, perciò oggi sono stanca.", x: "Inversione (bin ich) → deswegen (= deshalb)." },
  { s: "Es ist schon spät. {Trotzdem} möchte ich noch einen Film sehen.", o: ["Obwohl", "Denn", "Weil"], it: "È già tardi. Vorrei comunque vedere ancora un film.", x: "Inversione (möchte ich) + contrasto → trotzdem." },
  { s: "Ich habe ihn dreimal angerufen, {doch} er hat nicht geantwortet.", o: ["obwohl", "trotzdem", "sondern"], it: "L'ho chiamato tre volte, ma non ha risposto.", x: "Ordine normale (er hat) + contrasto → doch (= aber). Trotzdem vorrebbe «trotzdem hat er»." },
  { s: "Ich mache das Fenster auf, {damit} frische Luft reinkommt.", o: ["um", "ob", "deshalb"], it: "Apro la finestra perché entri aria fresca.", x: "Soggetti diversi (ich / frische Luft) → damit." }
];

// ---- Collega le frasi: [connettore, frase giusta, sbagliata 1, sbagliata 2, it, spiegazione]
const KONN_JOIN = [
  ["weil", "Ich bin müde, weil ich schlecht geschlafen habe.", "Ich bin müde, weil ich habe schlecht geschlafen.", "Ich bin müde, weil habe ich schlecht geschlafen.", "Sono stanca perché ho dormito male.", "weil = verbo in fondo: participio + ausiliare (geschlafen habe)."],
  ["denn", "Ich bin müde, denn ich habe schlecht geschlafen.", "Ich bin müde, denn habe ich schlecht geschlafen.", "Ich bin müde, denn ich schlecht geschlafen habe.", "Sono stanca, perché ho dormito male.", "denn = tipo 0: frase normale dopo il connettore."],
  ["deshalb", "Ich habe schlecht geschlafen, deshalb bin ich müde.", "Ich habe schlecht geschlafen, deshalb ich bin müde.", "Ich habe schlecht geschlafen, deshalb ich müde bin.", "Ho dormito male, perciò sono stanca.", "deshalb = inversione: verbo subito dopo, poi soggetto."],
  ["obwohl", "Obwohl es kalt ist, gehen wir schwimmen.", "Obwohl es ist kalt, wir gehen schwimmen.", "Obwohl es kalt ist, wir gehen schwimmen.", "Anche se fa freddo, andiamo a nuotare.", "Subordinata prima: verbo in fondo (ist), poi verbo, virgola, verbo (ist, gehen)."],
  ["trotzdem", "Es ist kalt. Trotzdem gehen wir schwimmen.", "Es ist kalt. Trotzdem wir gehen schwimmen.", "Es ist kalt. Trotzdem wir schwimmen gehen.", "Fa freddo. Andiamo lo stesso a nuotare.", "trotzdem = inversione."],
  ["dass", "Ich glaube, dass er heute nicht kommen kann.", "Ich glaube, dass er kann heute nicht kommen.", "Ich glaube, dass er heute nicht kann kommen.", "Credo che oggi non possa venire.", "Con il modale: infinito + modale in fondo (kommen kann)."],
  ["weil", "Ich bin nervös, weil die Prüfung morgen anfängt.", "Ich bin nervös, weil die Prüfung fängt morgen an.", "Ich bin nervös, weil die Prüfung morgen an fängt.", "Sono nervosa perché l'esame comincia domani.", "Verbo separabile in fondo: si riattacca in una parola (anfängt)."],
  ["wenn", "Wenn ich Zeit habe, rufe ich dich an.", "Wenn ich Zeit habe, ich rufe dich an.", "Wenn ich habe Zeit, rufe ich dich an.", "Quando ho tempo ti chiamo.", "Verbo, virgola, verbo: habe, rufe."],
  ["als", "Als ich in Berlin war, habe ich viele Museen besucht.", "Als ich war in Berlin, habe ich viele Museen besucht.", "Als ich in Berlin war, ich habe viele Museen besucht.", "Quando ero a Berlino, ho visitato molti musei.", "als = verbo in fondo; poi la principale comincia col verbo."],
  ["damit", "Ich spreche langsam, damit du mich verstehst.", "Ich spreche langsam, damit du verstehst mich.", "Ich spreche langsam, damit verstehst du mich.", "Parlo lentamente perché tu mi capisca.", "damit = verbo in fondo."],
  ["um … zu", "Sie spart Geld, um eine Reise zu machen.", "Sie spart Geld, um zu machen eine Reise.", "Sie spart Geld, um sie eine Reise zu machen.", "Risparmia per fare un viaggio.", "um … zu: niente soggetto, zu + infinito alla fine."],
  ["nachdem", "Nachdem er gegessen hatte, ging er schlafen.", "Nachdem er hatte gegessen, ging er schlafen.", "Nachdem er gegessen hatte, er ging schlafen.", "Dopo aver mangiato, andò a dormire.", "Plusquamperfekt in fondo (gegessen hatte), poi verbo."],
  ["ob", "Ich weiß nicht, ob der Laden heute geöffnet hat.", "Ich weiß nicht, ob hat der Laden heute geöffnet.", "Ich weiß nicht, ob der Laden hat heute geöffnet.", "Non so se il negozio oggi è aperto.", "ob = verbo in fondo."],
  ["wo", "Kannst du mir sagen, wo der Bahnhof ist?", "Kannst du mir sagen, wo ist der Bahnhof?", "Kannst du mir sagen, der Bahnhof wo ist?", "Mi sai dire dov'è la stazione?", "Domanda indiretta: parola interrogativa + verbo in fondo."],
  ["aber", "Ich mag Kaffee, aber ich trinke keinen am Abend.", "Ich mag Kaffee, aber trinke ich keinen am Abend.", "Ich mag Kaffee, aber ich keinen am Abend trinke.", "Mi piace il caffè, ma la sera non lo bevo.", "aber = tipo 0: ordine normale."],
  ["sonst", "Beeil dich, sonst kommen wir zu spät.", "Beeil dich, sonst wir kommen zu spät.", "Beeil dich, sonst wir zu spät kommen.", "Sbrigati, altrimenti arriviamo tardi.", "sonst = inversione."],
  ["deshalb", "Der Zug hatte Verspätung. Ich bin deshalb zu spät gekommen.", "Der Zug hatte Verspätung. Ich deshalb bin zu spät gekommen.", "Der Zug hatte Verspätung. Deshalb ich bin zu spät gekommen.", "Il treno era in ritardo. Perciò sono arrivata tardi.", "L'avverbio può stare anche dopo il verbo, mai tra soggetto e verbo."],
  ["weil", "Er war nicht da, weil er arbeiten musste.", "Er war nicht da, weil er musste arbeiten.", "Er war nicht da, weil musste er arbeiten.", "Non c'era perché doveva lavorare.", "Modale in fondo dopo l'infinito (arbeiten musste)."],
  ["weil", "Weil ich krank war, bin ich zu Hause geblieben.", "Weil ich krank war, ich bin zu Hause geblieben.", "Weil ich war krank, bin ich zu Hause geblieben.", "Siccome ero malata, sono rimasta a casa.", "Verbo, virgola, verbo: war, bin."],
  ["je … desto", "Je mehr ich lese, desto mehr Wörter lerne ich.", "Je mehr ich lese, desto mehr Wörter ich lerne.", "Je mehr lese ich, desto mehr Wörter lerne ich.", "Più leggo, più parole imparo.", "je → verbo in fondo; desto → inversione."],
  ["entweder … oder", "Entweder wir gehen ins Kino oder wir bleiben zu Hause.", "Entweder wir gehen ins Kino oder bleiben wir zu Hause.", "Entweder wir ins Kino gehen oder wir bleiben zu Hause.", "O andiamo al cinema o restiamo a casa.", "oder è tipo 0: dopo, ordine normale."],
  ["zwar … aber", "Das Hotel war zwar teuer, aber das Essen war super.", "Das Hotel war zwar teuer, aber war das Essen super.", "Das Hotel war zwar teuer, aber das Essen super war.", "L'hotel era caro, ma il cibo era ottimo.", "aber è tipo 0: ordine normale."],
  ["während", "Während ich gern koche, isst mein Freund lieber im Restaurant.", "Während ich gern koche, mein Freund isst lieber im Restaurant.", "Während ich koche gern, isst mein Freund lieber im Restaurant.", "Mentre io cucino volentieri, il mio ragazzo preferisce mangiare al ristorante.", "Verbo, virgola, verbo: koche, isst."],
  ["sodass", "Es hat stark geregnet, sodass das Spiel abgesagt wurde.", "Es hat stark geregnet, sodass wurde das Spiel abgesagt.", "Es hat stark geregnet, sodass das Spiel wurde abgesagt.", "Ha piovuto forte, così la partita è stata annullata.", "sodass = verbo in fondo (abgesagt wurde)."],
  ["bevor", "Bevor ich einkaufe, schreibe ich eine Liste.", "Bevor ich kaufe ein, schreibe ich eine Liste.", "Bevor ich einkaufe, ich schreibe eine Liste.", "Prima di fare la spesa scrivo una lista.", "Separabile riattaccato in fondo (einkaufe), poi verbo, virgola, verbo."],
  ["dass", "Sie hat erzählt, dass sie gestern umgezogen ist.", "Sie hat erzählt, dass sie ist gestern umgezogen.", "Sie hat erzählt, dass sie gestern ist umgezogen.", "Ha raccontato che ieri ha traslocato.", "Perfekt: participio + ausiliare in fondo (umgezogen ist)."],
  ["ohne … zu", "Er ist gegangen, ohne etwas zu sagen.", "Er ist gegangen, ohne zu sagen etwas.", "Er ist gegangen, ohne er etwas sagt.", "Se n'è andato senza dire niente.", "ohne … zu: zu + infinito alla fine, senza soggetto."],
  ["außerdem", "Die Wohnung ist zu teuer. Außerdem ist sie zu klein.", "Die Wohnung ist zu teuer. Außerdem sie ist zu klein.", "Die Wohnung ist zu teuer. Außerdem, sie ist zu klein.", "L'appartamento è troppo caro. Inoltre è troppo piccolo.", "außerdem = inversione, senza virgola dopo."],
  ["falls", "Falls du Hilfe brauchst, kannst du mich anrufen.", "Falls du brauchst Hilfe, kannst du mich anrufen.", "Falls du Hilfe brauchst, du kannst mich anrufen.", "Se ti serve aiuto, puoi chiamarmi.", "Verbo, virgola, verbo: brauchst, kannst."],
  ["um … zu", "Ich stehe früh auf, um den Bus zu erreichen.", "Ich stehe früh auf, um zu erreichen den Bus.", "Ich stehe früh auf, damit den Bus zu erreichen.", "Mi alzo presto per prendere l'autobus.", "Stesso soggetto → um … zu, infinito alla fine."]
];

// ---- Che tipo è? [connettore, tipo: 0 | E (fondo) | I (inversione) | Z (zu + infinito), nota]
const KONN_TYPE = [
  ["und", "0", "e"], ["aber", "0", "ma"], ["oder", "0", "o"], ["denn", "0", "perché, infatti"], ["sondern", "0", "ma, bensì (dopo negazione)"],
  ["weil", "E", "perché"], ["da", "E", "dato che"], ["dass", "E", "che"], ["ob", "E", "se (dubbio)"], ["obwohl", "E", "anche se"], ["wenn", "E", "se / quando"], ["als", "E", "quando (una volta, passato)"], ["falls", "E", "nel caso in cui"],
  ["damit", "E", "affinché"], ["sodass", "E", "così che"], ["nachdem", "E", "dopo che"], ["bevor", "E", "prima che"], ["während", "E", "mentre"], ["seit", "E", "da quando (+ frase)"], ["bis", "E", "finché"], ["sobald", "E", "appena"], ["solange", "E", "finché, per tutto il tempo che"], ["indem", "E", "facendo (modo)"],
  ["deshalb", "I", "perciò"], ["deswegen", "I", "perciò"], ["darum", "I", "per questo"], ["daher", "I", "per questo"], ["trotzdem", "I", "lo stesso, comunque"], ["dennoch", "I", "tuttavia"], ["sonst", "I", "altrimenti"], ["dann", "I", "poi, allora"], ["danach", "I", "dopo"], ["außerdem", "I", "inoltre"], ["stattdessen", "I", "invece"], ["also", "I", "quindi"], ["allerdings", "I", "però, tuttavia"], ["anschließend", "I", "subito dopo"], ["vorher", "I", "prima"], ["folglich", "I", "di conseguenza"],
  ["um … zu", "Z", "per (+ infinito)"], ["ohne … zu", "Z", "senza (+ infinito)"], ["statt … zu", "Z", "invece di (+ infinito)"]
];
const KONN_TYPES = { "0": ["Tipo 0", "verbo in 2ª posizione, ordine normale"], E: ["Verbo in fondo", "subordinata"], I: ["Inversione", "verbo subito dopo il connettore"], Z: ["zu + infinito", "senza soggetto"] };

// ---- Completa con il connettore (runCloze): {s con {risposta|alternativa}, it, x}
const KONN_EX = {
  causa: [
    { s: "Ich nehme ein Taxi, {weil|da} ich spät dran bin.", it: "Prendo un taxi perché sono in ritardo.", x: "verbo in fondo → weil / da." },
    { s: "Ich nehme ein Taxi, {denn} ich bin spät dran.", it: "Prendo un taxi, perché sono in ritardo.", x: "ordine normale → denn." },
    { s: "Ich bin spät dran, {deshalb|deswegen|darum|daher} nehme ich ein Taxi.", it: "Sono in ritardo, perciò prendo un taxi.", x: "inversione → deshalb, deswegen, darum, daher." },
    { s: "{Weil|Da} sie Vegetarierin ist, isst sie kein Fleisch.", it: "Siccome è vegetariana, non mangia carne.", x: "subordinata prima → weil / da." },
    { s: "Ich kann nicht kommen, ich muss {nämlich} arbeiten.", it: "Non posso venire, devo infatti lavorare.", x: "dopo il verbo → nämlich." },
    { s: "Der Akku war leer, {deshalb|deswegen|darum|daher|also} konnte ich nicht anrufen.", it: "La batteria era scarica, perciò non ho potuto chiamare.", x: "inversione (konnte ich)." },
    { s: "Der Akku war leer, {sodass} ich nicht anrufen konnte.", it: "La batteria era scarica, così non ho potuto chiamare.", x: "conseguenza con verbo in fondo → sodass." },
    { s: "Es war {so} laut, dass ich nichts verstanden habe.", it: "C'era così tanto rumore che non ho capito niente.", x: "so + aggettivo + dass." },
    { s: "– Warum lernst du so viel? – {Weil} ich nächste Woche eine Prüfung habe.", it: "– Perché studi così tanto? – Perché la settimana prossima ho un esame.", x: "risposta a Warum → Weil." },
    { s: "Wir sind zu Hause geblieben, {denn} es hat den ganzen Tag geregnet.", it: "Siamo rimasti a casa, perché ha piovuto tutto il giorno.", x: "ordine normale (es hat) → denn." },
    { s: "Er hat viel trainiert, {deshalb|deswegen|darum|daher|also} hat er das Spiel gewonnen.", it: "Si è allenato molto, perciò ha vinto la partita.", x: "inversione (hat er)." },
    { s: "Der Film war {so} langweilig, dass ich eingeschlafen bin.", it: "Il film era così noioso che mi sono addormentata.", x: "so … dass." }
  ],
  contrasto: [
    { s: "{Obwohl} ich müde bin, gehe ich heute Abend aus.", it: "Anche se sono stanca, stasera esco.", x: "verbo in fondo → obwohl." },
    { s: "Ich bin müde. {Trotzdem|Dennoch} gehe ich heute Abend aus.", it: "Sono stanca. Stasera esco lo stesso.", x: "inversione → trotzdem / dennoch." },
    { s: "Ich bin müde, {aber|doch} ich gehe heute Abend aus.", it: "Sono stanca, ma stasera esco.", x: "ordine normale → aber / doch." },
    { s: "Das ist kein Wein, {sondern} Traubensaft.", it: "Non è vino, ma succo d'uva.", x: "negazione + correzione → sondern." },
    { s: "Ich spiele nicht gut Gitarre, {aber|doch} es macht mir Spaß.", it: "Non suono bene la chitarra, ma mi diverte.", x: "nessuna correzione → aber." },
    { s: "Sie ist nicht in die Stadt gefahren, {sondern} zu Hause geblieben.", it: "Non è andata in città, ma è rimasta a casa.", x: "sostituzione → sondern." },
    { s: "{Während} ich Frühaufsteherin bin, schläft meine Schwester bis Mittag.", it: "Mentre io mi alzo presto, mia sorella dorme fino a mezzogiorno.", x: "contrasto + verbo in fondo → während." },
    { s: "Das Restaurant ist sehr gut. {Allerdings} ist es ziemlich teuer.", it: "Il ristorante è molto buono. Però è piuttosto caro.", x: "inversione + «però» → allerdings." },
    { s: "Er hat die Stelle bekommen, {obwohl} er wenig Erfahrung hat.", it: "Ha ottenuto il posto anche se ha poca esperienza.", x: "verbo in fondo → obwohl." },
    { s: "Es war schon spät, {trotzdem|dennoch} haben wir weitergearbeitet.", it: "Era già tardi, eppure abbiamo continuato a lavorare.", x: "inversione (haben wir)." },
    { s: "Ich wollte ihm helfen, {aber|doch} er wollte keine Hilfe.", it: "Volevo aiutarlo, ma lui non voleva aiuto.", x: "ordine normale (er wollte)." },
    { s: "Er wollte nicht lernen. {Stattdessen} hat er Videospiele gespielt.", it: "Non voleva studiare. Invece ha giocato ai videogiochi.", x: "«invece» + inversione → stattdessen." }
  ],
  tempo: [
    { s: "{Als} ich klein war, wollte ich Ärztin werden.", it: "Quando ero piccola volevo diventare medico.", x: "una volta nel passato → als." },
    { s: "{Wenn} ich nach Hause komme, koche ich zuerst einen Tee.", it: "Quando torno a casa, per prima cosa mi faccio un tè.", x: "presente / ogni volta → wenn." },
    { s: "Jedes Mal, {wenn} ich ihn sehe, lacht er.", it: "Ogni volta che lo vedo, ride.", x: "ogni volta → wenn." },
    { s: "{Nachdem} ich die Prüfung bestanden hatte, habe ich gefeiert.", it: "Dopo aver passato l'esame, ho festeggiato.", x: "azione già conclusa (Plusquamperfekt) → nachdem." },
    { s: "{Bevor} wir losfahren, tanken wir noch.", it: "Prima di partire, facciamo benzina.", x: "prima di → bevor." },
    { s: "{Während} ich telefoniere, kann ich nicht kochen.", it: "Mentre telefono non riesco a cucinare.", x: "contemporaneo → während." },
    { s: "{Seit|Seitdem} er in Rente ist, reist er viel.", it: "Da quando è in pensione viaggia molto.", x: "da quando → seit / seitdem." },
    { s: "Ich bleibe hier, {bis} der Regen aufhört.", it: "Resto qui finché non smette di piovere.", x: "finché → bis." },
    { s: "{Sobald} ich zu Hause bin, schicke ich dir die Fotos.", it: "Appena sono a casa, ti mando le foto.", x: "appena → sobald." },
    { s: "Zuerst putze ich die Küche, {danach|dann|anschließend} gehe ich einkaufen.", it: "Prima pulisco la cucina, dopo vado a fare la spesa.", x: "inversione → danach / dann / anschließend." },
    { s: "Ich gehe joggen. {Vorher|Davor|Zuvor} trinke ich ein Glas Wasser.", it: "Vado a correre. Prima bevo un bicchiere d'acqua.", x: "avverbio + inversione → vorher." },
    { s: "{Solange} du Fieber hast, solltest du im Bett bleiben.", it: "Finché hai la febbre dovresti restare a letto.", x: "per tutto il tempo che → solange." }
  ],
  scopo: [
    { s: "Ich gehe in die Bibliothek, {um} in Ruhe {zu} lernen.", it: "Vado in biblioteca per studiare in pace.", x: "stesso soggetto → um … zu." },
    { s: "Ich erkläre es dir noch einmal, {damit} du es verstehst.", it: "Te lo spiego un'altra volta perché tu lo capisca.", x: "soggetti diversi → damit." },
    { s: "Sie macht einen Kurs, {um} ihr Deutsch {zu} verbessern.", it: "Fa un corso per migliorare il suo tedesco.", x: "stesso soggetto → um … zu." },
    { s: "Wir flüstern, {damit} das Baby nicht aufwacht.", it: "Sussurriamo perché il bambino non si svegli.", x: "soggetti diversi → damit." },
    { s: "Ich stelle den Wecker, {um} nicht {zu} verschlafen.", it: "Metto la sveglia per non dormire troppo.", x: "stesso soggetto → um … zu." },
    { s: "Er hat das Zimmer verlassen, {ohne} das Licht aus{zu}machen.", it: "È uscito dalla stanza senza spegnere la luce.", x: "senza + infinito → ohne … zu (separabile: auszumachen)." },
    { s: "{Statt|Anstatt} mir {zu} helfen, hat er nur zugeschaut.", it: "Invece di aiutarmi, è stato solo a guardare.", x: "invece di → (an)statt … zu." },
    { s: "Man spart Energie, {indem} man das Licht ausmacht.", it: "Si risparmia energia spegnendo la luce.", x: "modo (facendo) → indem." },
    { s: "Ich rufe dich an, {damit} wir den Termin besprechen können.", it: "Ti chiamo così possiamo discutere l'appuntamento.", x: "soggetti diversi (ich / wir) → damit." },
    { s: "Sie ist nach Berlin gezogen, {um} dort {zu} studieren.", it: "Si è trasferita a Berlino per studiare lì.", x: "stesso soggetto → um … zu." },
    { s: "Er ist gegangen, {ohne} dass ich es gemerkt habe.", it: "Se n'è andato senza che me ne accorgessi.", x: "soggetti diversi → ohne dass." },
    { s: "Du kannst dein Deutsch verbessern, {indem} du jeden Tag Nachrichten hörst.", it: "Puoi migliorare il tuo tedesco ascoltando ogni giorno il notiziario.", x: "modo → indem." }
  ],
  frasi: [
    { s: "Ich hoffe, {dass} du bald wieder gesund bist.", it: "Spero che tu guarisca presto.", x: "«che» → dass." },
    { s: "Weißt du, {ob} Anna heute kommt?", it: "Sai se Anna viene oggi?", x: "sì o no? → ob." },
    { s: "{Wenn|Falls} es morgen schön ist, gehen wir wandern.", it: "Se domani è bello, andiamo a fare un'escursione.", x: "condizione → wenn (o falls)." },
    { s: "Ich weiß nicht, {wann} der Kurs anfängt.", it: "Non so quando comincia il corso.", x: "domanda «quando?» → wann." },
    { s: "Kannst du mir sagen, {wie} spät es ist?", it: "Mi sai dire che ore sono?", x: "domanda indiretta → wie." },
    { s: "Er hat mich gefragt, {ob} ich Lust auf Kino habe.", it: "Mi ha chiesto se avevo voglia di andare al cinema.", x: "domanda sì/no indiretta → ob." },
    { s: "Es ist wichtig, {dass} du pünktlich bist.", it: "È importante che tu sia puntuale.", x: "«che» → dass." },
    { s: "Das Kleid, {das} ich gestern gekauft habe, ist blau.", it: "Il vestito che ho comprato ieri è blu.", x: "relativo riferito a das Kleid → das." },
    { s: "{Falls|Wenn} du mich brauchst, ruf einfach an.", it: "Se hai bisogno di me, chiama e basta.", x: "condizione → falls / wenn." },
    { s: "Ich frage mich, {warum} er nicht geantwortet hat.", it: "Mi chiedo perché non abbia risposto.", x: "domanda indiretta → warum." },
    { s: "Zieh eine Jacke an, {sonst} erkältest du dich.", it: "Mettiti una giacca, altrimenti ti raffreddi.", x: "altrimenti + inversione → sonst." },
    { s: "Ich bin nicht sicher, {ob} das die richtige Adresse ist.", it: "Non sono sicura che sia l'indirizzo giusto.", x: "dubbio → ob." }
  ],
  doppi: [
    { s: "Ich habe {weder} Hunger {noch} Durst.", it: "Non ho né fame né sete.", x: "né … né → weder … noch." },
    { s: "Wir können {entweder} heute {oder} morgen fahren.", it: "Possiamo partire o oggi o domani.", x: "o … o → entweder … oder." },
    { s: "Er spielt {sowohl} Klavier {als} auch Gitarre.", it: "Suona sia il pianoforte sia la chitarra.", x: "sia … sia → sowohl … als auch." },
    { s: "Sie ist {nicht} nur schön, {sondern} auch klug.", it: "Non è solo bella, ma anche intelligente.", x: "nicht nur … sondern auch." },
    { s: "Das Handy ist {zwar} teuer, {aber} sehr gut.", it: "Il cellulare è caro, è vero, ma molto buono.", x: "zwar … aber." },
    { s: "{Je} früher wir losfahren, {desto|umso} weniger Verkehr gibt es.", it: "Prima partiamo, meno traffico c'è.", x: "je … desto / umso." },
    { s: "{Einerseits} ist die Stadt schön, {andererseits} ist sie sehr teuer.", it: "Da un lato la città è bella, dall'altro è molto cara.", x: "einerseits … andererseits." },
    { s: "Mein Opa kann {weder} lesen {noch} schreiben.", it: "Mio nonno non sa né leggere né scrivere.", x: "weder … noch (senza nicht)." },
    { s: "{Entweder} du hilfst mir {oder} ich mache es allein.", it: "O mi aiuti o lo faccio da sola.", x: "entweder … oder." },
    { s: "{Je} mehr Sport ich mache, {desto|umso} besser fühle ich mich.", it: "Più sport faccio, meglio mi sento.", x: "je (verbo in fondo) … desto (inversione)." },
    { s: "Das Buch war {sowohl} spannend {als} auch lehrreich.", it: "Il libro era sia avvincente sia istruttivo.", x: "sowohl … als auch." },
    { s: "Ich habe {zwar} wenig Zeit, {aber} ich helfe dir gern.", it: "Ho poco tempo, è vero, ma ti aiuto volentieri.", x: "zwar … aber." }
  ]
};
const KONN_SETS = [["causa", "Causa e conseguenza", "weil, denn, deshalb, sodass", "#0071e3"], ["contrasto", "Contrasto", "obwohl, trotzdem, aber, sondern", "#e8590c"], ["tempo", "Tempo", "als, wenn, nachdem, bevor, seit, bis", "#30b06a"], ["scopo", "Scopo e modo", "damit, um … zu, ohne … zu, indem", "#bf5af2"], ["frasi", "dass, ob, wenn e domande indirette", "dass, ob, wann, warum, falls", "#0d9488"], ["doppi", "Connettori doppi", "weder … noch, je … desto…", "#ff375f"]];

// ---- Motore a scelta multipla con spiegazione e riepilogo errori
function konnRun(title, qs, again, render) {
  let i = 0, score = 0; const wrong = [];
  const draw = () => {
    if (i >= qs.length) {
      const pct = Math.round(score / qs.length * 100), xp = score * 3; addXP(xp);
      view("Risultato", `<div class="card result"><div class="big-num">${pct}%</div><h2 style="margin-top:8px">${pct >= 90 ? "Eccellente" : pct >= 70 ? "Buon lavoro" : "Continua così"}</h2><p class="muted">${score} risposte giuste su ${qs.length} · +${xp} punti</p></div>
        ${wrong.length ? `<div class="card"><h3>Da rivedere</h3>${wrong.map(w => `<div class="vocab"><div><b>${esc(w.full)}</b><br><small class="muted">${esc(w.x)}</small></div>${sayBtn(w.full.replace(/^– /, ""))}</div>`).join("")}</div>` : ""}
        <div class="row"><button class="btn" data-go="${again}">${ic("refresh")} Ancora</button><button class="btn ghost" data-go="connettori">Torna ai connettori</button></div>`, { back: true, nav: "pratica" });
      if (pct >= 90) confetti(); return;
    }
    const q = render(qs[i]);
    view(title, `${stepbar(i, qs.length)}<div class="card"><span class="tag">${esc(q.task)}</span>
      <div class="prompt" style="margin:12px 0 4px;font-size:1.15rem;line-height:1.5">${q.html}</div>${q.it ? `<p class="muted" style="margin:0">${esc(q.it)}</p>` : ""}
      ${q.opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${k + 1}</span><span>${esc(o)}</span></button>`).join("")}
      <div id="fb" class="feedback"></div><div class="row" style="margin-top:12px"><button class="btn" id="nx" hidden>Avanti</button><span class="spacer"></span><span class="tag"><span class="kbd">1-${q.opts.length}</span> rispondi · <span class="kbd">Invio</span> avanti</span></div></div>`, { back: true, crumb: "Connettori", nav: "pratica" });
    let done = false;
    const next = () => { if (done) { i++; draw(); } };
    const answer = k => {
      if (done) return; done = true;
      const ok = k === q.a; if (ok) score++; else wrong.push({ full: q.full, x: q.x });
      $app.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("ok"); else if (+x.dataset.k === k) x.classList.add("bad"); });
      const fb = $("fb"); fb.className = "feedback " + (ok ? "ok" : "bad"); fb.innerHTML = `${ok ? pick(PRAISE) : "Non proprio."} <span class="muted">${esc(q.full)}<br>${esc(q.x)}</span>`;
      if (q.say !== false) speak(q.full.replace(/^– /, "").replace(/ – /g, ". "));
      const nx = $("nx"); nx.hidden = false; nx.onclick = next; nx.focus();
    };
    $app.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.k));
    const kh = e => { if (!done && /^[1-9]$/.test(e.key) && +e.key <= q.opts.length) answer(+e.key - 1); else if (done && e.key === "Enter") { e.preventDefault(); next(); } };
    document.addEventListener("keydown", kh); cleanup.push(() => document.removeEventListener("keydown", kh));
  };
  draw();
}
const konnMCItem = q => {
  const right = q.s.match(/\{([^}]+)\}/)[1], opts = shuffle([right, ...q.o]);
  return { task: "QUALE CONNETTORE?", html: esc(q.s).replace(/\{[^}]+\}/, '<b style="color:var(--primary)">_____</b>'), it: q.it, opts, a: opts.indexOf(right), full: q.s.replace(/[{}]/g, ""), x: q.x };
};
const konnJoinItem = j => {
  const opts = shuffle([j[1], j[2], j[3]]);
  return { task: "QUAL È LA FRASE GIUSTA?", html: `Connettore: <b style="color:var(--primary)">${esc(j[0])}</b>`, it: j[4], opts, a: opts.indexOf(j[1]), full: j[1], x: j[5] };
};
const konnTypeItem = t => {
  const keys = ["0", "E", "I", "Z"];
  return { task: "DOVE VA IL VERBO DOPO QUESTO CONNETTORE?", html: `<span style="font-size:1.6rem;font-weight:700">${esc(t[0])}</span> <span class="muted" style="font-size:1rem">(${esc(t[2])})</span>`, opts: keys.map(k => `${KONN_TYPES[k][0]}: ${KONN_TYPES[k][1]}`), a: keys.indexOf(t[1]), full: t[0], say: true,
    x: { "0": "Tipo 0 (ADUSO): …, " + t[0] + " ich habe Zeit.", E: "Subordinata: …, " + t[0] + " ich Zeit habe.", I: "Inversione: …, " + t[0] + " habe ich Zeit.", Z: "Niente soggetto: …, " + t[0].replace(" … zu", "") + " … zu + infinito." }[t[1]] };
};

function konnHub(a) {
  if (a === "scegli") return konnRun("Quale connettore?", shuffle(KONN_MC).slice(0, 15), "connettori/scegli", konnMCItem);
  if (a === "collega") return konnRun("Collega le frasi", shuffle(KONN_JOIN).slice(0, 12), "connettori/collega", konnJoinItem);
  if (a === "tipo") return konnRun("Dove va il verbo?", shuffle(KONN_TYPE).slice(0, 15), "connettori/tipo", konnTypeItem);
  if (a === "test") return runCloze("Test sui connettori", shuffle(Object.values(KONN_EX).flatMap(l => shuffle(l).slice(0, 4))).slice(0, 20), { again: "connettori/test", crumb: "Connettori", back: "connettori", task: "SCRIVI IL CONNETTORE" });
  if (KONN_EX[a]) { const s = KONN_SETS.find(x => x[0] === a); return runCloze(s[1], shuffle(KONN_EX[a]), { again: "connettori/" + a, crumb: "Connettori", back: "connettori", task: "SCRIVI IL CONNETTORE" }); }
  const open = a && KONN_THEORY.some(t => t.id === a) ? a : null;
  view("Connettori", `
    <div class="card"><div class="row"><span class="chip lg" style="--c:#0d9488">${ic("puzzle")}</span><div style="flex:1"><h2 style="margin:0">Connettori: quale usare e dove va il verbo</h2>
      <small class="muted">weil o denn? obwohl o trotzdem? wenn, als o ob? La mappa, 9 schede e ${KONN_MC.length + KONN_JOIN.length + Object.values(KONN_EX).flat().length} esercizi.</small></div></div></div>
    <div class="card"><h3>La mappa: stesso significato, tre costruzioni</h3><div class="theory">${KONN_MAP}</div></div>
    <div class="sec"><h3>Le regole</h3></div>
    ${KONN_THEORY.map(t => `<details class="card acc" ${open === t.id ? "open" : ""}><summary><h3 style="margin:0">${esc(t.t)}</h3>${ic("right")}</summary><div class="theory" style="margin-top:12px">${t.h}</div></details>`).join("")}
    <div class="card"><h3>In sintesi: come scelgo?</h3><div class="theory"><ol style="margin:0;padding-left:20px">
      <li><b>Che cosa voglio dire?</b> Causa, contrasto, tempo, scopo… → trovo la riga nella mappa.</li>
      <li><b>Dove sta il verbo nella frase che segue?</b> Normale → tipo 0 (ADUSO). In fondo → subordinante. Subito dopo il connettore → avverbio.</li>
      <li>Quando sono io a scrivere: scelgo il connettore e poi metto il verbo al posto giusto. Nel Goethe B1/B2 usare connettori diversi (non solo <i>und</i> e <i>aber</i>) fa salire il punteggio.</li></ol></div></div>
    <div class="sec"><h3>Esercitati</h3></div>
    <div class="mods">
      ${mod("connettori/scegli", "checksq", "Quale connettore?", `Scegli tra 4 · ${KONN_MC.length} frasi`, "#ff375f")}
      ${mod("connettori/collega", "layers", "Collega le frasi", "Qual è l'ordine giusto del verbo?", "#5e5ce6")}
      ${mod("connettori/tipo", "target", "Dove va il verbo?", `${KONN_TYPE.length} connettori: tipo 0, fondo o inversione`, "#b8860b")}
      ${KONN_SETS.map(s => mod("connettori/" + s[0], "pen", s[1], s[2], s[3])).join("")}
      ${mod("connettori/test", "grad", "Test misto", "20 frasi da completare", "#0071e3")}
    </div>`, { back: true, crumb: "Esercizi", nav: "pratica" });
}
