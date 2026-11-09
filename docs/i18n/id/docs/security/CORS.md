# CORS Configuration & Security (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute mengontrol yang mana **asal peramban** dapat membaca respons lintas asal dari satu daftar yang diizinkan dan terpusat. Modelnya adalah **gagal-ditutup secara default** : tidak ada asal yang diizinkan sampai Anda memilihnya. Halaman ini mendokumentasikan cara penyelesaian daftar yang diizinkan, apa yang sebenarnya diekspos `CORS_ALLOW_ALL=true` (dan, yang terpenting, apa fungsinya **bukan** ), cara mengonfigurasi dev vs produksi dengan aman, dan peringatan runtime yang ditampilkan dasbor saat wildcard aktif.

**Sumber kebenaran:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Daftar yang diizinkan diterapkan satu kali, di middleware (`src/server/authz/pipeline.ts`) — penangan per rute tidak menyetel `Access-Control-Allow-Origin` sendiri.

## Bagaimana asal usul diselesaikan

Untuk setiap permintaan, middleware menghitung nilai `Access-Control-Allow-Origin` dalam urutan ini:

1. **`CORS_ALLOW_ALL=true`** (atau `CORS_ORIGIN=*` lama) → menggemakan kembali `Origin` pemanggil (atau `*` jika tidak ada header `Origin` ), dengan `Vary: Origin` sehingga cache tetap benar. Chokepoint `applyCorsHeaders()` yang sama juga menambahkan `Vary: Accept-Encoding` ke setiap respons 2xx-dengan-tubuh pada permukaan `/v1*`/`/v1beta*` yang diautentikasi token (`relaxForTokenAuth`, RFC 9110 §12.5.5, terbitan #6737), sehingga cache downstream/shared dapat membedakan varian terkompresi dan tidak terkompresi dengan tepat.
2. Jika tidak, permintaan `Origin` akan dinormalisasi (huruf kecil, garis miring di akhir dilucuti) dan dicocokkan dengan **daftar yang diizinkan digabungkan** :
   - env **`CORS_ALLOWED_ORIGINS`** Daftar yang dipisahkan koma —, dan
   - waktu proses **`corsOrigins`** pengaturan (Dasbor → Keamanan → _CORS Diizinkan Asal_), disuntikkan melalui `setRuntimeAllowedOrigins()` dari `src/lib/config/runtimeSettings.ts`.
3. Tidak ada yang cocok dengan →**tidak ada header `Access-Control-Allow-Origin` yang dipancarkan** . Browser memblokir pembacaan lintas asal. Ini adalah default gagal-tertutup yang dimaksudkan.

| Env var                | Arti                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV asal yang tepat untuk diizinkan (disarankan).                                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → menggemakan asal mana pun (wildcard). Hanya pengembang.                                |
| `CORS_ORIGIN`          | Warisan. `*` berperilaku seperti `CORS_ALLOW_ALL`; satu nilai ditambahkan ke daftar yang diizinkan. |

## Model ancaman — apa yang sebenarnya diekspos `CORS_ALLOW_ALL=true`

Peringatan OWASP umum ("wildcard CORS = situs mana pun dapat memanggil API Anda") patut ditanggapi dengan serius, tetapi pemaparan OmniRoute adalah **lebih sempit dari kasus generik** , karena satu fakta implementasi yang konkrit:

> **`applyCorsHeaders()` pusat tidak pernah memancarkan `Access-Control-Allow-Credentials`.** Browser tidak akan mengekspos respons lintas asal _credentialed_ (yang mengandung cookie) kecuali server mengirimkan `Access-Control-Allow-Credentials: true`. Jalur CORS bersama OmniRoute tidak pernah melakukannya.

Artinya per permukaan, bahkan dengan `CORS_ALLOW_ALL=true`:

| Permukaan                            | Mekanisme autentikasi       | Pengaruh wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dasbor / MANAGEMENT `/api/*`         | Sesi kue                    | Asal digaungkan, tapi **tanpa `Allow-Credentials`** peramban **blok** bacaan yang dipercaya. Situs lintas asal yang berbahaya **tidak bisa membaca** respons dasbor Anda yang diautentikasi, dan cookie sesi tidak ditampilkan.                                                                                                                                                                                                                                                                                                                        |
| Klien API `/v1/*`, `/v1beta/*`       | Tajuk pembawa / `x-api-key` | Sudah permisif **berdasarkan desain** (`relaxForTokenAuth`): browser tidak pernah melampirkan `Authorization`/`x-api-key` secara otomatis, sehingga laman penyerang tidak dapat menyediakan kunci Anda. Gema santai memerlukan subjek yang diautentikasi (kunci API atau sesi dasbor yang divalidasi), bukan hanya header kredensial, dan tidak pernah menyertakan `Access-Control-Allow-Credentials`. Respons anonim (`REQUIRE_API_KEY=false`) menggunakan daftar asal yang diizinkan, termasuk keikutsertaan `CORS_ALLOW_ALL=true` secara eksplisit. |
| Hanya baca publik (`/api/health`, …) | Tidak ada                   | Tidak sensitif; wildcard tidak berbahaya.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Jadi **sisa** paparan `CORS_ALLOW_ALL=true` terbatas pada: (a) lintas asal yang tidak memiliki kredensial **membaca** data yang sudah tidak diautentikasi, dan (b) membiarkan CORS**izin sebelum penerbangan** pada rute manajemen — yang masih memerlukan autentikasi yang tidak dapat disediakan oleh halaman lintas asal. Dia **bukan** vektor pembajakan sesi atau pencurian kredensial di jalur CORS bersama.

### Satu pengecualian asli — `/api/v1/agents/`

Rute Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) mengaturnya **memiliki** Header CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) dan **Mengerjakan** memancarkan `Access-Control-Allow-Origin: <origin>|*` bersama dengan `Access-Control-Allow-Credentials: true`. Ini adalah satu-satunya permukaan tempat gema asal dan kredensial hidup berdampingan, dan memang demikianlah adanya **independen dari `CORS_ALLOW_ALL`** . Rute-rute ini diautentikasi oleh manajemen (`requireManagementAuth`); Operator yang mengekspos dasbor di luar host harus menyadari bahwa ini adalah satu-satunya tempat pembacaan kredensial lintas asal diizinkan oleh header respons. Memperketatnya ke daftar yang diizinkan secara eksplisit dilacak secara terpisah dari panduan CORS ini.

