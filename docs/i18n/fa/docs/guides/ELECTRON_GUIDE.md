# Electron Desktop Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **منبع حقیقت:** فضای کاری `electron/`** آخرین به روز رسانی:** 2026-06-28 — v3.8.40

OmniRoute یک برنامه دسکتاپ بین پلتفرمی (Windows / macOS / Linux) را ارائه میکند که بر روی آن ساخته شده است**Electron 41** +** الکترون ساز 26.10** . برنامه دسکتاپ سرور مستقل Next.js را به عنوان یک پردازش فرزند ایجاد می کند، `BrowserWindow` را به آن نشان می دهد و یک سینی سیستم، به روز رسانی خودکار، پل IPC و بوت استرپ مخفی با پیکربندی صفر را اضافه می کند.

## معماری

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

## نسخه ها

تایید شده از `electron/package.json`:

| بسته               | نسخه                                                               |
| ------------------ | ------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                          |
| `electron-builder` | `^26.15.3`                                                         |
| `electron-updater` | `^6.8.9`                                                           |
| `better-sqlite3`   | root `^13.0.2` (Node-API از قبل — بدون Electron را بازسازی می کند) |
| نسخه برنامه        | `3.8.0`                                                            |
| شناسه برنامه       | `online.omniroute.desktop`                                         |
| نام محصول          | `OmniRoute`                                                        |

## اسکریپت ها (ریشه `package.json`)

| اسکریپت                           | هدف                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | شروع `npm run dev` + منتظر `localhost:20128` + راه اندازی Electron                                |
| `npm run electron:build`          | Next.js را می سازد سپس `electron-builder` را برای OS فعلی اجرا می کند                             |
| `npm run electron:build:win`      | ساخت نصب Windows NSIS + قابل حمل (x64)                                                            |
| `npm run electron:build:mac`      | ساخت macOS DMG (Intel + Apple Silicon)                                                            |
| `npm run electron:build:linux`    | ساخت Linux AppImage + DEB (x64 + arm64)                                                           |
| `npm run electron:smoke:packaged` | باینری بسته بندی شده را راه اندازی می کند و `/login` برای HTTP 200 بررسی می کند، سپس خاموش می شود |

فضای کاری `electron/` همچنین نشان می دهد:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` را اجرا می کند
- `npm run build:mac-x64` / `build:mac-arm64` — تک قوس macOS می سازد
- ساخت `npm run pack` — فقط برای آزمایش محلی (بدون نصب)

## بسته های زمان اجرا اختیاری

سازه های دسکتاپ می توانند آرشیوهای زمان اجرا اختیاری را در کنار نصب کننده های خود منتشر کنند. بار سرور نصب شده حاوی `optional-packs.index.json` (تحت `resources/app` در Windows و Linux) است. برای مدخل `browser-runtime` ، `packs[].tarball` را بخوانید و دانلود کنید** نام فایل دقیقاً از همان نسخه** . نام آرشیو شامل خلاصه SHA-256 است. ساختهای مختلف میتوانند به آرشیوهای متفاوتی نیاز داشته باشند. نام فایل دانلود شده را بدون تغییر نگه دارید.

فهرست برنامه نصب شده و آرشیو انتخاب شده را در یک فهرست کپی کنید، سپس از CLI از همان نسخه استفاده کنید:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` وضعیت نصب و تأیید را نشان می دهد، نه نام فایل بایگانی. فهرست همراه آرشیو را انتخاب می کند. نصب، جمع چک بایگانی خود را قبل از استخراج و جمع های چک بسته آن را قبل از جایگزینی بسته نصب شده تأیید می کند. فایل های محلی را می خواند. بایگانی های گم شده را دانلود نمی کند. پس از نصب برنامه را مجددا راه اندازی کنید. اگر نسخه دارای دارایی منطبق نباشد، بسته اختیاری از طریق دارایی های آن نسخه در دسترس نیست.

## طرح دایرکتوری

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

`main.js` و `preload.js` هر دو هستند** فایل های CommonJS `.js`** نه TypeScript. تایپ های سمت رندر در `electron/types.d.ts` زندگی می کنند.

## IPC (`preload.js`)

پیش بارگذاری یک API در لیست سفید را در `window.electronAPI` با استفاده از `contextBridge` با `contextIsolation: true` و `nodeIntegration: false` نشان می دهد.

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

روش های آشکار:

| تماس رندر                                                         | تایپ کنید                     |
| ----------------------------------------------------------------- | ----------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | استناد کردن                   |
| `openExternal(url)`                                               | استناد کردن                   |
| `getDataDir()`                                                    | استناد کردن                   |
| `restartServer()`                                                 | استناد کردن                   |
| `getAppVersion()`                                                 | استناد کردن                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | استناد کردن                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | ارسال کنید                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | دریافت (بازگرداندن دفع کننده) |

