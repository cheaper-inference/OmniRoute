# Authorization Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **منبع اصلی:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **آخرین بهروزرسانی:** 2026-09-22 — فضاهای نام دامنه به MCP-SERVER.md اشاره دارند

OmniRoute دارای یک خط لوله احراز هویت آگاه به مسیر است که هر درخواست API را کنترل میکند. طبقهبندی **قطعی** و **بستهدرصورتخطا** است — هر چیزی که قابل طبقهبندی نباشد به عنوان `MANAGEMENT` در نظر گرفته میشود و به یک نشست یا توکن با سطح دسترسی مدیریت نیاز دارد. این صفحه مدل را برای مهندسانی که مسیرها را نگهداری میکنند یا نقاط پایانی جدید طراحی میکنند، توضیح میدهد.

![خط لوله AuthZ (3 کلاس مسیر + ارزیابی سیاست)](../diagrams/exported/authz-pipeline.svg)

> منبع: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## دو حالت احراز هویت

### ۱. کلید API (Bearer)

برای API های سازگار با OpenAI/Anthropic/Gemini و چند مسیر مدیریتی استفاده می‌شود، وقتی که کلید دارای محدوده‌ی `manage` باشد.

```
Authorization: Bearer <api-key>
```

اعتبارسنجی توسط `isValidApiKey()` / `extractApiKey()` در `src/sse/services/auth.ts` انجام می‌شود و از طریق `src/shared/utils/apiAuth.ts` دوباره صادر می‌شود. اعتبارسنج متغیرهای محیطی `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` را هم به‌عنوان کلیدهای عبوری پایدار می‌پذیرد (issue #1350).

### ۲. نشست داشبورد (کوکی auth_token)

برای صفحات داشبورد و عملیات مدیریتی.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

کوکی وقتی نشست محسوب می‌شود که JWT تأیید شود **و** `authenticated: true` داشته باشد (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). هر مصرف‌کننده‌ی کوکی (گارد مسیر داشبورد (`isDashboardSessionAuthenticated()`)، تازه‌سازی خط پردازش مجوز، handshake وب‌سوکت، سرور زنده، `/api/settings/require-login`، `/api/auth/status`) از همین تابع کمکی عبور می‌کند. JWTهای دیگری که با `JWT_SECRET` امضا شده‌اند هم وجود دارند — عبور Cursor CLI برای دارندگان کلید توکن‌هایی با `iss "omniroute" / aud "cursor-cli"` صادر می‌کند — و هرگز نشست نیستند (#13298).

تأیید با `isDashboardSessionAuthenticated()` در `src/shared/utils/apiAuth.ts` انجام می‌شود. خط پردازش وقتی JWT کمتر از ۷ روز از عمر ۳۰ روزه‌اش باقی مانده باشد، آن را به‌طور خودکار تازه می‌کند.

یک نشست ممکن است پیش از پایان ۳۰ روز هم خاتمه یابد، زیرا هر صادرکننده از `mintDashboardSessionToken` عبور می‌کند (زمان صدور `iat` و شناسه‌ی `jti`) و تأییدکننده دو تنظیم را بررسی می‌کند: `sessionsValidAfter` که با تغییر رمز عبور تنظیم می‌شود تا هر نشستی که پیش از آن صادر شده تأیید نشود (مرورگری که رمز را عوض کرده کوکی تازه می‌گیرد)، و `revokedDashboardSessions` که `POST /api/auth/logout` مقدار `jti` نشست خارج‌شده را به آن اضافه می‌کند. نشست‌هایی که توسط نسخه‌ی قدیمی‌تر ساخته شده‌اند هیچ‌کدام از این ادعاها را ندارند و تا اولین تغییر رمز عبور معتبر می‌مانند. اگر تنظیمات خوانده نشوند، نشست معتبر شمرده نمی‌شود.

برخی مسیرهای مدیریتی **هر یک از دو** حالت را می‌پذیرند: کوکی یا `Bearer <key>` وقتی که کلید API دارای محدوده‌ی `manage` (یا `admin`) باشد. همین امکان جریان کار «قابل پیکربندی از طریق فراخوانی API» را که در v3.8 اضافه شد فعال می‌کند.

#### دروازه‌ی اختیاری ورود OIDC (#6973)

ورود مدیر داشبورد، علاوه بر ورود پیش‌فرض با رمز عبور، یک جریان **اختیاری** OIDC (OpenID Connect) هم دارد — ورود با رمز عبور هرگز حذف نمی‌شود، فقط تکمیل می‌شود:

- غیرفعال است، مگر آن‌که `settings.oidcEnabled === true` **و** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` همگی پیکربندی شده باشند (تنظیمات → احراز هویت). `GET /api/auth/oidc/login` در غیر این صورت `400` برمی‌گرداند.
- `GET /api/auth/oidc/login` مقدار `authorization_endpoint` را از `/.well-known/openid-configuration` صادرکننده کشف می‌کند (در صورت نبود، به `<issuer>/authorize` بازمی‌گردد)، URI بازگشت را از درخواست ورودی می‌سازد (با توجه به `x-forwarded-proto`) و کاربر را با یک `state` تصادفی که در کوکی `httpOnly` با نام `oidc_state` ذخیره می‌شود به IdP هدایت می‌کند.
- `GET /api/auth/oidc/callback` مقدار `state` را اعتبارسنجی می‌کند، کد مجوز را مبادله می‌کند و امضای ID token را از طریق JWKS صادرکننده تأیید می‌کند (`createRemoteJWKSet` از `jose`، که برای هر URI مربوط به JWKS کش می‌شود) همراه با بررسی‌های `issuer`/`audience`. فهرست مجاز `oidcAllowedSubjects` الزامی است: با ادعای `sub` توکن یا ادعای `email` آن تطابق دارد — ادعای ایمیل تنها زمانی پذیرفته می‌شود که `email_verified === true` باشد، بنابراین ایمیل تأییدنشده در IdP هرگز نمی‌تواند از دروازه عبور کند — و اگر هیچ ورودی وجود نداشته باشد، callback هر ورود را رد می‌کند (`not_configured`).
- در صورت موفقیت، **دقیقاً همان** JWT ‏`auth_token` با اعتبار ۳۰ روزه را صادر می‌کند که ورود با رمز عبور صادر می‌کند (`src/app/api/auth/login/route.ts`)، بنابراین بقیه‌ی خط پردازش نشست داشبورد (تازه‌سازی خودکار، پرچم‌های کوکی) بدون تغییر می‌ماند — OIDC فقط نحوه‌ی صدور کوکی را جایگزین می‌کند، نه آنچه کوکی اعطا می‌کند.
- هر تنظیم `oidc*` (`oidcEnabled`، `oidcDisablePasswordLogin`، `oidcIssuer`، `oidcClientId`، `oidcClientSecret`، `oidcAllowedSubjects`، `oidcRedirectPath`، `oidcScopes`) در `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`) قرار دارد: `PATCH /api/settings` پاسخ `400 PASSWORD_REQUIRED` می‌دهد، مگر آن‌که بدنه رمز عبور مدیریت را به‌صورت `currentPassword` داشته باشد (`401 PASSWORD_MISMATCH` وقتی که نادرست باشد). `oidcDisablePasswordLogin` _ورود_ با رمز عبور (`POST /api/auth/login`) را رد می‌کند، اما هش ذخیره‌شده‌ی رمز عبور را نگه می‌دارد و احراز هویت مجدد همچنان `currentPassword` را با آن بررسی می‌کند.
- `corsOrigins` و `bruteForceProtection` هم در `SECURITY_IMPACTING_SETTINGS_KEYS` هستند: سست کردن هر کدام از آن‌ها دفاع‌های ورود را ضعیف می‌کند، بنابراین همان احراز هویت مجدد با `currentPassword` را می‌طلبند (زبانه‌ی امنیت آن را درخواست می‌کند) و واردکردن JSON آن‌ها را حذف می‌کند.
- هر کلید سیاست امنیتی — ورودی‌های `SECURITY_IMPACTING_SETTINGS_KEYS`، هر کلید `oidc*` و وضعیت نشست داشبورد — در `PATCH /api/settings` **فقط برای اپراتور** است: کلید API با محدوده‌ی `manage` یا توکن دسترسی `oma_` حتی وقتی `currentPassword` درست را بفرستد با `403` رد می‌شود، و این رد شدن به‌عنوان `settings.update_failed` با `reason: OPERATOR_REQUIRED` ثبت می‌شود (`requireOperatorCredential()` در `src/lib/api/operatorCredential.ts`). تنظیمات عادی (تم، ترجیحات نمایش) برای کلید `manage` یا توکن دسترسی `admin` همچنان قابل نوشتن هستند. هر تغییری در خود `/api/settings` (و در `/api/settings/require-login`) هم به محدوده‌ی توکن دسترسی `admin` نیاز دارد (`ADMIN_MUTATION_EXACT_PATHS` در `src/server/authz/accessScopes.ts`، تطابق دقیق مسیر)؛ `GET` همچنان `read` است و سایر زیرمسیرهای `/api/settings/*` (پروکسی‌ها، پیش‌فرض‌های ترکیب، نام‌های مستعار مدل، فشرده‌سازی، پاکسازی‌ها…) محدوده‌ی `write` استنتاج‌شده از متد را حفظ می‌کنند.
- `POST /api/settings/import-json` احراز هویت مجدد را دور می‌زند، بنابراین پیش از نوشتن، هر کلیدی در `IMPORT_STRIPPED_SETTINGS_KEYS` (همان فایل) را حذف می‌کند: رمز عبور و `currentPassword`، هر ورودی `SECURITY_IMPACTING_SETTINGS_KEYS` و وضعیت نشست داشبورد (`sessionsValidAfter`، `revokedDashboardSessions`). بنابراین وارد کردن یک نسخه‌ی پشتیبان قدیمی نمی‌تواند نشستی را که تغییر رمز عبور یا خروج از حساب پایان داده، دوباره زنده کند.

## کلاس‌های مسیر

`src/server/authz/types.ts` سه کلاس را تعریف می‌کند؛ هر مسیری که نتوان آن را به‌طور قطعی دسته‌بندی کرد، به `MANAGEMENT` بازمی‌گردد.

| کلاس         | توضیح                                                                                                                                                           | احراز هویت لازم است                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | مسیرهایی که صراحتاً امن هستند — ورود، خروج، وضعیت، راه‌اندازی اولیه، سلامت، آغاز به کار آنبوردینگ.                                                              | هیچ                                                             |
| `CLIENT_API` | نقاط پایانی ارائه‌ی مدل — `/api/v1/*`، `/api/v1beta/*`، به‌همراه نام‌های مستعار `/v1/*`، `/v1beta/*`، `/chat/completions`، `/responses`، `/models`، `/codex/*`. | کلید Bearer وقتی که پرچم ویژگی مؤثر `REQUIRE_API_KEY` فعال باشد |
| `MANAGEMENT` | صفحات داشبورد، تنظیمات، ارائه‌دهندگان، کلیدها، نقاط پایانی مدیریت و عیب‌یابی.                                                                                   | نشست داشبورد یا Bearer با محدوده‌ی `manage`                     |

چند اقدام `MANAGEMENT` **فقط برای اپراتور** هستند: داشتن کلید `manage` کافی نیست. خروجی گرفتن از اعتبارنامه‌های ذخیره‌شده (`GET /api/settings/export-json`، `GET /api/db-backups/export`، `GET /api/db-backups/exportAll`)، بازیابی یک نسخه‌ی پشتیبان روی داده‌های زنده (`POST /api/db-backups/import` از جمله با `dryRun=true`، `POST /api/db-backups` بازیابی بر اساس شناسه، `POST /api/settings/import-json`) و از بین بردن نقاط بازیابی (پاکسازی `DELETE /api/db-backups` و `PATCH /api/db-backups`، چون نگهداری‌ای که ذخیره می‌کند، هرس خودکار را پس از هر پشتیبان‌گیری هدایت می‌کند) به نشست داشبورد، هویت CLI محلی یا غیرفعال بودن ورود نیاز دارند. صدور توکن همگام‌سازی (`POST /api/sync/tokens`) و ساختن یک توکن دسترسی CLI با محدوده‌ی `admin` (`POST /api/cli/tokens`) در هر حالت ورود به نشست داشبورد یا هویت CLI محلی نیاز دارند. کلیدهای API با هر محدوده‌ای و توکن‌های دسترسی `oma_` اعتبارنامه‌ی اپراتور نیستند: هر وقت یکی از آن‌ها لازم باشد، `403` دریافت می‌کنند. بررسی در `src/lib/api/operatorCredential.ts` قرار دارد (`resolveOperatorCredential()` / `requireOperatorCredential()`). تغییر تنظیمات ورود هم فقط برای اپراتور است: `POST /api/settings/require-login` (تنظیم رمز عبور مدیریت / تغییر `requireLogin`) پس از وجود رمز عبور فقط آن اعتبارنامه‌ها را می‌پذیرد — پنجره‌ی راه‌اندازی اولیه‌ی اجرای نخست (هنوز رمز عبوری نیست) بدون تغییر می‌ماند — و نشست داشبورد برای جایگزینی رمز عبور باید `currentPassword` را بفرستد (`403` وقتی که نبود یا نادرست باشد، با ثبت به‌عنوان `settings.update_failed`). CLI محلی و نمونه‌ای که ورود در آن غیرفعال است مسیر بازیابی را حفظ می‌کنند و می‌توانند بدون آن رمز عبور تنظیم کنند، زیرا هر دو به میزبانی متصل‌اند که پوشه‌ی داده را در اختیار دارد.

## خط لوله

```
درخواست ورودی → src/proxy.ts
  → runAuthzPipeline() در src/server/authz/pipeline.ts
    1. حذف هدرهای داخلی مورداعتماد (x-omniroute-auth-*, x-omniroute-route-class)
    2. تولید شناسه درخواست و طبقهبندی مسیر از طریق classifyRoute()
    3. اگر pathname == "/" → هدایت به /dashboard
    4. اگر در حال تخلیه (خاموشسازی تدریجی) باشد و مسیر /api/* باشد → 503
    5. اگر درخواست غیر GET به /api/* باشد → بررسی محافظ checkBodySize()
    6. اگر OPTIONS باشد → پیشدرخواست CORS با وضعیت 204
    7. اگر options.enforce == false باشد → عبور مستقیم همراه با هدرهای کلاس مسیر
    8. در غیر این صورت: POLICIES[routeClass].evaluate(ctx)
       - مجاز  → درج x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - رد → خطای JSON همراه با correlation_id (صفحات داشبورد → 302 /login)
```

هدرهای داخلی مورداعتماد (تعریفشده در `src/server/authz/headers.ts`) پیش از طبقهبندی، **از درخواستهای ورودی حذف میشوند** — کلاینتها نمیتوانند برای جعل هویت یک موجودیت، `x-omniroute-auth-*` را از پیش مقداردهی کنند.

### قراردادهای سیاست

هر کلاس مسیر، یک سیاست در `src/server/authz/policies/` دارد:

- **`publicPolicy`** (`policies/public.ts`) — همیشه `allow({ kind: "anonymous", id: "anonymous" })` را برمیگرداند.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer را استخراج کرده و از طریق `validateApiKey()` اعتبارسنجی میکند. تنها زمانی به حالت ناشناس بازمیگردد که پرچم قابلیت مؤثر `REQUIRE_API_KEY` غیرفعال باشد. پرچم مؤثر از طریق `isRequireApiKeyEnabled()` (`بازنویسی پرچم قابلیت پایگاه داده > process.env.REQUIRE_API_KEY > مقدار پیشفرض`) تعیین میشود تا پرچمهای قابلیت داشبورد و متغیرهای محیطی، `/api/v1/*`، `/api/v1beta/*` و نامهای مستعار را بهطور یکسان کنترل کنند؛ خطاهای تعیین مقدار باعث رد بسته درخواست میشوند. درخواستهای دارای نشست داشبورد را در مسیرهای API کلاینت مجاز میداند (از جمله `/api/v1/models` که کاتالوگ مدل داشبورد از آن استفاده میکند).
- **`managementPolicy`** (`policies/management.ts`) — نشست داشبورد یا درخواستهای داخلی همگامسازی مدل را میپذیرد (که با `/api/providers/[name]/(sync-models|models)` تطبیق داده میشوند)، یا اگر `isAuthRequired()` مقدار false برگرداند، بهطور کامل از بررسی صرفنظر میکند. اگر توکن Bearer وجود داشته باشد اما نامعتبر باشد، 403 (`AUTH_001`) و در غیر این صورت 401 برمیگرداند. همچنین پیش از هر شاخه احراز هویت، سطوح محافظ مسیر (LOCAL_ONLY / ALWAYS_PROTECTED) را اعمال میکند — به [سطوح محافظ مسیر](../security/ROUTE_GUARD_TIERS.md) مراجعه کنید. مسیرهای LOCAL_ONLY در `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (در حال حاضر: `/api/mcp/`) زمانی از نشانی غیر loopback قابلدسترسی هستند که کلید Bearer دارای حوزه دسترسی `manage` باشد؛ سایر مسیرهای LOCAL_ONLY، صرفنظر از حوزه دسترسی، همچنان بهطور سختگیرانه به loopback محدود میمانند.

یک سیاست موفق، `AuthSubject` را با `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` برمیگرداند. کنترلکنندههای پاییندستی میتوانند بهجای اجرای مجدد منطق احراز هویت، آن را از طریق `assertAuth(request, "CLIENT_API")` در `src/server/authz/assertAuth.ts` بخوانند.

## فهرست مسیرهای عمومی

`src/shared/constants/publicApiRoutes.ts` فهرست مجاز صریح است:

این فهرست بر اساس **شکل** تقسیم شده است و این تفکیک نقشی حیاتی دارد (GHSA-74g9-q8f6-793h): یک پیشوند با `startsWith()` تطبیق داده میشود، بنابراین هر مسیر مجاوری را که نویسههای ابتدایی یکسانی داشته باشد نیز تطبیق میدهد.
قرار دادن `/api/usage/om-usage` بهعنوان پیشوند، مسیر `/api/usage/om-usage<anything>` را PUBLIC میکرد و Next آن را به `/api/usage/[connectionId]` نگاشت میکند — کنترلگری که احراز هویت مستقلی ندارد.

```ts
// زیردرختهای واقعی. هر ورودی باید با "/" پایان یابد (این موضوع با یک تست واحد بررسی میشود).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // در classify بهعنوان CLIENT_API در نظر گرفته میشود، نه بهعنوان عمومیِ «بدون احراز هویت»
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// مسیرهای تکی که بهصورت دقیق تطبیق داده میشوند (با یا بدون اسلش انتهایی).
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

// مسیرهای تکیِ فقطخواندنی که تسهیل مبدأ CORS نیز برای آنها اعمال میشود.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// مسیر تکیِ فقطخواندنی بدون تسهیل CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

مسیرهای فقطخواندنی **فقط** برای متدهای امن عمومی هستند. توجه: `classifyRoute()` مسیرهای `/api/v1/*` و `/api/v1beta/*` را از حالت پیشفرض PUBLIC مستثنا میکند — این مسیرها همیشه `CLIENT_API` هستند تا سیاست کلید Bearer همچنان اعمال شود.

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

## تغییر وضعیت الزام احراز هویت

`isAuthRequired()` در `src/shared/utils/apiAuth.ts` تعیین می‌کند که آیا برای یک درخواست **هیچ** احراز هویتی اعمال شود:

- `settings.requireLogin === false` → احراز هویت به‌طور کلی غیرفعال است، به‌جز سطح همیشه‌محافظت‌شده (نگاه کنید به [سطوح محافظت مسیر](../security/ROUTE_GUARD_TIERS.md)) و فراخوانی‌هایی که اعتبارنامه‌ای تحویل می‌دهند که پذیرفته می‌شود و همان اعتباری را لازم دارند که با فعال بودن ورود لازم است: صدور توکن‌های همگام‌سازی، ساختن توکن‌های دسترسی CLI با هر محدوده‌ای، و ساختن کلید API با محدوده‌ی `manage`/`admin`، اعطای آن محدوده به یک کلید، یا بازتولید یا نمایش چنین کلیدی (`requireCredentialForManagementScopedKey()` در `src/lib/api/requireManagementAuth.ts`). کلیدهای فقط‌استنتاج باز می‌مانند.
- هیچ رمز عبوری پیکربندی نشده **و** متغیر محیطی `INITIAL_PASSWORD` وجود ندارد → حالت راه‌اندازی اولیه، ویزارد آنبوردینگ و درخواست‌های loopback را مجاز می‌کند، اما درخواست‌های شبکه‌ای در معرض دید همچنان به اعتبارنامه نیاز دارند.
- هر خطای پایگاه داده → بسته می‌ماند (امن به‌طور پیش‌فرض).

اعمال کلید API کلاینت از `isRequireApiKeyEnabled()` در `src/shared/utils/featureFlags.ts` استفاده می‌کند، نه خواندن مستقیم `process.env.REQUIRE_API_KEY`. این برای نمونه‌های مستقرشده اهمیت دارد: تغییر `REQUIRE_API_KEY` در داشبورد → پرچم‌های ویژگی، یک بازنویسی پایگاه داده ذخیره می‌کند و بلافاصله بر `/v1/*`، `/v1beta/*`، `/models`، `/responses`، `/chat/completions`، `/codex/*` و سایر بررسی‌های احراز هویت API کلاینت که از این تابع کمکی استفاده می‌کنند اثر می‌گذارد. اگر فروشگاه پرچم‌های ویژگی خوانده نشود، احراز هویت API کلاینت بسته می‌ماند و کلید لازم است.

## تغییر ناسازگار — v3.8.0

نقاط پایانی `/api/v1/agents/tasks/*` و `/api/resilience/model-cooldowns` **اکنون به احراز هویت مدیریتی نیاز دارند** (commit `588a0333`). کلاینتهایی که پیشتر یک کلید API عادی را بدون محدودهٔ `manage` ارسال میکردند، پاسخ `403` دریافت میکنند. مهاجرت: یا از طریق داشبورد API Keys محدودهٔ `manage` را به کلید اختصاص دهید، یا از یک نشست واردشده در داشبورد استفاده کنید.

## تغییر رفتار — v3.8.2

`/api/mcp/*` (سرور راه دور MCP) همچنان بهصورت پیشفرض LOCAL_ONLY است، اما اکنون درخواستهای غیر-loopback را زمانی میپذیرد که هدر `Authorization: Bearer <api-key>` دارای محدودهٔ `manage` باشد. این استثنا برای هر مسیر بهطور صریح از طریق `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` در `src/server/authz/routeGuard.ts` کنترل میشود؛ پیشوند همسطح LOCAL_ONLY یعنی `/api/cli-tools/runtime/*` عمداً قابل دور زدن نیست، زیرا میتواند زیرفرایندهای دلخواه را اجرا کند. درخواستهای ناشناس به `/api/mcp/*` از مبدأ غیر-loopback همچنان پاسخ `403 LOCAL_ONLY` دریافت میکنند — حالت پیشفرض برای هر مسیر جدید LOCAL_ONLY همچنان الزام سختگیرانهٔ loopback است. به [سطوح محافظ مسیر](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) مراجعه کنید.

## آزمایش

- آزمونهای واحد: `tests/unit/authz/` — `classify.test.ts`، `pipeline.test.ts`، `client-api-policy.test.ts`، `management-policy.test.ts`، `public-policy.test.ts`.
- فهرست مجاز عمومی: `tests/unit/public-api-routes.test.ts`.
- اجرای متمرکز: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## اشکالزدایی

پایپلاین همیشه پاسخها را با موارد زیر نشانهگذاری میکند:

```
x-request-id:               <شناسه همبستگی، تکرارشده در بدنه خطاها>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

برای درخواستهای احراز هویتشده، هدرهای درخواست بالادستی (سمت هندلر) نیز شامل موارد زیر هستند:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<چهار نویسه آخر> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (اختیاری)
x-omniroute-auth-scopes:    فهرست جداشده با ویرگول
```

درون هندلرها از `assertAuth(req, expectedClass)` استفاده کنید — اگر میانافزار دور زده شده باشد، این تابع خطای `AuthzAssertionError` را با کد `AUTHZ_NOT_INITIALIZED` ایجاد میکند (که برای شناسایی پسرفتهای پیکربندی در تستها مفید است).

## همچنین ببینید

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — نشانگر احراز هویت برای هر نقطه پایانی
- [COMPLIANCE.md](../security/COMPLIANCE.md) — گزارش حسابرسی برای رویدادهای احراز هویت
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — سه فضای نام دامنه و کاتالوگ دامنه ابزار MCP
- منبع: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
