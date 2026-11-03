# Resilience Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute има три различита, али повезана механизма отпорности. Сваки има другачији обим и сврху. Држите их одвојено када отклањате грешке у понашању рутирања.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Извор: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Енв-вс-дасхбоард приоритет за промену отпорности.** Опт-ин отпорност пребацује из окружења — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — само _дефаулт_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Боолеан је остао у `resilienceSettings` (контролна табла →** Подешавања → Отпорност** / `PATCH /api/resilience`, ускладиштено у `key_value`) побеђује над вредношћу енв: нормализација (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) задржава сачувани логички податак кад год постоји. Подешавање такве енв вар на `true` у примени где је контролна табла већ сачувана `false` стога ништа не мења — окрените прекидач у** Подешавања → Отпорност** (или обришите сачувано поље).

## 1. Prekidač kola provajdera (circuit breaker)

**Opseg:** ceo provajder (npr. `glm`, `openai`, `anthropic`).

**Svrha:** zaustaviti slanje saobraćaja ka provajderu koji stalno otkazuje na nivou upstream-a/usluge.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API za status: `GET /api/monitoring/health`
- API za resetovanje: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- Tabela u bazi podataka: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalan saobraćaj je dozvoljen
- `DEGRADED` — saobraćaj je i dalje dozvoljen, ali se prate povećani otkazi provajdera; vraća se u `CLOSED` nakon dovoljnog broja uspeha, nakon uspešnog testa konekcije, ili nakon najdužeg `OPEN` zadržavanja za poslednju vrstu otkaza (njena vrednost `cooldownByKind`, inače `resetTimeout`, × `maxBackoffMultiplier`, najmanje jedan cooldown) bez novog otkaza
- `OPEN` — provajder je privremeno blokiran; combo usmeravanje ga preskače
- `HALF_OPEN` — istekao je tajm-aut resetovanja; probni zahtev je dozvoljen

**Podrazumevane vrednosti koje se mogu konfigurisati (`open-sse/config/constants.ts`, izložene u Kontrolna tabla → Podešavanja → Otpornost):**

| Klasa   | Degradira se pri | Otvara se pri | Tajm-aut resetovanja |
| ------- | ---------------- | ------------- | -------------------- |
| OAuth   | 5 otkaza         | 8 otkaza      | 60s                  |
| API-key | 7 otkaza         | 12 otkaza     | 30s                  |
| Local   | izvedeno         | 2 otkaza      | 15s                  |

`degradationThreshold` kontroliše kada provajder ulazi u `DEGRADED`; `failureThreshold` kontroliše kada se otvara i preskače. Profili lokalnih provajdera još nisu izloženi na stranici podešavanja otpornosti.

**Kodovi aktiviranja:** samo statusi na nivou provajdera `[408, 500, 502, 503, 504]`. NE aktivirati za greške na nivou naloga (većina 401/403/429 — one pripadaju cooldown-u ili zaključavanju).

**Lenj oporavak:** kada `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvežavaju stanje na `HALF_OPEN`. Ista čitanja (i sledeći otkaz) postepeno vraćaju zastarelo `DEGRADED` nazad na `CLOSED`. Pozadinski tajmer nije potreban.

---

### Opcioni globalni cooldown provajdera (kapija prozora)

Četvrti, **opcioni** sloj (`PROVIDER_COOLDOWN_ENABLED`, podrazumevano **isključen**) čuva memoriju o provajderima koji otkazuju između zahteva u
`open-sse/services/providerCooldownTracker.ts`, koju konsultuje razrešavanje combo ciljeva kako bi uzastopni combo zahtevi prestali da ponovo prolaze kroz provajdera koji je upravo
otkazao. Zapisi na nivou provajdera poštuju kapiju prozora `PROVIDER_PROFILES`:

| Profil  | aktivira se nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| ------- | ---------------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth   |                                           `10` |                            `15min` |                          `5min` |
| API key |                                           `15` |                            `30min` |                         `10min` |

Ispod praga provajder se **ne** smatra u hlađenju; uspeh čisti
prozor. Zapisi na nivou konekcije (`provider:connectionId`) umesto toga zadržavaju
eksponencijalni backoff `minRetryCooldownMs → maxRetryCooldownMs`. Nadjačavanja:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Zaštita od regresije: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Period hlađenja veze

**Opseg:** pojedinačna veza/nalog/ključ provajdera.

**Svrha:** preskočiti jedan neispravan ključ dok druge veze za istog provajdera nastavljaju da pružaju uslugu.

**Implementacija:**

- Označavanje kao nedostupnog: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbor: `getProviderCredentials*` u istoj datoteci
- Izračunavanje perioda hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Podešavanja: `src/lib/resilience/settings.ts`

**Polja po vezi:**

- `rateLimitedUntil` — vremenska oznaka do isteka perioda hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog povratnog čekanja

**Podrazumevani periodi hlađenja:**

- Osnovno za OAuth: 5 s
- Osnovno za API ključ: 3 s
- API ključ 429: daje prednost zaglavljima za `Retry-After`/reset od upstream-a/tekstu za reset koji može da se analizira
- Povratno čekanje: `baseCooldownMs * 2 ** failureIndex`

**Kašnjenje ponovnog pokušaja po provajderu.** Stranica sa detaljima provajdera sadrži izbor **Kašnjenje ponovnog pokušaja** (Automatski, od 15 s do 1 h). On čuva `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, preko `PATCH /api/resilience`). Kada greška ograničenja brzine ne sadrži upstream nagoveštaj za ponovni pokušaj, ta vrednost zamenjuje skalirano povratno čekanje za provajdera i postavlja `backoffLevel` na 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Prioritet za grešku ograničenja brzine, od najvišeg ka najnižem, jeste: upstream nagoveštaj za ponovni pokušaj, zatim `providerSpecificData.rotationOverrides.rateLimitResetSeconds` po vezi, zatim kašnjenje ponovnog pokušaja po provajderu, zatim `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` iz okruženja, a potom skalirano povratno čekanje. Automatski režim uklanja polje. Ovo utiče samo na razlog ograničenja brzine, nikada na terminalna stanja.

**Zaštita od istovremenog naleta:** sprečava da istovremeni neuspesi prekomerno produže period hlađenja ili dvaput uvećaju `backoffLevel`.

**429 greške zbog ograničenja konkurentnosti ne penju se lestvicom povratnog čekanja.** `429` čije telo prijavljuje ograničenje konkurentnosti („previše istovremenih zahteva“, „ograničenje konkurentnosti“, „ograničenje paralelnih zahteva“, GLM `并发数过高`) znači da je nalog ispravan, ali zauzet. `checkFallbackError()` vraća razlog `concurrency_limited`: odmah pređite na sledeću vezu, ohladite ovu na fiksni period `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) ili do upstream nagoveštaja za ponovni pokušaj, ostavite `backoffLevel` nepromenjenim i postavite `skipProviderBreaker`. Eksplicitno telo o kvoti i dalje ima prednost, tako da telo koje se takođe poklapa sa obrascem kvote ostaje procena kvote. Detekcija: `looksLikeConcurrencyLimit()` u `src/shared/utils/classify429.ts`; procena: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` prekidača) ostaje nepromenjen i za ova tela i dalje čita `rate_limit`.

**Zastoji sadržaja toka ne hlade nalog.** Kada čuvar zastoja sadržaja (`open-sse/utils/streamHandler.ts`) odustane od toka koji u predviđenom vremenu nije poslao izlaz modela, `markAccountUnavailable()` beleži grešku na vezi, ali ne postavlja period hlađenja: zastoj pripada tom zahtevu, najčešće dugom toku razmišljanja bez dosadašnjeg izlaza. Operateri mogu da ga uključe podešavanjem `resilienceSettings.streamStallCooldown.enabled` (podrazumevano `false`).

