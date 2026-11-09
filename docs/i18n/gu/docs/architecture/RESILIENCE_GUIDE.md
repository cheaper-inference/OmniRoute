# Resilience Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute પાસે ત્રણ અલગ પરંતુ સંબંધિત સ્થિતિસ્થાપકતા પદ્ધતિઓ છે. દરેકનો એક અલગ અવકાશ અને હેતુ છે. રૂટીંગ વર્તનને ડીબગ કરતી વખતે તેમને અલગ રાખો.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> સ્ત્રોત: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **સ્થિતિસ્થાપકતા ટૉગલ માટે Env-vs- ડેશબોર્ડ અગ્રતા.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — માત્ર _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) સપ્લાય કરે છે. `resilienceSettings` માં બુલિયન ચાલુ રહે છે (ડેશબોર્ડ →** સેટિંગ્સ → સ્થિતિસ્થાપકતા** / `PATCH /api/resilience`, `key_value` માં સંગ્રહિત ) env મૂલ્ય પર જીત મેળવે છે: જ્યારે પણ અસ્તિત્વમાં હોય ત્યારે નોર્મલાઇઝેશન (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) સંગ્રહિત બુલિયનને રાખે છે. ડિપ્લોયમેન્ટ પર આવા env var ને `true` પર સેટ કરવું જ્યાં ડેશબોર્ડ પહેલેથી જ `false` સાચવે છે તેથી કંઈપણ બદલાતું નથી — ટૉગલને ફ્લિપ કરો.** સેટિંગ્સ → સ્થિતિસ્થાપકતા** (અથવા સંગ્રહિત ફીલ્ડ સાફ કરો).

## 1. પ્રોવાઈડર સર્કિટ બ્રેકર

**અવકાશ:** સમગ્ર પ્રોવાઈડર (દા.ત., `glm`, `openai`, `anthropic`).

**હેતુ:** અપસ્ટ્રીમ/સર્વિસ સ્તરે વારંવાર નિષ્ફળ થઈ રહેલા પ્રોવાઈડરને ટ્રાફિક મોકલવાનું બંધ કરવું.

**અમલીકરણ:**

- કોર ક્લાસ: `src/shared/utils/circuitBreaker.ts`
- વાયરિંગ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- સ્ટેટસ API: `GET /api/monitoring/health`
- રીસેટ API: `POST /api/resilience/reset`
- રેપર્સ: `open-sse/services/accountFallback.ts`
- DB ટેબલ: `domain_circuit_breakers`

**સ્થિતિઓ:**

- `CLOSED` — સામાન્ય ટ્રાફિકને મંજૂરી
- `DEGRADED` — ટ્રાફિકને હજુ પણ મંજૂરી છે, પરંતુ વધી રહેલી પ્રોવાઈડર નિષ્ફળતાઓ ટ્રેક થઈ રહી છે; પૂરતી સફળતાઓ પર, માન્ય કનેક્શન ટેસ્ટ પર, અથવા છેલ્લા નિષ્ફળતા પ્રકાર માટેના સૌથી લાંબા `OPEN` હોલ્ડ (તેનું `cooldownByKind` મૂલ્ય, નહીંતર `resetTimeout`, × `maxBackoffMultiplier`, ઓછામાં ઓછું એક કૂલડાઉન) પછી નવી નિષ્ફળતા વગર `CLOSED` પર પાછું ફરે છે
- `OPEN` — પ્રોવાઈડર અસ્થાયી રૂપે અવરોધિત; કોમ્બો રૂટિંગ તેને સ્કિપ કરે છે
- `HALF_OPEN` — રીસેટ ટાઈમઆઉટ પૂરો થયો; પ્રોબ રિક્વેસ્ટને મંજૂરી

**કન્ફિગર કરી શકાય તેવા ડિફોલ્ટ્સ (`open-sse/config/constants.ts`, ડેશબોર્ડ → સેટિંગ્સ → રેઝિલિયન્સ માં દર્શાવેલ):**

| વર્ગ    | ડિગ્રેડ થાય ત્યારે | ઓપન થાય ત્યારે | રીસેટ ટાઈમઆઉટ |
| ------- | ------------------ | -------------- | ------------- |
| OAuth   | 5 નિષ્ફળતાઓ        | 8 નિષ્ફળતાઓ    | 60s           |
| API-key | 7 નિષ્ફળતાઓ        | 12 નિષ્ફળતાઓ   | 30s           |
| Local   | વ્યુત્પન્ન         | 2 નિષ્ફળતાઓ    | 15s           |

`degradationThreshold` નિયંત્રિત કરે છે કે પ્રોવાઈડર ક્યારે `DEGRADED` માં પ્રવેશે; `failureThreshold` નિયંત્રિત કરે છે કે તે ક્યારે ઓપન થાય અને સ્કિપ થાય. લોકલ પ્રોવાઈડર પ્રોફાઇલ્સ હજુ રેઝિલિયન્સ સેટિંગ્સ પેજ પર દર્શાવવામાં આવતી નથી.

**ટ્રિપ કોડ્સ:** ફક્ત પ્રોવાઈડર-સ્તરીય સ્ટેટસ `[408, 500, 502, 503, 504]`. એકાઉન્ટ-સ્તરીય ભૂલો માટે ટ્રિપ કરશો નહીં (મોટાભાગના 401/403/429 — તે કૂલડાઉન અથવા લોકઆઉટમાં આવે છે).

**લેઝી રિકવરી:** જ્યારે `OPEN` સમાપ્ત થાય, ત્યારે `getStatus()`, `canExecute()`, `getRetryAfterMs()` સ્થિતિને `HALF_OPEN` પર રિફ્રેશ કરે છે. એ જ રીડ્સ (અને આગળની નિષ્ફળતા) જૂના `DEGRADED` ને ફરી `CLOSED` પર ઘટાડે છે. કોઈ બેકગ્રાઉન્ડ ટાઈમરની જરૂર નથી.

---

### ઓપ્ટ-ઇન ગ્લોબલ પ્રોવાઈડર કૂલડાઉન (વિન્ડો ગેટ)

ચોથો, **ઓપ્ટ-ઇન** સ્તર (`PROVIDER_COOLDOWN_ENABLED`, ડિફોલ્ટ **બંધ**) નિષ્ફળ
થયેલા પ્રોવાઈડર્સની ક્રોસ-રિક્વેસ્ટ મેમરી
`open-sse/services/providerCooldownTracker.ts` માં રાખે છે, જેનો સંદર્ભ કોમ્બો ટાર્ગેટ
રિઝોલ્યુશન દ્વારા લેવામાં આવે છે જેથી ક્રમિક કોમ્બો રિક્વેસ્ટ્સ હમણાં જ
નિષ્ફળ થયેલા પ્રોવાઈડર પર ફરીથી ન ફરે. પ્રોવાઈડર-સ્તરીય એન્ટ્રીઓ `PROVIDER_PROFILES`
વિન્ડો ગેટનું પાલન કરે છે:

| પ્રોફાઇલ | આ પછી ટ્રિપ થાય (`providerFailureThreshold`) | આ વિન્ડોની અંદર (`providerFailureWindowMs`) | આટલા માટે કૂલ થાય (`providerCooldownMs`) |
| -------- | -------------------------------------------: | ------------------------------------------: | ---------------------------------------: |
| OAuth    |                                         `10` |                                     `15min` |                                   `5min` |
| API key  |                                         `15` |                                     `30min` |                                  `10min` |

થ્રેશોલ્ડથી નીચે પ્રોવાઈડર કૂલિંગ ગણવામાં આવતો **નથી**; સફળતા
વિન્ડો સાફ કરે છે. કનેક્શન-સ્તરીય એન્ટ્રીઓ (`provider:connectionId`) તેના બદલે
ઘાતાંકીય `minRetryCooldownMs → maxRetryCooldownMs` બેકઑફ જાળવી રાખે છે. ઓવરરાઈડ્સ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
રિગ્રેશન ગાર્ડ: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. કનેક્શન કૂલડાઉન

**સ્કોપ:** એકલ પ્રોવાઇડર કનેક્શન/એકાઉન્ટ/કી.

**હેતુ:** એક ખરાબ કીને છોડીને તે જ પ્રોવાઇડરના અન્ય કનેક્શનોને સેવા આપતા રહેવા દેવું.

**અમલીકરણ:**

- અનુપલબ્ધ તરીકે ચિહ્નિત કરો: `src/sse/services/auth.ts::markAccountUnavailable()`
- પસંદગી: એ જ ફાઇલમાં `getProviderCredentials*`
- કૂલડાઉન ગણતરી: `open-sse/services/accountFallback.ts::checkFallbackError()`
- સેટિંગ્સ: `src/lib/resilience/settings.ts`

**દરેક કનેક્શન માટેનાં ફીલ્ડ્સ:**

- `rateLimitedUntil` — કૂલડાઉન સમાપ્ત થાય ત્યાં સુધીનો ટાઇમસ્ટેમ્પ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — એક્સ્પોનેન્શિયલ બૅકઓફ કાઉન્ટર

**ડિફૉલ્ટ કૂલડાઉન:**

- OAuth બેઝ: 5s
- API-key બેઝ: 3s
- API-key 429: અપસ્ટ્રીમ `Retry-After`/રીસેટ હેડર્સ/પાર્સ કરી શકાય તેવા રીસેટ ટેક્સ્ટને પ્રાધાન્ય આપે છે
- બૅકઓફ: `baseCooldownMs * 2 ** failureIndex`

**પ્રોવાઇડર દીઠ રીટ્રાય વિલંબ.** પ્રોવાઇડરની વિગતો ધરાવતા પેજમાં **Retry delay** સિલેક્ટ હોય છે (Auto,
15s થી 1h સુધી). તે `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, `PATCH /api/resilience` દ્વારા) સાચવે છે. જ્યારે રેટ-લિમિટ ભૂલમાં અપસ્ટ્રીમ રીટ્રાય
હિન્ટ ન હોય, ત્યારે આ મૂલ્ય પ્રોવાઇડર માટેના સ્કેલ કરેલા બૅકઓફને બદલે છે અને
`backoffLevel` ને 0 પર રીસેટ કરે છે (`open-sse/services/rotationConfig.ts::overrideFor`). રેટ-લિમિટેડ
ભૂલ માટેની પ્રાથમિકતા, સૌથી ઊંચીથી શરૂ કરીને: અપસ્ટ્રીમ રીટ્રાય હિન્ટ, પછી કનેક્શન દીઠ
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`, પછી પ્રોવાઇડર દીઠ રીટ્રાય વિલંબ, પછી
env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, અને અંતે સ્કેલ કરાયેલ બૅકઓફ. Auto ફીલ્ડ દૂર કરે છે.
તે માત્ર રેટ-લિમિટ કારણને અસર કરે છે, ટર્મિનલ સ્થિતિઓને ક્યારેય નહીં.

**એન્ટિ-થન્ડરિંગ-હર્ડ ગાર્ડ:** સમકાલીન નિષ્ફળતાઓને કૂલડાઉનને અતિશય લંબાવવાથી અથવા
`backoffLevel` ને બે વાર વધારવાથી અટકાવે છે.

**કન્કરન્સી-લિમિટ 429 બૅકઓફ સીડી પર આગળ વધતા નથી.** જે `429` ના બોડીમાં
કન્કરન્સી લિમિટ ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) દર્શાવવામાં આવે છે, તેનો અર્થ છે કે એકાઉન્ટ સ્વસ્થ છે પરંતુ વ્યસ્ત છે.
`checkFallbackError()` કારણ `concurrency_limited` પરત કરે છે: તરત જ આગલા
કનેક્શન પર ફેલ ઓવર કરો, આ કનેક્શનને નિશ્ચિત `CONCURRENCY_LIMIT_COOLDOWN_MS` કૂલડાઉન (1s)
અથવા અપસ્ટ્રીમ રીટ્રાય હિન્ટ માટે કૂલ કરો, `backoffLevel` ને અપરિવર્તિત રાખો અને
`skipProviderBreaker` સેટ કરો. સ્પષ્ટ ક્વોટા બોડીનું પ્રાધાન્ય રહેશે, તેથી ક્વોટા પેટર્ન સાથે
પણ મેળ ખાતી બોડી ક્વોટા વર્ડિક્ટ જ રહેશે. શોધ: `src/shared/utils/classify429.ts` માં
`looksLikeConcurrencyLimit()`; વર્ડિક્ટ: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (બ્રેકરનું `FailureKind`) અપરિવર્તિત રહે છે અને આ બોડીઓ માટે પણ
`rate_limit` વાંચે છે.

**સ્ટ્રીમ કન્ટેન્ટ સ્ટૉલ એકાઉન્ટને કૂલ કરાવતા નથી.** જ્યારે કન્ટેન્ટ-સ્ટૉલ વૉચડૉગ
(`open-sse/utils/streamHandler.ts`) એવી સ્ટ્રીમ છોડી દે છે જેણે સમયસર કોઈ મોડેલ આઉટપુટ
મોકલ્યું ન હોય, ત્યારે `markAccountUnavailable()` કનેક્શન પર ભૂલ નોંધે છે પરંતુ કોઈ કૂલડાઉન
સેટ કરતું નથી: સ્ટૉલ તે રિક્વેસ્ટને લગતો હોય છે, મોટા ભાગે લાંબા રીઝનિંગ ટર્નને લગતો,
જેમાં હજી આઉટપુટ આવ્યું ન હોય. ઑપરેટર્સ `resilienceSettings.streamStallCooldown.enabled`
(ડિફૉલ્ટ `false`) વડે તેને ફરી સક્રિય કરી શકે છે.

