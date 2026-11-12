# CORS Configuration & Security (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute mengawal yang mana **asal usul pelayar** boleh membaca jawapan silang asal daripada satu senarai dibenarkan berpusat. Modelnya ialah **gagal-ditutup secara lalai** : tiada asal dibenarkan sehingga anda ikut serta. Halaman ini mendokumenkan cara senarai dibenarkan menyelesaikan, perkara yang sebenarnya didedahkan oleh `CORS_ALLOW_ALL=true` (dan, yang penting, perkara yang dilakukannya **bukan** ), cara mengkonfigurasi dev vs pengeluaran dengan selamat, dan amaran masa jalan pada papan pemuka menunjukkan apabila kad bebas disiarkan.

**Sumber kebenaran:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Senarai dibenarkan digunakan sekali, dalam perisian tengah (`src/server/authz/pipeline.ts`) pengendali setiap laluan — tidak menetapkan `Access-Control-Allow-Origin` sendiri.

## Bagaimana asal usul diselesaikan

Untuk setiap permintaan middleware mengira nilai `Access-Control-Allow-Origin` dalam susunan ini:

1. **`CORS_ALLOW_ALL=true`** (atau `CORS_ORIGIN=*` warisan ) → menggemakan kembali `Origin` pemanggil (atau `*` apabila tiada pengepala `Origin` ), dengan `Vary: Origin` supaya cache kekal betul. Titik pencekik `applyCorsHeaders()` yang sama juga menambahkan `Vary: Accept-Encoding` pada setiap respons 2xx-dengan-badan pada permukaan `/v1*`/`/v1beta*` yang disahkan token (`relaxForTokenAuth`, RFC 9110 §12.5.5, mengeluarkan #6737), jadi cache downstream/shared boleh membezakan varian termampat berbanding tidak dimampatkan dengan betul.
2. Jika tidak, permintaan `Origin` dinormalisasi (huruf kecil, garis miring mengekor dilucutkan) dan dipadankan dengan **senarai dibenarkan digabungkan** :
   - env **`CORS_ALLOWED_ORIGINS`** Senarai dipisahkan koma —, dan
   - masa larian **`corsOrigins`** tetapan (Papan Pemuka → Security → _CORS Allowed Origins_), disuntik melalui `setRuntimeAllowedOrigins()` daripada `src/lib/config/runtimeSettings.ts`.
3. Tiada padanan →**tiada pengepala `Access-Control-Allow-Origin` dipancarkan** . Penyemak imbas menyekat bacaan silang asal. Ini ialah lalai tertutup gagal yang dimaksudkan.

| Env var                | Maknanya                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV asal-usul yang tepat untuk dibenarkan (disyorkan).                                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → menggemakan mana-mana asal (wildcard). Dev sahaja.                                     |
| `CORS_ORIGIN`          | Legasi. `*` berkelakuan seperti `CORS_ALLOW_ALL`; satu nilai ditambah pada senarai yang dibenarkan. |

## Ancaman model — apa yang `CORS_ALLOW_ALL=true` benar-benar dedahkan

Amaran OWASP generik ("wildcard CORS = mana-mana tapak boleh memanggil API anda") patut diambil serius, tetapi pendedahan OmniRoute adalah **lebih sempit daripada kes generik** , kerana satu fakta pelaksanaan konkrit:

> **`applyCorsHeaders()` pusat tidak pernah mengeluarkan `Access-Control-Allow-Credentials`.** Penyemak imbas tidak akan mendedahkan respons silang asal _bertauliah_ (berisi kuki) melainkan pelayan menghantar `Access-Control-Allow-Credentials: true`. Laluan CORS kongsi OmniRoute tidak pernah berlaku.

Maksudnya setiap permukaan, walaupun dengan `CORS_ALLOW_ALL=true`:

| Permukaan                           | Mekanisme pengesahan            | Kesan kad bebas CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Papan pemuka / MANAGEMENT `/api/*`  | Sesi kuki                       | Asal bergema, tetapi **tanpa `Allow-Credentials`** pelayar **blok** bacaan yang diberi tauliah. Tapak silang asal yang berniat jahat **tidak boleh membaca** respons papan pemuka anda yang disahkan dan kuki sesi tidak didedahkan.                                                                                                                                                                                                                                                                                                                                                   |
| Pelanggan API `/v1/*`, `/v1beta/*`  | Pengepala pembawa / `x-api-key` | Sudah permisif **dengan reka bentuk** (`relaxForTokenAuth`): penyemak imbas tidak pernah melampirkan secara automatik `Authorization`/`x-api-key`, jadi halaman penyerang tidak boleh membekalkan kunci anda. Gema santai memerlukan subjek yang disahkan (kunci API atau sesi papan pemuka yang disahkan), bukan hanya pengepala bukti kelayakan dan tidak sekali-kali termasuk `Access-Control-Allow-Credentials`. Respons tanpa nama (`REQUIRE_API_KEY=false`) menggunakan senarai dibenarkan asal yang dikonfigurasikan, termasuk ikut serta `CORS_ALLOW_ALL=true` yang eksplisit. |
| Baca sahaja awam (`/api/health`, …) | tiada                           | Tidak sensitif; kad bebas tidak berbahaya.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Jadi **baki** pendedahan `CORS_ALLOW_ALL=true` dihadkan kepada: (a) asal silang tanpa tauliah **membaca** data yang sudah tidak disahkan, dan (b) membenarkan CORS**pas sebelum penerbangan** pada laluan pengurusan — yang masih memerlukan pengesahan yang tidak dapat diberikan oleh halaman silang asal. Ia adalah **bukan** vektor rampasan sesi atau kecurian kelayakan pada laluan CORS yang dikongsi.

### Satu pengecualian tulen — `/api/v1/agents/`

Laluan Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) menetapkan laluannya **sendiri** Pengepala CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) dan **buat** mengeluarkan `Access-Control-Allow-Origin: <origin>|*` bersama-sama dengan `Access-Control-Allow-Credentials: true`. Ini adalah permukaan tunggal di mana gema asal dan bukti kelayakan wujud bersama, dan memang begitu **bebas daripada `CORS_ALLOW_ALL`** . Laluan ini disahkan pengurusan (`requireManagementAuth`); pengendali yang mendedahkan papan pemuka di luar hos harus sedar bahawa ini adalah satu-satunya tempat bacaan bertauliah silang asal dibenarkan oleh pengepala respons. Mengetatkannya kepada senarai benar yang jelas dijejaki secara berasingan daripada panduan CORS ini.

