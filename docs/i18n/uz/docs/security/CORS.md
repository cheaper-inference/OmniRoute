# CORS Configuration & Security (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute qaysi birini nazorat qiladi **brauzerning kelib chiqishi** yagona, markazlashtirilgan ruxsat etilgan roʻyxatdagi oʻzaro kelib chiqish javoblarini oʻqishi mumkin. Modeli **sukut bo'yicha muvaffaqiyatsiz yopilgan** : tanlanmaguningizcha hech qanday manbaga ruxsat berilmaydi. Bu sahifa ruxsat etilgan roʻyxat qanday hal qilinishini, `CORS_ALLOW_ALL=true` aslida nimani koʻrsatishini (va, eng muhimi, u nima qilishini) hujjatlashtiradi.**emas** ), dev va ishlab chiqarishni qanday qilib xavfsiz tarzda sozlash va asboblar panelidagi ish vaqti haqida ogohlantirish joker belgi jonli ekanligini ko'rsatadi.

**Haqiqat manbai:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Ruxsat etilgan ro'yxat bir marta qo'llaniladi, o'rta dasturda (`src/server/authz/pipeline.ts`) — har bir marshrut ishlovchilari `Access-Control-Allow-Origin` o'zlari o'rnatmaydilar.

## Kelib chiqishi qanday hal qilinadi

Har bir so'rov uchun vositachi dastur `Access-Control-Allow-Origin` qiymatini quyidagi tartibda hisoblab chiqadi:

1. **`CORS_ALLOW_ALL=true`** (yoki eski `CORS_ORIGIN=*`) → qo'ng'iroq qiluvchining `Origin` (yoki `Origin` sarlavhasi bo'lmaganda `*` ) aks-sado qiladi, `Vary: Origin` bilan keshlar to'g'ri qoladi. Xuddi shu `applyCorsHeaders()` chok nuqtasi, shuningdek, token bilan tasdiqlangan `/v1*`/`/v1beta*` yuzasida (`relaxForTokenAuth`, RFC 9110 §12.5.5, #6737 nashri) har bir 2xx tana javobiga `Vary: Accept-Encoding` qo'shadi, shuning uchun downstream/shared keshlari siqilgan va siqilmagan variantlarni to'g'ri ajrata oladi.
2. Aks holda, `Origin` so'rovi normallashtiriladi (kichik harflar, so'nggi chiziqli chiziq olib tashlanadi) va so'rov bilan mos keladi.**merged allowlist** :
   - env **`CORS_ALLOWED_ORIGINS`** — vergul bilan ajratilgan ro'yxat va
   - the runtime **`corsOrigins`** sozlash (Dashboard → Security → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` dan `setRuntimeAllowedOrigins()` orqali kiritilgan.
3. No match →**no `Access-Control-Allow-Origin` header is emitted** . Brauzer o'zaro o'qishni bloklaydi. Bu mo'ljallangan muvaffaqiyatsiz yopiq sukut.

| Env var                | Ma'nosi                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Ruxsat berish uchun aniq kelib chiqishi CSV (tavsiya etiladi).                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → har qanday kelib chiqishini aks ettiradi (joker belgilar). Dev only.            |
| `CORS_ORIGIN`          | Legacy. `*` behaves like `CORS_ALLOW_ALL`; ruxsat etilgan ro'yxatga bitta qiymat qo'shiladi. |

## `CORS_ALLOW_ALL=true` haqiqatda fosh qiladigan tahdid modeli —

Umumiy OWASP ogohlantirishi (“ CORS = har qanday sayt sizning API qo'ng'iroq qilishi mumkin”) jiddiy qabul qilishga arziydi, ammo OmniRoute ta'siri **narrower than the generic case** , because of one concrete implementation fact:

> **The central `applyCorsHeaders()` never emits `Access-Control-Allow-Credentials`.** Agar server `Access-Control-Allow-Credentials: true` yubormasa, brauzer _credentialed_ (cookie-bearing) oʻzaro kelib chiqish javobini koʻrsatmaydi. OmniRoute's shared CORS path never does.

Bu har bir yuza uchun nimani anglatadi, hatto `CORS_ALLOW_ALL=true` bilan ham:

| Yuzaki                                              | Auth mechanism                     | CORS joker belgisining ta'siri                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boshqaruv paneli / MANAGEMENT `/api/*`              | Cookie seansi                      | Kelib chiqishi aks-sado beradi, lekin **without `Allow-Credentials`** brauzer **bloklar** tasdiqlangan o'qish. A malicious cross-origin site **o'qiy olmaydi** autentifikatsiya qilingan asboblar panelidagi javoblaringiz va seans cookie fayli oshkor etilmaydi.                                                                                                                                                                                                                                                                                                                                        |
| Mijoz API `/v1/*`, `/v1beta/*`                      | Tashuvchi / `x-api-key` sarlavhasi | Already permissive **by design** (`relaxForTokenAuth`): brauzerlar hech qachon `Authorization`/`x-api-key` ni avtomatik biriktirmaydi, shuning uchun tajovuzkorning sahifasi kalitingizni taqdim eta olmaydi. Bo'shashgan aks-sado faqat hisob ma'lumotlari sarlavhasini emas, balki autentifikatsiya qilingan mavzuni (tasdiqlangan API kaliti yoki asboblar paneli seansi) talab qiladi va hech qachon `Access-Control-Allow-Credentials` o'z ichiga olmaydi. Anonim javoblar (`REQUIRE_API_KEY=false`) sozlangan manbalar roʻyxatidan, jumladan, aniq `CORS_ALLOW_ALL=true` -ga kirishdan foydalanadi. |
| Faqat o'qish uchun mo'ljallangan (`/api/health`, …) | Yo'q                               | Sezuvchan bo'lmagan; joker belgisi zararsizdir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Shunday qilib **qoldiq** `CORS_ALLOW_ALL=true` ta'siri quyidagilar bilan cheklanadi: (a) hisob ma'lumotlari bo'lmagan o'zaro kelib chiqish **o'qiydi** autentifikatsiya qilinmagan ma'lumotlar va (b) CORS ruxsat berish **parvozdan oldingi talon** Hali ham oʻzaro kelib chiqish sahifasi taqdim eta olmaydigan autentifikatsiyani talab qiladigan — boshqaruv yoʻnalishlarida. Bu **emas** umumiy CORS yo'lidagi sessiyani o'g'irlash yoki hisob ma'lumotlarini o'g'irlash vektori.

### Bitta haqiqiy istisno — `/api/v1/agents/`

Cloud-Agent marshrutlari (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) o'zlarining **o'z** CORS sarlavhalari (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) va **qil** `Access-Control-Allow-Credentials: true` bilan birga `Access-Control-Allow-Origin: <origin>|*` chiqaradi. Bu kelib chiqish-echo va hisobga olish ma'lumotlari birga mavjud bo'lgan yagona sirt va shunday **`CORS_ALLOW_ALL` dan mustaqil** . Bu marshrutlar boshqaruv tomonidan autentifikatsiya qilingan (`requireManagementAuth`); Boshqaruv panelini xostdan tashqarida ochadigan operatorlar shuni bilishlari kerakki, bu javob sarlavhalari tomonidan o'zaro kelib chiqish ma'lumotlarini o'qishga ruxsat beriladi. Uni aniq ruxsat etilgan ro'yxatga olish ushbu CORS yo'riqnomasidan alohida kuzatiladi.

## Ishlab chiqarish nazorat ro'yxati

- **Hech qachon ishlab chiqarishda `CORS_ALLOW_ALL=true` o'rnatmang.** Sozlanmagan holda qoldiring.
- o'rnating **aniq** kelib chiqish ro'yxati — yoki env var yoki Security-tab maydoni:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Agar OmniRoute teskari proksi/tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale) ortida ishlasa, CORS**emas** Sizning yagona boshqaruvingiz — orqaga qaytish marshruti qo'riqchisi hali ham paydo bo'ladigan marshrutlarni himoya qiladi ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ga qarang). 403-ni "tuzatish" uchun `X-Forwarded-For: 127.0.0.1` soxtalashtirmang; marshrut qo'riqchisi yopadigan RCE sinfini qayta ochadi.
- Ish vaqti holatini tasdiqlang: asboblar panelida a ko'rsatilgan **doimiy amber banner** Dashboard → Security → avtorizatsiya inventarizatsiyasi ostida `CORS_ALLOW_ALL=true` har doim jonli bo'lganda va `/api/settings/authz-inventory` `cors: { allowAll, allowedOrigins }` konvertini kuzatish vositalarini so'rashi mumkin.

## Rivojlanish qulayligi — muayyan mahalliy kelib chiqishiga imkon beradi

Hatto dev-da ham joker belgilar kamdan-kam hollarda kerak bo'ladi. Faqat siz foydalanadigan ishlab chiqaruvchi serverlarga ruxsat bering:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Kelib chiqishi katta-kichik-kichik harflar bilan moslashtiriladi, orqadagi qiyshiq chiziq hisobga olinmaydi, shuning uchun `http://localhost:3000` va `http://localhost:3000/` ekvivalentdir. Xuddi shu CSV ish vaqtida o'rnatilishi mumkin **Boshqaruv paneli → Xavfsizlik → CORS ruxsat berilgan kelib chiqishi** qayta ishga tushirmasdan.

## API kalitlari va cookie seanslari

- **Tashuvchi / `x-api-key` ( `/v1/*` xulosasi yuzasi):** brauzerlar ularni hech qachon avtomatik ravishda biriktirmaydi. Bu erda CORS mazmunli to'siq emas — API kaliti — to'sig'idir, shuning uchun bu sirt qasddan ruxsat etilgan, shuning uchun brauzer va Electron mijozlari o'zlari olish huquqiga ega bo'lgan javoblarni o'qishlari mumkin. Bo'shashgan aks-sado nafaqat hisob ma'lumotlari sarlavhasini emas, balki autentifikatsiya qilingan mavzuni (tasdiqlangan API kaliti yoki asboblar paneli seansi) talab qiladi va hech qachon `Access-Control-Allow-Credentials` o'z ichiga olmaydi. Anonim javoblar (`REQUIRE_API_KEY=false`) sozlangan manbalar roʻyxatidan, jumladan, aniq `CORS_ALLOW_ALL=true` -ga kirishdan foydalanadi. Mijozlar bekor qilingan yoki notoʻgʻri kiritilgan kalitni (#5242) koʻrsatishi uchun autentifikatsiyani rad etishlar (401) oʻqilishi mumkin boʻlib qoladi: quvur liniyasining 401-raqami aks-sadoni saqlaydi va quvur liniyasi anonim sifatida xizmat qilgandan soʻng kalitni rad etuvchi marshrut (`/v1/models` va `/v1beta/models`, boshqaruv autentifikatsiyasi sozlangan, egasi tomonidan `/v1/files`, `/v1/batches` `/v1/media`, `/v1/session-leases` ) mavjud. nomzod marshrutlari) `credentialRejectionHeaders()` orqali o'sha 401 ga aks-sado qo'shadi. Echo qayd maʼlumotlari sarlavhasi (`Authorization`, `x-api-key`, `x-goog-api-key` yoki `auth_token` cookie-fayllari) boʻlgan soʻrovga kiritiladi, ularning qaysi birida marshrut tekshirilmaydi va hech qachon `Access-Control-Allow-Credentials` bilan bogʻlanmaydi; tanasi qattiq xato konvertidir. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) tomonidan qoʻriqlanadigan `/api/v1/` ostida boshqaruv marshrutlari ushbu hisobga olish maʼlumotlarini rad etish istisnosidan foydalanmaydi: `REQUIRE_API_KEY=false` bilan ularning 401/403 javoblari konfiguratsiya qilingan CORS manba siyosatiga amal qiladi.
- **Cookie seansi (boshqaruv paneli):** muvaffaqiyatsiz yopilgan sukut bilan himoyalangan **va** umumiy yo'lda `Access-Control-Allow-Credentials` yo'qligi bilan. management/dashboard manbalarini har qanday ruxsat beruvchi konfiguratsiyadan uzoqroq tuting; ular to'liq yopiq qolishi kerak.

## WebSocket qoʻl siqish (`/v1/responses`, `/v1/ws`)

Brauzerlar CORS WebSocket ga qo‘llamaydi, shuning uchun xulosa chiqarishni qaytaruvchi WebSocket transportlari qo‘l siqish `Origin` o‘zlari tekshiradi (`src/server/origin/wsOrigin.ts`): Javoblar WebSocket (`/v1/responses`) va OmniRoute `npm start` / `npm run dev` dan o‘tganda `/v1/chat/completions`, `/v1/messages` va `/v1/responses` ni oqimlaydigan `/v1/ws` va `/api/v1/ws` ko‘prigi. Ko'prik `/api/v1/ws?handshake=1` hukmni so'raydi va agar bu yo'nalish tekshiruvdan o'tmasa, yangilanishni rad etadi. Autentifikatsiya talablari hali ham alohida qo'llaniladi. Kelib chiqishi tekshiruvi quyidagi hollarda o'tadi:

- unda `Origin` sarlavhasi yo'q (Codex CLI, SDKs va boshqa brauzer bo'lmagan mijozlar);
- `Origin` yuqoridagi ruxsat etilgan ro'yxat tomonidan qabul qilinadi (`CORS_ALLOWED_ORIGINS`, `corsOrigins` sozlamalari, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute ning umumiy manbalaridan biridir (konfiguratsiya qilingan umumiy URL bazasi, ishonchli proksi-serverning yuborilgan kelib chiqishi yoki IP literal yoki `localhost` — sifatida berilgan bevosita loopback/LAN xosti, asboblar paneli mutatsiyasini tekshirishda foydalanadigan nomzodlar); yoki
- u HTTP `/v1/*` yuzasida bo'lgani kabi joriy API kalitiga ega.

Boshqa har qanday narsa `403 ws_origin_forbidden` oladi. Boshqaruv paneli seansi cookie-fayllari xorijiy `Origin` ozod qilmaydi, chunki brauzer uni istalgan sahifaning rozetkasiga ulaydi. Boshqa portdagi `localhost` bir xil kelib chiqish deb hisoblanmaydi; `CORS_ALLOWED_ORIGINS` ga bunday dev kelib chiqishini qo'shing.

## Misol: OmniRoute oldida teskari proksi

CORS OmniRoute tomonidan amalga oshiriladi, shuning uchun proksi odatda kerak **emas** `Access-Control-*` sarlavhalarini qo'shing yoki qayta yozing (ikkita sarlavhalar brauzerlarni buzadi). TLS tugating va — yo'naltiring, OmniRoute oldindan parvozga javob bering:

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

Ruxsat etilgan brauzer manbalarini proksi-serverda emas, OmniRoute (`CORS_ALLOWED_ORIGINS` yoki Xavfsizlik yorlig'i) da o'rnating.

## Manba fayllar

| Xavotir                                           | Fayl                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Ruxsat berilganlar roʻyxati + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| O'rta dastur dasturi (haqiqatning yagona manbai)  | `src/server/authz/pipeline.ts`                                       |
| Sozlamalar → ish vaqti kelib chiqish injection    | `src/lib/config/runtimeSettings.ts`                                  |
| Boshqaruv paneli uchun ish vaqti holati           | `src/app/api/settings/authz-inventory/route.ts`                      |
| Boshqaruv panelidagi ogohlantirish banneri        | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS ruxsat berilgan manbalar maydoni             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Har bir marshrut uchun Cloud-Agent CORS (istisno) | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket qo'l siqish `Origin` tekshiruvi         | `src/server/origin/wsOrigin.ts`                                      |

## Shuningdek qarang

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — qo'llab-quvvatlanadigan marshrutlarni qayta tiklash (alohida, qo'shimcha nazorat).
- [Avtorizatsiya bo'yicha qo'llanma](../architecture/AUTHZ_GUIDE.md) — to'liq avtorizatsiya quvuri.
