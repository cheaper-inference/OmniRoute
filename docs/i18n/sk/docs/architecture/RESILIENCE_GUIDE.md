# Resilience Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute má tri odlišné, ale súvisiace mechanizmy odolnosti. Každá má iný rozsah a účel. Pri ladení smerovania ich držte oddelene.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Prepínače prednosti Env-vs-dashboard pre odolnosť.** Voliteľná odolnosť prepína nasadená z prostredia — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — poskytuje iba _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean pretrvával v `resilienceSettings` (Dashboard →** Nastavenia → Resilience** / `PATCH /api/resilience`, uložený v `key_value`) víťazí nad hodnotou env: normalizácia (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) udržiava uloženú boolovskú hodnotu vždy, keď existuje. Nastavenie takejto env var na `true` v nasadení, kde je už uložený dashboard `false` preto nič nezmení — prepnite prepínač** Nastavenia → Resilience** (alebo vymažte uložené pole).

## 1. Circuit breaker poskytovateľa

**Rozsah:** celý poskytovateľ (napr. `glm`, `openai`, `anthropic`).

**Účel:** zastaviť odosielanie prevádzky poskytovateľovi, ktorý opakovane zlyháva na úrovni upstream/služby.

**Implementácia:**

- Základná trieda: `src/shared/utils/circuitBreaker.ts`
- Zapojenie: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu: `GET /api/monitoring/health`
- API resetu: `POST /api/resilience/reset`
- Obaly: `open-sse/services/accountFallback.ts`
- Databázová tabuľka: `domain_circuit_breakers`

**Stavy:**

- `CLOSED` — normálna prevádzka je povolená
- `DEGRADED` — prevádzka je stále povolená, ale sledujú sa zvýšené zlyhania poskytovateľa; vráti sa do `CLOSED` po dostatočnom počte úspechov, po platnom teste pripojenia alebo po uplynutí najdlhšieho držania `OPEN` pre posledný druh zlyhania (jeho hodnota `cooldownByKind`, inak `resetTimeout`, × `maxBackoffMultiplier`, minimálne jeden cooldown) bez nového zlyhania
- `OPEN` — poskytovateľ je dočasne zablokovaný; combo smerovanie ho preskočí
- `HALF_OPEN` — uplynul časový limit resetu; skúšobná požiadavka je povolená

**Konfigurovateľné predvolené hodnoty (`open-sse/config/constants.ts`, zobrazené v Dashboard → Settings → Resilience):**

| Trieda  | Prechod do DEGRADED pri | Otvorenie pri | Časový limit resetu |
| ------- | ----------------------- | ------------- | ------------------- |
| OAuth   | 5 zlyhaniach            | 8 zlyhaniach  | 60s                 |
| API-key | 7 zlyhaniach            | 12 zlyhaniach | 30s                 |
| Local   | odvodené                | 2 zlyhaniach  | 15s                 |

`degradationThreshold` určuje, kedy poskytovateľ vstúpi do stavu `DEGRADED`; `failureThreshold` určuje, kedy sa otvorí a začne sa preskakovať. Profily lokálnych poskytovateľov zatiaľ nie sú zobrazené na stránke nastavení Resilience.

**Aktivačné kódy:** iba stavy na úrovni poskytovateľa `[408, 500, 502, 503, 504]`. NEAKTIVUJE sa pri chybách na úrovni účtu (väčšina 401/403/429 — tie patria do cooldownu alebo lockoutu).

**Lenivá obnova:** keď vyprší `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` obnovia stav na `HALF_OPEN`. Rovnaké čítania (a ďalšie zlyhanie) postupne vrátia zastaraný `DEGRADED` späť na `CLOSED`. Nie je potrebný žiadny časovač na pozadí.

---

### Voliteľný globálny Provider Cooldown (brána časového okna)

Štvrtá, **voliteľná** vrstva (`PROVIDER_COOLDOWN_ENABLED`, predvolene **vypnutá**) uchováva pamäť zlyhávajúcich poskytovateľov naprieč požiadavkami v `open-sse/services/providerCooldownTracker.ts`, ktorú využíva rozlíšenie cieľov combo, takže po sebe idúce combo požiadavky už znovu neprechádzajú poskytovateľa, ktorý práve zlyhal. Záznamy na úrovni poskytovateľa rešpektujú bránu časového okna `PROVIDER_PROFILES`:

| Profil  | aktivuje sa po (`providerFailureThreshold`) | v rámci (`providerFailureWindowMs`) | chladne počas (`providerCooldownMs`) |
| ------- | ------------------------------------------: | ----------------------------------: | -----------------------------------: |
| OAuth   |                                        `10` |                             `15min` |                               `5min` |
| API key |                                        `15` |                             `30min` |                              `10min` |

Pod prahom sa poskytovateľ **nepovažuje** za chladnúceho; úspech okno vymaže. Záznamy na úrovni pripojenia (`provider:connectionId`) namiesto toho zachovávajú exponenciálny backoff `minRetryCooldownMs → maxRetryCooldownMs`. Prepísania: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regresná poistka: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Čas ochladenia pripojenia

**Rozsah:** jedno pripojenie/účet/kľúč poskytovateľa.

**Účel:** preskočiť jeden nefunkčný kľúč, zatiaľ čo ostatné pripojenia toho istého poskytovateľa naďalej obsluhujú požiadavky.

**Implementácia:**

- Označenie ako nedostupné: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výber: `getProviderCredentials*` v rovnakom súbore
- Výpočet ochladenia: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavenia: `src/lib/resilience/settings.ts`

**Polia pre každé pripojenie:**

- `rateLimitedUntil` — časová pečiatka, do ktorej trvá ochladenie
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — počítadlo exponenciálneho ústupu

**Predvolené časy ochladenia:**

- Základ pre OAuth: 5 s
- Základ pre API kľúč: 3 s
- API kľúč 429: uprednostňuje upstream hlavičky `Retry-After`/reset/parsovateľný text s resetom
- Ústup: `baseCooldownMs * 2 ** failureIndex`

**Oneskorenie opakovania pre jednotlivých poskytovateľov.** Stránka s podrobnosťami poskytovateľa obsahuje výber **Oneskorenie opakovania** (Automaticky, od 15 s do 1 h). Ukladá sa do `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600) prostredníctvom `PATCH /api/resilience`. Ak chyba obmedzenia rýchlosti neobsahuje upstream náznak opakovania, táto hodnota nahradí škálovaný ústup pre daného poskytovateľa a nastaví `backoffLevel` na 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Priorita pri chybe obmedzenia rýchlosti, od najvyššej po najnižšiu: upstream náznak opakovania, potom `providerSpecificData.rotationOverrides.rateLimitResetSeconds` pre dané pripojenie, potom oneskorenie opakovania pre daného poskytovateľa, potom `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` z prostredia a nakoniec škálovaný ústup. Automaticky odstráni pole. Ovplyvňuje iba dôvod obmedzenia rýchlosti, nikdy terminálne stavy.

**Ochrana proti náporu súbežných požiadaviek:** zabraňuje tomu, aby súbežné zlyhania nadmerne predlžovali ochladenie alebo dvakrát zvyšovali `backoffLevel`.

**Chyby 429 spôsobené limitom súbežnosti nezvyšujú úroveň ústupu.** Stav `429`, ktorého telo uvádza limit súbežnosti („too many concurrent requests“, „concurrency limit“, „parallel request limit“, GLM `并发数过高`), znamená, že účet je v poriadku, ale zaneprázdnený. `checkFallbackError()` vracia dôvod `concurrency_limited`: okamžite prejde na ďalšie pripojenie, toto pripojenie ochladí na pevnú hodnotu `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) alebo podľa upstream náznaku opakovania, ponechá `backoffLevel` nezmenený a nastaví `skipProviderBreaker`. Výslovné telo s informáciou o kvóte má stále prednosť, takže telo, ktoré zároveň zodpovedá vzoru kvóty, zostáva vyhodnotené ako kvóta. Detekciu vykonáva `looksLikeConcurrencyLimit()` v `src/shared/utils/classify429.ts`; vyhodnotenie vykonáva `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` prerušovača) sa nemení a pre tieto telá naďalej číta `rate_limit`.

**Zastavenia toku obsahu neochladzujú účet.** Keď strážca zastavenia obsahu (`open-sse/utils/streamHandler.ts`) ukončí tok, ktorý včas neposlal žiadny výstup modelu, `markAccountUnavailable()` zaznamená chybu pri pripojení, ale nenastaví ochladenie: zastavenie patrí danej požiadavke, najčastejšie ide o dlhý krok uvažovania bez doterajšieho výstupu. Prevádzkovatelia môžu túto funkciu voliteľne aktivovať prostredníctvom `resilienceSettings.streamStallCooldown.enabled` (predvolene `false`).

