# Resilience Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute má tři odlišné, ale související mechanismy odolnosti. Každá má jiný rozsah a účel. Při ladění směrovacího chování je uchovávejte odděleně.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Přepíná přednost Env-vs-dashboard pro odolnost.** Volitelná odolnost přepíná nasazená z prostředí — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — poskytuje pouze _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean přetrvával v `resilienceSettings` (Dashboard →** Nastavení → Resilience** / `PATCH /api/resilience`, uložený v `key_value`) vítězí nad hodnotou env: normalizace (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) udržuje uloženou booleovskou hodnotu, kdykoli existuje. Nastavení takové env var na `true` v nasazení, kde je řídicí panel již uložen `false` proto nic nemění — přepněte přepínač** Nastavení → Resilience** (nebo vymažte uložené pole).

## 1. Circuit breaker poskytovatele

**Rozsah:** celý poskytovatel (např. `glm`, `openai`, `anthropic`).

**Účel:** přestat posílat provoz poskytovateli, který opakovaně selhává na úrovni upstreamu/služby.

**Implementace:**

- Základní třída: `src/shared/utils/circuitBreaker.ts`
- Zapojení: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu: `GET /api/monitoring/health`
- API pro reset: `POST /api/resilience/reset`
- Obalové vrstvy: `open-sse/services/accountFallback.ts`
- Databázová tabulka: `domain_circuit_breakers`

**Stavy:**

- `CLOSED` — normální provoz je povolen
- `DEGRADED` — provoz je stále povolen, ale zvýšená míra selhání poskytovatele je sledována; vrací se do stavu `CLOSED` po dostatečném počtu úspěchů, po úspěšném testu připojení, nebo po uplynutí nejdelší doby podržení stavu `OPEN` pro poslední druh selhání (jeho hodnota `cooldownByKind`, jinak `resetTimeout`, × `maxBackoffMultiplier`, minimálně jeden cooldown) bez nového selhání
- `OPEN` — poskytovatel je dočasně blokován; combo směrování jej přeskakuje
- `HALF_OPEN` — časový limit resetu uplynul; zkušební požadavek je povolen

**Konfigurovatelné výchozí hodnoty (`open-sse/config/constants.ts`, zpřístupněné v Dashboard → Settings → Resilience):**

| Třída   | Degradace při | Otevření při | Časový limit resetu |
| ------- | ------------- | ------------ | ------------------- |
| OAuth   | 5 selháních   | 8 selháních  | 60 s                |
| API-key | 7 selháních   | 12 selháních | 30 s                |
| Local   | odvozeno      | 2 selháních  | 15 s                |

`degradationThreshold` řídí, kdy poskytovatel vstoupí do stavu `DEGRADED`; `failureThreshold` řídí, kdy se otevře a je přeskočen. Profily lokálních poskytovatelů zatím nejsou na stránce nastavení Resilience zpřístupněny.

**Aktivační kódy:** pouze stavové kódy na úrovni poskytovatele `[408, 500, 502, 503, 504]`. NEAKTIVOVAT při chybách na úrovni účtu (většina 401/403/429 — ty spadají pod cooldown nebo lockout).

**Líné obnovení:** když vyprší `OPEN`, metody `getStatus()`, `canExecute()`, `getRetryAfterMs()` obnoví stav na `HALF_OPEN`. Tytéž operace čtení (a případné další selhání) převedou zastaralý stav `DEGRADED` zpět na `CLOSED`. Není potřeba žádný časovač na pozadí.

---

### Volitelný globální cooldown poskytovatele (okenní brána)

Čtvrtá, **volitelná** vrstva (`PROVIDER_COOLDOWN_ENABLED`, výchozí **vypnuto**) uchovává
paměť selhávajících poskytovatelů napříč požadavky v
`open-sse/services/providerCooldownTracker.ts`. Využívá ji rozlišování cílů
combo směrování, takže po sobě jdoucí combo požadavky přestanou opakovaně zkoušet
poskytovatele, který právě selhal. Záznamy na úrovni poskytovatele respektují
okenní bránu `PROVIDER_PROFILES`:

| Profil  | aktivace po (`providerFailureThreshold`) | během (`providerFailureWindowMs`) | chladnutí po (`providerCooldownMs`) |
| ------- | ---------------------------------------: | --------------------------------: | ----------------------------------: |
| OAuth   |                                     `10` |                           `15min` |                              `5min` |
| API key |                                     `15` |                           `30min` |                             `10min` |

Pod prahem poskytovatel **není** považován za chladnoucího; úspěch okno vymaže.
Záznamy na úrovni připojení (`provider:connectionId`) si místo toho uchovávají
exponenciální backoff `minRetryCooldownMs → maxRetryCooldownMs`. Přepsání:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresní test: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ochlazování připojení

**Rozsah:** jediný poskytovatel connection/account/key.

**Účel:** přeskočte jeden špatný klíč, zatímco ostatní připojení pro stejného poskytovatele budou nadále sloužit.

**Implementace:**

- Označit jako nedostupné: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výběr: `getProviderCredentials*` ve stejném souboru
- Cooldown calc: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavení: `src/lib/resilience/settings.ts`

**Pole na připojení:**

- `rateLimitedUntil` — časové razítko, dokud nevyprší cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponenciální počítadlo backoff

**Výchozí cooldowny:**

- základna OAuth : 5s
- Základní API klíč: 3s
- API-key 429: preferuje upstream `Retry-After`/reset headers/parseable reset text
- Ústup: `baseCooldownMs * 2 ** failureIndex`

**Zpoždění opakování podle poskytovatele.** Stránka s podrobnostmi o poskytovateli má a** Zpoždění opakování** vyberte (Auto, 15s až 1h). Ušetří `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, až `PATCH /api/resilience`). Když chyba rychlostního limitu nenese žádnou nápovědu pro opakování proti proudu, tato hodnota nahradí škálované stažení pro poskytovatele a resetuje `backoffLevel` na 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Priorita pro chybu s omezenou rychlostí, nejprve nejvyšší: nápověda k opakování upstreamu, poté `providerSpecificData.rotationOverrides.rateLimitResetSeconds` pro každé připojení, poté zpoždění opakování podle poskytovatele, poté env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` a poté škálované stažení. Auto odstraní pole. Ovlivňuje pouze důvod omezení rychlosti, nikoli koncové stavy.

**Strážce stáda proti hromu:** zabraňuje souběžným poruchám z příliš dlouhého ochlazení nebo dvojnásobného zvýšení `backoffLevel`.

**Souběžné limity 429 nešplhají po žebříčku backoff.** `429`, jehož tělo hlásí limit souběžnosti ("příliš mnoho souběžných požadavků", "limit souběžnosti", "limit paralelních požadavků", GLM `并发数过高`), znamená, že účet je v pořádku, ale zaneprázdněn. `checkFallbackError()` vrací důvod `concurrency_limited`: přepněte nyní na další připojení, ochlaďte toto na pevné `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) nebo nápovědu pro opakování proti proudu, ponechte `backoffLevel` nezměněné a nastavte `skipProviderBreaker`. Explicitní tělo kvóty stále vítězí, takže tělo, které také odpovídá vzoru kvóty, zůstává verdiktem kvóty. Detekce: `looksLikeConcurrencyLimit()` v `src/shared/utils/classify429.ts`; verdikt: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` jističe) se nemění a pro tato těla stále čte `rate_limit`.

**Zastavení streamovaného obsahu účet neochlazuje.** Když se hlídací pes zablokování obsahu (`open-sse/utils/streamHandler.ts`) vzdá streamu, který včas neodeslal žádný modelový výstup, `markAccountUnavailable()` zaznamená chybu na připojení, ale nenastaví žádné cooldown: zablokování patří k tomuto požadavku, nejčastěji jde o dlouhé uvažování, zatím bez výstupu. Operátoři se mohou znovu přihlásit pomocí `resilienceSettings.streamStallCooldown.enabled` (výchozí `false`).

