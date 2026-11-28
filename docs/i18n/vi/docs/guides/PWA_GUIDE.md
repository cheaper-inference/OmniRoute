# Progressive Web App (PWA) Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Cài đặt bảng điều khiển OmniRoute dưới dạng Ứng dụng web lũy tiến để mở nó từ màn hình chính hoặc màn hình nền của bạn trong một cửa sổ độc lập. Ứng dụng đã cài đặt vẫn cần kết nối với máy chủ OmniRoute của bạn để điều hướng, dữ liệu bảng điều khiển và các yêu cầu API. Nội dung tĩnh được lưu trong bộ nhớ đệm không cung cấp cổng ngoại tuyến hoặc bảng điều khiển ngoại tuyến.

## PWA là gì?

Ứng dụng web lũy tiến sử dụng bảng điều khiển web có biểu tượng ứng dụng và một cửa sổ riêng. Sau khi cài đặt, OmniRoute:

- Khởi chạy từ màn hình chính hoặc máy tính để bàn của bạn
- Mở ở chế độ độc lập, không có thanh địa chỉ và tab thông thường của trình duyệt
- Lưu trữ nội dung tĩnh đã chọn
- Hỗ trợ định hướng dọc và ngang

## Cài đặt

Sử dụng địa chỉ HTTPS cho máy chủ trên thiết bị khác. Khi máy chủ chạy trên cùng một thiết bị, `http://localhost:20128` cũng đáp ứng các yêu cầu về khả năng cài đặt của trình duyệt. Địa chỉ `http://YOUR_IP:20128` đơn giản không đáp ứng được các yêu cầu đó. Menu cài đặt và lời nhắc tùy thuộc vào trình duyệt và hệ điều hành. Xem [các yêu cầu cài đặt PWA của MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Mở địa chỉ OmniRoute HTTPS của bạn hoặc `http://localhost:20128` cho máy chủ trên cùng một điện thoại.
2. Mở**⋮** thực đơn và chọn** Cài đặt ứng dụng** hoặc** Thêm vào màn hình chính** , nếu được cung cấp.
3. Xác nhận lời nhắc.
4. Mở OmniRoute từ màn hình chính.

### iOS (Safari)

1. Mở địa chỉ OmniRoute HTTPS của bạn trong Safari.
2. Vỗ nhẹ** Chia sẻ** →** Thêm vào màn hình chính** .
3. Xác nhận tên và nhấn** Thêm vào** .
4. Mở OmniRoute từ màn hình chính.

### Máy tính để bàn (Chrome / Edge)

1. Mở bảng điều khiển OmniRoute của bạn.
2. Sử dụng biểu tượng cài đặt của trình duyệt hoặc** Cài đặt ứng dụng** mục menu, nếu được cung cấp.
3. Xác nhận lời nhắc mở OmniRoute trong cửa sổ riêng của nó.

## Đặc trưng

### Cửa sổ độc lập

Tệp kê khai đặt `display: "standalone"` và `start_url: "/dashboard"`. Ứng dụng đã cài đặt sẽ mở bảng thông tin trong cửa sổ ứng dụng. Các điều khiển của trình duyệt và hệ điều hành vẫn có thể xuất hiện; tệp kê khai không yêu cầu chế độ toàn màn hình.

### Nội dung được lưu trong bộ nhớ đệm và yêu cầu mạng

[Nhân viên dịch vụ](../../public/sw.js) lưu trữ các tài nguyên có cùng nguồn gốc đã chọn:

| Yêu cầu hoặc tài sản                       | Chiến lược          | Hành vi                                                                                                                                |
| ------------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Tài nguyên lúc cài đặt                     | Bộ đệm trước        | `/`, `/manifest.webmanifest`, `/icon-512.png` và `/apple-touch-icon.png` được lưu vào bộ nhớ đệm trong quá trình cài đặt của nhân viên |
| tài sản tĩnh Next.js (`/_next/`)           | Mạng đầu tiên       | Phản hồi thành công cập nhật bộ đệm; lỗi mạng quay lại phản hồi đã được lưu trong bộ nhớ đệm hiện có                                   |
| CSS tĩnh khác, JS, hình ảnh và phông chữ   | Bộ nhớ đệm đầu tiên | Phản hồi đã lưu trong bộ nhớ đệm hiện có sẽ được sử dụng lại; phản hồi mạng thành công được lưu trữ trong bộ nhớ đệm                   |
| Điều hướng trang                           | Đường vòng          | Trình duyệt tìm nạp trang trực tiếp; không có dự phòng ngoại tuyến nào được phân phát                                                  |
| API, bảng điều khiển và các tuyến xác thực | Đường vòng          | Worker không chặn hoặc lưu vào bộ nhớ đệm những yêu cầu này                                                                            |
| Các yêu cầu không tĩnh khác                | Mạng                | Không có tra cứu hoặc lưu trữ bộ đệm                                                                                                   |

Các tuyến đường bị loại trừ là `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` và `/login`, khớp với phân biệt chữ hoa chữ thường ở ranh giới đường dẫn. Các yêu cầu có nguồn gốc chéo và không GET cũng bỏ qua nhân viên.

### Trang kết nối

Trang `/offline` cung cấp thông báo kết nối, chỉ báo online/offline,** Thử lại kết nối** nút và một liên kết đến trang trạng thái. Đó là** không được lưu trước vào bộ nhớ đệm** và nhân viên phục vụ làm** không** chuyển hướng điều hướng thất bại đến nó. Sự tồn tại của nó không làm cho các trang mới có thể truy cập được mà không cần máy chủ.

### Biểu tượng ứng dụng

Tệp kê khai quảng cáo các biểu tượng PNG này:

| Tài liệu               | Kích cỡ | Sử dụng                                      |
| ---------------------- | ------- | -------------------------------------------- |
| `icon-192.png`         | 192×192 | Biểu tượng ứng dụng chung                    |
| `icon-512.png`         | 512×512 | Biểu tượng ứng dụng chung và có thể che được |
| `apple-touch-icon.png` | 180×180 | Biểu tượng màn hình chính của Apple          |

Trình duyệt chọn biểu tượng thích hợp cho mục tiêu cài đặt.

### Đăng ký tự động

`PwaRegister` đăng ký nhân viên sản xuất khi trình duyệt hỗ trợ nhân viên dịch vụ. Chế độ phát triển hủy đăng ký công nhân và xóa bộ nhớ đệm để tránh tài sản cũ cản trở quá trình tải lại nóng. Lời nhắc cài đặt vẫn là quyết định của trình duyệt.

## Kiến trúc kỹ thuật

### Bản kê khai ứng dụng web

Next.js tạo `/manifest.webmanifest` từ [`src/app/manifest.ts`](../../src/app/manifest.ts). Các cài đặt chính của nó là:

| Cài đặt           | Giá trị                                      |
| ----------------- | -------------------------------------------- |
| `short_name`      | `OmniRoute`                                  |
| `start_url`       | `/dashboard`                                 |
| `scope`           | `/`                                          |
| `display`         | `standalone`                                 |
| `orientation`     | `any`                                        |
| Màu nền và chủ đề | Bảng màu sáng mặc định từ `PWA_THEME_COLORS` |

Tên và mô tả của tệp kê khai là các giá trị tĩnh trong tệp nguồn đó. Tệp kê khai đã cài đặt không tuân theo cài đặt tên phiên bản hoặc bảng màu hoạt động trong mỗi lần truy cập.

### Nhân viên phục vụ

[`public/sw.js`](../../public/sw.js) không có sự phụ thuộc vào khung công nhân dịch vụ:

- **Cài đặt:** lưu trước bốn tài nguyên được liệt kê ở trên và kích hoạt nhân viên mới.
- **Kích hoạt:** loại bỏ các thế hệ bộ đệm cũ hơn và yêu cầu khách hàng.
- **Tìm về:** áp dụng các chiến lược nội dung tĩnh và loại trừ tuyến đường ở trên.
- **Phiên bản:** tên bộ đệm nguồn là `omniroute-pwa-v3`; bản dựng sản xuất đóng dấu nhận dạng bộ đệm.
- **Thông báo:** xử lý các sự kiện `push` đến và tập trung hoặc mở một cửa sổ khi nhấp vào thông báo.

Chỉ riêng trình xử lý sự kiện đẩy không thiết lập đăng ký đẩy hoạt động hoặc phân phối máy chủ được định cấu hình. Đừng cho rằng thông báo được bật chỉ vì PWA đã được cài đặt.

### Siêu dữ liệu bố cục và đăng ký

[`src/app/layout.tsx`](../../src/app/layout.tsx) cung cấp liên kết tệp kê khai, siêu dữ liệu độc lập của Apple, màu chủ đề và `viewport-fit: cover`. Tiêu đề trang và tiêu đề ứng dụng web của Apple sử dụng tên phiên bản. Màu chủ đề trình duyệt trực tiếp tuân theo bảng màu; bảng kê khai cài đặt sử dụng màu sáng mặc định.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) chạy trên máy khách và đăng ký `/sw.js` với bản dựng ID trong URL của nó. Nó phát hiện các thế hệ bộ đệm không khớp và có thể đặt lại trình chạy và tải lại một lần để khôi phục từ bản cài đặt cũ hơn. Lỗi đăng ký không chặn bảng điều khiển.

