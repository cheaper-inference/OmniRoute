# Electron Desktop Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Gerçeğin kaynağı:** `electron/` çalışma alanı** Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute platformlar arası bir masaüstü uygulaması (Windows / macOS / Linux) üzerine kurulu olarak gelir**Electron 41** +** elektron oluşturucu 26.10** . Masaüstü uygulaması Next.js bağımsız sunucusunu bir alt süreç olarak oluşturur, ona bir `BrowserWindow` işaret eder ve bir sistem tepsisi, otomatik güncelleyici, IPC köprüsü ve sıfır yapılandırmalı gizli önyükleme ekler.

## Mimarlık

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

## Sürümler

`electron/package.json` onaylandı:

| Paket              | Sürüm                                                                        |
| ------------------ | ---------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                    |
| `electron-builder` | `^26.15.3`                                                                   |
| `electron-updater` | `^6.8.9`                                                                     |
| `better-sqlite3`   | root `^13.0.2` (Node-API — önceden oluşturur, Electron yeniden oluşturulmaz) |
| Uygulama sürümü    | `3.8.0`                                                                      |
| Uygulama kimliği   | `online.omniroute.desktop`                                                   |
| Ürün adı           | `OmniRoute`                                                                  |

## Komut dosyaları (kök `package.json`)

| Senaryo                           | Amaç                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` başlatır + bekler `localhost:20128` + Electron                              |
| `npm run electron:build`          | Next.js oluşturur ve ardından mevcut OS için `electron-builder` çalıştırır                |
| `npm run electron:build:win`      | Windows NSIS yükleyicisini oluşturur + taşınabilir (x64)                                  |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) oluşturur                                               |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) oluşturur                                              |
| `npm run electron:smoke:packaged` | Paketlenmiş ikili programı başlatır ve HTTP 200 için `/login` araştırır, ardından kapanır |

`electron/` çalışma alanı ayrıca şunları da ortaya çıkarır:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` çalıştırır
- `npm run build:mac-x64` / `build:mac-arm64` — tek kemerli macOS yapıları
- `npm run pack` — yerel test için yalnızca dizin yapısı (yükleyici yok)

## İsteğe bağlı çalışma zamanı paketleri

Masaüstü yapıları, yükleyicileriyle birlikte isteğe bağlı çalışma zamanı arşivleri yayınlayabilir. Kurulu sunucu verisi `optional-packs.index.json` içerir ( Windows ve Linux `resources/app` altında). `browser-runtime` girişi için `packs[].tarball` okuyun ve indirin** aynı sürümdeki tam dosya adı** . Arşiv adları bir SHA-256 özeti içerir; farklı yapılar farklı arşivler gerektirebilir. İndirilen dosya adını değiştirmeden bırakın.

