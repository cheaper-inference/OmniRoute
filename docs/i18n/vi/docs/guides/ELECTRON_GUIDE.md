# Electron Desktop Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Nguồn của sự thật:** không gian làm việc `electron/`** Cập nhật lần cuối:** 28-06-2028 — v3.8.40

OmniRoute cung cấp một ứng dụng máy tính để bàn đa nền tảng (Windows / macOS / Linux) được xây dựng trên**Electron 41** +** nhà xây dựng điện tử 26.10** . Ứng dụng dành cho máy tính để bàn tạo ra máy chủ độc lập Next.js dưới dạng một tiến trình con, trỏ `BrowserWindow` vào nó và thêm khay hệ thống, trình cập nhật tự động, cầu nối IPC và khởi động bí mật không cấu hình.

## Ngành kiến trúc

```
┌──────────────────────────────────────────────┐
│ Electron main process (electron/main.js)     │
│ ├─ Single-instance lock                       │
│ ├─ Child process: Next.js standalone server  │
│ │   (spawned with Electron's Node runtime)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ Auto-update via electron-updater          │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Phiên bản

Xác nhận từ `electron/package.json`:

| Bưu kiện           | Phiên bản                                                             |
| ------------------ | --------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                             |
| `electron-builder` | `^26.15.3`                                                            |
| `electron-updater` | `^6.8.9`                                                              |
| `better-sqlite3`   | root `^13.0.2` (Bản dựng sẵn Node-API — không xây dựng lại Electron ) |
| Phiên bản ứng dụng | `3.8.0`                                                               |
| Id ứng dụng        | `online.omniroute.desktop`                                            |
| Tên sản phẩm       | `OmniRoute`                                                           |

## Tập lệnh (gốc `package.json`)

| Kịch bản                          | Mục đích                                                            |
| --------------------------------- | ------------------------------------------------------------------- |
| `npm run electron:dev`            | Bắt đầu `npm run dev` + chờ `localhost:20128` + khởi chạy Electron  |
| `npm run electron:build`          | Xây dựng Next.js sau đó chạy `electron-builder` cho OS hiện tại     |
| `npm run electron:build:win`      | Xây dựng trình cài đặt Windows NSIS + xách tay (x64)                |
| `npm run electron:build:mac`      | Xây dựng macOS DMG (Intel + Apple Silicon)                          |
| `npm run electron:build:linux`    | Xây dựng Linux AppImage + DEB (x64 + arm64)                         |
| `npm run electron:smoke:packaged` | Khởi chạy gói nhị phân và thăm dò `/login` cho HTTP 200, sau đó tắt |

Không gian làm việc `electron/` cũng hiển thị:

- `npm run prepare:bundle` — chạy `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — bản dựng macOS vòm đơn
- Bản dựng chỉ dành cho thư mục `npm run pack` — để thử nghiệm cục bộ (không có trình cài đặt)

## Gói thời gian chạy tùy chọn

Các bản dựng dành cho máy tính để bàn có thể xuất bản các kho lưu trữ thời gian chạy tùy chọn cùng với trình cài đặt của chúng. Tải trọng máy chủ đã cài đặt chứa `optional-packs.index.json` (dưới `resources/app` trên Windows và Linux). Đối với mục `browser-runtime`, hãy đọc `packs[].tarball` và tải xuống** tên tệp chính xác đó từ cùng một bản phát hành** . Tên lưu trữ bao gồm thông báo SHA-256 ; các bản dựng khác nhau có thể yêu cầu các bản lưu trữ khác nhau. Giữ nguyên tên file đã tải xuống.