**Signál latence přihlášení pro výběr účtu `p2c`.** Každý odeslaný pokus zaznamená svůj čas do prvního bajtu a výsledek na připojení (a na model + připojení) v průběžném okně v paměti: posledních 20 vzorků do 15 minut (`open-sse/services/connectionLatencyTracker.ts`, zaznamenané z `safeLogEvents()` v `src/sse/handlers/chatHelpers.ts`). Když je `resilienceSettings.p2cLatency.weight` nad `0` (rozsah 0-20, výchozí `0` = vypnuto), `compareP2CConnections()` v `src/sse/services/auth.ts` přidá až `weight` bodů ke každému kandidátovi z dvojice. Polovina z toho pochází z latence jako poměr k rychlejšímu kandidátovi (dvakrát pomalejší trvá celou polovinu) a polovina z průběžné chybovosti. Termín platí pouze v případě, že oba kandidáti mají alespoň 3 vzorky, takže nové účty nejsou penalizovány a jeho strop zůstává pod sankcemi za blokování a vyčerpání kvót. Nepřidává žádný vlastní okruh: neúspěšné účty jsou stále řešeny vrstvami cooldown, lockout a breaker. Nastavte jej pomocí `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Rámce uvažování restartují rozpočet na zastavení obsahu.** Model uvažování může myslet celé minuty před svým prvním viditelným tokenem: Claude streamuje snímky `thinking_delta`, jejichž text může být prázdný, a API Responses streamuje jednu položku uvažování za druhou. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) rozpozná tyto snímky a hlídací pes na každém z nich znovu spustí rozpočet, místo aby tah zrušil. Stále nejsou výstupem modelu, takže tah, který končí pouze uvažováním, je stále hlášen jako prázdný, a tah, který zastaví uvažování a vysílá pouze tlukot srdce, stále vypne hlídacího psa.

Binární rámce `reasoningContentEvent` Kiro s neprázdným podpisem zachovávají tuto uvažovací aktivitu prostřednictvím exekutoru jako prázdnou deltu `reasoning_content`. Podpis se nepředává. Metadata, neúplné snímky a prázdné podpisy nerestartují rozpočet obsahu; stále platí časový limit nezávislého aktivního streamu a zrušení klienta (`open-sse/executors/kiro/reasoning.ts`).

**Stavy terminálu (NOT cooldowny):**

- `banned` — nastaveno detekcí zakázaného klíčového slova / zákazu účtu (viz [BAN_DETECTION](../security/BAN_DETECTION.md) ) a třemi po sobě jdoucími upstream odmítnutími na žádost (`request_rejected`, např. Anthropic OAuth 403 "Požadavek není povolen" — `open-sse/services/requestRejectedStreak.ts`); jediné odmítnutí spojení pouze ochladí
- `expired` (přechody na terminál po omezených opakováních — `EXPIRED_RETRY_MAX = 3` s exponenciálním stažením — takže přechodné chyby OAuth se mohou samy vyléčit, než bude účet trvale deaktivován)
- `credits_exhausted`

Ty přetrvávají, dokud se nezmění pověření nebo je operátor neobnoví. Nepřepisujte stavy svorek přechodným stavem ochlazení.

**Líné zotavení:** když `rateLimitedUntil` skončí, připojení se znovu stane způsobilým. Při úspěšném použití `clearAccountError()` vymaže všechna chybová pole.

### Claude OAuth use wall: + relace limitu s nižší prioritou reset

**Rozsah:** jedno připojení předplatného Claude (OAuth). Obě funkce jsou** přihlášení za připojení** (Upravit sekci připojení → Claude → `lowPriorityMode` / `autoLimitReset` v `providerSpecificData`, oba jsou standardně vypnuty) a zrcadlit příkazy `/low-priority` a `/limit-reset` kódu Claude (smlouva po drátě zachycená z kódu Claude 2.1.263).

**Implementace:**

- Klasifikace odezvy stavového stroje + : `open-sse/services/claudeLowPriority.ts`
- Resetovat klienta status/claim : `open-sse/services/claudeLimitReset.ts`
- Hák exekutora (vložení záhlaví + opakování stejného účtu): `open-sse/executors/base.ts::execute()`
- Trvalost přihlášení: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spoušť:** 5hodinová uživatelská zeď — a `429` jejíž záhlaví nesou `anthropic-ratelimit-unified-status: rejected`, a pokud je účet způsobilý, `anthropic-ratelimit-unified-slow-offer: treatment`. Před první stěnou 429 není nic odesláno; shluk 429 bez sjednocených hlaviček prochází normální cestou ochlazování.

**Pruh s nižší prioritou** (`lowPriorityMode`):

- Na zdi 429 exekutor nabídku přijme a okamžitě to zopakuje** stejný** účet se `anthropic-usage-limit: slow`; pruh zůstane aktivní, dokud nebude oznámeno `anthropic-ratelimit-unified-reset` (+ 60s milost) a každý požadavek v tomto okně nese záhlaví. Zachycená 429 nikdy nedosáhne `handleChatCore`, takže spojení je** ne** uvést do cooldownu a neotáčet se.
- `anthropic-ratelimit-unified-slow-status` on later responses: `active` / `not_needed` keep the lane; `slot_busy` (429) or a `529` wait the server's `anthropic-ratelimit-unified-slow-retry-after` (default 20s, clamp 5–600s, ±30% jitter) and retry, bounded by `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 h) — past that the lane ends and a 10-minute cool-off blocks re-acceptance. The wait is additionally capped by what is left of the request's own upstream-start timeout (`resolveFetchStartTimeout`, 10 min by default) minus a 5 s margin: without that cap the 20-minute default max-wait would outlive the request and the sleep would be aborted mid-wait, surfacing a `TimeoutError` instead of the graceful `max_wait` end + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, převrácení okna o 5h nebo `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (které to ukončí jako `extra_usage` v jakémkoli stavu, protože zaplacený přebytek nyní pokrývá zeď) ukončí jízdní pruh; odezva pak proudí do normální dráhy ochlazování. `budget_exhausted` je zapamatováno až do ohlášeného resetování rozpočtu (≤ 8 dní).
- Kontrola zdi probíhá po 400 vlastních pokusech provedených vykonavatelem (úpravy kontextu, svorky thinking/effort, automatické učení parametrů), takže zeď 429, která se vynoří pouze na jeden z těchto pokusů, je stále zachycena místo toho, aby dosáhla chladící cesty.
- Stav je v paměti na připojení (restart stojí jednu zeď navíc 429 za opětovné přijetí).

**Resetování limitu relace** (`autoLimitReset`, vyzkoušeno před jízdním pruhem, když jsou oba zapnuté):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blok; když `arm: "reset"` a `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s `{ "program": "juniper_tide" }` (organizace UUID z `providerSpecificData.organizationUUID`, bootstrap záložní).
- `result: reset|not_limited` → požadavek je opakován plnou rychlostí (žádná pomalá hlavička). `already_used` / `not_offered` memoise `next_available_at` (výchozí jeden týden); jakékoli selhání ustoupí 15 minut. Reset se provádí jednou týdně a stále se započítává do týdenního limitu.

Regresní stráže: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Zájem relace (#7274)

**Rozsah:** jedna klientská relace (záhlaví `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) připojená k jednomu připojení, pro** žádný** poskytovatel.

**Účel:** ponechat víceotáčkového agenta (kód Claude, pomocníka, vlastní agenty) na stejném účtu napříč požadavky, což snižuje ztráty kontextu mezi účty a opakované 429-spuštění studeného startu u poskytovatelů se stavem relace na účet.

**Implementace:**

- rozlišení TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrakce záhlaví (obecné, jakýkoli poskytovatel): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Přetrvávající pin tabulka: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavení: `sessionAffinityTtlMs` (globální TTL v ms, `0` deaktivuje) — `src/lib/db/settings.ts`. Přejmenováno z Codex-only `codexSessionAffinityTtlMs` migrací `124_generic_session_affinity_ttl.sql`, která přenáší jakékoli dříve nakonfigurované Codex TTL jako nové výchozí nastavení.

Před #7274 se `resolveSessionAffinityTtlMs()` tvrdě zachraňoval na `0` pro každého poskytovatele kromě `codex`, takže nastavení TTL (a hlavičky relací) nemělo žádný účinek nikde jinde, i když mechanismus připínání a extrakce hlaviček již byly agnostické pro poskytovatele. Oprava odstranila předčasný návrat; TTL se nyní vztahuje jednotně na každého poskytovatele, který byl globálně nastaven nad `0`.

Tyto tři hlavičky s afinitou k relaci nejsou nikdy předávány upstream — exekutorům, kteří vytvářejí své vlastní upstream hlavičky od nuly, místo aby procházeli klientskými hlavičkami, takže toto zůstává pouze interním korelačním id.

### Exkluzivní zapůjčení připojení ke spravované relaci

**Rozsah:** jeden aktivní spravovaný HTTP client/session vlastní jedno způsobilé připojení OmniRoute.

**Účel:** poskytovat trvalé výhradní vlastnictví připojení pro klienty, kteří potřebují pevný směrovací plot napříč požadavky. To se liší od afinity relace, což je mírná preference kontinuity: exkluzivní pronájem přetrvává ve stavu životního cyklu v SQLite, vynucuje si globální jedinečnost aktivního vlastníka a aktivního připojení a odmítá zastaralé generování před odesláním poskytovatele.

Tato funkce je volitelná pomocí klíče API. Spravovaný klíč musí mít rozsah `lease:exclusive` a explicitní neprázdný seznam `allowedConnections`. Jakýkoli klient HTTP může používat koncový bod životního cyklu; není vyžadován žádný název klienta, uživatelský agent, poskytovatel, metoda OAuth ani model. Pronájem vlastní připojení, nikoli model, takže změna modelu zachovává vazbu, zatímco připojení zůstává běžně způsobilé. Pravidla normálního modelu, kvóty, zdraví, cooldownu a seznamu povolených zůstávají směrodatná a mohou převést stejnou generaci na jiné bezplatné způsobilé připojení.

