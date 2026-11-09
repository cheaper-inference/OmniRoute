# Resilience Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute are trei mecanisme de reziliență distincte, dar legate. Fiecare are un scop și un scop diferit. Păstrați-le separate atunci când depanați comportamentul de rutare.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Sursa: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Prioritatea Env-vs-dashboard pentru comutările de reziliență.** Reziliența opt-in comută generată din mediu — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — furnizează doar _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Un boolean a persistat în `resilienceSettings` (Dashboard →** Setări → Reziliență** / `PATCH /api/resilience`, stocat în `key_value`) câștigă peste valoarea env: normalizarea (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) păstrează booleanul stocat ori de câte ori există unul. Setarea unui astfel de env var la `true` într-o implementare în care tabloul de bord deja salvat `false` prin urmare, nu schimbă nimic — răsturnați comutatorul** Setări → Reziliență** (sau ștergeți câmpul stocat).

## 1. Circuit Breaker la nivel de furnizor

**Domeniu de aplicare:** întregul furnizor (de ex., `glm`, `openai`, `anthropic`).

**Scop:** oprirea trimiterii de trafic către un furnizor care eșuează în mod repetat la nivel de upstream/serviciu.

**Implementare:**

- Clasa de bază: `src/shared/utils/circuitBreaker.ts`
- Cablare: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de stare: `GET /api/monitoring/health`
- API de resetare: `POST /api/resilience/reset`
- Wrapper-e: `open-sse/services/accountFallback.ts`
- Tabel în baza de date: `domain_circuit_breakers`

**Stări:**

- `CLOSED` — traficul normal este permis
- `DEGRADED` — traficul este încă permis, dar eșecurile ridicate ale furnizorului sunt urmărite; revine la `CLOSED` după suficiente succese, la un test de conexiune valid sau după cea mai lungă perioadă de menținere `OPEN` pentru ultimul tip de eșec (valoarea sa `cooldownByKind`, altfel `resetTimeout`, × `maxBackoffMultiplier`, cel puțin un cooldown) fără un nou eșec
- `OPEN` — furnizorul este blocat temporar; rutarea combo îl omite
- `HALF_OPEN` — timpul de resetare a expirat; este permisă o cerere de probă

**Valori implicite configurabile (`open-sse/config/constants.ts`, expuse în Dashboard → Settings → Resilience):**

| Clasă   | Trece în DEGRADED la | Se deschide la | Timp de resetare |
| ------- | -------------------- | -------------- | ---------------- |
| OAuth   | 5 eșecuri            | 8 eșecuri      | 60s              |
| API-key | 7 eșecuri            | 12 eșecuri     | 30s              |
| Local   | derivat              | 2 eșecuri      | 15s              |

`degradationThreshold` controlează când un furnizor intră în `DEGRADED`; `failureThreshold` controlează când se deschide și este omis. Profilele furnizorilor locali nu sunt încă expuse pe pagina de setări Resilience.

**Coduri de declanșare:** doar statusurile la nivel de furnizor `[408, 500, 502, 503, 504]`. NU se declanșează pentru erori la nivel de cont (majoritatea 401/403/429 — acestea țin de cooldown sau de lockout).

**Recuperare leneșă (lazy):** când `OPEN` expiră, `getStatus()`, `canExecute()`, `getRetryAfterMs()` reîmprospătează starea la `HALF_OPEN`. Aceleași citiri (și următorul eșec) aduc un `DEGRADED` învechit înapoi la `CLOSED`. Nu este necesar un timer în fundal.

---

### Cooldown global opt-in la nivel de furnizor (window gate)

Un al patrulea strat, **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, implicit **dezactivat**), păstrează o memorie între cereri a furnizorilor care eșuează în
`open-sse/services/providerCooldownTracker.ts`, consultată de rezoluția țintelor combo, astfel încât cererile combo consecutive să nu mai parcurgă din nou un furnizor care tocmai a eșuat. Intrările la nivel de furnizor respectă filtrul de fereastră (window gate) din `PROVIDER_PROFILES`:

| Profil  | se declanșează după (`providerFailureThreshold`) | în intervalul (`providerFailureWindowMs`) | răcește timp de (`providerCooldownMs`) |
| ------- | -----------------------------------------------: | ----------------------------------------: | -------------------------------------: |
| OAuth   |                                             `10` |                                   `15min` |                                 `5min` |
| API key |                                             `15` |                                   `30min` |                                `10min` |

Sub prag, furnizorul **nu** este considerat a fi în răcire; un succes golește fereastra. Intrările la nivel de conexiune (`provider:connectionId`) păstrează în schimb backoff-ul exponențial `minRetryCooldownMs → maxRetryCooldownMs`. Suprascrieri:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test de regresie: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Răcirea conexiunii

**Domeniu:** conexiune/cont/cheie al unui singur furnizor.

**Scop:** omiterea unei chei problematice, în timp ce celelalte conexiuni pentru același furnizor continuă să deservească cererile.

**Implementare:**

- Marcarea ca indisponibilă: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectarea: `getProviderCredentials*` în același fișier
- Calcularea perioadei de răcire: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Setări: `src/lib/resilience/settings.ts`

**Câmpuri pentru fiecare conexiune:**

- `rateLimitedUntil` — marcaj temporal până la expirarea perioadei de răcire
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contor pentru replierea exponențială

**Perioade de răcire implicite:**

- Bază OAuth: 5s
- Bază pentru cheia API: 3s
- API-key 429: preferă antetele upstream `Retry-After`/reset/textul de reset analizabil
- Repliere: `baseCooldownMs * 2 ** failureIndex`

**Întârziere la reîncercare per furnizor.** Pagina cu detaliile furnizorului are un selector **Întârziere la reîncercare** (Automat,
15s până la 1h). Acesta salvează `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, prin `PATCH /api/resilience`). Atunci când o eroare de limitare a ratei nu conține niciun indiciu upstream privind reîncercarea,
valoarea respectivă înlocuiește replierea scalată pentru furnizor și resetează `backoffLevel` la 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Ordinea de prioritate pentru o eroare de limitare a ratei, de la cea mai mare la cea mai mică, este: indiciul upstream privind reîncercarea, apoi `providerSpecificData.rotationOverrides.rateLimitResetSeconds` per conexiune,
apoi întârzierea la reîncercare per furnizor, apoi `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` din mediu, apoi
replierea scalată. Automat elimină câmpul. Aceasta afectează doar motivul limitării ratei, niciodată stările terminale.

**Protecție împotriva efectului de turmă:** împiedică eșecurile concurente să extindă excesiv perioada de răcire sau să incrementeze de două ori `backoffLevel`.

**Erorile 429 cauzate de limita de concurență nu urcă pe scara replierii.** Un `429` al cărui corp raportează o
limită de concurență („prea multe solicitări concurente”, „limită de concurență”, „limită de
solicitări paralele”, GLM `并发数过高`) înseamnă că acel cont este sănătos, dar ocupat.
`checkFallbackError()` returnează motivul `concurrency_limited`: comută imediat la următoarea
conexiune, răcește această conexiune pentru o perioadă fixă `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) sau conform indiciului upstream privind reîncercarea, păstrează `backoffLevel` neschimbat și setează `skipProviderBreaker`.
Un corp explicit privind cota are în continuare prioritate, astfel încât un corp care corespunde și unui tipar de cotă rămâne un verdict de cotă. Detectarea: `looksLikeConcurrencyLimit()` în `src/shared/utils/classify429.ts`;
verdictul: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (câmpul `FailureKind` al întrerupătorului) rămâne neschimbat și citește în continuare `rate_limit` pentru aceste corpuri.

**Blocajele conținutului fluxului nu răcesc contul.** Atunci când mecanismul de supraveghere a blocajului conținutului
(`open-sse/utils/streamHandler.ts`) renunță la un flux care nu a trimis la timp niciun rezultat al modelului,
`markAccountUnavailable()` înregistrează eroarea pe conexiune, dar nu setează nicio perioadă de răcire: blocajul aparține acelei solicitări, cel mai adesea unei etape lungi de raționament fără rezultat încă. Operatorii pot opta pentru activarea acestei funcții prin `resilienceSettings.streamStallCooldown.enabled`
(implicit `false`).

