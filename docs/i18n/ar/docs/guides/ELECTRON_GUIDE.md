# Electron Desktop Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **مصدر الحقيقة:** مساحة عمل `electron/`** آخر تحديث:** 2026-06-28 — v3.8.40

تشحن OmniRoute تطبيق سطح مكتب متعدد الأنظمة الأساسية (Windows / macOS / Linux) مبني عليه**Electron 41** +** منشئ الإلكترون 26.10** . يُنشئ تطبيق سطح المكتب خادم Next.js المستقل كعملية فرعية، ويشير إلى `BrowserWindow` ، ويضيف علبة النظام، والمُحدِّث التلقائي، وجسر IPC ، وأداة تمهيد سرية بدون تكوين.

## بنيان

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

## الإصدارات

تم التأكيد من `electron/package.json`:

| طَرد               | إصدار                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                  |
| `electron-builder` | `^26.15.3`                                                                 |
| `electron-updater` | `^6.8.9`                                                                   |
| `better-sqlite3`   | الجذر `^13.0.2` (الإنشاءات المسبقة لـ Node-API — ولا إعادة بناء Electron ) |
| نسخة التطبيق       | `3.8.0`                                                                    |
| معرف التطبيق       | `online.omniroute.desktop`                                                 |
| اسم المنتج         | `OmniRoute`                                                                |

## البرامج النصية (الجذر `package.json`)

| البرنامج النصي                    | غاية                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `npm run electron:dev`            | يبدأ `npm run dev` + في انتظار `localhost:20128` + ويطلق Electron              |
| `npm run electron:build`          | يبني Next.js ثم يقوم بتشغيل `electron-builder` لـ OS الحالي                    |
| `npm run electron:build:win`      | يبني Windows NSIS + المحمول (x64)                                              |
| `npm run electron:build:mac`      | يبني macOS DMG (Intel + Apple Silicon)                                         |
| `npm run electron:build:linux`    | يبني Linux AppImage + DEB (x64 + Arm64)                                        |
| `npm run electron:smoke:packaged` | يطلق البرنامج الثنائي المعبأ ويستكشف `/login` لـ HTTP 200، ثم يتم إيقاف تشغيله |

تكشف مساحة العمل `electron/` أيضًا:

- `npm run prepare:bundle` — يدير `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — يبني macOS أحادي القوس
- إصدار دليل `npm run pack` — فقط للاختبار المحلي (بدون مثبت)

## حزم وقت التشغيل الاختيارية

يمكن لإصدارات سطح المكتب نشر أرشيفات وقت التشغيل الاختيارية جنبًا إلى جنب مع أدوات التثبيت الخاصة بها. تحتوي حمولة الخادم المثبتة `optional-packs.index.json` (ضمن `resources/app` على Windows و Linux). لإدخال `browser-runtime` ، اقرأ `packs[].tarball` وقم بتنزيله** اسم الملف الدقيق هذا من نفس الإصدار** . تتضمن أسماء الأرشيف ملخص SHA-256 ؛ قد تتطلب الإصدارات المختلفة أرشيفات مختلفة. احتفظ باسم الملف الذي تم تنزيله دون تغيير.

انسخ فهرس التطبيق المثبت والأرشيف المحدد في دليل واحد، ثم استخدم CLI من نفس الإصدار:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

يعرض `packs list` حالة التثبيت والتحقق، وليس اسم ملف الأرشيف. الفهرس المجمع يختار الأرشيف. يتحقق التثبيت من المجموع الاختباري للأرشيف قبل الاستخراج ومن المجموع الاختباري للحزمة قبل استبدال الحزمة المثبتة. يقرأ الملفات المحلية. ولا يقوم بتنزيل الأرشيفات المفقودة. أعد تشغيل التطبيق بعد التثبيت. إذا لم يكن للإصدار أصل مطابق، فلن تكون الحزمة الاختيارية متاحة من خلال أصول هذا الإصدار.

## تخطيط الدليل

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

كلا `main.js` و `preload.js`** ملفات CommonJS `.js`** , وليس TypeScript. توجد الكتابة من جانب العارض في `electron/types.d.ts`.

## جسر IPC (`preload.js`)

يعرض التحميل المسبق API المدرجة في القائمة البيضاء على `window.electronAPI` باستخدام `contextBridge` مع `contextIsolation: true` و `nodeIntegration: false`.

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

الأساليب المكشوفة:

| استدعاء العارض                                                    | يكتب                 |
| ----------------------------------------------------------------- | -------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | استدعاء              |
| `openExternal(url)`                                               | استدعاء              |
| `getDataDir()`                                                    | استدعاء              |
| `restartServer()`                                                 | استدعاء              |
| `getAppVersion()`                                                 | استدعاء              |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | استدعاء              |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | يرسل                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | تلقي (إرجاع المتخلص) |

يقوم مساعدو الاستلام بإرجاع أ** وظيفة المتخلص** بدلاً من الاعتماد على `removeAllListeners` — فإن هذا يمنع تراكم المستمع عند إعادة تحميل مكونات React.

## دورة حياة الخادم

`main.js` تنتج الحزمة المستقلة Next.js مباشرة مع وقت تشغيل Electron Node لتجنب عدم تطابق الوحدة الأصلية ABI مع عقدة النظام:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

أبرز النقاط:

- يقوم `waitForServer()` باستقصاء URL لمدة تصل إلى 30 ثانية قبل إظهار النافذة (لا توجد شاشة فارغة في البداية الباردة).
- `stdio: "pipe"` يلتقط stdout/stderr; العبارات الجاهزة (`Ready` / `listening`) تنبعث منها `server-status: running` على IPC.
- ينتظر `before-quit` ما يصل إلى 5 ثوانٍ حتى يصل إلى SIGTERM (نقطة تفتيش WAL ) ثم يرسل SIGKILL.
- يتوقف مبدل المنافذ الموجود في الدرج (`20128`، `3000`، `8080`) عن العمل ويعيد تشغيل الخادم، ثم يعيد تحميل BrowserWindow.

## صفر التكوين السري Bootstrap

عند الإطلاق الأول، تقوم العملية الرئيسية تلقائيًا بإنشاء الأسرار المفقودة والحفاظ عليها:

| سر                       | مصدر                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (يرفض إذا كانت الاعتمادات المشفرة موجودة بالفعل) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                  |

أصر على `<DATA_DIR>/server.env`. `DATA_DIR` يقرر ما يلي:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` أو `~/.omniroute`
- macOS: `~/.omniroute`

