# Resilience Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute má tři odlišné, ale související mechanismy odolnosti. Každý má jiný rozsah a účel. Při ladění chování směrování je posuzujte odděleně.

![Třívrstvý model odolnosti](../diagrams/exported/resilience-3layers.svg)

> Zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Jistič poskytovatele

**Rozsah:** celý poskytovatel (např. `glm`, `openai`, `anthropic`).

**Účel:** přestat směrovat provoz k poskytovateli, u kterého opakovaně dochází k selháním na úrovni upstreamu/služby.

**Implementace:**

- Základní třída: `src/shared/utils/circuitBreaker.ts`
- Zapojení: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu: `GET /api/monitoring/health`
- API resetování: `POST /api/resilience/reset`
- Obalové vrstvy: `open-sse/services/accountFallback.ts`
- Databázová tabulka: `domain_circuit_breakers`

**Stavy:**

- `CLOSED` — běžný provoz je povolen
- `DEGRADED` — provoz je stále povolen, ale sleduje se zvýšený počet selhání poskytovatele; vrátí se do stavu `CLOSED` po dostatečném počtu úspěchů, po platném testu připojení nebo po uplynutí nejdelší doby setrvání ve stavu `OPEN` pro poslední typ selhání (jeho hodnota `cooldownByKind`, jinak `resetTimeout`, × `maxBackoffMultiplier`, alespoň jedna doba cooldownu), aniž by došlo k novému selhání
- `OPEN` — poskytovatel je dočasně blokován; kombinované směrování jej přeskakuje
- `HALF_OPEN` — vypršel časový limit resetování; je povolen zkušební požadavek

**Konfigurovatelné výchozí hodnoty (`open-sse/config/constants.ts`, dostupné v Dashboard → Settings → Resilience):**

| Třída   | Degradace při | Otevření při | Časový limit resetování |
| ------- | ------------- | ------------ | ----------------------- |
| OAuth   | 5 selhání     | 8 selhání    | 60s                     |
| API-key | 7 selhání     | 12 selhání   | 30s                     |
| Local   | odvozeno      | 2 selhání    | 15s                     |

`degradationThreshold` určuje, kdy poskytovatel přejde do stavu `DEGRADED`; `failureThreshold` určuje, kdy se jistič otevře a poskytovatel začne být přeskakován. Profily místních poskytovatelů zatím nejsou na stránce nastavení odolnosti dostupné.

**Kódy aktivující jistič:** pouze stavy na úrovni poskytovatele `[408, 500, 502, 503, 504]`. Jistič NEAKTIVUJTE kvůli chybám na úrovni účtu (většina 401/403/429 — ty patří do mechanismu cooldownu nebo uzamčení).

**Líné obnovení:** když vyprší stav `OPEN`, metody `getStatus()`, `canExecute()`, `getRetryAfterMs()` aktualizují stav na `HALF_OPEN`. Stejná čtení (a následující selhání) převedou zastaralý stav `DEGRADED` zpět na `CLOSED`. Není potřeba žádný časovač na pozadí.

---

### Volitelný globální cooldown poskytovatele (omezení podle časového okna)

Čtvrtá, **volitelná** vrstva (`PROVIDER_COOLDOWN_ENABLED`, ve výchozím nastavení
**vypnuta**) uchovává v
`open-sse/services/providerCooldownTracker.ts` napříč požadavky informace o
selhávajících poskytovatelích. Ty se používají při vyhodnocování cílů
kombinovaného směrování, aby po sobě jdoucí kombinované požadavky neprocházely
znovu poskytovatele, který právě selhal. Záznamy na úrovni poskytovatele
respektují omezení podle časového okna z `PROVIDER_PROFILES`:

| Profil   | aktivace po (`providerFailureThreshold`) | během (`providerFailureWindowMs`) | cooldown po dobu (`providerCooldownMs`) |
| -------- | ---------------------------------------: | --------------------------------: | --------------------------------------: |
| OAuth    |                                     `10` |                           `15min` |                                  `5min` |
| Klíč API |                                     `15` |                           `30min` |                                 `10min` |

Pod touto prahovou hodnotou se poskytovatel za poskytovatele v cooldownu
**nepovažuje**; úspěch okno vymaže. Záznamy na úrovni připojení
(`provider:connectionId`) místo toho zachovávají exponenciální prodlevu
`minRetryCooldownMs → maxRetryCooldownMs`. Přepsání:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Ochrana proti regresím: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Doba zklidnění připojení

**Rozsah:** jedno připojení / účet / klíč poskytovatele.

**Účel:** přeskočit jeden nefunkční klíč, zatímco ostatní připojení stejného poskytovatele nadále obsluhují požadavky.

**Implementace:**

- Označení jako nedostupné: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výběr: `getProviderCredentials*` ve stejném souboru
- Výpočet doby zklidnění: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavení: `src/lib/resilience/settings.ts`

**Pole pro každé připojení:**

- `rateLimitedUntil` — časové razítko, do kterého trvá doba zklidnění
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — čítač exponenciálního prodlužování prodlevy

**Výchozí doby zklidnění:**

- Základ pro OAuth: 5 s
- Základ pro klíč API: 3 s
- 429 pro klíč API: přednostně používá upstream hlavičku `Retry-After` / hlavičky pro reset / analyzovatelný text s časem resetu
- Prodlužování prodlevy: `baseCooldownMs * 2 ** failureIndex`

**Ochrana proti efektu thundering herd:** zabraňuje tomu, aby souběžná selhání nadměrně prodlužovala dobu zklidnění nebo zvyšovala `backoffLevel` vícekrát.

**Odpovědi 429 kvůli limitu souběžnosti nezvyšují úroveň prodlevy.** Odpověď `429`, jejíž tělo uvádí
limit souběžnosti („too many concurrent requests“, „concurrency limit“, „parallel request
limit“, GLM `并发数过高`), znamená, že účet je funkční, ale zaneprázdněný.
`checkFallbackError()` vrátí důvod `concurrency_limited`: okamžitě se přepne na další
připojení, toto připojení se zklidní na pevně stanovenou dobu `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) nebo podle
upstream doporučení pro opakování, hodnota `backoffLevel` zůstane beze změny a nastaví se `skipProviderBreaker`.
Explicitní tělo informující o kvótě má stále přednost, takže tělo, které zároveň odpovídá vzoru kvóty, zůstává
vyhodnoceno jako kvóta. Detekce: `looksLikeConcurrencyLimit()` v `src/shared/utils/classify429.ts`;
vyhodnocení: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`
jističe) zůstává beze změny a pro tato těla stále vrací `rate_limit`.

**Zaseknutí obsahu streamu nezpůsobí zklidnění účtu.** Když hlídací mechanismus zaseknutí obsahu
(`open-sse/utils/streamHandler.ts`) ukončí stream, který včas neodeslal žádný výstup modelu,
`markAccountUnavailable()` zaznamená chybu u připojení, ale nenastaví žádnou
dobu zklidnění: zaseknutí se týká daného požadavku a nejčastěji jde o dlouhou fázi uvažování, která zatím nemá
žádný výstup. Operátoři mohou toto chování znovu povolit pomocí `resilienceSettings.streamStallCooldown.enabled`
(výchozí hodnota `false`).

**Rámce uvažování restartují časový rozpočet pro zaseknutí obsahu.** Model uvažování může přemýšlet
několik minut před prvním viditelným tokenem: Claude streamuje rámce `thinking_delta`, jejichž
text uvažování může být prázdný, a rozhraní Responses API streamuje jednu položku uvažování za
druhou. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tyto
rámce rozpozná a hlídací mechanismus při každém z nich restartuje svůj časový rozpočet, místo aby
běh zrušil. Stále však nejde o výstup modelu, takže běh, který skončí pouze uvažováním, je nadále
hlášen jako prázdný, a běh, který přestane uvažovat a odesílá už jen signály o aktivitě, přesto aktivuje
hlídací mechanismus.

Binární rámce `reasoningContentEvent` služby Kiro s neprázdným podpisem zachovávají tuto
aktivitu uvažování při průchodu vykonavatelem jako prázdnou deltu `reasoning_content`. Podpis se
nepředává dál. Metadata, neúplné rámce a prázdné podpisy nerestartují
časový rozpočet obsahu; nezávislý časový limit aktivního streamu a zrušení klientem stále
platí (`open-sse/executors/kiro/reasoning.ts`).

**Koncové stavy (NEJDE o doby zklidnění):**

