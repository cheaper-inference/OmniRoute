# Resilience Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute પાસે ત્રણ અલગ પરંતુ પરસ્પર સંબંધિત સ્થિતિસ્થાપકતા મિકેનિઝમ છે. દરેકનો વ્યાપ અને હેતુ અલગ છે. રૂટિંગના વર્તનને ડિબગ કરતી વખતે તેમને અલગ રાખો.

![3-સ્તરીય સ્થિતિસ્થાપકતા મોડેલ](../diagrams/exported/resilience-3layers.svg)

> સ્રોત: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. પ્રોવાઇડર સર્કિટ બ્રેકર

**વ્યાપ:** સમગ્ર પ્રોવાઇડર (દા.ત., `glm`, `openai`, `anthropic`).

**હેતુ:** અપસ્ટ્રીમ/સેવા સ્તરે વારંવાર નિષ્ફળ થતા પ્રોવાઇડરને ટ્રાફિક મોકલવાનું બંધ કરવું.

**અમલીકરણ:**

- મુખ્ય ક્લાસ: `src/shared/utils/circuitBreaker.ts`
- વાયરિંગ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- સ્થિતિ API: `GET /api/monitoring/health`
- રીસેટ API: `POST /api/resilience/reset`
- રૅપર્સ: `open-sse/services/accountFallback.ts`
- DB કોષ્ટક: `domain_circuit_breakers`

**સ્થિતિઓ:**

- `CLOSED` — સામાન્ય ટ્રાફિકની મંજૂરી છે
- `DEGRADED` — ટ્રાફિકને હજુ પણ મંજૂરી છે, પરંતુ પ્રોવાઇડરની વધેલી નિષ્ફળતાઓ ટ્રૅક કરવામાં આવી રહી છે; પૂરતી સફળતાઓ પછી, માન્ય કનેક્શન પરીક્ષણ પછી, અથવા નવી નિષ્ફળતા વિના છેલ્લી નિષ્ફળતાના પ્રકાર માટેની સૌથી લાંબી `OPEN` હોલ્ડ અવધિ (તેનું `cooldownByKind` મૂલ્ય, અન્યથા `resetTimeout`, × `maxBackoffMultiplier`, ઓછામાં ઓછું એક કૂલડાઉન) પસાર થયા પછી `CLOSED` પર પાછું ફરે છે
- `OPEN` — પ્રોવાઇડર અસ્થાયી રૂપે અવરોધિત છે; કૉમ્બો રૂટિંગ તેને છોડી દે છે
- `HALF_OPEN` — રીસેટ સમયસમાપ્તિ વીતી ગઈ છે; પ્રોબ વિનંતીની મંજૂરી છે

**ગોઠવી શકાય તેવા ડિફૉલ્ટ્સ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience માં ઉપલબ્ધ):**

| ક્લાસ   | આટલી નિષ્ફળતાઓએ ડિગ્રેડ થાય | આટલી નિષ્ફળતાઓએ ખૂલે | રીસેટ સમયસમાપ્તિ |
| ------- | --------------------------- | -------------------- | ---------------- |
| OAuth   | 5 નિષ્ફળતાઓ                 | 8 નિષ્ફળતાઓ          | 60s              |
| API-key | 7 નિષ્ફળતાઓ                 | 12 નિષ્ફળતાઓ         | 30s              |
| સ્થાનિક | તારવેલ                      | 2 નિષ્ફળતાઓ          | 15s              |

`degradationThreshold` પ્રોવાઇડર ક્યારે `DEGRADED` સ્થિતિમાં પ્રવેશે તે નિયંત્રિત કરે છે; `failureThreshold` તે ક્યારે ખૂલે અને તેને ક્યારે છોડી દેવામાં આવે તે નિયંત્રિત કરે છે. સ્થાનિક પ્રોવાઇડર પ્રોફાઇલ્સ હજી Resilience સેટિંગ્સ પેજ પર ઉપલબ્ધ નથી.

**ટ્રિપ કોડ્સ:** માત્ર પ્રોવાઇડર-સ્તરની સ્થિતિઓ `[408, 500, 502, 503, 504]`. એકાઉન્ટ-સ્તરની ભૂલો માટે ટ્રિપ કરશો નહીં (મોટાભાગની 401/403/429 — તે કૂલડાઉન અથવા લૉકઆઉટ હેઠળ આવે છે).

**લેઝી પુનઃપ્રાપ્તિ:** જ્યારે `OPEN` ની અવધિ પૂરી થાય છે, ત્યારે `getStatus()`, `canExecute()`, `getRetryAfterMs()` સ્થિતિને `HALF_OPEN` પર રિફ્રેશ કરે છે. આ જ રીડ્સ (અને આગામી નિષ્ફળતા) જૂની `DEGRADED` સ્થિતિને પાછી `CLOSED` માં ફેરવે છે. કોઈ બૅકગ્રાઉન્ડ ટાઇમરની જરૂર નથી.

---

### ઑપ્ટ-ઇન વૈશ્વિક પ્રોવાઇડર કૂલડાઉન (વિન્ડો ગેટ)

ચોથું, **ઑપ્ટ-ઇન** સ્તર (`PROVIDER_COOLDOWN_ENABLED`, ડિફૉલ્ટ રૂપે **બંધ**) નિષ્ફળ થતા પ્રોવાઇડર્સની
ક્રોસ-રિક્વેસ્ટ મેમરી
`open-sse/services/providerCooldownTracker.ts` માં રાખે છે, જેનો ઉપયોગ કૉમ્બો ટાર્ગેટ
રિઝોલ્યુશન દ્વારા થાય છે જેથી સતત કૉમ્બો વિનંતીઓ હમણાં જ
નિષ્ફળ થયેલા પ્રોવાઇડરને ફરીથી તપાસવાનું બંધ કરે. પ્રોવાઇડર-સ્તરની એન્ટ્રીઓ `PROVIDER_PROFILES` વિન્ડો ગેટનું પાલન કરે છે:

| પ્રોફાઇલ | આટલા પછી ટ્રિપ થાય (`providerFailureThreshold`) | આ અવધિની અંદર (`providerFailureWindowMs`) | આટલા સમય માટે કૂલ થાય (`providerCooldownMs`) |
| -------- | ----------------------------------------------: | ----------------------------------------: | -------------------------------------------: |
| OAuth    |                                            `10` |                                   `15min` |                                       `5min` |
| API key  |                                            `15` |                                   `30min` |                                      `10min` |

થ્રેશોલ્ડથી નીચે પ્રોવાઇડરને **કૂલ થઈ રહેલો** માનવામાં આવતો નથી; સફળતા
વિન્ડોને સાફ કરે છે. તેના બદલે, કનેક્શન-સ્તરની એન્ટ્રીઓ (`provider:connectionId`)
એક્સ્પોનેન્શિયલ `minRetryCooldownMs → maxRetryCooldownMs` બૅકઑફ જાળવી રાખે છે. ઓવરરાઇડ્સ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
રિગ્રેશન ગાર્ડ: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. કનેક્શન કૂલડાઉન

**વ્યાપ:** એક પ્રોવાઇડર કનેક્શન/એકાઉન્ટ/કી.

**હેતુ:** સમાન પ્રોવાઇડરનાં અન્ય કનેક્શનો સેવા આપવાનું ચાલુ રાખે ત્યારે એક ખરાબ કીને અવગણવી.

**અમલીકરણ:**

- અનુપલબ્ધ તરીકે ચિહ્નિત કરવું: `src/sse/services/auth.ts::markAccountUnavailable()`
- પસંદગી: સમાન ફાઇલમાં `getProviderCredentials*`
- કૂલડાઉનની ગણતરી: `open-sse/services/accountFallback.ts::checkFallbackError()`
- સેટિંગ્સ: `src/lib/resilience/settings.ts`

**દરેક કનેક્શન માટેનાં ફીલ્ડ્સ:**

- `rateLimitedUntil` — કૂલડાઉન સમાપ્ત થાય ત્યાં સુધીનો ટાઇમસ્ટૅમ્પ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — એક્સ્પોનેન્શિયલ બૅકઑફ કાઉન્ટર

**ડિફૉલ્ટ કૂલડાઉન:**

- OAuth બેઝ: 5s
- API-key બેઝ: 3s
- API-key 429: અપસ્ટ્રીમ `Retry-After`/રીસેટ હેડર્સ/પાર્સ કરી શકાય તેવા રીસેટ ટેક્સ્ટને પ્રાથમિકતા આપે છે
- બૅકઑફ: `baseCooldownMs * 2 ** failureIndex`

**થન્ડરિંગ-હર્ડ વિરોધી સુરક્ષા:** સમકાલીન નિષ્ફળતાઓને કૂલડાઉન અતિશય લંબાવવાથી અથવા `backoffLevel`ને બે વાર વધારવાથી અટકાવે છે.

