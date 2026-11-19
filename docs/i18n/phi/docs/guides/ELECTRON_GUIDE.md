# Electron Desktop Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Pinagmulan ng katotohanan:** `electron/` workspace** Huling na-update:** 2026-06-28 — v3.8.40

Nagpapadala OmniRoute ng cross-platform na desktop app (Windows / macOS / Linux) na binuo**Electron 41** +** tagabuo ng elektron 26.10** . Binubuo ng desktop app ang Next.js standalone server bilang proseso ng bata, itinuturo ang isang `BrowserWindow` dito, at nagdaragdag ng system tray, auto-updater, IPC bridge, at zero-config na sikretong bootstrap.

## Arkitektura

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

## Mga bersyon

Kinumpirma mula sa `electron/package.json`:

| Package              | Bersyon                                                   |
| -------------------- | --------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                 |
| `electron-builder`   | `^26.15.3`                                                |
| `electron-updater`   | `^6.8.9`                                                  |
| `better-sqlite3`     | root `^13.0.2` (Node-API prebuilds — no Electron rebuild) |
| Bersyon ng app       | `3.8.0`                                                   |
| App id               | `online.omniroute.desktop`                                |
| Pangalan ng produkto | `OmniRoute`                                               |

## Mga script (root `package.json`)

| Script                            | Layunin                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Nagsisimula `npm run dev` + naghihintay para sa `localhost:20128` + ilunsad Electron                |
| `npm run electron:build`          | Bumubuo ng Next.js pagkatapos ay nagpapatakbo `electron-builder` para sa kasalukuyang OS            |
| `npm run electron:build:win`      | Bumubuo ng Windows NSIS installer + portable (x64)                                                  |
| `npm run electron:build:mac`      | Bumubuo ng macOS DMG (Intel + Apple Silicon)                                                        |
| `npm run electron:build:linux`    | Binubuo Linux AppImage + DEB (x64 + arm64)                                                          |
| `npm run electron:smoke:packaged` | Inilunsad ang naka-package na binary at sinusuri `/login` para sa HTTP 200, pagkatapos ay nagsasara |

Inilalantad din ng `electron/` workspace ang:

- `npm run prepare:bundle` — tumatakbo `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS build
- `npm run pack` — directory-only build para sa lokal na pagsubok (walang installer)

## Opsyonal na runtime pack

Ang mga build sa desktop ay maaaring mag-publish ng mga opsyonal na runtime archive kasama ng kanilang mga installer. Ang naka-install na server payload ay naglalaman `optional-packs.index.json` (sa ilalim ng `resources/app` sa Windows at Linux). Para sa `browser-runtime` entry, basahin `packs[].tarball` at i-download** ang eksaktong filename na iyon mula sa parehong release** . Kasama sa mga pangalan ng archive ang isang SHA-256 digest; maaaring mangailangan ng iba't ibang archive ang iba't ibang build. Panatilihing hindi nagbabago ang na-download na filename.

Kopyahin ang index ng naka-install na app at ang napiling archive sa isang direktoryo, pagkatapos ay gamitin ang CLI mula sa parehong release:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

ipinapakita ng `packs list` ang estado ng pag-install at pag-verify, hindi ang filename ng archive. Pinipili ng naka-bundle na index ang archive. Bine-verify ng pag-install ang archive checksum nito bago ang pagkuha at ang mga checksum ng package nito bago palitan ang isang naka-install na pack. Nagbabasa ito ng mga lokal na file; hindi ito nagda-download ng mga nawawalang archive. I-restart ang application pagkatapos ng pag-install. Kung walang tugmang asset ang release, hindi available ang opsyonal na pack sa pamamagitan ng mga asset ng release na iyon.

## Layout ng Direktoryo

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

`main.js` at `preload.js` ay**CommonJS `.js` file** , hindi TypeScript. Ang mga renderer-side na pag-type ay nakatira sa `electron/types.d.ts`.

## IPC Bridge (`preload.js`)

Inilalantad ng preload ang isang naka-whitelist na API sa `window.electronAPI` gamit `contextBridge` na may `contextIsolation: true` at `nodeIntegration: false`.

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

Mga nakalantad na pamamaraan:

| Tawag ng tagapag-render                                           | Uri                                |
| ----------------------------------------------------------------- | ---------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | panawagan                          |
| `openExternal(url)`                                               | panawagan                          |
| `getDataDir()`                                                    | panawagan                          |
| `restartServer()`                                                 | panawagan                          |
| `getAppVersion()`                                                 | panawagan                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | panawagan                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | ipadala                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | tumanggap (nagbabalik ng disposer) |

Ang mga tumatanggap na katulong ay nagbabalik a** function ng disposer** sa halip na umasa sa `removeAllListeners` — pinipigilan nito ang akumulasyon ng tagapakinig kapag muling nag-mount ang mga bahagi React.

## Lifecycle ng Server

`main.js` ay naglalabas ng Next.js standalone na bundle nang direkta sa Electron Node runtime upang maiwasan ang native-module ABI mismatch sa system Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Mga Highlight:

- Binoboto `waitForServer()` ang URL hanggang 30 s bago ipakita ang window (walang blangkong screen sa malamig na simula).
- kinukuha ng `stdio: "pipe"` stdout/stderr; handa na mga parirala (`Ready` / `listening`) naglalabas ng `server-status: running` sa IPC.
- Naghihintay `before-quit` ng hanggang 5 s para sa magandang SIGTERM (WAL checkpoint) pagkatapos ay nagpapadala SIGKILL.
- Ang port switcher sa tray (`20128`, `3000`, `8080`) ay hihinto at i-restart ang server, pagkatapos ay i-reload ang BrowserWindow.

## Zero-config Secret Bootstrap

Sa unang paglunsad, ang pangunahing proseso ay awtomatikong bumubuo at nagpapatuloy sa mga nawawalang lihim:

| Lihim                    | Pinagmulan                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (tumanggi kung mayroon nang mga naka-encrypt na kredo) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                        |

Nagpumilit sa `<DATA_DIR>/server.env`. `DATA_DIR` ay nagpasya sa:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` o `~/.omniroute`
- macOS: `~/.omniroute`

