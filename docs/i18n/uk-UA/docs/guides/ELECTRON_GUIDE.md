# Electron Desktop Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Джерело правди:** робоча область `electron/`** Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute постачає кросплатформну настільну програму (Windows / macOS / Linux), побудовану на**Electron 41** +** електрон-будівельник 26.10** . Програма для настільного комп’ютера створює автономний сервер Next.js як дочірній процес, вказує на нього `BrowserWindow` і додає системний лоток, засіб автоматичного оновлення, міст IPC і секретну завантажувальну програму без конфігурації.

## Архітектура

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

## Версії

Підтверджено з `electron/package.json`:

| Пакет                  | Версія                                                                     |
| ---------------------- | -------------------------------------------------------------------------- |
| `electron`             | `^43.4.1`                                                                  |
| `electron-builder`     | `^26.15.3`                                                                 |
| `electron-updater`     | `^6.8.9`                                                                   |
| `better-sqlite3`       | root `^13.0.2` (Node-API попередньо збирає — але не перебудовує Electron ) |
| Версія програми        | `3.8.0`                                                                    |
| Ідентифікатор програми | `online.omniroute.desktop`                                                 |
| Назва товару           | `OmniRoute`                                                                |

## Скрипти (корінь `package.json`)

| Сценарій                          | призначення                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Запускає `npm run dev` + чекає на `localhost:20128` + запускає Electron                   |
| `npm run electron:build`          | Створює Next.js а потім запускає `electron-builder` для поточного OS                      |
| `npm run electron:build:win`      | Збірки Windows NSIS installer + portable (x64)                                            |
| `npm run electron:build:mac`      | Збирає macOS DMG (Intel + Apple Silicon)                                                  |
| `npm run electron:build:linux`    | Збірки Linux AppImage + DEB (x64 + arm64)                                                 |
| `npm run electron:smoke:packaged` | Запускає упакований двійковий файл і перевіряє `/login` для HTTP 200, а потім вимикається |

Робоча область `electron/` також надає:

- `npm run prepare:bundle` — запускає `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — одноаркові збірки macOS
- `npm run pack` — тільки каталог збірки для локального тестування (без інсталятора)

## Додаткові пакети часу виконання

Збірки робочого столу можуть публікувати додаткові архіви середовища виконання разом зі своїми інсталяторами. Корисне навантаження встановленого сервера містить `optional-packs.index.json` (під `resources/app` на Windows і Linux). Для запису `browser-runtime` прочитайте `packs[].tarball` і завантажте** точна назва файлу з того самого випуску** . Назви архівів включають дайджест SHA-256 ; для різних збірок можуть знадобитися різні архіви. Залиште назву завантаженого файлу без змін.

Скопіюйте індекс встановленої програми та вибраний архів в один каталог, а потім використовуйте CLI з того самого випуску:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` відображає стан встановлення та перевірки, а не назву файлу архіву. Поєднаний покажчик вибирає архів. Інсталяція перевіряє свою контрольну суму архіву перед розпакуванням і контрольні суми пакетів перед заміною встановленого пакета. Читає локальні файли; він не завантажує відсутні архіви. Перезапустіть програму після встановлення. Якщо реліз не має відповідного ресурсу, додатковий пакет недоступний через активи цього випуску.

## Макет каталогу

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

І `main.js`, і `preload.js` є** файли CommonJS `.js`** , а не TypeScript. Типи на стороні рендерера знаходяться в `electron/types.d.ts`.

## Міст IPC (`preload.js`)

Попереднє завантаження відкриває API з білого списку на `window.electronAPI` за допомогою `contextBridge` із `contextIsolation: true` і `nodeIntegration: false`.

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

Виявлені методи:

| Виклик рендерера                                                  | Тип                          |
| ----------------------------------------------------------------- | ---------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | викликати                    |
| `openExternal(url)`                                               | викликати                    |
| `getDataDir()`                                                    | викликати                    |
| `restartServer()`                                                 | викликати                    |
| `getAppVersion()`                                                 | викликати                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | викликати                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | надіслати                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | отримати (повертає диспозер) |

Помічники прийому повертаються a** функція диспозера** замість того, щоб покладатися на `removeAllListeners` — це запобігає накопиченню слухачів під час повторного монтування компонентів React.

## Життєвий цикл сервера

`main.js` створює окремий комплект Next.js безпосередньо з середовищем виконання Electron Node, щоб уникнути невідповідності ABI нативного модуля з системним вузлом:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Основні моменти:

- `waitForServer()` опитує URL до 30 с, перш ніж показати вікно (без порожнього екрана під час холодного запуску).
- `stdio: "pipe"` фіксує stdout/stderr; готові фрази (`Ready` / `listening`) видають `server-status: running` поверх IPC.
- `before-quit` чекає до 5 секунд на витончений SIGTERM (контрольна точка WAL ), а потім надсилає SIGKILL.
- Перемикач портів у треї (`20128`, `3000`, `8080`) зупиняє та перезапускає сервер, а потім перезавантажує BrowserWindow.

## Zero-config Secret Bootstrap

Під час першого запуску основний процес автоматично генерує та зберігає відсутні секрети:

| Секрет                   | Джерело                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (відмовляється, якщо вже існують зашифровані облікові записи) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                               |