## Daftar periksa produksi

- **Jangan pernah menyetel `CORS_ALLOW_ALL=true` dalam produksi.** Biarkan tidak disetel.
- Tetapkan sebuah **eksplisit** daftar asal — baik di bidang env var atau tab Keamanan:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jika OmniRoute berjalan di belakang proxy / terowongan terbalik (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS adalah **bukan** Anda hanya mengontrol — penjaga rute loopback masih melindungi rute yang mampu memunculkan (lihat [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Jangan memalsukan `X-Forwarded-For: 127.0.0.1` untuk "memperbaiki" 403; yang membuka kembali kelas RCE yang ditutup oleh penjaga rute.
- Konfirmasikan status runtime: dasbor menunjukkan a **spanduk kuning yang persisten** di bawah Dasbor Keamanan → Inventaris Otorisasi → setiap kali `CORS_ALLOW_ALL=true` aktif, dan `/api/settings/authz-inventory` mengembalikan amplop `cors: { allowAll, allowedOrigins }` yang dapat disurvei oleh alat pemantauan.

## Kenyamanan pengembangan — memungkinkan asal lokal tertentu

Anda jarang membutuhkan wildcard bahkan di dev. Izinkan hanya server pengembang yang Anda gunakan:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Asal dicocokkan tanpa membedakan huruf besar dan kecil dengan garis miring yang diabaikan, sehingga `http://localhost:3000` dan `http://localhost:3000/` setara. CSV yang sama dapat diatur pada saat runtime **Dashboard → Keamanan → CORS Diizinkan Asal** tanpa memulai ulang.

## Kunci API vs sesi cookie

- **Pembawa / `x-api-key` (permukaan inferensi `/v1/*` ):** browser tidak pernah melampirkan ini secara otomatis. CORS bukanlah penghalang yang berarti di sini — kunci API adalah penghalang — itulah sebabnya permukaan tersebut sengaja dipermisif sehingga browser dan klien Electron dapat membaca tanggapan yang menjadi hak mereka. Gema santai memerlukan subjek yang diautentikasi (kunci API atau sesi dasbor yang divalidasi), bukan hanya header kredensial, dan tidak pernah menyertakan `Access-Control-Allow-Credentials`. Respons anonim (`REQUIRE_API_KEY=false`) menggunakan daftar asal yang dikonfigurasi, termasuk keikutsertaan `CORS_ALLOW_ALL=true` secara eksplisit. Penolakan autentikasi (401) tetap dapat dibaca sehingga klien dapat menampilkan kunci yang dicabut atau salah ketik (#5242): 401 milik pipeline menyimpan gema, dan rute yang menolak kunci itu sendiri setelah pipeline menyajikannya sebagai anonim (`/v1/models` dan `/v1beta/models` dengan autentikasi manajemen dikonfigurasi, cakupan pemilik `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` dan rute kandidat kombo otomatis) menambahkan gema ke 401 tersebut melalui `credentialRejectionHeaders()`. Echo dikunci pada permintaan yang membawa header kredensial (`Authorization`, `x-api-key`, `x-goog-api-key` atau cookie `auth_token` ), bukan pada rute mana yang diperiksa, dan tidak pernah dipasangkan dengan `Access-Control-Allow-Credentials`; isi adalah amplop kesalahan tetap. Rute manajemen di bawah `/api/v1/` yang dijaga oleh `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) tidak menggunakan pengecualian penolakan kredensial ini: dengan `REQUIRE_API_KEY=false`, respons 401/403 mereka mengikuti kebijakan asal CORS yang dikonfigurasi.
- **Sesi cookie (dasbor):** dilindungi oleh default gagal-ditutup **Dan** dengan tidak adanya `Access-Control-Allow-Credentials` di jalur bersama. Jauhkan asal management/dashboard dari konfigurasi permisif apa pun; mereka harus tetap tertutup rapat.

## Jabat tangan WebSocket (`/v1/responses`, `/v1/ws`)

Browser tidak menerapkan CORS ke WebSocket, sehingga transport WebSocket yang mengembalikan keluaran inferensi memeriksa jabat tangan `Origin` itu sendiri (`src/server/origin/wsOrigin.ts`): Responses WebSocket (`/v1/responses`) dan, ketika OmniRoute berjalan melalui `npm start` / `npm run dev`, jembatan `/v1/ws` dan `/api/v1/ws`, yang mengalirkan `/v1/chat/completions`, `/v1/messages` dan `/v1/responses` sebagai bingkai. Jembatan meminta keputusan `/api/v1/ws?handshake=1` dan menolak untuk meningkatkan kecuali rute tersebut memenuhi pemeriksaan. Persyaratan otentikasi masih berlaku secara terpisah. Pemeriksaan asal lolos ketika:

- tidak memiliki header `Origin` (Codex CLI, SDKs dan klien non-browser lainnya);
- `Origin` diterima oleh daftar yang diizinkan di atas (`CORS_ALLOWED_ORIGINS`, pengaturan `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` adalah salah satu asal publik OmniRoute(basis publik URL yang dikonfigurasi, asal penerusan proksi tepercaya, atau host loopback/LAN langsung yang diberikan sebagai IP literal atau `localhost` — kandidat yang sama yang digunakan pemeriksaan mutasi dasbor); atau
- itu membawa kunci API yang valid, seperti pada permukaan HTTP `/v1/*`.

Ada lagi yang mendapat `403 ws_origin_forbidden`. Cookie sesi dasbor tidak mengecualikan `Origin` asing, karena browser melampirkannya ke soket halaman mana pun. `localhost` di port lain tidak diperlakukan sebagai asal yang sama; tambahkan asal dev tersebut ke `CORS_ALLOWED_ORIGINS`.

## Contoh: membalikkan proxy di depan OmniRoute

CORS diberlakukan oleh OmniRoute itu sendiri, jadi proxy umumnya harus melakukannya **bukan** menambah atau menulis ulang header `Access-Control-*` (header ganda merusak browser). Hentikan TLS dan teruskan — biarkan OmniRoute menjawab sebelum penerbangan:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Atur asal browser yang diizinkan di OmniRoute (`CORS_ALLOWED_ORIGINS` atau tab Keamanan), bukan di proxy.

## File sumber

| Kekhawatiran                                       | Mengajukan                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| Resolusi daftar yang diizinkan + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Aplikasi middleware (satu sumber kebenaran)        | `src/server/authz/pipeline.ts`                                       |
| Pengaturan injeksi asal runtime →                  | `src/lib/config/runtimeSettings.ts`                                  |
| Status runtime untuk dasbor                        | `src/app/api/settings/authz-inventory/route.ts`                      |
| Spanduk peringatan dasbor                          | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Bidang Asal yang Diizinkan CORS                    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per rute CORS (pengecualian)           | `src/lib/cloudAgent/api.ts`                                          |
| Pemeriksaan WebSocket jabat tangan `Origin`        | `src/server/origin/wsOrigin.ts`                                      |

## Lihat juga

- Penegakan loopback — [Tingkat Penjaga Rute](./ROUTE_GUARD_TIERS.md) untuk rute yang mampu memunculkan (kontrol terpisah dan saling melengkapi).
- [Panduan Otorisasi](../architecture/AUTHZ_GUIDE.md) — alur autentikasi lengkap.
