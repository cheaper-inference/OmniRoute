# Resilience Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ունի երեք հստակ, բայց կապված ճկունության մեխանիզմներ: Յուրաքանչյուրն ունի տարբեր շրջանակ և նպատակ: Պահեք դրանք առանձին՝ երթուղային վարքագիծը վրիպազերծելիս:

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Աղբյուր՝ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard-ի գերակայությունը ճկունության փոխարկիչների համար:** Ընտրելու ճկունությունը փոխվում է շրջակա միջավայրից սերված — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — միայն ապահովում է _default_-ը (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`): Բուլը պահպանվում էր `resilienceSettings` ում (Dashboard →** Կարգավորումներ → առաձգականություն** / `PATCH /api/resilience`, պահպանված `key_value` ում) հաղթում է env արժեքին. նորմալացումը (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) պահում է պահված բուլյանը, երբ մեկը գոյություն ունի: Նման env var-ը `true` ի սահմանելը մի տեղակայման դեպքում, որտեղ վահանակն արդեն պահպանված է `false` հետևաբար, ոչինչ չի փոխում — միացրեք անջատիչը** Կարգավորումներ → առաձգականություն** (կամ մաքրել պահված դաշտը) փոխարենը:

## 1. Պրովայդերի Circuit Breaker

**Շրջանակ՝** ամբողջ պրովայդերը (օր.՝ `glm`, `openai`, `anthropic`)։

**Նպատակ՝** դադարեցնել տրաֆիկի ուղարկումը պրովայդերին, որը կրկնվող ձախողումներ է ունենում upstream/ծառայության մակարդակում։

**Իրականացում՝**

- Հիմնական դասը՝ `src/shared/utils/circuitBreaker.ts`
- Կապակցումը՝ `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Կարգավիճակի API՝ `GET /api/monitoring/health`
- Վերակայման API՝ `POST /api/resilience/reset`
- Փաթեթավորողներ՝ `open-sse/services/accountFallback.ts`
- Տվյալների բազայի աղյուսակը՝ `domain_circuit_breakers`

**Վիճակները՝**

- `CLOSED` — թույլատրվում է նորմալ տրաֆիկ
- `DEGRADED` — տրաֆիկը դեռ թույլատրվում է, բայց գրանցվում են պրովայդերի բարձրացած ձախողումները. վերադառնում է `CLOSED`-ի բավարար հաջողությունների դեպքում, վավեր կապի թեստի դեպքում, կամ վերջին ձախողման տեսակի համար ամենաերկար `OPEN` պահման ժամկետը լրանալուց հետո (նրա `cooldownByKind` արժեքը, հակառակ դեպքում՝ `resetTimeout`, × `maxBackoffMultiplier`, առնվազն մեկ cooldown) առանց նոր ձախողման
- `OPEN` — պրովայդերը ժամանակավորապես արգելափակված է. combo երթուղավորումը շրջանցում է այն
- `HALF_OPEN` — վերակայման ժամկետը լրացել է. թույլատրվում է փորձնական հարցում

**Կարգավորվող լռելյայն արժեքներ (`open-sse/config/constants.ts`, ցուցադրվում են Dashboard → Settings → Resilience-ում)՝**

| Դաս     | Դեգրադացում | Բացում      | Վերակայման ժամկետ |
| ------- | ----------- | ----------- | ----------------- |
| OAuth   | 5 ձախողում  | 8 ձախողում  | 60 վրկ            |
| API-key | 7 ձախողում  | 12 ձախողում | 30 վրկ            |
| Local   | ածանցյալ    | 2 ձախողում  | 15 վրկ            |

`degradationThreshold`-ը կառավարում է, թե երբ պրովայդերը մտնում է `DEGRADED`. `failureThreshold`-ը կառավարում է, թե երբ այն բացվում է և շրջանցվում։ Տեղական (Local) պրովայդերի պրոֆիլները դեռևս ցուցադրված չեն Resilience կարգավորումների էջում։

**Գործարկման կոդեր՝** միայն պրովայդերի մակարդակի կարգավիճակներ՝ `[408, 500, 502, 503, 504]`։ ՄԻ գործարկեք հաշվի մակարդակի սխալների համար (401/403/429-ի մեծ մասը — դրանք պատկանում են cooldown-ին կամ lockout-ին)։

**Ծույլ վերականգնում՝** երբ `OPEN`-ը լրանում է, `getStatus()`, `canExecute()`, `getRetryAfterMs()`-ը թարմացնում են վիճակը `HALF_OPEN`-ի։ Նույն ընթերցումները (և հաջորդ ձախողումը) հնացած `DEGRADED`-ը հետ են իջեցնում `CLOSED`-ի։ Ֆոնային ժամաչափ պետք չէ։

---

### Օպտ-ին գլոբալ Պրովայդերի Cooldown (պատուհանի դարպաս)

Չորրորդ, **օպտ-ին** շերտը (`PROVIDER_COOLDOWN_ENABLED`, լռելյայն՝ **անջատված**) պահում է
ձախողվող պրովայդերների միջհարցումային հիշողություն
`open-sse/services/providerCooldownTracker.ts`-ում, որին դիմում է combo-ի թիրախի
որոշումը, որպեսզի հաջորդական combo հարցումները չշարունակեն նորից անցնել հենց նոր
ձախողված պրովայդերով։ Պրովայդերի մակարդակի գրառումները ենթարկվում են `PROVIDER_PROFILES` պատուհանի դարպասին՝

| Պրոֆիլ  | Գործարկվում է հետո (`providerFailureThreshold`) | Պատուհանի ընթացքում (`providerFailureWindowMs`) | Սառչում է (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | ----------------------------------------------: | -------------------------------: |
| OAuth   |                                            `10` |                                         `15min` |                           `5min` |
| API key |                                            `15` |                                         `30min` |                          `10min` |

Շեմից ցածր պրովայդերը **չի** համարվում սառեցվող. հաջողությունը մաքրում է
պատուհանը։ Կապի մակարդակի գրառումները (`provider:connectionId`) փոխարենը պահպանում են
էքսպոնենցիալ `minRetryCooldownMs → maxRetryCooldownMs` հետաճը։ Վերասահմանումներ՝
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`։
Ռեգրեսիայի պաշտպան՝ `tests/unit/provider-cooldown-window-gate.test.ts`։

## 2. Կապի cooldown

**Շրջանակը՝** մեկ մատակարարի կապ/հաշիվ/բանալի։

**Նպատակը՝** բաց թողնել մեկ վնասված բանալին, մինչ նույն մատակարարի մյուս կապերը շարունակում են սպասարկել հարցումները։

**Իրականացում՝**

- Անհասանելի նշել՝ `src/sse/services/auth.ts::markAccountUnavailable()`
- Ընտրություն՝ նույն ֆայլում գտնվող `getProviderCredentials*`
- Cooldown-ի հաշվարկ՝ `open-sse/services/accountFallback.ts::checkFallbackError()`
- Կարգավորումներ՝ `src/lib/resilience/settings.ts`

**Յուրաքանչյուր կապի դաշտերը՝**

- `rateLimitedUntil` — ժամանակային դրոշմ, մինչև cooldown-ի ավարտը
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — էքսպոնենցիալ backoff-ի հաշվիչ

**Լռելյայն cooldown-ները՝**

- OAuth-ի բազային արժեք՝ 5s
- API-key-ի բազային արժեք՝ 3s
- API-key 429՝ նախընտրում է upstream-ի `Retry-After`/reset վերնագրերը/վերլուծելի reset տեքստը
- Backoff՝ `baseCooldownMs * 2 ** failureIndex`

**Մատակարարին հատուկ կրկնափորձի ուշացում։** Մատակարարի մանրամասների էջում կա **Retry delay** ընտրացանկը (Auto,
15s-ից մինչև 1h)։ Այն պահպանում է `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
արժեքը (1–21600՝ `PATCH /api/resilience` միջոցով)։ Երբ rate-limit սխալը upstream-ի կրկնափորձի
հուշում չի պարունակում, այդ արժեքը մատակարարի համար փոխարինում է մասշտաբավորված backoff-ին և
`backoffLevel`-ը զրոյացնում է (`open-sse/services/rotationConfig.ts::overrideFor`)։ Rate-limited սխալի
համար առաջնահերթությունը՝ ամենաբարձրից սկսած՝ upstream-ի կրկնափորձի հուշում, ապա ըստ կապի
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, ապա ըստ մատակարարի կրկնափորձի
ուշացում, ապա `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` env-ը, ապա մասշտաբավորված backoff-ը։
Auto-ն հեռացնում է դաշտը։ Սա ազդում է միայն rate-limit պատճառի վրա և երբեք՝ terminal վիճակների վրա։

**Anti-thundering-herd պաշտպանություն․** կանխում է միաժամանակյա սխալների պատճառով cooldown-ի չափից
ավելի երկարացումը կամ `backoffLevel`-ի կրկնակի ավելացումը։

**Concurrency-limit 429-ները backoff-ի աստիճանով չեն բարձրանում։** `429`-ը, որի մարմինը հաղորդում է
concurrency limit-ի մասին ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), նշանակում է, որ հաշիվը առողջ է, բայց զբաղված։
`checkFallbackError()`-ը վերադարձնում է `concurrency_limited` պատճառը․ անմիջապես անցնել հաջորդ
կապին, այս մեկը cooldown-ի մեջ դնել ֆիքսված `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) արժեքով կամ
upstream-ի կրկնափորձի հուշմամբ, թողնել `backoffLevel`-ը անփոփոխ և սահմանել `skipProviderBreaker`։
Բացահայտ quota body-ն դեռ գերակայում է, ուստի quota pattern-ին նույնպես համապատասխանող body-ն
մնում է quota verdict։ Հայտնաբերում՝ `looksLikeConcurrencyLimit()`-ը
`src/shared/utils/classify429.ts`-ում, verdict՝ `open-sse/services/accountFallback/concurrencyLimit429.ts`։
`classify429()`-ը (breaker-ի `FailureKind`-ը) չի փոխվել և այս body-ների համար դեռ կարդում է
`rate_limit`։

**Stream content stall-երը հաշիվը cooldown-ի մեջ չեն դնում։** Երբ content-stall watchdog-ը
(`open-sse/utils/streamHandler.ts`) հանձնվում է այն stream-ի դեպքում, որը ժամանակին model output
չի ուղարկել, `markAccountUnavailable()`-ը գրանցում է սխալը կապի վրա, բայց cooldown չի սահմանում․
stall-ը վերաբերում է այդ հարցմանը և առավել հաճախ առաջանում է երկար reasoning turn-ի դեպքում, երբ
դեռ output չկա։ Օպերատորները կարող են միացնել այս վարքագիծը
`resilienceSettings.streamStallCooldown.enabled`-ով (լռելյայն `false`)։

**`p2c` հաշվի ընտրության համար latency-ի ազդանշանի միացում ըստ ցանկության։** Յուրաքանչյուր
ուղարկված փորձ գրանցում է իր time-to-first-byte-ը և արդյունքը յուրաքանչյուր կապի (և կապ + model
զույգի) համար՝ հիշողության մեջ պահվող շարժական պատուհանում․ վերջին 20 նմուշները 15 րոպեի ընթացքում
(`open-sse/services/connectionLatencyTracker.ts`, գրանցվում է
`src/sse/handlers/chatHelpers.ts`-ի `safeLogEvents()`-ից)։ Երբ
`resilienceSettings.p2cLatency.weight`-ը մեծ է `0`-ից (ընդգրկույթը՝ 0-20, լռելյայն `0` = անջատված),
`src/sse/services/auth.ts`-ում գտնվող `compareP2CConnections()`-ը զույգի յուրաքանչյուր թեկնածուին
ավելացնում է մինչև `weight` միավոր։ Դրանց կեսը ստացվում է latency-ից՝ որպես ավելի արագ թեկնածուի
նկատմամբ հարաբերություն (երկու անգամ ավելի դանդաղ լինելու դեպքում ստացվում է ամբողջ կեսը), իսկ
մյուս կեսը՝ շարժական պատուհանի սխալների մակարդակից։ Այս բաղադրիչը կիրառվում է միայն այն դեպքում,
երբ երկու թեկնածուներն էլ ունեն առնվազն 3 նմուշ, ուստի նոր հաշիվները չեն տուգանվում, իսկ դրա
առավելագույնը մնում է quota-blocked և quota-exhausted տուգանքներից ցածր։ Այն իր սեփական circuit-ը
չի ավելացնում․ ձախողվող հաշիվները դեռ մշակվում են cooldown, lockout և breaker շերտերի կողմից։
Այն սահմանեք `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` միջոցով։

**Reasoning frame-երը վերագործարկում են content-stall բյուջեն։** Reasoning model-ը կարող է րոպեներ
մտածել մինչև իր առաջին տեսանելի token-ը․ Claude-ը stream է անում `thinking_delta` frame-եր, որոնց
thinking տեքստը կարող է դատարկ լինել, իսկ Responses API-ն stream է անում reasoning item-երը՝ մեկը
մյուսի հետևից։ `isReasoningProgressFrame()`-ը (`open-sse/utils/streamReadiness.ts`) ճանաչում է
այս frame-երը, և watchdog-ը յուրաքանչյուրի դեպքում վերագործարկում է իր բյուջեն՝ turn-ը չեղարկելու
փոխարեն։ Դրանք դեռ model output չեն, ուստի միայն reasoning-ով ավարտվող turn-ը դեռ հաղորդվում է
որպես դատարկ, իսկ reasoning-ը դադարեցնող և միայն heartbeat-եր ուղարկող turn-ը դեռ գործարկում է
watchdog-ը։

Kiro-ի երկուական `reasoningContentEvent` frame-երը, որոնք ունեն ոչ դատարկ signature, executor-ի
միջոցով պահպանում են այս reasoning ակտիվությունը՝ որպես դատարկ `reasoning_content` delta։
Signature-ը չի փոխանցվում։ Metadata-ն, incomplete frame-երը և դատարկ signature-ները չեն
վերագործարկում content budget-ը․ անկախ active-stream timeout-ը և client cancellation-ը դեռ
կիրառվում են (`open-sse/executors/kiro/reasoning.ts`)։

**Terminal վիճակներ (ՈՉ cooldown-ներ)՝**

- `banned` — սահմանվում է banned-keyword / account-ban հայտնաբերման միջոցով (տես
  [BAN_DETECTION](../security/BAN_DETECTION.md))։ Upstream-ի յուրաքանչյուր հարցման մերժումները
  (`request_rejected`, օրինակ՝ Anthropic OAuth 403 "Request not allowed") երբեք չեն սահմանում այն․
  դրանք հաշվվում են ըստ կապի և model-ի և այդ model-ը հանում են rotation-ից՝ աճող cooldown-ով, որը
  սահմանափակված է `REQUEST_REJECTED_MAX_COOLDOWN_MS`-ով (1 h), կամ cooldown-ի մեջ են դնում կապը,
  երբ որևէ model հայտնի չէ — `open-sse/services/requestRejectedStreak.ts`
- `expired` (սահմանափակված կրկնափորձերից հետո անցնում է terminal վիճակի՝ էքսպոնենցիալ backoff-ով —
  `EXPIRED_RETRY_MAX = 3`, որպեսզի անցողիկ OAuth սխալները կարողանան ինքնուրույն վերականգնվել,
  նախքան հաշվի մշտական ապաակտիվացումը)
- `credits_exhausted`

Դրանք պահպանվում են այնքան ժամանակ, մինչև հավատարմագրերը փոխվեն կամ օպերատորը վերակայի դրանք։ Մի փոխարինեք տերմինալային վիճակները անցողիկ cooldown վիճակով։

**Ծույլ վերականգնում․** երբ `rateLimitedUntil`-ի ժամկետն անցել է, կապը կրկին դառնում է հասանելի։ Հաջող օգտագործման դեպքում `clearAccountError()`-ը մաքրում է սխալի բոլոր դաշտերը։

### Claude OAuth-ի օգտագործման սահմանաչափի պատ․ ցածր առաջնահերթության գոտի + սեսիայի սահմանաչափի վերակայում

**Շրջանակը․** մեկ Claude բաժանորդագրության (OAuth) կապ։ Երկու հնարավորություններն էլ **ընտրովի են՝ ըստ կապի** (Edit connection → Claude բաժին → `lowPriorityMode` / `autoLimitReset` `providerSpecificData`-ում, երկուսն էլ լռելյայն անջատված են) և կրկնօրինակում են Claude Code-ի `/low-priority` և `/limit-reset` հրամանները (wire contract-ը վերցված է Claude Code 2.1.263-ից)։

**Իրականացումը․**

- Վիճակների մեքենա + պատասխանների դասակարգում․ `open-sse/services/claudeLowPriority.ts`
- Վերակայման կարգավիճակի/claim-ի հաճախորդ․ `open-sse/services/claudeLimitReset.ts`
- Կատարողի hook (վերնագրի ներարկում + նույն հաշվով կրկնափորձ)․ `open-sse/executors/base.ts::execute()`
- Ընտրովի պահպանություն․ `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Գործարկիչը․** 5-ժամյա օգտագործման պատը՝ `429`, որի վերնագրերը պարունակում են
`anthropic-ratelimit-unified-status: rejected` և, երբ հաշիվը հասանելի է,
`anthropic-ratelimit-unified-slow-offer: treatment`։ Այդ առաջին պատային
429-ից առաջ ոչինչ չի ուղարկվում․ unified վերնագրեր չունեցող burst 429-ն անցնում է սովորական cooldown ուղով։

**Ցածր առաջնահերթության գոտի** (`lowPriorityMode`)․

- Պատային 429-ի դեպքում կատարողը ընդունում է առաջարկը և անմիջապես կրկին փորձում է նույն
  հաշիվը՝ `anthropic-usage-limit: slow` վերնագրով․ գոտին մնում է ակտիվ մինչև հայտարարված
  `anthropic-ratelimit-unified-reset`-ը (+60 վրկ. արտոնյալ ժամանակ), և այդ պատուհանի
  ընթացքում յուրաքանչյուր հարցում կրում է այդ վերնագիրը։ Intercept արված 429-ը երբեք չի հասնում
  `handleChatCore`-ին, ուստի կապը **չի դրվում cooldown-ի մեջ և չի փոխարինվում**։
- Հետագա պատասխաններում `anthropic-ratelimit-unified-slow-status`-ի `active` /
  `not_needed` արժեքները պահպանում են գոտին․ `slot_busy` (429) կամ `529` ստանալու դեպքում
  սպասվում է սերվերի `anthropic-ratelimit-unified-slow-retry-after` արժեքը (լռելյայն՝ 20 վրկ.,
  սահմանափակումը՝ 5–600 վրկ., ±30% պատահական շեղում) և կատարվում է կրկնափորձ՝
  սահմանափակված `anthropic-ratelimit-unified-slow-max-wait`-ով (լռելյայն՝ 20 րոպե,
  սահմանափակումը՝ 1 րոպե–6 ժամ)․ այդ ժամկետն անցնելուց հետո գոտին ավարտվում է, և
  10 րոպեանոց cool-off-ը արգելափակում է կրկին ընդունումը։ Սպասումը լրացուցիչ
  սահմանափակվում է հարցման սեփական upstream-start timeout-ից մնացած ժամանակով
  (`resolveFetchStartTimeout`, լռելյայն՝ 10 րոպե)՝ հանած 5 վայրկյանը․ առանց այդ
  սահմանափակման 20 րոպեանոց լռելյայն max-wait-ը կգերազանցեր հարցման տևողությունը, և
  քունը կընդհատվեր սպասման ընթացքում՝ առաջացնելով `TimeoutError`, փոխարենը graceful
  `max_wait` ավարտի + cool-off-ի։
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible` վիճակները, 5-ժամյա պատուհանի
  շրջադարձը կամ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`
  (որը ցանկացած կարգավիճակի դեպքում ավարտում է այն որպես `extra_usage`, քանի որ վճարովի
  overage-ն այժմ ծածկում է պատը) ավարտում են գոտին․ այնուհետև պատասխանը անցնում է
  սովորական cooldown ուղով։ `budget_exhausted`-ը հիշվում է մինչև հայտարարված բյուջեի
  վերակայումը (առավելագույնը՝ 8 օր)։
- Պատի ստուգումն իրականացվում է կատարողի սեփական 400-ով պայմանավորված նույն փորձի
  ներսում կրկնափորձերից հետո (կոնտեքստի խմբագրում, thinking/effort սահմանափակումներ,
  պարամետրերի ավտոմատ ուսուցում), ուստի այդ կրկնափորձերից մեկի ժամանակ միայն հայտնված
  պատային 429-ը նույնպես intercept է արվում՝ cooldown ուղուն հասնելու փոխարեն։
- Վիճակը պահվում է հիշողության մեջ՝ ըստ կապի (վերագործարկումը պահանջում է պատային ևս մեկ
  429՝ կրկին ընդունելու համար)։

**Սեսիայի սահմանաչափի վերակայում** (`autoLimitReset`, երբ երկուսն էլ միացված են՝ փորձվում է գոտուց առաջ)․

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  բլոկ․ երբ `arm: "reset"` և `available: true` են,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`՝
  `{ "program": "juniper_tide" }` մարմնով (կազմակերպության UUID-ը՝
  `providerSpecificData.organizationUUID`-ից, bootstrap fallback-ով)։
- `result: reset|not_limited` → հարցումը կրկին փորձվում է ամբողջ արագությամբ (առանց slow
  վերնագրի)։ `already_used` / `not_offered` արժեքները memoise են անում
  `next_available_at`-ը (լռելյայն՝ մեկ շաբաթ)․ ցանկացած ձախողում առաջացնում է 15 րոպեանոց
  backoff։ Վերակայումը կատարվում է շաբաթական մեկ անգամ և դեռ հաշվվում է շաբաթական
  սահմանաչափի մեջ։

Ռեգրեսիայի պաշտպանիչ ստուգումներ․ `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Սեսիայի կցում (#7274)

**Շրջանակը․** մեկ client session (`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session` header), որը կապվում է մեկ կապի հետ՝ **ցանկացած** մատակարարի համար։

**Նպատակը․** բազմափուլ գործակալին (Claude Code, aider, custom agents) հարցումների միջև
պահել նույն հաշվին՝ նվազեցնելով հաշիվների միջև կոնտեքստի կորուստը և յուրաքանչյուր հաշվի
սեսիայի վիճակ ունեցող մատակարարների մոտ կրկնվող cold-start 429-ները։

**Իրականացումը․**

- TTL-ի որոշում․ `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Կապի ընտրություն/ստեղծում․ `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Վերնագրի հանում (ընդհանուր, ցանկացած մատակարարի համար)․ `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Պահպանվող կապումների աղյուսակ․ `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Կարգավորում․ `sessionAffinityTtlMs` (գլոբալ TTL-ը մվ-ով, `0`-ը անջատում է) —
  `src/lib/db/settings.ts`։ Վերանվանվել է Codex-ին հատուկ `codexSessionAffinityTtlMs`-ից
  `124_generic_session_affinity_ttl.sql` միգրացիայի միջոցով, որը նախկինում կազմաձևված
  Codex TTL-ը փոխանցում է որպես նոր լռելյայն արժեք։

#7274-ից առաջ `resolveSessionAffinityTtlMs()`-ը բոլոր մատակարարների համար, բացի
`codex`-ից, անմիջապես վերադարձնում էր `0`, ուստի TTL-ի կարգավորումը (և սեսիայի
վերնագրերը) ոչ մի այլ տեղում ազդեցություն չունեին, թեև կապման մեխանիզմը և վերնագրերի
հանումն արդեն մատակարարից անկախ էին։ Ուղղումը հեռացրեց այդ վաղ վերադարձը․ TTL-ն այժմ
միատեսակ կիրառվում է բոլոր մատակարարների նկատմամբ, երբ այն գլոբալ սահմանված է `0`-ից
բարձր արժեքով։

Սեսիայի կցման երեք վերնագրերը երբեք չեն փոխանցվում upstream-ին․ կատարողները զրոյից են
կառուցում իրենց upstream վերնագրերը՝ client-ի վերնագրերը ուղիղ փոխանցելու փոխարեն, ուստի
սա մնում է միայն ներքին correlation id։

### Կառավարվող սեսիայի կապերի բացառիկ վարձակալություններ

**Շրջանակ:** մեկ ակտիվ կառավարվող HTTP client/session պատկանում է մեկ իրավասու OmniRoute կապի։

**Նպատակ:** ապահովել կապի բացառիկ սեփականության կայուն պահպանում այն client-ների համար, որոնց անհրաժեշտ է հարցումների միջև կոշտ երթուղավորման սահմանափակում։ Սա տարբերվում է session affinity-ից, որը փափուկ շարունակականության նախընտրություն է․ բացառիկ lease-ը պահպանում է lifecycle-ի վիճակը SQLite-ում, պարտադրում է ակտիվ սեփականատիրոջ և ակտիվ կապի գլոբալ եզակիությունը և provider-ի dispatch-ից առաջ մերժում է հնացած սերունդը։

Հնարավորությունը միացվում է API key-ի համար առանձին։ Կառավարվող key-ը պետք է ունենա `lease:exclusive` scope և հստակ, ոչ դատարկ `allowedConnections` ցուցակ։ Ցանկացած HTTP client կարող է օգտագործել lifecycle endpoint-ը․ client-ի անուն, user-agent, provider, OAuth մեթոդ կամ model չի պահանջվում։ Lease-ը պատկանում է կապի, ոչ թե model-ի, ուստի model-ի փոփոխությունը պահպանում է կապումը, քանի դեռ կապը շարունակում է սովորական կարգով իրավասու մնալ։ Model-ի, quota-ի, health-ի, cooldown-ի և allowlist-ի սովորական կանոնները շարունակում են գերակա լինել և կարող են նույն սերունդը տեղափոխել մեկ այլ ազատ, իրավասու կապի։

Lifecycle-ը `POST /api/v1/session-leases` է՝ `acquire`, `renew` և `release` JSON գործողություններով։ Կառավարվող inference հարցումները ներկայացնում են անթափանց `X-OmniRoute-Lease-Owner` արժեքը և ճշգրիտ `X-OmniRoute-Lease-Generation` արժեքը։ Owner-ը կազմված է `vlo_` նախածանցից և 43 base64url նիշից․ պահվում է միայն դրա SHA-256 hash-ը։ Յուրաքանչյուր վերջնական dispatch սահմանափակում նաև կապում է authenticated API key ID-ն և ակտիվ կապի ID-ն։ Lease-ի վերահսկման header-ները հեռացվում են log-երից, պահպանված request snapshot-ներից և upstream executor-ի header-ներից։

Եթե սովորական երթուղավորումն ունի իրավասու կառավարվող թեկնածուներ, սակայն յուրաքանչյուր ազատ թեկնածու զբաղված է օտար ակտիվ lease-ով, OmniRoute-ը վերադարձնում է HTTP `429`, lease-capacity-unavailable կոդ, հզորության սպասման վիճակ և սահմանափակված `Retry-After`, որը հաշվարկվում է ամենավաղ համապատասխան expiration-ից։ Սովորական դատարկ իրավասությունը lease-ի մրցակցություն չէ և պահպանում է երթուղավորման սխալների իր առկա իմաստաբանությունը։

Փոխկապակցված մեխանիզմները շարունակում են առանձին մնալ․

- OAuth session occupancy-ը OAuth հաշիվների համար գործընթացային փափուկ բաշխում է։
- Account semaphore-ները տրամադրում են հարցումների զուգահեռության թույլտվություններ և ավարտվում են հարցման ավարտին։
- Բացառիկ կառավարվող session lease-երը lifecycle-ի կայուն սեփականություն են՝ սերնդի սահմանափակմամբ։

## 3. Մոդելի արգելափակում

**Շրջանակ՝** provider + connection + model եռյակ։

**Կարգավիճակով որոշվող շրջանակը՝** ձախողված կարգավիճակն է որոշում, թե որ բանալիում է արգելափակումը գրվում
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`)։

- `429` / `403` / `402` — քվոտայի կամ իրավասության ազդանշան — արգելափակվում է **քվոտայի ընտանիքը**՝
  codex-ի դեպքում ամբողջ `codex` / `spark` շրջանակը (connection-ի յուրաքանչյուր `gpt-5*` մոդելը),
  իսկ այլ provider-ների դեպքում՝ `getQuotaScopedModelForProvider()`-ը։
- `404`-ը արգելափակում է հիմնական մոդելը (`getModelLockKey()`-ը նեղացնում է `not_found`-ը)։
- Ցանկացած այլ կարգավիճակ՝ `5xx` տրանսպորտային/սերվերի խափանումները և OmniRoute-ի՝ որակի վավերացման արդյունքում
  ստեղծված `502`-ը, արգելափակում են միայն provider/connection/model **ճշգրիտ** tuple-ը։ Մեկ մոդելի
  խափանված հոսքը հաշվի քվոտայի մասին ապացույց չէ․ այս կանոնից առաջ `codex/gpt-5.6-luna`-ի մեկ դատարկ
  պատասխանը այդ connection-ի յուրաքանչյուր `gpt-5*` մոդել հեռացնում էր երթուղավորումից 2–30 րոպեով
  (աստիճանաբար երկարացնելով), մինչդեռ դրա քվոտան չէր փոխվում։
- Կանչողի բացահայտ `scope` տարբերակը միշտ առաջնահերթ է (`Antigravity`-ն փոխանցում է `"exact"`)։

**Նպատակ՝** խուսափել ամբողջ connection-ն անջատելուց, երբ միայն մեկ մոդել է անհասանելի կամ քվոտայով սահմանափակված։

**Օրինակներ՝**

- Մեկ մոդելի քվոտայով provider-ներ, որոնք վերադարձնում են 429
- Local provider-ներ, որոնք մեկ բացակայող մոդելի համար վերադարձնում են 404
- Provider-ին հատուկ mode/model իրավասության խափանումներ (օրինակ՝ Grok mode-ներ)

**Իրականացում՝** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`։

### Մոդելի սառեցումների վահանակ (v3.8.0)

UI՝ Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ցուցադրում է ակտիվ արգելափակումները՝ provider-ը, connection-ը, model-ը, պատճառը, expiresAt-ը։ Օպերատորները քարտից կարող են ձեռքով կրկին միացնել մոդելը։

**REST API՝**

- `GET /api/resilience/model-cooldowns` — ակտիվ արգելափակումների ցանկ
- `DELETE /api/resilience/model-cooldowns` — ձեռքով կրկին միացում։ Մարմին՝ `{provider, connection, model}`։ Auth՝ management։

### Սառեցումների կառավարիչ

UI՝ Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)։

Մեկ էջ՝ յուրաքանչյուր connection-ի համար, որը ժամանակավոր պատճառով դուրս է երթուղավորումից, այլ ոչ թե յուրաքանչյուր provider-ի էջը բացելու անհրաժեշտություն։ Այն ցուցադրում է connection-ի սառեցումները, մոդելի արգելափակումները և վերջնական վիճակները, մաքրում է դրանք ըստ connection-ի, ընտրվածների համար կամ provider-ի բոլոր connection-ների համար, և խմբագրում է առավել հաճախ կարգավորվող սառեցման կանոնները՝ `streamStallCooldown.enabled` և OAuth / API-key `connectionCooldown`-ի հիմնական սառեցումն ու backoff-ի առավելագույն քայլերի քանակը (պահպանվում է `PATCH /api/resilience`-ի միջոցով)։ Վերջնական վիճակները (`banned`, `expired`, `credits_exhausted`) ցուցադրվում են, սակայն այստեղ երբեք չեն մաքրվում։

Նույն էջի **Սխալների սառեցման կանոններ** քարտը `PATCH /api/settings`-ի միջոցով խմբագրում է օպերատորի սխալի կանոնները (`settings.providerErrorRules`) և յուրաքանչյուր provider-ի համար ընդհանուր կիրառվող լռելյայնները (`settings.providerErrorDefaults`) — դրանց համապատասխանեցման եղանակը տես §7-ի «Օպերատորի կողմից հայտարարված կանոններ» բաժնում։ Տևողություններն են՝ Default (բացահայտ սառեցում չկա), 30 րոպե, 1 ժամ, 5 ժամ, 24 ժամ կամ 1–43,200 րոպեի (30 օր) սահմաններում ընտրված արժեք։

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth՝ management)՝

