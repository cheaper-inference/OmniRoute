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

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chặn các phần video cấp cao nhất trong `messages` của Chat Completions và
`input` của Responses API trước khi một đích không có hỗ trợ video native đã
biết được gọi. Các dạng được hỗ trợ là `input_video`, `video_url`,
`video_source`, các URL HTTPS, và các data URI dạng `data:video/*;base64,...`.
Tên file thuần túy trong văn bản không được coi là video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) chịu trách nhiệm duyệt
request, kiểm tra capability/policy, tổng hợp theo-từng-request, và payload
response. Công việc theo-từng-video — thu nhận, cache toàn bộ-kết-quả, mô tả
một chuỗi frame (được kết hợp với bất kỳ transcript audio nào do caller khai
báo), và metrics/abort/cleanup theo-từng-lần-thử — được ẩn sau
`processVideoPart` trong `videoBridgePipeline.ts`, được gọi một lần cho mỗi
phần video bên trong vòng lặp của `preCall`. Module đó cũng định nghĩa các ranh
giới port tường minh `VideoMediaBrokerPort` (thu nhận bytes và trích xuất các
frame đã lấy mẫu), `VideoAudioTranscriptionPort` (kết hợp một transcript audio
do caller khai báo với các caption đã lấy mẫu), và `VideoDrilldownPort` (ranh
giới persistence cho frame drill-down; chưa được kết nối vào `processVideoPart`
— hiện tại chỉ có route riêng biệt `/api/modality-bridge/video/drilldown` mới
ghi các entry drill-down).

Đường request `/v1` công khai không bao giờ import hay gọi một subprocess. Các
video từ xa được tải xuống trong giới hạn 50 MiB; các video base64 inline có
giới hạn giải mã bảo thủ 36 MiB mỗi video để envelope model/messages/framing có
thể nằm gọn trong giới hạn chấp nhận request JSON công khai là 50 MiB. Độ dài
inline và ước lượng kích thước sau giải mã được kiểm tra trước khi cấp phát.
HTTPS là bắt buộc trên URL remote ban đầu và mọi redirect, sử dụng guard
outbound chỉ-public hiện có với DNS pinning. Các bytes sau đó đi qua đúng ranh
giới broker nội bộ `POST /api/modality-bridge/video/extract`. Route đó vừa là
`LOCAL_ONLY` vừa là `SPAWN_CAPABLE`, chỉ chấp nhận một request trusted-loopback
được xác thực theo-từng-process, và không bao giờ chấp nhận URL, đường dẫn
filesystem, executable, hay danh sách tham số. Pipeline body-size của API và bộ
đọc body tăng dần của handler độc lập với nhau cùng thực thi giới hạn input
broker 50 MiB. Hàng đợi bị giới hạn của nó chạy mỗi lần một tác vụ trích xuất,
cho phép bốn job đang chờ, và giới hạn input đang chờ ở mức 100 MiB.

Bên trong broker, `ffprobe` đọc một tệp cục bộ riêng tư; danh sách cho phép định dạng cố định loại trừ các định dạng playlist và manifest. Đối với các container thuộc họ MOV được cho phép, các tham chiếu dữ liệu MOV bên ngoài vẫn bị tắt theo mặc định, và lệnh cố định không chọn tham gia chúng. Cả `ffprobe` và `ffmpeg` đều sử dụng danh sách trắng giao thức chỉ `file`, một luồng, mảng đối số cố định, không có shell, và các tệp thực thi được phân giải từ `PATH`. Các luồng ảnh bìa đính kèm (attached-picture) không phải là ứng viên có thể phát. Tất cả các luồng có thể phát phải thỏa mãn các giới hạn, và một luồng mặc định rõ ràng được ưu tiên trước phương án dự phòng theo chỉ số thấp nhất mang tính xác định. Video bị giới hạn ở 600 giây, 8,192 pixel mỗi chiều, và 33,554,432 pixel nguồn. FFmpeg lấy mẫu 1–16 khung hình JPEG ở điểm giữa, thu nhỏ cạnh dài xuống tối đa 1,024 pixel mà không phóng to các đầu vào nhỏ hơn, và không bao giờ nhận một URL. Việc lấy mẫu mặc định là `uniform`. Các chính sách tùy chọn `scene_aware` và thử nghiệm `segment_aware` thực hiện một lượt FFmpeg cố định bổ sung trên luồng cục bộ đã được xác thực, chọn các mốc thời gian cảnh `showinfo` có giới hạn, và quay về một cách xác định về cùng các điểm giữa đồng đều khi bộ phát hiện thất bại, hết thời gian chờ, đầu ra không đúng định dạng, hoặc tập ứng viên rỗng. Chế độ nhận biết phân đoạn phân bổ các mẫu điểm giữa tỷ lệ với các khoảng cảnh đã được xác thực; bằng chứng của chế độ nhận biết phân đoạn và hành vi dự phòng được trình bày chi tiết bên dưới. Giới hạn cứng 16 khung hình được áp dụng sau khi lựa chọn trong mọi chính sách. Khi một yêu cầu scene-aware chỉ có ngân sách một khung hình, nó sử dụng điểm giữa đồng đều của toàn bộ video đang hoạt động hoặc cửa sổ tập trung và báo cáo `policyEffective: uniform`: một khung cảnh được chọn duy nhất không thể bảo toàn cả hai đầu thời gian. Người gọi có thể tùy ý cung cấp một cửa sổ tập trung hữu hạn (giây `start`/`end`); các biên được kẹp vào thời lượng phương tiện, các cửa sổ bị đảo ngược hoặc không hữu hạn bị từ chối, và tất cả các chính sách lấy mẫu chỉ được thực hiện bên trong khoảng đã chuẩn hóa. Cửa sổ kết quả được đưa vào siêu dữ liệu lấy mẫu và trong tiền tố mô tả không đáng tin cậy để các mô hình hạ nguồn có thể phân biệt một đoạn trích được tập trung với toàn bộ dòng thời gian.

