# Plugin Marketplace (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sumber acuan:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, dan
> `src/app/(dashboard)/dashboard/plugins/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menyediakan sistem plugin bergaya WordPress. Plugin merupakan direktori
mandiri — masing-masing dengan manifes `plugin.json` dan sebuah file entri — yang terhubung
ke pipeline permintaan (`onRequest` / `onResponse` / `onError`) serta ke
peristiwa siklus hidup (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Marketplace Plugin** merupakan lapisan penemuan di atas sistem tersebut. Lapisan ini
menyediakan katalog plugin yang dapat dipasang dan ditelusuri. Secara default, katalog
tersebut berupa registri seed bawaan berukuran kecil; operator dapat mengarahkannya ke URL
registri jarak jauh khusus. Dalam hal ini, pengambilan data diperkuat dengan perlindungan SSRF
yang melakukan resolusi DNS (lihat [Keamanan](#security)).

Setiap rute plugin **hanya dapat diakses melalui loopback** (Tingkat 1 — `LOCAL_ONLY`): plugin memuat
dan mengeksekusi kode dalam proses anak, sehingga rute tersebut tidak dapat dijangkau dari
origin non-loopback, terlepas dari autentikasi. Lihat
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Bagaimana Ini Cocok Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Lapisan registri** — `src/lib/plugins/marketplace.ts`: mencantumkan / mencari katalog, kembali ke registri benih jika ada kegagalan.
- **Lapisan siklus hidup** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): menginstal, meningkatkan, mengaktifkan, menonaktifkan, menghapus instalan, memindai, memuat startup.
- **Lapisan manifes** — `src/lib/plugins/manifest.ts`: skema Zod + default untuk `plugin.json`.
- **Pemindai** — `src/lib/plugins/scanner.ts`: menemukan plugin pada disk di bawah direktori plugin.
- **Pemuat** — `src/lib/plugins/loader.ts`: memunculkan setiap plugin dalam proses anak Node.js yang terpisah dan broker menghubungkan panggilan melalui IPC. Anak tersebut bukan kotak pasir (lihat "Isolasi eksekusi plugin" di bawah).

## Katalog Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) mengembalikan daftar
objek `MarketplaceEntry`:

| Bidang        | Tipe     | Keterangan                                  |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Nama plugin dalam kebab-case                |
| `version`     | string   | semver                                      |
| `description` | string   | Ringkasan singkat                           |
| `author`      | string   | Penulis / organisasi                        |
| `license`     | string   | ID lisensi bergaya SPDX                     |
| `downloadUrl` | string   | URL unduhan sumber (boleh kosong)           |
| `repository`  | string?  | URL repositori opsional                     |
| `tags`        | string[] | Tag pencarian/filter                        |
| `downloads`   | number   | Jumlah unduhan                              |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Apakah entri ditandai sebagai terverifikasi |
| `lastUpdated` | string   | String tanggal menyerupai format ISO        |

Jika tidak ada URL registri khusus yang dikonfigurasi, katalog menggunakan
`SEED_REGISTRY` bawaan (saat ini `request-logger`, `rate-limiter`, `cost-tracker`, dan
`theme-manager`). Registri seed selalu tersedia — jika registri jarak jauh yang
dikonfigurasi tidak dapat dijangkau, mengembalikan status selain `200`, atau mengembalikan
isi yang tidak dikenali, `listMarketplacePlugins()` mencatat peringatan dan kembali
menggunakan daftar seed.

> Catatan: **katalog** marketplace (penelusuran/pencarian) telah terhubung secara menyeluruh, tetapi
> **pemasangan** sekali klik dari katalog marketplace belum diimplementasikan — tombol
> "Pasang" pada entri marketplace di dasbor saat ini menampilkan pemberitahuan
> "segera hadir". Saat ini, pemasangan dilakukan melalui alur pemasangan dari jalur lokal
> (`POST /api/plugins`) dan penemuan pada disk (`POST /api/plugins/scan`).

## REST API

Semua titik akhir memerlukan autentikasi manajemen (`requireManagementAuth`)** Dan** adalah — `/api/plugins` dan `/api/plugins/` khusus loopback yang terdaftar di `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Titik akhir                      | Metode | Keterangan                                                  |
| -------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                   | GET    | Daftar plugin yang diinstal (filter `?status=` opsional)    |
| `/api/plugins`                   | POST   | Instal plugin dari direktori sumber plugin                  |
| `/api/plugins/scan`              | POST   | Pindai direktori plugin dan daftarkan plugin baru           |
| `/api/plugins/marketplace`       | GET    | Daftar entri katalog pasar                                  |
| `/api/plugins/[name]`            | GET    | Dapatkan detail plugin yang diinstal                        |
| `/api/plugins/[name]`            | DELETE | Copot pemasangan plugin                                     |
| `/api/plugins/[name]/activate`   | POST   | Aktifkan (muat kait register + )                            |
| `/api/plugins/[name]/deactivate` | POST   | Nonaktifkan (api `onDeactivate`, batalkan pendaftaran kait) |
| `/api/plugins/[name]/config`     | GET    | Dapatkan skema konfigurasi plugin config +                  |
| `/api/plugins/[name]/config`     | PUT    | Perbarui konfigurasi plugin (divalidasi berdasarkan skema)  |

