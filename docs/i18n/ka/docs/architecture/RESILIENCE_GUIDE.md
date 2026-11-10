# Resilience Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute აქვს სამი განსხვავებული, მაგრამ დაკავშირებული გამძლეობის მექანიზმი. თითოეულს აქვს განსხვავებული სფერო და მიზანი. შეინახეთ ისინი ცალკე მარშრუტიზაციის ქცევის გამართვისას.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> წყარო: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard უპირატესობა მდგრადობის გადართვისთვის.** არჩევის ელასტიურობა იცვლება გარემოდან დათესილი — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — მხოლოდ აწვდის _ ნაგულისხმევს (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). ლოგიკური მაჩვენებელი გაგრძელდა `resilienceSettings` ში (Dashboard →** პარამეტრები → Resilience** / `PATCH /api/resilience`, შენახული `key_value` ში) იგებს env მნიშვნელობას: ნორმალიზება (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) ინახავს შენახულ ლოგიკურ მნიშვნელობას, როდესაც ის არსებობს. ასეთი env var-ის `true` ზე დაყენება განლაგებისას, სადაც დაფა უკვე შენახულია `false` ამიტომ არაფერს ცვლის — გადაატრიალეთ გადართვა** პარამეტრები → გამძლეობა** (ან გაასუფთავეთ შენახული ველი).

## 1. პროვაიდერის Circuit Breaker

**ფარგლები:** მთელი პროვაიდერი (მაგ., `glm`, `openai`, `anthropic`).

**დანიშნულება:** შეწყვიტოს ტრაფიკის გაგზავნა იმ პროვაიდერისკენ, რომელიც განმეორებით უარს ამბობს upstream/სერვისის დონეზე.

**იმპლემენტაცია:**

- ძირითადი კლასი: `src/shared/utils/circuitBreaker.ts`
- მიბმა: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- სტატუსის API: `GET /api/monitoring/health`
- განულების API: `POST /api/resilience/reset`
- Wrapper-ები: `open-sse/services/accountFallback.ts`
- ბაზის ცხრილი: `domain_circuit_breakers`

**მდგომარეობები:**

- `CLOSED` — ნორმალური ტრაფიკი დაშვებულია
- `DEGRADED` — ტრაფიკი კვლავ დაშვებულია, მაგრამ მიმდინარეობს პროვაიდერის გაზრდილი შეცდომების თვალყურის დევნება; ბრუნდება `CLOSED` მდგომარეობაში საკმარისი რაოდენობის წარმატებების შემდეგ, კავშირის წარმატებული ტესტისას ან ბოლო შეცდომის ტიპისთვის ყველაზე ხანგრძლივი `OPEN` რეჟიმში ყოფნის შემდეგ (მისი `cooldownByKind` მნიშვნელობა, სხვა შემთხვევაში `resetTimeout`, გამრავლებული `maxBackoffMultiplier`-ზე, მინიმუმ ერთი cooldown) ახალი შეცდომის გარეშე
- `OPEN` — პროვაიდერი დროებით ბლოკირებულია; combo მარშრუტიზაცია მას გამოტოვებს
- `HALF_OPEN` — განულების ტაიმაუტი ამოიწურა; საცდელი მოთხოვნა დაშვებულია

**კონფიგურირებადი ნაგულისხმები მნიშვნელობები (`open-sse/config/constants.ts`, ხელმისაწვდომია Dashboard → Settings → Resilience-ში):**

| კლასი    | დეგრადირდება | იღება      | განულების ტაიმაუტი |
| -------- | ------------ | ---------- | ------------------ |
| OAuth    | 5 შეცდომა    | 8 შეცდომა  | 60s                |
| API-key  | 7 შეცდომა    | 12 შეცდომა | 30s                |
| ლოკალური | გამოთვლილი   | 2 შეცდომა  | 15s                |

`degradationThreshold` განსაზღვრავს, როდის შედის პროვაიდერი `DEGRADED` მდგომარეობაში; `failureThreshold` განსაზღვრავს, როდის იღება ის და გამოიტოვება. ლოკალური პროვაიდერის პროფილები Resilience-ის პარამეტრების გვერდზე ჯერ არ არის წარმოდგენილი.

**გამორთვის კოდები:** მხოლოდ პროვაიდერის დონის სტატუსები `[408, 500, 502, 503, 504]`. არ უნდა მუშავდებოდეს ანგარიშის დონის შეცდომებზე (401/403/429-ის უმეტესობა — ისინი cooldown-ს ან დაბლოკვას ეკუთვნის).

**ზარმაცი აღდგენა:** როდესაც `OPEN`-ის ვადა იწურება, `getStatus()`, `canExecute()`, `getRetryAfterMs()` მდგომარეობას `HALF_OPEN`-ზე ანახლებს. იგივე წაკითხვები (და შემდეგი შეცდომა) მოძველებული `DEGRADED`-ის `CLOSED`-ზე დაბრუნებას იწვევს. ფონური ტაიმერი არ არის საჭირო.

---

### არჩევითი გლობალური Provider Cooldown (ფანჯრის კარი)

მეოთხე, **არჩევითი** შრე (`PROVIDER_COOLDOWN_ENABLED`, ნაგულისხმებად **გამორთული**) ინახავს წარუმატებელი პროვაიდერების მოთხოვნებს შორის მეხსიერებას `open-sse/services/providerCooldownTracker.ts`-ში, რომელსაც combo სამიზნის განსაზღვრა იყენებს ისე, რომ ზედიზედ combo მოთხოვნები შეწყვიტონ ახლახან წარუმატებელი პროვაიდერის ხელახლა გავლა. პროვაიდერის დონის ჩანაწერები ემორჩილება `PROVIDER_PROFILES`-ის ფანჯრის კარს:

| პროფილი | მუშავდება შემდეგ (`providerFailureThreshold`) | ფანჯარაში (`providerFailureWindowMs`) | გაცივების ხანგრძლივობა (`providerCooldownMs`) |
| ------- | --------------------------------------------: | ------------------------------------: | --------------------------------------------: |
| OAuth   |                                          `10` |                               `15min` |                                        `5min` |
| API key |                                          `15` |                               `30min` |                                       `10min` |

ზღვარის ქვემოთ პროვაიდერი გაცივებულად **არ** ითვლება; წარმატება ფანჯარას ასუფთავებს. კავშირის დონის ჩანაწერები (`provider:connectionId`) ამის ნაცვლად ინარჩუნებენ ექსპონენციურ `minRetryCooldownMs → maxRetryCooldownMs` backoff-ს. გადაფარვები: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. რეგრესიის დამცველი: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. კავშირის cooldown

**სკოპი:** ერთი პროვაიდერის კავშირი/ანგარიში/გასაღები.

**მიზანი:** ერთი პრობლემური გასაღების გამოტოვება, სანამ იმავე პროვაიდერის სხვა კავშირები განაგრძობენ მომსახურებას.

**იმპლემენტაცია:**

- მიუწვდომლად მონიშვნა: `src/sse/services/auth.ts::markAccountUnavailable()`
- არჩევა: `getProviderCredentials*` იმავე ფაილში
- cooldown-ის გამოთვლა: `open-sse/services/accountFallback.ts::checkFallbackError()`
- პარამეტრები: `src/lib/resilience/settings.ts`

**თითოეული კავშირის ველები:**

- `rateLimitedUntil` — დროის ნიშნული, როცა cooldown იწურება
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ექსპონენციური backoff-ის მრიცხველი

**ნაგულისხმევი cooldown-ები:**

- OAuth-ის საბაზისო მნიშვნელობა: 5s
- API-key-ის საბაზისო მნიშვნელობა: 3s
- API-key 429: უპირატესობას ანიჭებს upstream-ის `Retry-After`/reset ჰედერებს/გასაანალიზებელ reset ტექსტს
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**თითოეული პროვაიდერის retry დაყოვნება.** პროვაიდერის დეტალების გვერდზე არის **Retry delay**-ის ჩამოსაშლელი სია (ავტომატური,
15s-დან 1h-მდე). ის ინახავს `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`-ს
(1–21600, `PATCH /api/resilience`-ის საშუალებით). როდესაც rate-limit შეცდომა upstream-ის retry
მინიშნებას არ შეიცავს, ეს მნიშვნელობა ცვლის პროვაიდერისთვის მასშტაბირებულ backoff-ს და
`backoffLevel`-ს 0-ზე აბრუნებს (`open-sse/services/rotationConfig.ts::overrideFor`). rate-limited
შეცდომისთვის პრიორიტეტები, უმაღლესიდან უმდაბლესამდე: upstream-ის retry მინიშნება, შემდეგ
თითოეული კავშირის `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, შემდეგ პროვაიდერისთვის
retry დაყოვნება, შემდეგ `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` env, შემდეგ კი
მასშტაბირებული backoff. ავტომატური რეჟიმი ველს შლის. ეს გავლენას ახდენს მხოლოდ rate-limit მიზეზზე
და არასდროს — ტერმინალურ მდგომარეობებზე.

**Anti-thundering-herd დამცავი მექანიზმი:** ხელს უშლის ერთდროული შეცდომების შედეგად cooldown-ის
ზედმეტად გახანგრძლივებას ან `backoffLevel`-ის ორმაგ გაზრდას.

**Concurrency-limit 429-ები backoff-ის კიბეზე არ ადის.** `429`, რომლის body-ც concurrency-ის
ლიმიტზე მიუთითებს ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), ნიშნავს, რომ ანგარიში ჯანმრთელია, მაგრამ დაკავებულია.
`checkFallbackError()` აბრუნებს `concurrency_limited` მიზეზს: დაუყოვნებლივ გადადის შემდეგ
კავშირზე, ამ კავშირს cooldown-ს უწესებს ფიქსირებული `CONCURRENCY_LIMIT_COOLDOWN_MS`-ით (1s)
ან upstream-ის retry მინიშნებით, `backoffLevel`-ს უცვლელს ტოვებს და ადგენს
`skipProviderBreaker`-ს. მკაფიო quota body-ს კვლავ უპირატესობა აქვს, ამიტომ body, რომელიც
quota-ს ნიმუშსაც ემთხვევა, quota-ს ვერდიქტად რჩება. აღმოჩენა: `looksLikeConcurrencyLimit()`-ში
`src/shared/utils/classify429.ts`; ვერდიქტი: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()`-ის (breaker-ის `FailureKind`) ქცევა უცვლელია და ასეთი body-ებისთვის კვლავ
`rate_limit`-ს კითხულობს.

**Stream-ის content stall-ები ანგარიშს cooldown-ს არ უწესებს.** როდესაც content-stall watchdog
(`open-sse/utils/streamHandler.ts`) უარს ამბობს stream-ზე, რომელმაც დროულად model output არ
გაგზავნა, `markAccountUnavailable()` კავშირზე შეცდომას აფიქსირებს, მაგრამ cooldown-ს არ ადგენს:
stall კონკრეტულ request-ს ეკუთვნის და ყველაზე ხშირად ხანგრძლივი reasoning turn-ით არის
გამოწვეული, რომელსაც ჯერ output არ გამოუტანია. ოპერატორებს შეუძლიათ ხელახლა ჩართონ ეს
ქცევა `resilienceSettings.streamStallCooldown.enabled`-ით (ნაგულისხმევად `false`).

**`p2c` ანგარიშის არჩევისთვის latency სიგნალის ჩართვა.** თითოეული dispatch-ებული მცდელობა თითოეული
კავშირისთვის (და თითოეული კავშირისა + model-ის წყვილისთვის) აფიქსირებს მის time-to-first-byte-სა
და შედეგს მეხსიერებაში არსებულ მოძრავ ფანჯარაში: ბოლო 20 ნიმუშს 15 წუთის განმავლობაში
(`open-sse/services/connectionLatencyTracker.ts`, დაფიქსირებული `src/sse/handlers/chatHelpers.ts`-ში
`safeLogEvents()`-იდან). როდესაც `resilienceSettings.p2cLatency.weight` `0`-ზე მეტია
(დიაპაზონი 0-20, ნაგულისხმევი `0` = გამორთული), `src/sse/services/auth.ts`-ში
`compareP2CConnections()` წყვილის თითოეულ კანდიდატს უმატებს მაქსიმუმ `weight` ქულას.
ამის ნახევარი latency-დან მოდის, როგორც უფრო სწრაფ კანდიდატთან შეფარდებიდან (ორჯერ უფრო ნელ
კანდიდატს სრული ნახევარი ენიჭება), ხოლო მეორე ნახევარი — მოძრავი შეცდომების სიხშირიდან.
ეს კომპონენტი გამოიყენება მხოლოდ მაშინ, როდესაც ორივე კანდიდატს მინიმუმ 3 ნიმუში აქვს, ამიტომ
ახალი ანგარიშები არ ჯარიმდება, ხოლო მისი ზედა ზღვარი quota-ით დაბლოკვისა და quota-ს ამოწურვის
ჯარიმებზე დაბალი რჩება. მას საკუთარი circuit არ ემატება: მარცხის მქონე ანგარიშებს კვლავ
cooldown, lockout და breaker-ის ფენები მართავს. დააყენეთ `PATCH /api/resilience`
`{ "p2cLatency": { "weight": 10 } }`-ით.

**Reasoning frame-ები content-stall-ის ბიუჯეტს თავიდან იწყებს.** Reasoning model-ს პირველი
ხილული token-ის გაგზავნამდე შეიძლება რამდენიმე წუთი დასჭირდეს: Claude stream-ავს
`thinking_delta` frame-ებს, რომელთა thinking ტექსტი შეიძლება ცარიელი იყოს, ხოლო Responses API
ერთ reasoning item-ს მეორის მიყოლებით stream-ავს. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) ამ frame-ებს ცნობს და watchdog ყოველ მათგანზე ხელახლა
იწყებს ბიუჯეტის ათვლას, ნაცვლად turn-ის გაუქმებისა. ისინი კვლავ არ წარმოადგენს model output-ს,
ამიტომ მხოლოდ reasoning-ით დასრულებული turn კვლავ ცარიელად დაფიქსირდება, ხოლო turn, რომელიც
reasoning-ს შეწყვეტს და მხოლოდ heartbeats-ს გამოგზავნის, watchdog-ს მაინც აამოქმედებს.