**Semnal de latență opțional pentru selectarea contului `p2c`.** Fiecare încercare distribuită înregistrează timpul până la primul octet și rezultatul pentru fiecare conexiune (și pentru fiecare combinație conexiune + model) într-o fereastră rulantă în memorie: ultimele 20 de eșantioane din ultimele 15 minute
(`open-sse/services/connectionLatencyTracker.ts`, înregistrate din
`safeLogEvents()` în `src/sse/handlers/chatHelpers.ts`). Atunci când `resilienceSettings.p2cLatency.weight` este mai mare decât
`0` (intervalul 0–20, valoarea implicită `0` = dezactivat), `compareP2CConnections()` din `src/sse/services/auth.ts` adaugă până la `weight` puncte fiecărui candidat al perechii. Jumătate provine din latență, ca raport față de candidatul mai rapid (o viteză de două ori mai mică primește întreaga jumătate), iar cealaltă jumătate provine din rata de erori rulantă.
Termenul se aplică numai atunci când ambii candidați au cel puțin 3 eșantioane, astfel încât conturile noi să nu fie penalizate, iar plafonul său rămâne sub penalizările pentru cota blocată și cota epuizată.
Nu adaugă propriul circuit: conturile care eșuează sunt gestionate în continuare de straturile de răcire, blocare și întrerupător. Setați-l cu `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Cadrele de raționament repornesc bugetul pentru blocajul conținutului.** Un model de raționament poate analiza timp de
câteva minute înainte de primul token vizibil: Claude transmite cadre `thinking_delta` al căror
text de raționament poate fi gol, iar Responses API transmite pe rând câte un element de raționament. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) recunoaște aceste cadre, iar mecanismul de supraveghere își repornește bugetul la fiecare dintre ele în loc să anuleze etapa. Acestea nu sunt totuși rezultate ale modelului, astfel încât o etapă care se încheie doar cu raționament este raportată în continuare ca goală, iar o etapă care încetează raționamentul și trimite doar semnale heartbeat declanșează în continuare mecanismul de supraveghere.

Cadrele binare `reasoningContentEvent` ale Kiro, cu o semnătură nevidă, păstrează această activitate de raționament prin executor sub forma unui delta `reasoning_content` gol. Semnătura nu este transmisă mai departe. Metadatele, cadrele incomplete și semnăturile goale nu repornesc bugetul pentru conținut; timpul de expirare independent al fluxului activ și anularea de către client se aplică în continuare (`open-sse/executors/kiro/reasoning.ts`).

**Stări terminale (NU perioade de răcire):**

- `banned` — setată de detectarea cuvintelor-cheie interzise / a interzicerii contului (consultați [BAN_DETECTION](../security/BAN_DETECTION.md)). Refuzurile upstream pentru fiecare solicitare (`request_rejected`, de exemplu OAuth Anthropic 403 „Request not allowed”) nu o setează niciodată: acestea sunt contorizate per conexiune și model și scot modelul respectiv din rotație cu o perioadă de răcire în creștere, plafonată la `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), sau răcesc conexiunea atunci când nu se cunoaște niciun model — `open-sse/services/requestRejectedStreak.ts`
- `expired` (trece la starea terminală după un număr limitat de reîncercări — `EXPIRED_RETRY_MAX = 3`, cu repliere exponențială — astfel încât erorile OAuth tranzitorii să se poată remedia automat înainte ca contul să fie dezactivat permanent)
- `credits_exhausted`

Acestea persistă până când se schimbă acreditările sau un operator le resetează. Nu suprascrie stările terminale cu o stare temporară de cooldown.

**Recuperare leneșă:** când `rateLimitedUntil` a trecut, conexiunea devine din nou eligibilă. La utilizarea reușită, `clearAccountError()` șterge toate câmpurile de eroare.

### Limita de utilizare OAuth Claude: bandă cu prioritate redusă + resetarea limitei sesiunii

**Domeniu:** o singură conexiune Claude cu abonament (OAuth). Ambele funcții sunt **opționale per
conexiune** (Editare conexiune → secțiunea Claude → `lowPriorityMode` / `autoLimitReset` în
`providerSpecificData`, ambele dezactivate implicit) și reflectă comenzile Claude Code `/low-priority` și `/limit-reset` (contractul wire capturat din Claude Code 2.1.263).

**Implementare:**

- Mașina de stări + clasificarea răspunsurilor: `open-sse/services/claudeLowPriority.ts`
- Client pentru starea/solicitarea resetării: `open-sse/services/claudeLimitReset.ts`
- Hook executor (injectarea antetului + reîncercarea pe același cont): `open-sse/executors/base.ts::execute()`
- Persistența activării opțiunii: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Declanșator:** limita de utilizare de 5 ore — un `429` ale cărui antete conțin
`anthropic-ratelimit-unified-status: rejected` și, când contul este eligibil,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nu se trimite nimic înainte de primul
`429` al limitei; un `429` în rafală fără antete unified urmează calea normală de cooldown.

**Banda cu prioritate redusă** (`lowPriorityMode`):

- La `429`-ul limitei, executorul acceptă oferta și reîncearcă imediat pe **același**
  cont cu `anthropic-usage-limit: slow`; banda rămâne activă până la
  `anthropic-ratelimit-unified-reset` anunțat (+ o perioadă de grație de 60 s), iar fiecare
  solicitare din acea fereastră include antetul. `429`-ul interceptat nu ajunge la `handleChatCore`, astfel încât conexiunea **nu** intră în cooldown și nu este rotită.
- `anthropic-ratelimit-unified-slow-status` în răspunsurile ulterioare: `active` /
  `not_needed` mențin banda; `slot_busy` (429) sau un `529` așteaptă valoarea serverului
  `anthropic-ratelimit-unified-slow-retry-after` (implicit 20 s, limitată la 5–600 s, cu
  variație aleatorie de ±30%) și reîncearcă, cu o limită impusă de
  `anthropic-ratelimit-unified-slow-max-wait` (implicit 20 min, limitată la
  1 min–6 h) — după depășirea acesteia, banda se încheie și o perioadă de cool-off de
  10 minute blochează reacceptarea. Așteptarea este limitată suplimentar de timpul rămas din
  timeout-ul propriu al solicitării pentru pornirea upstream
  (`resolveFetchStartTimeout`, implicit 10 min), minus o marjă de 5 s: fără această limitare,
  valoarea implicită de 20 de minute pentru max-wait ar depăși durata solicitării, iar somnul
  ar fi întrerupt la jumătate, generând un `TimeoutError` în locul încheierii elegante cu
  `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, trecerea la o nouă fereastră
  de 5 ore sau `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`
  (care o încheie ca `extra_usage` pentru orice stare, deoarece utilizarea suplimentară
  plătită acoperă acum limita) încheie banda; răspunsul urmează apoi calea normală de
  cooldown. `budget_exhausted` este reținut până la resetarea bugetului anunțată (≤ 8 zile).
- Verificarea limitei rulează după reîncercările intra-încercare proprii ale executorului
  declanșate de 400 (editarea contextului, limitările pentru thinking/effort, învățarea
  automată a parametrilor), astfel încât un `429` al limitei care apare doar la una dintre
  aceste reîncercări este interceptat în continuare, în loc să ajungă pe calea de cooldown.
- Starea este păstrată în memorie per conexiune (o repornire costă un `429` suplimentar al
  limitei pentru reacceptare).

**Resetarea limitei sesiunii** (`autoLimitReset`, încercată înaintea benzii când ambele sunt activate):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocul `juniper_tide`;
  când `arm: "reset"` și `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` cu
  `{ "program": "juniper_tide" }` (UUID-ul organizației din
  `providerSpecificData.organizationUUID`, cu fallback la bootstrap).
- `result: reset|not_limited` → solicitarea este reîncercată la viteză maximă (fără antetul
  slow). `already_used` / `not_offered` memorează `next_available_at` (implicit o săptămână);
  orice eșec aplică un backoff de 15 minute. Resetarea are loc o dată pe săptămână și este
  în continuare contabilizată în limita săptămânală.

Protecții de regresie: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitatea sesiunii (#7274)

**Domeniu:** o sesiune client (`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session` header) fixată pe o singură conexiune, pentru **orice** furnizor.

**Scop:** menținerea unui agent cu mai multe ture (Claude Code, aider, agenți personalizați)
pe același cont între solicitări, reducând pierderea contextului între conturi și repetarea
răspunsurilor `429` de pornire la rece pentru furnizorii cu stare de sesiune per cont.

**Implementare:**

- Rezolvarea TTL-ului: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selectarea/crearea fixării: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extragerea antetului (generică, pentru orice furnizor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabelul de fixări persistente: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setare: `sessionAffinityTtlMs` (TTL global în ms, `0` dezactivează) — `src/lib/db/settings.ts`.
  Redenumită din `codexSessionAffinityTtlMs`, specifică doar pentru Codex, prin migrarea
  `124_generic_session_affinity_ttl.sql`, care preia orice TTL Codex configurat anterior ca
  noua valoare implicită.

Înainte de #7274, `resolveSessionAffinityTtlMs()` revenea imediat la `0` pentru orice furnizor
cu excepția `codex`, astfel încât setarea TTL (și antetele sesiunii) nu avea efect nicăieri
altundeva, chiar dacă mecanismul de fixare și extragerea antetului erau deja independente de
furnizor. Remedierea a eliminat această revenire timpurie; TTL-ul se aplică acum uniform
oricărui furnizor după ce este setat global la o valoare mai mare decât `0`.

Cele trei antete de afinitate a sesiunii nu sunt transmise niciodată upstream — executorii își
construiesc propriile antete upstream de la zero, în loc să transmită antetele clientului,
astfel încât acestea rămân doar un identificator intern de corelare.

### Închirieri exclusive de conexiuni pentru sesiuni gestionate

**Domeniu de aplicare:** un singur client HTTP/sesiune gestionat(ă) activ(ă) deține o conexiune OmniRoute eligibilă.

**Scop:** furnizarea unei dețineri exclusive și durabile a conexiunii pentru clienții care au nevoie de o
barieră strictă de rutare între solicitări. Aceasta diferă de afinitatea sesiunii, care este o preferință
de continuitate neobligatorie: un lease exclusiv păstrează starea ciclului de viață în SQLite, impune
unicitatea globală a proprietarului activ și a conexiunii active și respinge o generație expirată înainte
de expedierea către provider.

Funcția este opțională pentru fiecare cheie API. O cheie gestionată trebuie să aibă domeniul `lease:exclusive` și o
listă `allowedConnections` explicită și nevidă. Orice client HTTP poate utiliza endpointul ciclului de viață; nu
este necesar niciun nume de client, user-agent, provider, metodă OAuth sau model. Lease-ul deține o conexiune,
nu un model, astfel încât schimbarea modelului păstrează asocierea cât timp conexiunea rămâne eligibilă în mod
obișnuit. Regulile normale privind modelul, cota, starea de sănătate, perioada de cooldown și lista de permisiuni
rămân autoritare și pot transfera aceeași generație către o altă conexiune eligibilă liberă.

Ciclul de viață este `POST /api/v1/session-leases`, cu acțiunile JSON `acquire`, `renew` și `release`.
Solicitările de inferență gestionate prezintă valoarea opacă `X-OmniRoute-Lease-Owner` și valoarea exactă
`X-OmniRoute-Lease-Generation`. Proprietarul utilizează `vlo_` urmat de 43 de caractere base64url; este
stocat doar hash-ul SHA-256 al acestuia. Fiecare barieră finală de expediere include și identificatorul cheii
API autentificate, precum și identificatorul conexiunii active. Antetele de control ale lease-ului sunt eliminate
din jurnale, din instantaneele păstrate ale solicitărilor și din antetele executorului upstream.

Dacă rutarea obișnuită are candidați gestionați eligibili, dar fiecare candidat liber este ocupat de un lease
activ străin, OmniRoute returnează HTTP `429`, codul de indisponibilitate a capacității lease-ului, o stare de
așteptare a capacității și un `Retry-After` limitat, derivat din cea mai apropiată expirare relevantă.
Lipsa obișnuită a eligibilității nu reprezintă o dispută pentru lease și păstrează semantica existentă a erorilor
de rutare.

Mecanismele asociate rămân separate:

- Ocuparea sesiunilor OAuth este o distribuție soft locală procesului pentru conturile OAuth.
- Semafoarele conturilor acordă permise de concurență pentru solicitări și se încheie când o solicitare este finalizată.
- Lease-urile exclusive ale sesiunilor gestionate reprezintă deținerea durabilă pe durata ciclului de viață, cu o barieră de generație.

## 3. Blocarea modelului

**Domeniu:** tripletul provider + conexiune + model.

**Domeniul în funcție de status:** statusul care a eșuat decide cheia în care scrie blocarea
(`resolveLockoutScope()` în `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un semnal de cotă sau drepturi — blochează **familia cotei**:
  pentru codex, întregul domeniu `codex` / `spark` (fiecare model `gpt-5*` al
  conexiunii), iar pentru ceilalți provideri `getQuotaScopedModelForProvider()`.
