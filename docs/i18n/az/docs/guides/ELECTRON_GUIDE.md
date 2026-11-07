# Electron Desktop Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Həqiqətin mənbəyi:** `electron/` iş sahəsi** Son yeniləmə:** 2026-06-28 — v3.8.40

OmniRoute üzərində qurulmuş çarpaz platformalı masaüstü proqramı (Windows / macOS / Linux) göndərir**Electron 41** +** elektron qurucusu 26.10** . İş masası proqramı Next.js müstəqil serverini uşaq proses kimi yaradır, ona `BrowserWindow` işarəsi verir və sistem tepsisi, avtomatik yeniləyici, IPC körpüsü və sıfır konfiqurasiyalı məxfi açılış kəməri əlavə edir.

## Memarlıq

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

`electron/package.json` dan təsdiqlənib:

| Paket              | Versiya                                                               |
| ------------------ | --------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                             |
| `electron-builder` | `^26.15.3`                                                            |
| `electron-updater` | `^6.8.9`                                                              |
| `better-sqlite3`   | kök `^13.0.2` (Node-API əvvəlcədən qurur — Electron yenidən qurulmur) |
| Proqram versiyası  | `3.8.0`                                                               |
| Tətbiq id          | `online.omniroute.desktop`                                            |
| Məhsulun adı       | `OmniRoute`                                                           |

## Skriptlər (kök `package.json`)

| Skript                            | Məqsəd                                                                 |
| --------------------------------- | ---------------------------------------------------------------------- |
| `npm run electron:dev`            | Starts `npm run dev` + waits for `localhost:20128` + launches Electron |
| `npm run electron:build`          | Next.js qurur, sonra cari OS üçün `electron-builder` işlədir           |
| `npm run electron:build:win`      | Windows NSIS quraşdırıcı + portativ (x64) qurur                        |
| `npm run electron:build:mac`      | macOS DMG qurur (Intel + Apple Silicon)                                |
| `npm run electron:build:linux`    | Linux AppImage + DEB qurur (x64 + arm64)                               |
| `npm run electron:smoke:packaged` | HTTP 200 üçün paketlənmiş binar və `/login` işə salır, sonra sönür     |

`electron/` iş sahəsi də ifşa edir:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` ilə işləyir
- `npm run build:mac-x64` / `build:mac-arm64` — tək qövslü macOS qurur
- `npm run pack` — qovluğu yalnız yerli sınaq üçün qurulur (quraşdırıcı yoxdur)

## İsteğe bağlı iş vaxtı paketləri

Desktop qurğuları quraşdırıcıları ilə yanaşı isteğe bağlı iş vaxtı arxivlərini dərc edə bilər. Quraşdırılmış server yükü `optional-packs.index.json` ( Windows və Linux də `resources/app` altında) ehtiva edir. `browser-runtime` girişi üçün `packs[].tarball` oxuyun və endirin** eyni buraxılışdan olan dəqiq fayl adı** . Arxiv adlarına SHA-256 digest daxildir; müxtəlif quruluşlar müxtəlif arxiv tələb edə bilər. Endirilmiş fayl adını dəyişmədən saxlayın.

Quraşdırılmış proqramın indeksini və seçilmiş arxivi bir qovluğa kopyalayın, sonra eyni buraxılışdan CLI istifadə edin:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` arxiv fayl adını deyil, quraşdırma və yoxlama vəziyyətini göstərir. Birləşdirilmiş indeks arxivi seçir. Quraşdırma, çıxarılmadan əvvəl arxiv yoxlama məbləğini və quraşdırılmış paketi əvəz etməzdən əvvəl paket yoxlama məbləğlərini yoxlayır. Yerli faylları oxuyur; itkin arxivləri endirmir. Quraşdırıldıqdan sonra proqramı yenidən başladın. Buraxılışın uyğun aktivi yoxdursa, isteğe bağlı paket həmin buraxılışın aktivləri vasitəsilə mövcud deyil.

## Directory Layout

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

Həm `main.js`, həm də `preload.js`**CommonJS `.js` faylları** , TypeScript deyil. Renderer tərəfindəki yazılar `electron/types.d.ts`-də yaşayır.

## IPC körpüsü (`preload.js`)

Əvvəlcədən yükləmə `contextIsolation: true` və `nodeIntegration: false` ilə `contextBridge` istifadə edərək `window.electronAPI` də ağ siyahıya alınmış API ifşa edir.

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

Açıqlanan üsullar:

| Renderer zəngi                                                    | Növ                        |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | çağırmaq                   |
| `openExternal(url)`                                               | çağırmaq                   |
| `getDataDir()`                                                    | çağırmaq                   |
| `restartServer()`                                                 | çağırmaq                   |
| `getAppVersion()`                                                 | çağırmaq                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | çağırmaq                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | göndər                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | almaq (dizayneri qaytarır) |

Qəbul edən köməkçilər a** dispozisiya funksiyası** `removeAllListeners` — -ə güvənmək əvəzinə bu, React komponentləri yenidən quraşdırıldıqda dinləyicilərin yığılmasının qarşısını alır.

## Server həyat dövrü

`main.js` sistem Nodu ilə yerli modul ABI uyğunsuzluğunun qarşısını almaq üçün Next.js müstəqil paketini birbaşa Electron Node iş vaxtı ilə yaradır:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Əsas məqamlar:

- `waitForServer()` pəncərəni göstərməzdən əvvəl URL 30 saniyəyə qədər sorğulayır (soyuq başlanğıcda boş ekran yoxdur).
- `stdio: "pipe"` stdout/stderr tutur; hazır ifadələr (`Ready` / `listening`) IPC üzərində `server-status: running` yayır .
- `before-quit` zərif SIGTERM (WAL yoxlama məntəqəsi) üçün 5 saniyəyə qədər gözləyir, sonra SIGKILL göndərir.
- Tepsidəki port dəyişdiricisi (`20128`, `3000`, `8080`) serveri dayandırır və yenidən işə salır, sonra BrowserWindow ni yenidən yükləyir.

## Sıfır konfiqurasiyalı Gizli Bootstrap

İlk işə salındıqda, əsas proses çatışmayan sirləri avtomatik olaraq yaradır və saxlayır:

| Gizli                    | Mənbə                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                          |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (şifrələnmiş kreditlər artıq mövcud olduqda imtina edir) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                          |

