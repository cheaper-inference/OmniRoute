# Resilience Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute có ba cơ chế phục hồi riêng biệt nhưng có liên quan với nhau. Mỗi cơ chế có phạm vi và mục đích khác nhau. Hãy tách biệt chúng khi gỡ lỗi hành vi định tuyến.

![mô hình phục hồi 3 lớp](../diagrams/exported/resilience-3layers.svg)

> Nguồn: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Thứ tự ưu tiên giữa env và dashboard đối với các công tắc phục hồi.** Các công tắc phục hồi opt-in được khởi tạo từ môi trường — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`,
> `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`,
> `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` —
> chỉ cung cấp _giá trị mặc định_ (`DEFAULT_RESILIENCE_SETTINGS`,
> `src/lib/resilience/settings.ts`). Một giá trị boolean được lưu trong
> `resilienceSettings` (Dashboard → **Cài đặt → Khả năng phục hồi** / `PATCH /api/resilience`, lưu trong
> `key_value`) sẽ được ưu tiên hơn giá trị env: quá trình chuẩn hóa (`toBoolean`,
> `src/lib/resilience/settings/normalize.ts`) giữ nguyên boolean đã lưu bất cứ khi nào
> giá trị đó tồn tại. Do đó, đặt biến môi trường như vậy thành `true` trong một deployment mà
> dashboard đã lưu `false` sẽ không thay đổi gì — hãy bật công tắc trong **Cài đặt → Khả năng phục hồi**
> (hoặc xóa trường đã lưu) thay thế.

## 1. Circuit Breaker cấp Provider

**Phạm vi:** toàn bộ provider (ví dụ: `glm`, `openai`, `anthropic`).

**Mục đích:** ngừng gửi lưu lượng đến một provider đang liên tục gặp lỗi ở tầng upstream/dịch vụ.

**Triển khai:**

- Lớp lõi: `src/shared/utils/circuitBreaker.ts`
- Kết nối: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API trạng thái: `GET /api/monitoring/health`
- API đặt lại: `POST /api/resilience/reset`
- Các wrapper: `open-sse/services/accountFallback.ts`
- Bảng DB: `domain_circuit_breakers`

**Các trạng thái:**

- `CLOSED` — cho phép lưu lượng bình thường
- `DEGRADED` — lưu lượng vẫn được cho phép, nhưng các lỗi provider gia tăng đang được theo dõi; quay về `CLOSED` khi đạt đủ số lần thành công, khi có một lần kiểm tra kết nối hợp lệ, hoặc sau khoảng thời gian giữ `OPEN` dài nhất cho loại lỗi gần nhất (giá trị `cooldownByKind` của nó, nếu không có thì `resetTimeout`, × `maxBackoffMultiplier`, tối thiểu một chu kỳ cooldown) mà không phát sinh lỗi mới
- `OPEN` — provider tạm thời bị chặn; combo routing sẽ bỏ qua nó
- `HALF_OPEN` — thời gian reset timeout đã trôi qua; cho phép request thăm dò

**Các giá trị mặc định có thể cấu hình (`open-sse/config/constants.ts`, được hiển thị trong Dashboard → Settings → Resilience):**

| Loại    | Vào DEGRADED tại | Mở (OPEN) tại | Reset timeout |
| ------- | ---------------- | ------------- | ------------- |
| OAuth   | 5 lần lỗi        | 8 lần lỗi     | 60s           |
| API-key | 7 lần lỗi        | 12 lần lỗi    | 30s           |
| Local   | suy ra           | 2 lần lỗi     | 15s           |

`degradationThreshold` kiểm soát thời điểm một provider chuyển sang `DEGRADED`; `failureThreshold` kiểm soát thời điểm nó mở và bị bỏ qua. Các profile provider local chưa được hiển thị trên trang cài đặt Resilience.

**Mã kích hoạt (trip):** chỉ các mã trạng thái cấp provider `[408, 500, 502, 503, 504]`. KHÔNG kích hoạt cho các lỗi cấp tài khoản (phần lớn 401/403/429 — những lỗi đó thuộc về cooldown hoặc lockout).

**Phục hồi lười (lazy recovery):** khi `OPEN` hết hạn, `getStatus()`, `canExecute()`, `getRetryAfterMs()` sẽ làm mới trạng thái thành `HALF_OPEN`. Chính các lần đọc đó (và lỗi tiếp theo) cũng làm suy giảm một trạng thái `DEGRADED` đã cũ về `CLOSED`. Không cần bộ đếm thời gian chạy nền.

---

### Provider Cooldown toàn cục theo chế độ tùy chọn (window gate)

Một lớp thứ tư, **tùy chọn bật** (`PROVIDER_COOLDOWN_ENABLED`, mặc định **tắt**) lưu giữ bộ nhớ xuyên suốt các request về những provider đang gặp lỗi trong
`open-sse/services/providerCooldownTracker.ts`, được tham chiếu bởi quá trình phân giải mục tiêu combo để các request combo liên tiếp ngừng đi lại qua một provider vừa mới lỗi. Các mục cấp provider tuân theo window gate của `PROVIDER_PROFILES`:

| Profile | kích hoạt sau (`providerFailureThreshold`) | trong khoảng (`providerFailureWindowMs`) | cooldown trong (`providerCooldownMs`) |
| ------- | -----------------------------------------: | ---------------------------------------: | ------------------------------------: |
| OAuth   |                                       `10` |                                  `15min` |                                `5min` |
| API key |                                       `15` |                                  `30min` |                               `10min` |

Dưới ngưỡng này, provider **không** được coi là đang trong trạng thái cooldown; một lần thành công sẽ xóa cửa sổ. Các mục cấp kết nối (`provider:connectionId`) vẫn giữ backoff theo hàm mũ `minRetryCooldownMs → maxRetryCooldownMs`. Ghi đè:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Kiểm thử bảo vệ hồi quy: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Thời gian chờ kết nối

**Phạm vi:** một kết nối/tài khoản/khóa của nhà cung cấp.

**Mục đích:** bỏ qua một khóa không hợp lệ trong khi các kết nối khác của cùng nhà cung cấp vẫn tiếp tục phục vụ.

**Triển khai:**

- Đánh dấu không khả dụng: `src/sse/services/auth.ts::markAccountUnavailable()`
- Lựa chọn: `getProviderCredentials*` trong cùng tệp
- Tính thời gian chờ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Cài đặt: `src/lib/resilience/settings.ts`

**Các trường cho mỗi kết nối:**

- `rateLimitedUntil` — dấu thời gian cho đến khi thời gian chờ kết thúc
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — bộ đếm thời gian chờ lũy thừa

**Thời gian chờ mặc định:**

- Cơ sở OAuth: 5s
- Cơ sở khóa API: 3s
- API-key 429: ưu tiên các header `Retry-After`/reset từ upstream/văn bản reset có thể phân tích
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Độ trễ thử lại theo từng nhà cung cấp.** Trang chi tiết nhà cung cấp có một select **Độ trễ thử lại** (Tự động,
15s đến 1h). Giá trị này được lưu vào
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, thông qua `PATCH /api/resilience`). Khi lỗi giới hạn tốc độ không chứa
gợi ý thử lại từ upstream, giá trị này sẽ thay thế backoff đã điều chỉnh cho nhà cung cấp và đặt lại
`backoffLevel` về 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Thứ tự ưu tiên cho lỗi
giới hạn tốc độ, từ cao nhất trở xuống: gợi ý thử lại từ upstream, sau đó là
`providerSpecificData.rotationOverrides.rateLimitResetSeconds` theo từng kết nối,
tiếp đến độ trễ thử lại theo từng nhà cung cấp, sau đó là
biến môi trường `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, rồi đến
backoff đã điều chỉnh. Tự động sẽ xóa trường này. Tùy chọn này chỉ ảnh hưởng đến lý do giới hạn tốc độ,
không bao giờ ảnh hưởng đến các trạng thái kết thúc.

**Bộ bảo vệ chống đàn áp bầy đàn:** ngăn các lỗi đồng thời kéo dài thời gian chờ quá mức hoặc tăng kép `backoffLevel`.

**Các lỗi 429 do giới hạn đồng thời không làm tăng cấp backoff.** Một `429` có nội dung báo cáo
giới hạn đồng thời ("quá nhiều yêu cầu đồng thời", "giới hạn đồng thời",
"giới hạn yêu cầu song song", `并发数过高` của GLM) có nghĩa là tài khoản vẫn hoạt động bình thường nhưng đang bận.
`checkFallbackError()` trả về lý do `concurrency_limited`: chuyển sang kết nối tiếp theo ngay lập tức,
cho kết nối này chờ trong một khoảng cố định là `CONCURRENCY_LIMIT_COOLDOWN_MS`
(1s) hoặc theo gợi ý thử lại từ upstream, giữ nguyên `backoffLevel` và đặt
`skipProviderBreaker`.
Nội dung hạn ngạch rõ ràng vẫn được ưu tiên, vì vậy nội dung đồng thời khớp với mẫu hạn ngạch
vẫn cho kết luận là hạn ngạch. Phát hiện: `looksLikeConcurrencyLimit()` trong `src/shared/utils/classify429.ts`;
kết luận: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`
của bộ ngắt) không thay đổi và vẫn đọc `rate_limit` đối với các nội dung này.

**Việc luồng bị đình trệ không làm kết nối vào thời gian chờ.** Khi bộ giám sát đình trệ nội dung
(`open-sse/utils/streamHandler.ts`) từ bỏ một luồng không gửi đầu ra mô hình nào trong thời gian quy định,
`markAccountUnavailable()` ghi lại lỗi trên kết nối nhưng không đặt thời gian chờ: việc đình trệ thuộc về
yêu cầu đó, thường gặp nhất là một lượt suy luận dài chưa có đầu ra. Nhà vận hành có thể chủ động bật lại
tính năng này bằng `resilienceSettings.streamStallCooldown.enabled`
(mặc định là `false`).

**Tín hiệu độ trễ tùy chọn cho việc chọn tài khoản `p2c`.** Mỗi lần thử được phân phối sẽ ghi lại
thời gian đến byte đầu tiên và kết quả theo từng kết nối (và theo từng kết nối + mô hình) trong một cửa sổ
trượt trong bộ nhớ: 20 mẫu gần nhất trong vòng 15 phút
(`open-sse/services/connectionLatencyTracker.ts`, được ghi từ `safeLogEvents()` trong
`src/sse/handlers/chatHelpers.ts`). Khi `resilienceSettings.p2cLatency.weight` lớn hơn
`0` (phạm vi 0-20, mặc định `0` = tắt), `compareP2CConnections()` trong `src/sse/services/auth.ts`
cộng tối đa `weight` điểm cho mỗi ứng viên trong cặp. Một nửa số điểm đến từ độ trễ dưới dạng tỷ lệ
so với ứng viên nhanh hơn (chậm gấp đôi sẽ nhận đủ một nửa điểm), và một nửa đến từ tỷ lệ lỗi trượt.
Thành phần này chỉ được áp dụng khi cả hai ứng viên có ít nhất 3 mẫu, do đó các tài khoản mới không bị
phạt, đồng thời mức trần vẫn thấp hơn các mức phạt bị chặn hạn ngạch và cạn hạn ngạch. Tính năng này
không tự tạo thêm mạch: các tài khoản lỗi vẫn được xử lý bởi các lớp thời gian chờ, khóa và bộ ngắt.
Đặt giá trị này bằng `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Các khung suy luận khởi động lại ngân sách đình trệ nội dung.** Một mô hình suy luận có thể suy nghĩ
trong vài phút trước token hiển thị đầu tiên: Claude truyền các khung `thinking_delta`, trong đó văn bản
suy nghĩ có thể trống, còn Responses API truyền lần lượt nhiều mục suy luận. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) nhận diện các khung này, và bộ giám sát khởi động lại ngân sách
sau mỗi khung thay vì hủy lượt xử lý. Các khung này vẫn không phải đầu ra của mô hình, vì vậy một lượt
kết thúc chỉ với suy luận vẫn được báo cáo là trống, và một lượt dừng suy luận rồi chỉ gửi heartbeat
vẫn kích hoạt bộ giám sát.

