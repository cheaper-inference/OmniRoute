# Webhooks (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **အမှန်တရားအရင်းအမြစ်-** `src/lib/webhookDispatcher.ts`၊ `src/lib/db/webhooks.ts`၊ `src/app/api/webhooks/`**နောက်ဆုံး မွမ်းမံပြင်ဆင်သည်-** 2026-06-28 — v3.8.40

OmniRoute ပလက်ဖောင်းဖြစ်ရပ်များတွင် HTTP ဝဘ်ချိတ်များကို ဖယ်ရှားနိုင်သည်။ Slack၊ PagerDuty၊ Datadog ၊ အတွင်းသတိပေးဝန်ဆောင်မှုများ သို့မဟုတ် HTTP လက်ခံသူ တစ်ခုခုနှင့် ပေါင်းစည်းရန် ၎င်းတို့ကို အသုံးပြုပါ။

ပေးပို့သူသည် HMAC-SHA256 ဖြင့် ပေးပို့မှုတစ်ခုစီတိုင်းကို အမှတ်အသားပြုပြီး၊ ယာယီကျရှုံးမှုများအပေါ် ထပ်တလဲလဲကြိုးစားခြင်း၊ webhook တစ်ခုလျှင် ပေးပို့မှုကျန်းမာရေးကို ခြေရာခံခြင်း၊ မပြတ်မလပ်ဖြစ်နေသော အဆုံးမှတ်များကို အလိုအလျောက်ပိတ်ပေးပါသည်။

## ထောက်ခံပွဲများ

`WebhookEvent` အမျိုးအစား (`src/lib/webhooks/eventDescriptions.ts`၊ `src/lib/webhookDispatcher.ts` မှစားသုံးသည် ) သည် လက်ရှိတွင် ဖြစ်ရပ်ခုနစ်ခုကို ပုံစံပြထားသည်-

| ပွဲ                       | မီးလောင်လိုက်တာ                                                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | ပရောက်စီတောင်းဆိုမှုတစ်ခု အောင်မြင်စွာပြီးမြောက်သည်။                                                                                                                             |
| `request.failed`          | retries/fallback အားလုံးပြီးနောက် proxyed တောင်းဆိုမှု မအောင်မြင်ပါ။                                                                                                             |
| `quota.exceeded`          | API သော့တစ်ခုသည် budget/quota အဆင့်ကို ဖြတ်သွားသည်                                                                                                                               |
| `proxy.set_aside`         | ထပ်ခါတလဲလဲ ငြင်းဆိုမှုများ ပြုလုပ်ပြီးနောက်တွင် ပရောက်စီပူးလ်အဖွဲ့ဝင်ကို ဘေးဖယ်ထားပါသည် (အကူးအပြောင်းအတွက်သာ)                                                                    |
| `proxy.pool.exhausted`    | proxy pool ၏ အဖွဲ့ဝင်တိုင်းကို ဘေးဖယ်ထားသည်။                                                                                                                                     |
| `provider.reset_redeemed` | ဘဏ်စနစ်ဖြင့် ပြန်လည်သတ်မှတ်မှုများကို အလိုအလျောက်လျှောက်ထားပါက ပြန်လည်သတ်မှတ်သည့် ခရက်ဒစ်ကို ပြန်လည်သတ်မှတ်ခြင်း သို့မဟုတ် Claude အပတ်စဉ် စက်ရှင်ကို ပြန်လည်သတ်မှတ်ခြင်းဖြစ်သည်။ |
| `test.ping`               | စမ်းသပ်မှု အဆုံးမှတ်မှ အသုံးပြုသည့် ပေါင်းစပ်ဖြစ်ရပ်                                                                                                                             |

စာရင်းသွင်းမှုများသည် ပွဲတိုင်းကိုလက်ခံရန် ပကတိ `"*"` လက်ခံသည်။ `events` ရှိ အမည်မသိဖြစ်ရပ်အမည်များကို ပေးပို့ချိန်၌ လျစ်လျူရှုထားသည်။

> `test.ping` API သင့်ထုတ်လွှတ်မှုတွင် ပေးပို့သူအား လက်ရှိတောင်းဆိုနေသည့် လမ်းကြောင်းများကို ကြည့်ရန် `grep dispatchEvent` စစ်ဆေးပါ။

