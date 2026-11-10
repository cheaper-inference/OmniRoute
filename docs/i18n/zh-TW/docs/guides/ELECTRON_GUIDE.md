# Electron Desktop Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md)

---

> **事實來源：** `electron/`工作區**最後更新：** 2026-06-28 — v3.8.40

OmniRoute提供了一個跨平台桌面應用程式 (Windows / macOS / Linux)**Electron 41** +**電子建構器 26.10** 。桌面應用程式將Next.js獨立伺服器作為子進程生成，將`BrowserWindow`指向它，並添加系統托盤、自動更新程式、 IPC橋和零配置秘密引導程式。

## 建築學

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

## 版本

經`electron/package.json`確認：

| 包裹               | 版本                                                |
| ------------------ | --------------------------------------------------- |
| `electron`         | `^43.4.1`                                           |
| `electron-builder` | `^26.15.3`                                          |
| `electron-updater` | `^6.8.9`                                            |
| `better-sqlite3`   | root `^13.0.2` （Node-API 預先建置—無Electron重建） |
| 應用程式版本       | `3.8.0`                                             |
| 應用程式編號       | `online.omniroute.desktop`                          |
| 產品名稱           | `OmniRoute`                                         |

## 腳本（根`package.json`）

| 腳本                              | 目的                                                      |
| --------------------------------- | --------------------------------------------------------- |
| `npm run electron:dev`            | 啟動`npm run dev` +等待`localhost:20128` +啟動Electron    |
| `npm run electron:build`          | 建構Next.js然後為當前OS運行`electron-builder`             |
| `npm run electron:build:win`      | 建造Windows NSIS安裝程式+便攜式 (x64)                     |
| `npm run electron:build:mac`      | 建構macOS DMG （Intel + Apple Silicon）                   |
| `npm run electron:build:linux`    | 建構Linux AppImage + DEB (x64 + arm64)                    |
| `npm run electron:smoke:packaged` | 啟動打包的二進位檔案並探測`/login` for HTTP 200，然後關閉 |

`electron/`工作區也公開：

- `npm run prepare:bundle` —運行`scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` —單架構macOS構建
- `npm run pack` —僅目錄建置用於本機測試（無安裝程式）

## 可選的運行時包

桌面版本可以與安裝程式一起發布可選的運行時存檔。安裝的伺服器負載包含`optional-packs.index.json` （在Windows和Linux上的`resources/app`下）。對於`browser-runtime`條目，請閱讀`packs[].tarball`並下載**來自同一版本的確切檔案名**。存檔名稱包含SHA-256摘要；不同的建置可能需要不同的檔案。保持下載的檔名不變。

將已安裝應用程式的索引和選定的檔案複製到一個目錄中，然後使用同一版本中的CLI ：

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list`顯示安裝和驗證狀態，而不是存檔檔案名稱。捆綁索引選擇存檔。安裝會在提取之前驗證其存檔校驗和，並在替換已安裝的套件之前驗證其套件校驗和。它讀取本地文件；它不會下載遺失的檔案。安裝後重新啟動應用程式。如果該版本沒有匹配的資產，則無法透過該版本的資產使用可選包。

## 目錄佈局

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

`main.js`和`preload.js`都是**CommonJS `.js`文件**，不是TypeScript。渲染器端類型位於`electron/types.d.ts`中。

## IPC橋（`preload.js`）

預先載入使用`contextBridge`以及`contextIsolation: true`和`nodeIntegration: false`在`window.electronAPI`上公開列入白名單的API 。

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

暴露方法：

| 渲染器呼叫                                                        | 類型               |
| ----------------------------------------------------------------- | ------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | 呼叫               |
| `openExternal(url)`                                               | 呼叫               |
| `getDataDir()`                                                    | 呼叫               |
| `restartServer()`                                                 | 呼叫               |
| `getAppVersion()`                                                 | 呼叫               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | 呼叫               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | 傳送               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | 接收（返回處理器） |

接收助手回傳一個**處理器功能**這可以防止React元件重新安裝時監聽器累積，而不是依賴`removeAllListeners` — 。

## 伺服器生命週期

`main.js`直接與Electron Node 執行階段產生Next.js獨立包，以避免本機模組ABI與系統 Node 不符：

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

亮點：

- `waitForServer()`在顯示視窗之前輪詢URL長達 30 秒（冷啟動時不會出現空白畫面）。
- `stdio: "pipe"`捕獲stdout/stderr；就緒短語（`Ready` / `listening`）透過IPC發出`server-status: running` 。
- `before-quit`等待最多 5 秒以取得正常的SIGTERM （WAL檢查點），然後發送SIGKILL。
- 托盤中的連接埠切換器（`20128`、 `3000`、 `8080`）停止並重新啟動伺服器，然後重新載入BrowserWindow。

## 零配置秘密引導程式

首次啟動時，主進程會自動產生並保留遺失的秘密：

| 秘密                     | 來源                                                                  |
| ------------------------ | --------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` （如果加密信用已存在則拒絕） |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                              |

