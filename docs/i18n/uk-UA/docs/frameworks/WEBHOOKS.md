# Webhooks (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Джерело істини:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute може надсилати HTTP-вебхуки під час подій платформи. Використовуйте їх для інтеграції зі
Slack, PagerDuty, Datadog, внутрішніми службами сповіщень або будь-яким HTTP-одержувачем.

Диспетчер підписує кожну доставку за допомогою HMAC-SHA256, повторює спроби в разі тимчасових
помилок, відстежує стан доставки для кожного вебхука й автоматично вимикає кінцеві точки, які
продовжують завершуватися помилкою.

## Підтримувані події

Тип `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, споживаний `src/lib/webhookDispatcher.ts`) наразі моделює вісім подій:

| Подія                     | Пожежі коли                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Проксований запит виконано успішно                                                                          |
| `request.failed`          | Проксований запит завершується помилкою після всіх retries/fallback                                         |
| `quota.exceeded`          | Ключ API перетинає поріг budget/quota                                                                       |
| `proxy.set_aside`         | Член проксі-пулу відкладається після повторних відмов (лише перехід)                                        |
| `proxy.pool.exhausted`    | Кожен член області проксі-пулу виділено                                                                     |
| `provider.reset_redeemed` | Автоматичне застосування банківських скидань викупив кредит скидання або скидання щотижневого сеансу Claude |
| `provider.exhausted`      | Кожен обліковий запис постачальника охолоджується (щонайбільше один раз на постачальника кожні 10 хвилин)   |
| `test.ping`               | Синтетична подія, яка використовується кінцевою точкою тесту                                                |

Підписки приймають літеральний `"*"` для отримання кожної події. Невідомі назви подій у `events` ігноруються під час відправлення.

> Примітка: диспетчер API підключений, але сайти робочих викликів для деяких подій, не пов’язаних з `test.ping` усе ще приземляються. Перевірте `grep dispatchEvent`, щоб побачити, які шляхи зараз викликають диспетчер у вашому випуску.

## Архітектура

```
Викликач (обробник, служба, монітор)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> фільтрування за webhook.events
    -> для кожного збігу (паралельно):
       deliverWebhook(url, payload, secret)
         формування корисного навантаження { event, timestamp, data }
         підписання тіла за допомогою HMAC-SHA256 (якщо наявний секрет)
         POST із тайм-аутом 10 с
         до 3 повторних спроб у разі помилки 5xx / помилки мережі
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Для виклику диспетчеризація виконується за принципом «запустити й не чекати»: `Promise.allSettled` поглинає
помилки окремих вебхуків, тому один несправний одержувач не може заблокувати інші.

## Підписування HMAC

