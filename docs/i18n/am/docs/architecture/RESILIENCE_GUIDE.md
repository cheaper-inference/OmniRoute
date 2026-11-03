# Resilience Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ሦስት የተለያዩ ግን ተዛማጅ የመቋቋም ዘዴዎች አሉት። እያንዳንዳቸው የተለየ ወሰን እና ዓላማ አላቸው. የማዘዋወር ባህሪን በሚያስተካክሉበት ጊዜ ይለያዩዋቸው።

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ምንጭ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **ኤንቪ-ቪኤስ-ዳሽቦርድ ቀዳሚነት ለማገገም መቀየሪያዎች።** የመርጦ የመግባት የመቋቋም ችሎታ ዘርን ከአካባቢው ይቀይራል — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) ብቻ ያቀርባል. ቡሊያን በ `resilienceSettings` ውስጥ ቀጠለ (ዳሽቦርድ →** ቅንብሮች → የመቋቋም** / `PATCH /api/resilience`፣ በ `key_value` ውስጥ የተከማቸ) በ env እሴት ላይ ያሸንፋል፡ መደበኛ ማድረግ (`toBoolean`፣ `src/lib/resilience/settings/normalize.ts`) አንድ ባለበት ጊዜ የተከማቸ ቡሊያንን ያቆያል። እንደዚህ ያለ env var ወደ `true` ማዋቀር ዳሽቦርዱ አስቀድሞ `false` ያስቀመጠበት ቦታ ላይ ስለዚህ ምንም ለውጥ የለውም — መቀያየሪያውን ወደ ውስጥ ገልብጡት** ቅንብሮች → የመቋቋም** (ወይም የተከማቸ መስኩን ያጽዱ) ይልቁንስ.

## 1. የአቅራቢ ሰርኪት ብሬከር (Circuit Breaker)

**መድረክ:** ሙሉ አቅራቢ (ለምሳሌ፣ `glm`፣ `openai`፣ `anthropic`)።

**ዓላማ:** በአፕስትሪም/አገልግሎት ደረጃ ተከታታይ ውድቀት ለሚያሳይ አቅራቢ ትራፊክ መላክን ማቆም።

**ትግበራ:**

- ዋና ክላስ: `src/shared/utils/circuitBreaker.ts`
- ግንኙነት (wiring): `src/sse/handlers/chatHelpers.ts`፣ `src/sse/handlers/chat.ts`
- የሁኔታ API: `GET /api/monitoring/health`
- የዳግም ማስጀመሪያ API: `POST /api/resilience/reset`
- ማሸጊያዎች (wrappers): `open-sse/services/accountFallback.ts`
- የዳታቤዝ ሰንጠረዥ: `domain_circuit_breakers`

**ሁኔታዎች:**

- `CLOSED` — መደበኛ ትራፊክ ይፈቀዳል
- `DEGRADED` — ትራፊክ አሁንም ይፈቀዳል፣ ግን ከፍ ያሉ የአቅራቢ ውድቀቶች እየተከታተሉ ነው፤ በቂ ስኬቶች ሲገኙ፣ ትክክለኛ የግንኙነት ሙከራ ሲፈጸም፣ ወይም ለመጨረሻው የውድቀት አይነት ረጅሙ የ`OPEN` መቆያ (የ`cooldownByKind` እሴቱ፣ አለበለዚያ `resetTimeout`፣ × `maxBackoffMultiplier`፣ ቢያንስ አንድ cooldown) ያለ አዲስ ውድቀት ሲያልፍ ወደ `CLOSED` ይመለሳል
- `OPEN` — አቅራቢው ለጊዜው ታግዷል፤ combo ማዛወሪያ ያለፍበታል
- `HALF_OPEN` — የዳግም ማስጀመሪያ ጊዜ አልፏል፤ የመሞከሪያ (probe) ጥያቄ ይፈቀዳል

**ሊዋቀሩ የሚችሉ ነባሪዎች (`open-sse/config/constants.ts`፣ በDashboard → Settings → Resilience ላይ የተጋለጡ):**

| መደብ     | DEGRADED የሚሆንበት | የሚከፈትበት  | የዳግም ማስጀመሪያ ጊዜ |
| ------- | --------------- | -------- | -------------- |
| OAuth   | 5 ውድቀቶች         | 8 ውድቀቶች  | 60s            |
| API-key | 7 ውድቀቶች         | 12 ውድቀቶች | 30s            |
| Local   | የሚሰላ            | 2 ውድቀቶች  | 15s            |

`degradationThreshold` አቅራቢው መቼ `DEGRADED` እንደሚሆን ይቆጣጠራል፤ `failureThreshold` መቼ እንደሚከፈት እና እንደሚዘለል ይቆጣጠራል። የአካባቢ (Local) አቅራቢ መገለጫዎች ገና በResilience ቅንብሮች ገጽ ላይ አልተጋለጡም።

**የማነቃቂያ ኮዶች (trip codes):** የአቅራቢ-ደረጃ ሁኔታዎች `[408, 500, 502, 503, 504]` ብቻ። ለመለያ-ደረጃ ስህተቶች ፈጽሞ አይነቃቁም (አብዛኛዎቹ 401/403/429 — እነዚያ ለcooldown ወይም ለlockout የሚሆኑ ናቸው)።

**ዝግታ ማገገም (lazy recovery):** `OPEN` ሲያበቃ፣ `getStatus()`፣ `canExecute()`፣ `getRetryAfterMs()` ሁኔታውን ወደ `HALF_OPEN` ያድሳሉ። ተመሳሳዮቹ ንባቦች (እና ቀጣዩ ውድቀት) ጊዜው ያለፈበትን `DEGRADED` ወደ `CLOSED` እስኪመለስ ይቀንሱታል። የጀርባ ታይመር አያስፈልግም።

---

### በፈቃደኝነት የሚጀምር አጠቃላይ የአቅራቢ Cooldown (የመስኮት በር)

አራተኛው፣ **በፈቃደኝነት (opt-in)** የሚጀምር ንብርብር (`PROVIDER_COOLDOWN_ENABLED`፣ ነባሪ **ጠፍቷል**) በ`open-sse/services/providerCooldownTracker.ts` ውስጥ ውድቀት ለሚያሳዩ አቅራቢዎች በጥያቄዎች መካከል የሚቆይ ትውስታ ይይዛል፣ ይህም በcombo ዒላማ መወሰን (target resolution) ላይ የሚጠነቀቅ ሲሆን፣ ተከታታይ combo ጥያቄዎች በቅርቡ የወደቀ አቅራቢን እንደገና መሄድ እንዲያቆሙ ያደርጋል። የአቅራቢ-ደረጃ ግቤቶች የ`PROVIDER_PROFILES` የመስኮት በርን ይከተላሉ:

| መገለጫ    | የሚነቃበት ገደብ (`providerFailureThreshold`) | ውስጥ (`providerFailureWindowMs`) | የሚቀዝቅዝበት ጊዜ (`providerCooldownMs`) |
| ------- | --------------------------------------: | ------------------------------: | ---------------------------------: |
| OAuth   |                                    `10` |                         `15min` |                             `5min` |
| API key |                                    `15` |                         `30min` |                            `10min` |

ከገደቡ በታች አቅራቢው እየቀዘቀዘ ነው ተብሎ **አይወሰድም**፤ ስኬት መስኮቱን ያጸዳል። የግንኙነት-ደረጃ ግቤቶች (`provider:connectionId`) ይልቁንም የ`minRetryCooldownMs → maxRetryCooldownMs` ኤክስፖነንሺያል (exponential) backoff ይጠብቃሉ። ላይ-መጻፊያዎች (overrides):
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`።
የሪግሬሽን መከላከያ (regression guard): `tests/unit/provider-cooldown-window-gate.test.ts`።

## 2. የግንኙነት የመጠባበቂያ ጊዜ

**ወሰን፦** ነጠላ የአቅራቢ ግንኙነት/መለያ/ቁልፍ።

**ዓላማ፦** ሌሎች የዚያው አቅራቢ ግንኙነቶች አገልግሎት መስጠታቸውን እንዲቀጥሉ አንድ የተበላሸ ቁልፍን መዝለል።

**አተገባበር፦**

- እንደማይገኝ ምልክት ማድረግ፦ `src/sse/services/auth.ts::markAccountUnavailable()`
- ምርጫ፦ በተመሳሳይ ፋይል ውስጥ `getProviderCredentials*`
- የመጠባበቂያ ጊዜ ስሌት፦ `open-sse/services/accountFallback.ts::checkFallbackError()`
- ቅንብሮች፦ `src/lib/resilience/settings.ts`

**ለእያንዳንዱ ግንኙነት ያሉ መስኮች፦**

- `rateLimitedUntil` — የመጠባበቂያ ጊዜው እስኪያልቅ ድረስ ያለ የጊዜ ማህተም
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — የኤክስፖነንሻል የመመለሻ መዘግየት ቆጣሪ

**ነባሪ የመጠባበቂያ ጊዜዎች፦**

- የOAuth መነሻ ጊዜ፦ 5s
- የAPI ቁልፍ መነሻ ጊዜ፦ 3s
- የAPI ቁልፍ 429፦ ከአቅራቢው `Retry-After`/የዳግም መጀመሪያ ራስጌዎች/ሊተነተን ከሚችል የዳግም መጀመሪያ ጽሑፍ የተገኘውን ይመርጣል
- የመመለሻ መዘግየት፦ `baseCooldownMs * 2 ** failureIndex`

**በአቅራቢ የሚለያይ የዳግም ሙከራ መዘግየት።** የአቅራቢው ዝርዝር ገጽ **Retry delay** የሚል ምርጫ ያለው ሲሆን (Auto፣
15s እስከ 1h)፣ የሚያስቀምጠውም `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600፣ በ `PATCH /api/resilience`) ነው። የየትኛውም የአቅራቢ ላይኛ የዳግም ሙከራ
ምልክት በሌለበት የደረጃ ገደብ ስህተት ጊዜ፣ ይህ እሴት በአቅራቢው ላይ የተመጠነውን
የመመለሻ መዘግየት ይተካል እና `backoffLevel` ወደ 0 ይመልሳል
(`open-sse/services/rotationConfig.ts::overrideFor`)። ለደረጃ ገደብ ስህተት ያለው ቅደም ተከተል፣
ከከፍተኛ ወደ ዝቅተኛ፦ የአቅራቢው ላይኛ የዳግም ሙከራ ምልክት፣ ከዚያ በግንኙነት ደረጃ
`providerSpecificData.rotationOverrides.rateLimitResetSeconds`፣ ከዚያ በአቅራቢ ደረጃ የዳግም ሙከራ
መዘግየት፣ ከዚያ የአካባቢ ተለዋዋጭ `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`፣ በመጨረሻም
የተመጠነው የመመለሻ መዘግየት። Auto ይህን መስክ ያስወግዳል። ይህ የሚነካው
የደረጃ ገደብ ምክንያትን ብቻ ነው፤ የመጨረሻ ሁኔታዎችን አይነካም።

**የብዙ ጥያቄዎች በአንድ ጊዜ መጉረፍን የሚከላከል ጥበቃ፦** በአንድ ጊዜ የሚከሰቱ ስህተቶች የመጠባበቂያ ጊዜን ከመጠን በላይ እንዳያራዝሙ ወይም `backoffLevel` ሁለት ጊዜ እንዳይጨምሩ ይከላከላል።

**የትይዩነት-ገደብ 429 ስህተቶች የመመለሻ መዘግየት ደረጃዎችን አያሳድጉም።** ሰውነቱ
የትይዩነት ገደብን ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) የሚገልጽ `429` ማለት መለያው ጤናማ ነው ነገር ግን በሥራ ላይ ነው ማለት ነው።
`checkFallbackError()` የሚመልሰው ምክንያት `concurrency_limited` ሲሆን፣ ወዲያውኑ ወደሚቀጥለው
ግንኙነት መቀየር፣ ይህንን ግንኙነት ለቋሚ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ወይም ለአቅራቢው
የዳግም ሙከራ ምልክት ማቀዝቀዝ፣ `backoffLevel` እንዳለ ማስቀመጥ እና `skipProviderBreaker` ማዘጋጀት ነው።
ግልጽ የኮታ ሰውነት ካለ ግን እሱ ይቀድማል፤ ስለዚህ የኮታ ንድፍን የሚያሟላ ሰውነት
የኮታ ውሳኔ ሆኖ ይቆያል። ማወቂያ፦ `src/shared/utils/classify429.ts` ውስጥ
`looksLikeConcurrencyLimit()`፤ ውሳኔ፦ `open-sse/services/accountFallback/concurrencyLimit429.ts`።
`classify429()` (የሰባሪው `FailureKind`) አልተቀየረም፤ እነዚህን ሰውነቶች ለማንበብ
`rate_limit` መጠቀሙን ይቀጥላል።

**የዥረት ይዘት መቆም መለያውን አያቀዘቅዝም።** የይዘት-መቆም ተቆጣጣሪው
(`open-sse/utils/streamHandler.ts`) በተወሰነው ጊዜ ውስጥ ምንም የሞዴል ውጤት ያልላከ ዥረትን
ተስፋ ሲቆርጥ፣ `markAccountUnavailable()` ስህተቱን በግንኙነቱ ላይ ይመዘግባል እንጂ
የመጠባበቂያ ጊዜ አያስቀምጥም፤ መቆሙ የዚያ ጥያቄ ጉዳይ ነው፣ ብዙ ጊዜም ገና
ውጤት ያልተሰጠበት ረጅም የማመዛዘን ዙር ነው። ኦፕሬተሮች በ
`resilienceSettings.streamStallCooldown.enabled` (ነባሪ `false`) እንደገና ሊያነቁት ይችላሉ።

**ለ `p2c` መለያ ምርጫ በፈቃደኝነት የሚነቃ የመዘግየት ምልክት።** እያንዳንዱ የተላከ
ሙከራ የመጀመሪያ ባይት እስኪደርስ የሚወስደውን ጊዜ እና ውጤቱን በግንኙነት ደረጃ
(እንዲሁም በግንኙነት + ሞዴል ደረጃ) በማስታወሻ ውስጥ በሚሽከረከር መስኮት ይመዘግባል፦
ባለፉት 15 ደቂቃዎች ውስጥ ያሉ የመጨረሻ 20 ናሙናዎች
(`open-sse/services/connectionLatencyTracker.ts`፣ ከ
`src/sse/handlers/chatHelpers.ts` ውስጥ `safeLogEvents()` የተመዘገቡ)።
`resilienceSettings.p2cLatency.weight` ከ `0` በላይ ሲሆን (ክልል 0-20፣ ነባሪ
`0` = ጠፍቷል)፣ `src/sse/services/auth.ts` ውስጥ `compareP2CConnections()` ለጥንዱ
እያንዳንዱ እጩ እስከ `weight` ነጥቦችን ይጨምራል። ከእነዚህ ግማሹ የሚመጣው
ከፈጣኑ እጩ ጋር እንደ ሬሾ ከሚለካ መዘግየት ነው (ሁለት እጥፍ የዘገየ እጩ
ሙሉውን ግማሽ ይወስዳል)፤ ሌላኛው ግማሽ ደግሞ ከሚሽከረከረው የስህተት መጠን ነው።
ይህ ቃል የሚተገበረው ሁለቱም እጩዎች ቢያንስ 3 ናሙናዎች ሲኖራቸው ብቻ ነው፤
ስለዚህ አዲስ መለያዎች አይቀጡም፣ እና ከኮታ-ታግዷል እና ከኮታ-ተሟጧል ቅጣቶች
በታች የሚቆይ ከፍተኛ ገደብ አለው። የራሱን ሰርኪዩት አይጨምርም፤ የሚሳኩ መለያዎች
አሁንም በመጠባበቂያ ጊዜ፣ በመቆለፊያ እና በሰባሪ ንብርብሮች ይታከማሉ።
በ `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ያዘጋጁት።

**የማመዛዘኛ ፍሬሞች የይዘት-መቆም በጀትን እንደገና ይጀምራሉ።** የማመዛዘን ሞዴል
የመጀመሪያ የሚታይ ቶከን ከመላኩ በፊት ለደቂቃዎች ሊያስብ ይችላል፦ Claude ባዶ የማመዛዘን
ጽሑፍ የያዙ `thinking_delta` ፍሬሞችን ይልካል፣ Responses API ደግሞ አንድ የማመዛዘን
ንጥል ከሌላው በኋላ ይልካል። `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
እነዚህን ፍሬሞች ይለያል፣ እና ተቆጣጣሪው ዙሩን ከመሰረዝ ይልቅ በእያንዳንዱ ፍሬም
በጀቱን እንደገና ይጀምራል። እነሱ አሁንም የሞዴል ውጤት አይደሉም፤ ስለዚህ በማመዛዘን
ብቻ የሚያበቃ ዙር አሁንም ባዶ ተብሎ ይመዘገባል፣ ማመዛዘን አቁሞ የልብ ምት ብቻ
የሚልክ ዙር ደግሞ አሁንም ተቆጣጣሪውን ያስነሳል።

