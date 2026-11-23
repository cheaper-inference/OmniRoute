# Guardrails (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Nguồn chuẩn:** `src/lib/guardrails/`
> **Cập nhật lần cuối:** 2026-08-29 — v3.8.51 (nguồn gốc bản chép lời Video Bridge do bên gọi khai báo,
> chưa được máy chủ xác minh — đã làm rõ theo #11661)

Các guardrail thực thi những phép biến đổi về an toàn, chính sách và nội dung tại ranh giới
giữa OmniRoute và các nhà cung cấp thượng nguồn. Mỗi guardrail có thể kiểm tra (và
tùy chọn từ chối, biến đổi hoặc chú thích) payload yêu cầu (`preCall`) và
phản hồi thượng nguồn (`postCall`).

Hệ thống hoạt động theo cơ chế **fail-open**: nếu một guardrail phát sinh lỗi trong khi thực thi, registry
sẽ ghi lại lỗi và tiếp tục với guardrail tiếp theo thay vì làm yêu cầu
thất bại. Việc chặn là một quyết định rõ ràng (`block: true`), không bao giờ là sự cố ngoài ý muốn.

## Các cơ chế bảo vệ tích hợp sẵn

Registry tự động nạp sáu cơ chế bảo vệ theo thứ tự ưu tiên khi import
(xem `registry.ts` → `registerDefaultGuardrails()`):

| Độ ưu tiên | Tên                 | Giai đoạn      | Tệp                   |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Số ưu tiên thấp hơn sẽ chạy **trước**.

### Cầu nối thị giác (`visionBridge.ts`) — Cầu nối phương thức PR-1

Chặn các yêu cầu chứa hình ảnh được gửi đến **các mô hình không hỗ trợ thị giác** và
chuyển hướng toàn bộ yêu cầu đến một mô hình hỗ trợ thị giác hoặc thay thế các phần
hình ảnh bằng mô tả văn bản do một mô hình thị giác có thể cấu hình tạo ra trước
lời gọi thượng nguồn. Điều này cho phép các nhà cung cấp chỉ hỗ trợ văn bản xử lý
các payload đa phương thức một cách minh bạch.

Luồng:

1. Bỏ qua nếu mô hình đích đã hỗ trợ thị giác (trừ khi mô hình đó xuất hiện trong
   danh sách buộc sử dụng cầu nối `isVisionBridgeForcedModel`).
2. Trích xuất các phần hình ảnh qua `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), hàm này ủy quyền cho **bộ phát hiện phương tiện
   hợp nhất** `detectMediaParts()` trong `open-sse/utils/mediaParts.ts` — nguồn
   sự thật duy nhất được dùng chung với bộ lọc tương thích combo.
   Việc trích xuất chỉ cho phép các phần cấp cao nhất có hình dạng mà
   `replaceImageParts` có thể chèn trở lại (hợp đồng trích xuất↔thay thế): OpenAI
   `image_url`, `source.type:"base64"` dạng base64 của Anthropic, URL Anthropic
   `source.type:"url"` và `input_image` của Responses API. Các kết quả khớp lồng
   nhau và các hình dạng chỉ có chỉ báo là dữ liệu dành cho bộ lọc combo và
   không bao giờ được trích xuất.
   Bỏ qua nếu không tìm thấy phần nào.
3. Phân giải cấu hình thời gian chạy qua `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): các khóa cài đặt
   `modalityBridge*` mới được ưu tiên; các khóa `visionBridge*` cũ vẫn là một
   **phương án dự phòng trong một chu kỳ** (cửa sổ khôi phục). Bỏ qua trước khi
   duyệt bất kỳ phương tiện nào nếu cầu nối bị vô hiệu hóa.
4. Bộ chọn chế độ (`modalityBridgeVisionMode`, xem bảng bên dưới) quyết định
   chuyển hướng hay mô tả. Chuyển hướng trả về `modifiedPayload` với chỉ `model`
   được hoán đổi, cùng metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Nhánh mô tả: giới hạn số hình ảnh ở `maxImages`, tạo prompt nhận biết tác vụ,
   tham khảo bộ nhớ đệm mô tả, gọi mô hình thị giác **song song**
   (`Promise.allSettled`) và chèn các phần văn bản `[Image N]: <description>`
   vào vị trí tương ứng. Một lần mô tả thất bại sẽ trả về `null` và phần hình
   ảnh gốc được **giữ nguyên** (#4012) — ngoại trừ trên nhánh mô tả combo khi
   mọi lần mô tả đều thất bại, trong trường hợp đó một thượng nguồn đã được xác
   nhận là không hỗ trợ thị giác sẽ nhận phần giữ chỗ
   `(unavailable — no vision-capable provider connected)` thay thế (#8430).
6. Trả về `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Bộ chọn chế độ (`modalityBridgeVisionMode`)

| Chế độ     | Mặc định | Hành vi                                                                                                                                                                                                                                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔        | Heuristic cũ, không thay đổi (#6640/#7204): các mô hình không phải combo/`auto/` được chuyển hướng đến mô hình thị giác tốt nhất, trừ khi mô hình gốc đã có thông tin xác thực khả dụng (khi đó sẽ mô tả); các đích combo luôn mô tả.                                                                        |
| `describe` |          | Luôn mô tả — khối chuyển hướng bị bỏ qua hoàn toàn; mô hình do người dùng chọn luôn trả lời.                                                                                                                                                                                                                 |
| `reroute`  |          | Buộc chuyển hướng: cơ chế bảo vệ giữ lại mô hình có thông tin xác thực bị bỏ qua. Cơ chế bảo vệ thông tin xác thực của **đích** chuyển hướng vẫn được áp dụng — khi không có đích thị giác khả dụng, yêu cầu sẽ chuyển sang mô tả để hình ảnh thô không bao giờ đến được backend chỉ hỗ trợ văn bản (#8430). |

Các chế độ bắt buộc đoản mạch **trước khi** heuristic tự động chạy; hành vi
`auto` giống từng byte với cơ chế bảo vệ trước PR-1.

#### Phạm vi khóa API (`visionBridgeKeyScope.ts`)

Khi khóa API của bên gọi hạn chế `allowedConnections`, các nhóm hạn ngạch
(`allowedQuotas`) hoặc mô hình (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), cầu nối chỉ
chọn các mô hình chuyển hướng và mô tả mà khóa được phép sử dụng, trên các kết
nối mà khóa được phép sử dụng. Sau đó, lời gọi mô tả luôn đi qua vòng lặp nội bộ
OmniRoute với header `x-omniroute-self-loop-key-id`, để yêu cầu trò chuyện tiếp
nhận thực thi lại chính sách kết nối và mô hình của khóa đó.
`enforceApiKeyPolicy()` chỉ tuân theo header đó khi được dùng cùng bearer của
vòng lặp nội bộ, vì vậy nó chỉ có thể thu hẹp quyền truy cập, và một id không
phân giải được sẽ bị từ chối.

Nếu khóa không được phép dùng bất kỳ mô hình thị giác nào, nhánh mô tả sẽ không
can thiệp và yêu cầu được chuyển tiếp mà không thay đổi, cùng hành vi mở khi lỗi
như một cơ chế bảo vệ bị vô hiệu hóa (metadata
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Các yêu cầu không có khóa và các khóa không có những hạn chế này hoạt động
chính xác như trước đây.

#### Prompt mô tả nhận biết tác vụ (`modalityBridgeVisionTaskAware`)

Mặc định là **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) nối thêm
nội dung của **tin nhắn người dùng cuối cùng** (được cắt còn 500 ký tự) vào prompt
mô tả cơ sở, hướng phần mô tả theo đúng nội dung người dùng thực sự yêu cầu
(theo mẫu codex-vision-proxy) và yêu cầu mô hình thị giác chép lại văn bản nhìn
thấy được. Khi tắt cờ này — hoặc không có văn bản của người dùng — prompt cơ sở
được sử dụng mà không thay đổi.

Yêu cầu tương thích OpenAI của vòng lặp tự mô tả (`callVisionModelSingle()`
trong `visionBridgeHelpers.ts`) luôn yêu cầu `image_url.detail: "high"` —
vô điều kiện, đối với mọi trình gọi/nhà cung cấp, không phụ thuộc vào bất kỳ tín
hiệu nào từ máy khách. Việc lấy mẫu ở mức chi tiết thấp làm giảm độ chính xác OCR
cho chính tác vụ chép lại văn bản mà prompt này yêu cầu, vì vậy bản thân lệnh gọi
mô tả luôn yêu cầu mức chi tiết cao, bất kể mức chi tiết mà yêu cầu đầu vào ban
đầu đã sử dụng. Điều này chỉ ảnh hưởng đến phần thân yêu cầu mô tả nội bộ; nó
không thay đổi cách OmniRoute chuyển tiếp `image_url.detail` của chính trình gọi
trên yêu cầu chính — giá trị mặc định đó được áp dụng riêng và chỉ dành cho các
máy khách OpenCode được phát hiện, trong `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Nhánh định dạng dây Anthropic của
vòng lặp tự mô tả không có trường `detail` và không bị ảnh hưởng bởi bất kỳ giá
trị mặc định nào trong hai giá trị trên.

#### Giới hạn đầu ra mô tả (`modalityBridgeVisionMaxChars`)

| Khóa                           | Mặc định | Phạm vi            |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` hoặc 100–50000 |

`0` (mặc định) có nghĩa là **không giới hạn** — phần mô tả do
`callVisionModel()` trả về được chuyển tiếp mà không sửa đổi, duy trì hành vi
hiện có. Bất kỳ giá trị nào trong phạm vi 100–50000 sẽ cắt ngắn phần mô tả với
hậu tố `…` trước khi phần mô tả được chèn trở lại dưới dạng
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` trong
`src/lib/guardrails/visionBridge.ts`). Hãy tăng giá trị này cho các tác vụ OCR
có nhiều chi tiết, nơi mô hình hạ nguồn cần toàn bộ phần chép lại; giảm giá trị
này để giới hạn mức sử dụng token đối với các mô hình thị giác dài dòng.
Trường trên bảng điều khiển nằm trong bảng Nâng cao của thẻ Vision
(`modality-bridge-max-chars` trong `ModalityBridgeVisionTab.tsx`) và điều chỉnh
mọi giá trị từ 1 đến 99 lên mức sàn 100, đồng thời giữ nguyên giá trị `0` được
chỉ định rõ ràng — bản thân `0` là một giá trị Zod hợp lệ
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), chứ không chỉ
đơn thuần là giá trị mặc định "chưa đặt".

