# Deutsch mit Bea – Architettura e piano

Per **Bea, 25 anni, livello B1 → B2** (obiettivo: Goethe-Zertifikat B1 e B2).

## Piattaforma: PWA (web app installabile), non .exe
- Un'unica app per Windows (Edge/Chrome → "Installa app") e iPhone/iPad (Safari → Condividi → "Aggiungi a Home").
- Voce tedesca: sintesi vocale del sistema. Microfono: Web Speech API (Edge/Chrome, Safari iOS).
- Progressi salvati sul dispositivo. Funziona offline, tranne le funzioni IA.
- Per microfono e installazione serve un hosting HTTPS (GitHub Pages, gratis).

## Intelligenza artificiale: Google Gemini (piano gratuito)
- Chiave gratuita: https://aistudio.google.com/apikey → incollarla in "Tutor IA".
- `gemini-3.5-flash-lite` (circa 500 richieste al giorno) per conversazione ed esercizi.
- `gemini-3.8-flash` (circa 20 al giorno) solo per valutare i testi scritti; se la quota finisce, si passa in automatico al modello lite.
- Sul piano gratuito Google può usare i dati per migliorare i modelli. La chiave resta solo sul dispositivo.

## Cosa contiene (v3)
| Modulo | Contenuto |
|---|---|
| Lezioni B1 (6) | Perfekt/Präteritum, frasi secondarie, Akk/Dat e Wechselpräpositionen, verbi separabili/riflessivi, comparativi, vita quotidiana e uffici |
| Lezioni B2 (16) | Konjunktiv II, Passiv, Konnektoren, Redemittel per discutere, presentazione, e-mail formale, Nomen-Verb-Verbindungen, verbi con preposizione, relative, declinazione aggettivi, Konjunktiv I, nominalizzazione, participi, preposizioni col genitivo, infinitive e modali soggettivi, espressioni idiomatiche |
| Vocabolario | Flashcard con voce e ripasso a intervalli, test, gioco delle coppie, dettato, pronuncia col microfono, mazzo personale |
| Ascolto | Frasi B2 in stile giornalistico, ascolto lento |
| Dialoghi guidati | Colloquio di lavoro, discussione d'esame, reclamo telefonico (registro formale "Sie") |
| Tutor IA "Frau Dr. Keller" | Conversazione a voce, presentazione d'esame, discussione d'esame, correzione dei testi; ogni errore viene spiegato in italiano e salvato |
| Allenamento IA | Lesen, Hören, grammatica (18 argomenti), Schreiben con voto, vocabolario per tema (14 temi), ripasso dei propri errori: esercizi sempre nuovi |
| Simulazione d'esame | Lesen, Hören (testo ascoltabile solo 2 volte), Schreiben con voto secondo i criteri Goethe, storico dei risultati |
| Motivazione | XP, giorni consecutivi, obiettivo giornaliero, livelli, citazioni, lodi a voce |

## Prossime fasi
1. **Pubblicazione** su GitHub Pages: serve un repository.
2. **Sprechen con voto**: valutazione automatica della presentazione orale (trascrizione + criteri Goethe).
3. **Voce più naturale** con Gemini TTS (anche dialoghi a più voci per l'Hören).
4. **Programma di studio**: piano settimanale fino alla data dell'esame, promemoria, report dei progressi.
5. **Contenuti**: Lesen e Hören in tutte le parti dell'esame (Teil 1–5), banca di 2000+ parole B1/B2.
6. **Sincronizzazione** tra PC e iPhone (backup dei progressi).