- `GET /api/resilience/cooldowns[?provider=]` — կարգավիճակով, մնացած սառեցման ժամանակով, backoff-ի մակարդակով, վերջին սխալի տեսակով և մոդելի արգելափակումներով connection-ներ (առանց credential-ների)
- `POST /api/resilience/cooldowns` — մարմին՝ `{connectionIds: string[]}` կամ `{all: true, provider?}`․ վերադարձնում է `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Արգելափակման կարգավորումների UI + հաջողության նվազման վերականգնում (v3.8.23)

Մոդելի արգելափակումը միշտ միացված, կոշտ կոդավորված վարքագծից վերածվել է ամբողջությամբ կարգավորվող, ըստ ցանկության միացվող հնարավորության՝ իր սեփական կարգավորումների քարտով և ինքնավերականգնվող վերականգնման ուղով։

**Կարգավորումների քարտ՝** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)։
Սա **տարբերվում է** վերևում նշված միայն կարդալու `ModelCooldownsCard`-ից (որը պարզապես
_ցուցադրում է_ ակտիվ արգելափակումները) — նոր քարտը _կարգավորում է պարամետրերը_։ Լռելյայն արժեքները գտնվում են `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ում
(`src/lib/resilience/modelLockoutSettings.ts`)։

| Կարգավորում             | Լռելյայն արժեք                   | Նշանակություն                                                          |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `enabled`               | `false`                          | Գլխավոր միացում — մոդելի արգելափակումը **լռելյայն անջատված է**։        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-ի կարգավիճակներ, որոնք համարվում են մոդելի շրջանակի ձախողում։ |
| `baseCooldownMs`        | `120_000` (120 վրկ)              | Առաջին ձախողման սկզբնական արգելափակման տևողությունը։                   |
| `maxCooldownMs`         | `1_800_000` (30 րոպե)            | Երկարացված սառեցման առավելագույն սահմանը։                              |
| `maxBackoffSteps`       | `10`                             | Էքսպոնենցիալ backoff-ի առավելագույն ընդլայնման քայլերը։                |
| `useExponentialBackoff` | `true`                           | Արդյոք կրկնվող ձախողումները պետք է էքսպոնենցիալ մեծացնեն սառեցումը։    |