**`p2c` એકાઉન્ટ પસંદગી માટે વૈકલ્પિક લેટન્સી સિગ્નલ.** દરેક ડિસ્પેચ કરાયેલ પ્રયાસ
દરેક કનેક્શન (અને કનેક્શન + મોડેલ દીઠ) માટે તેનો ટાઇમ-ટુ-ફર્સ્ટ-બાઇટ અને પરિણામ મેમરીમાં
રોલિંગ વિન્ડોમાં નોંધે છે: 15 મિનિટની અંદરના છેલ્લા 20 સેમ્પલ
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts` માં
`safeLogEvents()` પરથી નોંધાયેલ). જ્યારે `resilienceSettings.p2cLatency.weight` `0`થી વધુ
હોય (રેન્જ 0-20, ડિફૉલ્ટ `0` = બંધ), ત્યારે `src/sse/services/auth.ts` માં
`compareP2CConnections()` જોડીના દરેક ઉમેદવારને વધુમાં વધુ `weight` પૉઇન્ટ ઉમેરે છે.
તેમાંથી અડધા ઝડપી ઉમેદવારની સરખામણીમાં લેટન્સીના ગુણોત્તરમાંથી આવે છે (બમણું ધીમું હોવું
સંપૂર્ણ અડધો ભાગ લે છે) અને અડધા રોલિંગ ભૂલ દરમાંથી આવે છે. આ ટર્મ ત્યારે જ લાગુ પડે છે
જ્યારે બંને ઉમેદવારો પાસે ઓછામાં ઓછા 3 સેમ્પલ હોય, જેથી નવા એકાઉન્ટને દંડ ન થાય, અને
તેની મહત્તમ મર્યાદા ક્વોટા-બ્લૉક્ડ તથા ક્વોટા-એક્ઝૉસ્ટેડ દંડ કરતાં ઓછી રહે છે. તે પોતાનું
કોઈ સર્કિટ ઉમેરતું નથી: નિષ્ફળ એકાઉન્ટને કૂલડાઉન, લૉકઆઉટ અને બ્રેકર સ્તરો હજી સંભાળે છે.
તેને `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` વડે સેટ કરો.

**રીઝનિંગ ફ્રેમ્સ કન્ટેન્ટ-સ્ટૉલ બજેટને ફરી શરૂ કરે છે.** કોઈ રીઝનિંગ મોડેલ તેના પ્રથમ
દૃશ્યમાન ટોકન પહેલાં મિનિટો સુધી વિચારી શકે છે: Claude `thinking_delta` ફ્રેમ્સ સ્ટ્રીમ કરે છે
જેમાં thinking ટેક્સ્ટ ખાલી હોઈ શકે છે, અને Responses API એક પછી એક રીઝનિંગ આઇટમ સ્ટ્રીમ કરે છે.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) આ ફ્રેમ્સ ઓળખે છે,
અને વૉચડૉગ ટર્ન રદ કરવાને બદલે દરેક ફ્રેમ પર તેનું બજેટ ફરી શરૂ કરે છે. તે હજી પણ મોડેલ
આઉટપુટ નથી, તેથી માત્ર રીઝનિંગ સાથે સમાપ્ત થતો ટર્ન હજી પણ ખાલી તરીકે રિપોર્ટ થશે, અને
રીઝનિંગ બંધ કરીને માત્ર હાર્ટબીટ મોકલતો ટર્ન હજી પણ વૉચડૉગને ટ્રિગર કરશે.

નોન-એમ્પ્ટી સિગ્નેચર ધરાવતી Kiro ની બાઇનરી `reasoningContentEvent` ફ્રેમ્સ આ રીઝનિંગ
પ્રવૃત્તિને એક્ઝિક્યુટર મારફતે ખાલી `reasoning_content` ડેલ્ટા તરીકે જાળવી રાખે છે. સિગ્નેચર
ફોરવર્ડ કરવામાં આવતું નથી. મેટાડેટા, અધૂરી ફ્રેમ્સ અને ખાલી સિગ્નેચર્સ કન્ટેન્ટ બજેટને ફરી
શરૂ કરતા નથી; સ્વતંત્ર ઍક્ટિવ-સ્ટ્રીમ ટાઇમઆઉટ અને ક્લાયન્ટ રદબાતલ હજી લાગુ પડે છે
(`open-sse/executors/kiro/reasoning.ts`).

**ટર્મિનલ સ્થિતિઓ (કૂલડાઉન નથી):**

- `banned` — પ્રતિબંધિત-કીવર્ડ / એકાઉન્ટ-બૅન શોધ દ્વારા સેટ થાય છે (જુઓ [BAN_DETECTION](../security/BAN_DETECTION.md)). અપસ્ટ્રીમ પ્રતિ-રિક્વેસ્ટ અસ્વીકારો (`request_rejected`, જેમ કે Anthropic OAuth 403 "Request not allowed") તેને ક્યારેય સેટ કરતા નથી: તે કનેક્શન અને મોડેલ દીઠ ગણવામાં આવે છે અને વધતા કૂલડાઉન સાથે તે મોડેલને રોટેશનમાંથી બહાર કરે છે, જે `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) પર મર્યાદિત હોય છે, અથવા જ્યારે કોઈ મોડેલ જાણીતું ન હોય ત્યારે કનેક્શનને કૂલ કરે છે — `open-sse/services/requestRejectedStreak.ts`
- `expired` (મર્યાદિત રીટ્રાય પછી ટર્મિનલમાં પરિવર્તિત થાય છે — એક્સ્પોનેન્શિયલ બૅકઓફ સાથે `EXPIRED_RETRY_MAX = 3` — જેથી એકાઉન્ટ કાયમી રીતે નિષ્ક્રિય થાય તે પહેલાં ક્ષણિક OAuth ભૂલો પોતે સુધરી શકે)
- `credits_exhausted`

આ કનેક્શન્સ ત્યાં સુધી જળવાઈ રહે છે જ્યાં સુધી ઓળખપત્રો બદલાય નહીં અથવા ઑપરેટર તેમને રીસેટ ન કરે. ટર્મિનલ સ્થિતિઓને ક્ષણિક કૂલડાઉન સ્થિતિથી ઓવરરાઇટ કરશો નહીં.

**લેઝી રિકવરી:** જ્યારે `rateLimitedUntil` પસાર થઈ જાય છે, ત્યારે કનેક્શન ફરીથી પાત્ર બને છે. સફળ ઉપયોગ પછી, `clearAccountError()` તમામ ભૂલ ક્ષેત્રોને સાફ કરે છે.

### Claude OAuth ઉપયોગ મર્યાદા: નીચી-પ્રાથમિકતા લેન + સેશન-મર્યાદા રીસેટ

**સ્કોપ:** એક Claude સબ્સ્ક્રિપ્શન (OAuth) કનેક્શન. બંને સુવિધાઓ **કનેક્શન દીઠ opt-in** છે
(Edit connection → Claude વિભાગ → `lowPriorityMode` / `autoLimitReset` માં
`providerSpecificData`, બંને મૂળભૂત રીતે બંધ) અને Claude Code ના `/low-priority` અને
`/limit-reset` કમાન્ડ્સને પ્રતિબિંબિત કરે છે (વાયર કોન્ટ્રાક્ટ Claude Code 2.1.263 માંથી મેળવાયેલો છે).

**અમલીકરણ:**

- સ્થિતિ મશીન + પ્રતિસાદ વર્ગીકરણ: `open-sse/services/claudeLowPriority.ts`
- રીસેટ સ્થિતિ/ક્લેમ ક્લાયન્ટ: `open-sse/services/claudeLimitReset.ts`
- એક્ઝિક્યુટર હૂક (હેડર ઇન્જેક્શન + સમાન-એકાઉન્ટ રીટ્રાય): `open-sse/executors/base.ts::execute()`
- opt-in પર્સિસ્ટન્સ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ટ્રિગર:** 5-કલાકની ઉપયોગ મર્યાદા — એક `429`, જેના હેડર્સમાં
`anthropic-ratelimit-unified-status: rejected` હોય અને, જ્યારે એકાઉન્ટ પાત્ર હોય,
`anthropic-ratelimit-unified-slow-offer: treatment` હોય. તે પ્રથમ મર્યાદા
`429` પહેલાં કંઈ મોકલવામાં આવતું નથી; unified હેડર્સ વિનાનો burst `429` સામાન્ય કૂલડાઉન માર્ગે જાય છે.

**નીચી-પ્રાથમિકતા લેન** (`lowPriorityMode`):

- મર્યાદા `429` પર એક્ઝિક્યુટર ઑફર સ્વીકારે છે અને તરત જ એ જ એકાઉન્ટને
  `anthropic-usage-limit: slow` સાથે રીટ્રાય કરે છે; જાહેર કરાયેલ
  `anthropic-ratelimit-unified-reset` (+60s ગ્રેસ) સુધી લેન સક્રિય રહે છે અને તે વિન્ડોમાંની દરેક
  રિક્વેસ્ટ આ હેડર ધરાવે છે. અવરોધાયેલ `429` ક્યારેય `handleChatCore` સુધી પહોંચતો નથી, તેથી કનેક્શન
  કૂલડાઉનમાં મૂકાતું નથી અને તેને બદલીને બીજા કનેક્શન પર મોકલવામાં આવતું નથી.
- પછીના પ્રતિસાદોમાં `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  લેન ચાલુ રાખે છે; `slot_busy` (429) અથવા `529` સર્વરનું
  `anthropic-ratelimit-unified-slow-retry-after` (મૂળભૂત 20s, 5–600s સુધી મર્યાદિત, ±30% જિટર)
  રાહ જુએ છે અને રીટ્રાય કરે છે, જે `anthropic-ratelimit-unified-slow-max-wait` (મૂળભૂત 20 min,
  1 min–6 h સુધી મર્યાદિત) દ્વારા સીમિત છે — તે સમય પસાર થયા પછી લેન સમાપ્ત થાય છે અને 10-મિનિટનું
  કૂલ-ઑફ ફરીથી સ્વીકારણને અવરોધે છે. રાહનો સમય રિક્વેસ્ટના પોતાના upstream-start timeout માં
  બાકી રહેલા સમયથી પણ સીમિત થાય છે (`resolveFetchStartTimeout`, મૂળભૂત 10 min), જેમાંથી 5 s
  માર્જિન ઘટાડવામાં આવે છે: આ મર્યાદા વિના, 20-minute મૂળભૂત max-wait રિક્વેસ્ટ કરતાં વધુ સમય ચાલત,
  અને ઊંઘ દરમિયાન જ રદ થઈ જાત, જેના કારણે શિસ્તબદ્ધ `max_wait` અંત + કૂલ-ઑફને બદલે
  `TimeoutError` સપાટી પર આવત.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-વિન્ડોનું રોલઓવર, અથવા
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (જે તેને કોઈપણ સ્થિતિમાં
  `extra_usage` તરીકે સમાપ્ત કરે છે, કારણ કે ચૂકવાયેલ overage હવે મર્યાદાને આવરી લે છે) લેનને
  સમાપ્ત કરે છે; ત્યારબાદ પ્રતિસાદ સામાન્ય કૂલડાઉન માર્ગે જાય છે. `budget_exhausted` જાહેર કરાયેલા
  બજેટ રીસેટ સુધી (≤ 8 દિવસ) યાદ રાખવામાં આવે છે.
- એક્ઝિક્યુટરના પોતાના 400-આધારિત intra-attempt રીટ્રાય (context editing, thinking/effort clamps,
  param auto-learn) પછી wall check ચાલે છે, તેથી તેમાંથી કોઈ એક રીટ્રાય પર જ સપાટી પર આવતો
  wall `429` પણ કૂલડાઉન માર્ગ સુધી પહોંચવાને બદલે અવરોધાય છે.
- સ્થિતિ કનેક્શન દીઠ મેમરીમાં રહે છે (રીસ્ટાર્ટ માટે ફરી સ્વીકારવા એક વધારાનો wall `429` જરૂરી બને છે).

**સેશન-મર્યાદા રીસેટ** (`autoLimitReset`, બંને સક્રિય હોય ત્યારે લેન પહેલાં અજમાવવામાં આવે છે):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  બ્લોક; જ્યારે `arm: "reset"` અને `available: true` હોય ત્યારે,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` સાથે
  `{ "program": "juniper_tide" }` (સંસ્થાનું UUID `providerSpecificData.organizationUUID`માંથી,
  bootstrap fallback સાથે).
- `result: reset|not_limited` → રિક્વેસ્ટને સંપૂર્ણ ઝડપે રીટ્રાય કરવામાં આવે છે (slow હેડર વિના).
  `already_used` / `not_offered` `next_available_at`ને (મૂળભૂત એક અઠવાડિયું) મેમોઇઝ કરે છે; કોઈપણ
  નિષ્ફળતા માટે 15 મિનિટનો બેકઑફ થાય છે. રીસેટ અઠવાડિયામાં એક વાર થાય છે અને સાપ્તાહિક મર્યાદામાં
  હજુ પણ ગણાય છે.

રીગ્રેશન ગાર્ડ્સ: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### બેંક્ડ રીસેટ્સ સ્વતઃ લાગુ કરો

**અવકાશ:** Codex અને Claude સબ્સ્ક્રિપ્શન (OAuth) જોડાણો.**પસંદ કરો** : `bankedResetAutoApply` સેટિંગ બંધ છે અને ડિફૉલ્ટ રૂપે `dry-run` મોડમાં છે (સેટિંગ્સ → AI → ઑટો-એપ્લાય બેંક્ડ રીસેટ્સ).

**હેતુ:** પ્રદાતાની મર્યાદાઓ પૃષ્ઠ પર "રિડીમ" દબાવવા માટે ઓપરેટરની રાહ જોવાને બદલે, જ્યારે એકાઉન્ટ વપરાશની દિવાલ સાથે અથડાતું હોય ત્યારે તેમના પોતાના પર બેંક રીસેટનો ખર્ચ કરો.

| ક્રેડિટ પ્રકાર (`creditTypes`) | શું રિડીમ કરવામાં આવે છે                  | જ્યાં તે ચાલે છે                                 |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------ |
| `codexCredits`                 | Codex રીસેટ ક્રેડિટ્સ                     | બેકગ્રાઉન્ડ જોબ, દર 60 સે                        |
| `claudeCredits`                | Claude બેંક્ડ અનુદાન (`GRANT` ક્રેડિટ્સ)  | બેકગ્રાઉન્ડ જોબ, દર 60 સે                        |
| `claudeSessionReset`           | Claude સાપ્તાહિક સત્ર-મર્યાદા રીસેટ (ઉપર) | પ્રતિ-એકાઉન્ટ ટૉગલ જેવી જ નીતિ દ્વારા વિનંતી પાથ |

**અમલીકરણ:**

- શુદ્ધ નિર્ણય (બંને પાથ માટે એક નિયમ સેટ): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- પૃષ્ઠભૂમિ નોકરી: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` માં શરૂ)
- Claude વિનંતી-પાથ ગેટ: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` માં `setClaudeLimitResetPolicy()` દ્વારા નોંધાયેલ
- ઇતિહાસ, કેપ્સ અને વેબહૂક: `src/lib/usage/bankedResetAudit.ts`
- ઇતિહાસ API: `GET /api/settings/banked-reset-auto/history?limit=50` (મેનેજમેન્ટ ઓથ)

**નિર્ણય ઓર્ડર** (પ્રથમ નિષ્ફળ નિયમ રેકોર્ડ કરેલ કારણ છે):

1. સુવિધા બંધ, ક્રેડિટ પ્રકાર બંધ અથવા ખાતાની બહાર (`accountScope` `all` / `selected` વત્તા એકાઉન્ટ દીઠ `connections` નકશો).
2. વૈકલ્પિક UTC શેડ્યૂલની બહાર (`startHourUtc` > `endHourUtc` મધ્યરાત્રિને પાર કરે છે).
3. છેલ્લા 24 કલાકમાં કેપ્સ: `maxPerAccountPerDay` (1), `maxPerDay` (3), અને `minSpacingMinutes` (30) કોઈપણ બે રિડેમ્પશન વચ્ચે.
4. ટ્રિગર: દિવાલવાળી `session` અથવા `weekly` વિન્ડો ( `getQuotaWindowStatus().reachedThreshold` માંથી વાંચો, `isAccountQuotaExhausted()` નહીં, જે દરેક વિન્ડો સાથે ખર્ચવામાં આવેલા એકાઉન્ટની જાણ કરે છે), અથવા ઓછામાં ઓછા `expiringCreditMinUsedPercent` (50) નો ઉપયોગ કર્યો હોય તેવા ખાતા પર `expiringCreditHours` (24) ની અંદર સમાપ્ત થતી ક્રેડિટ.
5. નેચરલ-રીસેટ ગાર્ડ: જ્યારે દિવાલવાળી 5-કલાકની વિન્ડો `sessionResetGuardMinutes` (90) ની અંદર ફરીથી સેટ થાય ત્યારે છોડો અથવા `weeklyResetGuardHours` (12) ની અંદર દિવાલવાળી સાપ્તાહિક વિન્ડો.
6. સાપ્તાહિક માળ: જ્યારે સાપ્તાહિક બાકી રહેલું `weeklyFloorPercent` (10) ની નીચે હોય ત્યારે 5-કલાકનું રીસેટ છોડો.
7. `last-resort` મોડ: છોડો જ્યારે સમાન પ્રદાતાના અન્ય ઇન-સ્કોપ એકાઉન્ટમાં બંને વિન્ડોમાં ઓછામાં ઓછું `poolHeadroomPercent` (10) બાકી હોય. એક્સપાયરિંગ-ક્રેડિટ ટ્રિગર્સ આને બાયપાસ કરે છે.
8. `dry-run` એક પંક્તિ રેકોર્ડ કરે છે અને કંઈપણ રિડીમ કરતું નથી; `last-resort` અને `eager` રિડીમ.

ખૂટતો ક્વોટા ડેટા ક્યારેય રિડેમ્પશનને અનલૉક કરતું નથી: અજ્ઞાત રીસેટ સમય અથવા સાપ્તાહિક ઉપયોગ છોડે છે.

**Claude સત્ર રીસેટ:** સુવિધા બંધ અથવા `claudeSessionReset` બંધ સાથે, એકાઉન્ટ દીઠ `autoLimitReset` ટૉગલ પહેલાની જેમ બરાબર નક્કી કરે છે. બંને ચાલુ સાથે, સુવિધા એકાઉન્ટ દીઠ ટૉગલ્સને બદલે છે: ઇન-સ્કોપ એકાઉન્ટ માત્ર ત્યારે જ દાવો કરી શકે છે જ્યારે નીતિ તેને મંજૂરી આપે છે, અને `dry-run` મોડમાં કોઈ દાવો કરવામાં આવતો નથી.