#### Bộ nhớ đệm mô tả (`modalityBridge/bridgeCache.ts`)

Bộ nhớ đệm LRU + TTL trong bộ nhớ, được dùng chung trên toàn tiến trình.
Khóa = `sha256(imageRef + composedPrompt + configuredBridgeModel)` với cơ chế
đóng khung bằng tiền tố độ dài (không xảy ra va chạm ranh giới trường). Thành
phần mô hình là mô hình cầu nối **được cấu hình**, không phải mô hình thực sự đã
trả lời — `callVisionModel` có thể chuyển sang phương án dự phòng ở nội bộ, và
việc tạo khóa theo từng lần thử sẽ làm phân mảnh bộ nhớ đệm. Các lần mô tả thất
bại không bao giờ được lưu vào bộ nhớ đệm. Cài đặt:

| Khóa                            | Mặc định | Phạm vi |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Chuẩn hóa hình ảnh từ xa (tự mô tả vòng lặp/tìm nạp base64)

Khi cầu nối tự tìm nạp một hình ảnh **từ xa** — lệnh tự gọi mô tả Anthropic và
phép chuyển đổi base64 theo định dạng dây claude
(`ensureBase64ImagesForClaudeWire`), cả hai đều thông qua
`fetchRemoteImageAsDataUri()` trong `visionBridgeHelpers.ts` — URI dữ liệu thu
được sẽ được truyền qua `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) trước khi được nhúng vào yêu cầu gửi đến mô
hình thị giác. Các hình ảnh quá lớn được thu nhỏ để có **cạnh dài 2048px** (khớp
với giới hạn đổi kích thước mà OpenAI/Anthropic đã áp dụng ở phía máy chủ), giúp
giảm số byte tải lên/độ trễ mà không thay đổi những gì mô hình thị giác nhìn
thấy. Việc đổi kích thước sử dụng `sharp`, được tải bằng phép nhập động: trên nền
tảng mà tệp nhị phân gốc của nó không tải được, `normalizeDataUri()` **không bao
giờ ném lỗi** — nó quay về chuyển tiếp nguyên trạng các byte ban đầu, vì vậy
luồng mô tả/chuyển đổi base64 luôn tiếp tục hoạt động. Các byte không phải hình
ảnh (một lần tìm nạp không trả về hình ảnh có thể giải mã) cũng được chuyển tiếp
nguyên trạng. Việc chuẩn hóa này chỉ áp dụng cho các hình ảnh mà cầu nối tìm nạp
cho lệnh tự gọi của chính nó — nó không bao giờ được áp dụng cho tải trọng chuyển
tiếp thô của trình gọi, phù hợp với nguyên tắc chỉ sửa đổi khi có sự chủ động
chọn dùng (Quy tắc cứng #20).

#### Lược đồ cài đặt + di chuyển

Các khóa `modalityBridge*` mới được Zod xác thực trong `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, bộ ba `modalityBridgeCache*` và nhóm
`modalityBridgeAudio*` được Audio Bridge sử dụng. Bản di chuyển
`141_modality_bridge_settings.sql` sao chép các giá trị `visionBridge*` cũ hiện
có sang các khóa mới tương ứng (có tính lũy đẳng, không bao giờ ghi đè giá trị
`modalityBridge*` do người vận hành đặt); các khóa cũ vẫn được chấp nhận làm
phương án đọc dự phòng trong một chu kỳ phát hành.

#### Tiêu đề minh bạch + thống kê

Các phản hồi được biến đổi bằng mô tả mang
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(được tạo bởi `buildModalityBridgeHeader()` trong
`modalityBridge/bridgeStats.ts`, được gắn bởi `withModalityBridgeHeader()` trong
`src/sse/handlers/chatHelpers.ts`). Các yêu cầu được định tuyến lại **không** có
tiêu đề này — tải trọng không bị thay đổi và việc hoán đổi mô hình đã hiển thị
trong trường `model` của phần thân phản hồi.

`GET /api/modality-bridge/stats` (xác thực quản trị, cùng cấp với
`GET /api/settings`) trả về các bộ đếm trong bộ nhớ theo từng phương thức
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` cho `vision`, `audio` và
`video`. `averageLatencyMs` sử dụng `latencySamples` làm mẫu số, không phải tất
cả các lần thử; một thao tác không có dữ liệu thời gian sẽ không tạo ra một mẫu
giả có thời lượng 0 mili giây. `bridged` vẫn là bí danh tương thích ngược cho
các lượt chuyển đổi thành công; các lần thử thất bại không làm tăng giá trị này.
Theo thiết kế, các bộ đếm được đặt lại khi tiến trình khởi động lại
(đây là dữ liệu đo từ xa, không phải dữ liệu kế toán).

#### Cấu hình bảng điều khiển

Trang bảng điều khiển chuyên biệt là
`/dashboard/settings/modality-bridge`. Các tab `Vision`, `Audio` và
`Video` có thể được truy cập trực tiếp qua URL và giữ nguyên các tham số truy vấn
khi chuyển đổi giá trị `tab`.
Tab Vision cung cấp các tùy chọn bật/tắt, chế độ, lựa chọn mô hình (bao gồm tùy
chọn tự động mặc định), lời nhắc theo tác vụ, các giới hạn nâng cao về thời gian
chờ/hình ảnh/độ dài mô tả/bộ nhớ đệm, các bộ đếm thời gian chạy và một yêu cầu mẫu
được bảo vệ. Tab Audio cũng hoạt động đầy đủ: cung cấp tùy chọn bật/tắt, bộ chọn
mô hình chỉ dành cho STT với tùy chọn Auto, các giới hạn thời gian chờ/độ dài clip
tối đa, các bộ đếm âm thanh và một bài kiểm tra mẫu `input_audio`. Tab Video có
đầy đủ chức năng: báo cáo trạng thái thời gian chạy của FFmpeg/ffprobe — một trong
bốn trạng thái giao diện người dùng rõ ràng (`unknown` khi quá trình thăm dò đang
diễn ra hoặc không thể hoàn tất, `restricted` trên máy chủ bảng điều khiển không
phải loopback nơi quá trình thăm dò bị bỏ qua ở phía máy khách, `unavailable` sau
khi đã thăm dò và xác nhận là không có, hoặc `available` kèm theo các phiên bản
FFmpeg/ffprobe) — lưu các giới hạn bật/mô hình/khung hình/video/thời gian chờ, lọc
bộ chọn mô hình để chỉ hiển thị các mô hình hỗ trợ thị giác và cung cấp các bộ
đếm video.

Thẻ Vision Bridge trước đây trong phần cài đặt AI giờ là một liên kết tương thích
đến trang mới; thẻ này không còn sở hữu một bản sao thứ hai của biểu mẫu. Media
Providers cũng liên kết các quy trình Image-to-Text và Speech-to-Text đến các tab
Modality Bridge tương ứng mà không xóa sân chơi Speech-to-Text hiện có.

**Bỏ qua kiểm tra tiếp nhận cho self-loop:** khi lệnh gọi mô tả được định tuyến
qua `/v1` self-loop của chính OmniRoute (mô hình nhà cung cấp không tiêu chuẩn),
yêu cầu con sẽ gửi `x-omniroute-admission-bypass: internal` và được xác thực bằng
thông tin xác thực self-loop đã phân giải — sentinel cục bộ `sk_omniroute` ở chế
độ cục bộ, hoặc khóa môi trường `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` do người
vận hành cấu hình (#1350), để các bản triển khai `REQUIRE_API_KEY=true` vẫn có thể
thực hiện lệnh gọi mô tả. Việc bỏ qua chỉ được chấp nhận đối với chính xác các
thông tin xác thực đó, vì vậy máy khách bên ngoài không thể dùng header này để bỏ
qua bước tiếp nhận.

Các giá trị mặc định cũ nằm trong `src/shared/constants/visionBridgeDefaults.ts`;
các giá trị mặc định mới về chế độ/nhận biết tác vụ/bộ nhớ đệm và trình phân giải
cài đặt nằm trong `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail cung
cấp tùy chọn hàm khởi tạo `deps` để các bài kiểm thử có thể chèn các phần triển
khai `getSettings` và `callVisionModel` giả.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Chặn các yêu cầu chat chứa âm thanh trước khi chúng đến một đích không được xác
định là có khả năng chấp nhận đầu vào âm thanh. Nó không bao giờ định tuyến lại
yêu cầu chat: các phần âm thanh được phiên âm thông qua endpoint multipart tương
thích OpenAI hiện có, và mô hình chat đã chọn tiếp tục xử lý với các bản phiên âm
dạng văn bản.

Luồng xử lý:

1. Phân giải `supportsAudio` thông qua `getResolvedModelCapabilities()`. Siêu dữ
   liệu tường minh từ sổ đăng ký nhà cung cấp được ưu tiên, tiếp theo là siêu dữ
   liệu mô hình tĩnh, rồi đến `modalities_input` đã đồng bộ. Một danh sách đầu vào
   đã khai báo nhưng không chứa `audio` sẽ cho kết quả `false`; nếu không có bằng
   chứng nào về khả năng hỗ trợ thì giá trị vẫn là `null`. Cả `false` và `null`
   đều kích hoạt bridge theo hướng thận trọng, còn `true` sẽ bỏ qua bridge.