Životní cyklus je `POST /api/v1/session-leases` s akcemi JSON `acquire`, `renew` a `release`. Spravované požadavky na odvození představují neprůhlednou hodnotu `X-OmniRoute-Lease-Owner` a přesnou `X-OmniRoute-Lease-Generation`. Vlastník používá `vlo_` následované 43 znaky base64url; je uložen pouze její hash SHA-256. Každý konečný expediční plot také váže ověřený klíč API ID a aktivní připojení ID. Záhlaví řízení zapůjčení jsou odstraněna z protokolů, uložených snímků požadavků a hlaviček prováděcího programu.

Pokud má běžné směrování způsobilé spravované kandidáty, ale každý volný kandidát je obsazený zahraničním aktivním pronájmem, OmniRoute vrátí HTTP `429`, kód pro pronájem-kapacita-nedostupný, stav čekání na kapacitu a ohraničený `Retry-After` odvozený od nejbližšího relevantního vypršení platnosti. Obyčejná prázdná způsobilost není sporem o pronájmu a zachovává si svou stávající sémantiku chyby směrování.

Související mechanismy zůstávají samostatné:

- Obsazenost relace OAuth je procesně lokální soft distribuce pro účty OAuth.
- Semafory účtů udělují povolení souběžnosti požadavků a končí, když je požadavek dokončen.
- Exkluzivní řízené relace pronájmu jsou trvalé vlastnictví životního cyklu s generačním plotem.

---

## 3. Blokování modelu (Model Lockout)

**Rozsah:** trojice provider + connection + model.

**Rozsah klíče podle stavu:** stav chyby rozhoduje, ke kterému klíči se blokování zapíše
(`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signál kvóty nebo oprávnění — zablokuje se **rodina kvót**:
  pro codex celý rozsah `codex` / `spark` (každý model `gpt-5*` daného
  připojení), pro ostatní providery `getQuotaScopedModelForProvider()`.
- `404` zablokuje pouhý model (`getModelLockKey()` zúží `not_found`).
- Jakýkoli jiný stav — transportní/serverové chyby `5xx` a vlastní syntetizovaný
  `502` z validace kvality v OmniRoute — zablokuje pouze **přesnou**
  trojici provider/connection/model. Vadný stream na jednom modelu není důkazem
  o kvótě účtu; před tímto pravidlem jediná prázdná odpověď na
  `codex/gpt-5.6-luna` vyřadila z routingu všechny modely `gpt-5*` daného připojení
  na 2–30 min (eskalující), zatímco jejich kvóta zůstala nedotčena.
- Explicitní volba `scope` volajícího má vždy přednost (Antigravity předává `"exact"`).

**Účel:** zabránit deaktivaci celého připojení, když je nedostupný nebo kvótově omezený jen jeden model.

**Příklady:**

- Provideri s kvótami na model vracející 429
- Lokální provideri vracející 404 pro jeden chybějící model
- Chyby oprávnění režimu/modelu specifické pro providera (např. režimy Grok)

**Implementace:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Přehled Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Vypisuje aktivní blokování s údaji: provider, connection, model, reason, expiresAt. Operátoři mohou model z karty ručně znovu povolit.

**REST API:**

- `GET /api/resilience/model-cooldowns` — seznam aktivních blokování
- `DELETE /api/resilience/model-cooldowns` — ruční opětovné povolení. Tělo: `{provider, connection, model}`. Autentizace: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stránka pro každé připojení, které je vyřazeno z routingu z přechodného důvodu,
místo otevírání stránek jednotlivých providerů. Vypisuje cooldowny připojení, blokování modelů
a terminální stavy, umožňuje je vymazat pro jednotlivé připojení, pro výběr nebo pro všechna
připojení providera, a upravuje nejčastěji laděná pravidla cooldownu: `streamStallCooldown.enabled`
a základní cooldown `connectionCooldown` pro OAuth / API klíč a maximální počet kroků backoffu
(ukládá se přes `PATCH /api/resilience`). Terminální stavy (`banned`, `expired`,
`credits_exhausted`) jsou vypsány, ale zde se nikdy nemazou.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentizace: management):

- `GET /api/resilience/cooldowns[?provider=]` — připojení se stavem, zbývajícím cooldownem,
  úrovní backoffu, typem poslední chyby a blokováními modelů (bez přihlašovacích údajů)
- `POST /api/resilience/cooldowns` — tělo `{connectionIds: string[]}` nebo
  `{all: true, provider?}`; vrací `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI nastavení blokování + obnova pomocí success-decay (v3.8.23)

Blokování modelu přešlo z vždy zapnutého natvrdo zakódovaného chování na plně
konfigurovatelnou, opt-in funkci s vlastní kartou nastavení a samoléčebnou cestou obnovy.

**Karta nastavení:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tato karta je **odlišná** od výše uvedené karty `ModelCooldownsCard` určené pouze pro čtení
(která aktivní blokování jen _vypisuje_) — nová karta _konfiguruje parametry_. Výchozí hodnoty
jsou v `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavení               | Výchozí                          | Význam                                                               |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Hlavní přepínač — blokování modelu je **ve výchozím stavu vypnuté**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stavy upstreamu, které se počítají jako selhání v rozsahu modelu.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Počáteční délka blokování při prvním selhání.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Strop eskalovaného cooldownu.                                        |
| `maxBackoffSteps`       | `10`                             | Maximální počet kroků eskalace exponenciálního backoffu.             |
| `useExponentialBackoff` | `true`                           | Zda opakovaná selhání eskalují cooldown exponenciálně.               |

Nastavení se uchovávají prostřednictvím běžného úložiště nastavení a validují se
schématem nastavení resilience; karta omezuje `baseCooldownMs`/`maxCooldownMs`
(s `maxCooldownMs ≥ baseCooldownMs`) a `maxBackoffSteps`.

**Obnova pomocí success-decay:** obnova **není** čistě o vypršení časovače. Zdravá
odpověď snižuje počet selhání modelu zpět, takže model, který se zotavil uprostřed
okna, přestane eskalovat (a zruší blokování) dříve, než by vypršel jeho časovač. Při
úspěšném cíli combo volá `open-sse/services/combo.ts` funkci `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), která **způlí** uložený
`failureCount` (`Math.floor(failureCount / 2)`); když dosáhne `0`, záznam blokování
se zcela smaže. Protějšek `recordModelLockoutFailure()`
zvýší počet (a eskaluje cooldown) při selháních v rámci
eskalacečního okna. Tento success-decay je doplněk k prostému vypršení časovače —
k opětovnému povolení modelu může vést obě cesty.

**Stav:** blokování jsou držena **v paměti** (per-proces `Map`y
`ModelLockoutEntry` klíčované podle `provider:connectionId:model`, zámky s přesným rozsahem podle
`provider:connectionId:exact:model`), neukládají se do
DB — při restartu se ztratí. _Nastavení_ se ukládají trvale; aktivní
_stav_ blokování je efemérní.

---

## 4. Řízení souběžnosti quota-share (v3.8.36)

Účty s předplatným (GLM, MiniMax atd.) často přijímají pouze ~1–3 souběžné
požadavky; při jejich překročení dochází k chybám 429 a cooldownům. Tento problém
je obzvlášť naléhavý u kombinací **quota-share** (`qtSd/…`), kde několik klíčů API
sdílí jeden upstreamový účet. Tři vrstvy zabraňují zahlcení sdíleného účtu.

### Limit souběžnosti na připojení (`max_concurrent`)

Každé připojení poskytovatele může deklarovat limit `max_concurrent`
(`provider_connections.max_concurrent`, nastavuje se v modálním okně připojení /
API / DB). Ponechte jej prázdný, pokud nechcete žádný limit. Toto je jediný
ovladač, který řídí níže popsanou serializační vrstvu — nastavte jej na skutečnou
souběžnost účtu (např. GLM ~1, MiniMax ~2).

### Limity souběžnosti podle modelu (`modelConcurrency`)