**કન્કરન્સી-લિમિટ 429 બૅકઑફનાં સ્તરો પર આગળ વધતા નથી.** એવો `429` કે જેના બૉડીમાં
કન્કરન્સી મર્યાદા ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) દર્શાવવામાં આવે, તેનો અર્થ એ છે કે એકાઉન્ટ સ્વસ્થ છે પરંતુ વ્યસ્ત છે.
`checkFallbackError()` કારણ તરીકે `concurrency_limited` પરત કરે છે: હવે પછીના
કનેક્શન પર ફેઇલ ઓવર કરો, આ કનેક્શનને નિશ્ચિત `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) માટે અથવા
અપસ્ટ્રીમ રીટ્રાય સંકેત મુજબ કૂલડાઉન કરો, `backoffLevel` અપરિવર્તિત રાખો અને `skipProviderBreaker` સેટ કરો.
સ્પષ્ટ ક્વોટા બૉડીને હજુ પણ પ્રાથમિકતા મળે છે, તેથી ક્વોટા પેટર્ન સાથે પણ મેળ ખાતી બૉડી માટે ક્વોટાનો
નિર્ણય જ રહે છે. શોધ: `src/shared/utils/classify429.ts`માં `looksLikeConcurrencyLimit()`;
નિર્ણય: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (બ્રેકરનો
`FailureKind`) અપરિવર્તિત છે અને આવી બૉડી માટે હજુ પણ `rate_limit` વાંચે છે.

**સ્ટ્રીમ સામગ્રી અટકી જવાથી એકાઉન્ટ કૂલડાઉન થતું નથી.** જ્યારે કન્ટેન્ટ-સ્ટૉલ વૉચડૉગ
(`open-sse/utils/streamHandler.ts`) સમયસર કોઈ મૉડલ આઉટપુટ ન મોકલનાર સ્ટ્રીમને છોડી દે છે,
ત્યારે `markAccountUnavailable()` કનેક્શન પર ભૂલ નોંધે છે પરંતુ કોઈ
કૂલડાઉન સેટ કરતું નથી: સ્ટૉલ તે વિનંતીનો હોય છે અને મોટા ભાગે હજુ સુધી કોઈ
આઉટપુટ ન ધરાવતો લાંબો રીઝનિંગ ટર્ન હોય છે. ઑપરેટર્સ `resilienceSettings.streamStallCooldown.enabled`
(ડિફૉલ્ટ `false`) વડે તેને ફરી સક્રિય કરવાનું પસંદ કરી શકે છે.

**રીઝનિંગ ફ્રેમ્સ કન્ટેન્ટ-સ્ટૉલ બજેટ ફરી શરૂ કરે છે.** રીઝનિંગ મૉડલ પોતાના પ્રથમ દૃશ્યમાન ટોકન પહેલાં
મિનિટો સુધી વિચારી શકે છે: Claude એવી `thinking_delta` ફ્રેમ્સ સ્ટ્રીમ કરે છે જેનો
થિંકિંગ ટેક્સ્ટ ખાલી હોઈ શકે છે, અને Responses API એક પછી એક રીઝનિંગ આઇટમ સ્ટ્રીમ કરે છે.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) આ
ફ્રેમ્સને ઓળખે છે અને ટર્ન રદ કરવાને બદલે દરેક ફ્રેમ પર વૉચડૉગનું બજેટ ફરી શરૂ કરે છે.
તે હજી પણ મૉડલ આઉટપુટ નથી, તેથી ફક્ત રીઝનિંગ સાથે સમાપ્ત થતો ટર્ન હજુ પણ
ખાલી તરીકે રિપોર્ટ થાય છે, અને રીઝનિંગ બંધ કરીને માત્ર હાર્ટબીટ્સ મોકલતો ટર્ન હજુ પણ
વૉચડૉગને ટ્રિગર કરે છે.

ખાલી ન હોય તેવી સિગ્નેચર ધરાવતી Kiroની બાઇનરી `reasoningContentEvent` ફ્રેમ્સ આ
રીઝનિંગ પ્રવૃત્તિને એક ખાલી `reasoning_content` ડેલ્ટા તરીકે એક્ઝિક્યુટર મારફતે જાળવી રાખે છે. સિગ્નેચર
આગળ મોકલવામાં આવતી નથી. મેટાડેટા, અધૂરી ફ્રેમ્સ અને ખાલી સિગ્નેચર્સ
કન્ટેન્ટ બજેટ ફરી શરૂ કરતા નથી; સ્વતંત્ર સક્રિય-સ્ટ્રીમ ટાઇમઆઉટ અને ક્લાયન્ટ રદ કરવાની પ્રક્રિયા હજુ પણ
લાગુ પડે છે (`open-sse/executors/kiro/reasoning.ts`).

**ટર્મિનલ સ્થિતિઓ (કૂલડાઉન નથી):**

- `banned` — પ્રતિબંધિત-કીવર્ડ / એકાઉન્ટ-પ્રતિબંધ શોધ દ્વારા સેટ થાય છે ([BAN_DETECTION](../security/BAN_DETECTION.md) જુઓ), તેમજ સતત ત્રણ અપસ્ટ્રીમ પ્રતિ-વિનંતી ઇનકાર (`request_rejected`, ઉદાહરણ તરીકે Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) દ્વારા; એક ઇનકાર માત્ર કનેક્શનને કૂલડાઉન કરે છે
- `expired` (મર્યાદિત રીટ્રાય પછી ટર્મિનલ સ્થિતિમાં પરિવર્તિત થાય છે — એક્સ્પોનેન્શિયલ બૅકઑફ સાથે `EXPIRED_RETRY_MAX = 3` — જેથી એકાઉન્ટ કાયમી રીતે નિષ્ક્રિય થાય તે પહેલાં ક્ષણિક OAuth ભૂલો આપમેળે સુધરી શકે)
- `credits_exhausted`

ક્રેડેન્શિયલ્સ બદલાય અથવા ઑપરેટર તેમને રીસેટ કરે ત્યાં સુધી આ સ્થિતિઓ જળવાઈ રહે છે. ટર્મિનલ સ્થિતિઓને ક્ષણિક કૂલડાઉન સ્થિતિ વડે ઓવરરાઇટ કરશો નહીં.

**લેઝી રિકવરી:** `rateLimitedUntil` વીતી જાય ત્યારે કનેક્શન ફરી પાત્ર બને છે. સફળ ઉપયોગ પર, `clearAccountError()` તમામ ભૂલ ફીલ્ડ્સ સાફ કરે છે.

### Claude OAuth વપરાશ મર્યાદા: નીચી-પ્રાથમિકતાવાળી લેન + સેશન-લિમિટ રીસેટ

**વ્યાપ:** એક Claude સબ્સ્ક્રિપ્શન (OAuth) કનેક્શન. બંને સુવિધાઓ **દરેક
કનેક્શન માટે ઑપ્ટ-ઇન** છે (કનેક્શન સંપાદિત કરો → Claude વિભાગ → `providerSpecificData`માં
`lowPriorityMode` / `autoLimitReset`, બંને ડિફૉલ્ટ રૂપે બંધ) અને Claude Codeનાં `/low-priority` તથા
`/limit-reset` કમાન્ડ્સને પ્રતિબિંબિત કરે છે (Claude Code 2.1.263માંથી મેળવેલ વાયર કોન્ટ્રાક્ટ).

**અમલીકરણ:**

- સ્ટેટ મશીન + રિસ્પોન્સ વર્ગીકરણ: `open-sse/services/claudeLowPriority.ts`
- રીસેટ સ્ટેટસ/ક્લેઇમ ક્લાયન્ટ: `open-sse/services/claudeLimitReset.ts`
- એક્ઝિક્યુટર હૂક (હેડર ઇન્જેક્શન + સમાન-એકાઉન્ટ રીટ્રાય): `open-sse/executors/base.ts::execute()`
- ઑપ્ટ-ઇન પર્સિસ્ટન્સ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ટ્રિગર:** 5-કલાકની વપરાશ મર્યાદા — એવો `429` જેના હેડર્સમાં
`anthropic-ratelimit-unified-status: rejected` હોય અને, જ્યારે એકાઉન્ટ પાત્ર હોય ત્યારે,
`anthropic-ratelimit-unified-slow-offer: treatment` હોય. તે પ્રથમ મર્યાદા
429 પહેલાં કશું મોકલવામાં આવતું નથી; યુનિફાઇડ હેડર્સ વિનાનો બર્સ્ટ 429 સામાન્ય કૂલડાઉન પાથમાંથી પસાર થાય છે.

**નીચી-પ્રાથમિકતાવાળી લેન** (`lowPriorityMode`):

- વૉલ 429 પર executor ઑફર સ્વીકારે છે અને તરત જ **એ જ**
  account ને `anthropic-usage-limit: slow` સાથે ફરીથી અજમાવે છે; જાહેર કરાયેલા
  `anthropic-ratelimit-unified-reset` (+60s છૂટ) સુધી lane સક્રિય રહે છે અને તે વિન્ડોમાંની દરેક request
  header ધરાવે છે. અટકાવવામાં આવેલ 429 ક્યારેય `handleChatCore` સુધી પહોંચતો નથી, તેથી connection ને
  cooldown માં મૂકવામાં આવતું **નથી** અને તેને rotate કરીને દૂર કરવામાં આવતું નથી.
- પછીના responses પર `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  lane ચાલુ રાખે છે; `slot_busy` (429) અથવા `529`, server ના
  `anthropic-ratelimit-unified-slow-retry-after` જેટલો સમય રાહ જુએ છે (ડિફૉલ્ટ 20s, 5–600s સુધી clamp, ±30% jitter)
  અને ફરીથી પ્રયાસ કરે છે, જે `anthropic-ratelimit-unified-slow-max-wait` દ્વારા મર્યાદિત છે (ડિફૉલ્ટ 20 min, clamp
  1 min–6 h) — એ સમય વટાવ્યા પછી lane સમાપ્ત થાય છે અને 10-minute cool-off ફરીથી સ્વીકાર થતો અટકાવે છે. રાહ જોવાનો
  સમય request ના પોતાના upstream-start timeout માં બાકી રહેલા સમય દ્વારા પણ મર્યાદિત થાય છે
  (`resolveFetchStartTimeout`, ડિફૉલ્ટ રૂપે 10 min) અને તેમાંથી 5 s નું margin બાદ કરવામાં આવે છે: આ મર્યાદા વિના
  20-minute ડિફૉલ્ટ max-wait request કરતાં લાંબો ચાલે અને sleep રાહ જોવાની વચ્ચે જ abort થાય,
  જેના કારણે સુવ્યવસ્થિત `max_wait` સમાપ્તિ + cool-off ને બદલે `TimeoutError` સપાટી પર આવે.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, અથવા
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (જે કોઈપણ status પર તેને
  `extra_usage` તરીકે સમાપ્ત કરે છે, કારણ કે હવે paid overage વૉલને આવરી લે છે) lane સમાપ્ત કરે છે; ત્યાર પછી
  response સામાન્ય cooldown path પર જાય છે. `budget_exhausted` જાહેર કરાયેલા budget reset સુધી
  યાદ રાખવામાં આવે છે (≤ 8 days).
- વૉલ ચકાસણી executor ના પોતાના 400 દ્વારા સંચાલિત intra-attempt retries પછી ચાલે છે (context
  editing, thinking/effort clamps, param auto-learn), તેથી માત્ર આવા કોઈ retry પર દેખાતો wall 429 પણ
  cooldown path સુધી પહોંચવાને બદલે અટકાવવામાં આવે છે.
- State દરેક connection માટે in-memory છે (restart પછી ફરીથી સ્વીકારવા માટે એક વધારાનો wall 429 લાગે છે).

**Session-limit reset** (`autoLimitReset`, બંને ચાલુ હોય ત્યારે lane પહેલાં અજમાવવામાં આવે છે):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block; જ્યારે `arm: "reset"` અને `available: true` હોય ત્યારે,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ને
  `{ "program": "juniper_tide" }` સાથે મોકલવામાં આવે છે (organization UUID
  `providerSpecificData.organizationUUID` માંથી, bootstrap fallback).
- `result: reset|not_limited` → request ને સંપૂર્ણ ઝડપે ફરીથી અજમાવવામાં આવે છે (slow header વિના).
  `already_used` / `not_offered`, `next_available_at` ને memoise કરે છે (ડિફૉલ્ટ એક અઠવાડિયું); કોઈપણ
  નિષ્ફળતા માટે 15 minutes નું backoff થાય છે. reset અઠવાડિયામાં એક જ વાર થાય છે અને તેમ છતાં
  weekly limit માં ગણાય છે.

Regression guards: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Session affinity (#7274)

**વ્યાપ:** એક client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header), **કોઈપણ** provider માટે એક connection સાથે pinned રહે છે.

**હેતુ:** multi-turn agent (Claude Code, aider, custom agents) ને requests દરમિયાન એ જ account પર રાખવું, જેથી per-account session state ધરાવતા providers પર cross-account context loss અને વારંવાર થતા cold-start 429s ઘટે.

**અમલીકરણ:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic, any provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (ms માં global TTL, `0` અક્ષમ કરે છે) — `src/lib/db/settings.ts`. migration `124_generic_session_affinity_ttl.sql` દ્વારા Codex-માત્ર `codexSessionAffinityTtlMs` માંથી નામ બદલવામાં આવ્યું છે, જે અગાઉ configure કરાયેલ કોઈપણ Codex TTL ને નવા ડિફૉલ્ટ તરીકે સ્થાનાંતરિત કરે છે.

#7274 પહેલાં, `resolveSessionAffinityTtlMs()` એ `codex` સિવાય દરેક provider માટે સીધું `0` પર hard-bail કર્યું હતું, તેથી pinning mechanism અને header extraction પહેલેથી provider-agnostic હોવા છતાં TTL setting (અને session headers) ની અન્ય ક્યાંય કોઈ અસર થતી નહોતી. સુધારામાં તે early-return દૂર કરવામાં આવ્યું; હવે globally `0` કરતાં વધુ પર set કર્યા પછી TTL દરેક provider પર સમાનરૂપે લાગુ થાય છે.

ત્રણેય session-affinity headers ક્યારેય upstream forward થતા નથી — executors client headers ને પસાર કરવાને બદલે પોતાના upstream headers શરૂઆતથી બનાવે છે, તેથી આ માત્ર internal correlation id જ રહે છે.

### Exclusive managed session connection leases

**વ્યાપ:** એક સક્રિય managed HTTP client/session એક eligible OmniRoute connection નો માલિક બને છે.

**હેતુ:** requests વચ્ચે કડક routing fence જરૂરી હોય એવા clients ને ટકાઉ exclusive connection ownership આપવું. આ session affinity થી અલગ છે, જે soft continuity preference છે:
exclusive lease lifecycle state ને SQLite માં persist કરે છે, global active-owner અને
active-connection uniqueness લાગુ કરે છે અને provider dispatch પહેલાં stale generation ને નકારે છે.

આ feature દરેક API key માટે opt-in છે. managed key પાસે `lease:exclusive` scope અને
સ્પષ્ટ non-empty `allowedConnections` list હોવી આવશ્યક છે. કોઈપણ HTTP client lifecycle endpoint નો ઉપયોગ કરી શકે છે; કોઈ
client name, user-agent, provider, OAuth method અથવા model આવશ્યક નથી. lease connection નો માલિક બને છે,
model નો નહીં, તેથી connection સામાન્ય રીતે eligible રહે ત્યાં સુધી model change binding જાળવી રાખે છે.
સામાન્ય model, quota, health, cooldown અને allowlist rules અધિકૃત રહે છે અને એ જ generation ને
અન્ય free eligible connection પર transition કરી શકે છે.

