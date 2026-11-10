# Electron Desktop Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Bron van waarheid:** `electron/` werkruimte** Laatst bijgewerkt:** 28-06-2026 — v3.8.40

OmniRoute levert een platformonafhankelijke desktop-app (Windows / macOS / Linux) waarop is gebouwd**Electron 41** +** elektronenbouwer 26.10** . De desktop-app brengt de Next.js standalone server voort als een onderliggend proces, wijst er een `BrowserWindow` naar toe en voegt een systeemvak, auto-updater, IPC bridge en zero-config geheime bootstrap toe.

## Architectuur

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

## Versies

Bevestigd door `electron/package.json`:

| Pakket             | Versie                                                      |
| ------------------ | ----------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                   |
| `electron-builder` | `^26.15.3`                                                  |
| `electron-updater` | `^6.8.9`                                                    |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — geen Electron rebuild) |
| App-versie         | `3.8.0`                                                     |
| App-ID             | `online.omniroute.desktop`                                  |
| Productnaam        | `OmniRoute`                                                 |

## Scripts (root `package.json`)

| Script                            | Doel                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Start `npm run dev` + wacht op `localhost:20128` + start Electron                                 |
| `npm run electron:build`          | Bouwt Next.js en voert vervolgens `electron-builder` uit voor de huidige OS                       |
| `npm run electron:build:win`      | Bouwt Windows NSIS installer + portable (x64)                                                     |
| `npm run electron:build:mac`      | Bouwt macOS DMG (Intel + Apple Silicon)                                                           |
| `npm run electron:build:linux`    | Bouwt Linux AppImage + DEB (x64 + arm64)                                                          |
| `npm run electron:smoke:packaged` | Start verpakt binair bestand en onderzoekt `/login` naar HTTP 200, en wordt vervolgens afgesloten |

De `electron/` werkruimte legt ook bloot:

- `npm run prepare:bundle` — voert `scripts/build/prepare-electron-standalone.mjs` uit
- `npm run build:mac-x64` / `build:mac-arm64` — macOS -builds met één boog
- `npm run pack` — alleen-directory-build voor lokaal testen (geen installatieprogramma)

## Optionele runtime-pakketten

Desktopbuilds kunnen naast hun installatieprogramma's optionele runtime-archieven publiceren. De geïnstalleerde serverpayload bevat `optional-packs.index.json` (onder `resources/app` op Windows en Linux). Voor het `browser-runtime` item leest u `packs[].tarball` en downloadt u het** die exacte bestandsnaam uit dezelfde release** . Archiefnamen bevatten een SHA-256 samenvatting; Voor verschillende builds kunnen verschillende archieven nodig zijn. Houd de gedownloade bestandsnaam ongewijzigd.

