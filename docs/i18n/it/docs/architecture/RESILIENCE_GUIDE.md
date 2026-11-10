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

## 2. Cooldown della connessione

**Ambito:** singola connessione/account/chiave del provider.

**Scopo:** saltare una chiave non valida mentre le altre connessioni dello stesso provider continuano a fornire il servizio.

**Implementazione:**

- Contrassegno come non disponibile: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selezione: `getProviderCredentials*` nello stesso file
- Calcolo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Impostazioni: `src/lib/resilience/settings.ts`

**Campi per connessione:**

- `rateLimitedUntil` — timestamp fino alla scadenza del cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contatore del backoff esponenziale

**Cooldown predefiniti:**

- Base OAuth: 5s
- Base della chiave API: 3s
- API-key 429: preferisce gli header upstream `Retry-After`/reset o il testo di reset analizzabile
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Ritardo del tentativo per provider.** La pagina dei dettagli del provider contiene un selettore **Ritardo del tentativo** (Automatico,
da 15s fino a 1h). Salva `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, tramite `PATCH /api/resilience`). Quando un errore di limitazione della frequenza non contiene
alcun suggerimento upstream per il nuovo tentativo, questo valore sostituisce il backoff scalato per il provider
e reimposta `backoffLevel` a 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Precedenza per un errore di limitazione della frequenza, dalla più alta
alla più bassa: suggerimento upstream per il nuovo tentativo, quindi `providerSpecificData.rotationOverrides.rateLimitResetSeconds`
per connessione, quindi il ritardo del tentativo per provider, quindi
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` dall'ambiente, infine
il backoff scalato. Automatico rimuove il campo. Influisce solo sulla ragione della limitazione della frequenza, mai sugli stati terminali.

**Protezione anti-thundering-herd:** impedisce agli errori concorrenti di estendere eccessivamente il cooldown o di incrementare due volte `backoffLevel`.

**I 429 dovuti al limite di concorrenza non fanno avanzare la scala del backoff.** Un `429` il cui corpo segnala un
limite di concorrenza ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa che l'account è integro ma occupato.
`checkFallbackError()` restituisce la ragione `concurrency_limited`: esegue immediatamente il failover verso la connessione successiva,
applica a questa un cooldown fisso `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) o il suggerimento upstream per il nuovo tentativo,
mantiene invariato `backoffLevel` e imposta `skipProviderBreaker`.
Un corpo esplicito relativo alla quota ha comunque la precedenza, quindi un corpo che corrisponde anche a un pattern di quota
rimane un verdetto di quota. Rilevamento: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`;
verdetto: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (il `FailureKind` del breaker)
rimane invariato e continua a leggere `rate_limit` per questi corpi.

**I blocchi del contenuto dello stream non applicano un cooldown all'account.** Quando il watchdog dei blocchi del contenuto
(`open-sse/utils/streamHandler.ts`) interrompe uno stream che non ha inviato output del modello entro il tempo previsto,
`markAccountUnavailable()` registra l'errore sulla connessione ma non imposta alcun cooldown: il blocco appartiene a quella richiesta,
nella maggior parte dei casi a un lungo turno di ragionamento senza output. Gli operatori possono abilitarlo esplicitamente con
`resilienceSettings.streamStallCooldown.enabled` (predefinito `false`).

**Segnale di latenza opzionale per la selezione degli account `p2c`.** Ogni tentativo inviato registra il tempo al primo byte
e l'esito per connessione (e per connessione + modello) in una finestra mobile in memoria: gli ultimi 20 campioni negli ultimi 15 minuti
(`open-sse/services/connectionLatencyTracker.ts`, registrati da `safeLogEvents()` in
`src/sse/handlers/chatHelpers.ts`). Quando `resilienceSettings.p2cLatency.weight` è superiore a
`0` (intervallo 0-20, predefinito `0` = disattivato), `compareP2CConnections()` in `src/sse/services/auth.ts` aggiunge
a ciascun candidato della coppia fino a `weight` punti. Metà proviene dalla latenza come rapporto rispetto al candidato più veloce
(una velocità dimezzata richiede il punteggio completo della metà) e metà dal tasso di errore mobile.
Il termine si applica solo quando entrambi i candidati hanno almeno 3 campioni, quindi i nuovi account non vengono penalizzati,
e il suo limite rimane inferiore alle penalità per quota bloccata e quota esaurita.
Non aggiunge un circuito autonomo: gli account che falliscono continuano a essere gestiti dai livelli di cooldown, blocco e breaker.
Impostarlo con `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**I frame di ragionamento riavviano il budget per il blocco del contenuto.** Un modello di ragionamento può pensare per
diversi minuti prima del primo token visibile: Claude trasmette frame `thinking_delta` il cui testo di ragionamento può essere vuoto,
mentre la Responses API trasmette un elemento di ragionamento dopo l'altro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
riconosce questi frame e il watchdog riavvia il proprio budget su ciascuno di essi invece di annullare il turno.
Non sono comunque output del modello, quindi un turno che termina contenendo solo ragionamento viene ancora segnalato come vuoto,
e un turno che interrompe il ragionamento e invia solo heartbeat attiva comunque il watchdog.

I frame binari `reasoningContentEvent` di Kiro con una firma non vuota preservano questa attività di ragionamento attraverso l'executor
come un delta `reasoning_content` vuoto. La firma non viene inoltrata. I metadati, i frame incompleti e le firme vuote non riavviano
il budget del contenuto; il timeout indipendente dello stream attivo e l'annullamento da parte del client restano applicabili
(`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (NON cooldown):**

