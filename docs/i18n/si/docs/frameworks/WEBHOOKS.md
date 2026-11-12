# Webhooks (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **සත්‍ය මූලාශ්‍රය:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute හට වේදිකා සිදුවීම් මත HTTP webhooks වෙඩි තැබිය හැක. Slack, PagerDuty, Datadog, අභ්‍යන්තර අනතුරු ඇඟවීමේ සේවා, හෝ ඕනෑම HTTP ග්‍රාහකයක් සමඟ ඒකාබද්ධ කිරීමට ඒවා භාවිතා කරන්න.

පිටත් කරන්නා සෑම බෙදාහැරීමක්ම HMAC-SHA256 සමඟ අත්සන් කරයි, තාවකාලික අසාර්ථකත්වයන් නැවත උත්සාහ කරයි, webhook එකකට බෙදා හැරීමේ සෞඛ්‍යය නිරීක්ෂණය කරයි, සහ අසාර්ථක වන අන්ත ලක්ෂ්‍ය ස්වයංක්‍රීයව අක්‍රීය කරයි.

## සහාය දක්වන සිදුවීම්

`WebhookEvent` වර්ගය (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` විසින් පරිභෝජනය කරනු ලැබේ ) දැනට සිදුවීම් හතක් ආකෘති කරයි:

| සිදුවීම                   | විට ගිනි                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `request.completed`       | ප්‍රොක්සි ඉල්ලීමක් සාර්ථකව සම්පූර්ණ වේ                                                                       |
| `request.failed`          | සියලුම retries/fallback වලින් පසු ප්‍රොක්සි ඉල්ලීමක් අසාර්ථක වේ                                              |
| `quota.exceeded`          | API යතුරක් budget/quota සීමාවක් තරණය කරයි                                                                    |
| `proxy.set_aside`         | ප්‍රොක්සි සංචිත සාමාජිකයෙකු නැවත නැවත ප්‍රතික්ෂේප කිරීමෙන් පසු වෙන් කරනු ලැබේ (සංක්‍රමණය පමණි)               |
| `proxy.pool.exhausted`    | ප්‍රොක්සි සංචිත විෂය පථයක සෑම සාමාජිකයෙකුම වෙන් කර ඇත                                                        |
| `provider.reset_redeemed` | ස්වයංක්‍රීයව යොදන බැංකු යළි පිහිටුවීම් යළි පිහිටුවීමේ ණයක් හෝ Claude සතිපතා සැසි යළි පිහිටුවීම මුදා හරින ලදී |
| `test.ping`               | පරීක්ෂණ අන්ත ලක්ෂ්‍යයෙන් භාවිතා කරන කෘතිම සිදුවීම                                                            |

දායකත්වයන් සෑම සිදුවීමක්ම ලබා ගැනීම සඳහා වචනාර්ථයෙන් `"*"` පිළිගනී. `events` හි නොදන්නා සිදුවීම් නම් යැවීමේ වේලාවේදී නොසලකා හරිනු ලැබේ.

> සටහන: ඩිස්පැචර් API රැහැන්ගත කර ඇත, නමුත් සමහර `test.ping` නොවන සිදුවීම් සඳහා නිෂ්පාදන ඇමතුම් අඩවි තවමත් ගොඩබසිමින් පවතී. ඔබගේ නිකුතුවේ දැනට ඩිස්පෑචර් ඉල්ලා සිටින්නේ කුමන මාර්ගදැයි බැලීමට `grep dispatchEvent` පරීක්ෂා කරන්න.

## ගෘහ නිර්මාණ ශිල්පය

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

Dispatch යනු ඇමතුම්කරුට ගින්නක් සහ අමතක වීමකි: `Promise.allSettled` එක් වෙබ් හූක් දෝෂ ගිලින බැවින් එක් නරක ග්‍රාහකයෙකුට අනෙක් ඒවා අවහිර කළ නොහැක.

## HMAC අත්සන් කිරීම

webhook එකක `secret` ඇති විට, OmniRoute JSON ශරීරයට අත්සන් කර යවන්නේ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ශීර්ෂ නාම `X-Webhook-*` උපසර්ගය භාවිතා කරයි ( `X-OmniRoute-*` නොවේ). අත්සන අගය `sha256=<hex>` — සම්පූර්ණ උපසර්ගය සත්‍යාපනය කරන්න.

`createWebhook` රහසක් නොමැතිව කැඳවනු ලැබුවහොත්, DB මොඩියුලය එකක් (`whsec_<48 hex>`) ජනනය කරයි, එබැවින් සියලුම webhooks පෙරනිමියෙන් අත්සන් කරනු ලැබේ.

### ග්‍රාහකයේ සත්‍යාපනය කිරීම

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ට එරෙහිව සැමවිටම සත්‍යාපනය කරන්න **අමු** ඕනෑම JSON විග්‍රහ කිරීමට පෙර ශරීරය ඉල්ලා සිටින්න.

## නැවත උත්සාහ කිරීම සහ අසාර්ථක වීමේ ප්‍රතිපත්තිය

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- එක් උත්සාහයකට තත්පර 10 කල් ඉකුත්වීම (`AbortController`).
- HTTP 2xx සාර්ථකත්වය ලෙස ගණන් ගනී.
- HTTP 3xx/4xx `success = res.ok` සමඟ බෙදාහැර ඇති පරිදි වාර්තා කර ඇති — නැවත උත්සාහ කළ නොහැකි අවසාන තත්ත්වය ලෙස ගණන් ගනී.
- HTTP 5xx සහ ජාල දෝෂ ඝාතීය පසුබෑම සමඟ නැවත උත්සාහ කරනු ලැබේ: `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` ට පසුව, බෙදා හැරීම අසාර්ථක වූ බවට සටහන් වේ.
- සෑම බෙදාහැරීමක්ම `last_triggered_at`, `last_status` යාවත්කාලීන කරන අතර `failure_count` නැවත සකසයි හෝ වැඩි කරයි.
- එක් එක් විදුලි පංකා පිටවීමෙන් පසු පිටත් කරන්නා `disableWebhooksWithHighFailures(10)` අමතයි, එබැවින් `failure_count >= 10` සහිත ඕනෑම වෙබ්හුක් ස්වයංක්‍රීයව අක්‍රිය වේ.

## දත්ත සමුදාය

වගුව `webhooks` (සංක්‍රමණය `011_webhooks.sql`):

| තීරුව               | ටයිප් කරන්න | සටහන්                                               |
| ------------------- | ----------- | --------------------------------------------------- |
| `id`                | TEXT PK     | UUID                                                |
| `url`               | TEXT        | ගමනාන්තය URL                                        |
| `events`            | TEXT        | JSON අරාව; පෙරනිමි `["*"]`                          |
| `secret`            | TEXT        | HMAC රහස (නොදුන්නේ නම් ස්වයංක්‍රීයව ජනනය වේ)        |
| `enabled`           | INT         | 0/1; පෙරනිමි 1                                      |
| `description`       | TEXT        | විකල්ප මානව ලේබලය                                   |
| `created_at`        | TEXT        | `datetime('now')`                                   |
| `last_triggered_at` | TEXT        | සෑම බෙදා හැරීමේ උත්සාහයකම යාවත්කාලීන වේ             |
| `last_status`       | INT         | අවසාන උත්සාහයේHTTP තත්ත්වය (0 = ජාලය)               |
| `failure_count`     | INT         | සාර්ථක වූ විට 0 ට, අසාර්ථක වූ විට + 1 වෙත යළි සකසයි |

බෙදාහැරීමේ ඉතිහාසය `webhooks` පේළියේ ඇති සමස්ථ කවුන්ටර වලට අමතරව කැප වූ `webhook_deliveries` වගුවේ (සංක්‍රමණය `069_webhook_deliveries.sql`, සෑම උත්සාහයක්ම `src/lib/db/webhookDeliveries.ts::insertDelivery` හරහා ලියා ඇත) පවතී. කාරුණික පාරදත්ත (Slack / Discord / Telegram / අභිරුචි ගෙවීම් ට්‍රාන්ස්ෆෝමර්) `070_webhooks_kind_metadata.sql` විසින් එකතු කරන ලදී.

## REST API

සියලුම අන්ත ලක්ෂ්‍ය සඳහා කළමනාකරණ auth (`requireManagementAuth`) අවශ්‍ය වේ.

| අන්ත ලක්ෂ්‍යය                   | ක්රමය  | විස්තරය                                       |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | වෙබ් හූක් ලැයිස්තුගත කරන්න (රහස් ආවරණය කර ඇත) |
| `/api/webhooks`                 | POST   | webhook සාදන්න                                |
| `/api/webhooks/[id]`            | GET    | Webhook විස්තරය (සම්පූර්ණ රහස)                |
| `/api/webhooks/[id]`            | PUT    | ක්ෂේත්ර යාවත්කාලීන කරන්න                      |
| `/api/webhooks/[id]`            | DELETE | ඉවත් කරන්න                                    |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` වෙඩි තියන්න (නැවත උත්සාහයක් නැත)  |
| `/api/webhooks/[id]/deliveries` | GET    | එක් webhook සඳහා මෑත බෙදාහැරීමේ උත්සාහයන්     |
| `/api/webhooks/validate-url`    | POST   | පෙර පියාසර URL වලංගුකරණය (SSRF ගාඩ්)          |

ලැයිස්තුගත පිටු මත කාන්දු වීම වැළැක්වීම සඳහා`GET /api/webhooks` `<first 10 chars>...` හි රහස වසන් කරයි. ඔබට සැබවින්ම රහස අවශ්‍ය වූ විට `[id]` GET භාවිතා කරන්න.

### webhook සාදන්න

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

`secret` ඉවත් කර ඇත්නම්, සේවාදායකය `whsec_<hex>` රහසක් ජනනය කර එය ප්‍රතිචාරයේ ආපසු ලබා දෙයි.

### ටෙස්ට් webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ආපසු ලබා දෙයි. ප්‍රතිග්‍රාහකයා ගෙවීම සහ අත්සන පිළිගන්නා බව ඉක්මනින් තහවුරු කිරීම සඳහා — ප්‍රයෝජනවත් නැවත උත්සාහ නොකරයි.

## උපකරණ පුවරුව

`/dashboard/webhooks` හි උපකරණ පුවරු පිටුව ( `src/app/(dashboard)/dashboard/webhooks/page.tsx` බලන්න) සපයයි:

- Create/edit webhooks with events picker
- `enabled`, `failure_count`, සහ `last_status` මත පදනම්ව තත්ව දර්ශකය (ක්‍රියාකාරී / අක්‍රිය / දෝෂ සහිත)
- එක්-ක්ලික් පරීක්ෂණ බෙදා හැරීම
- අතින් enable/disable ටොගල කිරීම

## ගෙවීමේ උදාහරණ

### ඉල්ලීම.සම්පූර්ණයි

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

`test.ping` නොවන සිදුවීම් සඳහා ක්ෂේත්‍ර හැඩතල නිර්වචනය කරනු ලබන්නේ ඒවා නිකුත් කරන ඇමතුම් අඩවි මගිනි; `data` වස්තුව ඉදිරියට ගැළපෙන ලෙස සලකන්න (ක්ෂේත්‍ර එකතු කරන්න, නොපැමිණීම මත රඳා නොසිටින්න).

## හොඳම භාවිතයන්

- **සෑම භාරදීමකදීම අත්සන තහවුරු කරන්න** අමු සිරුරට එරෙහිව — ඔබේ webhook URL අනුමාන කරන ඕනෑම කෙනෙකුට වංචා කළ POSTs වළක්වයි.
- **~ තත්පර 5ක් ඇතුළත 2xx ප්‍රතිචාර දක්වන්න** — ඩිස්පචර් කාලය තත්පර 10 ට අවසන් වේ. මන්දගාමී ප්‍රතිග්‍රාහක නැවත උත්සාහයන් අනුභව කර `failure_count` පුම්බනු ඇත.
- **හසුරුවන්නන් දුර්වල කරන්න** — නැවත උත්සාහ කරන අතර අවම වශයෙන් එක් වරක් බෙදා හැරීමේ අර්ථකථනය යනු අනුපිටපත් හැකි බවයි.
- **අවම වශයෙන් දායක වන්න** — ලැයිස්තුගත කරන්නේ ඔබ සැබවින්ම පරිභෝජනය කරන සිදුවීම් පමණි; `"*"` ඔබ පාලනය නොකරන ග්‍රාහක මත පිරිවැය එකතු කරනු ඇත.
- **`failure_count` නරඹන්න** — අන්ත ලක්ෂ්‍ය අඛණ්ඩව අසාර්ථකවීම් 10කදී ස්වයංක්‍රීයව අක්‍රිය කර ඇත; ග්‍රාහකය සවි කිරීමෙන් පසු `enabled: true` සමඟ `PUT /api/webhooks/[id]` ඇමතීමෙන් යළි පිහිටුවන්න.
- **වරින් වර රහස් කරකවන්න** — `PUT` නව `secret`, නව අගය ග්‍රාහකයා වෙත යොදවා, පරීක්ෂණ අන්ත ලක්ෂ්‍යය හරහා තහවුරු කරන්න.

## එසේම බලන්න

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — පූර්ණ කළමනාකරණය API මතුපිට
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — පරිපථ කඩනය / සැපයුම්කරුගේ අසාර්ථකත්වය පිටුපස ඇති කූල්ඩවුන් අර්ථ නිරූපණය `request.failed` හරහා මතු විය
- මූලාශ්රය: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
