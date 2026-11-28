# Monitoring & Observability Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute አብሮገነብ የጤና ክትትል፣ የአቅራቢ autopilot፣ የኮታ መከታተያ እና የታዛቢነት hooks ይዞ ይመጣል። ይህ መመሪያ dashboardን፣ ማንቂያዎችን እና መላ ፍለጋን ይሸፍናል።

**ምንጮች፦**

- `src/lib/monitoring/observability.ts` — የታዛቢነት snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — የcombo ጤና autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — የአቅራቢ autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — የአቅራቢ ጤና matrix
- `src/lib/localHealthCheck.ts` — የአካባቢ ጤና ምርመራ
- `src/lib/tokenHealthCheck.ts` — የtoken እድሳት ጤና
- `src/lib/proxyHealth.ts` — የproxy ጤና cache (በPROXY_GUIDE.md ውስጥ ተሸፍኗል)

---

## አጠቃላይ እይታ

OmniRoute **3 የክትትል ንብርብሮች** አሉት፦

```
┌──────────────────────────────────────────────────────────────┐
│  ንብርብር 1፦ የስርዓት ጤና (በserver ደረጃ)                    │
│  ├─ localHealthCheck.ts — DB፣ ports፣ native deps            │
│  ├─ db/healthCheck.ts — integrity፣ FK፣ orphaned artifacts   │
│  └─ Dashboard፦ /dashboard/health                             │
├──────────────────────────────────────────────────────────────┤
│  ንብርብር 2፦ የአቅራቢ ጤና (የእያንዳንዱ አቅራቢ ጽናት)          │
│  ├─ providerHealthAutopilot.ts — circuit breaker፣ cooldowns │
│  ├─ providerHealthMatrix.ts — በአቅራቢ/model የጤና ውጤቶች    │
│  └─ Dashboard፦ /dashboard/providers                          │
├──────────────────────────────────────────────────────────────┤
│  ንብርብር 3፦ ቀጥታ ታዛቢነት (የruntime snapshots)             │
│  ├─ observability.ts — circuit breakers፣ sessions፣ quota    │
│  ├─ tokenHealthCheck.ts — የOAuth token እድሳት ጤና           │
│  └─ MCP tools፦ omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## የDashboard ገጾች

### `/dashboard/health` (የስርዓት ጤና)

ከፍተኛ-ደረጃው የጤና dashboard የሚከተሉትን ያሳያል፦

| ክፍል               | የሚያሳየው                                              |
| ----------------- | --------------------------------------------------- |
| **የServer ሁኔታ**   | Uptime፣ version፣ port፣ ንቁ connections               |
| **Database**      | Connection፣ integrity፣ የWAL መጠን፣ የቅርብ ጊዜ migrations |
| **የአቅራቢ ማጠቃለያ**   | የንቁ፣ ጤናማ እና ክፍት breaker ብዛት                         |
| **የኮታ መከታተያዎች**   | ንቁ sessions፣ ማንቂያ መስጠት፣ ያለቀባቸው                      |
| **የቅርብ ጊዜ ስህተቶች** | የመጨረሻዎቹ 10 ስህተቶች ከstack traces ጋር                   |
| **የሀብት አጠቃቀም**    | Memory፣ CPU፣ የheap pressure አመልካች                   |

### `/dashboard/providers` (የአቅራቢ ጤና)

የእያንዳንዱ አቅራቢ dashboard፦

| ዓምድ         | መግለጫ                                     |
| ----------- | ---------------------------------------- |
| አቅራቢ        | የአቅራቢ ID + የማሳያ ስም                       |
| ጤና          | አረንጓዴ/ቢጫ/ቀይ ሁኔታ                          |
| Circuit     | ክፍት/ዝግ/በከፊል-ክፍት ሁኔታ                      |
| Connections | የconnections ብዛት፣ የመጨረሻ እድሳት             |
| Models      | የሚገኙ models፣ የእያንዳንዱ model ጤና            |
| ወጪ          | የዛሬ ወጪ፣ የ7-ቀን አዝማሚያ                      |
| ስህተቶች       | የመጨረሻዎቹ 24h የስህተት ብዛት፣ ከፍተኛው error class |

የሚከተሉትን ለማየት አቅራቢውን ጠቅ ያድርጉ፦

- የቅርብ ጊዜ requests ከlatency ዝርዝር ትንተና ጋር
- የእያንዳንዱ connection የጤና ውጤቶች
- የእያንዳንዱ model lockouts
- የAutopilot ምክረ ሐሳቦች

### `/dashboard/quota` (የኮታ ክትትል)

ለእያንዳንዱ API key፦

- የአሁኑ አጠቃቀም ከገደቡ ጋር (progress bar)
- የኮታ አዝማሚያ (የ30-ቀን chart)
- ቀጣዩ የreset ጊዜ
- የማንቂያ ታሪክ

### `/dashboard/combos` (የCombo ጤና)

ለእያንዳንዱ combo፦

- Strategy + targets
- የእያንዳንዱ target ጤና
- የቅርብ ጊዜ fallback events
- የስኬት መጠን (24h፣ 7d፣ 30d)

---

## የጤና ምርመራ API

OmniRoute ያጋልጣል** ሁለት** HTTP የጤና ገጽታዎች. ለኦርኬስትራዎች የሚለዋወጡ አይደሉም።

| መንገድ                         | ዓላማ                                                           | ክብደት                       | ተጠቀም ለ                                           |
| ---------------------------- | ------------------------------------------------------------- | -------------------------- | ------------------------------------------------ |
| `GET /healthz`               | የሕይወት ዑደት liveness/readiness (`ok` / `starting` / `stopping`) | ተራ (የደረጃ ባንዲራ ብቻ)          | ኩበርኔትስ** ዝግጁነት** ; ለስላሳ** መኖር** HTTP መጠቀም ካለብህ   |
| `GET /api/monitoring/health` | ጥልቅ + አቅራቢ ማጠቃለያ (DB፣ ክምር፣ ካታሎግ ብዛት፣…)                        | ከባድ (የማመሳሰል DB / የክትትል ሥራ) | ዳሽቦርዶች፣ ጥቁር ቦክስ ጥልቅ ቼኮች፣ Docker አብሮገነብ የጤና ማረጋገጫ |

> **ማስታወሻ፡-** የአቅራቢ የጤና ማትሪክስ፣ አውቶፓይሎት ጉዳዮች፣ የኮታ ተቆጣጣሪዎች፣ የቶከን ጤና እና `/api/monitoring/health` በላይ የቆይታ ዝርዝሮች በ**MCP መሳሪያ** `observability_snapshot` ወይም የ** ዳሽቦርድ** ገፆች — ለእነዚያ ምንም የተለየ REST መንገዶች የሉም።

ሁለቱም መንገዶች የሚሄዱት በ** ተመሳሳይ የመስቀለኛ ክስተት ዑደት** እንደ ጥያቄ አያያዝ ። በሲፒዩ የታሰረ መንገድ (ትልቅ `GET /v1/models` ካታሎግ ሥራ፣ የረዥም አውድ መጭመቂያ/ቶከን ቆጠራ) ሊዘገይ ይችላል።** ሁሉም** `/healthz` ጨምሮ HTTP ተቆጣጣሪዎች. የክስተት-ሉፕ ስራ የበዛበት ≠ ሂደት ሞቷል። አሳማውን መጠገንን ይመርጣሉ; የፍተሻ ማስተካከያ የውሸት ግድያዎችን ብቻ ይቀንሳል።

### ቀላል ክብደት ያለው ኦርኬስትራ ምርመራ

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` የአገልጋዩ የሕይወት ዑደት ደረጃ ዝግጁ ሲሆን
- **503** + `starting` / `stopping` በሚነሳበት ወይም በሚዘጋበት ጊዜ
- ትግበራ `src/app/healthz/route.ts` ( DB ፒንግ የለም)