堅持`<DATA_DIR>/server.env`。 `DATA_DIR`決定：

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute`或`~/.omniroute`
- macOS: `~/.omniroute`

## 環境文件查找

在生成伺服器之前，主進程（ `electron/main.js`中的`getPreferredEnvFilePath()` ）選擇**一**`.env`檔：第一個存在的檔案。

1. `$DATA_DIR/.env`，當`DATA_DIR`在應用程式啟動的環境中設定。
2. `<resolved DATA_DIR>/.env`，使用與上面相同的預設值： `%APPDATA%\omniroute\.env` on Windows， `$XDG_CONFIG_HOME/omniroute/.env`或`~/.omniroute/.env` on Linux和macOS。
3. `.env`在進程工作目錄中。

主進程只讀取該檔案；後來的候選者不會被合併。然後按照以下優先權建置伺服器環境（最高的優先順序）：

1. Electron進程環境（從啟動應用程式的任何環境繼承的變數）。
2. 選定的`.env`檔。
3. `<DATA_DIR>/server.env` （上面的引導程式秘密）。

應用程式啟動時會捕獲進程環境，因此應用程式運行時（包括視窗關閉後位於托盤中時）設定的系統或用戶環境變數在應用程式完全退出並重新啟動之前不會到達伺服器。對於諸如`CONTEXT_LENGTH_<PROVIDER>`之類的運行時旋鈕（請參閱[環境變數：每個提供者上下文長度](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)），更喜歡`.env`文件，然後完全退出（托盤，**辭職**）並重新啟動。

## 視窗和托盤

- `BrowserWindow`：1400 × 900（最少 1024 × 700）， `backgroundColor: "#0a0a0a"`。
- macOS: `titleBarStyle: "hiddenInset"`，紅綠燈位於`{ x: 16, y: 16 }`。
- Windows/Linux：原生標題列。
- 關閉按鈕最小化到托盤；托盤選單有**打開OmniRoute** ,**打開儀表板**（外部瀏覽器），**伺服器連接埠**子選單，**檢查更新**,**辭職**。

## 內容安全政策

透過`session.defaultSession.webRequest.onHeadersReceived`設定。值得注意的指令：

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev模式僅將`'unsafe-eval'`加入`script-src`

## 自動更新

`electron-updater`與GitHub提供者 (`diegosouzapw/OmniRoute`) 結合使用。

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- 透過`update-status` IPC轉發到渲染器的事件： `checking`、 `available`、 `not-available`、 `downloading` （使用`percent`）、 `downloaded`、 `error`
- `installUpdate()`殺死伺服器然後呼叫`autoUpdater.quitAndInstall()`
- 在開發模式下跳過 (`!app.isPackaged`)

## 建設管道

1. `npm run build` → Next.js獨立於`.next/standalone`中。
2. `prepare-electron-standalone.mjs` →重新階段到`.next/electron-standalone`中並重寫`server.js` + `required-server-files.json`內的絕對路徑，以便捆綁包可重新定位。
3. `electron-builder`包`main.js`、 `preload.js`、 `node_modules`和`extraResources: { ../.next/electron-standalone → app }`。

### 建立目標

| OS      | 目標                                  |
| ------- | ------------------------------------- |
| Windows | NSIS安裝程式+便攜式 (x64)             |
| macOS   | DMG （Intel + arm64，拖曳到應用程式） |
| Linux   | AppImage + DEB （x64 + arm64）        |

NSIS設定： `oneClick: false`，讓使用者選擇安裝目錄，建立桌面和開始功能表捷徑。

## 煙霧測試打包構建

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 自動發現目前平台的`electron/dist-electron/`中打包的二進位。
- 使用隔離的`HOME`/`APPDATA`/`XDG_*`目錄啟動，因此不會觸及開發人員資料。
- 在 45 秒內輪詢`http://127.0.0.1:20128/login`以獲得HTTP 200。
- 監視stderr/stdout的致命模式（`Cannot find module`、 `MODULE_NOT_FOUND`、 `ERR_DLOPEN_FAILED`、 `Failed to start server`等）。
- 準備好後等待 2 秒的穩定運行時間，然後發出SIGTERM並等待連接埠釋放。
- 在CI中，自動傳遞`--no-sandbox --disable-gpu` （以及`--disable-dev-shm-usage`上的Linux）。

環境覆蓋： `ELECTRON_SMOKE_APP_EXECUTABLE`、 `ELECTRON_SMOKE_URL`、 `ELECTRON_SMOKE_TIMEOUT_MS`、 `ELECTRON_SMOKE_SETTLE_MS`、 `ELECTRON_SMOKE_DATA_DIR`、 `ELECTRON_SMOKE_KEEP_DATA`、 `ELECTRON_SMOKE_STREAM_LOGS`。

## 程式碼簽名

`electron/package.json`確實**不是**直接電匯簽章憑證。透過環境變數將它們傳遞給`electron-builder`：

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

AppImage簽名是可選的—如果簽章則設定`LINUX_GPG_KEY` 。

## 分配

文物登陸`electron/dist-electron/`：

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

版本發佈到GitHub版本 (`diegosouzapw/OmniRoute`)，這也是`electron-updater`檢查新版本的地方。

## 故障排除

| 症狀                                                      | 使固定                                                                                                             |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Electron重大碰撞後的`Cannot find module 'better-sqlite3'` | better-sqlite3 v13 附帶 Node-API 預先建置—在根和`prepare:bundle`重新運行`npm install` （它驗證目前平台的預先建置） |
| `ERR_DLOPEN_FAILED`用於本機模組                           | 重新運行`prepare:bundle` —噹噹前平台的 Node-API 預建置遺失時，它會快速失敗                                         |
| Linux上的視窗顯示為空白                                   | 確認Next.js伺服器實際綁定到PORT （檢查`[Server]`日誌）                                                             |
| macOS公證停滯                                             | 確保`APPLE_*`變數被導出，而不僅僅是在`.env`中                                                                      |
| Windows SmartScreen警告                                   | 使用EV憑證簽名，或使用者右鍵單擊→ “仍然運行”                                                                       |
| 連接埠使用中煙霧測試失敗                                  | 在運行`electron:smoke:packaged`之前停止 20128 上的任何本機開發伺服器                                               |

## 參見

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- 來源： `electron/main.js`、 `electron/preload.js`、 `electron/package.json`
- 幫助者： `scripts/build/prepare-electron-standalone.mjs`、 `scripts/dev/smoke-electron-packaged.mjs`
