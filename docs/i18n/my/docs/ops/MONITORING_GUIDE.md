# Monitoring & Observability Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute တွင် အသင့်ပါ ကျန်းမာရေး စောင့်ကြည့်ခြင်း၊ provider autopilot၊ quota ခြေရာခံခြင်းနှင့် observability hooks များ ပါဝင်သည်။ ဤလမ်းညွှန်တွင် dashboard၊ သတိပေးချက်များနှင့် ပြဿနာဖြေရှင်းခြင်းတို့ကို ဖော်ပြထားသည်။

**အရင်းအမြစ်များ:**

- `src/lib/monitoring/observability.ts` — observability snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — combo health autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — provider autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — provider ကျန်းမာရေး matrix
- `src/lib/localHealthCheck.ts` — local health check
- `src/lib/tokenHealthCheck.ts` — token refresh ကျန်းမာရေး
- `src/lib/proxyHealth.ts` — proxy ကျန်းမာရေး cache (PROXY_GUIDE.md တွင် ဖော်ပြထားသည်)

---

## ခြုံငုံသုံးသပ်ချက်

OmniRoute တွင် **စောင့်ကြည့်ရေး အလွှာ 3 ခု** ရှိသည်-

```
┌──────────────────────────────────────────────────────────────┐
│  အလွှာ 1: စနစ်ကျန်းမာရေး (server အဆင့်)                        │
│  ├─ localHealthCheck.ts — DB၊ ports၊ native deps              │
│  ├─ db/healthCheck.ts — integrity၊ FK၊ ဆက်စပ်မှုမရှိသော artifacts │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  အလွှာ 2: Provider ကျန်းမာရေး (provider တစ်ခုချင်းစီ၏ ခံနိုင်ရည်) │
│  ├─ providerHealthAutopilot.ts — circuit breaker၊ cooldowns   │
│  ├─ providerHealthMatrix.ts — provider/model အလိုက် ကျန်းမာရေးရမှတ်များ │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  အလွှာ 3: တိုက်ရိုက် Observability (runtime snapshots)         │
│  ├─ observability.ts — circuit breakers၊ sessions၊ quota      │
│  ├─ tokenHealthCheck.ts — OAuth token refresh ကျန်းမာရေး      │
│  └─ MCP tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboard စာမျက်နှာများ

### `/dashboard/health` (စနစ်ကျန်းမာရေး)

ထိပ်တန်းအဆင့် ကျန်းမာရေး dashboard တွင် အောက်ပါတို့ကို ပြသသည်-

| ကဏ္ဍ                     | ပြသသည့်အရာများ                                                             |
| ------------------------ | -------------------------------------------------------------------------- |
| **Server အခြေအနေ**       | အလုပ်လုပ်နေသည့်ကြာချိန်၊ version၊ port၊ လက်ရှိချိတ်ဆက်မှုများ              |
| **Database**             | ချိတ်ဆက်မှု၊ integrity၊ WAL အရွယ်အစား၊ မကြာသေးမီ migrations                |
| **Provider အကျဉ်းချုပ်** | အသုံးပြုနေသည့်အရေအတွက်၊ ကျန်းမာသည့်အရေအတွက်၊ ဖွင့်ထားသည့် breaker အရေအတွက် |
| **Quota monitors**       | အသုံးပြုနေသည့် sessions၊ သတိပေးနေမှု၊ ကုန်ဆုံးသွားမှု                      |
| **မကြာသေးမီ အမှားများ**  | stack traces များနှင့်အတူ နောက်ဆုံးအမှား 10 ခု                             |
| **Resource အသုံးပြုမှု** | Memory၊ CPU၊ heap ဖိအားညွှန်ပြချက်                                         |

### `/dashboard/providers` (Provider ကျန်းမာရေး)

Provider တစ်ခုချင်းစီအလိုက် dashboard-

| ကော်လံ          | ဖော်ပြချက်                                                        |
| --------------- | ----------------------------------------------------------------- |
| Provider        | Provider ID + ပြသမည့်အမည်                                         |
| ကျန်းမာရေး      | အစိမ်း/အဝါ/အနီ အခြေအနေ                                            |
| Circuit         | ဖွင့်/ပိတ်/တစ်ဝက်ဖွင့် အခြေအနေ                                    |
| ချိတ်ဆက်မှုများ | ချိတ်ဆက်မှုအရေအတွက်၊ နောက်ဆုံး refresh                            |
| Models          | ရရှိနိုင်သည့် models၊ model တစ်ခုချင်းစီ၏ ကျန်းမာရေး              |
| ကုန်ကျစရိတ်     | ယနေ့ကုန်ကျစရိတ်၊ 7 ရက်စာ trend                                    |
| အမှားများ       | နောက်ဆုံး 24h အတွင်း အမှားအရေအတွက်၊ အများဆုံးဖြစ်သည့် error class |

Provider တစ်ခုကို နှိပ်၍ အောက်ပါတို့ကို ကြည့်ရှုနိုင်သည်-

- ကြာချိန်အသေးစိတ်ခွဲခြမ်းချက်နှင့်အတူ မကြာသေးမီ requests များ
- ချိတ်ဆက်မှုတစ်ခုချင်းစီ၏ ကျန်းမာရေးရမှတ်များ
- Model တစ်ခုချင်းစီ၏ lockouts
- Autopilot အကြံပြုချက်များ

### `/dashboard/quota` (Quota ခြေရာခံခြင်း)

API key တစ်ခုချင်းစီအတွက်-

- လက်ရှိအသုံးပြုမှုနှင့် ကန့်သတ်ချက် နှိုင်းယှဉ်မှု (progress bar)
- Quota လမ်းကြောင်း (30 ရက်စာ chart)
- နောက်တစ်ကြိမ် reset လုပ်မည့်အချိန်
- သတိပေးချက် မှတ်တမ်း

### `/dashboard/combos` (Combo ကျန်းမာရေး)

Combo တစ်ခုချင်းစီအတွက်-

- Strategy + targets
- Target တစ်ခုချင်းစီ၏ ကျန်းမာရေး
- မကြာသေးမီ fallback ဖြစ်ရပ်များ
- အောင်မြင်မှုနှုန်း (24h၊ 7d၊ 30d)

---

## ကျန်းမာရေးစစ်ဆေးပါ API

OmniRoute ဖော်ထုတ်သည်။** နှစ်ခု** HTTP ကျန်းမာရေး မျက်နှာပြင်များ။ ၎င်းတို့သည် သံစုံတီးဝိုင်းအတွက် လဲလှယ်၍မရပါ။

| မဂ်                          | ရည်ရွယ်ချက်                                                                           | အလေးချိန်                                                 | အသုံးပြုရန်                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET /healthz`               | ဘဝသံသရာ liveness/readiness (`ok` / `starting` / `stopping`)                           | အသေးအဖွဲ (အဆင့်အလံသာ)                                     | Kubernetes** စေတနာ** ; ပျော့ပျောင်း** အသက်ရှင်မှု** HTTP သုံးရမယ်ဆိုရင်တော့           |
| `GET /api/monitoring/health` | နက်ရှိုင်းသောစနစ် + ဝန်ဆောင်မှုပေးသူအနှစ်ချုပ် (DB၊ အမှိုက်ပုံ၊ ကတ်တလောက်အရေအတွက်၊ …) | ပြင်းထန်သော (တစ်ပြိုင်တည်း DB / စောင့်ကြည့်ခြင်းလုပ်ငန်း) | ဒက်ရှ်ဘုတ်များ၊ blackbox နက်နဲသောစစ်ဆေးမှုများ၊ Docker's built-in ကျန်းမာရေးစစ်ဆေးမှု |

