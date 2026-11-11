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

### የባንክ ዳግም ማስጀመሪያዎችን በራስ ሰር ያመልክቱ

**ወሰን፡** Codex እና Claude የደንበኝነት ምዝገባ (OAuth) ግንኙነቶች.**መርጠው ይግቡ** የ `bankedResetAutoApply` ቅንብር ጠፍቷል እና በነባሪ በ `dry-run` ሁነታ (ቅንጅቶች → AI → በራስ ሰር የባንክ ዳግም ማስጀመሪያዎችን ይተግብሩ)።

**ዓላማ፡-** አንድ ኦፕሬተር በአቅራቢ ገደቦች ገጽ ላይ "ቤዛ"ን እንዲጫኑ ከመጠበቅ ይልቅ አንድ አካውንት የአጠቃቀም ግድግዳ ሲመታ በራሳቸው የባንክ ዳግም ማስጀመሪያዎችን ያሳልፉ።

| የብድር ዓይነት (`creditTypes`) | ምን ተቤዠ                                  | የት እንደሚሮጥ                      |
| ------------------------- | --------------------------------------- | ------------------------------ |
| `codexCredits`            | Codex ክሬዲቶች ዳግም ያስጀምሩ                   | የጀርባ ሥራ, በየ 60 ዎቹ              |
| `claudeCredits`           | Claude የባንክ ዕርዳታ (`GRANT` ክሬዲት)         | የጀርባ ሥራ, በየ 60 ዎቹ              |
| `claudeSessionReset`      | Claude ሳምንታዊ ክፍለ ጊዜ ገደብ ዳግም ማስጀመር (ከላይ) | የጥያቄ ዱካ፣ በየመለያ መቀያየር ባለበት መመሪያ |

**ትግበራ፡**

- ንጹህ ውሳኔ (ለሁለቱም ዱካዎች አንድ ደንብ ተቀምጧል): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- የበስተጀርባ ስራ `src/lib/services/bankedResetAutoApply.ts` (በ `src/instrumentation-node.ts` የተጀመረ)
- Claude ጥያቄ-መንገድ በር `src/lib/usage/claudeSessionResetPolicy.ts`፣ በ `setClaudeLimitResetPolicy()` በኩል በ `open-sse/services/claudeLimitReset.ts` የተመዘገበ
- ታሪክ፣ ካፕ እና የድር መንጠቆ `src/lib/usage/bankedResetAudit.ts`
- ታሪክ API: `GET /api/settings/banked-reset-auto/history?limit=50` (አስተዳደር auth)

**የውሳኔ ቅደም ተከተል** (የመጀመሪያው ያልተሳካ ህግ የተመዘገበው ምክንያት ነው)

1. ባህሪ ጠፍቷል፣ የክሬዲት አይነት ጠፍቷል ወይም መለያ ወሰን የለውም (`accountScope` `all` / `selected` እና በእያንዳንዱ መለያ `connections` ካርታ)።
2. ከአማራጭ UTC መርሐግብር ውጪ (`startHourUtc` > `endHourUtc` እኩለ ሌሊት ያቋርጣል)።
3. ካለፉት 24 ሰአታት በላይ ከፍሏል `maxPerAccountPerDay` (1)፣ `maxPerDay` (3) እና `minSpacingMinutes` (30) በማንኛውም ሁለት ቤዛዎች መካከል።
4. ቀስቅሴ፡- ግድግዳ ላይ ያለ `session` ወይም `weekly` መስኮት (ከ `getQuotaWindowStatus().reachedThreshold` አንብብ እንጂ `isAccountQuotaExhausted()` አይደለም፣ እያንዳንዱ የወጣ መስኮት መለያ ብቻ ሪፖርት ያደርጋል) ወይም በ `expiringCreditHours` (24) ውስጥ የሚያልፍ ክሬዲት ቢያንስ `expiringCreditMinUsedPercent` (50) በተጠቀመ መለያ ላይ።
5. የተፈጥሮ ዳግም ማስጀመሪያ ዘብ፡ በ `sessionResetGuardMinutes` (90) ውስጥ የታጠረው የ5-ሰአት መስኮት ዳግም ሲጀምር ወይም `weeklyResetGuardHours` ውስጥ ባለ ሳምንታዊ መስኮት (12) ውስጥ ይዝለሉ።
6. ሳምንታዊ ፎቅ፡ ሳምንታዊ ቀሪው `weeklyFloorPercent` (10) በታች ከሆነ የ5-ሰዓት ዳግም ማስጀመር ይዝለሉ።
7. `last-resort` ሁነታ፡ ሌላኛው ውስጠ-ወሰን መለያ በሁለቱም መስኮቶች ላይ ቢያንስ `poolHeadroomPercent` (10) ሲቀረው ይዝለሉ። ጊዜው ያለፈበት-የክሬዲት ቀስቅሴዎች ይህንን ያልፋሉ።
8. `dry-run` አንድ ረድፍ ይመዘግባል እና ምንም ነገር አይዋጅም; `last-resort` እና `eager` ማስመለስ።

የጎደለ የኮታ ውሂብ መቤዠትን በጭራሽ አይከፍትም፡ ያልታወቀ ዳግም ማስጀመሪያ ጊዜ ወይም ሳምንታዊ አጠቃቀም መዝለሎች።

**Claude ክፍለ ጊዜ ዳግም ማስጀመር፡-** ባህሪው ጠፍቶ ወይም `claudeSessionReset` ጠፍቶ፣ በየመለያ `autoLimitReset` መቀያየር ልክ እንደበፊቱ ይወስናል። ከሁለቱም ጋር፣ ባህሪው በየመለያ መቀያየሪያዎችን ይተካዋል፡- ውስጠ-ወሰን መለያ ፖሊሲው ሲፈቅድ ብቻ ነው ሊጠይቅ የሚችለው፣ እና በ `dry-run` ሁነታ ምንም አይነት የይገባኛል ጥያቄ የለም።

**ደህንነት፡** ስራው በቲኬት ቢበዛ አንድ ክሬዲት ያስወጣል፣ ክሬዲቶችን ከመዘርዘሩ በፊት ይወስናል (የተዘለለ መለያ በጭራሽ አልተዘረዘረም)፣ የ idempotency ቁልፎችን ይጠቀማል `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`, እና ከተሳካ ዝርዝር ወይም ማስመለስ በኋላ ለ 1 ሰአታት የጠፋ ሂሳብ ይደግፋል። እያንዳንዱ መቤዠት, ውድቀት እና ደረቅ ውሳኔ ለ `audit_log` (`action: "bankedReset.redeem"`, ምንም ቶከኖች ወይም ክሬዲት መታወቂያዎች) ተጽፏል; ባርኔጣዎቹ ከእነዚያ ረድፎች ውስጥ ተቆጥረዋል, ስለዚህ እንደገና ከመጀመሩ ይተርፋሉ. የተሳካላቸው ቤዛዎች የ `provider.reset_redeemed` ዌብ መንጠቆንም ያቃጥላሉ።

የመመለሻ ጠባቂዎች `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

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

**ወሰን፦** የአቅራቢ + ግንኙነት + ሞዴል ሶስትዮሽ።

**በሁኔታ የሚወሰን የወሰን ክልል፦** የሚከሽፈው ሁኔታ መቆለፊያው የሚጽፍበትን ቁልፍ ይወስናል
(`resolveLockoutScope()` በ `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — የኮታ ወይም የመብት ምልክት — **የኮታ ቤተሰቡን** ይቆልፋል፦
  ለ codex ሙሉውን `codex` / `spark` ወሰን (የግንኙነቱን ሁሉንም
  `gpt-5*` ሞዴሎች)፣ ለሌሎች አቅራቢዎች `getQuotaScopedModelForProvider()`።
