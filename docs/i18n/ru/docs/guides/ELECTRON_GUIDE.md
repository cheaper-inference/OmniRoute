# Electron Desktop Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Источник истины:** рабочее пространство `electron/`** Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute представляет кроссплатформенное настольное приложение (Windows / macOS / Linux), построенное на**Electron 41** +** электронщик 26.10** . Настольное приложение порождает автономный сервер Next.js как дочерний процесс, указывает на него `BrowserWindow` и добавляет системный трей, средство автоматического обновления, мост IPC и секретную загрузочную загрузку с нулевой конфигурацией.

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

Подтверждено от `electron/package.json`:

| Упаковка                 | Версия                                                                       |
| ------------------------ | ---------------------------------------------------------------------------- |
| `electron`               | `^43.4.1`                                                                    |
| `electron-builder`       | `^26.15.3`                                                                   |
| `electron-updater`       | `^6.8.9`                                                                     |
| `better-sqlite3`         | root `^13.0.2` (предварительная сборка Node-API — без перестройки Electron ) |
| Версия приложения        | `3.8.0`                                                                      |
| Идентификатор приложения | `online.omniroute.desktop`                                                   |
| Название продукта        | `OmniRoute`                                                                  |

## Скрипты (корневой `package.json`)

| Скрипт                            | Цель                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Запускает `npm run dev` + ждет `localhost:20128` + запускает Electron                                 |
| `npm run electron:build`          | Собирает Next.js, затем запускает `electron-builder` для текущего OS                                  |
| `npm run electron:build:win`      | Собирает Windows NSIS установщик + портативный (x64)                                                  |
| `npm run electron:build:mac`      | Сборка macOS DMG (Intel + Apple Silicon)                                                              |
| `npm run electron:build:linux`    | Сборка Linux AppImage + DEB (x64 + Arm64)                                                             |
| `npm run electron:smoke:packaged` | Запускает упакованный двоичный файл и проверяет `/login` на наличие HTTP 200, затем завершает работу. |

Рабочее пространство `electron/` также предоставляет:

- `npm run prepare:bundle` — запускает `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — сборки macOS с одной аркой
- `npm run pack` Сборка — только для каталога для локального тестирования (без установщика)

## Дополнительные пакеты среды выполнения

Сборки для настольных компьютеров могут публиковать дополнительные архивы времени выполнения вместе со своими установщиками. Установленная полезная нагрузка сервера содержит `optional-packs.index.json` (под `resources/app` на Windows и Linux). Для записи `browser-runtime` прочитайте `packs[].tarball` и загрузите** это точное имя файла из того же выпуска** . Имена архивов включают дайджест SHA-256 ; разные сборки могут требовать разные архивы. Сохраните имя загруженного файла без изменений.

Скопируйте индекс установленного приложения и выбранный архив в один каталог, затем используйте CLI из той же версии:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` отображает состояние установки и проверки, а не имя файла архива. Связанный индекс выбирает архив. При установке проверяется контрольная сумма архива перед извлечением и контрольные суммы пакета перед заменой установленного пакета. Он читает локальные файлы; он не скачивает недостающие архивы. Перезапустите приложение после установки. Если в выпуске нет соответствующего актива, дополнительный пакет недоступен через ресурсы этого выпуска.

## Макет каталога

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

И `main.js`, и `preload.js`**CommonJS файлы `.js`** , а не TypeScript. Типизация на стороне рендеринга находится в `electron/types.d.ts`.

## Мост IPC (`preload.js`)

Предварительная загрузка предоставляет API из белого списка на `window.electronAPI`, используя `contextBridge` с `contextIsolation: true` и `nodeIntegration: false`.

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

Открытые методы:

| Вызов рендерера                                                   | Тип                              |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | вызывать                         |
| `openExternal(url)`                                               | вызывать                         |
| `getDataDir()`                                                    | вызывать                         |
| `restartServer()`                                                 | вызывать                         |
| `getAppVersion()`                                                 | вызывать                         |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | вызывать                         |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | отправлять                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | получить (возвращает утилизатор) |

Помощники приема возвращают** функция удаления** вместо того, чтобы полагаться на `removeAllListeners` — это предотвращает накопление прослушивателей при перемонтировании компонентов React.

## Жизненный цикл сервера

`main.js` создает автономный пакет Next.js непосредственно со средой выполнения Electron Node, чтобы избежать несоответствия ABI собственного модуля с системным Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Основные моменты:

- `waitForServer()` опрашивает URL в течение 30 секунд перед отображением окна (нет пустого экрана при холодном запуске).
- `stdio: "pipe"` захватывает stdout/stderr; готовые фразы (`Ready` / `listening`) излучают `server-status: running` поверх IPC.
- `before-quit` ждет до 5 с для корректного SIGTERM (контрольная точка WAL ), а затем отправляет SIGKILL.
- Переключатель портов в трее (`20128`, `3000`, `8080`) останавливает и перезапускает сервер, затем перезагружает BrowserWindow.

## Секретный бутстрап с нулевой конфигурацией

При первом запуске основной процесс автоматически генерирует и сохраняет недостающие секреты:

| Секрет                   | Источник                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (отказывается, если уже существуют зашифрованные учетные данные) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                  |