የKiro የባይነሪ `reasoningContentEvent` ፍሬሞች ባዶ ያልሆነ ፊርማ ሲኖራቸው፣ ይህንን
የማመዛዘን እንቅስቃሴ በአስፈጻሚው በኩል እንደ ባዶ `reasoning_content` ዴልታ ያስቀጥላሉ።
ፊርማው ወደ ፊት አይተላለፍም። ሜታዳታ፣ ያልተሟሉ ፍሬሞች እና ባዶ ፊርማዎች
የይዘት በጀቱን እንደገና አይጀምሩም፤ ከዚህ ውጭ ያለው ንቁ-ዥረት ጊዜ ገደብ እና
የደንበኛ ስረዛ አሁንም ይተገበራሉ (`open-sse/executors/kiro/reasoning.ts`)።

**የመጨረሻ ሁኔታዎች (የመጠባበቂያ ጊዜዎች አይደሉም)፦**

- `banned` — በታገደ ቁልፍ-ቃል / በመለያ እገዳ ማወቂያ የሚዘጋጅ (ይመልከቱ [BAN_DETECTION](../security/BAN_DETECTION.md))። በአቅራቢው በእያንዳንዱ ጥያቄ የሚሰጡ ውድቅ ምላሾች (`request_rejected`፣ ለምሳሌ Anthropic OAuth 403 "Request not allowed") እሱን በጭራሽ አያዘጋጁትም፤ እነሱ በግንኙነት እና በሞዴል ደረጃ ይቆጠራሉ፣ እና ያንን ሞዴል ከሽክርክር ውስጥ በማውጣት እያደገ የሚሄድ እስከ `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) የሚደርስ የመጠባበቂያ ጊዜ ይወስዳሉ፣ ወይም ሞዴል ካልታወቀ ግንኙነቱን ያቀዘቅዛሉ — `open-sse/services/requestRejectedStreak.ts`
- `expired` (የማያቋርጥ ከመሆኑ በፊት የተገደበ የዳግም ሙከራ ብዛት ካለፈ በኋላ ወደ መጨረሻ ሁኔታ የሚሸጋገር — `EXPIRED_RETRY_MAX = 3` በኤክስፖነንሻል የመመለሻ መዘግየት — ስለዚህ ጊዜያዊ የOAuth ስህተቶች መለያው በቋሚነት ከመቦዘኑ በፊት በራሳቸው ሊድኑ ይችላሉ)
- `credits_exhausted`

እነዚህ ምስክርነቶች እስኪቀየሩ ወይም ኦፕሬተር እስኪያስጀምራቸው ድረስ ይቆያሉ። የተርሚናል ሁኔታዎችን በጊዜያዊ cooldown ሁኔታ አትተኩ።

**ዘግይቶ መልሶ ማገገም:** `rateLimitedUntil` ጊዜው ካለፈ ግንኙነቱ እንደገና ብቁ ይሆናል። በተሳካ አጠቃቀም፣ `clearAccountError()` ሁሉንም የስህተት መስኮች ያጸዳል።

### የClaude OAuth አጠቃቀም ግድግዳ፦ ዝቅተኛ-ቅድሚያ መስመር + የክፍለ-ጊዜ ገደብ ዳግም ማስጀመር

**ወሰን፦** አንድ የClaude ምዝገባ (OAuth) ግንኙነት። ሁለቱም ባህሪያት **በእያንዳንዱ ግንኙነት ፈቃደኛ ማድረግ የሚቻል** ናቸው
(ግንኙነት አርትዕ → Claude ክፍል → `lowPriorityMode` / `autoLimitReset` በ
`providerSpecificData`፣ ሁለቱም በነባሪ ጠፍተዋል) እና የClaude Code `/low-priority` እና
`/limit-reset` ትዕዛዞችን ይከተላሉ (የwire ውል ከClaude Code 2.1.263 የተመዘገበ ነው)።

**ትግበራ፦**

- የሁኔታ ማሽን + የምላሽ ምደባ፦ `open-sse/services/claudeLowPriority.ts`
- የዳግም ማስጀመሪያ ሁኔታ/ጥያቄ ደንበኛ፦ `open-sse/services/claudeLimitReset.ts`
- የአስፈጻሚ መነሻ (የራስጌ መጨመር + በተመሳሳይ መለያ ዳግም መሞከር)፦ `open-sse/executors/base.ts::execute()`
- የፈቃደኛ ማድረግ ቋሚ ማከማቻ፦ `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**መነሻ፦** የ5-ሰዓት አጠቃቀም ግድግዳ — ራስጌዎቹ
`anthropic-ratelimit-unified-status: rejected` የሚይዙ እና፣ መለያው ብቁ ሲሆን፣
`anthropic-ratelimit-unified-slow-offer: treatment` የያዙ `429`። ከዚያ የመጀመሪያ ግድግዳ
`429` በፊት ምንም ነገር አይላክም፤ የተዋሃዱ ራስጌዎች የሌለው ፈንጂ `429` በመደበኛ cooldown መንገድ ይሄዳል።

**ዝቅተኛ-ቅድሚያ መስመር** (`lowPriorityMode`)፦

- በግድግዳው `429` ላይ አስፈጻሚው ማቅረቡን ይቀበላል እና ወዲያውኑ **ተመሳሳይ**
  መለያን በ`anthropic-usage-limit: slow` እንደገና ይሞክራል፤ መስመሩ እስከታወጀው
  `anthropic-ratelimit-unified-reset` (+60s የጸጋ ጊዜ) ድረስ ንቁ ሆኖ ይቆያል እና በዚያ
  ጊዜ ውስጥ ያለ እያንዳንዱ ጥያቄ ራስጌውን ይይዛል። የተጠለፈው `429` ወደ
  `handleChatCore` አይደርስም፤ ስለዚህ ግንኙነቱ በcooldown ውስጥ **አይገባም** እና ከዚያ አይቀየርም።
- በኋለኞቹ ምላሾች ላይ `anthropic-ratelimit-unified-slow-status`፦ `active` / `not_needed`
  መስመሩን እንደቀጠለ ያደርጋሉ፤ `slot_busy` (429) ወይም `529` የአገልጋዩን
  `anthropic-ratelimit-unified-slow-retry-after` (በነባሪ 20s፣ 5–600s ድረስ የተገደበ፣ ±30%
  የዘፈቀደ ልዩነት) ይጠብቃሉ እና እንደገና ይሞክራሉ፤ ይህም በ
  `anthropic-ratelimit-unified-slow-max-wait` (በነባሪ 20 min፣ 1 min–6 h ድረስ የተገደበ)
  ይገደባል — ከዚያ በላይ መስመሩ ያበቃል እና የ10-ደቂቃ ማቀዝቀዣ ዳግም መቀበልን
  ያግዳል። መጠበቁ በተጨማሪ በጥያቄው የራሱ የupstream-start ጊዜ ማብቂያ
  (`resolveFetchStartTimeout`፣ በነባሪ 10 min) ላይ በቀረው ጊዜ ሲሆን ከዚያ 5 s
  ይቀነሳል፤ ይህ ገደብ ባይኖር የ20-ደቂቃው ነባሪ max-wait ከጥያቄው ይበልጣል
  እና እንቅልፉ በመጠበቂያው መካከል ይቋረጣል፤ በዚህም ከተረጋጋው
  `max_wait` መጨረሻ + ማቀዝቀዣ ይልቅ `TimeoutError` ይታያል።
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`፣ የ5-ሰዓት መስኮት መሽከርከር፣ ወይም
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ይህም የሚከፈልበት
  overage አሁን ግድግዳውን ስለሚሸፍን በማንኛውም ሁኔታ `extra_usage` ብሎ ያበቃዋል)
  መስመሩን ያበቃሉ፤ ምላሹ ከዚያ ወደ መደበኛው cooldown መንገድ ይሄዳል።
  `budget_exhausted` እስከታወጀው የበጀት ዳግም ማስጀመሪያ (≤ 8 ቀናት) ድረስ
  ይታወሳል።
- የግድግዳው ምርመራ የአስፈጻሚው የራሱ በ400 የሚመሩ በሙከራ-ውስጥ ዳግም ሙከራዎች
  (የአውድ አርትዖት፣ የማሰብ/ጥረት ገደቦች፣ የመለኪያ ራስ-መማር) ከተጠናቀቁ በኋላ
  ይሰራል፤ ስለዚህ በእነዚህ ዳግም ሙከራዎች አንዱ ላይ ብቻ የሚታየው `429` እንኳን
  ከcooldown መንገድ ጋር ከመድረሱ በፊት ይጠለፋል።
- ሁኔታው በግንኙነት ደረጃ በማስታወሻ ውስጥ ይቀመጣል (ዳግም መነሳት እንደገና ለመቀበል
  አንድ ተጨማሪ የግድግዳ `429` ያስከፍላል)።

**የክፍለ-ጊዜ ገደብ ዳግም ማስጀመር** (`autoLimitReset`፣ ሁለቱም ሲነቁ ከመስመሩ በፊት ይሞከራል)፦

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  እገዳ፤ `arm: "reset"` እና `available: true` ሲሆኑ፣
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ከ
  `{ "program": "juniper_tide" }` ጋር (የድርጅቱ UUID ከ`providerSpecificData.organizationUUID`፣
  የbootstrap መጠባበቂያ)።
- `result: reset|not_limited` → ጥያቄው በሙሉ ፍጥነት እንደገና ይላካል (slow ራስጌ የለም)።
  `already_used` / `not_offered` `next_available_at` ያስታውሳሉ (በነባሪ አንድ ሳምንት)፤
  ማንኛውም ውድቀት ለ15 ደቂቃ ያህል የኋላ መዘግየት ያደርጋል። ዳግም ማስጀመሩ
  በሳምንት አንድ ጊዜ ብቻ ነው እና አሁንም በሳምንታዊ ገደቡ ውስጥ ይቆጠራል።

የመመለሻ ሙከራ መከላከያዎች፦ `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`,
`tests/unit/claude-low-priority-executor.test.ts`.

### የክፍለ-ጊዜ ተያያዥነት (#7274)

**ወሰን፦** አንድ የደንበኛ ክፍለ-ጊዜ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ራስጌ)
ለአንድ ግንኙነት ተሰክቷል፣ ለ**ማንኛውም** አቅራቢ።

**ዓላማ፦** ብዙ-ዙር ወኪል (Claude Code፣ aider፣ ብጁ ወኪሎች) በጥያቄዎች መካከል
በተመሳሳይ መለያ ላይ እንዲቆይ ማድረግ፤ ይህም በአቅራቢዎች ላይ በመለያ ደረጃ
የሚቀመጥ የክፍለ-ጊዜ ሁኔታ ምክንያት የሚፈጠረውን የመለያ መሻገር የአውድ መጥፋት
እና ተደጋጋሚ የቀዝቃዛ-መነሻ `429` ይቀንሳል።

**ትግበራ፦**

- የTTL መፍትሔ፦ `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- የማሰካት ምርጫ/መፍጠር፦ `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- የራስጌ ማውጣት (አጠቃላይ፣ ማንኛውም አቅራቢ)፦ `src/sse/services/auth.ts::extractSessionAffinityKey()`
- የሚቀመጥ የማሰኪያ ሰንጠረዥ፦ `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ቅንብር፦ `sessionAffinityTtlMs` (ዓለም-አቀፍ TTL በms፣ `0` ያሰናክላል) — `src/lib/db/settings.ts`።
  ከCodex ብቻ የነበረው `codexSessionAffinityTtlMs` በስደት
  `124_generic_session_affinity_ttl.sql` ተሰይሟል፤ ይህም ቀደም ሲል የተዋቀረውን
  የCodex TTL እንደ አዲሱ ነባሪ ይዞታ ይወስዳል።

ከ#7274 በፊት `resolveSessionAffinityTtlMs()` ከ`codex` በስተቀር ለእያንዳንዱ አቅራቢ
ወደ `0` በቀጥታ ይመልስ ነበር፤ ስለዚህ የTTL ቅንብሩ (እና የክፍለ-ጊዜ ራስጌዎቹ)
በሌሎች ቦታዎች ላይ ምንም ተጽዕኖ አልነበራቸውም፣ ምንም እንኳን የማሰካት ዘዴው
እና የራስጌ ማውጣቱ ከአቅራቢ ነፃ ቢሆኑም። ማስተካከያው ያንን ቀደምት መመለስ
አስወግዷል፤ ስለዚህ TTL በዓለም-አቀፍ ደረጃ ከ`0` በላይ ከተቀናበረ አሁን በእያንዳንዱ
አቅራቢ ላይ በእኩል ይሰራል።

ሦስቱ የክፍለ-ጊዜ ተያያዥነት ራስጌዎች በፍጹም ወደ upstream አይተላለፉም — አስፈጻሚዎች
የደንበኛ ራስጌዎችን ከማስተላለፍ ይልቅ የራሳቸውን upstream ራስጌዎች ከዜሮ ስለሚገነቡ፣
ይህ የውስጥ ማዛመጃ መለያ ብቻ ሆኖ ይቆያል።

### ልዩ የሚተዳደሩ የክፍለ-ጊዜ ግንኙነት ኪራዮች

**ወሰን፦** አንድ ንቁ የሚተዳደር HTTP ደንበኛ/ክፍለ-ጊዜ አንድ ብቁ የOmniRoute ግንኙነት ይይዛል።

**ዓላማ፦** በጥያቄዎች መካከል ጠንካራ የማዘዋወሪያ ድንበር ለሚፈልጉ ደንበኞች ዘላቂ የግል ግንኙነት ባለቤትነትን ማቅረብ። ይህ ከክፍለ-ጊዜ ተያያዥነት ይለያል፤ የክፍለ-ጊዜ ተያያዥነት ለስላሳ የቀጣይነት ምርጫ ነው። የግል ሊዝ የሕይወት-ዑደት ሁኔታን በSQLite ውስጥ ያስቀምጣል፣ በአጠቃላይ የነቁ ባለቤቶች እና የነቁ ግንኙነቶች ልዩነትን ያስጠብቃል፣ እንዲሁም ያረጀ ትውልድን አቅራቢው ከመላኩ በፊት ውድቅ ያደርጋል።