2. Phân giải các cài đặt `modalityBridgeAudio*` và trích xuất các phần âm thanh
   cấp cao nhất có thể được nối ghép từ mọi tin nhắn thông qua bộ dò dùng chung
   `detectMediaParts()`. Các định dạng truyền dẫn được hỗ trợ là `input_audio`
   của OpenAI, `audio_url` và `source.media_type: "audio/*"`. Âm thanh lồng nhau
   được phát hiện để định tuyến nhưng không bị loại bỏ bởi đường xử lý nối ghép.
   Khối lượng công việc bị giới hạn bởi `modalityBridgeAudioMaxClips`; các phần
   phía sau vẫn được giữ nguyên.
3. Tuân theo `provider/model` đã cấu hình, hoặc để `selectAudioBridgeModel()` duyệt
   `AUDIO_TRANSCRIPTION_PROVIDERS` theo thứ tự danh mục ổn định và chọn mô hình
   đầu tiên có thông tin xác thực nhà cung cấp đang hoạt động và sử dụng được.
4. `callAudioTranscription()` chuyển đổi âm thanh base64/data-URI thành một `file`
   multipart, hoặc tải xuống `audio_url` từ xa thông qua cơ chế bảo vệ truy cập ra
   ngoài chỉ dành cho địa chỉ công khai, có ghim DNS và giới hạn 25 MB. Sau đó,
   hàm gửi POST với tệp và mô hình đã chọn đến self-loop cục bộ
   `/v1/audio/transcriptions`, được xác thực bằng `resolveSelfLoopBearer()`. Tuyến
   phiên âm hiện có thực hiện quy trình tra cứu thông tin xác thực, xử lý thời gian
   tạm ngưng/giới hạn tốc độ và điều phối nhà cung cấp như bình thường.