- `banned` — nastavuje se při detekci zakázaného klíčového slova / zablokování účtu (viz [BAN_DETECTION](../security/BAN_DETECTION.md)) a při třech po sobě jdoucích upstream odmítnutích jednotlivých požadavků (`request_rejected`, např. Anthropic OAuth 403 „Request not allowed“ — `open-sse/services/requestRejectedStreak.ts`); jediné odmítnutí pouze aktivuje dobu zklidnění připojení
- `expired` (po omezeném počtu opakování přejde do koncového stavu — `EXPIRED_RETRY_MAX = 3` s exponenciálním prodlužováním prodlevy — takže se přechodné chyby OAuth mohou samy napravit, než bude účet trvale deaktivován)
- `credits_exhausted`

Tyto stavy přetrvávají, dokud se nezmění přihlašovací údaje nebo je operátor neresetuje. Koncové stavy nepřepisujte přechodným stavem zklidnění.

**Odložené obnovení:** jakmile `rateLimitedUntil` uplyne, připojení se znovu stane způsobilým. Po úspěšném použití `clearAccountError()` vymaže všechna chybová pole.

### Limit využití Claude OAuth: pruh s nižší prioritou + reset limitu relace

**Rozsah:** jedno připojení k předplatnému Claude (OAuth). Obě funkce jsou **volitelné pro každé
připojení** (Upravit připojení → sekce Claude → `lowPriorityMode` / `autoLimitReset` v
`providerSpecificData`, obě jsou ve výchozím nastavení vypnuté) a odpovídají příkazům `/low-priority` a
`/limit-reset` nástroje Claude Code (komunikační kontrakt zachycen z Claude Code 2.1.263).

**Implementace:**

- Stavový automat + klasifikace odpovědí: `open-sse/services/claudeLowPriority.ts`
- Klient pro stav resetu / jeho nárokování: `open-sse/services/claudeLimitReset.ts`
- Hook vykonavatele (vložení hlavičky + opakování se stejným účtem): `open-sse/executors/base.ts::execute()`
- Uložení volitelného nastavení: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spouštěč:** pětihodinový limit využití — odpověď `429`, jejíž hlavičky obsahují
`anthropic-ratelimit-unified-status: rejected` a, pokud je účet způsobilý,
`anthropic-ratelimit-unified-slow-offer: treatment`. Před první odpovědí 429 způsobenou tímto limitem se nic
neodesílá; nárazová odpověď 429 bez sjednocených hlaviček projde běžnou cestou zklidnění.

**Pruh s nižší prioritou** (`lowPriorityMode`):

- Při 429 na limitu executor nabídku přijme a okamžitě zopakuje požadavek se **stejným**
  účtem a hlavičkou `anthropic-usage-limit: slow`; režim zůstane aktivní až do oznámeného
  času `anthropic-ratelimit-unified-reset` (+60s rezerva) a každý požadavek v tomto intervalu
  tuto hlavičku obsahuje. Zachycená odpověď 429 se nikdy nedostane do `handleChatCore`, takže
  připojení **není** uvedeno do režimu cooldown ani nahrazeno jiným.
- `anthropic-ratelimit-unified-slow-status` v pozdějších odpovědích: `active` / `not_needed`
  zachovají režim; `slot_busy` (429) nebo `529` počkají po dobu určenou serverem v
  `anthropic-ratelimit-unified-slow-retry-after` (výchozí 20s, omezení na 5–600s, náhodná
  odchylka ±30 %) a pokus zopakují, s horním limitem daným
  `anthropic-ratelimit-unified-slow-max-wait` (výchozí 20 min, omezení na 1 min–6 h) — po
  jeho překročení režim skončí a 10minutová ochranná lhůta zabrání jeho opětovnému přijetí.
  Čekání je navíc omezeno zbývající dobou vlastního časového limitu požadavku pro zahájení
  upstream komunikace (`resolveFetchStartTimeout`, ve výchozím nastavení 10 min) po odečtení
  5s rezervy: bez tohoto omezení by výchozí maximální čekání 20 minut přežilo samotný požadavek
  a uspání by bylo přerušeno během čekání, což by vedlo k vyvolání `TimeoutError` namísto
  korektního ukončení `max_wait` a následné ochranné lhůty.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, přechod 5hodinového okna nebo
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (což režim při libovolném
  stavu ukončí jako `extra_usage`, protože placené překročení nyní limit pokrývá) režim ukončí;
  odpověď pak pokračuje standardní cestou cooldownu. Stav `budget_exhausted` se pamatuje až do
  oznámeného resetu rozpočtu (≤ 8 dní).
- Kontrola limitu probíhá po vlastních opakovaných pokusech executoru v rámci jednoho pokusu,
  vyvolaných odpovědí 400 (úprava kontextu, omezení přemýšlení/úsilí, automatické učení parametrů),
  takže odpověď 429 na limit, která se objeví až při jednom z těchto opakovaných pokusů, je stále
  zachycena, místo aby se dostala do cesty cooldownu.
- Stav je uložen v paměti pro každé připojení (restart způsobí jednu dodatečnou odpověď 429 na
  limit nutnou k opětovnému přijetí).

**Reset limitu relace** (`autoLimitReset`, zkouší se před režimem, pokud jsou zapnuty oba):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  když platí `arm: "reset"` a `available: true`, odešle se
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizace z
  `providerSpecificData.organizationUUID`, záložně z bootstrapu).
- `result: reset|not_limited` → požadavek se zopakuje plnou rychlostí (bez hlavičky pro pomalý
  režim). `already_used` / `not_offered` uloží do paměti `next_available_at` (výchozí jeden
  týden); jakékoli selhání aktivuje 15minutový backoff. Reset je možný jednou týdně a stále se
  započítává do týdenního limitu.

