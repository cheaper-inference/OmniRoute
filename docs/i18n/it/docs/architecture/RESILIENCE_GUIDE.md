# Resilience Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ha tre meccanismi di resilienza distinti ma correlati. Ognuno ha una portata e uno scopo diversi. Mantienili separati durante il debug del comportamento del routing.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Precedenza ambiente/dashboard per l'attivazione/disattivazione della resilienza.** La resilienza opt-in attiva/disattiva il seeding dall'ambiente — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — fornisce solo _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Un valore booleano persiste in `resilienceSettings` (Dashboard →** Impostazioni → Resilienza** / `PATCH /api/resilience`, memorizzato in `key_value`) vince sul valore env: la normalizzazione (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mantiene il booleano memorizzato ogni volta che ne esiste uno. L'impostazione di tale env var su `true` su una distribuzione in cui il dashboard ha già salvato `false` pertanto non cambia nulla — attiva l'interruttore** Impostazioni → Resilienza** (o cancellare il campo memorizzato).

## 1. Provider Circuit Breaker

**Ambito:** l'intero provider (ad es. `glm`, `openai`, `anthropic`).

**Scopo:** interrompere l'invio di traffico verso un provider che fallisce ripetutamente a livello upstream/di servizio.

**Implementazione:**

- Classe principale: `src/shared/utils/circuitBreaker.ts`
- Collegamento: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API di stato: `GET /api/monitoring/health`
- API di reset: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- Tabella DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffico normale consentito
- `DEGRADED` — traffico ancora consentito, ma vengono monitorati fallimenti elevati del provider; torna a `CLOSED` dopo un numero sufficiente di successi, dopo un test di connessione valido, oppure dopo la più lunga attesa `OPEN` per l'ultimo tipo di fallimento (il suo valore `cooldownByKind`, altrimenti `resetTimeout`, × `maxBackoffMultiplier`, almeno un cooldown) senza un nuovo fallimento
- `OPEN` — provider temporaneamente bloccato; il routing delle combo lo salta
- `HALF_OPEN` — timeout di reset trascorso; richiesta di probe consentita

**Valori predefiniti configurabili (`open-sse/config/constants.ts`, esposti in Dashboard → Settings → Resilience):**

| Classe  | Degradato a  | Si apre a     | Timeout di reset |
| ------- | ------------ | ------------- | ---------------- |
| OAuth   | 5 fallimenti | 8 fallimenti  | 60s              |
| API-key | 7 fallimenti | 12 fallimenti | 30s              |
| Locale  | derivato     | 2 fallimenti  | 15s              |

`degradationThreshold` controlla quando un provider entra in `DEGRADED`; `failureThreshold` controlla quando si apre e viene saltato. I profili dei provider locali non sono ancora esposti nella pagina delle impostazioni Resilience.

**Codici di attivazione:** solo gli stati a livello di provider `[408, 500, 502, 503, 504]`. NON attivare per errori a livello di account (la maggior parte di 401/403/429 — quelli appartengono al cooldown o al lockout).

**Recupero lazy:** quando `OPEN` scade, `getStatus()`, `canExecute()`, `getRetryAfterMs()` aggiornano lo stato a `HALF_OPEN`. Le stesse letture (e il fallimento successivo) riportano un `DEGRADED` obsoleto a `CLOSED`. Nessun timer in background necessario.

---

### Provider Cooldown globale opt-in (window gate)

Un quarto livello **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, predefinito **off**) mantiene una memoria cross-request dei provider in errore in
`open-sse/services/providerCooldownTracker.ts`, consultata dalla risoluzione dei target delle combo, così che richieste combo consecutive smettano di ripercorrere un provider appena
fallito. Le voci a livello di provider rispettano il window gate di `PROVIDER_PROFILES`:

| Profilo | si attiva dopo (`providerFailureThreshold`) | entro (`providerFailureWindowMs`) | raffredda per (`providerCooldownMs`) |
| ------- | ------------------------------------------: | --------------------------------: | -----------------------------------: |
| OAuth   |                                        `10` |                           `15min` |                               `5min` |
| API key |                                        `15` |                           `30min` |                              `10min` |

Al di sotto della soglia il provider **non** è considerato in raffreddamento; un successo azzera
la finestra. Le voci a livello di connessione (`provider:connectionId`) mantengono invece il
backoff esponenziale `minRetryCooldownMs → maxRetryCooldownMs`. Override:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Guardia di regressione: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Raffreddamento della connessione

**Ambito:** fornitore unico connection/account/key.

**Scopo:** salta una chiave errata mentre le altre connessioni per lo stesso provider continuano a funzionare.

**Attuazione:**

- Segna non disponibile: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selezione: `getProviderCredentials*` nello stesso file
- Calcolo del tempo di recupero: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Impostazioni: `src/lib/resilience/settings.ts`

**Campi per connessione:**

- `rateLimitedUntil` — timestamp fino alla scadenza del tempo di recupero
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contatore di backoff esponenziale

**Tempi di recupero predefiniti:**

- OAuth base: 5s
- Base chiave API: 3 secondi
- Chiave API 429: preferisce il testo di ripristino upstream `Retry-After`/reset headers/parseable
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Ritardo tentativi per provider.** La pagina dei dettagli del fornitore ha un file** Riprova ritardata** selezionare (Auto, da 15 secondi a 1 ora). Salva `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, fino a `PATCH /api/resilience`). Quando un errore di limite di velocità non contiene alcun suggerimento per il nuovo tentativo upstream, tale valore sostituisce il backoff ridimensionato per il provider e reimposta `backoffLevel` su 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Precedenza per un errore con velocità limitata, prima il più alto: suggerimento per i nuovi tentativi upstream, quindi per connessione `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, quindi il ritardo per i nuovi tentativi per provider, quindi env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, quindi il backoff ridimensionato. Rimuove automaticamente il campo. Interessa solo il motivo del limite di velocità, mai gli stati terminali.

**Guardia-mandria antituono:** impedisce agli errori simultanei di estendere eccessivamente il tempo di recupero o di raddoppiare l'incremento `backoffLevel`.

**I 429 con limite di concorrenza non scalano la scala di backoff.** Uno `429` il cui corpo segnala un limite di concorrenza ("troppe richieste simultanee", "limite di concorrenza", "limite di richieste parallele", GLM `并发数过高`) significa che l'account è integro ma occupato. `checkFallbackError()` restituisce il motivo `concurrency_limited`: esegui il failover alla connessione successiva adesso, raffredda questa per un `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) fisso o il suggerimento per il nuovo tentativo upstream, mantieni `backoffLevel` invariato e imposta `skipProviderBreaker`. Un ente di quote esplicito vince comunque, quindi un ente che corrisponde anche a un modello di quote rimane un verdetto di quota. Rilevazione: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; verdetto: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` dell'interruttore) è invariato e si legge ancora `rate_limit` per questi corpi.

**Le bancarelle di contenuti in streaming non raffreddano l'account.** Quando il watchdog dello stallo del contenuto (`open-sse/utils/streamHandler.ts`) si arrende su un flusso che non ha inviato alcun output del modello in tempo, `markAccountUnavailable()` registra l'errore sulla connessione ma non imposta alcun cooldown: lo stallo appartiene a quella richiesta, molto spesso un lungo giro di ragionamento senza ancora alcun output. Gli operatori possono riattivarsi con `resilienceSettings.streamStallCooldown.enabled` ( `false` predefinito).

**Segnale di latenza di attivazione per la selezione dell'account `p2c`.** Ogni tentativo inviato registra il tempo necessario per raggiungere il primo byte e il risultato per connessione (e per modello + per connessione) in una finestra mobile in memoria: gli ultimi 20 campioni entro 15 minuti (`open-sse/services/connectionLatencyTracker.ts`, registrato da `safeLogEvents()` in `src/sse/handlers/chatHelpers.ts`). Quando `resilienceSettings.p2cLatency.weight` è superiore `0` (intervallo 0-20, `0` = disattivato per impostazione predefinita), `compareP2CConnections()` in `src/sse/services/auth.ts` aggiunge punti `weight` a ciascun candidato della coppia. Metà di questo deriva dalla latenza come rapporto con il candidato più veloce (due volte più lento prende l'intera metà) e metà dal tasso di errore di rotazione. Il termine si applica solo quando entrambi i candidati hanno almeno 3 campioni, quindi i nuovi account non vengono penalizzati e il suo tetto rimane al di sotto delle sanzioni per quota bloccata e quota esaurita. Non aggiunge alcun circuito proprio: gli account in errore vengono comunque gestiti dai livelli di raffreddamento, blocco e interruzione. Impostalo con `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**I frame di ragionamento riavviano il budget di stallo dei contenuti.** Un modello di ragionamento può pensare per minuti prima del suo primo token visibile: Claude trasmette frame `thinking_delta` il cui testo pensante può essere vuoto e Responses API trasmette un elemento di ragionamento dopo l'altro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) riconosce questi frame e il watchdog riavvia il proprio budget su ciascuno di essi invece di annullare il turno. Non sono ancora output del modello, quindi un turno che termina solo con il ragionamento viene comunque segnalato come vuoto, e un turno che interrompe il ragionamento e invia solo battiti cardiaci fa comunque scattare il watchdog.

I frame `reasoningContentEvent` binari di Kiro con una firma non vuota preservano questa attività di ragionamento attraverso l'esecutore come un delta `reasoning_content` vuoto. La firma non viene inoltrata. Metadati, frame incompleti e firme vuote non riavviano il budget dei contenuti; si applicano ancora il timeout del flusso attivo indipendente e l'annullamento del client (`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (raffreddamenti NOT ):**

