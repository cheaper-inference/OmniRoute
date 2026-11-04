# Electron Desktop Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Kilde til sannhet:** `electron/` arbeidsområde** Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute sender en skrivebordsapp på tvers av plattformer (Windows / macOS / Linux) bygget på**Electron 41** +** elektronbygger 26.10** . Desktop-appen skaper den frittstående Next.js serveren som en underordnet prosess, peker en `BrowserWindow` på den og legger til et systemstatusfelt, automatisk oppdatering, IPC -bro og en hemmelig bootstrap med null konfigurasjon.

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

## Versjoner

Bekreftet fra `electron/package.json`:

| Pakke              | Versjon                                                   |
| ------------------ | --------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                 |
| `electron-builder` | `^26.15.3`                                                |
| `electron-updater` | `^6.8.9`                                                  |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — no Electron rebuild) |
| Appversjon         | `3.8.0`                                                   |
| App-ID             | `online.omniroute.desktop`                                |
| Produktnavn        | `OmniRoute`                                               |

## Skript (root `package.json`)

| Manus                             | Hensikt                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Starter `npm run dev` + venter på `localhost:20128` + lanserer Electron        |
| `npm run electron:build`          | Bygger Next.js og kjører deretter `electron-builder` for gjeldende OS          |
| `npm run electron:build:win`      | Bygger Windows NSIS installer + bærbar (x64)                                   |
| `npm run electron:build:mac`      | Bygger macOS DMG (Intel + Apple Silicon)                                       |
| `npm run electron:build:linux`    | Bygger Linux AppImage + DEB (x64 + arm64)                                      |
| `npm run electron:smoke:packaged` | Lanserer pakket binær og prober `/login` for HTTP 200, og slår seg deretter av |

`electron/` -arbeidsområdet viser også:

- `npm run prepare:bundle` — kjører `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS bygger
- `npm run pack` — -katalogbygg for lokal testing (ingen installasjonsprogram)

## Valgfrie kjøretidspakker

Desktop-bygg kan publisere valgfrie kjøretidsarkiver sammen med installatørene. Den installerte servernyttelasten inneholder `optional-packs.index.json` (under `resources/app` på Windows og Linux). For `browser-runtime` -oppføringen, les `packs[].tarball` og last ned** det eksakte filnavnet fra samme utgivelse** . Arkivnavn inkluderer en SHA-256 sammendrag; forskjellige bygg kan kreve forskjellige arkiver. Hold det nedlastede filnavnet uendret.

Kopier den installerte appens indeks og det valgte arkivet til én katalog, og bruk deretter CLI fra samme utgivelse:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` viser installasjons- og bekreftelsesstatus, ikke arkivfilnavnet. Den medfølgende indeksen velger arkivet. Installasjonen verifiserer arkivsjekksummen før utvinning og pakkesjekksummen før den erstatter en installert pakke. Den leser lokale filer; den laster ikke ned manglende arkiver. Start programmet på nytt etter installasjonen. Hvis utgivelsen ikke har noen samsvarende aktiva, er den valgfrie pakken ikke tilgjengelig gjennom den utgivelsens aktiva.

## Katalogoppsett

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

Både `main.js` og `preload.js` er det**CommonJS `.js` filer** , ikke TypeScript. Skrivingene på gjengivelsessiden lever i `electron/types.d.ts`.

## IPC Bridge (`preload.js`)

Forhåndsinnlastingen avslører en hvitlistet API på `window.electronAPI` ved å bruke `contextBridge` med `contextIsolation: true` og `nodeIntegration: false`.

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

Eksponerte metoder:

| Gjengiveranrop                                                    | Type                        |
| ----------------------------------------------------------------- | --------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | påkalle                     |
| `openExternal(url)`                                               | påkalle                     |
| `getDataDir()`                                                    | påkalle                     |
| `restartServer()`                                                 | påkalle                     |
| `getAppVersion()`                                                 | påkalle                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | påkalle                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | sende                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | motta (returnerer disponer) |

Mottakshjelperne returnerer en** disponer funksjon** i stedet for å stole på `removeAllListeners` — forhindrer dette lytterakkumulering når React komponenter monteres på nytt.

## Server livssyklus

`main.js` skaper den frittstående Next.js pakken direkte med Electron Node-kjøretiden for å unngå native-modul ABI mismatch med systemnode:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Høydepunkter:

- `waitForServer()` poller URL opptil 30 s før vinduet vises (ingen blank skjerm ved kaldstart).
- `stdio: "pipe"` fanger opp stdout/stderr; klare fraser (`Ready` / `listening`) sender ut `server-status: running` over IPC.
- `before-quit` venter opptil 5 s på grasiøs SIGTERM (WAL sjekkpunkt) og sender deretter SIGKILL.
- Portbytteren i skuffen (`20128`, `3000`, `8080`) stopper og starter serveren på nytt, og laster deretter BrowserWindow på nytt.

## Null-konfigurasjon hemmelig bootstrap

Ved første lansering genererer hovedprosessen automatisk og vedvarer manglende hemmeligheter:

| Hemmelig                 | Kilde                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (avslår hvis krypterte creds allerede eksisterer) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                   |