- `404` blochează modelul simplu (`getModelLockKey()` restrânge `not_found`).
- Orice alt status — erori de transport/server `5xx` și `502` sintetizat de OmniRoute
  în urma validării calității — blochează doar tuplul **exact**
  provider/conexiune/model. Un flux defect pentru un model nu oferă dovezi despre
  cota contului; înainte de această regulă, un singur răspuns gol pentru
  `codex/gpt-5.6-luna` elimina din rutare fiecare model `gpt-5*` al acelei conexiuni
  timp de 2–30 de minute (cu escaladare), în timp ce cota sa rămânea neafectată.
- Opțiunea explicită `scope` a apelantului are întotdeauna prioritate (Antigravity
  transmite `"exact"`).

**Scop:** evitarea dezactivării unei conexiuni întregi atunci când un singur model este indisponibil sau limitat de cotă.

**Exemple:**

- Provideri cu cote per model care returnează 429
- Provideri locali care returnează 404 pentru un model lipsă
- Eșecuri de permisiuni specifice providerului pentru mod/model (de exemplu, modurile Grok)

**Implementare:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Tabloul de bord pentru perioadele de așteptare ale modelelor (v3.8.0)

Interfață: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Afișează blocările active cu: provider, conexiune, model, motiv, expiresAt. Operatorii pot reactiva manual un model din card.

**API REST:**

- `GET /api/resilience/model-cooldowns` — listează blocările active
- `DELETE /api/resilience/model-cooldowns` — reactivare manuală. Corp: `{provider, connection, model}`. Autentificare: management.

### Managerul perioadelor de așteptare

Interfață: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

O singură pagină pentru fiecare conexiune care nu mai este disponibilă pentru rutare dintr-un motiv tranzitoriu, în loc să
deschidă pagina fiecărui provider. Listează perioadele de așteptare ale conexiunilor, blocările modelelor și
stările terminale, le șterge pentru fiecare conexiune, pentru o selecție sau pentru toate conexiunile unui provider
și editează cele mai utilizate reguli pentru perioadele de așteptare: `streamStallCooldown.enabled` și perioada de așteptare de bază
`connectionCooldown` și numărul maxim de pași de backoff pentru conexiunile OAuth / cu cheie API (salvate prin
`PATCH /api/resilience`). Stările terminale (`banned`, `expired`, `credits_exhausted`) sunt
listate, dar nu sunt șterse niciodată de aici.

Cardul **Reguli pentru perioadele de așteptare ale erorilor** de pe aceeași pagină editează regulile pentru erorile operatorului
(`settings.providerErrorRules`) și valorile implicite generale per provider
(`settings.providerErrorDefaults`) prin `PATCH /api/settings` — consultați „Reguli declarate de operator”
din §7 pentru modul în care sunt potrivite. Duratele sunt Implicit (fără perioadă de așteptare explicită), 30 de minute,
1 oră, 5 ore, 24 de ore sau o valoare personalizată între 1 și 43.200 de minute (30 de zile).

**API REST** (`src/lib/resilience/cooldownManager.ts`, autentificare: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexiuni cu status, perioada de așteptare rămasă,
  nivelul backoff, ultimul tip de eroare și blocările modelelor (fără credențiale)
- `POST /api/resilience/cooldowns` — corp `{connectionIds: string[]}` sau
  `{all: true, provider?}`; returnează `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Interfața pentru setările blocării modelelor + recuperarea prin reducerea succesului (v3.8.23)

Blocarea modelelor a trecut de la un comportament mereu activ, hardcodat, la o funcție complet configurabilă,
activată opțional, cu propriul card de setări și o cale de recuperare cu autoreparare.

**Card de setări:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Acesta este **distinct** de `ModelCooldownsCard` disponibil doar pentru citire de mai sus (care doar
_ listează_ blocările active) — noul card _configurează parametrii_. Valorile implicite
se află în `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setare                  | Implicit                         | Semnificație                                                                  |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Comutator principal — blocarea modelului este **dezactivată implicit**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusurile upstream care sunt considerate eșecuri pentru domeniul modelului. |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata inițială a blocării pentru primul eșec.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limita perioadei de așteptare escaladate.                                     |
| `maxBackoffSteps`       | `10`                             | Numărul maxim de pași de escaladare prin backoff exponențial.                 |
| `useExponentialBackoff` | `true`                           | Dacă eșecurile repetate escaladează exponențial perioada de așteptare.        |

Setările sunt persistate prin magazinul normal de setări și validate prin schema setărilor de reziliență; cardul limitează
`baseCooldownMs`/`maxCooldownMs` (cu `maxCooldownMs ≥ baseCooldownMs`) și `maxBackoffSteps`.

**Recuperarea prin reducerea succesului:** recuperarea nu constă **doar** în expirarea temporizatorului. Un
răspuns sănătos reduce treptat numărul de eșecuri al modelului, astfel încât un model care și-a revenit
în timpul intervalului să nu mai escaladeze (și să fie deblocat) înainte de expirarea temporizatorului. Pentru o țintă combo
reușită, `open-sse/services/combo.ts` apelează `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), care **înjumătățește** `failureCount` stocat
(`Math.floor(failureCount / 2)`); când ajunge la `0`, intrarea de blocare este ștearsă complet. Contrapartea
`recordModelLockoutFailure()` incrementează numărul (și escaladează perioada de așteptare) pentru eșecurile din intervalul de escaladare. Această reducere prin succes se adaugă expirării simple a temporizatorului —
oricare dintre cele două căi poate reactiva un model.

**Stare:** blocările sunt păstrate **în memorie** (instanțe `Map` per proces, cu chei
`ModelLockoutEntry` de forma `provider:connectionId:model`, iar blocările cu domeniu exact de forma
`provider:connectionId:exact:model`), nu sunt persistate în
baza de date — se pierd la repornire. _Setările_ sunt persistate; _starea_ activă a blocării este efemeră.

---

## 4. Controlul concurenței pentru partajarea cotei (v3.8.36)

Conturile pe bază de abonament (GLM, MiniMax etc.) acceptă adesea doar ~1–3
solicitări concurente; depășirea acestei limite declanșează erori 429 și perioade
de cooldown. Problema este acută în cazul combinațiilor de tip
**partajare a cotei** (`qtSd/…`), unde mai multe chei API partajează același
cont upstream. Trei niveluri împiedică supraîncărcarea unui cont partajat.

### Limită de concurență per conexiune (`max_concurrent`)

Fiecare conexiune de provider poate declara o limită superioară
`max_concurrent`
(`provider_connections.max_concurrent`, setată în modalul de conexiune / API / DB).
Lăsați câmpul gol pentru a nu impune nicio limită. Acesta este singurul parametru
care controlează nivelul de serializare descris mai jos — setați-l la concurența
reală a contului (de exemplu, GLM ~1, MiniMax ~2).

### Limite de concurență per model (`modelConcurrency`)

O conexiune poate declara suplimentar limite exacte de concurență per model
în mapa sa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Setați această valoare în modalul conexiunii (**Înlocuiri pentru limitarea ratei →
Limite de concurență per model**, câte o pereche `model=cap` pe linie) sau prin
`PATCH /api/providers/[id]`, folosind aceeași structură JSON. Semantica
principală:

- **La nivelul conexiunii vs. specific modelului:** `maxConcurrent` rămâne limita
  comună la nivelul întregii conexiuni. Când se aplică ambele, ambele porți sunt
  achiziționate atomic în aceeași poartă compozită
  (`global → provider → account → model`); comportamentul efectiv este determinat
  de limita aplicabilă mai strictă.
- **Potrivire exactă a cheii modelului:** cheia este șirul modelului transmis
  executorului după rezolvarea rutării — în mod normal, ID-ul simplu al modelului
  upstream (`glm-5`), nu aliasul `provider/model` de pe partea clientului
  (`zai/glm-5` nu se potrivește cu `glm-5`). Valorile sunt limite pozitive,
  întregi, pentru solicitări concurente.
- **Așteptare locală în coadă, fără detectare:** solicitările excedentare așteaptă
  local, folosind semantica existentă pentru coadă/timeout (erori de admitere
  tipizate `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nu detectează
  și nu deduce politica upstream — impune limitele exacte configurate de operator.
  O poartă de model saturată nu dezactivează niciodată providerul și nu creează
  niciodată o blocare permanentă a modelului; comportamentul upstream pentru
  429/cooldown/fallback rămâne mecanismul de rezervă pentru erori.
- **Domeniu per conexiune, per proces:** limitele sunt per conexiune din baza de
  date și sunt păstrate în memorie, astfel încât două conexiuni care reutilizează
  aceeași cheie API upstream nu se coordonează între ele.
- **Neconfigurat înseamnă neschimbat:** omiterea hărții (sau lăsarea necompletată
  a câmpului din dashboard) nu adaugă nicio poartă pentru modele. Exemplu de
  configurație fără a impune vreo limită universală la nivelul providerului:

```text
glm-5=1
glm-4.7=3
```

### Serializarea solicitărilor pentru partajarea cotei

Când o distribuire pentru partajarea cotei vizează o conexiune care declară o
valoare pozitivă pentru `max_concurrent`, solicitările concurente către acel
**cont** sunt serializate printr-un semafor per conexiune (cheia
`qsconn:<connectionId>`): solicitările excedentare **așteaptă în coadă** în loc
să supraîncarce contul. Aceasta este o funcționare **fail-open** — o coadă
saturată sau un timeout permite continuarea fără un slot, în loc să respingă
vreodată o solicitare care poate fi distribuită. Activați/dezactivați din
**Setări → Reziliență → Concurență pentru partajarea cotei per conexiune**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activată implicit).
Fără o limită `max_concurrent`, comportamentul rămâne neschimbat.

