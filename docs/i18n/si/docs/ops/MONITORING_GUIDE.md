# Monitoring & Observability Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute තුළ අන්තර්නිර්මිත සෞඛ්ය නිරීක්ෂණය, සැපයුම්කරු ස්වයංක්රීය නියමු පද්ධතිය, කෝටා ලුහුබැඳීම සහ නිරීක්ෂණ හැකියා හුක් ඇතුළත් වේ. මෙම මාර්ගෝපදේශය උපකරණ පුවරුව, අනතුරු ඇඟවීම් සහ දෝෂ නිරාකරණය ආවරණය කරයි.

**මූලාශ්ර:**

- `src/lib/monitoring/observability.ts` — නිරීක්ෂණ හැකියා සැණරුව
- `src/lib/monitoring/comboHealthAutopilot.ts` — සංයෝජන සෞඛ්ය ස්වයංක්රීය නියමුව
- `src/lib/monitoring/providerHealthAutopilot.ts` — සැපයුම්කරු ස්වයංක්රීය නියමුව
- `src/lib/monitoring/providerHealthMatrix.ts` — සැපයුම්කරු සෞඛ්ය අනුකෘතිය
- `src/lib/localHealthCheck.ts` — දේශීය සෞඛ්ය පරීක්ෂාව
- `src/lib/tokenHealthCheck.ts` — ටෝකන නැවුම් කිරීමේ සෞඛ්යය
- `src/lib/proxyHealth.ts` — ප්රොක්සි සෞඛ්ය හැඹිලිය (PROXY_GUIDE.md තුළ ආවරණය කර ඇත)

---

## දළ විශ්ලේෂණය

OmniRoute සතුව **නිරීක්ෂණ ස්තර 3ක්** ඇත:

```
┌──────────────────────────────────────────────────────────────┐
│  ස්තරය 1: පද්ධති සෞඛ්යය (සේවාදායක මට්ටම)                  │
│  ├─ localHealthCheck.ts — DB, පෝට්, ස්වදේශීය පරායත්තතා       │
│  ├─ db/healthCheck.ts — අඛණ්ඩතාව, FK, අනාථ කෘත්රිමක         │
│  └─ උපකරණ පුවරුව: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  ස්තරය 2: සැපයුම්කරු සෞඛ්යය (සැපයුම්කරු අනුව ඔරොත්තු දීම) │
│  ├─ providerHealthAutopilot.ts — පරිපථ බිඳිනය, සිසිලන කාල   │
│  ├─ providerHealthMatrix.ts — සැපයුම්කරු/මාදිලිය අනුව සෞඛ්ය ලකුණු │
│  └─ උපකරණ පුවරුව: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  ස්තරය 3: සජීවී නිරීක්ෂණ හැකියාව (ධාවනකාල සැණරු)           │
│  ├─ observability.ts — පරිපථ බිඳින, සැසි, කෝටාව              │
│  ├─ tokenHealthCheck.ts — OAuth ටෝකන නැවුම් කිරීමේ සෞඛ්යය  │
│  └─ MCP මෙවලම්: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## උපකරණ පුවරු පිටු

### `/dashboard/health` (පද්ධති සෞඛ්යය)

ඉහළ මට්ටමේ සෞඛ්ය උපකරණ පුවරුව පෙන්වන්නේ:

| කොටස                   | එය පෙන්වන දේ                                               |
| ---------------------- | ---------------------------------------------------------- |
| **සේවාදායක තත්ත්වය**   | ක්රියාකාලය, අනුවාදය, පෝට් එක, සක්රිය සම්බන්ධතා             |
| **දත්ත සමුදාය**        | සම්බන්ධතාව, අඛණ්ඩතාව, WAL ප්රමාණය, මෑත සංක්රමණ             |
| **සැපයුම්කරු සාරාංශය** | සක්රිය සංඛ්යාව, සෞඛ්ය සම්පන්න සංඛ්යාව, විවෘත බිඳින සංඛ්යාව |
| **කෝටා නිරීක්ෂක**      | සක්රිය සැසි, අනතුරු ඇඟවීම්, අවසන් වීම්                     |
| **මෑත දෝෂ**            | ස්ටැක් අනුරේඛන සහිත අවසන් දෝෂ 10                           |
| **සම්පත් භාවිතය**      | මතකය, CPU, හීප් පීඩන දර්ශකය                                |

### `/dashboard/providers` (සැපයුම්කරු සෞඛ්යය)

එක් එක් සැපයුම්කරු සඳහා උපකරණ පුවරුව:

| තීරුව      | විස්තරය                                       |
| ---------- | --------------------------------------------- |
| සැපයුම්කරු | සැපයුම්කරු ID + ප්රදර්ශන නාමය                 |
| සෞඛ්යය     | කොළ/කහ/රතු තත්ත්වය                            |
| පරිපථය     | විවෘත/වසා ඇති/අර්ධ-විවෘත තත්ත්වය              |
| සම්බන්ධතා  | සම්බන්ධතා සංඛ්යාව, අවසන් නැවුම් කිරීම         |
| මාදිලි     | ලබාගත හැකි මාදිලි, එක් එක් මාදිලියේ සෞඛ්යය    |
| පිරිවැය    | අද පිරිවැය, දින 7ක ප්රවණතාව                   |
| දෝෂ        | අවසන් පැය 24 තුළ දෝෂ සංඛ්යාව, ඉහළම දෝෂ පන්තිය |

බැලීමට සැපයුම්කරුවකු ක්ලික් කරන්න:

- ප්රමාද බිඳවැටීම සමඟ මෑත ඉල්ලීම්
- එක් එක් සම්බන්ධතාව සඳහා සෞඛ්ය ලකුණු
- එක් එක් මාදිලිය සඳහා අගුලු දැමීම්
- ස්වයංක්රීය නියමු නිර්දේශ

### `/dashboard/quota` (කෝටා ලුහුබැඳීම)

එක් එක් API යතුර සඳහා:

- වත්මන් භාවිතය සහ සීමාව අතර සැසඳීම (ප්රගති තීරුව)
- කෝටා ප්රවණතාව (දින 30ක ප්රස්තාරය)
- ඊළඟ යළි සැකසීමේ වේලාව
- අනතුරු ඇඟවීම් ඉතිහාසය

### `/dashboard/combos` (සංයෝජන සෞඛ්යය)

එක් එක් සංයෝජනය සඳහා:

- උපායමාර්ගය + ඉලක්ක
- එක් එක් ඉලක්කයේ සෞඛ්යය
- මෑත පසුබැසීමේ සිදුවීම්
- සාර්ථකත්ව අනුපාතය (පැය 24, දින 7, දින 30)

---

## සෞඛ්ය පරීක්ෂාව API

OmniRoute නිරාවරණය කරයි** දෙකක්** HTTP සෞඛ්ය මතුපිට. වාදකයින් සඳහා ඒවා එකිනෙකට හුවමාරු කළ නොහැක.

| මාර්ගය                       | අරමුණ                                                           | බර                                 | සඳහා භාවිතා කරන්න                                                          |
| ---------------------------- | --------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `GET /healthz`               | ජීවන චක්‍රය liveness/readiness (`ok` / `starting` / `stopping`) | සුළු (අදියර ධජය පමණි)              | කුබර්නෙටස්** සූදානම** ; මෘදු** සජීවී බව** ඔබ HTTP භාවිතා කළ යුතු නම්       |
| `GET /api/monitoring/health` | ගැඹුරු පද්ධති + සපයන්නාගේ සාරාංශය (DB, ගොඩ, නාමාවලි ගණන්, ...)  | බර (සමමුහුර්ත DB / අධීක්ෂණ කාර්යය) | උපකරණ පුවරු, බ්ලැක්බොක්ස් ගැඹුරු චෙක්පත්, Docker හි බිල්ට් සෞඛ්‍ය පරීක්ෂාව |

> **සටහන:** සපයන්නාගේ සෞඛ්‍ය න්‍යාස, ස්වයංක්‍රීය නියමු ගැටළු, කෝටා නිරීක්ෂකයින්, ටෝකන් සෞඛ්‍යය සහ `/api/monitoring/health` ඉක්මවා ඇති ප්‍රමාද විස්තර**MCP මෙවලම** `observability_snapshot` හෝ** උපකරණ පුවරුව** පිටු — ඒවා සඳහා කැප වූ REST මාර්ග නොමැත.

මාර්ග දෙකම ධාවනය වේ** එකම නෝඩ් සිදුවීම් ලූපය** ඉල්ලීම හැසිරවීම ලෙස. CPU-බැඳි මාර්ගයක් (විශාල `GET /v1/models` නාමාවලිය වැඩ, දිගු සන්දර්භය සම්පීඩනය / ටෝකන් ගණන් කිරීම) ප්‍රමාද විය හැක** සියලු** `/healthz` ඇතුළුව HTTP හසුරුවන්නන්. Event-loop කාර්යබහුල ≠ ක්‍රියාවලිය මිය ගියේය. ඌරා සවි කිරීමට කැමති; පරීක්ෂණ සුසර කිරීම ව්‍යාජ ඝාතනයන් අඩු කරයි.

### සැහැල්ලු වාදක පරීක්ෂණය

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` සේවාදායක ජීවන චක්‍ර අදියර සූදානම් වූ විට
- **503** ආරම්භයේදී හෝ වසා දැමීමේදී + `starting` / `stopping`
- ක්‍රියාත්මක කිරීම: `src/app/healthz/route.ts` ( DB ping නැත)

### පද්ධති සෞඛ්‍යය (ගැඹුරු)

```bash
GET /api/monitoring/health
```

ප්රතිචාරය:

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

#### `credentialHealth`: probe-cache vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` යනු** in-memory probe-cache gage** `provider_connections.test_status` හි සජීවී ඩම්ප් එකක් නොවේ. #12532 ට පසු ඉල්ලීම් මාර්ගය කියවෙන්නේ `getCachedCredentialHealthSummary()` පමණි; පසුබිම් පරීක්ෂණ මගින් සිදුවීම් ලූපයෙන් හැඹිලිය නැවුම් කරයි.

