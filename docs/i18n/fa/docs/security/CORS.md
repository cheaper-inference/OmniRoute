# CORS Configuration & Security (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute کنترل می کند که **ریشه های مرورگر** ممکن است پاسخ های متقاطع را از یک لیست مجاز متمرکز بخواند. مدل است **fail-closed به طور پیش فرض** : هیچ منبعی مجاز نیست تا زمانی که یکی را انتخاب کنید. این صفحه نحوه حل کردن لیست مجاز، آنچه را که `CORS_ALLOW_ALL=true` واقعاً افشا می کند (و مهمتر از همه، کارهایی که انجام می دهد را مستند می کند.**نه** ، نحوه پیکربندی ایمن برنامه نویس در مقابل تولید، و هشدار زمان اجرا داشبورد را نشان می دهد که یک وایلدکارد زنده است.

**منبع حقیقت:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`، `applyCorsHeaders`، `getCorsStatus`). لیست مجاز یک بار اعمال می شود، در میان افزار (`src/server/authz/pipeline.ts`) کنترل کننده های — در هر مسیر، خود `Access-Control-Allow-Origin` تنظیم نمی کنند.

## چگونه یک مبدا حل می شود

برای هر درخواست میان افزار مقدار `Access-Control-Allow-Origin` را به ترتیب زیر محاسبه می کند:

1. **`CORS_ALLOW_ALL=true`** (یا `CORS_ORIGIN=*` قدیمی) → بازتاب `Origin` تماس گیرنده (یا `*` زمانی که هدر `Origin` وجود ندارد)، با `Vary: Origin` به طوری که حافظه پنهان درست بماند. همان chokepoint `applyCorsHeaders()` همچنین `Vary: Accept-Encoding` به هر پاسخ 2xx-با بدنه روی سطح `/v1*`/`/v1beta*` تأیید شده توسط رمز اضافه میکند (`relaxForTokenAuth`, RFC 9110 §12.5.5، شماره #6737)، بنابراین حافظههای پنهان downstream/shared میتوانند به درستی انواع فشرده شده را از غیر فشرده تشخیص دهند.
2. در غیر این صورت، درخواست `Origin` نرمال می شود (حروف کوچک، اسلش انتهایی حذف می شود) و با **لیست مجاز ادغام شده** :
   - env **`CORS_ALLOWED_ORIGINS`** لیست — جدا شده با کاما و
   - زمان اجرا **`corsOrigins`** تنظیمات (داشبورد → Security → _CORS Allowed Origins_)، تزریق شده از طریق `setRuntimeAllowedOrigins()` از `src/lib/config/runtimeSettings.ts`.
3. هیچ مسابقه ای → وجود ندارد **هیچ هدر `Access-Control-Allow-Origin` منتشر نمی شود** . مرورگر خواندن منبع متقاطع را مسدود می کند. این پیشفرض بسته شده با شکست در نظر گرفته شده است.

| Env var                | معنی                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV از منشأ دقیق مجاز است (توصیه می شود).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → هر منبعی را بازتاب می دهد (عام). فقط توسعه دهنده.                           |
| `CORS_ORIGIN`          | میراث. `*` مانند `CORS_ALLOW_ALL` رفتار می کند. یک مقدار واحد به لیست مجاز اضافه می شود. |

## مدل تهدید — چیزی که `CORS_ALLOW_ALL=true` واقعاً افشا می کند

هشدار عمومی OWASP ("با حروف عام CORS = هر سایتی می تواند API شما را صدا بزند") ارزش جدی گرفتن دارد، اما قرار گرفتن در معرض OmniRoute**باریک تر از حالت عمومی** ، به دلیل یک واقعیت اجرایی مشخص:

> **`applyCorsHeaders()` مرکزی هرگز `Access-Control-Allow-Credentials` منتشر نمی کند.** یک مرورگر پاسخ متقاطع _credentialed_ (کوکیدار) را نشان نمیدهد مگر اینکه سرور `Access-Control-Allow-Credentials: true` را ارسال کند. مسیر CORS مشترک OmniRoute هرگز انجام نمی شود.

معنی آن در هر سطح، حتی با `CORS_ALLOW_ALL=true`:

| سطح                                  | مکانیزم احراز هویت     | اثر حروف عام CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| داشبورد / MANAGEMENT `/api/*`        | جلسه کوکی              | منشا تکرار می شود، اما **بدون `Allow-Credentials`** مرورگر **بلوک ها** اعتبار خوانده شده یک سایت مخرب متقاطع **نمی تواند بخواند** پاسخ های داشبورد تأیید شده شما، و کوکی جلسه در معرض نمایش قرار نمی گیرد.                                                                                                                                                                                                                                                                                  |
| مشتری API `/v1/*`، `/v1beta/*`       | هدر حامل / `x-api-key` | در حال حاضر مجاز است **با طراحی** (`relaxForTokenAuth`): مرورگرها هرگز `Authorization`/`x-api-key` را به صورت خودکار متصل نمیکنند، بنابراین صفحه مهاجم نمیتواند کلید شما را تامین کند. پژواک آرام به یک موضوع تأیید شده (یک کلید API یا جلسه داشبورد تأیید شده) نیاز دارد، نه فقط یک هدر اعتبار، و هرگز شامل `Access-Control-Allow-Credentials` نمی شود. پاسخهای ناشناس (`REQUIRE_API_KEY=false`) از فهرست مجاز مبدأ پیکربندیشده، از جمله انتخاب صریح `CORS_ALLOW_ALL=true` استفاده میکنند. |
| فقط خواندنی عمومی (`/api/health`، …) | هیچ کدام               | غیر حساس؛ wildcard بی ضرر است                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

بنابراین **باقی مانده** قرار گرفتن در معرض `CORS_ALLOW_ALL=true` به موارد زیر محدود می شود: (الف) منشاء متقاطع غیر معتبر **می خواند** داده هایی که قبلاً احراز هویت نشده اند، و (ب) اجازه دادن به CORS**پاس قبل از پرواز** در مسیرهای مدیریت — که هنوز به تأییدیه نیاز دارند که یک صفحه متقاطع نمی تواند ارائه دهد. هست **نه** یک جلسه ربودن یا بردار سرقت اعتبار در مسیر مشترک CORS.

### یک استثنا واقعی — `/api/v1/agents/`

مسیرهای Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) خود را تنظیم می کنند **خود** هدرهای CORS (`src/lib/cloudAgent/api.ts`، `getCloudAgentCorsHeaders`) و **انجام دهید** `Access-Control-Allow-Origin: <origin>|*` همراه با `Access-Control-Allow-Credentials: true` منتشر کنید. این سطح واحدی است که در آن منشاء-پژواک و اعتبار در کنار هم وجود دارند و همینطور است **مستقل از `CORS_ALLOW_ALL`** . این مسیرها دارای اعتبار مدیریتی هستند (`requireManagementAuth`). اپراتورهایی که داشبورد را خارج از میزبان نمایش می دهند باید بدانند که این جایی است که خواندن اعتبار متقاطع توسط سرصفحه های پاسخ مجاز است. سفت کردن آن به فهرست مجاز صریح به طور جداگانه از این راهنمای CORS ردیابی می شود.

## چک لیست تولید

- **هرگز `CORS_ALLOW_ALL=true` در تولید قرار ندهید.** تنظیم نشده رها کنید.
- یک را تنظیم کنید **صریح** لیست مبدا — یا env var یا قسمت Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- اگر OmniRoute پشت پراکسی / تونل معکوس اجرا شود (nginx، Caddy، Cloudflare Tunnel، Tailscale)، CORS است **نه** تنها کنترل شما — محافظ مسیر حلقه بک همچنان از مسیرهای دارای قابلیت تخم ریزی محافظت می کند (به [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) مراجعه کنید). `X-Forwarded-For: 127.0.0.1` برای "تعیین" 403 جعل نکنید. که دوباره کلاس RCE را باز می کند، محافظ مسیر بسته می شود.
- وضعیت زمان اجرا را تأیید کنید: داشبورد a را نشان می دهد **بنر کهربایی ماندگار** هر زمان که `CORS_ALLOW_ALL=true` فعال است، زیر داشبورد → Security → موجودی مجاز است، و `/api/settings/authz-inventory` پاکت `cors: { allowAll, allowedOrigins }` را برمیگرداند که ابزارهای نظارتی میتوانند نظرسنجی کنند.

## سهولت توسعه — اجازه منشاء محلی خاص را می دهد

شما به ندرت به علامت عام نیاز دارید حتی در توسعه. فقط به سرورهای توسعه دهنده ای که استفاده می کنید اجازه دهید:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

مبداها با حروف بزرگ مطابقت داده میشوند و اسلش انتهایی نادیده گرفته میشود، بنابراین `http://localhost:3000` و `http://localhost:3000/` معادل هستند. همان CSV می توان در زمان اجرا تنظیم کرد **داشبورد → Security → CORS Allowed Origins** بدون راه اندازی مجدد

## کلیدهای API در مقابل جلسات کوکی

- **حامل / `x-api-key` (سطح استنتاج `/v1/*` ):** مرورگرها هرگز اینها را به صورت خودکار متصل نمی کنند. CORS در اینجا یک مانع معنادار نیست — کلید API مانع — است، به همین دلیل است که آن سطح عمداً مجاز است بنابراین مرورگر و مشتریان Electron میتوانند پاسخهایی را که قبلاً حق دارند بخوانند. پژواک آرام نیاز به یک موضوع تأیید شده (یک کلید API یا جلسه داشبورد تأیید شده) دارد، نه فقط یک هدر اعتبار، و هرگز شامل `Access-Control-Allow-Credentials` نمی شود. پاسخهای ناشناس (`REQUIRE_API_KEY=false`) از فهرست مجاز مبدأ پیکربندی شده، از جمله انتخاب صریح `CORS_ALLOW_ALL=true` استفاده میکنند. Auth rejections (401) stay readable so clients can surface a revoked or mistyped key (#5242): the pipeline's own 401 keeps the echo, and a route that refuses the key itself after the pipeline served it as anonymous (`/v1/models` and `/v1beta/models` with management auth configured, the owner-scoped `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` and مسیرهای نامزد ترکیبی خودکار) اکو را از طریق `credentialRejectionHeaders()` به آن 401 اضافه می کند. پژواک روی درخواستی کلید میخورد که دارای هدر اعتبارنامه است (`Authorization`، `x-api-key`، `x-goog-api-key` یا کوکی `auth_token` )، نه در کدام یک از آنها مسیر بررسی شده است، و هرگز با `Access-Control-Allow-Credentials` جفت نمیشود. بدن یک پاکت خطا ثابت است. مسیرهای مدیریت تحت `/api/v1/` که توسط `requireManagementAuth()` محافظت میشوند (`/api/v1/management/*`، `/api/v1/registered-keys`، `/api/v1/providers/[provider]/limits`، `/api/v1/accounts/[id]/limits`، `/api/v1/issues/report`) از این استثنای رد اعتبار استفاده نمیکنند: با `REQUIRE_API_KEY=false`، پاسخهای 401/403 آنها از خطمشی مبدا CORS پیکربندیشده پیروی میکنند.
- **جلسه کوکی (داشبورد):** توسط پیشفرض fail-closed محافظت میشود **و** با عدم وجود `Access-Control-Allow-Credentials` در مسیر مشترک. ریشه های management/dashboard را از هر پیکربندی مجاز دور نگه دارید. آنها باید دقیقاً بسته بمانند.

## دست دادن WebSocket (`/v1/responses`، `/v1/ws`)

مرورگرها CORS روی WebSocket اعمال نمیکنند، بنابراین انتقالهای WebSocket که خروجی استنتاج را برمیگردانند، خود `Origin` دست دادن را بررسی میکنند (`src/server/origin/wsOrigin.ts`): پاسخها WebSocket (`/v1/responses`) و هنگامی که OmniRoute از طریق `npm start` / `npm run dev` میگذرد، پل `/v1/ws` و `/api/v1/ws` که `/v1/chat/completions`، `/v1/messages` و `/v1/responses` را بهصورت استریم پخش میکند. پل از `/api/v1/ws?handshake=1` حکم میخواهد و از ارتقاء خودداری میکند مگر اینکه آن مسیر بررسی را انجام دهد. الزامات احراز هویت همچنان جداگانه اعمال می شود. بررسی مبدا زمانی که:

- هدر `Origin` ندارد (Codex CLI، SDKs و سایر مشتریان غیر مرورگر).
- `Origin` توسط لیست مجاز بالا پذیرفته شده است (`CORS_ALLOWED_ORIGINS`، تنظیم `corsOrigins` ، `CORS_ORIGIN`، `CORS_ALLOW_ALL`).
- `Origin` یکی از مبداهای عمومی خود OmniRoute است (پایه عمومی پیکربندی شده URL، منشاء ارسال شده یک پروکسی مورد اعتماد، یا یک میزبان مستقیم loopback/LAN که به عنوان یک IP تحت اللفظی یا `localhost` — داده میشود، همان نامزدهایی که بررسی جهش داشبورد استفاده میکند). یا
- مانند سطح HTTP `/v1/*` دارای یک کلید معتبر API است.

هر چیز دیگری `403 ws_origin_forbidden` دریافت می کند. کوکی جلسه داشبورد یک `Origin` خارجی را مستثنی نمی کند، زیرا مرورگر آن را به سوکت هر صفحه متصل می کند. `localhost` در یک پورت دیگر به عنوان یک منبع تلقی نمی شود. چنین ریشه های توسعه دهنده را به `CORS_ALLOWED_ORIGINS` اضافه کنید.

## مثال: پراکسی معکوس در مقابل OmniRoute

CORS توسط خود OmniRoute اعمال می شود، بنابراین پروکسی معمولاً باید انجام شود **نه** هدرهای `Access-Control-*` را اضافه یا بازنویسی کنید (سربرگ های دوگانه مرورگرها را خراب می کنند). TLS خاتمه دهید و — را به جلو بفرستید OmniRoute اجازه دهید قبل از پرواز پاسخ دهد:

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

مبداهای مجاز مرورگر را در OmniRoute (`CORS_ALLOWED_ORIGINS` یا برگه امنیت) تنظیم کنید، نه در پروکسی.

## فایل های منبع

| نگرانی                               | فایل                                                                 |
| ------------------------------------ | -------------------------------------------------------------------- |
| وضوح لیست مجاز + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| برنامه میانافزار (تک منبع حقیقت)     | `src/server/authz/pipeline.ts`                                       |
| تنظیمات تزریق مبدا زمان اجرا →       | `src/lib/config/runtimeSettings.ts`                                  |
| وضعیت زمان اجرا برای داشبورد         | `src/app/api/settings/authz-inventory/route.ts`                      |
| بنر هشدار داشبورد                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| فیلد مبدا مجاز CORS                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent در هر مسیر CORS (استثنا) | `src/lib/cloudAgent/api.ts`                                          |
| دست دادن WebSocket چک `Origin`       | `src/server/origin/wsOrigin.ts`                                      |

## همچنین ببینید

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement برای مسیرهای دارای قابلیت تخم ریزی (یک کنترل جداگانه و مکمل).
- [راهنمای مجوز](../architecture/AUTHZ_GUIDE.md) — خط لوله auth کامل.