Připojení může navíc deklarovat přesné limity souběžnosti pro jednotlivé modely
uvnitř své mapy `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nastavte je v modálním okně připojení (**Přepsání rate limitů → Limity
souběžnosti podle modelu**, jeden `model=cap` na řádek) nebo pomocí
`PATCH /api/providers/[id]` se stejnou strukturou JSON. Sémantika klíčů:

- **Celé připojení vs. konkrétní model:** `maxConcurrent` zůstává sdíleným
  limitem celého připojení. Pokud platí obojí, obě brány se získají atomicky
  v rámci stejné složené brány (`global → provider → account → model`);
  výsledné chování odpovídá přísnějšímu z platných limitů.
- **Přesná shoda klíče modelu:** klíčem je řetězec modelu předaný exekutoru po
  vyhodnocení směrování — obvykle holé upstreamové ID modelu (`glm-5`), nikoli
  klientský alias `provider/model` (`zai/glm-5` neodpovídá `glm-5`). Hodnoty
  představují limity souběžných požadavků v podobě kladných celých čísel.
- **Místní fronta, žádné zjišťování:** přebytečné požadavky čekají v místní
  frontě se stávající sémantikou fronty/timeoutu (typované chyby přijetí
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nezjišťuje ani
  neodvozuje upstreamové zásady — vynucuje přesné limity, které operátor
  nakonfiguroval. Nasycená brána modelu nikdy nezakáže poskytovatele a nikdy
  nevytvoří trvalé zablokování modelu; upstreamové chování 429/cooldown/fallback
  zůstává chybovou pojistkou.
- **Rozsah na připojení a proces:** limity platí pro každé připojení v databázi
  a jsou uchovávány v paměti, takže dvě připojení používající stejný upstreamový
  klíč API se vzájemně nekoordinují.
- **Nenastaveno znamená beze změny:** vynechání mapy (nebo ponechání pole
  v dashboardu prázdné) nepřidá žádnou bránu modelu. Příklad konfigurace bez
  uplatnění jakéhokoli univerzálního limitu poskytovatele:

```text
glm-5=1
glm-4.7=3
```

### Serializace požadavků quota-share

Když odeslání quota-share cílí na připojení, které deklaruje kladný
`max_concurrent`, souběžné požadavky na daný **účet** jsou serializovány přes
semafor na připojení (klíč `qsconn:<connectionId>`): přebytečné požadavky
**čekají ve frontě** místo zahlcování účtu. Semafor je **fail-open** — nasycená
fronta nebo timeout pokračuje bez slotu, místo aby kdykoli odmítl odeslatelný
požadavek. Přepíná se v **Nastavení → Odolnost → Souběžnost quota-share na
připojení** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ve výchozím
nastavení zapnuto). Bez limitu `max_concurrent` zůstává chování nezměněné.

> Směrovací brána quota-share (`selectQuotaShareTarget`, DRR + P2C) je sama
> o sobě fail-open a pouze _snižuje prioritu_ připojení, které je na limitu —
> s poolem s jediným připojením nemůže tvrdě omezit, takže právě tento semafor
> skutečně zadržuje záplavu.

### Opakování combo s ohledem na cooldown

U každé strategie combo (pokud je povolena) požadavek, který by vyústil ve 429
kvůli KRÁTKÉMU přechodnému cooldownu, vyčká jeho vypršení a znovu se odešle,
místo aby vrátil 429 — to pokrývá okna TPM/RPM třídy Gemini (~60s retry-after)
u vícemodelových combo, např. když oba cíle 2modelového komba narazí na rate
limit daného modelu. Omezeno parametry `comboCooldownWait` (`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`) v **Nastavení → Odolnost**. Nikdy nečeká
při `quota_exhausted` (zamčeno do půlnoci) nebo z důvodů auth/not-found.

Stejná brána pokrývá i případ před odesláním (#16319): když jsou všechny cíle
komba přeskočeny ještě před jakýmkoli pokusem, protože jejich model je v krátkém
přechodném zablokování, větev s nulovým počtem pokusů počká na vypršení zámku za
stejných limitů a znovu odešle, místo aby odpověděla `503 ALL_TARGETS_SKIPPED`
bez nápovědy. Když není čekání povoleno (vyčerpán limit, pokusy nebo rozpočet,
nebo je funkce vypnutá), koncová odpověď se povýší na `429 rate_limit_error`
nesoucí `retry_after` / `reset_at` z nejbližšího vypršení přechodného zámku;
zámky kvóty, auth a not-found si ponechávají 503 bez nápovědy.

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

## 5. Řízení přijímání do fronty požadavků (v3.8.49 · issue #6593)

**Rozsah**: lokální fronta omezení rychlosti pro kombinaci poskytovatel+připojení (`open-sse/services/rateLimitManager.ts`, postavená na Bottleneck), o jednu vrstvu níže než tři mechanismy popsané výše.

**`maxWaitMs` ohraničuje čekání ve frontě; `executionMaxWaitMs` ohraničuje vykonávání.**
Tyto dvě hodnoty jsou záměrně oddělené a žádná neslouží jako vstup pro druhou.

`resilienceSettings.requestQueue.maxWaitMs` je **rozpočet čekání ve frontě**: pokrývá čekání na slot poskytovatele a následné setrvání ve stavu QUEUED, a jeho časovač se zruší ve chvíli, kdy úloha opustí stav QUEUED a začne se vykonávat (`rateLimitManager.ts`, `wrappedFn`). Požadavek, který tento rozpočet překročí, se k upstreamu vůbec nedostane. Výchozí hodnota 30000ms, poskytovaná konstantou `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` v `src/lib/resilience/settings.ts` a ukotvená testem `tests/unit/ratelimit-admission-control-6593.test.ts`, takže její změna zbarví tento test červeně, místo aby tento odstavec tiše zůstal zastaralý.

`resilienceSettings.requestQueue.executionMaxWaitMs` je hodnota, kterou Bottleneck obdrží jako `expiration` úlohy a jejíž časovač se spustí až po odeslání k vykonání (dispatch). Slouží jako pojistka pro exekutory, které nemají vlastní upstreamový timeout, a pokud je vlastní fetch-start timeout exekutoru delší, je na něj navýšena, takže nemůže useknout zdravou, právě probíhající odpověď. Výchozí hodnota 600000ms (10 min).

Předávání rozpočtu fronty do `expiration` je to, co dříve zabíjelo neinkrementální brány uprostřed běhu — ty legitimně běží minuty, než dorazí první bajty — a proto se expiration zobrazuje jako `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), zatímco rozpočet fronty nese kód timeoutu fronty. Obojí lze přepsat přes `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) nebo v dashboardu (**Nastavení → Odolnost**). Obě hodnoty jsou při normalizaci oříznuty na rozsah 1ms–24h.

**Priorita, pro obě:** proměnná prostředí poskytuje pouze _výchozí hodnotu_. Hodnota uložená v `resilienceSettings.requestQueue` (dashboard / API patch, uložená v `key_value`) má přednost před ní a hodnota `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pro konkrétní připojení má přednost před touto. Nastavení proměnné prostředí na nasazení, které již má uloženou hodnotu, proto nic nezmění — místo toho uložené nastavení vymažte nebo aktualizujte.

Doba setrvání ve frontě je ohraničena pomocí `maxWaitMs`; `maxQueueDepth` níže ohraničuje, kolik volajících může být ve frontě současně.

**Opakování uvedená v těle odpovědi: tempování vs uzamčení.** Tělo odpovědi 429 může samo určit dobu čekání (Gemini `RetryInfo.retryDelay`, text "retry after Ns"), kterou čte `updateFromResponseBody`. Čekání, které se vejde do `maxWaitMs` daného připojení, je tempování (pacing): limiter na takovou dobu vyprázdní svou nádrž a zařazená volání se odešlou, až se znovu naplní. Čekání delší než `maxWaitMs` není něco, co by fronta dokázala vyčkat — Gemini na vyčerpanou denní kvótu odpovídá `retryDelay: "86399s"`. Předaná hlavička `Retry-After` na přestavěné odpovědi 429 (#16528) již způsobí, že fallback engine uzamkne model na toto okno, ale pozastavení limiteru by navíc stále zdrželo každé volání, které ke klíči dorazí předčasně (například po resetu nastavení odolnosti), po celou dobu `maxWaitMs`. Když takové čekání pochází z typovaného detailu Google `RetryInfo` (provenance `google_rpc_retry_info`) a limiter klíče je již vymezen na model (viz `getLimiterKey`), stává se z 429 místo toho uzamčení modelu na daném připojení (`lockModelForLongBodyRetry` v `open-sse/services/rateLimitManager/bodyRetryPause.ts`, omezené na 24h) a limiter zůstává nepozastavený. Výběr účtu přes toto uzamčení přeskakuje skrze `isModelLocked()` a stejně tak brána combo před odesláním u cílů připnutých k připojení. Na antigravity, jehož limiter je na rodinu kvót, je zámek na přesný model, stejně jako jeho ostatní kvótové zámky. Jméno, o které klient žádal, se uzamkne také, pokud ho alias přeložil na daný model, protože tyto kontroly používají požadované jméno; uzamkne se přesně (`lockExactModel`), takže alias, který překračuje rodinu kvót antigravity nebo rozsah codex, nikdy neuzamkne svůj vlastní. Pouhá textová nápověda, netypovaný `retryDelay` nebo limiter sdílený celým připojením ponechává pozastavení. Když se limiter, který cesta 429 právě přestavěla, skutečně pozastaví, volající, jehož zbývající čas ve frontě skončí dříve než pozastavení, je okamžitě odmítnut kódem timeoutu fronty (`checkLimiterPause`), místo aby tento čas vyčkal; zaznamenaný konec je ukotven před sestavením limiteru, tam, kde Bottleneck spouští své hodiny obnovy, a jakákoli pozdější změna nádrže na něj zapomene. Pokryto testy `tests/unit/rate-limit-long-body-retry-lockout.test.ts` a `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — volitelný strop přijímání (nové).** `resilienceSettings.requestQueue.maxQueueDepth` ohraničuje, kolik požadavků může současně čekat ve frontě (ještě neodeslaných k vykonání) pro jednu kombinaci poskytovatel+připojení. Když fronta již obsahuje `maxQueueDepth` požadavků, je nový požadavek rychle odmítnut typovanou chybou `code: "RATE_LIMIT_QUEUE_FULL"` **ještě předtím**, než se vůbec dostane k `limiter.schedule()` — odmítnutí je tedy levné a nastane před jakoukoli následnou prací na kompresi promptu / překladu pro daný požadavek. Výchozí hodnota `0` = vypnuto, což zachovává dosavadní chování neomezené fronty; rozsah 0–100000. Přepsání přes `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) nebo `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Samotná kontrola přijetí je čistá funkce
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), takže je jednotkově testovatelná bez skutečného Bottleneck limiteru.