- `banned` — impostato dal rilevamento di parole chiave vietate / ban dell'account (vedere [BAN_DETECTION](../security/BAN_DETECTION.md)). I rifiuti upstream per singola richiesta (`request_rejected`, ad esempio Anthropic OAuth 403 "Request not allowed") non lo impostano mai: vengono conteggiati per connessione e modello e rimuovono quel modello dalla rotazione con un cooldown crescente, limitato da `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), oppure applicano un cooldown alla connessione quando non è noto alcun modello — `open-sse/services/requestRejectedStreak.ts`
- `expired` (passa allo stato terminale dopo tentativi limitati — `EXPIRED_RETRY_MAX = 3` con backoff esponenziale — affinché gli errori OAuth transitori possano risolversi autonomamente prima che l'account venga disattivato definitivamente)
- `credits_exhausted`

Persistono finché le credenziali non cambiano o un operatore non li reimposta. Non sovrascrivere gli stati terminali con uno stato di cooldown transitorio.

**Recupero lazy:** quando `rateLimitedUntil` è trascorso, la connessione torna a essere idonea. In caso di utilizzo riuscito, `clearAccountError()` cancella tutti i campi di errore.

### Finestra di utilizzo OAuth di Claude: corsia a priorità inferiore + reimpostazione del limite di sessione

**Ambito:** una connessione Claude in abbonamento (OAuth). Entrambe le funzionalità sono **facoltative per connessione** (Modifica connessione → sezione Claude → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, entrambe disattivate per impostazione predefinita) e rispecchiano i comandi `/low-priority` e `/limit-reset` di Claude Code (contratto wire acquisito da Claude Code 2.1.263).

**Implementazione:**

- Macchina a stati + classificazione delle risposte: `open-sse/services/claudeLowPriority.ts`
- Client per lo stato/la richiesta di reimpostazione: `open-sse/services/claudeLimitReset.ts`
- Hook dell'executor (iniezione dell'header + nuovo tentativo sullo stesso account): `open-sse/executors/base.ts::execute()`
- Persistenza dell'abilitazione: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** la finestra di utilizzo di 5 ore — un `429` i cui header contengono
`anthropic-ratelimit-unified-status: rejected` e, quando l'account è idoneo,
`anthropic-ratelimit-unified-slow-offer: treatment`. Prima del primo `429` della finestra non viene inviato nulla; un `429` improvviso senza header unified segue il normale percorso di cooldown.

**Corsia a priorità inferiore** (`lowPriorityMode`):