- `404` መሠረታዊውን ሞዴል ይቆልፋል (`getModelLockKey()` `not_found`ን ያጠባል)።
- ማንኛውም ሌላ ሁኔታ — `5xx` የመጓጓዣ/የአገልጋይ አለመሳካቶች እና የOmniRoute የጥራት ማረጋገጫ የሚያመነጨው `502` — **ትክክለኛውን**
  የአቅራቢ/ግንኙነት/ሞዴል ጥምረት ብቻ ይቆልፋል። በአንድ ሞዴል ላይ የተበላሸ ዥረት ስለ መለያው ኮታ ማስረጃ አይደለም፤ ይህ ደንብ ከመተግበሩ በፊት በ
  `codex/gpt-5.6-luna` ላይ የተከሰተ አንድ ባዶ ምላሽ የዚያን ግንኙነት ሁሉንም
  `gpt-5*` ሞዴሎች ከማዞሪያው ላይ ለ2–30 ደቂቃዎች (በመጨመር) ያስወግድ ነበር፣ ኮታው ግን ሳይነካ ይቀር ነበር።
- የጠሪው ግልጽ `scope` አማራጭ ሁልጊዜ ያሸንፋል (Antigravity `"exact"` ያልፋል)።

**ዓላማ፦** አንድ ሞዴል ብቻ የማይገኝ ወይም የኮታ ገደብ ያለበት ሲሆን ሙሉ ግንኙነትን ከማሰናከል መቆጠብ።

**ምሳሌዎች፦**

- `429` የሚመልሱ በሞዴል የሚለያዩ የኮታ አቅራቢዎች
- ለአንድ የጎደለ ሞዴል `404` የሚመልሱ አካባቢያዊ አቅራቢዎች
- ለአቅራቢ የተለዩ የሁነታ/ሞዴል ፈቃድ አለመሳካቶች (ለምሳሌ የGrok ሁነታዎች)

**ትግበራ፦** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`።

### የሞዴል የማቀዝቀዣ ዳሽቦርድ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ንቁ መቆለፊያዎችን ከእነዚህ ጋር ይዘረዝራል፦ አቅራቢ፣ ግንኙነት፣ ሞዴል፣ ምክንያት፣ expiresAt። ኦፕሬተሮች ከካርዱ ላይ ሞዴልን በእጅ እንደገና ማንቃት ይችላሉ።

**REST API፦**

- `GET /api/resilience/model-cooldowns` — ንቁ መቆለፊያዎችን ይዘርዝራል
- `DELETE /api/resilience/model-cooldowns` — በእጅ እንደገና ማንቃት። አካል፦ `{provider, connection, model}`። ማረጋገጫ፦ management።

### የማቀዝቀዣ አስተዳዳሪ

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)።

ለጊዜያዊ ምክንያት ከማዞሪያ ውጭ ላለ እያንዳንዱ ግንኙነት የተለየ የአቅራቢ ገጽ ከመክፈት ይልቅ አንድ ገጽ ያቀርባል። የግንኙነት ማቀዝቀዣዎችን፣ የሞዴል መቆለፊያዎችን እና የመጨረሻ ሁኔታዎችን ይዘረዝራል፤ እነዚህንም በግንኙነት፣ ለተመረጡ ግንኙነቶች ወይም የአንድ አቅራቢ ግንኙነቶች በሙሉ ያጸዳል፤ እንዲሁም በብዛት የሚስተካከሉ የማቀዝቀዣ ደንቦችን ያርትዓል፦ `streamStallCooldown.enabled` እና የOAuth / API-key `connectionCooldown` መነሻ ማቀዝቀዣ እና ከፍተኛው የመመለሻ ደረጃዎች (በ `PATCH /api/resilience` ይቀመጣሉ)። የመጨረሻ ሁኔታዎች (`banned`, `expired`, `credits_exhausted`) ይዘረዘራሉ ነገር ግን እዚህ በፍጹም አይጸዱም።

በዚያው ገጽ ላይ ያለው **የስህተት ማቀዝቀዣ ደንቦች** ካርድ የኦፕሬተር ስህተት ደንቦችን (`settings.providerErrorRules`) እና ለእያንዳንዱ አቅራቢ የሚሠሩ ነባሪ ደንቦችን (`settings.providerErrorDefaults`) በ `PATCH /api/settings` ያርትዓል — እንዴት እንደሚዛመዱ በ§7 ስር ያለውን “Operator-declared rules” ይመልከቱ። የጊዜ ርዝመቶቹ Default (ግልጽ የማቀዝቀዣ ጊዜ የለም)፣ 30 ደቂቃ፣ 1 ሰዓት፣ 5 ሰዓት፣ 24 ሰዓት ወይም ከ1 እስከ 43,200 ደቂቃዎች (30 ቀናት) የሚደርስ ብጁ ጊዜ ናቸው።

**REST API** (`src/lib/resilience/cooldownManager.ts`, ማረጋገጫ፦ management)፦

- `GET /api/resilience/cooldowns[?provider=]` — ሁኔታ፣ የሚቀረው የማቀዝቀዣ ጊዜ፣ የመመለሻ ደረጃ፣ የመጨረሻው የስህተት አይነት እና የሞዴል መቆለፊያዎች ያላቸውን ግንኙነቶች ይመልሳል (የማረጋገጫ መረጃ የለም)
- `POST /api/resilience/cooldowns` — አካል `{connectionIds: string[]}` ወይም `{all: true, provider?}`፤ `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ይመልሳል

### የመቆለፊያ ቅንብሮች UI + በስኬት የሚቀንስ መልሶ ማገገም (v3.8.23)

የሞዴል መቆለፊያ ሁልጊዜ ከሚነቃ በሃርድኮድ የተወሰነ ባህሪ ወደ ሙሉ በሙሉ ሊዋቀር የሚችል፣ በፈቃድ የሚነቃ ባህሪ ተለውጧል፤ የራሱ የቅንብሮች ካርድ እና ራሱን የሚያድስ የማገገሚያ መንገድም አለው።

