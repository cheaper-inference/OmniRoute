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

**Mục đích:** bỏ qua một khóa bị lỗi trong khi các kết nối khác của cùng nhà cung cấp vẫn tiếp tục phục vụ.

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

- Cơ sở OAuth: 5 giây
- Cơ sở khóa API: 3 giây
- API-key 429: ưu tiên các header `Retry-After`/reset từ upstream/văn bản reset có thể phân tích
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Độ trễ thử lại theo từng nhà cung cấp.** Trang chi tiết nhà cung cấp có một danh sách chọn **Độ trễ thử lại** (Tự động, từ
15 giây đến 1 giờ). Danh sách này lưu `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, thông qua `PATCH /api/resilience`). Khi lỗi giới hạn tốc độ không chứa
gợi ý thử lại từ upstream, giá trị này thay thế backoff đã điều chỉnh cho nhà cung cấp và đặt lại
`backoffLevel` về 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Thứ tự ưu tiên cho lỗi bị giới hạn tốc độ, từ cao nhất
đến thấp nhất: gợi ý thử lại từ upstream, sau đó là `providerSpecificData.rotationOverrides.rateLimitResetSeconds`
theo từng kết nối, tiếp đến độ trễ thử lại theo từng nhà cung cấp, rồi
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` từ môi trường, cuối cùng là backoff
đã điều chỉnh. Tự động sẽ xóa trường này. Tính năng này chỉ ảnh hưởng đến lý do giới hạn tốc độ, không bao giờ ảnh hưởng đến các trạng thái kết thúc.

**Bộ bảo vệ chống thundering herd:** ngăn các lỗi đồng thời kéo dài thời gian chờ quá mức hoặc tăng `backoffLevel` hai lần.

**Các lỗi 429 do giới hạn đồng thời không làm tăng cấp backoff.** Một `429` mà nội dung phản hồi cho biết có giới hạn đồng thời ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) có nghĩa là tài khoản vẫn hoạt động bình thường nhưng đang bận.
`checkFallbackError()` trả về lý do `concurrency_limited`: chuyển sang kết nối tiếp theo ngay lập tức, cho kết nối này chờ trong thời gian cố định `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 giây) hoặc theo gợi ý thử lại từ upstream, giữ nguyên `backoffLevel` và đặt `skipProviderBreaker`.
Nội dung hạn ngạch cụ thể vẫn được ưu tiên, vì vậy nội dung cũng khớp với mẫu hạn ngạch sẽ vẫn cho kết luận là lỗi hạn ngạch. Phát hiện: `looksLikeConcurrencyLimit()` trong `src/shared/utils/classify429.ts`;
kết luận: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` của bộ ngắt) không thay đổi và vẫn đọc `rate_limit` đối với các nội dung này.

**Các phiên truyền bị đình trệ không làm tài khoản chờ.** Khi bộ giám sát đình trệ nội dung
(`open-sse/utils/streamHandler.ts`) từ bỏ một phiên truyền không gửi đầu ra mô hình nào trong thời gian quy định,
`markAccountUnavailable()` ghi lại lỗi trên kết nối nhưng không đặt thời gian chờ: trạng thái đình trệ thuộc về yêu cầu đó, thường xảy ra nhất khi một lượt suy luận dài chưa có đầu ra. Người vận hành có thể chủ động bật lại tính năng này bằng `resilienceSettings.streamStallCooldown.enabled`
(mặc định là `false`).

**Tín hiệu độ trễ tùy chọn cho việc lựa chọn tài khoản `p2c`.** Mỗi lần thử được gửi đi sẽ ghi lại thời gian đến byte đầu tiên và kết quả theo từng kết nối (và theo từng kết nối + mô hình) trong một cửa sổ cuộn trong bộ nhớ: 20 mẫu gần nhất trong vòng 15 phút
(`open-sse/services/connectionLatencyTracker.ts`, được ghi lại từ
`safeLogEvents()` trong `src/sse/handlers/chatHelpers.ts`). Khi `resilienceSettings.p2cLatency.weight` lớn hơn
`0` (phạm vi 0-20, mặc định `0` = tắt), `compareP2CConnections()` trong `src/sse/services/auth.ts` cộng tối đa
`weight` điểm cho mỗi ứng viên trong cặp. Một nửa số điểm đó đến từ độ trễ theo tỷ lệ so với ứng viên nhanh hơn (chậm gấp đôi sẽ nhận đủ một nửa điểm) và một nửa đến từ tỷ lệ lỗi cuộn.
Thuật ngữ này chỉ được áp dụng khi cả hai ứng viên có ít nhất 3 mẫu, vì vậy các tài khoản mới không bị phạt; mức trần của nó vẫn thấp hơn các mức phạt bị chặn hạn ngạch và đã hết hạn ngạch. Tính năng này không tự tạo thêm mạch ngắt: các tài khoản bị lỗi vẫn được xử lý bởi các lớp thời gian chờ, khóa và bộ ngắt. Đặt giá trị này bằng `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Các khung suy luận khởi động lại ngân sách đình trệ nội dung.** Một mô hình suy luận có thể suy nghĩ trong nhiều phút trước token hiển thị đầu tiên: Claude truyền các khung `thinking_delta` trong đó văn bản suy nghĩ có thể rỗng, còn Responses API truyền lần lượt nhiều mục suy luận. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) nhận diện các khung này, và bộ giám sát khởi động lại ngân sách sau mỗi khung thay vì hủy lượt xử lý. Chúng vẫn không phải là đầu ra mô hình, vì vậy một lượt kết thúc chỉ với suy luận vẫn được báo cáo là rỗng, và một lượt dừng suy luận rồi chỉ gửi heartbeat vẫn sẽ kích hoạt bộ giám sát.

Các khung nhị phân `reasoningContentEvent` của Kiro có chữ ký không rỗng sẽ bảo toàn hoạt động suy luận này qua executor dưới dạng một delta `reasoning_content` rỗng. Chữ ký không được chuyển tiếp. Siêu dữ liệu, các khung chưa hoàn chỉnh và chữ ký rỗng không khởi động lại ngân sách nội dung; thời gian chờ luồng đang hoạt động độc lập và việc hủy từ phía máy khách vẫn được áp dụng (`open-sse/executors/kiro/reasoning.ts`).

**Trạng thái kết thúc (KHÔNG phải thời gian chờ):**

- `banned` — được đặt bởi tính năng phát hiện từ khóa bị cấm / cấm tài khoản (xem [BAN_DETECTION](../security/BAN_DETECTION.md)), và bởi ba lần liên tiếp upstream từ chối theo từng yêu cầu (`request_rejected`, ví dụ OAuth 403 của Anthropic "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); một lần từ chối đơn lẻ chỉ khiến kết nối chờ
- `expired` (chuyển sang trạng thái kết thúc sau số lần thử lại có giới hạn — `EXPIRED_RETRY_MAX = 3` với backoff lũy thừa — để các lỗi OAuth tạm thời có thể tự khắc phục trước khi tài khoản bị vô hiệu hóa vĩnh viễn)
- `credits_exhausted`

Các trạng thái này được giữ nguyên cho đến khi thông tin xác thực thay đổi hoặc người vận hành đặt lại chúng. Không được ghi đè các trạng thái kết thúc bằng trạng thái thời gian chờ tạm thời.

**Khôi phục lười:** khi `rateLimitedUntil` đã qua, kết nối lại đủ điều kiện. Khi sử dụng thành công, `clearAccountError()` sẽ xóa tất cả các trường lỗi.

### Bức tường giới hạn sử dụng OAuth của Claude: làn ưu tiên thấp + đặt lại giới hạn phiên

**Phạm vi:** một kết nối Claude (OAuth). Cả hai tính năng đều **tùy chọn theo từng
kết nối** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` trong
`providerSpecificData`, mặc định đều tắt) và mô phỏng các lệnh `/low-priority` và `/limit-reset` của Claude Code (hợp đồng wire được ghi nhận từ Claude Code 2.1.263).