Kiro-ს binary `reasoningContentEvent` frame-ები, რომლებსაც არაცარიელი signature აქვთ, ამ
reasoning აქტივობას executor-ის გავლით ინარჩუნებს ცარიელი `reasoning_content` delta-ს სახით.
signature არ გადაიგზავნება. Metadata, incomplete frame-ები და ცარიელი signature-ები content
budget-ს თავიდან არ იწყებს; დამოუკიდებელი active-stream timeout და client cancellation კვლავ
მოქმედებს (`open-sse/executors/kiro/reasoning.ts`).

**ტერმინალური მდგომარეობები (არა cooldown-ები):**

- `banned` — დგინდება აკრძალული საკვანძო სიტყვის / ანგარიშის დაბლოკვის აღმოჩენით (იხილეთ [BAN_DETECTION](../security/BAN_DETECTION.md)). upstream-ის თითო request-ზე უარყოფები (`request_rejected`, მაგალითად Anthropic OAuth 403 "Request not allowed") მას არასდროს ადგენს: ისინი ითვლება თითოეული კავშირისა და model-ის მიხედვით და ამ model-ს rotation-იდან იღებს მზარდი cooldown-ით, რომლის ზედა ზღვარია `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ან cooldown-ს უწესებს კავშირს, როდესაც model ცნობილი არ არის — `open-sse/services/requestRejectedStreak.ts`
- `expired` (ტერმინალურ მდგომარეობაში გადადის შეზღუდული რაოდენობის retry-ების შემდეგ — `EXPIRED_RETRY_MAX = 3` ექსპონენციური backoff-ით — რათა დროებითმა OAuth შეცდომებმა შეძლონ თვითაღდგენა, სანამ ანგარიში სამუდამოდ დეაქტივირდება)
- `credits_exhausted`

ეს მდგომარეობები ნარჩუნდება მანამ, სანამ ავტორიზაციის მონაცემები არ შეიცვლება ან ოპერატორი მათ არ გაანულებს. დროებითი cooldown-ის მდგომარეობით ტერმინალური მდგომარეობები არ უნდა გადაიწეროს.

**ზარმაცი აღდგენა:** როდესაც `rateLimitedUntil` წარსულშია, კავშირი კვლავ ხელმისაწვდომი ხდება. წარმატებული გამოყენებისას `clearAccountError()` შეცდომის ყველა ველს ასუფთავებს.

### Claude OAuth-ის გამოყენების ლიმიტი: დაბალი პრიორიტეტის არხი + სესიის ლიმიტის განულება

**ფარგლები:** ერთი Claude-ის გამოწერის (OAuth) კავშირი. ორივე ფუნქცია არის **ჩასართავი თითოეულ კავშირზე ცალ-ცალკე** (კავშირის რედაქტირება → Claude-ის სექცია → `providerSpecificData`-ში `lowPriorityMode` / `autoLimitReset`, ორივე ნაგულისხმევად გამორთულია) და იმეორებს Claude Code-ის `/low-priority` და `/limit-reset` ბრძანებებს (wire-კონტრაქტი მიღებულია Claude Code 2.1.263-დან).

**იმპლემენტაცია:**

- მდგომარეობათა მანქანა + პასუხების კლასიფიკაცია: `open-sse/services/claudeLowPriority.ts`
- განულების სტატუსის/claim-ის კლიენტი: `open-sse/services/claudeLimitReset.ts`
- Executor-ის hook (ჰედერის დამატება + იმავე ანგარიშზე ხელახალი მცდელობა): `open-sse/executors/base.ts::execute()`
- არჩევითი ჩართვის შენახვა: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ტრიგერი:** 5-საათიანი გამოყენების ლიმიტი — `429`, რომლის ჰედერებში არის
`anthropic-ratelimit-unified-status: rejected` და, როდესაც ანგარიში შესაფერისია,
`anthropic-ratelimit-unified-slow-offer: treatment`. ამ პირველი ლიმიტის `429`-მდე არაფერი იგზავნება; unified ჰედერების გარეშე მიღებული burst `429` ჩვეულებრივი cooldown-ის გზას გადის.

**დაბალი პრიორიტეტის არხი** (`lowPriorityMode`):

- ლიმიტის `429`-ის დროს executor იღებს შეთავაზებას და დაუყოვნებლივ იმეორებს მცდელობას **იმავე** ანგარიშით `anthropic-usage-limit: slow`-ის გამოყენებით; არხი აქტიური რჩება გამოცხადებულ `anthropic-ratelimit-unified-reset`-მდე (+60 წმ grace პერიოდი) და ამ ფანჯარაში ყოველი მოთხოვნა შეიცავს ამ ჰედერს. დაჭერილი `429` არასოდეს აღწევს `handleChatCore`-მდე, ამიტომ კავშირი **არ** გადადის cooldown-ში და მისგან სხვა კავშირზე გადართვა არ ხდება.
- `anthropic-ratelimit-unified-slow-status` მოგვიანებით მიღებულ პასუხებში: `active` / `not_needed` არხს აქტიურად ტოვებს; `slot_busy` (`429`) ან `529` ელოდება სერვერის მიერ მითითებულ `anthropic-ratelimit-unified-slow-retry-after`-ს (ნაგულისხმევად 20 წმ, შეზღუდვა 5–600 წმ, ±30% jitter) და შემდეგ იმეორებს მცდელობას. ეს შეზღუდულია `anthropic-ratelimit-unified-slow-max-wait`-ით (ნაგულისხმევად 20 წთ, შეზღუდვა 1 წთ–6 სთ) — ამის გასვლის შემდეგ არხი სრულდება და 10-წუთიანი cool-off პერიოდი ხელახლა მიღებას ბლოკავს. ლოდინი დამატებით იზღუდება მოთხოვნის საკუთარი upstream-start timeout-ის დარჩენილი დროით (`resolveFetchStartTimeout`, ნაგულისხმევად 10 წთ), გამოკლებული 5 წმ: ამ შეზღუდვის გარეშე 20-წუთიანი ნაგულისხმევი max-wait მოთხოვნას გადააჭარბებდა და ძილის პერიოდი შუაში შეწყდებოდა, რის შედეგადაც graceful `max_wait`-ის დასრულებისა და cool-off-ის ნაცვლად `TimeoutError` გამოჩნდებოდა.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-საათიანი ფანჯრის გადატრიალება ან `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (რაც მას ნებისმიერი სტატუსის დროს `extra_usage`-ით ასრულებს, რადგან ფასიანი overage ახლა უკვე ფარავს ლიმიტს) არხს ასრულებს; ამის შემდეგ პასუხი ჩვეულებრივ cooldown-ის გზაზე გადადის. `budget_exhausted` დამახსოვრებული რჩება გამოცხადებულ ბიუჯეტის განულებამდე (≤ 8 დღე).
- ლიმიტის შემოწმება executor-ის მიერ 400-ზე დაფუძნებული, მცდელობის შიგნით შესრულებული ხელახალი მცდელობების (კონტექსტის რედაქტირება, thinking/effort-ის შეზღუდვები, პარამეტრების ავტომატური სწავლა) შემდეგ იშვება, ამიტომ ერთ-ერთი ასეთი ხელახალი მცდელობისას პირველად გამოვლენილი ლიმიტის `429` მაინც ჩაიჭრება და cooldown-ის გზაზე არ გადავა.
- მდგომარეობა თითოეული კავშირისთვის მეხსიერებაში ინახება (გადატვირთვის შემდეგ ხელახლა მისაღებად ერთი დამატებითი ლიმიტის `429` არის საჭირო).

**სესიის ლიმიტის განულება** (`autoLimitReset`, ორივე ფუნქციის ჩართვისას არხზე ადრე მოწმდება):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ბლოკი; როდესაც `arm: "reset"` და `available: true` არის,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` `{ "program": "juniper_tide" }`-ით (ორგანიზაციის UUID `providerSpecificData.organizationUUID`-დან, bootstrap fallback-ით).
- `result: reset|not_limited` → მოთხოვნა სრული სიჩქარით მეორდება (slow ჰედერის გარეშე). `already_used` / `not_offered` იმახსოვრებს `next_available_at`-ს (ნაგულისხმევად ერთი კვირა); ნებისმიერი წარუმატებლობა 15 წუთით აჩერებს განმეორებით მცდელობებს. განულება კვირაში ერთხელ ხდება და კვლავ ითვლება ყოველკვირეულ ლიმიტში.

რეგრესიისგან დამცავი ტესტები: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### სესიის აფინურობა (#7274)

**ფარგლები:** ერთი კლიენტის სესია (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ჰედერი) მიბმულია ერთ კავშირზე, **ნებისმიერი** პროვაიდერისთვის.

**მიზანი:** მრავალturn-იანი აგენტის (Claude Code, aider, custom agents) ერთი და იმავე ანგარიშზე შენარჩუნება მოთხოვნებს შორის, რაც ამცირებს პროვაიდერებზე, რომლებსაც ანგარიშზე სესიის მდგომარეობა აქვთ, ანგარიშებს შორის კონტექსტის დაკარგვასა და განმეორებით cold-start `429`-ებს.

**იმპლემენტაცია:**

- TTL-ის განსაზღვრა: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- pin-ის არჩევა/შექმნა: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ჰედერის ამოღება (ზოგადი, ნებისმიერი პროვაიდერისთვის): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- შენახული pin-ის ცხრილი: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- პარამეტრი: `sessionAffinityTtlMs` (გლობალური TTL მილიწამებში, `0` გამორთავს) — `src/lib/db/settings.ts`. Codex-ისთვის განკუთვნილი `codexSessionAffinityTtlMs` გადარქმეულია `124_generic_session_affinity_ttl.sql` მიგრაციით, რომელიც ადრე კონფიგურირებულ Codex TTL-ს ახალ ნაგულისხმევ მნიშვნელობად გადაიტანს.

#7274-მდე `resolveSessionAffinityTtlMs()` ყველა პროვაიდერისთვის, `codex`-ის გარდა, დაუყოვნებლივ აბრუნებდა `0`-ს, ამიტომ TTL-ის პარამეტრი (და სესიის ჰედერები) სხვაგან არსად მოქმედებდა, მიუხედავად იმისა, რომ pinning-ის მექანიზმი და ჰედერების ამოღება უკვე პროვაიდერისგან დამოუკიდებელი იყო. შესწორებამ ეს ადრეული დაბრუნება მოხსნა; TTL ახლა ყველა პროვაიდერზე ერთნაირად ვრცელდება, როგორც კი გლობალურად `0`-ზე მეტი მნიშვნელობა მიენიჭება.

სესიის აფინურობის სამი ჰედერი upstream-ზე არასოდეს გადაიგზავნება — executor-ები საკუთარ upstream ჰედერებს თავიდან ქმნიან და კლიენტის ჰედერებს პირდაპირ არ გადასცემენ, ამიტომ ეს მხოლოდ შიდა კორელაციის იდენტიფიკატორად რჩება.

### ექსკლუზიური, მართული სესიის კავშირის ლიზინგი

**ფარგლები:** ერთი აქტიური მართული HTTP კლიენტი/სესია ფლობს ერთ შესაბამის OmniRoute კავშირს.

**მიზანი:** უზრუნველყოს კავშირის მდგრადი ექსკლუზიური ფლობა კლიენტებისთვის, რომლებსაც მოთხოვნებს შორის მარშრუტიზაციის მკაცრი ზღუდე სჭირდებათ. ეს განსხვავდება სესიის აფინურობისგან, რომელიც უწყვეტობის რბილი უპირატესობაა:
ექსკლუზიური იჯარა SQLite-ში ინარჩუნებს სიცოცხლის ციკლის მდგომარეობას, უზრუნველყოფს აქტიური მფლობელისა და
აქტიური კავშირის გლობალურ უნიკალურობას და პროვაიდერთან დისპეტჩერიზაციამდე უარყოფს მოძველებულ გენერაციას.

ფუნქცია თითოეული API გასაღებისთვის ცალკე უნდა იყოს ჩართული. მართულ გასაღებს უნდა ჰქონდეს `lease:exclusive` scope და
აშკარად მითითებული, არაცარიელი `allowedConnections` სია. სიცოცხლის ციკლის endpoint-ის გამოყენება ნებისმიერ
HTTP კლიენტს შეუძლია; კლიენტის სახელი, user-agent, პროვაიდერი, OAuth მეთოდი ან მოდელი საჭირო არ არის. იჯარა ფლობს კავშირს,
არა მოდელს, ამიტომ მოდელის ცვლილება კავშირის მიბმას ინარჩუნებს, სანამ კავშირი ჩვეულებრივად შესაბამისია. მოდელის,
კვოტის, ჯანმრთელობის მდგომარეობის, cooldown-ისა და allowlist-ის ჩვეულებრივი წესები კვლავ ავტორიტეტულია და შეიძლება
იგივე გენერაცია სხვა თავისუფალ, შესაბამის კავშირზე გადაიყვანოს.

სიცოცხლის ციკლი არის `POST /api/v1/session-leases`, JSON მოქმედებებით `acquire`, `renew` და `release`.
მართული inference-ის მოთხოვნები აგზავნის გაუმჭვირვალე `X-OmniRoute-Lease-Owner` მნიშვნელობას და ზუსტ
`X-OmniRoute-Lease-Generation`-ს. მფლობელი იწყება `vlo_`-ით და მას მოსდევს 43 base64url სიმბოლო; ინახება
მხოლოდ მისი SHA-256 ჰეში. ყოველი საბოლოო დისპეტჩერიზაციის ზღუდე ასევე აკავშირებს ავთენტიფიცირებული API გასაღების ID-სა და
აქტიური კავშირის ID-ს. იჯარის მართვის ჰედერები იშლება ჟურნალებიდან, შენახული მოთხოვნების snapshot-ებიდან და
upstream executor-ის ჰედერებიდან.

თუ ჩვეულებრივ მარშრუტიზაციას ჰყავს შესაბამისი მართული კანდიდატები, მაგრამ ყველა თავისუფალი კანდიდატი დაკავებულია
უცხო აქტიური იჯარით, OmniRoute აბრუნებს HTTP `429`-ს, `lease-capacity-unavailable` კოდს, `waiting-for-capacity`
მდგომარეობას და შეზღუდულ `Retry-After` მნიშვნელობას, რომელიც გამოითვლება ყველაზე ადრეული შესაბამისი ვადის გასვლის
დროიდან. ჩვეულებრივი ცარიელი შესაბამისობა არ არის იჯარის კონტენცია და ინარჩუნებს მარშრუტიზაციის შეცდომის არსებულ
სემანტიკას.

დაკავშირებული მექანიზმები ცალკე რჩება:

- OAuth სესიის დაკავება არის პროცესის ფარგლებში მოქმედი რბილი განაწილება OAuth ანგარიშებისთვის.
- ანგარიშის სემაფორები გასცემს მოთხოვნის კონკურენტულობის ნებართვებს და სრულდება მოთხოვნის დასრულებისას.
- ექსკლუზიური მართული სესიის იჯარები არის სიცოცხლის ციკლის მდგრადი ფლობა გენერაციის ზღუდით.

## 3. მოდელის ლოკაუტი

**მოქმედების არე:** provider + connection + model სამეული.

**გასაღების არე სტატუსის მიხედვით:** წარუმატებელი სტატუსი განსაზღვრავს, რომელ გასაღებზე იწერება ლოკაუტი
(`resolveLockoutScope()` ფაილში `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — კვოტის ან უფლებამოსილების სიგნალი — ბლოკავს **კვოტის ოჯახს**:
  codex-ისთვის მთელ `codex` / `spark` არეს (კავშირის ყველა `gpt-5*` მოდელს),
  სხვა პროვაიდერებისთვის `getQuotaScopedModelForProvider()`.
