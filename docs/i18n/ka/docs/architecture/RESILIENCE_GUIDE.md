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

## 3. მოდელის დაბლოკვა

**მოქმედების არეალი:** პროვაიდერის + კავშირის + მოდელის სამეული.

**სტატუსის მიხედვით მოქმედების არეალი:** წარუმატებლობის სტატუსი განსაზღვრავს, რომელ გასაღებში ჩაიწერება დაბლოკვა
(`resolveLockoutScope()` `open-sse/services/accountFallback/exactModelLock.ts`-ში):

- `429` / `403` / `402` — კვოტის ან უფლებამოსილების სიგნალი — იბლოკება **კვოტის ოჯახი**:
  codex-ისთვის მთელი `codex` / `spark` არეალი (კავშირის ყველა `gpt-5*` მოდელი), სხვა პროვაიდერებისთვის კი `getQuotaScopedModelForProvider()`.
- `404` ბლოკავს უშუალოდ მოდელს (`getModelLockKey()` ავიწროებს `not_found`-ს).
- ნებისმიერი სხვა სტატუსი — `5xx` ტრანსპორტისა და სერვერის შეცდომები და OmniRoute-ის მიერ ხარისხის ვალიდაციის საფუძველზე სინთეზირებული `502` — ბლოკავს მხოლოდ პროვაიდერის/კავშირის/მოდელის **ზუსტ** სამეულს. ერთი მოდელის გაუმართავი ნაკადი არ არის მტკიცებულება ანგარიშის კვოტასთან დაკავშირებით; ამ წესის შემოღებამდე `codex/gpt-5.6-luna`-ზე ერთი ცარიელი პასუხი ამ კავშირის ყველა `gpt-5*` მოდელს 2–30 წუთით (ესკალაციით) ამოიღებდა მარშრუტიზაციიდან, მაშინ როცა მისი კვოტა უცვლელი რჩებოდა.
- გამომძახებლის მიერ პირდაპირ მითითებულ `scope` პარამეტრს ყოველთვის აქვს უპირატესობა (Antigravity გადასცემს `"exact"`-ს).

**მიზანი:** თავიდან იქნას აცილებული მთელი კავშირის გათიშვა, როდესაც მიუწვდომელია ან კვოტით შეზღუდულია მხოლოდ ერთი მოდელი.

**მაგალითები:**

- თითო მოდელზე ცალკე კვოტის მქონე პროვაიდერები, რომლებიც აბრუნებენ 429-ს
- ლოკალური პროვაიდერები, რომლებიც ერთი არარსებული მოდელისთვის აბრუნებენ 404-ს
- პროვაიდერისთვის სპეციფიკური რეჟიმის/მოდელის ნებართვის შეცდომები (მაგ., Grok-ის რეჟიმები)

**იმპლემენტაცია:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### მოდელების გაგრილების პანელი (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ჩამოთვლის აქტიურ დაბლოკვებს შემდეგი მონაცემებით: პროვაიდერი, კავშირი, მოდელი, მიზეზი, expiresAt. ოპერატორებს შეუძლიათ ბარათიდან მოდელის ხელახლა ხელმისაწვდომობის ხელით ჩართვა.

**REST API:**

- `GET /api/resilience/model-cooldowns` — აქტიური დაბლოკვების სია
- `DELETE /api/resilience/model-cooldowns` — ხელით ხელახლა ჩართვა. სხეული: `{provider, connection, model}`. ავტორიზაცია: management.

### გაგრილების მენეჯერი

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

ერთი გვერდი თითოეული კავშირისთვის, რომელიც დროებითი მიზეზით ამოღებულია მარშრუტიზაციიდან, ნაცვლად იმისა, რომ თითოეული პროვაიდერის გვერდი ცალ-ცალკე გაიხსნას. ჩამოთვლის კავშირების გაგრილებებს, მოდელების დაბლოკვებსა და ტერმინალურ მდგომარეობებს; ასუფთავებს მათ თითოეული კავშირისთვის, შერჩეული კავშირებისთვის ან პროვაიდერის ყველა კავშირისთვის; ასევე არედაქტირებს ყველაზე ხშირად მორგებულ გაგრილების წესებს: `streamStallCooldown.enabled` და OAuth / API-გასაღების `connectionCooldown`-ის საბაზისო გაგრილებასა და მაქსიმალური backoff-ის საფეხურებს (ინახება `PATCH /api/resilience`-ის საშუალებით). ტერმინალური მდგომარეობები (`banned`, `expired`, `credits_exhausted`) ჩამოთვლილია, მაგრამ აქ არასოდეს იწმინდება.

იმავე გვერდზე არსებული **Error cooldown rules** ბარათი არედაქტირებს ოპერატორის შეცდომების წესებს (`settings.providerErrorRules`) და თითოეული პროვაიდერის საერთო დანიშნულების ნაგულისხმევ წესებს (`settings.providerErrorDefaults`) `PATCH /api/settings`-ის საშუალებით — მათი დამთხვევის წესებისთვის იხილეთ §7-ის „ოპერატორის მიერ გამოცხადებული წესები“. ხანგრძლივობები შეიძლება იყოს ნაგულისხმევი (გაგრილების ცალსახა მითითების გარეშე), 30 წუთი, 1 სთ, 5 სთ, 24 სთ ან მორგებული მნიშვნელობა 1-დან 43,200 წუთამდე (30 დღე).

