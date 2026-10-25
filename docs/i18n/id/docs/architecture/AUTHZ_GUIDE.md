# Authorization Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sumber kebenaran:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Terakhir diperbarui:** 2026-09-22 — namespace cakupan mengarah ke MCP-SERVER.md

OmniRoute memiliki pipeline otorisasi yang sadar rute yang menjaga setiap permintaan API. Klasifikasi bersifat **deterministik** dan **fail-closed** — apa pun yang tidak dapat diklasifikasikan akan berakhir sebagai `MANAGEMENT` dan memerlukan sesi atau token tingkat manajemen. Halaman ini menjelaskan model untuk insinyur yang memelihara rute atau merancang endpoint baru.

![Pipeline AuthZ (3 kelas rute + evaluasi kebijakan)](../diagrams/exported/authz-pipeline.svg)

> Sumber: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dua Mode Autentikasi

### 1. Kunci API (Bearer)

Digunakan untuk API klien yang kompatibel dengan OpenAI/Anthropic/Gemini dan beberapa rute manajemen ketika kunci memiliki cakupan `manage`.

```
Authorization: Bearer <api-key>
```

Divalidasi oleh `isValidApiKey()` / `extractApiKey()` di `src/sse/services/auth.ts` dan diekspor ulang melalui `src/shared/utils/apiAuth.ts`. Validator juga menerima variabel lingkungan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` sebagai kunci passthrough persisten (issue #1350).

### 2. Sesi Dashboard (cookie auth_token)

Untuk halaman dashboard dan operasi admin.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie hanya dianggap sesi ketika JWT terverifikasi **dan** memuat `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Setiap konsumen cookie — pelindung rute dashboard (`isDashboardSessionAuthenticated()`), penyegaran pipeline authz, jabat tangan WebSocket, server langsung, `/api/settings/require-login`, `/api/auth/status` — melewati helper ini.
JWT lain yang ditandatangani dengan `JWT_SECRET` juga ada — passthrough Cursor CLI menerbitkan token `iss "omniroute" / aud "cursor-cli"` untuk pemegang kunci — dan token tersebut tidak pernah dianggap sesi (#13298).

Diverifikasi oleh `isDashboardSessionAuthenticated()` di `src/shared/utils/apiAuth.ts`. Pipeline memperbarui JWT secara otomatis ketika sisa masa berlakunya kurang dari 7 hari dari masa berlaku 30 hari.

Sesi juga dapat berakhir sebelum 30 hari berlalu, karena setiap penerbit melewati `mintDashboardSessionToken` (waktu terbit `iat` dan ID `jti`), dan verifier memeriksa dua pengaturan: `sessionsValidAfter`, yang diatur oleh perubahan kata sandi sehingga setiap sesi yang diterbitkan sebelumnya berhenti terverifikasi (browser yang mengubah kata sandi mendapat cookie baru), dan `revokedDashboardSessions`, yang ditambahi `jti` sesi yang keluar oleh `POST /api/auth/logout`. Sesi yang dibuat oleh rilis lama tidak memuat klaim ini dan tetap valid sampai perubahan kata sandi pertama. Jika pengaturan tidak dapat dibaca, sesi tidak dipercaya.

Beberapa rute manajemen menerima **salah satu** mode: cookie ATAU `Bearer <key>` ketika kunci API memiliki cakupan `manage` (atau `admin`). Inilah yang memungkinkan alur kerja "dapat dikonfigurasi melalui panggilan API" yang ditambahkan di v3.8.

#### Gerbang login OIDC opsional (#6973)

Login admin dashboard juga mendukung alur OIDC (OpenID Connect) yang **opsional** di samping login kata sandi default — login kata sandi tidak pernah dihapus, hanya ditambah:

- Aktif hanya jika `settings.oidcEnabled === true` **dan** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` semuanya dikonfigurasi (Settings → Auth). Jika tidak, `GET /api/auth/oidc/login` mengembalikan `400`.
- `GET /api/auth/oidc/login` menemukan `authorization_endpoint` dari `/.well-known/openid-configuration` milik issuer (kembali ke `<issuer>/authorize`), membangun URI redirect dari permintaan masuk (menghormati `x-forwarded-proto`), dan mengarahkan ke IdP dengan nilai `state` acak yang disimpan dalam cookie `oidc_state` yang `httpOnly`.
- `GET /api/auth/oidc/callback` memvalidasi `state`, menukar kode otorisasi, dan memverifikasi tanda tangan ID token melalui JWKS issuer (`createRemoteJWKSet` dari `jose`, di-cache per URI JWKS), dengan pemeriksaan `issuer`/`audience`. Daftar izin `oidcAllowedSubjects` wajib: daftar ini dicocokkan dengan klaim `sub` token atau klaim `email` — klaim email hanya diterima ketika `email_verified === true`, sehingga email yang belum diverifikasi di IdP tidak akan pernah lolos gerbang ini — dan tanpa entri, callback menolak setiap login (`not_configured`).
- Jika berhasil, ia menerbitkan JWT `auth_token` 30 hari yang **persis sama** dengan yang diterbitkan login kata sandi (`src/app/api/auth/login/route.ts`), sehingga sisa pipeline sesi dashboard (penyegaran otomatis, flag cookie) tidak berubah — OIDC hanya mengganti cara cookie diterbitkan, bukan apa yang diberikannya.
- Setiap pengaturan `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) berada di `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` menjawab `400 PASSWORD_REQUIRED` kecuali body memuat kata sandi manajemen sebagai `currentPassword` (`401 PASSWORD_MISMATCH` jika salah). `oidcDisablePasswordLogin` melarang _login_ dengan kata sandi (`POST /api/auth/login`) tetapi tetap menyimpan hash kata sandi, dan autentikasi ulang tetap memeriksanya terhadap `currentPassword`.
- `corsOrigins` dan `bruteForceProtection` juga berada di `SECURITY_IMPACTING_SETTINGS_KEYS`: melonggarkan salah satunya melemahkan pertahanan login, sehingga keduanya memerlukan autentikasi ulang `currentPassword` yang sama (tab Security memintanya) dan impor JSON membuangnya.
- Setiap kunci kebijakan keamanan — entri `SECURITY_IMPACTING_SETTINGS_KEYS`, setiap kunci `oidc*`, dan status sesi dashboard — hanya **untuk operator** pada `PATCH /api/settings`: kunci API dengan cakupan manage atau token akses `oma_` ditolak dengan `403` meskipun mengirim `currentPassword` yang benar, dan penolakannya dicatat sebagai `settings.update_failed` dengan `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` di `src/lib/api/operatorCredential.ts`). Pengaturan biasa (tema, preferensi tampilan) tetap dapat ditulis oleh kunci `manage` atau token akses `admin`. Setiap mutasi pada `/api/settings` itu sendiri (dan `/api/settings/require-login`) juga memerlukan cakupan token akses `admin` (`ADMIN_MUTATION_EXACT_PATHS` di `src/server/authz/accessScopes.ts`, pencocokan jalur persis); `GET` memerlukan `read`, sedangkan sub-rute `/api/settings/*` lainnya (proxy, default combo, alias model, kompresi, pembersihan…) tetap menggunakan cakupan `write` yang disimpulkan dari metode.
- `POST /api/settings/import-json` melewati autentikasi ulang tersebut, sehingga sebelum menulis ia membuang setiap kunci di `IMPORT_STRIPPED_SETTINGS_KEYS` (file yang sama): kata sandi dan `currentPassword`, setiap entri `SECURITY_IMPACTING_SETTINGS_KEYS`, dan status sesi dashboard (`sessionsValidAfter`, `revokedDashboardSessions`). Dengan demikian, mengimpor cadangan lama tidak dapat menghidupkan kembali sesi yang sudah diakhiri oleh perubahan kata sandi atau keluar.
- Aktif hanya jika `settings.oidcEnabled === true` **dan** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` semuanya dikonfigurasi (Settings → Auth). Jika tidak, `GET /api/auth/oidc/login` mengembalikan `400`.
- `GET /api/auth/oidc/login` menemukan `authorization_endpoint` dari `/.well-known/openid-configuration` milik issuer (kembali ke `<issuer>/authorize`), membangun URI redirect dari permintaan masuk (menghormati `x-forwarded-proto`), dan mengarahkan ke IdP dengan nilai `state` acak yang disimpan dalam cookie `oidc_state` yang `httpOnly`.
- `GET /api/auth/oidc/callback` memvalidasi `state`, menukar kode otorisasi, dan memverifikasi tanda tangan ID token melalui JWKS issuer (`createRemoteJWKSet` dari `jose`, di-cache per URI JWKS), dengan pemeriksaan `issuer`/`audience`. Daftar izin `oidcAllowedSubjects` wajib: daftar ini dicocokkan dengan klaim `sub` token atau klaim `email` — klaim email hanya diterima ketika `email_verified === true`, sehingga email yang belum diverifikasi di IdP tidak akan pernah lolos gerbang ini — dan tanpa entri, callback menolak setiap login (`not_configured`).
- Jika berhasil, ia menerbitkan JWT `auth_token` 30 hari yang **persis sama** dengan yang diterbitkan login kata sandi (`src/app/api/auth/login/route.ts`), sehingga sisa pipeline sesi dashboard (penyegaran otomatis, flag cookie) tidak berubah — OIDC hanya mengganti cara cookie diterbitkan, bukan apa yang diberikannya.
- Setiap pengaturan `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) berada di `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` menjawab `400 PASSWORD_REQUIRED` kecuali body memuat kata sandi manajemen sebagai `currentPassword` (`401 PASSWORD_MISMATCH` jika salah). `oidcDisablePasswordLogin` melarang _login_ dengan kata sandi (`POST /api/auth/login`) tetapi tetap menyimpan hash kata sandi, dan autentikasi ulang tetap memeriksanya terhadap `currentPassword`.
- `corsOrigins` dan `bruteForceProtection` juga berada di `SECURITY_IMPACTING_SETTINGS_KEYS`: melonggarkan salah satunya melemahkan pertahanan login, sehingga keduanya memerlukan autentikasi ulang `currentPassword` yang sama (tab Security memintanya) dan impor JSON membuangnya.
- Setiap kunci kebijakan keamanan — entri `SECURITY_IMPACTING_SETTINGS_KEYS`, setiap kunci `oidc*`, dan status sesi dashboard — hanya **untuk operator** pada `PATCH /api/settings`: kunci API dengan cakupan manage atau token akses `oma_` ditolak dengan `403` meskipun mengirim `currentPassword` yang benar, dan penolakannya dicatat sebagai `settings.update_failed` dengan `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` di `src/lib/api/operatorCredential.ts`). Pengaturan biasa (tema, preferensi tampilan) tetap dapat ditulis oleh kunci `manage` atau token akses `admin`. Setiap mutasi pada `/api/settings` itu sendiri (dan `/api/settings/require-login`) juga memerlukan cakupan token akses `admin` (`ADMIN_MUTATION_EXACT_PATHS` di `src/server/authz/accessScopes.ts`, pencocokan jalur persis); `GET` memerlukan `read`, sedangkan sub-rute `/api/settings/*` lainnya (proxy, default combo, alias model, kompresi, pembersihan…) tetap menggunakan cakupan `write` yang disimpulkan dari metode.
- `POST /api/settings/import-json` melewati autentikasi ulang tersebut, sehingga sebelum menulis ia membuang setiap kunci di `IMPORT_STRIPPED_SETTINGS_KEYS` (file yang sama): kata sandi dan `currentPassword`, setiap entri `SECURITY_IMPACTING_SETTINGS_KEYS`, dan status sesi dashboard (`sessionsValidAfter`, `revokedDashboardSessions`). Dengan demikian, mengimpor cadangan lama tidak dapat menghidupkan kembali sesi yang sudah diakhiri oleh perubahan kata sandi atau keluar.

