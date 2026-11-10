# Authorization Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **منبع اصلی:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **آخرین بهروزرسانی:** 2026-09-22 — فضاهای نام دامنه به MCP-SERVER.md اشاره دارند

OmniRoute دارای یک خط لوله احراز هویت آگاه به مسیر است که هر درخواست API را کنترل میکند. طبقهبندی **قطعی** و **بستهدرصورتخطا** است — هر چیزی که قابل طبقهبندی نباشد به عنوان `MANAGEMENT` در نظر گرفته میشود و به یک نشست یا توکن با سطح دسترسی مدیریت نیاز دارد. این صفحه مدل را برای مهندسانی که مسیرها را نگهداری میکنند یا نقاط پایانی جدید طراحی میکنند، توضیح میدهد.

![خط لوله AuthZ (3 کلاس مسیر + ارزیابی سیاست)](../diagrams/exported/authz-pipeline.svg)

> منبع: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## دو حالت احراز هویت

### 1. کلید API (Bearer)

برای APIهای کلاینت سازگار با OpenAI/Anthropic/Gemini و چند مسیر مدیریتی، در صورتی که کلید دارای scope `manage` باشد، استفاده میشود.

```
Authorization: Bearer <api-key>
```

با `isValidApiKey()` / `extractApiKey()` در `src/sse/services/auth.ts` اعتبارسنجی میشود و از طریق `src/shared/utils/apiAuth.ts` دوباره export شده است. اعتبارسنج همچنین متغیرهای محیطی `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` را بهعنوان کلیدهای عبوری پایدار میپذیرد (issue #1350).

### 2. نشست داشبورد (کوکی auth_token)

برای صفحات داشبورد و عملیات مدیریتی.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

کوکی تنها زمانی یک نشست محسوب میشود که JWT معتبر باشد **و** مقدار `authenticated: true` را داشته باشد
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). هر
مصرفکنندهٔ کوکی (محافظ مسیر داشبورد (`isDashboardSessionAuthenticated()`)، نوسازی pipeline مجوزدهی، handshake وبسوکت، سرور زنده،
`/api/settings/require-login`، `/api/auth/status`) از همین helper عبور میکند.
JWTهای دیگری که با `JWT_SECRET` امضا شدهاند وجود دارند — عبوردهی CLI مربوط به Cursor برای دارندگان کلید، توکنهایی با
`iss "omniroute" / aud "cursor-cli"` صادر میکند — و هرگز نشست محسوب نمیشوند
(#13298).

با `isDashboardSessionAuthenticated()` در `src/shared/utils/apiAuth.ts` تأیید میشود. pipeline زمانی که از طول عمر ۳۰روزهٔ JWT کمتر از ۷ روز باقی مانده باشد، بهطور خودکار آن را نوسازی میکند.

یک نشست میتواند پیش از پایان ۳۰ روز خود نیز خاتمه یابد، زیرا هر صادرکنندهای از `mintDashboardSessionToken` عبور میکند (با زمان صدور `iat` و شناسهٔ `jti`) و اعتبارسنجیکننده دو تنظیم را بررسی میکند: `sessionsValidAfter` که با تغییر گذرواژه تنظیم میشود تا هیچ نشستی که پیش از آن صادر شده است دیگر اعتبارسنجی نشود (مروری که گذرواژه را تغییر داده است، یک کوکی تازه دریافت میکند)، و `revokedDashboardSessions` که `POST /api/auth/logout`، `jti` نشست خارجشده را به آن اضافه میکند. نشستهایی که توسط نسخهٔ قدیمیتری صادر شدهاند، هیچیک از این claimها را ندارند و تا اولین تغییر گذرواژه معتبر باقی میمانند. اگر تنظیمات قابل خواندن نباشند، نشست مورد اعتماد قرار نمیگیرد.

برخی مسیرهای مدیریتی **هر دو** حالت را میپذیرند: کوکی یا `Bearer <key>`، زمانی که کلید API دارای scope `manage` (یا `admin`) باشد. این قابلیت، روند کاری «قابل پیکربندی از طریق فراخوانیهای API» را که در v3.8 اضافه شد، ممکن میکند.

#### دروازهٔ ورود اختیاری OIDC (#6973)

ورود مدیر داشبورد علاوه بر ورود پیشفرض با گذرواژه، از یک جریان OIDC (OpenID Connect) **اختیاری** نیز پشتیبانی میکند —
ورود با گذرواژه هرگز حذف نمیشود و فقط با این قابلیت تکمیل میشود:

- غیرفعال است، مگر اینکه `settings.oidcEnabled === true` **و** هر سه مورد
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` پیکربندی شده باشند (تنظیمات → احراز هویت).
  در غیر این صورت، `GET /api/auth/oidc/login` مقدار `400` را برمیگرداند.
- `GET /api/auth/oidc/login`، `authorization_endpoint` را از
  `/.well-known/openid-configuration` صادرکننده کشف میکند (و در صورت شکست،
  از `<issuer>/authorize` استفاده میکند)، URI تغییر مسیر را از درخواست ورودی
  میسازد (با پشتیبانی از `x-forwarded-proto`) و با یک `state` تصادفی که در
  کوکی `httpOnly` با نام `oidc_state` ذخیره شده است، به IdP تغییر مسیر میدهد.
- `GET /api/auth/oidc/callback`، `state` را اعتبارسنجی میکند، کد مجوز را مبادله
  میکند و امضای توکن ID را از طریق JWKS صادرکننده بررسی میکند
  (`createRemoteJWKSet` از `jose`، با ذخیرهسازی کششده بر اساس URI مربوط به JWKS)
  و بررسیهای `issuer`/`audience` را انجام میدهد. پذیرش در داشبورد نیازمند
  یک فهرست غیرخالی `oidcAllowedSubjects`، یک سیاست `oidcAdmissionClaim`،
  یا هر دو است. فهرست موضوع فقط زمانی با `sub` یا `email` تطبیق داده میشود
  که `email_verified === true` باشد. سیاست اختیاری claim، یک مسیر claim در
  توکن ID که با نقطه جدا شده است (برای مثال، `realm_access.roles`) و یک آرایه
  از مقادیر پذیرفتهشده را میگیرد؛ claim resolveشده باید آرایهای از رشتهها
  باشد که حداقل یکی از مقادیر پذیرفتهشده را دربر داشته باشد. اگر هر دو سیاست
  پیکربندی شده باشند، هر دو باید موفق شوند. claimهای مفقود یا نادرست، بهصورت
  پیشفرض امن رد میشوند و بدون هیچیک از این سیاستها، callback ورود را رد
  میکند (`not_configured`). پیکربندیهای موجودِ فقط مبتنی بر subject بدون
  تغییر ادامه مییابند.
- Keycloak معمولاً نقشهای realm را در توکنهای access قرار میدهد، نه لزوماً
  در توکنهای ID. برای الزامی کردن نقش realm با نام `admin`، یک mapper پروتکل
  برای این client پیکربندی کنید که `realm_access.roles` را در **توکن ID** قرار
  دهد، سپس `oidcAdmissionClaim` را روی `{ "path": "realm_access.roles", "values": ["admin"] }`
  تنظیم کنید. پیش از فعالسازی پذیرش صرفاً مبتنی بر نقش، claim واقعی توکن ID
  این client را بررسی کنید؛ برنامه نقشهای توکن access را نمیخواند. رد کردن
  توکن از سمت IdP میتواند بررسی سمت برنامه را تکمیل کند، اما جایگزین آن نمیشود.
- در صورت موفقیت، دقیقاً همان JWT با نام `auth_token` و اعتبار ۳۰روزه را که ورود
  با گذرواژه صادر میکند (`src/app/api/auth/login/route.ts`) تولید میکند؛
  بنابراین باقی خط لوله نشست داشبورد (تازهسازی خودکار، پرچمهای کوکی) بدون
  تغییر باقی میماند — OIDC فقط روش تولید کوکی را جایگزین میکند، نه مجوزهایی
  را که کوکی اعطا میکند. تغییرات نقشها یا گروههای IdP، نشستهای موجود
  OmniRoute را بیاعتبار نمیکند؛ خروج، تغییر گذرواژه یا انقضای نشست همچنان
  طول عمر آنها را تعیین میکنند.
- هر تنظیم `oidc*` (`oidcEnabled`، `oidcDisablePasswordLogin`،
  `oidcIssuer`، `oidcClientId`، `oidcClientSecret`، `oidcAllowedSubjects`،
  `oidcAdmissionClaim`، `oidcRedirectPath`، `oidcScopes`) در
  `SECURITY_IMPACTING_SETTINGS_KEYS` قرار دارد
  (`src/shared/constants/securityImpactingSettings.ts`): درخواست
  `PATCH /api/settings` در صورتی `400 PASSWORD_REQUIRED` پاسخ میدهد که
  بدنه، گذرواژه مدیریتی را در قالب `currentPassword` نداشته باشد
  (`401 PASSWORD_MISMATCH` در صورت نادرست بودن آن). تنظیم
  `oidcDisablePasswordLogin` ورود با گذرواژه (`POST /api/auth/login`) را رد
  میکند، اما hash گذرواژه ذخیرهشده را حفظ میکند و احراز هویت مجدد همچنان
  `currentPassword` را در برابر آن بررسی میکند.
- `corsOrigins` و `bruteForceProtection` نیز در `SECURITY_IMPACTING_SETTINGS_KEYS`
  قرار دارند: کاهش محدودیت هرکدام، دفاعهای ورود را ضعیف میکند؛ بنابراین
  همان احراز هویت مجدد با `currentPassword` را لازم دارند (زبانه امنیت آن را
  درخواست میکند) و واردسازی JSON آنها را حذف میکند.
- هر کلید سیاست امنیتی — ورودیهای `SECURITY_IMPACTING_SETTINGS_KEYS`،
  تمام کلیدهای `oidc*` و وضعیت نشست داشبورد — در `PATCH /api/settings`
  **فقط مخصوص اپراتور** است: یک کلید API با scope مدیریت یا یک access token
  با پیشوند `oma_` حتی در صورت ارسال `currentPassword` صحیح، با `403` رد میشود
  و این رد شدن بهصورت `settings.update_failed` با
  `reason: OPERATOR_REQUIRED` ثبت میشود
  (`requireOperatorCredential()` در `src/lib/api/operatorCredential.ts`).
  تنظیمات عادی (پوسته، ترجیحات نمایش) همچنان برای یک کلید `manage` یا یک
  access token با سطح دسترسی `admin` قابل نوشتن هستند. هر تغییر در خود
  `/api/settings` (و نیز در `/api/settings/require-login`) به scope دسترسی
  `admin` برای access token نیاز دارد
  (`ADMIN_MUTATION_EXACT_PATHS` در `src/server/authz/accessScopes.ts`، با
  تطبیق دقیق مسیر)؛ `GET` همچنان `read` باقی میماند و سایر زیربرنامههای
  `/api/settings/*` (پروکسیها، پیشفرضهای ترکیبی، نامهای مستعار مدل،
  فشردهسازی، پاکسازیها و غیره) همچنان از scope `write` استنتاجشده بر اساس
  روش درخواست استفاده میکنند.
- `POST /api/settings/import-json` از احراز هویت مجدد صرفنظر میکند؛ بنابراین
  پیش از نوشتن، هر کلیدی را که در `IMPORT_STRIPPED_SETTINGS_KEYS` (در همان فایل)
  قرار دارد حذف میکند: گذرواژه و `currentPassword`، تمام ورودیهای
  `SECURITY_IMPACTING_SETTINGS_KEYS` و وضعیت نشست داشبورد
  (`sessionsValidAfter`، `revokedDashboardSessions`). بنابراین واردسازی یک
  نسخه پشتیبان قدیمی نمیتواند نشستی را که تغییر گذرواژه یا خروج از حساب
  پیشتر پایان داده است، دوباره فعال کند.

#### ورود دومرحلهای TOTP اختیاری (#16619)

از مسیر تنظیمات → امنیت فعال میشود؛ تا زمانی که اپراتور آن را روشن نکند
غیرفعال است (`src/server/auth/dashboardMfa.ts`).

- **موارد تحت پوشش:** ورود با گذرواژه (`POST /api/auth/login`، که پس از آن به
  `POST /api/auth/mfa/verify` نیاز دارد) و `omniroute connect` (`POST /api/cli/connect`،
  که تبادل صرفاً با گذرواژه را رد میکند و کد را بهعنوان `totp` دریافت میکند).
- **موارد خارج از پوشش:** ورود با OIDC / SSO (`/api/auth/oidc/callback`) از TOTP
  OmniRoute درخواست نمیکند. این ورود به عامل دوم خودِ ارائهدهنده هویت متکی است؛
  بنابراین اگر OIDC فعال است، MFA را در IdP اجباری کنید.
- **بازیابی** (دستگاه گمشده، تمام کدهای بازیابی مصرفشده، یا عاملی که دیگر نمیتوان
  آن را تأیید کرد؛ برای مثال پس از تغییر `STORAGE_ENCRYPTION_KEY`):
  1. سرور را با `OMNIROUTE_DISABLE_MFA=true` مجدداً راهاندازی کنید.
  2. در خود میزبان (همتای loopback و `Host` مربوط به loopback، مانند
     `http://localhost:20128`)، با گذرواژه وارد شوید. عامل دوم فقط برای همان مبدأ
     نادیده گرفته میشود؛ هر مبدأ دیگر همچنان به کد نیاز دارد.
  3. در تنظیمات → امنیت → غیرفعالسازی، گذرواژه را وارد کنید و کد را خالی بگذارید. `POST /api/auth/mfa/disable` فقط زمانی که این متغیر تنظیم شده باشد و درخواست از میزبان آمده باشد، بدنهای بدون `code` را میپذیرد؛ این درخواست همچنان به نشست داشبورد و گذرواژه فعلی نیاز دارد و با `auth.mfa.disabled` و `secondFactor: "recovery_switch"` ثبت میشود.
  4. `OMNIROUTE_DISABLE_MFA` را unset کنید، سرور را مجدداً راهاندازی کنید و در صورت نیاز دوباره ثبتنام کنید.

## کلاس های مسیر

`src/server/authz/types.ts` سه طبقه را تعریف می کند. هر مسیری که نمی تواند به طور قطعی طبقه بندی شود به `MANAGEMENT` باز می گردد.

| کلاس         | توضیحات                                                                                                                                                         | احراز هویت مورد نیاز است                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `PUBLIC`     | مسیرهای صریح ایمن ورود به سیستم — ، خروج از سیستم، وضعیت، سلامت، بوت استرپ ورود.                                                                                | هیچ کدام                                                       |
| `CLIENT_API` | نقاط پایانی ارائه دهنده مدل — `/api/v1/*`، `/api/v1beta/*`، به علاوه نام مستعار `/v1/*`، `/v1beta/*`، `/chat/completions`، `/responses`، `/models`، `/codex/*`. | کلید حامل زمانی که پرچم ویژگی موثر `REQUIRE_API_KEY` فعال باشد |
| `MANAGEMENT` | صفحات داشبورد، تنظیمات، ارائه دهندگان، کلیدها، ادمین و نقاط پایانی تشخیصی.                                                                                      | نشست داشبورد OR Bearer با دامنه `manage`                       |

چند عمل `MANAGEMENT` هستند** فقط اپراتور** : یک کلید `manage` کافی نیست. صادر کردن اطلاعات کاربری ذخیره شده (`GET /api/settings/export-json`، `GET /api/db-backups/export`، `GET /api/db-backups/exportAll`)، بازیابی یک نسخه پشتیبان از روی دادههای زنده (`POST /api/db-backups/import` شامل `dryRun=true`، بازیابی `POST /api/db-backups` توسط id، `POST /api/settings/import-json`)، از بین بردن نقاط بازیابی (پاکسازی `DELETE /api/db-backups` ، و `PATCH /api/db-backups` زیرا حفظ آن باعث میشود که هرس خودکار پس از هر جلسه صفحه پشتیبانگیری یا نسخه پشتیبانگیری محلی CLI انجام شود. صدور یک نشانه همگام سازی (`POST /api/sync/tokens`) و برش رمز دسترسی `admin` CLI (`POST /api/cli/tokens`) به یک جلسه داشبورد یا موضوع محلی CLI در هر حالت ورود نیاز دارد. کلیدهای API با هر دامنه و نشانههای دسترسی `oma_` اعتبار اپراتور نیستند: هر زمان که نیاز باشد `403` دریافت میکنند. چک در `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) زندگی می کند. تغییر تنظیمات ورود به سیستم نیز فقط برای اپراتور است: `POST /api/settings/require-login` (رمز عبور مدیریت را تنظیم کنید / `requireLogin` را تغییر دهید) زمانی که رمز عبور وجود داشته باشد تنها آن اطلاعات را میپذیرد. — اولین پنجره راهاندازی (هنوز رمز عبور وجود ندارد) بدون تغییر — است و جلسه داشبورد باید `currentPassword` برای جایگزینی رمز عبور ارسال کند (`403` زمانی که رمز عبور اشتباه است یا ممیزی `settings.update_failed` است). CLI محلی و نمونهای با غیرفعال بودن ورود، مسیر بازیابی را حفظ میکنند و ممکن است بدون آن رمز عبور تعیین کنند، زیرا هر دو به میزبانی که دایرکتوری دادهها را دارد محدود میشوند.

## خط لوله

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

هدرهای داخلی قابل اعتماد (تعریف شده در `src/server/authz/headers.ts`) هستند** از درخواست های دریافتی حذف شده است** قبل از طبقه بندی، مشتریان — نمی توانند `x-omniroute-auth-*` برای جعل هویت یک موضوع از قبل پر کنند.

### قراردادهای سیاستی

هر کلاس مسیر یک خط مشی در `src/server/authz/policies/` دارد:

- **`publicPolicy`** (`policies/public.ts`) — همیشه `allow({ kind: "anonymous", id: "anonymous" })` را برمیگرداند.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — را استخراج میکند، از طریق `validateApiKey()` تأیید میکند. تنها زمانی که پرچم ویژگی موثر `REQUIRE_API_KEY` غیرفعال باشد، به ناشناس می رسد. پرچم مؤثر از طریق `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) حل میشود، بنابراین پرچمهای ویژگی داشبورد و متغیرهای محیطی به طور مداوم `/api/v1/*`، `/api/v1beta/*` و نامهای مستعار را کنترل میکنند. خرابی های حل کننده با شکست مواجه می شوند. به درخواستهای جلسه داشبورد در مسیرهای API مشتری (از جمله `/api/v1/models` که توسط کاتالوگ مدل داشبورد استفاده میشود) اجازه میدهد. هنگامی که Entra ID SSO فعال است، یک حامل که از نظر ساختاری یک توکن Entra است (سه بخش base64url، `RS*` alg، `kid`) توسط شاخه SSO مدیریت میشود.** قبل از** `validateApiKey()` و حکم آن نهایی است — هرگز به مسیر کلید API یا شاخه تنزل به ناشناس نمیافتد، بنابراین قطعی ارائهدهنده هویت نمیتواند به دسترسی باز تبدیل شود. کلیدهای ثابت API تحت تأثیر قرار نمی گیرند. [Entra ID SSO](../security/ENTRA_SSO.md) را ببینید.
- **`managementPolicy`** (`policies/management.ts`) — جلسه داشبورد، درخواستهای داخلی همگامسازی مدل (مطابق با `/api/providers/[name]/(sync-models|models)`) را میپذیرد، یا اگر `isAuthRequired()` false را برگرداند، بهطور کامل رد میشود. 403 (`AUTH_001`) را هنگامی که یک توکن حامل وجود دارد اما نامعتبر است، برمیگرداند، در غیر این صورت 401. همچنین ردیفهای محافظ مسیر (LOCAL_ONLY / ALWAYS_PROTECTED) را قبل از هر شعبه auth — اجرا میکند. [Route Guard Tiers را](../security/ROUTE_GUARD_TIERS.md) ببینید. مسیرهای LOCAL_ONLY در `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (امروز: `/api/mcp/`) ممکن است از غیر حلقه بک دسترسی داشته باشند زمانی که کلید حامل محدوده `manage` را حمل می کند. تمام مسیرهای LOCAL_ONLY دیگر بدون در نظر گرفتن دامنه، دارای حلقه بک سخت هستند.

یک سیاست موفق `AuthSubject` با `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` برمی گرداند. کنترلکنندههای پاییندست میتوانند آن را از طریق `assertAuth(request, "CLIENT_API")` در `src/server/authz/assertAuth.ts` به جای اجرای مجدد منطق احراز هویت بخوانند.

## فهرست مسیرهای عمومی

`src/shared/constants/publicApiRoutes.ts` فهرست مجاز صریح است:

لیست تقسیم شده است** شکل** و تقسیم باربر است (GHSA-74g9-q8f6-793h): یک پیشوند با `startsWith()` مطابقت دارد، بنابراین با هر مسیر مجاور که کاراکترهای اصلی خود را به اشتراک میگذارند نیز مطابقت دارد. `/api/usage/om-usage` به عنوان یک پیشوند، `/api/usage/om-usage<anything>` PUBLIC را علامت گذاری کرده است، و Next حل می کند که `/api/usage/[connectionId]` — یک handler بدون اعتبار خاص خود را حل می کند.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

مسیرهای فقط خواندنی عمومی هستند** فقط** برای روش های ایمن توجه: `classifyRoute()` `/api/v1/*` و `/api/v1beta/*` از PUBLIC fall-through — مستثنی میکند که همیشه `CLIENT_API` هستند، بنابراین خطمشی کلید حامل همچنان اعمال میشود.

## افزودن یک مسیر جدید

### الگوی 1 — نقطه پایانی عمومی API کلاینت (احراز هویت Bearer)

مسیرهای زیر `/api/v1/` و `/api/v1beta/` بهطور خودکار بهعنوان `CLIENT_API` طبقهبندی میشوند. میانافزار بررسی Bearer را اعمال میکند؛ کنترلگرهای مسیر نیازی به تکرار آن ندارند، اما در صورت نیاز میتوانند subject را بخوانند.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... منطق کنترلگر
}
```

### الگوی 2 — نقطه پایانی مدیریتی (نشست یا Bearer + manage)

از `requireManagementAuth()` در `src/lib/api/requireManagementAuth.ts` استفاده کنید:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... منطق کنترلگر
}
```

`requireManagementAuth()` در صورت موفقیت `null` و در صورت خطا یک `Response` از نوع JSON برمیگرداند:

- 401 `AUTH_001` "احراز هویت الزامی است" — هیچ اعتبارنامهای ارائه نشده است
- 403 — Bearer نامعتبر است **یا** Bearer وجود دارد، اما کلید فاقد محدوده `manage` / `admin` است

`hasManageScope(scopes)` برای `"manage"` یا `"admin"` مقدار true برمیگرداند.

### الگوی 3 — افزودن به فهرست مجاز عمومی

مجموعه را بر اساس شکل انتخاب کنید، نه بر اساس سهولت. یک مسیر تکی باید در `PUBLIC_API_ROUTES_EXACT` قرار گیرد (یا برای مسیرهای فقط-GET در `PUBLIC_READONLY_CORS_API_ROUTES`)؛ تنها یک زیردرخت واقعی باید در `PUBLIC_API_ROUTE_PREFIXES` قرار گیرد و **حتماً باید به `/` ختم شود**. قرار دادن یک مسیر تکی در فهرست پیشوندها، تمام مسیرهای مجاوری را که نویسههای ابتدایی یکسانی دارند نیز عمومی میکند — از جمله مسیرهای همخانواده با سگمنت پویا که بعداً اضافه میشوند (GHSA-74g9-q8f6-793h). تستهای واحد موجود در `tests/unit/public-api-routes.test.ts`، `tests/unit/authz/public-route-exact-match.test.ts` و `tests/unit/authz/classify.test.ts` را بهروزرسانی کنید.

## دامنهها

سه فضای نام. هر بررسیکننده فقط رشتههای خود را میخواند. مقایسه جانبی، شامل اینکه چرا `manage` برای `read:compression` در `scopeMatches` شکست میخورد و چرا یک توکن دسترسی `read` نمیتواند `PATCH /api/keys/{id}` را انجام دهد، در [سه فضای نام دامنه](../frameworks/MCP-SERVER.md#three-scope-namespaces) آمده است.

کلیدهای API یک آرایه `scopes` را حمل میکنند (که به صورت JSON در `api_keys.scopes` ذخیره میشود، به `src/lib/db/apiKeys.ts` مراجعه کنید).

### دامنه مدیریت

- `manage` / `admin` — `hasManageScope`. دسترسی Bearer به مسیرهای API مدیریت.
- `mcp:connect`، `self:usage`، `self:account-quota` و `policy:bypass-provider-quota` دامنههای افزودنی با تطابق دقیق هستند. آنها خارج از `MANAGEMENT_API_KEY_SCOPES` قرار دارند. `mcp:connect` فقط بخش غیر-لوپبک `/api/mcp/` را باز میکند.

### دامنههای ابزار MCP

کاتالوگ و قوانین تطابق (رشته یکسان، یا دامنهای اعطا شده که به `*` ختم میشود): [دامنههای ابزار MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `MCP_SCOPE_LIST` در `src/shared/constants/mcpScopes.ts` زیرمجموعه تایپ شده اصلی است، نه آن کاتالوگ کامل. اعمال قوانین در `open-sse/mcp-server/scopeEnforcement.ts` پس از اینکه `resolveCallerScopeContext()` دامنهها را از اطلاعات احراز هویت MCP، فراداده درخواست، یا `OMNIROUTE_MCP_SCOPES` حل و فصل میکند، اجرا میشود. این قابلیت خاموش میماند مگر اینکه `OMNIROUTE_MCP_ENFORCE_SCOPES=true` باشد.

### دامنههای توکن دسترسی

`read` / `write` / `admin` بر روی توکنهای `oma_live_…`، رتبهبندی شده توسط `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`). این رتبه فقط برای اعتبارنامه توکن دسترسی اعمال میشود. به [احراز هویت مدیریت](../guides/MANAGEMENT-AUTH.md) مراجعه کنید.

## Auth Required Toggle

`isAuthRequired()` در `src/shared/utils/apiAuth.ts` تصمیم می گیرد که آیا** هر** auth برای یک درخواست اجرا می شود:

- `settings.requireLogin === false` → auth در سراسر جهان غیرفعال است، به جز ردیف همیشه محافظت شده (نگاه کنید به [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) و تماس هایی که اعتباری را که می پذیرد، ارائه می دهند، که به اعتباری مشابه با ورود به سیستم نیاز دارند: صدور نشانه های همگام سازی، برش توکن های دسترسی CLI در هر محدوده، و ایجاد یک API اعطای کلید `manage` `admin` کلید، یا بازسازی یا آشکار کردن چنین کلیدی (`requireCredentialForManagementScopedKey()` در `src/lib/api/requireManagementAuth.ts`). کلیدهای فقط استنتاج باز می مانند. نوشتن یک پرچم ویژگی محافظت شده (`REQUIRE_API_KEY`، سایر پرچمهای امنیتی، و پرچمهای SSRF / TLS / MCP-scope / sandbox فهرستشده در [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) و ذخیره تنظیمات پنهانسازی PII (`PUT /api/settings/pii`) همچنان به یک اعتبار نیاز دارد.
- هیچ رمز عبوری پیکربندی نشده است** و** حالت بوت استرپ `INITIAL_PASSWORD` env var → به جادوگر ورود و درخواستهای حلقه بک اجازه میدهد، اما درخواستهای شبکه در معرض هنوز به اعتبار نیاز دارند. استثنا: نوشتن یک پرچم ویژگی محافظت شده و ذخیره تنظیمات پوشش PII (`PUT /api/settings/pii`) نیاز به یک اعتبار حتی از Loopback دارد، بنابراین Loopback به خودی خود در آنجا کافی نیست.
- هر گونه خطای DB → با شکست مواجه می شود (ایمن به صورت پیش فرض).

اجرای کلید API کلاینت `isRequireApiKeyEnabled()` در `src/shared/utils/featureFlags.ts` استفاده می کند، نه از خواندن مستقیم `process.env.REQUIRE_API_KEY`. این برای نمونههای مستقر شده مهم است: جابهجایی `REQUIRE_API_KEY` در داشبورد → Feature Flags یک لغو DB ذخیره میکند و بلافاصله `/v1/*`، `/v1beta/*`، `/models`، `/responses`، `/chat/completions`، `/codex/*` و سایر بررسیهای تأیید اعتبار کلاینت-API که این کمککننده را به اشتراک میگذارند، تحت تأثیر قرار میدهد. اگر فروشگاه پرچم ویژگی قابل خواندن نباشد، کلاینت API auth بسته نمی شود و به یک کلید نیاز دارد.

## تغییر ناسازگار — v3.8.0

نقاط پایانی `/api/v1/agents/tasks/*` و `/api/resilience/model-cooldowns` **اکنون به احراز هویت مدیریتی نیاز دارند** (commit `588a0333`). کلاینتهایی که پیشتر یک کلید API عادی را بدون محدودهٔ `manage` ارسال میکردند، پاسخ `403` دریافت میکنند. مهاجرت: یا از طریق داشبورد API Keys محدودهٔ `manage` را به کلید اختصاص دهید، یا از یک نشست واردشده در داشبورد استفاده کنید.

## تغییر رفتار — v3.8.2

`/api/mcp/*` (سرور راه دور MCP) همچنان بهصورت پیشفرض LOCAL_ONLY است، اما اکنون درخواستهای غیر-loopback را زمانی میپذیرد که هدر `Authorization: Bearer <api-key>` دارای محدودهٔ `manage` باشد. این استثنا برای هر مسیر بهطور صریح از طریق `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` در `src/server/authz/routeGuard.ts` کنترل میشود؛ پیشوند همسطح LOCAL_ONLY یعنی `/api/cli-tools/runtime/*` عمداً قابل دور زدن نیست، زیرا میتواند زیرفرایندهای دلخواه را اجرا کند. درخواستهای ناشناس به `/api/mcp/*` از مبدأ غیر-loopback همچنان پاسخ `403 LOCAL_ONLY` دریافت میکنند — حالت پیشفرض برای هر مسیر جدید LOCAL_ONLY همچنان الزام سختگیرانهٔ loopback است. به [سطوح محافظ مسیر](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) مراجعه کنید.

## آزمایش

- آزمونهای واحد: `tests/unit/authz/` — `classify.test.ts`، `pipeline.test.ts`، `client-api-policy.test.ts`، `management-policy.test.ts`، `public-policy.test.ts`.
- فهرست مجاز عمومی: `tests/unit/public-api-routes.test.ts`.
- اجرای متمرکز: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## اشکال زدایی

خط لوله همیشه پاسخ ها را با موارد زیر نشان می دهد:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

برای درخواستهای احراز هویت، سرصفحههای درخواست بالادستی (کنترلکننده) نیز شامل موارد زیر است:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

در صورت دور زدن میانافزار `assertAuth(req, expectedClass)` در هندلرهای — استفاده کنید. در صورت دور زدن میانافزار `AuthzAssertionError` با کد `AUTHZ_NOT_INITIALIZED` پرتاب میکند (مفید برای گرفتن رگرسیونهای پیکربندی در آزمایشها).

## همچنین ببینید

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — نشانگر احراز هویت برای هر نقطه پایانی
- [COMPLIANCE.md](../security/COMPLIANCE.md) — گزارش حسابرسی برای رویدادهای احراز هویت
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — سه فضای نام دامنه و کاتالوگ دامنه ابزار MCP
- منبع: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