**Triển khai:**

- Máy trạng thái + phân loại phản hồi: `open-sse/services/claudeLowPriority.ts`
- Client đặt lại trạng thái/nhận quyền: `open-sse/services/claudeLimitReset.ts`
- Hook của executor (chèn header + thử lại cùng tài khoản): `open-sse/executors/base.ts::execute()`
- Lưu tùy chọn: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Kích hoạt:** bức tường sử dụng 5 giờ — một `429` có các header mang
`anthropic-ratelimit-unified-status: rejected` và, khi tài khoản đủ điều kiện,
`anthropic-ratelimit-unified-slow-offer: treatment`. Không có gì được gửi trước
lần `429` đầu tiên của bức tường; một đợt 429 không có unified headers sẽ đi qua
đường dẫn cooldown thông thường.

**Làn ưu tiên thấp** (`lowPriorityMode`):

- Khi xảy ra 429 của bức tường, executor chấp nhận đề nghị và ngay lập tức thử lại **cùng**
  tài khoản với `anthropic-usage-limit: slow`; làn này duy trì hoạt động cho đến khi
  `anthropic-ratelimit-unified-reset` được thông báo (+60 giây ân hạn), và mọi request
  trong khoảng thời gian đó đều mang header này. 429 bị chặn không bao giờ đến
  `handleChatCore`, vì vậy kết nối **không** bị đưa vào cooldown và không bị chuyển sang kết nối khác.
- `anthropic-ratelimit-unified-slow-status` trong các phản hồi sau đó: `active` / `not_needed`
  duy trì làn; `slot_busy` (429) hoặc `529` sẽ chờ theo
  `anthropic-ratelimit-unified-slow-retry-after` của máy chủ (mặc định 20 giây, giới hạn
  5–600 giây, jitter ±30%) rồi thử lại, với giới hạn bởi
  `anthropic-ratelimit-unified-slow-max-wait` (mặc định 20 phút, giới hạn
  1 phút–6 giờ) — quá thời gian đó làn kết thúc và một khoảng nghỉ 10 phút sẽ chặn việc
  chấp nhận lại. Thời gian chờ còn bị giới hạn bổ sung bởi thời gian còn lại của timeout
  bắt đầu upstream riêng của request (`resolveFetchStartTimeout`, mặc định 10 phút)
  trừ đi 5 giây: nếu không có giới hạn này, max-wait mặc định 20 phút sẽ kéo dài quá
  request và thao tác sleep sẽ bị hủy giữa chừng, làm lộ ra `TimeoutError` thay vì kết thúc
  `max_wait` + khoảng nghỉ một cách êm thấm.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, việc chuyển sang cửa sổ 5 giờ mới, hoặc
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kết thúc làn dưới dạng
  `extra_usage` ở bất kỳ trạng thái nào, vì overage trả phí hiện đã bao phủ bức tường) sẽ kết thúc làn;
  sau đó phản hồi đi qua đường dẫn cooldown thông thường. `budget_exhausted` được ghi nhớ
  cho đến khi ngân sách được đặt lại như đã thông báo (≤ 8 ngày).
- Việc kiểm tra bức tường chạy sau các lần thử lại nội bộ trong cùng một lần thử do executor
  thực hiện dựa trên 400 (chỉnh sửa ngữ cảnh, giới hạn thinking/effort, tự động học tham số),
  vì vậy một 429 của bức tường chỉ xuất hiện trong một trong các lần thử lại đó vẫn được chặn
  thay vì đi đến đường dẫn cooldown.
- Trạng thái nằm trong bộ nhớ theo từng kết nối (khởi động lại sẽ phải nhận lại sau một 429
  của bức tường).

**Đặt lại giới hạn phiên** (`autoLimitReset`, được thử trước làn này khi cả hai đều bật):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → khối `juniper_tide`;
  khi `arm: "reset"` và `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` với
  `{ "program": "juniper_tide" }` (UUID tổ chức lấy từ `providerSpecificData.organizationUUID`, có
  phương án dự phòng từ bootstrap).
- `result: reset|not_limited` → request được thử lại với tốc độ tối đa (không có slow header).
  `already_used` / `not_offered` ghi nhớ `next_available_at` (mặc định một tuần); mọi lỗi đều
  kích hoạt backoff 15 phút. Việc đặt lại diễn ra mỗi tuần một lần và vẫn được tính vào giới hạn tuần.