> **မှတ်ချက် -** ပံ့ပိုးပေးသူ၏ ကျန်းမာရေး မက်ထရစ်များ၊ အလိုအလျောက် မောင်းနှင်မှု ပြဿနာများ၊ ခွဲတမ်း မော်နီတာများ၊ တိုကင် ကျန်းမာရေးနှင့် `/api/monitoring/health` ထက် ကျော်လွန်နေချိန် အသေးစိတ် အချက်အလက်များကို ရရှိနိုင်ပါသည်**MCP ကိရိယာ** `observability_snapshot` သို့မဟုတ် အဆိုပါ** ဒက်ရှ်ဘုတ်** — စာမျက်နှာများသည် ၎င်းတို့အတွက် သီးခြား REST လမ်းကြောင်းများ မရှိပါ။

လမ်းကြောင်း နှစ်ခုလုံးက ပြေးတယ်။** တူညီသော Node event loop** တောင်းဆိုချက်အတိုင်း CPU-bound လမ်းကြောင်း (ကြီးမားသော `GET /v1/models` ကက်တလောက်အလုပ်၊ ရှည်လျားသောအကြောင်းအရာချုံ့ခြင်း/တိုကင်ရေတွက်ခြင်း) နှောင့်နှေးနိုင်သည်** အားလုံး** `/healthz` အပါအဝင် HTTP ကိုင်တွယ်သူများ။ Event-loop busy ≠ လုပ်ငန်းစဉ်သေပြီ။ ဝက်သားကိုပြင်ရတာကို ပိုကြိုက်တယ်။ probe tuning သည် false kills များကိုသာ လျှော့ချပေးသည်။

### ပေါ့ပါးသော သံစုံတီးဝိုင်းအဖွဲ့

```bash
GET /healthz
# or HEAD /healthz
```

- **၂၀၀** server lifecycle အဆင့် အဆင်သင့်ဖြစ်သောအခါ + body `ok`
- **၅၀၃** boot သို့မဟုတ် shutdown လုပ်နေစဉ် + `starting` / `stopping`
- အကောင်အထည်ဖော်ခြင်း- `src/app/healthz/route.ts` ( DB ping မရှိ)

### စနစ်ကျန်းမာရေး (နက်ရှိုင်း)

```bash
GET /api/monitoring/health
```

တုံ့ပြန်မှု-

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

`GET /api/monitoring/health` → `credentialHealth` ဟူသည်** in-memory probe-cache gauge** `provider_connections.test_status`၏ တိုက်ရိုက် အမှိုက်ပုံ မဟုတ်ပါ။ #12532 ပြီးနောက် တောင်းဆိုချက်လမ်းကြောင်းသည် `getCachedCredentialHealthSummary()` သာဖတ်သည်။ နောက်ခံစုံစမ်းစစ်ဆေးမှုများသည် ဖြစ်ရပ်ကွင်းဆက်မှ ကက်ရှ်ကို ပြန်လည်စတင်ပါ။

| အလွှာ                             | ဘယ်မှာလဲ။                                                             | ဘာကို ဆိုလိုတာလဲ။                                                                                                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache gauge                 | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | နောက်ဆုံး အထောက်အထား- ကျန်းမာရေး စစ်ဆေးခြင်းရလဒ်များကို လုပ်ငန်းစဉ်မှတ်ဉာဏ်တွင် ထိန်းသိမ်းထားဆဲဖြစ်သည်။ `source` သည် အမြဲတမ်း `probe-cache` ဖြစ်သည်။                                                              |
| ချိတ်ဆက်မှုအသေးစိတ် မအောင်မြင်ပါ။ | `credentialHealth.failedConnections`                                  | ပစ္စုပ္ပန်** `failed > 0` အခါမှသာ** . `status=error` (`connectionId`၊ `status`၊ sanitized `lastError` / `lastErrorType`) ပါသော cache အတန်းများ၏စာရင်း။ စာရင်းကို ကန့်သတ်ထားသောအခါ `failedOmitted` ကို သတ်မှတ်သည်။ |
| SQLite ကပ်စေးနဲလှသည်။             | `credentialHealth.staleDbNonOkCount`                                  | အရေအတွက်** တက်ကြွသော** (`is_active=1`) ဆက်လက်တည်ရှိနေသော `test_status` သည် လူသိများသောမဟုတ်သော (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)။                                 |