**Signal kašnjenja koji se opciono uključuje za izbor naloga pomoću `p2c`.** Svaki poslati pokušaj beleži vreme do prvog bajta i ishod po vezi (i po vezi + modelu) u kliznom prozoru u memoriji: poslednjih 20 uzoraka u okviru 15 minuta (`open-sse/services/connectionLatencyTracker.ts`, beleži se iz `safeLogEvents()` u `src/sse/handlers/chatHelpers.ts`). Kada je `resilienceSettings.p2cLatency.weight` veći od `0` (opseg 0–20, podrazumevano `0` = isključeno), `compareP2CConnections()` u `src/sse/services/auth.ts` dodaje do `weight` poena svakom kandidatu para. Polovina toga potiče od kašnjenja kao odnosa prema bržem kandidatu (dvostruko sporiji kandidat dobija punu polovinu), a druga polovina od stope grešaka u kliznom prozoru. Ovaj član se primenjuje samo kada oba kandidata imaju najmanje 3 uzorka, tako da novi nalozi nisu kažnjeni, a gornja granica ostaje ispod kazni za blokiranu i iscrpljenu kvotu. On ne uvodi sopstveni prekidač: nalozima koji otkazuju i dalje upravljaju slojevi perioda hlađenja, zaključavanja i prekidača. Podesite ga pomoću `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Okviri razmišljanja ponovo pokreću budžet zastoja sadržaja.** Model za razmišljanje može da razmišlja nekoliko minuta pre svog prvog vidljivog tokena: Claude emituje `thinking_delta` okvire čiji tekst razmišljanja može biti prazan, a Responses API emituje jednu stavku razmišljanja za drugom. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepoznaje ove okvire, a čuvar ponovo pokreće svoj budžet pri svakom od njih umesto da otkaže tok. Oni i dalje nisu izlaz modela, pa se tok koji se završi samo razmišljanjem i dalje prijavljuje kao prazan, a tok koji prestane da razmišlja i šalje samo otkucaje srca i dalje aktivira čuvara.

Kiro-ovi binarni `reasoningContentEvent` okviri sa nepraznim potpisom čuvaju ovu aktivnost razmišljanja kroz izvršavač kao praznu `reasoning_content` deltu. Potpis se ne prosleđuje. Metapodaci, nepotpuni okviri i prazni potpisi ne pokreću ponovo budžet sadržaja; nezavisno vremensko ograničenje aktivnog toka i otkazivanje od strane klijenta i dalje se primenjuju (`open-sse/executors/kiro/reasoning.ts`).

**Terminalna stanja (NISU periodi hlađenja):**

- `banned` — postavlja ga detekcija zabranjenih ključnih reči / zabrane naloga (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)). Odbijanja na nivou pojedinačnog zahteva od upstream-a (`request_rejected`, npr. Anthropic OAuth 403 „Request not allowed“) nikada ga ne postavljaju: ona se broje po vezi i modelu i uklanjaju taj model iz rotacije uz rastući period hlađenja ograničen na `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ili hlade vezu kada model nije poznat — `open-sse/services/requestRejectedStreak.ts`
- `expired` (prelazi u terminalno stanje nakon ograničenog broja ponovnih pokušaja — `EXPIRED_RETRY_MAX = 3` sa eksponencijalnim povratnim čekanjem — kako bi prolazne OAuth greške mogle same da se oporave pre trajnog deaktiviranja naloga)
- `credits_exhausted`

Ово остаје на снази све док се акредитиви не промене или их оператер не ресетује. Немојте преписивати терминална стања пролазним стањем хлађења.

**Лењи опоравак:** када `rateLimitedUntil` истекне, веза поново постаје подобна. Након успешне употребе, `clearAccountError()` брише сва поља грешке.

### Ограничење Claude OAuth употребе: трака нижег приоритета + ресетовање ограничења сесије

**Опсег:** једна Claude претплата (OAuth) веза. Обе функције су **опционе по вези** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` у `providerSpecificData`, обе су подразумевано искључене) и пресликавају команде Claude Code-а `/low-priority` и `/limit-reset` (уговор о комуникацији преузет из Claude Code 2.1.263).

**Имплементација:**

- Машина стања + класификација одговора: `open-sse/services/claudeLowPriority.ts`
- Клијент за статус/преузимање ресета: `open-sse/services/claudeLimitReset.ts`
- Кука извршиоца (убацивање заглавља + поновни покушај за исти налог): `open-sse/executors/base.ts::execute()`
- Чување опционог укључивања: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Окидач:** ограничење употребе од 5 сати — `429` чија заглавља садрже
`anthropic-ratelimit-unified-status: rejected` и, када је налог подобан,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ништа се не шаље пре првог `429` ограничења; краткотрајни `429` без обједињених заглавља пролази кроз уобичајену путању хлађења.

**Трака нижег приоритета** (`lowPriorityMode`):

- При `429` ограничења извршилац прихвата понуду и одмах поново покушава са **истим**
  налогом уз `anthropic-usage-limit: slow`; трака остаје активна до најављеног
  `anthropic-ratelimit-unified-reset` (+ 60 секунди толеранције), а сваки захтев у том интервалу носи заглавље. Пресретнути `429` никада не стиже до `handleChatCore`, па се веза **не** ставља у хлађење и не ротира се.
- `anthropic-ratelimit-unified-slow-status` у каснијим одговорима: `active` / `not_needed`
  одржавају траку; `slot_busy` (429) или `529` чекају серверски
  `anthropic-ratelimit-unified-slow-retry-after` (подразумевано 20 секунди, ограничено на 5–600 секунди, уз ±30% случајне промене)
  и поново покушавају, ограничено са `anthropic-ratelimit-unified-slow-max-wait` (подразумевано 20 минута, ограничено на
  1 минут–6 сати) — након тога се трака завршава и 10-минутни период хлађења блокира поновно прихватање. Чекање је додатно ограничено преосталим временом сопственог захтева за почетак узводне везе
  (`resolveFetchStartTimeout`, подразумевано 10 минута) умањеним за маргину од 5 секунди: без тог ограничења подразумевани максимални период чекања од 20 минута надживео би захтев, па би спавање било прекинуто усред чекања и приказала би се грешка `TimeoutError` уместо уредног завршетка са `max_wait` + хлађењем.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, прелазак 5-часовног прозора или
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (што га завршава као
  `extra_usage` при било ком статусу, јер плаћена прекомерна употреба сада покрива ограничење) завршавају траку; одговор затим пролази кроз уобичајену путању хлађења. `budget_exhausted` се памти до најављеног ресетовања буџета (највише 8 дана).
- Провера ограничења се извршава након сопствених поновних покушаја извршиоца унутар покушаја, покренутих статусом 400 (уређивање контекста, ограничења размишљања/нивоа напора, аутоматско учење параметара), па се `429` ограничења који се појави тек при једном од тих поновних покушаја и даље пресреће уместо да стигне до путање хлађења.
- Стање се чува у меморији по вези (поновно покретање подразумева један додатни `429` ограничења за поновно прихватање).

**Ресетовање ограничења сесије** (`autoLimitReset`, испробава се пре траке када су обе опције укључене):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → блок
  `juniper_tide`; када су `arm: "reset"` и `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` са
  `{ "program": "juniper_tide" }` (UUID организације из `providerSpecificData.organizationUUID`, резервна вредност из покретања).
- `result: reset|not_limited` → захтев се поново шаље пуном брзином (без спорог заглавља).
  `already_used` / `not_offered` меморишу `next_available_at` (подразумевано једна недеља); сваки неуспех активира повратно чекање од 15 минута. Ресетовање је једном недељно и и даље се урачунава у недељно ограничење.

Регресиони заштитни тестови: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Везивање сесије (#7274)

**Опсег:** једна клијентска сесија (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` заглавље) везана за једну везу, за **било ког** провајдера.

**Сврха:** одржати вишеструки разговор агента (Claude Code, aider, прилагођени агенти) на истом налогу током захтева, чиме се смањује губитак контекста између налога и понављање `429` одговора при хладном покретању код провајдера са стањем сесије по налогу.

**Имплементација:**

- Разрешавање TTL-а: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Избор/креирање везивања: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Издвајање заглавља (генерички, било који провајдер): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Табела сачуваних везивања: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Подешавање: `sessionAffinityTtlMs` (глобални TTL у ms, `0` онемогућава) — `src/lib/db/settings.ts`. Преименовано из подешавања `codexSessionAffinityTtlMs`, специфичног за Codex, миграцијом `124_generic_session_affinity_ttl.sql`, која преноси претходно конфигурисани Codex TTL као нову подразумевану вредност.

Пре #7274, `resolveSessionAffinityTtlMs()` је безусловно враћао `0` за сваког провајдера осим
`codex`, па подешавање TTL-а (и заглавља сесије) нигде другде нису имали ефекта, иако су механизам везивања и издвајање заглавља већ били независни од провајдера. Исправка је уклонила тај рани повратак; TTL се сада равномерно примењује на сваког провајдера када се глобално подеси на вредност већу од `0`.

Три заглавља за везивање сесије никада се не прослеђују узводном систему — извршиоци изнова граде сопствена узводна заглавља уместо да прослеђују клијентска заглавља, па ово остаје само интерни идентификатор корелације.

### Ексклузивни закупи веза за управљане сесије

**Обухват:** један активни управљани HTTP клијент/сесија поседује једну одговарајућу OmniRoute везу.

**Сврха:** обезбедити трајно ексклузивно власништво над везом за клијенте којима је потребна чврста
рутирајућа граница кроз више захтева. Ово се разликује од афинитета сесије, који представља благу
преференцију континуитета: ексклузивни закуп трајно чува стање животног циклуса у SQLite-у, намеће
глобалну јединственост активног власника и активне везе и одбија застарелу генерацију пре
прослеђивања добављачу.

