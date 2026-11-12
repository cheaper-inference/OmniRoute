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

### Аутоматска примена банковних ресетовања

**Обим:** Codex и Claude претплатничке (OAuth) везе.**Опт-ин** : поставка `bankedResetAutoApply` је искључена и подразумевано је у `dry-run` режиму (Подешавања → AI → Ауто-аппли банкед ресет).

**сврха:** сами троше банковне ресетове када налог наиђе на зид коришћења, уместо да чека да оператер притисне „Искупи“ на страници Ограничења добављача.

| Врста кредита (`creditTypes`) | Оно што се откупљује                                | Где трчи                                                       |
| ----------------------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| `codexCredits`                | Codex ресетује кредите                              | позадински посао, сваких 60 с                                  |
| `claudeCredits`               | Claude банковни грантови (`GRANT` кредити)          | позадински посао, сваких 60 с                                  |
| `claudeSessionReset`          | Claude недељно ресетовање ограничења сесије (изнад) | путању захтева, кроз исту политику као и пребацивање по налогу |

**Имплементација:**

- Чиста одлука (један скуп правила за оба пута): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Позадински посао: `src/lib/services/bankedResetAutoApply.ts` (започето у `src/instrumentation-node.ts`)
- Claude капија путање захтева: `src/lib/usage/claudeSessionResetPolicy.ts`, регистрована преко `setClaudeLimitResetPolicy()` у `open-sse/services/claudeLimitReset.ts`
- Историја, капи и веб-хук: `src/lib/usage/bankedResetAudit.ts`
- Историја API: `GET /api/settings/banked-reset-auto/history?limit=50` (ауторизација управљања)

**Редослед одлуке** (прво неуспешно правило је забележени разлог):

1. Функција је искључена, тип кредита искључен или налог ван опсега (`accountScope` `all` / `selected` плус `connections` мапа по налогу).
2. Изван опционог UTC распореда (`startHourUtc` > `endHourUtc` прелази поноћ).
3. Ограничења у последња 24 х: `maxPerAccountPerDay` (1), `maxPerDay` (3) и `minSpacingMinutes` (30) између било која два откупа.
4. Окидач: ограђени `session` или `weekly` прозор (читано из `getQuotaWindowStatus().reachedThreshold`, не `isAccountQuotaExhausted()`, који само извештава о налогу са сваким потрошеним прозором), или кредит који истиче унутар `expiringCreditHours` (24) на налогу који је користио најмање `expiringCreditMinUsedPercent` (50).
5. Заштита природног ресетовања: прескочите када се 5-часовни прозор са зидом ресетује унутар `sessionResetGuardMinutes` (90), или зазидани недељни прозор унутар `weeklyResetGuardHours` (12).
6. Недељни праг: прескочите 5-часовно ресетовање када је недељни преостали део испод `weeklyFloorPercent` (10).
7. `last-resort` режим: прескочите док други налог у оквиру истог провајдера има најмање `poolHeadroomPercent` (10) преостало у оба прозора. Окидачи кредита који истичу ово заобилазе.
8. `dry-run` снима ред и ништа не откупљује; `last-resort` и `eager` откупљују.

Недостајући подаци о квоти никада не откључавају откуп: непознато време ресетовања или недељна употреба прескаче.

**Ресетовање Claude сесије:** када је функција искључена или `claudeSessionReset` искључен, `autoLimitReset` прекидач по налогу одлучује тачно као и раније. Када су оба укључена, ова функција замењује прекидаче по налогу: налог у оквиру опсега може захтевати само када смернице то дозвољавају, а у `dry-run` режиму нема захтева.

**безбедност:** посао откупљује највише један кредит по тику, одлучује пре него што наведе кредите (прескочени налог никада није наведен), користи кључеве идемпотенције `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` и повлачи налог на 1 х након неуспешног листинга или откупа. Свака одлука о откупу, неуспеху и одлуци о сувом раду се уписује у `audit_log` (`action: "bankedReset.redeem"`, без токена или кредитних ИД-ова); капице се рачунају из тих редова, тако да преживљавају поновно покретање. Успешна искоришћавања такође активирају `provider.reset_redeemed` веб-хук.

Регресиони чувари: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

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

**Opseg:** trojka provajder + veza + model.

