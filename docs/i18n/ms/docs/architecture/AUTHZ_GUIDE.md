# Authorization Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sumber kebenaran:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Terakhir dikemas kini:** 2026-09-22 — ruang lingkup nama ruang merujuk kepada MCP-SERVER.md

OmniRoute mempunyai saluran paip kebenaran yang peka laluan yang mengawal setiap permintaan API. Pengelasan adalah **deterministik** dan **gagal-tertutup** — apa-apa yang tidak dapat dikelaskan akan berakhir sebagai `MANAGEMENT` dan memerlukan sesi atau token gred pengurusan. Halaman ini menerangkan model untuk jurutera yang menyelenggara laluan atau mereka bentuk titik akhir baharu.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> Sumber: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dua Mod Pengesahan

### 1. Kunci API (Bearer)

Digunakan untuk API klien yang serasi dengan OpenAI/Anthropic/Gemini dan beberapa laluan pengurusan apabila kunci mempunyai skop `manage`.

```
Authorization: Bearer <api-key>
```

Disahkan oleh `isValidApiKey()` / `extractApiKey()` dalam `src/sse/services/auth.ts` dan dieksport semula melalui `src/shared/utils/apiAuth.ts`. Pengesah juga menerima pemboleh ubah persekitaran `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` sebagai kunci lulus terus berterusan (isu #1350).

### 2. Sesi Papan Pemuka (kuki auth_token)

Untuk halaman papan pemuka dan operasi pentadbir.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuki hanya dianggap sebagai sesi apabila JWT berjaya disahkan **dan** membawa `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Setiap
pengguna kuki (pengawal laluan papan pemuka (`isDashboardSessionAuthenticated()`), penyegaran saluran paip authz, jabat tangan WebSocket, pelayan langsung,
`/api/settings/require-login`, `/api/auth/status`) melalui pembantu tersebut.
JWT lain yang ditandatangani dengan `JWT_SECRET` juga wujud — laluan pintas Cursor CLI
menghasilkan token `iss "omniroute" / aud "cursor-cli"` untuk pemegang kunci — dan tidak pernah menjadi sesi
(#13298).

Disahkan oleh `isDashboardSessionAuthenticated()` dalam `src/shared/utils/apiAuth.ts`. Saluran paip menyegarkan JWT secara automatik apabila tempoh sahnya berbaki kurang daripada 7 hari dalam jangka hayat 30 harinya.

Sesi juga boleh berakhir sebelum 30 harinya tamat, kerana setiap pengeluar token melalui `mintDashboardSessionToken` (masa pengeluaran `iat` dan id `jti`) dan pengesah menyemak dua tetapan: `sessionsValidAfter`, yang ditetapkan apabila kata laluan ditukar supaya setiap sesi yang dikeluarkan sebelum masa tersebut tidak lagi berjaya disahkan (pelayar yang menukar kata laluan menerima kuki baharu), serta `revokedDashboardSessions`, yang ditambah oleh `POST /api/auth/logout` dengan `jti` sesi yang telah dilog keluar. Sesi yang dihasilkan oleh keluaran lebih lama tidak membawa mana-mana tuntutan tersebut dan kekal sah sehingga penukaran kata laluan pertama. Jika tetapan tidak dapat dibaca, sesi tersebut tidak dipercayai.

Sesetengah laluan pengurusan menerima **mana-mana** mod: kuki ATAU `Bearer <key>` apabila kunci API mempunyai skop `manage` (atau `admin`). Inilah yang membolehkan aliran kerja "boleh dikonfigurasikan melalui panggilan API" yang ditambahkan dalam v3.8.

#### Gerbang log masuk OIDC pilihan (#6973)

Log masuk pentadbir papan pemuka turut menyokong aliran OIDC (OpenID Connect) **pilihan pengguna**
di samping log masuk kata laluan lalai — log masuk kata laluan tidak pernah dibuang, hanya
ditambah:

- Dilumpuhkan melainkan `settings.oidcEnabled === true` **dan** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` semuanya dikonfigurasikan (Tetapan → Pengesahan).
  `GET /api/auth/oidc/login` mengembalikan `400` jika sebaliknya.
- `GET /api/auth/oidc/login` menemui `authorization_endpoint` daripada
  `/.well-known/openid-configuration` penerbit (kembali kepada
  `<issuer>/authorize`), membina URI ubah hala daripada permintaan masuk
  (mengambil kira `x-forwarded-proto`), dan mengubah hala ke IdP dengan
  `state` rawak yang disimpan dalam kuki `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` mengesahkan `state`, menukar kod kebenaran,
  dan mengesahkan tandatangan token ID melalui JWKS penerbit
  (`createRemoteJWKSet` milik `jose`, dicache mengikut URI JWKS) dengan
  pemeriksaan `issuer`/`audience`. Kemasukan ke papan pemuka memerlukan
  senarai `oidcAllowedSubjects` yang tidak kosong, dasar `oidcAdmissionClaim`,
  atau kedua-duanya. Senarai subjek hanya sepadan dengan `sub` atau `email`
  apabila `email_verified === true`. Dasar tuntutan pilihan menerima laluan
  tuntutan token ID yang dipisahkan dengan titik (contohnya,
  `realm_access.roles`) dan tatasusunan nilai yang diterima; tuntutan yang
  diselesaikan mestilah tatasusunan rentetan yang mengandungi sekurang-kurangnya
  satu nilai yang diterima. Jika kedua-dua dasar dikonfigurasikan, kedua-duanya
  mesti lulus. Tuntutan yang tiada/tidak sah gagal secara tertutup, dan tanpa
  mana-mana dasar, panggilan balik menolak log masuk (`not_configured`).
  Konfigurasi sedia ada yang hanya menggunakan subjek terus berfungsi tanpa
  perubahan.
- Keycloak biasanya memetakan peranan realm ke dalam token akses, bukan
  semestinya token ID. Untuk mewajibkan peranan realm `admin`, konfigurasikan
  pemeta protokol untuk klien ini yang menyertakan `realm_access.roles` dalam
  **token ID**, kemudian tetapkan `oidcAdmissionClaim` kepada
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Semak tuntutan token ID sebenar untuk klien ini sebelum mendayakan kemasukan
  berdasarkan peranan sahaja; aplikasi tidak membaca peranan token akses.
  Penolakan token pada pihak IdP boleh melengkapkan tetapi tidak menggantikan
  pemeriksaan pada pihak aplikasi ini.
- Selepas berjaya, ia menghasilkan JWT `auth_token` 30 hari yang **sama
  tepat** seperti yang dikeluarkan oleh log masuk kata laluan
  (`src/app/api/auth/login/route.ts`), jadi saluran paip sesi papan pemuka yang
  lain (penyegaran automatik, bendera kuki) tidak berubah — OIDC hanya
  menggantikan cara kuki dihasilkan, bukan perkara yang dibenarkannya.
  Perubahan pada peranan/kumpulan IdP tidak membatalkan sesi OmniRoute sedia ada;
  log keluar, penggiliran kata laluan atau tamat tempoh sesi masih menentukan
  jangka hayatnya.
- Setiap tetapan `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) berada dalam
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` menjawab `400 PASSWORD_REQUIRED` melainkan badan
  membawa kata laluan pengurusan sebagai `currentPassword`
  (`401 PASSWORD_MISMATCH` apabila salah). `oidcDisablePasswordLogin` menolak
  _log masuk_ kata laluan (`POST /api/auth/login`) tetapi mengekalkan cincangan
  kata laluan yang disimpan, dan pengesahan semula masih menyemak
  `currentPassword` terhadapnya.
- `corsOrigins` dan `bruteForceProtection` juga berada dalam
  `SECURITY_IMPACTING_SETTINGS_KEYS`: melonggarkan mana-mana satunya
  melemahkan pertahanan log masuk, jadi kedua-duanya memerlukan pengesahan
  semula `currentPassword` yang sama (tab Security memintanya) dan import JSON
  menggugurkannya.
- Setiap kunci dasar keselamatan — entri `SECURITY_IMPACTING_SETTINGS_KEYS`,
  setiap kunci `oidc*` dan keadaan sesi papan pemuka — adalah
  **operator sahaja** pada `PATCH /api/settings`: kunci API dengan skop
  pengurusan atau token akses `oma_` ditolak dengan `403` walaupun menghantar
  `currentPassword` yang betul, dan penolakan diaudit sebagai
  `settings.update_failed` dengan `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` dalam `src/lib/api/operatorCredential.ts`).
  Tetapan biasa (tema, pilihan paparan) kekal boleh ditulis oleh kunci `manage`
  atau token akses `admin`. Setiap mutasi `/api/settings` itu sendiri (dan
  `/api/settings/require-login`) juga memerlukan skop token akses `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` dalam `src/server/authz/accessScopes.ts`,
  padanan laluan tepat); `GET` kekal `read`, manakala sublaluan
  `/api/settings/*` yang lain (proksi, lalai gabungan, alias model, pemampatan,
  pembersihan…) mengekalkan skop `write` yang ditentukan mengikut kaedah.
