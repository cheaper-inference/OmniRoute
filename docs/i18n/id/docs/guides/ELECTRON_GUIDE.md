# Electron Desktop Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sumber kebenaran:** ruang kerja `electron/`** Terakhir diperbarui:** 28-06-2026 — v3.8.40

OmniRoute mengirimkan aplikasi desktop lintas platform (Windows / macOS / Linux) yang dibangun di atasnya**Electron 41** +** pembangun elektron 26.10** . Aplikasi desktop memunculkan server mandiri Next.js sebagai proses anak, mengarahkan `BrowserWindow` ke sana, dan menambahkan baki sistem, pembaru otomatis, jembatan IPC, dan bootstrap rahasia tanpa konfigurasi.

## Arsitektur

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

Dikonfirmasi dari `electron/package.json`:

| Kemasan            | Versi                                                           |
| ------------------ | --------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                       |
| `electron-builder` | `^26.15.3`                                                      |
| `electron-updater` | `^6.8.9`                                                        |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuild — tanpa Electron build ulang) |
| Versi aplikasi     | `3.8.0`                                                         |
| ID aplikasi        | `online.omniroute.desktop`                                      |
| Nama Produk        | `OmniRoute`                                                     |

## Skrip (root `package.json`)

| Naskah                            | Tujuan                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Memulai `npm run dev` + menunggu `localhost:20128` + meluncurkan Electron          |
| `npm run electron:build`          | Bangun Next.js lalu jalankan `electron-builder` untuk OS saat ini                  |
| `npm run electron:build:win`      | Membangun pemasang Windows NSIS + portable (x64)                                   |
| `npm run electron:build:mac`      | Membangun macOS DMG (Intel + Apple Silicon)                                        |
| `npm run electron:build:linux`    | Membangun Linux AppImage + DEB (x64 + arm64)                                       |
| `npm run electron:smoke:packaged` | Meluncurkan paket biner dan menyelidiki `/login` untuk HTTP 200, lalu mematikannya |

Ruang kerja `electron/` juga memperlihatkan:

- `npm run prepare:bundle` — menjalankan `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — lengkungan tunggal macOS build
- `npm run pack` — pembuatan khusus direktori untuk pengujian lokal (tanpa penginstal)

## Paket runtime opsional

Versi desktop dapat menerbitkan arsip runtime opsional bersama penginstalnya. Payload server yang diinstal berisi `optional-packs.index.json` (di bawah `resources/app` di Windows dan Linux). Untuk entri `browser-runtime`, baca `packs[].tarball` dan unduh** nama file yang sama persis dari rilis yang sama** . Nama arsip menyertakan intisari SHA-256 ; build yang berbeda mungkin memerlukan arsip yang berbeda. Jaga agar nama file yang diunduh tidak berubah.

Salin indeks aplikasi terinstal dan arsip yang dipilih ke dalam satu direktori, lalu gunakan CLI dari rilis yang sama:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` menampilkan status instalasi dan verifikasi, bukan nama file arsip. Indeks yang dibundel memilih arsip. Instalasi memverifikasi checksum arsipnya sebelum ekstraksi dan checksum paketnya sebelum mengganti paket yang diinstal. Bunyinya file lokal; itu tidak mengunduh arsip yang hilang. Mulai ulang aplikasi setelah instalasi. Jika rilis tidak memiliki aset yang cocok, paket opsional tidak tersedia melalui aset rilis tersebut.

## Tata Letak Direktori

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

Baik `main.js` maupun `preload.js` adalah** file CommonJS `.js`** , bukan TypeScript. Pengetikan di sisi penyaji ada di `electron/types.d.ts`.

## Jembatan IPC (`preload.js`)

Pramuat menampilkan API yang masuk daftar putih di `window.electronAPI` menggunakan `contextBridge` dengan `contextIsolation: true` dan `nodeIntegration: false`.

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

Metode yang terpapar:

| Panggilan penyaji                                                 | Jenis                             |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | memohon                           |
| `openExternal(url)`                                               | memohon                           |
| `getDataDir()`                                                    | memohon                           |
| `restartServer()`                                                 | memohon                           |
| `getAppVersion()`                                                 | memohon                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | memohon                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | mengirim                          |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | menerima (mengembalikan pembuang) |

Pembantu penerima mengembalikan a** fungsi pembuang** daripada mengandalkan `removeAllListeners` — hal ini mencegah akumulasi pendengar ketika komponen React dipasang ulang.

## Siklus Hidup Server

`main.js` memunculkan bundel mandiri Next.js secara langsung dengan runtime Node Electron untuk menghindari ketidakcocokan modul asli ABI dengan Node sistem:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Highlight:

- `waitForServer()` melakukan polling pada URL hingga 30 detik sebelum menampilkan jendela (tidak ada layar kosong saat cold start).
- `stdio: "pipe"` menangkap stdout/stderr; frase siap (`Ready` / `listening`) memancarkan `server-status: running` atas IPC.
- `before-quit` menunggu hingga 5 detik untuk SIGTERM ( pos pemeriksaan WAL ) yang anggun lalu mengirimkan SIGKILL.
- Pengalih port di baki (`20128`, `3000`, `8080`) berhenti dan memulai ulang server, lalu memuat ulang BrowserWindow.

## Bootstrap Rahasia Tanpa Konfigurasi

Pada peluncuran pertama, proses utama secara otomatis menghasilkan dan menyimpan rahasia yang hilang:

| Rahasia                  | Sumber                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                             |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (menolak jika kredit terenkripsi sudah ada) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                             |

Bertahan hingga `<DATA_DIR>/server.env`. `DATA_DIR` memutuskan untuk:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` atau `~/.omniroute`
- macOS: `~/.omniroute`

## Pencarian file lingkungan

Sebelum memunculkan server, proses utama (`getPreferredEnvFilePath()` di `electron/main.js`) mengambil** satu** file `.env` : yang pertama ada.

1. `$DATA_DIR/.env`, ketika `DATA_DIR` diatur di lingkungan tempat aplikasi diluncurkan.
2. `<resolved DATA_DIR>/.env`, menggunakan default yang sama seperti di atas: `%APPDATA%\omniroute\.env` pada Windows, `$XDG_CONFIG_HOME/omniroute/.env` atau `~/.omniroute/.env` pada Linux dan macOS.
3. `.env` di direktori kerja proses.

Proses utama hanya membaca file itu; kandidat selanjutnya tidak digabungkan. Lingkungan server kemudian dibangun dengan prioritas ini (yang tertinggi terlebih dahulu):

1. Lingkungan proses Electron (variabel yang diwarisi dari apa pun yang meluncurkan aplikasi).
2. File `.env` yang dipilih.
3. `<DATA_DIR>/server.env` (rahasia bootstrap di atas).

Lingkungan proses ditangkap saat aplikasi dimulai, sehingga variabel lingkungan sistem atau pengguna yang disetel saat aplikasi sedang berjalan (termasuk saat berada di baki setelah jendelanya ditutup) tidak mencapai server hingga aplikasi sepenuhnya ditutup dan diluncurkan kembali. Untuk kenop runtime seperti `CONTEXT_LENGTH_<PROVIDER>` (lihat [Variabel Lingkungan: Panjang konteks per penyedia](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), pilih file `.env`, lalu tutup sepenuhnya (baki,** Berhenti** ) dan luncurkan kembali.

## Jendela & Baki

- `BrowserWindow`: 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, lampu lalu lintas di `{ x: 16, y: 16 }`.
- Windows/Linux: bilah judul asli.
- Tombol tutup memperkecil ke baki; menu baki miliki** Buka OmniRoute** ,** Buka Dasbor** (peramban eksternal),** Pelabuhan Server** submenu,** Periksa Pembaruan** ,** Berhenti** .

## Kebijakan Keamanan Konten

Diatur melalui `session.defaultSession.webRequest.onHeadersReceived`. Arahan penting:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Mode pengembang hanya menambahkan `'unsafe-eval'` ke `script-src`

## Pembaruan otomatis

Menggunakan `electron-updater` dengan penyedia GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Acara diteruskan ke penyaji melalui `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (dengan `percent`), `downloaded`, `error`
- `installUpdate()` mematikan server lalu memanggil `autoUpdater.quitAndInstall()`
- Dilewati dalam mode dev (`!app.isPackaged`)