**REST API** (`src/lib/resilience/cooldownManager.ts`, ავტორიზაცია: management):

- `GET /api/resilience/cooldowns[?provider=]` — კავშირები სტატუსით, გაგრილების დარჩენილი დროით, backoff-ის დონით, ბოლო შეცდომის ტიპითა და მოდელების დაბლოკვებით (საიდუმლო მონაცემების გარეშე)
- `POST /api/resilience/cooldowns` — სხეული `{connectionIds: string[]}` ან `{all: true, provider?}`; აბრუნებს `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### დაბლოკვის პარამეტრების UI + წარმატებით შემცირებაზე დაფუძნებული აღდგენა (v3.8.23)

მოდელის დაბლოკვა მუდმივად ჩართული, მყარად კოდირებული ქცევიდან სრულად კონფიგურირებად, ნებაყოფლობით ჩასართავ ფუნქციად იქცა, რომელსაც საკუთარი პარამეტრების ბარათი და თვითაღდგენის მექანიზმი აქვს.

**პარამეტრების ბარათი:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ეს **განსხვავდება** ზემოთ მოცემული მხოლოდ წაკითხვადი `ModelCooldownsCard`-ისგან (რომელიც მხოლოდ აქტიურ დაბლოკვებს _ჩამოთვლის_) — ახალი ბარათი _აკონფიგურირებს პარამეტრებს_. ნაგულისხმევი მნიშვნელობები განთავსებულია `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ში
(`src/lib/resilience/modelLockoutSettings.ts`):

| პარამეტრი               | ნაგულისხმევი მნიშვნელობა         | მნიშვნელობა                                                                            |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | მთავარი ჩამრთველი — მოდელის დაბლოკვა **ნაგულისხმევად გამორთულია**.                     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ზემდგომი სისტემის სტატუსები, რომლებიც მოდელზე მიბმულ წარუმატებლობად ითვლება.           |
| `baseCooldownMs`        | `120_000` (120 s)                | პირველი წარუმატებლობისთვის დაბლოკვის საწყისი ხანგრძლივობა.                             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ესკალირებული გაგრილების ზედა ზღვარი.                                                   |
| `maxBackoffSteps`       | `10`                             | ექსპონენციური backoff-ის ესკალაციის მაქსიმალური რაოდენობა.                             |
| `useExponentialBackoff` | `true`                           | უნდა მოხდეს თუ არა განმეორებითი წარუმატებლობებისას გაგრილების ექსპონენციური ესკალაცია. |

პარამეტრები ინახება პარამეტრების ჩვეულებრივი საცავის საშუალებით და ვალიდირდება resilience-ის პარამეტრების სქემით; ბარათი ზღუდავს `baseCooldownMs`/`maxCooldownMs`-ს (`maxCooldownMs ≥ baseCooldownMs` პირობით) და `maxBackoffSteps`-ს.

**წარმატებით შემცირებაზე დაფუძნებული აღდგენა:** აღდგენა **მხოლოდ ტაიმერის ამოწურვას არ ეფუძნება**. ჯანსაღი პასუხი მოდელის წარუმატებლობების რაოდენობას ამცირებს, რათა შუალედში აღდგენილმა მოდელმა ესკალაცია შეწყვიტოს (და დაბლოკვა გააუქმოს) ტაიმერის ამოწურვამდე. წარმატებული კომბინაციის სამიზნის შემთხვევაში `open-sse/services/combo.ts` იძახებს `decayModelFailureCount()`-ს
(`open-sse/services/accountFallback.ts`), რომელიც შენახულ `failureCount`-ს **ანახევრებს** (`Math.floor(failureCount / 2)`); როდესაც ის `0`-ს მიაღწევს, დაბლოკვის ჩანაწერი მთლიანად იშლება. ამის საპირისპირო `recordModelLockoutFailure()` ზრდის რაოდენობას (და ესკალაციას უკეთებს გაგრილებას) ესკალაციის ფანჯარაში მომხდარი წარუმატებლობებისას. ეს წარმატებაზე დაფუძნებული შემცირება ემატება უბრალოდ ტაიმერის ამოწურვას — ორივე გზას შეუძლია მოდელის ხელახლა ჩართვა.

**მდგომარეობა:** დაბლოკვები ინახება **მეხსიერებაში** (თითოეული პროცესისთვის განკუთვნილ `Map`-ებში, `provider:connectionId:model`-ის მიხედვით დაჯგუფებული
`ModelLockoutEntry` ჩანაწერებით, ზუსტი ფარგლების დაბლოკვები კი
`provider:connectionId:exact:model`-ის მიხედვით), და არ ინახება
DB-ში — გადატვირთვისას ისინი იკარგება. _პარამეტრები_ შენარჩუნებულია; აქტიური დაბლოკვის _მდგომარეობა_ დროებითია.

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

## 7. Upstream სტატუსის ხელახლა მინიჭება (არასწორად მითითებული quota შეცდომები)

**ფარგლები:** ერთი upstream gateway, რომელიც დროებითი quota-ს ამოწურვას არასწორი HTTP სტატუსით ატყობინებს.

