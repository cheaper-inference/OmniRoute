# Electron Desktop Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **事实来源：** `electron/`工作区**最后更新：** 2026-06-28 — v3.8.40

OmniRoute提供了一个跨平台桌面应用程序 (Windows / macOS / Linux)**Electron 41** +**电子构建器 26.10** 。桌面应用程序将Next.js独立服务器作为子进程生成，将`BrowserWindow`指向它，并添加系统托盘、自动更新程序、 IPC桥和零配置秘密引导程序。

## 建筑学

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

经`electron/package.json`确认：

| 包裹               | 版本                                              |
| ------------------ | ------------------------------------------------- |
| `electron`         | `^43.4.1`                                         |
| `electron-builder` | `^26.15.3`                                        |
| `electron-updater` | `^6.8.9`                                          |
| `better-sqlite3`   | root `^13.0.2` （Node-API 预构建—无Electron重建） |
| 应用程序版本       | `3.8.0`                                           |
| 应用程序编号       | `online.omniroute.desktop`                        |
| 产品名称           | `OmniRoute`                                       |

## 脚本（根`package.json`）

| 脚本                              | 目的                                                      |
| --------------------------------- | --------------------------------------------------------- |
| `npm run electron:dev`            | 启动`npm run dev` +等待`localhost:20128` +启动Electron    |
| `npm run electron:build`          | 构建Next.js然后为当前OS运行`electron-builder`             |
| `npm run electron:build:win`      | 构建Windows NSIS安装程序+便携式 (x64)                     |
| `npm run electron:build:mac`      | 构建macOS DMG （Intel + Apple Silicon）                   |
| `npm run electron:build:linux`    | 构建Linux AppImage + DEB (x64 + arm64)                    |
| `npm run electron:smoke:packaged` | 启动打包的二进制文件并探测`/login` for HTTP 200，然后关闭 |

`electron/`工作区还公开：

- `npm run prepare:bundle` —运行`scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` —单架构macOS构建
- `npm run pack` —仅目录构建用于本地测试（无安装程序）

## 可选的运行时包

桌面版本可以与安装程序一起发布可选的运行时存档。安装的服务器负载包含`optional-packs.index.json` （在Windows和Linux上的`resources/app`下）。对于`browser-runtime`条目，请阅读`packs[].tarball`并下载**来自同一版本的确切文件名**。存档名称包含SHA-256摘要；不同的构建可能需要不同的档案。保持下载的文件名不变。

将已安装应用程序的索引和选定的存档复制到一个目录中，然后使用同一版本中的CLI ：

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list`显示安装和验证状态，而不是存档文件名。捆绑索引选择存档。安装会在提取之前验证其存档校验和，并在替换已安装的包之前验证其包校验和。它读取本地文件；它不会下载丢失的档案。安装后重新启动应用程序。如果该版本没有匹配的资产，则无法通过该版本的资产使用可选包。

## 目录布局

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

`main.js`和`preload.js`都是**CommonJS `.js`文件**，不是TypeScript。渲染器端类型位于`electron/types.d.ts`中。

## IPC桥（`preload.js`）

预加载使用`contextBridge`以及`contextIsolation: true`和`nodeIntegration: false`在`window.electronAPI`上公开列入白名单的API 。

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

| 渲染器调用                                                        | 类型               |
| ----------------------------------------------------------------- | ------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | 调用               |
| `openExternal(url)`                                               | 调用               |
| `getDataDir()`                                                    | 调用               |
| `restartServer()`                                                 | 调用               |
| `getAppVersion()`                                                 | 调用               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | 调用               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | 发送               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | 接收（返回处理器） |

接收助手返回一个**处理器功能**这可以防止React组件重新安装时监听器累积，而不是依赖`removeAllListeners` — 。

## 服务器生命周期

`main.js`直接与Electron Node 运行时生成Next.js独立包，以避免本机模块ABI与系统 Node 不匹配：

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

亮点：

- `waitForServer()`在显示窗口之前轮询URL长达 30 秒（冷启动时不会出现空白屏幕）。
- `stdio: "pipe"`捕获stdout/stderr；就绪短语（`Ready` / `listening`）通过IPC发出`server-status: running` 。
- `before-quit`等待最多 5 秒以获取正常的SIGTERM （WAL检查点），然后发送SIGKILL。
- 托盘中的端口切换器（`20128`、 `3000`、 `8080`）停止并重新启动服务器，然后重新加载BrowserWindow。

## 零配置秘密引导程序

首次启动时，主进程会自动生成并保留丢失的秘密：

| 秘密                     | 来源                                                                  |
| ------------------------ | --------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` （如果加密信用已存在则拒绝） |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                              |