- `banned` — impostato dal rilevamento di parole chiave vietate/esclusione di account (vedere [BAN_DETECTION](../security/BAN_DETECTION.md) ) e da tre rifiuti consecutivi per richiesta a monte (`request_rejected`, ad esempio Anthropic OAuth 403 "Richiesta non consentita" — `open-sse/services/requestRejectedStreak.ts`); un singolo rifiuto non fa altro che raffreddare la connessione
- `expired` (transizioni al terminale dopo tentativi limitati — `EXPIRED_RETRY_MAX = 3` con backoff esponenziale — in modo che gli errori transitori OAuth possano autoripararsi prima che l'account venga disattivato permanentemente)
- `credits_exhausted`

Questi persistono finché le credenziali non cambiano o un operatore non le reimposta. Non sovrascrivere gli stati terminali con uno stato di raffreddamento temporaneo.

**Recupero pigro:** una volta trascorso `rateLimitedUntil`, la connessione diventa nuovamente idonea. In caso di utilizzo riuscito, `clearAccountError()` cancella tutti i campi di errore.

### Muro di utilizzo Claude OAuth : ripristino del limite di sessione + della corsia con priorità inferiore

**Ambito:** una connessione in abbonamento Claude (OAuth). Entrambe le caratteristiche lo sono** opt-in per connessione** (Modifica la connessione → Claude sezione → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, entrambi disattivati per impostazione predefinita) e rispecchia i comandi `/low-priority` e `/limit-reset` di Claude Code (contratto cablato catturato da Claude Code 2.1.263).

**Attuazione:**

- Classificazione della risposta + della macchina a stati: `open-sse/services/claudeLowPriority.ts`
- Reimposta il client status/claim : `open-sse/services/claudeLimitReset.ts`
- Hook dell'esecutore (iniezione di intestazione + nuovo tentativo nello stesso account): `open-sse/executors/base.ts::execute()`
- Persistenza di attivazione: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Grilletto:** il muro di utilizzo di 5 ore — a `429` le cui intestazioni riportano `anthropic-ratelimit-unified-status: rejected` e, quando l'account è idoneo, `anthropic-ratelimit-unified-slow-offer: treatment`. Nulla viene inviato prima di quel primo muro 429; un burst 429 senza intestazioni unificate segue il normale percorso di recupero.

**Corsia con priorità inferiore** (`lowPriorityMode`):

- Sul muro 429 l'esecutore accetta l'offerta e ritenta immediatamente l'offerta** Stesso** conto con `anthropic-usage-limit: slow`; la corsia rimane attiva fino all'annunciato `anthropic-ratelimit-unified-reset` (+ 60s Grace) e ogni richiesta in quella finestra porta l'intestazione. Il 429 intercettato non raggiunge mai `handleChatCore`, quindi la connessione lo è** non** messo in cooldown e non viene ruotato.
- `anthropic-ratelimit-unified-slow-status` sulle risposte successive: `active` / `not_needed` mantieni la corsia; `slot_busy` (429) o `529` attendono `anthropic-ratelimit-unified-slow-retry-after` del server (default 20s, clamp 5–600s, ± 30% jitter) e riprova, limitato da `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 h) — oltre questo termine la corsia termina e un raffreddamento di 10 minuti blocca la riaccettazione. L'attesa è inoltre limitata da ciò che resta del timeout di avvio upstream della richiesta (`resolveFetchStartTimeout`, 10 min per impostazione predefinita) meno un margine di 5 s: senza tale limite, il max-wait predefinito di 20 minuti sopravviverebbe alla richiesta e il sonno verrebbe interrotto a metà dell'attesa, emergendo uno `TimeoutError` invece del grazioso `max_wait` end + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, un rollover della finestra 5h o `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (che termina come `extra_usage` su qualsiasi stato, poiché l'eccedenza pagata ora copre il muro) termina la corsia; la risposta passa quindi al normale percorso di recupero. `budget_exhausted` viene ricordato fino all'annunciato ripristino del budget (≤ 8 giorni).
- Il controllo del muro viene eseguito dopo i 400 tentativi intra-tentativi guidati dall'esecutore (modifica del contesto, morsetti thinking/effort, apprendimento automatico dei parametri), quindi un muro 429 che emerge solo su uno di questi tentativi viene comunque intercettato invece di raggiungere il percorso di recupero.
- Lo stato è in memoria per connessione (un riavvio costa un muro aggiuntivo 429 per riaccettare).

**Reimpostazione del limite di sessione** (`autoLimitReset`, provato prima della corsia quando entrambi sono accesi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blocco; quando `arm: "reset"` e `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con `{ "program": "juniper_tide" }` (organizzazione UUID da `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → la richiesta viene ritentata a piena velocità (nessuna intestazione lenta). `already_used` / `not_offered` memoise `next_available_at` (predefinito una settimana); qualsiasi errore viene ritardato di 15 minuti. Il ripristino avviene una volta alla settimana e conta comunque ai fini del limite settimanale.

Guardie di regressione: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità di sessione (#7274)

**Ambito:** una sessione client (intestazione `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) fissata a una connessione, per** Qualunque** fornitore.

**Scopo:** mantenere un agente multi-turno (codice Claude, aiutante, agenti personalizzati) sullo stesso account per tutte le richieste, riducendo la perdita di contesto tra account e i ripetuti 429 con avvio a freddo sui provider con stato della sessione per account.

**Attuazione:**

- risoluzione TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazione dell'intestazione (generica, qualsiasi fornitore): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella dei pin persistente: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Impostazione: `sessionAffinityTtlMs` ( TTL globale in ms, `0` disabilita) — `src/lib/db/settings.ts`. Rinominato dal solo Codex `codexSessionAffinityTtlMs` mediante migrazione `124_generic_session_affinity_ttl.sql`, che trasferisce qualsiasi Codex TTL precedentemente configurato come nuovo valore predefinito.

Prima del #7274, `resolveSessionAffinityTtlMs()` veniva salvato su `0` per ogni provider tranne `codex`, quindi l'impostazione TTL (e le intestazioni di sessione) non aveva alcun effetto altrove anche se il meccanismo di blocco e l'estrazione delle intestazioni erano già indipendenti dal provider. La correzione ha rimosso il reso anticipato; TTL ora si applica in modo uniforme a ogni provider una volta impostato a livello globale sopra `0`.

Le tre intestazioni di affinità di sessione non vengono mai inoltrate a monte. Gli esecutori — creano le proprie intestazioni a monte da zero anziché passare le intestazioni del client, quindi questo rimane solo un ID di correlazione interna.

### Locazioni esclusive di connessione per sessioni gestite

**Ambito:** uno HTTP client/session gestito attivo possiede una connessione OmniRoute idonea.

**Scopo:** fornire una proprietà di connessione esclusiva e duratura per i clienti che necessitano di un recinto di instradamento rigido tra le richieste. Ciò differisce dall'affinità di sessione, che è una preferenza di continuità morbida: un lease esclusivo persiste lo stato del ciclo di vita in SQLite, impone l'unicità globale del proprietario attivo e della connessione attiva e rifiuta una generazione obsoleta prima dell'invio del provider.

La funzionalità è l'attivazione per chiave API. Una chiave gestita deve avere l'ambito `lease:exclusive` e un elenco `allowedConnections` esplicito e non vuoto. Qualsiasi client HTTP può utilizzare l'endpoint del ciclo di vita; non è richiesto alcun nome client, agente utente, provider, metodo OAuth o modello. Il lease possiede una connessione, non un modello, quindi una modifica del modello mantiene l'associazione mentre la connessione rimane normalmente idonea. Le regole relative a modello normale, quota, integrità, tempo di recupero e lista consentita rimangono autorevoli e possono trasferire la stessa generazione a un'altra connessione idonea gratuita.

Il ciclo di vita è `POST /api/v1/session-leases` con azioni JSON `acquire`, `renew` e `release`. Le richieste di inferenza gestita presentano il valore `X-OmniRoute-Lease-Owner` opaco e `X-OmniRoute-Lease-Generation` esatto. Il proprietario utilizza `vlo_` seguito da 43 caratteri base64url; viene memorizzato solo il suo hash SHA-256. Ogni recinzione di spedizione finale vincola anche la chiave API autenticata ID e la connessione attiva ID. Le intestazioni di controllo del lease vengono rimosse dai log, dagli snapshot delle richieste conservate e dalle intestazioni dell'esecutore upstream.

Se il routing ordinario ha candidati gestiti idonei ma ogni candidato libero è occupato da un contratto di locazione attivo estero, OmniRoute restituisce HTTP `429`, il codice di capacità di locazione non disponibile, uno stato di attesa di capacità e uno `Retry-After` limitato derivato dalla prima scadenza rilevante. L'idoneità vuota ordinaria non è una contesa di lease e mantiene la semantica dell'errore di routing esistente.

I meccanismi correlati rimangono separati:

- L'occupazione della sessione OAuth è una distribuzione soft locale del processo per gli account OAuth.
- I semafori degli account concedono permessi di concorrenza delle richieste e terminano al completamento della richiesta.
- I lease di sessioni gestite esclusive rappresentano una proprietà durevole del ciclo di vita con un recinto di generazione.

---

## 3. Blocco dei modelli (Model Lockout)

**Ambito:** tripletta provider + connection + model.

**Ambito della chiave in base allo stato:** lo stato di errore decide su quale chiave viene scritto un blocco
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un segnale di quota o di entitlement — blocca la **famiglia di quota**:
  per codex l'intero ambito `codex` / `spark` (ogni modello `gpt-5*` della
  connessione), per gli altri provider `getQuotaScopedModelForProvider()`.
- `404` blocca il singolo modello (`getModelLockKey()` restringe il caso `not_found`).
- Qualsiasi altro stato — errori di trasporto/server `5xx` e il `502` sintetizzato
  da OmniRoute stesso in seguito alla validazione della qualità — blocca solo la tupla
  **esatta** provider/connection/model. Uno stream difettoso su un modello non è una prova
  riguardo alla quota dell'account; prima di questa regola una singola risposta vuota su
  `codex/gpt-5.6-luna` rimuoveva ogni modello `gpt-5*` di quella connessione dal
  routing per 2–30 min (in crescita) mentre la sua quota era intatta.
- Un'opzione `scope` esplicita del chiamante ha sempre la precedenza (Antigravity passa `"exact"`).

**Scopo:** evitare di disabilitare un'intera connessione quando un solo modello non è disponibile o è limitato dalla quota.

**Esempi:**

- Provider con quota per modello che restituiscono 429
- Provider locali che restituiscono 404 per un modello mancante
- Errori di permesso specifici del provider per modalità/modello (ad es. le modalità di Grok)

**Implementazione:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Pannello Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Elenca i blocchi attivi con: provider, connection, model, reason, expiresAt. Gli operatori possono riabilitare manualmente un modello dalla scheda.

**REST API:**

- `GET /api/resilience/model-cooldowns` — elenca i blocchi attivi
- `DELETE /api/resilience/model-cooldowns` — riabilitazione manuale. Corpo: `{provider, connection, model}`. Autenticazione: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Una pagina unica per ogni connessione esclusa dal routing per un motivo temporaneo, invece di
aprire la pagina di ciascun provider. Elenca i cooldown delle connessioni, i blocchi dei modelli e gli stati
terminali, li cancella per singola connessione, per una selezione o per tutte le connessioni di un provider,
e modifica le regole di cooldown più regolate: `streamStallCooldown.enabled` e il cooldown di base
e i passi massimi di backoff del `connectionCooldown` OAuth / API-key (salvati tramite
`PATCH /api/resilience`). Gli stati terminali (`banned`, `expired`, `credits_exhausted`)
sono elencati ma non vengono mai cancellati qui.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autenticazione: management):

- `GET /api/resilience/cooldowns[?provider=]` — connessioni con stato, cooldown rimanente,
  livello di backoff, tipo dell'ultimo errore e blocchi dei modelli (senza credenziali)
- `POST /api/resilience/cooldowns` — corpo `{connectionIds: string[]}` oppure
  `{all: true, provider?}`; restituisce `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI delle impostazioni di blocco + ripristino con decadimento dei fallimenti per successo (v3.8.23)

Il blocco dei modelli è passato da un comportamento sempre attivo e hardcoded a una funzionalità
completamente configurabile e opzionale (opt-in), con una propria scheda delle impostazioni e un percorso
di ripristino auto-riparante.

**Scheda delle impostazioni:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
È **distinta** dalla `ModelCooldownsCard` di sola lettura vista sopra (che si limita a
_elencare_ i blocchi attivi) — la nuova scheda _configura i parametri_. I valori predefiniti
si trovano in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Impostazione            | Predefinito                      | Significato                                                                                     |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruttore principale — il blocco dei modelli è **disattivato per impostazione predefinita**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Codici di stato a monte che contano come un errore a livello di modello.                        |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata iniziale del blocco per il primo errore.                                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite massimo del cooldown progressivo.                                                        |
| `maxBackoffSteps`       | `10`                             | Numero massimo di passi di escalation con backoff esponenziale.                                 |
| `useExponentialBackoff` | `true`                           | Se errori ripetuti fanno aumentare il cooldown in modo esponenziale.                            |

Le impostazioni vengono mantenute tramite il normale store delle impostazioni e validate tramite lo
schema delle impostazioni di resilienza; la scheda limita `baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Ripristino con decadimento dei fallimenti per successo:** il ripristino **non** è puramente
basato sulla scadenza del timer. Una risposta sana riduce progressivamente il conteggio dei fallimenti
del modello, così un modello che si è ripristinato a metà finestra smette di aumentare (e viene
sbloccato) prima della scadenza del timer. Quando un target di combo ha successo,
`open-sse/services/combo.ts` chiama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), che **dimezza** il `failureCount` memorizzato
(`Math.floor(failureCount / 2)`); quando raggiunge `0` la voce di blocco
viene eliminata completamente. La controparte `recordModelLockoutFailure()`
incrementa il conteggio (e fa aumentare il cooldown) in caso di fallimenti entro la
finestra di escalation. Questo decadimento per successo si aggiunge alla semplice scadenza del timer —
entrambi i percorsi possono riabilitare un modello.

**Stato:** i blocchi sono mantenuti **in memoria** (`Map` per processo di
`ModelLockoutEntry` con chiave `provider:connectionId:model`, blocchi con ambito exact
con chiave `provider:connectionId:exact:model`), non persistiti nel
DB — vanno persi al riavvio. Le _impostazioni_ sono persistite; lo _stato_ dei blocchi
attivi è effimero.

---

## 4. Controllo della concorrenza delle quote di condivisione (v3.8.36)

Gli account di abbonamento (GLM, MiniMax, ecc.) spesso accettano solo ~ 1–3 richieste simultanee; il superamento di tale limite attiva 429 e tempi di recupero. Questo è acuto sotto** condivisione delle quote** (`qtSd/…`), in cui diverse chiavi API condividono un account upstream. Tre livelli impediscono che un account condiviso venga inondato.

### Limite di concorrenza per connessione (`max_concurrent`)

Ogni connessione del provider può dichiarare un tetto `max_concurrent` (`provider_connections.max_concurrent`, impostato nel collegamento modale / API / DB). Lascialo vuoto per nessun limite. Questa è l'unica manopola che guida il livello di serializzazione sotto — impostandolo sulla concorrenza reale dell'account (ad esempio GLM ~ 1, MiniMax ~ 2).

### Limiti di concorrenza per modello (`modelConcurrency`)

Una connessione può inoltre dichiarare i limiti esatti di concorrenza per modello all'interno della sua mappa `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Impostalo nella connessione modale (** Il limite di velocità sostituisce → Limiti di concorrenza per modello** , uno `model=cap` per riga) o tramite `PATCH /api/providers/[id]` con la stessa forma JSON. Semantica chiave:

- **A livello di connessione e specifico del modello:** `maxConcurrent` rimane il soffitto condiviso a livello di connessione. Quando si applicano entrambi, entrambe le porte vengono acquisite atomicamente nella stessa porta composita (`global → provider → account → model`); il comportamento efficace è il limite applicabile più rigoroso.
- **Corrispondenza esatta modello-chiave:** la chiave è la stringa del modello passata all'esecutore dopo la risoluzione del routing — normalmente l'ID del modello upstream nudo (`glm-5`), non un alias `provider/model` lato client (`zai/glm-5` non corrisponde `glm-5`). I valori rappresentano i limiti massimi di richieste simultanee con numeri interi positivi.
- **Accodamento locale, nessuna scoperta:** le richieste in eccesso vengono accodate localmente con la semantica queue/timeout esistente (errori di ammissione `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` digitati). OmniRoute non scopre né deduce la politica a monte — applica i massimali esatti configurati dall'operatore. Un gate del modello saturo non disabilita mai il provider e non crea mai un blocco permanente del modello; il comportamento 429/cooldown/fallback a monte rimane il backstop dell'errore.
- **Ambito per connessione e per processo:** i limiti sono per connessione al database e mantenuti in memoria, quindi due connessioni che riutilizzano la stessa chiave API upstream non si coordinano tra loro.
- **Non configurato significa invariato:** omettere la mappa (o lasciare vuoto il campo del dashboard) non aggiunge alcun cancello al modello. Configurazione di esempio senza imporre alcun limite al provider universale:

```text
glm-5=1
glm-4.7=3
```

### Serializzazione delle richieste di quota-share

Quando un invio di quota-share prende di mira una connessione che dichiara un `max_concurrent` positivo, vengono inviate richieste simultanee** account** vengono serializzati tramite un semaforo per connessione (tasto `qsconn:<connectionId>`): richieste in eccesso** aspettare in coda** invece di inondare il conto. È** fail-open** — una coda saturata o un timeout procede senza uno slot anziché rifiutare mai una richiesta inviabile. Attiva** Impostazioni → Resilienza → Concorrenza di quota per connessione** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, attivo per impostazione predefinita). Senza `max_concurrent` cap il comportamento rimane invariato.

> Il gate di routing della quota-share (`selectQuotaShareTarget`, DRR + P2C) è esso stesso fail-open e _deprioritizza_ solo una connessione at-cap — con un pool a connessione singola che non può limitare in modo rigido, quindi questo semaforo è ciò che contiene effettivamente il flusso.

### Nuovo tentativo combinato con riconoscimento del tempo di recupero

Per ogni strategia combinata (se abilitata), una richiesta che cristallizzerebbe un 429 per un tempo di recupero temporaneo SHORT attende che finisca e rispedisce invece di restituire il 429 — questo copre le finestre TPM/RPM di classe Gemini (~ 60s retry-after) su combo multi-modello, ad esempio entrambi i target di una combo a 2 modelli che raggiungono un limite di velocità per modello. Delimitato da `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) in** Impostazioni → Resilienza** . Non attende mai i motivi `quota_exhausted` (bloccato fino a mezzanotte) o auth/not-found.

Una combo può rinunciare con `config.comboCooldownWaitEnabled: false`. Solo `false` letterale disabilita queste attese combinate condivise (attese circuit-open/model-lock post-invio e pre-invio) e la relativa estensione del timeout del budget di attesa. Mancante o `true` preserva la politica globale; `true` non può abilitare l'attesa disabilitata a livello globale. Uno `targetTimeoutMs` esplicito vince comunque. Questa rinuncia non modifica l'attesa pre-invio separata del turn-pin del Codex nativo.

Lo stesso cancello copre il caso pre-dispatch (#16319): quando ogni bersaglio di una combo viene saltato prima che venga effettuato qualsiasi tentativo perché il suo modello si trova in un breve blocco transitorio, il percorso zero-tentativo attende il blocco sotto gli stessi limiti e riesegue, invece di rispondere a un `503 ALL_TARGETS_SKIPPED` senza suggerimento. Quando non è consentita alcuna attesa (tetto, tentativo o budget esauriti o funzionalità disattivata), la risposta del terminale viene aggiornata a `429 rate_limit_error` trasportando `retry_after` / `reset_at` dalla prima scadenza del blocco temporaneo; i blocchi quota, autenticazione e non trovato mantengono il 503 senza suggerimenti.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Controllo di ammissione della coda di richieste (v3.8.49 · issue #6593)

**Ambito**: la coda locale di rate-limit per provider+connessione (`open-sse/services/rateLimitManager.ts`,
supportata da Bottleneck), un livello al di sotto dei tre meccanismi precedenti.

**`maxWaitMs` delimita l'attesa in coda; `executionMaxWaitMs` delimita l'esecuzione.**
I due sono deliberatamente separati e nessuno dei due alimenta l'altro.

`resilienceSettings.requestQueue.maxWaitMs` è il **budget di attesa in coda**:
copre l'attesa di uno slot del provider e poi la permanenza nello stato QUEUED, e il suo timer viene
azzerato nel momento in cui il job lascia QUEUED e inizia l'esecuzione
(`rateLimitManager.ts`, `wrappedFn`). Una richiesta che lo supera non raggiunge mai
l'upstream. Valore predefinito 30000ms, fornito da `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` e fissato da
`tests/unit/ratelimit-admission-control-6593.test.ts`, quindi una modifica a tale valore fa
diventare rosso quel test invece di lasciare silenziosamente obsoleto questo paragrafo.

`resilienceSettings.requestQueue.executionMaxWaitMs` è ciò che Bottleneck
riceve come `expiration` del job, il cui timer parte solo dopo il dispatch. È
una rete di sicurezza per gli executor privi di un proprio timeout upstream, e viene
portato al timeout di avvio del fetch dell'executor quando quest'ultimo è più lungo, in modo che
non possa interrompere una risposta in volo sana. Valore predefinito 600000ms (10 min).

Alimentare il budget della coda in `expiration` è ciò che in passato uccideva i gateway
non incrementali a metà del volo — che legittimamente restano in esecuzione per minuti prima dei primi byte —
ed è il motivo per cui un'expiration viene esposta come `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) mentre il budget della coda porta il
codice di timeout della coda. Si può sovrascrivere l'uno o l'altro tramite `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) o la dashboard
(**Impostazioni → Resilienza**). Entrambi sono limitati all'intervallo 1ms–24h durante la normalizzazione.

**Precedenza, per entrambi:** la variabile d'ambiente fornisce solo il _valore predefinito_. Un valore
persistito in `resilienceSettings.requestQueue` (dashboard / patch API, memorizzato
in `key_value`) ha la precedenza su di esso, e un
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per connessione ha la precedenza su tutto. Impostare
la variabile d'ambiente su un deployment che ha già un valore persistito non cambia
quindi nulla — cancellare o aggiornare invece l'impostazione persistita.

La permanenza in coda è delimitata da `maxWaitMs`; il `maxQueueDepth` qui sotto delimita quanti
chiamanti possono essere in coda contemporaneamente.

**Retry dichiarati nel body: pacing vs lockout.** Un body 429 può indicare la propria attesa
(Gemini `RetryInfo.retryDelay`, testo "retry after Ns"), che
`updateFromResponseBody` legge. Un'attesa che rientra nel `maxWaitMs`
della connessione è pacing: il limiter svuota il suo reservoir per quel periodo e le chiamate in coda
vengono inviate quando si riempie. Un'attesa più lunga di `maxWaitMs` non è qualcosa che la
coda possa aspettare — Gemini risponde a una quota giornaliera esaurita con
`retryDelay: "86399s"`. Il `Retry-After` ritrasmesso sul 429 ricostruito (#16528)
fa già sì che il motore di fallback blocchi il modello per quella finestra, ma mettere in pausa
anche il limiter per essa bloccherebbe comunque qualsiasi chiamata che raggiunga la chiave in anticipo
(dopo un reset di resilienza, ad esempio) per l'intero `maxWaitMs`. Quando tale attesa proviene da un
dettaglio tipizzato di Google `RetryInfo`
(la provenienza `google_rpc_retry_info`) e il limiter della chiave è
già limitato al modello (vedi `getLimiterKey`), il 429 diventa invece un lockout del modello
su quella connessione (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitato a 24h), e il
limiter viene lasciato non in pausa. La selezione dell'account salta in base a quel lock tramite
`isModelLocked()`, e lo stesso fa il gate pre-dispatch della combo per i target fissati
sulla connessione. Su antigravity, il cui limiter è per famiglia di quote, il lock è
sul modello esatto, come i suoi altri lock di quota. Anche il nome richiesto
dal cliente viene bloccato quando un alias lo ha risolto in quel modello, perché quei controlli usano
il nome richiesto; viene bloccato esattamente (`lockExactModel`), quindi un alias che
attraversa una famiglia di quote di antigravity o uno scope codex non blocca mai il proprio. Un
suggerimento in prosa, un `retryDelay` non tipizzato o un
limiter condiviso dall'intera connessione mantengono la pausa. Quando il limiter che il
percorso del 429 ha appena ricostruito va in pausa, un chiamante il cui tempo di coda rimanente termina
prima della pausa viene respinto immediatamente con il codice di timeout della coda
(`checkLimiterPause`) invece di attendere quel tempo; la fine registrata è
ancorata prima che il limiter venga costruito, dove Bottleneck avvia il suo orologio di
refresh, e qualsiasi modifica successiva al reservoir la dimentica. Coperto da
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` e
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limite di ammissione opt-in (novità).** `resilienceSettings.requestQueue.maxQueueDepth`
delimita quante richieste possono restare in coda (non ancora inviate) per un singolo
provider+connessione alla volta. Quando la coda contiene già `maxQueueDepth`
richieste, una nuova richiesta viene respinta rapidamente con un errore tipizzato
`code: "RATE_LIMIT_QUEUE_FULL"` **prima** che raggiunga mai `limiter.schedule()`
— quindi il rifiuto è economico e avviene prima di qualsiasi lavoro a valle di
compressione del prompt / traduzione per quella richiesta. Valore predefinito `0` =
disabilitato, preservando il comportamento esistente di coda illimitata; limitato a 0–100000.
Sovrascrivibile tramite `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) o
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch API).

Il controllo di ammissione stesso è una funzione pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) così
è testabile a livello di unità senza un limiter Bottleneck reale.

> La RFC che ha aperto #6593 proponeva anche un flag
> `bypassCompressionOnRateLimit`. La pipeline `open-sse/services/compression/`
> di questo repository riguarda la compressione del prompt/contesto sulla
> richiesta LLM in uscita (`chatCore.ts`, intorno al blocco
> `resolveCompressionSettings`/`selectCompressionStrategy`), non la
> compressione della risposta HTTP sui corpi 429 sintetizzati — non esiste
> alcun percorso di codice corrispondente per un flag di bypass letterale.
> Inoltre, quel passaggio di compressione del prompt viene attualmente
> eseguito _prima_ di `withRateLimit()` nella pipeline delle richieste, quindi
> riordinarlo per saltarlo in caso di rifiuto per coda piena è una modifica
> separata e più ampia rispetto all'ambito di questo issue; è stata
> intenzionalmente **non** implementata qui ed è lasciata come follow-up nel
> caso in cui il risparmio di CPU valga il rischio del riordino.

### Rete di sicurezza per l'attivazione automatica del rate-limit e protezione della connessione (`rateLimitProtection`)

**Rete di sicurezza per l'attivazione automatica** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default `true`):
Per impostazione predefinita, OmniRoute abilita automaticamente la protezione della coda di rate-limit per tutte le connessioni provider attive basate su chiave API (`getProviderCategory(provider) === "apikey"`). Ciò garantisce che le richieste in arrivo verso chiavi API upstream sensibili al rate-limit vengano accodate e limitate tramite Bottleneck anziché trasformarsi in raffiche di errori 429 upstream. La rete di sicurezza può essere sovrascritta tramite la variabile d'ambiente `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` la disattiva, `true`/`1`/`on` forza l'attivazione), che ha la precedenza sull'impostazione persistente della dashboard (**Impostazioni → Resilienza** / `PATCH /api/resilience`).

**Semantica del campo `rateLimitProtection` per connessione:**
La protezione rate-limit per connessione è tracciata tramite il campo booleano `rateLimitProtection` sulle connessioni provider (persistito come `rate_limit_protection` in SQLite):

- **Attivazione esplicita (`rateLimitProtection === true`)**: la protezione rate-limit è esplicitamente abilitata per questa connessione, indipendentemente dalla categoria del provider o dal fatto che la rete di sicurezza di attivazione automatica sia attiva.
- **Disattivazione esplicita (`rateLimitProtection === false`)**: disabilita la protezione esplicita, ma **non** esclude una connessione con chiave API attiva dalla rete di sicurezza globale di attivazione automatica. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` e `undefined` sono equivalenti: solo `rateLimitProtection === true` viene trattato come un override esplicito. Se `rateLimitProtection` è `false` (o non impostato), una connessione con chiave API attiva soddisfa comunque la condizione di attivazione automatica e rimane protetta dal rate-limit.
- **Nessuna esclusione per singola connessione**: un operatore non può attualmente esprimere "questa singola connessione con chiave API attiva deve funzionare senza la protezione della coda di rate-limit" mantenendo l'attivazione automatica attiva per le altre. Per eseguire le connessioni con chiave API completamente senza code di rate-limit, la rete di sicurezza deve essere disattivata globalmente (`RATE_LIMIT_AUTO_ENABLE=false` oppure `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Percorsi di scrittura supportati:**

- **`POST /api/rate-limits`**: il percorso di scrittura di gestione supportato per attivare/disattivare `rateLimitProtection` per una connessione (`{ connectionId: string, enabled: boolean }`). Chiamarlo con `enabled: true` attiva la protezione esplicita; chiamarlo con `enabled: false` rimuove la protezione esplicita (sebbene le connessioni con chiave API attive rimangano coperte dalla rete di sicurezza globale se l'attivazione automatica è attiva).
- **`PUT /api/providers/[id]`**: deliberatamente **non** accetta né modifica `rateLimitProtection` (#11278). L'aggiornamento dei metadati della connessione provider tramite `PUT /api/providers/[id]` non modificherà mai lo stato persistente della protezione rate-limit.

---

## 6. Watchdog del throughput del flusso lento (#9709)

La guardia `resilienceSettings.streamRecovery.throughputWatchdog` opzionale rileva un upstream che sta ancora inviando blocchi ma producendo un output dell'assistente inferiore alla velocità di output utile configurata. È deliberatamente distinto dal timeout di inattività: i battiti cardiaci e i metadati non ripristinano nessuno dei timer e non contano come progresso. È inoltre distinto dalla scadenza per i tentativi rigidi (#9153), che rimane un limite di sicurezza assoluto indipendentemente dalla qualità dell'output.

Il watchdog richiede un periodo di riscaldamento seguito da una finestra di scorrimento completa prima di poter interrompere. Conta i delta di testo provenienti dagli eventi di output API di completamenti e risposte della chat (un proxy di byte UTF-8 conservativo), ignora gli eventi di solo utilizzo e vuoti e sospende il giudizio mentre sono in corso gli eventi di chiamata allo strumento o di ragionamento. È disabilitato per impostazione predefinita e può essere abilitato con `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (quel valore env semina solo il — predefinito e vince il valore booleano `resilienceSettings.streamRecovery.throughputWatchdog.enabled` salvato; vedere la nota sulla precedenza env-vs-dashboard all'inizio di questa guida); la finestra, il riscaldamento, il tasso minimo e l’output minimo misurabile sono delimitati dal normale livello di normalizzazione delle impostazioni di resilienza.

Se abilitato, l'interruzione del watchdog viene applicata solo al tentativo upstream attivo. Prima di qualsiasi byte visibile al client, il percorso di ripristino anticipato dello stesso account esistente può riaprire il tentativo. Dopo il commit, lo streaming non viene mai riprodotto alla cieca; solo il contratto di continuazione sicuro a metà flusso esistente può cucire un suffisso. La finalizzazione rimane un'unica operazione, quindi la contabilità dell'utilizzo e il rilascio del semaforo non vengono duplicati.

---

## 7. Riformulazione dello stato upstream (errori di quota con stato errato)

**Ambito:** un gateway upstream che segnala un esaurimento temporaneo della quota con lo stato HTTP sbagliato.

**Scopo:** correggere uno stato fuorviante PRIMA della classificazione, in modo che i consumer a valle (motore di fallback, aggregazione combo, la risposta rivolta al client) vedano la vera natura ripetibile del fallimento.

Alcuni gateway segnalano un esaurimento TEMPORANEO della quota con uno stato
HTTP non ripetibile. `agentrouter.org` restituisce `403` (a volte `400`) con un
corpo in cinese (`用户额度不足` / `额度不足`) invece dello standard `429`. Client
come Claude Code trattano `403` come permanente e interrompono la sessione, e
senza correzione il motore di fallback lo classificherebbe come `AUTH_ERROR`
invece che come evento di quota.

**Implementazione:**

- Registro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — un
  elenco di regole per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), confrontate tramite
  `applyStatusRestatement()`.
- Punto di chiamata: il blocco `providerFailure:` in
  `open-sse/handlers/chatCore.ts` (intorno alla riga 3654), subito dopo che
  `parseUpstreamError()` ha analizzato una risposta upstream con uno stato HTTP
  di errore (`!providerResponse.ok`), e prima che venga eseguita qualsiasi
  classificazione, così ogni consumer a valle vede lo stato corretto. Gli
  errori incorporati all'interno di uno stream SSE `200` seguono un percorso
  di parsing dello stream separato e successivo e **non** sono coperti da
  questo hook oggi — una limitazione nota, non ancora necessaria per lo stato
  errato di agentrouter (che emerge come stato HTTP di errore).
- Idoneità al retry: `429` è in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), quindi un errore
  riformulato porta con sé una vera finestra di retry invece di emergere come
  un `403` definitivo.
- Il `defaultRetryAfterMs` sintetico di `60s` (`upstreamStatusRestatement.ts`)
  è solo ciò che la risposta riformulata comunica al **client**; non è di per
  sé la durata interna di cooldown/lockout della connessione — questa è
  governata separatamente dal meccanismo che gestisce effettivamente l'errore
  riformulato (il backoff progressivo del Connection Cooldown, §2, base `3s`
  per i provider con API key; oppure il Model Lockout, §3, per i provider con
  quota per modello come agentrouter). Il router può diventare idoneo al retry
  internamente prima della finestra di 60s che pubblicizza al client — margine
  intenzionale, non un bug.

Gli errori permanenti (`无权访问模型` di agentrouter — nessun accesso a questo
modello) non vengono MAI riformulati: `excludeMarkers` pone il veto alla regola
anche quando `textMarkers` corrisponde, quindi l'errore mantiene il suo stato
originale e nulla lo ritenta all'infinito. La regola di classificazione del
provider corrispondente (`agentrouter-model-access-denied` in
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, un cooldown base dichiarato di `6h`) viene consultata da
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _prima_ del
return anticipato generico `FORBIDDEN` della categoria apikey, condizionata da
`honorsRuleLockScope(provider)` (#10334 — attualmente esclusiva di agentrouter
tramite la allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). Il cooldown di 6h dichiarato dalla regola fluisce
come `fallbackResult.baseCooldownMs`, ma alimenta comunque il percorso di
lockout per quota per modello preesistente (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, invariato da #10334 tranne per la sorgente del
cooldown): viene limitato al valore `mlSettings.maxCooldownMs` dell'operatore
(default `1_800_000ms` / 30min), come ogni altro model lockout, e la _causa di
lockout persistita_ resta quella hardcoded preesistente `"forbidden"`, non
`"auth_error"` della regola — solo la durata del cooldown viene onorata
end-to-end, non la stringa della causa. La connessione stessa resta attiva; i
modelli fratelli sulla stessa connessione non sono interessati.

Gli errori di quota riformulati (`额度不足`) raggiungono una regola del provider
in produzione (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, nessun cooldown dichiarato proprio — si applica il
default di backoff scalato del livello di persistenza). Da #10334, `scope` su
`ProviderErrorRuleMatch` VIENE consumato end-to-end, ma **solo** per i provider
nella allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
oggi solo `"agentrouter"`, condizionato tramite `honorsRuleLockScope()`). Per
ogni altro provider `scope` resta informativo, esattamente come prima di
#10334. `checkFallbackError` espone lo scope della regola corrispondente come
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) è la guardia condivisa che conferma che un
`ruleScope` è genuinamente sicuro da onorare come segnale a livello di
connessione e auto-ripristinante (scope `"connection"`, reason
`quota_exhausted`, mai `permanent`, mai `creditsExhausted` — una difesa contro
una futura regola che accoppi lo scope `"connection"` con uno stato account
permanente). Due consumer lo chiamano:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  invece di ricadere nel ramo di blocco **per modello** del provider passthrough
  (agentrouter ha `passthroughModels: true` → `hasPerModelQuota()`
  restituisce `true`), applica un **periodo di sospensione temporaneo della connessione** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, mai uno stato terminale
  (`credits_exhausted`/`banned`/`expired`) — in modo che la connessione si ripristini
  autonomamente una volta terminato il periodo di sospensione, anziché richiedere un ripristino manuale delle credenziali.
  Questo comportamento viene ignorato per le connessioni con `disableCooling: true` (#2997): tale esclusione
  ricade invece nel blocco per modello (un compromesso documentato —
  vedere il commento nel codice sopra il ramo).
- **Instradamento combinato nella stessa richiesta** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): la stessa guardia contrassegna la
  connessione nell'insieme in memoria `exhaustedConnections`, indicizzato da
  `${provider}:${connectionId}`. Questo ignora soltanto una destinazione rimanente della STESSA RICHIESTA
  che _contiene già quello stesso `connectionId` esatto_ nel proprio
  oggetto di destinazione (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prima della ricerca in `exhaustedConnections`) — una normale
  combinazione basata su un elenco di modelli, in cui le destinazioni adiacenti non contengono un proprio `connectionId`
  fissato e ne viene risolto uno solo per ogni invio dall'header
  `X-OmniRoute-Selected-Connection-Id` della risposta, non produce mai una corrispondenza con tale chiave. In
  questo caso comune, la vera protezione contro il riutilizzo dell'account
  appena esaurito da parte di un ramo rimanente NON è questo Set, bensì il livello di persistenza descritto sopra
  (il valore `rateLimitedUntil` della connessione si trova ora nel futuro), insieme alla
  soppressione di `transientRateLimitedProviders` per l'errore da parte di
  questa stessa guardia (vedere "Progettazione in due fasi" e il commento nel codice sul
  ramo `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): poiché
  tale Set non viene contrassegnato, la forzatura di `allowRateLimitedConnection` in
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NON viene
  attivata per i rami rimanenti del provider, quindi il filtro `rateLimitedUntil`
  della selezione delle credenziali (`src/sse/services/auth.ts:1238`) viene rispettato normalmente e un
  ramo rimanente seleziona una connessione agentrouter diversa e ancora idonea
  oppure non riesce perché non sono disponibili credenziali — non forza il proprio
  riutilizzo della connessione che questo ramo ha appena messo in sospensione.

### Progettazione in due fasi: riformulazione dello stato, quindi classificazione

La riformulazione dello stato (`upstreamStatusRestatement.ts`) e le regole di
classificazione del provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sono registri distinti, entrambi basati sull'id del provider
e su indicatori testuali, ma vengono eseguiti in punti diversi e hanno
scopi diversi: la riformulazione riscrive anticipatamente lo stato HTTP in `chatCore.ts`;
le regole di classificazione determinano il `reason` di fallback e lo `scope`
del blocco (`model` / `provider` / `connection`) all'interno di `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Le regole di classificazione vedono il **testo** completo dell'errore (necessario per trovare corrispondenze con
indicatori nel corpo come `额度不足`) soltanto per i provider elencati nella allowlist
`FULL_TEXT_RULE_PROVIDERS` in `providerErrorRules.ts` — attualmente soltanto `"agentrouter"`. Per
ogni altro provider del **catalogo integrato**, `checkFallbackError` passa a
`getProviderErrorRuleMatch` soltanto l'errore strutturato (`{code, type}`), che
è sufficiente per le regole basate su header, stato o codice, ma non rileva gli indicatori testuali nel corpo.
La funzione helper `resolveRuleMatchBody()` esegue questa selezione: il testo completo dell'errore
per i provider presenti nell'allowlist, altrimenti l'errore strutturato. L'aggiunta di un
provider **integrato** a `FULL_TEXT_RULE_PROVIDERS` costituisce un'adesione esplicita specifica del provider
ed esiste affinché il percorso predefinito per ogni provider non presente
nell'elenco rimanga invariato byte per byte.

Lo `scope` di una regola (`model` / `provider` / `connection`) costituisce un'adesione separata
rispetto a `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` lo espone soltanto come
`fallbackResult.ruleScope`, mentre i componenti downstream lo considerano qualcosa
di diverso da un'etichetta informativa soltanto per i provider presenti nella
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dello stesso file (controllata tramite `honorsRuleLockScope()` — attualmente soltanto `"agentrouter"`). Vedere "Errori di quota
riformulati" sopra per comprendere che cosa fa effettivamente una corrispondenza con `scope: "connection"` quando un
provider è presente in tale allowlist.

**#11104 — le regole dichiarate dall'operatore ignorano entrambe le allowlist.** Un operatore può
dichiarare una regola per provider in fase di esecuzione tramite `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
senza modificare questo file. Subordinare una regola dell'operatore a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
concepite per proteggere il comportamento **predefinito** delle regole del catalogo integrato — renderebbe
il meccanismo delle impostazioni inefficace per ogni provider, ad eccezione di quelli già
elencati, poiché la dichiarazione della regola rappresenta già l'adesione esplicita dell'operatore.
`resolveRuleMatchBody()` e `honorsRuleLockScope()` verificano entrambi prima
`hasOperatorRuleForProvider()`: un provider con una regola dell'operatore riceve
il testo non elaborato dell'errore e il relativo `scope` dichiarato viene rispettato, indipendentemente dal
fatto che compaia anche in una delle allowlist.

**Limitazione nota — `providerRuleRegistry` non viene mai consultato per HTTP 400.**
Il ramo `BAD_REQUEST` di `checkFallbackError` classifica interamente lo stato 400
tramite i propri array di pattern (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` e così via in `accountFallback.ts`) e restituisce il risultato prima
che venga raggiunto il ramo `configuredRule`/`getProviderErrorRuleMatch` sovrastante.
Una regola del catalogo integrato (o una regola dell'operatore) con `status: 400` è
sintatticamente valida, ma non verrà mai attivata. Attualmente nessuna regola esistente riguarda 400,
quindi nulla in produzione ne risente; tuttavia, una futura regola per 400 richiederà prima
la modifica di questo ramo, un intervento più ampio rispetto all'aggiunta di una regola (poiché
riclassifica 400 per ogni provider che già dipende dal comportamento degli array di pattern)
e non rientra nell'ambito dell'aggiunta di una regola per un singolo provider.

### Aggiungere un nuovo gateway che riporta erroneamente la quota

1. Registrare un array di regole in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenere i `textMarkers`
   specifici per provider; non riutilizzare mai frasi generiche in inglese che
   collidono con `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Facoltativamente, registrare le regole di classificazione in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) per scegliere
   l'ambito di blocco corretto (`connection` per la quota a livello di account,
   `model` per gli errori specifici del modello). Questo passaggio ha effetto in
   produzione solo per i provider le cui regole richiedono il testo completo
   dell'errore (marker nel body): aggiungere l'id del provider a
   `FULL_TEXT_RULE_PROVIDERS` nello stesso file — altrimenti `checkFallbackError`
   passa alla regola sempre e solo l'errore strutturato `{code, type}` e una
   regola basata sul testo del body non corrisponderà mai al traffico reale.
   Le regole che corrispondono puramente su `status`/`headers` (come quelle di
   Opencode o di Minimax) non richiedono questo opt-in. Separatamente, se la
   regola dichiara `scope: "connection"` e l'intento è un cooldown effettivo a
   livello di connessione più il salto della combo nella stessa richiesta (non
   solo un'etichetta informativa), aggiungere l'id del provider a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nello stesso file — è questo che abilita
   il consumo in stile `isAgentrouterConnectionQuotaScope()` in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); senza di esso, `scope`
   continua a fluire attraverso `fallbackResult.ruleScope` ma nulla agisce su
   di esso.
3. Aggiungere unit test che rispecchiano `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluse le guardie
   not-permanent / not-creditsExhausted e — se il provider necessita
   dell'allowlist — un test che verifica che `resolveRuleMatchBody()`
   restituisca il testo completo solo per quel provider).

Non sono necessarie modifiche a `chatCore.ts`, `classifyError` o alla combo.

#### Blocco per bucket di egress (#10880)

I provider in `EGRESS_BUCKETED_LOCK_PROVIDERS` (famiglia opencode) sono trattati
come upstream bucketizzati per IP (il free tier di opencode è bucketizzato per
IP, non per account — vedi #9611): uno status-429 classificato come
`quota_exhausted` **oppure** `rate_limit_exceeded` mette in cooldown ogni
connessione della famiglia in allowlist il cui ultimo IP di egress noto
corrisponde a quello della connessione fallita, prima che la rotazione possa
provarle — evitando N-1 chiamate upstream con fallimento garantito (stesso
schema di #10460/#10525). `rate_limit_exceeded` è incluso deliberatamente: nel
percorso `markAccountUnavailable` le regole specifiche di opencode non
corrispondono mai (nessun header/body passato a `checkFallbackError`, opencode
non è in `FULL_TEXT_RULE_PROVIDERS`), quindi un 429 il cui body contiene il
testo sulla quota dell'abbonamento ("monthly usage limit reached") viene
classificato come `quota_exhausted` dal fallback del testo-quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown di 1h) prima
che la regola `status_429` venga mai raggiunta — mentre un 429 privo di
testo-quota (puro rate limiting) viene classificato tramite la regola
`status_429` come `rate_limit_exceeded` e mette comunque in cooldown la
famiglia IP. Per un provider in allowlist, un rate limit bucketizzato per IP è
lo stesso segnale di una quota esaurita. Limiti, in tutta onestà:

- **Best-effort**: il lock risolve l'ultimo `egress_ip` noto della
  connessione da `proxy_logs` (finestra di 24 ore, sincrono, senza cache).
  Cache fredda (IP di egress mai rilevato) o nessuna riga → la connessione
  fallita viene comunque raffreddata dal ramo (registrata come oggi), solo che
  nessuna sorella viene bloccata.
- **Mai terminale**: il cooldown è una finestra di quota che si rinnova
  (`testStatus: "unavailable"`); uno stato permanente non viene mai derivato da
  un segnale a livello di IP. Le connessioni `disableCooling` saltano
  interamente il ramo.
- **La granularità del lock cambia per la famiglia in allowlist**: questo è un
  cambiamento di ambito, non solo un'ottimizzazione per le sorelle. opencode è
  un provider `passthroughModels`, quindi prima di questo ramo un 429 produceva
  un lockout per-MODELLO; ora produce un cooldown della connessione — anche per
  un operatore che esegue una singola connessione senza alcuna sorella. Questa
  è la granularità che la tabella delle regole di opencode dichiara già
  corretta (`scope: "connection"`, `providerErrorRules.ts`), mai onorata finora
  perché opencode non è in `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il ramo scrive
  esso stesso il cooldown + `backoffLevel` della connessione fallita,
  rispecchiando il ramo agentrouter con ambito di connessione, e ritorna — il
  blocco per-modello e il percorso generico sottostante non vengono mai
  raggiunti.
- **Combo inclusa**: come il ramo agentrouter, l'ambito ignora deliberatamente
  il downgrade `persistUnavailableState`/`isCombo` che un chiamante combo
  applica a un 429. Un lockout per-modello non è una forma più debole di
  questo ambito, è l'unità sbagliata: non dice nulla sull'IP esausto, quindi la
  rotazione combo continuerebbe a bruciare una chiamata garantita-fallita per
  sorella.
- **Sicurezza delle sorelle**: una sorella già terminale
  (banned/credits_exhausted) o già in un cooldown più lungo non viene mai
  sovrascritta.
- **Allowlist esclusiva**: allargare `EGRESS_BUCKETED_LOCK_PROVIDERS` è una
  decisione esplicita del proprietario; nessun wiring generico (pattern
  #10334/#10419). La query delle sorelle usa quella stessa allowlist come
  parametro di binding invece di ripeterla come letterale SQL, quindi
  allargarla resta una modifica di una riga.
- **Rotazione dell'IP di egress, in entrambe le direzioni**: la finestra di
  ricerca (24 ore) è molto più ampia del TTL della cache dell'IP di egress
  (5 min), quindi "ultimo IP noto" è storia, non stato corrente. Se il proxy di
  una connessione ha ruotato all'interno della finestra, il lock può
  **mancare** un IP genuinamente condiviso (l'IP registrato è quello nuovo, non
  esausto) — e simmetricamente può **raffreddare una sorella che nel frattempo
  ha ruotato via** dall'IP esausto. Il secondo caso costa a quella sorella una
  finestra di cooldown; entrambi sono limiti best-effort accettati di una
  ricerca basata sulla storia.
- **Costo**: due scansioni limitate di `proxy_logs` (filtrate per finestra
  tramite `idx_pl_timestamp`), solo alla frequenza dei 429. Nessun nuovo indice
  (migrazione 134 YAGNI). Misurato su una copia di DB con traffico reale di
  dimensioni moderate; un'istanza ad alto throughput contiene
  proporzionalmente più righe nella stessa finestra.

---

## Altre funzionalità di resilienza

- **20 strategie di routing** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — vedi [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing sensibile al reset** (v3.8.0) — dà priorità alle connessioni in base all'orario di reset della quota.
- **Degradazione della modalità background** — la Responses API con `background: true` viene degradata a sincrona con un avviso.
- **Rilevamento dinamico dei limiti dei tool** — riduce la pressione sui provider quando vengono raggiunti i limiti sul numero di tool.
- **Fallback di emergenza** — controllato da `OMNIROUTE_EMERGENCY_FALLBACK`; gli operatori possono sovrascriverlo dalla pagina dei Feature Flags senza riavvio.

---

## Debug

- La combo weighted risponde con `503 all_targets_cooling_down` (`Retry-After` impostato, `diagnostics.excluded` elenca ogni target con `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → il pool è configurato e connesso, ogni target è semplicemente escluso da un timer di resilienza; l'avviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica le ragioni e i secondi rimanenti. Un `404 no_executable_targets` dalla stessa combo significa che nessun timer di resilienza era coinvolto (nulla da eseguire, oppure ogni account ha fallito il probe di disponibilità). Costruito in `open-sse/services/combo/pinRecovery.ts` dalle esclusioni raccolte in `targetResolution.ts`.
- Tutte le chiavi di un provider saltate → controlla sia lo stato del circuit breaker SIA il `rateLimitedUntil`/`testStatus` di ogni connessione.
- Provider escluso permanentemente dopo la finestra di reset → codice che legge lo `state` grezzo invece di `getStatus()`/`canExecute()`.
- Una chiave fallisce, le altre dovrebbero funzionare → preferisci il cooldown della connessione rispetto al circuit breaker.
- Fallisce un solo modello → preferisci il model lockout rispetto al cooldown della connessione.
- Lo stato dovrebbe auto-ripristinarsi ma non lo fa → verifica la presenza di un timestamp futuro + un percorso di lettura che aggiorni lo stato scaduto. Gli stati permanenti richiedono modifiche manuali.

---

## Stato di runtime — riferimento rapido per l'agente

> Spostato verbatim da `AGENTS.md` → "Resilience Runtime State" (PR #12743) affinché la
> guida per l'agente resti sotto il budget di contesto di 40k. È la vista condensata,
> rivolta all'agente, delle sezioni precedenti; le sezioni numerate restano il
> riferimento completo.

OmniRoute ha tre meccanismi di gestione dei fallimenti temporanei correlati ma
distinti. Mantieni separati i loro ambiti durante il debug del comportamento di
routing. Consulta il
[diagramma della resilienza a 3 livelli](../diagrams/exported/resilience-3layers.svg)
(sorgente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
per una mappa a colpo d'occhio.

### Circuit breaker del provider

**Ambito**: intero provider, ad es. `glm`, `openai`, `anthropic`.

**Scopo**: interrompere l'invio di traffico verso un provider che fallisce
ripetutamente a livello upstream/di servizio, così che un singolo provider non
sano non rallenti ogni richiesta.

**Implementazione**:

- Classe principale: `src/shared/utils/circuitBreaker.ts`
- Integrazione del gate di chat e dell'esecuzione: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API di stato runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper condivisi: `open-sse/services/accountFallback.ts`
- Tabella di stato persistente: `domain_circuit_breakers`

**Stati** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: il traffico normale è consentito.
- `DEGRADED`: fascia di pre-allarme — i fallimenti hanno superato la soglia di
  degradazione ma non ancora quella del breaker; il traffico continua a scorrere,
  le dashboard mostrano l'avviso. Un test di connessione valido o una finestra di
  quiete senza nuovi fallimenti lo riporta a `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` indica la finestra).
- `OPEN`: il provider è temporaneamente bloccato; i chiamanti ricevono una risposta
  provider-circuit-open oppure il routing combo salta a un altro target.
- `HALF_OPEN`: il timeout di reset è trascorso; consente una richiesta di probe.
  Il successo chiude il breaker, il fallimento lo riapre.

**Valori predefiniti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
consumati tramite `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` in
`src/lib/resilience/settings.ts` → `getCircuitBreaker(provider, …)` in
`src/sse/handlers/chatHelpers.ts`). Il breaker a livello di intero provider opera su
`circuitBreakerThreshold` / `circuitBreakerReset`:

| Profilo    |  degrada a | si apre a (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ---------- | ---------: | ------------------------------------: | ----------------------------: |
| OAuth      |        `5` |                                   `8` |                         `60s` |
| Chiave API |        `7` |                                  `12` |                         `30s` |
| Locale     | (derivato) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` definisce anche `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) e `providerCooldownMs` (5/10/1 min): questi
alimentano il **gate a finestra del Provider Cooldown globale opzionale (opt-in)**
(`PROVIDER_COOLDOWN_ENABLED`, disattivato per impostazione predefinita) — una voce a
livello di provider in `open-sse/services/providerCooldownTracker.ts` conta come in
cooldown solo dopo `providerFailureThreshold` fallimenti all'interno di
`providerFailureWindowMs`, e poi resta in cooldown per `providerCooldownMs`. NON sono
le soglie del breaker attivo — non modificarle aspettandoti un comportamento del
breaker. Ogni valore predefinito è sovrascrivibile tramite le variabili d'ambiente
`OMNIROUTE_PROVIDER_BREAKER_*` e `OMNIROUTE_CIRCUIT_BREAKER_*`; la tabella di
riferimento aggiornata al runtime si trova in `docs/architecture/RESILIENCE_GUIDE.md`.

Solo gli stati di fallimento a livello di provider dovrebbero far scattare il breaker del provider:

```ts
(408, 500, 502, 503, 504);
```

Non far scattare il breaker dell'intero provider per normali errori di
account/chiave/modello come la maggior parte dei casi `401`, `403` o `429`. Di solito
appartengono al cooldown della connessione o al model lockout. Un `403` generico di
un provider con chiave API dovrebbe essere recuperabile, a meno che non sia
classificato come errore terminale del provider/account.

Il breaker usa un ripristino lazy, non un timer in background. Quando lo stato `OPEN`
scade, le letture come `getStatus()`, `canExecute()` e `getRetryAfterMs()` aggiornano
lo stato a `HALF_OPEN`, così le dashboard e i costruttori di candidati combo non
continuano a escludere all'infinito un provider scaduto.

### Cooldown della connessione

**Ambito**: una connessione/account/chiave del provider.

**Scopo**: saltare temporaneamente una chiave/account problematico consentendo alle
altre connessioni dello stesso provider di continuare a servire le richieste.

**Implementazione**:

- Percorso di scrittura/aggiornamento: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selezione/filtraggio degli account: `src/sse/services/auth.ts::getProviderCredentials...`
- Calcolo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Impostazioni: `src/lib/resilience/settings.ts`

Campi importanti sulle connessioni del provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante la selezione dell'account, una connessione viene saltata finché:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Anche i cooldown sono lazy: quando `rateLimitedUntil` è nel passato, la connessione
torna idonea. In caso di utilizzo riuscito, `clearAccountError()` azzera `testStatus`,
`rateLimitedUntil`, i campi di errore e `backoffLevel`.

Comportamento predefinito del cooldown della connessione:

- Cooldown base OAuth: `5s`.
- Cooldown base per chiave API: `3s`.
- Un `429` su chiave API dovrebbe preferire gli hint di retry upstream (`Retry-After`,
  header di reset o testo di reset analizzabile) quando disponibili.
- I fallimenti recuperabili ripetuti usano un backoff esponenziale:

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protezione anti-thundering-herd impedisce che fallimenti concorrenti sulla stessa
connessione prolunghino ripetutamente il cooldown o incrementino due volte
`backoffLevel`.

Gli stati terminali non sono cooldown. `banned`, `expired` (che diventa terminale solo
dopo N tentativi limitati tramite `EXPIRED_RETRY_MAX`) e `credits_exhausted` devono
rimanere non disponibili finché le credenziali/impostazioni non cambiano o un operatore
non li reimposta. Non sovrascrivere gli stati terminali con stati di cooldown
transitori.

### Lockout del modello

**Ambito**: provider + connessione + modello.

**Scopo**: evitare di disabilitare un'intera connessione quando solo un modello è non
disponibile o limitato dalla quota per quella connessione.

Esempi:

- Provider con quota per modello che restituiscono `429`.
- Provider locali che restituiscono `404` per un modello mancante.
- Fallimenti di permessi su modalità/modello specifici del provider, come le modalità
  Grok selezionate.

Il lockout del modello si trova in `open-sse/services/accountFallback.ts` e consente
alla stessa connessione di continuare a servire altri modelli.

### Guida al debug

- Se tutte le chiavi di un provider vengono saltate, ispeziona sia lo stato del breaker
  del provider sia `rateLimitedUntil`/`testStatus` di ciascuna connessione.
- Se un provider sembra escluso permanentemente dopo la finestra di reset, verifica se
  il codice legge lo `state` grezzo invece di usare `getStatus()`/`canExecute()`.
- Se una chiave del provider fallisce ma le altre dovrebbero funzionare, preferisci il
  cooldown della connessione al breaker del provider.
- Se fallisce un solo modello, preferisci il lockout del modello al cooldown della
  connessione.
- Se uno stato dovrebbe auto-ripristinarsi, deve avere un timestamp/timeout di reset
  futuro e un percorso di lettura che aggiorna lo stato scaduto. Gli stati permanenti
  richiedono modifiche manuali alle credenziali o alla configurazione.

---

## Fingerprinting TLS e Stealth

Le tecniche stealth specifiche per provider (JA3/JA4, CCH, offuscamento) sono documentate separatamente — vedi `docs/security/STEALTH_GUIDE.md` (git; non compilato in `/docs`).

---

## Test di resilienza (Fase 8 · Blocco C)

Oltre agli unit test per la logica di resilienza, tre test esercitano il runtime in
condizioni reali di stress/guasto (tutti integration/nightly — nessuno blocca le PR):

| Test        | Cosa                                                                                                                                                                                       | Esecuzione                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Chaos       | Il nodo fake-upstream inietta latenza/reset/timeout/503 reali; convalida che il circuit breaker si apra/recuperi e che `checkFallbackError` classifichi il 503 come fallback recuperabile. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream per `createSSEStream` con `--expose-gc`; fallisce se l'heap cresce oltre il limite massimo (guardia OOM #3069).                                                                | `npm run test:heap`                      |
| k6 soak     | Carico sostenuto su `/api/monitoring/health`; soglie p95/errori.                                                                                                                           | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestrato da `.github/workflows/nightly-resilience.yml` (cron + dispatch). Nel
`test:integration` predefinito, chaos e heap si auto-saltano (senza `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vedi anche

- [Guida all'architettura](./ARCHITECTURE.md) — Architettura del sistema e componenti interni
- [Guida utente](../guides/USER_GUIDE.md) — Provider, combo, integrazione CLI
- [Motore Auto-Combo](../routing/AUTO-COMBO.md) — Punteggio a 16 fattori, pacchetti di modalità