**સલામતી:** જોબ ટિક દીઠ વધુમાં વધુ એક ક્રેડિટ રિડીમ કરે છે, લિસ્ટિંગ ક્રેડિટ પહેલાં નક્કી કરે છે (છોડી ગયેલું ખાતું ક્યારેય સૂચિબદ્ધ થતું નથી), આઇડમ્પોટન્સી કીઝ `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ઉપયોગ કરે છે, અને નિષ્ફળ લિસ્ટિંગ અથવા રિડેમ્પશન પછી 1 કલાક માટે એકાઉન્ટ બંધ કરે છે. દરેક રિડેમ્પશન, નિષ્ફળતા અને ડ્રાય-રન નિર્ણય `audit_log` (`action: "bankedReset.redeem"`, કોઈ ટોકન્સ અથવા ક્રેડિટ ids નથી); તે પંક્તિઓમાંથી કેપ્સની ગણતરી કરવામાં આવે છે, તેથી તે પુનઃપ્રારંભ થતાં બચી જાય છે. સફળ રીડેમ્પશન `provider.reset_redeemed` વેબહૂકને પણ ફાયર કરે છે.

રીગ્રેશન ગાર્ડ્સ: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### સેશન એફિનિટી (#7274)

**સ્કોપ:** કોઈપણ પ્રોવાઇડર માટે, એક ક્લાયન્ટ સેશન (`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session` હેડર) એક જ કનેક્શન સાથે પિન કરેલું.

**હેતુ:** બહુ-ટર્ન એજન્ટ (Claude Code, aider, કસ્ટમ એજન્ટ્સ)ને રિક્વેસ્ટ્સ વચ્ચે એ જ એકાઉન્ટ પર
જાળવી રાખવું, જેથી ક્રોસ-એકાઉન્ટ કન્ટેક્સ્ટ લોસ અને પ્રતિ-એકાઉન્ટ સેશન સ્થિતિ ધરાવતા પ્રોવાઇડર્સ પર
વારંવાર થતા cold-start 429 ઘટે.

**અમલીકરણ:**

- TTL રિઝોલ્યુશન: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- પિન પસંદગી/નિર્માણ: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- હેડર એક્સ્ટ્રેક્શન (સામાન્ય, કોઈપણ પ્રોવાઇડર): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- પર્સિસ્ટેડ પિન ટેબલ: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- સેટિંગ: `sessionAffinityTtlMs` (મિલિસેકન્ડમાં વૈશ્વિક TTL, `0` અક્ષમ કરે છે) —
  `src/lib/db/settings.ts`. Codex-માત્ર `codexSessionAffinityTtlMs`માંથી તેનું નામ બદલવામાં આવ્યું છે
  migration `124_generic_session_affinity_ttl.sql` દ્વારા, જે પહેલાં ગોઠવાયેલ કોઈપણ Codex TTLને
  નવા મૂળભૂત મૂલ્ય તરીકે આગળ લઈ જાય છે.

#7274 પહેલાં, `resolveSessionAffinityTtlMs()` એ `codex` સિવાયના દરેક પ્રોવાઇડર માટે સીધું `0`
પરત કરતું હતું, તેથી TTL સેટિંગ (અને સેશન હેડર્સ) અન્યત્ર ક્યાંય અસરકારક નહોતા, તેમ છતાં પિનિંગ
મેકેનિઝમ અને હેડર એક્સ્ટ્રેક્શન પહેલેથી જ પ્રોવાઇડર-અજ્ઞેય હતા. સુધારાએ તે પ્રારંભિક રિટર્ન દૂર કર્યું;
હવે વૈશ્વિક સ્તરે `0`થી વધુ સેટ કર્યા પછી TTL દરેક પ્રોવાઇડર પર સમાન રીતે લાગુ પડે છે.

ત્રણેય સેશન-એફિનિટી હેડર્સ ક્યારેય upstream પર ફોરવર્ડ થતા નથી — એક્ઝિક્યુટર્સ ક્લાયન્ટ હેડર્સ
સીધા પસાર કરવાને બદલે શરૂઆતથી પોતાના upstream હેડર્સ બનાવે છે, તેથી આ માત્ર આંતરિક correlation id
તરીકે રહે છે.

### વિશિષ્ટ મેનેજ્ડ સેશન કનેક્શન લીઝ્સ

**વ્યાપ:** એક સક્રિય managed HTTP client/session એક eligible OmniRoute connectionની માલિકી ધરાવે છે.

**હેતુ:** requests દરમિયાન કડક routing fenceની જરૂર ધરાવતા clients માટે ટકાઉ વિશિષ્ટ connection ownership પ્રદાન કરવું. આ session affinityથી અલગ છે, જે soft continuity preference છે:
exclusive lease lifecycle stateને SQLiteમાં જાળવી રાખે છે, global active-owner અને
active-connection uniqueness લાગુ કરે છે, અને provider dispatch પહેલાં stale generationને નકારે છે.

આ સુવિધા API key દીઠ opt-in છે. Managed key પાસે `lease:exclusive` scope અને સ્પષ્ટ, ખાલી ન હોય તેવી `allowedConnections` યાદી હોવી આવશ્યક છે. કોઈપણ HTTP client lifecycle endpointનો ઉપયોગ કરી શકે છે; client name, user-agent, provider, OAuth method અથવા modelમાંથી કશું જરૂરી નથી. Lease modelની નહીં પરંતુ connectionની માલિકી ધરાવે છે, તેથી connection સામાન્ય રીતે eligible રહે ત્યાં સુધી model બદલવાથી binding જળવાઈ રહે છે. સામાન્ય model, quota, health, cooldown અને allowlist નિયમો authoritative રહે છે અને તે જ generationને બીજા free eligible connection પર પણ લઈ જઈ શકે છે.

Lifecycle `POST /api/v1/session-leases` છે, જેમાં JSON actions `acquire`, `renew` અને `release` છે.
Managed inference requests opaque `X-OmniRoute-Lease-Owner` value અને ચોક્કસ
`X-OmniRoute-Lease-Generation` રજૂ કરે છે. Owner `vlo_` પછીના 43 base64url charactersનો ઉપયોગ કરે છે; માત્ર તેનો SHA-256 hash સંગ્રહિત થાય છે. દરેક final dispatch fence authenticated API key ID અને active connection ID સાથે પણ બંધાયેલું હોય છે. Lease control headers logs, જાળવેલા request snapshots અને upstream executor headersમાંથી દૂર કરવામાં આવે છે.

જો સામાન્ય routingમાં eligible managed candidates હોય, પરંતુ દરેક free candidate foreign active lease દ્વારા વ્યસ્ત હોય, તો OmniRoute HTTP `429`, lease-capacity-unavailable code, waiting-for-capacity state અને સૌથી વહેલી સંબંધિત expiry પરથી મેળવેલ મર્યાદિત `Retry-After` પરત કરે છે.
સામાન્ય empty eligibility lease contention નથી અને તેના હાલના routing error semantics જાળવી રાખે છે.

સંબંધિત mechanisms અલગ રહે છે:

- OAuth session occupancy OAuth accounts માટે process-local soft distribution છે.
- Account semaphores request-concurrency permits આપે છે અને request પૂર્ણ થાય ત્યારે સમાપ્ત થાય છે.
- Exclusive managed session leases generation fence સાથે durable lifecycle ownership છે.

## 3. મોડેલ લોકઆઉટ

**સ્કોપ:** પ્રોવાઇડર + કનેક્શન + મોડેલ ટ્રિપલ.

**સ્થિતિ મુજબ કીનો સ્કોપ:** નિષ્ફળ થતી સ્થિતિ નક્કી કરે છે કે લોકઆઉટ કઈ કી પર લખાય છે
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ક્વોટા અથવા હકદારીનો સંકેત — **ક્વોટા ફેમિલી**ને લોક કરો:
  codex માટે સંપૂર્ણ `codex` / `spark` સ્કોપ (કનેક્શનના દરેક `gpt-5*` મોડેલ માટે), અન્ય
  પ્રોવાઇડર્સ માટે `getQuotaScopedModelForProvider()`.
- `404` બેર મોડેલને લોક કરે છે (`getModelLockKey()` `not_found`ને સંકુચિત કરે છે).
- અન્ય કોઈપણ સ્થિતિ — `5xx` ટ્રાન્સપોર્ટ/સર્વર નિષ્ફળતાઓ અને ગુણવત્તા માન્યતા દ્વારા
  OmniRoute દ્વારા બનાવાયેલ `502` — માત્ર ચોક્કસ provider/connection/model ટ્યુપલને જ
  લોક કરે છે. એક મોડેલ પરનો ખરાબ સ્ટ્રીમ એકાઉન્ટના ક્વોટા વિશેનો પુરાવો નથી; આ નિયમ પહેલાં
  `codex/gpt-5.6-luna` પરનો એક ખાલી પ્રતિભાવ 2–30 મિનિટ માટે (વધુ ગંભીર બનતા) તે
  કનેક્શનના દરેક `gpt-5*` મોડેલને રૂટીંગમાંથી દૂર કરતો હતો, જ્યારે તેનો ક્વોટા અસ્પર્શિત
  રહેતો હતો.
- કૉલરનો સ્પષ્ટ `scope` વિકલ્પ હંમેશાં પ્રાધાન્ય મેળવે છે (Antigravity `"exact"` પસાર કરે છે).

**હેતુ:** જ્યારે માત્ર એક મોડેલ ઉપલબ્ધ ન હોય અથવા ક્વોટા-મર્યાદિત હોય ત્યારે આખા કનેક્શનને
નિષ્ક્રિય થવાથી અટકાવવું.

**ઉદાહરણો:**

- `429` પરત કરતા પ્રતિ-મોડેલ ક્વોટા પ્રોવાઇડર્સ
- એક ગુમ થયેલા મોડેલ માટે `404` પરત કરતા સ્થાનિક પ્રોવાઇડર્સ
- પ્રોવાઇડર-વિશિષ્ટ મોડ/મોડેલ પરવાનગી નિષ્ફળતાઓ (દા.ત., Grok મોડ્સ)

**અમલીકરણ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### મોડેલ કૂલડાઉન ડેશબોર્ડ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

સક્રિય લોકઆઉટ્સની યાદી દર્શાવે છે: પ્રોવાઇડર, કનેક્શન, મોડેલ, કારણ, expiresAt. ઑપરેટર્સ
કાર્ડમાંથી કોઈ મોડેલને મેન્યુઅલી ફરી સક્ષમ કરી શકે છે.

**REST API:**

- `GET /api/resilience/model-cooldowns` — સક્રિય લોકઆઉટ્સની યાદી
- `DELETE /api/resilience/model-cooldowns` — મેન્યુઅલ પુનઃસક્ષમકરણ. બોડી:
  `{provider, connection, model}`. Auth: management.

### કૂલડાઉન મેનેજર

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

ટ્રાન્સિયન્ટ કારણસર રૂટીંગમાંથી બહાર હોય તેવા દરેક કનેક્શન માટે એક પેજ, દરેક પ્રોવાઇડર
પેજ ખોલવાની જરૂરિયાતને બદલે. તે કનેક્શન કૂલડાઉન્સ, મોડેલ લોકઆઉટ્સ અને ટર્મિનલ
સ્થિતિઓની યાદી દર્શાવે છે, તેમને પ્રતિ કનેક્શન, પસંદગી માટે અથવા કોઈ પ્રોવાઇડરના તમામ
કનેક્શન્સ માટે સાફ કરે છે, અને સૌથી વધુ ટ્યુન કરાયેલા કૂલડાઉન નિયમોમાં ફેરફાર કરે છે:
`streamStallCooldown.enabled` અને OAuth / API-key `connectionCooldown` બેઝ કૂલડાઉન તથા
મહત્તમ બૅકઓફ સ્ટેપ્સ (`PATCH /api/resilience` દ્વારા સાચવાય છે). ટર્મિનલ સ્થિતિઓ
(`banned`, `expired`, `credits_exhausted`)ની યાદી દર્શાવવામાં આવે છે, પરંતુ અહીં ક્યારેય
સાફ કરવામાં આવતી નથી.

એ જ પેજ પરનું **Error cooldown rules** કાર્ડ ઑપરેટર ભૂલ નિયમો
(`settings.providerErrorRules`) અને પ્રતિ-પ્રોવાઇડર કૅચ-ઑલ ડિફૉલ્ટ્સ
(`settings.providerErrorDefaults`)માં `PATCH /api/settings` દ્વારા ફેરફાર કરે છે — તે
કેવી રીતે મેળ ખાય છે તે માટે §7 હેઠળના "Operator-declared
rules" જુઓ. અવધિઓ Default (કોઈ સ્પષ્ટ કૂલડાઉન નહીં), 30 min,
1 h, 5 h, 24 h અથવા 1 થી 43,200 મિનિટ (30 દિવસ)નું કસ્ટમ મૂલ્ય હોઈ શકે છે.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — સ્થિતિ, બાકી કૂલડાઉન,
  બૅકઓફ લેવલ, છેલ્લો ભૂલ પ્રકાર અને મોડેલ લોકઆઉટ્સ ધરાવતા કનેક્શન્સ (કોઈ ક્રેડેન્શિયલ્સ નહીં)
- `POST /api/resilience/cooldowns` — બોડી `{connectionIds: string[]}` અથવા
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` પરત કરે છે

### લોકઆઉટ સેટિંગ્સ UI + સફળતા-ક્ષય પુનઃપ્રાપ્તિ (v3.8.23)

મોડેલ લોકઆઉટ હંમેશાં સક્રિય હાર્ડકોડેડ વર્તનમાંથી પોતાના સેટિંગ્સ કાર્ડ અને
સ્વ-સુધારણા પુનઃપ્રાપ્તિ માર્ગ ધરાવતી સંપૂર્ણપણે ગોઠવી શકાય તેવી, opt-in સુવિધામાં
રૂપાંતરિત થયું છે.

**સેટિંગ્સ કાર્ડ:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
આ ઉપરના read-only `ModelCooldownsCard`થી **અલગ** છે (જે માત્ર સક્રિય લોકઆઉટ્સની
_યાદી_ દર્શાવે છે) — નવું કાર્ડ _પેરામીટર્સ ગોઠવે છે_. ડિફૉલ્ટ્સ
`DEFAULT_MODEL_LOCKOUT_SETTINGS` (`src/lib/resilience/modelLockoutSettings.ts`)માં રહે છે:

| સેટિંગ                  | ડિફૉલ્ટ                          | અર્થ                                                         |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | મુખ્ય ટૉગલ — મોડેલ લોકઆઉટ **ડિફૉલ્ટ રૂપે બંધ** છે.           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | અપસ્ટ્રીમ સ્થિતિઓ જે મોડેલ-સ્કોપવાળી નિષ્ફળતા તરીકે ગણાય છે. |
| `baseCooldownMs`        | `120_000` (120 s)                | પ્રથમ નિષ્ફળતા માટેનો પ્રારંભિક લોકઆઉટ સમયગાળો.              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | વધારેલા કૂલડાઉન પરની મર્યાદા.                                |
| `maxBackoffSteps`       | `10`                             | ઘાતાંકીય-બૅકઓફ વધારા માટેનાં મહત્તમ સ્ટેપ્સ.                 |
| `useExponentialBackoff` | `true`                           | વારંવાર થતી નિષ્ફળતાઓ કૂલડાઉનને ઘાતાંકીય રીતે વધારે કે નહીં. |

સેટિંગ્સ સામાન્ય સેટિંગ્સ સ્ટોર દ્વારા સ્થાયી રહે છે અને resilience settings schema
દ્વારા માન્ય કરવામાં આવે છે; કાર્ડ `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` સાથે) અને `maxBackoffSteps`ની મર્યાદા ગોઠવે છે.