Bộ bảo vệ hồi quy: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinity phiên (#7274)

**Phạm vi:** một phiên client (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)
được ghim vào một kết nối, cho **bất kỳ** provider nào.

**Mục đích:** giữ một agent nhiều lượt (Claude Code, aider, agent tùy chỉnh) trên cùng một tài khoản
giữa các request, giảm mất ngữ cảnh giữa các tài khoản và các 429 khởi động lạnh lặp lại trên
những provider có trạng thái phiên theo từng tài khoản.

**Triển khai:**

- Phân giải TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Chọn/tạo pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Trích xuất header (chung, mọi provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Bảng pin được lưu trữ: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Cài đặt: `sessionAffinityTtlMs` (TTL toàn cục tính bằng mili giây, `0` để tắt) — `src/lib/db/settings.ts`. Được đổi tên từ `codexSessionAffinityTtlMs` vốn chỉ dành cho Codex bởi migration `124_generic_session_affinity_ttl.sql`, migration này chuyển mọi TTL Codex đã được cấu hình trước đó thành giá trị mặc định mới.

Trước #7274, `resolveSessionAffinityTtlMs()` luôn trả về sớm với `0` cho mọi provider
ngoại trừ `codex`, vì vậy cài đặt TTL (và các session headers) không có tác dụng ở bất kỳ nơi nào khác,
dù cơ chế ghim và việc trích xuất header vốn đã không phụ thuộc provider. Bản sửa đã loại bỏ
việc trả về sớm đó; TTL hiện được áp dụng đồng nhất cho mọi provider khi được đặt toàn cục lớn hơn `0`.

Ba session-affinity headers không bao giờ được chuyển tiếp lên upstream — các executor tự xây dựng
upstream headers từ đầu thay vì truyền tiếp client headers, nên giá trị này chỉ là id tương quan nội bộ.

### Lease kết nối phiên được quản lý độc quyền

**Phạm vi:** một client HTTP/phiên được quản lý đang hoạt động sở hữu một kết nối OmniRoute đủ điều kiện.

**Mục đích:** cung cấp quyền sở hữu kết nối độc quyền bền vững cho các ứng dụng cần một
hàng rào định tuyến cứng giữa các yêu cầu. Điều này khác với tính bám phiên, vốn là một tùy
chọn ưu tiên duy trì tính liên tục mang tính mềm: một lease độc quyền duy trì trạng thái vòng
đời trong SQLite, thực thi tính duy nhất trên toàn cục đối với chủ sở hữu đang hoạt động và
kết nối đang hoạt động, đồng thời từ chối thế hệ cũ trước khi phân phối đến nhà cung cấp.

Tính năng này được bật tùy chọn theo từng khóa API. Một khóa được quản lý phải có scope
`lease:exclusive` và danh sách `allowedConnections` không rỗng, được chỉ định rõ ràng. Mọi
ứng dụng HTTP đều có thể sử dụng endpoint vòng đời; không yêu cầu tên ứng dụng, user-agent,
nhà cung cấp, phương thức OAuth hoặc model. Lease sở hữu một kết nối, không phải một model,
vì vậy việc thay đổi model vẫn giữ nguyên liên kết trong khi kết nối vẫn đủ điều kiện theo các
quy tắc thông thường. Các quy tắc thông thường về model, hạn ngạch, tình trạng hoạt động,
thời gian tạm ngưng và allowlist vẫn có thẩm quyền, đồng thời có thể chuyển cùng thế hệ đó
sang một kết nối đủ điều kiện khác đang rảnh.

Vòng đời sử dụng `POST /api/v1/session-leases` với các action JSON `acquire`, `renew` và
`release`. Các yêu cầu suy luận được quản lý gửi giá trị `X-OmniRoute-Lease-Owner` dạng
opaque và `X-OmniRoute-Lease-Generation` chính xác. Owner sử dụng tiền tố `vlo_` theo sau
bởi 43 ký tự base64url; chỉ lưu trữ giá trị băm SHA-256 của owner. Mỗi hàng rào phân phối
cuối cùng cũng liên kết ID khóa API đã xác thực và ID kết nối đang hoạt động. Các header
điều khiển lease được loại bỏ khỏi log, các snapshot yêu cầu được lưu giữ và header của
executor phía upstream.

Nếu việc định tuyến thông thường có các ứng viên được quản lý đủ điều kiện nhưng mọi ứng
viên đang rảnh đều bị một lease đang hoạt động của bên khác chiếm giữ, OmniRoute trả về HTTP
`429`, mã lease-capacity-unavailable, trạng thái waiting-for-capacity và `Retry-After` có
giới hạn được tính từ thời điểm hết hạn liên quan sớm nhất. Việc không có ứng viên đủ điều
kiện thông thường không phải là tranh chấp lease và vẫn giữ nguyên ngữ nghĩa lỗi định tuyến
hiện có.

Các cơ chế liên quan vẫn tách biệt:

- Tình trạng chiếm dụng phiên OAuth là cơ chế phân phối mềm, cục bộ trong tiến trình, dành cho các tài khoản OAuth.
- Semaphore tài khoản cấp quyền xử lý đồng thời cho yêu cầu và kết thúc khi một yêu cầu hoàn tất.
- Lease phiên được quản lý độc quyền là quyền sở hữu vòng đời bền vững với hàng rào thế hệ.

---

## 3. Khóa Model (Model Lockout)

**Phạm vi:** bộ ba provider + connection + model.

**Phạm vi khóa theo status:** status lỗi quyết định khóa mà một lockout ghi
vào (`resolveLockoutScope()` trong `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — tín hiệu về quota hoặc quyền sử dụng — khóa **nhóm quota**:
  với codex là toàn bộ phạm vi `codex` / `spark` (mọi model `gpt-5*` của
  connection đó), với các provider khác là `getQuotaScopedModelForProvider()`.
- `404` khóa riêng model đó (`getModelLockKey()` thu hẹp trường hợp `not_found`).
- Bất kỳ status nào khác — các lỗi transport/server `5xx` và lỗi `502` do chính
  OmniRoute tổng hợp từ bước kiểm tra chất lượng — chỉ khóa **đúng**
  bộ ba provider/connection/model đó. Một stream lỗi trên một model không phải là bằng chứng
  về quota của tài khoản; trước khi có quy tắc này, một phản hồi rỗng trên
  `codex/gpt-5.6-luna` đã loại mọi model `gpt-5*` của connection đó khỏi
  việc định tuyến trong 2–30 phút (tăng dần) trong khi quota của nó không hề bị ảnh hưởng.
- Tùy chọn `scope` do caller chỉ định tường minh luôn được ưu tiên (Antigravity truyền `"exact"`).

**Mục đích:** tránh vô hiệu hóa toàn bộ một connection khi chỉ một model không khả dụng hoặc bị giới hạn quota.

**Ví dụ:**

- Các provider áp quota theo từng model trả về 429
- Các provider local trả về 404 cho một model bị thiếu
- Các lỗi quyền theo mode/model đặc thù của provider (ví dụ: các mode của Grok)

**Triển khai:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Bảng điều khiển Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Liệt kê các lockout đang hoạt động với: provider, connection, model, reason, expiresAt. Người vận hành có thể tự tay kích hoạt lại một model từ thẻ này.

**REST API:**

- `GET /api/resilience/model-cooldowns` — liệt kê các lockout đang hoạt động
- `DELETE /api/resilience/model-cooldowns` — kích hoạt lại thủ công. Body: `{provider, connection, model}`. Xác thực: management.

### Trình quản lý Cooldown

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Một trang duy nhất cho mọi connection đang bị loại khỏi định tuyến vì lý do tạm thời, thay vì
phải mở từng trang provider. Trang này liệt kê các connection cooldown, model lockout và các trạng thái
cuối cùng (terminal), xóa chúng theo từng connection, theo một tập chọn, hoặc cho tất cả connection của một provider,
và chỉnh sửa các quy tắc cooldown được tinh chỉnh nhiều nhất: `streamStallCooldown.enabled` và
`connectionCooldown` của OAuth / API-key — thời gian cooldown cơ sở và số bước backoff tối đa (lưu qua
`PATCH /api/resilience`). Các trạng thái cuối cùng (`banned`, `expired`, `credits_exhausted`) được
liệt kê nhưng không bao giờ bị xóa tại đây.

**REST API** (`src/lib/resilience/cooldownManager.ts`, xác thực: management):

- `GET /api/resilience/cooldowns[?provider=]` — các connection kèm trạng thái, thời gian cooldown còn lại,
  mức backoff, loại lỗi gần nhất và các model lockout (không bao gồm credentials)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` hoặc
  `{all: true, provider?}`; trả về `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI cài đặt Lockout + phục hồi bằng suy giảm theo thành công (v3.8.23)

Model lockout đã chuyển từ hành vi hardcoded luôn bật sang một tính năng
có thể cấu hình đầy đủ, opt-in, với thẻ cài đặt riêng và một lộ trình phục hồi tự lành.

**Thẻ cài đặt:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Thẻ này **khác biệt** với `ModelCooldownsCard` chỉ-đọc ở trên (vốn chỉ
_liệt kê_ các lockout đang hoạt động) — thẻ mới _cấu hình các tham số_. Giá trị mặc định
nằm trong `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Cài đặt                 | Mặc định                         | Ý nghĩa                                                      |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | Công tắc tổng — model lockout **mặc định tắt**.              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Các status từ upstream được tính là lỗi ở phạm vi model.     |
| `baseCooldownMs`        | `120_000` (120 s)                | Thời gian lockout ban đầu cho lần lỗi đầu tiên.              |
| `maxCooldownMs`         | `1_800_000` (30 phút)            | Giới hạn trên của cooldown sau khi leo thang.                |
| `maxBackoffSteps`       | `10`                             | Số bước leo thang exponential-backoff tối đa.                |
| `useExponentialBackoff` | `true`                           | Có leo thang cooldown theo hàm mũ khi lỗi lặp lại hay không. |

Các cài đặt được lưu qua settings store thông thường và được kiểm tra hợp lệ qua
schema cài đặt resilience; thẻ này ghim giá trị `baseCooldownMs`/`maxCooldownMs`
(với `maxCooldownMs ≥ baseCooldownMs`) và `maxBackoffSteps`.

**Phục hồi bằng suy giảm theo thành công:** việc phục hồi **không** hoàn toàn dựa vào hết hạn timer. Một phản hồi
khỏe mạnh sẽ đưa số đếm lỗi của model giảm dần về, nhờ đó một model đã phục hồi
giữa cửa sổ sẽ ngừng leo thang (và được xóa khóa) trước khi timer hết hạn. Khi một
combo target thành công, `open-sse/services/combo.ts` gọi `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), hàm này **giảm một nửa** giá trị
`failureCount` đã lưu (`Math.floor(failureCount / 2)`); khi về `0`, entry lockout
sẽ bị xóa hoàn toàn. Hàm đối ứng `recordModelLockoutFailure()`
tăng số đếm (và leo thang cooldown) khi có lỗi trong cửa sổ
leo thang. Cơ chế suy giảm theo thành công này bổ sung cho việc hết hạn timer thông thường —
cả hai lộ trình đều có thể kích hoạt lại một model.

**Trạng thái:** các lockout được giữ **trong bộ nhớ** (các `Map` theo tiến trình chứa
`ModelLockoutEntry` được khóa theo `provider:connectionId:model`, các khóa phạm vi exact được khóa theo
`provider:connectionId:exact:model`), không được lưu vào
DB — chúng sẽ mất khi khởi động lại. Các _cài đặt_ thì được lưu bền; còn _trạng thái_ lockout
đang hoạt động là tạm thời.

---

## 4. Kiểm soát đồng thời chia sẻ hạn ngạch (v3.8.36)

Tài khoản đăng ký (GLM, MiniMax, v.v.) thường chỉ chấp nhận ~ 1–3 yêu cầu đồng thời; vượt quá mức đó sẽ kích hoạt 429 giây và thời gian hồi chiêu. Đây là tình trạng cấp tính dưới** chia sẻ hạn ngạch** (`qtSd/…`), trong đó một số khóa API chia sẻ một tài khoản ngược dòng. Ba lớp giữ cho tài khoản dùng chung không bị ngập.

### Giới hạn đồng thời trên mỗi kết nối (`max_concurrent`)

Mỗi kết nối nhà cung cấp có thể khai báo mức trần `max_concurrent` (`provider_connections.max_concurrent`, được đặt trong phương thức kết nối / API / DB). Để trống không có giới hạn. Đây là núm duy nhất điều khiển lớp tuần tự hóa bên dưới — đặt nó thành đồng thời thực sự của tài khoản (ví dụ GLM ~ 1, MiniMax ~ 2).

### Giới hạn đồng thời cho mỗi mô hình (`modelConcurrency`)

Ngoài ra, một kết nối có thể khai báo mức trần đồng thời chính xác cho mỗi mô hình bên trong bản đồ `rateLimitOverrides` của nó:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Đặt nó ở chế độ kết nối (** Giới hạn tốc độ ghi đè → Giới hạn đồng thời trên mỗi mô hình** , một `model=cap` trên mỗi dòng) hoặc qua `PATCH /api/providers/[id]` có cùng hình dạng JSON. Ngữ nghĩa chính:

- **Kết nối trên toàn bộ so với mô hình cụ thể:** `maxConcurrent` vẫn là trần kết nối chung. Khi áp dụng cả hai, cả hai cổng đều được thu nhận nguyên tử trong cùng một cổng tổng hợp (`global → provider → account → model`); hành vi hiệu quả là giới hạn áp dụng chặt chẽ hơn.
- **Kết hợp khóa mô hình chính xác:** khóa là chuỗi mô hình được chuyển cho người thực thi sau khi định tuyến độ phân giải — thông thường là id mô hình ngược dòng trần (`glm-5`), không phải bí danh `provider/model` phía máy khách (`zai/glm-5` không khớp với `glm-5`). Giá trị là mức trần yêu cầu đồng thời số nguyên dương.
- **Xếp hàng cục bộ, không có khám phá:** các yêu cầu vượt quá xếp hàng cục bộ với ngữ nghĩa queue/timeout hiện có (lỗi nhập `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` đã nhập). OmniRoute không phát hiện hoặc suy ra chính sách ngược dòng — nó thực thi các mức trần chính xác mà nhà điều hành đã định cấu hình. Cổng mô hình bão hòa không bao giờ vô hiệu hóa nhà cung cấp và không bao giờ tạo ra khóa mô hình vĩnh viễn; hành vi 429/cooldown/fallback ngược dòng vẫn là lỗi dừng lại.
- **Phạm vi mỗi kết nối, mỗi quy trình:** giới hạn dành cho mỗi kết nối cơ sở dữ liệu và được giữ trong bộ nhớ, do đó, hai kết nối sử dụng lại cùng một khóa API ngược dòng không phối hợp với nhau.
- **Chưa được định cấu hình có nghĩa là không thay đổi:** bỏ qua bản đồ (hoặc để trống trường bảng thông tin) sẽ không thêm cổng mô hình. Cấu hình ví dụ mà không xác nhận bất kỳ giới hạn nào của nhà cung cấp phổ quát:

```text
glm-5=1
glm-4.7=3
```

### Tuần tự hóa yêu cầu chia sẻ hạn ngạch

Khi công văn chia sẻ hạn ngạch nhắm mục tiêu kết nối khai báo `max_concurrent` dương, các yêu cầu đồng thời tới kết nối đó** tài khoản** được tuần tự hóa thông qua một semaphore trên mỗi kết nối (khóa `qsconn:<connectionId>`): yêu cầu vượt quá** chờ trong hàng đợi** thay vì làm ngập tài khoản. Đó là** mở không thành công** — một hàng đợi bão hòa hoặc hết thời gian chờ sẽ tiếp tục mà không có thời điểm thay vì từ chối một yêu cầu có thể gửi đi. Chuyển đổi trong** Cài đặt → Khả năng phục hồi → Hạn ngạch chia sẻ đồng thời trên mỗi kết nối** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, bật mặc định). Nếu không có giới hạn `max_concurrent` thì hành vi sẽ không thay đổi.

> Cổng định tuyến chia sẻ hạn ngạch (`selectQuotaShareTarget`, DRR + P2C) tự mở không thành công và chỉ _deprioritizes_ một kết nối giới hạn — với một nhóm kết nối duy nhất mà nó không thể giới hạn cứng, vì vậy semaphore này thực sự chứa lũ.

### Thử lại nhận biết thời gian hồi chiêu của combo

Đối với mọi chiến lược kết hợp (khi được bật), một yêu cầu sẽ kết tinh 429 cho thời gian hồi chiêu tạm thời SHORT sẽ chờ nó và gửi lại thay vì trả lại 429 — điều này bao gồm các cửa sổ TPM/RPM cấp Gemini (~ 60s thử lại sau) trên các kết hợp nhiều mô hình, ví dụ: cả hai mục tiêu của tổ hợp 2 mô hình đều đạt giới hạn tốc độ cho mỗi mô hình. Giới hạn bởi `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) trong** Cài đặt → Khả năng phục hồi** . Nó không bao giờ đợi vì lý do `quota_exhausted` (bị khóa đến nửa đêm) hoặc auth/not-found.

Một sự kết hợp có thể chọn không tham gia với `config.comboCooldownWaitEnabled: false`. Chỉ `false` theo nghĩa đen mới vô hiệu hóa các thời gian chờ kết hợp được chia sẻ này (thời gian hồi chiêu sau khi gửi và thời gian chờ circuit-open/model-lock trước khi gửi) và phần mở rộng thời gian chờ theo ngân sách chờ của chúng. Thiếu hoặc `true` duy trì chính sách toàn cầu; `true` không thể kích hoạt tính năng chờ bị vô hiệu hóa trên toàn cầu. Một `targetTimeoutMs` rõ ràng vẫn thắng. Việc chọn không tham gia này không làm thay đổi thời gian chờ gửi trước mã pin riêng biệt của Codex.

Cổng tương tự bao gồm trường hợp trước khi gửi đi (#16319): khi mọi mục tiêu của một tổ hợp đều bị bỏ qua trước khi thực hiện bất kỳ nỗ lực nào vì mô hình của nó nằm trong tình trạng khóa tạm thời trong thời gian ngắn, đường dẫn không thử sẽ đợi khóa trong cùng một mức trần và gửi lại, thay vì trả lời `503 ALL_TARGETS_SKIPPED` không có gợi ý. Khi không được phép chờ đợi (hết trần, nỗ lực hoặc hết ngân sách hoặc tắt tính năng), phản hồi của thiết bị đầu cuối sẽ nâng cấp lên `429 rate_limit_error` mang `retry_after` / `reset_at` kể từ thời điểm hết hạn khóa tạm thời sớm nhất; hạn ngạch, khóa xác thực và khóa không tìm thấy giữ nguyên 503 không có gợi ý.

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

## 7. Điều chỉnh lại trạng thái upstream (lỗi quota báo sai trạng thái)

**Phạm vi:** một upstream gateway báo cáo tình trạng hết quota tạm thời bằng một HTTP status sai.

**Mục đích:** sửa một status gây hiểu lầm TRƯỚC KHI phân loại, để các consumer ở downstream (fallback engine, combo aggregation, response trả về client) nhìn thấy bản chất thực sự có thể retry của lỗi.

Một số gateway báo hiệu tình trạng hết quota TẠM THỜI bằng một HTTP status
không thể retry. `agentrouter.org` trả về `403` (đôi khi `400`) với body
tiếng Trung (`用户额度不足` / `额度不足`) thay vì `429` chuẩn. Các client như
Claude Code coi `403` là lỗi vĩnh viễn và hủy phiên, và nếu không được sửa,
fallback engine sẽ phân loại nó là `AUTH_ERROR` thay vì một sự kiện quota.

**Triển khai:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — một
  danh sách các rule theo từng provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), được khớp qua `applyStatusRestatement()`.
- Điểm gọi: khối `providerFailure:` trong `open-sse/handlers/chatCore.ts`
  (khoảng dòng 3654), ngay sau khi `parseUpstreamError()` parse một response
  từ upstream có HTTP status lỗi (`!providerResponse.ok`), và trước khi bất kỳ
  phân loại nào chạy, để mọi consumer downstream đều thấy status đã được
  sửa. Các lỗi được nhúng bên trong một stream SSE `200` đi theo một đường
  parse stream riêng, muộn hơn và **không** được hook này xử lý hiện nay —
  một hạn chế đã biết, chưa cần thiết cho việc báo sai status của
  agentrouter (vốn xuất hiện dưới dạng một HTTP status lỗi).
- Điều kiện retry: `429` nằm trong `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), vì vậy một lỗi đã được
  điều chỉnh mang theo một cửa sổ retry thực sự thay vì xuất hiện như một
  `403` chết.
- `defaultRetryAfterMs` giả lập `60s` (`upstreamStatusRestatement.ts`) chỉ là
  thứ mà response đã điều chỉnh báo cho **client**; bản thân nó không phải là
  thời gian cooldown/lockout nội bộ của connection — thời gian đó được quản
  lý riêng bởi bất kỳ cơ chế nào thực sự xử lý lỗi đã điều chỉnh
  (escalating backoff của Connection Cooldown, §2, base `3s` cho các provider
  dùng API key; hoặc Model Lockout, §3, cho các provider quota theo từng
  model như agentrouter). Router có thể trở nên đủ điều kiện để retry nội bộ
  sớm hơn cửa sổ 60s mà nó thông báo cho client — đó là khoảng dự phòng có
  chủ đích, không phải bug.

Các lỗi vĩnh viễn (`无权访问模型` của agentrouter — không có quyền truy cập
model này) KHÔNG BAO GIỜ được điều chỉnh: `excludeMarkers` phủ quyết rule ngay
cả khi `textMarkers` khớp, vì vậy lỗi giữ nguyên status gốc và không có gì
retry nó mãi mãi. Rule phân loại provider tương ứng
(`agentrouter-model-access-denied` trong `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, một base cooldown khai báo `6h`)
được `checkFallbackError` (`open-sse/services/accountFallback.ts`) tham khảo
_trước_ early-return `FORBIDDEN` chung của nhóm apikey, được kiểm soát bởi
`honorsRuleLockScope(provider)` (#10334 — hiện chỉ dành riêng cho agentrouter
qua allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong
`providerErrorRules.ts`). Cooldown 6h được khai báo của rule được truyền qua
dưới dạng `fallbackResult.baseCooldownMs`, nhưng nó vẫn đi vào đường lockout
quota theo từng model đã có từ trước (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, không thay đổi bởi #10334 ngoại trừ nguồn
cooldown): nó bị kẹp xuống `mlSettings.maxCooldownMs` của operator (mặc định
`1_800_000ms` / 30 phút), giống như mọi model lockout khác, và _lý do lockout
được lưu trữ_ vẫn là `"forbidden"` hardcode từ trước, không phải
`"auth_error"` của rule — chỉ có thời lượng cooldown được tôn trọng
end-to-end, không phải chuỗi lý do. Bản thân connection vẫn hoạt động; các
model cùng connection không bị ảnh hưởng.

Các lỗi quota đã điều chỉnh (`额度不足`) chạm tới một provider rule trong
production (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, không có cooldown khai báo riêng — áp dụng mặc định
scaled backoff của tầng persistence). Kể từ #10334, `scope` trên
`ProviderErrorRuleMatch` ĐƯỢC sử dụng end-to-end, nhưng **chỉ** cho các
provider trong allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — hiện nay chỉ có `"agentrouter"`, được kiểm soát qua
`honorsRuleLockScope()`). Với mọi provider khác, `scope` vẫn chỉ mang tính
thông tin, đúng như trước #10334. `checkFallbackError` đưa scope của rule đã
khớp ra ngoài dưới dạng `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) là guard
dùng chung xác nhận rằng một `ruleScope` thực sự an toàn để tôn trọng như một
tín hiệu toàn connection, tự phục hồi (scope `"connection"`, reason
`quota_exhausted`, không bao giờ `permanent`, không bao giờ
`creditsExhausted` — một biện pháp phòng thủ chống lại việc một rule tương
lai ghép scope `"connection"` với một trạng thái tài khoản vĩnh viễn). Có hai
consumer gọi nó:

- **Tính lưu trữ bền vững (Persistence)** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  thay vì rơi vào nhánh khóa **theo từng model** của passthrough-provider
  (agentrouter là `passthroughModels: true` → `hasPerModelQuota()`
  trả về `true`), nó áp dụng một **thời gian cooldown tạm thời cho kết nối** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, không bao giờ là trạng thái
  kết thúc (`credits_exhausted`/`banned`/`expired`) — để kết nối tự phục hồi
  khi hết thời gian cooldown thay vì yêu cầu reset credential thủ công.
  Được bỏ qua đối với các kết nối có `disableCooling: true` (#2997): việc opt-out
  đó sẽ đi tiếp xuống nhánh khóa theo từng model (một sự đánh đổi đã được
  ghi tài liệu — xem chú thích trong code phía trên nhánh này).
- **Định tuyến combo trong cùng một request** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): cùng cơ chế bảo vệ đó đánh dấu
  kết nối vào tập hợp trong bộ nhớ `exhaustedConnections`, được khóa theo
  `${provider}:${connectionId}`. Điều này chỉ bỏ qua một target còn lại TRONG
  CÙNG REQUEST mà _bản thân nó đã mang chính xác `connectionId` đó_ trên đối
  tượng target của riêng nó (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` trước lần tra cứu `exhaustedConnections`) — một combo
  kiểu danh sách model thông thường, trong đó các target anh em không mang
  `connectionId` cố định nào của riêng mình và một kết nối chỉ được phân giải
  theo từng lần dispatch từ header `X-OmniRoute-Selected-Connection-Id`
  của response, sẽ không bao giờ khớp với khóa đó. Đối
  với trường hợp phổ biến đó, sự bảo vệ thực sự chống lại việc một chặng (leg)
  còn lại tái sử dụng tài khoản vừa bị kiệt KHÔNG phải là Set này — mà là lớp
  persistence ở trên (`rateLimitedUntil` của kết nối lúc này đã nằm ở tương lai)
  kết hợp với chính cơ chế bảo vệ này triệt tiêu `transientRateLimitedProviders`
  cho lỗi đó (xem "Thiết kế hai giai đoạn" và chú thích trong code trên nhánh
  `isAgentrouterConnectionQuotaScope` trong `targetExhaustion.ts`): khi Set đó
  không được đánh dấu, cơ chế force-allow `allowRateLimitedConnection` của
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sẽ KHÔNG
  kích hoạt cho các chặng còn lại của provider, vì vậy bộ lọc `rateLimitedUntil`
  trong quá trình chọn credential (`src/sse/services/auth.ts:1238`) được tôn
  trọng như bình thường và một chặng còn lại sẽ hoặc chọn một kết nối
  agentrouter khác vẫn còn đủ điều kiện, hoặc thất bại với lỗi không có
  credential khả dụng — nó không ép quay lại kết nối mà nhánh này vừa đưa
  vào cooldown.