Կարգավորումները պահպանվում են սովորական կարգավորումների պահոցում և վավերացվում են resilience-ի կարգավորումների սխեմայի միջոցով․ քարտը սահմանափակում է `baseCooldownMs`/`maxCooldownMs` արժեքները
(`maxCooldownMs ≥ baseCooldownMs`) և `maxBackoffSteps`-ը։

**Հաջողության նվազման վերականգնում՝** վերականգնումը **միայն** ժմչփի ավարտմամբ չի կատարվում։ Առողջ
պատասխանը նվազեցնում է մոդելի ձախողումների հաշվիչը, որպեսզի վերականգնված մոդելը
միջակայքի ընթացքում դադարի աստիճանաբար երկարացնել սառեցումը (և մաքրվի)՝ նախքան իր ժամաչափի ավարտը։ Հաջող combo target-ի դեպքում `open-sse/services/combo.ts`-ը կանչում է `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), որը պահված
`failureCount`-ը **կիսում է** (`Math.floor(failureCount / 2)`)․ երբ այն հասնում է `0`-ի, արգելափակման
գրառումն ամբողջությամբ ջնջվում է։ Դրան հակառակ `recordModelLockoutFailure()`-ը
ավելացնում է հաշվիչը (և մեծացնում է սառեցումը) ընդլայնման պատուհանի ընթացքում տեղի ունեցող ձախողումների դեպքում։ Հաջողության նվազումը լրացնում է սովորական ժամաչափի ավարտին — երկու ուղիներից ցանկացածը կարող է կրկին միացնել մոդելը։

**Վիճակ․** արգելափակումները պահվում են **հիշողության մեջ** (յուրաքանչյուր գործընթացի `Map`-երը՝ ըստ
`ModelLockoutEntry`-ի, որոնց բանալին է `provider:connectionId:model`, իսկ ճշգրիտ տիրույթի կողպեքների համար՝
`provider:connectionId:exact:model`), և չեն պահպանվում
DB-ում — վերագործարկման ժամանակ դրանք կորչում են։ _Կարգավորումները_ պահպանվում են, իսկ ակտիվ
արգելափակման _վիճակը_ ժամանակավոր է։

---

## 4. Քվոտայի համօգտագործման համաժամանակության կառավարում (v3.8.36)

Բաժանորդագրային հաշիվները (GLM, MiniMax և այլն) հաճախ ընդունում են միայն մոտավորապես 1–3 միաժամանակյա հարցումներ․ այդ սահմանը գերազանցելու դեպքում առաջանում են 429 սխալներ և սառեցման ժամանակահատվածներ։ Սա հատկապես սուր է **քվոտայի համօգտագործման** (`qtSd/…`) կոմբինացիաների դեպքում, երբ մի քանի API բանալիներ կիսում են մեկ upstream հաշիվ։ Երեք շերտ թույլ չեն տալիս, որ համօգտագործվող հաշիվը գերբեռնվի։

### Միացման համար միաժամանակության սահման (`max_concurrent`)

Յուրաքանչյուր մատակարարի միացում կարող է հայտարարել `max_concurrent` վերին սահմանը
(`provider_connections.max_concurrent`, որը սահմանվում է միացման մոդալ պատուհանում / API-ում / DB-ում)։
Այն դատարկ թողնելու դեպքում սահմանափակում չի կիրառվում։ Սա ստորև նկարագրված սերիականացման շերտը կառավարող միակ կարգավորումն է․ այն սահմանեք հաշվի իրական համաժամանակության արժեքին համապատասխան (օրինակ՝ GLM՝ մոտ 1, MiniMax՝ մոտ 2)։

### Մոդելների համար միաժամանակության սահմաններ (`modelConcurrency`)

Միացումը կարող է լրացուցիչ հայտարարել յուրաքանչյուր մոդելի համար ճշգրիտ միաժամանակության վերին սահմաններ՝ իր `rateLimitOverrides` քարտեզի ներսում․

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Սահմանեք այն միացման մոդալ պատուհանում (**Rate limit overrides → Per-model
concurrency caps**, յուրաքանչյուր տողում մեկ `model=cap`) կամ
`PATCH /api/providers/[id]` միջոցով՝ նույն JSON կառուցվածքով։ Բանալիների իմաստը՝

- **Միացման ամբողջական սահմանն ընդդեմ մոդելին հատուկ սահմանի․** `maxConcurrent`-ը շարունակում է մնալ միացման ամբողջական ընդհանուր սահմանը։ Երբ երկուսն էլ կիրառելի են, երկու սահմանափակումներն էլ ձեռք են բերվում ատոմիկորեն նույն կոմպոզիտային gate-ում
  (`global → provider → account → model`)․ գործնականում կիրառվում է ավելի խիստ համապատասխան սահմանը։
- **Մոդելի բանալու ճշգրիտ համընկնում․** բանալին այն մոդելի տողն է, որը երթուղավորման որոշումից հետո փոխանցվում է executor-ին․ սովորաբար upstream մոդելի պարզ ID-ն է (`glm-5`), ոչ թե հաճախորդային `provider/model` alias-ը (`zai/glm-5`-ը չի համընկնում `glm-5`-ին)։ Արժեքները միաժամանակյա հարցումների դրական ամբողջաթիվ սահմաններ են։
- **Տեղային հերթավորում, առանց հայտնաբերման․** ավելցուկային հարցումները տեղում հերթագրվում են՝ օգտագործելով առկա հերթի/ժամկետի իմաստաբանությունը (տիպավորված `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ընդունման սխալներ)։ OmniRoute-ը չի հայտնաբերում կամ եզրակացնում upstream քաղաքականությունը․ այն կիրառում է օպերատորի կողմից կազմաձևված ճշգրիտ սահմանները։ Հագեցած մոդելի gate-ը երբեք չի անջատում մատակարարին և երբեք չի ստեղծում մոդելի մշտական արգելափակում․ upstream 429/սառեցում/fallback վարքագիծը շարունակում է լինել սխալների պահուստային մեխանիզմը։
- **Միացման և գործընթացի շրջանակում․** սահմանները գործում են յուրաքանչյուր database միացման համար և պահվում են հիշողության մեջ, ուստի նույն upstream API բանալին կրկին օգտագործող երկու միացումները միմյանց հետ չեն համաձայնեցվում։
- **Չկազմաձևվածը նշանակում է՝ առանց փոփոխության․** քարտեզը բաց թողնելը (կամ dashboard-ի դաշտը դատարկ թողնելը) որևէ մոդելի gate չի ավելացնում։ Օրինակ՝ կազմաձևում առանց որևէ համընդհանուր մատակարարի սահման պնդելու՝