જીવનચક્ર JSON ક્રિયાઓ `acquire`, `renew`, અને `release` સાથેનું `POST /api/v1/session-leases` છે.
મેનેજ્ડ ઇન્ફરન્સ વિનંતીઓ અપારદર્શક `X-OmniRoute-Lease-Owner` મૂલ્ય અને ચોક્કસ
`X-OmniRoute-Lease-Generation` રજૂ કરે છે. ઓનર `vlo_` પછી 43 base64url અક્ષરોનો ઉપયોગ કરે છે; માત્ર
તેનો SHA-256 હૅશ સંગ્રહિત થાય છે. દરેક અંતિમ ડિસ્પેચ ફેન્સ પ્રમાણિત API કી ID અને
સક્રિય કનેક્શન IDને પણ બાંધે છે. લીઝ નિયંત્રણ હેડર્સને લૉગ્સ, જાળવી રાખેલા વિનંતી સ્નૅપશૉટ્સ અને
અપસ્ટ્રીમ એક્ઝિક્યુટર હેડર્સમાંથી દૂર કરવામાં આવે છે.

જો સામાન્ય રાઉટિંગ પાસે પાત્ર મેનેજ્ડ ઉમેદવારો હોય, પરંતુ દરેક ખાલી ઉમેદવાર કોઈ
અન્ય પક્ષની સક્રિય લીઝ દ્વારા કબજામાં હોય, તો OmniRoute HTTP `429`, lease-capacity-unavailable કોડ,
ક્ષમતાની રાહ જોતી સ્થિતિ અને સૌથી વહેલી સંબંધિત સમાપ્તિ પરથી મેળવેલ મર્યાદિત `Retry-After` પરત કરે છે.
સામાન્ય ખાલી પાત્રતા લીઝ વિવાદ નથી અને તે તેના હાલના રાઉટિંગ ભૂલના અર્થવિજ્ઞાનને જાળવી રાખે છે.

સંબંધિત મિકેનિઝમ્સ અલગ રહે છે:

- OAuth સેશન ઓક્યુપન્સી એ OAuth એકાઉન્ટ્સ માટેની પ્રોસેસ-લોકલ સૉફ્ટ વિતરણ વ્યવસ્થા છે.
- એકાઉન્ટ સેમાફોર્સ વિનંતી-સમાંતરતા પરમિટ આપે છે અને વિનંતી પૂર્ણ થાય ત્યારે સમાપ્ત થાય છે.
- એક્સક્લૂસિવ મેનેજ્ડ સેશન લીઝ એ જનરેશન ફેન્સ સાથેનું ટકાઉ જીવનચક્ર માલિકીપણું છે.

---

## 3. મોડેલ લૉકઆઉટ

**વ્યાપ:** provider + connection + model ત્રિપુટી.

**સ્થિતિ મુજબ કીનો વ્યાપ:** નિષ્ફળતાની સ્થિતિ નક્કી કરે છે કે લૉકઆઉટ કઈ કીમાં
લખાશે (`open-sse/services/accountFallback/exactModelLock.ts` માં `resolveLockoutScope()`):

- `429` / `403` / `402` — ક્વોટા અથવા અધિકારનો સંકેત — **ક્વોટા ફૅમિલી**ને લૉક કરે છે:
  codex માટે સમગ્ર `codex` / `spark` વ્યાપ (connectionનું દરેક `gpt-5*` model),
  અન્ય providers માટે `getQuotaScopedModelForProvider()`.
- `404` મૂળ modelને લૉક કરે છે (`getModelLockKey()` `not_found`ને સંકુચિત કરે છે).
- અન્ય કોઈપણ સ્થિતિ — `5xx` ટ્રાન્સપોર્ટ/server નિષ્ફળતાઓ અને ગુણવત્તા માન્યતામાંથી
  OmniRoute દ્વારા સ્વયં બનાવાયેલ `502` — ફક્ત **ચોક્કસ**
  provider/connection/model ત્રિપુટીને લૉક કરે છે. એક model પર ખરાબ stream એ
  accountના quota વિશેનો પુરાવો નથી; આ નિયમ પહેલાં
  `codex/gpt-5.6-luna` પરના એક ખાલી responseને કારણે તે connectionનાં દરેક
  `gpt-5*` modelને routingમાંથી 2–30 મિનિટ માટે (વધતા ક્રમમાં) દૂર કરવામાં આવતાં,
  જ્યારે તેનો quota અસ્પર્શિત રહેતો.
- callerનો સ્પષ્ટ `scope` વિકલ્પ હંમેશાં પ્રાધાન્ય પામે છે (Antigravity `"exact"` પસાર કરે છે).

**હેતુ:** માત્ર એક model અનુપલબ્ધ હોય અથવા quota દ્વારા મર્યાદિત હોય ત્યારે સમગ્ર connectionને અક્ષમ કરવાનું ટાળવું.

**ઉદાહરણો:**

- પ્રતિ-model quota ધરાવતા providers દ્વારા પરત કરાતો 429
- એક ગુમ model માટે local providers દ્વારા પરત કરાતો 404
- Provider-વિશિષ્ટ mode/model પરવાનગી નિષ્ફળતાઓ (દા.ત., Grok modes)

**અમલીકરણ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns ડૅશબોર્ડ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

સક્રિય lockoutsને આ વિગતો સાથે સૂચિબદ્ધ કરે છે: provider, connection, model, reason, expiresAt. ઑપરેટરો cardમાંથી modelને મેન્યુઅલી ફરી સક્ષમ કરી શકે છે.

**REST API:**

- `GET /api/resilience/model-cooldowns` — સક્રિય lockoutsની સૂચિ
- `DELETE /api/resilience/model-cooldowns` — મેન્યુઅલ પુનઃસક્ષમીકરણ. Body: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

દરેક provider page ખોલવાને બદલે, ક્ષણિક કારણસર routingમાંથી બહાર હોય તેવા દરેક connection માટે એક જ page.
તે connection cooldowns, model lockouts અને terminal statesને સૂચિબદ્ધ કરે છે; તેમને પ્રતિ connection,
પસંદગી માટે અથવા providerનાં તમામ connections માટે સાફ કરે છે; અને સૌથી વધુ સમાયોજિત કરાતા cooldown
નિયમોને સંપાદિત કરે છે: `streamStallCooldown.enabled` તથા OAuth / API-key
`connectionCooldown`નું base cooldown અને maximum backoff steps (`PATCH /api/resilience`
દ્વારા સાચવવામાં આવે છે). Terminal states (`banned`, `expired`, `credits_exhausted`) અહીં
સૂચિબદ્ધ થાય છે, પરંતુ ક્યારેય સાફ કરવામાં આવતાં નથી.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, બાકી રહેલો cooldown,
  backoff level, છેલ્લો error type અને model lockouts ધરાવતા connections (કોઈ credentials નહીં)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` અથવા
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` પરત કરે છે

### Lockout settings UI + success-decay recovery (v3.8.23)

Model lockout હંમેશાં સક્રિય રહેતી hardcoded વર્તણૂકમાંથી સંપૂર્ણપણે રૂપરેખાંકિત કરી શકાય તેવી,
પસંદગીથી સક્ષમ થતી સુવિધામાં પરિવર્તિત થયું છે, જેમાં તેનું પોતાનું settings card અને self-healing recovery path છે.

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
આ ઉપરના ફક્ત વાંચી શકાય તેવા `ModelCooldownsCard`થી **અલગ** છે (જે ફક્ત
સક્રિય lockoutsને _સૂચિબદ્ધ_ કરે છે) — નવું card _parametersને રૂપરેખાંકિત કરે છે_. Defaults
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)માં છે:

| સેટિંગ                  | Default                          | અર્થ                                                               |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | મુખ્ય toggle — model lockout **ડિફૉલ્ટરૂપે બંધ** છે.               |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | model-વ્યાપી નિષ્ફળતા તરીકે ગણાતી upstream statuses.               |
| `baseCooldownMs`        | `120_000` (120 s)                | પ્રથમ નિષ્ફળતા માટેની પ્રારંભિક lockout અવધિ.                      |
| `maxCooldownMs`         | `1_800_000` (30 min)             | વધારવામાં આવેલા cooldownની મહત્તમ મર્યાદા.                         |
| `maxBackoffSteps`       | `10`                             | exponential-backoff વધારાના મહત્તમ steps.                          |
| `useExponentialBackoff` | `true`                           | પુનરાવર્તિત નિષ્ફળતાઓ cooldownને exponential રીતે વધારે છે કે કેમ. |

Settings સામાન્ય settings store દ્વારા જળવાઈ રહે છે અને resilience settings schema દ્વારા
માન્ય થાય છે; card `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` સાથે) અને `maxBackoffSteps`ને મર્યાદામાં રાખે છે.

