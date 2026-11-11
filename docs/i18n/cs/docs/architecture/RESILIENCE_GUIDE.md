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

## 2. Prodleva připojení

**Rozsah:** jedno připojení/účet/klíč poskytovatele.

**Účel:** přeskočit jeden nefunkční klíč, zatímco ostatní připojení stejného poskytovatele nadále obsluhují požadavky.

**Implementace:**

- Označení jako nedostupné: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výběr: `getProviderCredentials*` ve stejném souboru
- Výpočet prodlevy: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavení: `src/lib/resilience/settings.ts`

**Pole pro každé připojení:**

- `rateLimitedUntil` — časové razítko, do kterého trvá prodleva
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — čítač exponenciálního backoffu

**Výchozí prodlevy:**

- Základní hodnota OAuth: 5 s
- Základní hodnota API klíče: 3 s
- API klíč 429: upřednostňuje upstream hlavičky `Retry-After`/reset nebo text resetu, který lze analyzovat
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Prodleva opakování pro jednotlivé poskytovatele.** Stránka s podrobnostmi poskytovatele obsahuje výběr **Prodleva opakování** (Automaticky, 15 s až 1 h). Ukládá hodnotu `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600) prostřednictvím `PATCH /api/resilience`. Pokud chyba omezení rychlosti neobsahuje upstream nápovědu k opakování, tato hodnota nahradí škálovaný backoff pro daného poskytovatele a nastaví `backoffLevel` zpět na 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Priorita pro chybu omezení rychlosti, od nejvyšší po nejnižší: upstream nápověda k opakování, poté `providerSpecificData.rotationOverrides.rateLimitResetSeconds` pro dané připojení, poté prodleva opakování pro daného poskytovatele, poté `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` z prostředí a nakonec škálovaný backoff. Automaticky toto pole odstraní. Ovlivňuje pouze důvod omezení rychlosti, nikdy terminální stavy.

**Ochrana proti efektu stáda:** zabraňuje tomu, aby souběžná selhání nadměrně prodlužovala prodlevu nebo vícekrát navyšovala `backoffLevel`.

**429 způsobené limitem souběžnosti nezvyšují úroveň backoffu.** `429`, jehož tělo uvádí limit souběžnosti („too many concurrent requests“, „concurrency limit“, „parallel request limit“, GLM `并发数过高`), znamená, že účet je v pořádku, ale zaneprázdněný. `checkFallbackError()` vrací důvod `concurrency_limited`: okamžitě přepne na další připojení, toto připojení pozastaví na pevně danou dobu `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) nebo do upstream nápovědy k opakování, ponechá `backoffLevel` beze změny a nastaví `skipProviderBreaker`. Výslovné tělo kvóty má stále přednost, takže tělo, které zároveň odpovídá vzoru kvóty, zůstane vyhodnoceno jako kvóta. Detekce: `looksLikeConcurrencyLimit()` v `src/shared/utils/classify429.ts`; vyhodnocení: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` jističe) se nemění a pro tato těla stále čte `rate_limit`.

**Zastavení toku obsahu nepozastavují účet.** Když hlídací mechanismus zastavení obsahu (`open-sse/utils/streamHandler.ts`) ukončí stream, který včas neposlal žádný výstup modelu, `markAccountUnavailable()` zaznamená chybu u připojení, ale nenastaví žádnou prodlevu: zastavení se týká daného požadavku, nejčastěji dlouhého kroku uvažování, u kterého zatím nebyl odeslán žádný výstup. Provozovatelé mohou tuto funkci volitelně zapnout prostřednictvím `resilienceSettings.streamStallCooldown.enabled` (výchozí hodnota `false`).

**Volitelný signál latence pro výběr účtu pomocí `p2c`.** Každý odeslaný pokus zaznamenává čas do prvního bajtu a výsledek pro jednotlivá připojení (a pro kombinaci připojení a modelu) do průběžného okna v paměti: posledních 20 vzorků v rámci 15 minut (`open-sse/services/connectionLatencyTracker.ts`, zaznamenávaných z `safeLogEvents()` v `src/sse/handlers/chatHelpers.ts`). Pokud je `resilienceSettings.p2cLatency.weight` vyšší než `0` (rozsah 0–20, výchozí `0` = vypnuto), `compareP2CConnections()` v `src/sse/services/auth.ts` přidá každému kandidátovi dvojice až `weight` bodů. Polovina této hodnoty vychází z latence jako poměru k rychlejšímu kandidátovi (dvojnásobná pomalost získá celou polovinu) a polovina z průběžné míry chyb. Tento faktor se použije pouze tehdy, když oba kandidáti mají alespoň 3 vzorky, takže nové účty nejsou penalizovány, a jeho maximum zůstává pod penalizacemi za zablokovanou a vyčerpanou kvótu. Nevytváří vlastní okruh: selhávající účty jsou nadále řešeny vrstvami prodlevy, uzamčení a jističe. Nastavuje se pomocí `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Rámce uvažování restartují rozpočet pro zastavení obsahu.** Uvažující model může před prvním viditelným tokenem přemýšlet několik minut: Claude streamuje rámce `thinking_delta`, jejichž text uvažování může být prázdný, a Responses API streamuje jednu položku uvažování za druhou. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tyto rámce rozpoznává a hlídací mechanismus při každém z nich restartuje svůj rozpočet namísto zrušení kroku. Stále nejde o výstup modelu, takže krok, který skončí pouze uvažováním, je nadále hlášen jako prázdný a krok, který ukončí uvažování a posílá už jen heartbeat, stále aktivuje hlídací mechanismus.

Binární rámce Kiro `reasoningContentEvent` s neprázdným podpisem zachovávají tuto aktivitu uvažování prostřednictvím exekutoru jako prázdný delta údaj `reasoning_content`. Podpis se nepředává dál. Metadata, neúplné rámce a prázdné podpisy nerestartují rozpočet obsahu; nadále platí nezávislý časový limit aktivního streamu a zrušení klientem (`open-sse/executors/kiro/reasoning.ts`).

**Terminální stavy (NEJDE o prodlevy):**