ይህ ባህሪ ለእያንዳንዱ API ቁልፍ በምርጫ ሊነቃ ይችላል። የሚተዳደር ቁልፍ `lease:exclusive` ወሰን እና በግልጽ የተገለጸ፣ ባዶ ያልሆነ `allowedConnections` ዝርዝር ሊኖረው ይገባል። ማንኛውም HTTP ደንበኛ የሕይወት-ዑደት መጨረሻ ነጥቡን መጠቀም ይችላል፤ የደንበኛ ስም፣ user-agent፣ አቅራቢ፣ OAuth ዘዴ ወይም ሞዴል አያስፈልግም። ሊዙ ሞዴልን ሳይሆን ግንኙነትን ይይዛል፤ ስለዚህ ግንኙነቱ በመደበኛ ሁኔታ ብቁ ሆኖ እስካለ ድረስ የሞዴል ለውጥ ትስስሩን አያስወግድም። መደበኛ የሞዴል፣ የኮታ፣ የጤና፣ የቅዝቃዜ ጊዜ እና የመፍቀጃ ዝርዝር ደንቦች እንደ ዋና ሥልጣን ይቀጥላሉ፤ እነዚህም ተመሳሳይ ትውልድን ወደ ሌላ ነፃ ብቁ ግንኙነት ሊያሸጋግሩ ይችላሉ።

የሕይወት-ዑደቱ `POST /api/v1/session-leases` ሲሆን፣ የJSON እርምጃዎቹም `acquire`፣ `renew` እና `release` ናቸው። የሚተዳደሩ የግምት ጥያቄዎች የማይገለጥ `X-OmniRoute-Lease-Owner` እሴት እና ትክክለኛ `X-OmniRoute-Lease-Generation` ያቀርባሉ። ባለቤቱ `vlo_` በሚከተሉ 43 base64url ቁምፊዎች ይጠቀማል፤ የእሱ SHA-256 ሃሽ ብቻ ይቀመጣል። እያንዳንዱ የመጨረሻ የማስተላለፊያ መከላከያ የተረጋገጠውን API ቁልፍ ID እና ንቁ የግንኙነት ID ያስገድዳል። የሊዝ መቆጣጠሪያ ራስጌዎች ከምዝግቦች፣ ከተጠበቁ የጥያቄ ቅጽበታዊ ቅጂዎች እና ከአቅራቢ አስፈጻሚ ራስጌዎች ይወገዳሉ።

መደበኛ ማዘዋወሪያ ብቁ የሆኑ የሚተዳደሩ እጩዎች እያሉት፣ እያንዳንዱ ነፃ እጩ በውጭ ንቁ ሊዝ ተይዞ ከሆነ፣ OmniRoute HTTP `429`፣ የሊዝ አቅም አይገኝም ኮድ፣ አቅም እስኪገኝ የሚጠብቅ ሁኔታ እና ከቀድሞው ተዛማጅ ጊዜ ማብቂያ የተመነጨ የተወሰነ `Retry-After` ይመልሳል። በመደበኛ ሁኔታ ብቁነት አለመኖር የሊዝ ግጭት አይደለም፤ ያለውን የማዘዋወሪያ ስህተት ትርጉም ይጠብቃል።

ተዛማጅ ዘዴዎች ለየብቻቸው ይቀጥላሉ፦

- የOAuth ክፍለ-ጊዜ ይዞታ ለOAuth መለያዎች በሂደት ደረጃ የሚከናወን ለስላሳ ስርጭት ነው።
- የመለያ ሴማፎሮች የጥያቄ-ተጓዳኝነት ፈቃዶችን ይሰጣሉ፤ ጥያቄው ሲጠናቀቅም ያበቃሉ።
- የግል የሚተዳደሩ ክፍለ-ጊዜ ሊዞች ዘላቂ የሕይወት-ዑደት ባለቤትነትን ከትውልድ መከላከያ ጋር ያቀርባሉ።

## 3. የሞዴል መቆለፍ

**ወሰን:** የአቅራቢ + ግንኙነት + ሞዴል ሶስትዮሽ።

**በሁኔታ መሠረት የቁልፍ ወሰን:** መቆለፊያው የሚጽፍበትን ቁልፍ የሚወስነው የስህተቱ ሁኔታ ነው
(`resolveLockoutScope()` በ `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — የኮታ ወይም የመብት ምልክት — የ**ኮታ ቤተሰቡን** ይቆልፋል፦
  ለ codex ሙሉውን `codex` / `spark` ወሰን (በዚያ ግንኙነት ያሉ ሁሉንም
  `gpt-5*` ሞዴሎች)፣ ለሌሎች አቅራቢዎች `getQuotaScopedModelForProvider()`።
- `404` ባዶ ሞዴሉን ይቆልፋል (`getModelLockKey()` `not_found`ን ያጠባል)።
- ማንኛውም ሌላ ሁኔታ — `5xx` የትራንስፖርት/ሰርቨር አለመሳካቶች እና ከጥራት ማረጋገጫ የመነጨው የOmniRoute `502` — ትክክለኛውን
  የአቅራቢ/ግንኙነት/ሞዴል ሶስትዮሽ ብቻ ይቆልፋል። በአንድ ሞዴል ላይ የተበላሸ የውሂብ ፍሰት ስለ መለያው ኮታ ማስረጃ አይደለም፤ ይህ ደንብ ከመጣ በፊት በ `codex/gpt-5.6-luna` ላይ የተፈጠረ አንድ ባዶ ምላሽ በግንኙነቱ ያሉትን ሁሉንም `gpt-5*` ሞዴሎች ከማዘዋወር ላይ ለ2–30 ደቂቃዎች (በደረጃ እየጨመረ) ያስወግድ ነበር፣ ኮታው ግን ሳይነካ።
- የተጠሪው ግልጽ `scope` አማራጭ ሁልጊዜ ቅድሚያ አለው (Antigravity `"exact"`ን ያስተላልፋል)።

**ዓላማ:** አንድ ሞዴል ብቻ የማይገኝ ወይም የኮታ ገደብ ያለበት ሲሆን ሙሉ ግንኙነትን እንዳያሰናክል መከላከል።

**ምሳሌዎች:**

- በሞዴል ደረጃ ኮታ የሚያስተዳድሩ አቅራቢዎች `429` ሲመልሱ
- የሌለ አንድ ሞዴል `404` ሲመልሱ የአካባቢ አቅራቢዎች
- ለአቅራቢ የተለዩ የሞድ/ሞዴል ፈቃድ አለመሳካቶች (ለምሳሌ የGrok ሞዶች)

**ትግበራ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`።

### የሞዴል ማቀዝቀዣ ዳሽቦርድ (v3.8.0)

UI: ቅንብሮች → የሞዴል ማቀዝቀዣዎች (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ንቁ የመቆለፊያ ሁኔታዎችን ከአቅራቢ፣ ግንኙነት፣ ሞዴል፣ ምክንያት እና expiresAt ጋር ይዘረዝራል። ኦፕሬተሮች ከካርዱ ላይ ሞዴልን በእጅ እንደገና ማንቃት ይችላሉ።

**REST API:**

- `GET /api/resilience/model-cooldowns` — ንቁ የመቆለፊያ ሁኔታዎችን ይዘርዝራል
- `DELETE /api/resilience/model-cooldowns` — በእጅ እንደገና ማንቃት። የሰውነት ይዘት፦ `{provider, connection, model}`። ማረጋገጫ፦ management።

### የማቀዝቀዣ አስተዳዳሪ

UI: ክትትል → የማቀዝቀዣ አስተዳዳሪ (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)።

ለጊዜያዊ ምክንያት ከማዘዋወር ውጭ ለሆነ እያንዳንዱ ግንኙነት አንድ ገጽ ያቀርባል፤ እያንዳንዱን የአቅራቢ ገጽ መክፈት አያስፈልግም። የግንኙነት ማቀዝቀዣዎችን፣ የሞዴል መቆለፊያዎችን እና የመጨረሻ ሁኔታዎችን ይዘረዝራል፤ እነዚህንም በግንኙነት፣ ለተመረጡ ግንኙነቶች ወይም የአንድ አቅራቢ ሁሉንም ግንኙነቶች መሠረት ያጸዳል። በብዛት የሚስተካከሉ የማቀዝቀዣ ደንቦችንም ያስተካክላል፦ `streamStallCooldown.enabled` እና የOAuth / API-key `connectionCooldown` መነሻ የማቀዝቀዣ ጊዜ እና ከፍተኛው የድጋሚ መጨመሪያ ደረጃዎች (በ
`PATCH /api/resilience` ይቀመጣሉ)። የመጨረሻ ሁኔታዎች (`banned`, `expired`, `credits_exhausted`) ይዘረዘራሉ፣ ነገር ግን እዚህ ፈጽሞ አይጸዱም።

**REST API** (`src/lib/resilience/cooldownManager.ts`, ማረጋገጫ፦ management):

- `GET /api/resilience/cooldowns[?provider=]` — ሁኔታ፣ የቀረው የማቀዝቀዣ ጊዜ፣ የድጋሚ መጨመሪያ ደረጃ፣ የመጨረሻው የስህተት አይነት እና የሞዴል መቆለፊያዎች ያላቸውን ግንኙነቶች ይመልሳል (የማረጋገጫ መረጃ የለውም)
- `POST /api/resilience/cooldowns` — የሰውነት ይዘት `{connectionIds: string[]}` ወይም `{all: true, provider?}`፤ `{cleared, unchanged, skippedTerminal, lockoutsCleared}`ን ይመልሳል

### የመቆለፊያ ቅንብሮች UI + በስኬት የሚቀንስ መልሶ ማግኛ (v3.8.23)

የሞዴል መቆለፍ ሁልጊዜ ከሚነቃ በኮድ ውስጥ ከተወሰነ ባህሪ ወደ ሙሉ በሙሉ ሊዋቀር ወደሚችል፣ በተጠቃሚው ፈቃድ ብቻ የሚነቃ ባህሪ ተቀይሯል፤ የራሱ የቅንብሮች ካርድ እና ራሱን የሚያድስ የመልሶ ማግኛ መንገድም አለው።

**የቅንብሮች ካርድ:** ቅንብሮች → የሞዴል መቆለፍ
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)።
ይህ ከላይ ካለው የንባብ-ብቻ `ModelCooldownsCard` **የተለየ** ነው (ይህ ካርድ ንቁ የመቆለፊያ ሁኔታዎችን _ብቻ ይዘረዝራል_) — አዲሱ ካርድ መለኪያዎቹን _ያዋቅራል_። ነባሪዎቹ በ `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ውስጥ ይገኛሉ፦

| ቅንብር                    | ነባሪ                              | ትርጉም                                                        |
| ----------------------- | -------------------------------- | ----------------------------------------------------------- |
| `enabled`               | `false`                          | ዋና መቀየሪያ — የሞዴል መቆለፍ በነባሪ ጠፍቷል።                             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | እንደ የሞዴል ወሰን ያለው አለመሳካት የሚቆጠሩ የላይኛው አገልጋይ ሁኔታዎች።            |
| `baseCooldownMs`        | `120_000` (120 ሰከንድ)             | ለመጀመሪያው አለመሳካት የሚሰጠው የመጀመሪያ የመቆለፊያ ጊዜ።                      |
| `maxCooldownMs`         | `1_800_000` (30 ደቂቃ)             | በደረጃ የሚጨምረው የማቀዝቀዣ ጊዜ ከፍተኛ ገደብ።                             |
| `maxBackoffSteps`       | `10`                             | ከፍተኛው የኤክስፖኔንሻል-ድጋሚ መጨመሪያ ደረጃዎች ብዛት።                        |
| `useExponentialBackoff` | `true`                           | ተደጋጋሚ አለመሳካቶች የማቀዝቀዣ ጊዜውን በኤክስፖኔንሻል መጠን እንዲጨምሩ ወይም እንዳይጨምሩ። |

ቅንብሮቹ በመደበኛው የቅንብሮች ማከማቻ በኩል ይቀመጣሉ እና በየመቋቋሚያ ቅንብሮች ስኪማ ይረጋገጣሉ፤ ካርዱም `baseCooldownMs`/`maxCooldownMs`ን
(`maxCooldownMs ≥ baseCooldownMs` እንዲሆን) እና `maxBackoffSteps`ን በተወሰኑ ገደቦች ውስጥ ያቆያል።

**በስኬት የሚቀንስ መልሶ ማግኛ:** መልሶ ማግኛው በቆጣሪ ጊዜ ማብቂያ ብቻ አይደለም። ጤናማ ምላሽ የሞዴሉን የአለመሳካት ቆጠራ ቀስ በቀስ ወደ ታች ያመጣዋል፤ በመካከለኛው ጊዜ ውስጥ ያገገመ ሞዴል ቆጣሪው ከማለቁ በፊት መጨመሩን እንዲያቆም (እና እንዲጸዳ) ያደርጋል። በተሳካ የcombo ዒላማ ላይ `open-sse/services/combo.ts`
`decayModelFailureCount()`ን ይጠራል (`open-sse/services/accountFallback.ts`)፤ ይህም የተቀመጠውን
`failureCount` በግማሽ ይቀንሳል (`Math.floor(failureCount / 2)`)፤ ወደ `0` ሲደርስ የመቆለፊያ መዝገቡ ሙሉ በሙሉ ይሰረዛል። ተጓዳኙ `recordModelLockoutFailure()` በደረጃ መጨመሪያ ጊዜ መስኮት ውስጥ በሚፈጠሩ አለመሳካቶች ላይ ቆጠራውን ይጨምራል (እና የማቀዝቀዣ ጊዜውን በደረጃ ያሳድጋል)። ይህ በስኬት የሚቀንስ መልሶ ማግኛ ከመደበኛው የቆጣሪ ጊዜ ማብቂያ በተጨማሪ ነው — ሁለቱም መንገዶች ሞዴልን እንደገና ማንቃት ይችላሉ።

**ሁኔታ:** የመቆለፊያ ሁኔታዎች በማስታወሻ ውስጥ ይያዛሉ (በእያንዳንዱ process የሚገኙ `Map`s የ `ModelLockoutEntry` መዝገቦችን በ
`provider:connectionId:model` ቁልፍ ይይዛሉ፤ የትክክለኛ ወሰን መቆለፊያዎች ደግሞ በ
`provider:connectionId:exact:model` ይታወቃሉ)፤ በDB ውስጥ አይቀመጡም — ከዳግም ማስጀመር በኋላ ይጠፋሉ። _ቅንብሮቹ_ ግን ይቀመጣሉ፤ ንቁው የመቆለፊያ _ሁኔታ_ ጊዜያዊ ነው።

---

## 4. የኮታ-ማጋራት ተጓዳኝነት ቁጥጥር (v3.8.36)

የደንበኝነት መለያዎች (GLM፣ MiniMax ወዘተ) ብዙውን ጊዜ ወደ 1–3 የሚጠጉ ተጓዳኝ
ጥያቄዎችን ብቻ ይቀበላሉ፤ ይህን መጠን ማለፍ 429 ስህተቶችን እና የማቀዝቀዣ ጊዜዎችን ያስከትላል። ይህ በ
**ኮታ-ማጋራት** (`qtSd/…`) ጥምረቶች ላይ በተለይ ከባድ ነው፤ በእነዚህ ውስጥ በርካታ API ቁልፎች አንድ የላይኛው ደረጃ መለያ ይጋራሉ። የተጋራ መለያ እንዳይጨናነቅ ሦስት ንብርብሮች ይጠብቃሉ።

### በግንኙነት ደረጃ የተጓዳኝነት ገደብ (`max_concurrent`)

እያንዳንዱ የአቅራቢ ግንኙነት `max_concurrent` የተባለ ከፍተኛ ገደብ ማወጅ ይችላል
(`provider_connections.max_concurrent`፣ በግንኙነት መስኮቱ / API / DB ውስጥ ይዘጋጃል)።
ምንም ገደብ እንዳይኖር ባዶ ይተዉት። ይህ ከዚህ በታች የተገለጸውን የማስተካከያ
ንብርብር የሚቆጣጠረው ብቸኛው ቁልፍ ነው — ከመለያው ትክክለኛ የተጓዳኝነት መጠን ጋር
ያስተካክሉት (ለምሳሌ GLM ~1፣ MiniMax ~2)።

### በሞዴል ደረጃ የተጓዳኝነት ገደቦች (`modelConcurrency`)

አንድ ግንኙነት በተጨማሪ በ`rateLimitOverrides` ካርታው ውስጥ ትክክለኛ በሞዴል ደረጃ የተጓዳኝነት ገደቦችን ማወጅ ይችላል፦

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

በግንኙነት መስኮቱ (**Rate limit overrides → Per-model
concurrency caps**፣ በአንድ መስመር አንድ `model=cap`) ወይም
ተመሳሳይ የJSON ቅርጽ በመጠቀም
`PATCH /api/providers/[id]` አማካኝነት ያዘጋጁት። የቁልፎቹ ትርጉም፦

- **በግንኙነት ሁሉ ላይ የሚሠራ እና በሞዴል ላይ የተመሠረተ:** `maxConcurrent` በጋራ ግንኙነቱ ሁሉ ላይ የሚሠራ ገደብ ሆኖ ይቀጥላል። ሁለቱም ሲተገበሩ፣ ሁለቱም ገደቦች በአንድ ጥምር መግቢያ ውስጥ በአቶሚክ ሁኔታ ይያዛሉ
  (`global → provider → account → model`)፤ ተግባራዊ ውጤቱም የሚመለከተው ጥብቅ ገደብ ይሆናል።
- **ትክክለኛ የሞዴል-ቁልፍ ማዛመድ:** ቁልፉ ከማዞሪያ መፍትሔ በኋላ ወደ executor የሚተላለፈው የሞዴል ሕብረቁምፊ ነው — በመደበኛነት ንጹህ የላይኛው ደረጃ ሞዴል ID
  (`glm-5`) ነው፤ የደንበኛ ወገን `provider/model` ቅጽል (`zai/glm-5` ከ`glm-5` ጋር አይዛመድም) አይደለም። እሴቶቹ አዎንታዊ-ኢንቲጀር የተጓዳኝ ጥያቄ ጣሪያዎች ናቸው።
- **በአካባቢ ወረፋ፣ ግኝት የለም:** ከመጠን በላይ የሆኑ ጥያቄዎች በአሁኑ የወረፋ/የጊዜ ገደብ ስርዓት መሠረት በአካባቢ ይጠባበቃሉ (የተወሰኑ `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` የመግቢያ ስህተቶች)። OmniRoute የላይኛው ደረጃ ፖሊሲን አያገኝም ወይም አይገምትም — ኦፕሬተሩ ያዋቀራቸውን ትክክለኛ ገደቦች ብቻ ያስፈጽማል። የተጨናነቀ የሞዴል መግቢያ አቅራቢውን በፍጹም አያሰናክልም፣ እንዲሁም ቋሚ የሞዴል መቆለፊያ አይፈጥርም፤ የላይኛው ደረጃ 429/የማቀዝቀዣ/የመመለስ ባህሪ የስህተት መከላከያ ሆኖ ይቀጥላል።
- **በግንኙነት እና በሂደት ደረጃ ወሰን:** ገደቦቹ በእያንዳንዱ የዳታቤዝ ግንኙነት ላይ ይተገበራሉ እና በማስታወሻ ውስጥ ይያዛሉ፤ ስለዚህ ተመሳሳይ የላይኛው ደረጃ API ቁልፍን እንደገና የሚጠቀሙ ሁለት ግንኙነቶች እርስ በርሳቸው አይተባበሩም።
- **ያልተዋቀረ ማለት ሳይቀየር መቀጠል ማለት ነው:** ካርታውን መተው (ወይም የዳሽቦርዱን መስክ ባዶ መተው) ምንም የሞዴል መግቢያ አይጨምርም። ምንም አለም-አቀፍ የአቅራቢ ገደብ ሳያረጋግጥ የሚሠራ የውቅር ምሳሌ፦

```text
glm-5=1
glm-4.7=3
```

### የኮታ-ማጋራት ጥያቄ ማስተካከያ

የኮታ-ማጋራት ማሰራጫ አዎንታዊ `max_concurrent` የሚያውጅ ግንኙነትን ሲመርጥ፣ ወደዚያ **መለያ** የሚሄዱ ተጓዳኝ ጥያቄዎች በግንኙነት-ደረጃ ሴማፎር በኩል ይሰለፋሉ (ቁልፍ `qsconn:<connectionId>`)፤ ከመጠን በላይ የሆኑ ጥያቄዎች መለያውን **ከማጨናነቅ ይልቅ በወረፋ ውስጥ ይጠብቃሉ**። ይህ **fail-open** ነው — የተጨናነቀ ወረፋ ወይም የጊዜ ገደብ ቦታ ሳያገኝ ይቀጥላል፤ ሊሰራጭ የሚችል ጥያቄን በፍጹም አይከለክልም። በ **Settings → Resilience → Quota-share per-connection
concurrency** ውስጥ ያብሩት/ያጥፉት
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`፣ በነባሪ እንደበራ)። `max_concurrent` ገደብ ከሌለ ባህሪው እንደበፊቱ ይቀጥላል።

