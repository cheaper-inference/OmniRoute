# Electron Desktop Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Източник на истината:** `electron/` работно пространство** Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute доставя междуплатформено настолно приложение (Windows / macOS / Linux), изградено на**Electron 41** +** електрон-строител 26.10** . Приложението за настолни компютри създава Next.js самостоятелния сървър като дъщерен процес, насочва `BrowserWindow` към него и добавя системен трей, автоматична актуализация, IPC мост и секретно зареждане с нулева конфигурация.

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

## Версии

Потвърдено от `electron/package.json`:

| Пакет                  | Версия                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ |
| `electron`             | `^43.4.1`                                                                      |
| `electron-builder`     | `^26.15.3`                                                                     |
| `electron-updater`     | `^6.8.9`                                                                       |
| `better-sqlite3`       | root `^13.0.2` (Node-API изгражда предварително — без преизграждане Electron ) |
| Версия на приложението | `3.8.0`                                                                        |
| ID на приложението     | `online.omniroute.desktop`                                                     |
| Име на продукта        | `OmniRoute`                                                                    |

## Скриптове (корен `package.json`)

| Скрипт                            | Цел                                                                                     |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Стартира `npm run dev` + чака `localhost:20128` + стартира Electron                     |
| `npm run electron:build`          | Създава Next.js след което изпълнява `electron-builder` за текущия OS                   |
| `npm run electron:build:win`      | Изгражда Windows NSIS инсталатор + portable (x64)                                       |
| `npm run electron:build:mac`      | Изгражда macOS DMG (Intel + Apple Silicon)                                              |
| `npm run electron:build:linux`    | Изгражда Linux AppImage + DEB (x64 + arm64)                                             |
| `npm run electron:smoke:packaged` | Стартира пакетиран двоичен файл и изследва `/login` за HTTP 200, след което се изключва |

Работното пространство `electron/` също излага:

- `npm run prepare:bundle` — изпълнява `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS компилации с една арка
- `npm run pack` — компилация само за директория за локално тестване (без инсталатор)

## Опционални пакети за изпълнение

Десктоп компилациите могат да публикуват незадължителни архиви по време на изпълнение заедно със своите инсталатори. Полезният товар на инсталирания сървър съдържа `optional-packs.index.json` (под `resources/app` на Windows и Linux). За записа `browser-runtime` прочетете `packs[].tarball` и изтеглете** това точно име на файл от същата версия** . Имената на архивите включват SHA-256 дайджест; различните компилации могат да изискват различни архиви. Запазете името на изтегления файл непроменено.

Копирайте индекса на инсталираното приложение и избрания архив в една директория, след което използвайте CLI от същата версия:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` показва състоянието на инсталация и проверка, а не името на архивния файл. Пакетният индекс избира архива. Инсталацията проверява своята архивна контролна сума преди извличане и своите контролни суми на пакети, преди да замени инсталиран пакет. Той чете локални файлове; не изтегля липсващи архиви. Рестартирайте приложението след инсталиране. Ако изданието няма съответстващ актив, незадължителният пакет не е наличен чрез активите на това издание.

## Оформление на директорията

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

И `main.js`, и `preload.js` са**CommonJS `.js` файлове** , а не TypeScript. Въвеждането от страната на рендера се намира в `electron/types.d.ts`.

## IPC мост (`preload.js`)

Предварителното зареждане излага API в белия списък на `window.electronAPI` използвайки `contextBridge` с `contextIsolation: true` и `nodeIntegration: false`.

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

Изложени методи:

| Извикване на Renderer                                             | Тип                         |
| ----------------------------------------------------------------- | --------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | извиквам                    |
| `openExternal(url)`                                               | извиквам                    |
| `getDataDir()`                                                    | извиквам                    |
| `restartServer()`                                                 | извиквам                    |
| `getAppVersion()`                                                 | извиквам                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | извиквам                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | изпрати                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | получавам (изхвърлящ връща) |

Помощниците за получаване връщат a** функция диспозер** вместо да разчита на `removeAllListeners` — това предотвратява натрупването на слушатели, когато React компонентите се монтират отново.

## Жизнен цикъл на сървъра

`main.js` ражда самостоятелния пакет Next.js директно със средата за изпълнение Electron Node, за да избегне несъответствието ABI основния модул със системния възел:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Акценти:

- `waitForServer()` анкетира URL до 30 секунди, преди да покаже прозореца (без празен екран при студен старт).
- `stdio: "pipe"` улавя stdout/stderr; готови фрази (`Ready` / `listening`) излъчват `server-status: running` над IPC.
- `before-quit` чака до 5 секунди за грациозен SIGTERM (контролна точка WAL ), след което изпраща SIGKILL.
- Превключвателят на портове в трея (`20128`, `3000`, `8080`) спира и рестартира сървъра, след което презарежда BrowserWindow.

## Zero-config Secret Bootstrap

При първото стартиране основният процес автоматично генерира и запазва липсващите тайни:

| Тайна                    | Източник                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                    |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (отказва, ако вече съществуват криптирани кредити) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                    |