**მიზანი:** შეცდომაში შემყვანი სტატუსის შესწორება კლასიფიკაციამდე, რათა downstream მომხმარებლებმა (fallback engine-მა, combo aggregation-მა, კლიენტისთვის განკუთვნილმა პასუხმა) შეცდომის რეალური, ხელახლა ცდისთვის დასაშვები ბუნება დაინახონ.

ზოგი gateway TEMPORARY quota-ს ამოწურვას არახელახლა-ცდადი HTTP
სტატუსით აფიქსირებს. `agentrouter.org` აბრუნებს `403`-ს (ზოგჯერ `400`-ს) ჩინური ტექსტით
(`用户额度不足` / `额度不足`), სტანდარტული `429`-ის ნაცვლად. Claude
Code-ის მსგავსი კლიენტები `403`-ს მუდმივ შეცდომად აღიქვამენ და სესიას წყვეტენ, ხოლო შესწორების
გარეშე fallback engine მას `AUTH_ERROR`-ად დააკლასიფიცირებდა, quota-ს
მოვლენის ნაცვლად.

**განხორციელება:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — თითოეული
  provider-ის წესების სია (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), რომელთა დამთხვევაც `applyStatusRestatement()`-ის
  მეშვეობით ხდება.
- გამოძახების ადგილი: `open-sse/handlers/chatCore.ts`-ის
  `providerFailure:` ბლოკი (დაახლოებით 3654-ე ხაზთან), უშუალოდ მას შემდეგ, რაც
  `parseUpstreamError()` upstream პასუხს აანალიზებს შეცდომის HTTP სტატუსით
  (`!providerResponse.ok`), და ნებისმიერი კლასიფიკაციის დაწყებამდე, რათა ყველა downstream მომხმარებელმა
  შესწორებული სტატუსი დაინახოს. `200` SSE stream-ში ჩასმული შეცდომები გადის
  ცალკე, მოგვიანებით stream-parsing გზაზე და დღეს ამ hook-ის **ფარგლებში არ შედის** —
  ეს ცნობილი შეზღუდვაა, რომელიც ჯერ არ არის საჭირო agentrouter-ის არასწორი სტატუსისთვის
  (რომელიც შეცდომის HTTP სტატუსის სახით ჩნდება).
- ხელახლა ცდის დასაშვებობა: `429` შედის `RETRY_AFTER_ELIGIBLE_STATUSES`-ში
  (`open-sse/services/combo/unavailableRetryGate.ts`), ამიტომ ხელახლა მინიჭებული
  შეცდომა რეალურ retry window-ს ატარებს და არა dead `403`-ად წარმოჩენას.
- სინთეზური `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  მხოლოდ იმას განსაზღვრავს, რასაც ხელახლა მინიჭებული პასუხი **კლიენტს** ეუბნება;
  ის თავისთავად არ წარმოადგენს კავშირის შიდა cooldown/lockout ხანგრძლივობას —
  ამას ცალკე მართავს ის მექანიზმი, რომელიც რეალურად ამუშავებს ხელახლა მინიჭებულ შეცდომას
  (Connection Cooldown-ის მზარდი backoff, §2, API-key provider-ებისთვის საბაზისო
  `3s`; ან Model Lockout, §3, თითოეულ model-ზე quota-ს მქონე provider-ებისთვის,
  როგორიცაა agentrouter). Router-ს შეუძლია შიდა retry-ისთვის მზად გახდეს
  კლიენტისთვის ნაჩვენებ 60-წამიან ფანჯარაზე ადრე — ეს განზრახ დატოვებული მარაგია
  და არა შეცდომა.

მუდმივი შეცდომები (`agentrouter`-ის `无权访问模型` — ამ model-ზე წვდომა არ არსებობს)
არასოდეს მიენიჭება ხელახლა სხვა სტატუსი: `excludeMarkers` აუქმებს წესს მაშინაც კი,
როდესაც `textMarkers` დაემთხვა, ამიტომ შეცდომა ინარჩუნებს თავდაპირველ სტატუსს და მას
სამუდამოდ ხელახლა არ ცდიან. შესაბამის provider classification წესს
(`agentrouter-model-access-denied` `open-sse/config/providerErrorRules.ts`-ში:
`reason: "auth_error"`, `scope: "model"`, გამოცხადებული `6h`-იანი საბაზისო cooldown)
ამოწმებს `checkFallbackError` (`open-sse/services/accountFallback.ts`)
მანამდე, სანამ generic apikey-category `FORBIDDEN` ადრეულად დააბრუნებს,
`honorsRuleLockScope(provider)`-ზე დამოკიდებულებით (#10334 — ამჟამად მხოლოდ agentrouter-ისთვის
`providerErrorRules.ts`-ში არსებული `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ის
მეშვეობით). წესის მიერ გამოცხადებული 6-საათიანი cooldown გადადის
`fallbackResult.baseCooldownMs`-ში, თუმცა ის კვლავ მიეწოდება არსებულ
per-model-quota lockout გზას (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, რომელიც #10334-ით არ შეცვლილა, გარდა cooldown-ის
წყაროსი): ის იზღუდება ოპერატორის `mlSettings.maxCooldownMs`-ით
(ნაგულისხმევი `1_800_000ms` / 30 წუთი), როგორც ყველა სხვა model lockout,
ხოლო _შენახული lockout reason_ კვლავ რჩება წინასწარ მყარად განსაზღვრულ
`"forbidden"`-ად და არა წესის `"auth_error"`-ად — სრულად გამოიყენება მხოლოდ
cooldown-ის ხანგრძლივობა და არა reason string. თვითონ კავშირი აქტიური რჩება;
იმავე კავშირზე არსებული sibling model-ები გავლენას არ განიცდიან.

