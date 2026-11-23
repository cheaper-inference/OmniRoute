# Resilience Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ሦስት የተለያዩ ግን ተዛማጅ የመቋቋም ዘዴዎች አሉት። እያንዳንዳቸው የተለየ ወሰንና ዓላማ አላቸው። የማዞሪያ ባህሪን ሲያርሙ እነዚህን ለያይተው ይያዙ።

![ባለ 3-ንብርብር የመቋቋም ሞዴል](../diagrams/exported/resilience-3layers.svg)

> ምንጭ፦ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. የProvider Circuit Breaker

**ወሰን፦** ሙሉ provider (ለምሳሌ፣ `glm`፣ `openai`፣ `anthropic`)።

**ዓላማ፦** በupstream/service ደረጃ በተደጋጋሚ የሚከሽፍ provider ትራፊክ መላክን ማቆም።

**አተገባበር፦**

- ዋና class፦ `src/shared/utils/circuitBreaker.ts`
- ውህደት፦ `src/sse/handlers/chatHelpers.ts`፣ `src/sse/handlers/chat.ts`
- የሁኔታ API፦ `GET /api/monitoring/health`
- የዳግም ማስጀመሪያ API፦ `POST /api/resilience/reset`
- Wrappers፦ `open-sse/services/accountFallback.ts`
- የDB ሰንጠረዥ፦ `domain_circuit_breakers`

**ሁኔታዎች፦**

- `CLOSED` — መደበኛ ትራፊክ ይፈቀዳል
- `DEGRADED` — ትራፊክ አሁንም ይፈቀዳል፣ ነገር ግን የጨመሩ የprovider ውድቀቶች ክትትል ይደረግባቸዋል፤ በቂ ስኬቶች ሲኖሩ፣ ትክክለኛ የግንኙነት ሙከራ ሲካሄድ፣ ወይም ለመጨረሻው የውድቀት ዓይነት ከሁሉ ረጅሙ የ`OPEN` ቆይታ (የእሱ `cooldownByKind` እሴት፣ ከሌለ `resetTimeout`፣ × `maxBackoffMultiplier`፣ ቢያንስ አንድ cooldown) ያለ አዲስ ውድቀት ካለፈ ወደ `CLOSED` ይመለሳል
- `OPEN` — provider ለጊዜው ይታገዳል፤ combo routing ይዘለዋል
- `HALF_OPEN` — የዳግም ማስጀመሪያ ጊዜው አልፏል፤ የprobe ጥያቄ ይፈቀዳል

**ሊዋቀሩ የሚችሉ ነባሪ እሴቶች (`open-sse/config/constants.ts`፣ በDashboard → Settings → Resilience ውስጥ የሚታዩ)፦**

| Class   | ወደ Degraded የሚገባው | የሚከፈተው በ | የዳግም ማስጀመሪያ ጊዜ |
| ------- | ----------------- | -------- | -------------- |
| OAuth   | 5 ውድቀቶች           | 8 ውድቀቶች  | 60s            |
| API-key | 7 ውድቀቶች           | 12 ውድቀቶች | 30s            |
| Local   | ከመረጃ የሚገኝ         | 2 ውድቀቶች  | 15s            |

`degradationThreshold` provider መቼ ወደ `DEGRADED` እንደሚገባ ይቆጣጠራል፤ `failureThreshold` መቼ እንደሚከፈትና እንደሚዘለል ይቆጣጠራል። የLocal provider profile-ዎች እስካሁን በResilience settings ገጽ ላይ አይታዩም።

**የማስነሻ code-ዎች፦** የprovider ደረጃ status-ዎች `[408, 500, 502, 503, 504]` ብቻ። በaccount ደረጃ ላሉ error-ዎች (አብዛኛዎቹ 401/403/429 — እነዚህ የcooldown ወይም lockout ናቸው) circuit breaker-ን **አያስነሱ**።

**Lazy recovery፦** `OPEN` ጊዜው ሲያበቃ፣ `getStatus()`፣ `canExecute()`፣ `getRetryAfterMs()` ሁኔታውን ወደ `HALF_OPEN` ያድሳሉ። እነዚሁ የማንበብ ሂደቶች (እና ቀጣዩ ውድቀት) ጊዜው ያለፈበትን `DEGRADED` ወደ `CLOSED` ይመልሳሉ። የbackground timer አያስፈልግም።

---

### በፍላጎት የሚነቃ ዓለም አቀፍ Provider Cooldown (window gate)

አራተኛው፣ **በፍላጎት የሚነቃ** layer (`PROVIDER_COOLDOWN_ENABLED`፣ በነባሪ **ጠፍቷል**) እየከሸፉ ያሉ provider-ዎችን
ከአንድ ጥያቄ ወደ ሌላ በሚቆይ memory ውስጥ
በ`open-sse/services/providerCooldownTracker.ts` ያስቀምጣል፤ ይህም ተከታታይ combo ጥያቄዎች አሁን የከሸፈን provider
እንደገና እንዳይመረምሩ በcombo target
resolution ይመከራል። በprovider ደረጃ ያሉ entry-ዎች የ`PROVIDER_PROFILES` window gate-ን ያከብራሉ፦

| Profile | ከዚህ በኋላ ይነሳል (`providerFailureThreshold`) | በዚህ ውስጥ (`providerFailureWindowMs`) | ለዚህ ጊዜ cooldown ይደረጋል (`providerCooldownMs`) |
| ------- | ----------------------------------------: | ----------------------------------: | -------------------------------------------: |
| OAuth   |                                      `10` |                             `15min` |                                       `5min` |
| API key |                                      `15` |                             `30min` |                                      `10min` |

ከthreshold በታች provider-ው cooldown ላይ እንዳለ **አይቆጠርም**፤ አንድ ስኬት
window-ውን ያጸዳል። በግንኙነት ደረጃ ያሉ entry-ዎች (`provider:connectionId`) በምትኩ
የexponential `minRetryCooldownMs → maxRetryCooldownMs` backoff-ን ይጠብቃሉ። Override-ዎች፦
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`።
የRegression guard፦ `tests/unit/provider-cooldown-window-gate.test.ts`።

## 2. የግንኙነት ማቀዝቀዣ ጊዜ

**ወሰን:** አንድ የአቅራቢ ግንኙነት/መለያ/ቁልፍ።

**ዓላማ:** ለተመሳሳይ አቅራቢ ያሉ ሌሎች ግንኙነቶች አገልግሎት መስጠታቸውን ሲቀጥሉ፣ አንድ ችግር ያለበትን ቁልፍ መዝለል።

**አተገባበር:**

- እንደማይገኝ ምልክት ማድረግ፦ `src/sse/services/auth.ts::markAccountUnavailable()`
- ምርጫ፦ በተመሳሳይ ፋይል ውስጥ `getProviderCredentials*`
- የማቀዝቀዣ ጊዜ ስሌት፦ `open-sse/services/accountFallback.ts::checkFallbackError()`
- ቅንብሮች፦ `src/lib/resilience/settings.ts`

**ለእያንዳንዱ ግንኙነት ያሉ መስኮች:**

- `rateLimitedUntil` — የማቀዝቀዣ ጊዜው እስኪያበቃ ድረስ ያለው የጊዜ ማህተም
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — የኤክስፖነንሻል መጠባበቂያ ቆጣሪ

**ነባሪ የማቀዝቀዣ ጊዜዎች:**

- OAuth መሠረት፦ 5s
- API-key መሠረት፦ 3s
- API-key 429፦ ከላይኛው አገልግሎት የሚመጡ `Retry-After`/ዳግም ማስጀመሪያ ራስጌዎችን/ሊተነተን የሚችል የዳግም ማስጀመሪያ ጽሑፍን ይመርጣል
- መጠባበቂያ፦ `baseCooldownMs * 2 ** failureIndex`

**የአንድ ጊዜ የጥያቄ መጨናነቅ መከላከያ:** በአንድ ጊዜ የሚከሰቱ ውድቀቶች የማቀዝቀዣ ጊዜውን ከመጠን በላይ እንዳያራዝሙ ወይም `backoffLevel`ን ሁለት ጊዜ እንዳይጨምሩ ይከላከላል።

**የተጓዳኝነት ገደብ 429ዎች የመጠባበቂያ ደረጃውን አይወጡም።** የምላሹ ይዘት
የተጓዳኝነት ገደብን ("በጣም ብዙ ተጓዳኝ ጥያቄዎች", "የተጓዳኝነት ገደብ", "የትይዩ ጥያቄ
ገደብ", GLM `并发数过高`) የሚያመለክት `429`፣ መለያው ጤናማ ቢሆንም በሥራ ላይ እንደሆነ ያሳያል።
`checkFallbackError()` ምክንያቱን `concurrency_limited` አድርጎ ይመልሳል፦ አሁን ወደሚቀጥለው
ግንኙነት ቀይር፣ ይህንን ለቋሚ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ወይም ከላይኛው
አገልግሎት ለመጣው የዳግም ሙከራ ፍንጭ አቀዝቅዝ፣ `backoffLevel`ን ሳይቀየር አቆይ፣ እና `skipProviderBreaker`ን አዘጋጅ።
ግልጽ የኮታ ምላሽ ይዘት አሁንም ቅድሚያ ይወስዳል፤ ስለዚህ ከኮታ ጥለት ጋርም የሚዛመድ የምላሽ ይዘት የኮታ
ውሳኔ ሆኖ ይቆያል። ማወቂያ፦ `src/shared/utils/classify429.ts` ውስጥ `looksLikeConcurrencyLimit()`፤
ውሳኔ፦ `open-sse/services/accountFallback/concurrencyLimit429.ts`። `classify429()` (የሰርኪዩት
ብሬከሩ `FailureKind`) አልተቀየረም፣ እና ለእነዚህ የምላሽ ይዘቶች አሁንም `rate_limit` ያነባል።

**የዥረት ይዘት መቆም መለያውን አያቀዘቅዘውም።** የይዘት መቆም ተቆጣጣሪው
(`open-sse/utils/streamHandler.ts`) በተፈለገው ጊዜ ውስጥ ምንም የሞዴል ውጤት ያልላከ ዥረትን
ተስፋ ሲቆርጥ፣ `markAccountUnavailable()` ስህተቱን በግንኙነቱ ላይ ይመዘግባል፣ ነገር ግን
ምንም የማቀዝቀዣ ጊዜ አያዘጋጅም፦ መቆሙ የዚያ ጥያቄ ነው፣ አብዛኛውን ጊዜም ገና
ውጤት ያልሰጠ ረጅም የማመዛዘን ዙር ነው። ኦፕሬተሮች `resilienceSettings.streamStallCooldown.enabled`ን
(ነባሪ `false`) በመጠቀም እንደገና ማንቃት ይችላሉ።

**የማመዛዘን ፍሬሞች የይዘት መቆም ጊዜ በጀትን ዳግም ያስጀምራሉ።** የማመዛዘን ሞዴል የመጀመሪያውን
የሚታይ ቶከን ከማሳየቱ በፊት ለደቂቃዎች ሊያስብ ይችላል፦ Claude የማሰቢያ ጽሑፋቸው
ባዶ ሊሆን የሚችል `thinking_delta` ፍሬሞችን ይልካል፣ እና Responses API አንድ የማመዛዘን ንጥልን ከሌላው
በኋላ ይልካል። `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) እነዚህን
ፍሬሞች ይለያል፣ እና ተቆጣጣሪው ዙሩን ከመሰረዝ ይልቅ በእያንዳንዳቸው ላይ የጊዜ በጀቱን ዳግም ያስጀምራል።
እነሱ አሁንም የሞዴል ውጤት አይደሉም፤ ስለዚህ በማመዛዘን ብቻ የሚያበቃ ዙር አሁንም
እንደ ባዶ ሪፖርት ይደረጋል፣ እና ማመዛዘንን አቁሞ የልብ ምት ምልክቶችን ብቻ መላክ የሚቀጥል ዙር አሁንም
ተቆጣጣሪውን ያስነሳል።

ባዶ ያልሆነ ፊርማ ያላቸው የKiro ሁለትዮሽ `reasoningContentEvent` ፍሬሞች ይህንን
የማመዛዘን እንቅስቃሴ በአስፈጻሚው ውስጥ እንደ ባዶ `reasoning_content` ለውጥ ጠብቀው ያቆያሉ። ፊርማው
ወደፊት አይተላለፍም። ሜታዳታ፣ ያልተሟሉ ፍሬሞች እና ባዶ ፊርማዎች የይዘት
ጊዜ በጀቱን ዳግም አያስጀምሩም፤ ገለልተኛው የንቁ ዥረት ጊዜ ማብቂያ እና የደንበኛ ስረዛ አሁንም
ተፈጻሚ ናቸው (`open-sse/executors/kiro/reasoning.ts`)።

**የመጨረሻ ሁኔታዎች (የማቀዝቀዣ ጊዜዎች አይደሉም):**

