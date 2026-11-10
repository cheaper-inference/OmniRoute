# Electron Desktop Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sors tal-verità:** `electron/` workspace** Aġġornata l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jibgħat app tad-desktop fuq pjattaformi (Windows / macOS / Linux) mibnija fuq**Electron 41** +** il-bennej tal-elettroni 26.10** . L-app tad-desktop ibid is-server Next.js waħdu bħala proċess tifel, tipponta `BrowserWindow` lejha, u żżid trej tas-sistema, auto-updater, IPC bridge, u bootstrap sigriet zero-config.

## Arkitettura

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

## Verżjonijiet

Ikkonfermat minn `electron/package.json`:

| Pakkett            | Verżjoni                                                  |
| ------------------ | --------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                 |
| `electron-builder` | `^26.15.3`                                                |
| `electron-updater` | `^6.8.9`                                                  |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — no Electron rebuild) |
| Verżjoni tal-app   | `3.8.0`                                                   |
| App id             | `online.omniroute.desktop`                                |
| Isem tal-prodott   | `OmniRoute`                                               |

## Skripts (root `package.json`)

| Iskript                           | Għan                                                                     |
| --------------------------------- | ------------------------------------------------------------------------ |
| `npm run electron:dev`            | Tibda `npm run dev` + tistenna `localhost:20128` + tniedi Electron       |
| `npm run electron:build`          | Jibni Next.js imbagħad runs `electron-builder` għall- OS kurrenti        |
| `npm run electron:build:win`      | Jibni Windows NSIS installer + portabbli (x64)                           |
| `npm run electron:build:mac`      | Jibni macOS DMG (Intel + Apple Silicon)                                  |
| `npm run electron:build:linux`    | Tibni Linux AppImage + DEB (x64 + arm64)                                 |
| `npm run electron:smoke:packaged` | Tniedi binarju ppakkjat u sondi `/login` għal HTTP 200, imbagħad jagħlaq |

L-ispazju tax-xogħol `electron/` jesponi wkoll:

- `npm run prepare:bundle` — runs `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS builds
- `npm run pack` — direttorju-bini biss għall-ittestjar lokali (l-ebda installatur)

## Pakketti runtime fakultattivi

Il-bini tad-desktop jistgħu jippubblikaw arkivji runtime fakultattivi flimkien mal-installaturi tagħhom. It-tagħbija tas-server installat fiha `optional-packs.index.json` (taħt `resources/app` fuq Windows u Linux). Għad-dħul `browser-runtime`, aqra `packs[].tarball` u niżżel** dak l-isem tal-fajl eżatt mill-istess rilaxx** . L-ismijiet tal-arkivji jinkludu SHA-256 digest; bini differenti jistgħu jeħtieġu arkivji differenti. Żomm l-isem tal-fajl imniżżel mhux mibdul.

Ikkopja l-indiċi tal-app installata u l-arkivju magħżul f'direttorju wieħed, imbagħad uża ż- CLI mill-istess rilaxx:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` juri l-istat tal-installazzjoni u l-verifika, mhux l-isem tal-fajl tal-arkivju. L-indiċi miġbura jagħżel l-arkivju. L-installazzjoni tivverifika s-checksum tal-arkivju tagħha qabel l-estrazzjoni u ċ-checksums tal-pakkett tagħha qabel tissostitwixxi pakkett installat. Huwa jaqra fajls lokali; ma tniżżel arkivji nieqsa. Ibda mill-ġdid l-applikazzjoni wara l-installazzjoni. Jekk ir-rilaxx ma jkollu l-ebda assi li jaqbel, il-pakkett fakultattiv mhux disponibbli permezz tal-assi ta' dak ir-rilaxx.

## Tqassim tad-Direttorju

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

Kemm `main.js` u `preload.js` huma**CommonJS `.js`** , mhux TypeScript. It-typings min-naħa tar-renderer jgħixu `electron/types.d.ts`.

## IPC Bridge (`preload.js`)

Il-preload jesponi API fil-lista bajda fuq `window.electronAPI` bl-użu ta' `contextBridge` `contextIsolation: true` u `nodeIntegration: false`.

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

Metodi esposti:

| Sejħa tar-renderer                                                | Tip                         |
| ----------------------------------------------------------------- | --------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | jinvokaw                    |
| `openExternal(url)`                                               | jinvokaw                    |
| `getDataDir()`                                                    | jinvokaw                    |
| `restartServer()`                                                 | jinvokaw                    |
| `getAppVersion()`                                                 | jinvokaw                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | jinvokaw                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | ibgħat                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | jirċievi (jirċievi ritorni) |

Il-helpers jirċievu jirritornaw a** funzjoni tad-disponitur** aktar milli tiddependi fuq `removeAllListeners` — dan jipprevjeni l-akkumulazzjoni tas-semmiegħa meta l-komponenti React jerġgħu jarmaw.

## Ċiklu tal-Ħajja tas-Server

`main.js` ikabbar il-pakkett Next.js standalone direttament mal-runtime Node Electron biex jevita nuqqas ta ABI tal-modulu nattiv man-Node tas-sistema:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Punti ewlenin:

- `waitForServer()` jeżamina l- URL sa 30 s qabel ma juri t-tieqa (l-ebda skrin vojt fuq startjar kiesaħ).
- `stdio: "pipe"` jaqbad stdout/stderr; frażijiet lesti (`Ready` / `listening`) jarmu `server-status: running` fuq IPC.
- `before-quit` jistenna sa 5 s għal SIGTERM graceful (WAL checkpoint ) imbagħad jibgħat SIGKILL.
- Port switcher fit-trej (`20128`, `3000`, `8080`) jieqaf u jerġa 'jibda s-server, imbagħad jerġa' jgħabbi l- BrowserWindow.

## Bootstrap Sigriet Zero-config

Fl-ewwel tnedija, il-proċess ewlieni jiġġenera awtomatikament u jippersisti sigrieti nieqsa:

| Sigriet                  | Sors                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (jirrifjuta jekk diġà jeżistu kreds kriptati) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                               |

Ippersistew biex `<DATA_DIR>/server.env`. `DATA_DIR` jirrisolvi:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` jew `~/.omniroute`
- macOS: `~/.omniroute`

## Tfittxija tal-fajl tal-ambjent

Qabel ma jbid is-server, il-proċess ewlieni (`getPreferredEnvFilePath()` `electron/main.js`) jagħżel** wieħed** `.env` file: l-ewwel wieħed minn dawn li jeżisti.

1. `$DATA_DIR/.env`, meta `DATA_DIR` ikun issettjat fl-ambjent l-app kienet imnedija bih.
2. `<resolved DATA_DIR>/.env`, billi tuża l-istess defaults bħal hawn fuq: `%APPDATA%\omniroute\.env` fuq Windows, `$XDG_CONFIG_HOME/omniroute/.env` jew `~/.omniroute/.env` fuq Linux u macOS.
3. `.env` fid-direttorju tax-xoghol tal-process.

Il-proċess ewlieni jaqra biss dak il-fajl; kandidati aktar tard ma jingħaqdux fihom. L-ambjent tas-server imbagħad jinbena b'din il-preċedenza (l-ogħla l-ewwel):

1. L-ambjent tal-proċess Electron (varjabbli li ntirtu minn dak kollu li nieda l-app).
2. Il-fajl `.env` magħżul.
3. `<DATA_DIR>/server.env` (is-sigrieti bootstrap hawn fuq).

L-ambjent tal-proċess jinqabad meta tibda l-app, għalhekk issettjat varjabbli tal-ambjent tas-sistema jew tal-utent waqt li l-app tkun qed taħdem (inkluż waqt li tpoġġi fit-trej wara li tingħalaq it-tieqa tagħha) ma tilħaqx is-server sakemm l-app tinqata’ kompletament u terġa’ titnieda. Għal pumi tar-runtime bħal `CONTEXT_LENGTH_<PROVIDER>` (ara [Varjabbli tal-Ambjent: Tul tal-kuntest għal kull fornitur](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), ippreferi l-fajl `.env`, imbagħad nieqaf għal kollox (trej,** Nieqaf** ) u tniedi mill-ġdid.

## Tieqa u Trej

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light at `{ x: 16, y: 16 }`.
- Windows/Linux: native title bar.
- Il-buttuna Agħlaq timminimizza għat-trej; il-menu trej għandu** Miftu OmniRoute** ,** Iftaħ Dashboard** (browser estern),** Port tas-Server** sottomenu,** Iċċekkja għal Aġġornamenti** ,** Nieqaf** .

## Politika ta' Sigurtà tal-Kontenut

Set via `session.defaultSession.webRequest.onHeadersReceived`. Direttivi notevoli:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Il-mod Dev iżid `'unsafe-eval'` ma' `script-src` biss

## Aġġornament awtomatiku

Juża `electron-updater` mal-fornitur GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Avvenimenti mibgħuta lil min jirrendu permezz ta' `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (with `percent`), `downloaded`, `error`
- `installUpdate()` joqtol is-server imbagħad isejjaħ `autoUpdater.quitAndInstall()`
- Qabeż fil-modalità dev (`!app.isPackaged`)

