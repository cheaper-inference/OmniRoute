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

Il registro carica automaticamente sei guardrail in ordine di priorità all'importazione
(vedi `registry.ts` → `registerDefaultGuardrails()`):

| Priorità | Nome                | Fase           | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

I numeri di priorità più bassi vengono eseguiti **per primi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Il modello base GLM 5.3 e `glm-5.3-{low,high,max}` hanno metadati di registro/spec espliciti
`supportsVision:false`. Le varianti GLM 5.3 Flash rimangono modelli con visione nativa. La route `/v1/messages` di Claude Code entra nella catena condivisa di guardrail pre-call `handleChat` **prima** della traduzione da Claude a OpenAI; le immagini annidate nei risultati del tool `Read` devono essere descritte o gestite prima che tale traduzione le trasformi in contenuto `image_url` di OpenAI (#17069).

Intercetta le richieste contenenti immagini dirette a **modelli senza visione** e
reindirizza l'intera richiesta verso un modello con capacità di visione oppure sostituisce le parti immagine con descrizioni testuali prodotte da un modello di visione configurabile prima della chiamata upstream. Questo consente ai provider solo testo di gestire in modo trasparente payload multimodali.

Flusso:

1. Salta se il modello di destinazione supporta già la visione (a meno che non compaia nella
   lista dei bridge forzati `isVisionBridgeForcedModel`).
2. Estrae le parti immagine tramite `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), che delega al **rilevatore multimediale
   unificato** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — l'unica
   fonte di verità condivisa con il filtro di compatibilità combo.
   L'estrazione è limitata da una allowlist alle forme che `replaceImageParts` può reintegrare
   (il contratto estrai↔sostituisci): `image_url` di OpenAI, `source.type:"base64"` base64
   di Anthropic, `source.type:"url"` URL di Anthropic e `input_image` della Responses
   API. Anche le immagini corrispondenti annidate dentro `tool_result.content` di Claude Code
   e negli output dei tool Responses vengono estratte e
   sostituite nei loro percorsi originali; le forme solo indicatore sono materiale
   del filtro combo e non vengono estratte.
   Salta se non ne viene trovata nessuna.
3. Risolve la configurazione runtime tramite `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): le nuove chiavi di impostazione
   `modalityBridge*` hanno la precedenza; le chiavi legacy `visionBridge*` rimangono un
   **fallback di un ciclo** (finestra di rollback). Salta prima di qualsiasi
   attraversamento dei media quando il bridge è disabilitato.