Filter `GET /api/plugins` `status` menerima salah satu dari `installed` / `active` / `inactive` / `error`. Nilai yang tidak valid akan mengembalikan `400`.

### Daftar plugin yang diinstal

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instal dari jalur lokal

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` harus berupa** mutlak** jalur ke direktori** di dalam direktori sumber plugin** : `plugin-sources` di sebelah root plugin, jadi `~/.omniroute/plugin-sources/` secara default, atau `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` ketika variabel tersebut disetel (`getPluginSourcesDir()` di `src/lib/plugins/installSource.ts`). Salin atau kloning plugin di sana terlebih dahulu. Penginstalan ditolak dengan `400` ketika jalur berisi `..` atau byte nol, terletak di luar direktori tersebut, diselesaikan di luarnya melalui symlink, berisi symlink yang targetnya berada di luarnya, atau ketika direktori tidak ada. Direktori sumber harus berisi `plugin.json` yang valid (atau merupakan induk dari salah satunya). Jika berhasil, responsnya adalah `201` dengan baris plugin yang diinstal.

Berbeda dengan rute plugin lainnya, rute plugin ini memerlukan kredensial manajemen (sesi dasbor atau kunci API cakupan pengelolaan) bahkan ketika proses masuk dinonaktifkan (`requireLogin=false`): memasang kode tidak pernah merupakan tindakan anonim.

### Jelajahi pasar

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Perbarui konfigurasi plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` memvalidasi setiap nilai yang diberikan terhadap `configSchema` plugin (dideklarasikan dalam manifes): bidang `number` menghormati `min`/`max`, bidang `select` harus cocok dengan `enum` yang dideklarasikan. Kunci yang tidak ada dalam skema diperbolehkan masuk.

## Konfigurasi

### Direktori plugin

Plugin berada di bawah direktori data OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (atau apa pun yang dirujuk oleh manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) menentukan direktori tersebut dalam
tiga langkah:

1. **`OMNIROUTE_PLUGINS_DIR`**, jika ditetapkan — digunakan apa adanya, terlepas dari nilai `HOME`. Ini adalah
   pengaturan eksplisit untuk Docker/K8s, tempat struktur direktori plugin di-bind-mount pada suatu path
   yang biasanya tidak berkaitan dengan direktori home kontainer (#11827).
2. `<home>/.omniroute/plugins`, dengan `<home>` berasal dari variabel lingkungan `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, ketika proses sama sekali tidak mengekspor direktori home.

Direktori yang ditentukan dicatat satu kali saat startup sebagai `scanner.dir_resolved`, dengan menyebutkan
input yang dipilih (`OMNIROUTE_PLUGINS_DIR`, `home`, atau `no-home-fallback`) — sehingga image
yang secara diam-diam berakhir pada langkah 3 akan menyatakannya, alih-alih hanya melaporkan daftar plugin kosong.
`POST /api/plugins/scan` menemukan setiap subdirektori di sana yang memiliki
`plugin.json` valid dan mendaftarkannya; direktori yang sama merupakan root tempat
`pluginManager.install()` menyalin plugin, sehingga override memindahkan lokasi penemuan dan
instalasi secara bersamaan.

> **`OMNIROUTE_PLUGINS_DIR` bukan `OMNIROUTE_PLUGIN_PATH`.** Yang terakhir hanya dibaca oleh
> pemuat plugin perintah CLI (`bin/cli/plugins.mjs`) untuk menemukan package npm `omniroute-cmd-*`
> yang menambahkan subperintah `omniroute` — variabel tersebut tidak berpengaruh pada pemindai runtime
> yang dijelaskan di sini. Lihat [PLUGINS.md](./PLUGINS.md) untuk bagian tersebut.

### URL registry marketplace khusus

Sumber katalog marketplace dibaca dari pengaturan `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` membaca `settings.pluginMarketplaceUrl`). Jika
ditetapkan ke URL `http(s)`, `listMarketplacePlugins()` mengambil URL tersebut dan menerima
array JSON entri pada tingkat teratas atau objek dengan array `plugins`;
entri tanpa `name` bertipe string akan disaring. Jika tidak ditetapkan (atau jika pengambilan
gagal melewati perlindungan SSRF / menghasilkan respons yang buruk), registry bawaan
akan digunakan.

Tab "Marketplace" di dasbor menyediakan bidang untuk URL ini (dibaca kembali dari
`GET /api/settings`).

> Catatan implementasi: tindakan "Save" di dasbor mengirimkan
> `pluginMarketplaceUrl` ke `PATCH /api/settings`. Pada saat penulisan, kunci ini
> tidak dideklarasikan dalam `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), jadi verifikasikan persistensinya pada
> rilis Anda sebelum mengandalkannya — jalur **baca** (`getSettings()` →
> `listMarketplacePlugins()`) menggunakan kunci tersebut setelah tersedia dalam penyimpanan
> pengaturan.

## Keamanan

### Hanya loopback — tingkat rute

Plugin mengeksekusi kode dalam proses anak yang dihasilkan, sehingga seluruh permukaan `/api/plugins` diklasifikasikan `LOCAL_ONLY` (Tingkat 1). Penegakan loopback berjalan tanpa syarat** sebelum** pemeriksaan autentikasi apa pun, sehingga token manajemen yang bocor mencapai kotak di atas terowongan masih tidak dapat memasang, mengaktifkan, atau menghapus instalasi plugin. Lihat [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) dan Aturan Keras #15 / #17.

### Penjaga SSRF registri pasar

Registri khusus URL adalah konfigurasi yang dapat dipengaruhi oleh penyerang, jadi sebelum mengambilnya, `listMarketplacePlugins()` menjalankannya melalui dua lapisan:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Menolak apapun yang bukan `http:` / `https:`.
   - Menolak host private/loopback/link-local/ULA literal (IPv4** Dan** IPv6, termasuk IPv4-mapped) melalui `isPrivateHost` kanonik (`src/shared/network/outboundUrlGuard.ts`).
   - Terselesaikan** keduanya** `A` dan `AAAA` mencatat dan menolak jika** setiap** alamat yang diselesaikan adalah — pribadi yang menutup bypass IP pribadi → nama host publik.
   - **Gagal ditutup** : kegagalan resolusi DNS menolak URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): menerapkan kembali URL guard khusus publik pada waktu pengambilan dan** memblokir pengalihan** (tidak ada pivot `30x` pribadi → publik).

URL yang gagal pada kedua lapisan tidak membatalkan permintaan — pasar secara diam-diam kembali ke registri benih bawaan dan mencatat peringatan.

> Penjaga ini diperkuat di PR #3774 khusus untuk menyelesaikan A + AAAA dan menggunakan `isPrivateHost` kanonik alih-alih pemeriksaan IPv4-only.

### Isolasi eksekusi plugin