Sao chép chỉ mục của ứng dụng đã cài đặt và kho lưu trữ đã chọn vào một thư mục, sau đó sử dụng CLI từ cùng một bản phát hành:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` hiển thị trạng thái cài đặt và xác minh chứ không phải tên tệp lưu trữ. Chỉ mục đi kèm sẽ chọn kho lưu trữ. Quá trình cài đặt xác minh tổng kiểm tra kho lưu trữ của nó trước khi giải nén và tổng kiểm tra gói của nó trước khi thay thế gói đã cài đặt. Nó đọc các tập tin cục bộ; nó không tải xuống các kho lưu trữ bị thiếu. Khởi động lại ứng dụng sau khi cài đặt. Nếu bản phát hành không có nội dung phù hợp thì gói tùy chọn sẽ không có sẵn thông qua nội dung của bản phát hành đó.

## Bố cục thư mục

```
electron/
├── package.json              # Electron deps + electron-builder config
├── main.js                   # Main process (24 KB — see annotations below)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI types
├── README.md                 # In-workspace notes
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder output (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Stages .next/electron-standalone bundle
└── dev/
    └── smoke-electron-packaged.mjs       # Post-build smoke test
```

Cả `main.js` và `preload.js` đều** tập tin CommonJS `.js`** , không phải TypeScript. Các kiểu gõ phía trình kết xuất nằm trong `electron/types.d.ts`.

## Cầu IPC (`preload.js`)

Tải trước hiển thị API được đưa vào danh sách trắng trên `window.electronAPI` bằng cách sử dụng `contextBridge` với `contextIsolation: true` và `nodeIntegration: false`.

```javascript
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};
```

Các phương pháp tiếp xúc:

| Lệnh gọi trình kết xuất                                           | Kiểu                    |
| ----------------------------------------------------------------- | ----------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | gọi                     |
| `openExternal(url)`                                               | gọi                     |
| `getDataDir()`                                                    | gọi                     |
| `restartServer()`                                                 | gọi                     |
| `getAppVersion()`                                                 | gọi                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | gọi                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | gửi                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | nhận (trả lại bộ xử lý) |

Người trợ giúp nhận trả lại một** chức năng xử lý** thay vì dựa vào `removeAllListeners` — điều này ngăn cản sự tích lũy của người nghe khi các thành phần React được kết nối lại.

## Vòng đời máy chủ

`main.js` sinh ra gói độc lập Next.js trực tiếp với thời gian chạy Nút Electron để tránh ABI mô-đun gốc không khớp với Nút hệ thống:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Điểm nổi bật:

- `waitForServer()` thăm dò URL tối đa 30 giây trước khi hiển thị cửa sổ (không có màn hình trống khi khởi động nguội).
- `stdio: "pipe"` bắt stdout/stderr; các cụm từ sẵn sàng (`Ready` / `listening`) phát ra `server-status: running` trên IPC.
- `before-quit` đợi tối đa 5 giây để có SIGTERM duyên dáng (WAL checkpoint ) sau đó gửi SIGKILL.
- Bộ chuyển cổng trong khay (`20128`, `3000`, `8080`) dừng và khởi động lại máy chủ, sau đó tải lại BrowserWindow.

## Bootstrap bí mật không cấu hình

Trong lần khởi chạy đầu tiên, quy trình chính sẽ tự động tạo và lưu giữ các bí mật bị thiếu:

| Bí mật                   | Nguồn                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (từ chối nếu tín dụng được mã hóa đã tồn tại) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                               |

Kiên trì đến `<DATA_DIR>/server.env`. `DATA_DIR` giải quyết:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` hoặc `~/.omniroute`
- macOS: `~/.omniroute`

## Tra cứu tập tin môi trường

Trước khi sinh ra máy chủ, quy trình chính (`getPreferredEnvFilePath()` in `electron/main.js`) sẽ chọn** một** `.env` : tệp đầu tiên tồn tại.

1. `$DATA_DIR/.env`, khi `DATA_DIR` được đặt trong môi trường mà ứng dụng được khởi chạy.
2. `<resolved DATA_DIR>/.env`, sử dụng các giá trị mặc định tương tự như trên: `%APPDATA%\omniroute\.env` trên Windows, `$XDG_CONFIG_HOME/omniroute/.env` hoặc `~/.omniroute/.env` trên Linux và macOS.
3. `.env` trong thư mục làm việc của tiến trình.

Quá trình chính chỉ đọc tệp đó; các ứng cử viên sau này không được hợp nhất. Sau đó, môi trường máy chủ được xây dựng với mức độ ưu tiên này (cao nhất trước):

1. Môi trường quy trình Electron (các biến được kế thừa từ bất kỳ thứ gì đã khởi chạy ứng dụng).
2. Tệp `.env` đã chọn.
3. `<DATA_DIR>/server.env` (bí mật bootstrap ở trên).