4. Il selettore di modalità (`modalityBridgeVisionMode`, vedi tabella sotto) decide
   tra reindirizzamento e descrizione. Il reindirizzamento restituisce `modifiedPayload`
   con il solo `model` sostituito, più il meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Percorso di descrizione: limita le immagini a `maxImages`, compone il prompt
   adattato al task, consulta la cache delle descrizioni, chiama il modello di visione
   **in parallelo** (`Promise.allSettled`) e inietta parti testuali `[Image N]: <description>`
   al loro posto. Una descrizione fallita restituisce `null`: l'immagine grezza viene
   preservata per destinazioni sconosciute o con capacità di visione (#4012), ma una
   **destinazione diretta confermata come solo testo** o una combo senza visione riceve
   uno stub testuale esplicito
   `(unavailable — no vision-capable provider connected)` per
   ogni immagine non descritta, inclusi i fallimenti parziali e le immagini oltre il
   limite delle chiamate di descrizione (#17069). Il fallback di descrizione combo esistente
   per il caso di fallimento totale rimane attivo (#8430).
6. Restituisce `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettore di modalità (`modalityBridgeVisionMode`)

| Modalità   | Predefinito | Comportamento                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔           | Euristica legacy, invariata (#6640/#7204): i modelli non-combo/`auto/` vengono reindirizzati al miglior modello vision, a meno che il modello originale non disponga già di credenziali utilizzabili (in tal caso describe); i target combo eseguono sempre describe.                                                                            |
| `describe` |             | Sempre describe — il blocco di reroute viene saltato completamente; il modello scelto dall'utente risponde sempre.                                                                                                                                                                                                                               |
| `reroute`  |             | Forza il reroute: il controllo che preserva il modello con credenziali viene ignorato. Il controllo delle credenziali del **target** di reroute resta comunque attivo — quando non esiste alcun target vision utilizzabile, il bridge si blocca con un errore chiaro anziché eseguire describe o inviare immagini grezze a un target solo testo. |

Le modalità forzate fanno cortocircuito **prima** che venga eseguita l'euristica auto; il comportamento di `auto` è identico byte per byte al guardrail precedente alla PR-1.

#### Ambito della chiave API (`visionBridgeKeyScope.ts`)

Quando la chiave API del chiamante limita `allowedConnections`, i pool di quota
(`allowedQuotas`) o i modelli (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), il bridge sceglie
solo modelli di reroute e describe utilizzabili dalla chiave, su connessioni
utilizzabili dalla chiave. La chiamata describe passa poi sempre attraverso il
self-loop di OmniRoute con l'header `x-omniroute-self-loop-key-id`, così la
richiesta chat ricevente applica di nuovo la policy su connessioni e modelli di
quella chiave. `enforceApiKeyPolicy()` onora quell'header solo insieme al bearer
del self-loop, per cui può solo restringere l'accesso, e un id che non viene
risolto viene rifiutato.

Se nessun modello vision è consentito per la chiave, un **target solo testo
confermato** rifiuta la richiesta di immagine localmente con un chiaro HTTP 400
invece di inoltrare i byte dell'immagine a un upstream incapace (#17069). Per i
target con capacità vision sconosciuta o nativa, il percorso describe mantiene
il precedente comportamento fail-open (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Le richieste senza chiave e le chiavi senza queste restrizioni si comportano
esattamente come prima.

#### Prompt describe consapevole del task (`modalityBridgeVisionTaskAware`)

Il valore predefinito è **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
aggiunge il testo dell'**ultimo messaggio utente** (troncato a 500 caratteri) al
prompt describe di base, orientando la descrizione verso ciò che l'utente ha
effettivamente chiesto (pattern codex-vision-proxy) e chiedendo al modello
vision di trascrivere il testo visibile. Con il flag disattivato — o in assenza
di testo utente — viene usato il prompt di base invariato.

La richiesta OpenAI-compatibile propria del self-loop describe
(`callVisionModelSingle()` in `visionBridgeHelpers.ts`) richiede sempre
`image_url.detail: "high"` — incondizionatamente, per ogni chiamante/provider,
senza essere subordinata ad alcun segnale del client. Il campionamento a basso
dettaglio degrada l'accuratezza dell'OCR proprio per il task di trascrizione del
testo richiesto da questo prompt, quindi la chiamata describe stessa chiede
sempre il dettaglio alto, indipendentemente dal livello di dettaglio utilizzato
dalla richiesta in ingresso originale. Questo influisce solo sul corpo della
richiesta describe interna; non cambia il modo in cui OmniRoute inoltra
l'`image_url.detail` del chiamante sulla richiesta primaria — quel valore
predefinito viene applicato separatamente, e solo per i client OpenCode
rilevati, in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Il ramo in formato wire Anthropic del self-loop describe non ha il campo
`detail` e non è influenzato da nessuno dei due valori predefiniti.

#### Limite dell'output describe (`modalityBridgeVisionMaxChars`)

| Chiave                         | Predefinito | Intervallo           |
| ------------------------------ | ----------- | -------------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` oppure 100–50000 |

`0` (predefinito) significa **nessun limite** — la descrizione restituita da
`callVisionModel()` viene passata invariata, preservando il comportamento
esistente. Qualsiasi valore nell'intervallo 100–50000 tronca la descrizione con
un suffisso `…` prima che venga reintegrata come `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Aumenta questo valore per task OCR ricchi di dettagli in cui il modello a valle
ha bisogno della trascrizione completa; abbassalo per limitare l'uso di token
con modelli vision verbosi. Il campo della dashboard si trova nel pannello
Advanced della scheda Vision (`modality-bridge-max-chars` in
`ModalityBridgeVisionTab.tsx`) e arrotonda qualsiasi valore tra 1 e 99 fino al
minimo di 100, lasciando invariato uno `0` esplicito — `0` è un valore Zod
valido a pieno titolo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), non
semplicemente il predefinito "non impostato".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL in memoria per gli output describe, condivisa a livello di
intero processo. Chiave = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
con framing a prefisso di lunghezza (nessuna collisione ai confini dei campi).
La componente modello è il modello bridge **configurato**, non il modello che ha
effettivamente risposto — `callVisionModel` può eseguire internamente un
fallback, e una chiave per tentativo frammenterebbe la cache. Le describe
fallite non vengono mai messe in cache. Impostazioni:

| Chiave                          | Predefinito | Intervallo |
| ------------------------------- | ----------- | ---------- |
| `modalityBridgeCacheEnabled`    | `true`      | —          |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000    |

#### Normalizzazione delle immagini remote (fetch describe/base64 self-loop)

Quando il bridge recupera autonomamente un'immagine **remota** — la self-call di describe di Anthropic e la conversione base64 in formato wire di Claude (`ensureBase64ImagesForClaudeWire`), entrambe tramite `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — il data URI risultante viene passato attraverso `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prima di essere incorporato nella richiesta al modello di visione. Le immagini troppo grandi vengono ridimensionate a un **bordo lungo di 2048 px** (corrispondente al limite di ridimensionamento che OpenAI/Anthropic applicano già lato server), il che riduce i byte e la latenza di upload senza cambiare ciò che il modello di visione vede. Il ridimensionamento usa `sharp`, caricato tramite import dinamico: su una piattaforma in cui il suo binario nativo non riesce a caricarsi, `normalizeDataUri()` **non solleva mai eccezioni** — ricade su un passthrough dei byte originali, così il percorso di describe/conversione base64 continua sempre a funzionare. Anche i byte non immagine (un fetch che non ha restituito un'immagine decodificabile) vengono passati inalterati. Questa normalizzazione è limitata alle immagini che il bridge recupera per la propria self-call — non viene mai applicata al payload passthrough grezzo del chiamante, in coerenza con il principio di mutazione solo su opt-in (Regola ferrea n. 20).

#### Schema delle impostazioni + migrazione

Le nuove chiavi `modalityBridge*` sono validate con Zod in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, il trio `modalityBridgeCache*` e il gruppo `modalityBridgeAudio*` usato dall'Audio Bridge. La migrazione `141_modality_bridge_settings.sql` copia i valori legacy esistenti `visionBridge*` nelle corrispondenti nuove chiavi (idempotente, non sovrascrive mai un valore `modalityBridge*` impostato dall'operatore); le chiavi legacy restano accettate come fallback di lettura per un ciclo di rilascio.

#### Header di trasparenza + statistiche

Le risposte trasformate dal describe riportano `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (costruito da `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, apposto da `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Le richieste reindirizzate non ricevono **alcun** header — il payload non è stato toccato e la sostituzione del modello è già visibile nel campo `model` del corpo della risposta.

`GET /api/modality-bridge/stats` (autenticazione di gestione, stesso livello di `GET /api/settings`) restituisce i contatori in memoria per modalità `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` per `vision`, `audio` e `video`. `averageLatencyMs` usa `latencySamples`, non tutti i tentativi, come denominatore; un'operazione senza misurazione temporale non genera un campione fittizio di zero millisecondi. `bridged` resta l'alias retrocompatibile per le conversioni riuscite; i tentativi falliti non lo incrementano. I contatori si azzerano al riavvio del processo per progettazione (telemetria, non contabilità).

#### Configurazione della dashboard

La pagina dedicata della dashboard è `/dashboard/settings/modality-bridge`. Le sue schede `Vision`, `Audio` e `Video`, indirizzabili tramite URL, preservano i parametri di query durante il cambio del valore `tab`. La scheda Vision espone l'abilitazione, la modalità, la selezione del modello (incluso il default automatico), il prompting task-aware, i limiti avanzati di timeout/immagini/lunghezza della descrizione/cache, i contatori runtime e una richiesta di esempio protetta. Anche la scheda Audio è attiva: espone l'abilitazione, un selettore di modelli solo STT con Auto, i limiti di timeout/durata massima del clip, i contatori audio e un test di esempio `input_audio`. La scheda Video è funzionale: riporta lo stato runtime di FFmpeg/ffprobe — uno di quattro stati UI espliciti (`unknown` mentre il probe è in corso o non è riuscito a completarsi, `restricted` su un host della dashboard non-loopback dove il probe viene saltato lato client, `unavailable` una volta eseguito il probe e confermata l'assenza, oppure `available` con le versioni di FFmpeg/ffprobe) — rende persistenti i limiti di abilitazione/modello/frame/video/timeout, filtra il selettore dei modelli su quelli con capacità di visione ed espone i contatori video.

La precedente scheda Vision Bridge nelle impostazioni AI è un collegamento di compatibilità alla nuova pagina; non possiede più una seconda copia del modulo. Anche Media Providers collega i flussi di lavoro Image-to-Text e Speech-to-Text alle corrispondenti schede del Modality Bridge senza rimuovere il playground Speech-to-Text esistente.

**Bypass dell'ammissione self-loop:** quando la chiamata describe viene instradata attraverso il self-loop `/v1` di OmniRoute stesso (modello di provider non standard), la sotto-richiesta invia `x-omniroute-admission-bypass: internal` ed è autenticata con la credenziale self-loop risolta — il valore sentinella locale `sk_omniroute` in modalità locale, oppure la chiave env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurata dall'operatore (#1350), così che i deployment con `REQUIRE_API_KEY=true` possano comunque eseguire la chiamata describe. Il bypass è onorato solo per quelle credenziali esatte, quindi i client esterni non possono usare l'header per saltare l'ammissione.

I default legacy risiedono in `src/shared/constants/visionBridgeDefaults.ts`; i nuovi default di modalità/task-aware/cache e il resolver delle impostazioni risiedono in `src/shared/constants/modalityBridgeDefaults.ts`. Il guardrail espone un'opzione del costruttore `deps` così che i test possano iniettare implementazioni fittizie di `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercetta le richieste chat che trasportano audio prima che raggiungano una destinazione che non è nota accettare input audio. Non reindirizza mai la richiesta chat: le parti audio vengono trascritte tramite l'endpoint multipart esistente compatibile con OpenAI e il modello chat scelto prosegue con le trascrizioni testuali.

Flusso:

1. Risolve `supportsAudio` tramite `getResolvedModelCapabilities()`. I metadati
   espliciti del provider-registry hanno la precedenza, seguiti dai metadati
   statici del modello e poi da `modalities_input` sincronizzato. Una lista di
   input dichiarata priva di `audio` vale `false`; l'assenza di evidenze sulle
   capacità resta `null`. Sia `false` che `null` attivano il bridge conservativo,
   mentre `true` lo bypassa.
2. Risolve le impostazioni `modalityBridgeAudio*` ed estrae le parti audio di
   primo livello processabili tramite splice da ogni messaggio attraverso il
   rilevatore condiviso `detectMediaParts()`. I formati wire supportati sono
   OpenAI `input_audio`, `audio_url` e `source.media_type: "audio/*"`. L'audio
   annidato viene rilevato ai fini del routing ma non rimosso dal percorso di
   splice. Il lavoro è limitato da `modalityBridgeAudioMaxClips`; le parti
   successive restano intatte.
3. Onora un `provider/model` configurato, oppure lascia che
   `selectAudioBridgeModel()` scorra `AUDIO_TRANSCRIPTION_PROVIDERS` nell'ordine
   stabile del catalogo e selezioni il primo modello con una credenziale di
   provider attiva e utilizzabile.
4. `callAudioTranscription()` converte l'audio base64/data-URI in un `file`
   multipart, oppure scarica un `audio_url` remoto attraverso il guard per le
   connessioni in uscita verso sole destinazioni pubbliche, con DNS pinning e un
   limite di 25 MB. Invia quindi in POST il file e il modello selezionato al
   self-loop locale `/v1/audio/transcriptions`, autenticato con
   `resolveSelfLoopBearer()`. La route di trascrizione esistente esegue la
   normale ricerca delle credenziali, la gestione di cooldown/rate-limit e il
   dispatch al provider.
5. Le chiamate riuscite sostituiscono le rispettive parti con
   `[Audio N]: <transcript>`. Le chiamate vengono eseguite con
   `Promise.allSettled`: un singolo fallimento preserva la parte audio originale
   corrispondente (contratto #4012). Se tutte le chiamate falliscono e per il
   target è accertato `supportsAudio === false`, le parti diventano
   `[Audio N]: (unavailable — no STT provider connected)` (contratto #8430). Per
   un target sconosciuto (`null`), un esito di fallimenti totali resta intatto.
   Un target accertato come solo testo e privo di una credenziale STT
   utilizzabile riceve lo stesso stub esplicito senza emettere alcuna chiamata
   di rete.

Le trascrizioni riuscite usano la cache LRU/TTL del Modality Bridge, condivisa a
livello di processo. La chiave combina il riferimento audio, l'etichetta stabile
dell'operazione `audio-transcription` e il modello STT selezionato; i fallimenti
non vengono mai memorizzati in cache. I tentativi audio aggiornano i contatori
condivisi `bridged`, `cacheHits`, `failures` e `lastUsedAt`. Le risposte
trasformate recano
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; le
richieste non modificate non ricevono alcun segmento Audio Bridge.

Le impostazioni di runtime sono persistite su DB e validate tramite Zod:

| Chiave                        | Predefinito | Intervallo         |
| ----------------------------- | ----------- | ------------------ |
| `modalityBridgeAudioEnabled`  | `true`      | —                  |
| `modalityBridgeAudioModel`    | `""`        | Auto oppure ID STT |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000        |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10               |

La cache condivisa resta controllata da `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercetta le parti video di primo livello nei `messages` di Chat Completions e
nell'`input` della Responses API prima che venga invocato un target privo di
supporto video nativo noto. I formati supportati sono `input_video`,
`video_url`, `video_source`, URL HTTPS e data URI `data:video/*;base64,...`. I
semplici nomi di file nel testo non vengono trattati come video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestisce l'attraversamento
della richiesta, il controllo di capability/policy, l'aggregazione per richiesta
e il payload della risposta. Il lavoro per singolo video — acquisizione, cache
del risultato completo, descrizione di una sequenza di frame (che fonde
l'eventuale trascrizione audio dichiarata dal chiamante) e metriche/abort/pulizia
per singolo tentativo — è nascosto dietro `processVideoPart` in
`videoBridgePipeline.ts`, invocato una volta per ogni parte video all'interno
del loop di `preCall`. Quel modulo definisce inoltre i confini espliciti delle
porte `VideoMediaBrokerPort` (acquisizione dei byte ed estrazione dei frame
campionati), `VideoAudioTranscriptionPort` (fusione di una trascrizione audio
dichiarata dal chiamante con le didascalie campionate) e `VideoDrilldownPort`
(il confine di persistenza del drill-down dei frame; non ancora collegato a
`processVideoPart` — oggi solo la route separata
`/api/modality-bridge/video/drilldown` scrive le voci di drill-down).

Il percorso pubblico delle richieste `/v1` non importa né invoca mai un
sottoprocesso. I video remoti vengono scaricati entro un limite di 50 MiB; i
video base64 inline hanno un limite conservativo di 36 MiB decodificati per
video, in modo che l'inviluppo modello/messaggi/framing possa restare entro il
limite pubblico di ammissione delle richieste JSON di 50 MiB. Le stime della
lunghezza inline e della dimensione decodificata vengono verificate prima
dell'allocazione. HTTPS è obbligatorio sull'URL remoto iniziale e su ogni
redirect, utilizzando il guard esistente per le connessioni in uscita verso sole
destinazioni pubbliche con DNS pinning. I byte attraversano quindi l'esatto
confine interno del broker `POST /api/modality-bridge/video/extract`. Quella
route è sia `LOCAL_ONLY` che `SPAWN_CAPABLE`, accetta solo richieste
trusted-loopback autenticate a livello di processo e non accetta mai un URL, un
percorso di filesystem, un eseguibile o una lista di argomenti. La pipeline
della dimensione del body dell'API e il lettore incrementale del body
dell'handler impongono indipendentemente un limite di input del broker di 50
MiB. La sua coda limitata esegue un'estrazione alla volta, ammette quattro job
in sospeso e limita l'input in sospeso a 100 MiB.

All'interno del broker, `ffprobe` legge un file locale privato; l'allowlist fissa dei formati esclude i formati playlist e manifest. Per i container consentiti della famiglia MOV, i riferimenti esterni ai dati MOV restano disabilitati per impostazione predefinita e il comando fisso non li abilita. Sia `ffprobe` che `ffmpeg` usano la whitelist di protocollo limitata a `file`, un solo thread, array di argomenti fissi, nessuna shell ed eseguibili risolti tramite `PATH`. Gli stream di copertina attached-picture non sono candidati riproducibili. Tutti gli stream riproducibili devono soddisfare i limiti, e uno stream predefinito esplicito viene preferito rispetto al fallback deterministico sull'indice più basso. I video sono limitati a 600 secondi, 8,192 pixel per dimensione e 33,554,432 pixel sorgente. FFmpeg campiona 1–16 fotogrammi JPEG al punto medio, riduce il lato lungo ad al massimo 1,024 pixel senza ingrandire gli input più piccoli e non riceve mai un URL. Il campionamento è `uniform` per impostazione predefinita. Le policy opzionali `scene_aware` e quella sperimentale `segment_aware` eseguono un passaggio FFmpeg fisso aggiuntivo sullo stream locale già validato, selezionano un insieme limitato di timestamp di scena `showinfo` e ricadono in modo deterministico sugli stessi punti medi uniformi in caso di fallimento del rilevatore, timeout, output malformato o insieme di candidati vuoto. La modalità segment-aware alloca i campioni al punto medio proporzionalmente agli intervalli di scena validati; l'evidenza e il comportamento di fallback della modalità segment-aware sono dettagliati di seguito. Il limite rigido di 16 fotogrammi viene applicato dopo la selezione in ogni policy. Quando una richiesta scene-aware ha un budget di un solo fotogramma, usa il punto medio uniforme della finestra attiva (video completo o finestra di focus) e riporta `policyEffective: uniform`: un singolo fotogramma di scena selezionato non può preservare entrambi gli estremi temporali. Un chiamante può opzionalmente fornire una finestra di focus finita (`start`/`end` in secondi); i limiti vengono ancorati alla durata del media, le finestre invertite o non finite vengono rifiutate e tutte le policy di campionamento vengono eseguite solo all'interno dell'intervallo normalizzato. La finestra risultante è inclusa nei metadati di campionamento e nel prefisso di descrizione non attendibile, in modo che i modelli a valle possano distinguere un estratto con focus dalla timeline completa.

Il focus semantico delle caption è un'impostazione separata ed esplicita. La modalità di analisi predefinita `full` preserva il prompt dei fotogrammi esistente e non inoltra mai il testo della richiesta al modello di caption. In modalità `focused`, il bridge legge solo l'ultimo `text`/`input_text` non vuoto scritto dall'utente nello stesso container Chat o Responses, lo normalizza in NFC, comprime i caratteri di controllo e gli spazi e lo limita a 500 code point Unicode. Un risultato vuoto ricade sull'esatto prompt `full`. Un hint utilizzabile viene serializzato come JSON in un blocco dedicato di contesto utente non attendibile e può solo dare priorità a dettagli osservabili; non può prevalere sull'avviso separato che vieta di seguire istruzioni visibili o udibili nel media. Il focus testuale non deduce mai `start`/`end` né modifica il campionatore temporale.

#### FU-07 evidenza strutturale dei segmenti

`segment_aware` usa un unico passaggio di pre-analisi limitato sullo stream video locale già validato. La catena di filtri fissa prima riduce la larghezza ad al massimo 320 pixel, rileva i cambi di scena e gli intervalli congelati, poi campiona a 1 fotogramma al secondo per sfocatura, luma media e informazioni spaziali/temporali. Il passaggio è limitato a 600 campioni strutturali, un thread FFmpeg/filtro, le stesse allowlist di protocollo solo `file` e di container, un limite di 1 MiB per l'output del processo e al massimo 30 secondi entro l'abort/deadline condiviso del broker. Non accetta mai un comando, un filtro, un percorso o un URL dalla richiesta.

I valori strutturali costituiscono evidenza di campionamento deterministica, non comprensione semantica del video. Non deducono soggetti, azioni, didascalie, parlato o intento dell'utente. I confini di scena e di freeze formano i segmenti; copertura del freeze, sfocatura, esposizione, dettaglio spaziale e variazione temporale influenzano unicamente il modo in cui viene allocato il budget esistente di 1–16 fotogrammi. Un segmento completamente congelato è limitato a un fotogramma, mentre i segmenti non congelati competono per il budget rimanente. Quando i confini sono più numerosi dei fotogrammi, viene mantenuta la copertura uniforme della timeline, così che tagli rapidi all'inizio non possano nascondere un lungo segmento finale. I confini di scena che ricadono entro la risoluzione di analisi di 1 secondo da un confine di freeze vengono fusi.

Filtri mancanti, evidenza malformata o vuota, un errore del rilevatore o il timeout limitato della pre-analisi vanno in fail-open verso l'esatta policy uniforme dei punti medi. Un abort del chiamante o una deadline del broker non va in fail-open: termina il sottoprocesso in esecuzione, impedisce l'estrazione successiva dei fotogrammi e l'albero temporaneo privato viene rimosso nel `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera fixture FFmpeg reali e deterministiche per i risparmi di chiamate caption post-dedup, l'allocazione del budget con movimento denso, l'evidenza di sfocatura/esposizione/SI-TI, tagli rapidi con coda lunga e falsi positivi da dissolvenza graduale. Registra il wall time della pre-analisi e, dove `/usr/bin/time` è disponibile, la CPU del processo figlio e il picco di RSS. I suoi controlli di qualità sono esclusivamente oracoli strutturali. La qualità reale del modello di caption resta `HOLD` perché questo harness non dispone di un endpoint autorizzato né di un giudice congelato. Anche i risparmi monetari restano `HOLD`, a meno che `--caption-cost-per-call-usd` non fornisca una stima positiva esplicita per chiamata; lo script non inventa mai nessuno dei due risultati.

Ogni fotogramma è limitato a 4 MiB, tutti i fotogrammi grezzi complessivamente a 23 MiB, e la
risposta serializzata del broker a 32 MiB. Una directory temporanea privata viene rimossa
nel blocco `finally`. OmniRoute non include FFmpeg e non accetta un percorso
eseguibile personalizzato. Prima della generazione delle didascalie, il bridge applica un
passaggio conservativo di deduplicazione visiva: ogni JPEG viene ridotto a un buffer in
scala di grigi 16×16 e viene confrontato solo con l'ultimo fotogramma conservato. Per un
budget di didascalie richiesto superiore a un fotogramma, l'estrazione fornisce un
pool limitato di candidati pari al massimo al doppio di tale budget e mai più di 16 fotogrammi.
Il limite richiesto viene applicato solo dopo la deduplicazione, con il primo e l'ultimo
candidato selezionato preservati durante l'assottigliamento finale quando il budget è almeno
due. La policy versionata
`grayscale-16x16-mean-cells-v2` utilizza il maggiore tra il delta medio di luminanza e
il rapporto delle celle della miniatura il cui delta normalizzato è almeno 0,05. La
soglia di duplicazione è la costante 0,04, scelta per la prevedibilità anziché
esposta come impostazione di runtime. Questo segnale secondario
ad alto contrasto preserva i piccoli movimenti e i cambiamenti di testo visibile che un
confronto basato solo sulla media può nascondere. Gli errori del comparatore o del decoder falliscono in modalità aperta e mantengono
la copertura. I metadati in uscita separano i candidati estratti, i fotogrammi
effettivamente utilizzati e i duplicati visivi scartati.

Una parte video esplicitamente marcata può richiedere un contact sheet con timestamp. Il
bridge costruisce al massimo una griglia JPEG di 16 fotogrammi su 4 colonne. Ogni cella da 512 pixel imprime
il timestamp della sorgente in una banda inferiore ad alto contrasto, mentre gli stessi timestamp
rimangono nei metadati testuali per l'associazione a valle e l'audit. Il
JPEG completo rimane limitato a 32 MiB. Se `sharp` non riesce a decodificare o comporre la griglia, il
bridge torna ai singoli fotogrammi JPEG; un'interruzione del client si propaga comunque
attraverso l'operazione sul foglio.

L'evidenza di promozione è deliberatamente separata dal microbenchmark
sulla composizione sintetica. `scripts/perf/video-bridge-contact-sheet-eval.ts` definisce un
harness A/B con schema versionato per modelli di visione reali compatibili con OpenAI. Misura
i token riportati dal provider, la latenza wall-clock end-to-end (inclusa la composizione del foglio),
il numero di chiamate al modello e la ritenzione dei fatti definita dal manifest. Le risposte grezze del modello non vengono
scritte nel report; vengono conservati solo i digest SHA-256 e gli ID dei fatti corrispondenti. L'
harness non effettua alcuna chiamata di rete o a modelli a pagamento a meno che non venga passato `--execute-real` e
siano configurati `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Senza
quell'esecuzione reale esplicita, il suo verdetto leggibile dalla macchina rimane `HOLD`; le sole
misure sintetiche di payload/conteggio delle chiamate non costituiscono evidenza di promozione.

I chiamanti possono allegare un array opzionale `transcript.cues` a una parte video
supportata quando dispongono già di testo allineato. Ogni cue deve contenere `text`, un
intervallo finito `start`/`end` all'interno della durata rilevata e una
`source` in whitelist (`client`, `embedded` o `audio-bridge`); `confidence` ha come valore predefinito
`1` e deve rimanere tra `0` e `1`. I cue duplicati esatti vengono compressi.
OmniRoute non avvia mai la trascrizione da questi metadati: i cue validati vengono
copiati nel risultato descritto con sorgente, confidenza e intervallo, e
vengono resi come osservazioni non attendibili accanto alle didascalie dei fotogrammi. Il testo non valido,
fuori intervallo o privo di provenienza viene rifiutato anziché mescolato nel
flusso delle didascalie. Entrambi i canali di trascrizione del corpo della richiesta normalizzano la
provenienza fornita a `client`, incluse le etichette auto-dichiarate `embedded` o `audio-bridge`.
Solo un adapter di proprietà del server può assegnare quelle etichette attendibili tramite
l'argomento `trustedSource`, accessibile solo dal codice; un campo JSON della richiesta non può raggiungere
tale argomento. Il testo della trascrizione rimane contenuto non attendibile derivato dai media,
indipendentemente dalla sua provenienza, e non deve mai determinare l'autorizzazione.

Un chiamante avanzato può fornire una traccia `audioTranscript` per lo stesso video;
essa viene trattata come testo fornito dal client, non come prova di una trascrizione del server.
Il punto di fusione esegue le osservazioni visive e audio sotto
un'unica scadenza e un unico segnale di interruzione, le ordina su una timeline comune, comprime
i duplicati esatti e riporta un risultato parziale quando solo un lato ha successo.
Un `audioTranscript` non valido degrada a quel risultato parziale — la descrizione
visiva viene conservata e il ramo audio registra un codice di errore sanificato —
invece di far fallire l'intero video. La disponibilità per ramo, il flag di parzialità
e i codici di errore sanificati vengono preservati nel risultato descritto, nei
metadati del guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nei metadati della cache dei risultati e nei contatori di
fusione del bridge. Il percorso predefinito del Video Bridge non invoca il riconoscimento vocale
né scarica una seconda copia del media; senza quella traccia esplicita, rimane
solo video.

**Conservazione delle trascrizioni (#12150 P1).** Si applica automaticamente ogni volta che il Video Bridge (esso stesso opt-in) esegue il rendering di un cue di trascrizione — non esiste un flag di conservazione separato. Quando una richiesta esegue il rendering di un qualsiasi cue di trascrizione (un `transcript` dichiarato dal chiamante o un `audioTranscript` fuso), il guardrail la contrassegna come `videoBridgeObserved` e produce una copia shadow oscurata della descrizione video — un rendering identico in cui il corpo di testo libero di ogni cue viene sostituito da `[redacted-video-transcript]`, costruita sostituendo il campo strutturato del cue prima che la stringa venga assemblata (mai analizzando il testo appiattito, così nessun contenuto dei cue — ostile o ordinario, inclusi corpi contenenti `]` come `[inaudible]`/`[music]` — può sopravvivere). Il corpo della richiesta conservato nel log delle chiamate sostituisce ogni parte di testo derivata dal video con quella copia shadow oscurata, abbinata per uguaglianza di contenuto; l'ancora `fullText` viene riletta dal payload finalizzato del guardrail pre-chiamata, quindi l'abbinamento riesce ancora dopo che i guardrail successivi della catena (i meccanismi di mascheramento di PII e credenziali, priorità 10/95) riscrivono in loco il testo della descrizione e dopo che l'iniezione di system prompt/handoff/memoria rimodella l'array dei messaggi. Il corpo inviato upstream al modello resta invariato. Una richiesta osservata inoltre non popola alcuna Memory durevole (l'estrazione derivata dalla richiesta e quella derivata dalla risposta vengono entrambe saltate), quindi la risposta stessa del modello non può riecheggiare testo della trascrizione nella Memory.

**Campi video grezzi (#12430).** Quando il bridge è abilitato e il supporto video nativo è sconosciuto o assente, anche i campi `transcript`/`audioTranscript` definiti attivano `videoBridgeObserved`, persino dopo un fallimento della descrizione o un limite `maxVideos`. `null` e le stringhe vuote contano; i campi assenti e i metadati non video no. Le copie conservate oscurano questi campi oppure omettono la richiesta, e cache/Memory vengono bypassate.

Su questi percorsi di fallback, i cue validi del chiamante diventano parti `text`/`input_text` supportate anziché campi provider non standard. Entrambe le tracce fornite nella richiesta restano osservazioni `client` non attendibili, con un avviso esplicito che il video non è stato descritto e che i timestamp non sono stati verificati rispetto al media. I budget esistenti — 256 cue/64 KiB in totale e per cue — si applicano alle due tracce insieme; i timestamp devono rientrare nel tetto di 600 secondi del broker e in qualsiasi finestra di focus fornita. Le tracce non valide vengono scartate, non inoltrate come testo arbitrario; una traccia sorella valida può comunque essere usata, a meno che il loro budget combinato non venga superato. I campi null/vuoti non aggiungono testo. Questo fallback non aggiunge alcun recupero del media né trascrizione. I campi di estensione della trascrizione vengono rimossi dal carrier video di fallback e dai suoi oggetti `video_url`/`source`. L'allowlist wire di OpenAI resta rigorosa; i carrier video con supporto nativo sconosciuto restano disponibili e i target noti come solo testo mantengono marcatori sicuri. Le copie shadow di oscuramento strutturato proteggono il testo della trascrizione aggiunto, mentre la richiesta originale di proprietà del chiamante resta invariata. I target con supporto nativo e i bridge disabilitati mantengono il loro comportamento di bypass esistente.

Le copie conservate aggiuntive usano lo stesso segnale di richiesta osservata. Lo snapshot grezzo della richiesta client pre-guardrail, la richiesta in sospeso in memoria e il log delle richieste rifiutate anticipatamente sostituiscono strutturalmente i campi di trascrizione nelle parti video; i prompt in forma di stringa sintetizzati dagli stadi della pipeline e dall'handoff di contesto vengono oscurati nel sink del corpo della richiesta conservata. Il marcatore `video_content_removed` conservato fa sì che la continuazione tramite `previous_response_id` fallisca in modo chiuso (fail-closed) anziché ricostruire testo che era stato intenzionalmente scartato. Se una richiesta osservata perde la sua copia shadow di oscuramento per parte prima del logging, o anche solo una delle diverse copie shadow video non riesce ad abbinarsi dopo successive modifiche della richiesta, il corpo della richiesta conservata viene omesso interamente anziché conservare una trascrizione parzialmente oscurata.

Per una richiesta osservata, una risposta del modello potrebbe citare qualsiasi porzione della trascrizione senza un confine strutturato di cue. Il suo `responseBody` conservato nel log delle chiamate viene quindi sostituito da un marcatore di omissione; l'artefatto dettagliato della pipeline (che può includere corpi upstream/client e chunk dello stream) non viene conservato. Le cache semantiche, di idempotenza e di replay del ragionamento bypassano letture e scritture per quella richiesta. La richiesta al provider e la risposta visibile al client restano invariate. I byte di keepalive iniziali vengono drenati dal buffer temporaneo quando l'artefatto dettagliato viene omesso. L'avviso di EventStream malformato di Kiro riporta solo il numero di byte del payload, mai il suo contenuto o l'errore grezzo del parser JSON. Questo non intende affermare che ogni diagnostica provider/plugin non correlata sia stata sottoposta ad audit; la bonifica più ampia dei sink conservati è tracciata in #11658.

Il ciclo di vita interno di `/api/modality-bridge/video/drilldown` è un substrato di cache separato, autenticato tramite loopback/token. Ogni operazione richiede inoltre un ID di principal opaco canonico. Prima che un chiamante di produzione venga abilitato, deve derivare quell'ID dal tenant autenticato e non deve mai inoltrare un valore selezionato dal client. Le chiavi di cache vincolano quel principal a ID canonici di sessione e di riferimento video, memorizzano solo le chiavi da essi derivate tramite SHA-256 e limitano sia le letture sia l'eliminazione allo stesso principal. La cache memorizza al massimo 16 frame JPEG derivati per voce, li fa scadere dopo dieci minuti e supporta letture delimitate `start`/`end` oppure l'eliminazione esplicita della sessione.

Ogni principal è limitato a 16 voci e 64 MiB di dati JPEG canonici. Questi limiti sono indipendenti dal tetto globale di 64 voci/256 MiB: la pressione sulla quota del principal espelle solo le voci usate meno di recente di quel principal prima che venga presa in considerazione l'espulsione LRU globale. Le voci scadute vengono spazzate via sia dalla contabilità del principal sia da quella globale all'attività della cache, mentre l'annullamento e il fallimento della validazione non rendono definitiva una sostituzione parziale.

La cache rifiuta Base64 non canonico, padding in eccesso, media non JPEG, JPEG malformati o
troncati, e JPEG che producono un avviso durante una decodifica `sharp` delimitata
dell'intera immagine. Ricodifica ogni immagine accettata come JPEG canonico, deriva
larghezza e altezza dai byte decodificati invece di fidarsi dei campi del chiamante, e
scarta eventuali byte poliglotti finali invece di conservarli. Solo il buffer compresso
canonico delimitato viene addebitato su entrambe le quote. Il limite di trasmissione JSON
include l'overhead Base64 per il tetto di 32 MiB di input decodificato. Ogni
derivazione archiviata registra il formato/risoluzione JPEG validato, la politica di
campionamento, la versione di derivazione, l'ora di creazione, l'hash del contenuto
calcolato dal server, e il riferimento hashato al genitore più l'hash del contenuto del
genitore del chiamante fidato. La cancellazione viene verificata tra le fasi asincrone
di decodifica/hash prima del commit atomico nella cache.

Questa tranche non collega ancora un produttore di produzione alla route e non
fornisce la selezione di varianti multi-risoluzione. Il percorso di richiesta
trasparente del Video Bridge non comporta quindi alcun lavoro aggiuntivo, mentre la
derivazione del principal vincolata al tenant e l'intero ciclo di vita
multi-risoluzione FU-08 rimangono lavoro di follow-up esplicito anziché essere
documentati come comportamento completo.

I frame vengono descritti sequenzialmente con il modello Video configurato. Un
override Video vuoto eredita l'impostazione Vision; se entrambi sono vuoti,
l'auto-router Vision seleziona il modello effettivo con capacità vision. Le
descrizioni riuscite sostituiscono la parte originale con un prefisso stabile
`[Video description:` che marca anche il testo come osservazione non fidata derivata
dai media e indica ai modelli a valle di non seguire le istruzioni trovate nei media.
Le chiavi di cache delle descrizioni dei frame includono i byte JPEG, il prompt, il
timestamp e il modello effettivo; solo le descrizioni riuscite vengono memorizzate
nella cache. Le voci di cache conservano il modello produttore effettivamente
riuscito, incluso un modello di fallback; il bridge riporta `mixed` quando frame
diversi sono stati prodotti da modelli diversi. Un hit di cache riutilizza
quell'identità del produttore invece di rietichettarla come il piano di routing
richiesto. La cache dei risultati dell'intero video è basata su ogni input che cambia
l'output — prompt, modello effettivo, politica di campionamento, numero di frame,
modalità di analisi semantica, il fingerprint SHA-256 dell'hint di focus
normalizzato, finestra di focus, `transcript`, `audioTranscript`, e il flag
contact-sheet — quindi modificare una qualsiasi di queste dimensioni è un miss di
cache, mai un riutilizzo obsoleto. La versione della politica di deduplicazione
visiva, la soglia e il numero delimitato di frame candidati sono espliciti anche
nella chiave e nei metadati della cache dei risultati; un cambiamento di politica non
può quindi riutilizzare una descrizione obsoleta dell'intero video. I metadati della
cache dei risultati v4 conservano la modalità e il fingerprint, mai il task utente
grezzo. I metadati del guardrail riportano sia la modalità di analisi richiesta sia
quella effettiva; una modalità `focused` richiesta senza testo utente utilizzabile
viene riportata come effettivamente `full`.

Il guardrail estrae ogni parte video supportata ma non ne descrive più di
`modalityBridgeVideoMaxVideos`. Per un target che ha dimostrato di avere
`supportsVideo === false`, i video falliti e oltre il limite diventano marcatori di
testo sicuri espliciti in modo che nessun video grezzo sopravviva. Quando la capacità
è sconosciuta, quelle parti conservano il loro contenitore video; qualsiasi
trascrizione di fallback segue la conversione di testo delimitata descritta sopra.
I target con `supportsVideo === true` bypassano il bridge.
Il segnale di abort della richiesta client si propaga attraverso download, coda del
broker, sottoprocessi e chiamate di descrizione; gli abort si fermano tra un video e
l'altro e non falliscono mai in modalità aperta verso i media grezzi.

Le impostazioni runtime sono supportate dal DB e validate con Zod:

| Chiave                              | Predefinito | Intervallo / comportamento                                                                                   |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opzionale, opt-in                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` conserva le descrizioni generiche; `focused` usa il contesto limitato e non fidato dell'ultimo utente |
| `modalityBridgeVideoModel`          | `""`        | Eredita il modello del Vision Bridge                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o `segment_aware` proporzionale; il fallimento del detector ripiega su `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                               |

I valori di timeout Video persistiti legacy superiori a 120 secondi vengono limitati
alla deadline del broker; le nuove scritture di impostazioni oltre quel limite vengono
rifiutate.
`GET /api/modality-bridge/video/runtime` richiede la località loopback timbrata e
fidata prima dell'autenticazione o del probing del runtime, quindi richiede
l'autenticazione di gestione. Restituisce solo `available`, le versioni
FFmpeg/ffprobe sanificate, e un motivo fisso quando il runtime non è disponibile.
L'endpoint di estrazione interno non è un'API pubblica di upload: la saturazione
della coda restituisce `503` più `Retry-After`, una disconnessione del chiamante
restituisce `499`, e la deadline fissa del broker restituisce `504`. Le risposte
convertite aggiungono `video->text;model=<visionModel>;parts=<videos>` all'header
centrale `x-omniroute-modality-bridge` senza rimuovere i segmenti Vision o Audio.

### PII Masker (`piiMasker.ts`)

Viene eseguito su **entrambe** le fasi.

- **`preCall`** clona il payload, percorre `system`, `messages`, `input` e
  `prompt` (inclusi gli elementi in forma di stringa semplice) e applica
  `processPII()` (da `@/shared/utils/inputSanitizer`) ai campi stringa
  `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, le PII rilevate
  vengono oscurate nel payload in uscita. Ciò è indipendente da
  `INPUT_SANITIZER_MODE` (che controlla solo la policy di prompt-injection).
  Quando l'oscuramento è disattivato, la chiamata registra i conteggi dei
  rilevamenti senza riscrivere il contenuto.
- **`postCall`** esegue una clonazione profonda della risposta, esegue
  `sanitizePIIResponse()` più il mascheratore per la struttura dell'API
  Responses (`maskResponsesOutput` — copre `output_text` e
  `output[].content[].text`). Se avviene almeno un oscuramento, la risposta
  modificata sostituisce quella originale.

Il guardrail non blocca mai; si limita ad annotare (`meta.detections`,
`meta.redacted`) o a riscrivere.

#### Selezione per tipo, pattern personalizzati e contatori di rilevamento

**Dashboard → Impostazioni → Sicurezza → Mascheramento PII** sceglie _cosa_
viene mascherato. Non attiva il mascheramento: quello resta affidato a
`PII_REDACTION_ENABLED` (richiesta) e `PII_RESPONSE_SANITIZATION` (risposta +
SSE), entrambi disattivati per impostazione predefinita.

- **Selezione per tipo** — gli id integrati sono elencati in
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Se non impostato,
  vale ogni tipo (il comportamento precedente all'introduzione di questa
  impostazione). Il pattern `ssn_us` del motore di richiesta è mappato su
  `ssn`. I modelli (Minimal, Standard, Financial, Brazilian, USA, Full) si
  limitano a compilare le caselle di controllo nell'interfaccia utente.
- **Pattern personalizzati** — fino a 20 pattern regex o wildcard (`*` = fino
  a 64 caratteri diversi da spaziatura, `?` = uno solo). Le corrispondenze
  diventano `[CUSTOM_REDACTED]`. Ogni pattern passa per
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  massimo 500 caratteri, flag limitati a `g i m s u`, deve compilare, deve
  superare `safe-regex` (backtracking catastrofico) e non deve corrispondere
  a una stringa vuota né a un segnaposto di oscuramento. Un pattern che non
  supera i controlli viene rifiutato al salvataggio e al test, e una riga
  memorizzata che non li supera viene saltata a runtime invece di essere
  compilata. I pattern personalizzati vengono eseguiti solo mentre il
  mascheramento è attivo.
- **Contatori di rilevamento** — conteggi per tipo (mai i valori
  corrispondenti), mantenuti in memoria e azzerati al riavvio
  (`src/lib/pii/piiDetectionStats.ts`). Aumentano solo mentre il mascheramento
  è attivo.

Le impostazioni risiedono nella tabella `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e vengono lette tramite una cache di 1 s. API:

| Metodo | Percorso                 | Scopo                                                                         |
| ------ | ------------------------ | ----------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stato dei flag, `enabledTypes`, `customPatterns`, contatori di rilevamento    |
| `PUT`  | `/api/settings/pii`      | Sostituisce `enabledTypes` (`null` = tutti) e/o `customPatterns`              |
| `POST` | `/api/settings/pii/test` | Prova un pattern (dry-run) su un campione di al massimo 8 KB; nulla è salvato |

Tutte e tre richiedono l'autenticazione di gestione e convalidano il corpo con
Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Rileva strutture avversariali nei contenuti forniti dall'utente e applica la
policy configurata. Il comportamento è controllato dalle variabili d'ambiente
e dalle opzioni del costruttore:

| Impostazione     | Variabile d'ambiente                                                                                   | Predefinito | Effetto                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Abilitato        | `INPUT_SANITIZER_ENABLED`                                                                              | `true`      | Quando `false`, il guardrail viene cortocircuitato.                                                                                                                                                                      |
| Modalità         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`      | Policy di injection: `block`, `warn` o `log`. (`redact` è accettato per retrocompatibilità ma **non** rimuove il testo di injection; la riscrittura delle PII nella richiesta è controllata da `PII_REDACTION_ENABLED`.) |
| Soglia di blocco | opzione `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Gravità minima richiesta per bloccare. Con il valore predefinito, il livello medium comporta solo osservazione.                                                                                                          |

**Precedenza delle modalità** (`getMode`): `options.mode` del chiamante →
**override del feature flag nel DB** di `INJECTION_GUARD_MODE` (Dashboard →
Impostazioni → Flag di funzionalità) → env `INJECTION_GUARD_MODE` → env
`INPUT_SANITIZER_MODE` → `warn`. Un override dalla dashboard prevale quindi
sulle variabili d'ambiente, per cui l'interfaccia dei Flag di funzionalità
controlla dal vivo il guardrail in esecuzione (senza riavvio). La lettura dal
DB è fail-safe: se genera un errore, il guardrail torna al comportamento
basato sulle variabili d'ambiente e, quando non è impostato alcun override, il
comportamento è identico alla risoluzione basata solo sulle env.

Fonti di rilevamento:

1. `sanitizeRequest()` da `@/shared/utils/inputSanitizer` (set di rilevatori
   condiviso usato altrove nella pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrati (attualmente `system_override_inline` e
   `markdown_system_block`, entrambi con gravità `high`).
3. `customPatterns` opzionali passati tramite le opzioni del costruttore
   (stringhe, regex o record `{ name, pattern, severity }`).

Quando `mode === "block"` **e** almeno un rilevamento raggiunge la soglia di
severità, `preCall` restituisce `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nelle modalità `warn`/`log` il guardrail
registra l'evento ma consente la chiamata. L'helper condiviso
`evaluatePromptInjection()` è esportato anche per i chiamanti che devono
valutare i prompt senza passare attraverso il registry.

**Limite di scansione (v3.8.20):** il rilevatore ispeziona solo i **primi 16 KB**
del testo del prompt concatenato — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 byte) in `src/shared/utils/inputSanitizer.ts`. Sia `detectInjection()`
che `evaluatePromptInjection()` eseguono `slice(0, MAX_INJECTION_SCAN_BYTES)`
prima di avviare il ciclo dei pattern. Le direttive di injection si trovano
vicino all'inizio di un input, quindi questo limita il consumo di CPU/GC delle
regex su payload di diverse centinaia di KB senza indebolire il rilevamento
(cfr. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Viene eseguito in **entrambe** le fasi, per ultimo nella catena predefinita
(priorità `95`). Oscura i pattern noti di chiavi API / token segreti dal
payload in uscita (contenuto dei messaggi, argomenti delle chiamate agli
strumenti, risultati degli strumenti) **e** dalla risposta del provider, in
modo che una credenziale incollata in un prompt (o restituita come eco dal
risultato di uno strumento) non venga trasmessa al provider a monte né
rispedita al client.

- **Solo opt-in**, stessa convenzione della redazione PII (adiacente alla
  Regola Rigida n. 20): disabilitato a meno che
  `settings.credentialRedactionEnabled === true` **oppure**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando è disattivato, il guardrail è un
  no-op — non blocca mai e non riscrive mai.
- `redactCredentials()` attraversa l'intero albero del payload/della risposta
  (`walkValue()`, sicuro contro il prototype pollution e contro i cicli tramite
  `WeakSet`) e sostituisce le corrispondenze con un segnaposto
  `[REDACTED:<type>]`, clonando solo i rami effettivamente modificati.
- `CREDENTIAL_PATTERNS` copre le chiavi dei provider LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), i token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), le chiavi di pagamento (Stripe,
  Square), le chiavi cloud (AWS access key, Twilio, SendGrid, Mailgun), le
  chiavi private / i JWT, le stringhe di connessione contenenti credenziali
  (`mongodb://user:pass@...`, ecc.) e un pattern generico per i valori degli
  header `Authorization`/`x-api-key`/`api-key`/`apikey`. Le chiavi a forma di
  header (`authorization`, `x-api-key`, `api-key`, `apikey`) vengono oscurate
  strutturalmente (solo il valore, preservando il prefisso dello schema come
  `Bearer `/`Basic `) anziché tramite la regex testuale generica.
- Il guardrail non blocca mai; si limita a riscrivere (`modifiedPayload` /
  `modifiedResponse`) e ad annotare (`meta.credentialsRedacted`, `meta.count`).

Protezione dalle regressioni: `tests/unit/credential-masker-guardrail.test.ts`.

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