**Success-decay recovery:** recovery ફક્ત timer expiry પર આધારિત **નથી**. એક healthy
response modelની failure countને ક્રમશઃ ઘટાડે છે, જેથી windowની વચ્ચે recover થયેલું model
તેનો timer સમાપ્ત થાય તે પહેલાં escalation અટકાવે છે (અને સાફ થાય છે). સફળ
combo target પર, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`)ને કૉલ કરે છે, જે સંગ્રહિત
`failureCount`ને **અડધો** કરે છે (`Math.floor(failureCount / 2)`); જ્યારે તે `0` પર પહોંચે છે,
ત્યારે lockout entry સંપૂર્ણપણે કાઢી નાખવામાં આવે છે. તેનો સમકક્ષ `recordModelLockoutFailure()`
escalation windowની અંદરની નિષ્ફળતાઓ પર count વધારે છે (અને cooldownને વધારે છે).
આ success-decay સાદા timer expiry ઉપરાંત છે — બંનેમાંથી કોઈપણ માર્ગ modelને ફરી સક્ષમ કરી શકે છે.

**સ્થિતિ:** lockouts **in-memory** રાખવામાં આવે છે (દરેક process માટેના `Map`s,
જેમાં `ModelLockoutEntry`ની કી `provider:connectionId:model` અને exact-scope locksની કી
`provider:connectionId:exact:model` હોય છે), DBમાં જળવાતા
નથી — restart થતાં તે ગુમ થઈ જાય છે. _Settings_ જળવાઈ રહે છે; સક્રિય
lockout _સ્થિતિ_ ક્ષણિક છે.

---

## 4. ક્વોટા-શેર સમકાલીનતા નિયંત્રણ (v3.8.36)

સબ્સ્ક્રિપ્શન એકાઉન્ટ્સ (GLM, MiniMax વગેરે) ઘણીવાર માત્ર ~1–3 સમકાલીન
વિનંતીઓ સ્વીકારે છે; તેનાથી વધુ થતાં 429 અને કૂલડાઉન ટ્રિગર થાય છે. આ સમસ્યા
**quota-share** (`qtSd/…`) કોમ્બોમાં વધુ ગંભીર છે, જ્યાં અનેક API કી એક જ અપસ્ટ્રીમ
એકાઉન્ટ શેર કરે છે. ત્રણ સ્તરો શેર કરેલા એકાઉન્ટને વિનંતીઓથી ભરાઈ જતું અટકાવે છે.

### પ્રતિ-કનેક્શન સમકાલીનતા મર્યાદા (`max_concurrent`)

દરેક પ્રોવાઇડર કનેક્શન `max_concurrent` મહત્તમ મર્યાદા જાહેર કરી શકે છે
(`provider_connections.max_concurrent`, જે કનેક્શન મોડલ / API / DBમાં સેટ થાય છે).
કોઈ મર્યાદા ન રાખવા માટે તેને ખાલી છોડો. આ એકમાત્ર સેટિંગ છે જે નીચેના સીરિયલાઇઝેશન
સ્તરને નિયંત્રિત કરે છે — તેને એકાઉન્ટની વાસ્તવિક સમકાલીનતા અનુસાર સેટ કરો (દા.ત. GLM ~1, MiniMax ~2).

### પ્રતિ-મોડલ સમકાલીનતા મર્યાદાઓ (`modelConcurrency`)

કનેક્શન તેના `rateLimitOverrides` મેપની અંદર ચોક્કસ પ્રતિ-મોડલ સમકાલીનતા મહત્તમ
મર્યાદાઓ પણ જાહેર કરી શકે છે:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

તેને કનેક્શન મોડલમાં (**દર મર્યાદા ઓવરરાઇડ્સ → પ્રતિ-મોડલ
સમકાલીનતા મર્યાદાઓ**, દરેક લાઇનમાં એક `model=cap`) અથવા સમાન JSON રચના સાથે
`PATCH /api/providers/[id]` મારફતે સેટ કરો. કીના અર્થનિયમો:

- **સમગ્ર કનેક્શન વિરુદ્ધ મોડલ-વિશિષ્ટ:** `maxConcurrent` શેર કરેલી
  સમગ્ર-કનેક્શન મહત્તમ મર્યાદા તરીકે યથાવત્ રહે છે. જ્યારે બંને લાગુ પડે, ત્યારે બંને ગેટ
  સમાન સંયુક્ત ગેટમાં પરમાણ્વિક રીતે પ્રાપ્ત કરવામાં આવે છે
  (`global → provider → account → model`); અસરકારક વર્તન વધુ કડક લાગુ પડતી
  મર્યાદાનું હોય છે.
- **ચોક્કસ મોડલ-કી મેળ:** કી એ રાઉટિંગ રિઝોલ્યુશન પછી એક્ઝિક્યુટરને આપવામાં આવતી
  મોડલ સ્ટ્રિંગ છે — સામાન્ય રીતે માત્ર અપસ્ટ્રીમ મોડલ id
  (`glm-5`), ક્લાયન્ટ-સાઇડ `provider/model` ઉપનામ નહીં (`zai/glm-5`
  એ `glm-5` સાથે મેળ ખાતું નથી). મૂલ્યો ધન પૂર્ણાંક સમકાલીન-વિનંતી મહત્તમ મર્યાદાઓ છે.
- **સ્થાનિક કતારબદ્ધતા, કોઈ શોધ નહીં:** વધારાની વિનંતીઓ હાલના
  કતાર/ટાઇમઆઉટ અર્થનિયમો સાથે સ્થાનિક રીતે કતારમાં જાય છે (ટાઇપ કરેલી `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` પ્રવેશ ભૂલો). OmniRoute અપસ્ટ્રીમ નીતિ શોધતું કે
  અનુમાનિત કરતું નથી — તે ઑપરેટરે ગોઠવેલી ચોક્કસ મહત્તમ મર્યાદાઓ લાગુ કરે છે.
  સંતૃપ્ત મોડલ ગેટ ક્યારેય પ્રોવાઇડરને અક્ષમ કરતું નથી અને ક્યારેય
  કાયમી મોડલ લૉકઆઉટ બનાવતું નથી; અપસ્ટ્રીમ 429/કૂલડાઉન/ફૉલબૅક વર્તન
  ભૂલો સામેના અંતિમ સંરક્ષણ તરીકે યથાવત્ રહે છે.
- **પ્રતિ-કનેક્શન, પ્રતિ-પ્રોસેસ વ્યાપ:** મર્યાદાઓ દરેક ડેટાબેઝ કનેક્શન દીઠ છે
  અને ઇન-મેમરી જાળવવામાં આવે છે, તેથી સમાન અપસ્ટ્રીમ API કીનો ફરીથી ઉપયોગ કરતા બે કનેક્શન
  એકબીજા સાથે સમન્વય કરતા નથી.
- **ગોઠવણી ન કરવી એટલે કોઈ ફેરફાર નહીં:** મેપને છોડવાથી (અથવા
  ડૅશબોર્ડ ફીલ્ડ ખાલી રાખવાથી) કોઈ મોડલ ગેટ ઉમેરાતો નથી. કોઈ સાર્વત્રિક
  પ્રોવાઇડર મર્યાદાનો દાવો કર્યા વગરનું ઉદાહરણ રૂપરેખાંકન:

```text
glm-5=1
glm-4.7=3
```

### ક્વોટા-શેર વિનંતી સીરિયલાઇઝેશન

જ્યારે ક્વોટા-શેર ડિસ્પૅચ ધન `max_concurrent` જાહેર કરતા કનેક્શનને લક્ષ્ય બનાવે છે,
ત્યારે તે **એકાઉન્ટ** માટેની સમકાલીન વિનંતીઓ પ્રતિ-કનેક્શન સેમાફોર
(કી `qsconn:<connectionId>`) મારફતે ક્રમબદ્ધ થાય છે: વધારાની વિનંતીઓ એકાઉન્ટને
ભરવાને બદલે **કતારમાં રાહ જુએ છે**. તે **ફેલ-ઓપન** છે — સંતૃપ્ત
કતાર અથવા ટાઇમઆઉટ ક્યારેય ડિસ્પૅચ કરી શકાય તેવી વિનંતીને નકારવાને બદલે સ્લોટ વિના
આગળ વધે છે. તેને **સેટિંગ્સ → સ્થિતિસ્થાપકતા → ક્વોટા-શેર પ્રતિ-કનેક્શન
સમકાલીનતા** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ડિફૉલ્ટ રૂપે
ચાલુ) માં ટૉગલ કરો. `max_concurrent` મર્યાદા વિના વર્તન યથાવત્ રહે છે.

> ક્વોટા-શેર રાઉટિંગ ગેટ (`selectQuotaShareTarget`, DRR + P2C) પોતે
> ફેલ-ઓપન છે અને મહત્તમ મર્યાદાએ પહોંચેલા કનેક્શનને માત્ર _ઓછી પ્રાથમિકતા_ આપે છે —
> એક-કનેક્શન પૂલ સાથે તે કડક મર્યાદા લાગુ કરી શકતું નથી, તેથી વાસ્તવમાં વિનંતીઓનો
> ધસારો આ સેમાફોર જ રોકે છે.

### કોમ્બો કૂલડાઉન-અવેર પુનઃપ્રયાસ

દરેક કોમ્બો વ્યૂહરચના માટે (સક્ષમ હોય ત્યારે), SHORT અસ્થાયી કૂલડાઉન માટે 429ને
અંતિમ સ્વરૂપ આપનારી વિનંતી 429 પરત કરવાને બદલે કૂલડાઉન સમાપ્ત થવાની રાહ જુએ છે
અને ફરીથી ડિસ્પૅચ થાય છે — આ મલ્ટિ-મોડલ કોમ્બો પર Gemini-વર્ગની TPM/RPM વિન્ડો
(~60s retry-after) આવરી લે છે, દા.ત. 2-મોડલ કોમ્બોના બંને લક્ષ્યો પ્રતિ-મોડલ
દર મર્યાદા સુધી પહોંચે ત્યારે. **સેટિંગ્સ → સ્થિતિસ્થાપકતા**માં `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) દ્વારા મર્યાદિત. તે
`quota_exhausted` (મધરાત સુધી લૉક થયેલ) અથવા auth/not-found કારણો માટે ક્યારેય રાહ જોતું નથી.

એ જ ગેટ પ્રી-ડિસ્પૅચ કેસ (#16319) પણ આવરી લે છે: જ્યારે કોઈ પ્રયાસ થાય તે પહેલાં
કોમ્બોના દરેક લક્ષ્યને છોડી દેવામાં આવે, કારણ કે તેનું મોડલ ટૂંકા અસ્થાયી લૉકઆઉટમાં
હોય, ત્યારે શૂન્ય-પ્રયાસ પાથ સંકેત-વિહીન `503 ALL_TARGETS_SKIPPED` જવાબ આપવાને
બદલે સમાન મહત્તમ મર્યાદાઓ હેઠળ લૉક સમાપ્ત થવાની રાહ જુએ છે અને ફરીથી ડિસ્પૅચ કરે છે.
જ્યારે રાહ જોવાની મંજૂરી ન હોય (મર્યાદા, પ્રયાસ અથવા બજેટ સમાપ્ત થયું હોય, અથવા સુવિધા
બંધ હોય), ત્યારે અંતિમ પ્રતિસાદ સૌથી વહેલા અસ્થાયી લૉકની સમાપ્તિમાંથી
`retry_after` / `reset_at` ધરાવતા `429 rate_limit_error`માં અપગ્રેડ થાય છે;
quota, auth અને not-found લૉક સંકેત-વિહીન 503 જાળવી રાખે છે.

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

## 5. રિક્વેસ્ટ ક્યૂ એડમિશન કંટ્રોલ (v3.8.49 · ઈશ્યૂ #6593)

**વ્યાપ**: સ્થાનિક પ્રતિ-provider+connection રેટ-લિમિટ ક્યૂ (`open-sse/services/rateLimitManager.ts`,
જે Bottleneck દ્વારા સમર્થિત છે), ઉપરની ત્રણ કાર્યપદ્ધતિઓથી એક સ્તર નીચે.

**`maxWaitMs` ક્યૂમાં રાહ જોવાની મર્યાદા નક્કી કરે છે; `executionMaxWaitMs` એક્ઝિક્યુશનની મર્યાદા નક્કી કરે છે.**
બંને ઇરાદાપૂર્વક અલગ છે અને એકની કિંમત બીજામાં વપરાતી નથી.

`resilienceSettings.requestQueue.maxWaitMs` એ **ક્યૂ-પ્રતીક્ષા બજેટ** છે: તેમાં
પ્રોવાઇડર સ્લોટ માટે રાહ જોવી અને પછી QUEUED સ્થિતિમાં રહેવું આવરી લેવાય છે, અને જોબ
QUEUED સ્થિતિ છોડીને એક્ઝિક્યુટ થવાનું શરૂ કરે તે જ ક્ષણે તેનું ટાઇમર સાફ થઈ જાય છે
(`rateLimitManager.ts`, `wrappedFn`). આ મર્યાદા વટાવતી રિક્વેસ્ટ ક્યારેય
અપસ્ટ્રીમ સુધી પહોંચતી નથી. ડિફૉલ્ટ 30000ms છે, જે
`src/lib/resilience/settings.ts`માં `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
દ્વારા આપવામાં આવે છે અને
`tests/unit/ratelimit-admission-control-6593.test.ts` દ્વારા નિશ્ચિત કરવામાં આવ્યું છે, તેથી
તેમાં ફેરફાર કરવાથી આ ફકરો અજાણતાં જૂનો રહી જવાને બદલે તે ટેસ્ટ નિષ્ફળ જશે.

`resilienceSettings.requestQueue.executionMaxWaitMs` એ કિંમત છે જે Bottleneckને
જોબ `expiration` તરીકે મળે છે, અને તેનું ટાઇમર ડિસ્પેચ થયા પછી જ શરૂ થાય છે. પોતાના
અપસ્ટ્રીમ ટાઇમઆઉટ વગરના એક્ઝિક્યુટર્સ માટે તે અંતિમ સુરક્ષા છે, અને જ્યારે એક્ઝિક્યુટરનો
પોતાનો fetch-start ટાઇમઆઉટ વધુ લાંબો હોય ત્યારે તેને તે મુજબ વધારવામાં આવે છે, જેથી
તે કોઈ સ્વસ્થ in-flight રિસ્પોન્સને અધવચ્ચે બંધ ન કરી શકે. ડિફૉલ્ટ 600000ms (10 મિનિટ).

ક્યૂ બજેટને `expiration`માં આપવાથી અગાઉ non-incremental
ગેટવે mid-flight બંધ થઈ જતા હતા — પ્રથમ બાઇટ્સ આવે તે પહેલાં તેમનું મિનિટો સુધી ચાલવું
યોગ્ય છે — અને આ કારણે expirationને `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) તરીકે રજૂ કરવામાં આવે છે, જ્યારે ક્યૂ બજેટ
ક્યૂ-ટાઇમઆઉટ કોડ ધરાવે છે. બંનેમાંથી કોઈને પણ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) અથવા ડૅશબોર્ડ
(**Settings → Resilience**) દ્વારા ઓવરરાઇડ કરો. નોર્મલાઇઝ કરતી વખતે બંનેને 1ms–24hની
મર્યાદામાં રાખવામાં આવે છે.