**Voliteľný signál latencie pre výber účtu `p2c`.** Každý odoslaný pokus zaznamenáva čas do prvého bajtu a výsledok pre každé pripojenie (a pre kombináciu pripojenia a modelu) v posuvnom okne v pamäti: posledných 20 vzoriek v priebehu 15 minút (`open-sse/services/connectionLatencyTracker.ts`, zaznamenávané z `safeLogEvents()` v `src/sse/handlers/chatHelpers.ts`). Keď je hodnota `resilienceSettings.p2cLatency.weight` vyššia než `0` (rozsah 0–20, predvolené `0` = vypnuté), `compareP2CConnections()` v `src/sse/services/auth.ts` pripočíta každému kandidátovi dvojice najviac `weight` bodov. Polovica pochádza z latencie ako pomeru k rýchlejšiemu kandidátovi (dvojnásobná pomalosť znamená celú túto polovicu) a polovica z miery chýb v posuvnom okne. Tento člen sa uplatní iba vtedy, keď majú obaja kandidáti aspoň 3 vzorky, takže nové účty nie sú penalizované, a jeho horná hranica zostáva pod penalizáciami za zablokovanú a vyčerpanú kvótu. Nevytvára vlastný okruh: zlyhávajúce účty naďalej spracúvajú vrstvy ochladenia, uzamknutia a prerušovača. Nastavuje sa pomocou `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Rámce uvažovania reštartujú rozpočet zastavenia obsahu.** Uvažujúci model môže pred prvým viditeľným tokenom premýšľať niekoľko minút: Claude streamuje rámce `thinking_delta`, ktorých text uvažovania môže byť prázdny, a Responses API streamuje jednu položku uvažovania za druhou. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tieto rámce rozpoznáva a strážca pri každom z nich reštartuje svoj rozpočet namiesto zrušenia priebehu. Stále nejde o výstup modelu, takže priebeh, ktorý sa skončí iba uvažovaním, sa naďalej nahlási ako prázdny a priebeh, ktorý ukončí uvažovanie a posiela už len prezenčné signály, stále aktivuje strážcu.

Binárne rámce `reasoningContentEvent` systému Kiro s neprázdnym podpisom zachovávajú túto aktivitu uvažovania cez vykonávaciu vrstvu ako prázdny delta prvok `reasoning_content`. Podpis sa neodosiela ďalej. Metadáta, neúplné rámce a prázdne podpisy nereštartujú rozpočet obsahu; naďalej platí nezávislý časový limit aktívneho toku a zrušenie klientom (`open-sse/executors/kiro/reasoning.ts`).

**Terminálne stavy (NIE ochladenia):**

- `banned` — nastavuje sa detekciou zakázaných kľúčových slov alebo zákazu účtu (pozri [BAN_DETECTION](../security/BAN_DETECTION.md)). Odmietnutia upstreamu pre jednotlivé požiadavky (`request_rejected`, napr. Anthropic OAuth 403 „Request not allowed“) ho nikdy nenastavujú: počítajú sa pre každé pripojenie a model a daný model sa vyradí z rotácie s rastúcim ochladením obmedzeným hodnotou `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), prípadne sa ochladí pripojenie, ak model nie je známy — `open-sse/services/requestRejectedStreak.ts`
- `expired` (po ohraničenom počte opakovaní prejde do terminálneho stavu — `EXPIRED_RETRY_MAX = 3` s exponenciálnym ústupom — aby sa dočasné chyby OAuth mohli samy opraviť pred trvalou deaktiváciou účtu)
- `credits_exhausted`

Tieto stavy pretrvávajú, kým sa nezmenia prihlasovacie údaje alebo ich operátor neresetuje. Koncové stavy neprepísujte prechodným stavom ochladenia.

**Lenivé obnovenie:** keď uplynie `rateLimitedUntil`, pripojenie bude opäť použiteľné. Po úspešnom použití `clearAccountError()` vymaže všetky polia chýb.

### Limit používania Claude OAuth: kanál s nižšou prioritou + reset limitu relácie

**Rozsah:** jedno pripojenie k predplatnému Claude (OAuth). Obe funkcie sú **voliteľné pre každé pripojenie** (Upraviť pripojenie → sekcia Claude → `lowPriorityMode` / `autoLimitReset` v `providerSpecificData`, obe sú predvolene vypnuté) a kopírujú príkazy Claude Code `/low-priority` a `/limit-reset` (protokolový kontrakt zachytený z Claude Code 2.1.263).

**Implementácia:**

- Stavový automat + klasifikácia odpovedí: `open-sse/services/claudeLowPriority.ts`
- Klient na stav/prevzatie resetu: `open-sse/services/claudeLimitReset.ts`
- Hook vykonávateľa (vkladanie hlavičky + opakovanie pre rovnaký účet): `open-sse/executors/base.ts::execute()`
- Ukladanie voľby: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spúšťač:** 5-hodinový limit používania — `429`, ktorého hlavičky obsahujú
`anthropic-ratelimit-unified-status: rejected` a, keď je účet oprávnený,
`anthropic-ratelimit-unified-slow-offer: treatment`. Pred prvou odpoveďou s limitom
429 sa nič neodosiela; dávková odpoveď 429 bez zjednotených hlavičiek prejde bežnou cestou ochladenia.

**Kanál s nižšou prioritou** (`lowPriorityMode`):

- Pri odpovedi 429 s limitom vykonávateľ prijme ponuku a okamžite zopakuje požiadavku na **tom istom** účte s hlavičkou `anthropic-usage-limit: slow`; kanál zostane aktívny až do oznámeného `anthropic-ratelimit-unified-reset` (+ 60-sekundová tolerancia) a každá požiadavka v tomto intervale bude obsahovať túto hlavičku. Zachytená odpoveď 429 sa nikdy nedostane do `handleChatCore`, takže pripojenie sa **neprepne do ochladenia ani sa nezrotuje**.
- `anthropic-ratelimit-unified-slow-status` v neskorších odpovediach: `active` / `not_needed` ponechajú kanál aktívny; `slot_busy` (429) alebo `529` počkajú čas určený serverom v `anthropic-ratelimit-unified-slow-retry-after` (predvolene 20 s, ohraničené na 5–600 s, s jitterom ±30 %) a zopakujú požiadavku, pričom sú obmedzené hodnotou `anthropic-ratelimit-unified-slow-max-wait` (predvolene 20 minút, ohraničené na 1 minútu–6 hodín) — po jej prekročení sa kanál ukončí a 10-minútové ochladenie zablokuje opätovné prijatie. Čakanie je navyše obmedzené časom, ktorý zostáva do vlastného upstreamového timeoutu začiatku požiadavky (`resolveFetchStartTimeout`, predvolene 10 minút), mínus 5-sekundová rezerva: bez tohto obmedzenia by predvolený maximálny čas čakania 20 minút prekročil životnosť požiadavky a čakanie by bolo prerušené uprostred, čo by vyvolalo `TimeoutError` namiesto riadneho ukončenia s `max_wait` a následného ochladenia.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prechod 5-hodinového okna alebo `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (čo ho ukončí ako `extra_usage` pri akomkoľvek stave, keďže platené prekročenie teraz pokrýva aj tento limit) ukončia kanál; odpoveď potom pokračuje bežnou cestou ochladenia. `budget_exhausted` sa zapamätá až do oznámeného resetu rozpočtu (najviac 8 dní).
- Kontrola limitu sa spúšťa po vlastných opakovaniach vykonávateľa v rámci jedného pokusu vyvolaných odpoveďou 400 (úprava kontextu, obmedzenia premýšľania/úsilia, automatické učenie parametrov), takže odpoveď 429 s limitom, ktorá sa objaví až pri jednom z týchto opakovaní, sa stále zachytí namiesto prechodu do cesty ochladenia.
- Stav je v pamäti pre každé pripojenie (reštart si vyžiada jednu dodatočnú odpoveď 429 s limitom na opätovné prijatie).

**Reset limitu relácie** (`autoLimitReset`, pri zapnutí oboch funkcií sa skúša pred kanálom):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok
  `juniper_tide`; keď je `arm: "reset"` a `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizácie z `providerSpecificData.organizationUUID`, záložná hodnota z bootstrapu).
- `result: reset|not_limited` → požiadavka sa zopakuje plnou rýchlosťou (bez hlavičky slow). `already_used` / `not_offered` uložia do pamäte `next_available_at` (predvolený interval jeden týždeň); každé zlyhanie použije spätné oneskorenie 15 minút. Reset je možný raz týždenne a stále sa započítava do týždenného limitu.