5. Các lệnh gọi thành công thay thế phần tương ứng bằng
   `[Audio N]: <transcript>`. Các lệnh gọi chạy với `Promise.allSettled`: một lỗi
   riêng lẻ sẽ giữ nguyên phần âm thanh ban đầu đó (hợp đồng #4012). Nếu mọi lệnh
   gọi đều thất bại và đích đã được chứng minh có `supportsAudio === false`, các
   phần sẽ trở thành
   `[Audio N]: (unavailable — no STT provider connected)` (hợp đồng #8430). Đối
   với đích chưa xác định (`null`), kết quả thất bại toàn bộ vẫn được giữ nguyên.
   Một đích đã được chứng minh là chỉ hỗ trợ văn bản và không có thông tin xác
   thực STT khả dụng sẽ nhận cùng placeholder tường minh này mà không thực hiện
   lệnh gọi mạng.

Các bản phiên âm thành công sử dụng bộ nhớ đệm LRU/TTL Modality Bridge dùng chung
toàn tiến trình. Khóa kết hợp tham chiếu âm thanh, nhãn thao tác ổn định
`audio-transcription` và mô hình STT đã chọn; các lỗi không bao giờ được lưu vào
bộ nhớ đệm. Các lần thử âm thanh cập nhật những bộ đếm dùng chung `bridged`,
`cacheHits`, `failures` và `lastUsedAt`. Các phản hồi đã được chuyển đổi chứa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; các yêu cầu
không thay đổi sẽ không nhận phân đoạn Audio Bridge.

Các cài đặt thời gian chạy được lưu trong DB và xác thực bằng Zod:

| Khóa                          | Mặc định | Phạm vi             |
| ----------------------------- | -------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                   |
| `modalityBridgeAudioModel`    | `""`     | Tự động hoặc ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                |

Bộ nhớ đệm dùng chung vẫn được kiểm soát bởi `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` và `modalityBridgeCacheMaxEntries`.

### Cầu nối video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chặn các phần video cấp cao nhất trong `messages` của Chat Completions và `input`
của Responses API trước khi gọi một đích không được biết là có hỗ trợ video gốc.
Các định dạng được hỗ trợ gồm `input_video`, `video_url`, `video_source`, URL HTTPS
và URI dữ liệu `data:video/*;base64,...`. Tên tệp thuần túy trong văn bản không được
coi là video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) đảm nhiệm việc duyệt yêu cầu,
kiểm tra khả năng/chính sách, tổng hợp theo từng yêu cầu và tải trọng phản hồi.
Công việc theo từng video — thu nhận, bộ nhớ đệm toàn bộ kết quả, mô tả chuỗi
khung hình (kết hợp mọi bản chép lời âm thanh do bên gọi khai báo), cùng
số liệu/hủy/dọn dẹp theo từng lần thử — được ẩn phía sau `processVideoPart` trong
`videoBridgePipeline.ts`, được gọi một lần cho mỗi phần video trong vòng lặp của `preCall`.
Mô-đun đó cũng định nghĩa các ranh giới cổng tường minh `VideoMediaBrokerPort`
(thu nhận byte và trích xuất các khung hình được lấy mẫu), `VideoAudioTranscriptionPort`
(kết hợp bản chép lời âm thanh do bên gọi khai báo với các chú thích được lấy mẫu) và
`VideoDrilldownPort` (ranh giới lưu trữ truy sâu khung hình; chưa được kết nối
vào `processVideoPart` — hiện chỉ có tuyến `/api/modality-bridge/video/drilldown`
riêng biệt ghi các mục truy sâu).

Đường dẫn yêu cầu `/v1` công khai không bao giờ nhập hoặc gọi một tiến trình con. Video
từ xa được tải xuống với giới hạn 50 MiB; video base64 nội tuyến có giới hạn thận trọng
là 36 MiB sau khi giải mã cho mỗi video để phần bao gói mô hình/thông điệp/đóng khung
có thể nằm trong giới hạn tiếp nhận yêu cầu JSON công khai là 50 MiB. Độ dài nội tuyến
và kích thước ước tính sau khi giải mã được kiểm tra trước khi cấp phát. HTTPS là
bắt buộc đối với URL từ xa ban đầu và mọi chuyển hướng, sử dụng cơ chế bảo vệ đầu ra
chỉ-công-khai hiện có với tính năng ghim DNS. Sau đó, các byte đi qua đúng ranh giới
broker nội bộ `POST /api/modality-bridge/video/extract`. Tuyến đó vừa là
`LOCAL_ONLY` vừa là `SPAWN_CAPABLE`, chỉ chấp nhận yêu cầu loopback đáng tin cậy,
được xác thực theo từng tiến trình và không bao giờ chấp nhận URL, đường dẫn hệ thống
tệp, tệp thực thi hoặc danh sách đối số. Pipeline kích thước nội dung API và trình đọc
nội dung tăng dần của trình xử lý thực thi độc lập giới hạn đầu vào broker ở 50 MiB.
Hàng đợi có giới hạn của nó chạy mỗi lần một tác vụ trích xuất, cho phép bốn tác vụ
đang chờ và giới hạn tổng đầu vào đang chờ ở 100 MiB.

Bên trong broker, `ffprobe` đọc một tệp cục bộ riêng tư; danh sách định dạng cho phép
cố định loại trừ các định dạng danh sách phát và tệp kê khai. Đối với các vùng chứa
thuộc họ MOV được cho phép, các tham chiếu dữ liệu MOV bên ngoài mặc định vẫn bị vô
hiệu hóa và lệnh cố định không chủ động bật chúng. Cả `ffprobe` và `ffmpeg` đều sử dụng
danh sách trắng giao thức chỉ gồm `file`, một luồng, các mảng đối số cố định, không có
shell và các tệp thực thi được phân giải từ `PATH`. Các luồng ảnh bìa đính kèm không
phải là ứng viên có thể phát. Tất cả các luồng có thể phát phải đáp ứng các giới hạn,
và một luồng mặc định tường minh được ưu tiên trước phương án dự phòng có chỉ số thấp
nhất mang tính tất định. Video được giới hạn ở 600 giây, 8.192 pixel trên mỗi chiều và
33.554.432 pixel nguồn. FFmpeg lấy mẫu 1–16 khung hình JPEG tại điểm giữa, thu nhỏ cạnh
dài xuống tối đa 1.024 pixel mà không phóng to đầu vào nhỏ hơn và không bao giờ nhận
URL. Việc lấy mẫu mặc định là `uniform`. Các chính sách tùy chọn
`scene_aware` và `segment_aware` thử nghiệm thực hiện thêm một lượt FFmpeg cố định
trên luồng cục bộ đã được xác thực, chọn các dấu thời gian cảnh `showinfo` có giới hạn
và dự phòng theo cách tất định về cùng các điểm giữa đồng đều khi bộ phát hiện gặp lỗi,
hết thời gian chờ, đầu ra không đúng định dạng hoặc tập ứng viên trống. Chế độ nhận biết
phân đoạn phân bổ các mẫu điểm giữa theo tỷ lệ cho các khoảng cảnh đã được xác thực;
bằng chứng nhận biết phân đoạn và hành vi dự phòng được trình bày chi tiết bên dưới.
Giới hạn cứng 16 khung hình được áp dụng sau khi lựa chọn trong mọi chính sách. Khi một
yêu cầu nhận biết cảnh chỉ có ngân sách một khung hình, yêu cầu đó sử dụng điểm giữa
đồng đều của toàn bộ video đang hoạt động hoặc cửa sổ tiêu điểm và báo cáo
`policyEffective: uniform`: một khung hình cảnh được chọn duy nhất không thể bảo toàn
cả hai đầu thời gian. Bên gọi có thể tùy chọn cung cấp một cửa sổ tiêu điểm hữu hạn
(`start`/`end` giây); các giới hạn được thu hẹp theo thời lượng phương tiện, các cửa sổ
đảo ngược hoặc không hữu hạn bị từ chối và tất cả chính sách lấy mẫu chỉ được thực hiện
bên trong khoảng đã chuẩn hóa. Cửa sổ kết quả được đưa vào siêu dữ liệu lấy mẫu và
tiền tố mô tả không đáng tin cậy để các mô hình phía sau có thể phân biệt một đoạn trích
tập trung với toàn bộ dòng thời gian.

Tiêu điểm chú thích ngữ nghĩa là một thiết lập riêng biệt, tường minh. Chế độ phân tích
`full` mặc định duy trì lời nhắc khung hình hiện có và không bao giờ chuyển tiếp văn bản
yêu cầu tới mô hình chú thích. Trong chế độ `focused`, cầu nối chỉ đọc `text`/`input_text`
không trống mới nhất do người dùng tạo từ cùng vùng chứa Chat hoặc Responses, chuẩn hóa
nó thành NFC, thu gọn các ký tự điều khiển và khoảng trắng, đồng thời giới hạn ở 500 điểm
mã Unicode. Kết quả trống sẽ quay về đúng lời nhắc `full`. Một gợi ý có thể sử dụng được
tuần tự hóa dưới dạng JSON trong một khối ngữ cảnh người dùng không đáng tin cậy chuyên
biệt và chỉ có thể ưu tiên các chi tiết có thể quan sát được; nó không thể ghi đè cảnh
báo riêng về việc không làm theo các chỉ dẫn nhìn thấy hoặc nghe thấy trong phương tiện.
Tiêu điểm văn bản không bao giờ suy luận `start`/`end` hoặc thay đổi bộ lấy mẫu thời gian.

#### Bằng chứng phân đoạn cấu trúc FU-07

`segment_aware` sử dụng một lượt tiền phân tích có giới hạn trên luồng video cục bộ đã được xác thực. Chuỗi bộ lọc cố định trước tiên thu nhỏ video xuống chiều rộng tối đa 320 pixel, phát hiện các lần chuyển cảnh và khoảng thời gian đóng băng, sau đó lấy mẫu ở tốc độ 1 khung hình mỗi giây để đo độ mờ, độ chói trung bình và thông tin không gian/thời gian. Lượt này bị giới hạn ở 600 mẫu cấu trúc, một luồng FFmpeg/bộ lọc, cùng danh sách cho phép chỉ dành cho giao thức `file` và định dạng vùng chứa, giới hạn đầu ra tiến trình là 1 MiB, và tối đa 30 giây trong cơ chế hủy/thời hạn dùng chung của broker. Nó không bao giờ chấp nhận lệnh, bộ lọc, đường dẫn hoặc URL từ yêu cầu.

Các giá trị cấu trúc là bằng chứng lấy mẫu có tính xác định, không phải khả năng hiểu ngữ nghĩa video. Chúng không suy luận chủ thể, hành động, phụ đề, lời nói hoặc ý định của người dùng. Các ranh giới cảnh và khoảng đóng băng tạo thành các phân đoạn; mức độ bao phủ đóng băng, độ mờ, độ phơi sáng, chi tiết không gian và thay đổi theo thời gian chỉ tác động đến cách phân bổ ngân sách 1–16 khung hình hiện có. Một phân đoạn bị đóng băng hoàn toàn được giới hạn ở một khung hình, trong khi các phân đoạn không đóng băng cạnh tranh ngân sách còn lại. Khi số lượng ranh giới nhiều hơn số khung hình, độ bao phủ đồng đều trên dòng thời gian vẫn được duy trì để các lần cắt cảnh nhanh ở phần đầu không thể che khuất một phân đoạn dài ở cuối. Các ranh giới cảnh nằm trong độ phân giải phân tích 1 giây của một ranh giới đóng băng sẽ được hợp nhất.

Bộ lọc bị thiếu, bằng chứng sai định dạng/trống, lỗi bộ dò hoặc thời gian chờ tiền phân tích có giới hạn đều chuyển sang chính xác chính sách điểm giữa đồng đều. Việc người gọi hủy hoặc hết thời hạn của broker không chuyển sang chính sách dự phòng: điều đó chấm dứt tiến trình con đang chạy, ngăn việc trích xuất khung hình sau đó và cây thư mục tạm riêng tư được xóa trong `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` tạo các dữ liệu kiểm thử FFmpeg thực, có tính xác định, cho mức tiết kiệm số lần gọi tạo chú thích sau khi loại bỏ trùng lặp, phân bổ ngân sách cho chuyển động dày đặc, bằng chứng về độ mờ/độ phơi sáng/SI-TI, các lần cắt cảnh nhanh kèm đoạn cuối dài và các trường hợp dương tính giả do chuyển cảnh mờ dần. Tập lệnh ghi lại thời gian thực tế của quá trình tiền phân tích và, khi có `/usr/bin/time`, thời gian CPU của tiến trình con cùng mức RSS cao nhất. Các bước kiểm tra chất lượng của tập lệnh chỉ là các oracle cấu trúc. Chất lượng thực tế của mô hình tạo chú thích vẫn là `HOLD` vì bộ kiểm thử này không có điểm cuối được ủy quyền hoặc bộ đánh giá cố định. Mức tiết kiệm chi phí cũng vẫn là `HOLD`, trừ khi `--caption-cost-per-call-usd` cung cấp một ước tính dương rõ ràng về chi phí cho mỗi lần gọi; tập lệnh không bao giờ tự tạo ra bất kỳ kết quả nào trong hai loại này.

Mỗi khung hình được giới hạn ở 4 MiB, tổng tất cả khung hình thô ở 23 MiB và phản hồi broker được tuần tự hóa ở 32 MiB. Một thư mục tạm riêng tư được xóa trong `finally`. OmniRoute không đóng gói kèm FFmpeg và không chấp nhận đường dẫn tùy chỉnh đến tệp thực thi. Trước khi tạo chú thích, bridge áp dụng một lượt loại bỏ trùng lặp hình ảnh thận trọng: mỗi ảnh JPEG được thu nhỏ thành một bộ đệm thang độ xám 16×16 và chỉ được so sánh với khung hình gần nhất đã được giữ lại. Khi ngân sách chú thích được yêu cầu lớn hơn một khung hình, quá trình trích xuất cung cấp một nhóm ứng viên có giới hạn, tối đa gấp đôi ngân sách đó và không bao giờ vượt quá 16 khung hình. Giới hạn được yêu cầu chỉ được áp dụng sau khi loại bỏ trùng lặp; ứng viên được chọn đầu tiên và cuối cùng được giữ nguyên trong bước rút gọn cuối cùng khi ngân sách ít nhất là hai. Chính sách có phiên bản `grayscale-16x16-mean-cells-v2` sử dụng giá trị lớn hơn giữa độ chênh lệch độ chói trung bình và tỷ lệ các ô ảnh thu nhỏ có độ chênh lệch chuẩn hóa ít nhất là 0.05. Ngưỡng trùng lặp là hằng số 0.04, được chọn để đảm bảo tính dự đoán được thay vì được cung cấp dưới dạng một thiết lập lúc chạy. Tín hiệu phụ có độ tương phản cao này bảo toàn các chuyển động nhỏ và thay đổi văn bản hiển thị mà phép so sánh chỉ dựa trên giá trị trung bình có thể bỏ sót. Lỗi bộ so sánh hoặc bộ giải mã sẽ chuyển sang giữ lại độ bao phủ. Siêu dữ liệu đầu ra phân biệt các ứng viên đã trích xuất, các khung hình được sử dụng thành công và các bản trùng lặp hình ảnh đã bị loại bỏ.

Một phần video được đánh dấu rõ ràng có thể yêu cầu một bảng liên hệ có dấu thời gian. Bridge tạo một lưới JPEG tối đa 4 cột và 16 khung hình. Mỗi ô 512 pixel ghi cố định dấu thời gian nguồn vào một dải có độ tương phản cao ở phía dưới, đồng thời các dấu thời gian đó vẫn được lưu trong siêu dữ liệu văn bản để phục vụ việc liên kết và kiểm tra ở hạ nguồn. Ảnh JPEG hoàn chỉnh vẫn bị giới hạn ở 32 MiB. Nếu `sharp` không thể giải mã hoặc tổng hợp lưới, bridge sẽ chuyển sang các khung hình JPEG riêng lẻ; thao tác hủy từ máy khách vẫn được truyền qua thao tác tạo bảng.

Bằng chứng để đưa vào sử dụng chính thức được cố ý tách biệt khỏi phép đo hiệu năng vi mô tổng hợp. `scripts/perf/video-bridge-contact-sheet-eval.ts` định nghĩa một bộ kiểm thử A/B có lập phiên bản lược đồ dành cho các mô hình thị giác thực tương thích với OpenAI. Bộ kiểm thử đo số token do nhà cung cấp báo cáo, độ trễ đầu-cuối theo thời gian thực tế (bao gồm cả việc tổng hợp bảng), số lần gọi mô hình và mức độ giữ lại dữ kiện được định nghĩa trong bản kê khai. Phản hồi thô từ mô hình không được ghi vào báo cáo; chỉ các bản tóm lược SHA-256 và ID dữ kiện đã khớp được giữ lại. Bộ kiểm thử không thực hiện bất kỳ lệnh gọi mạng hoặc mô hình trả phí nào trừ khi truyền `--execute-real` và đã cấu hình `--model`, `OMNIROUTE_BASE_URL` cùng `OMNIROUTE_API_KEY`. Nếu không có lượt chạy thực rõ ràng đó, phán quyết ở dạng máy có thể đọc vẫn là `HOLD`; chỉ riêng các phép đo tải trọng/số lần gọi tổng hợp không được coi là bằng chứng để đưa vào sử dụng chính thức.

Người gọi có thể đính kèm một mảng `transcript.cues` tùy chọn vào một phần video được hỗ trợ khi họ đã có văn bản được căn chỉnh. Mỗi cue phải chứa `text`, một khoảng `start`/`end` hữu hạn nằm trong thời lượng đã thăm dò và một `source` thuộc danh sách cho phép (`client`, `embedded` hoặc `audio-bridge`); `confidence` mặc định là `1` và phải nằm trong khoảng từ `0` đến `1`. Các cue trùng khớp hoàn toàn sẽ được hợp nhất. OmniRoute không bao giờ khởi chạy quá trình phiên âm từ siêu dữ liệu này: các cue đã được xác thực được sao chép vào kết quả được mô tả cùng với nguồn, độ tin cậy và khoảng thời gian, đồng thời được hiển thị dưới dạng các quan sát không đáng tin cậy bên cạnh chú thích khung hình. Văn bản không hợp lệ, nằm ngoài phạm vi hoặc không có nguồn gốc sẽ bị từ chối thay vì được trộn vào luồng chú thích. Cả hai kênh bản phiên âm trong phần thân yêu cầu đều chuẩn hóa nguồn gốc được cung cấp thành `client`, bao gồm cả các nhãn `embedded` hoặc `audio-bridge` do chính người gửi tự xác nhận. Chỉ một adapter do máy chủ sở hữu mới có thể gán các nhãn đáng tin cậy đó thông qua đối số chỉ dùng trong mã `trustedSource`; một trường JSON trong yêu cầu không thể truyền tới đối số đó. Văn bản phiên âm vẫn là nội dung không đáng tin cậy bắt nguồn từ phương tiện, bất kể nguồn gốc của nó, và tuyệt đối không được dùng để quyết định việc ủy quyền.

Một trình gọi nâng cao có thể cung cấp một luồng `audioTranscript` cho cùng video;
luồng này được xem là văn bản do máy khách cung cấp, không phải bằng chứng về việc máy chủ đã phiên âm.
Điểm hợp nhất chạy các quan sát hình ảnh và âm thanh trong cùng
một thời hạn và tín hiệu hủy, sắp xếp chúng trên một dòng thời gian chung, gộp
các bản trùng lặp hoàn toàn và báo cáo kết quả một phần khi chỉ một bên thành công.
Một `audioTranscript` không hợp lệ sẽ hạ cấp thành kết quả một phần đó — phần mô tả
hình ảnh được giữ lại và nhánh âm thanh ghi nhận một mã lỗi đã được làm sạch —
thay vì khiến toàn bộ video thất bại. Trạng thái khả dụng của từng nhánh, cờ kết quả một phần
và các mã lỗi đã được làm sạch được giữ lại trong kết quả được mô tả, trong
siêu dữ liệu guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), trong siêu dữ liệu bộ nhớ đệm kết quả và trong các bộ đếm
hợp nhất của bridge. Đường dẫn Video Bridge mặc định không gọi chuyển giọng nói thành văn bản
hoặc tải xuống bản sao phương tiện thứ hai; nếu không có luồng tường minh đó, đường dẫn này vẫn
chỉ xử lý video.