**બંને માટે અગ્રતા:** env var માત્ર _ડિફૉલ્ટ_ પૂરું પાડે છે.
`resilienceSettings.requestQueue`માં સ્થાયી કરેલી કિંમત (ડૅશબોર્ડ / API patch,
`key_value`માં સંગ્રહિત) તેના કરતાં અગ્રતા મેળવે છે, અને પ્રતિ-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` તેની ઉપર અગ્રતા મેળવે છે.
એટલે કે જે ડિપ્લોયમેન્ટમાં પહેલેથી સ્થાયી કિંમત હોય ત્યાં env var સેટ કરવાથી
કંઈ બદલાતું નથી — તેના બદલે સ્થાયી સેટિંગને સાફ અથવા અપડેટ કરો.

ક્યૂમાં રહેવાનો સમય `maxWaitMs` દ્વારા મર્યાદિત છે; નીચે આપેલ `maxQueueDepth`
એક જ સમયે કેટલા કૉલર્સ ક્યૂમાં રહી શકે તે મર્યાદિત કરે છે.

**બૉડીમાં દર્શાવેલા retries: pacing વિરુદ્ધ lockout.** 429 બૉડી તેની પોતાની પ્રતીક્ષા
દર્શાવી શકે છે (Gemini `RetryInfo.retryDelay`, "retry after Ns" ટેક્સ્ટ), જેને
`updateFromResponseBody` વાંચે છે. connectionના `maxWaitMs`માં સમાઈ જાય તેવી પ્રતીક્ષા
pacing છે: limiter તેટલા સમય માટે પોતાનું reservoir ખાલી કરે છે અને તે ફરી ભરાય ત્યારે
ક્યૂમાં રહેલા કૉલ્સ ડિસ્પેચ થાય છે. `maxWaitMs` કરતાં લાંબી પ્રતીક્ષા એવી નથી કે
ક્યૂ તેની સમાપ્તિ સુધી રાહ જોઈ શકે — Gemini સમાપ્ત થયેલા દૈનિક ક્વોટા માટે
`retryDelay: "86399s"` સાથે જવાબ આપે છે. ફરી બનાવેલા 429 (#16528) પર રિલે કરાયેલ
`Retry-After` પહેલેથી જ fallback engineને તે સમયગાળા માટે મૉડલ લૉક કરાવે છે, પરંતુ
limiterને પણ એટલા સમય માટે થોભાવવાથી કી સુધી વહેલો પહોંચતો કોઈપણ કૉલ
(ઉદાહરણ તરીકે, resilience reset પછી) સમગ્ર `maxWaitMs` સુધી અટકી જશે. જ્યારે આવી
પ્રતીક્ષા typed Google `RetryInfo` detail (`google_rpc_retry_info` provenance)માંથી
આવે અને કીનો limiter પહેલેથી જ મૉડલ પૂરતો મર્યાદિત હોય (`getLimiterKey` જુઓ),
ત્યારે 429 તેના બદલે તે connection પર model lockout બને છે
(`open-sse/services/rateLimitManager/bodyRetryPause.ts`માં
`lockModelForLongBodyRetry`, 24h સુધી મર્યાદિત), અને limiterને થોભાવવામાં આવતો નથી.
એકાઉન્ટ પસંદગી `isModelLocked()` દ્વારા તે લૉકને છોડે છે, અને connection સાથે પિન કરેલા
ટાર્ગેટ્સ માટે combo pre-dispatch gate પણ એવું જ કરે છે. antigravityમાં, જ્યાં limiter
પ્રતિ quota family હોય છે, ત્યાં લૉક તેના અન્ય quota locksની જેમ ચોક્કસ મૉડલ પર હોય છે.
જ્યારે કોઈ alias દ્વારા ક્લાયન્ટે માગેલું નામ તે મૉડલમાં resolve થયું હોય ત્યારે તે
માગેલું નામ પણ લૉક થાય છે, કારણ કે આ ચકાસણીઓ માગેલા નામનો ઉપયોગ કરે છે; તેને ચોક્કસ રીતે
લૉક કરવામાં આવે છે (`lockExactModel`), તેથી antigravity quota family અથવા codex scopeને
પાર કરતો alias પોતાને ક્યારેય લૉક કરતો નથી. prose hint, untyped `retryDelay`, અથવા સમગ્ર
connection દ્વારા શેર કરાયેલ limiter pause જાળવી રાખે છે. જ્યારે 429 પાથ દ્વારા હમણાં જ
ફરી બનાવેલો limiter pause થાય છે, ત્યારે જે કૉલરનો બાકી ક્યૂ સમય pause પૂરો થાય તે પહેલાં
સમાપ્ત થવાનો હોય તેને એટલો સમય રાહ જોવડાવવાને બદલે queue-timeout code સાથે તરત જ નકારી
કાઢવામાં આવે છે (`checkLimiterPause`); નોંધાયેલ અંત limiter બનાવાય તે પહેલાંના સમય પર
આધારિત હોય છે, જ્યાં Bottleneck તેની refresh clock શરૂ કરે છે, અને reservoirમાં પછીથી
થતો કોઈપણ ફેરફાર તેને ભૂલી જાય છે. આ વર્તન
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` અને
`tests/unit/rate-limit-body-retry-pause.test.ts` દ્વારા આવરી લેવાયું છે.

**`maxQueueDepth` — વૈકલ્પિક admission cap (નવું).** `resilienceSettings.requestQueue.maxQueueDepth`
એક provider+connection માટે એક જ સમયે ક્યૂમાં (હજુ ડિસ્પેચ ન થયેલી) કેટલી રિક્વેસ્ટ્સ
રહી શકે તેની મર્યાદા નક્કી કરે છે. જ્યારે ક્યૂમાં પહેલેથી `maxQueueDepth` રિક્વેસ્ટ્સ હોય,
ત્યારે નવી રિક્વેસ્ટ `limiter.schedule()` સુધી પહોંચે તે **પહેલાં** typed
`code: "RATE_LIMIT_QUEUE_FULL"` એરર સાથે તરત નકારી કાઢવામાં આવે છે
— તેથી આ નકાર ઓછા ખર્ચે થાય છે અને તે રિક્વેસ્ટ માટેના કોઈપણ downstream
prompt-compression / translation કાર્ય પહેલાં થાય છે. ડિફૉલ્ટ `0` =
નિષ્ક્રિય, જે હાલની અમર્યાદિત-ક્યૂ વર્તણૂક જાળવે છે; મર્યાદા 0–100000.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) અથવા
`resilienceSettings.requestQueue.maxQueueDepth` (ડૅશબોર્ડ/API patch) દ્વારા ઓવરરાઇડ કરો.

admission check પોતે એક pure function છે
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), જેથી
વાસ્તવિક Bottleneck limiter વિના તેનો unit test કરી શકાય છે.