Устоял на `<DATA_DIR>/server.env`. `DATA_DIR` решает:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` или `~/.omniroute`
- macOS: `~/.omniroute`

## Поиск файла среды

Перед созданием сервера основной процесс (`getPreferredEnvFilePath()` в `electron/main.js`) выбирает** один** `.env` : первый из существующих.

1. `$DATA_DIR/.env`, если `DATA_DIR` установлен в среде, в которой было запущено приложение.
2. `<resolved DATA_DIR>/.env`, используя те же значения по умолчанию, что и выше: `%APPDATA%\omniroute\.env` на Windows, `$XDG_CONFIG_HOME/omniroute/.env` или `~/.omniroute/.env` на Linux и macOS.
3. `.env` в рабочем каталоге процесса.

Основной процесс читает только этот файл; более поздние кандидаты не объединяются. Затем серверная среда создается с таким приоритетом (сначала самый высокий):

1. Среда процесса Electron (переменные, унаследованные от того, что запускало приложение).
2. Выбранный файл `.env`.
3. `<DATA_DIR>/server.env` (секреты начальной загрузки выше).

Среда процесса фиксируется при запуске приложения, поэтому переменная системной или пользовательской среды, установленная во время работы приложения (в том числе когда оно находится в трее после закрытия окна), не достигает сервера до тех пор, пока приложение не будет полностью закрыто и перезапущено. Для ручек времени выполнения, таких как `CONTEXT_LENGTH_<PROVIDER>` (см. [Переменные среды: длина контекста для каждого поставщика](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), выберите файл `.env`, а затем полностью закройте (tray,** Покидать** ) и перезапустить.

## Окно и лоток

- `BrowserWindow`: 1400 × 900 (мин. 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, светофор на `{ x: 16, y: 16 }`.
- Windows/Linux: встроенная строка заголовка.
- Кнопка закрытия сворачивается в трей; в меню в трее есть** Открыть OmniRoute** ,** Открыть панель управления** (внешний браузер),** Порт сервера** подменю,** Проверьте наличие обновлений** ,** Покидать** .

## Политика безопасности контента

Ставил через `session.defaultSession.webRequest.onHeadersReceived`. Известные директивы:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- В режиме разработки `'unsafe-eval'` добавляется только в `script-src`

## Автообновление

Использует `electron-updater` с поставщиком GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- События, пересылаемые в рендерер через `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (с `percent`), `downloaded`, `error`
- `installUpdate()` убивает сервер, а затем вызывает `autoUpdater.quitAndInstall()`
- Пропущено в режиме разработки (`!app.isPackaged`)

## Построить конвейер

1. `npm run build` → Next.js автономный в `.next/standalone`.
2. `prepare-electron-standalone.mjs` → перезагружается в `.next/electron-standalone` и перезаписывает абсолютные пути внутри `server.js` + `required-server-files.json`, чтобы пакет можно было перемещать.
3. `electron-builder` пакеты `main.js`, `preload.js`, `node_modules` и `extraResources: { ../.next/electron-standalone → app }`.

### Стройте цели

| OS      | Цели                                             |
| ------- | ------------------------------------------------ |
| Windows | установщик NSIS + портативный (x64)              |
| macOS   | DMG (Intel + Arm64, перетаскивание в приложения) |
| Linux   | AppImage + DEB (x64 + Arm64)                     |

Настройки NSIS : `oneClick: false` позволяет пользователю выбирать каталог установки, создает ярлыки на рабочем столе и в меню «Пуск».

## Пакетная сборка для дымового тестирования

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Автоматически обнаруживает упакованный двоичный файл в `electron/dist-electron/` для текущей платформы.
- Запускается с изолированными каталогами `HOME`/`APPDATA`/`XDG_*`, поэтому не затрагивает данные разработчика.
- Опрос `http://127.0.0.1:20128/login` на HTTP 200 в течение 45 с.
- Отслеживает stderr/stdout на предмет фатальных шаблонов (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` и т. д.).
- После готовности ждет 2 секунды стабильной работы, затем выдает SIGTERM и ждет освобождения порта.
- В CI автоматически передается `--no-sandbox --disable-gpu` (и `--disable-dev-shm-usage` в Linux).

Env переопределяет: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Подписание кода

`electron/package.json` делает** нет** напрямую передавать учетные данные для подписи. Передайте их через env vars в `electron-builder`:

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

Подписание AppImage не является обязательным. — установите `LINUX_GPG_KEY` если подписываете.

## Распределение

Артефакты приземляются в `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Релизы публикуются в GitHub Releases (`diegosouzapw/OmniRoute`), где `electron-updater` также проверяет наличие новых версий.

## Поиск неисправностей

| Симптом                                                               | Исправить                                                                                                                                                                                                    |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` после серьезного удара Electron | better-sqlite3 v13 поставляется с предварительными сборками Node-API. — повторно запускает `npm install` в корневом каталоге и `prepare:bundle` (он проверяет предварительную сборку для текущей платформы). |
| `ERR_DLOPEN_FAILED` для собственного модуля                           | Перезапустите `prepare:bundle` — он быстро дает сбой, если отсутствует предварительная сборка Node-API для текущей платформы.                                                                                |
| Окно на Linux кажется пустым                                          | Подтвердите, что сервер Next.js действительно привязан к PORT (проверьте журналы `[Server]` )                                                                                                                |
| киоски для нотариального заверения macOS                              | Убедитесь, что переменные `APPLE_*` экспортируются, а не только в `.env`                                                                                                                                     |
| предупреждение Windows SmartScreen                                    | Подпишитесь с помощью сертификата EV или пользователи щелкните правой кнопкой мыши → «Все равно выполнить»                                                                                                   |
| Дым-тест не пройден, порт используется                                | Остановите любой локальный сервер разработки в 20128 году перед запуском `electron:smoke:packaged`                                                                                                           |

## См. также

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Источник: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Помощники: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