- `404` ბლოკავს თავად მოდელს (`getModelLockKey()` ავიწროებს `not_found`-ს).
- ნებისმიერი სხვა სტატუსი — `5xx` ტრანსპორტის/სერვერის შეცდომები და OmniRoute-ის საკუთარი
  სინთეზირებული `502` ხარისხის ვალიდაციიდან — ბლოკავს მხოლოდ **ზუსტ**
  provider/connection/model სამეულს. ერთ მოდელზე ცუდი სტრიმი არ არის ანგარიშის
  კვოტის მტკიცებულება; ამ წესამდე ერთმა ცარიელმა პასუხმა `codex/gpt-5.6-luna`-ზე
  2–30 წუთით (ესკალაციურად) ამოიღო მარშრუტიზაციიდან ამ კავშირის ყველა `gpt-5*`
  მოდელი, მაშინ როცა მისი კვოტა ხელუხლებელი იყო.
- გამომძახებლის აშკარა `scope` ოფცია ყოველთვის იგებს (Antigravity გადასცემს `"exact"`-ს).

**მიზანი:** თავიდან ავიცილოთ მთელი კავშირის გამორთვა, როცა მხოლოდ ერთი მოდელია მიუწვდომელი ან კვოტით შეზღუდული.

**მაგალითები:**

- თითო მოდელის კვოტის მქონე პროვაიდერები, რომლებიც აბრუნებენ 429-ს
- ლოკალური პროვაიდერები, რომლებიც აბრუნებენ 404-ს ერთი დაკარგული მოდელისთვის
- პროვაიდერზე სპეციფიკური რეჟიმის/მოდელის ნებართვის შეცდომები (მაგ., Grok-ის რეჟიმები)

**იმპლემენტაცია:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### მოდელის ქულდაუნების დაფა (v3.8.0)

