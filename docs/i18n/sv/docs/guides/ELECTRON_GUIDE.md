# Electron Desktop Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sanningens källa:** `electron/` arbetsyta** Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute levererar en plattformsoberoende skrivbordsapp (Windows / macOS / Linux) byggd på**Electron 41** +** elektronbyggare 26.10** . Desktop-appen skapar den fristående Next.js servern som en underordnad process, pekar en `BrowserWindow` på den och lägger till ett systemfält, automatisk uppdatering, IPC brygga och noll-config hemlig bootstrap.

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

Bekräftat från `electron/package.json`:

| Paket              | Version                                                      |
| ------------------ | ------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                    |
| `electron-builder` | `^26.15.3`                                                   |
| `electron-updater` | `^6.8.9`                                                     |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — ingen Electron rebuild) |
| Appversion         | `3.8.0`                                                      |
| App-id             | `online.omniroute.desktop`                                   |
| Produktnamn        | `OmniRoute`                                                  |

## Skript (root `package.json`)

| Manus                             | Ändamål                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Startar `npm run dev` + väntar på `localhost:20128` + lanserar Electron        |
| `npm run electron:build`          | Bygger Next.js och kör sedan `electron-builder` för nuvarande OS               |
| `npm run electron:build:win`      | Bygger Windows NSIS installer + portable (x64)                                 |
| `npm run electron:build:mac`      | Bygger macOS DMG (Intel + Apple Silicon)                                       |
| `npm run electron:build:linux`    | Bygger Linux AppImage + DEB (x64 + arm64)                                      |
| `npm run electron:smoke:packaged` | Startar paketerad binär och sonderar `/login` för HTTP 200 och stängs sedan av |

`electron/` arbetsytan avslöjar också:

- `npm run prepare:bundle` — kör `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — enkelbåge macOS bygger
- `npm run pack` — -katalogbyggd endast för lokal testning (ingen installationsprogram)

## Valfria runtime-paket

Skrivbordsbyggen kan publicera valfria körtidsarkiv tillsammans med sina installatörer. Den installerade serverns nyttolast innehåller `optional-packs.index.json` (under `resources/app` på Windows och Linux). För `browser-runtime` -posten, läs `packs[].tarball` och ladda ner** det exakta filnamnet från samma version** . Arkivnamn inkluderar ett SHA-256 sammandrag; olika byggnader kan kräva olika arkiv. Behåll det nedladdade filnamnet oförändrat.

Kopiera den installerade appens index och det valda arkivet till en katalog och använd sedan CLI från samma version:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` visar installations- och verifieringsstatus, inte arkivfilnamnet. Det medföljande indexet väljer arkivet. Installationen verifierar dess arkivkontrollsumma innan extrahering och dess paketkontrollsummor innan ett installerat paket ersätts. Den läser lokala filer; den laddar inte ner saknade arkiv. Starta om programmet efter installationen. Om releasen inte har någon matchande tillgång är det valfria paketet inte tillgängligt via den releasens tillgångar.

## Kataloglayout

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

Både `main.js` och `preload.js` är det**CommonJS `.js` filer** , inte TypeScript. Skrivningarna på renderarsidan lever i `electron/types.d.ts`.

## IPC Bridge (`preload.js`)

Förladdningen exponerar en vitlistad API på `window.electronAPI` med `contextBridge` med `contextIsolation: true` och `nodeIntegration: false`.

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

Exponerade metoder:

| Renderaren ringer                                                 | Typ                             |
| ----------------------------------------------------------------- | ------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | åberopa                         |
| `openExternal(url)`                                               | åberopa                         |
| `getDataDir()`                                                    | åberopa                         |
| `restartServer()`                                                 | åberopa                         |
| `getAppVersion()`                                                 | åberopa                         |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | åberopa                         |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | skicka                          |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | ta emot (återlämnar disponibla) |

De mottagande medhjälparna returnerar en** avfallshanteringsfunktion** snarare än att förlita sig på `removeAllListeners` — förhindrar detta lyssnarackumulering när React -komponenter återmonteras.

## Serverlivscykel

`main.js` skapar det fristående Next.js paketet direkt med Electron nodens körtid för att undvika att den inbyggda modulen ABI inte matchar systemnoden:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Höjdpunkter:

- `waitForServer()` pollar URL upp till 30 s innan fönstret visar (ingen tom skärm vid kallstart).
- `stdio: "pipe"` fångar stdout/stderr; färdiga fraser (`Ready` / `listening`) avger `server-status: running` över IPC.
- `before-quit` väntar upp till 5 s på graciösa SIGTERM (WAL checkpoint) och skickar sedan SIGKILL.
- Portbytaren i facket (`20128`, `3000`, `8080`) stoppar och startar om servern och laddar sedan om BrowserWindow.

## Zero-config Secret Bootstrap

Vid första lanseringen genererar huvudprocessen automatiskt och kvarstår saknade hemligheter:

| Hemlighet                | Källa                                                                             |
| ------------------------ | --------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                          |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (vägrar om krypterade creds redan finns) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                          |