**સફળતા-ક્ષય પુનઃપ્રાપ્તિ:** પુનઃપ્રાપ્તિ માત્ર ટાઇમર સમાપ્ત થવા પર આધારિત નથી. સ્વસ્થ
પ્રતિભાવ મોડેલની નિષ્ફળતા ગણતરીને ધીમે ધીમે ઘટાડે છે, જેથી સમયવિન્ડો દરમિયાન પુનઃપ્રાપ્ત
થયેલું મોડેલ વધુ વધારો કરવાનું બંધ કરે (અને સાફ થઈ જાય) — ટાઇમર પૂરું થાય તે પહેલાં.
સફળ combo target પર, `open-sse/services/combo.ts`
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`)ને કૉલ કરે છે, જે
સંગ્રહિત `failureCount`ને અડધું કરે છે (`Math.floor(failureCount / 2)`); જ્યારે તે `0`
પર પહોંચે છે ત્યારે લોકઆઉટ એન્ટ્રી સંપૂર્ણપણે કાઢી નાખવામાં આવે છે. તેનો પ્રતિરૂપ
`recordModelLockoutFailure()` escalation windowની અંદર થતી નિષ્ફળતાઓ પર ગણતરી વધારે છે
(અને કૂલડાઉન વધારે છે). આ સફળતા-ક્ષય સામાન્ય ટાઇમર સમાપ્તિ ઉપરાંત છે —
કોઈપણ માર્ગ મોડેલને ફરી સક્ષમ કરી શકે છે.

**સ્થિતિ:** લૉકઆઉટ્સ `ModelLockoutEntry` ની `provider:connectionId:model` કી ધરાવતી પ્રતિ-પ્રક્રિયા `Map`sમાં
**મેમરીમાં** રાખવામાં આવે છે (ચોક્કસ-સ્કોપના લૉક્સ
`provider:connectionId:exact:model` દ્વારા), DBમાં સંગ્રહિત કરવામાં આવતા નથી
— પુનઃશરૂઆત પર તે ખોવાઈ જાય છે. _સેટિંગ્સ_ સંગ્રહિત કરવામાં આવે છે; સક્રિય
લૉકઆઉટ _સ્થિતિ_ અસ્થાયી છે.

---

## 4. ક્વોટા-શેર સમકાલીનતા નિયંત્રણ (v3.8.36)

સબ્સ્ક્રિપ્શન એકાઉન્ટ્સ (GLM, MiniMax વગેરે) ઘણી વાર માત્ર ~1–3 સમકાલીન
વિનંતીઓ સ્વીકારે છે; મર્યાદા વટાવવાથી 429s અને કૂલડાઉન ટ્રિગર થાય છે. આ સમસ્યા
**ક્વોટા-શેર** (`qtSd/…`) કોમ્બોમાં વધુ ગંભીર બને છે, જ્યાં અનેક API કી એક જ
અપસ્ટ્રીમ એકાઉન્ટ શેર કરે છે. શેર કરેલા એકાઉન્ટ પર વધુ ભાર ન પડે તે માટે ત્રણ
સ્તરો કાર્ય કરે છે.

### પ્રતિ-કનેક્શન સમકાલીનતા મર્યાદા (`max_concurrent`)

દરેક પ્રોવાઇડર કનેક્શન `max_concurrent` મર્યાદા જાહેર કરી શકે છે
(`provider_connections.max_concurrent`, જે કનેક્શન મોડલ / API / DB માં સેટ થાય છે).
કોઈ મર્યાદા ન રાખવી હોય તો તેને ખાલી રાખો. આ નીચેના સીરિયલાઇઝેશન સ્તરને
નિયંત્રિત કરતી એકમાત્ર સેટિંગ છે — તેને એકાઉન્ટની વાસ્તવિક સમકાલીનતા પ્રમાણે સેટ
કરો (દા.ત. GLM ~1, MiniMax ~2).

### પ્રતિ-મોડલ સમકાલીનતા મર્યાદાઓ (`modelConcurrency`)

કનેક્શન તેના `rateLimitOverrides` મેપમાં ચોક્કસ પ્રતિ-મોડલ સમકાલીનતા મર્યાદાઓ
પણ જાહેર કરી શકે છે:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

તેને કનેક્શન મોડલમાં (**Rate limit overrides → Per-model
concurrency caps**, દરેક લાઇનમાં એક `model=cap`) અથવા સમાન JSON આકાર સાથે
`PATCH /api/providers/[id]` મારફતે સેટ કરો. મુખ્ય અર્થઘટન:

- **કનેક્શન-વ્યાપી વિરુદ્ધ મોડલ-વિશિષ્ટ:** `maxConcurrent` શેર કરાતી
  કનેક્શન-વ્યાપી મર્યાદા તરીકે જ રહે છે. બંને લાગુ પડે ત્યારે, બંને ગેટ એક જ
  સંયુક્ત ગેટમાં પરમાણુ રીતે પ્રાપ્ત થાય છે
  (`global → provider → account → model`); લાગુ પડતી મર્યાદાઓમાંથી વધુ કડક
  મર્યાદા પ્રમાણે વાસ્તવિક વર્તન થાય છે.
- **ચોક્કસ મોડલ-કી મેળ:** કી એ રૂટીંગનું નિરાકરણ થયા પછી એક્ઝિક્યુટરને
  પસાર થતી મોડલ સ્ટ્રિંગ છે — સામાન્ય રીતે નગ્ન અપસ્ટ્રીમ મોડલ ID
  (`glm-5`), ક્લાયન્ટ-સાઇડ `provider/model` ઉપનામ
  (`zai/glm-5` એ `glm-5` સાથે મેળ ખાતું નથી) નહીં. મૂલ્યો સકારાત્મક પૂર્ણાંક
  સમકાલીન-વિનંતી મર્યાદાઓ હોવા જોઈએ.
- **સ્થાનિક કતારબદ્ધતા, કોઈ શોધ નહીં:** વધારાની વિનંતીઓ હાલના
  કતાર/ટાઇમઆઉટ અર્થઘટન સાથે સ્થાનિક રીતે કતારમાં રહે છે (ટાઇપ કરેલી
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` પ્રવેશ-ભૂલ). OmniRoute
  અપસ્ટ્રીમ નીતિ શોધતું કે અનુમાનતું નથી — તે ઑપરેટરે ગોઠવેલી ચોક્કસ
  મર્યાદાઓ જ લાગુ કરે છે. સંતૃપ્ત મોડલ ગેટ ક્યારેય પ્રોવાઇડરને અક્ષમ કરતું નથી
  અને કાયમી મોડલ લૉકઆઉટ બનાવતું નથી; અપસ્ટ્રીમ 429/કૂલડાઉન/ફૉलबૅક વર્તન
  ભૂલના બૅકસ્ટૉપ તરીકે યથાવત્ રહે છે.
- **પ્રતિ-કનેક્શન, પ્રતિ-પ્રોસેસ વ્યાપ:** મર્યાદાઓ દરેક ડેટાબેઝ કનેક્શન માટે
  હોય છે અને મેમરીમાં જાળવાય છે, તેથી સમાન અપસ્ટ્રીમ API કીનો પુનઃઉપયોગ કરતા
  બે કનેક્શન એકબીજા સાથે સંકલન કરતા નથી.
- **ગોઠવાયેલું ન હોય એટલે યથાવત્:** મેપ છોડી દેવાથી (અથવા ડેશબોર્ડ ફીલ્ડ
  ખાલી રાખવાથી) કોઈ મોડલ ગેટ ઉમેરાતો નથી. કોઈ સાર્વત્રિક પ્રોવાઇડર મર્યાદા
  નિર્ધારિત કર્યા વિના ઉદાહરણ ગોઠવણી:

```text
glm-5=1
glm-4.7=3
```

### ક્વોટા-શેર વિનંતી સીરિયલાઇઝેશન

જ્યારે ક્વોટા-શેર ડિસ્પેચ એવા કનેક્શનને લક્ષ્ય બનાવે છે જે સકારાત્મક
`max_concurrent` જાહેર કરે છે, ત્યારે તે **એકાઉન્ટ** માટેની સમકાલીન વિનંતીઓ
પ્રતિ-કનેક્શન સેમાફોર મારફતે સીરિયલાઇઝ થાય છે (કી
`qsconn:<connectionId>`): વધારાની વિનંતીઓ એકાઉન્ટ પર ભાર મૂકવાને બદલે
**કતારમાં રાહ જુએ છે**. તે **ફેઇલ-ઓપન** છે — સંતૃપ્ત કતાર અથવા ટાઇમઆઉટ
સ્લોટ વિના આગળ વધે છે, પરંતુ ડિસ્પેચ કરી શકાય તેવી વિનંતીને ક્યારેય નકારે
નહીં. તેને **Settings → Resilience → Quota-share per-connection
concurrency** માં ટૉગલ કરો
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ડિફૉલ્ટ ચાલુ).
`max_concurrent` મર્યાદા વિના વર્તન યથાવત્ રહે છે.

> ક્વોટા-શેર રૂટીંગ ગેટ (`selectQuotaShareTarget`, DRR + P2C) પોતે
> ફેઇલ-ઓપન છે અને મર્યાદા પર પહોંચેલા કનેક્શનને માત્ર _ઓછી પ્રાથમિકતા_ આપે છે —
> એક જ કનેક્શનવાળા પૂલમાં તે કઠોર મર્યાદા લાદી શકતું નથી, તેથી વાસ્તવમાં ભારને
> નિયંત્રિત કરતું તત્વ આ સેમાફોર છે.

### કોમ્બો કૂલડાઉન-જાગૃત પુનઃપ્રયાસ

દરેક કોમ્બો વ્યૂહરચના માટે (જ્યારે સક્ષમ હોય), ટૂંકા સમયના કૂલડાઉન માટે 429
ઉત્પન્ન થવાની શક્યતા હોય તેવી વિનંતી તેની રાહ જુએ છે અને 429 પરત કરવાને બદલે
ફરી ડિસ્પેચ થાય છે — આ Gemini-ક્લાસ TPM/RPM વિન્ડોઝ (~60s retry-after) ને
મલ્ટિ-મોડલ કોમ્બો પર આવરી લે છે, જેમ કે 2-મોડલ કોમ્બોના બંને લક્ષ્યો પ્રતિ-મોડલ
રેટ મર્યાદા વટાવે ત્યારે. આ મર્યાદા **Settings → Resilience** માં
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) દ્વારા
નક્કી થાય છે. તે ક્યારેય `quota_exhausted` (મધરાત સુધી લૉક) અથવા
ઑથ/નૉટ-ફાઉન્ડ કારણો માટે રાહ જોતું નથી.

કોમ્બો `config.comboCooldownWaitEnabled: false` વડે આમાંથી બહાર નીકળી શકે છે.
માત્ર લિટરલ `false` જ આ શેર કરેલી કોમ્બો રાહોને અક્ષમ કરે છે
(ડિસ્પેચ પછીનું કૂલડાઉન અને ડિસ્પેચ પહેલાંના સર્કિટ-ઓપન/મોડલ-લૉક વેઇટ્સ)
અને તેમના વેઇટ-બજેટ ટાઇમઆઉટ-ફ્લોર વિસ્તરણને પણ અક્ષમ કરે છે.
ગેરહાજર અથવા `true` વૈશ્વિક નીતિ જાળવી રાખે છે; વૈશ્વિક રીતે રાહ જોવાનું અક્ષમ
હોય તો `true` તેને સક્ષમ કરી શકતું નથી. સ્પષ્ટ `targetTimeoutMs` હજુ પણ
પ્રાધાન્ય ધરાવે છે. આ ઑપ્ટ-આઉટ અલગ મૂળ Codex ટર્ન-પિન ડિસ્પેચ-પૂર્વ રાહને
બદલતું નથી.

આ જ ગેટ ડિસ્પેચ-પૂર્વ સ્થિતિ (#16319) ને પણ આવરી લે છે: જ્યારે કોમ્બોના દરેક
લક્ષ્યને કોઈ પ્રયાસ થાય તે પહેલાં ટૂંકા સમયના ટ્રાન્ઝિયન્ટ લૉકઆઉટને કારણે
સ્કિપ કરવામાં આવે છે, ત્યારે શૂન્ય-પ્રયાસ માર્ગ સમાન મર્યાદાઓ હેઠળ લૉકઆઉટ
પૂરું થવાની રાહ જુએ છે અને ફરી ડિસ્પેચ કરે છે, તેના બદલે સંકેત વિનાનો
`503 ALL_TARGETS_SKIPPED` જવાબ આપતો નથી. જ્યારે કોઈ રાહ માન્ય ન હોય (મર્યાદા,
પ્રયાસ અથવા બજેટ પૂર્ણ થઈ ગયેલ હોય, અથવા ફીચર બંધ હોય), ત્યારે અંતિમ પ્રતિસાદ
`429 rate_limit_error` માં અપગ્રેડ થાય છે અને સૌથી વહેલી ટ્રાન્ઝિયન્ટ લૉક
સમાપ્તિમાંથી `retry_after` / `reset_at` ધરાવે છે; ક્વોટા, ઑથ અને નૉટ-ફાઉન્ડ
લૉક્સ સંકેત વિનાનો 503 જ રાખે છે.

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

## 5. રિક્વેસ્ટ ક્યૂ એડમિશન કંટ્રોલ (v3.8.49 · issue #6593)

**દાયરો**: સ્થાનિક પ્રતિ-પ્રોવાઇડર+કનેક્શન રેટ-લિમિટ ક્યૂ (`open-sse/services/rateLimitManager.ts`, Bottleneck દ્વારા સમર્થિત), ઉપરની ત્રણ મિકેનિઝમ્સ કરતાં એક સ્તર નીચે.

**`maxWaitMs` ક્યૂ રાહને મર્યાદિત કરે છે; `executionMaxWaitMs` એક્ઝિક્યુશનને મર્યાદિત કરે છે.**
બંને જાણીજોઈને અલગ રાખવામાં આવ્યા છે, અને બંને પૈકી કોઈ એક બીજાને ફીડ કરતું નથી.

`resilienceSettings.requestQueue.maxWaitMs` એ **ક્યૂ-વેઇટ બજેટ** છે: તે પ્રોવાઇડર સ્લોટની રાહ જોવી અને પછી QUEUED માં બેઠા રહેવાને આવરી લે છે, અને જે ક્ષણે જોબ QUEUED માંથી બહાર નીકળીને એક્ઝિક્યુટ થવાનું શરૂ કરે છે તે ક્ષણે તેનો ટાઇમર ક્લિયર થઈ જાય છે (`rateLimitManager.ts`, `wrappedFn`). તેને ઓળંગી જનારી રિક્વેસ્ટ ક્યારેય અપસ્ટ્રીમ સુધી પહોંચતી નથી. ડિફોલ્ટ 30000ms, જે `src/lib/resilience/settings.ts` માં `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` દ્વારા આપવામાં આવે છે અને `tests/unit/ratelimit-admission-control-6593.test.ts` દ્વારા પિન કરવામાં આવે છે, જેથી તેમાં ફેરફાર કરવાથી આ પરિચ્છેદ શાંતિથી જૂનો થઈ જવાને બદલે તે ટેસ્ટ લાલ થઈ જાય છે.

`resilienceSettings.requestQueue.executionMaxWaitMs` એ જ છે જે Bottleneck ને જોબ `expiration` તરીકે મળે છે, જેનો ટાઇમર ફક્ત ડિસ્પેચ પછી જ શરૂ થાય છે. તે પોતાનો અપસ્ટ્રીમ ટાઇમઆઉટ ન ધરાવતા એક્ઝિક્યુટરો માટે બેકસ્ટોપ છે, અને જ્યારે એક્ઝિક્યુટરનો પોતાનો fetch-start ટાઇમઆઉટ લાંબો હોય ત્યારે તેને તે સુધી વધારવામાં આવે છે, જેથી તે સ્વસ્થ ઇન-ફ્લાઇટ રિસ્પોન્સને કાપી ન શકે. ડિફોલ્ટ 600000ms (10 મિનિટ).

ક્યૂ બજેટને `expiration` માં ફીડ કરવું એ જ હતું જે પહેલાં નોન-ઇન્ક્રિમેન્ટલ ગેટવેને મિડ-ફ્લાઇટ મારી નાખતું હતું — તેઓ પ્રથમ બાઇટ્સ પહેલાં કાયદેસર રીતે મિનિટો સુધી ચાલે છે — અને એટલે જ એક્સપાયરેશન `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) તરીકે દેખાય છે જ્યારે ક્યૂ બજેટ ક્યૂ-ટાઇમઆઉટ કોડ ધરાવે છે. બંને પૈકી કોઈપણને `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) અથવા ડેશબોર્ડ (**સેટિંગ્સ → રેઝિલિયન્સ**) દ્વારા ઓવરરાઇડ કરો. નોર્મલાઇઝ થતાં બંને 1ms–24h પર ક્લેમ્પ થાય છે.