> የኮታ-ማጋራት ማዞሪያ መግቢያ (`selectQuotaShareTarget`፣ DRR + P2C) ራሱ **fail-open** ነው፤ እና በገደቡ ላይ የደረሰ ግንኙነትን ቅድሚያ ብቻ ያሳንሳል — አንድ ግንኙነት ብቻ ባለበት ገንዳ ውስጥ ጠንካራ ገደብ ሊያደርግ አይችልም፤ ስለዚህ ጎርፉን በትክክል የሚቆጣጠረው ይህ ሴማፎር ነው።

### ጥምር የማቀዝቀዣ-ጊዜ ግንዛቤ ያለው ዳግም ሙከራ

ለእያንዳንዱ የጥምር ስትራቴጂ (ሲነቃ)፣ ለአጭር ጊዜ የሚቆይ የሽግግር ማቀዝቀዣ ጊዜ 429 የሚያስከትል ጥያቄ ይህን ጊዜ ይጠብቃል እና 429 ከመመለስ ይልቅ እንደገና ይሰራጫል — ይህ በብዙ-ሞዴል ጥምረቶች ላይ የሚታዩ የGemini ዓይነት TPM/RPM መስኮቶችን (~60s retry-after) ይሸፍናል፤ ለምሳሌ የ2-ሞዴል ጥምረት ሁለቱም ዒላማዎች በአንድ ሞዴል የመጠን ገደብ ላይ ሲደርሱ። ይህ በ **Settings → Resilience** ውስጥ ባለው `comboCooldownWait` (`enabled`፣ `maxWaitMs`፣ `maxAttempts`፣ `budgetMs`) ይገደባል። በ`quota_exhausted` (እስከ እኩለ ሌሊት የተቆለፈ) ወይም በማረጋገጫ/በማይገኝ ምክንያቶች ላይ በፍጹም አይጠብቅም።

ጥምረት `config.comboCooldownWaitEnabled: false` በመጠቀም ከዚህ ሊወጣ ይችላል። እነዚህን የተጋሩ የጥምር መጠበቂያዎች (ከስርጭት በኋላ ያለው ማቀዝቀዣ እና ከስርጭት በፊት ያለው የሰርኪት-ክፍት/የሞዴል-መቆለፊያ መጠበቂያ) እና የመጠበቂያ በጀት የጊዜ-ገደብ ወለል ማራዘሚያቸውን የሚያሰናክለው ቃል በቃል `false` ብቻ ነው። ያልተሰጠ ወይም `true` መሆኑ ዓለም-አቀፉን ፖሊሲ ይጠብቃል፤ `true` ዓለም-አቀፍ በሆነ ሁኔታ የተሰናከለ መጠበቅን ማንቃት አይችልም። ግልጽ `targetTimeoutMs` አሁንም የበላይ ነው። ይህ ከተለየው የnative-Codex ዙር-ፒን ከስርጭት በፊት ያለ መጠበቅ ባህሪ ላይ ምንም ለውጥ አያመጣም።

ይኸው መግቢያ የከስርጭት በፊት ሁኔታንም (#16319) ይሸፍናል፦ ማንኛውም ሙከራ ከመደረጉ በፊት እያንዳንዱ የጥምሩ ዒላማ ሞዴሉ በአጭር ጊዜ የሚቆይ መቆለፊያ ላይ ስለሚገኝ ሲዘለል፣ ዜሮ-ሙከራ መንገዱ በተመሳሳይ ጣሪያዎች ስር መቆለፊያው እስኪያልፍ ይጠብቃል እና ከhint-ነጻ
`503 ALL_TARGETS_SKIPPED` ከመመለስ ይልቅ እንደገና ይሰራጫል። መጠበቅ በማይፈቀድበት ጊዜ (ጣሪያው፣ የሙከራ ወይም የበጀት መጠኑ ሲያልቅ፣ ወይም ባህሪው ሲጠፋ) የመጨረሻ ምላሹ ከቀዳሚው የሽግግር መቆለፊያ መጨረሻ የተወሰደ `retry_after` / `reset_at` የያዘ
`429 rate_limit_error` ይሆናል፤ የኮታ፣ የማረጋገጫ እና የማይገኝ መቆለፊያዎች ግን hint-ነጻ 503 ይቀጥላሉ።

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

## 5. የጥያቄ ሰልፍ መግቢያ ቁጥጥር (v3.8.49 · ጉዳይ #6593)

**ወሰን**፡ ከላይ ካሉት ሦስቱ ዘዴዎች አንድ ደረጃ በታች ያለው የአካባቢ የእያንዳንዱ አቅራቢ+ግንኙነት የፍጥነት ገደብ ሰልፍ (`open-sse/services/rateLimitManager.ts`፣ በ Bottleneck የሚደገፍ)።

**`maxWaitMs` የሰልፍ ጥበቃን ይገድባል፤ `executionMaxWaitMs` አፈጻጸምን ይገድባል።** ሁለቱ ሆን ተብለው የተለያዩ ናቸው፣ አንዳቸውም ሌላውን አይመግቡም።

`resilienceSettings.requestQueue.maxWaitMs` **የሰልፍ ጥበቃ በጀት** ነው፡ የአቅራቢ ቦታን መጠበቅን እና ከዚያም በ QUEUED ሁኔታ መቀመጥን ይሸፍናል፣ እና ሰዓት ቆጣሪው ስራው QUEUED ለቆ ማስፈጸም ሲጀምር ወዲያውኑ ይጠፋል (`rateLimitManager.ts`፣ `wrappedFn`)። ይህን የሚያልፍ ጥያቄ ወደ ወደላይ በፍጹም አይደርስም። ነባሪ 30000ms፣ በ `src/lib/resilience/settings.ts` ውስጥ በ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` የሚቀርብ እና በ `tests/unit/ratelimit-admission-control-6593.test.ts` የተሰካ፣ ስለዚህ በእሱ ላይ የሚደረግ ለውጥ ይህ አንቀጽ በጸጥታ ከመታረዙ ይልቅ ያንን ፈተና ቀይ ያደርገዋል።

`resilienceSettings.requestQueue.executionMaxWaitMs` Bottleneck እንደ ስራው `expiration` የሚቀበለው ነው፣ የሱ ሰዓት ቆጣሪ ከመላክ በኋላ ብቻ ይጀምራል። የራሱ ወደላይ የጊዜ ገደብ ለሌላቸው አስፈጻሚዎች የመጨረሻ መከላከያ ነው፣ እና የአስፈጻሚው የራሱ የመሳብ መጀመሪያ የጊዜ ገደብ ሲረዝም ወደዚያ ከፍ ይላል፣ ስለዚህ ጤናማ በሂደት ላይ ያለ ምላሽን ማቋረጥ አይችልም። ነባሪ 600000ms (10 ደቂቃ)።

የሰልፍ በጀቱን ወደ `expiration` ማስገባት ቀደም ሲል ተራማጅ-ያልሆኑ በሮችን በሂደት ላይ የሚገድል ነበር — እነሱ በትክክል የመጀመሪያ ባይቶች ከመድረሳቸው በፊት ለደቂቃዎች ይሮጣሉ — እና ለዚህም ነው ጊዜ ማለቂያ በ `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) የሚታየው ሲሆን የሰልፍ በጀቱ የሰልፍ-ጊዜ-ማለቂያ ኮድ ይይዛል። አንዱንም በ `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ወይም በዳሽቦርድ (**Settings → Resilience**) ይሽሩ። ሁለቱም ሲመደቡ ወደ 1ms–24h ይገደባሉ።

**ቅድሚያ፣ ለሁለቱም፡** የ env ተለዋዋጭ የሚያቀርበው _ነባሪውን_ ብቻ ነው። በ `resilienceSettings.requestQueue` ውስጥ የተቀመጠ እሴት (ዳሽቦርድ / API patch፣ በ `key_value` ውስጥ የተከማቸ) በእሱ ላይ ያሸንፋል፣ እና የእያንዳንዱ ግንኙነት `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` በዚያ ላይ ያሸንፋል። ስለዚህ ቀድሞውኑ የተቀመጠ እሴት ባለው ማሰማራት ላይ የ env ተለዋዋጭን ማዘጋጀት ምንም አይለውጥም — በምትኩ የተቀመጠውን ቅንብር ያጽዱ ወይም ያዘምኑ።

የሰልፍ ቆይታ በ `maxWaitMs` ይገደባል፤ ከዚህ በታች ያለው `maxQueueDepth` በአንድ ጊዜ ስንት ደዋዮች ሊሰለፉ እንደሚችሉ ይገድባል።

**በሰውነት የተገለጹ ድጋሚ ሙከራዎች፡ ፍጥነት ማስተካከል እና መቆለፍ።** የ 429 ሰውነት የራሱን ጥበቃ ሊጠቅስ ይችላል (Gemini `RetryInfo.retryDelay`፣ "retry after Ns" ጽሑፍ)፣ ይህም `updateFromResponseBody` ያነባል። ከግንኙነቱ `maxWaitMs` ጋር የሚስማማ ጥበቃ ፍጥነት ማስተካከል ነው፡ ገዳቢው ማጠራቀሚያውን ለዚያ ጊዜ ያጠፋል እና የተሰለፉ ጥሪዎች ሲሞላ ይላካሉ። ከ `maxWaitMs` የሚበልጥ ጥበቃ ሰልፉ መቆየት የማይችለው ነገር ነው — Gemini የተጨረሰ የዕለታዊ ኮታ በ `retryDelay: "86399s"` ይመልሳል። በተገነባው 429 (#16528) ላይ የተላለፈው `Retry-After` ቀድሞውኑ የመውደቅ ሞተር ሞዴሉን ለዚያ ጊዜ እንዲቆልፍ ያደርጋል፣ ነገር ግን ገዳቢውንም ለዚያ ማቆም ቁልፉ ቀደም ብሎ የሚደርስበትን ማንኛውንም ጥሪ (ለምሳሌ ከመቋቋም ዳግም ማስጀመር በኋላ) ለጠቅላላው `maxWaitMs` አሁንም ያቆማል። እንዲህ ያለ ጥበቃ ከተየመ Google `RetryInfo` ዝርዝር (የ `google_rpc_retry_info` መነሻ) ሲመጣ እና የቁልፉ ገዳቢ ቀድሞውኑ በሞዴሉ ላይ ሲወሰን (see `getLimiterKey`)፣ 429 በምትኩ በዚያ ግንኙነት ላይ የሞዴል መቆለፍ ይሆናል (`lockModelForLongBodyRetry` በ `open-sse/services/rateLimitManager/bodyRetryPause.ts` ውስጥ፣ እስከ 24h የተገደበ)፣ ገዳቢውም ሳይቆመ ይቀመጣል። የመገልገያ ምርጫ በዚያ መቆለፍ ላይ በ `isModelLocked()` ያልፋል፣ እንዲሁም ከግንኙነቱ ጋር ለተሰኩ ዒላማዎች የቅንጅት ቅድመ-መላክ በር ያልፋል። በ antigravity ላይ፣ ገዳቢው በአንድ የኮታ ቤተሰብ ስለሆነ፣ መቆለፉ ልክ በሞዴሉ ላይ ነው፣ ልክ እንደ ሌሎች የኮታ መቆለፊያዎቹ። አንድ ተለዋጭ ስም ወደዚያ ሞዴል ሲፈታው ደንበኛው የጠየቀበት ስምም ይቆለፋል፣ ምክንያቱም እነዚያ ፍተሻዎች የተጠየቀውን ስም ይጠቀማሉ፤ በትክክል ይቆለፋል (`lockExactModel`)፣ ስለዚህ የ antigravity የኮታ ቤተሰብን ወይም የ codex ወሰንን የሚያቋርጥ ተለዋጭ ስም የራሱን ፈጽሞ አይቆልፍም። የጽሑፍ ፍንጭ፣ ያልተየመ `retryDelay`፣ ወይም በጠቅላላው ግንኙነት የሚጋራ ገዳቢ ማቆሙን ይይዛል። የ 429 መንገድ አሁን የገነባው ገዳቢ ሲቆም፣ ቀሪው የሰልፍ ጊዜ ከማቆሙ በፊት የሚያልቅለት ደዋይ ያንን ጊዜ ከመጠበቅ ይልቅ ወዲያውኑ በሰልፍ-ጊዜ-ማለቂያ ኮድ ይመለሳል (`checkLimiterPause`)፤ የተመዘገበው መጨረሻ ገዳቢው ከመገነባቱ በፊት ይሰይማል፣ Bottleneck የማደሻ ሰዓቱን የሚጀምርበት ቦታ፣ እና በማጠራቀሚያው ላይ ማንኛውም በኋላ የሚደረግ ለውጥ ይረሳዋል። በ `tests/unit/rate-limit-long-body-retry-lockout.test.ts` እና `tests/unit/rate-limit-body-retry-pause.test.ts` የተሸፈነ።

**`maxQueueDepth` — ምርጫ-መር የመግቢያ ገደብ (አዲስ)።** `resilienceSettings.requestQueue.maxQueueDepth` ለአንድ አቅራቢ+ግንኙነት በአንድ ጊዜ ስንት ጥያቄዎች ሊሰለፉ (እስካሁን ያልተላኩ) እንደሚችሉ ይገድባል። ሰልፉ ቀድሞውኑ `maxQueueDepth` ጥያቄዎችን ሲይዝ፣ አዲስ ጥያቄ **`limiter.schedule()` ከመድረሱ በፊት** በተየመ `code: "RATE_LIMIT_QUEUE_FULL"` ስህተት በፍጥነት ውድቅ ይደረጋል — ስለዚህ ውድቅ ማድረጉ ርካሽ ነው እና ለዚያ ጥያቄ ከሚከተለው የፕሮምፕት-መጭመቅ / ትርጉም ስራ በፊት ይከናወናል። ነባሪ `0` = ተሰናክሏል፣ ያለውን ያልተገደበ የሰልፍ ባህሪ ይጠብቃል፤ ከ 0–100000 የተገደበ። በ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ወይም `resilienceSettings.requestQueue.maxQueueDepth` (ዳሽቦርድ/API patch) ይሽሩ።

የመግቢያ ፍተሻው ራሱ ንጹህ ተግባር ነው (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ስለዚህ ያለ እውነተኛ Bottleneck ገዳቢ በክፍል-ፈተና ሊፈተን ይችላል።

> #6593 ን የከፈተው RFC እንዲሁም `bypassCompressionOnRateLimit`
> የተሰኘ ባንዲራ (flag) አቅርቧል። የዚህ ሪፖ `open-sse/services/compression/` ፓይፕላይን
> በወጪው LLM ጥያቄ ላይ የ prompt/context ማጭበርበር ነው (`chatCore.ts`፣
> በ `resolveCompressionSettings`/`selectCompressionStrategy` ብሎክ አካባቢ)፣
> ማለትም በሲስተሙ የተፈጠሩ 429 አካላት ላይ የ HTTP ምላሽ ማጭበርበር አይደለም — ለትክክለኛው bypass
> ባንዲራ የሚዛመድ የኮድ መንገድ የለም። ይህ የ prompt ማጭበርበር ደረጃ ደግሞ በአሁኑ ጊዜ በጥያቄው
> ፓይፕላይን ውስጥ ከ `withRateLimit()` _በፊት_ ይሰራል፣ ስለዚህ ተራው ሙሉ ሲሆን በሚሰጥ
> እምቢ-አለባበስ (queue-full rejection) ላይ እንዲዘለል ማደራጀት ከዚህ issue መስክ በላይ
> የሆነ ለየት ያለ ትልቅ ለውጥ ነው፤ እዚህ በዓላማ **አልተተገበረም** እና የ CPU ማዳን ትርፉ
> የማደራጀቱን አደጋ የሚገባ ከሆነ ለቀጣይ ስራ (follow-up) ተተወ።

### የ Rate-Limit ራስ-ሰር ማንቃት የደህንነት መረብ እና የግንኙነት ጥበቃ (`rateLimitProtection`)

**ራስ-ሰር ማንቃት የደህንነት መረብ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`፣ ነባር `true`)፦
በነባሪ፣ OmniRoute ለሁሉም ንቁ የ API-key አቅራቢ ግንኙነቶች (`getProviderCategory(provider) === "apikey"`) የ rate-limit ተራ ጥበቃን በራስ-ሰር ያነቃል። ይህ ለ rate-limit ስሜታዊ የሆኑ upstream API ቁልፎች የሚሄዱ ገቢ ጥያቄዎች ወደ upstream 429 ስህተቶች ሳይፈነዱ በ Bottleneck አማካይነት ተራ መስመር ላይ እንዲገቡ እና እንዲቆጣጠሩ ያረጋግጣል። የደህንነት መረቡ በ `RATE_LIMIT_AUTO_ENABLE` የአካባቢ ተለዋዋጭ ሊተካ ይችላል (`false`/`0`/`off` ያሰናክላል፣ `true`/`1`/`on` በግድ ያነቃል)፣ ይህም በዳሽቦርዱ የተቀመጠውን ቅንብር (**ቅንብሮች → Resilience** / `PATCH /api/resilience`) ቅድሚያ ይወስዳል።