Regresní kontroly: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinita relace (#7274)

**Rozsah:** jedna klientská relace (hlavička `X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session`) připnutá k jednomu připojení pro **libovolného** poskytovatele.

**Účel:** udržet vícekolového agenta (Claude Code, aider, vlastní agenty) na stejném účtu napříč
požadavky, čímž se omezí ztráta kontextu mezi účty a opakované odpovědi 429 při studeném startu
u poskytovatelů se stavem relace vázaným na účet.

**Implementace:**

- Určení TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Výběr/vytvoření připnutí: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrakce hlavičky (obecná, pro libovolného poskytovatele): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Perzistentní tabulka připnutí: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavení: `sessionAffinityTtlMs` (globální TTL v ms, `0` vypíná) — `src/lib/db/settings.ts`.
  Přejmenováno z nastavení `codexSessionAffinityTtlMs`, určeného pouze pro Codex, migrací
  `124_generic_session_affinity_ttl.sql`, která převede dříve nakonfigurované TTL pro Codex na
  novou výchozí hodnotu.

Před #7274 funkce `resolveSessionAffinityTtlMs()` okamžitě vracela `0` pro každého poskytovatele
kromě `codex`, takže nastavení TTL (ani hlavičky relace) nemělo nikde jinde žádný účinek, přestože
mechanismus připínání i extrakce hlaviček již byly na poskytovateli nezávislé. Oprava tento
předčasný návrat odstranila; TTL se nyní po globálním nastavení nad `0` používá jednotně pro
každého poskytovatele.

Tyto tři hlavičky afinity relace se nikdy nepředávají upstream — executory vytvářejí vlastní
upstream hlavičky od začátku, namísto aby předávaly klientské hlavičky, takže zůstávají pouze
interním korelačním ID.

### Výhradní pronájmy připojení pro spravované relace

**Rozsah:** jeden aktivní spravovaný HTTP klient / jedna relace vlastní jedno způsobilé připojení
OmniRoute.

**Účel:** poskytovat trvalé výhradní vlastnictví připojení klientům, kteří mezi požadavky potřebují
pevnou hranici směrování. Tím se liší od afinity relace, která představuje pouze měkkou preferenci
kontinuity: výhradní pronájem uchovává stav životního cyklu v SQLite, vynucuje globální jedinečnost
aktivního vlastníka i aktivního připojení a odmítá zastaralou generaci před předáním poskytovateli.

Funkce je volitelná pro jednotlivé API klíče. Spravovaný klíč musí mít oprávnění
`lease:exclusive` a explicitní neprázdný seznam `allowedConnections`. Koncový bod životního cyklu
může používat libovolný HTTP klient; není vyžadován název klienta, user-agent, poskytovatel, metoda
OAuth ani model. Pronájem vlastní připojení, nikoli model, takže změna modelu zachová vazbu, dokud
připojení zůstává běžně způsobilé. Standardní pravidla pro model, kvótu, stav, cooldown a seznam
povolených připojení zůstávají rozhodující a mohou stejnou generaci převést na jiné volné způsobilé
připojení.

Životní cyklus probíhá přes `POST /api/v1/session-leases` s akcemi JSON `acquire`, `renew` a `release`.
Spravované požadavky na inferenci předávají neprůhlednou hodnotu `X-OmniRoute-Lease-Owner` a přesnou
hodnotu `X-OmniRoute-Lease-Generation`. Vlastník používá prefix `vlo_` následovaný 43 znaky base64url; ukládá se
pouze jeho hash SHA-256. Každá finální pojistka odeslání také váže ID ověřeného klíče API a
ID aktivního připojení. Řídicí hlavičky pronájmu jsou odstraněny z protokolů, uchovávaných snímků požadavků a
hlaviček upstreamového vykonavatele.

Pokud má běžné směrování způsobilé spravované kandidáty, ale každý volný kandidát je obsazen
cizím aktivním pronájmem, OmniRoute vrátí HTTP `429`, kód lease-capacity-unavailable, stav
waiting-for-capacity a omezenou hodnotu `Retry-After` odvozenou od nejbližšího relevantního vypršení platnosti.
Běžný případ prázdné množiny způsobilých kandidátů není kolizí pronájmů a zachovává stávající sémantiku chyb směrování.

Související mechanismy zůstávají oddělené:

- Obsazení relace OAuth představuje procesně lokální měkkou distribuci pro účty OAuth.
- Semafory účtů udělují oprávnění k souběžnému zpracování požadavků a končí po dokončení požadavku.
- Výhradní spravované pronájmy relací představují trvalé vlastnictví v rámci životního cyklu s generační pojistkou.

---

## 3. Uzamčení modelu

**Rozsah:** trojice poskytovatel + připojení + model.

**Rozsah klíče podle stavu:** chybový stav určuje, do kterého klíče se uzamčení
zapíše (`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signál kvóty nebo oprávnění — uzamkne **rodinu kvót**:
  u codexu celý rozsah `codex` / `spark` (každý model `gpt-5*` daného
  připojení), u ostatních poskytovatelů `getQuotaScopedModelForProvider()`.
- `404` uzamkne samotný model (`getModelLockKey()` zužuje `not_found`).
- Jakýkoli jiný stav — selhání přenosu/serveru `5xx` a vlastní stav `502`
  syntetizovaný OmniRoute při ověřování kvality — uzamkne pouze **přesnou**
  trojici poskytovatel/připojení/model. Vadný stream u jednoho modelu není důkazem
  o kvótě účtu; před zavedením tohoto pravidla jedna prázdná odpověď modelu
  `codex/gpt-5.6-luna` odstranila z routování každý model `gpt-5*` daného
  připojení na 2–30 min (s postupným prodlužováním), přestože jeho kvóta zůstala nedotčena.
- Explicitní možnost `scope` zadaná volajícím má vždy přednost (Antigravity předává `"exact"`).

**Účel:** zabránit deaktivaci celého připojení, když je nedostupný nebo omezený kvótou pouze jeden model.

**Příklady:**

- Poskytovatelé s kvótou pro jednotlivé modely vracející stav 429
- Lokální poskytovatelé vracející stav 404 pro jeden chybějící model
- Selhání oprávnění specifická pro režim/model poskytovatele (např. režimy Grok)

**Implementace:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Řídicí panel dob vyřazení modelů (v3.8.0)

Uživatelské rozhraní: Nastavení → Doby vyřazení modelů (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Uvádí aktivní uzamčení s těmito údaji: poskytovatel, připojení, model, důvod, expiresAt. Operátoři mohou model na kartě ručně znovu povolit.

**REST API:**

- `GET /api/resilience/model-cooldowns` — výpis aktivních uzamčení
- `DELETE /api/resilience/model-cooldowns` — ruční opětovné povolení. Tělo: `{provider, connection, model}`. Autorizace: správa.

### Správce dob vyřazení

Uživatelské rozhraní: Monitorování → Správce dob vyřazení (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stránka pro každé připojení, které je z přechodného důvodu vyřazeno z routování, namísto
otevírání stránky každého poskytovatele. Uvádí doby vyřazení připojení, uzamčení modelů a terminální
stavy; umožňuje je vymazat pro jednotlivá připojení, pro výběr nebo pro všechna připojení poskytovatele
a upravovat nejčastěji laděná pravidla dob vyřazení: `streamStallCooldown.enabled` a základní dobu
vyřazení `connectionCooldown` a maximální počet kroků prodlužování pro OAuth / klíč API (ukládáno prostřednictvím
`PATCH /api/resilience`). Terminální stavy (`banned`, `expired`, `credits_exhausted`) jsou
uvedeny, ale nikdy se zde nemažou.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autorizace: správa):

- `GET /api/resilience/cooldowns[?provider=]` — připojení se stavem, zbývající dobou vyřazení,
  úrovní prodlužování, typem poslední chyby a uzamčeními modelů (bez přihlašovacích údajů)
- `POST /api/resilience/cooldowns` — tělo `{connectionIds: string[]}` nebo
  `{all: true, provider?}`; vrací `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Uživatelské rozhraní nastavení uzamčení + obnova s poklesem po úspěchu (v3.8.23)

Uzamčení modelu se změnilo z vždy aktivního, pevně zakódovaného chování na plně konfigurovatelnou,
volitelně aktivovanou funkci s vlastní kartou nastavení a samoopravným postupem obnovy.

**Karta nastavení:** Nastavení → Uzamčení modelu
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ta se **liší** od výše uvedené karty `ModelCooldownsCard` pouze pro čtení (která jen
_vypisuje_ aktivní uzamčení) — nová karta _konfiguruje parametry_. Výchozí hodnoty
jsou uvedeny v `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavení               | Výchozí hodnota                  | Význam                                                                  |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | Hlavní přepínač — uzamčení modelu je **ve výchozím nastavení vypnuto**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stavy nadřazené služby, které se počítají jako selhání vázané na model. |
| `baseCooldownMs`        | `120_000` (120 s)                | Počáteční doba uzamčení při prvním selhání.                             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Horní mez postupně prodlužované doby vyřazení.                          |
| `maxBackoffSteps`       | `10`                             | Maximální počet kroků exponenciálního prodlužování.                     |
| `useExponentialBackoff` | `true`                           | Zda opakovaná selhání exponenciálně prodlužují dobu vyřazení.           |

Nastavení se uchovávají prostřednictvím běžného úložiště nastavení a ověřují pomocí
schématu nastavení odolnosti; karta omezuje hodnoty `baseCooldownMs`/`maxCooldownMs`
(přičemž `maxCooldownMs ≥ baseCooldownMs`) a `maxBackoffSteps`.

**Obnova s poklesem po úspěchu:** obnova **není** založena čistě na vypršení časovače. Zdravá
odpověď postupně snižuje počet selhání modelu, takže se u modelu, který se zotavil
uprostřed časového okna, přestane doba prodlužovat (a uzamčení se odstraní) ještě před vypršením časovače. Při úspěšném
cíli kombinace volá `open-sse/services/combo.ts` funkci `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), která **sníží na polovinu** uloženou hodnotu
`failureCount` (`Math.floor(failureCount / 2)`); jakmile dosáhne hodnoty `0`, položka
uzamčení se zcela odstraní. Protějšek `recordModelLockoutFailure()`
zvyšuje počet (a prodlužuje dobu vyřazení) při selháních v rámci
okna prodlužování. Tento pokles po úspěchu doplňuje prosté vypršení časovače —
model může znovu povolit kterákoli z těchto cest.

**Stav:** uzamčení jsou uchovávána **v paměti** (mapy `Map` pro jednotlivé procesy obsahující
`ModelLockoutEntry` s klíčem `provider:connectionId:model`, uzamčení s přesným rozsahem s klíčem
`provider:connectionId:exact:model`), neukládají se do
databáze — při restartu se ztratí. _Nastavení_ se ukládají trvale; aktivní
_stav_ uzamčení je dočasný.

---

## 4. Řízení souběžnosti Quota-Share (v3.8.36)

Účty s předplatným (GLM, MiniMax atd.) často přijímají pouze ~1–3 souběžné
požadavky; překročení tohoto počtu způsobuje odpovědi 429 a období čekání. Tento
problém je obzvlášť výrazný u kombinací **quota-share** (`qtSd/…`), kde několik
API klíčů sdílí jeden upstreamový účet. Zahlcení sdíleného účtu zabraňují tři
vrstvy.

### Limit souběžnosti pro připojení (`max_concurrent`)

Každé připojení poskytovatele může deklarovat horní limit `max_concurrent`
(`provider_connections.max_concurrent`, nastavený v dialogu připojení / API / DB).
Pokud limit nechcete, ponechte hodnotu prázdnou. Jde o jediný parametr, který řídí
níže uvedenou serializační vrstvu — nastavte jej na skutečnou souběžnost účtu
(např. GLM ~1, MiniMax ~2).

### Limity souběžnosti pro jednotlivé modely (`modelConcurrency`)

Připojení může navíc deklarovat přesné limity souběžnosti pro jednotlivé modely
ve své mapě `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nastavte je v dialogu připojení (**Přepsání limitů rychlosti → Limity
souběžnosti pro jednotlivé modely**, jeden záznam `model=cap` na řádek) nebo
pomocí `PATCH /api/providers/[id]` se stejnou strukturou JSON. Význam klíčů:

- **Pro celé připojení vs. pro konkrétní model:** `maxConcurrent` zůstává
  sdíleným limitem pro celé připojení. Pokud se uplatňují oba limity, obě brány
  se získají atomicky v rámci stejné složené brány
  (`global → provider → account → model`); výsledné chování určuje přísnější
  použitelný limit.
- **Přesná shoda klíče modelu:** klíčem je řetězec modelu předaný vykonavateli
  po vyhodnocení směrování — obvykle samotné upstreamové ID modelu (`glm-5`),
  nikoli klientský alias `provider/model` (`zai/glm-5` se neshoduje s
  `glm-5`). Hodnoty představují kladná celočíselná omezení počtu souběžných
  požadavků.
- **Místní řazení do fronty, bez zjišťování:** nadbytečné požadavky se řadí do
  místní fronty se stávající sémantikou fronty a časového limitu (typované chyby
  přijetí `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nezjišťuje
  ani neodvozuje upstreamová pravidla — vynucuje přesné limity nakonfigurované
  provozovatelem. Nasycená brána modelu nikdy nevypne poskytovatele ani nevytvoří
  trvalé uzamčení modelu; chování při upstreamových odpovědích
  429 / obdobích čekání / záložním směrování zůstává poslední pojistkou.
- **Rozsah pro připojení a proces:** limity se vztahují na jednotlivá databázová
  připojení a uchovávají se v paměti, takže dvě připojení používající stejný
  upstreamový API klíč se navzájem nekoordinují.
- **Bez konfigurace beze změny:** vynechání mapy (nebo ponechání pole v řídicím
  panelu prázdného) nepřidá žádnou bránu modelu. Příklad konfigurace, která
  nepředpokládá žádný univerzální limit poskytovatele:

```text
glm-5=1
glm-4.7=3
```

### Serializace požadavků Quota-Share

Když je požadavek quota-share směrován na připojení, které deklaruje kladnou
hodnotu `max_concurrent`, souběžné požadavky na tento **účet** se serializují
prostřednictvím semaforu pro dané připojení (klíč `qsconn:<connectionId>`):
nadbytečné požadavky **čekají ve frontě**, místo aby účet zahltily. Mechanismus
je **fail-open** — při nasycené frontě nebo vypršení časového limitu požadavek
pokračuje bez získání slotu, místo aby byl požadavek, který lze odbavit, odmítnut.
Přepínač se nachází v části **Nastavení → Odolnost → Souběžnost Quota-Share pro
jednotlivá připojení**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ve výchozím nastavení
zapnuto). Bez limitu `max_concurrent` zůstává chování beze změny.