## بحث ملف البيئة

قبل إنشاء الخادم، يتم اختيار العملية الرئيسية (`getPreferredEnvFilePath()` in `electron/main.js`).** واحد** ملف `.env` : أول ملف موجود.

1. `$DATA_DIR/.env`، عندما يتم تعيين `DATA_DIR` في البيئة التي تم إطلاق التطبيق بها.
2. `<resolved DATA_DIR>/.env`، باستخدام نفس الإعدادات الافتراضية المذكورة أعلاه: `%APPDATA%\omniroute\.env` على Windows أو `$XDG_CONFIG_HOME/omniroute/.env` أو `~/.omniroute/.env` على Linux و macOS.
3. `.env` في دليل عمل العملية.

تقرأ العملية الرئيسية هذا الملف فقط؛ لا يتم دمج المرشحين اللاحقين. يتم بعد ذلك إنشاء بيئة الخادم بهذه الأسبقية (الأعلى أولاً):

1. بيئة عملية Electron (المتغيرات الموروثة من كل ما تم تشغيل التطبيق).
2. ملف `.env` المحدد.
3. `<DATA_DIR>/server.env` (أسرار التمهيد أعلاه).

يتم التقاط بيئة العملية عند بدء تشغيل التطبيق، وبالتالي فإن متغير بيئة النظام أو المستخدم الذي تم تعيينه أثناء تشغيل التطبيق (بما في ذلك أثناء وجوده في الدرج بعد إغلاق نافذته) لا يصل إلى الخادم حتى يتم إنهاء التطبيق بالكامل وإعادة تشغيله. بالنسبة لمقابض وقت التشغيل مثل `CONTEXT_LENGTH_<PROVIDER>` (راجع [متغيرات البيئة: طول السياق لكل موفر](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) )، تفضل ملف `.env` ، ثم قم بالخروج بالكامل (الدرج،** يترك** ) وإعادة التشغيل.

## نافذة وصينية

- `BrowserWindow`: 1400 × 900 (الحد الأدنى 1024 × 700)، `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`، إشارة المرور في `{ x: 16, y: 16 }`.
- Windows/Linux: شريط العنوان الأصلي.
- زر الإغلاق يقلل إلى الدرج؛ قائمة الدرج لديها** افتح OmniRoute** ,** افتح لوحة المعلومات** (متصفح خارجي)،** منفذ الخادم** القائمة الفرعية,** التحقق من وجود تحديثات** ,** يترك** .

## سياسة أمان المحتوى

تعيين عبر `session.defaultSession.webRequest.onHeadersReceived`. توجيهات بارزة:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- يضيف وضع التطوير `'unsafe-eval'` إلى `script-src` فقط