```text
glm-5=1
glm-4.7=3
```

### Քվոտայի համօգտագործման հարցումների սերիականացում

Երբ քվոտայի համօգտագործման dispatch-ը ուղղվում է դրական
`max_concurrent` հայտարարած միացման, այդ **հաշվին** ուղղված միաժամանակյա հարցումները սերիականացվում են յուրաքանչյուր միացման համար նախատեսված semaphore-ի միջոցով (բանալի՝ `qsconn:<connectionId>`)․ ավելցուկային հարցումները **սպասում են հերթում**, այլ ոչ թե հեղեղում հաշիվը։ Այն գործում է **fail-open** սկզբունքով․ գերբեռնված հերթը կամ timeout-ը շարունակվում է առանց slot-ի, այլ ոչ թե երբևէ մերժում dispatch-ի ենթակա հարցումը։ Կարգավորումը՝ **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, լռելյայն միացված)։ `max_concurrent` սահմանի բացակայության դեպքում վարքագիծը չի փոխվում։

> Քվոտայի համօգտագործման երթուղավորման gate-ը (`selectQuotaShareTarget`, DRR + P2C) ինքնին
> գործում է fail-open սկզբունքով և միայն _նվազեցնում է առաջնահերթությունը_ սահմանին հասած միացման համար։ Միամիացման pool-ի դեպքում այն չի կարող կոշտ սահմանափակել, ուստի հենց այս semaphore-ն է իրականում զսպում հեղեղումը։

### Կոմբինացիաների՝ սառեցմանը համապատասխանող կրկնափորձ

Յուրաքանչյուր կոմբինացիայի ռազմավարության համար (երբ միացված է), եթե հարցումը SHORT transient սառեցման կարճ ժամանակահատվածի պատճառով կհանգեցներ 429-ի, այն սպասում է մինչև այդ ժամանակահատվածի ավարտը և կրկին dispatch է արվում՝ 429-ը վերադարձնելու փոխարեն։ Սա ներառում է Gemini դասի TPM/RPM պատուհանները (~60 վրկ retry-after) բազմամոդել կոմբինացիաների դեպքում, օրինակ՝ երբ 2 մոդելից բաղկացած կոմբինացիայի երկու թիրախներն էլ հասնում են յուրաքանչյուր մոդելի rate limit-ին։ Սահմանափակվում է `comboCooldownWait`-ով (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`)՝ **Settings → Resilience** բաժնում։ Այն երբեք չի սպասում `quota_exhausted`-ի (մինչև կեսգիշեր կողպված) կամ auth/not-found պատճառների դեպքում։

Կոմբինացիան կարող է հրաժարվել այս վարքագծից՝ `config.comboCooldownWaitEnabled: false` միջոցով։ Միայն բառացի `false`-ն է անջատում կոմբինացիաների այս ընդհանուր սպասումները (dispatch-ից հետո սառեցում և dispatch-ից առաջ circuit-open/model-lock սպասումներ) և դրանց սպասման բյուջեի timeout-floor ընդլայնումը։ Բացակայող կամ `true` արժեքը պահպանում է գլոբալ քաղաքականությունը․ `true`-ն չի կարող գլոբալ անջատված սպասումը միացնել։ Հստակ `targetTimeoutMs` արժեքը շարունակում է ունենալ առաջնահերթություն։ Այս opt-out-ը չի փոխում native-Codex turn-pin-ի առանձին dispatch-ից առաջ սպասումը։

Նույն gate-ը ներառում է dispatch-ից առաջ եղած դեպքը (#16319)․ երբ կոմբինացիայի յուրաքանչյուր թիրախ բաց է թողնվում՝ նախքան որևէ փորձ կատարելը, քանի որ դրա մոդելը գտնվում է կարճ transient lockout-ում, զրոյական փորձերի ուղին սպասում է lockout-ի ավարտին՝ նույն սահմանների ներքո, և կրկին dispatch է անում՝ առանց հուշումներից զուրկ
`503 ALL_TARGETS_SKIPPED` պատասխանելու։ Երբ սպասում թույլատրված չէ (սահմանը, փորձերի քանակը կամ բյուջեն սպառված է, կամ գործառույթն անջատված է), վերջնական պատասխանը վերափոխվում է
`429 rate_limit_error`-ի՝ փոխանցելով ամենավաղ transient lock-ի ժամկետանցման արժեքից ստացված
`retry_after` / `reset_at`-ը։ quota, auth և not-found lock-երը պահպանում են հուշումներից զուրկ 503-ը։

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

## 5. Հարցումների հերթի ընդունման կառավարում (v3.8.49 · issue #6593)

**Շրջանակ**. լոկալ per-provider+connection rate-limit հերթը (`open-sse/services/rateLimitManager.ts`,
հիմնված Bottleneck-ի վրա), վերը նշված երեք մեխանիզմներից մեկ շերտ ներքև։

**`maxWaitMs`-ը սահմանափակում է հերթի սպասումը. `executionMaxWaitMs`-ը՝ կատարմանը։**
Այս երկուսը դիտավորյալ առանձին են, և ոչ մեկը մյուսին չի սնուցում։

`resilienceSettings.requestQueue.maxWaitMs`-ը **հերթի սպասման բյուջեն** է. այն
ծածկում է մատակարարի սլոտի սպասումը և հետո QUEUED վիճակում մնալը, և դրա
ժամաչափը մաքրվում է հենց այն պահին, երբ job-ը լքում է QUEUED վիճակը և սկսում
կատարվել (`rateLimitManager.ts`, `wrappedFn`)։ Այն գերազանցող հարցումը երբեք
չի հասնում upstream-ին։ Լռելյայն 30000ms, տրամադրվում է
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`-ի կողմից `src/lib/resilience/settings.ts`-ում
և ամրագրված է
`tests/unit/ratelimit-admission-control-6593.test.ts`-ով, այնպես որ դրա փոփոխությունը
կդարձնի այդ թեստը կարմիր՝ այն փոխարեն, որ լուռ թողնի այս պարբերությունը հնացած։

`resilienceSettings.requestQueue.executionMaxWaitMs`-ը այն է, ինչ Bottleneck-ը
ստանում է որպես job-ի `expiration`, որի ժամաչափը մեկնարկում է միայն dispatch-ից
հետո։ Դա եզրափակիչ ապահովագրական սահմանափակում է այն կատարողների համար, որոնք
չունեն իրենց սեփական upstream timeout-ը, և այն բարձրացվում է մինչև կատարողի
սեփական fetch-մեկնարկի timeout-ը, երբ վերջինս ավելի երկար է, այնպես որ այն չի
կարող կտրել առողջ in-flight պատասխանը։ Լռելյայն 600000ms (10 րոպե)։

Հերթի բյուջեն `expiration`-ին փոխանցելն է հենց այն, ինչ նախկինում կիսատ էր
սպանում ոչ ինկրեմենտալ gateway-ները. դրանք օրինականորեն աշխատում են րոպեներ
շարունակ մինչև առաջին բայթերը, և սա է պատճառը, որ expiration-ը երևում է որպես
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), մինչ հերթի բյուջեն կրում է
հերթի-timeout կոդը։ Դրանցից յուրաքանչյուրը վերասահմանեք
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) փոփոխականների կամ
վահանակի միջոցով (**Կարգավորումներ → Դիմացկունություն**)։ Երկուսն էլ նորմալացման
ժամանակ սեղմվում են 1ms–24h միջակայքի մեջ։

**Գերակայությունը երկուսի համար էլ.** env փոփոխականը միայն _լռելյայն_ արժեք է
տրամադրում։ `resilienceSettings.requestQueue`-ում պահպանված արժեքը (վահանակ /
API patch, պահվում է `key_value`-ում) գերակշռում է դրան, իսկ per-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs`-ը գերակշռում է վերջինիս։
Ուստի env փոփոխականը սահմանելը այն տեղակայման վրա, որն արդեն ունի պահպանված
արժեք, ոչինչ չի փոխում. փոխարենը մաքրեք կամ թարմացրեք պահպանված կարգավորումը։

Հերթում մնալը սահմանափակված է `maxWaitMs`-ով. ստորև նկարագրված `maxQueueDepth`-ը
սահմանափակում է, թե քանի կանչող կարող է միաժամանակ հերթում գտնվել։

**Պատասխանի մարմնում նշված կրկնփորձեր. տեմպակարգավորումը ընդդեմ կողպման։**
429 պատասխանի մարմինը կարող է նշել իր սեփական սպասումը (Gemini
`RetryInfo.retryDelay`, "retry after Ns" տեքստ), որը կարդում է
`updateFromResponseBody`-ն։ Կապի `maxWaitMs`-ի մեջ տեղավորվող սպասումը
տեմպակարգավորում է. լիմիտերը այդքան ժամանակով դատարկում է իր պահուստը, և
հերթում գտնվող կանչերը dispatch են արվում, երբ այն կրկին լրանա։
`maxWaitMs`-ից երկար սպասումը այն բանը չէ, որը հերթը կարող է նստած սպասել.
Gemini-ն սպառված օրական քվոտային պատասխանում է `retryDelay: "86399s"`-ով։
Վերակառուցված 429-ի վրա փոխանցված `Retry-After`-ը (#16528) արդեն ստիպում է
fallback շարժիչին կողպել մոդելը այդ պատուհանի համար, բայց լիմիտերը դրա համար էլ
դադարեցնելը դեռ կկանգնեցներ ցանկացած կանչ, որը բանալուն հասնում է վաղ
(օրինակ, դիմացկունության զրոյացումից հետո), ամբողջ `maxWaitMs` ժամանակով։ Երբ նման
սպասումը գալիս է տիպավորված Google `RetryInfo` մանրամասնությունից
(`google_rpc_retry_info` ծագումնաբանությունը) և բանալու լիմիտերն արդեն
սահմանափակված է մոդելով (տես `getLimiterKey`), 429-ը դրա փոխարեն դառնում է
մոդելի կողպում այդ կապի վրա (`lockModelForLongBodyRetry`
`open-sse/services/rateLimitManager/bodyRetryPause.ts`-ում, առավելագույնը 24 ժամ),
և լիմիտերը մնում է չդադարեցված։ Հաշվի ընտրությունը բաց է թողնում այդ
կողպումը `isModelLocked()`-ի միջոցով, և նույնն անում է նաև combo նախա-dispatch
դարպասը կապին ամրացված թիրախների համար։ Antigravity-ի վրա, որի լիմիտերը ըստ
քվոտայի ընտանիքի է, կողպումը ճշգրիտ մոդելի վրա է, ինչպես նրա մյուս քվոտայի
կողպումները։ Հաճախորդի խնդրած անունը նույնպես կողպվում է, երբ alias-ը լուծել է
այն այդ մոդելի, քանի որ այդ ստուգումները օգտագործում են խնդրած անունը. այն
կողպվում է ճշգրտորեն (`lockExactModel`), այնպես որ alias-ը, որը հատում է
antigravity քվոտայի ընտանիք կամ codex տիրույթ, երբեք չի կողպում իր սեփականը։
Արձակ ակնարկը, չտիպավորված `retryDelay`-ը կամ ամբողջ կապի կիսած լիմիտերը
պահպանում են դադարը։ Երբ լիմիտերը, որը 429 ուղին հենց նոր վերակառուցեց,
իսկապես դադարում է, կանչողը, որի հերթի մնացած ժամանակն ավարտվում է դադարից
առաջ, անմիջապես մերժվում է հերթի-timeout կոդով (`checkLimiterPause`)՝ այն
փոխարեն, որ սպասի այդ ժամանակի լրանալուն. գրանցված ավարտը ամրացվում է նախքան
լիմիտերի կառուցումը, որտեղ Bottleneck-ը մեկնարկում է իր թարմացման ժամացույցը,
և պահուստի ցանկացած հետագա փոփոխություն մոռանում է այն։ Ծածկված է
`tests/unit/rate-limit-long-body-retry-lockout.test.ts`-ով և
`tests/unit/rate-limit-body-retry-pause.test.ts`-ով։

**`maxQueueDepth` — opt-in ընդունման սահման (նոր)։**
`resilienceSettings.requestQueue.maxQueueDepth`-ը սահմանափակում է, թե քանի
հարցում կարող է միաժամանակ հերթում մնալ (դեռ չdispatch-ված) մեկ
provider+connection-ի համար։ Երբ հերթն արդեն պարունակում է `maxQueueDepth`
հարցում, նոր հարցումը արագ մերժվում է տիպավորված `code: "RATE_LIMIT_QUEUE_FULL"`
սխալով **նախքան** `limiter.schedule()`-ին հասնելը, այնպես որ մերժումը էժան է
և տեղի է ունենում այդ հարցման համար նախատեսված ցանկացած downstream
prompt-սեղմման / թարգմանության աշխատանքից առաջ։ Լռելյայն `0` = անջատված,
պահպանելով գոյություն ունեցող անսահմանափակ հերթի վարքագիծը. սահմանափակված է
0–100000։ Վերասահմանեք `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) կամ
`resilienceSettings.requestQueue.maxQueueDepth` (վահանակ/API patch) միջոցով։

Ընդունման ստուգումն ինքը մաքուր ֆունկցիա է
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), այնպես
որ այն հնարավոր է միավոր-թեստավորել առանց իրական Bottleneck լիմիտերի։