**Opseg prema statusu:** status greške određuje u koji ključ zaključavanje upisuje
(`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili prava pristupa — zaključava **porodicu kvota**:
  za codex ceo opseg `codex` / `spark` (svaki `gpt-5*` model te veze), a za
  druge provajdere `getQuotaScopedModelForProvider()`.
- `404` zaključava osnovni model (`getModelLockKey()` sužava opseg
  `not_found`).
- Bilo koji drugi status — `5xx` greške prenosa/servera i OmniRoute-ov sopstveni
  sintetizovani `502` iz validacije kvaliteta — zaključava samo **tačnu**
  kombinaciju provajdera/veze/modela. Neuspešan tok jednog modela nije dokaz o
  kvoti naloga; pre ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklanjao je svaki `gpt-5*` model te veze iz rutiranja na
  2–30 min (uz eskalaciju), dok je njena kvota ostajala netaknuta.
- Eksplicitna opcija `scope` pozivaoca uvek ima prednost (Antigravity prosleđuje `"exact"`).

**Svrha:** izbeći onemogućavanje cele veze kada je nedostupan ili ograničen kvotom samo jedan model.

**Primeri:**

- Provajderi sa kvotama po modelu koji vraćaju 429
- Lokalni provajderi koji vraćaju 404 za jedan model koji nedostaje
- Neuspešna provera dozvola specifična za provajdera/režim/model (npr. režimi za Grok)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrolna tabla perioda hlađenja modela (v3.8.0)

Interfejs: Podešavanja → Periodi hlađenja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Navodi aktivna zaključavanja sa podacima: provajder, veza, model, razlog, expiresAt. Operateri mogu ručno ponovo da omoguće model sa kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — navodi aktivna zaključavanja
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Telo: `{provider, connection, model}`. Autentifikacija: upravljanje.

### Upravljač periodima hlađenja

Interfejs: Nadzor → Upravljač periodima hlađenja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku vezu koja je van rutiranja iz privremenog razloga, umesto
otvaranja stranice svakog provajdera. Navodi periode hlađenja veza, zaključavanja
modela i terminalna stanja, uklanja ih po vezi, za izabrane veze ili za sve veze
jednog provajdera i uređuje najčešće podešavana pravila perioda hlađenja:
`streamStallCooldown.enabled` i osnovni period hlađenja `connectionCooldown` za OAuth /
API ključ, kao i maksimalan broj koraka eksponencijalnog povratnog čekanja (čuva se
putem `PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`) su
navedena, ali se ovde nikada ne uklanjaju.

Kartica **Pravila perioda hlađenja za greške** na istoj stranici uređuje pravila
grešaka operatera (`settings.providerErrorRules`) i podrazumevane opšte vrednosti
po provajderu (`settings.providerErrorDefaults`) putem `PATCH /api/settings` — pogledajte
„Pravila koja je deklarisao operater“ u odeljku §7 za način njihovog uparivanja. Trajanja
su Podrazumevano (bez eksplicitnog perioda hlađenja), 30 min, 1 h, 5 h, 24 h ili
prilagođeno od 1 do 43.200 minuta (30 dana).

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikacija: upravljanje):

- `GET /api/resilience/cooldowns[?provider=]` — veze sa statusom, preostalim periodom hlađenja,
  nivoom povratnog čekanja, poslednjim tipom greške i zaključavanjima modela (bez akreditiva)
- `POST /api/resilience/cooldowns` — telo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Interfejs podešavanja zaključavanja + oporavak smanjenjem nakon uspeha (v3.8.23)

Zaključavanje modela prešlo je sa ponašanja koje je uvek bilo uključeno i
hardkodovano na potpuno podesivu, opcionalnu funkciju sa sopstvenom karticom
podešavanja i putanjom za samoisceljujući oporavak.

**Kartica podešavanja:** Podešavanja → Zaključavanje modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo je **različito** od kartice samo za čitanje `ModelCooldownsCard` iznad (koja samo
_navodi_ aktivna zaključavanja) — nova kartica _podešava parametre_. Podrazumevane
vrednosti se nalaze u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Podešavanje             | Podrazumevano                    | Značenje                                                                |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — zaključavanje modela je **podrazumevano isključeno**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi uzvodnog sistema koji se računaju kao greška opsega modela.     |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje zaključavanja pri prvom neuspehu.                      |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Ograničenje eskaliranog perioda hlađenja.                               |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eskalacije eksponencijalnog povratnog čekanja.   |
| `useExponentialBackoff` | `true`                           | Da li ponovljeni neuspesi eksponencijalno povećavaju period hlađenja.   |

Podešavanja se čuvaju kroz uobičajeno skladište podešavanja i proveravaju prema
šemi podešavanja otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(tako da važi `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjenjem nakon uspeha:** oporavak se ne zasniva **isključivo** na
isteku tajmera. Zdrav odgovor smanjuje broj neuspeha modela, tako da model koji se
oporavio usred perioda prestaje da eskalira (i otključava se) pre isteka tajmera.
Nakon uspešne kombinacije ciljeva, `open-sse/services/combo.ts` poziva
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), što
**prepolovljava** sačuvani `failureCount` (`Math.floor(failureCount / 2)`); kada
dostigne `0`, unos zaključavanja se u potpunosti briše. Suprotna funkcija
`recordModelLockoutFailure()` povećava broj (i eskalira period hlađenja) pri
neuspesima unutar prozora eskalacije. Ovo smanjenje nakon uspeha predstavlja
dodatak običnom isteku tajmera — bilo koji od ta dva puta može ponovo da omogući
model.