**የእያንዳንዱ ግንኙነት `rateLimitProtection` ትርጓሜ፦**
የእያንዳንዱ ግንኙነት rate-limit ጥበቃ በአቅራቢ ግንኙነቶች ላይ ባለው `rateLimitProtection` ቡሊያን መስክ (boolean field) ይከታተላል (በ SQLite ውስጥ እንደ `rate_limit_protection` ተቀምጧል)፦

- **ግልጽ ነቅቷል (`rateLimitProtection === true`)**: የ rate-limit ጥበቃ ለዚህ ግንኙነት በግልጽ ነቅቷል፣ የአቅራቢው ምድብ ምንም እንኳን ወይም ራስ-ሰር ማንቃት የደህንነት መረብ ነቅቶ እንኳን ምንም ለውጥ አያመጣም።
- **ግልጽ ጠፍቷል (`rateLimitProtection === false`)**: ግልጽ ጥበቃን ያሰናክላል፣ ነገር ግን ንቁ የ API-key ግንኙነትን ከአጠቃላይ ራስ-ሰር ማንቃት የደህንነት መረብ **አያወጣም**። በ `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) ውስጥ፣ `false` እና `undefined` እኩል ናቸው፦ `rateLimitProtection === true` ብቻ እንደ ግልጽ ተበልጦ ማስተካከያ (explicit override) ይቆጠራል። `rateLimitProtection` `false` (ወይም ያልተዋቀረ) ከሆነ፣ ንቁ የ API-key ግንኙነት አሁንም የራስ-ሰር ማንቃት ሁኔታውን ያሟላል እና በ rate-limit የተጠበቀ ይቆያል።
- **በግንኙነት ደረጃ ማምለጫ የለም**: ኦፕሬተር ለሌሎች ራስ-ሰር ማንቃትን ንቁ አድርጎ ሲያቆይ "ይህ ነጠላ ንቁ የ API-key ግንኙነት ያለ rate-limit ተራ ጥበቃ መሥራት አለበት" የሚል በአሁኑ ጊዜ መግለጽ አይችልም። የ API-key ግንኙነቶችን ሙሉ በሙሉ ያለ rate-limit ተሮች ለማስሄድ፣ የደህንነት መረቡ በአጠቃላይ መጠፋት አለበት (`RATE_LIMIT_AUTO_ENABLE=false` ወይም `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)።

**የሚደገፉ የጽሑፍ መንገዶች፦**