### የስርዓት ጤና (ጥልቅ)

```bash
GET /api/monitoring/health
```

ምላሽ፡-

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: መመርመሪያ-መሸጎጫ vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ነው።** የማህደረ ትውስታ መመርመሪያ-መሸጎጫ መለኪያ** የ `provider_connections.test_status` የቀጥታ መጣያ አይደለም። ከ #12532 በኋላ የጥያቄው መንገድ `getCachedCredentialHealthSummary()` ብቻ ያነባል; የጀርባ መመርመሪያዎች መሸጎጫውን ከክስተቱ ዑደት ያድሳሉ።

| ንብርብር             | የት                                                                    | ምን ማለት ነው።                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| የመመርመሪያ መሸጎጫ መለኪያ | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | የመጨረሻ ማረጋገጫ-የጤና ምርመራ ውጤቶች አሁንም በሂደት ትውስታ ውስጥ ይገኛሉ። `source` ሁል ጊዜ `probe-cache` ነው።                                                                                            |
| ያልተሳካ የግንኙነት ዝርዝር | `credentialHealth.failedConnections`                                  | አቅርቡ** `failed > 0` ሲሆን ብቻ** . የታሰሩ የመሸጎጫ ረድፎች ዝርዝር በ `status=error` (`connectionId`፣ `status`፣ sanitized `lastError` / `lastErrorType`)። `failedOmitted` የተዘጋጀው ዝርዝሩ ሲያያዝ ነው። |
| SQLite ተለጣፊ ሁኔታ   | `credentialHealth.staleDbNonOkCount`                                  | ብዛት** ንቁ** (`is_active=1`) የግንኙነቶች ረድፎች የማይታወቁ `test_status` እሺ ያልሆኑ (`error`፣ `expired`፣ `credits_exhausted`፣ `banned`፣ `deactivated`፣ `unavailable`)።                        |