Функција се омогућава по API кључу. Управљани кључ мора имати опсег `lease:exclusive` и експлицитну
непразну листу `allowedConnections`. Сваки HTTP клијент може да користи крајњу тачку животног
циклуса; нису потребни име клијента, user-agent, добављач, OAuth метод нити модел. Закуп поседује
везу, а не модел, па промена модела задржава повезивање док веза остаје уобичајено одговарајућа.
Уобичајена правила за модел, квоту, здравље, период хлађења и листу дозвољених веза остају
меродавна и могу да пребаце исту генерацију на другу слободну одговарајућу везу.

Животни циклус чини `POST /api/v1/session-leases` са JSON радњама `acquire`, `renew` и `release`.
Управљани захтеви за инференцију шаљу непрозирну вредност `X-OmniRoute-Lease-Owner` и тачну
вредност `X-OmniRoute-Lease-Generation`. Власник користи префикс `vlo_` након ког следи 43
base64url карактера; чува се само његов SHA-256 хеш. Свака коначна ограда за прослеђивање такође
повезује ID аутентификованог API кључа и ID активне везе. Заглавља за управљање закупом уклањају се
из дневника, сачуваних снимака захтева и заглавља извршиоца узводне услуге.

Ако уобичајено рутирање има одговарајуће управљане кандидате, али је сваки слободни кандидат
заузет страним активним закупом, OmniRoute враћа HTTP `429`, код за недоступност капацитета закупа,
стање чекања на капацитет и ограничени `Retry-After` изведен из најранијег релевантног истека.
Уобичајена празна листа одговарајућих кандидата није конкуренција за закуп и задржава постојећу
семантику грешака при рутирању.

Повезани механизми остају одвојени:

- OAuth заузетост сесије је локална дистрибуција унутар процеса за OAuth налоге.
- Семафори налога додељују дозволе за истовременост захтева и завршавају се када се захтев доврши.
- Ексклузивни управљани закупи сесија представљају трајно власништво над животним циклусом са оградом генерације.

## 3. Zaključavanje modela

**Opseg:** trojka provajder + konekcija + model.

**Opseg ključa prema statusu:** status koji je prouzrokovao neuspeh određuje pod kojim ključem se zaključavanje upisuje (`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili prava korišćenja — zaključava **porodicu kvota**: za codex ceo opseg `codex` / `spark` (svaki `gpt-5*` model te konekcije), za ostale provajdere `getQuotaScopedModelForProvider()`.
- `404` zaključava sam konkretan model (`getModelLockKey()` sužava `not_found`).
- Svaki drugi status — `5xx` transportne/serverske greške i OmniRoute-ov sopstveni sintetisani `502` iz validacije kvaliteta — zaključava samo **tačnu** torku provajder/konekcija/model. Loš stream na jednom modelu nije dokaz o kvoti naloga; pre ovog pravila jedan prazan odgovor na `codex/gpt-5.6-luna` uklanjao je svaki `gpt-5*` model te konekcije iz rutiranja na 2–30 min (eskalirajuće), dok je njegova kvota ostajala netaknuta.
- Eksplicitna opcija `scope` pozivaoca uvek ima prednost (Antigravity prosleđuje `"exact"`).

**Svrha:** izbeći onemogućavanje cele konekcije kada je samo jedan model nedostupan ili ograničen kvotom.

**Primeri:**

- Provajderi sa kvotom po modelu koji vraćaju 429
- Lokalni provajderi koji vraćaju 404 za jedan nedostajući model
- Greške dozvola za režim/model specifične za provajdera (npr. Grok režimi)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrolna tabla hlađenja modela (v3.8.0)

UI: Podešavanja → Hlađenja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivna zaključavanja sa: provajder, konekcija, model, razlog, expiresAt. Operatori mogu ručno ponovo omogućiti model sa kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — prikazuje aktivna zaključavanja
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Telo: `{provider, connection, model}`. Autentikacija: management.

### Upravitelj hlađenja

UI: Praćenje → Upravitelj hlađenja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku konekciju koja je van rutiranja iz prolaznog razloga, umesto otvaranja stranice svakog provajdera. Prikazuje hlađenja konekcija, zaključavanja modela i terminalna stanja, briše ih po konekciji, za izabrani skup ili za sve konekcije jednog provajdera, i uređuje najčešće podešavana pravila hlađenja: `streamStallCooldown.enabled` i osnovno hlađenje `connectionCooldown` za OAuth / API-ključ kao i maksimalne korake backoff-a (čuva se kroz `PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`) se prikazuju, ali se ovde nikada ne brišu.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentikacija: management):

- `GET /api/resilience/cooldowns[?provider=]` — konekcije sa statusom, preostalim hlađenjem, nivoom backoff-a, tipom poslednje greške i zaključavanjima modela (bez kredencijala)
- `POST /api/resilience/cooldowns` — telo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI podešavanja zaključavanja + oporavak slabljenjem pri uspehu (v3.8.23)

Zaključavanje modela je prešlo sa uvek uključenog, hardkodovanog ponašanja na potpuno podesivu, opt-in funkciju sa sopstvenom karticom podešavanja i putanjom samoisceljujućeg oporavka.

**Kartica podešavanja:** Podešavanja → Zaključavanje modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo je **različito** od gornje kartice `ModelCooldownsCard` koja je samo za čitanje (koja samo _prikazuje_ aktivna zaključavanja) — nova kartica _podešava parametre_. Podrazumevane vrednosti se nalaze u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Podešavanje             | Podrazumevano                    | Značenje                                                                |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — zaključavanje modela je **podrazumevano isključeno**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statusi koji se računaju kao neuspeh u opsegu modela.          |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje zaključavanja za prvi neuspeh.                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica eskaliranog hlađenja.                                    |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eskalacije eksponencijalnog backoff-a.           |
| `useExponentialBackoff` | `true`                           | Da li ponovljeni neuspesi eksponencijalno eskaliraju hlađenje.          |

Podešavanja se trajno čuvaju kroz uobičajeno skladište podešavanja i validiraju putem šeme podešavanja otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak slabljenjem pri uspehu:** oporavak **nije** čisto istek tajmera. Zdrav odgovor smanjuje brojač neuspeha modela, tako da model koji se oporavio usred prozora prestaje da eskalira (i biva otključan) pre nego što bi njegov tajmer istekao. Pri uspešnom combo cilju, `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), koja **prepolovljava** sačuvani
`failureCount` (`Math.floor(failureCount / 2)`); kada dostigne `0`, unos zaključavanja se u potpunosti briše. Pandan `recordModelLockoutFailure()` uvećava brojač (i eskalira hlađenje) pri neuspesima unutar prozora eskalacije. Ovo slabljenje pri uspehu je dodatak običnom isteku tajmera — bilo koja od dve putanje može ponovo omogućiti model.

**Stanje:** zaključavanja se drže **u memoriji** (`Map` strukture po procesu sa
`ModelLockoutEntry` ključevanim po `provider:connectionId:model`, a zaključavanja tačnog opsega po
`provider:connectionId:exact:model`), ne čuvaju se trajno u bazi — gube se pri restartu. _Podešavanja_ se trajno čuvaju; aktivno _stanje_ zaključavanja je efemerno.

---

## 4. Контрола конкурентности дељења квоте (v3.8.36)

Налози са претплатом (GLM, MiniMax итд.) често прихватају само ~1–3
истовремена захтева; прекорачење тог броја активира 429 одговоре и периоде
хлађења. Ово је нарочито изражено код комбинација са **дељењем квоте**
(`qtSd/…`), где више API кључева дели један upstream налог. Три слоја
спречавају преоптерећење дељеног налога.

### Ограничење конкурентности по вези (`max_concurrent`)

Свака веза са провајдером може да декларише горњу границу
`max_concurrent` (`provider_connections.max_concurrent`, подешава се у модалу
везе / API-ју / бази података). Оставите поље празно ако не желите ограничење.
Ово је једина поставка која управља слојем серијализације описаним у наставку —
подесите је на стварну конкурентност налога (нпр. GLM ~1, MiniMax ~2).

### Ограничења конкурентности по моделу (`modelConcurrency`)