- `banned` — በታገደ ቁልፍ ቃል / የመለያ እገዳ ማወቂያ (ይመልከቱ [BAN_DETECTION](../security/BAN_DETECTION.md))፣ እና በሦስት ተከታታይ ከላይኛው አገልግሎት በሚመጡ የእያንዳንዱ ጥያቄ ውድቅ ማድረጎች (`request_rejected`፣ ለምሳሌ Anthropic OAuth 403 "ጥያቄው አልተፈቀደም" — `open-sse/services/requestRejectedStreak.ts`) ይዘጋጃል፤ አንድ ውድቅ ማድረግ ግንኙነቱን ለጊዜው ብቻ ያቀዘቅዘዋል
- `expired` (ከተወሰኑ ዳግም ሙከራዎች በኋላ ወደ የመጨረሻ ሁኔታ ይሸጋገራል — `EXPIRED_RETRY_MAX = 3` ከኤክስፖነንሻል መጠባበቂያ ጋር — ስለዚህ ጊዜያዊ የOAuth ስህተቶች መለያው በቋሚነት ከመቦዘኑ በፊት ራሳቸውን ማስተካከል ይችላሉ)
- `credits_exhausted`

እነዚህ የመግቢያ ማረጋገጫዎቹ እስኪቀየሩ ወይም ኦፕሬተር ዳግም እስኪያስጀምራቸው ድረስ ይቆያሉ። የመጨረሻ ሁኔታዎችን በጊዜያዊ የማቀዝቀዣ ሁኔታ አትተኩ።

**ሰነፍ መልሶ ማግኛ:** `rateLimitedUntil` ካለፈ በኋላ ግንኙነቱ እንደገና ብቁ ይሆናል። በስኬት ጥቅም ላይ ሲውል፣ `clearAccountError()` ሁሉንም የስህተት መስኮች ያጸዳል።

### የClaude OAuth የአጠቃቀም ግድግዳ፦ ዝቅተኛ ቅድሚያ ያለው መስመር + የክፍለ ጊዜ ገደብ ዳግም ማስጀመር

**ወሰን:** አንድ የClaude የደንበኝነት ምዝገባ (OAuth) ግንኙነት። ሁለቱም ባህሪያት **ለእያንዳንዱ
ግንኙነት በፈቃድ የሚነቁ** ናቸው (ግንኙነት አርትዕ → Claude ክፍል → `providerSpecificData` ውስጥ `lowPriorityMode` / `autoLimitReset`፣
ሁለቱም በነባሪ ጠፍተዋል) እና የClaude Code `/low-priority` እና
`/limit-reset` ትዕዛዞችን ያንጸባርቃሉ (የሽቦ ውል ከClaude Code 2.1.263 ተቀርጿል)።

**አተገባበር:**

- የሁኔታ ማሽን + የምላሽ ምደባ፦ `open-sse/services/claudeLowPriority.ts`
- የዳግም ማስጀመሪያ ሁኔታ/የይገባኛል ጥያቄ ደንበኛ፦ `open-sse/services/claudeLimitReset.ts`
- የአስፈጻሚ ማያያዣ (የራስጌ ማስገባት + በተመሳሳይ መለያ ዳግም መሞከር)፦ `open-sse/executors/base.ts::execute()`
- በፈቃድ ማንቃትን ማቆየት፦ `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**አስነሺ:** የ5-ሰዓት የአጠቃቀም ግድግዳ — ራስጌዎቹ
`anthropic-ratelimit-unified-status: rejected`ን የያዙ እና፣ መለያው ብቁ ሲሆን፣
`anthropic-ratelimit-unified-slow-offer: treatment`ን የያዙ `429`። ከዚያ የመጀመሪያ የግድግዳ
429 በፊት ምንም ነገር አይላክም፤ የተዋሃዱ ራስጌዎች የሌሉት ድንገተኛ 429 በመደበኛው የማቀዝቀዣ መንገድ ያልፋል።

**ዝቅተኛ ቅድሚያ ያለው መስመር** (`lowPriorityMode`):

- የwall 429 ሲከሰት executor ቅናሹን ይቀበልና `anthropic-usage-limit: slow` በመጠቀም ወዲያውኑ **ተመሳሳዩን**
  account እንደገና ይሞክራል፤ የታወጀው `anthropic-ratelimit-unified-reset` (+60s የእፎይታ ጊዜ)
  እስኪያልፍ ድረስ lane ንቁ ሆኖ ይቆያል፣ እና በዚያ መስኮት ውስጥ ያለ እያንዳንዱ request
  header ይይዛል። የተጠለፈው 429 ወደ `handleChatCore` ፈጽሞ አይደርስም፣ ስለዚህ connection
  ወደ cooldown **አይገባም** እና በሌላ አይተካም።
- በኋለኞቹ responses ላይ `anthropic-ratelimit-unified-slow-status`፦ `active` / `not_needed`
  lane-ን ያቆያሉ፤ `slot_busy` (429) ወይም `529` በserver የተገለጸውን
  `anthropic-ratelimit-unified-slow-retry-after` (ነባሪ 20s፣ ከ5–600s ገደብ፣ ±30% jitter)
  ጠብቀው እንደገና ይሞክራሉ፤ ይህም በ`anthropic-ratelimit-unified-slow-max-wait`
  (ነባሪ 20 min፣ ከ1 min–6 h ገደብ) የተወሰነ ነው — ከዚያ በኋላ lane ያበቃል እና
  የ10 ደቂቃ cool-off እንደገና መቀበልን ያግዳል። የጥበቃ ጊዜው በrequest የራሱ
  upstream-start timeout (`resolveFetchStartTimeout`፣ በነባሪ 10 min) ከቀረው ጊዜ ላይ
  5 s በመቀነስ በተጨማሪ ይገደባል፦ ያለዚህ ገደብ የ20 ደቂቃው ነባሪ max-wait
  ከrequest በላይ ይቆይና sleep በጥበቃው መካከል ይቋረጣል፤ ይህም ለስላሳው
  `max_wait` ማብቂያ + cool-off ፈንታ `TimeoutError` እንዲታይ ያደርጋል።
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`፣ የ5h-window rollover፣ ወይም
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (አሁን የሚከፈልበት overage
  wall-ን ስለሚሸፍን፣ በማንኛውም status እንደ `extra_usage` ሆኖ ያበቃዋል) lane-ን ያበቃሉ፤
  ከዚያ response ወደ መደበኛው cooldown መንገድ ይፈሳል። `budget_exhausted` የታወጀው
  budget reset እስኪደርስ ድረስ (≤ 8 days) ይታወሳል።
- የwall ምርመራው ከexecutor የራሱ በ400 የሚነሱ intra-attempt retries (context
  editing፣ thinking/effort clamps፣ param auto-learn) በኋላ ይሠራል፣ ስለዚህ ከእነዚያ
  retries በአንዱ ላይ ብቻ የሚታይ wall 429 ወደ cooldown መንገዱ ከመድረሱ ይልቅ
  አሁንም ይጠለፋል።
- State ለእያንዳንዱ connection በmemory ውስጥ ነው (restart እንደገና ለመቀበል
  አንድ ተጨማሪ wall 429 ያስከፍላል)።

**የSession-limit reset** (`autoLimitReset`፣ ሁለቱም ሲበሩ ከlane በፊት ይሞከራል)፦

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block፤ `arm: "reset"` እና `available: true` ሲሆኑ፣
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ከ
  `{ "program": "juniper_tide" }` ጋር (የorganization UUID ከ
  `providerSpecificData.organizationUUID`፣ bootstrap fallback)።
- `result: reset|not_limited` → request በሙሉ ፍጥነት እንደገና ይሞከራል (slow header የለም)።
  `already_used` / `not_offered` `next_available_at`-ን ያስታውሳሉ (ነባሪ አንድ ሳምንት)፤
  ማንኛውም ውድቀት ለ15 ደቂቃ backoff ያደርጋል። reset በሳምንት አንድ ጊዜ ነው
  እና አሁንም በweekly limit ላይ ይቆጠራል።

የRegression guards፦ `tests/unit/claude-low-priority-mode.test.ts`፣
`tests/unit/claude-limit-reset.test.ts`፣ `tests/unit/claude-low-priority-executor.test.ts`።

### የSession affinity (#7274)

**ወሰን፦** አንድ client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)
ለ**ማንኛውም** provider ከአንድ connection ጋር ይሰካል።

**ዓላማ፦** ባለብዙ-turn agent (Claude Code፣ aider፣ custom agents) በrequests መካከል
በተመሳሳይ account ላይ እንዲቆይ ማድረግ፣ በዚህም የcross-account context መጥፋትን እና
በእያንዳንዱ account የsession state ባላቸው providers ላይ የሚደጋገሙ cold-start 429s-ን
መቀነስ።

**አተገባበር፦**

- የTTL መወሰን፦ `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- የPin ምርጫ/ፈጠራ፦ `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- የHeader ማውጣት (አጠቃላይ፣ ማንኛውም provider)፦ `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ቋሚ pin table፦ `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting፦ `sessionAffinityTtlMs` (ዓለም አቀፍ TTL በms፣ `0` ያሰናክላል) — `src/lib/db/settings.ts`።
  ከCodex-ብቻ `codexSessionAffinityTtlMs` በmigration `124_generic_session_affinity_ttl.sql`
  እንደገና ተሰይሟል፤ ይህም ከዚህ በፊት የተዋቀረ ማንኛውንም Codex TTL እንደ አዲሱ
  ነባሪ ያስተላልፋል።

ከ#7274 በፊት፣ `resolveSessionAffinityTtlMs()` ከ`codex` በስተቀር ለሁሉም providers ወዲያውኑ
`0` ይመልስ ነበር፤ ስለዚህ pinning mechanism እና header extraction ከወዲሁ
provider-agnostic ቢሆኑም፣ የTTL setting (እና session headers) በሌሎች ቦታዎች ላይ ምንም
ተጽዕኖ አልነበራቸውም። ማስተካከያው ያንን early-return አስወግዷል፤ TTL ከላይ
በዓለም አቀፍ ደረጃ ከ`0` በላይ ከተዋቀረ በኋላ አሁን ለእያንዳንዱ provider
በእኩልነት ይተገበራል።

ሦስቱ የsession-affinity headers ወደ upstream ፈጽሞ አይተላለፉም — executors የclient
headers-ን እንዳሉ ከማስተላለፍ ይልቅ የራሳቸውን upstream headers ከባዶ ይገነባሉ፤
ስለዚህ ይህ እንደ ውስጣዊ correlation id ብቻ ይቆያል።

### ብቸኛ የmanaged session connection leases

**ወሰን፦** አንድ ንቁ managed HTTP client/session አንድ ብቁ OmniRoute connection
በባለቤትነት ይይዛል።

**ዓላማ፦** በrequests መካከል ጥብቅ የrouting ድንበር ለሚፈልጉ clients ዘላቂ ብቸኛ
የconnection ባለቤትነትን ማቅረብ። ይህ ለስላሳ የcontinuity ምርጫ ከሆነው
session affinity ይለያል፦ ብቸኛ lease የlifecycle state-ን በSQLite ውስጥ በቋሚነት
ያስቀምጣል፣ የዓለም አቀፍ active-owner እና active-connection ልዩነትን ያስገድዳል፣
እና ከprovider dispatch በፊት stale generation-ን ውድቅ ያደርጋል።

ባህሪው ለእያንዳንዱ API key በምርጫ የሚነቃ ነው። managed key የ`lease:exclusive`
scope እና ግልጽ የሆነ ባዶ ያልሆነ `allowedConnections` list ሊኖረው ይገባል። ማንኛውም
HTTP client lifecycle endpoint-ን መጠቀም ይችላል፤ የclient ስም፣ user-agent፣ provider፣
OAuth method ወይም model አያስፈልግም። lease ባለቤት የሚሆነው connection-ን እንጂ
model-ን አይደለም፤ ስለዚህ connection በመደበኛነት ብቁ ሆኖ እስከቆየ ድረስ
የmodel ለውጥ binding-ን ያቆያል። መደበኛዎቹ የmodel፣ quota፣ health፣ cooldown እና
allowlist ደንቦች የበላይ ሆነው ይቀጥላሉ፣ እና ተመሳሳዩን generation ወደ ሌላ ነጻ
ብቁ connection ሊያሸጋግሩት ይችላሉ።

የሕይወት ዑደቱ `POST /api/v1/session-leases` ሲሆን፣ `acquire`፣ `renew` እና `release` የJSON ድርጊቶችን ይጠቀማል።
የሚተዳደሩ የኢንፈረንስ ጥያቄዎች ግልጽ ያልሆነውን `X-OmniRoute-Lease-Owner` እሴት እና ትክክለኛውን
`X-OmniRoute-Lease-Generation` ያቀርባሉ። ባለቤቱ `vlo_`ን ተከትለው 43 የbase64url ቁምፊዎችን ይጠቀማል፤ የሚከማቸው
የእሱ SHA-256 ሃሽ ብቻ ነው። እያንዳንዱ የመጨረሻ ማስተላለፊያ አጥር የተረጋገጠውን የAPI ቁልፍ ID እና
ንቁውን የግንኙነት ID ያስተሳስራል። የሊዝ መቆጣጠሪያ ራስጌዎች ከምዝግብ ማስታወሻዎች፣ ከሚቆዩ የጥያቄ ቅጽበተ-ምስሎች እና
ከላይኛው የአስፈጻሚ ራስጌዎች ይወገዳሉ።

