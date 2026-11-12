# Webhooks (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Извор истине:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Последње ажурирано:** 2026-06-28 — в3.8.40

OmniRoute може покренути HTTP веб-хукове на догађајима платформе. Користите их за интеграцију са Slack, PagerDuty, Датадог, интерним сервисима за упозорење или било којим HTTP пријемником.

Диспечер потписује сваку испоруку помоћу HMAC-SHA256, покушава поново у случају пролазних грешака, прати здравље испоруке по веб-хуку и аутоматски онемогућава крајње тачке које и даље не успевају.

## Подржани догађаји

`WebhookEvent` тип (`src/lib/webhooks/eventDescriptions.ts`, користи `src/lib/webhookDispatcher.ts`) тренутно моделира седам догађаја:

| Догађај                   | Пали када                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Прокси захтев је успешно завршен                                                                                  |
| `request.failed`          | Прокси захтев не успева након свих retries/fallback                                                               |
| `quota.exceeded`          | API кључ прелази budget/quota праг                                                                                |
| `proxy.set_aside`         | Члан скупа проксија се издваја након поновљених одбијања (само транзиција)                                        |
| `proxy.pool.exhausted`    | Сваки члан опсега скупа проксија је издвојен                                                                      |
| `provider.reset_redeemed` | Аутоматска примена банковних ресетовања је искористила кредит за ресетовање или ресетовање Claude седмичне сесије |
| `test.ping`               | Синтетички догађај који користи крајња тачка теста                                                                |

Претплате прихватају буквални `"*"` за пријем сваког догађаја. Непозната имена догађаја у `events` се игноришу у време слања.

> Напомена: диспечерски API је повезан, али локације за производне позиве за неке од догађаја који нису `test.ping` и даље слећу. Проверите `grep dispatchEvent` да видите које путање тренутно позивају диспечера у вашем издању.

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

Отпремање је пали-и-заборави за позиваоца: `Promise.allSettled` гута грешке по веб-хуку тако да један лош пријемник не може да блокира остале.

## Потписивање HMAC

Када веб-хук има `secret`, OmniRoute потписује JSON тело и шаље:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Имена заглавља користе `X-Webhook-*` префикс (не `X-OmniRoute-*`). Вредност потписа је `sha256=<hex>` — провери пун префикс.

Ако је `createWebhook` позван без тајне, DB модул генерише један (`whsec_<48 hex>`) тако да су сви веб-хукови подразумевано потписани.

### Верификација на пријемнику

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Увек проверите у односу на **сирово** тело захтева, пре било каквог JSON рашчлањивања.

## Политика поновног покушаја и неуспеха

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Тајм-аут од 10 секунди по покушају (`AbortController`).
- HTTP 2кк се рачуна као успех.
- HTTP 3xx/4xx се рачуна као коначни статус — који се не може поново покушати и који је забележен као испоручен са `success = res.ok`.
- HTTP 5кк и грешке мреже се поново покушавају са експоненцијалним повлачењем: `2^attempt * 1000 ms` (1с, 2с, 4с).
- Након `maxRetries`, испорука се евидентира као неуспела.
- Свака испорука ажурира `last_triggered_at`, `last_status` и ресетује или повећава `failure_count`.
- Диспечер позива `disableWebhooksWithHighFailures(10)` након сваког одвајања, тако да је сваки веб-хук са `failure_count >= 10` аутоматски онемогућен.

## База података

Табела `webhooks` (миграција `011_webhooks.sql`):

| Колона              | Тип     | Напомене                                                  |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | Одредиште URL                                             |
| `events`            | TEXT    | JSON низ; подразумевани `["*"]`                           |
| `secret`            | TEXT    | HMAC тајна (аутоматски генерисана ако није дата)          |
| `enabled`           | INT     | 0/1; подразумевано је 1                                   |
| `description`       | TEXT    | Опциона људска ознака                                     |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | Ажурирано при сваком покушају испоруке                    |
| `last_status`       | INT     | HTTP статус последњег покушаја (0 = мрежа)                |
| `failure_count`     | INT     | Ресетује се на 0 у случају успеха, + 1 у случају неуспеха |

