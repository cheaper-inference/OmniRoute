# Electron Desktop Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Patiesības avots:** `electron/` darbvieta** Pēdējo reizi atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute piegādā vairāku platformu darbvirsmas lietotni (Windows / macOS / Linux), kas balstīta uz**Electron 41** +** elektronu veidotājs 26.10** . Darbvirsmas lietotne izveido Next.js savrupo serveri kā bērnu procesu, norāda uz to `BrowserWindow` un pievieno sistēmas tekni, automātisko atjauninātāju, IPC tiltu un nulles konfigurācijas slepeno sāknēšanas programmu.

## Arhitektūra

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

## Versijas

Apstiprināts no `electron/package.json`:

| Iepakojums         | Versija                                                        |
| ------------------ | -------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                      |
| `electron-builder` | `^26.15.3`                                                     |
| `electron-updater` | `^6.8.9`                                                       |
| `better-sqlite3`   | saknes `^13.0.2` (Node-API priekšbūvē — bez Electron pārbūves) |
| Lietotnes versija  | `3.8.0`                                                        |
| Lietotnes id       | `online.omniroute.desktop`                                     |
| Produkta nosaukums | `OmniRoute`                                                    |

## Skripti (root `package.json`)

| Skripts                           | Mērķis                                                                     |
| --------------------------------- | -------------------------------------------------------------------------- |
| `npm run electron:dev`            | Sāk `npm run dev` + gaida `localhost:20128` + palaiž Electron              |
| `npm run electron:build`          | Veido Next.js pēc tam palaiž `electron-builder` pašreizējam OS             |
| `npm run electron:build:win`      | Veido Windows NSIS instalētāju + portable (x64)                            |
| `npm run electron:build:mac`      | Veido macOS DMG (Intel + Apple Silicon)                                    |
| `npm run electron:build:linux`    | Veido Linux AppImage + DEB (x64 + arm64)                                   |
| `npm run electron:smoke:packaged` | Palaiž iepakotu bināro failu un zondē `/login` HTTP 200, pēc tam izslēdzas |

`electron/` darbvietā ir arī redzams:

- `npm run prepare:bundle` — palaiž `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — vienas arkas macOS būves
- `npm run pack` — tikai direktoriju būvējums vietējai testēšanai (nav instalētāja)

## Izvēles izpildlaika pakotnes

Darbvirsmas versijas var publicēt papildu izpildlaika arhīvus kopā ar instalētājiem. Instalētā servera slodze satur `optional-packs.index.json` (zem `resources/app` uz Windows un Linux). Lai iegūtu `browser-runtime` ierakstu, izlasiet `packs[].tarball` un lejupielādējiet** precīzs faila nosaukums no tā paša laidiena** . Arhīvu nosaukumos ir iekļauts SHA-256 īssavilkums; dažādām būvēm var būt nepieciešami dažādi arhīvi. Saglabājiet lejupielādētā faila nosaukumu nemainīgu.

Kopējiet instalētās lietotnes indeksu un atlasīto arhīvu vienā direktorijā, pēc tam izmantojiet CLI no tā paša laidiena:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` parāda instalēšanas un verifikācijas stāvokli, nevis arhīva faila nosaukumu. Komplektētais rādītājs atlasa arhīvu. Instalēšana pārbauda arhīva kontrolsummu pirms izvilkšanas un pakotnes kontrolsummu pirms instalētās pakotnes nomaiņas. Tas nolasa vietējos failus; tas nelejupielādē trūkstošos arhīvus. Pēc instalēšanas restartējiet lietojumprogrammu. Ja laidienam nav atbilstoša īpašuma, izvēles pakotne nav pieejama, izmantojot šī laidiena līdzekļus.

## Direktorija izkārtojums

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

Gan `main.js`, gan `preload.js` ir**CommonJS `.js` faili** , nevis TypeScript. Renderētāja puses ieraksti ir `electron/types.d.ts` formātā.

## IPC tilts (`preload.js`)

Iepriekšēja ielāde parāda baltajā sarakstā iekļauto API `window.electronAPI`, izmantojot `contextBridge` ar `contextIsolation: true` un `nodeIntegration: false`.

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

Atklātās metodes:

| Renderētāja izsaukums                                             | Tips                                  |
| ----------------------------------------------------------------- | ------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | piesaukt                              |
| `openExternal(url)`                                               | piesaukt                              |
| `getDataDir()`                                                    | piesaukt                              |
| `restartServer()`                                                 | piesaukt                              |
| `getAppVersion()`                                                 | piesaukt                              |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | piesaukt                              |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | nosūtīt                               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | saņemt (atdod atkritumu iznīcinātāju) |

Saņemtie palīgi atgriežas a** iznīcināšanas funkcija** tā vietā, lai paļautos uz `removeAllListeners` — tas novērš klausītāju uzkrāšanos, kad React komponenti tiek atkārtoti uzstādīti.

## Servera dzīves cikls

`main.js` izveido Next.js savrupo komplektu tieši ar Electron Node izpildlaiku, lai izvairītos no sākotnējā moduļa ABI neatbilstības sistēmas mezglam:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Svarīgākie:

- `waitForServer()` aptauj URL līdz 30 s pirms loga parādīšanas (aukstā palaišanas gadījumā bez tukša ekrāna).
- `stdio: "pipe"` uztver stdout/stderr; gatavas frāzes (`Ready` / `listening`) izstaro `server-status: running` pa IPC.
- `before-quit` gaida līdz 5 s, lai iegūtu graciozo SIGTERM (WAL kontrolpunktu), pēc tam nosūta SIGKILL.
- Portu pārslēdzējs teknē (`20128`, `3000`, `8080`) aptur un restartē serveri, pēc tam atkārtoti ielādē BrowserWindow.

## Zero-config Secret Bootstrap

Pirmajā palaišanas reizē galvenais process tiek automātiski ģenerēts un saglabā trūkstošos noslēpumus:

| Noslēpums                | Avots                                                                          |
| ------------------------ | ------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (atsaka, ja šifrēti creds jau pastāv) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                       |

Turējās līdz `<DATA_DIR>/server.env`. `DATA_DIR` atrisina:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` vai `~/.omniroute`
- macOS: `~/.omniroute`

## Vides failu meklēšana

Pirms servera izveidošanas tiek izvēlēts galvenais process (`getPreferredEnvFilePath()` in `electron/main.js`).** viens** `.env` fails: pirmais no tiem, kas pastāv.

1. `$DATA_DIR/.env`, kad `DATA_DIR` ir iestatīts vidē, ar kuru lietotne tika palaista.
2. `<resolved DATA_DIR>/.env`, izmantojot tos pašus noklusējuma iestatījumus kā iepriekš: `%APPDATA%\omniroute\.env` uz Windows, `$XDG_CONFIG_HOME/omniroute/.env` vai `~/.omniroute/.env` uz Linux un macOS.
3. `.env` procesa darba direktorijā.

Galvenais process nolasa tikai šo failu; vēlākie kandidāti netiek apvienoti. Pēc tam servera vide tiek veidota ar šādu prioritāti (vispirms augstākā):

1. Electron procesa vide (mainīgie, kas mantoti no jebkuras lietotnes palaišanas).
2. Atlasītais `.env` fails.
3. `<DATA_DIR>/server.env` (iepriekš minētie sāknēšanas noslēpumi).

Procesa vide tiek tverta, kad lietotne tiek startēta, tāpēc sistēmas vai lietotāja vides mainīgais, kas iestatīts lietojumprogrammas darbības laikā (tostarp, kamēr tas atrodas teknē pēc loga aizvēršanas), nesasniedz serveri, kamēr lietotne nav pilnībā aizvērta un palaists atkārtoti. Izpildlaika pogām, piemēram, `CONTEXT_LENGTH_<PROVIDER>` (skatiet [sadaļu Vides mainīgie: konteksta garums katram nodrošinātājam](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), dodiet priekšroku `.env` failam, pēc tam pilnībā aizveriet (paplāte,** Iziet** ) un atsākt.

## Logs un paplāte

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, luksofors pie `{ x: 16, y: 16 }`.
- Windows/Linux: vietējā virsrakstjosla.
- Aizvērt poga samazina paplāti; paplātes izvēlnē ir** Atveriet OmniRoute** ,** Atveriet informācijas paneli** (ārējā pārlūkprogramma),** Servera ports** apakšizvēlne,** Pārbaudiet atjauninājumus** ,** Iziet** .

## Satura drošības politika

Iestatīt, izmantojot `session.defaultSession.webRequest.onHeadersReceived`. Ievērojamās direktīvas:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Izstrādātāja režīms `'unsafe-eval'` pievieno tikai `script-src`

## Automātiska atjaunināšana

Izmanto `electron-updater` ar GitHub nodrošinātāju (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Notikumi, kas pārsūtīti renderētājam, izmantojot `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (ar `percent`), `downloaded`, `error`
- `installUpdate()` nogalina serveri un pēc tam izsauc `autoUpdater.quitAndInstall()`
- Izlaists izstrādātāja režīmā (`!app.isPackaged`)