- `banned` — nastavuje se detekcí zakázaného klíčového slova nebo zablokovaného účtu (viz [BAN_DETECTION](../security/BAN_DETECTION.md)). Upstream odmítnutí jednotlivých požadavků (`request_rejected`, např. Anthropic OAuth 403 „Request not allowed“) jej nikdy nenastavují: započítávají se pro jednotlivá připojení a modely a daný model se vyřadí z rotace s postupně rostoucí prodlevou omezenou na `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), nebo se připojení pozastaví, pokud není znám žádný model — `open-sse/services/requestRejectedStreak.ts`
- `expired` (po omezeném počtu opakování přechází do terminálního stavu — `EXPIRED_RETRY_MAX = 3` s exponenciálním backoffem — aby se přechodné chyby OAuth mohly samy opravit dříve, než bude účet trvale deaktivován)
- `credits_exhausted`

Přetrvávají, dokud se nezmění přihlašovací údaje nebo je operátor neresetuje. Terminální stavy nepřepisujte přechodným stavem cooldownu.

**Líné obnovení:** jakmile `rateLimitedUntil` uplyne, připojení se znovu stane způsobilým. Po úspěšném použití `clearAccountError()` vymaže všechna chybová pole.

### Limit využití Claude OAuth: fronta s nižší prioritou + reset limitu relace

**Rozsah:** jedno připojení Claude (OAuth). Obě funkce jsou **volitelné pro každé
připojení** (Upravit připojení → sekce Claude → `lowPriorityMode` / `autoLimitReset` v
`providerSpecificData`, obě jsou ve výchozím nastavení vypnuté) a odpovídají příkazům
Claude Code `/low-priority` a `/limit-reset` (drátový kontrakt převzatý z Claude Code 2.1.263).

**Implementace:**

- Stavový automat + klasifikace odpovědí: `open-sse/services/claudeLowPriority.ts`
- Klient pro stav/claim resetu: `open-sse/services/claudeLimitReset.ts`
- Hook executoru (vkládání hlavičky + opakování pro stejný účet): `open-sse/executors/base.ts::execute()`
- Uložení volitelné funkce: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spouštěč:** pětihodinový limit využití — `429`, jehož hlavičky obsahují
`anthropic-ratelimit-unified-status: rejected` a v případě, že je účet způsobilý,
`anthropic-ratelimit-unified-slow-offer: treatment`. Před prvním `429` tohoto limitu
se nic neodesílá; dávka `429` bez sjednocených hlaviček prochází běžnou cestou cooldownu.

**Fronta s nižší prioritou** (`lowPriorityMode`):

- Při `429` způsobeném limitem executor přijme nabídku a okamžitě zopakuje požadavek na
  **stejném** účtu s `anthropic-usage-limit: slow`; fronta zůstává aktivní až do oznámeného
  `anthropic-ratelimit-unified-reset` (+ 60 s ochranné lhůty) a každý požadavek v tomto
  časovém okně obsahuje tuto hlavičku. Zachycený `429` se nikdy nedostane do
  `handleChatCore`, takže připojení není uvedeno do cooldownu ani se od něj neodchází
  rotací.
- `anthropic-ratelimit-unified-slow-status` v pozdějších odpovědích: `active` / `not_needed`
  frontu ponechávají aktivní; `slot_busy` (429) nebo `529` čekají po dobu určenou serverem
  v `anthropic-ratelimit-unified-slow-retry-after` (výchozí 20 s, omezení na 5–600 s,
  jitter ±30 %) a poté požadavek zopakují, přičemž jsou omezeny parametrem
  `anthropic-ratelimit-unified-slow-max-wait` (výchozí 20 min, omezení na
  1 min–6 h) — po jeho překročení fronta skončí a desetiminutový cooldown zablokuje
  její opětovné přijetí. Čekání je navíc omezeno dobou zbývající do vlastního timeoutu
  požadavku pro zahájení upstream požadavku (`resolveFetchStartTimeout`, ve výchozím
  nastavení 10 min) po odečtení 5s rezervy: bez tohoto omezení by výchozí maximální
  doba čekání 20 minut přesáhla dobu životnosti požadavku a spánek by byl přerušen
  uprostřed čekání, což by vyvolalo `TimeoutError` namísto korektního ukončení
  `max_wait` a cooldownu.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, přetočení
  pětihodinového okna nebo `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`
  (což frontu ukončí jako `extra_usage` při jakémkoli stavu, protože limit nyní pokrývá
  placené překročení) frontu ukončí; odpověď pak pokračuje běžnou cestou cooldownu.
  `budget_exhausted` se zapamatuje až do oznámeného resetu rozpočtu (nejvýše 8 dní).
- Kontrola limitu probíhá po vlastních opakováních executoru vyvolaných stavem 400
  v rámci jednoho pokusu (úprava kontextu, omezení thinking/effort, automatické učení
  parametrů), takže `429` způsobený limitem, který se objeví teprve při jednom z těchto
  opakování, je stále zachycen namísto odeslání do cesty cooldownu.
- Stav je uložen v paměti pro každé připojení (restart vyžaduje jeden další `429`
  způsobený limitem, aby bylo možné nabídku znovu přijmout).

**Reset limitu relace** (`autoLimitReset`, při zapnutí obou funkcí se zkouší před frontou):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok
  `juniper_tide`; pokud je `arm: "reset"` a `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizace z
  `providerSpecificData.organizationUUID`, záložní hodnota z bootstrapu).
- `result: reset|not_limited` → požadavek se zopakuje plnou rychlostí (bez hlavičky slow).
  `already_used` / `not_offered` uloží do paměti `next_available_at` (výchozí jeden týden);
  při jakémkoli selhání se použije 15minutový backoff. Reset je možný jednou týdně a
  stále se započítává do týdenního limitu.

Regresní ochrany: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Automatická aplikace bankovaných resetů

**Rozsah:** Připojení předplatného Codex a Claude (OAuth).**Přihlásit se** : nastavení `bankedResetAutoApply` je ve výchozím nastavení vypnuto a v režimu `dry-run` (Nastavení → AI → Automatická aplikace bankových resetů).

**Účel:** utrácet bankovní resety samy o sobě, když účet narazí na překážku používání, namísto čekání, až operátor stiskne „Uplatnit“ na stránce Limity poskytovatele.

| Typ kreditu (`creditTypes`) | Co je vykoupeno                             | Kde to běží                                                           |
| --------------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| `codexCredits`              | Codex resetovat kredity                     | práce na pozadí, každých 60 s                                         |
| `claudeCredits`             | Claude bankovní granty (kredity `GRANT` )   | práce na pozadí, každých 60 s                                         |
| `claudeSessionReset`        | Reset týdenního limitu relace Claude (výše) | cestu požadavku, prostřednictvím stejných zásad jako přepínač na účet |

**Implementace:**

- Čisté rozhodnutí (jedno pravidlo nastavené pro obě cesty): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Úloha na pozadí: `src/lib/services/bankedResetAutoApply.ts` (zahájena v `src/instrumentation-node.ts`)
- Brána cesty požadavku Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, registrovaná prostřednictvím `setClaudeLimitResetPolicy()` v `open-sse/services/claudeLimitReset.ts`
- Historie, čepice a webhook: `src/lib/usage/bankedResetAudit.ts`
- Historie API: `GET /api/settings/banked-reset-auto/history?limit=50` (autorizace správy)

**Rozhodovací pořadí** (první chybné pravidlo je zaznamenaný důvod):