Веза може додатно да декларише тачне горње границе конкурентности по моделу
унутар своје мапе `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Подесите је у модалу везе (**Rate limit overrides → Per-model
concurrency caps**, један `model=cap` по линији) или преко
`PATCH /api/providers/[id]` са истим JSON обликом. Кључна семантика:

- **Ограничење за целу везу у односу на ограничење специфично за модел:** `maxConcurrent` остаје заједничка
  горња граница за целу везу. Када се примењују оба ограничења, оба пролаза се
  атомски заузимају у истом сложеном пролазу
  (`global → provider → account → model`); ефективно понашање одређује строже
  применљиво ограничење.
- **Тачно поклапање кључа модела:** кључ је ниска модела прослеђена извршиоцу
  након разрешавања рутирања — обично изворни upstream идентификатор модела
  (`glm-5`), а не client-side алијас `provider/model` (`zai/glm-5` се не
  поклапа са `glm-5`). Вредности су позитивне целобројне горње границе броја
  истовремених захтева.
- **Локално стављање у ред, без откривања:** вишак захтева се локално ставља у
  ред са постојећом семантиком реда/временског ограничења (типизоване грешке при
  пријему `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute не открива нити
  изводи upstream политику — спроводи тачно она ограничења која је оператор
  подесио. Засићени пролаз за модел никада не онемогућава провајдера и никада не
  ствара трајно закључавање модела; понашање upstream 429 одговора/хлађења/
  резервног избора и даље остаје заштита у случају грешке.
- **Обим по вези и процесу:** ограничења важе по вези у бази података и чувају се
  у меморији, па две везе које поново користе исти upstream API кључ не
  координишу једна са другом.
- **Неподешено значи непромењено:** изостављање мапе (или остављање поља на
  контролној табли празним) не додаје пролаз за модел. Пример конфигурације без
  постављања универзалног ограничења за провајдера:

```text
glm-5=1
glm-4.7=3
```

### Серијализација захтева са дељењем квоте

Када слање са дељењем квоте циља везу која има позитивно
`max_concurrent`, истовремени захтеви ка том **налогу** се серијализују кроз
семaфор по вези (кључ `qsconn:<connectionId>`): вишак захтева **чека у реду**
уместо да преоптерети налог. Ово је **fail-open** — засићени ред или истек
времена настављају рад без слота, уместо да икада одбију захтев који може да
буде послат. Укључује се у **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, подразумевано
укључено). Без ограничења `max_concurrent` понашање остаје непромењено.

> Пролаз за рутирање са дељењем квоте (`selectQuotaShareTarget`, DRR + P2C) сам по
> себи је **fail-open** и само _смањује приоритет_ везе која је достигла
> ограничење — код скупа са једном везом не може да постави чврсто ограничење,
> па је овај семафор оно што заправо обуздава навалу.

### Поновни покушај комбоа узимајући у обзир хлађење

За сваку стратегију комбоа (када је укључена), захтев који би довео до 429
одговора због КРАТКОГ пролазног хлађења чека да хлађење истекне и поново се
шаље, уместо да врати 429 — ово обухвата TPM/RPM прозоре класе Gemini
(~60 s retry-after) код комбоа са више модела, нпр. када оба циља комбоа са
2 модела досегну ограничење брзине по моделу. Ограничено је поставком
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) у одељку **Settings → Resilience**. Никада не чека на
`quota_exhausted` (закључано до поноћи) нити на разлоге повезане са
аутентификацијом/непостојањем.

Комбо може да одустане од ове функције помоћу `config.comboCooldownWaitEnabled: false`.
Само дословна вредност `false` онемогућава ова заједничка чекања комбоа
(хлађење након слања и чекања пре слања због отвореног кола/закључаног модела)
и њихово продужавање доњег прага временског ограничења на основу буџета
чекања. Недостајућа вредност или `true` задржава глобалну политику; `true`
не може глобално онемогућено чекање да укључи. Експлицитно
`targetTimeoutMs` и даље има предност. Ово одустајање не мења одвојено
изворно pre-dispatch чекање за native-Codex turn-pin.