## Izbūvēt cauruļvadu

1. `npm run build` → Next.js savrups `.next/standalone`.
2. `prepare-electron-standalone.mjs` → pārveido par `.next/electron-standalone` un pārraksta absolūtos ceļus `server.js` + `required-server-files.json`, lai komplektu varētu pārvietot.
3. `electron-builder` pakotnes `main.js`, `preload.js`, `node_modules` un `extraResources: { ../.next/electron-standalone → app }`.

### Veidojiet mērķus

| OS      | Mērķi                                     |
| ------- | ----------------------------------------- |
| Windows | NSIS instalētājs + portable (x64)         |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS iestatījumi: `oneClick: false`, ļauj lietotājam izvēlēties instalēšanas direktoriju, izveido darbvirsmas un sākuma izvēlnes saīsnes.

## Dūmu testēšanas pakotne

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Pašreizējai platformai automātiski atklāj iepakoto bināro failu `electron/dist-electron/`.
- Tiek palaists ar izolētiem `HOME`/`APPDATA`/`XDG_*` direktorijiem, lai tas neskartu izstrādātāja datus.
- Aptaujas `http://127.0.0.1:20128/login` par HTTP 200 45 s laikā.
- Pulksteņi stderr/stdout nāvējošiem modeļiem (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` utt.).
- Pēc gatavības gaida 2 s stabila izpildes laika, pēc tam izdod SIGTERM un gaida, kamēr ports atbrīvosies.
- In CI automātiski nodod `--no-sandbox --disable-gpu` (un `--disable-dev-shm-usage` uz Linux).

Env ignorē: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koda parakstīšana

`electron/package.json` dara** nē** vadu parakstīšanas akreditācijas datus. Nosūtiet tos caur env vars uz `electron-builder`:

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

AppImage parakstīšana nav obligāta — iestatiet `LINUX_GPG_KEY` parakstīšanas gadījumā.

## Izplatīšana

Artefakti nokļūst `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Laidieni tiek publicēti GitHub Releases (`diegosouzapw/OmniRoute`), kur arī `electron-updater` pārbauda jaunas versijas.

## Problēmu novēršana

| Simptoms                                                           | Labot                                                                                                                                                            |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` pēc Electron liela trieciena | better-sqlite3 v13 piegādā Node-API priekšbūvējumus — atkārtoti palaist `npm install` saknē un `prepare:bundle` (tas pārbauda pašreizējās platformas priekšbūvi) |
| `ERR_DLOPEN_FAILED` vietējam modulim                               | Atkārtoti palaist `prepare:bundle` — tas ātri neizdodas, ja trūkst Node-API priekšbūvējuma pašreizējai platformai                                                |
| Uz Linux logs ir tukšs                                             | Apstipriniet, vai Next.js serveris patiešām ir saistīts ar PORT (pārbaudiet `[Server]` žurnālus)                                                                 |
| macOS notariālie stendi                                            | Nodrošiniet `APPLE_*` vars eksportēšanu, nevis tikai `.env`                                                                                                      |
| Windows SmartScreen brīdinājums                                    | Parakstieties ar EV sertifikātu vai lietotāji ar peles labo pogu noklikšķiniet uz → "Palaist jebkurā gadījumā"                                                   |
| Dūmu tests neizdodas, izmantojot portu                             | Pirms `electron:smoke:packaged` palaišanas apturiet jebkuru vietējo izstrādātāju serveri 20128. gadā                                                             |

## Skatīt arī

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Avots: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Palīgi: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