> **Plugin tidak di-sandbox.** Anak tersebut adalah proses Node.js biasa yang berjalan sebagai pengguna OmniRoute, tanpa konteks VM dan tanpa tanda izin Node.js, sehingga kode plugin dapat membaca dan menulis file apa pun yang dapat dilakukan pengguna, menjalankan program, dan menjangkau jaringan. `requires.permissions` hanya memutuskan variabel lingkungan mana yang diterima anak; izin lainnya tidak diterapkan. Instal hanya plugin yang Anda percayai. Batas proses di bawah ini berisi crash dan hang; itu bukan batas keamanan.

- **Isolasi proses** — `loadPlugin()` (`src/lib/plugins/loader.ts`) memunculkan setiap plugin dalam proses anak Node.js yang terpisah dan berkomunikasi melalui IPC. Panggilan hook memiliki batas waktu dengan eskalasi `SIGTERM` → `SIGKILL`.
- **Daftar yang diizinkan** — anak hanya menerima serangkaian variabel lingkungan yang diizinkan; kumpulan yang lebih luas hanya diberikan ketika manifes meminta izin `env`.
- **Instal penahanan sumber** — `POST /api/plugins` hanya membaca dari direktori sumber plugin (lihat "Instal dari jalur lokal"): jalur tersebut dikanonikalisasi dengan `realpath`, harus tetap berada di dalam direktori itu, dan pohon sumber yang membawa symlink yang lolos darinya akan ditolak sebelum apa pun disalin.
- **Penahanan jalur** — install/upgrade/uninstall menegaskan bahwa direktori plugin dan `manifest.main` terselesaikan** di dalam** root plugin yang dikelola sebelum penyalinan atau penghapusan rekursif (menjaga terhadap jalur DB yang dirusak dan traversal `../` di `manifest.main`). Aktivasi menyelesaikan symlink melalui `realpath` dan menolak memuat titik masuk yang keluar dari direktori plugin.
- **Pin integritas opsional** — manifes dapat mendeklarasikan bidang `integrity` (`sha256-<base64>`, SRI format). Saat ini, pemuat memverifikasi hash file entri pada waktu buka dan menolak untuk mengaktifkan jika tidak cocok. Ini adalah deteksi kerusakan opt-in,** bukan** batas keamanan: tidak membatasi apa yang dapat dilakukan oleh plugin yang dimuat.
- **Tidak ada kredensial klien di hook** — konteks yang diteruskan ke `onRequest`, `onResponse` dan `onError` memiliki header `authorization`, `x-api-key`, `proxy-authorization` dan `cookie` yang dihapus, dan catatan kunci API tidak membawa nilai kunci (`redactPluginContext()` di `src/lib/plugins/hooks.ts`).

## Manifes (`plugin.json`)

Divalidasi oleh `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Bidang             | Jenis        | Catatan                                                              |
| ------------------ | ------------ | -------------------------------------------------------------------- |
| `name`             | rangkaian    | Diperlukan; kotak kebab (`^[a-z0-9-]+$`), 1–100 karakter             |
| `version`          | rangkaian    | Diperlukan; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | rangkaian?   | ≤ 500 karakter                                                       |
| `author`           | rangkaian?   | ≤ 200 karakter                                                       |
| `license`          | rangkaian?   | Defaultnya adalah `MIT`                                              |
| `main`             | rangkaian?   | berkas entri; defaultnya adalah `index.js`                           |
| `source`           | enum?        | `local` \| `marketplace` (default pada `local`)                      |
| `tags`             | rangkaian[]? | Tag pencarian                                                        |
| `requires`         | obyek?       | `{ omniroute?, permissions[] }`                                      |
| `hooks`            | obyek?       | Boolean mendeklarasikan hook mana yang diimplementasikan oleh plugin |
| `skills`           | obyek[]?     | Definisi keterampilan opsional                                       |
| `enabledByDefault` | boolean?     | Aktifkan otomatis saat instalasi                                     |
| `configSchema`     | obyek?       | Peta bidang konfigurasi (`string`/`number`/`boolean`/`select`)       |
| `integrity`        | rangkaian?   | Pin file entri `sha256-<base64>` opsional                            |

Izin diambil dari enum `network` / `file-read` / `file-write` / `env` / `exec`. Hanya `env` yang memiliki efek runtime (daftar variabel lingkungan yang diizinkan sedikit lebih besar untuk turunan); yang lainnya adalah deklarasi dan tidak dilaksanakan.

## Alur Siklus Hidup

```
install (POST /api/plugins, path)
  → pindai/validasi manifest → salin ke staging → pastikan main berada di dalam direktori
  → ubah nama secara atomik ke ~/.omniroute/plugins/<name> → sisipkan baris DB
  → jalankan onInstall → jika enabledByDefault: aktifkan

