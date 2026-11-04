# Guardrails (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Nguồn chính xác:** `src/lib/guardrails/`
> **Cập nhật lần cuối:** 2026-10-17 — v3.8.52 (bổ sung [Mức độ bao phủ và giới hạn](#coverage-and-limits):
> các route và đường dẫn response mà các hook chạm tới, các header tắt đã được gộp (#16412), chế độ
> chặn injection như một ranh giới bắt buộc (#16413), và thành phần nào nhìn thấy response trước post-call)

Guardrails thực thi các biến đổi về an toàn, chính sách và nội dung tại ranh giới
giữa OmniRoute và các nhà cung cấp upstream. Mỗi guardrail có thể kiểm tra (và
tùy chọn từ chối, biến đổi hoặc chú thích) payload của request (`preCall`) và
response từ upstream (`postCall`).

Hệ thống hoạt động theo kiểu **fail-open**: nếu một guardrail ném lỗi khi đang
thực thi, registry sẽ ghi lại lỗi và tiếp tục với guardrail tiếp theo thay vì
làm request thất bại. Việc chặn là một quyết định tường minh (`block: true`),
không bao giờ xảy ra một cách ngẫu nhiên. Ngoại lệ duy nhất là request bị hủy:
khi `signal` của caller bị abort, một guardrail ném lỗi sẽ reject lượt chạy hook
thay vì bị bỏ qua.

Các hook **không** chạy trên mọi route hay mọi response. Hãy đọc
[Mức độ bao phủ và giới hạn](#coverage-and-limits) trước khi dựa vào một
guardrail như một biện pháp kiểm soát bảo mật.

## Lan can tích hợp

Cơ quan đăng ký tự động tải sáu lan can theo thứ tự ưu tiên khi nhập (xem `registry.ts` → `registerDefaultGuardrails()`):

| Sự ưu tiên | Tên                 | (Các) giai đoạn | Tài liệu              |
| ---------- | ------------------- | --------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`       | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`       | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`       | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post`  | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`       | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post`  | `credentialMasker.ts` |

Số ưu tiên thấp hơn chạy** Đầu tiên** .

### Cầu tầm nhìn (`visionBridge.ts`) — Cầu phương thức PR-1

Mô hình cơ sở GLM 5.3 và `glm-5.3-{low,high,max}` có siêu dữ liệu `supportsVision:false` registry/spec rõ ràng. Các biến thể GLM 5.3 Flash vẫn là mô hình có tầm nhìn gốc. Tuyến đường `/v1/messages` của Claude Code đi vào chuỗi lan can bảo vệ trước cuộc gọi `handleChat` được chia sẻ** trước** Bản dịch Claude-to-OpenAI; Các hình ảnh kết quả của công cụ `Read` lồng nhau phải được mô tả hoặc xử lý trước khi bản dịch đó chuyển chúng thành nội dung OpenAI `image_url` (#17069).

Chặn các yêu cầu mang hình ảnh nhằm mục đích** mô hình không có tầm nhìn** và định tuyến lại toàn bộ yêu cầu đến một mô hình có khả năng hiển thị hoặc thay thế các phần hình ảnh bằng mô tả văn bản do mô hình tầm nhìn có thể định cấu hình tạo ra trước lệnh gọi ngược dòng. Điều này cho phép các nhà cung cấp chỉ có văn bản xử lý tải trọng đa phương thức một cách minh bạch.

Chảy:

1. Bỏ qua nếu mô hình mục tiêu đã hỗ trợ tầm nhìn (trừ khi nó xuất hiện trong danh sách cầu nối bắt buộc `isVisionBridgeForcedModel`).
2. Trích xuất các phần hình ảnh thông qua `extractImageParts(messages)` (`visionBridgeHelpers.ts`), ủy quyền cho** máy dò phương tiện thống nhất** `detectMediaParts()` trong `open-sse/utils/mediaParts.ts` — nguồn sự thật duy nhất được chia sẻ với bộ lọc tương thích kết hợp. Việc trích xuất được đưa vào danh sách cho phép đối với các hình dạng mà `replaceImageParts` có thể ghép lại (hợp đồng thay thế ↔ trích xuất): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` và Responses API `input_image`. Các hình ảnh phù hợp được lồng bên trong đầu ra của công cụ Claude Code `tool_result.content` và Responses cũng được trích xuất và thay thế tại đường dẫn ban đầu của chúng; các hình dạng chỉ có chỉ báo là vật liệu lọc kết hợp và không được trích xuất. Bỏ qua nếu không tìm thấy.
3. Giải quyết cấu hình thời gian chạy thông qua `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): các phím cài đặt `modalityBridge*` mới giành chiến thắng; khóa `visionBridge*` kế thừa vẫn là một** dự phòng một chu kỳ** (cửa sổ quay lui). Bỏ qua trước bất kỳ quá trình truyền tải phương tiện nào khi cầu nối bị vô hiệu hóa.
4. Bộ chọn chế độ (`modalityBridgeVisionMode`, xem bảng bên dưới) quyết định định tuyến lại hay mô tả. Định tuyến lại trả về `modifiedPayload` chỉ với `model` được hoán đổi, cộng với meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Đường dẫn mô tả: giới hạn hình ảnh tại `maxImages`, soạn lời nhắc nhận biết tác vụ, tham khảo bộ đệm mô tả, gọi mô hình tầm nhìn** song song** (`Promise.allSettled`) và chèn các phần văn bản `[Image N]: <description>` vào vị trí của chúng. Một mô tả không thành công mang lại `null`: hình ảnh thô được giữ nguyên cho các mục tiêu unknown/vision-capable (#4012), nhưng một** mục tiêu trực tiếp chỉ có văn bản đã được xác nhận** hoặc kết hợp không tầm nhìn nhận được một đoạn văn bản `(unavailable — no vision-capable provider connected)` rõ ràng cho mọi hình ảnh không được mô tả, bao gồm cả lỗi một phần và hình ảnh vượt quá giới hạn lệnh gọi mô tả (#17069). Dự phòng mô tả kết hợp hoàn toàn không thành công hiện có vẫn được giữ nguyên (#8430).
6. Trả về meta `modifiedPayload` + (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Bộ chọn chế độ (`modalityBridgeVisionMode`)

| Cách thức  | Mặc định | Hành vi                                                                                                                                                                                                                                                                                                    |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Heuristic kế thừa, chưa được xử lý (#6640/#7204): các mô hình không kết hợp/`auto/` tuyến lại đến mô hình tầm nhìn tốt nhất trừ khi mô hình ban đầu đã có thông tin xác thực có thể sử dụng được (sau đó mô tả); mục tiêu kết hợp luôn mô tả.                                                              |
| `describe` |          | Luôn mô tả — khối định tuyến lại bị bỏ qua hoàn toàn; mô hình người dùng đã chọn luôn trả lời.                                                                                                                                                                                                             |
| `reroute`  |          | Buộc định tuyến lại: bộ phận bảo vệ mô hình giữ thông tin xác thực bị bỏ qua. Định tuyến lại-** mục tiêu** trình bảo vệ thông tin xác thực vẫn áp dụng — khi không có mục tiêu tầm nhìn nào có thể sử dụng được, cầu nối chặn lỗi rõ ràng thay vì mô tả hoặc gửi hình ảnh thô đến mục tiêu chỉ có văn bản. |

Chế độ cưỡng bức ngắn mạch** trước** các lần chạy heuristic tự động; hành vi `auto` giống hệt byte với lan can pre-PR-1.

#### Phạm vi khóa API (`visionBridgeKeyScope.ts`)

Khi khóa API của người gọi hạn chế `allowedConnections`, nhóm hạn ngạch (`allowedQuotas`) hoặc mô hình (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), cầu nối chỉ chọn định tuyến lại và mô tả các mô hình mà khóa có thể sử dụng, trên các kết nối mà khóa có thể sử dụng. Sau đó, lệnh gọi mô tả luôn đi qua vòng lặp OmniRoute với tiêu đề `x-omniroute-self-loop-key-id`, do đó, yêu cầu trò chuyện nhận được sẽ thực thi lại chính sách mô hình và kết nối của khóa đó. `enforceApiKeyPolicy()` chỉ tôn trọng tiêu đề đó cùng với trình mang vòng lặp tự, do đó, nó chỉ có thể thu hẹp quyền truy cập và id không giải quyết được sẽ bị từ chối.

Nếu không có mô hình tầm nhìn nào được phép cho khóa,** mục tiêu chỉ có văn bản đã được xác nhận** từ chối yêu cầu hình ảnh cục bộ với HTTP 400 rõ ràng thay vì chuyển tiếp byte hình ảnh lên thượng nguồn không có khả năng (#17069). Đối với các mục tiêu có khả năng nhìn không xác định hoặc có sẵn, đường dẫn mô tả vẫn giữ nguyên trạng thái không mở được trước đó (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Các yêu cầu không có khóa và các khóa không có những hạn chế này sẽ hoạt động chính xác như trước.

#### Lời nhắc mô tả nhận biết nhiệm vụ (`modalityBridgeVisionTaskAware`)

Mặc định** ĐÚNG VẬY** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) nối thêm văn bản của** tin nhắn của người dùng cuối cùng** (cắt ngắn còn 500 ký tự) vào lời nhắc mô tả cơ sở, hướng mô tả đến những gì người dùng thực sự yêu cầu (mẫu codex-vision-proxy) và yêu cầu mô hình tầm nhìn ghi lại văn bản hiển thị. Với cờ tắt — hoặc không có văn bản người dùng — dấu nhắc cơ sở được sử dụng không thay đổi.

Yêu cầu tương thích OpenAI của chính mô tả vòng lặp (`callVisionModelSingle()` trong `visionBridgeHelpers.ts`) luôn yêu cầu `image_url.detail: "high"` — vô điều kiện, đối với mọi caller/provider, không bị kiểm soát trên bất kỳ tín hiệu máy khách nào. Việc lấy mẫu chi tiết thấp làm giảm độ chính xác OCR đối với chính xác tác vụ phiên âm văn bản mà lời nhắc này yêu cầu, do đó, lệnh gọi mô tả luôn yêu cầu độ chi tiết cao bất kể yêu cầu gửi đến ban đầu được sử dụng ở mức độ chi tiết nào. Điều này chỉ ảnh hưởng đến nội dung yêu cầu mô tả nội bộ; nó không thay đổi cách OmniRoute chuyển tiếp `image_url.detail` của chính người gọi theo — yêu cầu chính mà mặc định đó được áp dụng riêng và chỉ dành cho các máy khách OpenCode được phát hiện, trong `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Nhánh định dạng dây Anthropic của vòng tự mô tả không có trường `detail` và không bị ảnh hưởng theo mặc định.

#### Mô tả giới hạn đầu ra (`modalityBridgeVisionMaxChars`)

| Chìa khóa                      | Mặc định | Phạm vi            |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` hoặc 100–50000 |

`0` (mặc định) có nghĩa là** không có nắp** — mô tả được trả về bởi `callVisionModel()` được chuyển qua chưa sửa đổi, duy trì hành vi hiện có. Bất kỳ giá trị nào trong phạm vi 100–50000 sẽ cắt bớt mô tả bằng hậu tố `…` trước khi nó được ghép lại thành `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` trong `src/lib/guardrails/visionBridge.ts`). Tăng giá trị này cho các tác vụ OCR nặng về chi tiết trong đó mô hình xuôi dòng cần phiên âm đầy đủ; hạ thấp nó xuống mức sử dụng mã thông báo bị ràng buộc trên các mô hình tầm nhìn trò chuyện. Trường bảng thông tin nằm trên bảng Nâng cao của tab Tầm nhìn (`modality-bridge-max-chars` trong `ModalityBridgeVisionTab.tsx`) và kẹp bất kỳ giá trị nào từ 1 đến 99 cho đến tầng 100 trong khi để lại `0` rõ ràng — `0` là một giá trị Zod hợp lệ theo đúng nghĩa của nó (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), không chỉ đơn thuần là mặc định "không đặt".

#### Mô tả bộ đệm (`modalityBridge/bridgeCache.ts`)

Bộ nhớ đệm LRU + TTL trong bộ nhớ để mô tả kết quả đầu ra, được chia sẻ trên toàn quy trình. Khóa = `sha256(imageRef + composedPrompt + configuredBridgeModel)` có khung tiền tố độ dài (không có xung đột ranh giới trường). Thành phần mô hình là** được cấu hình** mô hình cầu nối, không phải mô hình thực sự trả lời — `callVisionModel` có thể quay trở lại nội bộ và việc khóa mỗi lần thử sẽ phân mảnh bộ đệm. Mô tả không thành công sẽ không bao giờ được lưu vào bộ nhớ đệm. Cài đặt:

| Chìa khóa                       | Mặc định | Phạm vi |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Chuẩn hóa hình ảnh từ xa (tìm nạp describe/base64 tự lặp)

Khi cây cầu lấy một** xa** chính hình ảnh — Anthropic mô tả tự gọi và chuyển đổi base64 định dạng dây claude (`ensureBase64ImagesForClaudeWire`), cả hai đều thông qua `fetchRemoteImageAsDataUri()` trong `visionBridgeHelpers.ts` — dữ liệu kết quả URI được chuyển qua `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) trước khi được nhúng vào yêu cầu mô hình tầm nhìn. Hình ảnh quá khổ được thu nhỏ lại thành** Cạnh dài 2048px** (khớp với giới hạn thay đổi kích thước OpenAI/Anthropic đã áp dụng phía máy chủ), giúp cắt bytes/latency tải lên mà không thay đổi những gì mô hình tầm nhìn nhìn thấy. Việc thay đổi kích thước sử dụng `sharp`, được tải thông qua nhập động: trên nền tảng mà nhị phân gốc của nó không tải được, `normalizeDataUri()`** không bao giờ ném** — nó sẽ quay trở lại việc chuyển các byte ban đầu, vì vậy đường dẫn describe/base64-conversion luôn tiếp tục hoạt động. Các byte không phải hình ảnh (một lần tìm nạp không trả về hình ảnh có thể giải mã được) cũng được truyền qua mà không bị ảnh hưởng. Quá trình chuẩn hóa này được áp dụng cho các hình ảnh mà cầu nối tìm nạp cho — tự gọi của chính nó. Nó không bao giờ được áp dụng cho tải trọng truyền qua thô của người gọi, nhất quán với nguyên tắc đột biến chỉ chọn tham gia (Quy tắc cứng số 20).

#### Lược đồ cài đặt di chuyển +

Các khóa `modalityBridge*` mới được Zod xác thực trong `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, bộ ba `modalityBridgeCache*` và nhóm `modalityBridgeAudio*` được Audio Bridge sử dụng. Di chuyển `141_modality_bridge_settings.sql` sao chép các giá trị `visionBridge*` kế thừa hiện có sang các khóa mới phù hợp (bình thường, không bao giờ ghi đè giá trị `modalityBridge*` do toán tử đặt); các khóa cũ vẫn được chấp nhận dưới dạng dự phòng đọc trong một chu kỳ phát hành.

#### Số liệu thống kê + tiêu đề minh bạch

Các phản hồi được chuyển đổi mô tả mang theo `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (được xây dựng bởi `buildModalityBridgeHeader()` trong `modalityBridge/bridgeStats.ts`, được đóng dấu bởi `withModalityBridgeHeader()` trong `src/sse/handlers/chatHelpers.ts`). Yêu cầu được định tuyến lại nhận được** KHÔNG** tiêu đề — tải trọng không bị ảnh hưởng và việc hoán đổi mô hình đã hiển thị trong trường `model` của nội dung phản hồi.

`GET /api/modality-bridge/stats` (xác thực quản lý, cùng cấp với `GET /api/settings`) trả về bộ đếm trong bộ nhớ theo từng phương thức `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` cho `vision`, `audio` và `video`. `averageLatencyMs` sử dụng `latencySamples`, không phải tất cả các lần thử, làm mẫu số của nó; một thao tác không có thời gian sẽ không tạo ra mẫu 0 mili giây. `bridged` vẫn là bí danh tương thích ngược để chuyển đổi thành công; những lần thử thất bại không làm tăng nó. Thiết lập lại bộ đếm khi khởi động lại quá trình theo thiết kế (đo từ xa, không tính toán).

#### Cấu hình bảng điều khiển

Trang bảng điều khiển chuyên dụng là `/dashboard/settings/modality-bridge`. Các tab `Vision`, `Audio` và `Video` có thể định địa chỉ URL của nó bảo toàn các tham số truy vấn trong khi chuyển đổi giá trị `tab`. Tab Tầm nhìn hiển thị khả năng hỗ trợ, chế độ, lựa chọn mô hình (bao gồm mặc định tự động), nhắc nhở nhận biết nhiệm vụ, giới hạn timeout/image/description-length/cache nâng cao, bộ đếm thời gian chạy và yêu cầu mẫu được bảo vệ. Tab Âm thanh cũng hoạt động: nó hiển thị khả năng hỗ trợ, bộ chọn mô hình chỉ dành cho STT với Tự động, giới hạn timeout/max-clip, bộ đếm âm thanh và kiểm tra mẫu `input_audio`. Tab Video có chức năng: nó báo cáo trạng thái thời gian chạy FFmpeg/ffprobe — một trong bốn trạng thái UI rõ ràng (`unknown` trong khi đầu dò đang bay hoặc không thể hoàn thành, `restricted` trên máy chủ bảng thông tin không vòng lặp ngược trong đó đầu dò bị bỏ qua phía máy khách, `unavailable` sau khi được thăm dò và xác nhận bị thiếu hoặc `available` với các phiên bản FFmpeg/ffprobe ) — duy trì giới hạn enable/model/frame/video/timeout, lọc bộ chọn mô hình cho các mô hình có khả năng hiển thị và hiển thị bộ đếm video.

Thẻ Vision Bridge trước đây trong cài đặt AI là liên kết tương thích với trang mới; nó không còn sở hữu bản sao thứ hai của biểu mẫu nữa. Nhà cung cấp phương tiện cũng liên kết các luồng công việc Chuyển từ hình ảnh thành văn bản và Chuyển giọng nói thành văn bản với các tab Cầu nối phương thức tương ứng mà không xóa sân chơi Chuyển giọng nói thành văn bản hiện có.

**Self-loop admission bypass:** when the describe call routes through OmniRoute's own `/v1` self-loop (non-standard provider model), the sub-request sends `x-omniroute-admission-bypass: internal` and is authenticated with the resolved self-loop credential — the local `sk_omniroute` sentinel in local mode, or the operator-configured `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) so `REQUIRE_API_KEY=true` deployments can still run the describe call. The bypass is only honored for those exact credentials, so external clients cannot use the header to skip admission.

Giá trị mặc định kế thừa tồn tại ở `src/shared/constants/visionBridgeDefaults.ts`; các giá trị mặc định mode/task-aware/cache mới và trình phân giải cài đặt có trong `src/shared/constants/modalityBridgeDefaults.ts`. Lan can hiển thị tùy chọn hàm tạo `deps` để các thử nghiệm có thể đưa vào các triển khai `getSettings` và `callVisionModel` giả.

### Cầu âm thanh (`audioBridge.ts`) — Cầu phương thức PR-3

Chặn các yêu cầu trò chuyện chứa âm thanh trước khi chúng tiếp cận mục tiêu không chấp nhận đầu vào âm thanh. Nó không bao giờ định tuyến lại yêu cầu trò chuyện: các phần âm thanh được sao chép thông qua điểm cuối nhiều phần tương thích với OpenAI hiện có và mô hình trò chuyện đã chọn sẽ tiếp tục với bản ghi văn bản.

Chảy:

1. Giải quyết `supportsAudio` thông qua `getResolvedModelCapabilities()`. Siêu dữ liệu đăng ký nhà cung cấp rõ ràng sẽ giành chiến thắng, sau đó là siêu dữ liệu mô hình tĩnh, sau đó được đồng bộ hóa `modalities_input`. Danh sách đầu vào được khai báo không có `audio` là `false`; không còn bằng chứng về khả năng `null`. Cả `false` và `null` đều kích hoạt cầu bảo thủ, trong khi `true` bỏ qua nó.
2. Giải quyết cài đặt `modalityBridgeAudio*` và trích xuất các phần âm thanh cấp cao nhất có thể ghép nối từ mọi tin nhắn thông qua trình phát hiện `detectMediaParts()` được chia sẻ. Các hình dạng dây được hỗ trợ là OpenAI `input_audio`, `audio_url` và `source.media_type: "audio/*"`. Âm thanh lồng nhau được phát hiện để định tuyến nhưng không bị đường dẫn nối loại bỏ. Công việc bị giới hạn bởi `modalityBridgeAudioMaxClips`; các phần sau không bị ảnh hưởng
3. Tôn trọng `provider/model` đã định cấu hình hoặc để `selectAudioBridgeModel()` hướng dẫn `AUDIO_TRANSCRIPTION_PROVIDERS` theo thứ tự danh mục ổn định và chọn mô hình đầu tiên có thông tin xác thực nhà cung cấp đang hoạt động có thể sử dụng được.
4. `callAudioTranscription()` chuyển đổi âm thanh base64/data-URI thành nhiều phần `file` hoặc tải xuống `audio_url` từ xa thông qua bộ bảo vệ gửi đi chỉ công khai với ghim DNS và giới hạn 25 MB. Sau đó, nó POSTs tệp và mô hình đã chọn vào vòng lặp `/v1/audio/transcriptions` cục bộ, được xác thực bằng `resolveSelfLoopBearer()`. Tuyến phiên mã hiện tại thực hiện tra cứu thông tin xác thực thông thường, xử lý cooldown/rate-limit và gửi nhà cung cấp.
5. Các cuộc gọi thành công thay thế các phần của chúng bằng `[Audio N]: <transcript>`. Cuộc gọi chạy với `Promise.allSettled`: một lỗi riêng lẻ sẽ giữ nguyên phần âm thanh gốc đó (hợp đồng #4012). Nếu mọi cuộc gọi đều thất bại và mục tiêu được chứng minh `supportsAudio === false`, các phần sẽ trở thành `[Audio N]: (unavailable — no STT provider connected)` (hợp đồng #8430). Đối với mục tiêu không xác định (`null`), kết quả hoàn toàn thất bại sẽ không bị ảnh hưởng. Mục tiêu chỉ có văn bản đã được chứng minh và không có thông tin xác thực STT có thể sử dụng được sẽ nhận được cùng một sơ khai rõ ràng mà không thực hiện lệnh gọi mạng.

Bản ghi thành công sử dụng bộ nhớ đệm LRU/TTL của Modality Bridge trên toàn quy trình. Phím kết hợp tham chiếu âm thanh, nhãn hoạt động `audio-transcription` ổn định và mô hình STT đã chọn; lỗi không bao giờ được lưu trữ. Các nỗ lực âm thanh cập nhật các bộ đếm `bridged`, `cacheHits`, `failures` và `lastUsedAt` được chia sẻ. Các phản hồi được chuyển đổi mang `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; các yêu cầu chưa được xử lý sẽ không nhận được phân đoạn Cầu nối âm thanh.

Cài đặt thời gian chạy được DB hỗ trợ và xác thực Zod:

| Chìa khóa                     | Mặc định | Phạm vi             |
| ----------------------------- | -------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                   |
| `modalityBridgeAudioModel`    | `""`     | Tự động hoặc STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                |

Bộ nhớ đệm dùng chung vẫn được kiểm soát bởi `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` và `modalityBridgeCacheMaxEntries`.

### Cầu Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chặn các phần video cấp cao nhất trong phần Hoàn thành trò chuyện `messages` và Phản hồi API `input` trước khi một mục tiêu không được hỗ trợ video gốc đã biết được gọi. Các hình dạng được hỗ trợ là `input_video`, `video_url`, `video_source`, HTTPS URLs và `data:video/*;base64,...` data URIs. Tên tệp đơn giản trong văn bản không được coi là video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sở hữu truyền tải yêu cầu, kiểm tra capability/policy, tổng hợp theo yêu cầu và tải trọng phản hồi. Việc thu thập — cho mỗi tác phẩm video, bộ nhớ đệm toàn bộ kết quả, mô tả chuỗi khung hình (kết hợp mọi bản ghi âm thanh do người gọi khai báo) và metrics/abort/cleanup — cho mỗi lần thử được ẩn đằng sau `processVideoPart` trong `videoBridgePipeline.ts`, được gọi một lần cho mỗi phần video bên trong vòng lặp của `preCall`. Mô-đun đó cũng xác định các ranh giới cổng rõ ràng `VideoMediaBrokerPort` (thu thập byte và trích xuất các khung được lấy mẫu), `VideoAudioTranscriptionPort` (kết hợp bản ghi âm do người gọi khai báo với chú thích được lấy mẫu) và `VideoDrilldownPort` (ranh giới lưu giữ chi tiết khung; chưa được nối vào `processVideoPart` — chỉ có tuyến `/api/modality-bridge/video/drilldown` riêng biệt ghi các mục nhập chi tiết ngày hôm nay).

Đường dẫn yêu cầu `/v1` công khai không bao giờ nhập hoặc gọi một quy trình con. Các video từ xa được tải xuống dưới giới hạn 50 MiB ; các video base64 nội tuyến có giới hạn giải mã 36 MiB thận trọng cho mỗi video để đường bao model/messages/framing có thể vẫn nằm trong giới hạn chấp nhận yêu cầu JSON công khai là 50 MiB. Ước tính độ dài nội tuyến và kích thước đã giải mã được kiểm tra trước khi phân bổ. HTTPS được yêu cầu trên URL từ xa ban đầu và mọi chuyển hướng, sử dụng bộ bảo vệ gửi đi chỉ công khai hiện có với tính năng ghim DNS. Các byte sau đó vượt qua ranh giới môi giới `POST /api/modality-bridge/video/extract` nội bộ chính xác. Tuyến đường đó là cả `LOCAL_ONLY` và `SPAWN_CAPABLE`, chỉ chấp nhận yêu cầu vòng lặp đáng tin cậy, được xác thực trên mỗi quy trình và không bao giờ chấp nhận URL, đường dẫn hệ thống tệp, danh sách thực thi hoặc đối số. Đường dẫn kích thước nội dung API và trình đọc nội dung gia tăng của trình xử lý thực thi độc lập giới hạn đầu vào của nhà môi giới 50 MiB. Hàng đợi giới hạn của nó chạy một lần trích xuất tại một thời điểm, cho phép bốn công việc đang chờ xử lý và giới hạn đầu vào đang chờ xử lý ở mức 100 MiB.

Bên trong nhà môi giới, `ffprobe` đọc một tệp cục bộ riêng tư; danh sách cho phép có định dạng cố định không bao gồm định dạng danh sách phát và tệp kê khai. Đối với các vùng chứa dòng MOV được phép, các tham chiếu dữ liệu MOV bên ngoài vẫn bị tắt theo mặc định và lệnh cố định không chọn tham gia vào chúng. Cả `ffprobe` và `ffmpeg` đều sử dụng danh sách trắng giao thức `file` -only, một luồng, mảng đối số cố định, không có shell và các tệp thực thi được giải quyết từ `PATH`. Luồng ảnh bìa đính kèm không phải là ứng cử viên có thể phát được. Tất cả các luồng có thể phát phải đáp ứng các giới hạn và luồng mặc định rõ ràng được ưu tiên trước dự phòng có chỉ số thấp nhất xác định. Video được giới hạn ở 600 giây, 8.192 pixel mỗi chiều và 33.554.432 pixel nguồn. FFmpeg lấy mẫu từ 1–16 khung hình JPEG điểm giữa, giảm tỷ lệ cạnh dài xuống tối đa 1.024 pixel mà không tăng tỷ lệ đầu vào nhỏ hơn và không bao giờ nhận được URL. Lấy mẫu là `uniform` theo mặc định. Các chính sách `scene_aware` tùy chọn và `segment_aware` thử nghiệm thực hiện một lần chuyển FFmpeg cố định bổ sung qua luồng cục bộ đã được xác thực, chọn dấu thời gian của cảnh `showinfo` bị giới hạn và quay trở lại một cách xác định về cùng các điểm giữa thống nhất khi máy dò bị lỗi, hết thời gian chờ, đầu ra không đúng định dạng hoặc một bộ ứng cử viên trống. Chế độ nhận biết phân đoạn phân bổ các mẫu điểm giữa tương ứng với các khoảng cảnh được xác thực; bằng chứng nhận biết phân khúc và hành vi dự phòng được trình bày chi tiết bên dưới. Giới hạn 16 khung cứng được áp dụng sau khi chọn trong mọi chính sách. Khi yêu cầu nhận biết cảnh chỉ có ngân sách một khung hình, yêu cầu đó sẽ sử dụng điểm giữa thống nhất của toàn bộ video hoặc cửa sổ lấy nét đang hoạt động và báo cáo `policyEffective: uniform`: một khung cảnh được chọn duy nhất không thể bảo toàn cả hai đầu tạm thời. Người gọi có thể tùy ý cung cấp cửa sổ lấy nét hữu hạn (`start`/`end` giây); giới hạn được giới hạn theo thời lượng phương tiện, các cửa sổ đảo ngược hoặc không hữu hạn bị từ chối và tất cả các chính sách lấy mẫu chỉ được thực hiện trong khoảng thời gian chuẩn hóa. Cửa sổ kết quả được đưa vào siêu dữ liệu lấy mẫu và trong tiền tố mô tả không đáng tin cậy để các mô hình xuôi dòng có thể phân biệt đoạn trích tập trung với dòng thời gian đầy đủ.

Tiêu điểm chú thích ngữ nghĩa là cài đặt riêng biệt, rõ ràng. Chế độ phân tích `full` mặc định giữ nguyên lời nhắc khung hiện có và không bao giờ chuyển tiếp văn bản yêu cầu đến mô hình chú thích. Ở chế độ `focused`, bridge chỉ đọc `text`/`input_text` không trống mới nhất do người dùng tạo từ cùng một vùng chứa Trò chuyện hoặc Phản hồi, chuẩn hóa nó thành NFC, thu gọn các ký tự điều khiển và khoảng trắng, đồng thời giới hạn ở 500 điểm mã Unicode. Một kết quả trống quay trở lại dấu nhắc `full` chính xác. Một gợi ý có thể sử dụng được tuần tự hóa dưới dạng JSON trong khối ngữ cảnh dành riêng cho người dùng không đáng tin cậy và chỉ có thể ưu tiên các chi tiết có thể quan sát được; nó không thể ghi đè cảnh báo riêng biệt đối với các hướng dẫn sau đây có thể nhìn thấy hoặc nghe được trên phương tiện truyền thông. Tiêu điểm văn bản không bao giờ suy ra `start`/`end` hoặc thay đổi bộ lấy mẫu thời gian.

#### bằng chứng phân đoạn cấu trúc FU-07

`segment_aware` sử dụng một lượt phân tích trước có giới hạn trên luồng video cục bộ đã được xác thực. Chuỗi bộ lọc cố định trước tiên sẽ mở rộng tối đa 320 pixel, phát hiện các thay đổi của cảnh và khoảng thời gian cố định, sau đó lấy mẫu ở tốc độ 1 khung hình mỗi giây để biết thông tin về độ mờ, độ sáng trung bình và spatial/temporal. Thẻ được giới hạn ở 600 mẫu cấu trúc, một luồng FFmpeg/filter, cùng giao thức `file` -only và danh sách cho phép vùng chứa, giới hạn đầu ra của quy trình 1 MiB và tối đa 30 giây bên trong abort/deadline. được chia sẻ của nhà môi giới. Nó không bao giờ chấp nhận lệnh, bộ lọc, đường dẫn hoặc URL từ yêu cầu.

Các giá trị cấu trúc là bằng chứng lấy mẫu xác định, không phải là sự hiểu biết về ngữ nghĩa của video. Họ không suy luận chủ đề, hành động, chú thích, lời nói hoặc ý định của người dùng. Cảnh và ranh giới đóng băng tạo thành các phân đoạn; đóng băng phạm vi phủ sóng, độ mờ, độ phơi sáng, chi tiết không gian và thay đổi thời gian chỉ ảnh hưởng đến cách phân bổ ngân sách khung hình 1–16 hiện có. Một phân đoạn được cố định hoàn toàn được giới hạn ở một khung hình, trong khi các phân đoạn không bị cố định sẽ cạnh tranh để giành được ngân sách còn lại. Khi ranh giới vượt quá số lượng khung hình, phạm vi phủ sóng dòng thời gian thống nhất được giữ lại để các lần cắt sớm nhanh chóng không thể che giấu một đoạn kéo dài. Các ranh giới cảnh trong độ phân giải phân tích 1 giây của ranh giới cố định được hợp nhất.

Thiếu bộ lọc, bằng chứng malformed/empty, lỗi phát hiện hoặc thời gian chờ phân tích trước bị chặn không mở được chính sách điểm giữa thống nhất chính xác. Thời hạn hủy bỏ của người gọi hoặc thời hạn môi giới không mở được: nó chấm dứt quy trình con đang hoạt động, ngăn chặn việc trích xuất khung sau này và cây tạm thời riêng tư bị xóa trong `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` tạo ra các cố định FFmpeg thực mang tính xác định để tiết kiệm cuộc gọi phụ đề sau khi loại bỏ, phân bổ ngân sách chuyển động dày đặc, bằng chứng blur/exposure/SI-TI, cắt giảm nhanh chóng với phần đuôi dài và dương tính giả mờ dần. Nó ghi lại thời gian tường phân tích trước và khi có sẵn `/usr/bin/time`, CPU con và RSS đỉnh. Việc kiểm tra chất lượng của nó chỉ mang tính chất oracle về cấu trúc. Chất lượng mô hình phụ đề thực vẫn là `HOLD` vì dây nịt này không có điểm cuối được ủy quyền hoặc đánh giá bị đóng băng. Tiết kiệm tiền cũng vẫn là `HOLD` trừ khi `--caption-cost-per-call-usd` cung cấp ước tính dương rõ ràng cho mỗi cuộc gọi; kịch bản không bao giờ tạo ra một trong hai kết quả.

Mỗi khung được giới hạn ở 4 MiB, tất cả các khung thô cùng nhau ở 23 MiB và phản hồi của nhà môi giới được tuần tự hóa ở 32 MiB. Một thư mục tạm thời riêng tư sẽ bị xóa trong `finally`. OmniRoute không gói FFmpeg và không chấp nhận đường dẫn thực thi tùy chỉnh. Trước khi tạo chú thích, cầu nối sẽ áp dụng một quy trình loại bỏ trùng lặp hình ảnh thận trọng: mỗi JPEG được giảm xuống bộ đệm thang độ xám 16 × 16 và chỉ được so sánh với khung hình cuối cùng được giữ lại. Đối với ngân sách phụ đề được yêu cầu trên một khung, việc trích xuất sẽ cung cấp nhóm ứng viên giới hạn lên tới gấp đôi ngân sách đó và không bao giờ nhiều hơn 16 khung hình. Giới hạn được yêu cầu chỉ được áp dụng sau khi loại bỏ trùng lặp, với các ứng cử viên được chọn đầu tiên và cuối cùng được giữ nguyên trong quá trình giảm dần cuối cùng khi ngân sách ít nhất là hai. Chính sách `grayscale-16x16-mean-cells-v2` được phiên bản sử dụng giá trị delta độ sáng trung bình lớn hơn và tỷ lệ các ô hình thu nhỏ có delta được chuẩn hóa ít nhất là 0,05. Ngưỡng trùng lặp là hằng số 0,04, được chọn để dự đoán thay vì hiển thị dưới dạng cài đặt thời gian chạy. Tín hiệu có độ tương phản cao thứ cấp này duy trì chuyển động nhỏ và những thay đổi văn bản hiển thị mà sự so sánh chỉ có ý nghĩa có thể ẩn đi. Lỗi bộ so sánh hoặc bộ giải mã không mở được và giữ nguyên phạm vi bảo hiểm. Siêu dữ liệu đầu ra phân tách các ứng cử viên được trích xuất, các khung được sử dụng thành công và loại bỏ các bản sao trực quan.

Phần video được đánh dấu rõ ràng có thể yêu cầu bảng liên hệ có dấu thời gian. Cầu xây dựng tối đa lưới JPEG 4 cột, 16 khung. Mỗi ô 512 pixel ghi dấu thời gian nguồn của nó thành dải dưới cùng có độ tương phản cao, trong khi các dấu thời gian tương tự vẫn giữ nguyên trong siêu dữ liệu văn bản để liên kết và kiểm tra xuôi dòng. JPEG hoàn chỉnh vẫn được giới hạn ở mức 32 MiB. Nếu `sharp` không thể giải mã hoặc soạn lưới, cầu sẽ quay trở lại các khung JPEG riêng lẻ; việc hủy bỏ của khách hàng vẫn lan truyền thông qua thao tác trên trang tính.

Bằng chứng quảng cáo được cố tình tách biệt khỏi điểm chuẩn vi mô của thành phần tổng hợp. `scripts/perf/video-bridge-contact-sheet-eval.ts` xác định khai thác A/B theo phiên bản lược đồ cho các mô hình tầm nhìn tương thích với OpenAI thực. Nó đo lường các mã thông báo do nhà cung cấp báo cáo, độ trễ tường từ đầu đến cuối (bao gồm cả thành phần trang tính), số lượng cuộc gọi mô hình và khả năng lưu giữ dữ kiện được xác định theo bảng kê khai. Phản hồi của mô hình thô không được ghi vào báo cáo; chỉ các bản tóm tắt SHA-256 và IDs thực tế phù hợp mới được giữ lại. Bộ khai thác không thực hiện cuộc gọi mạng hoặc mô hình trả phí trừ khi `--execute-real` được thông qua và `--model`, `OMNIROUTE_BASE_URL` và `OMNIROUTE_API_KEY` được định cấu hình. Nếu không có hoạt động thực sự rõ ràng đó, kết quả mà máy có thể đọc được vẫn là `HOLD`; riêng các phép đo payload/call-count tổng hợp không phải là bằng chứng khuyến khích.

Người gọi có thể đính kèm mảng `transcript.cues` tùy chọn vào phần video được hỗ trợ khi họ đã có văn bản được căn chỉnh. Mỗi tín hiệu phải mang `text`, một khoảng `start`/`end` hữu hạn bên trong khoảng thời gian được thăm dò và một `source` được đưa vào danh sách trắng (`client`, `embedded` hoặc `audio-bridge`); `confidence` mặc định là `1` và phải nằm trong khoảng `0` và `1`. Các tín hiệu trùng lặp chính xác được thu gọn. OmniRoute không bao giờ bắt đầu phiên âm từ siêu dữ liệu này: các tín hiệu đã xác thực được sao chép vào kết quả được mô tả kèm theo nguồn, độ tin cậy và khoảng thời gian, đồng thời được hiển thị dưới dạng quan sát không đáng tin cậy cùng với chú thích khung. Văn bản không hợp lệ, nằm ngoài phạm vi hoặc không có xuất xứ sẽ bị từ chối thay vì được trộn vào luồng phụ đề. Cả hai kênh bản ghi nội dung yêu cầu đều chuẩn hóa nguồn gốc được cung cấp cho `client`, bao gồm các nhãn `embedded` hoặc `audio-bridge` tự xác nhận. Chỉ bộ điều hợp do máy chủ sở hữu mới có thể gán các nhãn đáng tin cậy đó thông qua đối số `trustedSource` chỉ có mã; trường JSON yêu cầu không thể tiếp cận đối số đó. Văn bản chép lại vẫn là nội dung có nguồn gốc từ phương tiện truyền thông không đáng tin cậy, bất kể nguồn gốc của nó và không bao giờ được xác định ủy quyền.

Người gọi nâng cao có thể cung cấp bản nhạc `audioTranscript` cho cùng một video; nó được coi là văn bản do khách hàng cung cấp chứ không phải bằng chứng về việc sao chép từ máy chủ. Đường nối tổng hợp chạy các quan sát hình ảnh và âm thanh theo một thời hạn và tín hiệu hủy bỏ, sắp xếp chúng theo dòng thời gian chung, thu gọn các bản sao chính xác và báo cáo một phần kết quả khi chỉ một bên thành công. Một `audioTranscript` không hợp lệ sẽ giảm xuống thành kết quả một phần — mô tả trực quan được giữ lại và nhánh âm thanh ghi lại mã lỗi đã được lọc sạch — thay vì làm hỏng toàn bộ video. Tính khả dụng trên mỗi nhánh, cờ một phần và mã lỗi đã được chọn lọc được giữ nguyên trong kết quả được mô tả, trong siêu dữ liệu lan can (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), trong siêu dữ liệu bộ nhớ đệm kết quả và trong bộ đếm tổng hợp cầu nối. Đường dẫn Cầu Video mặc định không gọi tính năng chuyển lời nói thành văn bản hoặc tải xuống bản sao phương tiện thứ hai; không có bản nhạc rõ ràng đó, nó vẫn chỉ có video.

**Lưu giữ bản ghi (#12150 P1).** Điều này tự động áp dụng bất cứ khi nào Cầu video (tự chọn tham gia) hiển thị bản ghi, tín hiệu — không có cờ lưu giữ riêng. Khi một yêu cầu hiển thị bất kỳ tín hiệu phiên âm nào ( `transcript` do người gọi khai báo hoặc hợp nhất `audioTranscript`), lan can sẽ đánh dấu nó `videoBridgeObserved` và tạo ra một bóng được xử lý lại của mô tả video — một kết xuất giống hệt nhau trong đó nội dung văn bản tự do của mọi tín hiệu được thay thế bằng `[redacted-video-transcript]`, được xây dựng bằng cách thay thế trường tín hiệu có cấu trúc trước khi chuỗi được tập hợp (không bao giờ bằng cách phân tích cú pháp văn bản phẳng, do đó không có nội dung tín hiệu — đối nghịch hoặc thông thường, bao gồm cả nội dung chứa `]` chẳng hạn như `[inaudible]`/`[music]` — có thể tồn tại). Nội dung yêu cầu nhật ký cuộc gọi liên tục hoán đổi từng phần văn bản có nguồn gốc từ video cho phần bóng được xử lý lại đó, khớp với sự bình đẳng về nội dung; neo `fullText` được đọc lại từ tải trọng lan can bảo vệ trước cuộc gọi đã hoàn thành, do đó, trận đấu vẫn thành công sau các lan can chuỗi sau này ( PII và mặt nạ thông tin xác thực, mức độ ưu tiên 10/95) viết lại văn bản mô tả tại chỗ và sau khi tiêm system-prompt/handoff/memory sẽ định hình lại mảng thông báo. Nội dung được gửi ngược dòng tới mô hình không thay đổi. Một yêu cầu được quan sát cũng không có Bộ nhớ lâu dài (cả trích xuất bắt nguồn từ yêu cầu và phản hồi đều bị bỏ qua), do đó, câu trả lời của chính mô hình không thể lặp lại văn bản bản ghi vào Bộ nhớ.

**Trường video thô (#12430).** Khi cầu nối được bật và hỗ trợ video gốc không xác định hoặc không có, các trường `transcript`/`audioTranscript` được xác định cũng kích hoạt `videoBridgeObserved`, ngay cả sau khi mô tả bị lỗi hoặc giới hạn `maxVideos`. `null` và số chuỗi trống; các trường vắng mặt và siêu dữ liệu không phải video thì không. Các bản sao được giữ lại sẽ loại bỏ các trường này hoặc bỏ qua yêu cầu và caches/Memory sẽ bị bỏ qua.

Trên các đường dẫn dự phòng đó, tín hiệu người gọi hợp lệ sẽ trở thành các phần `text`/`input_text` được hỗ trợ thay vì các trường nhà cung cấp không chuẩn. Cả hai bản nhạc do yêu cầu cung cấp vẫn là các quan sát `client` không đáng tin cậy, kèm theo cảnh báo rõ ràng rằng video không được mô tả và dấu thời gian không được xác minh dựa trên phương tiện truyền thông. Tổng ngân sách 256-cue/64-KiB và mỗi tín hiệu hiện có áp dụng cho cả hai tuyến đường; dấu thời gian phải vừa với giới hạn 600 giây của nhà môi giới và bất kỳ cửa sổ tiêu điểm nào được cung cấp. Các bản nhạc không hợp lệ sẽ bị loại bỏ, không được chuyển tiếp dưới dạng văn bản tùy ý; anh chị em hợp lệ vẫn có thể được sử dụng trừ khi vượt quá ngân sách kết hợp của họ. trường Null/empty không thêm văn bản. Không có bản ghi hoặc tìm nạp phương tiện nào được thêm vào bởi dự phòng này. Các trường mở rộng bản ghi bị xóa khỏi sóng mang video dự phòng và các đối tượng `video_url`/`source` của nó. Danh sách cho phép dây OpenAI vẫn nghiêm ngặt; Các nhà cung cấp dịch vụ video gốc không xác định vẫn có sẵn và các mục tiêu chỉ có văn bản đã biết sẽ giữ các điểm đánh dấu an toàn. Bóng biên tập có cấu trúc bảo vệ văn bản bản ghi được nối thêm, trong khi yêu cầu ban đầu do người gọi sở hữu vẫn không thay đổi. Các mục tiêu được hỗ trợ gốc và các cầu nối bị vô hiệu hóa vẫn giữ nguyên hành vi bỏ qua hiện có của chúng.

Các bản sao được giữ lại bổ sung sử dụng cùng một tín hiệu yêu cầu được quan sát. Ảnh chụp nhanh yêu cầu của khách hàng trước lan can thô, yêu cầu đang chờ xử lý trong bộ nhớ và nhật ký yêu cầu bị từ chối sớm thay thế về mặt cấu trúc các trường bản ghi trong các phần video; các lời nhắc chuỗi được tổng hợp bởi các giai đoạn quy trình và chuyển giao ngữ cảnh được sắp xếp lại ở phần chìm nội dung yêu cầu liên tục. Điểm đánh dấu `video_content_removed` vẫn tồn tại làm cho việc tiếp tục `previous_response_id` không đóng được thay vì xây dựng lại văn bản đã bị loại bỏ có chủ ý. Nếu một yêu cầu được quan sát mất bóng phân phối từng phần trước khi ghi nhật ký hoặc thậm chí một trong số bóng video không khớp sau khi thay đổi yêu cầu sau đó, nội dung yêu cầu được giữ lại sẽ bị bỏ qua hoàn toàn thay vì giữ lại bản ghi được biên tập lại một phần.

Đối với một yêu cầu được quan sát, phản hồi của mô hình có thể trích dẫn bất kỳ phần nào của bản ghi mà không có ranh giới tín hiệu có cấu trúc. Do đó, nhật ký cuộc gọi `responseBody` liên tục của nó được thay thế bằng một điểm đánh dấu thiếu sót; tạo phẩm đường ống chi tiết (có thể bao gồm nội dung upstream/client và các đoạn luồng) không được giữ lại. Bộ nhớ đệm ngữ nghĩa, bình thường và phát lại lý luận bỏ qua việc đọc và ghi cho yêu cầu đó. Yêu cầu của nhà cung cấp và phản hồi mà khách hàng có thể nhìn thấy vẫn không thay đổi. Các byte lưu giữ ban đầu sẽ bị rút khỏi bộ đệm tạm thời khi thành phần chi tiết bị bỏ qua. Cảnh báo EventStream không đúng định dạng của Kiro chỉ báo cáo số byte tải trọng, không bao giờ báo cáo nội dung của nó hoặc lỗi thô của trình phân tích cú JSON. Điều này không khẳng định rằng mọi chẩn đoán provider/plugin không liên quan đều đã được kiểm tra; quá trình quét phần chìm được giữ lại rộng hơn được theo dõi trong #11658.

Vòng đời `/api/modality-bridge/video/drilldown` bên trong là một chất nền bộ nhớ đệm loopback/token-authenticated riêng biệt. Mọi thao tác cũng yêu cầu một hiệu trưởng mờ đục chính tắc ID. Trước khi kích hoạt lệnh gọi sản xuất, nó phải lấy ID đó từ đối tượng thuê được xác thực và không bao giờ được chuyển tiếp giá trị do khách hàng chọn. Các khóa bộ đệm liên kết hiệu trưởng đó với phiên chuẩn và tham chiếu video IDs, chỉ lưu trữ các khóa SHA-256-derived của chúng và đặt phạm vi cả đọc và xóa vào cùng một hiệu trưởng. Bộ đệm lưu trữ tối đa 16 khung JPEG dẫn xuất cho mỗi mục nhập, hết hạn sau mười phút và hỗ trợ đọc `start`/`end` có giới hạn hoặc xóa phiên rõ ràng.

Mỗi hiệu trưởng được giới hạn ở 16 mục và 64 MiB dữ liệu JPEG chuẩn. Các giới hạn này độc lập với trần 64-entry/256 MiB toàn cầu: áp lực hạn ngạch gốc chỉ trục xuất các mục nhập ít được sử dụng gần đây nhất của tiền gốc đó trước khi việc trục xuất LRU toàn cầu được xem xét. Các mục nhập hết hạn sẽ bị quét khỏi cả hoạt động tính toán gốc và tính toán toàn cầu đối với hoạt động của bộ nhớ đệm, trong khi việc hủy và xác thực không thực hiện thay thế một phần.

Bộ đệm từ chối Base64 không chính tắc, phần đệm quá mức, phương tiện không phải JPEG, JPEGs không đúng định dạng hoặc bị cắt bớt và JPEGs tạo ra cảnh báo trong quá trình giải mã `sharp` hình ảnh đầy đủ được giới hạn. Nó mã hóa lại từng hình ảnh được chấp nhận dưới dạng JPEG chuẩn, lấy chiều rộng và chiều cao từ các byte được giải mã thay vì tin cậy các trường của người gọi và loại bỏ mọi byte đa âm ở cuối thay vì giữ lại chúng. Chỉ có bộ đệm nén chuẩn được giới hạn mới được tính cho cả hai hạn ngạch. Giới hạn dây JSON bao gồm chi phí Base64 cho trần đầu vào được giải mã 32 MiB. Mọi dẫn xuất được lưu trữ đều ghi lại JPEG format/resolution đã được xác thực, chính sách lấy mẫu, phiên bản phái sinh, thời gian tạo, hàm băm nội dung do máy chủ tính toán và tham chiếu gốc đã băm cùng với hàm băm nội dung gốc của người gọi đáng tin cậy. Việc hủy bỏ được kiểm tra giữa các giai đoạn decode/hash không đồng bộ trước khi xác nhận bộ nhớ đệm nguyên tử.

Đợt này chưa kết nối nhà sản xuất sản xuất với tuyến đường và không cung cấp lựa chọn biến thể có nhiều độ phân giải. Do đó, đường dẫn yêu cầu Cầu Video minh bạch không phát sinh thêm công việc nào, trong khi dẫn xuất chính ràng buộc đối tượng thuê và vòng đời đa độ phân giải FU-08 đầy đủ vẫn duy trì công việc tiếp theo rõ ràng thay vì được ghi lại dưới dạng hành vi hoàn chỉnh.

Các khung hình được chú thích tuần tự với mẫu Video đã định cấu hình. Ghi đè Video trống sẽ kế thừa cài đặt Tầm nhìn; nếu cả hai đều trống, bộ định tuyến tự động Vision sẽ chọn kiểu máy có khả năng hiển thị hiệu quả. Chú thích thành công sẽ thay thế phần gốc bằng tiền tố `[Video description:` ổn định. Tiền tố này cũng đánh dấu văn bản là quan sát có nguồn gốc từ phương tiện truyền thông không đáng tin cậy và yêu cầu các mô hình xuôi dòng không làm theo hướng dẫn tìm thấy trong phương tiện truyền thông. Các khóa bộ đệm phụ đề khung bao gồm các byte JPEG, dấu nhắc, dấu thời gian và mô hình hiệu quả; chỉ những chú thích thành công mới được lưu vào bộ nhớ đệm. Các mục trong bộ nhớ đệm giữ lại mô hình sản xuất thành công thực tế, bao gồm cả mô hình dự phòng; cây cầu báo cáo `mixed` khi các khung khác nhau được tạo ra bởi các mô hình khác nhau. Lần truy cập bộ đệm sẽ sử dụng lại danh tính nhà sản xuất đó thay vì gắn nhãn lại làm kế hoạch định tuyến được yêu cầu. Bộ nhớ đệm kết quả của toàn bộ video được khóa trên mọi đầu vào làm thay đổi lời nhắc — đầu ra, mô hình hiệu quả, chính sách lấy mẫu, số khung, chế độ phân tích ngữ nghĩa, dấu vân tay SHA-256 của gợi ý tiêu điểm đã chuẩn hóa, cửa sổ tiêu điểm, `transcript`, `audioTranscript` và cờ bảng liên hệ — nên việc thay đổi bất kỳ thứ nguyên nào trong số đó là lỗi bộ nhớ đệm, không bao giờ là tái sử dụng cũ. Phiên bản chính sách loại bỏ trùng lặp trực quan, ngưỡng và số lượng khung ứng viên bị giới hạn cũng được thể hiện rõ ràng trong siêu dữ liệu và khóa bộ đệm kết quả; do đó, thay đổi chính sách không thể sử dụng lại mô tả cũ của toàn bộ video. Siêu dữ liệu v4 của bộ đệm kết quả giữ chế độ và dấu vân tay, không bao giờ là tác vụ thô của người dùng. Siêu dữ liệu của Guardrail báo cáo cả chế độ phân tích được yêu cầu và chế độ phân tích hiệu quả; chế độ `focused` được yêu cầu mà không có văn bản người dùng có thể sử dụng được sẽ được báo cáo là `full` một cách hiệu quả.

Lan can trích xuất mọi phần video được hỗ trợ nhưng không mô tả nhiều hơn `modalityBridgeVideoMaxVideos`. Đối với mục tiêu đã được chứng minh là có `supportsVideo === false`, các video không thành công và vượt quá giới hạn sẽ trở thành các điểm đánh dấu văn bản an toàn rõ ràng nên không có video thô nào tồn tại. Khi không xác định được khả năng, những bộ phận đó sẽ giữ lại sóng mang video của chúng; mọi bản ghi dự phòng đều tuân theo chuyển đổi văn bản giới hạn ở trên. Mục tiêu có `supportsVideo === true` bỏ qua cây cầu. Tín hiệu hủy bỏ yêu cầu của khách hàng lan truyền thông qua tải xuống, hàng đợi môi giới, quy trình con và lệnh gọi phụ đề; hủy bỏ dừng giữa các video và không bao giờ mở được phương tiện thô.

Cài đặt thời gian chạy được DB hỗ trợ và xác thực Zod:

| Chìa khóa                           | Mặc định    | Phạm vi/hành vi                                                                                            |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Thời gian chạy tùy chọn, chọn tham gia                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` giữ lại chú thích chung; `focused` sử dụng bối cảnh người dùng mới nhất bị chặn, không đáng tin cậy |
| `modalityBridgeVideoModel`          | `""`        | Kế thừa mô hình Vision Bridge                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` hoặc `segment_aware` tỷ lệ ; lỗi máy dò rơi trở lại `uniform`                     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 mili giây                                                                                      |

Các giá trị thời gian chờ video vẫn tồn tại kế thừa trên 120 giây được giới hạn theo thời hạn của nhà môi giới; cài đặt mới ghi trên giới hạn đó sẽ bị từ chối. `GET /api/modality-bridge/video/runtime` yêu cầu vị trí lặp lại được đóng dấu đáng tin cậy trước khi xác thực hoặc thăm dò thời gian chạy, sau đó yêu cầu xác thực quản lý. Nó chỉ trả về `available`, các phiên bản FFmpeg/ffprobe đã được làm sạch và một lý do cố định khi thời gian chạy không khả dụng. Điểm cuối trích xuất nội bộ không phải là API tải lên công khai : độ bão hòa hàng đợi trả về `503` cộng `Retry-After`, ngắt kết nối người gọi trả về `499` và thời hạn cố định của nhà môi giới trả về `504`. Các phản hồi được chuyển đổi sẽ thêm `video->text;model=<visionModel>;parts=<videos>` vào tiêu đề `x-omniroute-modality-bridge` trung tâm mà không xóa các phân đoạn Tầm nhìn hoặc Âm thanh.

### Mặt nạ PII (`piiMasker.ts`)

Chạy tiếp** cả hai** các giai đoạn.

- **`preCall`** sao chép tải trọng, đi `system`, `messages`, `input` và `prompt` (bao gồm các mục chuỗi đơn giản) và áp dụng `processPII()` (từ `@/shared/utils/inputSanitizer`) cho các trường chuỗi `content`/`text`. Khi `PII_REDACTION_ENABLED=true`, PII được phát hiện sẽ được loại bỏ trong tải trọng gửi đi. Điều này độc lập với `INPUT_SANITIZER_MODE` (chỉ kiểm soát chính sách nhắc nhở). Khi tính năng biên tập bị tắt, tính năng phát hiện bản ghi cuộc gọi sẽ được tính mà không cần ghi lại nội dung.
- **`postCall`** sao chép sâu phản hồi, chạy `sanitizePIIResponse()` cộng với trình che dấu hình dạng API phản hồi (`maskResponsesOutput` — bao gồm `output_text` và `output[].content[].text`). Nếu có bất kỳ sự chỉnh sửa nào xảy ra, phản hồi đã sửa đổi sẽ thay thế phản hồi ban đầu.

Lan can không bao giờ chặn; nó chỉ chú thích (`meta.detections`, `meta.redacted`) hoặc viết lại.

#### Lựa chọn theo loại, mẫu tùy chỉnh và bộ đếm phát hiện

**Bảng điều khiển → Cài → Bảo mật → PII che** chọn _cái_được che giấu. Nó không bật mặt nạ: đó vẫn là `PII_REDACTION_ENABLED` (yêu cầu) và `PII_RESPONSE_SANITIZATION` (phản hồi + SSE), cả hai đều tắt theo mặc định.

- **Lựa chọn theo loại** — các id tích hợp được liệt kê trong `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Không đặt nghĩa là mọi loại (hành vi trước khi cài đặt này tồn tại). Mẫu `ssn_us` của công cụ yêu cầu ánh xạ tới `ssn`. Các mẫu (Tối thiểu, Tiêu chuẩn, Tài chính, Brazil, USA, GDPR, POPIA, Đầy đủ) chỉ điền vào các hộp kiểm trong UI.
- **mã định danh GDPR và POPIA** — mười hai id tích hợp bao gồm số nhận dạng cá nhân EU và Nam Phi (bảng bên dưới). Các biểu thức chính quy, trình xác thực và thẻ quyền hạn của chúng nằm trong một bảng, `src/shared/utils/piiPatterns.ts`, mà cả trình khử trùng phản hồi (`src/lib/piiSanitizer.ts`) và trình che dấu yêu cầu (`src/shared/utils/inputSanitizer.ts`) đều sử dụng. Một kết quả trùng khớp chỉ được xử lý lại khi người xác nhận nó chấp nhận nó; một dãy chữ số không bao giờ là đủ. Toán tử đã lưu lựa chọn thu hẹp trước khi các id này tồn tại sẽ giữ nguyên hành vi của nó cho đến khi các id mới được đánh dấu.
- **Mẫu tùy chỉnh** — lên đến 20 mẫu biểu thức chính quy hoặc ký tự đại diện (`*` = tối đa 64 ký tự không phải khoảng trắng, `?` = một). Các trận đấu trở thành `[CUSTOM_REDACTED]`. Mọi mẫu đều trải qua `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): tối đa 500 ký tự, cờ giới hạn ở `g i m s u`, phải biên dịch, phải vượt qua `safe-regex` (quay ngược thảm khốc) và không được khớp với một chuỗi trống hoặc trình giữ chỗ biên tập lại. Một mẫu không thành công sẽ bị từ chối khi được lưu và khi kiểm tra, còn một hàng được lưu trữ không thành công sẽ bị bỏ qua trong thời gian chạy thay vì được biên dịch. Các mẫu tùy chỉnh chỉ chạy khi mặt nạ được bật.
- **Bộ đếm phát hiện** số lượng — trên mỗi loại (giá trị không bao giờ khớp), được giữ trong bộ nhớ và đặt lại khi khởi động lại (`src/lib/pii/piiDetectionStats.ts`). Chúng chỉ tăng khi mặt nạ được bật.

Các cài đặt nằm trong bảng `key_value` (không gian tên `pii_settings`, `src/lib/db/piiSettings.ts`) và được đọc qua bộ đệm 1 giây. API:

| Phương pháp | Con đường                | Mục đích                                                             |
| ----------- | ------------------------ | -------------------------------------------------------------------- |
| `GET`       | `/api/settings/pii`      | Trạng thái cờ, `enabledTypes`, `customPatterns`, bộ đếm phát hiện    |
| `PUT`       | `/api/settings/pii`      | Thay thế `enabledTypes` (`null` = tất cả) and/or `customPatterns`    |
| `POST`      | `/api/settings/pii/test` | Chạy khô một mẫu so với mẫu có tối đa 8 KB; không có gì được lưu trữ |

Cả ba đều yêu cầu xác thực quản lý và xác thực nội dung bằng Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### mã định danh GDPR (EU) và POPIA (Nam Phi)

| Nhận dạng           | Mã định danh                | Xác thực                                                                                          |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                        | Quốc gia đã biết, độ dài chính xác của quốc gia đó, ISO 13616 MOD-97-10                           |
| `eu_vat`            | số EU VAT                   | Tiền tố trạng thái thành viên đã biết và định dạng số của trạng thái đó (không cần tra cứu VIES ) |
| `es_dni_nie`        | DNI / NIE tiếng Tây Ban Nha | Thư kiểm soát (giá trị mod 23); NIE là `X/Y/Z` + 7 chữ số                                         |
| `it_codice_fiscale` | Codice Fiscale của Ý        | Thư kiểm soát từ bảng vị trí odd/even                                                             |
| `pl_pesel`          | PESEL Lan                   | Tổng kiểm tra có trọng số và ngày sinh được mã hóa tồn tại                                        |
| `nl_bsn`            | BSN Hà Lan                  | 11 bằng chứng (trọng lượng 9..2, -1)                                                              |
| `de_steuer_id`      | Steuer-ID tiếng Đức         | ISO 7064 Mod 11,10 cộng với quy tắc cấu trúc chữ số (không có số 0 đứng đầu)                      |
| `se_personnummer`   | người Thụy Điển             | Luhn trong mười chữ số cuối cùng và ngày sinh hợp lý (10 hoặc 12 chữ số)                          |
| `za_id`             | Số ID Nam Phi               | Luhn trên tất cả 13 chữ số, ngày sinh hợp lệ month/day, chữ số công dân 0 hoặc 1                  |
| `za_phone`          | Điện thoại Nam Phi          | tiền tố `+27` / `27` hoặc dạng `0..` quốc gia được viết bằng dấu cách hoặc dấu gạch nối           |
| `za_vat`            | Số VAT Nam Phi              | 10 chữ số bắt đầu bằng `4`** Và** "VAT" / "BTW" trong 48 ký tự trước                              |
| `za_tax_ref`        | Giới thiệu thuế Nam Phi.    | 10 chữ số bắt đầu từ `0`-`3`, Luhn,** Và** "tax" / "SARS" trong 48 ký tự trước                    |

Bởi vì các định dạng chỉ có chữ số xung đột với số thứ tự, số bản dựng và dấu thời gian, nên những định dạng yếu nhất (`za_vat`, `za_tax_ref`) cần gợi ý từ khóa và số `0..` chỉ có mười chữ số không được coi là số điện thoại Nam Phi. IBANs cách nhau (`GB29 NWBK ...`) không khớp. Trên đường dẫn phát trực tuyến, tín hiệu chỉ được tra cứu bên trong đoạn hiện tại. Các id nằm phía trước các mẫu điện thoại chung, do đó, số nhận dạng được xác thực sẽ giữ phần giữ chỗ riêng của nó (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Các mẫu `gdpr` và `popia` lần lượt chọn id EU và Nam Phi. Bản thân việc che dấu vẫn được chọn tham gia (Quy tắc cứng số 20): không có gì ở đây thay đổi mặc định cờ tính năng.

### Tiêm nhanh (`promptInjection.ts`)

Phát hiện các cấu trúc đối nghịch trong nội dung do người dùng cung cấp và thực thi chính sách đã định cấu hình. Hành vi được điều khiển bởi các biến môi trường và các tùy chọn hàm tạo:

| Cài đặt     | biến thể Env                                                                                              | Mặc định | Tác dụng                                                                                                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đã bật      | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Khi `false`, lan can bị đoản mạch.                                                                                                                                                                    |
| Cách thức   | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Chính sách tiêm: `block`, `warn` hoặc `log`. (`redact` được chấp nhận để tương thích ngược nhưng không** không** văn bản tiêm dải; yêu cầu viết lại PII được điều khiển bởi `PII_REDACTION_ENABLED`.) |
| Ngưỡng chặn | tùy chọn `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (bí danh `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mức độ nghiêm trọng tối thiểu cần thiết để chặn. Phương tiện theo mặc định chỉ được quan sát.                                                                                                         |

**Ưu tiên chế độ** (`getMode`): người gọi `options.mode` → `INJECTION_GUARD_MODE`** ghi đè cờ tính năng DB** (Cài đặt → trên bảng điều khiển → Cờ tính năng) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Do đó, việc ghi đè bảng điều khiển sẽ giành chiến thắng trước các biến env, do đó, Cờ tính năng UI sẽ điều khiển trực tiếp bộ bảo vệ đang chạy (không cần khởi động lại). Quá trình đọc DB không an toàn: nếu có lỗi, bộ bảo vệ sẽ quay trở lại hành vi dựa trên env và khi không đặt ghi đè, hành vi sẽ giống hệt với độ phân giải chỉ dành cho env.

Nguồn phát hiện:

1. `sanitizeRequest()` từ `@/shared/utils/inputSanitizer` (bộ trình phát hiện dùng chung được sử dụng ở nơi khác trong quy trình).
2. `DEFAULT_GUARD_PATTERNS` tích hợp (hiện tại là `system_override_inline` và `markdown_system_block`, cả hai đều có mức độ nghiêm trọng `high` ).
3. `customPatterns` tùy chọn được chuyển qua các tùy chọn hàm tạo (chuỗi, biểu thức chính quy hoặc bản ghi `{ name, pattern, severity }` ).

Khi `mode === "block"`** Và** ít nhất một phát hiện đáp ứng ngưỡng nghiêm trọng, `preCall` trả về `{ block: true, message: "Request rejected: suspicious content detected" }`. Trong chế độ `warn`/`log`, lan can ghi nhật ký nhưng cho phép cuộc gọi. Trình trợ giúp chia sẻ `evaluatePromptInjection()` cũng được xuất cho những người gọi cần đánh giá lời nhắc mà không cần thông qua sổ đăng ký.

**Quét bị ràng buộc (v3.8.20):** máy dò chỉ kiểm tra** 16 KB đầu tiên** của văn bản nhắc nhở được nối — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) trong `src/shared/utils/inputSanitizer.ts`. Cả `detectInjection()` và `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` trước khi chạy vòng lặp mẫu. Lệnh chèn nằm gần đầu đầu vào, do đó lệnh này giới hạn biểu thức chính CPU/GC trên tải trọng nhiều trăm KB mà không làm suy yếu khả năng phát hiện (xem #3932, #4041).

### Trình che dấu thông tin xác thực (`credentialMasker.ts`)

Chạy tiếp** cả hai** các giai đoạn, cuối cùng trong chuỗi mặc định (ưu tiên `95`). Sắp xếp lại các mẫu khóa API/mã thông báo bí mật nổi tiếng từ tải trọng gửi đi (nội dung tin nhắn, đối số lệnh gọi công cụ, kết quả công cụ)** Và** phản hồi của nhà cung cấp, do đó thông tin xác thực được dán vào lời nhắc (hoặc được phản hồi bởi kết quả của công cụ) không bị rò rỉ cho nhà cung cấp ngược dòng hoặc quay lại máy khách.

- **Chỉ chọn tham gia** , quy ước tương tự như xử lý PII (Quy tắc cứng #20-liền kề): bị vô hiệu hóa trừ khi `settings.credentialRedactionEnabled === true`** hoặc** `CREDENTIAL_REDACTION_ENABLED=true`. Khi tắt nó đi, lan can sẽ là một — không hoạt động, nó không bao giờ chặn và không bao giờ viết lại.
- `redactCredentials()` đi qua cây payload/response đầy đủ (`walkValue()`, an toàn ô nhiễm nguyên mẫu, an toàn chu kỳ thông qua `WeakSet`) và thay thế các kết quả khớp bằng trình giữ chỗ `[REDACTED:<type>]`, chỉ nhân bản các nhánh thực sự đã thay đổi.
- `CREDENTIAL_PATTERNS` bao gồm các khóa của nhà cung cấp LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), mã thông báo VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), khóa thanh toán (Stripe, Square), khóa đám mây ( khóa truy cập AWS, Twilio, SendGrid, Mailgun), khóa riêng / JWTs, chuỗi kết nối mang thông tin xác thực (`mongodb://user:pass@...`, v.v.) và mẫu giá trị tiêu đề `Authorization`/`x-api-key`/`api-key`/`apikey` chung. Các khóa có hình tiêu đề (`authorization`, `x-api-key`, `api-key`, `apikey`) được sắp xếp lại về mặt cấu trúc (chỉ giá trị, tiền tố lược đồ như `Bearer `/`Basic ` được giữ nguyên) thay vì thông qua biểu thức chính quy văn bản chung.
- Lan can không bao giờ chặn; nó chỉ viết lại (`modifiedPayload` / `modifiedResponse`) và chú thích (`meta.credentialsRedacted`, `meta.count`).

Bảo vệ hồi quy: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true sẽ ngắt mạch chuỗi
  message?: string; // được hiển thị khi chặn
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // do preCall trả về để ghi đè request
  modifiedResponse?: TValue; // do postCall trả về để ghi đè response
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

Một guardrail báo hiệu "không thay đổi" bằng cách trả về `void`, `{}`, hoặc
`{ block: false }`. Việc trả về `modifiedPayload`/`modifiedResponse` sẽ thay thế
giá trị đang chảy qua chuỗi cho các guardrail phía sau.
`signal?: AbortSignal` mang vòng đời của caller vào trong các guardrail. Việc hủy request là ngoại lệ fail-open có chủ đích: các media bridge dừng xử lý và dọn dẹp mà không khôi phục media thô về một đích đã biết là không hỗ trợ nó.

## Registry (`registry.ts`)

Singleton `guardrailRegistry` cung cấp:

- `register(guardrail)` — thêm (hoặc thay thế theo tên đã chuẩn hóa) một guardrail và
  sắp xếp lại theo `priority` tăng dần.
- `clear()` / `list()` — các hàm tiện ích quản trị.
- `runPreCallHooks(payload, context)` — duyệt qua các guardrail đang hoạt động, chuyền
  payload qua `modifiedPayload`, và dừng lại ở `block: true` đầu tiên.
- `runPostCallHooks(response, context)` — luồng tương tự ở phía response.
- `resetGuardrailsForTests({ registerDefaults })` — xóa trạng thái và tùy chọn
  đăng ký lại các guardrail mặc định để cô lập test một cách sạch sẽ.

Cả hai runner đều trả về `{ blocked, payload|response, results, guardrail?, message? }`
trong đó `results` là một mảng các bản ghi `GuardrailExecutionResult` bao gồm
các trường `blocked`, `skipped`, `modified`, `error`, và `meta` cho từng guardrail,
rất hữu ích cho việc truy vết.

### Tắt guardrail theo từng request

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` tổng hợp một
danh sách đã loại bỏ trùng lặp gồm các tên guardrail cần được bỏ qua cho
request hiện tại. Có năm kênh, được đọc theo thứ tự này và hợp nhất thành một danh sách
(lần xuất hiện đầu tiên được ưu tiên khi loại bỏ trùng lặp):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` trong body của request (cấp cao nhất)
3. `metadata.disabledGuardrails` trong body của request (chỉ khi `metadata` là một object)
4. Header `x-omniroute-disabled-guardrails`
5. Header cũ `x-disabled-guardrails`

Cả năm kênh đều được hợp nhất, bao gồm cả hai header: gửi đồng thời
`x-omniroute-disabled-guardrails` và `x-disabled-guardrails` sẽ bỏ qua hợp của
hai danh sách, và một header hiện đại rỗng không còn che giấu header cũ nữa
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), đã được sửa trong
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Giá trị có thể là mảng các chuỗi hoặc một chuỗi phân tách bằng dấu phẩy; tên được
cắt khoảng trắng và chuẩn hóa về dạng kebab-case chữ thường (`pii_masker` → `pii-masker`), và các mục
rỗng bị loại bỏ. Kết quả được truyền qua `context.disabledGuardrails`
tới registry, nơi sẽ bỏ qua các guardrail khớp (`skipped: true` trong `results`).

Danh sách tắt chỉ ảnh hưởng đến **registry**. Chế độ `block` của prompt-injection là
một ranh giới bắt buộc: middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) gọi `evaluatePromptInjection()`
mà không có bất kỳ danh sách tắt nào do caller kiểm soát (lời gọi
`resolveDisabledGuardrails({ body })` chết mà nó từng thực hiện đã bị xóa trong
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), vì vậy một request
tắt `prompt-injection` vẫn bị từ chối ở chế độ `block`. Đây là
thiết kế có chủ đích. Các kênh tắt đều do caller kiểm soát (body của request,
metadata, header), và caller không được phép tắt một biện pháp
kiểm soát bảo mật mà operator đã thiết lập
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Việc hợp nhất
header từ [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
chỉ thay đổi những guardrail nào của registry bị bỏ qua; nó không cho phép client
vượt qua middleware. Các chính sách guardrail bắt buộc theo từng key và theo từng nhóm
được theo dõi trong RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Xem [Phạm vi và giới hạn](#coverage-and-limits).

## Thứ tự thực thi

Đối với mỗi request đi qua `src/sse/handlers/chat.ts` và
`open-sse/handlers/chatCore.ts` (các route thuộc nhóm chat được liệt kê trong
[Phạm vi và giới hạn](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` xây dựng danh sách bỏ qua từ API key, body
   và header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` chạy các guardrail theo thứ
   tự ưu tiên tăng dần:
   - Các guardrail bị vô hiệu hóa được ghi lại là `skipped`.
   - `preCall` của mỗi guardrail có thể ghi đè payload thông qua
     `modifiedPayload`.
   - `block: true` đầu tiên sẽ ngắt mạch và handler trả về phản hồi từ chối
     của guardrail.
3. Payload (có thể đã bị ghi đè) đi vào định tuyến combo và điều phối
   upstream.
4. **Chỉ non-streaming:** sau khi phản hồi được tập hợp xong,
   `guardrailRegistry.runPostCallHooks(...)` chạy cùng chuỗi đó trên phản
   hồi. `block: true` tại đây sẽ loại bỏ phản hồi upstream và trả về HTTP 400. Các phản hồi streaming bỏ qua hoàn toàn bước này.

Các guardrail ném lỗi được ghi lại với `error: <message>` và được log qua
`logger.warn`, nhưng chuỗi vẫn tiếp tục — fail-open theo thiết kế.

## Phạm vi và giới hạn

Registry guardrail chỉ được nối vào pipeline chat. Các giới hạn này được ghim
bởi `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` và
`tests/unit/guardrail-pipeline-characterization.test.ts`; hãy cập nhật các test
đó một cách có chủ đích khi hành vi thay đổi.

### Vị trí các hook chạy

| Hook / điều khiển                   | Chạy trên                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                   | Các request được xử lý bởi `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (và `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, và proxy chat Telegram. Ngoài ra còn có endpoint test của dashboard `/api/guardrails/test`. Một block pre-call trả về HTTP 400. |
| `runPostCallHooks`                  | Chỉ các phản hồi chat **non-streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Các phản hồi streaming không bao giờ chạm tới nó.                                                                                                                                                                                                                                                                                          |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), được pipe trong `streamingPipeline.ts` khi `PII_RESPONSE_SANITIZATION` bật. Nó không phải là guardrail, nên các kênh vô hiệu hóa không ảnh hưởng đến nó.                                                                                                                                                                                                                     |
| Middleware injection-guard (legacy) | Mọi route `/v1` mang prompt, bao gồm cả nhóm chat (xem [phạm vi route](#injection-guard-route-coverage--red-team-phase-8--block-d)). Chỉ prompt injection.                                                                                                                                                                                                                                                                                 |

### Những gì không được bao phủ

- **Các route media, embeddings và dữ liệu** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) không bao giờ chạm tới
  registry. Không có PII masking, credential masking hay modality bridge nào
  chạy ở đó. Kiểm tra duy nhất của chúng là middleware injection-guard legacy.
- **Các phản hồi streaming** không có guardrail post-call: không có
  `pii-masker` hay `credential-masker` post-call, và không có block post-call.
  Chỉ có transform PII streaming áp dụng (khi `PII_RESPONSE_SANITIZATION`
  bật). Một credential được echo lại trong phản hồi streaming sẽ không bị che.
- **Các kênh vô hiệu hóa so với middleware (theo thiết kế):** middleware đánh
  giá prompt injection bằng lời gọi riêng tới `evaluatePromptInjection()`,
  không truyền bất kỳ danh sách vô hiệu hóa nào do caller kiểm soát. Chế độ
  `block` là một ranh giới bắt buộc mà các lệnh vô hiệu hóa do caller kiểm
  soát không thể vượt qua, kể cả trên các route nhóm chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Việc vô
  hiệu hóa `prompt-injection` chỉ bỏ qua guardrail của registry.

### Những gì nhìn thấy phản hồi trước post-call

Trên đường non-streaming, thứ tự là: trích xuất bộ nhớ → thực thi tool tích
hợp sẵn → guardrail post-call → thoát do block post-call → lưu semantic-cache.

- **Trích xuất bộ nhớ** và **thực thi công cụ** nhìn thấy phản hồi trước khi các
  guardrail sau cuộc gọi (post-call) có thể viết lại hoặc chặn nó. Kể từ
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), quá trình
  trích xuất bộ nhớ sẽ đưa văn bản đã trích xuất qua `sanitizePII` khi
  `PII_RESPONSE_SANITIZATION` được bật (cả ở chế độ streaming lẫn non-streaming), nhưng một
  phản hồi sau đó bị post-call chặn thì vẫn đã được cung cấp cho bộ nhớ và
  các công cụ.
- **Bộ nhớ đệm ngữ nghĩa** (semantic cache) lưu phản hồi sau post-call, nên nó lưu
  phản hồi đã được viết lại, và một phản hồi bị chặn sẽ không bao giờ được lưu vào cache. Các mục trong cache được
  khóa theo từng khóa API.

## Cấu hình

Các biến môi trường được đọc bởi các guardrail tích hợp sẵn:

| Biến                                  | Được sử dụng bởi          | Tác động                                                                                                      |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Đặt `false` để tắt hoàn toàn việc phát hiện.                                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Chính sách injection: `warn`, `block`, hoặc `log`. Giá trị cũ `redact` không viết lại văn bản injection.      |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Chế độ cho injection guard; đồng thời là một feature flag trong DB **ghi đè** các biến môi trường (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Mức nghiêm trọng tối thiểu mà `MODE=block` từ chối: `high` (mặc định), `medium`, hoặc `low`.                  |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Bí danh cũ của `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Khi `true`, PII trong request sẽ được che (độc lập với chế độ injection).                                     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kiểm soát hành vi của masker phía response.                                                                   |

Các guardrail của Modality Bridge đọc cấu hình runtime từ kho cài đặt
được hỗ trợ bởi DB (`getSettings()`), chứ không phải từ biến môi trường. Các khóa chính
của Vision là
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, và
`modalityBridgeCacheMaxEntries`. Các khóa cũ
`visionBridge*` chỉ được chấp nhận như phương án đọc dự phòng một chu kỳ
đã được ghi trong tài liệu; dashboard ghi bằng các khóa chính. Các giá trị mặc định
và trình phân giải fallback nằm trong `src/shared/constants/modalityBridgeDefaults.ts`, với các hằng số cũ
được giữ lại trong `src/shared/constants/visionBridgeDefaults.ts`.

Audio sử dụng `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, và `modalityBridgeAudioMaxClips`, cùng với các cài đặt
dùng chung `modalityBridgeCache*`. Audio không có fallback khóa cũ vì các
khóa này được giới thiệu cùng với schema Modality Bridge.

Video sử dụng `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, và
`modalityBridgeVideoTimeout`, cùng với các cài đặt dùng chung `modalityBridgeCache*`.
Nó bị tắt theo mặc định vì FFmpeg/ffprobe là các phụ thuộc vận hành
tùy chọn và việc tạo chú thích khung hình làm tăng độ trễ và chi phí mô hình.

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

1. Tạo `src/lib/guardrails/myGuardrail.ts` kế thừa `BaseGuardrail`.
2. Triển khai `preCall` và/hoặc `postCall`.
3. Đăng ký tại thời điểm import (đẩy từ `registerDefaultGuardrails`) hoặc
   gọi `guardrailRegistry.register(...)` tại runtime — registry sẽ thay thế
   bất kỳ guardrail nào trước đó có cùng tên đã chuẩn hóa.
4. Thêm test trong `tests/unit/` (các ví dụ hiện có:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Kiểm thử

Sử dụng `resetGuardrailsForTests()` giữa các lần chạy test để bắt đầu từ một trạng thái xác định.
Truyền `{ registerDefaults: false }` để bắt đầu với một registry rỗng và
chỉ đăng ký các guardrail đang được test. Vision Bridge chấp nhận dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge cung cấp
các seam tương đương cho cài đặt, khả năng, lựa chọn mô hình STT, kiểm tra
credential và transcription. Do đó, test có thể thực thi cả hai luồng mà không
cần truy cập DB hoặc mạng.

## Xem thêm

- `src/lib/guardrails/` — phần triển khai
- `src/shared/utils/inputSanitizer.ts` — bộ phát hiện dùng chung hỗ trợ
  chống prompt-injection và che giấu PII
- `src/shared/constants/visionBridgeDefaults.ts` — các giá trị mặc định của Vision Bridge và
  danh sách mô hình forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — các giá trị mặc định runtime dùng chung của Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — lớp trực giao (circuit breaker, cooldown)
- `docs/reference/ENVIRONMENT.md` — tài liệu tham khảo đầy đủ về biến môi trường

## Độ bao phủ route của injection-guard & red-team (Giai đoạn 8 · Khối D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) bao phủ tất cả các route
chấp nhận prompt của người dùng. Nó tuân theo `INJECTION_GUARD_MODE` (mặc định `warn` = chỉ ghi log;
`block` = trả về HTTP 400 `SECURITY_001`).

| Loại              | Route                                                                                                                                                | Chế độ mặc định |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Văn bản (hiện có) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Tạo sinh          | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Dữ liệu           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

Việc trích xuất văn bản (`extractMessageContents`) bao phủ `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hằng đêm, `nightly-llm-security.yml`):** promptfoo xác minh rằng mỗi route đều chặn
bộ dữ liệu OWASP-LLM khi `INJECTION_GUARD_MODE=block`; garak chạy các probe (bỏ qua nếu không có secret).
`moderations` được đưa vào để đảm bảo tính nhất quán. Chế độ block là một ranh giới bắt buộc: `evaluatePromptInjection()`
bỏ qua danh sách vô hiệu hóa theo từng request mà middleware truyền vào, vì vậy `disabledGuardrails`
**không** miễn trừ một route khỏi chế độ này ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Workflow hằng đêm (`.github/workflows/nightly-llm-security.yml`, cron + kích hoạt
thủ công) có hai job:

- **`promptfoo-guard` (bắt buộc)** — chạy `promptfoo eval -c promptfooconfig.yaml`
  với `INJECTION_GUARD_MODE=block`. Mỗi trường hợp tấn công (ví dụ: "bỏ qua mọi
  chỉ dẫn trước đó…", các jailbreak kiểu DAN) khẳng định rằng phản hồi chứa
  `error.code === "SECURITY_001"`, tức là guard đã thực sự từ chối request.
- **`garak` (tham khảo)** — chạy garak `--probes promptinject,dan,leakreplay`
  đối với một instance OmniRoute cục bộ (`http://localhost:20128/v1`). Chỉ chạy khi có
  secret của provider (`PROMPTFOO_PROVIDER_KEY`); nếu không có sẽ tự động bỏ qua
  và được thêm hậu tố `|| true`, vì vậy nó báo cáo kết quả mà không làm CI thất bại.

Độ bao phủ của guard helper (`createInjectionGuard` / `withInjectionGuard`)
trải dài trên mọi route `/v1` có chứa prompt; văn bản prompt được lấy từ
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` bởi
`extractMessageContents()` trong `src/shared/utils/inputSanitizer.ts`.