Regresné ochrany: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitné väzby relácie (#7274)

**Rozsah:** jedna klientska relácia (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` hlavička) pripnutá k jednému pripojeniu pre **ľubovoľného poskytovateľa**.

**Účel:** udržať viacotáčkového agenta (Claude Code, aider, vlastné agenty) na rovnakom účte naprieč požiadavkami, čím sa znižuje strata kontextu pri prepínaní účtov a opakované studené odpovede 429 u poskytovateľov so stavom relácie viazaným na účet.

**Implementácia:**

- Rozlíšenie TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Výber/vytvorenie väzby: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrakcia hlavičky (všeobecná, ľubovoľný poskytovateľ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabuľka trvalých väzieb: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavenie: `sessionAffinityTtlMs` (globálny TTL v ms, `0` deaktivuje) — `src/lib/db/settings.ts`. Premenované z nastavenia špecifického pre Codex `codexSessionAffinityTtlMs` migráciou `124_generic_session_affinity_ttl.sql`, ktorá prenáša predtým nakonfigurovaný TTL pre Codex ako nový predvolený TTL.

Pred #7274 `resolveSessionAffinityTtlMs()` okamžite vracala `0` pre každého poskytovateľa okrem `codex`, takže nastavenie TTL (a hlavičky relácie) nemali nikde inde žiadny účinok, hoci mechanizmus pripínania aj extrakcia hlavičiek už boli nezávislé od poskytovateľa. Oprava odstránila toto skoré ukončenie; TTL sa teraz po globálnom nastavení na hodnotu vyššiu než `0` uplatňuje jednotne na každého poskytovateľa.

Tri hlavičky afinity relácie sa nikdy neposielajú ďalej upstream — vykonávatelia vytvárajú vlastné upstreamové hlavičky úplne od začiatku namiesto preposielania klientskych hlavičiek, takže toto zostáva iba interným identifikátorom korelácie.

### Exkluzívne prenájmy pripojení spravovaných relácií

**Rozsah:** jeden aktívny spravovaný HTTP klient/relácia vlastní jedno vhodné pripojenie OmniRoute.

**Účel:** poskytovať trvalé výhradné vlastníctvo pripojenia pre klientov, ktorí potrebujú pevnú
smerovaciu bariéru naprieč požiadavkami. Líši sa od afinity relácie, ktorá predstavuje preferenciu
mäkkej kontinuity: výhradný prenájom zachováva stav životného cyklu v SQLite, vynucuje globálnu
jedinečnosť aktívneho vlastníka a aktívneho pripojenia a odmieta zastaranú generáciu pred
odoslaním požiadavky poskytovateľovi.

Táto funkcia je voliteľná pre každý kľúč API. Spravovaný kľúč musí mať rozsah
`lease:exclusive` a explicitný neprázdny zoznam `allowedConnections`. Koncový bod životného cyklu
môže použiť ľubovoľný HTTP klient; nevyžaduje sa názov klienta, user-agent, poskytovateľ, metóda
OAuth ani model. Prenájom vlastní pripojenie, nie model, takže zmena modelu zachová väzbu, kým
pripojenie zostáva bežne vhodné. Bežné pravidlá modelu, kvóty, stavu, ochladzovania a zoznamu
povolených položiek zostávajú nadradené a môžu tú istú generáciu prepnúť na iné voľné vhodné
pripojenie.

Životný cyklus tvorí `POST /api/v1/session-leases` s akciami JSON `acquire`, `renew` a `release`.
Spravované inferenčné požiadavky uvádzajú nepriehľadnú hodnotu `X-OmniRoute-Lease-Owner` a presnú
hodnotu `X-OmniRoute-Lease-Generation`. Vlastník používa predponu `vlo_` nasledovanú 43 znakmi
base64url; ukladá sa iba jeho hash SHA-256. Každá bariéra konečného odoslania požiadavky tiež viaže
autentifikované ID kľúča API a ID aktívneho pripojenia. Riadiace hlavičky prenájmu sa odstraňujú z
protokolov, uchovávaných snímok požiadaviek a hlavičiek upstream exekútora.

Ak má bežné smerovanie vhodných spravovaných kandidátov, ale každý voľný kandidát je obsadený
cudzím aktívnym prenájmom, OmniRoute vráti HTTP `429`, kód nedostupnej kapacity prenájmu, stav
čakania na kapacitu a ohraničenú hodnotu `Retry-After` odvodenú od najskoršieho relevantného
vypršania. Bežná absencia vhodných položiek nie je konflikt prenájmov a zachováva existujúcu
sémantiku chýb smerovania.

Súvisiace mechanizmy zostávajú oddelené:

- Obsadenie relácie OAuth je mäkká distribúcia účtov OAuth lokálna pre proces.
- Semafory účtov udeľujú povolenia na súbežnosť požiadaviek a končia po dokončení požiadavky.
- Výhradné spravované prenájmy relácií predstavujú trvalé vlastníctvo životného cyklu s bariérou generácie.

---

## 3. Blokovanie modelu (Model Lockout)

**Rozsah:** trojica poskytovateľ + pripojenie + model.

**Rozsah kľúča podľa stavu:** zlyhávajúci stav rozhoduje o tom, na ktorý kľúč sa blokovanie zapíše (`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signál kvóty alebo oprávnenia — zablokuje sa **rodina kvóty**:
  pre codex celý rozsah `codex` / `spark` (každý model `gpt-5*` daného
  pripojenia), pre ostatných poskytovateľov `getQuotaScopedModelForProvider()`.
- `404` zablokuje samotný model (`getModelLockKey()` zužuje rozsah pri `not_found`).
- Akýkoľvek iný stav — transportné/serverové zlyhania `5xx` a vlastný
  syntetizovaný `502` z validácie kvality v OmniRoute — zablokuje iba **presnú**
  trojicu poskytovateľ/pripojenie/model. Zlý stream na jednom modeli nie je dôkazom
  o kvóte účtu; pred týmto pravidlom jedna prázdna odpoveď na
  `codex/gpt-5.6-luna` vyradila zo smerovania každý model `gpt-5*` daného
  pripojenia na 2–30 min (eskalujúco), zatiaľ čo jeho kvóta zostala nedotknutá.
- Explicitná voľba `scope` volajúceho vždy vyhráva (Antigravity posiela `"exact"`).

**Účel:** zabrániť vypnutiu celého pripojenia, keď je nedostupný alebo obmedzený kvótou len jeden model.

**Príklady:**

- Poskytovatelia s kvótou na úrovni modelu vracajúci 429
- Lokálni poskytovatelia vracajúci 404 pre jeden chýbajúci model
- Zlyhania oprávnení špecifických pre režim/model poskytovateľa (napr. režimy Grok)

**Implementácia:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel Model Cooldowns (v3.8.0)

UI: Nastavenia → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Zobrazuje aktívne blokovania s údajmi: poskytovateľ, pripojenie, model, dôvod, expiresAt. Operátori môžu model z karty manuálne znovu povoliť.

**REST API:**

- `GET /api/resilience/model-cooldowns` — zoznam aktívnych blokovaní
- `DELETE /api/resilience/model-cooldowns` — manuálne znovupovolenie. Telo: `{provider, connection, model}`. Autentifikácia: management.

### Cooldown Manager

UI: Monitorovanie → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stránka pre každé pripojenie, ktoré je mimo smerovania z prechodného dôvodu,
namiesto otvárania stránky každého poskytovateľa. Zobrazuje cooldowny pripojení,
blokovania modelov a terminálne stavy, umožňuje ich vymazať pre jednotlivé pripojenia,
pre výber alebo pre všetky pripojenia poskytovateľa, a upravuje najčastejšie ladené
pravidlá cooldownu: `streamStallCooldown.enabled` a základný cooldown
`connectionCooldown` pre OAuth / API kľúč spolu s maximálnym počtom krokov backoffu
(ukladá sa cez `PATCH /api/resilience`). Terminálne stavy (`banned`, `expired`,
`credits_exhausted`) sú zobrazené, ale nikdy sa tu nemažú.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikácia: management):

- `GET /api/resilience/cooldowns[?provider=]` — pripojenia so stavom, zostávajúcim
  cooldownom, úrovňou backoffu, typom poslednej chyby a blokovaniami modelov
  (bez prihlasovacích údajov)
- `POST /api/resilience/cooldowns` — telo `{connectionIds: string[]}` alebo
  `{all: true, provider?}`; vracia `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI nastavení blokovania + obnova typu success-decay (v3.8.23)

Blokovanie modelu sa posunulo z vždy zapnutého natvrdo zakódovaného správania
na plne konfigurovateľnú funkciu na báze opt-in s vlastnou kartou nastavení
a samoopravnou cestou obnovy.

**Karta nastavení:** Nastavenia → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Táto karta je **odlišná** od vyššie uvedenej karty `ModelCooldownsCard` určenej
len na čítanie (ktorá aktívne blokovania iba _zobrazuje_) — nová karta
_parametre konfiguruje_. Predvolené hodnoty sa nachádzajú v
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavenie              | Predvolené                       | Význam                                                           |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `enabled`               | `false`                          | Hlavný prepínač — blokovanie modelu je **predvolene vypnuté**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream stavy, ktoré sa počítajú ako zlyhanie v rozsahu modelu. |
| `baseCooldownMs`        | `120_000` (120 s)                | Počiatočná doba blokovania pri prvom zlyhaní.                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Strop eskalovaného cooldownu.                                    |
| `maxBackoffSteps`       | `10`                             | Maximálny počet krokov eskalácie exponenciálneho backoffu.       |
| `useExponentialBackoff` | `true`                           | Či opakované zlyhania eskalujú cooldown exponenciálne.           |

Nastavenia sa ukladajú cez bežné úložisko nastavení a validujú sa schémou
nastavení resilience; karta orezáva (clamp) hodnoty `baseCooldownMs`/`maxCooldownMs`
(s podmienkou `maxCooldownMs ≥ baseCooldownMs`) a `maxBackoffSteps`.

**Obnova typu success-decay:** obnova **nie** je iba čisté vypršanie časovača.
Zdravá odpoveď postupne znižuje počet zlyhaní modelu, takže model, ktorý sa
zotavil uprostred okna, prestane eskalovať (a uvoľní sa) skôr, než by vypršal
jeho časovač. Pri úspešnom combo cieli `open-sse/services/combo.ts` zavolá
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), ktorá
**zníži na polovicu** uložený `failureCount` (`Math.floor(failureCount / 2)`);
keď dosiahne `0`, záznam blokovania sa úplne vymaže. Protiváha
`recordModelLockoutFailure()` počet zvyšuje (a eskaluje cooldown) pri zlyhaniach
v rámci eskalačného okna. Tento success-decay je doplnkom k obyčajnému vypršaniu
časovača — model môže znovu povoliť ktorákoľvek z oboch ciest.

**Stav:** blokovania sa držia **v pamäti** (per-process `Map`y záznamov
`ModelLockoutEntry` kľúčované podľa `provider:connectionId:model`, zámky
s rozsahom exact podľa `provider:connectionId:exact:model`), neukladajú sa do
databázy — pri reštarte sa stratia. _Nastavenia_ sa ukladajú; aktívny
_stav_ blokovaní je efemérny.

---

## 4. Riadenie súbežnosti zdieľania kvóty (v3.8.36)

Predplatiteľské účty (GLM, MiniMax atď.) často prijímajú iba približne 1–3 súbežné
požiadavky; prekročenie tohto limitu spúšťa odpovede 429 a cooldowny. To je kritické pri
kombináciách **quota-share** (`qtSd/…`), v ktorých viacero kľúčov API zdieľa jeden účet
u upstreamu. Tri vrstvy zabraňujú zahlteniu zdieľaného účtu.

### Limit súbežnosti na pripojenie (`max_concurrent`)

Každé pripojenie poskytovateľa môže deklarovať horný limit `max_concurrent`
(`provider_connections.max_concurrent`, nastavený v modálnom okne pripojenia / API / DB).
Ak nechcete žiadny limit, nechajte pole prázdne. Toto je jediný parameter, ktorý riadi
nižšie opísanú serializačnú vrstvu — nastavte ho na skutočnú súbežnosť účtu
(napr. GLM ~1, MiniMax ~2).

### Limity súbežnosti podľa modelu (`modelConcurrency`)

Pripojenie môže vo svojej mape `rateLimitOverrides` navyše deklarovať presné limity súbežnosti
pre jednotlivé modely:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nastavte ich v modálnom okne pripojenia (**Rate limit overrides → Per-model
concurrency caps**, jeden `model=cap` na riadok) alebo prostredníctvom
`PATCH /api/providers/[id]` s rovnakou štruktúrou JSON. Význam kľúčov:

- **Limit pre celé pripojenie vs. limit konkrétneho modelu:** `maxConcurrent` zostáva zdieľaným
  limitom pre celé pripojenie. Ak platia oba limity, obe brány sa získajú atomicky v tej istej
  kompozitnej bráne
  (`global → provider → account → model`); výsledné správanie určuje prísnejší
  uplatniteľný limit.
- **Presná zhoda kľúča modelu:** kľúč je reťazec modelu odovzdaný executorovi po vyriešení
  routovania — zvyčajne holý identifikátor upstream modelu
  (`glm-5`), nie alias `provider/model` na strane klienta (`zai/glm-5` sa nezhoduje s `glm-5`).
  Hodnoty sú kladné celočíselné limity súbežných požiadaviek.
- **Lokálne radenie do frontu, bez zisťovania:** nadbytočné požiadavky sa zaradia do lokálneho
  frontu s existujúcou sémantikou frontu/timeoutu (typované chyby prijatia
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nezisťuje ani neodvodzuje politiku
  upstreamu — vynucuje presné limity nakonfigurované operátorom. Nasýtená brána modelu nikdy
  nezakáže poskytovateľa ani nevytvorí trvalé zablokovanie modelu; správanie pri odpovediach 429,
  cooldowne a fallbacku upstreamu zostáva záložným mechanizmom pri chybách.
- **Rozsah na pripojenie a proces:** limity platia pre každé databázové pripojenie a sú držané
  v pamäti, takže dve pripojenia, ktoré opätovne používajú ten istý kľúč API upstreamu,
  sa navzájom nekoordinujú.
- **Nenakonfigurované znamená bez zmeny:** vynechanie mapy (alebo ponechanie poľa na ovládacom
  paneli prázdneho) nepridá žiadnu bránu modelu. Príklad konfigurácie bez deklarovania
  univerzálneho limitu poskytovateľa:

```text
glm-5=1
glm-4.7=3
```

### Serializácia požiadaviek zdieľania kvóty

Keď dispatch zdieľania kvóty smeruje na pripojenie, ktoré deklaruje kladné
`max_concurrent`, súbežné požiadavky na tento **účet** sa serializujú prostredníctvom
semaforu pre jednotlivé pripojenie (kľúč `qsconn:<connectionId>`): nadbytočné požiadavky
**čakajú vo fronte** namiesto zahltenia účtu. Je **fail-open** — nasýtený front alebo
timeout pokračuje bez slotu a nikdy neodmietne požiadavku, ktorú možno odoslať. Prepínač sa
nachádza v **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, predvolene
zapnuté). Bez limitu `max_concurrent` zostáva správanie nezmenené.

> Routovacia brána zdieľania kvóty (`selectQuotaShareTarget`, DRR + P2C) je sama o sebe
> fail-open a pripojenie na limite iba _znevýhodňuje_ — pri poole s jediným pripojením
> nemôže vynútiť pevný limit, takže tento semafor je to, čo v skutočnosti zabraňuje zahlteniu.

### Opakovanie s ohľadom na cooldown kombinácie

Pri každej stratégii kombinácie (ak je povolená) požiadavka, ktorá by viedla k odpovedi 429
v dôsledku KRÁTKEHO dočasného cooldownu, počká na jeho uplynutie a odošle sa znova namiesto
vrátenia odpovede 429 — týka sa to okien TPM/RPM triedy Gemini (~60 s retry-after)
pri viacrežimových kombináciách, napr. keď oba ciele dvojmodelovej kombinácie narazia
na limit požiadaviek pre model. Správanie je ohraničené nastavením `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) v **Settings → Resilience**. Nikdy
nečaká pri dôvode `quota_exhausted` (zablokované do polnoci) ani pri dôvodoch súvisiacich
s autentifikáciou alebo nenájdením.

