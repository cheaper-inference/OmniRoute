# Electron Desktop Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Tiesos šaltinis:** `electron/` darbo vieta** Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute pristato kelių platformų darbalaukio programą (Windows / macOS / Linux), sukurtą**Electron 41** +** elektronų statytojas 26.10** . Staliniams kompiuteriams skirta programa sukuria atskirą Next.js serverį kaip antrinį procesą, nukreipia į jį `BrowserWindow` ir prideda sistemos dėklą, automatinį naujinimo priemonę, IPC tiltą ir nulinės konfigūracijos slaptą įkrovos juostą.

## Architektūra

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

## Versijos

Patvirtinta iš `electron/package.json`:

| Paketas              | Versija                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                            |
| `electron-builder`   | `^26.15.3`                                                           |
| `electron-updater`   | `^6.8.9`                                                             |
| `better-sqlite3`     | root `^13.0.2` (mazgas API iš anksto sukuria — be Electron atkūrimo) |
| Programos versija    | `3.8.0`                                                              |
| Programos ID         | `online.omniroute.desktop`                                           |
| Produkto pavadinimas | `OmniRoute`                                                          |

## Scenarijai (root `package.json`)

| Scenarijus                        | Tikslas                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Paleidžia `npm run dev` + laukia `localhost:20128` + paleidžia Electron              |
| `npm run electron:build`          | Sukuria Next.js, tada paleidžia `electron-builder` dabartiniam OS                    |
| `npm run electron:build:win`      | Sukuria Windows NSIS diegimo programą + portable (x64)                               |
| `npm run electron:build:mac`      | Sukuria macOS DMG („Intel + Apple Silicon“)                                          |
| `npm run electron:build:linux`    | Sukuria Linux AppImage + DEB (x64 + arm64)                                           |
| `npm run electron:smoke:packaged` | Paleidžia supakuotą dvejetainį failą ir patikrina `/login` HTTP 200, tada išsijungia |

`electron/` darbo sritis taip pat rodo:

- `npm run prepare:bundle` — veikia `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — vienos arkos macOS versijos
- `npm run pack` — tik katalogo kūrimas vietiniam testavimui (be diegimo programos)

## Pasirenkami vykdymo laiko paketai

Stalinių kompiuterių versijos gali skelbti pasirenkamus vykdymo laiko archyvus kartu su diegimo programomis. Įdiegtoje serverio naudingojoje apkrovoje yra `optional-packs.index.json` (po `resources/app` Windows ir Linux). Norėdami gauti `browser-runtime` įrašą, perskaitykite `packs[].tarball` ir atsisiųskite** tikslus to paties leidimo failo pavadinimas** . Archyvo pavadinimuose yra SHA-256 santrauka; skirtingoms konstrukcijoms gali prireikti skirtingų archyvų. Atsisiųsto failo pavadinimą palikite nepakeistą.

Nukopijuokite įdiegtos programos indeksą ir pasirinktą archyvą į vieną katalogą, tada naudokite CLI iš to paties leidimo:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` rodo diegimo ir patikrinimo būseną, o ne archyvo failo pavadinimą. Sugrupuota rodyklė pasirenka archyvą. Diegimas patikrina savo archyvo kontrolinę sumą prieš ištraukimą ir paketo kontrolines sumas prieš pakeičiant įdiegtą paketą. Jis skaito vietinius failus; ji neatsisiunčia trūkstamų archyvų. Įdiegę programą iš naujo paleiskite programą. Jei leidimas neturi atitinkamo ištekliaus, pasirenkamas paketas nepasiekiamas naudojant to leidimo išteklius.

## Katalogo išdėstymas

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

Ir `main.js`, ir `preload.js` yra**CommonJS `.js` failus** , ne TypeScript. Atvaizduotojo pusės rašymas yra `electron/types.d.ts`.

## IPC tiltas (`preload.js`)

Išankstinis įkėlimas rodo į baltąjį sąrašą įtrauktą API `window.electronAPI` naudojant `contextBridge` su `contextIsolation: true` ir `nodeIntegration: false`.

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

Atskleisti metodai:

| Rendererio skambutis                                              | Tipas                     |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | prisišaukti               |
| `openExternal(url)`                                               | prisišaukti               |
| `getDataDir()`                                                    | prisišaukti               |
| `restartServer()`                                                 | prisišaukti               |
| `getAppVersion()`                                                 | prisišaukti               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | prisišaukti               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | siųsti                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | gauti (grąžina tvarkyklę) |

Priimantys pagalbininkai grąžina a** šalinimo funkcija** o ne pasikliauti `removeAllListeners` —, tai apsaugo nuo klausytojų kaupimosi, kai React komponentai vėl montuojami.

## Serverio gyvavimo ciklas

`main.js` sukuria atskirą Next.js paketą tiesiogiai su Electron mazgo vykdymo laiku, kad išvengtų vietinio modulio ABI neatitikimo sistemos mazgui:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Svarbiausi dalykai:

- `waitForServer()` apklausia URL iki 30 s prieš parodydama langą (nėra tuščio ekrano šalto paleidimo metu).
- `stdio: "pipe"` fiksuoja stdout/stderr; paruoštos frazės (`Ready` / `listening`) skleidžia `server-status: running` per IPC.
- `before-quit` laukia iki 5 s grakštaus SIGTERM (WAL checkpoint), tada siunčia SIGKILL.
- Dėkle esantis prievadų perjungiklis (`20128`, `3000`, `8080`) sustabdo ir iš naujo paleidžia serverį, tada iš naujo įkelia BrowserWindow.

## Nulinės konfigūracijos slaptas įkrovos diržas

Pirmą kartą paleidus, pagrindinis procesas automatiškai sugeneruojamas ir lieka trūkstamų paslapčių:

| Paslaptis                | Šaltinis                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                             |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (atsisako, jei jau yra užšifruoti kreditai) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                             |

Išliko iki `<DATA_DIR>/server.env`. `DATA_DIR` išsprendžia:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` arba `~/.omniroute`
- macOS: `~/.omniroute`

## Aplinkos failų paieška

Prieš sukuriant serverį, pasirenkamas pagrindinis procesas (`getPreferredEnvFilePath()` in `electron/main.js`).** vienas** `.env` failas: pirmasis iš jų egzistuojantis.

1. `$DATA_DIR/.env`, kai `DATA_DIR` nustatytas aplinkoje, kurioje programa buvo paleista.
2. `<resolved DATA_DIR>/.env`, naudojant tuos pačius numatytuosius nustatymus, kaip ir anksčiau: `%APPDATA%\omniroute\.env` Windows, `$XDG_CONFIG_HOME/omniroute/.env` arba `~/.omniroute/.env` Linux ir macOS.
3. `.env` proceso darbo kataloge.

Pagrindinis procesas skaito tik tą failą; vėlesni kandidatai nėra sujungiami. Tada serverio aplinka kuriama su tokia pirmenybe (aukščiausia pirmiausia):

1. Electron proceso aplinka (kintamieji paveldėti iš to, kas paleido programą).
2. Pasirinktas `.env` failas.
3. `<DATA_DIR>/server.env` (aukščiau pateiktos įkrovos paslaptys).

Proceso aplinka užfiksuojama, kai programa paleidžiama, todėl sistemos arba vartotojo aplinkos kintamasis, nustatytas programai veikiant (įskaitant tada, kai ji yra dėkle uždarius langą), nepasiekia serverio, kol programa visiškai uždaroma ir nepaleidžiama iš naujo. Vykdymo laiko rankenėlėms, pvz., `CONTEXT_LENGTH_<PROVIDER>` (žr. [Aplinkos kintamieji: konteksto ilgis pagal teikėją](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), pirmenybę teikite `.env` failui, tada visiškai uždarykite (dėklas,** Išeik** ) ir paleiskite iš naujo.

## Langas ir padėklas

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, šviesoforas ties `{ x: 16, y: 16 }`.
- Windows/Linux: vietinė pavadinimo juosta.
- Uždaryti mygtukas sumažina iki dėklo; dėklo meniu yra** Atidarykite OmniRoute** ,** Atidarykite prietaisų skydelį** (išorinė naršyklė),** Serverio prievadas** submeniu,** Patikrinkite, ar nėra atnaujinimų** ,** Išeik** .

## Turinio saugos politika

Nustatyti per `session.defaultSession.webRequest.onHeadersReceived`. Svarbios instrukcijos:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Kūrėjo režimas prideda tik `'unsafe-eval'` prie `script-src`

## Automatinis atnaujinimas

Naudoja `electron-updater` su GitHub teikėju (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Įvykiai, persiųsti atvaizduotojui per `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (su `percent`), `downloaded`, `error`
- `installUpdate()` nužudo serverį, tada iškviečia `autoUpdater.quitAndInstall()`
- Praleista kūrimo režimu (`!app.isPackaged`)