> Směrovací brána quota-share (`selectQuotaShareTarget`, DRR + P2C) je sama
> typu fail-open a připojení na hranici kapacity pouze _sníží prioritu_ — ve
> fondu s jediným připojením nemůže stanovit pevný limit, takže záplavu požadavků
> skutečně omezuje až tento semafor.

### Opakování s ohledem na období čekání kombinace

U každé strategie kombinací (je-li povolena) požadavek, který by vedl ke konečné
odpovědi 429 kvůli KRÁTKÉMU přechodnému období čekání, vyčká na jeho skončení a
znovu se odešle, místo aby vrátil odpověď 429 — to pokrývá okna TPM/RPM třídy
Gemini (~60s retry-after) u kombinací více modelů, například když oba cíle
kombinace dvou modelů narazí na limit rychlosti konkrétního modelu. Chování je
omezeno nastavením `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) v části **Nastavení → Odolnost**. Nikdy nečeká při důvodu
`quota_exhausted` (uzamčeno do půlnoci) ani při důvodech souvisejících s
ověřením či nenalezením.

Stejná brána pokrývá případ před odesláním (#16319): pokud se všechny cíle
kombinace přeskočí ještě před provedením jakéhokoli pokusu, protože jejich model
je v krátkém přechodném uzamčení, cesta s nulovým počtem pokusů v rámci stejných
limitů vyčká na skončení uzamčení a požadavek znovu odešle, místo aby odpověděla
stavem `503 ALL_TARGETS_SKIPPED` bez doplňujících údajů. Pokud čekání není
povoleno (vyčerpání limitu, počtu pokusů či rozpočtu nebo vypnutá funkce),
koncová odpověď se změní na `429 rate_limit_error` a obsahuje `retry_after` /
`reset_at` z nejbližšího vypršení přechodného uzamčení; uzamčení kvůli kvótě,
ověření nebo nenalezení nadále vracejí odpověď 503 bez doplňujících údajů.

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

## 5. Řízení přijímání požadavků do fronty (v3.8.49 · issue #6593)

**Rozsah**: místní fronta pro omezení rychlosti pro každou kombinaci poskytovatele a připojení (`open-sse/services/rateLimitManager.ts`,
založená na Bottlenecku), která se nachází jednu vrstvu pod třemi výše uvedenými mechanismy.

**`maxWaitMs` omezuje čekání ve frontě; `executionMaxWaitMs` omezuje provádění.**
Tyto dvě hodnoty jsou záměrně oddělené a žádná z nich neovlivňuje druhou.

`resilienceSettings.requestQueue.maxWaitMs` je **časový limit čekání ve frontě**:
zahrnuje čekání na uvolnění slotu poskytovatele a následný pobyt ve stavu QUEUED.
Jeho časovač se zruší v okamžiku, kdy úloha opustí stav QUEUED a začne se provádět
(`rateLimitManager.ts`, `wrappedFn`). Požadavek, který tento limit překročí, se
nikdy nedostane k upstreamu. Výchozí hodnota je 30000ms, poskytovaná konstantou
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` v `src/lib/resilience/settings.ts` a
zafixovaná testem `tests/unit/ratelimit-admission-control-6593.test.ts`, takže
její změna způsobí selhání tohoto testu, místo aby tento odstavec nenápadně
zastaral.

`resilienceSettings.requestQueue.executionMaxWaitMs` je hodnota, kterou
Bottleneck obdrží jako `expiration` úlohy; její časovač se spustí až po
odeslání úlohy. Slouží jako pojistka pro vykonavatele bez vlastního časového
limitu upstreamu a zvýší se na vlastní časový limit vykonavatele pro zahájení
načítání, pokud je tento limit delší, takže nemůže přerušit korektně probíhající
odpověď. Výchozí hodnota je 600000ms (10 min).