یاران دریافتی الف** عملکرد دفع** این امر به جای تکیه بر `removeAllListeners` — از تجمع شنونده در هنگام نصب مجدد اجزای React جلوگیری می کند.

## چرخه حیات سرور

`main.js` بسته مستقل Next.js را مستقیماً با زمان اجرای Electron Node ایجاد می کند تا از عدم تطابق ABI ماژول بومی با Node سیستم جلوگیری کند:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

نکات برجسته:

- `waitForServer()` قبل از نمایش پنجره، URL را تا 30 ثانیه نظرسنجی میکند (بدون صفحه خالی در شروع سرد).
- `stdio: "pipe"` تصرف stdout/stderr; عبارات آماده (`Ready` / `listening`) `server-status: running` بر IPC منتشر می کنند.
- `before-quit` برای SIGTERM زیبا (ایست بازرسی WAL ) تا 5 ثانیه منتظر می ماند و SIGKILL را ارسال می کند.
- تعویضکننده پورت در سینی (`20128`، `3000`، `8080`) سرور را متوقف میکند و دوباره راهاندازی میکند، سپس BrowserWindow را بارگیری مجدد میکند.

## بوت استرپ مخفی با پیکربندی صفر

در اولین راهاندازی، فرآیند اصلی به طور خودکار اسرار گمشده را تولید میکند و ادامه میدهد:

| راز                      | منبع                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (اگر اعتبارهای رمزگذاری شده قبلاً وجود داشته باشد خودداری می کند) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

اصرار به `<DATA_DIR>/server.env`. `DATA_DIR` حل می کند:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` یا `~/.omniroute`
- macOS: `~/.omniroute`

## جستجوی فایل های محیطی

قبل از تخم ریزی سرور، فرآیند اصلی (`getPreferredEnvFilePath()` در `electron/main.js`) انتخاب می شود** یکی** فایل `.env` : اولین مورد از اینها که وجود دارد.

1. `$DATA_DIR/.env`، زمانی که `DATA_DIR` در محیطی که برنامه با آن راه اندازی شده است تنظیم شود.
2. `<resolved DATA_DIR>/.env`، با استفاده از همان پیشفرضهای بالا: `%APPDATA%\omniroute\.env` در Windows، `$XDG_CONFIG_HOME/omniroute/.env` یا `~/.omniroute/.env` در Linux و macOS.
3. `.env` در فهرست کار فرآیند.

فرآیند اصلی فقط آن فایل را می خواند. نامزدهای بعدی با هم ادغام نمی شوند. سپس محیط سرور با این اولویت ساخته می شود (ابتدا بالاترین):

1. محیط فرآیند Electron (متغیرهای به ارث رسیده از هر برنامه ای که برنامه را راه اندازی کرده است).
2. فایل `.env` انتخاب شده.
3. `<DATA_DIR>/server.env` (رازهای بوت استرپ بالا).

محیط فرآیند هنگام شروع برنامه ضبط می شود، بنابراین یک مجموعه متغیر سیستم یا محیط کاربر در حین اجرای برنامه (از جمله زمانی که پس از بسته شدن پنجره در سینی قرار می گیرد) به سرور نمی رسد تا زمانی که برنامه به طور کامل خارج شود و مجدداً راه اندازی شود. برای دکمههای زمان اجرا مانند `CONTEXT_LENGTH_<PROVIDER>` (به [متغیرهای محیطی: طول زمینه هر ارائهدهنده](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) مراجعه کنید)، فایل `.env` را ترجیح دهید، سپس به طور کامل از آن خارج شوید (سینی،** ترک کنید** ) و راه اندازی مجدد.

## پنجره و سینی

- `BrowserWindow`: 1400 × 900 (حداقل 1024 × 700)، `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`، چراغ راهنمایی در `{ x: 16, y: 16 }`.
- Windows/Linux: نوار عنوان بومی.
- دکمه بستن در سینی به حداقل می رسد. منوی سینی دارد** OmniRoute را باز کنید** ،** داشبورد را باز کنید** (مرورگر خارجی)** پورت سرور** زیر منو،** به روز رسانی ها را بررسی کنید** ،** ترک کنید** .

## خط مشی امنیت محتوا

تنظیم از طریق `session.defaultSession.webRequest.onHeadersReceived`. بخشنامه های قابل توجه:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- حالت Dev فقط `'unsafe-eval'` به `script-src` اضافه می کند

## به روز رسانی خودکار

`electron-updater` با ارائه دهنده GitHub (`diegosouzapw/OmniRoute`) استفاده می کند.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- رویدادهای ارسال شده به رندر از طریق `update-status` IPC: `checking`، `available`، `not-available`، `downloading` (با `percent`)، `downloaded`، `error`
- `installUpdate()` سرور را می کشد سپس `autoUpdater.quitAndInstall()` را فراخوانی می کند
- رد شدن در حالت توسعه (`!app.isPackaged`)

## خط لوله بسازید

1. `npm run build` → Next.js مستقل در `.next/standalone`.
2. `prepare-electron-standalone.mjs` → مجدداً به `.next/electron-standalone` مرحلهبندی میشود و مسیرهای مطلق را در `server.js` + `required-server-files.json` بازنویسی میکند تا باندل قابل جابجایی باشد.
3. بسته های `electron-builder` `main.js`, `preload.js`, `node_modules` و `extraResources: { ../.next/electron-standalone → app }`.

### اهداف بسازید

| OS      | اهداف                                  |
| ------- | -------------------------------------- |
| Windows | نصب کننده NSIS + قابل حمل (x64)        |
| macOS   | DMG (Intel + arm64، کشیدن به برنامهها) |
| Linux   | AppImage + DEB (x64 + arm64)           |

تنظیمات NSIS : `oneClick: false`، به کاربر امکان میدهد فهرست راهنمای نصب را انتخاب کند، میانبرهای دسکتاپ و منوی شروع را ایجاد میکند.

## ساخت بسته بندی شده تست دود

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- باینری بسته بندی شده در `electron/dist-electron/` را برای پلتفرم فعلی به طور خودکار کشف می کند.
- با دایرکتوری های `HOME`/`APPDATA`/`XDG_*` ایزوله راه اندازی می شود تا داده های توسعه دهنده را لمس نکند.
- نظرسنجی `http://127.0.0.1:20128/login` برای HTTP 200 در 45 ثانیه.
- ساعت های stderr/stdout برای الگوهای کشنده (`Cannot find module`، `MODULE_NOT_FOUND`، `ERR_DLOPEN_FAILED`، `Failed to start server`، و غیره).
- پس از آماده شدن، 2 ثانیه زمان اجرای پایدار صبر می کند، سپس SIGTERM صادر می کند و منتظر می ماند تا پورت آزاد شود.
- در CI، به طور خودکار `--no-sandbox --disable-gpu` (و `--disable-dev-shm-usage` در Linux) را ارسال می کند.

