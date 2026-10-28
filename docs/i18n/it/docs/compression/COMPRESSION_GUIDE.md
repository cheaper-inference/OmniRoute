# 🗜️ Prompt Compression Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Risparmia automaticamente il 15-95% sul contesto idoneo. Per una rapida panoramica, consulta la [sezione sulla compressione del README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Panoramica

OmniRoute implementa una pipeline modulare di compressione dei prompt che viene eseguita **proattivamente** prima che le richieste raggiungano i provider upstream. Ciò significa che il risparmio di token avviene in modo trasparente, senza richiedere modifiche al flusso di lavoro.

```
Richiesta del client
  → Selettore della strategia di compressione
    → Override della combinazione? → Usa l'impostazione della combinazione
    → Soglia di attivazione automatica? → Usa la modalità automatica
    → Modalità predefinita? → Usa l'impostazione globale
    → Disattivata? → Salta la compressione
  → Modalità di compressione selezionata
    → Disattivata: nessuna compressione
    → Leggera: pulizia sicura di spazi bianchi/formattazione (~15%)
    → Standard: rimozione delle parole superflue in stile telegrafico (~30%)
    → Aggressiva: invecchiamento della cronologia + riepilogo (~50%)
    → Ultra: sfoltimento euristico + riduzione dei blocchi di codice (~75%)
    → RTK: filtraggio sensibile ai comandi dell'output del terminale/degli strumenti (intervallo upstream del 60-90%)
    → Combinata: pipeline multi-engine ordinata, solitamente RTK seguito da Caveman (intervallo idoneo del 78-95%)
  → Richiesta compressa → Provider
```

---

## Modalità di compressione

### Off

Nessuna compressione applicata. Tutti i messaggi passano invariati.

### Modalità Lite (~15% di risparmio, latenza <1ms)

La modalità più sicura — zero modifiche semantiche, solo pulizia della formattazione:

| Tecnica                  | Descrizione                                       |
| ------------------------ | ------------------------------------------------- |
| `collapseWhitespace`     | Unisce righe vuote consecutive e spazi finali     |
| `dedupSystemPrompt`      | Rimuove i messaggi di sistema duplicati           |
| `compressToolResults`    | Comprime gli output verbosi di strumenti/funzioni |
| `removeRedundantContent` | Elimina le istruzioni ripetute                    |
| `replaceImageUrls`       | Accorcia i data URI delle immagini base64         |

**Ideale per:** Uso sempre attivo, flussi di lavoro critici per la sicurezza.

### Modalità Standard (~30% di risparmio)