Vedvarte å `<DATA_DIR>/server.env`. `DATA_DIR` løser seg til:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` eller `~/.omniroute`
- macOS: `~/.omniroute`

## Oppslag i miljøfil

Før gyting av serveren, velger hovedprosessen (`getPreferredEnvFilePath()` in `electron/main.js`).** en** `.env` -fil: den første av disse som finnes.

1. `$DATA_DIR/.env`, når `DATA_DIR` er satt i miljøet appen ble lansert med.
2. `<resolved DATA_DIR>/.env`, med de samme standardinnstillingene som ovenfor: `%APPDATA%\omniroute\.env` på Windows, `$XDG_CONFIG_HOME/omniroute/.env` eller `~/.omniroute/.env` på Linux og macOS.
3. `.env` i prosessens arbeidskatalog.

Hovedprosessen leser bare den filen; senere kandidater slås ikke sammen. Servermiljøet bygges da med denne prioritet (høyest først):

1. Electron -prosessmiljøet (variabler arvet fra det som lanserte appen).
2. Den valgte `.env` filen.
3. `<DATA_DIR>/server.env` (bootstrap-hemmelighetene ovenfor).

Prosessmiljøet fanges opp når appen starter, så en system- eller brukermiljøvariabel satt mens appen kjører (inkludert mens den ligger i skuffen etter at vinduet er lukket) når ikke serveren før appen er fullstendig avsluttet og relansert. For kjøretidsknapper som `CONTEXT_LENGTH_<PROVIDER>` (se [Miljøvariabler: Per-leverandør kontekstlengde](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), foretrekk `.env` filen, og avslutt deretter helt (skuff,** Slutte** ) og relansere.

## Vindu og brett

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, trafikklys ved `{ x: 16, y: 16 }`.
- Windows/Linux: opprinnelig tittellinje.
- Lukk-knappen minimerer til skuffen; brettmenyen har** Åpne OmniRoute** ,** Åpne Dashboard** (ekstern nettleser),** Serverport** undermeny,** Se etter oppdateringer** ,** Slutte** .

## Innholdssikkerhetspolicy

Sett via `session.defaultSession.webRequest.onHeadersReceived`. Viktige direktiver:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev-modus legger kun til `'unsafe-eval'` til `script-src`

## Automatisk oppdatering

Bruker `electron-updater` med GitHub leverandøren (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Hendelser videresendt til gjengiver via `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (med `percent`), `downloaded`, `error`
- `installUpdate()` dreper serveren og kaller deretter `autoUpdater.quitAndInstall()`
- Hoppet over i utviklermodus (`!app.isPackaged`)

## Bygg rørledning

1. `npm run build` → Next.js frittstående i `.next/standalone`.
2. `prepare-electron-standalone.mjs` → re-stadier til `.next/electron-standalone` og omskriver absolutte baner inne i `server.js` + `required-server-files.json` slik at bunten kan flyttes.
3. `electron-builder` -pakker `main.js`, `preload.js`, `node_modules` og `extraResources: { ../.next/electron-standalone → app }`.

### Bygg mål

| OS      | Mål                                        |
| ------- | ------------------------------------------ |
| Windows | NSIS installer + bærbar (x64)              |
| macOS   | DMG (Intel + arm64, dra-til-applikasjoner) |
| Linux   | AppImage + DEB (x64 + arm64)               |

NSIS innstillinger: `oneClick: false`, lar brukeren velge installasjonsmappen, oppretter skrivebords- og startmeny-snarveier.

## Røyktesting pakket konstruksjon

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Oppdager automatisk den pakkede binære filen i `electron/dist-electron/` for gjeldende plattform.
- Lanserer med isolerte `HOME`/`APPDATA`/`XDG_*` -kataloger slik at den ikke berører utviklerdata.
- Avstemninger `http://127.0.0.1:20128/login` for HTTP 200 innen 45 s.
- Klokker stderr/stdout for fatale mønstre (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Venter 2 s med stabil kjøretid etter klargjøring, sender deretter SIGTERM og venter på at porten skal frigjøres.
- I CI sender automatisk `--no-sandbox --disable-gpu` (og `--disable-dev-shm-usage` på Linux).

Env overstyrer: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodesignering

`electron/package.json` gjør det** ikke** wire signering legitimasjon direkte. Send dem via env vars til `electron-builder`:

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

AppImage -signering er valgfritt — sett `LINUX_GPG_KEY` hvis signering.

## Distribusjon

Artefakter lander i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Utgivelser publiseres til GitHub Releases (`diegosouzapw/OmniRoute`), som også er der `electron-updater` sjekker for nye versjoner.

## Feilsøking

| Symptom                                                         | Fastsette                                                                                                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` etter Electron major bump | better-sqlite3 v13 sender Node-API prebuilds — kjører `npm install` på nytt ved roten og `prepare:bundle` (den bekrefter prebuilden for gjeldende plattform) |
| `ERR_DLOPEN_FAILED` for innfødt modul                           | Kjør `prepare:bundle` — på nytt det mislykkes raskt når Node-API-prebuilden for gjeldende plattform mangler                                                  |
| Vinduet vises tomt på Linux                                     | Bekreft at Next.js serveren faktisk er bundet til PORT (sjekk `[Server]` loggene)                                                                            |
| macOS notarisering stopper                                      | Sørg for at `APPLE_*` vars eksporteres, ikke bare i `.env`                                                                                                   |
| Windows SmartScreen advarsel                                    | Signer med EV cert, eller brukere høyreklikker → "Kjør likevel"                                                                                              |
| Røyktest mislykkes med port i bruk                              | Stopp enhver lokal dev-server på 20128 før du kjører `electron:smoke:packaged`                                                                               |

## Se også

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Kilde: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hjelpere: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