> Poarta de rutare pentru partajarea cotei (`selectQuotaShareTarget`, DRR + P2C)
> funcționează ea însăși în mod **fail-open** și doar _reduce prioritatea_ unei
> conexiuni care a atins limita — într-un grup cu o singură conexiune nu poate
> impune o limită strictă, astfel încât acest semafor este cel care limitează
> efectiv supraîncărcarea.

### Reîncercarea combinațiilor ținând cont de cooldown

Pentru fiecare strategie de combinație (când este activată), o solicitare care ar
declanșa o eroare 429 pentru un cooldown tranzitoriu SCURT așteaptă expirarea
acestuia și este redistribuită, în loc să returneze eroarea 429 — acest lucru
acoperă ferestrele TPM/RPM de tip Gemini (~60 s pentru retry-after) în cazul
combinațiilor cu mai multe modele, de exemplu atunci când ambele ținte ale unei
combinații cu 2 modele ating o limită de rată per model. Comportamentul este
limitat de `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) în **Setări → Reziliență**. Nu așteaptă niciodată pentru
`quota_exhausted` (blocat până la miezul nopții) sau pentru motive de autentificare
/ resursă inexistentă.

O combinație poate renunța la acest comportament prin
`config.comboCooldownWaitEnabled: false`. Doar valoarea literală `false`
dezactivează aceste așteptări comune pentru combinații (cooldown după distribuire
și așteptarea dinaintea distribuirii pentru circuit deschis/blocarea modelului)
și extinderea pragului inferior al timeout-ului prin bugetul de așteptare.
Lipsa valorii sau `true` păstrează politica globală; `true` nu poate activa
așteptarea dezactivată global. Un `targetTimeoutMs` explicit are în continuare
prioritate. Această opțiune nu modifică așteptarea separată dinaintea distribuirii
pentru fixarea turei native Codex.

Aceeași poartă acoperă cazul dinaintea distribuirii (#16319): când fiecare țintă
a unei combinații este omisă înainte de efectuarea oricărei încercări deoarece
modelul său se află într-o blocare tranzitorie scurtă, calea cu zero încercări
așteaptă expirarea blocării în limitele aceleiași politici și redistribuie
solicitarea, în loc să răspundă cu `503 ALL_TARGETS_SKIPPED` fără indicații.
Când nu este permisă nicio așteptare (limita de timp, numărul de încercări sau
bugetul epuizat ori funcționalitatea este dezactivată), răspunsul final devine
`429 rate_limit_error`, conținând `retry_after` / `reset_at` de la cea mai
apropiată expirare a unei blocări tranzitorii; blocările pentru cotă, autentificare
și resursă inexistentă păstrează răspunsul 503 fără indicații.

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

## 5. Controlul admiterii în coada de cereri (v3.8.49 · issue #6593)

**Domeniu**: coada locală de limitare a ratei per furnizor+conexiune (`open-sse/services/rateLimitManager.ts`, susținută de Bottleneck), cu un nivel sub cele trei mecanisme de mai sus.

**`maxWaitMs` limitează așteptarea în coadă; `executionMaxWaitMs` limitează execuția.**
Cele două sunt separate în mod deliberat și niciuna nu o alimentează pe cealaltă.

`resilienceSettings.requestQueue.maxWaitMs` este **bugetul de așteptare în coadă**: acoperă așteptarea unui slot de la furnizor și apoi starea în QUEUED, iar cronometrul său este anulat în momentul în care jobul părăsește QUEUED și începe execuția (`rateLimitManager.ts`, `wrappedFn`). O cerere care îl depășește nu ajunge niciodată la upstream. Valoare implicită 30000ms, furnizată de `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` în `src/lib/resilience/settings.ts` și fixată de `tests/unit/ratelimit-admission-control-6593.test.ts`, astfel încât o modificare a acesteia face acel test să devină roșu, în loc să lase acest paragraf să devină în tăcere depășit.

`resilienceSettings.requestQueue.executionMaxWaitMs` este ceea ce Bottleneck primește ca `expiration` a jobului, al cărui cronometru pornește abia după lansare. Este o plasă de siguranță pentru executorii fără un timeout propriu către upstream și este ridicat la timeout-ul propriu de începere a fetch-ului al executorului atunci când acesta este mai lung, astfel încât nu poate întrerupe un răspuns sănătos aflat în desfășurare. Valoare implicită 600000ms (10 min).

Alimentarea bugetului cozii în `expiration` este ceea ce obișnuia să omoare gateway-urile ne-incrementale la mijlocul execuției — acestea rulează legitim minute întregi înainte de primii octeți — și este motivul pentru care o expirare este raportată ca `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), în timp ce bugetul cozii poartă codul de timeout al cozii. Suprascrieți oricare dintre ele prin `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) sau din panoul de control (**Setări → Reziliență**). Ambele sunt limitate la 1ms–24h la normalizare.

**Precedență, pentru ambele:** variabila de mediu furnizează doar valoarea _implicită_. O valoare persistentă în `resilienceSettings.requestQueue` (panou de control / patch API, stocată în `key_value`) are prioritate față de aceasta, iar un `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per conexiune are prioritate față de aceasta. Prin urmare, setarea variabilei de mediu pe un deployment care are deja o valoare persistentă nu schimbă nimic — ștergeți sau actualizați în schimb setarea persistentă.

Șederea în coadă este limitată de `maxWaitMs`; `maxQueueDepth` de mai jos limitează câți apelanți pot fi în coadă simultan.

**Reîncercări declarate în corp: ritmare vs blocare.** Un corp 429 poate specifica propria așteptare (Gemini `RetryInfo.retryDelay`, text de tipul „retry after Ns"), pe care o citește `updateFromResponseBody`. O așteptare care încape în `maxWaitMs`-ul conexiunii este ritmare: limiterul își golește rezervorul pe acea durată, iar apelurile din coadă sunt lansate când acesta se reumple. O așteptare mai lungă decât `maxWaitMs` nu este ceva ce coada poate aștepta — Gemini răspunde la o cotă zilnică epuizată cu `retryDelay: "86399s"`. `Retry-After`-ul retransmis pe 429-ul reconstruit (#16528) face deja ca motorul de fallback să blocheze modelul pentru acea fereastră, dar întreruperea limiterului și pentru aceasta ar bloca totuși orice apel care ajunge devreme la cheie (după o resetare a rezilienței, de exemplu) pentru întregul `maxWaitMs`. Când o astfel de așteptare provine dintr-un detaliu Google `RetryInfo` tipizat (proveniența `google_rpc_retry_info`) și limiterul cheii este deja delimitat la model (vezi `getLimiterKey`), 429-ul devine în schimb o blocare a modelului pe acea conexiune (`lockModelForLongBodyRetry` în `open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitată la 24h), iar limiterul rămâne neîntrerupt. Selecția contului sare peste acea blocare prin `isModelLocked()`, la fel și poarta combo de pre-lansare pentru țintele fixate pe conexiune. Pe antigravity, al cărui limiter este per familie de cote, blocarea este pe modelul exact, ca și celelalte blocări de cotă ale sale. Numele cerut de client este blocat de asemenea atunci când un alias l-a rezolvat la acel model, deoarece acele verificări folosesc numele cerut; este blocat exact (`lockExactModel`), astfel încât un alias care traversează o familie de cote antigravity sau un domeniu codex nu îl blochează niciodată pe al său. Un indiciu în proză, un `retryDelay` netipizat sau un limiter partajat de întreaga conexiune păstrează pauza. Când limiterul pe care calea 429 tocmai l-a reconstruit chiar se întrerupe, un apelant al cărui timp rămas în coadă se termină înaintea pauzei este respins imediat cu codul de timeout al cozii (`checkLimiterPause`), în loc să aștepte scurgerea acelui timp; sfârșitul înregistrat este ancorat înainte ca limiterul să fie construit, acolo unde Bottleneck își pornește ceasul de reîmprospătare, iar orice modificare ulterioară a rezervorului îl uită. Acoperit de `tests/unit/rate-limit-long-body-retry-lockout.test.ts` și `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limită de admitere opt-in (nou).** `resilienceSettings.requestQueue.maxQueueDepth` limitează câte cereri pot sta în coadă (încă nelansate) pentru un furnizor+conexiune simultan. Când coada conține deja `maxQueueDepth` cereri, o cerere nouă este respinsă rapid cu o eroare tipizată `code: "RATE_LIMIT_QUEUE_FULL"` **înainte** de a ajunge vreodată la `limiter.schedule()` — astfel încât respingerea este ieftină și are loc înaintea oricărei lucrări de compresie a promptului / traducere din aval pentru acea cerere. Implicit `0` = dezactivat, păstrând comportamentul existent de coadă nelimitată; limitat la 0–100000. Suprascrieți prin `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) sau `resilienceSettings.requestQueue.maxQueueDepth` (panou de control / patch API).

Verificarea admiterii în sine este o funcție pură (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), astfel încât este testabilă unitar fără un limiter Bottleneck real.

> RFC-ul care a deschis #6593 a propus, de asemenea, un flag `bypassCompressionOnRateLimit`.
> Pipeline-ul `open-sse/services/compression/` din acest repo este compresia
> promptului/contextului pe cererea LLM de ieșire (`chatCore.ts`,
> în jurul blocului `resolveCompressionSettings`/`selectCompressionStrategy`),
> nu compresia răspunsurilor HTTP pe corpuri 429 sintetizate — nu există
> o cale de cod corespondentă pentru un flag literal de ocolire. Acea etapă
> de compresie a promptului rulează, de asemenea, în prezent _înainte de_
> `withRateLimit()` în pipeline-ul cererii, deci reordonarea pentru a o omite
> la o respingere cauzată de coada plină este o schimbare separată, mai amplă
> decât scopul acestei probleme; a fost intenționat **neimplementată**
> aici și este lăsată ca activitate ulterioară, în cazul în care câștigul de
> economisire a CPU-ului merită riscul reordonării.

### Plasa de siguranță pentru activarea automată a limitării ratei și protecția conexiunilor (`rateLimitProtection`)

**Plasa de siguranță pentru activarea automată** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, implicit `true`):
Implicit, OmniRoute activează automat protecția cozii de limitare a ratei pentru toate conexiunile active ale furnizorilor cu cheie API (`getProviderCategory(provider) === "apikey"`). Acest lucru asigură că cererile primite către cheile API upstream sensibile la rate sunt puse în coadă și limitate prin Bottleneck, în loc să genereze rafale de erori 429 de la upstream. Plasa de siguranță poate fi suprascrisă prin variabila de mediu `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` o dezactivează, `true`/`1`/`on` o forțează activată), care are prioritate față de setarea persistentizată din panoul de control (**Setări → Reziliență** / `PATCH /api/resilience`).