Наполягав на `<DATA_DIR>/server.env`. `DATA_DIR` вирішує:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` або `~/.omniroute`
- macOS: `~/.omniroute`

## Пошук файлів середовища

Перш ніж створити сервер, головний процес (`getPreferredEnvFilePath()` в `electron/main.js`) вибирає** один** файл `.env` : перший із існуючих.

1. `$DATA_DIR/.env`, коли `DATA_DIR` встановлено в середовищі, з яким було запущено програму.
2. `<resolved DATA_DIR>/.env`, використовуючи ті самі значення за замовчуванням, що й вище: `%APPDATA%\omniroute\.env` на Windows, `$XDG_CONFIG_HOME/omniroute/.env` або `~/.omniroute/.env` на Linux і macOS.
3. `.env` в робочому каталозі процесу.

Головний процес читає лише цей файл; пізніші кандидати не об’єднуються. Тоді серверне середовище створюється з таким пріоритетом (найвищий спочатку):

1. Середовище процесу Electron (змінні, успадковані від того, що запускає програму).
2. Вибраний файл `.env`.
3. `<DATA_DIR>/server.env` (секрети початкового завантаження вище).

Середовище процесу фіксується під час запуску програми, тому системна або користувальницька змінна середовища, встановлена під час роботи програми (зокрема, коли вона знаходиться в треї після закриття її вікна), не досягає сервера, доки програму не буде повністю вимкнено та повторно запущено. Для ручок виконання, таких як `CONTEXT_LENGTH_<PROVIDER>` (див. [Змінні середовища: довжина контексту для кожного постачальника](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), віддайте перевагу файлу `.env`, а потім повністю закрийте (лоток,** Вийти** ) і перезапустіть.

## Вікно та лоток

- `BrowserWindow`: 1400 × 900 (мін. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, світлофор на `{ x: 16, y: 16 }`.
- Windows/Linux: рідний рядок заголовка.
- Кнопка закриття згортається в трей; меню трея має** Відкрийте OmniRoute** ,** Відкрийте інформаційну панель** (зовнішній браузер),** Порт сервера** підменю,** Перевірте наявність оновлень** ,** Вийти** .

## Політика безпеки вмісту

Встановити через `session.defaultSession.webRequest.onHeadersReceived`. Відомі директиви:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Режим розробника додає лише `'unsafe-eval'` до `script-src`

## Автоматичне оновлення

Використовує `electron-updater` з провайдером GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Події, що пересилаються до рендерера через `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (із `percent`), `downloaded`, `error`
- `installUpdate()` вимикає сервер, а потім викликає `autoUpdater.quitAndInstall()`
- Пропущено в режимі розробника (`!app.isPackaged`)

## Побудувати трубопровід

1. `npm run build` → Next.js автономний у `.next/standalone`.
2. `prepare-electron-standalone.mjs` → переходить у `.next/electron-standalone` і переписує абсолютні шляхи всередині `server.js` + `required-server-files.json`, тому комплект можна перемістити.
3. пакети `electron-builder` `main.js`, `preload.js`, `node_modules` і `extraResources: { ../.next/electron-standalone → app }`.

### Будуйте цілі

| OS      | Цілі                                          |
| ------- | --------------------------------------------- |
| Windows | інсталятор NSIS + portable (x64)              |
| macOS   | DMG (Intel + arm64, перетягування до програм) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Налаштування NSIS : `oneClick: false`, дозволяє користувачеві вибрати каталог встановлення, створює ярлики робочого столу та меню «Пуск».

## Випробування на дим упакованої збірки

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Автоматично виявляє упакований двійковий файл у `electron/dist-electron/` для поточної платформи.
- Запускається з ізольованими каталогами `HOME`/`APPDATA`/`XDG_*`, тому не торкається даних розробників.
- Опитування `http://127.0.0.1:20128/login` для HTTP 200 протягом 45 с.
- Переглядає stderr/stdout на фатальні шаблони (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` тощо).
- Очікує 2 секунди стабільного виконання після готовності, потім видає SIGTERM та чекає, поки порт звільниться.
- У CI автоматично передає `--no-sandbox --disable-gpu` (і `--disable-dev-shm-usage` на Linux).

Env замінює: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Підписання коду

`electron/package.json` робить** ні** безпосереднє підписання облікових даних. Передайте їх через env vars до `electron-builder`:

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

AppImage підпис є необов’язковим — встановити `LINUX_GPG_KEY` якщо підпис.

## Розподіл

Артефакти приземляються в `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Релізи публікуються в GitHub Releases (`diegosouzapw/OmniRoute`), де також `electron-updater` перевіряє наявність нових версій.

## Усунення несправностей

| Симптом                                                           | Виправити                                                                                                                                                                     |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` після Electron великий удар | better-sqlite3 v13 постачає попередні збірки Node-API — повторно запустіть `npm install` у корені та `prepare:bundle` (він перевіряє попередню збірку для поточної платформи) |
| `ERR_DLOPEN_FAILED` для рідного модуля                            | Повторно запустіть `prepare:bundle` —, якщо відсутня попередня збірка Node-API для поточної платформи.                                                                        |
| На Linux вікно порожнє                                            | Підтвердьте, що сервер Next.js фактично прив’язаний до PORT (перевірте журнали `[Server]` )                                                                                   |
| macOS нотаріальне засвідчення                                     | Переконайтеся, що змінні `APPLE_*` експортуються, а не лише в `.env`                                                                                                          |
| Windows SmartScreen попередження                                  | Підпишіться за допомогою сертифіката EV або користувачі клацнуть правою кнопкою миші → «Усе одно запустити»                                                                   |
| Тест на дим не вдається з портом у використанні                   | Перед запуском `electron:smoke:packaged` зупиніть будь-який локальний сервер розробників на 20128                                                                             |

## Дивіться також

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Джерело: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Помічники: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
