# CORS Configuration & Security (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kiểm soát cái nào **nguồn gốc trình duyệt** có thể đọc phản hồi từ nhiều nguồn gốc từ một danh sách cho phép tập trung duy nhất. Mô hình là **không đóng theo mặc định** : không có nguồn gốc nào được phép cho đến khi bạn chọn tham gia. Trang này trình bày cách giải quyết danh sách cho phép, `CORS_ALLOW_ALL=true` thực sự tiết lộ những gì (và quan trọng là nó làm gì **không** ), cách định cấu hình an toàn giữa nhà phát triển và sản xuất và cảnh báo thời gian chạy mà bảng thông tin hiển thị khi ký tự đại diện hoạt động.

**Nguồn của sự thật:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Danh sách cho phép được áp dụng một lần, trong trình xử lý — trên mỗi tuyến của phần mềm trung gian (`src/server/authz/pipeline.ts`) không tự đặt `Access-Control-Allow-Origin`.

## Cách giải quyết nguồn gốc

Đối với mỗi yêu cầu, phần mềm trung gian sẽ tính giá trị `Access-Control-Allow-Origin` theo thứ tự sau:

1. **`CORS_ALLOW_ALL=true`** (hoặc `CORS_ORIGIN=*` kế thừa ) → phản hồi lại `Origin` của người gọi (hoặc `*` khi không có tiêu đề `Origin` ), với `Vary: Origin` để bộ nhớ đệm luôn chính xác. Điểm tắc nghẽn `applyCorsHeaders()` tương tự cũng gắn `Vary: Accept-Encoding` vào mọi phản hồi 2xx-with-body trên bề mặt `/v1*`/`/v1beta*` được xác thực bằng mã thông báo (`relaxForTokenAuth`, RFC 9110 §12.5.5, phát hành #6737), vì vậy bộ đệm downstream/shared có thể phân biệt chính xác các biến thể nén và không nén.
2. Mặt khác, yêu cầu `Origin` được chuẩn hóa (chữ thường, bỏ dấu gạch chéo ở cuối) và khớp với **danh sách cho phép đã hợp nhất** :
   - env **`CORS_ALLOWED_ORIGINS`** Danh sách được phân tách bằng dấu phẩy — và
   - thời gian chạy **`corsOrigins`** cài đặt (Bảng điều khiển → Security → _CORS Nguồn gốc được phép_), được đưa qua `setRuntimeAllowedOrigins()` từ `src/lib/config/runtimeSettings.ts`.
3. Không có trận đấu →**không có tiêu đề `Access-Control-Allow-Origin` được phát ra** . Trình duyệt chặn việc đọc nhiều nguồn gốc. Đây là mặc định đóng thất bại dự định.

| biến thể Env           | Nghĩa                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV có nguồn gốc chính xác cho phép (được khuyến nghị).                                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → lặp lại bất kỳ nguồn gốc nào (ký tự đại diện). Chỉ dành cho nhà phát triển.                    |
| `CORS_ORIGIN`          | Di sản. `*` hoạt động giống như `CORS_ALLOW_ALL`; một giá trị duy nhất sẽ được thêm vào danh sách cho phép. |

## Mô hình mối đe dọa — những gì `CORS_ALLOW_ALL=true` thực sự bộc lộ

Cảnh báo chung về OWASP ("ký tự đại diện CORS = bất kỳ trang web nào cũng có thể gọi là API của bạn") đáng được xem xét nghiêm túc, nhưng mức độ hiển thị của OmniRoute là **hẹp hơn trường hợp chung** , vì một thực tế triển khai cụ thể:

> **`applyCorsHeaders()` trung tâm không bao giờ phát ra `Access-Control-Allow-Credentials`.** Trình duyệt sẽ không hiển thị phản hồi có nguồn gốc chéo _credentialed_ (mang cookie) trừ khi máy chủ gửi `Access-Control-Allow-Credentials: true`. Đường dẫn CORS được chia sẻ của OmniRoute không bao giờ có.

Điều đó có nghĩa là gì trên mỗi bề mặt, ngay cả với `CORS_ALLOW_ALL=true`:

| Bề mặt                                | Cơ chế xác thực            | Tác dụng của ký tự đại diện CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bảng điều khiển / MANAGEMENT `/api/*` | Phiên cookie               | Nguồn gốc được lặp lại, nhưng **không có `Allow-Credentials`** trình duyệt **khối** thông tin xác thực đã đọc. Một trang web có nguồn gốc chéo độc hại **không thể đọc** phản hồi trên trang tổng quan đã được xác thực của bạn và cookie phiên không bị lộ.                                                                                                                                                                                                                                                                                                                |
| Khách hàng API `/v1/*`, `/v1beta/*`   | Tiêu đề mang / `x-api-key` | Đã cho phép **theo thiết kế** (`relaxForTokenAuth`): trình duyệt không bao giờ tự động đính kèm `Authorization`/`x-api-key`, do đó trang của kẻ tấn công không thể cung cấp khóa của bạn. Tiếng vang thoải mái yêu cầu một chủ đề được xác thực (khóa API hoặc phiên bảng điều khiển đã được xác thực), không chỉ là tiêu đề thông tin xác thực và không bao giờ bao gồm `Access-Control-Allow-Credentials`. Phản hồi ẩn danh (`REQUIRE_API_KEY=false`) sử dụng danh sách cho phép nguồn gốc đã định cấu hình, bao gồm cả việc chọn tham gia `CORS_ALLOW_ALL=true` rõ ràng. |
| Chỉ đọc công khai (`/api/health`, …)  | Không có                   | Không nhạy cảm; ký tự đại diện là vô hại.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Vì vậy **dư** việc tiếp xúc với `CORS_ALLOW_ALL=true` được giới hạn ở: (a) nguồn gốc chéo không được xác thực **đọc** của dữ liệu chưa được xác thực và (b) cho phép CORS**vé trước chuyến bay** trên các tuyến quản lý — vẫn yêu cầu xác thực mà trang có nguồn gốc chéo không thể cung cấp. Đó là **không** vectơ chiếm quyền điều khiển phiên hoặc đánh cắp thông tin xác thực trên đường dẫn CORS được chia sẻ.

### Một ngoại lệ chính hãng — `/api/v1/agents/`

Các tuyến Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) thiết lập **sở hữu** Tiêu đề CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) và **LÀM** phát ra `Access-Control-Allow-Origin: <origin>|*` cùng với `Access-Control-Allow-Credentials: true`. Đây là bề mặt duy nhất nơi tiếng vang nguồn gốc và thông tin xác thực cùng tồn tại, và nó là **độc lập với `CORS_ALLOW_ALL`** . Các tuyến này được quản lý xác thực (`requireManagementAuth`); Những người vận hành hiển thị trang tổng quan bên ngoài máy chủ nên lưu ý rằng đây là nơi duy nhất mà tiêu đề phản hồi cho phép đọc thông tin xác thực trên nhiều nguồn gốc. Việc đưa nó vào danh sách cho phép rõ ràng được theo dõi riêng biệt với hướng dẫn CORS này.

