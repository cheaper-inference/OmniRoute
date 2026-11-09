# Electron Desktop Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Foinse na fírinne:** `electron/` spás oibre** Nuashonraithe is déanaí:** 2026-06-28 — v3.8.40

OmniRoute ships a cross-platform desktop app (Windows / macOS / Linux) built on **Electron 41** + **electron-builder 26.10**. The desktop app spawns the Next.js standalone server as a child process, points a `BrowserWindow` at it, and adds a system tray, auto-updater, IPC bridge, and zero-config secret bootstrap.

## Ailtireacht

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

## Leaganacha

Deimhnithe ó `electron/package.json`:

| Pacáiste            | Leagan                                                      |
| ------------------- | ----------------------------------------------------------- |
| `electron`          | `^43.4.1`                                                   |
| `electron-builder`  | `^26.15.3`                                                  |
| `electron-updater`  | `^6.8.9`                                                    |
| `better-sqlite3`    | root `^13.0.2` (réamhthógann Nód-API — no Electron rebuild) |
| Leagan app          | `3.8.0`                                                     |
| Aitheantas na haipe | `online.omniroute.desktop`                                  |
| Ainm an táirge      | `OmniRoute`                                                 |

## Scripteanna ( root `package.json`)

| Script                            | Cuspóir                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Tosaíonn `npm run dev` + ag fanacht le `localhost:20128` + Seolann Electron          |
| `npm run electron:build`          | Tógann Next.js ansin ritheann `electron-builder` don OS reatha                       |
| `npm run electron:build:win`      | Tógann sé suiteálaí Windows NSIS + iniompartha (x64)                                 |
| `npm run electron:build:mac`      | Tógann macOS DMG (Intel + Apple Silicon)                                             |
| `npm run electron:build:linux`    | Tógann sé Linux AppImage + DEB (x64 + arm64)                                         |
| `npm run electron:smoke:packaged` | Seolann dénártha pacáistithe agus probes `/login` do HTTP 200, ansin stopann sé síos |

Nochtann spás oibre `electron/` freisin:

- ritheann `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs`
- Tógann `npm run build:mac-x64` / `build:mac-arm64` — aon-áirse macOS
- Tógáil eolaire `npm run pack` — amháin le haghaidh tástála áitiúil (gan suiteálaí)

## Pacáistí ama rite roghnacha

Is féidir le tógálacha deasc cartlanna roghnacha ama rite a fhoilsiú in éineacht lena suiteálaithe. Tá `optional-packs.index.json` (faoi `resources/app` ar Windows agus Linux) sa phálasta freastalaí suiteáilte. Le haghaidh an iontráil `browser-runtime`, léigh `packs[].tarball` agus íoslódáil** an comhadainm cruinn sin ón eisiúint céanna** . I measc na n-ainmneacha cartlainne tá achoimre SHA-256 ; d'fhéadfadh cartlanna éagsúla a bheith ag teastáil le haghaidh tógála éagsúla. Coinnigh an t-ainm comhaid íosluchtaithe gan athrú.

Cóipeáil innéacs na haipe suiteáilte agus an chartlann roghnaithe in aon eolaire amháin, ansin bain úsáid as an CLI ón scaoileadh céanna:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

Taispeánann `packs list` staid na suiteála agus an fhíoraithe, ní ainm an chomhaid cartlainne. Roghnaíonn an t-innéacs cuachta an chartlann. Fíoraíonn an suiteáil a seiceálacha cartlainne roimh eastóscadh agus a shuimeanna seiceála pacáiste sula n-athshocraítear pacáiste suiteáilte. Léann sé comhaid áitiúla; ní íoslódálann sé cartlanna in easnamh. Atosaigh an feidhmchlár tar éis é a shuiteáil. Mura bhfuil aon sócmhainn chomhoiriúnaithe ag an scaoileadh, níl an pacáiste roghnach ar fáil trí shócmhainní an scaoileadh sin.

## Leagan Amach Eolaire

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

Tá an dá `main.js` agus `preload.js`** Comhaid CommonJS `.js`** , ní TypeScript. Is i `electron/types.d.ts` a mhaireann na clóscríobháin rindreálaí.

## Droichead IPC (`preload.js`)

Nochtann an réamhualach API bánliostaithe ar `window.electronAPI` ag baint úsáide as `contextBridge` le `contextIsolation: true` agus `nodeIntegration: false`.

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

Modhanna nochta:

| Glao rindreálaí                                                   | Cineál                          |
| ----------------------------------------------------------------- | ------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | agairt                          |
| `openExternal(url)`                                               | agairt                          |
| `getDataDir()`                                                    | agairt                          |
| `restartServer()`                                                 | agairt                          |
| `getAppVersion()`                                                 | agairt                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | agairt                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | seol                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | faigh ( diúscróir tuairisceáin) |

Filleann na cúntóirí glacadóireachta a** feidhm diúscartha** seachas a bheith ag brath ar `removeAllListeners` — cuireann sé seo cosc ar charnadh éisteoir nuair a athshuiteálann comhpháirteanna React.

## Saolré Freastalaí

sceitheann `main.js` an beart neamhspleách Next.js go díreach le ham rite Nód Electron chun neamhréiriú ABI modúl dúchais le Nód an chórais a sheachaint:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Buaicphointí:

- Déanann `waitForServer()` vótaíocht ar an URL suas le 30 s sula dtaispeánfar an fhuinneog (gan aon scáileán bán ar thús fuar).
- gabhann `stdio: "pipe"` stdout/stderr; astaíonn frásaí réidh (`Ready` / `listening`) `server-status: running` thar IPC.
- fanann `before-quit` suas le 5 s le haghaidh SIGTERM galánta (seicphointe WAL ) ansin cuireann SIGKILL.
- Stopann lascóir calafoirt sa tráidire (`20128`, `3000`, `8080`) agus atosaíonn sé an freastalaí, ansin athlódálann sé an BrowserWindow.

## Bootstrap Rúnda nialais-config

Ar an gcéad seoladh, gineann an príomhphróiseas go huathoibríoch agus leanann sé de rún in easnamh:

| Rúnda                    | Foinse                                                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (diúltaíonn sé má tá creidiúintí criptithe ann cheana) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                        |

D'fhan sé go `<DATA_DIR>/server.env`. Tá rún ag `DATA_DIR` :

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` nó `~/.omniroute`
- macOS: `~/.omniroute`

## Cuardach comhaid comhshaoil

Sula sceitear an freastalaí, roghnóidh an príomhphróiseas (`getPreferredEnvFilePath()` in `electron/main.js`).** aon** `.env` file: an chéad cheann díobh seo atá ann.

1. `$DATA_DIR/.env`, nuair atá `DATA_DIR` socraithe sa timpeallacht a seoladh an aip leis.
2. `<resolved DATA_DIR>/.env`, ag baint úsáide as na réamhshocruithe céanna atá thuas: `%APPDATA%\omniroute\.env` ar Windows, `$XDG_CONFIG_HOME/omniroute/.env` nó `~/.omniroute/.env` ar Linux agus macOS.
3. `.env` san eolaire oibre próisis.

Ní léann an príomhphróiseas ach an comhad sin; ní dhéantar iarrthóirí níos déanaí a chumasc isteach. Tógtar timpeallacht an fhreastalaí ansin leis an tosaíocht seo (an ceann is airde ar dtús):

1. Timpeallacht an phróisis Electron (athróga a fuarthas le hoidhreacht ó cibé seoladh an app).
2. An comhad `.env` roghnaithe.
3. `<DATA_DIR>/server.env` (na rúin bootstrap thuas).

Gabhtar timpeallacht an phróisis nuair a thosaíonn an app, mar sin ní shroicheann sraith athróg córais nó timpeallachta úsáideora agus an app ag rith (lena n-áirítear cé go suíonn sé sa tráidire tar éis a fhuinneog a dhúnadh) an freastalaí go dtí go scorfar an app go hiomlán agus athsheoladh. Le haghaidh snaidhmeanna rite ar nós `CONTEXT_LENGTH_<PROVIDER>` (féach [Athróga Comhshaoil: fad comhthéacs an tsoláthraí](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), b'fhearr leat an comhad `.env`, ansin scor go hiomlán (tráidire,** Scoir** ) agus athsheoladh.

## Fuinneog & Tráidire

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, solas tráchta ag `{ x: 16, y: 16 }`.
- Windows/Linux: barra teidil dúchais.
- Íoslaghdaíonn an cnaipe dúnta don tráidire; tá an roghchlár tráidire** Oscail OmniRoute** ,** Oscail Painéal na nIonstraimí** (brabhsálaí seachtrach),** Port Freastalaí** fo-roghchlár,** Seiceáil le haghaidh Nuashonruithe** ,** Scoir** .

## Beartas Slándála Ábhar

Socraigh trí `session.defaultSession.webRequest.onHeadersReceived`. Treoracha suntasacha:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Cuireann mód Dev `'unsafe-eval'` le `script-src` amháin

## Nuashonrú uathoibríoch

Úsáideann sé `electron-updater` leis an soláthraí GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Imeachtaí curtha ar aghaidh chuig rindreálaí trí `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (le `percent`), `downloaded`, `error`
- Maraíonn `installUpdate()` an freastalaí ansin glaonna `autoUpdater.quitAndInstall()`
- Léimeadh i mód dev (`!app.isPackaged`)