መደበኛ ራውቲንግ ብቁ የሚተዳደሩ እጩዎች ቢኖሩትም፣ እያንዳንዱ ነፃ እጩ
በሌላ ወገን ንቁ ሊዝ ከተያዘ፣ OmniRoute HTTP `429`፣ lease-capacity-unavailable ኮድ፣
waiting-for-capacity ሁኔታ እና ከቅርቡ ተዛማጅ የማብቂያ ጊዜ የተወሰደ የተገደበ `Retry-After` ይመልሳል።
መደበኛ ባዶ ብቁነት የሊዝ ፉክክር አይደለም፣ እናም ነባሩን የራውቲንግ ስህተት ትርጉም እንደነበረ ያቆያል።

ተዛማጅ ስልቶች ተለያይተው ይቆያሉ፦

- የOAuth ክፍለ ጊዜ ስራ መያዝ ለOAuth መለያዎች በሂደት ውስጥ ብቻ የሚሰራ ለስላሳ ስርጭት ነው።
- የመለያ ሴማፎሮች የጥያቄ ትይዩነት ፈቃዶችን ይሰጣሉ፣ እና ጥያቄው ሲጠናቀቅ ያበቃሉ።
- ብቸኛ የሚተዳደሩ የክፍለ ጊዜ ሊዞች በትውልድ አጥር የተጠበቀ ዘላቂ የሕይወት ዑደት ባለቤትነት ናቸው።

---

## 3. የሞዴል መቆለፍ

**ወሰን:** አቅራቢ + ግንኙነት + ሞዴል ጥምረት።

**ቁልፍ ወሰን በሁኔታ ኮድ:** የውድቀቱ ሁኔታ ኮድ መቆለፊያው በየትኛው ቁልፍ ላይ እንደሚጻፍ
ይወስናል (`resolveLockoutScope()` በ `open-sse/services/accountFallback/exactModelLock.ts` ውስጥ):

- `429` / `403` / `402` — የኮታ ወይም የመብት ምልክት — **የኮታ ቤተሰቡን** ይቆልፋሉ፦
  ለ codex ሙሉውን `codex` / `spark` ወሰን (በግንኙነቱ ውስጥ ያሉ ሁሉንም `gpt-5*` ሞዴሎች)፣
  ለሌሎች አቅራቢዎች `getQuotaScopedModelForProvider()`።
- `404` መሠረታዊውን ሞዴል ይቆልፋል (`getModelLockKey()` `not_found`ን ያጠባል)።
- ማንኛውም ሌላ ሁኔታ ኮድ — የ`5xx` ማጓጓዣ/አገልጋይ ውድቀቶች እና ከጥራት ማረጋገጫ
  በOmniRoute ራሱ የተፈጠረው `502` — **ትክክለኛውን**
  የአቅራቢ/ግንኙነት/ሞዴል ጥምረት ብቻ ይቆልፋል። በአንድ ሞዴል ላይ ያለ መጥፎ ዥረት
  ስለመለያው ኮታ ማስረጃ አይደለም፤ ከዚህ ደንብ በፊት በ
  `codex/gpt-5.6-luna` ላይ አንድ ባዶ ምላሽ የዚያን ግንኙነት እያንዳንዱን `gpt-5*` ሞዴል
  ከማዘዋወሪያ ለ2–30 ደቂቃ (እየጨመረ) ያስወግድ ነበር፣ ኮታው ግን አልተነካም።
- ደዋዩ በግልጽ ያስቀመጠው `scope` አማራጭ ሁልጊዜ ቅድሚያ ይኖረዋል (Antigravity `"exact"`ን ያስተላልፋል)።

**ዓላማ:** አንድ ሞዴል ብቻ በማይገኝበት ወይም በኮታ በተገደበበት ጊዜ ሙሉውን ግንኙነት ከማሰናከል መቆጠብ።

**ምሳሌዎች:**

- ለእያንዳንዱ ሞዴል ኮታ የሚያደርጉ አቅራቢዎች `429` ሲመልሱ
- የአካባቢ አቅራቢዎች ላልተገኘ አንድ ሞዴል `404` ሲመልሱ
- ለአቅራቢው የተለዩ የሁነታ/ሞዴል ፈቃድ ውድቀቶች (ለምሳሌ፣ Grok ሁነታዎች)

**አተገባበር:** `open-sse/services/accountFallback.ts` — `lockModel()`፣ `clearModelLock()`፣ `getAllModelLockouts()`።

### የሞዴል ማቀዝቀዣዎች ዳሽቦርድ (v3.8.0)

UI: ቅንብሮች → የሞዴል ማቀዝቀዣዎች (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ንቁ መቆለፊያዎችን ከሚከተሉት ጋር ይዘረዝራል፦ አቅራቢ፣ ግንኙነት፣ ሞዴል፣ ምክንያት፣ expiresAt። ኦፕሬተሮች ከካርዱ ላይ ሞዴልን በእጅ እንደገና ማንቃት ይችላሉ።

**REST API:**

- `GET /api/resilience/model-cooldowns` — ንቁ መቆለፊያዎችን መዘርዘር
- `DELETE /api/resilience/model-cooldowns` — በእጅ እንደገና ማንቃት። የጥያቄ አካል፦ `{provider, connection, model}`። ማረጋገጫ፦ አስተዳደር።

### የማቀዝቀዣ አስተዳዳሪ

UI: ክትትል → የማቀዝቀዣ አስተዳዳሪ (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)።

እያንዳንዱን የአቅራቢ ገጽ ከመክፈት ይልቅ፣ በጊዜያዊ ምክንያት ከማዘዋወሪያ የወጣውን
እያንዳንዱን ግንኙነት የሚያሳይ አንድ ገጽ። የግንኙነት ማቀዝቀዣዎችን፣ የሞዴል መቆለፊያዎችን እና ተርሚናል
ሁኔታዎችን ይዘረዝራል፤ በእያንዳንዱ ግንኙነት፣ ለተመረጡት ወይም ለአንድ አቅራቢ ግንኙነቶች በሙሉ
ያጸዳቸዋል፤ እንዲሁም በጣም የሚስተካከሉትን የማቀዝቀዣ ደንቦች ያርታል፦ `streamStallCooldown.enabled` እና የOAuth / API-key
`connectionCooldown` መሠረታዊ ማቀዝቀዣና ከፍተኛውን የኋላ-መመለስ ደረጃዎች (በ
`PATCH /api/resilience` በኩል ይቀመጣሉ)። ተርሚናል ሁኔታዎች (`banned`፣ `expired`፣ `credits_exhausted`) ይዘረዘራሉ
ነገር ግን እዚህ ፈጽሞ አይጸዱም።

**REST API** (`src/lib/resilience/cooldownManager.ts`፣ ማረጋገጫ፦ አስተዳደር):

- `GET /api/resilience/cooldowns[?provider=]` — ሁኔታ፣ የቀረው የማቀዝቀዣ ጊዜ፣
  የኋላ-መመለስ ደረጃ፣ የመጨረሻው ስህተት ዓይነት እና የሞዴል መቆለፊያዎች ያሏቸው ግንኙነቶች (የመግቢያ ማስረጃዎች ሳይኖሩ)
- `POST /api/resilience/cooldowns` — የጥያቄ አካል `{connectionIds: string[]}` ወይም
  `{all: true, provider?}`፤ `{cleared, unchanged, skippedTerminal, lockoutsCleared}`ን ይመልሳል

### የመቆለፊያ ቅንብሮች UI + በስኬት-መቀነስ ማገገሚያ (v3.8.23)

የሞዴል መቆለፍ ሁልጊዜ ከሚሠራ በኮድ ውስጥ ቋሚ ተደርጎ ከተቀመጠ ባህሪ ወደ ሙሉ በሙሉ ሊዋቀር የሚችል፣
በፈቃድ የሚነቃ ባህሪ ተቀይሯል፤ የራሱ የቅንብሮች ካርድ እና ራሱን የሚጠግን የማገገሚያ መንገድም አለው።

**የቅንብሮች ካርድ:** ቅንብሮች → የሞዴል መቆለፍ
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)።
ይህ ከላይ ካለው ለንባብ ብቻ የሆነ `ModelCooldownsCard` (ንቁ መቆለፊያዎችን ብቻ
_ከሚዘረዝረው_) **የተለየ** ነው — አዲሱ ካርድ _መለኪያዎቹን ያዋቅራል_። ነባሪዎቹ
በ `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ውስጥ ይገኛሉ፦

| ቅንብር                    | ነባሪ                              | ትርጉም                                              |
| ----------------------- | -------------------------------- | ------------------------------------------------- |
| `enabled`               | `false`                          | ዋና መቀያየሪያ — የሞዴል መቆለፍ **በነባሪ ጠፍቷል**።              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | እንደ ሞዴል-ወሰን ውድቀት የሚቆጠሩ የላይኛው ምንጭ ሁኔታ ኮዶች።         |
| `baseCooldownMs`        | `120_000` (120 ሰ)                | ለመጀመሪያው ውድቀት የመነሻ መቆለፊያ ቆይታ።                      |
| `maxCooldownMs`         | `1_800_000` (30 ደቂቃ)             | በጨመረው የማቀዝቀዣ ጊዜ ላይ ያለው ከፍተኛ ገደብ።                  |
| `maxBackoffSteps`       | `10`                             | ከፍተኛው የኤክስፖነንሻል ኋላ-መመለስ ማሳደጊያ ደረጃዎች።              |
| `useExponentialBackoff` | `true`                           | ተደጋጋሚ ውድቀቶች የማቀዝቀዣ ጊዜውን በኤክስፖነንሻል መልኩ ያሳድጉ እንደሆነ። |

ቅንብሮቹ በመደበኛው የቅንብሮች ማከማቻ በኩል ይቀመጣሉ፣ እንዲሁም በ
የጽናት ቅንብሮች ንድፈ መዋቅር ይረጋገጣሉ፤ ካርዱ `baseCooldownMs`/`maxCooldownMs`ን
(`maxCooldownMs ≥ baseCooldownMs` እንዲሆን) እና `maxBackoffSteps`ን በተፈቀደው ክልል ውስጥ ይገድባል።

**በስኬት-መቀነስ ማገገሚያ:** ማገገሚያው የሰዓት ቆጣሪው በማብቃቱ ላይ ብቻ **አይመሠረትም**። ጤናማ
ምላሽ የሞዴሉን የውድቀት ብዛት ቀስ በቀስ ይቀንሳል፤ ስለዚህ በጊዜ መስኮቱ
መካከል ያገገመ ሞዴል የጊዜ ገደቡ ከማብቃቱ በፊት መጨመሩን ያቆማል (እና ይጸዳል)። ስኬታማ
የጥምረት ዒላማ ሲኖር፣ `open-sse/services/combo.ts` `decayModelFailureCount()`ን
(`open-sse/services/accountFallback.ts`) ይጠራል፤ ይህም የተከማቸውን
`failureCount` **በግማሽ ይቀንሳል** (`Math.floor(failureCount / 2)`)፤ `0` ሲደርስ የመቆለፊያ
መዝገቡ ሙሉ በሙሉ ይሰረዛል። ተጓዳኙ `recordModelLockoutFailure()`
በማሳደጊያ ጊዜ መስኮቱ ውስጥ ውድቀቶች ሲከሰቱ ብዛቱን ይጨምራል (የማቀዝቀዣ ጊዜውንም ያሳድጋል)።
ይህ በስኬት-መቀነስ ማገገሚያ ከቀላል የጊዜ ገደብ ማብቃት በተጨማሪ ነው —
ከሁለቱ መንገዶች ማንኛውም ሞዴሉን እንደገና ሊያነቃ ይችላል።

**ሁኔታ:** መቆለፊያዎቹ **በማህደረ ትውስታ ውስጥ** ይያዛሉ (በእያንዳንዱ ሂደት `Map`ዎች፤
`ModelLockoutEntry` በ `provider:connectionId:model` የተቀየሰ፣ ትክክለኛ-ወሰን መቆለፊያዎች ደግሞ በ
`provider:connectionId:exact:model` የተቀየሱ ናቸው)፣ ወደ
DB አይቀመጡም — ዳግም ሲጀመር ይጠፋሉ። _ቅንብሮቹ_ ይቀመጣሉ፤ ንቁው
የመቆለፊያ _ሁኔታ_ ጊዜያዊ ነው።

---

## 4. የQuota-Share በአንድ ጊዜ ማስኬድ ቁጥጥር (v3.8.36)

የደንበኝነት ምዝገባ መለያዎች (GLM፣ MiniMax፣ ወዘተ) ብዙውን ጊዜ ~1–3 በአንድ ጊዜ
የሚላኩ ጥያቄዎችን ብቻ ይቀበላሉ፤ ይህን ማለፍ 429ዎችን እና የcooldown ጊዜዎችን ያስነሳል። ይህ
በተለይ በ**quota-share** (`qtSd/…`) combos ስር ከባድ ነው፤ በዚህም በርካታ API keys አንድ upstream
መለያ ይጋራሉ። ሶስት ንብርብሮች የጋራ መለያው በጥያቄዎች እንዳይጥለቀለቅ ያደርጋሉ።

### የእያንዳንዱ connection በአንድ ጊዜ ማስኬድ ገደብ (`max_concurrent`)

እያንዳንዱ provider connection የ`max_concurrent` ከፍተኛ ገደብ ሊያውጅ ይችላል
(`provider_connections.max_concurrent`፣ በconnection modal / API / DB ውስጥ የሚዋቀር)።
ገደብ እንዳይኖር ባዶ ይተዉት። ከታች ያለውን serialization
ንብርብር የሚቆጣጠረው ዋና ማስተካከያ ይህ ነው — ወደ መለያው እውነተኛ የአንድ ጊዜ ማስኬድ አቅም ያዋቅሩት (ለምሳሌ GLM ~1፣ MiniMax ~2)።

### የእያንዳንዱ model በአንድ ጊዜ ማስኬድ ገደቦች (`modelConcurrency`)

አንድ connection በ`rateLimitOverrides` map ውስጥ ለእያንዳንዱ model ትክክለኛ የአንድ ጊዜ ማስኬድ ገደቦችን
በተጨማሪ ሊያውጅ ይችላል፦

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

በconnection modal (**Rate limit overrides → Per-model
concurrency caps**፣ በእያንዳንዱ መስመር አንድ `model=cap`) ውስጥ ወይም ተመሳሳይ JSON ቅርጽን በመጠቀም
`PATCH /api/providers/[id]` በኩል ያዋቅሩት። የkey ትርጉሞች፦

- **ለconnection አጠቃላይ ከሆነው ገደብ ጋር ለmodel የተወሰነው፦** `maxConcurrent` የጋራ
  የconnection አጠቃላይ ከፍተኛ ገደብ ሆኖ ይቆያል። ሁለቱም ሲተገበሩ፣ ሁለቱም gates በተመሳሳይ composite gate ውስጥ
  በአንድ ክዋኔ ይያዛሉ
  (`global → provider → account → model`)፤ በተግባር የሚሠራው ይበልጥ
  ጥብቅ የሆነው ተፈጻሚ ገደብ ነው።
- **ትክክለኛ የmodel-key ማዛመድ፦** keyው የrouting resolution ከተጠናቀቀ በኋላ ለ
  executor የሚተላለፈው የmodel string ነው — በመደበኛነት ባዶው upstream model id
  (`glm-5`) እንጂ በclient በኩል ያለ `provider/model` alias አይደለም (`zai/glm-5` ከ
  `glm-5` ጋር አይዛመድም)። Values የአዎንታዊ ኢንቲጀር በአንድ ጊዜ የሚከናወኑ ጥያቄዎች ገደቦች ናቸው።
- **አካባቢያዊ queueing፣ discovery የለም፦** ከመጠን በላይ የሆኑ ጥያቄዎች በነባሩ
  የqueue/timeout አሠራር መሠረት በአካባቢው queue ውስጥ ይጠብቃሉ (type ያላቸው `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` የadmission ስህተቶች)። OmniRoute የupstream policyን አያገኝም ወይም
  አይገምትም — ኦፕሬተሩ ያዋቀራቸውን ትክክለኛ ገደቦች ያስፈጽማል። የሞላ model gate providerን ፈጽሞ አያሰናክልም እንዲሁም
  ቋሚ የmodel lockout አይፈጥርም፤ የupstream 429/cooldown/fallback ባህሪ
  እንደ የስህተት የመጨረሻ መከላከያ ይቆያል።
- **የእያንዳንዱ connection፣ የእያንዳንዱ process ወሰን፦** caps ለእያንዳንዱ database connection የተለዩ ሲሆኑ
  በmemory ውስጥ ይያዛሉ፤ ስለዚህ ተመሳሳዩን upstream API key ዳግም የሚጠቀሙ ሁለት connections
  እርስ በርሳቸው አይቀናጁም።
- **ያልተዋቀረ ማለት ምንም ለውጥ የለም፦** mapን አለማካተት (ወይም የdashboard fieldን ባዶ መተው)
  ምንም model gate አይጨምርም። ምንም ዓለም አቀፍ የprovider ገደብ ሳይወሰን የሚደረግ የምሳሌ configuration፦

```text
glm-5=1
glm-4.7=3
```

### የQuota-share ጥያቄ serialization

የquota-share dispatch አዎንታዊ
`max_concurrent` ያወጀ connectionን ሲያነጣጥር፣ ወደዚያ **account** በአንድ ጊዜ የሚላኩ ጥያቄዎች በ
የእያንዳንዱ connection semaphore (key `qsconn:<connectionId>`) በኩል በተራ ይስተናገዳሉ፦ ከመጠን በላይ የሆኑ ጥያቄዎች መለያውን ከማጥለቅለቅ ይልቅ **በ
queue ውስጥ ይጠብቃሉ**። ይህ **fail-open** ነው — የሞላ
queue ወይም timeout ሊላክ የሚችልን
ጥያቄ ፈጽሞ ከመከልከል ይልቅ ያለ slot እንዲቀጥል ያደርገዋል። በ**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`፣ በነባሪ ክፍት
ነው) ውስጥ ያብሩት ወይም ያጥፉት። የ`max_concurrent` cap ከሌለ ባህሪው አይቀየርም።