**Stanje:** blokade se čuvaju **u memoriji** (kao `Map` objekti po procesu, sa ključevima `ModelLockoutEntry` u obliku
`provider:connectionId:model`, dok brave za tačan opseg koriste ključeve
`provider:connectionId:exact:model`), a ne u bazi podataka — gube se nakon
ponovnog pokretanja. _Postavke_ se čuvaju; aktivno _stanje blokade_ je prolazno.

---

## 4. Куота-Схаре Цонцурренци Цонтрол (в3.8.36)

Налози за претплату (GLM, MiniMax, итд.) често прихватају само ~ 1–3 истовремена захтева; прекорачење тога покреће 429с и хлађење. Ово је акутно под **квота-удео** (`qtSd/…`) комбинације, где неколико API кључева дели један упстреам налог. Три слоја чувају заједнички налог од поплаве.

### Ограничење конкурентности по вези (`max_concurrent`)

Свака веза провајдера може декларисати `max_concurrent` плафон (`provider_connections.max_concurrent`, постављен у модалној вези / API / DB). Оставите га празним без ограничења. Ово је једно дугме које покреће слој серијализације испод — поставља га на стварну конкурентност налога (нпр. GLM ~ 1, MiniMax ~ 2).

### Ограничења истовремености по моделу (`modelConcurrency`)

Веза може додатно да декларише тачне горње границе истовремености по моделу унутар своје `rateLimitOverrides` мапе:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Поставите га у модалну везу (**Ограничење брзине замењује → ограничења истовремености по моделу** , један `model=cap` по линији) или преко `PATCH /api/providers/[id]` са истим JSON обликом. Кључна семантика:

- **На нивоу везе у односу на специфичан модел:** `maxConcurrent` остаје плафон за заједничку везу. Када се примењују оба, обе капије се добијају атомски у истој композитној капији (`global → provider → account → model`); ефективно понашање је строжа применљива граница.
- **Тачно подударање модела и кључа:** кључ је низ модела који се прослеђује извршиоцу након резолуције рутирања — обично је ИД модела (`glm-5`), а не `provider/model` алиас на страни клијента (`zai/glm-5` се не поклапа `glm-5`). Вредности су максималне вредности истовременог захтева позитивног целог броја.
- **Локално чекање у реду, без откривања:** вишак захтева у редовима локално са постојећом queue/timeout семантиком (откуцане `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` грешке у пријему). OmniRoute не открива и не закључује политику узводног — већ примењује тачне горње границе које је оператер конфигурисао. Засићена капија модела никада не онемогућава добављача и никада не ствара трајно закључавање модела; Узводно 429/cooldown/fallback понашање остаје заустављање грешке.
- **По вези, опсег процеса:** ограничења су по вези са базом података и држе се у меморији, тако да две везе које поново користе исти узводни API кључ не координирају једна са другом.
- **Неконфигурисано значи непромењено:** изостављање мапе (или остављање поља контролне табле празно) не додаје капију модела. Пример конфигурације без постављања ограничења универзалног добављача:

```text
glm-5=1
glm-4.7=3
```

### Серијализација захтева за дељење квоте

Када отпремање поделе квоте циља везу која декларише позитиван `max_concurrent`, истовремени захтеви за то **рачун** се серијализују преко семафора по вези (кључ `qsconn:<connectionId>`): вишак захтева **чекати у реду** уместо да поплави рачун. јесте **неуспешно отварање** — засићени ред или временско ограничење се наставља без слота уместо да икада одбије захтев који се може отпремити. Укључи **Подешавања → отпорност → Конкурентност дељења квоте по конекцији** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, подразумевано укључено). Без `max_concurrent` капице понашање је непромењено.