> #6593 ખોલનાર RFC એ `bypassCompressionOnRateLimit`
> ફ્લૅગનો પણ પ્રસ્તાવ મૂક્યો હતો. આ રેપોની `open-sse/services/compression/` પાઇપલાઇન
> આઉટબાઉન્ડ LLM વિનંતી પર પ્રોમ્પ્ટ/કૉન્ટેક્સ્ટ કમ્પ્રેશન કરે છે (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` બ્લૉકની આસપાસ),
> સિન્થેસાઇઝ કરેલી 429 બૉડી પર HTTP રિસ્પોન્સ કમ્પ્રેશન નહીં — શાબ્દિક બાયપાસ ફ્લૅગ માટે
> કોઈ મેળ ખાતો કોડ પાથ નથી. તે પ્રોમ્પ્ટ-કમ્પ્રેશન પગલું પણ હાલમાં વિનંતી પાઇપલાઇનમાં
> `withRateLimit()`ની _પહેલાં_ ચાલે છે, તેથી ક્યૂ-ફુલ અસ્વીકૃતિ વખતે તેને છોડવા માટે
> ક્રમમાં ફેરફાર કરવો એ આ ઇશ્યૂના વ્યાપ કરતાં અલગ અને મોટો ફેરફાર છે; અહીં તેનો
> ઇરાદાપૂર્વક અમલ **કરવામાં આવ્યો નથી** અને જો CPU બચતનો લાભ પુનઃક્રમનિર્ધારણના
> જોખમને યોગ્ય ઠેરવે તો તેને અનુવર્તી કાર્ય તરીકે છોડવામાં આવ્યો છે.

### રેટ-લિમિટ ઑટો-એનેબલ સુરક્ષા વ્યવસ્થા અને કનેક્શન સુરક્ષા (`rateLimitProtection`)

**ઑટો-એનેબલ સુરક્ષા વ્યવસ્થા** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ડિફૉલ્ટ `true`):
ડિફૉલ્ટ રૂપે, OmniRoute તમામ સક્રિય API-key પ્રોવાઇડર કનેક્શનો (`getProviderCategory(provider) === "apikey"`) માટે રેટ-લિમિટ ક્યૂ સુરક્ષા આપમેળે સક્ષમ કરે છે. આ સુનિશ્ચિત કરે છે કે રેટ પ્રત્યે સંવેદનશીલ અપસ્ટ્રીમ API કીઝ તરફ આવતી વિનંતીઓને અપસ્ટ્રીમ 429 ભૂલોના ધસારામાં મોકલવાને બદલે Bottleneck મારફતે ક્યૂમાં મૂકવામાં અને થ્રોટલ કરવામાં આવે. સુરક્ષા વ્યવસ્થાને `RATE_LIMIT_AUTO_ENABLE` એન્વાયરમેન્ટ વેરિએબલ મારફતે ઓવરરાઇડ કરી શકાય છે (`false`/`0`/`off` અક્ષમ કરે છે, `true`/`1`/`on` બળજબરીથી સક્ષમ કરે છે), જેને કાયમી સંગ્રહિત ડૅશબોર્ડ સેટિંગ (**Settings → Resilience** / `PATCH /api/resilience`) કરતાં પ્રાથમિકતા મળે છે.

**દરેક કનેક્શન માટેના `rateLimitProtection`નું અર્થતંત્ર:**
દરેક કનેક્શન માટેની રેટ-લિમિટ સુરક્ષા પ્રોવાઇડર કનેક્શનો પરના `rateLimitProtection` બૂલિયન ફીલ્ડ દ્વારા ટ્રૅક કરવામાં આવે છે (SQLiteમાં `rate_limit_protection` તરીકે કાયમી સંગ્રહિત):

- **સ્પષ્ટ રીતે ચાલુ (`rateLimitProtection === true`)**: પ્રોવાઇડરની કેટેગરી અથવા ઑટો-એનેબલ સુરક્ષા વ્યવસ્થા ચાલુ છે કે નહીં તેની પરવા કર્યા વિના, આ કનેક્શન માટે રેટ-લિમિટ સુરક્ષા સ્પષ્ટ રીતે સક્ષમ છે.
- **સ્પષ્ટ રીતે બંધ (`rateLimitProtection === false`)**: સ્પષ્ટ સુરક્ષાને અક્ષમ કરે છે, પરંતુ સક્રિય API-key કનેક્શનને વૈશ્વિક ઑટો-એનેબલ સુરક્ષા વ્યવસ્થામાંથી **બહાર કાઢતું નથી**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`)માં, `false` અને `undefined` સમાન છે: માત્ર `rateLimitProtection === true`ને સ્પષ્ટ ઓવરરાઇડ તરીકે ગણવામાં આવે છે. જો `rateLimitProtection` `false` હોય (અથવા સેટ ન હોય), તો સક્રિય API-key કનેક્શન હજુ પણ ઑટો-એનેબલ શરત સાથે મેળ ખાય છે અને રેટ-લિમિટથી સુરક્ષિત રહે છે.
- **દરેક કનેક્શન માટે અલગ ઑપ્ટ-આઉટ નથી**: અન્ય કનેક્શનો માટે ઑટો-એનેબલ સક્રિય રાખીને ઑપરેટર હાલમાં એવું દર્શાવી શકતો નથી કે "આ એકમાત્ર સક્રિય API-key કનેક્શન રેટ-લિમિટ ક્યૂ સુરક્ષા વિના ચાલવું જ જોઈએ". API-key કનેક્શનોને રેટ-લિમિટ ક્યૂ વિના સંપૂર્ણપણે ચલાવવા માટે, સુરક્ષા વ્યવસ્થા વૈશ્વિક સ્તરે બંધ કરવી આવશ્યક છે (`RATE_LIMIT_AUTO_ENABLE=false` અથવા `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**સમર્થિત રાઇટ પાથ્સ:**

- **`POST /api/rate-limits`**: કનેક્શન માટે `rateLimitProtection` ટૉગલ કરવા માટેનો સમર્થિત મેનેજમેન્ટ રાઇટ પાથ (`{ connectionId: string, enabled: boolean }`). આને `enabled: true` સાથે કૉલ કરવાથી સ્પષ્ટ સુરક્ષા ચાલુ થાય છે; `enabled: false` સાથે કૉલ કરવાથી સ્પષ્ટ સુરક્ષા દૂર થાય છે (જોકે ઑટો-એનેબલ ચાલુ હોય તો સક્રિય API-key કનેક્શનો વૈશ્વિક સુરક્ષા વ્યવસ્થા હેઠળ આવરી લેવાયેલા રહે છે).
- **`PUT /api/providers/[id]`**: ઇરાદાપૂર્વક `rateLimitProtection` સ્વીકારતું કે ફ્લિપ કરતું **નથી** (#11278). `PUT /api/providers/[id]` મારફતે પ્રોવાઇડર કનેક્શન મેટાડેટા અપડેટ કરવાથી કાયમી સંગ્રહિત રેટ-લિમિટ સુરક્ષાની સ્થિતિ ક્યારેય બદલાશે નહીં.

---

## 6. ધીમા-સ્ટ્રીમ થ્રુપુટ વૉચડૉગ (#9709)

વૈકલ્પિક `resilienceSettings.streamRecovery.throughputWatchdog` ગાર્ડ એવા અપસ્ટ્રીમને શોધે છે જે હજી પણ ચંક્સ મોકલી રહ્યું હોય પરંતુ કૉન્ફિગર કરેલા ઉપયોગી-આઉટપુટ દર કરતાં ઓછું આસિસ્ટન્ટ આઉટપુટ ઉત્પન્ન કરતું હોય. તેને ઇરાદાપૂર્વક નિષ્ક્રિયતા સમયસમાપ્તિથી અલગ રાખવામાં આવ્યું છે: હાર્ટબીટ્સ અને મેટાડેટા કોઈપણ ટાઇમરને રીસેટ કરતા નથી અને પ્રગતિ તરીકે ગણાતા નથી. તે હાર્ડ પ્રયાસ સમયમર્યાદા (#9153)થી પણ અલગ છે, જે આઉટપુટની ગુણવત્તાને ધ્યાનમાં લીધા વિના સંપૂર્ણ સલામતી મર્યાદા તરીકે યથાવત્ રહે છે.

વૉચડૉગ એબોર્ટ કરી શકે તે પહેલાં તેને વૉર્મ-અપ અવધિ અને ત્યારબાદ એક સંપૂર્ણ રોલિંગ વિન્ડોની જરૂર પડે છે. તે Chat Completions અને Responses API આઉટપુટ ઇવેન્ટ્સમાંથી ટેક્સ્ટ ડેલ્ટાની ગણતરી કરે છે (UTF-8 બાઇટ્સ માટેના સાવચેતીભર્યા પ્રૉક્સી તરીકે), માત્ર વપરાશ ધરાવતી અને ખાલી ઇવેન્ટ્સને અવગણે છે, અને ટૂલ-કૉલ અથવા રીઝનિંગ ઇવેન્ટ્સ પ્રક્રિયામાં હોય ત્યારે મૂલ્યાંકન સ્થગિત રાખે છે. તે ડિફૉલ્ટ રૂપે અક્ષમ હોય છે અને `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` વડે સક્ષમ કરી શકાય છે; વિન્ડો, વૉર્મ-અપ, ન્યૂનતમ દર અને માપી શકાય તેવા ન્યૂનતમ આઉટપુટને સામાન્ય રેઝિલિયન્સ-સેટિંગ્સ નોર્મલાઇઝેશન લેયર દ્વારા મર્યાદિત કરવામાં આવે છે.

સક્ષમ હોય ત્યારે, વૉચડૉગ એબોર્ટ માત્ર સક્રિય અપસ્ટ્રીમ પ્રયાસ પર જ લાગુ કરવામાં આવે છે. ક્લાયન્ટને દેખાય એવા કોઈપણ બાઇટ્સ મોકલાતા પહેલાં, હાલનો સમાન-એકાઉન્ટ અર્લી-રિકવરી પાથ પ્રયાસને ફરી ખોલી શકે છે. કમિટ થયા પછી, સ્ટ્રીમને ક્યારેય આંધળાપણે ફરી ચલાવવામાં આવતું નથી; ફક્ત હાલનો સુરક્ષિત મિડ-સ્ટ્રીમ કન્ટિન્યુએશન કરાર જ સફિક્સને જોડી શકે છે. ફાઇનલાઇઝેશન એક જ વખત થાય છે, તેથી વપરાશનું એકાઉન્ટિંગ અને સેમાફોર રિલીઝ ડુપ્લિકેટ થતા નથી.

---

## 7. અપસ્ટ્રીમ સ્ટેટસનું પુનઃનિવેદન (ખોટી રીતે દર્શાવેલી ક્વોટા ભૂલો)

**વ્યાપ:** એક અપસ્ટ્રીમ ગેટવે જે અસ્થાયી ક્વોટા સમાપ્તિને ખોટા HTTP સ્ટેટસ સાથે રિપોર્ટ કરે છે.

**હેતુ:** વર્ગીકરણ પહેલાં ગેરમાર્ગે દોરતા સ્ટેટસને સુધારવું, જેથી ડાઉનસ્ટ્રીમ ઉપભોક્તાઓ (ફૉલબૅક એન્જિન, કૉમ્બો એગ્રીગેશન, ક્લાયન્ટને આપવામાં આવતો પ્રતિસાદ) નિષ્ફળતાનું સાચું, ફરી પ્રયાસ કરી શકાય તેવું સ્વરૂપ જોઈ શકે.

કેટલાક ગેટવે TEMPORARY ક્વોટા સમાપ્તિને ફરી પ્રયાસ ન કરી શકાય તેવા HTTP સ્ટેટસ વડે દર્શાવે છે. `agentrouter.org` માનક `429`ને બદલે ચાઇનીઝ બૉડી (`用户额度不足` / `额度不足`) સાથે `403` (ક્યારેક `400`) પરત કરે છે. Claude Code જેવા ક્લાયન્ટ્સ `403`ને કાયમી માને છે અને સેશન એબોર્ટ કરે છે, તેમજ સુધારા વિના ફૉલબૅક એન્જિન તેને ક્વોટા ઇવેન્ટને બદલે `AUTH_ERROR` તરીકે વર્ગીકૃત કરશે.

**અમલીકરણ:**

- રજિસ્ટ્રી + મૅચર: `open-sse/config/upstreamStatusRestatement.ts` — પ્રત્યેક પ્રોવાઇડર માટેના નિયમોની યાદી (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), જે `applyStatusRestatement()` દ્વારા મૅચ કરવામાં આવે છે.
- કૉલ સાઇટ: `open-sse/handlers/chatCore.ts`માં આવેલ `providerFailure:` બ્લૉક (લાઇન 3654ની આસપાસ), `parseUpstreamError()` દ્વારા ભૂલભર્યા HTTP સ્ટેટસ (`!providerResponse.ok`) સાથેના અપસ્ટ્રીમ પ્રતિસાદને પાર્સ કર્યા પછી તરત અને કોઈપણ વર્ગીકરણ ચાલે તે પહેલાં, જેથી દરેક ડાઉનસ્ટ્રીમ ઉપભોક્તા સુધારેલ સ્ટેટસ જોઈ શકે. `200` SSE સ્ટ્રીમની અંદર એમ્બેડ થયેલી ભૂલો અલગ, પાછળથી આવતો સ્ટ્રીમ-પાર્સિંગ પાથ અનુસરે છે અને આજે આ હૂક દ્વારા **આવરી લેવામાં આવતી નથી** — આ એક જાણીતી મર્યાદા છે, જે agentrouterના ખોટા સ્ટેટસ માટે હજી જરૂરી નથી (કારણ કે તે ભૂલભર્યા HTTP સ્ટેટસ તરીકે દેખાય છે).
- ફરી પ્રયાસ માટેની પાત્રતા: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`માં છે (`open-sse/services/combo/unavailableRetryGate.ts`), તેથી પુનઃનિવેદિત ભૂલ નિષ્ક્રિય `403` તરીકે દેખાવાને બદલે વાસ્તવિક ફરી-પ્રયાસ વિન્ડો ધરાવે છે.
- સિન્થેટિક `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) માત્ર એટલું જ છે જેટલું પુનઃનિવેદિત પ્રતિસાદ **ક્લાયન્ટને** જણાવે છે; તે પોતે કનેક્શનની આંતરિક કૂલડાઉન/લૉકઆઉટ અવધિ નથી — તેનું સંચાલન પુનઃનિવેદિત ભૂલને ખરેખર હેન્ડલ કરતી પદ્ધતિ દ્વારા અલગથી થાય છે (Connection Cooldownનું વધતું બૅકઑફ, §2, API-કી પ્રોવાઇડર્સ માટે મૂળ `3s`; અથવા agentrouter જેવા પ્રતિ-મૉડલ-ક્વોટા પ્રોવાઇડર્સ માટે Model Lockout, §3). ક્લાયન્ટને જણાવવામાં આવેલી 60s વિન્ડો કરતાં આંતરિક રીતે રાઉટર ફરી પ્રયાસ કરવા માટે વહેલું પાત્ર બની શકે છે — આ ઇરાદાપૂર્વક રાખેલો અવકાશ છે, બગ નહીં.

કાયમી ભૂલો (agentrouterનું `无权访问模型` — આ મૉડલની ઍક્સેસ નથી) ક્યારેય પુનઃનિવેદિત થતી નથી: `textMarkers` મૅચ થાય ત્યારે પણ `excludeMarkers` નિયમને વીટો કરે છે, તેથી ભૂલ પોતાનો મૂળ સ્ટેટસ જાળવી રાખે છે અને કોઈ વસ્તુ તેના માટે અનંતકાળ સુધી ફરી પ્રયાસ કરતી નથી. મૅચ થતો પ્રોવાઇડર વર્ગીકરણ નિયમ (`open-sse/config/providerErrorRules.ts`માં `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, જાહેર કરાયેલ `6h` મૂળ કૂલડાઉન) `checkFallbackError` (`open-sse/services/accountFallback.ts`) દ્વારા સામાન્ય apikey-કૅટેગરી `FORBIDDEN` અર્લી-રિટર્ન _પહેલાં_ જોવામાં આવે છે, જે `honorsRuleLockScope(provider)` પર ગેટેડ છે (#10334 — હાલમાં `providerErrorRules.ts`માં `HONORS_RULE_LOCK_SCOPE_PROVIDERS` અલાઉલિસ્ટ મારફતે ફક્ત agentrouter માટે). નિયમનો જાહેર કરાયેલ 6h કૂલડાઉન `fallbackResult.baseCooldownMs` તરીકે આગળ વહે છે, પરંતુ તે હજી પણ અગાઉથી અસ્તિત્વમાં રહેલા પ્રતિ-મૉડલ-ક્વોટા લૉકઆઉટ પાથ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, કૂલડાઉન સ્રોત સિવાય #10334 દ્વારા અપરિવર્તિત)માં જ જાય છે: દરેક અન્ય મૉડલ લૉકઆઉટની જેમ તેને ઑપરેટરના `mlSettings.maxCooldownMs` (ડિફૉલ્ટ `1_800_000ms` / 30min) સુધી નીચે મર્યાદિત કરવામાં આવે છે, અને _સંગ્રહિત લૉકઆઉટ કારણ_ નિયમના `"auth_error"`ને બદલે અગાઉથી અસ્તિત્વમાં રહેલું હાર્ડકોડ કરેલું `"forbidden"` જ રહે છે — એન્ડ-ટુ-એન્ડ માત્ર કૂલડાઉન અવધિ જ માન્ય રાખવામાં આવે છે, કારણ સ્ટ્રિંગ નહીં. કનેક્શન પોતે સક્રિય રહે છે; સમાન કનેક્શન પરનાં સિબ્લિંગ મૉડલ્સ પર કોઈ અસર થતી નથી.

પુનઃવ્યક્ત કરેલી ક્વોટા ભૂલો (`额度不足`) પ્રોડક્શનમાં પ્રદાતા નિયમ સુધી પહોંચે છે
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, તેનો પોતાનો કોઈ જાહેર કરાયેલ cooldown નથી — persistence layerનું
scaled backoff default લાગુ પડે છે). #10334થી, `ProviderErrorRuleMatch` પરનો
`scope` શરૂઆતથી અંત સુધી વપરાય છે, પરંતુ **ફક્ત** `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlistમાં રહેલા પ્રદાતાઓ માટે (`providerErrorRules.ts` —
હાલમાં માત્ર `"agentrouter"`, `honorsRuleLockScope()` દ્વારા gated). અન્ય દરેક
પ્રદાતા માટે `scope` માત્ર માહિતીપ્રદ જ રહે છે, બિલકુલ #10334 પહેલાંની જેમ.
`checkFallbackError` મેળ ખાતા નિયમના scopeને
`fallbackResult.ruleScope` તરીકે પ્રદર્શિત કરે છે; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) એ shared guard છે જે ખાતરી કરે છે કે
`ruleScope`ને connection-wide, self-recovering signal તરીકે માન આપવું ખરેખર સુરક્ષિત છે
(scope `"connection"`, reason `quota_exhausted`, ક્યારેય `permanent` નહીં,
ક્યારેય `creditsExhausted` નહીં — ભવિષ્યના કોઈ નિયમ દ્વારા scope
`"connection"`ને permanent account state સાથે જોડવા સામેનું રક્ષણ). બે consumers તેને કૉલ કરે છે:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-providerની **per-model** lockout
  branchમાં જવાને બદલે (agentrouterમાં `passthroughModels: true` છે → `hasPerModelQuota()`
  `true` પરત કરે છે), તે **temporary connection cooldown** લાગુ કરે છે —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ક્યારેય terminal status નહીં
  (`credits_exhausted`/`banned`/`expired`) — જેથી cooldown સમાપ્ત થયા પછી connection
  પોતે recover થાય છે અને manual credential resetની જરૂર પડતી નથી.
  `disableCooling: true` ધરાવતા connections માટે આ છોડવામાં આવે છે (#2997): તે opt-out
  તેના બદલે per-model lockout તરફ જાય છે (એક દસ્તાવેજિત trade-off —
  branchની ઉપરની code comment જુઓ).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): એ જ guard connectionને
  in-memory `exhaustedConnections` setમાં mark કરે છે, જેની key
  `${provider}:${connectionId}` છે. આ ફક્ત એવા બાકી રહેલા SAME-REQUEST
  targetને જ છોડે છે જે _પોતાના target object પર પહેલેથી જ એ જ ચોક્કસ `connectionId` ધરાવે છે_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` `exhaustedConnections` lookup પહેલાં) — plain
  model-list comboમાં, જ્યાં sibling targets પાસે પોતાનો pinned `connectionId` હોતો નથી
  અને responseના `X-OmniRoute-Selected-Connection-Id` headerમાંથી દરેક dispatch વખતે જ એક
  resolve થાય છે, ત્યાં એ key ક્યારેય match થતી નથી. એ સામાન્ય
  કિસ્સામાં, બાકી રહેલો leg હમણાં જ exhausted થયેલા accountનો ફરી ઉપયોગ ન કરે તે માટેનું
  વાસ્તવિક રક્ષણ આ Set નથી — તે ઉપરોક્ત persistence layer
  (connectionનું `rateLimitedUntil` હવે ભવિષ્યમાં છે) અને
  failure માટે `transientRateLimitedProviders`ને suppress કરતા આ જ guardનું સંયોજન છે
  ("Two-stage design" અને
  `targetExhaustion.ts`માં `isAgentrouterConnectionQuotaScope` branch પરની code comment જુઓ): જ્યારે
  તે Set unmarked રહે છે, ત્યારે `combo.ts`નું `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) પ્રદાતાના બાકી રહેલા legs માટે
  સક્રિય થતું નથી, તેથી credential selectionનું `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) સામાન્ય રીતે માનવામાં આવે છે અને
  બાકી રહેલો leg કાં તો અલગ, હજી પણ eligible agentrouter
  connection પસંદ કરે છે અથવા credentials ઉપલબ્ધ ન હોવાથી નિષ્ફળ જાય છે — તે આ branchએ હમણાં જ
  cooldown કરેલા connection પર બળજબરીથી પાછો જતો નથી.