Kombinácia môže toto správanie vypnúť pomocou `config.comboCooldownWaitEnabled: false`.
Iba literálna hodnota `false` vypína tieto zdieľané čakania kombinácie (cooldown po odoslaní
a čakanie pred odoslaním pri otvorenom okruhu/zablokovanom modeli) a predĺženie dolnej hranice
časového limitu čakania. Vynechanie hodnoty alebo `true` zachováva globálnu politiku;
`true` nemôže globálne povolené čakanie zapnúť. Explicitné `targetTimeoutMs` má stále prednosť.
Táto výnimka nemení samostatné čakanie pred odoslaním natívneho pripnutia ťahu Codex.

Tá istá brána pokrýva aj prípad pred odoslaním (#16319): keď sa každý cieľ kombinácie
preskočí ešte pred vykonaním akéhokoľvek pokusu, pretože jeho model je v krátkom dočasnom
zablokovaní, cesta s nulovým počtom pokusov počká na skončenie blokovania v rámci rovnakých
limitov a odošle požiadavku znova namiesto odpovede bez nápovedy
`503 ALL_TARGETS_SKIPPED`. Ak čakanie nie je povolené (dosiahnutý limit, vyčerpaný počet
pokusov alebo rozpočet, prípadne vypnutá funkcia), koncová odpoveď sa zmení na
`429 rate_limit_error` a bude obsahovať `retry_after` / `reset_at` z najskoršieho
uplynutia dočasného zablokovania; blokovania kvóty, autentifikácie a nenájdenia si zachovajú
odpoveď 503 bez nápovedy.

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

## 5. Riadenie prijímania do fronty požiadaviek (v3.8.49 · issue #6593)

**Rozsah**: lokálna rate-limit fronta pre dvojicu poskytovateľ+spojenie (`open-sse/services/rateLimitManager.ts`, podporená knižnicou Bottleneck), o jednu vrstvu pod tromi mechanizmami uvedenými vyššie.

**`maxWaitMs` ohraničuje čakanie vo fronte; `executionMaxWaitMs` ohraničuje vykonávanie.**
Tieto dve hodnoty sú zámerne oddelené a žiadna z nich nezasahuje do druhej.

`resilienceSettings.requestQueue.maxWaitMs` je **rozpočet na čakanie vo fronte**: pokrýva čakanie na slot poskytovateľa a následné čakanie v stave QUEUED, pričom jeho časovač sa zruší v okamihu, keď úloha opustí stav QUEUED a začne sa vykonávať (`rateLimitManager.ts`, `wrappedFn`). Požiadavka, ktorá ho prekročí, sa k upstreamu nikdy nedostane. Predvolená hodnota je 30000 ms, poskytuje ju `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` v `src/lib/resilience/settings.ts` a ukotvuje ju test `tests/unit/ratelimit-admission-control-6593.test.ts`, takže zmena tejto hodnoty spôsobí, že daný test zčervená, namiesto toho, aby tento odsek potichu zastarel.

`resilienceSettings.requestQueue.executionMaxWaitMs` je to, čo Bottleneck dostane ako `expiration` úlohy, ktorej časovač sa spustí až po odoslaní na vykonanie (dispatch). Slúži ako poistka pre executory bez vlastného upstream timeoutu, a ak je vlastný timeout executora na spustenie fetchu dlhší, zvýši sa naň — takže nemôže prerušiť zdravú, práve prebiehajúcu odpoveď. Predvolená hodnota je 600000 ms (10 min).

Vkladanie rozpočtu fronty do `expiration` je to, čo kedysi zabíjalo neinkrementálne brány uprostred prenosu — bežia totiž legitímne celé minúty pred prvými bajtmi — a práve preto sa expirácia prezentuje ako `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), zatiaľ čo rozpočet fronty nesie kód timeoutu fronty. Obidve hodnoty možno prepísať cez `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (premenné prostredia) alebo cez dashboard (**Settings → Resilience**). Pri normalizácii sa obe obmedzia na rozsah 1 ms – 24 h.

**Priorita (pre obe):** premenná prostredia určuje iba _predvolenú hodnotu_. Hodnota perzistentne uložená v `resilienceSettings.requestQueue` (dashboard / API patch, uložená v `key_value`) má pred ňou prednosť a hodnoty `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pre konkrétne spojenie majú prednosť ešte pred ňou. Nastavenie premennej prostredia na nasadení, ktoré už má perzistentne uloženú hodnotu, preto nezmení nič — namiesto toho uložené nastavenie vymažte alebo aktualizujte.

Pobyt vo fronte ohraničuje `maxWaitMs`; nižšie uvedený `maxQueueDepth` ohraničuje, koľko volajúcich môže byť vo fronte súčasne.

**Opakované pokusy udané v tele odpovede: riadenie tempa vs. uzamknutie (lockout).** Telo odpovede 429 môže uvádzať vlastnú dobu čakania (Gemini `RetryInfo.retryDelay`, text „retry after Ns“), ktorú načítava `updateFromResponseBody`. Čakanie, ktoré sa zmestí do `maxWaitMs` daného spojenia, je riadenie tempa: limiter na túto dobu vyprázdni svoj zásobník a zaradené volania sa odošlú, keď sa znova doplní. Čakanie dlhšie než `maxWaitMs` nie je niečo, čo by fronta dokázala presedieť — Gemini na vyčerpanú dennú kvótu odpovedá hodnotou `retryDelay: "86399s"`. Prenesená hlavička `Retry-After` na znovuzostavenej odpovedi 429 (#16528) už spôsobuje, že fallback engine uzamkne model na dané okno, ale pozastavenie limitera by napriek tomu zdržalo každé volanie, ktoré sa ku kľúču dostane predčasne (napríklad po resete resilience), na celú dobu `maxWaitMs`. Keď takéto čakanie pochádza z typovaného detailu Google `RetryInfo` (pôvod `google_rpc_retry_info`) a limiter kľúča je už zameraný na model (pozri `getLimiterKey`), stáva sa z odpovede 429 namiesto toho uzamknutie modelu na danom spojení (`lockModelForLongBodyRetry` v `open-sse/services/rateLimitManager/bodyRetryPause.ts`, obmedzené na 24 h) a limiter zostáva nepozastavený. Výber účtu tento zámok preskakuje prostredníctvom `isModelLocked()` a rovnako aj brána combo pred odoslaním pre ciele pripnuté na dané spojenie. Na antigravity, kde je limiter vymedzený na rodinu kvót, je zámok na presnom modeli, rovnako ako jeho ostatné kvótové zámky. Uzamkne sa aj názov, o ktorý klient požiadal, keď ho alias preložil na daný model, pretože tieto kontroly používajú požadovaný názov; uzamyká sa presne (`lockExactModel`), takže alias, ktorý presahuje rodinu kvót antigravity alebo rozsah codex, nikdy neuzamkne svoj vlastný. Nápoveda vo forme prózy, netypovaný `retryDelay` alebo limiter zdieľaný celým spojením zachovávajú pozastavenie. Keď sa limiter, ktorý vetva 429 práve znovu zostavila, skutočne pozastaví, volajúci, ktorého zostávajúci čas vo fronte skončí skôr než pozastavenie, sa okamžite odmietne s kódom timeoutu fronty (`checkLimiterPause`), namiesto toho, aby tento čas vyčkal; zaznamenaný koniec je ukotvený ešte pred zostavením limitera, kde Bottleneck spúšťa svoj časovač obnovy, a akákoľvek neskoršia zmena zásobníka naň zabudne. Pokryté testmi `tests/unit/rate-limit-long-body-retry-lockout.test.ts` a `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — voliteľný strop prijímania (opt-in, novinka).** `resilienceSettings.requestQueue.maxQueueDepth`
ohraničuje, koľko požiadaviek môže súčasne čakať vo fronte (ešte neodpreposlaných) pre jednu dvojicu poskytovateľ+spojenie. Keď fronta už obsahuje `maxQueueDepth` požiadaviek, nová požiadavka sa rýchlo odmietne s typovanou chybou `code: "RATE_LIMIT_QUEUE_FULL"` ešte **predtým**, než sa vôbec dostane k `limiter.schedule()` — odmietnutie je teda lacné a nastáva pred akoukoľvek ďalšou prácou na kompresii promptu či preklade pre danú požiadavku. Predvolená hodnota `0` = vypnuté, čím sa zachováva doterajšie správanie s neobmedzenou frontou; povolený rozsah 0–100000. Prepísať ju možno cez `RATE_LIMIT_MAX_QUEUE_DEPTH` (premenná prostredia) alebo `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Samotná kontrola prijímania je čistá funkcia
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), takže ju možno jednotkovo testovať bez skutočného limitera Bottleneck.

> RFC, ktoré otvorilo #6593, tiež navrhovalo flag `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` v tomto repozitári je kompresia
> promptu/kontextu na odchádzajúcej LLM požiadavke (`chatCore.ts`, okolo bloku
> `resolveCompressionSettings`/`selectCompressionStrategy`), nie HTTP kompresia
> odpovedí na syntetizované telá 429 — neexistuje zodpovedajúca cesta kódu pre
> doslovný bypass flag. Tento krok kompresie promptu sa navyše momentálne spúšťa
> _pred_ `withRateLimit()` v pipeline požiadavky, takže preusporiadanie tak, aby
> sa preskočil pri zamietnutí z dôvodu plnej fronty, je samostatná a väčšia
> zmena, než je rozsah tohto issue; zámerne **nebola** implementovaná tu a je
> ponechaná ako následná úloha, ak zisk z úspory CPU stojí za riziko
> preusporiadania.

### Bezpečnostná sieť automatického zapnutia rate-limitu a ochrana pripojení (`rateLimitProtection`)

**Bezpečnostná sieť automatického zapnutia** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, predvolene `true`):
Predvolene OmniRoute automaticky zapína ochranu fronty rate-limitu pre všetky aktívne pripojenia poskytovateľov s API kľúčom (`getProviderCategory(provider) === "apikey"`). To zaisťuje, že prichádzajúce požiadavky na voči preťaženiu citlivé upstream API kľúče sú zaradené do fronty a obmedzované cez Bottleneck, namiesto toho, aby narazne vyvolávali upstream chyby 429. Bezpečnostnú sieť možno prepísať cez environmentálnu premennú `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` ju vypína, `true`/`1`/`on` vynucuje zapnutie), ktorá má prednosť pred uloženým nastavením dashboardu (**Nastavenia → Odolnosť** / `PATCH /api/resilience`).

**Sémantika `rateLimitProtection` na úrovni pripojenia:**
Ochrana rate-limitu na úrovni pripojenia je sledovaná cez boolean pole `rateLimitProtection` na pripojeniach poskytovateľov (uložené ako `rate_limit_protection` v SQLite):

- **Explicitné zapnutie (`rateLimitProtection === true`)**: Ochrana rate-limitu je pre toto pripojenie explicitne zapnutá, bez ohľadu na kategóriu poskytovateľa alebo na to, či je zapnutá bezpečnostná sieť automatického zapnutia.
- **Explicitné vypnutie (`rateLimitProtection === false`)**: Vypína explicitnú ochranu, ale **nevyraďuje** aktívne pripojenie s API kľúčom z globálnej bezpečnostnej siete automatického zapnutia. V `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) sú `false` a `undefined` ekvivalentné: iba `rateLimitProtection === true` sa považuje za explicitné prepísanie. Ak je `rateLimitProtection` `false` (alebo nenastavené), aktívne pripojenie s API kľúčom stále spĺňa podmienku automatického zapnutia a zostáva chránené rate-limitom.
- **Žiadne vylúčenie na úrovni pripojenia**: Operátor momentálne nemôže vyjadriť „toto jedno aktívne pripojenie s API kľúčom musí bežať bez ochrany fronty rate-limitu“ a zároveň ponechať automatické zapnutie aktívne pre ostatné pripojenia. Na úplné spustenie pripojení s API kľúčom bez front rate-limitu musí byť bezpečnostná sieť vypnutá globálne (`RATE_LIMIT_AUTO_ENABLE=false` alebo `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podporované zapisovacie cesty:**

- **`POST /api/rate-limits`**: Podporovaná administratívna zapisovacia cesta na prepnutie `rateLimitProtection` pre pripojenie (`{ connectionId: string, enabled: boolean }`). Volanie s `enabled: true` zapína explicitnú ochranu; volanie s `enabled: false` odstraňuje explicitnú ochranu (hoci aktívne pripojenia s API kľúčom zostávajú pokryté globálnou bezpečnostnou sieťou, ak je automatické zapnutie zapnuté).
- **`PUT /api/providers/[id]`**: Zámerne **neprijíma** ani neprepína `rateLimitProtection` (#11278). Aktualizácia metadát pripojenia poskytovateľa cez `PUT /api/providers/[id]` nikdy nezmení uložený stav ochrany rate-limitu.

---

## 6. Sledovanie priepustnosti pomalého toku (#9709)

Voliteľná ochrana `resilienceSettings.streamRecovery.throughputWatchdog` deteguje upstream, ktorý stále posiela bloky, ale produkuje výstup asistenta pod nakonfigurovanou užitočnou výstupnou rýchlosťou. Zámerne sa líši od časového limitu nečinnosti: tlkot srdca a metadáta neresetujú ani časovač a nepočítajú sa ako pokrok. Odlišuje sa tiež od termínu tvrdého pokusu (#9153), ktorý zostáva absolútnym bezpečnostným stropom bez ohľadu na kvalitu výstupu.

Watchdog vyžaduje zahrievaciu periódu, po ktorej nasleduje kompletné rolovacie okno, než sa môže zrušiť. Počíta textové delty z výstupných udalostí API dokončenia chatu a odpovedí (konzervatívny bajtový proxy UTF-8 ), ignoruje udalosti len na použitie a prázdne udalosti a pozastaví posudzovanie, keď prebiehajú udalosti vyvolania nástroja alebo uvažovania. V predvolenom nastavení je vypnutá a dá sa povoliť pomocou `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (táto hodnota env nasadí iba predvolené — a uložená logická hodnota `resilienceSettings.streamRecovery.throughputWatchdog.enabled` vyhrá; pozri poznámku k priorite env-vs-dashboard v hornej časti tejto príručky); okno, zahrievanie, minimálna rýchlosť a minimálny merateľný výstup sú ohraničené normálnou vrstvou normalizácie nastavení odolnosti.

Keď je táto možnosť povolená, prerušenie sledovania sa použije iba na aktívny pokus o upstream. Pred akýmikoľvek bajtami viditeľnými pre klienta môže existujúca cesta skorého obnovenia rovnakého účtu znova otvoriť pokus. Po odovzdaní sa stream nikdy neprehrá naslepo; iba existujúca bezpečná zmluva o pokračovaní v strednom prúde môže pripojiť príponu. Finalizácia zostáva jednorazová, takže účtovanie používania a vydanie semaforu nie sú duplicitné.

---

## 7. Preformulovanie stavu upstreamu (chybne uvedené chyby kvóty)

**Rozsah:** jedna upstream brána, ktorá hlási dočasné vyčerpanie kvóty nesprávnym HTTP stavom.

**Účel:** opraviť zavádzajúci stav PRED klasifikáciou, aby downstream spotrebitelia (mechanizmus fallbacku, combo agregácia, odpoveď smerom ku klientovi) videli skutočnú opakovateľnú povahu zlyhania.

Niektoré brány signalizujú DOČASNÉ vyčerpanie kvóty HTTP stavom, ktorý neumožňuje opakovanie. `agentrouter.org` vracia `403` (niekedy `400`) s čínskym telom (`用户额度不足` / `额度不足`) namiesto štandardného `429`. Klienti ako Claude Code považujú `403` za trvalú chybu a ukončia reláciu, a bez opravy by ju mechanizmus fallbacku klasifikoval ako `AUTH_ERROR` namiesto udalosti kvóty.

**Implementácia:**

- Register + porovnávač: `open-sse/config/upstreamStatusRestatement.ts` — zoznam pravidiel pre jednotlivých poskytovateľov (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), porovnávaný pomocou `applyStatusRestatement()`.
- Miesto volania: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (okolo riadku 3654), hneď po tom, čo `parseUpstreamError()` spracuje odpoveď upstreamu s chybovým HTTP stavom (`!providerResponse.ok`), a pred spustením akejkoľvek klasifikácie, takže každý downstream spotrebiteľ vidí opravený stav. Chyby vložené vo vnútri SSE streamu so stavom `200` prechádzajú samostatnou, neskoršou cestou parsovania streamu a tento hook ich dnes **nepokrýva** — ide o známe obmedzenie, ktoré zatiaľ nie je potrebné pre agentrouterov chybný stav (ten sa prejavuje ako chybový HTTP stav).
- Spôsobilosť na opakovanie: `429` je v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), takže preformulovaná chyba nesie skutočné okno opakovania namiesto toho, aby sa objavila ako mŕtva `403`.
- Syntetická hodnota `60s` v `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  je len to, čo preformulovaná odpoveď oznamuje **klientovi**; sama osebe to nie je interná doba cooldownu/lockoutu pripojenia — tú riadi osobitne mechanizmus, ktorý preformulovanú chybu skutočne spracúva
  (eskalujúci backoff Connection Cooldown, §2, so základom `3s` pre poskytovateľov s API kľúčom; alebo Model Lockout, §3, pre poskytovateľov s kvótou na model, ako je agentrouter). Router sa môže stať interne spôsobilým na opakovanie skôr, než je 60-sekundové okno, ktoré oznamuje klientovi — ide o zámernú rezervu, nie o chybu.

Trvalé chyby (agentrouterovo `无权访问模型` — žiadny prístup k tomuto modelu) sa NIKDY nepreformulúvajú: `excludeMarkers` vetujú pravidlo aj vtedy, keď `textMarkers` zasiahnu, takže chyba si ponechá pôvodný stav a nič ju neopakuje donekonečna. Zodpovedajúce klasifikačné pravidlo poskytovateľa
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarovaný základný cooldown `6h`) konzultuje `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pred_ generickým predčasným návratom `FORBIDDEN` pre kategóriu apikey, podmienené funkciou
`honorsRuleLockScope(provider)` (#10334 — momentálne exkluzívne pre agentrouter prostredníctvom allowlistu
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v
`providerErrorRules.ts`). Deklarovaný 6-hodinový cooldown pravidla prechádza ako
`fallbackResult.baseCooldownMs`, ale stále napája už existujúcu cestu lockoutu kvóty na model
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ktorú #10334 nemení okrem zdroja cooldownu): je obmedzený na operátorove `mlSettings.maxCooldownMs`
(predvolené `1_800_000ms` / 30 min), ako každý iný lockout modelu, a
_perzistovaný dôvod lockoutu_ zostáva pôvodný natvrdo zakódovaný `"forbidden"`,
nie `"auth_error"` z pravidla — end-to-end sa rešpektuje len trvanie cooldownu, nie reťazec dôvodu. Samotné pripojenie zostáva aktívne;
súrodenecké modely na tom istom pripojení nie sú ovplyvnené.

