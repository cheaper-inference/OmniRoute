# Monitoring & Observability Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **សរុបខ្លីៗ**: OmniRoute ភ្ជាប់មកជាមួយការត្រួតពិនិត្យសុខភាពដែលមានស្រាប់, provider autopilot, ការតាមដានកូតា និង observability hooks។ មគ្គុទ្ទេសក៍នេះគ្របដណ្តប់លើ dashboard, ការជូនដំណឹង និងការដោះស្រាយបញ្ហា។

**ប្រភព៖**

- `src/lib/monitoring/observability.ts` — snapshot នៃ observability
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot សុខភាពរបស់ combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot របស់ provider
- `src/lib/monitoring/providerHealthMatrix.ts` — ម៉ាទ្រីសសុខភាពរបស់ provider
- `src/lib/localHealthCheck.ts` — ការត្រួតពិនិត្យសុខភាពក្នុងមូលដ្ឋាន
- `src/lib/tokenHealthCheck.ts` — សុខភាពនៃការធ្វើឱ្យ token ស្រស់ឡើងវិញ
- `src/lib/proxyHealth.ts` — cache សុខភាពរបស់ proxy (បានរៀបរាប់ក្នុង PROXY_GUIDE.md)

---

## ទិដ្ឋភាពទូទៅ

OmniRoute មាន **ការត្រួតពិនិត្យ 3 ស្រទាប់**៖

```
┌──────────────────────────────────────────────────────────────┐
│  ស្រទាប់ទី 1៖ សុខភាពប្រព័ន្ធ (កម្រិត server)                    │
│  ├─ localHealthCheck.ts — DB, ports, native deps              │
│  ├─ db/healthCheck.ts — integrity, FK, orphaned artifacts     │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  ស្រទាប់ទី 2៖ សុខភាព Provider (ភាពធន់តាម provider នីមួយៗ)       │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — ពិន្ទុសុខភាពតាម provider/model    │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  ស្រទាប់ទី 3៖ Observability ផ្ទាល់ (runtime snapshots)          │
│  ├─ observability.ts — circuit breakers, sessions, quota       │
│  ├─ tokenHealthCheck.ts — សុខភាពនៃការធ្វើឱ្យ OAuth token ស្រស់ឡើងវិញ │
│  └─ ឧបករណ៍ MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ទំព័រ Dashboard

### `/dashboard/health` (សុខភាពប្រព័ន្ធ)

Dashboard សុខភាពកម្រិតកំពូលបង្ហាញ៖

| ផ្នែក                      | អ្វីដែលវាបង្ហាញ                                        |
| -------------------------- | ------------------------------------------------------ |
| **ស្ថានភាព Server**        | រយៈពេលដំណើរការ, version, port, ការតភ្ជាប់សកម្ម         |
| **Database**               | ការតភ្ជាប់, integrity, ទំហំ WAL, migrations ថ្មីៗ      |
| **សេចក្តីសង្ខេប Provider** | ចំនួនសកម្ម, ចំនួនដែលមានសុខភាពល្អ, ចំនួន breaker ដែលបើក |
| **ឧបករណ៍ត្រួតពិនិត្យកូតា** | sessions សកម្ម, ការជូនដំណឹង, កូតាដែលបានប្រើអស់         |
| **កំហុសថ្មីៗ**             | កំហុស 10 ចុងក្រោយជាមួយ stack traces                    |
| **ការប្រើប្រាស់ធនធាន**     | Memory, CPU, សូចនាករសម្ពាធ heap                        |

### `/dashboard/providers` (សុខភាព Provider)

Dashboard សម្រាប់ provider នីមួយៗ៖

| ជួរឈរ      | សេចក្តីពិពណ៌នា                                 |
| ---------- | ---------------------------------------------- |
| Provider   | Provider ID + ឈ្មោះបង្ហាញ                      |
| សុខភាព     | ស្ថានភាពពណ៌បៃតង/លឿង/ក្រហម                      |
| Circuit    | ស្ថានភាពបើក/បិទ/បើកពាក់កណ្តាល                  |
| ការតភ្ជាប់ | ចំនួនការតភ្ជាប់, ការធ្វើឱ្យស្រស់ចុងក្រោយ       |
| Models     | models ដែលអាចប្រើបាន, សុខភាពតាម model          |
| ថ្លៃចំណាយ  | ថ្លៃចំណាយថ្ងៃនេះ, និន្នាការ 7 ថ្ងៃ             |
| កំហុស      | ចំនួនកំហុសក្នុង 24h ចុងក្រោយ, ប្រភេទកំហុសចម្បង |

ចុចលើ provider ដើម្បីមើល៖

- សំណើថ្មីៗជាមួយការបែងចែក latency
- ពិន្ទុសុខភាពតាមការតភ្ជាប់នីមួយៗ
- ការចាក់សោតាម model នីមួយៗ
- អនុសាសន៍ពី Autopilot

### `/dashboard/quota` (ការតាមដានកូតា)

សម្រាប់ API key នីមួយៗ៖

- ការប្រើប្រាស់បច្ចុប្បន្នធៀបនឹងដែនកំណត់ (របារវឌ្ឍនភាព)
- និន្នាការកូតា (គំនូសតាង 30 ថ្ងៃ)
- ពេលវេលាកំណត់ឡើងវិញបន្ទាប់
- ប្រវត្តិការជូនដំណឹង

### `/dashboard/combos` (សុខភាព Combo)

សម្រាប់ combo នីមួយៗ៖

- យុទ្ធសាស្ត្រ + គោលដៅ
- សុខភាពតាមគោលដៅនីមួយៗ
- ព្រឹត្តិការណ៍ fallback ថ្មីៗ
- អត្រាជោគជ័យ (24h, 7d, 30d)

---

## API សុខភាព

OmniRoute លាតត្រដាង** ពីរ** HTTP ផ្ទៃសុខភាព។ ពួកគេមិនអាចផ្លាស់ប្តូរបានសម្រាប់អ្នកវង់ភ្លេង។

| ផ្លូវ                        | គោលបំណង                                                                    | ទម្ងន់                                        | ប្រើសម្រាប់                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET /healthz`               | វដ្តជីវិត liveness/readiness (`ok` / `starting` / `stopping`)              | រឿងតូចតាច (ទង់ដំណាក់កាលតែប៉ុណ្ណោះ)            | Kubernetes** ការត្រៀមខ្លួន** ; ទន់** ភាពរស់រវើក** ប្រសិនបើអ្នកត្រូវប្រើ HTTP                        |
| `GET /api/monitoring/health` | សេចក្តីសង្ខេបនៃអ្នកផ្តល់សេវា + ប្រព័ន្ធជ្រៅ (DB, heap , ចំនួនកាតាឡុក ... ) | ធ្ងន់ (ធ្វើសមកាលកម្ម DB / ការងារត្រួតពិនិត្យ) | ផ្ទាំងគ្រប់គ្រង ការត្រួតពិនិត្យស៊ីជម្រៅ ប្រអប់ខ្មៅ ការត្រួតពិនិត្យសុខភាពដែលភ្ជាប់មកជាមួយរបស់ Docker |