## Sử dụng với Termux (Android)

1. Bắt đầu OmniRoute trong Termux: `npx -y omniroute@latest`.
2. Mở Chrome trên cùng một điện thoại: `http://localhost:20128`.
3. Cài đặt PWA thông qua menu cài đặt của trình duyệt.
4. Giữ máy chủ Termux chạy trong khi sử dụng bảng điều khiển.

Điện thoại lưu trữ cả cổng và bảng điều khiển của nó. Yêu cầu tới các nhà cung cấp AI từ xa vẫn cần truy cập mạng. Xem [hướng dẫn Termux](TERMUX_GUIDE.md) để biết cách thiết lập và cân nhắc trong suốt vòng đời của quy trình Android.

## Sử dụng từ các thiết bị khác

Mở địa chỉ HTTPS của máy chủ trên điện thoại, máy tính bảng hoặc máy tính để bàn, sau đó thực hiện theo quy trình cài đặt của trình duyệt đó. Máy chủ phải luôn có thể truy cập được từ mỗi thiết bị. Xem [hướng dẫn đường hầm](../ops/TUNNELS_GUIDE.md) để biết các tùy chọn truy cập từ xa.

## Tùy chỉnh

### Tên phiên bản

các** Tên phiên bản** cài đặt thay đổi siêu dữ liệu của trang tổng quan, bao gồm tiêu đề trang và tiêu đề ứng dụng web của Apple. Tệp kê khai được tạo sử dụng tên tĩnh nên cài đặt này không đảm bảo rằng ứng dụng đã cài đặt sẽ được đổi tên.