ხელახლა მინიჭებული quota შეცდომები (`额度不足`) production-ში provider rule-მდე აღწევს
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, საკუთარი გამოცხადებული cooldown არ აქვს — persistence layer-ის
მასშტაბირებული backoff-ის ნაგულისხმევი მნიშვნელობა გამოიყენება). #10334-ის შემდეგ
`ProviderErrorRuleMatch`-ში `scope` სრულად გამოიყენება, თუმცა **მხოლოდ** იმ provider-ებისთვის,
რომლებიც `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ში შედიან
(`providerErrorRules.ts` — დღეს მხოლოდ `"agentrouter"`, `honorsRuleLockScope()`-ის
მეშვეობით). ყველა სხვა provider-ისთვის `scope` კვლავ საინფორმაციო ხასიათისაა,
ზუსტად ისე, როგორც #10334-მდე იყო.
`checkFallbackError` შესაბამისი წესის scope-ს ავრცელებს `fallbackResult.ruleScope`-ის
სახით; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) არის საერთო დამცავი შემოწმება, რომელიც ადასტურებს,
რომ `ruleScope` ნამდვილად უსაფრთხოა კავშირის მასშტაბით, თვითაღდგენად სიგნალად
გამოსაყენებლად (scope `"connection"`, reason `quota_exhausted`, არასოდეს
`permanent`, არასოდეს `creditsExhausted` — დაცვა მომავალი წესისგან, რომელიც scope-ს
`"connection"`-ს მუდმივ account state-ს დაუკავშირებდა). მას ორი მომხმარებელი იძახებს:

- **პერსისტენტულობა** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  იმის ნაცვლად, რომ გადავიდეს passthrough-provider-ის **თითოეული მოდელის მიხედვით** დაბლოკვის განშტოებაში (agentrouter-ს აქვს `passthroughModels: true` → `hasPerModelQuota()` აბრუნებს `true`), ის იყენებს **დროებით კავშირის გაგრილების პერიოდს** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, და არასოდეს ანიჭებს საბოლოო სტატუსს
  (`credits_exhausted`/`banned`/`expired`) — ამიტომ კავშირი თავისით აღდგება გაგრილების პერიოდის გასვლის შემდეგ და აღარ მოითხოვს ავტორიზაციის მონაცემების ხელით განულებას.
  გამოტოვებულია `disableCooling: true`-ის მქონე კავშირებისთვის (#2997): ეს უარის თქმა
  სანაცვლოდ გადადის თითოეული მოდელის მიხედვით დაბლოკვაზე (დოკუმენტირებული კომპრომისი —
  იხილეთ განშტოების ზემოთ მოცემული კოდის კომენტარი).
- **იმავე მოთხოვნის კომბინირებული მარშრუტიზაცია** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): იგივე დამცავი მექანიზმი კავშირს ამატებს მეხსიერებაში არსებულ `exhaustedConnections` ნაკრებში, რომლის გასაღებია
  `${provider}:${connectionId}`. ეს მხოლოდ გამოტოვებს დარჩენილ SAME-REQUEST სამიზნეს, რომელსაც _თავის ობიექტში უკვე თავად აქვს მითითებული ზუსტად ეს `connectionId`_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` `exhaustedConnections`-ის ძიებამდე) — ჩვეულებრივი
  მოდელების სიის კომბო, სადაც მეზობელ სამიზნეებს საკუთარი მიბმული `connectionId` არ აქვთ და ერთი კავშირი თითოეული დისპეტჩისთვის მხოლოდ პასუხის `X-OmniRoute-Selected-Connection-Id` ჰედერიდან განისაზღვრება, ამ გასაღების დამთხვევას ვერასოდეს მიაღწევს. ამ გავრცელებულ შემთხვევაში დარჩენილი ეტაპის მიერ ახლახან ამოწურული ანგარიშის ხელახლა გამოყენების რეალური დაცვა არ არის ეს Set — ეს არის ზემოთ აღწერილი პერსისტენტულობის ფენა (კავშირის `rateLimitedUntil` ახლა მომავალ დროს მიუთითებს), ამავე დამცავ მექანიზმთან ერთად, რომელიც წარუმატებლობისთვის `transientRateLimitedProviders`-ის ჩაწერას თრგუნავს (იხილეთ „ორსაფეხურიანი დიზაინი“ და `targetExhaustion.ts`-ში `isAgentrouterConnectionQuotaScope` განშტოების კოდის კომენტარი): როდესაც ეს Set მონიშნული არ არის, `combo.ts`-ის `allowRateLimitedConnection` იძულებითი დაშვება
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) არ ამოქმედდება პროვაიდერის დარჩენილი ეტაპებისთვის, ამიტომ ავტორიზაციის მონაცემების არჩევისას `rateLimitedUntil`-ის ფილტრი
  (`src/sse/services/auth.ts:1238`) ჩვეულებრივ მოქმედებს და დარჩენილი ეტაპი ან აირჩევს agentrouter-ის სხვა, ჯერ კიდევ დასაშვებ კავშირს, ან დასრულდება ხელმისაწვდომი ავტორიზაციის მონაცემების გარეშე — ის იძულებით აღარ დაბრუნდება იმ კავშირზე, რომელსაც ეს განშტოება ახლახან გაუვიდა გაგრილების რეჟიმში.