> **ចំណាំ៖** ម៉ាទ្រីសសុខភាពអ្នកផ្តល់សេវា បញ្ហា autopilot ការត្រួតពិនិត្យកូតា សុខភាពសញ្ញាសម្ងាត់ និងព័ត៌មានលម្អិត latency លើសពី `/api/monitoring/health` គឺអាចរកបានតាមរយៈ** ឧបករណ៍MCP** `observability_snapshot` ឬ** ផ្ទាំងគ្រប់គ្រង** ទំព័រ — មិនមានផ្លូវ REST ជាក់លាក់សម្រាប់អ្នកទាំងនោះទេ។

ផ្លូវទាំងពីរនេះរត់លើផ្លូវ** រង្វិលជុំព្រឹត្តិការណ៍ Node ដូចគ្នា។** តាមការស្នើសុំដោះស្រាយ។ ផ្លូវភ្ជាប់ស៊ីភីយូ (ការងារកាតាឡុក `GET /v1/models` ធំ ការបង្ហាប់បរិបទវែង / ការរាប់សញ្ញាសម្ងាត់) អាចពន្យារពេល** ទាំងអស់។** អ្នកដោះស្រាយ HTTP រួមទាំង `/healthz`។ ដំណើរការ ≠ រវល់ព្រឹត្តិការណ៍-រង្វិលជុំស្លាប់។ ចូលចិត្តជួសជុលជ្រូក; ការលៃតម្រូវការស៊ើបអង្កេតកាត់បន្ថយការសម្លាប់មិនពិតតែប៉ុណ្ណោះ។

### ការស៊ើបអង្កេតអ្នកប្រគុំតន្ត្រីស្រាល

```bash
GET /healthz
# or HEAD /healthz
```

- **២០០** + body `ok` នៅពេលដែលដំណាក់កាលវដ្តជីវិតរបស់ម៉ាស៊ីនមេរួចរាល់
- **៥០៣** + `starting` / `stopping` កំឡុងពេលចាប់ផ្ដើមឬបិទ
- ការអនុវត្ត៖ `src/app/healthz/route.ts` (គ្មាន DB ping)

### សុខភាពប្រព័ន្ធ (ជ្រៅ)

```bash
GET /api/monitoring/health
```

ការឆ្លើយតប៖

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

#### `credentialHealth`: probe-cache ទល់នឹង SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` គឺជា** រង្វាស់ឃ្លាំងសម្ងាត់ក្នុងអង្គចងចាំ** មិនមែនជាការចាក់សំរាមផ្ទាល់របស់ `provider_connections.test_status` ទេ។ បន្ទាប់ពី #12532 ផ្លូវស្នើសុំអានតែ `getCachedCredentialHealthSummary()` ; ការស៊ើបអង្កេតផ្ទៃខាងក្រោយធ្វើឱ្យឃ្លាំងសម្ងាត់ឡើងវិញចេញពីរង្វិលជុំព្រឹត្តិការណ៍។

| ស្រទាប់                         | កន្លែងណា                                                              | តើវាមានន័យយ៉ាងណា                                                                                                                                                                                                                   |
| ------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| រង្វាស់ឃ្លាំងសម្ងាត់            | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | លទ្ធផលការស៊ើបអង្កេតអំពីសុខភាពអត្តសញ្ញាណចុងក្រោយនៅតែរក្សាទុកក្នុងការចងចាំដំណើរការ។ `source` គឺតែងតែ `probe-cache`។                                                                                                                  |
| ព័ត៌មានលម្អិតនៃការតភ្ជាប់បរាជ័យ | `credentialHealth.failedConnections`                                  | បច្ចុប្បន្ន** តែនៅពេលដែល `failed > 0`** . បញ្ជីដែលមានព្រំដែននៃជួរដេកឃ្លាំងសម្ងាត់ជាមួយ `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`) ។ `failedOmitted` ត្រូវបានកំណត់នៅពេលដែលបញ្ជីត្រូវបានបិទ។ |
| SQLite ស្ថានភាពស្អិត            | `credentialHealth.staleDbNonOkCount`                                  | ចំនួននៃ** សកម្ម** (`is_active=1`) ជួរដេកដែលបន្តដែល `test_status` គឺជាការស្គាល់មិនយល់ព្រម (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) ។                                                       |

