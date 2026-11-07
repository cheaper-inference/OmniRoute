# Electron Desktop Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Chanzo cha ukweli:** `electron/` nafasi ya kazi** Mara ya mwisho kusasishwa:** 2026-06-28 — v3.8.40

OmniRoute husafirisha programu ya kompyuta ya mezani (Windows / macOS / Linux) iliyojengwa juu yake**Electron 41** +** wajenzi wa elektroni 26.10** . Programu ya eneo-kazi hutoa seva ya Next.js inayojitegemea kama mchakato wa mtoto, inaelekeza `BrowserWindow` kwake, na kuongeza trei ya mfumo, kiboreshaji kiotomatiki, daraja la IPC, na mkanda wa siri wa kusanidi sifuri.

## Usanifu

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

## Matoleo

Imethibitishwa kutoka kwa `electron/package.json`:

| Kifurushi                 | Toleo                                                       |
| ------------------------- | ----------------------------------------------------------- |
| `electron`                | `^43.4.1`                                                   |
| `electron-builder`        | `^26.15.3`                                                  |
| `electron-updater`        | `^6.8.9`                                                    |
| `better-sqlite3`          | mzizi `^13.0.2` (Node-API inajenga upya — hakuna Electron ) |
| Toleo la programu         | `3.8.0`                                                     |
| Kitambulisho cha programu | `online.omniroute.desktop`                                  |
| Jina la bidhaa            | `OmniRoute`                                                 |

## Maandishi (mzizi `package.json`)

| Hati                              | Kusudi                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Inaanza `npm run dev` + inasubiri `localhost:20128` + itazindua Electron              |
| `npm run electron:build`          | Huunda Next.js kisha huendesha `electron-builder` kwa OS ya sasa                      |
| `npm run electron:build:win`      | Huunda kisakinishi cha Windows NSIS + kinachobebeka (x64)                             |
| `npm run electron:build:mac`      | Hujenga macOS DMG (Intel + Apple Silicon)                                             |
| `npm run electron:build:linux`    | Hujenga Linux AppImage + DEB (x64 + arm64)                                            |
| `npm run electron:smoke:packaged` | Inazindua mfumo wa jozi iliyopakiwa na kuchunguza `/login` kwa HTTP 200, kisha huzima |

Nafasi ya kazi ya `electron/` pia inafichua:

- `npm run prepare:bundle` — inaendesha `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS hujenga
- `npm run pack` — saraka-tu kujenga kwa majaribio ya ndani (hakuna kisakinishi)

## Vifurushi vya hiari vya kukimbia

Miundo ya kompyuta ya mezani inaweza kuchapisha kumbukumbu za hiari za wakati wa utekelezaji pamoja na waliosakinisha. Upakiaji wa seva iliyosakinishwa una `optional-packs.index.json` (chini ya `resources/app` kwenye Windows na Linux). Kwa kiingilio cha `browser-runtime`, soma `packs[].tarball` na upakue** jina halisi la faili kutoka kwa toleo sawa** . Majina ya kumbukumbu ni pamoja na digest SHA-256 ; miundo tofauti inaweza kuhitaji kumbukumbu tofauti. Weka jina la faili lililopakuliwa bila kubadilishwa.

Nakili faharasa ya programu iliyosakinishwa na kumbukumbu iliyochaguliwa kwenye saraka moja, kisha utumie CLI kutoka kwa toleo sawa:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` huonyesha hali ya usakinishaji na uthibitishaji, si jina la faili la kumbukumbu. Faharasa iliyounganishwa huchagua kumbukumbu. Usakinishaji huthibitisha hundi yake ya kumbukumbu kabla ya uchimbaji na hundi ya kifurushi chake kabla ya kubadilisha kifurushi kilichosakinishwa. Inasoma faili za ndani; haipakui kumbukumbu zinazokosekana. Anzisha tena programu baada ya usakinishaji. Ikiwa toleo halina kipengee kinacholingana, kifurushi cha hiari hakipatikani kupitia vipengee vya toleo hilo.

## Mpangilio wa Saraka

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

`main.js` na `preload.js` zote ni** faili CommonJS `.js`** , si TypeScript. Maandishi ya upande wa kionyeshi huishi `electron/types.d.ts`.

## IPC Bridge (`preload.js`)

Upakiaji wa awali unaonyesha API iliyoidhinishwa kwenye `window.electronAPI` kwa kutumia `contextBridge` na `contextIsolation: true` na `nodeIntegration: false`.

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