1. Funkce vypnuta, typ kreditu vypnut nebo účet mimo rozsah (`accountScope` `all` / `selected` plus mapa `connections` pro jednotlivé účty).
2. Mimo volitelný plán UTC (`startHourUtc` > `endHourUtc` překročí půlnoc).
3. Limity za posledních 24 hodin: `maxPerAccountPerDay` (1), `maxPerDay` (3) a `minSpacingMinutes` (30) mezi libovolnými dvěma odkupy.
4. Spouštěč: zazděné okno `session` nebo `weekly` (přečteno z `getQuotaWindowStatus().reachedThreshold`, nikoli `isAccountQuotaExhausted()`, které pouze hlásí účet s každým utraceným oknem) nebo kredit, který vyprší v rámci `expiringCreditHours` (24) na účtu, který použil alespoň `expiringCreditMinUsedPercent` (50).
5. Ochrana s přirozeným resetem: přeskočte, když se zazděné 5hodinové okno resetuje v rámci `sessionResetGuardMinutes` (90), nebo zazděné týdenní okno v rámci `weeklyResetGuardHours` (12).
6. Týdenní minimum: přeskočte 5hodinový reset, když je týdenní zbývající čas pod `weeklyFloorPercent` (10).
7. Režim `last-resort` : přeskočte, dokud jinému účtu v rozsahu stejného poskytovatele zbývá v obou oknech alespoň `poolHeadroomPercent` (10). Spouštěče s vypršením kreditu toto obcházejí.
8. `dry-run` zaznamená řadu a nic neproplatí; Uplatnění `last-resort` a `eager`.

Chybějící údaje o kvótě nikdy neodemknou uplatnění: neznámý čas resetování nebo týdenní využití přeskočí.

**Resetování relace Claude :** s vypnutou funkcí nebo vypnutým `claudeSessionReset` se přepínač `autoLimitReset` na účet rozhoduje přesně jako dříve. Když jsou oba zapnuté, tato funkce nahrazuje přepínače pro jednotlivé účty: účet v rozsahu může nárokovat pouze tehdy, když to zásady umožňují, a v režimu `dry-run` není vznesen žádný nárok.

**Bezpečnost:** zakázka uplatní maximálně jeden kredit na zaškrtnutí, rozhodne se před uvedením kreditů (vynechaný účet není nikdy uveden), používá klíče idempotence `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` a zálohuje účet na 1 hodinu po neúspěšném zařazení nebo proplacení. Každé rozhodnutí o zpětném odkupu, selhání a suchém běhu je zapsáno do `audit_log` (`action: "bankedReset.redeem"`, žádné tokeny nebo kreditní ID); čepice se počítají z těchto řádků, takže přežijí restarty. Úspěšné odkupy také vystřelí webhook `provider.reset_redeemed`.