Упорства до `<DATA_DIR>/server.env`. `DATA_DIR` разрешава на:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` или `~/.omniroute`
- macOS: `~/.omniroute`

## Търсене на файл в средата

Преди да създаде сървъра, главният процес (`getPreferredEnvFilePath()` в `electron/main.js`) избира** един** `.env` файл: първият от тях, който съществува.

1. `$DATA_DIR/.env`, когато `DATA_DIR` е зададен в средата, с която е стартирано приложението.
2. `<resolved DATA_DIR>/.env`, използвайки същите настройки по подразбиране като по-горе: `%APPDATA%\omniroute\.env` на Windows, `$XDG_CONFIG_HOME/omniroute/.env` или `~/.omniroute/.env` на Linux и macOS.
3. `.env` в работната директория на процеса.

Главният процес чете само този файл; по-късните кандидати не се обединяват. След това сървърната среда се изгражда с този приоритет (най-високият първи):

1. Процесната среда Electron (променливи, наследени от това, което стартира приложението).
2. Избраният `.env` файл.
3. `<DATA_DIR>/server.env` (тайните на bootstrap по-горе).

Средата на процеса се улавя, когато приложението се стартира, така че системна или потребителска променлива на средата, зададена, докато приложението работи (включително докато стои в трея, след като прозорецът му е затворен), не достига до сървъра, докато приложението не бъде напълно затворено и стартирано отново. За копчета за изпълнение, като например `CONTEXT_LENGTH_<PROVIDER>` (вижте [Променливи на средата: Дължина на контекста за всеки доставчик](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), предпочитайте `.env` файла, след което излезте напълно (тава,** Откажете се** ) и рестартирайте.

## Прозорец и табла

- `BrowserWindow`: 1400 × 900 (мин. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, светофар при `{ x: 16, y: 16 }`.
- Windows/Linux: естествена заглавна лента.
- Бутонът за затваряне минимизира в трея; менюто в трея има** Отворете OmniRoute** ,** Отворете таблото за управление** (външен браузър),** Сървърен порт** подменю,** Проверете за актуализации** ,** Откажете се** .

## Политика за сигурност на съдържанието

Задайте чрез `session.defaultSession.webRequest.onHeadersReceived`. Забележителни директиви:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Режимът Dev добавя `'unsafe-eval'` само към `script-src`

## Автоматична актуализация

Използва `electron-updater` с доставчика GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Събития, препратени към рендъра чрез `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (с `percent`), `downloaded`, `error`
- `installUpdate()` убива сървъра, след което извиква `autoUpdater.quitAndInstall()`
- Пропуснато в режим за разработка (`!app.isPackaged`)

## Изграждане на тръбопровод

1. `npm run build` → Next.js самостоятелен в `.next/standalone`.
2. `prepare-electron-standalone.mjs` → преминава отново в `.next/electron-standalone` и пренаписва абсолютните пътища вътре в `server.js` + `required-server-files.json` така че пакетът може да се премести.
3. `electron-builder` пакети `main.js`, `preload.js`, `node_modules` и `extraResources: { ../.next/electron-standalone → app }`.

### Изграждане на цели

| OS      | Цели                                         |
| ------- | -------------------------------------------- |
| Windows | NSIS инсталатор + portable (x64)             |
| macOS   | DMG (Intel + arm64, плъзгане към приложения) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS настройки: `oneClick: false`, позволява на потребителя да избере директорията за инсталиране, създава преки пътища на работния плот и менюто "Старт".

## Опакована конструкция за тестване на дим

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Автоматично открива пакетирания двоичен файл в `electron/dist-electron/` за текущата платформа.
- Стартира с изолирани `HOME`/`APPDATA`/`XDG_*` директории, така че да не докосва данните на разработчиците.
- Анкети `http://127.0.0.1:20128/login` за HTTP 200 в рамките на 45 s.
- Следи stderr/stdout за фатални модели (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` и др.).
- Изчаква 2 s стабилно време на изпълнение след готовност, след което издава SIGTERM и изчаква портът да се освободи.
- В CI автоматично преминава `--no-sandbox --disable-gpu` (и `--disable-dev-shm-usage` на Linux).

Env отменя: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Подписване на код

`electron/package.json` прави** не** директно подписване на идентификационни данни. Предайте ги чрез env vars към `electron-builder`:

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

AppImage подписването не е задължително — set `LINUX_GPG_KEY` ако се подписва.

## Разпределение

Артефактите се приземяват в `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Изданията се публикуват в GitHub Releases (`diegosouzapw/OmniRoute`), където също така `electron-updater` проверява за нови версии.

## Отстраняване на неизправности

| Симптом                                                        | Поправете                                                                                                                                                                                             |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` след Electron голям удар | better-sqlite3 v13 изпраща предварителни компилации на Node-API — повторно стартиране на `npm install` в основата и `prepare:bundle` (той проверява предварителната компилация за текущата платформа) |
| `ERR_DLOPEN_FAILED` за собствен модул                          | Стартирайте отново `prepare:bundle` — той се проваля бързо, когато липсва предварителното компилиране на Node-API за текущата платформа                                                               |
| Прозорецът изглежда празен на Linux                            | Потвърдете, че Next.js сървърът действително е свързан към PORT (проверете `[Server]` регистрационните файлове)                                                                                       |
| macOS нотариална заверка                                       | Уверете се, `APPLE_*` vars се експортират, а не само в `.env`                                                                                                                                         |
| Windows SmartScreen предупреждение                             | Подпишете с EV сертификат или потребителите щракнете с десния бутон върху → „Изпълни въпреки това“                                                                                                    |
| Тестът за дим е неуспешен с порт в употреба                    | Спрете всеки локален сървър за разработка на 20128, преди да стартирате `electron:smoke:packaged`                                                                                                     |

## Вижте също

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Източник: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Помощници: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
