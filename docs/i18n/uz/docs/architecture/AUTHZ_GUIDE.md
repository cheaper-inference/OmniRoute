# Authorization Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Haqiqat manbai:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Oxirgi yangilangan sana:** 2026-09-22 — koʻlam nomfazo (scope namespaces) MCP-SERVER.md ga ishora qiladi

OmniRoute har bir API soʻrovini boshqaradigan marshrutni biluvchi avtorizatsiya quvuriga ega. Tasniflash **deterministik** va **fail-closed** (xato boʻlsa yopiladi) — tasniflanmaydigan har qanday narsa `MANAGEMENT` sifatida yakunlanadi va sessiya yoki boshqaruv darajasidagi token talab qiladi. Ushbu sahifa marshrutlarni saqlovchi yoki yangi yakuniy nuqtalarni loyihalashtiruvchi muhandislar uchun modelni tushuntiradi.

![AuthZ quvuri (3 ta marshrut sinfi + siyosatni baholash)](../diagrams/exported/authz-pipeline.svg)

> Manba: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Ikkita autentifikatsiya rejimi

### 1. API kaliti (Bearer)

OpenAI/Anthropic/Gemini bilan mos mijoz API’lari va kalitda `manage` doirasi bo‘lgan ayrim boshqaruv marshrutlari uchun ishlatiladi.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` dagi `isValidApiKey()` / `extractApiKey()` orqali tekshiriladi va `src/shared/utils/apiAuth.ts` orqali qayta eksport qilinadi. Validator, shuningdek, doimiy uzatish kalitlari sifatida `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` muhit o‘zgaruvchilarini ham qabul qiladi (issue #1350).

### 2. Dashboard sessiyasi (auth_token cookie)

Dashboard sahifalari va administrator amallari uchun.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie faqat JWT tekshiruvdan muvaffaqiyatli o‘tganda **va** `authenticated: true` qiymatiga ega bo‘lgandagina sessiya hisoblanadi
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookie’dan foydalanadigan har bir komponent (dashboard marshrut himoyasi (`isDashboardSessionAuthenticated()`), authz pipeline yangilanishi, WebSocket handshake’i, live server, `/api/settings/require-login`, `/api/auth/status`) ushbu yordamchi funksiya orqali ishlaydi.
`JWT_SECRET` bilan imzolangan boshqa JWT’lar ham mavjud — Cursor CLI passthrough kalit egalari uchun `iss "omniroute" / aud "cursor-cli"` tokenlarini yaratadi — va ular hech qachon sessiya hisoblanmaydi
(#13298).

`src/shared/utils/apiAuth.ts` dagi `isDashboardSessionAuthenticated()` orqali tekshiriladi. Pipeline 30 kunlik amal qilish muddatining tugashiga 7 kundan kam vaqt qolganda JWT’ni avtomatik yangilaydi.

Sessiya 30 kunlik muddati tugashidan oldin ham yakunlanishi mumkin, chunki har bir token yaratuvchi `mintDashboardSessionToken` orqali (`iat` va `jti` berilgan holda) ishlaydi va verifier ikkita sozlamani tekshiradi: parol o‘zgartirilganda o‘rnatiladigan `sessionsValidAfter` — shu vaqtgacha chiqarilgan barcha sessiyalar tekshiruvdan o‘tmaydi (parolni o‘zgartirgan brauzer yangi cookie oladi) — hamda tizimdan chiqilgan sessiyaning `jti` qiymatini `POST /api/auth/logout` qo‘shadigan `revokedDashboardSessions`. Eski versiyada yaratilgan sessiyalarda bu claim’larning ikkalasi ham bo‘lmaydi va ular birinchi parol o‘zgartirilishigacha amal qiladi. Sozlamalarni o‘qib bo‘lmasa, sessiyaga ishonilmaydi.

Ayrim boshqaruv marshrutlari **ikkala** rejimdan birini qabul qiladi: cookie yoki API kalitida `manage` (yoki `admin`) doirasi bo‘lganda `Bearer <key>`. Aynan shu v3.8 da qo‘shilgan “API chaqiruvlari orqali sozlanadi” ish jarayonini ta’minlaydi.

#### Ixtiyoriy OIDC kirish cheklovi (#6973)

Dashboard administrator kirishi standart parol orqali kirish bilan bir qatorda **ixtiyoriy ravishda yoqiladigan** OIDC (OpenID Connect) oqimini ham qo‘llab-quvvatlaydi — parol orqali kirish hech qachon olib tashlanmaydi, faqat
to‘ldiriladi:

- `settings.oidcEnabled === true` **va** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` sozlamalarining barchasi ko‘rsatilmaguncha o‘chirilgan
  (Settings → Auth). Aks holda `GET /api/auth/oidc/login` `400` qaytaradi.
