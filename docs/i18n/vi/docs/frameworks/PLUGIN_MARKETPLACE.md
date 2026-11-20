# Plugin Marketplace (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Nguồn thông tin chuẩn:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, và
> `src/app/(dashboard)/dashboard/plugins/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute cung cấp một hệ thống plugin theo phong cách WordPress. Các plugin là
những thư mục độc lập — mỗi thư mục có một tệp kê khai `plugin.json` và một tệp
điểm vào — được móc nối vào quy trình xử lý yêu cầu (`onRequest` / `onResponse` /
`onError`) và các sự kiện vòng đời (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`).

**Kho Plugin** là lớp khám phá nằm trên hệ thống đó. Lớp này cung cấp một danh
mục có thể duyệt gồm các plugin có thể cài đặt. Theo mặc định, danh mục là một
registry khởi tạo tích hợp nhỏ; người vận hành có thể trỏ danh mục đến một URL
registry từ xa tùy chỉnh. Trong trường hợp đó, thao tác tìm nạp được bảo vệ bằng
cơ chế chống SSRF có phân giải DNS (xem [Bảo mật](#security)).

Mọi tuyến plugin đều **chỉ dành cho loopback** (Bậc 1 — `LOCAL_ONLY`): plugin
nạp và thực thi mã trong các tiến trình con, vì vậy các tuyến này không thể được
truy cập từ nguồn không phải loopback, bất kể cơ chế xác thực. Xem
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Nó phù hợp như thế nào với Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Lớp đăng ký** — `src/lib/plugins/marketplace.ts`: liệt kê / tìm kiếm danh mục, quay lại sổ đăng ký hạt giống nếu có bất kỳ lỗi nào.
- **Lớp vòng đời** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): cài đặt, nâng cấp, kích hoạt, hủy kích hoạt, gỡ cài đặt, quét, tải khởi động.
- **Lớp kê khai** — `src/lib/plugins/manifest.ts`: lược đồ Zod + mặc định cho `plugin.json`.
- **Máy quét** — `src/lib/plugins/scanner.ts`: khám phá các plugin trên đĩa trong thư mục plugin.
- **Trình tải** — `src/lib/plugins/loader.ts`: tạo ra mỗi plugin trong một quy trình con Node.js riêng biệt và các nhà môi giới thực hiện các cuộc gọi qua IPC. Phần mềm con không phải là hộp cát (xem phần "Cách ly thực thi plugin" bên dưới).

## Danh Mục Kho Plugin

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) trả về danh sách
các đối tượng `MarketplaceEntry`:

| Trường        | Kiểu     | Ghi chú                                       |
| ------------- | -------- | --------------------------------------------- |
| `name`        | string   | Tên plugin dạng kebab-case                    |
| `version`     | string   | semver                                        |
| `description` | string   | Nội dung tóm tắt ngắn                         |
| `author`      | string   | Tác giả / tổ chức                             |
| `license`     | string   | Mã định danh giấy phép kiểu SPDX              |
| `downloadUrl` | string   | URL tải xuống nguồn (có thể để trống)         |
| `repository`  | string?  | URL kho lưu trữ tùy chọn                      |
| `tags`        | string[] | Các thẻ tìm kiếm/lọc                          |
| `downloads`   | number   | Số lượt tải xuống                             |
| `rating`      | number   | 0–5                                           |
| `verified`    | boolean  | Mục có được đánh dấu là đã xác minh hay không |
| `lastUpdated` | string   | Chuỗi ngày tháng gần theo định dạng ISO       |

Khi không cấu hình URL registry tùy chỉnh, danh mục sẽ là `SEED_REGISTRY` tích
hợp (hiện gồm `request-logger`, `rate-limiter`, `cost-tracker`, và
`theme-manager`). Registry khởi tạo luôn khả dụng — nếu registry từ xa đã cấu
hình không thể truy cập, trả về trạng thái không phải `200`, hoặc trả về nội dung
không nhận dạng được, `listMarketplacePlugins()` sẽ ghi nhật ký cảnh báo và
chuyển về danh sách khởi tạo.

> Lưu ý: **danh mục** kho plugin (duyệt/tìm kiếm) đã được kết nối hoàn chỉnh từ
> đầu đến cuối, nhưng tính năng **cài đặt** bằng một cú nhấp từ danh mục vẫn chưa
> được triển khai — nút "Cài đặt" của bảng điều khiển trên một mục trong kho
> plugin hiện hiển thị thông báo "sắp ra mắt". Hiện tại, việc cài đặt được thực
> hiện thông qua luồng cài đặt từ đường dẫn cục bộ (`POST /api/plugins`) và cơ
> chế khám phá trên ổ đĩa (`POST /api/plugins/scan`).