ស្រទាប់ទាំងពីរអាចខ្វែងគំនិតគ្នាក្នុងគោលបំណង៖

- រង្វាស់ `failed=0` ខណៈពេលដែល `staleDbNonOkCount>0` — SQLite នៅតែមាន `test_status` ស្អិត (ឧទាហរណ៍ `expired` ឬ `credits_exhausted`) ដែលរូបថតឃ្លាំងសម្ងាត់ចុងក្រោយបំផុតមិនរាប់បញ្ចូល `status=error` ទេ។
- រង្វាស់ `failed>0` ខណៈពេលដែល SQLite មើលទៅមានសុខភាពល្អ — ការស៊ើបអង្កេតថ្មីៗនេះបានបរាជ័យ និងត្រូវបានទុកក្នុងឃ្លាំងសម្ងាត់។ ជួរ DB មិនត្រូវបានធ្វើបច្ចុប្បន្នភាព ឬត្រូវបានជម្រះពេលក្រោយ។

កុំដាស់តឿនតែលើ `provider_connections.test_status` ទេ ពេលលុបចំណុចបញ្ចប់នេះ។ ប្រើ `failed` + `failedConnections` សម្រាប់ការបរាជ័យការស៊ើបអង្កេតបន្តផ្ទាល់ និង `staleDbNonOkCount` នៅពេលដែលអ្នកត្រូវការចំនួនស្ថានភាពស្អិតជាប់។

### ការណែនាំអំពីការស៊ើបអង្កេត Kubernetes

OmniRoute គឺជាមួយ** ដំណើរការ Node តែមួយ** (រង្វិលជុំព្រឹត្តិការណ៍មួយ) ។ ភាគហ៊ុន Docker `HEALTHCHECK` កំណត់គោលដៅ `/healthz` ស្រាល។ `/api/monitoring/health` គឺ** ធ្ងន់ពេក** សម្រាប់ចន្លោះជីវិត kubelet ។