### ორსაფეხურიანი დიზაინი: სტატუსის ხელახალი აღწერა, შემდეგ კლასიფიკაცია

სტატუსის ხელახალი აღწერა (`upstreamStatusRestatement.ts`) და პროვაიდერის
კლასიფიკაციის წესები (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ცალკე რეესტრებშია და ორივე პროვაიდერის იდენტიფიკატორსა და ტექსტურ მარკერებზეა მიბმული, თუმცა ისინი სხვადასხვა ადგილას სრულდება და სხვადასხვა მიზანს ემსახურება: ხელახალი აღწერა HTTP სტატუსს ადრეულ ეტაპზე ცვლის `chatCore.ts`-ში;
კლასიფიკაციის წესები კი ირჩევს სარეზერვო `reason`-ს და დაბლოკვის
`scope`-ს (`model` / `provider` / `connection`) `checkFallbackError()`-ში
(`open-sse/services/accountFallback.ts`).

კლასიფიკაციის წესები სრულ შეცდომის **ტექსტს** ხედავს (რაც საჭიროა ისეთი სხეულის მარკერების შესატყვისად, როგორიცაა `额度不足`) მხოლოდ `providerErrorRules.ts`-ში
`FULL_TEXT_RULE_PROVIDERS` დაშვებულ სიაში მითითებული პროვაიდერებისთვის — ამჟამად მხოლოდ `"agentrouter"`. ყველა სხვა **ჩაშენებული კატალოგის** პროვაიდერისთვის `checkFallbackError` `getProviderErrorRuleMatch`-ს გადასცემს მხოლოდ სტრუქტურირებულ შეცდომას (`{code, type}`), რაც საკმარისია ჰედერზე/სტატუსზე/კოდზე დაფუძნებული წესებისთვის, მაგრამ სხეულის ტექსტურ მარკერებს ვერ ხედავს.
დამხმარე `resolveRuleMatchBody()` ასრულებს ამ არჩევანს: სრული შეცდომის ტექსტი დაშვებულ სიაში მყოფი პროვაიდერებისთვის, ხოლო სტრუქტურირებული შეცდომა — სხვა შემთხვევებში. **ჩაშენებული** პროვაიდერის `FULL_TEXT_RULE_PROVIDERS`-ში დამატება არის კონკრეტული პროვაიდერისთვის გააზრებული ჩართვა — ეს საჭიროა იმისთვის, რომ სიაში არმყოფი ყველა პროვაიდერის ნაგულისხმევი გზა ბაიტ-ბაიტზე უცვლელი დარჩეს.

წესის `scope` (`model` / `provider` / `connection`) `FULL_TEXT_RULE_PROVIDERS`-ისგან დამოუკიდებელი ჩართვის მექანიზმია: `checkFallbackError` მას მხოლოდ `fallbackResult.ruleScope`-ის სახით გამოაჩენს, ხოლო ქვედა დონის მომხმარებლები მას ინფორმაციული იარლიყის გარდა სხვა დანიშნულებით მხოლოდ იმ პროვაიდერებისთვის იყენებენ, რომლებიც იმავე ფაილში `HONORS_RULE_LOCK_SCOPE_PROVIDERS` დაშვებულ სიაშია (შეზღუდვა ხორციელდება `honorsRuleLockScope()`-ის მეშვეობით — დღეს მხოლოდ `"agentrouter"`). იხილეთ ზემოთ „კვოტასთან დაკავშირებული ხელახლა აღწერილი შეცდომები“, რათა გაიგოთ, რას აკეთებს `scope: "connection"` შესატყვისი მას შემდეგ, რაც პროვაიდერი ამ სიაში მოხვდება.

**#11104 — ოპერატორის მიერ გამოცხადებული წესები ორივე დაშვებულ სიას გვერდს უვლის.** ოპერატორს შეუძლია გაშვების დროს გამოაცხადოს თითო პროვაიდერზე მოქმედი წესი `settings.providerErrorRules`-ის მეშვეობით
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ამ ფაილის შეცვლის გარეშე. ოპერატორის წესის `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ზე მიბმა — სიებზე, რომლებიც ჩაშენებული კატალოგის ნაგულისხმევი წესების დასაცავად არის განკუთვნილი — პარამეტრების მექანიზმს ყველა პროვაიდერისთვის, გარდა უკვე ჩამოთვლილი პროვაიდერებისა, უმოქმედოს გახდიდა, რადგან წესის გამოცხადება უკვე წარმოადგენს ოპერატორის მკაფიო ჩართვას. `resolveRuleMatchBody()` და `honorsRuleLockScope()` ორივე პირველ რიგში ამოწმებს `hasOperatorRuleForProvider()`-ს: ოპერატორის წესის მქონე პროვაიდერი იღებს ნედლ შეცდომის ტექსტს და მის მიერ გამოცხადებული `scope` გამოიყენება იმის მიუხედავად, არის თუ არა ის რომელიმე დაშვებულ სიაში.

**ოპერატორის მიერ გამოცხადებული წესები** (`OperatorProviderErrorRule`): თითოეულ წესს აქვს არასავალდებულო `status` და არასავალდებულო `match` (შეცდომის ტექსტში ჩვეულებრივი, რეგისტრისადმი მიუმართავი ქვესტრიქონი, არასოდეს RegExp, ამიტომ ReDoS-ს ვერ გამოიწვევს) და ამ ორიდან მინიმუმ ერთის მითითება სავალდებულოა. როდესაც ორივე მითითებულია, ისინი AND-ით ერთიანდება; გამოტოვებული ველი ნებისმიერ მნიშვნელობას ეთანხმება, ამიტომ `{match: "insufficient_quota"}` ემთხვევა ნებისმიერ სტატუსს, რომელიც ამ კოდს შეიცავს. პირველი შესატყვისი წესი იმარჯვებს. `cooldownMs` იღებს მაქსიმუმ 30 დღეს; სულ დასაშვებია არაუმეტეს 50 წესისა.

**ყველა შემთხვევისთვის მოქმედი ნაგულისხმევი მნიშვნელობები** (`settings.providerErrorDefaults`, ჩასართავი, დაყენებული `setOperatorProviderErrorDefaults`-ის მეშვეობით): `{[provider]: {cooldownMs, scope?, reason?}}`, სადაც `cooldownMs` არის 1 წუთიდან 30 დღემდე. ნაგულისხმევი მნიშვნელობა გამოიყენება მხოლოდ მაშინ, როდესაც არც ოპერატორის წესი და არც ჩაშენებული კატალოგის წესი არ დაემთხვა, და მხოლოდ 402, 403, 408, 429 და 5xx შეცდომებისთვის. მოთხოვნის სტრუქტურის შეცდომები (400, 404, 409, 413, 422) და ცალკე აღებული 401-ები საკუთარ დამუშავებას ინარჩუნებს. თუ `reason` ცალსახად არ არის მითითებული, მიზეზი სტატუსიდან მოდის, ისევე როგორც ამას `classifyError` აკეთებს. ნაგულისხმევი მნიშვნელობის გამოცხადება `hasOperatorRuleForProvider()`-ისთვის ოპერატორის წესად ითვლება, ამიტომ მისი `scope` (ნაგულისხმევად `"connection"`) გათვალისწინებულია. ნაგულისხმევი მნიშვნელობის ეფექტური cooldown არის მისი `cooldownMs`-ისა და პროვაიდერის საკუთარი retry მინიშნების (`Retry-After`, `x-ratelimit-reset` ან body-ში მოცემული reset მინიშნება — იგივე მინიშნება, რომელსაც engine ითვალისწინებს, როდესაც connection-cooldown-ის პარამეტრი "use upstream retry hints" ჩართულია) უფრო ხანგრძლივი მნიშვნელობა, ამიტომ ნაგულისხმევ მნიშვნელობას შეუძლია მოკლე upstream მინიშნების გახანგრძლივება, მაგრამ ის რეალურ reset-ს ვერასდროს შეამცირებს. ცალსახად მითითებული ოპერატორის წესი ინარჩუნებს თავის ზუსტ `cooldownMs`-ს. არცერთი წესი და არცერთი ნაგულისხმევი მნიშვნელობა არ უვლის გვერდს `markAccountUnavailable`-ში connection-cooldown-ის დამცავ პირობებს: მოქმედი, უფრო ხანგრძლივი cooldown არასდროს მცირდება და terminal status არასდროს გადაიწერება. `checkFallbackError`-ში უფრო ადრე გაშვებული ჩაშენებული ტექსტის დეტექტორები (credits exhausted, daily quota, account deactivated) კვლავ პრიორიტეტულია მათთვის განკუთვნილი ფრაზებისთვის.

**ცნობილი ხარვეზი — `providerRuleRegistry` HTTP 400-ისთვის არასდროს მოწმდება.**
`checkFallbackError`-ის `BAD_REQUEST` განშტოება 400 სტატუსს მთლიანად კლასიფიცირებს საკუთარი pattern-მასივების მეშვეობით (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` და სხვები `accountFallback.ts`-ში) და ბრუნდება მანამდე, სანამ მის ზემოთ მდებარე `configuredRule`/`getProviderErrorRuleMatch` განშტოებას მიაღწევს. ჩაშენებული კატალოგის წესი (ან ოპერატორის წესი) `status: 400`-ით სინტაქსურად ვალიდურია, მაგრამ არასდროს ამოქმედდება. დღეს არცერთი არსებული წესი არ ეხება 400-ს, ამიტომ production-ში არაფერს ცვლის — თუმცა მომავალ 400 წესს ჯერ ამ განშტოების შეცვლა დასჭირდება, რაც წესის დამატებაზე უფრო დიდი ცვლილებაა (ის ყველა პროვაიდერისთვის ხელახლა დააკლასიფიცირებს 400-ს, რომლებიც უკვე pattern-მასივების ქცევას ეყრდნობიან) და ერთი პროვაიდერის წესის დამატების ფარგლებს სცდება.