**Lưu giữ bản chép lời (#12150 P1).** Điều này tự động áp dụng bất cứ khi nào
Video Bridge (bản thân là tính năng phải chủ động bật) kết xuất một cue bản chép lời — không có
cờ lưu giữ riêng. Khi một yêu cầu kết xuất bất kỳ cue bản chép lời nào (một
`transcript` do trình gọi khai báo hoặc một `audioTranscript` đã hợp nhất), guardrail đánh dấu yêu cầu đó là
`videoBridgeObserved` và tạo ra một bản sao đã biên tập của phần mô tả video —
một kết xuất giống hệt, trong đó phần nội dung văn bản tự do của mọi cue được thay thế bằng
`[redacted-video-transcript]`, được xây dựng bằng cách thay thế trường cue có cấu trúc
trước khi chuỗi được ghép lại (không bao giờ bằng cách phân tích văn bản đã được làm phẳng, vì vậy không có nội dung
cue nào — dù mang tính đối kháng hay thông thường, bao gồm cả nội dung chứa `]` như
`[inaudible]`/`[music]` — có thể còn sót lại). Nội dung yêu cầu trong nhật ký cuộc gọi được lưu bền vững
thay từng phần văn bản bắt nguồn từ video bằng bản sao đã biên tập đó, được đối chiếu theo tính
đồng nhất của nội dung; neo `fullText` được đọc lại từ tải trọng guardrail trước cuộc gọi đã hoàn tất,
do đó việc đối chiếu vẫn thành công sau khi các guardrail chuỗi phía sau (các bộ che PII và
thông tin xác thực, với mức ưu tiên 10/95) viết lại trực tiếp văn bản mô tả và
sau khi việc chèn lời nhắc hệ thống/bàn giao/bộ nhớ định hình lại mảng thông điệp. Nội dung
được gửi lên mô hình không thay đổi. Một yêu cầu được quan sát cũng không điền dữ liệu vào
Memory bền vững nào (cả quá trình trích xuất từ yêu cầu lẫn phản hồi đều bị bỏ qua),
vì vậy phản hồi của chính mô hình không thể lặp lại văn bản bản chép lời vào Memory.

**Các trường video thô (#12430).** Khi bridge được bật và khả năng hỗ trợ video gốc chưa xác định hoặc không có, các trường `transcript`/`audioTranscript` đã được định nghĩa cũng kích hoạt `videoBridgeObserved`, ngay cả sau khi việc mô tả thất bại hoặc đạt giới hạn `maxVideos`. `null` và chuỗi rỗng vẫn được tính; các trường không tồn tại và siêu dữ liệu không phải video thì không. Các bản sao được lưu giữ sẽ biên tập các trường này hoặc bỏ qua yêu cầu, đồng thời các bộ nhớ đệm/Memory bị bỏ qua.

Trên các đường dẫn dự phòng đó, các cue hợp lệ từ trình gọi trở thành các phần `text`/`input_text`
được hỗ trợ thay vì các trường nhà cung cấp không chuẩn. Cả hai luồng do yêu cầu cung cấp
vẫn là các quan sát `client` không đáng tin cậy, kèm cảnh báo rõ ràng rằng video
chưa được mô tả và dấu thời gian chưa được xác minh với phương tiện. Các giới hạn hiện có
là 256 cue/tổng cộng 64 KiB và giới hạn cho từng cue được áp dụng chung cho cả hai luồng;
dấu thời gian phải nằm trong mức trần 600 giây của broker và bất kỳ cửa sổ
tiêu điểm nào được cung cấp. Các luồng không hợp lệ bị loại bỏ, không được chuyển tiếp dưới dạng văn bản tùy ý; một
luồng đồng cấp hợp lệ vẫn có thể được sử dụng trừ khi tổng ngân sách kết hợp của chúng bị vượt quá. Các trường null/rỗng
không thêm văn bản. Cơ chế dự phòng này không bổ sung việc tìm nạp phương tiện hoặc phiên âm.
Các trường mở rộng của bản chép lời bị xóa khỏi phần chứa video dự phòng và các đối tượng
`video_url`/`source` của nó. Danh sách cho phép trên đường truyền OpenAI vẫn nghiêm ngặt; các phần chứa video
có khả năng hỗ trợ gốc chưa xác định vẫn khả dụng và các đích đã biết là chỉ hỗ trợ văn bản vẫn giữ các dấu hiệu an toàn.
Các bản sao biên tập có cấu trúc bảo vệ văn bản bản chép lời được nối thêm, trong khi
yêu cầu gốc thuộc sở hữu của trình gọi vẫn không thay đổi. Các đích có hỗ trợ gốc và
các bridge bị tắt duy trì hành vi bỏ qua hiện có.

Các bản sao được lưu giữ bổ sung sử dụng cùng tín hiệu yêu cầu được quan sát. Ảnh chụp nhanh
yêu cầu máy khách thô trước guardrail, yêu cầu đang chờ trong bộ nhớ và nhật ký
yêu cầu bị từ chối sớm sẽ thay thế theo cấu trúc các trường bản chép lời trong các phần video;
các lời nhắc dạng chuỗi được tổng hợp bởi các giai đoạn pipeline và hoạt động bàn giao ngữ cảnh được biên tập
tại đầu thu nội dung yêu cầu được lưu bền vững. Dấu hiệu `video_content_removed` được lưu bền vững
khiến việc tiếp tục bằng `previous_response_id` đóng an toàn thay vì tái tạo
văn bản đã bị chủ ý loại bỏ. Nếu một yêu cầu được quan sát mất
bản sao biên tập theo từng phần trước khi ghi nhật ký, hoặc chỉ cần một trong nhiều bản sao video
không đối chiếu được sau các thay đổi yêu cầu ở giai đoạn sau, toàn bộ nội dung yêu cầu được lưu giữ sẽ
bị bỏ qua thay vì lưu giữ một bản chép lời chỉ được biên tập một phần.

Đối với một yêu cầu được quan sát, phản hồi của mô hình có thể trích dẫn bất kỳ phần nào của
bản chép lời mà không có ranh giới cue có cấu trúc. Vì vậy, `responseBody` trong nhật ký cuộc gọi
được lưu bền vững sẽ được thay thế bằng một dấu hiệu bỏ qua; tạo tác pipeline chi tiết
(có thể bao gồm nội dung phía thượng nguồn/máy khách và các đoạn luồng) không được lưu giữ.
Các bộ nhớ đệm ngữ nghĩa, idempotency và phát lại suy luận đều bỏ qua thao tác đọc
và ghi cho yêu cầu đó. Yêu cầu gửi đến nhà cung cấp và phản hồi hiển thị cho máy khách
vẫn không thay đổi. Các byte keepalive ban đầu được rút khỏi bộ đệm tạm thời
khi tạo tác chi tiết bị bỏ qua. Cảnh báo EventStream không đúng định dạng của Kiro
chỉ báo cáo số byte của tải trọng, tuyệt đối không báo cáo nội dung của nó hoặc lỗi thô
từ bộ phân tích cú pháp JSON.
Điều này không khẳng định rằng mọi thông tin chẩn đoán không liên quan của nhà cung cấp/plugin đều đã được
kiểm tra; đợt rà soát rộng hơn đối với các đầu thu lưu giữ được theo dõi trong #11658.

Vòng đời nội bộ `/api/modality-bridge/video/drilldown` là một tầng nền bộ nhớ đệm riêng biệt, được xác thực bằng loopback/token. Mọi thao tác cũng yêu cầu một ID principal chuẩn hóa, không rõ nghĩa. Trước khi một bên gọi production được kích hoạt, bên đó phải suy ra ID này từ tenant đã xác thực và tuyệt đối không được chuyển tiếp giá trị do client lựa chọn. Các khóa bộ nhớ đệm liên kết principal đó với các ID phiên và tham chiếu video chuẩn hóa, chỉ lưu các khóa được dẫn xuất bằng SHA-256, đồng thời giới hạn cả thao tác đọc lẫn xóa trong cùng principal. Bộ nhớ đệm lưu tối đa 16 khung hình JPEG đã dẫn xuất cho mỗi mục, làm chúng hết hạn sau mười phút và hỗ trợ đọc theo phạm vi `start`/`end` có giới hạn hoặc xóa phiên một cách tường minh.

Mỗi principal bị giới hạn ở 16 mục và 64 MiB dữ liệu JPEG chuẩn hóa. Các giới hạn đó độc lập với mức trần toàn cục là 64 mục/256 MiB: áp lực hạn ngạch của principal chỉ loại bỏ các mục ít được sử dụng gần đây nhất của chính principal đó trước khi xem xét loại bỏ theo LRU toàn cục. Các mục đã hết hạn được loại khỏi cả phần hạch toán theo principal lẫn toàn cục khi có hoạt động trên bộ nhớ đệm, trong khi việc hủy và lỗi xác thực không ghi nhận một phần thay thế chưa hoàn chỉnh.

Bộ nhớ đệm từ chối Base64 không chuẩn hóa, phần đệm dư thừa, nội dung không phải JPEG, JPEG sai định dạng hoặc bị cắt ngắn, cũng như JPEG tạo ra cảnh báo trong quá trình giải mã toàn bộ ảnh có giới hạn bằng `sharp`. Bộ nhớ đệm mã hóa lại từng ảnh được chấp nhận thành JPEG chuẩn hóa, suy ra chiều rộng và chiều cao từ các byte đã giải mã thay vì tin tưởng các trường do bên gọi cung cấp, đồng thời loại bỏ mọi byte polyglot ở cuối thay vì giữ lại chúng. Chỉ bộ đệm nén chuẩn hóa có giới hạn mới được tính vào cả hai hạn ngạch. Giới hạn truyền tải JSON bao gồm phần tăng thêm do Base64 đối với mức trần đầu vào đã giải mã là 32 MiB. Mỗi dẫn xuất được lưu trữ đều ghi lại định dạng/độ phân giải JPEG đã xác thực, chính sách lấy mẫu, phiên bản dẫn xuất, thời điểm tạo, hàm băm nội dung do máy chủ tính toán, tham chiếu cha đã được băm cùng với hàm băm nội dung cha của bên gọi đáng tin cậy. Việc hủy được kiểm tra giữa các giai đoạn giải mã/băm bất đồng bộ trước khi ghi nguyên tử vào bộ nhớ đệm.

Phần triển khai này chưa kết nối một producer production với route và không cung cấp khả năng lựa chọn biến thể đa độ phân giải. Do đó, đường dẫn yêu cầu Video Bridge trong suốt không phát sinh thêm công việc, trong khi việc dẫn xuất principal gắn với tenant và toàn bộ vòng đời đa độ phân giải FU-08 vẫn là công việc tiếp nối được nêu rõ, thay vì được ghi nhận là hành vi đã hoàn thiện.

Các khung hình được tạo chú thích tuần tự bằng mô hình Video đã cấu hình. Một giá trị ghi đè Video rỗng sẽ kế thừa thiết lập Vision; nếu cả hai đều rỗng, bộ định tuyến tự động Vision sẽ chọn mô hình hiệu dụng có khả năng xử lý thị giác. Các chú thích thành công thay thế phần ban đầu bằng tiền tố ổn định `[Video description:`, đồng thời đánh dấu văn bản là một quan sát không đáng tin cậy được dẫn xuất từ nội dung đa phương tiện và yêu cầu các mô hình hạ nguồn không làm theo hướng dẫn tìm thấy trong nội dung đó. Khóa bộ nhớ đệm chú thích khung hình bao gồm các byte JPEG, prompt, dấu thời gian và mô hình hiệu dụng; chỉ các chú thích thành công mới được lưu vào bộ nhớ đệm. Các mục bộ nhớ đệm giữ lại mô hình producer thực tế đã thành công, bao gồm cả mô hình dự phòng; bridge báo cáo `mixed` khi các khung hình khác nhau được tạo bởi các mô hình khác nhau. Một lần trúng bộ nhớ đệm sẽ tái sử dụng danh tính producer đó thay vì gắn nhãn lại thành kế hoạch định tuyến được yêu cầu. Bộ nhớ đệm kết quả cho toàn bộ video được tạo khóa dựa trên mọi đầu vào làm thay đổi đầu ra — prompt, mô hình hiệu dụng, chính sách lấy mẫu, số lượng khung hình, chế độ phân tích ngữ nghĩa, dấu vân tay SHA-256 của gợi ý trọng tâm đã chuẩn hóa, cửa sổ trọng tâm, `transcript`, `audioTranscript` và cờ contact-sheet — vì vậy, thay đổi bất kỳ chiều nào trong số đó đều dẫn đến trượt bộ nhớ đệm, tuyệt đối không tái sử dụng dữ liệu cũ. Phiên bản chính sách khử trùng lặp hình ảnh, ngưỡng và số lượng khung hình ứng viên có giới hạn cũng được nêu tường minh trong khóa và metadata của bộ nhớ đệm kết quả; do đó, thay đổi chính sách không thể tái sử dụng mô tả toàn bộ video đã cũ. Metadata v4 của bộ nhớ đệm kết quả giữ lại chế độ và dấu vân tay, tuyệt đối không giữ tác vụ thô của người dùng. Metadata guardrail báo cáo cả chế độ phân tích được yêu cầu lẫn chế độ hiệu dụng; chế độ `focused` được yêu cầu nhưng không có văn bản người dùng khả dụng sẽ được báo cáo là có hiệu lực `full`.

Guardrail trích xuất mọi phần video được hỗ trợ nhưng không mô tả quá `modalityBridgeVideoMaxVideos`. Đối với một target được chứng minh có `supportsVideo === false`, các video bị lỗi và vượt giới hạn trở thành những dấu văn bản an toàn, tường minh để không còn video thô nào tồn tại. Khi chưa xác định được khả năng, các phần đó vẫn giữ phần chứa video; mọi bản chép lời dự phòng đều tuân theo phép chuyển đổi văn bản có giới hạn nêu trên. Các target có `supportsVideo === true` bỏ qua bridge. Tín hiệu hủy yêu cầu của client được truyền qua quá trình tải xuống, hàng đợi broker, các subprocess và các lệnh gọi tạo chú thích; việc hủy sẽ dừng giữa các video và tuyệt đối không mở đường dự phòng cho nội dung đa phương tiện thô.

Các thiết lập runtime được lưu trong DB và xác thực bằng Zod:

| Khóa                                | Mặc định    | Phạm vi / hành vi                                                                                                   |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime tùy chọn, cần chủ động bật                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` giữ nguyên chú thích chung; `focused` sử dụng ngữ cảnh người dùng mới nhất bị giới hạn và không đáng tin cậy |
| `modalityBridgeVideoModel`          | `""`        | Kế thừa mô hình Vision Bridge                                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, hoặc `segment_aware` theo tỷ lệ; khi bộ phát hiện lỗi sẽ dự phòng về `uniform`            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Các giá trị thời gian chờ Video cũ đã được lưu và vượt quá 120 giây sẽ bị giới hạn theo
thời hạn của broker; các lần ghi cài đặt mới vượt quá giới hạn đó sẽ bị từ chối.
`GET /api/modality-bridge/video/runtime` yêu cầu tính cục bộ loopback đã được đóng dấu
đáng tin cậy trước khi xác thực hoặc thăm dò runtime, sau đó yêu cầu xác thực quản trị.
Nó chỉ trả về `available`, các phiên bản FFmpeg/ffprobe đã được làm sạch và một
lý do cố định khi runtime không khả dụng. Điểm cuối trích xuất nội bộ không phải là
API tải lên công khai: khi hàng đợi bão hòa sẽ trả về `503` cùng `Retry-After`, khi bên gọi
ngắt kết nối sẽ trả về `499`, và khi đạt thời hạn cố định của broker sẽ trả về `504`. Các phản hồi đã chuyển đổi sẽ thêm
`video->text;model=<visionModel>;parts=<videos>` vào header trung tâm
`x-omniroute-modality-bridge` mà không xóa các phân đoạn Vision hoặc Audio.

### Bộ che PII (`piiMasker.ts`)

Chạy ở **cả hai** giai đoạn.

- **`preCall`** sao chép payload, duyệt qua `system`, `messages`, `input` và
  `prompt` (bao gồm cả các mục chuỗi thuần túy), rồi áp dụng `processPII()` (từ
  `@/shared/utils/inputSanitizer`) cho các trường chuỗi `content`/`text`. Khi
  `PII_REDACTION_ENABLED=true`, PII được phát hiện sẽ bị che trong payload gửi đi.
  Điều này độc lập với `INPUT_SANITIZER_MODE` (biến này chỉ kiểm soát chính sách
  chèn prompt). Khi tính năng che bị tắt, lệnh gọi sẽ ghi lại số lượng phát hiện
  mà không viết lại nội dung.
- **`postCall`** sao chép sâu phản hồi, chạy `sanitizePIIResponse()` cùng với
  bộ che theo cấu trúc Responses API (`maskResponsesOutput` — bao phủ
  `output_text` và `output[].content[].text`). Nếu có bất kỳ thao tác che nào xảy ra,
  phản hồi đã sửa đổi sẽ thay thế phản hồi ban đầu.

Guardrail không bao giờ chặn; nó chỉ chú thích (`meta.detections`,
`meta.redacted`) hoặc viết lại.

#### Lựa chọn theo từng loại, mẫu tùy chỉnh và bộ đếm phát hiện

**Dashboard → Settings → Security → PII masking** chọn _nội dung_ cần che.
Nó không bật tính năng che: việc đó vẫn do `PII_REDACTION_ENABLED` (yêu cầu) và
`PII_RESPONSE_SANITIZATION` (phản hồi + SSE) kiểm soát; cả hai đều tắt theo mặc định.

- **Lựa chọn theo từng loại** — các id tích hợp sẵn được liệt kê trong
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Không thiết lập có nghĩa là mọi
  loại (hành vi trước khi cài đặt này tồn tại). Mẫu `ssn_us` của công cụ xử lý yêu cầu
  được ánh xạ thành `ssn`. Các mẫu thiết lập sẵn (Tối thiểu, Tiêu chuẩn, Tài chính,
  Brazil, Hoa Kỳ, Đầy đủ) chỉ điền vào các hộp kiểm trong giao diện người dùng.
- **Mẫu tùy chỉnh** — tối đa 20 mẫu biểu thức chính quy hoặc ký tự đại diện (`*` = tối đa 64
  ký tự không phải khoảng trắng, `?` = một ký tự). Các kết quả khớp trở thành `[CUSTOM_REDACTED]`.
  Mỗi mẫu đều được xử lý qua `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): tối đa 500 ký tự, cờ chỉ giới hạn ở
  `g i m s u`, phải biên dịch được, phải vượt qua `safe-regex` (quay lui
  thảm khốc), và không được khớp với chuỗi rỗng hoặc phần giữ chỗ che dữ liệu.
  Mẫu không đạt yêu cầu sẽ bị từ chối khi lưu và khi kiểm thử; hàng đã lưu
  nhưng không đạt yêu cầu sẽ bị bỏ qua trong runtime thay vì được biên dịch. Các mẫu tùy chỉnh chỉ
  chạy khi tính năng che được bật.
- **Bộ đếm phát hiện** — số lượng theo từng loại (không bao giờ lưu các giá trị khớp), được giữ trong
  bộ nhớ và đặt lại khi khởi động lại (`src/lib/pii/piiDetectionStats.ts`). Chúng chỉ
  tăng khi tính năng che được bật.

Các cài đặt nằm trong bảng `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) và được đọc thông qua bộ nhớ đệm 1 giây. API:

| Phương thức | Đường dẫn                | Mục đích                                                           |
| ----------- | ------------------------ | ------------------------------------------------------------------ |
| `GET`       | `/api/settings/pii`      | Trạng thái cờ, `enabledTypes`, `customPatterns`, bộ đếm phát hiện  |
| `PUT`       | `/api/settings/pii`      | Thay thế `enabledTypes` (`null` = tất cả) và/hoặc `customPatterns` |
| `POST`      | `/api/settings/pii/test` | Chạy thử một mẫu với dữ liệu mẫu tối đa 8 KB; không có gì được lưu |

Cả ba đều yêu cầu xác thực quản trị và xác thực phần thân bằng Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Chèn Prompt (`promptInjection.ts`)

Phát hiện các cấu trúc đối kháng trong nội dung do người dùng cung cấp và thực thi
chính sách đã cấu hình. Hành vi được điều khiển bởi các biến môi trường và tùy chọn
constructor:

| Cài đặt     | Biến môi trường                                                                                           | Mặc định | Tác dụng                                                                                                                                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đã bật      | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Khi là `false`, guardrail sẽ kết thúc sớm.                                                                                                                                                                                  |
| Chế độ      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Chính sách chống injection: `block`, `warn` hoặc `log`. (`redact` được chấp nhận để tương thích ngược nhưng **không** loại bỏ văn bản injection; việc ghi đè PII trong yêu cầu được kiểm soát bởi `PII_REDACTION_ENABLED`.) |
| Ngưỡng chặn | tùy chọn `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (bí danh `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mức độ nghiêm trọng tối thiểu cần thiết để chặn. Theo mặc định, mức Medium chỉ được theo dõi.                                                                                                                               |

**Thứ tự ưu tiên chế độ** (`getMode`): `options.mode` của bên gọi →
**giá trị ghi đè cờ tính năng trong DB** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → biến môi trường `INJECTION_GUARD_MODE` → biến môi trường `INPUT_SANITIZER_MODE` →
`warn`. Do đó, giá trị ghi đè trên dashboard được ưu tiên hơn các biến môi trường, nên giao diện
Feature Flags kiểm soát trực tiếp guard đang chạy (không cần khởi động lại). Việc đọc DB tuân theo
cơ chế an toàn khi xảy ra lỗi: nếu có lỗi, guard sẽ quay về hành vi dựa trên biến môi trường, và khi
không đặt giá trị ghi đè, hành vi sẽ giống hệt cơ chế phân giải chỉ dựa trên biến môi trường.

Các nguồn phát hiện:

1. `sanitizeRequest()` từ `@/shared/utils/inputSanitizer` (tập hợp bộ phát hiện dùng chung
   được sử dụng ở những nơi khác trong pipeline).
2. `DEFAULT_GUARD_PATTERNS` tích hợp sẵn (hiện gồm `system_override_inline` và
   `markdown_system_block`, cả hai đều có mức độ nghiêm trọng `high`).
3. `customPatterns` tùy chọn được truyền qua các tùy chọn của constructor (chuỗi, biểu thức chính quy
   hoặc các bản ghi `{ name, pattern, severity }`).

Khi `mode === "block"` **và** có ít nhất một kết quả phát hiện đạt ngưỡng mức độ nghiêm trọng,
`preCall` trả về `{ block: true, message: "Request rejected:
suspicious content detected" }`. Trong các chế độ `warn`/`log`, guardrail ghi log nhưng
vẫn cho phép lệnh gọi. Hàm hỗ trợ dùng chung `evaluatePromptInjection()` cũng được export
cho các bên gọi cần đánh giá prompt mà không phải thông qua registry.

**Giới hạn quét (v3.8.20):** bộ phát hiện chỉ kiểm tra **16 KB đầu tiên** của
văn bản prompt đã nối — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) trong
`src/shared/utils/inputSanitizer.ts`. Cả `detectInjection()` và
`evaluatePromptInjection()` đều gọi `slice(0, MAX_INJECTION_SCAN_BYTES)` trước khi chạy
vòng lặp mẫu. Các chỉ thị injection thường nằm gần đầu dữ liệu đầu vào, vì vậy cách này
giới hạn mức sử dụng CPU/GC của regex đối với các payload có kích thước hàng trăm KB mà
không làm suy yếu khả năng phát hiện (xem #3932, #4041).

### Bộ che thông tin xác thực (`credentialMasker.ts`)

Chạy ở **cả hai** giai đoạn và đứng cuối trong chuỗi mặc định (độ ưu tiên `95`). Che
các mẫu khóa API / token bí mật phổ biến khỏi payload gửi đi (nội dung thông báo,
đối số lệnh gọi công cụ, kết quả công cụ) **và** phản hồi của nhà cung cấp, để thông tin
xác thực được dán vào prompt (hoặc được kết quả công cụ trả lại) không bị rò rỉ
đến nhà cung cấp thượng nguồn hoặc trở lại máy khách.

- **Chỉ bật khi chủ động chọn**, theo cùng quy ước với việc che PII (liên quan đến Quy tắc cứng #20):
  bị tắt trừ khi `settings.credentialRedactionEnabled === true` **hoặc**
  `CREDENTIAL_REDACTION_ENABLED=true`. Khi tính năng này tắt, guardrail không thực hiện thao tác nào —
  không bao giờ chặn và không bao giờ ghi đè.
- `redactCredentials()` duyệt toàn bộ cây payload/phản hồi (`walkValue()`,
  an toàn trước prototype pollution, an toàn với chu trình nhờ `WeakSet`) và thay thế các kết quả khớp bằng
  phần giữ chỗ `[REDACTED:<type>]`, chỉ sao chép những nhánh thực sự
  đã thay đổi.
- `CREDENTIAL_PATTERNS` bao phủ các khóa của nhà cung cấp LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), khóa thanh toán (Stripe, Square), khóa
  đám mây (khóa truy cập AWS, Twilio, SendGrid, Mailgun), khóa riêng tư / JWT,
  chuỗi kết nối chứa thông tin xác thực (`mongodb://user:pass@...`, v.v.) và
  một mẫu chung cho giá trị header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Các khóa có dạng header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) được che theo cấu trúc (chỉ giá trị, giữ nguyên tiền tố scheme như
  `Bearer `/`Basic `) thay vì thông qua regex văn bản chung.
- Guardrail không bao giờ chặn; nó chỉ ghi đè (`modifiedPayload` /
  `modifiedResponse`) và thêm chú thích (`meta.credentialsRedacted`, `meta.count`).

Biện pháp bảo vệ chống hồi quy: `tests/unit/credential-masker-guardrail.test.ts`.

## Hợp đồng cơ sở (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true sẽ dừng chuỗi ngay lập tức
  message?: string; // được hiển thị khi chặn
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // được preCall trả về để ghi lại yêu cầu
  modifiedResponse?: TValue; // được postCall trả về để ghi lại phản hồi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Một guardrail biểu thị "không thay đổi" bằng cách trả về `void`, `{}`, hoặc
`{ block: false }`. Việc trả về `modifiedPayload`/`modifiedResponse` sẽ thay thế
giá trị đang truyền qua chuỗi cho các guardrail phía sau.
`signal?: AbortSignal` truyền vòng đời của bên gọi vào các guardrail. Việc hủy yêu cầu là ngoại lệ fail-open có chủ đích: các cầu nối phương tiện sẽ dừng công việc và dọn dẹp mà không khôi phục dữ liệu phương tiện thô cho một đích được biết là không hỗ trợ dữ liệu đó.

## Registry (`registry.ts`)

Singleton `guardrailRegistry` cung cấp:

- `register(guardrail)` — thêm một guardrail (hoặc thay thế theo tên đã chuẩn hóa) và
  sắp xếp lại theo `priority` tăng dần.
- `clear()` / `list()` — các tiện ích quản trị.
- `runPreCallHooks(payload, context)` — lặp qua các guardrail đang hoạt động, truyền
  payload qua `modifiedPayload`, và dừng tại `block: true` đầu tiên.
- `runPostCallHooks(response, context)` — luồng tương tự ở phía phản hồi.
- `resetGuardrailsForTests({ registerDefaults })` — xóa trạng thái và tùy chọn
  đăng ký lại các giá trị mặc định để cô lập kiểm thử một cách sạch sẽ.

Cả hai trình chạy đều trả về `{ blocked, payload|response, results, guardrail?, message? }`,
trong đó `results` là một mảng các bản ghi `GuardrailExecutionResult` bao gồm
các trường `blocked`, `skipped`, `modified`, `error`, và `meta` cho từng guardrail,
hữu ích cho việc truy vết.

### Vô hiệu hóa guardrail theo từng yêu cầu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` tổng hợp một
danh sách tên guardrail đã loại bỏ trùng lặp cần được bỏ qua đối với yêu cầu
hiện tại. Các nguồn (tất cả đều không bắt buộc và đều được hợp nhất):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` trong phần thân yêu cầu (cấp cao nhất)
- `metadata.disabledGuardrails` trong phần thân yêu cầu
- Header `x-omniroute-disabled-guardrails` (hoặc dạng cũ
  `x-disabled-guardrails`)

Giá trị có thể là mảng chuỗi hoặc chuỗi phân tách bằng dấu phẩy; tên được
chuẩn hóa thành kebab-case viết thường (`pii_masker` → `pii-masker`). Kết quả
được truyền qua `context.disabledGuardrails` tới registry, nơi sẽ bỏ qua
các guardrail khớp tên (`skipped: true` trong `results`).

## Thứ tự thực thi

Đối với mỗi yêu cầu đi qua `src/sse/handlers/chat.ts` và
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` tạo danh sách bỏ qua từ khóa API, phần thân
   và các header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` chạy các guardrail theo thứ tự
   ưu tiên tăng dần:
   - Các guardrail bị vô hiệu hóa được ghi nhận là `skipped`.
   - `preCall` của mỗi guardrail có thể ghi lại payload thông qua `modifiedPayload`.
   - Guardrail đầu tiên có `block: true` sẽ dừng ngay chuỗi xử lý và handler trả về
     phản hồi từ chối của guardrail.
3. Payload (có thể đã được ghi lại) được chuyển vào quá trình định tuyến kết hợp
   và gửi đến upstream.
4. Sau khi phản hồi được tập hợp, `guardrailRegistry.runPostCallHooks(...)`
   chạy cùng chuỗi đó trên phản hồi. `block: true` tại đây sẽ loại bỏ phản hồi
   từ upstream.

Các guardrail phát sinh ngoại lệ được ghi nhận với `error: <message>` và được ghi log qua
`logger.warn`, nhưng chuỗi vẫn tiếp tục — theo thiết kế fail-open.

## Cấu hình

Các biến môi trường được những guardrail tích hợp sẵn đọc:

| Biến                                  | Được dùng bởi             | Tác dụng                                                                                                        |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Đặt thành `false` để vô hiệu hóa hoàn toàn việc phát hiện.                                                      |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Chính sách đối với injection: `warn`, `block` hoặc `log`. Giá trị cũ `redact` không ghi lại văn bản injection.  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Chế độ cho guard chống injection; đồng thời là cờ tính năng trong DB **ghi đè** các biến môi trường (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Mức độ nghiêm trọng tối thiểu mà `MODE=block` sẽ từ chối: `high` (mặc định), `medium` hoặc `low`.               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Bí danh cũ của `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Khi là `true`, PII trong yêu cầu được che đi (độc lập với chế độ injection).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kiểm soát hành vi che dữ liệu ở phía phản hồi.                                                                  |

Các guardrail Modality Bridge đọc cấu hình thời gian chạy từ kho cài đặt được
DB hỗ trợ (`getSettings()`), không phải từ các biến môi trường. Các khóa chính
của Vision là `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` và
`modalityBridgeCacheMaxEntries`. Các khóa cũ
`visionBridge*` chỉ được chấp nhận làm phương án đọc dự phòng trong một chu kỳ
như đã ghi trong tài liệu; các thao tác ghi từ dashboard sử dụng những khóa
chính. Các giá trị mặc định và trình phân giải dự phòng nằm trong
`src/shared/constants/modalityBridgeDefaults.ts`, còn các hằng số cũ được giữ
lại trong `src/shared/constants/visionBridgeDefaults.ts`.

Audio sử dụng `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` và `modalityBridgeAudioMaxClips`, cùng với các cài
đặt `modalityBridgeCache*` dùng chung. Audio không có cơ chế dự phòng bằng khóa
cũ vì các khóa này được giới thiệu cùng với schema Modality Bridge.

Video sử dụng `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` và
`modalityBridgeVideoTimeout`, cùng với các cài đặt `modalityBridgeCache*` dùng
chung. Tính năng này mặc định bị vô hiệu hóa vì FFmpeg/ffprobe là các dependency
vận hành không bắt buộc, đồng thời việc tạo chú thích cho khung hình làm tăng độ
trễ và chi phí mô hình.

## Guardrail tùy chỉnh

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Các bước:

1. Tạo `src/lib/guardrails/myGuardrail.ts` mở rộng `BaseGuardrail`.
2. Triển khai `preCall` và/hoặc `postCall`.
3. Đăng ký ngay khi import (thêm từ `registerDefaultGuardrails`) hoặc
   gọi `guardrailRegistry.register(...)` trong thời gian chạy — registry sẽ thay thế
   mọi guardrail trước đó có cùng tên đã chuẩn hóa.
4. Thêm các bài kiểm thử trong `tests/unit/` (các ví dụ hiện có:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Kiểm thử

Sử dụng `resetGuardrailsForTests()` giữa các bài kiểm thử để bắt đầu từ một trạng thái đã biết.
Truyền `{ registerDefaults: false }` để bắt đầu với một registry trống và
chỉ đăng ký các guardrail đang được kiểm thử. Vision Bridge hỗ trợ chèn phần phụ thuộc
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge cung cấp các điểm nối
tương đương cho phần cài đặt, khả năng, lựa chọn mô hình STT, kiểm tra thông tin xác thực
và phiên âm. Do đó, các bài kiểm thử có thể thực thi cả hai luồng mà không cần truy cập
cơ sở dữ liệu hoặc mạng.

## Xem thêm

- `src/lib/guardrails/` — phần triển khai
- `src/shared/utils/inputSanitizer.ts` — bộ phát hiện dùng chung hỗ trợ
  chống chèn prompt và che thông tin nhận dạng cá nhân (PII)
- `src/shared/constants/visionBridgeDefaults.ts` — các giá trị mặc định của Vision Bridge và
  danh sách mô hình bắt buộc sử dụng bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — các giá trị mặc định khi chạy dùng chung cho Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — lớp độc lập (circuit breaker, thời gian chờ)
- `docs/reference/ENVIRONMENT.md` — tài liệu tham khảo đầy đủ về biến môi trường

## Phạm vi route và red-team của guard chống chèn (Giai đoạn 8 · Khối D)

Guard chống chèn (`createInjectionGuard` / `withInjectionGuard`) bao phủ tất cả các route
chấp nhận prompt của người dùng. Guard tuân theo `INJECTION_GUARD_MODE` (mặc định `warn` = chỉ ghi log;
`block` = trả về HTTP 400 `SECURITY_001`).

| Loại              | Route                                                                                                                                                | Chế độ mặc định |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Văn bản (hiện có) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Sinh nội dung     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Dữ liệu           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

Quá trình trích xuất văn bản (`extractMessageContents`) bao phủ `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hằng đêm, `nightly-llm-security.yml`):** promptfoo xác thực rằng mỗi route đều chặn
tập dữ liệu OWASP-LLM khi `INJECTION_GUARD_MODE=block`; garak chạy các phép thăm dò (bỏ qua khi không có secret).
`moderations` được đưa vào để đảm bảo tính nhất quán — các đơn vị vận hành ở chế độ chặn có thể miễn trừ route này thông qua
`resolveDisabledGuardrails`.

Quy trình hằng đêm (`.github/workflows/nightly-llm-security.yml`, cron + kích hoạt thủ công)
có hai job:

- **`promptfoo-guard` (bắt buộc)** — chạy `promptfoo eval -c promptfooconfig.yaml`
  với `INJECTION_GUARD_MODE=block`. Mỗi trường hợp đối kháng (ví dụ: "bỏ qua tất cả
  chỉ dẫn trước đó…", các kiểu jailbreak dạng DAN) xác nhận rằng phản hồi chứa
  `error.code === "SECURITY_001"`, tức là guard thực sự đã từ chối yêu cầu.
- **`garak` (tham khảo)** — chạy garak `--probes promptinject,dan,leakreplay`
  với một phiên bản OmniRoute cục bộ (`http://localhost:20128/v1`). Job này phụ thuộc vào
  secret của nhà cung cấp (`PROMPTFOO_PROVIDER_KEY`); sẽ bỏ qua một cách an toàn khi không có và được thêm hậu tố
  `|| true`, vì vậy job chỉ báo cáo mà không làm CI thất bại.

Phạm vi bao phủ của helper guard (`createInjectionGuard` / `withInjectionGuard`)
trải rộng trên mọi route `/v1` có chứa prompt; văn bản prompt được lấy từ
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` bởi
`extractMessageContents()` trong `src/shared/utils/inputSanitizer.ts`.
