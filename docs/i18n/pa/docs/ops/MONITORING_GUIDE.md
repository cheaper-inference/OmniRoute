# Monitoring & Observability Guide (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute ਵਿੱਚ ਅੰਦਰੂਨੀ ਸਿਹਤ ਨਿਗਰਾਨੀ, ਪ੍ਰਦਾਤਾ ਆਟੋਪਾਇਲਟ, ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ ਅਤੇ ਪਰਵੇਖਣਯੋਗਤਾ ਹੁੱਕ ਸ਼ਾਮਲ ਹਨ। ਇਹ ਗਾਈਡ ਡੈਸ਼ਬੋਰਡ, ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਸਮੱਸਿਆ-ਨਿਵਾਰਣ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿੰਦੀ ਹੈ।

**ਸਰੋਤ:**

- `src/lib/monitoring/observability.ts` — ਪਰਵੇਖਣਯੋਗਤਾ ਸਨੈਪਸ਼ਾਟ
- `src/lib/monitoring/comboHealthAutopilot.ts` — ਕੌਂਬੋ ਸਿਹਤ ਆਟੋਪਾਇਲਟ
- `src/lib/monitoring/providerHealthAutopilot.ts` — ਪ੍ਰਦਾਤਾ ਆਟੋਪਾਇਲਟ
- `src/lib/monitoring/providerHealthMatrix.ts` — ਪ੍ਰਦਾਤਾ ਸਿਹਤ ਮੈਟ੍ਰਿਕਸ
- `src/lib/localHealthCheck.ts` — ਸਥਾਨਕ ਸਿਹਤ ਜਾਂਚ
- `src/lib/tokenHealthCheck.ts` — ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼ ਸਿਹਤ
- `src/lib/proxyHealth.ts` — ਪ੍ਰੌਕਸੀ ਸਿਹਤ ਕੈਸ਼ (PROXY_GUIDE.md ਵਿੱਚ ਸ਼ਾਮਲ)

---

## ਸੰਖੇਪ ਜਾਣਕਾਰੀ

OmniRoute ਵਿੱਚ **ਨਿਗਰਾਨੀ ਦੀਆਂ 3 ਪਰਤਾਂ** ਹਨ:

```
┌──────────────────────────────────────────────────────────────┐
│  ਪਰਤ 1: ਸਿਸਟਮ ਸਿਹਤ (ਸਰਵਰ-ਪੱਧਰ)                              │
│  ├─ localHealthCheck.ts — DB, ਪੋਰਟ, ਨੇਟਿਵ ਨਿਰਭਰਤਾਵਾਂ         │
│  ├─ db/healthCheck.ts — ਅਖੰਡਤਾ, FK, ਅਨਾਥ ਆਰਟੀਫੈਕਟ            │
│  └─ ਡੈਸ਼ਬੋਰਡ: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  ਪਰਤ 2: ਪ੍ਰਦਾਤਾ ਸਿਹਤ (ਹਰੇਕ ਪ੍ਰਦਾਤਾ ਲਈ ਲਚਕੀਲਾਪਣ)               │
│  ├─ providerHealthAutopilot.ts — ਸਰਕਟ ਬ੍ਰੇਕਰ, ਕੂਲਡਾਊਨ         │
│  ├─ providerHealthMatrix.ts — ਪ੍ਰਦਾਤਾ/ਮਾਡਲ ਅਨੁਸਾਰ ਸਿਹਤ ਸਕੋਰ  │
│  └─ ਡੈਸ਼ਬੋਰਡ: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  ਪਰਤ 3: ਲਾਈਵ ਪਰਵੇਖਣਯੋਗਤਾ (ਰਨਟਾਈਮ ਸਨੈਪਸ਼ਾਟ)                  │
│  ├─ observability.ts — ਸਰਕਟ ਬ੍ਰੇਕਰ, ਸੈਸ਼ਨ, ਕੋਟਾ                │
│  ├─ tokenHealthCheck.ts — OAuth ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼ ਸਿਹਤ            │
│  └─ MCP ਟੂਲ: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ

### `/dashboard/health` (ਸਿਸਟਮ ਸਿਹਤ)

ਉੱਚ-ਪੱਧਰੀ ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ:

| ਭਾਗ               | ਇਹ ਕੀ ਦਿਖਾਉਂਦਾ ਹੈ                                     |
| ----------------- | ----------------------------------------------------- |
| **ਸਰਵਰ ਸਥਿਤੀ**    | ਅੱਪਟਾਈਮ, ਵਰਜਨ, ਪੋਰਟ, ਸਰਗਰਮ ਕਨੈਕਸ਼ਨ                    |
| **ਡੇਟਾਬੇਸ**       | ਕਨੈਕਸ਼ਨ, ਅਖੰਡਤਾ, WAL ਆਕਾਰ, ਹਾਲੀਆ ਮਾਈਗ੍ਰੇਸ਼ਨ           |
| **ਪ੍ਰਦਾਤਾ ਸੰਖੇਪ** | ਸਰਗਰਮ ਗਿਣਤੀ, ਸਿਹਤਮੰਦ ਗਿਣਤੀ, ਖੁੱਲ੍ਹੇ ਬ੍ਰੇਕਰਾਂ ਦੀ ਗਿਣਤੀ |
| **ਕੋਟਾ ਮਾਨੀਟਰ**   | ਸਰਗਰਮ ਸੈਸ਼ਨ, ਚੇਤਾਵਨੀ ਸਥਿਤੀ, ਸਮਾਪਤ ਕੋਟਾ                |
| **ਹਾਲੀਆ ਗਲਤੀਆਂ**  | ਸਟੈਕ ਟ੍ਰੇਸ ਸਮੇਤ ਆਖਰੀ 10 ਗਲਤੀਆਂ                        |
| **ਸਰੋਤ ਵਰਤੋਂ**    | ਮੈਮੋਰੀ, CPU, ਹੀਪ ਦਬਾਅ ਸੂਚਕ                            |

### `/dashboard/providers` (ਪ੍ਰਦਾਤਾ ਸਿਹਤ)

ਹਰੇਕ ਪ੍ਰਦਾਤਾ ਲਈ ਡੈਸ਼ਬੋਰਡ:

| ਕਾਲਮ    | ਵੇਰਵਾ                                                   |
| ------- | ------------------------------------------------------- |
| ਪ੍ਰਦਾਤਾ | ਪ੍ਰਦਾਤਾ ID + ਡਿਸਪਲੇ ਨਾਮ                                 |
| ਸਿਹਤ    | ਹਰੀ/ਪੀਲੀ/ਲਾਲ ਸਥਿਤੀ                                      |
| ਸਰਕਟ    | ਖੁੱਲ੍ਹੀ/ਬੰਦ/ਅੱਧ-ਖੁੱਲ੍ਹੀ ਸਥਿਤੀ                           |
| ਕਨੈਕਸ਼ਨ | ਕਨੈਕਸ਼ਨਾਂ ਦੀ ਗਿਣਤੀ, ਆਖਰੀ ਰਿਫ੍ਰੈਸ਼                       |
| ਮਾਡਲ    | ਉਪਲਬਧ ਮਾਡਲ, ਹਰੇਕ ਮਾਡਲ ਦੀ ਸਿਹਤ                           |
| ਲਾਗਤ    | ਅੱਜ ਦੀ ਲਾਗਤ, 7-ਦਿਨਾਂ ਦਾ ਰੁਝਾਨ                           |
| ਗਲਤੀਆਂ  | ਪਿਛਲੇ 24 ਘੰਟਿਆਂ ਦੀਆਂ ਗਲਤੀਆਂ ਦੀ ਗਿਣਤੀ, ਪ੍ਰਮੁੱਖ ਗਲਤੀ ਕਲਾਸ |

ਇਹ ਦੇਖਣ ਲਈ ਕਿਸੇ ਪ੍ਰਦਾਤਾ 'ਤੇ ਕਲਿੱਕ ਕਰੋ:

- ਲੇਟੈਂਸੀ ਦੇ ਵਿਸਤ੍ਰਿਤ ਵੇਰਵੇ ਸਮੇਤ ਹਾਲੀਆ ਬੇਨਤੀਆਂ
- ਹਰੇਕ ਕਨੈਕਸ਼ਨ ਦੇ ਸਿਹਤ ਸਕੋਰ
- ਹਰੇਕ ਮਾਡਲ ਲਈ ਲੌਕਆਊਟ
- ਆਟੋਪਾਇਲਟ ਸਿਫ਼ਾਰਸ਼ਾਂ

### `/dashboard/quota` (ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ)

ਹਰੇਕ API ਕੁੰਜੀ ਲਈ:

- ਮੌਜੂਦਾ ਵਰਤੋਂ ਬਨਾਮ ਸੀਮਾ (ਪ੍ਰਗਤੀ ਪੱਟੀ)
- ਕੋਟਾ ਰੁਝਾਨ (30-ਦਿਨਾਂ ਦਾ ਚਾਰਟ)
- ਅਗਲਾ ਰੀਸੈੱਟ ਸਮਾਂ
- ਚੇਤਾਵਨੀ ਇਤਿਹਾਸ

### `/dashboard/combos` (ਕੌਂਬੋ ਸਿਹਤ)

ਹਰੇਕ ਕੌਂਬੋ ਲਈ:

- ਰਣਨੀਤੀ + ਟੀਚੇ
- ਹਰੇਕ ਟੀਚੇ ਦੀ ਸਿਹਤ
- ਹਾਲੀਆ ਫਾਲਬੈਕ ਘਟਨਾਵਾਂ
- ਸਫਲਤਾ ਦਰ (24 ਘੰਟੇ, 7 ਦਿਨ, 30 ਦਿਨ)

---

## ਸਿਹਤ ਜਾਂਚ API

OmniRoute ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ** ਦੋ** HTTP ਸਿਹਤ ਸਤਹ. ਉਹ ਆਰਕੈਸਟਰੇਟਰਾਂ ਲਈ ਬਦਲਣਯੋਗ ਨਹੀਂ ਹਨ।

| ਮਾਰਗ                         | ਮਕਸਦ                                                          | ਭਾਰ                             | ਲਈ ਵਰਤੋਂ                                                                    |
| ---------------------------- | ------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------- |
| `GET /healthz`               | ਲਾਈਫਸਾਈਕਲ liveness/readiness (`ok` / `starting` / `stopping`) | ਮਾਮੂਲੀ (ਸਿਰਫ਼ ਪੜਾਅ ਫਲੈਗ)        | ਕੁਬਰਨੇਟਸ** ਤਿਆਰੀ** ; ਨਰਮ** ਜੀਵੰਤਤਾ** ਜੇਕਰ ਤੁਹਾਨੂੰ HTTP ਵਰਤੋਂ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ |
| `GET /api/monitoring/health` | ਡੀਪ ਸਿਸਟਮ + ਪ੍ਰਦਾਤਾ ਸੰਖੇਪ (DB, ਹੀਪ, ਕੈਟਾਲਾਗ ਗਿਣਤੀ, …)         | ਭਾਰੀ (ਸਿੰਕ DB / ਨਿਗਰਾਨੀ ਦਾ ਕੰਮ) | ਡੈਸ਼ਬੋਰਡ, ਬਲੈਕਬਾਕਸ ਡੂੰਘੀ ਜਾਂਚ, Docker ਦਾ ਬਿਲਟ-ਇਨ ਹੈਲਥ ਚੈਕ                   |

> **ਨੋਟ:** ਪ੍ਰਦਾਤਾ ਸਿਹਤ ਮੈਟ੍ਰਿਕਸ, ਆਟੋਪਾਇਲਟ ਮੁੱਦੇ, ਕੋਟਾ ਮਾਨੀਟਰ, ਟੋਕਨ ਹੈਲਥ, ਅਤੇ `/api/monitoring/health` ਤੋਂ ਪਰੇ ਲੇਟੈਂਸੀ ਵੇਰਵੇ ਇਸ ਰਾਹੀਂ ਉਪਲਬਧ ਹਨ।**MCP ਟੂਲ** `observability_snapshot` ਜਾਂ** ਡੈਸ਼ਬੋਰਡ** ਪੰਨੇ — ਉਹਨਾਂ ਲਈ ਕੋਈ ਸਮਰਪਿਤ REST ਰਸਤੇ ਨਹੀਂ ਹਨ।

'ਤੇ ਦੋਵੇਂ ਰੂਟ ਚੱਲਦੇ ਹਨ** ਸਮਾਨ ਨੋਡ ਇਵੈਂਟ ਲੂਪ** ਬੇਨਤੀ ਨੂੰ ਸੰਭਾਲਣ ਦੇ ਤੌਰ ਤੇ. ਇੱਕ CPU-ਬਾਊਂਡ ਮਾਰਗ (ਵੱਡਾ `GET /v1/models` ਕੈਟਾਲਾਗ ਕੰਮ, ਲੰਬੇ-ਸੰਦਰਭ ਕੰਪਰੈਸ਼ਨ / ਟੋਕਨ ਗਿਣਤੀ) ਵਿੱਚ ਦੇਰੀ ਹੋ ਸਕਦੀ ਹੈ** ਸਾਰੇ** HTTP ਹੈਂਡਲਰ, `/healthz` ਸਮੇਤ। ਇਵੈਂਟ-ਲੂਪ ਵਿਅਸਤ ≠ ਪ੍ਰਕਿਰਿਆ ਖਤਮ ਹੋ ਗਈ ਹੈ। ਹੌਗ ਨੂੰ ਠੀਕ ਕਰਨ ਨੂੰ ਤਰਜੀਹ; ਪੜਤਾਲ ਟਿਊਨਿੰਗ ਸਿਰਫ ਝੂਠੇ ਕਤਲਾਂ ਨੂੰ ਘਟਾਉਂਦੀ ਹੈ।

### ਲਾਈਟਵੇਟ ਆਰਕੈਸਟਰੇਟਰ ਪੜਤਾਲ

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` ਜਦੋਂ ਸਰਵਰ ਜੀਵਨ ਚੱਕਰ ਪੜਾਅ ਤਿਆਰ ਹੁੰਦਾ ਹੈ
- **503** ਬੂਟ ਜਾਂ ਬੰਦ ਦੌਰਾਨ + `starting` / `stopping`
- ਲਾਗੂ ਕਰਨਾ: `src/app/healthz/route.ts` (ਕੋਈ DB ਪਿੰਗ ਨਹੀਂ)

### ਸਿਸਟਮ ਦੀ ਸਿਹਤ (ਡੂੰਘੀ)

```bash
GET /api/monitoring/health
```

ਜਵਾਬ:

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

#### `credentialHealth`: ਪੜਤਾਲ-ਕੈਸ਼ ਬਨਾਮ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ਹੈ** ਇਨ-ਮੈਮੋਰੀ ਪੜਤਾਲ-ਕੈਸ਼ ਗੇਜ** , `provider_connections.test_status` ਦਾ ਲਾਈਵ ਡੰਪ ਨਹੀਂ। #12532 ਤੋਂ ਬਾਅਦ ਬੇਨਤੀ ਮਾਰਗ ਸਿਰਫ `getCachedCredentialHealthSummary()` ਪੜ੍ਹਦਾ ਹੈ; ਬੈਕਗਰਾਊਂਡ ਪੜਤਾਲਾਂ ਇਵੈਂਟ ਲੂਪ ਤੋਂ ਕੈਸ਼ ਨੂੰ ਤਾਜ਼ਾ ਕਰਦੀਆਂ ਹਨ।