## ဗိသုကာပညာ

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch သည် ခေါ်ဆိုသူအတွက် မီးလောင်ပြီး မေ့သွားသည်- `Promise.allSettled` webhook အမှားများကို မျိုသိပ်ထားသောကြောင့် မကောင်းတဲ့ လက်ခံသူသည် အခြားသူများကို မပိတ်ဆို့နိုင်ပါ။

## HMAC လက်မှတ်ထိုးခြင်း။

webhook တစ်ခုတွင် `secret` ပါရှိသောအခါ၊ OmniRoute JSON ကိုယ်ထည်ကို အမှတ်အသားပြုပြီး ပေးပို့သည်-

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ခေါင်းစီးအမည်များသည် `X-Webhook-*` ရှေ့ဆက် ( `X-OmniRoute-*` မဟုတ်) ကို အသုံးပြုသည်။ လက်မှတ်တန်ဖိုးသည် `sha256=<hex>` — ဖြစ်ပြီး ရှေ့ဆက်အပြည့်အစုံကို အတည်ပြုပါ။

`createWebhook` လျှို့ဝှက်မထားဘဲ ခေါ်ဆိုပါက DB module သည် တစ်ခု (`whsec_<48 hex>`) ကိုထုတ်ပေးသောကြောင့် webhooks အားလုံးကို default အနေဖြင့် ရေးထိုးထားသည်။

### လက်ခံသူတွင် စစ်ဆေးနေသည်။

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ဆန့်ကျင်ဘက် အမြဲစစ်ဆေးပါ။**ကုန်ကြမ်း** JSON ခွဲခြမ်းစိတ်ဖြာခြင်းမပြုမီ ခန္ဓာကို တောင်းဆိုပါ။

## ထပ်ကြိုးစားပြီး ပျက်ကွက်မူဝါဒ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ကြိုးစားမှုတစ်ခုလျှင် 10 စက္ကန့် အချိန်ကုန်သည် (`AbortController`)။
- HTTP 2xx ကို အောင်မြင်မှုအဖြစ် ရေတွက်သည်။
- HTTP 3xx/4xx `success = res.ok` ဖြင့် ပေးပို့ထားသည့်အတိုင်း မှတ်တမ်းတင်ထားသော — ပြန်စမ်း၍မရသော နောက်ဆုံးအခြေအနေအဖြစ် ရေတွက်သည်။
- HTTP 5xx နှင့် ကွန်ရက်အမှားအယွင်းများကို ကိန်းဂဏန်းအထောက်အပံဖြင့် ပြန်စမ်းကြည့်ပါ- `2^attempt * 1000 ms` (1s၊ 2s၊ 4s)။
- `maxRetries` ပြီးနောက်၊ ပေးပို့မှုကို မအောင်မြင်ကြောင်း မှတ်တမ်းတင်ထားသည်။
- ပေးပို့မှုတစ်ခုစီသည် `last_triggered_at`၊ `last_status` တို့ကို အပ်ဒိတ်လုပ်ကာ ပြန်လည်သတ်မှတ်ခြင်း သို့မဟုတ် `failure_count` တိုးခြင်းများ ပြုလုပ်နိုင်သည်။
- fan-out တစ်ခုစီပြီးနောက် `disableWebhooksWithHighFailures(10)` dispatcher ကခေါ်ဆိုသည်၊ ထို့ကြောင့် `failure_count >= 10` ပါသော webhook မှန်သမျှကို အလိုအလျောက်ပိတ်ထားပါသည်။

## ဒေတာဘေ့စ်

ဇယား `webhooks` (ရွှေ့ပြောင်းခြင်း `011_webhooks.sql`):