Các khung nhị phân `reasoningContentEvent` của Kiro với chữ ký không trống sẽ duy trì hoạt động suy luận
này qua executor dưới dạng một delta `reasoning_content` trống. Chữ ký không được chuyển tiếp.
Siêu dữ liệu, các khung chưa hoàn chỉnh và chữ ký trống không khởi động lại ngân sách nội dung; thời gian
chờ luồng hoạt động độc lập và việc hủy của máy khách vẫn được áp dụng
(`open-sse/executors/kiro/reasoning.ts`).

**Các trạng thái kết thúc (KHÔNG phải thời gian chờ):**

- `banned` — được đặt bởi tính năng phát hiện từ khóa bị cấm / cấm tài khoản (xem [BAN_DETECTION](../security/BAN_DETECTION.md)). Việc upstream từ chối theo từng yêu cầu (`request_rejected`, ví dụ OAuth 403 "Request not allowed" của Anthropic) không bao giờ đặt trạng thái này: chúng được đếm theo từng kết nối và mô hình, đồng thời loại mô hình đó khỏi vòng xoay với thời gian chờ tăng dần, bị giới hạn ở `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), hoặc làm kết nối chờ khi không xác định được mô hình — `open-sse/services/requestRejectedStreak.ts`
- `expired` (chuyển sang trạng thái kết thúc sau số lần thử lại có giới hạn — `EXPIRED_RETRY_MAX = 3` với backoff lũy thừa — để các lỗi OAuth tạm thời có thể tự khôi phục trước khi tài khoản bị vô hiệu hóa vĩnh viễn)
- `credits_exhausted`

Các trạng thái này sẽ tồn tại cho đến khi thông tin xác thực thay đổi hoặc người vận hành đặt lại chúng. Không ghi đè các trạng thái kết thúc bằng trạng thái thời gian chờ tạm thời.

**Khôi phục lười:** khi `rateLimitedUntil` đã qua, kết nối lại đủ điều kiện. Khi được sử dụng thành công, `clearAccountError()` sẽ xóa tất cả các trường lỗi.

### Giới hạn sử dụng OAuth của Claude: làn ưu tiên thấp + đặt lại giới hạn phiên

**Phạm vi:** một kết nối Claude (OAuth). Cả hai tính năng đều **bật tùy chọn theo từng
kết nối** (Edit connection → phần Claude → `lowPriorityMode` / `autoLimitReset` trong
`providerSpecificData`, cả hai mặc định đều tắt) và mô phỏng các lệnh `/low-priority` và
`/limit-reset` của Claude Code (hợp đồng giao tiếp được ghi nhận từ Claude Code 2.1.263).

**Triển khai:**

- Máy trạng thái + phân loại phản hồi: `open-sse/services/claudeLowPriority.ts`
- Trạng thái/ứng dụng đặt lại phía máy khách: `open-sse/services/claudeLimitReset.ts`
- Hook của trình thực thi (chèn header + thử lại với cùng tài khoản): `open-sse/executors/base.ts::execute()`
- Lưu tùy chọn bật: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Kích hoạt:** giới hạn sử dụng 5 giờ — một `429` có các header chứa
`anthropic-ratelimit-unified-status: rejected` và, khi tài khoản đủ điều kiện,
`anthropic-ratelimit-unified-slow-offer: treatment`. Không gửi gì trước lỗi `429` giới hạn đầu tiên đó;
lỗi 429 đột biến không có các header unified sẽ đi qua đường dẫn thời gian chờ thông thường.

**Làn ưu tiên thấp** (`lowPriorityMode`):

- Khi xảy ra lỗi 429 giới hạn, trình thực thi chấp nhận đề nghị và ngay lập tức thử lại với **cùng**
  tài khoản bằng `anthropic-usage-limit: slow`; làn này vẫn hoạt động cho đến thời điểm
  `anthropic-ratelimit-unified-reset` được thông báo (+ 60 giây ân hạn), và mọi yêu cầu trong khoảng
  thời gian đó đều mang header này. Lỗi 429 bị chặn không bao giờ đến `handleChatCore`, vì vậy kết nối
  **không** bị đưa vào thời gian chờ và không bị chuyển sang kết nối khác.
- `anthropic-ratelimit-unified-slow-status` trong các phản hồi sau: `active` / `not_needed`
  giữ làn hoạt động; `slot_busy` (429) hoặc `529` sẽ chờ giá trị
  `anthropic-ratelimit-unified-slow-retry-after` của máy chủ (mặc định 20 giây, giới hạn trong khoảng
  5–600 giây, jitter ±30%) rồi thử lại, với giới hạn bởi
  `anthropic-ratelimit-unified-slow-max-wait` (mặc định 20 phút, giới hạn trong khoảng
  1 phút–6 giờ) — sau thời điểm đó làn kết thúc và thời gian nghỉ 10 phút sẽ ngăn việc chấp nhận lại.
  Thời gian chờ còn bị giới hạn bởi phần thời gian còn lại của thời gian chờ bắt đầu upstream riêng của
  yêu cầu (`resolveFetchStartTimeout`, mặc định 10 phút) trừ đi 5 giây đệm: nếu không có giới hạn này,
  `max-wait` mặc định 20 phút sẽ vượt quá thời hạn của yêu cầu và thao tác ngủ sẽ bị hủy giữa chừng,
  làm lộ ra `TimeoutError` thay vì kết thúc hợp lệ với `max_wait` + thời gian nghỉ.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, việc chuyển sang cửa sổ 5 giờ mới, hoặc
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kết thúc làn dưới dạng
  `extra_usage` ở bất kỳ trạng thái nào, vì chi phí vượt mức trả phí hiện đã bao phủ giới hạn) sẽ
  kết thúc làn; sau đó phản hồi đi qua đường dẫn thời gian chờ thông thường.
  `budget_exhausted` được ghi nhớ cho đến khi ngân sách được đặt lại theo thời điểm đã thông báo
  (≤ 8 ngày).
- Việc kiểm tra giới hạn chạy sau các lần thử lại trong cùng một lần thử do chính trình thực thi
  thực hiện khi gặp 400 (chỉnh sửa ngữ cảnh, giới hạn thinking/effort, tự động học tham số), vì vậy
  lỗi 429 giới hạn chỉ xuất hiện ở một trong các lần thử lại đó vẫn được chặn thay vì đi đến đường
  dẫn thời gian chờ.
- Trạng thái được lưu trong bộ nhớ theo từng kết nối (khởi động lại sẽ khiến cần thêm một lỗi 429
  giới hạn để chấp nhận lại).

**Đặt lại giới hạn phiên** (`autoLimitReset`, được thử trước làn này khi cả hai đều bật):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → khối `juniper_tide`;
  khi `arm: "reset"` và `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` với
  `{ "program": "juniper_tide" }` (UUID tổ chức lấy từ `providerSpecificData.organizationUUID`,
  với phương án dự phòng từ bootstrap).
- `result: reset|not_limited` → yêu cầu được thử lại ở tốc độ tối đa (không có header slow).
  `already_used` / `not_offered` ghi nhớ `next_available_at` (mặc định một tuần); mọi lỗi đều
  lùi lại 15 phút. Việc đặt lại chỉ thực hiện một lần mỗi tuần và vẫn được tính vào giới hạn tuần.

Các bảo vệ hồi quy: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Tự động áp dụng đặt lại ngân hàng

**phạm vi:** Kết nối đăng ký Codex và Claude (OAuth).**Chọn tham gia** : cài đặt `bankedResetAutoApply` bị tắt và ở chế độ `dry-run` theo mặc định (Cài đặt → AI → Tự động áp dụng đặt lại ngân hàng).

**Mục đích:** chi tiêu sẽ tự đặt lại trong ngân hàng khi tài khoản gặp giới hạn sử dụng, thay vì đợi nhà điều hành nhấn "Đổi" trên trang Giới hạn nhà cung cấp.

| Loại tín dụng (`creditTypes`) | Những gì được chuộc                                    | Nó chạy ở đâu                                                                     |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `codexCredits`                | Tín dụng đặt lại Codex                                 | công việc nền, cứ sau 60 giây                                                     |
| `claudeCredits`               | Các khoản trợ cấp ngân hàng Claude (tín dụng `GRANT` ) | công việc nền, cứ sau 60 giây                                                     |
| `claudeSessionReset`          | Đặt lại giới hạn phiên hàng tuần Claude (ở trên)       | đường dẫn yêu cầu, thông qua chính sách tương tự như chuyển đổi cho mỗi tài khoản |

**Thực hiện:**

- Quyết định thuần túy (một bộ quy tắc cho cả hai đường dẫn): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Công việc nền: `src/lib/services/bankedResetAutoApply.ts` (bắt đầu từ `src/instrumentation-node.ts`)
- Cổng đường dẫn yêu cầu Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, được đăng ký thông qua `setClaudeLimitResetPolicy()` trong `open-sse/services/claudeLimitReset.ts`
- Lịch sử, mũ và webhook: `src/lib/usage/bankedResetAudit.ts`
- Lịch sử API: `GET /api/settings/banked-reset-auto/history?limit=50` (xác thực quản lý)

**Trình tự quyết định** (quy tắc thất bại đầu tiên là lý do được ghi lại):

1. Tắt tính năng, loại tín dụng hoặc tài khoản nằm ngoài phạm vi (`accountScope` `all` / `selected` cộng với bản đồ `connections` cho mỗi tài khoản).
2. Ngoài lịch trình UTC tùy chọn (`startHourUtc` > `endHourUtc` vượt qua nửa đêm).
3. Giới hạn trong 24 giờ qua: `maxPerAccountPerDay` (1), `maxPerDay` (3) và `minSpacingMinutes` (30) giữa hai lần quy đổi bất kỳ.
4. Trình kích hoạt: cửa sổ `session` hoặc `weekly` có tường bao quanh (đọc từ `getQuotaWindowStatus().reachedThreshold`, không phải `isAccountQuotaExhausted()`, chỉ báo cáo một tài khoản với mỗi cửa sổ đã chi tiêu) hoặc tín dụng hết hạn trong `expiringCreditHours` (24) trên tài khoản đã sử dụng ít nhất `expiringCreditMinUsedPercent` (50).
5. Bảo vệ thiết lập lại tự nhiên: bỏ qua khi khoảng thời gian 5 giờ có tường bao quanh được đặt lại trong `sessionResetGuardMinutes` (90) hoặc khoảng thời gian có tường bao hàng tuần trong `weeklyResetGuardHours` (12).
6. Tầng hàng tuần: bỏ qua việc đặt lại 5 giờ khi mức còn lại hàng tuần ở dưới `weeklyFloorPercent` (10).
7. Chế độ `last-resort` : bỏ qua trong khi tài khoản khác trong phạm vi của cùng một nhà cung cấp còn lại ít nhất `poolHeadroomPercent` (10) trong cả hai cửa sổ. Trình kích hoạt tín dụng hết hạn bỏ qua điều này.
8. `dry-run` ghi lại một hàng và không đổi được gì; Đổi `last-resort` và `eager`.

Thiếu dữ liệu hạn ngạch không bao giờ mở khóa quy đổi: thời gian đặt lại không xác định hoặc bỏ qua mức sử dụng hàng tuần.

**Đặt lại phiên Claude :** khi tắt tính năng này hoặc tắt `claudeSessionReset`, việc chuyển đổi `autoLimitReset` trên mỗi tài khoản sẽ quyết định chính xác như trước. Khi bật cả hai tính năng này, tính năng này sẽ thay thế các nút chuyển đổi cho mỗi tài khoản: tài khoản trong phạm vi chỉ có thể xác nhận quyền sở hữu khi chính sách cho phép và ở chế độ `dry-run` sẽ không có yêu cầu nào được đưa ra.

**Sự an toàn:** công việc đổi tối đa một tín dụng cho mỗi tích tắc, quyết định trước khi liệt kê các khoản tín dụng (tài khoản bị bỏ qua không bao giờ được liệt kê), sử dụng khóa tạm thời `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` và sao lưu tài khoản trong 1 giờ sau khi danh sách hoặc đổi quà không thành công. Mọi quyết định mua lại, thất bại và chạy thử đều được ghi vào `audit_log` (`action: "bankedReset.redeem"`, không có mã thông báo hoặc id tín dụng); giới hạn được tính từ các hàng đó, vì vậy chúng vẫn tồn tại khi khởi động lại. Việc quy đổi thành công cũng kích hoạt webhook `provider.reset_redeemed`.

Bộ bảo vệ hồi quy: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Liên kết phiên (#7274)

**Phạm vi:** một phiên máy khách (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`
header) được ghim vào một kết nối, áp dụng cho **bất kỳ** nhà cung cấp nào.