**Semantica câmpului `rateLimitProtection` per conexiune:**
Protecția per conexiune împotriva limitării ratei este urmărită prin câmpul boolean `rateLimitProtection` de pe conexiunile furnizorilor (persistentizat ca `rate_limit_protection` în SQLite):

- **Activat explicit (`rateLimitProtection === true`)**: Protecția împotriva limitării ratei este activată explicit pentru această conexiune, indiferent de categoria furnizorului sau de faptul că plasa de siguranță pentru activarea automată este pornită.
- **Dezactivat explicit (`rateLimitProtection === false`)**: Dezactivează protecția explicită, dar **nu** exclude o conexiune activă cu cheie API din plasa globală de siguranță pentru activarea automată. În `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` și `undefined` sunt echivalente: doar `rateLimitProtection === true` este tratat ca o suprascriere explicită. Dacă `rateLimitProtection` este `false` (sau nesetat), o conexiune activă cu cheie API îndeplinește în continuare condiția de activare automată și rămâne protejată împotriva limitării ratei.
- **Fără renunțare per conexiune**: Un operator nu poate exprima în prezent „această singură conexiune activă cu cheie API trebuie să ruleze fără protecția cozii de limitare a ratei", păstrând în același timp activarea automată activă pentru celelalte. Pentru a rula conexiunile cu cheie API complet fără cozi de limitare a ratei, plasa de siguranță trebuie dezactivată global (`RATE_LIMIT_AUTO_ENABLE=false` sau `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Căi de scriere acceptate:**

- **`POST /api/rate-limits`**: Calea de scriere de management acceptată pentru a comuta `rateLimitProtection` pentru o conexiune (`{ connectionId: string, enabled: boolean }`). Apelarea acesteia cu `enabled: true` activează protecția explicită; apelarea cu `enabled: false` elimină protecția explicită (deși conexiunile active cu cheie API rămân acoperite de plasa globală de siguranță dacă activarea automată este pornită).
- **`PUT /api/providers/[id]`**: În mod deliberat **nu** acceptă și nici nu comută `rateLimitProtection` (#11278). Actualizarea metadatelor conexiunii furnizorului prin `PUT /api/providers/[id]` nu va schimba niciodată starea persistentizată a protecției împotriva limitării ratei.

---

## 6. Câinele de supraveghere pentru flux lent (#9709)

Protecția `resilienceSettings.streamRecovery.throughputWatchdog` opțională detectează un flux în amonte care încă trimite bucăți, dar produce o ieșire de asistent sub rata de ieșire utilă configurată. Este în mod deliberat distinct de timeout-ul de inactivitate: bătăile inimii și metadatele nu resetează nici temporizatorul și nu contează ca progres. De asemenea, este diferit de termenul limită de încercare (#9153), care rămâne un plafon de siguranță absolut, indiferent de calitatea ieșirii.

Câinele de pază necesită o perioadă de încălzire urmată de o fereastră completă de rulare înainte de a putea avorta. Acesta numără deltele de text din evenimentele de ieșire API Finalizări și răspunsuri chat (un proxy UTF-8 byte conservator), ignoră evenimentele de utilizare și evenimentele goale și suspendă judecata în timp ce evenimentele de apelare a instrumentelor sau de raționament sunt în zbor. Este dezactivat în mod implicit și poate fi activat cu `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (aceasta valoare env generează doar — implicit un `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean wins salvat; consultați nota de precedență env-vs-dashboard din partea de sus a acestui ghid); fereastra, încălzirea, rata minimă și ieșirea minimă măsurabilă sunt delimitate de stratul normal de normalizare a setărilor de rezistență.

Când este activată, o întrerupere a supravegherii este aplicată numai încercării active în amonte. Înainte de orice octeți vizibili de client, calea de recuperare anticipată existentă pentru același cont poate redeschide încercarea. După comitere, fluxul nu este niciodată reluat orbește; numai contractul de continuare sigur existent la mijlocul fluxului poate împere un sufix. Finalizarea rămâne unică, astfel încât contabilitatea utilizării și eliberarea semaforului nu sunt duplicate.

---

## 7. Reformularea statusului upstream (erori de cotă raportate greșit)

**Domeniu:** un gateway upstream care raportează epuizarea temporară a cotei cu un status HTTP greșit.

**Scop:** corectarea unui status înșelător ÎNAINTE de clasificare, astfel încât consumatorii din aval (motorul de fallback, agregarea combinațiilor, răspunsul adresat clientului) să vadă natura reală, reîncercabilă, a eșecului.

Unele gateway-uri semnalează epuizarea TEMPORARĂ a cotei cu un status HTTP care
nu permite reîncercarea. `agentrouter.org` returnează `403` (uneori `400`) cu un corp
în chineză (`用户额度不足` / `额度不足`) în locul valorii standard `429`. Clienții precum
Claude Code tratează `403` ca fiind permanent și abandonează sesiunea, iar fără corecție
motorul de fallback l-ar clasifica drept `AUTH_ERROR` în locul unui
eveniment de cotă.

**Implementare:**

- Registru + matcher: `open-sse/config/upstreamStatusRestatement.ts` — o
  listă de reguli per furnizor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), potrivite prin `applyStatusRestatement()`.
- Punct de apelare: blocul `providerFailure:` din `open-sse/handlers/chatCore.ts`
  (în jurul liniei 3654), imediat după ce `parseUpstreamError()` analizează un
  răspuns upstream cu un status HTTP de eroare (`!providerResponse.ok`) și înainte
  de orice clasificare, astfel încât fiecare consumator din aval să vadă statusul corectat. Erorile
  incluse într-un flux SSE `200` urmează o cale separată, ulterioară, de analizare a fluxului
  și **nu** sunt acoperite de acest hook în prezent — o limitare cunoscută, care nu este încă
  necesară pentru statusul greșit al agentrouter (care apare ca status HTTP de eroare).
- Eligibilitatea pentru reîncercare: `429` se află în `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), astfel încât o eroare reformulată
  poartă o fereastră reală pentru reîncercare, în loc să fie prezentată ca un `403` fără
  posibilitate de recuperare.
- Valoarea sintetică `60s` pentru `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  este doar ceea ce răspunsul reformulat îi comunică **clientului**; aceasta nu este durata
  internă de cooldown/blocare a conexiunii — ea este guvernată separat de mecanismul care
  gestionează efectiv eroarea reformulată (backoff-ul escaladant al Connection Cooldown,
  §2, cu valoarea de bază `3s` pentru furnizorii cu chei API; sau Model Lockout, §3, pentru
  furnizorii cu cotă per model, precum agentrouter). Routerul poate deveni eligibil pentru
  reîncercare internă mai devreme decât fereastra de 60s pe care o anunță clientului —
  o rezervă intenționată, nu o eroare.