- `POST /api/settings/import-json` melangkau pengesahan semula tersebut,
  jadi ia menggugurkan setiap kunci dalam `IMPORT_STRIPPED_SETTINGS_KEYS`
  (fail yang sama) sebelum menulis: kata laluan dan `currentPassword`, setiap
  entri `SECURITY_IMPACTING_SETTINGS_KEYS`, serta keadaan sesi papan pemuka
  (`sessionsValidAfter`, `revokedDashboardSessions`). Oleh itu, mengimport
  sandaran lama tidak dapat menghidupkan semula sesi yang telah ditamatkan oleh
  perubahan kata laluan atau tindakan log keluar.

#### Log masuk dua faktor TOTP pilihan (#16619)

Didaftarkan daripada Tetapan → Keselamatan; dinyahaktifkan sehingga operator
menghidupkannya (`src/server/auth/dashboardMfa.ts`).

- **Perkara yang diliputi:** log masuk kata laluan (`POST /api/auth/login`, yang kemudiannya memerlukan
  `POST /api/auth/mfa/verify`) dan `omniroute connect` (`POST /api/cli/connect`,
  yang menolak pertukaran kata laluan sahaja dan menerima kod sebagai `totp`).
- **Perkara yang tidak diliputi:** log masuk OIDC / SSO (`/api/auth/oidc/callback`) tidak
  meminta TOTP OmniRoute. Ia bergantung pada faktor kedua penyedia identiti sendiri, jadi kuatkuasakan MFA dalam
  IdP jika OIDC didayakan.