**የቅንብሮች ካርድ፦** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)። ይህ ከላይ ካለው ንባብ-ብቻ `ModelCooldownsCard` የተለየ ነው (ይህ ካርድ ንቁ መቆለፊያዎችን ብቻ
_ይዘረዝራል_) — አዲሱ ካርድ _መለኪያዎቹን ያዋቅራል_። ነባሪዎቹ በ `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ውስጥ ይገኛሉ፦

| ቅንብር                    | ነባሪ                              | ትርጉም                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------ |
| `enabled`               | `false`                          | ዋና መቀያየሪያ — የሞዴል መቆለፊያ በነባሪ **ጠፍቷል**።                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | እንደ የሞዴል-ወሰን አለመሳካት የሚቆጠሩ የላይኛው አቅራቢ ሁኔታዎች።            |
| `baseCooldownMs`        | `120_000` (120 ሰከንድ)             | ለመጀመሪያው አለመሳካት የሚሆን የመጀመሪያ የመቆለፊያ ጊዜ።                  |
| `maxCooldownMs`         | `1_800_000` (30 ደቂቃ)             | በመጨመር ላይ ላለው የማቀዝቀዣ ጊዜ ከፍተኛ ገደብ።                       |
| `maxBackoffSteps`       | `10`                             | ከፍተኛው የኤክስፖኔንሻል-ባክኦፍ መጨመሪያ ደረጃዎች።                      |
| `useExponentialBackoff` | `true`                           | ተደጋጋሚ አለመሳካቶች የማቀዝቀዣ ጊዜውን በኤክስፖኔንሻል እንዲያሳድጉ ወይም አይደለም። |

ቅንብሮቹ በመደበኛው የቅንብሮች ማከማቻ ውስጥ ይቀመጣሉ እና በ resilience ቅንብሮች ስኪማ በኩል ይረጋገጣሉ፤ ካርዱም `baseCooldownMs`/`maxCooldownMs`ን ይገድባል (`maxCooldownMs ≥ baseCooldownMs`) እና `maxBackoffSteps`ንም ይገድባል።

**በስኬት የሚቀንስ መልሶ ማገገም፦** መልሶ ማገገም **በጊዜ ማብቂያ ብቻ** አይደለም። ጤናማ ምላሽ የሞዴሉን የአለመሳካት ቆጠራ ወደ ታች ይመልሰዋል፤ ስለዚህ በመካከለኛው የጊዜ መስኮት ያገገመ ሞዴል መጨመሩን ያቆማል (እና መቆለፊያው ይጸዳል) ቆጣሪው ከመጠናቀቁ በፊት። በተሳካ የጥምረት ዒላማ ላይ `open-sse/services/combo.ts` `decayModelFailureCount()`ን
(`open-sse/services/accountFallback.ts`) ይጠራል፤ ይህም የተቀመጠውን
`failureCount` **በግማሽ** ይቀንሳል (`Math.floor(failureCount / 2)`)፤ ወደ `0` ሲደርስ የመቆለፊያ መዝገቡ ሙሉ በሙሉ ይሰረዛል። ተጓዳኙ `recordModelLockoutFailure()` በመጨመሪያ መስኮቱ ውስጥ በሚከሰቱ አለመሳካቶች ላይ ቆጠራውን ይጨምራል (እና የማቀዝቀዣ ጊዜውን ያሳድጋል)። ይህ በስኬት የሚቀንስ መልሶ ማገገም ከመደበኛው የጊዜ ማብቂያ በተጨማሪ ነው — ሁለቱም መንገዶች ሞዴልን እንደገና ሊያነቁ ይችላሉ።

**ሁኔታ:** መቆለፊያዎቹ በማስታወሻ ውስጥ ይያዛሉ (በእያንዳንዱ ሂደት ውስጥ `Map`s የሆኑ፣ በ
`ModelLockoutEntry` የተመደቡ እና በ
`provider:connectionId:model` ቁልፍ የተደረጉ፣ የትክክለኛ ወሰን መቆለፊያዎች ደግሞ በ
`provider:connectionId:exact:model` ቁልፍ የተደረጉ)፤ በዳታቤዝ ውስጥ አይቀመጡም — እንደገና ሲጀመር ይጠፋሉ። የ_ቅንብሮቹ_ ይቀመጣሉ፤ ንቁ የመቆለፊያ _ሁኔታው_ ግን ጊዜያዊ ነው።

---

## 4. የኮታ-ማጋራት የመለዋወጫ መቆጣጠሪያ (v3.8.36)

የደንበኝነት ምዝገባ መለያዎች (GLM, MiniMax, ወዘተ) ብዙውን ጊዜ ~ 1-3 ተመሳሳይ ጥያቄዎችን ብቻ ይቀበላሉ; ከዚያ በላይ 429 ዎች እና ማቀዝቀዣዎችን ያስነሳል። ይህ ሥር የሰደደ ነው።**ኮታ-ማጋራት** (`qtSd/…`) ጥንብሮች፣ በርካታ API ቁልፎች አንድ የላይ ዥረት መለያ የሚጋሩበት። ሶስት እርከኖች የጋራ መለያ እንዳይጥለቀለቅ ያደርጋሉ።

### በግንኙነት የኮንኩንዛሪ ካፕ (`max_concurrent`)

እያንዳንዱ የአቅራቢ ግንኙነት የ `max_concurrent` ጣሪያ (`provider_connections.max_concurrent`, በግንኙነት ሞዳል ውስጥ የተቀመጠው / API / DB) ማወጅ ይችላል. ያለ ገደብ ባዶውን ይተዉት። ይህ — በታች ያለውን ተከታታይነት ያለው ንብርብር የሚያንቀሳቅሰው ነጠላ ቁልፍ ነው ወደ መለያው እውነተኛ መመሳሰል (ለምሳሌ GLM ~ 1፣ MiniMax ~ 2)።

### በአንድ-ሞዴል የተመጣጣኝ መያዣዎች (`modelConcurrency`)

ግንኙነት በተጨማሪም በ `rateLimitOverrides` ካርታው ውስጥ ትክክለኛ የአንድ ሞዴል ተጓዳኝ ጣሪያዎችን ማሳወቅ ይችላል

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

በግንኙነት ሞዳል ውስጥ ያዋቅሩት (**የዋጋ ወሰን → በአንድ ሞዴል የተመጣጣኝ ኮፍያዎችን ይሽራል።** , አንድ `model=cap` በአንድ መስመር) ወይም `PATCH /api/providers/[id]` በኩል ተመሳሳይ JSON ቅርጽ ጋር. ቁልፍ ትርጉም፡

- **ግንኙነት-ሰፊ እና ሞዴል-ተኮር፡-** `maxConcurrent` የጋራ ግንኙነት-ሰፊ ጣሪያ ሆኖ ይቆያል። ሁለቱም ሲተገበሩ, ሁለቱም በሮች በአቶሚክ የተገኙት በተመሳሳይ ድብልቅ በር (`global → provider → account → model`) ውስጥ ነው; ውጤታማ ባህሪ በጣም ጥብቅ የሚተገበር ገደብ ነው.
- **ትክክለኛው የሞዴል-ቁልፍ ግጥሚያ፡-** ቁልፉ የመፍትሄው — ን ካስኬደ በኋላ ወደ ፈጻሚው የተላለፈው ሞዴል ሕብረቁምፊ በመደበኛነት ባዶ የላይኛው ሞዴል መታወቂያ (`glm-5`) እንጂ ከደንበኛ ወገን `provider/model` ተለዋጭ ስም አይደለም (`zai/glm-5` `glm-5` ጋር አይዛመድም)። እሴቶች አዎንታዊ-ኢንቲጀር በአንድ ጊዜ የሚጠየቁ ጣሪያዎች ናቸው።
- **የአካባቢ ወረፋ፣ ምንም ግኝት የለም፡** ከመጠን በላይ የጥያቄዎች ወረፋ በአገር ውስጥ ካለው queue/timeout ትርጓሜ (የተተየቡ `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` የመግቢያ ስህተቶች)። OmniRoute የላይኛውን ተፋሰስ ፖሊሲ አላገኘውም ወይም አይገምተውም — ኦፕሬተሩ ያዋቀራቸውን ትክክለኛ ጣሪያዎች ያስፈጽማል። የተሞላ የሞዴል በር አቅራቢውን ፈጽሞ አያሰናክልም እና ቋሚ የሞዴል መቆለፊያን ፈጽሞ አይፈጥርም; ወደላይ 429/cooldown/fallback ባህሪ ስህተቱ የኋላ ማቆሚያ ሆኖ ይቆያል።
- **በግንኙነት፣ በሂደት ወሰን፡** ካፕዎች በእያንዳንዱ የውሂብ ጎታ ግንኙነት እና በማህደረ ትውስታ ውስጥ የተያዙ ናቸው፣ ስለዚህ ሁለት ግንኙነቶች ተመሳሳይ የላይኛው API ቁልፍን እንደገና የሚጠቀሙት እርስ በርሳቸው አይጣመሩም።
- **ያልተዋቀረ ማለት ያልተለወጠ ማለት ነው፡-** ካርታውን መተው (ወይም የዳሽቦርድ መስኩን ባዶ መተው) ምንም የሞዴል በር አይጨምርም። የምሳሌ ውቅር ምንም አይነት ሁለንተናዊ አቅራቢ ገደብ ሳያረጋግጥ፡-

```text
glm-5=1
glm-4.7=3
```

### የኮታ-ማጋራት ጥያቄ ተከታታይነት

የኮታ-ማጋራት መላኪያ አወንታዊ `max_concurrent` የሚያውጅ ግንኙነትን ሲያነጣጥረው ለዚያ በተመሳሳይ ጊዜ ይጠየቃል።**መለያ** ተከታታይ በሆነ የግንኙነት ሴማፎር (ቁልፍ `qsconn:<connectionId>`): ከመጠን በላይ ጥያቄዎች **ወረፋው ላይ ይጠብቁ** ሂሳቡን ከማጥለቅለቅ ይልቅ. ነው።**አልተሳካም-ክፍት** — የተሞላ ወረፋ ወይም ጊዜው ያለፈበት የሚላክ ጥያቄን ከመቼውም ጊዜ በላይ ያለ ማስገቢያ ይቀጥላል። ግባ **ቅንጅቶች → Resilience → ኮታ-ማጋራት በግንኙነት ኮንፈረንስ** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`፣ ነባሪ በርቷል)። ያለ `max_concurrent` ካፕ ባህሪው አልተለወጠም።

