# Authorization Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Nguồn đáng tin cậy:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Cập nhật lần cuối:** 2026-09-22 — các không gian tên phạm vi trỏ đến MCP-SERVER.md

OmniRoute có một quy trình ủy quyền nhận biết tuyến đường, kiểm soát mọi yêu cầu API. Phân loại là **xác định** và **đóng khi lỗi** — bất cứ thứ gì không thể phân loại sẽ được xếp vào loại `MANAGEMENT` và yêu cầu một phiên hoặc mã thông báo cấp quản lý. Trang này giải thích mô hình cho các kỹ sư duy trì các tuyến đường hoặc thiết kế các điểm cuối mới.

![Quy trình AuthZ (3 lớp tuyến đường + đánh giá chính sách)](../diagrams/exported/authz-pipeline.svg)

> Nguồn: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Hai chế độ xác thực

### 1. Khóa API (Bearer)

Được sử dụng cho các API máy khách tương thích với OpenAI/Anthropic/Gemini và một số route quản lý khi khóa có phạm vi `manage`.

```
Authorization: Bearer <api-key>
```

Được xác thực bởi `isValidApiKey()` / `extractApiKey()` trong `src/sse/services/auth.ts` và được tái xuất thông qua `src/shared/utils/apiAuth.ts`. Trình xác thực cũng chấp nhận các biến môi trường `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` làm khóa chuyển tiếp cố định (issue #1350).

### 2. Phiên dashboard (cookie auth_token)

Dành cho các trang dashboard và thao tác quản trị.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie chỉ là một phiên khi JWT được xác minh thành công **và** chứa `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Mọi
thành phần sử dụng cookie (trình bảo vệ route dashboard (`isDashboardSessionAuthenticated()`), làm mới pipeline authz, bắt tay WebSocket, máy chủ
trực tiếp, `/api/settings/require-login`, `/api/auth/status`) đều đi qua hàm trợ giúp đó.
Cũng tồn tại các JWT khác được ký bằng `JWT_SECRET` — cơ chế chuyển tiếp Cursor CLI tạo
token `iss "omniroute" / aud "cursor-cli"` cho người giữ khóa — và chúng không bao giờ là phiên
(#13298).

Được xác minh bởi `isDashboardSessionAuthenticated()` trong `src/shared/utils/apiAuth.ts`. Pipeline tự động làm mới JWT khi thời hạn còn lại dưới 7 ngày trong vòng đời 30 ngày của nó.

Một phiên cũng có thể kết thúc trước khi hết 30 ngày vì mọi trình tạo token đều đi qua `mintDashboardSessionToken` (với thời điểm phát hành `iat` và mã định danh `jti`) và trình xác minh kiểm tra hai cài đặt: `sessionsValidAfter`, được thiết lập khi thay đổi mật khẩu để mọi phiên được phát hành trước thời điểm đó không còn được xác minh (trình duyệt thực hiện đổi mật khẩu sẽ nhận được cookie mới), và `revokedDashboardSessions`, nơi `POST /api/auth/logout` thêm `jti` của phiên đã đăng xuất. Các phiên được tạo bởi bản phát hành cũ hơn không chứa cả hai claim này và vẫn hợp lệ cho đến lần thay đổi mật khẩu đầu tiên. Nếu không thể đọc các cài đặt, phiên sẽ không được tin cậy.

Một số route quản lý chấp nhận **một trong hai** chế độ: cookie HOẶC `Bearer <key>` khi khóa API có phạm vi `manage` (hoặc `admin`). Đây là cơ chế hỗ trợ quy trình "có thể cấu hình thông qua các lệnh gọi API" được bổ sung trong v3.8.

#### Cổng đăng nhập OIDC tùy chọn (#6973)

Đăng nhập quản trị dashboard cũng hỗ trợ luồng OIDC (OpenID Connect) **tùy chọn tham gia**
song song với đăng nhập bằng mật khẩu mặc định — đăng nhập bằng mật khẩu không bao giờ bị loại bỏ mà chỉ
được bổ sung:

- Bị vô hiệu hóa trừ khi `settings.oidcEnabled === true` **và** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` đều đã được cấu hình (Cài đặt → Xác thực).
  Nếu không, `GET /api/auth/oidc/login` sẽ trả về `400`.
- `GET /api/auth/oidc/login` khám phá `authorization_endpoint` từ
  `/.well-known/openid-configuration` của issuer (dự phòng bằng
  `<issuer>/authorize`), tạo URI chuyển hướng từ yêu cầu đến
  (có nhận biết `x-forwarded-proto`) và chuyển hướng đến IdP với một `state`
  ngẫu nhiên được lưu trong cookie `oidc_state` có thuộc tính `httpOnly`.
- `GET /api/auth/oidc/callback` xác thực `state`, trao đổi mã ủy quyền
  và xác minh chữ ký của ID token thông qua JWKS của issuer
  (`createRemoteJWKSet` của `jose`, được lưu vào bộ nhớ đệm theo từng URI JWKS), đồng thời
  kiểm tra `issuer`/`audience`. Quyền truy cập dashboard yêu cầu danh sách
  `oidcAllowedSubjects` không rỗng, chính sách `oidcAdmissionClaim` hoặc cả hai.
  Danh sách subject chỉ khớp với `sub` hoặc `email` khi `email_verified === true`.
  Chính sách claim tùy chọn nhận một đường dẫn claim trong ID token được phân tách
  bằng dấu chấm (ví dụ: `realm_access.roles`) và một mảng các giá trị được chấp nhận;
  claim đã phân giải phải là một mảng chuỗi chứa ít nhất một giá trị được chấp nhận.
  Nếu cả hai chính sách đều được cấu hình thì cả hai đều phải đạt. Các claim bị thiếu
  hoặc sai định dạng sẽ bị từ chối theo cơ chế fail-closed, và nếu không có chính sách
  nào thì callback sẽ từ chối đăng nhập (`not_configured`). Các cấu hình hiện có chỉ
  dựa trên subject tiếp tục hoạt động mà không thay đổi.
- Keycloak thường ánh xạ các vai trò realm vào access token, không nhất thiết vào ID
  token. Để yêu cầu vai trò realm `admin`, hãy cấu hình một protocol mapper cho
  client này để đưa `realm_access.roles` vào **ID token**, sau đó đặt
  `oidcAdmissionClaim` thành `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Hãy kiểm tra claim thực tế trong ID token của client này trước khi bật cơ chế cấp
  quyền chỉ dựa trên vai trò; ứng dụng không đọc các vai trò trong access token. Việc
  từ chối token ở phía IdP có thể bổ sung nhưng không thay thế bước kiểm tra này ở
  phía ứng dụng.
- Khi thành công, hệ thống tạo JWT `auth_token` 30 ngày **hoàn toàn giống** JWT do
  đăng nhập bằng mật khẩu cấp (`src/app/api/auth/login/route.ts`), vì vậy phần còn lại
  của quy trình phiên dashboard (tự động làm mới, các cờ cookie) không thay đổi —
  OIDC chỉ thay thế cách cookie được tạo, chứ không thay đổi quyền mà cookie cấp.
  Các thay đổi đối với vai trò/nhóm trên IdP không làm mất hiệu lực các phiên OmniRoute
  hiện có; việc đăng xuất, thay đổi mật khẩu hoặc hết hạn phiên vẫn chi phối vòng đời
  của chúng.
- Mọi cài đặt `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) đều nằm trong
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  trả về `400 PASSWORD_REQUIRED` trừ khi phần body chứa mật khẩu quản trị dưới dạng
  `currentPassword` (`401 PASSWORD_MISMATCH` khi mật khẩu không đúng).
  `oidcDisablePasswordLogin` từ chối _đăng nhập_ bằng mật khẩu
  (`POST /api/auth/login`) nhưng vẫn giữ lại hash mật khẩu đã lưu và quá trình xác
  thực lại vẫn kiểm tra `currentPassword` dựa trên hash đó.
