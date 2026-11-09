# Webhooks (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Источник истины:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Последнее обновление:** 28.06.2026 — v3.8.40

OmniRoute может запускать веб-перехватчики HTTP для событий платформы. Используйте их для интеграции с Slack, PagerDuty, Datadog, внутренними службами оповещения или любым приемником HTTP.

Диспетчер подписывает каждую доставку с помощью HMAC-SHA256, повторяет попытки в случае временных сбоев, отслеживает работоспособность доставки для каждого веб-перехватчика и автоматически отключает конечные точки, которые продолжают выходить из строя.

## Поддерживаемые события

Тип `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, используемый `src/lib/webhookDispatcher.ts`) в настоящее время моделирует семь событий:

| Событие                   | Срабатывает, когда                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `request.completed`       | Прокси-запрос успешно завершен                                                                               |
| `request.failed`          | Прокси-запрос завершается сбоем после всех retries/fallback                                                  |
| `quota.exceeded`          | Ключ API пересекает порог budget/quota                                                                       |
| `proxy.set_aside`         | Участник пула прокси отстраняется после неоднократных отказов (только переход)                               |
| `proxy.pool.exhausted`    | Каждый член области пула прокси выделяется.                                                                  |
| `provider.reset_redeemed` | Автоматическое применение банковских сбросов, погашение кредита сброса или сброс еженедельного сеанса Claude |
| `test.ping`               | Синтетическое событие, используемое конечной точкой теста.                                                   |

Подписки принимают буквальный `"*"` для получения каждого события. Неизвестные имена событий в `events` игнорируются во время отправки.

> Примечание: диспетчер API подключен, но места производственных вызовов для некоторых событий, не связанных с `test.ping`, все еще доступны. Проверьте `grep dispatchEvent` чтобы узнать, какие пути в настоящее время вызывают диспетчер в вашем выпуске.

## Архитектура

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

Отправка для вызывающего абонента осуществляется по принципу «выстрелил и забыл»: `Promise.allSettled` проглатывает ошибки каждого веб-перехватчика, поэтому один плохой получатель не может заблокировать остальных.

## Подписание HMAC

Когда вебхук имеет `secret`, OmniRoute подписывает тело JSON и отправляет:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> В именах заголовков используется префикс `X-Webhook-*` (не `X-OmniRoute-*`). Значение подписи — `sha256=<hex>` —, проверьте полный префикс.

Если `createWebhook` вызывается без секрета, модуль DB генерирует его (`whsec_<48 hex>`), поэтому все веб-перехватчики подписываются по умолчанию.

### Проверка на приемнике

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Всегда проверяйте соответствие **сырой** тело запроса перед анализом JSON.

## Политика повторных попыток и сбоев

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10-секундный тайм-аут на попытку (`AbortController`).
- HTTP 2xx считается успехом.
- HTTP 3xx/4xx считается неповторяемым окончательным статусом — записанным как доставленный с помощью `success = res.ok`.
- HTTP 5xx и сетевые ошибки повторяются с экспоненциальной задержкой: `2^attempt * 1000 ms` (1 с, 2 с, 4 с).
- После `maxRetries` доставка записывается как неудавшаяся.
- Каждая поставка обновляет `last_triggered_at`, `last_status` и либо сбрасывает, либо увеличивает `failure_count`.
- Диспетчер вызывает `disableWebhooksWithHighFailures(10)` после каждого разветвления, поэтому любой веб-перехватчик с `failure_count >= 10` автоматически отключается.

## База данных

Таблица `webhooks` (миграция `011_webhooks.sql`):

| Столбец             | Тип     | Примечания                                              |
| ------------------- | ------- | ------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                    |
| `url`               | TEXT    | Пункт назначения URL                                    |
| `events`            | TEXT    | массив JSON ; `["*"]` по умолчанию                      |
| `secret`            | TEXT    | Секрет HMAC (создается автоматически, если не указан)   |
| `enabled`           | INT     | 0/1; по умолчанию 1                                     |
| `description`       | TEXT    | Дополнительная человеческая метка                       |
| `created_at`        | TEXT    | `datetime('now')`                                       |
| `last_triggered_at` | TEXT    | Обновляется при каждой попытке доставки                 |
| `last_status`       | INT     | Статус HTTP последней попытки (сеть 0 = )               |
| `failure_count`     | INT     | Сбрасывается в 0 в случае успеха, + 1 в случае неудачи. |

История доставки сохраняется в специальной таблице `webhook_deliveries` (миграция `069_webhook_deliveries.sql`, записываемая через `src/lib/db/webhookDeliveries.ts::insertDelivery` при каждой попытке), а также в сводных счетчиках в строке `webhooks`. Вид метаданных (Slack / Discord / Telegram /настраиваемые преобразователи полезной нагрузки) был добавлен `070_webhooks_kind_metadata.sql`.

## REST API

Все конечные точки требуют аутентификации управления (`requireManagementAuth`).

| Конечная точка                  | Метод  | Описание                                                   |
| ------------------------------- | ------ | ---------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Получение списка веб-перехватчиков (секреты замаскированы) |
| `/api/webhooks`                 | POST   | Создать вебхук                                             |
| `/api/webhooks/[id]`            | GET    | Детали вебхука (полный секрет)                             |
| `/api/webhooks/[id]`            | PUT    | Обновить поля                                              |
| `/api/webhooks/[id]`            | DELETE | Удалять                                                    |
| `/api/webhooks/[id]/test`       | POST   | Запустить `test.ping` (без повторных попыток)              |
| `/api/webhooks/[id]/deliveries` | GET    | Недавние попытки доставки для одного вебхука               |
| `/api/webhooks/validate-url`    | POST   | Предполетная проверка URL (охрана SSRF )                   |

`GET /api/webhooks` скрывает секрет `<first 10 chars>...`, чтобы избежать утечки информации на страницах листинга. Используйте `[id]` GET когда вам действительно нужен секрет.

### Создать вебхук

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

Если `secret` опущен, сервер генерирует секрет `whsec_<hex>` и возвращает его в ответе.

### Тестовый вебхук

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Возвращает `{ delivered, status, error }`. Повторных попыток не предпринимается. — полезен для быстрой проверки того, что получатель принимает полезную нагрузку и подпись.

## Панель управления

Страница информационной панели `/dashboard/webhooks` (см. `src/app/(dashboard)/dashboard/webhooks/page.tsx`) содержит:

- Веб-перехватчики Create/edit со средством выбора событий
- Индикатор состояния (активный/неактивный/ошибочный) на основе `enabled`, `failure_count` и `last_status`
- Тестовая доставка в один клик
- Ручное переключение enable/disable

## Примеры полезной нагрузки

### запрос.завершен

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

Формы полей для событий, не относящихся `test.ping` определяются узлами вызова, которые их отправляют; рассматривать объект `data` как совместимый с предыдущими версиями (добавлять поля, не зависеть от их отсутствия).

## Лучшие практики

- **Проверяйте подпись на каждой доставке** против необработанного тела — предотвращает подделку POSTs от любого, кто угадает ваш вебхук URL.
- **Ответьте на 2xx в течение ~ 5 секунд.** — тайм-аут диспетчера составляет 10 с. Медленные получатели будут поглощать повторные попытки и раздувать `failure_count`.
- **Сделать обработчики идемпотентными** Повторные попытки — и семантика доставки «хотя бы один раз» означают, что дубликаты возможны.
- **Подпишитесь минимально** — перечисляет только события, которые вы действительно потребляете; `"*"` увеличит стоимость получателей, которые вы не контролируете.
- **Смотреть `failure_count`** Конечные точки — автоматически отключаются при 10 последовательных сбоях; сброс путем вызова `PUT /api/webhooks/[id]` с помощью `enabled: true` после ремонта приемника.
- **Периодически меняйте секреты** — `PUT` новый `secret`, передайте новое значение получателю и подтвердите через конечную точку тестирования.

## См. также

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — полное управление API поверхность
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Семантика автоматического выключателя/перезарядки — лежащая в основе сбоев поставщика, обнаружена через `request.failed`
- Источник: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