Môi trường quy trình được ghi lại khi ứng dụng khởi động, do đó, biến môi trường hệ thống hoặc người dùng được đặt trong khi ứng dụng đang chạy (bao gồm cả khi ứng dụng nằm trong khay sau khi cửa sổ đóng) sẽ không đến được máy chủ cho đến khi ứng dụng được thoát hoàn toàn và khởi chạy lại. Đối với các nút thời gian chạy như `CONTEXT_LENGTH_<PROVIDER>` (xem [Biến môi trường: Độ dài ngữ cảnh của mỗi nhà cung cấp](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), hãy ưu tiên tệp `.env`, sau đó thoát hoàn toàn (khay,** Từ bỏ** ) và khởi chạy lại.

## Cửa sổ & khay

- `BrowserWindow`: 1400 × 900 (tối thiểu 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, đèn giao thông tại `{ x: 16, y: 16 }`.
- Windows/Linux: thanh tiêu đề gốc.
- Nút đóng thu nhỏ vào khay; menu khay có** mở OmniRoute** ,** Mở trang tổng quan** (trình duyệt bên ngoài),** Cổng máy chủ** menu con,** Kiểm tra cập nhật** ,** Từ bỏ** .

## Chính sách bảo mật nội dung

Đặt qua `session.defaultSession.webRequest.onHeadersReceived`. Chỉ thị đáng chú ý:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Chế độ Dev chỉ thêm `'unsafe-eval'` vào `script-src`

## Tự động cập nhật

Sử dụng `electron-updater` với nhà cung cấp GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Các sự kiện được chuyển tiếp tới trình kết xuất thông qua `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (với `percent`), `downloaded`, `error`
- `installUpdate()` giết chết máy chủ rồi gọi `autoUpdater.quitAndInstall()`
- Đã bỏ qua ở chế độ dev (`!app.isPackaged`)

## Xây dựng đường ống

1. `npm run build` → Next.js độc lập trong `.next/standalone`.
2. `prepare-electron-standalone.mjs` → chuyển lại thành `.next/electron-standalone` và viết lại các đường dẫn tuyệt đối bên trong `server.js` + `required-server-files.json` để gói có thể định vị lại được.
3. gói `electron-builder` `main.js`, `preload.js`, `node_modules` và `extraResources: { ../.next/electron-standalone → app }`.

### Xây dựng mục tiêu

| OS      | Mục tiêu                              |
| ------- | ------------------------------------- |
| Windows | trình cài đặt NSIS + di động (x64)    |
| macOS   | DMG (Intel + arm64, kéo vào Ứng dụng) |
| Linux   | AppImage + DEB (x64 + arm64)          |

NSIS settings: `oneClick: false`, cho phép người dùng chọn thư mục cài đặt, tạo lối tắt Desktop và Start-Menu.

## Bản dựng đóng gói thử nghiệm khói

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Tự động phát hiện tệp nhị phân được đóng gói trong `electron/dist-electron/` cho nền tảng hiện tại.
- Khởi chạy với các thư mục `HOME`/`APPDATA`/`XDG_*` bị cô lập để không chạm vào dữ liệu của nhà phát triển.
- Thăm dò `http://127.0.0.1:20128/login` cho HTTP 200 trong vòng 45 giây.
- Theo dõi stderr/stdout để tìm các mẫu gây tử vong (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, v.v.).
- Đợi 2 giây thời gian chạy ổn định sau khi sẵn sàng, sau đó phát SIGTERM và đợi cổng giải phóng.
- Trong CI, tự động chuyển `--no-sandbox --disable-gpu` (và `--disable-dev-shm-usage` trên Linux).

Env ghi đè: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Ký mã

`electron/package.json` làm** không** thông tin đăng nhập trực tiếp. Chuyển chúng qua env vars tới `electron-builder`:

### macOS

```bash
export APPLE_ID=<email>
export APPLE_APP_SPECIFIC_PASSWORD=<password>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:win
```

### Linux

ký AppImage là tùy chọn — đặt `LINUX_GPG_KEY` nếu ký.

## Phân bổ

Đất hiện vật ở `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Các bản phát hành được xuất bản lên GitHub Releases (`diegosouzapw/OmniRoute`), đây cũng là nơi `electron-updater` kiểm tra các phiên bản mới.

## Khắc phục sự cố

| triệu chứng                                                       | Sửa chữa                                                                                                                                             |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` sau cú va chạm lớn Electron | better-sqlite3 v13 gửi các bản dựng sẵn Node-API — chạy lại `npm install` ở gốc và `prepare:bundle` (nó xác minh bản dựng sẵn cho nền tảng hiện tại) |
| `ERR_DLOPEN_FAILED` cho mô-đun gốc                                | Chạy lại `prepare:bundle` — nó không thành công nhanh khi thiếu bản dựng sẵn Node-API cho nền tảng hiện tại                                          |
| Cửa sổ xuất hiện trống trên Linux                                 | Xác nhận máy chủ Next.js thực sự được liên kết với PORT (kiểm tra nhật ký `[Server]` )                                                               |
| quầy công chứng macOS                                             | Đảm bảo các vars `APPLE_*` được xuất, không chỉ trong `.env`                                                                                         |
| cảnh báo Windows SmartScreen                                      | Ký bằng chứng chỉ EV hoặc người dùng nhấp chuột phải vào → "Vẫn chạy"                                                                                |
| Kiểm tra khói không thành công khi sử dụng cổng                   | Dừng mọi máy chủ dev cục bộ vào năm 20128 trước khi chạy `electron:smoke:packaged`                                                                   |

## Xem thêm

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Nguồn: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Người trợ giúp: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
