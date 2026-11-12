# Webhooks (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Източник на истината:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute може да задейства HTTP уебкукички на събития на платформа. Използвайте ги, за да се интегрирате със Slack, PagerDuty, Datadog, вътрешни услуги за предупреждение или всеки HTTP приемник.

Диспечерът подписва всяка доставка със HMAC-SHA256, прави повторни опити при преходни повреди, проследява здравето на доставката за уеб кукичка и автоматично деактивира крайни точки, които продължават да се провалят.

## Поддържани събития

Типът `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, консумиран от `src/lib/webhookDispatcher.ts`) в момента моделира седем събития:

| Събитие                   | Пожари, когато                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Прокси заявка завършва успешно                                                                                    |
| `request.failed`          | Прокси заявка е неуспешна след retries/fallback                                                                   |
| `quota.exceeded`          | API ключ преминава budget/quota праг                                                                              |
| `proxy.set_aside`         | Член на прокси пул се отделя след многократни откази (само при преход)                                            |
| `proxy.pool.exhausted`    | Всеки член на обхват на прокси пул е отделен                                                                      |
| `provider.reset_redeemed` | Автоматично прилагане на банкирани нулирания, осребрен кредит за нулиране или нулиране на седмичната сесия Claude |
| `test.ping`               | Синтетично събитие, използвано от крайната точка на теста                                                         |

Абонаментите приемат буквалния `"*"` за получаване на всяко събитие. Неизвестните имена на събития в `events` се игнорират по време на изпращане.

> Забележка: API на диспечера е свързан, но производствените сайтове за повикване за някои от събитията, различни от `test.ping`, все още се приземяват. Проверете `grep dispatchEvent`, за да видите кои пътища в момента извикват диспечера във вашето издание.

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

Изпращането е „изстреляй и забрави“ за обаждащия се: `Promise.allSettled` поглъща грешки за всяка уебкукичка, така че един лош приемник не може да блокира останалите.

## Подписване HMAC

Когато webhook има `secret`, OmniRoute подписва тялото на JSON и изпраща:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Имената на заглавките използват префикса `X-Webhook-*` (не `X-OmniRoute-*`). Стойността на подписа е `sha256=<hex>` — проверете пълния префикс.

Ако `createWebhook` се извика без тайна, DB модулът генерира такава (`whsec_<48 hex>`), така че всички уеб кукички са подписани по подразбиране.

### Проверка на приемника

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Винаги проверявайте срещу **суров** тяло на заявката, преди всяко JSON анализиране.

## Политика за повторен опит и неуспех

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 секунди таймаут на опит (`AbortController`).
- HTTP 2xx се счита за успех.
- HTTP 3xx/4xx се брои като краен статус без повторен опит — записан като доставен със `success = res.ok`.
- HTTP 5xx и мрежовите грешки се опитват повторно с експоненциално забавяне: `2^attempt * 1000 ms` (1s, 2s, 4s).
- След `maxRetries` доставката се записва като неуспешна.
- Всяка доставка актуализира `last_triggered_at`, `last_status` и или нулира, или увеличава `failure_count`.
- Диспечерът извиква `disableWebhooksWithHighFailures(10)` след всяко разклоняване, така че всеки webhook със `failure_count >= 10` се деактивира автоматично.

## База данни

Таблица `webhooks` (миграция `011_webhooks.sql`):

| Колона              | Тип     | Бележки                                              |
| ------------------- | ------- | ---------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                 |
| `url`               | TEXT    | Дестинация URL                                       |
| `events`            | TEXT    | JSON масив; по подразбиране `["*"]`                  |
| `secret`            | TEXT    | HMAC тайна (автоматично генерирана, ако не е дадена) |
| `enabled`           | INT     | 0/1; по подразбиране е 1                             |
| `description`       | TEXT    | Незадължителен човешки етикет                        |
| `created_at`        | TEXT    | `datetime('now')`                                    |
| `last_triggered_at` | TEXT    | Актуализира се при всеки опит за доставка            |
| `last_status`       | INT     | HTTP състояние на последния опит (0 = мрежа)         |
| `failure_count`     | INT     | Нулира се на 0 при успех, + 1 при неуспех            |

Хронологията на доставките се запазва в специалната `webhook_deliveries` таблица (миграция `069_webhook_deliveries.sql`, написана чрез `src/lib/db/webhookDeliveries.ts::insertDelivery` при всеки опит), в допълнение към сборните броячи в реда `webhooks`. Вид метаданни (Slack / Discord / Telegram / персонализирани трансформатори на полезен товар) бяха добавени от `070_webhooks_kind_metadata.sql`.

## REST API

Всички крайни точки изискват удостоверяване за управление (`requireManagementAuth`).

| Крайна точка                    | Метод  | Описание                                      |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | Списък на уеб кукички (маскирани тайни)       |
| `/api/webhooks`                 | POST   | Създаване на уеб кукичка                      |
| `/api/webhooks/[id]`            | GET    | Подробности за уеб кукичка (пълна тайна)      |
| `/api/webhooks/[id]`            | PUT    | Актуализиране на полета                       |
| `/api/webhooks/[id]`            | DELETE | Премахнете                                    |
| `/api/webhooks/[id]/test`       | POST   | Задействайте `test.ping` (без повторни опити) |
| `/api/webhooks/[id]/deliveries` | GET    | Скорошни опити за доставка за една уебкукичка |
| `/api/webhooks/validate-url`    | POST   | URL валидиране преди полет (SSRF охрана)      |

`GET /api/webhooks` маскира тайната на `<first 10 chars>...`, за да избегне изтичане на страници със списъци. Използвайте `[id]` GET когато наистина имате нужда от тайната.

### Създаване на уеб кукичка

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

Ако `secret` е пропуснато, сървърът генерира `whsec_<hex>` тайна и я връща в отговора.

### Тествайте webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Връща `{ delivered, status, error }`. Без повторни опити. — е полезно за бързо потвърждаване, че приемникът приема полезния товар и подписа.

## Табло за управление

Страницата на таблото за управление в `/dashboard/webhooks` (вижте `src/app/(dashboard)/dashboard/webhooks/page.tsx`) предоставя:

- Create/edit уеб кукички с инструмент за избор на събития
- Индикатор за състояние (активен / неактивен / с грешка) въз основа на `enabled`, `failure_count` и `last_status`
- Доставка на тест с едно кликване
- Ръчно превключване enable/disable

## Примери за полезен товар

### заявка.завършен

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

Формите на полетата за не-`test.ping` събития се определят от сайтовете за повикване, които ги излъчват; третирайте `data` обекта като съвместим с напред (добавете полета, не зависете от отсъствието).

## Най-добри практики

- **Проверявайте подписа при всяка доставка** срещу необработеното тяло — предотвратява фалшив POSTs от всеки, който познае вашия webhook URL.
- **Отговорете 2xx в рамките на ~ 5 секунди** — диспечера изтича на 10 s. Бавните приемници ще изядат повторни опити и ще надуят `failure_count`.
- **Направете манипулаторите идемпотентни** Повторните опити — и семантиката за доставка поне веднъж означават, че са възможни дубликати.
- **Абонирайте се минимум** — изброява само събития, които действително консумирате; `"*"` ще добави разходи за приемници, които не контролирате.
- **Гледайте `failure_count`** — крайните точки се дезактивират автоматично при 10 последователни повреди; нулиране чрез извикване на `PUT /api/webhooks/[id]` с `enabled: true` след коригиране на приемника.
- **Редувайте тайните периодично** — `PUT` нов `secret`, разположете новата стойност към приемника и потвърдете чрез тестовата крайна точка.

## Вижте също

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — пълно управление API повърхност
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — прекъсвач/семантика на изчакване зад повреди на доставчика, появили се чрез `request.failed`
- Източник: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