> የquota-share routing gate (`selectQuotaShareTarget`፣ DRR + P2C) ራሱ
> fail-open ሲሆን ገደቡ ላይ የደረሰ connectionን _ቅድሚያ ብቻ ይቀንስለታል_ — አንድ
> connection ብቻ ባለበት pool ውስጥ ጠንካራ ገደብ ማድረግ አይችልም፤ ስለዚህ ፍሰቱን በእውነት
> የሚይዘው ይህ semaphore ነው።

### Combo cooldownን ያገናዘበ retry

ለእያንዳንዱ combo strategy (ሲነቃ)፣ ለአጭር ጊዜ በሚቆይ transient cooldown 429ን
የሚያረጋግጥ ጥያቄ 429ን ከመመለስ ይልቅ cooldownው እስኪያልፍ ይጠብቃል እና እንደገና
dispatch ያደርጋል — ይህ በmulti-model combos ላይ ያሉ Gemini-class TPM/RPM windowsን (~60s retry-after)
ይሸፍናል፤ ለምሳሌ የ2-model combo ሁለቱም targets የእያንዳንዱ model
rate limit ላይ ሲደርሱ። በ**Settings → Resilience** ውስጥ ባለው `comboCooldownWait` (`enabled`፣ `maxWaitMs`፣ `maxAttempts`፣
`budgetMs`) የተገደበ ነው። በ`quota_exhausted`
(እስከ እኩለ ሌሊት locked) ወይም auth/not-found reasons ላይ ፈጽሞ አይጠብቅም።

ተመሳሳዩ gate ከdispatch በፊት ያለውን ሁኔታ (#16319) ይሸፍናል፦ ምንም ሙከራ ከመደረጉ በፊት የአንድ combo
እያንዳንዱ target የእሱ model በአጭር
transient lockout ውስጥ ስላለ ሲዘለል፣ zero-attempt path ምንም hint የሌለውን
`503 ALL_TARGETS_SKIPPED` ከመመለስ ይልቅ በተመሳሳዩ
ገደቦች ስር lockoutው እስኪያልፍ ይጠብቃል እና እንደገና dispatch ያደርጋል። መጠበቅ በማይፈቀድበት ጊዜ (ገደብ፣ ሙከራ ወይም budget
ካለቀ፣ ወይም featureው ከጠፋ)፣ terminal responseው ከመጀመሪያው
transient lock ማብቂያ `retry_after` / `reset_at`ን ይዞ ወደ
`429 rate_limit_error` ይሻሻላል፤ quota፣ auth እና not-found locks ምንም hint የሌለውን 503 ይዘው ይቆያሉ።

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

## 5. የጥያቄ ወረፋ መቀበያ ቁጥጥር (v3.8.49 · issue #6593)

**ወሰን**፦ ከላይ ካሉት ሦስት ስልቶች አንድ ደረጃ በታች ያለው፣ በአካባቢው የሚሠራው ለእያንዳንዱ provider+connection የተለየ የፍጥነት-ገደብ ወረፋ (`open-sse/services/rateLimitManager.ts`፣
በBottleneck የሚደገፍ)።

**`maxWaitMs` የወረፋ ጥበቃን ይገድባል፤ `executionMaxWaitMs` ደግሞ አፈጻጸምን ይገድባል።**
ሁለቱ ሆን ተብለው የተለዩ ሲሆኑ፣ አንዱ ሌላውን አይመግብም።

`resilienceSettings.requestQueue.maxWaitMs` **የወረፋ-ጥበቃ በጀት** ነው፦
የprovider ቦታን መጠበቅን እና ከዚያ QUEUED ሁኔታ ውስጥ መቆየትን ይሸፍናል፤ ሥራው QUEUEDን ትቶ ማስፈጸም በጀመረበት ቅጽበት የጊዜ ቆጣሪው ይሰረዛል
(`rateLimitManager.ts`፣ `wrappedFn`)። ይህን የሚያልፍ ጥያቄ upstreamን ፈጽሞ አይደርስም። ነባሪው 30000ms ሲሆን፣ በ`src/lib/resilience/settings.ts` ውስጥ ባለው `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ይቀርባል፣ እንዲሁም በ`tests/unit/ratelimit-admission-control-6593.test.ts` የተወሰነ ነው፤ ስለዚህ ለውጥ ሲደረግበት ይህ አንቀጽ ሳይታወቅ ጊዜው ያለፈበት ሆኖ ከመቅረት ይልቅ ሙከራው ይወድቃል።

`resilienceSettings.requestQueue.executionMaxWaitMs` Bottleneck እንደ ሥራው `expiration` የሚቀበለው ሲሆን፣ የጊዜ ቆጣሪው የሚጀምረው ከመላኩ በኋላ ብቻ ነው። የራሳቸው upstream ጊዜ-ማብቂያ ለሌላቸው አስፈጻሚዎች የመጨረሻ መከላከያ ነው፤ የአስፈጻሚው የራሱ የfetch-መጀመሪያ ጊዜ-ማብቂያ ከዚያ የሚረዝም ከሆነ ወደዚያ ይጨምራል፣ በመሆኑም ጤናማ እና በሂደት ላይ ያለ ምላሽን መቁረጥ አይችልም። ነባሪው 600000ms (10 ደቂቃ) ነው።

የወረፋ በጀቱን ወደ `expiration` ማስገባት ቀደም ሲል incremental ያልሆኑ gatewaysን በሂደት መሀል ይገድል የነበረው ነው — የመጀመሪያዎቹ ባይቶች ከመምጣታቸው በፊት በትክክል ለደቂቃዎች ይሠራሉ — እና expiration እንደ `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) የሚቀርበው፣ የወረፋ በጀቱ ግን የወረፋ-ጊዜ-ማብቂያ ኮዱን የሚይዘው በዚህ ምክንያት ነው። ከሁለቱ አንዱን በ`RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ወይም በdashboard
(**ቅንብሮች → የመቋቋም ችሎታ**) ይተኩ። ሁለቱም መደበኛ ቅርጽ ሲሰጣቸው በ1ms–24h መካከል ይገደባሉ።

**ለሁለቱም የቅድሚያ ቅደም ተከተል፦** env var የሚያቀርበው _ነባሪውን_ ብቻ ነው። በ`resilienceSettings.requestQueue` ውስጥ ቋሚ ተደርጎ የተቀመጠ እሴት (dashboard / API patch፣ በ`key_value` ውስጥ የተከማቸ) ከእሱ ቅድሚያ ያገኛል፤ ለእያንዳንዱ connection የተለየ
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ደግሞ ከዚያ ቅድሚያ ያገኛል። በdeployment ላይ አስቀድሞ ቋሚ የተደረገ እሴት እያለ env varን ማቀናበር ምንም ነገር አይለውጥም — በምትኩ ቋሚውን ቅንብር ያጽዱ ወይም ያዘምኑ።

በወረፋ ውስጥ የሚቆይበት ጊዜ በ`maxWaitMs` ይገደባል፤ ከታች ያለው `maxQueueDepth` ደግሞ በአንድ ጊዜ ስንት ጠሪዎች በወረፋ ሊቆዩ እንደሚችሉ ይገድባል።

**በbody የተገለጹ ድጋሚ ሙከራዎች፦ ማስተካከያ ጥበቃ ከመቆለፍ ጋር።** የ429 body የራሱን የጥበቃ ጊዜ ሊጠቅስ ይችላል
(Gemini `RetryInfo.retryDelay`፣ "retry after Ns" ጽሑፍ)፣ ይህንንም
`updateFromResponseBody` ያነባል። በconnection `maxWaitMs` ውስጥ የሚገባ ጥበቃ የማስተካከያ ጥበቃ ነው፦ limiter ለዚያ ጊዜ reservoirን ባዶ ያደርጋል፣ እና በወረፋ ያሉ ጥሪዎች እንደገና ሲሞላ ይላካሉ። ከ`maxWaitMs` የሚረዝም ጥበቃ ወረፋው ጠብቆ ሊያሳልፈው የሚችል አይደለም — Gemini ላለቀ ዕለታዊ quota
`retryDelay: "86399s"` ብሎ ይመልሳል። በድጋሚ በተገነባው 429 (#16528) ላይ የተላለፈው `Retry-After` የfallback engineን ሞዴሉን ለዚያ ጊዜ እንዲቆልፍ አስቀድሞ ያደርገዋል፤ ነገር ግን limiterንም ለዚያ ጊዜ ማቆም ቁልፉን ቀድሞ የሚደርስ ማንኛውንም ጥሪ (ለምሳሌ ከresilience reset በኋላ) ለሙሉ `maxWaitMs` ያስቆመዋል። እንዲህ ያለ ጥበቃ ከtyped Google `RetryInfo`
detail (የ`google_rpc_retry_info` provenance) ሲመጣ እና የቁልፉ limiter አስቀድሞ በሞዴሉ ወሰን ላይ ሲሆን (`getLimiterKey`ን ይመልከቱ)፣ 429ኙ በምትኩ በዚያ connection ላይ የሞዴል መቆለፊያ ይሆናል (`lockModelForLongBodyRetry` በ
`open-sse/services/rateLimitManager/bodyRetryPause.ts`፣ ከፍተኛው 24h)፣ limiterም ሳይቆም ይቀራል። የaccount ምርጫ በ`isModelLocked()` በኩል ያንን መቆለፊያ ያልፋል፤ በconnection ላይ ለተወሰኑ targets የcombo pre-dispatch gateም እንዲሁ ያደርጋል። limiterው ለእያንዳንዱ quota family የተለየ በሆነበት antigravity ላይ፣ እንደሌሎች quota locks ሁሉ መቆለፊያው ትክክለኛው ሞዴል ላይ ይሆናል። alias ወደዚያ ሞዴል ሲፈታው ደንበኛው የጠየቀው ስምም ይቆለፋል፤ ምክንያቱም እነዚያ ፍተሻዎች የተጠየቀውን ስም ይጠቀማሉ። በትክክል ይቆለፋል (`lockExactModel`)፣ ስለዚህ antigravity quota familyን ወይም codex scopeን የሚያቋርጥ alias የራሱን ፈጽሞ አይቆልፍም። በprose የተጻፈ ፍንጭ፣ untyped `retryDelay`፣ ወይም በሙሉ connection የሚጋራ limiter ማቆሙን ይቀጥላል። የ429 መንገድ አሁን እንደገና የገነባው limiter ሲቆም፣ ቀሪው የወረፋ ጊዜው ማቆሙ ከማብቃቱ በፊት የሚያልቅ ጠሪ ያንን ጊዜ እስኪያልቅ ከመጠበቅ ይልቅ ወዲያውኑ በወረፋ-ጊዜ-ማብቂያ ኮድ (`checkLimiterPause`) ውድቅ ይደረጋል፤ የተመዘገበው መጨረሻ limiterው ከመገንባቱ በፊት፣ Bottleneck የrefresh clockን በሚጀምርበት ቦታ ላይ ይመሠረታል፣ እና በኋላ reservoir ላይ የሚደረግ ማንኛውም ለውጥ ያንን ያስረሳዋል። በ
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` እና
`tests/unit/rate-limit-body-retry-pause.test.ts` ተሸፍኗል።