**Mục đích:** giữ một tác nhân nhiều lượt (Claude Code, aider, tác nhân tùy chỉnh) trên cùng một tài khoản
qua nhiều yêu cầu, giảm mất ngữ cảnh giữa các tài khoản và các lỗi 429 khởi động nguội lặp lại trên
những nhà cung cấp có trạng thái phiên theo từng tài khoản.

**Triển khai:**

- Phân giải TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Chọn/tạo ghim: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Trích xuất header (chung, mọi nhà cung cấp): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Bảng ghim được lưu trữ: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Cài đặt: `sessionAffinityTtlMs` (TTL toàn cục tính bằng mili giây, `0` để tắt) —
  `src/lib/db/settings.ts`. Được đổi tên từ `codexSessionAffinityTtlMs` chỉ dành cho Codex bởi migration
  `124_generic_session_affinity_ttl.sql`, migration này chuyển mọi TTL Codex đã cấu hình trước đó
  thành giá trị mặc định mới.

Trước #7274, `resolveSessionAffinityTtlMs()` luôn trả về sớm giá trị `0` cho mọi nhà cung cấp ngoại
trừ `codex`, vì vậy cài đặt TTL (và các session header) không có tác dụng ở bất kỳ nơi nào khác, dù cơ
chế ghim và việc trích xuất header vốn đã không phụ thuộc vào nhà cung cấp. Bản sửa lỗi đã loại bỏ
lệnh trả về sớm đó; TTL hiện áp dụng đồng nhất cho mọi nhà cung cấp sau khi được đặt toàn cục lớn hơn `0`.

Ba session header liên quan đến liên kết phiên không bao giờ được chuyển tiếp lên upstream — các trình
thực thi tự xây dựng header upstream từ đầu thay vì chuyển tiếp header của máy khách, vì vậy giá trị này
chỉ là ID tương quan nội bộ.

### Lease kết nối phiên được quản lý độc quyền

**Phạm vi:** một HTTP client/session được quản lý đang hoạt động sở hữu một kết nối OmniRoute đủ điều kiện.

**Mục đích:** cung cấp quyền sở hữu kết nối độc quyền bền vững cho các client cần một rào chắn định tuyến cứng giữa các request. Cơ chế này khác với session affinity, vốn là một tùy chọn ưu tiên duy trì liên tục mềm: một lease độc quyền duy trì trạng thái vòng đời trong SQLite, thực thi tính duy nhất trên toàn hệ thống đối với chủ sở hữu đang hoạt động và kết nối đang hoạt động, đồng thời từ chối generation cũ trước khi dispatch đến provider.

Tính năng này được bật tùy chọn theo từng API key. Một managed key phải có scope `lease:exclusive` và danh sách `allowedConnections` rõ ràng, không rỗng. Bất kỳ HTTP client nào cũng có thể sử dụng lifecycle endpoint; không yêu cầu tên client, user-agent, provider, phương thức OAuth hoặc model. Lease sở hữu một kết nối, không phải một model, vì vậy việc thay đổi model vẫn giữ nguyên binding khi kết nối vẫn đủ điều kiện theo các quy tắc thông thường. Các quy tắc thông thường về model, quota, health, cooldown và allowlist vẫn có hiệu lực và có thể chuyển generation đó sang một kết nối đủ điều kiện khác đang trống.

Vòng đời là `POST /api/v1/session-leases` với các action JSON `acquire`, `renew` và `release`. Các request inference được quản lý phải gửi giá trị opaque `X-OmniRoute-Lease-Owner` và `X-OmniRoute-Lease-Generation` chính xác. Owner sử dụng tiền tố `vlo_` theo sau là 43 ký tự base64url; chỉ hash SHA-256 của giá trị này được lưu trữ. Mọi rào chắn dispatch cuối cùng cũng gắn với ID API key đã xác thực và ID kết nối đang hoạt động. Các header điều khiển lease được loại bỏ khỏi log, snapshot request được lưu giữ và header của upstream executor.

Nếu việc định tuyến thông thường có các candidate managed đủ điều kiện nhưng mọi candidate đang trống đều bị một lease đang hoạt động của bên khác chiếm giữ, OmniRoute trả về HTTP `429`, mã lease-capacity-unavailable, trạng thái waiting-for-capacity và `Retry-After` có giới hạn được tính từ thời điểm hết hạn liên quan sớm nhất. Tình trạng không có candidate đủ điều kiện thông thường không phải là tranh chấp lease và vẫn giữ nguyên ngữ nghĩa lỗi định tuyến hiện tại.

Các cơ chế liên quan vẫn tách biệt:

- OAuth session occupancy là cơ chế phân phối mềm, chỉ áp dụng trong phạm vi tiến trình cho các tài khoản OAuth.
- Account semaphores cấp các permit cho tính đồng thời của request và kết thúc khi request hoàn tất.
- Exclusive managed session leases là quyền sở hữu vòng đời bền vững với generation fence.

---

## 3. Khóa mô hình

**Phạm vi:** bộ ba nhà cung cấp + kết nối + mô hình.