## Ibni Pipeline

1. `npm run build` → Next.js standalone in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → jerġa' jdaħħal `.next/electron-standalone` u jikteb mogħdijiet assoluti ġewwa `server.js` + `required-server-files.json` sabiex il-pakkett ikun rilokabbli.
3. `electron-builder` pakketti `main.js`, `preload.js`, `node_modules`, u `extraResources: { ../.next/electron-standalone → app }`.

### Ibni miri

| OS      | Miri                                      |
| ------- | ----------------------------------------- |
| Windows | NSIS installer + portabbli (x64)          |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS settings: `oneClick: false`, iħalli lill-utent jagħżel id-direttorju tal-installazzjoni, joħloq shortcuts tad-Desktop u tal-Menu tal-Ibda.

## Ittestjar tad-duħħan Ippakkjat Ibni

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Skopri awtomatikament il-binarju ppakkjat `electron/dist-electron/` għall-pjattaforma attwali.
- Tniedi b'direttorji iżolati `HOME`/`APPDATA`/`XDG_*` sabiex ma tmissx id-dejta tal-iżviluppatur.
- Polls `http://127.0.0.1:20128/login` għal HTTP 200 fi żmien 45 s.
- Arloġġi stderr/stdout għal mudelli fatali (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, eċċ.).
- Jistenna 2 s ta 'runtime stabbli wara li jkun lest, imbagħad joħroġ SIGTERM u jistenna li l-port jinħeles.
- CI, awtomatikament jgħaddi `--no-sandbox --disable-gpu` (u `--disable-dev-shm-usage` fuq Linux).

Env jegħleb: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Iffirmar tal-Kodiċi

`electron/package.json` ma** le** kredenzjali tal-iffirmar tal-wajer direttament. Għaddihom permezz ta' env vars għal `electron-builder`:

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

AppImage iffirmar huwa fakultattiv — sett `LINUX_GPG_KEY` jekk iffirmar.

## Distribuzzjoni

Artifacts art fi `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Ir-rilaxxi huma ppubblikati għal GitHub Releases (`diegosouzapw/OmniRoute`), li huwa wkoll fejn `electron-updater` jiċċekkja għal verżjonijiet ġodda.

## Issolvi l-problemi

| Sintomu                                                          | Waħħal                                                                                                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` wara Electron maġġuri bump | better-sqlite3 v13 ships Node-API prebuilds — re-run `npm install` fl-għerq u `prepare:bundle` (jivverifika l-prebuild għall-pjattaforma attwali) |
| `ERR_DLOPEN_FAILED` għal modulu nattiv                           | Erġa' ħaddem `prepare:bundle` — ifalli malajr meta n-Node-API prebuild għall-pjattaforma attwali tkun nieqsa                                      |
| Tieqa tidher vojta fuq Linux                                     | Ikkonferma Next.js server fil-fatt marbut ma PORT (iċċekkja `[Server]` logs)                                                                      |
| macOS stands notarization                                        | Żgura li vars `APPLE_*` jiġu esportati, mhux biss `.env`                                                                                          |
| Windows SmartScreen twissija                                     | Iffirma EV cert, jew l-utenti ikklikkja bil-lemin fuq → "Run anyway"                                                                              |
| It-test tad-duħħan ifalli bil-port-in-use                        | Waqqaf kwalunkwe dev server lokali fuq 20128 qabel ma tħaddem `electron:smoke:packaged`                                                           |

## Ara wkoll

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sors: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Helpers: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