> የኮታ መጋራት ማዞሪያ በር (`selectQuotaShareTarget`፣ DRR + P2C) በራሱ አልተሳካም እና የላይ-ካፕ ግንኙነትን ብቻ _የሚያሳድደው — በነጠላ-ግንኙነት ገንዳ ሊገድበው አይችልም፣ስለዚህ ይህ ሴማፎር ጎርፉን የያዘው ነው።

### ጥምር ማቀዝቀዝ-በማወቅ ድጋሚ ይሞክሩ

ለእያንዳንዱ ጥምር ስትራተጂ (ሲነቃ) 429 ለ SHORT አላፊ ማቀዝቀዣ የሚሆን ጥያቄ ይጠብቀዋል እና 429 — ከመመለስ ይልቅ እንደገና ይልካል። ይህ የ Gemini-class TPM/RPM መስኮቶችን ይሸፍናል (~ 60s እንደገና ይሞክሩ-በኋላ) በብዙ ሞዴሎች ጥንብሮች ላይ፣ ለምሳሌ ሁለቱንም የሁለት-ሞዴሞ ዒላማዎች ይገድባል። በ `comboCooldownWait` (`enabled`፣ `maxWaitMs`፣ `maxAttempts`፣ `budgetMs`) የታሰረ **ቅንብሮች → የመቋቋም** . በ `quota_exhausted` (እስከ እኩለ ሌሊት ተዘግቷል) ወይም auth/not-found ምክንያቶች በጭራሽ አይጠብቅም። በ `comboTimeoutMs` ስብስብ፣ ከዛ ቀነ ገደብ በፊት መጨረስ የማይችል መጠበቅ አይጀምርም (#18998): ጥምርው በአንድ ጊዜ ከ `COMBO_TIMEOUT` 504 ይልቅ ተርሚናል ምላሽ ይሰጣል።

ጥምር በ `config.comboCooldownWaitEnabled: false` መርጦ መውጣት ይችላል። ቀጥተኛ `false` ብቻ እነዚህን የጋራ ጥምር ጥበቃዎች (ድህረ መላኪያ ማቀዝቀዝ እና የቅድመ መላኪያ circuit-open/model-lock ይጠብቃል) እና የጥበቃ-በጀት ጊዜ ማብቂያ-ፎቅ ማራዘሚያቸውን ያሰናክላል። የጠፋ ወይም `true` ዓለም አቀፍ ፖሊሲን ይጠብቃል; `true` በአለምአቀፍ ደረጃ የአካል ጉዳተኛ መጠበቅን ማንቃት አይችልም። ግልጽ የሆነ `targetTimeoutMs` አሁንም ያሸንፋል። ይህ መርጦ መውጣት የተለየውን ቤተኛ-ኮዴክስ መታጠፊያ-ፒን ቅድመ-መላክ መጠበቅን አይለውጠውም።

ያው በር የቅድመ መላኪያ መያዣን ይሸፍናል (#16319፦ ሞዴሉ በአጭር ጊዜያዊ መቆለፊያ ውስጥ ስለሚቀመጥ እያንዳንዱ የኮምቦ ኢላማ ምንም ዓይነት ሙከራ ሳይደረግ ሲዘለል የዜሮ ሙከራው መንገድ ፍንጭ-አነስተኛ መልስ ከመስጠት ይልቅ በዛው ጣሪያ ስር መቆለፊያውን ይጠብቃል እና እንደገና ይልካል። `503 ALL_TARGETS_SKIPPED`. ምንም መጠበቅ በማይፈቀድበት ጊዜ (ጣሪያ፣ ሙከራ ወይም በጀት ሲያልቅ፣ ወይም ባህሪው ሲጠፋ)፣ የተርሚናል ምላሹ ወደሚከተለው ያሻሽላል። `429 rate_limit_error` መሸከም `retry_after` / `reset_at` ከመጀመሪያው የሽግግር መቆለፊያ ማብቂያ ጊዜ; ኮታ፣ ኦውት እና ያልተገኙ መቆለፊያዎች ፍንጭ-ያነሰ 503 ያስቀምጣሉ።

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

## 7. የUpstream ሁኔታ እንደገና መግለጽ (በስህተት የተገለጹ የኮታ ስህተቶች)

**ወሰን፦** ጊዜያዊ የኮታ መሟጠጥን በተሳሳተ HTTP ሁኔታ የሚያሳውቅ አንድ upstream gateway።

**ዓላማ፦** የሚያሳስት ሁኔታን ከ**መመደብ በፊት** ማስተካከል፣ በዚህም downstream ተጠቃሚዎች (የfallback engine፣ የcombo aggregation፣ እና ለclient የሚቀርበው ምላሽ) የስህተቱን እውነተኛ እንደገና ሊሞከር የሚችል ባህሪ እንዲያዩ።

አንዳንድ gateways ጊዜያዊ የኮታ መሟጠጥን እንደገና ሊሞከር በማይችል HTTP
ሁኔታ ያሳውቃሉ። `agentrouter.org` ከመደበኛው `429` ይልቅ `403` (አንዳንድ ጊዜ `400`) ከቻይንኛ ይዘት
(`用户额度不足` / `额度不足`) ጋር ይመልሳል። እንደ Claude
Code ያሉ clients `403`ን እንደ ቋሚ ስህተት ስለሚቆጥሩ ክፍለ ጊዜውን ያቋርጣሉ፤ እና ማስተካከያ ከሌለ
fallback engine ይህንን እንደ `AUTH_ERROR` እንጂ እንደ የኮታ
ክስተት አይመድበውም።

**ትግበራ፦**

- Registry + matcher፦ `open-sse/config/upstreamStatusRestatement.ts` — በአቅራቢ የተከፋፈለ
  የደንቦች ዝርዝር (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)፣ በ`applyStatusRestatement()` የሚመረጥ።
- የጥሪ ቦታ፦ በ`open-sse/handlers/chatCore.ts` ውስጥ ያለው
  `providerFailure:` block (በ3654ኛው መስመር አካባቢ)፣ `parseUpstreamError()` የupstream
  ምላሽን ከስህተት HTTP ሁኔታ ጋር (`!providerResponse.ok`) ካተነተነ በኋላ እና
  ማንኛውም መመደብ ከመከናወኑ በፊት፣ ስለዚህ እያንዳንዱ downstream ተጠቃሚ የተስተካከለውን
  ሁኔታ ያያል። በ`200` SSE stream ውስጥ የተካተቱ ስህተቶች የተለየ፣
  በኋላ በሚከናወን የstream ትንተና መንገድ ይከናወናሉ፣ እና ዛሬ **በዚህ hook
  አይሸፈኑም** — ይህ የታወቀ ገደብ ነው፣ እስካሁን ለagentrouter የተሳሳተ ሁኔታ አስፈላጊ
  አይደለም (ይህ ሁኔታ እንደ የስህተት HTTP ሁኔታ ስለሚታይ)።
- የእንደገና ሙከራ ብቁነት፦ `429` በ`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ውስጥ ስለሚገኝ፣ እንደገና የተገለጸ ስህተት
  እንደ የማይሰራ `403` ከመታየት ይልቅ እውነተኛ የእንደገና ሙከራ ጊዜ ያለው ምላሽ ይይዛል።
- ሠራሽ የ`60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) የተስተካከለው ምላሽ
  ለ**client** የሚነግረው ብቻ ነው፤ ይህ በራሱ የconnection ውስጣዊ የማቀዝቀዣ/የመቆለፊያ ጊዜ
  አይደለም — ይህ የሚቆጣጠረው የተስተካከለውን ስህተት በትክክል በሚያስተናግደው
  ማንኛውም ዘዴ በተናጠል ነው (የConnection Cooldown እየጨመረ የሚሄድ backoff፣ §2፣ ለAPI-key
  providers መነሻ `3s`፤ ወይም Model Lockout፣ §3፣ እንደ agentrouter ላሉ በየmodel የኮታ አቅራቢዎች)።
  Router ለclient ከሚያሳውቀው የ`60s` ጊዜ በፊት በውስጥ እንደገና ለመሞከር ብቁ ሊሆን ይችላል —
  ይህ ሆን ተብሎ የተተወ የደህንነት ስፋት ነው፣ ሳንካ አይደለም።

ቋሚ ስህተቶች (የagentrouter `无权访问模型` — ይህንን model ለመድረስ ምንም ፈቃድ የለም) በፍጹም
እንደገና አይገለጹም፦ `excludeMarkers` ምልክቱ በ`textMarkers` ቢገኝም ደንቡን ይሽራል፣
ስለዚህ ስህተቱ የመጀመሪያውን ሁኔታ ይጠብቃል እና ለዘላለም ምንም እንደገና አይሞከርም። ተዛማጁ
የአቅራቢ መመደቢያ ደንብ
(`agentrouter-model-access-denied` በ`open-sse/config/providerErrorRules.ts`፦
`reason: "auth_error"`፣ `scope: "model"`፣ የታወጀ `6h` መነሻ የማቀዝቀዣ ጊዜ) በ`checkFallbackError` (`open-sse/services/accountFallback.ts`)
ከአጠቃላይ apikey-category `FORBIDDEN` early-return በፊት ይመረመራል፤ ይህም በ
`honorsRuleLockScope(provider)` ላይ የተመሠረተ ነው (#10334 — በአሁኑ ጊዜ በ
`providerErrorRules.ts` ውስጥ ባለው `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist በኩል ለagentrouter ብቻ የሚሰራ)። የደንቡ
የታወጀው የ6h ማቀዝቀዣ ጊዜ እንደ `fallbackResult.baseCooldownMs` ይተላለፋል፣ ነገር ግን አሁንም
ቀድሞ ወደነበረው በየmodel የኮታ መቆለፊያ መንገድ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`) ይገባል (#10334 ከማቀዝቀዣ ጊዜ ምንጭ በስተቀር ምንም ለውጥ አላመጣበትም)፦
እንደሌሎች ሁሉም የmodel መቆለፊያዎች ወደ operator `mlSettings.maxCooldownMs`
(ነባሪ `1_800_000ms` / 30min) ዝቅ ተደርጎ ይገደባል፤ እና _የተቀመጠው የመቆለፊያ ምክንያት_
ቀድሞ የነበረው hardcoded `"forbidden"` ሆኖ ይቀጥላል፣ የደንቡ `"auth_error"` አይሆንም — ከመጨረሻ እስከመጨረሻ የሚከበረው
የማቀዝቀዣ ጊዜው ብቻ ነው፣ የምክንያት ሕብረቁምፊው አይደለም። Connection ራሱ ንቁ ሆኖ ይቆያል፤
በዚያው connection ላይ ያሉ እህት models አይነኩም።

እንደገና የተገለጹ የኮታ ስህተቶች (`额度不足`) በproduction ውስጥ ወደ አቅራቢ ደንብ ይደርሳሉ
(`agentrouter-user-quota-exhausted`፦ `reason: "quota_exhausted"`፣ `scope:
"connection"`፣ የራሱ የታወጀ ማቀዝቀዣ ጊዜ የለውም — የpersistence layer የscaled backoff ነባሪ ይተገበራል)። ከ#10334 ጀምሮ፣ `scope` በ
`ProviderErrorRuleMatch` ከመጨረሻ እስከመጨረሻ ይጠቀማል፣ ነገር ግን **በ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist ውስጥ ላሉ አቅራቢዎች ብቻ** (`providerErrorRules.ts` —
ዛሬ `"agentrouter"` ብቻ፣ በ`honorsRuleLockScope()` በኩል የሚቆጣጠር)። ለሌሎች አቅራቢዎች ሁሉ
`scope` እንደቀድሞው መረጃ ሰጪ ብቻ ሆኖ ይቆያል፣ ከ#10334 በፊት እንደነበረው።
`checkFallbackError` የተዛመደውን የደንብ scope እንደ `fallbackResult.ruleScope` ያሳያል፤
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ደግሞ `ruleScope` እንደ በconnection ላይ ሰፊ እና ራሱን የሚያገግም ምልክት በደህንነት ሊከበር እንደሚችል የሚያረጋግጥ የጋራ guard ነው
(scope `"connection"`፣ reason `quota_exhausted`፣ በፍጹም `permanent` አይደለም፣ በፍጹም
`creditsExhausted` አይደለም — ወደፊት scope `"connection"`ን ከቋሚ የaccount ሁኔታ ጋር እንዳይጣመር የሚከላከል መከላከያ)። ሁለት ተጠቃሚዎች ይህንን ይጠራሉ፦

- **ጽናት** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  ወደ passthrough-provider **በሞዴል ደረጃ** መቆለፊያ
  ቅርንጫፍ ከመግባት ይልቅ (agentrouter `passthroughModels: true` ስለሆነ
  → `hasPerModelQuota()` የሚመልሰው `true` ነው)፣ **ጊዜያዊ የግንኙነት ማቀዝቀዣ**
  ይተገብራል — `testStatus: "unavailable"` + `rateLimitedUntil`፣ በጭራሽ የመጨረሻ
  ሁኔታ (`credits_exhausted`/`banned`/`expired`) አይሰጥም — ስለዚህ ግንኙነቱ
  የማረጋገጫ መረጃ በእጅ እንደገና ሳይቀናበር ማቀዝቀዣው እንዳለቀ በራሱ
  ይመለሳል። `disableCooling: true` ላላቸው ግንኙነቶች ይህ ይዘለላል (#2997)፤
  ይህ የመሰናከል አማራጭ በምትኩ ወደ በሞዴል ደረጃ መቆለፊያ ይወርዳል (በቅርንጫፉ
  ላይ ካለው የኮድ አስተያየት የተገለጸው የንድፍ ምርጫ ነው)።
- **በተመሳሳይ ጥያቄ ውስጥ የኮምቦ ማዞሪያ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`)፦ ያው ጠባቂ ግንኙነቱን በማስታወሻ
  ውስጥ ባለው `exhaustedConnections` ስብስብ ውስጥ ያስመዘግባል፤ ቁልፉም
  `${provider}:${connectionId}` ነው። ይህ የሚዘልለው ቀሪው SAME-REQUEST ዒላማ
  _ራሱ በራሱ የዒላማ ነገር ላይ ያንኑ ትክክለኛ `connectionId` ካለው ብቻ_ ነው
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ከ `exhaustedConnections` ፍለጋ በፊት) — ተራ የሞዴል-ዝርዝር ኮምቦ፣
  የጎን ዒላማዎቹ በራሳቸው የተመደበ `connectionId` ስለሌላቸው እና አንዱ ብቻ
  በእያንዳንዱ ማሰራጫ ከምላሹ `X-OmniRoute-Selected-Connection-Id` ራስጌ የሚወሰን
  ስለሆነ፣ ይህን ቁልፍ ግጥሚያ በፍጹም አያገኝም። ለዚህ የተለመደ ሁኔታ፣
  ቀሪ እግር አሁን የተሟጠጠውን መለያ እንዳይጠቀም የሚያደርገው እውነተኛ
  ጥበቃ ይህ Set አይደለም — ከላይ ያለው የጽናት ንብርብር ነው (`rateLimitedUntil`
  የግንኙነቱ የወደፊት ጊዜ ላይ ነው)፣ ከዚህ ውድቀት ጋር ተያይዞ ይህ ጠባቂ
  `transientRateLimitedProviders`ን ስለሚያግድ ነው (የ"ሁለት-ደረጃ ንድፍ" እና
  በ `targetExhaustion.ts` ውስጥ ባለው በ
  `isAgentrouterConnectionQuotaScope` ቅርንጫፍ ላይ ያለውን የኮድ አስተያየት ይመልከቱ)፦ ይህ Set ምልክት
  ሳይደረግበት ሲቀር፣ `combo.ts` ውስጥ ያለው `allowRateLimitedConnection` የግድ
  የመፍቀድ ሎጂክ (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ለአቅራቢው
  ቀሪ እግሮች አይነሳም፤ ስለዚህ የማረጋገጫ መረጃ ምርጫ `rateLimitedUntil`
  ማጣሪያ (`src/sse/services/auth.ts:1238`) በመደበኛው ይከበራል፣ እና ቀሪው
  እግር የተለየ፣ አሁንም ብቁ የሆነ የ agentrouter ግንኙነት ይመርጣል ወይም
  ምንም ማረጋገጫ መረጃ እንደሌለ ይወድቃል — ይህ ቅርንጫፍ አሁን ያቀዘቀዘው
  ግንኙነት ላይ በግድ እንደገና አይመለስም።

### የሁለት-ደረጃ ንድፍ፦ የሁኔታ መግለጫን እንደገና መስጠት፣ ከዚያም መመደብ

የሁኔታ መግለጫን እንደገና መስጠት (`upstreamStatusRestatement.ts`) እና የአቅራቢ
መመደቢያ ደንቦች (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) በአቅራቢ መለያ እና በጽሑፍ ምልክቶች ላይ የሚመሰረቱ የተለያዩ መዝገቦች ናቸው፣ ነገር ግን በተለያዩ ቦታዎች ይሰራሉ እና የተለያዩ ዓላማዎችን ያገለግላሉ፦ መግለጫን እንደገና መስጠት በ `chatCore.ts` ውስጥ የ HTTP ሁኔታን ቀደም ብሎ ይጽፋል፤ የመመደቢያ ደንቦች ደግሞ በ `checkFallbackError()` (`open-sse/services/accountFallback.ts`) ውስጥ የመጠባበቂያ `reason` እና የመቆለፊያ `scope` (`model` / `provider` / `connection`) ይመርጣሉ።

የመመደቢያ ደንቦች ሙሉ የስህተት **ጽሑፍ**ን የሚመለከቱት በ `providerErrorRules.ts` ውስጥ በ `FULL_TEXT_RULE_PROVIDERS` የተፈቀዱ አቅራቢዎች ላይ ብቻ ነው (እንደ `额度不足` ያሉ የሰውነት ምልክቶችን ለማዛመድ ያስፈልጋል) — በአሁኑ ጊዜ `"agentrouter"` ብቻ ነው። ለሌሎች ሁሉ **አብሮ ለተገነቡ ካታሎግ** አቅራቢዎች፣ `checkFallbackError` ለ `getProviderErrorRuleMatch` የሚያቀርበው የተዋቀረውን ስህተት (`{code, type}`) ብቻ ነው፤ ይህ ለራስጌ/ሁኔታ/ኮድ ላይ ለተመሰረቱ ደንቦች በቂ ነው፣ ነገር ግን ለሰውነት-ጽሑፍ ምልክቶች ዕውር ነው። አጋዡ `resolveRuleMatchBody()` ይህን ምርጫ ያከናውናል፦ በዝርዝሩ ውስጥ ላሉ አቅራቢዎች ሙሉ የስህተት ጽሑፍ፣ ከዚያ ውጭ ላሉት ደግሞ የተዋቀረው ስህተት። `FULL_TEXT_RULE_PROVIDERS` ላይ **አብሮ የተሰራ** አቅራቢን መጨመር ግልጽ የአቅራቢ-በ-አቅራቢ መርጦ መፍቀድ ነው — ይህ ዝርዝሩ ላይ ላልተጠቀሰ እያንዳንዱ አቅራቢ ነባሪ መንገድ ከባይት ደረጃ ሳይቀየር እንዲቆይ የተደረገ ነው።

የአንድ ደንብ `scope` (`model` / `provider` / `connection`) ከ `FULL_TEXT_RULE_PROVIDERS` የተለየ የመርጦ መፍቀድ ነው፦ `checkFallbackError` ይህን እንደ `fallbackResult.ruleScope` ብቻ ያሳያል፣ እና የታችኛው ክፍል ተጠቃሚዎች ከመረጃ ሰጪ መለያ የበለጠ እንደሆነ የሚያከብሩት በዚያው ፋይል ውስጥ በ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` የተፈቀዱ አቅራቢዎች ላይ ብቻ ነው (በ `honorsRuleLockScope()` በኩል ይቆጣጠራል — ዛሬ `"agentrouter"` ብቻ)። አቅራቢው በዚያ ዝርዝር ውስጥ ከተካተተ በኋላ `scope: "connection"` ግጥሚያ በትክክል ምን እንደሚያደርግ ከላይ ያለውን "እንደገና የተገለጹ የኮታ ስህተቶች" ይመልከቱ።

**#11104 — በኦፕሬተር የታወጁ ደንቦች ሁለቱንም የፈቃድ ዝርዝሮች ያልፋሉ።** ኦፕሬተር ይህን ፋይል ሳያስተካክል በ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) በኩል በሩጫ ጊዜ ለእያንዳንዱ አቅራቢ ደንብ ማወጅ ይችላል። የኦፕሬተር ደንብን በ `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ላይ ማስገደድ — እነዚህ ዝርዝሮች የተዘጋጁት አብረው የተገነቡ የካታሎግ ደንቦችን ነባሪ ባህሪ ለመጠበቅ ነው — ለዝርዝሮቹ አስቀድመው ከተዘረዘሩት አቅራቢዎች ውጭ ላሉ ሁሉ የቅንብር ዘዴውን ከንቱ ያደርገዋል፤ ምክንያቱም ደንቡን ማወጅ ራሱ የኦፕሬተሩ ግልጽ የመርጦ መፍቀድ ነው። `resolveRuleMatchBody()` እና `honorsRuleLockScope()` ሁለቱም መጀመሪያ `hasOperatorRuleForProvider()`ን ይመለከታሉ፦ የኦፕሬተር ደንብ ያለው አቅራቢ በሁለቱም ዝርዝሮች ውስጥ ቢኖርም ባይኖርም ጥሬውን የስህተት ጽሑፍ ያገኛል፣ እና የታወጀው `scope` ይከበራል።

**በኦፕሬተር የታወጁ ደንቦች** (`OperatorProviderErrorRule`)፦ እያንዳንዱ ደንብ እንደ አማራጭ `status` እና እንደ አማራጭ `match` አለው (`match` በስህተት ጽሑፍ ውስጥ የሚፈለግ ቀላል፣ ፊደል-ትልቅና-ትንሽን የማይለይ substring ነው፤ በፍጹም RegExp አይደለም፣ ስለዚህ ReDoS ሊያስከትል አይችልም)፣ እና ከሁለቱ ቢያንስ አንዱን መያዝ አለበት። ሁለቱም ከተሰጡ AND ይደረጋሉ፤ ያልተሰጠ መስክ ማንኛውንም ነገር ያዛምዳል፣ ስለዚህ `{match: "insufficient_quota"}` ያንን ኮድ የያዘ ማንኛውንም ሁኔታ ያዛምዳል። መጀመሪያ የሚዛመደው ደንብ ያሸንፋል። `cooldownMs` እስከ 30 ቀናት ይቀበላል፤ በአጠቃላይ ቢበዛ 50 ደንቦች ሊኖሩ ይችላሉ።

**ሁሉንም የሚሸፍኑ ነባሪዎች** (`settings.providerErrorDefaults`, በፈቃደኝነት የሚነቃ፣ በ
`setOperatorProviderErrorDefaults` የሚዘጋጅ): `{[provider]: {cooldownMs, scope?, reason?}}`
ከ1 ደቂቃ እስከ 30 ቀናት ያለ `cooldownMs`። ነባሪው የሚተገበረው ምንም
የኦፕሬተር ደንብ እና ምንም አብሮ የተሰራ የካታሎግ ደንብ ካልተዛመደ ብቻ ነው፣ እንዲሁም በ 402, 403, 408,
429 እና 5xx ስህተቶች ላይ ብቻ ይሠራል። የጥያቄ ቅርጽ ስህተቶች (400, 404, 409,
413, 422) እና ብቸኛ 401ዎች የራሳቸውን አያያዝ ይጠብቃሉ። ግልጽ
`reason` ካልተሰጠ፣ ምክንያቱ ከሁኔታው ይመጣል፤ `classifyError` እንደሚያደርገው በተመሳሳይ መንገድ። ነባሪን መግለጽ ለ
`hasOperatorRuleForProvider()` እንደ የኦፕሬተር ደንብ ይቆጠራል፤ ስለዚህ `scope` (ነባሪው
`"connection"`) ይከበራል። የነባሪው ውጤታማ የማቀዝቀዣ ጊዜ ከ`cooldownMs` እና ከአቅራቢው
የራሱ የድጋሚ ሙከራ ፍንጭ (`Retry-After`,
`x-ratelimit-reset` ወይም በሰውነቱ ውስጥ ያለ የreset ፍንጭ፣ የግንኙነት-ማቀዝቀዣ ቅንብሩ
“የላይኛው አቅራቢ የድጋሚ ሙከራ ፍንጮችን ተጠቀም” ሲነቃ ሞተሩ የሚያከብረው ያው ፍንጭ)
የሚበልጠው ነው፤ ስለዚህ ነባሪው አጭር የላይኛው አቅራቢ ፍንጭን ሊያራዝም ይችላል እንጂ እውነተኛ የreset ጊዜን በፍጹም ሊያሳጥር አይችልም። ግልጽ የኦፕሬተር ደንብ ትክክለኛውን `cooldownMs` ይጠብቃል። ደንብም ሆነ ነባሪ በ
`markAccountUnavailable` ውስጥ ያሉትን የግንኙነት-ማቀዝቀዣ ጥበቃዎች አያልፉም፤ ንቁ እና ረዘም ያለ
ማቀዝቀዣ ጊዜ በፍጹም አይሳጥርም፣ እንዲሁም የመጨረሻ ሁኔታ በፍጹም አይተካም። በ
`checkFallbackError` ውስጥ ቀደም ብለው የሚሠሩት አብሮ የተሰሩ የጽሑፍ መለያዎች (ክሬዲቶች ተጠናቀዋል፣ ዕለታዊ ኮታ፣ መለያ ተቦዝኗል) አሁንም ለራሳቸው ሐረጎች ቅድሚያ ይወስዳሉ።

**የታወቀ ክፍተት — `providerRuleRegistry` ለ HTTP 400 በፍጹም አይመረመርም።**
የ`checkFallbackError` `BAD_REQUEST` ቅርንጫፍ ሁኔታ 400ን ሙሉ በሙሉ በራሱ የንድፍ ድርድሮች
(`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` ወዘተ በ`accountFallback.ts`) ይመድባል፤ ከዚያም ከላይ ያለው
`configuredRule`/`getProviderErrorRuleMatch` ቅርንጫፍ ከመድረሱ በፊት ይመለሳል።
`status: 400` ያለው አብሮ የተሰራ የካታሎግ ደንብ (ወይም የኦፕሬተር ደንብ) በአገባብ ትክክል ቢሆንም በፍጹም አይሠራም። በአሁኑ ጊዜ ምንም ያለ ደንብ 400ን አይመለከትም፤ ስለዚህ በምርት ላይ ምንም ነገር አይነካም — ነገር ግን ወደፊት የሚመጣ 400 ደንብ መጀመሪያ ይህ ቅርንጫፍ እንዲነካ ይፈልጋል፤ ይህም ደንብ ከመጨመር የበለጠ ሰፊ ለውጥ ነው (ቀድሞውኑ በንድፍ-ድርድር አያያዝ ላይ የሚመሰረቱ ለእያንዳንዱ አቅራቢ 400ን እንደገና ይመድባል)፣ እና ለአንድ አቅራቢ ደንብ ብቻ ከሚደረግ ለውጥ ውጭ ነው።

### አዲስ ኮታን በስህተት የሚገልጽ ጌትዌይ መጨመር

1. አንድ የደንብ ድርድር በ`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ይመዝግቡ። `textMarkers`
   ለአቅራቢው የተለዩ እንዲሆኑ ያድርጉ፤ ከ
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ጋር የሚጋጩ
   አጠቃላይ የእንግሊዝኛ ሐረጎችን በፍጹም እንደገና አይጠቀሙ።
2. እንደ አማራጭ፣ ትክክለኛውን የመቆለፊያ ወሰን ለመምረጥ የምደባ ደንቦችን በ
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ይመዝግቡ
   (`connection` ለመላ መለያው ኮታ፣ `model` ለእያንዳንዱ ሞዴል ስህተቶች)። ይህ እርምጃ በምርት ላይ የሚሠራው ደንቦቻቸው ሙሉውን የስህተት ጽሑፍ (የሰውነት ምልክቶች) ለሚፈልጉ አቅራቢዎች ብቻ ነው፤ የአቅራቢውን መለያ በተመሳሳይ ፋይል ውስጥ ወደ `FULL_TEXT_RULE_PROVIDERS` ይጨምሩ — ካልሆነ `checkFallbackError` ለደንቡ የሚያስተላልፈው የተዋቀረውን
   `{code, type}` ስህተት ብቻ ነው፣ እና የሰውነት-ጽሑፍ ደንብ በቀጥታ ትራፊክ ላይ በፍጹም አይዛመድም። በ
   `status`/`headers` ላይ ብቻ የሚዛመዱ ደንቦች (እንደ Opencode ወይም Minimax ያሉ) ይህን የፈቃድ ማስገቢያ አይፈልጉም። በተናጠል፣ ደንቡ `scope: "connection"` ካወጀ እና ዓላማው ትክክለኛ ለግንኙነት-ሁሉ የሚሠራ ማቀዝቀዣ ከተመሳሳይ ጥያቄ ጥምር-መዝለያ ጋር (መረጃ ሰጪ መለያ ብቻ ሳይሆን) ከሆነ፣ የአቅራቢውን መለያ ወደ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` በዚያው ፋይል ውስጥ ይጨምሩ — ይህ ነው በ
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ውስጥ እንደ `isAgentrouterConnectionQuotaScope()` ያለውን አጠቃቀም እና
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) የሚቆጣጠረው፤ ያለዚህ `scope`
   አሁንም በ`fallbackResult.ruleScope` ውስጥ ይተላለፋል፣ ነገር ግን በእሱ ላይ ምንም እርምጃ አይወሰድም።
3. ከ
   `tests/unit/upstream-status-restatement.test.ts`
   እና `tests/unit/agentrouter-error-rules.test.ts` ጋር የሚመሳሰሉ የአሃድ ሙከራዎችን ይጨምሩ (የ
   not-permanent / not-creditsExhausted ጥበቃዎችን ጨምሮ፣ እና — አቅራቢው የፈቃድ ዝርዝሩን ከፈለገ — `resolveRuleMatchBody()` ሙሉውን ጽሑፍ ለዚያ አቅራቢ ብቻ እንደሚመልስ የሚያረጋግጥ ሙከራ)።

በ`chatCore.ts`፣ `classifyError` ወይም combo ላይ ምንም ለውጥ አያስፈልግም።

#### Egress-በባልዲ የተከፋፈለ መቆለፊያ (#10880)

በ`EGRESS_BUCKETED_LOCK_PROVIDERS` (የopencode ቤተሰብ) ውስጥ ያሉ አቅራቢዎች እንደ IP-በባልዲ የተከፋፈለ የላይኛው አቅራቢ ይቆጠራሉ (የopencode ነፃ ደረጃ IP-በባልዲ የተከፋፈለ ነው፣ በመለያ የተከፋፈለ አይደለም — #9611ን ይመልከቱ)፦ በ `quota_exhausted`
**ወይም** `rate_limit_exceeded` የተመደበ ሁኔታ-429 የመጨረሻ የታወቀው egress IP ከሚያስከስተው ግንኙነት ጋር የሚመሳሰል እያንዳንዱን በፈቃድ የተዘረዘረ የቤተሰብ ግንኙነት ሽግግሩ እነሱን ለመሞከር ከመቻሉ በፊት ያቀዘቅዛል
— በN-1 የተረጋገጡ ያልተሳኩ የላይኛው አቅራቢ ጥሪዎችን ለማስወገድ (ከ#10460/#10525 ጋር ተመሳሳይ ቅርጽ)።
`rate_limit_exceeded` ሆን ተብሎ ተካቷል፦ በ`markAccountUnavailable`
መንገድ ላይ የopencode-ተኮር ደንቦች በፍጹም አይዛመዱም (ምንም headers/body ወደ `checkFallbackError` አይተላለፍም፣ opencode በ`FULL_TEXT_RULE_PROVIDERS` ውስጥ አይገኝም)፤ ስለዚህ የደንበኝነት-ኮታ ጽሑፍ ("monthly usage limit reached") በሰውነቱ የያዘ 429 የሚመደበው በኮታ-ጽሑፍ መመለሻ
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; የ1 ሰዓት ማቀዝቀዣ) እንደ `quota_exhausted` ሲሆን፣ `status_429` ደንብ ከመድረሱ በፊት ነው — ነገር ግን ከኮታ-ጽሑፍ ነፃ የሆነ 429 (መደበኛ የፍጥነት ገደብ) በ`status_429` ደንብ በኩል እንደ `rate_limit_exceeded` ይመደባል፣ እና አሁንም የIP ቤተሰቡን ያቀዘቅዛል። ትክክለኛ ገደቦች፦

- **ምርጥ ጥረት**: መቆለፊያው የግንኙነቱን የመጨረሻ የታወቀ `egress_ip`
  ከ`proxy_logs` ይፈታል (የ24 ሰዓት መስኮት፣ በቅጽበት፣ መሸጎጫ የለም)። ቀዝቃዛ መሸጎጫ (`egress_ip`
  በጭራሽ ያልተመረመረ) ወይም ምንም ረድፍ ከሌለ → የሚሳሳተው ግንኙነት አሁንም በቅርንጫፉ ይቀዘቅዛል (እንደዛሬው ይመዘገባል)፣ ነገር ግን ምንም የእህት-ግንኙነት አይቆለፍም።
- **በጭራሽ ቋሚ አይደለም**: የማቀዝቀዣው ጊዜ የሚታደስ የኮታ መስኮት ነው
  (`testStatus: "unavailable"`)፤ ቋሚ ሁኔታ ከIP-ደረጃ ምልክት በጭራሽ አይመነጭም። `disableCooling` ያላቸው ግንኙነቶች ቅርንጫፉን ሙሉ በሙሉ ያልፉታል።
- **ለተፈቀደው ቤተሰብ የመቆለፊያ ዝርዝር ደረጃ ተቀይሯል**: ይህ የወሰን ለውጥ ነው፣ የእህት-ግንኙነት ማመቻቸት ብቻ አይደለም። opencode `passthroughModels` አቅራቢ ስለሆነ፣ ከዚህ ቅርንጫፍ በፊት 429 በአንድ-MODEL ደረጃ መቆለፍን ያስከትል ነበር፤ አሁን ግን የግንኙነት ማቀዝቀዣን ያስከትላል — አንድ ግንኙነት ብቻ ያለውና ምንም እህት-ግንኙነት የሌለው ኦፕሬተር ቢያስኬደውም ጭምር። ይህ የopencode ደንብ ሠንጠረዥ ትክክል ብሎ የሚያውጀው የወሰን ደረጃ ነው (`scope: "connection"`፣
  `providerErrorRules.ts`)፤ ነገር ግን opencode በ`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ውስጥ ስላልነበረ እስከአሁን በጭራሽ አልተከበረም። ቅርንጫፉ የሚሳሳተውን ግንኙነት ማቀዝቀዣ + `backoffLevel` ራሱ ይጽፋል፣ ይህም የግንኙነት-ወሰን ያለውን agentrouter ቅርንጫፍ ይመስላል፣ ከዚያም ይመለሳል — በአንድ MODEL ደረጃ ያለው እገዳና ከታች ያለው አጠቃላይ መንገድ በጭራሽ አይደረስባቸውም።
- **Combo ተካትቷል**: እንደ agentrouter ቅርንጫፍ፣ ወሰኑ የcombo ጠሪ በ429 ላይ የሚያደርገውን `persistUnavailableState`/`isCombo` ዝቅ ማድረግ ሆን ብሎ ችላ ይላል። በአንድ MODEL ደረጃ ያለ መቆለፍ የዚህ ወሰን ደካማ ቅርጽ አይደለም፤ ትክክለኛ ክፍል አይደለም፦ ስለተሟጠጠው IP ምንም አይናገርም፣ ስለዚህ combo ማዞሪያው በእያንዳንዱ እህት-ግንኙነት አንድ በእርግጥ የሚሳካ ያልሆነ ጥሪ ማቃጠሉን ይቀጥላል።
- **የእህት-ግንኙነት ደህንነት**: አንድ እህት-ግንኙነት ቀድሞውኑ ቋሚ ሁኔታ ላይ ከሆነ (banned/credits_exhausted) ወይም ቀድሞውኑ ረዘም ያለ ማቀዝቀዣ ውስጥ ከሆነ በጭራሽ አይተካም።
- **ልዩ የተፈቀደ ዝርዝር**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ማስፋት በባለቤቱ በግልጽ የሚወሰን ውሳኔ ነው፤ አጠቃላይ የማገናኘት ሥርዓት የለም (pattern #10334/#10419)። የእህት-ግንኙነት ጥያቄው ያንኑ የተፈቀደ ዝርዝር ያስራል፣ ከዚያ ይልቅ እንደ SQL ሊተራል አይደግመውም፤ ስለዚህ ማስፋቱ የአንድ መስመር ለውጥ ሆኖ ይቆያል።
- **የEgress IP ሽክርክሪት፣ በሁለቱም አቅጣጫዎች**: የፍለጋ መስኮቱ (24h) ከEgress-IP መሸጎጫ TTL (5 min) እጅግ የሰፋ ነው፣ ስለዚህ “የመጨረሻው የታወቀ IP” ታሪክ ነው፣ የአሁኑ ሁኔታ አይደለም። የግንኙነት ፕሮክሲ በመስኮቱ ውስጥ ከተሽከረከረ መቆለፊያው በእውነት የሚጋራ አንድ IP ሊያመልጠው ይችላል (የተመዘገበው IP አዲሱና ያልተሟጠጠው ነው) — በተመሳሳይም ከዚያ የተሟጠጠ IP ርቆ የተሽከረከረን እህት-ግንኙነት ሊያቀዘቅዝ ይችላል። ሁለተኛው ሁኔታ ለዚያ እህት-ግንኙነት አንድ የማቀዝቀዣ መስኮት ያስከፍላል፤ ሁለቱም ከታሪክ-ተኮር ፍለጋ የሚመጡ በምርጥ ጥረት የተቀመጡ ገደቦች እንደሆኑ ተቀባይነት አላቸው።
- **ወጪ**: ሁለት የተገደቡ የ`proxy_logs` ስካኖች (በ`idx_pl_timestamp` የመስኮት ማጣሪያ ያላቸው)፣ በ429 ድግግሞሽ ብቻ። አዲስ ኢንዴክስ የለም (migration 134 YAGNI)። መጠኑ መካከለኛ በሆነ የእውነተኛ ትራፊክ DB ቅጂ ላይ ተለክቷል፤ ከፍተኛ-ውጤት ያለው ኢንስታንስ በዚያው መስኮት ውስጥ በተመጣጣኝ መጠን ብዙ ረድፎችን ይይዛል።

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
