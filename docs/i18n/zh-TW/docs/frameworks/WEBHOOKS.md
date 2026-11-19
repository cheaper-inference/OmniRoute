# Webhooks (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md)

---

> **資訊來源：** `src/lib/webhookDispatcher.ts`、`src/lib/db/webhooks.ts`、`src/app/api/webhooks/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 可在平台事件發生時觸發 HTTP Webhook。您可以使用它們與
Slack、PagerDuty、Datadog、內部警示服務或任何 HTTP 接收端整合。

分派器會使用 HMAC-SHA256 簽署每次傳遞，在暫時性
失敗時重試、個別追蹤每個 Webhook 的傳遞健康狀況，並自動停用持續
失敗的端點。

## 支持的活動

`WebhookEvent`類型（`src/lib/webhooks/eventDescriptions.ts`，由`src/lib/webhookDispatcher.ts`使用）目前對八個事件進行建模：

| 事件                      | 觸發時                                                       |
| ------------------------- | ------------------------------------------------------------ |
| `request.completed`       | 代理請求成功完成                                             |
| `request.failed`          | 代理請求在所有retries/fallback之後失敗                       |
| `quota.exceeded`          | API密鑰跨越budget/quota閾值                                  |
| `proxy.set_aside`         | 代理池成員在多次拒絕後被擱置（僅限過渡）                     |
| `proxy.pool.exhausted`    | 代理池範圍的每個成員都被預留                                 |
| `provider.reset_redeemed` | 自動應用銀行重置已兌換重置積分或Claude每週會話重置           |
| `provider.exhausted`      | 提供者的每個帳戶正在冷卻（每個提供者每 10 分鐘最多冷卻一次） |
| `test.ping`               | 測試端點使用的綜合事件                                       |

訂閱接受文字`"*"`來接收每個事件。 `events`中的未知事件名稱在調度時將被忽略。

> 注意：調度程序API已連接，但某些非`test.ping`事件的生產呼叫站點仍在登陸。檢查`grep dispatchEvent`以查看目前在您的版本中哪些路徑呼叫調度程序。

## 架構

```
呼叫端（處理常式、服務、監控器）
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> 依 webhook.events 篩選
    -> 針對每個相符項目（平行執行）：
       deliverWebhook(url, payload, secret)
         建立承載資料 { event, timestamp, data }
         使用 HMAC-SHA256 簽署內文（若有 secret）
         以 10 秒逾時時間傳送 POST
         遇到 5xx／網路錯誤時最多重試 3 次
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

對呼叫端而言，分派採用射後不理模式：`Promise.allSettled` 會吞掉
個別 Webhook 的錯誤，因此單一故障的接收端不會阻塞其他接收端。

## HMAC 簽署

當 Webhook 具有 `secret` 時，OmniRoute 會簽署 JSON 內文並傳送：

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> 標頭名稱使用 `X-Webhook-*` 前綴（而非 `X-OmniRoute-*`）。簽章
> 值為 `sha256=<hex>`——請驗證完整前綴。

若呼叫 `createWebhook` 時未提供 secret，DB 模組會產生一個
（`whsec_<48 hex>`），因此所有 Webhook 預設都會經過簽署。

### 在接收端驗證

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

請務必在進行任何 JSON 解析之前，使用**原始**請求內文進行驗證。

## 重試與失敗政策

`deliverWebhook(url, payload, secret, maxRetries = 3)`：

- 每次嘗試的逾時時間為 10 秒（`AbortController`）。
- HTTP 2xx 視為成功。
- HTTP 3xx/4xx 視為不可重試的最終狀態——記錄為已傳遞，
  且 `success = res.ok`。
- HTTP 5xx 與網路錯誤會使用指數退避進行重試：
  `2^attempt * 1000 ms`（1 秒、2 秒、4 秒）。
- 達到 `maxRetries` 後，該次傳遞會記錄為失敗。
- 每次傳遞都會更新 `last_triggered_at`、`last_status`，並重設
  或遞增 `failure_count`。
- 分派器會在每次扇出後呼叫 `disableWebhooksWithHighFailures(10)`，
  因此任何 `failure_count >= 10` 的 webhook 都會自動停用。

## 資料庫

資料表 `webhooks`（遷移 `011_webhooks.sql`）：

| 欄位                | 類型    | 備註                                   |
| ------------------- | ------- | -------------------------------------- |
| `id`                | TEXT PK | UUID                                   |
| `url`               | TEXT    | 目的地 URL                             |
| `events`            | TEXT    | JSON 陣列；預設為 `["*"]`              |
| `secret`            | TEXT    | HMAC 密鑰（若未提供則自動產生）        |
| `enabled`           | INT     | 0/1；預設為 1                          |
| `description`       | TEXT    | 選用的人類可讀標籤                     |
| `created_at`        | TEXT    | `datetime('now')`                      |
| `last_triggered_at` | TEXT    | 每次傳遞嘗試時更新                     |
| `last_status`       | INT     | 上次嘗試的 HTTP 狀態碼（0 = 網路錯誤） |
| `failure_count`     | INT     | 成功時重設為 0，失敗時 +1              |

除了 `webhooks` 資料列上的彙總計數器外，傳遞歷史記錄也會持久儲存在專用的 `webhook_deliveries` 資料表中
（遷移 `069_webhook_deliveries.sql`，每次嘗試時透過
`src/lib/db/webhookDeliveries.ts::insertDelivery` 寫入）。類型中繼資料（Slack / Discord /
Telegram / 自訂承載資料轉換器）由 `070_webhooks_kind_metadata.sql` 新增。

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
| `/api/webhooks/validate-url`    | POST   | 飛行前URL驗證（SSRF防護）    |

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

位於 `/dashboard/webhooks` 的儀表板頁面（請參閱
`src/app/(dashboard)/dashboard/webhooks/page.tsx`）提供：

- 使用事件選擇器建立／編輯 webhook
- 根據 `enabled`、`failure_count` 和 `last_status` 顯示狀態指示（啟用／停用／錯誤）
- 一鍵測試傳遞
- 手動啟用／停用切換

## Payload 範例

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
    "message": "來自 OmniRoute 的測試 webhook 傳遞",
    "webhookId": "<uuid>"
  }
}
```

非 `test.ping` 事件的欄位結構由發出這些事件的呼叫端定義；請將 `data` 物件視為具備向前相容性（可新增欄位，不要依賴欄位不存在）。

## 最佳實務

- **針對原始 body 驗證每次傳遞的簽章** — 防止任何猜到您 webhook URL 的人傳送偽造的 POST。
- **在約 5 秒內回應 2xx** — 分派器會在 10 s 後逾時。回應緩慢的接收端會耗盡重試次數，並提高 `failure_count`。
- **讓處理常式具備冪等性** — 重試和至少一次傳遞語意表示可能出現重複事件。
- **只訂閱必要事件** — 僅列出您實際處理的事件；`"*"` 會增加您無法控制之接收端的成本。
- **監控 `failure_count`** — 端點在連續失敗 10 次後會自動停用；修復接收端後，使用 `enabled: true` 呼叫 `PUT /api/webhooks/[id]` 即可重設。
- **定期輪替密鑰** — 透過 `PUT` 設定新的 `secret`，將新值部署至接收端，並透過測試端點確認。

## 另請參閱

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 完整的管理 API 介面
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 透過 `request.failed` 呈現的提供者失敗背後之斷路器／冷卻語意
- 原始碼：`src/lib/webhookDispatcher.ts`、`src/lib/db/webhooks.ts`