Preformulované chyby kvóty (`额度不足`) v produkcii dosiahnu pravidlo poskytovateľa
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastného deklarovaného cooldownu — uplatní sa predvolený škálovaný backoff perzistenčnej vrstvy). Od #10334 sa `scope` na
`ProviderErrorRuleMatch` skutočne uplatňuje end-to-end, ale **len** pre poskytovateľov v
allowliste `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
dnes len `"agentrouter"`, podmienené cez `honorsRuleLockScope()`). Pre každého iného poskytovateľa zostáva `scope` informatívny, presne ako pred #10334.
`checkFallbackError` vynáša scope zhodného pravidla ako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je zdieľaná kontrolná funkcia, ktorá potvrdzuje, že
`ruleScope` je skutočne bezpečné rešpektovať ako signál platný pre celé pripojenie a samoopraviteľný (scope `"connection"`, dôvod `quota_exhausted`, nikdy `permanent`,
nikdy `creditsExhausted` — obrana proti budúcemu pravidlu, ktoré by spájalo scope
`"connection"` s trvalým stavom účtu). Volajú ju dvaja spotrebitelia:

- **Perzistencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  namiesto prechodu do vetvy uzamknutia **pre jednotlivé modely**
  sprostredkujúceho poskytovateľa (agentrouter má `passthroughModels: true` → `hasPerModelQuota()`
  vracia `true`) sa použije **dočasné pozastavenie pripojenia** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikdy nie konečný stav
  (`credits_exhausted`/`banned`/`expired`) — takže sa pripojenie po uplynutí
  pozastavenia samo obnoví a nevyžaduje manuálne obnovenie prihlasovacích údajov.
  Preskočí sa pri pripojeniach s `disableCooling: true` (#2997): toto odhlásenie
  namiesto toho prejde do uzamknutia pre jednotlivé modely (zdokumentovaný kompromis —
  pozrite si komentár v kóde nad touto vetvou).
- **Kombinované smerovanie v rámci tej istej požiadavky** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): rovnaká podmienka označí
  pripojenie v množine `exhaustedConnections` v pamäti s kľúčom
  `${provider}:${connectionId}`. Týmto sa preskočí iba zostávajúci cieľ TEJ ISTEJ POŽIADAVKY,
  ktorý _už sám obsahuje presne tento `connectionId`_ vo svojom vlastnom
  cieľovom objekte (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pred vyhľadaním v `exhaustedConnections`) — obyčajná
  kombinácia zoznamu modelov, v ktorej súrodenecké ciele neobsahujú vlastný
  pripnutý `connectionId` a jeden sa pri každom odoslaní iba rozpozná z hlavičky
  odpovede `X-OmniRoute-Selected-Connection-Id`, nikdy nenájde zhodu s týmto kľúčom. V
  tomto bežnom prípade skutočnú ochranu pred tým, aby zostávajúca vetva znova použila
  práve vyčerpaný účet, NEPOSKYTUJE táto množina Set — poskytuje ju vyššie uvedená
  perzistenčná vrstva (`rateLimitedUntil` pripojenia je teraz v budúcnosti) v kombinácii
  s tým, že rovnaká podmienka pre toto zlyhanie potlačí
  `transientRateLimitedProviders` (pozrite si časť „Dvojstupňový návrh“ a komentár v kóde
  pri vetve `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`): keď
  táto množina Set zostane neoznačená, vynútené povolenie `allowRateLimitedConnection`
  v `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sa pre
  zostávajúce vetvy poskytovateľa NEAKTIVUJE, takže filter `rateLimitedUntil`
  pri výbere prihlasovacích údajov (`src/sse/services/auth.ts:1238`) sa normálne
  dodrží a zostávajúca vetva buď vyberie iné, stále použiteľné pripojenie
  agentrouter, alebo zlyhá, pretože nie sú dostupné žiadne prihlasovacie údaje —
  nevynúti si návrat k pripojeniu, ktoré táto vetva práve pozastavila.