Mbinu zilizowekwa wazi:

| Simu ya mtoaji                                                    | Aina                       |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | omba                       |
| `openExternal(url)`                                               | omba                       |
| `getDataDir()`                                                    | omba                       |
| `restartServer()`                                                 | omba                       |
| `getAppVersion()`                                                 | omba                       |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | omba                       |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | tuma                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | kupokea (hurejesha mtoaji) |

Wasaidizi wanaopokea wanarudi a** kazi ya kutupa** badala ya kutegemea `removeAllListeners` — hii inazuia mkusanyiko wa wasikilizaji wakati vipengele vya React vinapoongezeka.

## Mzunguko wa Maisha ya Seva

`main.js` huzalisha kifurushi cha Next.js kilichojitegemea moja kwa moja na wakati wa utekelezaji wa Njia Electron ili kuzuia kutolingana kwa moduli ya ABI na Njia ya mfumo:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Vivutio:

- `waitForServer()` huchagua URL hadi s 30 kabla ya kuonyesha dirisha (hakuna skrini tupu kwenye kuanza kwa baridi).
- `stdio: "pipe"` inakamata stdout/stderr; vishazi tayari (`Ready` / `listening`) hutoa `server-status: running` juu ya IPC.
- `before-quit` inasubiri hadi sekunde 5 kwa SIGTERM nzuri (WAL checkpoint) kisha kutuma SIGKILL.
- Kibadilishaji cha mlango kwenye trei (`20128`, `3000`, `8080`) husimamisha na kuwasha tena seva, kisha hupakia upya BrowserWindow.

## Siri ya Bootstrap ya Siri ya kusanidi sifuri

Katika uzinduzi wa kwanza, mchakato mkuu hujizalisha kiotomatiki na huendelea kukosa siri:

| Siri                     | Chanzo                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (inakataa ikiwa hati zilizosimbwa tayari zipo) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                |

Iliendelea kwa `<DATA_DIR>/server.env`. `DATA_DIR` anaamua kwa:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` au `~/.omniroute`
- macOS: `~/.omniroute`

## Utafutaji wa faili ya mazingira

Kabla ya kutoa seva, mchakato kuu (`getPreferredEnvFilePath()` in `electron/main.js`) huchagua** moja** `.env` faili: ya kwanza kati ya hizi zilizopo.

1. `$DATA_DIR/.env`, wakati `DATA_DIR` imewekwa katika mazingira programu ilizinduliwa nayo.
2. `<resolved DATA_DIR>/.env`, kwa kutumia chaguo-msingi sawa na hapo juu: `%APPDATA%\omniroute\.env` kwenye Windows, `$XDG_CONFIG_HOME/omniroute/.env` au `~/.omniroute/.env` kwenye Linux na macOS.
3. `.env` kwenye saraka ya kufanya kazi ya mchakato.

Mchakato kuu unasoma faili hiyo tu; watahiniwa wa baadaye hawajaunganishwa. Mazingira ya seva hujengwa kwa utangulizi huu (ya juu zaidi kwanza):

1. Mazingira ya mchakato wa Electron (vigeu vilivyorithiwa kutoka kwa chochote kilichozindua programu).
2. Faili `.env` iliyochaguliwa.
3. `<DATA_DIR>/server.env` (siri za bootstrap hapo juu).

Mazingira ya mchakato hunaswa wakati programu inapoanza, kwa hivyo kibadilishaji cha mfumo au mazingira ya mtumiaji kilichowekwa wakati programu inafanya kazi (ikiwa ni pamoja na wakati inakaa kwenye trei baada ya dirisha lake kufungwa) haifikii seva hadi programu itakapozimwa na kuzinduliwa upya. Kwa visu vya wakati wa kukimbia kama vile `CONTEXT_LENGTH_<PROVIDER>` (angalia [Vigezo vya Mazingira: Per-mtoa muktadha urefu](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), pendelea faili `.env`, kisha uache kabisa ( trei,** Acha** ) na kuzindua upya.

## Dirisha na Tray

- `BrowserWindow`: 1400 × 900 (dk 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, mwanga wa trafiki kwa `{ x: 16, y: 16 }`.
- Windows/Linux: upau wa kichwa asilia.
- Kitufe cha kufunga kinapunguza kwenye tray; orodha ya tray ina** Fungua OmniRoute** ,** Fungua Dashibodi** (kivinjari cha nje),** Bandari ya Seva** menyu ndogo,** Angalia Usasisho** ,** Acha** .

## Sera ya Usalama wa Maudhui

Weka kupitia `session.defaultSession.webRequest.onHeadersReceived`. Maagizo mashuhuri:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Hali ya usanidi huongeza `'unsafe-eval'` kwa `script-src` pekee

## Sasisha kiotomatiki

Hutumia `electron-updater` na mtoaji GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Matukio yanayotumwa kwa mtoaji kupitia `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (na `percent`), `downloaded`, `error`
- `installUpdate()` inaua seva kisha inaita `autoUpdater.quitAndInstall()`
- Imerukwa katika hali ya dev (`!app.isPackaged`)

