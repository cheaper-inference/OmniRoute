# Electron Desktop Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Haqiqat manbai:** `electron/` ish maydoni** Oxirgi yangilangan:** 2026-06-28 — v3.8.40

OmniRoute oʻzaro platformali ish stoli ilovasini (Windows / macOS / Linux) joʻnatadi.**Electron 41** +** elektron quruvchi 26.10** . Ish stoli ilovasi Next.js mustaqil serverini bola jarayon sifatida yaratadi, unga `BrowserWindow` ko'rsatadi va tizim tepsisi, avtomatik yangilash, IPC ko'prigi va nol konfiguratsiyali maxfiy yuklash blokini qo'shadi.

## Arxitektura

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

## Versiyalar

`electron/package.json` dan tasdiqlangan:

| Paket                | Versiya                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                               |
| `electron-builder`   | `^26.15.3`                                                              |
| `electron-updater`   | `^6.8.9`                                                                |
| `better-sqlite3`     | root `^13.0.2` (tugun-API — oldindan quradi, Electron qayta qurilmaydi) |
| Ilova versiyasi      | `3.8.0`                                                                 |
| Ilova identifikatori | `online.omniroute.desktop`                                              |
| Mahsulot nomi        | `OmniRoute`                                                             |

## Skriptlar (root `package.json`)

| Skript                            | Maqsad                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` boshlanadi + kutadi `localhost:20128` + ishga Electron            |
| `npm run electron:build`          | Next.js quradi, so'ngra joriy OS uchun `electron-builder` ishga tushiradi       |
| `npm run electron:build:win`      | Windows NSIS o'rnatuvchi + portativ (x64) quradi                                |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) quradi                                        |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) quradi                                       |
| `npm run electron:smoke:packaged` | HTTP 200 uchun qadoqlangan ikkilik va `/login` ishga tushiradi, so‘ngra o‘chadi |

`electron/` ish maydoni ham quyidagilarni ochib beradi:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` ishlaydi
- `npm run build:mac-x64` / `build:mac-arm64` — bitta arch macOS quradi
- `npm run pack` — katalogi faqat mahalliy sinov uchun tuziladi (o'rnatuvchi yo'q)

## Ixtiyoriy ish vaqti paketlari

Ish stoli tuzilmalari o'rnatuvchilari bilan birga ixtiyoriy ish vaqti arxivlarini nashr etishi mumkin. O'rnatilgan server yuki `optional-packs.index.json` ( Windows Linux `resources/app` ostida) o'z ichiga oladi. `browser-runtime` yozuvi uchun `packs[].tarball` o'qing va yuklab oling** xuddi shu versiyadagi aniq fayl nomi** . Arxiv nomlari SHA-256 dayjestini o'z ichiga oladi; turli tuzilmalar turli arxivlarni talab qilishi mumkin. Yuklab olingan fayl nomini o'zgarishsiz saqlang.

