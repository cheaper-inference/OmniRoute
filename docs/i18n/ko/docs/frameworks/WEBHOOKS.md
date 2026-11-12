# Webhooks (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **진실의 출처:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute 플랫폼 이벤트에서 HTTP 웹후크를 실행할 수 있습니다. 이를 사용하여 Slack, PagerDuty, Datadog, 내부 경고 서비스 또는 HTTP 수신기와 통합할 수 있습니다.

디스패처는 HMAC-SHA256 사용하여 각 전달에 서명하고, 일시적인 오류에 대해 재시도하고, 웹훅당 전달 상태를 추적하고, 계속 실패하는 엔드포인트를 자동으로 비활성화합니다.

## 지원되는 이벤트

`WebhookEvent` 유형(`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` 에서 사용)은 현재 7가지 이벤트를 모델링합니다.

| 이벤트                    | 다음과 같은 경우에 발생합니다.                                                     |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `request.completed`       | 프록시 요청이 성공적으로 완료되었습니다.                                           |
| `request.failed`          | 모든 retries/fallback 후 프록시 요청이 실패합니다.                                 |
| `quota.exceeded`          | API 키가 budget/quota 임계값을 초과합니다.                                         |
| `proxy.set_aside`         | 반복된 거부 후 프록시 풀 구성원이 따로 설정됩니다(전환만 해당).                    |
| `proxy.pool.exhausted`    | 프록시 풀 범위의 모든 구성원은 별도로 설정됩니다.                                  |
| `provider.reset_redeemed` | 자동 적용 은행 재설정은 재설정 크레딧 또는 Claude 주간 세션 재설정을 상환했습니다. |
| `test.ping`               | 테스트 엔드포인트에서 사용되는 합성 이벤트                                         |

구독은 모든 이벤트를 수신하기 위해 문자 그대로 `"*"` 허용합니다. `events` 의 알 수 없는 이벤트 이름은 전달 시 무시됩니다.

> 참고: 디스패처 API 유선으로 연결되어 있지만 `test.ping` 아닌 일부 이벤트에 대한 프로덕션 통화 사이트는 여전히 연결 중입니다. 현재 릴리스에서 디스패처를 호출하는 경로를 확인하려면 `grep dispatchEvent` 확인하세요.

## 건축학

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

디스패치는 발신자에게 즉시 실행됩니다. `Promise.allSettled` 웹후크별 오류를 무시하므로 하나의 잘못된 수신자가 다른 수신자를 차단할 수 없습니다.

## HMAC 서명

웹훅에 `secret` 가 있으면 OmniRoute JSON 본문에 서명하고 다음을 보냅니다.

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> 헤더 이름은 `X-Webhook-*` 접두사( `X-OmniRoute-*` 아님)를 사용합니다. 서명 값은 `sha256=<hex>` 입니다. — 전체 접두사를 확인합니다.

`createWebhook` 비밀 없이 호출되면 DB 모듈은 비밀 비밀(`whsec_<48 hex>`)을 생성하므로 모든 웹후크가 기본적으로 서명됩니다.

### 수신기에서 확인 중

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

항상 대조하여 확인하십시오.**날것의** JSON 구문 분석 전에 요청 본문.

## 재시도 및 실패 정책

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 시도당 10초의 시간 초과(`AbortController`).
- HTTP 2xx는 성공으로 간주됩니다.
- HTTP 3xx/4xx `success = res.ok` 와 함께 전달된 것으로 기록된 — 재시도 불가능한 최종 상태로 간주됩니다.
- HTTP 5xx 및 네트워크 오류는 지수 백오프: `2^attempt * 1000 ms` (1s, 2s, 4s)로 재시도됩니다.
- `maxRetries` 이후에는 배송 실패로 기록됩니다.
- 각 전달은 `last_triggered_at`, `last_status` 업데이트하고 `failure_count` 재설정하거나 증가시킵니다.
- 디스패처는 각 팬아웃 후에 `disableWebhooksWithHighFailures(10)` 호출하므로 `failure_count >= 10` 가 포함된 웹후크는 자동으로 비활성화됩니다.

## 데이터 베이스

테이블 `webhooks` ( `011_webhooks.sql` 마이그레이션):