Kopieer de index van de geïnstalleerde app en het geselecteerde archief naar één map en gebruik vervolgens de CLI uit dezelfde release:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` geeft de installatie- en verificatiestatus weer, niet de archiefbestandsnaam. De gebundelde index selecteert het archief. De installatie verifieert de archiefcontrolesom vóór het uitpakken en de pakketcontrolesommen voordat een geïnstalleerd pakket wordt vervangen. Het leest lokale bestanden; het downloadt geen ontbrekende archieven. Start de applicatie opnieuw op na de installatie. Als de release geen overeenkomend item bevat, is het optionele pakket niet beschikbaar via de items van die release.

## Directory-indeling

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

Zowel `main.js` als `preload.js` zijn dat**CommonJS `.js` bestanden** , niet TypeScript. De typingen aan de rendererzijde leven in `electron/types.d.ts`.

## IPC -brug (`preload.js`)

De preload stelt een API op de witte lijst bloot op `window.electronAPI` met behulp `contextBridge` met `contextIsolation: true` en `nodeIntegration: false`.

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

Blootgestelde methoden:

| Renderer-oproep                                                   | Type                              |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | aanroepen                         |
| `openExternal(url)`                                               | aanroepen                         |
| `getDataDir()`                                                    | aanroepen                         |
| `restartServer()`                                                 | aanroepen                         |
| `getAppVersion()`                                                 | aanroepen                         |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | aanroepen                         |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | versturen                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | ontvangen (retourneert ontdoener) |

De ontvangsthelpers retourneren a** ontdoener functie** in plaats van te vertrouwen op `removeAllListeners` — voorkomt dit accumulatie van luisteraars wanneer React componenten opnieuw worden gekoppeld.

## Serverlevenscyclus

`main.js` spawns the Next.js standalone bundle directly with the Electron Node runtime to avoid native-module ABI mismatch with system Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Hoogtepunten:

- `waitForServer()` ondervraagt de URL tot 30 seconden voordat het venster wordt weergegeven (geen leeg scherm bij koude start).
- `stdio: "pipe"` legt stdout/stderr; kant-en-klare zinnen (`Ready` / `listening`) zenden `server-status: running` uit over IPC.
- `before-quit` wacht maximaal 5 seconden op sierlijke SIGTERM (WAL controlepunt) en verzendt vervolgens SIGKILL.
- Poortschakelaar in de lade (`20128`, `3000`, `8080`) stopt en start de server opnieuw op, en laadt vervolgens de BrowserWindow opnieuw.

## Zero-config geheime bootstrap

Bij de eerste keer opstarten genereert het hoofdproces automatisch ontbrekende geheimen en bewaart deze:

| Geheim                   | Bron                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (weigert als er al gecodeerde creds bestaan) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                              |

Volhardde in `<DATA_DIR>/server.env`. `DATA_DIR` besluit om:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` of `~/.omniroute`
- macOS: `~/.omniroute`

## Omgevingsbestand opzoeken

Voordat de server wordt uitgezet, kiest het hoofdproces (`getPreferredEnvFilePath()` in `electron/main.js`).** een** `.env` bestand: de eerste die bestaat.

1. `$DATA_DIR/.env`, wanneer `DATA_DIR` is ingesteld in de omgeving waarmee de app is gestart.
2. `<resolved DATA_DIR>/.env`, met dezelfde standaardwaarden als hierboven: `%APPDATA%\omniroute\.env` op Windows, `$XDG_CONFIG_HOME/omniroute/.env` of `~/.omniroute/.env` op Linux en macOS.
3. `.env` in de proceswerkmap.

Het hoofdproces leest alleen dat bestand; latere kandidaten worden niet samengevoegd. De serveromgeving wordt dan gebouwd met deze prioriteit (hoogste eerst):

1. De Electron -procesomgeving (variabelen overgenomen van wat de app ook heeft gelanceerd).
2. Het geselecteerde `.env` bestand.
3. `<DATA_DIR>/server.env` (de bootstrap-geheimen hierboven).

