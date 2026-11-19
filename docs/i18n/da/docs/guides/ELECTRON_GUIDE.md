# Electron Desktop Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sandhedens kilde:** `electron/` arbejdsområde** Sidst opdateret:** 2026-06-28 — v3.8.40

OmniRoute sender en desktop-app på tværs af platforme (Windows / macOS / Linux) bygget på**Electron 41** +** elektronbygger 26.10** . Desktop-appen afføder Next.js standalone-serveren som en underordnet proces, peger en `BrowserWindow` på den og tilføjer en systembakke, auto-updater, IPC bridge og nul-config hemmelig bootstrap.

## Arkitektur

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

## Versioner

Bekræftet fra `electron/package.json`:

| Pakke              | Version                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                         |
| `electron-builder` | `^26.15.3`                                                        |
| `electron-updater` | `^6.8.9`                                                          |
| `better-sqlite3`   | root `^13.0.2` (Node-API præbuilds — ingen Electron genopbygning) |
| App version        | `3.8.0`                                                           |
| App-id             | `online.omniroute.desktop`                                        |
| Produktnavn        | `OmniRoute`                                                       |

## Scripts (root `package.json`)

| Manuskript                        | Formål                                                                      |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm run electron:dev`            | Starter `npm run dev` + venter på `localhost:20128` + starter Electron      |
| `npm run electron:build`          | Bygger Next.js og kører derefter `electron-builder` for den aktuelle OS     |
| `npm run electron:build:win`      | Bygger Windows NSIS installer + bærbar (x64)                                |
| `npm run electron:build:mac`      | Bygger macOS DMG (Intel + Apple Silicon)                                    |
| `npm run electron:build:linux`    | Bygger Linux AppImage + DEB (x64 + arm64)                                   |
| `npm run electron:smoke:packaged` | Starter pakket binær og prober `/login` til HTTP 200 og lukker derefter ned |

`electron/` arbejdsområdet afslører også:

- `npm run prepare:bundle` — kører `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS builds
- `npm run pack` — mappe-kun build til lokal test (ingen installationsprogram)

## Valgfri runtime-pakker

Desktop builds kan udgive valgfri runtime-arkiver sammen med deres installatører. Den installerede servernyttelast indeholder `optional-packs.index.json` (under `resources/app` på Windows og Linux). For `browser-runtime` -posten, læs `packs[].tarball` og download** det nøjagtige filnavn fra den samme udgivelse** . Arkivnavne inkluderer en SHA-256 digest; forskellige builds kan kræve forskellige arkiver. Hold det downloadede filnavn uændret.

Kopier den installerede apps indeks og det valgte arkiv til én mappe, og brug derefter CLI fra samme udgivelse:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` viser installations- og bekræftelsestilstand, ikke arkivfilnavnet. Det medfølgende indeks vælger arkivet. Installationen verificerer dens arkivkontrolsum før udtrækning og dens pakkekontrolsummer, før den erstatter en installeret pakke. Den læser lokale filer; den downloader ikke manglende arkiver. Genstart programmet efter installationen. Hvis udgivelsen ikke har noget matchende aktiv, er den valgfri pakke ikke tilgængelig gennem den pågældende udgivelses aktiver.

## Directory Layout

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

Både `main.js` og `preload.js` er**CommonJS `.js` filer** , ikke TypeScript. Indtastningerne på gengiversiden lever i `electron/types.d.ts`.

## IPC bro (`preload.js`)

Forudlæsningen afslører en hvidlistet API på `window.electronAPI` ved hjælp `contextBridge` med `contextIsolation: true` og `nodeIntegration: false`.

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

Udsatte metoder:

| Renderer opkald                                                   | Type                             |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | påberåbe sig                     |
| `openExternal(url)`                                               | påberåbe sig                     |
| `getDataDir()`                                                    | påberåbe sig                     |
| `restartServer()`                                                 | påberåbe sig                     |
| `getAppVersion()`                                                 | påberåbe sig                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | påberåbe sig                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | sende                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | modtage (returnerer bortskaffer) |

De modtagende hjælpere returnerer en** bortskaffelsesfunktion** i stedet for at stole på `removeAllListeners` — forhindrer dette lytterakkumulering, når React komponenter genmonteres.

## Server livscyklus

`main.js` afføder Next.js standalone-pakken direkte med Electron Node-runtime for at undgå native-modul ABI mismatch med system Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Højdepunkter:

- `waitForServer()` poller URL op til 30 s, før vinduet vises (ingen blank skærm ved koldstart).
- `stdio: "pipe"` fanger stdout/stderr; klar-sætninger (`Ready` / `listening`) udsender `server-status: running` over IPC.
- `before-quit` venter op til 5 s på yndefuld SIGTERM (WAL checkpoint) og sender derefter SIGKILL.
- Port switcher i bakken (`20128`, `3000`, `8080`) stopper og genstarter serveren og genindlæser derefter BrowserWindow.

## Zero-config Secret Bootstrap

Ved første lancering genererer hovedprocessen automatisk og fortsætter manglende hemmeligheder:

| Hemmelighed              | Kilde                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (afviser, hvis der allerede findes krypterede creds) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                      |

Vedblev til `<DATA_DIR>/server.env`. `DATA_DIR` løser til:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` eller `~/.omniroute`
- macOS: `~/.omniroute`

## Opslag i miljøfil

Inden serveren spawner, vælger hovedprocessen (`getPreferredEnvFilePath()` in `electron/main.js`).** en** `.env` -fil: den første af disse, der findes.