**Phạm vi khóa theo trạng thái:** trạng thái lỗi quyết định khóa sẽ ghi vào khóa nào
(`resolveLockoutScope()` trong `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — tín hiệu hạn mức hoặc quyền sử dụng — khóa **họ hạn mức**:
  đối với codex, toàn bộ phạm vi `codex` / `spark` (mọi mô hình `gpt-5*` của
  kết nối); đối với các nhà cung cấp khác, sử dụng
  `getQuotaScopedModelForProvider()`.
- `404` khóa mô hình cơ bản (`getModelLockKey()` thu hẹp `not_found`).
- Bất kỳ trạng thái nào khác — lỗi vận chuyển/máy chủ `5xx` và `502` do chính
  OmniRoute tổng hợp từ việc xác thực chất lượng — chỉ khóa **chính xác** bộ ba
  nhà cung cấp/kết nối/mô hình. Một luồng không hợp lệ trên một mô hình không
  phải là bằng chứng về hạn mức của tài khoản; trước quy tắc này, một phản hồi
  trống trên `codex/gpt-5.6-luna` đã loại mọi mô hình `gpt-5*` của kết nối đó
  khỏi định tuyến trong 2–30 phút (tăng dần), trong khi hạn mức của kết nối vẫn
  không bị ảnh hưởng.
- Tùy chọn `scope` rõ ràng của bên gọi luôn được ưu tiên (Antigravity truyền
  `"exact"`).

**Mục đích:** tránh vô hiệu hóa toàn bộ kết nối khi chỉ một mô hình không khả dụng
hoặc bị giới hạn hạn mức.

**Ví dụ:**

- Các nhà cung cấp có hạn mức theo từng mô hình trả về 429
- Các nhà cung cấp cục bộ trả về 404 cho một mô hình không tồn tại
- Lỗi quyền sử dụng theo chế độ/mô hình đặc thù của nhà cung cấp (ví dụ: các chế độ Grok)

**Triển khai:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Bảng điều khiển thời gian chờ mô hình (v3.8.0)

Giao diện: Cài đặt → Thời gian chờ mô hình (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Liệt kê các khóa đang hoạt động với: nhà cung cấp, kết nối, mô hình, lý do, expiresAt.
Nhà vận hành có thể bật lại thủ công một mô hình từ thẻ này.

**API REST:**

- `GET /api/resilience/model-cooldowns` — liệt kê các khóa đang hoạt động
- `DELETE /api/resilience/model-cooldowns` — bật lại thủ công. Body: `{provider, connection, model}`. Xác thực: management.

### Trình quản lý thời gian chờ

Giao diện: Giám sát → Trình quản lý thời gian chờ (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Một trang dành cho mọi kết nối đang bị loại khỏi định tuyến vì một lý do tạm thời, thay vì
phải mở từng trang nhà cung cấp. Trang này liệt kê thời gian chờ của kết nối, các khóa
mô hình và trạng thái kết thúc; xóa chúng theo từng kết nối, theo lựa chọn hoặc cho tất
cả kết nối của một nhà cung cấp; đồng thời chỉnh sửa các quy tắc thời gian chờ được tinh
chỉnh nhiều nhất: `streamStallCooldown.enabled` và thời gian chờ cơ sở
`connectionCooldown` cùng số bước backoff tối đa cho OAuth / API key (được lưu qua
`PATCH /api/resilience`). Các trạng thái kết thúc (`banned`, `expired`, `credits_exhausted`)
được liệt kê nhưng không bao giờ được xóa tại đây.

Thẻ **Quy tắc thời gian chờ lỗi** trên cùng trang chỉnh sửa các quy tắc lỗi của nhà
vận hành (`settings.providerErrorRules`) và các giá trị mặc định tổng quát theo từng
nhà cung cấp (`settings.providerErrorDefaults`) thông qua `PATCH /api/settings` — xem
"Quy tắc do nhà vận hành khai báo" trong §7 để biết cách chúng được đối sánh. Thời
lượng gồm Mặc định (không có thời gian chờ rõ ràng), 30 phút, 1 giờ, 5 giờ, 24 giờ hoặc
giá trị tùy chỉnh từ 1 đến 43.200 phút (30 ngày).

**API REST** (`src/lib/resilience/cooldownManager.ts`, xác thực: management):

- `GET /api/resilience/cooldowns[?provider=]` — các kết nối cùng trạng thái, thời gian chờ còn lại,
  cấp độ backoff, loại lỗi gần nhất và các khóa mô hình (không có thông tin xác thực)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` hoặc
  `{all: true, provider?}`; trả về `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Giao diện cài đặt khóa mô hình + khôi phục bằng suy giảm theo thành công (v3.8.23)

Khóa mô hình chuyển từ hành vi luôn bật được mã hóa cứng sang một tính năng có thể cấu
hình hoàn toàn, bật tùy chọn, với thẻ cài đặt riêng và quy trình khôi phục tự xử lý.

**Thẻ cài đặt:** Cài đặt → Khóa mô hình
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Thẻ này **khác** với `ModelCooldownsCard` chỉ đọc ở trên (chỉ
_liệt kê_ các khóa đang hoạt động) — thẻ mới _cấu hình các tham số_. Các giá trị mặc
định nằm trong `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Cài đặt                 | Mặc định                         | Ý nghĩa                                                           |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Công tắc chính — khóa mô hình **tắt theo mặc định**.              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Các trạng thái từ upstream được tính là lỗi theo phạm vi mô hình. |
| `baseCooldownMs`        | `120_000` (120 s)                | Thời lượng khóa ban đầu cho lỗi đầu tiên.                         |
| `maxCooldownMs`         | `1_800_000` (30 phút)            | Giới hạn thời gian chờ sau khi tăng cấp.                          |
| `maxBackoffSteps`       | `10`                             | Số bước tăng cấp backoff theo hàm mũ tối đa.                      |
| `useExponentialBackoff` | `true`                           | Có tăng thời gian chờ theo hàm mũ khi lỗi lặp lại hay không.      |

Các cài đặt được lưu qua kho cài đặt thông thường và được xác thực bằng schema cài đặt
resilience; thẻ này giới hạn `baseCooldownMs`/`maxCooldownMs` (với
`maxCooldownMs ≥ baseCooldownMs`) và `maxBackoffSteps`.

**Khôi phục bằng suy giảm theo thành công:** quá trình khôi phục **không** chỉ đơn
thuần là hết thời gian. Một phản hồi lành mạnh sẽ giảm dần số lỗi của mô hình, để một
mô hình đã khôi phục giữa thời gian chờ không tiếp tục tăng cấp (và được xóa khóa)
trước khi bộ hẹn giờ kết thúc. Khi mục tiêu combo thành công,
`open-sse/services/combo.ts` gọi `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), hàm này **chia đôi** `failureCount` được lưu
(`Math.floor(failureCount / 2)`); khi giá trị đạt `0`, toàn bộ mục khóa sẽ bị xóa.
Hàm tương ứng `recordModelLockoutFailure()` tăng số đếm (và tăng thời gian chờ) khi
xảy ra lỗi trong khoảng thời gian tăng cấp. Cơ chế suy giảm theo thành công này bổ sung
cho việc hết thời gian đơn thuần — một trong hai quy trình đều có thể bật lại mô hình.

**Trạng thái:** các trạng thái khóa được lưu giữ **trong bộ nhớ** (các `Map` theo từng tiến trình) của
`ModelLockoutEntry`, được lập khóa theo `provider:connectionId:model`; các khóa theo phạm vi chính xác sử dụng
`provider:connectionId:exact:model`, không được lưu vào
DB — chúng sẽ bị mất khi khởi động lại. _Cài đặt_ được lưu trữ; _trạng thái_ khóa đang hoạt động là tạm thời.

---

## 4. Kiểm soát đồng thời theo hạn ngạch được chia sẻ (v3.8.36)

Các tài khoản đăng ký (GLM, MiniMax, v.v.) thường chỉ chấp nhận khoảng 1–3
yêu cầu đồng thời; vượt quá giới hạn này sẽ kích hoạt 429 và thời gian cooldown. Tình trạng này đặc biệt nghiêm trọng với các combo **quota-share**
(`qtSd/…`), trong đó nhiều khóa API dùng chung một tài khoản upstream. Ba lớp
giúp ngăn tài khoản dùng chung bị gửi quá nhiều yêu cầu.

### Giới hạn đồng thời theo kết nối (`max_concurrent`)

Mỗi kết nối nhà cung cấp có thể khai báo ngưỡng `max_concurrent`
(`provider_connections.max_concurrent`, được thiết lập trong biểu mẫu kết nối / API / DB).
Để trống nếu không muốn giới hạn. Đây là nút điều khiển duy nhất chi phối lớp
tuần tự hóa bên dưới — hãy đặt giá trị này theo mức đồng thời thực tế của tài khoản
(ví dụ: GLM khoảng 1, MiniMax khoảng 2).

### Giới hạn đồng thời theo mô hình (`modelConcurrency`)

Một kết nối cũng có thể khai báo các ngưỡng đồng thời chính xác theo từng mô hình
bên trong map `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Thiết lập trong biểu mẫu kết nối (**Ghi đè giới hạn tốc độ → Giới hạn đồng thời
theo mô hình**, mỗi dòng một `model=cap`) hoặc qua
`PATCH /api/providers/[id]` với cùng cấu trúc JSON. Ngữ nghĩa chính:

- **Theo toàn bộ kết nối so với theo từng mô hình:** `maxConcurrent` vẫn là
  ngưỡng dùng chung cho toàn bộ kết nối. Khi cả hai cùng được áp dụng, cả hai
  cổng kiểm soát được lấy một cách nguyên tử trong cùng một cổng kết hợp
  (`global → provider → account → model`); hành vi hiệu dụng sẽ tuân theo giới hạn
  nghiêm ngặt hơn được áp dụng.
- **Khớp chính xác khóa mô hình:** khóa này là chuỗi mô hình được truyền cho
  executor sau khi phân giải định tuyến — thông thường là ID mô hình upstream thuần
  (`glm-5`), không phải bí danh `provider/model` phía máy khách (`zai/glm-5` không
  khớp với `glm-5`). Các giá trị là ngưỡng số nguyên dương cho số yêu cầu đồng thời.
- **Xếp hàng cục bộ, không tự phát hiện:** các yêu cầu vượt mức sẽ xếp hàng cục bộ
  với ngữ nghĩa hàng đợi/thời gian chờ hiện có (các lỗi tiếp nhận có kiểu
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute không tự phát hiện hoặc
  suy luận chính sách upstream — hệ thống thực thi chính xác các ngưỡng mà người
  vận hành đã cấu hình. Cổng mô hình bị bão hòa không bao giờ vô hiệu hóa nhà cung cấp
  và không bao giờ tạo ra khóa mô hình vĩnh viễn; hành vi 429/cooldown/fallback từ
  upstream vẫn là cơ chế dự phòng khi có lỗi.
- **Phạm vi theo từng kết nối, từng tiến trình:** các giới hạn áp dụng theo từng
  kết nối cơ sở dữ liệu và được lưu trong bộ nhớ, vì vậy hai kết nối dùng lại cùng
  một khóa API upstream sẽ không phối hợp với nhau.
- **Không cấu hình nghĩa là không thay đổi:** bỏ qua map (hoặc để trống trường trên
  dashboard) sẽ không thêm cổng kiểm soát theo mô hình. Ví dụ cấu hình không khẳng
  định bất kỳ giới hạn phổ quát nào cho nhà cung cấp:

```text
glm-5=1
glm-4.7=3
```

### Tuần tự hóa yêu cầu quota-share

Khi một lần phân phối quota-share nhắm đến một kết nối khai báo
`max_concurrent` dương, các yêu cầu đồng thời đến **tài khoản** đó sẽ được tuần tự
hóa thông qua một semaphore theo từng kết nối (khóa `qsconn:<connectionId>`): các
yêu cầu vượt mức sẽ **chờ trong hàng đợi** thay vì gửi quá nhiều yêu cầu đến tài khoản.
Cơ chế này **fail-open** — khi hàng đợi đầy hoặc hết thời gian chờ, yêu cầu vẫn tiếp
tục mà không cần một slot, thay vì từ chối một yêu cầu có thể phân phối. Bật/tắt
trong **Cài đặt → Khả năng phục hồi → Tính đồng thời quota-share theo từng kết nối**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, mặc định bật). Nếu không
có giới hạn `max_concurrent`, hành vi không thay đổi.

> Cổng định tuyến quota-share (`selectQuotaShareTarget`, DRR + P2C) bản thân nó
> cũng **fail-open** và chỉ _hạ mức ưu tiên_ một kết nối đang ở ngưỡng — với một
> pool chỉ có một kết nối, nó không thể giới hạn cứng, vì vậy semaphore này mới là
> thành phần thực sự ngăn việc gửi quá nhiều yêu cầu.

### Thử lại có nhận biết cooldown cho combo

Với mọi chiến lược combo (khi được bật), nếu một yêu cầu sắp tạo ra lỗi 429 do
cooldown tạm thời NGẮN, yêu cầu sẽ chờ hết cooldown rồi phân phối lại thay vì trả
về lỗi 429 — điều này bao phủ các cửa sổ TPM/RPM kiểu Gemini (retry-after khoảng
60 giây) trên các combo nhiều mô hình, chẳng hạn khi cả hai đích của một combo
2 mô hình đều chạm giới hạn tốc độ theo mô hình. Cơ chế này bị giới hạn bởi
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) trong **Cài đặt → Khả năng phục hồi**. Cơ chế này không bao giờ chờ
đối với `quota_exhausted` (bị khóa đến nửa đêm) hoặc các lý do xác thực/không tìm thấy.

Một combo có thể tắt cơ chế này bằng `config.comboCooldownWaitEnabled: false`. Chỉ
`false` dạng literal mới vô hiệu hóa các lần chờ combo dùng chung này (cooldown sau
khi phân phối và chờ circuit mở/khóa mô hình trước khi phân phối) cùng phần mở rộng
mức sàn thời gian chờ theo ngân sách chờ. Việc thiếu giá trị hoặc đặt `true` sẽ
giữ nguyên chính sách toàn cục; `true` không thể bật cơ chế chờ nếu cơ chế này bị
tắt trên toàn cục. `targetTimeoutMs` được chỉ định rõ ràng vẫn được ưu tiên. Tùy
chọn tắt này không làm thay đổi thời gian chờ trước khi phân phối riêng của cơ chế
ghim lượt native-Codex.

