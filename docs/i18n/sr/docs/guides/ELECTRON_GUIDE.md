# Electron Desktop Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Извор истине:** `electron/` радни простор** Последње ажурирано:** 2026-06-28 — в3.8.40

OmniRoute испоручује десктоп апликацију за више платформи (Windows / macOS / Linux) изграђену на**Electron 41** +** градитељ електрона 26.10** . Апликација за десктоп рачунаре покреће Next.js самостални сервер као подређени процес, усмерава `BrowserWindow` на њега и додаје системску палету, аутоматско ажурирање, IPC бридге и тајни стартер са нултом конфигурацијом.

## Архитектура

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

## Верзије

Потврђено од `electron/package.json`:

| Пакет              | Верзија                                                         |
| ------------------ | --------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                       |
| `electron-builder` | `^26.15.3`                                                      |
| `electron-updater` | `^6.8.9`                                                        |
| `better-sqlite3`   | роот `^13.0.2` (Ноде-АПИ унапред гради — без ребуилд Electron ) |
| Верзија апликације | `3.8.0`                                                         |
| ИД апликације      | `online.omniroute.desktop`                                      |
| Назив производа    | `OmniRoute`                                                     |

## Скрипте (роот `package.json`)

| Скрипта                           | Сврха                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Покреће `npm run dev` + чека `localhost:20128` + покреће Electron                   |
| `npm run electron:build`          | Гради Next.js а затим покреће `electron-builder` за тренутни OS                     |
| `npm run electron:build:win`      | Израђује Windows NSIS инсталатер + портабле (к64)                                   |
| `npm run electron:build:mac`      | Израђује macOS DMG (Интел + Аппле Силицон)                                          |
| `npm run electron:build:linux`    | Прави Linux AppImage + DEB (к64 + арм64)                                            |
| `npm run electron:smoke:packaged` | Покреће упаковану бинарну датотеку и испитује `/login` за HTTP 200, а затим се гаси |

`electron/` радни простор такође излаже:

- `npm run prepare:bundle` — покреће `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — једнолучне macOS граде
- `npm run pack` — верзија само за директоријум за локално тестирање (без инсталатера)

## Опциони пакети за време извршавања

Десктоп верзије могу да објаве опционе архиве времена извршавања заједно са својим инсталатерима. Инсталирани сервер садржи `optional-packs.index.json` (под `resources/app` на Windows и Linux). За унос `browser-runtime`, прочитајте `packs[].tarball` и преузмите** то тачно име датотеке из истог издања** . Имена архива укључују SHA-256 сажетак; различите грађе могу захтевати различите архиве. Задржите назив преузете датотеке непромењен.

Копирајте индекс инсталиране апликације и изабрану архиву у један директоријум, а затим користите CLI из истог издања:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` приказује стање инсталације и верификације, а не име архивске датотеке. Индекс у пакету бира архиву. Инсталација верификује контролну суму архиве пре екстракције и контролну суму свог пакета пре замене инсталираног пакета. Чита локалне датотеке; не преузима архиве које недостају. Поново покрените апликацију након инсталације. Ако издање нема одговарајуће средство, опциони пакет није доступан преко средстава тог издања.

## Изглед директоријума

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

И `main.js` и `preload.js` су**CommonJS `.js` датотеке** , не TypeScript. Откуцаји на страни рендерера живе у `electron/types.d.ts`.

## IPC мост (`preload.js`)

Предучитавање излаже API са беле листе на `window.electronAPI` користећи `contextBridge` са `contextIsolation: true` и `nodeIntegration: false`.

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

Изложене методе:

| Рендерер цалл                                                     | Тип                      |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | призивати                |
| `openExternal(url)`                                               | призивати                |
| `getDataDir()`                                                    | призивати                |
| `restartServer()`                                                 | призивати                |
| `getAppVersion()`                                                 | призивати                |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | призивати                |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | послати                  |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | примити (враћа диспосер) |

Примаоци враћају а** функција диспозера** уместо ослањања на `removeAllListeners` — ово спречава акумулацију слушалаца када се React компоненте поново монтирају.

## Животни циклус сервера

`main.js` покреће Next.js самостални пакет директно са Electron ноде рунтиме-ом да би се избегло неслагање ABI изворног модула са системским чвором:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Најважније:

- `waitForServer()` анкетира URL до 30 с пре него што прикаже прозор (нема празног екрана при хладном старту).
- `stdio: "pipe"` хвата stdout/stderr; спремне фразе (`Ready` / `listening`) емитују `server-status: running` преко IPC.
- `before-quit` чека до 5 с на грациозан SIGTERM (WAL контролна тачка), а затим шаље SIGKILL.
- Пребацивач портова у траи (`20128`, `3000`, `8080`) зауставља и поново покреће сервер, а затим поново учитава BrowserWindow.

## Тајни Боотстрап са нултом конфигурацијом

Приликом првог покретања, главни процес аутоматски генерише и задржава тајне које недостају:

| Тајна                    | Извор                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (одбија ако шифровани кредити већ постоје) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                            |