ሁለቱ ንብርብሮች ሆን ብለው ሊስማሙ ይችላሉ፡-

- መለኪያ `failed=0` ሳለ `staleDbNonOkCount>0` — SQLite አሁንም ተለጣፊ `test_status` ሲኖረው (ለምሳሌ `expired` ወይም `credits_exhausted`) የቅርቡ መሸጎጫ ቅጽበታዊ እይታ እንደ `status=error` አይቆጠርም።
- መለኪያ `failed>0` ሳለ SQLite ጤናማ ይመስላል — አንድ የቅርብ ጊዜ ምርመራ አልተሳካም እና የተሸጎጠ ነው; DB ረድፍ አልዘመነም ወይም በኋላ ጸድቷል።

ይህንን የመጨረሻ ነጥብ ሲቧጥጡ `provider_connections.test_status` ላይ ብቻ አያስጠነቅቁ። ለቀጥታ መፈተሻ አለመሳካቶች `failed` + `failedConnections` ተጠቀም፣ እና ቀጣይ ተለጣፊ-ሁኔታ ቆጠራ በምትፈልግበት ጊዜ `staleDbNonOkCount` ይጠቀሙ።

### የኩበርኔትስ መመርመሪያ ምክሮች

OmniRoute ሀ** ነጠላ የመስቀለኛ መንገድ ሂደት** (አንድ ክስተት ዑደት)። የአክሲዮን Docker `HEALTHCHECK` ቀላል ክብደት `/healthz` ኢላማ አድርጓል። `/api/monitoring/health` ነው።** በጣም ከባድ** ለ kubelet liveness ክፍተቶች.