| ကော်လံ              | ရိုက်ပါ။ | မှတ်စုများ                                                    |
| ------------------- | -------- | ------------------------------------------------------------- |
| `id`                | TEXT PK  | UUID                                                          |
| `url`               | TEXT     | ဦးတည်ရာ URL                                                   |
| `events`            | TEXT     | JSON ခင်းကျင်းမှု; မူရင်း `["*"]`                             |
| `secret`            | TEXT     | HMAC လျှို့ဝှက်ချက် (မပေးပါက အလိုအလျောက်ထုတ်ပေးသည်)           |
| `enabled`           | INT      | 0/1; ပုံသေ ၁                                                  |
| `description`       | TEXT     | ရွေးချယ်နိုင်သော လူသားတံဆိပ်                                  |
| `created_at`        | TEXT     | `datetime('now')`                                             |
| `last_triggered_at` | TEXT     | ပေးပို့ရန် ကြိုးစားမှုတိုင်းတွင် အပ်ဒိတ်လုပ်ထားသည်။           |
| `last_status`       | INT      | နောက်ဆုံးကြိုးစားမှု၏HTTP အခြေအနေ (0 = ကွန်ရက်)               |
| `failure_count`     | INT      | အောင်မြင်မှုတွင် 0 သို့ ပြန်လည်သတ်မှတ်သည်၊ ကျရှုံးမှုတွင် + 1 |

ပေးပို့မှုမှတ်တမ်းသည် `webhook_deliveries` အတန်းရှိ စုစုပေါင်းကောင်တာများအပြင် `webhooks` အတန်းရှိ အစုလိုက်ကောင်တာများအပြင် `src/lib/db/webhookDeliveries.ts::insertDelivery` ပြောင်းရွှေ့ခြင်း `069_webhook_deliveries.sql` အမျိုးအစား metadata (Slack / Discord / Telegram / စိတ်ကြိုက် payload ထရန်စဖော်မာများ) ကို `070_webhooks_kind_metadata.sql` မှ ထည့်ထားသည်။

## REST API

အဆုံးမှတ်များအားလုံးသည် စီမံခန့်ခွဲမှု အထောက်အထား (`requireManagementAuth`) လိုအပ်သည်။

| အဆုံးမှတ်                       | နည်းလမ်း | ဖော်ပြချက်                                             |
| ------------------------------- | -------- | ------------------------------------------------------ |
| `/api/webhooks`                 | GET      | ဝဘ်ချိတ်များစာရင်း (လျှို့ဝှက်ချက်များ ဖုံးကွယ်ထားသည်) |
| `/api/webhooks`                 | POST     | webhook ဖန်တီးပါ။                                      |
| `/api/webhooks/[id]`            | GET      | Webhook အသေးစိတ် (လျှို့ဝှက်ချက်အပြည့်အစုံ)            |
| `/api/webhooks/[id]`            | PUT      | နယ်ပယ်များကို အပ်ဒိတ်လုပ်ပါ။                           |
| `/api/webhooks/[id]`            | DELETE   | ဖယ်ရှားပါ။                                             |
| `/api/webhooks/[id]/test`       | POST     | `test.ping` ကို ပစ်ပါ (ထပ်မစမ်းပါ)                     |
| `/api/webhooks/[id]/deliveries` | GET      | webhook တစ်ခုအတွက် လတ်တလော ပေးပို့ရန် ကြိုးပမ်းမှုများ |
| `/api/webhooks/validate-url`    | POST     | လေယာဉ်အကြို URL အတည်ပြုချက် (SSRF အစောင့်)             |

`GET /api/webhooks` စာရင်းစာမျက်နှာများတွင် မပေါက်ကြားစေရန် `<first 10 chars>...` ၏လျှို့ဝှက်ချက်ကို ဖုံးကွယ်ထားသည်။ သင်အမှန်တကယ်လျှို့ဝှက်ချက်ကိုလိုအပ်သောအခါ `[id]` GET ကိုသုံးပါ။

### webhook ဖန်တီးပါ။

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

`secret` ကို ချန်လှပ်ထားပါက၊ ဆာဗာသည် `whsec_<hex>` လျှို့ဝှက်ချက်ကို ထုတ်ပေးပြီး တုံ့ပြန်မှုတွင် ပြန်ပေးသည်။

### webhook ကိုစမ်းသပ်ပါ။

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ပြန်ပေးသည်။ မည်သည့်ကြိုးစားမှုမျှ — လက်ခံသူသည် payload နှင့် signature ကိုလက်ခံကြောင်း လျင်မြန်စွာအတည်ပြုရန်အတွက် အသုံးဝင်ပါသည်။

## ဒိုင်ခွက်