**પ્રાધાન્યક્રમ, બંને માટે:** env var ફક્ત _ડિફોલ્ટ_ આપે છે. `resilienceSettings.requestQueue` માં સાચવેલું મૂલ્ય (ડેશબોર્ડ / API patch, `key_value` માં સંગ્રહિત) તેના કરતાં પ્રાથમિકતા ધરાવે છે, અને પ્રતિ-કનેક્શન `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` તેના કરતાં પ્રાથમિકતા ધરાવે છે. તેથી પહેલેથી જ સાચવેલું મૂલ્ય ધરાવતા ડિપ્લોયમેન્ટ પર env var સેટ કરવાથી કંઈ બદલાતું નથી — તેના બદલે સાચવેલી સેટિંગ ક્લિયર કરો અથવા અપડેટ કરો.

ક્યૂ રેઝિડન્સ `maxWaitMs` દ્વારા મર્યાદિત છે; નીચેનું `maxQueueDepth` એક સાથે કેટલા કૉલર ક્યૂમાં રહી શકે તે મર્યાદિત કરે છે.

**બોડી-સ્ટેટેડ રીટ્રાય: પેસિંગ વિરુદ્ધ લૉકઆઉટ.** 429 બોડી પોતાની રાહ જાહેર કરી શકે છે (Gemini `RetryInfo.retryDelay`, "retry after Ns" ટેક્સ્ટ), જે `updateFromResponseBody` વાંચે છે. કનેક્શનના `maxWaitMs` માં સમાતી રાહ એ પેસિંગ છે: લિમિટર એટલા સમય સુધી પોતાનો રિઝર્વોયર ખાલી કરે છે અને તે ફરી ભરાય ત્યારે ક્યૂમાં રહેલા કૉલ ડિસ્પેચ થાય છે. `maxWaitMs` કરતાં લાંબી રાહ એવી વસ્તુ નથી જેને ક્યૂ બેસીને પસાર કરી શકે — Gemini ખતમ થયેલા દૈનિક ક્વોટાનો જવાબ `retryDelay: "86399s"` થી આપે છે. રીબિલ્ટ થયેલા 429 (#16528) પર રિલે થયેલો `Retry-After` પહેલેથી જ ફોલબેક એન્જિનને તે વિન્ડો માટે મોડલ લૉક કરાવે છે, પરંતુ તેના માટે લિમિટરને પણ પોઝ કરવું એ કી પર વહેલી પહોંચી જતી કોઈપણ કૉલને (દા.ત. રેઝિલિયન્સ રીસેટ પછી) આખા `maxWaitMs` માટે સ્થગિત કરી દેશે. જ્યારે આવી રાહ ટાઇપ્ડ Google `RetryInfo` ડિટેઇલમાંથી આવે છે (`google_rpc_retry_info` પ્રોવેનન્સ) અને કીનો લિમિટર પહેલેથી જ મોડલ પર સ્કોપ થયેલો હોય (જુઓ `getLimiterKey`), ત્યારે 429 તે કનેક્શન પર મોડલ લૉકઆઉટ બની જાય છે (`open-sse/services/rateLimitManager/bodyRetryPause.ts` માં `lockModelForLongBodyRetry`, 24h પર કેપ), અને લિમિટરને પોઝ કર્યા વિના છોડી દેવામાં આવે છે. એકાઉન્ટ સિલેક્શન તે લૉક પર `isModelLocked()` દ્વારા સ્કિપ થાય છે, અને કનેક્શન પર પિન થયેલા ટાર્ગેટ્સ માટે કોમ્બો પ્રી-ડિસ્પેચ ગેટ પણ એ જ કરે છે. antigravity પર, જેનો લિમિટર પ્રતિ ક્વોટા ફેમિલી છે, લૉક ચોક્કસ મોડલ પર હોય છે, જેમ કે તેના અન્ય ક્વોટા લૉક. જ્યારે એલિયસ ક્લાયન્ટે માંગેલા નામને તે મોડલ પર રિઝોલ્વ કરે ત્યારે માંગેલું નામ પણ લૉક થાય છે, કારણ કે તે તપાસો માંગેલા નામનો ઉપયોગ કરે છે; તે ચોક્કસ રીતે લૉક થાય છે (`lockExactModel`), જેથી antigravity ક્વોટા ફેમિલી અથવા codex સ્કોપ ઓળંગતી એલિયસ ક્યારેય પોતાના નામને લૉક કરતી નથી. પ્રોઝ હિન્ટ, અનટાઇપ્ડ `retryDelay`, અથવા આખા કનેક્શન દ્વારા શેર થયેલો લિમિટર પોઝ જાળવી રાખે છે. જ્યારે 429 પાથે હમણાં જ રીબિલ્ટ કરેલો લિમિટર પોઝ થાય છે, ત્યારે જે કૉલરનો બાકીનો ક્યૂ સમય પોઝ પૂરો થવા પહેલાં જ પૂરો થઈ જાય છે તેને તે સમય પૂરો થવાની રાહ જોવાને બદલે તરત જ ક્યૂ-ટાઇમઆઉટ કોડ સાથે પાછો ફેરવવામાં આવે છે (`checkLimiterPause`); રેકોર્ડ થયેલો અંત લિમિટર બનતાં પહેલાં એન્કર થયેલો હોય છે, જ્યાં Bottleneck પોતાની રિફ્રેશ ક્લૉક શરૂ કરે છે, અને રિઝર્વોયરમાં પછી થયેલો કોઈપણ ફેરફાર તેને ભૂલી જાય છે. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` અને `tests/unit/rate-limit-body-retry-pause.test.ts` દ્વારા આવરી લેવામાં આવ્યું છે.

**`maxQueueDepth` — ઓપ્ટ-ઇન એડમિશન કેપ (નવું).** `resilienceSettings.requestQueue.maxQueueDepth` એક પ્રોવાઇડર+કનેક્શન માટે એક સાથે કેટલી રિક્વેસ્ટ ક્યૂમાં બેસી શકે (હજુ ડિસ્પેચ થઈ નથી) તે મર્યાદિત કરે છે. જ્યારે ક્યૂ પહેલેથી જ `maxQueueDepth` રિક્વેસ્ટ ધરાવે છે, ત્યારે નવી રિક્વેસ્ટ `limiter.schedule()` સુધી પહોંચે **તે પહેલાં** જ ટાઇપ્ડ `code: "RATE_LIMIT_QUEUE_FULL"` એરર સાથે ફાસ્ટ-રિજેક્ટ થાય છે — જેથી રિજેક્શન સસ્તું હોય છે અને તે રિક્વેસ્ટ માટેના કોઈપણ ડાઉનસ્ટ્રીમ પ્રોમ્પ્ટ-કમ્પ્રેશન / ટ્રાન્સલેશન કાર્ય કરતાં પહેલાં થાય છે. ડિફોલ્ટ `0` = ડિસેબલ્ડ, જે હાલના અનબાઉન્ડેડ-ક્યૂ વર્તનને જાળવી રાખે છે; બાઉન્ડ 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) અથવા `resilienceSettings.requestQueue.maxQueueDepth` (ડેશબોર્ડ/API patch) દ્વારા ઓવરરાઇડ કરો.

એડમિશન તપાસ પોતે એક પ્યોર ફંક્શન છે (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) જેથી તે વાસ્તવિક Bottleneck લિમિટર વિના યુનિટ-ટેસ્ટ કરી શકાય છે.

> જે RFC એ #6593 ખોલ્યું તેમાં `bypassCompressionOnRateLimit` ફ્લેગ પણ પ્રસ્તાવિત કરવામાં આવ્યો હતો. આ રેપોની `open-sse/services/compression/` પાઇપલાઇન એ આઉટબાઉન્ડ LLM રિક્વેસ્ટ પરનું prompt/context કમ્પ્રેશન છે (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy` બ્લોકની આસપાસ), સંશ્લેષિત 429 બોડી પરનું HTTP રિસ્પોન્સ કમ્પ્રેશન નહીં — શાબ્દિક બાયપાસ ફ્લેગ માટે કોઈ મેળ ખાતો કોડ પાથ નથી. એ prompt-compression સ્ટેપ હાલમાં રિક્વેસ્ટ પાઇપલાઇનમાં `withRateLimit()` પહેલાં _ચાલે છે_, તેથી કતાર ભરાયેલી હોવાના રિજેક્શન પર તેને છોડી દેવા માટે ફરીથી ક્રમ ગોઠવવો એ આ ઇશ્યુના સ્કોપ કરતાં અલગ, મોટો ફેરફાર છે; તેને અહીં જાણી જોઈને **લાગુ કરવામાં આવ્યો નથી** અને જો CPU-બચતનો ફાયદો ફરીથી ક્રમ ગોઠવવાના જોખમને લાયક હોય તો ફોલો-અપ તરીકે છોડી દેવામાં આવ્યો છે.

### રેટ-લિમિટ ઓટો-એનેબલ સેફ્ટી નેટ અને કનેક્શન પ્રોટેક્શન (`rateLimitProtection`)

**ઓટો-એનેબલ સેફ્ટી નેટ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ડિફોલ્ટ `true`):
ડિફોલ્ટ રીતે, OmniRoute બધા સક્રિય API-key પ્રોવાઇડર કનેક્શન્સ (`getProviderCategory(provider) === "apikey"`) માટે રેટ-લિમિટ કતાર પ્રોટેક્શન આપોઆપ ચાલુ કરે છે. આ સુનિશ્ચિત કરે છે કે રેટ-સંવેદનશીલ અપસ્ટ્રીમ API કી માટેની આવતી રિક્વેસ્ટ્સ Bottleneck દ્વારા કતારમાં ગોઠવાય અને થ્રોટલ થાય, અપસ્ટ્રીમ 429 એરરમાં ધસી જવાને બદલે. સેફ્ટી નેટને `RATE_LIMIT_AUTO_ENABLE` એન્વાયર્નમેન્ટ વેરિયેબલ દ્વારા ઓવરરાઇડ કરી શકાય છે (`false`/`0`/`off` નિષ્ક્રિય કરે છે, `true`/`1`/`on` જબરદસ્તી ચાલુ કરે છે), જે સંગ્રહિત ડેશબોર્ડ સેટિંગ (**Settings → Resilience** / `PATCH /api/resilience`) પર પ્રાધાન્ય ધરાવે છે.

**પ્રતિ-કનેક્શન `rateLimitProtection` નો અર્થ:**
પ્રતિ-કનેક્શન રેટ-લિમિટ પ્રોટેક્શન પ્રોવાઇડર કનેક્શન્સ પરના `rateLimitProtection` બુલિયન ફીલ્ડ દ્વારા ટ્રેક થાય છે (SQLite માં `rate_limit_protection` તરીકે સંગ્રહિત):

