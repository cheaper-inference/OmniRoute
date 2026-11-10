# Electron Desktop Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Tõe allikas:** `electron/` tööruum** Viimati värskendatud:** 28.06.2026 — v3.8.40

OmniRoute tarnib platvormideülese töölauarakenduse (Windows / macOS / Linux), mis on ehitatud**Electron 41** +** elektronehitaja 26.10** . Töölauarakendus loob Next.js eraldiseisva serveri alamprotsessina, osutab sellele `BrowserWindow` ja lisab süsteemse salve, automaatse värskendaja, IPC silla ja nullkonfiguratsiooniga salajase alglaadimise.

## Arhitektuur

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

## Versioonid

`electron/package.json` poolt kinnitatud:

| pakett             | Versioon                                                             |
| ------------------ | -------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                            |
| `electron-builder` | `^26.15.3`                                                           |
| `electron-updater` | `^6.8.9`                                                             |
| `better-sqlite3`   | juur `^13.0.2` (Node-API eelehitab — ilma Electron ümberehitamiseta) |
| Rakenduse versioon | `3.8.0`                                                              |
| Rakenduse ID       | `online.omniroute.desktop`                                           |
| Toote nimi         | `OmniRoute`                                                          |

## Skriptid (root `package.json`)

| Skript                            | Eesmärk                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Käivitab `npm run dev` + ootab `localhost:20128` + käivitab Electron                    |
| `npm run electron:build`          | Ehitab Next.js seejärel käivitab `electron-builder` praeguse OS jaoks                   |
| `npm run electron:build:win`      | Ehitab Windows NSIS installerit + portable (x64)                                        |
| `npm run electron:build:mac`      | Ehitab macOS DMG (Intel + Apple Silicon)                                                |
| `npm run electron:build:linux`    | Ehitab Linux AppImage + DEB (x64 + arm64)                                               |
| `npm run electron:smoke:packaged` | Käivitab pakitud kahendfaili ja proovib `/login` HTTP 200 jaoks, seejärel lülitub välja |

`electron/` tööala paljastab ka:

- `npm run prepare:bundle` — käivitab `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — ühekaarelised macOS järgud
- `npm run pack` — ainult kataloogi ehitamine kohalikuks testimiseks (installer puudub)

## Valikulised käitusaja paketid

Töölauajärgud võivad koos installijatega avaldada valikulisi käitusaegseid arhiive. Installitud serveri kasulik koormus sisaldab `optional-packs.index.json` ( `resources/app` all Windows ja Linux puhul). `browser-runtime` -kirje jaoks lugege `packs[].tarball` ja laadige alla** see täpne failinimi samast versioonist** . Arhiivinimed sisaldavad SHA-256 kokkuvõtet; erinevad konstruktsioonid võivad vajada erinevaid arhiive. Hoidke allalaaditud failinimi muutmata.

Kopeerige installitud rakenduse register ja valitud arhiiv ühte kataloogi, seejärel kasutage sama versiooni CLI :

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` kuvab installi- ja kinnitusoleku, mitte arhiivi failinime. Komplekteeritud register valib arhiivi. Installimine kontrollib oma arhiivi kontrollsummat enne ekstraktimist ja pakettide kontrollsummasid enne installitud paketi asendamist. See loeb kohalikke faile; see ei laadi alla puuduvaid arhiive. Pärast installimist taaskäivitage rakendus. Kui versioonil pole ühtki vastavat vara, pole valikuline pakett selle versiooni varade kaudu saadaval.

## Kataloogi paigutus

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

Nii `main.js` kui ka `preload.js` on**CommonJS `.js` failid** , mitte TypeScript. Renderdajapoolsed tüübid on `electron/types.d.ts`.

## IPC sild (`preload.js`)

Eellaadimine paljastab `window.electronAPI` lubatud loendis oleva API, kasutades `contextBridge` koos `contextIsolation: true` ja `nodeIntegration: false`.

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

Avatud meetodid:

| Renderdaja kõne                                                   | Tüüp                              |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | kutsuda                           |
| `openExternal(url)`                                               | kutsuda                           |
| `getDataDir()`                                                    | kutsuda                           |
| `restartServer()`                                                 | kutsuda                           |
| `getAppVersion()`                                                 | kutsuda                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | kutsuda                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | saata                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | vastu võtma (tagastab prügikasti) |

Vastuvõtvad abilised tagastavad a** kõrvaldamise funktsioon** `removeAllListeners` — tuginemise asemel hoiab see ära kuulajate kuhjumise React komponentide uuesti paigaldamisel.

## Serveri elutsükkel

`main.js` loob Next.js eraldiseisva paketi otse Electron Node käitusajaga, et vältida algmooduli ABI mittevastavust süsteemisõlmega:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Tähtsündmused:

- `waitForServer()` küsitleb URL kuni 30 s enne akna näitamist (külmkäivitamisel tühja ekraani pole).
- `stdio: "pipe"` lööb stdout/stderr; valmis fraasid (`Ready` / `listening`) kiirgavad `server-status: running` üle IPC.
- `before-quit` ootab graatsilist SIGTERM (WAL kontrollpunkt) kuni 5 sekundit, seejärel saadab SIGKILL.
- Salves olev pordi vahetaja (`20128`, `3000`, `8080`) peatab ja taaskäivitab serveri ning laadib seejärel BrowserWindow uuesti.

## Nullkonfiguratsiooniga salajane alglaadimine

Esmakordsel käivitamisel genereeritakse põhiprotsess automaatselt ja puuduvad saladused:

| Saladus                  | Allikas                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (keeldub, kui krüptitud krediit on juba olemas) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Püsis kuni `<DATA_DIR>/server.env`. `DATA_DIR` lahendab:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` või `~/.omniroute`
- macOS: `~/.omniroute`

## Keskkonnafailide otsing

Enne serveri loomist valib põhiprotsess (`getPreferredEnvFilePath()` in `electron/main.js`).** üks** `.env` -fail: esimene neist, mis on olemas.

1. `$DATA_DIR/.env`, kui `DATA_DIR` on määratud keskkonnas, millega rakendus käivitati.
2. `<resolved DATA_DIR>/.env`, kasutades samu vaikeväärtusi nagu ülal: `%APPDATA%\omniroute\.env` Windows, `$XDG_CONFIG_HOME/omniroute/.env` või `~/.omniroute/.env` puhul Linux ja macOS.
3. `.env` protsessi töökataloogis.

Põhiprotsess loeb ainult seda faili; hilisemaid kandidaate ei liideta. Seejärel luuakse serverikeskkond järgmise prioriteediga (kõrgeim enne):

1. Electron protsessikeskkond (muutujad, mis on päritud sellest, mis rakenduse käivitas).
2. Valitud `.env` fail.
3. `<DATA_DIR>/server.env` (ülaltoodud alglaadimissaladused).

Protsessikeskkond jäädvustatakse rakenduse käivitumisel, nii et süsteemi või kasutajakeskkonna muutuja, mis on seatud rakenduse töötamise ajal (sealhulgas siis, kui see on salves pärast selle akna sulgemist), ei jõua serverisse enne, kui rakendus on täielikult välja lülitatud ja uuesti käivitatud. Käitusaja nuppude (nt `CONTEXT_LENGTH_<PROVIDER>` jaoks (vt [Keskkonnamuutujad: Pakkuja konteksti pikkus](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ) eelistage `.env` faili, seejärel sulgege täielikult (salv,** Lõpeta** ) ja taaskäivitage.

## Aken ja salv

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, valgusfoor `{ x: 16, y: 16 }` juures.
- Windows/Linux: omapärane tiitliriba.
- Sulgemisnupp minimeerib salve; salve menüüs on** Ava OmniRoute** ,** Avage armatuurlaud** (väline brauser),** Serveri port** alammenüü,** Kontrollige värskendusi** ,** Lõpeta** .

## Sisu turvapoliitika

Seadista `session.defaultSession.webRequest.onHeadersReceived` kaudu. Märkimisväärsed juhised:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Arendusrežiim lisab `'unsafe-eval'` ainult `script-src` le

## Automaatne värskendus

Kasutab `electron-updater` koos GitHub pakkujaga (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC kaudu renderdajale edastatud sündmused: `checking`, `available`, `not-available`, `downloading` (koos `percent`), `downloaded`, `error`
- `installUpdate()` tapab serveri ja seejärel kutsub `autoUpdater.quitAndInstall()`
- Arendusrežiimis vahele jäetud (`!app.isPackaged`)

## Ehitage torujuhe

1. `npm run build` → Next.js eraldiseisev `.next/standalone`.
2. `prepare-electron-standalone.mjs` → lavastab uuesti `.next/electron-standalone` -ks ja kirjutab ümber `server.js` + `required-server-files.json` sees olevad absoluutsed teed, nii et kogum on ümberpaigutav.
3. `electron-builder` paketid `main.js`, `preload.js`, `node_modules` ja `extraResources: { ../.next/electron-standalone → app }`.

### Ehitage sihtmärke

| OS      | Sihtmärgid                                     |
| ------- | ---------------------------------------------- |
| Windows | NSIS installer + portable (x64)                |
| macOS   | DMG (Intel + arm64, rakendustesse lohistamine) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

NSIS sätted: `oneClick: false`, võimaldab kasutajal valida installikataloogi, loob töölaua ja Start-menüü otseteed.

## Suitsutestimise pakitud komplekt

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Avastab automaatselt praeguse platvormi jaoks `electron/dist-electron/` pakitud binaarfaili.
- Käivitatakse isoleeritud `HOME`/`APPDATA`/`XDG_*` kataloogidega, nii et see ei puuduta arendaja andmeid.
- Küsitlused `http://127.0.0.1:20128/login` jaoks HTTP 200 45 sekundi jooksul.
- Kellad stderr/stdout saatuslike mustrite jaoks (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` jne).
- Pärast valmisolekut ootab 2 s stabiilset käitusaega, siis väljastab SIGTERM ja ootab pordi vabanemist.
- Kui CI, möödub automaatselt `--no-sandbox --disable-gpu` (ja `--disable-dev-shm-usage` Linux puhul).

Env alistab: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koodi allkirjastamine

`electron/package.json` teeb** mitte** otse allkirjastamise volikirjad. Edastage need env varsi kaudu `electron-builder` le:

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

AppImage allkirjastamine on valikuline. — määrake allkirjastamisel `LINUX_GPG_KEY`.

## Levitamine

Artefaktid maanduvad `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Väljalasked avaldatakse GitHub Releases (`diegosouzapw/OmniRoute`), kus `electron-updater` kontrollib ka uusi versioone.

## Veaotsing

| Sümptom                                                              | Parandage                                                                                                                                                 |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` pärast Electron suurt põrutust | better-sqlite3 v13 tarnib Node-API eelehitused — käivitab uuesti `npm install` juurtes ja `prepare:bundle` (see kontrollib praeguse platvormi eelehitust) |
| `ERR_DLOPEN_FAILED` algmooduli jaoks                                 | Käivitage `prepare:bundle` — uuesti see ebaõnnestub kiiresti, kui praeguse platvormi Node-API eelehitus puudub                                            |
| Zqa aken on Linux                                                    | Kinnitage, Next.js server on tegelikult PORT ga seotud (kontrollige `[Server]` logisid)                                                                   |
| macOS notariaalse kinnituse kioskites                                | Veenduge, `APPLE_*` varsid eksporditaks, mitte ainult `.env`                                                                                              |
| Windows SmartScreen hoiatus                                          | Allkirjastage EV sertifikaadiga või paremklõpsake kasutajal → "Käivita ikkagi"                                                                            |
| Kasutatava pordi korral suitsutest ebaõnnestub                       | Enne `electron:smoke:packaged` käivitamist peatage 20128. aastal mis tahes kohalik arendusserver                                                          |

## Vaata ka

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Allikas: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Abilised: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