Коли вебхук має `secret`, OmniRoute підписує тіло JSON і надсилає:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <подія>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<шістнадцятковий HMAC-SHA256(secret, body)>
```

> Назви заголовків використовують префікс `X-Webhook-*` (а не `X-OmniRoute-*`). Значення підпису
> має формат `sha256=<hex>` — перевіряйте повний префікс.

Якщо `createWebhook` викликається без секрету, модуль БД генерує його
(`whsec_<48 hex>`), тому за замовчуванням усі вебхуки підписуються.

### Перевірка на боці одержувача

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Завжди перевіряйте підпис за **необробленим** тілом запиту до будь-якого розбору JSON.

## Політика повторних спроб і помилок

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Тайм-аут 10 секунд для кожної спроби (`AbortController`).
- HTTP 2xx вважається успішним результатом.
- HTTP 3xx/4xx вважається остаточним статусом без повторних спроб — доставка записується
  зі значенням `success = res.ok`.
- У разі HTTP 5xx і мережевих помилок виконуються повторні спроби з експоненційною затримкою:
  `2^attempt * 1000 ms` (1 с, 2 с, 4 с).
- Після `maxRetries` доставка записується як невдала.
- Кожна доставка оновлює `last_triggered_at`, `last_status`, а також скидає
  або збільшує `failure_count`.
- Після кожної розсилки диспетчер викликає `disableWebhooksWithHighFailures(10)`,
  тому будь-який вебхук із `failure_count >= 10` автоматично вимикається.

## База даних

Таблиця `webhooks` (міграція `011_webhooks.sql`):

| Стовпець            | Тип     | Примітки                                               |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | URL призначення                                        |
| `events`            | TEXT    | Масив JSON; типове значення `["*"]`                    |
| `secret`            | TEXT    | Секрет HMAC (генерується автоматично, якщо не вказано) |
| `enabled`           | INT     | 0/1; типове значення — 1                               |
| `description`       | TEXT    | Необов’язкова зрозуміла людині мітка                   |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Оновлюється під час кожної спроби доставки             |
| `last_status`       | INT     | HTTP-статус останньої спроби (0 = помилка мережі)      |
| `failure_count`     | INT     | Скидається до 0 у разі успіху, +1 у разі помилки       |

Історія доставок зберігається у спеціальній таблиці `webhook_deliveries`
(міграція `069_webhook_deliveries.sql`, запис виконується через
`src/lib/db/webhookDeliveries.ts::insertDelivery` під час кожної спроби), на додачу
до агрегованих лічильників у рядку `webhooks`. Метадані типу (Slack / Discord /
Telegram / перетворювачі користувацьких корисних навантажень) додано міграцією `070_webhooks_kind_metadata.sql`.

## REST API

Для всіх кінцевих точок потрібна автентифікація керування (`requireManagementAuth`).

| Кінцева точка                   | метод  | опис                                        |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | Список веб-хуків (замасковані секрети)      |
| `/api/webhooks`                 | POST   | Створити вебхук                             |
| `/api/webhooks/[id]`            | GET    | Деталі вебхуку (повний секрет)              |
| `/api/webhooks/[id]`            | PUT    | Оновити поля                                |
| `/api/webhooks/[id]`            | DELETE | видалити                                    |
| `/api/webhooks/[id]/test`       | POST   | Запустити `test.ping` (без повторних спроб) |
| `/api/webhooks/[id]/deliveries` | GET    | Останні спроби доставки для одного вебхуку  |
| `/api/webhooks/validate-url`    | POST   | Передпольотна перевірка URL (SSRF guard)    |

`GET /api/webhooks` маскує секрет для `<first 10 chars>...`, щоб уникнути витоку на сторінках списку. Використовуйте `[id]` GET коли вам дійсно потрібен секрет.

### Створити вебхук

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

Якщо `secret` опущено, сервер генерує секрет `whsec_<hex>` і повертає його у відповідь.

### Перевірте вебхук

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Повертає `{ delivered, status, error }`. Немає повторних спроб. — корисно для швидкої перевірки того, що приймач приймає корисне навантаження та підпис.

## Панель керування

Сторінка панелі керування за адресою `/dashboard/webhooks` (див.
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) надає:

- Створення та редагування вебхуків із засобом вибору подій
- Індикатор стану (активний / неактивний / з помилкою) на основі `enabled`,
  `failure_count` і `last_status`
- Тестову доставку одним натисканням
- Ручне ввімкнення та вимкнення

## Приклади корисного навантаження

### запит.завершено

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

Форми полів для подій, не пов’язаних з `test.ping` визначаються сайтами викликів, які їх видають; обробляти об’єкт `data` як сумісний із напрямком (додавати поля, не залежати від відсутності).

## Рекомендації

- **Перевіряйте підпис кожної доставки** за необробленим тілом запиту — це запобігає підробленим POST-запитам від будь-кого, хто вгадає URL вашого вебхука.
- **Відповідайте кодом 2xx протягом ~5 секунд** — диспетчер перериває очікування через 10 с. Повільні отримувачі витрачатимуть повторні спроби та збільшуватимуть `failure_count`.
- **Зробіть обробники ідемпотентними** — повторні спроби та семантика доставки «щонайменше один раз» означають, що можливі дублікати.
- **Підписуйтеся лише на необхідні події** — указуйте тільки події, які ви фактично обробляєте; `"*"` збільшить навантаження на отримувачів, які ви не контролюєте.
- **Стежте за `failure_count`** — кінцеві точки автоматично вимикаються після 10 послідовних помилок; після виправлення отримувача скиньте лічильник, викликавши `PUT /api/webhooks/[id]` з `enabled: true`.
- **Періодично змінюйте секрети** — надішліть через `PUT` новий `secret`, розгорніть нове значення на отримувачі та підтвердьте його роботу через тестову кінцеву точку.

## Див. також

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — повний набір API керування
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — семантика автоматичного вимикача / періоду очікування
  для збоїв провайдера, що відображаються через `request.failed`
- Вихідний код: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