> #6593-ը բացած RFC-ն նաև առաջարկել էր `bypassCompressionOnRateLimit`
> դրոշակ։ Այս պահոցի `open-sse/services/compression/` pipeline-ը
> ելքային LLM հարցման վրա prompt/context սեղմումն է (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` բլոկի մոտ),
> ոչ թե HTTP պատասխանի սեղմումը սինթեզված 429 մարմինների վրա — բառացի
> bypass դրոշակի համար համապատասխան կոդային ուղի գոյություն չունի։ Այդ
> prompt-սեղմման քայլը ներկայումս նաև կատարվում է հարցման pipeline-ում
> `withRateLimit()`-ից _առաջ_, ուստի հերթի լրացման պատճառով մերժման դեպքում
> այն բաց թողնելու համար վերադասավորումը առանձին, ավելի մեծ փոփոխություն է,
> քան այս issue-ի շրջանակը. այն դիտավորյալ **չի** իրականացվել այստեղ և
> թողնվել է որպես հետագա աշխատանք, եթե CPU-ի խնայողության օգուտը արժե
> վերադասավորման ռիսկին։

### Rate-Limit-ի ավտոմատ միացման անվտանգության ցանց և կապի պաշտպանություն (`rateLimitProtection`)

**Ավտոմատ միացման անվտանգության ցանց** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, լռելյայն `true`):
Լռելյայնորեն OmniRoute-ն ավտոմատ կերպով միացնում է rate-limit հերթի պաշտպանությունը բոլոր ակտիվ API-key պրովայդերների կապերի համար (`getProviderCategory(provider) === "apikey"`)։ Սա ապահովում է, որ rate-limit-ի նկատմամբ զգայուն upstream API բանալիներին ուղղված մուտքային հարցումները հերթագրվեն և սահմանափակվեն Bottleneck-ի միջոցով, այլ ոչ թե կտրուկ հոսքով հանգեցնեն upstream 429 սխալների։ Անվտանգության ցանցը կարող է վերասահմանվել `RATE_LIMIT_AUTO_ENABLE` միջավայրի փոփոխականի միջոցով (`false`/`0`/`off` անջատում է, `true`/`1`/`on` հարկադրաբար միացնում է), որը գերակշռում է dashboard-ում պահպանված կարգավորման նկատմամբ (**Կարգավորումներ → Դիմադրողականություն** / `PATCH /api/resilience`)։

**Յուրաքանչյուր կապի `rateLimitProtection`-ի սեմանտիկան.**
Յուրաքանչյուր կապի rate-limit պաշտպանությունը հետևվում է պրովայդերի կապերի `rateLimitProtection` բուլյան դաշտի միջոցով (պահպանվում է որպես `rate_limit_protection` SQLite-ում).

- **Հստակ միացված (`rateLimitProtection === true`)**: Rate-limit պաշտպանությունը հստակ միացված է այս կապի համար՝ անկախ պրովայդերի կատեգորիայից կամ այն հանգամանքից, թե արդյոք ավտոմատ միացման անվտանգության ցանցը միացված է։
- **Հստակ անջատված (`rateLimitProtection === false`)**: Անջատում է հստակ պաշտպանությունը, բայց **չի** դուրս բերում ակտիվ API-key կապը գլոբալ ավտոմատ միացման անվտանգության ցանցից։ `reconcileEnabledConnections`-ում (`open-sse/services/rateLimitManager.ts`) `false`-ը և `undefined`-ը համարժեք են. միայն `rateLimitProtection === true`-ն է դիտարկվում որպես հստակ վերասահմանում։ Եթե `rateLimitProtection`-ը `false` է (կամ սահմանված չէ), ակտիվ API-key կապը դեռևս համապատասխանում է ավտոմատ միացման պայմանին և մնում է rate-limit պաշտպանված։
- **Յուրաքանչյուր կապի opt-out չկա**: Օպերատորը ներկայումս չի կարող արտահայտել «այս մեկ ակտիվ API-key կապը պետք է աշխատի առանց rate-limit հերթի պաշտպանության», միաժամանակ պահպանելով ավտոմատ միացումն ակտիվ մյուսների համար։ API-key կապերը ամբողջությամբ առանց rate-limit հերթերի աշխատեցնելու համար անվտանգության ցանցը պետք է անջատվի գլոբալ կերպով (`RATE_LIMIT_AUTO_ENABLE=false` կամ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)։

**Աջակցվող գրառման ուղիներ.**

- **`POST /api/rate-limits`**: Կապի համար `rateLimitProtection`-ը փոխարկելու աջակցվող կառավարման գրառման ուղին (`{ connectionId: string, enabled: boolean }`)։ Սա `enabled: true`-ով կանչելը միացնում է հստակ պաշտպանությունը. `enabled: false`-ով կանչելը հեռացնում է հստակ պաշտպանությունը (թեև ակտիվ API-key կապերը մնում են գլոբալ անվտանգության ցանցի ծածկույթի տակ, եթե ավտոմատ միացումը միացված է)։
- **`PUT /api/providers/[id]`**: Դիտավորյալ **չի** ընդունում կամ փոխարկում `rateLimitProtection`-ը (#11278)։ Պրովայդերի կապի մետատվյալների թարմացումը `PUT /api/providers/[id]`-ի միջոցով երբեք չի փոխի պահպանված rate-limit պաշտպանության վիճակը։

---

## 6. Դանդաղ հոսքի թողունակության պահակ (#9709)

Ընտրովի `resilienceSettings.streamRecovery.throughputWatchdog` պահակը հայտնաբերում է հոսանքին հակառակ, որը դեռևս ուղարկում է կտորներ, բայց արտադրում է օգնականի ելք՝ կազմաձևված օգտակար արդյունքի արագությունից ցածր: Այն միտումնավոր տարբերվում է պարապ ժամանակի դադարից. սրտի զարկերը և մետատվյալները չեն վերակայում ոչ ժմչփը և չեն համարվում առաջընթաց: Այն նաև տարբերվում է ծանր փորձի վերջնաժամկետից (#9153), որը մնում է անվտանգության բացարձակ առաստաղ՝ անկախ արտադրանքի որակից:

Դիտորդը պահանջում է տաքացման շրջան, որին հաջորդում է ամբողջական պտտվող պատուհանը, նախքան այն կարող է ընդհատվել: Այն հաշվում է տեքստային դելտաները Զրույցի ավարտից և պատասխաններից API ելքային իրադարձություններից (պահպանողական UTF-8 բայթ վստահված անձ), անտեսում է միայն օգտագործման և դատարկ իրադարձությունները և դադարեցնում է դատողությունը, երբ գործիքային զանգի կամ պատճառաբանման իրադարձությունները թռիչքի ընթացքում են: Այն անջատված է լռելյայնորեն և կարող է միացված լինել `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ով (այդ env արժեքը ցույց է տալիս միայն լռելյայն — պահպանված `resilienceSettings.streamRecovery.throughputWatchdog.enabled` բուլյան հաղթում է. տե՛ս env-vs-dashboard-ի գերակայության նշումը այս ուղեցույցի վերևում); պատուհանը, տաքացումը, նվազագույն արագությունը և նվազագույն չափելի արդյունքը սահմանափակված են առաձգականության նորմալացման կարգավորումների շերտով:

Երբ միացված է, հսկիչ շան ընդհատումը կիրառվում է միայն վերին հոսքի ակտիվ փորձի համար: Նախքան հաճախորդի տեսանելի բայթերը, գոյություն ունեցող նույն հաշվի վաղ վերականգնման ուղին կարող է նորից բացել փորձը: Կատարելուց հետո հոսքը երբեք կուրորեն չի վերարտադրվում. միայն գոյություն ունեցող անվտանգ միջին հոսքի շարունակական պայմանագիրը կարող է կարել վերջածանց: Վերջնականացումը մնում է միանվագ, ուստի օգտագործման հաշվառումը և սեմաֆորի թողարկումը կրկնօրինակված չեն:

---

## 7. Վերևի հոսքի կարգավիճակի վերահաստատում (սխալ ներկայացված քվոտայի սխալներ)

**Շրջանակը․** մեկ վերևի հոսքի դարպաս, որը ժամանակավոր քվոտայի սպառումը հաղորդում է սխալ HTTP կարգավիճակով։

**Նպատակը․** ուղղել մոլորեցնող կարգավիճակը դասակարգումից ԱՌԱՋ, որպեսզի ներքևի հոսքի սպառողները (fallback engine-ը, combo aggregation-ը, հաճախորդին ուղղված պատասխանը) տեսնեն ձախողման իրական՝ կրկին փորձելու ենթակա բնույթը։

Որոշ դարպասներ ԺԱՄԱՆԱԿԱՎՈՐ քվոտայի սպառումն ազդանշանում են չկրկնվող HTTP
կարգավիճակով։ `agentrouter.org`-ը ստանդարտ `429`-ի փոխարեն վերադարձնում է `403`
(երբեմն՝ `400`)՝ չինարեն մարմնով
(`用户额度不足` / `额度不足`)։ Claude
Code-ի նման հաճախորդները `403`-ը համարում են մշտական սխալ և ընդհատում են սեսիան, իսկ առանց ուղղման
fallback engine-ը դա կդասակարգեր որպես `AUTH_ERROR`, ոչ թե որպես քվոտայի
իրադարձություն։

**Իրականացումը․**

- Ռեեստր + համադրիչ․ `open-sse/config/upstreamStatusRestatement.ts` — յուրաքանչյուր
  մատակարարի համար կանոնների ցանկ (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), որը համադրվում է `applyStatusRestatement()`-ի միջոցով։
- Կանչման կետը․ `open-sse/handlers/chatCore.ts`-ի
  `providerFailure:` բլոկը (մոտավորապես 3654-րդ տողում), անմիջապես այն բանից հետո, երբ
  `parseUpstreamError()`-ը վերլուծում է սխալ HTTP կարգավիճակով վերևի հոսքի
  պատասխանը (`!providerResponse.ok`), և նախքան որևէ դասակարգման գործարկվելը, որպեսզի
  բոլոր ներքևի հոսքի սպառողները տեսնեն ուղղված կարգավիճակը։ `200` SSE հոսքի ներսում
  ներառված սխալները անցնում են առանձին, ավելի ուշ հոսքի վերլուծության ուղով և
  այսօր **չեն** ընդգրկվում այս hook-ի կողմից — սա հայտնի սահմանափակում է, որը դեռ
  անհրաժեշտ չէ agentrouter-ի սխալ կարգավիճակի համար (այն ի հայտ է գալիս որպես
  սխալ HTTP կարգավիճակ)։
- Կրկնափորձի իրավունակությունը․ `429`-ը ներառված է
  `RETRY_AFTER_ELIGIBLE_STATUSES`-ում
  (`open-sse/services/combo/unavailableRetryGate.ts`), ուստի վերահաստատված սխալը
  ստանում է իրական կրկնափորձի ժամանակային պատուհան՝ որպես փակուղային `403`
  չներկայանալու փոխարեն։
- Սինթետիկ `60s` `defaultRetryAfterMs`-ը (`upstreamStatusRestatement.ts`)
  միայն այն արժեքն է, որը վերահաստատված պատասխանը հաղորդում է **հաճախորդին**․
  այն ինքնին կապի ներքին սառեցման/արգելափակման տևողությունը չէ — դա որոշվում է
  առանձին՝ այն մեխանիզմով, որն իրականում մշակում է վերահաստատված սխալը
  (Connection Cooldown-ի աստիճանաբար աճող backoff-ը, §2, API-key
  մատակարարների համար բազային `3s` արժեքով, կամ Model Lockout-ը, §3, ըստ մոդելի քվոտա
  ունեցող մատակարարների, օրինակ՝ agentrouter-ի համար)։ Router-ը կարող է ներքին
  կրկնափորձի համար իրավունակ դառնալ ավելի շուտ, քան հաճախորդին հայտարարված 60s
  պատուհանի ավարտը — սա դիտավորյալ պահուստային ժամանակ է, ոչ թե սխալ։

Մշտական սխալները (agentrouter-ի `无权访问模型` — այս մոդելին հասանելիություն չկա)
ԵՐԲԵՔ չեն վերահաստատվում․ `excludeMarkers`-ը արգելափակում է կանոնը նույնիսկ այն
դեպքում, երբ `textMarkers`-ը համընկնում է, ուստի սխալը պահպանում է իր սկզբնական
կարգավիճակը, և այն երբեք կրկին չի փորձարկվում։ Համապատասխան մատակարարի դասակարգման կանոնը
(`agentrouter-model-access-denied`-ը `open-sse/config/providerErrorRules.ts`-ում՝
`reason: "auth_error"`, `scope: "model"`, հայտարարված `6h` բազային սառեցմամբ) մշակվում է
`checkFallbackError`-ի կողմից (`open-sse/services/accountFallback.ts`)
՝ նախքան ընդհանուր apikey կատեգորիայի `FORBIDDEN` վաղ վերադարձը․ այն պայմանավորված է
`honorsRuleLockScope(provider)`-ով (#10334 — ներկայում բացառապես agentrouter-ի համար՝
`providerErrorRules.ts`-ի `HONORS_RULE_LOCK_SCOPE_PROVIDERS` թույլատրելի ցանկի միջոցով)։
Կանոնի հայտարարված 6h սառեցումը փոխանցվում է որպես
`fallbackResult.baseCooldownMs`, սակայն այն դեռ օգտագործում է առկա՝ ըստ մոդելի քվոտայի
արգելափակման ուղին (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, որը #10334-ի կողմից չի փոխվել՝ բացառությամբ սառեցման
աղբյուրի)․ այն սահմանափակվում է օպերատորի
`mlSettings.maxCooldownMs` արժեքով (կանխադրված՝ `1_800_000ms` / 30 րոպե), ինչպես
մոդելի ցանկացած այլ արգելափակում, իսկ _պահպանվող արգելափակման պատճառը_ մնում է
նախապես կոշտ կոդավորված `"forbidden"` արժեքը, ոչ թե կանոնի `"auth_error"`-ը — ամբողջ
շղթայով հաշվի է առնվում միայն սառեցման տևողությունը, ոչ թե պատճառի տողը։ Կապն ինքնին
մնում է ակտիվ, իսկ նույն կապի մյուս մոդելները չեն ազդվում։

Վերահաստատված քվոտայի սխալները (`额度不足`) արտադրական միջավայրում հասնում են մատակարարի
կանոնին (`agentrouter-user-quota-exhausted`՝ `reason: "quota_exhausted"`, `scope:
"connection"`, առանց սեփական հայտարարված սառեցման — կիրառվում է persistence layer-ի
scaled backoff-ի կանխադրված արժեքը)։ #10334-ից ի վեր `scope`-ը
`ProviderErrorRuleMatch`-ում սպառվում է ամբողջ շղթայով, սակայն **միայն**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` թույլատրելի ցանկում գտնվող մատակարարների համար
(`providerErrorRules.ts` — այսօր միայն `"agentrouter"`-ը՝
`honorsRuleLockScope()`-ի միջոցով)։ Մյուս բոլոր մատակարարների համար `scope`-ը մնում է
տեղեկատվական՝ ճիշտ այնպես, ինչպես #10334-ից առաջ։ `checkFallbackError`-ը համադրված
կանոնի scope-ը ներկայացնում է որպես `fallbackResult.ruleScope`։
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ընդհանուր պաշտպանիչ ստուգումն է, որը հաստատում է, որ
`ruleScope`-ը իսկապես անվտանգ է որպես կապի ամբողջական, ինքնավերականգնվող ազդանշան
հարգելու համար (scope `"connection"`, reason `quota_exhausted`, երբեք
`permanent`, երբեք `creditsExhausted` — պաշտպանություն ապագա այնպիսի կանոնի
համադրումից, որը scope `"connection"`-ը կզուգակցի հաշվի մշտական վիճակի հետ)։ Այն
կանչվում է երկու սպառողի կողմից․

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider-ի **per-model** արգելափակման ճյուղ ընկնելու փոխարեն
  (agentrouter-ը ունի `passthroughModels: true` → `hasPerModelQuota()`
  վերադարձնում է `true`), այն կիրառում է **ժամանակավոր կապի cooldown** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, և երբեք ոչ վերջնական
  կարգավիճակ (`credits_exhausted`/`banned`/`expired`) — այնպես, որ կապը
  ինքնավերականգնվի cooldown-ի ավարտից հետո՝ ձեռքով credential-ի վերակայում
  պահանջելու փոխարեն։
  Բաց է թողնվում `disableCooling: true` ունեցող կապերի համար (#2997). այդ
  հրաժարումը փոխարենը անցնում է per-model արգելափակման ճյուղով (փաստաթղթավորված
  փոխզիջում է — տես ճյուղի վերևում գտնվող կոդի մեկնաբանությունը)։
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): նույն guard-ը կապը նշում է
  հիշողության մեջ պահվող `exhaustedConnections` բազմության մեջ՝ ըստ
  `${provider}:${connectionId}` բանալու։ Սա բաց է թողնում միայն մնացած SAME-REQUEST
  թիրախը, որը _ինքն արդեն պարունակում է այդ ճշգրիտ `connectionId`_-ը իր սեփական
  թիրախի օբյեկտում (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` նախքան `exhaustedConnections`-ի որոնումը) — սովորական
  model-list combo-ն, որտեղ հարակից թիրախներն իրենց սեփական ամրագրված
  `connectionId` չունեն, և դրանցից մեկը յուրաքանչյուր dispatch-ի համար որոշվում է
  միայն պատասխանի `X-OmniRoute-Selected-Connection-Id` header-ից, երբեք չի
  հասնում այդ բանալու համապատասխանությանը։ Այդ տարածված դեպքում մնացած leg-ի
  կողմից հենց նոր սպառված հաշիվը կրկին օգտագործելու իրական պաշտպանությունը ոչ թե
  այս Set-ն է, այլ վերևում նկարագրված persistence layer-ը (կապի
  `rateLimitedUntil`-ը այժմ ապագայում է)՝ զուգակցված այս նույն guard-ի հետ, որը
  ձախողման համար ճնշում է `transientRateLimitedProviders`-ը (տես
  «Երկփուլ դիզայնը» և `targetExhaustion.ts`-ի
  `isAgentrouterConnectionQuotaScope` ճյուղի կոդի մեկնաբանությունը). Set-ը
  չնշված թողնելով՝ `combo.ts`-ի `allowRateLimitedConnection` force-allow-ը
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) չի գործարկվում
  provider-ի մնացած leg-երի համար, ուստի credential-ի ընտրության
  `rateLimitedUntil` ֆիլտրը (`src/sse/services/auth.ts:1238`) սովորական
  եղանակով պահպանվում է, և մնացած leg-ը կամ ընտրում է այլ, դեռ իրավասու
  agentrouter կապ, կամ ձախողվում է՝ հասանելի credential-ներ չլինելու պատճառով —
  այն ուժով չի վերադառնում այն կապին, որը այս ճյուղը հենց նոր cooldown-ի մեջ դրեց։