### Dvojstupňový návrh: preformulovanie stavu, potom klasifikácia

Preformulovanie stavu (`upstreamStatusRestatement.ts`) a pravidlá klasifikácie
poskytovateľov (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sú samostatné registre, ktoré používajú ako kľúč
identifikátor poskytovateľa a textové značky, ale spúšťajú sa na rôznych miestach
a slúžia na rôzne účely: preformulovanie zavčasu prepíše stav HTTP v `chatCore.ts`;
klasifikačné pravidlá vyberú záložný `reason` a `scope` uzamknutia
(`model` / `provider` / `connection`) v rámci `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klasifikačné pravidlá vidia celý **text** chyby (potrebný na zhodu so značkami
v tele, ako je `额度不足`) iba pri poskytovateľoch uvedených v zozname povolených
`FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — momentálne iba
`"agentrouter"`. Pri každom ďalšom poskytovateľovi zo **vstavaného katalógu**
odovzdá `checkFallbackError` funkcii `getProviderErrorRuleMatch` iba
štruktúrovanú chybu (`{code, type}`), čo postačuje pre pravidlá založené na
hlavičke/stave/kóde, ale neumožňuje rozpoznať textové značky v tele.
Pomocná funkcia `resolveRuleMatchBody()` vykonáva tento výber: celý text chyby
pre poskytovateľov v zozname povolených, inak štruktúrovanú chybu. Pridanie
**vstavaného** poskytovateľa do `FULL_TEXT_RULE_PROVIDERS` je výslovné povolenie
pre konkrétneho poskytovateľa — existuje preto, aby predvolená cesta pre každého
poskytovateľa, ktorý nie je v zozname, zostala nezmenená do posledného bajtu.

Hodnota `scope` pravidla (`model` / `provider` / `connection`) predstavuje
samostatné výslovné povolenie nezávislé od `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` ju sprístupní iba ako `fallbackResult.ruleScope` a následní
používatelia ju považujú za niečo iné než informatívny štítok iba pri
poskytovateľoch v zozname povolených `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v tom
istom súbore (riadené prostredníctvom `honorsRuleLockScope()` — dnes iba
`"agentrouter"`). Informácie o tom, čo zhoda s `scope: "connection"` skutočne
robí po zaradení poskytovateľa do tohto zoznamu povolených, nájdete vyššie
v časti „Preformulované chyby kvóty“.

**#11104 — pravidlá deklarované operátorom obchádzajú oba zoznamy povolených.**
Operátor môže za behu deklarovať pravidlo pre konkrétneho poskytovateľa
prostredníctvom `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) bez
úpravy tohto súboru. Podmienenie pravidla operátora zoznamami
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — ktoré majú
chrániť **predvolené** správanie pravidiel vstavaného katalógu — by spôsobilo,
že mechanizmus nastavení by bol nefunkčný pre každého poskytovateľa okrem tých,
ktorí sú už v týchto zoznamoch uvedení, pretože samotné deklarovanie pravidla
už predstavuje výslovné povolenie operátora. `resolveRuleMatchBody()` aj
`honorsRuleLockScope()` najprv kontrolujú `hasOperatorRuleForProvider()`:
poskytovateľ s pravidlom operátora dostane nespracovaný text chyby a jeho
deklarovaná hodnota `scope` sa dodrží bez ohľadu na to, či sa nachádza aj
v niektorom zo zoznamov povolených.