အလွှာနှစ်ခုသည် ရည်ရွယ်ချက်အပေါ် သဘောထားကွဲလွဲနိုင်သည်-

- Gauge `failed=0` while `staleDbNonOkCount>0` — SQLite still has a sticky `test_status` (for example `expired` or `credits_exhausted`) that the latest probe-cache snapshot does not count as `status=error`.
- SQLite ကျန်းမာနေချိန်တွင် `failed>0` — မကြာသေးမီက စုံစမ်းစစ်ဆေးမှု မအောင်မြင်ဘဲ ကက်ရှ်လုပ်ထားသည် DB အတန်းကို မွမ်းမံမွမ်းမံထားခြင်း သို့မဟုတ် နောက်ပိုင်းတွင် ရှင်းလင်းခဲ့သည်။

ဤအဆုံးမှတ်ကို ခြစ်ထုတ်သည့်အခါ `provider_connections.test_status` တွင်သာ သတိပေးမနေပါနှင့်။ တိုက်ရိုက်စုံစမ်းစစ်ဆေးခြင်း မအောင်မြင်မှုအတွက် `failed` + `failedConnections` သုံးပါ၊ နှင့် ဆက်လက်ရှိနေသော ကပ်စေးကပ်သည့်အခြေအနေအရေအတွက်ကို လိုအပ်သည့်အခါ `staleDbNonOkCount` သုံးပါ။

### Kubernetes စုံစမ်းစစ်ဆေးရန် အကြံပြုချက်များ

OmniRoute သည် a** Node တစ်ခုတည်း လုပ်ငန်းစဉ်** (ဖြစ်ရပ်တစ်ခု ကွင်းဆက်)။ စတော့ Docker `HEALTHCHECK` သည် ပေါ့ပါးသော `/healthz` ကို ပစ်မှတ်ထားသည်။ `/api/monitoring/health` သည်** အရမ်းလေးတယ်။** kubelet အသက်ရှင်မှုကြားကာလအတွက်။