## Tógáil Píblíne

1. `npm run build` → Next.js ina aonar i `.next/standalone`.
2. déanann `prepare-electron-standalone.mjs` → athchéimniú isteach i `.next/electron-standalone` agus athscríobhann sé cosáin iomlána taobh istigh `server.js` + `required-server-files.json` ionas gur féidir an beart a athlonnú.
3. pacáistí `electron-builder` `main.js`, `preload.js`, `node_modules`, agus `extraResources: { ../.next/electron-standalone → app }`.

### Tóg spriocanna

| OS      | Spriocanna                                    |
| ------- | --------------------------------------------- |
| Windows | suiteálaí NSIS + iniompartha (x64)            |
| macOS   | DMG (Intel + arm64, tarraing go Feidhmchláir) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

socruithe NSIS : `oneClick: false`, ligeann don úsáideoir an t-eolaire suiteála a roghnú, cruthaíonn sé aicearraí Deisce agus Roghchláir Tosaigh.

## Tógáil Pacáilte Tástáil Smoke

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Auto-aimsíonn an dénártha pacáistithe i `electron/dist-electron/` don ardán reatha.
- Seoltar le heolairí scoite `HOME`/`APPDATA`/`XDG_*` ionas nach ndéanann sé teagmháil le sonraí forbróra.
- Vótaí `http://127.0.0.1:20128/login` do HTTP 200 laistigh de 45 s.
- Uaireadóirí stderr/stdout le haghaidh patrúin marfach (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc .).
- Fanann sé 2 s d'am rite cobhsaí tar éis ullmhachta, eisíonn sé SIGTERM ansin agus fanfaidh sé go mbeidh an calafort saor.
- I CI, téann `--no-sandbox --disable-gpu` (agus `--disable-dev-shm-usage` ar Linux) go huathoibríoch.

Sáraíonn Env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Síniú Cóid

dhéanann `electron/package.json`** nach bhfuil** dintiúir síniú sreinge go díreach. Cuir ar aghaidh iad trí env vars go `electron-builder`:

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

Tá síniú AppImage roghnach — set `LINUX_GPG_KEY` má tá tú ag síniú.

## Dáileadh

Artifacts i dtír i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Foilsítear eisiúintí chuig GitHub Releases (`diegosouzapw/OmniRoute`), agus is é sin freisin an áit a seiceálann `electron-updater` le haghaidh leaganacha nua.

## Fabhtcheartú

| Siomptóim                                                       | Deisigh                                                                                                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` tar éis Electron bump mór | déanann better-sqlite3 v13 longa Nód-API réamhthógáil — athreáchtáil `npm install` ag an bhfréamh agus `prepare:bundle` (deimhníonn sé an réamhthógáil don ardán reatha) |
| `ERR_DLOPEN_FAILED` don mhodúl dúchais                          | Reáchtáil `prepare:bundle` — teipeann air go tapa nuair atá réamhthógáil Node-API don ardán reatha in easnamh                                                            |
| Tá an chuma ar an bhfuinneog bán ar Linux                       | Deimhnigh freastalaí Next.js i ndáiríre faoi cheangal PORT (seiceáil logaí `[Server]` )                                                                                  |
| stallaí notarization macOS                                      | Cinntigh go ndéantar `APPLE_*` vars a onnmhairiú, ní hamháin i `.env`                                                                                                    |
| rabhadh Windows SmartScreen                                     | Sínigh le EV cert, nó cliceáil ar dheis ag úsáideoirí → "Rith ar aon nós"                                                                                                |
| Teipeann ar thástáil deataigh leis an bport-in-úsáide           | Stop aon fhreastalaí dev áitiúil ar 20128 roimh rith `electron:smoke:packaged`                                                                                           |

## Féach Chomh maith leis sin

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Foinse: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Cúntóirí: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