| 열                  | 유형    | 메모                                       |
| ------------------- | ------- | ------------------------------------------ |
| `id`                | TEXT PK | UUID                                       |
| `url`               | TEXT    | 목적지 URL                                 |
| `events`            | TEXT    | JSON 어레이; 기본 `["*"]`                  |
| `secret`            | TEXT    | HMAC 비밀(제공되지 않은 경우 자동 생성됨)  |
| `enabled`           | INT     | 0/1; 기본값은 1입니다.                     |
| `description`       | TEXT    | 선택적 인간 라벨                           |
| `created_at`        | TEXT    | `datetime('now')`                          |
| `last_triggered_at` | TEXT    | 배송을 시도할 때마다 업데이트됨            |
| `last_status`       | INT     | 마지막 시도의 HTTP 상태(0 = 네트워크)      |
| `failure_count`     | INT     | 성공 시 0으로 재설정, 실패 시 + 1로 재설정 |

전송 기록은 `webhooks` 행의 집계 카운터 외에도 전용 `webhook_deliveries` 테이블(모든 시도에서 `src/lib/db/webhookDeliveries.ts::insertDelivery` 통해 작성된 마이그레이션 `069_webhook_deliveries.sql`)에 유지됩니다. 종류 메타데이터(Slack / Discord / Telegram /사용자 정의 페이로드 변환기)가 `070_webhooks_kind_metadata.sql` 에 의해 추가되었습니다.

## REST API

모든 엔드포인트에는 관리 인증(`requireManagementAuth`)이 필요합니다.

| 엔드포인트                      | 방법   | 설명                              |
| ------------------------------- | ------ | --------------------------------- |
| `/api/webhooks`                 | GET    | 웹훅 나열(비밀은 마스킹됨)        |
| `/api/webhooks`                 | POST   | 웹훅 생성                         |
| `/api/webhooks/[id]`            | GET    | 웹훅 세부정보(전체 비밀)          |
| `/api/webhooks/[id]`            | PUT    | 필드 업데이트                     |
| `/api/webhooks/[id]`            | DELETE | 제거하다                          |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` 실행(재시도 없음)     |
| `/api/webhooks/[id]/deliveries` | GET    | 하나의 웹훅에 대한 최근 전송 시도 |
| `/api/webhooks/validate-url`    | POST   | 비행 전 URL 검증(SSRF 가드)       |

`GET /api/webhooks` 목록 페이지에 유출되는 것을 방지하기 위해 비밀을 `<first 10 chars>...` 에 숨깁니다. 실제로 비밀이 필요할 때 `[id]` GET 사용하세요.

### 웹훅 생성

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

`secret` 생략되면 서버는 `whsec_<hex>` 비밀을 생성하고 이를 응답으로 반환합니다.

### 웹훅 테스트

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` 반환합니다. 재시도가 시도되지 않습니다. — 수신자가 페이로드와 서명을 수락하는지 신속하게 검증하는 데 유용합니다.

## 계기반

`/dashboard/webhooks` 의 대시보드 페이지( `src/app/(dashboard)/dashboard/webhooks/page.tsx` 참조)는 다음을 제공합니다.

- 이벤트 선택기가 있는 Create/edit 웹후크
- `enabled`, `failure_count` 및 `last_status` 기반의 상태 표시기(활성/비활성/오류)
- 원클릭 테스트 제공
- 수동 enable/disable 토글

## 페이로드 예시

### 요청.완료

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

### 테스트.핑

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

비 `test.ping` 이벤트에 대한 필드 모양은 해당 이벤트를 내보내는 호출 사이트에 의해 정의됩니다. `data` 객체를 향후 호환 가능한 것으로 처리합니다(필드를 추가하고 부재에 의존하지 않음).

## 모범 사례

- **모든 배송 시 서명을 확인하세요.** 원시 본문 — 에 대해 귀하의 웹훅 URL 추측하는 사람으로부터 스푸핑된 POSTs 방지합니다.
- **~ 5초 이내에 2xx 응답** — 디스패처는 10초에 시간 초과됩니다. 느린 수신자는 재시도를 소모하고 `failure_count` 팽창시킵니다.
- **핸들러를 멱등성으로 만들기** — 재시도 및 최소 한 번 전달 의미 체계는 중복이 가능함을 의미합니다.
- **최소한으로 구독하세요** — 귀하가 실제로 소비하는 이벤트만 나열합니다. `"*"` 귀하가 제어하지 않는 수신기에 비용을 추가합니다.
- **`failure_count` 시청** — 엔드포인트는 10회 연속 실패 시 자동으로 비활성화됩니다. 수신기를 수리한 후 `enabled: true` 로 `PUT /api/webhooks/[id]` 호출하여 재설정합니다.
- **주기적으로 보안 비밀 교체** — `PUT` a new `secret`, 새 값을 수신기에 배포하고 테스트 엔드포인트를 통해 확인합니다.

## 참조

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 전체 관리 API 표면
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) `request.failed` 를 통해 표시되는 공급자 오류 뒤에 있는 — 회로 차단기/휴지 의미
- 출처: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
