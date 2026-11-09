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

## Guardrail tích hợp sẵn

Registry tự động nạp sáu guardrail theo thứ tự ưu tiên khi import
(xem `registry.ts` → `registerDefaultGuardrails()`):

| Ưu tiên | Tên                 | (Các) giai đoạn | Tệp                   |
| ------- | ------------------- | --------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`       | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`       | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`       | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post`  | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`       | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post`  | `credentialMasker.ts` |

Số ưu tiên thấp hơn chạy **trước**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Model cơ sở GLM 5.3 và `glm-5.3-{low,high,max}` có metadata registry/spec
tường minh là `supportsVision:false`. Các biến thể GLM 5.3 Flash vẫn là các
model vision gốc. Route `/v1/messages` của Claude Code đi vào chuỗi guardrail
pre-call dùng chung `handleChat` **trước** khi diễn ra quá trình dịch
Claude-sang-OpenAI; các ảnh lồng trong kết quả tool `Read` phải được mô tả
hoặc xử lý trước khi quá trình dịch đó đưa chúng thành nội dung `image_url`
của OpenAI (#17069).

Chặn các request chứa ảnh nhắm tới **các model không hỗ trợ vision** và hoặc
định tuyến lại toàn bộ request sang một model có khả năng vision, hoặc thay
thế các phần ảnh bằng các mô tả văn bản do một model vision có thể cấu hình
tạo ra trước khi gọi upstream. Điều này cho phép các nhà cung cấp chỉ hỗ trợ
văn bản xử lý payload đa phương thức một cách trong suốt.

Luồng xử lý:

1. Bỏ qua nếu model đích đã hỗ trợ vision (trừ khi nó xuất hiện trong danh
   sách bắt buộc bridge `isVisionBridgeForcedModel`).
2. Trích xuất các phần ảnh qua `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), hàm này ủy quyền cho **bộ phát hiện media
   thống nhất** `detectMediaParts()` trong `open-sse/utils/mediaParts.ts` —
   nguồn chính xác duy nhất được chia sẻ với bộ lọc tương thích combo.
   Việc trích xuất được giới hạn trong danh sách cho phép gồm các dạng mà
   `replaceImageParts` có thể ghép lại (hợp đồng extract↔replace): `image_url`
   của OpenAI, base64 của Anthropic `source.type:"base64"`, URL của Anthropic
   `source.type:"url"`, và `input_image` của Responses API. Các ảnh khớp nằm
   lồng bên trong `tool_result.content` của Claude Code và output của tool
   Responses cũng được trích xuất và thay thế tại đường dẫn gốc của chúng;
   các dạng chỉ mang tính chỉ báo (indicator-only) thuộc phạm vi của bộ lọc
   combo và không được trích xuất. Bỏ qua nếu không tìm thấy ảnh nào.
3. Phân giải cấu hình runtime qua `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): các khóa cài đặt mới
   `modalityBridge*` được ưu tiên; các khóa cũ `visionBridge*` vẫn đóng vai
   trò **phương án dự phòng trong một chu kỳ** (cửa sổ rollback). Bỏ qua
   trước mọi thao tác duyệt media khi bridge bị tắt.