Исти пролаз покрива и случај пре слања (#16319): када се сваки циљ комбоа
прескочи пре било каквог покушаја јер се његов модел налази у кратком
пролазном закључавању, путања са нула покушаја чека да се закључавање заврши
под истим ограничењима и поново шаље захтев, уместо да врати
`503 ALL_TARGETS_SKIPPED` без наговештаја. Када чекање није дозвољено (достигнуто
ограничење, број покушаја или буџет су исцрпљени, или је функција искључена),
коначни одговор се унапређује у `429 rate_limit_error` и садржи
`retry_after` / `reset_at` из најранијег истека пролазног закључавања; закључавања
због квоте, аутентификације и непостојања задржавају 503 без наговештаја.

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

## 5. Kontrola prijema u red čekanja zahteva (v3.8.49 · issue #6593)

**Opseg**: lokalni red čekanja za ograničenje protoka po dobavljaču+konekciji (`open-sse/services/rateLimitManager.ts`, podržan od strane Bottleneck-a), jedan sloj ispod tri mehanizma opisana iznad.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.**
Ova dva su namerno odvojena i nijedno ne utiče na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **budžet čekanja u redu**: pokriva čekanje na slobodno mesto kod dobavljača, a zatim i boravak u statusu QUEUED, a njegov tajmer se poništava čim posao napusti QUEUED i počne da se izvršava (`rateLimitManager.ts`, `wrappedFn`). Zahtev koji ga prekorači nikada ne stiže do uzvodnog servisa. Podrazumevano 30000ms, definiše ga `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` u `src/lib/resilience/settings.ts` i fiksiran je testom `tests/unit/ratelimit-admission-control-6593.test.ts`, tako da promena te vrednosti čini da taj test padne, umesto da ovaj pasus tiho zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je ono što Bottleneck prima kao `expiration` posla, čiji tajmer počinje tek nakon slanja na izvršavanje. To je krajnja zaštita za izvršioce koji nemaju sopstveni tajmaut za uzvodni servis, a podiže se na sopstveni tajmaut početka fetch-a izvršioca kada je taj duži, tako da ne može da prekine zdrav odgovor koji je već u toku. Podrazumevano 600000ms (10 min).

Prosleđivanje budžeta reda u `expiration` je ono što je ranije prekidalo neinkrementalne gejtveje usred izvršavanja — oni legitimno rade minutima pre prvih bajtova — i zato se istek `expiration` prikazuje kao `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok budžet reda nosi kod tajmauta reda. Obe vrednosti se mogu promeniti preko `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ili kontrolne table (**Settings → Resilience**). Obe se pri normalizaciji ograničavaju na 1ms–24h.

**Prioritet, za obe:** env promenljiva daje samo _podrazumevanu_ vrednost. Vrednost sačuvana u `resilienceSettings.requestQueue` (kontrolna tabla / API patch, skladištena u `key_value`) ima prednost nad njom, a `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` po konekciji ima prednost nad tom. Postavljanje env promenljive na instalaciji koja već ima sačuvanu vrednost zato ne menja ništa — umesto toga obrišite ili ažurirajte sačuvano podešavanje.

Boravak u redu ograničava `maxWaitMs`; `maxQueueDepth` ispod ograničava koliko pozivalaca može istovremeno biti u redu.

**Ponovni pokušaji navedeni u telu odgovora: tempiranje naspram blokade.** Telo odgovora 429 može samo da navede svoje čekanje (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), koje čita `updateFromResponseBody`. Čekanje koje staje u `maxWaitMs` konekcije je tempiranje: limiter prazni svoj rezervoar na to vreme, a pozivi u redu se šalju na izvršavanje kada se on ponovo napuni. Čekanje duže od `maxWaitMs` nije nešto što red može da isčeka — Gemini na iscrpljenu dnevnu kvotu odgovara sa `retryDelay: "86399s"`. Prosleđeni `Retry-After` na ponovo izgrađenom odgovoru 429 (#16528) već tera fallback mehanizam da zaključa model na taj period, ali pauziranje limitera zbog njega bi i dalje blokiralo svaki poziv koji stigne do ključa prerano (na primer, nakon resetovanja otpornosti) na ceo `maxWaitMs`. Kada takvo čekanje dolazi iz tipiziranog Google `RetryInfo` detalja (poreklo `google_rpc_retry_info`) i limiter ključa je već ograničen na model (vidi `getLimiterKey`), 429 umesto toga postaje blokada modela na toj konekciji (`lockModelForLongBodyRetry` u `open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograničeno na 24h), a limiter ostaje nepauziran. Izbor naloga preskače tu blokadu preko `isModelLocked()`, kao i kombinovana kapija pre slanja na izvršavanje za ciljeve vezane za konekciju. Na antigravity-ju, čiji je limiter po familiji kvota, blokada je na tačnom modelu, kao i njegove ostale blokade kvota. Ime koje je klijent zatražio takođe se zaključava kada ga je alias razrešio na taj model, jer te provere koriste zatraženo ime; zaključava se tačno (`lockExactModel`), tako da alias koji prelazi antigravity familiju kvota ili codex opseg nikada ne zaključava svoj sopstveni. Prozna naznaka, netipiziran `retryDelay` ili limiter koji deli cela konekcija zadržavaju pauzu. Kada se limiter koji je putanja 429 upravo ponovo izgradila ipak pauzira, pozivalac čije preostalo vreme u redu ističe pre pauze odmah se odbija kodom tajmauta reda (`checkLimiterPause`), umesto da to vreme isčekuje; zabeleženi kraj je usidren pre nego što se limiter izgradi, tamo gde Bottleneck pokreće svoj tajmer osvežavanja, a svaka kasnija promena rezervoara ga zaboravlja. Pokriveno testovima `tests/unit/rate-limit-long-body-retry-lockout.test.ts` i `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opciono ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
ograničava koliko zahteva može istovremeno čekati u redu (još neposlatih na izvršavanje) za jednog dobavljača+konekciju. Kada red već sadrži `maxQueueDepth` zahteva, novi zahtev se brzo odbija tipiziranom greškom
`code: "RATE_LIMIT_QUEUE_FULL"` **pre** nego što uopšte stigne do `limiter.schedule()`
— tako da je odbijanje jeftino i dešava se pre svakog nizvodnog rada na kompresiji prompta / prevodu za taj zahtev. Podrazumevano `0` = onemogućeno, čime se zadržava postojeće ponašanje neograničenog reda; ograničeno na 0–100000.
Menja se preko `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ili
`resilienceSettings.requestQueue.maxQueueDepth` (kontrolna tabla/API patch).

Sama provera prijema je čista funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), tako da se može jedinično testirati bez pravog Bottleneck limitera.

> RFC koji je otvorio #6593 takođe je predložio zastavicu `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` u ovom repozitorijumu predstavlja
> kompresiju prompt-a/konteksta na odlaznom LLM zahtevu (`chatCore.ts`,
> oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> a ne HTTP kompresiju odgovora na sintetisanim 429 telima — ne postoji
> odgovarajuća putanja koda za bukvalnu zastavicu zaobilaženja. Taj korak
> kompresije prompt-a takođe se trenutno izvršava _pre_ `withRateLimit()` u
> pipeline-u zahteva, pa je preraspoređivanje radi njegovog preskakanja pri
> odbijanju zbog popunjenog reda zasebna, veća izmena od obima ovog issue-a;
> ona je namerno **nije** implementirana ovde i ostavljena je kao naknadni
> korak u slučaju da ušteda CPU-a opravdava rizik preraspoređivanja.

### Sigurnosna mreža za automatsko omogućavanje ograničenja brzine i zaštita konekcija (`rateLimitProtection`)

**Sigurnosna mreža automatskog omogućavanja** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, podrazumevano `true`):
OmniRoute podrazumevano automatski omogućava zaštitu redom čekanja od ograničenja brzine za sve aktivne konekcije provajdera sa API ključem (`getProviderCategory(provider) === "apikey"`). Ovo obezbeđuje da dolazni zahtevi ka uzvodnim API ključevima osetljivim na brzinu budu stavljeni u red čekanja i prigušeni kroz Bottleneck, umesto da u naletu izazovu uzvodne 429 greške. Sigurnosna mreža se može prepisati putem promenljive okruženja `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` onemogućava, `true`/`1`/`on` prisilno uključuje), koja ima prednost nad sačuvanom postavkom na kontrolnoj tabli (**Podešavanja → Otpornost** / `PATCH /api/resilience`).

**Semantika `rateLimitProtection` po konekciji:**
Zaštita od ograničenja brzine po konekciji prati se putem bulovskog polja `rateLimitProtection` na konekcijama provajdera (trajno se čuva kao `rate_limit_protection` u SQLite-u):

- **Eksplicitno uključeno (`rateLimitProtection === true`)**: Zaštita od ograničenja brzine je eksplicitno omogućena za ovu konekciju, bez obzira na kategoriju provajdera ili na to da li je sigurnosna mreža automatskog omogućavanja uključena.
- **Eksplicitno isključeno (`rateLimitProtection === false`)**: Onemogućava eksplicitnu zaštitu, ali **ne** izuzima aktivnu konekciju sa API ključem iz globalne sigurnosne mreže automatskog omogućavanja. U `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` i `undefined` su ekvivalentni: samo se `rateLimitProtection === true` tretira kao eksplicitno prepisivanje. Ako je `rateLimitProtection` `false` (ili nije postavljeno), aktivna konekcija sa API ključem i dalje ispunjava uslov automatskog omogućavanja i ostaje zaštićena od ograničenja brzine.
- **Bez izuzimanja po konekciji**: Operator trenutno ne može da izrazi „ova jedna aktivna konekcija sa API ključem mora da radi bez zaštite redom čekanja od ograničenja brzine" dok automatsko omogućavanje ostaje aktivno za ostale. Da bi konekcije sa API ključem radile potpuno bez redova čekanja za ograničenje brzine, sigurnosna mreža mora biti isključena globalno (`RATE_LIMIT_AUTO_ENABLE=false` ili `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podržane putanje upisa:**

- **`POST /api/rate-limits`**: Podržana administrativna putanja upisa za prebacivanje `rateLimitProtection` za konekciju (`{ connectionId: string, enabled: boolean }`). Poziv sa `enabled: true` uključuje eksplicitnu zaštitu; poziv sa `enabled: false` uklanja eksplicitnu zaštitu (iako aktivne konekcije sa API ključem ostaju pokrivene globalnom sigurnosnom mrežom ako je automatsko omogućavanje uključeno).
- **`PUT /api/providers/[id]`**: Namerno **ne** prihvata niti menja `rateLimitProtection` (#11278). Ažuriranje metapodataka konekcije provajdera putem `PUT /api/providers/[id]` nikada neće promeniti sačuvano stanje zaštite od ograničenja brzine.

---

## 6. Надзор протока спорог тока (#9709)

Опциони `resilienceSettings.streamRecovery.throughputWatchdog` чувар детектује узводно које још увек шаље делове, али производи помоћни излаз испод конфигурисане стопе корисног излаза. Намерно се разликује од временског ограничења мировања: откуцаји срца и метаподаци не ресетују ни тајмер и не рачунају се као напредак. Такође се разликује од рока за тежак покушај (#9153), који остаје апсолутни сигурносни плафон без обзира на квалитет излаза.

Пасу чувару је потребан период загревања након чега следи потпуни покретни прозор пре него што може да прекине. Он броји делте текста из довршетка ћаскања и одговора API излазних догађаја (конзервативни UTF-8 бајт проки), игнорише само коришћење и празне догађаје и суспендује расуђивање док су догађаји позивања алата или расуђивања у току. Подразумевано је онемогућен и може се омогућити помоћу `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (та вредност енв поставља само подразумевани зкд — а сачувани `resilienceSettings.streamRecovery.throughputWatchdog.enabled` боолеан побеђује; погледајте белешку о приоритету енв-вс-дасхбоард на врху овог водича); прозор, загревање, минимална брзина и минимални мерљиви излаз су ограничени нормалним слојем нормализације подешавања отпорности.

Када је омогућено, прекид надзора се примењује само на активни покушај упстреам. Пре било којих бајтова видљивих клијенту, постојећа путања раног опоравка истог налога може поново да отвори покушај. Након урезивања, стрим се никада не репродукује слепо; само постојећи безбедни уговор за наставак средњег тока може да споји суфикс. Финализација остаје једнократна, тако да се обрачун употребе и издавање семафора не дуплирају.

---

## 7. Preformulisanje statusa upstream-a (pogrešno prijavljene greške kvote)

**Opseg:** jedan upstream gateway koji prijavljuje privremeno iscrpljenje kvote pogrešnim HTTP statusom.

**Svrha:** ispraviti zavodljiv status PRE klasifikacije, tako da downstream potrošači (fallback engine, combo agregacija, odgovor okrenut klijentu) vide pravu prirodu greške koja dopušta ponovni pokušaj.

Neki gateway-i signaliziraju PRIVREMENO iscrpljenje kvote HTTP statusom
koji ne dopušta ponovni pokušaj. `agentrouter.org` vraća `403` (ponekad `400`)
sa telom na kineskom (`用户额度不足` / `额度不足`) umesto standardnog `429`.
Klijenti poput Claude Code tretiraju `403` kao trajnu grešku i prekidaju
sesiju, a bez korekcije bi je fallback engine klasifikovao kao `AUTH_ERROR`
umesto kao događaj kvote.

**Implementacija:**

- Registar + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  pravila po provajderu (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), upoređivanih putem `applyStatusRestatement()`.
- Mesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko linije 3654), odmah nakon što `parseUpstreamError()` parsira upstream
  odgovor sa HTTP statusom greške (`!providerResponse.ok`), a pre nego što se
  pokrene bilo kakva klasifikacija, tako da svaki downstream potrošač vidi
  ispravljeni status. Greške ugrađene unutar `200` SSE toka prate poseban,
  kasniji put parsiranja toka i danas **nisu** obuhvaćene ovim hook-om —
  poznato ograničenje, koje za agentrouterov pogrešan status još nije
  potrebno (on se pojavljuje kao HTTP status greške).
- Podobnost za ponovni pokušaj: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), tako da preformulisana
  greška nosi stvarni prozor za ponovni pokušaj umesto da se pojavi kao
  mrtav `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  je samo ono što preformulisani odgovor saopštava **klijentu**; on sam
  nije interno trajanje cooldown-a/lockout-a veze — time posebno upravlja
  onaj mehanizam koji stvarno obrađuje preformulisanu grešku (escalating
  backoff mehanizma Connection Cooldown, §2, osnovnih `3s` za provajdere sa
  API ključem; ili Model Lockout, §3, za provajdere sa kvotom po modelu
  poput agentrouter-a). Ruter interno može postati podoban za ponovni
  pokušaj ranije od prozora od 60s koji oglašava klijentu — namerna
  rezerva, ne greška.

Trajne greške (agentrouterov `无权访问模型` — nema pristupa ovom modelu) se
NIKAD ne preformulišu: `excludeMarkers` stavlja veto na pravilo čak i kada
`textMarkers` pogode, tako da greška zadržava svoj originalni status i ništa
je ne ponavlja zauvek. Odgovarajuće pravilo klasifikacije provajdera
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarisani osnovni cooldown od
`6h`) konsultuje `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pre_ generičkog ranog izlaska (early-return) `FORBIDDEN` kategorije apikey,
uslovljeno sa `honorsRuleLockScope(provider)` (#10334 — trenutno ekskluzivno
za agentrouter preko allowlist-e `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarisani cooldown pravila od 6h teče dalje kao
`fallbackResult.baseCooldownMs`, ali i dalje hrani postojeći put lockout-a
kvote po modelu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nepromenjen sa #10334 osim izvora
cooldown-a): on se obara na operatorov `mlSettings.maxCooldownMs`
(podrazumevano `1_800_000ms` / 30min), kao i svaki drugi lockout modela, a
_perzistirani razlog lockout-a_ ostaje postojeći hardkodirani `"forbidden"`,
ne `"auth_error"` iz pravila — samo se trajanje cooldown-a poštuje s kraja
na kraj, ne i string razloga. Sama veza ostaje aktivna; ostali modeli na
istoj vezi nisu pogođeni.

Preformulisane greške kvote (`额度不足`) u produkciji dopiru do pravila
provajdera (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, bez sopstvenog deklarisanog cooldown-a — primenjuje
se podrazumevani skalirani backoff sloja perzistencije). Od #10334, `scope`
na `ProviderErrorRuleMatch` SE konzumira s kraja na kraj, ali **samo** za
provajdere na allowlist-i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — danas samo `"agentrouter"`, uslovljeno preko
`honorsRuleLockScope()`). Za svaki drugi provajder `scope` ostaje
informativan, tačno kao pre #10334. `checkFallbackError` iznosi opseg
uparenog pravila kao `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) je
zajednički guard koji potvrđuje da je `ruleScope` zaista bezbedno poštovati
kao signal za celu vezu koji se sam oporavlja (scope `"connection"`, reason
`quota_exhausted`, nikad `permanent`, nikad `creditsExhausted` — odbrana od
budućeg pravila koje bi uparilo scope `"connection"` sa trajnim stanjem
naloga). Dva potrošača ga pozivaju:

- **Перзистенција** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  уместо да упадне у грану **per-model** блокаде за passthrough провајдера
  (agentrouter је `passthroughModels: true` → `hasPerModelQuota()`
  враћа `true`), примењује **привремено хлађење конекције** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, никада терминални статус
  (`credits_exhausted`/`banned`/`expired`) — тако да се конекција сама
  опорави када хлађење истекне уместо да захтева ручни ресет креденцијала.
  Прескаче се за конекције са `disableCooling: true` (#2997): то одустајање
  уместо тога прелази на per-model блокаду (документован компромис —
  погледајте коментар кода изнад гране).
- **Рутирање комбинације у оквиру истог захтева** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): исти чувар означава
  конекцију у `exhaustedConnections` сету у меморији, са кључем
  `${provider}:${connectionId}`. Ово прескаче само преостали циљ ИСТОГ ЗАХТЕВА
  који _сам већ носи тачно тај `connectionId`_ на свом сопственом циљном
  објекту (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` пре претраге `exhaustedConnections`) — обична комбинација
  листе модела, где суседни циљеви не носе сопствени закачени `connectionId`
  и један се разрешава тек по отпреми из заглавља одговора
  `X-OmniRoute-Selected-Connection-Id`, никада не погађа то подударање
  кључа. За тај уобичајени случај, права заштита од тога да преостали крак
  поново искористи управо исцрпљени налог НИЈЕ овај Set — то је слој
  перзистенције изнад (`rateLimitedUntil` конекције је сада у будућности)
  комбинован са истим овим чуваром који потискује
  `transientRateLimitedProviders` за неуспех (погледајте „Двостепени дизајн"
  и коментар кода на грани `isAgentrouterConnectionQuotaScope` у
  `targetExhaustion.ts`): са тим Set-ом остављеним неозначеним, force-allow
  `allowRateLimitedConnection` из `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) се НЕ активира за
  преостале кракове провајдера, тако да се `rateLimitedUntil` филтер избора
  креденцијала (`src/sse/services/auth.ts:1238`) нормално поштује и
  преостали крак или бира другу, још увек подобну agentrouter конекцију или
  не успева без доступних креденцијала — не пробија се силом назад на
  конекцију коју је ова грана управо охладила.

### Двостепени дизајн: преформулисање статуса, затим класификација

Преформулисање статуса (`upstreamStatusRestatement.ts`) и правила
класификације провајдера (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) су засебни регистри који се оба кључују на ID
провајдера и текстуалне маркере, али се извршавају на различитим местима и
служе различитим сврхама: преформулисање преписује HTTP статус рано у
`chatCore.ts`; правила класификације бирају резервни `reason` и закључавају
`scope` (`model` / `provider` / `connection`) унутар `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Правила класификације виде пун **текст** грешке (потребан за подударање
маркера тела као што је `额度不足`) само за провајдере наведене у
`FULL_TEXT_RULE_PROVIDERS` листи дозвољених у `providerErrorRules.ts` —
тренутно само `"agentrouter"`. За сваки други провајдер **уграђеног
каталога**, `checkFallbackError` прослеђује `getProviderErrorRuleMatch` само
структурирану грешку (`{code, type}`), што је довољно за правила заснована
на заглављу/статусу/коду, али слепо за маркере текста тела. Помоћник
`resolveRuleMatchBody()` врши овај избор: пун текст грешке за провајдере на
листи дозвољених, иначе структурирану грешку. Додавање **уграђеног**
провајдера у `FULL_TEXT_RULE_PROVIDERS` је експлицитно пријављивање по
провајдеру — постоји како би подразумевана путања за сваки провајдер који
није на листи остала бајт-по-бајт непромењена.