### Thiết kế hai giai đoạn: diễn giải lại mã trạng thái, rồi phân loại

Việc diễn giải lại mã trạng thái (`upstreamStatusRestatement.ts`) và các
quy tắc phân loại provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) là các registry riêng biệt, cả hai đều khóa theo
provider id và các dấu hiệu văn bản (text marker), nhưng chúng chạy ở những
vị trí khác nhau và phục vụ các mục đích khác nhau: việc diễn giải lại ghi đè
mã trạng thái HTTP từ sớm trong `chatCore.ts`; các quy tắc phân loại chọn
`reason` dự phòng và khóa `scope`
(`model` / `provider` / `connection`) bên trong `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Các quy tắc phân loại chỉ nhìn thấy **văn bản** lỗi đầy đủ (cần thiết để khớp
các dấu hiệu trong body như `额度不足`) đối với các provider được liệt kê trong
danh sách cho phép `FULL_TEXT_RULE_PROVIDERS` trong `providerErrorRules.ts` —
hiện tại chỉ có `"agentrouter"`. Đối với mọi provider **danh mục tích hợp sẵn**
khác, `checkFallbackError` chỉ đưa cho `getProviderErrorRuleMatch` lỗi có cấu
trúc (`{code, type}`), vốn đủ cho các quy tắc dựa trên header/status/code
nhưng không thấy được các dấu hiệu văn bản trong body.
Hàm trợ giúp `resolveRuleMatchBody()` thực hiện việc lựa chọn này: văn bản lỗi
đầy đủ cho các provider nằm trong danh sách cho phép, còn lại là lỗi có cấu
trúc. Việc thêm một provider **tích hợp sẵn** vào `FULL_TEXT_RULE_PROVIDERS`
là một opt-in tường minh theo từng provider — nó tồn tại để đường dẫn mặc định
của mọi provider không nằm trong danh sách vẫn giữ nguyên từng byte.

`scope` của một quy tắc (`model` / `provider` / `connection`) là một opt-in
riêng biệt với `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` chỉ đưa nó ra
ngoài dưới dạng `fallbackResult.ruleScope`, và các consumer hạ nguồn chỉ tôn
trọng nó như một thứ gì đó hơn là nhãn thông tin, đối với các provider trong
danh sách cho phép `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong cùng file (được
kiểm soát qua `honorsRuleLockScope()` — hiện nay chỉ có `"agentrouter"`).
Xem "Lỗi quota đã diễn giải lại" ở trên để biết một kết quả khớp
`scope: "connection"` thực sự làm gì khi một provider đã nằm trong danh sách
cho phép đó.