- Al `429` della finestra, l'executor accetta l'offerta e riprova immediatamente sullo **stesso** account con `anthropic-usage-limit: slow`; la corsia rimane attiva fino a `anthropic-ratelimit-unified-reset` annunciato (+ 60 s di tolleranza) e ogni richiesta in quella finestra contiene l'header. Il `429` intercettato non raggiunge mai `handleChatCore`, quindi la connessione **non** viene messa in cooldown e non viene ruotata.
- `anthropic-ratelimit-unified-slow-status` nelle risposte successive: `active` / `not_needed` mantengono attiva la corsia; `slot_busy` (429) o un `529` attendono il valore di `anthropic-ratelimit-unified-slow-retry-after` del server (20 s per impostazione predefinita, limite 5–600 s, jitter ±30%) e riprovano, entro il limite di `anthropic-ratelimit-unified-slow-max-wait` (20 min per impostazione predefinita, limite 1 min–6 h) — oltre tale limite la corsia termina e un periodo di raffreddamento di 10 minuti impedisce una nuova accettazione. L'attesa è inoltre limitata dal tempo residuo del timeout upstream-start della richiesta (`resolveFetchStartTimeout`, 10 min per impostazione predefinita) meno un margine di 5 s: senza questo limite, il valore predefinito di 20 minuti di max-wait supererebbe la durata della richiesta e l'attesa verrebbe interrotta a metà, mostrando un `TimeoutError` invece della conclusione controllata `max_wait` + cooldown.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, il passaggio a una nuova finestra di 5 ore oppure `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (che la termina come `extra_usage` con qualsiasi stato, poiché l'overage a pagamento copre ora la finestra) terminano la corsia; la risposta prosegue quindi verso il normale percorso di cooldown. `budget_exhausted` viene memorizzato fino alla reimpostazione del budget annunciata (≤ 8 giorni).
- Il controllo della finestra viene eseguito dopo i nuovi tentativi intra-attempt dell'executor dovuti a 400 (modifica del contesto, limiti di thinking/effort, apprendimento automatico dei parametri), quindi un `429` della finestra che emerge solo durante uno di questi tentativi viene comunque intercettato invece di raggiungere il percorso di cooldown.
- Lo stato è mantenuto in memoria per connessione (un riavvio richiede un ulteriore `429` della finestra per una nuova accettazione).

**Reimpostazione del limite di sessione** (`autoLimitReset`, tentata prima della corsia quando entrambe sono attive):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocco `juniper_tide`; quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con
  `{ "program": "juniper_tide" }` (UUID dell'organizzazione da `providerSpecificData.organizationUUID`, con fallback al bootstrap).
- `result: reset|not_limited` → la richiesta viene ripetuta alla massima velocità (senza header slow).
  `already_used` / `not_offered` memorizzano `next_available_at` (una settimana per impostazione predefinita); qualsiasi errore applica un backoff di 15 minuti. La reimpostazione può essere eseguita una volta alla settimana e viene comunque conteggiata nel limite settimanale.

Protezione dalle regressioni: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità di sessione (#7274)

**Ambito:** una sessione client (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) associata a una sola connessione, per **qualsiasi** provider.

**Scopo:** mantenere un agente multi-turno (Claude Code, aider, agenti personalizzati) sullo stesso account tra le richieste, riducendo la perdita di contesto tra account e i ripetuti `429` di avvio a freddo sui provider con stato di sessione per account.

**Implementazione:**

- Risoluzione del TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selezione/creazione dell'associazione: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazione dell'header (generica, per qualsiasi provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella delle associazioni persistenti: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Impostazione: `sessionAffinityTtlMs` (TTL globale in ms, `0` disabilita) — `src/lib/db/settings.ts`. Rinominata da `codexSessionAffinityTtlMs`, specifica per Codex, tramite la migrazione `124_generic_session_affinity_ttl.sql`, che trasferisce qualsiasi TTL Codex precedentemente configurato come nuovo valore predefinito.

Prima di #7274, `resolveSessionAffinityTtlMs()` terminava immediatamente restituendo `0` per ogni provider diverso da `codex`, quindi l'impostazione del TTL (e gli header di sessione) non aveva effetto altrove, anche se il meccanismo di associazione e l'estrazione degli header erano già indipendenti dal provider. La correzione ha rimosso quel ritorno anticipato; il TTL ora si applica uniformemente a ogni provider quando viene impostato globalmente su un valore superiore a `0`.

I tre header di affinità di sessione non vengono mai inoltrati upstream — gli executor costruiscono da zero i propri header upstream anziché inoltrare gli header del client, quindi questo rimane esclusivamente un ID di correlazione interno.

### Lease esclusivi di connessioni per sessioni gestite

**Ambito:** un client/session HTTP gestito attivo possiede una connessione OmniRoute idonea.

**Scopo:** fornire la proprietà esclusiva e duratura di una connessione per i client che necessitano di
un vincolo di instradamento rigido tra le richieste. Questo differisce dall'affinità di sessione, che è una preferenza
di continuità non vincolante:
un lease esclusivo mantiene lo stato del ciclo di vita in SQLite, impone l'unicità globale del proprietario attivo e
della connessione attiva e rifiuta una generazione obsoleta prima dell'invio al provider.

La funzionalità è facoltativa per ogni chiave API. Una chiave gestita deve avere l'ambito `lease:exclusive` e un
elenco `allowedConnections` esplicito e non vuoto. Qualsiasi client HTTP può utilizzare l'endpoint del ciclo di vita; non
sono richiesti nome del client, user-agent, provider, metodo OAuth o modello. Il lease possiede una connessione,
non un modello, quindi la modifica del modello mantiene il binding mentre la connessione resta normalmente idonea. Le
normali regole relative a modello, quota, stato di salute, cooldown e allowlist restano autorevoli e possono
trasferire la stessa generazione a un'altra connessione idonea libera.

Il ciclo di vita è `POST /api/v1/session-leases` con le azioni JSON `acquire`, `renew` e `release`.
Le richieste di inferenza gestite presentano il valore opaco `X-OmniRoute-Lease-Owner` e
l'esatto `X-OmniRoute-Lease-Generation`. Il proprietario usa `vlo_` seguito da 43 caratteri base64url; viene
memorizzato solo il relativo hash SHA-256. Ogni vincolo di invio finale associa inoltre l'ID della chiave API
autenticata e l'ID della connessione attiva. Gli header di controllo del lease vengono rimossi dai log, dalle istantanee
delle richieste conservate e dagli header dell'esecutore upstream.

Se il routing ordinario dispone di candidati gestiti idonei ma ogni candidato libero è occupato da un lease attivo
appartenente a terzi, OmniRoute restituisce HTTP `429`, il codice di indisponibilità della capacità del lease, uno
stato di attesa della capacità e un `Retry-After` limitato derivato dalla scadenza rilevante più vicina.
L'assenza ordinaria di candidati idonei non costituisce contesa per il lease e mantiene la semantica esistente degli
errori di routing.

I meccanismi correlati restano separati:

- L'occupazione delle sessioni OAuth è una distribuzione flessibile locale al processo per gli account OAuth.
- I semafori degli account concedono permessi di concorrenza delle richieste e terminano al completamento di una richiesta.
- I lease esclusivi delle sessioni gestite costituiscono una proprietà duratura del ciclo di vita con un vincolo di generazione.

## 3. Blocco del modello

**Ambito:** tripla provider + connessione + modello.

**Ambito della chiave in base allo stato:** lo stato che causa l'errore determina quale chiave scrive un blocco
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un segnale di quota o autorizzazione — bloccano la **famiglia di quota**:
  per codex l'intero ambito `codex` / `spark` (ogni modello `gpt-5*` della
  connessione), per gli altri provider `getQuotaScopedModelForProvider()`.
- `404` blocca il modello senza modifiche (`getModelLockKey()` restringe `not_found`).
- Qualsiasi altro stato — errori di trasporto/server `5xx` e il `502` sintetizzato da OmniRoute
  per la convalida della qualità — blocca solo la tupla **esatta**
  provider/connessione/modello. Uno stream non valido su un modello non fornisce informazioni sulla quota dell'account;
  prima di questa regola, una risposta vuota su `codex/gpt-5.6-luna` rimuoveva ogni modello `gpt-5*`
  di quella connessione dal routing per 2–30 min (con escalation), mentre la quota rimaneva invariata.
- L'opzione `scope` esplicita del chiamante ha sempre la precedenza (Antigravity passa `"exact"`).

**Scopo:** evitare di disabilitare un'intera connessione quando non è disponibile o è soggetto a limitazioni di quota un solo modello.

**Esempi:**

- Provider con quota per modello che restituiscono 429
- Provider locali che restituiscono 404 per un modello mancante
- Errori di autorizzazione specifici del provider per modalità/modelli (ad es. modalità Grok)

**Implementazione:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard dei cooldown dei modelli (v3.8.0)

UI: Impostazioni → Cooldown dei modelli (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Elenca i blocchi attivi con: provider, connessione, modello, motivo, expiresAt. Gli operatori possono riabilitare manualmente un modello dalla scheda.

**API REST:**

- `GET /api/resilience/model-cooldowns` — elenca i blocchi attivi
- `DELETE /api/resilience/model-cooldowns` — riabilitazione manuale. Body: `{provider, connection, model}`. Auth: management.

### Gestore dei cooldown

UI: Monitoraggio → Gestore dei cooldown (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Una pagina per ogni connessione esclusa dal routing per un motivo transitorio, invece di
aprire la pagina di ogni provider. Elenca i cooldown delle connessioni, i blocchi dei modelli e gli
stati terminali, li cancella per connessione, per una selezione o per tutte le connessioni di un provider,
e modifica le regole dei cooldown più utilizzate: `streamStallCooldown.enabled` e il cooldown di base
`connectionCooldown` e il numero massimo di passaggi di backoff per le connessioni OAuth / con chiave API (salvati tramite
`PATCH /api/resilience`). Gli stati terminali (`banned`, `expired`, `credits_exhausted`) sono
elencati, ma non vengono mai cancellati qui.

La scheda **Regole dei cooldown degli errori** nella stessa pagina modifica le regole degli errori dell'operatore
(`settings.providerErrorRules`) e i valori predefiniti catch-all per provider
(`settings.providerErrorDefaults`) tramite `PATCH /api/settings` — vedere "Regole dichiarate
dall'operatore" nella §7 per informazioni sulla loro corrispondenza. Le durate sono Predefinita (nessun cooldown esplicito), 30 min,
1 h, 5 h, 24 h oppure un valore personalizzato da 1 a 43.200 minuti (30 giorni).

**API REST** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connessioni con stato, cooldown rimanente,
  livello di backoff, ultimo tipo di errore e blocchi dei modelli (nessuna credenziale)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` oppure
  `{all: true, provider?}`; restituisce `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI delle impostazioni dei blocchi + recupero tramite decadimento dei successi (v3.8.23)

Il blocco del modello è passato da un comportamento sempre attivo e codificato staticamente a una funzionalità
completamente configurabile e attivabile, con una propria scheda delle impostazioni e un percorso di recupero automatico.

**Scheda delle impostazioni:** Impostazioni → Blocco del modello
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Questa è **distinta** dalla `ModelCooldownsCard` di sola lettura sopra (che
_si limita a elencare_ i blocchi attivi) — la nuova scheda _configura i parametri_. I valori predefiniti
risiedono in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Impostazione            | Predefinito                      | Significato                                                                                     |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruttore principale — il blocco del modello è **disattivato per impostazione predefinita**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stati upstream considerati errori con ambito del modello.                                       |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata iniziale del blocco al primo errore.                                                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite del cooldown con escalation.                                                             |
| `maxBackoffSteps`       | `10`                             | Numero massimo di passaggi di escalation del backoff esponenziale.                              |
| `useExponentialBackoff` | `true`                           | Indica se errori ripetuti aumentano il cooldown in modo esponenziale.                           |

Le impostazioni vengono mantenute tramite il normale archivio delle impostazioni e convalidate tramite lo
schema delle impostazioni di resilienza; la scheda limita `baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Recupero tramite decadimento dei successi:** il recupero **non** consiste esclusivamente nella scadenza del timer. Una
risposta corretta riduce progressivamente il conteggio degli errori del modello, così un modello che si è ripreso
durante la finestra smette di aumentare l'escalation (e viene sbloccato) prima della scadenza del timer. Su una destinazione combo corretta,
`open-sse/services/combo.ts` chiama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), che **dimezza** il valore memorizzato di
`failureCount` (`Math.floor(failureCount / 2)`); quando raggiunge `0`, la voce del blocco viene eliminata interamente. Il corrispondente
`recordModelLockoutFailure()` incrementa il conteggio (e aumenta il cooldown) in caso di errori entro la finestra di escalation. Questo decadimento
dovuto al successo si aggiunge alla semplice scadenza del timer: uno dei due percorsi può riabilitare un modello.