Předávání časového limitu fronty do `expiration` dříve způsobovalo ukončování
neinkrementálních bran během zpracování — ty mohou oprávněně běžet několik
minut, než dorazí první bajty — a proto se vypršení platnosti hlásí jako `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), zatímco časový limit fronty používá
kód časového limitu fronty. Obě hodnoty lze přepsat prostřednictvím
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (proměnné
prostředí) nebo na řídicím panelu (**Nastavení → Odolnost**). Při normalizaci
jsou obě omezeny na rozsah 1ms–24h.

**Priorita pro obě hodnoty:** proměnná prostředí poskytuje pouze _výchozí_
hodnotu. Hodnota uložená v `resilienceSettings.requestQueue` (řídicí panel /
úprava přes API, uložená v `key_value`) má přednost a hodnota
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pro konkrétní připojení
má přednost i před ní. Nastavení proměnné prostředí v nasazení, které již
obsahuje uloženou hodnotu, proto nic nezmění — místo toho uložené nastavení
vymažte nebo aktualizujte.

Dobu pobytu ve frontě omezuje `maxWaitMs`; níže uvedené `maxQueueDepth` omezuje,
kolik volajících může být současně zařazeno do fronty.

**Opakování požadavků určené tělem odpovědi: řízení tempa vs. uzamčení.** Tělo
odpovědi 429 může uvádět vlastní dobu čekání (Gemini `RetryInfo.retryDelay`,
text „retry after Ns“), kterou čte `updateFromResponseBody`. Doba čekání, která
se vejde do `maxWaitMs` daného připojení, slouží k řízení tempa: limiter na tuto
dobu vyprázdní svůj rezervoár a požadavky ve frontě se odešlou po jeho
doplnění. Dobu čekání delší než `maxWaitMs` fronta nemůže jednoduše přečkat —
Gemini odpovídá na vyčerpanou denní kvótu hodnotou `retryDelay: "86399s"`.
Předané `Retry-After` v nově sestavené odpovědi 429 (#16528) již způsobí, že
záložní mechanismus model na dané období uzamkne, ale současné pozastavení
limiteru by přesto zablokovalo každý požadavek, který se ke klíči dostane
předčasně (například po resetování odolnosti), na celou dobu `maxWaitMs`. Pokud
taková doba čekání pochází z typovaného detailu Google `RetryInfo` (provenience
`google_rpc_retry_info`) a limiter klíče je již omezen na model (viz
`getLimiterKey`), odpověď 429 se místo toho změní na uzamčení modelu pro dané
připojení (`lockModelForLongBodyRetry` v
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, omezené na 24h) a
limiter zůstane nepozastavený. Výběr účtu takové uzamčení přeskočí
prostřednictvím `isModelLocked()` a totéž udělá předodesílací brána kombinace
pro cíle připnuté k danému připojení. U antigravity, jehož limiter platí pro
celou rodinu kvót, se uzamčení vztahuje na konkrétní model stejně jako ostatní
uzamčení kvót. Pokud alias odkazuje na daný model, uzamkne se také název
požadovaný klientem, protože tyto kontroly používají požadovaný název; uzamčení
je přesné (`lockExactModel`), takže alias přesahující rodinu kvót antigravity
nebo rozsah codex nikdy neuzamkne sám sebe. Textová nápověda, netypované
`retryDelay` nebo limiter sdílený celým připojením zachovávají pozastavení.
Pokud se limiter, který cesta zpracování odpovědi 429 právě znovu sestavila,
skutečně pozastaví, volající, jehož zbývající čas ve frontě skončí před koncem
pozastavení, je okamžitě odmítnut s kódem časového limitu fronty
(`checkLimiterPause`), namísto aby tuto dobu vyčkával; zaznamenaný konec je
ukotven před sestavením limiteru, kdy Bottleneck spouští hodiny obnovení, a
jakákoli pozdější změna rezervoáru jej zapomene. Pokryto testy
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` a
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — volitelný limit přijímání (novinka).** `resilienceSettings.requestQueue.maxQueueDepth`
omezuje počet požadavků, které mohou současně čekat ve frontě (dosud nebyly
odeslány) pro jednu kombinaci poskytovatele a připojení. Pokud již fronta
obsahuje `maxQueueDepth` požadavků, nový požadavek je rychle odmítnut typovanou
chybou `code: "RATE_LIMIT_QUEUE_FULL"` **ještě předtím**, než se vůbec dostane
do `limiter.schedule()` — odmítnutí je tedy levné a proběhne před jakoukoli
následnou kompresí promptu / překladovou prací pro daný požadavek. Výchozí
hodnota `0` = vypnuto, čímž se zachovává stávající chování neomezené fronty;
rozsah je omezen na 0–100000. Hodnotu lze přepsat prostřednictvím
`RATE_LIMIT_MAX_QUEUE_DEPTH` (proměnná prostředí) nebo
`resilienceSettings.requestQueue.maxQueueDepth` (řídicí panel / úprava přes
API).

Samotná kontrola přijetí je čistá funkce
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), takže
ji lze jednotkově testovat bez skutečného limiteru Bottleneck.

> RFC, které otevřelo #6593, také navrhovalo příznak `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` v tomto repozitáři provádí
> kompresi promptu/kontextu v odchozím požadavku na LLM (`chatCore.ts`,
> přibližně v bloku `resolveCompressionSettings`/`selectCompressionStrategy`),
> nikoli kompresi HTTP odpovědi u vygenerovaných těl odpovědí 429 — pro doslovný
> příznak obcházení neexistuje odpovídající cesta v kódu. Tento krok komprese
> promptu navíc v současnosti probíhá _před_ `withRateLimit()` v pipeline
> požadavku, takže změna pořadí za účelem jeho přeskočení při odmítnutí kvůli
> plné frontě představuje samostatnou, rozsáhlejší změnu přesahující rámec
> tohoto problému; záměrně zde **nebyla** implementována a je ponechána jako
> následný úkol pro případ, že úspora výkonu CPU převáží nad rizikem změny pořadí.

### Pojistka automatického zapnutí ochrany proti překročení limitu a ochrana připojení (`rateLimitProtection`)

**Pojistka automatického zapnutí** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, výchozí hodnota `true`):
Ve výchozím nastavení OmniRoute automaticky zapíná ochranu frontou proti překročení limitu pro všechna aktivní připojení poskytovatelů používající klíč API (`getProviderCategory(provider) === "apikey"`). Tím se zajistí, že příchozí požadavky na klíče API upstream služeb citlivé na četnost požadavků budou pomocí Bottleneck řazeny do fronty a omezovány, namísto toho, aby nárazově způsobovaly chyby 429 upstream služby. Pojistku lze přepsat pomocí proměnné prostředí `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` ji vypne, `true`/`1`/`on` ji vynuceně zapne), která má přednost před nastavením uloženým prostřednictvím řídicího panelu (**Nastavení → Odolnost** / `PATCH /api/resilience`).

**Sémantika `rateLimitProtection` pro jednotlivá připojení:**
Ochrana proti překročení limitu pro jednotlivá připojení je evidována prostřednictvím booleovského pole `rateLimitProtection` u připojení poskytovatelů (v SQLite uloženého jako `rate_limit_protection`):

- **Výslovně zapnuto (`rateLimitProtection === true`)**: Ochrana proti překročení limitu je pro toto připojení výslovně zapnuta bez ohledu na kategorii poskytovatele nebo na to, zda je zapnutá pojistka automatického zapnutí.
- **Výslovně vypnuto (`rateLimitProtection === false`)**: Vypne explicitní ochranu, ale **nevyjme** aktivní připojení používající klíč API z globální pojistky automatického zapnutí. V `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) jsou `false` a `undefined` rovnocenné: pouze `rateLimitProtection === true` se považuje za explicitní přepsání. Pokud je `rateLimitProtection` nastaveno na `false` (nebo není nastaveno), aktivní připojení používající klíč API nadále splňuje podmínku automatického zapnutí a zůstává chráněno proti překročení limitu.
- **Bez možnosti vypnutí pro jednotlivá připojení**: Provozovatel v současnosti nemůže vyjádřit požadavek „toto jedno aktivní připojení používající klíč API musí fungovat bez ochrany frontou proti překročení limitu“, zatímco pro ostatní zůstane automatické zapnutí aktivní. Aby připojení používající klíč API fungovala zcela bez front pro ochranu proti překročení limitu, musí být pojistka vypnuta globálně (`RATE_LIMIT_AUTO_ENABLE=false` nebo `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podporované cesty pro zápis:**