> RFC, které otevřelo #6593, navrhovalo také příznak
> `bypassCompressionOnRateLimit`. Pipeline `open-sse/services/compression/`
> v tomto repozitáři představuje kompresi promptu/kontextu odchozího
> požadavku na LLM (`chatCore.ts`, kolem bloku
> `resolveCompressionSettings`/`selectCompressionStrategy`), nikoli HTTP
> kompresi odpovědí na syntetizovaných tělech 429 — pro doslovný příznak
> obejití neexistuje odpovídající cesta v kódu. Tento krok komprese promptu
> navíc aktuálně běží _před_ `withRateLimit()` v pipeline požadavku, takže
> přeskládání tak, aby se při odmítnutí kvůli plné frontě přeskočil, je
> samostatná, větší změna než rozsah tohoto issue; zde byla záměrně
> **neimplementována** a je ponechána jako následný krok, pokud zisk
> v podobě úspory CPU stojí za riziko přeskládání.

### Pojistka automatického zapnutí rate-limitu a ochrana připojení (`rateLimitProtection`)

**Pojistka automatického zapnutí** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, výchozí `true`):
Ve výchozím nastavení OmniRoute automaticky zapíná ochranu frontou rate-limitu pro všechna aktivní připojení poskytovatelů s API klíčem (`getProviderCategory(provider) === "apikey"`). To zajišťuje, že příchozí požadavky na upstream API klíče citlivé na omezování jsou řazeny do fronty a škrceny přes Bottleneck, místo aby nárazově narážely na upstream chyby 429. Pojistku lze přepsat proměnnou prostředí `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` vypíná, `true`/`1`/`on` vynutí zapnutí), která má přednost před trvale uloženým nastavením z dashboardu (**Nastavení → Odolnost** / `PATCH /api/resilience`).

**Sémantika `rateLimitProtection` na úrovni připojení:**
Ochrana rate-limitu na úrovni jednotlivých připojení je sledována pomocí booleovského pole `rateLimitProtection` na připojeních poskytovatelů (trvale uloženého jako `rate_limit_protection` v SQLite):

- **Explicitně zapnuto (`rateLimitProtection === true`)**: Ochrana rate-limitu je pro toto připojení explicitně zapnutá, bez ohledu na kategorii poskytovatele nebo na to, zda je pojistka automatického zapnutí aktivní.
- **Explicitně vypnuto (`rateLimitProtection === false`)**: Vypíná explicitní ochranu, ale **nevyjímá** aktivní připojení s API klíčem z globální pojistky automatického zapnutí. V `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) jsou `false` a `undefined` ekvivalentní: pouze `rateLimitProtection === true` je považováno za explicitní přepsání. Pokud je `rateLimitProtection` `false` (nebo nenastaveno), aktivní připojení s API klíčem stále odpovídá podmínce automatického zapnutí a zůstává chráněno rate-limitem.
- **Žádné vyjmutí na úrovni připojení**: Operátor aktuálně nemůže vyjádřit „toto jediné aktivní připojení s API klíčem musí běžet bez ochrany frontou rate-limitu“ a zároveň ponechat automatické zapnutí aktivní pro ostatní. Aby připojení s API klíčem běžela zcela bez front rate-limitu, musí být pojistka globálně vypnutá (`RATE_LIMIT_AUTO_ENABLE=false` nebo `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podporované cesty zápisu:**

- **`POST /api/rate-limits`**: Podporovaná cesta pro správu a přepínání `rateLimitProtection` pro připojení (`{ connectionId: string, enabled: boolean }`). Volání s `enabled: true` explicitní ochranu zapíná; volání s `enabled: false` explicitní ochranu odebírá (přičemž aktivní připojení s API klíčem zůstávají pokryta globální pojistkou, pokud je automatické zapnutí aktivní).
- **`PUT /api/providers/[id]`**: Záměrně `rateLimitProtection` **nepřijímá** ani nepřepíná (#11278). Aktualizace metadat připojení poskytovatele přes `PUT /api/providers/[id]` nikdy nezmění trvale uložený stav ochrany rate-limitu.

---

## 6. Watchdog propustnosti pomalého toku (#9709)

Volitelný `resilienceSettings.streamRecovery.throughputWatchdog` guard detekuje upstream, který stále odesílá bloky, ale produkuje výstup asistenta pod nakonfigurovanou užitečnou výstupní rychlostí. Záměrně se liší od časového limitu nečinnosti: prezenční signály a metadata neresetují ani časovač a nepočítají se jako průběh. Liší se také od termínu tvrdého pokusu (#9153), který zůstává absolutním bezpečnostním stropem bez ohledu na kvalitu výstupu.

Watchdog vyžaduje zahřívací období, po kterém následuje kompletní rolovací okno, než se může zrušit. Počítá textové delty z výstupních událostí API Dokončení a odpovědi chatu (konzervativní bajtový proxy UTF-8 ), ignoruje události pouze pro použití a prázdné události a pozastavuje posuzování, když jsou v běhu události volání nástroje nebo uvažování. Ve výchozím nastavení je zakázáno a lze jej povolit pomocí `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (tato hodnota env pouze nasadí výchozí — a uložená logická hodnota `resilienceSettings.streamRecovery.throughputWatchdog.enabled` vyhraje; viz poznámka k prioritě env-vs-dashboard v horní části této příručky); okno, zahřívání, minimální rychlost a minimální měřitelný výstup jsou ohraničeny normální vrstvou normalizace nastavení odolnosti.

Je-li povoleno, přerušení hlídacího psa se použije pouze na aktivní pokus o upstream. Před všemi bajty viditelnými pro klienta může stávající cesta předčasného obnovení stejného účtu znovu otevřít pokus. Po potvrzení se stream nikdy nepřehraje naslepo; příponu může připojit pouze stávající bezpečná smlouva o pokračování ve středním proudu. Finalizace zůstává jednorázová, takže účtování využití a vydání semaforu nejsou duplikovány.

---

## 7. Přehodnocení stavu upstreamu (nesprávně nahlášené chyby kvóty)

**Rozsah:** jedna upstream brána, která hlásí dočasné vyčerpání kvóty nesprávným HTTP stavem.

**Účel:** opravit zavádějící stav PŘED klasifikací, aby downstream konzumenti (fallback engine, agregace combo, odpověď určená klientovi) viděli skutečnou opakovatelnou povahu selhání.

Některé brány signalizují DOČASNÉ vyčerpání kvóty neopakovatelným HTTP
stavem. `agentrouter.org` vrací `403` (někdy `400`) s čínským tělem odpovědi
(`用户额度不足` / `额度不足`) místo standardního `429`. Klienti jako Claude
Code považují `403` za trvalou chybu a ukončují relaci, a bez korekce by
fallback engine klasifikoval chybu jako `AUTH_ERROR` místo události kvóty.

**Implementace:**

- Registr + matcher: `open-sse/config/upstreamStatusRestatement.ts` — seznam
  pravidel pro jednotlivé poskytovatele (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), porovnávaný přes `applyStatusRestatement()`.
- Místo volání: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (kolem řádku 3654), hned poté, co `parseUpstreamError()` zparsuje odpověď
  upstreamu s chybovým HTTP stavem (`!providerResponse.ok`), a předtím, než
  proběhne jakákoli klasifikace, takže každý downstream konzument vidí
  opravený stav. Chyby vložené uvnitř SSE streamu se statusem `200`
  procházejí samostatnou, pozdější cestou parsování streamu a tento hook je
  dnes **ne**pokrývá — známé omezení, které zatím není pro chybně nahlášený
  status agentrouteru potřeba (ten se projevuje jako chybový HTTP stav).
- Způsobilost opakování: `429` je v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), takže přehodnocená
  chyba nese skutečné okno pro opakování místo toho, aby se objevila jako
  mrtvá `403`.
- Syntetických `60s` v `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  je pouze to, co přehodnocená odpověď sděluje **klientovi**; samo o sobě to
  není interní doba cooldownu/lockoutu připojení — tu řídí odděleně ten
  mechanismus, který přehodnocenou chybu skutečně zpracovává (eskalační
  backoff Connection Cooldownu, §2, základ `3s` u poskytovatelů s API
  klíčem; nebo Model Lockout, §3, u poskytovatelů s kvótou na model, jako je
  agentrouter). Router se může stát způsobilým k internímu opakování dříve,
  než je 60s okno, které ohlašuje klientovi — záměrná rezerva, ne chyba.

Trvalé chyby (agentrouterovo `无权访问模型` — žádný přístup k tomuto modelu)
NIKDY nejsou přehodnoceny: `excludeMarkers` pravidlo vetuje, i když
`textMarkers` zasáhnou, takže chyba si ponechá původní stav a nic ji nebude
donekonečna opakovat. Odpovídající klasifikační pravidlo poskytovatele
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarovaný základní cooldown `6h`)
konzultuje `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_před_ obecným předčasným návratem `FORBIDDEN` pro kategorii apikey,
podmíněno na `honorsRuleLockScope(provider)` (#10334 — v současnosti
exkluzivní pro agentrouter prostřednictvím allowlistu
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v `providerErrorRules.ts`). Deklarovaný
6h cooldown pravidla protéká jako `fallbackResult.baseCooldownMs`, ale stále
napájí původní cestu lockoutu kvóty na model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, #10334 je nemění kromě zdroje cooldownu):
je omezen shora na `mlSettings.maxCooldownMs` operátora (výchozí
`1_800_000ms` / 30 min), stejně jako každý jiný lockout modelu, a
_perzistovaný důvod lockoutu_ zůstává původní hardkódovaný `"forbidden"`,
nikoli `"auth_error"` z pravidla — end-to-end je respektováno pouze trvání
cooldownu, nikoli řetězec důvodu. Samotné připojení zůstává aktivní;
sesterské modely na stejném připojení nejsou ovlivněny.

Přehodnocené chyby kvóty (`额度不足`) v produkci narazí na pravidlo
poskytovatele (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, bez vlastního deklarovaného cooldownu — použije se
výchozí škálovaný backoff perzistenční vrstvy). Od #10334 JE `scope` na
`ProviderErrorRuleMatch` konzumován end-to-end, ale **pouze** u poskytovatelů
v allowlistu `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
dnes pouze `"agentrouter"`, podmíněno přes `honorsRuleLockScope()`). U všech
ostatních poskytovatelů zůstává `scope` pouze informativní, přesně jako před
#10334. `checkFallbackError` vystavuje scope nalezeného pravidla jako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je sdílený guard, který potvrzuje, že
`ruleScope` lze skutečně bezpečně respektovat jako signál platný pro celé
připojení a schopný samoobnovy (scope `"connection"`, důvod
`quota_exhausted`, nikdy `permanent`, nikdy `creditsExhausted` — obrana
proti budoucímu pravidlu, které by párovalo scope `"connection"` s trvalým
stavem účtu). Volají ho dva konzumenti:

- **Perzistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  místo aby spadla do větve **per-model** blokování passthrough providera
  (agentrouter má `passthroughModels: true` → `hasPerModelQuota()`
  vrací `true`), aplikuje **dočasný cooldown připojení** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikdy terminální stav
  (`credits_exhausted`/`banned`/`expired`) — takže se připojení po uplynutí
  cooldownu samo obnoví, místo aby vyžadovalo ruční reset přihlašovacích
  údajů. Pro připojení s `disableCooling: true` (#2997) se přeskakuje:
  tento opt-out místo toho propadne do per-model blokování
  (zdokumentovaný kompromis — viz komentář v kódu nad touto větví).
- **Směrování combo v rámci téhož požadavku** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): tentýž guard označí
  připojení do množiny `exhaustedConnections` v paměti, klíčované
  `${provider}:${connectionId}`. Tím se přeskočí pouze zbývající cíl
  TÉHOŽ POŽADAVKU, který _sám již nese přesně tento `connectionId`_ na svém
  vlastním cílovém objektu (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` před vyhledáním v `exhaustedConnections`) — obyčejné combo
  ze seznamu modelů, kde sourozenecké cíle nemají žádný vlastní připnutý
  `connectionId` a jeden se určí až při odeslání z hlavičky
  `X-OmniRoute-Selected-Connection-Id` v odpovědi, nikdy nenarazí na shodu
  tohoto klíče. Pro tento běžný případ NENÍ skutečnou ochranou proti tomu,
  aby zbývající rameno znovu použilo právě vyčerpaný účet, tento Set — je jí
  výše popsaná vrstva perzistence (`rateLimitedUntil` připojení je nyní
  v budoucnosti) v kombinaci s tím, že tentýž guard pro toto selhání potlačí
  `transientRateLimitedProviders` (viz „Dvoustupňový návrh" a komentář v kódu
  u větve `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`): když
  tento Set zůstane neoznačený, vynucené povolení (force-allow)
  `allowRateLimitedConnection` v `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) se pro zbývající
  ramena providera NEAKTIVUJE, takže filtr `rateLimitedUntil` při výběru
  přihlašovacích údajů (`src/sse/services/auth.ts:1238`) je normálně
  respektován a zbývající rameno buď vybere jiné, stále způsobilé připojení
  agentrouter, nebo selže s tím, že nejsou k dispozici žádné přihlašovací
  údaje — nevynutí si návrat na připojení, které tato větev právě podrobila
  cooldownu.

### Dvoustupňový návrh: přeformulování statusu a poté klasifikace

Přeformulování statusu (`upstreamStatusRestatement.ts`) a klasifikační
pravidla providerů (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) jsou oddělené registry, které se obě klíčují na id
providera a textové markery, ale běží na různých místech a slouží různým
účelům: přeformulování přepisuje HTTP status záhy v `chatCore.ts`;
klasifikační pravidla vybírají fallbackový `reason` a zamykají `scope`
(`model` / `provider` / `connection`) uvnitř `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klasifikační pravidla vidí plný **text** chyby (potřebný pro shodu s markery
těla, jako je `额度不足`) pouze pro providery uvedené v allowlistu
`FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — v současnosti pouze
`"agentrouter"`. Pro každého dalšího providera z **vestavěného katalogu**
předává `checkFallbackError` funkci `getProviderErrorRuleMatch` pouze
strukturovanou chybu (`{code, type}`), což stačí pro pravidla založená na
hlavičkách/statusu/kódu, ale je slepé vůči markerům v textu těla. Tento výběr
provádí pomocná funkce `resolveRuleMatchBody()`: plný text chyby pro
providery na allowlistu, jinak strukturovanou chybu. Přidání **vestavěného**
providera do `FULL_TEXT_RULE_PROVIDERS` je explicitní opt-in pro daného
providera — existuje proto, aby výchozí cesta pro každého providera, který na
seznamu není, zůstala bajt po bajtu nezměněná.

`scope` pravidla (`model` / `provider` / `connection`) je opt-in oddělený od
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jej pouze vystavuje jako
`fallbackResult.ruleScope` a navazující konzumenti jej jako cokoli jiného než
informační štítek respektují pouze pro providery v allowlistu
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ve stejném souboru (podmíněno přes
`honorsRuleLockScope()` — dnes pouze `"agentrouter"`). Co shoda se
`scope: "connection"` skutečně dělá, jakmile je provider na tomto allowlistu,
viz „Přeformulované chyby kvóty" výše.

**#11104 — pravidla deklarovaná operátorem obcházejí oba allowlisty.**
Operátor může za běhu deklarovat pravidlo pro jednotlivé providery přes
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) bez
úpravy tohoto souboru. Podmínění pravidla operátora allowlisty
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlisty
určenými k ochraně **výchozího** chování vestavěných katalogových pravidel —
by učinilo mechanismus nastavení neúčinným pro každého providera kromě těch,
které tam již jsou uvedeny, protože deklarace pravidla je již sama o sobě
explicitním opt-inem operátora. `resolveRuleMatchBody()` i
`honorsRuleLockScope()` nejprve kontrolují `hasOperatorRuleForProvider()`:
provider s pravidlem operátora dostane surový text chyby a jeho deklarovaný
`scope` je respektován, bez ohledu na to, zda se zároveň objevuje v některém
z allowlistů.