activate (POST /api/plugins/{name}/activate)
  → pemeriksaan containment realpath → loadPlugin() (jalankan proses anak)
  → daftarkan hook yang dideklarasikan → status = "active" → jalankan onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → jalankan onDeactivate (SEBELUM membatalkan pendaftaran) → batalkan pendaftaran hook
  → hentikan proses anak → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → nonaktifkan jika aktif → jalankan onUninstall
  → hapus direktori plugin secara rekursif dengan pemeriksaan containment → hapus baris DB
```

Menjalankan kembali `install` terhadap direktori yang versi manifest-nya **benar-benar
lebih baru** daripada versi yang terinstal akan melakukan peningkatan otomatis (instalasi ulang bersih; konfigurasi diatur ulang
ke nilai default). Versi yang sama atau lebih lama akan ditolak.

## Basis Data

Tabel `plugins` (migrasi `076_create_plugins.sql`):

| Kolom           | Tipe    | Catatan                                                       |
| --------------- | ------- | ------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                          |
| `name`          | TEXT    | Unik                                                          |
| `version`       | TEXT    | semver; default `1.0.0`                                       |
| `description`   | TEXT    | Opsional                                                      |
| `author`        | TEXT    | Opsional                                                      |
| `license`       | TEXT    | Default `MIT`                                                 |
| `main`          | TEXT    | File entri; default `index.js`                                |
| `source`        | TEXT    | Default `local`                                               |
| `tags`          | TEXT    | Array JSON; default `[]`                                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`              |
| `enabled`       | INT     | 0/1; default 0                                                |
| `manifest`      | TEXT    | JSON manifest lengkap                                         |
| `config`        | TEXT    | JSON; default `{}`                                            |
| `config_schema` | TEXT    | JSON; default `{}`                                            |
| `hooks`         | TEXT    | Array JSON berisi nama hook yang dideklarasikan; default `[]` |
| `permissions`   | TEXT    | Array JSON; default `[]`                                      |
| `plugin_dir`    | TEXT    | Direktori instalasi absolut                                   |
| `error_message` | TEXT    | Diatur ketika `status = "error"`                              |
| `installed_at`  | TEXT    | `datetime('now')`                                             |
| `updated_at`    | TEXT    | `datetime('now')`                                             |
| `activated_at`  | TEXT    | Diatur saat aktivasi                                          |

Metrik/analitik plugin dilacak dalam tabel tambahan
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dasbor

Halaman dasbor di `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) menyediakan dua tab:

- **Dipasang** — mencantumkan plugin yang diinstal dengan kait yang dinyatakan, tombol activate/deactivate, tombol uninstall, dan tindakan "Pindai plugin" (`POST /api/plugins/scan`).
- **Pasar** — menampilkan katalog dari `GET /api/plugins/marketplace` dengan bidang untuk mengatur registri khusus URL.

Halaman tersebut selalu menampilkan peringatan bahwa plugin berjalan dengan hak penuh dari proses OmniRoute.

Halaman konfigurasi per plugin ada di `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Lihat Juga

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  alasan `/api/plugins` hanya dapat diakses melalui loopback (Tingkat 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — kerangka kerja keterampilan terkait
  (`src/lib/skills/`); plugin dapat mendeklarasikan keterampilan dalam manifesnya
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrasi keluar
  berbasis peristiwa
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  pola `buildErrorBody()` yang digunakan oleh setiap rute plugin untuk respons kesalahan