| ထိုးဆွ                      | အကြံပြုထားသော ပစ်မှတ်                                                                 | မှတ်စုများ                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **စတင်တည်ထောင်သည်**         | HTTP `GET /healthz` ရှည်လျားသော `failureThreshold` (သို့မဟုတ် `startPeriod` ကြီး)     | အအေးစတင် + SQLite ပြောင်းရွှေ့ခြင်းသည် စက္ကန့်အနည်းငယ်ကျော်လွန်နိုင်သည်။                                                                                                                                                                                                                                                                                                            |
| **စေတနာ**                   | HTTP `GET /healthz`                                                                   | ဘဝသံသရာ `ok` / `starting` / `stopping` (200 vs 503)။ loop သည် CPU-block ဖြစ်နေပါက ပျက်နေပါသည်။ တစ်** စက္ကန့် 200 များပြားခြင်းသည် မကျန်းမာပါ။** (#10303) — ဆိုလိုသည်မှာ 3-byte handler မပြေးမီ event loop ငတ်သွားသည်                                                                                                                                                                |
| **ရှင်သန်မှု**              | HTTP `GET /livez`၊** သို့မဟုတ် TCP** ပင်မဝန်ဆောင်မှုဆိပ်ကမ်း (`PORT`၊ မူရင်း `20128`) | `/livez` သည် process-alive သာဖြစ်သည် (ကိုင်တွယ်သူအလုပ်လုပ်ပါက အမြဲတမ်း 200)။ ၎င်းသည် event loop — busy ≠ dead ကိုမျှဝေဆဲဖြစ်ပြီး၊ ၎င်းသည် TCP ထက်ပိုမိုကောင်းမွန်သည့် event-loop starvation (#10303) ကိုမတွေ့ပါ။ ဦးစားပေး**TCP** HTTP probes သည် catalog/compression load အောက်တွင် အချိန်ကုန်သွားပါက၊ လုပ်ပါ။** မဟုတ်ဘူး** ဘယ်နည်းနဲ့မဆို ပွဲလမ်းအတိုလေးတွေမှာ pod ကို သတ်လိုက်ပါ။ |
| **နက်ရှိုင်းသောကျန်းမာရေး** | `GET /api/monitoring/health` ပြင်ပ checker မှ                                         | kubelet `livenessProbe` / tight `readinessProbe` အတွက်မဟုတ်ပါ။                                                                                                                                                                                                                                                                                                                      |

နမူနာပုံသဏ္ဍာန် (သင်၏အအေးစတင်ခြင်းနှင့် ဖိသိပ်မှုအား ကန့်သတ်ချက်များကို ချိန်ညှိပါ)။

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

**မလုပ်ပါနှင့်** kubelet အမှတ်** အသက်ရှင်မှု** `/api/monitoring/health` မှာ ထိုလမ်းကြောင်းသည် real DB/monitoring အလုပ်ဖြစ်ပြီး false-positive သည် load အောက်တွင် ရှိနေသည်။

ဆက်စပ်မှု- [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (ဖြစ်ရပ်ကွင်းဆက်အလုပ်များနေချိန်တွင် စုံစမ်းစစ်ဆေးမှုများ)၊ [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (ကတ်တလောက်စျေးနှုန်းချို့ယွင်းချက်)၊ [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (ချုံ့ထားသော တိုကင်-ရေတွက်ခြင်း hog)။

### စနစ်ဖြင့် စောင့်ကြည့်စစ်ဆေးခြင်း (အေးစက်နေသော ဖြစ်ရပ်ကွင်းဆက်)

systemd host တစ်ခုတွင်၊ OmniRoute အဆင်သင့်ဖြစ်သောအခါတွင် ဝန်ဆောင်မှုမန်နေဂျာအား ပြောပြပြီး ၎င်းကို pinging ပြုလုပ်ပေးသည်၊ ထို့ကြောင့် event loop ပိတ်နေသော server သည် တိတ်တိတ်နေမည့်အစား အသတ်ခံရပြီး ပြန်လည်စတင်ပါသည်။ pings များသည် server ၏ ကိုယ်ပိုင် event loop မှ လာပါသည်- ၎င်းသည် block လုပ်သောအခါ ၎င်းတို့သည် ရပ်သွားကာ `WatchdogSec` တစ်ခုမှ မရှိဘဲ ပြီးဆုံးသည်နှင့် systemd မှ ဝန်ဆောင်မှုကို ပြန်လည်စတင်ပါသည်။

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) ဤအရာဖြင့် အသုံးပြုသူယူနစ်ကို ရေးပြီးဖြစ်သည်။ သင်ကိုယ်တိုင်ရေးသောယူနစ်တစ်ခု (မူလ `Type=simple`) သည် စောင့်ကြည့်စစ်ဆေးမှုမရှိပါ၊ ထို့ကြောင့် ဤစာကြောင်းများကို ၎င်း၏ `[Service]` ကဏ္ဍတွင် ထည့်ပါ။

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

ထုတ်ပေးသောယူနစ်သည် `Restart=on-failure` သတ်မှတ်ပေးသည်၊ ထို့ကြောင့် ထိုစာကြောင်းကို — မပါဘဲ ပေါင်းထည့်ခြင်းသည် ၎င်းကိုပြန်လည်စတင်မည့်အစား ပိတ်နေသောဝန်ဆောင်မှုကိုသာသတ်ပစ်သည်။

- `Type=notify`: ဆာဗာမှ `READY=1` ပေးပို့သောအခါ ဝန်ဆောင်မှုသည် "စတင်သည်" ဖြစ်ပြီး၊ လုပ်ငန်းစဉ်သည် လမ်းခွဲလိုက်သောအခါတွင် မဟုတ်ပါ။ `TimeoutStartSec` သည် နှေးကွေးသော စတင်မှုကို ကန့်သတ်ထားသည်။
- `NotifyAccess=all`: `omniroute serve` ကြီးကြပ်ရေးမှူး၏ ကလေးဖြစ်သည့် ဆာဗာလုပ်ငန်းစဉ်မှ pings များကို ပေးပို့သည်။
- `WatchdogSec`: စက္ကန့် 60 တိုင်း pings ထွက်နေတာမို့ သုံးပါ။** 120 နှင့်အထက်** . သေးငယ်သောတန်ဖိုးများသည် ကျန်းမာသောဆာဗာကို ပြန်လည်စတင်မည်ဖြစ်သည်။
- အရှေ့ဘက်တွင် `omniroute serve` ဖွင့်ပါ။ `--daemon` ဆာဗာအား ယူနစ်၏ cgroup မှ ဖယ်ထုတ်ပြီး အသိပေးချက် လက်ဆွဲနှုတ်ဆက်ခြင်းသည် မည်သည့်အခါမျှ မပြီးမြောက်ပါ။

ပြန်လည်စတင်ပြီးနောက် ၎င်းသည် အသက်ဝင်ကြောင်း စစ်ဆေးပါ-

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` ပြင်ဆင်ထားသော နှောင့်နှေးမှုကို ပြသပြီး `WatchdogTimestamp` မိနစ်တိုင်း ရှေ့သို့ ရွေ့လျားနေသည်။ စောင့်ကြည့်ခွေးကြောင့် ပြန်လည်စတင်ခြင်းကို `Result=watchdog` အဖြစ် မှတ်တမ်းတင်ထားသည်။ ယူနစ်ကို ထိန်းသိမ်းထားစဉ် pings များကို ပိတ်ရန် `OMNIROUTE_DISABLE_SD_NOTIFY=1` သတ်မှတ်ပါ။ `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) မပါဘဲ ဘာမျှမပို့ပါ။

ပွဲကွင်းဆက်လည်ပတ်နေမှုကို စောင့်ကြည့်စစ်ဆေးသည် ။ နှေးသော်လည်း လှည့်နေဆဲဖြစ်သော ဆာဗာကို ပြန်လည်စတင်မထားပါ။

### ရွေးချယ်နိုင်သော တောင်းဆိုမှု-လမ်းကြောင်း အလုပ် (မှတ်ဉာဏ်၊ ကျွမ်းကျင်မှု၊ တိုကင် ပြန်လည်စတင်ခြင်း)

မှတ်ဉာဏ်ထုတ်ယူခြင်း၊ ကျွမ်းကျင်မှုထိုးသွင်းခြင်းနှင့် OAuth တိုကင်ပြန်လည်ဆန်းသစ်ခြင်းတို့ကို မျှဝေသည်။** ပင်မ Node ဖြစ်ရပ် ကွင်းဆက်** `/healthz` နှင့် ၎င်းတို့သည် ဒက်ရှ်ဘုတ်-ခလုတ်ဖွင့်ခြင်း အင်္ဂါရပ်များ (`memoryEnabled`, `skillsEnabled`) သည် အလုပ်သမားရေကန် မဟုတ်ပါ။ [Environment — event-loop cost ကို](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ကြည့်ပါ။

### ပံ့ပိုးသူ ကျန်းမာရေး

> **REST အဆုံးမှတ်မရှိပါ။** ဝန်ဆောင်မှုပေးသူ၏ ကျန်းမာရေးဒေတာကို MCP တူးလ် `observability_snapshot` သို့မဟုတ် ဒက်ရှ်ဘုတ် `/dashboard/providers` စာမျက်နှာမှတဆင့် ရရှိနိုင်ပါသည်။

### ပံ့ပိုးသူအသေးစိတ်

> **REST အဆုံးမှတ်မရှိပါ။** ဝန်ဆောင်မှုပေးသူ တစ်ဦးချင်းစီ၏ အသေးစိတ်ကို ဒက်ရှ်ဘုတ် `/dashboard/providers` စာမျက်နှာမှတဆင့် ရနိုင်ပါသည်။

---

## ပံ့ပိုးသူ ကျန်းမာရေး အလိုအလျောက်စီမံစနစ်

`providerHealthAutopilot.ts` မော်ဂျူးသည် အောက်ပါတို့ကို လုပ်ဆောင်သည့် **မိမိကိုယ်ကို ပြန်လည်ပြုပြင်နိုင်သော စနစ်** ဖြစ်သည်-

1. ပံ့ပိုးသူဆိုင်ရာ ပြဿနာများကို ရှာဖွေသတ်မှတ်သည် (ဆားကစ်ဖွင့်နေခြင်း၊ cooldown များ၊ lockout များ၊ quota သတိပေးချက်များ)
2. ၎င်းတို့ကို ဖြေရှင်းရန် **အကြံပြုလုပ်ဆောင်ချက်များ** ကို ထုတ်ပေးသည်
3. အန္တရာယ်နည်းသော လုပ်ဆောင်ချက်များကို လိုအပ်ပါက **အလိုအလျောက် လုပ်ဆောင်သည်**

### ရှာဖွေတွေ့ရှိသည့် ပြဿနာအမျိုးအစားများ

| ပြဿနာအမျိုးအစား              | ပြင်းထန်မှု | နမူနာအခြေအနေ                                                              |
| ---------------------------- | ----------- | ------------------------------------------------------------------------- |
| `provider_circuit_open`      | အရေးကြီး    | ၅ ကြိမ် ကျရှုံးပြီးနောက် ဆားကစ်ဖြတ်တောက်ကိရိယာ ဖွင့်နေခြင်း               |
| `provider_circuit_half_open` | သတိပေးချက်  | ဆားကစ်၏ ပြန်လည်ကောင်းမွန်မှုကို စမ်းသပ်နေခြင်း                            |
| `connection_cooldown`        | သတိပေးချက်  | 429 ဖြစ်ပြီးနောက် ချိတ်ဆက်မှုသည် cooldown အခြေအနေတွင် ရှိနေခြင်း          |
| `stale_connection_error`     | သတိပေးချက်  | နောက်ဆုံး refresh လုပ်ခြင်းသည် လွန်ခဲ့သော မိနစ် ၃၀ ကျော်က ကျရှုံးခဲ့ခြင်း |
| `terminal_connection_error`  | အရေးကြီး    | OAuth ကို ရုပ်သိမ်းထားခြင်း၊ key မမှန်ကန်ခြင်း                            |
| `inactive_connection`        | အချက်အလက်   | ဆက်တင်များတွင် ချိတ်ဆက်မှုကို ပိတ်ထားခြင်း                                |
| `model_lockout`              | သတိပေးချက်  | သတ်မှတ်ထားသော မော်ဒယ်ကို သီးခြားခွဲထားခြင်း                               |
| `quota_monitor_warning`      | သတိပေးချက်  | Quota အသုံးပြုမှု ၈၀% နှင့်အထက် ရောက်ရှိနေခြင်း                           |

### ထုတ်ပေးသည့် လုပ်ဆောင်ချက်အမျိုးအစားများ

| လုပ်ဆောင်ချက်                  | အန္တရာယ် | ဖော်ပြချက်                                                        |
| ------------------------------ | -------- | ----------------------------------------------------------------- |
| `clear_provider_breaker`       | အလယ်အလတ် | ဆားကစ်ဖြတ်တောက်ကိရိယာကို ပိတ်ထားသည့် အခြေအနေသို့ ပြန်သတ်မှတ်ခြင်း |
| `clear_connection_cooldown`    | နည်း     | ချိတ်ဆက်မှုတစ်ခုမှ cooldown ကို ဖယ်ရှားခြင်း                      |
| `clear_stale_connection_error` | နည်း     | သက်တမ်းလွန် error အမှတ်အသားကို ရှင်းလင်းခြင်း                     |
| `clear_model_lockout`          | နည်း     | သီးခြားခွဲထားသော မော်ဒယ်ကို ပြန်လည်ဖွင့်ပေးခြင်း                  |
| `reactivate_connection`        | အလယ်အလတ် | ပိတ်ထားသော ချိတ်ဆက်မှုကို ပြန်လည်ဖွင့်ပေးခြင်း                    |
| `deactivate_connection`        | မြင့်    | ပြဿနာရှိသော ချိတ်ဆက်မှုကို ပိတ်ခြင်း                              |

### API

> **REST endpoint မရှိပါ။** အလိုအလျောက်စီမံစနစ်၏ ပြဿနာများကို MCP tool `observability_snapshot` သို့မဟုတ် dashboard မှတစ်ဆင့် ရယူနိုင်သည်။ အလိုအလျောက်စီမံစနစ်သည် စနစ်အတွင်းပိုင်း၌ အလုပ်လုပ်ပြီး ၎င်း၏ အပြုအမူကို environment variable များဖြင့်မဟုတ်ဘဲ settings DB (ချိတ်ဆက်မှုတစ်ခုချင်းစီ၏ `autopilotMode` field) မှတစ်ဆင့် စီစဉ်သတ်မှတ်သည် — အလိုအလျောက်စီမံမုဒ် env var တစ်ခုကို `grep -rn` ဖြင့် ရှာဖွေပါက ရလဒ်တစ်ခုမျှ မတွေ့ပါ။

### အလိုအလျောက်စီမံမုဒ်

အလိုအလျောက်စီမံစနစ်သည် ပုံမှန်အားဖြင့် **ကိုယ်တိုင်လုပ်ဆောင်ရသော မုဒ်** တွင် အလုပ်လုပ်သည် — ၎င်းသည် ပြဿနာများကို ရှာဖွေသတ်မှတ်ပြီး အကြံပြုလုပ်ဆောင်ချက်များကို ထုတ်ပေးသော်လည်း ၎င်းတို့ကို အလိုအလျောက် အသုံးမပြုပါ။ လုပ်ဆောင်ချက်များကို dashboard မှတစ်ဆင့် အသုံးပြုနိုင်သည်။

---

## Combo ကျန်းမာရေး အလိုအလျောက်စီမံစနစ်

`comboHealthAutopilot.ts` သည် ပံ့ပိုးသူ အလိုအလျောက်စီမံစနစ်၏ **combo သီးသန့်** အမျိုးအစားဖြစ်သည်။ ၎င်းသည်-

- ကျန်းမာမှုမရှိသော combo များကို ရှာဖွေသတ်မှတ်သည်
- ပစ်မှတ်များ၏ အစီအစဉ်ကို ပြန်စီရန် အကြံပြုသည်
- ပျက်နေသော ပစ်မှတ်များကို ပိတ်ရန် အကြံပြုသည်
- N ကြိမ် ကျရှုံးပြီးနောက် အသုံးမဝင်တော့သော ပစ်မှတ်များကို အလိုအလျောက် ဖယ်ရှားသည်

### Combo ပြဿနာ နမူနာများ

```
Combo "always-on" (ဦးစားပေး မဟာဗျူဟာ)
├─ ပစ်မှတ် 1: openai/gpt-5 (ကျန်းမာ)
├─ ပစ်မှတ် 2: anthropic/claude-opus-4-6 (⚠️ 14:00 အထိ မော်ဒယ် lockout ဖြစ်နေသည်)
└─ ပစ်မှတ် 3: kiro/claude-sonnet-4-5 (ကျန်းမာ)

အကြံပြုလုပ်ဆောင်ချက်: အစီအစဉ်ပြန်စီရန် — lockout မကုန်ဆုံးမချင်း kiro ကို anthropic ၏ အပေါ်သို့ ရွှေ့ပါ
```

---

## Quota စောင့်ကြည့်စနစ်များ

`observability.ts` သည် subscription ပံ့ပိုးသူများ (Claude Code၊ Codex၊ GitHub Copilot) အတွက် **session တစ်ခုချင်းစီအလိုက် quota စောင့်ကြည့်စနစ်များ** ကို ဖော်ထုတ်ပေးသည်-

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

### အခြေအနေများ၏ အဓိပ္ပာယ်များ

| အခြေအနေ     | ဖြစ်ပေါ်သည့်အချိန်            | UI လုပ်ဆောင်ချက်                                               |
| ----------- | ----------------------------- | -------------------------------------------------------------- |
| `starting`  | ကနဦး poll လုပ်ဆောင်နေသည်      | လည်ပတ်ပြသည့် အမှတ်အသား                                         |
| `idle`      | မကြာသေးမီက လှုပ်ရှားမှုမရှိပါ | Dashboard မှ ဖျောက်ထားသည်                                      |
| `healthy`   | ကျန်ရှိသော quota > 50%        | အစိမ်းရောင် အစက်                                               |
| `warning`   | ကျန်ရှိသော quota < 50%        | အဝါရောင် သတိပေးချက်                                            |
| `exhausted` | Quota = 0%                    | အနီရောင် ပိတ်ဆို့မှု၊ နောက်ပံ့ပိုးသူထံ လမ်းကြောင်းပြောင်းခြင်း |
| `error`     | Polling ကျရှုံးခဲ့သည်         | အနီရောင် အစက်၊ မကြာမီ ပြန်လည်ကြိုးစားခြင်း                     |

### API

> **REST endpoint မရှိပါ။** Quota စောင့်ကြည့်စနစ်၏ ဒေတာကို MCP tool `observability_snapshot` သို့မဟုတ် dashboard မှတစ်ဆင့် ရယူနိုင်သည်။

---

## စောင့်ကြည့်နိုင်မှု လျှပ်တစ်ပြက်မှတ်တမ်း

MCP tool `observability_snapshot` သည် AI agent များအတွက် **စနစ်တစ်ခုလုံး၏ လျှပ်တစ်ပြက်မှတ်တမ်း** ကို ပြန်ပေးသည်-

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
  "quotaMonitors": {/* အထက်တွင် ကြည့်ပါ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agent များသည် ၎င်းကို **လမ်းကြောင်းရွေးချယ်မှု ဆုံးဖြတ်ချက်များ** ချမှတ်ရန် အသုံးပြုကြသည် — ဥပမာ၊ "openai ၏ circuit ပွင့်နေပါက anthropic သို့ ဦးစွာ လမ်းကြောင်းပေးပါ"။

---

## Token အခြေအနေ စစ်ဆေးခြင်း

OAuth provider များ (Claude Code, GitHub Copilot, Cursor) သည် **token ကို အခါအားလျော်စွာ အသစ်ပြန်လည်ရယူရန်** လိုအပ်သည်။ `src/lib/tokenHealthCheck.ts` သည် နောက်ခံ scheduler တစ်ခုကို လုပ်ဆောင်သည်-

- **Sweep tick**: 60 စက္ကန့်တိုင်း (`src/lib/tokenHealthCheck.ts:30` ရှိ `TICK_MS = 60 * 1000` ဖြင့် sweep လုပ်သည်)
- **Connection တစ်ခုချင်းစီ၏ အခြေအနေစစ်ဆေးမှု ကြားကာလ**: မူလသတ်မှတ်ချက် 60 မိနစ် (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); settings DB မှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်နိုင်သည်
- **401 ဖြစ်သည့်အခါ ကြိုတင် refresh လုပ်ခြင်း**: connection တစ်ခုချင်းစီ၏ interceptor က ကိုင်တွယ်သည်

### Token အခြေအနေ

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

### ပြင်ဆင်သတ်မှတ်မှု

Token အခြေအနေစစ်ဆေးမှု ပြင်ဆင်သတ်မှတ်ချက်ကို `tokenHealthCheck.ts` က အတွင်းပိုင်းတွင် ကိုင်တွယ်သည်။

### Token အခြေအနေ

> **REST endpoint မရှိပါ။** Token အခြေအနေဒေတာကို dashboard သို့မဟုတ် MCP tool `observability_snapshot` မှတစ်ဆင့် ရယူနိုင်သည်။

---

## သတိပေးချက်များ

### မူလပါဝင်သော Channel များ

OmniRoute သည် **သတိပေးချက် channel 3 ခု** ကို ပံ့ပိုးသည်-

| Channel          | စီစဉ်သတ်မှတ်မှု       | အသုံးပြုမှု               |
| ---------------- | --------------------- | ------------------------- |
| Dashboard banner | အမြဲဖွင့်ထားသည်       | App အတွင်း အသိပေးချက်များ |
| Webhook          | URL ပြင်ဆင်သတ်မှတ်ရန် | Slack, Discord, PagerDuty |
| Log              | မူလသတ်မှတ်ချက်        | ပြင်ပ log စုစည်းမှုအတွက်  |

### Webhook ပြင်ဆင်သတ်မှတ်မှု

> **မှတ်ချက်:** Webhook သတိပေးချက် ပြင်ဆင်သတ်မှတ်မှုကို dashboard ၏ Settings စာမျက်နှာမှတစ်ဆင့် ကိုင်တွယ်သည်။ Webhook URL၊ event filtering နှင့် payload customization တို့အတွက် Settings UI ကို ကြည့်ပါ။

### သတိပေးချက် အမျိုးအစားများ

| သတိပေးချက်                   | ဖြစ်ပေါ်သည့်အချိန်                                               | မူလ severity |
| ---------------------------- | ---------------------------------------------------------------- | ------------ |
| `provider_circuit_open`      | Circuit ပွင့်သည့်အခါ                                             | critical     |
| `provider_circuit_half_open` | Circuit ပြန်လည်ကောင်းမွန်မှုကို စမ်းသပ်သည့်အခါ                   | info         |
| `quota_warning`              | Quota 80%+ ရောက်သည့်အခါ                                          | warning      |
| `quota_exhausted`            | Quota 100% ရောက်သည့်အခါ                                          | critical     |
| `token_refresh_failed`       | ဆက်တိုက် refresh လုပ်ခြင်း 3 ကြိမ်နှင့်အထက် မအောင်မြင်သည့်အခါ    | warning      |
| `token_expired`              | Token သက်တမ်းကျော်လွန်သည့်အခါ                                    | critical     |
| `combo_target_unhealthy`     | Combo target သည် cooldown အခြေအနေတွင် 1 နာရီနှင့်အထက် ရှိသည့်အခါ | warning      |
| `db_integrity_warning`       | FK ချိုးဖောက်မှုများ > 0 ဖြစ်သည့်အခါ                             | warning      |
| `heap_pressure`              | Heap အသုံးပြုမှုသည် threshold ၏ 80% ထက်ကျော်သည့်အခါ              | warning      |

---

## စွမ်းဆောင်ရည် မက်ထရစ်များ

### ခြေရာခံထားသော မက်ထရစ်များ

| မက်ထရစ်                 | အမျိုးအစား  | ရင်းမြစ်                        |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | ကောင်တာ     | `services/usage.ts`             |
| `request_latency_ms`    | ဟစ်စတိုဂရမ် | `services/usage.ts`             |
| `tokens_consumed`       | ကောင်တာ     | `services/usage.ts`             |
| `cost_usd`              | ကောင်တာ     | `services/usage.ts`             |
| `provider_errors`       | ကောင်တာ     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ကောင်တာ     | `services/resilience.ts`        |
| `cache_hits`            | ကောင်တာ     | `services/signatureCache.ts`    |
| `compression_savings`   | ဟစ်စတိုဂရမ် | `services/compression/stats.ts` |
| `quota_used`            | ဂေ့ချ်      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ဂေ့ချ်      | `observability.ts`              |

### တုံ့ပြန်ချိန် ရာခိုင်နှုန်းအဆင့်များ (p50/p95/p99)

> **REST endpoint မရှိပါ။** တုံ့ပြန်ချိန် ရာခိုင်နှုန်းအဆင့်ဒေတာကို dashboard ၏ `/dashboard/health` စာမျက်နှာမှ ရရှိနိုင်ပါသည်။ Prometheus/OpenTelemetry export ကို v3.9 အတွက် စီစဉ်ထားပါသည်။

### Prometheus / OpenTelemetry Export (အဆင့် ၂)

v3.9 အတွက် စီစဉ်ထားသည်မှာ Prometheus၊ OpenTelemetry နှင့် Datadog သို့ တိုက်ရိုက် export ပြုလုပ်နိုင်ခြင်းဖြစ်သည်။

လက်ရှိတွင် HTTP အခြေပြု စောင့်ကြည့်ရေးစနစ်တစ်ခုခု (Prometheus blackbox exporter၊ Datadog HTTP check စသည်) ဖြင့် `/api/monitoring/health` ကို scrape လုပ်ပါ။

---

## သတိပေးချက် စီစဉ်နည်းများ

### Slack

> **မှတ်ချက်:** Webhook သတိပေးချက်များကို dashboard Settings စာမျက်နှာမှ စီစဉ်သတ်မှတ်ရပါသည် — သီးခြား webhook env vars မရှိပါ (`grep -rn` သည် ရလဒ် သုညကို ပြန်ပေးသည်)။ Webhook URL၊ event စစ်ထုတ်ခြင်းနှင့် payload စိတ်ကြိုက်ပြင်ဆင်ခြင်းအတွက် Settings UI ကို ကြည့်ပါ။

### Discord

> Webhook သတိပေးချက်များသည် Slack နှင့် တူညီသော Settings UI လုပ်ငန်းစဉ်ကို အသုံးပြုပါသည်။ Discord သည် တူညီသော JSON payload ပုံစံကို လက်ခံပါသည်။

### PagerDuty

> Webhook သတိပေးချက်များသည် တူညီသော Settings UI လုပ်ငန်းစဉ်ကို အသုံးပြုပါသည်။ PagerDuty Events API v2 routing keys များကို Settings UI တွင် စီစဉ်သတ်မှတ်ရပါသည်။

### စိတ်ကြိုက် Webhook (JSON)

> JSON body ဖြင့် POST ကို လက်ခံသော မည်သည့် HTTP endpoint မဆို အလုပ်လုပ်ပါသည်။ URL ကို Settings UI တွင် စီစဉ်သတ်မှတ်ပါ။

---

## Dashboard ဖွဲ့စည်းသတ်မှတ်မှု

### Health Dashboard ကို စိတ်ကြိုက်ပြင်ဆင်ခြင်း

`~/.omniroute/dashboard.json` ဖိုင်တစ်ခု ဖန်တီးပါ။

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Provider တစ်ခုကို ထိပ်ဆုံးတွင် ပင်ထိုးထားခြင်း

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ပြဿနာဖြေရှင်းခြင်း

### "Provider က ကျန်းမာနေသည်ဟု ပြသသော်လည်း request များ မအောင်မြင်ပါ"

1. **autopilot issues** ကို စစ်ဆေးပါ — model တစ်ခု ပိတ်ပင်ခံထားရနိုင်သည်
2. သက်ဆိုင်ရာ error class အတွက် **recent errors** ကို ကြည့်ပါ
3. Provider card ရှိ **connection test** ကို စမ်းသပ်ပါ
4. Provider သည် **upstream တွင် rate limit ခံထားရခြင်း** ရှိ၊ မရှိ စစ်ဆေးပါ (စက်တွင်းမှ မမြင်နိုင်ပါ)

### "Quota က ကျန်းမာနေသည်ဟု ပြသသော်လည်း 429 များ တွေ့နေရပါသည်"

- 429 ဆိုသည်မှာ သင့် quota ကို သုံးစွဲပြီးဖြစ်ကြောင်း provider က ပြောနေခြင်းဖြစ်သည်
- OmniRoute ၏ quota ခြေရာခံမှုသည် **ဟောင်းနေနိုင်သည်** — provider ၏ အမှန်တကယ်အချက်အလက်သည် upstream တွင် ရှိသည်
- အတွင်းပိုင်း quota monitor မှတစ်ဆင့် quota ဒေတာကို အလိုအလျောက် refresh လုပ်ပါသည်

### "Target အားလုံး ကျန်းမာနေသော်လည်း combo မအောင်မြင်ပါ"

- Target အစီအစဉ်ပြဿနာများအတွက် **combo health** dashboard ကို စစ်ဆေးပါ
- **fallback events** ကို ကြည့်ပါ — combo သည် ရွေးချယ်စရာများကို မြန်လွန်းစွာ ကုန်ဆုံးနေနိုင်သည်
- **strategy** သည် သင့်အသုံးပြုမှုနှင့် ကိုက်ညီကြောင်း စစ်ဆေးပါ (priority နှင့် round-robin နှင့် auto)

### "Database health check မအောင်မြင်ပါ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ကို run ပါ
- "ok" ဖြစ်ပါက — မှားယွင်းသတိပေးချက်ဖြစ်ပြီး health check က တင်းကျပ်လွန်းနေခြင်းဖြစ်သည်
- အခြားတစ်ခုခုဖြစ်ပါက — **OmniRoute ကို ရပ်တန့်ပါ**၊ ထို့နောက် [ဘေးအန္တရာယ်မှ ပြန်လည်ရယူရေး လမ်းညွှန်](./DATABASE_GUIDE.md#disaster-recovery) ကို လိုက်နာပါ

### "Memory heap ဖိအားသည် အရေးကြီးအဆင့် ရောက်နေပါသည်"

```bash
# လက်ရှိ heap ကို စစ်ဆေးပါ
node -e "console.log(process.memoryUsage())"

# GC ကို ကိုယ်တိုင် လုပ်ဆောင်ပါ (--expose-gc ဖြစ်ပါက)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# တစ်ပြိုင်နက် request အရေအတွက်ကို လျှော့ချပါ (env var မဟုတ်ဘဲ dashboard Settings စာမျက်နှာမှ သတ်မှတ်ပါ)
# `MAX_CONCURRENT_REQUESTS` env var မရှိပါ — Settings → Concurrency တွင် စီစဉ်သတ်မှတ်ပါ။
```

---

## ထပ်မံကြည့်ရှုရန်

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — အသုံးပြုမှုနှင့် ကုန်ကျစရိတ် ခြေရာခံခြင်း
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB schema နှင့် ကျန်းမာရေးအခြေအနေ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy ကျန်းမာရေးအခြေအနေ (သီးခြား cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — စနစ်ဗိသုကာ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker အသေးစိတ်အချက်အလက်များ
- ရင်းမြစ်: `src/lib/monitoring/` (ဖိုင် 4 ခု၊ LOC 2121)