Erorile permanente (agentrouter `无权访问模型` — lipsă de acces la acest model) nu sunt
NICIODATĂ reformulate: `excludeMarkers` anulează regula chiar și atunci când
`textMarkers` se potrivesc, astfel încât eroarea își păstrează statusul original și nimic
nu o reîncearcă la nesfârșit. Regula de clasificare a furnizorului corespunzătoare
(`agentrouter-model-access-denied` din `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, un cooldown de bază declarat de `6h`) este
consultată de `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_înainte de_ returnarea anticipată generică pentru categoria apikey `FORBIDDEN`,
condiționată de `honorsRuleLockScope(provider)` (#10334 — în prezent exclusivă pentru
agentrouter prin lista de furnizori permisă `HONORS_RULE_LOCK_SCOPE_PROVIDERS` din
`providerErrorRules.ts`). Cooldown-ul de 6h declarat de regulă este transmis prin
`fallbackResult.baseCooldownMs`, dar alimentează în continuare calea existentă de blocare
per model pentru cotele per model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nemodificată de #10334, cu excepția sursei cooldown-ului):
este limitat la valoarea `mlSettings.maxCooldownMs` a operatorului
(implicit `1_800_000ms` / 30min), la fel ca orice altă blocare per model, iar
_motivul blocării persistat_ rămâne valoarea hardcodată existentă `"forbidden"`,
nu `"auth_error"` din regulă — doar durata cooldown-ului este respectată de la un capăt la
altul, nu și șirul motivului. Conexiunea în sine rămâne activă;
modelele surori de pe aceeași conexiune nu sunt afectate.

Erorile de cotă reformulate (`额度不足`) ajung în producție la o regulă a furnizorului
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, fără un cooldown declarat propriu — se aplică valoarea implicită pentru
backoff-ul scalat al stratului de persistență). Începând cu #10334, `scope` din
`ProviderErrorRuleMatch` ESTE consumat de la un capăt la altul, dar **doar** pentru
furnizorii incluși în lista permisă `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — astăzi doar `"agentrouter"`, condiționat prin
`honorsRuleLockScope()`). Pentru orice alt furnizor, `scope` rămâne informativ, exact ca
înainte de #10334. `checkFallbackError` expune domeniul regulii potrivite ca
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) este mecanismul comun de verificare care confirmă că un
`ruleScope` poate fi considerat în siguranță un semnal valabil la nivelul întregii
conexiuni, cu recuperare automată (scope `"connection"`, motiv `quota_exhausted`, niciodată
`permanent`, niciodată `creditsExhausted` — o protecție împotriva unei viitoare asocieri
a scope-ului `"connection"` cu o stare permanentă a contului). Doi consumatori îl apelează:

- **Persistență** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  în loc să ajungă în ramura de blocare **per-model** a furnizorului passthrough
  (agentrouter are `passthroughModels: true` → `hasPerModelQuota()`
  returnează `true`), aplică o **perioadă temporară de răcire a conexiunii** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, niciodată un status terminal
  (`credits_exhausted`/`banned`/`expired`) — astfel încât conexiunea să se
  recupereze automat după expirarea perioadei de răcire, fără a necesita
  resetarea manuală a acreditărilor.
  Se omite pentru conexiunile cu `disableCooling: true` (#2997): această
  opțiune de renunțare ajunge în schimb la blocarea per-model (un compromis
  documentat — consultați comentariul din cod de deasupra ramurii).
- **Rutarea combinației în aceeași cerere** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): același guard marchează
  conexiunea în setul `exhaustedConnections` din memorie, cu cheia
  `${provider}:${connectionId}`. Acest lucru omite doar o țintă rămasă din
  ACEEAȘI CERERE care _conține deja ea însăși acel `connectionId` exact_ în
  propriul obiect de țintă (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` înainte de căutarea în `exhaustedConnections`) — o combinație
  simplă bazată pe lista de modele, în care țintele surori nu au propriul
  `connectionId` fixat și unul este rezolvat o singură dată la fiecare
  expediere din antetul `X-OmniRoute-Selected-Connection-Id` al răspunsului,
  nu ajunge niciodată la această potrivire de cheie. În acest caz obișnuit,
  protecția reală împotriva reutilizării contului tocmai epuizat de către o
  etapă rămasă NU este acest Set — ci stratul de persistență de mai sus
  (`rateLimitedUntil` al conexiunii este acum în viitor), combinat cu același
  guard care suprimă `transientRateLimitedProviders` pentru eroare (consultați
  „Design în două etape” și comentariul din cod despre ramura
  `isAgentrouterConnectionQuotaScope` din `targetExhaustion.ts`): cu acel Set
  nemarcat, forțarea permiterii `allowRateLimitedConnection` din `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NU este activată
  pentru etapele rămase ale furnizorului, astfel încât filtrul
  `rateLimitedUntil` al selecției acreditărilor (`src/sse/services/auth.ts:1238`)
  este respectat în mod normal, iar o etapă rămasă fie selectează o altă
  conexiune agentrouter încă eligibilă, fie eșuează deoarece nu sunt
  disponibile acreditări — nu forțează revenirea la conexiunea căreia această
  ramură tocmai i-a aplicat perioada de răcire.

### Design în două etape: reformularea statusului, apoi clasificarea

Reformularea statusului (`upstreamStatusRestatement.ts`) și regulile de
clasificare ale furnizorilor (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sunt registre separate care folosesc ambele
identificatorul furnizorului și marcatori de text drept chei, dar rulează în
locuri diferite și au scopuri diferite: reformularea rescrie statusul HTTP
devreme, în `chatCore.ts`; regulile de clasificare aleg `reason` de rezervă și
blochează `scope` (`model` / `provider` / `connection`) în
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Regulile de clasificare văd doar **textul** complet al erorii (necesar pentru
potrivirea marcatorilor din corp, precum `额度不足`) pentru furnizorii listați
în lista permisă `FULL_TEXT_RULE_PROVIDERS` din `providerErrorRules.ts` —
în prezent doar `"agentrouter"`. Pentru orice alt furnizor din **catalogul
încorporat**, `checkFallbackError` îi transmite lui
`getProviderErrorRuleMatch` doar eroarea structurată (`{code, type}`), ceea ce
este suficient pentru regulile bazate pe antet/status/cod, dar nu poate vedea
marcatorii din textul corpului. Helperul `resolveRuleMatchBody()` efectuează
această selecție: textul complet al erorii pentru furnizorii din lista permisă,
iar în caz contrar eroarea structurată. Adăugarea unui furnizor **încorporat**
la `FULL_TEXT_RULE_PROVIDERS` este o activare explicită per furnizor — aceasta
există pentru ca traseul implicit pentru fiecare furnizor care nu se află în
listă să rămână neschimbat byte cu byte.

`scope` al unei reguli (`model` / `provider` / `connection`) este o activare
separată de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` îl expune doar ca
`fallbackResult.ruleScope`, iar consumatorii din aval îl respectă ca altceva
decât o etichetă informativă doar pentru furnizorii din lista permisă
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` din același fișier (controlată prin
`honorsRuleLockScope()` — în prezent doar `"agentrouter"`). Consultați
„Erori de cotă reformulate” de mai sus pentru ce face efectiv o potrivire cu
`scope: "connection"` după ce un furnizor se află în acea listă permisă.

**#11104 — regulile declarate de operator ocolesc ambele liste permise.** Un
operator poate declara în timpul rulării o regulă per furnizor prin
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
fără a edita acest fișier. Controlarea unei reguli de operator prin
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — liste destinate
protejării comportamentului **implicit** al regulilor furnizorilor din
catalogul încorporat — ar face mecanismul de setări inoperant pentru orice
furnizor cu excepția celor deja listați, deoarece declararea regulii este deja
activarea explicită a operatorului. `resolveRuleMatchBody()` și
`honorsRuleLockScope()` verifică mai întâi `hasOperatorRuleForProvider()`:
un furnizor cu o regulă de operator primește textul brut al erorii și are
`scope` declarat respectat, indiferent dacă apare și în vreuna dintre listele
permise.

**Reguli declarate de operator** (`OperatorProviderErrorRule`): fiecare regulă
are un `status` opțional și un `match` opțional (un substring simplu,
insensibil la scriere, al textului erorii, niciodată un RegExp, astfel încât nu
poate cauza ReDoS) și trebuie să seteze cel puțin unul dintre cele două. Când
ambele sunt setate, sunt combinate prin AND; un câmp omis se potrivește cu
orice, astfel încât `{match: "insufficient_quota"}` se potrivește cu orice
status care conține acel cod. Prima regulă potrivită câștigă. `cooldownMs`
acceptă cel mult 30 de zile; în total sunt permise cel mult 50 de reguli.

**Valori implicite generale** (`settings.providerErrorDefaults`, opțional, setat prin
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
cu `cooldownMs` de la 1 minut la 30 de zile. O valoare implicită se aplică numai atunci când nicio regulă de operator și nicio regulă din catalogul încorporat nu s-au potrivit și numai pentru erorile 402, 403, 408, 429 și 5xx. Erorile privind forma solicitării (400, 404, 409, 413, 422) și erorile 401 fără alte informații își păstrează tratarea proprie. Fără un `reason` explicit, motivul este determinat din status, în același mod ca în `classifyError`. Declararea unei valori implicite este considerată o regulă de operator de către `hasOperatorRuleForProvider()`, astfel încât `scope` (implicit
`"connection"`) este respectat. Perioada efectivă de răcire a unei valori implicite este cea mai lungă dintre `cooldownMs` și indicația proprie de reîncercare a furnizorului (`Retry-After`,
`x-ratelimit-reset` sau o indicație de resetare din corp, aceeași indicație pe care motorul o respectă atunci când setarea de răcire a conexiunii „utilizează indicațiile upstream pentru reîncercare” este activată), astfel încât o valoare implicită poate prelungi o indicație upstream scurtă, dar nu poate scurta niciodată un reset real. O regulă explicită de operator își păstrează exact valoarea `cooldownMs`. Nici o regulă și nici o valoare implicită nu ocolesc protecțiile de răcire a conexiunii din `markAccountUnavailable`: o răcire activă și mai lungă nu este niciodată scurtată, iar un status terminal nu este niciodată suprascris. Detectoarele de text încorporate care rulează mai devreme în `checkFallbackError` (credite epuizate, cotă zilnică, cont dezactivat) au în continuare prioritate pentru expresiile proprii.

**Lacunoscută cunoscută — `providerRuleRegistry` nu este consultat niciodată pentru HTTP 400.**
Ramura `BAD_REQUEST` din `checkFallbackError` clasifică statusul 400 exclusiv prin propriile tablouri de tipare (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` etc. din `accountFallback.ts`) și returnează rezultatul înainte ca ramura `configuredRule`/`getProviderErrorRuleMatch` de mai sus să fie atinsă.
O regulă din catalogul încorporat (sau o regulă de operator) cu `status: 400` este validă sintactic, dar nu va fi niciodată aplicată. În prezent, nicio regulă existentă nu vizează 400, astfel încât nimic din producție nu este afectat — însă o regulă 400 viitoare necesită mai întâi modificarea acestei ramuri, ceea ce reprezintă o schimbare mai amplă decât adăugarea unei reguli (reclasifică 400 pentru fiecare furnizor care se bazează deja pe comportamentul tablourilor de tipare) și nu intră în domeniul de aplicare al adăugării unei reguli pentru un singur furnizor.