### Biểu tượng yêu thích tùy chỉnh

Favicon tùy chỉnh sẽ thay đổi favicon của trình duyệt. Tệp kê khai cài đặt vẫn quảng cáo các tệp PNG ở trên; việc thay đổi favicon không thay thế các biểu tượng trên màn hình chính đó.

## Hạn chế

- **Yêu cầu kết nối máy chủ:** điều hướng trang, trạng thái trang tổng quan và các yêu cầu API không có dự phòng ngoại tuyến.
- **Không đồng bộ hóa nền:** hành động ngoại tuyến không được xếp hàng để phát lại.
- **Sự khác biệt của trình duyệt:** menu cài đặt, trình bày cửa sổ và hỗ trợ thông báo khác nhau tùy theo nền tảng.
- **Không có bộ đệm phản hồi API :** nhân viên loại trừ các tuyến API, bảng điều khiển và xác thực.
- **Biểu tượng cài đặt tĩnh:** việc cập nhật các biểu tượng đó yêu cầu thay đổi nội dung được quảng cáo; trình duyệt có thể giữ lại siêu dữ liệu đã cài đặt.

## Tài liệu tham khảo tập tin

| Tài liệu                                                                               | Mục đích                                                        |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Đã tạo bảng kê khai ứng dụng web                                |
| [public/sw.js](../../public/sw.js)                                                     | Bộ nhớ đệm, loại trừ và xử lý sự kiện thông báo                 |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Đăng ký sản xuất và khôi phục bộ đệm cũ                         |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Trang kết nối, không phải là trang dự phòng ngoại tuyến tự động |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Cài đặt chế độ xem và siêu dữ liệu trang                        |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Giá trị màu chủ đề được chia sẻ                                 |
| [public/icon-512.png](../../public/icon-512.png)                                       | Biểu tượng ứng dụng 512 × 512                                   |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 biểu tượng quả táo                                    |