Cổng kiểm soát tương tự cũng bao phủ trường hợp trước khi phân phối (#16319): khi
mọi đích của một combo bị bỏ qua trước khi có bất kỳ lần thử nào vì mô hình của
chúng đang trong trạng thái khóa tạm thời ngắn hạn, đường dẫn không có lần thử sẽ
chờ hết thời gian khóa theo cùng các giới hạn rồi phân phối lại, thay vì trả về
`503 ALL_TARGETS_SKIPPED` không có gợi ý. Khi không được phép chờ (đã đạt ngưỡng,
hết số lần thử hoặc ngân sách, hoặc tính năng bị tắt), phản hồi cuối cùng sẽ được
nâng cấp thành `429 rate_limit_error`, chứa `retry_after` / `reset_at` từ thời điểm
hết hạn khóa tạm thời sớm nhất; các khóa quota, xác thực và không tìm thấy vẫn giữ
nguyên lỗi 503 không có gợi ý.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Kiểm soát tiếp nhận hàng đợi request (v3.8.49 · issue #6593)

**Phạm vi**: hàng đợi rate-limit cục bộ theo từng provider+connection (`open-sse/services/rateLimitManager.ts`, được hỗ trợ bởi Bottleneck), nằm một tầng bên dưới ba cơ chế ở trên.

**`maxWaitMs` giới hạn thời gian chờ trong hàng đợi; `executionMaxWaitMs` giới hạn thời gian thực thi.**
Hai giá trị này được tách biệt một cách có chủ đích, và không giá trị nào cung cấp cho giá trị nào.

`resilienceSettings.requestQueue.maxWaitMs` là **ngân sách chờ-trong-hàng-đợi**: nó
bao gồm thời gian chờ một slot của provider rồi sau đó nằm ở trạng thái QUEUED, và bộ đếm thời gian của nó
được xóa ngay khoảnh khắc job rời khỏi QUEUED và bắt đầu thực thi
(`rateLimitManager.ts`, `wrappedFn`). Một request vượt quá ngân sách này sẽ không bao giờ chạm tới
upstream. Mặc định 30000ms, được cung cấp bởi `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
trong `src/lib/resilience/settings.ts` và được ghim bởi
`tests/unit/ratelimit-admission-control-6593.test.ts`, nên một thay đổi đối với nó sẽ
làm test đó chuyển đỏ thay vì để đoạn văn này lặng lẽ trở nên lỗi thời.

`resilienceSettings.requestQueue.executionMaxWaitMs` là thứ mà Bottleneck
nhận vào dưới dạng `expiration` của job, bộ đếm thời gian của nó chỉ bắt đầu sau khi dispatch. Nó là
một lớp phòng vệ cuối cùng cho các executor không có timeout upstream riêng, và nó
được nâng lên bằng timeout fetch-start của chính executor khi giá trị đó dài hơn, nhờ đó nó
không thể cắt ngang một phản hồi đang truyền khỏe mạnh. Mặc định 600000ms (10 phút).

Việc đưa ngân sách hàng đợi vào `expiration` chính là thứ từng giết các gateway
non-incremental giữa chừng — chúng chạy hợp lệ trong nhiều phút trước khi có byte đầu tiên —
và đó là lý do một expiration được hiển thị dưới dạng `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) trong khi ngân sách hàng đợi mang
mã queue-timeout. Ghi đè một trong hai giá trị qua `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) hoặc qua dashboard
(**Settings → Resilience**). Cả hai đều được kẹp trong khoảng 1ms–24h khi chuẩn hóa.

**Thứ tự ưu tiên, cho cả hai:** biến env chỉ cung cấp giá trị _mặc định_. Một giá trị
được lưu bền trong `resilienceSettings.requestQueue` (dashboard / API patch, lưu
trong `key_value`) sẽ thắng nó, và một
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` theo từng connection sẽ thắng giá trị đó. Do đó, việc đặt
biến env trên một deployment đã có giá trị được lưu bền sẽ
không thay đổi gì cả — thay vào đó hãy xóa hoặc cập nhật cài đặt đã lưu.

Thời gian nằm trong hàng đợi bị giới hạn bởi `maxWaitMs`; `maxQueueDepth` bên dưới giới hạn
số lượng caller có thể nằm trong hàng đợi cùng một lúc.

**Các lần retry do body chỉ định: pacing vs lockout.** Một body 429 có thể tự nêu thời gian chờ của nó
(Gemini `RetryInfo.retryDelay`, đoạn text "retry after Ns"), thứ mà
`updateFromResponseBody` đọc. Một thời gian chờ vừa với `maxWaitMs` của connection
là pacing: limiter làm rỗng reservoir của nó trong khoảng thời gian đó và các call đang xếp hàng
được dispatch khi nó được nạp lại. Một thời gian chờ dài hơn `maxWaitMs` không phải thứ mà
hàng đợi có thể ngồi chờ hết — Gemini trả về `retryDelay: "86399s"` cho một daily quota đã cạn. `Retry-After` được chuyển tiếp trên response 429 được dựng lại (#16528)
đã khiến fallback engine khóa model trong khoảng thời gian đó, nhưng việc tạm dừng
limiter cho nó nữa vẫn sẽ làm bế tắc bất kỳ call nào chạm tới key sớm
(chẳng hạn sau một lần reset resilience) trong suốt `maxWaitMs`. Khi một thời gian chờ như vậy đến từ một detail `RetryInfo` có kiểu của Google
(nguồn gốc `google_rpc_retry_info`) và limiter của key đã
được scoped theo model (xem `getLimiterKey`), response 429 sẽ trở thành một
model lockout trên connection đó (`lockModelForLongBodyRetry` trong
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, giới hạn tối đa 24h), và
limiter được giữ nguyên không tạm dừng. Việc chọn account sẽ bỏ qua lock đó qua
`isModelLocked()`, và cổng pre-dispatch của combo cũng vậy đối với các target được ghim vào
connection đó. Trên antigravity, nơi limiter theo từng quota family, lock nằm
trên chính xác model đó, giống như các quota lock khác của nó. Tên mà client yêu cầu
cũng bị khóa khi một alias đã phân giải nó thành model đó, vì các lượt kiểm tra đó dùng
tên được yêu cầu; nó bị khóa một cách chính xác (`lockExactModel`), nên một alias
vượt qua một quota family của antigravity hoặc một scope của codex sẽ không bao giờ khóa chính nó. Một
gợi ý dạng văn xuôi, một `retryDelay` không có kiểu, hoặc một
limiter được chia sẻ bởi toàn bộ connection sẽ giữ nguyên hành vi tạm dừng. Khi limiter mà
đường xử lý 429 vừa dựng lại có tạm dừng, một caller mà thời gian hàng đợi còn lại kết thúc
trước khi khoảng tạm dừng kết thúc sẽ bị từ chối ngay lập tức với mã queue-timeout
(`checkLimiterPause`) thay vì chờ hết khoảng thời gian đó; điểm kết thúc được ghi lại
được neo trước khi limiter được dựng, tại nơi Bottleneck bắt đầu đồng hồ refresh
của nó, và bất kỳ thay đổi nào sau đó đối với reservoir sẽ quên nó đi. Được bao phủ bởi
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` và
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — giới hạn tiếp nhận dạng opt-in (mới).** `resilienceSettings.requestQueue.maxQueueDepth`
giới hạn số lượng request có thể nằm trong hàng đợi (chưa được dispatch) cho một
provider+connection tại một thời điểm. Khi hàng đợi đã giữ `maxQueueDepth`
request, một request mới bị từ chối nhanh với một lỗi có kiểu
`code: "RATE_LIMIT_QUEUE_FULL"` **trước khi** nó kịp chạm tới `limiter.schedule()`
— nhờ đó việc từ chối diễn ra rẻ và xảy ra trước bất kỳ công đoạn
prompt-compression / translation nào ở downstream cho request đó. Mặc định `0` =
tắt, giữ nguyên hành vi hàng đợi không giới hạn hiện có; giới hạn trong khoảng 0–100000.
Ghi đè qua `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) hoặc
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Bản thân lượt kiểm tra tiếp nhận là một pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) nên
nó có thể được unit-test mà không cần một limiter Bottleneck thật.

> RFC đã mở #6593 cũng đề xuất một cờ `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` của repo này là nén prompt/ngữ cảnh
> trên request LLM đi ra (`chatCore.ts`, quanh khối
> `resolveCompressionSettings`/`selectCompressionStrategy`), chứ không phải nén
> HTTP response trên các body 429 được tổng hợp — không tồn tại đường code
> tương ứng cho một cờ bypass theo đúng nghĩa đen. Bước nén prompt đó cũng hiện
> chạy _trước_ `withRateLimit()` trong pipeline request, vì vậy việc sắp xếp
> lại thứ tự để bỏ qua nó khi bị từ chối do hàng đợi đầy là một thay đổi riêng
> biệt và lớn hơn so với phạm vi của issue này; nó đã cố tình **không** được
> triển khai ở đây và được để lại làm công việc tiếp theo nếu lợi ích tiết
> kiệm CPU xứng đáng với rủi ro của việc sắp xếp lại thứ tự.

### Cơ chế an toàn tự động bật giới hạn tốc độ & Bảo vệ kết nối (`rateLimitProtection`)

**Cơ chế an toàn tự động bật** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, mặc định `true`):
Theo mặc định, OmniRoute tự động bật bảo vệ hàng đợi giới hạn tốc độ cho tất cả các kết nối provider API-key đang hoạt động (`getProviderCategory(provider) === "apikey"`). Điều này đảm bảo các request đến những upstream API key nhạy cảm về tốc độ được đưa vào hàng đợi và điều tiết thông qua Bottleneck thay vì bùng phát thành các lỗi 429 từ upstream. Cơ chế an toàn này có thể bị ghi đè qua biến môi trường `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` để tắt, `true`/`1`/`on` để bắt buộc bật), biến này được ưu tiên hơn cài đặt dashboard đã lưu trữ (**Cài đặt → Khả năng phục hồi** / `PATCH /api/resilience`).

**Ngữ nghĩa của `rateLimitProtection` theo từng kết nối:**
Bảo vệ giới hạn tốc độ theo từng kết nối được theo dõi qua trường boolean `rateLimitProtection` trên các kết nối provider (được lưu trữ dưới dạng `rate_limit_protection` trong SQLite):

- **Bật tường minh (`rateLimitProtection === true`)**: Bảo vệ giới hạn tốc độ được bật một cách tường minh cho kết nối này, bất kể danh mục provider hay việc cơ chế an toàn tự động bật có đang bật hay không.
- **Tắt tường minh (`rateLimitProtection === false`)**: Tắt bảo vệ tường minh, nhưng **không** loại một kết nối API-key đang hoạt động ra khỏi cơ chế an toàn tự động bật toàn cục. Trong `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` và `undefined` là tương đương nhau: chỉ `rateLimitProtection === true` mới được coi là ghi đè tường minh. Nếu `rateLimitProtection` là `false` (hoặc chưa được đặt), một kết nối API-key đang hoạt động vẫn khớp với điều kiện tự động bật và vẫn được bảo vệ giới hạn tốc độ.
- **Không có tùy chọn từ chối theo từng kết nối**: Hiện tại người vận hành không thể biểu thị "chỉ riêng kết nối API-key đang hoạt động này phải chạy mà không có bảo vệ hàng đợi giới hạn tốc độ" trong khi vẫn giữ tự động bật cho các kết nối khác. Để chạy hoàn toàn các kết nối API-key mà không có hàng đợi giới hạn tốc độ, cơ chế an toàn phải được tắt trên toàn cục (`RATE_LIMIT_AUTO_ENABLE=false` hoặc `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Các đường ghi được hỗ trợ:**

- **`POST /api/rate-limits`**: Đường ghi quản lý được hỗ trợ để bật/tắt `rateLimitProtection` cho một kết nối (`{ connectionId: string, enabled: boolean }`). Gọi endpoint này với `enabled: true` sẽ bật bảo vệ tường minh; gọi với `enabled: false` sẽ gỡ bỏ bảo vệ tường minh (dù các kết nối API-key đang hoạt động vẫn được bao phủ bởi cơ chế an toàn toàn cục nếu tự động bật đang bật).
- **`PUT /api/providers/[id]`**: Cố tình **không** chấp nhận hoặc đảo `rateLimitProtection` (#11278). Việc cập nhật metadata kết nối provider qua `PUT /api/providers/[id]` sẽ không bao giờ thay đổi trạng thái bảo vệ giới hạn tốc độ đã lưu trữ.

---

## 6. Watchdog thông lượng luồng chậm (#9709)

Bộ bảo vệ tùy chọn `resilienceSettings.streamRecovery.throughputWatchdog` phát hiện một upstream vẫn đang gửi các phần dữ liệu nhưng tạo ra đầu ra của assistant thấp hơn tốc độ đầu ra hữu ích đã cấu hình. Bộ bảo vệ này được thiết kế khác biệt rõ ràng với thời gian chờ không hoạt động: heartbeat và siêu dữ liệu không đặt lại bất kỳ bộ hẹn giờ nào và không được tính là tiến trình. Nó cũng khác với thời hạn tuyệt đối của lần thử (#9153), vốn vẫn là giới hạn an toàn tuyệt đối bất kể chất lượng đầu ra.

Watchdog yêu cầu một khoảng thời gian khởi động, sau đó là một cửa sổ cuốn hoàn chỉnh, trước khi có thể hủy. Nó đếm các delta văn bản từ Chat Completions và các sự kiện đầu ra của Responses API (một đại diện byte UTF-8 thận trọng), bỏ qua các sự kiện chỉ chứa thông tin sử dụng và các sự kiện rỗng, đồng thời tạm dừng đánh giá khi các sự kiện gọi công cụ hoặc suy luận đang diễn ra. Tính năng này bị tắt theo mặc định và có thể được bật bằng `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`
(giá trị env đó chỉ khởi tạo giá trị mặc định — một boolean
`resilienceSettings.streamRecovery.throughputWatchdog.enabled` đã lưu sẽ được ưu tiên;
xem ghi chú về thứ tự ưu tiên giữa env và dashboard ở đầu hướng dẫn này); cửa sổ, thời gian khởi động, tốc độ tối thiểu và đầu ra tối thiểu có thể đo được được giới hạn bởi lớp chuẩn hóa resilience-settings thông thường.

Khi được bật, việc hủy bởi watchdog chỉ được áp dụng cho lần thử upstream đang hoạt động. Trước khi có bất kỳ byte nào hiển thị với client, đường dẫn khôi phục sớm cho cùng tài khoản hiện có có thể mở lại lần thử. Sau khi commit, luồng sẽ không bao giờ được phát lại một cách mù quáng; chỉ hợp đồng tiếp tục giữa luồng an toàn hiện có mới có thể ghép một hậu tố. Việc hoàn tất vẫn chỉ diễn ra một lần, vì vậy việc hạch toán mức sử dụng và giải phóng semaphore không bị lặp lại.

---

## 7. Tái lập trạng thái upstream (lỗi quota bị gán sai)

**Phạm vi:** một gateway upstream báo hết quota tạm thời với HTTP status không chính xác.

**Mục đích:** điều chỉnh status gây hiểu nhầm **TRƯỚC** khi phân loại, để các thành phần downstream (engine fallback, tổng hợp combo, phản hồi gửi đến client) nhận biết đúng bản chất có thể retry của lỗi.

Một số gateway báo hiệu tình trạng hết quota TẠM THỜI bằng HTTP
status không thể retry. `agentrouter.org` trả về `403` (đôi khi là `400`) cùng
body tiếng Trung (`用户额度不足` / `额度不足`) thay vì `429` chuẩn. Các client như Claude
Code coi `403` là lỗi vĩnh viễn và hủy session; nếu không điều chỉnh,
engine fallback sẽ phân loại lỗi này thành `AUTH_ERROR` thay vì một
sự kiện quota.

**Triển khai:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — một
  danh sách quy tắc theo từng provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), được đối chiếu thông qua `applyStatusRestatement()`.
- Vị trí gọi: block `providerFailure:` trong `open-sse/handlers/chatCore.ts`
  (xung quanh dòng 3654), ngay sau khi `parseUpstreamError()` phân tích
  phản hồi upstream có HTTP status lỗi (`!providerResponse.ok`), và trước khi
  bất kỳ quá trình phân loại nào chạy, để mọi thành phần downstream đều nhận
  status đã được điều chỉnh. Các lỗi được nhúng trong stream SSE `200` đi theo
  một nhánh phân tích stream riêng ở phía sau và **hiện chưa** được hook này
  bao phủ — đây là một hạn chế đã biết, chưa cần xử lý cho misstatus của
  agentrouter (vốn xuất hiện dưới dạng HTTP status lỗi).
- Khả năng retry: `429` nằm trong `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), vì vậy lỗi đã được tái lập
  status mang theo một khoảng thời gian retry thực sự thay vì xuất hiện như
  `403` không thể phục hồi.