> Капија за рутирање са дељењем квоте (`selectQuotaShareTarget`, DRR + P2C) је сама по себи отворена и само _одређује_ везу са ограничењем — са скупом једне везе коју не може чврсто да ограничи, тако да је овај семафор оно што заправо садржи поплаву.

### Поновни покушај комбинованог хлађења

За сваку комбиновану стратегију (када је омогућена), захтев који би кристализовао 429 за SHORT пролазно хлађење га чека и поново шаље уместо враћања 429 — ово покрива TPM/RPM прозоре класе Гемини (~ 60с поновни покушај након) на комбинацијама више модела, нпр. лимит. Ограничено `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) у **Подешавања → Отпорност** . Никада не чека на `quota_exhausted` (закључано до поноћи) или auth/not-found разлога. Са `comboTimeoutMs` постављеним, чекање које не може да се заврши пре тог рока не почиње (#18998): комбинација одговара одмах својим терминалним одговором уместо `COMBO_TIMEOUT` 504.

Комбинација се може искључити са `config.comboCooldownWaitEnabled: false`. Само буквални `false` онемогућава ова дељена комбинована чекања (хлађење након отпреме и чекања circuit-open/model-lock пре отпреме) и њихово продужење прага временског ограничења чекања и буџета. Недостаје или `true` чува глобалну политику; `true` не може да омогући глобално онемогућено чекање. Експлицитни `targetTimeoutMs` и даље побеђује. Ово одустајање не мења одвојено чекање пре отпреме у матичном Цодек-у.

Иста капија покрива случај пре отпреме (#16319): када се свака мета комбинације прескочи пре било каквог покушаја јер се њен модел налази у кратком пролазном закључавању, путања без покушаја чека закључавање под истим плафонима и поново се шаље, уместо да одговори на `503 ALL_TARGETS_SKIPPED` без наговештаја. Када није дозвољено чекање (плафон, покушај или буџет је исцрпљен, или је функција искључена), одговор терминала се надогради на `429 rate_limit_error` који носи `retry_after` / `reset_at` од најранијег истека прелазног закључавања; куота, аутх и нот-фоунд браве задржавају 503 без наговештаја.

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

## 7. Ponovno postavljanje statusa upstream-a (pogrešno navedene greške kvote)

**Obuhvat:** jedan upstream gateway koji prijavljuje privremenu iscrpljenost kvote pogrešnim HTTP statusom.

**Svrha:** ispraviti status koji dovodi u zabludu PRE klasifikacije, kako bi downstream potrošači (fallback engine, agregacija kombinacija, odgovor namenjen klijentu) videli stvarnu mogućnost ponovnog pokušaja.

Neki gateway-i signaliziraju PRIVREMENU iscrpljenost kvote HTTP statusom koji ne
dozvoljava ponovni pokušaj. `agentrouter.org` vraća `403` (ponekad `400`) sa
kineskim telom (`用户额度不足` / `额度不足`) umesto standardnog `429`. Klijenti
kao što je Claude Code tretiraju `403` kao trajnu grešku i prekidaju sesiju, a bez
ispravke bi fallback engine klasifikovao grešku kao `AUTH_ERROR`, umesto kao
događaj povezan sa kvotom.

**Implementacija:**

- Registar + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  pravila po provajderu (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), koja se podudaraju pomoću `applyStatusRestatement()`.
- Mesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko linije 3654), neposredno nakon što `parseUpstreamError()` obradi upstream
  odgovor sa HTTP statusom greške (`!providerResponse.ok`), a pre pokretanja bilo
  kakve klasifikacije, tako da svaki downstream potrošač vidi ispravljeni status.
  Greške ugrađene u `200` SSE tok prate zasebnu, kasniju putanju za parsiranje toka
  i danas **nisu** obuhvaćene ovom tačkom integracije — to je poznato ograničenje,
  koje trenutno nije potrebno za pogrešan status agentrouter-a (koji se pojavljuje
  kao HTTP status greške).
- Podobnost za ponovni pokušaj: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pa ispravljena greška
  nosi stvarni prozor za ponovni pokušaj, umesto da se prikazuje kao neaktivni
  `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) samo
  je vrednost koju ispravljeni odgovor saopštava **klijentu**; ona sama nije
  interno trajanje hlađenja/blokade konekcije — njime zasebno upravlja mehanizam
  koji zaista obrađuje ispravljenu grešku (Connection Cooldown sa rastućim
  backoff-om, §2, osnovnih `3s` za provajdere API ključeva; ili Model Lockout, §3,
  za provajdere sa kvotom po modelu, kao što je agentrouter). Router interno može
  postati podoban za ponovni pokušaj pre isteka prozora od 60s koji oglašava
  klijentu — to je namerno obezbeđivanje rezerve, a ne greška.