`/dashboard/webhooks` ရှိ ဒက်ရှ်ဘုတ်စာမျက်နှာ ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` ကြည့်ပါ) ပံ့ပိုးပေးသည်-

- ပွဲရွေးချယ်သည့်စနစ်ဖြင့်Create/edit ဝဘ်ချိတ်များ
- `enabled`၊ `failure_count`၊ နှင့် `last_status` ကိုအခြေခံ၍ အခြေအနေညွှန်ပြချက် (တက်ကြွ/မလှုပ်ရှား/အမှားအယွင်း)
- တစ်ချက်နှိပ်၍ စမ်းသပ်ပေးပို့ခြင်း။
- လူကိုယ်တိုင် enable/disable ပြောင်းရန်

## Payload နမူနာများ

### တောင်းဆိုမှု.ပြီးပါပြီ။

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` မဟုတ်သောဖြစ်ရပ်များအတွက် အကွက်ပုံသဏ္ဍာန်များကို ၎င်းတို့ထုတ်လွှတ်သည့် ခေါ်ဆိုမှုဆိုက်များက သတ်မှတ်သည်။ `data` အရာဝတ္တုကို ရှေ့သို့-သဟဇာတအဖြစ် ဆက်ဆံပါ (အကွက်များထည့်ပါ၊ မရှိခြင်းအပေါ် မူတည်မနေပါနှင့်)။

## အကောင်းဆုံးအလေ့အကျင့်များ

- **ပေးပို့မှုတိုင်းတွင် လက်မှတ်ကို အတည်ပြုပါ။** အကြမ်းထည် — သည် သင့် webhook URL ခန့်မှန်းသူတိုင်းထံမှ အယောင်ဆောင်ထားသော POSTs တားဆီးပေးသည်။
- **~ 5 စက္ကန့်အတွင်း 2xx တုံ့ပြန်ပါ။** — ပေးပို့သူသည် ၁၀ စက္ကန့်တွင် အချိန်ကုန်သည်။ နှေးကွေးသောလက်ခံသူများသည် ထပ်ခါတလဲလဲစား၍ `failure_count` တိုးစေလိမ့်မည်။
- **ကိုင်တွယ်သူများကို မစွမ်းဆောင်နိုင်ပါ။** — ပြန်လည်ကြိုးစားခြင်းနှင့် အနည်းဆုံးတစ်ကြိမ် ပေးပို့ခြင်းဆိုင်ရာ အတွေးခေါ်များ ထပ်နေခြင်း ဖြစ်နိုင်သည်ဟု ဆိုလိုသည်။
- **အနည်းဆုံး စာရင်းသွင်းပါ။** — သင် အမှန်တကယ်စားသုံးသည့် ဖြစ်ရပ်များကိုသာ စာရင်းပြုစုပါ။ `"*"` သင်မထိန်းချုပ်နိုင်သော လက်ခံကိရိယာများအတွက် ကုန်ကျစရိတ်ကို ပေါင်းထည့်ပါမည်။
- **`failure_count` ကြည့်ပါ။** — အဆုံးမှတ်များကို 10 ဆက်တိုက် ပျက်ကွက်မှုတွင် အလိုအလျောက် ပိတ်ထားသည်။ လက်ခံသူအား ပြုပြင်ပြီးနောက် `enabled: true` ဖြင့် `PUT /api/webhooks/[id]` ခေါ်ဆိုခြင်းဖြင့် ပြန်လည်သတ်မှတ်ပါ။
- **လျှို့ဝှက်ချက်များကို အခါအားလျော်စွာ လှည့်ပါ။** — `PUT` `secret` အသစ်တစ်ခု၊ တန်ဖိုးအသစ်ကို လက်ခံသူထံ ဖြန့်ကျက်ပြီး စမ်းသပ်မှုအဆုံးမှတ်မှတစ်ဆင့် အတည်ပြုပါ။

## ဒါကိုလည်းကြည့်ပါ။

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — အပြည့်အဝစီမံခန့်ခွဲမှု API မျက်နှာပြင်
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker/cooldown semantics သည် `request.failed` မှတစ်ဆင့် ပံ့ပိုးပေးသူ ပျက်ကွက်မှုများ နောက်ကွယ်မှ ပေါ်လာသည်
- အရင်းအမြစ်- `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