- `defaultRetryAfterMs` tổng hợp `60s` (`upstreamStatusRestatement.ts`)
  chỉ là giá trị mà phản hồi đã được tái lập thông báo cho **client**; bản thân
  giá trị này không phải thời lượng cooldown/lockout nội bộ của connection —
  thời lượng đó được quản lý riêng bởi cơ chế thực sự xử lý lỗi đã được tái lập
  (Connection Cooldown với exponential backoff tăng dần, §2, cơ sở là
  `3s` đối với các provider dùng API key; hoặc Model Lockout, §3, đối với các
  provider có quota theo model như agentrouter). Router có thể đủ điều kiện
  retry nội bộ sớm hơn khoảng thời gian `60s` được quảng bá cho client — đây là
  khoảng đệm có chủ đích, không phải lỗi.

Các lỗi vĩnh viễn (`无权访问模型` — không có quyền truy cập model này) của
agentrouter **KHÔNG BAO GIỜ** được tái lập status: `excludeMarkers` sẽ vô hiệu
hóa quy tắc ngay cả khi `textMarkers` khớp, vì vậy lỗi vẫn giữ nguyên status
ban đầu và không có gì retry vô hạn. Quy tắc phân loại provider tương ứng
(`agentrouter-model-access-denied` trong `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown cơ sở được khai báo là
`6h`) được `checkFallbackError` (`open-sse/services/accountFallback.ts`)
kiểm tra _trước_ khi thực hiện early-return `FORBIDDEN` chung theo category
apikey, với điều kiện `honorsRuleLockScope(provider)` (#10334 — hiện chỉ
dành riêng cho agentrouter thông qua allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong `providerErrorRules.ts`). Cooldown 6h
được khai báo trong quy tắc được truyền qua dưới dạng
`fallbackResult.baseCooldownMs`, nhưng vẫn đi vào path lockout theo quota
model hiện có (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, không thay đổi bởi #10334 ngoại trừ nguồn
cooldown): giá trị này bị giới hạn xuống `mlSettings.maxCooldownMs` của
operator (mặc định `1_800_000ms` / 30 phút), giống như mọi model lockout
khác, và _lý do lockout được lưu trữ_ vẫn là chuỗi hardcode có sẵn
`"forbidden"`, không phải `"auth_error"` của quy tắc — chỉ thời lượng cooldown
được tôn trọng xuyên suốt, không phải chuỗi lý do. Connection vẫn hoạt động;
các model anh em trên cùng connection không bị ảnh hưởng.

Các lỗi quota đã được tái lập (`额度不足`) đi tới một quy tắc provider trong
production (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, không tự khai báo cooldown — mặc định backoff theo tỷ lệ của
tầng persistence sẽ được áp dụng). Kể từ #10334, `scope` trên
`ProviderErrorRuleMatch` ĐƯỢC sử dụng xuyên suốt, nhưng **chỉ** đối với các
provider nằm trong allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — hiện chỉ có `"agentrouter"`, được kiểm soát thông qua
`honorsRuleLockScope()`). Đối với mọi provider khác, `scope` vẫn chỉ mang tính
thông tin, hoàn toàn giống như trước #10334.
`checkFallbackError` đưa scope của quy tắc khớp vào
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) là guard dùng chung để xác nhận rằng
`ruleScope` thực sự an toàn khi được coi là tín hiệu áp dụng trên toàn
connection và có thể tự phục hồi (scope `"connection"`, reason
`quota_exhausted`, không bao giờ là `permanent`, không bao giờ là
`creditsExhausted` — nhằm phòng vệ trước trường hợp trong tương lai một quy
tắc ghép scope `"connection"` với trạng thái tài khoản vĩnh viễn). Có hai
consumer gọi hàm này:

- **Lưu trữ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  thay vì rơi vào nhánh khóa **theo từng model** của passthrough-provider
  (agentrouter có `passthroughModels: true` → `hasPerModelQuota()`
  trả về `true`), cơ chế này áp dụng **thời gian chờ tạm thời cho kết nối** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, không bao giờ đặt trạng thái kết thúc
  (`credits_exhausted`/`banned`/`expired`) — để kết nối tự khôi phục
  khi thời gian chờ kết thúc thay vì yêu cầu đặt lại thông tin xác thực thủ công.
  Bỏ qua đối với các kết nối có `disableCooling: true` (#2997): tùy chọn không tham gia
  này sẽ rơi vào nhánh khóa theo từng model thay thế (một đánh đổi đã được ghi lại —
  xem chú thích mã phía trên nhánh này).
- **Định tuyến tổ hợp trong cùng một yêu cầu** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): cùng một guard sẽ đánh dấu
  kết nối vào tập `exhaustedConnections` trong bộ nhớ, với khóa
  `${provider}:${connectionId}`. Việc này chỉ bỏ qua một target CÙNG-YÊU-CẦU còn lại
  mà _bản thân target đó đã mang chính xác `connectionId` ấy_ trên đối tượng target riêng
  của nó (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` trước khi tra cứu `exhaustedConnections`) — một combo chỉ gồm danh sách
  model, trong đó các target cùng nhóm không có `connectionId` được ghim riêng và mỗi target
  chỉ được phân giải một lần cho mỗi lần dispatch từ header
  `X-OmniRoute-Selected-Connection-Id` của response, sẽ không bao giờ khớp khóa đó. Với
  trường hợp phổ biến này, cơ chế bảo vệ thực sự chống việc một nhánh còn lại tái sử dụng
  tài khoản vừa cạn kiệt KHÔNG phải là Set này — mà là lớp lưu trữ ở trên
  (`rateLimitedUntil` của kết nối hiện đang nằm trong tương lai) kết hợp với việc guard này
  ngăn không cho thêm provider vào `transientRateLimitedProviders` đối với lỗi đó (xem
  "Thiết kế hai giai đoạn" và chú thích mã tại nhánh
  `isAgentrouterConnectionQuotaScope` trong `targetExhaustion.ts`): khi Set này không được
  đánh dấu, cơ chế buộc cho phép `allowRateLimitedConnection` trong `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sẽ KHÔNG được kích hoạt cho
  các nhánh còn lại của provider, vì vậy bộ lọc `rateLimitedUntil` của việc chọn thông tin
  xác thực (`src/sse/services/auth.ts:1238`) được tuân thủ bình thường và một nhánh còn lại
  hoặc chọn một kết nối agentrouter khác vẫn đủ điều kiện, hoặc thất bại với lỗi không có
  thông tin xác thực khả dụng — nó không ép buộc quay lại kết nối mà nhánh này vừa đặt thời
  gian chờ.

### Thiết kế hai giai đoạn: diễn giải lại trạng thái, sau đó phân loại

Việc diễn giải lại trạng thái (`upstreamStatusRestatement.ts`) và các quy tắc
phân loại provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) là hai registry riêng biệt cùng dựa trên id provider
và các dấu hiệu văn bản, nhưng chúng chạy ở những nơi khác nhau và phục vụ các
mục đích khác nhau: việc diễn giải lại viết lại HTTP status sớm trong `chatCore.ts`;
các quy tắc phân loại chọn `reason` dự phòng và khóa `scope`
(`model` / `provider` / `connection`) bên trong `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Các quy tắc phân loại chỉ nhìn thấy **toàn bộ văn bản** lỗi (cần thiết để khớp
các dấu hiệu trong body như `额度不足`) đối với các provider được liệt kê trong
allowlist `FULL_TEXT_RULE_PROVIDERS` trong `providerErrorRules.ts` — hiện tại chỉ có
`"agentrouter"`. Với mọi provider **tích hợp sẵn trong catalog** khác,
`checkFallbackError` chỉ truyền cho `getProviderErrorRuleMatch` lỗi có cấu trúc
(`{code, type}`), đủ cho các quy tắc dựa trên header/status/code nhưng không nhìn thấy
các dấu hiệu trong phần văn bản của body. Helper `resolveRuleMatchBody()` thực hiện
việc lựa chọn này: toàn bộ văn bản lỗi đối với provider trong allowlist, còn đối với
các provider khác thì dùng lỗi có cấu trúc. Việc thêm một provider **tích hợp sẵn**
vào `FULL_TEXT_RULE_PROVIDERS` là một opt-in rõ ràng theo từng provider — cơ chế này
tồn tại để đường dẫn mặc định cho mọi provider không có trong danh sách vẫn được giữ
nguyên từng byte.

`scope` của một quy tắc (`model` / `provider` / `connection`) là một opt-in riêng
biệt với `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` chỉ hiển thị nó dưới dạng
`fallbackResult.ruleScope`, và các consumer phía sau chỉ thực sự tuân theo nó như
bất kỳ thứ gì khác ngoài nhãn mang tính thông tin đối với các provider nằm trong
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong cùng tệp (được kiểm soát thông qua
`honorsRuleLockScope()` — hiện nay chỉ có `"agentrouter"`). Xem "Lỗi hạn mức đã được
diễn giải lại" ở trên để biết một kết quả khớp `scope: "connection"` thực sự thực hiện
điều gì sau khi provider nằm trong allowlist đó.

**#11104 — các quy tắc do operator khai báo bỏ qua cả hai allowlist.** Operator có thể
khai báo một quy tắc theo từng provider trong thời gian chạy thông qua
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mà không cần chỉnh sửa tệp này. Việc buộc một quy tắc của operator phải qua
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — các allowlist được
thiết kế để bảo vệ hành vi **mặc định** của các quy tắc catalog tích hợp sẵn — sẽ
khiến cơ chế settings trở nên vô hiệu đối với mọi provider ngoại trừ những provider
đã được liệt kê ở đó, vì việc khai báo quy tắc vốn đã là opt-in rõ ràng của operator.
Cả `resolveRuleMatchBody()` và `honorsRuleLockScope()` đều kiểm tra
`hasOperatorRuleForProvider()` trước: provider có quy tắc của operator sẽ nhận văn bản
lỗi thô và `scope` đã khai báo sẽ được tôn trọng, bất kể provider đó có xuất hiện trong
một trong hai allowlist hay không.

**Các quy tắc do operator khai báo** (`OperatorProviderErrorRule`): mỗi quy tắc có
`status` tùy chọn và `match` tùy chọn (một chuỗi con đơn giản, không phân biệt hoa
thường của văn bản lỗi, không bao giờ là RegExp, nên không thể gây ra ReDoS), đồng thời
phải thiết lập ít nhất một trong hai trường này. Khi cả hai được thiết lập, chúng được
kết hợp bằng AND; trường bị bỏ qua sẽ khớp với mọi giá trị, vì vậy
`{match: "insufficient_quota"}` sẽ khớp với mọi status chứa mã đó. Quy tắc đầu tiên
khớp sẽ được chọn. `cooldownMs` chấp nhận tối đa 30 ngày; tổng số quy tắc tối đa là 50.