### Adăugarea unui gateway nou care denaturează informațiile despre cotă

1. Înregistrați un singur tablou de reguli în `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Păstrați `textMarkers`
   specifice furnizorului; nu reutilizați niciodată expresii generice în engleză care intră în conflict cu
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opțional, înregistrați reguli de clasificare în
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) pentru a alege domeniul corect al blocării (`connection` pentru cota la nivelul întregului cont, `model` pentru erori specifice unui model). Acest pas produce efecte în producție numai pentru furnizorii ale căror reguli necesită textul complet al erorii (marcatori din corp): adăugați identificatorul furnizorului la `FULL_TEXT_RULE_PROVIDERS` în același fișier — în caz contrar, `checkFallbackError` transmite regulii numai eroarea structurată
   `{code, type}`, iar o regulă bazată pe textul corpului nu se va potrivi niciodată traficului real.
   Regulile care se potrivesc exclusiv pe baza `status`/`headers` (precum cele pentru Opencode sau Minimax) nu necesită această activare. Separat, dacă regula declară `scope: "connection"` și intenția este o răcire reală la nivelul întregii conexiuni, împreună cu omiterea combinației pentru aceeași solicitare (nu doar o etichetă informativă), adăugați identificatorul furnizorului la `HONORS_RULE_LOCK_SCOPE_PROVIDERS` în același fișier — acest lucru controlează consumarea de tip `isAgentrouterConnectionQuotaScope()` în `markAccountUnavailable()` (`src/sse/services/auth.ts`) și
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); fără aceasta, `scope`
   continuă să fie transmis prin `fallbackResult.ruleScope`, dar nimic nu acționează pe baza lui.
3. Adăugați teste unitare care să reflecte
   `tests/unit/upstream-status-restatement.test.ts`
   și `tests/unit/agentrouter-error-rules.test.ts` (inclusiv protecțiile
   not-permanent / not-creditsExhausted și — dacă furnizorul are nevoie de allowlist —
   un test care verifică faptul că `resolveRuleMatchBody()` returnează textul complet numai pentru acel furnizor).

Nu sunt necesare modificări în `chatCore.ts`, `classifyError` sau combo.

#### Blocare grupată pe compartimentul de ieșire (#10880)

Furnizorii din `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia opencode) sunt tratați
ca upstream grupat după IP (nivelul gratuit opencode este grupat după IP, nu
după cont — consultați #9611): un status-429 clasificat ca `quota_exhausted`
**sau** `rate_limit_exceeded` răcește fiecare conexiune din familia permisă
a cărei ultimă adresă IP de ieșire cunoscută corespunde celei a conexiunii care a eșuat, înainte ca rotația să le poată încerca
— evitând N-1 apeluri upstream garantat eșuate (aceeași structură ca în #10460/#10525).
`rate_limit_exceeded` este inclus în mod intenționat: pe calea `markAccountUnavailable`
regulile specifice opencode nu se potrivesc niciodată (nu sunt transmise antetele/corpul către
`checkFallbackError`, iar opencode nu se află în `FULL_TEXT_RULE_PROVIDERS`), astfel încât un 429 al cărui corp conține textul privind cota abonamentului („limita lunară de utilizare a fost atinsă”) este clasificat ca `quota_exhausted` de către fallback-ul pentru textul cotei
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; răcire de 1 oră) înainte ca regula
`status_429` să fie atinsă — în timp ce un 429 fără text privind cota (limitare simplă a ratei) este clasificat prin regula `status_429` ca `rate_limit_exceeded`
și răcește în continuare familia IP. Pentru un furnizor permis, o limitare a ratei grupată după IP transmite același semnal ca o cotă epuizată. Limite reale:

- **Cel mai bun efort**: lock-ul rezolvă `egress_ip` cunoscut ultima dată al conexiunii
  din `proxy_logs` (fereastră de 24 h, sincron, fără cache). Cache rece (`egress
IP` nu a fost niciodată testat) sau nicio înregistrare → conexiunea care a eșuat
  este în continuare răcită de ramură (înregistrată ca astăzi), doar că niciun
  sibling nu este blocat.
- **Niciodată terminal**: perioada de răcire este o fereastră de cotă care se
  reînnoiește (`testStatus: "unavailable"`); o stare permanentă nu este derivată
  niciodată dintr-un semnal la nivel de IP. Conexiunile `disableCooling` omit
  complet ramura.
- **Granularitatea lock-ului se schimbă pentru familia din lista permisă**: aceasta
  este o schimbare de domeniu, nu doar o optimizare pentru sibling. opencode este
  un provider `passthroughModels`, astfel încât înainte de această ramură un 429
  producea un lockout per-MODEL; acum produce o perioadă de răcire a conexiunii —
  inclusiv pentru un operator care rulează o singură conexiune, fără niciun sibling.
  Aceasta este granularitatea pe care tabelul de reguli opencode o declară deja ca
  fiind corectă (`scope: "connection"`,
  `providerErrorRules.ts`), dar care nu a fost respectată până acum deoarece
  opencode nu se află în `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ramura scrie
  direct perioada de răcire a conexiunii care a eșuat + `backoffLevel`, reflectând
  ramura cu domeniu connection-scoped a agentrouter, apoi returnează — blocarea
  per-model și calea generică de mai jos nu sunt niciodată atinse.
- **Combinația este inclusă**: la fel ca ramura agentrouter, domeniul ignoră în mod
  deliberat downgrade-ul `persistUnavailableState`/`isCombo` aplicat de un apelant
  combo unui 429. Un lockout per-model nu este o formă mai slabă a acestui domeniu,
  ci unitatea greșită: nu spune nimic despre IP-ul epuizat, astfel încât rotația
  combo ar continua să consume câte un apel garantat-eșuat pentru fiecare sibling.
- **Siguranța sibling-urilor**: un sibling deja terminal (banned/credits_exhausted)
  sau aflat deja într-o perioadă de răcire mai lungă nu este niciodată suprascris.
- **Lista permisă exclusivă**: extinderea `EGRESS_BUCKETED_LOCK_PROVIDERS` este o
  decizie explicită a proprietarului; nu există o integrare generică (pattern #10334/#10419).
  Interogarea sibling-urilor folosește aceeași listă permisă, în loc să o repete ca
  literal SQL, astfel încât extinderea ei rămâne o modificare de o singură linie.
- **Rotația IP-ului de ieșire, în ambele direcții**: fereastra de căutare (24 h) este
  mult mai largă decât TTL-ul cache-ului IP-ului de ieșire (5 min), astfel încât
  „ultimul IP cunoscut” reprezintă istoricul, nu starea curentă. Dacă proxy-ul unei
  conexiuni s-a rotit în interiorul ferestrei, lock-ul poate **rata** un IP partajat
  în mod real (IP-ul înregistrat este cel nou, neepuizat) — și, simetric, poate
  **răci un sibling care între timp s-a rotit** de la IP-ul epuizat. Al doilea caz
  costă acelui sibling o fereastră de răcire; ambele sunt limite acceptate, de cel
  mai bun efort, ale unei căutări bazate pe istoric.
- **Cost**: două scanări limitate ale `proxy_logs` (filtrate după fereastră prin
  `idx_pl_timestamp`), doar la frecvența 429. Niciun index nou (migrarea 134
  YAGNI). Măsurat pe o copie a unei baze de date cu trafic real, de dimensiune
  moderată; o instanță cu debit mare păstrează proporțional mai multe rânduri în
  aceeași fereastră.

## Alte funcționalități de reziliență

- **20 de strategii de rutare** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consultați [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Rutare ținând cont de resetare (reset-aware)** (v3.8.0) — prioritizează conexiunile în funcție de momentul resetării cotei.
- **Degradarea modului în fundal** — Responses API cu `background: true` este degradat la execuție sincronă, cu avertisment.
- **Detectarea dinamică a limitei de unelte** — aplică backoff furnizorilor atunci când se ating limitele privind numărul de unelte.
- **Fallback de urgență** — controlat de `OMNIROUTE_EMERGENCY_FALLBACK`; operatorii îl pot suprascrie din pagina Feature Flags fără repornire.

---

## Depanare

- Combo-ul weighted răspunde cu `503 all_targets_cooling_down` (`Retry-After` setat, `diagnostics.excluded` listează fiecare țintă cu `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool-ul este configurat și conectat, fiecare țintă este doar exclusă de un temporizator de reziliență; avertismentul `[COMBO] Weighted selection: every target excluded before dispatch — …` menționează motivele și secundele rămase. Un `404 no_executable_targets` de la același combo înseamnă că niciun temporizator de reziliență nu a fost implicat (nimic de rulat sau fiecare cont a eșuat la proba de disponibilitate). Construit în `open-sse/services/combo/pinRecovery.ts` din excluziunile colectate în `targetResolution.ts`.
- Toate cheile unui furnizor sunt ignorate → verificați atât starea circuit breaker-ului, CÂT și `rateLimitedUntil`/`testStatus` al fiecărei conexiuni.
- Furnizor exclus permanent după fereastra de resetare → cod care citește direct câmpul `state` în loc de `getStatus()`/`canExecute()`.
- O cheie eșuează, celelalte ar trebui să funcționeze → preferați cooldown-ul de conexiune în locul circuit breaker-ului.
- Doar un model eșuează → preferați blocarea modelului (model lockout) în locul cooldown-ului de conexiune.
- Starea ar trebui să se auto-recupereze, dar nu o face → verificați existența unui timestamp din viitor + o cale de citire care reîmprospătează starea expirată. Statusurile permanente necesită intervenții manuale.

---

## Starea la runtime — referință rapidă pentru agenți

> Mutat verbatim din `AGENTS.md` → „Resilience Runtime State" (PR #12743), astfel încât ghidul
> pentru agenți să rămână sub bugetul de context de 40k. Este varianta condensată, destinată agenților, a
> secțiunilor de mai sus; secțiunile numerotate rămân referința completă.

OmniRoute are trei mecanisme de eșec temporar înrudite, dar distincte. Păstrați-le
sferele de aplicare separate atunci când depanați comportamentul de rutare. Consultați
[diagrama de reziliență pe 3 niveluri](../diagrams/exported/resilience-3layers.svg)
(sursă: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
pentru o privire de ansamblu.

### Circuit breaker la nivel de furnizor

**Sferă**: întregul furnizor, de ex. `glm`, `openai`, `anthropic`.

**Scop**: oprirea trimiterii de trafic către un furnizor care eșuează în mod repetat la
nivel upstream/de serviciu, astfel încât un furnizor nesănătos să nu încetinească fiecare cerere.

**Implementare**:

- Clasa de bază: `src/shared/utils/circuitBreaker.ts`
- Integrarea porții (gate) și a execuției chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de stare la runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper-e partajate: `open-sse/services/accountFallback.ts`
- Tabelul de stare persistat: `domain_circuit_breakers`

**Stări** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: traficul normal este permis.
- `DEGRADED`: bandă de avertizare timpurie — eșecurile au depășit pragul de degradare, dar încă nu și
  pragul breaker-ului; traficul continuă să curgă, dashboard-urile afișează avertismentul. Un test de conexiune
  valid sau o fereastră liniștită, fără eșecuri noi, îl readuce la `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` conține fereastra).
- `OPEN`: furnizorul este blocat temporar; apelanții primesc un răspuns provider-circuit-open
  sau rutarea combo sare la altă țintă.
- `HALF_OPEN`: timeout-ul de resetare a expirat; se permite o cerere de probă. Succesul închide
  breaker-ul, eșecul îl deschide din nou.

**Valori implicite** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumate prin
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` în `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` în `src/sse/handlers/chatHelpers.ts`). Breaker-ul la nivel de
întreg furnizor funcționează pe baza `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | se degradează la | se deschide la (`circuitBreakerThreshold`) | resetare (`circuitBreakerReset`) |
| ------- | ---------------: | -----------------------------------------: | -------------------------------: |
| OAuth   |              `5` |                                        `8` |                            `60s` |
| API key |              `7` |                                       `12` |                            `30s` |
| Local   |        (derivat) |                                        `2` |                            `15s` |

`PROVIDER_PROFILES` definește, de asemenea, `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) și `providerCooldownMs` (5/10/1 min): acestea alimentează
**poarta de fereastră a mecanismului global opțional Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`, dezactivat
implicit) — o intrare la nivel de furnizor în `open-sse/services/providerCooldownTracker.ts` contează drept
„în cooldown" abia după `providerFailureThreshold` eșecuri în interiorul `providerFailureWindowMs`, iar apoi
rămâne în cooldown timp de `providerCooldownMs`. Acestea NU sunt pragurile breaker-ului activ — nu le ajustați
așteptându-vă la un comportament de breaker. Fiecare valoare implicită poate fi suprascrisă prin
variabilele de mediu `OMNIROUTE_PROVIDER_BREAKER_*` și `OMNIROUTE_CIRCUIT_BREAKER_*`;
tabelul de referință exact pentru runtime se află în `docs/architecture/RESILIENCE_GUIDE.md`.