Trajne greške (`无权访问模型` — nema pristupa ovom modelu) se NIKADA ne
ispravljaju: `excludeMarkers` poništava pravilo čak i kada se `textMarkers`
podudare, pa greška zadržava svoj prvobitni status i ništa je ne pokušava ponovo
u nedogled. Odgovarajuće pravilo klasifikacije provajdera
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarisano osnovno hlađenje od `6h`)
proverava `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pre_ generičkog ranog vraćanja za kategoriju apikey `FORBIDDEN`, uz uslov
`honorsRuleLockScope(provider)` (#10334 — trenutno ekskluzivno za agentrouter
putem liste dozvoljenih provajdera `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarisano hlađenje od 6h iz pravila prosleđuje se
kao `fallbackResult.baseCooldownMs`, ali se i dalje koristi postojeća putanja
blokade po modelu za kvotu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, koju #10334 nije promenio osim izvora trajanja
hlađenja): ono se ograničava na vrednost `mlSettings.maxCooldownMs` operatora
(podrazumevano `1_800_000ms` / 30min), kao i svaka druga blokada modela, a
_persisted lockout reason_ ostaje postojeća hardkodovana vrednost `"forbidden"`,
a ne `"auth_error"` iz pravila — kroz ceo tok uvažava se samo trajanje hlađenja,
ne i tekst razloga. Sama konekcija ostaje aktivna; povezani modeli na istoj
konekciji nisu pogođeni.

Ispravljene greške kvote (`额度不足`) u produkciji dolaze do pravila provajdera
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez sopstvenog deklarisanog hlađenja — primenjuje se podrazumevani
skalirani backoff sloja za perzistenciju). Od #10334, `scope` u
`ProviderErrorRuleMatch` SE koristi kroz ceo tok, ali **samo** za provajdere na
listi dozvoljenih `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — danas samo `"agentrouter"`, uz uslov
`honorsRuleLockScope()`). Za sve druge provajdere `scope` ostaje informativan,
upravo kao i pre #10334. `checkFallbackError` izlaže obuhvat podudarnog pravila
kao `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je zajednička provera koja potvrđuje da je
`ruleScope` zaista bezbedno uvažiti kao signal koji važi za celu konekciju i
omogućava samostalni oporavak (obuhvat `"connection"`, razlog
`quota_exhausted`, nikada `permanent`, nikada `creditsExhausted` — zaštita od
budućeg uparivanja obuhvata `"connection"` sa trajnim stanjem naloga). Pozivaju
je dva potrošača:

- **Перзистенција** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  уместо да пређе у грану за **закључавање по моделу** passthrough-провајдера
  (agentrouter има `passthroughModels: true` → `hasPerModelQuota()`
  враћа `true`), примењује **привремени cooldown везе** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, никада терминални статус
  (`credits_exhausted`/`banned`/`expired`) — тако да се веза сама опоравља
  након истека cooldown-а, уместо да захтева ручно ресетовање акредитива.
  Прескаче се за везе са `disableCooling: true` (#2997): тај opt-out
  уместо тога прелази на закључавање по моделу (документовани компромис —
  погледајте коментар у коду изнад гране).
- **Комбиновано рутирање у оквиру истог захтева** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): иста заштита означава
  везу у меморијском скупу `exhaustedConnections`, чији је кључ
  `${provider}:${connectionId}`. Ово прескаче само преостали циљ у оквиру
  ИСТОГ ЗАХТЕВА који _сам већ садржи тај исти `connectionId`_ у сопственом
  објекту циља (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` пре претраге `exhaustedConnections`) — обичан combo са листом
  модела, где суседни циљеви немају сопствени закачени `connectionId`, а један
  се разрешава по диспечирању из заглавља одговора
  `X-OmniRoute-Selected-Connection-Id`, никада не погађа то подударање кључа. У
  том уобичајеном случају, стварна заштита од тога да преостала грана поново
  употреби управо исцрпљени налог НИЈЕ овај скуп — већ горенаведени слој
  перзистенције (вредност `rateLimitedUntil` везе је сада у будућности)
  у комбинацији са тиме што иста заштита потискује
  `transientRateLimitedProviders` за овај неуспех (погледајте „Двостепени дизајн“
  и коментар у коду на грани
  `isAgentrouterConnectionQuotaScope` у `targetExhaustion.ts`): пошто скуп
  остаје неозначен, `combo.ts`-ов `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) НЕ активира се
  за преостале гране овог провајдера, па се филтер за `rateLimitedUntil` у
  избору акредитива (`src/sse/services/auth.ts:1238`) поштује уобичајено, а
  преостала грана или бира другу, и даље подобну agentrouter везу или не успева
  јер нема доступних акредитива — не пробија се назад до везе коју је ова грана
  управо ставила у cooldown.

