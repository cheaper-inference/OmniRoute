# Electron Desktop Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sumber kebenaran:** ruang kerja `electron/`** Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute menghantar apl desktop merentas platform (Windows / macOS / Linux) yang dibina pada**Electron 41** +** pembina elektron 26.10** . Apl desktop menghasilkan pelayan kendiri Next.js sebagai proses anak, menunjuk `BrowserWindow` padanya dan menambah dulang sistem, pengemas kini automatik, jambatan IPC dan tali but rahsia konfigurasi sifar.

## Seni bina

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

## Versi

Disahkan daripada `electron/package.json`:

| Pakej              | Versi                                                          |
| ------------------ | -------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                      |
| `electron-builder` | `^26.15.3`                                                     |
| `electron-updater` | `^6.8.9`                                                       |
| `better-sqlite3`   | root `^13.0.2` (Node-API prabina — tiada Electron bina semula) |
| Versi apl          | `3.8.0`                                                        |
| id apl             | `online.omniroute.desktop`                                     |
| Nama produk        | `OmniRoute`                                                    |

## Skrip ( `package.json` akar )

| Skrip                             | Tujuan                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Mulakan `npm run dev` + menunggu `localhost:20128` + melancarkan Electron      |
| `npm run electron:build`          | Membina Next.js kemudian menjalankan `electron-builder` untuk OS semasa        |
| `npm run electron:build:win`      | Membina Windows NSIS pemasang + mudah alih (x64)                               |
| `npm run electron:build:mac`      | Membina macOS DMG (Intel + Apple Silicon)                                      |
| `npm run electron:build:linux`    | Membina Linux AppImage + DEB (x64 + arm64)                                     |
| `npm run electron:smoke:packaged` | Melancarkan binari berpakej dan kuar `/login` untuk HTTP 200, kemudian ditutup |

Ruang kerja `electron/` juga mendedahkan:

- `npm run prepare:bundle` — menjalankan `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS lengkung tunggal
- binaan direktori `npm run pack` — sahaja untuk ujian tempatan (tiada pemasang)

## Pek masa jalan pilihan

Binaan desktop boleh menerbitkan arkib masa jalan pilihan bersama pemasangnya. Muatan pelayan yang dipasang mengandungi `optional-packs.index.json` (di bawah `resources/app` pada Windows dan Linux). Untuk entri `browser-runtime`, baca `packs[].tarball` dan muat turun** nama fail tepat itu daripada keluaran yang sama** . Nama arkib termasuk ringkasan SHA-256 ; binaan yang berbeza boleh memerlukan arkib yang berbeza. Pastikan nama fail yang dimuat turun tidak berubah.

Salin indeks apl yang dipasang dan arkib yang dipilih ke dalam satu direktori, kemudian gunakan CLI daripada keluaran yang sama:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` memaparkan keadaan pemasangan dan pengesahan, bukan nama fail arkib. Indeks yang digabungkan memilih arkib. Pemasangan mengesahkan checksum arkibnya sebelum pengekstrakan dan checksum pakejnya sebelum menggantikan pek yang dipasang. Ia membaca fail tempatan; ia tidak memuat turun arkib yang hilang. Mulakan semula aplikasi selepas pemasangan. Jika keluaran tidak mempunyai aset yang sepadan, pek pilihan tidak tersedia melalui aset keluaran tersebut.

## Reka Letak Direktori

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

Kedua-dua `main.js` dan `preload.js` adalah**CommonJS `.js`** , bukan TypeScript. Taipan sisi pemapar hidup dalam `electron/types.d.ts`.

## Jambatan IPC (`preload.js`)

Pramuat mendedahkan API yang disenarai putih pada `window.electronAPI` menggunakan `contextBridge` dengan `contextIsolation: true` dan `nodeIntegration: false`.

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

Kaedah terdedah:

| Panggilan pemapar                                                 | taip                           |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | menyeru                        |
| `openExternal(url)`                                               | menyeru                        |
| `getDataDir()`                                                    | menyeru                        |
| `restartServer()`                                                 | menyeru                        |
| `getAppVersion()`                                                 | menyeru                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | menyeru                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | hantar                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | menerima (memulangkan pelupus) |

Pembantu yang menerima kembali a** fungsi pelupusan** daripada bergantung pada `removeAllListeners` — ini menghalang pengumpulan pendengar apabila komponen React dipasang semula.

## Kitaran Hayat Pelayan

`main.js` menghasilkan himpunan kendiri Next.js secara langsung dengan masa jalan Nod Electron untuk mengelakkan ketidakpadanan ABI modul asli dengan Nod sistem:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Sorotan:

- `waitForServer()` meninjau URL sehingga 30 saat sebelum menunjukkan tetingkap (tiada skrin kosong pada permulaan sejuk).
- `stdio: "pipe"` menangkap stdout/stderr; frasa sedia (`Ready` / `listening`) mengeluarkan `server-status: running` atas IPC.
- `before-quit` menunggu sehingga 5 saat untuk SIGTERM yang anggun ( pusat pemeriksaan WAL ) kemudian menghantar SIGKILL.
- Penukar port dalam dulang (`20128`, `3000`, `8080`) berhenti dan memulakan semula pelayan, kemudian muat semula BrowserWindow.

## Bootstrap Rahsia konfigurasi sifar

Pada pelancaran pertama, proses utama menjana automatik dan mengekalkan rahsia yang hilang:

| Rahsia                   | Sumber                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (menolak jika kredit yang disulitkan sudah wujud) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                   |

Bertahan kepada `<DATA_DIR>/server.env`. `DATA_DIR` memutuskan untuk:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` atau `~/.omniroute`
- macOS: `~/.omniroute`

## Carian fail persekitaran

Sebelum melahirkan pelayan, proses utama (`getPreferredEnvFilePath()` dalam `electron/main.js`) memilih** satu** fail `.env` : yang pertama daripada ini wujud.

1. `$DATA_DIR/.env`, apabila `DATA_DIR` ditetapkan dalam persekitaran apl itu dilancarkan dengan.
2. `<resolved DATA_DIR>/.env`, menggunakan lalai yang sama seperti di atas: `%APPDATA%\omniroute\.env` pada Windows, `$XDG_CONFIG_HOME/omniroute/.env` atau `~/.omniroute/.env` pada Linux dan macOS.
3. `.env` dalam direktori kerja proses.

Proses utama hanya membaca fail itu; calon kemudian tidak digabungkan. Persekitaran pelayan kemudian dibina dengan keutamaan ini (tertinggi dahulu):

1. Persekitaran proses Electron (pembolehubah yang diwarisi daripada apa sahaja yang melancarkan apl).
2. Fail `.env` yang dipilih.
3. `<DATA_DIR>/server.env` (rahsia bootstrap di atas).

Persekitaran proses ditangkap apabila apl dimulakan, jadi pembolehubah sistem atau persekitaran pengguna ditetapkan semasa apl sedang berjalan (termasuk semasa ia duduk di dalam dulang selepas tetingkapnya ditutup) tidak sampai ke pelayan sehingga apl dihentikan sepenuhnya dan dilancarkan semula. Untuk tombol masa jalan seperti `CONTEXT_LENGTH_<PROVIDER>` (lihat [Pembolehubah Persekitaran: Panjang konteks setiap penyedia](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), lebih suka fail `.env`, kemudian berhenti sepenuhnya (dulang,** Berhenti** ) dan melancarkan semula.

## Tingkap & Dulang

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, lampu isyarat di `{ x: 16, y: 16 }`.
- Windows/Linux: bar tajuk asli.
- Butang tutup diminimumkan ke dulang; menu dulang mempunyai** Buka OmniRoute** ,** Buka Papan Pemuka** (pelayar luaran),** Pelabuhan Pelayan** submenu,** Semak Kemas Kini** ,** Berhenti** .

## Dasar Keselamatan Kandungan

Tetapkan melalui `session.defaultSession.webRequest.onHeadersReceived`. Arahan yang ketara:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Mod pembangun menambahkan `'unsafe-eval'` pada `script-src` sahaja

## Kemas kini automatik

Menggunakan `electron-updater` dengan pembekal GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Acara dimajukan kepada pemapar melalui `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (dengan `percent`), `downloaded`, `error`
- `installUpdate()` membunuh pelayan kemudian memanggil `autoUpdater.quitAndInstall()`
- Dilangkau dalam mod dev (`!app.isPackaged`)