**#11104 — các quy tắc do người vận hành khai báo sẽ bỏ qua cả hai danh sách
cho phép.** Người vận hành có thể khai báo một quy tắc theo từng provider tại
runtime thông qua `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mà không cần chỉnh sửa file này. Việc kiểm soát một quy tắc của người vận hành
sau `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — các danh
sách cho phép vốn nhằm bảo vệ hành vi **mặc định** của các quy tắc danh mục
tích hợp sẵn — sẽ khiến cơ chế settings trở nên vô dụng cho mọi provider
ngoại trừ những provider đã được liệt kê ở đó, vì việc khai báo quy tắc bản
thân nó đã là opt-in tường minh của người vận hành. `resolveRuleMatchBody()`
và `honorsRuleLockScope()` đều kiểm tra `hasOperatorRuleForProvider()` trước:
một provider có quy tắc của người vận hành sẽ nhận được văn bản lỗi thô và có
`scope` đã khai báo được tôn trọng, bất kể nó có xuất hiện trong bất kỳ danh
sách cho phép nào hay không.

**Khiếm khuyết đã biết — `providerRuleRegistry` không bao giờ được tham khảo
cho HTTP 400.** Nhánh `BAD_REQUEST` của `checkFallbackError` phân loại status
400 hoàn toàn thông qua các mảng mẫu (pattern) của riêng nó
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, v.v. trong
`accountFallback.ts`) và trả về trước khi nhánh
`configuredRule`/`getProviderErrorRuleMatch` phía trên nó được chạm tới.
Một quy tắc danh mục tích hợp sẵn (hoặc quy tắc của người vận hành) với
`status: 400` là hợp lệ về cú pháp nhưng sẽ không bao giờ được kích hoạt.
Hiện tại không có quy tắc nào nhắm tới 400, vì vậy không có gì trong
production bị ảnh hưởng — nhưng một quy tắc 400 trong tương lai cần phải
chỉnh sửa nhánh này trước, đây là một thay đổi lớn hơn so với việc thêm một
quy tắc (nó phân loại lại 400 cho mọi provider đang dựa vào hành vi mảng
mẫu) và nằm ngoài phạm vi của một lần thêm quy tắc cho một provider đơn lẻ.