Ispirata a [Caveman](https://github.com/JuliusBrussee/caveman) — rimuove le parole di riempimento e le formulazioni verbose preservando il significato:

- Rimuove le parole di riempimento ("please", "I think", "basically", "actually")
- Condensa le frasi verbose ("in order to" → "to", "as a result of" → "because")
- Elimina le cautele cortesi ("Would you mind...", "If you could possibly...")
- Oltre 30 regole regex ottimizzate per i prompt di programmazione

**Ideale per:** Flussi di lavoro di sviluppo quotidiani, team attenti ai costi.

### Modalità Aggressive (~50% di risparmio)

Gestione intelligente della cronologia per sessioni lunghe:

- **Invecchiamento dei messaggi** — i messaggi più vecchi vengono compressi progressivamente
- **Compressione dei risultati degli strumenti** — gli output lunghi degli strumenti vengono troncati o elisi (prime/ultime righe,
  filtraggio delle righe corrispondenti, compattazione delle chiavi JSON)
- **Guardie di integrità strutturale** — garantisce che le coppie `tool_use` + `tool_result` restino coerenti
- **Consapevolezza della finestra di contesto** — rispetta i limiti di token di ciascun modello

**Ideale per:** Sessioni di debug prolungate, codebase di grandi dimensioni.

### Modalità Ultra (~75% di risparmio)

Compressione massima per scenari critici in termini di token:

- **Potatura euristica** — potatura dei token della prosa basata su punteggio
- **Preservazione della struttura** — i blocchi di codice delimitati, il codice inline, gli URL e gli identificatori
  vengono marcati con tombstone e ricuciti alla lettera, mai potati
- **Livello SLM opzionale** — un piccolo modello locale può perfezionare la potatura, se configurato
- Indipendente dalla modalità Aggressive: non esegue l'invecchiamento dei messaggi, la compressione dei risultati degli strumenti
  né il riassuntore di fallback (solo un fallimento del livello SLM può instradare un passaggio di fallback
  attraverso aggressive)

**Ideale per:** Quando raggiungi ripetutamente i limiti di contesto.

### Modalità RTK (intervallo upstream del 60-90%)

La modalità RTK è ottimizzata per gli output verbosi degli strumenti che compaiono nelle sessioni degli agent di codifica:

- Rileva classi di comando/output come `git status`, `git diff`, `git log`, test runner,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/install, log Docker, output
  infrastrutturale e output generico della shell
- Applica pacchetti di filtri JSON da `open-sse/services/compression/engines/rtk/filters/`
- Importa i filtri dello schema RTK TOML v1 da file `filters.toml` di progetto o globali, con validazione
  tramite test inline e trust-gating per i file di progetto
- Include 56 filtri integrati con campioni di verifica inline
- Rimuove sequenze di controllo ANSI, barre di avanzamento, righe ripetute e rumore non azionabile
- Preserva fallimenti, errori, avvisi, file modificati, riepiloghi e la coda degli output lunghi
- Supporta filtri di progetto con trust-gating, filtri globali e recupero opzionale dell'output grezzo con redazione

**Ideale per:** Sessioni di agent con trascrizioni di shell, build, test, git, grep e output di file.

### Modalità Stacked (intervallo idoneo del 78-95%)

La modalità Stacked esegue più motori di compressione in un ordine deterministico. La pipeline predefinita è:

```txt
RTK -> Caveman
```

Questo ordine mantiene prima compatto l'output del terminale/degli strumenti, poi applica la condensazione
semantica di Caveman al prompt in linguaggio naturale rimanente. Le pipeline Stacked possono essere configurate
globalmente o tramite combinazioni di compressione assegnate alle combinazioni di routing.

**Ideale per:** Contesti misti con ampi log degli strumenti più istruzioni umane o riepiloghi dell'assistente.

---

## Calcolo dei risparmi upstream

OmniRoute documenta i risparmi ottenuti dalla compressione sulla base di due fonti: i benchmark dei progetti upstream e
la composizione dei motori di OmniRoute.

| Fonte   | Valore del README upstream utilizzato qui                                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` di token di output in meno, `65%` di risparmio medio sull'output nei benchmark, intervallo `22-87%` e strumento di compressione dell'input del `~46%` |
| RTK     | Risparmio del `60-90%` sull'output dei comandi; sessione di esempio da `~118,000 -> ~23,900` token, ovvero `79.7%` risparmiato (`~80%`)                      |

Per i payload di strumenti/contesto sovrapposti, la combinazione predefinita di OmniRoute applica i motori in sequenza:

```txt
RTK -> Caveman
```

I risparmi combinati sono moltiplicativi, non additivi:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Il valore `78-95%` si applica quando sia RTK sia Caveman possono ridurre lo stesso payload di input/contesto.
La modalità di output delle risposte di Caveman è separata: quando è abilitata, utilizza i risparmi sull'output propri di Caveman (`65%`
in media, `~75%` come valore principale, intervallo `22-87%`). I risparmi totali sui costi dipendono dalla proporzione tra prompt e output.

### Cosa significa realmente "idoneo"

L'intervallo principale del 15-95% è reale, ma si applica soltanto ai contenuti **ridondanti o prolissi**: righe di errore
ripetute, un log di compilazione che ripete continuamente lo stesso avviso, un dump sovradimensionato prodotto da `grep` o dalla lettura di un file. **Non**
significa che ogni richiesta consenta un tale risparmio.

Verificato empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): un'esecuzione
`stacked` (RTK + Caveman) su un blocco `tool_result` in formato Anthropic contenente 300 righe di errore
identiche ha prodotto **un risparmio del 95.93% sui token / del 96.26% sui caratteri**, perfettamente all'interno dell'intervallo
pubblicizzato. Tuttavia, la stessa pipeline eseguita sull'output normale e non ridondante di uno strumento (un elenco pulito di corrispondenze di `grep`,
una breve lettura di un file, normale testo conversazionale) produce correttamente **risparmi prossimi allo zero**, perché
non c'è nulla di ripetitivo da rimuovere e `validateCompression()` (`validation.ts`) impedisce l'invio di una
riscrittura che eliminerebbe o altererebbe blocchi di codice, URL, intestazioni, versioni o identificatori di costanti TUTTI IN MAIUSCOLO.

Questo è il comportamento sicuro e previsto, non un bug: una sessione di programmazione che si limita principalmente a leggere o cercare con `grep` in file puliti
registrerà risparmi totali modesti anche con la compressione completamente abilitata, mentre una sessione che incontra un ciclo di errori
o un linter molto prolisso vedrà l'intero intervallo del 78-95% applicato a quel traffico. Non utilizzare la bassa percentuale
di risparmio aggregata di una singola sessione come prova del fatto che la compressione sia configurata in modo errato: verifica prima se
l'output sottostante dello strumento fosse effettivamente ridondante.

---

## Visualizzazione del risparmio di token

```
Senza compressione: 47K token inviati all'LLM
Con Lite:           40K token inviati          (15% risparmiato — sicuro, sempre attivo)
Con Standard:       33K token inviati          (30% risparmiato — regole caveman-speak)
Con Aggressive:     24K token inviati          (50% risparmiato — obsolescenza + riepilogo)
Con Ultra:          12K token inviati          (75% risparmiato — eliminazione euristica)
Con RTK:            19K-5K token inviati       (60-90% risparmiato sull'output di comandi/strumenti)
Con Stacked:        10K-2.5K token inviati     (intervallo idoneo RTK+Caveman del 78-95%)
```

---

## Configurazione

### Dashboard

Vai a `Dashboard → Contesto e cache`:

- **Caveman** — selezione della modalità, pacchetti lingua, anteprima e impostazioni predefinite globali
- **RTK** — anteprima dei filtri dei comandi, impostazioni di sicurezza RTK e catalogo dei filtri
- **Combinazioni di compressione** — pipeline di motori denominate assegnate alle combinazioni di instradamento
- **Soglia di attivazione automatica** — attiva automaticamente la compressione quando il numero di token supera la soglia

### Sostituzione per combinazione

In `Dashboard → Contesto e cache → Combinazioni di compressione`, assegna una combinazione di compressione a una combinazione di instradamento:

```txt
Combinazione: "free-tier-fallback"
  Combinazione di compressione: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Destinazioni:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ciò consente di utilizzare la compressione concatenata con i provider gratuiti/per la programmazione, mantenendo al contempo la modalità lite per gli abbonamenti a pagamento.

Questa assegnazione di "Sostituzione per combinazione" è un controllo diverso dalla sostituzione della **modalità di compressione della combinazione di instradamento** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — lo schema del campo accetta anche `rtk`, `stacked` e `omniglyph`) — tale sostituzione non seleziona una pipeline di combinazione di compressione denominata; imposta semplicemente il campo `compressionMode` consultato da `resolveCompressionPlan`. Può essere configurata nella scheda della combinazione (`Dashboard → Combinazioni`) oppure, a partire dalla versione #6760, per ogni combinazione di instradamento nell'elenco "Assegna all'instradamento" in `Dashboard → Contesto e cache → Combinazioni di compressione`, proprio accanto alla casella di controllo per l'assegnazione della pipeline documentata sopra. Entrambe le interfacce salvano le modifiche tramite lo stesso endpoint `PUT /api/combos/{id}`.

### Sostituzione per richiesta

Invia l'header di richiesta `x-omniroute-compression` per sostituire il piano di compressione per una singola richiesta. Ha la precedenza più alta: prevale sulla sostituzione della combinazione di instradamento, sul profilo attivo, sull'attivazione automatica e sull'impostazione Default del pannello. I valori sconosciuti vengono ignorati (la richiesta non viene mai rifiutata) e l'interruttore generale globale continua a controllare tutto: quando la compressione è disattivata globalmente, l'header non può attivarla. Valori:

| Valore        | Effetto                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Nessuna compressione per questa richiesta.                                                                                     |
| `default`     | Il profilo Default derivato dal pannello (ignora il profilo attivo). I motori con perdita restano disattivati.                 |
| `safe`        | Equivale a omettere l'header: solo deduplicazione e compattazione degli spazi.                                                 |
| `allow-lossy` | Mantiene il piano dell'operatore per questa richiesta, inclusi riepiloghi, filtri di pertinenza e riscritture stilistiche.     |
| `engine:<id>` | Un singolo motore, se abilitato, ad esempio `engine:rtk`. Rappresenta l'adesione esplicita a quel motore per questa richiesta. |
| `<combo>`     | Una combinazione denominata, cercata prima per nome (senza distinzione tra maiuscole e minuscole), poi per ID.                 |

Senza `allow-lossy`, `engine:<id>` o una combinazione denominata, i motori con perdita non vengono applicati. Se la compressione è attiva, alla richiesta vengono comunque applicate la deduplicazione della sessione e la compattazione degli spazi.

Il piano applicato viene restituito nell'header di risposta `X-OmniRoute-Compression: <mode>; source=<source>`, dove `<source>` può essere `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` oppure `off`.

### API

```bash
# Ottieni le impostazioni di compressione
curl http://localhost:20128/api/settings/compression

# Aggiorna le impostazioni di compressione
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Visualizza l'anteprima di un payload RTK/stacked specifico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Elenca i pacchetti di filtri RTK
curl http://localhost:20128/api/context/rtk/filters

# Testa direttamente RTK con metadati facoltativi del comando
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Cosa viene protetto

Il motore di compressione **preserva sempre:**

- ✅ Blocchi di codice (delimitati e inline)
- ✅ URL e percorsi dei file
- ✅ Strutture JSON e dati strutturati
- ✅ Identificatori e token tecnici protetti
- ✅ Espressioni matematiche
- ✅ Definizioni di chiamate a strumenti/funzioni
- ✅ Prompt di sistema (in modalità lite)

Il recupero dell'output grezzo di RTK oscura le comuni chiavi API, i bearer token, i token Slack, le chiavi di accesso AWS,
le password, i token e i segreti prima che qualsiasi elemento venga salvato.

---

## Statistiche di compressione

Ogni richiesta compressa include statistiche nei log del server:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Roadmap delle fasi

| Fase    | Modalità                                                                                                                                                                | Stato         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Fase 1  | Off, Lite                                                                                                                                                               | ✅ Rilasciata |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                             | ✅ Rilasciata |
| Fase 3  | RTK, Stacked, Combinazioni di compressione                                                                                                                              | ✅ Rilasciata |
| Fase 4  | Stili di output, Ultra di livello SLM, infrastruttura di valutazione                                                                                                    | ✅ Rilasciata |
| Fase 4C | Budget di contesto adattivo ("manopola") — motore di calcolo + API (`contextBudget` su `PUT /api/settings/compression`) + controlli di modalità/criteri nella dashboard | ✅ Rilasciata |

---

## Ringraziamenti

Le regole di compressione della modalità Standard si ispirano a **[Caveman](https://github.com/JuliusBrussee/caveman)** di **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ oltre 51.000) — il progetto virale "perché usare molti token quando pochi token bastano". Caveman dichiara `~75%` di token di output in meno, un risparmio medio sui token di output nei benchmark del `65%`, un intervallo di risparmio sull'output del `22-87%` e uno strumento di compressione dell'input del `~46%`.

La modalità RTK si ispira a **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** di **[RTK AI](https://github.com/rtk-ai)** — il progetto ad alte prestazioni per la compressione dell'output dei comandi destinato al filtraggio dell'output di terminale, compilazione, test, git e strumenti. RTK dichiara risparmi del `60-90%`, con una sessione di esempio nel relativo README che mostra un risparmio del `~80%`.

---

## Sistemi di compressione avanzati

Oltre alle 7 modalità descritte sopra (il codice sorgente accetta anche le modalità `codex-responses` e
`omniglyph`, che questa guida non tratta), le sezioni seguenti illustrano le funzionalità
che operano all'interno o insieme a tali modalità: la compressione dei risultati degli strumenti e l'invecchiamento progressivo
sono i passaggi 1 e 2 del motore aggressivo (modalità Aggressive e passaggio `aggressive` di una
pipeline concatenata), la pipeline concatenata è il modo in cui viene eseguita la modalità Stacked, la compressione sensibile alla cache
riduce `aggressive` e `ultra` a `standard` per i provider con cache quando la compressione
è attiva, mentre la modalità di output Caveman e gli stili di output sono istruzioni facoltative del prompt di sistema,
disattivate per impostazione predefinita, che modellano l'output del modello anziché comprimere la richiesta.

### Compressione sensibile alla cache

Alcuni provider (come Anthropic con la cache dei prompt) supportano la **cache dei prompt**,
che consente loro di memorizzare nella cache parti del prompt per ridurre costi e latenza. Quando
la cache è abilitata, la compressione aggressiva può effettivamente **peggiorare** le prestazioni
perché modifica i token memorizzati nella cache, invalidandola.

Il modulo `cachingAware.ts` risolve questo problema **rilevando il contesto della cache** e
**adattando di conseguenza la strategia di compressione**.

#### Come funziona

1. **Rilevamento del contesto della cache** — Esamina il corpo della richiesta alla ricerca di marcatori `cache_control`
2. **Identificazione dei provider con cache** — Verifica se il provider di destinazione supporta la cache
3. **Adattamento della strategia** — Riduce `aggressive`/`ultra` a `standard` per i provider con cache
4. **Esclusione del prompt di sistema** — I prompt di sistema vengono solitamente memorizzati nella cache, quindi non vengono compressi

La funzione ausiliaria della strategia restituisce anche un flag `deterministicOnly`, ma il generatore del piano utilizza
soltanto la strategia: attualmente nessun componente a valle legge il flag.

#### Esempio di codice

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcatore della cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quando utilizzarla

La compressione sensibile alla cache è **sempre attiva**: non è necessaria alcuna configurazione. Entra in funzione ogni volta che
la compressione è attiva e il provider di destinazione supporta la cache dei prompt (Anthropic, OpenAI
ecc.); non sono richiesti marcatori `cache_control` espliciti: è sufficiente un provider con cache
per attivare la riduzione, mentre i soli marcatori non lo fanno mai (il rilevamento dei marcatori alimenta la
telemetria della cache, non la decisione sulla strategia).

### Invecchiamento progressivo

Le conversazioni lunghe accumulano molti turni di messaggi, ma quelli più vecchi diventano meno
pertinenti. Il modulo `progressiveAging.ts` **degrada i messaggi in base alla distanza in turni**
(distanza misurata dalla fine della conversazione). Con i valori predefiniti forniti
(`verbatim: 2, light: 2, moderate: 3`):

- **Ultimi 2 turni (distanza ≤ 2)**: Mantenuti integralmente
- **Distanza 3**: Compressione Caveman (rimozione delle parole superflue)
- **Distanza 4+**: I messaggi dell'assistente vengono riepilogati; i messaggi dell'utente vengono ridotti alla prima
  riga, con un limite di 120 caratteri; gli altri ruoli restano invariati. I prompt di sistema, i messaggi
  già sottoposti a invecchiamento e il messaggio più recente dell'utente vengono sempre mantenuti integralmente, indipendentemente dalla distanza.
  Nulla viene eliminato completamente e la fascia `light`
  non è raggiungibile con i valori predefiniti forniti (`light` è uguale a `verbatim`).

#### Esempio di codice

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... altri 50 turni ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ultimi 3 turni: integrali
  light: 8, // distanza <= 8: compressione leggera
  moderate: 20, // distanza <= 20: compressione caveman
  fullSummary: 5, // richiesto dal tipo, non letto dal codice di suddivisione in fasce
  // distanza > 20: riepilogato (assistente) / viene mantenuta la prima riga (utente)
});

// saved = numero di token risparmiati
```

#### Quando utilizzarlo

L'invecchiamento progressivo è **sempre attivo** per la modalità `aggressive`: è il passaggio 2 di
`compressAggressive()`. La modalità Ultra non lo esegue. È
particolarmente efficace per:

- Sessioni di programmazione di lunga durata
- Conversazioni che si estendono su più giorni
- Flussi di lavoro agentici con numerose chiamate agli strumenti

### Modalità di output Caveman

La modalità di output Caveman aggiunge **istruzioni al prompt di sistema** che chiedono al modello stesso di produrre
un output conciso: il livello `lite` richiede risposte concise che mantengano frasi complete, `full`
gli chiede di "rispondere in modo conciso come un cavernicolo intelligente", mentre `ultra` richiede un output telegrafico;
le istruzioni si limitano a richiederlo, senza poterlo garantire. Le richieste le ricevono tramite
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` risolve innanzitutto la selezione tramite il livello di compatibilità con le versioni precedenti
(`resolveOutputStyleSelection()` in
`open-sse/services/compression/outputStyles/backCompat.ts`), che, quando `outputStyles`
è vuoto, associa un `cavemanOutputMode` abilitato allo stile di output `terse-prose` con
`cavemanOutputMode.intensity` (vedere Compatibilità con le versioni precedenti più avanti); una selezione `outputStyles`
non vuota viene utilizzata così com'è, e `cavemanOutputMode.enabled` e `intensity` non hanno quindi alcun
effetto, mentre la relativa opzione `autoClarity` continua ad applicarsi. `outputMode.ts` contiene i
testi delle istruzioni (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), l'esclusione in base al contenuto e la
funzione ausiliaria di posizionamento utilizzata dall'inserimento; il relativo inseritore `applyCavemanOutputMode()` non ha
alcun chiamante in produzione.

#### Come funziona

Questa modalità non comprime l'input. Aggiunge un blocco di istruzioni al prompt di sistema
(vedere Come funziona l'iniezione qui sotto), e qualsiasi modalità di compressione dell'input selezionata per la richiesta
viene comunque eseguita successivamente, sul corpo che ora contiene il blocco. Prima della clausola condivisa
sui limiti con cui termina ogni livello, il livello `full` in inglese recita:

> "Rispondi in modo conciso come cavernicolo intelligente. Ometti articoli (un/uno/una/il/lo/la/i/gli/le), riempitivi (solo/davvero/fondamentalmente/in realtà/semplicemente), convenevoli, attenuazioni. Frammenti OK. Sinonimi brevi (grande, non esteso; correggi, non implementa). Mantieni esatti tutto il contenuto tecnico, il codice, gli errori, gli URL e gli identificatori."

Funziona particolarmente bene per:

- Generazione di codice (output più conciso = meno token)
- Domande e risposte rapide (nessuna necessità di spiegazioni elaborate)
- Elaborazione in batch (massimizza il throughput)

#### Quando usarla

La modalità di output Caveman è **facoltativa**. Con la compressione attiva (`enabled: true`, l'interruttore principale
nella pagina Compression Settings), attivala con `cavemanOutputMode.enabled`; `intensity`
seleziona `lite`, `full` o `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

L'interruttore **Output Mode** di una combinazione di compressione (`outputMode`, con il livello in `outputModeIntensity`)
imposta la stessa opzione per le richieste a cui si applica tale combinazione, mentre lo strumento MCP
`omniroute_set_compression_engine` la configura tramite il proprio argomento booleano `outputMode`.
Una selezione `outputStyles` non vuota ha la precedenza su questo interruttore. Nella
dashboard, l'attivazione dello stile di output **Terse prose** inserisce lo stesso blocco (vedere Output
Styles qui sotto).

