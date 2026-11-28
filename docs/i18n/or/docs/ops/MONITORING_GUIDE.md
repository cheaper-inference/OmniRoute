# Monitoring & Observability Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute ଅନ୍ତର୍ନିହିତ ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ, ପ୍ରଦାତା ଅଟୋପାଇଲଟ୍, କୋଟା ଟ୍ରାକିଂ ଏବଂ ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା ହୁକ୍ ସହିତ ଆସେ। ଏହି ମାର୍ଗଦର୍ଶିକାରେ ଡ୍ୟାସ୍ବୋର୍ଡ, ସତର୍କତା ଏବଂ ସମସ୍ୟା ସମାଧାନ ବିଷୟ ଅନ୍ତର୍ଭୁକ୍ତ।

**ଉତ୍ସଗୁଡ଼ିକ:**

- `src/lib/monitoring/observability.ts` — ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା ସ୍ନାପ୍ସଟ୍
- `src/lib/monitoring/comboHealthAutopilot.ts` — କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ ଅଟୋପାଇଲଟ୍
- `src/lib/monitoring/providerHealthAutopilot.ts` — ପ୍ରଦାତା ଅଟୋପାଇଲଟ୍
- `src/lib/monitoring/providerHealthMatrix.ts` — ପ୍ରଦାତା ସ୍ୱାସ୍ଥ୍ୟ ମ୍ୟାଟ୍ରିକ୍ସ
- `src/lib/localHealthCheck.ts` — ସ୍ଥାନୀୟ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ
- `src/lib/tokenHealthCheck.ts` — ଟୋକନ୍ ରିଫ୍ରେଶ୍ ସ୍ୱାସ୍ଥ୍ୟ
- `src/lib/proxyHealth.ts` — ପ୍ରକ୍ସି ସ୍ୱାସ୍ଥ୍ୟ କ୍ୟାଶ୍ (PROXY_GUIDE.mdରେ ବର୍ଣ୍ଣିତ)

---

## ସାରାଂଶ

OmniRouteରେ **ନିରୀକ୍ଷଣର 3ଟି ସ୍ତର** ଅଛି:

```
┌──────────────────────────────────────────────────────────────┐
│  ସ୍ତର 1: ସିଷ୍ଟମ୍ ସ୍ୱାସ୍ଥ୍ୟ (ସର୍ଭର୍-ସ୍ତରୀୟ)                 │
│  ├─ localHealthCheck.ts — DB, ପୋର୍ଟ, ନେଟିଭ୍ ନିର୍ଭରଶୀଳତା     │
│  ├─ db/healthCheck.ts — ଅଖଣ୍ଡତା, FK, ଅନାଥ ଆର୍ଟିଫ୍ୟାକ୍ଟ      │
│  └─ ଡ୍ୟାସ୍ବୋର୍ଡ: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  ସ୍ତର 2: ପ୍ରଦାତା ସ୍ୱାସ୍ଥ୍ୟ (ପ୍ରତି-ପ୍ରଦାତା ସହନଶୀଳତା)        │
│  ├─ providerHealthAutopilot.ts — ସର୍କିଟ୍ ବ୍ରେକର୍, କୁଲ୍ଡାଉନ୍ │
│  ├─ providerHealthMatrix.ts — ପ୍ରଦାତା/ମଡେଲ୍ ଅନୁଯାୟୀ ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର୍ │
│  └─ ଡ୍ୟାସ୍ବୋର୍ଡ: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  ସ୍ତର 3: ଲାଇଭ୍ ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା (ରନ୍ଟାଇମ୍ ସ୍ନାପ୍ସଟ୍)     │
│  ├─ observability.ts — ସର୍କିଟ୍ ବ୍ରେକର୍, ସେସନ୍, କୋଟା          │
│  ├─ tokenHealthCheck.ts — OAuth ଟୋକନ୍ ରିଫ୍ରେଶ୍ ସ୍ୱାସ୍ଥ୍ୟ    │
│  └─ MCP ଟୁଲ୍: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ଡ୍ୟାସ୍ବୋର୍ଡ ପୃଷ୍ଠାଗୁଡ଼ିକ

### `/dashboard/health` (ସିଷ୍ଟମ୍ ସ୍ୱାସ୍ଥ୍ୟ)

ଶୀର୍ଷ-ସ୍ତରୀୟ ସ୍ୱାସ୍ଥ୍ୟ ଡ୍ୟାସ୍ବୋର୍ଡ ଏଗୁଡ଼ିକ ଦେଖାଏ:

| ବିଭାଗ                 | ଏହା କ’ଣ ଦେଖାଏ                                    |
| --------------------- | ------------------------------------------------ |
| **ସର୍ଭର୍ ସ୍ଥିତି**     | ଅପ୍ଟାଇମ୍, ଭର୍ସନ୍, ପୋର୍ଟ, ସକ୍ରିୟ ସଂଯୋଗ            |
| **ଡାଟାବେସ୍**          | ସଂଯୋଗ, ଅଖଣ୍ଡତା, WAL ଆକାର, ସାମ୍ପ୍ରତିକ ମାଇଗ୍ରେସନ୍  |
| **ପ୍ରଦାତା ସାରାଂଶ**    | ସକ୍ରିୟ ସଂଖ୍ୟା, ସୁସ୍ଥ ସଂଖ୍ୟା, ଖୋଲା ବ୍ରେକର୍ ସଂଖ୍ୟା |
| **କୋଟା ମନିଟର୍**       | ସକ୍ରିୟ ସେସନ୍, ସତର୍କତା ଜାରି, ନିଃଶେଷିତ             |
| **ସାମ୍ପ୍ରତିକ ତ୍ରୁଟି** | ଷ୍ଟାକ୍ ଟ୍ରେସ୍ ସହିତ ଶେଷ 10ଟି ତ୍ରୁଟି               |
| **ସମ୍ବଳ ବ୍ୟବହାର**     | ମେମୋରି, CPU, ହିପ୍ ଚାପ ସୂଚକ                       |

### `/dashboard/providers` (ପ୍ରଦାତା ସ୍ୱାସ୍ଥ୍ୟ)

ପ୍ରତି-ପ୍ରଦାତା ଡ୍ୟାସ୍ବୋର୍ଡ:

| ସ୍ତମ୍ଭ       | ବର୍ଣ୍ଣନା                                   |
| ------------ | ------------------------------------------ |
| ପ୍ରଦାତା      | ପ୍ରଦାତା ID + ପ୍ରଦର୍ଶନ ନାମ                  |
| ସ୍ୱାସ୍ଥ୍ୟ    | ସବୁଜ/ହଳଦିଆ/ଲାଲ୍ ସ୍ଥିତି                     |
| ସର୍କିଟ୍      | ଖୋଲା/ବନ୍ଦ/ଅର୍ଦ୍ଧ-ଖୋଲା ସ୍ଥିତି               |
| ସଂଯୋଗଗୁଡ଼ିକ  | ସଂଯୋଗ ସଂଖ୍ୟା, ଶେଷ ରିଫ୍ରେଶ୍                 |
| ମଡେଲ୍ଗୁଡ଼ିକ  | ଉପଲବ୍ଧ ମଡେଲ୍, ପ୍ରତି ମଡେଲ୍ର ସ୍ୱାସ୍ଥ୍ୟ       |
| ଖର୍ଚ୍ଚ       | ଆଜିର ଖର୍ଚ୍ଚ, 7-ଦିନର ଧାରା                   |
| ତ୍ରୁଟିଗୁଡ଼ିକ | ଗତ 24hର ତ୍ରୁଟି ସଂଖ୍ୟା, ଶୀର୍ଷ ତ୍ରୁଟି ଶ୍ରେଣୀ |

ଏଗୁଡ଼ିକ ଦେଖିବା ପାଇଁ ଜଣେ ପ୍ରଦାତାଙ୍କୁ କ୍ଲିକ୍ କରନ୍ତୁ:

- ବିଳମ୍ବ ବିଭାଜନ ସହିତ ସାମ୍ପ୍ରତିକ ଅନୁରୋଧଗୁଡ଼ିକ
- ପ୍ରତି-ସଂଯୋଗ ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର୍
- ପ୍ରତି-ମଡେଲ୍ ଲକ୍ଆଉଟ୍
- ଅଟୋପାଇଲଟ୍ ସୁପାରିସଗୁଡ଼ିକ

### `/dashboard/quota` (କୋଟା ଟ୍ରାକିଂ)

ପ୍ରତ୍ୟେକ API କୀ ପାଇଁ:

- ବର୍ତ୍ତମାନର ବ୍ୟବହାର ବନାମ ସୀମା (ପ୍ରଗତି ବାର୍)
- କୋଟା ଧାରା (30-ଦିନର ଚାର୍ଟ)
- ପରବର୍ତ୍ତୀ ରିସେଟ୍ ସମୟ
- ସତର୍କତା ଇତିହାସ

### `/dashboard/combos` (କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ)

ପ୍ରତି-କମ୍ବୋ:

- କୌଶଳ + ଲକ୍ଷ୍ୟଗୁଡ଼ିକ
- ପ୍ରତି ଲକ୍ଷ୍ୟର ସ୍ୱାସ୍ଥ୍ୟ
- ସାମ୍ପ୍ରତିକ ଫଲ୍ବ୍ୟାକ୍ ଘଟଣାଗୁଡ଼ିକ
- ସଫଳତା ହାର (24h, 7d, 30d)

---

## ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ API

OmniRoute ପ୍ରକାଶ କରେ।** ଦୁଇଟି** HTTP ସ୍ୱାସ୍ଥ୍ୟ ପୃଷ୍ଠଗୁଡ଼ିକ। ଅର୍କେଷ୍ଟେଟରମାନଙ୍କ ପାଇଁ ସେଗୁଡ଼ିକ ଅଦଳବଦଳ ନୁହେଁ।

| ପଥ                           | ଉଦ୍ଦେଶ୍ୟ                                                     | ଓଜନ                           | ପାଇଁ ବ୍ୟବହାର କରନ୍ତୁ।                                                                    |
| ---------------------------- | ------------------------------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------- |
| `GET /healthz`               | ଜୀବନଚକ୍ର liveness/readiness (`ok` / `starting` / `stopping`) | ତୁଚ୍ଛ (କେବଳ ପର୍ଯ୍ୟାୟ ପତାକା)   | କୁବେରନେଟସ୍।** ପ୍ରସ୍ତୁତତା** ; ନରମ** ଜୀବନ୍ତତା** ଯଦି ଆପଣ ନିଶ୍ଚିତ ଭାବରେ HTTP ବ୍ୟବହାର କରିବେ। |
| `GET /api/monitoring/health` | ଗଭୀର ସିଷ୍ଟମ୍ + ପ୍ରଦାନକାରୀ ସାରାଂଶ (DB, ରାଶି, କାଟାଲଗ୍ ଗଣନା,…)  | ଭାରୀ (ସିଙ୍କ DB / ମନିଟରିଂ କାମ) | ଡ୍ୟାସବୋର୍ଡ, ବ୍ଲାକ୍ ବକ୍ସ ଗଭୀର ଯାଞ୍ଚ, Docker ର ବିଲ୍ଟ-ଇନ୍ ହେଲଥ୍ ଚେକ୍।                      |

> **ଟିପନ୍ତୁ:** ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ମେଟ୍ରିକ୍ସ, ଅଟୋପିଲଟ୍ ସମସ୍ୟା, କୋଟା ମନିଟର, ଟୋକେନ୍ ସ୍ୱାସ୍ଥ୍ୟ, ଏବଂ `/api/monitoring/health` ବାହାରେ ବିଳମ୍ବ ବିବରଣୀ ଉପଲବ୍ଧ।**MCP ଉପକରଣ** `observability_snapshot` କିମ୍ବା** ଡ୍ୟାସବୋର୍ଡ।** — ପୃଷ୍ଠାଗୁଡ଼ିକ ସେଗୁଡ଼ିକ ପାଇଁ କ dedicated ଣସି ଉତ୍ସର୍ଗୀକୃତ REST ମାର୍ଗ ନାହିଁ।

ଉଭୟ ରୁଟ୍ ଉପରେ ଚାଲିଥାଏ।** ସମାନ ନୋଡ୍ ଇଭେଣ୍ଟ ଲୁପ୍।** ଅନୁରୋଧ ନିୟନ୍ତ୍ରଣ ଭାବରେ। ଏକ CPU- ବନ୍ଧିତ ପଥ (ବୃହତ `GET /v1/models` କାଟାଲଗ୍ କାର୍ଯ୍ୟ, ଦୀର୍ଘ-ପ୍ରସଙ୍ଗ ସଙ୍କୋଚନ / ଟୋକନ୍ ଗଣନା) ବିଳମ୍ବ ହୋଇପାରେ।** ସମସ୍ତ** `/healthz` ଅନ୍ତର୍ଭୁକ୍ତ କରି HTTP ନିୟନ୍ତ୍ରକ। ଇଭେଣ୍ଟ-ଲୁପ୍ ବ୍ୟସ୍ତ ≠ ପ୍ରକ୍ରିୟା ମୃତ। ହଗ୍ ଠିକ୍ କରିବାକୁ ପସନ୍ଦ କରନ୍ତୁ; ପ୍ରୋବ ଟ୍ୟୁନିଂ କେବଳ ମିଥ୍ୟା ହତ୍ୟାକୁ ହ୍ରାସ କରିଥାଏ।

### ହାଲୁକା ଅର୍କେଷ୍ଟେଟର ଅନୁସନ୍ଧାନ।

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` ଯେତେବେଳେ ସର୍ଭର ଜୀବନଚକ୍ର ପର୍ଯ୍ୟାୟ ପ୍ରସ୍ତୁତ ହୁଏ।
- **503** ବୁଟ କିମ୍ବା ବନ୍ଦ ସମୟରେ + `starting` / `stopping`
- କାର୍ଯ୍ୟାନ୍ୱୟନ: `src/app/healthz/route.ts` ( DB ପିଙ୍ଗ ନାହିଁ)

### ସିଷ୍ଟମ୍ ହେଲ୍ଥ (ଗଭୀର)

```bash
GET /api/monitoring/health
```

ପ୍ରତିକ୍ରିୟା:

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

#### `credentialHealth`: ପ୍ରୋବ-କ୍ୟାଚ୍ ବନାମ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ହେଉଛି** ମେମୋରୀ ପ୍ରୋବ-କ୍ୟାଚ୍ ଗେଜ୍।** , `provider_connections.test_status` ର ଏକ ଲାଇଭ୍ ଡମ୍ପ୍ ନୁହେଁ। #12532 ପରେ ଅନୁରୋଧ ପଥ କେବଳ `getCachedCredentialHealthSummary()` ପ read େ; ପୃଷ୍ଠଭୂମି ଅନୁସନ୍ଧାନଗୁଡ଼ିକ ଇଭେଣ୍ଟ ଲୁପ୍ ରୁ କ୍ୟାଚ୍ ସତେଜ କରେ।