### Thêm gateway mới báo sai quota

1. Đăng ký một mảng rule trong `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Giữ `textMarkers`
   dành riêng cho từng provider; không bao giờ tái sử dụng các cụm tiếng
   Anh chung chung trùng với `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Tùy chọn đăng ký các rule phân loại trong
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) để chọn
   đúng phạm vi khóa (`connection` cho quota toàn tài khoản, `model` cho
   lỗi theo từng model). Bước này chỉ có hiệu lực trong production cho các
   provider mà rule của họ cần toàn bộ nội dung lỗi (body markers): thêm
   provider id vào `FULL_TEXT_RULE_PROVIDERS` trong cùng file — nếu không,
   `checkFallbackError` chỉ trao cho rule lỗi có cấu trúc `{code, type}`
   và một rule dựa trên nội dung body sẽ không bao giờ khớp với traffic
   thực tế. Các rule khớp thuần túy dựa trên `status`/`headers` (như của
   Opencode hay Minimax) không cần opt-in này. Riêng biệt, nếu rule khai
   báo `scope: "connection"` và mục đích là một cooldown toàn connection
   thực sự cộng với việc bỏ qua combo trong cùng request (chứ không chỉ là
   một nhãn mang tính thông tin), hãy thêm provider id vào
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong cùng file — đây chính là thứ
   kiểm soát việc sử dụng theo kiểu `isAgentrouterConnectionQuotaScope()`
   trong `markAccountUnavailable()` (`src/sse/services/auth.ts`) và
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); nếu không có nó,
   `scope` vẫn chảy qua `fallbackResult.ruleScope` nhưng không có gì xử lý
   nó.