UI: პარამეტრები → მოდელის ქულდაუნები (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

აჩვენებს აქტიურ ლოკაუტებს: provider, connection, model, reason, expiresAt. ოპერატორებს შეუძლიათ მოდელის ხელით ხელახლა ჩართვა ბარათიდან.

**REST API:**

- `GET /api/resilience/model-cooldowns` — აქტიური ლოკაუტების სია
- `DELETE /api/resilience/model-cooldowns` — ხელით ხელახლა ჩართვა. სხეული: `{provider, connection, model}`. ავტორიზაცია: management.

### ქულდაუნების მენეჯერი

UI: მონიტორინგი → ქულდაუნების მენეჯერი (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

ერთი გვერდი ყველა კავშირისთვის, რომელიც დროებითი მიზეზითაა მარშრუტიზაციის გარეთ,
თითოეული პროვაიდერის გვერდის ცალ-ცალკე გახსნის ნაცვლად. ის აჩვენებს კავშირის
ქულდაუნებს, მოდელის ლოკაუტებსა და ტერმინალურ მდგომარეობებს, ასუფთავებს მათ
თითო კავშირისთვის, მონიშნულისთვის ან პროვაიდერის ყველა კავშირისთვის და
არედაქტირებს ყველაზე ხშირად რეგულირებად ქულდაუნის წესებს: `streamStallCooldown.enabled`
და OAuth / API-key `connectionCooldown` საბაზისო ქულდაუნსა და მაქსიმალურ backoff
ნაბიჯებს (ინახება `PATCH /api/resilience`-ით). ტერმინალური მდგომარეობები (`banned`,
`expired`, `credits_exhausted`) ჩამოთვლილია, მაგრამ აქ არასდროს სუფთავდება.

**REST API** (`src/lib/resilience/cooldownManager.ts`, ავტორიზაცია: management):

- `GET /api/resilience/cooldowns[?provider=]` — კავშირები სტატუსით, დარჩენილი ქულდაუნით,
  backoff დონით, ბოლო შეცდომის ტიპითა და მოდელის ლოკაუტებით (მორწმუნებების გარეშე)
- `POST /api/resilience/cooldowns` — სხეული `{connectionIds: string[]}` ან
  `{all: true, provider?}`; აბრუნებს `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### ლოკაუტის პარამეტრების UI + აღდგენა წარმატებით დაცემით (v3.8.23)

მოდელის ლოკაუტი ყოველთვის ჩართული, ჰარდკოდირებული ქცევიდან გადავიდა სრულად
კონფიგურირებად, opt-in ფუნქციად საკუთარი პარამეტრების ბარათითა და თვითგანკურნებადი
აღდგენის გზით.

**პარამეტრების ბარათი:** პარამეტრები → მოდელის ლოკაუტი
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ეს **განსხვავებულია** ზემოთ მოყვანილი მხოლოდ-წაკითხვადი `ModelCooldownsCard`-ისგან
(რომელიც მხოლოდ _აჩვენებს_ აქტიურ ლოკაუტებს) — ახალი ბარათი _აკონფიგურირებს
პარამეტრებს_. ნაგულისხმევი მნიშვნელობები მდებარეობს `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ში
(`src/lib/resilience/modelLockoutSettings.ts`):

| პარამეტრი               | ნაგულისხმევი                     | მნიშვნელობა                                                         |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `enabled`               | `false`                          | მთავარი გადამრთველი — მოდელის ლოკაუტი **ნაგულისხმევად გამორთულია**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | აღმავალი სტატუსები, რომლებიც ითვლება მოდელის მასშტაბის შეცდომად.    |
| `baseCooldownMs`        | `120_000` (120 წმ)               | საწყისი ლოკაუტის ხანგრძლივობა პირველ შეცდომაზე.                     |
| `maxCooldownMs`         | `1_800_000` (30 წთ)              | ესკალირებული ქულდაუნის ზედა ზღვარი.                                 |
| `maxBackoffSteps`       | `10`                             | ექსპონენციური backoff-ის ესკალაციის მაქსიმალური ნაბიჯები.           |
| `useExponentialBackoff` | `true`                           | განმეორებადი შეცდომები ექსპონენციურად უმატებს თუ არა ქულდაუნს.      |

პარამეტრები ინახება ჩვეულებრივი პარამეტრების საცავით და ვალიდდება resilience-ის
პარამეტრების სქემით; ბარათი ზღუდავს `baseCooldownMs`/`maxCooldownMs`-ს
(`maxCooldownMs ≥ baseCooldownMs` პირობით) და `maxBackoffSteps`-ს.

**აღდგენა წარმატებით დაცემით:** აღდგენა **არ არის** მხოლოდ ტაიმერის ამოწურვა.
ჯანსაღი პასუხი უკან დააბრუნებს მოდელის შეცდომების რიცხვს, ისე რომ ფანჯარის შუაში
აღდგენილი მოდელი წყვეტს ესკალაციას (და სუფთავდება) ტაიმერის ამოწურვამდე.
combo სამიზნის წარმატებაზე `open-sse/services/combo.ts` იძახებს
`decayModelFailureCount()`-ს (`open-sse/services/accountFallback.ts`), რომელიც
**ნახევრებს** შენახულ `failureCount`-ს (`Math.floor(failureCount / 2)`); როცა ის
`0`-ს მიაღწევს, ლოკაუტის ჩანაწერი მთლიანად იშლება. მისი წყვილი
`recordModelLockoutFailure()` ზრდის რიცხვს (და უმატებს ქულდაუნს) ესკალაციის
ფანჯარაში მოხვედრილ შეცდომებზე. ეს წარმატებითი დაცემა ემატება ტაიმერის
ჩვეულებრივ ამოწურვას — ორივე გზით შეიძლება მოდელის ხელახლა ჩართვა.

**მდგომარეობა:** ლოკაუტები ინახება **მეხსიერებაში** (თითო პროცესის `Map`-ები
`ModelLockoutEntry`-ებით, გასაღებით `provider:connectionId:model`, exact-მასშტაბის
ბლოკირებები — `provider:connectionId:exact:model`-ით) და არ ინახება
მონაცემთა ბაზაში — ისინი გადატვირთვისას იკარგება. _პარამეტრები_ ინახება მუდმივად;
აქტიური ლოკაუტის _მდგომარეობა_ ეფემერულია.

---

## 4. Quota-Share-ის კონკურენტულობის კონტროლი (v3.8.36)

გამოწერაზე დაფუძნებული ანგარიშები (GLM, MiniMax და სხვ.) ხშირად იღებენ მხოლოდ ~1–3 ერთდროულ მოთხოვნას; ლიმიტის გადაჭარბება იწვევს 429 შეცდომებსა და გაგრილების პერიოდებს. ეს განსაკუთრებით მწვავეა **quota-share** (`qtSd/…`) კომბოებში, სადაც რამდენიმე API გასაღები ერთ ზედა დონის ანგარიშს იყენებს. სამი შრე იცავს გაზიარებულ ანგარიშს გადატვირთვისგან.

### თითოეული კავშირის კონკურენტულობის ლიმიტი (`max_concurrent`)

თითოეულ პროვაიდერის კავშირს შეუძლია გამოაცხადოს `max_concurrent` ზღვარი
(`provider_connections.max_concurrent`, რომელიც დაყენებულია კავშირის მოდალში / API-ში / DB-ში).
დატოვეთ ცარიელი, თუ ლიმიტი არ გსურთ. ეს არის ერთადერთი პარამეტრი, რომელიც მართავს ქვემოთ აღწერილ სერიალიზაციის შრეს — მიუთითეთ ანგარიშის რეალური კონკურენტულობა (მაგ., GLM ~1, MiniMax ~2).

### თითოეული მოდელის კონკურენტულობის ლიმიტები (`modelConcurrency`)

კავშირს დამატებით შეუძლია გამოაცხადოს ზუსტი, თითოეულ მოდელზე მოქმედი კონკურენტულობის ზღვარი `rateLimitOverrides` რუკაში:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

დააყენეთ ის კავშირის მოდალში (**Rate limit overrides → Per-model
concurrency caps**, თითო ხაზზე ერთი `model=cap`) ან
`PATCH /api/providers/[id]`-ის საშუალებით, იმავე JSON სტრუქტურით. ძირითადი სემანტიკა:

- **კავშირის მასშტაბის vs მოდელზე სპეციფიკური:** `maxConcurrent` კვლავ წარმოადგენს საერთო, კავშირის მასშტაბის ზღვარს. როდესაც ორივე მოქმედებს, ორივე ბლოკერი ატომურად მიიღება ერთსა და იმავე კომპოზიტურ ბლოკერში
  (`global → provider → account → model`); ეფექტური ქცევა განისაზღვრება მოქმედ ლიმიტებს შორის უფრო მკაცრი შეზღუდვით.
- **მოდელის გასაღების ზუსტი დამთხვევა:** გასაღები არის მოდელის სტრიქონი, რომელიც ეგზეკუტორს გადაეცემა მარშრუტიზაციის გადაწყვეტის შემდეგ — ჩვეულებრივ, ზედა დონის მოდელის მარტივი იდენტიფიკატორი (`glm-5`), და არა კლიენტის მხარეს არსებული `provider/model` ფსევდონიმი (`zai/glm-5` არ დაემთხვევა `glm-5`-ს). მნიშვნელობები წარმოადგენს ერთდროული მოთხოვნების დადებით, მთელრიცხოვან ზღვარს.
- **ლოკალური რიგი, აღმოჩენის გარეშე:** ჭარბი მოთხოვნები ადგილობრივად რიგში დგება არსებული რიგისა და ტაიმაუტის სემანტიკით (ტიპიზებული `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` მიღების შეცდომები). OmniRoute არ აღმოაჩენს და არ ასკვნის ზედა დონის პოლიტიკას — ის აღასრულებს ოპერატორის მიერ კონფიგურირებულ ზუსტ ლიმიტებს. გადავსებული მოდელის ბლოკერი არასოდეს თიშავს პროვაიდერს და არასოდეს ქმნის მოდელის მუდმივ დაბლოკვას; ზედა დონის 429 / გაგრილების / ფოლბექის ქცევა კვლავ რჩება შეცდომების დამცავ მექანიზმად.
- **თითოეული კავშირისა და პროცესის მასშტაბი:** ლიმიტები მოქმედებს თითოეულ მონაცემთა ბაზის კავშირზე და ინახება მეხსიერებაში, ამიტომ ერთი და იმავე ზედა დონის API გასაღების ხელახლა გამომყენებელი ორი კავშირი ერთმანეთთან კოორდინაციას არ ახდენს.
- **არაკონფიგურირებული ნიშნავს უცვლელს:** რუკის გამოტოვება (ან დაფის ველის ცარიელი დატოვება) მოდელის ბლოკერს არ ამატებს. კონფიგურაციის მაგალითი, რომელიც პროვაიდერის რაიმე უნივერსალურ ლიმიტს არ ამტკიცებს:

```text
glm-5=1
glm-4.7=3
```

### Quota-share მოთხოვნების სერიალიზაცია

როდესაც quota-share დისპეტჩერიზაცია მიზნად ისახავს კავშირს, რომელსაც დადებითი
`max_concurrent` აქვს, ამ **ანგარიშზე** ერთდროული მოთხოვნები სერიალიზდება თითოეულ კავშირზე არსებული სემაფორის საშუალებით (გასაღები `qsconn:<connectionId>`): ჭარბი მოთხოვნები **რიგში ელოდება**, ანგარიშის გადატვირთვის ნაცვლად. ეს არის **fail-open** — რიგის გადავსების ან ტაიმაუტის შემთხვევაში პროცესი სლოტის გარეშე გრძელდება და დისპეტჩერიზაციისთვის შესაძლო მოთხოვნა არასოდეს უარყოფილია. ჩართვა/გამორთვა შესაძლებელია **Settings → Resilience → Quota-share per-connection
concurrency**-ში (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ნაგულისხმევად ჩართულია). `max_concurrent` ლიმიტის გარეშე ქცევა უცვლელი რჩება.

> quota-share მარშრუტიზაციის ბლოკერი (`selectQuotaShareTarget`, DRR + P2C) თავად
> არის fail-open და მხოლოდ _ამცირებს პრიორიტეტს_ ლიმიტს მიღწეულ კავშირზე — ერთი
> კავშირის მქონე პულში მას მკაცრი ლიმიტის დაწესება არ შეუძლია, ამიტომ სემაფორი
> რეალურად ზღუდავს გადატვირთვას.

### კომბოს გაგრილებაზე დამოკიდებული ხელახალი ცდა

ყოველი კომბოს სტრატეგიისთვის (როდესაც ჩართულია), მოთხოვნა, რომელიც მოკლე გარდამავალი გაგრილების პერიოდში 429-ს გამოიწვევდა, ელოდება ამ პერიოდის გასვლას და ხელახლა იგზავნება, ნაცვლად იმისა, რომ 429 დააბრუნოს — ეს მოიცავს Gemini-ს კლასის TPM/RPM ფანჯრებს (~60 წმ retry-after) მრავალმოდელურ კომბოებზე, მაგალითად, როდესაც 2-მოდელიანი კომბოს ორივე სამიზნე თითოეულ მოდელზე მოქმედ ლიმიტს აწყდება. კონტროლდება `comboCooldownWait`-ით (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) **Settings → Resilience**-ში. ის არასოდეს ელოდება `quota_exhausted`-ს (შუაღამემდე ჩაკეტილს) ან ავტორიზაციის/ვერ-მიგნების მიზეზებს.

კომბოს შეუძლია გამორთოს ეს ფუნქცია `config.comboCooldownWaitEnabled: false`-ით. მხოლოდ პირდაპირი `false` თიშავს ამ გაზიარებულ კომბოს ლოდინებს (დისპეტჩერიზაციის შემდგომ გაგრილებას და დისპეტჩერიზაციამდე წრედის ღია/მოდელის დაბლოკვის ლოდინებს) და მათი ლოდინის ბიუჯეტით ტაიმაუტის ქვედა ზღვრის გაფართოებას. გამოტოვებული ან `true` ინარჩუნებს გლობალურ პოლიტიკას; `true` ვერ ჩართავს გლობალურად გამორთულ ლოდინს. აშკარად მითითებულ `targetTimeoutMs`-ს კვლავ უპირატესობა აქვს. ეს გამორთვა არ ცვლის ცალკე native-Codex-ის turn-pin დისპეტჩერიზაციამდე ლოდინს.

იგივე ბლოკერი მოიცავს დისპეტჩერიზაციამდე შემთხვევას (#16319): როდესაც კომბოს ყველა სამიზნე გამოტოვებულია პირველივე მცდელობის დაწყებამდე, რადგან მისი მოდელი მოკლე გარდამავალ დაბლოკვაში იმყოფება, ნულოვანი მცდელობის გზა ელოდება დაბლოკვის დასრულებას იმავე ზღვრული პირობებით და ხელახლა ახორციელებს დისპეტჩერიზაციას, ნაცვლად იმისა, რომ მინიშნების გარეშე `503 ALL_TARGETS_SKIPPED` დააბრუნოს. როდესაც ლოდინი დაუშვებელია (ზღვარი, მცდელობების რაოდენობა ან ბიუჯეტი ამოწურულია, ან ფუნქცია გამორთულია), საბოლოო პასუხი იცვლება `429 rate_limit_error`-ად და შეიცავს `retry_after` / `reset_at` მნიშვნელობებს, რომლებიც აღებულია გარდამავალი დაბლოკვის ყველაზე ადრეული ვადის ამოწურვიდან; კვოტის, ავტორიზაციისა და ვერ-მიგნების დაბლოკვები კვლავ ტოვებს მინიშნების გარეშე 503-ს.

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

## 5. მოთხოვნების რიგში დაშვების კონტროლი (v3.8.49 · საკითხი #6593)

**მოქმედების არეალი**: ლოკალური, თითოეული პროვაიდერისა და კავშირის მიხედვით განსაზღვრული სიხშირის შეზღუდვის რიგი (`open-sse/services/rateLimitManager.ts`,
რომელსაც საფუძვლად Bottleneck უდევს), ზემოთ აღწერილ სამ მექანიზმზე ერთი დონით ქვემოთ.

**`maxWaitMs` ზღუდავს რიგში ლოდინს; `executionMaxWaitMs` ზღუდავს შესრულებას.**
ეს ორი განზრახ არის განცალკევებული და არცერთი არ ახდენს გავლენას მეორეზე.

`resilienceSettings.requestQueue.maxWaitMs` არის **რიგში ლოდინის ბიუჯეტი**: ის
მოიცავს პროვაიდერის სლოტის მოლოდინს და შემდეგ QUEUED მდგომარეობაში ყოფნას, ხოლო
მისი ტაიმერი უქმდება იმავე წამს, როდესაც დავალება ტოვებს QUEUED მდგომარეობას და
შესრულებას იწყებს (`rateLimitManager.ts`, `wrappedFn`). მოთხოვნა, რომელიც ამ
ზღვარს გადააჭარბებს, ზედა დონის სერვისამდე ვერასოდეს მიაღწევს. ნაგულისხმევი
მნიშვნელობაა 30000ms, რომელსაც `src/lib/resilience/settings.ts`-ში
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` აწვდის და
`tests/unit/ratelimit-admission-control-6593.test.ts` აფიქსირებს, ამიტომ მისი
შეცვლა ამ ტესტს გააწითლებს და ეს აბზაცი შეუმჩნევლად მოძველებული არ დარჩება.

`resilienceSettings.requestQueue.executionMaxWaitMs` არის მნიშვნელობა, რომელსაც
Bottleneck დავალების `expiration` პარამეტრად იღებს და რომლის ტაიმერიც მხოლოდ
გაგზავნის შემდეგ იწყება. ის დამცავი ზღვარია იმ შემსრულებლებისთვის, რომლებსაც
ზედა დონის სერვისისთვის საკუთარი ტაიმაუტი არ აქვთ, და იზრდება შემსრულებლის
საკუთარ fetch-ის დაწყების ტაიმაუტამდე, როდესაც ეს უკანასკნელი უფრო ხანგრძლივია,
ამიტომ ვერ შეწყვეტს გამართულ, უკვე მიმდინარე პასუხს. ნაგულისხმევი მნიშვნელობაა
600000ms (10 წთ).

რიგის ბიუჯეტის `expiration`-ისთვის გადაცემა ადრე არაინკრემენტულ გეითვეებს
შესრულების შუაში წყვეტდა — მათ პირველი ბაიტების გამოგზავნამდე კანონიერად
შეიძლება რამდენიმე წუთი დასჭირდეთ — და სწორედ ამიტომ გამოჩნდება ვადის ამოწურვა,
როგორც `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), ხოლო რიგის ბიუჯეტი რიგის ტაიმაუტის
კოდს ატარებს. ორივე შეგიძლიათ ჩაანაცვლოთ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS`-ის (გარემოს ცვლადები) ან მართვის პანელის
(**პარამეტრები → მდგრადობა**) მეშვეობით. ნორმალიზებისას ორივე იზღუდება
1ms–24h დიაპაზონით.

**პრიორიტეტი ორივესთვის:** გარემოს ცვლადი მხოლოდ _ნაგულისხმევ_ მნიშვნელობას
აწვდის. `resilienceSettings.requestQueue`-ში შენახული მნიშვნელობა (მართვის
პანელი / API-ის ნაწილობრივი განახლება, შენახული `key_value`-ში) მასზე
უპირატესია, ხოლო კონკრეტული კავშირის
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` მნიშვნელობა ორივეზე
უპირატესია. შესაბამისად, გარემოს ცვლადის დაყენება იმ განთავსებაში, სადაც
შენახული მნიშვნელობა უკვე არსებობს, არაფერს შეცვლის — ამის ნაცვლად გაასუფთავეთ
ან განაახლეთ შენახული პარამეტრი.

რიგში ყოფნის ხანგრძლივობას `maxWaitMs` ზღუდავს; ქვემოთ აღწერილი
`maxQueueDepth` კი ზღუდავს, რამდენი გამომძახებელი შეიძლება ერთდროულად იდგეს
რიგში.

**პასუხის სხეულში მითითებული ხელახალი ცდები: ტემპის მართვა და დაბლოკვა.** 429
პასუხის სხეულს შეუძლია თავად მიუთითოს ლოდინის დრო (Gemini
`RetryInfo.retryDelay`, ტექსტი "retry after Ns"), რომელსაც
`updateFromResponseBody` კითხულობს. ლოდინი, რომელიც კავშირის `maxWaitMs`
ზღვარში ეტევა, ტემპის მართვაა: ლიმიტერი ამ დროის განმავლობაში თავის რეზერვუარს
აცარიელებს, ხოლო რიგში მდგომი გამოძახებები რეზერვუარის შევსებისას იგზავნება.
`maxWaitMs`-ზე ხანგრძლივი ლოდინის რიგში გატარება შეუძლებელია — ამოწურული
დღიური კვოტის შემთხვევაში Gemini პასუხობს `retryDelay: "86399s"` მნიშვნელობით.
ხელახლა აგებულ 429 პასუხში (#16528) გადაცემული `Retry-After` უკვე აიძულებს
სარეზერვო მექანიზმს, ამ დროის განმავლობაში მოდელი დაბლოკოს, თუმცა ლიმიტერის
ამავე ხანგრძლივობით შეჩერება მაინც გამოიწვევდა იმას, რომ ნებისმიერი გამოძახება,
რომელიც გასაღებს ნაადრევად მიაღწევს (მაგალითად, მდგრადობის მდგომარეობის
განულების შემდეგ), მთელი `maxWaitMs` პერიოდის განმავლობაში შეფერხდება. როდესაც
ასეთი ლოდინი ტიპიზებული Google `RetryInfo` დეტალიდან მოდის
(`google_rpc_retry_info` წარმოშობით) და გასაღების ლიმიტერი უკვე მოდელის დონეზეა
შემოსაზღვრული (იხილეთ `getLimiterKey`), ამის ნაცვლად 429 ამ კავშირზე მოდელის
დაბლოკვად გარდაიქმნება (`lockModelForLongBodyRetry` ფაილში
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, მაქსიმუმ 24h), ხოლო
ლიმიტერი შეჩერებული არ რჩება. ანგარიშის შერჩევა ამ დაბლოკვას
`isModelLocked()`-ის მეშვეობით გამოტოვებს; იმავე მოქმედებას ასრულებს
კომბინაციის გაგზავნამდელი შემოწმებაც კავშირზე მიმაგრებული სამიზნეებისთვის.
antigravity-ზე, რომლის ლიმიტერიც თითოეული კვოტის ოჯახისთვის ცალკეა, დაბლოკვა
ზუსტ მოდელზე ვრცელდება, ისევე როგორც მისი სხვა კვოტის დაბლოკვები. თუ ალიასმა
კლიენტის მიერ მოთხოვნილი სახელი ამ მოდელზე გარდაქმნა, მოთხოვნილი სახელიც
იბლოკება, რადგან ეს შემოწმებები მოთხოვნილ სახელს იყენებს; ის ზუსტად იბლოკება
(`lockExactModel`), ამიტომ ალიასი, რომელიც antigravity-ის კვოტის ოჯახის ან
codex-ის მოქმედების არეალის საზღვარს კვეთს, საკუთარ თავს არასოდეს ბლოკავს.
ტექსტური მინიშნება, არატიპიზებული `retryDelay` ან მთელი კავშირისთვის
გაზიარებული ლიმიტერი შეჩერებას ინარჩუნებს. როდესაც ლიმიტერი, რომელიც 429-ის
დამუშავების გზამ ახლახან ხელახლა ააგო, მართლაც შეჩერდება, გამომძახებელი,
რომელსაც რიგში დარჩენილი დრო შეჩერების დასრულებამდე ამოეწურება, ლოდინის ნაცვლად
დაუყოვნებლივ უარყოფილი იქნება რიგის ტაიმაუტის კოდით (`checkLimiterPause`);
ჩაწერილი დასრულების დრო ფიქსირდება ლიმიტერის აგებამდე, იმ წერტილში, სადაც
Bottleneck განახლების საათს იწყებს, ხოლო რეზერვუარის ნებისმიერი შემდგომი
ცვლილება მას აუქმებს. ეს დაფარულია
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` და
`tests/unit/rate-limit-body-retry-pause.test.ts` ტესტებით.

**`maxQueueDepth` — დაშვების არჩევითი ზღვარი (ახალი).** `resilienceSettings.requestQueue.maxQueueDepth`
ზღუდავს, რამდენი მოთხოვნა შეიძლება ერთდროულად იდგეს რიგში (ჯერ არ იყოს
გაგზავნილი) ერთი პროვაიდერისა და კავშირისთვის. როდესაც რიგში უკვე
`maxQueueDepth` მოთხოვნაა, ახალი მოთხოვნა სწრაფად უარყოფილი იქნება ტიპიზებული
`code: "RATE_LIMIT_QUEUE_FULL"` შეცდომით **მანამდე**, სანამ ის
`limiter.schedule()`-მდე მიაღწევს — ამიტომ უარყოფა მცირე რესურსს მოითხოვს და
ხდება ამ მოთხოვნისთვის განკუთვნილ ნებისმიერ ქვედა დონის პრომპტის შეკუმშვის /
თარგმნის სამუშაომდე. ნაგულისხმევი `0` = გამორთულია, რაც ინარჩუნებს რიგის
შეუზღუდავი სიგრძის არსებულ ქცევას; დიაპაზონია 0–100000. ჩაანაცვლეთ
`RATE_LIMIT_MAX_QUEUE_DEPTH`-ის (გარემოს ცვლადი) ან
`resilienceSettings.requestQueue.maxQueueDepth`-ის (მართვის პანელი/API-ის
ნაწილობრივი განახლება) მეშვეობით.

დაშვების შემოწმება თავად სუფთა ფუნქციაა
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), ამიტომ
მისი ერთეულოვანი ტესტირება რეალური Bottleneck ლიმიტერის გარეშეა შესაძლებელი.

> RFC-მ, რომელმაც #6593 გახსნა, ასევე შესთავაზა `bypassCompressionOnRateLimit`
> ფლაგი. ამ რეპოზიტორიის `open-sse/services/compression/` პაიპლაინი არის
> prompt-ის/კონტექსტის შეკუმშვა გამავალ LLM მოთხოვნაზე (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ბლოკის მიდამოში),
> და არა HTTP პასუხის შეკუმშვა სინთეზირებულ 429 სხეულებზე — პირდაპირი
> შემოვლის ფლაგისთვის შესაბამისი კოდის ბილიკი არ არსებობს. ეს prompt-შეკუმშვის
> ეტაპი ამჟამად მოთხოვნის პაიპლაინში `withRateLimit()`-ზე _ადრე_ სრულდება,
> ამიტომ მისი ისე გადალაგება, რომ რიგის სისავსის გამო უარყოფაზე გამოიტოვოს,
> ამ issue-ის მოცულობას სცილდება და ცალკე, უფრო დიდი ცვლილებაა; იგი აქ
> განზრახ **არ** განხორციელდა და დარჩენილია სამომავლო ამოცანად — იმ
> შემთხვევისთვის, თუ CPU-ის დაზოგვით მიღებული სარგებელი გადალაგების
> რისკს ღირს.

### ლიმიტების ავტომატური ჩართვის უსაფრთხოების ბადე და კავშირის დაცვა (`rateLimitProtection`)

**ავტომატური ჩართვის უსაფრთხოების ბადე** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ნაგულისხმევი `true`):
ნაგულისხმევად OmniRoute ავტომატურად რთავს ლიმიტების რიგის დაცვას ყველა აქტიური API-გასაღების პროვაიდერის კავშირისთვის (`getProviderCategory(provider) === "apikey"`). ეს უზრუნველყოფს, რომ ლიმიტების მიმართ მგრძნობიარე ამომავალი API გასაღებების მიმართული შემავალი მოთხოვნები რიგში ჩადგეს და Bottleneck-ის საშუალებით დაითრიოს, ვიდრე ამომავალი 429 შეცდომების ფეტქება გამოიწვიოს. უსაფრთხოების ბადის გადაფარვა შესაძლებელია `RATE_LIMIT_AUTO_ENABLE` გარემოს ცვლადით (`false`/`0`/`off` თიშავს, `true`/`1`/`on` იძულებით რთავს), რომელსაც უპირატესობა აქვს დეშბორდში შენახული პარამეტრის მიმართ (**პარამეტრები → მდგრადობა** / `PATCH /api/resilience`).

**თითო კავშირის `rateLimitProtection`-ის სემანტიკა:**
თითო კავშირის ლიმიტების დაცვა რეგისტრირდება პროვაიდერის კავშირებზე არსებული `rateLimitProtection` ლოგიკური ველით (SQLite-ში ინახება როგორც `rate_limit_protection`):

- **განსაზღვრულად ჩართული (`rateLimitProtection === true`)**: ლიმიტების დაცვა ამ კავშირისთვის განსაზღვრულად ჩართულია, მიუხედავად პროვაიდერის კატეგორიისა და იმისა, ჩართულია თუ არა ავტომატური ჩართვის უსაფრთხოების ბადე.
- **განსაზღვრულად გამორთული (`rateLimitProtection === false`)**: თიშავს განსაზღვრულ დაცვას, მაგრამ **არ** გამორიცხავს აქტიურ API-გასაღების კავშირს გლობალური ავტომატური ჩართვის უსაფრთხოების ბადიდან. `reconcileEnabledConnections`-ში (`open-sse/services/rateLimitManager.ts`) `false` და `undefined` ეკვივალენტურია: განსაზღვრულ გადაფარვად მხოლოდ `rateLimitProtection === true` ითვლება. თუ `rateLimitProtection` არის `false` (ან არ არის დაყენებული), აქტიური API-გასაღების კავშირი მაინც აკმაყოფილებს ავტომატური ჩართვის პირობას და რჩება ლიმიტებით დაცული.
- **თითო კავშირიდან გამორიცხვა შეუძლებელია**: ოპერატორს ამჟამად არ შეუძლია გამოხატოს „ეს კონკრეტული აქტიური API-გასაღების კავშირი უნდა მუშაობდეს ლიმიტების რიგის დაცვის გარეშე" ისე, რომ დანარჩენებისთვის ავტომატური ჩართვა აქტიური დარჩეს. API-გასაღების კავშირების ლიმიტების რიგების საერთოდ გარეშე გასაშვებად უსაფრთხოების ბადე გლობალურად უნდა გამოირთვეს (`RATE_LIMIT_AUTO_ENABLE=false` ან `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**მხარდაჭერილი ჩაწერის ბილიკები:**

- **`POST /api/rate-limits`**: მხარდაჭერილი სამართავი ჩაწერის ბილიკი კავშირისთვის `rateLimitProtection`-ის გადასართავად (`{ connectionId: string, enabled: boolean }`). მისი გამოძახება `enabled: true`-ით რთავს განსაზღვრულ დაცვას; `enabled: false`-ით გამოძახება ხსნის განსაზღვრულ დაცვას (თუმცა აქტიური API-გასაღების კავშირები მაინც რჩება გლობალური უსაფრთხოების ბადის ქვეშ, თუ ავტომატური ჩართვა ჩართულია).
- **`PUT /api/providers/[id]`**: განზრახ **არ** იღებს და არ ცვლის `rateLimitProtection`-ს (#11278). პროვაიდერის კავშირის მეტამონაცემების განახლება `PUT /api/providers/[id]`-ით არასდროს შეცვლის ლიმიტების დაცვის შენახულ მდგომარეობას.

---

## 6. ნელი ნაკადის გამტარუნარიანობის დამკვირვებელი (#9709)

არასავალდებულო `resilienceSettings.streamRecovery.throughputWatchdog` მცველი აღმოაჩენს ზემოთ ნაკადს, რომელიც კვლავ აგზავნის ნაწილებს, მაგრამ აწარმოებს ასისტენტის გამომავალს კონფიგურირებული სასარგებლო გამომავალი სიჩქარის ქვემოთ. ის განზრახ განსხვავდება უმოქმედო დროის ამოწურვისგან: გულისცემა და მეტამონაცემების გადატვირთვა არც ტაიმერის და არც პროგრესად ითვლება. ის ასევე განსხვავდება მძიმე მცდელობის ვადისგან (#9153), რომელიც რჩება უსაფრთხოების აბსოლუტურ ჭერად, გამომავალი ხარისხის მიუხედავად.

მცველს ესაჭიროება გახურების პერიოდი, რასაც მოჰყვება სრული მოძრავი ფანჯარა, სანამ ის შეწყვეტს. ის ითვლის ტექსტის დელტას ჩეთის დასრულებებიდან და პასუხობს API გამომავალი მოვლენების (კონსერვატიული UTF-8 ბაიტის პროქსი), უგულებელყოფს მხოლოდ გამოყენების და ცარიელ მოვლენებს და აჩერებს განსჯას, სანამ ხელსაწყოების ზარის ან მსჯელობის მოვლენებს ფრენის პროცესშია. ის ნაგულისხმევად გამორთულია და შეიძლება ჩართოთ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ით (ეს env მნიშვნელობა ასახავს მხოლოდ ნაგულისხმევს — და შენახული `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean იგებს; იხილეთ env-vs-dashboard უპირატესობის შენიშვნა ამ სახელმძღვანელოს ზედა ნაწილში); ფანჯარა, დათბობა, მინიმალური სიჩქარე და მინიმალური გაზომვადი გამომავალი შემოიფარგლება ნორმალური ელასტიურობის პარამეტრების ნორმალიზების ფენით.

როდესაც ჩართულია, დამკვირვებლის შეწყვეტა გამოიყენება მხოლოდ აქტიურ ზემოთ ნაკადზე. კლიენტისთვის ხილულ ბაიტებამდე, არსებული იგივე ანგარიშის ადრეული აღდგენის გზამ შეიძლება ხელახლა გახსნას მცდელობა. ჩადენის შემდეგ, ნაკადი არასოდეს არ ხდება ბრმად გადათამაშება; მხოლოდ არსებულ უსაფრთხო შუა ნაკადის გაგრძელების კონტრაქტს შეუძლია სუფიქსის შეკერვა. ფინალიზაცია რჩება ერთჯერადი, ამიტომ გამოყენების აღრიცხვა და სემაფორის გამოშვება არ არის დუბლირებული.

---

## 7. Upstream-ის სტატუსის შესწორება (არასწორად მითითებული კვოტის შეცდომები)

**ფარგლები:** ერთი upstream გეითვეი, რომელიც დროებითი კვოტის ამოწურვას არასწორი HTTP სტატუსით ანგარიშებს.

**მიზანი:** შეასწოროს შემაცთუნებელი სტატუსი კლასიფიკაციამდე, რათა ქვემდებარმა მომხმარებლებმა (fallback ძრავმა, combo აგრეგაციამ, კლიენტისთვის განკუთვნილმა პასუხმა) დაინახონ უკმარისობის ნამდვილი, ხელახლა შესასრულებელი ბუნება.

ზოგიერთი გეითვეი დროებითი კვოტის ამოწურვას ხელახლა შეუსრულებელი HTTP
სტატუსით ახვედრებს. `agentrouter.org` აბრუნებს `403`-ს (ზოგჯერ `400`-ს)
ჩინური შიგთავსით (`用户额度不足` / `额度不足`) სტანდარტული `429`-ის ნაცვლად.
Claude Code-ს მსგავსი კლიენტები `403`-ს მუდმივად აღიქვამენ და სესიას
წყვეტენ, შესწორების გარეშე კი fallback ძრავი მას `AUTH_ERROR`-დ
დააკლასიფიცირებდა კვოტის მოვლენის ნაცვლად.

**იმპლემენტაცია:**

- რეესტრი + შესადარებელი: `open-sse/config/upstreamStatusRestatement.ts` —
  თითო პროვაიდერის წესების სია (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), შესაბამისობა ხდება `applyStatusRestatement()`-ის მეშვეობით.
- გამოძახების ადგილი: `providerFailure:` ბლოკი `open-sse/handlers/chatCore.ts`-ში
  (დაახლოებით 3654 ხაზზე), უშუალოდ მას შემდეგ, რაც `parseUpstreamError()` გარჩევს
  upstream პასუხს შეცდომის HTTP სტატუსით (`!providerResponse.ok`) და ნებისმიერი
  კლასიფიკაციის გაშვებამდე, რათა ყველა ქვემდებარმა მომხმარებელმა შესწორებული
  სტატუსი დაინახოს. `200` SSE ნაკადის შიგნით ჩასმული შეცდომები მიჰყვებიან
  ცალკე, მოგვიანო ნაკადის გარჩევის გზას და დღესდღეობით **არ** იფარებიან ამ
  ჰუკით — ეს ცნობილი შეზღუდვაა, რომელიც ჯერ არ არის საჭირო agentrouter-ის
  არასწორი სტატუსისთვის (რომელიც შეცდომის HTTP სტატუსის სახით ვლინდება).
- ხელახალი მცდელობის უფლებამოსილება: `429` შედის `RETRY_AFTER_ELIGIBLE_STATUSES`-ში
  (`open-sse/services/combo/unavailableRetryGate.ts`), ამიტომ შესწორებული
  შეცდომა ნამდვილი ხელახალი მცდელობის ფანჯარას ატარებს იმის ნაცვლად, რომ
  მკვდარი `403`-ის სახით გამოჩნდეს.
- სინთეტიკური `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  მხოლოდ ისაა, რასაც შესწორებული პასუხი ეუბნება **კლიენტს**; ის თავისთავად
  არ არის კავშირის შინაგანი cooldown/lockout ხანგრძლივობა — ეს ცალკე
  რეგულირდება იმ მექანიზმით, რომელიც რეალურად ამუშავებს შესწორებულ შეცდომას
  (Connection Cooldown-ის ესკალირებადი backoff, §2, საბაზო `3s` API-გასაღებიანი
  პროვაიდერებისთვის; ან Model Lockout, §3, თითო-მოდელის-კვოტიანი
  პროვაიდერებისთვის, როგორიცაა agentrouter). როუტერს შეუძლია შინაგანად ხელახალი
  მცდელობის უფლებამოსილი უფრო ადრე გახდეს, ვიდრე ის 60-წამიანი ფანჯარა, რომელსაც
  ის კლიენტს უცხადებს — განზრახ დატოვებული მარაგი, არა ბაგი.

მუდმივი შეცდომები (agentrouter-ის `无权访问模型` — ამ მოდელზე წვდომა არ არის)
არასოდეს არ იცვლება: `excludeMarkers` ვეტოს ადებს წესს მაშინაც კი, როცა
`textMarkers` ემთხვევა, ამიტომ შეცდომა ინარჩუნებს თავდაპირველ სტატუსს და არაფერი
ცდის მის უსასრულოდ ხელახლა შესრულებას. შესაბამის პროვაიდერის კლასიფიკაციის
წესს (`agentrouter-model-access-denied` `open-sse/config/providerErrorRules.ts`-ში:
`reason: "auth_error"`, `scope: "model"`, გამოცხადებული საბაზო cooldown `6h`)
მიმართავს `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_სანამ_ ზოგადი apikey-კატეგორიის `FORBIDDEN` ადრეული დაბრუნება მოხდება,
კონტროლირებული `honorsRuleLockScope(provider)`-ით (#10334 — ამჟამად მხოლოდ
agentrouter-ისთვის `providerErrorRules.ts`-ში მყოფი
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` დაშვების სიის მეშვეობით). წესის მიერ
გამოცხადებული 6-საათიანი cooldown გადადის როგორც `fallbackResult.baseCooldownMs`,
მაგრამ ის მაინც კვებავს ადრიდან არსებულ თითო-მოდელის-კვოტის lockout გზას
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, #10334-ით
უცვლელი, cooldown-ის წყაროს გარდა): ის ოპერატორის `mlSettings.maxCooldownMs`-მდე
შემოიფარგლება (ნაგულისხმევი `1_800_000ms` / 30წთ), როგორც ნებისმიერი სხვა მოდელის
lockout, ხოლო _შენახული lockout-ის მიზეზი_ რჩება ადრინდელი ხარდკოდირებული
`"forbidden"` და არა წესის `"auth_error"` — ბოლოდან ბოლომდე მხოლოდ cooldown-ის
ხანგრძლივობა მუშავდება, არა მიზეზის სტრიქონი. თავად კავშირი რჩება აქტიური;
იმავე კავშირზე მყოფ მოდელებზე ეს არ მოქმედებს.

შესწორებული კვოტის შეცდომები (`额度不足`) პროდაქშენში აღწევენ პროვაიდერის
წესამდე (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, საკუთარი გამოცხადებული cooldown-ის გარეშე — მოქმედებს
პერსისტენციის ფენის მასშტაბირებული backoff-ის ნაგულისხმევი მნიშვნელობა).
#10334-ის შემდეგ `scope` `ProviderErrorRuleMatch`-ზე მოხმარდება ბოლოდან ბოლომდე,
მაგრამ **მხოლოდ** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` დაშვების სიაში შემავალი
პროვაიდერებისთვის (`providerErrorRules.ts` — დღეს მხოლოდ `"agentrouter"`,
`honorsRuleLockScope()`-ით კონტროლირებული). ყველა სხვა პროვაიდერისთვის `scope`
რჩება ინფორმაციული, ზუსტად ისე, როგორც #10334-მდე იყო. `checkFallbackError`
ამჟღავნებს დამთხვეული წესის scope-ს როგორც `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) არის
გაზიარებული მცველი, რომელიც ადასტურებს, რომ `ruleScope` ნამდვილად უსაფრთხოა
საპატიოსაცემად, როგორც მთელი კავშირის მასშტაბის, თვითაღდგენადი სიგნალი
(scope `"connection"`, reason `quota_exhausted`, არასოდეს `permanent`,
არასოდეს `creditsExhausted` — თავდაცვა მომავალი წესისგან, რომელიც scope
`"connection"`-ს მუდმივ ანგარიშის მდგომარეობას შეუსვამს). მას ორი მომხმარებელი
იძახებს:

- **მდგომარეობის შენახვა** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-პროვაიდერის **თითოეულ მოდელზე** დაბლოკვის
  განშტოებაში გადასვლის ნაცვლად (agentrouter არის `passthroughModels: true` → `hasPerModelQuota()`
  აბრუნებს `true`-ს), ის იყენებს **კავშირის დროებით დაყოვნებას** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, და არასოდეს ტერმინალურ სტატუსს
  (`credits_exhausted`/`banned`/`expired`) — ამიტომ, დაყოვნების პერიოდის
  გასვლის შემდეგ, კავშირი ავტომატურად აღდგება და ავტორიზაციის მონაცემების
  ხელით განულება საჭირო არ არის.
  ეს გამოტოვებულია `disableCooling: true`-ის მქონე კავშირებისთვის (#2997): უარის
  ეს არჩევანი სანაცვლოდ თითოეულ მოდელზე დაბლოკვაზე გადადის (დოკუმენტირებული
  კომპრომისი — იხილეთ კოდის კომენტარი ამ განშტოების ზემოთ).
- **იმავე მოთხოვნის კომბინირებული მარშრუტიზაცია** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): იგივე დამცავი პირობა კავშირს
  ამატებს მეხსიერებაში არსებულ `exhaustedConnections` სიმრავლეში, გასაღებით
  `${provider}:${connectionId}`. ეს გამოტოვებს მხოლოდ იმავე მოთხოვნის დარჩენილ
  სამიზნეს, რომელსაც _თავად უკვე აქვს ზუსტად ის `connectionId`_ საკუთარ
  სამიზნე ობიექტში (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` `exhaustedConnections`-ში ძიებამდე) — მოდელების სიის ჩვეულებრივი
  კომბინაცია, სადაც მომიჯნავე სამიზნეებს საკუთარი ფიქსირებული `connectionId`
  არ აქვთ და თითოეული დისპეტჩერიზაციისთვის ის მხოლოდ პასუხის
  `X-OmniRoute-Selected-Connection-Id` სათაურიდან განისაზღვრება, ამ გასაღებს
  არასოდეს დაემთხვევა. ამ გავრცელებულ შემთხვევაში დარჩენილი ნაბიჯის მიერ
  ახლახან ამოწურული ანგარიშის ხელახლა გამოყენებისგან რეალური დაცვა ეს Set
  **არ არის** — ეს არის ზემოთ აღწერილი მდგომარეობის შენახვის შრე (კავშირის
  `rateLimitedUntil` ახლა მომავალ დროზე მიუთითებს), იმავე დამცავ პირობასთან
  ერთად, რომელიც ამ შეცდომისთვის `transientRateLimitedProviders`-ს თრგუნავს
  (იხილეთ „ორსაფეხურიანი დიზაინი“ და კოდის კომენტარი
  `targetExhaustion.ts`-ში `isAgentrouterConnectionQuotaScope` განშტოებაზე):
  როდესაც ეს Set მოუნიშნავი რჩება, `combo.ts`-ის `allowRateLimitedConnection`
  იძულებითი დაშვება (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  პროვაიდერის დარჩენილი ნაბიჯებისთვის **არ** აქტიურდება, ამიტომ ავტორიზაციის
  მონაცემების შერჩევის `rateLimitedUntil` ფილტრი
  (`src/sse/services/auth.ts:1238`) ჩვეულებრივ მოქმედებს და დარჩენილი ნაბიჯი
  ან სხვა, ჯერ კიდევ ხელმისაწვდომ agentrouter კავშირს აირჩევს, ან
  ხელმისაწვდომი ავტორიზაციის მონაცემების არარსებობის გამო ჩავარდება — ის
  იძულებით აღარ დაბრუნდება იმ კავშირზე, რომელიც ამ განშტოებამ ახლახან
  დროებით შეაჩერა.

### ორსაფეხურიანი დიზაინი: სტატუსის ხელახალი განსაზღვრა, შემდეგ კლასიფიკაცია

სტატუსის ხელახალი განსაზღვრის (`upstreamStatusRestatement.ts`) და პროვაიდერის
კლასიფიკაციის წესები (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ცალკეული რეესტრებია, რომლებიც ორივე პროვაიდერის
იდენტიფიკატორსა და ტექსტურ ნიშნებს იყენებს გასაღებად, თუმცა ისინი სხვადასხვა
ადგილას სრულდება და სხვადასხვა მიზანს ემსახურება: ხელახალი განსაზღვრა HTTP
სტატუსს ადრეულ ეტაპზე, `chatCore.ts`-ში ცვლის; კლასიფიკაციის წესები კი
`checkFallbackError()`-ის შიგნით (`open-sse/services/accountFallback.ts`)
ირჩევს სარეზერვო `reason`-სა და დაბლოკვის `scope`-ს
(`model` / `provider` / `connection`).

კლასიფიკაციის წესები შეცდომის სრულ **ტექსტს** (რაც საჭიროა სხეულის ისეთი
ნიშნების შესადარებლად, როგორიცაა `额度不足`) მხოლოდ იმ პროვაიდერებისთვის
ხედავს, რომლებიც `providerErrorRules.ts`-ში `FULL_TEXT_RULE_PROVIDERS`
ნებადართულთა სიაშია შეტანილი — ამჟამად მხოლოდ `"agentrouter"`. ყველა სხვა
**ჩაშენებული კატალოგის** პროვაიდერისთვის `checkFallbackError`
`getProviderErrorRuleMatch`-ს მხოლოდ სტრუქტურირებულ შეცდომას (`{code, type}`)
გადასცემს, რაც საკმარისია სათაურზე/სტატუსზე/კოდზე დაფუძნებული წესებისთვის,
მაგრამ სხეულის ტექსტურ ნიშნებს ვერ ხედავს. ამ არჩევანს დამხმარე
`resolveRuleMatchBody()` ასრულებს: ნებადართულთა სიაში მყოფი
პროვაიდერებისთვის — შეცდომის სრული ტექსტი, სხვა შემთხვევაში კი —
სტრუქტურირებული შეცდომა. **ჩაშენებული** პროვაიდერის
`FULL_TEXT_RULE_PROVIDERS`-ში დამატება თითოეული პროვაიდერისთვის აშკარა
თანხმობაა — ეს არსებობს იმისთვის, რომ სიაში არმყოფი ყველა პროვაიდერის
ნაგულისხმევი გზა ბაიტი-ბაიტზე უცვლელი დარჩეს.

წესის `scope` (`model` / `provider` / `connection`) არის
`FULL_TEXT_RULE_PROVIDERS`-ისგან განცალკევებული თანხმობა:
`checkFallbackError` მას მხოლოდ `fallbackResult.ruleScope`-ის სახით
წარმოადგენს, ხოლო ქვედა დონის მომხმარებლები მას საინფორმაციო იარლიყისგან
განსხვავებული მნიშვნელობით მხოლოდ იმ პროვაიდერებისთვის იყენებენ, რომლებიც
იმავე ფაილში `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ნებადართულთა სიაშია
(შეზღუდვა ხორციელდება `honorsRuleLockScope()`-ის მეშვეობით — დღეს მხოლოდ
`"agentrouter"`). იხილეთ ზემოთ „ხელახლა განსაზღვრული კვოტის შეცდომები“,
რათა გაიგოთ, რეალურად რას აკეთებს `scope: "connection"` დამთხვევა მას
შემდეგ, რაც პროვაიდერი ამ ნებადართულთა სიაში მოხვდება.

**#11104 — ოპერატორის მიერ გამოცხადებული წესები ორივე ნებადართულთა სიას
გვერდს უვლის.** ოპერატორს შეუძლია შესრულების დროს თითოეული პროვაიდერის წესი
`settings.providerErrorRules`-ის მეშვეობით გამოაცხადოს
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) ამ
ფაილის რედაქტირების გარეშე. ოპერატორის წესის
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ით შეზღუდვა —
ნებადართულთა სიებით, რომლებიც ჩაშენებული კატალოგის წესების **ნაგულისხმევი**
ქცევის დასაცავადაა განკუთვნილი — პარამეტრების მექანიზმს ყველა
პროვაიდერისთვის უმოქმედოს გახდიდა, გარდა უკვე ჩამოთვლილებისა, რადგან წესის
გამოცხადება თავისთავად უკვე ოპერატორის აშკარა თანხმობაა.
`resolveRuleMatchBody()` და `honorsRuleLockScope()` ორივე ჯერ
`hasOperatorRuleForProvider()`-ს ამოწმებს: ოპერატორის წესის მქონე პროვაიდერი
იღებს შეცდომის დაუმუშავებელ ტექსტს და მისი გამოცხადებული `scope`
მხედველობაში მიიღება, მიუხედავად იმისა, არის თუ არა ის დამატებით რომელიმე
ნებადართულთა სიაში.

**ცნობილი ხარვეზი — HTTP 400-ისთვის `providerRuleRegistry` არასოდეს
გამოიყენება.** `checkFallbackError`-ის `BAD_REQUEST` განშტოება 400 სტატუსს
მთლიანად საკუთარი შაბლონების მასივებით (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` და სხვ. `accountFallback.ts`-ში) აკლასიფიცირებს
და შედეგს მანამდე აბრუნებს, სანამ მის ზემოთ მდებარე
`configuredRule`/`getProviderErrorRuleMatch` განშტოებამდე მივა. ჩაშენებული
კატალოგის წესი (ან ოპერატორის წესი) `status: 400`-ით სინტაქსურად მართებულია,
მაგრამ არასოდეს ამოქმედდება. დღეს არცერთი არსებული წესი 400-ს არ ეხება,
ამიტომ საწარმოო გარემოში არაფერი ზიანდება — თუმცა მომავალში 400-ის წესის
დასამატებლად ჯერ ამ განშტოების შეცვლა იქნება საჭირო, რაც მხოლოდ წესის
დამატებაზე უფრო დიდი ცვლილებაა (ის ხელახლა აკლასიფიცირებს 400-ს ყველა იმ
პროვაიდერისთვის, რომელიც უკვე შაბლონების მასივებზე დაფუძნებულ ქცევას
ეყრდნობა) და ერთი პროვაიდერის წესის დამატების ფარგლებს სცდება.

### ახალი, კვოტის არასწორად გადმომცემი გეითვეის დამატება

1. დაარეგისტრირეთ ერთი წესების მასივი `statusRestatementRegistry`-ში
   (`open-sse/config/upstreamStatusRestatement.ts`). შეინარჩუნეთ `textMarkers`
   პროვაიდერზე სპეციფიკური; არასოდეს გამოიყენოთ ხელახლა ზოგადი ინგლისური
   ფრაზები, რომლებიც ემთხვევა `CREDITS_EXHAUSTED_SIGNALS`-ს
   (`open-sse/services/accountFallback.ts`).
2. სურვილისამებრ დაარეგისტრირეთ კლასიფიკაციის წესები
   `open-sse/config/providerErrorRules.ts`-ში (`providerRuleRegistry`), რათა
   აირჩიოთ დაბლოკვის სწორი სფერო (`connection` — ანგარიშის მასშტაბის
   კვოტისთვის, `model` — თითო მოდელის შეცდომებისთვის). ეს ნაბიჯი პროდაქშენში
   მხოლოდ იმ პროვაიდერებისთვის მოქმედებს, რომელთა წესებს შეცდომის სრული
   ტექსტი (body მარკერები) სჭირდებათ: დაამატეთ პროვაიდერის id
   `FULL_TEXT_RULE_PROVIDERS`-ს იმავე ფაილში — წინააღმდეგ შემთხვევაში
   `checkFallbackError` წესს ყოველთვის მხოლოდ სტრუქტურირებულ
   `{code, type}` შეცდომას გადასცემს და body-ტექსტზე დაფუძნებული წესი
   ცოცხალ ტრაფიკს არასოდეს დაემთხვევა. წესებს, რომლებიც მხოლოდ
   `status`/`headers`-ით ემთხვევა (როგორც Opencode-ს ან Minimax-ს წესები),
   ეს opt-in არ სჭირდებათ. ცალკე, თუ წესი აცხადებს `scope: "connection"`-ს
   და მიზანია რეალური კავშირისმასშტაბიანი cooldown პლუს იმავე მოთხოვნაში
   combo-ს გამოტოვება (და არა მხოლოდ საინფორმაციო ლეიბლი), დაამატეთ
   პროვაიდერის id `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ში იმავე ფაილში —
   სწორედ ეს განსაზღვრავს `isAgentrouterConnectionQuotaScope()`-ის ტიპის
   მოხმარებას `markAccountUnavailable()`-ში (`src/sse/services/auth.ts`) და
   `applyComboTargetExhaustion()`-ში
   (`open-sse/services/combo/targetExhaustion.ts`); მის გარეშე `scope` მაინც
   მიედინება `fallbackResult.ruleScope`-ის გავლით, მაგრამ არაფერი რეაგირებს
   მასზე.
3. დაამატეთ unit ტესტები `tests/unit/upstream-status-restatement.test.ts`-ისა
   და `tests/unit/agentrouter-error-rules.test.ts`-ის მსგავსად (მათ შორის
   not-permanent / not-creditsExhausted გარანტიებით და — თუ პროვაიდერს
   allowlist სჭირდება — ტესტით, რომელიც ამოწმებს, რომ
   `resolveRuleMatchBody()` სრულ ტექსტს მხოლოდ ამ პროვაიდერისთვის აბრუნებს).

`chatCore.ts`-ში, `classifyError`-ში ან combo-ში ცვლილებების შეტანა არ არის საჭირო.

#### Egress-ბაკეტებზე დაფუძნებული დაბლოკვა (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ში ჩამოთვლილი პროვაიდერები (opencode-ს ოჯახი)
ითვლება IP-ბაკეტებზე დაფუძნებულ upstream-ად (opencode-ს უფასო დონე
IP-ბაკეტურია და არა ანგარიშ-ბაკეტური — იხ. #9611): სტატუს-429, რომელიც
კლასიფიცირებულია როგორც `quota_exhausted` **ან** `rate_limit_exceeded`,
აცივებს allowlist-ში შესული ოჯახის ყველა კავშირს, რომლის ბოლო ცნობილი
egress IP ემთხვევა გაუმართავი კავშირის IP-ს, სანამ როტაცია მათ სცდის —
რითაც თავიდან იქნება აცილებული N-1 გარანტირებულად წარუმატებელი upstream
გამოძახება (იგივე სქემა, რაც #10460/#10525). `rate_limit_exceeded`
შეგნებულად არის ჩართული: `markAccountUnavailable` გზაზე opencode-ს
სპეციფიკური წესები არასოდეს ემთხვევა (`checkFallbackError`-ს არც headers
და არც body არ გადაეცემა, opencode არ არის `FULL_TEXT_RULE_PROVIDERS`-ში),
ამიტომ 429, რომლის body-შიც გამოწერის კვოტის ტექსტია ("monthly usage limit
reached"), კლასიფიცირდება `quota_exhausted`-ად კვოტის ტექსტის fallback-ით
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1-საათიანი cooldown),
სანამ `status_429` წესამდე საერთოდ მივიდებოდეს საქმე — მაშინ, როდესაც
კვოტის ტექსტის გარეშე 429 (უბრალო rate limiting) კლასიფიცირდება
`status_429` წესით როგორც `rate_limit_exceeded` და მაინც აცივებს IP ოჯახს.
allowlist-ში შესული პროვაიდერისთვის IP-ბაკეტური rate limit იგივე სიგნალია,
რაც ამოწურული კვოტა. გულახდილი შეზღუდვები:

- **საუკეთესო ძალისხმევა**: ბლოკირება `proxy_logs`-დან განსაზღვრავს კავშირის ბოლო ცნობილ `egress_ip`-ს
  (24-საათიანი ფანჯარა, სინქრონული, კეშის გარეშე). ცივი კეშის (გამავალი
  IP არასოდეს შემოწმებულა) ან ჩანაწერის არარსებობის შემთხვევაში → წარუმატებელი კავშირი მაინც გადადის
  გაგრილების რეჟიმში ამ განშტოების მიერ (იწერება ისევე, როგორც დღეს), უბრალოდ არცერთი მონათესავე კავშირი არ იბლოკება.
- **არასოდეს არის ტერმინალური**: გაგრილების პერიოდი განახლებადი კვოტის ფანჯარაა
  (`testStatus: "unavailable"`); მუდმივი მდგომარეობა არასოდეს განისაზღვრება
  IP-ის დონის სიგნალიდან. `disableCooling` კავშირები ამ განშტოებას სრულად გამოტოვებენ.
- **ბლოკირების გრანულარობა იცვლება ნებადართულ სიაში შეტანილი ოჯახისთვის**: ეს არის მოქმედების არეალის
  ცვლილება და არა მხოლოდ მონათესავე კავშირების ოპტიმიზაცია. opencode არის `passthroughModels`
  პროვაიდერი, ამიტომ ამ განშტოებამდე 429 ქმნიდა თითოეული MODEL-ის ბლოკირებას; ახლა ის
  ქმნის კავშირის გაგრილების პერიოდს — მათ შორის ოპერატორისთვისაც, რომელიც მხოლოდ ერთ
  კავშირს იყენებს და საერთოდ არ აქვს მონათესავე კავშირი. ეს სწორედ ის გრანულარობაა, რომელსაც opencode-ის წესების
  ცხრილი უკვე სწორად აცხადებს (`scope: "connection"`,
  `providerErrorRules.ts`), თუმცა აქამდე არასოდეს სრულდებოდა, რადგან opencode არ შედის
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ში. განშტოება თავად წერს წარუმატებელი
  კავშირის გაგრილების პერიოდსა და `backoffLevel`-ს, კავშირის მასშტაბის
  agentrouter-ის განშტოების ანალოგიურად, შემდეგ კი ასრულებს მუშაობას — თითოეულ მოდელზე ბლოკირებისა და
  ქვემოთ მოცემული ზოგადი გზის შესრულება აღარასოდეს ხდება.
- **კომბოც შედის**: agentrouter-ის განშტოების მსგავსად, მოქმედების არეალი მიზანმიმართულად
  უგულებელყოფს `persistUnavailableState`/`isCombo` დაქვეითებას, რომელსაც კომბო გამომძახებელი
  429-ზე იყენებს. თითოეულ მოდელზე ბლოკირება ამ მოქმედების არეალის უფრო სუსტი ფორმა არ არის —
  ეს არასწორი ერთეულია: ის არაფერს ამბობს ამოწურულ IP-ზე, ამიტომ კომბოს
  როტაცია თითოეულ მონათესავე კავშირზე თითო გარანტირებულად წარუმატებელ გამოძახებას გააგრძელებდა.
- **მონათესავე კავშირების უსაფრთხოება**: მონათესავე კავშირი, რომელიც უკვე ტერმინალურ მდგომარეობაშია (banned/credits_exhausted)
  ან უკვე უფრო ხანგრძლივ გაგრილების პერიოდშია, არასოდეს გადაიწერება.
- **ექსკლუზიური ნებადართული სია**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-ის გაფართოება
  მფლობელის მკაფიო გადაწყვეტილებაა; არ გამოიყენება ზოგადი დაკავშირება (ნიმუში #10334/#10419).
  მონათესავე კავშირების მოთხოვნა SQL-ის ლიტერალში მისი გამეორების ნაცვლად იმავე ნებადართულ სიას
  აკავშირებს, ამიტომ მისი გაფართოება კვლავ ერთსტრიქონიან ცვლილებად რჩება.
- **გამავალი IP-ის როტაცია, ორივე მიმართულებით**: ძიების ფანჯარა (24h) გაცილებით
  ფართოა, ვიდრე გამავალი IP-ის კეშის TTL (5 min), ამიტომ „ბოლო ცნობილი IP“ ისტორიაა
  და არა მიმდინარე მდგომარეობა. თუ კავშირის პროქსი ამ ფანჯრის განმავლობაში შეიცვალა,
  ბლოკირებამ შეიძლება **გამოტოვოს** რეალურად გაზიარებული IP (ჩაწერილი IP ახალი,
  ჯერ კიდევ ამოუწურავია) — და, სიმეტრიულად, მან შეიძლება **გაგრილების რეჟიმში გადაიყვანოს მონათესავე კავშირი, რომელიც მას შემდეგ
  მოშორდა** ამოწურულ IP-ს. მეორე შემთხვევა ამ მონათესავე კავშირს ერთი
  გაგრილების ფანჯრის ფასად უჯდება; ორივე მიღებულია, როგორც ისტორიაზე დაფუძნებული
  ძიების საუკეთესო ძალისხმევის შეზღუდვები.
- **ღირებულება**: `proxy_logs`-ის ორი შეზღუდული სკანირება (ფანჯრით გაფილტრული
  `idx_pl_timestamp`-ის მეშვეობით), მხოლოდ 429-ის სიხშირით. ახალი ინდექსი არ არის საჭირო (მიგრაცია 134 —
  YAGNI). გაზომილია ზომიერი მოცულობის რეალური ტრაფიკის მქონე მონაცემთა ბაზის ასლზე;
  მაღალი გამტარუნარიანობის ინსტანცია იმავე ფანჯარაში პროპორციულად მეტ ჩანაწერს ინახავს.

---

## მდგრადობის სხვა ფუნქციები

- **მარშრუტიზაციის 20 სტრატეგია** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — იხილეთ [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **განულების დროის გათვალისწინებით მარშრუტიზაცია** (v3.8.0) — კავშირებს კვოტის განულების დროის მიხედვით ანიჭებს პრიორიტეტს.
- **ფონური რეჟიმის დეგრადაცია** — Responses API-ის `background: true` გაფრთხილებით სინქრონულ რეჟიმამდე დეგრადირდება.
- **ინსტრუმენტების ლიმიტის დინამიკური აღმოჩენა** — ინსტრუმენტების რაოდენობის ლიმიტის მიღწევისას პროვაიდერებს დროებით გამორიცხავს.
- **საგანგებო სარეზერვო ვარიანტი** — იმართება `OMNIROUTE_EMERGENCY_FALLBACK`-ით; ოპერატორებს მისი შეცვლა Feature Flags გვერდიდან, გადატვირთვის გარეშე შეუძლიათ.

---

## გამართვა

- შეწონილი კომბინაცია აბრუნებს `503 all_targets_cooling_down`-ს (`Retry-After` დაყენებულია, `diagnostics.excluded` კი ჩამოთვლის ყველა სამიზნეს `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` სტატუსით) → პული კონფიგურირებული და დაკავშირებულია, უბრალოდ ყველა სამიზნე მდგრადობის ტაიმერის გამოა გამორიცხული; გაფრთხილება `[COMBO] Weighted selection: every target excluded before dispatch — …` მიუთითებს მიზეზებსა და დარჩენილ წამებს. იმავე კომბინაციიდან მიღებული `404 no_executable_targets` ნიშნავს, რომ მდგრადობის ტაიმერი არ ყოფილა ჩართული (გასაშვები არაფერია, ან ყველა ანგარიშმა ხელმისაწვდომობის შემოწმება ვერ გაიარა). აგებულია `open-sse/services/combo/pinRecovery.ts`-ში, `targetResolution.ts`-ში შეგროვებული გამორიცხვების საფუძველზე.
- პროვაიდერის ყველა გასაღები გამოტოვებულია → შეამოწმეთ როგორც circuit breaker-ის მდგომარეობა, ისე თითოეული კავშირის `rateLimitedUntil`/`testStatus`.
- პროვაიდერი განულების ფანჯრის შემდეგ სამუდამოდ გამორიცხულია → კოდი `getStatus()`/`canExecute()`-ის ნაცვლად პირდაპირ `state`-ს კითხულობს.
- ერთი გასაღები ვერ მუშაობს, დანარჩენებმა კი უნდა იმუშაონ → circuit breaker-ის ნაცვლად უპირატესობა მიანიჭეთ კავშირის გაგრილების პერიოდს.
- მხოლოდ ერთი მოდელი ვერ მუშაობს → კავშირის გაგრილების პერიოდის ნაცვლად უპირატესობა მიანიჭეთ მოდელის ბლოკირებას.
- მდგომარეობა ავტომატურად უნდა აღდგეს, მაგრამ არ აღდგა → შეამოწმეთ მომავლის დროის ნიშნული და წაკითხვის გზა, რომელიც ვადაგასულ მდგომარეობას აახლებს. მუდმივი სტატუსები ხელით ცვლილებას საჭიროებს.

---

## შესრულების გარემოს მდგომარეობა — მოკლე ცნობარი აგენტისთვის

> უცვლელად გადმოტანილია `AGENTS.md`-დან → "Resilience Runtime State" (PR #12743), რათა აგენტის
> სახელმძღვანელო 40k კონტექსტის ბიუჯეტის ფარგლებში დარჩეს. ეს ზემოთ მოცემული სექციების
> შეკუმშული, აგენტზე ორიენტირებული მიმოხილვაა; დანომრილი სექციები სრულ ცნობარად რჩება.

OmniRoute-ს აქვს დროებითი გაუმართაობის სამი ერთმანეთთან დაკავშირებული, თუმცა განსხვავებული მექანიზმი. მარშრუტიზაციის ქცევის გამართვისას მათი
მოქმედების არეები ერთმანეთისგან გამიჯნეთ. სწრაფი მიმოხილვისთვის იხილეთ
[მდგრადობის 3-ფენიანი დიაგრამა](../diagrams/exported/resilience-3layers.svg)
(წყარო: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### პროვაიდერის Circuit Breaker

**მოქმედების არე**: მთელი პროვაიდერი, მაგალითად, `glm`, `openai`, `anthropic`.

**დანიშნულება**: შეწყდეს ტრაფიკის გაგზავნა პროვაიდერთან, რომელიც ზედა დონის სისტემის/სერვისის დონეზე
განმეორებით განიცდის შეფერხებას, რათა ერთმა გაუმართავმა პროვაიდერმა ყველა მოთხოვნა არ შეანელოს.

**იმპლემენტაცია**:

- ძირითადი კლასი: `src/shared/utils/circuitBreaker.ts`
- ჩატის შემოწმებისა და შესრულების კავშირები: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- შესრულების გარემოს სტატუსის API: `src/app/api/monitoring/health/route.ts`
- საერთო გარსები: `open-sse/services/accountFallback.ts`
- შენახული მდგომარეობის ცხრილი: `domain_circuit_breakers`

**მდგომარეობები** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ნორმალური ტრაფიკი დაშვებულია.
- `DEGRADED`: ადრეული გაფრთხილების დიაპაზონი — გაუმართაობების რაოდენობამ დეგრადაციის ზღვარს გადააჭარბა, მაგრამ
  breaker-ის ზღვარს ჯერ არ მიუღწევია; ტრაფიკი კვლავ გადის, მართვის პანელები კი გაფრთხილებას აჩვენებს. კავშირის
  წარმატებული შემოწმება ან წყნარი ფანჯარა ახალი გაუმართაობების გარეშე მდგომარეობას `CLOSED`-ზე აბრუნებს
  (ფანჯრის აღწერა მოცემულია `docs/architecture/RESILIENCE_GUIDE.md`-ში).
- `OPEN`: პროვაიდერი დროებით დაბლოკილია; გამომძახებები იღებენ პასუხს, რომ პროვაიდერის circuit გახსნილია,
  ან კომბინირებული მარშრუტიზაცია სხვა სამიზნეზე გადადის.
- `HALF_OPEN`: განულების მოლოდინის დრო ამოიწურა; დაშვებულია საცდელი მოთხოვნა. წარმატების შემთხვევაში
  breaker იხურება, წარუმატებლობის შემთხვევაში კი კვლავ იხსნება.

**ნაგულისხმევი მნიშვნელობები** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, გამოიყენება
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker`-ის მეშვეობით `src/lib/resilience/settings.ts`-ში →
`getCircuitBreaker(provider, …)` `src/sse/handlers/chatHelpers.ts`-ში). მთელი პროვაიდერის
breaker მუშაობს `circuitBreakerThreshold` / `circuitBreakerReset` პარამეტრებით:

| პროფილი      | დეგრადირდება | იხსნება (`circuitBreakerThreshold`) | განულება (`circuitBreakerReset`) |
| ------------ | -----------: | ----------------------------------: | -------------------------------: |
| OAuth        |          `5` |                                 `8` |                            `60s` |
| API გასაღები |          `7` |                                `12` |                            `30s` |
| ლოკალური     | (გამოთვლილი) |                                 `2` |                            `15s` |

`PROVIDER_PROFILES` ასევე განსაზღვრავს `providerFailureThreshold`-ს (10/15/2),
`providerFailureWindowMs`-ს (15/30/5 წთ) და `providerCooldownMs`-ს (5/10/1 წთ): ისინი მართავენ
**არჩევით ჩასართავი გლობალური Provider Cooldown-ის ფანჯრის შემოწმებას** (`PROVIDER_COOLDOWN_ENABLED`, ნაგულისხმევად
გამორთულია) — პროვაიდერის დონის ჩანაწერი `open-sse/services/providerCooldownTracker.ts`-ში გაგრილების რეჟიმში მყოფად მხოლოდ მაშინ
ითვლება, როდესაც `providerFailureWindowMs`-ის განმავლობაში `providerFailureThreshold` რაოდენობის გაუმართაობა მოხდება, რის შემდეგაც
ის `providerCooldownMs` ხანგრძლივობით გაგრილების რეჟიმში გადადის. ესენი მოქმედი breaker-ის ზღვრები **არ არის** — ნუ შეცვლით მათ
breaker-ის ქცევის შეცვლის მოლოდინით. ყველა ნაგულისხმევი მნიშვნელობის გადაწერა შესაძლებელია
`OMNIROUTE_PROVIDER_BREAKER_*` და `OMNIROUTE_CIRCUIT_BREAKER_*` გარემოს ცვლადებით;
შესრულების გარემოს ზუსტი საცნობარო ცხრილი განთავსებულია `docs/architecture/RESILIENCE_GUIDE.md`-ში.

პროვაიდერის breaker უნდა გააქტიურდეს მხოლოდ პროვაიდერის დონის გაუმართაობის სტატუსებზე:

```ts
(408, 500, 502, 503, 504);
```

არ გააქტიუროთ მთელი პროვაიდერის breaker ანგარიშის/გასაღების/მოდელის ჩვეულებრივი შეცდომებისთვის, როგორიცაა
`401`, `403` ან `429` შემთხვევების უმეტესობა. ისინი, როგორც წესი, კავშირის გაგრილების პერიოდს ან მოდელის
ბლოკირებას მიეკუთვნება. API-გასაღების ზოგადი პროვაიდერის `403` აღდგენადი უნდა იყოს, თუ ის
პროვაიდერის/ანგარიშის საბოლოო შეცდომად არ არის კლასიფიცირებული.

ბრეიკერი იყენებს ზარმაც აღდგენას და არა ფონურ ტაიმერს. როდესაც `OPEN` ვადა იწურება, წაკითხვები, როგორიცაა `getStatus()`, `canExecute()` და `getRetryAfterMs()`, მდგომარეობას `HALF_OPEN`-ზე ანახლებენ, ასე რომ დეშბორდები და კომბოს კანდიდატების შემქმნელები ვადაგასულ პროვაიდერს განუსაზღვრელი ხნით აღარ გამორიცხავენ.

### კავშირის ქულდაუნი

**ფარგლები**: ერთი პროვაიდერის კავშირი/ანგარიში/გასაღები.

**მიზანი**: დროებით გამოტოვოს ერთი არასწორი გასაღები/ანგარიში, მაშინ როდესაც იმავე პროვაიდერის სხვა კავშირები აგრძელებენ მოთხოვნების მომსახურებას.

**იმპლემენტაცია**:

- ჩაწერის/განახლების ბილიკი: `src/sse/services/auth.ts::markAccountUnavailable()`
- ანგარიშის არჩევა/ფილტრაცია: `src/sse/services/auth.ts::getProviderCredentials...`
- ქულდაუნის გამოთვლა: `open-sse/services/accountFallback.ts::checkFallbackError()`
- პარამეტრები: `src/lib/resilience/settings.ts`

პროვაიდერის კავშირების მნიშვნელოვანი ველები:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ანგარიშის არჩევისას კავშირი გამოიტოვება, სანამ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

ქულდაუნებიც ზარმაცია: როდესაც `rateLimitedUntil` წარსულში რჩება, კავშირი ისევ ხდება ასარჩევად ხელმისაწვდომი. წარმატებული გამოყენების შემდეგ `clearAccountError()` ასუფთავებს `testStatus`-ს, `rateLimitedUntil`-ს, შეცდომის ველებს და `backoffLevel`-ს.

კავშირის ქულდაუნის ნაგულისხმევი ქცევა:

- OAuth-ის საბაზო ქულდაუნი: `5s`.
- API-გასაღების საბაზო ქულდაუნი: `3s`.
- API-გასაღების `429` პასუხზე უპირატესობა უნდა მიენიჭოს აღმავალი მხარის ხელახლა ცდის მინიშნებებს (`Retry-After`, განულების ჰედერები ან დასაპარსი განულების ტექსტი), როდესაც ისინი ხელმისაწვდომია.
- განმეორებადი, აღსადგენი შეცდომები იყენებს ექსპონენციალურ backoff-ს:

```ts
baseCooldownMs * 2 ** failureIndex;
```

„thundering herd“-ის საწინააღმდეგო დაცვა უშლის ხელს, რომ ერთსა და იმავე კავშირზე ერთდროულმა შეცდომებმა არაერთხელ გაახანგრძლივოს ქულდაუნი ან ორჯერ გაზარდოს `backoffLevel`.

საბოლოო მდგომარეობები ქულდაუნები არ არის. `banned`, `expired` (რომელიც საბოლოო მხოლოდ N შეზღუდული ხელახლა ცდის შემდეგ ხდება, `EXPIRED_RETRY_MAX`-ის საშუალებით) და `credits_exhausted` განკუთვნილია იმისთვის, რომ მიუწვდომელი დარჩეს, სანამ ავტორიზაციის მონაცემები/პარამეტრები არ შეიცვლება ან ოპერატორი ხელით არ გაანულებს მათ. საბოლოო მდგომარეობები არ უნდა გადაეწეროს გარდამავალი ქულდაუნის მდგომარეობით.

### მოდელის დაბლოკვა

**ფარგლები**: პროვაიდერი + კავშირი + მოდელი.

**მიზანი**: თავიდან აიცილოს მთელი კავშირის გამორთვა, როდესაც ამ კავშირისთვის მხოლოდ ერთი მოდელია მიუწვდომელი ან კვოტით შეზღუდული.

მაგალითები:

- თითო მოდელზე კვოტის მქონე პროვაიდერები, რომლებიც აბრუნებენ `429`-ს.
- ლოკალური პროვაიდერები, რომლებიც აბრუნებენ `404`-ს ერთი დაკარგული მოდელისთვის.
- პროვაიდერზე სპეციფიკური რეჟიმის/მოდელის ნებართვის შეცდომები, როგორიცაა შერჩეული Grok-რეჟიმები.

მოდელის დაბლოკვა მოთავსებულია `open-sse/services/accountFallback.ts`-ში და იმავე კავშირს საშუალებას აძლევს განაგრძოს სხვა მოდელების მომსახურება.

### გამართვის მითითებები

- თუ პროვაიდერის ყველა გასაღები გამოტოვებულია, შეამოწმეთ როგორც პროვაიდერის ბრეიკერის მდგომარეობა, ისე თითოეული კავშირის `rateLimitedUntil`/`testStatus`.
- თუ განულების ფანჯარის შემდეგ პროვაიდერი მუდმივად გამორიცხულად გამოიყურება, შეამოწმეთ, ხომ არ კითხულობს კოდი ნედლ `state`-ს `getStatus()`/`canExecute()`-ის გამოყენების ნაცვლად.
- თუ პროვაიდერის ერთი გასაღები ვერ მუშაობს, მაგრამ სხვები უნდა იმუშაონ, ამჯობინეთ კავშირის ქულდაუნი პროვაიდერის ბრეიკერს.
- თუ მხოლოდ ერთი მოდელი ვერ მუშაობს, ამჯობინეთ მოდელის დაბლოკვა კავშირის ქულდაუნს.
- თუ მდგომარეობამ თვითაღდგენა უნდა შეძლოს, მას უნდა ჰქონდეს მომავლის დროის ნიშანი/განულების ტაიმაუტი და წაკითხვის ბილიკი, რომელიც ანახლებს ვადაგასულ მდგომარეობას. მუდმივი სტატუსები მოითხოვს ავტორიზაციის მონაცემების ან კონფიგურაციის ხელით შეცვლას.

---

## TLS-ის ანაბეჭდები და ფარულობა

პროვაიდერზე სპეციფიკური ფარულობა (JA3/JA4, CCH, ობფუსკაცია) ცალკეა დოკუმენტირებული — იხილეთ `docs/security/STEALTH_GUIDE.md` (git; `/docs`-ში არ კომპილირდება).

---

## მდგრადობის ტესტირება (ფაზა 8 · ბლოკი C)

მდგრადობის ლოგიკის ერთეული ტესტების გარდა, სამი ტესტი ამოწმებს runtime-ს რეალური დატვირთვისა და უარსათქმელობის პირობებში (ყველა ინტეგრაციული/ღამის — არც ერთი არ ბლოკავს PR-ებს):

| ტესტი       | რას აკეთებს                                                                                                                                                                             | გაშვება                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | ყალბი upstream კვანძი რეალურ დაგვიანებას/reset-ს/timeout-ს/503-ს შეაქვს; ამოწმებს, რომ circuit breaker იღება/აღდგება და `checkFallbackError` 503-ს აღსადგენ fallback-ად აკლასიფიცირებს. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 ნაკადი თითო `createSSEStream`-ზე `--expose-gc`-ით; ვარდება, თუ heap ზღვარს გასცდება (OOM-დაცვა #3069).                                                                             | `npm run test:heap`                    |
| k6 soak     | ხანგრძლივი დატვირთვა `/api/monitoring/health`-ზე; p95/შეცდომების ზღვარები.                                                                                                              | `k6 run tests/load/k6-soak.js` (ღამის) |

ორკესტრირებულია `.github/workflows/nightly-resilience.yml`-ით (cron + dispatch). ნაგულისხმევ `test:integration`-ში chaos და heap თავისით გამოიტოვება (`RUN_CHAOS_INT`/`--expose-gc`-ის გარეშე).

---

## ასევე იხილეთ

- [არქიტექტურის გზამკვლევი](./ARCHITECTURE.md) — სისტემის არქიტექტურა და შინაგანი მოწყობილობა
- [მომხმარებლის გზამკვლევი](../guides/USER_GUIDE.md) — პროვაიდერები, კომბოები, CLI-ინტეგრაცია
- [Auto-Combo-ძრავა](../routing/AUTO-COMBO.md) — 16-ფაქტორიანი შეფასება, რეჟიმების პაკეტები