De procesomgeving wordt vastgelegd wanneer de app start, zodat een systeem- of gebruikersomgevingsvariabele die is ingesteld terwijl de app actief is (ook terwijl deze in de lade zit nadat het venster is gesloten) de server pas bereikt als de app volledig is afgesloten en opnieuw is gestart. Voor runtime-knoppen zoals `CONTEXT_LENGTH_<PROVIDER>` (zie [Omgevingsvariabelen: Contextlengte per provider](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), geeft u de voorkeur aan het `.env` bestand en sluit u vervolgens volledig af (tray,** Ontslag nemen** ) en opnieuw starten.

## Venster en dienblad

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, stoplicht bij `{ x: 16, y: 16 }`.
- Windows/Linux: native titelbalk.
- Knop Sluiten minimaliseert naar lade; het lademenu heeft** Open OmniRoute** ,** Dashboard openen** (externe browser),** Serverpoort** submenu,** Controleer op updates** ,** Ontslag nemen** .

## Inhoudsbeveiligingsbeleid

Instellen via `session.defaultSession.webRequest.onHeadersReceived`. Opmerkelijke richtlijnen:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev-modus voegt alleen `'unsafe-eval'` toe aan `script-src`

## Automatische update

Gebruikt `electron-updater` met de GitHub provider (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Gebeurtenissen doorgestuurd naar renderer via `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (met `percent`), `downloaded`, `error`
- `installUpdate()` doodt de server en roept vervolgens `autoUpdater.quitAndInstall()` aan
- Overgeslagen in ontwikkelaarsmodus (`!app.isPackaged`)

## Pijpleiding bouwen

1. `npm run build` → Next.js zelfstandig in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → wordt opnieuw geënsceneerd in `.next/electron-standalone` en herschrijft absolute paden binnen `server.js` + `required-server-files.json`, zodat de bundel verplaatsbaar is.
3. `electron-builder` -pakketten `main.js`, `preload.js`, `node_modules` en `extraResources: { ../.next/electron-standalone → app }`.

### Doelen bouwen

| OS      | Doelstellingen                               |
| ------- | -------------------------------------------- |
| Windows | NSIS -installatieprogramma + draagbaar (x64) |
| macOS   | DMG (Intel + arm64, drag-to-applicaties)     |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS instellingen: `oneClick: false`, laat de gebruiker de installatiemap kiezen, maakt snelkoppelingen naar het bureaublad en het Startmenu.

## Rooktest verpakte build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Ontdekt automatisch het verpakte binaire bestand in `electron/dist-electron/` voor het huidige platform.
- Start met geïsoleerde `HOME`/`APPDATA`/`XDG_*` -mappen, zodat de ontwikkelaarsgegevens niet worden beïnvloed.
- Opiniepeilingen `http://127.0.0.1:20128/login` voor HTTP 200 binnen 45 s.
- Houdt stderr/stdout in de gaten voor fatale patronen (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Wacht 2 seconden stabiele runtime nadat deze gereed is, geeft vervolgens SIGTERM uit en wacht tot de poort vrij is.
- In CI wordt `--no-sandbox --disable-gpu` automatisch doorgegeven (en `--disable-dev-shm-usage` op Linux).

Env overschrijft: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Code-ondertekening

`electron/package.json` wel** niet** ondertekeningsreferenties rechtstreeks over te maken. Geef ze door via env vars naar `electron-builder`:

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

AppImage -ondertekening is optioneel. — stel `LINUX_GPG_KEY` in bij ondertekening.

## Verdeling

Artefacten landen in `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Releases worden gepubliceerd naar GitHub Releases (`diegosouzapw/OmniRoute`), waar `electron-updater` ook controleert op nieuwe versies.

## Problemen oplossen

| Symptoom                                                       | Repareren                                                                                                                                                            |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` na Electron grote hobbel | better-sqlite3 v13 levert Node-API prebuilds — voert `npm install` opnieuw uit in de root en `prepare:bundle` (het verifieert de prebuild voor het huidige platform) |
| `ERR_DLOPEN_FAILED` voor native module                         | Voer `prepare:bundle` — opnieuw uit. Het mislukt snel wanneer de Node-API-prebuild voor het huidige platform ontbreekt                                               |
| Venster lijkt leeg op Linux                                    | Bevestig dat Next.js server daadwerkelijk is gebonden aan PORT (controleer `[Server]` logboeken)                                                                     |
| macOS notarisatie kraampjes                                    | Zorg ervoor dat `APPLE_*` vars worden geëxporteerd, niet alleen in `.env`                                                                                            |
| Windows SmartScreen waarschuwing                               | Onderteken met EV cert, of gebruikers klikken met de rechtermuisknop op → "Toch uitvoeren"                                                                           |
| Rooktest mislukt met poort in gebruik                          | Stop elke lokale ontwikkelserver op 20128 voordat u `electron:smoke:packaged` uitvoert                                                                               |

## Zie ook

- [SETUP_GUIDE](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- Bron: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Helpers: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