- **`POST /api/rate-limits`**: Podporovaná cesta pro správu a přepínání `rateLimitProtection` u připojení (`{ connectionId: string, enabled: boolean }`). Volání s `enabled: true` zapne explicitní ochranu; volání s `enabled: false` explicitní ochranu odstraní (aktivní připojení používající klíč API však zůstanou chráněna globální pojistkou, pokud je automatické zapnutí aktivní).
- **`PUT /api/providers/[id]`**: Záměrně nepřijímá ani nepřepíná `rateLimitProtection` (#11278). Aktualizace metadat připojení poskytovatele prostřednictvím `PUT /api/providers/[id]` nikdy nezmění uložený stav ochrany proti překročení limitu.

---

## 6. Hlídací mechanismus propustnosti pomalého streamu (#9709)

Volitelný ochranný mechanismus `resilienceSettings.streamRecovery.throughputWatchdog` detekuje
upstream, který stále odesílá části dat, ale produkuje výstup asistenta pod
nakonfigurovanou mírou užitečného výstupu. Záměrně se liší od časového limitu nečinnosti:
signály heartbeat ani metadata neresetují žádný z časovačů a nepovažují se za pokrok. Liší se také
od pevného termínu pokusu (#9153), který zůstává absolutním bezpečnostním
limitem bez ohledu na kvalitu výstupu.

Hlídací mechanismus vyžaduje období zahřívání následované úplným klouzavým oknem, než
může operaci přerušit. Počítá textové rozdíly z výstupních událostí rozhraní Chat Completions
a Responses API (konzervativní aproximace počtu bajtů UTF-8), ignoruje události obsahující pouze údaje
o využití a prázdné události a pozastavuje vyhodnocování, dokud probíhají události volání nástrojů
nebo uvažování. Ve výchozím nastavení je vypnutý a lze jej povolit pomocí
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; okno, období zahřívání, minimální rychlost
a minimální měřitelný výstup jsou omezeny standardní normalizační vrstvou nastavení odolnosti.

Je-li hlídací mechanismus povolen, jeho přerušení se použije pouze na aktivní pokus upstreamu. Před
odesláním jakýchkoli bajtů viditelných klientem může stávající cesta časného obnovení v rámci stejného účtu
pokus znovu otevřít. Po potvrzení není stream nikdy slepě přehrán znovu; příponu může spojit
pouze stávající bezpečný kontrakt pro pokračování uprostřed streamu. Finalizace zůstává
jednorázová, takže se účtování využití ani uvolnění semaforu neduplikuje.

---

## 7. Přeznačení stavu upstreamu (chybně uvedené chyby kvóty)

**Rozsah:** jedna upstreamová brána, která hlásí dočasné vyčerpání kvóty s nesprávným stavem HTTP.

**Účel:** opravit zavádějící stav PŘED klasifikací, aby downstreamoví spotřebitelé (fallback engine, agregace combo, odpověď předávaná klientovi) viděli skutečnou opakovatelnou povahu selhání.

Některé brány signalizují DOČASNÉ vyčerpání kvóty stavem HTTP, u kterého nelze požadavek
opakovat. `agentrouter.org` vrací `403` (někdy `400`) s čínským tělem
(`用户额度不足` / `额度不足`) namísto standardního `429`. Klienti jako Claude
Code považují `403` za trvalou chybu a relaci ukončí; bez opravy by ji
fallback engine klasifikoval jako `AUTH_ERROR` namísto události
související s kvótou.

**Implementace:**

- Registr + porovnávání: `open-sse/config/upstreamStatusRestatement.ts` — seznam
  pravidel pro jednotlivé poskytovatele (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), porovnávaný prostřednictvím `applyStatusRestatement()`.
- Místo volání: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (přibližně na řádku 3654), bezprostředně poté, co `parseUpstreamError()` zpracuje upstreamovou
  odpověď s chybovým stavem HTTP (`!providerResponse.ok`), a před spuštěním jakékoli
  klasifikace, takže každý downstreamový spotřebitel vidí opravený
  stav. Chyby vložené uvnitř streamu SSE se stavem `200` procházejí samostatnou,
  pozdější cestou zpracování streamu a tento hook je dnes **nepokrývá** — jde o
  známé omezení, které zatím není potřeba pro chybný stav agentrouteru (ten
  se projeví jako chybový stav HTTP).
- Způsobilost k opakování: `429` se nachází v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), takže přeznačená chyba
  obsahuje skutečné okno pro opakování namísto toho, aby se projevila jako bezvýchodná chyba `403`.
- Syntetická hodnota `60s` v `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  pouze určuje, co přeznačená odpověď sdělí **klientovi**; sama o sobě neurčuje
  interní dobu ochlazení/blokování připojení — tu samostatně řídí
  mechanismus, který přeznačenou chybu skutečně zpracovává
  (eskalující prodleva mechanismu Connection Cooldown, §2, se základem `3s` pro poskytovatele
  používající klíč API; nebo Model Lockout, §3, pro poskytovatele s kvótou pro jednotlivé modely, jako je
  agentrouter). Router se může stát interně způsobilým k opakování dříve
  než za 60s, které oznamuje klientovi — jde o záměrnou rezervu,
  nikoli o chybu.

Trvalé chyby (`无权访问模型` od agentrouteru — žádný přístup k tomuto modelu) se
NIKDY nepřeznačují: `excludeMarkers` pravidlo vetuje, i když se `textMarkers` shodují,
takže si chyba zachová původní stav a nic se ji nepokouší opakovat navždy. Odpovídající
klasifikační pravidlo poskytovatele
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarovaná základní doba ochlazení `6h`) je
funkcí `checkFallbackError` (`open-sse/services/accountFallback.ts`) vyhodnoceno
_před_ obecným předčasným návratem `FORBIDDEN` pro kategorii apikey, přičemž je podmíněno
funkcí `honorsRuleLockScope(provider)` (#10334 — v současnosti výhradně pro agentrouter prostřednictvím
seznamu povolených hodnot `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v
`providerErrorRules.ts`). Deklarovaná doba ochlazení 6h z tohoto pravidla se předává jako
`fallbackResult.baseCooldownMs`, ale stále vstupuje do již existující
cesty blokování kvóty pro jednotlivé modely (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nezměněné změnou #10334 s výjimkou zdroje doby ochlazení):
je omezena shora na operátorovo nastavení `mlSettings.maxCooldownMs`
(ve výchozím nastavení `1_800_000ms` / 30min), stejně jako každé jiné blokování modelu, a
_trvale uložený důvod blokování_ zůstává stávající pevně zadaný řetězec `"forbidden"`,
nikoli `"auth_error"` z pravidla — od začátku do konce se zohledňuje pouze doba ochlazení,
nikoli řetězec důvodu. Samotné připojení zůstává aktivní;
ostatní modely používající stejné připojení nejsou ovlivněny.

Přeformulované chyby kvóty (`额度不足`) v produkci odpovídají pravidlu poskytovatele
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastní deklarované doby ochlazení — použije se výchozí
škálovaný backoff vrstvy perzistence). Od #10334 se `scope` z
`ProviderErrorRuleMatch` skutečně používá napříč celým zpracováním, ale **pouze**
pro poskytovatele v seznamu povolených `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — aktuálně pouze `"agentrouter"`, řízeno pomocí
`honorsRuleLockScope()`). Pro každého jiného poskytovatele zůstává `scope`
pouze informativní, přesně jako před #10334. `checkFallbackError` zpřístupňuje
rozsah odpovídajícího pravidla jako `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) je sdílená
kontrola, která potvrzuje, že `ruleScope` lze skutečně bezpečně respektovat
jako signál pro celé připojení, jenž se sám zotaví (rozsah `"connection"`,
důvod `quota_exhausted`, nikdy `permanent`, nikdy `creditsExhausted` — ochrana
proti budoucímu pravidlu, které by spárovalo rozsah `"connection"` s trvalým
stavem účtu). Volají ji dva konzumenti:

- **Perzistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  namísto přechodu do větve s uzamčením **pro jednotlivý model** u průchozího
  poskytovatele (agentrouter má `passthroughModels: true` →
  `hasPerModelQuota()` vrací `true`) použije **dočasnou dobu ochlazení
  připojení** — `testStatus: "unavailable"` + `rateLimitedUntil`, nikdy
  koncový stav (`credits_exhausted`/`banned`/`expired`) — takže se připojení
  po uplynutí doby ochlazení samo zotaví a nevyžaduje ruční reset přihlašovacích
  údajů. Přeskakuje se u připojení s `disableCooling: true` (#2997): tato
  výjimka místo toho propadne do uzamčení pro jednotlivý model (zdokumentovaný
  kompromis — viz komentář v kódu nad touto větví).
- **Kombinované směrování v rámci stejného požadavku**
  (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): stejná kontrola označí
  připojení v paměťové množině `exhaustedConnections`, jejímž klíčem je
  `${provider}:${connectionId}`. Tím se přeskočí pouze zbývající cíl
  TÉHOŽ POŽADAVKU, který _sám již obsahuje přesně toto `connectionId`_ ve
  svém vlastním objektu cíle (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` před vyhledáním v `exhaustedConnections`) — prostá kombinace
  seznamu modelů, v níž sourozenecké cíle nemají vlastní připnuté
  `connectionId` a jedno je určeno až pro jednotlivé odeslání z hlavičky
  odpovědi `X-OmniRoute-Selected-Connection-Id`, nikdy nenarazí na shodu
  tohoto klíče. V tomto běžném případě NEPOSKYTUJE skutečnou ochranu proti
  opětovnému použití právě vyčerpaného účtu zbývající větví tato množina,
  ale výše uvedená vrstva perzistence (`rateLimitedUntil` připojení je nyní
  v budoucnosti) společně s tím, že stejná kontrola pro toto selhání potlačí
  `transientRateLimitedProviders` (viz „Dvoufázový návrh“ a komentář v kódu
  u větve `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`):
  protože tato množina zůstane neoznačená, vynucené povolení
  `allowRateLimitedConnection` v `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) se pro zbývající
  větve poskytovatele NEAKTIVUJE, takže filtr `rateLimitedUntil` při výběru
  přihlašovacích údajů (`src/sse/services/auth.ts:1238`) je normálně
  respektován a zbývající větev buď vybere jiné, stále způsobilé připojení
  agentrouter, nebo selže, protože nejsou k dispozici žádné přihlašovací
  údaje — nevynutí si návrat k připojení, které tato větev právě uvedla do
  stavu ochlazení.

### Dvoufázový návrh: přeformulování stavu a následná klasifikace

Přeformulování stavu (`upstreamStatusRestatement.ts`) a klasifikační pravidla
poskytovatele (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) jsou oddělené registry, které oba používají jako
klíč ID poskytovatele a textové značky, ale spouštějí se na různých místech
a slouží různým účelům: přeformulování přepisuje stav HTTP v rané fázi
`chatCore.ts`; klasifikační pravidla vybírají záložní `reason` a rozsah
uzamčení `scope` (`model` / `provider` / `connection`) uvnitř
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Klasifikační pravidla vidí úplný **text** chyby (potřebný pro porovnávání
značek v těle, jako je `额度不足`) pouze u poskytovatelů uvedených v seznamu
povolených `FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — aktuálně
pouze `"agentrouter"`. Pro každého jiného poskytovatele z **vestavěného
katalogu** předává `checkFallbackError` funkci `getProviderErrorRuleMatch`
pouze strukturovanou chybu (`{code, type}`), která stačí pro pravidla
založená na hlavičkách, stavu nebo kódu, ale nevidí značky v textu těla.
Pomocná funkce `resolveRuleMatchBody()` tento výběr provádí: úplný text chyby
pro poskytovatele na seznamu povolených, jinak strukturovanou chybu. Přidání
**vestavěného** poskytovatele do `FULL_TEXT_RULE_PROVIDERS` je explicitní
aktivace pro jednotlivého poskytovatele — existuje proto, aby výchozí cesta
pro každého poskytovatele, který na seznamu není, zůstala beze změny bajt po
bajtu.

`scope` pravidla (`model` / `provider` / `connection`) je samostatná
explicitní volba nezávislá na `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` ji pouze zpřístupní jako `fallbackResult.ruleScope`
a navazující konzumenti ji respektují jinak než jen jako informativní štítek
pouze u poskytovatelů v seznamu povolených
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ve stejném souboru (`řízeno pomocí
honorsRuleLockScope()` — aktuálně pouze `"agentrouter"`). Informace o tom, co
shoda s `scope: "connection"` skutečně udělá poté, co je poskytovatel na tomto
seznamu povolených, najdete výše v části „Přeformulované chyby kvóty“.

**#11104 — pravidla deklarovaná operátorem obcházejí oba seznamy povolených poskytovatelů.** Operátor může
za běhu deklarovat pravidlo pro konkrétního poskytovatele prostřednictvím `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez úpravy tohoto souboru. Podmínit pravidlo operátora zařazením do
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — seznamů povolených poskytovatelů
určených k ochraně **výchozího** chování vestavěných katalogových pravidel — by
způsobilo, že mechanismus nastavení nebude mít žádný účinek pro žádného poskytovatele kromě těch, kteří
už jsou v těchto seznamech uvedeni, protože samotná deklarace pravidla už představuje
výslovný souhlas operátora. `resolveRuleMatchBody()` i `honorsRuleLockScope()`
nejprve kontrolují `hasOperatorRuleForProvider()`: poskytovatel s pravidlem operátora získá
nezpracovaný text chyby a jeho deklarovaný `scope` bude respektován bez ohledu na to,
zda se také nachází v některém z těchto seznamů povolených poskytovatelů.

**Známé omezení — `providerRuleRegistry` se pro HTTP 400 nikdy nekontroluje.**
Větev `BAD_REQUEST` funkce `checkFallbackError` klasifikuje stav 400 výhradně
pomocí vlastních polí vzorů (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` atd. v `accountFallback.ts`) a vrátí výsledek dříve,
než se dosáhne větve `configuredRule`/`getProviderErrorRuleMatch`, která je uvedena výše.
Vestavěné katalogové pravidlo (nebo pravidlo operátora) se `status: 400` je
syntakticky platné, ale nikdy se nespustí. V současnosti žádné existující pravidlo necílí na 400,
takže v produkci není nic ovlivněno — budoucí pravidlo pro 400 však nejprve vyžaduje
úpravu této větve, což je větší změna než přidání pravidla (mění klasifikaci 400
pro každého poskytovatele, který už spoléhá na chování založené na polích vzorů),
a nespadá do rozsahu přidání pravidla pro jediného poskytovatele.

### Přidání nové brány, která chybně uvádí kvótu

1. Zaregistrujte jedno pole pravidel v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Udržujte `textMarkers`
   specifické pro daného poskytovatele; nikdy znovu nepoužívejte obecné anglické fráze, které kolidují s
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Volitelně zaregistrujte klasifikační pravidla v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby se zvolil
   správný rozsah zámku (`connection` pro kvótu platnou pro celý účet, `model` pro
   chyby jednotlivých modelů). Tento krok se v produkci projeví pouze u
   poskytovatelů, jejichž pravidla potřebují úplný text chyby (značky v těle): přidejte
   id poskytovatele do `FULL_TEXT_RULE_PROVIDERS` ve stejném souboru — jinak
   `checkFallbackError` předá pravidlu vždy pouze strukturovanou chybu
   `{code, type}` a pravidlo založené na textu těla nikdy nebude odpovídat živému provozu.
   Pravidla, která se porovnávají čistě podle `status`/`headers` (jako pravidla Opencode nebo
   Minimax), toto výslovné povolení nepotřebují. Samostatně platí, že pokud pravidlo deklaruje
   `scope: "connection"` a záměrem je skutečná čekací doba pro celé připojení
   spolu s přeskočením kombinace v rámci stejného požadavku (nikoli jen informativní popisek), přidejte
   id poskytovatele do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ve stejném souboru — právě
   tím se řídí využití ve stylu `isAgentrouterConnectionQuotaScope()` ve
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) a
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toho `scope`
   stále prochází přes `fallbackResult.ruleScope`, ale nic podle něj nejedná.
3. Přidejte jednotkové testy podle `tests/unit/upstream-status-restatement.test.ts`
   a `tests/unit/agentrouter-error-rules.test.ts` (včetně kontrol
   not-permanent / not-creditsExhausted a — pokud poskytovatel potřebuje
   seznam povolených poskytovatelů — testu ověřujícího, že `resolveRuleMatchBody()` vrací
   úplný text pouze pro tohoto poskytovatele).

Nejsou potřeba žádné změny v `chatCore.ts`, `classifyError` ani v combo.

#### Zámek seskupený podle odchozí IP (#10880)

S poskytovateli v `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodina opencode) se zachází
jako s upstreamem seskupeným podle IP (bezplatná úroveň opencode je seskupena podle IP, nikoli
podle účtu — viz #9611): stav 429 klasifikovaný jako `quota_exhausted`
**nebo** `rate_limit_exceeded` aktivuje čekací dobu pro všechna připojení
rodiny ze seznamu povolených poskytovatelů, jejichž poslední známá odchozí IP odpovídá IP selhávajícího
připojení, ještě předtím, než je rotace může vyzkoušet
— tím se zabrání N-1 zaručeně neúspěšným voláním upstreamu (stejný princip jako #10460/#10525).
`rate_limit_exceeded` je zahrnuto záměrně: na cestě `markAccountUnavailable`
se pravidla specifická pro opencode nikdy neshodují (do
`checkFallbackError` nejsou předány žádné hlavičky ani tělo a opencode není v `FULL_TEXT_RULE_PROVIDERS`), takže 429,
jehož tělo obsahuje text o kvótě předplatného ("monthly usage limit
reached"), je klasifikováno jako `quota_exhausted` pomocí záložní logiky pro text kvóty
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; čekací doba 1 h) ještě předtím,
než se vůbec dosáhne pravidla `status_429` — zatímco 429 bez textu o kvótě (prosté
omezení rychlosti) se prostřednictvím pravidla `status_429` klasifikuje jako `rate_limit_exceeded`
a přesto aktivuje čekací dobu pro celou rodinu sdílející danou IP. Pro poskytovatele ze seznamu povolených poskytovatelů je omezení
rychlosti seskupené podle IP stejným signálem jako vyčerpaná kvóta. Reálná omezení:

- **V rámci možností**: zámek zjistí poslední známou `egress_ip` připojení
  z `proxy_logs` (okno 24 h, synchronně, bez mezipaměti). Při studené
  mezipaměti (odchozí IP nebyla nikdy ověřena) nebo chybějícím řádku → větev
  stále aplikuje cooldown na selhávající připojení (zaznamenaný stejně jako
  dnes), pouze se nezamkne žádné sourozenecké připojení.
- **Nikdy není terminální**: cooldown je obnovující se kvótové okno
  (`testStatus: "unavailable"`); trvalý stav se nikdy neodvozuje ze signálu na
  úrovni IP. Připojení s `disableCooling` tuto větev zcela přeskakují.
- **Pro rodinu na seznamu povolených se mění granularita zámku**: jde o změnu
  rozsahu, nikoli pouze o optimalizaci sourozeneckých připojení. opencode je
  poskytovatel `passthroughModels`, takže před touto větví způsobila chyba 429
  uzamčení pro konkrétní MODEL; nyní způsobí cooldown připojení — včetně
  případu, kdy operátor provozuje jediné připojení bez jakéhokoli
  sourozeneckého připojení. To je granularita, kterou tabulka pravidel
  opencode již označuje za správnou (`scope: "connection"`,
  `providerErrorRules.ts`), ale dosud nebyla respektována, protože opencode
  není v `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Větev sama zapíše cooldown
  selhávajícího připojení + `backoffLevel`, čímž kopíruje větev agentrouter s
  rozsahem na úrovni připojení, a vrátí se — blok pro konkrétní model ani
  obecná cesta níže se nikdy neprovedou.
- **Zahrnuje combo**: stejně jako větev agentrouter tento rozsah záměrně
  ignoruje snížení úrovně `persistUnavailableState`/`isCombo`, které volající
  combo aplikuje na chybu 429. Uzamčení pro konkrétní model není slabší formou
  tohoto rozsahu, ale nesprávnou jednotkou: nevypovídá nic o vyčerpané IP,
  takže rotace combo by nadále spotřebovávala jedno zaručeně neúspěšné volání
  na každé sourozenecké připojení.
- **Bezpečnost sourozeneckých připojení**: sourozenecké připojení, které je již
  v terminálním stavu (banned/credits_exhausted) nebo již má delší cooldown,
  se nikdy nepřepíše.
- **Výhradní seznam povolených**: rozšíření
  `EGRESS_BUCKETED_LOCK_PROVIDERS` je výslovným rozhodnutím vlastníka; žádné
  obecné propojení (vzor #10334/#10419). Dotaz na sourozenecká připojení váže
  tentýž seznam povolených namísto jeho opakování jako SQL literálu, takže
  jeho rozšíření zůstává změnou na jediném řádku.
- **Rotace odchozí IP, oběma směry**: okno vyhledávání (24 h) je podstatně
  širší než TTL mezipaměti odchozí IP (5 min), takže „poslední známá IP“ je
  historie, nikoli aktuální stav. Pokud se proxy připojení v rámci tohoto okna
  změnila, zámek může **minout** skutečně sdílenou IP (zaznamenaná IP je nová,
  nevyčerpaná) — a stejně tak může **aplikovat cooldown na sourozenecké
  připojení, které již přešlo jinam** z vyčerpané IP. Druhý případ stojí toto
  sourozenecké připojení jedno cooldown okno; oba případy jsou akceptovanými
  omezeními vyhledávání založeného na historii v rámci možností.
- **Náklady**: dva omezené průchody `proxy_logs` (filtrované podle okna pomocí
  `idx_pl_timestamp`), pouze s frekvencí chyb 429. Žádný nový index (migrace
  134 YAGNI). Změřeno na kopii databáze se skutečným provozem střední
  velikosti; vysokokapacitní instance uchovává ve stejném okně úměrně více
  řádků.

---

## Další funkce odolnosti

- **20 strategií směrování** (prioritní, vážená, round-robin, předávání kontextu, fill-first, p2c, náhodná, nejméně používaná, optimalizovaná podle nákladů, zohledňující reset, podle okna resetu, podle rezervy, vážená podle kvóty, striktně náhodná, automatická, lkgp, optimalizovaná podle kontextu, optimalizovaná podle mezipaměti, fusion, pipeline) — viz [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Směrování zohledňující reset** (v3.8.0) — upřednostňuje připojení podle času resetování kvóty.
- **Degradace režimu na pozadí** — Responses API s `background: true` se s upozorněním přepne do synchronního režimu.
- **Dynamická detekce limitu nástrojů** — při dosažení limitu počtu nástrojů ustoupí od daných poskytovatelů.
- **Nouzový záložní mechanismus** — řídí se pomocí `OMNIROUTE_EMERGENCY_FALLBACK`; operátoři jej mohou přepsat na stránce Feature Flags bez restartu.

---

## Ladění

- Vážené combo vrací `503 all_targets_cooling_down` (je nastaveno `Retry-After`, `diagnostics.excluded` uvádí každý cíl s důvodem `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je nakonfigurovaný a připojený, ale každý cíl je vyloučen časovačem odolnosti; varování `[COMBO] Weighted selection: every target excluded before dispatch — …` uvádí důvody a zbývající počet sekund. Odpověď `404 no_executable_targets` ze stejného comba znamená, že nebyl použit žádný časovač odolnosti (není co spustit nebo u každého účtu selhala kontrola dostupnosti). Implementováno v `open-sse/services/combo/pinRecovery.ts` na základě vyloučení shromážděných v `targetResolution.ts`.
- Všechny klíče poskytovatele jsou přeskočeny → zkontrolujte stav circuit breakeru A TAKÉ hodnoty `rateLimitedUntil`/`testStatus` každého připojení.
- Poskytovatel je po uplynutí okna resetování trvale vyloučen → kód čte přímo `state` namísto použití `getStatus()`/`canExecute()`.
- Jeden klíč selže, ostatní by měly fungovat → upřednostněte cooldown připojení před circuit breakerem.
- Selže pouze jeden model → upřednostněte uzamčení modelu před cooldownem připojení.
- Stav by se měl automaticky obnovit, ale neděje se tak → zkontrolujte budoucí časové razítko a cestu čtení, která aktualizuje stav po vypršení platnosti. Trvalé stavy vyžadují ruční změny.

---

## TLS fingerprinting a skrytý režim

Skrytý režim specifický pro jednotlivé poskytovatele (JA3/JA4, CCH, obfuskace) je zdokumentován samostatně — viz `docs/security/STEALTH_GUIDE.md` (git; není zkompilováno do `/docs`).

---

## Testování odolnosti (Fáze 8 · Blok C)

Kromě jednotkových testů logiky odolnosti ověřují běhové prostředí ve
skutečných podmínkách zátěže a selhání tři testy (všechny jsou integrační/noční — žádný neblokuje PR):

| Test        | Co ověřuje                                                                                                                                                                      | Spuštění                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Simulovaný upstreamový uzel vnáší skutečnou latenci/reset/timeout/503; ověřuje, že se jistič otevře/zotaví a že `checkFallbackError` klasifikuje 503 jako obnovitelný fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Růst haldy  | ~500 streamů na jeden `createSSEStream` s `--expose-gc`; test selže, pokud halda překročí stanovený strop (ochrana před OOM #3069).                                             | `npm run test:heap`                    |
| Zátěžový k6 | Trvalá zátěž endpointu `/api/monitoring/health`; prahové hodnoty p95/chybovosti.                                                                                                | `k6 run tests/load/k6-soak.js` (nočně) |

Orchestrace probíhá pomocí `.github/workflows/nightly-resilience.yml` (cron + dispatch). Ve
výchozím testu `test:integration` se testy chaosu a haldy samy přeskočí (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Viz také

- [Průvodce architekturou](./ARCHITECTURE.md) — Architektura systému a interní mechanismy
- [Uživatelská příručka](../guides/USER_GUIDE.md) — Poskytovatelé, kombinace, integrace CLI
- [Modul automatických kombinací](../routing/AUTO-COMBO.md) — Hodnocení podle 16 faktorů, balíčky režimů