## Statyti vamzdyną

1. `npm run build` → Next.js autonominis `.next/standalone`.
2. `prepare-electron-standalone.mjs` → iš naujo pereina į `.next/electron-standalone` ir perrašo absoliučiuosius kelius `server.js` + `required-server-files.json` viduje, kad rinkinį būtų galima perkelti.
3. `electron-builder` paketai `main.js`, `preload.js`, `node_modules` ir `extraResources: { ../.next/electron-standalone → app }`.

### Sukurkite taikinius

| OS      | Taikiniai                                   |
| ------- | ------------------------------------------- |
| Windows | NSIS diegimo programa + portable (x64)      |
| macOS   | DMG („Intel + arm64“, vilkimas į programas) |
| Linux   | AppImage + DEB (x64 + arm64)                |

NSIS nustatymai: `oneClick: false`, leidžia vartotojui pasirinkti diegimo katalogą, sukuria darbalaukio ir pradžios meniu nuorodas.

## Dūmų bandymo supakuota konstrukcija

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatiškai atranda supakuotą dvejetainį failą `electron/dist-electron/` dabartinei platformai.
- Paleidžiama naudojant izoliuotus `HOME`/`APPDATA`/`XDG_*` katalogus, todėl jis neliečia kūrėjo duomenų.
- Apklausos `http://127.0.0.1:20128/login` už HTTP 200 per 45 s.
- Laikrodžiai stderr/stdout dėl mirtinų modelių (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` ir kt.).
- Po parengties laukia 2 s stabilaus veikimo laiko, tada išduoda SIGTERM ir laukia, kol prievadas atsilaisvins.
- CI automatiškai perduoda `--no-sandbox --disable-gpu` (ir `--disable-dev-shm-usage` Linux).

Env nepaiso: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodo pasirašymas

`electron/package.json` daro** ne** laidų pasirašymo kredencialus tiesiogiai. Perduokite juos per env vars į `electron-builder`:

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

AppImage signing yra neprivaloma, jei pasirašoma, — nustatyti `LINUX_GPG_KEY`.

## Paskirstymas

Artefaktai patenka į `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Leidimai skelbiami GitHub Releases (`diegosouzapw/OmniRoute`), kur `electron-updater` taip pat tikrina, ar nėra naujų versijų.

## Trikčių šalinimas

| Simptomas                                                       | Pataisyti                                                                                                                                                               |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po Electron didysis guzas | better-sqlite3 v13“ pristato „Node-API“ prebuilds — “ iš naujo paleiskite `npm install` šaknyje ir `prepare:bundle` (jis patikrina esamos platformos išankstinį kūrimą) |
| `ERR_DLOPEN_FAILED` vietiniam moduliui                          | Iš naujo paleiskite `prepare:bundle` — greitai nepavyksta, kai trūksta dabartinės platformos mazgo API išankstinio kūrimo                                               |
| Langas ant Linux atrodo tuščias                                 | Patvirtinkite, kad Next.js serveris iš tikrųjų susietas su PORT (patikrinkite `[Server]` žurnalus)                                                                      |
| macOS notaro tvirtinimo prekystaliai                            | Užtikrinkite, kad `APPLE_*` vars būtų eksportuojami, o ne tik `.env`                                                                                                    |
| Windows SmartScreen įspėjimas                                   | Pasirašykite naudodami EV sertifikatą arba vartotojai dešiniuoju pelės mygtuku spustelėkite → „Vykdyti vis tiek“                                                        |
| Dūmų bandymas nepavyksta naudojant prievadą                     | Prieš paleisdami `electron:smoke:packaged` sustabdykite bet kurį vietinį kūrėjo serverį 20128 m                                                                         |

## Taip pat žr

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Šaltinis: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pagalbininkai: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