**Stato:** i blocchi sono mantenuti **in memoria** (`Map` per processo) di
`ModelLockoutEntry`, indicizzati per `provider:connectionId:model`; i blocchi con ambito
esatto usano `provider:connectionId:exact:model`, e non vengono persistiti nel
DB — vengono persi al riavvio. Le _impostazioni_ vengono persistite; lo
_stato_ attivo dei blocchi è effimero.

---

## 4. Controllo della concorrenza con condivisione della quota (v3.8.36)

Gli account in abbonamento (GLM, MiniMax, ecc.) spesso accettano solo ~1–3
richieste simultanee; superare questo limite attiva 429 e periodi di cooldown.
Il problema è particolarmente evidente con le combinazioni **quota-share**
(`qtSd/…`), in cui diverse chiavi API condividono lo stesso account upstream.
Tre livelli impediscono di sovraccaricare un account condiviso.

### Limite di concorrenza per connessione (`max_concurrent`)

Ogni connessione del provider può dichiarare un limite massimo
`max_concurrent` (`provider_connections.max_concurrent`, impostato nella finestra
di dialogo della connessione / API / DB). Lasciarlo vuoto per non applicare
alcun limite. Questo è l'unico parametro che controlla il livello di
serializzazione descritto di seguito: impostarlo in base alla concorrenza reale
dell'account (ad es. GLM ~1, MiniMax ~2).

### Limiti di concorrenza per modello (`modelConcurrency`)

Una connessione può inoltre dichiarare limiti esatti di concorrenza per modello
all'interno della relativa mappa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Impostarlo nella finestra di dialogo della connessione (**Rate limit overrides →
Limiti di concorrenza per modello**, un `model=cap` per riga) oppure tramite
`PATCH /api/providers/[id]` con la stessa struttura JSON. Semantica delle chiavi:

- **A livello di connessione vs specifico per modello:** `maxConcurrent` rimane il
  limite condiviso a livello dell'intera connessione. Quando si applicano
  entrambi, entrambi i gate vengono acquisiti atomicamente nello stesso gate
  composito (`global → provider → account → model`); il comportamento effettivo
  segue il limite applicabile più restrittivo.
- **Corrispondenza esatta della chiave del modello:** la chiave è la stringa del
  modello passata all'executor dopo la risoluzione del routing, normalmente
  l'ID del modello upstream senza prefisso (`glm-5`), non un alias
  `provider/model` lato client (`zai/glm-5` non corrisponde a `glm-5`). I valori
  sono limiti positivi interi per le richieste simultanee.