Regresní stráže: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Afinitní relace (#7274)

**Rozsah:** jedna relace klienta (`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session` hlavička) připnutá k jednomu připojení, pro **libovolného poskytovatele**.

**Účel:** udržet víceotáčkového agenta (Claude Code, aider, vlastní agenty) na stejném
účtu napříč požadavky, čímž se omezí ztráta kontextu mezi účty a opakované 429 při
studeném startu u poskytovatelů se stavem relace závislým na účtu.

**Implementace:**

- Řešení TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Výběr/vytvoření pinu: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrakce hlavičky (obecná, libovolný poskytovatel): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabulka uložených pinů: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavení: `sessionAffinityTtlMs` (globální TTL v ms, `0` deaktivuje) — `src/lib/db/settings.ts`.
  Přejmenováno z nastavení `codexSessionAffinityTtlMs` určeného pouze pro Codex migrací
  `124_generic_session_affinity_ttl.sql`, která přenese dříve nakonfigurované TTL Codexu
  jako nový výchozí údaj.

Před #7274 funkce `resolveSessionAffinityTtlMs()` okamžitě vracela `0` pro každého
poskytovatele kromě `codex`, takže nastavení TTL (a hlavičky relace) neměly nikde jinde
žádný účinek, přestože mechanismus připnutí a extrakce hlaviček již byly nezávislé na
poskytovateli. Oprava odstranila toto předčasné ukončení; TTL se nyní po globálním
nastavení na hodnotu vyšší než `0` uplatňuje jednotně u všech poskytovatelů.

Tři hlavičky afinity relace se nikdy nepředávají upstreamu — executory vytvářejí vlastní
upstreamové hlavičky od začátku, místo aby předávaly hlavičky klienta, takže toto zůstává
pouze interním korelačním ID.

### Exkluzivní spravované zápůjčky připojení relací

**Rozsah:** jeden aktivní spravovaný HTTP klient/relace vlastní jedno způsobilé připojení OmniRoute.

**Účel:** poskytovat trvalé výhradní vlastnictví připojení klientům, kteří potřebují pevnou směrovací
bariéru napříč požadavky. To se liší od afinity relace, která představuje měkkou preferenci kontinuity:
výhradní lease zachovává stav životního cyklu v SQLite, vynucuje globální jedinečnost aktivního vlastníka a
aktivního připojení a odmítá zastaralou generaci před odesláním poskytovateli.

Tato funkce se aktivuje samostatně pro každý klíč API. Spravovaný klíč musí mít obor `lease:exclusive` a
explicitní neprázdný seznam `allowedConnections`. Koncový bod životního cyklu může použít libovolný HTTP
klient; nevyžaduje se název klienta, user-agent, poskytovatel, metoda OAuth ani model. Lease vlastní připojení,
nikoli model, takže změna modelu zachová vazbu, pokud připojení zůstane běžně způsobilé. Běžná pravidla pro
model, kvótu, stav, dobu cooldown a seznam povolených položek zůstávají autoritativní a mohou stejnou generaci
přepnout na jiné volné způsobilé připojení.

Životní cyklus tvoří `POST /api/v1/session-leases` s akcemi JSON `acquire`, `renew` a `release`.
Spravované požadavky na inferenci předávají neprůhlednou hodnotu `X-OmniRoute-Lease-Owner` a přesnou
hodnotu `X-OmniRoute-Lease-Generation`. Vlastník používá předponu `vlo_` následovanou 43 znaky base64url;
ukládá se pouze jeho hash SHA-256. Každá konečná bariéra před odesláním také váže požadavek na ID
autentizovaného klíče API a ID aktivního připojení. Řídicí hlavičky lease se odstraňují z protokolů,
uchovávaných snímků požadavků a hlaviček upstream exekutorů.

Pokud má běžné směrování způsobilé spravované kandidáty, ale každý volný kandidát je obsazen cizím aktivním
lease, OmniRoute vrátí HTTP `429`, kód `lease-capacity-unavailable`, stav čekání na kapacitu a omezenou
hodnotu `Retry-After` odvozenou od nejbližší relevantní expirace. Běžná absence způsobilých položek není
konkurence o lease a zachovává stávající sémantiku chyb směrování.

Související mechanismy zůstávají oddělené:

- Obsazení relací OAuth zajišťuje procesně lokální měkkou distribuci účtů OAuth.
- Semafory účtů udělují povolení k souběžnosti požadavků a jejich platnost končí dokončením požadavku.
- Výhradní spravované lease relací představují trvalé vlastnictví v rámci životního cyklu s bariérou generace.

---

## 3. Blokace modelu

**Rozsah:** trojice poskytovatel + připojení + model.

**Rozsah podle stavového kódu:** stav, který selhání způsobil, určuje, do kterého klíče blokace zapíše
(`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signál kvóty nebo oprávnění — uzamkne **rodinu kvót**:
  u codexu celý rozsah `codex` / `spark` (každý model `gpt-5*` daného
  připojení), u ostatních poskytovatelů `getQuotaScopedModelForProvider()`.
- `404` uzamkne základní model (`getModelLockKey()` zužuje rozsah `not_found`).
- Jakýkoli jiný stav — přenosová nebo serverová selhání `5xx` a vlastní
  syntetizovaný stav `502` OmniRoute vytvořený při validaci kvality — uzamkne pouze
  **přesnou** n-tici poskytovatel/připojení/model. Chybný stream u jednoho modelu
  není důkazem o kvótě účtu; před tímto pravidlem odstranila jedna prázdná odpověď na
  `codex/gpt-5.6-luna` z routování na 2–30 minut (s eskalací) každý model `gpt-5*`
  daného připojení, zatímco jeho kvóta zůstala nedotčena.
- Explicitní volba `scope` volajícího má vždy přednost (Antigravity předává `"exact"`).

**Účel:** zabránit vyřazení celého připojení, když je nedostupný nebo omezený kvótou pouze jeden model.

**Příklady:**

- Poskytovatelé s kvótou pro jednotlivé modely vracející `429`
- Lokální poskytovatelé vracející `404` pro jeden chybějící model
- Selhání oprávnění specifická pro režim/model poskytovatele (např. režimy Grok)

**Implementace:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel ochlazení modelů (v3.8.0)

UI: Nastavení → Ochlazení modelů (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Zobrazuje aktivní blokace s údaji: poskytovatel, připojení, model, důvod, expiresAt. Operátoři mohou model z karty ručně znovu povolit.

**REST API:**

- `GET /api/resilience/model-cooldowns` — výpis aktivních blokací
- `DELETE /api/resilience/model-cooldowns` — ruční opětovné povolení. Tělo: `{provider, connection, model}`. Autorizace: management.

### Správce ochlazení

UI: Monitorování → Správce ochlazení (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stránka pro každé připojení, které je z dočasného důvodu vyřazeno z routování, namísto
otevírání stránky každého poskytovatele zvlášť. Zobrazuje ochlazení připojení, blokace modelů a koncové
stavy, umožňuje je vymazat pro jednotlivá připojení, vybranou skupinu nebo všechna připojení poskytovatele
a upravuje nejčastěji laděná pravidla ochlazení: `streamStallCooldown.enabled` a základní ochlazení
`connectionCooldown` pro OAuth / API klíč spolu s maximálním počtem kroků exponenciálního návratu (uloženo přes
`PATCH /api/resilience`). Koncové stavy (`banned`, `expired`, `credits_exhausted`) jsou
uvedeny, ale zde se nikdy nemažou.

Karta **Pravidla ochlazení při chybách** na stejné stránce upravuje pravidla chyb operátora
(`settings.providerErrorRules`) a výchozí pravidla typu catch-all pro jednotlivé poskytovatele
(`settings.providerErrorDefaults`) prostřednictvím `PATCH /api/settings` — způsob jejich
párování je popsán v části „Pravidla deklarovaná operátorem“ v §7. Délky trvání jsou Výchozí (bez explicitního ochlazení), 30 min,
1 h, 5 h, 24 h nebo vlastní hodnota od 1 do 43 200 minut (30 dní).

**REST API** (`src/lib/resilience/cooldownManager.ts`, autorizace: management):

- `GET /api/resilience/cooldowns[?provider=]` — připojení se stavem, zbývajícím ochlazením,
  úrovní návratu, posledním typem chyby a blokacemi modelů (bez přihlašovacích údajů)
- `POST /api/resilience/cooldowns` — tělo `{connectionIds: string[]}` nebo
  `{all: true, provider?}`; vrací `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI nastavení blokace modelu + obnova úspěšným útlumem (v3.8.23)

Blokace modelu se změnila z vždy aktivního chování pevně daného v kódu na plně konfigurovatelnou,
volitelnou funkci s vlastní kartou nastavení a mechanismem samoopravné obnovy.

**Karta nastavení:** Nastavení → Blokace modelu
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ta se liší od výše uvedené karty `ModelCooldownsCard` pouze pro čtení (která pouze
_vypisuje_ aktivní blokace) — nová karta _konfiguruje parametry_. Výchozí hodnoty jsou v
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavení               | Výchozí hodnota                  | Význam                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Hlavní přepínač — blokace modelu je **ve výchozím nastavení vypnutá**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stavové kódy upstreamu, které se počítají jako selhání v rozsahu modelu. |
| `baseCooldownMs`        | `120_000` (120 s)                | Počáteční délka blokace při prvním selhání.                              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limit eskalovaného ochlazení.                                            |
| `maxBackoffSteps`       | `10`                             | Maximální počet kroků exponenciální eskalace.                            |
| `useExponentialBackoff` | `true`                           | Určuje, zda opakovaná selhání exponenciálně prodlužují ochlazení.        |

Nastavení se ukládá prostřednictvím běžného úložiště nastavení a ověřuje pomocí
schématu nastavení odolnosti; karta omezuje hodnoty `baseCooldownMs`/`maxCooldownMs`
(s podmínkou `maxCooldownMs ≥ baseCooldownMs`) a `maxBackoffSteps`.

**Obnova úspěšným útlumem:** obnova není založena **pouze** na uplynutí časovače. Zdravá
odpověď sníží počet selhání modelu, takže model, který se zotavil uprostřed okna,
přestane eskalovat (a blokace se vymaže) ještě před vypršením časovače. Při úspěšném cíli kombinace
volá `open-sse/services/combo.ts` funkci `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), která **zmenší na polovinu** uložený
`failureCount` (`Math.floor(failureCount / 2)`); jakmile dosáhne hodnoty `0`, položka blokace se zcela
smaže. Protějšek `recordModelLockoutFailure()` zvyšuje počet (a eskaluje ochlazení)
při selháních v rámci eskalačního okna. Tento útlum po úspěchu doplňuje prosté vypršení časovače —
oběma cestami lze model znovu povolit.

**Stav:** blokace jsou uchovávány **v paměti** (`Map`s pro každý proces obsahující
`ModelLockoutEntry`, jejichž klíčem je `provider:connectionId:model`, blokace s přesným rozsahem mají klíč
`provider:connectionId:exact:model`), nikoli trvale v
databázi — po restartu se ztratí. _Nastavení_ se ukládá trvale; aktivní _stav blokací_ je dočasný.

---

## 4. Kontrola souběžného sdílení kvót (v3.8.36)

Účty předplatného (GLM, MiniMax atd.) často přijímají pouze 1–3 souběžné požadavky ~; překročení spouští 429s a cooldowny. To je akutní pod **kvótní podíl** (`qtSd/…`) komba, kde několik klíčů API sdílí jeden upstream účet. Tři vrstvy chrání sdílený účet před zaplavením.

### Omezení souběžnosti na připojení (`max_concurrent`)

Každé připojení poskytovatele může deklarovat strop `max_concurrent` (`provider_connections.max_concurrent`, nastavený v modálním připojení / API / DB). Ponechejte prázdné bez omezení. Toto je jediný knoflík, který řídí vrstvu serializace pod — a nastavte ji na skutečnou souběžnost účtu (např. GLM ~ 1, MiniMax ~ 2).

### Omezení souběžnosti podle modelu (`modelConcurrency`)

Připojení může dodatečně deklarovat přesné stropy souběžnosti podle modelu uvnitř své mapy `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nastavte jej v modálním připojení (**Sazba limit přepíše → Per-model souběžné limity** , jeden `model=cap` na řádek) nebo přes `PATCH /api/providers/[id]` se stejným tvarem JSON. Klíčová sémantika:

- **Pro celé připojení vs pro konkrétní model:** `maxConcurrent` zůstává stropem sdíleného připojení. Když platí obě, obě hradla jsou získávána atomicky ve stejném kompozitním hradlu (`global → provider → account → model`); efektivní chování je přísnější použitelný limit.
- **Přesná shoda modelu a klíče:** klíčem je modelový řetězec předaný exekutoru po směrování rozlišení — obvykle holé id upstream modelu (`glm-5`), nikoli alias `provider/model` na straně klienta (`zai/glm-5` neodpovídá `glm-5`). Hodnoty jsou limity kladných celých souběžných požadavků.
- **Místní fronta, žádné zjišťování:** nadměrné požadavky se řadí do fronty lokálně se stávající sémantikou queue/timeout (chyby přijetí typu `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute nezjišťuje ani neodvozuje upstream politiku — vynucuje přesné stropy nakonfigurované operátorem. Nasycená modelová brána nikdy nevyřadí poskytovatele z provozu a nikdy nevytvoří trvalé uzamčení modelu; Chování proti proudu 429/cooldown/fallback zůstává pojistkou proti chybám.
- **Na připojení, rozsah na proces:** caps jsou na databázové připojení a jsou uloženy v paměti, takže dvě připojení znovu používající stejný upstream klíč API se vzájemně nekoordinují.
- **Nekonfigurováno znamená nezměněno:** vynechání mapy (nebo ponechání pole palubní desky prázdné) nepřidá žádnou modelovou bránu. Příklad konfigurace bez uplatnění limitu univerzálního poskytovatele:

```text
glm-5=1
glm-4.7=3
```

### Serializace požadavku na sdílení kvót

Když odeslání sdílení kvóty cílí na připojení, které deklaruje pozitivní `max_concurrent`, souběžné požadavky na toto připojení **účet** jsou serializovány prostřednictvím semaforu pro jednotlivá připojení (klíč `qsconn:<connectionId>`): nadměrné požadavky **čekat ve frontě** místo zahlcení účtu. To je **fail-open** — nasycená fronta nebo časový limit pokračuje bez slotu, spíše než kdy by odmítla odeslat požadavek. Přepnout **Nastavení Odolnost → → Souběžnost sdílení kvót na připojení** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, výchozí zapnuto). Bez uzávěru `max_concurrent` se chování nezmění.

> Směrovací brána pro sdílení kvót (`selectQuotaShareTarget`, DRR + P2C) je sama o sobě otevřená při selhání a pouze _deprioritizuje_ připojení — na úrovni stropu s fondem jediného připojení, který nemůže pevně omezit, takže tento semafor je to, co ve skutečnosti obsahuje záplavu.

### Opakování kombinovaného cooldown-aware

Pro každou kombinovanou strategii (je-li povolena) čeká požadavek, který vykrystalizuje 429 na přechodné ochlazení SHORT, a znovu odešle místo vrácení 429 — což se vztahuje na okna TPM/RPM třídy Gemini (~ 60s opakování po) na kombech s více modely, např. oba cíle dosažení limitu komba 2 na model. Ohraničeno `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) v **Nastavení → Resilience** . Nikdy nečeká na důvody `quota_exhausted` (zamčeno do půlnoci) nebo auth/not-found. S nastaveným `comboTimeoutMs` se čekání, které nemůže skončit před tímto termínem, nezačne (#18998): kombo odpoví okamžitě svou terminálovou odpovědí namísto `COMBO_TIMEOUT` 504.

Kombinace se může odhlásit se `config.comboCooldownWaitEnabled: false`. Pouze doslovné `false` deaktivuje tato sdílená kombinovaná čekání (chladicí období po odeslání a čekání circuit-open/model-lock před odesláním) a jejich prodloužení limitu čekání a rozpočtu. Chybějící nebo `true` zachovává globální politiku; `true` nemůže povolit globálně zakázané čekání. Explicitní `targetTimeoutMs` stále vítězí. Toto odhlášení nemění samostatné čekání před odesláním s nativním kódem.

Stejná brána pokrývá případ před odesláním (#16319): když je každý cíl komba přeskočen před provedením jakéhokoli pokusu, protože jeho model je v krátkém přechodném zablokování, cesta nulového pokusu čeká na uzamčení pod stejnými stropy a znovu se odešle, místo aby odpovídala na `503 ALL_TARGETS_SKIPPED` bez náznaku. Když není povoleno žádné čekání (vyčerpání stropu, pokusu nebo rozpočtu nebo funkce vypnuta), odezva terminálu se upgraduje na `429 rate_limit_error` nesoucí `retry_after` / `reset_at` od nejbližšího vypršení přechodného zámku; kvóta, autentizace a nenalezené zámky udržují 503 bez nápovědy.

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

## 7. Opětovné stanovení stavu upstreamu (chybně uvedené chyby kvóty)

**Rozsah:** jedna upstreamová brána, která hlásí dočasné vyčerpání kvóty s nesprávným stavovým kódem HTTP.

**Účel:** opravit zavádějící stav PŘED klasifikací, aby následní příjemci (fallback engine, agregace kombinací, odpověď pro klienta) viděli skutečnou povahu chyby, kterou lze opakovat.

Některé brány signalizují DOČASNÉ vyčerpání kvóty stavem HTTP, který nelze opakovat. `agentrouter.org` vrací `403` (někdy `400`) s čínským tělem
(`用户额度不足` / `额度不足`) namísto standardního `429`. Klienti jako Claude
Code považují `403` za trvalou chybu a ukončí relaci; bez opravy by ji
fallback engine klasifikoval jako `AUTH_ERROR` namísto události kvóty.

**Implementace:**

- Registr a matcher: `open-sse/config/upstreamStatusRestatement.ts` — seznam
  pravidel pro jednotlivé poskytovatele (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), který se vyhodnocuje pomocí
  `applyStatusRestatement()`.
- Místo volání: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (přibližně řádek 3654), bezprostředně poté, co `parseUpstreamError()` zpracuje
  upstreamovou odpověď s chybovým stavem HTTP (`!providerResponse.ok`), a před
  spuštěním jakékoli klasifikace, takže všichni následní příjemci uvidí opravený
  stav. Chyby vložené do streamu SSE `200` procházejí samostatnou, pozdější cestou
  zpracování streamu a dnes nejsou tímto hookem pokryty — jde o známé omezení,
  které zatím není pro chybný stav agentrouteru potřeba (u něj se chyba projeví
  jako chybový stav HTTP).
- Způsobilost k opakování: `429` je v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), takže opravená chyba
  nese skutečné okno pro opakování namísto toho, aby se projevila jako
  neaktivní `403`.
- Syntetická hodnota `60s` v `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  je pouze údaj, který opravená odpověď sděluje **klientovi**; sama o sobě
  nepředstavuje interní dobu ochlazení/zablokování připojení — ta se řídí
  samostatně mechanismem, který opravenou chybu skutečně zpracuje
  (stupňované čekání Connection Cooldown, §2, se základní hodnotou `3s` pro
  poskytovatele s klíči API; nebo Model Lockout, §3, pro poskytovatele s kvótou
  na úrovni modelu, jako je agentrouter). Router může být interně způsobilý
  k opakování dříve než po uplynutí 60sekundového okna, které inzeruje klientovi —
  jde o záměrnou rezervu, nikoli o chybu.

Trvalé chyby (`无权访问模型` u agentrouteru — k tomuto modelu nemáte přístup)
se NIKDY znovu nestanovují: `excludeMarkers` pravidlo zamítne i v případě, že
se shodují `textMarkers`, takže chyba si zachová původní stav a nic ji nebude
opakovat donekonečna. Odpovídající klasifikační pravidlo poskytovatele
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarovaná základní doba ochlazení
`6h`) je kontrolováno funkcí `checkFallbackError`
(`open-sse/services/accountFallback.ts`) _před_ obecným předčasným návratem
kategorie apikey `FORBIDDEN`, podmíněným funkcí
`honorsRuleLockScope(provider)` (#10334 — v současnosti výhradně pro
agentrouter prostřednictvím seznamu povolených poskytovatelů
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v `providerErrorRules.ts`). Deklarovaná
doba ochlazení 6h tohoto pravidla se přenese do `fallbackResult.baseCooldownMs`,
stále však vede přes existující cestu blokování podle kvóty modelu
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, kterou #10334
nezměnil s výjimkou zdroje doby ochlazení): hodnota se omezí na
`mlSettings.maxCooldownMs` operátora (výchozí `1_800_000ms` / 30min), stejně
jako u každého jiného blokování modelu, a _trvalý důvod blokování_ zůstává
stávající napevno zadanou hodnotou `"forbidden"`, nikoli hodnotou `"auth_error"`
z pravidla — od začátku do konce se uplatňuje pouze doba ochlazení, nikoli
řetězec důvodu. Samotné připojení zůstává aktivní; sourozenecké modely na
stejném připojení nejsou ovlivněny.

Opravené chyby kvóty (`额度不足`) se v produkci dostanou k pravidlu poskytovatele
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastní deklarované doby ochlazení — použije se výchozí
škálované čekání persistentní vrstvy). Od #10334 se `scope` v
`ProviderErrorRuleMatch` spotřebovává od začátku do konce, ale **pouze** u
poskytovatelů v seznamu povolených
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — dnes pouze
`"agentrouter"`, podmíněno funkcí `honorsRuleLockScope()`). U všech ostatních
poskytovatelů zůstává `scope` pouze informativní, přesně jako před #10334.
`checkFallbackError` zpřístupňuje rozsah odpovídajícího pravidla jako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je sdílená kontrola, která potvrzuje, že
`ruleScope` je skutečně bezpečné použít jako signál platný pro celé připojení
a umožňující automatické zotavení (rozsah `"connection"`, důvod
`quota_exhausted`, nikdy `permanent`, nikdy `creditsExhausted` — ochrana před
budoucím spojením rozsahu `"connection"` s trvalým stavem účtu). Volají ji
dva příjemci:

- **Perzistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  místo přechodu do větve **per-model** uzamčení passthrough poskytovatele
  (agentrouter má `passthroughModels: true` → `hasPerModelQuota()`
  vrací `true`) použije **dočasné ochlazení připojení** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikdy koncový stav
  (`credits_exhausted`/`banned`/`expired`) — takže se připojení po uplynutí
  ochlazení samo obnoví, místo aby vyžadovalo ruční reset přihlašovacích údajů.
  U připojení s `disableCooling: true` (#2997) se přeskočí: tato možnost
  deaktivace místo toho pokračuje do uzamčení per-model (zdokumentovaný
  kompromis — viz komentář v kódu nad větví).
- **Směrování kombinace v rámci stejného požadavku** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): stejná ochrana označí
  připojení v paměťové sadě `exhaustedConnections`, jejímž klíčem je
  `${provider}:${connectionId}`. To přeskočí pouze zbývající cíl SAME-REQUEST,
  který _sám již obsahuje přesně toto `connectionId`_ ve vlastním objektu cíle
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` před vyhledáním v `exhaustedConnections`) — běžná kombinace
  seznamu modelů, kde sousední cíle nemají vlastní připnuté `connectionId` a
  jedno se řeší až při každém odeslání z hlavičky odpovědi
  `X-OmniRoute-Selected-Connection-Id`, se k tomuto klíči nikdy neshoduje. V
  tomto běžném případě skutečnou ochranou proti tomu, aby zbývající část znovu
  použila právě vyčerpaný účet, NENÍ tato sada — je jí výše uvedená vrstva
  perzistence (připojení má nyní `rateLimitedUntil` v budoucnosti) v kombinaci
  s tím, že stejná ochrana potlačí `transientRateLimitedProviders` pro tuto
  chybu (viz „Dvoustupňový návrh“ a komentář v kódu u větve
  `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`): protože sada
  zůstane neoznačená, vynucené povolení `allowRateLimitedConnection` v
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) se pro
  zbývající části daného poskytovatele NEAKTIVUJE, takže filtr
  `rateLimitedUntil` při výběru přihlašovacích údajů
  (`src/sse/services/auth.ts:1238`) je běžně respektován a zbývající část buď
  vybere jiné, stále způsobilé připojení agentrouter, nebo selže bez dostupných
  přihlašovacích údajů — nevynutí si návrat k připojení, které tato větev právě
  ochladila.

### Dvoustupňový návrh: nové vyjádření stavu a následná klasifikace

Nové vyjádření stavu (`upstreamStatusRestatement.ts`) a pravidla klasifikace
poskytovatele (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) jsou samostatné registry, které obě používají jako klíč
id poskytovatele a textové značky, ale spouštějí se na různých místech a slouží
k různým účelům: nové vyjádření stavu včas přepisuje stav HTTP v
`chatCore.ts`; pravidla klasifikace vybírají záložní `reason` a uzamykají
`scope` (`model` / `provider` / `connection`) uvnitř `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Pravidla klasifikace vidí úplný **text** chyby (nutný pro porovnávání značek
v těle, jako je `额度不足`) pouze u poskytovatelů uvedených na seznamu
`FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — aktuálně pouze
`"agentrouter"`. U každého jiného poskytovatele z **vestavěného katalogu**
předá `checkFallbackError` funkci `getProviderErrorRuleMatch` pouze
strukturovanou chybu (`{code, type}`), což stačí pro pravidla založená na
hlavičkách/stavu/kódu, ale neumožňuje pracovat se značkami v textu těla.
Pomocná funkce `resolveRuleMatchBody()` provádí tento výběr: úplný text chyby
pro poskytovatele na seznamu, jinak strukturovanou chybu. Přidání
**vestavěného** poskytovatele do `FULL_TEXT_RULE_PROVIDERS` je explicitní
opt-in pro daného poskytovatele — existuje proto, aby výchozí cesta pro
každého poskytovatele, který na seznamu není, zůstala bajt po bajtu nezměněná.

`scope` pravidla (`model` / `provider` / `connection`) je samostatný opt-in
nezávislý na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jej pouze
zpřístupní jako `fallbackResult.ruleScope` a následní příjemci jej respektují
jako něco jiného než informativní štítek pouze u poskytovatelů na seznamu
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ve stejném souboru (řízení přes
`honorsRuleLockScope()` — dnes pouze `"agentrouter"`). Informace o tom, co
shoda `scope: "connection"` skutečně provede, jakmile je poskytovatel na tomto
seznamu, najdete výše v části „Nově vyjádřené chyby kvóty“.

**#11104 — pravidla deklarovaná operátorem obcházejí oba seznamy.** Operátor
může za běhu deklarovat pravidlo pro konkrétního poskytovatele prostřednictvím
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`), aniž
by upravoval tento soubor. Řízení pravidla operátora pomocí
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — seznamů
určených k ochraně **výchozího** chování pravidel vestavěného katalogu — by
učinilo mechanismus nastavení neúčinným pro každého poskytovatele kromě těch,
kteří jsou v nich již uvedeni, protože deklarace pravidla je již explicitním
opt-in operátora. `resolveRuleMatchBody()` i `honorsRuleLockScope()` nejprve
kontrolují `hasOperatorRuleForProvider()`: poskytovatel s pravidlem operátora
získá nezpracovaný text chyby a jeho deklarovaný `scope` je respektován bez
ohledu na to, zda se zároveň nachází v některém ze seznamů.

**Pravidla deklarovaná operátorem** (`OperatorProviderErrorRule`): každé pravidlo
má volitelný `status` a volitelný `match` (prostý řetězec bez rozlišení velikosti
písmen v textu chyby, nikdy RegExp, takže nemůže způsobit ReDoS) a musí nastavit
alespoň jeden z nich. Pokud jsou nastaveny oba, použije se mezi nimi AND;
vynechané pole odpovídá čemukoli, takže `{match: "insufficient_quota"}` odpovídá
jakémukoli stavu, který tento kód obsahuje. Vyhraje první odpovídající pravidlo.
`cooldownMs` přijímá hodnotu až 30 dnů; celkem je povoleno nejvýše 50 pravidel.

**Výchozí hodnoty pro všechny případy** (`settings.providerErrorDefaults`, volitelné, nastavované prostřednictvím
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
s `cooldownMs` od 1 minuty do 30 dnů. Výchozí hodnota se použije pouze tehdy, když
se neshodovalo žádné pravidlo operátora ani vestavěné pravidlo katalogu, a pouze pro chyby
402, 403, 408, 429 a 5xx. Chyby tvaru požadavku (400, 404, 409, 413, 422) a samotné
401 si zachovávají vlastní zpracování. Bez explicitního `reason` se důvod odvodí ze
stavu stejným způsobem jako v `classifyError`. Deklarování výchozí hodnoty se pro
`hasOperatorRuleForProvider()` započítává jako pravidlo operátora, takže jeho
`scope` (výchozí hodnota `"connection"`) je respektován. Efektivní cooldown výchozí
hodnoty je delší z jejího `cooldownMs` a vlastního doporučení poskytovatele pro opakování
(`Retry-After`, `x-ratelimit-reset` nebo indikace resetu v těle, tedy stejná indikace,
kterou engine respektuje, když je zapnuté nastavení connection-cooldown „používat
doporučení upstreamu pro opakování“), takže výchozí hodnota může prodloužit krátkou
indikaci upstreamu, ale nikdy nezkrátí skutečný reset. Explicitní pravidlo operátora
zachovává svůj přesný `cooldownMs`. Ani pravidlo, ani výchozí hodnota neobcházejí
ochranné mechanismy connection-cooldown v `markAccountUnavailable`: aktivní, delší
cooldown se nikdy nezkracuje a terminální stav se nikdy nepřepisuje. Vestavěné textové
detektory, které se spouštějí dříve v `checkFallbackError` (vyčerpání kreditů, denní
kvóta, deaktivovaný účet), mají pro své vlastní fráze stále přednost.

**Známá mezera — `providerRuleRegistry` se pro HTTP 400 nikdy nekontroluje.**
Větev `BAD_REQUEST` v `checkFallbackError` klasifikuje stav 400 výhradně
prostřednictvím vlastních polí vzorů (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` atd. v `accountFallback.ts`) a vrací se dříve, než
je dosaženo větve `configuredRule`/`getProviderErrorRuleMatch` výše.
Vestavěné pravidlo katalogu (nebo pravidlo operátora) s `status: 400` je
syntakticky platné, ale nikdy se nespustí. Žádné existující pravidlo dnes necílí
na 400, takže produkce tím není ovlivněna — budoucí pravidlo pro 400 však bude
nejprve vyžadovat úpravu této větve, což je větší změna než přidání pravidla
(překlasifikuje 400 u každého poskytovatele, který se již spoléhá na chování
založené na polích vzorů) a nespadá do rozsahu přidání pravidla pro jediného
poskytovatele.