O'rnatilgan ilova indeksini va tanlangan arxivni bitta katalogga nusxalang, so'ngra bir xil versiyadagi CLI foydalaning:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` arxiv fayl nomini emas, balki o'rnatish va tekshirish holatini ko'rsatadi. Birlashtirilgan indeks arxivni tanlaydi. O'rnatish arxivni olib tashlashdan oldin nazorat summasini va o'rnatilgan paketni almashtirishdan oldin paketni tekshirish summasini tekshiradi. Mahalliy fayllarni o'qiydi; u etishmayotgan arxivlarni yuklab olmaydi. O'rnatishdan so'ng dasturni qayta ishga tushiring. Agar nashrda mos keladigan aktiv bo'lmasa, ixtiyoriy paketni ushbu reliz aktivlari orqali ishlatib bo'lmaydi.

## Katalog tartibi

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

`main.js`, `preload.js` ham**CommonJS `.js` fayllari** , TypeScript emas. Renderer tomonidagi yozuvlar `electron/types.d.ts` da yashaydi.

## IPC ko'prigi (`preload.js`)

Oldindan yuklash `contextIsolation: true` va `nodeIntegration: false` bilan `contextBridge` yordamida `window.electronAPI` da oq roʻyxatga kiritilgan API koʻrsatadi.

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

Ochiq usullar:

| Renderer qo'ng'irog'i                                             | Turi                                |
| ----------------------------------------------------------------- | ----------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | chaqirish                           |
| `openExternal(url)`                                               | chaqirish                           |
| `getDataDir()`                                                    | chaqirish                           |
| `restartServer()`                                                 | chaqirish                           |
| `getAppVersion()`                                                 | chaqirish                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | chaqirish                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | yuborish                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | qabul qilish (disposerni qaytaradi) |

Qabul qiluvchi yordamchilar a qaytaradi** disposer funktsiyasi** `removeAllListeners` — ga tayanishdan ko'ra, bu React komponentlari qayta o'rnatilganda tinglovchilar to'planishining oldini oladi.

## Serverning hayot aylanishi

`main.js` Next.js mustaqil to‘plamini to‘g‘ridan-to‘g‘ri Electron Node ish vaqti bilan tugatadi, ABI modulining tizim tuguniga mos kelmasligi uchun:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Diqqatga sazovor joylar:

- `waitForServer()` oynani ko'rsatishdan oldin URL 30 soniyagacha so'raydi (sovuq ishga tushirishda bo'sh ekran yo'q).
- `stdio: "pipe"` stdout/stderr ni oladi; tayyor iboralar (`Ready` / `listening`) IPC ustidan `server-status: running` chiqaradi.
- `before-quit` oqlangan SIGTERM (WAL nazorat punkti) uchun 5 soniyagacha kutadi, keyin SIGKILL yuboradi.
- Tovoqdagi port almashtirgich (`20128`, `3000`, `8080`) serverni to'xtatadi va qayta ishga tushiradi, so'ngra BrowserWindow ni qayta yuklaydi.

## Nolinchi konfiguratsiyali maxfiy yuklash

Birinchi ishga tushirilganda, asosiy jarayon etishmayotgan sirlarni avtomatik ravishda yaratadi va davom ettiradi:

| Sir                      | Manba                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (agar shifrlangan kreditlar mavjud bo'lsa, rad etadi) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                       |

`<DATA_DIR>/server.env` uchun davom etdi. `DATA_DIR` quyidagilarni hal qiladi:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` yoki `~/.omniroute`
- macOS: `~/.omniroute`

## Atrof-muhit fayllarini qidirish

Serverni yaratishdan oldin asosiy jarayon (`getPreferredEnvFilePath()` in `electron/main.js`) tanlanadi** bitta** `.env` fayli: ulardan birinchisi mavjud.

1. `$DATA_DIR/.env`, `DATA_DIR` ilova ishga tushirilgan muhitda o'rnatilganda.
2. `<resolved DATA_DIR>/.env`, yuqoridagi kabi bir xil standart sozlamalardan foydalanish: `%APPDATA%\omniroute\.env` da Windows, `$XDG_CONFIG_HOME/omniroute/.env` va Linux da macOS yoki `~/.omniroute/.env`.
3. jarayonning ishchi katalogida `.env`.

Asosiy jarayon faqat o'sha faylni o'qiydi; keyinroq nomzodlar birlashtirilmaydi. Keyin server muhiti shu ustuvorlik bilan quriladi (avval eng yuqori):

1. Electron jarayoni muhiti (ilovani ishga tushirgan har qanday narsadan meros bo'lgan o'zgaruvchilar).
2. Tanlangan `.env` fayli.
3. `<DATA_DIR>/server.env` (yuqoridagi yuklash sirlari).