## REST API

Tất cả các điểm cuối đều yêu cầu xác thực quản lý (`requireManagementAuth`)** Và** là `/api/plugins` — chỉ loopback và `/api/plugins/` được liệt kê trong `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Điểm cuối                        | Phương pháp | Sự miêu tả                                                 |
| -------------------------------- | ----------- | ---------------------------------------------------------- |
| `/api/plugins`                   | GET         | Liệt kê các plugin đã cài đặt (bộ lọc `?status=` tùy chọn) |
| `/api/plugins`                   | POST        | Cài đặt plugin từ thư mục nguồn plugin                     |
| `/api/plugins/scan`              | POST        | Quét thư mục plugin và đăng ký plugin mới                  |
| `/api/plugins/marketplace`       | GET         | Liệt kê các mục danh mục thị trường                        |
| `/api/plugins/[name]`            | GET         | Nhận chi tiết plugin đã cài đặt                            |
| `/api/plugins/[name]`            | DELETE      | Gỡ cài đặt plugin                                          |
| `/api/plugins/[name]/activate`   | POST        | Kích hoạt (tải móc đăng ký + )                             |
| `/api/plugins/[name]/deactivate` | POST        | Vô hiệu hóa (fire `onDeactivate`, hủy đăng ký hook)        |
| `/api/plugins/[name]/config`     | GET         | Nhận cấu hình plugin + đồ cấu hình                         |
| `/api/plugins/[name]/config`     | PUT         | Cập nhật cấu hình plugin (được xác thực dựa trên lược đồ)  |

Bộ lọc `GET /api/plugins` `status` nhận một trong các bộ lọc `installed` / `active` / `inactive` / `error`. Giá trị không hợp lệ trả về `400`.

### Liệt kê các plugin đã cài đặt

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Cài đặt từ đường dẫn cục bộ

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

The `path` must be an **absolute** path to a directory **inside the plugin sources directory**: `plugin-sources` next to the plugin root, so `~/.omniroute/plugin-sources/` by default, or `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` when that variable is set (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Copy or clone the plugin there first. The install is refused with `400` when the path contains `..` or a null byte, lies outside that directory, resolves outside it through a symlink, contains a symlink whose target is outside it, or when the directory does not exist. The source directory must contain a valid `plugin.json` (or be a parent of one). On success the response is `201` with the installed plugin row.

Không giống như các tuyến plugin khác, tuyến này yêu cầu thông tin xác thực quản lý (phiên bảng điều khiển hoặc khóa API trong phạm vi quản lý) ngay cả khi đăng nhập bị vô hiệu hóa (`requireLogin=false`): cài đặt mã không bao giờ là một hành động ẩn danh.

### Duyệt qua thị trường

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Cập nhật cấu hình plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` xác thực từng giá trị được cung cấp dựa trên `configSchema` của plugin (được khai báo trong tệp kê khai): các trường `number` tôn vinh `min`/`max`, các trường `select` phải khớp với `enum` đã khai báo. Các khóa không có trong lược đồ đều được phép thông qua.

## Cấu hình

### Thư mục plugin

Các plugin nằm trong thư mục dữ liệu OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (hoặc bất kỳ tệp nào mà manifest.main trỏ tới)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) phân giải thư mục đó theo
ba bước:

1. **`OMNIROUTE_PLUGINS_DIR`**, khi được thiết lập — được sử dụng nguyên văn, bất kể `HOME` có giá trị gì. Đây là
   tùy chọn điều khiển tường minh dành cho Docker/K8s, nơi cây thư mục plugin được bind mount tại một đường dẫn
   thường không liên quan gì đến thư mục home của container (#11827).
2. `<home>/.omniroute/plugins`, trong đó `<home>` được lấy từ các biến môi trường `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, khi tiến trình hoàn toàn không cung cấp thông tin thư mục home.

Thư mục đã phân giải được ghi log một lần khi khởi động dưới tên `scanner.dir_resolved`, đồng thời nêu rõ
đầu vào được chọn (`OMNIROUTE_PLUGINS_DIR`, `home` hoặc `no-home-fallback`) — nhờ đó, một image
âm thầm rơi vào bước 3 sẽ thông báo điều này thay vì chỉ báo cáo danh sách plugin trống.
`POST /api/plugins/scan` phát hiện mọi thư mục con tại đó có chứa một
`plugin.json` hợp lệ và đăng ký thư mục đó; chính thư mục này cũng là thư mục gốc mà
`pluginManager.install()` sao chép các plugin vào, vì vậy một giá trị ghi đè sẽ di chuyển cả vị trí khám phá
lẫn cài đặt cùng nhau.

> **`OMNIROUTE_PLUGINS_DIR` không phải là `OMNIROUTE_PLUGIN_PATH`.** Biến sau chỉ được đọc bởi
> trình tải plugin lệnh của CLI (`bin/cli/plugins.mjs`) để tìm các package npm `omniroute-cmd-*`
> bổ sung các lệnh con `omniroute` — biến này không ảnh hưởng đến trình quét runtime
> được mô tả tại đây. Xem [PLUGINS.md](./PLUGINS.md) để biết thêm về phần đó.

### URL registry marketplace tùy chỉnh

Nguồn danh mục marketplace được đọc từ cài đặt `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` đọc `settings.pluginMarketplaceUrl`). Khi
được đặt thành một URL `http(s)`, `listMarketplacePlugins()` sẽ tìm nạp URL đó
và chấp nhận một mảng JSON cấp cao nhất gồm các mục hoặc một đối tượng có mảng
`plugins`; các mục không có `name` kiểu chuỗi sẽ bị lọc bỏ. Khi chưa được thiết
lập (hoặc khi thao tác tìm nạp không vượt qua được cơ chế bảo vệ SSRF / trả về
phản hồi không hợp lệ), registry khởi tạo tích hợp sẵn sẽ được sử dụng.

Tab "Marketplace" trên dashboard cung cấp một trường dành cho URL này (được đọc
lại từ `GET /api/settings`).

> Lưu ý triển khai: thao tác "Save" trên dashboard gửi
> `pluginMarketplaceUrl` tới `PATCH /api/settings`. Tại thời điểm viết tài liệu,
> khóa này chưa được khai báo trong `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), vì vậy hãy xác minh khả năng lưu
> bền vững trong bản phát hành của bạn trước khi dựa vào nó — đường dẫn **đọc**
> (`getSettings()` → `listMarketplacePlugins()`) sẽ sử dụng khóa này khi khóa đã
> có trong kho cài đặt.

## Bảo vệ

### Chỉ tuyến đường vòng lặp — cấp

Các plugin thực thi mã trong các tiến trình con được sinh ra, do đó toàn bộ bề mặt `/api/plugins` được phân loại `LOCAL_ONLY` (Cấp 1). Thực thi vòng lặp chạy vô điều kiện** trước** bất kỳ kiểm tra xác thực nào, do đó, mã thông báo quản lý bị rò rỉ đến hộp qua đường hầm vẫn không thể cài đặt, kích hoạt hoặc gỡ cài đặt plugin. Xem [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) và Quy tắc cứng #15 / #17.

### Đăng ký thị trường SSRF bảo vệ

Sổ đăng ký tùy chỉnh URL là cấu hình có thể bị ảnh hưởng bởi kẻ tấn công, vì vậy trước khi tìm nạp nó, `listMarketplacePlugins()` sẽ chạy nó qua hai lớp:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Từ chối bất cứ thứ gì không phải là `http:` / `https:`.
   - Từ chối máy chủ private/loopback/link-local/ULA theo nghĩa đen (IPv4** Và** IPv6, bao gồm IPv4-mapped) thông qua `isPrivateHost` chuẩn (`src/shared/network/outboundUrlGuard.ts`).
   - giải quyết** cả hai** `A` và `AAAA` ghi lại và từ chối nếu** bất kì** địa chỉ đã giải quyết là riêng tư — đóng đường vòng bỏ qua IP riêng tư → tên máy chủ công cộng.
   - **Thất bại đã đóng** : lỗi độ phân giải DNS sẽ từ chối URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): áp dụng lại bộ bảo vệ URL chỉ công khai tại thời điểm tìm nạp và** chặn chuyển hướng** (không có trục `30x` riêng tư → ).

Một URL không thành công ở một trong hai lớp sẽ không hủy bỏ yêu cầu — thị trường sẽ âm thầm quay trở lại sổ đăng ký hạt giống tích hợp sẵn và ghi lại cảnh báo.