- **સ્પષ્ટ ચાલુ (`rateLimitProtection === true`)**: આ કનેક્શન માટે રેટ-લિમિટ પ્રોટેક્શન સ્પષ્ટ રીતે ચાલુ છે, પ્રોવાઇડર કેટેગરી અથવા ઓટો-એનેબલ સેફ્ટી નેટ ચાલુ છે કે નહીં તે ધ્યાનમાં લીધા વિના.
- **સ્પષ્ટ બંધ (`rateLimitProtection === false`)**: સ્પષ્ટ પ્રોટેક્શન નિષ્ક્રિય કરે છે, પરંતુ સક્રિય API-key કનેક્શનને ગ્લોબલ ઓટો-એનેબલ સેફ્ટી નેટમાંથી બહાર **કાઢતું નથી**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) માં, `false` અને `undefined` સમાન છે: ફક્ત `rateLimitProtection === true` ને સ્પષ્ટ ઓવરરાઇડ તરીકે ગણવામાં આવે છે. જો `rateLimitProtection` `false` હોય (અથવા સેટ ન હોય), તો પણ સક્રિય API-key કનેક્શન ઓટો-એનેબલ શરત સાથે મેળ ખાય છે અને રેટ-લિમિટ સુરક્ષિત રહે છે.
- **પ્રતિ-કનેક્શન ઓપ્ટ-આઉટ નથી**: ઓપરેટર હાલમાં એ વ્યક્ત કરી શકતો નથી કે "આ એક સક્રિય API-key કનેક્શન રેટ-લિમિટ કતાર પ્રોટેક્શન વિના ચાલવું જોઈએ" જ્યારે અન્યો માટે ઓટો-એનેબલ સક્રિય રહે. API-key કનેક્શન્સને રેટ-લિમિટ કતાર વિના સંપૂર્ણપણે ચલાવવા માટે, સેફ્ટી નેટ ગ્લોબલી બંધ કરવી પડશે (`RATE_LIMIT_AUTO_ENABLE=false` અથવા `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**સમર્થિત રાઇટ પાથ:**

- **`POST /api/rate-limits`**: કનેક્શન માટે `rateLimitProtection` ટૉગલ કરવા માટેનો સમર્થિત મેનેજમેન્ટ રાઇટ પાથ (`{ connectionId: string, enabled: boolean }`). આને `enabled: true` સાથે કૉલ કરવાથી સ્પષ્ટ પ્રોટેક્શન ચાલુ થાય છે; આને `enabled: false` સાથે કૉલ કરવાથી સ્પષ્ટ પ્રોટેક્શન દૂર થાય છે (જોકે જો ઓટો-એનેબલ ચાલુ હોય તો સક્રિય API-key કનેક્શન્સ ગ્લોબલ સેફ્ટી નેટ હેઠળ આવરી લેવાયેલા રહે છે).
- **`PUT /api/providers/[id]`**: જાણી જોઈને `rateLimitProtection` સ્વીકારતું નથી કે તેને ફ્લિપ કરતું નથી (#11278). `PUT /api/providers/[id]` દ્વારા પ્રોવાઇડર કનેક્શન મેટાડેટા અપડેટ કરવાથી સંગ્રહિત રેટ-લિમિટ પ્રોટેક્શન સ્થિતિ ક્યારેય બદલાશે નહીં.

---

## 6. સ્લો-સ્ટ્રીમ થ્રુપુટ વોચડોગ (#9709)

વૈકલ્પિક `resilienceSettings.streamRecovery.throughputWatchdog` ગાર્ડ અપસ્ટ્રીમ શોધે છે જે હજી પણ હિસ્સા મોકલી રહ્યું છે પરંતુ રૂપરેખાંકિત ઉપયોગી-આઉટપુટ દરની નીચે સહાયક આઉટપુટ ઉત્પન્ન કરે છે. તે ઇરાદાપૂર્વક નિષ્ક્રિય સમયસમાપ્તિથી અલગ છે: હૃદયના ધબકારા અને મેટાડેટા ન તો ટાઈમર રીસેટ કરે છે અને પ્રગતિ તરીકે ગણતા નથી. તે સખત પ્રયાસની સમયમર્યાદા (#9153) થી પણ અલગ છે, જે આઉટપુટ ગુણવત્તાને ધ્યાનમાં લીધા વિના સંપૂર્ણ સલામતી ટોચમર્યાદા રહે છે.

વોચડોગને તે ગર્ભપાત કરી શકે તે પહેલાં સંપૂર્ણ રોલિંગ વિન્ડો દ્વારા અનુસરવામાં આવતા વોર્મ-અપ સમયગાળાની જરૂર છે. તે ચેટ કમ્પ્લીશન્સ અને રિસ્પોન્સ API આઉટપુટ ઈવેન્ટ્સ (એક રૂઢિચુસ્ત UTF-8 બાઈટ પ્રોક્સી) માંથી ટેક્સ્ટ ડેલ્ટાની ગણતરી કરે છે, માત્ર-ઉપયોગ અને ખાલી ઈવેન્ટ્સને અવગણે છે અને જ્યારે ટૂલ-કોલ અથવા રિઝનિંગ ઈવેન્ટ્સ ફ્લાઈટમાં હોય ત્યારે જજમેન્ટને સસ્પેન્ડ કરે છે. તે ડિફૉલ્ટ રૂપે અક્ષમ છે અને `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` સાથે સક્ષમ કરી શકાય છે (તે env મૂલ્ય ફક્ત ડિફોલ્ટ — સાચવેલ `resilienceSettings.streamRecovery.throughputWatchdog.enabled` બુલિયન જીતને સીડ કરે છે; આ માર્ગદર્શિકાની ટોચ પર env-vs-ડેશબોર્ડ અગ્રતા નોંધ જુઓ); વિન્ડો, વોર્મ-અપ, ન્યૂનતમ દર અને લઘુત્તમ માપી શકાય તેવું આઉટપુટ સામાન્ય સ્થિતિસ્થાપકતા-સેટિંગ્સ નોર્મલાઇઝેશન લેયર દ્વારા બંધાયેલ છે.

જ્યારે સક્ષમ હોય, ત્યારે વોચડોગ એબોર્ટ ફક્ત સક્રિય અપસ્ટ્રીમ પ્રયત્નો પર લાગુ થાય છે. કોઈપણ ક્લાયંટ-દૃશ્યમાન બાઈટ પહેલાં, હાલના સમાન-એકાઉન્ટ પ્રારંભિક-પુનઃપ્રાપ્તિ પાથ પ્રયાસને ફરીથી ખોલી શકે છે. કમિટ કર્યા પછી, સ્ટ્રીમ ક્યારેય આંધળી રીતે રિપ્લે કરવામાં આવતી નથી; માત્ર હાલના સલામત મધ્ય-પ્રવાહના ચાલુ કરારમાં જ પ્રત્યય જોડાઈ શકે છે. અંતિમીકરણ સિંગલ-શોટ રહે છે, તેથી વપરાશ એકાઉન્ટિંગ અને સેમાફોર રિલીઝ ડુપ્લિકેટ નથી.

---

## 7. અપસ્ટ્રીમ સ્થિતિનું પુનઃનિવેદન (ખોટી quota ભૂલો)

**ક્ષેત્ર:** એક અપસ્ટ્રીમ gateway, જે અસ્થાયી quota સમાપ્તિને ખોટી HTTP સ્થિતિ સાથે અહેવાલ કરે છે.

**હેતુ:** વર્ગીકરણ પહેલાં ગેરમાર્ગે દોરતી સ્થિતિ સુધારવી, જેથી downstream consumers (fallback engine, combo aggregation, client-facing response) નિષ્ફળતાની સાચી retryable પ્રકૃતિ જોઈ શકે.

કેટલાક gateways TEMPORARY quota exhaustion ને non-retryable HTTP
સ્થિતિ સાથે દર્શાવે છે. `agentrouter.org` પ્રમાણભૂત `429`ની જગ્યાએ ચીની body
(`用户额度不足` / `额度不足`) સાથે `403` (ક્યારેક `400`) પરત કરે છે. Claude
Code જેવા clients `403`ને કાયમી ગણીને session બંધ કરી દે છે, અને સુધારા વિના
fallback engine તેને quota eventને બદલે `AUTH_ERROR` તરીકે વર્ગીકૃત કરશે.

**અમલીકરણ:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — દરેક
  provider માટેના rulesની યાદી (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), જેને `applyStatusRestatement()` દ્વારા
  match કરવામાં આવે છે.
- Call site: `open-sse/handlers/chatCore.ts`ના
  `providerFailure:` blockમાં (લગભગ line 3654), `parseUpstreamError()` દ્વારા
  error HTTP status ધરાવતો upstream response (`!providerResponse.ok`) parse
  થયા પછી તરત જ, અને કોઈપણ classification ચાલે તે પહેલાં, જેથી દરેક downstream
  consumer સુધારેલી સ્થિતિ જોઈ શકે. `200` SSE streamની અંદર રહેલી errors એક
  અલગ, પછીની stream-parsing path અનુસરે છે અને આજે આ hookના **અંતર્ગત નથી** —
  આ જાણીતી મર્યાદા છે અને હજુ agentrouterના misstatus માટે જરૂરી નથી (જે error
  HTTP status તરીકે દેખાય છે).
- Retry eligibility: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`માં છે
  (`open-sse/services/combo/unavailableRetryGate.ts`), તેથી restated error dead
  `403` તરીકે દેખાવાની જગ્યાએ વાસ્તવિક retry window ધરાવે છે.
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) માત્ર
  restated response દ્વારા **client**ને જણાવાતી કિંમત છે; તે પોતે connectionની
  internal cooldown/lockout duration નથી — તે અલગથી તે restated errorને ખરેખર
  સંભાળતી mechanism દ્વારા નિયંત્રિત થાય છે (Connection Cooldownનું વધતું
  backoff, §2, API-key providers માટે base `3s`; અથવા Model Lockout, §3,
  agentrouter જેવા per-model-quota providers માટે). Router clientને જાહેર
  કરેલી 60s window કરતાં વહેલું આંતરિક રીતે retry માટે eligible બની શકે છે —
  આ ઇરાદાપૂર્વકનું headroom છે, bug નથી.

કાયમી errors (agentrouterની `无权访问模型` — આ modelની ઍક્સેસ નથી) ક્યારેય
restated કરવામાં આવતી નથી: `excludeMarkers` veto કરે છે, ભલે `textMarkers`
match થાય, તેથી error તેની મૂળ સ્થિતિ જાળવી રાખે છે અને તે ક્યારેય retry
કરાતી નથી. સંબંધિત provider classification rule
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, એક `6h` જાહેર કરાયેલો base cooldown)
ને generic apikey-category `FORBIDDEN` early-return પહેલાં
`checkFallbackError` (`open-sse/services/accountFallback.ts`) દ્વારા તપાસવામાં
આવે છે, અને તે `honorsRuleLockScope(provider)` (#10334 — હાલમાં
`providerErrorRules.ts`માં રહેલી `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist
દ્વારા માત્ર agentrouter માટે સક્રિય) પર આધારિત છે. Ruleનો જાહેર કરાયેલો 6h
cooldown `fallbackResult.baseCooldownMs` તરીકે આગળ વહે છે, પરંતુ તે હજુ પણ
પહેલેથી અસ્તિત્વમાં રહેલા per-model-quota lockout path
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`)માં જ જાય છે
(#10334 દ્વારા cooldown source સિવાય તેમાં કોઈ ફેરફાર થયો નથી): દરેક અન્ય
model lockoutની જેમ તેને operatorની `mlSettings.maxCooldownMs` (default
`1_800_000ms` / 30min) સુધી ઘટાડવામાં આવે છે, અને _persisted lockout reason_
પહેલેથી hardcoded `"forbidden"` જ રહે છે, ruleનું `"auth_error"` નહીં — સમગ્ર
પ્રવાહમાં માત્ર cooldown duration માન્ય રાખવામાં આવે છે, reason string નહીં.
Connection પોતે સક્રિય રહે છે; એ જ connection પરના sibling modelsને કોઈ અસર
થતી નથી.

Restated quota errors (`额度不足`) productionમાં provider rule સુધી પહોંચે છે
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, પોતાનો કોઈ જાહેર કરાયેલ cooldown નથી — persistence layerનું
scaled backoff default લાગુ પડે છે). #10334થી `ProviderErrorRuleMatch` પરનું
`scope` સમગ્ર પ્રવાહમાં ઉપયોગમાં લેવાય છે, પરંતુ **માત્ર**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistમાં રહેલા providers માટે
(`providerErrorRules.ts` — આજે માત્ર `"agentrouter"`, `honorsRuleLockScope()`
દ્વારા gated). અન્ય દરેક provider માટે `scope` informational જ રહે છે, #10334
પહેલાં જેવું જ. `checkFallbackError` matched ruleનું scope
`fallbackResult.ruleScope` તરીકે બહાર પાડે છે; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) એ shared guard છે, જે ખાતરી કરે છે કે
`ruleScope` connection-wide, self-recovering signal તરીકે ખરેખર સુરક્ષિત રીતે
માન્ય રાખી શકાય છે (scope `"connection"`, reason `quota_exhausted`, ક્યારેય
`permanent` નહીં, ક્યારેય `creditsExhausted` નહીં — ભવિષ્યમાં કોઈ rule
scope `"connection"`ને permanent account state સાથે જોડી દે તે સામેનું
રક્ષણ). બે consumers તેને call કરે છે:

- **પર્સિસ્ટન્સ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passth્રૂ-providerના **per-model** લોકઆઉટ
  branchમાં જવાને બદલે (agentrouter એ `passthroughModels: true` છે → `hasPerModelQuota()`
  `true` પરત કરે છે), તે **temporary connection cooldown** લાગુ કરે છે —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ક્યારેય terminal status
  (`credits_exhausted`/`banned`/`expired`) નહીં — જેથી cooldown સમાપ્ત થયા પછી
  connection આપમેળે ફરી કાર્યરત થાય, manual credential resetની જરૂર ન પડે.
  `disableCooling: true` ધરાવતા connections માટે આ અવગણવામાં આવે છે (#2997):
  આ opt-out તેના બદલે per-model lockoutમાં આગળ વધે છે (દસ્તાવેજીકૃત trade-off —
  branch ઉપરની code comment જુઓ).
- **એ જ requestનું combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): એ જ guard connectionને
  in-memory `exhaustedConnections` setમાં, `${provider}:${connectionId}` key હેઠળ,
  ચિહ્નિત કરે છે. આ માત્ર બાકી રહેલા SAME-REQUEST targetને જ skip કરે છે, જો
  તેના પોતાના target objectમાં _પોતે જ તે જ ચોક્કસ `connectionId` ધરાવતું હોય_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections` lookup પહેલાં
  `if (provider && connectionId)`) — એક સામાન્ય
  model-list comboમાં, જ્યાં sibling targets પોતાના કોઈ pinned `connectionId`
  ધરાવતા નથી અને દરેકને dispatch વખતે responseના
  `X-OmniRoute-Selected-Connection-Id` headerમાંથી જ resolve કરવામાં આવે છે,
  તે key match ક્યારેય થતો નથી. આ સામાન્ય કિસ્સામાં, બાકી રહેલો leg હમણાં જ
  exhausted થયેલા accountનો ફરી ઉપયોગ ન કરે તેની વાસ્તવિક સુરક્ષા આ Set નથી —
  તે ઉપરનું persistence layer છે (connectionનું `rateLimitedUntil` હવે ભવિષ્યમાં
  છે), અને આ જ guard failure માટે `transientRateLimitedProviders`ને suppress કરે છે
  ( "Two-stage design" અને `targetExhaustion.ts`માં
  `isAgentrouterConnectionQuotaScope` branch પરની code comment જુઓ): Setને
  ચિહ્નિત ન રાખવાથી, `combo.ts`નું `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) providerના બાકી રહેલા legs
  માટે સક્રિય થતું નથી, તેથી credential selectionનું `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) સામાન્ય રીતે માનવામાં આવે છે અને
  બાકી રહેલો leg અલગ, હજી eligible agentrouter connection પસંદ કરે છે અથવા
  no credentials available સાથે નિષ્ફળ જાય છે — આ branch દ્વારા હમણાં cooldown
  કરાયેલા connection પર પાછો જવા માટે તેને બળજબરી થતી નથી.

### બે-તબક્કાની રચના: status restatement, પછી classification

Status restatement (`upstreamStatusRestatement.ts`) અને provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) અલગ registries છે, જે બંને provider id અને text markers
પર આધારિત છે, પરંતુ અલગ સ્થળોએ ચાલે છે અને અલગ હેતુઓ સેવા આપે છે: restatement
`chatCore.ts`માં HTTP statusને વહેલી તકે ફરી લખે છે;
classification rules `checkFallbackError()`ની અંદર fallback `reason` પસંદ કરે છે
અને `scope` (`model` / `provider` / `connection`) lock કરે છે
(`open-sse/services/accountFallback.ts`).

Classification rulesને providers માટે સંપૂર્ણ error **text** જ દેખાય છે
(body markers જેમ કે `额度不足` સાથે match કરવા જરૂરી), અને તે પણ
`providerErrorRules.ts`માં આવેલા `FULL_TEXT_RULE_PROVIDERS` allowlistમાં સૂચિબદ્ધ
providers માટે — હાલમાં માત્ર `"agentrouter"`. દરેક અન્ય **built-in catalog**
provider માટે, `checkFallbackError` `getProviderErrorRuleMatch`ને માત્ર
structured error (`{code, type}`) આપે છે, જે header/status/code-based rules માટે
પૂરતું છે પરંતુ body-text markers માટે અંધ છે. Helper
`resolveRuleMatchBody()` આ પસંદગી કરે છે: allowlisted providers માટે સંપૂર્ણ
error text, અન્યથા structured error. કોઈ **built-in** providerને
`FULL_TEXT_RULE_PROVIDERS`માં ઉમેરવું એ સ્પષ્ટ per-provider opt-in છે — તેનો હેતુ
એ છે કે listમાં ન હોય તેવા દરેક provider માટેનો default path byte-for-byte
અપરિવર્તિત રહે.

Ruleનું `scope` (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS`થી અલગ opt-in છે: `checkFallbackError` તેને માત્ર
`fallbackResult.ruleScope` તરીકે બહાર પાડે છે, અને downstream consumers તેને
માહિતીપ્રદ label સિવાય અન્ય રીતે માત્ર એ જ fileની
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistમાં રહેલા providers માટે માન્ય કરે છે
(`honorsRuleLockScope()` દ્વારા gated — આજે માત્ર `"agentrouter"`). Provider
તે allowlistમાં આવ્યા પછી `scope: "connection"` match વાસ્તવમાં શું કરે છે તે
માટે ઉપરનું "Restated quota errors" જુઓ.