- **Accodamento locale, senza rilevamento:** le richieste in eccesso vengono
  accodate localmente con le semantiche di coda/timeout esistenti (errori di
  ammissione tipizzati `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute
  non rileva né deduce le policy upstream: applica i limiti esatti configurati
  dall'operatore. Un gate del modello saturo non disabilita mai il provider e
  non crea mai un blocco permanente del modello; il comportamento upstream per
  429/cooldown/fallback rimane il meccanismo di gestione degli errori.
- **Ambito per connessione e per processo:** i limiti si applicano per
  connessione al database e vengono mantenuti in memoria, quindi due connessioni
  che riutilizzano la stessa chiave API upstream non si coordinano tra loro.
- **Non configurato significa invariato:** omettere la mappa (oppure lasciare
  vuoto il campo nel dashboard) non aggiunge alcun gate per modello. Esempio di
  configurazione senza dichiarare alcun limite universale del provider:

```text
glm-5=1
glm-4.7=3
```

### Serializzazione delle richieste quota-share

Quando un dispatch quota-share ha come destinazione una connessione che dichiara
un `max_concurrent` positivo, le richieste simultanee verso quell'**account**
vengono serializzate tramite un semaforo per connessione (chiave
`qsconn:<connectionId>`): le richieste in eccesso **attendono nella coda** invece
di sovraccaricare l'account. È **fail-open**: una coda satura o un timeout
prosegue senza uno slot, invece di rifiutare una richiesta che può essere
inviata. Attivare/disattivare in **Impostazioni → Resilienza → Concorrenza
quota-share per connessione**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, attivo per
impostazione predefinita). Senza un limite `max_concurrent`, il comportamento
rimane invariato.

> Il gate di routing quota-share (`selectQuotaShareTarget`, DRR + P2C) è a sua
> volta fail-open e si limita a _deprioritizzare_ una connessione che ha
> raggiunto il limite; con un pool composto da una sola connessione non può
> imporre un limite rigido, quindi è questo semaforo a contenere effettivamente
> il sovraccarico.

### Retry consapevole del cooldown delle combinazioni

Per ogni strategia di combinazione (quando abilitata), una richiesta che
causerebbe un 429 per un breve cooldown transitorio attende che il cooldown
termini e viene nuovamente inviata, invece di restituire il 429. Questo copre le
finestre TPM/RPM della classe Gemini (~60 s di retry-after) nelle combinazioni
multi-modello, ad esempio quando entrambe le destinazioni di una combinazione a
2 modelli raggiungono un limite di frequenza per modello. Il comportamento è
limitato da `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) in **Impostazioni → Resilienza**. Non attende mai per
`quota_exhausted` (bloccato fino a mezzanotte) né per motivi di autenticazione o
di risorsa non trovata.

Una combinazione può disattivare questa funzione con
`config.comboCooldownWaitEnabled: false`. Solo `false` letterale disabilita
queste attese condivise delle combinazioni (cooldown post-dispatch e attese
pre-dispatch per circuito aperto/blocco del modello) e l'estensione del limite
inferiore del timeout in base al budget di attesa. L'assenza del valore o
`true` mantiene la policy globale; `true` non può abilitare globalmente un'attesa
disabilitata. Un `targetTimeoutMs` esplicito ha comunque la precedenza. Questa
opzione non modifica l'attesa pre-dispatch separata del pin del turno
native-Codex.

Lo stesso gate copre il caso pre-dispatch (#16319): quando ogni destinazione di
una combinazione viene saltata prima di qualsiasi tentativo perché il relativo
modello si trova in un breve blocco transitorio, il percorso con zero tentativi
attende la fine del blocco secondo gli stessi limiti e invia nuovamente la
richiesta, invece di restituire un `503 ALL_TARGETS_SKIPPED` privo di suggerimenti.
Quando non è consentito attendere (limite massimo, numero di tentativi o budget
esaurito, oppure funzione disattivata), la risposta terminale viene convertita
in `429 rate_limit_error` e contiene `retry_after` / `reset_at` relativi alla
scadenza del blocco transitorio più vicina; i blocchi per quota, autenticazione e
risorsa non trovata mantengono il 503 privo di suggerimenti.

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

## 7. Riformulazione dello stato upstream (errori di quota riportati erroneamente)

**Ambito:** un gateway upstream che segnala un esaurimento temporaneo della quota con lo stato HTTP errato.

**Scopo:** correggere uno stato fuorviante PRIMA della classificazione, in modo che i consumer downstream (motore di fallback, aggregazione combo, risposta destinata al client) rilevino la reale natura ritentabile del fallimento.

Alcuni gateway segnalano l'esaurimento TEMPORANEO della quota con uno
stato HTTP non ritentabile. `agentrouter.org` restituisce `403` (a volte `400`)
con un corpo cinese (`用户额度不足` / `额度不足`) invece del normale `429`. I client come Claude
Code considerano `403` permanente e interrompono la sessione; senza correzione,
il motore di fallback lo classificherebbe come `AUTH_ERROR` invece che come
evento di quota.

**Implementazione:**

- Registro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — un
  elenco di regole per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), confrontate tramite `applyStatusRestatement()`.
- Punto di chiamata: il blocco `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (intorno alla riga 3654), subito dopo che `parseUpstreamError()` analizza una
  risposta upstream con uno stato HTTP di errore (`!providerResponse.ok`) e prima
  dell'esecuzione di qualsiasi classificazione, così ogni consumer downstream
  vede lo stato corretto. Gli errori incorporati in uno stream SSE `200` seguono
  un percorso separato e successivo di analisi dello stream e oggi **non** sono
  coperti da questo hook — una limitazione nota, non ancora necessaria per il
  misstatus di agentrouter (che si manifesta come stato HTTP di errore).
- Idoneità al retry: `429` è incluso in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), quindi un errore
  riformulato include una vera finestra di retry invece di manifestarsi come un
  `403` non recuperabile.
- Il `defaultRetryAfterMs` sintetico di `60s` (`upstreamStatusRestatement.ts`)
  indica esclusivamente ciò che la risposta riformulata comunica al **client**;
  non rappresenta la durata interna di cooldown/blocco della connessione —
  questa è regolata separatamente dal meccanismo che gestisce effettivamente
  l'errore riformulato (il backoff crescente di Connection Cooldown, §2, con
  valore base di `3s` per i provider con chiave API; oppure Model Lockout, §3,
  per i provider con quota per modello come agentrouter). Il router può diventare
  nuovamente idoneo al retry internamente prima della scadenza della finestra di
  60s annunciata al client — è un margine intenzionale, non un bug.

Gli errori permanenti (`无权访问模型` — nessun accesso a questo modello) di
agentrouter **NON** vengono MAI riformulati: `excludeMarkers` annulla la regola
anche quando `textMarkers` corrisponde, quindi l'errore conserva il proprio stato
originale e nulla lo ritenta all'infinito. La regola di classificazione del
provider corrispondente (`agentrouter-model-access-denied` in
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`,
`scope: "model"`, un cooldown di base dichiarato di `6h`) viene consultata da
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prima_ del ritorno anticipato generico `FORBIDDEN` della categoria apikey,
subordinatamente a `honorsRuleLockScope(provider)` (#10334 — attualmente
esclusivo di agentrouter tramite l'allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` in `providerErrorRules.ts`). Il cooldown
dichiarato di 6h della regola passa attraverso `fallbackResult.baseCooldownMs`,
ma alimenta comunque il percorso di blocco per modello esistente
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, invariato rispetto a #10334 salvo per la fonte
del cooldown): viene ridotto al valore di `mlSettings.maxCooldownMs`
dell'operatore (predefinito `1_800_000ms` / 30min), come ogni altro blocco per
modello, e il _motivo del blocco persistito_ rimane il valore hardcoded
`"forbidden"` preesistente, non il `"auth_error"` della regola — solo la
durata del cooldown viene rispettata end-to-end, non la stringa del motivo. La
connessione rimane attiva; i modelli associati sulla stessa connessione non
vengono influenzati.