## Kujenga Bomba

1. `npm run build` → Next.js inayojitegemea katika `.next/standalone`.
2. `prepare-electron-standalone.mjs` → inaweka hatua tena kuwa `.next/electron-standalone` na kuandika upya njia kamili ndani ya `server.js` + `required-server-files.json` ili kifungu kiweze kuhamishwa.
3. `electron-builder` vifurushi `main.js`, `preload.js`, `node_modules`, na `extraResources: { ../.next/electron-standalone → app }`.

### Jenga malengo

| OS      | Malengo                                    |
| ------- | ------------------------------------------ |
| Windows | kisakinishi cha NSIS + kinachobebeka (x64) |
| macOS   | DMG (Intel + arm64, buruta-hadi-Maombi)    |
| Linux   | AppImage + DEB (x64 + arm64)               |

NSIS mipangilio: `oneClick: false`, huruhusu mtumiaji kuchagua saraka ya kusakinisha, huunda Desktop na njia za mkato za Menyu ya Anza.

## Jengo Lililofungashwa la Kupima Moshi

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Hugundua kiotomatiki binary iliyopakiwa katika `electron/dist-electron/` kwa jukwaa la sasa.
- Huzindua na saraka za `HOME`/`APPDATA`/`XDG_*` zilizotengwa ili isiguse data ya msanidi programu.
- Kura za `http://127.0.0.1:20128/login` kwa HTTP 200 ndani ya sekunde 45.
- Inatazama stderr/stdout kwa mifumo mbaya (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, nk.).
- Inasubiri sekunde 2 za muda wa utekelezaji ulio thabiti baada ya kuwa tayari, kisha hutoa SIGTERM na kusubiri lango lifunguliwe.
- Katika CI, hupita `--no-sandbox --disable-gpu` kiotomatiki (na `--disable-dev-shm-usage` kwenye Linux).

Env imebatilisha: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kutia Sahihi Msimbo

`electron/package.json` hufanya** sivyo** vitambulisho vya kusainiwa kwa waya moja kwa moja. Zipitishe kupitia env vars hadi `electron-builder`:

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

kusaini AppImage ni hiari — kuweka `LINUX_GPG_KEY` ikiwa unatia saini.

## Usambazaji

Vitu vya sanaa hutua `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Matoleo huchapishwa kwa Matoleo ya GitHub (`diegosouzapw/OmniRoute`), ambapo pia `electron-updater` hukagua matoleo mapya.

## Kutatua matatizo

| Dalili                                                              | Rekebisha                                                                                                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` baada ya Electron bonge kubwa | better-sqlite3 v13 husafirisha Node-API huunda — kuendesha tena `npm install` kwenye mzizi na `prepare:bundle` (inathibitisha muundo wa awali wa jukwaa la sasa) |
| `ERR_DLOPEN_FAILED` kwa moduli asili                                | Run tena `prepare:bundle` — inashindwa haraka wakati muundo wa Node-API wa jukwaa la sasa haupo.                                                                 |
| Dirisha inaonekana tupu kwenye Linux                                | Thibitisha seva Next.js inayofungamana na PORT (angalia kumbukumbu za `[Server]` )                                                                               |
| macOS maduka ya notarization                                        | Hakikisha `APPLE_*` vars zinasafirishwa, sio tu katika `.env`                                                                                                    |
| Windows SmartScreen                                                 | Ingia na EV cert, au watumiaji bonyeza-kulia → "Kimbia hata hivyo"                                                                                               |
| Jaribio la moshi halifaulu kwa kutumia lango                        | Simamisha seva yoyote ya ndani mnamo 20128 kabla ya kuendesha `electron:smoke:packaged`                                                                          |

## Tazama Pia

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Chanzo: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Wasaidizi: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
