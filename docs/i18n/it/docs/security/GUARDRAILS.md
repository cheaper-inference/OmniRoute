# Guardrails (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte di verità:** `src/lib/guardrails/`
> **Ultimo aggiornamento:** 2026-08-29 — v3.8.51 (La provenienza della trascrizione di Video Bridge è dichiarata dal chiamante,
> non ancora verificata dal server — chiarito come da #11661)

I guardrail applicano sicurezza, policy e trasformazioni dei contenuti al confine
tra OmniRoute e i provider upstream. Ogni guardrail può ispezionare (e
opzionalmente rifiutare, trasformare o annotare) i payload delle richieste (`preCall`) e
le risposte upstream (`postCall`).

Il sistema è **fail-open**: se un guardrail genera un errore durante l'esecuzione, il registro
annota l'errore e continua con il guardrail successivo invece di far fallire la
richiesta. Il blocco è una decisione esplicita (`block: true`), mai accidentale.

## Guardrail integrate

Il registro carica automaticamente sei guardrail in ordine di priorità durante l'importazione
(vedere `registry.ts` → `registerDefaultGuardrails()`):

| Priorità | Nome                | Fase/i         | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

I numeri di priorità più bassi vengono eseguiti **per primi**.

### Bridge visivo (`visionBridge.ts`) — Bridge di modalità PR-1

Intercetta le richieste contenenti immagini destinate a **modelli senza capacità visive** e
reindirizza l'intera richiesta a un modello con capacità visive oppure sostituisce le parti
contenenti immagini con descrizioni testuali prodotte da un modello visivo configurabile prima
della chiamata upstream. Ciò consente ai provider solo testuali di gestire in modo trasparente
payload multimodali.

Flusso:

1. Ignora la richiesta se il modello di destinazione supporta già la visione (a meno che non compaia
   nell'elenco dei modelli per cui il bridge è forzato `isVisionBridgeForcedModel`).
2. Estrae le parti contenenti immagini tramite `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), che delega al **rilevatore multimediale
   unificato** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — l'unica
   fonte di verità condivisa con il filtro di compatibilità delle combo.
   L'estrazione è limitata da una allowlist alle parti di primo livello con forme che
   `replaceImageParts` può reinserire (il contratto estrazione↔sostituzione): OpenAI
   `image_url`, `source.type:"base64"` in base64 di Anthropic, URL Anthropic
   `source.type:"url"` e `input_image` della Responses API. Le corrispondenze
   annidate e le forme contenenti solo indicatori sono materiale per il filtro delle combo e non vengono mai estratte.
   Ignora la richiesta se non ne viene trovata alcuna.
3. Risolve la configurazione di runtime tramite `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): le nuove chiavi delle impostazioni `modalityBridge*`
   hanno la precedenza; le chiavi legacy `visionBridge*` rimangono come **fallback per un ciclo**
   (finestra di rollback). Interrompe l'elaborazione prima di qualsiasi scansione dei contenuti multimediali quando il
   bridge è disabilitato.
4. Il selettore di modalità (`modalityBridgeVisionMode`, vedere la tabella seguente) decide
   tra reindirizzamento e descrizione. Il reindirizzamento restituisce `modifiedPayload` con il solo `model`
   sostituito, oltre ai metadati `{ rerouted, fromModel, toModel, imagesKept }`.
5. Percorso di descrizione: limita le immagini a `maxImages`, compone il prompt sensibile all'attività,
   consulta la cache delle descrizioni, chiama il modello visivo **in parallelo**
   (`Promise.allSettled`) e inserisce al loro posto parti testuali `[Image N]: <description>`.
   Una descrizione non riuscita produce `null` e la parte originale dell'immagine viene
   **preservata** (#4012), tranne nel percorso di descrizione delle combo quando tutte
   le descrizioni non sono riuscite; in tal caso, un upstream confermato senza capacità visive riceve invece
   un segnaposto `(non disponibile — nessun provider con capacità visive connesso)` (#8430).
6. Restituisce `modifiedPayload` + metadati (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettore di modalità (`modalityBridgeVisionMode`)

| Modalità   | Predefinita | Comportamento                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔           | Euristica legacy, invariata (#6640/#7204): i modelli non combo/`auto/` vengono reindirizzati al miglior modello visivo, a meno che il modello originale non disponga già di credenziali utilizzabili (in tal caso viene usata la descrizione); le destinazioni combo usano sempre la descrizione.                                                                                          |
| `describe` |             | Descrive sempre: il blocco di reindirizzamento viene completamente ignorato; risponde sempre il modello scelto dall'utente.                                                                                                                                                                                                                                                                |
| `reroute`  |             | Forza il reindirizzamento: il controllo che mantiene il modello dotato di credenziali viene ignorato. Il controllo delle credenziali della **destinazione** del reindirizzamento continua ad applicarsi: quando non esiste una destinazione visiva utilizzabile, la richiesta passa alla descrizione, così le immagini non elaborate non raggiungono mai un backend solo testuale (#8430). |

Le modalità forzate causano un cortocircuito **prima** dell'esecuzione dell'euristica automatica; il comportamento
`auto` è identico byte per byte al guardrail precedente a PR-1.

#### Ambito della chiave API (`visionBridgeKeyScope.ts`)

Quando la chiave API del chiamante limita `allowedConnections`, i pool di quota
(`allowedQuotas`) o i modelli (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), il bridge seleziona
solo modelli di reindirizzamento e descrizione che la chiave può utilizzare, su connessioni che la chiave può
utilizzare. La chiamata di descrizione passa quindi sempre attraverso il self-loop di OmniRoute con
l'header `x-omniroute-self-loop-key-id`, affinché la richiesta chat ricevente
applichi nuovamente la policy della chiave relativa a connessioni e modelli. `enforceApiKeyPolicy()`
rispetta tale header solo insieme al bearer del self-loop, quindi può soltanto
restringere l'accesso, e un ID che non viene risolto viene rifiutato.

Se per la chiave non è consentito alcun modello visivo, il percorso di descrizione si fa da parte e
la richiesta prosegue senza modifiche, con lo stesso comportamento fail-open di un
guardrail disabilitato (metadati `{ skipped: true, reason: "no_permitted_vision_model" }`).
Le richieste senza chiave e le chiavi prive di queste restrizioni si comportano esattamente come
prima.

#### Prompt di descrizione sensibile all'attività (`modalityBridgeVisionTaskAware`)

Valore predefinito: **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) aggiunge
il testo dell'**ultimo messaggio dell'utente** (troncato a 500 caratteri) al prompt
di descrizione di base, orientando la descrizione verso ciò che l'utente ha
effettivamente chiesto (modello codex-vision-proxy) e chiedendo al modello visivo
di trascrivere il testo visibile. Con il flag disattivato, oppure in assenza di
testo dell'utente, il prompt di base viene utilizzato senza modifiche.

La richiesta compatibile con OpenAI del ciclo automatico di descrizione
(`callVisionModelSingle()` in `visionBridgeHelpers.ts`) richiede sempre
`image_url.detail: "high"` — incondizionatamente, per ogni chiamante/provider,
senza dipendere da alcun segnale del client. Il campionamento a basso dettaglio
riduce l'accuratezza OCR proprio per l'attività di trascrizione del testo
richiesta da questo prompt; pertanto, la chiamata di descrizione richiede sempre
un dettaglio elevato, indipendentemente dal livello di dettaglio utilizzato
dalla richiesta originale in ingresso. Ciò influisce soltanto sul corpo della
richiesta interna di descrizione; non modifica il modo in cui OmniRoute inoltra
il valore `image_url.detail` del chiamante nella richiesta principale — tale
valore predefinito viene applicato separatamente e solo per i client OpenCode
rilevati, in `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Il ramo del ciclo automatico di
descrizione che utilizza il formato wire di Anthropic non contiene alcun campo
`detail` e non è interessato da nessuno dei due valori predefiniti.

#### Limite dell'output della descrizione (`modalityBridgeVisionMaxChars`)

| Chiave                         | Valore predefinito | Intervallo      |
| ------------------------------ | ------------------ | --------------- |
| `modalityBridgeVisionMaxChars` | `0`                | `0` o 100–50000 |

`0` (valore predefinito) indica **nessun limite**: la descrizione restituita da
`callVisionModel()` viene trasmessa senza modifiche, preservando il comportamento
esistente. Qualsiasi valore nell'intervallo 100–50000 tronca la descrizione
aggiungendo il suffisso `…` prima che venga reinserita come
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in
`src/lib/guardrails/visionBridge.ts`). Aumentare questo valore per le attività
OCR ricche di dettagli, in cui il modello a valle necessita della trascrizione
completa; ridurlo per limitare l'uso dei token con modelli visivi prolissi.
Il campo della dashboard si trova nel pannello Avanzate della scheda Vision
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) e forza qualsiasi
valore compreso tra 1 e 99 al minimo di 100, lasciando invariato uno `0`
esplicito — `0` è di per sé un valore Zod valido
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), non
semplicemente il valore predefinito «non impostato».

#### Cache delle descrizioni (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL in memoria per gli output delle descrizioni, condivisa a livello
di processo. Chiave = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
con framing basato sul prefisso di lunghezza (senza collisioni tra i confini dei
campi). Il componente del modello è il modello bridge **configurato**, non il
modello che ha effettivamente risposto — `callVisionModel` può eseguire
internamente un fallback e l'uso di una chiave per ogni tentativo
frammenterebbe la cache. Le descrizioni non riuscite non vengono mai memorizzate
nella cache. Impostazioni:

| Chiave                          | Valore predefinito | Intervallo |
| ------------------------------- | ------------------ | ---------- |
| `modalityBridgeCacheEnabled`    | `true`             | —          |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000    |

#### Normalizzazione delle immagini remote (descrizione automatica/recupero base64)

Quando il bridge recupera autonomamente un'immagine **remota** — nella
chiamata automatica di descrizione Anthropic e nella conversione base64 nel
formato wire di Claude (`ensureBase64ImagesForClaudeWire`), entrambe tramite
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — l'URI dati
risultante viene elaborato da `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prima di essere incorporato nella richiesta
al modello visivo. Le immagini sovradimensionate vengono ridimensionate con un
**lato lungo di 2048 px** (in linea con il limite di ridimensionamento già
applicato lato server da OpenAI/Anthropic), riducendo i byte caricati e la
latenza senza modificare ciò che il modello visivo vede. Il ridimensionamento
utilizza `sharp`, caricato tramite importazione dinamica: su una piattaforma in
cui il relativo binario nativo non riesce a caricarsi, `normalizeDataUri()`
**non genera mai eccezioni** — esegue invece un passthrough dei byte originali,
garantendo che il percorso di descrizione/conversione base64 continui sempre a
funzionare. Anche i byte non appartenenti a un'immagine (un recupero che non ha
restituito un'immagine decodificabile) vengono trasmessi senza modifiche. Questa
normalizzazione è limitata alle immagini recuperate dal bridge per la propria
chiamata automatica — non viene mai applicata al payload passthrough non
elaborato del chiamante, in conformità con il principio secondo cui le modifiche
avvengono esclusivamente previo consenso (Regola rigida n. 20).

#### Schema delle impostazioni + migrazione

Le nuove chiavi `modalityBridge*` sono convalidate tramite Zod in
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, il trio
`modalityBridgeCache*` e il gruppo `modalityBridgeAudio*` utilizzato
dall'Audio Bridge. La migrazione `141_modality_bridge_settings.sql` copia i
valori legacy `visionBridge*` esistenti nelle nuove chiavi corrispondenti
(è idempotente e non sovrascrive mai un valore `modalityBridge*` impostato
dall'operatore); le chiavi legacy continuano a essere accettate come fallback
in lettura per un ciclo di rilascio.

#### Header di trasparenza + statistiche

Le risposte trasformate tramite descrizione includono
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(generato da `buildModalityBridgeHeader()` in
`modalityBridge/bridgeStats.ts`, applicato da
`withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`).
Le richieste reindirizzate **non** ricevono alcun header — il payload non è
stato modificato e il cambio di modello è già visibile nel campo `model` del
corpo della risposta.

`GET /api/modality-bridge/stats` (autenticazione di gestione, stesso livello di
`GET /api/settings`) restituisce i contatori in memoria per ciascuna modalità
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` per `vision`, `audio` e
`video`. `averageLatencyMs` usa `latencySamples`, non tutti i tentativi, come
denominatore; un'operazione priva di misurazione temporale non genera
artificialmente un campione di zero millisecondi. `bridged` rimane l'alias
retrocompatibile per le conversioni riuscite; i tentativi non riusciti non lo
incrementano.
I contatori vengono azzerati al riavvio del processo per scelta progettuale
(telemetria, non contabilizzazione).

#### Configurazione della dashboard

La pagina dedicata della dashboard è
`/dashboard/settings/modality-bridge`. Le sue schede `Vision`, `Audio` e
`Video`, accessibili tramite URL, mantengono i parametri di query quando viene
modificato il valore di `tab`.
La scheda Vision espone l'abilitazione, la modalità, la selezione del modello
(inclusa l'impostazione predefinita automatica), i prompt basati sull'attività, i
limiti avanzati per timeout/immagini/lunghezza delle descrizioni/cache, i
contatori di runtime e una richiesta di esempio protetta. Anche la scheda Audio
è operativa: espone l'abilitazione, un selettore di modelli solo STT con Auto, i
limiti per timeout/durata massima delle clip, i contatori audio e un test di
esempio `input_audio`. La scheda Video è funzionale: segnala lo stato di runtime
di FFmpeg/ffprobe, corrispondente a uno di quattro stati espliciti dell'interfaccia
utente (`unknown` mentre il probe è in corso o non può essere completato,
`restricted` su un host della dashboard non loopback, dove il probe viene
ignorato lato client, `unavailable` dopo l'esecuzione del probe e la conferma
dell'assenza, oppure `available` con le versioni di FFmpeg/ffprobe), rende
persistenti i limiti di abilitazione/modello/fotogrammi/video/timeout, filtra il
selettore dei modelli includendo quelli compatibili con la visione ed espone i
contatori video.

La precedente scheda Vision Bridge nelle impostazioni AI è un collegamento di
compatibilità alla nuova pagina; non gestisce più una seconda copia del modulo.
Media Providers collega inoltre i flussi di lavoro Image-to-Text e
Speech-to-Text alle schede Modality Bridge corrispondenti, senza rimuovere il
playground Speech-to-Text esistente.

**Bypass dell'ammissione per self-loop:** quando la chiamata di descrizione viene
instradata attraverso il self-loop `/v1` di OmniRoute (modello di un provider non
standard), la richiesta secondaria invia
`x-omniroute-admission-bypass: internal` e viene autenticata con la credenziale
self-loop risolta: il valore sentinella locale `sk_omniroute` in modalità locale,
oppure la chiave di ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurata
dall'operatore (#1350), così che i deployment con `REQUIRE_API_KEY=true` possano
comunque eseguire la chiamata di descrizione. Il bypass viene rispettato soltanto
per quelle credenziali esatte, pertanto i client esterni non possono usare
l'header per saltare l'ammissione.

I valori predefiniti legacy si trovano in
`src/shared/constants/visionBridgeDefaults.ts`; i nuovi valori predefiniti per
modalità/attività/cache e il resolver delle impostazioni si trovano in
`src/shared/constants/modalityBridgeDefaults.ts`. Il guardrail espone un'opzione
del costruttore `deps`, affinché i test possano iniettare implementazioni fittizie
di `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercetta le richieste di chat contenenti audio prima che raggiungano una
destinazione che non è nota per accettare input audio. Non reinstrada mai la
richiesta di chat: le parti audio vengono trascritte tramite l'endpoint multipart
esistente compatibile con OpenAI e il modello di chat scelto prosegue con le
trascrizioni testuali.

Flusso:

1. Risolve `supportsAudio` tramite `getResolvedModelCapabilities()`. I metadati
   espliciti del registro dei provider hanno la precedenza, seguiti dai metadati
   statici del modello e quindi da `modalities_input` sincronizzato. Un elenco
   dichiarato di input senza `audio` equivale a `false`; in assenza di evidenze
   sulle capacità, il valore rimane `null`. Sia `false` sia `null` attivano il
   bridge conservativo, mentre `true` lo ignora.
2. Risolve le impostazioni `modalityBridgeAudio*` ed estrae le parti audio di
   primo livello sostituibili da ogni messaggio tramite il rilevatore condiviso
   `detectMediaParts()`. I formati supportati sul canale di comunicazione sono
   `input_audio` di OpenAI, `audio_url` e `source.media_type: "audio/*"`.
   L'audio annidato viene rilevato ai fini dell'instradamento, ma non rimosso dal
   percorso di sostituzione. L'elaborazione è limitata da
   `modalityBridgeAudioMaxClips`; le parti successive rimangono invariate.
3. Rispetta un valore `provider/model` configurato oppure consente a
   `selectAudioBridgeModel()` di scorrere `AUDIO_TRANSCRIPTION_PROVIDERS`
   nell'ordine stabile del catalogo e selezionare il primo modello dotato di una
   credenziale del provider attiva e utilizzabile.
4. `callAudioTranscription()` converte l'audio base64/data-URI in un `file`
   multipart oppure scarica un `audio_url` remoto tramite la protezione in uscita
   limitata alle risorse pubbliche, con pinning DNS e un limite di 25 MB. Invia
   quindi tramite POST il file e il modello selezionato al self-loop locale
   `/v1/audio/transcriptions`, autenticato con `resolveSelfLoopBearer()`. La
   route di trascrizione esistente esegue la normale ricerca delle credenziali,
   la gestione di cooldown/limiti di frequenza e il dispatch verso il provider.
5. Le chiamate riuscite sostituiscono le rispettive parti con
   `[Audio N]: <transcript>`. Le chiamate vengono eseguite con
   `Promise.allSettled`: un singolo errore mantiene la parte audio originale
   (contratto #4012). Se tutte le chiamate falliscono e per la destinazione è
   dimostrato `supportsAudio === false`, le parti diventano
   `[Audio N]: (unavailable — no STT provider connected)` (contratto #8430). Per
   una destinazione sconosciuta (`null`), se tutte le chiamate falliscono il
   contenuto rimane invariato. Una destinazione per la quale è dimostrato il
   supporto del solo testo e che non dispone di credenziali STT utilizzabili
   riceve lo stesso stub esplicito senza eseguire una chiamata di rete.

Le trascrizioni riuscite usano la cache LRU/TTL di Modality Bridge condivisa a
livello di processo. La chiave combina il riferimento audio, l'etichetta stabile
dell'operazione `audio-transcription` e il modello STT selezionato; gli errori non
vengono mai memorizzati nella cache. I tentativi audio aggiornano i contatori
condivisi `bridged`, `cacheHits`, `failures` e `lastUsedAt`.
Le risposte trasformate includono
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; le
richieste non modificate non ricevono un segmento Audio Bridge.

Le impostazioni di runtime sono memorizzate nel DB e convalidate tramite Zod:

| Chiave                        | Valore predefinito | Intervallo          |
| ----------------------------- | ------------------ | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —                   |
| `modalityBridgeAudioModel`    | `""`               | Automatico o ID STT |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10                |

La cache condivisa resta controllata da `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Bridge video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercetta le parti video di primo livello nei `messages` di Chat Completions e
nell'`input` dell'API Responses prima che venga chiamata una destinazione priva
di supporto video nativo noto. Le forme supportate sono `input_video`,
`video_url`, `video_source`, URL HTTPS e URI dati
`data:video/*;base64,...`. I semplici nomi di file presenti nel testo non vengono
considerati video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestisce l'attraversamento della
richiesta, il controllo di funzionalità/criteri, l'aggregazione per richiesta e
il payload della risposta. L'elaborazione per ciascun video — acquisizione, cache
dell'intero risultato, descrizione di una sequenza di fotogrammi (che integra
qualsiasi trascrizione audio dichiarata dal chiamante) e
metriche/interruzione/pulizia per tentativo — è incapsulata dietro
`processVideoPart` in `videoBridgePipeline.ts`, chiamato una volta per ogni parte
video all'interno del ciclo di `preCall`. Tale modulo definisce inoltre i confini
espliciti delle porte `VideoMediaBrokerPort` (acquisizione dei byte ed estrazione
dei fotogrammi campionati), `VideoAudioTranscriptionPort` (integrazione di una
trascrizione audio dichiarata dal chiamante con le didascalie campionate) e
`VideoDrilldownPort` (il confine di persistenza per l'analisi dettagliata dei
fotogrammi; non è ancora collegato a `processVideoPart` — attualmente solo la
rotta separata `/api/modality-bridge/video/drilldown` scrive le voci di analisi
dettagliata).

Il percorso pubblico delle richieste `/v1` non importa né invoca mai un
sottoprocesso. I video remoti vengono scaricati entro un limite di 50 MiB; per i
video base64 incorporati viene applicato un limite prudenziale per video di
36 MiB decodificati, in modo che l'involucro di modello/messaggi/framing possa
rimanere entro il limite pubblico di ammissione delle richieste JSON di 50 MiB.
La lunghezza inline e le stime delle dimensioni decodificate vengono controllate
prima dell'allocazione. HTTPS è obbligatorio nell'URL remoto iniziale e in ogni
reindirizzamento, utilizzando il meccanismo esistente di protezione delle
connessioni in uscita esclusivamente pubbliche con associazione DNS fissa. I byte
attraversano quindi l'esatto confine interno del broker
`POST /api/modality-bridge/video/extract`. Tale rotta è sia `LOCAL_ONLY` sia
`SPAWN_CAPABLE`, accetta esclusivamente una richiesta autenticata per processo
proveniente da un loopback attendibile e non accetta mai URL, percorsi del file
system, eseguibili o elenchi di argomenti. La pipeline delle dimensioni del corpo
dell'API e il lettore incrementale del corpo dell'handler applicano
indipendentemente un limite di input del broker di 50 MiB. La relativa coda
limitata esegue un'estrazione alla volta, consente quattro processi in attesa e
limita l'input in attesa a 100 MiB.

All'interno del broker, `ffprobe` legge un file locale privato; l'elenco fisso
dei formati consentiti esclude i formati di playlist e manifest. Per i contenitori
consentiti della famiglia MOV, i riferimenti esterni ai dati MOV restano
disabilitati per impostazione predefinita e il comando fisso non ne abilita
l'uso. Sia `ffprobe` sia `ffmpeg` utilizzano una whitelist di protocolli limitata
a `file`, un solo thread, array di argomenti fissi, nessuna shell ed eseguibili
risolti da `PATH`. I flussi di immagini di copertina allegate non sono candidati
riproducibili. Tutti i flussi riproducibili devono rispettare i limiti e viene
preferito un flusso predefinito esplicito prima del fallback deterministico
all'indice più basso. I video sono limitati a 600 secondi, 8.192 pixel per
dimensione e 33.554.432 pixel sorgente. FFmpeg campiona da 1 a 16 fotogrammi JPEG
nei punti medi, ridimensiona il lato lungo fino a un massimo di 1.024 pixel senza
ingrandire gli input più piccoli e non riceve mai un URL. Per impostazione
predefinita, il campionamento è `uniform`. I criteri facoltativi `scene_aware` e
sperimentali `segment_aware` eseguono un ulteriore passaggio FFmpeg fisso sul
flusso locale già convalidato, selezionano timestamp di scena `showinfo` limitati
ed eseguono deterministicamente il fallback agli stessi punti medi uniformi in
caso di errore del rilevatore, timeout, output non valido o insieme di candidati
vuoto. La modalità basata sui segmenti assegna i campioni dei punti medi
proporzionalmente agli intervalli di scena convalidati; le evidenze della
modalità basata sui segmenti e il comportamento di fallback sono descritti in
dettaglio di seguito. Il limite rigido di 16 fotogrammi viene applicato dopo la
selezione in ogni criterio. Quando una richiesta basata sulle scene ha un budget
di un solo fotogramma, utilizza il punto medio uniforme dell'intero video attivo
o della finestra di interesse e riporta `policyEffective: uniform`: un singolo
fotogramma di scena selezionato non può preservare entrambe le estremità
temporali. Un chiamante può facoltativamente fornire una finestra di interesse
finita (`start`/`end` in secondi); i limiti vengono vincolati alla durata del
contenuto multimediale, le finestre invertite o non finite vengono rifiutate e
tutti i criteri di campionamento vengono applicati esclusivamente all'interno
dell'intervallo normalizzato. La finestra risultante viene inclusa nei metadati
di campionamento e nel prefisso di descrizione non attendibile, affinché i
modelli a valle possano distinguere un estratto mirato dalla sequenza temporale
completa.

La focalizzazione semantica delle didascalie è un'impostazione separata ed
esplicita. La modalità di analisi predefinita `full` mantiene il prompt esistente
per i fotogrammi e non inoltra mai il testo della richiesta al modello delle
didascalie. In modalità `focused`, il bridge legge esclusivamente il più recente
`text`/`input_text` non vuoto creato dall'utente dallo stesso contenitore Chat o
Responses, lo normalizza in NFC, compatta i caratteri di controllo e gli spazi
bianchi e lo limita a 500 punti di codice Unicode. Un risultato vuoto determina
il fallback al prompt `full` esatto. Un suggerimento utilizzabile viene
serializzato come JSON in un blocco dedicato al contesto utente non attendibile
e può soltanto assegnare priorità ai dettagli osservabili; non può ignorare
l'avviso separato che vieta di seguire le istruzioni visibili o udibili nel
contenuto multimediale. La focalizzazione testuale non deduce mai `start`/`end`
né modifica il campionatore temporale.

#### Evidenza strutturale dei segmenti FU-07

`segment_aware` utilizza un singolo passaggio di pre-analisi con limiti definiti sullo stream video locale già convalidato. La catena di filtri fissa ridimensiona prima il video a una larghezza massima di 320 pixel, rileva i cambi di scena e gli intervalli congelati, quindi campiona a 1 fotogramma al secondo per misurare sfocatura, luminanza media e informazioni spaziali/temporali. Il passaggio è limitato a 600 campioni strutturali, un thread FFmpeg/filtro, le stesse liste consentite per il solo protocollo `file` e per i container, un limite di 1 MiB per l'output del processo e un massimo di 30 secondi entro il meccanismo condiviso di interruzione/scadenza del broker. Non accetta mai dalla richiesta un comando, un filtro, un percorso o un URL.

I valori strutturali costituiscono evidenze di campionamento deterministiche, non una comprensione semantica del video. Non deducono soggetti, azioni, didascalie, parlato o intenzioni dell'utente. I confini delle scene e dei congelamenti formano segmenti; la copertura dei congelamenti, la sfocatura, l'esposizione, il dettaglio spaziale e il cambiamento temporale influenzano soltanto il modo in cui viene allocato il budget esistente di 1–16 fotogrammi. Un segmento completamente congelato è limitato a un solo fotogramma, mentre i segmenti non congelati competono per il budget rimanente. Quando il numero di confini supera quello dei fotogrammi, viene mantenuta una copertura uniforme della sequenza temporale, in modo che rapidi tagli iniziali non possano nascondere un lungo segmento finale. I confini di scena entro la risoluzione di analisi di 1 secondo da un confine di congelamento vengono accorpati.

Filtri mancanti, evidenze non valide/vuote, un errore del rilevatore o il timeout della pre-analisi con limiti definiti comportano un fallback aperto all'esatta politica uniforme basata sui punti medi. Un'interruzione da parte del chiamante o la scadenza del broker non comportano un fallback aperto: terminano il sottoprocesso in corso, impediscono la successiva estrazione dei fotogrammi e l'albero temporaneo privato viene rimosso in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera fixture FFmpeg reali e deterministiche per valutare il risparmio nelle chiamate di didascalia dopo la deduplicazione, l'allocazione del budget in presenza di movimento intenso, le evidenze relative a sfocatura/esposizione/SI-TI, i tagli rapidi con una lunga coda e i falsi positivi dovuti a dissolvenze graduali. Registra il tempo trascorso della pre-analisi e, dove `/usr/bin/time` è disponibile, la CPU del processo figlio e il picco RSS. I suoi controlli di qualità sono esclusivamente oracoli strutturali. La qualità del modello reale di generazione delle didascalie rimane `HOLD` perché questo harness non dispone di un endpoint autorizzato né di un valutatore congelato. Anche i risparmi monetari rimangono `HOLD`, a meno che `--caption-cost-per-call-usd` non fornisca una stima esplicita positiva del costo per chiamata; lo script non inventa mai nessuno dei due risultati.

Ogni fotogramma è limitato a 4 MiB, l'insieme di tutti i fotogrammi grezzi a 23 MiB e la risposta serializzata del broker a 32 MiB. Una directory temporanea privata viene rimossa in `finally`. OmniRoute non include FFmpeg e non accetta un percorso personalizzato dell'eseguibile. Prima della generazione delle didascalie, il bridge applica un passaggio conservativo di deduplicazione visiva: ogni JPEG viene ridotto a un buffer in scala di grigi di 16×16 e confrontato soltanto con l'ultimo fotogramma conservato. Per un budget di didascalie richiesto superiore a un fotogramma, l'estrazione fornisce un pool limitato di candidati, pari al massimo al doppio di tale budget e comunque mai superiore a 16 fotogrammi. Il limite richiesto viene applicato soltanto dopo la deduplicazione, preservando il primo e l'ultimo candidato selezionato durante l'assottigliamento finale quando il budget è almeno pari a due. La politica con versione
`grayscale-16x16-mean-cells-v2` utilizza il maggiore tra la differenza media di luminanza e il rapporto delle celle della miniatura la cui differenza normalizzata è almeno 0,05. La soglia dei duplicati è la costante 0,04, scelta per la prevedibilità anziché essere esposta come impostazione di runtime. Questo segnale secondario ad alto contrasto preserva i piccoli movimenti e le modifiche al testo visibile che un confronto basato soltanto sulla media può nascondere. Gli errori del comparatore o del decodificatore comportano un fallback aperto e mantengono la copertura. I metadati di output distinguono i candidati estratti, i fotogrammi utilizzati con successo e i duplicati visivi scartati.

Una parte video contrassegnata esplicitamente può richiedere un provino a contatto con timestamp. Il bridge crea una griglia JPEG con al massimo 4 colonne e 16 fotogrammi. Ogni cella da 512 pixel imprime il timestamp sorgente in una fascia inferiore ad alto contrasto, mentre gli stessi timestamp rimangono nei metadati testuali per l'associazione e l'audit a valle. Il JPEG completo rimane limitato a 32 MiB. Se `sharp` non riesce a decodificare o comporre la griglia, il bridge ricorre ai singoli fotogrammi JPEG; un'interruzione del client continua a propagarsi attraverso l'operazione sul provino.

Le evidenze per la promozione sono deliberatamente separate dal microbenchmark sintetico di composizione. `scripts/perf/video-bridge-contact-sheet-eval.ts` definisce un harness A/B con schema versionato per modelli di visione reali compatibili con OpenAI. Misura i token dichiarati dal provider, la latenza end-to-end (inclusa la composizione del provino), il numero di chiamate al modello e la conservazione dei fatti definita nel manifest. Le risposte grezze del modello non vengono scritte nel report; vengono conservati soltanto i digest SHA-256 e gli ID dei fatti corrispondenti. L'harness non effettua alcuna chiamata di rete o a modelli a pagamento, a meno che non venga passato `--execute-real` e siano configurati `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Senza tale esecuzione reale esplicita, il suo verdetto leggibile dalla macchina rimane `HOLD`; le sole misurazioni sintetiche del payload/numero di chiamate non costituiscono evidenze per la promozione.

I chiamanti possono allegare un array facoltativo `transcript.cues` a una parte video supportata quando dispongono già di testo allineato. Ogni cue deve includere `text`, un intervallo `start`/`end` finito e compreso nella durata rilevata e un valore `source` incluso nella lista consentita (`client`, `embedded` o `audio-bridge`); il valore predefinito di `confidence` è `1` e deve rimanere compreso tra `0` e `1`. I cue esattamente duplicati vengono accorpati. OmniRoute non avvia mai una trascrizione a partire da questi metadati: i cue convalidati vengono copiati nel risultato descritto insieme a sorgente, affidabilità e intervallo, e vengono presentati come osservazioni non attendibili accanto alle didascalie dei fotogrammi. Il testo non valido, fuori intervallo o privo di provenienza viene rifiutato anziché essere mescolato nel flusso delle didascalie. Entrambi i canali di trascrizione del corpo della richiesta normalizzano la provenienza fornita in `client`, incluse le etichette `embedded` o `audio-bridge` autodichiarate. Soltanto un adapter controllato dal server può assegnare tali etichette attendibili tramite l'argomento disponibile esclusivamente nel codice `trustedSource`; un campo JSON della richiesta non può raggiungere tale argomento. Il testo della trascrizione rimane contenuto non attendibile derivato dai media, indipendentemente dalla sua provenienza, e non deve mai determinare l'autorizzazione.

Un chiamante avanzato può fornire una traccia `audioTranscript` per lo stesso video;
viene trattata come testo fornito dal client, non come prova di una trascrizione del server.
Il punto di fusione esegue le osservazioni visive e audio rispettando
un'unica scadenza e un unico segnale di interruzione, le ordina su una timeline comune, accorpa
i duplicati esatti e restituisce un risultato parziale quando solo un ramo ha esito positivo.
Un `audioTranscript` non valido degrada a tale risultato parziale: la descrizione
visiva viene mantenuta e il ramo audio registra un codice di errore sanificato,
anziché causare il fallimento dell'intero video. La disponibilità di ciascun ramo, il flag di risultato parziale
e i codici di errore sanificati vengono mantenuti nel risultato descritto, nei
metadati dei guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nei metadati della cache dei risultati e nei contatori
di fusione del bridge. Il percorso predefinito di Video Bridge non richiama la conversione da voce a testo
né scarica una seconda copia del contenuto multimediale; senza tale traccia esplicita, rimane
limitato al solo video.

**Conservazione delle trascrizioni (#12150 P1).** Si applica automaticamente ogni volta che
Video Bridge (a sua volta facoltativo) esegue il rendering di un cue di trascrizione: non esiste un flag
di conservazione separato. Quando una richiesta esegue il rendering di un qualsiasi cue di trascrizione (un
`transcript` dichiarato dal chiamante o un `audioTranscript` fuso), il guardrail lo contrassegna come
`videoBridgeObserved` e produce una copia oscurata della descrizione del video:
un rendering identico in cui il corpo di testo libero di ogni cue viene sostituito con
`[redacted-video-transcript]`, creato sostituendo il campo strutturato del cue
prima dell'assemblaggio della stringa (mai analizzando il testo appiattito, in modo che nessun contenuto
del cue, ostile o ordinario, inclusi i corpi contenenti `]` come
`[inaudible]`/`[music]`, possa sopravvivere). Il corpo della richiesta conservato nel registro delle chiamate sostituisce
ogni parte testuale derivata dal video con tale copia oscurata, abbinata in base all'uguaglianza
del contenuto; l'ancora `fullText` viene riletta dal payload del guardrail pre-chiamata completato,
quindi l'abbinamento riesce anche dopo che i guardrail successivi della catena (i mascheratori di PII e
credenziali, con priorità 10/95) hanno riscritto direttamente il testo della descrizione e
dopo che l'iniezione del prompt di sistema, dell'handoff e della memoria ha rimodellato l'array dei messaggi. Il
corpo inviato a monte al modello rimane invariato. Una richiesta osservata, inoltre, non popola
alcuna Memory persistente (viene saltata sia l'estrazione derivata dalla richiesta sia quella derivata dalla risposta),
in modo che la risposta del modello non possa riportare il testo della trascrizione in Memory.

**Campi video grezzi (#12430).** Quando il bridge è abilitato e il supporto video nativo è sconosciuto o assente, anche i campi `transcript`/`audioTranscript` definiti attivano `videoBridgeObserved`, persino dopo un errore di descrizione o il raggiungimento di un limite `maxVideos`. `null` e le stringhe vuote vengono conteggiati; i campi assenti e i metadati non video no. Le copie conservate oscurano questi campi oppure omettono la richiesta, mentre cache/Memory vengono ignorate.

In tali percorsi di fallback, i cue validi del chiamante diventano parti `text`/`input_text`
supportate anziché campi non standard del provider. Entrambe le tracce fornite dalla richiesta
rimangono osservazioni `client` non attendibili, con un avviso esplicito che il video
non è stato descritto e che i timestamp non sono stati verificati rispetto al contenuto multimediale. I limiti esistenti
di 256 cue/64 KiB complessivi e per singolo cue si applicano congiuntamente alle due tracce;
i timestamp devono rientrare nel limite massimo di 600 secondi del broker e in qualsiasi finestra
di attenzione fornita. Le tracce non valide vengono scartate, non inoltrate come testo arbitrario; una
traccia sorella valida può comunque essere utilizzata, a meno che il loro limite combinato non venga superato. I campi nulli/vuoti
non aggiungono testo. Questo fallback non introduce alcun recupero dei contenuti multimediali né alcuna trascrizione.
I campi di estensione della trascrizione vengono rimossi dal contenitore video di fallback e dai relativi
oggetti `video_url`/`source`. L'allowlist del protocollo OpenAI rimane rigorosa; i contenitori video
con supporto nativo sconosciuto rimangono disponibili e le destinazioni note come esclusivamente testuali mantengono indicatori sicuri.
Le copie di oscuramento strutturate proteggono il testo della trascrizione aggiunto, mentre la
richiesta originale di proprietà del chiamante rimane invariata. Le destinazioni con supporto nativo e
i bridge disabilitati mantengono il loro comportamento di bypass esistente.

Le ulteriori copie conservate utilizzano lo stesso segnale di richiesta osservata. Lo snapshot grezzo
della richiesta client precedente al guardrail, la richiesta in sospeso in memoria e il registro
delle richieste rifiutate anticipatamente sostituiscono strutturalmente i campi di trascrizione nelle parti video;
i prompt stringa sintetizzati dalle fasi della pipeline e dall'handoff del contesto vengono oscurati
nel sink del corpo della richiesta conservata. L'indicatore `video_content_removed` conservato
fa sì che la continuazione tramite `previous_response_id` fallisca in modo sicuro anziché ricostruire
testo intenzionalmente scartato. Se una richiesta osservata perde la propria
copia di oscuramento per parte prima della registrazione, o anche solo una delle diverse copie video
non trova corrispondenza dopo successive modifiche della richiesta, il corpo della richiesta conservato viene
omesso interamente anziché conservare una trascrizione oscurata solo parzialmente.

Per una richiesta osservata, la risposta di un modello potrebbe citare qualsiasi porzione della
trascrizione senza un confine strutturato del cue. Il relativo `responseBody` conservato nel registro delle chiamate
viene pertanto sostituito da un indicatore di omissione; l'artefatto dettagliato
della pipeline (che può includere corpi upstream/client e chunk del flusso)
non viene conservato. Le cache semantiche, di idempotenza e di replay del ragionamento ignorano
letture e scritture per tale richiesta. La richiesta al provider e la risposta
visibile al client rimangono invariate. I byte di keepalive iniziali vengono rimossi dal buffer
temporaneo quando l'artefatto dettagliato viene omesso. L'avviso di Kiro relativo a EventStream
non valido riporta solo il conteggio dei byte del payload, mai il relativo contenuto né l'errore grezzo
del parser JSON.
Ciò non implica che sia stata eseguita una verifica di ogni diagnostica non correlata di provider/plugin;
l'analisi più ampia dei sink di conservazione è tracciata in #11658.

Il ciclo di vita interno di `/api/modality-bridge/video/drilldown` è un substrato di cache separato, autenticato tramite loopback/token. Ogni operazione richiede inoltre un ID principale opaco canonico. Prima che un chiamante di produzione venga abilitato, deve derivare tale ID dal tenant autenticato e non deve mai inoltrare un valore scelto dal client. Le chiavi della cache associano tale principale agli ID canonici di sessione e di riferimento video, memorizzano esclusivamente le relative chiavi derivate tramite SHA-256 e limitano sia le letture sia l'eliminazione allo stesso principale. La cache memorizza al massimo 16 fotogrammi JPEG derivati per voce, li fa scadere dopo dieci minuti e supporta letture limitate tramite `start`/`end` oppure l'eliminazione esplicita della sessione.

Ogni principale è limitato a 16 voci e 64 MiB di dati JPEG canonici. Tali limiti sono indipendenti dal limite globale di 64 voci/256 MiB: la pressione sulla quota del principale rimuove soltanto le voci usate meno di recente di quel principale prima di prendere in considerazione la rimozione LRU globale. Le voci scadute vengono eliminate sia dalla contabilizzazione del principale sia da quella globale durante l'attività della cache, mentre l'annullamento e gli errori di convalida non comportano il commit di una sostituzione parziale.

La cache rifiuta Base64 non canonico, padding eccessivo, contenuti multimediali non JPEG, JPEG malformati o troncati e JPEG che generano un avviso durante una decodifica completa dell'immagine con `sharp` soggetta a limiti. Ogni immagine accettata viene ricodificata come JPEG canonico; larghezza e altezza vengono derivate dai byte decodificati anziché considerare attendibili i campi forniti dal chiamante, e gli eventuali byte poliglotti finali vengono scartati anziché conservati. A entrambe le quote viene addebitato soltanto il buffer compresso canonico soggetto a limiti. Il limite JSON sul canale include l'overhead Base64 per il limite massimo di 32 MiB dell'input decodificato. Ogni derivazione memorizzata registra il formato e la risoluzione JPEG convalidati, la politica di campionamento, la versione della derivazione, l'ora di creazione, l'hash del contenuto calcolato dal server, nonché il riferimento principale sottoposto ad hashing e l'hash del contenuto principale fornito dal chiamante attendibile. L'annullamento viene verificato tra le fasi asincrone di decodifica e hashing, prima del commit atomico nella cache.

Questa tranche non collega ancora un produttore di produzione alla route e non fornisce la selezione di varianti a più risoluzioni. Il percorso trasparente delle richieste Video Bridge non comporta pertanto alcun lavoro aggiuntivo, mentre la derivazione del principale associata al tenant e l'intero ciclo di vita multi-risoluzione FU-08 rimangono esplicitamente attività successive, anziché essere documentati come comportamento completato.

I fotogrammi vengono sottotitolati in sequenza con il modello Video configurato. Un override Video vuoto eredita l'impostazione Vision; se entrambi sono vuoti, l'auto-router Vision seleziona il modello effettivo dotato di funzionalità visive. Le didascalie generate correttamente sostituiscono la parte originale con un prefisso stabile `[Video description:` che contrassegna anche il testo come osservazione non attendibile derivata dai contenuti multimediali e indica ai modelli downstream di non seguire le istruzioni presenti nei contenuti multimediali. Le chiavi della cache delle didascalie dei fotogrammi includono i byte JPEG, il prompt, il timestamp e il modello effettivo; vengono memorizzate nella cache soltanto le didascalie generate correttamente. Le voci della cache conservano il modello produttore effettivamente riuscito, incluso un modello di fallback; il bridge indica `mixed` quando fotogrammi diversi sono stati prodotti da modelli diversi. Un hit della cache riutilizza tale identità del produttore anziché rietichettarla come piano di instradamento richiesto. La cache dei risultati dell'intero video utilizza come chiave ogni input che modifica l'output: prompt, modello effettivo, politica di campionamento, numero di fotogrammi, modalità di analisi semantica, fingerprint SHA-256 dell'indicazione di focus normalizzata, finestra di focus, `transcript`, `audioTranscript` e flag del contact sheet. Pertanto, la modifica di una qualsiasi di queste dimensioni produce un cache miss e mai il riutilizzo di dati obsoleti. Anche la versione, la soglia e il numero limitato di fotogrammi candidati della politica di deduplicazione visiva sono espliciti nella chiave e nei metadati della cache dei risultati; una modifica della politica non può quindi riutilizzare una descrizione obsoleta dell'intero video. I metadati v4 della cache dei risultati conservano la modalità e il fingerprint, ma mai l'attività utente non elaborata. I metadati dei guardrail riportano sia la modalità di analisi richiesta sia quella effettiva; una modalità `focused` richiesta senza testo utente utilizzabile viene indicata come effettivamente `full`.

Il guardrail estrae ogni parte video supportata, ma non ne descrive più di `modalityBridgeVideoMaxVideos`. Per una destinazione di cui è dimostrato `supportsVideo === false`, i video non riusciti e quelli oltre il limite diventano marcatori testuali sicuri ed espliciti, affinché non rimangano video non elaborati. Quando la funzionalità è sconosciuta, tali parti mantengono il proprio contenitore video; qualsiasi trascrizione di fallback segue la conversione testuale limitata descritta sopra. Le destinazioni con `supportsVideo === true` ignorano il bridge. Il segnale di interruzione della richiesta del client si propaga attraverso download, coda del broker, sottoprocessi e chiamate per la generazione delle didascalie; le interruzioni arrestano l'elaborazione tra un video e l'altro e non applicano mai un comportamento fail-open che lasci passare contenuti multimediali non elaborati.

Le impostazioni di runtime sono memorizzate nel DB e convalidate tramite Zod:

| Chiave                              | Valore predefinito | Intervallo / comportamento                                                                                       |
| ----------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`            | Runtime opzionale, con attivazione esplicita                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`           | `full` conserva le didascalie generiche; `focused` usa un contesto limitato e non attendibile dell'ultimo utente |
| `modalityBridgeVideoModel`          | `""`               | Eredita il modello Vision Bridge                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`                | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`        | `uniform`, `scene_aware` o `segment_aware` proporzionale; in caso di errore del rilevatore viene usato `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`                | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`           | 1000–120000 ms                                                                                                   |

I valori legacy persistenti del timeout Video superiori a 120 secondi vengono limitati alla
scadenza del broker; le nuove scritture delle impostazioni oltre tale limite vengono rifiutate.
`GET /api/modality-bridge/video/runtime` richiede una località loopback
attendibile e contrassegnata prima dell'autenticazione o dell'analisi del runtime, quindi richiede
l'autenticazione di gestione. Restituisce soltanto `available`, le versioni sanificate di FFmpeg/ffprobe e un motivo
fisso quando il runtime non è disponibile. L'endpoint interno di estrazione non è
un'API pubblica di caricamento: la saturazione della coda restituisce `503` più `Retry-After`, la
disconnessione del chiamante restituisce `499` e la scadenza fissa del broker restituisce `504`. Le risposte convertite aggiungono
`video->text;model=<visionModel>;parts=<videos>` all'header centrale
`x-omniroute-modality-bridge` senza rimuovere i segmenti Vision o Audio.

### Mascheratore PII (`piiMasker.ts`)

Viene eseguito in **entrambe** le fasi.

- **`preCall`** clona il payload, attraversa `system`, `messages`, `input` e
  `prompt` (inclusi gli elementi costituiti da stringhe semplici) e applica `processPII()` (da
  `@/shared/utils/inputSanitizer`) ai campi stringa `content`/`text`. Quando
  `PII_REDACTION_ENABLED=true`, le PII rilevate vengono oscurate nel
  payload in uscita. Ciò è indipendente da `INPUT_SANITIZER_MODE` (che controlla soltanto
  la politica contro la prompt injection). Quando l'oscuramento è disattivato, la chiamata registra i conteggi
  dei rilevamenti senza riscrivere il contenuto.
- **`postCall`** esegue un clone profondo della risposta, applica `sanitizePIIResponse()` e
  il mascheratore per il formato Responses API (`maskResponsesOutput` — copre
  `output_text` e `output[].content[].text`). Se si verifica un qualsiasi oscuramento, la
  risposta modificata sostituisce quella originale.

Il guardrail non blocca mai; si limita ad annotare (`meta.detections`,
`meta.redacted`) o a riscrivere.

#### Selezione per tipo, pattern personalizzati e contatori di rilevamento

**Dashboard → Impostazioni → Sicurezza → Mascheramento PII** consente di scegliere _che cosa_ mascherare. Non
attiva il mascheramento: questo dipende ancora da `PII_REDACTION_ENABLED` (richiesta) e
`PII_RESPONSE_SANITIZATION` (risposta + SSE), entrambi disattivati per impostazione predefinita.

- **Selezione per tipo** — gli ID integrati sono elencati in
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Se non impostato, indica tutti i
  tipi (il comportamento precedente all'introduzione di questa impostazione). Il pattern
  `ssn_us` del motore delle richieste viene mappato a `ssn`. I modelli (Minimo, Standard, Finanziario,
  Brasiliano, USA, Completo) compilano soltanto le caselle di controllo nell'interfaccia utente.
- **Pattern personalizzati** — fino a 20 pattern regex o con caratteri jolly (`*` = fino a 64
  caratteri diversi dagli spazi, `?` = uno). Le corrispondenze diventano `[CUSTOM_REDACTED]`.
  Ogni pattern viene elaborato da `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): massimo 500 caratteri, flag limitati
  a `g i m s u`, deve essere compilabile, deve superare `safe-regex` (backtracking
  catastrofico) e non deve corrispondere a una stringa vuota o a un segnaposto di oscuramento.
  Un pattern non valido viene rifiutato durante il salvataggio e il test, mentre una riga memorizzata
  non valida viene ignorata durante l'esecuzione anziché essere compilata. I pattern personalizzati vengono
  eseguiti soltanto quando il mascheramento è attivo.
- **Contatori di rilevamento** — conteggi per tipo (mai i valori corrispondenti), mantenuti in
  memoria e azzerati al riavvio (`src/lib/pii/piiDetectionStats.ts`). Aumentano soltanto
  quando il mascheramento è attivo.

Le impostazioni risiedono nella tabella `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e vengono lette tramite una cache di 1 s. API:

| Metodo | Percorso                 | Scopo                                                                                                    |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stato dei flag, `enabledTypes`, `customPatterns`, contatori di rilevamento                               |
| `PUT`  | `/api/settings/pii`      | Sostituisce `enabledTypes` (`null` = tutti) e/o `customPatterns`                                         |
| `POST` | `/api/settings/pii/test` | Esegue un test senza modifiche di un pattern su un campione di massimo 8 KB; non viene memorizzato nulla |

Tutti e tre richiedono l'autenticazione di gestione e convalidano il corpo con Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Rileva strutture avversarie nei contenuti forniti dall'utente e applica la
politica configurata. Il comportamento è determinato dalle variabili d'ambiente e dalle opzioni del
costruttore:

| Impostazione     | Variabile d'ambiente                                                                                   | Predefinito | Effetto                                                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Abilitato        | `INPUT_SANITIZER_ENABLED`                                                                              | `true`      | Quando è `false`, la guardrail termina immediatamente.                                                                                                                                                                                     |
| Modalità         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`      | Criterio per le injection: `block`, `warn` o `log`. (`redact` è accettato per retrocompatibilità, ma **non** rimuove il testo dell'injection; la riscrittura dei dati personali nella richiesta è controllata da `PII_REDACTION_ENABLED`.) |
| Soglia di blocco | Opzione `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Gravità minima richiesta per il blocco. Con l'impostazione predefinita, la gravità media prevede la sola osservazione.                                                                                                                     |

**Precedenza della modalità** (`getMode`): `options.mode` del chiamante →
**override del feature flag nel DB** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → variabile d'ambiente `INJECTION_GUARD_MODE` → variabile d'ambiente `INPUT_SANITIZER_MODE` →
`warn`. Un override dalla dashboard ha quindi la precedenza sulle variabili d'ambiente, consentendo
all'interfaccia Feature Flags di controllare in tempo reale la guardrail in esecuzione (senza riavvio). La lettura
dal DB è fail-safe: in caso di errore, la guardrail torna al comportamento basato sulle variabili d'ambiente
e, quando non è impostato alcun override, il comportamento è identico alla risoluzione basata esclusivamente
sulle variabili d'ambiente.

Fonti di rilevamento:

1. `sanitizeRequest()` da `@/shared/utils/inputSanitizer` (insieme condiviso di
   rilevatori utilizzato in altri punti della pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrati (attualmente `system_override_inline` e
   `markdown_system_block`, entrambi con gravità `high`).
3. `customPatterns` facoltativi passati tramite le opzioni del costruttore (stringhe, espressioni regolari
   o record `{ name, pattern, severity }`).

Quando `mode === "block"` **e** almeno un rilevamento raggiunge la soglia di
gravità, `preCall` restituisce `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nelle modalità `warn`/`log`, la guardrail registra
l'evento nei log ma consente la chiamata. L'helper condiviso `evaluatePromptInjection()` viene inoltre esportato
per i chiamanti che devono valutare i prompt senza passare dal registro.

**Limite di scansione (v3.8.20):** il rilevatore esamina solo i **primi 16 KB** del
testo concatenato del prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 byte) in
`src/shared/utils/inputSanitizer.ts`. Sia `detectInjection()` sia
`evaluatePromptInjection()` eseguono `slice(0, MAX_INJECTION_SCAN_BYTES)` prima di avviare
il ciclo sui pattern. Le direttive di injection si trovano vicino all'inizio di un input, quindi questo
limita l'utilizzo di CPU/GC dovuto alle espressioni regolari su payload di centinaia di KB senza indebolire il rilevamento (cfr.
#3932, #4041).

### Mascheramento delle credenziali (`credentialMasker.ts`)

Viene eseguito in **entrambe** le fasi, per ultimo nella catena predefinita (priorità `95`). Oscura
i pattern noti di chiavi API/token segreti nel payload in uscita (contenuto dei messaggi,
argomenti delle chiamate agli strumenti, risultati degli strumenti) **e** nella risposta del provider, in modo che una
credenziale incollata in un prompt (o restituita da un risultato di uno strumento) non venga divulgata
al provider upstream o al client.

- **Solo su attivazione esplicita**, secondo la stessa convenzione dell'oscuramento dei dati personali (in prossimità della regola rigida n. 20):
  è disabilitato a meno che `settings.credentialRedactionEnabled === true` **oppure**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando è disattivato, la guardrail non esegue alcuna operazione:
  non blocca e non riscrive mai.
- `redactCredentials()` attraversa l'intero albero del payload/della risposta (`walkValue()`,
  protetto dalla prototype pollution e dai cicli tramite `WeakSet`) e sostituisce le corrispondenze con
  un segnaposto `[REDACTED:<type>]`, clonando solo i rami effettivamente
  modificati.
- `CREDENTIAL_PATTERNS` copre le chiavi dei provider LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), i token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), le chiavi di pagamento (Stripe, Square), le chiavi
  cloud (chiave di accesso AWS, Twilio, SendGrid, Mailgun), chiavi private/JWT,
  stringhe di connessione contenenti credenziali (`mongodb://user:pass@...`, ecc.) e
  un pattern generico per i valori degli header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Le chiavi con formato da header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) vengono oscurate strutturalmente (solo il valore, mantenendo il prefisso dello schema come
  `Bearer `/`Basic `) anziché tramite l'espressione regolare generica per il testo.
- La guardrail non blocca mai; si limita a riscrivere (`modifiedPayload` /
  `modifiedResponse`) e ad annotare (`meta.credentialsRedacted`, `meta.count`).

Protezione dalle regressioni: `tests/unit/credential-masker-guardrail.test.ts`.

## Contratto Base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true interrompe la catena
  message?: string; // mostrato quando bloccato
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // restituito da preCall per riscrivere la richiesta
  modifiedResponse?: TValue; // restituito da postCall per riscrivere la risposta
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un guardrail segnala "nessun cambiamento" restituendo `void`, `{}`, o
`{ block: false }`. Restituire un `modifiedPayload`/`modifiedResponse` sostituisce
il valore che scorre attraverso la catena per i guardrail a valle.
`signal?: AbortSignal` porta il ciclo di vita del chiamante nei guardrail. Un aborto di richiesta è l'eccezione deliberata di fail-open: i bridge multimediali interrompono il lavoro e la pulizia senza ripristinare i media grezzi a un target noto per non supportarli.

## Registro (`registry.ts`)

Il singleton `guardrailRegistry` espone:

- `register(guardrail)` — aggiunge (o sostituisce per nome normalizzato) un guardrail e
  riordina per `priority` crescente.
- `clear()` / `list()` — helper amministrativi.
- `runPreCallHooks(payload, context)` — itera i guardrail attivi, passa il
  payload attraverso `modifiedPayload` e si ferma al primo `block: true`.
- `runPostCallHooks(response, context)` — stesso flusso sul lato della risposta.
- `resetGuardrailsForTests({ registerDefaults })` — cancella lo stato e opzionalmente
  registra nuovamente i valori predefiniti per un isolamento pulito dei test.

Entrambi i runner restituiscono `{ blocked, payload|response, results, guardrail?, message? }`
dove `results` è un array di record `GuardrailExecutionResult` che includono
i campi `blocked`, `skipped`, `modified`, `error` e `meta` per ogni guardrail,
utili per la tracciatura.

### Disabilitazione dei Guardrail per Richiesta

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggrega un
elenco deduplicato di nomi di guardrail che dovrebbero essere saltati per la richiesta
corrente. Fonti (tutte opzionali, tutte unite):

- `apiKeyInfo.disabledGuardrails`
- Corpo della richiesta `disabledGuardrails` (livello superiore)
- Corpo della richiesta `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (o il legacy
  `x-disabled-guardrails`)

I valori possono essere array di stringhe o una stringa separata da virgole; i nomi sono
normalizzati in kebab-case minuscolo (`pii_masker` → `pii-masker`). Il risultato
viene passato tramite `context.disabledGuardrails` al registro, che salta
i guardrail corrispondenti (`skipped: true` in `results`).

## Ordine di Esecuzione

Per ogni richiesta che transita attraverso `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` costruisce la lista di esclusione dalla chiave API, dal corpo e dagli header.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` esegue i guardrail in ordine di priorità crescente:
    - I guardrail disabilitati vengono registrati come `skipped`.
    - Il `preCall` di ogni guardrail può riscrivere il payload tramite `modifiedPayload`.
    - Il primo `block: true` interrompe la catena e l'handler restituisce una risposta di rifiuto del guardrail.
3.  Il payload (potenzialmente riscritto) fluisce nel routing combinato e nel dispatch a monte.
4.  Dopo che la risposta è stata assemblata, `guardrailRegistry.runPostCallHooks(...)` esegue la stessa catena sulla risposta. `block: true` qui scarta la risposta a monte.

I guardrail che generano un errore vengono registrati con `error: <message>` e loggati tramite
`logger.warn`, ma la catena continua — fail-open per design.

## Configurazione

Variabili d'ambiente lette dai guardrail integrati:

| Variabile                             | Usata da                  | Effetto                                                                                                                              |
| :------------------------------------ | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Impostare `false` per disabilitare completamente il rilevamento.                                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politica di iniezione: `warn`, `block`, o `log`. Il valore legacy `redact` non riscrive il testo di iniezione.                       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modalità per il guardrail di iniezione; anche un flag di funzionalità del DB che **sovrascrive** le variabili d'ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Gravità minima che `MODE=block` rifiuta: `high` (predefinito), `medium`, o `low`.                                                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legacy per `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando `true`, le PII della richiesta vengono redatte (indipendentemente dalla modalità di iniezione).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controlla il comportamento del masker lato risposta.                                                                                 |

I guardrail di Modality Bridge leggono la configurazione di runtime dal
repository di impostazioni basato su DB (`getSettings()`), non dalle variabili d'ambiente. Le chiavi primarie di Vision sono
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, e
`modalityBridgeCacheMaxEntries`. Le chiavi legacy
`visionBridge*` sono accettate solo come fallback di lettura a ciclo singolo documentato; le scritture della dashboard utilizzano le chiavi primarie. I valori predefiniti e il risolutore di fallback si trovano in `src/shared/constants/modalityBridgeDefaults.ts`, con le costanti legacy mantenute in `src/shared/constants/visionBridgeDefaults.ts`.

Audio utilizza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, e `modalityBridgeAudioMaxClips`, più le impostazioni condivise
`modalityBridgeCache*`. Audio non ha un fallback per le chiavi legacy perché queste
chiavi sono state introdotte con lo schema Modality Bridge.

Video utilizza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, e
`modalityBridgeVideoTimeout`, più le impostazioni condivise `modalityBridgeCache*`.
È disabilitato per impostazione predefinita perché FFmpeg/ffprobe sono dipendenze operative opzionali e la didascalia dei fotogrammi aggiunge latenza e costi del modello.

## Guardrail Personalizzati

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Passi:

1. Creare `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implementare `preCall` e/o `postCall`.
3. Registrare al momento dell'importazione (push da `registerDefaultGuardrails`) o
   chiamare `guardrailRegistry.register(...)` a runtime — il registro sostituisce
   qualsiasi guardrail precedente con lo stesso nome normalizzato.
4. Aggiungere test sotto `tests/unit/` (esempi esistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test

Usare `resetGuardrailsForTests()` tra i test per partire da uno stato noto.
Passare `{ registerDefaults: false }` per iniziare con un registro vuoto e
registrare solo i guardrail sotto test. Vision Bridge accetta l'iniezione di dipendenza
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge espone i
punti di giunzione equivalenti per impostazioni, capacità, selezione del modello STT, controlli delle credenziali e trascrizione. I test possono quindi esercitare entrambi i flussi senza accesso al DB o alla rete.

## Vedi Anche

- `src/lib/guardrails/` — implementazione
- `src/shared/utils/inputSanitizer.ts` — rilevatore condiviso che alimenta
  l'iniezione di prompt e il mascheramento PII
- `src/shared/constants/visionBridgeDefaults.ts` — impostazioni predefinite di Vision Bridge e
  lista di modelli forzati
- `src/shared/constants/modalityBridgeDefaults.ts` — impostazioni predefinite di runtime condivise Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — livello ortogonale (interruttore di circuito, cooldown)
- `docs/reference/ENVIRONMENT.md` — riferimento completo alle variabili d'ambiente

## Copertura delle rotte di protezione dall'iniezione e red-team (Fase 8 · Blocco D)

La protezione dall'iniezione (`createInjectionGuard` / `withInjectionGuard`) copre tutte le rotte
che accettano prompt utente. Rispetta `INJECTION_GUARD_MODE` (predefinito `warn` = solo log;
`block` = restituisce HTTP 400 `SECURITY_001`).

| Tipo              | Rotte                                                                                                                                                | Modalità predefinita |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Testo (esistente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Dati              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

L'estrazione del testo (`extractMessageContents`) copre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (notturno, `nightly-llm-security.yml`):** promptfoo verifica che ogni rotta blocchi
il corpus OWASP-LLM in `INJECTION_GUARD_MODE=block`; garak esegue probe (salta senza segreto).
`moderations` è incluso per coerenza — gli operatori in modalità blocco possono esentarlo tramite
`resolveDisabledGuardrails`.

Il workflow notturno (`.github/workflows/nightly-llm-security.yml`, cron + dispatch manuale)
ha due job:

- **`promptfoo-guard` (bloccante)** — esegue `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Ogni caso avversario (es. "ignora tutte
  le istruzioni precedenti...", jailbreak stile DAN) asserisce che la risposta contenga
  `error.code === "SECURITY_001"`, cioè che la protezione abbia effettivamente rifiutato la richiesta.
- **`garak` (consultivo)** — esegue garak `--probes promptinject,dan,leakreplay`
  contro un'istanza locale di OmniRoute (`http://localhost:20128/v1`). Vincolato a un
  segreto del provider (`PROMPTFOO_PROVIDER_KEY`); salta elegantemente ed è suffissato
  `|| true`, quindi riporta senza far fallire la CI.

La copertura dell'helper di protezione (`createInjectionGuard` / `withInjectionGuard`)
si estende a ogni rotta `/v1` che trasporta prompt; il testo del prompt viene estratto da
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` tramite
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