Историја испоруке се задржава у наменској `webhook_deliveries` табели (миграција `069_webhook_deliveries.sql`, уписана преко `src/lib/db/webhookDeliveries.ts::insertDelivery` при сваком покушају), поред збирних бројача у `webhooks` реду. Врста метаподатака (Slack / Discord / Telegram / прилагођени трансформатори терета) је додао `070_webhooks_kind_metadata.sql`.

## REST API

Све крајње тачке захтевају потврду управљања (`requireManagementAuth`).

| Крајња тачка                    | Метод  | Опис                                       |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | Листа веб-хукова (тајне маскиране)         |
| `/api/webhooks`                 | POST   | Креирајте веб-хук                          |
| `/api/webhooks/[id]`            | GET    | Детаљи веб-хука (потпуна тајна)            |
| `/api/webhooks/[id]`            | PUT    | Ажурирајте поља                            |
| `/api/webhooks/[id]`            | DELETE | Уклони                                     |
| `/api/webhooks/[id]/test`       | POST   | Покрени `test.ping` (без покушаја)         |
| `/api/webhooks/[id]/deliveries` | GET    | Недавни покушаји испоруке за један веб-хук |
| `/api/webhooks/validate-url`    | POST   | URL валидација пре лета (SSRF заштита)     |

`GET /api/webhooks` маскира тајну `<first 10 chars>...` како би се избегло цурење на страницама са листингом. Користите `[id]` GET када вам је тајна заиста потребна.

### Креирајте веб-хук

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

Ако је `secret` изостављен, сервер генерише `whsec_<hex>` тајну и враћа је у одговору.

### Тест вебхоок

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Враћа `{ delivered, status, error }`. Не покушавају се поновљени покушаји. — је користан за брзу проверу да ли прималац прихвата терет и потпис.

## Дасхбоард

Страница контролне табле у `/dashboard/webhooks` (погледајте `src/app/(dashboard)/dashboard/webhooks/page.tsx`) пружа:

- Create/edit веб-хукови са бирачем догађаја
- Индикатор статуса (активан / неактиван / грешка) заснован на `enabled`, `failure_count` и `last_status`
- Испорука теста једним кликом
- Ручно пребацивање enable/disable

## Примери носивости

### захтев.завршен

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

### тест.пинг

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

Облици поља за догађаје који нису `test.ping` дефинисани су позивним локацијама које их емитују; третирајте `data` објекат као компатибилан унапред (додајте поља, не зависе од одсуства).

## Најбоље праксе

- **Проверите потпис на свакој испоруци** против сировог тела — спречава лажни POSTs од било кога ко погоди ваш вебхоок URL.
- **Одговорите 2кк унутар ~ 5 секунди** — диспечер истекне на 10 с. Спори пријемници ће појести поновне покушаје и надувати `failure_count`.
- **Учините руковаоце идемпотентнима** — поновни покушаји и семантика испоруке најмање једном значе да су дупликати могући.
- **Претплатите се минимално** — наводи само догађаје које стварно конзумирате; `"*"` ће додати трошкове пријемницима које не контролишете.
- **Гледајте `failure_count`** — крајње тачке се аутоматски деактивирају при 10 узастопних грешака; ресетујте позивањем `PUT /api/webhooks/[id]` са `enabled: true` након поправљања пријемника.
- **Периодично ротирајте тајне** — `PUT` нови `secret`, примените нову вредност на пријемник и потврдите преко тестне крајње тачке.

## Види такође

- [API_REFERENCE.мд](../reference/API_REFERENCE.md) — потпуно управљање API површина
- [RESILIENCE_GUIDE.мд](../architecture/RESILIENCE_GUIDE.md) — семантика прекидача/хлађења иза кварова провајдера откривена је преко `request.failed`
- Извор: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