### Двостепени дизајн: поновно навођење статуса, затим класификација

Поновно навођење статуса (`upstreamStatusRestatement.ts`) и правила
класификације провајдера (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) представљају одвојене регистре који оба користе
идентификатор провајдера и текстуалне маркере као кључеве, али се извршавају
на различитим местима и служе различитим сврхама: поновно навођење рано
преписује HTTP статус у `chatCore.ts`; правила класификације бирају резервни
`reason` и опсег закључавања `scope`
(`model` / `provider` / `connection`) унутар `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Правила класификације виде пун **текст** грешке (потребан за подударање са
маркерима у телу, као што је `额度不足`) само за провајдере наведене на
списку дозвољених `FULL_TEXT_RULE_PROVIDERS` у `providerErrorRules.ts` —
тренутно само `"agentrouter"`. За сваки други **уграђени провајдер**,
`checkFallbackError` прослеђује `getProviderErrorRuleMatch`-у само
структурисану грешку (`{code, type}`), што је довољно за правила заснована на
заглављу/статусу/коду, али не и за маркере у тексту тела. Помоћна функција
`resolveRuleMatchBody()` обавља овај избор: пун текст грешке за провајдере на
списку, а структурисану грешку у супротном. Додавање **уграђеног** провајдера
у `FULL_TEXT_RULE_PROVIDERS` представља експлицитно укључивање за сваки
провајдер појединачно — постоји како би подразумевана путања за сваки
провајдер који није на списку остала непромењена до нивоа бајта.

`scope` правила (`model` / `provider` / `connection`) представља одвојено
експлицитно укључивање у односу на `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` га само излаже као `fallbackResult.ruleScope`, а
низводни корисници га поштују као било шта осим информативне ознаке само за
провајдере на списку `HONORS_RULE_LOCK_SCOPE_PROVIDERS` у истој датотеци
(контролисано преко `honorsRuleLockScope()` — данас само `"agentrouter"`).
Погледајте „Поново наведене грешке квоте“ изнад за објашњење шта
подударање са `scope: "connection"` заправо ради након што се провајдер
дода на тај списак.

**#11104 — правила која је декларисао оператор заобилазе оба списка.**
Оператор може у време извршавања да декларише правило по провајдеру преко
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
без измене ове датотеке. Условљавање правила оператора списковима
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — списковима
намењеним заштити **подразумеваног** понашања правила уграђених провајдера —
учинило би механизам подешавања неактивним за сваки провајдер осим оних који
су већ наведени, пошто је декларисање правила већ експлицитно укључивање од
стране оператора. `resolveRuleMatchBody()` и `honorsRuleLockScope()` прво
проверавају `hasOperatorRuleForProvider()`: провајдер са правилом оператора
добија необрађени текст грешке и његов декларисани `scope` се поштује,
без обзира на то да ли се такође појављује на било ком од та два списка.

**Правила која је декларисао оператор** (`OperatorProviderErrorRule`): свако
правило има опциони `status` и опциони `match` (обична подниска текста грешке
без разликовања великих и малих слова, никада RegExp, па не може изазвати
ReDoS), а мора да постави најмање једно од та два поља. Када су оба постављена,
користи се логичко И; изостављено поље се подудара са било чим, па
`{match: "insufficient_quota"}` одговара било ком статусу који садржи тај код.
Побеђује прво правило које се подудара. `cooldownMs` прихвата највише 30 дана;
укупно је дозвољено највише 50 правила.

**Podrazumevane vrednosti za sve slučajeve** (`settings.providerErrorDefaults`, opcionalno uključivanje, podešava se putem
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
sa `cooldownMs` od 1 minuta do 30 dana. Podrazumevana vrednost se primenjuje samo kada se
ne podudara nijedno operatorsko pravilo niti ugrađeno pravilo kataloga, i samo na greške
402, 403, 408, 429 i 5xx. Greške oblika zahteva (400, 404, 409, 413, 422) i samostalne
401 greške zadržavaju sopstvenu obradu. Ako nije naveden eksplicitni `reason`, razlog se
određuje na osnovu statusa, na isti način kao što to radi `classifyError`. Deklarisanje
podrazumevane vrednosti računa se kao operatorsko pravilo za
`hasOperatorRuleForProvider()`, pa se njen `scope` (podrazumevano `"connection"`) uvažava.
Efektivno vreme hlađenja podrazumevane vrednosti je duže od njenog `cooldownMs` i sopstvenog
saveta provajdera za ponovno pokušavanje (`Retry-After`, `x-ratelimit-reset` ili savet o
resetovanju u telu, isti savet koji engine uvažava kada je podešavanje za hlađenje veze
„use upstream retry hints“ uključeno), tako da podrazumevana vrednost može produžiti kratak
savet provajdera, ali nikada ne može skratiti stvarno resetovanje. Eksplicitno operatorsko
pravilo zadržava svoj tačan `cooldownMs`. Ni pravilo ni podrazumevana vrednost ne zaobilaze
zaštite od hlađenja veze u `markAccountUnavailable`: aktivno, duže hlađenje se nikada ne
skraćuje, a terminalni status se nikada ne prepisuje. Ugrađeni detektori teksta koji se
ranije izvršavaju u `checkFallbackError` (iscrpljeni krediti, dnevna kvota, deaktiviran
nalog) i dalje imaju prednost za sopstvene fraze.

**Poznat nedostatak — `providerRuleRegistry` se nikada ne proverava za HTTP 400.**
Grana `BAD_REQUEST` u `checkFallbackError` klasifikuje status 400 u potpunosti putem
sopstvenih nizova obrazaca (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća rezultat pre nego što
se dođe do grane `configuredRule`/`getProviderErrorRuleMatch` iznad nje.
Ugrađeno pravilo kataloga (ili operatorsko pravilo) sa `status: 400` sintaksički je
ispravno, ali se nikada neće aktivirati. Nijedno postojeće pravilo trenutno ne cilja
400, pa ništa u produkciji nije pogođeno — ali buduće pravilo za 400 zahteva da se
najpre izmeni ova grana, što je veća izmena od dodavanja pravila (ona menja klasifikaciju
400 za svakog provajdera koji se već oslanja na ponašanje nizova obrazaca) i izvan je
opsega dodavanja pravila za jednog provajdera.

### Dodavanje novog gateway-a koji pogrešno navodi kvotu

1. Registrujte jedan niz pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Održavajte `textMarkers`
   specifičnim za provajdera; nikada nemojte ponovo koristiti generičke engleske fraze
   koje se preklapaju sa `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opcionalno registrujte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) da biste izabrali
   odgovarajući opseg zaključavanja (`connection` za kvotu na nivou naloga, `model` za
   greške po modelu). Ovaj korak u produkciji stupa na snagu samo za provajdere čija
   pravila zahtevaju puni tekst greške (markere iz tela): dodajte identifikator provajdera
   u `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom
   `checkFallbackError` pravilu prosleđuje samo strukturisanu grešku
   `{code, type}`, pa se pravilo zasnovano na tekstu tela nikada neće podudariti sa
   stvarnim saobraćajem. Pravila koja se podudaraju isključivo na osnovu
   `status`/`headers` (kao Opencode-ova ili Minimax-ova) ne zahtevaju ovo eksplicitno
   uključivanje. Odvojeno, ako pravilo navodi `scope: "connection"` i namera je stvarno
   hlađenje na nivou veze uz preskakanje kombinacije za isti zahtev (a ne samo
   informativna oznaka), dodajte identifikator provajdera u
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — to određuje da li se koristi
   potrošnja u stilu `isAgentrouterConnectionQuotaScope()` u
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga, `scope` i dalje prolazi kroz
   `fallbackResult.ruleScope`, ali ništa ne postupa na osnovu njega.
3. Dodajte jedinične testove po uzoru na
   `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (uključujući provere
   not-permanent / not-creditsExhausted, kao i — ako je provajderu potrebna lista
   dozvoljenih — test kojim se potvrđuje da `resolveRuleMatchBody()` vraća puni tekst
   samo za tog provajdera).