- **`POST /api/rate-limits`**: ለአንድ ግንኙነት `rateLimitProtection` ን ለመቀያየር (toggle) የሚደገፍ የአስተዳደር የጽሑፍ መንገድ (`{ connectionId: string, enabled: boolean }`)። ይህን በ `enabled: true` መጥራት ግልጽ ጥበቃን ያነቃል፤ በ `enabled: false` መጥራት ግልጽ ጥበቃን ያስወግዳል (ምንም እንኳን ራስ-ሰር ማንቃት ነቅቶ ከሆነ ንቁ የ API-key ግንኙነቶች አሁንም በአጠቃላይ የደህንነት መረብ ስር ይሸፈናሉ)።
- **`PUT /api/providers/[id]`**: በዓላማ `rateLimitProtection` ን ማቀበል ወይም መቀየር **አይችልም** (#11278)። የአቅራቢ ግንኙነት ሜታዳታን በ `PUT /api/providers/[id]` ማዘመን የተቀመጠውን የ rate-limit ጥበቃ ሁኔታ በጭራሽ አይለውጥም።

---

## 6. ቀርፋፋ ፍሰት የሚከታተል (#9709)

የአማራጭ `resilienceSettings.streamRecovery.throughputWatchdog` ጠባቂ አሁንም ቁርጥራጮችን እየላከ ነገር ግን ከተዋቀረው ጠቃሚ የውጤት መጠን በታች የረዳት ውፅዓት የሚያመጣ የወራጅ ፍሰትን ያገኛል። ሆን ተብሎ ከስራ ፈት ጊዜ ማብቂያ የተለየ ነው፡ የልብ ምቶች እና የሜታዳታ ዳግም ማስጀመር የሰዓት ቆጣሪ አይደሉም እና እንደ እድገት አይቆጠሩም። እንዲሁም ከጠንካራ ሙከራ የመጨረሻ ቀን (#9153) የተለየ ነው፣ ይህም የውጤት ጥራት ምንም ይሁን ምን ፍፁም የደህንነት ጣሪያ ነው።

ጠባቂው ፅንስ ከመውጣቱ በፊት የማሞቅ ጊዜን እና ሙሉ በሙሉ የሚሽከረከር መስኮት ያስፈልገዋል. ከቻት ማጠናቀቂያ የጽሁፍ ዴልታዎችን ይቆጥራል እና ምላሾች API ውፅዓት ክስተቶች (ወግ አጥባቂ UTF-8 ባይት ተኪ)፣ የአጠቃቀም-ብቻ እና ባዶ ክስተቶችን ችላ ይላል፣ እና የመሳሪያ ጥሪ ወይም የማመዛዘን ክስተቶች በበረራ ላይ እያሉ ፍርድን ያቆማል። በነባሪነት ተሰናክሏል እና በ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ሊነቃ ይችላል (ያ የ env እሴት ነባሪው — የተቀመጠ `resilienceSettings.streamRecovery.throughputWatchdog.enabled` ቡሊያን ያሸንፋል፤ በዚህ መመሪያ አናት ላይ ያለውን env-vs-dashboard ቀዳሚ ማስታወሻ ይመልከቱ)። መስኮቱ, ማሞቂያ, ዝቅተኛው ፍጥነት እና አነስተኛ መጠን ያለው ውፅዓት በተለመደው የመልሶ ማቋቋሚያ-ቅንጅቶች መደበኛነት ንብርብር የተገደቡ ናቸው.

ሲነቃ፣ የጠባቂ ውርጃ የሚተገበረው በንቃት ወደ ላይ ባለው ሙከራ ላይ ብቻ ነው። ከማንኛውም ደንበኛ ከሚታዩ ባይቶች በፊት፣ ያለው ተመሳሳዩ መለያ ቀደም-የማገገሚያ መንገድ ሙከራውን እንደገና ሊከፍት ይችላል። ከተፈፀመ በኋላ ዥረቱ በጭፍን አይጫወትም; አሁን ያለው የአስተማማኝ የመሃል ዥረት ቀጣይ ውል ብቻ ነው ቅጥያ መስፋት የሚችለው። ማጠናቀቅ በነጠላ-ምት ይቀራል፣ ስለዚህ የአጠቃቀም ሒሳብ አያያዝ እና ሴማፎር መልቀቅ የተባዙ አይደሉም።

---

## 7. የአፕስትሪም ሁኔታ እንደገና መግለጽ (ተሳሳተ የኩባንያ ስህተቶች)

**ወሰን፡** አንድ አፕስትሪም ጌትዌይ ጊዜያዊ የኩባንያ ጥያቄ መጨረሻን በተሳሳተ የHTTP ሁኔታ የሚገልጽ።

**ዓላማ፡** ከምደባ በፊት የሚያምታታውን ሁኔታ ማረም፣ በዚህም የታችኛው ዥረት ተጠቃሚዎች
(fallback engine, combo aggregation, client-facing response) የስህተቱን እውነተኛ
እንደገና ሞክር የሚያደርግ ባህሪ እንዲመለከቱ ማድረግ ነው።

አንዳንድ ጌትዌዮች ጊዜያዊ የኩባንያ ጥያቄ መጨረሻን በእንደገና ሞክር የማይቻል HTTP ሁኔታ ይገልጻሉ።
`agentrouter.org` የመደበኛውን `429` በማያደርግበት መልኩ `403` (አንዳንዴ `400`) በቻይናኛ
የሰውነት ጽሑፍ (`用户额度不足` / `额度不足`) ይመልሳል። ክሎድ ኮድ የመሰሉ ደንበኞች `403`ን
ዘላለማዊ ብለው ያስባሉ እና ክፍለ ጊዜውን ያቋርጣሉ፣ እና ማረም ሳይደረግ fallback engine እንደ ኩባንያ
ክስተት በመተካት እንደ `AUTH_ERROR` ይመድበው ነበር።

**ተግባራዊነት፡**

- የመዝገብ ሥፍራ + matcher፡ `open-sse/config/upstreamStatusRestatement.ts` — ለአንድ አቅራቢ
  ደንቦች ዝርዝር (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers,
defaultRetryAfterMs}`), በ `applyStatusRestatement()` የሚዛመድ።
- የጥሪ ቦታ፡ `open-sse/handlers/chatCore.ts` ውስጥ ያለው `providerFailure:` ብሎክ (ወደ 3654ኛ
  መስመር አካባቢ)፣ `parseUpstreamError()` አንድን የአፕስትሪም ምላሽ በስህተት HTTP ሁኔታ
  (`!providerResponse.ok`) ካተነተነ በኋላ፣ ከምንም ዓይነት ምደባ ከመሮጡ በፊት ነው፣ በመሆኑም ንብረት
  የሚመለከቱ ተጠቃሚዎች ሁሉ የተረሙትን ሁኔታ ያያሉ። በ`200` SSE ዥረት ውስጥ የተቀመጡ ስህተቶች ተለየ እና በኋላ
  የዥረት ትንተና መንገድ ይከተላሉ እና ዛሬ በዚህ ማገድ የማይሸፈኑ ናቸው — የታወቀ ገደብ ነው፣ ለagentrouter አሁን
  የሚታየው ተሳሳተ ሁኔታ (እንደ ስህተት HTTP ሁኔታ የሚወጣው) ገና አያስፈልግም።
- የእንደገና ሞክር ብቁነት፡ `429` በ `RETRY_AFTER_ELIGIBLE_STATUSES` ውስጥ ነው
  (`open-sse/services/combo/unavailableRetryGate.ts`)፣ በመሆኑም እንደገና የተገለጸው ስህተት
  እውነተኛ የእንደገና ሞክር መስኮት ያለው ሆኖ ይመጣል እንጂ እንደ ያልሰራ `403` አይወጣም።
- በሰነድ የተዘጋጀው `60s` `defaultRetryAfterMs`
  (`upstreamStatusRestatement.ts`) የተረሙትን ምላሽ ለ**ደንበኛው** የሚነግረው ብቻ ነው፤ ራሱ
  የኮኔክሽኑ ውስጣዊ cooldown/lockout ቆይታ አይደለም — ያ የሚቆጠጠረው እንደገና የተገለጸውን ስህተት በእውነት
  የሚያስተናግደው ስርዓት ነው (የኮኔክሽን Cooldown በሚያድግ backoff, §2, ለAPI-key አቅራቢዎች መሠረት
  `3s`፤ ወይም ለአንድ አንድ ሞዴል ኩባንያ አቅራቢዎች እንደ agentrouter Model Lockout, §3)። ራውተሩ
  ለደንበኛው ከሚያስታውቀው 60s መስኮት በፊት በውስጡ እንደገና ለሞክር ብቁ መሆን ይችላል — አላማ የተደረገ ክፍተት
  ነው፤ bug አይደለም።

ዘላለማዊ ስህተቶች (የagentrouter `无权访问模型` — ይህንን ሞዴል ለመድረስ መብት የለውም) በጭራሽ አይረሙም፤
`excludeMarkers` ደንቡን ያግዳል፣ `textMarkers` ቢመታው እንኳን፣ በመሆኑም ስህተቱ የገዛውን ዋና ሁኔታ ያቆየዋል
እና ምንም ነገር ለዘላለም እንደገና አይሞክረውም። የሚዛመደው የአቅራቢ ምደባ ደንብ
(`agentrouter-model-access-denied` በ `open-sse/config/providerErrorRules.ts` ውስጥ፡
`reason: "auth_error"`, `scope: "model"`, የተዘረዘረው መሠረታዊ `6h` cooldown) በ
`checkFallbackError` (`open-sse/services/accountFallback.ts`) የሚከናወነው ከባጠቃላዩ
apikey-መደብ `FORBIDDEN` _አስቀድሞ-መመለስ_ በፊት ነው፣ በ `honorsRuleLockScope(provider)` (#10334 —
በአሁኑ ጊዜ ብቻ agentrouter የሚያከናውነው በ `providerErrorRules.ts` ውስጥ ያለውን
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist በመጠቀም) የሚቆጠበር። ደንቡ የደነገገው 6h cooldown
እንደ `fallbackResult.baseCooldownMs` ያልፋል፣ ነገር ግን አሁን ያለውን በአንድ ሞዴል ኩባንያ መሠረት
የሚቆለፍ መንገድ (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, ከcooldown
ምንጩ በስተቀር በ#10334 ሳይቀየር) ያመረቅዛል፤ ወደ የአስተዳዳሪውን `mlSettings.maxCooldownMs` (ነባሪ
`1_800_000ms` / 30 ደቂቃ) እንደ ሌሎች ሁሉ የሞዴል ቆላፊዎች ይታጠቃል፣ እና _የተቆለፈው ምክንያት_ የነበረውን በኮድ
የተገነባ `"forbidden"` ይቆየዋል፣ የደንቡን `"auth_error"` አይደለም — የሚከበረው ከመጨረሻ እስከ መጨረሻ
የcooldown ቆይታው ብቻ ነው፣ የምክንያቱ ሐረግ አይደለም። ኮኔክሽኑ ራሱ ንቁ ይቆያል፤ በዚያው ኮኔክሽን ላይ ያሉ
የተዛማጅ ሞዴሎች አይተጎዱም።

እንደገና የተገለጹ የኩባንያ ስህተቶች (`额度不足`) በምርት ላይ ያለውን የአቅራቢ ደንብ ይደርሳሉ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, የራሱ የተዘረዘረ cooldown የለውም — የማቆየት ክፍል ሚዛናዊ backoff ነባሪ ይተገብራል)።
ከ#10334 ጀምሮ፣ በ `ProviderErrorRuleMatch` ላይ ያለው `scope` ከመጀመሪያ እስከ መጨረሻ ይወጣል፣ ነገር ግን
**ብቻ** በ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist (`providerErrorRules.ts` —
ዛሬ ለ `"agentrouter"` ብቻ፣ በ `honorsRuleLockScope()` የሚቆጠበር) ውስጥ ላሉ አቅራቢዎች ነው። ለሌሎች ሁሉ
አቅራቢዎች `scope` ከ#10334 በፊት እንደነበረው ሁሉ መረጃዊ ይቆያል። `checkFallbackError` የተዛመደውን ደንብ
scope እንደ `fallbackResult.ruleScope` ያቀርባል፤ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) የጋራ ጠባቂ ነው፣ ያንን `ruleScope` በእውነት እንደ ኮኔክሽን-ስፋት፣
ራስን-እንደገና የሚያገናኝ ምልክት ለማክበር ደህንነቱ የተጠበቀ መሆኑን የሚያረጋግጥ (scope `"connection"`, reason
`quota_exhausted`, በጭራሽ `permanent` አይሆንም፣ በጭራሽ `creditsExhausted` አይሆንም — በወደፊት scope
`"connection"`ን ከዘላለማዊ የአካውንት ሁኔታ ጋር የሚያገናኝ ደንብን ለመከላከል)። ሁለት ተጠቃሚዎች ይደውሉታል፡

- **ዘላቂ ማከማቻ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  ወደ passthrough-provider **በእያንዳንዱ ሞዴል** የመቆለፍ
  ቅርንጫፍ ከመግባት ይልቅ (agentrouter `passthroughModels: true` ነው → `hasPerModelQuota()`
  `true` ይመልሳል)፣ **ጊዜያዊ የግንኙነት ማቀዝቀዣ ጊዜ** ይተገብራል —
  `testStatus: "unavailable"` + `rateLimitedUntil`፣ ፈጽሞ የመጨረሻ ሁኔታ
  (`credits_exhausted`/`banned`/`expired`) አይደለም — ስለዚህ ማቀዝቀዣው
  ጊዜው ሲያልቅ ግንኙነቱ በእጅ የማረጋገጫ መረጃ ዳግም ማስጀመር ሳያስፈልገው
  ራሱን ያገግማል። `disableCooling: true` ላላቸው ግንኙነቶች ይዘለላል
  (#2997)፦ ያ የመውጣት ምርጫ በምትኩ ወደ በእያንዳንዱ ሞዴል መቆለፍ
  ያልፋል (በሰነድ የተገለጸ የጥቅምና ጉዳት ሚዛን —
  ከቅርንጫፉ በላይ ያለውን የኮድ አስተያየት ይመልከቱ)።
- **በተመሳሳይ ጥያቄ ውስጥ የcombo ማስተላለፊያ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`)፦ ተመሳሳዩ መከላከያ ግንኙነቱን
  `${provider}:${connectionId}` በሚለው ቁልፍ ወደ ውስጠ-ማህደረ ትውስታው
  `exhaustedConnections` ስብስብ ያክለዋል። ይህ የሚዘለው ቀሪ
  የተመሳሳይ-ጥያቄ ዒላማን ብቻ ሲሆን፣ ዒላማው _ራሱ በራሱ ዒላማ
  ነገር ላይ ያንኑ `connectionId` የያዘ_ ከሆነ ነው
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ከ`exhaustedConnections` ፍለጋ በፊት) — ቀላል
  የሞዴል-ዝርዝር combo፣ ወንድም ዒላማዎቹ የራሳቸው የተወሰነ `connectionId`
  የሌላቸውበትና አንዱ ከምላሹ `X-OmniRoute-Selected-Connection-Id`
  ራስጌ በእያንዳንዱ መላክ ብቻ የሚፈታበት፣ ያንን የቁልፍ ማዛመድ
  ፈጽሞ አያገኝም። በዚያ የተለመደ ሁኔታ፣ ቀሪ እርምጃ አሁን የተሟጠጠውን
  መለያ ዳግም እንዳይጠቀም የሚያደርገው እውነተኛ ጥበቃ ይህ Set
  አይደለም — ከላይ ያለው የዘላቂ ማከማቻ ንብርብር
  (የግንኙነቱ `rateLimitedUntil` አሁን ወደፊት ነው) ከዚሁ መከላከያ
  ጋር ተጣምሮ ለውድቀቱ `transientRateLimitedProviders` እንዳይካተት
  ማድረጉ ነው (ከታች «ባለሁለት-ደረጃ ንድፍ»ን እና
  በ`targetExhaustion.ts` ውስጥ ባለው
  `isAgentrouterConnectionQuotaScope` ቅርንጫፍ ላይ ያለውን የኮድ
  አስተያየት ይመልከቱ)፦ ያ Set ሳይመረጥ፣ የ`combo.ts`
  `allowRateLimitedConnection` በግድ የመፍቀድ ባህሪ
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ለቀሩት
  የአቅራቢው እርምጃዎች አይነሳም፤ ስለዚህ የማረጋገጫ መረጃ ምርጫው
  `rateLimitedUntil` ማጣሪያ (`src/sse/services/auth.ts:1238`) በመደበኛው
  ሁኔታ ይከበራል፣ እና ቀሪ እርምጃው ሌላ፣ አሁንም ብቁ የሆነ
  agentrouter ግንኙነት ይመርጣል ወይም ምንም የማረጋገጫ መረጃ
  ባለመኖሩ ይወድቃል — ይህ ቅርንጫፍ አሁን ወደ ማቀዝቀዣ ጊዜ
  ያስገባውን ግንኙነት በግድ ዳግም አይጠቀምም።

### ባለሁለት-ደረጃ ንድፍ፦ የሁኔታ ዳግም መግለጽ፣ ከዚያም ምደባ

የሁኔታ ዳግም መግለጽ (`upstreamStatusRestatement.ts`) እና የአቅራቢ
ምደባ ደንቦች (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ሁለቱም በአቅራቢ መለያ እና በጽሑፍ ምልክቶች
ላይ ቁልፍ የሚያደርጉ የተለያዩ መዝገቦች ናቸው፣ ነገር ግን በተለያዩ
ቦታዎች ይሰራሉ እና የተለያዩ ዓላማዎችን ያገለግላሉ፦ ዳግም መግለጹ
በ`chatCore.ts` ውስጥ የHTTP ሁኔታን ቀድሞ ይጽፈዋል፤ የምደባ
ደንቦች ደግሞ በ`checkFallbackError()` ውስጥ የfallback `reason`ን
እና የመቆለፊያ `scope`ን (`model` / `provider` / `connection`) ይመርጣሉ
(`open-sse/services/accountFallback.ts`)።

የምደባ ደንቦች ሙሉ የስህተት **ጽሑፍ**ን (`额度不足` ያሉ የbody
ምልክቶችን ለማዛመድ የሚያስፈልግ) የሚያዩት በ`providerErrorRules.ts`
ውስጥ ባለው `FULL_TEXT_RULE_PROVIDERS` የፍቃድ ዝርዝር ውስጥ ላሉ
አቅራቢዎች ብቻ ነው — በአሁኑ ጊዜ `"agentrouter"` ብቻ። ለሌሎች
ሁሉም **አብሮገነብ ካታሎግ** አቅራቢዎች፣ `checkFallbackError`
ለ`getProviderErrorRuleMatch` የሚያስተላልፈው የተዋቀረውን ስህተት
ብቻ ነው (`{code, type}`)፤ ይህም በራስጌ/ሁኔታ/ኮድ ላይ ለተመሠረቱ
ደንቦች በቂ ቢሆንም የbody-ጽሑፍ ምልክቶችን አያይም።
`resolveRuleMatchBody()` ረዳት ይህን ምርጫ ያከናውናል፦ በፍቃድ
ዝርዝሩ ውስጥ ላሉ አቅራቢዎች ሙሉ የስህተት ጽሑፍ፣ ለሌሎቹ ደግሞ
የተዋቀረው ስህተት። **አብሮገነብ** አቅራቢን ወደ
`FULL_TEXT_RULE_PROVIDERS` ማከል ግልጽ የበእያንዳንዱ-አቅራቢ
የመግባት ምርጫ ነው — ይህ የተፈጠረው በዝርዝሩ ላይ ለሌለ
እያንዳንዱ አቅራቢ ነባሪው መንገድ ባይት-በ-ባይት ሳይለወጥ
እንዲቆይ ነው።

የአንድ ደንብ `scope` (`model` / `provider` / `connection`) ከ
`FULL_TEXT_RULE_PROVIDERS` የተለየ የመግባት ምርጫ ነው፦
`checkFallbackError` እንደ `fallbackResult.ruleScope` ብቻ ያቀርበዋል፣
እና በታችኛው ፍሰት ያሉ ተጠቃሚዎች እንደ መረጃ መለያ ከመቁጠር
ውጪ የሚያከብሩት፣ በዚያው ፋይል ውስጥ ባለው
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` የፍቃድ ዝርዝር ውስጥ ላሉ
አቅራቢዎች ብቻ ነው (በ`honorsRuleLockScope()` በኩል የተገደበ —
ዛሬ `"agentrouter"` ብቻ)። አንድ አቅራቢ በዚያ የፍቃድ ዝርዝር
ውስጥ ከገባ በኋላ የ`scope: "connection"` ማዛመድ በትክክል ምን
እንደሚያደርግ ከላይ «ዳግም የተገለጹ የኮታ ስህተቶች»ን ይመልከቱ።

**#11104 — በኦፕሬተር የተገለጹ ደንቦች ሁለቱንም የፍቃድ ዝርዝሮች
ያልፋሉ።** አንድ ኦፕሬተር ይህን ፋይል ሳያርትዕ በruntime
በ`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
በኩል ለእያንዳንዱ አቅራቢ ደንብ ሊገልጽ ይችላል። የኦፕሬተርን
ደንብ በ`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
ጀርባ መገደብ — የ**አብሮገነብ** ካታሎግ ደንቦችን ነባሪ ባህሪ
ለመጠበቅ የታሰቡ የፍቃድ ዝርዝሮች — ደንቡን መግለጹ ራሱ
የኦፕሬተሩ ግልጽ የመግባት ምርጫ በመሆኑ፣ በዝርዝሩ ውስጥ
አስቀድመው ካሉት በስተቀር ለሁሉም አቅራቢዎች የቅንብሮችን
ዘዴ ከንቱ ያደርገዋል። `resolveRuleMatchBody()` እና
`honorsRuleLockScope()` ሁለቱም መጀመሪያ `hasOperatorRuleForProvider()`
ይፈትሻሉ፦ የኦፕሬተር ደንብ ያለው አቅራቢ፣ በሁለቱ የፍቃድ
ዝርዝሮች ውስጥ ቢኖርም ባይኖርም፣ ጥሬውን የስህተት ጽሑፍ
ያገኛል እና የገለጸው `scope` ይከበርለታል።

**የሚታወቅ ክፍተት — `providerRuleRegistry` ለHTTP 400 ፈጽሞ
አይመከርም።** የ`checkFallbackError` `BAD_REQUEST` ቅርንጫፍ
ሁኔታ 400ን ሙሉ በሙሉ በራሱ የስርዓተ-ጥለት ድርድሮች
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, ወዘተ
በ`accountFallback.ts` ውስጥ) ይመድባል፣ እና ከላዩ ያለው
`configuredRule`/`getProviderErrorRuleMatch` ቅርንጫፍ ከመድረሱ በፊት
ይመለሳል። `status: 400` ያለው አብሮገነብ የካታሎግ ደንብ
(ወይም የኦፕሬተር ደንብ) በአገባብ ትክክለኛ ቢሆንም ፈጽሞ
አይነሳም። ዛሬ ምንም ነባር ደንብ 400ን አያነጣጥርም፣ ስለዚህ
በምርት ላይ ምንም ነገር አይጎዳም — ነገር ግን የወደፊት 400
ደንብ መጀመሪያ ይህ ቅርንጫፍ እንዲሻሻል ያስፈልገዋል፤ ይህም
ደንብ ብቻ ከማከል የበለጠ ትልቅ ለውጥ ነው (አስቀድመው
በስርዓተ-ጥለት ድርድር ባህሪ ላይ ለሚመሰረቱ ሁሉም አቅራቢዎች
400ን እንደገና ይመድባል)፣ እና የአንድ-አቅራቢ ደንብ ማከል
ወሰን ውጭ ነው።

### አዲስ quota-ን በተሳሳተ መንገድ የሚገልጽ gateway ማከል

1. አንድ የህግ ድርድር በ `statusRestatementRegistry` ውስጥ ይመዝግቡ
   (`open-sse/config/upstreamStatusRestatement.ts`)። `textMarkers`
   ለአቅራቢው ልዩ እንዲሆኑ ያድርጉ፤ ከ
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`)
   ጋር የሚጋጩ አጠቃላይ የእንግሊዝኛ ሐረጎችን በፍጹም እንደገና አይጠቀሙ።