**#11104 — operator-declared rules બંને allowlistsને bypass કરે છે.** Operator
runtime પર `settings.providerErrorRules` દ્વારા per-provider rule જાહેર કરી શકે છે
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
આ fileમાં ફેરફાર કર્યા વિના. Operator ruleને
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` પાછળ gated રાખવું —
જે allowlistsનો હેતુ **default** built-in catalog rulesના વર્તનનું રક્ષણ કરવાનો છે —
settings mechanismને પહેલેથી સૂચિબદ્ધ providers સિવાય દરેક provider માટે નિષ્ક્રિય
બનાવી દેશે, કારણ કે rule જાહેર કરવું પોતે જ operatorનું સ્પષ્ટ opt-in છે.
`resolveRuleMatchBody()` અને `honorsRuleLockScope()` બંને પહેલા
`hasOperatorRuleForProvider()` તપાસે છે: operator rule ધરાવતા providerને raw
error text મળે છે અને તેનો જાહેર કરેલો `scope` માન્ય થાય છે, ભલે તે બંનેમાંથી
કોઈ allowlistમાં હોય કે ન હોય.

**Operator-declared rules** (`OperatorProviderErrorRule`): દરેક ruleમાં વૈકલ્પિક
`status` અને વૈકલ્પિક `match` હોય છે (`match` error textનો plain,
case-insensitive substring છે, ક્યારેય RegExp નહીં, તેથી તે ReDoS કરી શકતું નથી),
અને બેમાંથી ઓછામાં ઓછું એક સેટ કરવું આવશ્યક છે. બંને સેટ હોય ત્યારે તેઓ ANDથી
જોડાય છે; કોઈ field છોડી દેવાય તો તે કોઈપણ મૂલ્ય સાથે match થાય છે, તેથી
`{match: "insufficient_quota"}` એ code ધરાવતા કોઈપણ status સાથે match થાય છે.
સૌથી પહેલાં match થતો rule જીતે છે. `cooldownMs` વધુમાં વધુ 30 દિવસ સ્વીકારે છે;
કુલ મળીને વધુમાં વધુ 50 rules.

**બધા કેસ માટેના ડિફૉલ્ટ્સ** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` મારફતે સેટ કરાયેલ): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` 1 મિનિટથી 30 દિવસ સુધીનું હોવું જોઈએ. ડિફૉલ્ટ ત્યારે જ લાગુ પડે છે જ્યારે કોઈ operator rule અને કોઈ built-in catalog rule મેળ ન ખાતા હોય, અને માત્ર 402, 403, 408, 429 તથા 5xx errors માટે. Request-shape errors (400, 404, 409, 413, 422) અને bare 401s માટે તેમની પોતાની handling જળવાઈ રહે છે. સ્પષ્ટ `reason` ન હોય તો, reason status પરથી આવે છે, જેમ `classifyError` કરે છે. ડિફૉલ્ટ જાહેર કરવાથી `hasOperatorRuleForProvider()` માટે તે operator rule ગણાય છે, તેથી તેનું `scope` (ડિફૉલ્ટ `"connection"`) માન્ય રાખવામાં આવે છે. ડિફૉલ્ટનો અસરકારક cooldown તેના `cooldownMs` અને providerના પોતાના retry hint (`Retry-After`, `x-ratelimit-reset` અથવા bodyમાંનો reset hint — connection-cooldown setting "use upstream retry hints" ચાલુ હોય ત્યારે engine જે hint માન્ય રાખે છે તે જ)માંથી લાંબો હોય છે. તેથી ડિફૉલ્ટ ટૂંકા upstream hintને લંબાવી શકે છે, પરંતુ વાસ્તવિક resetને ક્યારેય ટૂંકો કરી શકતો નથી. સ્પષ્ટ operator rule પોતાનું ચોક્કસ `cooldownMs` જાળવે છે. `markAccountUnavailable`માંના connection-cooldown guardsને કોઈ rule કે ડિફૉલ્ટ બાયપાસ કરતું નથી: સક્રિય, લાંબો cooldown ક્યારેય ટૂંકો કરવામાં આવતો નથી અને terminal status ક્યારેય overwrite થતો નથી. `checkFallbackError`માં અગાઉ ચાલતા built-in text detectors (credits exhausted, daily quota, account deactivated) તેમના પોતાના phrases માટે હજુ પણ પ્રાધાન્ય ધરાવે છે.

**જાણીતો ખાડો — `providerRuleRegistry`નો HTTP 400 માટે ક્યારેય ઉપયોગ થતો નથી.**
`checkFallbackError`ની `BAD_REQUEST` branch status 400ને સંપૂર્ણપણે પોતાના pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, વગેરે `accountFallback.ts`માં) મારફતે classify કરે છે અને તેની ઉપર આવેલી `configuredRule`/`getProviderErrorRuleMatch` branch સુધી પહોંચતા પહેલાં જ return કરે છે. `status: 400` ધરાવતો built-in catalog rule (અથવા operator rule) syntactically valid છે, પરંતુ તે ક્યારેય fire નહીં થાય. હાલમાં કોઈ existing rule 400ને target કરતું નથી, તેથી productionમાં કશું અસરગ્રસ્ત નથી — પરંતુ ભવિષ્યના 400 rule માટે પહેલાં આ branchમાં ફેરફાર કરવો પડશે. આ ફેરફાર માત્ર rule ઉમેરવા કરતાં મોટો છે, કારણ કે તે pattern-array behavior પર પહેલેથી આધાર રાખતા દરેક provider માટે 400નું reclassification કરે છે, અને એક provider rule ઉમેરવા માટેના scopeની બહાર છે.

### quota-misstating gateway ઉમેરવું

1. `statusRestatementRegistry`માં એક rule array રજિસ્ટર કરો
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` provider-specific રાખો; `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) સાથે અથડાતા generic English phrasesનો પુનઃઉપયોગ ક્યારેય ન કરો.
2. યોગ્ય lock scope પસંદ કરવા માટે વૈકલ્પિક રીતે `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)માં classification rules રજિસ્ટર કરો (`connection` account-wide quota માટે, `model` per-model errors માટે). આ પગલું productionમાં માત્ર એવા providers માટે અસરકારક બને છે જેમના rulesને full error textની જરૂર હોય (body markers): એ જ fileમાં `FULL_TEXT_RULE_PROVIDERS`માં provider id ઉમેરો — અન્યથા `checkFallbackError` ruleને ક્યારેય માત્ર structured `{code, type}` error જ આપશે અને body-text rule live traffic સાથે ક્યારેય match નહીં થાય. જે rules માત્ર `status`/`headers` પર match થાય છે (જેમ કે Opencode અથવા Minimaxના rules), તેમને આ opt-inની જરૂર નથી. અલગથી, જો rule `scope: "connection"` જાહેર કરે છે અને હેતુ વાસ્તવિક connection-wide cooldown ઉપરાંત same-request combo skip કરવાનો હોય (માત્ર informational label નહીં), તો એ જ fileમાં `HONORS_RULE_LOCK_SCOPE_PROVIDERS`માં provider id ઉમેરો — `markAccountUnavailable()` (`src/sse/services/auth.ts`) અને `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)માં `isAgentrouterConnectionQuotaScope()`-શૈલીના consumptionને આ જ નિયંત્રિત કરે છે; તેના વિના `scope` હજુ પણ `fallbackResult.ruleScope`માં વહે છે, પરંતુ તેના આધારે કોઈ કાર્યવાહી થતી નથી.
3. `tests/unit/upstream-status-restatement.test.ts`
   અને `tests/unit/agentrouter-error-rules.test.ts`ને અનુરૂપ unit tests ઉમેરો (જેમાં not-permanent / not-creditsExhausted guards સામેલ હોય, અને — જો providerને allowlistની જરૂર હોય — `resolveRuleMatchBody()` માત્ર તે provider માટે full text પરત કરે છે તે દર્શાવતો test પણ ઉમેરો).

`chatCore.ts`, `classifyError` અથવા comboમાં કોઈ ફેરફાર જરૂરી નથી.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family)માંના providersને IP-bucketed upstream તરીકે ગણવામાં આવે છે (opencode free tier account-bucketed નહીં પરંતુ IP-bucketed છે — #9611 જુઓ): status-429ને `quota_exhausted` **અથવા** `rate_limit_exceeded` તરીકે classify કરવામાં આવે ત્યારે, failing connectionના છેલ્લે જાણીતા egress IP સાથે મેળ ખાતું હોય તેવી allowlisted-familyની દરેક connectionને rotation તેમને અજમાવી શકે તે પહેલાં cooldown કરવામાં આવે છે — જેથી N-1 નિશ્ચિતપણે નિષ્ફળ થનારા upstream calls ટાળી શકાય (#10460/#10525 જેવી જ રીત).

`rate_limit_exceeded`ને જાણપૂર્વક સામેલ કરવામાં આવ્યું છે: `markAccountUnavailable` path પર opencode-specific rules ક્યારેય match થતા નથી (`checkFallbackError`ને headers/body આપવામાં આવતા નથી, અને opencode `FULL_TEXT_RULE_PROVIDERS`માં નથી). તેથી subscription-quota text ("monthly usage limit reached") ધરાવતું body ધરાવતો 429, `status_429` rule સુધી પહોંચે તે પહેલાં quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) દ્વારા `quota_exhausted` તરીકે classify થાય છે — જ્યારે quota-text વિનાનો 429 (સાદું rate limiting) `status_429` rule મારફતે `rate_limit_exceeded` તરીકે classify થાય છે અને IP familyને હજુ પણ cooldown કરે છે. Allowlisted provider માટે IP-bucketed rate limit exhausted quota જેટલો જ signal છે. યોગ્ય મર્યાદાઓ:

- **શ્રેષ્ઠ પ્રયાસ મુજબ**: લૉક `proxy_logs`માંથી કનેક્શનના છેલ્લે જાણીતા `egress_ip`ને ઉકેલે છે (24 કલાકની વિન્ડો, સમકાલીન, કૅશ વિના). કૅશ ખાલી હોય (egress IPની ક્યારેય તપાસ થઈ ન હોય) અથવા કોઈ પંક્તિ ન મળે → નિષ્ફળ કનેક્શનને શાખા દ્વારા હજી પણ કૂલડાઉન કરવામાં આવે છે (આજની જેમ રેકોર્ડ થાય છે), ફક્ત કોઈ sibling લૉક થતું નથી.
- **ક્યારેય ટર્મિનલ નહીં**: કૂલડાઉન નવીકરણ થતી ક્વોટા વિન્ડો છે
  (`testStatus: "unavailable"`); IP-સ્તરના સંકેત પરથી કાયમી સ્થિતિ ક્યારેય તારવવામાં આવતી નથી. `disableCooling` કનેક્શનો શાખાને સંપૂર્ણપણે છોડે છે.
- **allowlisted family માટે લૉકની ગ્રેન્યુલારિટી બદલાય છે**: આ માત્ર sibling optimization નહીં, પરંતુ scopeમાં ફેરફાર છે. opencode એક `passthroughModels` provider છે, તેથી આ શાખા પહેલાં 429થી પ્રતિ-MODEL lockout થતો હતો; હવે તે connection cooldown ઉત્પન્ન કરે છે — એક પણ sibling વિનાના એકમાત્ર કનેક્શન પર ઑપરેટર ચલાવી રહ્યો હોય ત્યારે પણ. આ એ જ ગ્રેન્યુલારિટી છે જેને opencodeના નિયમોના કોષ્ટકમાં પહેલેથી યોગ્ય જાહેર કરવામાં આવી છે (`scope: "connection"`,
  `providerErrorRules.ts`), પરંતુ અત્યાર સુધી તેનો ક્યારેય સન્માન થયો નથી કારણ કે opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`માં નથી. શાખા નિષ્ફળ કનેક્શનનું cooldown + `backoffLevel` પોતે લખે છે, connection-scoped agentrouter શાખાની નકલ કરે છે, અને પાછી ફરે છે — પ્રતિ-મોડેલ બ્લૉક તથા નીચેનો સામાન્ય પાથ ક્યારેય પહોંચાતા નથી.
