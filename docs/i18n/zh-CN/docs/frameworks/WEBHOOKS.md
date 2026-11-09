# Webhooks (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **事实来源：** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**最后更新：** 2026-06-28 — v3.8.40

OmniRoute可以在平台事件上触发HTTP Webhook。使用它们与Slack、 PagerDuty、Datadog、内部警报服务或任何HTTP接收器集成。

调度程序使用HMAC-SHA256对每个交付进行签名，重试暂时性故障，跟踪每个 Webhook 的交付运行状况，并自动禁用不断失败的端点。

## 支持的活动

`WebhookEvent`类型（`src/lib/webhooks/eventDescriptions.ts`，由`src/lib/webhookDispatcher.ts`使用）当前对七个事件进行建模：

| 事件                      | 触发时                                             |
| ------------------------- | -------------------------------------------------- |
| `request.completed`       | 代理请求成功完成                                   |
| `request.failed`          | 代理请求在所有retries/fallback后失败               |
| `quota.exceeded`          | API密钥跨越budget/quota阈值                        |
| `proxy.set_aside`         | 代理池成员在多次拒绝后被搁置（仅限过渡）           |
| `proxy.pool.exhausted`    | 代理池范围的每个成员都被预留                       |
| `provider.reset_redeemed` | 自动应用银行重置已兑换重置积分或Claude每周会话重置 |
| `test.ping`               | 测试端点使用的综合事件                             |

订阅接受字面`"*"`来接收每个事件。 `events`中的未知事件名称在调度时将被忽略。

> 注意：调度程序API已连线，但某些非`test.ping`事件的生产呼叫站点仍在登陆。检查`grep dispatchEvent`以查看当前在您的版本中哪些路径调用调度程序。

## 建筑学

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

对于调用者来说，调度是一劳永逸的： `Promise.allSettled`会吞下每个 Webhook 错误，因此一个坏接收器无法阻止其他接收器。

## HMAC签名

当 webhook 具有`secret`时， OmniRoute签署JSON正文并发送：

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> 标头名称使用`X-Webhook-*`前缀（而不是`X-OmniRoute-*`）。签名值为`sha256=<hex>` —验证的完整前缀。

如果在没有秘密的情况下调用`createWebhook` ，则DB模块会生成一个 (`whsec_<48 hex>`)，因此默认情况下所有 Webhooks 都会进行签名。

### 在接收器上验证

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

始终验证**生的**请求正文，在任何JSON解析之前。

## 重试和失败政策

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 每次尝试 10 秒超时 (`AbortController`)。
- HTTP 2xx 算作成功。
- HTTP 3xx/4xx被视为与`success = res.ok`一起交付时记录的不可重试的最终状态— 。
- HTTP 5xx 和网络错误以指数退避重试： `2^attempt * 1000 ms` （1s、2s、4s）。
- `maxRetries`之后，交付被记录为失败。
- 每次交付都会更新`last_triggered_at`、 `last_status`，并重置或递增`failure_count`。
- 调度程序在每次扇出后调用`disableWebhooksWithHighFailures(10)` ，因此任何带有`failure_count >= 10`的 Webhook 都会自动禁用。

## 数据库

表`webhooks` （迁移`011_webhooks.sql`）：

| 柱子                | 类型    | 笔记                              |
| ------------------- | ------- | --------------------------------- |
| `id`                | TEXT PK | UUID                              |
| `url`               | TEXT    | 目的地URL                         |
| `events`            | TEXT    | JSON阵列；默认`["*"]`             |
| `secret`            | TEXT    | HMAC秘密（如果未给出则自动生成）  |
| `enabled`           | INT     | 0/1；默认为 1                     |
| `description`       | TEXT    | 可选的人体标签                    |
| `created_at`        | TEXT    | `datetime('now')`                 |
| `last_triggered_at` | TEXT    | 每次交付尝试都会更新              |
| `last_status`       | INT     | 最后一次尝试的HTTP状态（0 =网络） |
| `failure_count`     | INT     | 成功时重置为 0，失败时重置为+ 1   |

除了`webhooks`行上的聚合计数器之外，交付历史记录也保存在专用`webhook_deliveries`表（迁移`069_webhook_deliveries.sql`，每次尝试时通过`src/lib/db/webhookDeliveries.ts::insertDelivery`写入）中。种类元数据（Slack / Discord / Telegram / 自定义有效负载转换器）由`070_webhooks_kind_metadata.sql`添加。

## REST API

所有端点都需要管理身份验证（`requireManagementAuth`）。

| 端点                            | 方法   | 描述                         |
| ------------------------------- | ------ | ---------------------------- |
| `/api/webhooks`                 | GET    | 列出 webhooks（隐藏秘密）    |
| `/api/webhooks`                 | POST   | 创建网络钩子                 |
| `/api/webhooks/[id]`            | GET    | Webhook 详细信息（完全秘密） |
| `/api/webhooks/[id]`            | PUT    | 更新字段                     |
| `/api/webhooks/[id]`            | DELETE | 消除                         |
| `/api/webhooks/[id]/test`       | POST   | 触发`test.ping` （不重试）   |
| `/api/webhooks/[id]/deliveries` | GET    | 最近尝试传送一个 Webhook     |
| `/api/webhooks/validate-url`    | POST   | 飞行前URL验证（SSRF守卫）    |

`GET /api/webhooks`向`<first 10 chars>...`隐藏秘密，以避免在列表页面上泄露。当您确实需要秘密时，请使用`[id]` GET 。

### 创建网络钩子

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

如果省略`secret` ，服务器会生成`whsec_<hex>`密钥并在响应中返回它。

### 测试网络钩子

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

返回`{ delivered, status, error }`。不尝试重试—对于快速验证接收器是否接受有效负载和签名很有用。

## 仪表板

`/dashboard/webhooks`的仪表板页面（参见`src/app/(dashboard)/dashboard/webhooks/page.tsx`）提供：

- 带有事件选择器的Create/edit Webhooks
- 基于`enabled`、 `failure_count`和`last_status`的状态指示器（活动/非活动/错误）
- 一键测试交付
- 手动enable/disable切换

## 有效负载示例

### 请求.完成

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

### 测试.ping

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

非`test.ping`事件的字段形状由发出它们的调用站点定义；将`data`对象视为向前兼容（添加字段，不依赖于缺失）。

## 最佳实践

- **验证每次交付时的签名**针对原始主体—可以防止任何猜测您的 webhook URL人欺骗POSTs 。
- **~ 5 秒内响应 2xx** —调度程序在 10 秒时超时。慢速接收者会吃掉重试并导致`failure_count`膨胀。
- **使处理程序具有幂等性**—重试和至少一次传递语义意味着重复是可能的。
- **最低限度订阅**—仅列出您实际消费的事件； `"*"`会增加您无法控制的接收器的成本。
- **观看`failure_count`** —端点连续10次失败后自动禁用；修复接收器后，通过使用`enabled: true`调用`PUT /api/webhooks/[id]`进行重置。
- **定期轮换秘密**— `PUT`一个新的`secret`，将新值部署到接收器，并通过测试端点进行确认。

## 参见

- [API_REFERENCE.md](../reference/API_REFERENCE.md) —全管理API面
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —断路器/冷却语义通过`request.failed`浮出水面
- 资料来源： `src/lib/webhookDispatcher.ts`、 `src/lib/db/webhooks.ts`