Env نادیده می گیرد: `ELECTRON_SMOKE_APP_EXECUTABLE`، `ELECTRON_SMOKE_URL`، `ELECTRON_SMOKE_TIMEOUT_MS`، `ELECTRON_SMOKE_SETTLE_MS`، `ELECTRON_SMOKE_DATA_DIR`، `ELECTRON_SMOKE_KEEP_DATA`، `ELECTRON_SMOKE_STREAM_LOGS`.

## امضای کد

`electron/package.json` انجام می دهد** نه** اعتبار امضای سیم به طور مستقیم. آنها را از طریق env vars به `electron-builder` منتقل کنید:

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

امضای AppImage اختیاری — مجموعه `LINUX_GPG_KEY` در صورت امضا است.

## توزیع

آثار باستانی در `electron/dist-electron/` فرود می آیند:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

نسخهها در GitHub Releases (`diegosouzapw/OmniRoute`) منتشر میشوند، که همچنین جایی است که `electron-updater` نسخههای جدید را بررسی میکند.

## عیب یابی

| علامت                                                               | رفع کنید                                                                                                                                                          |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` پس از Electron دست انداز عمده | better-sqlite3 v13 ارسال می شود Node-API — را مجدداً اجرا می کند `npm install` در ریشه و `prepare:bundle` اجرا می کند (پیش ساخت را برای پلتفرم فعلی تأیید می کند) |
| `ERR_DLOPEN_FAILED` برای ماژول بومی                                 | اجرای مجدد `prepare:bundle` — ، زمانی که پیشساز Node-API برای پلتفرم فعلی وجود نداشته باشد، به سرعت از کار میافتد.                                                |
| پنجره در Linux خالی به نظر می رسد                                   | تأیید کنید که سرور Next.js واقعاً به PORT متصل است (گزارشهای `[Server]` را بررسی کنید)                                                                            |
| دکه های محضری macOS                                                 | اطمینان حاصل کنید که `APPLE_*` vars صادر می شوند، نه فقط در `.env`                                                                                                |
| Windows SmartScreen                                                 | با EV cert ثبت نام کنید، یا کاربران بر روی → "Run anyway" کلیک راست کنند                                                                                          |
| تست دود با پورت در حال استفاده ناموفق است                           | قبل از اجرای `electron:smoke:packaged` هر سرور توسعه دهنده محلی را در 20128 متوقف کنید                                                                            |

## همچنین ببینید

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- منبع: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- یاوران: `scripts/build/prepare-electron-standalone.mjs`، `scripts/dev/smoke-electron-packaged.mjs`