Yüklü uygulamanın dizinini ve seçilen arşivi tek bir dizine kopyalayın, ardından aynı sürümdeki CLI kullanın:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` arşiv dosya adını değil, kurulum ve doğrulama durumunu görüntüler. Paketlenmiş dizin arşivi seçer. Kurulum, çıkarmadan önce arşiv sağlama toplamını ve kurulu paketi değiştirmeden önce paket sağlama toplamlarını doğrular. Yerel dosyaları okur; eksik arşivleri indirmez. Kurulumdan sonra uygulamayı yeniden başlatın. Sürümün eşleşen bir varlığı yoksa isteğe bağlı paket, o sürümün varlıkları aracılığıyla kullanılamaz.

## Dizin Düzeni

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

Hem `main.js` hem de `preload.js`**CommonJS `.js` dosyaları** , TypeScript değil. Oluşturucu tarafı yazmaları `electron/types.d.ts` bulunur.

## IPC Köprüsü (`preload.js`)

Ön yükleme, `contextIsolation: true` ve `nodeIntegration: false` ile `contextBridge` kullanarak `window.electronAPI` üzerinde beyaz listeye alınmış bir API ortaya çıkarır.

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

Maruz kalan yöntemler:

| Oluşturucu çağrısı                                                | Tip                             |
| ----------------------------------------------------------------- | ------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | çağırmak                        |
| `openExternal(url)`                                               | çağırmak                        |
| `getDataDir()`                                                    | çağırmak                        |
| `restartServer()`                                                 | çağırmak                        |
| `getAppVersion()`                                                 | çağırmak                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | çağırmak                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | Göndermek                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | almak (atıklayıcıyı iade etmek) |

Alma yardımcıları bir** öğütücü işlevi** `removeAllListeners` — güvenmek yerine bu, React bileşenleri yeniden bağlandığında dinleyici birikimini önler.

## Sunucu Yaşam Döngüsü

`main.js` yerel modül ABI sistem Düğümü ile eşleşmemesini önlemek için Next.js bağımsız paketini doğrudan Electron Düğümü çalışma zamanı ile oluşturur:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Öne çıkanlar:

- `waitForServer()` pencereyi göstermeden önce 30 saniyeye kadar URL yoklar (soğuk başlatmada boş ekran yoktur).
- `stdio: "pipe"` stdout/stderr yakalar; hazır ifadeler (`Ready` / `listening`) IPC üzerinden `server-status: running` yayar.
- `before-quit` zarif SIGTERM (WAL kontrol noktası) için 5 saniyeye kadar bekler ve ardından SIGKILL gönderir.
- Tepsideki bağlantı noktası değiştirici (`20128`, `3000`, `8080`) sunucuyu durdurup yeniden başlatır ve ardından BrowserWindow yeniden yükler.

## Sıfır Yapılandırmalı Gizli Önyükleme

İlk başlatmada ana süreç, eksik sırları otomatik olarak oluşturur ve devam ettirir:

| Gizli                    | Kaynak                                                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (şifrelenmiş kimlik bilgileri zaten mevcutsa reddeder) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                        |

`<DATA_DIR>/server.env` ısrar etti. `DATA_DIR` şu şekilde çözülür:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` veya `~/.omniroute`
- macOS: `~/.omniroute`

## Ortam dosyası arama

Sunucuyu oluşturmadan önce ana süreç ( `electron/main.js` `getPreferredEnvFilePath()` ) seçimleri yapar.** bir** `.env` dosyası: bunlardan ilki.

1. `$DATA_DIR/.env`, uygulamanın başlatıldığı ortamda `DATA_DIR` ayarlandığında.
2. `<resolved DATA_DIR>/.env`, yukarıdakiyle aynı varsayılanları kullanır: Windows üzerinde `%APPDATA%\omniroute\.env`, `$XDG_CONFIG_HOME/omniroute/.env` veya `~/.omniroute/.env` ve Linux üzerinde macOS.
3. süreç çalışma dizininde `.env`.

Ana süreç yalnızca o dosyayı okur; daha sonraki adaylar birleştirilmez. Sunucu ortamı daha sonra şu öncelik ile oluşturulur (önce en yüksek):

1. Electron süreç ortamı (uygulamayı başlatan şeyden miras alınan değişkenler).
2. Seçilen `.env` dosyası.
3. `<DATA_DIR>/server.env` (yukarıdaki önyükleme sırları).