> Phần bảo vệ này đã được tăng cường trong PR #3774 đặc biệt để giải quyết A + AAAA và sử dụng `isPrivateHost` chuẩn thay vì kiểm tra IPv4-only.

### Cách ly thực thi plugin

> **Các plugin không được đóng hộp cát.** Con là một quy trình Node.js thông thường chạy với tư cách là người dùng OmniRoute, không có ngữ cảnh VM và không có cờ cấp phép Node.js, vì vậy mã plugin có thể đọc và ghi bất kỳ tệp nào mà người dùng có thể, chạy chương trình và truy cập mạng. `requires.permissions` chỉ quyết định biến môi trường nào mà trẻ nhận được; các quyền khác không được thực thi. Chỉ cài đặt các plugin mà bạn tin tưởng. Ranh giới quy trình bên dưới chứa các sự cố và treo; nó không phải là ranh giới an ninh.

- **Cách ly quy trình** — `loadPlugin()` (`src/lib/plugins/loader.ts`) sinh ra mỗi plugin trong một tiến trình con Node.js riêng biệt và giao tiếp qua IPC. Cuộc gọi hook có thời gian chờ với mức tăng `SIGTERM` → `SIGKILL`.
- **Danh sách cho phép Env** — đứa trẻ chỉ nhận được một tập hợp các biến môi trường trong danh sách cho phép; tập hợp rộng hơn chỉ được cấp khi tệp kê khai yêu cầu quyền `env`.
- **Cài đặt ngăn chặn nguồn** — `POST /api/plugins` chỉ đọc từ thư mục nguồn plugin (xem "Cài đặt từ đường dẫn cục bộ"): đường dẫn được chuẩn hóa bằng `realpath`, phải nằm nghiêm ngặt trong thư mục đó và cây nguồn mang liên kết tượng trưng thoát khỏi nó sẽ bị từ chối trước khi mọi thứ được sao chép.
- **Ngăn chặn đường dẫn** — install/upgrade/uninstall khẳng định rằng thư mục plugin và `manifest.main` giải quyết** ở trong** gốc plugin được quản lý trước bất kỳ bản sao hoặc xóa đệ quy nào (bảo vệ chống lại các đường dẫn DB bị giả mạo và truyền tải `../` trong `manifest.main`). Kích hoạt giải quyết các liên kết tượng trưng thông qua `realpath` và từ chối tải điểm vào thoát khỏi thư mục plugin.
- **Pin toàn vẹn tùy chọn** — một bảng kê khai có thể khai báo trường `integrity` ( định dạng `sha256-<base64>`, SRI ). Khi xuất hiện, trình tải sẽ xác minh hàm băm của tệp mục nhập tại thời điểm tải và từ chối kích hoạt khi không khớp. Đó là tùy chọn phát hiện giả mạo,** không** ranh giới bảo mật: nó không giới hạn những gì một plugin đã tải có thể làm.
- **Không có thông tin xác thực của khách hàng trong hook** — bối cảnh được chuyển đến `onRequest`, `onResponse` và `onError` đã loại bỏ các tiêu đề `authorization`, `x-api-key`, `proxy-authorization` và `cookie` và bản ghi khóa API không mang giá trị khóa (`redactPluginContext()` trong `src/lib/plugins/hooks.ts`).

## Bản kê khai (`plugin.json`)