2. በአማራጭነት ትክክለኛውን የመቆለፊያ መዳሰሻ ለመምረጥ
   (`connection` ለመለያ-አቀፍ quota፣ `model` ለእያንዳንዱ-ሞዴል ስህተቶች)
   የመደበኛ ህጎችን በ
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)
   ውስጥ ይመዝግቡ። ይህ ደረጃ በምርት (production) ውስጥ ህጎቻቸው ሙሉውን የስህተት ጽሑፍ
   (የሰውነት ምልክቶች) ለሚፈልጉ አቅራቢዎች ብቻ ነው ውጤት የሚያስገኘው፦ የአቅራቢውን id
   በተመሳሳይ ፋይል ውስጥ ወደ `FULL_TEXT_RULE_PROVIDERS` ያክሉ — አለበለዚያ
   `checkFallbackError` ለህጉ ሁልጊዜ የተዋቀረውን
   `{code, type}` ስህተት ብቻ ይሰጣል እና የሰውነት-ጽሑፍ ህግ በቀጥታ ትራፊክ
   ላይ በፍጹም አይዛመድም። በብቸኛነት በ `status`/`headers` ላይ የሚዛመዱ ህጎች
   (እንደ Opencode ወይም Minimax) ይህንን opt-in አያስፈልጋቸውም። በተለይም፣ ህጉ
   `scope: "connection"` ከገለጸ እና ዓላማው እውነተኛ ግንኙነት-አቀፍ መቀዝቀዝ
   በተጨማሪ በተመሳሳይ-ጥያቄ combo መዝለል (የሚያሳይ መለያ ብቻ ሳይሆን) ከሆነ፣
   የአቅራቢውን id በተመሳሳይ ፋይል ውስጥ ወደ
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ያክሉ — ይህ ነው
   `isAgentrouterConnectionQuotaScope()`-አይነት ፍጆታን በ
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) እና
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ውስጥ የሚቆጣጠረው፤
   ያለ እሱ `scope` አሁንም በ `fallbackResult.ruleScope` በኩል ይፈስሳል
   ነገር ግን ምንም ነገር በእሱ ላይ አይተገብርም።
3. `tests/unit/upstream-status-restatement.test.ts` እና
   `tests/unit/agentrouter-error-rules.test.ts` የሚመስሉ የክፍል ሙከራዎችን
   ያክሉ (የ not-permanent / not-creditsExhausted ጠባቂዎችን ጨምሮ፣ እና —
   አቅራቢው allowlist ከፈለገ — `resolveRuleMatchBody()` ሙሉውን ጽሑፍ
   ለዚያ አቅራቢ ብቻ እንደሚመልስ የሚያረጋግጥ ሙከራ)።

በ `chatCore.ts`፣ `classifyError` ወይም combo ላይ ምንም ለውጦች አያስፈልጉም።

#### በ egress-ባልዲ የተከፋፈለ መቆለፊያ (#10880)