### ახალი quota-misstating gateway-ის დამატება

1. `statusRestatementRegistry`-ში დაარეგისტრირეთ ერთი წესების მასივი
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` შეინარჩუნეთ პროვაიდერისთვის სპეციფიკური; არასდროს გამოიყენოთ ხელახლა ზოგადი ინგლისური ფრაზები, რომლებიც `CREDITS_EXHAUSTED_SIGNALS`-თან (`open-sse/services/accountFallback.ts`) კონფლიქტში შედის.
2. სურვილისამებრ დაარეგისტრირეთ კლასიფიკაციის წესები
   `open-sse/config/providerErrorRules.ts`-ში (`providerRuleRegistry`), რათა აირჩიოთ დაბლოკვის სწორი scope (`connection` account-wide quota-სთვის, `model` თითო მოდელზე მოქმედი შეცდომებისთვის). ეს ნაბიჯი production-ში ძალაში შედის მხოლოდ იმ პროვაიდერებისთვის, რომელთა წესებსაც სრული error text სჭირდებათ (body markers): დაამატეთ პროვაიდერის id `FULL_TEXT_RULE_PROVIDERS`-ში იმავე ფაილში — წინააღმდეგ შემთხვევაში `checkFallbackError` წესს მხოლოდ სტრუქტურირებულ `{code, type}` შეცდომას გადასცემს და body-text წესი live traffic-ზე ვერასდროს დაემთხვევა. წესებს, რომლებიც მხოლოდ `status`/`headers`-ზე ემთხვევა (როგორებიცაა Opencode-ის ან Minimax-ის წესები), ეს opt-in არ სჭირდება. ცალკე, თუ წესი აცხადებს `scope: "connection"`-ს და მიზანი არის რეალური connection-wide cooldown პლუს იმავე მოთხოვნის combo skip (და არა მხოლოდ საინფორმაციო იარლიყი), დაამატეთ პროვაიდერის id `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ში იმავე ფაილში — სწორედ ეს აკონტროლებს `isAgentrouterConnectionQuotaScope()`-ის მსგავს მოხმარებას `markAccountUnavailable()`-ში (`src/sse/services/auth.ts`) და `applyComboTargetExhaustion()`-ში
   (`open-sse/services/combo/targetExhaustion.ts`); ამის გარეშე `scope` კვლავ გაივლის `fallbackResult.ruleScope`-ის გავლით, მაგრამ მასზე არაფერი იმოქმედებს.