## Kelas Rute

`src/server/authz/types.ts` mendefinisikan tiga kelas; rute apa pun yang tidak dapat diklasifikasikan secara deterministik akan jatuh kembali ke `MANAGEMENT`.

| Kelas        | Deskripsi                                                                                                                                           | Autentikasi yang diperlukan                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `PUBLIC`     | Rute yang secara eksplisit aman — login, logout, status, inisialisasi, health, dan bootstrap onboarding.                                            | Tidak ada                                                                  |
| `CLIENT_API` | Endpoint penyajian model — `/api/v1/*`, `/api/v1beta/*`, plus alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Kunci Bearer ketika feature flag `REQUIRE_API_KEY` yang efektif diaktifkan |
| `MANAGEMENT` | Halaman dashboard, pengaturan, provider, kunci, dan endpoint admin serta diagnostik.                                                                | Sesi dashboard ATAU Bearer dengan cakupan `manage`                         |

Beberapa aksi `MANAGEMENT` bersifat **khusus operator**: kunci `manage` tidak cukup. Mengekspor kredensial tersimpan (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), memulihkan cadangan di atas data aktif (`POST /api/db-backups/import` termasuk `dryRun=true`, `POST /api/db-backups` pemulihan berdasarkan id, `POST /api/settings/import-json`), dan menghancurkan titik pemulihan (`DELETE /api/db-backups` untuk pembersihan, dan `PATCH /api/db-backups` karena retensi yang disimpannya menggerakkan pemangkasan otomatis setelah setiap cadangan) memerlukan sesi dashboard, subjek CLI lokal, atau login yang dinonaktifkan. Menerbitkan token sinkronisasi (`POST /api/sync/tokens`) dan mencetak token akses CLI `admin` (`POST /api/cli/tokens`) memerlukan sesi dashboard atau subjek CLI lokal di setiap mode login. Kunci API dengan cakupan apa pun dan token akses `oma_` bukan kredensial operator: mereka mendapat `403` setiap kali salah satunya diperlukan. Pemeriksaannya ada di `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Mengubah pengaturan login juga khusus operator: `POST /api/settings/require-login` (mengatur kata sandi manajemen / mengaktifkan-menonaktifkan `requireLogin`) hanya menerima kredensial tersebut setelah kata sandi ada — jendela bootstrap pertama kali (belum ada kata sandi) tidak berubah — dan sesi dashboard harus mengirim `currentPassword` untuk mengganti kata sandi (`403` jika tidak ada atau salah, dicatat sebagai `settings.update_failed`). CLI lokal dan instans dengan login dinonaktifkan mempertahankan jalur pemulihan dan dapat mengatur kata sandi tanpanya, karena keduanya terikat pada host yang memiliki direktori data.

## Pipeline

```
Permintaan masuk → src/proxy.ts
  → runAuthzPipeline() di src/server/authz/pipeline.ts
    1. Hapus header internal tepercaya (x-omniroute-auth-*, x-omniroute-route-class)
    2. Buat ID permintaan, klasifikasikan rute melalui classifyRoute()
    3. Jika pathname == "/" → alihkan ke /dashboard
    4. Jika sedang menguras koneksi (penghentian secara bertahap) dan /api/* → 503
    5. Jika non-GET /api/* → pemeriksaan checkBodySize()
    6. Jika OPTIONS → preflight CORS 204
    7. Jika options.enforce == false → teruskan dengan header kelas rute
    8. Jika tidak: POLICIES[routeClass].evaluate(ctx)
       - izinkan → tambahkan x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - tolak   → kesalahan JSON dengan correlation_id (halaman dashboard → 302 /login)
```

Header internal tepercaya (didefinisikan di `src/server/authz/headers.ts`) **dihapus dari permintaan masuk** sebelum klasifikasi — klien tidak dapat mengisi `x-omniroute-auth-*` terlebih dahulu untuk menyamar sebagai suatu subjek.

### Kontrak kebijakan

Setiap kelas rute memiliki kebijakan di `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — selalu mengembalikan `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — mengekstrak Bearer, memvalidasinya melalui `validateApiKey()`. Hanya beralih ke anonim ketika feature flag efektif `REQUIRE_API_KEY` dinonaktifkan. Flag efektif ditentukan melalui `isRequireApiKeyEnabled()` (`penggantian feature flag DB > process.env.REQUIRE_API_KEY > default`) sehingga Feature Flags Dashboard dan variabel lingkungan mengatur `/api/v1/*`, `/api/v1beta/*`, serta aliasnya secara konsisten; kegagalan resolver akan menolak akses secara default. Mengizinkan permintaan sesi dashboard pada rute API klien (termasuk `/api/v1/models`, yang digunakan oleh katalog model dashboard).
- **`managementPolicy`** (`policies/management.ts`) — menerima sesi dashboard, permintaan sinkronisasi model internal (dicocokkan dengan `/api/providers/[name]/(sync-models|models)`), atau melewatkan pemeriksaan sepenuhnya jika `isAuthRequired()` mengembalikan false. Mengembalikan 403 (`AUTH_001`) ketika token Bearer tersedia tetapi tidak valid, dan 401 jika tidak. Kebijakan ini juga memberlakukan tingkatan penjaga rute (LOCAL_ONLY / ALWAYS_PROTECTED) sebelum cabang autentikasi apa pun — lihat [Tingkatan Penjaga Rute](../security/ROUTE_GUARD_TIERS.md). Path LOCAL_ONLY di `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (saat ini: `/api/mcp/`) dapat diakses dari non-loopback ketika kunci Bearer memiliki scope `manage`; semua path LOCAL_ONLY lainnya tetap dibatasi secara ketat ke loopback terlepas dari scope.

Kebijakan yang berhasil mengembalikan `AuthSubject` dengan `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Handler downstream dapat membacanya melalui `assertAuth(request, "CLIENT_API")` di `src/server/authz/assertAuth.ts` tanpa menjalankan ulang logika autentikasi.

## Daftar Rute Publik

`src/shared/constants/publicApiRoutes.ts` adalah daftar izin eksplisit:

Daftar ini dibagi berdasarkan **bentuk**, dan pembagian tersebut sangat penting (GHSA-74g9-q8f6-793h): sebuah prefiks dicocokkan dengan `startsWith()`, sehingga prefiks tersebut juga cocok dengan setiap path berdekatan yang memiliki karakter awal yang sama.
Ketika `/api/usage/om-usage` dijadikan prefiks, `/api/usage/om-usage<anything>` menjadi PUBLIK, dan Next memetakannya ke `/api/usage/[connectionId]` — sebuah handler yang tidak memiliki autentikasi sendiri.

```ts
// Subtree yang sebenarnya. Setiap entri HARUS diakhiri dengan "/" (dipastikan oleh pengujian unit).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // diperlakukan sebagai CLIENT_API dalam classify, bukan sebagai publik "tanpa autentikasi"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rute tunggal, dicocokkan SECARA PERSIS (dengan atau tanpa garis miring penutup).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rute tunggal hanya-baca yang juga mendapatkan pelonggaran origin CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rute tunggal hanya-baca TANPA pelonggaran CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute hanya-baca bersifat publik **hanya** untuk metode yang aman. Catatan: `classifyRoute()` mengecualikan `/api/v1/*` dan `/api/v1beta/*` dari mekanisme fallback PUBLIC — rute-rute tersebut selalu diklasifikasikan sebagai `CLIENT_API` sehingga kebijakan kunci Bearer tetap berlaku.

## Menambahkan Rute Baru

### Pola 1 — Endpoint API klien publik (autentikasi Bearer)

Rute di bawah `/api/v1/` dan `/api/v1beta/` diklasifikasikan sebagai `CLIENT_API` secara otomatis. Middleware menerapkan pemeriksaan Bearer; handler rute tidak perlu mengulanginya, tetapi dapat membaca subjek jika diperlukan.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika handler
}
```

### Pola 2 — Endpoint pengelolaan (sesi atau Bearer + manage)

Gunakan `requireManagementAuth()` dari `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika handler
}
```

`requireManagementAuth()` mengembalikan `null` jika berhasil atau `Response` kesalahan JSON:

- 401 `AUTH_001` "Autentikasi diperlukan" — tidak ada kredensial sama sekali
- 403 — Bearer tidak valid **atau** Bearer tersedia tetapi kunci tidak memiliki scope `manage` / `admin`

`hasManageScope(scopes)` mengembalikan true untuk `"manage"` atau `"admin"`.

### Pola 3 — Menambahkan ke daftar izin publik

Pilih himpunan berdasarkan bentuk, bukan berdasarkan kemudahan. Satu rute dimasukkan ke `PUBLIC_API_ROUTES_EXACT` (atau `PUBLIC_READONLY_CORS_API_ROUTES` jika hanya untuk GET); hanya subtree yang sebenarnya yang dimasukkan ke `PUBLIC_API_ROUTE_PREFIXES`, dan entri tersebut **harus diakhiri dengan `/`**. Memasukkan satu rute ke daftar prefiks juga memublikasikan setiap path berdekatan yang memiliki karakter awal yang sama — termasuk sibling segmen dinamis yang ditambahkan kemudian (GHSA-74g9-q8f6-793h). Perbarui pengujian unit di `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, dan `tests/unit/authz/classify.test.ts`.

## Cakupan

Tiga namespace. Setiap pemeriksa hanya membaca stringnya sendiri. Perbandingan berdampingan, termasuk mengapa `manage` gagal `scopeMatches` untuk `read:compression` dan mengapa token akses `read` tidak dapat `PATCH /api/keys/{id}`, ada di [Tiga namespace cakupan](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Kunci API membawa array `scopes` (disimpan sebagai JSON di `api_keys.scopes`, lihat `src/lib/db/apiKeys.ts`).

### Cakupan manajemen

- `manage` / `admin` — `hasManageScope`. Akses bearer ke rute API manajemen.
- `mcp:connect`, `self:usage`, `self:account-quota`, dan
  `policy:bypass-provider-quota` adalah cakupan pencocokan persis yang aditif. Mereka berada di luar `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` hanya membuka bagian non-loopback `/api/mcp/`.

### Cakupan alat MCP

Katalog dan aturan pencocokan (string identik, atau cakupan yang diberikan diakhiri dengan `*`):
[Cakupan alat MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` di `src/shared/constants/mcpScopes.ts` adalah subset yang diketik asli, bukan katalog lengkap itu. Penegakan berjalan di
`open-sse/mcp-server/scopeEnforcement.ts` setelah `resolveCallerScopeContext()` menyelesaikan cakupan dari info otentikasi MCP, metadata permintaan, atau `OMNIROUTE_MCP_SCOPES`.
Ini tetap mati kecuali `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Cakupan token akses

`read` / `write` / `admin` pada token `oma_live_…`, diberi peringkat oleh `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Peringkat ini hanya berlaku untuk kredensial token akses. Lihat [Otentikasi Manajemen](../guides/MANAGEMENT-AUTH.md).

## Sakelar Autentikasi Wajib

`isAuthRequired()` di `src/shared/utils/apiAuth.ts` memutuskan apakah **autentikasi apa pun** diterapkan untuk sebuah permintaan:

- `settings.requireLogin === false` → autentikasi dinonaktifkan secara global, kecuali untuk tingkat yang selalu dilindungi (lihat [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) dan panggilan yang menyerahkan kredensial yang diterimanya, yang memerlukan kredensial yang sama seperti ketika login aktif: menerbitkan token sinkronisasi, mencetak token akses CLI pada cakupan apa pun, dan membuat kunci API dengan cakupan `manage`/`admin`, memberikan cakupan tersebut ke sebuah kunci, atau meregenerasi atau menampilkan kunci seperti itu (`requireCredentialForManagementScopedKey()` di `src/lib/api/requireManagementAuth.ts`). Kunci khusus inferensi tetap terbuka.
- Belum ada kata sandi yang dikonfigurasi **dan** tidak ada env var `INITIAL_PASSWORD` → mode bootstrap: wizard onboarding dan permintaan loopback diizinkan, tetapi permintaan jaringan eksternal tetap memerlukan kredensial.
- Kesalahan DB apa pun → gagal tertutup (aman secara default).

Penegakan kunci API klien menggunakan `isRequireApiKeyEnabled()` di `src/shared/utils/featureFlags.ts`, bukan pembacaan langsung `process.env.REQUIRE_API_KEY`. Ini penting untuk instans yang di-deploy: mengubah `REQUIRE_API_KEY` di Dashboard → Feature Flags menyimpan override DB dan langsung memengaruhi `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, dan pemeriksaan autentikasi API klien lainnya yang memakai helper ini. Jika penyimpanan feature flag tidak dapat dibaca, autentikasi API klien gagal tertutup dan mewajibkan kunci.

## Perubahan yang Tidak Kompatibel — v3.8.0

Endpoint `/api/v1/agents/tasks/*` dan `/api/resilience/model-cooldowns` **kini memerlukan autentikasi pengelolaan** (commit `588a0333`). Klien yang sebelumnya mengirimkan kunci API biasa tanpa cakupan `manage` akan menerima `403`. Migrasi: berikan cakupan `manage` pada kunci tersebut di dasbor Kunci API, atau gunakan sesi dasbor yang telah login.

## Perubahan Perilaku — v3.8.2

`/api/mcp/*` (server MCP jarak jauh) masih bersifat LOCAL_ONLY secara default, tetapi kini menerima permintaan non-loopback ketika header `Authorization: Bearer <api-key>` memiliki cakupan `manage`. Pengecualian ini dibatasi secara eksplisit per jalur melalui `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` di `src/server/authz/routeGuard.ts`; prefiks LOCAL_ONLY terkait `/api/cli-tools/runtime/*` sengaja TIDAK dapat dilewati karena dapat menjalankan subproses arbitrer. Permintaan anonim ke `/api/mcp/*` dari non-loopback akan tetap menghasilkan `403 LOCAL_ONLY` — perilaku default untuk setiap jalur LOCAL_ONLY baru tetap loopback-ketat. Lihat [Tingkatan Pengaman Rute](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pengujian

- Pengujian unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Daftar izin publik: `tests/unit/public-api-routes.test.ts`.
- Jalankan pengujian terfokus: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debugging

Pipeline selalu menandai respons dengan:

```
x-request-id:               <ID korelasi, ditampilkan kembali dalam isi error>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Untuk permintaan yang diautentikasi, header permintaan upstream (di sisi handler) juga mencakup:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4 karakter terakhir> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opsional)
x-omniroute-auth-scopes:    daftar yang dipisahkan koma
```

Gunakan `assertAuth(req, expectedClass)` di dalam handler — fungsi ini melempar `AuthzAssertionError` dengan kode `AUTHZ_NOT_INITIALIZED` jika middleware dilewati (berguna untuk mendeteksi regresi konfigurasi dalam pengujian).

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — penanda otentikasi per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log audit untuk peristiwa otentikasi
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tiga namespace cakupan dan katalog cakupan alat MCP
- Sumber: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