| ਪਰਤ                 | ਜਿੱਥੇ                                                                 | ਇਸਦਾ ਕੀ ਮਤਲਬ ਹੈ                                                                                                                                                                                                                |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ਪੜਤਾਲ-ਕੈਸ਼ ਗੇਜ      | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ਆਖਰੀ ਪ੍ਰਮਾਣ-ਪੱਤਰ-ਸਿਹਤ ਜਾਂਚ ਦੇ ਨਤੀਜੇ ਅਜੇ ਵੀ ਪ੍ਰਕਿਰਿਆ ਮੈਮੋਰੀ ਵਿੱਚ ਰੱਖੇ ਗਏ ਹਨ। `source` ਹਮੇਸ਼ਾ `probe-cache` ਹੁੰਦਾ ਹੈ।                                                                                                            |
| ਅਸਫਲ ਕਨੈਕਸ਼ਨ ਵੇਰਵੇ  | `credentialHealth.failedConnections`                                  | ਮੌਜੂਦ** ਕੇਵਲ ਉਦੋਂ ਜਦੋਂ `failed > 0`** . `status=error` (`connectionId`, `status`, ਸੈਨੀਟਾਈਜ਼ਡ `lastError` / `lastErrorType`) ਨਾਲ ਕੈਸ਼ ਕਤਾਰਾਂ ਦੀ ਸੀਮਾਬੱਧ ਸੂਚੀ। `failedOmitted` ਸੈੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਸੂਚੀ ਨੂੰ ਕੈਪ ਕੀਤਾ ਗਿਆ ਸੀ। |
| SQLite ਸਟਿੱਕੀ ਸਥਿਤੀ | `credentialHealth.staleDbNonOkCount`                                  | ਦੀ ਗਿਣਤੀ** ਕਿਰਿਆਸ਼ੀਲ** (`is_active=1`) ਕੁਨੈਕਸ਼ਨ ਕਤਾਰਾਂ ਜਿਹਨਾਂ ਦੀ ਨਿਰੰਤਰ `test_status` ਇੱਕ ਜਾਣੀ ਜਾਂਦੀ ਗੈਰ-ਓਕੇ (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) ਹੈ।                             |

ਦੋ ਪਰਤਾਂ ਮਕਸਦ 'ਤੇ ਅਸਹਿਮਤ ਹੋ ਸਕਦੀਆਂ ਹਨ:

- ਗੇਜ `failed=0` ਜਦਕਿ `staleDbNonOkCount>0` — SQLite ਵਿੱਚ ਅਜੇ ਵੀ ਇੱਕ ਸਟਿੱਕੀ `test_status` ਹੈ (ਉਦਾਹਰਨ ਲਈ `expired` ਜਾਂ `credits_exhausted`) ਜੋ ਕਿ ਨਵੀਨਤਮ ਪੜਤਾਲ-ਕੈਸ਼ ਸਨੈਪਸ਼ਾਟ ਨੂੰ `status=error` ਵਜੋਂ ਨਹੀਂ ਗਿਣਿਆ ਜਾਂਦਾ ਹੈ।
- ਗੇਜ `failed>0` ਜਦੋਂ ਕਿ SQLite ਸਿਹਤਮੰਦ — ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ, ਇੱਕ ਤਾਜ਼ਾ ਪੜਤਾਲ ਫੇਲ੍ਹ ਹੋਈ ਹੈ ਅਤੇ ਕੈਸ਼ ਕੀਤੀ ਗਈ ਹੈ; DB ਕਤਾਰ ਨੂੰ ਅੱਪਡੇਟ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ, ਜਾਂ ਬਾਅਦ ਵਿੱਚ ਸਾਫ਼ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ।

ਇਸ ਅੰਤਮ ਬਿੰਦੂ ਨੂੰ ਸਕ੍ਰੈਪ ਕਰਨ ਵੇਲੇ ਸਿਰਫ਼ `provider_connections.test_status` ਤੇ ਚੇਤਾਵਨੀ ਨਾ ਦਿਓ। ਲਾਈਵ ਪੜਤਾਲ ਅਸਫਲਤਾਵਾਂ ਲਈ `failed` + `failedConnections` ਦੀ ਵਰਤੋਂ ਕਰੋ, ਅਤੇ `staleDbNonOkCount` ਵਰਤੋਂ ਕਰੋ ਜਦੋਂ ਤੁਹਾਨੂੰ ਸਥਿਰ ਸਟਿੱਕੀ-ਸਟੇਟਸ ਗਿਣਤੀ ਦੀ ਲੋੜ ਹੋਵੇ।

### Kubernetes ਪੜਤਾਲ ਸਿਫ਼ਾਰਸ਼ਾਂ

OmniRoute ਹੈ** ਸਿੰਗਲ ਨੋਡ ਪ੍ਰਕਿਰਿਆ** (ਇੱਕ ਇਵੈਂਟ ਲੂਪ) ਸਟਾਕ Docker `HEALTHCHECK` ਹਲਕੇ `/healthz` ਨੂੰ ਨਿਸ਼ਾਨਾ ਬਣਾਉਂਦਾ ਹੈ। `/api/monitoring/health` ਹੈ** ਬਹੁਤ ਭਾਰੀ** ਕੁਬੇਲੇਟ ਲਾਈਵਨੇਸ ਅੰਤਰਾਲਾਂ ਲਈ।