坚持`<DATA_DIR>/server.env`。 `DATA_DIR`决定：

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute`或`~/.omniroute`
- macOS: `~/.omniroute`

## 环境文件查找

在生成服务器之前，主进程（ `electron/main.js`中的`getPreferredEnvFilePath()` ）选择**一**`.env`文件：第一个存在的文件。

1. `$DATA_DIR/.env`，当`DATA_DIR`在应用程序启动的环境中设置时。
2. `<resolved DATA_DIR>/.env`，使用与上面相同的默认值： `%APPDATA%\omniroute\.env` on Windows， `$XDG_CONFIG_HOME/omniroute/.env`或`~/.omniroute/.env` on Linux和macOS。
3. `.env`在进程工作目录中。

主进程只读取该文件；后来的候选者不会被合并。然后按照以下优先级构建服务器环境（最高的优先）：

1. Electron进程环境（从启动应用程序的任何环境继承的变量）。
2. 选定的`.env`文件。
3. `<DATA_DIR>/server.env` （上面的引导程序秘密）。

应用程序启动时会捕获进程环境，因此应用程序运行时（包括窗口关闭后位于托盘中时）设置的系统或用户环境变量在应用程序完全退出并重新启动之前不会到达服务器。对于诸如`CONTEXT_LENGTH_<PROVIDER>`之类的运行时旋钮（请参阅[环境变量：每个提供程序上下文长度](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)），更喜欢`.env`文件，然后完全退出（托盘，**辞职**）并重新启动。

## 窗口和托盘

- `BrowserWindow`：1400 × 900（最少 1024 × 700）， `backgroundColor: "#0a0a0a"`。
- macOS: `titleBarStyle: "hiddenInset"`，红绿灯位于`{ x: 16, y: 16 }`。
- Windows/Linux：原生标题栏。
- 关闭按钮最小化到托盘；托盘菜单有**打开OmniRoute** ,**打开仪表板**（外部浏览器），**服务器端口**子菜单，**检查更新**,**辞职**。

## 内容安全政策

通过`session.defaultSession.webRequest.onHeadersReceived`设置。值得注意的指令：

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev模式仅将`'unsafe-eval'`添加到`script-src`

## 自动更新

`electron-updater`与GitHub提供程序 (`diegosouzapw/OmniRoute`) 结合使用。

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- 通过`update-status` IPC转发到渲染器的事件： `checking`、 `available`、 `not-available`、 `downloading` （使用`percent`）、 `downloaded`、 `error`
- `installUpdate()`杀死服务器然后调用`autoUpdater.quitAndInstall()`
- 在开发模式下跳过 (`!app.isPackaged`)

## 建设管道

1. `npm run build` → Next.js独立于`.next/standalone`中。
2. `prepare-electron-standalone.mjs` →重新阶段到`.next/electron-standalone`中并重写`server.js` + `required-server-files.json`内的绝对路径，以便捆绑包可重新定位。
3. `electron-builder`包`main.js`、 `preload.js`、 `node_modules`和`extraResources: { ../.next/electron-standalone → app }`。

### 建立目标

| OS      | 目标                                |
| ------- | ----------------------------------- |
| Windows | NSIS安装程序+便携式 (x64)           |
| macOS   | DMG （Intel + arm64，拖至应用程序） |
| Linux   | AppImage + DEB （x64 + arm64）      |

NSIS设置： `oneClick: false`，让用户选择安装目录，创建桌面和开始菜单快捷方式。

## 烟雾测试打包构建

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 自动发现当前平台的`electron/dist-electron/`中打包的二进制文件。
- 使用隔离的`HOME`/`APPDATA`/`XDG_*`目录启动，因此不会触及开发人员数据。
- 在 45 秒内轮询`http://127.0.0.1:20128/login`以获得HTTP 200。
- 监视stderr/stdout的致命模式（`Cannot find module`、 `MODULE_NOT_FOUND`、 `ERR_DLOPEN_FAILED`、 `Failed to start server`等）。
- 准备就绪后等待 2 秒的稳定运行时间，然后发出SIGTERM并等待端口释放。
- 在CI中，自动传递`--no-sandbox --disable-gpu` （以及`--disable-dev-shm-usage`上的Linux）。

环境覆盖： `ELECTRON_SMOKE_APP_EXECUTABLE`、 `ELECTRON_SMOKE_URL`、 `ELECTRON_SMOKE_TIMEOUT_MS`、 `ELECTRON_SMOKE_SETTLE_MS`、 `ELECTRON_SMOKE_DATA_DIR`、 `ELECTRON_SMOKE_KEEP_DATA`、 `ELECTRON_SMOKE_STREAM_LOGS`。

## 代码签名

`electron/package.json`确实**不是**直接电汇签名凭据。通过环境变量将它们传递给`electron-builder`：

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

AppImage签名是可选的—如果签名则设置`LINUX_GPG_KEY` 。

## 分配

文物登陆`electron/dist-electron/`：

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

版本发布到GitHub版本 (`diegosouzapw/OmniRoute`)，这也是`electron-updater`检查新版本的地方。

## 故障排除

| 症状                                                      | 使固定                                                                                                         |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Electron重大碰撞后的`Cannot find module 'better-sqlite3'` | better-sqlite3 v13 附带 Node-API 预构建—在根和`prepare:bundle`重新运行`npm install` （它验证当前平台的预构建） |
| `ERR_DLOPEN_FAILED`用于本机模块                           | 重新运行`prepare:bundle` —当当前平台的 Node-API 预构建丢失时，它会快速失败                                     |
| Linux上的窗口显示为空白                                   | 确认Next.js服务器实际绑定到PORT （检查`[Server]`日志）                                                         |
| macOS公证停滞                                             | 确保`APPLE_*`变量被导出，而不仅仅是在`.env`中                                                                  |
| Windows SmartScreen警告                                   | 使用EV证书签名，或者用户右键单击→ “仍然运行”                                                                   |
| 端口使用中烟雾测试失败                                    | 在运行`electron:smoke:packaged`之前停止 20128 上的任何本地开发服务器                                           |

## 参见

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- 资料来源： `electron/main.js`、 `electron/preload.js`、 `electron/package.json`
- 帮助者： `scripts/build/prepare-electron-standalone.mjs`、 `scripts/dev/smoke-electron-packaged.mjs`