Tập trung chú thích ngữ nghĩa là một cài đặt riêng biệt, rõ ràng. Chế độ phân tích `full` mặc định giữ nguyên prompt khung hình hiện có và không bao giờ chuyển tiếp văn bản yêu cầu đến mô hình chú thích. Ở chế độ `focused`, bridge chỉ đọc `text`/`input_text` mới nhất, không rỗng do người dùng tạo từ cùng một container Chat hoặc Responses, chuẩn hóa nó về NFC, gộp các ký tự điều khiển và khoảng trắng, và giới hạn ở 500 điểm mã Unicode. Kết quả rỗng sẽ quay về đúng prompt `full`. Một gợi ý khả dụng được tuần tự hóa dưới dạng JSON trong một khối ngữ cảnh người dùng không đáng tin cậy chuyên dụng và chỉ có thể ưu tiên các chi tiết quan sát được; nó không thể ghi đè cảnh báo riêng về việc không tuân theo các chỉ thị hiển thị hoặc nghe được trong phương tiện. Tập trung dạng văn bản không bao giờ suy ra `start`/`end` hoặc thay đổi bộ lấy mẫu thời gian.

#### Bằng chứng phân đoạn cấu trúc FU-07

`segment_aware` sử dụng một lượt tiền phân tích có giới hạn trên luồng video cục bộ đã được xác thực. Chuỗi bộ lọc cố định trước tiên thu nhỏ xuống tối đa 320 pixel chiều rộng, phát hiện các thay đổi cảnh và khoảng đứng hình, sau đó lấy mẫu ở tốc độ 1 khung hình mỗi giây để đo độ mờ, độ sáng trung bình (luma), và thông tin không gian/thời gian. Lượt này bị giới hạn ở 600 mẫu cấu trúc, một luồng FFmpeg/bộ lọc, cùng danh sách cho phép giao thức chỉ `file` và container, giới hạn đầu ra tiến trình 1 MiB, và tối đa 30 giây trong phạm vi abort/deadline dùng chung của broker. Nó không bao giờ chấp nhận lệnh, bộ lọc, đường dẫn, hoặc URL từ yêu cầu.

Các giá trị cấu trúc là bằng chứng lấy mẫu mang tính xác định, không phải là sự hiểu biết ngữ nghĩa về video. Chúng không suy ra chủ thể, hành động, chú thích, lời nói, hoặc ý định của người dùng. Các ranh giới cảnh và đứng hình tạo thành các phân đoạn; mức độ bao phủ đứng hình, độ mờ, độ phơi sáng, chi tiết không gian, và thay đổi theo thời gian chỉ ảnh hưởng đến cách phân bổ ngân sách 1–16 khung hình hiện có. Một phân đoạn hoàn toàn đứng hình bị giới hạn ở một khung hình, trong khi các phân đoạn không đứng hình cạnh tranh phần ngân sách còn lại. Khi số ranh giới nhiều hơn số khung hình, độ bao phủ dòng thời gian đồng đều được giữ lại để các cú cắt nhanh ở đầu không thể che giấu một phân đoạn dài ở cuối. Các ranh giới cảnh nằm trong độ phân giải phân tích 1 giây của một ranh giới đứng hình được hợp nhất.

