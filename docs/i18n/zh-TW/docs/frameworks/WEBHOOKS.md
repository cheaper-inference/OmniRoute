# Webhooks (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md)

---

> **事實來源：** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**最後更新：** 2026-06-28 — v3.8.40

OmniRoute可以在平台事件上觸發HTTP Webhook。使用它們與Slack、 PagerDuty、Datadog、內部警報服務或任何HTTP接收器整合。

排程器使用HMAC-SHA256對每個交付進行簽名，重試暫時性故障，追蹤每個 Webhook 的交付運作狀況，並自動停用不斷失敗的端點。

## 支持的活動

`WebhookEvent`類型（`src/lib/webhooks/eventDescriptions.ts`，由`src/lib/webhookDispatcher.ts`使用）目前對七個事件進行建模：

| 事件                      | 觸發時                                             |
| ------------------------- | -------------------------------------------------- |
| `request.completed`       | 代理請求成功完成                                   |
| `request.failed`          | 代理請求在所有retries/fallback後失敗               |
| `quota.exceeded`          | API密鑰跨越budget/quota閾值                        |
| `proxy.set_aside`         | 代理池成員在多次拒絕後被擱置（僅限過渡）           |
| `proxy.pool.exhausted`    | 代理池範圍的每個成員都被預留                       |
| `provider.reset_redeemed` | 自動應用銀行重置已兌換重置積分或Claude每週會話重置 |
| `test.ping`               | 測試端點使用的綜合事件                             |

訂閱接受字面`"*"`來接收每個事件。 `events`中的未知事件名稱在調度時將被忽略。

> 注意：調度程序API已連線，但某些非`test.ping`事件的生產呼叫站點仍在登陸。檢查`grep dispatchEvent`以查看目前在您的版本中哪些路徑呼叫調度程序。

## 建築學

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

對於呼叫者來說，調度是一勞永逸的： `Promise.allSettled`會吞下每個 Webhook 錯誤，因此一個壞接收器無法阻止其他接收器。

## HMAC簽名

當 webhook 具有`secret`時， OmniRoute簽署JSON正文並發送：

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> 標頭名稱使用`X-Webhook-*`前綴（而不是`X-OmniRoute-*`）。簽名值為`sha256=<hex>` —驗證的完整前綴。

如果在沒有秘密的情況下呼叫`createWebhook` ，則DB模組會產生一個 (`whsec_<48 hex>`)，因此預設所有 Webhooks 都會進行簽署。

### 在接收器上驗證

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

始終驗證**生的**請求正文，在任何JSON解析之前。

## 重試與失敗政策

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 每次嘗試 10 秒逾時 (`AbortController`)。
- HTTP 2xx 算成功。
- HTTP 3xx/4xx被視為與`success = res.ok`一起交付時記錄的不可重試的最終狀態— 。
- HTTP 5xx 和網路錯誤以指數退避重試： `2^attempt * 1000 ms` （1s、2s、4s）。
- `maxRetries`之後，交付被記錄為失敗。
- 每次交付都會更新`last_triggered_at`、 `last_status`，並重置或遞增`failure_count`。
- 調度程序在每次扇出後都會呼叫`disableWebhooksWithHighFailures(10)` ，因此任何帶有`failure_count >= 10`的 Webhook 都會自動停用。

## 資料庫

表`webhooks` （遷移`011_webhooks.sql`）：

| 柱子                | 類型    | 筆記                              |
| ------------------- | ------- | --------------------------------- |
| `id`                | TEXT PK | UUID                              |
| `url`               | TEXT    | 目的地URL                         |
| `events`            | TEXT    | JSON陣列；預設`["*"]`             |
| `secret`            | TEXT    | HMAC秘密（如果未給出則自動產生）  |
| `enabled`           | INT     | 0/1；預設為 1                     |
| `description`       | TEXT    | 可選的人體標籤                    |
| `created_at`        | TEXT    | `datetime('now')`                 |
| `last_triggered_at` | TEXT    | 每次交付嘗試都會更新              |
| `last_status`       | INT     | 最後一次嘗試的HTTP狀態（0 =網路） |
| `failure_count`     | INT     | 成功時重設為 0，失敗時重設為+ 1   |

除了`webhooks`行上的聚合計數器之外，交付歷史記錄也保存在專用`webhook_deliveries`表（遷移`069_webhook_deliveries.sql`，每次嘗試時透過`src/lib/db/webhookDeliveries.ts::insertDelivery`寫入）中。種類元資料（Slack / Discord / Telegram / 自訂有效負載轉換器）由`070_webhooks_kind_metadata.sql`新增。

## REST API

所有端點都需要管理身份驗證（`requireManagementAuth`）。

| 端點                            | 方法   | 描述                         |
| ------------------------------- | ------ | ---------------------------- |
| `/api/webhooks`                 | GET    | 列出 webhooks（隱藏秘密）    |
| `/api/webhooks`                 | POST   | 創建網路鉤子                 |
| `/api/webhooks/[id]`            | GET    | Webhook 詳細資料（完全秘密） |
| `/api/webhooks/[id]`            | PUT    | 更新字段                     |
| `/api/webhooks/[id]`            | DELETE | 消除                         |
| `/api/webhooks/[id]/test`       | POST   | 觸發`test.ping` （不重試）   |
| `/api/webhooks/[id]/deliveries` | GET    | 最近嘗試傳送一個 Webhook     |
| `/api/webhooks/validate-url`    | POST   | 飛行前URL驗證（SSRF守衛）    |

`GET /api/webhooks`向`<first 10 chars>...`隱藏秘密，以避免在清單頁面上洩漏。當您確實需要秘密時，請使用`[id]` GET 。

### 創建網路鉤子

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

如果省略`secret` ，伺服器會產生`whsec_<hex>`金鑰並在回應中傳回它。

### 測試網路鉤子

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

返回`{ delivered, status, error }`。不嘗試重試—對於快速驗證接收器是否接受有效負載和簽章很有用。

## 儀表板

`/dashboard/webhooks`的儀表板頁面（請參閱`src/app/(dashboard)/dashboard/webhooks/page.tsx`）提供：

- 帶有事件選擇器的Create/edit Webhooks
- 基於`enabled`、 `failure_count`和`last_status`的狀態指示器（活動/非活動/錯誤）
- 一鍵測試交付
- 手動enable/disable切換

## 有效負載範例

### 請求.完成

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

### 測試.ping

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

非`test.ping`事件的字段形狀由發出它們的呼叫站點定義；將`data`物件視為向前兼容（添加字段，不依賴於缺失）。

## 最佳實踐

- **驗證每次交付時的簽名**針對原始主體—可以防止任何猜測您的 webhook URL人欺騙POSTs 。
- **~ 5 秒內回應 2xx** —調度程序在 10 秒時逾時。慢速接收者會吃掉重試並導致`failure_count`膨脹。
- **使處理程序具有冪等性**—重試和至少一次傳遞語義意味著重複是可能的。
- **最低限度訂閱**—僅列出您實際消費的事件； `"*"`會增加您無法控制的接收器的成本。
- **觀看`failure_count`** —端點連續10次失敗後自動停用；修復接收器後，透過使用`enabled: true`呼叫`PUT /api/webhooks/[id]`進行重置。
- **定期輪換秘密**— `PUT`一個新的`secret`，將新值部署到接收器，並透過測試端點進行確認。

## 參見

- [API_REFERENCE.md](../reference/API_REFERENCE.md) —全管理API面
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —斷路器/冷卻語意透過`request.failed`浮出水面
- 資料來源： `src/lib/webhookDispatcher.ts`、 `src/lib/db/webhooks.ts`