### Přidání nové gateway zkreslující kvótu

1. Zaregistrujte jedno pole pravidel v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` udržujte
   specifické pro poskytovatele; nikdy znovu nepoužívejte obecné anglické fráze,
   které kolidují s `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Volitelně zaregistrujte klasifikační pravidla v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) a zvolte
   správný rozsah uzamčení (`connection` pro kvótu platnou pro celý účet,
   `model` pro chyby konkrétního modelu). Tento krok se v produkci projeví pouze u
   poskytovatelů, jejichž pravidla potřebují úplný text chyby (značky v těle):
   přidejte id poskytovatele do `FULL_TEXT_RULE_PROVIDERS` ve stejném souboru —
   jinak `checkFallbackError` předá pravidlu pouze strukturovanou chybu
   `{code, type}` a pravidlo založené na textu těla se při živém provozu nikdy
   neshoduje. Pravidla, která se shodují pouze podle `status`/`headers`
   (například pravidla Opencode nebo Minimax), toto povolení nepotřebují.
   Samostatně platí, že pokud pravidlo deklaruje `scope: "connection"` a záměrem
   je skutečný cooldown platný pro celé připojení spolu s přeskočením kombinace
   v rámci stejného požadavku (nikoli pouze informativní štítek), přidejte id
   poskytovatele do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ve stejném souboru —
   tím se řídí použití ve stylu `isAgentrouterConnectionQuotaScope()` v
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) a
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toho `scope`
   stále prochází přes `fallbackResult.ruleScope`, ale nic s ním nepracuje.