Thiếu bộ lọc, bằng chứng không đúng định dạng/rỗng, lỗi bộ phát hiện, hoặc hết thời gian chờ tiền phân tích có giới hạn sẽ fail-open về đúng chính sách điểm giữa đồng đều. Một lệnh abort của người gọi hoặc deadline của broker thì không fail-open: nó kết thúc tiến trình con đang chạy, ngăn việc trích xuất khung hình sau đó, và cây thư mục tạm riêng tư được xóa trong `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` tạo các fixture FFmpeg thực mang tính xác định cho mức tiết kiệm lời gọi chú thích sau khử trùng lặp, phân bổ ngân sách chuyển động dày đặc, bằng chứng độ mờ/độ phơi sáng/SI-TI, các cú cắt nhanh với phần đuôi dài, và các dương tính giả do chuyển mờ dần. Nó ghi lại thời gian thực (wall time) của tiền phân tích và, khi `/usr/bin/time` khả dụng, CPU của tiến trình con và RSS đỉnh. Các kiểm tra chất lượng của nó chỉ là các oracle cấu trúc. Chất lượng mô hình chú thích thực tế vẫn ở trạng thái `HOLD` vì harness này không có endpoint được ủy quyền hoặc bộ đánh giá đã đóng băng. Mức tiết kiệm tiền tệ cũng vẫn ở trạng thái `HOLD` trừ khi `--caption-cost-per-call-usd` cung cấp một ước tính dương rõ ràng cho mỗi lời gọi; script không bao giờ bịa ra bất kỳ kết quả nào trong hai kết quả đó.

Mỗi khung hình (frame) được giới hạn ở 4 MiB, tổng tất cả các khung hình thô giới hạn ở 23 MiB, và phản hồi đã tuần tự hóa của broker giới hạn ở 32 MiB. Một thư mục tạm riêng tư được xóa trong `finally`. OmniRoute không đóng gói sẵn FFmpeg và không chấp nhận đường dẫn tệp thực thi tùy chỉnh. Trước khi tạo chú thích, bridge áp dụng một bước khử trùng lặp hình ảnh (visual deduplication) theo hướng thận trọng: mỗi ảnh JPEG được giảm xuống thành bộ đệm thang xám 16×16 và chỉ được so sánh với khung hình được giữ lại gần nhất. Đối với ngân sách chú thích được yêu cầu lớn hơn một khung hình, quá trình trích xuất cung cấp một nhóm ứng viên (candidate pool) có giới hạn tối đa gấp đôi ngân sách đó và không bao giờ vượt quá 16 khung hình. Giới hạn được yêu cầu chỉ được áp dụng sau khi khử trùng lặp, với ứng viên đầu tiên và cuối cùng được chọn luôn được giữ lại trong quá trình rút gọn cuối cùng khi ngân sách ít nhất là hai. Chính sách có phiên bản `grayscale-16x16-mean-cells-v2` sử dụng giá trị lớn hơn giữa độ lệch độ chói trung bình (mean luma delta) và tỷ lệ các ô thumbnail có độ lệch đã chuẩn hóa ít nhất là 0.05. Ngưỡng trùng lặp là hằng số 0.04, được chọn để đảm bảo tính dự đoán được thay vì được đưa ra thành một thiết lập thời gian chạy (runtime setting). Tín hiệu phụ có độ tương phản cao này bảo toàn các chuyển động nhỏ và những thay đổi về văn bản hiển thị mà phép so sánh chỉ dựa trên giá trị trung bình có thể che giấu. Lỗi của bộ so sánh hoặc bộ giải mã sẽ fail open và duy trì độ bao phủ. Metadata đầu ra tách biệt giữa các ứng viên được trích xuất, các khung hình được sử dụng thành công, và các khung hình trùng lặp về hình ảnh bị loại bỏ.

Một phần video được đánh dấu rõ ràng có thể yêu cầu một contact sheet kèm dấu thời gian. Bridge xây dựng tối đa một lưới JPEG gồm 4 cột, 16 khung hình. Mỗi ô 512 pixel sẽ ghi (burn) dấu thời gian nguồn của nó vào một dải đáy có độ tương phản cao, trong khi các dấu thời gian đó vẫn được giữ trong metadata dạng văn bản để phục vụ việc liên kết và kiểm toán ở hạ nguồn. Toàn bộ ảnh JPEG vẫn bị giới hạn ở 32 MiB. Nếu `sharp` không thể giải mã hoặc tổng hợp lưới, bridge sẽ quay về dùng các khung hình JPEG riêng lẻ; một thao tác hủy (abort) từ phía client vẫn được truyền qua toàn bộ thao tác tạo sheet.