- **Pemulihan** (peranti hilang, tiada kod pemulihan yang berbaki, atau faktor yang tidak lagi
  dapat disahkan, contohnya selepas `STORAGE_ENCRYPTION_KEY` berubah):
  1. Mulakan semula pelayan dengan `OMNIROUTE_DISABLE_MFA=true`.
  2. Pada hos itu sendiri (rakan sebaya gelung balik dan `Host` gelung balik, seperti
     `http://localhost:20128`), log masuk dengan kata laluan. Faktor kedua dilangkau untuk asal itu sahaja; setiap asal lain masih memerlukan kod.
  3. Dalam Tetapan → Keselamatan → Nyahdayakan, masukkan kata laluan dan biarkan kod
     kosong. `POST /api/auth/mfa/disable` menerima isi kandungan tanpa `code` hanya semasa
     pemboleh ubah ditetapkan dan permintaan datang daripada hos; ia masih memerlukan sesi papan pemuka
     dan kata laluan semasa, serta diaudit sebagai `auth.mfa.disabled` dengan
     `secondFactor: "recovery_switch"`.
  4. Nyahset `OMNIROUTE_DISABLE_MFA`, mulakan semula, dan daftarkan semula jika perlu.

## Kelas Laluan

`src/server/authz/types.ts` mentakrifkan tiga kelas; sebarang laluan yang tidak boleh dikelaskan secara deterministik akan kembali kepada `MANAGEMENT`.