**Mặc định tổng quát** (`settings.providerErrorDefaults`, tùy chọn bật, được thiết lập thông qua
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
với `cooldownMs` từ 1 phút đến 30 ngày. Mặc định chỉ được áp dụng khi không có quy tắc
operator nào và cũng không có quy tắc catalog tích hợp nào khớp, đồng thời chỉ áp dụng cho
các lỗi 402, 403, 408, 429 và 5xx. Các lỗi về hình dạng request (400, 404, 409, 413, 422)
và lỗi 401 không kèm thông tin khác vẫn giữ cách xử lý riêng. Khi không có `reason` tường
minh, lý do được lấy từ status, giống như cách `classifyError` thực hiện. Việc khai báo một
mặc định được tính là một quy tắc operator đối với `hasOperatorRuleForProvider()`, vì vậy
`scope` của nó (mặc định là `"connection"`) sẽ được tôn trọng. Thời gian cooldown hiệu lực
của một mặc định là giá trị dài hơn giữa `cooldownMs` của nó và gợi ý retry riêng của
provider (`Retry-After`, `x-ratelimit-reset` hoặc gợi ý reset trong body, cùng gợi ý mà engine
tôn trọng khi bật cài đặt connection-cooldown "use upstream retry hints"), do đó một mặc
định có thể kéo dài một gợi ý upstream ngắn nhưng không bao giờ rút ngắn một thời điểm reset
thực tế. Một quy tắc operator tường minh giữ nguyên `cooldownMs` chính xác của nó. Cả quy tắc
lẫn mặc định đều không bỏ qua các guard connection-cooldown trong `markAccountUnavailable`:
một cooldown đang hoạt động và dài hơn không bao giờ bị rút ngắn, đồng thời status terminal
không bao giờ bị ghi đè. Các bộ phát hiện văn bản tích hợp chạy sớm hơn trong
`checkFallbackError` (hết credits, hết quota hằng ngày, tài khoản bị vô hiệu hóa) vẫn được ưu
tiên đối với các cụm từ tương ứng của chúng.

**Khoảng thiếu đã biết — `providerRuleRegistry` không bao giờ được tham chiếu cho HTTP 400.**
Nhánh `BAD_REQUEST` của `checkFallbackError` phân loại status 400 hoàn toàn thông qua các
mảng pattern riêng của nó (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, v.v. trong `accountFallback.ts`) và trả về trước khi đến được
nhánh `configuredRule`/`getProviderErrorRuleMatch` ở phía trên. Một quy tắc catalog tích hợp
(hoặc quy tắc operator) có `status: 400` là hợp lệ về cú pháp nhưng sẽ không bao giờ được
kích hoạt. Hiện tại không có quy tắc nào nhắm đến 400, nên production không bị ảnh hưởng —
nhưng một quy tắc 400 trong tương lai trước tiên cần chạm vào nhánh này; đây là thay đổi lớn
hơn việc thêm một quy tắc vì nó sẽ phân loại lại 400 cho mọi provider vốn đã dựa vào hành vi
mảng pattern, và nằm ngoài phạm vi của việc thêm quy tắc cho một provider.

### Thêm một gateway khai báo sai quota

1. Đăng ký một mảng quy tắc trong `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Giữ `textMarkers`
   riêng theo provider; không bao giờ dùng lại các cụm từ tiếng Anh chung có thể xung đột với
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Tùy chọn đăng ký các quy tắc phân loại trong
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) để chọn phạm vi khóa phù
   hợp (`connection` cho quota trên toàn tài khoản, `model` cho lỗi trên từng model). Bước này
   chỉ có hiệu lực trong production đối với các provider mà quy tắc cần toàn bộ văn bản lỗi
   (marker trong body): thêm id của provider vào `FULL_TEXT_RULE_PROVIDERS` trong cùng tệp —
   nếu không, `checkFallbackError` chỉ truyền cho quy tắc lỗi có cấu trúc
   `{code, type}`, và quy tắc dựa trên văn bản body sẽ không bao giờ khớp với traffic thực tế.
   Các quy tắc chỉ khớp theo `status`/`headers` (như của Opencode hoặc Minimax) không cần bật
   tùy chọn này. Ngoài ra, nếu quy tắc khai báo `scope: "connection"` và mục đích là cooldown
   thực sự trên toàn connection kèm bỏ qua combo trong cùng request (không chỉ là nhãn thông
   tin), hãy thêm id của provider vào `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong cùng tệp —
   đây là phần kiểm soát việc tiêu thụ theo kiểu `isAgentrouterConnectionQuotaScope()` trong
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) và
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); nếu không, `scope`
   vẫn được truyền qua `fallbackResult.ruleScope` nhưng không có thành phần nào hành động
   theo nó.
3. Thêm các unit test mô phỏng theo
   `tests/unit/upstream-status-restatement.test.ts`
   và `tests/unit/agentrouter-error-rules.test.ts` (bao gồm các guard
   not-permanent / not-creditsExhausted, và — nếu provider cần allowlist — một test xác nhận
   `resolveRuleMatchBody()` chỉ trả về toàn bộ văn bản cho provider đó).

Không cần thay đổi `chatCore.ts`, `classifyError` hoặc combo.

#### Khóa theo nhóm egress (#10880)