Bằng chứng thăng cấp (promotion evidence) được cố ý tách biệt khỏi microbenchmark tổng hợp (synthetic composition microbenchmark). `scripts/perf/video-bridge-contact-sheet-eval.ts` định nghĩa một bộ khung A/B (harness) có phiên bản schema dành cho các mô hình vision thực tế tương thích OpenAI. Nó đo lường số token do nhà cung cấp báo cáo, độ trễ thời gian thực đầu-cuối (bao gồm cả việc tổng hợp sheet), số lượng lệnh gọi mô hình, và mức độ giữ lại dữ kiện được định nghĩa trong manifest. Các phản hồi thô của mô hình không được ghi vào báo cáo; chỉ có các digest SHA-256 và ID dữ kiện khớp được giữ lại. Bộ khung này không thực hiện bất kỳ lệnh gọi mạng hay lệnh gọi mô hình trả phí nào trừ khi được truyền `--execute-real` và đã cấu hình `--model`, `OMNIROUTE_BASE_URL` cùng `OMNIROUTE_API_KEY`. Nếu không có lần chạy thực tế được chỉ định rõ ràng đó, kết luận máy-đọc-được của nó vẫn là `HOLD`; chỉ riêng các phép đo payload/số lượng lệnh gọi tổng hợp không đủ làm bằng chứng thăng cấp.

Phía gọi có thể đính kèm một mảng `transcript.cues` tùy chọn vào một phần video được hỗ trợ khi họ đã có sẵn văn bản đã căn chỉnh (aligned text). Mỗi cue phải mang `text`, một khoảng `start`/`end` hữu hạn nằm trong thời lượng đã thăm dò (probed duration), và một `source` nằm trong danh sách cho phép (`client`, `embedded`, hoặc `audio-bridge`); `confidence` mặc định là `1` và phải nằm trong khoảng từ `0` đến `1`. Các cue trùng lặp chính xác sẽ được gộp lại. OmniRoute không bao giờ khởi động quá trình phiên âm (transcription) từ metadata này: các cue đã được xác thực sẽ được sao chép vào kết quả mô tả kèm theo source, confidence, và khoảng thời gian, đồng thời được hiển thị như các quan sát không đáng tin cậy (untrusted observations) bên cạnh các chú thích khung hình. Văn bản không hợp lệ, nằm ngoài phạm vi, hoặc không có nguồn gốc (provenance) sẽ bị từ chối thay vì bị trộn vào luồng chú thích. Cả hai kênh transcript trong request body đều chuẩn hóa nguồn gốc được cung cấp thành `client`, kể cả các nhãn tự khai báo là `embedded` hoặc `audio-bridge`. Chỉ một adapter do server sở hữu mới có thể gán các nhãn tin cậy đó thông qua tham số chỉ-truy-cập-từ-mã `trustedSource`; một trường JSON trong request không thể chạm tới tham số đó. Văn bản transcript vẫn là nội dung không đáng tin cậy bắt nguồn từ media, bất kể nguồn gốc của nó, và không bao giờ được dùng để quyết định việc cấp quyền (authorization).

Phía gọi nâng cao có thể cung cấp một track `audioTranscript` cho cùng video đó; track này được xem là văn bản do client cung cấp, chứ không phải bằng chứng của việc phiên âm phía server. Điểm nối kết hợp (fusion seam) chạy các quan sát hình ảnh và âm thanh trong một deadline và một abort signal chung, sắp xếp chúng trên một dòng thời gian chung, gộp các mục trùng lặp chính xác, và báo cáo kết quả một phần (partial result) khi chỉ một phía thành công. Một `audioTranscript` không hợp lệ sẽ suy giảm xuống thành kết quả một phần đó — phần mô tả hình ảnh được giữ lại và nhánh âm thanh ghi lại một mã lỗi đã được làm sạch (sanitized failure code) — thay vì làm hỏng toàn bộ video. Tính sẵn sàng của từng nhánh, cờ partial, và các mã lỗi đã làm sạch được bảo toàn trong kết quả mô tả, trong metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), trong metadata của bộ đệm kết quả (result-cache), và trong các bộ đếm fusion của bridge. Đường dẫn Video Bridge mặc định không gọi dịch vụ chuyển giọng nói thành văn bản (speech-to-text) và không tải xuống một bản sao media thứ hai; nếu không có track được chỉ định rõ ràng đó, nó vẫn chỉ là video-only.