**Známá mezera — `providerRuleRegistry` se pro HTTP 400 nikdy nekonzultuje.**
Větev `BAD_REQUEST` funkce `checkFallbackError` klasifikuje status 400 zcela
prostřednictvím vlastních polí vzorů (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` atd. v `accountFallback.ts`) a vrací se dříve,
než je dosaženo větve `configuredRule`/`getProviderErrorRuleMatch` nad ní.
Vestavěné katalogové pravidlo (nebo pravidlo operátora) se `status: 400` je
syntakticky platné, ale nikdy se nespustí. Žádné existující pravidlo dnes na
400 necílí, takže nic v produkci není ovlivněno — budoucí pravidlo pro 400
však vyžaduje nejprve zásah do této větve, což je větší změna než přidání
pravidla (reklasifikuje 400 pro každého providera, který se již spoléhá na
chování polí vzorů), a je mimo rozsah přidání pravidla pro jediného
providera.

### Přidání nové brány, která chybně uvádí stav kvóty

1. Zaregistrujte jedno pole pravidel v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Udržujte `textMarkers`
   specifické pro daného poskytovatele; nikdy znovu nepoužívejte obecné
   anglické fráze, které kolidují s
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Volitelně zaregistrujte klasifikační pravidla v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby byl
   zvolen správný rozsah zámku (`connection` pro kvótu platnou v rámci celého
   účtu, `model` pro chyby vázané na konkrétní model). Tento krok se v produkci
   projeví pouze u poskytovatelů, jejichž pravidla potřebují plný text chyby
   (markery těla odpovědi): přidejte id poskytovatele do
   `FULL_TEXT_RULE_PROVIDERS` ve stejném souboru — jinak `checkFallbackError`
   předává pravidlu vždy pouze strukturovanou chybu `{code, type}` a pravidlo
   založené na textu těla se nikdy neshodne se živým provozem. Pravidla, která
   se shodují čistě na základě `status`/`headers` (jako ta od Opencode nebo
   Minimaxu), toto explicitní povolení nepotřebují. Samostatně platí: pokud
   pravidlo deklaruje `scope: "connection"` a záměrem je skutečný cooldown v
   rozsahu celého připojení plus přeskočení combo v rámci téhož požadavku
   (ne jen informativní štítek), přidejte id poskytovatele do
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ve stejném souboru — právě to řídí
   spotřebu ve stylu `isAgentrouterConnectionQuotaScope()` v
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) a
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toho `scope` sice stále
   prochází přes `fallbackResult.ruleScope`, ale nic na něj nereaguje.
3. Přidejte jednotkové testy zrcadlící `tests/unit/upstream-status-restatement.test.ts`
   a `tests/unit/agentrouter-error-rules.test.ts` (včetně pojistek
   not-permanent / not-creditsExhausted a — pokud poskytovatel potřebuje
   allowlist — testu, který ověřuje, že `resolveRuleMatchBody()` vrací plný
   text pouze pro tohoto poskytovatele).

Není nutné nic měnit v `chatCore.ts`, `classifyError` ani v combo.

#### Zámek seskupený podle egress IP (#10880)

Poskytovatelé v `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodina opencode) jsou
považováni za upstream seskupený podle IP (free tier opencode je seskupený
podle IP, nikoli podle účtu — viz #9611): status 429 klasifikovaný jako
`quota_exhausted` **nebo** `rate_limit_exceeded` ochladí každé připojení z
allowlistované rodiny, jehož poslední známá egress IP odpovídá IP selhávajícího
připojení, ještě než je rotace stihne vyzkoušet
— čímž se předejde N-1 zaručeně neúspěšným voláním upstream (stejný princip
jako #10460/#10525).
`rate_limit_exceeded` je zahrnuto záměrně: na cestě `markAccountUnavailable`
se pravidla specifická pro opencode nikdy neshodují (`checkFallbackError`
nedostává žádné hlavičky/tělo, opencode není v `FULL_TEXT_RULE_PROVIDERS`),
takže 429, jejíž tělo nese text o kvótě předplatného ("monthly usage limit
reached"), je klasifikována jako `quota_exhausted` fallbackem podle textu
kvóty (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown)
dříve, než je vůbec dosaženo pravidla `status_429` — zatímco 429 bez textu
kvóty (prosté rate limitování) se klasifikuje přes pravidlo `status_429` jako
`rate_limit_exceeded` a přesto ochladí celou IP rodinu. U allowlistovaného
poskytovatele je rate limit seskupený podle IP stejný signál jako vyčerpaná
kvóta. Reálná omezení:

- **Best-effort**: zámek zjistí poslední známou `egress_ip` připojení z `proxy_logs` (24h okno, synchronně, bez cache). Studená cache (egress IP nikdy nebyla sondována) nebo žádný řádek → selhávající připojení je větví i nadále ochlazeno (zaznamenáno jako dosud), pouze není uzamčen žádný sourozenec.
- **Nikdy terminální**: cooldown je obnovující se okno kvóty (`testStatus: "unavailable"`); trvalý stav není nikdy odvozen ze signálu na úrovni IP. Připojení s `disableCooling` větev zcela přeskakují.
- **Granularita zámku se pro rodinu na allowlistu mění**: jde o změnu rozsahu, ne jen o optimalizaci sourozenců. opencode je poskytovatel `passthroughModels`, takže před touto větví 429 způsobovalo blokování per-MODEL; nyní způsobuje cooldown připojení — včetně případu operátora, který provozuje jediné připojení zcela bez sourozence. To je přesně ta granularita, kterou tabulka pravidel opencode již deklaruje jako správnou (`scope: "connection"`, `providerErrorRules.ts`), dosud však nikdy nebyla dodržena, protože opencode není v `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Větev sama zapíše cooldown selhávajícího připojení + `backoffLevel`, zrcadlí větev agentrouter s rozsahem připojení, a vrací se — blok per-model a obecná cesta níže nejsou nikdy dosaženy.
- **Combo zahrnuto**: stejně jako větev agentrouter rozsah záměrně ignoruje downgrade `persistUnavailableState`/`isCombo`, který combo volající aplikuje na 429. Blokování per-model není slabší forma tohoto rozsahu, je to špatná jednotka: neříká nic o vyčerpané IP, takže rotace combo by dál pálila jedno zaručeně neúspěšné volání na sourozence.
- **Bezpečnost sourozenců**: sourozenec, který je již terminální (banned/credits_exhausted) nebo se již nachází v delším cooldownu, není nikdy přepsán.
- **Exkluzivní allowlist**: rozšíření `EGRESS_BUCKETED_LOCK_PROVIDERS` je explicitní rozhodnutí vlastníka; žádné obecné zapojení (vzor #10334/#10419). Dotaz na sourozence váže tentýž allowlist místo jeho opakování jako SQL literálu, takže jeho rozšíření zůstává změnou na jeden řádek.
- **Rotace egress IP, oběma směry**: vyhledávací okno (24h) je mnohem širší než TTL cache egress-IP (5 min), takže „poslední známá IP“ je historie, nikoli aktuální stav. Pokud se proxy připojení během okna zrotovala, zámek může **minout** skutečně sdílenou IP (zaznamenaná IP je ta nová, nevyčerpaná) — a symetricky může **ochladit sourozence, který se od té doby od vyčerpané IP odrotoval**. Druhý případ stojí daného sourozence jedno okno cooldownu; oba jsou přijaté limity best-effort vyhledávání založeného na historii.
- **Náklady**: dva ohraničené skeny `proxy_logs` (filtrované oknem přes `idx_pl_timestamp`), pouze s frekvencí výskytu 429. Žádný nový index (migrace 134 YAGNI). Měřeno na kopii DB s reálným provozem střední velikosti; instance s vysokou propustností drží ve stejném okně úměrně více řádků.

---

## Další funkce odolnosti

- **20 strategií směrování** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — viz [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Směrování s ohledem na reset** (v3.8.0) — upřednostňuje připojení podle času obnovení kvóty.
- **Degradace režimu na pozadí** — Responses API `background: true` degradováno na synchronní režim s varováním.
- **Dynamická detekce limitu nástrojů** — odstupuje od poskytovatelů při dosažení limitů počtu nástrojů.
- **Nouzový fallback** — řízen proměnnou `OMNIROUTE_EMERGENCY_FALLBACK`; operátoři jej mohou přepsat na stránce Feature Flags bez restartu.

---

## Ladění

- Vážené combo odpovídá `503 all_targets_cooling_down` (`Retry-After` nastaveno, `diagnostics.excluded` obsahuje všechny cíle s `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je nakonfigurován a připojen, každý cíl je pouze vyloučen časovačem odolnosti; varování `[COMBO] Weighted selection: every target excluded before dispatch — …` uvádí důvody a zbývající sekundy. `404 no_executable_targets` ze stejného comba znamená, že žádný časovač odolnosti nehrál roli (nic ke spuštění, nebo každý účet neprošel testem dostupnosti). Vytvořeno v `open-sse/services/combo/pinRecovery.ts` z vyloučení shromážděných v `targetResolution.ts`.
- Všechny klíče poskytovatele přeskočeny → zkontrolujte jak stav circuit breakeru, TAK `rateLimitedUntil`/`testStatus` každého připojení.
- Poskytovatel trvale vyloučen po okně resetu → kód čte surový `state` místo `getStatus()`/`canExecute()`.
- Jeden klíč selhává, ostatní by měly fungovat → upřednostněte connection cooldown před circuit breakerem.
- Selhává pouze jeden model → upřednostněte model lockout před connection cooldown.
- Stav by se měl sám obnovit, ale neobnoví → zkontrolujte časové razítko v budoucnosti + cestu čtení, která obnovuje expirovaný stav. Trvalé stavy vyžadují ruční změny.

---

## Stav za běhu — rychlá reference pro agenta

> Přesunuto beze změn z `AGENTS.md` → "Resilience Runtime State" (PR #12743), aby
> příručka pro agenta zůstala pod kontextovým limitem 40k. Jedná se o zhuštěný pohled
> na výše uvedené sekce určený agentovi; číslované sekce zůstávají úplnou referencí.

OmniRoute má tři příbuzné, ale odlišné mechanismy pro dočasná selhání. Při ladění
chování směrování udržujte jejich rozsah oddělený. Pro rychlý přehled viz
[diagram 3vrstvé odolnosti](../diagrams/exported/resilience-3layers.svg)
(zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Circuit breaker poskytovatele

**Rozsah**: celý poskytovatel, např. `glm`, `openai`, `anthropic`.

**Účel**: zastavit posílání provozu poskytovateli, který opakovaně selhává na úrovni
upstreamu/služby, aby jeden nezdravý poskytovatel nezpomaloval každý požadavek.

**Implementace**:

- Základní třída: `src/shared/utils/circuitBreaker.ts`
- Zapojení brány/spuštění chatu: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu za běhu: `src/app/api/monitoring/health/route.ts`
- Sdílené obálky: `open-sse/services/accountFallback.ts`
- Tabulka trvalého stavu: `domain_circuit_breakers`

**Stavy** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normální provoz je povolen.
- `DEGRADED`: pásmo včasného varování — selhání překročila práh degradace, ale ještě
  ne práh breakeru; provoz stále teče, dashboardy zobrazují varování. Platný test
  připojení nebo klidné okno bez nového selhání jej vrátí do `CLOSED`
  (okno popisuje `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: poskytovatel je dočasně zablokován; volající dostanou odpověď
  provider-circuit-open, nebo combo směrování přeskočí na jiný cíl.
- `HALF_OPEN`: uplynul časový limit resetu; povolí se zkušební požadavek. Úspěch
  breaker uzavře, selhání jej znovu otevře.

**Výchozí hodnoty** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, spotřebováváno přes
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` v `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` v `src/sse/handlers/chatHelpers.ts`). Breaker celého
poskytovatele běží na `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil   | degraduje se při | otevře se při (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| -------- | ---------------: | ----------------------------------------: | ----------------------------: |
| OAuth    |              `5` |                                       `8` |                         `60s` |
| API klíč |              `7` |                                      `12` |                         `30s` |
| Lokální  |       (odvozeno) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` také definuje `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) a `providerCooldownMs` (5/10/1 min): tyto pohánějí
**okenní bránu volitelného globálního Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`, ve
výchozím stavu vypnuto) — záznam na úrovni poskytovatele v
`open-sse/services/providerCooldownTracker.ts` se počítá jako chladnoucí až po
`providerFailureThreshold` selháních uvnitř `providerFailureWindowMs`, a poté chladne po
dobu `providerCooldownMs`. NEJSOU to prahy živého breakeru — nenalaďujte je
v očekávání chování breakeru. Každou výchozí hodnotu lze přepsat pomocí env proměnných
`OMNIROUTE_PROVIDER_BREAKER_*` a `OMNIROUTE_CIRCUIT_BREAKER_*`; referenční tabulka přesná
pro běh systému se nachází v `docs/architecture/RESILIENCE_GUIDE.md`.

Pouze stavy selhání na úrovni poskytovatele by měly aktivovat breaker poskytovatele:

```ts
(408, 500, 502, 503, 504);
```

Neaktivujte breaker celého poskytovatele pro běžné chyby účtu/klíče/modelu, jako je
většina případů `401`, `403` nebo `429`. Ty obvykle patří do connection cooldown nebo
model lockout. Obecné `403` poskytovatele s API klíčem by mělo být obnovitelné, pokud
není klasifikováno jako terminální chyba poskytovatele/účtu.

Jistič používá línou obnovu, nikoli časovač na pozadí. Když vyprší stav `OPEN`,
čtení jako `getStatus()`, `canExecute()` a `getRetryAfterMs()` obnoví stav na
`HALF_OPEN`, takže nástěnky a sestavovače kandidátů na kombinace (combo)
nevylučují poskytovatele s vypršenou platností donekonečna.

### Cooldown spojení

**Rozsah**: jedno spojení/účet/klíč poskytovatele.

**Účel**: dočasně přeskočit jeden vadný klíč/účet a zároveň umožnit, aby ostatní
spojení stejného poskytovatele dál obsluhovala požadavky.

**Implementace**:

- Cesta pro zápis/aktualizaci: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výběr/filtrování účtů: `src/sse/services/auth.ts::getProviderCredentials...`
- Výpočet cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavení: `src/lib/resilience/settings.ts`

Důležitá pole na spojeních poskytovatele:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Při výběru účtu je spojení přeskakováno, pokud:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny jsou také líné: když je `rateLimitedUntil` v minulosti, spojení se opět
stává způsobilým. Při úspěšném použití `clearAccountError()` vymaže `testStatus`,
`rateLimitedUntil`, chybová pole a `backoffLevel`.

Výchozí chování cooldownu spojení:

- Základní cooldown pro OAuth: `5s`.
- Základní cooldown pro API klíč: `3s`.
- U API klíče by se u chyby `429` měly upřednostňovat nápovědy pro opakování z upstreamu
  (`Retry-After`, resetovací hlavičky nebo parsovatelný text resetu), pokud jsou
  k dispozici.
- Opakované opravitelné chyby používají exponenciální backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Pojistka proti efektu thundering herd (náhlému hromadnému náporu) zabraňuje tomu, aby
souběžná selhání na stejném spojení opakovaně prodlužovala cooldown nebo dvakrát
inkrementovala `backoffLevel`.

Terminální stavy nejsou cooldowny. `banned`, `expired` (který se stává terminálním až
po N omezených opakováních prostřednictvím `EXPIRED_RETRY_MAX`) a
`credits_exhausted` mají zůstat nedostupné, dokud se nezmění přihlašovací
údaje/nastavení nebo je operátor neresetuje. Nepřepisujte terminální stavy přechodným
stavem cooldownu.

### Zablokování modelu

**Rozsah**: poskytovatel + spojení + model.

**Účel**: zabránit deaktivaci celého spojení, když je pro dané spojení nedostupný
nebo kvótově omezený pouze jeden model.

Příklady:

- Poskytovatelé s kvótami na jednotlivé modely vracející `429`.
- Místní poskytovatelé vracející `404` pro jeden chybějící model.
- Selhání oprávnění režimu/modelu specifická pro poskytovatele, například vybrané
  režimy Grok.

Zablokování modelu je implementováno v `open-sse/services/accountFallback.ts` a
umožňuje, aby stejné spojení dál obsluhovalo ostatní modely.

### Pokyny pro ladění

- Pokud jsou všechny klíče poskytovatele přeskakovány, zkontrolujte jak stav jističe
  poskytovatele, tak `rateLimitedUntil`/`testStatus` každého spojení.
- Pokud se zdá, že je poskytovatel trvale vyloučen i po uplynutí okna resetu,
  zkontrolujte, zda kód nečte surový `state` místo použití
  `getStatus()`/`canExecute()`.
- Pokud selže jeden klíč poskytovatele, ale ostatní by měly fungovat, upřednostněte
  cooldown spojení před jističem poskytovatele.
- Pokud selhává pouze jeden model, upřednostněte zablokování modelu před cooldownem
  spojení.
- Pokud se má stav sám obnovit, měl by mít časovou značku v budoucnosti/časový limit
  resetu a cestu čtení, která obnoví vypršený stav. Trvalé stavy vyžadují ruční změnu
  přihlašovacích údajů nebo konfigurace.

---

## TLS fingerprinting a utajení

Utajení specifické pro jednotlivé poskytovatele (JA3/JA4, CCH, obfuskace) je dokumentováno samostatně — viz `docs/security/STEALTH_GUIDE.md` (git; není kompilováno do `/docs`).

---

## Testování odolnosti (fáze 8 · blok C)

Nad rámec jednotkových testů logiky odolnosti existují tři testy, které zatěžují runtime za skutečných podmínek zátěže a selhání (všechny jsou integrační/noční — žádný neblokuje PR):

| Test        | Co ověřuje                                                                                                                                                                           | Spuštění                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| Chaos       | Uzel fake-upstream vkládá skutečnou latenci/resety/timeouty/503; ověřuje, že se circuit breaker otevře a zotaví a že `checkFallbackError` klasifikuje 503 jako obnovitelný fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 streamů na `createSSEStream` pod `--expose-gc`; selže, pokud halda překročí stanovený strop (strážce OOM #3069).                                                                | `npm run test:heap`                    |
| k6 soak     | Trvalá zátěž proti `/api/monitoring/health`; prahové hodnoty p95/chybovosti.                                                                                                         | `k6 run tests/load/k6-soak.js` (noční) |

Orchestrace probíhá přes `.github/workflows/nightly-resilience.yml` (cron + dispatch). Ve výchozím `test:integration` se chaos a heap sami přeskočí (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Viz také

- [Průvodce architekturou](./ARCHITECTURE.md) — Architektura systému a vnitřní principy
- [Uživatelská příručka](../guides/USER_GUIDE.md) — Poskytovatelé, kombinace, integrace CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — 16faktorové skórování, balíčky režimů