## Membangun Saluran Pipa

1. `npm run build` → Next.js mandiri di `.next/standalone`.
2. `prepare-electron-standalone.mjs` → melakukan tahapan ulang menjadi `.next/electron-standalone` dan menulis ulang jalur absolut di dalam `server.js` + `required-server-files.json` sehingga bundel dapat direlokasi.
3. paket `electron-builder` `main.js`, `preload.js`, `node_modules`, dan `extraResources: { ../.next/electron-standalone → app }`.

### Membangun target

| OS      | Target                                |
| ------- | ------------------------------------- |
| Windows | pemasang NSIS + portabel (x64)        |
| macOS   | DMG (Intel + arm64, drag-to-Aplikasi) |
| Linux   | AppImage + DEB (x64 + lengan64)       |

pengaturan NSIS : `oneClick: false`, memungkinkan pengguna memilih direktori instalasi, membuat pintasan Desktop dan Start-Menu.

## Pembuatan Paket Pengujian Asap

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Temukan secara otomatis biner yang dikemas dalam `electron/dist-electron/` untuk platform saat ini.
- Diluncurkan dengan direktori `HOME`/`APPDATA`/`XDG_*` yang terisolasi sehingga tidak menyentuh data pengembang.
- Jajak pendapat `http://127.0.0.1:20128/login` untuk HTTP 200 dalam waktu 45 detik.
- Perhatikan stderr/stdout untuk pola fatal (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, dll.).
- Menunggu waktu proses stabil selama 2 detik setelah kesiapan, lalu mengeluarkan SIGTERM dan menunggu port kosong.
- Di CI, secara otomatis melewati `--no-sandbox --disable-gpu` (dan `--disable-dev-shm-usage` di Linux).

Env menimpa: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Penandatanganan Kode

`electron/package.json` melakukannya** bukan** kredensial penandatanganan kawat secara langsung. Teruskan melalui env vars ke `electron-builder`:

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

penandatanganan AppImage adalah opsional — set `LINUX_GPG_KEY` jika penandatanganan.

## Distribusi

Artefak mendarat di `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Rilis dipublikasikan ke GitHub Releases (`diegosouzapw/OmniRoute`), yang juga merupakan tempat `electron-updater` memeriksa versi baru.

## Pemecahan masalah

| Gejala                                                                | Memperbaiki                                                                                                                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` setelah Electron benjolan besar | better-sqlite3 v13 mengirimkan prebuild Node-API — menjalankan kembali `npm install` di root dan `prepare:bundle` (ini memverifikasi prebuild untuk platform saat ini) |
| `ERR_DLOPEN_FAILED` untuk modul asli                                  | Jalankan kembali `prepare:bundle` — gagal dengan cepat ketika prebuild Node-API untuk platform saat ini tidak ada                                                      |
| Jendela tampak kosong di Linux                                        | Konfirmasikan server Next.js benar-benar terikat ke PORT (periksa log `[Server]` )                                                                                     |
| macOS notaris terhenti                                                | Pastikan `APPLE_*` vars diekspor, bukan hanya di `.env`                                                                                                                |
| peringatan Windows SmartScreen                                        | Masuk dengan EV cert, atau pengguna klik kanan → "Lagi pula"                                                                                                           |
| Tes asap gagal dengan port yang digunakan                             | Hentikan server dev lokal mana pun pada tahun 20128 sebelum menjalankan `electron:smoke:packaged`                                                                      |

## Lihat Juga

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sumber: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pembantu: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