3. Thêm unit test tương tự `tests/unit/upstream-status-restatement.test.ts`
   và `tests/unit/agentrouter-error-rules.test.ts` (bao gồm các guard
   not-permanent / not-creditsExhausted, và — nếu provider cần allowlist —
   một test khẳng định `resolveRuleMatchBody()` chỉ trả về toàn bộ nội dung
   cho riêng provider đó).

Không cần thay đổi gì với `chatCore.ts`, `classifyError`, hay combo.

#### Khóa theo bucket egress (#10880)

Các provider trong `EGRESS_BUCKETED_LOCK_PROVIDERS` (nhóm opencode) được
coi là upstream phân bucket theo IP (gói miễn phí của opencode bị bucket
theo IP, không phải theo tài khoản — xem #9611): một status-429 được phân
loại là `quota_exhausted` **hoặc** `rate_limit_exceeded` sẽ làm nguội
(cooldown) mọi connection thuộc nhóm được allowlist có IP egress gần nhất
được biết khớp với IP của connection bị lỗi, trước khi rotation có thể
thử chúng — tránh N-1 lệnh gọi upstream chắc chắn thất bại (cùng dạng với
#10460/#10525). `rate_limit_exceeded` được đưa vào một cách có chủ đích:
trên đường dẫn `markAccountUnavailable`, các rule riêng của opencode
không bao giờ khớp (không có headers/body nào được trao cho
`checkFallbackError`, opencode không nằm trong
`FULL_TEXT_RULE_PROVIDERS`), nên một lỗi 429 mà body chứa văn bản quota
theo subscription ("monthly usage limit reached") sẽ được phân loại là
`quota_exhausted` bởi fallback theo văn bản quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1 giờ)
trước khi rule `status_429` được xét đến — trong khi một lỗi 429 không
mang văn bản quota (rate limiting thuần túy) được phân loại qua rule
`status_429` thành `rate_limit_exceeded` và vẫn làm nguội nhóm IP. Với
một provider được allowlist, giới hạn tốc độ theo bucket IP cũng là tín
hiệu tương đương quota đã cạn. Những giới hạn thực tế:

- **Best-effort**: khóa phân giải `egress_ip` được biết đến gần nhất của kết nối
  từ `proxy_logs` (cửa sổ 24 giờ, đồng bộ, không cache). Cache nguội (egress
  IP chưa từng được thăm dò) hoặc không có hàng nào → kết nối bị lỗi vẫn được
  nhánh đưa vào cooldown (ghi nhận như hiện nay), chỉ là không có sibling nào
  bị khóa.
- **Không bao giờ terminal**: cooldown là một cửa sổ hạn ngạch tự gia hạn
  (`testStatus: "unavailable"`); trạng thái vĩnh viễn không bao giờ được suy ra
  từ một tín hiệu cấp IP. Các kết nối `disableCooling` bỏ qua hoàn toàn nhánh
  này.
- **Độ mịn khóa thay đổi đối với nhóm được allowlist**: đây là một thay đổi về
  phạm vi, không chỉ là tối ưu hóa sibling. opencode là một provider
  `passthroughModels`, nên trước nhánh này, một lỗi 429 tạo ra khóa theo từng
  MODEL; giờ đây nó tạo ra cooldown ở mức kết nối — kể cả đối với người vận
  hành chạy một kết nối duy nhất mà không có sibling nào cả. Đó chính là độ mịn
  mà bảng quy tắc của opencode đã khai báo là đúng (`scope: "connection"`,
  `providerErrorRules.ts`), nhưng cho đến nay chưa từng được tôn trọng vì
  opencode không nằm trong `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Nhánh này tự ghi
  cooldown + `backoffLevel` của kết nối bị lỗi, tương tự nhánh agentrouter có
  phạm vi theo kết nối, rồi trả về — khối khóa theo model và đường xử lý
  generic bên dưới không bao giờ được chạm tới.
- **Bao gồm cả combo**: giống như nhánh agentrouter, phạm vi này cố tình bỏ qua
  việc hạ cấp `persistUnavailableState`/`isCombo` mà phía gọi combo áp dụng cho
  lỗi 429. Khóa theo từng model không phải là một dạng yếu hơn của phạm vi này,
  mà là sai đơn vị: nó không nói lên điều gì về IP đã cạn kiệt, nên vòng xoay
  combo sẽ tiếp tục đốt một lần gọi chắc chắn thất bại cho mỗi sibling.
- **An toàn sibling**: một sibling đã ở trạng thái terminal
  (banned/credits_exhausted) hoặc đang trong một cooldown dài hơn sẽ không bao
  giờ bị ghi đè.
- **Allowlist khép kín**: việc mở rộng `EGRESS_BUCKETED_LOCK_PROVIDERS` là một
  quyết định rõ ràng của owner; không có wiring generic nào (pattern
  #10334/#10419). Truy vấn sibling bind cùng allowlist đó thay vì lặp lại nó
  dưới dạng một literal SQL, nên việc mở rộng nó vẫn chỉ là thay đổi một dòng.
- **Xoay egress IP, cả hai chiều**: cửa sổ tra cứu (24 giờ) rộng hơn nhiều so
  với TTL của cache egress-IP (5 phút), nên "IP được biết gần nhất" là lịch sử,
  không phải trạng thái hiện tại. Nếu proxy của một kết nối đã xoay trong cửa
  sổ đó, khóa có thể **bỏ sót** một IP thực sự được dùng chung (IP được ghi lại
  là IP mới, chưa cạn kiệt) — và đối xứng, nó có thể **đưa vào cooldown một
  sibling vốn đã xoay ra** khỏi IP cạn kiệt đó. Trường hợp thứ hai khiến
  sibling đó mất một cửa sổ cooldown; cả hai đều là những giới hạn best-effort
  được chấp nhận của một phép tra cứu dựa trên lịch sử.
- **Chi phí**: hai lượt quét có giới hạn trên `proxy_logs` (lọc theo cửa sổ qua
  `idx_pl_timestamp`), chỉ xảy ra với tần suất của lỗi 429. Không có index mới
  (migration 134 YAGNI). Đã đo trên một bản sao DB có lưu lượng thật với kích
  thước vừa phải; một instance có thông lượng cao sẽ giữ số hàng nhiều hơn
  theo tỷ lệ trong cùng cửa sổ đó.

---

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