| ස්ථරය                     | කොහෙද                                                                 | එහි තේරුම කුමක්ද                                                                                                                                                                                                |
| ------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| පරීක්ෂණ-හැඹිලි මානය       | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | අවසන් අක්තපත්‍ර-සෞඛ්‍ය පරීක්ෂණ ප්‍රතිඵල තවමත් ක්‍රියාවලි මතකයේ රඳවා ඇත. `source` සෑම විටම `probe-cache` වේ.                                                                                                     |
| අසාර්ථක සම්බන්ධතා විස්තරය | `credentialHealth.failedConnections`                                  | ඉදිරිපත් කරන්න** `failed > 0` විට පමණි** . `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`) සමඟ සීමා වූ හැඹිලි පේළි ලැයිස්තුව. ලැයිස්තුව සීමා කළ විට `failedOmitted` සකසා ඇත. |
| SQLite ඇලෙන සුළු තත්ත්වය  | `credentialHealth.staleDbNonOkCount`                                  | ගණන්** ක්රියාකාරී** (`is_active=1`) සම්බන්ධතා පේළි එහි දිගටම පවතින `test_status` දන්නා ok නොවන (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                               |

ස්ථර දෙක අරමුණ මත එකඟ නොවිය හැක:

- `staleDbNonOkCount>0` — SQLite තවමත් ඇලෙන සුළු `test_status` (උදාහරණයක් ලෙස `expired` හෝ `credits_exhausted`) ඇති අතර `failed=0` මැනීම, නවතම පරීක්ෂණ-හැඹිලි ස්නැප්ෂොට් `status=error` ලෙස ගණන් නොගනී.
- `failed>0` මැනීම SQLite සෞඛ්‍ය සම්පන්න ලෙස පෙනෙන අතර — මෑත පරීක්ෂණයක් අසාර්ථක වූ අතර හැඹිලිගත කර ඇත; DB පේළිය යාවත්කාලීන කර නැත, නැතහොත් පසුව ඉවත් කර ඇත.

මෙම අන්ත ලක්ෂ්‍යය සීරීමට ලක් කිරීමේදී `provider_connections.test_status` මත පමණක් අනතුරු අඟවන්න එපා. සජීවී පරීක්ෂණ අසාර්ථක වීම් සඳහා `failed` + `failedConnections` භාවිතා කරන්න, සහ ඔබට දිගටම පවතින ඇලෙන සුළු-තත්ත්ව ගණන අවශ්‍ය විට `staleDbNonOkCount` භාවිතා කරන්න.

### Kubernetes නිර්දේශ විමර්ශනය කරයි

OmniRoute යනු a** තනි Node ක්රියාවලිය** (එක් සිදුවීම් ලූපයක්). කොටස් Docker `HEALTHCHECK` සැහැල්ලු `/healthz` ඉලක්ක කරයි. `/api/monitoring/health` වේ** බර වැඩියි** kubelet liveness intervals සඳහා.

| විමර්ශනය කරන්න    | නිර්දේශිත ඉලක්කය                                                           | සටහන්                                                                                                                                                                                                                                                                                                                         |
| ----------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **පණ ගන්වන්න**    | දිගු `failureThreshold` (හෝ විශාල `startPeriod`) සහිත `GET /healthz` HTTP  | සීතල ආරම්භය + SQLite සංක්‍රමණය තත්පර කිහිපයක් ඉක්මවිය හැක                                                                                                                                                                                                                                                                     |
| **සූදානම**        | HTTP `GET /healthz`                                                        | ජීවන චක්‍රය `ok` / `starting` / `stopping` (200 vs 503). ලූපය CPU-අවහිර කර ඇත්නම් තවමත් ෆ්ලැප් වේ. ඒ** තත්පර කිහිපයකින් 200 සෞඛ්ය සම්පන්න නොවේ** (#10303) — එයින් අදහස් වන්නේ 3-බයිට් හසුරුවන්නා ධාවනය වීමට පෙර සිදුවීම් ලූපය සාගින්නෙන් පෙළෙන බවයි                                                                           |
| **සජීවී බව**      | HTTP `GET /livez`,** හෝ TCP** ප්‍රධාන සේවා වරායේ (`PORT`, default `20128`) | `/livez` යනු ක්‍රියාවලි-සජීවී පමණි (හැසිරුම්කරු ධාවනය කරන්නේ නම් සෑම විටම 200). එය තවමත් Event loop — කාර්යබහුල ≠ මිය ගොස් ඇති අතර, එය TCP වලට වඩා සිදුවීම්-ලූප් සාගින්න (#10303) හඳුනා නොගනී. කැමති**TCP** HTTP පරීක්ෂණ catalog/compression භාරය යටතේ කාලය අවසන් නම්; කරන්න** නැත** කෙටි ඉවෙන්ට්-ලූප් කුටි මත පොඩ් මරා දමන්න |
| **ගැඹුරු සෞඛ්යය** | බාහිර පරීක්ෂකයෙකුගෙන්`GET /api/monitoring/health`                          | kubelet `livenessProbe` / tight `readinessProbe` සඳහා නොවේ                                                                                                                                                                                                                                                                    |

උදාහරණ හැඩය (ඔබේ සීතල-ආරම්භක සහ සම්පීඩන භාරයට සීමාවන් සකසන්න):

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

**නෑ** ලක්ෂ්යය kubelet** සජීවී බව** `/api/monitoring/health`. එම මාර්ගය සැබෑ DB/monitoring ක්‍රියා කරන අතර බර යටතේ ව්‍යාජ-ධනාත්මක වනු ඇත.

ආශ්රිත: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (සිදුවීම් ලූපය කාර්යබහුල වන විට පරීක්ෂණ), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (නාමාවලි මිල හොග්), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (සම්පීඩන ටෝකන-ගණන හොග්).

### systemd මුරකරු (ශීත කළ සිදුවීම් ලූපය)

systemd ධාරකයක, OmniRoute එය සුදානම් වූ විට සේවා කළමනාකරුට පවසන අතර එය දිගටම ping කරයි, එබැවින් සිදුවීම් ලූපය සිරවී ඇති සේවාදායකයක් මිය ගොස් නිහඬව සිටීම වෙනුවට නැවත ආරම්භ වේ. පිං පැමිණෙන්නේ සේවාදායකයාගේම සිදුවීම් ලූපයෙන්: එය අවහිර වූ විට, ඒවා නතර වන අතර, `WatchdogSec` එකක් නොමැතිව පසු වූ පසු systemd නැවත ආරම්භ කරයි.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) දැනටමත් මෙය සමඟ පරිශීලක ඒකකයක් ලියයි. ඔබ විසින්ම ලියන ඒකකයකට (පෙරනිමි `Type=simple`) මුර බල්ලා නොලැබේ, එබැවින් මෙම රේඛා එහි `[Service]` කොටසට එක් කරන්න:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

උත්පාදනය කරන ලද ඒකකය `Restart=on-failure` සකසයි, එබැවින් එය නොමැතිව එම රේඛාව මෙන්ම — එකතු කරන්න මුරකරු එය නැවත ආරම්භ කිරීම වෙනුවට සිරවී ඇති සේවාව විනාශ කරයි.

- `Type=notify`: සේවාව "ආරම්භ වන්නේ" සේවාදායකය `READY=1` යවන විට මිස ක්‍රියාවලිය දෙබල වන විට නොවේ. `TimeoutStartSec` මන්දගාමී ආරම්භයක් සීමා කරයි.
- `NotifyAccess=all`: පිං යවනු ලබන්නේ `omniroute serve` අධීක්ෂකගේ දරුවෙකු වන සේවාදායක ක්‍රියාවලිය මගිනි.
- `WatchdogSec`: සෑම තත්පර 60 කට වරක් පිං පිටතට යයි, එබැවින් භාවිතා කරන්න** 120 හෝ ඊට වැඩි** . කුඩා අගයන් නිරෝගී සේවාදායකයක් නැවත ආරම්භ කරනු ඇත.
- පෙරබිමෙහි `omniroute serve` ධාවනය කරන්න. `--daemon` මඟින් සේවාදායකය ඒකකයේ cgroup වෙතින් වෙන් කරන අතර දැනුම් දීමේ අතට අත දීම කිසිදා සම්පූර්ණ නොවේ.

නැවත ආරම්භ කිරීමෙන් පසු එය සක්‍රිය දැයි පරීක්ෂා කරන්න:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` වින්‍යාසගත ප්‍රමාදය පෙන්වන අතර `WatchdogTimestamp` සෑම මිනිත්තුවකම ඉදිරියට යයි. මුරකරු විසින් නැවත ආරම්භ කිරීම `Result=watchdog` ලෙස සටහන් වේ. ඒකකය එලෙසම තබා ගනිමින් පිං අක්‍රිය කිරීමට, `OMNIROUTE_DISABLE_SD_NOTIFY=1` සකසන්න; `NOTIFY_SOCKET` නොමැතිව (පර්යන්තය, Docker, Electron, Windows) කිසිවක් යවන්නේ නැත.

මුර බල්ලා පරීක්‍ෂා කරන්නේ සිදුවීම් ලූපය දිගටම ක්‍රියාත්මක වේද යන්න පමණි. මන්දගාමී නමුත් තවමත් හැරෙමින් පවතින සේවාදායකයක් නැවත ආරම්භ නොවේ.

### විකල්ප ඉල්ලීම්-මාර්ග වැඩ (මතකය, කුසලතා, සංකේත නැවුම් කිරීම)

මතකය නිස්සාරණය, කුසලතා එන්නත් කිරීම සහ OAuth ටෝකන් නැවුම් කිරීම බෙදා ගනී** ප්‍රධාන නෝඩ් සිදුවීම් පුඩුව** `/healthz` සමඟ. ඒවා උපකරණ පුවරුව-ටොගල් විශේෂාංග (`memoryEnabled`, `skillsEnabled`), සේවක සංචිතයක් නොවේ. [පරිසරය — Event-loop පිරිවැය](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) බලන්න.

### සැපයුම්කරු සෞඛ්යය

> **REST අවසන් ලක්ෂ්‍ය නැත.** සපයන්නාගේ සෞඛ්‍ය දත්ත MCP මෙවලම `observability_snapshot` හෝ උපකරණ පුවරුව `/dashboard/providers` පිටුව හරහා ලබා ගත හැක.

### සපයන්නාගේ විස්තර

> **REST අවසන් ලක්ෂ්‍ය නැත.** එක්-සැපයුම්කරු විස්තර උපකරණ පුවරුව `/dashboard/providers` පිටුව හරහා ලබා ගත හැක.

---

## සැපයුම්කරු සෞඛ්ය ස්වයංක්රීය නියමු පද්ධතිය

`providerHealthAutopilot.ts` මොඩියුලය පහත දෑ සිදු කරන **ස්වයං-ප්රතිසාධන පද්ධතියකි**:

1. සැපයුම්කරු සම්බන්ධ ගැටලු හඳුනා ගනී (පරිපථය විවෘත වීම, ශීතකාල, අගුලු දැමීම්, කෝටා අනතුරු ඇඟවීම්)
2. ඒවා විසඳීම සඳහා **නිර්දේශිත ක්රියාමාර්ග** ජනනය කරයි
3. අඩු අවදානම් ක්රියාමාර්ග විකල්පයක් ලෙස **ස්වයංක්රීයව ක්රියාත්මක කරයි**

### හඳුනා ගන්නා ගැටලු වර්ග

| ගැටලු වර්ගය                  | බරපතළභාවය    | උදාහරණ තත්ත්වය                                   |
| ---------------------------- | ------------ | ------------------------------------------------ |
| `provider_circuit_open`      | තීරණාත්මක    | අසාර්ථක වීම් 5කට පසු පරිපථ බිඳිනය විවෘත වීම      |
| `provider_circuit_half_open` | අනතුරු ඇඟවීම | පරිපථය ප්රතිසාධනය පරීක්ෂා කරමින් සිටීම           |
| `connection_cooldown`        | අනතුරු ඇඟවීම | 429කට පසු සම්බන්ධතාව ශීතකාලයක පැවතීම             |
| `stale_connection_error`     | අනතුරු ඇඟවීම | අවසන් නැවුම් කිරීම මිනිත්තු 30කට පෙර අසාර්ථක වීම |
| `terminal_connection_error`  | තීරණාත්මක    | OAuth අවලංගු කර තිබීම, යතුර වලංගු නොවීම          |
| `inactive_connection`        | තොරතුරු      | සැකසුම් තුළ සම්බන්ධතාව අක්රිය කර තිබීම           |
| `model_lockout`              | අනතුරු ඇඟවීම | නිශ්චිත ආකෘතියක් නිරෝධායනය කර තිබීම              |
| `quota_monitor_warning`      | අනතුරු ඇඟවීම | කෝටා භාවිතය 80% හෝ ඊට වැඩි වීම                   |

### ජනනය කරන ක්රියාමාර්ග වර්ග

| ක්රියාමාර්ගය                   | අවදානම | විස්තරය                                 |
| ------------------------------ | ------ | --------------------------------------- |
| `clear_provider_breaker`       | මධ්යම  | පරිපථ බිඳිනය සංවෘත තත්ත්වයට යළි සකසන්න  |
| `clear_connection_cooldown`    | අඩු    | සම්බන්ධතාවයක ශීතකාලය ඉවත් කරන්න         |
| `clear_stale_connection_error` | අඩු    | කල් ඉකුත් වූ දෝෂ සලකුණ ඉවත් කරන්න       |
| `clear_model_lockout`          | අඩු    | නිරෝධායනය කළ ආකෘතියක් යළි සක්රිය කරන්න  |
| `reactivate_connection`        | මධ්යම  | අක්රිය කළ සම්බන්ධතාවක් යළි සක්රිය කරන්න |
| `deactivate_connection`        | ඉහළ    | ගැටලුකාරී සම්බන්ධතාවක් අක්රිය කරන්න     |

### API

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** ස්වයංක්රීය නියමු පද්ධතියේ ගැටලු MCP මෙවලම වන `observability_snapshot` හෝ උපකරණ පුවරුව හරහා ලබා ගත හැක. ස්වයංක්රීය නියමු පද්ධතිය අභ්යන්තරව ධාවනය වේ; එහි හැසිරීම පරිසර විචල්ය මඟින් නොව, සැකසුම් DB හරහා (එක් එක් සම්බන්ධතාවයේ `autopilotMode` ක්ෂේත්රය මඟින්) වින්යාස කරයි — ස්වයංක්රීය නියමු ප්රකාර පරිසර විචල්යයක් සඳහා `grep -rn` ධාවනය කළ විට ගැළපීම් කිසිවක් නොලැබේ.

### ස්වයංක්රීය නියමු ප්රකාරය

ස්වයංක්රීය නියමු පද්ධතිය පෙරනිමියෙන් **අතින් ක්රියාත්මක කරන ප්රකාරයේ** ක්රියා කරයි — එය ගැටලු හඳුනාගෙන නිර්දේශිත ක්රියාමාර්ග ජනනය කරන නමුත් ඒවා ස්වයංක්රීයව යොදන්නේ නැත. උපකරණ පුවරුව හරහා ක්රියාමාර්ග යෙදිය හැක.

---

## සංයෝජන සෞඛ්ය ස්වයංක්රීය නියමු පද්ධතිය

`comboHealthAutopilot.ts` යනු සැපයුම්කරු ස්වයංක්රීය නියමු පද්ධතියට සමාන **සංයෝජන-විශේෂිත** පද්ධතියයි. එය:

- සෞඛ්ය සම්පන්න නොවන සංයෝජන හඳුනා ගනී
- ඉලක්ක නැවත අනුපිළිවෙළට සැකසීම නිර්දේශ කරයි
- බිඳවැටුණු ඉලක්ක අක්රිය කිරීමට යෝජනා කරයි
- අසාර්ථක වීම් Nකට පසු ක්රියා විරහිත ඉලක්ක ස්වයංක්රීයව ඉවත් කරයි

### සංයෝජන ගැටලු සඳහා උදාහරණ

```
"always-on" සංයෝජනය (ප්රමුඛතා උපායමාර්ගය)
├─ ඉලක්කය 1: openai/gpt-5 (සෞඛ්ය සම්පන්නයි)
├─ ඉලක්කය 2: anthropic/claude-opus-4-6 (⚠️ 14:00 දක්වා ආකෘතිය අගුලු දමා ඇත)
└─ ඉලක්කය 3: kiro/claude-sonnet-4-5 (සෞඛ්ය සම්පන්නයි)

නිර්දේශිත ක්රියාමාර්ගය: නැවත අනුපිළිවෙළට සකසන්න — අගුලු දැමීම කල් ඉකුත් වන තෙක් kiro, anthropicට ඉහළින් තබන්න
```

---

## කෝටා නිරීක්ෂක

`observability.ts` මඟින් දායකත්ව සැපයුම්කරුවන් සඳහා (Claude Code, Codex, GitHub Copilot) **එක් එක් සැසියට අදාළ කෝටා නිරීක්ෂක** නිරාවරණය කරයි:

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

### තත්ත්වවල අර්ථ

| තත්ත්වය     | අවස්ථාව                        | UI ක්රියාව                               |
| ----------- | ------------------------------ | ---------------------------------------- |
| `starting`  | ආරම්භක විමසුම සිදු වෙමින් පවතී | භ්රමණ දර්ශකය                             |
| `idle`      | මෑත ක්රියාකාරකමක් නොමැත        | උපකරණ පුවරුවෙන් සඟවයි                    |
| `healthy`   | කෝටාවෙන් > 50%ක් ඉතිරිව ඇත     | කොළ පැහැති තිත                           |
| `warning`   | කෝටාවෙන් < 50%ක් ඉතිරිව ඇත     | කහ පැහැති අනතුරු ඇඟවීම                   |
| `exhausted` | කෝටාව = 0%                     | රතු අවහිරය, ඊළඟ සැපයුම්කරු වෙත යොමු කරයි |
| `error`     | විමසීම අසාර්ථක විය             | රතු තිත, ඉක්මනින් නැවත උත්සාහ කරයි       |

### API

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** කෝටා නිරීක්ෂක දත්ත MCP මෙවලම වන `observability_snapshot` හෝ උපකරණ පුවරුව හරහා ලබා ගත හැක.

---

## නිරීක්ෂණ හැකියා සැණරුව

MCP මෙවලම වන `observability_snapshot`, AI නියෝජිතයන් සඳහා **සම්පූර්ණ පද්ධති සැණරුවක්** ලබා දෙයි:

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
  "quotaMonitors": {/* ඉහත බලන්න */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

නියෝජිතයන් **මාර්ගගත කිරීමේ තීරණ** ගැනීමට මෙය භාවිත කරයි — උදාහරණයක් ලෙස, "openai පරිපථය විවෘත නම්, පළමුව anthropic වෙත මාර්ගගත කරන්න".

---

## ටෝකන සෞඛ්ය පරීක්ෂාව

OAuth සපයන්නන්ට (Claude Code, GitHub Copilot, Cursor) **කාලානුරූපී ටෝකන නැවුම් කිරීම** අවශ්ය වේ. `src/lib/tokenHealthCheck.ts` පසුබිම් කාලසටහන්කරුවක් ධාවනය කරයි:

- **පිරික්සුම් ක්රියා වාරය**: සෑම තත්පර 60කට වරක් (`src/lib/tokenHealthCheck.ts:30` හි `TICK_MS = 60 * 1000` ලෙස පිරික්සයි)
- **එක් සම්බන්ධතාවකට සෞඛ්ය පරීක්ෂා කාලාන්තරය**: පෙරනිමියෙන් මිනිත්තු 60කි (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); සැකසුම් DB හරහා වින්යාස කළ හැක
- **401 මත පූර්ව-ක්රියාකාරී නැවුම් කිරීම**: එක් එක් සම්බන්ධතාවේ interceptor මඟින් හසුරුවයි

### ටෝකන සෞඛ්ය තත්ත්වය

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

### වින්යාසය

ටෝකන සෞඛ්ය පරීක්ෂා වින්යාසය `tokenHealthCheck.ts` මඟින් අභ්යන්තරව හසුරුවයි.

### ටෝකන සෞඛ්යය

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** ටෝකන සෞඛ්ය දත්ත උපකරණ පුවරුව හෝ MCP මෙවලම වන `observability_snapshot` හරහා ලබාගත හැක.

---

## අනතුරු ඇඟවීම්

### අන්තර්ගත නාලිකා

OmniRoute **අනතුරු ඇඟවීම් නාලිකා 3කට** සහාය දක්වයි:

| නාලිකාව           | පිහිටුවීම            | භාවිත අවස්ථාව             |
| ----------------- | -------------------- | ------------------------- |
| උපකරණ පුවරු බැනරය | සැමවිටම සක්රියයි     | යෙදුම තුළ දැනුම්දීම්      |
| Webhook           | URL එක වින්යාස කරන්න | Slack, Discord, PagerDuty |
| ලොගය              | පෙරනිමිය             | බාහිර ලොග් සමුච්චය සඳහා   |

### Webhook වින්යාසය

> **සටහන:** Webhook අනතුරු ඇඟවීම් වින්යාසය උපකරණ පුවරුවේ Settings පිටුව හරහා හසුරුවයි. Webhook URL, සිදුවීම් පෙරීම සහ payload අභිරුචිකරණය සඳහා Settings UI බලන්න.

### අනතුරු ඇඟවීම් වර්ග

| අනතුරු ඇඟවීම                 | ඇති වන අවස්ථාව                                                | පෙරනිමි බරපතළතාව |
| ---------------------------- | ------------------------------------------------------------- | ---------------- |
| `provider_circuit_open`      | පරිපථය විවෘත වන විට                                           | තීරණාත්මක        |
| `provider_circuit_half_open` | පරිපථයේ ප්රතිසාධනය පරීක්ෂා කරන විට                            | තොරතුරු          |
| `quota_warning`              | කෝටාව 80% හෝ ඊට වැඩි විට                                      | අනතුරු ඇඟවීම     |
| `quota_exhausted`            | කෝටාව 100% වන විට                                             | තීරණාත්මක        |
| `token_refresh_failed`       | අඛණ්ඩ නැවුම් කිරීමේ අසාර්ථකවීම් 3ක් හෝ වැඩි විට               | අනතුරු ඇඟවීම     |
| `token_expired`              | ටෝකනයේ කල් ඉකුත් වීමේ කාලය පසු වූ විට                         | තීරණාත්මක        |
| `combo_target_unhealthy`     | Combo ඉලක්කය පැය 1ක් හෝ වැඩි කාලයක් cooldown තත්ත්වයේ ඇති විට | අනතුරු ඇඟවීම     |
| `db_integrity_warning`       | FK උල්ලංඝන ගණන 0ට වැඩි විට                                    | අනතුරු ඇඟවීම     |
| `heap_pressure`              | Heap භාවිතය සීමාවේ 80% ඉක්මවන විට                             | අනතුරු ඇඟවීම     |

---

## කාර්යසාධන ප්රමිතික

### නිරීක්ෂණය කරන ප්රමිතික

| ප්රමිතිකය               | වර්ගය        | මූලාශ්රය                        |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | ගණකය         | `services/usage.ts`             |
| `request_latency_ms`    | හිස්ටෝග්රෑමය | `services/usage.ts`             |
| `tokens_consumed`       | ගණකය         | `services/usage.ts`             |
| `cost_usd`              | ගණකය         | `services/usage.ts`             |
| `provider_errors`       | ගණකය         | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ගණකය         | `services/resilience.ts`        |
| `cache_hits`            | ගණකය         | `services/signatureCache.ts`    |
| `compression_savings`   | හිස්ටෝග්රෑමය | `services/compression/stats.ts` |
| `quota_used`            | මාපකය        | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | මාපකය        | `observability.ts`              |

### ප්රමාද ප්රතිශතක (p50/p95/p99)

> **REST අන්ත ලක්ෂ්යයක් නොමැත.** ප්රමාද ප්රතිශතක දත්ත උපකරණ පුවරුවේ `/dashboard/health` පිටුව හරහා ලබාගත හැක. Prometheus/OpenTelemetry නිර්යාත කිරීම v3.9 සඳහා සැලසුම් කර ඇත.

### Prometheus / OpenTelemetry නිර්යාත කිරීම (අදියර 2)

v3.9 සඳහා සැලසුම් කර ඇත: Prometheus, OpenTelemetry සහ Datadog වෙත ස්වදේශීය නිර්යාත කිරීම.

දැනට, ඕනෑම HTTP-පාදක නිරීක්ෂණ පද්ධතියක් (Prometheus blackbox exporter, Datadog HTTP check, ආදිය) සමඟ `/api/monitoring/health` වෙතින් දත්ත රැස් කරන්න.

---

## ඇඟවීම් සැකසීමේ ක්රම

### Slack

> **සටහන:** Webhook ඇඟවීම් උපකරණ පුවරුවේ Settings පිටුව හරහා වින්යාස කරයි — ඒ සඳහා කැපවූ webhook පරිසර විචල්ය නොමැත (`grep -rn` ප්රතිඵල ශුන්යයක් ලබා දෙයි). Webhook URL, සිදුවීම් පෙරීම සහ payload අභිරුචිකරණය සඳහා Settings UI බලන්න.

### Discord

> Webhook ඇඟවීම් Slack සඳහා භාවිත කරන Settings UI ප්රවාහයම භාවිත කරයි. Discord එකම JSON payload ව්යුහය පිළිගනී.

### PagerDuty

> Webhook ඇඟවීම් එකම Settings UI ප්රවාහය භාවිත කරයි. PagerDuty Events API v2 මාර්ගගත කිරීමේ යතුරු Settings UI තුළ වින්යාස කරයි.

### අභිරුචි Webhook (JSON)

> JSON body එකක් සහිත POST පිළිගන්නා ඕනෑම HTTP අන්ත ලක්ෂ්යයක් ක්රියා කරයි. Settings UI තුළ URL එක වින්යාස කරන්න.

---

## උපකරණ පුවරු වින්යාසය

### සෞඛ්ය උපකරණ පුවරුව අභිරුචිකරණය කිරීම

`~/.omniroute/dashboard.json` එකක් සාදන්න:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### සැපයුම්කරුවෙකු ඉහළින් සවිකිරීම

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## දෝෂ නිරාකරණය

### "සැපයුම්කරු සෞඛ්ය සම්පන්න බව පවසන නමුත් ඉල්ලීම් අසාර්ථක වේ"

1. **autopilot ගැටලු** පරීක්ෂා කරන්න — ඇතැම්විට ආකෘතියක් අගුළු දමා තිබිය හැක
2. නිශ්චිත දෝෂ පන්තිය සඳහා **මෑත දෝෂ** බලන්න
3. සැපයුම්කරුගේ කාඩ්පතේ ඇති **සම්බන්ධතා පරීක්ෂණය** උත්සාහ කරන්න
4. සැපයුම්කරුට **ඉහළ මූලාශ්රයේදී අනුපාත සීමාවක් පනවා තිබේද** යන්න පරීක්ෂා කරන්න (දේශීයව නොපෙනේ)

### "කෝටාව සෞඛ්ය සම්පන්න බව පවසන නමුත් මට 429 දෝෂ පෙනේ"

- 429 යනු ඔබ ඔබේ කෝටාව භාවිත කර අවසන් බව සැපයුම්කරු පවසන බවයි
- OmniRoute හි කෝටා නිරීක්ෂණය **යල් පැන තිබිය** හැක — සැපයුම්කරුගේ සත්ය තත්ත්වය ඉහළ මූලාශ්රයේ පවතී
- අභ්යන්තර කෝටා නිරීක්ෂකය හරහා කෝටා දත්ත ස්වයංක්රීයව නැවුම් වේ

### "සියලු ඉලක්ක සෞඛ්ය සම්පන්න ලෙස පෙනුණත් Combo එක අසාර්ථක වේ"

- ඉලක්ක අනුපිළිවෙළේ ගැටලු සඳහා **Combo සෞඛ්ය** උපකරණ පුවරුව පරීක්ෂා කරන්න
- **Fallback සිදුවීම්** බලන්න — ඇතැම්විට Combo එක ඉතා ඉක්මනින් සියලු විකල්ප අවසන් කරයි
- **උපායමාර්ගය** ඔබේ භාවිත අවස්ථාවට ගැළපෙන බව තහවුරු කරන්න (ප්රමුඛතාව එදිරිව round-robin එදිරිව auto)

### "දත්ත සමුදා සෞඛ්ය පරීක්ෂාව අසාර්ථක වේ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ධාවනය කරන්න
- "ok" නම් — එය සාවද්ය අනතුරු ඇඟවීමකි; සෞඛ්ය පරීක්ෂාව අතිශයින් දැඩි ලෙස ක්රියා කරයි
- වෙනත් යමක් ලැබේ නම් — **OmniRoute නවතා** [ආපදා ප්රතිසාධන මාර්ගෝපදේශය](./DATABASE_GUIDE.md#disaster-recovery) අනුගමනය කරන්න

### "මතක heap පීඩනය තීරණාත්මක මට්ටමක පවතී"

```bash
# වත්මන් heap එක පරීක්ෂා කරන්න
node -e "console.log(process.memoryUsage())"

# අතින් GC ක්රියාත්මක කරන්න (--expose-gc නම්)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# සමගාමී ඉල්ලීම් අඩු කරන්න (පරිසර විචල්යයකින් නොව, උපකරණ පුවරුවේ Settings පිටුව හරහා සකසන්න)
# `MAX_CONCURRENT_REQUESTS` පරිසර විචල්යයක් නොමැත — Settings → Concurrency තුළ එය වින්යාස කරන්න.
```

---

## තවද බලන්න

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — භාවිතය සහ පිරිවැය නිරීක්ෂණය
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB යෝජනා ක්රමය + සෞඛ්ය තත්ත්වය
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ප්රොක්සි සෞඛ්ය තත්ත්වය (වෙනම හැඹිලිය)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — පද්ධති ගෘහනිර්මාණය
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — පරිපථ බිඳිනය පිළිබඳ විස්තර
- මූලාශ්රය: `src/lib/monitoring/` (ගොනු 4ක්, LOC 2121ක්)
