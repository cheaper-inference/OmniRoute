# Webhooks (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Nguồn của sự thật:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Cập nhật lần cuối:** 28-06-2026 — v3.8.40

OmniRoute có thể kích hoạt webhooks HTTP trên các sự kiện nền tảng. Sử dụng chúng để tích hợp với Slack, PagerDuty, Datadog, dịch vụ cảnh báo nội bộ hoặc bất kỳ máy thu HTTP.

Người điều phối ký mỗi lần gửi bằng HMAC-SHA256, thử lại các lỗi tạm thời, theo dõi tình trạng phân phối trên mỗi webhook và tự động vô hiệu hóa các điểm cuối liên tục bị lỗi.

## Sự kiện được hỗ trợ

Loại `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, được `src/lib/webhookDispatcher.ts` sử dụng ) hiện mô hình hóa bảy sự kiện:

| Sự kiện                   | Cháy khi                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `request.completed`       | Yêu cầu proxy hoàn tất thành công                                                             |
| `request.failed`          | Sau tất cả, yêu cầu được ủy quyền không thành công retries/fallback                           |
| `quota.exceeded`          | Khóa API vượt qua ngưỡng budget/quota                                                         |
| `proxy.set_aside`         | Thành viên nhóm proxy bị loại sau nhiều lần bị từ chối (chỉ chuyển đổi)                       |
| `proxy.pool.exhausted`    | Mọi thành viên của phạm vi nhóm proxy đều được đặt sang một bên                               |
| `provider.reset_redeemed` | Tự động áp dụng đặt lại ngân hàng đã đổi tín dụng đặt lại hoặc đặt lại phiên Claude hàng tuần |
| `test.ping`               | Sự kiện tổng hợp được điểm cuối thử nghiệm sử dụng                                            |

Đăng ký chấp nhận `"*"` theo nghĩa đen để nhận mọi sự kiện. Tên sự kiện không xác định trong `events` sẽ bị bỏ qua tại thời điểm gửi.

> Lưu ý: bộ điều phối API có dây nhưng các địa điểm gọi sản xuất cho một số sự kiện không phải `test.ping` vẫn đang hạ cánh. Kiểm tra `grep dispatchEvent` để xem đường dẫn nào hiện đang gọi bộ điều phối trong bản phát hành của bạn.

## Ngành kiến trúc

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

Việc gửi đi là điều dễ dàng đối với người gọi: `Promise.allSettled` xử lý các lỗi trên mỗi webhook để một bộ thu kém không thể chặn những bộ thu khác.

## HMAC

Khi một webhook có `secret`, OmniRoute ký vào phần nội dung JSON và gửi:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Tên tiêu đề sử dụng tiền tố `X-Webhook-*` (không phải `X-OmniRoute-*`). Giá trị chữ ký là `sha256=<hex>` — xác minh tiền tố đầy đủ.

Nếu `createWebhook` được gọi mà không có bí mật, mô-đun DB sẽ tạo một (`whsec_<48 hex>`) để tất cả các webhook được ký theo mặc định.

### Xác minh trên máy thu

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Luôn luôn xác minh chống lại **thô** nội dung yêu cầu, trước bất kỳ phân tích cú pháp JSON.

## Chính sách thử lại và thất bại

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Thời gian chờ 10 giây cho mỗi lần thử (`AbortController`).
- HTTP 2xx được coi là thành công.
- HTTP 3xx/4xx được tính là trạng thái cuối cùng không thể thử lại — được ghi là đã phân phối cùng với `success = res.ok`.
- HTTP 5xx và các lỗi mạng được thử lại với thời gian chờ theo cấp số nhân: `2^attempt * 1000 ms` (1 giây, 2 giây, 4 giây).
- Sau `maxRetries`, quá trình phân phối được ghi là không thành công.
- Mỗi lần phân phối sẽ cập nhật `last_triggered_at`, `last_status` và đặt lại hoặc tăng `failure_count`.
- Người điều phối gọi `disableWebhooksWithHighFailures(10)` sau mỗi lần phân xuất, do đó, mọi webhook có `failure_count >= 10` đều tự động bị tắt.

## Cơ sở dữ liệu

Bảng `webhooks` (di chuyển `011_webhooks.sql`):

| Cột                 | Kiểu    | Ghi chú                                                |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | Điểm đến URL                                           |
| `events`            | TEXT    | mảng JSON ; `["*"]` mặc định                           |
| `secret`            | TEXT    | Bí mật HMAC (được tạo tự động nếu không được cung cấp) |
| `enabled`           | INT     | 0/1; mặc định là 1                                     |
| `description`       | TEXT    | Nhãn người tùy chọn                                    |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Cập nhật mỗi lần thử giao hàng                         |
| `last_status`       | INT     | Trạng thái HTTP của lần thử cuối cùng (mạng 0 = )      |
| `failure_count`     | INT     | Đặt lại về 0 nếu thành công, + 1 nếu thất bại          |

Lịch sử phân phối được lưu giữ trong bảng `webhook_deliveries` chuyên dụng ( `069_webhook_deliveries.sql` di chuyển, được ghi qua `src/lib/db/webhookDeliveries.ts::insertDelivery` trong mỗi lần thử), ngoài các bộ đếm tổng hợp trên hàng `webhooks`. Siêu dữ liệu loại (Slack / Discord / Telegram / máy biến áp tải trọng tùy chỉnh) đã được `070_webhooks_kind_metadata.sql` thêm vào.

## REST API

Tất cả các điểm cuối đều yêu cầu xác thực quản lý (`requireManagementAuth`).

| Điểm cuối                       | Phương pháp | Sự miêu tả                                   |
| ------------------------------- | ----------- | -------------------------------------------- |
| `/api/webhooks`                 | GET         | Liệt kê webhooks (bí mật bị che giấu)        |
| `/api/webhooks`                 | POST        | Tạo webhook                                  |
| `/api/webhooks/[id]`            | GET         | Chi tiết webhook (hoàn toàn bí mật)          |
| `/api/webhooks/[id]`            | PUT         | Cập nhật các trường                          |
| `/api/webhooks/[id]`            | DELETE      | Di dời                                       |
| `/api/webhooks/[id]/test`       | POST        | Bắn `test.ping` (không thử lại)              |
| `/api/webhooks/[id]/deliveries` | GET         | Những lần thử gửi gần đây cho một webhook    |
| `/api/webhooks/validate-url`    | POST        | Xác nhận URL trước chuyến bay (bảo vệ SSRF ) |

`GET /api/webhooks` che giấu bí mật của `<first 10 chars>...` để tránh bị rò rỉ trên các trang danh sách. Sử dụng `[id]` GET khi bạn thực sự cần bí mật.

### Tạo webhook

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

Nếu `secret` bị bỏ qua, máy chủ sẽ tạo bí mật `whsec_<hex>` và trả về nó trong phản hồi.

### Kiểm tra webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Trả về `{ delivered, status, error }`. Không thử lại — hữu ích để nhanh chóng xác thực rằng người nhận chấp nhận tải trọng và chữ ký.

## Trang tổng quan

Trang bảng điều khiển tại `/dashboard/webhooks` (xem `src/app/(dashboard)/dashboard/webhooks/page.tsx`) cung cấp:

- Webhooks Create/edit với bộ chọn sự kiện
- Chỉ báo trạng thái (hoạt động/không hoạt động/có lỗi) dựa trên `enabled`, `failure_count` và `last_status`
- Giao hàng thử nghiệm bằng một cú nhấp chuột
- Chuyển đổi enable/disable thủ công

## Ví dụ về tải trọng

### yêu cầu đã hoàn thành

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

### kiểm tra.ping

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

Hình dạng trường cho các sự kiện không phải `test.ping` được xác định bởi các trang gọi phát ra chúng; coi đối tượng `data` là tương thích về phía trước (thêm các trường, không phụ thuộc vào sự vắng mặt).

## Thực tiễn tốt nhất

- **Xác minh chữ ký trên mỗi lần giao hàng** chống lại — nội dung thô sẽ ngăn chặn POSTs giả mạo khỏi bất kỳ ai đoán được URL webhook của bạn.
- **Trả lời 2xx trong vòng ~ 5 giây** — người điều phối hết thời gian sau 10 giây. Người nhận chậm sẽ ăn thử lại và tăng `failure_count`.
- **Làm cho người xử lý trở nên bình thường** Việc thử lại — và ngữ nghĩa phân phối ít nhất một lần có nghĩa là có thể xảy ra sự trùng lặp.
- **Đăng ký tối thiểu** — chỉ liệt kê các sự kiện bạn thực sự sử dụng; `"*"` sẽ thêm chi phí cho các máy thu mà bạn không kiểm soát.
- **Xem `failure_count`** Điểm cuối — sẽ tự động bị vô hiệu hóa sau 10 lần lỗi liên tiếp; đặt lại bằng cách gọi `PUT /api/webhooks/[id]` bằng `enabled: true` sau khi sửa máy thu.
- **Xoay bí mật định kỳ** — `PUT` một `secret` mới, triển khai giá trị mới cho bộ thu và xác nhận thông qua điểm cuối kiểm tra.

## Xem thêm

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — quản lý đầy đủ bề mặt API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Ngữ nghĩa ngắt mạch / thời gian hồi chiêu — đằng sau lỗi của nhà cung cấp được hiển thị thông qua `request.failed`
- Nguồn: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