### Stili di output (catalogo)

La modalità di output Caveman descritta sopra è il **percorso legacy a stile singolo**. La fase 4 l'ha generalizzata
in un catalogo di stili di output componibili: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Ogni stile è un'istruzione del prompt di sistema
che chiede al modello stesso di produrre un output meno costoso; gli stili possono essere attivati
insieme e vengono inseriti nell'ordine del catalogo.

| Stile                                       | `id`            | Funzione                                                                                                                                                                                                                                                                                                        | Lingue delle istruzioni                               |
| ------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Prosa concisa                               | `terse-prose`   | Elimina riempitivi/articoli/attenuazioni; mantiene esatto il contenuto tecnico. Stesso testo della modalità di output Caveman legacy (citato, non duplicato).                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Meno codice                                 | `less-code`     | Scala YAGNI: la modifica funzionante più piccola, nessuna astrazione non richiesta.                                                                                                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Coda di cavallo (sviluppatore senior pigro) | `ponytail`      | "Il codice migliore è quello mai scritto": riuso > riscrittura, causa principale > sintomo, diff funzionante più breve.                                                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Ho l'ADHD (azione prima di tutto)           | `i-have-adhd`   | Prima l'azione (comando/percorso/snippet prima della prosa), passaggi numerati e limitati, UN prossimo passo concreto, nessun preambolo/riepilogo/formula di chiusura. Adattato da [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Filtro antislop per UI                      | `antislop-ui`   | Ogni tecnica visiva deve superare una verifica dello scopo (gerarchia, identità, leggibilità); niente gradienti/effetti vetro/bagliori predefiniti, palette limitata, niente layout da template. Entrambi gli stili antislop aggiungono un limite che vieta controlli non funzionanti e affermazioni inventate. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Filtro antislop per testi e persone         | `antislop-copy` | Testi specifici (niente lineette em, CTA generiche, parole d'ordine, chiusure da chatbot, fatti inventati), oltre a regole per le persone: contrasto WCAG AA, focus visibile, accessibilità da tastiera, stati vuoto/caricamento/errore, ridisposizione su dispositivi mobili.                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| CJK conciso (文言)                          | `terse-cjk`     | Risposte `full`/`ultra` in cinese classico (文言); `lite` richiede soltanto risposte brevi senza parole funzionali, convenevoli o abbellimenti.                                                                                                                                                                 | zh (vincolato alle impostazioni locali, vedere sotto) |

Ogni stile include tre livelli di intensità — `lite`, `full`, `ultra` — e ogni livello
termina con la clausola condivisa sui limiti (`SHARED_BOUNDARIES` in `outputMode.ts`), che
mantiene esatti i blocchi di codice, i percorsi dei file, i comandi, gli errori e gli URL. I testi dei livelli
`terse-prose` e `terse-cjk` aggiungono gli identificatori a tale elenco.

`terse-cjk` è vincolato alle impostazioni locali `zh` in due punti. La pagina Compression Settings mostra
la relativa riga solo quando la lingua dell'interfaccia della dashboard è il cinese (`zh-CN` o `zh-TW`), e
`applyOutputStyles()` lo inserisce solo quando la lingua risolta della richiesta (vedere Selezione della lingua
qui sotto) è `zh`. Nascondere la riga non cancella una selezione `terse-cjk` salvata:
l'API delle impostazioni accetta qualsiasi id di stile e il salvataggio di altri stili nella pagina la mantiene. Al
momento della richiesta, il controllo della lingua di `applyOutputStyles()` è l'unico vincolo relativo alle impostazioni locali.

#### Come funziona l'iniezione

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) risolve
la selezione rispetto al catalogo (gli id sconosciuti e gli stili non corrispondenti
alla lingua vengono ignorati, senza mai generare un errore; una selezione che non si
risolve in alcuno stile lascia il corpo invariato e viene ignorata come `no_styles`),
concatena le istruzioni selezionate nell'ordine del catalogo,
aggiunge la clausola sui limiti **una sola volta** (più la clausola di sicurezza,
`SAFETY_BOUNDARIES` o la relativa traduzione, quando è selezionato `less-code` o
`ponytail`) e inizia il blocco con un singolo marcatore di idempotenza
(`[OmniRoute Output Styles]`), perciò una nuova applicazione non produce alcun effetto.
Quando la lingua risolta (vedere Selezione della lingua di seguito) dispone di una
traduzione, viene inserita l'istruzione localizzata anziché quella inglese.

In un corpo con un array `messages` non vuoto, il controllo di idempotenza viene
eseguito prima del bypass basato sul contenuto: quando il marcatore
`[OmniRoute Output Styles]` è già presente nel campo `system` di primo livello
(una stringa o un array di blocchi di contenuto) oppure in un messaggio di sistema con
contenuto stringa, il corpo viene lasciato invariato come `already_applied` e non viene
eseguito alcun controllo delle parole chiave. In caso contrario, un bypass basato sul
contenuto (`shouldBypassCavemanOutputMode()` in
`open-sse/services/compression/outputMode.ts`) controlla il testo degli ultimi tre
messaggi, indipendentemente dal loro ruolo, e ignora gli stili per l'intero turno quando
il testo corrisponde alle parole chiave relative a sicurezza, azioni irreversibili o
richieste di chiarimento, oppure a una sequenza sensibile all'ordine: `first`, `then`,
`after that`, `before`, `rollback` o `backup` seguiti entro 240 caratteri da `delete`,
`drop`, `migrate`, `deploy` o `release`. Il bypass viene eseguito finché l'opzione
**Auto-Clarity Bypass** (`cavemanOutputMode.autoClarity`, attiva per impostazione
predefinita) è attiva; disattivandola, il controllo delle parole chiave viene omesso.

Quando il bypass consente il passaggio del turno, `placeSystemInstruction()` (nello
stesso file), che non crea mai un nuovo `messages[0]`, inserisce il blocco nella prima
posizione disponibile tra le seguenti:

1. Un messaggio di sistema iniziale con contenuto stringa: il blocco viene aggiunto dopo
   il relativo testo.
2. Il campo `system` di primo livello: il blocco viene aggiunto dopo il testo di una
   stringa oppure come nuovo blocco di testo in un array di blocchi di contenuto.
3. Il primo messaggio di sistema successivo con contenuto stringa: il blocco viene
   aggiunto dopo il relativo testo.
4. Nessuna delle precedenti: il blocco viene inserito in un nuovo messaggio di sistema
   alla fine di `messages`.

In un corpo senza un array `messages` (o con un array vuoto), non viene eseguito alcun
bypass basato sul contenuto e il campo `system` di primo livello non viene consultato.
Il blocco viene aggiunto dopo il testo di un campo `instructions` di tipo stringa, a
meno che tale campo non contenga già il marcatore `[OmniRoute Output Styles]`, nel qual
caso il corpo viene lasciato invariato come `already_applied`. Quando il corpo non
dispone di un campo `instructions` di tipo stringa ma contiene `input` (una stringa o un
array), il blocco diventa `instructions`, sostituendo qualsiasi valore non stringa
precedentemente contenuto in tale campo. Un corpo che non contiene né un campo
`instructions` di tipo stringa né un `input` di tipo stringa o array viene lasciato
invariato e ignorato come `no_messages`.

#### Come abilitare la funzionalità

Nella dashboard: **Contesto di compressione → Impostazioni di compressione**
(`/dashboard/context/settings`), sezione Stili di output: una riga per ogni stile, con
un interruttore di attivazione/disattivazione e un selettore del livello. Gli stili
vengono inseriti quando la compressione stessa è attiva (l'interruttore principale
della pagina, `enabled`). L'opzione **Auto-Clarity Bypass** si trova nella pagina
**Caveman** (`/dashboard/context/caveman`), nella scheda **Modalità di output**. A livello
di programmazione, la configurazione della compressione mantiene la selezione nel
seguente formato:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilità con le versioni precedenti: finché `outputStyles` è vuoto, l'impostazione
legacy `cavemanOutputMode.enabled` viene mappata su `terse-prose` al livello indicato da
`cavemanOutputMode.intensity`. Il blocco inizia quindi con il marcatore
`[OmniRoute Output Styles]`, mentre l'iniettore legacy `applyCavemanOutputMode()`
inseriva `[OmniRoute Caveman Output Mode]`. Sotto il marcatore, il testo corrisponde
all'inserimento legacy nelle lingue en, pt-BR, es, de, fr, it, ru, id e vi; in ja e zh
contiene uno spazio aggiuntivo prima della clausola sui limiti. `terse-prose` dispone di
traduzioni in pt-BR, es, de, fr, it, ru, zh, ja, id e vi, quindi una richiesta la cui
lingua risolta è `hu` riceve il testo inglese, mentre l'iniettore legacy utilizzava
quello ungherese.

Selezione della lingua per gli stili di output (`resolveOutputStyleLanguage()` in
`outputStyles/apply.ts`): con `languageConfig.enabled` attivo, `autoDetect` campiona il
messaggio utente più recente nell'array `messages` della richiesta che contiene testo
(contenuto stringa oppure il `text` delle relative parti di contenuto) ed esegue su di
esso il rilevatore del motore Caveman (`detectCompressionLanguage()`). Il rilevatore
restituisce `zh` per il testo con caratteri Han e senza kana; in caso contrario,
restituisce la lingua tra `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` e `id` con
il maggior numero di corrispondenze con gli indizi, oppure `en` quando non viene trovata
alcuna corrispondenza — il testo che non riesce a classificare viene considerato
inglese, senza mai usare `defaultLanguage`, e `vi` non viene mai rilevato, sebbene gli
stili includano testo in `vi`. Un corpo della Responses API conserva i propri turni in
`input`, che non viene campionato, quindi usa `defaultLanguage` e successivamente
l'inglese. Quando nessun messaggio utente in `messages` contiene testo, oppure quando
`autoDetect` è disattivato, viene applicato `defaultLanguage` e successivamente
l'inglese. Con `languageConfig.enabled` disattivato, la lingua è l'inglese, a meno che
alla richiesta non venga applicata una combinazione di compressione (una combinazione
assegnata alla combinazione di instradamento della richiesta oppure la combinazione di
compressione predefinita su cui chatCore ripiega per la pipeline integrata in stack):
l'applicazione di una combinazione attiva `languageConfig.enabled` per tale richiesta e
imposta `defaultLanguage` in base ai pacchetti linguistici della combinazione (il valore
salvato, se appartiene ai pacchetti della combinazione; altrimenti il primo pacchetto
della combinazione, il cui valore predefinito è `en`), mentre continua a essere
applicato il valore salvato di `autoDetect` (attivo per impostazione predefinita). Il
motore di input Caveman seleziona la lingua del proprio pacchetto di regole in modo
diverso: separatamente per ogni parte di testo e, con il rilevamento automatico
disattivato, in base a `enabledPacks`.

La matrice stile × lingua è vincolata da
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: ogni stile del catalogo deve avere una
voce in `BASELINE_LANGUAGES` del test; uno stile non vincolato a una locale deve includere una
traduzione pt-BR (`terse-cjk`, vincolato alla locale, è esente da questa regola), a meno che non sia
elencato in `KNOWN_ENGLISH_ONLY`, che può contenere solo stili privi di qualsiasi traduzione —
uno stile elencato che dispone di una traduzione fa fallire il test; inoltre, uno stile fa fallire il test quando
perde una lingua elencata nella relativa voce `BASELINE_LANGUAGES`. Per aggiungere uno stile, consultare
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressione dei risultati degli strumenti

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts`
comprime il testo dei risultati degli strumenti mediante **5 strategie**. Le prova in questo ordine e la
prima strategia abilitata il cui controllo corrisponde al contenuto determina il risultato:

1. **`fileContent`**: per un contenuto di almeno 3 righe in cui almeno una riga, ignorando
   l'indentazione iniziale, inizia con `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` o `return ` (la parola chiave seguita da uno spazio), oppure con `if`,
   `for` o `while` seguito da `(` o ` (`, conserva le prime 20 e le ultime 5 righe, indicando
   la parte centrale omessa.
2. **`grepSearch`**: per un contenuto con almeno una riga nel formato `<path>:<digits>:`,
   in cui il testo prima dei primi due punti non contiene spazi bianchi, conserva solo tali righe, fino
   a un massimo di 30, seguite dal numero di eventuali ulteriori corrispondenze e dall'elenco dei file corrispondenti;
   tutte le altre righe vengono eliminate. Una sola riga di questo tipo è sufficiente ad attivare la strategia, quindi anche una
   riga di log che inizia con un timestamp come `12:30:45` viene considerata.
3. **`shellOutput`**: per un output che contiene una sequenza ANSI CSI (`ESC[` seguito da cifre o
   punti e virgola e poi da una lettera, come nei codici colore) oppure un `$` seguito da uno spazio bianco
   in qualsiasi punto del testo, rimuove tali sequenze (gli altri escape, come `ESC[?25l` o una
   sequenza OSC per il titolo della finestra, vengono mantenuti) e conserva le ultime 50 righe, accorpando
   le righe consecutive ripetute. Poiché questo controllo viene eseguito prima di `json` e `errorMessage`,
   l'output JSON o di errore che contiene un `$` di questo tipo non raggiunge mai tali strategie finché
   `shellOutput` è attivo.
4. **`json`**: un payload JSON di oltre 2.000 caratteri che inizia con `{` o `[` (dopo
   eventuali spazi bianchi) e che può essere analizzato viene riepilogato: per un array di più di 7 elementi vengono conservati
   i primi 5 e gli ultimi 2 elementi e il conteggio totale, mentre per un oggetto vengono conservate le prime 20
   chiavi, con ciascun valore di tipo oggetto o array annidato sostituito da un segnaposto `{…N keys}`
   (per un array, N è la sua lunghezza) e un indicatore `_remaining_<N>_keys` che conta le chiavi
   eliminate dopo le prime 20. I valori scalari vengono copiati integralmente, quindi un oggetto con 20 chiavi
   o meno e senza valori annidati viene solo reindentato: se è minimizzato, acquisisce caratteri
   e rimane invariato.
5. **`errorMessage`**: per un output che contiene, in qualsiasi punto e senza distinzione tra maiuscole e minuscole, `error:`,
   `error ` (la parola seguita da uno spazio, come in `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` o `traceback`, conserva la prima riga, le
   10 righe successive e le ultime 3, inserendo un indicatore `… [N frames elided] …` al posto delle
   righe comprese tra esse. L'indicatore appare solo quando dopo la prima riga sono presenti più di 13
   righe, quindi un output di errore di 14 righe o meno non viene abbreviato (con 12 o 13 righe, le
   ultime 3 ripetono righe già conservate).

Dopo che una strategia trova una corrispondenza, anche se non produce alcun risparmio, le strategie successive non vengono
provate. Quando la strategia corrispondente non fa risparmiare token stimati (lunghezza ÷ 4, arrotondata per eccesso) —
per esempio, per un file simile a codice di 25 righe o meno oppure per un array JSON di oltre 2.000
caratteri con 7 elementi o meno — il motore aggressivo conserva il risultato originale dello
strumento: entrambi i chiamanti (`compressAggressive()` e `compressAnthropicToolResultBlock()`)
conservano l'originale quando `saved` è pari o inferiore a 0, mentre `compressToolResult()` restituisce comunque
l'output di tale strategia. Il passaggio relativo ai risultati degli strumenti non è definitivo: il
riepilogatore di ripiego del motore può comunque abbreviare un messaggio `tool` o `function` più lungo
di 8.192 caratteri (`maxTokensPerMessage`, 2.048, moltiplicato per 4).

#### Quando utilizzarla

La compressione dei risultati degli strumenti è il passaggio 1 del motore aggressivo (`compressAggressive()` in
`open-sse/services/compression/aggressive.ts`), quindi viene eseguita in modalità Aggressive e in un
passaggio `aggressive` di una pipeline concatenata. Comprime i messaggi `tool` e `function` nel formato
OpenAI e il testo all'interno dei blocchi Anthropic `tool_result`. Ogni strategia dispone del proprio
interruttore in `aggressive.toolStrategies`, tutti attivi per impostazione predefinita. Nella dashboard, gli
interruttori si trovano nella vista **Advanced** della pagina Caveman quando la compressione è attiva e la
modalità predefinita è Aggressive.

### Pipeline concatenata

La modalità concatenata esegue **più motori in sequenza** — solitamente prima RTK
(60-90% di risparmio sull'output degli strumenti), quindi Caveman sul testo rimanente (~46% di
risparmio sull'input). In combinazione, ciò produce l'**intervallo idoneo del 78-95%** (vedere Calcolo dei risparmi upstream
sopra): `1 - (1 - 0.60..0.90) × (1 - 0.46)` dà una media di ≈89%.

#### Come funziona

```
Input (1000 token)
  → RTK (filtro consapevole dei comandi) → 200 token
    → Caveman (rimozione del testo superfluo) → 108 token
  → Output (108 token, ~89% di risparmio)
```

#### Quando utilizzarla

Utilizzare la modalità concatenata per:

- Flussi di lavoro con uso intensivo di strumenti (programmazione agentica, ricerca)
- Elaborazione in batch sensibile ai costi
- Quando è necessario il massimo risparmio di token

Le pipeline concatenate vengono configurate tramite l'impostazione globale di compressione
`stackedPipeline` oppure tramite una combinazione di compressione con nome assegnata a una combinazione di instradamento (vedere
Sostituzione per combinazione sopra), non tramite un `modePack` di una combinazione automatica (quel campo si limita
a ripesare la selezione dei modelli della combinazione automatica e `stacked` non è un nome di pacchetto valido).

---

## Override delle combinazioni di compressione

Puoi eseguire l'override della modalità di compressione globale **per ogni combinazione** per ottimizzare il comportamento
per diversi casi d'uso:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Questo è utile per:

- **Combinazioni per la programmazione**: usa la modalità `aggressive` per le sessioni lunghe
- **Combinazioni per domande e risposte rapide**: usa la modalità `lite` per risposte veloci
- **Combinazioni con uso intensivo di strumenti**: usa la modalità `stacked` per il massimo risparmio
- **Combinazioni di produzione**: lascia l'override disattivato per i provider con memorizzazione nella cache — la regolazione compatibile con la cache, sempre attiva, effettua automaticamente il downgrade di `aggressive`/`ultra` a `standard`
  (non è disponibile alcuna modalità `cache-aware` selezionabile)

---

## Vedi anche

- [Configurazione dell'ambiente](../reference/ENVIRONMENT.md) — Variabili d'ambiente per la compressione
- [Guida all'architettura](../architecture/ARCHITECTURE.md) — Dettagli interni della pipeline di compressione
- [Guida utente](../guides/USER_GUIDE.md) — Primi passi con la compressione
- [Compressione RTK](./RTK_COMPRESSION.md) — Filtri RTK, modello di attendibilità, gate di verifica, recupero dell'output non elaborato
- [Motori di compressione](./COMPRESSION_ENGINES.md) — Caveman, RTK, modalità `stacked`, API, MCP, dashboard
- [Formato delle regole di compressione](./COMPRESSION_RULES_FORMAT.md) — Formato JSON dei pacchetti di regole
- [Pacchetti linguistici di compressione](./COMPRESSION_LANGUAGE_PACKS.md) — Regole Caveman specifiche per lingua