Упорно `<DATA_DIR>/server.env`. `DATA_DIR` решава на:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` или `~/.omniroute`
- macOS: `~/.omniroute`

## Тражење датотеке окружења

Пре покретања сервера, главни процес (`getPreferredEnvFilePath()` у `electron/main.js`) бира** један** `.env` датотека: прва од ових која постоји.

1. `$DATA_DIR/.env`, када је `DATA_DIR` подешен у окружењу са којим је апликација покренута.
2. `<resolved DATA_DIR>/.env`, користећи исте подразумеване вредности као горе: `%APPDATA%\omniroute\.env` на Windows, `$XDG_CONFIG_HOME/omniroute/.env` или `~/.omniroute/.env` на Linux и macOS.
3. `.env` у радном директорију процеса.

Главни процес чита само ту датотеку; каснији кандидати се не спајају. Серверско окружење се тада гради са овим приоритетом (прво највише):

1. Electron процесно окружење (варијабле наслеђене од онога што је покренуло апликацију).
2. Изабрана `.env` датотека.
3. `<DATA_DIR>/server.env` (горе тајне за покретање).

Процесно окружење се снима када се апликација покрене, тако да променљива системског или корисничког окружења постављена док је апликација покренута (укључујући и док се налази у траци након што је прозор затворен) не стиже до сервера док се апликација потпуно не затвори и поново покрене. За дугмад за време извршавања као што је `CONTEXT_LENGTH_<PROVIDER>` (погледајте [Променљиве окружења: дужина контекста по добављачима](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), дајте предност `.env` фајлу, а затим га потпуно затворите (треј,** Одустани** ) и поново покрените.

## Прозор и лежиште

- `BrowserWindow`: 1400 × 900 (мин 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, семафор на `{ x: 16, y: 16 }`.
- Windows/Linux: изворна насловна трака.
- Дугме за затварање минимизира у лежиште; мени у траци има** Отвори OmniRoute** ,** Отворите контролну таблу** (спољни претраживач),** Порт сервера** подмени,** Проверите ажурирања** ,** Одустани** .

## Политика безбедности садржаја

Поставите преко `session.defaultSession.webRequest.onHeadersReceived`. Значајне директиве:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Дев режим додаје `'unsafe-eval'` само у `script-src`

## Аутоматско ажурирање

Користи `electron-updater` са GitHub провајдером (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Догађаји се прослеђују рендереру преко `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (са `percent`), `downloaded`, `error`
- `installUpdate()` убија сервер, а затим позива `autoUpdater.quitAndInstall()`
- Прескочено у дев моду (`!app.isPackaged`)

## Буилд Пипелине

1. `npm run build` → Next.js самостално у `.next/standalone`.
2. `prepare-electron-standalone.mjs` → поново ступа у `.next/electron-standalone` и поново пише апсолутне путање унутар `server.js` + `required-server-files.json` тако да се пакет може премештати.
3. `electron-builder` пакети `main.js`, `preload.js`, `node_modules` и `extraResources: { ../.next/electron-standalone → app }`.

### Изградите мете

| OS      | Циљеви                                      |
| ------- | ------------------------------------------- |
| Windows | NSIS инсталатер + портабле (к64)            |
| macOS   | DMG (Интел + арм64, превуците у апликације) |
| Linux   | AppImage + DEB (к64 + арм64)                |

NSIS подешавања: `oneClick: false`, омогућава кориснику да изабере директоријум за инсталацију, креира пречице за радну површину и мени Старт.

## Упакована верзија за тестирање дима

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Аутоматски открива упаковану бинарну датотеку у `electron/dist-electron/` за тренутну платформу.
- Покреће се са изолованим директоријумима `HOME`/`APPDATA`/`XDG_*` тако да не додирује податке програмера.
- Анкете `http://127.0.0.1:20128/login` за HTTP 200 у року од 45 с.
- Гледа stderr/stdout на фаталне обрасце (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, итд.).
- Чека 2 с стабилног времена рада након спремности, затим издаје SIGTERM и чека да се порт ослободи.
- У CI, аутоматски прослеђује `--no-sandbox --disable-gpu` (и `--disable-dev-shm-usage` на Linux).

Енв замењује: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Потписивање кода

`electron/package.json` доес** не** директно потписивање акредитива. Проследите их преко енв варс у `electron-builder`:

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

AppImage потписивање је опционо — сет `LINUX_GPG_KEY` ако потписивање.

## Дистрибуција

Артефакти слете у `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Издања се објављују у GitHub издањима (`diegosouzapw/OmniRoute`), где `electron-updater` проверава да ли постоје нове верзије.

## Решавање проблема

| Симптом                                                          | Поправи                                                                                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` после Electron главни удар | better-sqlite3 в13 испоручује ноде-АПИ пре-буилдс — поново покрените `npm install` у корену и `prepare:bundle` (он верификује пребуилд за тренутну платформу) |
| `ERR_DLOPEN_FAILED` за изворни модул                             | Поново покрените `prepare:bundle` — брзо не успева када недостаје Ноде-АПИ унапред изграђен за тренутну платформу                                             |
| Прозор је празан на Linux                                        | Потврдите Next.js сервер стварно везан за PORT (проверите `[Server]` евиденције)                                                                              |
| macOS оверавање тезги                                            | Уверите се да се `APPLE_*` варс извозе, не само у `.env`                                                                                                      |
| Windows SmartScreen упозорење                                    | Потпишите се са EV цертом или корисници кликну десним тастером → „Ипак покрени“                                                                               |
| Тест дима не успева са прикључком у употреби                     | Зауставите било који локални дев сервер на 20128 пре него што покренете `electron:smoke:packaged`                                                             |

## Види такође

- [SETUP_GUIDE.мд](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.мд](../ops/RELEASE_CHECKLIST.md)
- Извор: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Помоћници: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