| ସ୍ତର                  | କେଉଁଠାରେ                                                              | ଏହାର ଅର୍ଥ                                                                                                                                                                                                           |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ପ୍ରୋବ-କ୍ୟାଚ୍ ଗେଜ୍।    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ଶେଷ ପରିଚୟ-ସ୍ୱାସ୍ଥ୍ୟ ଅନୁସନ୍ଧାନ ଫଳାଫଳଗୁଡିକ ପ୍ରକ୍ରିୟା ମେମୋରୀରେ ରହିଥାଏ। `source` ସର୍ବଦା `probe-cache` ଅଟେ।                                                                                                              |
| ବିଫଳ ସଂଯୋଗ ବିବରଣୀ।    | `credentialHealth.failedConnections`                                  | ଉପସ୍ଥିତ** ଯେତେବେଳେ `failed > 0`** । `status=error` (`connectionId`, `status`, ସାନିଟାଇଜଡ୍ `lastError` / `lastErrorType`) ସହିତ କ୍ୟାଚ୍ ଧାଡିଗୁଡ଼ିକର ସୀମିତ ତାଲିକା। ତାଲିକା କ୍ୟାପ୍ ହୋଇଥିବାବେଳେ `failedOmitted` ସେଟ୍ ହୋଇଛି। |
| SQLite ଷ୍ଟିକି ସ୍ଥିତି। | `credentialHealth.staleDbNonOkCount`                                  | ଗଣନା** ସକ୍ରିୟ** (`is_active=1`) ସଂଯୋଗ ଧାଡି ଯାହାର ସ୍ଥିର `test_status` ଏକ ଜଣାଶୁଣା ଅଣ- ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)।                                           |

ଉଦ୍ଦେଶ୍ୟରେ ଦୁଇଟି ସ୍ତର ଏକମତ ହୋଇପାରେ:

- `failed=0` ଥିବାବେଳେ `staleDbNonOkCount>0` — SQLite ତଥାପି ଏକ ଷ୍ଟିକି `test_status` ଅଛି (ଉଦାହରଣ ସ୍ୱରୂପ `expired` କିମ୍ବା `credits_exhausted`) ଯାହାକି ସର୍ବଶେଷ ଅନୁସନ୍ଧାନ-କ୍ୟାଚ୍ ସ୍ନାପସଟ୍ `status=error` ଭାବରେ ଗଣନା କରେ ନାହିଁ।
- Gq `failed>0` ଯେତେବେଳେ SQLite ସୁସ୍ଥ ଦେଖାଯାଏ — ଏକ ସାମ୍ପ୍ରତିକ ଅନୁସନ୍ଧାନ ବିଫଳ ହୋଇଛି ଏବଂ କ୍ୟାଚ୍ ହୋଇଛି। DB ଧାଡି ଅଦ୍ୟତନ ହୋଇନାହିଁ, କିମ୍ବା ପରେ ସଫା ହୋଇଛି।

ଏହି ଶେଷ ପଏଣ୍ଟ ସ୍କ୍ରାପ୍ କରିବା ସମୟରେ କେବଳ `provider_connections.test_status` ଉପରେ ସତର୍କ ହୁଅନ୍ତୁ ନାହିଁ। ଲାଇଭ୍ ଅନୁସନ୍ଧାନ ବିଫଳତା ପାଇଁ `failed` + `failedConnections` ବ୍ୟବହାର କରନ୍ତୁ, ଏବଂ ଯେତେବେଳେ ଆପଣ ସ୍ଥାୟୀ ଷ୍ଟିକି-ସ୍ଥିତି ଗଣନା ଆବଶ୍ୟକ କରନ୍ତି `staleDbNonOkCount` ବ୍ୟବହାର କରନ୍ତୁ।

### କୁବେରନେଟସ୍ ଅନୁସନ୍ଧାନ ସୁପାରିଶ।

OmniRoute ହେଉଛି a** ଏକକ ନୋଡ୍ ପ୍ରକ୍ରିୟା।** (ଗୋଟିଏ ଇଭେଣ୍ଟ ଲୁପ୍)। ଷ୍ଟକ୍ Docker `HEALTHCHECK` ହାଲୁକା `/healthz` କୁ ଟାର୍ଗେଟ୍ କରେ। `/api/monitoring/health` ହେଉଛି।** ବହୁତ ଭାରୀ** କୁବେଲେଟ୍ ଜୀବନ୍ତତା ବ୍ୟବଧାନ ପାଇଁ।