Gli errori di quota riformulati (`额度不足`) raggiungono in produzione una regola
del provider (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, senza un cooldown dichiarato proprio — viene applicato il
backoff scalato predefinito del livello di persistenza). A partire da #10334,
`scope` in `ProviderErrorRuleMatch` viene consumato end-to-end, ma **solo** per
i provider inclusi nell'allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — oggi solo `"agentrouter"`, tramite
`honorsRuleLockScope()`). Per ogni altro provider `scope` rimane informativo,
esattamente come prima di #10334.
`checkFallbackError` espone l'ambito della regola corrispondente come
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) è il controllo condiviso che conferma che un
`ruleScope` sia effettivamente sicuro da applicare come segnale a livello di
connessione, con autoripristino (scope `"connection"`, motivo
`quota_exhausted`, mai `permanent`, mai `creditsExhausted` — una protezione
contro un futuro abbinamento tra scope `"connection"` e uno stato permanente
dell'account). Lo chiamano due consumer:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  invece di entrare nel ramo di blocco **per modello** del provider passthrough
  (agentrouter ha `passthroughModels: true` → `hasPerModelQuota()`
  restituisce `true`), applica un **cooldown temporaneo della connessione** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, mai uno stato terminale
  (`credits_exhausted`/`banned`/`expired`) — così la connessione si ripristina
  automaticamente una volta scaduto il cooldown, senza richiedere un reset
  manuale delle credenziali.
  Saltato per le connessioni con `disableCooling: true` (#2997): questa
  esclusione fa invece ricadere nel blocco per modello (un compromesso
  documentato — vedere il commento nel codice sopra il ramo).
- **Routing combinato nella stessa richiesta** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): lo stesso controllo inserisce
  la connessione nel set in memoria `exhaustedConnections`, indicizzato da
  `${provider}:${connectionId}`. Questo salta soltanto un target rimanente
  della STESSA RICHIESTA che _contiene già autonomamente quell'esatto
  `connectionId`_ nel proprio oggetto target
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prima della ricerca in `exhaustedConnections`) — una combinazione
  composta da un semplice elenco di modelli, in cui i target omologhi non
  contengono un `connectionId` associato proprio e una connessione viene risolta
  soltanto per dispatch dall'header `X-OmniRoute-Selected-Connection-Id` della
  risposta, non raggiunge mai questa corrispondenza della chiave. In questo caso
  comune, la protezione effettiva contro il riutilizzo dell'account appena
  esaurito da parte di un ramo rimanente NON è questo Set — è il livello di
  persistenza sopra descritto (il `rateLimitedUntil` della connessione è ora nel
  futuro), combinato con lo stesso controllo che sopprime
  `transientRateLimitedProviders` per l'errore (vedere "Progettazione a due
  stadi" e il commento nel codice sul ramo
  `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): lasciando il Set
  non contrassegnato, il force-allow `allowRateLimitedConnection` di
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NON si
  attiva per i rami rimanenti del provider, quindi il filtro
  `rateLimitedUntil` della selezione delle credenziali
  (`src/sse/services/auth.ts:1238`) viene rispettato normalmente e un ramo
  rimanente seleziona un'altra connessione agentrouter ancora idonea oppure
  fallisce senza credenziali disponibili — non forza il ritorno sulla
  connessione che questo ramo ha appena messo in cooldown.

### Progettazione a due stadi: riformulazione dello stato, poi classificazione

La riformulazione dello stato (`upstreamStatusRestatement.ts`) e le regole di
classificazione del provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sono registri distinti che usano entrambi l'id del
provider e i marcatori testuali come chiavi, ma vengono eseguiti in punti
diversi e hanno scopi diversi: la riformulazione riscrive anticipatamente lo
stato HTTP in `chatCore.ts`; le regole di classificazione scelgono il
`reason` di fallback e bloccano l'ambito `scope`
(`model` / `provider` / `connection`) all'interno di `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Le regole di classificazione vedono il **testo** completo dell'errore
(necessario per trovare marcatori nel body come `额度不足`) solo per i provider
elencati nell'elenco consentito `FULL_TEXT_RULE_PROVIDERS` in
`providerErrorRules.ts` — attualmente soltanto `"agentrouter"`. Per ogni altro
provider del **catalogo integrato**, `checkFallbackError` passa a
`getProviderErrorRuleMatch` soltanto l'errore strutturato (`{code, type}`),
sufficiente per le regole basate su header/stato/codice, ma incapace di rilevare
i marcatori nel testo del body. L'helper `resolveRuleMatchBody()` esegue questa
selezione: il testo completo dell'errore per i provider autorizzati, altrimenti
l'errore strutturato. L'aggiunta di un provider **integrato** a
`FULL_TEXT_RULE_PROVIDERS` è un'abilitazione esplicita per provider — esiste
affinché il percorso predefinito di ogni provider non presente nell'elenco
rimanga invariato byte per byte.