3. დაამატეთ unit ტესტები `tests/unit/upstream-status-restatement.test.ts`-ისა
   და `tests/unit/agentrouter-error-rules.test.ts`-ის მიხედვით (მათ შორის
   not-permanent / not-creditsExhausted დამცავი შემოწმებები და — თუ პროვაიდერს allowlist სჭირდება — ტესტი, რომელიც ამტკიცებს, რომ `resolveRuleMatchBody()` სრულ ტექსტს მხოლოდ იმ პროვაიდერისთვის აბრუნებს).

`chatCore.ts`-ში, `classifyError`-ში ან combo-ში ცვლილებები საჭირო არ არის.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ში (opencode-ის ოჯახი) შემავალი პროვაიდერები განიხილება როგორც IP-bucketed upstream (opencode-ის free tier IP-ზეა bucket-ებული და არა account-ზე — იხილეთ #9611): status-429, რომელიც კლასიფიცირებულია როგორც `quota_exhausted` **ან** `rate_limit_exceeded`, cooldown-ს უწესებს allowlisted-family-ის ყველა connection-ს, რომლის ბოლო ცნობილი egress IP ემთხვევა შეცდომის გამომწვევი connection-ის IP-ს, სანამ rotation მათ ცდას დაიწყებს
— რითაც თავიდან იცილებს N-1 გარანტირებულად წარუმატებელ upstream call-ს (იგივე ფორმა, რაც #10460/#10525-ს აქვს).
`rate_limit_exceeded` განზრახ არის ჩართული: `markAccountUnavailable`-ის გზაზე opencode-ისთვის სპეციფიკური წესები არასდროს ემთხვევა (არც headers/body გადაეცემა `checkFallbackError`-ს და opencode არ არის `FULL_TEXT_RULE_PROVIDERS`-ში), ამიტომ 429, რომლის body-შიც subscription-quota ტექსტია ("monthly usage limit reached"), quota-text fallback-ის მიერ (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) კლასიფიცირდება როგორც `quota_exhausted`, მანამდე, სანამ `status_429` წესი შემოწმდება — ხოლო quota-text-ის არმქონე 429 (ჩვეულებრივი rate limiting) `status_429` წესის გავლით კლასიფიცირდება როგორც `rate_limit_exceeded` და IP family-ს მაინც უცხადებს cooldown-ს. Allowlisted პროვაიდერისთვის IP-bucketed rate limit ამოწურული quota-ს იგივე სიგნალია. პატიოსანი შეზღუდვები:

- **მაქსიმალური ძალისხმევით**: დაბლოკვა `proxy_logs`-იდან (24-საათიან ფანჯარაში, სინქრონულად, ქეშის გარეშე) აგვარებს კავშირის ბოლო ცნობილ `egress_ip`-ს. ცივი ქეში (egress
  IP არასდროს შემოწმებულა) ან მწკრივის არარსებობა → წარუმატებელი კავშირი მაინც გადადის გაგრილების რეჟიმში
  განშტოების მიერ (იწერება, როგორც დღეს), უბრალოდ არც ერთი მომიჯნავე კავშირი არ იბლოკება.
- **არასდროს საბოლოო**: გაგრილება არის განახლებადი კვოტის ფანჯარა
  (`testStatus: "unavailable"`); მუდმივი მდგომარეობა არასდროს გამომდინარეობს IP-დონის სიგნალიდან. `disableCooling` კავშირები მთლიანად გამოტოვებენ განშტოებას.
- **დაბლოკვის გრანულარობა იცვლება allowlisted ოჯახისათვის**: ეს არის მასშტაბის ცვლილება და არა მხოლოდ მომიჯნავე კავშირის ოპტიმიზაცია. opencode არის `passthroughModels` პროვაიდერი, ამიტომ ამ განშტოებამდე 429 წარმოქმნიდა თითო-მოდელზე მოქმედ დაბლოკვას; ახლა ის წარმოქმნის კავშირის გაგრილებას — მათ შორის ოპერატორისთვის, რომელიც მხოლოდ ერთ კავშირს იყენებს და საერთოდ არ ჰყავს მომიჯნავე კავშირი. ეს არის ის გრანულარობა, რომელსაც opencode-ის წესების ცხრილი უკვე სწორად აცხადებს (`scope: "connection"`,
  `providerErrorRules.ts`), თუმცა აქამდე არასდროს სრულდებოდა, რადგან opencode არ შედის `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ში. განშტოება თავად წერს წარუმატებელი კავშირის გაგრილებასა და `backoffLevel`-ს, კავშირის მასშტაბის agentrouter-ის განშტოების მსგავსად, და ბრუნდება — თითო-მოდელზე მოქმედი ბლოკი და ქვემოთ მოცემული ზოგადი გზა არასდროს მიიღწევა.
- **Combo ჩართულია**: agentrouter-ის განშტოების მსგავსად, ეს მასშტაბი განზრახ უგულებელყოფს `persistUnavailableState`/`isCombo`-ის დაქვეითებას, რომელსაც combo გამომძახებელი 429-ზე იყენებს. თითო-მოდელზე მოქმედი დაბლოკვა ამ მასშტაბის უფრო სუსტი ფორმა კი არ არის, არამედ არასწორი ერთეულია: ის არაფერს ამბობს ამოწურულ IP-ზე, ამიტომ combo-ის როტაცია თითოეულ მომიჯნავე კავშირზე გააგრძელებდა გარანტირებულად წარუმატებელი ზარის ერთხელ შესრულებას.
- **მომიჯნავე კავშირის უსაფრთხოება**: უკვე საბოლოო მდგომარეობაში მყოფი მომიჯნავე კავშირი (banned/credits_exhausted) ან უკვე უფრო ხანგრძლივ გაგრილებაში მყოფი კავშირი არასდროს გადაიწერება.
- **ექსკლუზიური allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-ის გაფართოება მფლობელის მკაფიო გადაწყვეტილებაა; არ არსებობს ზოგადი დაკავშირება (pattern #10334/#10419). მომიჯნავე კავშირების მოთხოვნა იმავე allowlist-ს აკავშირებს, ნაცვლად იმისა, რომ ის SQL ლიტერალში გაიმეოროს, ამიტომ მისი გაფართოება კვლავ ერთსტრიქონიან ცვლილებად რჩება.
- **Egress IP-ის როტაცია, ორივე მიმართულებით**: ძიების ფანჯარა (24 საათი) გაცილებით ფართოა, ვიდრე egress-IP ქეშის TTL (5 წუთი), ამიტომ „ბოლო ცნობილი IP“ ისტორიაა და არა მიმდინარე მდგომარეობა. თუ კავშირის პროქსი ფანჯრის განმავლობაში შეიცვალა, დაბლოკვამ შეიძლება **გამოტოვოს** ნამდვილად გაზიარებული IP (ჩაწერილი IP არის ახალი, ჯერ არამოწურული) — და სიმეტრიულად, შესაძლოა **გააგრილოს მომიჯნავე კავშირი, რომელიც მას შემდეგ მოშორდა** ამოწურულ IP-ს. მეორე შემთხვევა ამ მომიჯნავე კავშირს ერთი გაგრილების ფანჯრის ფასად უჯდება; ორივე შემთხვევა მიღებულია, როგორც ისტორიაზე დაფუძნებული ძიების მაქსიმალური ძალისხმევის შეზღუდვა.
- **ღირებულება**: `proxy_logs`-ის ორი შეზღუდული სკანირება (`idx_pl_timestamp`-ის მეშვეობით ფანჯრით გაფილტრული), მხოლოდ 429-ის სიხშირით. ახალი ინდექსი არ არის საჭირო (მიგრაცია 134
  YAGNI). გაზომილია რეალური ტრაფიკის DB-ის ასლზე, ზომიერ მასშტაბში; მაღალი გამტარუნარიანობის მქონე ინსტანცია იმავე ფანჯარაში პროპორციულად მეტ მწკრივს ინახავს.

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
