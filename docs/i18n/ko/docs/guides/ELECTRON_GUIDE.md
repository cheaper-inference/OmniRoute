# Electron Desktop Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **진실의 출처:** `electron/` 작업 공간** 마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute 는 다음을 기반으로 하는 크로스 플랫폼 데스크탑 앱(Windows / macOS / Linux)을 제공합니다.**Electron** +** 전자 빌더 26.10** . 데스크탑 앱은 Next.js 독립형 서버를 하위 프로세스로 생성하고 `BrowserWindow` 를 가리키며 시스템 트레이, 자동 업데이트, IPC 브리지 및 제로 구성 비밀 부트스트랩을 추가합니다.

## 건축학

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

## 버전

`electron/package.json` 에서 확인됨:

| 패키지             | 버전                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                               |
| `electron-builder` | `^26.15.3`                                                              |
| `electron-updater` | `^6.8.9`                                                                |
| `better-sqlite3`   | 루트 `^13.0.2` (Node-API는 — 사전 빌드하고 Electron 다시 빌드하지 않음) |
| 앱 버전            | `3.8.0`                                                                 |
| 앱 ID              | `online.omniroute.desktop`                                              |
| 제품명             | `OmniRoute`                                                             |

## 스크립트(루트 `package.json`)

| 스크립트                          | 목적                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` 시작합니다. + `localhost:20128` 를 기다립니다. + Electron 시작합니다. |
| `npm run electron:build`          | Next.js 를 빌드한 후 현재 OS 에 대해 `electron-builder` 실행합니다.                 |
| `npm run electron:build:win`      | Windows NSIS 설치 프로그램 + Portable(x64) 빌드                                     |
| `npm run electron:build:mac`      | macOS DMG 빌드(Intel + Apple Silicon)                                               |
| `npm run electron:build:linux`    | Linux AppImage + DEB x64 + arm64) 빌드                                              |
| `npm run electron:smoke:packaged` | 패키지된 바이너리를 실행하고 HTTP 200에 대해 `/login` 조사한 다음 종료합니다.       |

`electron/` 작업 공간은 다음 사항도 공개합니다.

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` 실행합니다.
- `npm run build:mac-x64` / `build:mac-arm64` — 단일 아키텍처 macOS 빌드
- 로컬 테스트를 위한 `npm run pack` — 디렉토리 전용 빌드(설치 프로그램 없음)

## 선택적 런타임 팩

데스크탑 빌드는 설치 프로그램과 함께 선택적 런타임 아카이브를 게시할 수 있습니다. 설치된 서버 페이로드에는 `optional-packs.index.json` ( Windows 및 Linux 의 `resources/app` 아래)가 포함되어 있습니다. `browser-runtime` 항목의 경우 `packs[].tarball` 읽고 다운로드하십시오.** 동일한 릴리스의 정확한 파일 이름** . 아카이브 이름에는 SHA-256 다이제스트가 포함됩니다. 빌드마다 다른 아카이브가 필요할 수 있습니다. 다운로드한 파일 이름을 변경하지 않고 유지하세요.