Các provider trong `EGRESS_BUCKETED_LOCK_PROVIDERS` (họ opencode) được xem là upstream
được phân nhóm theo IP (gói miễn phí opencode được phân nhóm theo IP, không phải theo tài
khoản — xem #9611): status-429 được phân loại là `quota_exhausted`
**hoặc** `rate_limit_exceeded` sẽ áp dụng cooldown cho mọi connection thuộc họ được
allowlist mà IP egress được biết gần nhất khớp với IP của connection bị lỗi, trước khi
rotation có thể thử chúng
— tránh N-1 lệnh gọi upstream chắc chắn thất bại (cùng dạng với #10460/#10525).
`rate_limit_exceeded` được đưa vào có chủ ý: trên đường dẫn `markAccountUnavailable`, các
quy tắc riêng của opencode không bao giờ khớp (không có headers/body được chuyển cho
`checkFallbackError`, opencode không nằm trong `FULL_TEXT_RULE_PROVIDERS`), vì vậy 429 có
body chứa văn bản quota thuê bao ("monthly usage limit reached") được phân loại là
`quota_exhausted` bởi fallback văn bản quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 giờ) trước khi quy tắc
`status_429` được xét — trong khi 429 không có văn bản quota (giới hạn tốc độ thông thường)
được phân loại thông qua quy tắc `status_429` là `rate_limit_exceeded` và vẫn áp dụng
cooldown cho nhóm IP. Các giới hạn thực tế:

- **Cố gắng tối đa**: lock phân giải `egress_ip` được biết gần nhất của kết nối
  từ `proxy_logs` (cửa sổ 24 giờ, đồng bộ, không có cache). Cache lạnh (chưa từng
  dò IP egress) hoặc không có bản ghi → kết nối gây lỗi vẫn được branch áp dụng
  cooldown (được ghi nhận như hiện tại), chỉ là không có sibling nào bị lock.
- **Không bao giờ ở trạng thái kết thúc**: cooldown là một cửa sổ quota được gia hạn
  (`testStatus: "unavailable"`); không bao giờ suy ra trạng thái vĩnh viễn từ tín
  hiệu ở cấp IP. Các kết nối `disableCooling` bỏ qua hoàn toàn branch này.
- **Thay đổi mức độ lock đối với family trong allowlist**: đây là thay đổi phạm vi,
  không chỉ là tối ưu hóa sibling. opencode là provider `passthroughModels`, vì vậy
  trước branch này, 429 tạo ra lockout theo từng MODEL; hiện tại nó tạo cooldown cho
  kết nối — kể cả khi operator chỉ chạy một kết nối duy nhất và hoàn toàn không có
  sibling. Đây là mức độ mà bảng rule của opencode đã khai báo là đúng
  (`scope: "connection"`, `providerErrorRules.ts`), nhưng trước đây chưa từng được
  áp dụng vì opencode không nằm trong `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Branch này
  tự ghi cooldown của kết nối gây lỗi cùng với `backoffLevel`, mô phỏng branch
  agentrouter có phạm vi kết nối, rồi return — block theo model và đường dẫn chung
  bên dưới không bao giờ được thực thi.
- **Bao gồm combo**: giống branch agentrouter, phạm vi này cố ý bỏ qua việc hạ cấp
  `persistUnavailableState`/`isCombo` mà caller combo áp dụng cho 429. Lockout theo
  model không phải là một dạng yếu hơn của phạm vi này, mà là sai đơn vị: nó không
  cho biết gì về IP đã cạn quota, nên việc xoay combo sẽ tiếp tục tiêu tốn một lần
  gọi chắc chắn thất bại cho mỗi sibling.
- **An toàn cho sibling**: một sibling đã ở trạng thái kết thúc (banned/credits_exhausted)
  hoặc đã có cooldown dài hơn sẽ không bao giờ bị ghi đè.
- **Allowlist độc quyền**: việc mở rộng `EGRESS_BUCKETED_LOCK_PROVIDERS` là quyết
  định rõ ràng của owner; không có wiring chung (pattern #10334/#10419). Truy vấn
  sibling bind cùng allowlist đó thay vì lặp lại nó dưới dạng literal SQL, nên việc
  mở rộng allowlist vẫn chỉ cần thay đổi một dòng.
- **Xoay IP egress, theo cả hai hướng**: cửa sổ tra cứu (24 giờ) rộng hơn nhiều so
  với TTL của cache IP egress (5 phút), vì vậy “IP được biết gần nhất” là lịch sử,
  không phải trạng thái hiện tại. Nếu proxy của một kết nối đã xoay IP trong cửa sổ
  này, lock có thể **bỏ sót** một IP thực sự được dùng chung (IP được ghi nhận là
  IP mới, chưa cạn quota) — và tương tự, có thể **áp dụng cooldown cho một sibling
  đã xoay sang IP khác** khỏi IP đã cạn quota. Trường hợp thứ hai khiến sibling đó
  chịu một cửa sổ cooldown; cả hai đều là các giới hạn best-effort được chấp nhận
  của việc tra cứu dựa trên lịch sử.
- **Chi phí**: hai lần quét có giới hạn trên `proxy_logs` (lọc theo cửa sổ thông qua
  `idx_pl_timestamp`), chỉ thực hiện với tần suất 429. Không thêm index mới
  (migration 134 YAGNI). Đã đo trên bản sao DB có lưu lượng thực tế với kích thước
  vừa phải; một instance có thông lượng cao sẽ giữ số lượng bản ghi trong cùng cửa
  sổ lớn hơn theo tỷ lệ.

## Các tính năng resilience khác

- **20 chiến lược định tuyến** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — xem [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Định tuyến nhận biết reset** (v3.8.0) — ưu tiên các kết nối theo thời điểm reset quota.
- **Suy giảm chế độ background** — Responses API `background: true` bị hạ xuống chế độ đồng bộ kèm cảnh báo.
- **Phát hiện giới hạn tool động** — tự back off các provider khi chạm giới hạn số lượng tool.
- **Fallback khẩn cấp** — được điều khiển bởi `OMNIROUTE_EMERGENCY_FALLBACK`; người vận hành có thể ghi đè từ trang Feature Flags mà không cần khởi động lại.

---

## Gỡ lỗi

- Combo weighted trả về `503 all_targets_cooling_down` (`Retry-After` được thiết lập, `diagnostics.excluded` liệt kê mọi target với `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool đã được cấu hình và kết nối, chỉ là mọi target đều đang bị loại trừ bởi một bộ đếm thời gian resilience; cảnh báo `[COMBO] Weighted selection: every target excluded before dispatch — …` nêu rõ các lý do và số giây còn lại. Một lỗi `404 no_executable_targets` từ cùng combo đó nghĩa là không có bộ đếm thời gian resilience nào liên quan (không có gì để chạy, hoặc mọi tài khoản đều không vượt qua được bài kiểm tra khả dụng). Được xây dựng trong `open-sse/services/combo/pinRecovery.ts` từ các loại trừ thu thập được trong `targetResolution.ts`.
- Mọi key của một provider đều bị bỏ qua → kiểm tra cả trạng thái circuit breaker LẪN `rateLimitedUntil`/`testStatus` của từng kết nối.
- Provider bị loại trừ vĩnh viễn sau cửa sổ reset → code đang đọc `state` thô thay vì `getStatus()`/`canExecute()`.
- Một key lỗi, các key khác vẫn hoạt động → ưu tiên connection cooldown hơn circuit breaker.
- Chỉ một model lỗi → ưu tiên model lockout hơn connection cooldown.
- Trạng thái lẽ ra phải tự phục hồi nhưng không → kiểm tra timestamp ở tương lai + đường đọc làm mới trạng thái đã hết hạn. Các trạng thái vĩnh viễn yêu cầu thay đổi thủ công.

---

## Trạng thái runtime — tham khảo nhanh dành cho agent

> Được chuyển nguyên văn từ `AGENTS.md` → "Resilience Runtime State" (PR #12743) để hướng
> dẫn dành cho agent nằm trong ngân sách context 40k. Đây là phiên bản rút gọn, hướng tới
> agent, của các phần bên trên; các phần được đánh số vẫn là tài liệu tham khảo đầy đủ.

OmniRoute có ba cơ chế xử lý lỗi tạm thời liên quan nhưng khác biệt nhau. Hãy giữ
phạm vi của chúng tách biệt khi gỡ lỗi hành vi định tuyến. Xem
[sơ đồ resilience 3 lớp](../diagrams/exported/resilience-3layers.svg)
(nguồn: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
để có bản đồ tổng quan nhanh.

### Circuit Breaker cấp provider

**Phạm vi**: toàn bộ provider, ví dụ `glm`, `openai`, `anthropic`.

**Mục đích**: ngừng gửi traffic tới một provider liên tục lỗi ở tầng
upstream/dịch vụ, để một provider không khỏe mạnh không làm chậm mọi request.

**Triển khai**:

- Lớp cốt lõi: `src/shared/utils/circuitBreaker.ts`
- Kết nối gate/thực thi chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API trạng thái runtime: `src/app/api/monitoring/health/route.ts`
- Các wrapper dùng chung: `open-sse/services/accountFallback.ts`
- Bảng trạng thái được lưu trữ: `domain_circuit_breakers`

**Các trạng thái** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: traffic bình thường được phép.
- `DEGRADED`: vùng cảnh báo sớm — số lỗi đã vượt ngưỡng suy giảm nhưng chưa
  chạm ngưỡng breaker; traffic vẫn chạy, dashboard hiển thị cảnh báo. Một bài kiểm tra
  kết nối hợp lệ hoặc một cửa sổ yên tĩnh không có lỗi mới sẽ đưa nó về `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` có thông tin về cửa sổ này).
- `OPEN`: provider tạm thời bị chặn; caller nhận phản hồi provider-circuit-open
  hoặc định tuyến combo bỏ qua sang target khác.
- `HALF_OPEN`: timeout reset đã trôi qua; cho phép một request thăm dò. Thành công thì
  đóng breaker, thất bại thì mở lại.

**Mặc định** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, được sử dụng qua
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` trong `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` trong `src/sse/handlers/chatHelpers.ts`). Breaker cấp
toàn provider chạy dựa trên `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profile | suy giảm tại | mở tại (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | -----------: | ---------------------------------: | ----------------------------: |
| OAuth   |          `5` |                                `8` |                         `60s` |
| API key |          `7` |                               `12` |                         `30s` |
| Local   |     (suy ra) |                                `2` |                         `15s` |

`PROVIDER_PROFILES` cũng định nghĩa `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 phút) và `providerCooldownMs` (5/10/1 phút): chúng vận hành
**cổng cửa sổ của tính năng Provider Cooldown toàn cục dạng opt-in** (`PROVIDER_COOLDOWN_ENABLED`, mặc định
tắt) — một mục cấp provider trong `open-sse/services/providerCooldownTracker.ts` chỉ được tính
là đang cooldown sau `providerFailureThreshold` lần lỗi trong `providerFailureWindowMs`, và sau đó
cooldown trong `providerCooldownMs`. Chúng KHÔNG phải là ngưỡng của breaker đang hoạt động
— đừng tinh chỉnh chúng với kỳ vọng thay đổi hành vi breaker. Mọi giá trị mặc định
đều có thể ghi đè qua các biến môi trường
`OMNIROUTE_PROVIDER_BREAKER_*` và `OMNIROUTE_CIRCUIT_BREAKER_*`; bảng
tham khảo chính xác theo runtime nằm trong `docs/architecture/RESILIENCE_GUIDE.md`.

Chỉ các trạng thái lỗi cấp provider mới được kích hoạt breaker của provider:

```ts
(408, 500, 502, 503, 504);
```

Không kích hoạt breaker cấp toàn provider cho các lỗi tài khoản/key/model thông thường
như đa số trường hợp `401`, `403`, hoặc `429`. Những lỗi đó thường thuộc về
connection cooldown hoặc model lockout. Một lỗi `403` của provider API key thông thường
nên có thể phục hồi trừ khi nó được phân loại là lỗi provider/tài khoản dứt điểm.

Bộ ngắt mạch (breaker) sử dụng cơ chế khôi phục lười (lazy recovery), không dùng bộ đếm thời gian chạy nền. Khi trạng thái `OPEN` hết hạn, các lượt đọc như `getStatus()`, `canExecute()`, và `getRetryAfterMs()` sẽ làm mới trạng thái thành `HALF_OPEN`, nhờ đó các dashboard và trình xây dựng ứng viên combo không tiếp tục loại trừ vĩnh viễn một provider đã hết hạn.

### Thời gian chờ kết nối (Connection Cooldown)

**Phạm vi**: một kết nối/tài khoản/khóa của provider.

**Mục đích**: tạm thời bỏ qua một khóa/tài khoản bị lỗi trong khi vẫn cho phép các kết nối khác của cùng provider tiếp tục phục vụ yêu cầu.

**Triển khai**:

- Đường ghi/cập nhật: `src/sse/services/auth.ts::markAccountUnavailable()`
- Lựa chọn/lọc tài khoản: `src/sse/services/auth.ts::getProviderCredentials...`
- Tính toán thời gian chờ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Cài đặt: `src/lib/resilience/settings.ts`

Các trường quan trọng trên kết nối provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Trong quá trình lựa chọn tài khoản, một kết nối sẽ bị bỏ qua khi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Thời gian chờ cũng hoạt động theo cơ chế lười: khi `rateLimitedUntil` đã ở trong quá khứ, kết nối sẽ đủ điều kiện trở lại. Khi sử dụng thành công, `clearAccountError()` sẽ xóa `testStatus`, `rateLimitedUntil`, các trường lỗi, và `backoffLevel`.

Hành vi mặc định của thời gian chờ kết nối:

- Thời gian chờ cơ bản của OAuth: `5s`.
- Thời gian chờ cơ bản của API-key: `3s`.
- Lỗi `429` của API-key nên ưu tiên các gợi ý thử lại từ phía upstream (`Retry-After`, các header reset, hoặc văn bản reset có thể phân tích được) khi có sẵn.
- Các lỗi có thể khôi phục lặp lại sẽ dùng backoff lũy thừa:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Cơ chế chống hiệu ứng bầy đàn (thundering herd) ngăn các lỗi đồng thời trên cùng một kết nối kéo dài thời gian chờ nhiều lần hoặc tăng `backoffLevel` hai lần.

Các trạng thái cuối (terminal) không phải là thời gian chờ. `banned`, `expired` (chỉ trở thành terminal sau N lần thử lại có giới hạn thông qua `EXPIRED_RETRY_MAX`), và `credits_exhausted` được thiết kế để duy trì trạng thái không khả dụng cho đến khi thông tin xác thực/cài đặt thay đổi hoặc có người vận hành đặt lại chúng. Không ghi đè trạng thái terminal bằng trạng thái cooldown tạm thời.

### Khóa model (Model Lockout)

**Phạm vi**: provider + kết nối + model.

**Mục đích**: tránh vô hiệu hóa toàn bộ một kết nối khi chỉ có một model không khả dụng hoặc bị giới hạn quota cho kết nối đó.

Ví dụ:

- Các provider áp quota theo từng model trả về `429`.
- Các provider cục bộ trả về `404` cho một model bị thiếu.
- Các lỗi quyền theo chế độ/model riêng của provider, chẳng hạn như các chế độ Grok được chọn.

Khóa model nằm trong `open-sse/services/accountFallback.ts` và cho phép cùng một kết nối tiếp tục phục vụ các model khác.

### Hướng dẫn gỡ lỗi

- Nếu tất cả các khóa của một provider đều bị bỏ qua, hãy kiểm tra cả trạng thái breaker của provider và `rateLimitedUntil`/`testStatus` của từng kết nối.
- Nếu một provider có vẻ bị loại trừ vĩnh viễn sau cửa sổ reset, hãy kiểm tra xem mã nguồn có đang đọc `state` thô thay vì dùng `getStatus()`/`canExecute()` hay không.
- Nếu một khóa của provider bị lỗi nhưng các khóa khác vẫn hoạt động, hãy ưu tiên dùng connection cooldown thay vì provider breaker.
- Nếu chỉ một model bị lỗi, hãy ưu tiên dùng model lockout thay vì connection cooldown.
- Nếu một trạng thái cần tự khôi phục, nó phải có một dấu thời gian trong tương lai/timeout reset và một đường đọc làm mới trạng thái đã hết hạn. Các trạng thái vĩnh viễn đòi hỏi thay đổi thủ công về thông tin xác thực hoặc cấu hình.

---

## TLS Fingerprinting & Stealth

Tính năng stealth theo từng provider (JA3/JA4, CCH, obfuscation) được tài liệu riêng — xem `docs/security/STEALTH_GUIDE.md` (git; không được biên dịch vào `/docs`).

---

## Kiểm thử khả năng phục hồi (Phase 8 · Block C)

Ngoài các unit test cho logic phục hồi, có ba bài test vận hành runtime dưới
các điều kiện lỗi/áp lực thực tế (tất cả đều là integration/nightly — không bài nào chặn PR):

| Test        | Nội dung                                                                                                                                                             | Chạy                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Node fake-upstream chèn độ trễ/reset/timeout/503 thực; xác nhận rằng circuit breaker mở/phục hồi và `checkFallbackError` phân loại 503 là fallback có thể khôi phục. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream trên mỗi `createSSEStream` với `--expose-gc`; thất bại nếu heap tăng vượt ngưỡng trần (OOM guard #3069).                                                 | `npm run test:heap`                      |
| k6 soak     | Tải liên tục vào `/api/monitoring/health`; ngưỡng p95/tỉ lệ lỗi.                                                                                                     | `k6 run tests/load/k6-soak.js` (nightly) |

Được điều phối bởi `.github/workflows/nightly-resilience.yml` (cron + dispatch). Trong
`test:integration` mặc định, chaos và heap sẽ tự bỏ qua (khi không có `RUN_CHAOS_INT`/`--expose-gc`).

---

## Xem thêm

- [Hướng dẫn Kiến trúc](./ARCHITECTURE.md) — Kiến trúc hệ thống và cơ chế bên trong
- [Hướng dẫn Người dùng](../guides/USER_GUIDE.md) — Providers, combo, tích hợp CLI
- [Engine Auto-Combo](../routing/AUTO-COMBO.md) — Chấm điểm 16 yếu tố, các mode pack