**Známy nedostatok — `providerRuleRegistry` sa pri HTTP 400 nikdy nepoužije.**
Vetva `BAD_REQUEST` funkcie `checkFallbackError` klasifikuje stav 400 výhradne
prostredníctvom vlastných polí vzorov (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` atď. v `accountFallback.ts`) a skončí skôr, než sa
dosiahne vetva `configuredRule`/`getProviderErrorRuleMatch` uvedená vyššie.
Pravidlo vstavaného katalógu (alebo pravidlo operátora) so `status: 400` je
syntakticky platné, ale nikdy sa nespustí. V súčasnosti žiadne existujúce
pravidlo necieli na stav 400, takže v produkcii nie je nič ovplyvnené — budúce
pravidlo pre stav 400 si však najprv vyžiada úpravu tejto vetvy, čo je väčšia
zmena než pridanie pravidla (zmení klasifikáciu stavu 400 pre každého
poskytovateľa, ktorý sa už spolieha na správanie polí vzorov), a presahuje rámec
pridania pravidla pre jedného poskytovateľa.

### Pridanie novej brány, ktorá nesprávne uvádza kvótu

1. Zaregistrujte jedno pole pravidiel v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Markery `textMarkers`
   udržujte špecifické pre daného poskytovateľa; nikdy znova nepoužívajte
   všeobecné anglické frázy, ktoré sa prekrývajú s
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Voliteľne zaregistrujte klasifikačné pravidlá v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby sa
   zvolil správny rozsah zámku (`connection` pre kvótu v rozsahu celého
   účtu, `model` pre chyby jednotlivých modelov). Tento krok sa v produkcii
   prejaví len u poskytovateľov, ktorých pravidlá potrebujú plný text chyby
   (markery tela odpovede): pridajte identifikátor poskytovateľa do
   `FULL_TEXT_RULE_PROVIDERS` v tom istom súbore — inak `checkFallbackError`
   odovzdá pravidlu vždy len štruktúrovanú chybu `{code, type}` a pravidlo
   založené na texte tela sa nikdy nezhoduje so živou prevádzkou. Pravidlá,
   ktoré sa zhodujú výlučne na základe `status`/`headers` (ako pravidlá
   Opencode alebo Minimax), tento opt-in nepotrebujú. Samostatne platí: ak
   pravidlo deklaruje `scope: "connection"` a zámerom je skutočný cooldown
   v rozsahu celého pripojenia plus preskočenie komba v rámci toho istého
   požiadavku (nie len informatívne označenie), pridajte identifikátor
   poskytovateľa do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v tom istom súbore —
   práve toto riadi konzumáciu v štýle `isAgentrouterConnectionQuotaScope()`
   v `markAccountUnavailable()` (`src/sse/services/auth.ts`) a
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toho `scope` síce
   prúdi cez `fallbackResult.ruleScope`, ale nič naň nereaguje.
3. Pridajte jednotkové testy zrkadliace
   `tests/unit/upstream-status-restatement.test.ts` a
   `tests/unit/agentrouter-error-rules.test.ts` (vrátane guardov
   not-permanent / not-creditsExhausted a — ak poskytovateľ potrebuje
   allowlist — testu, ktorý overuje, že `resolveRuleMatchBody()` vráti plný
   text len pre daného poskytovateľa).

Zmeny v `chatCore.ts`, `classifyError` ani v kombe nie sú potrebné.

#### Zámok bucketovaný podľa egress (#10880)

Poskytovatelia v `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodina opencode) sa
považujú za upstream bucketovaný podľa IP (bezplatná úroveň opencode je
bucketovaná podľa IP, nie podľa účtu — pozri #9611): stav 429 klasifikovaný
ako `quota_exhausted` **alebo** `rate_limit_exceeded` ochladí každé
pripojenie z allowlistovanej rodiny, ktorého posledná známa egress IP sa
zhoduje s IP zlyhávajúceho pripojenia, skôr než ich rotácia stihne
vyskúšať — čím sa predíde N-1 zaručene neúspešným volaniam upstreamu
(rovnaký princíp ako #10460/#10525). `rate_limit_exceeded` je zahrnutý
zámerne: na ceste `markAccountUnavailable` sa pravidlá špecifické pre
opencode nikdy nezhodujú (`checkFallbackError` nedostane žiadne hlavičky
ani telo, opencode nie je v `FULL_TEXT_RULE_PROVIDERS`), takže 429, ktorej
telo nesie text o kvóte predplatného ("monthly usage limit reached"), sa
klasifikuje ako `quota_exhausted` záložnou klasifikáciou podľa kvótového
textu (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1-hodinový
cooldown) skôr, než sa vôbec dosiahne pravidlo `status_429` — zatiaľ čo 429
bez kvótového textu (čisté obmedzovanie rýchlosti) sa klasifikuje cez
pravidlo `status_429` ako `rate_limit_exceeded` a napriek tomu ochladí
celú IP rodinu. Pre allowlistovaného poskytovateľa je rate limit
bucketovaný podľa IP rovnaký signál ako vyčerpaná kvóta. Úprimné
obmedzenia:

- **Best-effort**: zámok zisťuje poslednú známu `egress_ip` pripojenia
  z `proxy_logs` (24-hodinové okno, synchrónne, bez cache). Studená cache
  (egress IP nebola nikdy sondovaná) alebo žiadny riadok → zlyhávajúce
  pripojenie je vetvou stále ochladené (zaznamenané rovnako ako doteraz),
  len sa nezamkne žiadny súrodenec.
- **Nikdy terminálny**: cooldown je obnovujúce sa kvótové okno
  (`testStatus: "unavailable"`); trvalý stav sa nikdy neodvodzuje zo signálu
  na úrovni IP. Pripojenia s `disableCooling` vetvu úplne preskakujú.
- **Granularita zámku sa mení pre rodinu na allowliste**: ide o zmenu
  rozsahu, nie len o optimalizáciu súrodencov. opencode je poskytovateľ
  `passthroughModels`, takže pred touto vetvou chyba 429 spôsobila blokovanie
  na úrovni MODELU; teraz spôsobuje cooldown pripojenia — vrátane operátora,
  ktorý prevádzkuje jediné pripojenie úplne bez súrodenca. Toto je granularita,
  ktorú tabuľka pravidiel opencode už deklaruje ako správnu
  (`scope: "connection"`, `providerErrorRules.ts`), no doteraz nebola
  rešpektovaná, pretože opencode nie je v
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Vetva sama zapisuje cooldown
  zlyhávajúceho pripojenia + `backoffLevel`, zrkadlí vetvu agentrouter
  s rozsahom na pripojenie, a vracia sa — blok per-model ani všeobecná
  cesta nižšie sa nikdy nedosiahnu.
- **Vrátane combo**: rovnako ako vetva agentrouter, rozsah zámerne ignoruje
  downgrade `persistUnavailableState`/`isCombo`, ktorý volajúci combo aplikuje
  na chybu 429. Blokovanie per-model nie je slabšia forma tohto rozsahu, je
  to nesprávna jednotka: nehovorí nič o vyčerpanej IP, takže combo rotácia by
  naďalej pálila jeden zaručene neúspešný hovor na súrodenca.
- **Bezpečnosť súrodencov**: súrodenec, ktorý už je terminálny
  (banned/credits_exhausted) alebo už je v dlhšom cooldowne, sa nikdy
  neprepíše.
- **Exkluzívny allowlist**: rozšírenie `EGRESS_BUCKETED_LOCK_PROVIDERS` je
  explicitné rozhodnutie vlastníka; žiadne generické zapojenie (vzor
  #10334/#10419). Dopyt na súrodencov viaže ten istý allowlist namiesto jeho
  opakovania ako SQL literálu, takže jeho rozšírenie zostáva jednoriadkovou
  zmenou.
- **Rotácia egress IP, oboma smermi**: vyhľadávacie okno (24 h) je oveľa
  širšie než TTL cache egress IP (5 min), takže „posledná známa IP" je
  história, nie aktuálny stav. Ak sa proxy pripojenia v rámci okna zrotovalo,
  zámok môže **minúť** skutočne zdieľanú IP (zaznamenaná IP je tá nová,
  nevyčerpaná) — a symetricky môže **ochladiť súrodenca, ktorý sa medzitým
  zrotoval preč** z vyčerpanej IP. Druhý prípad stojí daného súrodenca jedno
  okno cooldownu; oboje sú akceptované limity best-effort vyhľadávania
  založeného na histórii.
- **Náklady**: dva ohraničené skeny `proxy_logs` (filtrované oknom cez
  `idx_pl_timestamp`), iba pri frekvencii chýb 429. Žiadny nový index
  (migrácia 134, YAGNI). Merané na kópii DB s reálnou prevádzkou strednej
  veľkosti; inštancia s vysokou priepustnosťou drží v rovnakom okne
  proporcionálne viac riadkov.

---

## Ďalšie funkcie odolnosti

- **20 smerovacích stratégií** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — pozri [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Smerovanie s ohľadom na reset** (v3.8.0) — uprednostňuje pripojenia podľa času resetu kvóty.
- **Degradácia režimu na pozadí** — Responses API `background: true` sa degraduje na synchronný režim s upozornením.
- **Dynamická detekcia limitov nástrojov** — obmedzí poskytovateľov, keď sa dosiahnu limity počtu nástrojov.
- **Núdzový fallback** — ovládaný cez `OMNIROUTE_EMERGENCY_FALLBACK`; operátori ho môžu prepísať zo stránky Feature Flags bez reštartu.

---

## Ladenie

- Vážené kombo odpovie `503 all_targets_cooling_down` (`Retry-After` je nastavené, `diagnostics.excluded` uvádza každý cieľ s `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je nakonfigurovaný a pripojený, každý cieľ je len vylúčený časovačom odolnosti; varovanie `[COMBO] Weighted selection: every target excluded before dispatch — …` uvádza dôvody a zostávajúce sekundy. `404 no_executable_targets` z toho istého komba znamená, že nebol zasiahnutý žiadny časovač odolnosti (nie je čo spustiť, alebo každý účet zlyhal v sonde dostupnosti). Zostavené v `open-sse/services/combo/pinRecovery.ts` z vylúčení zozbieraných v `targetResolution.ts`.
- Všetky kľúče poskytovateľa preskočené → skontrolujte stav ističa AJ `rateLimitedUntil`/`testStatus` každého pripojenia.
- Poskytovateľ natrvalo vylúčený po okne resetu → kód číta surový `state` namiesto `getStatus()`/`canExecute()`.
- Jeden kľúč zlyhá, ostatné by mali fungovať → uprednostnite cooldown pripojenia pred ističom.
- Zlyhá len jeden model → uprednostnite model lockout pred cooldownom pripojenia.
- Stav by sa mal sám obnoviť, ale neobnoví → skontrolujte časovú pečiatku v budúcnosti + cestu čítania, ktorá obnovuje exspirovaný stav. Trvalé stavy vyžadujú manuálne zmeny.

---

## Stav za behu — rýchla referencia pre agenta

> Presunuté doslovne z `AGENTS.md` → „Resilience Runtime State" (PR #12743), aby sprievodca
> agenta zostal pod rozpočtom kontextu 40k. Je to zhustený pohľad na vyššie uvedené sekcie
> určený agentom; číslované sekcie zostávajú úplnou referenciou.

OmniRoute má tri príbuzné, ale odlišné mechanizmy dočasných zlyhaní. Pri ladení správania
smerovania udržujte ich rozsahy oddelené. Pre mapu na prvý pohľad pozri
[diagram trojvrstvovej odolnosti](../diagrams/exported/resilience-3layers.svg)
(zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Istič poskytovateľa (Provider Circuit Breaker)

**Rozsah**: celý poskytovateľ, napr. `glm`, `openai`, `anthropic`.

**Účel**: zastaviť odosielanie prevádzky poskytovateľovi, ktorý opakovane zlyháva na
úrovni upstream/služby, aby jeden nezdravý poskytovateľ nespomaľoval každú požiadavku.

**Implementácia**:

- Základná trieda: `src/shared/utils/circuitBreaker.ts`
- Zapojenie brány/vykonávania chatu: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu za behu: `src/app/api/monitoring/health/route.ts`
- Zdieľané obaly: `open-sse/services/accountFallback.ts`
- Tabuľka perzistentného stavu: `domain_circuit_breakers`

**Stavy** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normálna prevádzka je povolená.
- `DEGRADED`: pásmo včasného varovania — zlyhania prekročili prah degradácie, ale ešte nie
  prah ističa; prevádzka stále tečie, dashboardy zobrazujú varovanie. Platný test pripojenia
  alebo tiché okno bez nového zlyhania ho vráti do `CLOSED`
  (okno je uvedené v `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: poskytovateľ je dočasne zablokovaný; volajúci dostane odpoveď provider-circuit-open
  alebo smerovanie komba preskočí na iný cieľ.
- `HALF_OPEN`: timeout resetu uplynul; povolí sa testovacia požiadavka. Úspech istič
  zatvorí, zlyhanie ho znova otvorí.

**Predvolené hodnoty** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, používané cez
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` v `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` v `src/sse/handlers/chatHelpers.ts`). Istič celého
poskytovateľa beží na `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil   | degraduje sa pri | otvorí sa pri (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| -------- | ---------------: | ----------------------------------------: | ----------------------------: |
| OAuth    |              `5` |                                       `8` |                         `60s` |
| API kľúč |              `7` |                                      `12` |                         `30s` |
| Lokálny  |       (odvodené) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` tiež definuje `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) a `providerCooldownMs` (5/10/1 min): tieto napájajú
**oknovú bránu opt-in globálneho Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`, predvolene
vypnuté) — záznam na úrovni poskytovateľa v `open-sse/services/providerCooldownTracker.ts` sa
počíta ako chladnúci až po `providerFailureThreshold` zlyhaniach vnútri `providerFailureWindowMs`,
a potom chladne po dobu `providerCooldownMs`. NIE sú to prahy živého ističa — neladte ich
v očakávaní správania ističa. Každá predvolená hodnota je prepísateľná cez env premenné
`OMNIROUTE_PROVIDER_BREAKER_*` a `OMNIROUTE_CIRCUIT_BREAKER_*`; referenčná tabuľka presná
pre beh je v `docs/architecture/RESILIENCE_GUIDE.md`.

Istič poskytovateľa by mali aktivovať len stavy zlyhania na úrovni poskytovateľa:

```ts
(408, 500, 502, 503, 504);
```

Neaktivujte istič celého poskytovateľa pre bežné chyby účtu/kľúča/modelu, ako je väčšina
prípadov `401`, `403` alebo `429`. Tie zvyčajne patria do cooldownu pripojenia alebo model
lockout. Všeobecné `403` poskytovateľa s API kľúčom by malo byť obnoviteľné, pokiaľ nie je
klasifikované ako terminálna chyba poskytovateľa/účtu.

Breaker používa lenivú obnovu, nie časovač na pozadí. Keď vyprší stav `OPEN`, čítania ako
`getStatus()`, `canExecute()` a `getRetryAfterMs()` obnovia stav na
`HALF_OPEN`, takže dashboardy a nástroje na vytváranie kandidátov kombinácií nevylučujú
providera s vypršanou platnosťou naveky.

### Cooldown pripojenia

**Rozsah**: jedno pripojenie/účet/kľúč providera.

**Účel**: dočasne preskočiť jeden zlý kľúč/účet, pričom ostatné pripojenia pre toho
istého providera môžu naďalej obsluhovať požiadavky.

**Implementácia**:

- Cesta zápisu/aktualizácie: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výber/filtrovanie účtov: `src/sse/services/auth.ts::getProviderCredentials...`
- Výpočet cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavenia: `src/lib/resilience/settings.ts`

Dôležité polia na pripojeniach providerov:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Počas výberu účtu sa pripojenie preskočí, pokiaľ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny sú tiež lenivé: keď je `rateLimitedUntil` v minulosti, pripojenie sa opäť
stane oprávneným. Po úspešnom použití `clearAccountError()` vymaže `testStatus`,
`rateLimitedUntil`, chybové polia a `backoffLevel`.

Predvolené správanie cooldownu pripojenia:

- Základný cooldown OAuth: `5s`.
- Základný cooldown API kľúča: `3s`.
- Pri API kľúčoch by malo `429` uprednostniť náznaky opakovania z upstreamu
  (`Retry-After`, hlavičky resetu alebo parsovateľný text resetu), ak sú k dispozícii.
- Opakované opraviteľné zlyhania používajú exponenciálny backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ochrana proti thundering herd zabraňuje súbežným zlyhaniam na tom istom pripojení
opakovane predlžovať cooldown alebo dvojnásobne inkrementovať `backoffLevel`.

Terminálne stavy nie sú cooldowny. `banned`, `expired` (ktorý sa stáva terminálnym až po N ohraničených pokusoch cez `EXPIRED_RETRY_MAX`) a `credits_exhausted` majú
zostať nedostupné, kým sa nezmenia prihlasovacie údaje/nastavenia alebo ich operátor
nezresetuje. Neprepisujte terminálne stavy prechodným stavom cooldownu.

### Blokovanie modelu

**Rozsah**: provider + pripojenie + model.

**Účel**: zabrániť vypnutiu celého pripojenia, keď je pre toto pripojenie nedostupný
alebo kvótovo obmedzený len jeden model.

Príklady:

- Provideri s kvótou na model vracajúci `429`.
- Lokálni provideri vracajúci `404` pre jeden chýbajúci model.
- Zlyhania oprávnení režimu/modelu špecifické pre providera, ako napríklad vybrané
  režimy Grok.

Blokovanie modelu sa nachádza v `open-sse/services/accountFallback.ts` a umožňuje tomu
istému pripojeniu naďalej obsluhovať iné modely.

### Usmernenia pre ladenie

- Ak sú všetky kľúče providera preskočené, skontrolujte stav breakera providera aj
  `rateLimitedUntil`/`testStatus` každého pripojenia.
- Ak sa provider javí ako trvalo vylúčený aj po okne resetu, skontrolujte, či kód
  číta surový `state` namiesto použitia `getStatus()`/`canExecute()`.
- Ak zlyhá jeden kľúč providera, ale ostatné by mali fungovať, uprednostnite cooldown
  pripojenia pred breakerom providera.
- Ak zlyhá len jeden model, uprednostnite blokovanie modelu pred cooldownom pripojenia.
- Ak sa má stav obnoviť sám, mal by mať budúcu časovú pečiatku/timeout resetu a cestu
  čítania, ktorá obnovuje vypršaný stav. Trvalé stavy vyžadujú manuálnu zmenu
  prihlasovacích údajov alebo konfigurácie.

---

## TLS fingerprinting a stealth

Stealth špecifický pre jednotlivých poskytovateľov (JA3/JA4, CCH, obfuskácia) je dokumentovaný samostatne — pozri `docs/security/STEALTH_GUIDE.md` (git; nie je skompilovaný do `/docs`).

---

## Testovanie odolnosti (Fáza 8 · Blok C)

Okrem jednotkových testov logiky odolnosti tri testy preverujú runtime za reálnych
podmienok stresu/zlyhania (všetky sú integračné/nočné — žiadne neblokujú PR):

| Test        | Popis                                                                                                                                                                               | Spustenie                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Falošný upstream uzol vnáša reálnu latenciu/resety/timeouty/503; overuje, že sa circuit breaker otvorí a zotaví a že `checkFallbackError` klasifikuje 503 ako obnoviteľný fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 streamov na `createSSEStream` pod `--expose-gc`; zlyhá, ak heap narastie nad stanovený strop (ochrana pred OOM #3069).                                                         | `npm run test:heap`                    |
| k6 soak     | Trvalé zaťaženie voči `/api/monitoring/health`; prahové hodnoty p95/chybovosti.                                                                                                     | `k6 run tests/load/k6-soak.js` (nočné) |

Orchestruje `.github/workflows/nightly-resilience.yml` (cron + dispatch). V predvolenom
`test:integration` sa chaos a heap testy samé preskočia (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pozri tiež

- [Príručka architektúry](./ARCHITECTURE.md) — Architektúra systému a vnútorné detaily
- [Používateľská príručka](../guides/USER_GUIDE.md) — Poskytovatelia, kombinácie, integrácia CLI
- [Motor Auto-Combo](../routing/AUTO-COMBO.md) — 16-faktorové skórovanie, balíky režimov