**Lưu giữ transcript (#12150 P1).** Điều này được áp dụng tự động bất cứ khi nào
Video Bridge (vốn là tính năng opt-in) hiển thị một transcript cue — không có
cờ lưu giữ riêng biệt. Khi một request hiển thị bất kỳ transcript cue nào (một
`transcript` do caller khai báo hoặc một `audioTranscript` được hợp nhất), guardrail
sẽ đánh dấu nó là `videoBridgeObserved` và tạo ra một bản sao đã lược bỏ (redacted
shadow) của phần mô tả video — một bản hiển thị giống hệt trong đó phần thân
văn bản tự do của mọi cue được thay thế bằng
`[redacted-video-transcript]`, được xây dựng bằng cách thay thế trường cue có
cấu trúc trước khi chuỗi được lắp ráp (không bao giờ bằng cách phân tích văn bản
đã được làm phẳng, vì vậy không có nội dung cue nào — dù độc hại hay thông
thường, kể cả các phần thân chứa `]` như
`[inaudible]`/`[music]` — có thể tồn tại sót lại). Phần thân request trong
call-log được lưu trữ sẽ thay thế mỗi phần văn bản bắt nguồn từ video bằng bản
sao đã lược bỏ đó, được khớp theo sự bằng nhau về nội dung; neo `fullText`
được đọc lại từ payload guardrail trước khi gọi (pre-call) đã hoàn tất, vì vậy
việc khớp vẫn thành công sau khi các guardrail sau đó trong chuỗi (các bộ che
PII và credential, mức ưu tiên 10/95) ghi đè văn bản mô tả tại chỗ và sau khi
việc chèn system-prompt/handoff/memory định hình lại mảng tin nhắn. Phần thân
gửi lên upstream tới model không thay đổi. Một request được quan sát (observed)
cũng không tạo ra bất kỳ Memory bền vững nào (cả việc trích xuất từ request lẫn
từ response đều được bỏ qua), vì vậy câu trả lời của chính model không thể lặp
lại văn bản transcript vào Memory.

**Các trường video thô (#12430).** Khi bridge được bật và khả năng hỗ trợ video native chưa biết hoặc không có, các trường `transcript`/`audioTranscript` được định nghĩa cũng kích hoạt `videoBridgeObserved`, ngay cả sau khi việc mô tả thất bại hoặc đạt tới giới hạn `maxVideos`. `null` và chuỗi rỗng đều được tính; các trường vắng mặt và metadata không phải video thì không. Các bản sao được lưu giữ sẽ lược bỏ các trường này hoặc bỏ qua toàn bộ request, và caches/Memory đều bị bỏ qua (bypass).

Trên các đường dẫn fallback đó, các cue hợp lệ của caller trở thành các phần
`text`/`input_text` được hỗ trợ thay vì các trường provider không chuẩn. Cả hai
track do request cung cấp vẫn là các quan sát `client` không đáng tin cậy, kèm
theo cảnh báo rõ ràng rằng video đã không được mô tả và các dấu thời gian chưa
được xác minh so với nội dung media. Ngân sách tổng 256 cue/64-KiB và ngân sách
mỗi cue hiện có áp dụng chung cho cả hai track cùng nhau; các dấu thời gian phải
nằm trong trần 600 giây của broker và bất kỳ cửa sổ focus nào được cung cấp. Các
track không hợp lệ sẽ bị loại bỏ, không được chuyển tiếp dưới dạng văn bản tùy ý;
một track anh em hợp lệ vẫn có thể được sử dụng trừ khi ngân sách kết hợp của
chúng bị vượt quá. Các trường null/rỗng không thêm văn bản nào. Fallback này
không thêm bất kỳ việc tải media hay phiên âm nào. Các trường mở rộng transcript
bị xóa khỏi video carrier fallback và các đối tượng `video_url`/`source` của nó.
Danh sách cho phép (allowlist) wire của OpenAI vẫn giữ nguyên nghiêm ngặt; các
video carrier chưa biết mức hỗ trợ native vẫn khả dụng và các target chỉ-văn-bản
đã biết vẫn giữ các điểm đánh dấu an toàn. Các bản sao lược bỏ có cấu trúc bảo
vệ văn bản transcript được thêm vào, trong khi request gốc thuộc sở hữu của
caller vẫn không thay đổi. Các target được hỗ trợ native và các bridge bị tắt
vẫn giữ hành vi bypass hiện có của chúng.

Các bản sao lưu giữ bổ sung sử dụng cùng tín hiệu request-được-quan-sát. Snapshot
request-client thô trước guardrail, request đang chờ trong bộ nhớ, và log request
bị từ chối sớm sẽ thay thế về mặt cấu trúc các trường transcript trong các phần
video; các prompt dạng chuỗi được tổng hợp bởi các giai đoạn pipeline và việc
chuyển giao ngữ cảnh (context handoff) được lược bỏ tại sink phần thân request
được lưu trữ. Điểm đánh dấu `video_content_removed` được lưu trữ khiến việc
tiếp tục qua `previous_response_id` thất bại ở trạng thái đóng (fail closed)
thay vì tái cấu trúc văn bản đã bị cố ý loại bỏ. Nếu một request được quan sát
mất bản sao lược bỏ theo từng phần của nó trước khi ghi log, hoặc thậm chí chỉ
một trong số nhiều bản sao video không khớp sau các lần thay đổi request về sau,
phần thân request được lưu giữ sẽ bị bỏ qua hoàn toàn thay vì giữ lại một
transcript chỉ được lược bỏ một phần.

Đối với một request được quan sát, response của model có thể trích dẫn bất kỳ
phần nào của transcript mà không có ranh giới cue có cấu trúc. Do đó,
`responseBody` trong call-log được lưu trữ của nó sẽ được thay thế bằng một điểm
đánh dấu bỏ qua (omission marker); artifact pipeline chi tiết (có thể bao gồm
các phần thân upstream/client và các chunk stream) không được lưu giữ. Các cache
semantic, idempotency và reasoning-replay bỏ qua cả việc đọc lẫn ghi cho request
đó. Request gửi tới provider và response hiển thị với client vẫn không thay đổi.
Các byte keepalive sớm được xả khỏi bộ đệm tạm thời khi artifact chi tiết bị bỏ
qua. Cảnh báo EventStream không đúng định dạng của Kiro chỉ báo cáo số lượng
byte của payload, không bao giờ báo cáo nội dung của nó hoặc lỗi thô của bộ
phân tích JSON. Điều này không khẳng định rằng mọi chẩn đoán provider/plugin
không liên quan đã được kiểm toán; việc quét các sink lưu giữ rộng hơn được
theo dõi trong #11658.

Vòng đời `/api/modality-bridge/video/drilldown` nội bộ là một nền tảng cache
riêng biệt, được xác thực bằng loopback/token. Mọi thao tác cũng yêu cầu một
principal ID mờ (opaque) chuẩn (canonical). Trước khi một caller production được
kích hoạt, nó phải dẫn xuất ID đó từ tenant đã được xác thực và không bao giờ
được chuyển tiếp một giá trị do client chọn. Các khóa cache ràng buộc principal
đó với các ID phiên và ID tham chiếu video chuẩn, chỉ lưu trữ các khóa dẫn xuất
từ SHA-256 của chúng, và giới hạn phạm vi cả việc đọc lẫn xóa trong cùng
principal đó. Cache lưu trữ tối đa 16 khung hình JPEG dẫn xuất mỗi mục (entry),
cho hết hạn sau mười phút, và hỗ trợ đọc có giới hạn theo `start`/`end` hoặc
xóa phiên một cách rõ ràng.

Mỗi principal bị giới hạn ở 16 mục và 64 MiB dữ liệu JPEG chuẩn. Các giới hạn
đó độc lập với trần toàn cục 64 mục/256 MiB: áp lực hạn ngạch principal chỉ
loại bỏ các mục ít được sử dụng gần đây nhất của chính principal đó trước khi
việc loại bỏ LRU toàn cục được xem xét. Các mục hết hạn được quét khỏi cả hạch
toán principal lẫn toàn cục khi có hoạt động cache, trong khi việc hủy và thất
bại xác thực không commit một thay thế một phần.

Cache từ chối Base64 không chuẩn, phần đệm thừa, media không phải JPEG, các JPEG bị lỗi định dạng hoặc bị cắt ngắn, và các JPEG phát sinh cảnh báo trong quá trình giải mã toàn ảnh có giới hạn bằng `sharp`. Cache mã hóa lại mỗi ảnh được chấp nhận thành một JPEG chuẩn hóa, suy ra chiều rộng và chiều cao từ các byte đã giải mã thay vì tin tưởng các trường từ phía caller, và loại bỏ mọi byte polyglot nằm cuối thay vì giữ lại chúng. Chỉ buffer nén chuẩn hóa có giới hạn mới được tính vào cả hai hạn ngạch. Giới hạn truyền tải JSON bao gồm chi phí Base64 cho mức trần đầu vào đã giải mã 32 MiB. Mỗi
dẫn xuất được lưu trữ đều ghi lại định dạng/độ phân giải JPEG đã xác thực, chính sách lấy mẫu,
phiên bản dẫn xuất, thời điểm tạo, hash nội dung do máy chủ tính, và tham chiếu cha đã hash
cùng với hash nội dung cha của caller tin cậy. Việc hủy được kiểm tra
giữa các pha giải mã/hash bất đồng bộ trước khi commit cache nguyên tử.

Phần (tranche) này chưa kết nối producer production vào route và chưa
cung cấp lựa chọn biến thể đa độ phân giải. Do đó, đường dẫn yêu cầu Video Bridge trong suốt
không phát sinh thêm công việc, trong khi việc dẫn xuất principal gắn với tenant và
toàn bộ vòng đời đa độ phân giải FU-08 vẫn là công việc tiếp nối được nêu rõ thay
vì được tài liệu hóa như hành vi đã hoàn thiện.

Các khung hình được gắn chú thích tuần tự bằng mô hình Video đã cấu hình. Nếu giá trị ghi đè
Video để trống thì kế thừa thiết lập Vision; nếu cả hai đều trống, bộ định tuyến tự động
Vision sẽ chọn mô hình hiệu lực có khả năng vision. Các chú thích thành công
thay thế phần gốc bằng tiền tố ổn định `[Video description:` — tiền tố này cũng
đánh dấu văn bản là một quan sát không tin cậy bắt nguồn từ media và chỉ thị cho các mô hình
hạ nguồn không tuân theo các chỉ dẫn tìm thấy trong media. Khóa cache
chú thích khung hình bao gồm các byte JPEG, prompt, timestamp, và mô hình hiệu lực; chỉ các
chú thích thành công mới được cache. Các mục cache giữ lại mô hình producer
thực tế đã thành công, kể cả mô hình dự phòng; bridge báo `mixed` khi các khung hình
khác nhau được tạo bởi các mô hình khác nhau. Khi trúng cache (cache hit), danh tính producer
đó được tái sử dụng thay vì bị gắn nhãn lại theo kế hoạch định tuyến được yêu cầu.
Cache kết quả toàn video được khóa theo mọi đầu vào làm thay đổi đầu ra — prompt, mô hình
hiệu lực, chính sách lấy mẫu, số khung hình, chế độ phân tích ngữ nghĩa, dấu vân tay SHA-256
của gợi ý tiêu điểm đã chuẩn hóa, cửa sổ tiêu điểm, `transcript`,
`audioTranscript`, và cờ contact-sheet — vì vậy việc thay đổi bất kỳ chiều nào
trong số đó đều là cache miss, không bao giờ là tái sử dụng dữ liệu cũ. Phiên bản chính sách
khử trùng lặp hình ảnh, ngưỡng, và số khung hình ứng viên có giới hạn cũng được nêu rõ trong
khóa và metadata của cache kết quả; do đó một thay đổi chính sách không thể tái sử dụng mô tả
toàn video cũ. Metadata cache kết quả v4 giữ chế độ và
dấu vân tay, không bao giờ giữ tác vụ người dùng thô. Metadata của guardrail báo cáo cả
chế độ phân tích được yêu cầu lẫn chế độ hiệu lực; chế độ `focused` được yêu cầu
nhưng không có văn bản người dùng khả dụng sẽ được báo cáo là hiệu lực `full`.

Guardrail trích xuất mọi phần video được hỗ trợ nhưng không mô tả quá
`modalityBridgeVideoMaxVideos`. Đối với target được chứng minh có
`supportsVideo === false`, các video lỗi và vượt giới hạn sẽ trở thành các điểm đánh dấu
văn bản an toàn rõ ràng để không còn video thô nào sót lại. Khi chưa biết khả năng,
các phần đó giữ nguyên vật mang video; mọi transcript dự phòng đều tuân theo quy trình
chuyển đổi văn bản có giới hạn ở trên. Các target có `supportsVideo === true` bỏ qua bridge.
Tín hiệu hủy yêu cầu của client lan truyền qua quá trình tải xuống, hàng đợi broker,
các tiến trình con, và các lệnh gọi gắn chú thích; việc hủy dừng giữa các video và không bao giờ
fail-open sang media thô.

Cài đặt runtime được lưu trong DB và được xác thực bằng Zod:

| Khóa                                | Mặc định    | Phạm vi / hành vi                                                                                           |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime tùy chọn, phải chủ động bật (opt-in)                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` giữ nguyên chú thích chung; `focused` dùng ngữ cảnh người dùng mới nhất có giới hạn và không tin cậy |
| `modalityBridgeVideoModel`          | `""`        | Kế thừa mô hình Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, hoặc `segment_aware` theo tỷ lệ; khi bộ phát hiện lỗi sẽ quay về `uniform`        |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Các giá trị timeout Video cũ đã lưu vượt quá 120 giây sẽ bị kẹp về deadline
của broker; các lần ghi cài đặt mới vượt quá giới hạn đó sẽ bị từ chối.
`GET /api/modality-bridge/video/runtime` yêu cầu locality loopback
được đóng dấu tin cậy trước khi xác thực hoặc thăm dò runtime, sau đó yêu cầu xác thực
quản trị. Endpoint chỉ trả về `available`, các phiên bản FFmpeg/ffprobe đã được làm sạch, và một
lý do cố định khi runtime không khả dụng. Endpoint trích xuất nội bộ không
phải là API tải lên công khai: hàng đợi bão hòa trả về `503` kèm `Retry-After`, caller
ngắt kết nối trả về `499`, và deadline cố định của broker trả về `504`. Các phản hồi đã chuyển đổi thêm
`video->text;model=<visionModel>;parts=<videos>` vào header trung tâm
`x-omniroute-modality-bridge` mà không xóa các phân đoạn Vision hoặc Audio.

### PII Masker (`piiMasker.ts`)

Chạy ở **cả hai** giai đoạn.

- **`preCall`** sao chép (clone) payload, duyệt qua `system`, `messages`, `input` và
  `prompt` (bao gồm cả các phần tử chuỗi thuần túy), và áp dụng `processPII()` (từ
  `@/shared/utils/inputSanitizer`) cho các trường `content`/`text` dạng chuỗi. Khi
  `PII_REDACTION_ENABLED=true`, PII được phát hiện sẽ bị che trong payload gửi đi.
  Điều này độc lập với `INPUT_SANITIZER_MODE` (vốn chỉ kiểm soát chính sách
  prompt-injection). Khi tắt tính năng che, lệnh gọi vẫn ghi nhận số lượng phát hiện
  mà không ghi đè nội dung.
- **`postCall`** sao chép sâu (deep-clone) response, chạy `sanitizePIIResponse()` cùng
  với bộ che theo cấu trúc Responses API (`maskResponsesOutput` — bao gồm
  `output_text` và `output[].content[].text`). Nếu có bất kỳ việc che nào xảy ra,
  response đã chỉnh sửa sẽ thay thế response gốc.

Guardrail không bao giờ chặn; nó chỉ chú thích (`meta.detections`,
`meta.redacted`) hoặc ghi đè.

#### Lựa chọn theo loại, mẫu tùy chỉnh và bộ đếm phát hiện

**Dashboard → Cài đặt → Bảo mật → Che PII** chọn _những gì_ được che. Nó
không bật tính năng che: việc đó vẫn do `PII_REDACTION_ENABLED` (request) và
`PII_RESPONSE_SANITIZATION` (response + SSE) đảm nhiệm, cả hai đều tắt theo mặc định.

- **Lựa chọn theo loại** — các id tích hợp sẵn được liệt kê trong
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Chưa thiết lập nghĩa là
  áp dụng mọi loại (hành vi như trước khi cài đặt này tồn tại). Mẫu `ssn_us` của
  engine xử lý request được ánh xạ sang `ssn`. Các template (Minimal, Standard,
  Financial, Brazilian, USA, Full) chỉ điền sẵn các hộp kiểm trong giao diện.
- **Mẫu tùy chỉnh** — tối đa 20 mẫu regex hoặc wildcard (`*` = tối đa 64
  ký tự không phải khoảng trắng, `?` = một ký tự). Các đoạn khớp trở thành
  `[CUSTOM_REDACTED]`. Mọi mẫu đều đi qua `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): tối đa 500 ký tự, cờ giới hạn
  ở `g i m s u`, phải biên dịch được, phải vượt qua `safe-regex` (kiểm tra
  catastrophic backtracking), và không được khớp chuỗi rỗng hoặc placeholder
  che. Mẫu không đạt sẽ bị từ chối khi lưu và khi kiểm thử, còn một bản ghi đã
  lưu mà không đạt sẽ bị bỏ qua khi chạy thay vì được biên dịch. Mẫu tùy chỉnh
  chỉ chạy khi tính năng che đang bật.
- **Bộ đếm phát hiện** — số lượng theo từng loại (không bao giờ là giá trị khớp),
  được giữ trong bộ nhớ và đặt lại khi khởi động lại
  (`src/lib/pii/piiDetectionStats.ts`). Chúng chỉ tăng khi tính năng che đang bật.

Các cài đặt nằm trong bảng `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) và được đọc thông qua cache 1 giây. API:

| Phương thức | Đường dẫn                | Mục đích                                                                 |
| ----------- | ------------------------ | ------------------------------------------------------------------------ |
| `GET`       | `/api/settings/pii`      | Trạng thái cờ, `enabledTypes`, `customPatterns`, bộ đếm phát hiện        |
| `PUT`       | `/api/settings/pii`      | Thay thế `enabledTypes` (`null` = tất cả) và/hoặc `customPatterns`       |
| `POST`      | `/api/settings/pii/test` | Chạy thử (dry-run) một mẫu trên dữ liệu mẫu tối đa 8 KB; không lưu gì cả |

Cả ba đều yêu cầu xác thực quản trị (management auth) và kiểm tra body bằng Zod
(`src/shared/validation/schemas/piiSettings.ts`).

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
