# Webhooks (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **מקור האמת:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute יכול לפטר HTTP webhooks באירועי פלטפורמה. השתמש בהם כדי להשתלב עם Slack, PagerDuty, Datadog, שירותי התראה פנימיים או כל מקלט HTTP.

השולח חותם על כל מסירה עם HMAC-SHA256, מנסה שוב על כשלים חולפים, עוקב אחר תקינות המסירה לכל חיבור אינטרנט, ומשבית אוטומטית נקודות קצה שממשיכות להיכשל.

## אירועים נתמכים

סוג `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, נצרך על ידי `src/lib/webhookDispatcher.ts`) מדגמן כיום שבעה אירועים:

| מִקרֶה                    | יורה מתי                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `request.completed`       | בקשת פרוקסי הושלמה בהצלחה                                                          |
| `request.failed`          | בקשת פרוקסי נכשלת אחרי הכל retries/fallback                                        |
| `quota.exceeded`          | מפתח API חוצה סף budget/quota                                                      |
| `proxy.set_aside`         | חבר במאגר פרוקסי מודח לאחר סירובים חוזרים ונשנים (מעבר בלבד)                       |
| `proxy.pool.exhausted`    | כל חבר בהיקף מאגר פרוקסי מופרש בצד                                                 |
| `provider.reset_redeemed` | החלה אוטומטית של איפוסים בנקאיים מימשה זיכוי לאיפוס או איפוס ההפעלה השבועית Claude |
| `test.ping`               | אירוע סינתטי המשמש את נקודת הסיום של הבדיקה                                        |

מנויים מקבלים את ה- `"*"` המילולי כדי לקבל כל אירוע. מתעלמים משמות אירועים לא ידועים ב- `events` בזמן המשלוח.

> הערה: השולח API מחובר באמצעות קווים, אך אתרי שיחות הפקה עבור חלק מהאירועים שאינם `test.ping` עדיין נוחתים. בדוק את `grep dispatchEvent` כדי לראות אילו נתיבים מפעילים כעת את השולח בגרסה שלך.

## אַדְרִיכָלוּת

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

השליחה היא אש ושכח עבור המתקשר: `Promise.allSettled` בולע שגיאות לכל חיבור לאינטרנט כך שמקלט רע אחד לא יכול לחסום את האחרים.

## חתימת HMAC

כאשר ל-webhook יש `secret`, OmniRoute חותם על גוף JSON ושולח:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> שמות כותרות משתמשים בקידומת `X-Webhook-*` (לא `X-OmniRoute-*`). ערך החתימה הוא `sha256=<hex>` — אמת את הקידומת המלאה.

אם קוראים `createWebhook` ללא סוד, מודול DB יוצר אחד (`whsec_<48 hex>`) כך שכל ה-webhooks חתומים כברירת מחדל.

### מאמת במקלט

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

בדוק תמיד נגד **נָא** גוף הבקשה, לפני כל ניתוח JSON.

## מדיניות ניסיון חוזר וכישלון

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- פסק זמן של 10 שניות לכל ניסיון (`AbortController`).
- HTTP 2xx נחשב כהצלחה.
- HTTP 3xx/4xx נחשב כסטטוס סופי שאינו ניתן לניסיון חוזר — שנרשם כפי שנמסר עם `success = res.ok`.
- HTTP 5xx ושגיאות רשת מנוסים שוב עם השבתה אקספוננציאלית: `2^attempt * 1000 ms` (1s, 2s, 4s).
- לאחר `maxRetries`, המסירה מתועדת ככשלה.
- כל משלוח מעדכן `last_triggered_at`, `last_status`, ומאפס או מגדיל `failure_count`.
- השולח קורא ל- `disableWebhooksWithHighFailures(10)` לאחר כל איוורור, כך שכל חיבור לאינטרנט עם `failure_count >= 10` מושבת באופן אוטומטי.

## מסד נתונים

טבלה `webhooks` (הגירה `011_webhooks.sql`):

| עַמוּדָה            | סוּג    | הערות                                   |
| ------------------- | ------- | --------------------------------------- |
| `id`                | TEXT PK | UUID                                    |
| `url`               | TEXT    | יעד URL                                 |
| `events`            | TEXT    | מערך JSON ; ברירת מחדל `["*"]`          |
| `secret`            | TEXT    | סוד HMAC (נוצר אוטומטית אם לא ניתן)     |
| `enabled`           | INT     | 0/1; ברירת המחדל היא 1                  |
| `description`       | TEXT    | תווית אנושית אופציונלית                 |
| `created_at`        | TEXT    | `datetime('now')`                       |
| `last_triggered_at` | TEXT    | מעודכן בכל ניסיון משלוח                 |
| `last_status`       | INT     | סטטוס HTTP של הניסיון האחרון (0 רשת = ) |
| `failure_count`     | INT     | מאפס ל-0 על הצלחה, + 1 על כישלון        |

היסטוריית המסירה נמשכת בטבלת ה- `webhook_deliveries` הייעודית (הגירה `069_webhook_deliveries.sql`, נכתבת באמצעות `src/lib/db/webhookDeliveries.ts::insertDelivery` בכל ניסיון), בנוסף למונים המצטברים בשורת `webhooks`. מטא נתונים חביבים (Slack / Discord / Telegram / שנאי עומס מותאמים אישית) נוספו על ידי `070_webhooks_kind_metadata.sql`.

## REST API

כל נקודות הקצה דורשות אישור ניהול (`requireManagementAuth`).

| נקודת קצה                       | שִׁיטָה | תֵאוּר                                  |
| ------------------------------- | ------- | --------------------------------------- |
| `/api/webhooks`                 | GET     | רשום webhooks (הסודות מוסווים)          |
| `/api/webhooks`                 | POST    | צור webhook                             |
| `/api/webhooks/[id]`            | GET     | פירוט Webhook (סוד מלא)                 |
| `/api/webhooks/[id]`            | PUT     | עדכן שדות                               |
| `/api/webhooks/[id]`            | DELETE  | לְהַסִיר                                |
| `/api/webhooks/[id]/test`       | POST    | הפעלת `test.ping` (ללא ניסיונות חוזרים) |
| `/api/webhooks/[id]/deliveries` | GET     | ניסיונות משלוח אחרונים עבור webhook אחד |
| `/api/webhooks/validate-url`    | POST    | אימות URL לפני טיסה (שומר SSRF )        |

`GET /api/webhooks` מסווה את הסוד ל- `<first 10 chars>...` כדי למנוע דליפה בדפי רישום. השתמש ב- `[id]` GET כאשר אתה באמת צריך את הסוד.

### צור webhook

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

אם `secret` מושמט, השרת יוצר סוד `whsec_<hex>` ומחזיר אותו בתגובה.

### בדיקת webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

מחזיר `{ delivered, status, error }`. אין ניסיון חוזר — שימושי לאימות מהיר שהמקלט מקבל את המטען והחתימה.

## לוּחַ מַחווָנִים

דף לוח המחוונים ב- `/dashboard/webhooks` (ראה `src/app/(dashboard)/dashboard/webhooks/page.tsx`) מספק:

- Create/edit webhooks עם בוחר אירועים
- מחוון מצב (פעיל / לא פעיל / שגיאה) מבוסס על `enabled`, `failure_count` ו- `last_status`
- מסירת בדיקה בקליק אחד
- החלפת enable/disable ידנית

## דוגמאות למטען

### request.completed

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

צורות שדות עבור אירועים שאינם `test.ping` מוגדרות על ידי אתרי השיחות שפולטים אותם; התייחס לאובייקט `data` כתואם קדימה (הוסף שדות, אל תסתמך על היעדרות).

## שיטות עבודה מומלצות

- **אמת את החתימה בכל משלוח** נגד הגוף הגולמי — מונע POSTs מזויף מכל מי שמנחש את ה-webhook שלך URL.
- **השב 2xx בתוך ~ 5 שניות** — הזמן קצוב של השולח ב-10 שניות. מקלטים איטיים יאכלו ניסיונות חוזרים וינפחו `failure_count`.
- **הפוך את המטפלים לאימפוטנטיים** ניסיונות חוזרים — וסמנטיקה של מסירה לפחות פעם אחת אומר שכפולים אפשריים.
- **הירשם מינימלי** — רשום רק אירועים שאתה צורך בפועל; `"*"` יוסיף עלות על מקלטים שאינך שולט בהם.
- **צפו ב- `failure_count`** נקודות קצה — מושבתות אוטומטית ב-10 כשלים רצופים; לאפס על ידי קריאת `PUT /api/webhooks/[id]` עם `enabled: true` לאחר תיקון המקלט.
- **סובב סודות מעת לעת** — `PUT` `secret` חדש, פרוס את הערך החדש למקלט ואשר באמצעות נקודת הקצה של הבדיקה.

## ראה גם

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — משטח API ניהול מלא
- סמנטיקה של מפסק / קירור [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — שמאחורי כשלים בספק עלו דרך `request.failed`
- מקור: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