İşlem ortamı, uygulama başlatıldığında yakalanır; dolayısıyla, uygulama çalışırken (pencere kapatıldıktan sonra tepside durduğu süre dahil) ayarlanan bir sistem veya kullanıcı ortamı değişkeni, uygulamadan tamamen çıkılıp yeniden başlatılana kadar sunucuya ulaşmaz. `CONTEXT_LENGTH_<PROVIDER>` gibi çalışma zamanı düğmeleri için (bkz. [Ortam Değişkenleri: Sağlayıcı başına bağlam uzunluğu](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), `.env` dosyasını tercih edin ve ardından tamamen çıkın (tepsi,** Çıkış yapmak** ) ve yeniden başlatın.

## Pencere ve Tepsi

- `BrowserWindow`: 1400 × 900 (en az 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` trafik ışığı.
- Windows/Linux: yerel başlık çubuğu.
- Kapatma düğmesi tepsiye küçülür; tepsi menüsü var** OmniRoute aç** ,** Kontrol Panelini Aç** (harici tarayıcı),** Sunucu Bağlantı Noktası** alt menü,** Güncellemeleri Kontrol Et** ,** Çıkış yapmak** .

## İçerik Güvenliği Politikası

`session.defaultSession.webRequest.onHeadersReceived` aracılığıyla ayarlayın. Önemli direktifler:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Geliştirme modu `'unsafe-eval'` yalnızca `script-src` ekler

## Otomatik güncelleme

`electron-updater` GitHub sağlayıcısıyla (`diegosouzapw/OmniRoute`) kullanır.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Oluşturucuya `update-status` IPC aracılığıyla iletilen olaylar: `checking`, `available`, `not-available`, `downloading` ( `percent` ile), `downloaded`, `error`
- `installUpdate()` sunucuyu öldürür ve ardından `autoUpdater.quitAndInstall()` çağırır
- Geliştirme modunda atlandı (`!app.isPackaged`)

## Ardışık Düzen Oluştur

1. `npm run build` → Next.js `.next/standalone` bağımsız.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` olarak yeniden aşamalandırılır ve `server.js` + `required-server-files.json` içindeki mutlak yolları yeniden yazar, böylece paket yeniden konumlandırılabilir olur.
3. `electron-builder` paketleri `main.js`, `preload.js`, `node_modules` ve `extraResources: { ../.next/electron-standalone → app }`.

### Hedefler oluşturun

| OS      | Hedefler                                  |
| ------- | ----------------------------------------- |
| Windows | NSIS yükleyici + taşınabilir (x64)        |
| macOS   | DMG (Intel + arm64, Uygulamalara sürükle) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS ayarları: `oneClick: false`, kullanıcının kurulum dizinini seçmesine olanak tanır, Masaüstü ve Başlat Menüsü kısayolları oluşturur.

## Duman Testi Paketlenmiş Yapı

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Geçerli platform için `electron/dist-electron/` paketlenmiş ikili dosyayı otomatik olarak keşfeder.
- Geliştirici verilerine dokunmaması için yalıtılmış `HOME`/`APPDATA`/`XDG_*` dizinleriyle başlatılır.
- 45 saniye içinde HTTP 200 için `http://127.0.0.1:20128/login` anketleri.
- Ölümcül kalıplar için stderr/stdout izler (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, vb.).
- Hazır olduktan sonra 2 saniyelik kararlı çalışma süresini bekler, ardından SIGTERM verir ve bağlantı noktasının serbest kalmasını bekler.
- CI `--no-sandbox --disable-gpu` (ve Linux `--disable-dev-shm-usage` ) otomatik olarak geçirir.

Zarf geçersiz kılmaları: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kod İmzalama

`electron/package.json` yapar** Olumsuz** imzalama kimlik bilgilerini doğrudan iletin. Bunları env vars aracılığıyla `electron-builder` iletin:

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

AppImage imzalama isteğe bağlıdır — imzalama durumunda `LINUX_GPG_KEY` ayarlayın.

## Dağıtım

Eserler `electron/dist-electron/` iniyor:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Sürümler, aynı zamanda `electron-updater` yeni sürümleri kontrol ettiği GitHub Sürümlerine (`diegosouzapw/OmniRoute`) yayınlanır.

## Sorun giderme

| Belirti                                                             | Düzeltmek                                                                                                                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Electron büyük darbeden sonra `Cannot find module 'better-sqlite3'` | better-sqlite3 v13, Node-API'yi gönderir, — önceden oluşturulmuş `npm install` kökte yeniden çalıştırır ve `prepare:bundle` (mevcut platform için ön derlemeyi doğrular) |
| yerel modül için `ERR_DLOPEN_FAILED`                                | Mevcut platform için Node-API ön yapısı eksik olduğunda `prepare:bundle` — yeniden çalıştırın, hızlı bir şekilde başarısız olur                                          |
| Linux pencere boş görünüyor                                         | Next.js sunucusunun gerçekten PORT bağlandığını doğrulayın ( `[Server]` günlüklerini kontrol edin)                                                                       |
| macOS noter onay tezgahları                                         | `APPLE_*` değişkenlerinin yalnızca `.env` değil, dışa aktarıldığından emin olun                                                                                          |
| Windows SmartScreen uyarısı                                         | EV sertifikasıyla imzalayın veya kullanıcılar → "Yine de çalıştır"ı sağ tıklayın                                                                                         |
| Kullanımdaki portta duman testi başarısız oluyor                    | `electron:smoke:packaged` çalıştırmadan önce 20128'de herhangi bir yerel dev sunucusunu durdurun                                                                         |

## Ayrıca Bakınız

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Kaynak: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Yardımcılar: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
