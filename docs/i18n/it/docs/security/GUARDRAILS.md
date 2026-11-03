# Guardrails (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte di verità:** `src/lib/guardrails/`
> **Ultimo aggiornamento:** 2026-10-17 — v3.8.52 (aggiunta [Copertura e limiti](#coverage-and-limits):
> quali route e percorsi di risposta raggiungono gli hook, gli header di disabilitazione combinati (#16412), la modalità di blocco delle injection come confine obbligatorio (#16413) e cosa vede una risposta prima della post-call)

I guardrail applicano controlli di sicurezza, policy e trasformazioni dei contenuti al confine tra OmniRoute e i provider upstream. Ogni guardrail può ispezionare (ed eventualmente rifiutare, trasformare o annotare) i payload delle richieste (`preCall`) e le risposte upstream (`postCall`).

Il sistema è **fail-open**: se un guardrail genera un'eccezione durante l'esecuzione, il registro registra l'errore e continua con il guardrail successivo invece di far fallire la richiesta. Il blocco è una decisione esplicita (`block: true`), mai un incidente. L'unica eccezione è una richiesta interrotta: quando il `signal` del chiamante viene annullato, un guardrail che genera un'eccezione rigetta l'esecuzione dell'hook invece di essere saltato.

Gli hook **non** vengono eseguiti su ogni route né su ogni risposta. Leggere
[Copertura e limiti](#coverage-and-limits) prima di fare affidamento su un guardrail come controllo di sicurezza.

## Guardrail integrati

Il registro carica automaticamente sei guardrail in ordine di priorità all'importazione (vedi `registry.ts` → `registerDefaultGuardrails()`):

| Priorità | Nome                | Fase(i)        | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Vengono eseguiti i numeri con priorità inferiore** Primo** .

### Vision Bridge (`visionBridge.ts`) — Modalità Bridge PR-1

Il modello base GLM 5.3 e `glm-5.3-{low,high,max}` hanno metadati `supportsVision:false` registry/spec espliciti. Le varianti GLM 5.3 Flash rimangono modelli con visione nativa. Il percorso `/v1/messages` di Claude Code entra nella catena guardrail pre-chiamata `handleChat` condivisa** Prima** Traduzione da Claude a OpenAI; Le immagini dei risultati dello strumento `Read` nidificate devono essere descritte o gestite prima che la traduzione le inoltri nel contenuto OpenAI `image_url` (#17069).

Intercetta richieste portatrici di immagine mirate** modelli non visivi** e reindirizza l'intera richiesta a un modello compatibile con la visione o sostituisce le parti dell'immagine con descrizioni di testo prodotte da un modello di visione configurabile prima della chiamata a monte. Ciò consente ai provider di solo testo di gestire in modo trasparente i payload multimodali.

Fluire:

1. Salta se il modello di destinazione supporta già la visione (a meno che non appaia nell'elenco dei ponti forzati `isVisionBridgeForcedModel`).
2. Estrai parti dell'immagine tramite `extractImageParts(messages)` (`visionBridgeHelpers.ts`), che delega a** rilevatore multimediale unificato** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — l'unica fonte di verità condivisa con il filtro di compatibilità combinato. L'estrazione è consentita per le forme `replaceImageParts` può ricomporre (l'estrazione ↔ sostituisce il contratto): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` e Responses API `input_image`. Anche le immagini corrispondenti nidificate all'interno del codice Claude `tool_result.content` e degli output dello strumento Risposte vengono estratte e sostituite nei percorsi originali; le forme di solo indicatore sono materiale di filtro combinato e non vengono estratte. Salta se non ne viene trovato nessuno.
3. Risolvi la configurazione di runtime tramite `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): vincono i nuovi tasti delle impostazioni `modalityBridge*` ; le chiavi `visionBridge*` legacy rimangono a** fallback a un ciclo** (finestra di ripristino). Salta prima di qualsiasi attraversamento multimediale quando il bridge è disabilitato.
4. Il selettore della modalità (`modalityBridgeVisionMode`, vedere la tabella seguente) decide il reindirizzamento o la descrizione. Il reindirizzamento restituisce `modifiedPayload` con solo `model` scambiato, più meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Descrivi il percorso: copri le immagini su `maxImages`, componi il prompt in base all'attività, consulta la cache di descrizione, chiama il modello di visione** in parallelo** (`Promise.allSettled`) e iniettare parti di testo `[Image N]: <description>` al loro posto. Una descrizione non riuscita produce `null`: l'immagine grezza viene conservata per le destinazioni unknown/vision-capable (#4012), ma a** target diretto confermato di solo testo** oppure la combinazione zero-vision ottiene uno stub di testo `(unavailable — no vision-capable provider connected)` esplicito per ogni immagine non descritta, inclusi guasti parziali e immagini oltre il limite di descrizione-chiamata (#17069). La combinazione esistente di tutti i fallimenti descrive il fallback rimane in vigore (#8430).
6. Restituisce `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selettore modalità (`modalityBridgeVisionMode`)

| Modalità   | Predefinito | Comportamento                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔           | Euristica legacy, intatta (#6640/#7204): i modelli non combinati/`auto/` reindirizzano al modello di visione migliore a meno che il modello originale non abbia già credenziali utilizzabili (quindi descrivere); gli obiettivi combinati descrivono sempre.                                                                                                 |
| `describe` |             | Descrivi sempre — il blocco del reindirizzamento viene saltato completamente; risponde sempre il modello scelto dall'utente.                                                                                                                                                                                                                                 |
| `reroute`  |             | Reindirizzamento forzato: la protezione del modello di mantenimento delle credenziali viene aggirata. Il reindirizzamento-** bersaglio** la guardia delle credenziali applica ancora — quando non esiste un target di visione utilizzabile, il bridge si blocca con un errore chiaro anziché descrivere o inviare immagini grezze a un target di solo testo. |

Cortocircuito nelle modalità forzate** Prima** l'euristica automatica viene eseguita; Il comportamento `auto` è identico in byte al guardrail pre-PR-1.

#### Ambito della chiave API (`visionBridgeKeyScope.ts`)

Quando la chiave API del chiamante limita `allowedConnections`, quote pool (`allowedQuotas`) o modelli (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), il bridge seleziona solo il reindirizzamento e descrive i modelli che la chiave può utilizzare, sulle connessioni che la chiave può utilizzare. La chiamata di descrizione passa quindi sempre attraverso il ciclo automatico OmniRoute con l'intestazione `x-omniroute-self-loop-key-id`, quindi la richiesta di chat ricevente applica nuovamente la connessione di quella chiave e la policy del modello. `enforceApiKeyPolicy()` rispetta quell'intestazione solo insieme al portatore del self-loop, quindi può solo restringere l'accesso e un ID che non si risolve viene rifiutato.

Se per la chiave non è consentito alcun modello di visione, a** target di solo testo confermato** rifiuta la richiesta dell'immagine localmente con un clear HTTP 400 invece di inoltrare i byte dell'immagine a un upstream incapace (#17069). Per i target con capacità di visione sconosciuta o nativa, il percorso di descrizione mantiene il precedente comportamento di apertura in caso di errore (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Le richieste senza chiave e le chiavi senza queste restrizioni si comportano esattamente come prima.

#### Prompt di descrizione task-aware (`modalityBridgeVisionTaskAware`)

Predefinito** VERO** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) aggiunge il testo del** ultimo messaggio dell'utente** (troncato a 500 caratteri) al prompt di descrizione base, indirizzando la descrizione verso ciò che l'utente ha effettivamente chiesto (pattern codex-vision-proxy) e chiedendo al modello di visione di trascrivere il testo visibile. Con il flag disattivato — o senza testo utente — il prompt di base viene utilizzato senza modifiche.

La richiesta compatibile con OpenAI del description self-loop (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) richiede sempre `image_url.detail: "high"` — incondizionatamente, per ogni caller/provider, senza gate su alcun segnale del client. Il campionamento a basso dettaglio riduce l'accuratezza OCR esattamente per l'attività di trascrizione del testo richiesta da questo prompt, quindi la chiamata di descrizione stessa richiede sempre un dettaglio elevato indipendentemente dal livello di dettaglio utilizzato dalla richiesta in entrata originale. Ciò influisce solo sul corpo della richiesta di descrizione interna; non cambia il modo in cui OmniRoute inoltra lo `image_url.detail` del chiamante sulla richiesta primaria — l'impostazione predefinita viene applicata separatamente e solo per i client OpenCode rilevati, in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il ramo in formato wire Anthropic del ciclo automatico di descrizione non ha un campo `detail` e non è influenzato da nessuna delle due impostazioni predefinite.

#### Descrivere il limite di output (`modalityBridgeVisionMaxChars`)

| Chiave                         | Predefinito | Allineare       |
| ------------------------------ | ----------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` o 100–50000 |

`0` (predefinito) significa** nessun tappo** — la descrizione restituita da `callVisionModel()` viene passata senza modifiche, preservando il comportamento esistente. Qualsiasi valore nell'intervallo 100–50000 tronca la descrizione con un suffisso `…` prima che venga ricomposta come `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Aumentarlo per attività OCR ricche di dettagli in cui il modello downstream necessita della trascrizione completa; abbassarlo per limitare l'utilizzo dei token sui modelli di visione loquace. Il campo del dashboard si trova nel pannello Avanzate della scheda Visione (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) e blocca qualsiasi valore compreso tra 1 e 99 fino al piano 100 lasciando intatto un `0` esplicito. — `0` è un valore Zod valido di per sé (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), non semplicemente il valore predefinito "non impostato".

#### Descrivi la cache (`modalityBridge/bridgeCache.ts`)

Cache in memoria LRU + TTL per descrivere gli output, condivisi a livello di processo. Chiave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` con inquadratura del prefisso di lunghezza (nessuna collisione tra i confini del campo). Il componente del modello è il** configurato** Il modello bridge, non il modello che ha effettivamente risposto — `callVisionModel` potrebbe ricadere internamente e la digitazione per tentativo frammenterebbe la cache. Le descrizioni non riuscite non vengono mai memorizzate nella cache. Impostazioni:

| Chiave                          | Predefinito | Allineare |
| ------------------------------- | ----------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`      | —         |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000   |

#### Normalizzazione dell'immagine remota (recupero describe/base64 self-loop)

Quando il bridge recupera a** remoto** l'immagine stessa — Anthropic descrive la chiamata automatica e la conversione base64 in formato claude-wire (`ensureBase64ImagesForClaudeWire`), entrambi tramite `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — i dati risultanti URI vengono passati attraverso `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prima di essere incorporati nella richiesta del modello di visione. Le immagini sovradimensionate vengono ridotte a a** Lato lungo 2048px** (la corrispondenza del limite di ridimensionamento OpenAI/Anthropic si applica già sul lato server), che riduce il caricamento bytes/latency senza modificare ciò che vede il modello di visione. Il ridimensionamento utilizza `sharp`, caricato tramite importazione dinamica: su una piattaforma in cui il suo binario nativo non riesce a caricarsi, `normalizeDataUri()`** non lancia mai** — ricade su un passthrough dei byte originali, quindi il percorso describe/base64-conversion continua sempre a funzionare. Anche i byte non di immagine (un recupero che non ha restituito un'immagine decodificabile) vengono passati intatti. Questa normalizzazione è mirata alle immagini che il bridge recupera per la propria chiamata automatica — e non viene mai applicata al payload passthrough grezzo del chiamante, in linea con il principio di mutazione opt-in-only (regola dura n. 20).

#### Schema delle impostazioni migrazione +

Le nuove chiavi `modalityBridge*` sono convalidate da Zod in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, il trio `modalityBridgeCache*` e il gruppo `modalityBridgeAudio*` utilizzato da Audio Bridge. La migrazione `141_modality_bridge_settings.sql` copia i valori `visionBridge*` legacy esistenti nelle nuove chiavi corrispondenti (idempotente, non sovrascrive mai un valore `modalityBridge*` impostato dall'operatore); le chiavi legacy rimangono accettate come fallback di lettura per un ciclo di rilascio.

#### Statistiche + dell'intestazione sulla trasparenza

Le risposte trasformate in descrizione portano `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (costruito da `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, stampato da `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Le richieste reindirizzate ottengono** NO** header — il payload non è stato toccato e lo scambio di modelli è già visibile nel campo `model` del corpo della risposta.

`GET /api/modality-bridge/stats` (autenticazione di gestione, stesso livello di `GET /api/settings`) restituisce i contatori per modalità in memoria `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` per `vision`, `audio` e `video`. `averageLatencyMs` usa `latencySamples`, non tutti i tentativi, come denominatore; un'operazione senza temporizzazione non fabbrica un campione da zero millisecondi. `bridged` rimane l'alias compatibile con le versioni precedenti per conversioni riuscite; i tentativi falliti non lo incrementano. I contatori vengono reimpostati al riavvio del processo in base alla progettazione (telemetria, non contabilità).

#### Configurazione del cruscotto

La pagina della dashboard dedicata è `/dashboard/settings/modality-bridge`. Le sue schede `Vision`, `Audio` e `Video` indirizzabili tramite URL preservano i parametri di query mentre cambiano il valore `tab`. La scheda Visione espone l'abilitazione, la modalità, la selezione del modello (inclusa l'impostazione predefinita automatica), i suggerimenti in base alle attività, i limiti timeout/image/description-length/cache avanzati, i contatori di runtime e una richiesta di campione protetta. Anche la scheda Audio è attiva: espone l'abilitazione, un selettore di modelli solo STT con Auto, limiti timeout/max-clip, contatori audio e un test di esempio `input_audio`. La scheda Video è funzionale: segnala lo stato di runtime FFmpeg/ffprobe — uno dei quattro stati UI espliciti (`unknown` mentre la sonda è in volo o non è stata completata, `restricted` su un host dashboard non loopback in cui la sonda viene saltata sul lato client, `unavailable` una volta sondata e confermata mancante o `available` con le versioni FFmpeg/ffprobe ) — mantiene i limiti enable/model/frame/video/timeout, filtra il selettore di modelli in modelli con funzionalità di visione ed espone i contatori video.

La precedente scheda Vision Bridge nelle impostazioni AI è un collegamento di compatibilità alla nuova pagina; non possiede più una seconda copia del modulo. I fornitori di contenuti multimediali collegano inoltre i flussi di lavoro Image-to-Text e Speech-to-Text alle corrispondenti schede Modality Bridge senza rimuovere il parco giochi Speech-to-Text esistente.

**Bypass di ammissione a circuito automatico:** quando la chiamata di descrizione instrada attraverso il self-loop `/v1` di OmniRoute(modello di provider non standard), la sottorichiesta invia `x-omniroute-admission-bypass: internal` e viene autenticata con la credenziale self-loop risolta — la sentinella `sk_omniroute` locale in modalità locale o la chiave `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env configurata dall'operatore (#1350), in modo che le distribuzioni `REQUIRE_API_KEY=true` possano comunque eseguire la chiamata di descrizione. Il bypass viene rispettato solo per quelle credenziali esatte, quindi i client esterni non possono utilizzare l'intestazione per saltare l'ammissione.

Le impostazioni predefinite legacy risiedono in `src/shared/constants/visionBridgeDefaults.ts`; le nuove impostazioni predefinite mode/task-aware/cache e il risolutore delle impostazioni risiedono in `src/shared/constants/modalityBridgeDefaults.ts`. Il guardrail espone un'opzione del costruttore `deps` in modo che i test possano iniettare implementazioni `getSettings` e `callVisionModel` false.

### Audio Bridge (`audioBridge.ts`) — Modalità Bridge PR-3

Intercetta le richieste di chat contenenti audio prima che raggiungano una destinazione che non è nota per accettare input audio. Non reindirizza mai la richiesta di chat: le parti audio vengono trascritte attraverso l'endpoint multiparte compatibile con OpenAI esistente e il modello di chat scelto continua con le trascrizioni del testo.

Fluire:

1. Risolvi `supportsAudio` tramite `getResolvedModelCapabilities()`. Prevalgono i metadati espliciti del registro del provider, quindi i metadati del modello statico, quindi sincronizzati `modalities_input`. Una lista di input dichiarata senza `audio` è `false`; non rimane alcuna prova di capacità `null`. Sia `false` che `null` attivano il ponte conservativo, mentre `true` lo bypassa.
2. Risolvi le impostazioni `modalityBridgeAudio*` ed estrai parti audio di livello superiore unibili da ogni messaggio attraverso il rilevatore `detectMediaParts()` condiviso. Le forme dei fili supportate sono OpenAI `input_audio`, `audio_url` e `source.media_type: "audio/*"`. L'audio nidificato viene rilevato per l'instradamento ma non rimosso dal percorso di giunzione. Il lavoro è limitato da `modalityBridgeAudioMaxClips`; le parti successive rimangono intatte.
3. Onora uno `provider/model` configurato o lascia che `selectAudioBridgeModel()` cammini `AUDIO_TRANSCRIPTION_PROVIDERS` nell'ordine del catalogo stabile e seleziona il primo modello con una credenziale di fornitore attivo utilizzabile.
4. `callAudioTranscription()` converte l'audio base64/data-URI in uno `file` multiparte o scarica uno `audio_url` remoto tramite la protezione in uscita solo pubblica con blocco DNS e limite 25 MB. Quindi POSTs il file e il modello selezionato nel self-loop `/v1/audio/transcriptions` locale, autenticato con `resolveSelfLoopBearer()`. Il percorso di trascrizione esistente esegue la normale ricerca delle credenziali, la gestione cooldown/rate-limit e l'invio del provider.
5. Le chiamate riuscite sostituiscono le loro parti con `[Audio N]: <transcript>`. Chiamate eseguite con `Promise.allSettled`: un errore individuale preserva quella parte audio originale (contratto #4012). Se ogni chiamata fallisce e l'obiettivo viene dimostrato `supportsAudio === false`, le parti diventano `[Audio N]: (unavailable — no STT provider connected)` (contratto #8430). Per un bersaglio sconosciuto (`null`), un risultato di fallimento totale rimane inalterato. Una destinazione comprovata di solo testo senza credenziali STT utilizzabili riceve lo stesso stub esplicito senza emettere una chiamata di rete.

Le trascrizioni riuscite utilizzano la cache Modality Bridge LRU/TTL a livello di processo. La chiave combina il riferimento audio, l'etichetta operativa `audio-transcription` stabile e il modello STT selezionato; gli errori non vengono mai memorizzati nella cache. I tentativi audio aggiornano i contatori `bridged`, `cacheHits`, `failures` e `lastUsedAt` condivisi. Le risposte trasformate portano `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; le richieste non modificate non ricevono un segmento Audio Bridge.

Le impostazioni di runtime sono supportate da DB e convalidate da Zod:

| Chiave                        | Predefinito | Allineare     |
| ----------------------------- | ----------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —             |
| `modalityBridgeAudioModel`    | `""`        | Auto o STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10          |

La cache condivisa rimane controllata da `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercetta parti video di primo livello nei Completamenti chat `messages` e Risposte API `input` prima che venga chiamata una destinazione senza supporto video nativo noto. Le forme supportate sono `input_video`, `video_url`, `video_source`, HTTPS URLs e `data:video/*;base64,...` data URIs. I nomi di file semplici nel testo non vengono trattati come video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) possiede l'attraversamento delle richieste, il controllo capability/policy, l'aggregazione per richiesta e il payload della risposta. Acquisizione — per-video, la cache dell'intero risultato, che descrive una sequenza di fotogrammi (che fonde qualsiasi trascrizione audio dichiarata dal chiamante) e per-tentativo metrics/abort/cleanup — è nascosto dietro `processVideoPart` in `videoBridgePipeline.ts`, chiamato una volta per parte video all'interno del loop di `preCall`. Quel modulo definisce anche i confini espliciti della porta `VideoMediaBrokerPort` (acquisizione di byte ed estrazione di frame campionati), `VideoAudioTranscriptionPort` (fondendo una trascrizione audio dichiarata dal chiamante con le didascalie campionate) e `VideoDrilldownPort` (il limite di persistenza del drill-down del frame; non ancora collegato a `processVideoPart` — solo il percorso `/api/modality-bridge/video/drilldown` separato scrive oggi le voci di drill-down).

Il percorso pubblico della richiesta `/v1` non importa né richiama mai un sottoprocesso. I video remoti vengono scaricati con un limite di 50 MiB ; I video base64 in linea hanno un limite conservativo per video decodificato di 36 MiB in modo che la busta model/messages/framing possa rimanere all'interno del limite di ammissione della richiesta JSON pubblica di 50 MiB. Le stime sulla lunghezza in linea e sulle dimensioni decodificate vengono controllate prima dell'allocazione. HTTPS è richiesto sul URL remoto iniziale e su ogni reindirizzamento, utilizzando la protezione in uscita esistente solo pubblica con blocco DNS. I byte attraversano quindi l'esatto limite interno del broker `POST /api/modality-bridge/video/extract`. Tale percorso è sia `LOCAL_ONLY` che `SPAWN_CAPABLE`, accetta solo una richiesta di loopback attendibile autenticata per processo e non accetta mai URL, percorso del file system, eseguibile o elenco di argomenti. La pipeline API body-size e il lettore incrementale del corpo del gestore applicano in modo indipendente un limite di input del broker di 50 MiB. La sua coda delimitata esegue un'estrazione alla volta, consente quattro lavori in sospeso e limita l'input in sospeso a 100 MiB.

All'interno del broker, `ffprobe` legge un file locale privato; la lista consentita del formato fisso esclude playlist e formati manifest. Per i contenitori della famiglia MOV consentiti, i riferimenti ai dati MOV esterni rimangono disabilitati per impostazione predefinita e il comando fisso non li attiva. Sia `ffprobe` che `ffmpeg` utilizzano la whitelist del protocollo `file` -only, un thread, array di argomenti fissi, nessuna shell ed eseguibili risolti da `PATH`. I flussi di copertina con immagini allegate non sono candidati riproducibili. Tutti i flussi riproducibili devono soddisfare i limiti ed è preferibile un flusso predefinito esplicito prima del fallback deterministico con l'indice più basso. I video sono limitati a 600 secondi, 8.192 pixel per dimensione e 33.554.432 pixel sorgente. FFmpeg campiona da 1 a 16 fotogrammi JPEG del punto medio, riduce il bordo lungo fino a un massimo di 1.024 pixel senza eseguire l'upscaling degli input più piccoli e non riceve mai un URL. Il campionamento è `uniform` per impostazione predefinita. Le policy `scene_aware` opzionali e `segment_aware` sperimentali eseguono un ulteriore passaggio FFmpeg fisso sul flusso locale già convalidato, selezionano timestamp di scena `showinfo` limitati e ricadono deterministicamente sugli stessi punti medi uniformi in caso di guasto del rilevatore, timeout, output non valido o set di candidati vuoto. La modalità sensibile al segmento assegna campioni del punto medio proporzionalmente agli intervalli di scena convalidati; le prove basate sul segmento e il comportamento di fallback sono descritti in dettaglio di seguito. Il limite rigido di 16 frame viene applicato dopo la selezione in ogni policy. Quando una richiesta sensibile alla scena ha un budget di solo un fotogramma, utilizza il punto medio uniforme della finestra full-video o focus attiva e segnala `policyEffective: uniform`: un singolo fotogramma della scena selezionato non può preservare entrambe le estremità temporali. Un chiamante può facoltativamente fornire una finestra di focus finita (`start`/`end` secondi); i limiti sono vincolati alla durata del supporto, le finestre invertite o non finite vengono rifiutate e tutte le politiche di campionamento vengono eseguite solo all'interno dell'intervallo normalizzato. La finestra risultante è inclusa nei metadati di campionamento e nel prefisso della descrizione non attendibile in modo che i modelli downstream possano distinguere un estratto mirato dalla sequenza temporale completa.

Il focus delle didascalie semantiche è un'impostazione separata ed esplicita. La modalità di analisi `full` predefinita preserva il prompt del frame esistente e non inoltra mai il testo della richiesta al modello di didascalia. In modalità `focused`, il bridge legge solo l'ultimo `text`/`input_text` non vuoto creato dall'utente dallo stesso contenitore Chat o Risposte, lo normalizza in NFC, comprime i caratteri di controllo e gli spazi bianchi e lo limita a 500 punti di codice Unicode. Un risultato vuoto ritorna al prompt `full` esatto. Un suggerimento utilizzabile viene serializzato come JSON in un blocco dedicato al contesto utente non attendibile e può dare priorità solo ai dettagli osservabili; non può ignorare l'avvertimento separato di seguire le istruzioni visibile o udibile nei media. Il focus testuale non deduce mai `start`/`end` né modifica il campionatore temporale.

#### FU-07 evidenza del segmento strutturale

`segment_aware` utilizza un passaggio di pre-analisi limitato sul flusso video locale già convalidato. La catena di filtri fissi prima si ridimensiona fino a un massimo di 320 pixel di larghezza, rileva i cambiamenti di scena e gli intervalli congelati, quindi campiona a 1 fotogramma al secondo le informazioni su sfocatura, luminanza media e spatial/temporal. Il passaggio è limitato a 600 campioni strutturali, un thread FFmpeg/filter, lo stesso protocollo `file` -only e le stesse liste consentite dei contenitori, un limite di output del processo di 1 MiB e al massimo 30 secondi all'interno dello abort/deadline. condiviso del broker. Non accetta mai un comando, filtro, percorso o URL dalla richiesta.

I valori strutturali sono prove di campionamento deterministiche, non comprensione video semantica. Non deducono argomenti, azioni, didascalie, discorsi o intenzioni dell'utente. I confini della scena e del fermo immagine formano segmenti; la copertura bloccata, la sfocatura, l'esposizione, i dettagli spaziali e il cambiamento temporale influenzano solo il modo in cui viene allocato il budget esistente di 1-16 fotogrammi. Un segmento completamente congelato ha un limite di un fotogramma, mentre i segmenti non bloccati competono per il budget rimanente. Quando i confini superano i fotogrammi, viene mantenuta una copertura uniforme della timeline in modo che i primi tagli rapidi non possano nascondere un lungo segmento finale. I confini della scena all'interno della risoluzione di analisi di 1 secondo di un confine congelato vengono coalizzati.

Filtri mancanti, prove malformed/empty, un errore del rilevatore o il timeout pre-analisi limitato non riescono a raggiungere l'esatta politica del punto medio uniforme. L'interruzione del chiamante o la scadenza del broker non falliscono l'apertura: termina il sottoprocesso in volo, impedisce la successiva estrazione del frame e l'albero temporaneo privato viene rimosso in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera dispositivi FFmpeg reali deterministici per risparmi di didascalie post-deduplicazione, allocazione di budget a movimento denso, prove blur/exposure/SI-TI, tagli rapidi con una lunga coda e falsi positivi a dissolvenza graduale. Registra il tempo di wall pre-analisi e, dove `/usr/bin/time` è disponibile, CPU figlio e RSS di picco. I suoi controlli di qualità sono solo oracoli strutturali. La vera qualità del modello di didascalia rimane `HOLD` perché questa imbracatura non ha endpoint autorizzato o giudice congelato. Anche il risparmio monetario rimane `HOLD` a meno che `--caption-cost-per-call-usd` non fornisca un'esplicita stima positiva per chiamata; lo script non crea mai nessuno dei due risultati.

Ogni frame è limitato a 4 MiB, tutti i frame grezzi insieme a 23 MiB e la risposta del broker serializzata a 32 MiB. Una directory temporanea privata viene rimossa in `finally`. OmniRoute non include FFmpeg e non accetta un percorso eseguibile personalizzato. Prima della didascalia, il bridge applica un passaggio di deduplicazione visiva conservativa: ogni JPEG viene ridotto a un buffer in scala di grigi di 16 × 16 e viene confrontato solo con l'ultimo fotogramma conservato. Per un budget di didascalia richiesto superiore a un fotogramma, l'estrazione fornisce un pool di candidati limitato fino al doppio di tale budget e mai più di 16 fotogrammi. Il limite richiesto viene applicato solo dopo la deduplicazione, con il primo e l'ultimo candidato selezionato conservati durante la riduzione finale quando il budget è almeno due. La policy `grayscale-16x16-mean-cells-v2` con versione utilizza il valore maggiore tra il delta luma medio e il rapporto delle celle in miniatura il cui delta normalizzato è almeno 0,05. La soglia duplicata è la costante 0,04, scelta per la prevedibilità piuttosto che esposta come impostazione di runtime. Questo segnale secondario ad alto contrasto preserva piccoli movimenti e modifiche del testo visibile che un confronto di sola media può nascondere. Gli errori del comparatore o del decodificatore non riescono ad aprirsi e mantengono la copertura. I metadati di output separano i candidati estratti, i fotogrammi utilizzati con successo e i duplicati visivi eliminati.

Una parte video esplicitamente contrassegnata può richiedere un foglio di contatto con timestamp. Il bridge costruisce al massimo una griglia JPEG a 4 colonne e 16 frame. Ogni cella da 512 pixel masterizza il proprio timestamp di origine in una banda inferiore ad alto contrasto, mentre gli stessi timestamp rimangono nei metadati testuali per l'associazione e il controllo a valle. Lo JPEG completo rimane limitato a 32 MiB. Se `sharp` non riesce a decodificare o comporre la griglia, il bridge ricade sui singoli frame JPEG ; un'interruzione del client si propaga ancora attraverso l'operazione del foglio.

L’evidenza della promozione è deliberatamente separata dal microbenchmark della composizione sintetica. `scripts/perf/video-bridge-contact-sheet-eval.ts` definisce un cablaggio A/B con versione dello schema per modelli di visione reali compatibili con OpenAI. Misura i token segnalati dal fornitore, la latenza del wall end-to-end (inclusa la composizione del foglio), il conteggio delle chiamate al modello e la conservazione dei fatti definita dal manifest. Le risposte grezze del modello non vengono scritte nel report; vengono conservati solo i digest SHA-256 e i fatti corrispondenti IDs. Il cablaggio non effettua chiamate di rete o di modelli a pagamento a meno che non venga passato `--execute-real` e non siano configurati `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Senza quella corsa reale esplicita, il suo verdetto leggibile dalla macchina rimane `HOLD`; le misurazioni sintetiche payload/call-count da sole non costituiscono una prova di promozione.

I chiamanti possono allegare un array `transcript.cues` opzionale a una parte video supportata quando possiedono già testo allineato. Ciascuna cue deve contenere `text`, un intervallo `start`/`end` finito all'interno della durata rilevata e uno `source` inserito nella whitelist (`client`, `embedded` o `audio-bridge`); `confidence` per impostazione predefinita è `1` e deve rimanere tra `0` e `1`. Le indicazioni duplicate esatte vengono compresse. OmniRoute non avvia mai la trascrizione da questi metadati: i segnali convalidati vengono copiati nel risultato descritto con fonte, confidenza e intervallo e vengono visualizzati come osservazioni non attendibili accanto alle didascalie dei fotogrammi. Il testo non valido, fuori intervallo o privo di provenienza viene rifiutato anziché mescolato nel flusso della didascalia. Entrambi i canali di trascrizione del corpo della richiesta normalizzano la provenienza fornita in `client`, incluse le etichette `embedded` o `audio-bridge` autodichiarate. Solo un adattatore di proprietà del server può assegnare tali etichette attendibili tramite l'argomento `trustedSource` di solo codice; un campo JSON di richiesta non può raggiungere quell'argomento. Il testo della trascrizione rimane un contenuto derivato dai media non attendibile, indipendentemente dalla sua provenienza, e non deve mai determinare l'autorizzazione.

Un chiamante avanzato può fornire una traccia `audioTranscript` per lo stesso video; viene trattato come testo fornito dal client, non come prova della trascrizione del server. Il filone di fusione esegue osservazioni visive e audio entro una scadenza e un segnale di interruzione, le ordina su una sequenza temporale comune, comprime i duplicati esatti e riporta un risultato parziale quando solo una parte riesce. Un `audioTranscript` non valido degrada a quel risultato parziale — la descrizione visiva viene mantenuta e il ramo audio registra un codice di errore ripulito — invece di fallire l'intero video. La disponibilità per ramo, il flag parziale e i codici di errore ripuliti vengono conservati nel risultato descritto, nei metadati del guardrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), nei metadati della cache dei risultati e nei contatori della fusione del bridge. Il percorso predefinito di Video Bridge non richiama la sintesi vocale né scarica una seconda copia multimediale; senza quella traccia esplicita, rimane solo video.

**Conservazione della trascrizione (#12150 P1).** Ciò si applica automaticamente ogni volta che Video Bridge (a sua volta attivabile) esegue il rendering di un segnale di trascrizione — non esiste un flag di conservazione separato. Quando una richiesta esegue il rendering di qualsiasi segnale di trascrizione (uno `transcript` dichiarato dal chiamante o un `audioTranscript` fuso), il guardrail lo contrassegna `videoBridgeObserved` e produce un'ombra redatta della descrizione del video — un rendering identico in cui il corpo di testo libero di ogni segnale è sostituito da `[redacted-video-transcript]`, costruito sostituendo il campo di segnale strutturato prima che la stringa venga assemblata (mai analizzando il testo appiattito, quindi nessun contenuto di segnale — contraddittorio o ordinario, compresi i corpi contenenti `]` come `[inaudible]`/`[music]` — possono sopravvivere). Il corpo della richiesta del registro chiamate persistente scambia ciascuna parte di testo derivata dal video con quell'ombra redatta, corrispondente all'uguaglianza del contenuto; l'ancora `fullText` viene riletta dal payload guardrail pre-chiamata finito, quindi la corrispondenza riesce ancora dopo che i successivi guardrail della catena ( PII e mascheratori di credenziali, priorità 10/95) riscrivono il testo della descrizione al suo posto e dopo l'iniezione system-prompt/handoff/memory rimodella l'array del messaggio. Il corpo inviato a monte del modello rimane invariato. Una richiesta osservata inoltre non popola alcuna memoria durevole (sia l'estrazione derivata dalla richiesta che quella dalla risposta vengono saltate), quindi la risposta stessa del modello non può riprodurre il testo della trascrizione nella memoria.

**Campi video grezzi (#12430).** Quando il bridge è abilitato e il supporto video nativo è sconosciuto o assente, i campi `transcript`/`audioTranscript` definiti attivano anche `videoBridgeObserved`, anche dopo un errore di descrizione o un limite `maxVideos`. contano `null` e le stringhe vuote; i campi assenti e i metadati non video no. Le copie conservate oscurano questi campi o omettono la richiesta e caches/Memory vengono ignorati.

Su questi percorsi di fallback, i segnali del chiamante validi diventano parti `text`/`input_text` supportate anziché campi del provider non standard. Entrambe le tracce fornite su richiesta rimangono osservazioni `client` non attendibili, con un avvertimento esplicito che il video non è stato descritto e che i timestamp non sono stati verificati rispetto ai media. I budget 256-cue/64-KiB totali e per-cue esistenti si applicano insieme ai due percorsi; i timestamp devono adattarsi al limite massimo di 600 secondi del broker e a qualsiasi finestra di focus fornita. Le tracce non valide vengono scartate e non inoltrate come testo arbitrario; un fratello valido può ancora essere utilizzato a meno che il budget combinato non venga superato. I campi Null/empty non aggiungono testo. Questo fallback non aggiunge alcun recupero o trascrizione multimediale. I campi di estensione della trascrizione vengono rimossi dal supporto video di fallback e dai suoi oggetti `video_url`/`source`. La lista consentita OpenAI wire rimane rigorosa; i supporti video nativi sconosciuti rimangono disponibili e gli obiettivi di solo testo noti mantengono indicatori sicuri. Le ombre di redazione strutturata proteggono il testo della trascrizione aggiunta, mentre la richiesta originale di proprietà del chiamante rimane invariata. Le destinazioni supportate in modo nativo e i bridge disabilitati mantengono il comportamento di bypass esistente.

Ulteriori copie conservate utilizzano lo stesso segnale di richiesta osservata. L'istantanea grezza della richiesta del client pre-guardrail, la richiesta in sospeso in memoria e il registro delle richieste rifiutate in anticipo sostituiscono strutturalmente i campi di trascrizione nelle parti video; i prompt di stringa sintetizzati dalle fasi della pipeline e dal trasferimento del contesto vengono redatti nel sink del corpo della richiesta persistente. Il marcatore `video_content_removed` persistente fa sì che la continuazione `previous_response_id` non venga chiusa anziché ricostruire il testo che è stato intenzionalmente scartato. Se una richiesta osservata perde l'ombra di redazione per parte prima della registrazione, o anche una delle numerose ombre video non riesce a corrispondere dopo le successive mutazioni della richiesta, il corpo della richiesta conservato viene omesso completamente invece di conservare una trascrizione parzialmente oscurata.

Per una richiesta osservata, una risposta del modello potrebbe citare qualsiasi parte della trascrizione senza un limite di indicazione strutturato. Il suo registro delle chiamate persistente `responseBody` è quindi sostituito da un indicatore di omissione; l'artefatto dettagliato della pipeline (che può includere corpi upstream/client e blocchi di flusso) non viene conservato. Le cache semantiche, idempotency e di riproduzione del ragionamento ignorano le letture e le scritture per quella richiesta. La richiesta del provider e la risposta visibile al client rimangono invariate. I primi byte keepalive vengono svuotati dal buffer temporaneo quando l'artefatto dettagliato viene omesso. L'avviso EventStream non valido di Kiro riporta solo il conteggio dei byte del payload, mai il suo contenuto o l'errore non elaborato del parser JSON. Ciò non implica che ogni diagnostica provider/plugin non correlata sia stata verificata; la scansione più ampia del lavandino trattenuto è tracciata in # 11658. (#11658)

Il ciclo di vita interno `/api/modality-bridge/video/drilldown` è un substrato di cache loopback/token-authenticated separato. Ogni operazione richiede anche un principio opaco canonico ID. Prima che un chiamante di produzione venga abilitato, deve derivare ID dal tenant autenticato e non deve mai inoltrare un valore selezionato dal client. Le chiavi della cache associano l'entità alla sessione canonica e al riferimento video IDs, memorizzano solo le relative chiavi SHA-256-derived e consentono sia le letture che l'eliminazione allo stesso entità. La cache memorizza al massimo 16 frame JPEG derivati per voce, li fa scadere dopo dieci minuti e supporta letture `start`/`end` limitate o l'eliminazione esplicita della sessione.

Ciascuna entità è limitata a 16 voci e 64 MiB di dati JPEG canonici. Tali limiti sono indipendenti dal tetto 64-entry/256 MiB globale: la pressione della quota principale sfratta solo le voci utilizzate meno recentemente dal principale prima che venga preso in considerazione lo sfratto globale LRU. Le voci scadute vengono cancellate dalla contabilità principale e globale in base all'attività della cache, mentre l'annullamento e l'errore di convalida non comportano una sostituzione parziale.

La cache rifiuta Base64 non canonico, riempimento in eccesso, media non JPEG, JPEGs non valido o troncato e JPEGs che producono un avviso durante la decodifica `sharp` dell'immagine intera limitata. Ricodifica ogni immagine accettata come JPEG canonico, ricava larghezza e altezza dai byte decodificati invece di fidarsi dei campi del chiamante e scarta eventuali byte poliglotti finali anziché conservarli. Ad entrambe le quote viene addebitato solo il buffer compresso canonico limitato. Il limite del cavo JSON include l'overhead Base64 per il soffitto di ingresso decodificato da 32 MiB. Ogni derivazione memorizzata registra il suo JPEG format/resolution convalidato, la politica di campionamento, la versione di derivazione, l'ora di creazione, l'hash del contenuto calcolato dal server e il riferimento principale con hash più l'hash del contenuto principale del chiamante attendibile. L'annullamento viene controllato tra le fasi decode/hash asincrone prima del commit della cache atomica.

Questa tranche non collega ancora un produttore di produzione al percorso e non fornisce la selezione di varianti multi-risoluzione. Il percorso trasparente della richiesta del Video Bridge pertanto non comporta alcun lavoro aggiuntivo, mentre la derivazione principale legata al tenant e l'intero ciclo di vita multi-risoluzione FU-08 rimangono lavoro di follow-up esplicito anziché documentato come comportamento completo.

I fotogrammi vengono didascalia in sequenza con il modello video configurato. Una sostituzione video vuota eredita l'impostazione Visione; se entrambi sono vuoti, il router automatico Vision seleziona il modello con capacità visiva effettiva. Le didascalie riuscite sostituiscono la parte originale con un prefisso `[Video description:` stabile che contrassegna anche il testo come un'osservazione non attendibile derivata dai media e indica ai modelli a valle di non seguire le istruzioni trovate nei media. Le chiavi della cache della didascalia del frame includono i byte JPEG, il prompt, il timestamp e il modello effettivo; vengono memorizzate nella cache solo le didascalie riuscite. Le voci della cache mantengono l'effettivo modello del produttore di successo, incluso un modello di fallback; il ponte riporta `mixed` quando diversi telai sono stati prodotti da diversi modelli. Un riscontro nella cache riutilizza l'identità del produttore invece di rietichettarla come piano di instradamento richiesto. La cache dei risultati dell'intero video viene digitata su ogni input che modifica il prompt — di output, il modello effettivo, la politica di campionamento, il conteggio dei fotogrammi, la modalità di analisi semantica, l'impronta SHA-256 del suggerimento di focus normalizzato, la finestra di focus, `transcript`, `audioTranscript` e il flag del foglio di contatto —, quindi la modifica di una qualsiasi di queste dimensioni è un errore nella cache, mai un riutilizzo obsoleto. Anche la versione della policy di deduplicazione visiva, la soglia e il conteggio limitato dei frame candidati sono espliciti nella chiave e nei metadati della cache dei risultati; una modifica alle norme pertanto non può riutilizzare una descrizione dell'intero video obsoleta. I metadati v4 della cache dei risultati mantengono la modalità e l'impronta digitale, mai l'attività utente non elaborata. I metadati Guardrail riportano sia le modalità di analisi richieste che quelle effettive; una modalità `focused` richiesta senza testo utente utilizzabile viene segnalata come effettivamente `full`.

Il guardrail estrae ogni parte video supportata ma non descrive altro che `modalityBridgeVideoMaxVideos`. Per un target che ha dimostrato di avere `supportsVideo === false`, i video non riusciti e che superano il limite diventano marcatori di testo sicuri espliciti in modo che nessun video non sopravviva. Quando la capacità è sconosciuta, quelle parti mantengono la loro portante video; qualsiasi trascrizione di fallback segue la conversione del testo delimitato sopra. I bersagli con `supportsVideo === true` bypassano il bridge. Il segnale di interruzione della richiesta del client si propaga attraverso il download, la coda del broker, i sottoprocessi e le chiamate ai sottotitoli; interrompe l'interruzione tra i video e non fallisce mai l'apertura ai media grezzi.

Le impostazioni di runtime sono supportate da DB e convalidate da Zod:

| Chiave                              | Predefinito | Portata/comportamento                                                                                              |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opzionale, attivazione                                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` conserva didascalie generiche; `focused` utilizza un contesto dell'ultimo utente limitato e non attendibile |
| `modalityBridgeVideoModel`          | `""`        | Eredita il modello Vision Bridge                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` o proporzionale `segment_aware`; il guasto del rilevatore ricade su `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                     |

I valori di timeout video persistenti legacy superiori a 120 secondi sono limitati alla scadenza del broker; le scritture di nuove impostazioni al di sopra di tale limite vengono rifiutate. `GET /api/modality-bridge/video/runtime` richiede una località di loopback timbrata attendibile prima dell'autenticazione o del sondaggio in fase di esecuzione, quindi richiede l'autenticazione di gestione. Restituisce solo `available`, versioni FFmpeg/ffprobe disinfettate e un motivo fisso quando il runtime non è disponibile. L'endpoint di estrazione interno non è un caricamento pubblico API: la saturazione della coda restituisce `503` più `Retry-After`, la disconnessione del chiamante restituisce `499` e la scadenza fissa del broker restituisce `504`. Le risposte convertite aggiungono `video->text;model=<visionModel>;parts=<videos>` all'intestazione `x-omniroute-modality-bridge` centrale senza rimuovere i segmenti Vision o Audio.

### PII Mascheratore (`piiMasker.ts`)

Continua a funzionare** Entrambi** fasi.

- **`preCall`** clona il payload, cammina `system`, `messages`, `input` e `prompt` (inclusi gli elementi stringa semplici) e applica `processPII()` (da `@/shared/utils/inputSanitizer`) ai campi stringa `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, PII rilevato viene oscurato nel payload in uscita. Questo è indipendente da `INPUT_SANITIZER_MODE` (che controlla solo la politica di prompt-injection). Quando la redazione è disattivata, il rilevamento dei record delle chiamate conta senza riscrivere il contenuto.
- **`postCall`** clona in profondità la risposta, esegue `sanitizePIIResponse()` più il mascheratore della forma dell'API di risposta (`maskResponsesOutput` — copre `output_text` e `output[].content[].text`). In caso di oscuramento, la risposta modificata sostituisce l'originale.

Il guardrail non si blocca mai; annota solo (`meta.detections`, `meta.redacted`) o riscrive.

#### Selezione per tipo, modelli personalizzati e contatori di rilevamento

**Dashboard → Impostazioni → Sicurezza → PII Mascheramento** sceglie _cosa_ è mascherato. Non attiva il mascheramento: ovvero rimane `PII_REDACTION_ENABLED` (richiesta) e `PII_RESPONSE_SANITIZATION` (risposta + SSE), entrambi disattivati per impostazione predefinita.

- **Selezione per tipo** — gli ID integrati sono elencati in `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Non impostato significa ogni tipo (il comportamento prima che esistesse questa impostazione). Il modello `ssn_us` del motore di richiesta viene mappato su `ssn`. I modelli (Minimal, Standard, Financial, Brasiliano, USA, GDPR, POPIA, Full) riempiono solo le caselle di controllo in UI.
- **identificatori GDPR e POPIA** — dodici ID integrati che coprono EU e identificatori personali sudafricani (tabella seguente). Le loro espressioni regolari, i validatori e i tag di giurisdizione risiedono in una tabella, `src/shared/utils/piiPatterns.ts`, che viene utilizzata sia dal sanitizzatore della risposta (`src/lib/piiSanitizer.ts`) che dal mascheratore di richiesta (`src/shared/utils/inputSanitizer.ts`). Una corrispondenza viene redatta solo quando il suo validatore la accetta; una semplice sequenza di cifre non è mai sufficiente. Un operatore che ha salvato una selezione ristretta prima che esistessero questi ID mantiene il comportamento che aveva fino a quando non vengono selezionati i nuovi ID.
- **Modelli personalizzati** — fino a 20 modelli regex o caratteri jolly (`*` = fino a 64 caratteri non spazi bianchi, `?` = uno). Le corrispondenze diventano `[CUSTOM_REDACTED]`. Ogni modello passa attraverso `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): al massimo 500 caratteri, flag limitati a `g i m s u`, devono essere compilati, devono passare `safe-regex` (backtracking catastrofico) e non devono corrispondere a una stringa vuota o a un segnaposto di redazione. Un modello che fallisce viene rifiutato al momento del salvataggio e del test e una riga memorizzata che fallisce viene ignorata in fase di esecuzione invece di essere compilata. I modelli personalizzati vengono eseguiti solo mentre il mascheramento è attivo.
- **Contatori di rilevamento** — conteggi per tipo (valori mai corrispondenti), mantenuti in memoria e reimpostati al riavvio (`src/lib/pii/piiDetectionStats.ts`). Aumentano solo mentre il mascheramento è attivo.

Le impostazioni risiedono nella tabella `key_value` (spazio dei nomi `pii_settings`, `src/lib/db/piiSettings.ts`) e vengono lette tramite una cache da 1 s. API:

| Metodo | Sentiero                 | Scopo                                                                                                          |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stato di bandiera, `enabledTypes`, `customPatterns`, contatori di rilevamento                                  |
| `PUT`  | `/api/settings/pii`      | Sostituisci `enabledTypes` (`null` = tutto) and/or `customPatterns`                                            |
| `POST` | `/api/settings/pii/test` | Eseguire un test di verifica su un campione rispetto a un campione di al massimo 8 KB; nulla viene memorizzato |

Tutti e tre richiedono l'autenticazione della gestione e convalidano il corpo con Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### identificatori GDPR (EU) e POPIA (Sudafrica).

| Id                  | Identificatore            | Validazione                                                                                 |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | Paese conosciuto, lunghezza esatta per quel paese, ISO 13616 MOD-97-10                      |
| `eu_vat`            | numero EU VAT             | Prefisso noto dello stato membro e formato numerico dello stato (nessuna ricerca VIES )     |
| `es_dni_nie`        | spagnolo DNI / NIE        | Lettera di controllo (valore mod 23); NIE è `X/Y/Z` + 7 cifre                               |
| `it_codice_fiscale` | Codice Fiscale Italiano   | Lettera di controllo dalle tabelle di posizione odd/even                                    |
| `pl_pesel`          | PESEL polacco             | Checksum ponderato e una data di nascita codificata esistente                               |
| `nl_bsn`            | BSN                       | 11 prove (pesi 9..2, -1)                                                                    |
| `de_steuer_id`      | Steuer-ID tedesco         | ISO 7064 Mod 11,10 più le regole sulla struttura delle cifre (senza 0 iniziale)             |
| `se_personnummer`   | Numero di persona svedese | Luhn nelle ultime dieci cifre e una data di nascita plausibile (10 o 12 cifre)              |
| `za_id`             | Numero ID sudafricano     | Luhn su tutte le 13 cifre, month/day di nascita valido, cifra di cittadinanza 0 o 1         |
| `za_phone`          | Telefono sudafricano      | prefisso `+27` / `27` o la forma nazionale `0..` scritta con uno spazio o un trattino       |
| `za_vat`            | Numero VAT sudafricano    | 10 cifre che iniziano con `4`** E** "VAT" / "BTW" nei 48 caratteri precedenti               |
| `za_tax_ref`        | Rif. fiscale sudafricano  | 10 cifre che iniziano con `0`-`3`, Luhn,** E** "tassa" / "SARS" nei 48 caratteri precedenti |

Poiché i formati di sole cifre entrano in conflitto con numeri d'ordine, numeri di build e timestamp, quelli più deboli (`za_vat`, `za_tax_ref`) necessitano dell'indicazione della parola chiave e un numero `0..` di dieci cifre non viene trattato come un numero di telefono sudafricano. IBANs spaziati (`GB29 NWBK ...`) non corrispondono. Nel percorso di streaming la cue viene cercata solo all'interno del blocco corrente. Gli ID si trovano prima dei modelli telefonici generici, quindi un identificatore convalidato mantiene il proprio segnaposto (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). I modelli `gdpr` e `popia` selezionano rispettivamente gli ID EU e sudafricani. Il mascheramento stesso rimane attivabile (regola rigida n. 20): nulla qui cambia l'impostazione predefinita di un flag di funzionalità.

### Iniezione rapida (`promptInjection.ts`)

Rileva le strutture antagoniste nei contenuti forniti dagli utenti e applica la policy configurata. Il comportamento è guidato dalle variabili di ambiente e dalle opzioni del costruttore:

| Collocamento     | Inv.var                                                                                                | Predefinito | Effetto                                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Abilitato        | `INPUT_SANITIZER_ENABLED`                                                                              | `true`      | Quando `false`, il guardrail va in cortocircuito.                                                                                                                                                                              |
| Modalità         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`      | Politica di iniezione: `block`, `warn` o `log`. (`redact` è accettato per la retrocompatibilità ma lo fa** non** testo di iniezione della striscia; la richiesta di riscrittura PII è controllata da `PII_REDACTION_ENABLED`.) |
| Soglia di blocco | opzione `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Gravità minima richiesta per il blocco. Per impostazione predefinita, il mezzo è di sola osservazione.                                                                                                                         |

**Precedenza della modalità** (`getMode`): chiamante `options.mode` → `INJECTION_GUARD_MODE`**DB override del flag di funzionalità** (Dashboard → Impostazioni → Flag funzionalità) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Un override del dashboard quindi prevale sugli env vars, quindi i Feature Flags UI controllano la guardia in esecuzione in tempo reale (nessun riavvio). La lettura DB è a prova di errore: in caso di errore, la guardia ritorna al comportamento basato su env e quando non viene impostato alcun override il comportamento è identico alla risoluzione solo env.

Fonti di rilevamento:

1. `sanitizeRequest()` da `@/shared/utils/inputSanitizer` (set di rilevatori condivisi utilizzato altrove nella pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrato (attualmente `system_override_inline` e `markdown_system_block`, entrambi con gravità `high` ).
3. `customPatterns` facoltativo passato tramite le opzioni del costruttore (stringhe, regex o record `{ name, pattern, severity }` ).

Quando `mode === "block"`** E** almeno un rilevamento soddisfa la soglia di gravità, `preCall` restituisce `{ block: true, message: "Request rejected: suspicious content detected" }`. Nelle modalità `warn`/`log` il guardrail registra ma consente la chiamata. L'helper condiviso `evaluatePromptInjection()` viene esportato anche per i chiamanti che devono valutare i prompt senza passare attraverso il registro.

**Scansione vincolata (v3.8.20):** il rilevatore ispeziona solo il** primi 16 KB** di testo del prompt unito — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) in `src/shared/utils/inputSanitizer.ts`. Sia `detectInjection()` che `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` prima di eseguire il ciclo pattern. Le direttive di injection si trovano vicino alla parte superiore di un input, quindi questo limita la regex CPU/GC su payload di centinaia di KB senza indebolire il rilevamento (cfr. #3932, #4041).

### Mascheratore credenziali (`credentialMasker.ts`)

Continua a funzionare** Entrambi** fasi, ultime nella catena predefinita (priorità `95`). Elimina modelli noti di chiave API/token segreto dal payload in uscita (contenuto del messaggio, argomenti della chiamata allo strumento, risultati dello strumento)** E** la risposta del provider, in modo che una credenziale incollata in un prompt (o riprodotta dal risultato di uno strumento) non venga divulgata al provider upstream o restituita al client.

- **Solo attivazione** , stessa convenzione della redazione PII (regola dura n. 20-adiacente): disabilitata a meno che `settings.credentialRedactionEnabled === true`** O** `CREDENTIAL_REDACTION_ENABLED=true`. Con esso spento, il guardrail è uno — no-op che non si blocca mai e non si riscrive mai.
- `redactCredentials()` percorre l'intero albero payload/response (`walkValue()`, prototipo-inquinamento-safe, cycle-safe tramite `WeakSet`) e sostituisce le corrispondenze con un segnaposto `[REDACTED:<type>]`, clonando solo i rami che sono effettivamente cambiati.
- `CREDENTIAL_PATTERNS` copre le chiavi del fornitore LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chiavi di pagamento (Stripe, Square), chiavi cloud (chiave di accesso AWS, Twilio, SendGrid, Mailgun), chiavi private/ JWTs, credenziali stringhe di connessione (`mongodb://user:pass@...`, ecc.) e un modello generico di valori di intestazione `Authorization`/`x-api-key`/`api-key`/`apikey`. Le chiavi a forma di intestazione (`authorization`, `x-api-key`, `api-key`, `apikey`) vengono oscurate strutturalmente (solo valore, prefisso dello schema come `Bearer `/`Basic ` preservato) anziché tramite la regex di testo generica.
- Il guardrail non si blocca mai; si limita a riscrivere (`modifiedPayload` / `modifiedResponse`) e annotare (`meta.credentialsRedacted`, `meta.count`).

Guardia di regressione: `tests/unit/credential-masker-guardrail.test.ts`.

## Contratto base (`base.ts`)

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
  block?: boolean; // true interrompe immediatamente la catena
  message?: string; // mostrato in caso di blocco
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

Un guardrail segnala "nessuna modifica" restituendo `void`, `{}` oppure
`{ block: false }`. La restituzione di un `modifiedPayload`/`modifiedResponse`
sostituisce il valore che scorre nella catena per i guardrail a valle.
`signal?: AbortSignal` porta il ciclo di vita del chiamante all'interno dei
guardrail. L'interruzione di una richiesta è l'eccezione fail-open deliberata:
i media bridge interrompono il lavoro ed eseguono la pulizia senza ripristinare
i media grezzi verso una destinazione nota per non supportarli.

## Registry (`registry.ts`)

Il singleton `guardrailRegistry` espone:

- `register(guardrail)` — aggiunge (o sostituisce in base al nome normalizzato)
  un guardrail e riordina per `priority` crescente.
- `clear()` / `list()` — helper amministrativi.
- `runPreCallHooks(payload, context)` — itera i guardrail attivi, fa passare il
  payload attraverso `modifiedPayload` e si ferma al primo `block: true`.
- `runPostCallHooks(response, context)` — stesso flusso sul lato della risposta.
- `resetGuardrailsForTests({ registerDefaults })` — azzera lo stato ed
  eventualmente registra nuovamente i valori predefiniti per un isolamento
  pulito dei test.

Entrambi i runner restituiscono `{ blocked, payload|response, results, guardrail?, message? }`
dove `results` è un array di record `GuardrailExecutionResult` che includono i
campi `blocked`, `skipped`, `modified`, `error` e `meta` per ogni guardrail,
utili per il tracciamento.

### Disabilitazione dei guardrail per singola richiesta

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggrega un elenco
deduplicato di nomi di guardrail che devono essere saltati per la richiesta
corrente. Esistono cinque canali, letti in questo ordine e uniti in un unico
elenco (nella deduplicazione vince la prima occorrenza):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` nel corpo della richiesta (livello superiore)
3. `metadata.disabledGuardrails` nel corpo della richiesta (solo quando `metadata` è un oggetto)
4. Header `x-omniroute-disabled-guardrails`
5. Header legacy `x-disabled-guardrails`

Tutti e cinque i canali vengono uniti, inclusi i due header: inviando sia
`x-omniroute-disabled-guardrails` sia `x-disabled-guardrails` vengono saltati
l'unione dei rispettivi elenchi, e un header moderno vuoto non nasconde più
quello legacy
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), risolto in
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

I valori possono essere array di stringhe oppure una stringa separata da
virgole; i nomi vengono ripuliti dagli spazi e normalizzati in kebab-case
minuscolo (`pii_masker` → `pii-masker`), e le voci vuote vengono scartate. Il
risultato viene passato tramite `context.disabledGuardrails` al registry, che
salta i guardrail corrispondenti (`skipped: true` in `results`).

L'elenco di disabilitazione influisce solo sul **registry**. La modalità
`block` per la prompt injection è un confine obbligatorio: il middleware
injection-guard
(`src/middleware/promptInjectionGuard.ts`) chiama `evaluatePromptInjection()`
senza alcun elenco di disabilitazione controllato dal chiamante (la chiamata
morta a `resolveDisabledGuardrails({ body })` che effettuava in precedenza è
stata rimossa in
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), quindi una
richiesta che disabilita `prompt-injection` viene comunque rifiutata in
modalità `block`. Questo comportamento è intenzionale. I canali di
disabilitazione sono controllati dal chiamante (corpo della richiesta,
metadata, header), e un chiamante non deve poter disattivare un controllo di
sicurezza impostato dall'operatore
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). L'unione
degli header introdotta da
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) modifica solo
quali guardrail del registry vengono saltati; non consente a un client di
aggirare il middleware. Le policy obbligatorie per guardrail per chiave e per
gruppo sono tracciate nell'RFC v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Vedi [Copertura e limiti](#coverage-and-limits).

## Ordine di esecuzione

Per ogni richiesta che transita attraverso `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts` (le route della famiglia chat elencate in
[Copertura e limiti](#copertura-e-limiti)):

1. `resolveDisabledGuardrails(...)` costruisce l'elenco di esclusione a partire
   da chiave API, body e header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` esegue i guardrail in ordine
   di priorità crescente:
   - I guardrail disabilitati vengono registrati come `skipped`.
   - Il `preCall` di ciascun guardrail può riscrivere il payload tramite
     `modifiedPayload`.
   - Il primo `block: true` cortocircuita la catena e l'handler restituisce una
     risposta di rifiuto del guardrail.
3. Il payload (potenzialmente riscritto) confluisce nel combo routing e nel
   dispatch verso l'upstream.
4. **Solo non-streaming:** dopo che la risposta è stata assemblata,
   `guardrailRegistry.runPostCallHooks(...)` esegue la stessa catena sulla
   risposta. Un `block: true` in questa fase scarta la risposta upstream e
   restituisce HTTP 400. Le risposte in streaming saltano interamente questo
   passaggio.

I guardrail che generano un'eccezione vengono registrati con
`error: <message>` e tracciati tramite `logger.warn`, ma la catena prosegue —
fail-open per progettazione.

## Copertura e limiti

Il registro dei guardrail è integrato solo nella pipeline di chat. Questi
limiti sono fissati da `tests/unit/guardrail-pipeline-wiring-characterization.test.ts`
e `tests/unit/guardrail-pipeline-characterization.test.ts`; aggiornare tali
test in modo deliberato quando il comportamento cambia.

### Dove vengono eseguiti gli hook

| Hook / controllo                    | Viene eseguito su                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Richieste gestite da `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e il proxy chat di Telegram. Inoltre l'endpoint di test della dashboard `/api/guardrails/test`. Un blocco pre-call restituisce HTTP 400. |
| `runPostCallHooks`                  | Solo risposte chat **non in streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Le risposte in streaming non lo raggiungono mai.                                                                                                                                                                                                                                                                                            |
| PII in streaming                    | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), inserito in pipe in `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` è attiva. Non è un guardrail, quindi i canali di disabilitazione non lo influenzano.                                                                                                                                                                                                            |
| Middleware injection-guard (legacy) | Ogni route `/v1` che trasporta prompt, incluse quelle della famiglia chat (vedi [copertura delle route](#injection-guard-route-coverage--red-team-phase-8--block-d)). Solo prompt injection.                                                                                                                                                                                                                                                |

### Cosa non è coperto

- **Route di media, embeddings e dati** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) non raggiungono mai il
  registro. Lì non viene eseguito alcun mascheramento PII, mascheramento delle
  credenziali o modality bridge. Il loro unico controllo è il middleware
  injection-guard legacy.
- **Le risposte in streaming** non ricevono guardrail post-call: nessun
  `pii-masker` o `credential-masker` post-call e nessun blocco post-call. Si
  applica solo la trasformazione PII dello streaming (quando
  `PII_RESPONSE_SANITIZATION` è attiva). Una credenziale riecheggiata in una
  risposta in streaming non viene oscurata.
- **Canali di disabilitazione vs. il middleware (per progettazione):** il
  middleware valuta la prompt injection con una propria chiamata a
  `evaluatePromptInjection()`, senza passare alcun elenco di disabilitazione
  controllato dal chiamante. La modalità `block` è un confine obbligatorio che
  le disabilitazioni controllate dal chiamante non possono aggirare, incluse le
  route della famiglia chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  Disabilitare `prompt-injection` salta solo il guardrail del registro.

### Cosa vede una risposta prima del post-call

Nel percorso non-streaming l'ordine è: estrazione della memoria → esecuzione
dei tool integrati → guardrail post-call → uscita per blocco post-call →
salvataggio nella cache semantica.

- L'**estrazione della memoria** e l'**esecuzione degli strumenti** vedono la
  risposta prima che i guardrail post-chiamata possano riscriverla o bloccarla.
  Da [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), l'estrazione
  della memoria passa il testo estratto attraverso `sanitizePII` quando
  `PII_RESPONSE_SANITIZATION` è attiva (sia in streaming che non in streaming),
  ma una risposta che i guardrail post-chiamata bloccano in seguito è comunque
  già stata offerta alla memoria e agli strumenti.
- **La cache semantica** memorizza la risposta dopo il post-chiamata, quindi
  memorizza la risposta riscritta, mentre una risposta bloccata non viene mai
  messa in cache. Le voci della cache sono indicizzate in base alla chiave API.

## Configurazione

Variabili d'ambiente lette dai guardrail integrati:

| Variabile                             | Usata da                  | Effetto                                                                                                                      |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Imposta `false` per disabilitare completamente il rilevamento.                                                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politica di injection: `warn`, `block` o `log`. Il valore legacy `redact` non riscrive il testo dell'injection.              |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modalità per il guardrail di injection; anche un feature flag nel DB che **sovrascrive** le variabili d'ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severità minima che `MODE=block` rifiuta: `high` (predefinito), `medium` o `low`.                                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legacy per `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando `true`, i PII della richiesta vengono oscurati (indipendentemente dalla modalità di injection).                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controlla il comportamento del masker lato risposta.                                                                         |

I guardrail del Modality Bridge leggono la configurazione runtime dallo
store delle impostazioni basato su DB (`getSettings()`), non dalle variabili
d'ambiente. Le chiavi primarie di Vision sono
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. Le chiavi legacy
`visionBridge*` sono accettate solo come fallback di lettura documentato
di un ciclo; le scritture dalla dashboard usano le chiavi primarie. I valori
predefiniti e il resolver di fallback si trovano in
`src/shared/constants/modalityBridgeDefaults.ts`, con le costanti legacy
mantenute in `src/shared/constants/visionBridgeDefaults.ts`.

Audio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, oltre alle
impostazioni condivise `modalityBridgeCache*`. Audio non ha un fallback con
chiavi legacy perché queste chiavi sono state introdotte con lo schema del
Modality Bridge.

Video usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, oltre alle impostazioni condivise
`modalityBridgeCache*`. È disabilitato per impostazione predefinita perché
FFmpeg/ffprobe sono dipendenze operative opzionali e la generazione di didascalie
dei frame aggiunge latenza e costo del modello.

## Guardrail personalizzati

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

Passaggi:

1. Crea `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implementa `preCall` e/o `postCall`.
3. Registra al momento dell'import (push da `registerDefaultGuardrails`) oppure
   chiama `guardrailRegistry.register(...)` a runtime — il registro sostituisce
   qualsiasi guardrail precedente con lo stesso nome normalizzato.
4. Aggiungi test in `tests/unit/` (esempi esistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test

Usa `resetGuardrailsForTests()` tra un test e l'altro per partire da uno stato noto.
Passa `{ registerDefaults: false }` per iniziare con un registro vuoto e
registrare solo i guardrail sotto test. Vision Bridge accetta la dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge espone i
punti di iniezione equivalenti per impostazioni, capacità, selezione del modello
STT, controlli delle credenziali e trascrizione. I test possono quindi esercitare
entrambi i flussi senza accesso al DB o alla rete.

## Vedi anche

- `src/lib/guardrails/` — implementazione
- `src/shared/utils/inputSanitizer.ts` — rilevatore condiviso che alimenta il
  rilevamento di prompt-injection e il mascheramento dei PII
- `src/shared/constants/visionBridgeDefaults.ts` — impostazioni predefinite di
  Vision Bridge e lista dei modelli con bridge forzato
- `src/shared/constants/modalityBridgeDefaults.ts` — impostazioni predefinite runtime condivise di Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — livello ortogonale (circuit breaker, cooldown)
- `docs/reference/ENVIRONMENT.md` — riferimento completo delle variabili d'ambiente

## Copertura delle route dell'injection-guard e red-team (Fase 8 · Blocco D)

L'injection-guard (`createInjectionGuard` / `withInjectionGuard`) copre tutte le route
che accettano prompt utente. Rispetta `INJECTION_GUARD_MODE` (predefinito `warn` = solo log;
`block` = restituisce HTTP 400 `SECURITY_001`).

| Tipo              | Route                                                                                                                                                | Modalità predefinita |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Testo (esistente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Generativa        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Dati              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

L'estrazione del testo (`extractMessageContents`) copre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (notturno, `nightly-llm-security.yml`):** promptfoo verifica che ogni route blocchi
il corpus OWASP-LLM in `INJECTION_GUARD_MODE=block`; garak esegue le sonde (salta senza secret).
`moderations` è incluso per coerenza. La modalità block è un confine obbligatorio: `evaluatePromptInjection()`
ignora la lista di disabilitazione per richiesta che il middleware le passa, quindi `disabledGuardrails`
**non** esenta una route da esso ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Il workflow notturno (`.github/workflows/nightly-llm-security.yml`, cron + dispatch
manuale) ha due job:

- **`promptfoo-guard` (bloccante)** — esegue `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Ogni caso avversario (es. "ignora tutte le
  istruzioni precedenti…", jailbreak in stile DAN) verifica che la risposta contenga
  `error.code === "SECURITY_001"`, ovvero che il guard abbia effettivamente rifiutato la richiesta.
- **`garak` (consultivo)** — esegue garak `--probes promptinject,dan,leakreplay`
  contro un'istanza OmniRoute locale (`http://localhost:20128/v1`). Condizionato da un
  secret del provider (`PROMPTFOO_PROVIDER_KEY`); salta senza errori ed è seguito dal
  suffisso `|| true`, quindi riporta i risultati senza far fallire la CI.

La copertura dell'helper del guard (`createInjectionGuard` / `withInjectionGuard`)
si estende a ogni route `/v1` che trasporta prompt; il testo del prompt viene estratto da
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` tramite
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