በ `EGRESS_BUCKETED_LOCK_PROVIDERS` ውስጥ ያሉ አቅራቢዎች (opencode ቤተሰብ)
እንደ IP-ባልዲ upstream ይቆጠራሉ (የ opencode ነፃ ደረጃ IP-ባልዲ ነው፣
account-ባልዲ አይደለም — #9611 ይመልከቱ)፦ በ status-429 የተመደበ
`quota_exhausted` **ወይም** `rate_limit_exceeded` የመጨረሻ የታወቀው egress IP
ከወደቀው ግንኙነት ጋር ከሚዛመድ እያንዳንዱን የ allowlisted-ቤተሰብ ግንኙነት
ያቀዝቅዋል — rotation እነዚህን ከመሞከሩ በፊት — N-1 እርግጠኛ-የማይሳኩ
upstream ጥሪዎችን ለማስወገድ (ከ #10460/#10525 ጋር ተመሳሳይ ቅርጽ)።
`rate_limit_exceeded` በዓላማ ተካትቷል፦ በ `markAccountUnavailable`
መንገድ ላይ ለ-opencode-ልዩ ህጎች በፍጹም አይዛመዱም (ምንም headers/body
ለ `checkFallbackError` አይሰጥም፣ opencode በ
`FULL_TEXT_RULE_PROVIDERS` ውስጥ አይደለም)፣ ስለዚህ ሰውነቱ የደንበኝነት-ምዝገባ-quota
ጽሑፍን ("monthly usage limit reached") የሚሸከም 429
`status_429` ህግ ከመድረሱ በፊት በ quota-ጽሑፍ fallback
(`buildSubscriptionQuotaFallback`፣ `accountFallback.ts`፤ የ 1h መቀዝቀዝ)
`quota_exhausted` ተብሎ ይመደባል — በዚያን ጊዜ quota-ጽሑፍ-አልባ 429
(ቀላል የመጠን ገደብ) በ `status_429` ህግ በኩል `rate_limit_exceeded` ተብሎ
ይመደባል እና አሁንም የ IP ቤተሰቡን ያቀዝቅዋል። ለ allowlisted አቅራቢ፣
IP-ባልዲ የመጠን ገደብ ከአልቋል ካለ quota ጋር ተመሳሳይ ምልክት ነው። ታማኝ
ገደቦች፦

- **በተቻለ መጠን**: መቆለፊያው የግንኙነቱን የመጨረሻ የታወቀ `egress_ip`
  ከ`proxy_logs` ያገኛል (የ24h መስኮት፣ የተመሳሰለ፣ ያለ መሸጎጫ)። ቀዝቃዛ መሸጎጫ (የመውጫ
  IP ፈጽሞ ያልተፈተሸ) ወይም ረድፍ አለመኖር → የወደቀው ግንኙነት አሁንም በ
  ቅርንጫፉ ይቀዘቅዛል (እንደ አሁኑ ይመዘገባል)፣ የማይቆለፈው ወንድም ግንኙነት ብቻ ነው።
- **ፈጽሞ ቋሚ አይደለም**: ማቀዝቀዣው የሚታደስ የኮታ መስኮት ነው
  (`testStatus: "unavailable"`)፤ ቋሚ ሁኔታ ከIP-ደረጃ ምልክት ፈጽሞ አይወሰንም።
  `disableCooling` ያላቸው ግንኙነቶች ቅርንጫፉን ሙሉ በሙሉ ይዘላሉ።
- **ለተፈቀደለት ቤተሰብ የመቆለፊያ ጥራጥሬነት ይለወጣል**: ይህ የወሰን
  ለውጥ ነው፣ የወንድም ግንኙነት ማመቻቸት ብቻ አይደለም። opencode የ`passthroughModels`
  አቅራቢ ነው፣ ስለዚህ ከዚህ ቅርንጫፍ በፊት 429 በእያንዳንዱ MODEL የሚተገበር መቆለፍ ያስከትል ነበር፤ አሁን
  ግን የግንኙነት ማቀዝቀዣን ያስከትላል — ምንም ወንድም ግንኙነት ሳይኖረው አንድ
  ግንኙነት ብቻ ለሚያስኬድ ኦፕሬተርም ጭምር። ይህ የopencode ደንብ
  ሰንጠረዥ ቀድሞውኑ ትክክል ነው ብሎ የሚገልጸው ጥራጥሬነት ነው (`scope: "connection"`,
  `providerErrorRules.ts`)፤ opencode በ
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ውስጥ ስለሌለ እስካሁን ፈጽሞ አልተከበረም። ቅርንጫፉ የወደቀውን
  ግንኙነት ማቀዝቀዣ + `backoffLevel` ራሱ ይጽፋል፣ የ
  ግንኙነት-ወሰን ያለውን agentrouter ቅርንጫፍ በመኮረጅ፣ ከዚያም ይመለሳል — በእያንዳንዱ ሞዴል የሚተገበረው እገዳና
  ከታች ያለው አጠቃላይ መንገድ ፈጽሞ አይደረስባቸውም።
- **Combo ተካትቷል**: እንደ agentrouter ቅርንጫፍ፣ ወሰኑ አንድ combo ጠሪ
  በ429 ላይ የሚተገብረውን `persistUnavailableState`/`isCombo` ደረጃ ቅነሳ ሆን ብሎ
  ችላ ይላል። በእያንዳንዱ ሞዴል የሚተገበር መቆለፍ የዚህ ወሰን ደካማ ቅርጽ አይደለም፤
  የተሳሳተ አሃድ ነው፦ ስለተሟጠጠው IP ምንም ነገር አይገልጽም፣ ስለዚህ የcombo
  ሽክርክሪቱ በእያንዳንዱ ወንድም ግንኙነት አንድ በእርግጠኝነት የሚወድቅ ጥሪ ማባከኑን ይቀጥላል።
- **የወንድም ግንኙነት ደህንነት**: ቀድሞውኑ ቋሚ ሁኔታ ላይ ያለ (banned/credits_exhausted)
  ወይም ቀድሞውኑ ረዘም ያለ ማቀዝቀዣ ውስጥ ያለ ወንድም ግንኙነት ፈጽሞ አይተካም።
- **ብቸኛ የፍቃድ ዝርዝር**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ን ማስፋት ግልጽ
  የባለቤት ውሳኔ ነው፤ አጠቃላይ ሽቦ አልባ ትስስር የለም (pattern #10334/#10419)። የ
  ወንድም ግንኙነት መጠይቁ ያንኑ የፍቃድ ዝርዝር እንደ SQL
  ሊተራል ከመድገም ይልቅ ያስራል፣ ስለዚህ ማስፋቱ የአንድ መስመር ለውጥ ሆኖ ይቆያል።
- **የመውጫ IP ሽክርክሪት፣ በሁለቱም አቅጣጫዎች**: የፍለጋ መስኮቱ (24h) ከ
  የመውጫ-IP መሸጎጫ TTL (5 min) በጣም ሰፊ ነው፣ ስለዚህ "የመጨረሻ የታወቀ IP" ታሪክ እንጂ
  የአሁን ሁኔታ አይደለም። የአንድ ግንኙነት ፕሮክሲ በመስኮቱ ውስጥ ከተቀየረ
  መቆለፊያው በእውነት የጋራ የሆነን IP **ሊያመልጠው** ይችላል (የተመዘገበው IP አዲሱ፣
  ያልተሟጠጠው ነው) — በተመሳሳይም ከተሟጠጠው IP ከዚያ በኋላ
  ርቆ የተቀየረን ወንድም ግንኙነት **ሊያቀዘቅዝ** ይችላል። ሁለተኛው ሁኔታ ያንን ወንድም ግንኙነት አንድ
  የማቀዝቀዣ መስኮት ያስከፍለዋል፤ ሁለቱም በታሪክ ላይ የተመሠረተ ፍለጋ እንደሚኖሩት በተቻለ መጠን
  የሚሠሩ ገደቦች ሆነው ተቀባይነት አግኝተዋል።
- **ወጪ**: ሁለት ወሰን ያላቸው የ`proxy_logs` ቅኝቶች (በ
  `idx_pl_timestamp` በኩል በመስኮት የተጣሩ)፣ በ429 ድግግሞሽ ብቻ። አዲስ ኢንዴክስ የለም (migration 134
  YAGNI)። መጠነኛ መጠን ባለው የእውነተኛ ትራፊክ DB ቅጂ ላይ ተለክቷል፤
  ከፍተኛ ፍሰት ያለው ኢንስታንስ በዚያው መስኮት ውስጥ በተመጣጣኝ ሁኔታ ተጨማሪ ረድፎችን ይይዛል።

---

## ሌሎች የችናነት (Resilience) ባህሪያት

- **20 የማዞሪያ (routing) ስትራቴጂዎች** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ይመልከቱ።
- **Reset-aware ማዞሪያ** (v3.8.0) — ግንኙነቶችን በኮታ ዳግም ማስጀመሪያ (reset) ጊዜ መሠረት ቅድሚያ ይሰጣል።
- **የበስተጀርባ ሁነታ (background mode) መቀነስ** — የ Responses API `background: true` ከማስጠንቀቂያ ጋር ወደ sync ቀንሷል።
- **ተለዋዋጭ የመሣሪያ ገደብ መለየት** — የመሣሪያ ብዛት ገደቦች ሲደርሱ አቅራቢዎችን ይነሳል (backs off)።
- **የአደጋ ጊዜ ምትኬ (fallback)** — በ`OMNIROUTE_EMERGENCY_FALLBACK` ይቆጣጠራል፤ ኦፔሬተሮች ያለማደስ (restart) ከ Feature Flags ገጽ መተካት ይችላሉ።

---

## ማረም (Debugging)

- Weighted combo `503 all_targets_cooling_down` መልስ ይሰጣል (`Retry-After` ተቀምጧል፣ `diagnostics.excluded` እያንዳንዱን ዒላማ ከ`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ጋር ይዘረዝራል) → ገንዳው (pool) ተዋቅሮ እና ተገናኝቷል፣ እያንዳንዱ ዒላማ በችናነት ቆጣሪ (resilience timer) ብቻ ነው የተከለከለው፤ የ`[COMBO] Weighted selection: every target excluded before dispatch — …` ማስጠንቀቂያው ምክንያቶችን እና የሚቀሩትን ሰከንዶች ይጠቅሳል። ከተመሳሳይ combo የሚመነጭ `404 no_executable_targets` ማለት ምንም የችናነት ቆጣሪ አልተሳተፈም ማለት ነው (ሊሠራ የሚችል ነገር የለም፣ ወይም እያንዳንዱ መለያ የተገኝነት ምርመራን (availability probe) አሳልፏል)። በ`targetResolution.ts` ውስጥ ከተሰበሰቡት ማግለሎች (exclusions) በ`open-sse/services/combo/pinRecovery.ts` ውስጥ የተገነባ ነው።
- ለአንድ አቅራቢ ያሉት ሁሉም ቁልፎች ዘለው → የcircuit breaker ሁኔታን እና የእያንዳንዱን ግንኙነት `rateLimitedUntil`/`testStatus` ሁለቱንም ያረጋግጡ።
- አቅራቢው ከreset መስኮት በኋላ እስከመጨረሻው ተከልክሏል → ኮዱ ጥሬ `state` እያነበበ ነው፣ ከ`getStatus()`/`canExecute()` ይልቅ።
- አንድ ቁልፍ ይወድቃል፣ ሌሎች መሥራት አለባቸው → ከcircuit breaker ይልቅ የግንኙነት ማቀዝቀዣ (connection cooldown) ይምረጡ።
- አንድ ሞዴል ብቻ ነው የሚወድቀው → ከግንኙነት ማቀዝቀዣ ይልቅ የሞዴል መቆለፊያ (model lockout) ይምረጡ።
- ሁኔታው ራሱ መለስ ማለት አለበት ግን አይለስም → የወደፊት ቀን (timestamp) + ጊዜያቸው ያለፈባቸውን ሁኔታ የሚያድስ የንባብ መንገድ ይፈትሹ። ቋሚ ሁኔታዎች በእጅ ማስተካከያ ይፈልጋሉ።

---

## የሰርቲዋይም (runtime) ሁኔታ — ለወኪል (agent) ፈጣን ማጣቀሻ

> ከ`AGENTS.md` → "Resilience Runtime State" በቃል በቃል ተይዟል (PR #12743) ወኪሉ
> መመሪያ ከ40k የአውድ በጀት (context budget) በታች እንዲቆይ። የላይኞቹ
> ክፍሎች የተቀነባበረ፣ ለወኪል የሚቀርብ እይታ ነው፤ ቁጥር ያላቸው ክፍሎች ሙሉው ማጣቀሻ ይቀጥላሉ።

OmniRoute ሦስት የተያያዙ ግን የተለያዩ ጊዜያዊ-ውድቀት ዘዴዎች አሉት። የማዞሪያ ባህሪ ሲያርሙ
የእያንዳንዱን መድረክ (scope) በተነጻጸረ ይያዙ። የ
[3-ንብርብር የችናነት ንድፍ](../diagrams/exported/resilience-3layers.svg)
ይመልከቱ (ምንጭ፡ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
በአንድ እይታ ለማየት።

### የአቅራቢ Circuit Breaker

**መድረክ**: ሙሉ አቅራቢ፣ ለምሳሌ `glm`, `openai`, `anthropic`.

**ዓላማ**: በupstream/አገልግሎት ደረጃ ተከታታይ ውድቀቶች ለሚያሳይ አቅራቢ ትራፊክ መላክን
ማቆም፣ አንድ ያልጤና አቅራቢ እያንዳንዱን ጥያቄ እንዳይዘገይው።

**ትግበራ**:

- ዋና ክፍል (class)፡ `src/shared/utils/circuitBreaker.ts`
- የቻት በር/አፈጻጸም ገመድ (wiring)፡ `src/sse/handlers/chatHelpers.ts`፣ `src/sse/handlers/chat.ts`
- የሰርቲዋይም ሁኔታ API፡ `src/app/api/monitoring/health/route.ts`
- የተጋሩ መጠለያዎች (wrappers)፡ `open-sse/services/accountFallback.ts`
- የተቀመጠ ሁኔታ ሠንጠረዥ፡ `domain_circuit_breakers`

**ሁኔታዎች** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: መደበኛ ትራፊክ ይፈቀዳል።
- `DEGRADED`: ቀደም-ተብሎ ማስጠንቀቂያ ክልል — ውድቀቶች የመቀነሱን ገደብ (degradation threshold)
  አቋርጠዋል ግን እስካሁን የbreaker ገደብ አላቋረጡም፤ ትራፊኩ አሁንም ይፈሳል፣ ዳሽቦርዶች ማስጠንቀቂያውን ያሳያሉ።
  ተቀባይነት ያለው የግንኙነት ምርመራ ወይም አዲስ ውድቀት የሌለበት ጸጥ ያለ መስኮት ወደ `CLOSED` ይመልሰዋል
  (`docs/architecture/RESILIENCE_GUIDE.md` መስኮቱን ያለው)።
- `OPEN`: አቅራቢው ለጊዜው ታግዷል፤ ጠሪዎች የprovider-circuit-open ምላሽ ያገኛሉ
  ወይም combo ማዞሪያ ወደ ሌላ ዒላማ ይዘዋወራል።
- `HALF_OPEN`: የreset ጊዜ ማብቃት (timeout) አልፏል፤ የምርመራ ጥያቄ ይፈቀዳል። ስኬት
  breaker-አን ይዘጋል፣ ውድቀት እንደገና ይከፍታል።

**ነባሪዎች** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`፣ በ
`src/lib/resilience/settings.ts` ውስጥ `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` በኩል ተጠቅሞ →
በ`src/sse/handlers/chatHelpers.ts` ውስጥ `getCircuitBreaker(provider, …)`። የሙሉ-አቅራቢው
breaker በ`circuitBreakerThreshold` / `circuitBreakerReset` ላይ ይሠራል፦

| መገለጫ    | የሚቀንስበት | የሚከፍትበት (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ------: | ----------------------------------: | ----------------------------: |
| OAuth   |     `5` |                                 `8` |                         `60s` |
| API ቁልፍ |     `7` |                                `12` |                         `30s` |
| አካባቢያዊ  |  (የተሰራ) |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` እንዲሁም `providerFailureThreshold` (10/15/2)፣
`providerFailureWindowMs` (15/30/5 ደቂቃ) እና `providerCooldownMs` (5/10/1 ደቂቃ) ይገልጻል፦ እነዚህ
**የሚመረጠውን (opt-in) አጠቃላይ Provider Cooldown የመስኮት በርን** ኃይል ይሰጣሉ
(`PROVIDER_COOLDOWN_ENABLED`፣ ነባሪ ጠፍቷል) — በ`open-sse/services/providerCooldownTracker.ts` ውስጥ ያለ የአቅራቢ-ደረጃ ግቤት
ከ`providerFailureThreshold` ውድቀቶች በ`providerFailureWindowMs` ውስጥ በኋላ ብቻ እያቃዘ ይቆጠራል፣
ከዚያም ለ`providerCooldownMs` ያቃዛል። እነዚህ የሕይወቱ (live) breaker ገደቦች አይደሉም — breaker ባህሪ
ተስመምታችሁ ማስተካከል አትሞክሩ። እያንዳንዱ ነባሪ በ
`OMNIROUTE_PROVIDER_BREAKER_*` እና `OMNIROUTE_CIRCUIT_BREAKER_*` የአካባቢ ተለዋዋጮች (env vars) መተካት ይቻላል፤
ትክክለኛው የሰርቲዋይም ማጣቀሻ ሠንጠረዥ በ`docs/architecture/RESILIENCE_GUIDE.md` ውስጥ ነው።

የአቅራቢ breaker የሚያነሳሱት የአቅራቢ-ደረጃ የውድቀት ሁኔታዎች ብቻ መሆን አለባቸው፦

```ts
(408, 500, 502, 503, 504);
```

ሙሉውን የአቅራቢ breaker ለመደበኛ የመለያ/ቁልፍ/ሞዴል ስህተቶች እንደ አብዛኞቹ
`401`, `403`, ወይም `429` አግባቦች አታንሱት። እነዚያ ብዙውን ጊዜ የግንኙነት ማቀዝቀዣ (connection cooldown)
ወይም የሞዴል መቆለፊያ (model lockout) ናቸው። አጠቃላይ የAPI-ቁልፍ አቅራቢ `403` እስካልተመደበ እንደ ማብቃታዊ
የአቅራቢ/መለያ ስህተት (terminal provider/account error) ድረስ ሊድን ይገባል።

ሰሪው ሰነፍ ማገገምን ይጠቀማል እንጂ የጀርባ ቆጣሪን አይጠቀምም። `OPEN` ሲያበቃ፣ እንደ `getStatus()`፣ `canExecute()` እና `getRetryAfterMs()` ያሉ ንባቦች ሁኔታውን ወደ `HALF_OPEN` ያድሳሉ፣ ስለዚህ ዳሽቦርዶች እና የኮምቦ እጩ ሰሪዎች ጊዜው ያለፈ አቅራቢን ለዘላለም ማግለላቸውን አይቀጥሉም።

### የግንኙነት ማቀዝቀዣ

**ልክ**፡ አንድ የአቅራቢ ግንኙነት/መለያ/ቁልፍ።

**ዓላማ**፡ ለተመሳሳይ አቅራቢ ሌሎች ግንኙነቶች ጥያቄዎችን ማገልገላቸውን እንዲቀጥሉ በማድረግ አንድ መጥፎ ቁልፍ/መለያ ለጊዜው ማለፍ።

**ትግበራ**፡

- የጽሑፍ/ዝማኔ መንገድ፡ `src/sse/services/auth.ts::markAccountUnavailable()`
- የመለያ ምርጫ/ማጣራት፡ `src/sse/services/auth.ts::getProviderCredentials...`
- የማቀዝቀዣ ስሌት፡ `open-sse/services/accountFallback.ts::checkFallbackError()`
- ቅንብሮች፡ `src/lib/resilience/settings.ts`

በአቅራቢ ግንኙነቶች ላይ አስፈላጊ መስኮች፡

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

በመለያ ምርጫ ወቅት፣ ግንኙነት ሲሆን ይለፋል፡

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

ማቀዝቀዣዎችም ሰነፍ ናቸው፡ `rateLimitedUntil` ቀደም ሲል ሲያልፍ፣ ግንኙነቱ እንደገና ተቀባይነት ያገኛል። በተሳካ አጠቃቀም ላይ፣ `clearAccountError()` `testStatus`ን፣ `rateLimitedUntil`ን፣ የስህተት መስኮችን እና `backoffLevel`ን ያጸዳል።

ነባሪ የግንኙነት ማቀዝቀዣ ባህሪ፡

- የOAuth መሠረታዊ ማቀዝቀዣ፡ `5s`።
- የAPI-ቁልፍ መሠረታዊ ማቀዝቀዣ፡ `3s`።
- የAPI-ቁልፍ `429` ሲኖር የupstream ዳግም ሙከራ ምክሮችን (`Retry-After`፣ የreset ራስጌዎች፣ ወይም ሊተነተን የሚችል የreset ጽሑፍ) ማስቀደም አለበት።
- የተደጋገሙ ሊረባረቡ የሚችሉ ውድቀቶች ኤክስፖኔንሺያል ባክኦፍ ይጠቀማሉ፡

```ts
baseCooldownMs * 2 ** failureIndex;
```

የፀረ-ነጎድጓድ-መንጋ መከላከያ በአንድ ግንኙነት ላይ የሚሆኑ ተዛማጅ ውድቀቶች ማቀዝቀዣውን ደጋግመው እንዳያራዝሙ ወይም `backoffLevel`ን በድጋሚ እንዳይጨምሩ ይከለክላል።

ማብቂያ ሁኔታዎች ማቀዝቀዣዎች አይደሉም። `banned`፣ `expired` (በ`EXPIRED_RETRY_MAX` በኩል ከN ታህቲል ዳግም ሙከራዎች በኋላ ብቻ ማብቂያ የሚሆን) እና `credits_exhausted` ማረጋገጫዎች/ቅንብሮች እስኪለወጡ ወይም ኦፔሬተር እስኪያስተካክላቸው ድረስ ያለ ተቀባይነት ለመቆየት ታስበው ናቸው። ማብቂያ ሁኔታዎችን በጊዜያዊ የማቀዝቀዣ ሁኔታ አይተኩ።

### የሞዴል መቆለፊያ

**ልክ**፡ አቅራቢ + ግንኙነት + ሞዴል።

**ዓላማ**፡ አንድ ሞዴል ብቻ ለእሱ ግንኙነት ሲጎድል ወይም በኮታ ሲገደብ አጠቃላይ ግንኙነትን ከማሰናከል መቆጠብ።

ምሳሌዎች፡

- `429` የሚመልሱ በሞዴል-ኮታ አቅራቢዎች።
- ለአንድ የጎደለ ሞዴል `404` የሚመልሱ አካባቢያዊ አቅራቢዎች።
- እንደ ተመረጡ Grok ሁነታዎች ያሉ አቅራቢ-ተኮር ሁነታ/ሞዴል ፍቃድ ውድቀቶች።

የሞዴል መቆለፊያ በ`open-sse/services/accountFallback.ts` ውስጥ ይኖራል እና ተመሳሳይ ግንኙነት ሌሎች ሞዴሎችን ማገልገሉን እንዲቀጥል ያደርጋል።

### የማረም መመሪያ

- ሁሉም የአቅራቢ ቁልፎች ከተለፉ፣ የአቅራቢ ሰሪ ሁኔታን እና የእያንዳንዱን ግንኙነት `rateLimitedUntil`/`testStatus` ይመርምሩ።
- አቅራቢ ከዳግም ማስጀመሪያ መስኮት በኋላ በቋሚነት ተገልሏል የሚመስል ከሆነ፣ ኮድ `getStatus()`/`canExecute()` ከመጠቀም ይልቅ ያለ ማቀነባበርያ `state` እያነበበ መሆኑን ይመልከቱ።
- አንድ የአቅራቢ ቁልፍ ከወደቀ ግን ሌሎች መሥራት ካለባቸው፣ የአቅራቢ ሰሪን ይልቅ የግንኙነት ማቀዝቀዣን ይምረጡ።
- አንድ ሞዴል ብቻ ከወደቀ፣ የግንኙነት ማቀዝቀዣን ይልቅ የሞዴል መቆለፊያን ይምረጡ።
- ሁኔታ እራሱን መጠገን ካለበት፣ የወደፊት የጊዜ ማመሳከሪያ/ዳግም ማስጀመሪያ ጊዜ ማብቂያ እና ጊዜው ያለፈ ሁኔታን የሚያድስ የንባብ መንገድ ሊኖረው ይገባል። ቋሚ ሁኔታዎች የእጅ ማረጋገጫ ወይም የውቅር ለውጦችን ይፈልጋሉ።

---

## TLS ፊንገርፕሪንቲንግ እና ስቴልዝ

ለአቅራቢ ልዩ የሆነ ስቴልዝ (JA3/JA4, CCH, obfuscation) በተነጠለ ሰነድ ተዘግቧል — `docs/security/STEALTH_GUIDE.md` ይመልከቱ (git; ወደ `/docs` አልተጣመረም)።

---

## የመቋቋም ምርመራ (ደረጃ 8 · ብሎክ C)

ከመቋቋም ሎጂክ የዩኒት ምርመራዎች በላይ፣ ሦስት ምርመራዎች ራንታይሙን በእውነተኛ
ግፊት/ውድቀት ሁኔታዎች ስር ይፈትሻሉ (ሁሉም integration/nightly ናቸው — ምንም PR አይከለክሉም)፦

| Test        | What                                                                                                                                                          | Run                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | ውሸታማ-አፕስትሪም ኖድ እውነተኛ latency/reset/timeout/503 ያስገባል; circuit breaker መክፈቱንና መመለሱን ያረጋግጣል እንዲሁም `checkFallbackError` 503ን እንደሚመለስ fallback መለይቶ መቆጠሩን ያረጋግጣል። | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | በ`--expose-gc` ስር በእያንዳንዱ `createSSEStream` ~500 ስትሪሞች; heap ከገበያው ጣሪያ በላይ ካደገ ምርመራው ይውድቃል (OOM ጠባቂ #3069)።                                                   | `npm run test:heap`                      |
| k6 soak     | በ`/api/monitoring/health` ላይ ቀጣይ ጭነት; የp95/ስህተት ገደቦች።                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

በ`.github/workflows/nightly-resilience.yml` ይቀናጀዋል (cron + dispatch)።
በነባሪው `test:integration` ውስጥ chaos እና heap ራሳቸውን ያልፋሉ (ያለ `RUN_CHAOS_INT`/`--expose-gc`)።

---

## ይህንም ይመልከቱ

- [የአርክቴክቸር መመሪያ](./ARCHITECTURE.md) — የስርዓት አርክቴክቸር እና ውስጣዊ ክፍሎች
- [የተጠቃሚ መመሪያ](../guides/USER_GUIDE.md) — አቅራቢዎች፣ ኮምቦዎች፣ CLI ውህደት
- [አውቶ-ኮምቦ ሞተር](../routing/AUTO-COMBO.md) — የ16-ምክንያት ነጥብ አሰጣጥ፣ የሞድ ጥቅሎች