- `GET /api/auth/oidc/login` issuer’ning `/.well-known/openid-configuration` manzilidan
  `authorization_endpoint` ni aniqlaydi (`<issuer>/authorize` manziliga qaytadi), kiruvchi
  so‘rovdan (`x-forwarded-proto` ni hisobga olgan holda) redirect URI yaratadi va tasodifiy
  `state` qiymatini `httpOnly` `oidc_state` cookie’sida saqlagan holda IdP’ga yo‘naltiradi.
- `GET /api/auth/oidc/callback` `state` ni tekshiradi, avtorizatsiya kodini almashtiradi va ID
  token imzosini issuer’ning JWKS’i orqali (`jose` ning `createRemoteJWKSet` funksiyasi,
  JWKS URI bo‘yicha keshlanadi), `issuer`/`audience` tekshiruvlari bilan tasdiqlaydi.
  Dashboard’ga kirish uchun bo‘sh bo‘lmagan `oidcAllowedSubjects` ro‘yxati, `oidcAdmissionClaim`
  siyosati yoki ikkalasi ham sozlangan bo‘lishi kerak. Subject ro‘yxati `sub` yoki `email` bilan
  faqat `email_verified === true` bo‘lganda mos keladi. Ixtiyoriy claim siyosati nuqtalar bilan
  ajratilgan ID-token claim yo‘lini (masalan, `realm_access.roles`) va qabul qilinadigan
  qiymatlar massivini oladi; aniqlangan claim qabul qilinadigan qiymatlardan kamida bittasini
  o‘z ichiga olgan satrlar massivi bo‘lishi kerak. Ikkala siyosat ham sozlangan bo‘lsa, ikkalasi
  ham muvaffaqiyatli o‘tishi kerak. Yetishmayotgan yoki noto‘g‘ri shakldagi claim’lar xavfsiz
  tarzda rad etiladi, ikkala siyosat ham bo‘lmasa callback login’ni rad etadi
  (`not_configured`). Faqat subject asosidagi mavjud sozlamalar o‘zgarishsiz ishlashda davom etadi.
- Keycloak odatda realm rollarini ID token’lariga emas, access token’lariga joylaydi. `admin`
  realm rolini talab qilish uchun ushbu client uchun `realm_access.roles` ni uning **ID token** iga
  qo‘shadigan protokol mapper’ini sozlang, so‘ng `oidcAdmissionClaim` ni
  `{ "path": "realm_access.roles", "values": ["admin"] }` ga o‘rnating. Faqat rol asosidagi
  kirishni yoqishdan oldin ushbu client uchun haqiqiy ID-token claim’ini tekshiring; ilova
  access-token rollarini o‘qimaydi. IdP tomonidagi tokenni rad etish ushbu ilova tomonidagi
  tekshiruvni to‘ldirishi mumkin, ammo uning o‘rnini bosa olmaydi.
- Muvaffaqiyatli yakunda u parol orqali login beradigan (`src/app/api/auth/login/route.ts`)
  **aynan o‘sha** 30 kunlik `auth_token` JWT’ni yaratadi, shuning uchun dashboard sessiyasining
  qolgan jarayoni (avtomatik yangilash, cookie bayroqlari) o‘zgarmaydi — OIDC faqat cookie qanday
  yaratilishini almashtiradi, u beradigan huquqlarni emas. IdP rollari/guruhlariga kiritilgan
  o‘zgarishlar mavjud OmniRoute sessiyalarini bekor qilmaydi; ularning amal qilish muddatini
  logout, parolni almashtirish yoki sessiya tugashi belgilaydi.