## التحديث التلقائي

يستخدم `electron-updater` مع موفر GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- تمت إعادة توجيه الأحداث إلى العارض عبر `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (مع `percent`), `downloaded`, `error`
- `installUpdate()` يقتل الخادم ثم يستدعي `autoUpdater.quitAndInstall()`
- تم التخطي في وضع التطوير (`!app.isPackaged`)

## بناء خط أنابيب

1. `npm run build` → Next.js مستقل في `.next/standalone`.
2. يعيد `prepare-electron-standalone.mjs` → مراحله إلى `.next/electron-standalone` ويعيد كتابة المسارات المطلقة داخل `server.js` + `required-server-files.json` بحيث تكون الحزمة قابلة للنقل.
3. حزم `electron-builder` `main.js` و `preload.js` و `node_modules` و `extraResources: { ../.next/electron-standalone → app }`.

### بناء الأهداف

| OS      | الأهداف                                 |
| ------- | --------------------------------------- |
| Windows | مثبت NSIS + المحمول (x64)               |
| macOS   | DMG (إنتل + Arm64، السحب إلى التطبيقات) |
| Linux   | AppImage + DEB (x64 + Arm64)            |

إعدادات NSIS : `oneClick: false`، تتيح للمستخدم اختيار دليل التثبيت، وإنشاء اختصارات لسطح المكتب وقائمة ابدأ.

## بناء معبأ لاختبار الدخان

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- يكتشف تلقائيًا الملف الثنائي المعبأ في `electron/dist-electron/` للنظام الأساسي الحالي.
- يتم تشغيله باستخدام أدلة `HOME`/`APPDATA`/`XDG_*` المعزولة حتى لا يمس بيانات المطورين.
- استطلاعات `http://127.0.0.1:20128/login` لـ HTTP 200 خلال 45 ثانية.
- يراقب stderr/stdout للأنماط القاتلة (`Cannot find module`، `MODULE_NOT_FOUND`، `ERR_DLOPEN_FAILED`، `Failed to start server`، إلخ.).
- ينتظر ثانيتين من وقت التشغيل المستقر بعد الاستعداد، ثم يصدر SIGTERM وينتظر تحرير المنفذ.
- في CI، يمرر `--no-sandbox --disable-gpu` تلقائيًا (و `--disable-dev-shm-usage` على Linux).

يتجاوز Env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## توقيع الكود

`electron/package.json` يفعل** لا** أوراق اعتماد التوقيع السلكي مباشرة. قم بتمريرها عبر env vars إلى `electron-builder`:

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

توقيع AppImage اختياري، قم بتعيين — `LINUX_GPG_KEY` في حالة التوقيع.

## توزيع

قطع أثرية في `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

يتم نشر الإصدارات في GitHub Releases (`diegosouzapw/OmniRoute`)، وهو المكان الذي يتحقق فيه `electron-updater` أيضًا من الإصدارات الجديدة.

## استكشاف الأخطاء وإصلاحها

| أعراض                                                          | يصلح                                                                                                                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` بعد عثرة Electron الكبرى | يقوم better-sqlite3 v13 بشحن Node-API للإنشاءات المسبقة — وإعادة تشغيل `npm install` في الجذر و `prepare:bundle` (يتحقق من الإنشاء المسبق للنظام الأساسي الحالي) |
| `ERR_DLOPEN_FAILED` للوحدة الأصلية                             | أعد تشغيل `prepare:bundle` — فهو يفشل بسرعة عندما يكون البناء المسبق لـ Node-API للنظام الأساسي الحالي مفقودًا                                                   |
| تظهر النافذة فارغة على Linux                                   | تأكيد ارتباط خادم Next.js فعليًا بـ PORT (راجع سجلات `[Server]` )                                                                                                |
| اكشاك التوثيق macOS                                            | تأكد من تصدير `APPLE_*` vars، وليس فقط في `.env`                                                                                                                 |
| تحذير Windows SmartScreen                                      | قم بالتسجيل باستخدام شهادة EV ، أو يقوم المستخدمون بالنقر بزر الماوس الأيمن فوق → "تشغيل على أي حال"                                                             |
| فشل اختبار الدخان مع المنفذ قيد الاستخدام                      | أوقف أي خادم تطوير محلي على 20128 قبل تشغيل `electron:smoke:packaged`                                                                                            |

## انظر أيضا

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- المصدر: `electron/main.js`، `electron/preload.js`، `electron/package.json`
- المساعدون: `scripts/build/prepare-electron-standalone.mjs`، `scripts/dev/smoke-electron-packaged.mjs`