`<DATA_DIR>/server.env` üçün israr etdi. `DATA_DIR` həll edir:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` və ya `~/.omniroute`
- macOS: `~/.omniroute`

## Ətraf mühit fayl axtarışı

Serveri yumurtlamadan əvvəl əsas proses (`getPreferredEnvFilePath()` in `electron/main.js`) seçilir** bir** `.env` faylı: bunlardan birincisi.

1. `$DATA_DIR/.env`, `DATA_DIR` tətbiqin işə salındığı mühitdə qurulduqda.
2. `<resolved DATA_DIR>/.env`, yuxarıdakı kimi eyni defoltlardan istifadə edərək: `%APPDATA%\omniroute\.env` -də Windows, `$XDG_CONFIG_HOME/omniroute/.env` və `~/.omniroute/.env` -də Linux və ya macOS.
3. `.env` prosesinin iş kataloqunda.

Əsas proses yalnız həmin faylı oxuyur; sonrakı namizədlər birləşdirilmir. Daha sonra server mühiti bu üstünlüklə qurulur (əvvəlcə ən yüksək):

1. Electron proses mühiti (tətbiqi işə salan hər hansı dəyişənlərdən miras qalmış).
2. Seçilmiş `.env` faylı.
3. `<DATA_DIR>/server.env` (yuxarıdakı yükləmə sirləri).

Tətbiq işə salındıqda proses mühiti ələ keçirilir, ona görə də proqram işləyərkən təyin edilmiş sistem və ya istifadəçi mühiti dəyişəni (pəncərəsi bağlandıqdan sonra nimçədə oturarkən daxil olmaqla) proqram tam çıxana və yenidən işə salınana qədər serverə çatmır. `CONTEXT_LENGTH_<PROVIDER>` kimi iş vaxtı düymələri üçün ( [Ətraf mühit Dəyişənləri: Hər provayder üçün kontekst uzunluğuna](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) baxın), `.env` faylına üstünlük verin, sonra tamamilə çıxın (tepə,** Çıxın** ) və yenidən işə salın.

## Pəncərə və Tabla

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light at `{ x: 16, y: 16 }`.
- Windows/Linux: yerli başlıq çubuğu.
- Bağlama düyməsi nimçəyə endirilir; tepsi menyusu var** OmniRoute açın** ,** İdarə Panelini açın** (xarici brauzer),** Server Portu** alt menyu,** Yeniləmələri yoxlayın** ,** Çıxın** .

## Məzmun Təhlükəsizliyi Siyasəti

`session.defaultSession.webRequest.onHeadersReceived` vasitəsilə təyin edin. Görkəmli direktivlər:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev rejimi yalnız `script-src` -ə `'unsafe-eval'` əlavə edir

## Avtomatik yeniləmə

GitHub provayderi (`diegosouzapw/OmniRoute`) ilə `electron-updater` istifadə edir.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Tədbirlər `update-status` IPC vasitəsilə rendererə yönləndirildi: `checking`, `available`, `not-available`, `downloading` ( `percent` ilə), `downloaded`, `error`
- `installUpdate()` serveri öldürür, sonra `autoUpdater.quitAndInstall()` çağırır
- Dev rejimində atlandı (`!app.isPackaged`)

## Boru kəməri tikmək

1. `npm run build` → Next.js `.next/standalone` də müstəqil .
2. `prepare-electron-standalone.mjs` → yenidən `.next/electron-standalone` -ə mərhələlərlə keçir və `server.js` + `required-server-files.json` daxilində mütləq yolları yenidən yazır, beləliklə paketin yerini dəyişdirmək olar.
3. `electron-builder` paketləri `main.js`, `preload.js`, `node_modules` və `extraResources: { ../.next/electron-standalone → app }`.

### Hədəflər qurun

| OS      | Hədəflər                                   |
| ------- | ------------------------------------------ |
| Windows | NSIS quraşdırıcısı + portativ (x64)        |
| macOS   | DMG (Intel + arm64, Tətbiqlərə sürükləyin) |
| Linux   | AppImage + DEB (x64 + arm64)               |

NSIS parametrləri: `oneClick: false`, istifadəçiyə quraşdırma kataloqunu seçməyə imkan verir, Masaüstü və Başlat-Menyu qısa yollarını yaradır.

## Tüstü Testi Paketli Quraşdırma

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Cari platforma üçün `electron/dist-electron/` -da paketlənmiş binari avtomatik kəşf edir.
- Tərtibatçı məlumatlarına toxunmamaq üçün təcrid olunmuş `HOME`/`APPDATA`/`XDG_*` qovluqları ilə işə salınır.
- 45 saniyə ərzində HTTP 200 üçün `http://127.0.0.1:20128/login` sorğuları.
- Ölümcül nümunələr üçün stderr/stdout saatları (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` və s.).
- Hazır olduqdan sonra 2 s stabil işləmə müddətini gözləyir, sonra SIGTERM verir və portun boşalmasını gözləyir.
- CI-da `--no-sandbox --disable-gpu` avtomatik keçir (və `--disable-dev-shm-usage` -də Linux).

Env ləğv edir: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kod İmzalanması

`electron/package.json` edir** yox** etimadnamələrin birbaşa imzalanması. Onları env vars vasitəsilə `electron-builder` ötürün:

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

AppImage imzalanması isteğe bağlıdır — dəsti `LINUX_GPG_KEY` imzalanırsa.

## Paylanma

Artefaktlar `electron/dist-electron/` enir:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Buraxılışlar GitHub Releases (`diegosouzapw/OmniRoute`) üzərində dərc olunur, bu da `electron-updater` yeni versiyaları yoxladığı yerdir.

## Problemlərin aradan qaldırılması

| Simptom                                                            | Düzəlt                                                                                                                                                                      |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron əsas zərbədən sonra `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 göndərir Node-API əvvəlcədən — `npm install` ni kökdə və `prepare:bundle` -də yenidən işə salır (o, cari platforma üçün əvvəlcədən qurulmasını yoxlayır) |
| Doğma modul üçün `ERR_DLOPEN_FAILED`                               | `prepare:bundle` — yenidən işə salın, cari platforma üçün Node-API əvvəlcədən qurulma olmadıqda tez uğursuz olur.                                                           |
| Pəncərə Linux-da boş görünür                                       | Next.js serverinin əslində PORT ə bağlı olduğunu təsdiqləyin ( `[Server]` qeydlərini yoxlayın)                                                                              |
| macOS notariat stendləri                                           | `APPLE_*` varlarının yalnız `.env` də deyil, ixrac edildiyinə əmin olun                                                                                                     |
| Windows SmartScreen xəbərdarlığı                                   | EV sertifikatı ilə daxil olun və ya istifadəçilər → "Hər halda işə salın" üzərinə sağ klikləyin                                                                             |
| Port-in-istifadə ilə tüstü testi uğursuz oldu                      | `electron:smoke:packaged` işə salmazdan əvvəl 20128-də istənilən yerli dev serveri dayandırın                                                                               |

## Həmçinin baxın

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Mənbə: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Köməkçilər: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