설치된 앱의 색인과 선택한 아카이브를 하나의 디렉터리에 복사한 다음 동일한 릴리스의 CLI 사용합니다.

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` 아카이브 파일 이름이 아닌 설치 및 확인 상태를 표시합니다. 번들 인덱스는 아카이브를 선택합니다. 설치에서는 추출 전에 아카이브 체크섬을 확인하고, 설치된 팩을 교체하기 전에 패키지 체크섬을 확인합니다. 로컬 파일을 읽습니다. 누락된 아카이브는 다운로드하지 않습니다. 설치 후 응용 프로그램을 다시 시작하십시오. 릴리스에 일치하는 자산이 없으면 해당 릴리스의 자산을 통해 선택적 팩을 사용할 수 없습니다.

## 디렉토리 레이아웃

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

`main.js` 와 `preload.js` 는 모두**CommonJS `.js` 파일** , TypeScript 아닙니다. 렌더러 측 입력은 `electron/types.d.ts` 에 있습니다.

## IPC 브리지(`preload.js`)

사전 로드는 `contextIsolation: true` 및 `nodeIntegration: false` 와 함께 `contextBridge` 사용하여 `window.electronAPI` 에 허용된 API 노출합니다.

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

노출된 방법:

| 렌더러 호출                                                       | 유형              |
| ----------------------------------------------------------------- | ----------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | 부르다            |
| `openExternal(url)`                                               | 부르다            |
| `getDataDir()`                                                    | 부르다            |
| `restartServer()`                                                 | 부르다            |
| `getAppVersion()`                                                 | 부르다            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | 부르다            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | 보내다            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | 수신(반품 처리자) |

수신 도우미는 다음을 반환합니다.** 디스포저 기능** `removeAllListeners` — 에 의존하는 대신 React 구성 요소를 다시 마운트할 때 수신기가 누적되는 것을 방지합니다.

## 서버 수명주기

`main.js` 시스템 노드와의 기본 모듈 ABI 불일치를 방지하기 위해 Electron Node 런타임으로 직접 Next.js 독립형 번들을 생성합니다.

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

하이라이트:

- `waitForServer()` 창을 표시하기 전에 최대 30초 동안 URL 를 폴링합니다(콜드 스타트 시 빈 화면 없음).
- `stdio: "pipe"` stdout/stderr 캡처합니다. 준비된 문구(`Ready` / `listening`)는 IPC 통해 `server-status: running` 방출합니다.
- `before-quit` 우아한 SIGTERM (WAL 체크포인트)를 위해 최대 5초를 기다린 다음 SIGKILL 보냅니다.
- 트레이의 포트 전환기(`20128`, `3000`, `8080`)는 서버를 중지하고 다시 시작한 다음 BrowserWindow 를 다시 로드합니다.

## 구성이 필요 없는 비밀 부트스트랩

처음 실행 시 기본 프로세스는 누락된 비밀을 자동 생성하고 유지합니다.

| 비밀                     | 원천                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (암호화된 자격 증명이 이미 존재하는 경우 거부) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                |

`<DATA_DIR>/server.env` 에 지속됩니다. `DATA_DIR` 다음을 해결합니다.

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` 또는 `~/.omniroute`
- macOS: `~/.omniroute`

## 환경 파일 조회

서버를 생성하기 전에 기본 프로세스( `electron/main.js` 의 `getPreferredEnvFilePath()` )는 다음을 선택합니다.** 하나** `.env` 파일: 존재하는 첫 번째 파일입니다.

1. `$DATA_DIR/.env`, 앱이 실행된 환경에 `DATA_DIR` 설정된 경우.
2. `<resolved DATA_DIR>/.env`, 위와 동일한 기본값 사용: Windows 의 `%APPDATA%\omniroute\.env`, `$XDG_CONFIG_HOME/omniroute/.env` 및 Linux 의 macOS 또는 `~/.omniroute/.env`.
3. 프로세스 작업 디렉터리에 `.env`.

기본 프로세스는 해당 파일만 읽습니다. 이후의 후보는 병합되지 않습니다. 그런 다음 서버 환경은 다음 우선 순위(가장 높은 것부터)로 구축됩니다.

1. Electron 프로세스 환경(앱을 시작한 모든 것에서 상속된 변수)
2. 선택한 `.env` 파일입니다.
3. `<DATA_DIR>/server.env` (위의 부트스트랩 비밀).

프로세스 환경은 앱이 시작될 때 캡처되므로 앱이 실행되는 동안 설정된 시스템 또는 사용자 환경 변수(창을 닫은 후 트레이에 있는 동안 포함)는 앱이 완전히 종료되고 다시 시작될 때까지 서버에 도달하지 않습니다. `CONTEXT_LENGTH_<PROVIDER>` ( [환경 변수: 공급자별 컨텍스트 길이](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) 참조)와 같은 런타임 노브의 경우 `.env` 파일을 선호한 다음 완전히 종료합니다(트레이,** 그만두다** ) 다시 시작하세요.

## 창 및 트레이