- Har bir `oidc*` sozlamasi (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  tarkibiga kiradi (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` body ichida boshqaruv paroli `currentPassword` sifatida yuborilmasa
  `400 PASSWORD_REQUIRED` javobini beradi (noto‘g‘ri bo‘lsa `401 PASSWORD_MISMATCH`).
  `oidcDisablePasswordLogin` parol orqali _login_ qilishni
  (`POST /api/auth/login`) rad etadi, ammo saqlangan parol xeshini qoldiradi va qayta
  autentifikatsiya hali ham `currentPassword` ni u bilan solishtiradi.
- `corsOrigins` va `bruteForceProtection` ham `SECURITY_IMPACTING_SETTINGS_KEYS` tarkibiga
  kiradi: ikkalasini yumshatish login himoyasini zaiflashtiradi, shuning uchun ular uchun ham
  xuddi shu `currentPassword` qayta autentifikatsiyasi talab qilinadi (Security yorlig‘i uni
  so‘raydi) va JSON import ularni tashlab yuboradi.
- Har bir xavfsizlik siyosati kaliti — `SECURITY_IMPACTING_SETTINGS_KEYS` dagi yozuvlar,
  barcha `oidc*` kalitlari va dashboard sessiyasi holati — `PATCH /api/settings` uchun
  **faqat operatorga tegishli**: manage doirasidagi API kaliti yoki `oma_` access token’i
  to‘g‘ri `currentPassword` yuborgan taqdirda ham `403` bilan rad etiladi, rad etish
  `settings.update_failed` hodisasi sifatida `reason: OPERATOR_REQUIRED` bilan audit qilinadi
  (`src/lib/api/operatorCredential.ts` dagi `requireOperatorCredential()`). Oddiy sozlamalar
  (mavzu, ekran ko‘rsatish parametrlari) `manage` kaliti yoki `admin` access token’i orqali
  o‘zgartirilishi mumkin. `/api/settings` ning har bir o‘zgarishi (va
  `/api/settings/require-login` ning o‘zgarishi) uchun ham `admin` access-token doirasi talab
  qilinadi (`src/server/authz/accessScopes.ts` dagi `ADMIN_MUTATION_EXACT_PATHS`, aniq yo‘l
  bo‘yicha moslashtirish); `GET` holatida `read` saqlanadi, boshqa `/api/settings/*`
  quyi yo‘llari (proksilar, combo standartlari, model taxalluslari, siqish, tozalashlar va
  boshqalar) esa metoddan aniqlanadigan `write` doirasidan foydalanishda davom etadi.
- `POST /api/settings/import-json` ushbu qayta autentifikatsiyani o‘tkazib yuboradi, shuning
  uchun yozishdan oldin `IMPORT_STRIPPED_SETTINGS_KEYS` dagi barcha kalitlarni (o‘sha faylda)
  tashlab yuboradi: parol va `currentPassword`, barcha `SECURITY_IMPACTING_SETTINGS_KEYS`
  yozuvlari hamda dashboard sessiyasi holati (`sessionsValidAfter`,
  `revokedDashboardSessions`). Shu sababli eski zaxira nusxasini import qilish parol
  o‘zgartirilishi yoki tizimdan chiqish orqali allaqachon tugatilgan sessiyani qayta tiklay
  olmaydi.

#### Ixtiyoriy TOTP ikki faktorli login (#16619)

Settings → Security bo‘limidan ro‘yxatdan o‘tkaziladi; operator uni yoqmaguncha o‘chirilgan
holatda bo‘ladi (`src/server/auth/dashboardMfa.ts`).

- **Nimalarni qamrab oladi:** parol orqali kirish (`POST /api/auth/login`, bu keyin
  `POST /api/auth/mfa/verify`ni talab qiladi) va `omniroute connect` (`POST /api/cli/connect`,
  bu faqat paroldan iborat almashinuvni rad etadi va kodni `totp` sifatida qabul qiladi).
- **Nimalarni qamrab olmaydi:** OIDC / SSO orqali kirish (`/api/auth/oidc/callback`)
  OmniRoute TOTP kodini soʻramaydi. U identifikatsiya provayderining oʻz ikkinchi
  faktoriga tayanadi, shuning uchun OIDC yoqilgan boʻlsa, MFAni IdPda majburiy qiling.
- **Qayta tiklash** (qurilma yoʻqolgan, tiklash kodlari qolmagan yoki faktor endi
  tasdiqlanmaydigan boʻlsa, masalan, `STORAGE_ENCRYPTION_KEY` oʻzgarganidan keyin):
  1. Serverni `OMNIROUTE_DISABLE_MFA=true` bilan qayta ishga tushiring.
  2. Hostning oʻzida (loopback peer va loopback `Host`, masalan,
     `http://localhost:20128`) parol bilan kiring. Ikkinchi faktor faqat shu origin
     uchun oʻtkazib yuboriladi; boshqa barcha originlar uchun kod hali ham talab qilinadi.
  3. Sozlamalar → Xavfsizlik → Oʻchirish boʻlimida parolni kiriting va kod maydonini
     boʻsh qoldiring. `POST /api/auth/mfa/disable` soʻrov hostdan kelgan va oʻzgaruvchi
     oʻrnatilgan paytdagina `code`siz body qabul qiladi; shuningdek, dashboard sessiyasi
     va joriy parolni talab qiladi hamda `auth.mfa.disabled` sifatida
     `secondFactor: "recovery_switch"` bilan audit qilinadi.
  4. `OMNIROUTE_DISABLE_MFA`ni bekor qiling, serverni qayta ishga tushiring va zarur
     boʻlsa, qaytadan roʻyxatdan oʻting.

## Marshrut sinflari

`src/server/authz/types.ts` uchta sinfni belgilaydi; deterministik tarzda tasniflanmaydigan har qanday marshrut `MANAGEMENT` ga tushadi.

| Sinf         | Tavsif                                                                                                                                                   | Talab qilinadigan autentifikatsiya                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `PUBLIC`     | Aniq xavfsiz marshrutlar — kirish, chiqish, holat, ishga tushirish, sog‘liq tekshiruvi va sozlashning dastlabki endpointlari.                            | Yo‘q                                                                       |
| `CLIENT_API` | Model xizmat endpointlari — `/api/v1/*`, `/api/v1beta/*` va taxalluslar: `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Samarali `REQUIRE_API_KEY` funksiya bayrog‘i yoqilgan bo‘lsa Bearer kaliti |
| `MANAGEMENT` | Boshqaruv paneli sahifalari, sozlamalar, provayderlar, kalitlar, ma’muriy va diagnostika endpointlari.                                                   | Boshqaruv paneli seansi YOKI `manage` doirali Bearer                       |

Ba’zi `MANAGEMENT` amallari **faqat operator** uchun: `manage` kaliti yetarli emas. Saqlangan hisob ma’lumotlarini eksport qilish (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), jonli ma’lumotlar ustiga zaxira nusxasini tiklash (`dryRun=true` bilan `POST /api/db-backups/import`, identifikator bo‘yicha tiklash `POST /api/db-backups` va `POST /api/settings/import-json`) hamda tiklash nuqtalarini yo‘q qilish (`DELETE /api/db-backups` tozalashi va `PATCH /api/db-backups`, chunki u saqlagan saqlash muddati har bir zaxiradan keyingi avtomatik tozalashni boshqaradi) boshqaruv paneli seansini, mahalliy CLI subyektini yoki kirish o‘chirilganligini talab qiladi. Sinxronizatsiya tokenini berish (`POST /api/sync/tokens`) va `admin` CLI kirish tokenini chiqarish (`POST /api/cli/tokens`) har qanday kirish rejimida boshqaruv paneli seansini yoki mahalliy CLI subyektini talab qiladi. Har qanday doirali API kalitlari va `oma_` kirish tokenlari operator hisob ma’lumotlari emas: kerak bo‘lganda ular `403` oladi. Tekshiruv `src/lib/api/operatorCredential.ts` da joylashgan (`resolveOperatorCredential()` / `requireOperatorCredential()`). Kirish sozlamalarini o‘zgartirish ham faqat operator uchun: parol mavjud bo‘lgandan keyin `POST /api/settings/require-login` (boshqaruv parolini o‘rnatish / `requireLogin` ni almashtirish) faqat shu hisob ma’lumotlarini qabul qiladi — birinchi o‘rnatish bootstrap oynasi (hali parol yo‘q bo‘lsa) o‘zgarmaydi — va boshqaruv paneli seansi parolni almashtirish uchun `currentPassword` yuborishi kerak (yo‘q yoki noto‘g‘ri bo‘lsa `403`, `settings.update_failed` sifatida auditga yoziladi). Mahalliy CLI va kirish o‘chirilgan nusxa tiklash yo‘lini saqlab qoladi va parolni unsiz ham o‘rnatishi mumkin, chunki ikkalasi ham ma’lumotlar katalogiga ega bo‘lgan xostga bog‘langan.

## Quvur liniyasi

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

Ishonchli ichki sarlavhalar ( `src/server/authz/headers.ts` da belgilangan).** kiruvchi so'rovlardan mahrum** tasniflashdan oldin — mijozlari sub'ektga taqlid qilish uchun `x-omniroute-auth-*` oldindan to'ldira olmaydi.

### Siyosiy shartnomalar

Har bir marshrut sinfida `src/server/authz/policies/` siyosati mavjud:

- **`publicPolicy`** (`policies/public.ts`) — har doim `allow({ kind: "anonymous", id: "anonymous" })` qaytaradi.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearerni chiqaradi, `validateApiKey()` orqali tasdiqlaydi. Faqat samarali `REQUIRE_API_KEY` funksiyasi bayrog'i o'chirilganda anonimga tushadi. Samarali bayroq `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) orqali hal qilinadi, shuning uchun asboblar paneli funksiyasi Bayroqlar va muhit oʻzgaruvchilari `/api/v1/*`, `/api/v1beta/*` va taxalluslarni doimiy ravishda boshqaradi; hal qiluvchi nosozliklar yopilmadi. Mijoz API marshrutlari boʻyicha asboblar paneli-sessiya soʻrovlariga ruxsat beradi (jumladan, asboblar paneli modellari katalogi tomonidan ishlatiladigan `/api/v1/models`). Entra ID SSO yoqilganda, tizimli ravishda Entra tokeni (uchta base64url segmenti, `RS*` alg, `kid`) bo‘lgan Tashuvchi SSO filiali tomonidan boshqariladi.** oldin** `validateApiKey()` va uning hukmi yakuniy — bo'lib, u hech qachon API-kalit yo'liga yoki degradatsiyadan anonimga o'tishga tushmaydi, shuning uchun identifikatsiya provayderining uzilishi ochiq kirishga aylanmaydi. Statik API kalitlari ta'sir qilmaydi. [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — asboblar paneli seansini, ichki model-sinxronizatsiya so‘rovlarini qabul qiladi ( `/api/providers/[name]/(sync-models|models)` ga mos keladi) yoki `isAuthRequired()` noto‘g‘ri qiymatini qaytarsa, butunlay o‘tkazib yuboradi. Bearer tokeni mavjud boʻlsa, lekin yaroqsiz boʻlsa, 403 (`AUTH_001`) ni qaytaradi, aks holda 401. Shuningdek, marshrutni qo'riqlash sathlarini (LOCAL_ONLY / ALWAYS_PROTECTED) har qanday [autentifikatsiya](../security/ROUTE_GUARD_TIERS.md) bo'limi — qarang. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (bugungi kunda: `/api/mcp/`) dagi LOCAL_ONLY yo'llariga Bearer kaliti `manage` skopini olib yurganida, orqaga qaytmagan holda kirish mumkin; boshqa barcha LOCAL_ONLY yo'llari qamrovdan qat'i nazar, qat'iy orqaga qaytish bo'lib qoladi.

Muvaffaqiyatli siyosat `AuthSubject` `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` bilan qaytaradi. Pastki oqim ishlovchilari autentifikatsiya mantiqini qayta ishga tushirish o'rniga `src/server/authz/assertAuth.ts` -da `assertAuth(request, "CLIENT_API")` orqali o'qishlari mumkin.

## Ochiq marshrutlar roʻyxati

`src/shared/constants/publicApiRoutes.ts` — ochiq foydalanishga ruxsat berilgan marshrutlarning aniq roʻyxati:

Roʻyxat **shakl** boʻyicha ajratilgan va bu ajratish juda muhim (GHSA-74g9-q8f6-793h): prefiks
`startsWith()` yordamida moslashtiriladi, shuning uchun u boshlangʻich belgilariga ega boʻlgan barcha qoʻshni yoʻllarga ham mos keladi.
`/api/usage/om-usage` prefiks sifatida belgilansa, `/api/usage/om-usage<anything>` PUBLIC boʻladi va Next uni
`/api/usage/[connectionId]` ga yoʻnaltiradi — oʻz autentifikatsiyasiga ega boʻlmagan handler.

```ts
// Haqiqiy quyi daraxtlar. Har bir yozuv MUST "/" bilan tugashi kerak (unit test orqali tekshiriladi).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify da CLIENT_API sifatida ko'rib chiqiladi, "no-auth public" sifatida emas
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Bitta marshrutlar, oxirida slash bo‘lishi yoki bo‘lmasligidan qat’i nazar, EXACTLY moslashtiriladi.
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP uchun loginning 2-bosqichi; MFA-kutilmoqda cookie-si kerak
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin imtiyozidan ham foydalanadigan, faqat o‘qish uchun mo‘ljallangan bitta marshrutlar.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS imtiyozisiz, faqat o‘qish uchun mo‘ljallangan bitta marshrut.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Faqat xavfsiz metodlar uchun o‘qish rejimidagi marshrutlar ochiq hisoblanadi. Eslatma: `classifyRoute()` PUBLIC fall-throughʼdan `/api/v1/*` va `/api/v1beta/*` ni chiqarib tashlaydi — ular har doim `CLIENT_API` hisoblanadi, shuning uchun Bearer-key siyosati baribir qoʻllanadi.

## Yangi marshrut qoʻshish

### 1-andoza — Ommaviy mijoz API endpointi (Bearer autentifikatsiyasi)

`/api/v1/` va `/api/v1beta/` ostidagi marshrutlar avtomatik ravishda `CLIENT_API` sifatida tasniflanadi. Oraliq dastur Bearer tekshiruvini majburiy qiladi; marshrut ishlov beruvchilari uni qayta bajarishi shart emas, ammo zarur boʻlsa subyektni oʻqishi mumkin.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ishlov beruvchi mantiqi
}
```

### 2-andoza — Boshqaruv endpointi (sessiya yoki Bearer + manage)

`src/lib/api/requireManagementAuth.ts` ichidagi `requireManagementAuth()` dan foydalaning:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ishlov beruvchi mantiqi
}
```

`requireManagementAuth()` muvaffaqiyatli boʻlsa `null`, aks holda JSON xatosi boʻlgan `Response` qaytaradi:

- 401 `AUTH_001` "Autentifikatsiya talab qilinadi" — umuman hisob maʼlumotlari yoʻq
- 403 — Bearer yaroqsiz **yoki** Bearer mavjud, ammo kalitda `manage` / `admin` doirasi yoʻq

`hasManageScope(scopes)` `"manage"` yoki `"admin"` uchun true qaytaradi.

### 3-andoza — Ommaviy ruxsat etilganlar roʻyxatiga qoʻshish

Toʻplamni qulaylikka qarab emas, shakliga qarab tanlang. Bitta marshrut `PUBLIC_API_ROUTES_EXACT` ga (yoki faqat GET uchun `PUBLIC_READONLY_CORS_API_ROUTES` ga) qoʻshiladi; faqat haqiqiy quyi daraxt `PUBLIC_API_ROUTE_PREFIXES` ga qoʻshiladi va u **`/` bilan tugashi shart**. Bitta marshrutni prefikslar roʻyxatiga kiritish uning boshlangʻich belgilariga ega barcha yondosh yoʻllarni, jumladan keyinchalik qoʻshilgan dinamik segmentli qardosh yoʻllarni ham ommaviy qiladi (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` va `tests/unit/authz/classify.test.ts` fayllaridagi birlik testlarini yangilang.

## Doiralar

Uchta nom maydoni. Har bir tekshiruvchi faqat o'zining satrlarini o'qiydi. Yonma-yon taqqoslash, jumladan, nima uchun `manage` `read:compression` uchun `scopeMatches`ni bajara olmasligi va nima uchun `read` kirish tokeni `PATCH /api/keys/{id}`ni bajara olmasligi [Uchta nom maydoni](../frameworks/MCP-SERVER.md#three-scope-namespaces)da keltirilgan.

API kalitlari `scopes` massivini o'z ichiga oladi (`api_keys.scopes`da JSON sifatida saqlanadi, qarang `src/lib/db/apiKeys.ts`).

### Boshqaruv doirasi

- `manage` / `admin` — `hasManageScope`. Boshqaruv API marshrutlariga tashuvchi orqali kirish.
- `mcp:connect`, `self:usage`, `self:account-quota` va `policy:bypass-provider-quota` qo'shimcha aniq mos keladigan doiralardir. Ular `MANAGEMENT_API_KEY_SCOPES`dan tashqarida joylashgan. `mcp:connect` faqat `/api/mcp/` non-loopback ajratmasini ochadi.

### MCP asbob doiralari

Katalog va mos kelish qoidalari (bir xil satr yoki `*` bilan tugaydigan berilgan doira): [MCP asbob doiralari](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `src/shared/constants/mcpScopes.ts`dagi `MCP_SCOPE_LIST` to'liq katalog emas, balki asl terilgan kichik to'plamdir. Ijro etish `open-sse/mcp-server/scopeEnforcement.ts`da `resolveCallerScopeContext()` MCP autentifikatsiya ma'lumotlari, so'rov metama'lumotlari yoki `OMNIROUTE_MCP_SCOPES`dan doiralarni hal qilgandan so'ng amalga oshiriladi. U `OMNIROUTE_MCP_ENFORCE_SCOPES=true` bo'lmaguncha o'chirilgan holatda qoladi.

### Kirish tokeni doiralari

`oma_live_…` tokenlarida `read` / `write` / `admin`, `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) bo'yicha tartiblangan. Bu daraja faqat kirish tokeni hisob ma'lumotlariga tegishli. Qarang [Boshqaruv autentifikatsiyasi](../guides/MANAGEMENT-AUTH.md).

## Autentifikatsiya talab qilinadigan kalit

`src/shared/utils/apiAuth.ts` dagi `isAuthRequired()` so‘rov uchun **istalgan** autentifikatsiya qo‘llanilishini aniqlaydi:

- `settings.requireLogin === false` → autentifikatsiya global o‘chirilgan, lekin doimo himoyalangan qatlam ([Marshrut himoyasi qatlamlari](../security/ROUTE_GUARD_TIERS.md)) va qabul qilinadigan hisob ma’lumotini beruvchi chaqiruvlar bundan mustasno. Ular kirish yoqilgan holatdagi bilan bir xil hisob ma’lumotini talab qiladi: sinxronizatsiya tokenlarini berish, istalgan doirada CLI kirish tokenlarini chiqarish va `manage`/`admin` doirali API kaliti yaratish, shu doirani kalitga berish yoki bunday kalitni qayta yaratish/ko‘rsatish (`src/lib/api/requireManagementAuth.ts` dagi `requireCredentialForManagementScopedKey()`). Inference uchun kalitlar ochiq qoladi.
- Boshqaruv paroli yo‘q **va** `INITIAL_PASSWORD` muhit o‘zgaruvchisi yo‘q → bootstrap rejimi: sozlash ustasi va loopback so‘rovlariga ruxsat beriladi, lekin tashqi tarmoq so‘rovlariga hali ham hisob ma’lumoti kerak.
- Istalgan ma’lumotlar bazasi xatosi → yopiq holatda muvaffaqiyatsiz tugaydi (xavfsiz standart).

Mijoz API kalitini majburlash `process.env.REQUIRE_API_KEY` ni to‘g‘ridan-to‘g‘ri o‘qish o‘rniga `src/shared/utils/featureFlags.ts` dagi `isRequireApiKeyEnabled()` dan foydalanadi. Bu joylashtirilgan nusxalar uchun muhim: Boshqaruv paneli → Funksiya bayroqlarida `REQUIRE_API_KEY` ni almashtirish DB ustidan bekor qilishni saqlaydi va `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` hamda shu yordamchidan foydalanadigan boshqa mijoz API autentifikatsiya tekshiruvlariga darhol ta’sir qiladi. Agar funksiya bayrog‘i ombori o‘qib bo‘lmasa, mijoz API autentifikatsiyasi yopiq holatda muvaffaqiyatsiz tugaydi va kalit talab qiladi.

## Moslikni buzuvchi oʻzgarish — v3.8.0

`/api/v1/agents/tasks/*` va `/api/resilience/model-cooldowns` endpointlari **endi boshqaruv autentifikatsiyasini talab qiladi** (`588a0333` kommiti). Avval `manage` qamrovisiz oddiy API kalitini yuborgan mijozlar `403` javobini oladi. Migratsiya: API Keys boshqaruv panelida kalitga `manage` qamrovini bering yoki tizimga kirilgan boshqaruv paneli seansidan foydalaning.

## Xatti-harakat oʻzgarishi — v3.8.2

`/api/mcp/*` (masofaviy MCP serveri) hali ham standart holatda LOCAL_ONLY, ammo `Authorization: Bearer <api-key>` sarlavhasida `manage` qamrovi mavjud boʻlsa, endi loopback boʻlmagan soʻrovlarni ham qabul qiladi. Ushbu istisno `src/server/authz/routeGuard.ts` ichidagi `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` orqali har bir yoʻl uchun alohida boshqariladi; yonma-yon joylashgan `/api/cli-tools/runtime/*` LOCAL_ONLY prefiksini ataylab chetlab oʻtib boʻlmaydi, chunki u ixtiyoriy quyi jarayonlarni ishga tushirishi mumkin. Loopback boʻlmagan manzildan `/api/mcp/*` ga yuborilgan anonim soʻrovlar `403 LOCAL_ONLY` javobini qaytarishda davom etadi — har qanday yangi LOCAL_ONLY yoʻli uchun standart holat qatʼiy loopback boʻlib qoladi. [Yoʻnalish himoyachisi darajalari](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) boʻlimiga qarang.

## Sinov

- Birlik sinovlari: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Ommaviy ruxsat berilganlar roʻyxati: `tests/unit/public-api-routes.test.ts`.
- Yoʻnaltirilgan ishga tushirish: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Nosozliklarni tuzatish

Quvur liniyasi har doim javoblarni quyidagicha belgilaydi:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentifikatsiya qilingan so'rovlar uchun yuqoridagi (ishlovchi tomoni) so'rov sarlavhalari quyidagilarni o'z ichiga oladi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Ishlovchilar ichida `assertAuth(req, expectedClass)` foydalaning — agar o'rta dastur chetlab o'tilgan bo'lsa, `AUTHZ_NOT_INITIALIZED` kodi bilan `AuthzAssertionError` chiqaradi (testlarda konfiguratsiya regressiyalarini aniqlash uchun foydali).

## Yana qarang

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — har bir yakuniy nuqta uchun avtorizatsiya belgisi
- [COMPLIANCE.md](../security/COMPLIANCE.md) — avtorizatsiya hodisalari uchun audit jurnali
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — uchta qamrov nomfazo va MCP asbob-qamrov katalogi
- Manba: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