**`maxQueueDepth` — በምርጫ የሚነቃ የመቀበያ ገደብ (አዲስ)።** `resilienceSettings.requestQueue.maxQueueDepth`
ለአንድ provider+connection በአንድ ጊዜ ስንት ጥያቄዎች በወረፋ ውስጥ (ገና ሳይላኩ) ሊቆዩ እንደሚችሉ ይገድባል። ወረፋው አስቀድሞ `maxQueueDepth`
ጥያቄዎችን የያዘ ከሆነ፣ አዲስ ጥያቄ ወደ `limiter.schedule()` ከመድረሱ **በፊት** typed
`code: "RATE_LIMIT_QUEUE_FULL"` ስህተት በመስጠት ወዲያውኑ ውድቅ ይደረጋል — ስለዚህ ውድቅ ማድረጉ አነስተኛ ወጪ ያለው ሲሆን፣ ለዚያ ጥያቄ ማንኛውም downstream
prompt-compression / translation ሥራ ከመከናወኑ በፊት ይፈጸማል። ነባሪ `0` =
የተሰናከለ፣ አሁን ያለውን ገደብ-አልባ የወረፋ ባህሪ ይጠብቃል፤ ወሰኑ 0–100000 ነው። በ`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ወይም
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) ይተኩ።

የመቀበያ ፍተሻው ራሱ pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ስለሆነ፣ እውነተኛ Bottleneck limiter ሳያስፈልገው unit test ሊደረግበት ይችላል።

> #6593ን የከፈተው RFC የ`bypassCompressionOnRateLimit`
> ምልክትንም አቅርቦ ነበር። የዚህ repo `open-sse/services/compression/` pipeline
> በወጪ LLM ጥያቄ (`chatCore.ts`፣
> በ`resolveCompressionSettings`/`selectCompressionStrategy` block አካባቢ) ላይ የሚደረግ የprompt/context compression ነው፤
> በተፈጠሩ የ429 bodyዎች ላይ የሚደረግ የHTTP ምላሽ compression አይደለም — ለቀጥተኛ bypass ምልክት
> ተዛማጅ የcode path የለም። ያ የprompt-compression ደረጃም
> በአሁኑ ጊዜ በጥያቄው pipeline ውስጥ ከ`withRateLimit()` _በፊት_ ይሰራል፤ ስለዚህ
> queue ሙሉ በመሆኑ በሚከሰት ውድቅ ማድረግ ላይ እንዲዘለል ቅደም ተከተሩን መቀየር፣ ከዚህ issue ወሰን የተለየና ትልቅ
> ለውጥ ነው፤ እዚህ ሆን ተብሎ **አልተተገበረም**፣
> የCPU ቁጠባው ጥቅም የቅደም ተከተል ለውጥ አደጋውን የሚያስክስ ከሆነ እንደ ተከታይ ሥራ ተትቷል።

### የRate-Limit ራስ-ሰር ማንቃት የደህንነት መረብ እና የግንኙነት ጥበቃ (`rateLimitProtection`)

**ራስ-ሰር ማንቃት የደህንነት መረብ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`፣ ነባሪው `true`):
በነባሪ፣ OmniRoute ለሁሉም ንቁ የAPI-key provider ግንኙነቶች (`getProviderCategory(provider) === "apikey"`) የrate-limit queue ጥበቃን በራስ-ሰር ያነቃል። ይህም ለrate ስሱ የሆኑ upstream API keyዎች የሚገቡ ጥያቄዎች በድንገት በመብዛት upstream 429 ስህተቶችን ከማስከተል ይልቅ፣ በBottleneck በኩል queue ውስጥ እንዲገቡና ፍጥነታቸው እንዲገደብ ያረጋግጣል። የደህንነት መረቡ በ`RATE_LIMIT_AUTO_ENABLE` environment variable (`false`/`0`/`off` ያሰናክለዋል፣ `true`/`1`/`on` እንዲነቃ ያስገድዳል) ሊሻር ይችላል፤ ይህም በቋሚነት ከተቀመጠው የdashboard ቅንብር (**Settings → Resilience** / `PATCH /api/resilience`) ቅድሚያ ይኖረዋል።

**የእያንዳንዱ ግንኙነት `rateLimitProtection` ትርጉም፦**
የእያንዳንዱ ግንኙነት rate-limit ጥበቃ በprovider ግንኙነቶች ላይ ባለው `rateLimitProtection` boolean field (በSQLite ውስጥ እንደ `rate_limit_protection` በቋሚነት ይቀመጣል) ይከታተላል፦

- **በግልጽ ማብራት (`rateLimitProtection === true`)**፦ የprovider ምድብ ምንም ይሁን ወይም ራስ-ሰር ማንቃት የደህንነት መረቡ የነቃ ይሁን አይሁን፣ ለዚህ ግንኙነት rate-limit ጥበቃ በግልጽ ነቅቷል።
- **በግልጽ ማጥፋት (`rateLimitProtection === false`)**፦ በግልጽ የተደረገውን ጥበቃ ያሰናክላል፣ ነገር ግን ንቁ የAPI-key ግንኙነትን ከዓለም አቀፉ ራስ-ሰር ማንቃት የደህንነት መረብ **አያስወጣውም**። በ`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) ውስጥ፣ `false` እና `undefined` ተመሳሳይ ናቸው፦ እንደ ግልጽ override የሚቆጠረው `rateLimitProtection === true` ብቻ ነው። `rateLimitProtection` `false` ከሆነ (ወይም ካልተወሰነ)፣ ንቁ የAPI-key ግንኙነት አሁንም የራስ-ሰር ማንቃት ሁኔታውን ያሟላል እና በrate-limit ጥበቃ ሥር ይቆያል።
- **በግንኙነት ደረጃ መውጫ የለም**፦ አንድ ኦፕሬተር ለሌሎች ራስ-ሰር ማንቃትን እንደነቃ በማቆየት፣ "ይህ ብቸኛው ንቁ የAPI-key ግንኙነት ያለrate-limit queue ጥበቃ መስራት አለበት" የሚለውን በአሁኑ ጊዜ መግለጽ አይችልም። የAPI-key ግንኙነቶችን ያለrate-limit queueዎች ሙሉ በሙሉ ለማስኬድ፣ የደህንነት መረቡ በዓለም አቀፍ ደረጃ መጥፋት አለበት (`RATE_LIMIT_AUTO_ENABLE=false` ወይም `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)።

**የሚደገፉ የመጻፊያ መንገዶች፦**

