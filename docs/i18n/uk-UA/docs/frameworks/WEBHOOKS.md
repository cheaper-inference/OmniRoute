# Webhooks (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Джерело правди:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute може запускати веб-хуки HTTP на події платформи. Використовуйте їх для інтеграції з Slack, PagerDuty, Datadog, внутрішніми службами оповіщення або будь-яким приймачем HTTP.

Диспетчер підписує кожну доставку за допомогою HMAC-SHA256, повторює спроби в разі тимчасових збоїв, відстежує стан доставки за вебхук і автоматично вимикає кінцеві точки, які постійно виходять з ладу.

## Підтримувані події

Тип `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, споживаний `src/lib/webhookDispatcher.ts`) наразі моделює сім подій:

| Подія                     | Пожежі коли                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Проксований запит виконано успішно                                                                          |
| `request.failed`          | Проксований запит завершується невдало після всіх retries/fallback                                          |
| `quota.exceeded`          | Ключ API перетинає поріг budget/quota                                                                       |
| `proxy.set_aside`         | Член проксі-пулу виділяється після повторних відмов (лише перехід)                                          |
| `proxy.pool.exhausted`    | Кожен член області проксі-пулу виділено                                                                     |
| `provider.reset_redeemed` | Автоматичне застосування банківських скидань викупив кредит скидання або скидання щотижневого сеансу Claude |
| `test.ping`               | Синтетична подія, яка використовується кінцевою точкою тесту                                                |

Підписка приймає буквальний `"*"` для отримання кожної події. Невідомі назви подій у `events` ігноруються під час відправлення.

> Примітка: диспетчерська API підключена, але сайти робочих викликів для деяких подій, не пов’язаних із `test.ping` все ще приземляються. Перевірте `grep dispatchEvent`, щоб побачити, які шляхи зараз викликають диспетчер у вашому випуску.

## Архітектура

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

Відправка — це «запусти й забудь» для абонента: `Promise.allSettled` ковтає помилки кожного веб-хуку, тому один поганий приймач не може блокувати інші.

## Підписання HMAC

Коли вебхук має `secret`, OmniRoute підписує тіло JSON і надсилає:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> У назвах заголовків використовується префікс `X-Webhook-*` (а не `X-OmniRoute-*`). Значення підпису – `sha256=<hex>` — перевірити повний префікс.

Якщо `createWebhook` викликається без секрету, модуль DB генерує його (`whsec_<48 hex>`), тому всі веб-хуки підписуються за замовчуванням.

### Перевірка на приймачі

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Завжди звіряйте з **сирий** тіло запиту перед будь-яким аналізом JSON.

## Політика повторних спроб і невдач

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Тайм-аут 10 секунд на спробу (`AbortController`).
- HTTP 2xx вважається успіхом.
- HTTP 3xx/4xx вважається кінцевим статусом —, який не підлягає повторній спробі, записаним як доставлений із `success = res.ok`.
- HTTP 5xx і помилки мережі повторюються з експоненційною відстрочкою: `2^attempt * 1000 ms` (1 с, 2 с, 4 с).
- Після `maxRetries` доставка реєструється як невдала.
- Кожна доставка оновлює `last_triggered_at`, `last_status` і скидає або збільшує `failure_count`.
- Диспетчер викликає `disableWebhooksWithHighFailures(10)` після кожного розгортання, тому будь-який вебхук із `failure_count >= 10` автоматично вимикається.

## База даних

Таблиця `webhooks` (міграція `011_webhooks.sql`):

| Колонка             | Тип     | Примітки                                               |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | Пункт призначення URL                                  |
| `events`            | TEXT    | масив JSON ; за замовчуванням `["*"]`                  |
| `secret`            | TEXT    | Секрет HMAC (генерується автоматично, якщо не вказано) |
| `enabled`           | INT     | 0/1; за замовчуванням 1                                |
| `description`       | TEXT    | Додаткова мітка людини                                 |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Оновлюється під час кожної спроби доставки             |
| `last_status`       | INT     | Статус HTTP останньої спроби (0 мережа = )             |
| `failure_count`     | INT     | Скидається до 0 у разі успіху, + 1 у разі невдачі      |

Історія доставки зберігається у спеціальній таблиці `webhook_deliveries` (міграція `069_webhook_deliveries.sql`, записана через `src/lib/db/webhookDeliveries.ts::insertDelivery` під час кожної спроби), на додаток до сукупних лічильників у рядку `webhooks`. Метадані типу (Slack / Discord / Telegram /користувацькі трансформатори корисного навантаження) додав `070_webhooks_kind_metadata.sql`.

## REST API

Для всіх кінцевих точок потрібна авторизація керування (`requireManagementAuth`).

| Кінцева точка                   | метод  | опис                                          |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | Список веб-хуків (замасковані секрети)        |
| `/api/webhooks`                 | POST   | Створити вебхук                               |
| `/api/webhooks/[id]`            | GET    | Деталі вебхуку (повний секрет)                |
| `/api/webhooks/[id]`            | PUT    | Оновити поля                                  |
| `/api/webhooks/[id]`            | DELETE | видалити                                      |
| `/api/webhooks/[id]/test`       | POST   | Запустити `test.ping` (без повторних спроб)   |
| `/api/webhooks/[id]/deliveries` | GET    | Останні спроби доставки для одного вебхуку    |
| `/api/webhooks/validate-url`    | POST   | Передпольотна перевірка URL (охоронець SSRF ) |

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

Повертає `{ delivered, status, error }`. Повторних спроб немає. — корисний для швидкої перевірки того, що приймач приймає корисне навантаження та підпис.

## Приладова панель

Сторінка інформаційної панелі в `/dashboard/webhooks` (див. `src/app/(dashboard)/dashboard/webhooks/page.tsx`) містить:

- Веб-хуки Create/edit з інструментом вибору подій
- Індикатор статусу (активний/неактивний/помилковий) на основі `enabled`, `failure_count` та `last_status`
- Доставка тесту в один клік
- Перемикач enable/disable вручну

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

Форми полів для подій, що не належать до `test.ping` визначаються сайтами викликів, які їх видають; обробляти об’єкт `data` як сумісний із напрямком (додавати поля, не залежати від відсутності).

## Найкращі практики

- **Перевіряйте підпис на кожній доставці** проти необробленого тіла — запобігає підробці POSTs від усіх, хто вгадає ваш вебхук URL.
- **Відповідь 2xx протягом ~ 5 секунд** — диспетчер тайм-аут 10 с. Повільні приймачі з'їдять повторні спроби та завищать `failure_count`.
- **Зробіть обробники ідемпотентними** Повторні спроби — та семантика доставки принаймні один раз означають, що дублікати можливі.
- **Підпишіться мінімально** — перераховує лише події, які ви фактично споживаєте; `"*"` збільшить вартість приймачів, які ви не контролюєте.
- **Дивіться `failure_count`** Кінцеві точки — автоматично відключаються при 10 послідовних збоях; скинути, викликавши `PUT /api/webhooks/[id]` з `enabled: true` після лагодження приймача.
- **Періодично змінюйте секрети** — `PUT` новий `secret`, розгорніть нове значення в приймачі та підтвердьте через тестову кінцеву точку.

## Дивіться також

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — повне керування поверхнею API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — семантика автоматичного вимикача/кулдауну за збоями постачальника, виявлені через `request.failed`
- Джерело: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
