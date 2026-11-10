# Electron Desktop Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **מקור האמת:** סביבת עבודה `electron/`** עודכן לאחרונה:** 2026-06-28 — v3.8.40

OmniRoute שולחת אפליקציית שולחן עבודה חוצת פלטפורמות (Windows / macOS / Linux) הבנויה על**Electron 41** +** בונה אלקטרונים 26.10** . אפליקציית שולחן העבודה מולידה את השרת העצמאי של Next.js כתהליך צאצא, מפנה אליו את ה- `BrowserWindow` ומוסיפה מגש מערכת, עדכון אוטומטי, גשר IPC ו-Zo-config אתחול סודי.

## אַדְרִיכָלוּת

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

## גרסאות

אושר מ- `electron/package.json`:

| חֲבִילָה           | גִרְסָה                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                         |
| `electron-builder` | `^26.15.3`                                                        |
| `electron-updater` | `^6.8.9`                                                          |
| `better-sqlite3`   | root `^13.0.2` (Node-API בונה מראש של — ללא בנייה מחדש Electron ) |
| גרסת האפליקציה     | `3.8.0`                                                           |
| מזהה אפליקציה      | `online.omniroute.desktop`                                        |
| שם המוצר           | `OmniRoute`                                                       |

## סקריפטים (root `package.json`)

| תַסרִיט                           | מַטָרָה                                                         |
| --------------------------------- | --------------------------------------------------------------- |
| `npm run electron:dev`            | מתחיל `npm run dev` + מחכה ל- `localhost:20128` + משיק Electron |
| `npm run electron:build`          | בונה Next.js ואז מריץ `electron-builder` עבור OS הנוכחי         |
| `npm run electron:build:win`      | בונה Windows NSIS מתקין + נייד (x64)                            |
| `npm run electron:build:mac`      | בונה macOS DMG (Intel + Apple Silicon)                          |
| `npm run electron:build:linux`    | בונה Linux AppImage + DEB (x64 + arm64)                         |
| `npm run electron:smoke:packaged` | משיק בינארי ארוז ומגשש `/login` עבור HTTP 200, ואז נכבה         |

סביבת העבודה `electron/` חושפת גם:

- `npm run prepare:bundle` — מפעיל את `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — יחיד-קשת macOS בונה
- `npm run pack` — ספריית בנייה בלבד לבדיקות מקומיות (ללא התקנה)

## חבילות זמן ריצה אופציונליות

בניית שולחן עבודה יכולה לפרסם ארכיונים אופציונליים של זמן ריצה לצד המתקינים שלהם. מטען השרת המותקן מכיל `optional-packs.index.json` (תחת `resources/app` ב- Windows ו- Linux). לערך `browser-runtime`, קרא `packs[].tarball` והורד** שם הקובץ המדויק מאותה מהדורה** . שמות הארכיון כוללים תקציר SHA-256 ; מבנים שונים יכולים לדרוש ארכיונים שונים. השאר את שם הקובץ שהורדת ללא שינוי.

העתק את האינדקס של האפליקציה המותקנת ואת הארכיון שנבחר לספרייה אחת, ולאחר מכן השתמש ב- CLI מאותה מהדורה:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` מציג מצב התקנה ואימות, לא את שם קובץ הארכיון. האינדקס המצורף בוחר את הארכיון. ההתקנה מאמתת את סכום בדיקת הארכיון שלה לפני חילוץ ואת סכומי בדיקת החבילה שלה לפני החלפת חבילה מותקנת. זה קורא קבצים מקומיים; זה לא מוריד ארכיונים חסרים. הפעל מחדש את האפליקציה לאחר ההתקנה. אם לגרסה אין נכס תואם, החבילה האופציונלית אינה זמינה דרך הנכסים של אותה גרסה.

## פריסת ספרייה

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

גם `main.js` וגם `preload.js` הם** קבצי CommonJS `.js`** , לא TypeScript. ההקלדות בצד המעבד חיים ב- `electron/types.d.ts`.

## גשר IPC (`preload.js`)

הטעינה המוקדמת חושפת API ברשימת הלבנים ב- `window.electronAPI` באמצעות `contextBridge` עם `contextIsolation: true` ו- `nodeIntegration: false`.

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

שיטות חשופות:

| קריאת מעבד                                                        | סוּג                  |
| ----------------------------------------------------------------- | --------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | לִקְרוֹא              |
| `openExternal(url)`                                               | לִקְרוֹא              |
| `getDataDir()`                                                    | לִקְרוֹא              |
| `restartServer()`                                                 | לִקְרוֹא              |
| `getAppVersion()`                                                 | לִקְרוֹא              |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | לִקְרוֹא              |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | לִשְׁלוֹחַ            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | לקבל (מחזיר את הפוסל) |

העוזרים המקבלים מחזירים א** פונקציית סילוק** במקום להסתמך על `removeAllListeners` — זה מונע הצטברות מאזינים כאשר רכיבי React עולים מחדש.

## מחזור חיי שרת

`main.js` מולידה את החבילה העצמאית Next.js ישירות עם זמן הריצה של הצומת Electron כדי למנוע אי-התאמה של מודול ABI עם מערכת Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

פַּסִים:

- `waitForServer()` סוקר את ה- URL עד 30 שניות לפני הצגת החלון (ללא מסך ריק בהתחלה קרה).
- `stdio: "pipe"` לוכד stdout/stderr; ביטויים מוכנים (`Ready` / `listening`) פולטים `server-status: running` על IPC.
- `before-quit` ממתין עד 5 שניות ל- SIGTERM החינני (מחסום WAL ) ואז שולח SIGKILL.
- מחליף יציאות במגש (`20128`, `3000`, `8080`) עוצר ומפעיל מחדש את השרת, ואז טוען מחדש את ה- BrowserWindow.

## רצועת האתחול הסודית בתצורת אפס

בהפעלה הראשונה, התהליך הראשי יוצר אוטומטית וממשיך סודות חסרים:

| סוֹד                     | מָקוֹר                                                                        |
| ------------------------ | ----------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (מסרב אם כבר קיימים קרדיטים מוצפנים) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                      |

התמיד `<DATA_DIR>/server.env`. `DATA_DIR` פותר ל:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` או `~/.omniroute`
- macOS: `~/.omniroute`

## חיפוש קבצי סביבה

לפני יצירת השרת, התהליך הראשי (`getPreferredEnvFilePath()` in `electron/main.js`) בוחר** אֶחָד** קובץ `.env` : הראשון שבהם שקיים.

1. `$DATA_DIR/.env`, כאשר `DATA_DIR` מוגדר בסביבה שאיתה האפליקציה הושקה.
2. `<resolved DATA_DIR>/.env`, תוך שימוש באותן ברירות מחדל כמו לעיל: `%APPDATA%\omniroute\.env` on Windows, `$XDG_CONFIG_HOME/omniroute/.env` או `~/.omniroute/.env` on Linux ו- macOS.
3. `.env` במדריך העבודה בתהליך.

התהליך הראשי קורא רק את הקובץ הזה; מועמדים מאוחרים יותר לא מתמזגים פנימה. סביבת השרת נבנית עם העדיפות הזו (הגבוהה ביותר קודם):

1. סביבת תהליך Electron (משתנים שעברו בירושה מכל מה שהפעיל את האפליקציה).
2. קובץ `.env` שנבחר.
3. `<DATA_DIR>/server.env` (סודות האתחול למעלה).

סביבת התהליך נקלטת כאשר האפליקציה מתחילה, כך שמשתנה מערכת או סביבת משתמש שהוגדר בזמן שהאפליקציה פועלת (כולל בזמן שהיא יושבת במגש לאחר סגירת החלון שלה) לא מגיע לשרת עד שהאפליקציה נסגרת במלואה והפעלה מחדש. עבור כפתורי זמן ריצה כגון `CONTEXT_LENGTH_<PROVIDER>` (ראה [משתני סביבה: אורך הקשר לפי ספק](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), העדיפו את קובץ `.env` ולאחר מכן צא לחלוטין (מגש,** לְהַפְסִיק** ) והפעל מחדש.

## חלון ומגש

- `BrowserWindow`: 1400 × 900 (מינימום 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, רמזור ב- `{ x: 16, y: 16 }`.
- Windows/Linux: שורת כותרת מקורית.
- לחצן סגירה ממזער למגש; לתפריט המגש יש** פתח OmniRoute** ,** פתח את לוח המחוונים** (דפדפן חיצוני),** יציאת שרת** תפריט משנה,** בדוק אם קיימים עדכונים** ,** לְהַפְסִיק** .

## מדיניות אבטחת תוכן

מוגדר דרך `session.defaultSession.webRequest.onHeadersReceived`. הנחיות בולטות:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- מצב Dev מוסיף `'unsafe-eval'` ל- `script-src` בלבד

## עדכון אוטומטי

משתמש `electron-updater` עם ספק GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- אירועים שהועברו למעבד באמצעות `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (עם `percent`), `downloaded`, `error`
- `installUpdate()` הורג את השרת ואז קורא `autoUpdater.quitAndInstall()`
- דילוג במצב פיתוח (`!app.isPackaged`)