| መርማሪ       | የሚመከር ኢላማ                                                              | ማስታወሻዎች                                                                                                                                                                                                                                                         |
| ---------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ጅምር**    | HTTP `GET /healthz` ከረጅም `failureThreshold` (ወይም ትልቅ `startPeriod`) ጋር | የቀዝቃዛ ጅምር + SQLite ፍልሰት ከጥቂት ሰከንዶች ሊበልጥ ይችላል።                                                                                                                                                                                                                   |
| **ዝግጁነት**  | HTTP `GET /healthz`                                                    | የሕይወት ዑደት `ok` / `starting` / `stopping` (200 vs 503)። ዑደቱ በሲፒዩ የታገደ ከሆነ አሁንም ይንቀጠቀጣል። ሀ** በበርካታ ሰከንዶች ውስጥ 200 ጤናማ አይደለም** (#10303) — ማለት ባለ 3-ባይት ተቆጣጣሪው ከመሮጡ በፊት የክስተት ሉፕ ተርቦ ነበር ማለት ነው።                                                                     |
| **መኖር**    | HTTP `GET /livez`,** ወይም TCP** በዋናው አገልግሎት ወደብ (`PORT`፣ ነባሪ `20128`)   | `/livez` በሂደት-ህያው ብቻ ነው (ሁልጊዜ ተቆጣጣሪው ከሮጠ 200)። አሁንም የክስተት loop — ስራ የበዛበት ≠ የሞተ ነው የሚጋራው እና የክስተት-loop ረሃብን (#10303) ከ TCP የተሻለ አያገኝም። እመርጣለሁ።**TCP** HTTP በ catalog/compression ጭነት ስር ጊዜ ካለፈ; መ ስ ራ ት** አይደለም** በማንኛውም መንገድ ፖድውን በአጭር የክስተት-ሉፕ መሸጫዎች ላይ ይገድሉት |
| **ጥልቅ ጤና** | `GET /api/monitoring/health` ከውጫዊ አረጋጋጭ                                | አይደለም ለ kubelet `livenessProbe` / ጥብቅ `readinessProbe`                                                                                                                                                                                                          |

የምሳሌ ቅርጽ (ከቀዝቃዛ ጅምርዎ እና ከመጭመቂያ ጭነትዎ ጋር ጣራዎችን ያስተካክሉ)

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**አትሥራ** ነጥብ kubelet** መኖር** በ `/api/monitoring/health`. ያ መንገድ ትክክለኛ DB/monitoring ይሰራል እና በጭነት ውስጥ የውሸት አዎንታዊ ይሆናል።

ተዛማጅ [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (የክስተቱ ምልልስ ስራ በሚበዛበት ጊዜ ይመረምራል)፣ [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (ካታሎግ ዋጋ hog)፣ [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (የመጭመቂያ ቶከን-ቆጠራ hog)።

### ሲስተምድ ጠባቂ (የቀዘቀዘ የክስተት ዑደት)

በስርዓት የተሰራ አስተናጋጅ ላይ፣ OmniRoute ዝግጁ ሲሆን ለአገልግሎት አስተዳዳሪው ይነግረዋል እና ፒንግ ማድረጉን ይቀጥላል፣ስለዚህ የክስተት ምልክቱ የተጣበቀ አገልጋይ ተገድሎ ዝም ከማለት ይልቅ እንደገና ይጀምራል። ፒንግዎቹ የሚመጡት ከአገልጋዩ የክስተት ሉፕ ነው፡ ሲዘጋው ያቆማሉ፣ እና አንድ ጊዜ `WatchdogSec` ካለፈ በኋላ ሲስተምድ አገልግሎቱን እንደገና ይጀምራል።

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) አስቀድሞ ከዚህ ጋር የተጠቃሚ ክፍል ይጽፋል። እርስዎ እራስዎ የሚጽፉበት ክፍል (ነባሪ `Type=simple`) ምንም ጠባቂ የለውም፣ ስለዚህ እነዚህን መስመሮች ወደ `[Service]` ክፍሉ ያክሉ

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

የተፈጠረው ክፍል `Restart=on-failure` ያዘጋጃል፣ ስለዚህ ያንን መስመር እንዲሁ — ያለሱ ተቆጣጣሪው እንደገና ከመጀመር ይልቅ የተቀረቀረ አገልግሎትን ብቻ ይገድላል።

- `Type=notify`: አገልግሎቱ የሚጀመረው አገልጋዩ `READY=1` ሲልክ ነው እንጂ ሂደቱ ሲቀጣጠል አይደለም። `TimeoutStartSec` ቀስ ብሎ ጅምርን ይገድባል።
- `NotifyAccess=all`: ፒንግዎቹ የሚላኩት በአገልጋዩ ሂደት ነው፣ እሱም `omniroute serve` ተቆጣጣሪ ልጅ ነው።
- `WatchdogSec`: ፒንግ በየ60 ሰከንድ ይወጣል፣ ስለዚህ ይጠቀሙ** 120 ወይም ከዚያ በላይ** . አነስ ያሉ እሴቶች ጤናማ አገልጋይ ዳግም ያስጀምራሉ።
- በግንባር ቀደምትነት `omniroute serve` አሂድ። `--daemon` አገልጋዩን ከክፍሉ ስብስብ ያላቅቃል እና የማሳወቂያው መጨባበጥ መቼም አይጠናቀቅም።

ዳግም ከተጀመረ በኋላ ገባሪ መሆኑን ያረጋግጡ፡-

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` የተዋቀረውን መዘግየት ያሳያል እና `WatchdogTimestamp` በየደቂቃው ወደፊት ይሄዳል። በጠባቂው ምክንያት ዳግም ማስጀመር እንደ `Result=watchdog` ይመዘገባል። ክፍሉን እንደያዘው ሲቆይ ፒንግቹን ለማጥፋት `OMNIROUTE_DISABLE_SD_NOTIFY=1` ያዘጋጁ; ያለ `NOTIFY_SOCKET` (ተርሚናል፣ Docker፣ Electron፣ Windows) ምንም አይላክም።

ጠባቂው የክስተቱ ምልልስ መስራቱን ብቻ ነው የሚያጣራው። ቀርፋፋ ግን አሁንም እየዞረ ያለው አገልጋይ እንደገና አልተጀመረም።

### አማራጭ የጥያቄ-መንገድ ሥራ (ትውስታ፣ ችሎታ፣ ማስመሰያ ማደስ)

የማህደረ ትውስታ ማውጣት፣ የክህሎት መርፌ እና OAuth ቶከን ማደስ ይጋራሉ።** ዋና መስቀለኛ ክስተት loop** ከ `/healthz` ጋር . እነሱ ዳሽቦርድ-መቀያየር ባህሪያት (`memoryEnabled`, `skillsEnabled`) እንጂ የሰራተኛ ገንዳ አይደሉም. [የአካባቢ — ክስተት-loop ወጪን](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ይመልከቱ።

### አቅራቢ ጤና

> **REST የመጨረሻ ነጥብ የለም።** የአቅራቢ የጤና መረጃ በ MCP መሣሪያ `observability_snapshot` ወይም በዳሽቦርድ `/dashboard/providers` ገጽ በኩል ይገኛል።

### የአቅራቢ ዝርዝር

> **REST የመጨረሻ ነጥብ የለም።** የአቅራቢው ዝርዝር በዳሽቦርድ `/dashboard/providers` ገጽ በኩል ይገኛል።

---

## የአቅራቢ ጤና ራስ-ሰር አስተዳዳሪ

የ`providerHealthAutopilot.ts` ሞጁል፦

1. የአቅራቢ ችግሮችን የሚለይ (የወረዳ መቋረጫ መከፈት፣ የማቀዝቀዣ ጊዜዎች፣ መታገዶች፣ የኮታ ማስጠንቀቂያዎች)
2. ችግሮቹን ለመፍታት **የሚመከሩ እርምጃዎችን** የሚያመነጭ
3. በአማራጭነት ዝቅተኛ ስጋት ያላቸውን እርምጃዎች **በራስ-ሰር የሚያስፈጽም**

**ራሱን የሚጠግን ስርዓት** ነው።

### የሚለዩ የችግር ዓይነቶች

| የችግር ዓይነት                    | ክብደት    | የሁኔታ ምሳሌ                         |
| ---------------------------- | ------- | -------------------------------- |
| `provider_circuit_open`      | ወሳኝ     | ከ5 ውድቀቶች በኋላ የወረዳ መቋረጫው ተከፍቷል    |
| `provider_circuit_half_open` | ማስጠንቀቂያ | ወረዳው መልሶ ማገገምን እየፈተነ ነው          |
| `connection_cooldown`        | ማስጠንቀቂያ | ከ429 በኋላ ግንኙነቱ በማቀዝቀዣ ጊዜ ውስጥ ነው  |
| `stale_connection_error`     | ማስጠንቀቂያ | የመጨረሻው ማደስ ከ30+ ደቂቃዎች በፊት አልተሳካም |
| `terminal_connection_error`  | ወሳኝ     | OAuth ተሰርዟል፣ ቁልፉ ልክ አይደለም        |
| `inactive_connection`        | መረጃ     | ግንኙነቱ በቅንብሮች ውስጥ ተሰናክሏል          |
| `model_lockout`              | ማስጠንቀቂያ | የተወሰነው ሞዴል በለይቶ ማቆያ ውስጥ ነው       |
| `quota_monitor_warning`      | ማስጠንቀቂያ | የኮታ አጠቃቀም 80%+ ደርሷል              |

### የሚመነጩ የእርምጃ ዓይነቶች

| እርምጃ                           | ስጋት   | መግለጫ                            |
| ------------------------------ | ----- | ------------------------------- |
| `clear_provider_breaker`       | መካከለኛ | የወረዳ መቋረጫውን ወደ ዝግ ሁኔታ ዳግም ያስጀምሩ |
| `clear_connection_cooldown`    | ዝቅተኛ  | የግንኙነቱን የማቀዝቀዣ ጊዜ ያስወግዱ         |
| `clear_stale_connection_error` | ዝቅተኛ  | ጊዜ ያለፈበትን የስህተት ምልክት ያጽዱ        |
| `clear_model_lockout`          | ዝቅተኛ  | በለይቶ ማቆያ ውስጥ ያለውን ሞዴል ዳግም ያንቁ   |
| `reactivate_connection`        | መካከለኛ | የቦዘነውን ግንኙነት ዳግም ያንቁ            |
| `deactivate_connection`        | ከፍተኛ  | ችግር ያለበትን ግንኙነት ያሰናክሉ           |

### API

> **የREST መጨረሻ ነጥብ የለም።** የራስ-ሰር አስተዳዳሪ ችግሮች በMCP መሣሪያ `observability_snapshot` ወይም በዳሽቦርዱ በኩል ይገኛሉ። ራስ-ሰር አስተዳዳሪው በውስጥ ይሰራል፤ ባህሪው የሚዋቀረው በቅንብሮች DB (የእያንዳንዱ ግንኙነት `autopilotMode` መስክ) እንጂ በአካባቢ ተለዋዋጮች አይደለም — ለራስ-ሰር አስተዳዳሪ ሁነታ አካባቢ ተለዋዋጭ `grep -rn` ሲደረግ ምንም ውጤት አይገኝም።

### የራስ-ሰር አስተዳዳሪ ሁነታ

ራስ-ሰር አስተዳዳሪው በነባሪነት በ**በእጅ ሁነታ** ይሰራል — ችግሮችን ይለያል እና የሚመከሩ እርምጃዎችን ያመነጫል፣ ነገር ግን በራስ-ሰር አይተገብራቸውም። እርምጃዎቹ በዳሽቦርዱ በኩል ሊተገበሩ ይችላሉ።

---

## የጥምረት ጤና ራስ-ሰር አስተዳዳሪ

`comboHealthAutopilot.ts` የአቅራቢ ራስ-ሰር አስተዳዳሪው **ለጥምረት የተለየ** አቻ ነው። ይህ፦

- ጤናማ ያልሆኑ ጥምረቶችን ይለያል
- የዒላማዎችን ቅደም ተከተል እንደገና እንዲደራጅ ይመክራል
- የተበላሹ ዒላማዎች እንዲሰናከሉ ሐሳብ ያቀርባል
- ከN ውድቀቶች በኋላ የማይሰሩ ዒላማዎችን በራስ-ሰር ያስወግዳል

### የጥምረት ችግር ምሳሌዎች

```
ጥምረት "always-on" (የቅድሚያ ስልት)
├─ ዒላማ 1: openai/gpt-5 (ጤናማ)
├─ ዒላማ 2: anthropic/claude-opus-4-6 (⚠️ እስከ 14:00 ድረስ የሞዴል መታገድ)
└─ ዒላማ 3: kiro/claude-sonnet-4-5 (ጤናማ)

የሚመከር እርምጃ፦ ቅደም ተከተሉን እንደገና ያደራጁ — መታገዱ እስኪያበቃ ድረስ kiroን ከanthropic በላይ ያንቀሳቅሱ
```

---

## የኮታ መከታተያዎች

`observability.ts` ለደንበኝነት ምዝገባ አቅራቢዎች (Claude Code፣ Codex፣ GitHub Copilot) **በክፍለ ጊዜ የተከፋፈሉ የኮታ መከታተያዎችን** ያቀርባል፦

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### የሁኔታዎች ትርጉም

| ሁኔታ         | መቼ                     | የUI እርምጃ                 |
| ----------- | ---------------------- | ------------------------ |
| `starting`  | የመጀመሪያ ምርመራ በሂደት ላይ ነው | የመጫን አመልካች               |
| `idle`      | የቅርብ ጊዜ እንቅስቃሴ የለም     | ከዳሽቦርዱ የተደበቀ             |
| `healthy`   | ከ50% በላይ ኮታ ቀርቷል       | አረንጓዴ ነጥብ                |
| `warning`   | ከ50% በታች ኮታ ቀርቷል       | ቢጫ ማንቂያ                  |
| `exhausted` | ኮታ = 0%                | ቀይ እገዳ፣ ወደ ቀጣዩ አቅራቢ ያዛውሩ |
| `error`     | ምርመራው አልተሳካም           | ቀይ ነጥብ፣ በቅርቡ እንደገና ይሞክሩ  |

### API

> **የREST መጨረሻ ነጥብ የለም።** የኮታ መከታተያ ውሂብ በMCP መሣሪያ `observability_snapshot` ወይም በዳሽቦርዱ በኩል ይገኛል።

---

## የታዛቢነት ቅጽበታዊ እይታ

የMCP መሣሪያው `observability_snapshot` ለAI ወኪሎች **የተሟላ የስርዓት ቅጽበታዊ እይታ** ይመልሳል፦

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ከላይ ይመልከቱ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ወኪሎች ይህን በመጠቀም **የማዞሪያ ውሳኔዎችን** ያደርጋሉ—ለምሳሌ፣ "የopenai ወረዳ ክፍት ከሆነ፣ መጀመሪያ ወደ anthropic አዙር"።

---

## የቶከን ጤንነት ምርመራ

የOAuth አቅራቢዎች (Claude Code፣ GitHub Copilot፣ Cursor) **ወቅታዊ የቶከን ማደስ** ያስፈልጋቸዋል። `src/lib/tokenHealthCheck.ts` የበስተጀርባ መርሐግብር አስኪያጅን ያስኬዳል፦

- **የማጣሪያ ዙር**፦ በየ60 ሰከንዱ (`TICK_MS = 60 * 1000` ያለው ማጣሪያ በ`src/lib/tokenHealthCheck.ts:30`)
- **የእያንዳንዱ ግንኙነት የጤንነት ምርመራ ክፍተት**፦ ነባሪው 60 ደቂቃ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`) ነው፤ በቅንብሮች DB በኩል ሊዋቀር ይችላል
- **401 ሲከሰት ቅድመ-ማደስ**፦ በእያንዳንዱ ግንኙነት interceptor ይከናወናል

### የቶከን ጤንነት ሁኔታ

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### ውቅር

የቶከን ጤንነት ምርመራ ውቅር በውስጥ በ`tokenHealthCheck.ts` ይከናወናል።

### የቶከን ጤንነት

> **የREST መዳረሻ የለም።** የቶከን ጤንነት ውሂብ በዳሽቦርዱ ወይም በMCP መሣሪያ `observability_snapshot` በኩል ይገኛል።

---

## ማንቂያ

### አብረው የተካተቱ ቻናሎች

OmniRoute **3 የማንቂያ ቻናሎችን** ይደግፋል፦

| ቻናል         | ማዋቀር     | የአጠቃቀም ሁኔታ                |
| ----------- | -------- | ------------------------- |
| የዳሽቦርድ ሰንደቅ | ሁልጊዜ ክፍት | በመተግበሪያ ውስጥ ማሳወቂያዎች       |
| Webhook     | URL ያዋቅሩ | Slack፣ Discord፣ PagerDuty |
| ምዝግብ        | ነባሪ      | ለውጫዊ የምዝግብ ማሰባሰቢያ         |

### የWebhook ውቅር

> **ማስታወሻ፦** የWebhook ማንቂያ ውቅር በዳሽቦርዱ የቅንብሮች ገጽ በኩል ይከናወናል። ለWebhook URL፣ የክስተት ማጣሪያ እና የpayload ማበጀት የቅንብሮች UIን ይመልከቱ።

### የማንቂያ ዓይነቶች

| ማንቂያ                         | መቼ                                 | ነባሪ ክብደት |
| ---------------------------- | ---------------------------------- | -------- |
| `provider_circuit_open`      | ወረዳው ሲከፈት                          | ወሳኝ      |
| `provider_circuit_half_open` | ወረዳው መልሶ ማገገሙን ሲፈትሽ                | መረጃ      |
| `quota_warning`              | ኮታው 80%+ ሲደርስ                      | ማስጠንቀቂያ  |
| `quota_exhausted`            | ኮታው 100% ሲደርስ                      | ወሳኝ      |
| `token_refresh_failed`       | 3+ ተከታታይ የማደስ ውድቀቶች ሲኖሩ            | ማስጠንቀቂያ  |
| `token_expired`              | ቶከኑ የማብቂያ ጊዜውን ሲያልፍ                | ወሳኝ      |
| `combo_target_unhealthy`     | የCombo ዒላማው ለ1h+ በማቀዝቀዣ ጊዜ ውስጥ ሲቆይ | ማስጠንቀቂያ  |
| `db_integrity_warning`       | የFK ጥሰቶች > 0 ሲሆኑ                   | ማስጠንቀቂያ  |
| `heap_pressure`              | የHeap አጠቃቀም > 80% የገደቡ ሲሆን         | ማስጠንቀቂያ  |

---

## የአፈጻጸም መለኪያዎች

### ክትትል የሚደረግባቸው መለኪያዎች

| መለኪያ                    | ዓይነት   | ምንጭ                             |
| ----------------------- | ------ | ------------------------------- |
| `request_count`         | ቆጣሪ    | `services/usage.ts`             |
| `request_latency_ms`    | ሂስቶግራም | `services/usage.ts`             |
| `tokens_consumed`       | ቆጣሪ    | `services/usage.ts`             |
| `cost_usd`              | ቆጣሪ    | `services/usage.ts`             |
| `provider_errors`       | ቆጣሪ    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ቆጣሪ    | `services/resilience.ts`        |
| `cache_hits`            | ቆጣሪ    | `services/signatureCache.ts`    |
| `compression_savings`   | ሂስቶግራም | `services/compression/stats.ts` |
| `quota_used`            | ጌጅ     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ጌጅ     | `observability.ts`              |

### የመዘግየት ፐርሰንታይሎች (p50/p95/p99)

> **የREST መዳረሻ ነጥብ የለም።** የመዘግየት ፐርሰንታይል ውሂብ በዳሽቦርዱ `/dashboard/health` ገጽ በኩል ይገኛል። ወደ Prometheus/OpenTelemetry መላክ ለv3.9 ታቅዷል።

### ወደ Prometheus / OpenTelemetry መላክ (ደረጃ 2)

ለv3.9 የታቀደ፦ ወደ Prometheus፣ OpenTelemetry እና Datadog ቤተኛ መላክ።

ለአሁን፣ `/api/monitoring/health`ን በማንኛውም HTTP-ላይ የተመሠረተ የክትትል ሥርዓት (Prometheus blackbox exporter፣ Datadog HTTP check፣ ወዘተ) ይሰብስቡ።

---

## የማንቂያ አዘገጃጀቶች

### Slack

> **ማስታወሻ፦** የWebhook ማንቂያ በዳሽቦርዱ Settings ገጽ በኩል ይዋቀራል — ለዚህ የተለዩ የwebhook የአካባቢ ተለዋዋጮች የሉም (`grep -rn` ምንም ውጤት አይመልስም)። ለwebhook URL፣ ለክስተት ማጣሪያ እና ለpayload ማበጀት Settings UIን ይመልከቱ።

### Discord

> የWebhook ማንቂያ ከSlack ጋር ተመሳሳይ የSettings UI ሂደትን ይጠቀማል። Discord ተመሳሳይ የJSON payload ቅርጽን ይቀበላል።

### PagerDuty

> የWebhook ማንቂያ ተመሳሳይ የSettings UI ሂደትን ይጠቀማል። የPagerDuty Events API v2 routing keys በSettings UI ውስጥ ይዋቀራሉ።

### ብጁ Webhook (JSON)

> JSON body ያለውን POST የሚቀበል ማንኛውም HTTP መዳረሻ ነጥብ ይሠራል። URLን በSettings UI ውስጥ ያዋቅሩ።

---

## የዳሽቦርድ ውቅር

### የጤና ዳሽቦርዱን ያብጁ

`~/.omniroute/dashboard.json` ይፍጠሩ፦

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### አቅራቢን ከላይ ይሰኩ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ችግር መፍታት

### "አቅራቢው ጤናማ ነው ይላል፣ ግን ጥያቄዎች አይሳኩም"

1. **autopilot issues**ን ይፈትሹ — ምናልባት አንድ model ታግዶ ይሆናል
2. የተወሰነውን የስህተት ምድብ ለማየት **recent errors**ን ይመልከቱ
3. በአቅራቢው ካርድ ውስጥ ያለውን **connection test** ይሞክሩ
4. አቅራቢው **በupstream የrate limit ገደብ እንደተጣለበት** ይፈትሹ (በአካባቢው አይታይም)

### "Quota ጤናማ ነው ይላል፣ ግን 429ዎችን አያለሁ"

- 429 ማለት አቅራቢው quotaዎን እንደጨረሱ እየገለጸ ነው
- የOmniRoute quota ክትትል **ያልታደሰ** ሊሆን ይችላል — ትክክለኛው መረጃ በአቅራቢው upstream ላይ ነው
- የQuota ውሂብ በውስጣዊው quota monitor በኩል በራስ-ሰር ይታደሳል

### "Comboው እየከሸፈ ነው፣ ግን ሁሉም targets ጤናማ ይመስላሉ"

- የtarget ቅደም ተከተል ችግሮች ካሉ ለማየት **combo health** ዳሽቦርድን ይፈትሹ
- **fallback events**ን ይመልከቱ — ምናልባት comboው አማራጮቹን በጣም ፈጥኖ እየጨረሰ ይሆናል
- **strategy**ው ከአጠቃቀምዎ ጋር እንደሚዛመድ ያረጋግጡ (priority ከ round-robin ከ auto)

### "የውሂብ ጎታ ጤና ምርመራው እየከሸፈ ነው"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`ን ያስኪዱ
- "ok" ከሆነ — የሐሰት ማንቂያ ነው፤ የጤና ምርመራው ከልክ በላይ ጥብቅ እየሆነ ነው
- ሌላ ማንኛውም ውጤት ከሆነ — **OmniRouteን ያቁሙ** እና [የአደጋ ማገገሚያ መመሪያውን](./DATABASE_GUIDE.md#disaster-recovery) ይከተሉ

### "የMemory heap ጫናው አሳሳቢ ነው"

```bash
# የአሁኑን heap ይፈትሹ
node -e "console.log(process.memoryUsage())"

# በእጅ GCን ያስነሱ (--expose-gc ካለ)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# በአንድ ጊዜ የሚካሄዱ ጥያቄዎችን ይቀንሱ (በenv var ሳይሆን በዳሽቦርዱ Settings ገጽ በኩል ያዋቅሩ)
# `MAX_CONCURRENT_REQUESTS` env var የለም — በSettings → Concurrency ውስጥ ያዋቅሩት።
```

---

## በተጨማሪ ይመልከቱ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — የአጠቃቀም እና የወጪ ክትትል
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — የDB መዋቅር + ጤና
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — የproxy ጤና (የተለየ cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — የስርዓት አርክቴክቸር
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — የcircuit breaker ዝርዝሮች
- ምንጭ፦ `src/lib/monitoring/` (4 ፋይሎች፣ 2121 LOC)