## Bina Saluran Paip

1. `npm run build` → Next.js kendiri dalam `.next/standalone`.
2. `prepare-electron-standalone.mjs` → berperingkat semula menjadi `.next/electron-standalone` dan menulis semula laluan mutlak di dalam `server.js` + `required-server-files.json` supaya berkas boleh dipindahkan.
3. pakej `electron-builder` `main.js`, `preload.js`, `node_modules` dan `extraResources: { ../.next/electron-standalone → app }`.

### Bina sasaran

| OS      | Sasaran                                   |
| ------- | ----------------------------------------- |
| Windows | pemasang NSIS + mudah alih (x64)          |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + lengan64)           |

NSIS settings: `oneClick: false`, membenarkan pengguna memilih direktori pemasangan, mencipta pintasan Desktop dan Start-Menu.

## Binaan Berbungkus Ujian Asap

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Auto temui binari berpakej dalam `electron/dist-electron/` untuk platform semasa.
- Dilancarkan dengan direktori `HOME`/`APPDATA`/`XDG_*` terpencil supaya ia tidak menyentuh data pembangun.
- Tinjauan `http://127.0.0.1:20128/login` untuk HTTP 200 dalam masa 45 saat.
- Menonton stderr/stdout untuk corak maut (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, dsb.).
- Menunggu 2 saat masa jalan yang stabil selepas kesediaan, kemudian mengeluarkan SIGTERM dan menunggu port dibebaskan.
- Dalam CI, secara automatik melepasi `--no-sandbox --disable-gpu` (dan `--disable-dev-shm-usage` pada Linux).

Env mengatasi: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Penandatanganan Kod

`electron/package.json` buat** bukan** bukti kelayakan menandatangani wayar secara langsung. Hantarkannya melalui env vars ke `electron-builder`:

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

tandatangan AppImage adalah pilihan — set `LINUX_GPG_KEY` jika menandatangani.

## Pengagihan

Artifak mendarat di `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Keluaran diterbitkan ke GitHub Releases (`diegosouzapw/OmniRoute`), yang juga merupakan tempat `electron-updater` menyemak versi baharu.

## Menyelesaikan masalah

| simptom                                                               | Betulkan                                                                                                                                                     |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` selepas Electron benjolan utama | better-sqlite3 v13 menghantar Node-API prabina — jalankan semula `npm install` pada akar dan `prepare:bundle` (ia mengesahkan prabina untuk platform semasa) |
| `ERR_DLOPEN_FAILED` untuk modul asli                                  | Jalankan semula `prepare:bundle` — ia gagal dengan pantas apabila prabinaan Node-API untuk platform semasa tiada                                             |
| Tetingkap kelihatan kosong pada Linux                                 | Sahkan pelayan Next.js sebenarnya terikat kepada PORT (semak log `[Server]` )                                                                                |
| gerai notarization macOS                                              | Pastikan `APPLE_*` vars dieksport, bukan hanya dalam `.env`                                                                                                  |
| Windows SmartScreen                                                   | Tandatangan dengan sijil EV, atau pengguna klik kanan → "Jalankan juga"                                                                                      |
| Ujian asap gagal dengan port-in-use                                   | Hentikan mana-mana pelayan pembangun tempatan pada 20128 sebelum menjalankan `electron:smoke:packaged`                                                       |

## Lihat Juga

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sumber: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pembantu: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