| ស៊ើបអង្កេត        | គោលដៅដែលបានណែនាំ                                                               | កំណត់ចំណាំ                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ការចាប់ផ្តើម**  | HTTP `GET /healthz` ជាមួយ `failureThreshold` វែង (ឬ `startPeriod` ធំ)          | ការធ្វើចំណាកស្រុក + SQLite ចាប់ផ្តើមត្រជាក់អាចលើសពីពីរបីវិនាទី                                                                                                                                                                                                                                                                                     |
| **ការត្រៀមខ្លួន** | HTTP `GET /healthz`                                                            | វដ្តជីវិត `ok` / `starting` / `stopping` (200 ទល់នឹង 503) ។ នៅតែលោតដដែល ប្រសិនបើរង្វិលជុំត្រូវបានបិទ CPU។ ក** 200 ក្នុងរយៈពេលច្រើនវិនាទីគឺមិនមានសុខភាពល្អទេ។** (#10303) — វាមានន័យថារង្វិលជុំព្រឹត្តិការណ៍ត្រូវបានអត់ឃ្លានមុនពេលអ្នកដោះស្រាយ 3 បៃដំណើរការ                                                                                          |
| **ភាពរស់រវើក**    | HTTP `GET /livez`,** ឬ TCP** នៅលើច្រកសេវាកម្មសំខាន់ (`PORT`, `20128` លំនាំដើម) | `/livez` គឺមានតែដំណើរការប៉ុណ្ណោះ (តែងតែ 200 ប្រសិនបើអ្នកគ្រប់គ្រងដំណើរការ) ។ វានៅតែចែករំលែក event loop — busy ≠ dead ហើយវាមិនបានរកឃើញ event-loop starvation (#10303) ដែលល្អជាង TCP នោះទេ។ ចូលចិត្ត**TCP** ប្រសិនបើការស៊ើបអង្កេត HTTP អស់ពេលនៅក្រោមបន្ទុក catalog/compression ; ធ្វើ** ទេ។** សម្លាប់ pod នៅលើតូបព្រឹត្តិការណ៍ខ្លីៗតាមមធ្យោបាយណាមួយ។ |
| **សុខភាពជ្រៅ**    | `GET /api/monitoring/health` ពីអ្នកត្រួតពិនិត្យខាងក្រៅ                         | មិនមែនសម្រាប់ kubelet `livenessProbe` / តឹង `readinessProbe`                                                                                                                                                                                                                                                                                       |

រូបរាងឧទាហរណ៍ (លៃតម្រូវកម្រិតទៅនឹងការចាប់ផ្តើមត្រជាក់ និងបន្ទុកបង្ហាប់របស់អ្នក)៖

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

**កុំ** ចំណុច kubelet** ភាពរស់រវើក** នៅ `/api/monitoring/health`។ ផ្លូវនោះដំណើរការ DB/monitoring ពិតប្រាកដ ហើយនឹង false-positive នៅក្រោមបន្ទុក។

ពាក់ព័ន្ធ៖ [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (ការស៊ើបអង្កេតខណៈពេលដែលរង្វិលជុំព្រឹត្តិការណ៍រវល់), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (តម្លៃកាតាឡុកជ្រូក), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (ការបង្ហាប់សញ្ញា-រាប់ hog) ។

### systemd watchdog (រង្វិលជុំព្រឹត្តិការណ៍ដែលបង្កក)

នៅលើម៉ាស៊ីនដែលមានប្រព័ន្ធ OmniRoute ប្រាប់អ្នកគ្រប់គ្រងសេវាកម្មនៅពេលដែលវារួចរាល់ ហើយបន្ត ping វា ដូច្នេះម៉ាស៊ីនមេដែលរង្វិលជុំព្រឹត្តិការណ៍ត្រូវបានជាប់គាំងត្រូវបានសម្លាប់ និងចាប់ផ្តើមឡើងវិញ ជំនួសឱ្យការនៅស្ងៀម។ pings មកពីរង្វិលជុំព្រឹត្តិការណ៍ផ្ទាល់ខ្លួនរបស់ម៉ាស៊ីនមេ៖ នៅពេលដែលវារារាំង ពួកវាឈប់ ហើយប្រព័ន្ធនឹងចាប់ផ្តើមសេវាកម្មឡើងវិញនៅពេលដែល `WatchdogSec` កន្លងផុតទៅដោយគ្មានវា។

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) សរសេរឯកតាអ្នកប្រើប្រាស់ជាមួយវារួចហើយ។ ឯកតាដែលអ្នកសរសេរដោយខ្លួនឯង (លំនាំដើម `Type=simple`) មិនមានអ្នកឃ្លាំមើលទេ ដូច្នេះសូមបន្ថែមបន្ទាត់ទាំងនេះទៅផ្នែក `[Service]` របស់វា៖

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

ឯកតាដែលបានបង្កើតកំណត់ `Restart=on-failure` ដូច្នេះបន្ថែមបន្ទាត់នោះផងដែរ — ដោយគ្មានវា អ្នកឃ្លាំមើលគ្រាន់តែសម្លាប់សេវាដែលជាប់គាំងជំនួសឱ្យការចាប់ផ្តើមវាឡើងវិញ។

- `Type=notify`: សេវាកម្មត្រូវបាន "ចាប់ផ្តើម" នៅពេលដែលម៉ាស៊ីនមេផ្ញើ `READY=1` មិនមែននៅពេលដែលដំណើរការសម។ `TimeoutStartSec` កំណត់ការចាប់ផ្តើមយឺត។
- `NotifyAccess=all`: pings ត្រូវបានផ្ញើដោយដំណើរការ server ដែលជាកូនរបស់អ្នកគ្រប់គ្រង `omniroute serve` ។
- `WatchdogSec`: pings ចេញរាល់ 60 វិនាទី ដូច្នេះប្រើ** 120 ឬច្រើនជាងនេះ។** . តម្លៃតូចជាងនឹងចាប់ផ្តើមម៉ាស៊ីនមេដែលមានសុខភាពល្អឡើងវិញ។
- រត់ `omniroute serve` នៅខាងមុខ។ `--daemon` ផ្ដាច់ម៉ាស៊ីនមេចេញពី cgroup របស់អង្គភាព ហើយការជូនដំណឹងការចាប់ដៃមិនដែលបញ្ចប់ទេ។

ពិនិត្យមើលថាវាសកម្មបន្ទាប់ពីការចាប់ផ្តើមឡើងវិញ៖

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` បង្ហាញការពន្យាពេលដែលបានកំណត់រចនាសម្ព័ន្ធ ហើយ `WatchdogTimestamp` ទៅមុខជារៀងរាល់នាទី។ ការចាប់ផ្តើមឡើងវិញដែលបណ្តាលមកពីអ្នកឃ្លាំមើលត្រូវបានកត់ត្រាជា `Result=watchdog`។ ដើម្បីបិទ pings ខណៈពេលដែលរក្សាឯកតាដូចដែលវាគឺ, កំណត់ `OMNIROUTE_DISABLE_SD_NOTIFY=1`; ដោយគ្មាន `NOTIFY_SOCKET` (ស្ថានីយ, Docker, Electron, Windows) គ្មានអ្វីត្រូវបានផ្ញើទេ។

អ្នកឃ្លាំមើលគ្រាន់តែពិនិត្យមើលថារង្វិលជុំព្រឹត្តិការណ៍នៅតែបន្តដំណើរការ។ ម៉ាស៊ីនមេដែលយឺត ប៉ុន្តែនៅតែមិនដំណើរការឡើងវិញ។

### ការងារផ្លូវសំណើជាជម្រើស (អង្គចងចាំ ជំនាញ ការធ្វើឱ្យស្រស់ថូខឹន)

ការទាញយកអង្គចងចាំ ការបញ្ចូលជំនាញ និងការធ្វើឱ្យស្រស់ថូខឹន OAuth ចែករំលែក** រង្វិលជុំព្រឹត្តិការណ៍ Node មេ** ជាមួយ `/healthz`។ ពួកវាជាមុខងារបិទបើកផ្ទាំងគ្រប់គ្រង (`memoryEnabled`, `skillsEnabled`) មិនមែនជាក្រុមបុគ្គលិកទេ។ សូមមើល [Environment — event-loop cost](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ។

### សុខភាពអ្នកផ្តល់សេវា

> **គ្មានចំណុចបញ្ចប់ REST ។** ទិន្នន័យសុខភាពរបស់អ្នកផ្តល់សេវាអាចរកបានតាមរយៈឧបករណ៍ MCP `observability_snapshot` ឬទំព័រ `/dashboard/providers` ផ្ទាំងគ្រប់គ្រង។

### ព័ត៌មានលម្អិតអំពីអ្នកផ្តល់សេវា

> **គ្មានចំណុចបញ្ចប់ REST ។** ព័ត៌មានលម្អិតពីអ្នកផ្តល់សេវាគឺអាចរកបានតាមរយៈទំព័រ dashboard `/dashboard/providers` ។

---

## អូតូពីឡុតសុខភាពរបស់អ្នកផ្តល់សេវា

ម៉ូឌុល `providerHealthAutopilot.ts` គឺជា **ប្រព័ន្ធស្វ័យស្ដារឡើងវិញ** ដែល៖

1. រកឃើញបញ្ហារបស់អ្នកផ្តល់សេវា (សៀគ្វីបើក រយៈពេលរង់ចាំ ការចាក់សោ និងការព្រមានអំពីកូតា)
2. បង្កើត **សកម្មភាពដែលបានណែនាំ** ដើម្បីដោះស្រាយបញ្ហាទាំងនោះ
3. អាច **អនុវត្តដោយស្វ័យប្រវត្តិ** នូវសកម្មភាពដែលមានហានិភ័យទាប

### ប្រភេទបញ្ហាដែលបានរកឃើញ

| ប្រភេទបញ្ហា                  | កម្រិតធ្ងន់ធ្ងរ | លក្ខខណ្ឌឧទាហរណ៍                                             |
| ---------------------------- | --------------- | ----------------------------------------------------------- |
| `provider_circuit_open`      | ធ្ងន់ធ្ងរ       | សៀគ្វីកាត់ផ្ដាច់បើក បន្ទាប់ពីបរាជ័យ 5 ដង                    |
| `provider_circuit_half_open` | ព្រមាន          | សៀគ្វីកំពុងសាកល្បងការស្ដារឡើងវិញ                            |
| `connection_cooldown`        | ព្រមាន          | ការតភ្ជាប់ស្ថិតក្នុងរយៈពេលរង់ចាំ បន្ទាប់ពីទទួល 429          |
| `stale_connection_error`     | ព្រមាន          | ការធ្វើឱ្យស្រស់ចុងក្រោយបានបរាជ័យកាលពី 30 នាទីមុន ឬយូរជាងនេះ |
| `terminal_connection_error`  | ធ្ងន់ធ្ងរ       | OAuth ត្រូវបានដកហូត ឬកូនសោមិនត្រឹមត្រូវ                     |
| `inactive_connection`        | ព័ត៌មាន         | ការតភ្ជាប់ត្រូវបានបិទនៅក្នុងការកំណត់                        |
| `model_lockout`              | ព្រមាន          | ម៉ូដែលជាក់លាក់ស្ថិតក្នុងការដាក់ឱ្យនៅដាច់ដោយឡែក              |
| `quota_monitor_warning`      | ព្រមាន          | ការប្រើប្រាស់កូតាឈានដល់ 80% ឬច្រើនជាងនេះ                    |

### ប្រភេទសកម្មភាពដែលបានបង្កើត

| សកម្មភាព                       | ហានិភ័យ | ការពិពណ៌នា                                            |
| ------------------------------ | ------- | ----------------------------------------------------- |
| `clear_provider_breaker`       | មធ្យម   | កំណត់សៀគ្វីកាត់ផ្ដាច់ឡើងវិញទៅជាស្ថានភាពបិទ            |
| `clear_connection_cooldown`    | ទាប     | ដករយៈពេលរង់ចាំចេញពីការតភ្ជាប់                         |
| `clear_stale_connection_error` | ទាប     | សម្អាតសញ្ញាសម្គាល់កំហុសចាស់                           |
| `clear_model_lockout`          | ទាប     | បើកដំណើរការម៉ូដែលដែលត្រូវបានដាក់ឱ្យនៅដាច់ដោយឡែកឡើងវិញ |
| `reactivate_connection`        | មធ្យម   | បើកដំណើរការការតភ្ជាប់ដែលត្រូវបានបិទឡើងវិញ             |
| `deactivate_connection`        | ខ្ពស់   | បិទការតភ្ជាប់ដែលមានបញ្ហា                              |

### API

> **មិនមាន REST endpoint ទេ។** បញ្ហារបស់អូតូពីឡុតអាចរកបានតាមរយៈឧបករណ៍ MCP `observability_snapshot` ឬផ្ទាំងគ្រប់គ្រង។ អូតូពីឡុតដំណើរការនៅខាងក្នុង ហើយឥរិយាបថរបស់វាត្រូវបានកំណត់រចនាសម្ព័ន្ធតាមរយៈ DB ការកំណត់ (វាល `autopilotMode` សម្រាប់ការតភ្ជាប់នីមួយៗ) មិនមែនអថេរបរិស្ថានទេ — ការប្រើ `grep -rn` ដើម្បីស្វែងរកអថេរបរិស្ថានសម្រាប់មុខងារអូតូពីឡុតនឹងមិនឃើញលទ្ធផលទេ។

### របៀបអូតូពីឡុត

តាមលំនាំដើម អូតូពីឡុតដំណើរការក្នុង **របៀបដោយដៃ** — វារកឃើញបញ្ហា និងបង្កើតសកម្មភាពដែលបានណែនាំ ប៉ុន្តែមិនអនុវត្តសកម្មភាពទាំងនោះដោយស្វ័យប្រវត្តិទេ។ សកម្មភាពអាចត្រូវបានអនុវត្តតាមរយៈផ្ទាំងគ្រប់គ្រង។

---

## អូតូពីឡុតសុខភាព Combo

`comboHealthAutopilot.ts` គឺជាសមមូល **សម្រាប់ combo ជាក់លាក់** នៃអូតូពីឡុតរបស់អ្នកផ្តល់សេវា។ វា៖

- រកឃើញ combo ដែលមិនមានសុខភាពល្អ
- ណែនាំឱ្យរៀបចំលំដាប់គោលដៅឡើងវិញ
- ស្នើឱ្យបិទគោលដៅដែលខូច
- ដកគោលដៅដែលលែងដំណើរការចេញដោយស្វ័យប្រវត្តិ បន្ទាប់ពីបរាជ័យ N ដង

### ឧទាហរណ៍បញ្ហារបស់ Combo

```
Combo "always-on" (យុទ្ធសាស្ត្រអាទិភាព)
├─ គោលដៅ 1: openai/gpt-5 (មានសុខភាពល្អ)
├─ គោលដៅ 2: anthropic/claude-opus-4-6 (⚠️ ម៉ូដែលត្រូវបានចាក់សោរហូតដល់ម៉ោង 14:00)
└─ គោលដៅ 3: kiro/claude-sonnet-4-5 (មានសុខភាពល្អ)

សកម្មភាពដែលបានណែនាំ៖ រៀបចំលំដាប់ឡើងវិញ — ផ្លាស់ទី kiro ឱ្យនៅលើ anthropic រហូតដល់ការចាក់សោផុតកំណត់
```

---

## កម្មវិធីត្រួតពិនិត្យកូតា

`observability.ts` បង្ហាញ **កម្មវិធីត្រួតពិនិត្យកូតាតាមសម័យនីមួយៗ** សម្រាប់អ្នកផ្តល់សេវាដែលផ្អែកលើការជាវ (Claude Code, Codex, GitHub Copilot)៖

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

### អត្ថន័យនៃស្ថានភាព

| ស្ថានភាព    | ពេល                           | សកម្មភាព UI                                |
| ----------- | ----------------------------- | ------------------------------------------ |
| `starting`  | ការស្ទង់មតិដំបូងកំពុងដំណើរការ | សញ្ញាវិលកំពុងដំណើរការ                      |
| `idle`      | គ្មានសកម្មភាពថ្មីៗ            | លាក់ពីផ្ទាំងគ្រប់គ្រង                      |
| `healthy`   | កូតានៅសល់ > 50%               | ចំណុចពណ៌បៃតង                               |
| `warning`   | កូតានៅសល់ < 50%               | ការជូនដំណឹងពណ៌លឿង                          |
| `exhausted` | កូតា = 0%                     | ប្លុកពណ៌ក្រហម បញ្ជូនទៅអ្នកផ្តល់សេវាបន្ទាប់ |
| `error`     | ការស្ទង់មតិបានបរាជ័យ          | ចំណុចពណ៌ក្រហម ព្យាយាមម្ដងទៀតក្នុងពេលឆាប់ៗ  |

### API

> **មិនមាន REST endpoint ទេ។** ទិន្នន័យកម្មវិធីត្រួតពិនិត្យកូតាអាចរកបានតាមរយៈឧបករណ៍ MCP `observability_snapshot` ឬផ្ទាំងគ្រប់គ្រង។

---

## រូបថតសង្ខេបនៃការសង្កេតប្រព័ន្ធ

ឧបករណ៍ MCP `observability_snapshot` ត្រឡប់ **រូបថតសង្ខេបពេញលេញនៃប្រព័ន្ធ** សម្រាប់ភ្នាក់ងារ AI៖

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
  "quotaMonitors": {/* សូមមើលខាងលើ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ភ្នាក់ងារប្រើព័ត៌មាននេះដើម្បីធ្វើ **ការសម្រេចចិត្តកំណត់ផ្លូវ** — ឧទាហរណ៍ "ប្រសិនបើសៀគ្វីរបស់ openai បើក សូមកំណត់ផ្លូវទៅ anthropic ជាមុនសិន"។

---

## ការត្រួតពិនិត្យស្ថានភាពថូខឹន

អ្នកផ្តល់សេវា OAuth (Claude Code, GitHub Copilot, Cursor) ត្រូវការ **ការធ្វើឱ្យថូខឹនស្រស់ឡើងវិញតាមកាលកំណត់**។ `src/lib/tokenHealthCheck.ts` ដំណើរការកម្មវិធីកំណត់ពេលនៅផ្ទៃខាងក្រោយ៖

- **វដ្តពិនិត្យ**៖ រៀងរាល់ 60 វិនាទី (វដ្តពិនិត្យក្នុង `TICK_MS = 60 * 1000` នៅ `src/lib/tokenHealthCheck.ts:30`)
- **ចន្លោះពេលត្រួតពិនិត្យស្ថានភាពសម្រាប់ការតភ្ជាប់នីមួយៗ**៖ លំនាំដើម 60 នាទី (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); អាចកំណត់រចនាសម្ព័ន្ធបានតាមរយៈមូលដ្ឋានទិន្នន័យការកំណត់
- **ការធ្វើឱ្យស្រស់ជាមុនពេលមាន 401**៖ គ្រប់គ្រងដោយ interceptor សម្រាប់ការតភ្ជាប់នីមួយៗ

### ស្ថានភាពថូខឹន

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

### ការកំណត់រចនាសម្ព័ន្ធ

ការកំណត់រចនាសម្ព័ន្ធនៃការត្រួតពិនិត្យស្ថានភាពថូខឹនត្រូវបានគ្រប់គ្រងនៅខាងក្នុងដោយ `tokenHealthCheck.ts`។

### ស្ថានភាពថូខឹន

> **គ្មាន REST endpoint ទេ។** ទិន្នន័យស្ថានភាពថូខឹនអាចរកបានតាមរយៈផ្ទាំងគ្រប់គ្រង ឬឧបករណ៍ MCP `observability_snapshot`។

---

## ការជូនដំណឹង

### បណ្ដាញជូនដំណឹងដែលមានស្រាប់

OmniRoute គាំទ្រ **បណ្ដាញជូនដំណឹង 3**៖

| បណ្ដាញ             | ការរៀបចំ              | ករណីប្រើប្រាស់                        |
| ------------------ | --------------------- | ------------------------------------- |
| បដាផ្ទាំងគ្រប់គ្រង | បើកជានិច្ច            | ការជូនដំណឹងក្នុងកម្មវិធី              |
| Webhook            | កំណត់រចនាសម្ព័ន្ធ URL | Slack, Discord, PagerDuty             |
| កំណត់ហេតុ          | លំនាំដើម              | សម្រាប់ការប្រមូលផ្តុំកំណត់ហេតុខាងក្រៅ |

### ការកំណត់រចនាសម្ព័ន្ធ Webhook

> **ចំណាំ៖** ការកំណត់រចនាសម្ព័ន្ធការជូនដំណឹង Webhook ត្រូវបានគ្រប់គ្រងតាមរយៈទំព័រ Settings នៃផ្ទាំងគ្រប់គ្រង។ សូមមើល UI របស់ Settings សម្រាប់ URL របស់ webhook ការត្រងព្រឹត្តិការណ៍ និងការកែសម្រួល payload។

### ប្រភេទការជូនដំណឹង

| ការជូនដំណឹង                  | ពេលកើតឡើង                                     | កម្រិតធ្ងន់ធ្ងរលំនាំដើម |
| ---------------------------- | --------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | សៀគ្វីបើក                                     | សំខាន់ខ្លាំង            |
| `provider_circuit_half_open` | សៀគ្វីកំពុងសាកល្បងការស្ដារឡើងវិញ              | ព័ត៌មាន                 |
| `quota_warning`              | កូតាឈានដល់ 80%+                               | ព្រមាន                  |
| `quota_exhausted`            | កូតាឈានដល់ 100%                               | សំខាន់ខ្លាំង            |
| `token_refresh_failed`       | ការធ្វើឱ្យស្រស់បរាជ័យជាប់ៗគ្នា 3+ ដង          | ព្រមាន                  |
| `token_expired`              | ថូខឹនហួសកាលបរិច្ឆេទផុតកំណត់                   | សំខាន់ខ្លាំង            |
| `combo_target_unhealthy`     | គោលដៅបន្សំស្ថិតក្នុងរយៈពេលផ្អាករយៈពេល 1 ម៉ោង+ | ព្រមាន                  |
| `db_integrity_warning`       | ការបំពាន FK > 0                               | ព្រមាន                  |
| `heap_pressure`              | ការប្រើប្រាស់ heap > 80% នៃកម្រិតកំណត់        | ព្រមាន                  |

---

## ម៉ែត្រវាស់ប្រសិទ្ធភាព

### ម៉ែត្រដែលត្រូវបានតាមដាន

| ម៉ែត្រ                  | ប្រភេទ       | ប្រភព                           |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | កម្មវិធីរាប់ | `services/usage.ts`             |
| `request_latency_ms`    | អ៊ីស្តូក្រាម | `services/usage.ts`             |
| `tokens_consumed`       | កម្មវិធីរាប់ | `services/usage.ts`             |
| `cost_usd`              | កម្មវិធីរាប់ | `services/usage.ts`             |
| `provider_errors`       | កម្មវិធីរាប់ | `services/errorClassifier.ts`   |
| `circuit_state_changes` | កម្មវិធីរាប់ | `services/resilience.ts`        |
| `cache_hits`            | កម្មវិធីរាប់ | `services/signatureCache.ts`    |
| `compression_savings`   | អ៊ីស្តូក្រាម | `services/compression/stats.ts` |
| `quota_used`            | រង្វាស់      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | រង្វាស់      | `observability.ts`              |

### ភាគរយទីនៃភាពយឺតយ៉ាវ (p50/p95/p99)

> **មិនមានចំណុចចុង REST ទេ។** ទិន្នន័យភាគរយទីនៃភាពយឺតយ៉ាវមាននៅតាមរយៈទំព័រផ្ទាំងគ្រប់គ្រង `/dashboard/health`។ ការនាំចេញ Prometheus/OpenTelemetry ត្រូវបានគ្រោងសម្រាប់ v3.9។

### ការនាំចេញ Prometheus / OpenTelemetry (ដំណាក់កាលទី 2)

បានគ្រោងសម្រាប់ v3.9៖ ការនាំចេញផ្ទាល់ទៅកាន់ Prometheus, OpenTelemetry, Datadog។

សម្រាប់ពេលនេះ ប្រមូលទិន្នន័យពី `/api/monitoring/health` ដោយប្រើប្រព័ន្ធត្រួតពិនិត្យដែលផ្អែកលើ HTTP ណាមួយ (Prometheus blackbox exporter, Datadog HTTP check ជាដើម)។

---

## រូបមន្តការជូនដំណឹង

### Slack

> **ចំណាំ៖** ការជូនដំណឹងតាម Webhook ត្រូវបានកំណត់រចនាសម្ព័ន្ធតាមរយៈទំព័រ Settings នៃផ្ទាំងគ្រប់គ្រង — មិនមានអថេរបរិស្ថានសម្រាប់ webhook ដាច់ដោយឡែកទេ (`grep -rn` ផ្តល់លទ្ធផលសូន្យ)។ សូមមើល UI របស់ Settings សម្រាប់ URL របស់ webhook ការច្រោះព្រឹត្តិការណ៍ និងការកែតម្រូវ payload។

### Discord

> ការជូនដំណឹងតាម Webhook ប្រើលំហូរ Settings UI ដូចគ្នានឹង Slack។ Discord ទទួលយកទម្រង់ JSON payload ដូចគ្នា។

### PagerDuty

> ការជូនដំណឹងតាម Webhook ប្រើលំហូរ Settings UI ដូចគ្នា។ routing keys របស់ PagerDuty Events API v2 ត្រូវបានកំណត់រចនាសម្ព័ន្ធនៅក្នុង Settings UI។

### Webhook ផ្ទាល់ខ្លួន (JSON)

> ចំណុចចុង HTTP ណាមួយដែលទទួលយក POST ជាមួយ body ជា JSON នឹងអាចដំណើរការបាន។ កំណត់រចនាសម្ព័ន្ធ URL នៅក្នុង Settings UI។

---

## ការកំណត់រចនាសម្ព័ន្ធផ្ទាំងគ្រប់គ្រង

### កែតម្រូវផ្ទាំងគ្រប់គ្រងសុខភាព

បង្កើត `~/.omniroute/dashboard.json`៖

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ខ្ទាស់អ្នកផ្តល់សេវាទៅខាងលើ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ការដោះស្រាយបញ្ហា

### "អ្នកផ្តល់សេវាបង្ហាញថាមានសុខភាពល្អ ប៉ុន្តែសំណើបរាជ័យ"

1. ពិនិត្យមើល **បញ្ហារបស់ autopilot** — ប្រហែលជាម៉ូដែលមួយត្រូវបានចាក់សោមិនឱ្យប្រើ
2. មើល **កំហុសថ្មីៗ** សម្រាប់ថ្នាក់កំហុសជាក់លាក់
3. សាកល្បង **ការធ្វើតេស្តការតភ្ជាប់** នៅក្នុងកាតរបស់អ្នកផ្តល់សេវា
4. ពិនិត្យថាតើអ្នកផ្តល់សេវាត្រូវបាន **កំណត់កម្រិតអត្រានៅប្រភពខាងលើ** ដែរឬទេ (មិនអាចមើលឃើញពីមូលដ្ឋានទេ)

### "កូតាបង្ហាញថាមានសុខភាពល្អ ប៉ុន្តែខ្ញុំឃើញ 429s"

- 429 មានន័យថា អ្នកផ្តល់សេវាបង្ហាញថាអ្នកបានប្រើកូតារបស់អ្នកអស់ហើយ
- ការតាមដានកូតារបស់ OmniRoute អាច **ហួសសម័យ** — ទិន្នន័យពិតរបស់អ្នកផ្តល់សេវាស្ថិតនៅប្រភពខាងលើ
- ទិន្នន័យកូតាត្រូវបានធ្វើឱ្យស្រស់ដោយស្វ័យប្រវត្តិតាមរយៈកម្មវិធីត្រួតពិនិត្យកូតាខាងក្នុង

### "Combo កំពុងបរាជ័យ ប៉ុន្តែគោលដៅទាំងអស់មើលទៅមានសុខភាពល្អ"

- ពិនិត្យផ្ទាំងគ្រប់គ្រង **សុខភាពរបស់ combo** សម្រាប់បញ្ហាលំដាប់គោលដៅ
- មើល **ព្រឹត្តិការណ៍ fallback** — ប្រហែលជា combo ប្រើជម្រើសទាំងអស់អស់លឿនពេក
- ផ្ទៀងផ្ទាត់ថា **យុទ្ធសាស្ត្រ** ត្រូវគ្នានឹងករណីប្រើប្រាស់របស់អ្នក (អាទិភាព ទល់នឹង round-robin ទល់នឹង ស្វ័យប្រវត្តិ)

### "ការត្រួតពិនិត្យសុខភាពមូលដ្ឋានទិន្នន័យកំពុងបរាជ័យ"

- ដំណើរការ `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- ប្រសិនបើ "ok" — ជាការប្រកាសអាសន្នខុស ការត្រួតពិនិត្យសុខភាពកំពុងតឹងរ៉ឹងពេក
- ប្រសិនបើជាអ្វីផ្សេង — **បញ្ឈប់ OmniRoute** ហើយអនុវត្តតាម [មគ្គុទ្ទេសក៍សង្គ្រោះពីគ្រោះមហន្តរាយ](./DATABASE_GUIDE.md#disaster-recovery)

### "សម្ពាធ heap របស់អង្គចងចាំស្ថិតក្នុងកម្រិតធ្ងន់ធ្ងរ"

```bash
# ពិនិត្យ heap បច្ចុប្បន្ន
node -e "console.log(process.memoryUsage())"

# កេះ GC ដោយដៃ (ប្រសិនបើ --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# កាត់បន្ថយសំណើព្រមគ្នា (កំណត់តាមរយៈទំព័រ Settings នៃផ្ទាំងគ្រប់គ្រង មិនមែនអថេរបរិស្ថានទេ)
# មិនមានអថេរបរិស្ថាន `MAX_CONCURRENT_REQUESTS` ទេ — កំណត់វានៅក្នុង Settings → Concurrency។
```

---

## សូមមើលផងដែរ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ការតាមដានការប្រើប្រាស់ និងថ្លៃចំណាយ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — គ្រោងការណ៍ DB + ស្ថានភាពដំណើរការ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ស្ថានភាពដំណើរការរបស់ proxy (cache ដាច់ដោយឡែក)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ស្ថាបត្យកម្មប្រព័ន្ធ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ព័ត៌មានលម្អិតអំពី circuit breaker
- ប្រភព៖ `src/lib/monitoring/` (4 ឯកសារ, 2121 បន្ទាត់កូដ)