### Երկփուլ դիզայն՝ կարգավիճակի վերաձևակերպում, այնուհետև դասակարգում

Կարգավիճակի վերաձևակերպումը (`upstreamStatusRestatement.ts`) և provider-ի
դասակարգման կանոնները (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) առանձին registry-ներ են, որոնք երկուսն էլ հիմնվում են
provider id-ի և տեքստային marker-ների վրա, սակայն գործարկվում են տարբեր
վայրերում և ծառայում են տարբեր նպատակների. վերաձևակերպումը վաղ փուլում
վերագրում է HTTP status-ը `chatCore.ts`-ում, իսկ դասակարգման կանոնները ընտրում են
fallback `reason`-ը և արգելափակման `scope`-ը
(`model` / `provider` / `connection`) `checkFallbackError()`-ի ներսում
(`open-sse/services/accountFallback.ts`)։

Դասակարգման կանոնները տեսնում են միայն ամբողջական սխալի **տեքստը** (անհրաժեշտ է
մարմնի marker-ներին, օրինակ՝ `额度不足`, համապատասխանելու համար) այն provider-ների
դեպքում, որոնք ներառված են `providerErrorRules.ts`-ի
`FULL_TEXT_RULE_PROVIDERS` allowlist-ում — ներկայումս միայն `"agentrouter"`։
Յուրաքանչյուր այլ **ներկառուցված catalog** provider-ի համար
`checkFallbackError`-ը `getProviderErrorRuleMatch`-ին փոխանցում է միայն
կառուցվածքային սխալը (`{code, type}`), ինչը բավարար է header/status/code-ի վրա
հիմնված կանոնների համար, բայց չի տեսնում մարմնի տեքստային marker-ները։
`resolveRuleMatchBody()` helper-ը կատարում է այս ընտրությունը. allowlist-ում
ներառված provider-ների համար՝ սխալի ամբողջական տեքստը, իսկ մնացածների համար՝
կառուցվածքային սխալը։ **Ներկառուցված** provider-ը
`FULL_TEXT_RULE_PROVIDERS`-ում ավելացնելը տվյալ provider-ի համար բացահայտ
opt-in է. սա գոյություն ունի, որպեսզի ցուցակում չլինող յուրաքանչյուր provider-ի
լռելյայն ուղին մնա byte-for-byte անփոփոխ։

Կանոնի `scope`-ը (`model` / `provider` / `connection`) առանձին opt-in է
`FULL_TEXT_RULE_PROVIDERS`-ից. `checkFallbackError`-ը այն միայն ներկայացնում է
որպես `fallbackResult.ruleScope`, իսկ downstream consumer-ները այն որպես
տեղեկատվական պիտակից ավելին հաշվի են առնում միայն նույն ֆայլի
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ում ներառված provider-ների համար
(կառավարվում է `honorsRuleLockScope()`-ի միջոցով — այսօր միայն
`"agentrouter"`-ը)։ Տես վերևի «Վերաձևակերպված quota errors» բաժինը՝ հասկանալու
համար, թե provider-ի այդ allowlist-ում հայտնվելուց հետո իրականում ինչ է անում
`scope: "connection"` համապատասխանությունը։

**#11104 — օպերատորի կողմից հայտարարված կանոնները շրջանցում են երկու
allowlist-ները։** Օպերատորը կարող է runtime-ում յուրաքանչյուր provider-ի համար
կանոն հայտարարել `settings.providerErrorRules`-ի միջոցով
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)՝
առանց այս ֆայլը խմբագրելու։ Օպերատորի կանոնը
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ներով
սահմանափակելը — որոնք նախատեսված են ներկառուցված catalog կանոնների
**լռելյայն** վարքը պաշտպանելու համար — settings մեխանիզմը կդարձներ անգործուն
յուրաքանչյուր provider-ի համար, բացառությամբ արդեն այնտեղ թվարկվածների, քանի որ
կանոնի հայտարարումն ինքնին օպերատորի բացահայտ opt-in-ն է։
`resolveRuleMatchBody()` և `honorsRuleLockScope()` երկուսն էլ նախ ստուգում են
`hasOperatorRuleForProvider()`-ը. operator rule ունեցող provider-ը ստանում է
հում սխալի տեքստը, և նրա հայտարարված `scope`-ը հաշվի է առնվում՝ անկախ նրանից,
թե այն ներառվա՞ծ է որևէ allowlist-ում։

**Օպերատորի կողմից հայտարարված կանոններ** (`OperatorProviderErrorRule`). յուրաքանչյուր
կանոն ունի կամընտիր `status` և կամընտիր `match` (սխալի տեքստում սովորական,
մեծատառերի նկատմամբ անզգայուն substring, երբեք RegExp չէ, ուստի չի կարող
առաջացնել ReDoS), և պետք է սահմանի երկուսից առնվազն մեկը։ Երբ երկուսն էլ
սահմանված են, դրանք միավորվում են AND-ով. բաց թողնված դաշտը համապատասխանում է
ցանկացած արժեքի, ուստի `{match: "insufficient_quota"}`-ը համապատասխանում է այդ
կոդը կրող ցանկացած status-ի։ Առաջին համապատասխանող կանոնն ունի առաջնահերթություն։
`cooldownMs`-ը ընդունում է մինչև 30 օր. ընդհանուր առմամբ թույլատրվում է առավելագույնը
50 կանոն։

**Բոլոր դեպքերը ծածկող լռելյայն արժեքներ** (`settings.providerErrorDefaults`, միացված է ըստ ցանկության, սահմանվում է
`setOperatorProviderErrorDefaults`-ի միջոցով). `{[provider]: {cooldownMs, scope?, reason?}}`
՝ `cooldownMs`-ը 1 րոպեից մինչև 30 օր։ Լռելյայն արժեքը կիրառվում է միայն այն դեպքում, երբ
ոչ օպերատորի կանոն է համընկել, ոչ էլ ներկառուցված կատալոգի կանոն, և միայն 402, 403, 408,
429 ու 5xx սխալների համար։ Հարցման կառուցվածքի սխալները (400, 404, 409, 413, 422) և առանց
լրացուցիչ տվյալների 401-ները պահպանում են իրենց սեփական մշակումը։ Եթե բացահայտ
`reason` չկա, պատճառը ստացվում է կարգավիճակից՝ նույն կերպ, ինչպես դա անում է
`classifyError`-ը։ Լռելյայն արժեքի հայտարարումը համարվում է օպերատորի կանոն
`hasOperatorRuleForProvider()`-ի համար, ուստի դրա `scope`-ը (լռելյայն՝
`"connection"`) հաշվի է առնվում։ Լռելյայն արժեքի արդյունավետ cooldown-ը դրա
`cooldownMs`-ի և պրովայդերի սեփական retry հուշման (`Retry-After`,
`x-ratelimit-reset` կամ մարմնում առկա reset հուշում, նույն հուշումը, որին շարժիչը հետևում է,
երբ connection-cooldown կարգավորումը՝ "use upstream retry hints", միացված է) առավելագույնն է,
այսինքն՝ լռելյայն արժեքը կարող է երկարացնել կարճ upstream հուշումը, բայց երբեք չի կարող
կրճատել իրական reset-ը։ Բացահայտ օպերատորի կանոնը պահպանում է իր ճշգրիտ
`cooldownMs`-ը։ Ո՛չ կանոնը, ո՛չ լռելյայն արժեքը չեն շրջանցում
`markAccountUnavailable`-ի connection-cooldown պաշտպանությունները. ակտիվ, ավելի երկար
cooldown-ը երբեք չի կրճատվում, իսկ terminal կարգավիճակը երբեք չի վերագրվում։ Ներկառուցված
տեքստային հայտնաբերիչները, որոնք ավելի վաղ են աշխատում `checkFallbackError`-ում
(սպառված credits, օրական quota, ապաակտիվացված account), դեռևս առաջնահերթ են իրենց
հատուկ արտահայտությունների համար։