| ਪੜਤਾਲ          | ਸਿਫਾਰਸ਼ੀ ਟੀਚਾ                                                               | ਨੋਟਸ                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ਸ਼ੁਰੂ ਕਰਣਾ** | ਲੰਬੇ `failureThreshold` (ਜਾਂ ਵੱਡੇ `startPeriod`) ਦੇ ਨਾਲ HTTP `GET /healthz` | ਕੋਲਡ ਸਟਾਰਟ + SQLite ਮਾਈਗ੍ਰੇਸ਼ਨ ਕੁਝ ਸਕਿੰਟਾਂ ਤੋਂ ਵੱਧ ਹੋ ਸਕਦਾ ਹੈ                                                                                                                                                                                                                                                                                                  |
| **ਤਤਪਰਤਾ**     | HTTP `GET /healthz`                                                         | ਜੀਵਨ ਚੱਕਰ `ok` / `starting` / `stopping` (200 ਬਨਾਮ 503)। ਜੇਕਰ ਲੂਪ CPU-ਬਲਾਕ ਹੈ ਤਾਂ ਵੀ ਫਲੈਪ ਹੁੰਦਾ ਹੈ। ਏ** ਕਈ ਸਕਿੰਟਾਂ ਵਿੱਚ 200 ਸਿਹਤਮੰਦ ਨਹੀਂ ਹੈ** (#10303) — ਇਸਦਾ ਮਤਲਬ ਹੈ ਕਿ 3-ਬਾਈਟ ਹੈਂਡਲਰ ਦੇ ਚੱਲਣ ਤੋਂ ਪਹਿਲਾਂ ਈਵੈਂਟ ਲੂਪ ਭੁੱਖਾ ਸੀ                                                                                                                                   |
| **ਜੀਵੰਤਤਾ**    | HTTP `GET /livez`,** ਜਾਂ TCP** ਮੁੱਖ ਸੇਵਾ ਪੋਰਟ ਉੱਤੇ (`PORT`, ਡਿਫਾਲਟ `20128`) | `/livez` ਸਿਰਫ਼ ਪ੍ਰਕਿਰਿਆ-ਜ਼ਿੰਦਾ ਹੈ (ਹਮੇਸ਼ਾ 200 ਜੇਕਰ ਹੈਂਡਲਰ ਚੱਲਦਾ ਹੈ)। ਇਹ ਅਜੇ ਵੀ ਇਵੈਂਟ ਲੂਪ — ਬਿਜ਼ੀ ≠ ਡੈੱਡ ਨੂੰ ਸਾਂਝਾ ਕਰਦਾ ਹੈ, ਅਤੇ ਇਹ TCP ਤੋਂ ਬਿਹਤਰ ਇਵੈਂਟ-ਲੂਪ ਭੁੱਖਮਰੀ (#10303) ਦਾ ਪਤਾ ਨਹੀਂ ਲਗਾਉਂਦਾ ਹੈ। ਤਰਜੀਹ**TCP** ਜੇਕਰ HTTP ਜਾਂਚ catalog/compression ਲੋਡ ਦੇ ਅਧੀਨ ਸਮਾਂ ਖਤਮ ਹੋ ਜਾਂਦੀ ਹੈ; ਕਰਦੇ ਹਨ** ਨਹੀਂ** ਕਿਸੇ ਵੀ ਤਰੀਕੇ ਨਾਲ ਛੋਟੇ ਈਵੈਂਟ-ਲੂਪ ਸਟਾਲਾਂ 'ਤੇ ਪੌਡ ਨੂੰ ਮਾਰੋ |
| **ਡੂੰਘੀ ਸਿਹਤ** | ਇੱਕ ਬਾਹਰੀ ਚੈਕਰ ਤੋਂ`GET /api/monitoring/health`                              | kubelet `livenessProbe` / ਤੰਗ `readinessProbe` ਲਈ ਨਹੀਂ                                                                                                                                                                                                                                                                                                         |

ਉਦਾਹਰਨ ਆਕਾਰ (ਤੁਹਾਡੇ ਕੋਲਡ-ਸਟਾਰਟ ਅਤੇ ਕੰਪਰੈਸ਼ਨ ਲੋਡ ਲਈ ਥ੍ਰੈਸ਼ਹੋਲਡ ਐਡਜਸਟ ਕਰੋ):

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

**ਨਾਂ ਕਰੋ** ਬਿੰਦੂ kubelet** ਜੀਵੰਤਤਾ** `/api/monitoring/health` ਤੇ . ਉਹ ਮਾਰਗ ਅਸਲ DB/monitoring ਕੰਮ ਕਰਦਾ ਹੈ ਅਤੇ ਲੋਡ ਦੇ ਹੇਠਾਂ ਗਲਤ-ਸਕਾਰਾਤਮਕ ਹੋਵੇਗਾ।

ਸੰਬੰਧਿਤ: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (ਜਦੋਂ ਇਵੈਂਟ ਲੂਪ ਰੁੱਝਿਆ ਹੋਇਆ ਹੈ ਤਾਂ ਪੜਤਾਲ), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (ਕੈਟਲਾਗ ਪ੍ਰਾਈਸਿੰਗ ਹੋਗ), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (ਕੰਪਰੈਸ਼ਨ ਟੋਕਨ-ਕਾਉਂਟ ਹੌਗ)।

### ਸਿਸਟਮਡ ਵਾਚਡੌਗ (ਫਰੋਜ਼ਨ ਇਵੈਂਟ ਲੂਪ)

ਇੱਕ ਸਿਸਟਮਡ ਹੋਸਟ 'ਤੇ, OmniRoute ਸੇਵਾ ਪ੍ਰਬੰਧਕ ਨੂੰ ਦੱਸਦਾ ਹੈ ਜਦੋਂ ਇਹ ਤਿਆਰ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਪਿੰਗ ਕਰਦਾ ਰਹਿੰਦਾ ਹੈ, ਇਸਲਈ ਇੱਕ ਸਰਵਰ ਜਿਸਦਾ ਇਵੈਂਟ ਲੂਪ ਫਸਿਆ ਹੋਇਆ ਹੈ, ਬੰਦ ਹੋ ਜਾਂਦਾ ਹੈ ਅਤੇ ਚੁੱਪ ਰਹਿਣ ਦੀ ਬਜਾਏ ਮੁੜ ਚਾਲੂ ਹੋ ਜਾਂਦਾ ਹੈ। ਪਿੰਗ ਸਰਵਰ ਦੇ ਆਪਣੇ ਈਵੈਂਟ ਲੂਪ ਤੋਂ ਆਉਂਦੇ ਹਨ: ਜਦੋਂ ਇਹ ਬਲੌਕ ਕਰਦਾ ਹੈ, ਉਹ ਬੰਦ ਹੋ ਜਾਂਦੇ ਹਨ, ਅਤੇ ਇੱਕ ਵਾਰ `WatchdogSec` ਦੇ ਬਿਨਾਂ ਬੀਤ ਜਾਣ 'ਤੇ systemd ਸੇਵਾ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰਦਾ ਹੈ।

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) ਪਹਿਲਾਂ ਹੀ ਇਸ ਨਾਲ ਇੱਕ ਉਪਭੋਗਤਾ ਯੂਨਿਟ ਲਿਖਦਾ ਹੈ। ਇੱਕ ਯੂਨਿਟ ਜੋ ਤੁਸੀਂ ਖੁਦ ਲਿਖਦੇ ਹੋ (ਡਿਫਾਲਟ `Type=simple`) ਨੂੰ ਕੋਈ ਵਾਚਡੌਗ ਨਹੀਂ ਮਿਲਦਾ, ਇਸ ਲਈ ਇਹਨਾਂ ਲਾਈਨਾਂ ਨੂੰ ਇਸਦੇ `[Service]` ਭਾਗ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

ਜਨਰੇਟ ਕੀਤੀ ਯੂਨਿਟ `Restart=on-failure` ਸੈੱਟ ਕਰਦੀ ਹੈ, ਇਸਲਈ ਉਸ ਲਾਈਨ ਦੇ ਨਾਲ ਨਾਲ — ਵੀ ਸ਼ਾਮਲ ਕਰੋ ਇਸ ਤੋਂ ਬਿਨਾਂ ਵਾਚਡੌਗ ਇਸ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰਨ ਦੀ ਬਜਾਏ ਸਿਰਫ ਰੁਕੀ ਹੋਈ ਸੇਵਾ ਨੂੰ ਮਾਰ ਦਿੰਦਾ ਹੈ।

- `Type=notify`: ਜਦੋਂ ਸਰਵਰ `READY=1` ਭੇਜਦਾ ਹੈ ਤਾਂ ਸੇਵਾ "ਸ਼ੁਰੂ" ਹੁੰਦੀ ਹੈ, ਨਾ ਕਿ ਜਦੋਂ ਪ੍ਰਕਿਰਿਆ ਫੋਰਕ ਹੁੰਦੀ ਹੈ। `TimeoutStartSec` ਇੱਕ ਹੌਲੀ ਸ਼ੁਰੂਆਤ ਨੂੰ ਬੰਨ੍ਹਦਾ ਹੈ।
- `NotifyAccess=all`: ਪਿੰਗ ਸਰਵਰ ਪ੍ਰਕਿਰਿਆ ਦੁਆਰਾ ਭੇਜੇ ਜਾਂਦੇ ਹਨ, ਜੋ ਕਿ `omniroute serve` ਸੁਪਰਵਾਈਜ਼ਰ ਦਾ ਬੱਚਾ ਹੈ।
- `WatchdogSec`: ਪਿੰਗ ਹਰ 60 ਸਕਿੰਟਾਂ ਵਿੱਚ ਬਾਹਰ ਜਾਂਦੇ ਹਨ, ਇਸਲਈ ਵਰਤੋਂ ਕਰੋ** 120 ਜਾਂ ਵੱਧ** . ਛੋਟੇ ਮੁੱਲ ਇੱਕ ਸਿਹਤਮੰਦ ਸਰਵਰ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰਨਗੇ।
- ਫੋਰਗਰਾਉਂਡ ਵਿੱਚ `omniroute serve` ਚਲਾਓ। `--daemon` ਸਰਵਰ ਨੂੰ ਯੂਨਿਟ ਦੇ cgroup ਤੋਂ ਵੱਖ ਕਰਦਾ ਹੈ ਅਤੇ ਨੋਟੀਫਿਕੇਸ਼ਨ ਹੈਂਡਸ਼ੇਕ ਕਦੇ ਪੂਰਾ ਨਹੀਂ ਹੁੰਦਾ।

ਜਾਂਚ ਕਰੋ ਕਿ ਇਹ ਮੁੜ ਚਾਲੂ ਹੋਣ ਤੋਂ ਬਾਅਦ ਕਿਰਿਆਸ਼ੀਲ ਹੈ:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` ਕੌਂਫਿਗਰ ਕੀਤੀ ਦੇਰੀ ਦਿਖਾਉਂਦਾ ਹੈ ਅਤੇ `WatchdogTimestamp` ਹਰ ਮਿੰਟ ਅੱਗੇ ਵਧਦਾ ਹੈ। ਵਾਚਡੌਗ ਦੁਆਰਾ ਮੁੜ ਚਾਲੂ ਹੋਣ ਨੂੰ `Result=watchdog` ਵਜੋਂ ਰਿਕਾਰਡ ਕੀਤਾ ਗਿਆ ਹੈ। ਯੂਨਿਟ ਨੂੰ ਇਸ ਤਰ੍ਹਾਂ ਰੱਖਦੇ ਹੋਏ ਪਿੰਗਸ ਨੂੰ ਬੰਦ ਕਰਨ ਲਈ, `OMNIROUTE_DISABLE_SD_NOTIFY=1` ਸੈੱਟ ਕਰੋ; `NOTIFY_SOCKET` (ਟਰਮੀਨਲ, Docker, Electron, Windows) ਤੋਂ ਬਿਨਾਂ ਕੁਝ ਨਹੀਂ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ।

ਵਾਚਡੌਗ ਸਿਰਫ਼ ਜਾਂਚ ਕਰਦਾ ਹੈ ਕਿ ਇਵੈਂਟ ਲੂਪ ਚੱਲਦਾ ਰਹਿੰਦਾ ਹੈ। ਇੱਕ ਸਰਵਰ ਜੋ ਹੌਲੀ ਹੈ ਪਰ ਫਿਰ ਵੀ ਮੋੜ ਰਿਹਾ ਹੈ ਮੁੜ ਚਾਲੂ ਨਹੀਂ ਹੋਇਆ ਹੈ।

### ਵਿਕਲਪਿਕ ਬੇਨਤੀ-ਪਾਥ ਦਾ ਕੰਮ (ਮੈਮੋਰੀ, ਹੁਨਰ, ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼)

ਮੈਮੋਰੀ ਐਕਸਟਰੈਕਸ਼ਨ, ਸਕਿੱਲ ਇੰਜੈਕਸ਼ਨ, ਅਤੇ OAuth ਟੋਕਨ ਰਿਫਰੈਸ਼ ਸ਼ੇਅਰ ਕਰੋ** ਮੁੱਖ ਨੋਡ ਇਵੈਂਟ ਲੂਪ** `/healthz` ਨਾਲ ਉਹ ਡੈਸ਼ਬੋਰਡ-ਟੌਗਲ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਹਨ (`memoryEnabled`, `skillsEnabled`), ਵਰਕਰ ਪੂਲ ਨਹੀਂ। [Environment — ਇਵੈਂਟ-ਲੂਪ ਲਾਗਤ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ਦੇਖੋ।

### ਸਿਹਤ ਪ੍ਰਦਾਤਾ

> **ਕੋਈ REST ਅੰਤਮ ਬਿੰਦੂ ਨਹੀਂ।** ਪ੍ਰਦਾਤਾ ਸਿਹਤ ਡੇਟਾ MCP ਟੂਲ `observability_snapshot` ਜਾਂ ਡੈਸ਼ਬੋਰਡ `/dashboard/providers` ਪੰਨੇ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

### ਪ੍ਰਦਾਤਾ ਦਾ ਵੇਰਵਾ

> **ਕੋਈ REST ਅੰਤਮ ਬਿੰਦੂ ਨਹੀਂ।** ਪ੍ਰਤੀ-ਪ੍ਰਦਾਤਾ ਦਾ ਵੇਰਵਾ ਡੈਸ਼ਬੋਰਡ `/dashboard/providers` ਪੰਨੇ ਦੁਆਰਾ ਉਪਲਬਧ ਹੈ।

---

## ਪ੍ਰੋਵਾਈਡਰ ਹੈਲਥ ਆਟੋਪਾਇਲਟ

`providerHealthAutopilot.ts` ਮੋਡੀਊਲ ਇੱਕ **ਸਵੈ-ਮੁਰੰਮਤ ਪ੍ਰਣਾਲੀ** ਹੈ ਜੋ:

1. ਪ੍ਰੋਵਾਈਡਰ ਸਮੱਸਿਆਵਾਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ (ਸਰਕਿਟ ਖੁੱਲ੍ਹਾ ਹੋਣਾ, ਕੂਲਡਾਊਨ, ਲਾਕਆਉਟ, ਕੋਟਾ ਚੇਤਾਵਨੀਆਂ)
2. ਉਨ੍ਹਾਂ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ **ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈਆਂ** ਤਿਆਰ ਕਰਦਾ ਹੈ
3. ਵਿਕਲਪਿਕ ਤੌਰ 'ਤੇ ਘੱਟ-ਜੋਖਮ ਵਾਲੀਆਂ ਕਾਰਵਾਈਆਂ ਨੂੰ **ਆਪਣੇ-ਆਪ ਚਲਾਉਂਦਾ** ਹੈ

### ਪਤਾ ਲਗਾਈਆਂ ਜਾਣ ਵਾਲੀਆਂ ਸਮੱਸਿਆ ਕਿਸਮਾਂ

| ਸਮੱਸਿਆ ਦੀ ਕਿਸਮ               | ਗੰਭੀਰਤਾ | ਉਦਾਹਰਨ ਸਥਿਤੀ                              |
| ---------------------------- | ------- | ----------------------------------------- |
| `provider_circuit_open`      | ਨਾਜ਼ੁਕ  | 5 ਅਸਫਲਤਾਵਾਂ ਤੋਂ ਬਾਅਦ ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਖੁੱਲ੍ਹਾ |
| `provider_circuit_half_open` | ਚੇਤਾਵਨੀ | ਸਰਕਿਟ ਵੱਲੋਂ ਰਿਕਵਰੀ ਦੀ ਜਾਂਚ                |
| `connection_cooldown`        | ਚੇਤਾਵਨੀ | 429 ਤੋਂ ਬਾਅਦ ਕਨੈਕਸ਼ਨ ਕੂਲਡਾਊਨ ਵਿੱਚ         |
| `stale_connection_error`     | ਚੇਤਾਵਨੀ | ਆਖਰੀ ਰਿਫ੍ਰੈਸ਼ 30+ ਮਿੰਟ ਪਹਿਲਾਂ ਅਸਫਲ ਹੋਇਆ   |
| `terminal_connection_error`  | ਨਾਜ਼ੁਕ  | OAuth ਰੱਦ, ਕੁੰਜੀ ਅਵੈਧ                     |
| `inactive_connection`        | ਜਾਣਕਾਰੀ | ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਕਨੈਕਸ਼ਨ ਅਸਮਰੱਥ ਕੀਤਾ ਹੋਇਆ    |
| `model_lockout`              | ਚੇਤਾਵਨੀ | ਖ਼ਾਸ ਮਾਡਲ ਕਵਾਰੰਟੀਨ ਵਿੱਚ                   |
| `quota_monitor_warning`      | ਚੇਤਾਵਨੀ | ਕੋਟੇ ਦੀ 80%+ ਵਰਤੋਂ                        |

### ਤਿਆਰ ਕੀਤੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਕਾਰਵਾਈ ਕਿਸਮਾਂ

| ਕਾਰਵਾਈ                         | ਜੋਖਮ    | ਵੇਰਵਾ                                      |
| ------------------------------ | ------- | ------------------------------------------ |
| `clear_provider_breaker`       | ਦਰਮਿਆਨਾ | ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਨੂੰ ਬੰਦ ਸਥਿਤੀ ਵਿੱਚ ਰੀਸੈੱਟ ਕਰੋ |
| `clear_connection_cooldown`    | ਘੱਟ     | ਕਨੈਕਸ਼ਨ ਤੋਂ ਕੂਲਡਾਊਨ ਹਟਾਓ                   |
| `clear_stale_connection_error` | ਘੱਟ     | ਪੁਰਾਣਾ ਗਲਤੀ ਫਲੈਗ ਸਾਫ਼ ਕਰੋ                  |
| `clear_model_lockout`          | ਘੱਟ     | ਕਵਾਰੰਟੀਨ ਕੀਤੇ ਮਾਡਲ ਨੂੰ ਮੁੜ ਸਮਰੱਥ ਕਰੋ       |
| `reactivate_connection`        | ਦਰਮਿਆਨਾ | ਅਕਿਰਿਆਸ਼ੀਲ ਕੀਤੇ ਕਨੈਕਸ਼ਨ ਨੂੰ ਮੁੜ ਸਮਰੱਥ ਕਰੋ  |
| `deactivate_connection`        | ਉੱਚਾ    | ਸਮੱਸਿਆ ਵਾਲੇ ਕਨੈਕਸ਼ਨ ਨੂੰ ਅਸਮਰੱਥ ਕਰੋ         |

### API

> **ਕੋਈ REST ਐਂਡਪੁਆਇੰਟ ਨਹੀਂ ਹੈ।** ਆਟੋਪਾਇਲਟ ਸਮੱਸਿਆਵਾਂ MCP ਟੂਲ `observability_snapshot` ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਉਪਲਬਧ ਹਨ। ਆਟੋਪਾਇਲਟ ਅੰਦਰੂਨੀ ਤੌਰ 'ਤੇ ਚੱਲਦਾ ਹੈ; ਇਸਦਾ ਵਿਵਹਾਰ ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲਾਂ ਦੀ ਬਜਾਏ ਸੈਟਿੰਗਾਂ DB (ਹਰੇਕ ਕਨੈਕਸ਼ਨ ਦੇ `autopilotMode` ਫ਼ੀਲਡ) ਰਾਹੀਂ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ — ਕਿਸੇ ਆਟੋਪਾਇਲਟ-ਮੋਡ env var ਲਈ `grep -rn` ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਦਿੰਦਾ।

### ਆਟੋਪਾਇਲਟ ਮੋਡ

ਆਟੋਪਾਇਲਟ ਮੂਲ ਰੂਪ ਵਿੱਚ **ਮੈਨੁਅਲ ਮੋਡ** ਵਿੱਚ ਕੰਮ ਕਰਦਾ ਹੈ — ਇਹ ਸਮੱਸਿਆਵਾਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ ਅਤੇ ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈਆਂ ਤਿਆਰ ਕਰਦਾ ਹੈ, ਪਰ ਉਨ੍ਹਾਂ ਨੂੰ ਆਪਣੇ-ਆਪ ਲਾਗੂ ਨਹੀਂ ਕਰਦਾ। ਕਾਰਵਾਈਆਂ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਲਾਗੂ ਕੀਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।

---

## ਕੌਂਬੋ ਹੈਲਥ ਆਟੋਪਾਇਲਟ

`comboHealthAutopilot.ts`, ਪ੍ਰੋਵਾਈਡਰ ਆਟੋਪਾਇਲਟ ਦਾ **ਕੌਂਬੋ-ਵਿਸ਼ੇਸ਼** ਸਮਕੱਖ ਹੈ। ਇਹ:

- ਅਸਿਹਤਮੰਦ ਕੌਂਬੋਆਂ ਦਾ ਪਤਾ ਲਗਾਉਂਦਾ ਹੈ
- ਟਾਰਗੇਟਾਂ ਨੂੰ ਮੁੜ ਕ੍ਰਮਬੱਧ ਕਰਨ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕਰਦਾ ਹੈ
- ਖ਼ਰਾਬ ਟਾਰਗੇਟਾਂ ਨੂੰ ਅਸਮਰੱਥ ਕਰਨ ਦਾ ਸੁਝਾਅ ਦਿੰਦਾ ਹੈ
- N ਅਸਫਲਤਾਵਾਂ ਤੋਂ ਬਾਅਦ ਬੰਦ ਹੋ ਚੁੱਕੇ ਟਾਰਗੇਟਾਂ ਨੂੰ ਆਪਣੇ-ਆਪ ਹਟਾਉਂਦਾ ਹੈ

### ਕੌਂਬੋ ਸਮੱਸਿਆਵਾਂ ਦੀਆਂ ਉਦਾਹਰਨਾਂ

```
ਕੌਂਬੋ "always-on" (ਤਰਜੀਹ ਰਣਨੀਤੀ)
├─ ਟਾਰਗੇਟ 1: openai/gpt-5 (ਸਿਹਤਮੰਦ)
├─ ਟਾਰਗੇਟ 2: anthropic/claude-opus-4-6 (⚠️ 14:00 ਤੱਕ ਮਾਡਲ ਲਾਕਆਉਟ)
└─ ਟਾਰਗੇਟ 3: kiro/claude-sonnet-4-5 (ਸਿਹਤਮੰਦ)

ਸਿਫ਼ਾਰਸ਼ੀ ਕਾਰਵਾਈ: ਮੁੜ ਕ੍ਰਮਬੱਧ ਕਰੋ — ਲਾਕਆਉਟ ਦੀ ਮਿਆਦ ਖ਼ਤਮ ਹੋਣ ਤੱਕ kiro ਨੂੰ anthropic ਤੋਂ ਉੱਪਰ ਲਿਜਾਓ
```

---

## ਕੋਟਾ ਮਾਨੀਟਰ

`observability.ts`, ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਪ੍ਰੋਵਾਈਡਰਾਂ (Claude Code, Codex, GitHub Copilot) ਲਈ **ਪ੍ਰਤੀ-ਸੈਸ਼ਨ ਕੋਟਾ ਮਾਨੀਟਰ** ਉਪਲਬਧ ਕਰਾਉਂਦਾ ਹੈ:

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

### ਸਥਿਤੀਆਂ ਦੇ ਅਰਥ

| ਸਥਿਤੀ       | ਕਦੋਂ                     | UI ਕਾਰਵਾਈ                            |
| ----------- | ------------------------ | ------------------------------------ |
| `starting`  | ਸ਼ੁਰੂਆਤੀ ਪੋਲ ਜਾਰੀ ਹੈ     | ਸਪਿਨਰ                                |
| `idle`      | ਕੋਈ ਹਾਲੀਆ ਸਰਗਰਮੀ ਨਹੀਂ    | ਡੈਸ਼ਬੋਰਡ ਤੋਂ ਲੁਕਾਇਆ ਜਾਂਦਾ ਹੈ         |
| `healthy`   | 50% ਤੋਂ ਵੱਧ ਕੋਟਾ ਬਾਕੀ ਹੈ | ਹਰਾ ਬਿੰਦੂ                            |
| `warning`   | 50% ਤੋਂ ਘੱਟ ਕੋਟਾ ਬਾਕੀ ਹੈ | ਪੀਲੀ ਚੇਤਾਵਨੀ                         |
| `exhausted` | ਕੋਟਾ = 0%                | ਲਾਲ ਬਲਾਕ, ਅਗਲੇ ਪ੍ਰੋਵਾਈਡਰ ਵੱਲ ਰੂਟ ਕਰੋ |
| `error`     | ਪੋਲਿੰਗ ਅਸਫਲ ਹੋਈ          | ਲਾਲ ਬਿੰਦੂ, ਛੇਤੀ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ      |

### API

> **ਕੋਈ REST ਐਂਡਪੁਆਇੰਟ ਨਹੀਂ ਹੈ।** ਕੋਟਾ ਮਾਨੀਟਰ ਡਾਟਾ MCP ਟੂਲ `observability_snapshot` ਜਾਂ ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

---

## ਨਿਰੀਖਣਯੋਗਤਾ ਸਨੈਪਸ਼ਾਟ

MCP ਟੂਲ `observability_snapshot` AI ਏਜੰਟਾਂ ਲਈ ਇੱਕ **ਸੰਪੂਰਨ ਸਿਸਟਮ ਸਨੈਪਸ਼ਾਟ** ਵਾਪਸ ਕਰਦਾ ਹੈ:

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
  "quotaMonitors": {/* ਉੱਪਰ ਵੇਖੋ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ਏਜੰਟ ਇਸਦੀ ਵਰਤੋਂ **ਰੂਟਿੰਗ ਫ਼ੈਸਲੇ** ਲੈਣ ਲਈ ਕਰਦੇ ਹਨ — ਉਦਾਹਰਨ ਲਈ, "ਜੇ openai ਦਾ ਸਰਕਿਟ ਖੁੱਲ੍ਹਾ ਹੈ, ਤਾਂ ਪਹਿਲਾਂ anthropic ਵੱਲ ਰੂਟ ਕਰੋ"।

---

## ਟੋਕਨ ਸਿਹਤ ਜਾਂਚ

OAuth ਪ੍ਰਦਾਤਾਵਾਂ (Claude Code, GitHub Copilot, Cursor) ਨੂੰ **ਸਮੇਂ-ਸਮੇਂ 'ਤੇ ਟੋਕਨ ਰਿਫ੍ਰੈਸ਼** ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। `src/lib/tokenHealthCheck.ts` ਇੱਕ ਬੈਕਗ੍ਰਾਊਂਡ ਸ਼ਡਿਊਲਰ ਚਲਾਉਂਦਾ ਹੈ:

- **ਸਵੀਪ ਟਿਕ**: ਹਰ 60 ਸਕਿੰਟ ਬਾਅਦ (`src/lib/tokenHealthCheck.ts:30` ਵਿੱਚ `TICK_MS = 60 * 1000` ਅਨੁਸਾਰ ਸਵੀਪ)
- **ਪ੍ਰਤੀ-ਕਨੈਕਸ਼ਨ ਸਿਹਤ ਜਾਂਚ ਅੰਤਰਾਲ**: ਮੂਲ ਰੂਪ ਵਿੱਚ 60 ਮਿੰਟ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ਸੈਟਿੰਗਾਂ DB ਰਾਹੀਂ ਸੰਰਚਨਾਯੋਗ
- **401 'ਤੇ ਅਗਾਊਂ ਰਿਫ੍ਰੈਸ਼**: ਪ੍ਰਤੀ-ਕਨੈਕਸ਼ਨ ਇੰਟਰਸੈਪਟਰ ਦੁਆਰਾ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ

### ਟੋਕਨ ਸਿਹਤ ਸਥਿਤੀ

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

### ਸੰਰਚਨਾ

ਟੋਕਨ ਸਿਹਤ ਜਾਂਚ ਸੰਰਚਨਾ ਨੂੰ `tokenHealthCheck.ts` ਦੁਆਰਾ ਅੰਦਰੂਨੀ ਤੌਰ 'ਤੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ।

### ਟੋਕਨ ਸਿਹਤ

> **ਕੋਈ REST ਐਂਡਪੌਇੰਟ ਨਹੀਂ।** ਟੋਕਨ ਸਿਹਤ ਡਾਟਾ ਡੈਸ਼ਬੋਰਡ ਜਾਂ MCP ਟੂਲ `observability_snapshot` ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ।

---

## ਚੇਤਾਵਨੀਆਂ

### ਬਿਲਟ-ਇਨ ਚੈਨਲ

OmniRoute **3 ਚੇਤਾਵਨੀ ਚੈਨਲਾਂ** ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ:

| ਚੈਨਲ          | ਸੈੱਟਅੱਪ        | ਵਰਤੋਂ ਦਾ ਮਾਮਲਾ            |
| ------------- | -------------- | ------------------------- |
| ਡੈਸ਼ਬੋਰਡ ਬੈਨਰ | ਹਮੇਸ਼ਾ ਚਾਲੂ    | ਐਪ-ਅੰਦਰੂਨੀ ਸੂਚਨਾਵਾਂ       |
| Webhook       | URL ਸੰਰਚਿਤ ਕਰੋ | Slack, Discord, PagerDuty |
| ਲੌਗ           | ਮੂਲ            | ਬਾਹਰੀ ਲੌਗ ਏਕੀਕਰਨ ਲਈ       |

### Webhook ਸੰਰਚਨਾ

> **ਨੋਟ:** Webhook ਚੇਤਾਵਨੀ ਸੰਰਚਨਾ ਨੂੰ ਡੈਸ਼ਬੋਰਡ ਦੇ Settings ਪੰਨੇ ਰਾਹੀਂ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ। Webhook URL, ਇਵੈਂਟ ਫਿਲਟਰਿੰਗ ਅਤੇ ਪੇਲੋਡ ਅਨੁਕੂਲਨ ਲਈ Settings UI ਵੇਖੋ।

### ਚੇਤਾਵਨੀ ਦੀਆਂ ਕਿਸਮਾਂ

| ਚੇਤਾਵਨੀ                      | ਕਦੋਂ                                 | ਮੂਲ ਗੰਭੀਰਤਾ |
| ---------------------------- | ------------------------------------ | ----------- |
| `provider_circuit_open`      | ਸਰਕਿਟ ਖੁੱਲ੍ਹਦਾ ਹੈ                    | ਗੰਭੀਰ       |
| `provider_circuit_half_open` | ਸਰਕਿਟ ਰਿਕਵਰੀ ਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ      | ਜਾਣਕਾਰੀ     |
| `quota_warning`              | ਕੋਟਾ 80%+ 'ਤੇ                        | ਚੇਤਾਵਨੀ     |
| `quota_exhausted`            | ਕੋਟਾ 100% 'ਤੇ                        | ਗੰਭੀਰ       |
| `token_refresh_failed`       | ਲਗਾਤਾਰ 3+ ਰਿਫ੍ਰੈਸ਼ ਅਸਫਲਤਾਵਾਂ         | ਚੇਤਾਵਨੀ     |
| `token_expired`              | ਟੋਕਨ ਦੀ ਮਿਆਦ ਲੰਘ ਗਈ                  | ਗੰਭੀਰ       |
| `combo_target_unhealthy`     | ਕੌਂਬੋ ਟਾਰਗੇਟ 1 ਘੰਟੇ+ ਲਈ ਕੂਲਡਾਊਨ ਵਿੱਚ | ਚੇਤਾਵਨੀ     |
| `db_integrity_warning`       | FK ਉਲੰਘਣਾਵਾਂ > 0                     | ਚੇਤਾਵਨੀ     |
| `heap_pressure`              | ਹੀਪ ਵਰਤੋਂ ਥ੍ਰੈਸ਼ਹੋਲਡ ਦੇ 80% ਤੋਂ ਵੱਧ  | ਚੇਤਾਵਨੀ     |

---

## ਕਾਰਗੁਜ਼ਾਰੀ ਮੈਟ੍ਰਿਕਸ

### ਟ੍ਰੈਕ ਕੀਤੇ ਮੈਟ੍ਰਿਕਸ

| ਮੈਟ੍ਰਿਕ                 | ਕਿਸਮ       | ਸਰੋਤ                            |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | ਕਾਊਂਟਰ     | `services/usage.ts`             |
| `request_latency_ms`    | ਹਿਸਟੋਗ੍ਰਾਮ | `services/usage.ts`             |
| `tokens_consumed`       | ਕਾਊਂਟਰ     | `services/usage.ts`             |
| `cost_usd`              | ਕਾਊਂਟਰ     | `services/usage.ts`             |
| `provider_errors`       | ਕਾਊਂਟਰ     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ਕਾਊਂਟਰ     | `services/resilience.ts`        |
| `cache_hits`            | ਕਾਊਂਟਰ     | `services/signatureCache.ts`    |
| `compression_savings`   | ਹਿਸਟੋਗ੍ਰਾਮ | `services/compression/stats.ts` |
| `quota_used`            | ਗੇਜ        | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ਗੇਜ        | `observability.ts`              |

### ਲੇਟੈਂਸੀ ਪ੍ਰਤੀਸ਼ਤਕ (p50/p95/p99)

> **ਕੋਈ REST ਐਂਡਪੌਇੰਟ ਨਹੀਂ ਹੈ।** ਲੇਟੈਂਸੀ ਪ੍ਰਤੀਸ਼ਤਕ ਡਾਟਾ ਡੈਸ਼ਬੋਰਡ ਦੇ `/dashboard/health` ਸਫ਼ੇ ਰਾਹੀਂ ਉਪਲਬਧ ਹੈ। Prometheus/OpenTelemetry ਐਕਸਪੋਰਟ v3.9 ਲਈ ਯੋਜਨਾਬੱਧ ਹੈ।

### Prometheus / OpenTelemetry ਐਕਸਪੋਰਟ (ਪੜਾਅ 2)

v3.9 ਲਈ ਯੋਜਨਾਬੱਧ: Prometheus, OpenTelemetry, Datadog ਲਈ ਮੂਲ ਐਕਸਪੋਰਟ।

ਫਿਲਹਾਲ, ਕਿਸੇ ਵੀ HTTP-ਅਧਾਰਿਤ ਨਿਗਰਾਨੀ ਸਿਸਟਮ (Prometheus blackbox exporter, Datadog HTTP check, ਆਦਿ) ਨਾਲ `/api/monitoring/health` ਨੂੰ ਸਕ੍ਰੇਪ ਕਰੋ।

---

## ਅਲਰਟਿੰਗ ਵਿਧੀਆਂ

### Slack

> **ਨੋਟ:** Webhook ਅਲਰਟਿੰਗ ਨੂੰ ਡੈਸ਼ਬੋਰਡ ਦੇ Settings ਸਫ਼ੇ ਰਾਹੀਂ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ—ਕੋਈ ਸਮਰਪਿਤ webhook env vars ਨਹੀਂ ਹਨ (`grep -rn` ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਦਿੰਦਾ)। Webhook URL, ਇਵੈਂਟ ਫਿਲਟਰਿੰਗ ਅਤੇ ਪੇਲੋਡ ਅਨੁਕੂਲਨ ਲਈ Settings UI ਵੇਖੋ।

### Discord

> Webhook ਅਲਰਟਿੰਗ Slack ਵਾਂਗ ਹੀ Settings UI ਪ੍ਰਵਾਹ ਦੀ ਵਰਤੋਂ ਕਰਦੀ ਹੈ। Discord ਉਸੇ JSON ਪੇਲੋਡ ਬਣਤਰ ਨੂੰ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ।

### PagerDuty

> Webhook ਅਲਰਟਿੰਗ ਉਸੇ Settings UI ਪ੍ਰਵਾਹ ਦੀ ਵਰਤੋਂ ਕਰਦੀ ਹੈ। PagerDuty Events API v2 ਰਾਊਟਿੰਗ ਕੁੰਜੀਆਂ ਨੂੰ Settings UI ਵਿੱਚ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

### ਕਸਟਮ Webhook (JSON)

> JSON ਬਾਡੀ ਨਾਲ POST ਸਵੀਕਾਰ ਕਰਨ ਵਾਲਾ ਕੋਈ ਵੀ HTTP ਐਂਡਪੌਇੰਟ ਕੰਮ ਕਰੇਗਾ। URL ਨੂੰ Settings UI ਵਿੱਚ ਸੰਰਚਿਤ ਕਰੋ।

---

## ਡੈਸ਼ਬੋਰਡ ਸੰਰਚਨਾ

### ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰੋ

ਇੱਕ `~/.omniroute/dashboard.json` ਬਣਾਓ:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ਕਿਸੇ ਪ੍ਰਦਾਤਾ ਨੂੰ ਸਿਖਰ 'ਤੇ ਪਿੰਨ ਕਰੋ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ਸਮੱਸਿਆ-ਨਿਵਾਰਣ

### "ਪ੍ਰਦਾਤਾ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ ਪਰ ਬੇਨਤੀਆਂ ਅਸਫਲ ਹੁੰਦੀਆਂ ਹਨ"

1. **autopilot ਸਮੱਸਿਆਵਾਂ** ਦੀ ਜਾਂਚ ਕਰੋ—ਸ਼ਾਇਦ ਕੋਈ ਮਾਡਲ ਲੌਕ ਆਉਟ ਹੋਇਆ ਹੋਵੇ
2. ਖ਼ਾਸ ਤਰੁੱਟੀ ਸ਼੍ਰੇਣੀ ਲਈ **ਹਾਲੀਆ ਤਰੁੱਟੀਆਂ** ਵੇਖੋ
3. ਪ੍ਰਦਾਤਾ ਕਾਰਡ ਵਿੱਚ **ਕਨੈਕਸ਼ਨ ਟੈਸਟ** ਅਜ਼ਮਾਓ
4. ਜਾਂਚ ਕਰੋ ਕਿ ਕੀ ਪ੍ਰਦਾਤਾ **ਅੱਪਸਟ੍ਰੀਮ 'ਤੇ ਰੇਟ-ਲਿਮਿਟਡ** ਹੈ (ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਦਿਖਾਈ ਨਹੀਂ ਦਿੰਦਾ)

### "ਕੋਟਾ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ ਪਰ ਮੈਨੂੰ 429 ਤਰੁੱਟੀਆਂ ਦਿਖਾਈ ਦਿੰਦੀਆਂ ਹਨ"

- 429 ਦਾ ਅਰਥ ਹੈ ਕਿ ਪ੍ਰਦਾਤਾ ਮੁਤਾਬਕ ਤੁਸੀਂ ਆਪਣਾ ਕੋਟਾ ਵਰਤ ਚੁੱਕੇ ਹੋ
- OmniRoute ਦੀ ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ **ਪੁਰਾਣੀ** ਹੋ ਸਕਦੀ ਹੈ—ਅਸਲ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਤਾ ਦੇ ਅੱਪਸਟ੍ਰੀਮ ਕੋਲ ਹੁੰਦੀ ਹੈ
- ਅੰਦਰੂਨੀ ਕੋਟਾ ਮਾਨੀਟਰ ਰਾਹੀਂ ਕੋਟਾ ਡਾਟਾ ਆਪਣੇ ਆਪ ਤਾਜ਼ਾ ਹੁੰਦਾ ਹੈ

### "ਕੌਂਬੋ ਅਸਫਲ ਹੋ ਰਿਹਾ ਹੈ ਪਰ ਸਾਰੇ ਟਾਰਗੇਟ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ"

- ਟਾਰਗੇਟ ਕ੍ਰਮਬੱਧਤਾ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਲਈ **ਕੌਂਬੋ ਸਿਹਤ** ਡੈਸ਼ਬੋਰਡ ਦੀ ਜਾਂਚ ਕਰੋ
- **ਫਾਲਬੈਕ ਇਵੈਂਟਸ** ਵੇਖੋ—ਸ਼ਾਇਦ ਕੌਂਬੋ ਬਹੁਤ ਤੇਜ਼ੀ ਨਾਲ ਸਾਰੇ ਵਿਕਲਪ ਵਰਤ ਰਿਹਾ ਹੋਵੇ
- ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ **ਰਣਨੀਤੀ** ਤੁਹਾਡੇ ਵਰਤੋਂ ਮਾਮਲੇ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ (ਤਰਜੀਹ ਬਨਾਮ ਰਾਊਂਡ-ਰੌਬਿਨ ਬਨਾਮ ਆਟੋ)

### "ਡਾਟਾਬੇਸ ਸਿਹਤ ਜਾਂਚ ਅਸਫਲ ਹੋ ਰਹੀ ਹੈ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ਚਲਾਓ
- ਜੇ "ok" ਆਵੇ—ਇਹ ਝੂਠਾ ਅਲਾਰਮ ਹੈ, ਸਿਹਤ ਜਾਂਚ ਲੋੜ ਤੋਂ ਵੱਧ ਸਖ਼ਤ ਹੈ
- ਜੇ ਕੁਝ ਹੋਰ ਆਵੇ—**OmniRoute ਨੂੰ ਰੋਕੋ** ਅਤੇ [ਆਫ਼ਤ ਰਿਕਵਰੀ ਗਾਈਡ](./DATABASE_GUIDE.md#disaster-recovery) ਦੀ ਪਾਲਣਾ ਕਰੋ

### "ਮੈਮੋਰੀ ਹੀਪ ਦਾ ਦਬਾਅ ਨਾਜ਼ੁਕ ਹੈ"

```bash
# ਮੌਜੂਦਾ ਹੀਪ ਦੀ ਜਾਂਚ ਕਰੋ
node -e "console.log(process.memoryUsage())"

# ਮੈਨੂਅਲ GC ਟ੍ਰਿਗਰ ਕਰੋ (ਜੇ --expose-gc ਹੋਵੇ)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ਸਮਕਾਲੀ ਬੇਨਤੀਆਂ ਘਟਾਓ (ਡੈਸ਼ਬੋਰਡ ਦੇ Settings ਸਫ਼ੇ ਰਾਹੀਂ ਸੈੱਟ ਕਰੋ, env var ਰਾਹੀਂ ਨਹੀਂ)
# ਕੋਈ `MAX_CONCURRENT_REQUESTS` env var ਨਹੀਂ ਹੈ—ਇਸਨੂੰ Settings → Concurrency ਵਿੱਚ ਸੰਰਚਿਤ ਕਰੋ।
```

---

## ਇਹ ਵੀ ਵੇਖੋ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ਵਰਤੋਂ ਅਤੇ ਲਾਗਤ ਦੀ ਟ੍ਰੈਕਿੰਗ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB ਸਕੀਮਾ + ਸਥਿਤੀ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ਪ੍ਰਾਕਸੀ ਸਥਿਤੀ (ਵੱਖਰਾ ਕੈਸ਼)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ਸਿਸਟਮ ਆਰਕੀਟੈਕਚਰ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਦੇ ਵੇਰਵੇ
- ਸਰੋਤ: `src/lib/monitoring/` (4 ਫ਼ਾਈਲਾਂ, 2121 LOC)