## Senarai semak pengeluaran

- **Jangan sekali-kali menetapkan `CORS_ALLOW_ALL=true` dalam pengeluaran.** Biarkan ia tidak ditetapkan.
- Tetapkan satu **eksplisit** senarai asal — sama ada env var atau medan tab Keselamatan:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jika OmniRoute berjalan di belakang proksi / terowong terbalik (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS ialah **bukan** satu-satunya kawalan anda — pengawal laluan gelung balik masih melindungi laluan berkemampuan bertelur (lihat [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Jangan palsukan `X-Forwarded-For: 127.0.0.1` untuk "membetulkan" 403; yang membuka semula kelas RCE yang ditutup oleh pengawal laluan.
- Sahkan keadaan masa jalan: papan pemuka menunjukkan a **sepanduk ambar yang berterusan** di bawah Papan Pemuka → Security → Inventori Kebenaran setiap kali `CORS_ALLOW_ALL=true` disiarkan, dan `/api/settings/authz-inventory` mengembalikan alat pemantauan sampul surat `cors: { allowAll, allowedOrigins }` yang boleh membuat tinjauan pendapat.

## Kemudahan pembangunan — membenarkan asal-usul tempatan tertentu

Anda jarang memerlukan kad bebas walaupun dalam dev. Benarkan hanya pelayan pembangun yang anda gunakan:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Asal dipadankan secara tidak sensitif huruf besar dengan tanda serong mengekor diabaikan, jadi `http://localhost:3000` dan `http://localhost:3000/` adalah setara. CSV yang sama boleh ditetapkan pada masa jalan masuk **Papan Pemuka → Security → CORS Asal Dibenarkan** tanpa dimulakan semula.

## Kunci API vs sesi kuki

- **pembawa / `x-api-key` (yang `/v1/*` permukaan inferens):** pelayar tidak pernah melampirkan ini secara automatik. CORS bukanlah halangan yang bermakna di sini — yang API kunci adalah penghalang — itulah sebabnya permukaan itu sengaja permisif jadi pelayar dan Electron pelanggan boleh membaca jawapan yang mereka sudah berhak. Gema santai memerlukan subjek yang disahkan (a API kunci atau sesi papan pemuka), bukan hanya pengepala bukti kelayakan, dan tidak pernah termasuk `Access-Control-Allow-Credentials`. Jawapan tanpa nama (`REQUIRE_API_KEY=false`) gunakan senarai dibenarkan asal yang dikonfigurasikan, termasuk yang eksplisit `CORS_ALLOW_ALL=true` ikut serta. Penolakan pengesahan (401) kekal boleh dibaca supaya pelanggan boleh memaparkan kunci yang dibatalkan atau tersalah taip (#5242): saluran paip sendiri 401 mengekalkan gema, dan laluan yang menolak kunci itu sendiri selepas talian paip menyampaikannya sebagai tanpa nama (`/v1/models` dan `/v1beta/models` dengan pengesahan pengurusan dikonfigurasikan, skop pemilik `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` dan laluan calon kombo automatik) menambah gema pada 401 itu melalui `credentialRejectionHeaders()`. Gema dikunci pada permintaan yang membawa tajuk kelayakan (`Authorization`, `x-api-key`, `x-goog-api-key` atau yang `auth_token` kuki), bukan pada mana antara mereka laluan yang diperiksa, dan tidak pernah dipasangkan dengannya `Access-Control-Allow-Credentials`; badan adalah sampul ralat tetap. Laluan pengurusan di bawah `/api/v1/` dijaga oleh `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) jangan gunakan pengecualian-penolakan kelayakan ini: dengan `REQUIRE_API_KEY=false`, mereka 401/403 respons mengikut konfigurasi CORS dasar asal.
- **Sesi kuki (papan pemuka):** dilindungi oleh lalai gagal tertutup **dan** dengan ketiadaan `Access-Control-Allow-Credentials` pada laluan yang dikongsi. Jauhkan asal management/dashboard daripada sebarang konfigurasi permisif; mereka mesti kekal betul-betul tertutup.

## Jabat tangan WebSocket (`/v1/responses`, `/v1/ws`)

Penyemak imbas tidak menggunakan CORS pada WebSocket, jadi WebSocket mengangkut yang mengembalikan output inferens menyemak jabat tangan `Origin` itu sendiri (`src/server/origin/wsOrigin.ts`): Responses WebSocket (`/v1/responses`) dan, apabila OmniRoute berjalan melalui `npm start` / `npm run dev`, jambatan `/v1/ws` dan `/api/v1/ws`, yang mengalirkan `/v1/chat/completions`, `/v1/messages` dan `/v1/responses` sebagai bingkai. Jambatan itu meminta `/api/v1/ws?handshake=1` untuk membuat keputusan dan enggan menaik taraf melainkan laluan itu menjalankan semakan. Keperluan pengesahan masih digunakan secara berasingan. Cek asal lulus apabila:

- ia tidak mempunyai pengepala `Origin` (Codex CLI, SDKs dan pelanggan bukan pelayar lain);
- `Origin` diterima oleh senarai yang dibenarkan di atas (`CORS_ALLOWED_ORIGINS`, tetapan `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` ialah salah satu daripada asal awam OmniRoute sendiri ( URL pangkalan awam yang dikonfigurasikan , asal proksi yang dipercayai dimajukan, atau hos loopback/LAN langsung yang diberikan sebagai IP literal atau `localhost` — calon yang sama yang digunakan oleh semakan mutasi papan pemuka); atau
- ia membawa kunci API yang sah, seperti pada permukaan HTTP `/v1/*`.

Apa-apa lagi dapat `403 ws_origin_forbidden`. Kuki sesi papan pemuka tidak mengecualikan `Origin` asing , kerana penyemak imbas melampirkannya pada soket mana-mana halaman. `localhost` pada port lain tidak dianggap sebagai asal yang sama; tambahkan asal dev sedemikian pada `CORS_ALLOWED_ORIGINS`.

## Contoh: proksi terbalik di hadapan OmniRoute

CORS dikuatkuasakan oleh OmniRoute sendiri, jadi proksi secara amnya sepatutnya **bukan** tambah atau tulis semula pengepala `Access-Control-*` (pengepala ganda memecahkan pelayar). Tamatkan TLS dan ke hadapan — biarkan OmniRoute menjawab sebelum penerbangan:

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

Tetapkan asal pelayar yang dibenarkan dalam OmniRoute (`CORS_ALLOWED_ORIGINS` atau tab Keselamatan), bukan dalam proksi.

## Fail sumber

| Kebimbangan                                    | Fail                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolusi + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| Aplikasi middleware (sumber tunggal kebenaran) | `src/server/authz/pipeline.ts`                                       |
| Tetapan suntikan asal masa jalan →             | `src/lib/config/runtimeSettings.ts`                                  |
| Status masa jalan untuk papan pemuka           | `src/app/api/settings/authz-inventory/route.ts`                      |
| Sepanduk amaran papan pemuka                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Medan Asal Dibenarkan CORS                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent setiap laluan CORS (pengecualian)  | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket jabat tangan `Origin` semak          | `src/server/origin/wsOrigin.ts`                                      |

## Lihat juga

- Penguatkuasaan gelung balik [Peringkat Pengawal Laluan](./ROUTE_GUARD_TIERS.md) — untuk laluan berkemampuan bertelur (kawalan pelengkap yang berasingan).
- [Panduan Kebenaran](../architecture/AUTHZ_GUIDE.md) — saluran paip pengesahan penuh.