Doar statusurile de eșec la nivel de furnizor ar trebui să declanșeze breaker-ul de furnizor:

```ts
(408, 500, 502, 503, 504);
```

Nu declanșați breaker-ul la nivel de întreg furnizor pentru erori normale de cont/cheie/model, precum majoritatea
cazurilor `401`, `403` sau `429`. Acestea țin de obicei de cooldown-ul de conexiune sau de blocarea
modelului (model lockout). Un `403` generic de la un furnizor cu cheie API ar trebui să fie recuperabil, cu excepția
cazului în care este clasificat drept eroare terminală de furnizor/cont.

Breaker-ul folosește recuperare leneșă (lazy), nu un temporizator în fundal. Când starea `OPEN` expiră, citiri precum
`getStatus()`, `canExecute()` și `getRetryAfterMs()` reîmprospătează starea la
`HALF_OPEN`, astfel încât panourile de bord și constructorii de candidați combo nu continuă să excludă la nesfârșit un furnizor expirat.

### Răcirea conexiunii

**Domeniu**: o conexiune/un cont/o cheie a furnizorului.

**Scop**: să sară temporar peste o cheie/un cont problematic, permițând în același timp celorlalte conexiuni ale aceluiași furnizor să continue să deservească cereri.

**Implementare**:

- Calea de scriere/actualizare: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectarea/filtrarea conturilor: `src/sse/services/auth.ts::getProviderCredentials...`
- Calculul perioadei de răcire: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Setări: `src/lib/resilience/settings.ts`

Câmpuri importante pe conexiunile furnizorului:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

În timpul selectării contului, o conexiune este sărită atâta timp cât:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Perioadele de răcire sunt, de asemenea, leneșe: când `rateLimitedUntil` este în trecut, conexiunea devine din nou eligibilă. La o utilizare reușită, `clearAccountError()` șterge `testStatus`,
`rateLimitedUntil`, câmpurile de eroare și `backoffLevel`.

Comportamentul implicit al răcirii conexiunii:

- Răcire de bază OAuth: `5s`.
- Răcire de bază pentru chei API: `3s`.
- Pentru `429` la chei API ar trebui preferate indicațiile de reîncercare de la upstream (`Retry-After`, headere de resetare sau
  text de resetare interpretabil), atunci când sunt disponibile.
- Eșecurile recuperabile repetate folosesc backoff exponențial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Protecția anti-thundering-herd împiedică eșecurile concurente pe aceeași conexiune să prelungească în mod repetat perioada de răcire sau să incrementeze de două ori `backoffLevel`.

Stările terminale nu sunt perioade de răcire. `banned`, `expired` (care devine terminală abia după N reîncercări limitate prin `EXPIRED_RETRY_MAX`) și `credits_exhausted` sunt menite să rămână indisponibile până când acreditările/setările se schimbă sau un operator le resetează. Nu suprascrieți stările terminale cu o stare de răcire tranzitorie.

### Blocarea modelului

**Domeniu**: furnizor + conexiune + model.

**Scop**: evitarea dezactivării întregii conexiuni atunci când doar un model este indisponibil sau limitat de cotă pentru acea conexiune.

Exemple:

- Furnizori cu cote per model care returnează `429`.
- Furnizori locali care returnează `404` pentru un model lipsă.
- Eșecuri de permisiune specifice furnizorului pentru moduri/modele, cum ar fi anumite moduri Grok.

Blocarea modelului se află în `open-sse/services/accountFallback.ts` și permite aceleiași conexiuni să continue să deservească alte modele.

### Ghid de depanare

- Dacă toate cheile unui furnizor sunt sărite, inspectați atât starea breaker-ului furnizorului, cât și `rateLimitedUntil`/`testStatus` ale fiecărei conexiuni.
- Dacă un furnizor pare exclus permanent după fereastra de resetare, verificați dacă codul citește direct `state` în loc să folosească `getStatus()`/`canExecute()`.
- Dacă o cheie de furnizor eșuează, dar altele ar trebui să funcționeze, preferați răcirea conexiunii în locul breaker-ului de furnizor.
- Dacă eșuează doar un singur model, preferați blocarea modelului în locul răcirii conexiunii.
- Dacă o stare ar trebui să se auto-recupereze, aceasta trebuie să aibă un timestamp viitor/un timeout de resetare și o cale de citire care reîmprospătează starea expirată. Stările permanente necesită modificări manuale ale acreditărilor sau ale configurării.

---

## TLS Fingerprinting și Stealth

Stealth-ul specific fiecărui provider (JA3/JA4, CCH, obfuscation) este documentat separat — vezi `docs/security/STEALTH_GUIDE.md` (git; nu este compilat în `/docs`).

---

## Testarea rezilienței (Faza 8 · Blocul C)

Dincolo de testele unitare pentru logica de reziliență, trei teste exercită runtime-ul în
condiții reale de stres/eșec (toate integration/nightly — niciunul nu blochează PR-urile):

| Test        | Ce face                                                                                                                                                                                   | Rulare                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Nodul fake-upstream injectează latență/reset/timeout/503 reale; validează că circuit breaker-ul se deschide/recuperează și că `checkFallbackError` clasifică 503 ca fallback recuperabil. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 de stream-uri per `createSSEStream` sub `--expose-gc`; eșuează dacă heap-ul crește peste plafon (protecție OOM #3069).                                                               | `npm run test:heap`                      |
| k6 soak     | Sarcină susținută împotriva `/api/monitoring/health`; praguri p95/erori.                                                                                                                  | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestrate de `.github/workflows/nightly-resilience.yml` (cron + dispatch). În
`test:integration` implicit, chaos și heap se auto-omite (fără `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vezi și

- [Ghid de arhitectură](./ARCHITECTURE.md) — Arhitectura sistemului și interne
- [Ghid de utilizare](../guides/USER_GUIDE.md) — Provayderi, combo-uri, integrare CLI
- [Motorul Auto-Combo](../routing/AUTO-COMBO.md) — Scorare cu 16 factori, mode packs