Fortsatte till `<DATA_DIR>/server.env`. `DATA_DIR` löser sig till:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` eller `~/.omniroute`
- macOS: `~/.omniroute`

## Sökning av miljöfil

Innan servern skapas väljer huvudprocessen (`getPreferredEnvFilePath()` in `electron/main.js`).** en** `.env` -fil: den första av dessa som finns.

1. `$DATA_DIR/.env`, när `DATA_DIR` är inställt i miljön som appen lanserades med.
2. `<resolved DATA_DIR>/.env`, med samma standardinställningar som ovan: `%APPDATA%\omniroute\.env` på Windows, `$XDG_CONFIG_HOME/omniroute/.env` eller `~/.omniroute/.env` på Linux och macOS.
3. `.env` i processens arbetskatalog.

Huvudprocessen läser endast den filen; senare kandidater slås inte ihop. Servermiljön byggs sedan med denna prioritet (högst först):

1. Electron -processmiljön (variabler ärvda från vad som än startade appen).
2. Den valda `.env` filen.
3. `<DATA_DIR>/server.env` (bootstrap-hemligheterna ovan).

Processmiljön fångas när appen startar, så en system- eller användarmiljövariabel som ställs in medan appen körs (inklusive när den sitter i facket efter att dess fönster stängts) når inte servern förrän appen är helt avslutad och omstartad. För körtidsrattar som `CONTEXT_LENGTH_<PROVIDER>` (se [Miljövariabler: Kontextlängd per leverantör](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), föredrar du `.env` filen och avslutar sedan helt (fack,** Sluta** ) och starta om.

## Fönster & bricka

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, trafikljus vid `{ x: 16, y: 16 }`.
- Windows/Linux: inbyggt titelfält.
- Stäng-knappen minimerar till facket; fackmenyn har** Öppna OmniRoute** ,** Öppna Dashboard** (extern webbläsare),** Serverport** undermeny,** Sök efter uppdateringar** ,** Sluta** .

## Innehållssäkerhetspolicy

Ställ in via `session.defaultSession.webRequest.onHeadersReceived`. Anmärkningsvärda direktiv:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev-läget lägger endast till `'unsafe-eval'` till `script-src`

## Automatisk uppdatering

Använder `electron-updater` med GitHub leverantören (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Händelser som vidarebefordras till renderaren via `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (med `percent`), `downloaded`, `error`
- `installUpdate()` dödar servern och anropar sedan `autoUpdater.quitAndInstall()`
- Hoppade över i utvecklarläge (`!app.isPackaged`)

## Bygg pipeline

1. `npm run build` → Next.js fristående i `.next/standalone`.
2. `prepare-electron-standalone.mjs` → stegar om till `.next/electron-standalone` och skriver om absoluta banor inuti `server.js` + `required-server-files.json` så att bunten kan flyttas.
3. `electron-builder` paketen `main.js`, `preload.js`, `node_modules` och `extraResources: { ../.next/electron-standalone → app }`.

### Bygg mål

| OS      | Mål                                         |
| ------- | ------------------------------------------- |
| Windows | NSIS installer + portable (x64)             |
| macOS   | DMG (Intel + arm64, dra-till-applikationer) |
| Linux   | AppImage + DEB (x64 + arm64)                |

NSIS inställningar: `oneClick: false`, låter användaren välja installationskatalogen, skapar genvägar på skrivbordet och startmenyn.

## Röktestning förpackad konstruktion

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Upptäcker automatiskt den paketerade binära filen i `electron/dist-electron/` för den aktuella plattformen.
- Startar med isolerade `HOME`/`APPDATA`/`XDG_*` -kataloger så att det inte rör utvecklardata.
- Omröstningar `http://127.0.0.1:20128/login` för HTTP 200 inom 45 s.
- Klockor stderr/stdout för dödliga mönster (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Väntar 2 s stabil körtid efter beredskap, utfärdar sedan SIGTERM och väntar på att porten ska frigöras.
- I CI skickar automatiskt `--no-sandbox --disable-gpu` (och `--disable-dev-shm-usage` på Linux).

Env åsidosätter: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodsignering

`electron/package.json` gör det** inte** skicka inloggningsuppgifter direkt. Skicka dem via env vars till `electron-builder`:

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

AppImage signering är valfri — set `LINUX_GPG_KEY` om signering.

## Distribution

Artefakter landar i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Releases publiceras till GitHub Releases (`diegosouzapw/OmniRoute`), vilket också är där `electron-updater` letar efter nya versioner.

## Felsökning

| Symptom                                                         | Fixera                                                                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` efter Electron major bump | better-sqlite3 v13 skickar Node-API-förbyggen — kör om `npm install` vid roten och `prepare:bundle` (den verifierar prebuilden för den aktuella plattformen) |
| `ERR_DLOPEN_FAILED` för inbyggd modul                           | Kör `prepare:bundle` — igen det misslyckas snabbt när Node-API-förbygget för den aktuella plattformen saknas                                                 |
| Fönstret visas tomt på Linux                                    | Bekräfta att Next.js servern faktiskt är bunden till PORT (kontrollera `[Server]` loggarna)                                                                  |
| macOS notarisering stannar                                      | Se till att `APPLE_*` vars exporteras, inte bara i `.env`                                                                                                    |
| Windows SmartScreen varning                                     | Signera med EV cert, eller användare högerklickar → "Kör ändå"                                                                                               |
| Röktest misslyckas med port-in-use                              | Stoppa någon lokal dev-server på 20128 innan du kör `electron:smoke:packaged`                                                                                |

## Se även

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Källa: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hjälpare: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