- `corsOrigins` và `bruteForceProtection` cũng nằm trong
  `SECURITY_IMPACTING_SETTINGS_KEYS`: việc nới lỏng một trong hai sẽ làm suy yếu các
  biện pháp bảo vệ đăng nhập, vì vậy chúng yêu cầu cùng quy trình xác thực lại bằng
  `currentPassword` (tab Bảo mật sẽ yêu cầu giá trị này), còn tính năng nhập JSON sẽ
  loại bỏ chúng.
- Mọi khóa chính sách bảo mật — các mục trong `SECURITY_IMPACTING_SETTINGS_KEYS`,
  mọi khóa `oidc*` và trạng thái phiên dashboard — đều **chỉ dành cho người vận hành**
  trên `PATCH /api/settings`: API key có scope `manage` hoặc access token `oma_` sẽ
  bị từ chối với `403` ngay cả khi gửi đúng `currentPassword`, và lần từ chối này
  được ghi vào nhật ký kiểm toán dưới dạng `settings.update_failed` với
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` trong `src/lib/api/operatorCredential.ts`).
  Các cài đặt thông thường (giao diện, tùy chọn hiển thị) vẫn có thể được ghi bằng
  key `manage` hoặc access token `admin`. Mọi thao tác thay đổi trên chính
  `/api/settings` (và trên `/api/settings/require-login`) cũng cần scope access token
  `admin` (`ADMIN_MUTATION_EXACT_PATHS` trong `src/server/authz/accessScopes.ts`,
  đối sánh chính xác đường dẫn); `GET` vẫn dùng `read`, còn các tuyến con
  `/api/settings/*` khác (proxy, giá trị mặc định của combo, bí danh model, nén,
  xóa dữ liệu…) vẫn giữ scope `write` được suy ra từ phương thức.
- `POST /api/settings/import-json` bỏ qua bước xác thực lại đó, vì vậy trước khi ghi,
  nó loại bỏ mọi khóa trong `IMPORT_STRIPPED_SETTINGS_KEYS` (cùng tệp): mật khẩu và
  `currentPassword`, mọi mục trong `SECURITY_IMPACTING_SETTINGS_KEYS` và trạng thái
  phiên dashboard (`sessionsValidAfter`, `revokedDashboardSessions`).
  Do đó, việc nhập một bản sao lưu cũ không thể khôi phục phiên đã bị chấm dứt bởi
  thao tác thay đổi mật khẩu hoặc đăng xuất.

## Các lớp route

`src/server/authz/types.ts` định nghĩa ba lớp; mọi route không thể phân loại một cách xác định sẽ rơi về `MANAGEMENT`.

| Lớp          | Mô tả                                                                                                                                                     | Xác thực yêu cầu                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Các route an toàn một cách rõ ràng — đăng nhập, đăng xuất, trạng thái, khởi tạo, health và bootstrap onboarding.                                          | Không có                                                         |
| `CLIENT_API` | Các endpoint phục vụ model — `/api/v1/*`, `/api/v1beta/*`, cùng các alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Khóa Bearer khi cờ tính năng `REQUIRE_API_KEY` hiệu lực đang bật |
| `MANAGEMENT` | Các trang dashboard, cài đặt, nhà cung cấp, khóa, và các endpoint quản trị và chẩn đoán.                                                                  | Phiên dashboard HOẶC Bearer có phạm vi `manage`                  |

Một số hành động `MANAGEMENT` chỉ dành cho **operator**: khóa `manage` là không đủ. Việc xuất thông tin xác thực đã lưu (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), khôi phục bản sao lưu đè lên dữ liệu trực tiếp (`POST /api/db-backups/import` kể cả với `dryRun=true`, `POST /api/db-backups` khôi phục theo id, `POST /api/settings/import-json`), và hủy các điểm khôi phục (`DELETE /api/db-backups` dọn dẹp, và `PATCH /api/db-backups` vì thời gian lưu giữ mà nó duy trì điều khiển việc cắt tỉa tự động sau mỗi bản sao lưu) đều yêu cầu phiên dashboard, chủ thể CLI cục bộ, hoặc đăng nhập đã bị tắt. Việc cấp token đồng bộ (`POST /api/sync/tokens`) và đúc access token CLI `admin` (`POST /api/cli/tokens`) yêu cầu phiên dashboard hoặc chủ thể CLI cục bộ trong mọi chế độ đăng nhập. Khóa API thuộc bất kỳ phạm vi nào và access token `oma_` không phải là thông tin xác thực operator: chúng nhận `403` bất cứ khi nào cần đến. Kiểm tra nằm trong `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Việc thay đổi cài đặt đăng nhập cũng chỉ dành cho operator: `POST /api/settings/require-login` (đặt mật khẩu quản trị / bật tắt `requireLogin`) chỉ chấp nhận các thông tin xác thực đó khi đã có mật khẩu — cửa sổ bootstrap lần đầu (chưa có mật khẩu) giữ nguyên — và phiên dashboard phải gửi `currentPassword` để thay mật khẩu (`403` khi thiếu hoặc sai, được ghi audit là `settings.update_failed`). CLI cục bộ và một instance đã tắt đăng nhập giữ lại đường khôi phục và có thể đặt mật khẩu mà không cần nó, vì cả hai đều gắn với host sở hữu thư mục dữ liệu.

## Pipeline

```
Yêu cầu đến → src/proxy.ts
  → runAuthzPipeline() trong src/server/authz/pipeline.ts
    1. Loại bỏ các header nội bộ đáng tin cậy (x-omniroute-auth-*, x-omniroute-route-class)
    2. Tạo ID yêu cầu, phân loại tuyến qua classifyRoute()
    3. Nếu pathname == "/" → chuyển hướng đến /dashboard
    4. Nếu đang rút dần lưu lượng (tắt hệ thống an toàn) và /api/* → 503
    5. Nếu không phải GET và thuộc /api/* → áp dụng cơ chế bảo vệ checkBodySize()
    6. Nếu OPTIONS → CORS preflight 204
    7. Nếu options.enforce == false → cho đi qua kèm các header lớp tuyến
    8. Nếu không: POLICIES[routeClass].evaluate(ctx)
       - cho phép  → đóng dấu x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - từ chối → lỗi JSON kèm correlation_id (các trang bảng điều khiển → 302 /login)
```

Các header nội bộ đáng tin cậy (được định nghĩa trong `src/server/authz/headers.ts`) được **loại bỏ khỏi các yêu cầu đến** trước khi phân loại — client không thể điền trước `x-omniroute-auth-*` để mạo danh một chủ thể.

### Hợp đồng chính sách

Mỗi lớp tuyến có một chính sách trong `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — luôn trả về `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — trích xuất Bearer, xác thực qua `validateApiKey()`. Chỉ chuyển sang chế độ ẩn danh khi cờ tính năng `REQUIRE_API_KEY` hiệu lực bị tắt. Cờ hiệu lực được phân giải thông qua `isRequireApiKeyEnabled()` (`ghi đè bằng cờ tính năng trong DB > process.env.REQUIRE_API_KEY > giá trị mặc định`) để các Cờ tính năng trên Bảng điều khiển và biến môi trường chi phối `/api/v1/*`, `/api/v1beta/*` và các bí danh một cách nhất quán; lỗi bộ phân giải sẽ mặc định từ chối. Cho phép các yêu cầu có phiên bảng điều khiển trên các tuyến API client (bao gồm `/api/v1/models`, được danh mục mô hình của bảng điều khiển sử dụng).
- **`managementPolicy`** (`policies/management.ts`) — chấp nhận phiên bảng điều khiển, các yêu cầu đồng bộ mô hình nội bộ (được đối sánh với `/api/providers/[name]/(sync-models|models)`), hoặc bỏ qua hoàn toàn nếu `isAuthRequired()` trả về false. Trả về 403 (`AUTH_001`) khi có token Bearer nhưng không hợp lệ, nếu không thì trả về 401. Đồng thời thực thi các cấp bảo vệ tuyến (LOCAL_ONLY / ALWAYS_PROTECTED) trước mọi nhánh xác thực — xem [Các cấp bảo vệ tuyến](../security/ROUTE_GUARD_TIERS.md). Các đường dẫn LOCAL_ONLY trong `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (hiện tại: `/api/mcp/`) có thể được truy cập từ địa chỉ không phải loopback khi khóa Bearer có phạm vi `manage`; tất cả các đường dẫn LOCAL_ONLY khác vẫn bị giới hạn nghiêm ngặt ở loopback bất kể phạm vi.

Một chính sách thành công trả về `AuthSubject` với `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Các handler phía sau có thể đọc chủ thể này qua `assertAuth(request, "CLIENT_API")` trong `src/server/authz/assertAuth.ts` thay vì chạy lại logic xác thực.

## Danh sách route công khai

`src/shared/constants/publicApiRoutes.ts` là danh sách cho phép tường minh:

Danh sách được phân chia theo **hình dạng**, và sự phân chia này có ý nghĩa thiết yếu (GHSA-74g9-q8f6-793h): một tiền tố được
đối chiếu bằng `startsWith()`, vì vậy nó cũng khớp với mọi đường dẫn liền kề có chung các ký tự đầu.
Việc dùng `/api/usage/om-usage` làm tiền tố đã đánh dấu `/api/usage/om-usage<anything>` là CÔNG KHAI, và Next phân giải
đường dẫn đó thành `/api/usage/[connectionId]` — một trình xử lý không có cơ chế xác thực riêng.

```ts
// Các cây con thực sự. Mọi mục PHẢI kết thúc bằng "/" (được kiểm tra bằng unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // được xử lý là CLIENT_API trong classify, không phải là công khai "không cần xác thực"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Các route đơn lẻ, được đối chiếu CHÍNH XÁC (có hoặc không có dấu gạch chéo ở cuối).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Các route đơn lẻ chỉ đọc cũng được áp dụng chính sách nới lỏng origin CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route đơn lẻ chỉ đọc KHÔNG áp dụng chính sách nới lỏng CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Các route chỉ đọc là công khai **chỉ** đối với các phương thức an toàn. Lưu ý: `classifyRoute()` loại `/api/v1/*` và `/api/v1beta/*` khỏi trường hợp dự phòng PUBLIC — chúng luôn là `CLIENT_API`, vì vậy chính sách khóa Bearer vẫn được áp dụng.

## Thêm route mới

### Mẫu 1 — Endpoint API công khai dành cho máy khách (xác thực bằng Bearer)

Các route trong `/api/v1/` và `/api/v1beta/` được tự động phân loại là `CLIENT_API`. Middleware thực thi bước kiểm tra Bearer; các trình xử lý route không cần thực hiện lại bước này nhưng có thể đọc chủ thể nếu cần.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logic của trình xử lý
}
```

### Mẫu 2 — Endpoint quản lý (phiên hoặc Bearer + quyền manage)

Sử dụng `requireManagementAuth()` từ `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logic của trình xử lý
}
```

`requireManagementAuth()` trả về `null` khi thành công hoặc một `Response` lỗi JSON:

- 401 `AUTH_001` "Yêu cầu xác thực" — hoàn toàn không có thông tin xác thực
- 403 — Bearer không hợp lệ **hoặc** có Bearer nhưng khóa không có phạm vi `manage` / `admin`

`hasManageScope(scopes)` trả về true đối với `"manage"` hoặc `"admin"`.

### Mẫu 3 — Thêm vào danh sách cho phép công khai

Chọn tập hợp dựa trên hình dạng, không phải sự tiện lợi. Một route đơn lẻ được đưa vào `PUBLIC_API_ROUTES_EXACT` (hoặc `PUBLIC_READONLY_CORS_API_ROUTES` nếu chỉ hỗ trợ GET); chỉ cây con thực sự mới được đưa vào `PUBLIC_API_ROUTE_PREFIXES`, và nó **phải kết thúc bằng `/`**. Việc đưa một route đơn lẻ vào danh sách tiền tố cũng công khai mọi đường dẫn liền kề có chung các ký tự đầu — bao gồm cả các đường dẫn ngang hàng có phân đoạn động được thêm sau này (GHSA-74g9-q8f6-793h). Cập nhật các unit test tại `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` và `tests/unit/authz/classify.test.ts`.

## Phạm vi

Ba không gian tên. Mỗi trình kiểm tra chỉ đọc các chuỗi của riêng nó. So sánh song song,
bao gồm lý do tại sao `manage` không vượt qua `scopeMatches` cho `read:compression` và tại sao một
mã thông báo truy cập `read` không thể `PATCH /api/keys/{id}`, được giải thích tại
[Ba không gian tên phạm vi](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Các khóa API mang một mảng `scopes` (được lưu trữ dưới dạng JSON trong `api_keys.scopes`, xem `src/lib/db/apiKeys.ts`).

### Phạm vi quản lý

- `manage` / `admin` — `hasManageScope`. Quyền truy cập bearer vào các tuyến API quản lý.
- `mcp:connect`, `self:usage`, `self:account-quota`, và
  `policy:bypass-provider-quota` là các phạm vi khớp chính xác có tính bổ sung. Chúng nằm
  ngoài `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` chỉ mở phần
  `/api/mcp/` không phải loopback.

### Phạm vi công cụ MCP

Danh mục và các quy tắc khớp (chuỗi giống hệt, hoặc một phạm vi được cấp kết thúc bằng `*`):
[Phạm vi công cụ MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` trong `src/shared/constants/mcpScopes.ts` là tập con được định kiểu ban đầu,
không phải toàn bộ danh mục đó. Việc thực thi chạy trong
`open-sse/mcp-server/scopeEnforcement.ts` sau khi `resolveCallerScopeContext()`
giải quyết các phạm vi từ thông tin xác thực MCP, siêu dữ liệu yêu cầu, hoặc `OMNIROUTE_MCP_SCOPES`.
Nó vẫn tắt trừ khi `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Phạm vi mã thông báo truy cập

`read` / `write` / `admin` trên các mã thông báo `oma_live_…`, được xếp hạng bởi `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Thứ hạng này chỉ áp dụng cho thông tin xác thực
mã thông báo truy cập. Xem [Xác thực quản lý](../guides/MANAGEMENT-AUTH.md).

## Công tắc yêu cầu xác thực

`isAuthRequired()` trong `src/shared/utils/apiAuth.ts` quyết định liệu **bất kỳ** xác thực nào có được áp dụng cho một yêu cầu hay không:

- `settings.requireLogin === false` → xác thực bị tắt toàn cục, ngoại trừ tầng luôn được bảo vệ (xem [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) và các lệnh gọi cấp thông tin xác thực mà nó chấp nhận, vốn cần cùng thông tin xác thực như khi đăng nhập được bật: cấp token đồng bộ, đúc access token CLI ở bất kỳ phạm vi nào, và tạo khóa API có phạm vi `manage`/`admin`, cấp phạm vi đó cho một khóa, hoặc tạo lại hay hiển thị một khóa như vậy (`requireCredentialForManagementScopedKey()` trong `src/lib/api/requireManagementAuth.ts`). Các khóa chỉ dùng cho inference vẫn mở.
- Chưa cấu hình mật khẩu **và** không có biến môi trường `INITIAL_PASSWORD` → chế độ bootstrap: trình hướng dẫn onboarding và các yêu cầu loopback được phép, nhưng các yêu cầu từ mạng bên ngoài vẫn cần thông tin xác thực.
- Bất kỳ lỗi DB nào → thất bại đóng (an toàn theo mặc định).

Việc cưỡng chế khóa API client dùng `isRequireApiKeyEnabled()` trong `src/shared/utils/featureFlags.ts`, không đọc trực tiếp `process.env.REQUIRE_API_KEY`. Điều này quan trọng với các instance đã triển khai: bật tắt `REQUIRE_API_KEY` trong Dashboard → Feature Flags sẽ lưu một ghi đè DB và ảnh hưởng ngay đến `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` cùng các kiểm tra xác thực API client khác dùng chung hàm trợ giúp này. Nếu kho feature flag không đọc được, xác thực API client thất bại đóng và yêu cầu một khóa.

## Thay đổi không tương thích — v3.8.0

Các endpoint `/api/v1/agents/tasks/*` và `/api/resilience/model-cooldowns` **hiện yêu cầu xác thực quản lý** (commit `588a0333`). Các client trước đây gửi khóa API thông thường không có phạm vi `manage` sẽ nhận được `403`. Cách chuyển đổi: cấp phạm vi `manage` cho khóa trong dashboard API Keys hoặc sử dụng một phiên dashboard đã đăng nhập.

## Thay đổi hành vi — v3.8.2

`/api/mcp/*` (máy chủ MCP từ xa) vẫn mặc định là LOCAL_ONLY nhưng hiện chấp nhận các yêu cầu không phải loopback khi header `Authorization: Bearer <api-key>` mang phạm vi `manage`. Ngoại lệ này được kiểm soát rõ ràng theo từng đường dẫn thông qua `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` trong `src/server/authz/routeGuard.ts`; tiền tố LOCAL_ONLY cùng cấp `/api/cli-tools/runtime/*` được chủ ý thiết kế để KHÔNG thể bỏ qua vì nó có thể khởi chạy các tiến trình con tùy ý. Các yêu cầu ẩn danh tới `/api/mcp/*` từ địa chỉ không phải loopback vẫn tiếp tục trả về `403 LOCAL_ONLY` — mặc định cho mọi đường dẫn LOCAL_ONLY mới vẫn là chỉ cho phép loopback một cách nghiêm ngặt. Xem [Các cấp độ Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Kiểm thử

- Kiểm thử đơn vị: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Danh sách cho phép công khai: `tests/unit/public-api-routes.test.ts`.
- Chạy kiểm thử tập trung: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Gỡ lỗi

Pipeline luôn đóng dấu các phản hồi bằng:

```
x-request-id:               <ID tương quan, được lặp lại trong phần thân lỗi>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Đối với các yêu cầu đã xác thực, các header yêu cầu ở phía upstream (phía handler) cũng bao gồm:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4-ký-tự-cuối> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (tùy chọn)
x-omniroute-auth-scopes:    danh sách phân tách bằng dấu phẩy
```

Sử dụng `assertAuth(req, expectedClass)` bên trong các handler — hàm này ném `AuthzAssertionError` với mã `AUTHZ_NOT_INITIALIZED` nếu middleware bị bỏ qua (hữu ích để phát hiện các lỗi hồi quy cấu hình trong quá trình kiểm thử).

## Xem thêm

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — đánh dấu xác thực cho mỗi điểm cuối
- [COMPLIANCE.md](../security/COMPLIANCE.md) — nhật ký kiểm tra cho các sự kiện xác thực
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ba không gian tên phạm vi và danh mục phạm vi công cụ MCP
- Nguồn: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