4. Bộ chọn chế độ (`modalityBridgeVisionMode`, xem bảng bên dưới) quyết định
   reroute hay describe. Reroute trả về `modifiedPayload` chỉ với `model`
   được đổi, kèm meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Nhánh describe: giới hạn số ảnh ở `maxImages`, tạo prompt có nhận biết
   theo tác vụ, tra cứu cache describe, gọi model vision **song song**
   (`Promise.allSettled`), và chèn các phần văn bản `[Image N]: <description>`
   vào vị trí tương ứng. Một lần describe thất bại trả về `null`: ảnh gốc
   được giữ lại cho các đích chưa xác định/có khả năng vision (#4012), nhưng
   một **đích trực tiếp đã xác nhận chỉ hỗ trợ văn bản** hoặc combo không có
   khả năng vision sẽ nhận được một đoạn văn bản thay thế tường minh
   `(unavailable — no vision-capable provider connected)` cho mỗi ảnh không
   được mô tả, bao gồm cả các thất bại từng phần và các ảnh vượt quá ngưỡng
   lượt gọi describe (#17069). Phương án dự phòng describe hiện có cho combo
   khi tất cả đều thất bại vẫn được giữ nguyên (#8430).
6. Trả về `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Bộ chọn chế độ (`modalityBridgeVisionMode`)

| Chế độ     | Mặc định | Hành vi                                                                                                                                                                                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Heuristic legacy, giữ nguyên không đổi (#6640/#7204): các model không phải combo/`auto/` được reroute sang model vision tốt nhất trừ khi model gốc đã có credential khả dụng (khi đó thì describe); các target combo luôn describe.                                    |
| `describe` |          | Luôn describe — khối reroute bị bỏ qua hoàn toàn; model do người dùng chọn luôn là model trả lời.                                                                                                                                                                      |
| `reroute`  |          | Buộc reroute: guard giữ lại model có credential bị bỏ qua. Guard credential của **target** reroute vẫn áp dụng — khi không tồn tại target vision khả dụng nào, bridge sẽ chặn với một lỗi rõ ràng thay vì describe hoặc gửi ảnh thô tới một target chỉ hỗ trợ văn bản. |

Các chế độ bắt buộc sẽ short-circuit **trước khi** heuristic auto chạy; hành vi của `auto`
giống hệt từng byte với guardrail trước PR-1.

#### Phạm vi API key (`visionBridgeKeyScope.ts`)

Khi API key của người gọi giới hạn `allowedConnections`, các pool quota
(`allowedQuotas`) hoặc các model (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge chỉ
chọn các model reroute và describe mà key được phép dùng, trên các connection
mà key được phép dùng. Lệnh gọi describe sau đó luôn đi qua self-loop của
OmniRoute với header `x-omniroute-self-loop-key-id`, để chat request
nhận được sẽ tự thực thi lại chính sách connection và model của key đó.
`enforceApiKeyPolicy()` chỉ công nhận header đó khi đi cùng với bearer
self-loop, vì vậy nó chỉ có thể thu hẹp quyền truy cập, và một id không
phân giải được sẽ bị từ chối.

Nếu không có model vision nào được phép cho key, một **target đã xác nhận
chỉ hỗ trợ văn bản** sẽ từ chối request ảnh ngay tại chỗ với lỗi HTTP 400
rõ ràng thay vì chuyển tiếp các byte ảnh tới một upstream không có khả năng
xử lý (#17069). Với các target có khả năng vision chưa biết hoặc vision
native, đường describe giữ nguyên hành vi fail-open trước đây
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Các request không có key, và các key không có những giới hạn này,
hoạt động giống hệt như trước.

#### Prompt describe nhận biết tác vụ (`modalityBridgeVisionTaskAware`)

Mặc định **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) nối thêm
văn bản của **tin nhắn user cuối cùng** (cắt ngắn còn 500 ký tự) vào prompt
describe cơ sở, điều hướng mô tả theo điều người dùng thực sự hỏi
(pattern codex-vision-proxy) và yêu cầu model vision phiên lại phần văn bản
nhìn thấy được. Khi flag tắt — hoặc không có văn bản user — prompt cơ sở
được dùng nguyên bản.

Request tương thích OpenAI của chính self-loop describe (`callVisionModelSingle()`
trong `visionBridgeHelpers.ts`) luôn yêu cầu `image_url.detail: "high"` —
vô điều kiện, cho mọi caller/provider, không bị ràng buộc bởi bất kỳ tín hiệu
client nào. Việc lấy mẫu ở độ chi tiết thấp làm giảm độ chính xác OCR đúng
cho tác vụ phiên văn bản mà prompt này yêu cầu, nên bản thân lệnh gọi describe
luôn yêu cầu độ chi tiết cao bất kể request đến ban đầu dùng mức chi tiết nào.
Điều này chỉ ảnh hưởng đến body của request describe nội bộ; nó không thay đổi
cách OmniRoute chuyển tiếp `image_url.detail` của chính caller trên request
chính — mặc định đó được áp dụng riêng, và chỉ cho các client OpenCode được
phát hiện, trong `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Nhánh định dạng wire của Anthropic trong self-loop describe không có trường
`detail` và không bị ảnh hưởng bởi cả hai mặc định đó.

#### Giới hạn đầu ra describe (`modalityBridgeVisionMaxChars`)

| Khóa                           | Mặc định | Khoảng             |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` hoặc 100–50000 |

`0` (mặc định) nghĩa là **không giới hạn** — mô tả do
`callVisionModel()` trả về được chuyển qua nguyên bản, giữ nguyên hành vi
hiện có. Bất kỳ giá trị nào trong khoảng 100–50000 sẽ cắt ngắn mô tả với
hậu tố `…` trước khi nó được ghép lại dưới dạng `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` trong `src/lib/guardrails/visionBridge.ts`).
Tăng giá trị này cho các tác vụ OCR nhiều chi tiết khi model downstream cần
bản phiên đầy đủ; giảm nó để giới hạn mức dùng token trên các model vision
nhiều lời. Trường trên dashboard nằm ở panel Advanced của tab Vision
(`modality-bridge-max-chars` trong `ModalityBridgeVisionTab.tsx`) và kẹp (clamp)
mọi giá trị từ 1 đến 99 lên ngưỡng sàn 100 trong khi vẫn giữ nguyên giá trị
`0` tường minh — `0` là một giá trị Zod hợp lệ theo đúng nghĩa của nó
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), chứ không
chỉ là mặc định "chưa đặt".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL trong bộ nhớ cho các đầu ra describe, dùng chung toàn tiến trình.
Khóa = `sha256(imageRef + composedPrompt + configuredBridgeModel)` với cơ chế
khung tiền tố độ dài (không xung đột biên trường). Thành phần model là model
bridge **được cấu hình**, không phải model thực sự trả lời — `callVisionModel`
có thể tự fallback bên trong, và tạo khóa theo từng lần thử sẽ làm phân mảnh
cache. Các describe thất bại không bao giờ được cache. Cài đặt:

| Khóa                            | Mặc định | Khoảng  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Chuẩn hóa ảnh từ xa (tải describe/base64 qua self-loop)

Khi bridge tự tải một ảnh **từ xa** — lệnh tự gọi (self-call) describe của Anthropic
và quá trình chuyển đổi base64 theo định dạng claude-wire
(`ensureBase64ImagesForClaudeWire`), cả hai đều thông qua
`fetchRemoteImageAsDataUri()` trong `visionBridgeHelpers.ts` — data URI thu được
sẽ được truyền qua `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) trước khi được nhúng vào request gửi tới
vision model. Các ảnh quá lớn sẽ được thu nhỏ xuống còn **cạnh dài 2048px** (tương
ứng với giới hạn resize mà OpenAI/Anthropic đã áp dụng phía server), giúp giảm
số byte/độ trễ khi upload mà không thay đổi những gì vision model nhìn thấy.
Việc resize sử dụng `sharp`, được nạp qua dynamic import: trên nền tảng mà native
binary của nó không nạp được, `normalizeDataUri()` **không bao giờ throw** — nó
chuyển về chế độ passthrough các byte gốc, nhờ đó đường dẫn
describe/chuyển đổi base64 luôn tiếp tục hoạt động. Các byte không phải ảnh (một
lượt fetch không trả về ảnh có thể giải mã được) cũng được truyền thẳng qua mà
không thay đổi. Việc chuẩn hóa này chỉ giới hạn ở các ảnh mà bridge tự tải cho
lệnh self-call của chính nó — nó không bao giờ được áp dụng cho payload
passthrough thô của caller, phù hợp với nguyên tắc chỉ biến đổi khi được chọn
tham gia (Hard Rule #20).

#### Schema cài đặt + migration

Các key `modalityBridge*` mới được validate bằng Zod trong `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, bộ ba `modalityBridgeCache*`, và nhóm
`modalityBridgeAudio*` được Audio Bridge sử dụng. Migration
`141_modality_bridge_settings.sql` sao chép các giá trị legacy
`visionBridge*` hiện có sang các key mới tương ứng (idempotent, không bao giờ
ghi đè giá trị `modalityBridge*` do operator đặt); các key legacy vẫn được chấp
nhận như một phương án đọc dự phòng trong một chu kỳ phát hành.

#### Header minh bạch + thống kê

Các response đã được describe biến đổi mang header
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(được xây dựng bởi `buildModalityBridgeHeader()` trong `modalityBridge/bridgeStats.ts`,
được gắn bởi `withModalityBridgeHeader()` trong `src/sse/handlers/chatHelpers.ts`).
Các request được reroute **không** nhận header — vì payload không bị thay đổi và
việc đổi model đã hiển thị trong trường `model` của response body.

`GET /api/modality-bridge/stats` (xác thực quản trị, cùng cấp với
`GET /api/settings`) trả về các bộ đếm trong bộ nhớ theo từng modality
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` cho `vision`, `audio`, và
`video`. `averageLatencyMs` dùng `latencySamples`, chứ không phải tất cả các lần
thử, làm mẫu số; một thao tác không có dữ liệu thời gian sẽ không bịa ra một mẫu
0 mili giây. `bridged` vẫn là alias tương thích ngược cho các lượt chuyển đổi
thành công; các lần thử thất bại không làm tăng nó.
Các bộ đếm được reset khi tiến trình khởi động lại, theo thiết kế
(đây là telemetry, không phải kế toán).

#### Cấu hình dashboard

Trang dashboard chuyên dụng là
`/dashboard/settings/modality-bridge`. Các tab `Vision`, `Audio`,
và `Video` có thể truy cập trực tiếp qua URL, đồng thời giữ nguyên các query
parameter khi chuyển đổi giá trị `tab`.
Tab Vision hiển thị các tùy chọn bật/tắt, chế độ, lựa chọn model (bao gồm mặc định
tự động), prompt theo ngữ cảnh tác vụ (task-aware), các giới hạn nâng cao về
timeout/số ảnh/độ dài mô tả/cache, các bộ đếm runtime, và một sample request được
bảo vệ. Tab Audio cũng đã hoạt động: nó hiển thị tùy chọn bật/tắt, bộ chọn model
chỉ-STT với tùy chọn Auto, giới hạn timeout/độ dài clip tối đa, các bộ đếm audio,
và một bài test mẫu `input_audio`. Tab Video đã hoạt động: nó báo cáo trạng thái
runtime của FFmpeg/ffprobe — một trong bốn trạng thái UI rõ ràng (`unknown` khi
lượt probe đang chạy hoặc không thể hoàn tất, `restricted` trên host dashboard
không phải loopback nơi probe bị bỏ qua phía client, `unavailable` sau khi đã
probe và xác nhận không có sẵn, hoặc `available` kèm phiên bản FFmpeg/ffprobe) —
lưu trữ các giới hạn bật/model/frame/video/timeout, lọc bộ chọn model chỉ còn
các model có khả năng vision, và hiển thị các bộ đếm video.

Card Vision Bridge trước đây trong phần cài đặt AI giờ chỉ là một liên kết tương
thích tới trang mới; nó không còn sở hữu bản sao thứ hai của form nữa. Media
Providers cũng liên kết các workflow Image-to-Text và Speech-to-Text tới các tab
Modality Bridge tương ứng mà không xóa playground Speech-to-Text hiện có.

**Bỏ qua kiểm soát admission qua self-loop:** khi lệnh gọi describe được định
tuyến qua self-loop `/v1` của chính OmniRoute (model provider không chuẩn),
sub-request gửi `x-omniroute-admission-bypass: internal` và được xác thực bằng
credential self-loop đã được phân giải — sentinel `sk_omniroute` cục bộ ở chế độ
local, hoặc env key `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` do operator cấu hình
(#1350) để các triển khai có `REQUIRE_API_KEY=true` vẫn có thể chạy lệnh gọi
describe. Cơ chế bypass chỉ được chấp nhận với đúng những credential đó, vì vậy
client bên ngoài không thể dùng header này để bỏ qua admission.

Các giá trị mặc định legacy nằm trong `src/shared/constants/visionBridgeDefaults.ts`;
các giá trị mặc định mới về mode/task-aware/cache và trình phân giải cài đặt nằm
trong `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail cung cấp tùy
chọn constructor `deps` để các test có thể inject các implementation giả của
`getSettings` và `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Chặn các chat request có chứa audio trước khi chúng đến một target không được
biết là chấp nhận đầu vào audio. Nó không bao giờ reroute chat request: các phần
audio được phiên âm qua endpoint multipart tương thích OpenAI hiện có và chat
model đã chọn tiếp tục với các bản phiên âm dạng văn bản.

Luồng xử lý:

1. Phân giải `supportsAudio` thông qua `getResolvedModelCapabilities()`. Metadata
   provider-registry khai báo tường minh được ưu tiên trước, sau đó đến metadata
   model tĩnh, rồi đến `modalities_input` đã đồng bộ. Một danh sách input đã khai
   báo mà không chứa `audio` thì kết quả là `false`; không có bằng chứng
   capability nào thì vẫn giữ `null`. Cả `false` và `null` đều kích hoạt bridge
   bảo thủ, trong khi `true` bỏ qua nó.
2. Phân giải các thiết lập `modalityBridgeAudio*` và trích xuất các phần audio
   cấp cao nhất có thể splice từ mọi message thông qua detector dùng chung
   `detectMediaParts()`. Các dạng wire được hỗ trợ là `input_audio` của OpenAI,
   `audio_url`, và `source.media_type: "audio/*"`. Audio lồng nhau được phát hiện
   để routing nhưng không bị loại bỏ bởi đường splice. Khối lượng công việc bị
   giới hạn bởi `modalityBridgeAudioMaxClips`; các phần đứng sau được giữ nguyên.
3. Tuân theo `provider/model` đã được cấu hình, hoặc để `selectAudioBridgeModel()`
   duyệt qua `AUDIO_TRANSCRIPTION_PROVIDERS` theo thứ tự catalog ổn định và chọn
   model đầu tiên có credential provider đang hoạt động và khả dụng.
4. `callAudioTranscription()` chuyển đổi audio base64/data-URI thành một `file`
   multipart, hoặc tải xuống một `audio_url` từ xa thông qua guard outbound
   chỉ-public với DNS pinning và giới hạn 25 MB. Sau đó nó POST file cùng model
   đã chọn đến self-loop cục bộ `/v1/audio/transcriptions`, được xác thực bằng
   `resolveSelfLoopBearer()`. Route transcription hiện có thực hiện tra cứu
   credential thông thường, xử lý cooldown/rate-limit, và điều phối provider.
5. Các lời gọi thành công thay thế các phần của chúng bằng
   `[Audio N]: <transcript>`. Các lời gọi chạy với `Promise.allSettled`: một
   thất bại riêng lẻ sẽ giữ nguyên phần audio gốc tương ứng (contract #4012).
   Nếu mọi lời gọi đều thất bại và đích được chứng minh là
   `supportsAudio === false`, các phần sẽ trở thành
   `[Audio N]: (unavailable — no STT provider connected)` (contract #8430). Với
   đích không xác định (`null`), kết quả toàn bộ-thất-bại được giữ nguyên không
   thay đổi. Một đích được chứng minh là chỉ-text và không có credential STT khả
   dụng sẽ nhận cùng một stub tường minh đó mà không phát sinh bất kỳ lời gọi
   mạng nào.

Các transcript thành công sử dụng cache LRU/TTL phạm vi toàn-process của
Modality Bridge. Key kết hợp tham chiếu audio, nhãn operation ổn định
`audio-transcription`, và model STT đã chọn; các thất bại không bao giờ được
cache. Các lần thử audio cập nhật các bộ đếm dùng chung `bridged`, `cacheHits`,
`failures`, và `lastUsedAt`. Các response đã được biến đổi mang theo
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; các
request không bị động vào sẽ không nhận segment Audio Bridge.

Các thiết lập runtime được lưu trữ trong DB và được validate bằng Zod:

| Key                           | Mặc định | Khoảng              |
| ----------------------------- | -------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                   |
| `modalityBridgeAudioModel`    | `""`     | Tự động hoặc STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                |

Cache dùng chung vẫn được kiểm soát bởi `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, và `modalityBridgeCacheMaxEntries`.

### Cầu Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chặn các phần video cấp cao nhất trong phần Hoàn thành trò chuyện `messages` và Phản hồi API `input` trước khi một mục tiêu không được hỗ trợ video gốc đã biết được gọi. Các hình dạng được hỗ trợ là `input_video`, `video_url`, `video_source`, HTTPS URLs và `data:video/*;base64,...` data URIs. Tên tệp đơn giản trong văn bản không được coi là video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sở hữu truyền tải yêu cầu, kiểm tra capability/policy, tổng hợp theo yêu cầu và tải trọng phản hồi. Việc thu thập — cho mỗi tác phẩm video, bộ nhớ đệm toàn bộ kết quả, mô tả chuỗi khung hình (kết hợp mọi bản ghi âm thanh do người gọi khai báo) và metrics/abort/cleanup — cho mỗi lần thử được ẩn đằng sau `processVideoPart` trong `videoBridgePipeline.ts`, được gọi một lần cho mỗi phần video bên trong vòng lặp của `preCall`. Mô-đun đó cũng xác định ranh giới cổng rõ ràng `VideoMediaBrokerPort` (thu thập byte và trích xuất các khung được lấy mẫu), `VideoAudioTranscriptionPort` (kết hợp bản ghi âm do người gọi khai báo với chú thích được lấy mẫu) và `VideoDrilldownPort` (hình dạng cửa hàng thô cũ). STT sản xuất và lưu giữ khung được cấu thành xung quanh cổng mô tả thông qua `createVideoSttAdapter` và `createVideoDrilldownAdapter`; cái sau sử dụng vòng đời tay cầm mờ được chia sẻ.

Đường dẫn yêu cầu `/v1` công khai không bao giờ nhập hoặc gọi một quy trình con. Các video từ xa được tải xuống dưới giới hạn 50 MiB ; các video base64 nội tuyến có giới hạn giải mã 36 MiB thận trọng cho mỗi video để đường bao model/messages/framing có thể vẫn nằm trong giới hạn chấp nhận yêu cầu JSON công khai là 50 MiB. Ước tính độ dài nội tuyến và kích thước đã giải mã được kiểm tra trước khi phân bổ. HTTPS được yêu cầu trên URL từ xa ban đầu và mọi chuyển hướng, sử dụng bộ bảo vệ gửi đi chỉ công khai hiện có với tính năng ghim DNS. Các byte sau đó vượt qua ranh giới môi giới `POST /api/modality-bridge/video/extract` nội bộ chính xác. Tuyến đường đó là cả `LOCAL_ONLY` và `SPAWN_CAPABLE`, chỉ chấp nhận yêu cầu vòng lặp đáng tin cậy, được xác thực trên mỗi quy trình và không bao giờ chấp nhận URL, đường dẫn hệ thống tệp, danh sách thực thi hoặc đối số. Đường dẫn kích thước nội dung API và trình đọc nội dung gia tăng của trình xử lý thực thi độc lập giới hạn đầu vào của nhà môi giới 50 MiB. Hàng đợi giới hạn của nó chạy một lần trích xuất tại một thời điểm, cho phép bốn công việc đang chờ xử lý và giới hạn đầu vào đang chờ xử lý ở mức 100 MiB.

Bên trong nhà môi giới, `ffprobe` đọc một tệp cục bộ riêng tư; danh sách cho phép có định dạng cố định không bao gồm định dạng danh sách phát và tệp kê khai. Đối với các vùng chứa dòng MOV được phép, các tham chiếu dữ liệu MOV bên ngoài vẫn bị tắt theo mặc định và lệnh cố định không chọn tham gia vào chúng. Cả `ffprobe` và `ffmpeg` đều sử dụng danh sách trắng giao thức `file` -only, một luồng, mảng đối số cố định, không có shell và các tệp thực thi được giải quyết từ `PATH`. Luồng ảnh bìa đính kèm không phải là ứng cử viên có thể phát được. Tất cả các luồng có thể phát phải đáp ứng các giới hạn và luồng mặc định rõ ràng được ưu tiên trước dự phòng có chỉ số thấp nhất xác định. Video được giới hạn ở 600 giây, 8.192 pixel mỗi chiều và 33.554.432 pixel nguồn. FFmpeg lấy mẫu từ 1–16 khung hình JPEG điểm giữa, giảm tỷ lệ cạnh dài xuống tối đa 1.024 pixel mà không tăng tỷ lệ đầu vào nhỏ hơn và không bao giờ nhận được URL. Lấy mẫu là `uniform` theo mặc định. Các chính sách `scene_aware` tùy chọn và `segment_aware` thử nghiệm thực hiện một lần chuyển FFmpeg cố định bổ sung qua luồng cục bộ đã được xác thực, chọn dấu thời gian của cảnh `showinfo` bị giới hạn và quay trở lại một cách xác định về cùng các điểm giữa thống nhất khi máy dò bị lỗi, hết thời gian chờ, đầu ra không đúng định dạng hoặc một bộ ứng cử viên trống. Chế độ nhận biết phân đoạn phân bổ các mẫu điểm giữa tương ứng với các khoảng cảnh được xác thực; bằng chứng nhận biết phân khúc và hành vi dự phòng được trình bày chi tiết bên dưới. Giới hạn 16 khung cứng được áp dụng sau khi chọn trong mọi chính sách. Khi yêu cầu nhận biết cảnh chỉ có ngân sách một khung hình, yêu cầu đó sẽ sử dụng điểm giữa thống nhất của toàn bộ video hoặc cửa sổ lấy nét đang hoạt động và báo cáo `policyEffective: uniform`: một khung cảnh được chọn duy nhất không thể bảo toàn cả hai đầu tạm thời. Người gọi có thể tùy ý cung cấp cửa sổ lấy nét hữu hạn (`start`/`end` giây); giới hạn được giới hạn theo thời lượng phương tiện, các cửa sổ đảo ngược hoặc không hữu hạn bị từ chối và tất cả các chính sách lấy mẫu chỉ được thực hiện trong khoảng thời gian chuẩn hóa. Cửa sổ kết quả được đưa vào siêu dữ liệu lấy mẫu và trong tiền tố mô tả không đáng tin cậy để các mô hình xuôi dòng có thể phân biệt đoạn trích tập trung với dòng thời gian đầy đủ.

Tiêu điểm chú thích ngữ nghĩa là cài đặt riêng biệt, rõ ràng. Chế độ phân tích `full` mặc định giữ nguyên lời nhắc khung hiện có và không bao giờ chuyển tiếp văn bản yêu cầu đến mô hình chú thích. Ở chế độ `focused`, bridge chỉ đọc `text`/`input_text` không trống mới nhất do người dùng tạo từ cùng một vùng chứa Trò chuyện hoặc Phản hồi, chuẩn hóa nó thành NFC, thu gọn các ký tự điều khiển và khoảng trắng, đồng thời giới hạn ở 500 điểm mã Unicode. Một kết quả trống quay trở lại dấu nhắc `full` chính xác. Một gợi ý có thể sử dụng được tuần tự hóa dưới dạng JSON trong khối ngữ cảnh dành riêng cho người dùng không đáng tin cậy và chỉ có thể ưu tiên các chi tiết có thể quan sát được; nó không thể ghi đè cảnh báo riêng biệt đối với các hướng dẫn sau đây có thể nhìn thấy hoặc nghe được trên phương tiện truyền thông. Tiêu điểm văn bản không bao giờ suy ra `start`/`end` hoặc thay đổi bộ lấy mẫu thời gian.

#### bằng chứng phân đoạn cấu trúc FU-07

`segment_aware` sử dụng một lượt phân tích trước có giới hạn trên luồng video cục bộ đã được xác thực. Chuỗi bộ lọc cố định trước tiên sẽ mở rộng tối đa 320 pixel, phát hiện các thay đổi của cảnh và khoảng thời gian cố định, sau đó lấy mẫu ở tốc độ 1 khung hình mỗi giây để biết thông tin về độ mờ, độ sáng trung bình và spatial/temporal. Thẻ được giới hạn ở 600 mẫu cấu trúc, một luồng FFmpeg/filter, cùng giao thức `file` -only và danh sách cho phép vùng chứa, giới hạn đầu ra của quy trình 1 MiB và tối đa 30 giây bên trong abort/deadline. được chia sẻ của nhà môi giới. Nó không bao giờ chấp nhận lệnh, bộ lọc, đường dẫn hoặc URL từ yêu cầu.

Các giá trị cấu trúc là bằng chứng lấy mẫu xác định, không phải là sự hiểu biết về ngữ nghĩa của video. Họ không suy luận chủ đề, hành động, chú thích, lời nói hoặc ý định của người dùng. Cảnh và ranh giới đóng băng tạo thành các phân đoạn; đóng băng phạm vi phủ sóng, độ mờ, độ phơi sáng, chi tiết không gian và thay đổi thời gian chỉ ảnh hưởng đến cách phân bổ ngân sách khung hình 1–16 hiện có. Một phân đoạn được cố định hoàn toàn được giới hạn ở một khung hình, trong khi các phân đoạn không bị cố định sẽ cạnh tranh để giành được ngân sách còn lại. Khi ranh giới vượt quá số lượng khung hình, phạm vi phủ sóng dòng thời gian thống nhất được giữ lại để các lần cắt sớm nhanh chóng không thể che giấu một đoạn kéo dài. Các ranh giới cảnh trong độ phân giải phân tích 1 giây của ranh giới cố định được hợp nhất.

Thiếu bộ lọc, bằng chứng malformed/empty, lỗi phát hiện hoặc thời gian chờ phân tích trước bị chặn không mở được chính sách điểm giữa thống nhất chính xác. Thời hạn hủy bỏ của người gọi hoặc thời hạn môi giới không mở được: nó chấm dứt quy trình con đang hoạt động, ngăn chặn việc trích xuất khung sau này và cây tạm thời riêng tư bị xóa trong `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` tạo ra các cố định FFmpeg thực mang tính xác định để tiết kiệm cuộc gọi phụ đề sau khi loại bỏ, phân bổ ngân sách chuyển động dày đặc, bằng chứng blur/exposure/SI-TI, cắt giảm nhanh chóng với phần đuôi dài và dương tính giả mờ dần. Nó ghi lại thời gian tường phân tích trước và khi có sẵn `/usr/bin/time`, CPU con và RSS đỉnh. Việc kiểm tra chất lượng của nó chỉ mang tính chất oracle về cấu trúc. Chất lượng mô hình phụ đề thực vẫn là `HOLD` vì dây nịt này không có điểm cuối được ủy quyền hoặc đánh giá bị đóng băng. Tiết kiệm tiền cũng vẫn là `HOLD` trừ khi `--caption-cost-per-call-usd` cung cấp ước tính dương rõ ràng cho mỗi cuộc gọi; kịch bản không bao giờ tạo ra một trong hai kết quả.

Mỗi khung được giới hạn ở 4 MiB, tất cả các khung thô cùng nhau ở 23 MiB và phản hồi của nhà môi giới được tuần tự hóa ở 32 MiB. Một thư mục tạm thời riêng tư sẽ bị xóa trong `finally`. OmniRoute không gói FFmpeg và không chấp nhận đường dẫn thực thi tùy chỉnh. Trước khi tạo chú thích, cầu nối sẽ áp dụng một quy trình loại bỏ trùng lặp hình ảnh thận trọng: mỗi JPEG được giảm xuống bộ đệm thang độ xám 16 × 16 và chỉ được so sánh với khung hình cuối cùng được giữ lại. Đối với ngân sách phụ đề được yêu cầu trên một khung, việc trích xuất sẽ cung cấp nhóm ứng viên giới hạn lên tới gấp đôi ngân sách đó và không bao giờ nhiều hơn 16 khung hình. Giới hạn được yêu cầu chỉ được áp dụng sau khi loại bỏ trùng lặp, với các ứng cử viên được chọn đầu tiên và cuối cùng được giữ nguyên trong quá trình giảm dần cuối cùng khi ngân sách ít nhất là hai. Chính sách `grayscale-16x16-mean-cells-v2` được phiên bản sử dụng giá trị delta độ sáng trung bình lớn hơn và tỷ lệ các ô hình thu nhỏ có delta được chuẩn hóa ít nhất là 0,05. Ngưỡng trùng lặp là hằng số 0,04, được chọn để dự đoán thay vì hiển thị dưới dạng cài đặt thời gian chạy. Tín hiệu có độ tương phản cao thứ cấp này duy trì chuyển động nhỏ và những thay đổi văn bản hiển thị mà sự so sánh chỉ có ý nghĩa có thể ẩn đi. Lỗi bộ so sánh hoặc bộ giải mã không mở được và giữ nguyên phạm vi bảo hiểm. Siêu dữ liệu đầu ra phân tách các ứng cử viên được trích xuất, các khung được sử dụng thành công và loại bỏ các bản sao trực quan.

Phần video được đánh dấu rõ ràng có thể yêu cầu bảng liên hệ có dấu thời gian. Cầu xây dựng tối đa lưới JPEG 4 cột, 16 khung. Mỗi ô 512 pixel ghi dấu thời gian nguồn của nó thành dải dưới cùng có độ tương phản cao, trong khi các dấu thời gian tương tự vẫn giữ nguyên trong siêu dữ liệu văn bản để liên kết và kiểm tra xuôi dòng. JPEG hoàn chỉnh vẫn được giới hạn ở mức 32 MiB. Nếu `sharp` không thể giải mã hoặc soạn lưới, cầu sẽ quay trở lại các khung JPEG riêng lẻ; việc hủy bỏ của khách hàng vẫn lan truyền thông qua thao tác trang tính.

Bằng chứng quảng cáo được cố tình tách biệt khỏi điểm chuẩn vi mô của thành phần tổng hợp. `scripts/perf/video-bridge-contact-sheet-eval.ts` xác định khai thác A/B theo phiên bản lược đồ cho các mô hình tầm nhìn tương thích với OpenAI thực. Nó đo lường các mã thông báo do nhà cung cấp báo cáo, độ trễ tường từ đầu đến cuối (bao gồm cả thành phần trang tính), số lượng cuộc gọi mô hình và khả năng lưu giữ dữ kiện được xác định theo bảng kê khai. Phản hồi của mô hình thô không được ghi vào báo cáo; chỉ các bản tóm tắt SHA-256 và IDs thực tế phù hợp mới được giữ lại. Bộ khai thác không thực hiện cuộc gọi mạng hoặc mô hình trả phí trừ khi `--execute-real` được thông qua và `--model`, `OMNIROUTE_BASE_URL` và `OMNIROUTE_API_KEY` được định cấu hình. Nếu không có hoạt động thực sự rõ ràng đó, kết quả mà máy có thể đọc được vẫn là `HOLD`; riêng các phép đo payload/call-count tổng hợp không phải là bằng chứng khuyến khích.

Người gọi có thể đính kèm mảng `transcript.cues` tùy chọn vào phần video được hỗ trợ khi họ đã có văn bản được căn chỉnh. Mỗi tín hiệu phải mang `text`, một khoảng `start`/`end` hữu hạn bên trong khoảng thời gian được thăm dò và một `source` được đưa vào danh sách trắng (`client`, `embedded` hoặc `audio-bridge`); `confidence` mặc định là `1` và phải nằm trong khoảng `0` và `1`. Các tín hiệu trùng lặp chính xác được thu gọn. OmniRoute không bao giờ bắt đầu phiên âm từ siêu dữ liệu này: các tín hiệu đã xác thực được sao chép vào kết quả được mô tả kèm theo nguồn, độ tin cậy và khoảng thời gian, đồng thời được hiển thị dưới dạng quan sát không đáng tin cậy cùng với chú thích khung. Văn bản không hợp lệ, nằm ngoài phạm vi hoặc không có xuất xứ sẽ bị từ chối thay vì được trộn vào luồng phụ đề. Cả hai kênh bản ghi nội dung yêu cầu đều chuẩn hóa nguồn gốc được cung cấp cho `client`, bao gồm các nhãn `embedded` hoặc `audio-bridge` tự xác nhận. Chỉ bộ điều hợp do máy chủ sở hữu mới có thể gán các nhãn đáng tin cậy đó thông qua đối số `trustedSource` chỉ có mã; trường JSON yêu cầu không thể tiếp cận đối số đó. Văn bản chép lại vẫn là nội dung có nguồn gốc từ phương tiện truyền thông không đáng tin cậy, bất kể nguồn gốc của nó và không bao giờ được xác định ủy quyền.

Người gọi nâng cao có thể cung cấp bản nhạc `audioTranscript` cho cùng một video; nó được coi là văn bản do khách hàng cung cấp chứ không phải bằng chứng về việc sao chép từ máy chủ. Đường nối tổng hợp chạy các quan sát hình ảnh và âm thanh theo một thời hạn và tín hiệu hủy bỏ, sắp xếp chúng theo dòng thời gian chung, thu gọn các bản sao chính xác và báo cáo một phần kết quả khi chỉ một bên thành công. Một `audioTranscript` không hợp lệ sẽ giảm xuống thành kết quả một phần — mô tả trực quan được giữ lại và nhánh âm thanh ghi lại mã lỗi đã được lọc sạch — thay vì làm hỏng toàn bộ video. Tính khả dụng trên mỗi nhánh, cờ một phần và mã lỗi đã được chọn lọc được giữ nguyên trong kết quả được mô tả, trong siêu dữ liệu lan can (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), trong siêu dữ liệu bộ nhớ đệm kết quả và trong bộ đếm tổng hợp cầu nối. Đường dẫn Cầu Video mặc định không gọi tính năng chuyển lời nói thành văn bản hoặc tải xuống bản sao phương tiện thứ hai; không có bản nhạc rõ ràng đó, nó vẫn chỉ có video.

**Lưu giữ bản ghi (#12150 P1).** Điều này tự động áp dụng bất cứ khi nào Cầu video (tự chọn tham gia) hiển thị bản ghi, tín hiệu — không có cờ lưu giữ riêng. Khi một yêu cầu hiển thị bất kỳ tín hiệu phiên âm nào ( `transcript` do người gọi khai báo hoặc `audioTranscript` hợp nhất), lan can sẽ đánh dấu nó `videoBridgeObserved` và tạo ra một bóng được xử lý lại của mô tả video — một kết xuất giống hệt nhau trong đó nội dung văn bản tự do của mọi tín hiệu được thay thế bằng `[redacted-video-transcript]`, được xây dựng bằng cách thay thế trường tín hiệu có cấu trúc trước khi chuỗi được tập hợp (không bao giờ bằng cách phân tích văn bản phẳng, do đó không có nội dung tín hiệu — đối nghịch hoặc thông thường, kể cả các nội dung chứa `]` như vậy vì `[inaudible]`/`[music]` — có thể tồn tại). Nội dung yêu cầu nhật ký cuộc gọi liên tục hoán đổi từng phần văn bản có nguồn gốc từ video cho phần bóng được xử lý lại đó, khớp với sự bình đẳng về nội dung; neo `fullText` được đọc lại từ tải trọng lan can bảo vệ trước cuộc gọi đã hoàn thành, do đó, trận đấu vẫn thành công sau các lan can chuỗi sau này ( PII và mặt nạ thông tin xác thực, mức độ ưu tiên 10/95) viết lại văn bản mô tả tại chỗ và sau khi tiêm system-prompt/handoff/memory sẽ định hình lại mảng thông báo. Nội dung được gửi ngược dòng tới mô hình không thay đổi. Một yêu cầu được quan sát cũng không có Bộ nhớ lâu dài (cả trích xuất bắt nguồn từ yêu cầu và phản hồi đều bị bỏ qua), do đó, câu trả lời của chính mô hình không thể lặp lại văn bản bản ghi vào Bộ nhớ.

**Các trường video thô (#12430).** Khi cầu nối được bật và hỗ trợ video gốc không xác định hoặc không có, các trường `transcript`/`audioTranscript` được xác định cũng kích hoạt `videoBridgeObserved`, ngay cả sau khi mô tả bị lỗi hoặc giới hạn `maxVideos`. `null` và số lượng chuỗi trống; các trường vắng mặt và siêu dữ liệu không phải video thì không. Các bản sao được giữ lại sẽ loại bỏ các trường này hoặc bỏ qua yêu cầu và caches/Memory sẽ bị bỏ qua.

Trên các đường dẫn dự phòng đó, tín hiệu người gọi hợp lệ sẽ trở thành các phần `text`/`input_text` được hỗ trợ thay vì các trường nhà cung cấp không chuẩn. Cả hai bản nhạc do yêu cầu cung cấp vẫn là các quan sát `client` không đáng tin cậy, kèm theo cảnh báo rõ ràng rằng video không được mô tả và dấu thời gian không được xác minh dựa trên phương tiện truyền thông. Tổng ngân sách 256-cue/64-KiB và mỗi tín hiệu hiện có áp dụng cho cả hai tuyến đường; dấu thời gian phải vừa với giới hạn 600 giây của nhà môi giới và bất kỳ cửa sổ tiêu điểm nào được cung cấp. Các bản nhạc không hợp lệ sẽ bị loại bỏ, không được chuyển tiếp dưới dạng văn bản tùy ý; anh chị em hợp lệ vẫn có thể được sử dụng trừ khi vượt quá ngân sách kết hợp của họ. trường Null/empty không thêm văn bản. Không có bản ghi hoặc tìm nạp phương tiện nào được thêm vào bởi dự phòng này. Các trường mở rộng bản ghi được xóa khỏi sóng mang video dự phòng và các đối tượng `video_url`/`source` của nó. Danh sách cho phép dây OpenAI vẫn nghiêm ngặt; Các nhà cung cấp dịch vụ video gốc không xác định vẫn có sẵn và các mục tiêu chỉ có văn bản đã biết sẽ giữ các điểm đánh dấu an toàn. Bóng biên tập có cấu trúc bảo vệ văn bản bản ghi được nối thêm, trong khi yêu cầu ban đầu do người gọi sở hữu vẫn không thay đổi. Các mục tiêu được hỗ trợ gốc và các cầu nối bị vô hiệu hóa vẫn giữ nguyên hành vi bỏ qua hiện có của chúng.

Các bản sao được giữ lại bổ sung sử dụng cùng một tín hiệu yêu cầu được quan sát. Ảnh chụp nhanh yêu cầu của khách hàng trước lan can thô, yêu cầu đang chờ xử lý trong bộ nhớ và nhật ký yêu cầu bị từ chối sớm thay thế về mặt cấu trúc các trường bản ghi trong các phần video; các lời nhắc chuỗi được tổng hợp bởi các giai đoạn quy trình và chuyển giao ngữ cảnh được sắp xếp lại ở phần chìm nội dung yêu cầu liên tục. Điểm đánh dấu `video_content_removed` vẫn tồn tại làm cho việc tiếp tục `previous_response_id` không đóng được thay vì xây dựng lại văn bản đã bị loại bỏ có chủ ý. Nếu một yêu cầu được quan sát mất bóng phân phối từng phần trước khi ghi nhật ký hoặc thậm chí một trong số bóng video không khớp sau khi thay đổi yêu cầu sau đó, nội dung yêu cầu được giữ lại sẽ bị bỏ qua hoàn toàn thay vì giữ lại bản ghi được biên tập lại một phần.

Đối với một yêu cầu được quan sát, phản hồi của mô hình có thể trích dẫn bất kỳ phần nào của bản ghi mà không có ranh giới tín hiệu có cấu trúc. Do đó, nhật ký cuộc gọi `responseBody` liên tục của nó được thay thế bằng một điểm đánh dấu thiếu sót; tạo phẩm đường ống chi tiết (có thể bao gồm nội dung upstream/client và các đoạn luồng) không được giữ lại. Bộ nhớ đệm ngữ nghĩa, bình thường và phát lại lý luận bỏ qua việc đọc và ghi cho yêu cầu đó. Yêu cầu của nhà cung cấp và phản hồi mà khách hàng có thể nhìn thấy vẫn không thay đổi. Các byte lưu giữ ban đầu sẽ bị rút khỏi bộ đệm tạm thời khi thành phần chi tiết bị bỏ qua. Cảnh báo EventStream không đúng định dạng của Kiro chỉ báo cáo số byte tải trọng, không bao giờ báo cáo nội dung của nó hoặc lỗi thô của trình phân tích cú JSON. Điều này không khẳng định rằng mọi chẩn đoán provider/plugin không liên quan đều đã được kiểm tra; quá trình quét phần chìm được giữ lại rộng hơn được theo dõi trong #11658.

Vòng đời `/api/modality-bridge/video/drilldown` bên trong là một chất nền bộ đệm loopback/token-authenticated riêng biệt. Mọi thao tác cũng yêu cầu một hiệu trưởng mờ đục chính tắc ID. Trước khi kích hoạt lệnh gọi sản xuất, nó phải lấy ID đó từ đối tượng thuê được xác thực và không bao giờ được chuyển tiếp giá trị do khách hàng chọn. Các khóa bộ đệm liên kết hiệu trưởng đó với phiên chuẩn và tham chiếu video IDs, chỉ lưu trữ các khóa SHA-256-derived của chúng và đặt phạm vi cả đọc và xóa vào cùng một hiệu trưởng. Bộ đệm lưu trữ tối đa 16 khung JPEG dẫn xuất cho mỗi mục nhập, hết hạn sau mười phút và hỗ trợ đọc `start`/`end` có giới hạn hoặc xóa phiên rõ ràng.

Mỗi hiệu trưởng được giới hạn ở 16 mục và 64 MiB dữ liệu JPEG chuẩn. Các giới hạn này độc lập với trần 64-entry/256 MiB toàn cầu: áp lực hạn ngạch gốc chỉ trục xuất các mục nhập ít được sử dụng gần đây nhất của tiền gốc đó trước khi việc trục xuất LRU toàn cầu được xem xét. Các mục nhập hết hạn sẽ bị quét khỏi cả hoạt động tính toán gốc và tính toán toàn cầu đối với hoạt động của bộ nhớ đệm, trong khi việc hủy và xác thực không thực hiện thay thế một phần.

Bộ đệm từ chối Base64 không chính tắc, phần đệm quá mức, phương tiện không phải JPEG, JPEGs không đúng định dạng hoặc bị cắt bớt và JPEGs tạo ra cảnh báo trong quá trình giải mã `sharp` hình ảnh đầy đủ được giới hạn. Nó mã hóa lại từng hình ảnh được chấp nhận dưới dạng JPEG chuẩn, lấy chiều rộng và chiều cao từ các byte được giải mã thay vì tin cậy các trường của người gọi và loại bỏ mọi byte đa âm ở cuối thay vì giữ lại chúng. Chỉ có bộ đệm nén chuẩn được giới hạn mới được tính cho cả hai hạn ngạch. Giới hạn dây JSON bao gồm chi phí Base64 cho trần đầu vào được giải mã 32 MiB. Mọi dẫn xuất được lưu trữ đều ghi lại JPEG format/resolution đã được xác thực, chính sách lấy mẫu, phiên bản phái sinh, thời gian tạo, hàm băm nội dung do máy chủ tính toán và tham chiếu gốc đã băm cùng với hàm băm nội dung gốc của người gọi đáng tin cậy. Việc hủy bỏ được kiểm tra giữa các giai đoạn decode/hash không đồng bộ trước khi xác nhận bộ nhớ đệm nguyên tử.

Nhà sản xuất sản xuất chỉ sử dụng lại các khung môi giới có nguồn gốc sau khi phân tích trực quan thành công, không có video thứ hai download/extraction. Nó yêu cầu toán tử `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` từng phần nghiêm ngặt và bản ghi khóa API được xác thực ID. Giá trị principal/session do khách hàng khai báo không bao giờ thiết lập quyền sở hữu. Nếu không có cả ba điều kiện, nó sẽ không băm, thay đổi kích thước hoặc giữ lại các khung bổ sung. Lỗi lưu giữ sẽ bảo toàn phản hồi trực quan có thể sử dụng được. Các yêu cầu được đồng ý sẽ bỏ qua bộ nhớ đệm toàn bộ kết quả video để kết quả được lưu trong bộ nhớ đệm không bao giờ phát lại các thẻ điều khiển.

Các phản hồi JSON và SSE thành công sẽ hiển thị tối đa bốn thẻ điều khiển mờ trong tiêu đề `x-omniroute-video-drilldown` bị chặn. Nguồn gốc trình duyệt được ủy quyền có thể đọc tiêu đề đó mà không cần mở rộng chính sách nguồn gốc CORS. Các thẻ điều khiển mới sử dụng `v1.<32-byte random base64url token>` và sổ đăng ký chỉ giữ lại các giá trị băm SHA-256 của chúng. Trình phân tích cú pháp reader/header cũng chấp nhận mã thông báo 64-hex cũ. Người tiêu dùng công cộng được xác thực là `GET /api/v1/video-bridge/drilldown?handle=...`, được kiểm soát độc lập bởi `modalityBridgeVideoDrilldownRemoteEnabled=true`. Rõ ràng, liên tục sai, thu hồi quyền truy cập ngay cả khi tính năng dự phòng `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env cũ được bật. Duy trì sản xuất có dự phòng `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` kế thừa tương tự. Cả hai dự phòng đều tắt.

Người tiêu dùng lấy quyền sở hữu từ khóa được xác thực và áp dụng chính sách khóa: cả GET và DELETE đều thuộc danh mục điểm cuối `video`, bao gồm bí danh `/v1` và `/api/v1`. Các khóa có danh sách cho phép điểm cuối không trống phải bao gồm `video`; các phím không hạn chế vẫn tương thích. Người tiêu dùng trả về cùng một lỗi 404 cho các thẻ điều khiển không xác định, đã hết hạn và của một khóa khác. Nó chấp nhận `variant=preview|standard|detail` (kích thước JPEG tối đa 320/640/1280, không bao giờ được nâng cấp), `limit=1..8` (hoặc bí danh `frames` kế thừa, không bao giờ cả hai), `page` dựa trên 0 và giây tiêu điểm `start`/`end` tùy chọn. Các khóa truy vấn trùng lặp và cửa sổ tiêu điểm bị đảo ngược sẽ bị từ chối. Mỗi biến thể được trả về có hàm băm của nội dung thực tế và siêu dữ liệu độ phân giải thực tế, được liên kết với nguồn được giữ lại. Các biến thể có nguồn gốc từ việc đọc thay vì được lưu trữ dưới dạng bản sao được giữ lại bổ sung. Phản hồi JSON, bao gồm Base64/envelope, được giới hạn ở mức 32 MiB; một trang quá khổ trả về 413 và khách hàng phải yêu cầu ít khung hơn. Đọc việc hủy kiểm tra xung quanh mỗi lần thay đổi kích thước và kiểm tra lại tính hợp lệ của bộ xử lý trước khi quay lại. `DELETE` của chủ sở hữu là bình thường; việc xóa hoặc TTL hết hạn sẽ giải phóng nguồn được giữ lại và kế toán sử dụng.

Cửa hàng dùng chung mang tính quy trình cục bộ: các thẻ xử lý hết hạn khi khởi động lại và không thể chuyển nhượng giữa các quy trình OmniRoute độc lập. Số liệu thống kê quản lý hiển thị chính sách lưu giữ/từ xa hiệu quả và chỉ entries/bytes được giữ lại tổng hợp, không bao giờ là phương tiện, tài liệu tham khảo, IDs chính hoặc các thẻ điều khiển. Bảng cài đặt Video hiển thị các giá trị đó và có thể duy trì cả hai lần chuyển đổi sự đồng ý. Tài liệu triển khai này không phải là bằng chứng triển khai hoặc quảng bá trực tiếp; việc chấp nhận mô hình thực được theo dõi riêng biệt.

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

Chạy tiếp **cả hai** các giai đoạn.

- **`preCall`** sao chép tải trọng, chuyển `system`, `messages`, `input` và `prompt` (bao gồm các mục chuỗi đơn giản) và áp dụng `processPII()` (từ `@/shared/utils/inputSanitizer`) cho các trường `content`/`text` chuỗi. Khi `PII_REDACTION_ENABLED=true`, PII được phát hiện sẽ được loại bỏ trong tải trọng gửi đi. Điều này độc lập với `INPUT_SANITIZER_MODE` (chỉ kiểm soát chính sách nhắc nhở). Khi tính năng biên tập bị tắt, tính năng phát hiện bản ghi cuộc gọi sẽ được tính mà không cần ghi lại nội dung.
- **`postCall`** sao chép sâu phản hồi, chạy `sanitizePIIResponse()` cùng với trình che dấu hình dạng API phản hồi (`maskResponsesOutput` — bao gồm `output_text` và `output[].content[].text`). Nếu có bất kỳ sự chỉnh sửa nào xảy ra, phản hồi đã sửa đổi sẽ thay thế phản hồi ban đầu.

Lan can không bao giờ chặn; nó chỉ chú thích (`meta.detections`, `meta.redacted`) hoặc viết lại.

#### Lựa chọn theo loại, mẫu tùy chỉnh và bộ đếm phát hiện

**Trang tổng quan Cài đặt → Bảo mật → Mặt nạ → PII** chọn _cái_được che giấu. Nó không bật mặt nạ: đó vẫn là `PII_REDACTION_ENABLED` (yêu cầu) và `PII_RESPONSE_SANITIZATION` (phản hồi + SSE), cả hai đều tắt theo mặc định.

- **Lựa chọn theo loại** — các id tích hợp được liệt kê trong `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Không đặt nghĩa là mọi loại (hành vi trước khi cài đặt này tồn tại). Mẫu `ssn_us` của công cụ yêu cầu ánh xạ tới `ssn`. Các mẫu (Tối thiểu, Tiêu chuẩn, Tài chính, Brazil, USA, GDPR, POPIA, Đầy đủ) chỉ điền vào các hộp kiểm trong UI.
- **Mã định danh GDPR và POPIA** — mười hai id tích hợp bao gồm EU và số nhận dạng cá nhân Nam Phi (bảng bên dưới). Các biểu thức chính quy, trình xác thực và thẻ quyền tài phán của họ nằm trong một bảng, `src/shared/utils/piiPatterns.ts`, mà cả trình khử trùng phản hồi (`src/lib/piiSanitizer.ts`) và trình che dấu yêu cầu (`src/shared/utils/inputSanitizer.ts`) đều sử dụng. Một kết quả trùng khớp chỉ được xử lý lại khi người xác nhận nó chấp nhận nó; một dãy chữ số không bao giờ là đủ. Toán tử đã lưu lựa chọn thu hẹp trước khi các id này tồn tại sẽ giữ nguyên hành vi của nó cho đến khi các id mới được đánh dấu.
- **Mẫu tùy chỉnh** — tối đa 20 mẫu biểu thức chính quy hoặc ký tự đại diện (`*` = tối đa 64 ký tự không phải khoảng trắng, một ký tự `?` = ). Các trận đấu trở thành `[CUSTOM_REDACTED]`. Mọi mẫu đều đi qua `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): tối đa 500 ký tự, cờ được giới hạn ở `g i m s u`, phải biên dịch, phải vượt qua `safe-regex` (quay ngược thảm khốc) và không được khớp với chuỗi trống hoặc trình giữ chỗ biên tập. Một mẫu không thành công sẽ bị từ chối khi lưu và kiểm tra, đồng thời một hàng được lưu trữ không thành công sẽ bị bỏ qua trong thời gian chạy thay vì được biên dịch. Các mẫu tùy chỉnh chỉ chạy khi mặt nạ được bật.
- **Bộ đếm phát hiện** Số lượng — trên mỗi loại (giá trị không bao giờ khớp), được giữ trong bộ nhớ và đặt lại khi khởi động lại (`src/lib/pii/piiDetectionStats.ts`). Chúng chỉ tăng khi mặt nạ được bật.

Các cài đặt nằm trong bảng `key_value` (không gian tên `pii_settings`, `src/lib/db/piiSettings.ts`) và được đọc qua bộ đệm 1 giây. API:

| Phương thức | Đường dẫn                | Mục đích                                                                 |
| ----------- | ------------------------ | ------------------------------------------------------------------------ |
| `GET`       | `/api/settings/pii`      | Trạng thái cờ, `enabledTypes`, `customPatterns`, bộ đếm phát hiện        |
| `PUT`       | `/api/settings/pii`      | Thay thế `enabledTypes` (`null` = tất cả) và/hoặc `customPatterns`       |
| `POST`      | `/api/settings/pii/test` | Chạy thử (dry-run) một mẫu trên dữ liệu mẫu tối đa 8 KB; không lưu gì cả |

Cả ba đều yêu cầu xác thực quản lý và xác thực nội dung bằng Zod (`src/shared/validation/schemas/piiSettings.ts`). Khi đăng nhập bị vô hiệu hóa (`requireLogin=false`) `GET` và điểm cuối kiểm tra đang mở, nhưng `PUT` vẫn cần phiên bảng điều khiển, khóa `manage` -scope API, mã thông báo truy cập `oma_` có phạm vi ghi trở lên hoặc mã thông báo CLI hoặc mã thông báo dịch vụ nội bộ được gửi từ vòng lặp.

#### Mã định danh GDPR (EU) và POPIA (Nam Phi)

| ID                  | Định danh                  | Xác thực                                                                                 |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `iban`              | IBAN                       | Quốc gia đã biết, độ dài chính xác của quốc gia đó, ISO 13616 MOD-97-10                  |
| `eu_vat`            | Mã số VAT của EU           | Tiền tố quốc gia thành viên đã biết và định dạng số của quốc gia đó (không tra cứu VIES) |
| `es_dni_nie`        | DNI / NIE Tây Ban Nha      | Chữ cái kiểm tra (giá trị mod 23); NIE là `X/Y/Z` + 7 chữ số                             |
| `it_codice_fiscale` | Codice Fiscale Ý           | Chữ cái kiểm tra từ các bảng vị trí lẻ/chẵn                                              |
| `pl_pesel`          | PESEL Ba Lan               | Checksum có trọng số và khoảng tháng/ngày sinh được mã hóa hợp lý                        |
| `nl_bsn`            | BSN Hà Lan                 | 11-proof (trọng số 9..2, -1)                                                             |
| `de_steuer_id`      | Steuer-ID Đức              | ISO 7064 Mod 11,10 cùng quy tắc cấu trúc chữ số (không bắt đầu bằng 0)                   |
| `se_personnummer`   | personnummer Thụy Điển     | Luhn trên mười chữ số cuối và ngày sinh hợp lý (10 hoặc 12 chữ số)                       |
| `za_id`             | Số định danh Nam Phi       | Luhn trên toàn bộ 13 chữ số, tháng/ngày sinh hợp lệ, chữ số quốc tịch 0 hoặc 1           |
| `za_phone`          | Số điện thoại Nam Phi      | Tiền tố `+27` / `27`, hoặc dạng nội địa `0..` có dấu cách hay gạch nối                   |
| `za_vat`            | Mã số VAT Nam Phi          | 10 chữ số bắt đầu bằng `4` **và** "VAT" / "BTW" trong 48 ký tự đứng trước                |
| `za_tax_ref`        | Mã tham chiếu thuế Nam Phi | 10 chữ số bắt đầu bằng `0`-`3`, Luhn, **và** "tax" / "SARS" trong 48 ký tự đứng trước    |

Bởi vì các định dạng chỉ có chữ số xung đột với số thứ tự, số bản dựng và dấu thời gian, nên những định dạng yếu nhất (`za_vat`, `za_tax_ref`) cần gợi ý từ khóa và số `0..` chỉ có mười chữ số không được coi là số điện thoại Nam Phi. IBANs cách nhau (`GB29 NWBK ...`) không khớp. Trên đường dẫn phát trực tuyến, tín hiệu chỉ được tra cứu bên trong đoạn hiện tại. Các id nằm phía trước các mẫu điện thoại chung, do đó, số nhận dạng được xác thực sẽ giữ phần giữ chỗ riêng (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Các mẫu `gdpr` và `popia` lần lượt chọn id EU và Nam Phi. Bản thân việc che dấu vẫn được chọn tham gia (Quy tắc cứng #20): không có gì ở đây thay đổi mặc định cờ tính năng.

### Prompt Injection (`promptInjection.ts`)

Phát hiện các cấu trúc tấn công (adversarial) trong nội dung do người dùng cung cấp
và thực thi chính sách đã cấu hình. Hành vi được điều khiển bởi các biến môi trường
và các tùy chọn constructor:

| Cài đặt     | Biến môi trường                                                                                           | Mặc định | Tác động                                                                                                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bật         | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Khi `false`, guardrail sẽ thoát sớm (short-circuit).                                                                                                                                                      |
| Chế độ      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Chính sách injection: `block`, `warn` hoặc `log`. (`redact` được chấp nhận để tương thích ngược nhưng **không** xóa văn bản injection; việc ghi đè PII của request do `PII_REDACTION_ENABLED` kiểm soát.) |
| Ngưỡng chặn | tùy chọn `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (bí danh `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mức độ nghiêm trọng tối thiểu cần có để chặn. Với mặc định, mức Medium chỉ được quan sát.                                                                                                                 |

**Thứ tự ưu tiên chế độ** (`getMode`): `options.mode` của phía gọi →
**ghi đè feature-flag từ DB** cho `INJECTION_GUARD_MODE` (Dashboard → Cài đặt →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Do đó, một ghi đè từ dashboard sẽ thắng các biến môi trường, nên giao
diện Feature Flags điều khiển guard đang chạy theo thời gian thực (không cần
khởi động lại). Việc đọc DB là an toàn khi lỗi (fail-safe): nếu gặp lỗi, guard
quay về hành vi dựa trên env, và khi không có ghi đè nào được thiết lập thì hành
vi giống hệt với cách phân giải chỉ dùng env.

Nguồn phát hiện:

1. `sanitizeRequest()` từ `@/shared/utils/inputSanitizer` (tập detector dùng chung
   được sử dụng ở những nơi khác trong pipeline).
2. `DEFAULT_GUARD_PATTERNS` tích hợp sẵn (hiện tại gồm `system_override_inline` và
   `markdown_system_block`, cả hai đều ở mức độ nghiêm trọng `high`).
3. `customPatterns` tùy chọn được truyền qua các tùy chọn constructor (chuỗi,
   regex, hoặc các bản ghi `{ name, pattern, severity }`).

Khi `mode === "block"` **và** có ít nhất một phát hiện đạt đến ngưỡng mức độ nghiêm trọng, `preCall` trả về `{ block: true, message: "Request rejected: suspicious content detected" }`. Ở chế độ `warn`/`log`, guardrail chỉ ghi log nhưng vẫn cho phép lệnh gọi. Hàm helper dùng chung `evaluatePromptInjection()` cũng được export cho những caller cần đánh giá prompt mà không phải đi qua registry.

**Giới hạn quét (v3.8.20):** bộ phát hiện chỉ kiểm tra **16 KB đầu tiên** của văn bản prompt đã nối — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) trong `src/shared/utils/inputSanitizer.ts`. Cả `detectInjection()` và `evaluatePromptInjection()` đều `slice(0, MAX_INJECTION_SCAN_BYTES)` trước khi chạy vòng lặp mẫu. Các chỉ thị injection thường nằm gần đầu của đầu vào, vì vậy điều này giới hạn CPU/GC của regex trên các payload hàng trăm KB mà không làm suy yếu khả năng phát hiện (xem #3932, #4041).

### Trình che giấu thông tin xác thực (`credentialMasker.ts`)

Chạy ở **cả hai** giai đoạn, đứng cuối trong chuỗi mặc định (độ ưu tiên `95`). Che giấu các mẫu API-key / secret-token phổ biến khỏi payload gửi đi (nội dung tin nhắn, tham số tool-call, kết quả tool) **và** phản hồi của provider, để thông tin xác thực được dán vào prompt (hoặc được tool result trả về) không bị rò rỉ đến provider upstream hoặc quay ngược lại client.

- **Chỉ bật khi chọn tham gia (opt-in)**, cùng quy ước với việc che giấu PII (liên quan Quy tắc cứng #20): bị tắt trừ khi `settings.credentialRedactionEnabled === true` **hoặc** `CREDENTIAL_REDACTION_ENABLED=true`. Khi tắt, guardrail là no-op — không bao giờ chặn và không bao giờ ghi đè.
- `redactCredentials()` duyệt toàn bộ cây payload/response (`walkValue()`, an toàn với prototype pollution, an toàn với tham chiếu vòng nhờ `WeakSet`) và thay thế các kết quả khớp bằng placeholder `[REDACTED:<type>]`, chỉ clone những nhánh thực sự thay đổi.
- `CREDENTIAL_PATTERNS` bao gồm các khóa của LLM provider (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), khóa thanh toán (Stripe, Square), khóa cloud (AWS access key, Twilio, SendGrid, Mailgun), private key / JWT, các chuỗi kết nối chứa thông tin xác thực (`mongodb://user:pass@...`, v.v.), và một mẫu giá trị header chung `Authorization`/`x-api-key`/`api-key`/`apikey`. Các khóa dạng header (`authorization`, `x-api-key`, `api-key`, `apikey`) được che giấu theo cấu trúc (chỉ giá trị, giữ nguyên tiền tố scheme như `Bearer `/`Basic `) thay vì qua regex văn bản chung.
- Guardrail không bao giờ chặn; nó chỉ ghi đè (`modifiedPayload` / `modifiedResponse`) và chú thích (`meta.credentialsRedacted`, `meta.count`).

Kiểm thử hồi quy: `tests/unit/credential-masker-guardrail.test.ts`.

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