| Kelas        | Perihalan                                                                                                                                                | Pengesahan diperlukan                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `PUBLIC`     | Laluan yang dinyatakan selamat secara jelas — log masuk, log keluar, status, kesihatan, bootstrap onboarding.                                            | Tiada                                                                            |
| `CLIENT_API` | Titik akhir penyediaan model — `/api/v1/*`, `/api/v1beta/*`, serta alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Kunci Bearer apabila bendera ciri `REQUIRE_API_KEY` yang berkuat kuasa didayakan |
| `MANAGEMENT` | Halaman papan pemuka, tetapan, penyedia, kunci, titik akhir pentadbir dan diagnostik.                                                                    | Sesi papan pemuka ATAU Bearer dengan skop `manage`                               |

Beberapa tindakan `MANAGEMENT` adalah **khas operator**: kunci `manage` sahaja tidak mencukupi. Mengeksport
kelayakan yang disimpan (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), memulihkan sandaran ke atas data langsung
(`POST /api/db-backups/import` termasuk `dryRun=true`, `POST /api/db-backups` pemulihan mengikut id,
`POST /api/settings/import-json`), memusnahkan titik pemulihan (`DELETE /api/db-backups` pembersihan,
dan `PATCH /api/db-backups` kerana pengekalan yang disimpannya mengawal pemangkasan automatik selepas
setiap sandaran) memerlukan sesi papan pemuka, subjek CLI setempat, atau log masuk dilumpuhkan. Mengeluarkan
token penyegerakan (`POST /api/sync/tokens`) dan mencipta token akses CLI `admin`
(`POST /api/cli/tokens`) memerlukan sesi papan pemuka atau subjek CLI setempat dalam setiap mod log masuk.
Kunci API daripada sebarang skop dan token akses `oma_` bukan kelayakan operator: token tersebut menerima `403`
apabila kelayakan sedemikian diperlukan. Pemeriksaan ini
berada dalam `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`). Mengubah tetapan log masuk juga hanya untuk operator:
`POST /api/settings/require-login` (menetapkan kata laluan pengurusan / menogol `requireLogin`) hanya menerima
kelayakan tersebut setelah kata laluan wujud — tetingkap bootstrap kali pertama (belum ada kata laluan)
kekal tidak berubah — dan sesi papan pemuka mesti menghantar `currentPassword` untuk menggantikan kata laluan
(`403` apabila tiada atau salah, diaudit sebagai `settings.update_failed`). CLI setempat dan tika dengan log masuk dilumpuhkan mengekalkan laluan pemulihan dan boleh menetapkan kata laluan tanpanya, kerana kedua-duanya terikat pada hos yang memiliki direktori data.

## Saluran paip

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Pengepala dalaman yang dipercayai (ditakrifkan dalam `src/server/authz/headers.ts`) ialah** dilucutkan daripada permintaan masuk** sebelum pengelasan — pelanggan tidak boleh pra-populasi `x-omniroute-auth-*` untuk menyamar sebagai subjek.

### Kontrak polisi