1. `$DATA_DIR/.env`, når `DATA_DIR` er indstillet i det miljø, appen blev lanceret med.
2. `<resolved DATA_DIR>/.env`, med de samme standardindstillinger som ovenfor: `%APPDATA%\omniroute\.env` på Windows, `$XDG_CONFIG_HOME/omniroute/.env` eller `~/.omniroute/.env` på Linux og macOS.
3. `.env` i processens arbejdsmappe.

Hovedprocessen læser kun den fil; senere kandidater flettes ikke ind. Servermiljøet bygges derefter med denne forrang (højest først):

1. Electron -procesmiljøet (variabler arvet fra det, der lancerede appen).
2. Den valgte `.env` fil.
3. `<DATA_DIR>/server.env` (bootstrap-hemmelighederne ovenfor).

Procesmiljøet fanges, når appen starter, så en system- eller brugermiljøvariabel, der er indstillet, mens appen kører (inklusive mens den sidder i bakken, efter dens vindue er lukket) ikke når serveren, før appen er helt afsluttet og genstartet. For runtime-knapper såsom `CONTEXT_LENGTH_<PROVIDER>` (se [Miljøvariabler: Per-udbyder kontekstlængde](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), foretræk `.env` filen, og luk derefter helt (bakke,** Forlade** ) og genstart.

## Vindue & Bakke

- `BrowserWindow`: 1400 × 900 (min. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, trafiklys ved `{ x: 16, y: 16 }`.
- Windows/Linux: indfødt titellinje.
- Luk-knap minimerer til bakke; bakkemenuen har** Åbn OmniRoute** ,** Åbn Dashboard** (ekstern browser),** Server port** undermenu,** Se efter opdateringer** ,** Forlade** .

## Indholdssikkerhedspolitik

Indstillet via `session.defaultSession.webRequest.onHeadersReceived`. Bemærkelsesværdige direktiver:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev-tilstand tilføjer kun `'unsafe-eval'` til `script-src`

## Automatisk opdatering

Bruger `electron-updater` med GitHub udbyderen (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Begivenheder videresendt til renderer via `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (med `percent`), `downloaded`, `error`
- `installUpdate()` dræber serveren og kalder derefter `autoUpdater.quitAndInstall()`
- Sprang over i udviklertilstand (`!app.isPackaged`)

## Byg rørledning

1. `npm run build` → Next.js selvstændig i `.next/standalone`.
2. `prepare-electron-standalone.mjs` → omfases til `.next/electron-standalone` og omskriver absolutte stier inde i `server.js` + `required-server-files.json`, så bundtet kan flyttes.
3. `electron-builder` -pakker `main.js`, `preload.js`, `node_modules` og `extraResources: { ../.next/electron-standalone → app }`.

### Byg mål

| OS      | Mål                                         |
| ------- | ------------------------------------------- |
| Windows | NSIS installer + bærbar (x64)               |
| macOS   | DMG (Intel + arm64, træk-til-applikationer) |
| Linux   | AppImage + DEB (x64 + arm64)                |

NSIS indstillinger: `oneClick: false`, lader brugeren vælge installationsmappen, opretter skrivebords- og startmenugenveje.

## Røgtestning pakket bygning

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Opdager automatisk den pakkede binære i `electron/dist-electron/` for den aktuelle platform.
- Starter med isolerede `HOME`/`APPDATA`/`XDG_*` mapper, så det ikke rører udviklerdata.
- Afstemninger `http://127.0.0.1:20128/login` for HTTP 200 inden for 45 s.
- Urer stderr/stdout for fatale mønstre (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` osv.).
- Venter 2 s stabil kørselstid efter klargøring, udsteder derefter SIGTERM og venter på, at porten bliver fri.
- I CI sender automatisk `--no-sandbox --disable-gpu` (og `--disable-dev-shm-usage` på Linux).

Env tilsidesætter: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodesignering

`electron/package.json` gør** ikke** wire signering legitimationsoplysninger direkte. Send dem via env vars til `electron-builder`:

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

AppImage -signering er valgfri — sæt `LINUX_GPG_KEY` hvis signering.

## Fordeling

Artefakter lander i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Udgivelser udgives til GitHub Releases (`diegosouzapw/OmniRoute`), som også er der, hvor `electron-updater` tjekker for nye versioner.

## Fejlfinding

| Symptom                                                          | Lave                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` efter Electron større bump | better-sqlite3 v13 sender node-API prebuilds — genkør `npm install` ved roden og `prepare:bundle` (det bekræfter prebuilden for den nuværende platform) |
| `ERR_DLOPEN_FAILED` for native modul                             | Kør `prepare:bundle` — igen, det fejler hurtigt, når Node-API-forudbygningen til den aktuelle platform mangler                                          |
| Vinduet vises tomt på Linux                                      | Bekræft, at Next.js serveren faktisk er bundet til PORT (tjek `[Server]` logfiler)                                                                      |
| macOS notarisering går i stå                                     | Sørg for, at `APPLE_*` vars eksporteres, ikke kun i `.env`                                                                                              |
| Windows SmartScreen advarsel                                     | Signer med EV cert, eller brugere højreklikker → "Kør alligevel"                                                                                        |
| Røgtest mislykkes med port-in-use                                | Stop enhver lokal dev-server på 20128, før du kører `electron:smoke:packaged`                                                                           |

## Se også

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Kilde: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hjælpere: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