Lo `scope` di una regola (`model` / `provider` / `connection`) è un'abilitazione
separata da `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` lo espone soltanto
come `fallbackResult.ruleScope`, e i consumer a valle lo considerano qualcosa
di diverso da un'etichetta informativa soltanto per i provider presenti
nell'elenco consentito `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nello stesso file
(controllato tramite `honorsRuleLockScope()` — oggi soltanto
`"agentrouter"`). Vedere sopra "Errori di quota riformulati" per sapere cosa
comporta effettivamente una corrispondenza con `scope: "connection"` una volta
che un provider è presente in tale elenco.

**#11104 — le regole dichiarate dall'operatore ignorano entrambi gli elenchi consentiti.** Un operatore può dichiarare una regola per provider in fase di
esecuzione tramite `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) senza
modificare questo file. Applicare a una regola dell'operatore i vincoli di
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — elenchi
consentiti pensati per proteggere il comportamento **predefinito** delle regole
del catalogo integrato — renderebbe inerte il meccanismo delle impostazioni per
ogni provider tranne quelli già elencati, poiché dichiarare la regola è già
l'abilitazione esplicita dell'operatore. Sia `resolveRuleMatchBody()` sia
`honorsRuleLockScope()` controllano prima `hasOperatorRuleForProvider()`:
un provider con una regola dell'operatore riceve il testo grezzo dell'errore e
il suo `scope` dichiarato viene rispettato, indipendentemente dalla sua
presenza in uno dei due elenchi consentiti.

**Regole dichiarate dall'operatore** (`OperatorProviderErrorRule`): ogni regola
ha uno `status` facoltativo e un `match` facoltativo (una semplice sottostringa
senza distinzione tra maiuscole e minuscole del testo dell'errore, mai una
RegExp, quindi non può causare ReDoS) e deve impostare almeno uno dei due.
Quando sono impostati entrambi, vengono combinati con AND; un campo omesso
corrisponde a qualsiasi valore, quindi `{match: "insufficient_quota"}` trova
corrispondenza con qualsiasi stato che contenga quel codice. Vince la prima
regola corrispondente. `cooldownMs` accetta un massimo di 30 giorni; sono
consentite al massimo 50 regole in totale.

**Predefiniti catch-all** (`settings.providerErrorDefaults`, opt-in, impostati tramite
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
con `cooldownMs` da 1 minuto a 30 giorni. Un valore predefinito si applica solo quando
non è stata trovata alcuna regola dell'operatore né alcuna regola del catalogo integrato,
e solo agli errori 402, 403, 408, 429 e 5xx. Gli errori relativi alla forma della
richiesta (400, 404, 409, 413, 422) e i semplici 401 mantengono la propria gestione.
Senza un `reason` esplicito, il motivo deriva dallo status, allo stesso modo di
`classifyError`. La dichiarazione di un valore predefinito conta come regola
dell'operatore per `hasOperatorRuleForProvider()`, quindi il suo `scope` (predefinito
`"connection"`) viene rispettato. Il cooldown effettivo di un valore predefinito è il
più lungo tra il suo `cooldownMs` e l'indicazione di retry del provider
(`Retry-After`, `x-ratelimit-reset` o un'indicazione di reset nel body, la stessa
indicazione che il motore rispetta quando è attiva l'impostazione del connection-cooldown
"use upstream retry hints"), quindi un valore predefinito può estendere una breve
indicazione upstream, ma non può mai abbreviare un reset effettivo. Una regola
dell'operatore esplicita mantiene il proprio `cooldownMs` esatto. Né una regola né un
valore predefinito aggirano le protezioni del connection-cooldown in
`markAccountUnavailable`: un cooldown attivo e più lungo non viene mai abbreviato e
uno status terminale non viene mai sovrascritto. I rilevatori di testo integrati eseguiti
prima in `checkFallbackError` (crediti esauriti, quota giornaliera, account disattivato)
continuano ad avere la precedenza per le rispettive frasi.

**Lacuna nota — `providerRuleRegistry` non viene mai consultato per HTTP 400.**
Il ramo `BAD_REQUEST` di `checkFallbackError` classifica lo status 400 interamente
tramite i propri array di pattern (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, ecc. in `accountFallback.ts`) e restituisce il risultato
prima che venga raggiunto il ramo `configuredRule`/`getProviderErrorRuleMatch` sopra
di esso. Una regola del catalogo integrato (o una regola dell'operatore) con
`status: 400` è sintatticamente valida, ma non verrà mai applicata. Attualmente nessuna
regola esistente ha come target 400, quindi nulla in produzione ne risente — tuttavia,
una futura regola per 400 richiede prima di intervenire su questo ramo, con una modifica
più ampia rispetto all'aggiunta di una regola (riclassificherebbe il 400 per ogni provider
che già dipende dal comportamento degli array di pattern), ed è fuori ambito per
l'aggiunta di una regola a un singolo provider.

### Aggiunta di un nuovo gateway che dichiara erroneamente la quota

1. Registra un array di regole in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantieni `textMarkers`
   specifici del provider; non riutilizzare mai frasi inglesi generiche che entrano in
   conflitto con `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Facoltativamente, registra regole di classificazione in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) per scegliere
   l'ambito di blocco corretto (`connection` per la quota a livello di account,
   `model` per gli errori relativi a un singolo modello). Questo passaggio ha effetto
   in produzione solo per i provider le cui regole richiedono il testo completo
   dell'errore (marcatori nel body): aggiungi l'id del provider a
   `FULL_TEXT_RULE_PROVIDERS` nello stesso file — altrimenti
   `checkFallbackError` passa alla regola solo l'errore strutturato
   `{code, type}` e una regola basata sul testo del body non troverà mai corrispondenze
   nel traffico reale. Le regole che fanno corrispondere esclusivamente
   `status`/`headers` (come quelle di Opencode o Minimax) non richiedono questo opt-in.
   Separatamente, se la regola dichiara `scope: "connection"` e l'intento è ottenere
   un vero cooldown a livello di connessione più il salto della combinazione nella
   stessa richiesta (non solo un'etichetta informativa), aggiungi l'id del provider a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nello stesso file — questo è ciò che abilita il
   consumo in stile `isAgentrouterConnectionQuotaScope()` in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); senza di esso, `scope`
   continua a passare attraverso `fallbackResult.ruleScope`, ma nulla lo utilizza.