Setiap kelas laluan mempunyai dasar dalam `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — sentiasa mengembalikan `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ekstrak Pembawa, mengesahkan melalui `validateApiKey()`. Terjadi tanpa nama hanya apabila bendera ciri `REQUIRE_API_KEY` yang berkesan dilumpuhkan. Bendera berkesan diselesaikan melalui `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) jadi Bendera Ciri Papan Pemuka dan pembolehubah persekitaran mengawal `/api/v1/*`, `/api/v1beta/*` dan alias secara konsisten; kegagalan penyelesai gagal ditutup. Membenarkan permintaan sesi papan pemuka pada laluan API pelanggan (termasuk `/api/v1/models`, digunakan oleh katalog model papan pemuka). Apabila Entra ID SSO didayakan, Pembawa yang secara struktur ialah token Entra (tiga segmen base64url, `RS*` alg, `kid`) dikendalikan oleh cawangan SSO** sebelum ini** `validateApiKey()` dan keputusannya adalah — muktamad ia tidak pernah jatuh ke laluan kunci API atau cawangan merendahkan kepada tanpa nama, jadi gangguan pembekal identiti tidak boleh menjadi akses terbuka. Kekunci API statik tidak terjejas. Lihat [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — menerima sesi papan pemuka, permintaan penyegerakan model dalaman (dipadanan dengan `/api/providers/[name]/(sync-models|models)`), atau melangkau sepenuhnya jika `isAuthRequired()` mengembalikan palsu. Mengembalikan 403 (`AUTH_001`) apabila token Pembawa hadir tetapi tidak sah, 401 sebaliknya. Juga menguatkuasakan peringkat pengawal laluan (LOCAL_ONLY / ALWAYS_PROTECTED) sebelum mana-mana cawangan pengesahan — lihat [Peringkat Pengawal Laluan](../security/ROUTE_GUARD_TIERS.md). laluan LOCAL_ONLY dalam `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (hari ini: `/api/mcp/`) boleh diakses daripada bukan gelung apabila kunci Pembawa membawa skop `manage` ; semua laluan LOCAL_ONLY lain kekal strict-loopback tanpa mengira skop.

Polisi yang berjaya mengembalikan `AuthSubject` dengan `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Pengendali hiliran boleh membacanya melalui `assertAuth(request, "CLIENT_API")` dalam `src/server/authz/assertAuth.ts` dan bukannya menjalankan semula logik auth.

## Senarai Laluan Awam

`src/shared/constants/publicApiRoutes.ts` ialah senarai benarkan eksplisit:

Senarai ini dibahagikan mengikut **bentuk**, dan pembahagian ini penting untuk keselamatan (GHSA-74g9-q8f6-793h): awalan dipadankan dengan `startsWith()`, jadi ia turut sepadan dengan setiap laluan bersebelahan yang berkongsi aksara pendahulunya.
`/api/usage/om-usage` sebagai awalan menandakan `/api/usage/om-usage<anything>` sebagai PUBLIC, dan Next menyelesaikannya kepada `/api/usage/[connectionId]` — pengendali tanpa pengesahan sendiri.

```ts
// Subpepohon sebenar. Setiap entri MESTI berakhir dengan "/" (disahkan oleh ujian unit).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // dianggap sebagai CLIENT_API dalam classify, bukan "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Laluan tunggal, dipadankan SECARA TEPAT (dengan atau tanpa garis condong di hujung).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // langkah log masuk 2 untuk TOTP pilihan; memerlukan kuki MFA-pending
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Laluan tunggal baca sahaja yang turut menerima kelonggaran asal CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Laluan tunggal baca sahaja TANPA kelonggaran CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Laluan baca sahaja adalah awam **hanya** untuk kaedah selamat. Nota: `classifyRoute()` mengecualikan `/api/v1/*` dan `/api/v1beta/*` daripada laluan sandaran PUBLIC — laluan tersebut sentiasa `CLIENT_API`, jadi dasar kunci Bearer masih terpakai.

## Menambah Laluan Baharu

### Corak 1 — Titik akhir API klien awam (pengesahan Bearer)

Laluan di bawah `/api/v1/` dan `/api/v1beta/` dikelaskan sebagai `CLIENT_API` secara automatik. Perisian tengah menguatkuasakan semakan Bearer; pengendali laluan tidak perlu mengulanginya, tetapi boleh membaca subjek jika berguna.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logik pengendali
}
```

### Corak 2 — Titik akhir pengurusan (sesi atau Bearer + manage)

Gunakan `requireManagementAuth()` daripada `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logik pengendali
}
```

`requireManagementAuth()` mengembalikan `null` apabila berjaya atau `Response` ralat JSON:

- 401 `AUTH_001` "Pengesahan diperlukan" — langsung tiada bukti kelayakan
- 403 — Bearer tidak sah **atau** Bearer tersedia tetapi kunci tidak mempunyai skop `manage` / `admin`

`hasManageScope(scopes)` mengembalikan true untuk `"manage"` atau `"admin"`.

### Corak 3 — Menambah pada senarai dibenarkan awam

Pilih set berdasarkan bentuk, bukan kemudahan. Satu laluan dimasukkan ke dalam `PUBLIC_API_ROUTES_EXACT` (atau `PUBLIC_READONLY_CORS_API_ROUTES` untuk GET sahaja); hanya subpohon sebenar dimasukkan ke dalam `PUBLIC_API_ROUTE_PREFIXES`, dan ia **mesti berakhir dengan `/`**. Meletakkan satu laluan dalam senarai awalan turut menerbitkan setiap laluan bersebelahan yang berkongsi aksara permulaannya — termasuk laluan saudara segmen dinamik yang ditambah kemudian (GHSA-74g9-q8f6-793h). Kemas kini ujian unit di `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` dan `tests/unit/authz/classify.test.ts`.

## Skop

Tiga ruang nama. Setiap penyemak hanya membaca rentetan sendiri. Perbandingan bersebelahan,
termasuk mengapa `manage` gagal `scopeMatches` untuk `read:compression` dan mengapa token akses `read` tidak boleh `PATCH /api/keys/{id}`, adalah
[Tiga ruang nama skop](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Kunci API membawa tatasusunan `scopes` (disimpan sebagai JSON dalam `api_keys.scopes`, lihat `src/lib/db/apiKeys.ts`).

### Skop pengurusan

- `manage` / `admin` — `hasManageScope`. Akses pembawa ke laluan API pengurusan.
- `mcp:connect`, `self:usage`, `self:account-quota`, dan
  `policy:bypass-provider-quota` adalah skop padanan tepat tambahan. Ia berada
  di luar `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` hanya membuka laluan
  `/api/mcp/` yang bukan gelung balik.

### Skop alat MCP

Katalog dan peraturan padanan (rentetan yang sama, atau skop yang diberikan berakhir dengan `*`):
[Skop alat MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` dalam `src/shared/constants/mcpScopes.ts` adalah subset bertaip asal,
bukan katalog penuh itu. Penguatkuasaan berjalan dalam
`open-sse/mcp-server/scopeEnforcement.ts` selepas `resolveCallerScopeContext()`
menyelesaikan skop daripada maklumat pengesahan MCP, metadata permintaan, atau `OMNIROUTE_MCP_SCOPES`.
Ia kekal tidak aktif melainkan `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Skop token akses

`read` / `write` / `admin` pada token `oma_live_…`, disenaraikan mengikut `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Peringkat ini hanya terpakai pada
kelayakan token akses. Lihat [Pengesahan Pengurusan](../guides/MANAGEMENT-AUTH.md).

## Togol Keperluan Pengesahan

`isAuthRequired()` dalam `src/shared/utils/apiAuth.ts` menentukan sama ada **sebarang** pengesahan dikuatkuasakan untuk sesuatu permintaan:

- `settings.requireLogin === false` → pengesahan dinyahdayakan secara global, kecuali untuk
  tingkat yang sentiasa dilindungi (lihat [Tingkat Pengawal Laluan](../security/ROUTE_GUARD_TIERS.md)) dan panggilan yang mengeluarkan
  kelayakan yang diterimanya, yang memerlukan kelayakan yang sama seperti apabila log masuk
  didayakan: mengeluarkan token penyegerakan, menjana token akses CLI pada sebarang skop, dan
  mencipta kunci API dengan skop `manage`/`admin`, memberikan skop tersebut kepada kunci, atau
  menjana semula atau mendedahkan kunci sedemikian
  (`requireCredentialForManagementScopedKey()` dalam `src/lib/api/requireManagementAuth.ts`).
  Kunci inferens sahaja kekal terbuka. Penulisan bendera ciri yang dilindungi (`REQUIRE_API_KEY`,
  bendera Security yang lain, serta bendera SSRF / TLS / skop MCP / sandbox yang disenaraikan dalam
  [Bendera Ciri](../reference/FEATURE_FLAGS.md#rest-api)) dan penyimpanan tetapan penyamaran PII
  (`PUT /api/settings/pii`) juga terus memerlukan kelayakan.
- Tiada kata laluan dikonfigurasikan **dan** tiada pemboleh ubah persekitaran `INITIAL_PASSWORD` → mod
  bootstrap membenarkan wizard onboarding dan permintaan loopback, tetapi permintaan rangkaian yang
  terdedah masih memerlukan kelayakan. Pengecualian: penulisan bendera ciri yang dilindungi dan
  penyimpanan tetapan penyamaran PII (`PUT /api/settings/pii`) memerlukan kelayakan walaupun dari
  loopback, jadi loopback sahaja tidak mencukupi untuknya.
- Sebarang ralat DB → gagal secara tertutup (selamat secara lalai).

Penguatkuasaan kunci API klien menggunakan `isRequireApiKeyEnabled()` dalam `src/shared/utils/featureFlags.ts`, bukan bacaan langsung `process.env.REQUIRE_API_KEY`. Hal ini penting untuk instans yang digunakan: menogol `REQUIRE_API_KEY` dalam Papan Pemuka → Bendera Ciri menyimpan penggantian DB dan serta-merta mempengaruhi `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, serta semakan pengesahan API klien lain yang berkongsi pembantu ini. Jika stor bendera ciri tidak dapat dibaca, pengesahan API klien gagal secara tertutup dan memerlukan kunci.

## Perubahan Pecah Keserasian — v3.8.0

Titik akhir `/api/v1/agents/tasks/*` dan `/api/resilience/model-cooldowns` **kini memerlukan pengesahan pengurusan** (komit `588a0333`). Klien yang sebelum ini menghantar kunci API biasa tanpa skop `manage` akan menerima `403`. Migrasi: sama ada berikan skop `manage` kepada kunci dalam papan pemuka API Keys, atau gunakan sesi papan pemuka yang telah dilog masuk.

## Perubahan Tingkah Laku — v3.8.2

`/api/mcp/*` (pelayan MCP jauh) masih LOCAL_ONLY secara lalai tetapi kini menerima permintaan bukan gelung balik apabila pengepala `Authorization: Bearer <api-key>` membawa skop `manage`. Pengecualian ini dikawal secara eksplisit bagi setiap laluan melalui `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dalam `src/server/authz/routeGuard.ts`; awalan LOCAL_ONLY yang setara, `/api/cli-tools/runtime/*`, sengaja TIDAK boleh dipintas kerana ia boleh mewujudkan subproses sewenang-wenangnya. Permintaan tanpa nama ke `/api/mcp/*` daripada bukan gelung balik terus mengembalikan `403 LOCAL_ONLY` — lalai bagi mana-mana laluan LOCAL_ONLY baharu kekal sebagai gelung balik ketat. Lihat [Tahap Pengawal Laluan](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pengujian

- Ujian unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Senarai dibenarkan awam: `tests/unit/public-api-routes.test.ts`.
- Jalankan ujian khusus: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Penyahpepijatan

Saluran paip sentiasa mengecap respons dengan:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Untuk permintaan yang disahkan, pengepala permintaan huluan (sebelah pengendali) juga termasuk:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Gunakan `assertAuth(req, expectedClass)` dalam pengendali — ia membuang `AuthzAssertionError` dengan kod `AUTHZ_NOT_INITIALIZED` jika perisian tengah dipintas (bermanfaat untuk menangkap regresi konfigurasi dalam ujian).

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — penanda pengesahan bagi setiap titik akhir
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log audit untuk peristiwa pengesahan
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tiga ruang nama skop dan katalog skop alat MCP
- Sumber: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