### Two-stage design: statusનું પુનઃવક્તવ્ય, પછી classification

Status restatement (`upstreamStatusRestatement.ts`) અને provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) અલગ registries છે, જે બંને provider id
અને text markers પર key કરે છે, પરંતુ તેઓ અલગ જગ્યાએ ચાલે છે અને અલગ
હેતુઓ પૂરા કરે છે: restatement `chatCore.ts`માં HTTP statusને વહેલો rewrite કરે છે;
classification rules `checkFallbackError()`ની અંદર fallback `reason` અને lock `scope`
(`model` / `provider` / `connection`) પસંદ કરે છે
(`open-sse/services/accountFallback.ts`).

Classification rules ફક્ત `providerErrorRules.ts`ની `FULL_TEXT_RULE_PROVIDERS`
allowlistમાં સૂચિબદ્ધ પ્રદાતાઓ માટે જ સંપૂર્ણ error **text** જુએ છે (જે
`额度不足` જેવા body markers match કરવા જરૂરી છે) — હાલમાં માત્ર `"agentrouter"`.
અન્ય દરેક **built-in catalog** provider માટે, `checkFallbackError`
`getProviderErrorRuleMatch`ને ફક્ત structured error (`{code, type}`) આપે છે, જે
header/status/code આધારિત rules માટે પૂરતું છે, પરંતુ body-text markers જોઈ શકતું નથી.
`resolveRuleMatchBody()` helper આ પસંદગી કરે છે: allowlisted providers માટે સંપૂર્ણ error text,
અન્યથા structured error. કોઈ **built-in** providerને
`FULL_TEXT_RULE_PROVIDERS`માં ઉમેરવું એ સ્પષ્ટ per-provider opt-in છે — તેનો હેતુ
listમાં ન હોય તેવા દરેક provider માટેનો default path byte-for-byte અપરિવર્તિત
રાખવાનો છે.

કોઈ ruleનો `scope` (`model` / `provider` / `connection`) એ
`FULL_TEXT_RULE_PROVIDERS`થી અલગ opt-in છે: `checkFallbackError` તેને માત્ર
`fallbackResult.ruleScope` તરીકે પ્રદર્શિત કરે છે, અને downstream consumers તેને
માહિતીપ્રદ label સિવાય અન્ય કોઈ રીતે ફક્ત એ જ providers માટે માન આપે છે જે
આ જ fileની `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistમાં હોય (`gated via
honorsRuleLockScope()` — હાલમાં માત્ર `"agentrouter"`). જ્યારે કોઈ provider
તે allowlistમાં હોય ત્યારે `scope: "connection"` match વાસ્તવમાં શું કરે છે તે માટે ઉપરનું
"Restated quota errors" જુઓ.

**#11104 — ઑપરેટર દ્વારા જાહેર કરાયેલા નિયમો બંને allowlist ને બાયપાસ કરે છે.** ઑપરેટર
આ ફાઇલમાં ફેરફાર કર્યા વિના `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
દ્વારા રનટાઇમ પર પ્રતિ-provider નિયમ જાહેર કરી શકે છે. ઑપરેટર નિયમને
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` પાછળ ગેટ કરવાથી — આ allowlist
બિલ્ટ-ઇન કૅટલૉગ નિયમોની **ડિફૉલ્ટ** વર્તણૂકને સુરક્ષિત રાખવા માટે છે —
ત્યાં પહેલેથી સૂચિબદ્ધ providers સિવાય દરેક provider માટે settings મિકેનિઝમ
નિષ્ક્રિય થઈ જશે, કારણ કે નિયમ જાહેર કરવો એ પોતે જ ઑપરેટરની સ્પષ્ટ
opt-in છે. `resolveRuleMatchBody()` અને `honorsRuleLockScope()` બંને પહેલાં
`hasOperatorRuleForProvider()` તપાસે છે: ઑપરેટર નિયમ ધરાવતા provider ને
કાચું error text મળે છે અને તેના જાહેર કરેલા `scope` નું પાલન થાય છે, પછી ભલે
તે કોઈ એક allowlist માં પણ દેખાતું હોય કે ન હોય.

**જાણીતી ખામી — HTTP 400 માટે `providerRuleRegistry` ક્યારેય તપાસવામાં આવતું નથી.**
`checkFallbackError` ની `BAD_REQUEST` શાખા status 400 ને સંપૂર્ણપણે
પોતાની pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, વગેરે `accountFallback.ts` માં) દ્વારા વર્ગીકૃત કરે છે અને
તેની ઉપરની `configuredRule`/`getProviderErrorRuleMatch` શાખા સુધી પહોંચતા પહેલાં
return કરે છે. `status: 400` ધરાવતો બિલ્ટ-ઇન કૅટલૉગ નિયમ (અથવા ઑપરેટર નિયમ)
વાક્યરચનાની દૃષ્ટિએ માન્ય છે, પરંતુ ક્યારેય ટ્રિગર થશે નહીં. આજે કોઈ વર્તમાન નિયમ 400 ને લક્ષ્ય બનાવતો
નથી, તેથી production માં કંઈ અસર થતી નથી — પરંતુ ભાવિ 400 નિયમ માટે પહેલાં આ
શાખામાં ફેરફાર કરવો પડશે, જે નિયમ ઉમેરવા કરતાં મોટો ફેરફાર છે (તે
pattern-array વર્તણૂક પર પહેલેથી આધાર રાખતા દરેક provider માટે 400 નું ફરીથી વર્ગીકરણ
કરે છે) અને એક જ provider માટે નિયમ ઉમેરવાના કાર્યક્ષેત્રની બહાર છે.

### quota ને ખોટી રીતે રજૂ કરતું નવું gateway ઉમેરવું

1. `statusRestatementRegistry` માં એક rule array રજીસ્ટર કરો
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` ને
   provider-વિશિષ્ટ રાખો; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) સાથે ટકરાતા સામાન્ય અંગ્રેજી શબ્દસમૂહોનો ક્યારેય પુનઃઉપયોગ કરશો નહીં.
2. યોગ્ય lock scope પસંદ કરવા માટે વૈકલ્પિક રીતે
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) માં classification rules રજીસ્ટર કરો
   (સમગ્ર account માટેના quota માટે `connection`, પ્રતિ-model errors માટે `model`).
   આ પગલું production માં માત્ર એવા providers માટે અસરકારક બને છે જેમના નિયમોને સંપૂર્ણ
   error text (body markers) જરૂરી હોય: એ જ ફાઇલમાં provider id ને
   `FULL_TEXT_RULE_PROVIDERS` માં ઉમેરો — અન્યથા `checkFallbackError` નિયમને માત્ર
   structured `{code, type}` error જ આપે છે અને body-text rule live traffic સાથે
   ક્યારેય match નહીં થાય. માત્ર `status`/`headers` પર match થતા નિયમો (જેમ કે Opencode ના અથવા
   Minimax ના) માટે આ opt-in જરૂરી નથી. અલગથી, જો નિયમ
   `scope: "connection"` જાહેર કરે અને હેતુ માત્ર માહિતીપ્રદ label ને બદલે વાસ્તવિક
   connection-wide cooldown તથા same-request combo skip હોય, તો એ જ ફાઇલમાં
   provider id ને `HONORS_RULE_LOCK_SCOPE_PROVIDERS` માં ઉમેરો — આ
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) અને
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) માં
   `isAgentrouterConnectionQuotaScope()`-શૈલીના consumption ને ગેટ કરે છે; તેના વિના `scope`
   હજી પણ `fallbackResult.ruleScope` મારફતે આગળ વહે છે, પરંતુ તેના પર કોઈ ક્રિયા થતી નથી.
3. `tests/unit/upstream-status-restatement.test.ts`
   અને `tests/unit/agentrouter-error-rules.test.ts` ને અનુરૂપ unit tests ઉમેરો (`not-permanent` /
   `not-creditsExhausted` guards સહિત, અને — જો provider ને
   allowlist જરૂરી હોય — માત્ર તે provider માટે `resolveRuleMatchBody()` સંપૂર્ણ text
   return કરે છે તે ચકાસતો test પણ ઉમેરો).