## בניית צינור

1. `npm run build` → Next.js עצמאי ב- `.next/standalone`.
2. `prepare-electron-standalone.mjs` → משלב מחדש ל- `.next/electron-standalone` ומשכתב נתיבים מוחלטים בתוך `server.js` + `required-server-files.json` כך שהצרור ניתן למיקום מחדש.
3. חבילות `electron-builder` `main.js`, `preload.js`, `node_modules` ו- `extraResources: { ../.next/electron-standalone → app }`.

### בנה מטרות

| OS      | יעדים                               |
| ------- | ----------------------------------- |
| Windows | NSIS מתקין + נייד (x64)             |
| macOS   | DMG (Intel + arm64, גרירה ליישומים) |
| Linux   | AppImage + DEB (x64 + arm64)        |

הגדרות NSIS : `oneClick: false`, מאפשר למשתמש לבחור את ספריית ההתקנה, יוצר קיצורי דרך לשולחן העבודה ולתפריט התחל.

## בדיקת עשן מבנה ארוז

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- מגלה אוטומטית את הבינארי הארוז ב- `electron/dist-electron/` עבור הפלטפורמה הנוכחית.
- מופעלת עם ספריות `HOME`/`APPDATA`/`XDG_*` מבודדות כך שהיא לא נוגעת בנתוני מפתחים.
- סקרים `http://127.0.0.1:20128/login` עבור HTTP 200 תוך 45 שניות.
- שעון stderr/stdout לדפוסים קטלניים (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` וכו').
- ממתין 2 שניות של זמן ריצה יציב לאחר מוכנות, ואז מוציא SIGTERM ומחכה שהיציאה תתפנה.
- ב- CI, מעביר אוטומטית `--no-sandbox --disable-gpu` (ו- `--disable-dev-shm-usage` ב- Linux).

Env עוקף: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## חתימת קוד

`electron/package.json` עושה זאת** לֹא** אישורי חתימה באמצעות חוט ישירות. העבר אותם דרך env vars ל- `electron-builder`:

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

חתימת AppImage היא אופציונלית — set `LINUX_GPG_KEY` אם חתימה.

## הֲפָצָה

חפצים נוחתים `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

מהדורות מתפרסמות ל- GitHub Releases (`diegosouzapw/OmniRoute`), וזה גם המקום שבו `electron-updater` בודק אם יש גרסאות חדשות.

## פתרון בעיות

| סִימפּטוֹם                                                        | לִקְבּוֹעַ                                                                                                                                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` אחרי Electron גבשושית גדולה | better-sqlite3 v13 ships Node-API prebuilds — מפעיל מחדש `npm install` ב-root ו- `prepare:bundle` (הוא מאמת את ה-prebuild עבור הפלטפורמה הנוכחית) |
| `ERR_DLOPEN_FAILED` עבור מודול מקורי                              | הרץ מחדש `prepare:bundle` — זה נכשל מהר כאשר ה-Node-API prebuild עבור הפלטפורמה הנוכחית חסר                                                       |
| החלון מופיע ריק ב- Linux                                          | אשר ששרת Next.js קשור למעשה ל- PORT (בדוק יומני `[Server]` )                                                                                      |
| דוכני אישור נוטריון macOS                                         | ודא `APPLE_*` vars מיוצאים, לא רק ב- `.env`                                                                                                       |
| Windows SmartScreen                                               | חתום עם EV cert, או שמשתמשים לוחצים לחיצה ימנית על → "הפעלה בכל זאת"                                                                              |
| בדיקת עשן נכשלת עם יציאה בשימוש                                   | עצור כל שרת פיתוח מקומי ב-20128 לפני הפעלת `electron:smoke:packaged`                                                                              |

## ראה גם

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- מקור: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- עוזרים: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