Xác thực bởi `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Cánh đồng          | Kiểu       | Ghi chú                                                           |
| ------------------ | ---------- | ----------------------------------------------------------------- |
| `name`             | sợi dây    | Yêu cầu; kebab-case (`^[a-z0-9-]+$`), 1–100 ký tự                 |
| `version`          | sợi dây    | Yêu cầu; học kỳ (`MAJOR.MINOR.PATCH`)                             |
| `description`      | sợi dây?   | ≤ 500 ký tự                                                       |
| `author`           | sợi dây?   | ≤ 200 ký tự                                                       |
| `license`          | sợi dây?   | Mặc định là `MIT`                                                 |
| `main`             | sợi dây?   | Hồ sơ nhập; mặc định là `index.js`                                |
| `source`           | liệt kê?   | `local` \| `marketplace` (mặc định là `local`)                    |
| `tags`             | sợi dây[]? | Tìm kiếm thẻ                                                      |
| `requires`         | sự vật?    | `{ omniroute?, permissions[] }`                                   |
| `hooks`            | sự vật?    | Booleans khai báo hook nào mà plugin triển khai                   |
| `skills`           | sự vật[]?  | Định nghĩa kỹ năng tùy chọn                                       |
| `enabledByDefault` | boolean?   | Tự động kích hoạt khi cài đặt                                     |
| `configSchema`     | sự vật?    | Bản đồ các trường cấu hình (`string`/`number`/`boolean`/`select`) |
| `integrity`        | sợi dây?   | Ghim tệp nhập `sha256-<base64>` tùy chọn                          |

Quyền được rút ra từ enum `network` / `file-read` / `file-write` / `env` / `exec`. Chỉ `env` có hiệu ứng thời gian chạy (danh sách cho phép biến môi trường lớn hơn một chút đối với trẻ); những cái khác là tuyên bố và không được thực thi.

## Luồng vòng đời

```
install (POST /api/plugins, đường dẫn)
  → quét/xác thực manifest → sao chép vào staging → đảm bảo main nằm trong thư mục
  → đổi tên nguyên tử vào ~/.omniroute/plugins/<name> → chèn bản ghi DB
  → kích hoạt onInstall → nếu enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → kiểm tra phạm vi chứa bằng realpath → loadPlugin() (khởi tạo tiến trình con)
  → đăng ký các hook đã khai báo → status = "active" → kích hoạt onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → kích hoạt onDeactivate (TRƯỚC KHI hủy đăng ký) → hủy đăng ký các hook
  → kết thúc tiến trình con → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate nếu đang hoạt động → kích hoạt onUninstall
  → xóa đệ quy thư mục plugin sau khi kiểm tra phạm vi chứa → xóa bản ghi DB
```

Chạy lại `install` với một thư mục có phiên bản manifest **mới hơn hoàn toàn**
so với phiên bản đã cài đặt sẽ tự động nâng cấp (cài đặt lại sạch; cấu hình được
đặt lại về mặc định). Phiên bản bằng hoặc cũ hơn sẽ bị từ chối.

## Cơ sở dữ liệu

Bảng `plugins` (migration `076_create_plugins.sql`):

| Cột             | Kiểu    | Ghi chú                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Duy nhất                                               |
| `version`       | TEXT    | semver; mặc định `1.0.0`                               |
| `description`   | TEXT    | Không bắt buộc                                         |
| `author`        | TEXT    | Không bắt buộc                                         |
| `license`       | TEXT    | Mặc định `MIT`                                         |
| `main`          | TEXT    | Tệp điểm vào; mặc định `index.js`                      |
| `source`        | TEXT    | Mặc định `local`                                       |
| `tags`          | TEXT    | Mảng JSON; mặc định `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; mặc định 0                                        |
| `manifest`      | TEXT    | JSON manifest đầy đủ                                   |
| `config`        | TEXT    | JSON; mặc định `{}`                                    |
| `config_schema` | TEXT    | JSON; mặc định `{}`                                    |
| `hooks`         | TEXT    | Mảng JSON chứa tên các hook đã khai báo; mặc định `[]` |
| `permissions`   | TEXT    | Mảng JSON; mặc định `[]`                               |
| `plugin_dir`    | TEXT    | Thư mục cài đặt tuyệt đối                              |
| `error_message` | TEXT    | Được đặt khi `status = "error"`                        |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Được đặt khi kích hoạt                                 |

Số liệu/hoạt động phân tích của plugin được theo dõi trong các bảng bổ sung
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Trang tổng quan

Trang bảng điều khiển tại `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) cung cấp hai tab:

- **Đã cài đặt** — liệt kê các plugin đã cài đặt với các móc được khai báo của chúng, nút chuyển đổi activate/deactivate, nút gỡ cài đặt và hành động "Quét tìm plugin" (`POST /api/plugins/scan`).
- **Thị trường** — hiển thị danh mục từ `GET /api/plugins/marketplace` với một trường để đặt sổ đăng ký tùy chỉnh URL.

Trang này luôn hiển thị cảnh báo rằng các plugin chạy với đầy đủ đặc quyền của quy trình OmniRoute.

Trang cấu hình cho mỗi plugin nằm ở `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Xem thêm

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  lý do `/api/plugins` chỉ có thể truy cập qua loopback (Cấp 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — framework kỹ năng liên quan
  (`src/lib/skills/`); các plugin có thể khai báo kỹ năng trong manifest của chúng
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — các tích hợp gửi ra ngoài
  dựa trên sự kiện
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  mẫu `buildErrorBody()` mà mọi route plugin đều sử dụng cho các phản hồi lỗi