Jarayon muhiti ilova ishga tushganda yozib olinadi, shuning uchun ilova ishlayotgan vaqtda oʻrnatilgan tizim yoki foydalanuvchi muhiti oʻzgaruvchisi (jumladan, uning oynasi yopilgandan soʻng laganda ichida oʻtirishi) ilova toʻliq oʻchirilmaguncha va qayta ishga tushirilmaguncha serverga etib bormaydi. `CONTEXT_LENGTH_<PROVIDER>` kabi ish vaqti tugmalari uchun ( [Atrof-muhit o'zgaruvchilari: Har bir provayder uchun kontekst uzunligi ga](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) qarang), `.env` faylini afzal ko'ring, so'ngra to'liq o'chiring (tovoq,** Chiqish** ) va qayta ishga tushiring.

## Deraza va laganda

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light at `{ x: 16, y: 16 }`.
- Windows/Linux: asl sarlavha satri.
- Yopish tugmasi laganda uchun kichraytiradi; laganda menyusi mavjud** OmniRoute ni oching** ,** Boshqaruv panelini oching** (tashqi brauzer),** Server porti** pastki menyu,** Yangilanishlarni tekshiring** ,** Chiqish** .

## Kontent xavfsizligi siyosati

`session.defaultSession.webRequest.onHeadersReceived` orqali o'rnating. Muhim ko'rsatmalar:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev rejimi faqat `script-src` ga `'unsafe-eval'` qo'shadi

## Avtomatik yangilash

GitHub provayderi (`diegosouzapw/OmniRoute`) bilan `electron-updater` foydalanadi.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Voqealar `update-status` IPC orqali rendererga yoʻnaltirildi: `checking`, `available`, `not-available`, `downloading` ( `percent` bilan), `downloaded`, `error`
- `installUpdate()` serverni o'ldiradi, keyin `autoUpdater.quitAndInstall()` qo'ng'iroq qiladi
- Dev rejimida oʻtkazib yuborildi (`!app.isPackaged`)

## Quvurni qurish

1. `npm run build` → Next.js `.next/standalone` ichida mustaqil.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` ga qayta bosqichga o‘tadi va `server.js` + `required-server-files.json` ichidagi mutlaq yo‘llarni qayta yozadi, shuning uchun to‘plam o‘zgartirilishi mumkin.
3. `electron-builder` paketlari `main.js`, `preload.js`, `node_modules` va `extraResources: { ../.next/electron-standalone → app }`.

### Maqsadlarni yaratish

| OS      | Maqsadlar                               |
| ------- | --------------------------------------- |
| Windows | NSIS o'rnatuvchisi + portativ (x64)     |
| macOS   | DMG (Intel + arm64, ilovalarga torting) |
| Linux   | AppImage + DEB (x64 + arm64)            |

NSIS sozlamalari: `oneClick: false`, foydalanuvchiga o'rnatish katalogini tanlash imkonini beradi, Ish stoli va Boshlash menyusi yorliqlarini yaratadi.

## Tutun sinovi uchun qadoqlangan qurilish

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Joriy platforma uchun `electron/dist-electron/` da paketlangan ikkilik faylni avtomatik ravishda topadi.
- Izolyatsiya qilingan `HOME`/`APPDATA`/`XDG_*` kataloglari bilan ishga tushiriladi, shuning uchun u ishlab chiquvchi ma'lumotlariga tegmaydi.
- 45 soniya ichida HTTP 200 uchun `http://127.0.0.1:20128/login` so'rovlari.
- Fatal naqshlar uchun stderr/stdout soatlari (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` va boshqalar).
- Tayyor bo'lgandan keyin 2 soniya barqaror ish vaqtini kutadi, keyin SIGTERM chiqaradi va portning bo'shashini kutadi.
- CI da `--no-sandbox --disable-gpu` avtomatik ravishda o'tadi (va `--disable-dev-shm-usage` da Linux).

Env bekor qiladi: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kod imzolash

`electron/package.json` qiladi** emas** hisob ma'lumotlarini to'g'ridan-to'g'ri imzolash. Ularni env vars orqali `electron-builder` ga o'tkazing:

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

AppImage imzolash, agar imzolansa, ixtiyoriy — to'plami `LINUX_GPG_KEY`.

## Tarqatish

Artefaktlar `electron/dist-electron/` tushadi:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Relizlar GitHub Releases (`diegosouzapw/OmniRoute`) da chop etiladi, bu yerda `electron-updater` yangi versiyalarni tekshiradi.

## Muammolarni bartaraf qilish; nosozliklarni TUZATISH

| Alomat                                                              | Tuzatish                                                                                                                                                                          |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron katta zarbadan keyin `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 tugun-API — `npm install` ni ildizda qayta ishga tushiradi va `prepare:bundle` oldindan yaratadi (u joriy platforma uchun oldindan tuzilganligini tasdiqlaydi) |
| Mahalliy modul uchun `ERR_DLOPEN_FAILED`                            | `prepare:bundle` — ni qayta ishga tushiring, agar joriy platforma uchun Node-API oldindan tuzilgani yo'q bo'lsa, u tezda ishlamay qoladi.                                         |
| Linux da oyna bo'sh ko'rinadi                                       | Next.js serverining PORT ga bog'langanligini tasdiqlang ( `[Server]` jurnallarini tekshiring)                                                                                     |
| macOS notarial tasdiqlash do'konlari                                | Faqat `.env` emas, balki `APPLE_*` varslari eksport qilinishiga ishonch hosil qiling                                                                                              |
| Windows SmartScreen ogohlantirish                                   | EV sertifikati bilan tizimga kiring yoki foydalanuvchilar → "Baribir ishga tushirish" tugmasini o'ng tugmasini bosing.                                                            |
| Port-in-foydalanishda tutun sinovi muvaffaqiyatsiz tugadi           | `electron:smoke:packaged` ishga tushirishdan oldin har qanday mahalliy ishlab chiqaruvchi serverni 20128-da to'xtating                                                            |

## Shuningdek qarang

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Manba: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Yordamchilar: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