## Danh sách kiểm tra sản xuất

- **Không bao giờ đưa `CORS_ALLOW_ALL=true` vào sản xuất.** Để nó không được đặt.
- Đặt một **rõ ràng** danh sách nguồn gốc — hoặc trường env var hoặc trường tab Bảo mật:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Nếu OmniRoute chạy phía sau proxy/đường hầm ngược (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS là **không** — kiểm soát duy nhất của bạn, trình bảo vệ tuyến đường vòng lặp vẫn bảo vệ các tuyến đường có khả năng sinh sản (xem [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Đừng giả mạo `X-Forwarded-For: 127.0.0.1` để "sửa" 403; mở lại lớp RCE mà bộ bảo vệ tuyến đường đóng lại.
- Xác nhận trạng thái thời gian chạy: bảng thông tin hiển thị **biểu ngữ màu hổ phách bền bỉ** trong Bảng điều khiển → Security → Authorization Inventory bất cứ khi nào `CORS_ALLOW_ALL=true` hoạt động và `/api/settings/authz-inventory` trả về một công cụ giám sát phong bì `cors: { allowAll, allowedOrigins }` có thể thăm dò ý kiến.

## Thuận tiện phát triển — cho phép nguồn gốc địa phương cụ thể

Bạn hiếm khi cần ký tự đại diện ngay cả trong dev. Chỉ cho phép các máy chủ dev bạn sử dụng:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Nguồn gốc được khớp không phân biệt chữ hoa chữ thường và dấu gạch chéo ở cuối bị bỏ qua, do đó `http://localhost:3000` và `http://localhost:3000/` tương đương nhau. CSV tương tự có thể được đặt khi chạy trong **Bảng điều khiển → Security → CORS Nguồn gốc được phép** mà không cần khởi động lại.

## Khóa API so với phiên cookie

- **Bearer/ `x-api-key` (bề mặt suy luận `/v1/*` ):** trình duyệt không bao giờ tự động đính kèm những thứ này. CORS không phải là rào cản có ý nghĩa ở đây — khóa API là rào cản — đó là lý do tại sao bề mặt đó được cho phép một cách có chủ ý để trình duyệt và khách hàng Electron có thể đọc phản hồi mà họ đã có quyền. Tiếng vang thoải mái yêu cầu một chủ đề được xác thực (khóa API hoặc phiên bảng điều khiển đã được xác thực), không chỉ là tiêu đề thông tin xác thực và không bao giờ bao gồm `Access-Control-Allow-Credentials`. Phản hồi ẩn danh (`REQUIRE_API_KEY=false`) sử dụng danh sách cho phép nguồn gốc đã định cấu hình, bao gồm cả việc chọn tham gia `CORS_ALLOW_ALL=true` rõ ràng. Từ chối xác thực (401) vẫn có thể đọc được để khách hàng có thể hiển thị khóa bị thu hồi hoặc nhập sai (#5242): 401 của chính đường dẫn giữ tiếng vang và tuyến từ chối chính khóa đó sau khi đường ống phân phát dưới dạng ẩn danh (`/v1/models` và `/v1beta/models` với cấu hình xác thực quản lý, `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` và các tuyến ứng cử viên tự động kết hợp) thêm tiếng vang vào 401 đó thông qua `credentialRejectionHeaders()`. Tiếng vang được khóa theo yêu cầu mang tiêu đề thông tin xác thực (`Authorization`, `x-api-key`, `x-goog-api-key` hoặc cookie `auth_token` ), không phải trên cookie nào trong số chúng được kiểm tra và không bao giờ được ghép nối với `Access-Control-Allow-Credentials`; phần thân là một đường bao lỗi cố định. Các tuyến quản lý trong `/api/v1/` được bảo vệ bởi `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) không sử dụng ngoại lệ từ chối thông tin xác thực này: với `REQUIRE_API_KEY=false`, các phản hồi 401/403 của chúng tuân theo chính sách gốc CORS đã định cấu hình.
- **Phiên cookie (trang tổng quan):** được bảo vệ bởi mặc định đóng lỗi **Và** do thiếu `Access-Control-Allow-Credentials` trên đường dẫn chung. Giữ nguồn gốc management/dashboard ngoài mọi cấu hình cho phép; họ phải ở trạng thái đóng chính xác.

## Bắt tay WebSocket (`/v1/responses`, `/v1/ws`)

Các trình duyệt không áp dụng CORS cho WebSocket, do đó WebSocket truyền tải trả về đầu ra suy luận tự kiểm tra sự bắt tay `Origin` (`src/server/origin/wsOrigin.ts`): Phản hồi WebSocket (`/v1/responses`) và khi OmniRoute chạy qua `npm start` / `npm run dev`, cầu nối `/v1/ws` và `/api/v1/ws` sẽ truyền `/v1/chat/completions`, `/v1/messages` và `/v1/responses` dưới dạng khung. Cây cầu yêu cầu `/api/v1/ws?handshake=1` đưa ra phán quyết và từ chối nâng cấp trừ khi tuyến đường đó chạy kiểm tra. Yêu cầu xác thực vẫn được áp dụng riêng. Kiểm tra nguồn gốc vượt qua khi:

- nó không có tiêu đề `Origin` (Codex CLI, SDKs và các ứng dụng khách không có trình duyệt khác);
- `Origin` được chấp nhận bởi danh sách cho phép ở trên (`CORS_ALLOWED_ORIGINS`, cài đặt `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` là một trong những nguồn gốc công khai của chính OmniRoute(cơ sở công khai được định cấu hình URL, nguồn gốc được chuyển tiếp của proxy đáng tin cậy hoặc máy chủ loopback/LAN trực tiếp được cung cấp dưới dạng chữ IP hoặc `localhost` — giống như các ứng cử viên mà kiểm tra đột biến bảng điều khiển sử dụng); hoặc
- nó mang khóa API hợp lệ, giống như trên bề mặt HTTP `/v1/*`.

Bất cứ điều gì khác đều nhận được `403 ws_origin_forbidden`. Cookie phiên trang tổng quan không loại trừ `Origin` nước ngoài vì trình duyệt gắn nó vào ổ cắm của bất kỳ trang nào. `localhost` trên một cổng khác không được coi là có cùng nguồn gốc; thêm nguồn gốc dev như vậy vào `CORS_ALLOWED_ORIGINS`.

## Ví dụ: proxy ngược phía trước OmniRoute

CORS được thực thi bởi chính OmniRoute, vì vậy proxy thường phải **không** thêm hoặc viết lại tiêu đề `Access-Control-*` (tiêu đề kép phá vỡ trình duyệt). Chấm dứt TLS và chuyển tiếp — để OmniRoute trả lời trước:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Đặt nguồn gốc trình duyệt được phép trong OmniRoute (`CORS_ALLOWED_ORIGINS` hoặc tab Bảo mật), không phải trong proxy.

## Tệp nguồn

| Bận tâm                                               | Tài liệu                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| Giải pháp danh sách cho phép + `getCorsStatus()`      | `src/server/cors/origins.ts`                                         |
| Ứng dụng phần mềm trung gian (nguồn sự thật duy nhất) | `src/server/authz/pipeline.ts`                                       |
| Cài đặt nội dung gốc thời gian chạy →                 | `src/lib/config/runtimeSettings.ts`                                  |
| Trạng thái thời gian chạy cho bảng thông tin          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Biểu ngữ cảnh báo bảng điều khiển                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Trường Nguồn gốc được phép CORS                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent trên mỗi tuyến CORS (ngoại lệ)            | `src/lib/cloudAgent/api.ts`                                          |
| Kiểm tra bắt tay WebSocket `Origin`                   | `src/server/origin/wsOrigin.ts`                                      |

## Xem thêm

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) Thực thi vòng lặp — cho các tuyến đường có khả năng sinh sản (một biện pháp kiểm soát bổ sung, riêng biệt).
- [Hướng dẫn ủy quyền](../architecture/AUTHZ_GUIDE.md) — đường dẫn xác thực đầy đủ.