3. Přidejte jednotkové testy podle vzoru
   `tests/unit/upstream-status-restatement.test.ts`
   a `tests/unit/agentrouter-error-rules.test.ts` (včetně kontrol
   not-permanent / not-creditsExhausted a — pokud poskytovatel potřebuje
   allowlist — testu ověřujícího, že `resolveRuleMatchBody()` vrací úplný text
   pouze pro daného poskytovatele).

Nejsou potřeba žádné změny v `chatCore.ts`, `classifyError` ani combo.

#### Zámek segmentovaný podle egressu (#10880)

Poskytovatelé v `EGRESS_BUCKETED_LOCK_PROVIDERS` (řada opencode) jsou považováni
za upstream segmentovaný podle IP (bezplatná úroveň opencode je segmentovaná podle
IP, nikoli podle účtu — viz #9611): stav 429 klasifikovaný jako
`quota_exhausted` **nebo** `rate_limit_exceeded` aktivuje cooldown pro každé
připojení z povolené rodiny, jehož poslední známá egress IP odpovídá IP
selhávajícího připojení, ještě předtím, než se rotace pokusí použít tato připojení
— čímž se zabrání N-1 zaručeně neúspěšným voláním upstreamu (stejný princip jako
u #10460/#10525). `rate_limit_exceeded` je zahrnuto záměrně: na cestě
`markAccountUnavailable` se pravidla specifická pro opencode nikdy neshodují
(do `checkFallbackError` se nepředávají žádné hlavičky ani tělo, opencode není v
`FULL_TEXT_RULE_PROVIDERS`), takže 429, jehož tělo obsahuje text o kvótě
předplatného („měsíční limit využití byl dosažen“), je klasifikováno jako
`quota_exhausted` pomocí záložní klasifikace podle textu kvóty
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 hodina)
ještě před dosažením pravidla `status_429` — zatímco 429 bez textu o kvótě
(běžné omezení rychlosti) se klasifikuje pomocí pravidla `status_429` jako
`rate_limit_exceeded` a rodina IP se rovněž ochladí. Pro poskytovatele
z povoleného seznamu je omezení rychlosti podle IP stejným signálem jako
vyčerpaná kvóta. Reálná omezení:

- **Nejlepší možný výsledek**: zámek vyhledá poslední známou `egress_ip` připojení v `proxy_logs` (časové okno 24 hodin, synchronně, bez mezipaměti). Prázdná mezipaměť (`egress_ip` nebyla nikdy zjištěna) nebo žádný řádek → selhávající připojení se stále ochladí větví (zaznamená se stejně jako dnes), pouze se nezamkne žádné sourozenecké připojení.
- **Nikdy terminální**: ochlazení je obnovované kvótové okno
  (`testStatus: "unavailable"`); trvalý stav se nikdy neodvozuje ze signálu na úrovni IP. Připojení `disableCooling` větev zcela přeskočí.
- **Granularita zámku se pro povolenou rodinu mění**: jde o změnu rozsahu, nikoli pouze o optimalizaci sourozeneckých připojení. opencode je poskytovatel `passthroughModels`, takže před touto větví vedla chyba 429 k uzamčení na úrovni MODEL; nyní vede k ochlazení připojení — včetně operátora provozujícího jediné připojení bez jakéhokoli sourozence. To je granularita, kterou tabulka pravidel opencode již označuje jako správnou (`scope: "connection"`, `providerErrorRules.ts`), dosud však nebyla nikdy respektována, protože opencode není v `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Větev sama zapíše ochlazení selhávajícího připojení + `backoffLevel`, čímž napodobí větev agentrouteru s rozsahem připojení, a vrátí se — blokování podle modelu ani obecná cesta níže se nikdy nedosáhnou.
- **Zahrnuta jsou i kombinovaná volání**: stejně jako větev agentrouteru rozsah záměrně ignoruje snížení `persistUnavailableState`/`isCombo`, které volající kombinace aplikuje na chybu 429. Uzamčení podle modelu není slabší formou tohoto rozsahu, ale nesprávnou jednotkou: neříká nic o vyčerpané IP, takže rotace kombinace by nadále spotřebovávala jedno zaručeně neúspěšné volání na každé sourozenecké připojení.
- **Bezpečnost sourozeneckých připojení**: sourozenecké připojení, které je již terminální (banned/credits_exhausted) nebo je již v delším ochlazení, se nikdy nepřepíše.
- **Výhradní seznam povolených**: rozšíření `EGRESS_BUCKETED_LOCK_PROVIDERS` je explicitním rozhodnutím vlastníka; žádné obecné napojení (vzory #10334/#10419). Dotaz na sourozenecká připojení používá stejný seznam povolených připojení namísto jeho opakování jako SQL literálu, takže jeho rozšíření zůstává změnou na jednom řádku.
- **Rotace odchozí IP v obou směrech**: vyhledávací okno (24 hodin) je mnohem širší než TTL mezipaměti odchozí IP (5 minut), takže „poslední známá IP“ představuje historii, nikoli aktuální stav. Pokud proxy připojení během tohoto okna změnila IP, zámek může **minout** skutečně sdílenou IP (zaznamenaná IP je nová a dosud nevyčerpaná) — a symetricky může **ochladit sourozenecké připojení, které se mezitím od vyčerpané IP odpojilo**. Druhý případ toto sourozenecké připojení připraví o jedno okno ochlazení; obě situace jsou akceptovanými omezeními nejlepšího možného výsledku při vyhledávání založeném na historii.
- **Náklady**: dva omezené průchody tabulkou `proxy_logs` (filtrované podle okna prostřednictvím `idx_pl_timestamp`), pouze s frekvencí chyb 429. Žádný nový index (migrace 134 YAGNI). Měřeno na kopii databáze se skutečným provozem střední velikosti; instance s vysokou propustností obsahuje ve stejném okně úměrně více řádků.

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