3. Aggiungi test unitari che rispecchino
   `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (includendo le protezioni
   not-permanent / not-creditsExhausted e — se il provider richiede la allowlist —
   un test che verifichi che `resolveRuleMatchBody()` restituisca il testo completo
   solo per quel provider).

Non sono necessarie modifiche a `chatCore.ts`, `classifyError` o combo.

#### Blocco suddiviso per bucket di egress (#10880)

I provider in `EGRESS_BUCKETED_LOCK_PROVIDERS` (famiglia opencode) vengono trattati
come upstream suddivisi per IP (il livello gratuito di opencode è suddiviso per IP,
non per account — vedere #9611): uno status-429 classificato come
`quota_exhausted` **o** `rate_limit_exceeded` applica il cooldown a ogni connessione
della famiglia allowlistata il cui ultimo IP di egress noto corrisponde a quello della
connessione che ha generato l'errore, prima che la rotazione possa provarle
— evitando N-1 chiamate upstream destinate a fallire (stessa struttura di
#10460/#10525). `rate_limit_exceeded` è incluso deliberatamente: nel percorso
`markAccountUnavailable` le regole specifiche di opencode non trovano mai
corrispondenza (nessun header/body viene passato a `checkFallbackError`, opencode non
è incluso in `FULL_TEXT_RULE_PROVIDERS`), quindi un 429 il cui body contiene il testo
relativo alla quota dell'abbonamento ("monthly usage limit reached") viene classificato
come `quota_exhausted` dal fallback del testo della quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown di 1 ora) prima
che venga mai raggiunta la regola `status_429` — mentre un 429 privo del testo della
quota (semplice limitazione della frequenza) viene classificato tramite la regola
`status_429` come `rate_limit_exceeded` e applica comunque il cooldown alla famiglia
IP. Per un provider allowlistato, una limitazione della frequenza suddivisa per IP
costituisce lo stesso segnale di una quota esaurita. Limiti effettivi:

- **Miglior sforzo**: il blocco risolve l'ultimo `egress_ip` noto della connessione
  da `proxy_logs` (finestra di 24 ore, sincrono, senza cache). Cache fredda
  (l'IP di uscita non è mai stato sottoposto a probing) o nessuna riga → la
  connessione in errore viene comunque messa in cooldown dal ramo (registrata
  come oggi), solo che nessun elemento associato viene bloccato.
- **Mai terminale**: il cooldown è una finestra di quota rinnovabile
  (`testStatus: "unavailable"`); uno stato permanente non viene mai dedotto da
  un segnale a livello di IP. Le connessioni `disableCooling` saltano
  completamente il ramo.
- **La granularità del blocco cambia per la famiglia consentita**: si tratta di
  un cambiamento di ambito, non solo di un'ottimizzazione per gli elementi
  associati. opencode è un provider `passthroughModels`, quindi prima di questo
  ramo un 429 produceva un blocco per MODELLO; ora produce un cooldown della
  connessione — anche per un operatore che esegue una singola connessione senza
  alcun elemento associato. Questa è la granularità che la tabella delle regole
  di opencode dichiara già corretta (`scope: "connection"`,
  `providerErrorRules.ts`), mai applicata finora perché opencode non è incluso
  in `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il ramo scrive direttamente il cooldown
  e il `backoffLevel` della connessione in errore, replicando il ramo
  agentrouter con ambito a livello di connessione, quindi restituisce il
  controllo — il blocco per modello e il percorso generico sottostante non
  vengono mai raggiunti.
- **Combo inclusa**: come nel ramo agentrouter, l'ambito ignora deliberatamente
  il downgrade `persistUnavailableState`/`isCombo` applicato da un chiamante
  combo a un 429. Un blocco per modello non è una forma più debole di questo
  ambito, è l'unità sbagliata: non dice nulla sull'IP esaurito, quindi la
  rotazione combo continuerebbe a consumare una chiamata sicuramente destinata
  a fallire per ogni elemento associato.
- **Sicurezza degli elementi associati**: un elemento associato già terminale
  (banned/credits_exhausted) o già in un cooldown più lungo non viene mai
  sovrascritto.
- **Allowlist esclusiva**: l'ampliamento di `EGRESS_BUCKETED_LOCK_PROVIDERS` è
  una decisione esplicita del responsabile; nessun collegamento generico
  (pattern #10334/#10419). La query degli elementi associati usa la stessa
  allowlist invece di ripeterla come literal SQL, quindi ampliarla rimane una
  modifica di una sola riga.
- **Rotazione dell'IP di uscita, in entrambe le direzioni**: la finestra di
  ricerca (24 ore) è molto più ampia del TTL della cache dell'IP di uscita (5
  minuti), quindi l'"ultimo IP noto" rappresenta la cronologia, non lo stato
  corrente. Se il proxy di una connessione è ruotato all'interno della finestra,
  il blocco potrebbe **non rilevare** un IP realmente condiviso (l'IP registrato
  è quello nuovo, non esaurito) — e, simmetricamente, potrebbe **mettere in
  cooldown un elemento associato che nel frattempo ha ruotato allontanandosi**
  dall'IP esaurito. Il secondo caso costa a quell'elemento associato una
  finestra di cooldown; entrambi sono limiti best-effort accettati di una
  ricerca basata sulla cronologia.
- **Costo**: due scansioni limitate di `proxy_logs` (filtrate per finestra
  tramite `idx_pl_timestamp`), solo alla frequenza dei 429. Nessun nuovo indice
  (migrazione 134 YAGNI). Misurato su una copia di un database con traffico
  reale e dimensioni moderate; un'istanza ad alto throughput contiene
  proporzionalmente più righe nella stessa finestra.

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