`scope` правила (`model` / `provider` / `connection`) је засебно
пријављивање од `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` га само
износи као `fallbackResult.ruleScope`, а низводни потрошачи га поштују као
било шта друго осим информативне ознаке само за провајдере на
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` листи дозвољених у истом фајлу
(контролисано преко `honorsRuleLockScope()` — данас само `"agentrouter"`).
Погледајте „Преформулисане грешке квоте" изнад за оно што подударање
`scope: "connection"` заправо ради када се провајдер нађе на тој листи
дозвољених.

**#11104 — правила декларисана од стране оператора заобилазе обе листе
дозвољених.** Оператор може декларисати правило по провајдеру у време
извршавања преко `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) без
уређивања овог фајла. Контролисање правила оператора иза
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — листи
дозвољених намењених заштити **подразумеваног** понашања уграђених правила
каталога — учинило би механизам подешавања инертним за сваки провајдер осим
оних који су тамо већ наведени, пошто је декларисање правила већ само по
себи експлицитно пријављивање оператора. `resolveRuleMatchBody()` и
`honorsRuleLockScope()` оба прво проверавају `hasOperatorRuleForProvider()`:
провајдер са правилом оператора добија сирови текст грешке и његов
декларисани `scope` се поштује, без обзира да ли се такође појављује на
било којој од листа дозвољених.

**Познати пропуст — `providerRuleRegistry` се никада не консултује за HTTP 400.** Грана `BAD_REQUEST` функције `checkFallbackError` класификује статус
400 у потпуности кроз своје сопствене низове образаца
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, итд. у
`accountFallback.ts`) и враћа се пре него што се достигне грана
`configuredRule`/`getProviderErrorRuleMatch` изнад ње. Уграђено правило
каталога (или правило оператора) са `status: 400` је синтаксно валидно,
али се никада неће активирати. Ниједно постојеће правило данас не циља
400, тако да ништа у продукцији није погођено — али будуће правило за 400
захтева да се ова грана прво измени, што је већа промена од додавања
правила (рекласификује 400 за сваки провајдер који се већ ослања на
понашање низова образаца) и изван је опсега додавања правила за један
провајдер.