- `BrowserWindow`: 1400 × 900 (최소 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` 의 신호등.
- Windows/Linux: 기본 제목 표시줄.
- 닫기 버튼은 트레이로 최소화됩니다. 트레이 메뉴에는** OmniRoute 열기** ,** 대시보드 열기** (외부 브라우저),** 서버 포트** 하위 메뉴,** 업데이트 확인** ,** 그만두다** .

## 콘텐츠 보안 정책

`session.defaultSession.webRequest.onHeadersReceived` 통해 설정합니다. 주목할만한 지시문:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 개발자 모드에서는 `script-src` 에만 `'unsafe-eval'` 추가합니다.

## 자동 업데이트

GitHub 공급자(`diegosouzapw/OmniRoute`)와 함께 `electron-updater` 사용합니다.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC 통해 렌더러로 전달되는 이벤트: `checking`, `available`, `not-available`, `downloading` ( `percent` 사용 ), `downloaded`, `error`
- `installUpdate()` 서버를 종료한 다음 `autoUpdater.quitAndInstall()` 호출합니다.
- 개발 모드에서 건너뛰었습니다(`!app.isPackaged`)

## 파이프라인 구축

1. `npm run build` → Next.js `.next/standalone` 에서 독립형입니다.
2. `prepare-electron-standalone.mjs` → 는 `.next/electron-standalone` 로 다시 준비하고 `server.js` + `required-server-files.json` 내부의 절대 경로를 다시 작성하여 번들이 재배치 가능하도록 합니다.
3. `electron-builder` 패키지 `main.js`, `preload.js`, `node_modules` 및 `extraResources: { ../.next/electron-standalone → app }`.

### 빌드 타겟

| OS      | 대상                                         |
| ------- | -------------------------------------------- |
| Windows | NSIS 설치 프로그램 + Portable (x64)          |
| macOS   | DMG (Intel + arm64, 애플리케이션으로 드래그) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS 설정: `oneClick: false`, 사용자가 설치 디렉터리를 선택하고 바탕 화면 및 시작 메뉴 바로 가기를 만들 수 있습니다.

## 연기 테스트 패키지 빌드

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 현재 플랫폼에 대해 `electron/dist-electron/` 에서 패키지된 바이너리를 자동 검색합니다.
- 개발자 데이터에 영향을 주지 않도록 격리된 `HOME`/`APPDATA`/`XDG_*` 디렉토리로 실행됩니다.
- 45초 내에 HTTP 200에 대해 `http://127.0.0.1:20128/login` 폴링합니다.
- 치명적인 패턴(`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` 등)이 있는지 stderr/stdout 감시합니다.
- 준비 후 2초간 안정적인 런타임을 기다린 다음 SIGTERM 실행하고 포트가 해제될 때까지 기다립니다.
- CI 에서는 자동으로 `--no-sandbox --disable-gpu` (및 Linux 의 `--disable-dev-shm-usage` )를 전달합니다.

Env 재정의: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## 코드 서명

`electron/package.json` 그렇습니다** ~ 아니다** 서명 자격 증명을 직접 전송합니다. env vars를 통해 `electron-builder` 로 전달합니다.

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

AppImage 서명은 선택 사항입니다. — 서명하는 경우 `LINUX_GPG_KEY` 설정합니다.

## 분포

아티팩트은 `electron/dist-electron/` 에 위치합니다.

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

릴리스는 GitHub 릴리스(`diegosouzapw/OmniRoute`)에 게시되며 `electron-updater` 새 버전을 확인하는 곳이기도 합니다.

## 문제 해결

| 징후                                                        | 고치다                                                                                                                                                    |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron 주요 충돌 후 `Cannot find module 'better-sqlite3'` | better-sqlite3 v13은 Node-API 사전 빌드를 제공합니다. — 루트에서 `npm install` 다시 실행하고 `prepare:bundle` (현재 플랫폼에 대한 사전 빌드를 확인합니다) |
| 네이티브 모듈용 `ERR_DLOPEN_FAILED`                         | 현재 플랫폼에 대한 Node-API 사전 빌드가 누락되면 `prepare:bundle` — 다시 실행하면 빠르게 실패합니다.                                                      |
| Linux 에서 창이 공백으로 나타납니다.                        | 실제로 PORT 에 바인딩된 Next.js 서버를 확인합니다( `[Server]` 로그 확인).                                                                                 |
| macOS 공증 매점                                             | `.env` 뿐만 아니라 `APPLE_*` 변수를 내보내는지 확인하세요.                                                                                                |
| Windows SmartScreen 경고                                    | EV 인증서로 서명하거나 사용자가 → "어쨌든 실행"을 마우스 오른쪽 버튼으로 클릭합니다.                                                                      |
| 포트 사용 시 스모크 테스트 실패                             | `electron:smoke:packaged` 실행하기 전에 20128에서 로컬 개발 서버를 중지하세요.                                                                            |

## 참조

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- 소스: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- 도우미: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