**Հայտնի բաց — `providerRuleRegistry`-ը երբեք չի ստուգվում HTTP 400-ի համար։**
`checkFallbackError`-ի `BAD_REQUEST` ճյուղը 400 կարգավիճակը ամբողջությամբ դասակարգում է
իր սեփական pattern զանգվածների միջոցով (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` և այլն՝ `accountFallback.ts`-ում) և վերադարձնում է արդյունք,
նախքան վերևում գտնվող `configuredRule`/`getProviderErrorRuleMatch` ճյուղին հասնելը։
Ներկառուցված կատալոգի կանոնը (կամ օպերատորի կանոնը) `status: 400`-ով շարահյուսորեն
վավեր է, բայց երբեք չի գործարկվի։ Այսօր գոյություն ունեցող ոչ մի կանոն չի թիրախավորում
400-ը, ուստի արտադրական միջավայրում ոչինչ չի ազդվում — սակայն ապագա 400 կանոնը նախ
պահանջում է փոփոխել այս ճյուղը, ինչը կանոն ավելացնելուց ավելի մեծ փոփոխություն է
(այն վերադասակարգում է 400-ը բոլոր այն պրովայդերների համար, որոնք արդեն ապավինում են
pattern-array վարքագծին) և դուրս է մեկ պրովայդերի կանոն ավելացնելու շրջանակից։

### Նոր quota-ն սխալ ներկայացնող gateway-ի ավելացում

1. Գրանցեք մեկ կանոնների զանգված `statusRestatementRegistry`-ում
   (`open-sse/config/upstreamStatusRestatement.ts`)։ `textMarkers`-ը պահեք
   պրովայդերին հատուկ. երբեք մի վերօգտագործեք ընդհանուր անգլերեն արտահայտություններ,
   որոնք բախվում են `CREDITS_EXHAUSTED_SIGNALS`-ի հետ
   (`open-sse/services/accountFallback.ts`)։
2. Ցանկության դեպքում գրանցեք դասակարգման կանոններ
   `open-sse/config/providerErrorRules.ts`-ում (`providerRuleRegistry`)՝ ճիշտ lock
   scope-ը ընտրելու համար (`connection`՝ ամբողջ account-ի quota-ի, `model`՝
   առանձին model-ների սխալների համար)։ Այս քայլը արտադրական միջավայրում ուժի մեջ է
   մտնում միայն այն պրովայդերների համար, որոնց կանոններին անհրաժեշտ է սխալի ամբողջական
   տեքստը (body marker-ներ). նույն ֆայլում ավելացրեք պրովայդերի id-ն
   `FULL_TEXT_RULE_PROVIDERS`-ին — հակառակ դեպքում `checkFallbackError`-ը կանոնին
   երբեք չի փոխանցում ավելին, քան կառուցվածքային `{code, type}` սխալը, և body-text
   կանոնը կենդանի traffic-ում երբեք չի համընկնի։
   Կանոնները, որոնք համընկնում են միայն `status`/`headers`-ի հիման վրա (ինչպես
   Opencode-ի կամ Minimax-ի կանոնները), այս opt-in-ի կարիքը չունեն։ Առանձին, եթե կանոնը
   հայտարարում է `scope: "connection"` և նպատակը իրական connection-wide cooldown-ն է՝
   նույն-request combo skip-ով (ոչ թե պարզապես տեղեկատվական պիտակ), նույն ֆայլում
   ավելացրեք պրովայդերի id-ն `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ին — սա է վերահսկում
   `isAgentrouterConnectionQuotaScope()`-ի նման սպառումը
   `markAccountUnavailable()`-ում (`src/sse/services/auth.ts`) և
   `applyComboTargetExhaustion()`-ում
   (`open-sse/services/combo/targetExhaustion.ts`). առանց դրա `scope`-ը դեռ փոխանցվում է
   `fallbackResult.ruleScope`-ով, բայց դրա հիման վրա ոչինչ չի կատարվում։
3. Ավելացրեք unit test-եր՝ նմանակելով
   `tests/unit/upstream-status-restatement.test.ts`-ը և
   `tests/unit/agentrouter-error-rules.test.ts`-ը (ներառյալ
   not-permanent / not-creditsExhausted պաշտպանությունները, իսկ եթե պրովայդերին
   անհրաժեշտ է allowlist-ը՝ նաև թեստ, որը հաստատում է, որ
   `resolveRuleMatchBody()`-ը ամբողջական տեքստը վերադարձնում է միայն այդ
   պրովայդերի համար)։

`chatCore.ts`-ում, `classifyError`-ում կամ combo-ում փոփոխություններ անհրաժեշտ չեն։

#### Egress-ով խմբավորված lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ում գտնվող պրովայդերները (opencode ընտանիքը)
դիտարկվում են որպես IP-ով խմբավորված upstream (opencode-ի free tier-ը IP-ով է
խմբավորված, ոչ թե account-ով — տես #9611). status-429-ը, որը դասակարգվել է որպես
`quota_exhausted` **կամ** `rate_limit_exceeded`, cooldown-ի է ենթարկում allowlisted-family-ի
բոլոր connection-ները, որոնց վերջին հայտնի egress IP-ը համընկնում է ձախողված
connection-ի IP-ի հետ, նախքան rotation-ը կփորձի դրանք
— այդպիսով խուսափելով N-1 հաստատ ձախողվող upstream call-երից (նույն կառուցվածքը, ինչ
#10460/#10525-ում)։
`rate_limit_exceeded`-ը միտումնավոր ներառված է. `markAccountUnavailable`-ի ուղու վրա
opencode-ին հատուկ կանոնները երբեք չեն համընկնում (`checkFallbackError`-ին headers/body
չեն փոխանցվում, opencode-ը ներառված չէ `FULL_TEXT_RULE_PROVIDERS`-ում), ուստի այն 429-ը,
որի body-ն պարունակում է subscription-quota տեքստը ("monthly usage limit
reached"), quota-text fallback-ի միջոցով (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1ժ cooldown) դասակարգվում է որպես `quota_exhausted`, նախքան
`status_429` կանոնին հասնելը — մինչդեռ quota-text չունեցող 429-ը (սովորական rate
limiting) `status_429` կանոնի միջոցով դասակարգվում է որպես `rate_limit_exceeded` և
նույնպես cooldown-ի է ենթարկում IP ընտանիքը։ Allowlisted պրովայդերի համար IP-ով
խմբավորված rate limit-ը նույն ազդանշանն է, ինչ սպառված quota-ն։ Իրատեսական սահմանափակումներ՝

- **Լավագույն հնարավորությամբ**․ կողպեքը `proxy_logs`-ից լուծում է միացման վերջին հայտնի `egress_ip`-ը (24h պատուհան, համաժամանակյա, առանց քեշի)։ Սառը քեշի դեպքում (egress IP-ն երբեք չի ստուգվել) կամ տող չլինելու դեպքում ձախողված միացումը դեռ սառեցվում է ճյուղի կողմից (գրանցվում է ինչպես այսօր), պարզապես ոչ մի հարակից միացում չի կողպվում։
- **Երբեք վերջնական չէ**․ սառեցումը վերականգնվող քվոտայի պատուհան է (`testStatus: "unavailable"`), իսկ մշտական վիճակը երբեք չի ստացվում IP մակարդակի ազդանշանից։ `disableCooling` ունեցող միացումները ամբողջությամբ բաց են թողնում այս ճյուղը։
- **Թույլատրված ընտանիքի համար կողպման մանրամասնությունը փոխվում է**․ սա տիրույթի փոփոխություն է, ոչ միայն հարակից միացումների օպտիմալացում։ opencode-ը `passthroughModels` մատակարար է, ուստի մինչև այս ճյուղը 429-ը առաջացնում էր յուրաքանչյուր MODEL-ի առանձին կողպում, իսկ այժմ առաջացնում է միացման սառեցում՝ ներառյալ այն օպերատորի դեպքում, որն աշխատեցնում է միայն մեկ միացում և ընդհանրապես հարակից միացում չունի։ Սա այն մանրամասնությունն է, որը opencode-ի կանոնների աղյուսակն արդեն հայտարարում է ճիշտ (`scope: "connection"`, `providerErrorRules.ts`), սակայն մինչ այժմ երբեք չի կիրառվել, քանի որ opencode-ը ներառված չէ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ում։ Ճյուղն ինքն է գրում ձախողված միացման սառեցումը և `backoffLevel`-ը՝ ընդօրինակելով connection-scoped agentrouter ճյուղը, ապա վերադարձնում է արդյունքը․ յուրաքանչյուր մոդելի արգելափակման և ստորև գտնվող ընդհանուր ուղիները երբեք չեն հասնում կատարման։
- **Combo-ն ներառված է**․ agentrouter ճյուղի նման, տիրույթը միտումնավոր անտեսում է `persistUnavailableState`/`isCombo` իջեցումը, որը combo կանչողը կիրառում է 429-ի դեպքում։ Յուրաքանչյուր մոդելի կողպումը այս տիրույթի ավելի թույլ տարբերակը չէ, այլ սխալ միավորը․ այն ոչինչ չի ասում սպառված IP-ի մասին, ուստի combo-ի ռոտացիան կշարունակեր յուրաքանչյուր հարակից միացման համար կատարել մեկ երաշխավորված ձախողվող կանչ։
- **Հարակից միացումների անվտանգություն**․ արդեն վերջնական վիճակում գտնվող (banned/credits_exhausted) կամ արդեն ավելի երկար սառեցում ունեցող հարակից միացումը երբեք չի վերագրվում։
- **Բացառիկ թույլատրվածների ցանկ**․ `EGRESS_BUCKETED_LOCK_PROVIDERS`-ի ընդլայնումը սեփականատիրոջ բացահայտ որոշումն է․ ընդհանուր միացում չկա (pattern #10334/#10419)։ Հարակից միացումների հարցումն օգտագործում է հենց նույն թույլատրվածների ցանկը՝ այն որպես SQL literal չկրկնելու փոխարեն, ուստի դրա ընդլայնումը մնում է մեկ տողի փոփոխություն։
- **Egress IP-ի ռոտացիա՝ երկու ուղղությամբ**․ որոնման պատուհանը (24h) շատ ավելի լայն է, քան egress-IP քեշի TTL-ը (5 min), ուստի «վերջին հայտնի IP»-ն պատմություն է, ոչ թե ընթացիկ վիճակ։ Եթե միացման proxy-ն պատուհանի ընթացքում ռոտացվել է, կողպումը կարող է **չհայտնաբերել** իսկապես ընդհանուր IP-ն (գրանցված IP-ն նոր, դեռևս չսպառված IP-ն է), և, համաչափորեն, կարող է **սառեցնել հարակից միացումը, որը դրանից հետո ռոտացվել է հեռու** սպառված IP-ից։ Երկրորդ դեպքում այդ հարակից միացումը մեկ սառեցման պատուհանի ծախս է կրում․ երկու դեպքերն էլ ընդունված լավագույն հնարավորությամբ սահմանափակումներ են՝ պատմության վրա հիմնված որոնման պատճառով։
- **Ծախս**․ `proxy_logs`-ի երկու սահմանափակված սկանավորում (պատուհանով զտված՝ `idx_pl_timestamp`-ի միջոցով), միայն 429-ի հաճախականությամբ։ Նոր ինդեքս չկա (migration 134 YAGNI)։ Չափումները կատարվել են իրական տրաֆիկով DB-ի միջին չափի պատճենի վրա․ բարձր թողունակությամբ նմուշը նույն պատուհանում համամասնորեն ավելի շատ տողեր է պահում։

## Կայունության այլ առանձնահատկություններ

- **20 երթուղավորման ռազմավարություն** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — տես [AUTO-COMBO.md](../routing/AUTO-COMBO.md)։
- **Reset-aware երթուղավորում** (v3.8.0) — առաջնահերթություն է տալիս կապերին ըստ քվոտայի վերականգնման ժամանակի։
- **Background ռեժիմի դեգրադացիա** — Responses API-ի `background: true`-ն դեգրադացվում է մինչև սինխրոն ռեժիմ՝ նախազգուշացման հետ միասին։
- **Գործիքների սահմանաչափի դինամիկ հայտնաբերում** — հետ է քաշում մատակարարներին, երբ հասնում են գործիքների քանակի սահմանաչափերին։
- **Արտակարգ պահուստային անցում** — կառավարվում է `OMNIROUTE_EMERGENCY_FALLBACK`-ով; օպերատորները կարող են այն վերակիրառել Feature Flags էջից առանց վերամեկնարկի։

---

## Վրիպազերծում

- Weighted combo-ն պատասխանում է `503 all_targets_cooling_down` (`Retry-After`-ը սահմանված է, `diagnostics.excluded`-ը թվարկում է բոլոր թիրախները `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` կարգավիճակներով) → պուլը կարգավորված է և միացված, բոլոր թիրախները պարզապես բացառված են կայունության ժամանակաչափի կողմից. `[COMBO] Weighted selection: every target excluded before dispatch — …` նախազգուշացումը նշում է պատճառները և մնացորդային վայրկյանները։ Նույն combo-ից ստացված `404 no_executable_targets`-ը նշանակում է, որ կայունության ժամանակաչափ չի ներգրավվել (կա՛մ գործարկելի բան չկա, կա՛մ բոլոր հաշիվները ձախողել են հասանելիության ստուգումը)։ Կառուցված է `open-sse/services/combo/pinRecovery.ts`-ում՝ `targetResolution.ts`-ում հավաքված բացառումներից։
- Մատակարարի բոլոր բանալիները բաց են թողնված → ստուգեք և՛ circuit breaker-ի վիճակը, և՛ յուրաքանչյուր կապի `rateLimitedUntil`/`testStatus`-ը։
- Մատակարարը մշտապես բացառված է վերականգնման պատուհանից հետո → կոդը կարդում է հում `state`-ը `getStatus()`/`canExecute()`-ի փոխարեն։
- Մեկ բանալին է ձախողվում, մյուսները պետք է աշխատեն → նախապատվություն տվեք connection cooldown-ին, ոչ թե circuit breaker-ին։
- Միայն մեկ մոդել է ձախողվում → նախապատվություն տվեք model lockout-ին, ոչ թե connection cooldown-ին։
- Վիճակը պետք է ինքնավերականգնվի, բայց չի վերականգնվում → ստուգեք ապագա ժամանակադրումը և ընթերցման ուղին, որը թարմացնում է լրացած վիճակը։ Մշտական կարգավիճակները պահանջում են ձեռքով փոփոխություններ։

---

## Գործարկման վիճակ — գործակալի արագ տեղեկանք

> Տեղափոխված է բառացիորեն `AGENTS.md`-ից → "Resilience Runtime State" (PR #12743), որպեսզի գործակալի
> ուղեցույցը մնա 40k կոնտեքստային բյուջեի սահմաններում։ Սա վերոհիշյալ բաժինների խտացված,
> գործակալին ուղղված տեսքն է. համարակալված բաժինները մնում են ամբողջական տեղեկատուն։

OmniRoute-ն ունի երեք փոխկապված, բայց տարբեր ժամանակավոր ձախողման մեխանիզմ։ Երթուղավորման
պահվածքը վրիպազերծելիս պահեք դրանց շրջանակները առանձին։ Մի հայացքով ծանոթացման համար տես
[3-շերտ կայունության դիագրամը](../diagrams/exported/resilience-3layers.svg)
(աղբյուր՝ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))։

### Մատակարարի Circuit Breaker

**Շրջանակը**. ամբողջ մատակարարը, օր. `glm`, `openai`, `anthropic`։

**Նպատակը**. դադարեցնել տրաֆիկի ուղարկումը մատակարարին, որը բազմիցս ձախողվում է upstream/ծառայության
մակարդակում, որպեսզի մեկ ոչ առողջ մատակարարը չդանդաղեցնի յուրաքանչյուր հարցում։

**Իրականացում**.

- Հիմնական դասը՝ `src/shared/utils/circuitBreaker.ts`
- Chat-ի դարպասի/կատարման միացում՝ `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Գործարկման վիճակի API՝ `src/app/api/monitoring/health/route.ts`
- Ընդհանուր փաթաթիչներ՝ `open-sse/services/accountFallback.ts`
- Պերսիստենտ վիճակի աղյուսակ՝ `domain_circuit_breakers`

**Վիճակներ** (4 — `src/shared/utils/circuitBreaker.ts`).

- `CLOSED`՝ նորմալ տրաֆիկը թույլատրվում է։
- `DEGRADED`՝ վաղ նախազգուշացման գոտի — ձախողումները գերազանցել են դեգրադացիայի շեմը, բայց դեռ ոչ
  breaker-ի շեմը. տրաֆիկը շարունակում է հոսել, վահանակները ցույց են տալիս նախազգուշացումը։ Վավեր
  կապի թեստը կամ առանց նոր ձախողման հանգիստ պատուհանը այն վերադարձնում է `CLOSED` վիճակի
  (պատուհանը նշված է `docs/architecture/RESILIENCE_GUIDE.md`-ում)։
- `OPEN`՝ մատակարարը ժամանակավորապես արգելափակված է. կանչողները ստանում են provider-circuit-open
  պատասխան, կամ combo երթուղավորումը բաց է թողնում այն՝ անցնելով մեկ այլ թիրախի։
- `HALF_OPEN`՝ վերականգնման ժամկետը լրացել է. թույլատրվում է փորձնական հարցում։ Հաջողությունը
  փակում է breaker-ը, ձախողումը նորից բացում է այն։

**Լռակյաց արժեքներ** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, օգտագործվում է
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker`-ի միջոցով `src/lib/resilience/settings.ts`-ում →
`getCircuitBreaker(provider, …)` `src/sse/handlers/chatHelpers.ts`-ում)։ Ամբողջ մատակարարի
breaker-ը աշխատում է `circuitBreakerThreshold` / `circuitBreakerReset` պարամետրերով.

| Պրոֆիլ     | դեգրադացվում է | բացվում է (`circuitBreakerThreshold`) | վերականգնում (`circuitBreakerReset`) |
| ---------- | -------------: | ------------------------------------: | -----------------------------------: |
| OAuth      |            `5` |                                   `8` |                                `60s` |
| API բանալի |            `7` |                                  `12` |                                `30s` |
| Տեղային    |     (ածանցված) |                                   `2` |                                `15s` |

`PROVIDER_PROFILES`-ը նաև սահմանում է `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 րոպե) և `providerCooldownMs` (5/10/1 րոպե). դրանք սնուցում են
**ընտրովի միացվող գլոբալ Provider Cooldown-ի պատուհանի դարպասը** (`PROVIDER_COOLDOWN_ENABLED`,
լռակյաց անջատված) — `open-sse/services/providerCooldownTracker.ts`-ում մատակարարի մակարդակի
գրառումը համարվում է սառեցվող միայն այն բանից հետո, երբ `providerFailureWindowMs`-ի ներսում
գրանցվի `providerFailureThreshold` ձախողում, և այնուհետև սառեցվում է `providerCooldownMs`
տևողությամբ։ Դրանք ՈՉ կենդանի breaker-ի շեմերն են — մի կարգավորեք դրանք՝ ակնկալելով breaker-ի
պահվածք։ Յուրաքանչյուր լռակյաց արժեք կարող է վերակիրառվել
`OMNIROUTE_PROVIDER_BREAKER_*` և `OMNIROUTE_CIRCUIT_BREAKER_*` միջավայրի փոփոխականների միջոցով.
գործարկմանը համապատասխան ճշգրիտ տեղեկատու աղյուսակը գտնվում է
`docs/architecture/RESILIENCE_GUIDE.md`-ում։

Միայն մատակարարի մակարդակի ձախողման կարգավիճակները պետք է գործարկեն մատակարարի breaker-ը.

```ts
(408, 500, 502, 503, 504);
```

Մի գործարկեք ամբողջ մատակարարի breaker-ը սովորական հաշվի/բանալու/մոդելի սխալների համար,
ինչպիսիք են `401`, `403` կամ `429` դեպքերի մեծամասնությունը։ Դրանք սովորաբար պատկանում են
connection cooldown-ին կամ model lockout-ին։ Ընդհանուր API բանալիով մատակարարի `403`-ը պետք է
լինի վերականգնելի, եթե այն դասակարգված չէ որպես վերջնական մատակարարի/հաշվի սխալ։

Բրեյկերը օգտագործում է ծույլ (lazy) վերականգնում, ոչ թե ֆոնային ժամաչափ։ Երբ `OPEN`-ի ժամկետը լրանում է, այնպիսի կարդացումներ, ինչպիսիք են `getStatus()`-ը, `canExecute()`-ը և `getRetryAfterMs()`-ը, թարմացնում են վիճակը դեպի `HALF_OPEN`, այնպես որ դաշբորդները և combo թեկնածուների կառուցիչները չեն շարունակում ընդմիշտ բացառել ժամկետանց պրովայդերին։

### Կապի սառեցում (Cooldown)

**Շրջանակ**՝ մեկ պրովայդերի կապ/հաշիվ/բանալի։

**Նպատակ**՝ ժամանակավորապես բաց թողնել մեկ վատ բանալի/հաշիվ՝ միաժամանակ թույլ տալով նույն պրովայդերի այլ կապերին շարունակել սպասարկել հարցումները։

**Իրականացում**՝

- Գրելու/թարմացնելու ուղի՝ `src/sse/services/auth.ts::markAccountUnavailable()`
- Հաշվի ընտրություն/զտում՝ `src/sse/services/auth.ts::getProviderCredentials...`
- Սառեցման հաշվարկ՝ `open-sse/services/accountFallback.ts::checkFallbackError()`
- Կարգավորումներ՝ `src/lib/resilience/settings.ts`

Կարևոր դաշտեր պրովայդերի կապերի վրա՝

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Հաշվի ընտրության ընթացքում կապը բաց է թողնվում, քանի դեռ՝

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Սառեցումները նույնպես ծույլ են. երբ `rateLimitedUntil`-ը անցյալում է, կապը կրկին դառնում է իրավասու։ Հաջող օգտագործման դեպքում `clearAccountError()`-ը մաքրում է `testStatus`-ը, `rateLimitedUntil`-ը, սխալի դաշտերը և `backoffLevel`-ը։

Կապի սառեցման լռելյայն վարքագիծ՝

- OAuth բազային սառեցում՝ `5s`։
- API-բանալու բազային սառեցում՝ `3s`։
- API-բանալու `429`-ը պետք է նախապատվություն տա վերին հոսքի (upstream) կրկնման հուշումներին (`Retry-After`, reset գլխագրեր կամ վերլուծելի reset տեքստ), երբ դրանք հասանելի են։
- Կրկնվող վերականգնելի ձախողումները օգտագործում են ցուցչային backoff՝

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd պաշտպանությունը կանխում է նույն կապի վրա միաժամանակյա ձախողումների պատճառով սառեցման կրկնակի երկարացումը կամ `backoffLevel`-ի կրկնակի ավելացումը։

Վերջնական (terminal) վիճակները սառեցումներ չեն։ `banned`-ը, `expired`-ը (որը դառնում է վերջնական միայն N սահմանափակ կրկնություններից հետո՝ `EXPIRED_RETRY_MAX`-ի միջոցով) և `credits_exhausted`-ը նախատեսված են մնալ անհասանելի, քանի դեռ հավաստագրերը/կարգավորումները չեն փոխվել կամ օպերատորը չի վերակայել դրանք։ Մի վերագրանցեք վերջնական վիճակները անցողիկ սառեցման վիճակով։

### Մոդելի արգելափակում (Lockout)

**Շրջանակ**՝ պրովայդեր + կապ + մոդել։

**Նպատակ**՝ խուսափել ամբողջ կապի անջատումից, երբ միայն մեկ մոդելն է անհասանելի կամ քվոտայով սահմանափակված այդ կապի համար։

Օրինակներ՝

- Յուրաքանչյուր մոդելի համար քվոտա ունեցող պրովայդերներ, որոնք վերադարձնում են `429`։
- Տեղային պրովայդերներ, որոնք վերադարձնում են `404` մեկ բացակայող մոդելի համար։
- Պրովայդերին հատուկ ռեժիմի/մոդելի թույլտվության ձախողումներ, ինչպիսիք են Grok-ի ընտրված ռեժիմները։

Մոդելի արգելափակումը գտնվում է `open-sse/services/accountFallback.ts`-ում և թույլ է տալիս նույն կապին շարունակել սպասարկել այլ մոդելներ։

### Վրիպազերծման ուղեցույց

- Եթե պրովայդերի բոլոր բանալիները բաց են թողնվում, ստուգեք թե՛ պրովայդերի բրեյկերի վիճակը, թե՛ յուրաքանչյուր կապի `rateLimitedUntil`/`testStatus`-ը։
- Եթե պրովայդերը վերակայման պատուհանից հետո մշտապես բացառված է թվում, ստուգեք՝ արդյոք կոդը կարդում է հում `state`-ը `getStatus()`/`canExecute()` օգտագործելու փոխարեն։
- Եթե պրովայդերի մեկ բանալին է ձախողվում, բայց մյուսները պետք է աշխատեն, նախապատվություն տվեք կապի սառեցմանը՝ պրովայդերի բրեյկերի փոխարեն։
- Եթե միայն մեկ մոդելն է ձախողվում, նախապատվություն տվեք մոդելի արգելափակմանը՝ կապի սառեցման փոխարեն։
- Եթե վիճակը պետք է ինքնավերականգնվի, այն պետք է ունենա ապագա ժամադրույթ/վերակայման ժամկետ և կարդացման ուղի, որը թարմացնում է ժամկետանց վիճակը։ Մշտական կարգավիճակները պահանջում են հավաստագրի կամ կոնֆիգուրացիայի ձեռքով փոփոխություններ։

---

## TLS մատնահետքում և գաղտնիություն

Մատակարարին հատուկ գաղտնիությունը (JA3/JA4, CCH, օբֆուսկացիա) փաստաթղթավորված է առանձին — տե՛ս `docs/security/STEALTH_GUIDE.md` (git; չի կոմպիլացվում `/docs`-ի մեջ):

---

## Դիմացկունության փորձարկում (Փուլ 8 · Բլոկ C)

Բացի դիմացկունության տրամաբանության unit թեստերից, երեք թեստեր ենթարկում են runtime-ը իրական ծանրաբեռնվածության/ձախողման պայմանների (բոլորը integration/գիշերային են — ոչ մեկը չի արգելափակում PR-ները):

| Թեստ        | Ինչ է անում                                                                                                                                                                                                      | Գործարկում                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Chaos       | Կեղծ upstream հանգույցը ներարկում է իրական ուշացում/reset/timeout/503; վավերացնում է, որ circuit breaker-ը բացվում է/վերականգնվում, և որ `checkFallbackError`-ը 503-ը դասակարգում է որպես վերականգնելի fallback: | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-growth | ~500 հոսք յուրաքանչյուր `createSSEStream`-ի համար `--expose-gc`-ի ներքո; ձախողվում է, եթե heap-ն աճում է վերին սահմանից դուրս (OOM պաշտպանություն #3069):                                                        | `npm run test:heap`                        |
| k6 soak     | Երկարատև ծանրաբեռնվածություն `/api/monitoring/health`-ի դեմ; p95/սխալների շեմային արժեքներ:                                                                                                                      | `k6 run tests/load/k6-soak.js` (գիշերային) |

Օրկեստրվում է `.github/workflows/nightly-resilience.yml`-ի կողմից (cron + dispatch): Լռելյայն `test:integration`-ի մեջ chaos-ը և heap-ը ինքնաբերաբար բաց են թողնվում (առանց `RUN_CHAOS_INT`/`--expose-gc`-ի):

---

## Տե՛ս նաև

- [Ճարտարապետության ուղեցույց](./ARCHITECTURE.md) — Համակարգի ճարտարապետություն և ներքին կառուցվածք
- [Օգտագործողի ուղեցույց](../guides/USER_GUIDE.md) — Մատակարարներ, կոմբոներ, CLI ինտեգրացիա
- [Auto-Combo շարժիչ](../routing/AUTO-COMBO.md) — 16-գործոն գնահատում, ռեժիմային փաթեթներ