## Paghahanap ng file sa kapaligiran

Bago i-spawning ang server, pinipili ang pangunahing proseso (`getPreferredEnvFilePath()` sa `electron/main.js`).** isa** `.env` file: ang una sa mga ito na umiiral.

1. `$DATA_DIR/.env`, kapag nakatakda ang `DATA_DIR` sa kapaligiran kung saan inilunsad ang app.
2. `<resolved DATA_DIR>/.env`, gamit ang parehong mga default tulad ng nasa itaas: `%APPDATA%\omniroute\.env` sa Windows, `$XDG_CONFIG_HOME/omniroute/.env` o `~/.omniroute/.env` sa Linux at macOS.
3. `.env` sa prosesong gumaganang direktoryo.

Ang pangunahing proseso ay nagbabasa lamang ng file na iyon; sa ibang pagkakataon ang mga kandidato ay hindi pinagsama-sama. Ang kapaligiran ng server ay binuo nang may ganitong precedence (pinakamataas muna):

1. Ang kapaligiran ng proseso ng Electron (mga variable na minana mula sa anumang inilunsad ang app).
2. Ang napiling `.env` file.
3. `<DATA_DIR>/server.env` (ang mga lihim ng bootstrap sa itaas).

Kinukuha ang environment ng proseso kapag nagsimula ang app, kaya ang variable ng system o user environment na nakatakda habang tumatakbo ang app (kabilang ang habang nakaupo ito sa tray pagkatapos isara ang window nito) ay hindi makakarating sa server hanggang sa ganap na umalis at mailunsad muli ang app. Para sa runtime knobs gaya ng `CONTEXT_LENGTH_<PROVIDER>` (tingnan [ang Environment Variables: Per-provider context length](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), mas gusto ang `.env` file, pagkatapos ay ganap na umalis (tray,** quit** ) at muling ilunsad.

## Bintana at Tray

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light at `{ x: 16, y: 16 }`.
- Windows/Linux: katutubong title bar.
- Isara ang button na pinapaliit sa tray; ang tray menu ay mayroon** Buksan OmniRoute** ,** Buksan ang Dashboard** (panlabas na browser),** Port ng Server** submenu,** Tingnan ang Mga Update** ,** quit** .

## Patakaran sa Seguridad ng Nilalaman

Itakda sa pamamagitan ng `session.defaultSession.webRequest.onHeadersReceived`. Mga kilalang direktiba:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Ang dev mode ay nagdaragdag `'unsafe-eval'` sa `script-src` lamang

## Auto-update

Gumagamit `electron-updater` sa GitHub provider (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Ipinasa ang mga kaganapan sa renderer sa pamamagitan ng `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (may `percent`), `downloaded`, `error`
- pinapatay ni `installUpdate()` ang server pagkatapos ay tinawagan `autoUpdater.quitAndInstall()`
- Nilaktawan sa dev mode (`!app.isPackaged`)

## Bumuo ng Pipeline

1. `npm run build` → Next.js standalone sa `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ay muling umuusad sa `.next/electron-standalone` at muling nagsusulat ng mga ganap na landas sa loob `server.js` + `required-server-files.json` upang ang bundle ay maililipat.
3. `electron-builder` packages `main.js`, `preload.js`, `node_modules`, at `extraResources: { ../.next/electron-standalone → app }`.

### Bumuo ng mga target

| OS      | Mga target                                |
| ------- | ----------------------------------------- |
| Windows | NSIS installer + portable (x64)           |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS settings: `oneClick: false`, hinahayaan ang user na pumili ng direktoryo ng pag-install, lumilikha ng mga shortcut sa Desktop at Start-Menu.

## Smoke Testing Packaged Build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Awtomatikong natutuklasan ang naka-package na binary sa `electron/dist-electron/` para sa kasalukuyang platform.
- Naglulunsad sa mga nakahiwalay na `HOME`/`APPDATA`/`XDG_*` na mga direktoryo upang hindi nito mahawakan ang data ng developer.
- Mga botohan `http://127.0.0.1:20128/login` para sa HTTP 200 sa loob ng 45 s.
- Mga relo stderr/stdout para sa mga nakamamatay na pattern (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, atbp.).
- Naghihintay ng 2 s ng stable na runtime pagkatapos ng pagiging handa, pagkatapos ay mag-isyu ng SIGTERM at maghihintay na malaya ang port.
- Sa CI, awtomatikong pumasa `--no-sandbox --disable-gpu` (at `--disable-dev-shm-usage` sa Linux).

Mga override ng env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Code Signing

ginagawa `electron/package.json`** hindi** direktang mga kredensyal sa pagpirma ng wire. Ipasa ang mga ito sa pamamagitan ng env vars sa `electron-builder`:

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

Ang pagpirma ng AppImage ay opsyonal — set `LINUX_GPG_KEY` kung pumirma.

## Pamamahagi

Nakarating ang mga artifact sa `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Na-publish ang mga release sa GitHub Releases (`diegosouzapw/OmniRoute`), na kung saan din tumitingin `electron-updater` para sa mga bagong bersyon.

## Pag-troubleshoot

| Sintomas                                                             | Ayusin                                                                                                                                                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` pagkatapos Electron major bump | better-sqlite3 v13 ay nagpapadala ng Node-API prebuilds — muling patakbuhin `npm install` sa ugat at `prepare:bundle` (bini-verify nito ang prebuild para sa kasalukuyang platform) |
| `ERR_DLOPEN_FAILED` para sa katutubong module                        | Patakbuhin muli `prepare:bundle` — mabilis itong nabigo kapag nawawala ang Node-API prebuild para sa kasalukuyang platform                                                          |
| Lumalabas na blangko ang window sa Linux                             | Kumpirmahin ang Next.js server na talagang nakatali sa PORT (tingnan ang mga `[Server]` log)                                                                                        |
| macOS notarization stalls                                            | Tiyaking na-export ang mga `APPLE_*` vars, hindi lang sa `.env`                                                                                                                     |
| Windows SmartScreen babala                                           | Mag-sign gamit ang EV cert, o i-right click ng mga user → "Run anyway"                                                                                                              |
| Nabigo ang smoke test sa port-in-use                                 | Ihinto ang anumang lokal na dev server sa 20128 bago patakbuhin ang `electron:smoke:packaged`                                                                                       |

## Tingnan din

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Pinagmulan: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Mga Katulong: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