- **`POST /api/rate-limits`**፦ ለአንድ ግንኙነት `rateLimitProtection`ን ለመቀያየር የሚደገፈው የአስተዳደር መጻፊያ መንገድ (`{ connectionId: string, enabled: boolean }`) ነው። ይህን `enabled: true` በማድረግ መጥራት ግልጽ ጥበቃን ያነቃል፤ `enabled: false` በማድረግ መጥራት ደግሞ ግልጽ ጥበቃን ያስወግዳል (ሆኖም ራስ-ሰር ማንቃት ከበራ፣ ንቁ የAPI-key ግንኙነቶች በዓለም አቀፉ የደህንነት መረብ ሥር ይቆያሉ)።
- **`PUT /api/providers/[id]`**፦ `rateLimitProtection`ን ሆን ተብሎ **አይቀበልም ወይም አይቀይርም** (#11278)። በ`PUT /api/providers/[id]` በኩል የprovider ግንኙነት metadataን ማዘመን፣ በቋሚነት የተቀመጠውን የrate-limit ጥበቃ ሁኔታ ፈጽሞ አይቀይርም።

---

## 6. የዝግተኛ ዥረት የውጤት መጠን ተቆጣጣሪ (#9709)

አማራጭ የሆነው `resilienceSettings.streamRecovery.throughputWatchdog` ጥበቃ፣
አሁንም chunks እየላከ ነገር ግን ከተዋቀረው ጠቃሚ የውጤት መጠን በታች የረዳት ውጤት
እያመነጨ ያለ upstream ይለያል። ይህ ሆን ተብሎ ከidle timeout የተለየ ነው፦
heartbeats እና metadata የትኛውንም timer ዳግም አያስጀምሩም፣ እንደ እድገትም
አይቆጠሩም። የውጤት ጥራት ምንም ይሁን ምን ፍጹም የደህንነት ጣሪያ ሆኖ
ከሚቆየው hard attempt deadline (#9153) ጋርም የተለየ ነው።

watchdog ማቋረጥ ከመቻሉ በፊት የማሟሟቂያ ጊዜ እና ከዚያ በኋላ ሙሉ rolling window
ያስፈልገዋል። ከChat Completions እና Responses API የውጤት ክስተቶች የሚመጡ
የጽሑፍ deltas ይቆጥራል (ጥንቃቄ የተደረገበት የUTF-8 byte ግምታዊ መለኪያ)፣
usage-only እና ባዶ ክስተቶችን ችላ ይላል፣ እንዲሁም tool-call ወይም reasoning
ክስተቶች በሂደት ላይ ሳሉ ግምገማውን ያቆማል። በነባሪነት ተሰናክሏል እና
በ`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ማንቃት ይቻላል፤ window፣
warm-up፣ ዝቅተኛው rate እና ሊለካ የሚችለው ዝቅተኛ ውጤት በመደበኛው
resilience-settings normalization layer ገደብ ውስጥ ይቀመጣሉ።

ሲነቃ፣ የwatchdog ማቋረጥ ተግባራዊ የሚሆነው ንቁ በሆነው upstream attempt ላይ
ብቻ ነው። ማንኛውም client-visible bytes ከመላካቸው በፊት፣ ነባሩ
same-account early-recovery path attemptን እንደገና ሊከፍት ይችላል። commit ከተደረገ
በኋላ ዥረቱ ያለጥንቃቄ በድጋሚ አይጫወትም፤ suffixን ማገናኘት የሚችለው ነባሩ
ደህንነቱ የተጠበቀ mid-stream continuation contract ብቻ ነው። Finalization
አንድ ጊዜ ብቻ የሚከናወን ሆኖ ይቀጥላል፣ ስለዚህ usage accounting እና semaphore
release አይደጋገሙም።

---

## 7. የUpstream ሁኔታ ዳግም መግለጫ (በስህተት የተገለጹ የኮታ ስህተቶች)

**ወሰን፦** ጊዜያዊ የኮታ መሟጠጥን በተሳሳተ HTTP status የሚዘግብ አንድ upstream gateway።

**ዓላማ፦** downstream ተጠቃሚዎች (fallback engine፣ combo aggregation፣ ለclient የሚታየው response) የውድቀቱን እውነተኛ እንደገና ሊሞከር የሚችል ባህሪ እንዲያዩ፣ ከclassification በፊት አሳሳች statusን ማረም።

አንዳንድ gateways ጊዜያዊ የኮታ መሟጠጥን እንደገና ሊሞከር በማይችል HTTP
status ያመለክታሉ። `agentrouter.org` ከመደበኛው `429` ይልቅ `403` (አንዳንድ ጊዜ
`400`) ከቻይንኛ body (`用户额度不足` / `额度不足`) ጋር ይመልሳል። እንደ Claude
Code ያሉ clients `403`ን እንደ ቋሚ ውድቀት በመቁጠር sessionን ያቋርጣሉ፣ እና
እርማት ከሌለ fallback engine እንደ የኮታ ክስተት ሳይሆን እንደ `AUTH_ERROR`
ይመድበዋል።

**አተገባበር፦**

- Registry + matcher፦ `open-sse/config/upstreamStatusRestatement.ts` — ለእያንዳንዱ
  provider የሚዘጋጅ የሕጎች ዝርዝር (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)፣ በ`applyStatusRestatement()` በኩል የሚዛመድ።
- የጥሪ ቦታ፦ በ`open-sse/handlers/chatCore.ts` ውስጥ ያለው `providerFailure:` block
  (በመስመር 3654 አካባቢ)፣ `parseUpstreamError()` የerror HTTP status ያለውን upstream
  response (`!providerResponse.ok`) ከተነተነ ወዲያውኑ እና ማንኛውም
  classification ከመካሄዱ በፊት፣ ይህም እያንዳንዱ downstream ተጠቃሚ የታረመውን
  status እንዲያይ ያደርጋል። በ`200` SSE stream ውስጥ የተካተቱ ስህተቶች የተለየ፣
  በኋላ የሚከናወን stream-parsing pathን ይከተላሉ እና በአሁኑ ጊዜ በዚህ hook
  **አይሸፈኑም** — ይህ የታወቀ ገደብ ነው፣ ነገር ግን እንደ error HTTP status
  ለሚታየው የagentrouter misstatus እስካሁን አላስፈለገም።
- እንደገና የመሞከር ብቁነት፦ `429` በ`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ውስጥ ስላለ፣ እንደገና የተገለጸ
  error እንደ የማይሰራ `403` ከመታየት ይልቅ እውነተኛ የretry window ይይዛል።
- ሰው ሠራሹ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  እንደገና የተገለጸው response ለ**client** የሚነግረው ብቻ ነው፤ ይህ ራሱ
  የconnectionው ውስጣዊ cooldown/lockout ጊዜ አይደለም — ያንን የሚወስነው
  እንደገና የተገለጸውን error በተግባር የሚያስተናግደው የተለየ mechanism ነው
  (የConnection Cooldown እየጨመረ የሚሄድ backoff፣ §2፣ ለAPI-key providers
  መሠረታዊ `3s`፤ ወይም እንደ agentrouter ላሉ per-model-quota providers የModel
  Lockout፣ §3)። router ለclient ከሚያሳውቀው የ60s window ቀደም ብሎ በውስጥ
  እንደገና ለመሞከር ብቁ ሊሆን ይችላል — ይህ ሆን ተብሎ የተቀመጠ headroom ነው
  እንጂ bug አይደለም።

ቋሚ ስህተቶች (የagentrouter `无权访问模型` — ይህን ሞዴል የመድረስ ፈቃድ የለም)
በፍጹም እንደገና አይገለጹም፦ `textMarkers` ቢዛመዱም `excludeMarkers` ሕጉን
ውድቅ ያደርገዋል፣ ስለዚህ error የመጀመሪያ statusን ይዞ ይቆያል እና ምንም ነገር
ለዘላለም እንደገና አይሞክረውም። የሚዛመደው provider classification rule
(`agentrouter-model-access-denied` በ`open-sse/config/providerErrorRules.ts` ውስጥ፦
`reason: "auth_error"`፣ `scope: "model"`፣ የታወጀ `6h` base cooldown)
በ`checkFallbackError` (`open-sse/services/accountFallback.ts`) የሚፈተሸው
ከአጠቃላይ apikey-category `FORBIDDEN` early-return _በፊት_ ሲሆን፣
በ`honorsRuleLockScope(provider)` የተገደበ ነው (#10334 — በአሁኑ ጊዜ
በ`providerErrorRules.ts` ውስጥ ባለው `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist
አማካኝነት ለagentrouter ብቻ የተወሰነ)። ሕጉ ያወጀው የ6h cooldown
እንደ `fallbackResult.baseCooldownMs` ሙሉ በሙሉ ይተላለፋል፣ ነገር ግን አሁንም
ቀድሞ የነበረውን per-model-quota lockout path (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`፣ ከcooldown source በስተቀር በ#10334 ያልተለወጠ)
ይጠቀማል፦ እንደ ማንኛውም ሌላ model lockout ወደ operatorው
`mlSettings.maxCooldownMs` (ነባሪ `1_800_000ms` / 30min) ዝቅ ተደርጎ ይገደባል፣
እና _የሚቀመጠው lockout reason_ የሕጉ `"auth_error"` ሳይሆን ቀድሞ የነበረው
hardcoded `"forbidden"` ሆኖ ይቆያል — ከጫፍ እስከ ጫፍ የሚከበረው የcooldown
ቆይታ ብቻ ነው፣ reason string አይደለም። connectionው ራሱ ንቁ ሆኖ ይቆያል፤
በተመሳሳይ connection ላይ ያሉ sibling models አይጎዱም።

በድጋሚ የተገለጹ የኮታ ስህተቶች (`额度不足`) በምርት አካባቢ የአቅራቢ ደንብ ላይ ይደርሳሉ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`፣ የራሱ የሆነ የተገለጸ የማቀዝቀዣ ጊዜ የለውም — የማከማቻ ንብርብሩ
ተመጣጣኝ የbackoff ነባሪ ቅንብር ተግባራዊ ይሆናል)። ከ#10334 ጀምሮ፣ በ
`ProviderErrorRuleMatch` ላይ ያለው `scope` ከጫፍ እስከ ጫፍ ጥቅም ላይ ይውላል፣ ነገር ግን **በ**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ፈቃድ ዝርዝር ውስጥ ላሉ አቅራቢዎች ብቻ ነው
(`providerErrorRules.ts` — በአሁኑ ጊዜ `"agentrouter"` ብቻ፣ በ
`honorsRuleLockScope()` የተገደበ)። ለሌሎች አቅራቢዎች በሙሉ
`scope` ልክ ከ#10334 በፊት እንደነበረው መረጃ ሰጪ ብቻ ሆኖ ይቀራል።
`checkFallbackError` የተዛመደውን ደንብ ወሰን እንደ
`fallbackResult.ruleScope` ያቀርባል፤ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) አንድ `ruleScope` በእውነት በግንኙነት ደረጃ
ተፈጻሚ እና ራሱን የሚያገግም ምልክት እንደሆነ ማክበር ደህንነቱ የተጠበቀ
መሆኑን የሚያረጋግጥ የጋራ guard ነው (`scope` `"connection"`፣ reason
`quota_exhausted`፣ ፈጽሞ `permanent` ያልሆነ፣ ፈጽሞ `creditsExhausted`
ያልሆነ — ወደፊት አንድ ደንብ `scope` `"connection"`ን ከቋሚ የመለያ ሁኔታ
ጋር እንዳያጣምር መከላከያ ነው)። ሁለት ተጠቃሚዎች ይጠሩታል፦

- **ማከማቻ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`)፦
  ወደ passthrough-provider **በእያንዳንዱ ሞዴል** የመቆለፊያ
  ቅርንጫፍ ከመውደቅ ይልቅ (agentrouter `passthroughModels: true` ነው → `hasPerModelQuota()`
  `true` ይመልሳል)፣ **ጊዜያዊ የግንኙነት ማቀዝቀዣ ጊዜ** ተግባራዊ ያደርጋል —
  `testStatus: "unavailable"` + `rateLimitedUntil`፣ ፈጽሞ የመጨረሻ ሁኔታ
  (`credits_exhausted`/`banned`/`expired`) አይደለም — ስለዚህ ግንኙነቱ
  በእጅ የማረጋገጫ መረጃ ዳግም እንዲቀናበር ሳያስፈልገው የማቀዝቀዣው ጊዜ
  ሲያበቃ በራሱ ያገግማል። `disableCooling: true` ላላቸው ግንኙነቶች
  ይዘለላል (#2997)፦ ያ የመርጦ መውጣት በምትኩ ወደ በእያንዳንዱ ሞዴል
  መቆለፊያ ይወርዳል (በሰነድ የተገለጸ የጥቅምና ጉዳት ሚዛን ነው —
  ከቅርንጫፉ በላይ ያለውን የኮድ አስተያየት ይመልከቱ)።
- **በተመሳሳይ ጥያቄ ውስጥ የcombo ማስተላለፊያ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`)፦ ያው guard ግንኙነቱን
  `${provider}:${connectionId}` ቁልፍ ተጠቅሞ በማህደረ ትውስታ ውስጥ ባለው
  `exhaustedConnections` set ላይ ምልክት ያደርግበታል። ይህ የሚዘለው ቀሪ
  የተመሳሳይ-ጥያቄ ዒላማ፣ _ዒላማው ራሱ ያንኑ `connectionId` በራሱ_
  የዒላማ ነገር ላይ አስቀድሞ የያዘ ከሆነ ብቻ ነው (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`፣ ከ`exhaustedConnections`
  lookup በፊት `if (provider &&
connectionId)`) — የተለመደ የሞዴል-ዝርዝር combo፣ ወንድም ዒላማዎቹ የራሳቸው የተሰካ
  `connectionId` የሌላቸውበት እና አንዱ ከምላሹ
  `X-OmniRoute-Selected-Connection-Id` header በእያንዳንዱ dispatch ወቅት ብቻ
  የሚወሰንበት፣ ያንን የቁልፍ መዛመድ ፈጽሞ አያገኝም። ለዚያ የተለመደ
  ሁኔታ፣ አንድ ቀሪ leg አሁን ያለቀበትን መለያ እንዳይጠቀም የሚያደርገው
  እውነተኛ ጥበቃ ይህ Set **አይደለም** — ከላይ ያለው የማከማቻ ንብርብር
  (የግንኙነቱ `rateLimitedUntil` አሁን ወደፊት ላይ ነው) ከዚሁ guard ጋር
  ተጣምሮ ለውድቀቱ `transientRateLimitedProviders`ን መጨቆኑ ነው
  ("ባለሁለት-ደረጃ ንድፍ" እና በ`targetExhaustion.ts` ውስጥ ባለው
  `isAgentrouterConnectionQuotaScope` ቅርንጫፍ ላይ ያለውን የኮድ አስተያየት
  ይመልከቱ)፦ ያ Set ምልክት ሳይደረግበት ሲቀር፣ የ`combo.ts`
  `allowRateLimitedConnection` የግዳጅ-ፍቀድ (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) ለቀሪዎቹ የአቅራቢው legs **አይ**ነሳም፣ ስለዚህ የማረጋገጫ
  መረጃ ምርጫው `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`)
  በተለመደው ሁኔታ ይከበራል፣ እና ቀሪው leg የተለየ፣ አሁንም ብቁ የሆነ
  agentrouter ግንኙነት ይመርጣል ወይም ምንም የማረጋገጫ መረጃ ሳይገኝ
  ይወድቃል — ይህ ቅርንጫፍ አሁን ወደ አቀዘቀዘው ግንኙነት በግድ
  ተመልሶ አይገባም።

### ባለሁለት-ደረጃ ንድፍ፦ የሁኔታ ዳግም መግለጫ፣ ከዚያም ምደባ

የሁኔታ ዳግም መግለጫ (`upstreamStatusRestatement.ts`) እና የአቅራቢ
ምደባ ደንቦች (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ሁለቱም በአቅራቢ id እና በጽሑፍ ምልክቶች ቁልፍ
የሚያደርጉ የተለያዩ registries ናቸው፣ ነገር ግን በተለያዩ ቦታዎች
ይሰራሉ እና የተለያዩ ዓላማዎችን ያገለግላሉ፦ restatement በ`chatCore.ts`
ውስጥ ቀደም ብሎ የHTTP ሁኔታውን እንደገና ይጽፋል፤ የምደባ ደንቦች
ደግሞ በ`checkFallbackError()` ውስጥ የfallback `reason`ን እና የመቆለፊያ
`scope`ን (`model` / `provider` / `connection`) ይመርጣሉ
(`open-sse/services/accountFallback.ts`)።

የምደባ ደንቦች ሙሉ የስህተት **ጽሑፍ**ን (እንደ `额度不足` ያሉ
የbody ምልክቶችን ለማዛመድ የሚያስፈልገው) የሚያዩት በ
`providerErrorRules.ts` ውስጥ ባለው `FULL_TEXT_RULE_PROVIDERS`
ፈቃድ ዝርዝር ውስጥ ላሉ አቅራቢዎች ብቻ ነው — በአሁኑ ጊዜ
`"agentrouter"` ብቻ። ለሁሉም ሌሎች **አብሮገነብ ካታሎግ** አቅራቢዎች፣
`checkFallbackError` ለ`getProviderErrorRuleMatch` የሚያስተላልፈው
የተዋቀረውን ስህተት (`{code, type}`) ብቻ ነው፣ ይህም በ
header/status/code ላይ ለተመሰረቱ ደንቦች በቂ ቢሆንም የbody-ጽሑፍ
ምልክቶችን ማየት አይችልም። `resolveRuleMatchBody()` helper ይህን ምርጫ
ያከናውናል፦ በፈቃድ ዝርዝሩ ውስጥ ላሉ አቅራቢዎች ሙሉ የስህተት
ጽሑፍ፣ ካልሆነ የተዋቀረው ስህተት። አንድ **አብሮገነብ** አቅራቢን ወደ
`FULL_TEXT_RULE_PROVIDERS` ማከል ግልጽ የበእያንዳንዱ-አቅራቢ opt-in
ነው — ይህ የሚኖረው በዝርዝሩ ላይ ላልሆነ እያንዳንዱ አቅራቢ
ነባሪው መንገድ ባይት-በ-ባይት ሳይቀየር እንዲቆይ ነው።

የአንድ ደንብ `scope` (`model` / `provider` / `connection`) ከ
`FULL_TEXT_RULE_PROVIDERS` የተለየ opt-in ነው፦ `checkFallbackError`
ይህን እንደ `fallbackResult.ruleScope` ብቻ ያቀርበዋል፣ እና downstream
ተጠቃሚዎች በዚሁ ፋይል ውስጥ ባለው
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ፈቃድ ዝርዝር ውስጥ ላሉ አቅራቢዎች
ብቻ፣ ከመረጃ ሰጪ መለያ የተለየ ነገር እንደሆነ ያከብሩታል (`በ
honorsRuleLockScope()` የተገደበ — በአሁኑ ጊዜ `"agentrouter"` ብቻ)።
አንድ አቅራቢ በዚያ ፈቃድ ዝርዝር ላይ ከገባ በኋላ የ
`scope: "connection"` መዛመድ በትክክል ምን እንደሚያደርግ ለማየት
ከላይ ያለውን "በድጋሚ የተገለጹ የኮታ ስህተቶች" ይመልከቱ።

**#11104 — በኦፕሬተር የታወጁ ደንቦች ሁለቱንም የፍቃድ ዝርዝሮች ያልፋሉ።** አንድ ኦፕሬተር
ይህን ፋይል ሳያርትዕ በሩጫ ጊዜ በ`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
አማካኝነት ለእያንዳንዱ አቅራቢ ደንብ ማወጅ ይችላል። የኦፕሬተር ደንብን በ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — አብሮ የተሰሩ
የካታሎግ ደንቦችን **ነባሪ** ባህሪ ለመጠበቅ በታሰቡ የፍቃድ ዝርዝሮች —
ጀርባ መገደብ፣ ደንቡን ማወጅ ራሱ የኦፕሬተሩ ግልጽ የመርጦ መግባት
ውሳኔ ስለሆነ፣ ቀድሞውኑ በዚያ ከተዘረዘሩት በስተቀር ለሁሉም
አቅራቢዎች የቅንብሮቹን ስልት የማይሰራ ያደርገዋል። `resolveRuleMatchBody()`
እና `honorsRuleLockScope()` ሁለቱም መጀመሪያ
`hasOperatorRuleForProvider()`ን ይፈትሻሉ፦ የኦፕሬተር ደንብ ያለው
አቅራቢ፣ በሁለቱ የፍቃድ ዝርዝሮች ውስጥ ቢኖርም ባይኖርም፣
ጥሬውን የስህተት ጽሑፍ ያገኛል እና ያወጀው `scope` ይከበርለታል።

**የሚታወቅ ክፍተት — `providerRuleRegistry` ለHTTP 400 ፈጽሞ አይመከርም።**
የ`checkFallbackError` `BAD_REQUEST` ቅርንጫፍ ሁኔታ 400ን ሙሉ በሙሉ
በራሱ የስርዓተ-ጥለት ድርድሮች (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`፣ ወዘተ በ`accountFallback.ts`) ይመድባል፣ እና
ከእሱ በላይ ያለው የ`configuredRule`/`getProviderErrorRuleMatch` ቅርንጫፍ
ከመድረሱ በፊት ይመለሳል። `status: 400` ያለው አብሮ የተሰራ የካታሎግ
ደንብ (ወይም የኦፕሬተር ደንብ) በአገባብ ትክክለኛ ቢሆንም ፈጽሞ
አይተገበርም። በአሁኑ ጊዜ 400ን የሚያነጣጥር ነባር ደንብ የለም፣
ስለዚህ በምርት አካባቢ ምንም ነገር አልተጎዳም — ነገር ግን ወደፊት
የሚጨመር የ400 ደንብ በመጀመሪያ ይህ ቅርንጫፍ እንዲሻሻል ይፈልጋል፤
ይህም ደንብ ከመጨመር የሚበልጥ ለውጥ ነው (ቀድሞውኑ በስርዓተ-ጥለት
ድርድር ባህሪ ላይ ለሚመረኮዝ እያንዳንዱ አቅራቢ 400ን እንደገና
ይመድባል)፣ እና ለአንድ አቅራቢ ብቻ የደንብ ጭማሪ ከተወሰነው ወሰን
ውጭ ነው።

### ኮታን በተሳሳተ መንገድ የሚገልጽ አዲስ መግቢያ በር ማከል

1. በ`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ውስጥ አንድ የደንብ ድርድር
   ይመዝግቡ። `textMarkers`ን ለአቅራቢው የተለየ አድርገው ያቆዩ፤
   ከ`CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ጋር
   የሚጋጩ አጠቃላይ የእንግሊዝኛ ሐረጎችን ፈጽሞ ዳግም አይጠቀሙ።
2. ትክክለኛውን የመቆለፊያ ወሰን (`connection` ለመለያው በሙሉ የሚመለከት
   ኮታ፣ `model` ደግሞ ለእያንዳንዱ ሞዴል ስህተቶች) ለመምረጥ፣ እንደ
   አማራጭ በ`open-sse/config/providerErrorRules.ts`
   (`providerRuleRegistry`) ውስጥ የምደባ ደንቦችን ይመዝግቡ። ይህ ደረጃ
   ሙሉውን የስህተት ጽሑፍ (የይዘት ምልክቶች) ለሚፈልጉ ደንቦች በምርት
   አካባቢ ተግባራዊ የሚሆነው ለተወሰኑ አቅራቢዎች ብቻ ነው፦ የአቅራቢውን
   id በዚያው ፋይል ወደ `FULL_TEXT_RULE_PROVIDERS` ያክሉ — ካልሆነ
   `checkFallbackError` ለደንቡ የሚያስተላልፈው የተዋቀረውን
   `{code, type}` ስህተት ብቻ ስለሆነ፣ የይዘት-ጽሑፍ ደንብ ከቀጥታ
   ትራፊክ ጋር ፈጽሞ አይዛመድም። በ`status`/`headers` ላይ ብቻ የሚዛመዱ
   ደንቦች (እንደ Opencode ወይም Minimax) ይህን መርጦ መግባት
   አያስፈልጋቸውም። በተናጠል፣ ደንቡ `scope: "connection"` ካወጀ እና
   የታሰበው እውነተኛ የግንኙነት-አቀፍ ማቀዝቀዣ ከተመሳሳይ ጥያቄ
   የጥምር መዝለል ጋር ከሆነ (የመረጃ መለያ ብቻ ካልሆነ)፣ የአቅራቢውን
   id በዚያው ፋይል ውስጥ ወደ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ያክሉ —
   ይህ በ`markAccountUnavailable()` (`src/sse/services/auth.ts`) እና
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ውስጥ እንደ
   `isAgentrouterConnectionQuotaScope()` ያለ ፍጆታን የሚገድበው ነው፤
   ያለዚህ `scope` አሁንም በ`fallbackResult.ruleScope` በኩል ይተላለፋል፣
   ነገር ግን ምንም ነገር በእሱ መሠረት አይሰራም።
3. `tests/unit/upstream-status-restatement.test.ts` እና
   `tests/unit/agentrouter-error-rules.test.ts`ን የሚያንጸባርቁ የክፍል
   ሙከራዎችን ያክሉ (የnot-permanent / not-creditsExhausted መከላከያዎችን
   ጨምሮ፣ እና — አቅራቢው የፍቃድ ዝርዝሩን ከፈለገ — `resolveRuleMatchBody()`
   ሙሉውን ጽሑፍ ለዚያ አቅራቢ ብቻ እንደሚመልስ የሚያረጋግጥ ሙከራ)።

በ`chatCore.ts`፣ `classifyError` ወይም combo ላይ ምንም ለውጥ አያስፈልግም።

#### በወጪ ትራፊክ ባልዲ የተከፋፈለ መቆለፊያ (#10880)

በ`EGRESS_BUCKETED_LOCK_PROVIDERS` (የopencode ቤተሰብ) ውስጥ ያሉ
አቅራቢዎች በIP የተከፋፈለ የላይኛው ስርዓት ተደርገው ይወሰዳሉ
(የopencode ነጻ ደረጃ በIP የተከፋፈለ እንጂ በመለያ የተከፋፈለ
አይደለም — #9611ን ይመልከቱ)፦ `quota_exhausted` **ወይም**
`rate_limit_exceeded` ተብሎ የተመደበ ሁኔታ-429፣ ማዞሪያው ሊሞክራቸው
ከመቻሉ በፊት፣ የመጨረሻ የታወቀ የወጪ ትራፊክ IP አድራሻቸው
ከከሸፈው ግንኙነት ጋር የሚዛመድ እያንዳንዱን በፍቃድ ዝርዝር
የተካተተ የቤተሰቡ ግንኙነት ያቀዘቅዛል
— ይህም N-1 መክሸፋቸው አይቀሬ የሆኑ የላይኛው ስርዓት ጥሪዎችን
ይከላከላል (ከ#10460/#10525 ጋር ተመሳሳይ ቅርጽ)።
`rate_limit_exceeded` ሆን ተብሎ ተካቷል፦ በ`markAccountUnavailable`
መንገድ ላይ ለopencode የተለዩት ደንቦች ፈጽሞ አይዛመዱም (ምንም
headers/body ወደ `checkFallbackError` አይተላለፍም፣ opencode በ
`FULL_TEXT_RULE_PROVIDERS` ውስጥ የለም)፣ ስለዚህ bodyው የደንበኝነት
ምዝገባ ኮታ ጽሑፍን ("monthly usage limit reached") የያዘ 429፣
የ`status_429` ደንብ ከመድረሱ በፊት በኮታ-ጽሑፍ ምትክ
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h ማቀዝቀዣ)
እንደ `quota_exhausted` ይመደባል — ከኮታ-ጽሑፍ ነጻ የሆነ 429
(ተራ የፍጥነት ገደብ) ግን በ`status_429` ደንብ አማካኝነት እንደ
`rate_limit_exceeded` ይመደባል፣ እና አሁንም የIP ቤተሰቡን ያቀዘቅዛል።
በፍቃድ ዝርዝሩ ለተካተተ አቅራቢ፣ በIP የተከፋፈለ የፍጥነት ገደብ
ከተሟጠጠ ኮታ ጋር ተመሳሳይ ምልክት ነው። ግልጽ ገደቦች፦

- **በተቻለ መጠን**: መቆለፊያው የግንኙነቱን የመጨረሻ የታወቀ `egress_ip`
  ከ`proxy_logs` ይፈታል (የ24h መስኮት፣ የተመሳሰለ፣ ያለ መሸጎጫ)። ቀዝቃዛ መሸጎጫ (የወጪ
  IP ፈጽሞ ካልተፈተሸ) ወይም ረድፍ ከሌለ → ያልተሳካው ግንኙነት አሁንም በቅርንጫፉ
  ይቀዘቅዛል (እንደ አሁኑ ይመዘገባል)፣ የሚቆለፍ ተመሳሳይ ግንኙነት ብቻ አይኖርም።
- **ፈጽሞ ቋሚ አይደለም**: የማቀዝቀዣ ጊዜው የሚታደስ የኮታ መስኮት ነው
  (`testStatus: "unavailable"`)፤ ቋሚ ሁኔታ ከIP-ደረጃ ምልክት ፈጽሞ አይወሰድም።
  `disableCooling` ያላቸው ግንኙነቶች ቅርንጫፉን ሙሉ በሙሉ ያልፋሉ።
- **ለተፈቀደለት ቤተሰብ የመቆለፊያ ጥራጥሬነት ይለወጣል**: ይህ የወሰን
  ለውጥ እንጂ የተመሳሳይ ግንኙነት ማመቻቸት ብቻ አይደለም። opencode የ
  `passthroughModels` አቅራቢ ነው፣ ስለዚህ ከዚህ ቅርንጫፍ በፊት 429 በእያንዳንዱ-MODEL
  ደረጃ መቆለፍን ያስከትል ነበር፤ አሁን ግን የግንኙነት ማቀዝቀዣን ያስከትላል —
  ምንም ተመሳሳይ ግንኙነት ሳይኖረው አንድ ግንኙነት ብቻ ለሚያስኬድ ኦፕሬተርም ጭምር።
  የopencode ደንብ ሰንጠረዥ ትክክለኛ እንደሆነ አስቀድሞ የሚገልጸው ጥራጥሬነት ይህ ነው
  (`scope: "connection"`፣ `providerErrorRules.ts`)፤ opencode በ
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ውስጥ ስለሌለ እስካሁን ፈጽሞ አልተከበረም።
  ቅርንጫፉ በግንኙነት-ወሰን ያለውን የagentrouter ቅርንጫፍ በመኮረጅ ያልተሳካውን
  የግንኙነት ማቀዝቀዣ + `backoffLevel` ራሱ ይጽፋል፣ ከዚያም ይመለሳል —
  በእያንዳንዱ-ሞዴል ያለው እገዳና ከታች ያለው አጠቃላይ መንገድ ፈጽሞ አይደረስባቸውም።
- **Combo ተካትቷል**: እንደ agentrouter ቅርንጫፍ፣ ወሰኑ አንድ combo ጠሪ
  በ429 ላይ የሚተገብረውን የ`persistUnavailableState`/`isCombo` ደረጃ ቅናሽ ሆን ብሎ
  ችላ ይላል። በእያንዳንዱ-ሞዴል የሚደረግ መቆለፍ የዚህ ወሰን ደካማ ቅርጽ አይደለም፤
  የተሳሳተ አሃድ ነው፤ ስለተሟጠጠው IP ምንም አይናገርም፣ ስለዚህ የcombo
  ማዞሪያው በእያንዳንዱ ተመሳሳይ ግንኙነት አንድ መሳካቱ የማይቀር ጥሪን ማባከኑን ይቀጥላል።
- **የተመሳሳይ ግንኙነት ደህንነት**: አስቀድሞ ቋሚ ሁኔታ ላይ ያለ ተመሳሳይ ግንኙነት
  (banned/credits_exhausted) ወይም አስቀድሞ ረዘም ያለ የማቀዝቀዣ ጊዜ ያለው
  ፈጽሞ አይተካም።
- **የተወሰነ የፍቃድ ዝርዝር**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ን ማስፋት
  ግልጽ የባለቤት ውሳኔ ነው፤ አጠቃላይ ሽቦ ማገናኘት የለም (pattern #10334/#10419)።
  የተመሳሳይ ግንኙነት መጠይቁ ያንኑ የፍቃድ ዝርዝር እንደ SQL
  ቃል-በቃል ከመድገም ይልቅ ያስራል፣ ስለዚህ ማስፋቱ የአንድ-መስመር ለውጥ ሆኖ ይቆያል።
- **የወጪ IP ማዞር፣ በሁለቱም አቅጣጫዎች**: የፍለጋ መስኮቱ (24h) ከወጪ-IP
  መሸጎጫ TTL (5 min) እጅግ የሰፋ ነው፣ ስለዚህ "የመጨረሻ የታወቀ IP" ታሪክ እንጂ
  የአሁን ሁኔታ አይደለም። የአንድ ግንኙነት proxy በመስኮቱ ውስጥ ከተዘዋወረ
  መቆለፊያው በእውነት የሚጋራ IPን **ሊያመልጠው** ይችላል (የተመዘገበው IP አዲሱ፣
  ያልተሟጠጠው ነው) — በተመሳሳይም ሁኔታ ከተሟጠጠው IP ርቆ የተዘዋወረን
  **ተመሳሳይ ግንኙነት ሊያቀዘቅዝ** ይችላል። ሁለተኛው ሁኔታ ያንን ተመሳሳይ ግንኙነት
  አንድ የማቀዝቀዣ መስኮት ያስከፍለዋል፤ ሁለቱም በታሪክ ላይ የተመሠረተ ፍለጋ
  የሚያስከትላቸው ተቀባይነት ያላቸው የበተቻለ መጠን ገደቦች ናቸው።
- **ወጪ**: ሁለት የተገደቡ የ`proxy_logs` ቅኝቶች (በ
  `idx_pl_timestamp` በኩል በመስኮቱ የተጣሩ)፣ በ429 ድግግሞሽ ጊዜ ብቻ። አዲስ
  index የለም (migration 134 YAGNI)። መካከለኛ መጠን ባለው የእውነተኛ-ትራፊክ DB
  ቅጂ ላይ ተለክቷል፤ ከፍተኛ-የውሂብ-ፍሰት instance በተመሳሳይ መስኮት ውስጥ
  በተመጣጣኝ ሁኔታ ተጨማሪ ረድፎችን ይይዛል።

---

## ሌሎች የጽናት ባህሪያት

- **20 የማዘዋወሪያ ስልቶች** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)ን ይመልከቱ።
- **ዳግም ማስጀመርን ያገናዘበ ማዘዋወር** (v3.8.0) — ግንኙነቶችን በኮታ ዳግም ማስጀመሪያ ጊዜ ቅድሚያ ይሰጣል።
- **የጀርባ ሁነታ ደረጃ መቀነስ** — Responses API `background: true` ከማስጠንቀቂያ ጋር ወደ የተመሳሰለ ሁነታ ዝቅ ይላል።
- **ተለዋዋጭ የመሣሪያ ገደብ ማወቂያ** — የመሣሪያዎች ብዛት ገደብ ሲደረስ ከአቅራቢዎች ወደ ኋላ ይመለሳል።
- **የአደጋ ጊዜ አማራጭ** — በ`OMNIROUTE_EMERGENCY_FALLBACK` ይቆጣጠራል፤ ኦፕሬተሮች ዳግም ማስጀመር ሳያስፈልግ ከFeature Flags ገጽ ላይ ሊተኩት ይችላሉ።

---

## ማረም

- ክብደት ያለው combo `503 all_targets_cooling_down` ምላሽ ከሰጠ (`Retry-After` ተቀናብሯል፣ `diagnostics.excluded` ደግሞ እያንዳንዱን ዒላማ ከ`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ጋር ይዘረዝራል) → pool-ው ተዋቅሯል እና ተገናኝቷል፤ እያንዳንዱ ዒላማ በresilience timer ምክንያት ብቻ ተገልሏል። የ`[COMBO] Weighted selection: every target excluded before dispatch — …` ማስጠንቀቂያ ምክንያቶቹን እና የቀሩትን ሰከንዶች ይጠቅሳል። ከተመሳሳዩ combo የሚመጣ `404 no_executable_targets` ማለት ምንም resilience timer አልተሳተፈም ማለት ነው (የሚሰራ ምንም ነገር የለም፣ ወይም ሁሉም መለያዎች የavailability probe-ውን አላለፉም)። ይህም በ`targetResolution.ts` ውስጥ ከተሰበሰቡት ማግለሎች በ`open-sse/services/combo/pinRecovery.ts` ውስጥ ተገንብቷል።
- የአንድ provider ሁሉም keys ከታለፉ → የcircuit breaker ሁኔታን እና የእያንዳንዱ connection `rateLimitedUntil`/`testStatus`ን ሁለቱንም ያረጋግጡ።
- ከreset window በኋላ provider በቋሚነት ከተገለለ → ኮዱ `getStatus()`/`canExecute()`ን ከመጠቀም ይልቅ ጥሬ `state`ን እያነበበ ነው።
- አንድ key ከወደቀ፣ ሌሎቹ መስራት አለባቸው → ከcircuit breaker ይልቅ connection cooldownን ይምረጡ።
- አንድ model ብቻ ከወደቀ → ከconnection cooldown ይልቅ model lockoutን ይምረጡ።
- State ራሱን መልሶ ማገገም ሲገባው ካላገገመ → የወደፊት timestamp መኖሩን እና ጊዜው ያለፈበትን state የሚያድስ read path መኖሩን ያረጋግጡ። ቋሚ statuses በእጅ ለውጦችን ይፈልጋሉ።

---

## TLS የጣት አሻራ መለየት እና ስውርነት

ለአቅራቢ የተወሰነ ስውርነት (JA3/JA4፣ CCH፣ ማደበዝ) በተናጠል ተመዝግቧል — `docs/security/STEALTH_GUIDE.md`ን ይመልከቱ (git፤ ወደ `/docs` አልተቀናበረም)።

---

## የጽናት ሙከራ (ደረጃ 8 · ክፍል C)

ከጽናት አመክንዮ የአሃድ ሙከራዎች በተጨማሪ፣ ሦስት ሙከራዎች በእውነተኛ
የጭንቀት/ውድቀት ሁኔታዎች የአሂድ ጊዜውን ይፈትሻሉ (ሁሉም ውህደት/የምሽት ናቸው — PRsን የሚያግድ የለም)፦

| ሙከራ            | ምን                                                                                                                                               | ማስኬጃ                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| ትርምስ           | አስመሳይ የላይኛው ዥረት ኖድ እውነተኛ መዘግየት/ዳግም ማስጀመር/የጊዜ ማብቂያ/503ን ያስገባል፤ የወረዳ ቆራጩ መከፈቱን/መመለሱን እና `checkFallbackError` 503ን እንደ ሊመለስ የሚችል አማራጭ መመደቡን ያረጋግጣል። | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| የሂፕ-እድገት       | በ`--expose-gc` ስር ለእያንዳንዱ `createSSEStream` ~500 ዥረቶች፤ ሂፑ ከጣሪያው በላይ ካደገ ይወድቃል (የOOM መከላከያ #3069)።                                                | `npm run test:heap`                   |
| k6 የረጅም ጊዜ ጭነት | በ`/api/monitoring/health` ላይ ዘላቂ ጭነት፤ የp95/ስህተት ገደቦች።                                                                                            | `k6 run tests/load/k6-soak.js` (በምሽት) |

በ`.github/workflows/nightly-resilience.yml` (cron + dispatch) ይቀናበራል። በነባሪው
`test:integration` ውስጥ፣ የትርምስ እና የሂፕ ሙከራዎች ራሳቸውን ይዘላሉ (`RUN_CHAOS_INT`/`--expose-gc` ከሌለ)።

---

## ተጨማሪ ይመልከቱ

- [የሥነ ሕንፃ መመሪያ](./ARCHITECTURE.md) — የስርዓት ሥነ ሕንፃ እና ውስጣዊ አሠራሮች
- [የተጠቃሚ መመሪያ](../guides/USER_GUIDE.md) — አቅራቢዎች፣ ጥምረቶች፣ የCLI ውህደት
- [ራስ-ሰር ጥምረት ሞተር](../routing/AUTO-COMBO.md) — ባለ16-ምክንያት ውጤት አሰጣጥ፣ የሁነታ ጥቅሎች