`chatCore.ts`, `classifyError`, અથવા combo માં કોઈ ફેરફાર જરૂરી નથી.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` માંના providers (opencode family) ને
IP-bucketed upstream તરીકે ગણવામાં આવે છે (opencode free tier IP-bucketed છે,
account-bucketed નહીં — #9611 જુઓ): `quota_exhausted`
**અથવા** `rate_limit_exceeded` તરીકે વર્ગીકૃત status-429, rotation તેમને અજમાવી શકે તે પહેલાં,
એવા દરેક allowlisted-family connection ને cooldown કરે છે જેનો છેલ્લો જાણીતો egress IP
નિષ્ફળ ગયેલા connection ના IP સાથે match થાય છે
— જેથી N-1 નિશ્ચિતપણે નિષ્ફળ થનારા upstream calls ટાળી શકાય (#10460/#10525 જેવો જ આકાર).
`rate_limit_exceeded` ને ઇરાદાપૂર્વક સામેલ કરવામાં આવ્યું છે: `markAccountUnavailable`
path પર opencode-વિશિષ્ટ નિયમો ક્યારેય match થતા નથી (કોઈ headers/body
`checkFallbackError` ને આપવામાં આવતાં નથી, opencode `FULL_TEXT_RULE_PROVIDERS` માં નથી), તેથી એવો 429
જેના body માં subscription-quota text ("monthly usage limit
reached") હોય તે `status_429` rule સુધી પહોંચે તે પહેલાં quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) દ્વારા
`quota_exhausted` તરીકે વર્ગીકૃત થાય છે — જ્યારે quota-text વિનાનો 429 (સામાન્ય
rate limiting) `status_429` rule દ્વારા `rate_limit_exceeded` તરીકે વર્ગીકૃત થાય છે
અને હજી પણ IP family ને cooldown કરે છે. allowlisted provider માટે IP-bucketed
rate limit એ exhausted quota જેટલો જ સંકેત છે. વાસ્તવિક મર્યાદાઓ:

- **શ્રેષ્ઠ પ્રયાસ**: લૉક `proxy_logs`માંથી કનેક્શનનું છેલ્લે જાણીતું `egress_ip`
  મેળવે છે (24 કલાકની વિન્ડો, synchronous, કોઈ cache નહીં). Cold cache (egress
  IP ક્યારેય probe કરવામાં આવ્યો ન હોય) અથવા કોઈ row ન હોય → નિષ્ફળ કનેક્શનને
  branch દ્વારા હજી પણ cooldown કરવામાં આવે છે (આજની જેમ જ નોંધવામાં આવે છે), ફક્ત કોઈ sibling લૉક થતું નથી.
- **ક્યારેય terminal નહીં**: cooldown એ નવીકરણ થતી quota window છે
  (`testStatus: "unavailable"`); IP-સ્તરના signal પરથી ક્યારેય permanent state
  મેળવવામાં આવતી નથી. `disableCooling` કનેક્શન્સ branchને સંપૂર્ણપણે અવગણે છે.
- **Allowlisted family માટે લૉકની granularity બદલાય છે**: આ scope
  ફેરફાર છે, માત્ર sibling optimization નથી. opencode એક `passthroughModels`
  provider છે, તેથી આ branch પહેલાં 429ના કારણે પ્રતિ-MODEL lockout થતું હતું; હવે તે
  connection cooldown સર્જે છે — જેમાં કોઈ sibling વિનાનું એકમાત્ર
  connection ચલાવતો operator પણ સામેલ છે. opencode rule
  tableમાં પહેલેથી જ આ granularityને યોગ્ય જાહેર કરવામાં આવી છે (`scope: "connection"`,
  `providerErrorRules.ts`), પરંતુ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`માં ન હોવાથી અત્યાર સુધી તેનું પાલન થયું નહોતું. આ branch,
  connection-scoped agentrouter branchને અનુરૂપ રીતે, નિષ્ફળ
  connectionનું cooldown + `backoffLevel` જાતે લખે છે અને return થાય છે — નીચેનો per-model block અને
  generic path ક્યારેય પહોંચતા નથી.
- **Combo સામેલ છે**: agentrouter branchની જેમ, scope ઈરાદાપૂર્વક
  combo caller દ્વારા 429 પર લાગુ કરવામાં આવતા `persistUnavailableState`/`isCombo` downgradeને
  અવગણે છે. Per-model lockout આ scopeનું નબળું સ્વરૂપ નથી,
  તે ખોટું unit છે: તે exhausted IP વિશે કંઈ જણાવતું નથી, તેથી combo
  rotation દરેક sibling દીઠ એક નિષ્ફળ થવાની ખાતરીવાળો call કરવાનું ચાલુ રાખશે.
- **Sibling સુરક્ષા**: પહેલેથી terminal (banned/credits_exhausted)
  અથવા પહેલેથી વધુ લાંબા cooldownમાં રહેલા siblingને ક્યારેય overwrite કરવામાં આવતું નથી.
- **વિશિષ્ટ allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ને વિસ્તૃત કરવું એ
  સ્પષ્ટ owner નિર્ણય છે; કોઈ generic wiring નથી (pattern #10334/#10419). આ
  sibling query તેને SQL
  literal તરીકે ફરી લખવાને બદલે એ જ allowlistને bind કરે છે, જેથી તેને વિસ્તૃત કરવું એક-line ફેરફાર જ રહે છે.
- **Egress IP rotation, બંને દિશામાં**: lookup window (24h), egress-IP cache TTL (5 min) કરતાં ઘણી
  વિશાળ છે, તેથી "છેલ્લે જાણીતું IP" history છે,
  current state નહીં. જો કોઈ connectionનો proxy આ windowની અંદર rotate થયો હોય, તો
  લૉક ખરેખર shared IPને **ચૂકી** શકે છે (નોંધાયેલ IP નવું,
  unexhausted IP છે) — અને તે જ રીતે તે exhausted IPથી હવે
  દૂર rotate થઈ ગયેલા siblingને **cooldown કરી શકે છે**. બીજા કિસ્સામાં તે siblingને એક
  cooldown window જેટલો ખર્ચ થાય છે; બંનેને history-based
  lookupની સ્વીકાર્ય best-effort મર્યાદાઓ ગણવામાં આવે છે.
- **ખર્ચ**: `proxy_logs`ના બે bounded scans (`idx_pl_timestamp` મારફતે
  window-filtered), ફક્ત 429ની આવર્તન પર. કોઈ નવો index નહીં (migration 134
  YAGNI). મધ્યમ કદની real-traffic DB copy પર માપવામાં આવ્યું છે; વધુ
  throughput ધરાવતું instance એ જ windowમાં પ્રમાણસર વધુ rows રાખે છે.

---

## અન્ય સ્થિતિસ્થાપકતા સુવિધાઓ

- **20 રાઉટિંગ વ્યૂહરચનાઓ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — જુઓ [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **રીસેટ-અવેર રાઉટિંગ** (v3.8.0) — ક્વોટા રીસેટ સમયના આધારે કનેક્શનોને પ્રાથમિકતા આપે છે.
- **બેકગ્રાઉન્ડ મોડ ડિગ્રેડેશન** — Responses API `background: true` ને ચેતવણી સાથે સિંક મોડમાં ડિગ્રેડ કરવામાં આવે છે.
- **ડાયનેમિક ટૂલ મર્યાદા શોધ** — ટૂલની સંખ્યા મર્યાદા સુધી પહોંચે ત્યારે પ્રદાતાઓનો ઉપયોગ ઘટાડે છે.
- **ઇમરજન્સી ફૉલબૅક** — `OMNIROUTE_EMERGENCY_FALLBACK` દ્વારા નિયંત્રિત; ઑપરેટરો રીસ્ટાર્ટ કર્યા વિના Feature Flags પેજ પરથી તેને ઓવરરાઇડ કરી શકે છે.

---

## ડિબગિંગ

- ભારિત કૉમ્બો `503 all_targets_cooling_down` જવાબ આપે (`Retry-After` સેટ હોય અને `diagnostics.excluded` દરેક ટાર્ગેટને `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` સાથે સૂચિબદ્ધ કરે) → પૂલ કૉન્ફિગર અને કનેક્ટ થયેલો છે, પરંતુ દરેક ટાર્ગેટ સ્થિતિસ્થાપકતા ટાઇમર દ્વારા બાકાત કરાયેલો છે; `[COMBO] Weighted selection: every target excluded before dispatch — …` ચેતવણી કારણો અને બાકી રહેલી સેકન્ડ્સ દર્શાવે છે. એ જ કૉમ્બોમાંથી મળતા `404 no_executable_targets` નો અર્થ છે કે કોઈ સ્થિતિસ્થાપકતા ટાઇમર સામેલ નહોતો (ચલાવવા માટે કશું નહોતું અથવા દરેક એકાઉન્ટ ઉપલબ્ધતા પ્રોબમાં નિષ્ફળ ગયું). `targetResolution.ts` માં એકત્રિત કરાયેલા અપવર્જનોમાંથી `open-sse/services/combo/pinRecovery.ts` માં બનાવવામાં આવ્યું છે.
- પ્રદાતા માટેની બધી કીઝ સ્કિપ થાય → સર્કિટ બ્રેકરની સ્થિતિ અને દરેક કનેક્શનનું `rateLimitedUntil`/`testStatus`, બંને તપાસો.
- રીસેટ વિન્ડો પછી પ્રદાતા કાયમ માટે બાકાત થાય → કોડ `getStatus()`/`canExecute()` ને બદલે કાચી `state` વાંચી રહ્યો છે.
- એક કી નિષ્ફળ જાય, પણ અન્ય કીઝે કામ કરવું જોઈએ → સર્કિટ બ્રેકર કરતાં કનેક્શન કૂલડાઉનને પ્રાધાન્ય આપો.
- માત્ર એક મૉડલ નિષ્ફળ જાય → કનેક્શન કૂલડાઉન કરતાં મૉડલ લૉકઆઉટને પ્રાધાન્ય આપો.
- સ્થિતિએ આપમેળે પુનઃપ્રાપ્ત થવું જોઈએ, પરંતુ થતી નથી → ભવિષ્યનો ટાઇમસ્ટૅમ્પ અને સમાપ્ત થયેલી સ્થિતિને રિફ્રેશ કરતો રીડ પાથ તપાસો. કાયમી સ્ટેટસ માટે મૅન્યુઅલ ફેરફારો જરૂરી છે.

---

## TLS ફિંગરપ્રિન્ટિંગ અને સ્ટેલ્થ

પ્રદાતા-વિશિષ્ટ સ્ટેલ્થ (JA3/JA4, CCH, ઑબ્ફસ્કેશન) અલગથી દસ્તાવેજીકૃત છે — `docs/security/STEALTH_GUIDE.md` જુઓ (git; `/docs` માં કમ્પાઇલ કરેલું નથી).

---

## સ્થિતિસ્થાપકતા પરીક્ષણ (તબક્કો 8 · બ્લૉક C)

સ્થિતિસ્થાપકતા લૉજિક માટેના યુનિટ ટેસ્ટ ઉપરાંત, ત્રણ ટેસ્ટ વાસ્તવિક તણાવ/નિષ્ફળતા પરિસ્થિતિઓ હેઠળ
રનટાઇમનું પરીક્ષણ કરે છે (બધા ઇન્ટિગ્રેશન/નાઇટલી — કોઈપણ PR ને બ્લૉક કરતા નથી):

| ટેસ્ટ      | શું                                                                                                                                                                                                                 | ચલાવવું                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| કેઓસ       | નકલી-અપસ્ટ્રીમ નોડ વાસ્તવિક લેટન્સી/રીસેટ/ટાઇમઆઉટ/503 દાખલ કરે છે; સર્કિટ બ્રેકર ખુલે/પુનઃપ્રાપ્ત થાય છે અને `checkFallbackError` 503 ને પુનઃપ્રાપ્ત કરી શકાય તેવા ફૉલબૅક તરીકે વર્ગીકૃત કરે છે તેની ચકાસણી કરે છે. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| હીપ-વૃદ્ધિ | `--expose-gc` હેઠળ પ્રત્યેક `createSSEStream` માટે ~500 સ્ટ્રીમ્સ; હીપ મર્યાદાથી વધુ વધે તો નિષ્ફળ થાય છે (OOM ગાર્ડ #3069).                                                                                        | `npm run test:heap`                     |
| k6 સોક     | `/api/monitoring/health` પર સતત લોડ; p95/ભૂલ થ્રેશોલ્ડ્સ.                                                                                                                                                           | `k6 run tests/load/k6-soak.js` (નાઇટલી) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) દ્વારા ઑર્કેસ્ટ્રેટ કરેલું છે. ડિફૉલ્ટ
`test:integration` માં, કેઓસ અને હીપ પોતાને સ્કિપ કરે છે (`RUN_CHAOS_INT`/`--expose-gc` વિના).

---

## આ પણ જુઓ

- [આર્કિટેક્ચર માર્ગદર્શિકા](./ARCHITECTURE.md) — સિસ્ટમ આર્કિટેક્ચર અને આંતરિક રચના
- [વપરાશકર્તા માર્ગદર્શિકા](../guides/USER_GUIDE.md) — પ્રદાતાઓ, કોમ્બોઝ, CLI એકીકરણ
- [ઑટો-કોમ્બો એન્જિન](../routing/AUTO-COMBO.md) — 16-પરિબળ સ્કોરિંગ, મોડ પૅક્સ
