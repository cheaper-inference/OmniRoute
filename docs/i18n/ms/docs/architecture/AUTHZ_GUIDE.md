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

Disahkan oleh `isValidApiKey()` / `extractApiKey()` dalam `src/sse/services/auth.ts` dan dieksport semula melalui `src/shared/utils/apiAuth.ts`. Pengesah turut menerima pembolehubah persekitaran `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` sebagai kunci passthrough kekal (isu #1350).

### 2. Sesi Papan Pemuka (cookie auth_token)

Untuk halaman papan pemuka dan operasi pentadbir.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie hanya dianggap sesi apabila JWT disahkan **dan** membawa `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Setiap pengguna cookie — pengawal laluan papan pemuka (`isDashboardSessionAuthenticated()`), penyegaran saluran authz, jabat tangan WebSocket, pelayan langsung, `/api/settings/require-login`, `/api/auth/status` — melalui pembantu ini.
Terdapat juga JWT lain yang ditandatangani dengan `JWT_SECRET` — laluan passthrough Cursor CLI mengeluarkan token `iss "omniroute" / aud "cursor-cli"` untuk pemegang kunci — dan token tersebut tidak sekali-kali dianggap sesi (#13298).

Disahkan oleh `isDashboardSessionAuthenticated()` dalam `src/shared/utils/apiAuth.ts`. Saluran memperbaharui JWT secara automatik apabila kurang daripada 7 hari berbaki daripada jangka hayat 30 hari.

Sesi juga boleh tamat sebelum 30 hari berlalu: setiap penerbit melalui `mintDashboardSessionToken` (masa terbit `iat` dan ID `jti`), dan pengesah menyemak dua tetapan: `sessionsValidAfter`, yang ditetapkan oleh pertukaran kata laluan supaya setiap sesi yang diterbitkan sebelumnya berhenti disahkan (pelayar yang menukar kata laluan mendapat cookie baharu), dan `revokedDashboardSessions`, yang `POST /api/auth/logout` tambahkan `jti` sesi yang dilog keluar. Sesi yang dicipta oleh keluaran lama tidak membawa tuntutan ini dan kekal sah sehingga pertukaran kata laluan pertama. Jika tetapan tidak dapat dibaca, sesi tidak dipercayai.

Sesetengah laluan pengurusan menerima **salah satu** mod: cookie ATAU `Bearer <key>` apabila kunci API mempunyai skop `manage` (atau `admin`). Inilah yang membolehkan aliran kerja "boleh dikonfigurasi melalui panggilan API" yang ditambah dalam v3.8.

#### Pintu log masuk OIDC pilihan (#6973)

Log masuk pentadbir papan pemuka turut menyokong aliran OIDC (OpenID Connect) yang **pilihan** di samping log masuk kata laluan lalai — log masuk kata laluan tidak pernah dibuang, hanya ditambah:

- Diaktifkan hanya jika `settings.oidcEnabled === true` **dan** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` kesemuanya dikonfigurasi (Tetapan → Pengesahan). Jika tidak, `GET /api/auth/oidc/login` mengembalikan `400`.
- `GET /api/auth/oidc/login` menemukan `authorization_endpoint` daripada `/.well-known/openid-configuration` pengeluar (jatuh balik kepada `<issuer>/authorize`), membina URI ubah hala daripada permintaan masuk (menghormati `x-forwarded-proto`), dan mengubah hala ke IdP dengan nilai `state` rawak yang disimpan dalam cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` mengesahkan `state`, menukar kod kebenaran, dan mengesahkan tandatangan ID token melalui JWKS pengeluar (`jose` `createRemoteJWKSet`, di-cache bagi setiap URI JWKS), dengan semakan `issuer`/`audience`. Senarai benar `oidcAllowedSubjects` diwajibkan: ia dipadankan dengan tuntutan `sub` token atau tuntutan `email` — tuntutan e-mel hanya diterima apabila `email_verified === true`, jadi e-mel yang tidak disahkan di IdP tidak sekali-kali dapat melepasi pintu ini — dan tanpa sebarang entri, callback menolak setiap log masuk (`not_configured`).
- Apabila berjaya, ia mengeluarkan JWT `auth_token` 30 hari yang **sama** seperti yang dikeluarkan oleh log masuk kata laluan (`src/app/api/auth/login/route.ts`), jadi baki saluran sesi papan pemuka (penyegaran automatik, bendera cookie) tidak berubah — OIDC hanya menggantikan cara cookie dikeluarkan, bukan apa yang diberikannya.
- Setiap tetapan `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) berada dalam `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` menjawab `400 PASSWORD_REQUIRED` melainkan badan membawa kata laluan pengurusan sebagai `currentPassword` (`401 PASSWORD_MISMATCH` jika salah). `oidcDisablePasswordLogin` menghalang _log masuk_ kata laluan (`POST /api/auth/login`) tetapi mengekalkan hash kata laluan yang disimpan, dan pengesahan semula tetap menyemaknya terhadap `currentPassword`.
- `corsOrigins` dan `bruteForceProtection` turut berada dalam `SECURITY_IMPACTING_SETTINGS_KEYS`: melonggarkan mana-mana satu daripadanya melemahkan pertahanan log masuk, jadi kedua-duanya memerlukan pengesahan semula `currentPassword` yang sama (tab Keselamatan memintanya) dan import JSON membuangnya.
- Setiap kunci dasar keselamatan — entri `SECURITY_IMPACTING_SETTINGS_KEYS`, setiap kunci `oidc*`, dan keadaan sesi papan pemuka — ialah **khusus operator** pada `PATCH /api/settings`: kunci API berskop manage atau token akses `oma_` ditolak dengan `403` walaupun menghantar `currentPassword` yang betul, dan penolakan itu diaudit sebagai `settings.update_failed` dengan `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` dalam `src/lib/api/operatorCredential.ts`). Tetapan biasa (tema, keutamaan paparan) kekal boleh ditulis oleh kunci `manage` atau token akses `admin`. Setiap mutasi pada `/api/settings` itu sendiri (dan `/api/settings/require-login`) turut memerlukan skop token akses `admin` (`ADMIN_MUTATION_EXACT_PATHS` dalam `src/server/authz/accessScopes.ts`, padanan laluan tepat); `GET` memerlukan `read`, manakala sub-laluan `/api/settings/*` yang lain (proksi, lalai combo, alias model, pemampatan, pembersihan…) mengekalkan skop `write` yang disimpulkan daripada kaedah.
- `POST /api/settings/import-json` melangkau pengesahan semula itu, jadi sebelum menulis ia membuang setiap kunci dalam `IMPORT_STRIPPED_SETTINGS_KEYS` (fail yang sama): kata laluan dan `currentPassword`, setiap entri `SECURITY_IMPACTING_SETTINGS_KEYS`, dan keadaan sesi papan pemuka (`sessionsValidAfter`, `revokedDashboardSessions`). Oleh itu, mengimport sandaran lama tidak dapat menghidupkan semula sesi yang telah ditamatkan oleh pertukaran kata laluan atau log keluar.
- Diaktifkan hanya jika `settings.oidcEnabled === true` **dan** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` kesemuanya dikonfigurasi (Tetapan → Pengesahan). Jika tidak, `GET /api/auth/oidc/login` mengembalikan `400`.
- `GET /api/auth/oidc/login` menemukan `authorization_endpoint` daripada `/.well-known/openid-configuration` pengeluar (jatuh balik kepada `<issuer>/authorize`), membina URI ubah hala daripada permintaan masuk (menghormati `x-forwarded-proto`), dan mengubah hala ke IdP dengan nilai `state` rawak yang disimpan dalam cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` mengesahkan `state`, menukar kod kebenaran, dan mengesahkan tandatangan ID token melalui JWKS pengeluar (`jose` `createRemoteJWKSet`, di-cache bagi setiap URI JWKS), dengan semakan `issuer`/`audience`. Senarai benar `oidcAllowedSubjects` diwajibkan: ia dipadankan dengan tuntutan `sub` token atau tuntutan `email` — tuntutan e-mel hanya diterima apabila `email_verified === true`, jadi e-mel yang tidak disahkan di IdP tidak sekali-kali dapat melepasi pintu ini — dan tanpa sebarang entri, callback menolak setiap log masuk (`not_configured`).
- Apabila berjaya, ia mengeluarkan JWT `auth_token` 30 hari yang **sama** seperti yang dikeluarkan oleh log masuk kata laluan (`src/app/api/auth/login/route.ts`), jadi baki saluran sesi papan pemuka (penyegaran automatik, bendera cookie) tidak berubah — OIDC hanya menggantikan cara cookie dikeluarkan, bukan apa yang diberikannya.
- Setiap tetapan `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) berada dalam `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` menjawab `400 PASSWORD_REQUIRED` melainkan badan membawa kata laluan pengurusan sebagai `currentPassword` (`401 PASSWORD_MISMATCH` jika salah). `oidcDisablePasswordLogin` menghalang _log masuk_ kata laluan (`POST /api/auth/login`) tetapi mengekalkan hash kata laluan yang disimpan, dan pengesahan semula tetap menyemaknya terhadap `currentPassword`.
- `corsOrigins` dan `bruteForceProtection` turut berada dalam `SECURITY_IMPACTING_SETTINGS_KEYS`: melonggarkan mana-mana satu daripadanya melemahkan pertahanan log masuk, jadi kedua-duanya memerlukan pengesahan semula `currentPassword` yang sama (tab Keselamatan memintanya) dan import JSON membuangnya.
- Setiap kunci dasar keselamatan — entri `SECURITY_IMPACTING_SETTINGS_KEYS`, setiap kunci `oidc*`, dan keadaan sesi papan pemuka — ialah **khusus operator** pada `PATCH /api/settings`: kunci API berskop manage atau token akses `oma_` ditolak dengan `403` walaupun menghantar `currentPassword` yang betul, dan penolakan itu diaudit sebagai `settings.update_failed` dengan `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` dalam `src/lib/api/operatorCredential.ts`). Tetapan biasa (tema, keutamaan paparan) kekal boleh ditulis oleh kunci `manage` atau token akses `admin`. Setiap mutasi pada `/api/settings` itu sendiri (dan `/api/settings/require-login`) turut memerlukan skop token akses `admin` (`ADMIN_MUTATION_EXACT_PATHS` dalam `src/server/authz/accessScopes.ts`, padanan laluan tepat); `GET` memerlukan `read`, manakala sub-laluan `/api/settings/*` yang lain (proksi, lalai combo, alias model, pemampatan, pembersihan…) mengekalkan skop `write` yang disimpulkan daripada kaedah.
- `POST /api/settings/import-json` melangkau pengesahan semula itu, jadi sebelum menulis ia membuang setiap kunci dalam `IMPORT_STRIPPED_SETTINGS_KEYS` (fail yang sama): kata laluan dan `currentPassword`, setiap entri `SECURITY_IMPACTING_SETTINGS_KEYS`, dan keadaan sesi papan pemuka (`sessionsValidAfter`, `revokedDashboardSessions`). Oleh itu, mengimport sandaran lama tidak dapat menghidupkan semula sesi yang telah ditamatkan oleh pertukaran kata laluan atau log keluar.

## Kelas Laluan

`src/server/authz/types.ts` mentakrifkan tiga kelas; mana-mana laluan yang tidak dapat diklasifikasikan secara deterministik akan jatuh balik kepada `MANAGEMENT`.

| Kelas        | Penerangan                                                                                                                                              | Pengesahan diperlukan                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Laluan yang secara eksplisit selamat — log masuk, log keluar, status, inisialisasi, kesihatan dan bootstrap pendaftaran.                                | Tiada                                                                        |
| `CLIENT_API` | Titik akhir penyajian model — `/api/v1/*`, `/api/v1beta/*`, serta alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Kunci Bearer apabila bendera ciri `REQUIRE_API_KEY` yang berkesan diaktifkan |
| `MANAGEMENT` | Halaman papan pemuka, tetapan, pembekal, kunci, serta titik akhir pentadbiran dan diagnostik.                                                           | Sesi papan pemuka ATAU Bearer dengan skop `manage`                           |

Beberapa tindakan `MANAGEMENT` adalah **khusus operator**: kunci `manage` tidak mencukupi. Mengeksport kelayakan tersimpan (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), memulihkan sandaran ke atas data langsung (`POST /api/db-backups/import` termasuk `dryRun=true`, `POST /api/db-backups` pemulihan mengikut id, `POST /api/settings/import-json`), dan memusnahkan titik pemulihan (`DELETE /api/db-backups` pembersihan, dan `PATCH /api/db-backups` kerana pengekalannya memacu pemangkasan automatik selepas setiap sandaran) memerlukan sesi papan pemuka, subjek CLI tempatan, atau log masuk yang dilumpuhkan. Mengeluarkan token penyegerakan (`POST /api/sync/tokens`) dan mencetak token akses CLI `admin` (`POST /api/cli/tokens`) memerlukan sesi papan pemuka atau subjek CLI tempatan dalam setiap mod log masuk. Kunci API bagi mana-mana skop dan token akses `oma_` bukan kelayakan operator: ia menerima `403` setiap kali salah satu diperlukan. Semakannya terdapat dalam `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Menukar tetapan log masuk juga khusus operator: `POST /api/settings/require-login` (menetapkan kata laluan pengurusan / menukar `requireLogin`) hanya menerima kelayakan tersebut selepas kata laluan wujud — tetingkap bootstrap permulaan (belum ada kata laluan) kekal tidak berubah — dan sesi papan pemuka mesti menghantar `currentPassword` untuk menggantikan kata laluan (`403` jika tiada atau salah, diaudit sebagai `settings.update_failed`). CLI tempatan dan contoh yang log masuknya dilumpuhkan mengekalkan laluan pemulihan dan boleh menetapkan kata laluan tanpanya, kerana kedua-duanya terikat pada hos yang memiliki direktori data.

## Saluran Pemprosesan

```
Permintaan masuk → src/proxy.ts
  → runAuthzPipeline() dalam src/server/authz/pipeline.ts
    1. Buang pengepala dalaman yang dipercayai (x-omniroute-auth-*, x-omniroute-route-class)
    2. Jana ID permintaan, kelaskan laluan melalui classifyRoute()
    3. Jika pathname == "/" → ubah hala ke /dashboard
    4. Jika sedang dikosongkan (penutupan secara terkawal) dan /api/* → 503
    5. Jika bukan GET /api/* → pengadang checkBodySize()
    6. Jika OPTIONS → prapenerbangan CORS 204
    7. Jika options.enforce == false → teruskan dengan pengepala kelas laluan
    8. Jika tidak: POLICIES[routeClass].evaluate(ctx)
       - benarkan → cap x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - tolak    → ralat JSON dengan correlation_id (halaman papan pemuka → 302 /login)
```

Pengepala dalaman yang dipercayai (ditakrifkan dalam `src/server/authz/headers.ts`) **dibuang daripada permintaan masuk** sebelum pengelasan — klien tidak boleh mengisi awal `x-omniroute-auth-*` untuk menyamar sebagai subjek.

### Kontrak dasar

Setiap kelas laluan mempunyai dasar dalam `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — sentiasa mengembalikan `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — mengekstrak Bearer dan mengesahkannya melalui `validateApiKey()`. Hanya beralih kepada akses tanpa nama apabila bendera ciri `REQUIRE_API_KEY` yang berkuat kuasa dinyahdayakan. Bendera yang berkuat kuasa ditentukan melalui `isRequireApiKeyEnabled()` (`penggantian bendera ciri DB > process.env.REQUIRE_API_KEY > lalai`) supaya Bendera Ciri Papan Pemuka dan pemboleh ubah persekitaran mengawal `/api/v1/*`, `/api/v1beta/*`, serta alias secara konsisten; kegagalan penentu akan ditutup secara selamat. Membenarkan permintaan sesi papan pemuka pada laluan API klien (termasuk `/api/v1/models`, yang digunakan oleh katalog model papan pemuka).
- **`managementPolicy`** (`policies/management.ts`) — menerima sesi papan pemuka, permintaan penyegerakan model dalaman (dipadankan dengan `/api/providers/[name]/(sync-models|models)`), atau dilangkau sepenuhnya jika `isAuthRequired()` mengembalikan false. Mengembalikan 403 (`AUTH_001`) apabila token Bearer disertakan tetapi tidak sah, dan 401 jika tidak. Ia juga menguatkuasakan peringkat pengadang laluan (LOCAL_ONLY / ALWAYS_PROTECTED) sebelum mana-mana cabang pengesahan — lihat [Peringkat Pengadang Laluan](../security/ROUTE_GUARD_TIERS.md). Laluan LOCAL_ONLY dalam `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (pada masa ini: `/api/mcp/`) boleh dicapai dari bukan gelung balik apabila kunci Bearer mempunyai skop `manage`; semua laluan LOCAL_ONLY yang lain kekal terhad kepada gelung balik tanpa mengira skop.

Dasar yang berjaya mengembalikan `AuthSubject` dengan `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Pengendali hiliran boleh membacanya melalui `assertAuth(request, "CLIENT_API")` dalam `src/server/authz/assertAuth.ts` dan bukannya menjalankan semula logik pengesahan.

## Senarai Laluan Awam

`src/shared/constants/publicApiRoutes.ts` ialah senarai dibenarkan yang eksplisit:

Senarai ini dibahagikan mengikut **bentuk**, dan pembahagian ini amat penting (GHSA-74g9-q8f6-793h): awalan dipadankan menggunakan `startsWith()`, maka ia turut memadankan setiap laluan bersebelahan yang berkongsi aksara permulaan yang sama.
Apabila `/api/usage/om-usage` digunakan sebagai awalan, `/api/usage/om-usage<anything>` ditandai sebagai AWAM, dan Next menyelesaikannya kepada `/api/usage/[connectionId]` — pengendali yang tidak mempunyai pengesahan tersendiri.

```ts
// Subpohon sebenar. Setiap entri MESTI berakhir dengan "/" (disahkan oleh ujian unit).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // dianggap sebagai CLIENT_API dalam classify, bukan sebagai awam "tanpa pengesahan"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Laluan tunggal, dipadankan SECARA TEPAT (dengan atau tanpa garis miring di hujung).
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

// Laluan tunggal baca sahaja yang turut menerima pelonggaran asal CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Laluan tunggal baca sahaja TANPA pelonggaran CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Laluan baca sahaja adalah awam **hanya** untuk kaedah yang selamat. Nota: `classifyRoute()` mengecualikan `/api/v1/*` dan `/api/v1beta/*` daripada sandaran PUBLIC — laluan tersebut sentiasa `CLIENT_API` supaya dasar kunci Bearer terus digunakan.

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

## Suis Pengesahan Diperlukan

`isAuthRequired()` dalam `src/shared/utils/apiAuth.ts` menentukan sama ada **sebarang** pengesahan dikuatkuasakan untuk sesuatu permintaan:

- `settings.requireLogin === false` → pengesahan dilumpuhkan secara global, kecuali bagi peringkat yang sentiasa dilindungi (lihat [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) dan panggilan yang menyerahkan kelayakan yang diterimanya, yang memerlukan kelayakan yang sama seperti apabila log masuk dihidupkan: mengeluarkan token penyegerakan, mencetak token akses CLI pada mana-mana skop, dan mencipta kunci API dengan skop `manage`/`admin`, memberikan skop tersebut kepada kunci, atau menjana semula atau mendedahkan kunci sedemikian (`requireCredentialForManagementScopedKey()` dalam `src/lib/api/requireManagementAuth.ts`). Kunci khusus inferens kekal terbuka.
- Tiada kata laluan dikonfigurasi **dan** tiada pembolehubah persekitaran `INITIAL_PASSWORD` → mod bootstrap: wizard pendaftaran dan permintaan loopback dibenarkan, tetapi permintaan rangkaian luaran masih memerlukan kelayakan.
- Sebarang ralat DB → gagal tertutup (selamat secara lalai).

Penguatkuasaan kunci API klien menggunakan `isRequireApiKeyEnabled()` dalam `src/shared/utils/featureFlags.ts`, bukan bacaan langsung `process.env.REQUIRE_API_KEY`. Ini penting bagi contoh yang dideploy: menukar `REQUIRE_API_KEY` dalam Papan Pemuka → Feature Flags menyimpan override DB dan segera memberi kesan kepada `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` dan semakan pengesahan API klien lain yang berkongsi pembantu ini. Jika stor feature flag tidak dapat dibaca, pengesahan API klien gagal tertutup dan memerlukan kunci.

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
x-request-id:               <id korelasi, digemakan dalam badan ralat>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Untuk permintaan yang disahkan, pengepala permintaan huluan (pada bahagian pengendali) turut merangkumi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4-aksara-terakhir> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (pilihan)
x-omniroute-auth-scopes:    senarai dipisahkan koma
```

Gunakan `assertAuth(req, expectedClass)` dalam pengendali — ia melontarkan `AuthzAssertionError` dengan kod `AUTHZ_NOT_INITIALIZED` jika perisian tengah telah dipintas (berguna untuk mengesan regresi konfigurasi dalam ujian).

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — penanda pengesahan bagi setiap titik akhir
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log audit untuk peristiwa pengesahan
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tiga ruang nama skop dan katalog skop alat MCP
- Sumber: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