| ଅନୁସନ୍ଧାନ।         | ସୁପାରିଶ କରାଯାଇଥିବା ଲକ୍ଷ୍ୟ।                                                      | ଟିପ୍ପଣୀ।                                                                                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ଷ୍ଟାର୍ଟଅପ୍**     | ଏକ ଲମ୍ବା `failureThreshold` (କିମ୍ବା ବଡ଼ `startPeriod`) ସହିତ HTTP `GET /healthz` | ଥଣ୍ଡା ଆରମ୍ଭ + SQLite ସ୍ଥାନାନ୍ତରଣ କିଛି ସେକେଣ୍ଡରୁ ଅଧିକ ହୋଇପାରେ।                                                                                                                                                                                                                                                                |
| **ପ୍ରସ୍ତୁତି**      | HTTP `GET /healthz`                                                             | ଜୀବନଚକ୍ର `ok` / `starting` / `stopping` (200 ବନାମ 503)। ଯଦି ଲୁପ୍ CPU- ଅବରୋଧିତ ତେବେ ତଥାପି ଫ୍ଲାପ୍ ହୁଏ। କ** ଏକାଧିକ ସେକେଣ୍ଡରେ 200 ସୁସ୍ଥ ନୁହେଁ।** (#10303) — ଏହାର ଅର୍ଥ ହେଉଛି 3-ବାଇଟ୍ ହ୍ୟାଣ୍ଡେଲର୍ ଚାଲିବା ପୂର୍ବରୁ ଇଭେଣ୍ଟ ଲୁପ୍ ଭୋକିଲା।                                                                                               |
| **ଜୀବନ୍ତତା।**      | HTTP `GET /livez`,** କିମ୍ବା TCP** ମୁଖ୍ୟ ସେବା ପୋର୍ଟରେ (`PORT`, ଡିଫଲ୍ଟ `20128`)   | `/livez` କେବଳ ପ୍ରକ୍ରିୟା-ଜୀବନ୍ତ (ଯଦି ହ୍ୟାଣ୍ଡଲର୍ ଚାଲିଥାଏ ତେବେ ସର୍ବଦା 200)। ଏହା ଏପର୍ଯ୍ୟନ୍ତ ଇଭେଣ୍ଟ ଲୁପ୍ — ବ୍ୟସ୍ତ ≠ ମୃତ, ଏବଂ ଏହା TCP ଅପେକ୍ଷା ଇଭେଣ୍ଟ-ଲୁପ୍ ଅନାହାର (#10303) ଚିହ୍ନଟ କରେ ନାହିଁ। ପସନ୍ଦ କରନ୍ତୁ।**TCP** ଯଦି HTTP ଭାରରେ catalog/compression ସମୟ ଅନୁସନ୍ଧାନ କରେ; କର** ନୁହେଁ।** ଛୋଟ ଇଭେଣ୍ଟ-ଲୁପ୍ ଷ୍ଟଲଗୁଡିକରେ ପୋଡ୍ କୁ ହତ୍ୟା କର। |
| **ଗଭୀର ସ୍ୱାସ୍ଥ୍ୟ** | `GET /api/monitoring/health` ଏକ ବାହ୍ୟ ଚେକର୍ ରୁ।                                 | Kubelet `livenessProbe` / tight `readinessProbe` ପାଇଁ ନୁହେଁ।                                                                                                                                                                                                                                                                 |

ଉଦାହରଣ ଆକୃତି (ତୁମର ଶୀତ-ଆରମ୍ଭ ଏବଂ ସଙ୍କୋଚନ ଭାର ସହିତ ଥ୍ରେସହୋଲ୍ଡ ଆଡଜଷ୍ଟ କରନ୍ତୁ):

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

**କରନ୍ତୁ ନାହିଁ।** ପଏଣ୍ଟ କୁବେଲେଟ୍।** ଜୀବନ୍ତତା** `/api/monitoring/health` ସେହି ପଥ ପ୍ରକୃତ DB/monitoring କାମ କରେ ଏବଂ ଭାରରେ ମିଥ୍ୟା-ପଜିଟିଭ୍ ହେବ।

ସମ୍ବନ୍ଧିତ: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (ଇଭେଣ୍ଟ ଲୁପ୍ ବ୍ୟସ୍ତ ଥିବାବେଳେ ଅନୁସନ୍ଧାନ), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (କାଟାଲଗ୍ ମୂଲ୍ୟ ନିର୍ଧାରଣ ହଗ୍), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (ସଙ୍କୋଚନ ଟୋକେନ୍-ଗଣନା ହଗ୍)।

### systemd watchdog (ଫ୍ରିଜ୍ ଇଭେଣ୍ଟ ଲୁପ୍)

ଏକ ସିଷ୍ଟମ୍ ହୋଷ୍ଟରେ, OmniRoute ସର୍ଭିସ୍ ମ୍ୟାନେଜରଙ୍କୁ ଏହା ପ୍ରସ୍ତୁତ ହେବାବେଳେ କହିଥାଏ ଏବଂ ଏହାକୁ ପିଙ୍ଗ୍ କରି ରଖେ, ତେଣୁ ଏକ ସର୍ଭର ଯାହାର ଇଭେଣ୍ଟ ଲୁପ୍ ଅଟକି ଯାଇଥାଏ ଏବଂ ଚୁପ୍ ରହିବା ପରିବର୍ତ୍ତେ ପୁନ art ଆରମ୍ଭ ହୁଏ। ପିଙ୍ଗଗୁଡ଼ିକ ସର୍ଭରର ନିଜସ୍ୱ ଇଭେଣ୍ଟ ଲୁପ୍ ରୁ ଆସିଥାଏ: ଯେତେବେଳେ ଏହା ଅବରୋଧ ହୁଏ, ସେମାନେ ଅଟକି ଯାଆନ୍ତି, ଏବଂ `WatchdogSec` ବିନା ଥରେ systemd ସେବାକୁ ପୁନ rest ଆରମ୍ଭ କରେ।

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) ଏହା ସହିତ ଏକ ୟୁଜର୍ ୟୁନିଟ୍ ଲେଖେ। ଆପଣ ନିଜେ ଲେଖୁଥିବା ଏକ ୟୁନିଟ୍ (ଡିଫଲ୍ଟ `Type=simple`) କ watch ଣସି ୱାଚଡଗ୍ ପାଇବ ନାହିଁ, ତେଣୁ ଏହାର ରେଖାଗୁଡ଼ିକୁ ଏହାର `[Service]` ବିଭାଗରେ ଯୋଡନ୍ତୁ:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

ଉତ୍ପାଦିତ ୟୁନିଟ୍ `Restart=on-failure` ସେଟ୍ କରେ, ତେଣୁ ସେହି ରେଖା ସହିତ — ଯୋଡନ୍ତୁ, ଏହା ବିନା ୱାଚଡଗ୍ କେବଳ ପୁନ rest ଆରମ୍ଭ କରିବା ପରିବର୍ତ୍ତେ ଅଟକି ରହିଥିବା ସେବାକୁ ମାରିଦିଏ।

- `Type=notify`: ଯେତେବେଳେ ସର୍ଭର `READY=1` ପଠାଏ, ସେବା “ଆରମ୍ଭ” ହୁଏ, ପ୍ରକ୍ରିୟା ଫଙ୍କସ୍ ନୁହେଁ। `TimeoutStartSec` ଏକ ଧୀର ଆରମ୍ଭକୁ ସୀମିତ କରେ।
- `NotifyAccess=all`: ପିଙ୍ଗଗୁଡିକ ସର୍ଭର ପ୍ରକ୍ରିୟା ଦ୍ୱାରା ପଠାଯାଇଥାଏ, ଯାହାକି `omniroute serve` ସୁପରଭାଇଜରର ପିଲା।
- `WatchdogSec`: ପ୍ରତି 60 ସେକେଣ୍ଡରେ ପିଙ୍ଗ୍ ବାହାରକୁ ଯାଏ, ତେଣୁ ବ୍ୟବହାର କରନ୍ତୁ।** 120 କିମ୍ବା ଅଧିକ** । ଛୋଟ ମୂଲ୍ୟଗୁଡ଼ିକ ଏକ ସୁସ୍ଥ ସର୍ଭରକୁ ପୁନ rest ଆରମ୍ଭ କରିବ।
- `omniroute serve` ଅଗ୍ରଭାଗରେ ଚଲାନ୍ତୁ। `--daemon` ସର୍ଭରକୁ ୟୁନିଟ୍ ର cgroup ରୁ ଅଲଗା କରିଥାଏ ଏବଂ ବିଜ୍ଞପ୍ତି ହ୍ୟାଣ୍ଡସେକ କେବେ ବି ସମାପ୍ତ ହୁଏ ନାହିଁ।

ପୁନ rest ଆରମ୍ଭ ପରେ ଏହା ସକ୍ରିୟ ଅଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` ବିନ୍ୟାସିତ ବିଳମ୍ବକୁ ଦର୍ଶାଏ ଏବଂ `WatchdogTimestamp` ପ୍ରତି ମିନିଟରେ ଆଗକୁ ବ .େ। ୱାଚଡଗ୍ ଦ୍ caused ାରା ସୃଷ୍ଟି ହୋଇଥିବା ପୁନ rest ଆରମ୍ଭ `Result=watchdog` ଭାବରେ ରେକର୍ଡ କରାଯାଇଛି। ୟୁନିଟ୍କୁ ଯେପରି ରଖିବାବେଳେ ପିଙ୍ଗ୍ ବନ୍ଦ କରିବାକୁ, `OMNIROUTE_DISABLE_SD_NOTIFY=1` ସେଟ୍ କରନ୍ତୁ; ବିନା `NOTIFY_SOCKET` (ଟର୍ମିନାଲ୍, Docker, Electron, Windows) ବିନା କିଛି ପଠାଯାଏ ନାହିଁ।

ୱାଚଡଗ୍ କେବଳ ଯାଞ୍ଚ କରେ ଯେ ଇଭେଣ୍ଟ ଲୁପ୍ ଚାଲୁଥାଏ। ଏକ ସର୍ଭର ଯାହା ଧୀର କିନ୍ତୁ ତଥାପି ଟର୍ନିଂ ପୁନ rest ଆରମ୍ଭ ହୋଇନାହିଁ।

### ବ tion କଳ୍ପିକ ଅନୁରୋଧ-ପଥ କାର୍ଯ୍ୟ (ସ୍ମୃତି, କ skills ଶଳ, ଟୋକେନ୍ ସତେଜ)

ମେମୋରୀ ନିଷ୍କାସନ, କ skills ଶଳ ଇଞ୍ଜେକ୍ସନ୍, ଏବଂ OAuth ଟୋକେନ୍ ସତେଜ ଅଂଶୀଦାର କରେ।** ମୁଖ୍ୟ ନୋଡ୍ ଇଭେଣ୍ଟ ଲୁପ୍।** `/healthz` ସହିତ ସେଗୁଡ଼ିକ ହେଉଛି ଡ୍ୟାସବୋର୍ଡ-ଟୋଗଲ୍ ବ features ଶିଷ୍ଟ୍ୟଗୁଡିକ (`memoryEnabled`, `skillsEnabled`), ଏକ ଶ୍ରମିକ ପୁଲ୍ ନୁହେଁ। [ପରିବେଶ — ଇଭେଣ୍ଟ-ଲୁପ୍ ମୂଲ୍ୟ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ଦେଖନ୍ତୁ।

### ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ

> **REST ଶେଷ ପଏଣ୍ଟ ନାହିଁ।** ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ତଥ୍ୟ MCP ଟୁଲ `observability_snapshot` କିମ୍ବା ଡ୍ୟାସବୋର୍ଡ `/dashboard/providers` ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

### ପ୍ରଦାନକାରୀ ବିବରଣୀ

> **REST ଶେଷ ପଏଣ୍ଟ ନାହିଁ।** ପ୍ରତି-ପ୍ରଦାନକାରୀ ବିବରଣୀ ଡ୍ୟାସବୋର୍ଡ `/dashboard/providers` ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

---

## ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଅଟୋପାଇଲଟ୍

`providerHealthAutopilot.ts` ମଡ୍ୟୁଲ୍ ହେଉଛି ଏକ **ସ୍ୱୟଂ-ମରାମତି ବ୍ୟବସ୍ଥା**, ଯାହା:

1. ପ୍ରଦାନକାରୀ ସମସ୍ୟାଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରେ (ସର୍କିଟ୍ ଖୋଲା, କୁଲ୍ଡାଉନ୍, ଲକ୍ଆଉଟ୍, କୋଟା ଚେତାବନୀ)
2. ସେଗୁଡ଼ିକର ସମାଧାନ ପାଇଁ **ସୁପାରିସକୃତ କାର୍ଯ୍ୟ** ସୃଷ୍ଟି କରେ
3. ଇଚ୍ଛାଧୀନ ଭାବେ କମ୍-ବିପଦପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟଗୁଡ଼ିକୁ **ସ୍ୱୟଂଚାଳିତ ଭାବେ ନିଷ୍ପାଦନ** କରେ

### ଚିହ୍ନଟ ହୋଇଥିବା ସମସ୍ୟା ପ୍ରକାର

| ସମସ୍ୟା ପ୍ରକାର                | ଗୁରୁତ୍ୱ | ଉଦାହରଣ ସର୍ତ୍ତ                                |
| ---------------------------- | ------- | -------------------------------------------- |
| `provider_circuit_open`      | ଗୁରୁତର  | 5ଟି ବିଫଳତା ପରେ ସର୍କିଟ୍ ବ୍ରେକର୍ ଖୋଲା          |
| `provider_circuit_half_open` | ଚେତାବନୀ | ସର୍କିଟ୍ ପୁନରୁଦ୍ଧାର ପରୀକ୍ଷା କରୁଛି             |
| `connection_cooldown`        | ଚେତାବନୀ | 429 ପରେ ସଂଯୋଗ କୁଲ୍ଡାଉନ୍ରେ ଅଛି                |
| `stale_connection_error`     | ଚେତାବନୀ | ଶେଷ ରିଫ୍ରେଶ୍ 30+ ମିନିଟ୍ ପୂର୍ବରୁ ବିଫଳ ହୋଇଥିଲା |
| `terminal_connection_error`  | ଗୁରୁତର  | OAuth ପ୍ରତ୍ୟାହୃତ, କୀ ଅବୈଧ                    |
| `inactive_connection`        | ସୂଚନା   | ସେଟିଂସ୍ରେ ସଂଯୋଗ ଅକ୍ଷମ କରାଯାଇଛି               |
| `model_lockout`              | ଚେତାବନୀ | ନିର୍ଦ୍ଦିଷ୍ଟ ମଡେଲ୍ କ୍ୱାରେଣ୍ଟାଇନ୍ରେ ଅଛି        |
| `quota_monitor_warning`      | ଚେତାବନୀ | କୋଟା ବ୍ୟବହାର 80%+ ରେ ଅଛି                     |

### ସୃଷ୍ଟି ହୋଇଥିବା କାର୍ଯ୍ୟ ପ୍ରକାର

| କାର୍ଯ୍ୟ                        | ବିପଦ  | ବର୍ଣ୍ଣନା                                      |
| ------------------------------ | ----- | --------------------------------------------- |
| `clear_provider_breaker`       | ମଧ୍ୟମ | ସର୍କିଟ୍ ବ୍ରେକର୍କୁ ବନ୍ଦ ଅବସ୍ଥାକୁ ରିସେଟ୍ କରନ୍ତୁ |
| `clear_connection_cooldown`    | କମ୍   | ଏକ ସଂଯୋଗରୁ କୁଲ୍ଡାଉନ୍ ହଟାନ୍ତୁ                  |
| `clear_stale_connection_error` | କମ୍   | ପୁରୁଣା ତ୍ରୁଟି ଫ୍ଲାଗ୍ ସଫା କରନ୍ତୁ               |
| `clear_model_lockout`          | କମ୍   | କ୍ୱାରେଣ୍ଟାଇନ୍ରେ ଥିବା ମଡେଲ୍କୁ ପୁନଃସକ୍ଷମ କରନ୍ତୁ |
| `reactivate_connection`        | ମଧ୍ୟମ | ନିଷ୍କ୍ରିୟ କରାଯାଇଥିବା ସଂଯୋଗକୁ ପୁନଃସକ୍ଷମ କରନ୍ତୁ |
| `deactivate_connection`        | ଉଚ୍ଚ  | ସମସ୍ୟାପୂର୍ଣ୍ଣ ସଂଯୋଗକୁ ଅକ୍ଷମ କରନ୍ତୁ            |

### API

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ଅଟୋପାଇଲଟ୍ ସମସ୍ୟାଗୁଡ଼ିକ MCP ଟୁଲ୍ `observability_snapshot` କିମ୍ବା ଡ୍ୟାଶବୋର୍ଡ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ। ଅଟୋପାଇଲଟ୍ ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ ଚାଲେ; ଏହାର ଆଚରଣ ଏନ୍ଭାଇରନ୍ମେଣ୍ଟ ଭେରିଏବଲ୍ ଦ୍ୱାରା ନୁହେଁ, ବରଂ ସେଟିଂସ୍ DB (ପ୍ରତ୍ୟେକ ସଂଯୋଗର `autopilotMode` ଫିଲ୍ଡ) ମାଧ୍ୟମରେ ବିନ୍ୟାସ କରାଯାଏ — ଏକ ଅଟୋପାଇଲଟ୍-ମୋଡ୍ ଏନ୍ଭାଇରନ୍ମେଣ୍ଟ ଭେରିଏବଲ୍ ପାଇଁ `grep -rn` କଲେ କୌଣସି ଫଳାଫଳ ମିଳେ ନାହିଁ।

### ଅଟୋପାଇଲଟ୍ ମୋଡ୍

ଅଟୋପାଇଲଟ୍ ଡିଫଲ୍ଟ ଭାବେ **ମାନୁଆଲ୍ ମୋଡ୍**ରେ କାର୍ଯ୍ୟ କରେ — ଏହା ସମସ୍ୟାଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରି ସୁପାରିସକୃତ କାର୍ଯ୍ୟ ସୃଷ୍ଟି କରେ, କିନ୍ତୁ ସେଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ପ୍ରୟୋଗ କରେ ନାହିଁ। କାର୍ଯ୍ୟଗୁଡ଼ିକୁ ଡ୍ୟାଶବୋର୍ଡ ମାଧ୍ୟମରେ ପ୍ରୟୋଗ କରାଯାଇପାରିବ।

---

## କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ ଅଟୋପାଇଲଟ୍

`comboHealthAutopilot.ts` ହେଉଛି ପ୍ରଦାନକାରୀ ଅଟୋପାଇଲଟ୍ର **କମ୍ବୋ-ନିର୍ଦ୍ଦିଷ୍ଟ** ସମକକ୍ଷ। ଏହା:

- ଅସୁସ୍ଥ କମ୍ବୋଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରେ
- ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ପୁନଃକ୍ରମବଦ୍ଧ କରିବାକୁ ସୁପାରିସ କରେ
- ଅକାମୀ ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ଅକ୍ଷମ କରିବାକୁ ପରାମର୍ଶ ଦିଏ
- Nଟି ବିଫଳତା ପରେ ଅଚଳ ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ହଟାଏ

### କମ୍ବୋ ସମସ୍ୟା ଉଦାହରଣ

```
କମ୍ବୋ "always-on" (ପ୍ରାଥମିକତା କୌଶଳ)
├─ ଲକ୍ଷ୍ୟ 1: openai/gpt-5 (ସୁସ୍ଥ)
├─ ଲକ୍ଷ୍ୟ 2: anthropic/claude-opus-4-6 (⚠️ 14:00 ପର୍ଯ୍ୟନ୍ତ ମଡେଲ୍ ଲକ୍ଆଉଟ୍)
└─ ଲକ୍ଷ୍ୟ 3: kiro/claude-sonnet-4-5 (ସୁସ୍ଥ)

ସୁପାରିସକୃତ କାର୍ଯ୍ୟ: ପୁନଃକ୍ରମବଦ୍ଧ କରନ୍ତୁ — ଲକ୍ଆଉଟ୍ର ସମୟସୀମା ଶେଷ ହେବା ପର୍ଯ୍ୟନ୍ତ kiroକୁ anthropic ଉପରକୁ ଘୁଞ୍ଚାନ୍ତୁ
```

---

## କୋଟା ମନିଟର୍

`observability.ts` ସବ୍ସ୍କ୍ରିପ୍ସନ୍ ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ (Claude Code, Codex, GitHub Copilot) **ପ୍ରତି-ସେସନ୍ କୋଟା ମନିଟର୍** ପ୍ରକାଶ କରେ:

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

### ସ୍ଥିତିର ଅର୍ଥ

| ସ୍ଥିତି      | କେବେ                               | UI କାର୍ଯ୍ୟ                                            |
| ----------- | ---------------------------------- | ----------------------------------------------------- |
| `starting`  | ପ୍ରାରମ୍ଭିକ ପୋଲିଂ ଚାଲିଛି            | ସ୍ପିନର୍                                               |
| `idle`      | କୌଣସି ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ ନାହିଁ | ଡ୍ୟାଶବୋର୍ଡରୁ ଲୁକ୍କାୟିତ                                |
| `healthy`   | କୋଟାର 50%ରୁ ଅଧିକ ବାକି ଅଛି          | ସବୁଜ ବିନ୍ଦୁ                                           |
| `warning`   | କୋଟାର 50%ରୁ କମ୍ ବାକି ଅଛି           | ହଳଦିଆ ସତର୍କତା                                         |
| `exhausted` | କୋଟା = 0%                          | ଲାଲ୍ ବ୍ଲକ୍, ପରବର୍ତ୍ତୀ ପ୍ରଦାନକାରୀଙ୍କ ପାଖକୁ ରୁଟ୍ କରନ୍ତୁ |
| `error`     | ପୋଲିଂ ବିଫଳ ହୋଇଛି                   | ଲାଲ୍ ବିନ୍ଦୁ, ଶୀଘ୍ର ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ                  |

### API

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** କୋଟା ମନିଟର୍ ଡାଟା MCP ଟୁଲ୍ `observability_snapshot` କିମ୍ବା ଡ୍ୟାଶବୋର୍ଡ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

---

## ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା ସ୍ନାପସଟ୍

MCP ଟୁଲ୍ `observability_snapshot` AI ଏଜେଣ୍ଟମାନଙ୍କ ପାଇଁ ଏକ **ସମ୍ପୂର୍ଣ୍ଣ ସିଷ୍ଟମ୍ ସ୍ନାପସଟ୍** ଫେରାଏ:

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
  "quotaMonitors": {/* ଉପରେ ଦେଖନ୍ତୁ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ଏଜେଣ୍ଟମାନେ **ରାଉଟିଂ ନିଷ୍ପତ୍ତି** ନେବା ପାଇଁ ଏହାକୁ ବ୍ୟବହାର କରନ୍ତି — ଉଦାହରଣ ସ୍ୱରୂପ, "ଯଦି openaiର ସର୍କିଟ୍ ଖୋଲା ଅଛି, ତେବେ ପ୍ରଥମେ anthropicକୁ ରାଉଟ୍ କରନ୍ତୁ"।

---

## ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ

OAuth ପ୍ରଦାନକାରୀଗୁଡ଼ିକ (Claude Code, GitHub Copilot, Cursor) ପାଇଁ **ନିୟମିତ ଟୋକନ୍ ରିଫ୍ରେଶ୍** ଆବଶ୍ୟକ। `src/lib/tokenHealthCheck.ts` ଏକ ବ୍ୟାକଗ୍ରାଉଣ୍ଡ ସ୍କେଡ୍ୟୁଲର୍ ଚଲାଏ:

- **ସ୍ୱିପ୍ ଟିକ୍**: ପ୍ରତି 60 ସେକେଣ୍ଡରେ (`src/lib/tokenHealthCheck.ts:30`ରେ `TICK_MS = 60 * 1000` ଅନୁସାରେ ସ୍ୱିପ୍)
- **ପ୍ରତି-କନେକ୍ସନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ବ୍ୟବଧାନ**: ଡିଫଲ୍ଟ ଭାବେ 60 ମିନିଟ୍ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ସେଟିଂସ୍ DB ମାଧ୍ୟମରେ ବିନ୍ୟାସଯୋଗ୍ୟ
- **401ରେ ପୂର୍ବ-ସକ୍ରିୟ ରିଫ୍ରେଶ୍**: ପ୍ରତି-କନେକ୍ସନ୍ ଇଣ୍ଟରସେପ୍ଟର୍ ଦ୍ୱାରା ପରିଚାଳିତ

### ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି

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

### ବିନ୍ୟାସ

ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ବିନ୍ୟାସ `tokenHealthCheck.ts` ଦ୍ୱାରା ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ ପରିଚାଳିତ ହୁଏ।

### ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଡାଟା ଡ୍ୟାସବୋର୍ଡ କିମ୍ବା MCP ଟୁଲ୍ `observability_snapshot` ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

---

## ଆଲର୍ଟିଂ

### ଅନ୍ତର୍ନିର୍ମିତ ଚ୍ୟାନେଲ୍

OmniRoute **3ଟି ଆଲର୍ଟ ଚ୍ୟାନେଲ୍** ସମର୍ଥନ କରେ:

| ଚ୍ୟାନେଲ୍           | ସେଟଅପ୍             | ବ୍ୟବହାର କ୍ଷେତ୍ର           |
| ------------------ | ------------------ | ------------------------- |
| ଡ୍ୟାସବୋର୍ଡ ବ୍ୟାନର୍ | ସର୍ବଦା ସକ୍ରିୟ      | ଆପ୍ ଭିତରେ ବିଜ୍ଞପ୍ତି       |
| Webhook            | URL ବିନ୍ୟାସ କରନ୍ତୁ | Slack, Discord, PagerDuty |
| ଲଗ୍                | ଡିଫଲ୍ଟ             | ବାହ୍ୟ ଲଗ୍ ଏଗ୍ରିଗେସନ୍ ପାଇଁ |

### Webhook ବିନ୍ୟାସ

> **ଟିପ୍ପଣୀ:** Webhook ଆଲର୍ଟିଂ ବିନ୍ୟାସ ଡ୍ୟାସବୋର୍ଡର Settings ପୃଷ୍ଠା ମାଧ୍ୟମରେ ପରିଚାଳିତ ହୁଏ। Webhook URL, ଇଭେଣ୍ଟ ଫିଲ୍ଟରିଂ ଏବଂ ପେଲୋଡ୍ କଷ୍ଟମାଇଜେସନ୍ ପାଇଁ Settings UI ଦେଖନ୍ତୁ।

### ଆଲର୍ଟ ପ୍ରକାର

| ଆଲର୍ଟ                        | କେବେ                                           | ଡିଫଲ୍ଟ ଗୁରୁତ୍ୱ |
| ---------------------------- | ---------------------------------------------- | -------------- |
| `provider_circuit_open`      | ସର୍କିଟ୍ ଖୋଲିଲେ                                 | ଗୁରୁତର         |
| `provider_circuit_half_open` | ସର୍କିଟ୍ ପୁନରୁଦ୍ଧାର ପରୀକ୍ଷା କରୁଥିଲେ             | ସୂଚନା          |
| `quota_warning`              | କୋଟା 80%+ ହେଲେ                                 | ଚେତାବନୀ        |
| `quota_exhausted`            | କୋଟା 100% ହେଲେ                                 | ଗୁରୁତର         |
| `token_refresh_failed`       | କ୍ରମାଗତ 3+ ରିଫ୍ରେଶ୍ ବିଫଳତା ହେଲେ                | ଚେତାବନୀ        |
| `token_expired`              | ଟୋକନ୍ର ମିଆଦ ଶେଷ ହୋଇଗଲେ                         | ଗୁରୁତର         |
| `combo_target_unhealthy`     | କମ୍ବୋ ଟାର୍ଗେଟ୍ 1 ଘଣ୍ଟା+ ପାଇଁ କୁଲ୍ଡାଉନ୍ରେ ରହିଲେ | ଚେତାବନୀ        |
| `db_integrity_warning`       | FK ଉଲ୍ଲଂଘନ > 0 ହେଲେ                            | ଚେତାବନୀ        |
| `heap_pressure`              | ହିପ୍ ବ୍ୟବହାର ଥ୍ରେସହୋଲ୍ଡର 80%ରୁ ଅଧିକ ହେଲେ       | ଚେତାବନୀ        |

---

## କାର୍ଯ୍ୟଦକ୍ଷତା ମେଟ୍ରିକ୍ସ

### ଟ୍ରାକ୍ କରାଯାଉଥିବା ମେଟ୍ରିକ୍ସ

| ମେଟ୍ରିକ୍                | ପ୍ରକାର       | ଉତ୍ସ                            |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | କାଉଣ୍ଟର୍     | `services/usage.ts`             |
| `request_latency_ms`    | ହିଷ୍ଟୋଗ୍ରାମ୍ | `services/usage.ts`             |
| `tokens_consumed`       | କାଉଣ୍ଟର୍     | `services/usage.ts`             |
| `cost_usd`              | କାଉଣ୍ଟର୍     | `services/usage.ts`             |
| `provider_errors`       | କାଉଣ୍ଟର୍     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | କାଉଣ୍ଟର୍     | `services/resilience.ts`        |
| `cache_hits`            | କାଉଣ୍ଟର୍     | `services/signatureCache.ts`    |
| `compression_savings`   | ହିଷ୍ଟୋଗ୍ରାମ୍ | `services/compression/stats.ts` |
| `quota_used`            | ଗେଜ୍         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ଗେଜ୍         | `observability.ts`              |

### ବିଳମ୍ବ ପ୍ରତିଶତକ (p50/p95/p99)

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ବିଳମ୍ବ ପ୍ରତିଶତକ ତଥ୍ୟ ଡ୍ୟାସବୋର୍ଡର `/dashboard/health` ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଉପଲବ୍ଧ। Prometheus/OpenTelemetry ଏକ୍ସପୋର୍ଟ v3.9 ପାଇଁ ଯୋଜନା କରାଯାଇଛି।

### Prometheus / OpenTelemetry ଏକ୍ସପୋର୍ଟ (ପର୍ଯ୍ୟାୟ 2)

v3.9 ପାଇଁ ଯୋଜନା କରାଯାଇଛି: Prometheus, OpenTelemetry, Datadogକୁ ନେଟିଭ୍ ଏକ୍ସପୋର୍ଟ।

ବର୍ତ୍ତମାନ ପାଇଁ, ଯେକୌଣସି HTTP-ଆଧାରିତ ମନିଟରିଂ ସିଷ୍ଟମ୍ (Prometheus blackbox exporter, Datadog HTTP check ଇତ୍ୟାଦି) ସହିତ `/api/monitoring/health` ସ୍କ୍ରେପ୍ କରନ୍ତୁ।

---

## ଆଲର୍ଟିଂ ପ୍ରଣାଳୀ

### Slack

> **ଟିପ୍ପଣୀ:** Webhook ଆଲର୍ଟିଂ ଡ୍ୟାସବୋର୍ଡର Settings ପୃଷ୍ଠା ମାଧ୍ୟମରେ କନଫିଗର୍ କରାଯାଏ — କୌଣସି ଉତ୍ସର୍ଗୀକୃତ webhook ପରିବେଶ ଭେରିଏବଲ୍ ନାହିଁ (`grep -rn` ଶୂନ୍ୟ ମେଳ ଫେରାଏ)। webhook URL, ଇଭେଣ୍ଟ ଫିଲ୍ଟରିଂ ଏବଂ payload କଷ୍ଟମାଇଜେସନ୍ ପାଇଁ Settings UI ଦେଖନ୍ତୁ।

### Discord

> Webhook ଆଲର୍ଟିଂ Slack ପରି ସମାନ Settings UI ପ୍ରବାହ ବ୍ୟବହାର କରେ। Discord ସମାନ JSON payload ଆକୃତି ଗ୍ରହଣ କରେ।

### PagerDuty

> Webhook ଆଲର୍ଟିଂ ସମାନ Settings UI ପ୍ରବାହ ବ୍ୟବହାର କରେ। PagerDuty Events API v2 ରାଉଟିଂ କୀଗୁଡ଼ିକ Settings UIରେ କନଫିଗର୍ କରାଯାଏ।

### କଷ୍ଟମ୍ Webhook (JSON)

> JSON ବଡି ସହିତ POST ଗ୍ରହଣ କରୁଥିବା ଯେକୌଣସି HTTP ଏଣ୍ଡପଏଣ୍ଟ କାମ କରିବ। Settings UIରେ URL କନଫିଗର୍ କରନ୍ତୁ।

---

## ଡ୍ୟାସବୋର୍ଡ କନଫିଗରେସନ୍

### ସ୍ୱାସ୍ଥ୍ୟ ଡ୍ୟାସବୋର୍ଡକୁ କଷ୍ଟମାଇଜ୍ କରନ୍ତୁ

ଏକ `~/.omniroute/dashboard.json` ସୃଷ୍ଟି କରନ୍ତୁ:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ଏକ ପ୍ରଦାନକାରୀଙ୍କୁ ଶୀର୍ଷରେ ପିନ୍ କରନ୍ତୁ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ସମସ୍ୟା ନିବାରଣ

### "ପ୍ରଦାନକାରୀ ସୁସ୍ଥ ବୋଲି କହୁଛି, କିନ୍ତୁ ଅନୁରୋଧଗୁଡ଼ିକ ବିଫଳ ହେଉଛି"

1. **autopilot ସମସ୍ୟାଗୁଡ଼ିକ** ଯାଞ୍ଚ କରନ୍ତୁ — ହୁଏତ କୌଣସି ମଡେଲ୍ ଲକ୍ ଆଉଟ୍ ହୋଇଛି
2. ନିର୍ଦ୍ଦିଷ୍ଟ ତ୍ରୁଟି ଶ୍ରେଣୀ ପାଇଁ **ସାମ୍ପ୍ରତିକ ତ୍ରୁଟିଗୁଡ଼ିକ** ଦେଖନ୍ତୁ
3. ପ୍ରଦାନକାରୀ କାର୍ଡରେ **ସଂଯୋଗ ପରୀକ୍ଷା** କରି ଦେଖନ୍ତୁ
4. ପ୍ରଦାନକାରୀ **upstreamରେ rate-limited** ଅଛନ୍ତି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ (ସ୍ଥାନୀୟ ଭାବରେ ଦୃଶ୍ୟମାନ ନୁହେଁ)

### "କୋଟା ସୁସ୍ଥ ବୋଲି କହୁଛି, କିନ୍ତୁ ମୁଁ 429 ଦେଖୁଛି"

- 429ର ଅର୍ଥ ହେଉଛି ପ୍ରଦାନକାରୀଙ୍କ ଅନୁସାରେ ଆପଣ ନିଜ କୋଟା ବ୍ୟବହାର କରିସାରିଛନ୍ତି
- OmniRouteର କୋଟା ଟ୍ରାକିଂ **ପୁରୁଣା** ହୋଇପାରେ — ପ୍ରଦାନକାରୀଙ୍କ upstream ତଥ୍ୟ ହିଁ ପ୍ରାମାଣିକ
- ଆଭ୍ୟନ୍ତରୀଣ କୋଟା ମନିଟର୍ ମାଧ୍ୟମରେ କୋଟା ତଥ୍ୟ ସ୍ୱୟଂଚାଳିତ ଭାବେ ରିଫ୍ରେଶ୍ ହୁଏ

### "ସମସ୍ତ ଟାର୍ଗେଟ୍ ସୁସ୍ଥ ଦେଖାଯାଉଥିଲେ ମଧ୍ୟ କମ୍ବୋ ବିଫଳ ହେଉଛି"

- ଟାର୍ଗେଟ୍ କ୍ରମ ସମସ୍ୟା ପାଇଁ **କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ** ଡ୍ୟାସବୋର୍ଡ ଯାଞ୍ଚ କରନ୍ତୁ
- **fallback ଇଭେଣ୍ଟଗୁଡ଼ିକ** ଦେଖନ୍ତୁ — ହୁଏତ କମ୍ବୋଟି ଅତ୍ୟଧିକ ଶୀଘ୍ର ସମସ୍ତ ବିକଳ୍ପ ବ୍ୟବହାର କରିଦେଉଛି
- **କୌଶଳ** ଆପଣଙ୍କ ବ୍ୟବହାର ପରିସ୍ଥିତି ସହିତ ମେଳ ଖାଉଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ (priority ବନାମ round-robin ବନାମ auto)

### "ଡାଟାବେସ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ବିଫଳ ହେଉଛି"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ଚଲାନ୍ତୁ
- ଯଦି "ok" — ଏହା ଏକ ଭୁଲ୍ ସତର୍କତା, ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଅତ୍ୟଧିକ କଠୋର ହେଉଛି
- ଅନ୍ୟ କିଛି ହେଲେ — **OmniRoute ବନ୍ଦ କରନ୍ତୁ** ଏବଂ [ବିପର୍ଯ୍ୟୟ ପୁନରୁଦ୍ଧାର ଗାଇଡ୍](./DATABASE_GUIDE.md#disaster-recovery) ଅନୁସରଣ କରନ୍ତୁ

### "ମେମୋରି heap ଚାପ ଗୁରୁତର ଅଟେ"

```bash
# ବର୍ତ୍ତମାନର heap ଯାଞ୍ଚ କରନ୍ତୁ
node -e "console.log(process.memoryUsage())"

# ମାନୁଆଲ୍ GC ଟ୍ରିଗର୍ କରନ୍ତୁ (ଯଦି --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ସମକାଳୀନ ଅନୁରୋଧ ସଂଖ୍ୟା କମାନ୍ତୁ (ଏକ env var ନୁହେଁ, ଡ୍ୟାସବୋର୍ଡର Settings ପୃଷ୍ଠା ମାଧ୍ୟମରେ ସେଟ୍ କରନ୍ତୁ)
# କୌଣସି `MAX_CONCURRENT_REQUESTS` env var ନାହିଁ — ଏହାକୁ Settings → Concurrencyରେ କନଫିଗର୍ କରନ୍ତୁ।
```

---

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ବ୍ୟବହାର ଏବଂ ଖର୍ଚ୍ଚ ଟ୍ରାକିଂ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB ସ୍କିମା + ସ୍ୱାସ୍ଥ୍ୟ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ପ୍ରକ୍ସି ସ୍ୱାସ୍ଥ୍ୟ (ପୃଥକ କ୍ୟାଶ୍)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର୍
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ସର୍କିଟ୍ ବ୍ରେକର୍ର ବିବରଣୀ
- ଉତ୍ସ: `src/lib/monitoring/` (4ଟି ଫାଇଲ୍, 2121 LOC)