Nisu potrebne izmene u `chatCore.ts`, `classifyError` niti u combo.

#### Zaključavanje grupisano po izlazu (#10880)

Provajderi u `EGRESS_BUCKETED_LOCK_PROVIDERS` (porodica opencode) tretiraju se kao
uzvodni sistemi grupisani po IP adresi (besplatni nivo opencode-a grupisan je po IP
adresi, a ne po nalogu — pogledajte #9611): status-429 klasifikovan kao
`quota_exhausted` **ili** `rate_limit_exceeded` hladi svaku vezu iz porodice na listi
dozvoljenih čiji se poslednji poznati izlazni IP podudara sa IP adresom neuspešne veze,
pre nego što rotacija može da ih pokuša
— čime se izbegavaju N-1 garantovano neuspešnih poziva uzvodnom sistemu (isti obrazac kao
u #10460/#10525). `rate_limit_exceeded` je namerno uključen: na putanji
`markAccountUnavailable` pravila specifična za opencode nikada se ne podudaraju
(`checkFallbackError` ne dobija zaglavlja/telo, a opencode nije u
`FULL_TEXT_RULE_PROVIDERS`), pa 429 čije telo sadrži tekst o kvoti pretplate
("monthly usage limit reached") klasifikuje `quota_exhausted` rezervni mehanizam za
tekst kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; hlađenje od 1
časa) pre nego što se uopšte dođe do pravila `status_429` — dok se 429 bez teksta o
kvoti (obično ograničavanje brzine) klasifikuje putem pravila `status_429` kao
`rate_limit_exceeded` i i dalje hladi IP porodicu. Za provajdera na listi dozvoljenih,
ograničenje brzine grupisano po IP adresi predstavlja isti signal kao i iscrpljena kvota.
Poštena ograničenja:

- **Најбољи могући покушај**: закључавање разрешава последњи познати `egress_ip` конекције
  из `proxy_logs` (прозор од 24 сата, синхроно, без кеша). Хладан кеш (`egress`
  IP никада није испитан) или непостојећи ред → неуспешна конекција се и даље
  хлади преко гране (бележи се као и данас), само се ниједна суседна конекција не закључава.
- **Никада терминално**: хлађење је обновљиви квотни прозор
  (`testStatus: "unavailable"`); трајно стање се никада не изводи из сигнала на нивоу IP адресе.
  Конекције са `disableCooling` у потпуности прескачу ову грану.
- **Грануларност закључавања се мења за породицу са allowlist-e**: ово је промена опсега, а не само
  оптимизација суседних конекција. opencode је `passthroughModels` провајдер, па је пре ове гране
  429 производио закључавање по-MODEL-у; сада производи хлађење конекције — укључујући и случај
  оператора који покреће само једну конекцију, без иједне суседне. То је грануларност коју табела
  правила за opencode већ проглашава исправном (`scope: "connection"`,
  `providerErrorRules.ts`), али до сада никада није била уважена јер opencode није у
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Грана сама уписује хлађење неуспешне
  конекције + `backoffLevel`, по узору на грану agentrouter-а са опсегом конекције, и враћа се —
  блокада по моделу и генерички пут испод се никада не досежу.
- **Комбо је укључен**: као и грана agentrouter-а, опсег намерно игнорише смањење
  `persistUnavailableState`/`isCombo` које комбо позивалац примењује на 429. Закључавање по моделу
  није слабији облик овог опсега, већ погрешна јединица: оно не говори ништа о исцрпљеном IP-у,
  па би комбо ротација наставила да троши по један гарантовано неуспешан позив по суседној конекцији.
- **Безбедност суседних конекција**: суседна конекција која је већ терминална (banned/credits_exhausted)
  или је већ у дужем хлађењу никада се не преписује.
- **Искључива allowlist-а**: проширивање `EGRESS_BUCKETED_LOCK_PROVIDERS` је
  експлицитна одлука власника; не постоји генеричко повезивање (образац #10334/#10419). Упит
  суседних конекција везује исту allowlist-у, уместо да је понавља као SQL литерал, па њено
  проширивање остаје промена у једном реду.
- **Ротација излазног IP-а у оба смера**: прозор претраге (24 сата) је
  знатно шири од TTL-а кеша излазног IP-а (5 минута), па је „последњи познати IP“ историја,
  а не тренутно стање. Ако је прокси конекције ротирао унутар прозора, закључавање може
  **промашити** заиста дељени IP (забележени IP је нови, неисцрпљени) — и симетрично може
  **охладити суседну конекцију која је у међувремену ротирала даље** од исцрпљеног IP-а.
  Други случај тој суседној конекцији одузима један прозор хлађења; оба случаја су прихваћена
  ограничења најбољег могућег покушаја заснованог на претрази историје.
- **Цена**: два ограничена скенирања `proxy_logs` (филтрирана по прозору преко
  `idx_pl_timestamp`), и то само учесталошћу 429. Нема новог индекса (миграција 134
  YAGNI). Измерено на копији базе са стварним саобраћајем умерене величине; инстанца
  са великим протоком садржи сразмерно више редова у истом прозору.

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