### Додавање новог гејтвеја који нетачно пријављује квоту

1. Региструјте један низ правила у `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Нека `textMarkers`
   буду специфични за провајдера; никада немојте поново користити генеричке
   енглеске фразе које се поклапају са
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Опционо региструјте правила класификације у
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) да бисте
   изабрали прави опсег закључавања (`connection` за квоту на нивоу налога,
   `model` за грешке по моделу). Овај корак ступа на снагу у продукцији само
   за провајдере чијим правилима је потребан пуни текст грешке (маркери тела
   одговора): додајте ID провајдера у `FULL_TEXT_RULE_PROVIDERS` у истом
   фајлу — у супротном `checkFallbackError` правилу увек прослеђује само
   структурирану грешку `{code, type}` и правило засновано на тексту тела
   никада неће одговарати живом саобраћају.
   Правилима која се поклапају искључиво на основу `status`/`headers`
   (као што су Opencode-ова или Minimax-ова) ово укључивање није потребно.
   Независно од тога, ако правило декларише
   `scope: "connection"` и намера је стварна пауза на нивоу конекције
   уз прескакање комбоа у оквиру истог захтева (а не само информативна
   ознака), додајте ID провајдера у `HONORS_RULE_LOCK_SCOPE_PROVIDERS` у
   истом фајлу — то је оно што контролише потрошњу у стилу
   `isAgentrouterConnectionQuotaScope()` у
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) и
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); без тога, `scope`
   и даље пролази кроз `fallbackResult.ruleScope`, али ништа на њега не
   делује.
3. Додајте јединичне тестове који прате `tests/unit/upstream-status-restatement.test.ts`
   и `tests/unit/agentrouter-error-rules.test.ts` (укључујући
   not-permanent / not-creditsExhausted провере, и — ако провајдеру треба
   листа дозвољених — тест који потврђује да `resolveRuleMatchBody()` враћа
   пуни текст само за тог провајдера).

Нису потребне измене у `chatCore.ts`, `classifyError` или комбоу.

#### Закључавање груписано по излазној (egress) IP адреси (#10880)

Провајдери у `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode породица) третирају
се као upstream груписан по IP адреси (opencode бесплатни ниво је груписан
по IP адреси, а не по налогу — види #9611): статус-429 класификован као
`quota_exhausted` **или** `rate_limit_exceeded` ставља у паузу сваку
конекцију из породице са листе дозвољених чија се последња позната излазна
IP адреса поклапа са адресом конекције која је отказала, пре него што их
ротација уопште може испробати
— чиме се избегава N-1 загарантовано неуспешних upstream позива (истог облика као #10460/#10525).
`rate_limit_exceeded` је укључен намерно: на путањи `markAccountUnavailable`
правила специфична за opencode се никада не поклапају (`checkFallbackError`-у
се не прослеђују headers/body, а opencode није у `FULL_TEXT_RULE_PROVIDERS`),
па се 429 чије тело садржи текст о квоти претплате („monthly usage limit
reached") класификује као `quota_exhausted` помоћу резервне логике за текст
квоте (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; пауза од 1h)
пре него што се до правила `status_429` уопште и дође — док се 429 без текста
о квоти (обично ограничавање брзине) класификује преко правила `status_429`
као `rate_limit_exceeded` и и даље ставља IP породицу у паузу. За провајдера
са листе дозвољених, ограничење брзине груписано по IP адреси исти је сигнал
као исцрпљена квота. Искрена ограничења:

- **Najbolji mogući pokušaj**: brava razrešava poslednju poznatu `egress_ip` konekcije iz `proxy_logs` (prozor od 24 časa, sinhrono, bez keša). Hladan keš (egress IP adresa nikada nije ispitana) ili nema reda → konekcija koja je otkazala se i dalje hladi od strane grane (zapisuje se kao do sada), samo se nijedan srodnik ne zaključava.
- **Nikada terminalno**: hlađenje je obnavljajući prozor kvote (`testStatus: "unavailable"`); trajno stanje se nikada ne izvodi iz signala na nivou IP adrese. Konekcije sa `disableCooling` u potpunosti preskaču granu.
- **Granularnost brave se menja za porodicu na dozvoljenoj listi**: ovo je promena opsega, ne samo optimizacija srodnika. opencode je `passthroughModels` provajder, pa je pre ove grane 429 proizvodio blokadu po MODELU; sada proizvodi hlađenje konekcije — uključujući i za operatora koji vodi jednu konekciju bez ijednog srodnika. To je granularnost koju tabela pravila opencode već proglašava ispravnom (`scope: "connection"`, `providerErrorRules.ts`), do sada nikada poštovanu jer opencode nije u `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama upisuje hlađenje konekcije koja je otkazala + `backoffLevel`, po ugledu na granu agentrouter sa opsegom na nivou konekcije, i vraća se — blok po modelu i generički put ispod se nikada ne dosežu.
- **Combo uključen**: kao i grana agentrouter, opseg namerno zanemaruje `persistUnavailableState`/`isCombo` obaranje koje combo pozivalac primenjuje na 429. Blokada po modelu nije slabiji oblik ovog opsega, to je pogrešna jedinica: ne govori ništa o iscrpljenoj IP adresi, pa bi combo rotacija i dalje trošila po jedan zagarantovano neuspešan poziv po srodniku.
- **Bezbednost srodnika**: srodnik koji je već terminalan (banned/credits_exhausted) ili već u dužem hlađenju se nikada ne prepisuje.
- **Ekskluzivna dozvoljena lista**: proširenje `EGRESS_BUCKETED_LOCK_PROVIDERS` je eksplicitna odluka vlasnika; nema generičkog povezivanja (obrazac #10334/#10419). Upit srodnika vezuje tu istu dozvoljenu listu umesto da je ponavlja kao SQL literal, pa njeno proširenje ostaje promena u jednom redu.
- **Rotacija egress IP adrese, u oba smera**: prozor pretrage (24 časa) je daleko širi od TTL-a keša egress IP adrese (5 min), pa je "poslednja poznata IP adresa" istorija, a ne trenutno stanje. Ako se proksi konekcije rotirao unutar prozora, brava može **promašiti** zaista deljenu IP adresu (zapisana IP adresa je nova, neiscrpljena) — i simetrično, može **ohladiti srodnika koji se u međuvremenu odrotirao** sa iscrpljene IP adrese. Drugi slučaj tog srodnika košta jedan prozor hlađenja; oba su prihvaćena ograničenja pretrage zasnovane na istoriji u režimu najboljeg mogućeg pokušaja.
- **Trošak**: dva ograničena skeniranja `proxy_logs` (filtrirana prozorom putem `idx_pl_timestamp`), samo pri učestalosti 429. Nema novog indeksa (migracija 134 YAGNI). Izmereno na kopiji baze podataka umerene veličine sa stvarnim saobraćajem; instanca visokog protoka čuva proporcionalno više redova u istom prozoru.

---

## Ostale funkcije otpornosti

- **20 strategija rutiranja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Rutiranje svesno reseta** (v3.8.0) — daje prioritet konekcijama prema vremenu reseta kvote.
- **Degradacija pozadinskog režima** — Responses API `background: true` se degradira na sinhroni režim uz upozorenje.
- **Dinamičko otkrivanje ograničenja alata** — povlači provajdere kada se dostigne ograničenje broja alata.
- **Hitni rezervni mehanizam** — kontroliše ga `OMNIROUTE_EMERGENCY_FALLBACK`; operatori ga mogu pregaziti sa stranice Feature Flags bez restartovanja.

---

## Otklanjanje grešaka

- Weighted combo odgovara sa `503 all_targets_cooling_down` (`Retry-After` postavljen, `diagnostics.excluded` navodi svaki cilj sa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je konfigurisan i povezan, svaki cilj je samo isključen tajmerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. `404 no_executable_targets` iz istog komboa znači da nijedan tajmer otpornosti nije bio uključen (nema ništa za izvršavanje, ili svaki nalog nije prošao proveru dostupnosti). Izgrađeno u `open-sse/services/combo/pinRecovery.ts` na osnovu isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi za provajdera preskočeni → proverite i stanje circuit breaker-a I `rateLimitedUntil`/`testStatus` svake konekcije.
- Provajder trajno isključen nakon prozora reseta → kod čita sirovo `state` umesto `getStatus()`/`canExecute()`.
- Jedan ključ otkazuje, ostali bi trebalo da rade → dajte prednost connection cooldown-u nad circuit breaker-om.
- Samo jedan model otkazuje → dajte prednost model lockout-u nad connection cooldown-om.
- Stanje bi trebalo da se samo oporavi, ali se ne oporavlja → proverite vremensku oznaku u budućnosti + putanju čitanja koja osvežava isteklo stanje. Trajni statusi zahtevaju ručne izmene.

---

## Stanje u vreme izvršavanja — brza referenca za agenta

> Doslovno preneto iz `AGENTS.md` → "Resilience Runtime State" (PR #12743) kako bi
> vodič za agenta ostao ispod budžeta konteksta od 40k. Ovo je zgusnuti prikaz gornjih
> odeljaka okrenut agentu; numerisani odeljci ostaju puna referenca.

OmniRoute ima tri povezana, ali različita mehanizma za privremene otkaze. Držite njihove
opsege odvojenima prilikom otklanjanja grešaka u ponašanju rutiranja. Pogledajte
[dijagram otpornosti u 3 sloja](../diagrams/exported/resilience-3layers.svg)
(izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
za mapu pogodnu za brzi pregled.

### Circuit breaker provajdera

**Opseg**: ceo provajder, npr. `glm`, `openai`, `anthropic`.

**Svrha**: zaustaviti slanje saobraćaja provajderu koji stalno otkazuje na
nivou upstream-a/usluge, kako jedan neispravan provajder ne bi usporavao svaki zahtev.

**Implementacija**:

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje chat gate-a/izvršavanja: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa u vreme izvršavanja: `src/app/api/monitoring/health/route.ts`
- Deljeni omotači: `open-sse/services/accountFallback.ts`
- Tabela trajnog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalan saobraćaj je dozvoljen.
- `DEGRADED`: zona ranog upozorenja — otkazi su prešli prag degradacije, ali još ne i
  prag prekidača; saobraćaj i dalje teče, kontrolne table prikazuju upozorenje. Važeći
  test konekcije ili miran prozor bez novih otkaza vraća ga u `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` sadrži taj prozor).
- `OPEN`: provajder je privremeno blokiran; pozivaoci dobijaju odgovor
  provider-circuit-open ili combo rutiranje preskače na drugi cilj.
- `HALF_OPEN`: tajmaut reseta je istekao; dozvoljava se probni zahtev. Uspeh zatvara
  prekidač, neuspeh ga ponovo otvara.

**Podrazumevane vrednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, koristi se preko
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Prekidač za ceo
provajder radi na osnovu `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira se na | otvara se na (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| --------- | --------------: | ---------------------------------------: | ----------------------------: |
| OAuth     |             `5` |                                      `8` |                         `60s` |
| API ključ |             `7` |                                     `12` |                         `30s` |
| Lokalni   |      (izvedeno) |                                      `2` |                         `15s` |

`PROVIDER_PROFILES` takođe definiše `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): oni pokreću
**kapiju prozora opcionog globalnog Provider Cooldown-a** (`PROVIDER_COOLDOWN_ENABLED`, podrazumevano
isključeno) — unos na nivou provajdera u `open-sse/services/providerCooldownTracker.ts` računa se kao
hlađenje tek nakon `providerFailureThreshold` otkaza unutar `providerFailureWindowMs`, a zatim
se hladi tokom `providerCooldownMs`. Oni NISU pragovi aktivnog prekidača — nemojte ih podešavati
očekujući ponašanje prekidača. Svaka podrazumevana vrednost može se pregaziti kroz
env varijable `OMNIROUTE_PROVIDER_BREAKER_*` i `OMNIROUTE_CIRCUIT_BREAKER_*`;
referentna tabela tačna za vreme izvršavanja nalazi se u `docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi otkaza na nivou provajdera trebalo bi da aktiviraju prekidač provajdera:

```ts
(408, 500, 502, 503, 504);
```

Nemojte aktivirati prekidač celog provajdera za uobičajene greške naloga/ključa/modela
kao što je većina slučajeva `401`, `403` ili `429`. One obično pripadaju connection
cooldown-u ili model lockout-u. Generički `403` provajdera sa API ključem trebalo bi da
bude oporavljiv, osim ako nije klasifikovan kao terminalna greška provajdera/naloga.

Prekidač koristi lenji oporavak, a ne pozadinski tajmer. Kada `OPEN` istekne, čitanja poput `getStatus()`, `canExecute()` i `getRetryAfterMs()` osvežavaju stanje na `HALF_OPEN`, tako da kontrolne table i graditelji combo kandidata ne nastavljaju da zauvek isključuju provajdera čije je ograničenje isteklo.

### Hlađenje konekcije

**Opseg**: jedna konekcija/nalog/ključ provajdera.

**Svrha**: privremeno preskočiti jedan neispravan ključ/nalog, dok druge konekcije za istog provajdera nastavljaju da opslužuju zahteve.

**Implementacija**:

- Putanja za upis/ažuriranje: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbor/filtriranje naloga: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračunavanje hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Podešavanja: `src/lib/resilience/settings.ts`

Važna polja na konekcijama provajdera:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tokom izbora naloga, konekcija se preskače dok:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hlađenja su takođe lenja: kada `rateLimitedUntil` bude u prošlosti, konekcija ponovo postaje podobna. Pri uspešnoj upotrebi, `clearAccountError()` briše `testStatus`, `rateLimitedUntil`, polja greške i `backoffLevel`.

Podrazumevano ponašanje hlađenja konekcije:

- Osnovno OAuth hlađenje: `5s`.
- Osnovno hlađenje za API ključ: `3s`.
- API ključ `429` treba da preferira nagoveštaje za ponovni pokušaj od uzvodnog servisa (`Retry-After`, reset zaglavlja ili tekst o resetovanju koji se može parsirati) kada su dostupni.
- Ponovljeni otkazi koji se mogu povratiti koriste eksponencijalni backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita od thundering-herd efekta sprečava da istovremeni otkazi na istoj konekciji više puta produžavaju hlađenje ili dvostruko uvećavaju `backoffLevel`.

Terminalna stanja nisu hlađenja. `banned`, `expired` (koje postaje terminalno tek nakon N ograničenih ponovnih pokušaja preko `EXPIRED_RETRY_MAX`) i `credits_exhausted` treba da ostanu nedostupni dok se kredencijali/podešavanja ne promene ili ih operator ne resetuje. Nemojte prepisivati terminalna stanja prolaznim stanjem hlađenja.

### Blokada modela

**Opseg**: provajder + konekcija + model.

**Svrha**: izbeći onemogućavanje cele konekcije kada je samo jedan model nedostupan ili ograničen kvotom za tu konekciju.

Primeri:

- Provajderi sa kvotom po modelu koji vraćaju `429`.
- Lokalni provajderi koji vraćaju `404` za jedan model koji nedostaje.
- Neuspesi dozvola za režim/model specifični za provajdera, kao što su odabrani Grok režimi.

Blokada modela se nalazi u `open-sse/services/accountFallback.ts` i omogućava da ista konekcija nastavi da opslužuje druge modele.

### Smernice za otklanjanje grešaka

- Ako su svi ključevi za provajdera preskočeni, proverite i stanje prekidača provajdera i `rateLimitedUntil`/`testStatus` svake konekcije.
- Ako provajder izgleda trajno isključen nakon prozora za resetovanje, proverite da li kod čita sirovo `state` umesto da koristi `getStatus()`/`canExecute()`.
- Ako jedan ključ provajdera ne uspe, a drugi bi trebalo da rade, dajte prednost hlađenju konekcije u odnosu na prekidač provajdera.
- Ako ne uspe samo jedan model, dajte prednost blokadi modela u odnosu na hlađenje konekcije.
- Ako stanje treba da se samo oporavi, treba da ima vremensku oznaku u budućnosti/reset timeout i putanju čitanja koja osvežava isteklo stanje. Trajni statusi zahtevaju ručne izmene kredencijala ili konfiguracije.

---

## TLS fingerprinting i prikrivanje (stealth)

Prikrivanje specifično za provajdera (JA3/JA4, CCH, obfuskacija) dokumentovano je zasebno — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije kompajlirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Pored jediničnih testova za logiku otpornosti, tri testa izlažu runtime stvarnim
uslovima stresa/otkaza (svi su integracioni/noćni — nijedan ne blokira PR-ove):

| Test        | Šta radi                                                                                                                                                                                             | Pokretanje                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Lažni upstream čvor ubacuje stvarno kašnjenje/reset/timeout/503; proverava da se prekidač kola (circuit breaker) otvara i oporavlja i da `checkFallbackError` klasifikuje 503 kao povratni fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 tokova po `createSSEStream` pod `--expose-gc`; pada ako hip preraste zadati plafon (OOM zaštita #3069).                                                                                         | `npm run test:heap`                    |
| k6 soak     | Trajno opterećenje na `/api/monitoring/health`; pragovi za p95/greške.                                                                                                                               | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + dispatch). U
podrazumevanom `test:integration`, chaos i heap testovi se sami preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pogledajte takođe

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sistema i interne komponente
- [Korisnički vodič](../guides/USER_GUIDE.md) — Provajderi, kombinacije, CLI integracija
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — Bodovanje po 16 faktora, paketi režima