- **Combo સામેલ છે**: agentrouter શાખાની જેમ, scope જાણપૂર્વક combo caller 429 પર લાગુ કરતું `persistUnavailableState`/`isCombo` downgrade અવગણે છે. પ્રતિ-મોડેલ lockout આ scopeનું નબળું સ્વરૂપ નથી, તે ખોટો એકમ છે: તે exhausted IP વિશે કશું કહેતું નથી, તેથી combo rotation દરેક sibling દીઠ એક નિશ્ચિતપણે નિષ્ફળ થનારો call કરવાનું ચાલુ રાખશે.
- **Sibling safety**: પહેલેથી ટર્મિનલ (banned/credits_exhausted) અથવા પહેલેથી લાંબા cooldownમાં રહેલા siblingને ક્યારેય overwrite કરવામાં આવતો નથી.
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ને વિસ્તૃત કરવું એ માલિકનો સ્પષ્ટ નિર્ણય છે; કોઈ સામાન્ય wiring નહીં (pattern #10334/#10419). sibling query એ જ allowlistને bind કરે છે, તેને SQL literal તરીકે પુનરાવર્તિત કરતી નથી, તેથી તેને વિસ્તૃત કરવું એક જ લાઇનનો ફેરફાર રહે છે.
- **Egress IP rotation, બંને દિશામાં**: lookup window (24 કલાક) egress-IP cache TTL (5 મિનિટ) કરતાં ઘણી વિશાળ છે, તેથી “last known IP” ઇતિહાસ છે, વર્તમાન સ્થિતિ નહીં. જો કોઈ કનેક્શનની proxy વિન્ડોની અંદર rotate થઈ હોય, તો લૉક ખરેખર shared IPને **ચૂકી શકે છે** (રેકોર્ડ થયેલો IP નવો, અખૂટેલો હોય છે) — અને સમપ્રમાણે exhausted IPથી ત્યારબાદ rotate થઈ ગયેલા siblingને **cool કરી શકે છે**. બીજા કિસ્સામાં તે siblingને એક cooldown windowનો ખર્ચ થાય છે; બંને history-based lookupની સ્વીકારેલી best-effort મર્યાદાઓ છે.
- **Cost**: `proxy_logs`ના બે bounded scans (`idx_pl_timestamp` દ્વારા window-filtered), માત્ર 429 આવર્તન વખતે. કોઈ નવો index નહીં (migration 134 YAGNI). મધ્યમ કદની real-traffic DB copy પર માપવામાં આવ્યું; high-throughput instance એ જ વિન્ડોમાં પ્રમાણસર વધુ પંક્તિઓ રાખે છે.

## અન્ય રેઝિલિયન્સ સુવિધાઓ

- **20 રાઉટિંગ સ્ટ્રેટેજી** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — જુઓ [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **રીસેટ-અવેર રાઉટિંગ** (v3.8.0) — ક્વોટા રીસેટ સમય પ્રમાણે કનેક્શનોને પ્રાથમિકતા આપે છે.
- **બેકગ્રાઉન્ડ મોડ ડિગ્રેડેશન** — Responses API `background: true` ચેતવણી સાથે સિંક પર ડિગ્રેડ થાય છે.
- **ડાયનામિક ટૂલ લિમિટ ડિટેક્શન** — ટૂલ સંખ્યાની મર્યાદા પૂરી થાય ત્યારે પ્રોવાઇડર્સને બેક-ઓફ કરે છે.
- **ઈમર્જન્સી ફોલબેક** — `OMNIROUTE_EMERGENCY_FALLBACK` દ્વારા નિયંત્રિત; ઓપરેટરો રીસ્ટાર્ટ વગર Feature Flags પેજથી તેને ઓવરરાઇડ કરી શકે છે.

---

## ડીબગિંગ

- Weighted કોમ્બો `503 all_targets_cooling_down` જવાબ આપે છે (`Retry-After` સેટ થયેલ, `diagnostics.excluded` દરેક ટાર્ગેટને `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` સાથે લિસ્ટ કરે છે) → પૂલ કોન્ફિગર અને કનેક્ટ થયેલ છે, દરેક ટાર્ગેટ ફક્ત રેઝિલિયન્સ ટાઇમર દ્વારા બાકાત છે; `[COMBO] Weighted selection: every target excluded before dispatch — …` ચેતવણી કારણો અને બાકીના સેકન્ડ જણાવે છે. એ જ કોમ્બો તરફથી `404 no_executable_targets` એનો અર્થ એ કે કોઈ રેઝિલિયન્સ ટાઇમર સંકળાયેલ નથી (ચલાવવા માટે કંઈ નથી, અથવા દરેક એકાઉન્ટ ઉપલબ્ધતા પ્રોબમાં નિષ્ફળ ગયું). `targetResolution.ts` માં એકત્રિત થયેલા exclusion પરથી `open-sse/services/combo/pinRecovery.ts` માં બનાવેલ.
- પ્રોવાઇડરની તમામ કી સ્કિપ થઈ → સર્કિટ બ્રેકર સ્ટેટ અને દરેક કનેક્શનના `rateLimitedUntil`/`testStatus` બંને તપાસો.
- રીસેટ વિન્ડો પછી પ્રોવાઇડર કાયમી રીતે બાકાત → `getStatus()`/`canExecute()` ને બદલે કાચો `state` વાંચતો કોડ.
- એક કી નિષ્ફળ જાય, બાકીની કામ કરવી જોઈએ → સર્કિટ બ્રેકર કરતાં કનેક્શન કૂલડાઉનને પ્રાથમિકતા આપો.
- ફક્ત એક મોડેલ નિષ્ફળ જાય → કનેક્શન કૂલડાઉન કરતાં મોડેલ લોકઆઉટને પ્રાથમિકતા આપો.
- સ્ટેટ સ્વયં-પુનઃપ્રાપ્ત થવું જોઈએ પણ થતું નથી → ભવિષ્યનો ટાઇમસ્ટેમ્પ + સમાપ્ત સ્ટેટ રિફ્રેશ કરતો રીડ પાથ તપાસો. કાયમી સ્ટેટસ માટે મેન્યુઅલ ફેરફારો જરૂરી છે.

---

## રનટાઇમ સ્ટેટ — એજન્ટ ક્વિક રેફરન્સ

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) માંથી યથાતથ ખસેડેલું, જેથી એજન્ટ
> ગાઇડ 40k કોન્ટેક્સ્ટ બજેટ હેઠળ રહે. આ ઉપરના વિભાગોનું સંક્ષિપ્ત, એજન્ટ-ફેસિંગ દૃશ્ય છે;
> ક્રમાંકિત વિભાગો સંપૂર્ણ રેફરન્સ તરીકે રહે છે.

OmniRoute પાસે ત્રણ સંબંધિત પણ અલગ અસ્થાયી-નિષ્ફળતા મિકેનિઝમ છે. રાઉટિંગ વર્તન ડીબગ કરતી વખતે
તેમની અવધિ અલગ રાખો. એક નજરે સમજાય એવો નકશો માટે
[3-લેયર રેઝિલિયન્સ ડાયાગ્રામ](../diagrams/exported/resilience-3layers.svg)
(સોર્સ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
જુઓ.

### પ્રોવાઇડર સર્કિટ બ્રેકર

**અવધિ**: સમગ્ર પ્રોવાઇડર, દા.ત. `glm`, `openai`, `anthropic`.

**હेतુ**: અપસ્ટ્રીમ/સર્વિસ સ્તરે વારંવાર નિષ્ફળ થતા પ્રોવાઇડરને ટ્રાફિક મોકલવાનું બંધ કરવું,
જેથી એક અસ્વસ્થ પ્રોવાઇડર દરેક રિક્વેસ્ટને ધીમી ન કરે.

**ઇમ્પ્લિમેન્ટેશન**:

- કોર ક્લાસ: `src/shared/utils/circuitBreaker.ts`
- ચેટ ગેટ/એક્ઝિક્યુશન વાયરિંગ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- રનટાઇમ સ્ટેટસ API: `src/app/api/monitoring/health/route.ts`
- શેર્ડ રેપર્સ: `open-sse/services/accountFallback.ts`
- પર્સિસ્ટેડ સ્ટેટ ટેબલ: `domain_circuit_breakers`

**સ્ટેટ્સ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: સામાન્ય ટ્રાફિકને મંજૂરી છે.
- `DEGRADED`: અર્લી-વોર્નિંગ બેન્ડ — નિષ્ફળતાઓ ડિગ્રેડેશન થ્રેશોલ્ડ પાર કરી ગઈ છે પણ હજુ
  બ્રેકર થ્રેશોલ્ડ પાર નથી કરી; ટ્રાફિક ચાલુ રહે છે, ડેશબોર્ડ ચેતવણી બતાવે છે. માન્ય
  કનેક્શન ટેસ્ટ અથવા નવી નિષ્ફળતા વગરની શાંત વિન્ડો તેને `CLOSED` પર પાછું લાવે છે
  (વિન્ડો `docs/architecture/RESILIENCE_GUIDE.md` માં છે).
- `OPEN`: પ્રોવાઇડર અસ્થાયી રીતે બ્લોક થયેલ છે; કોલર્સને provider-circuit-open રિસ્પોન્સ
  મળે છે અથવા કોમ્બો રાઉટિંગ બીજા ટાર્ગેટ પર જાય છે.
- `HALF_OPEN`: રીસેટ ટાઇમઆઉટ પૂરો થયો છે; પ્રોબ રિક્વેસ્ટને મંજૂરી આપો. સફળતા બ્રેકરને
  બંધ કરે છે, નિષ્ફળતા તેને ફરી ખોલે છે.

**ડિફોલ્ટ્સ** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` માં
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` દ્વારા વપરાય છે → `src/sse/handlers/chatHelpers.ts` માં
`getCircuitBreaker(provider, …)`). સમગ્ર-પ્રોવાઇડર બ્રેકર `circuitBreakerThreshold` / `circuitBreakerReset` પર ચાલે છે:

| પ્રોફાઇલ |  ડિગ્રેડ થાય | ખુલે (`circuitBreakerThreshold`) | રીસેટ (`circuitBreakerReset`) |
| -------- | -----------: | -------------------------------: | ----------------------------: |
| OAuth    |          `5` |                              `8` |                         `60s` |
| API કી   |          `7` |                             `12` |                         `30s` |
| લોકલ     | (વ્યુત્પન્ન) |                              `2` |                         `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) અને `providerCooldownMs` (5/10/1 min) પણ વ્યાખ્યાયિત કરે છે: આ
**ઓપ્ટ-ઇન ગ્લોબલ Provider Cooldown ના વિન્ડો ગેટ** (`PROVIDER_COOLDOWN_ENABLED`, ડિફોલ્ટ બંધ) ને ચલાવે છે — `open-sse/services/providerCooldownTracker.ts` માં પ્રોવાઇડર-લેવલ એન્ટ્રી ફક્ત `providerFailureWindowMs` ની અંદર `providerFailureThreshold` નિષ્ફળતાઓ પછી જ કૂલિંગ તરીકે ગણાય છે, અને પછી `providerCooldownMs` માટે કૂલ થાય છે. આ લાઇવ બ્રેકરના થ્રેશોલ્ડ નથી — બ્રેકર વર્તનની અપેક્ષા રાખીને તેને ટ્યુન ન કરો. દરેક ડિફોલ્ટ `OMNIROUTE_PROVIDER_BREAKER_*` અને `OMNIROUTE_CIRCUIT_BREAKER_*` env વેરિએબલ દ્વારા ઓવરરાઇડ કરી શકાય છે; રનટાઇમ-ચોક્કસ રેફરન્સ ટેબલ `docs/architecture/RESILIENCE_GUIDE.md` માં છે.

ફક્ત પ્રોવાઇડર-લેવલ નિષ્ફળતા સ્ટેટસ જ પ્રોવાઇડર બ્રેકરને ટ્રિપ કરવું જોઈએ:

```ts
(408, 500, 502, 503, 504);
```

મોટા ભાગના `401`, `403`, અથવા `429` કેસ જેવા સામાન્ય એકાઉન્ટ/કી/મોડેલ એરર માટે સમગ્ર-પ્રોવાઇડર બ્રેકરને ટ્રિપ ન કરો. તે સામાન્ય રીતે કનેક્શન કૂલડાઉન અથવા મોડેલ લોકઆઉટમાં આવે છે. જેનરિક API-કી પ્રોવાઇડરનો `403` પુનઃપ્રાપ્ત કરી શકાય એવો હોવો જોઈએ, સિવાય કે તેને ટર્મિનલ પ્રોવાઇડર/એકાઉન્ટ એરર તરીકે વર્ગીકૃત કરવામાં આવ્યો હોય.

બ્રેકર બેકગ્રાઉન્ડ ટાઈમર નહીં, પણ લેઝી રિકવરી વાપરે છે. જ્યારે `OPEN` સમાપ્ત થાય છે,
ત્યારે `getStatus()`, `canExecute()`, અને `getRetryAfterMs()` જેવા રીડ સ્થિતિને
`HALF_OPEN` પર રિફ્રેશ કરે છે, જેથી ડેશબોર્ડ અને કોમ્બો કેન્ડિડેટ બિલ્ડર સમાપ્ત થયેલા
પ્રોવાઇડરને હંમેશ માટે બહાર રાખતા ન રહે.

### કનેક્શન કૂલડાઉન

**અવધિ**: એક પ્રોવાઇડર કનેક્શન/એકાઉન્ટ/કી.

**હેતુ**: એક ખરાબ કી/એકાઉન્ટને અસ્થાયી રૂપે છોડી દેવો, જ્યારે તે જ પ્રોવાઇડરના અન્ય
કનેક્શનો વિનંતીઓ પૂરી પાડવાનું ચાલુ રાખી શકે.

**અમલીકરણ**:

- લખવા/અપડેટ કરવાનો માર્ગ: `src/sse/services/auth.ts::markAccountUnavailable()`
- એકાઉન્ટ પસંદગી/ફિલ્ટરિંગ: `src/sse/services/auth.ts::getProviderCredentials...`
- કૂલડાઉન ગણતરી: `open-sse/services/accountFallback.ts::checkFallbackError()`
- સેટિંગ્સ: `src/lib/resilience/settings.ts`

પ્રોવાઇડર કનેક્શન પર મહત્વપૂર્ણ ફીલ્ડ:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

એકાઉન્ટ પસંદગી દરમિયાન, કનેક્શનને ત્યારે છોડી દેવામાં આવે છે જ્યારે:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

કૂલડાઉન પણ લેઝી છે: જ્યારે `rateLimitedUntil` ભૂતકાળમાં હોય, ત્યારે કનેક્શન ફરીથી લાયક
બને છે. સફળ ઉપયોગ પર, `clearAccountError()` `testStatus`, `rateLimitedUntil`, એરર
ફીલ્ડ અને `backoffLevel` સાફ કરે છે.

ડિફોલ્ટ કનેક્શન કૂલડાઉન વર્તન:

- OAuth બેઝ કૂલડાઉન: `5s`.
- API-કી બેઝ કૂલડાઉન: `3s`.
- API-કી `429` માટે ઉપલબ્ધ હોય ત્યારે અપસ્ટ્રીમ રીટ્રાય સંકેતો (`Retry-After`, રીસેટ
  હેડર, અથવા પાર્સ કરી શકાય એવો રીસેટ ટેક્સ્ટ) ને પ્રાથમિકતા આપવી જોઈએ.
- વારંવાર થતી પુનઃપ્રાપ્ય નિષ્ફળતાઓ એક્સપોનન્શિયલ બેકઑફ વાપરે છે:

```ts
baseCooldownMs * 2 ** failureIndex;
```

એન્ટી-થન્ડરિંગ-હર્ડ ગાર્ડ એ જ કનેક્શન પર એકસાથે થતી નિષ્ફળતાઓને કૂલડાઉન વારંવાર
લંબાવવાથી અથવા `backoffLevel` બેવડું વધારવાથી અટકાવે છે.

ટર્મિનલ સ્થિતિઓ કૂલડાઉન નથી. `banned`, `expired` (જે `EXPIRED_RETRY_MAX` દ્વારા N
સીમિત રીટ્રાય પછી જ ટર્મિનલ બને છે), અને `credits_exhausted` નો ઉદ્દેશ એ છે કે તેઓ
ત્યાં સુધી અનુપલબ્ધ રહે જ્યાં સુધી ક્રેડેન્શિયલ્સ/સેટિંગ્સ બદલાય અથવા ઓપરેટર તેમને
રીસેટ કરે. ટર્મિનલ સ્થિતિઓને ક્ષણિક કૂલડાઉન સ્થિતિથી ઓવરરાઇટ કરશો નહીં.

### મોડેલ લોકઆઉટ

**અવધિ**: પ્રોવાઇડર + કનેક્શન + મોડેલ.

**હેતુ**: જ્યારે તે કનેક્શન માટે ફક્ત એક જ મોડેલ અનુપલબ્ધ હોય અથવા ક્વોટા-સીમિત હોય,
ત્યારે આખું કનેક્શન અક્ષમ કરવાથી બચવું.

ઉદાહરણો:

- દરેક-મોડેલ ક્વોટા ધરાવતા પ્રોવાઇડર `429` પરત કરે છે.
- એક ગુમ થયેલા મોડેલ માટે લોકલ પ્રોવાઇડર `404` પરત કરે છે.
- પસંદ કરેલા Grok મોડ જેવી પ્રોવાઇડર-વિશિષ્ટ મોડ/મોડેલ પરવાનગી નિષ્ફળતાઓ.

મોડેલ લોકઆઉટ `open-sse/services/accountFallback.ts` માં રહેલું છે અને તે જ કનેક્શનને
અન્ય મોડેલો પૂરી પાડવાનું ચાલુ રાખવા દે છે.

### ડીબગિંગ માર્ગદર્શન

- જો પ્રોવાઇડરની બધી કી છોડી દેવામાં આવે, તો પ્રોવાઇડર બ્રેકર સ્થિતિ અને દરેક
  કનેક્શનની `rateLimitedUntil`/`testStatus` બંને તપાસો.
- જો રીસેટ વિન્ડો પછી પણ પ્રોવાઇડર કાયમી રીતે બહાર રહેલો દેખાય, તો તપાસો કે કોડ
  `getStatus()`/`canExecute()` વાપરવાને બદલે કાચી `state` વાંચી રહ્યું છે કે કેમ.
- જો એક પ્રોવાઇડર કી નિષ્ફળ જાય પણ બાકીની કામ કરવી જોઈએ, તો પ્રોવાઇડર બ્રેકરને બદલે
  કનેક્શન કૂલડાઉનને પ્રાથમિકતા આપો.
- જો ફક્ત એક જ મોડેલ નિષ્ફળ જાય, તો કનેક્શન કૂલડાઉનને બદલે મોડેલ લોકઆઉટને પ્રાથમિકતા આપો.
- જો કોઈ સ્થિતિ સ્વયં-પુનઃપ્રાપ્ત થવી જોઈએ, તો તેની પાસે ભવિષ્યનો ટાઈમસ્ટેમ્પ/રીસેટ
  ટાઈમઆઉટ અને સમાપ્ત સ્થિતિને રિફ્રેશ કરતો રીડ માર્ગ હોવો જોઈએ. કાયમી સ્થિતિઓ માટે
  મેન્યુઅલ ક્રેડેન્શિયલ અથવા કોન્ફિગ ફેરફારો જરૂરી છે.

---

## TLS ફિંગરપ્રિન્ટિંગ અને સ્ટીલ્થ

પ્રોવાઇડર-વિશિષ્ટ સ્ટીલ્થ (JA3/JA4, CCH, ઓબ્ફસ્કેશન) અલગથી દસ્તાવેજીકૃત છે — જુઓ `docs/security/STEALTH_GUIDE.md` (git; `/docs` માં કમ્પાઇલ થયેલ નથી).

---

## રેઝિલિયન્સ ટેસ્ટિંગ (ફેઝ 8 · બ્લોક C)

રેઝિલિયન્સ લોજિક માટેના યુનિટ ટેસ્ટ્સ ઉપરાંત, ત્રણ ટેસ્ટ્સ વાસ્તવિક સ્ટ્રેસ/નિષ્ફળતા
પરિસ્થિતિઓ હેઠળ રનટાઇમનું પરીક્ષણ કરે છે (બધા integration/nightly — કોઈપણ PRs ને બ્લોક કરતા નથી):

| ટેસ્ટ       | શું                                                                                                                                                                                                                   | ચલાવો                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | ફેક-અપસ્ટ્રીમ નોડ વાસ્તવિક latency/reset/timeout/503 ઇન્જેક્ટ કરે છે; માન્ય કરે છે કે સર્કિટ બ્રેકર ખુલે છે/પુનઃપ્રાપ્ત થાય છે અને `checkFallbackError` 503 ને પુનઃપ્રાપ્ત કરી શકાય એવા ફોલબેક તરીકે વર્ગીકૃત કરે છે. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` હેઠળ `createSSEStream` દીઠ ~500 સ્ટ્રીમ્સ; જો હીપ સીમાથી આગળ વધે તો નિષ્ફળ થાય છે (OOM ગાર્ડ #3069).                                                                                                    | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` સામે સતત લોડ; p95/error થ્રેશોલ્ડ્સ.                                                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) દ્વારા ઓર્કેસ્ટ્રેટેડ.
ડિફોલ્ટ `test:integration` માં, chaos અને heap સ્વ-સ્કિપ થાય છે (`RUN_CHAOS_INT`/`--expose-gc` વિના).

---

## આ પણ જુઓ

- [આર્કિટેક્ચર ગાઇડ](./ARCHITECTURE.md) — સિસ્ટમ આર્કિટેક્ચર અને આંતરિક બાબતો
- [યુઝર ગાઇડ](../guides/USER_GUIDE.md) — પ્રોવાઇડર્સ, કોમ્બો, CLI ઇન્ટિગ્રેશન
- [ઓટો-કોમ્બો એન્જિન](../routing/AUTO-COMBO.md) — 16-ફેક્ટર સ્કોરિંગ, મોડ પેક્સ
