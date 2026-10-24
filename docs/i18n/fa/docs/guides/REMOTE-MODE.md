# Remote Mode (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

CLIِ `omniroute` را روی لپتاپ خود اجرا کنید، درحالیکه خود OmniRoute در جایی دیگر اجرا میشود
(یک VPS، سرور خانگی یا دستگاهی دیگر در Tailnet شما). کافی است یکبار با
`omniroute connect` وارد شوید؛ از آن پس **تمام** فرمانهای CLI همان سرور راهدور
را هدف میگیرند — همان فرمانها و همان خروجی، فقط روی سرور راهدور اجرا میشوند.

نیازی به نصب ابزار دومی نیست: حالت راهدور همان CLI معمولی `omniroute`
بههمراه **توکنهای دسترسی** دارای دامنهٔ مجوز است.

```bash
npm install -g omniroute                 # CLI معمولی
omniroute connect 192.168.0.15           # ورود به سیستم (گذرواژه ← توکن دارای دامنهٔ مجوز)
omniroute models list                    # ← اکنون مدلهای سرور راهدور را فهرست میکند
omniroute configure codex                # ← یک پروفایل محلی Codex را از کاتالوگ راهدور مینویسد
```

---

## نحوهٔ کار

```
لپتاپ شما                               OmniRoute راهدور (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLIِ omniroute     │  POST /api/cli/connect  (گذرواژه ← توکن)           │
│  زمینه: vps        │ ───────────────►  │ یک توکن دسترسی دارای دامنه میسازد │
│  baseUrl، توکن     │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ هر مسیر مدیریتی، بررسی دامنهٔ  │
│ پیکربندیها را بهصورت │ ◄───────────────  │ مجوز براساس دامنهٔ توکن       │
│ محلی مینویسد      │                   └───────────────────────────────┘
└────────────────────┘
```

- **زمینهها** هرکدام اطلاعات یک سرور را ذخیره میکنند (`~/.omniroute/config.json`، `chmod 600`).
  دستور `omniroute contexts use <name>` سرور فعال را تغییر میدهد؛ `default` محلی است.
- **توکنهای دسترسی** (`oma_live_…`) به فرمانهای مدیریتی مجوز میدهند. آنها
  با کلیدهای API استنتاج (`sk-…` که برای `/v1/chat/completions` استفاده میشوند) متفاوتاند.
- فقط هش SHA-256 توکن در سمت سرور ذخیره میشود. متن سادهٔ آن فقط
  **یکبار**، هنگام ایجاد، نمایش داده میشود.

---

## اتصال

### با گذرواژهٔ مدیریتی (راهاندازی اولیه)

```bash
omniroute connect 192.168.0.15
# گذرواژهٔ مدیریتی برای http://192.168.0.15:20128: ********
# ✔ اتصال به http://192.168.0.15:20128 برقرار شد — زمینهٔ '192.168.0.15' (دامنهٔ مجوز: admin)
```

جریان مبتنی بر گذرواژه بهطور پیشفرض یک توکن **admin** ایجاد میکند (شما گذرواژه را در اختیار دارید، بنابراین
از قبل کنترل کامل دارید). با `--scope` دامنهٔ مجوز را محدود کنید:

```bash
omniroute connect 192.168.0.15 --scope write
```

گزینهها: `--port <p>` (وقتی میزبان فاقد پورت است)، `--name <ctx>` (نام زمینه)،
`--scope read|write|admin`. یک URL کامل بدون تغییر استفاده میشود:
`omniroute connect https://omni.example.com`.

### با یک توکن ازپیشتولیدشده

یک توکن دارای دامنهٔ مجوز را در داشبورد (یا با `omniroute tokens create`) ایجاد و
آن را جایگذاری کنید — نیازی به گذرواژه نیست:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI اعتبار آن را ازطریق `GET /api/cli/whoami` بررسی میکند و آن را بهعنوان زمینهٔ فعال ذخیره میکند.

---

## دامنههای مجوز

سه سطح بهصورت سلسلهمراتبی (`admin ⊃ write ⊃ read`):

| دامنهٔ مجوز | قابلیتها                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------- |
| `read`      | فهرستکردن/بررسی — `models list`، `providers status`، `logs`، `usage`، `cost`              |
| `write`     | خواندن **+** پیکربندی/اعمال — `setup-codex`، `keys add`، `config set`، ترکیبها            |
| `admin`     | نوشتن **+** مدیریت — عملیات CRUD روی `tokens`، افزودن ارائهدهندگان، سرویسها، خطمشی، oauth |

سرور دامنهٔ مجوز موردنیاز هر مسیر را از روی متد HTTP استنباط میکند
(`GET`←خواندن، تغییرات←نوشتن) و برای بخشهای حساس نیز از یک فهرست مجاز مدیریتی استفاده میکند
(تغییرات `/api/cli/tokens`، `/api/providers`، مسیرهای `/api/oauth`، `/api/services` و …).
توکنی با دامنهٔ مجوز ناکافی، پاسخ `403` همراه با پیامی واضح دریافت میکند.

> مسیرهایی که فرایند اجرا میکنند (`/api/services/*`، `/api/mcp/*` و …)
> **فقط به loopback محدود** میمانند — یک توکن راهدور، صرفنظر از دامنهٔ مجوز، هرگز نمیتواند به آنها دسترسی پیدا کند.

---

## اتصال Antigravity در نصب راه دور

Antigravity از صفحهٔ رضایت firstparty/nativeapp گوگل استفاده میکند. گوگل کد
مجوز را تنها زمانی صادر میکند که **تغییرمسیر loopback**
(`http://127.0.0.1:<port>/callback`) **از مرورگری که ورود را تأیید میکند قابل دسترسی
باشد**. در نصب روی VPS راه دور، آن loopback روی سرور قرار دارد، نه روی دستگاه شما؛
بنابراین صفحهٔ رضایت **برای همیشه معلق میماند و هیچگاه کدی صادر نمیکند** — در
راهکار جایگزین معمولِ «جایگذاری URL مربوط به callback» چیزی برای جایگذاری وجود
ندارد. (این محدودیتی از سمت گوگل است: همین وضعیت تعلیق در هر پراکسیای که از
کلاینت دسکتاپ همراه Antigravity استفاده کند رخ میدهد، نه فقط OmniRoute.)

داشبورد پیش از آنکه در این وضعیت گیر کنید، آن را تشخیص میدهد: باز کردن
**Providers → Antigravity → Connect** از نشانیای غیر از localhost، اعلان عمومی
«کپی کردن URL مربوط به callback» را با دو راهکار زیر جایگزین میکند که در هر یک،
میزبان و پورت شما از قبل درج شدهاند. (نشانی LAN نیز مشمول این وضعیت است —
تا آنجا که به این callback مربوط میشود، `192.168.x.x` یک localhost محسوب
نمیشود.)

برای اتصال Antigravity به یک OmniRoute راه دور، دو روش پشتیبانیشده وجود دارد.

### گزینهٔ A — ابزار کمکی ورود محلی (پیشنهادشده)

OAuth را روی **رایانهٔ خودتان** اجرا کنید؛ جایی که `127.0.0.1` قابل دسترسی است.
ابزار کمکی مستقیماً با گوگل ارتباط برقرار میکند، بنابراین فرایند رضایت در جایی
تکمیل میشود که نسخهٔ داشبورد قادر به تکمیل آن نیست.

**اگر از قبل متصل هستید** (`omniroute connect <host>`)، لازم نیست چیزی را کپی
کنید — ابزار کمکی اطلاعات اعتبارسنجی را برای شما به همان نصب تحویل میدهد:

```bash
# روی دستگاه محلی شما (به Node.js و یک مرورگر نیاز دارد):
omniroute connect 192.168.0.15        # یکبار — یک توکن زمینه با سطح دسترسی مدیر صادر میکند
npx omniroute login antigravity
#   ↳ صفحهٔ رضایت گوگل را باز میکند، callback را روی یک پورت loopback محلی دریافت میکند،
#     آن را مبادله میکند و اطلاعات اعتبارسنجی را با POST به زمینهٔ فعال میفرستد:
#
#   Antigravity روی http://192.168.0.15:20128 متصل شد (اتصال abc123).
#   چیزی برای جایگذاری وجود ندارد — میتوانید این ترمینال را ببندید.
```

هرگاه زمینهٔ فعال به دستگاه دیگری اشاره کند، ارسال بهطور خودکار انجام میشود.
با `--push` / `--no-push` میتوانید در هر جهت آن را اجبار کنید، یا با
`--context <name>` یک زمینهٔ مشخص را هدف بگیرید.

**اگر دستگاه شما نمیتواند به VPS دسترسی پیدا کند** (بهدلیل فایروال، نبود SSH یا
رایانهٔ کاملاً ایزوله)، ابزار کمکی همچنان کار میکند — تنها چیزی که واقعاً به آن
_نیاز_ دارد گوگل است. از `--no-push` استفاده کنید، یا صرفاً اجازه دهید ارسال شکست
بخورد: در این حالت، بهجای دور انداختن مجوزی که از قبل تکمیل کردهاید، به نمایش
blob بازمیگردد.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

سپس در داشبورد **راه دور**، به **Providers → Antigravity → Connect** بروید و
blob با قالب `omniroute-cred-v1.…` را در فیلد **Step 2** جایگذاری کنید (این فیلد
URL مربوط به callback یا blob اطلاعات اعتبارسنجی را میپذیرد). OmniRoute آن را
رمزگشایی میکند، فرایند راهاندازی Cloud Code را در سمت سرور اجرا میکند و اتصال
را بهصورت پایدار ذخیره میکند.

> این blob حاوی یک refresh token است — با آن مانند گذرواژه رفتار کنید. در روش
> ارسال، این داده یکبار از طریق اتصال احراز هویتشدهٔ زمینهٔ شما فرستاده میشود؛
> در روش جایگذاری نیز از طریق اتصال داشبورد شما ارسال میشود. در هر دو حالت،
> داده در محل ذخیرهسازی بهصورت رمزگذاریشده نگهداری میشود و ارسال موفقیتآمیز
> هرگز آن را در ترمینال شما نمایش نمیدهد.

فلگها: `--no-browser` (نمایش URL بهجای باز کردن خودکار)، `--port <n>`
(ثابت کردن پورت loopback)، `--timeout <ms>`، `--push` / `--no-push` (نادیده گرفتن
رفتار تحویل خودکار)، `--context <name>` (هدف گرفتن یک زمینهٔ مشخص).

### گزینهٔ B — تونل local-forward از طریق SSH

اگر به VPS دسترسی SSH دارید، پورت داشبورد را forward کنید تا callback مربوط به
loopback از طریق تونل دوباره به سرور برسد:

```bash
# روی دستگاه محلی شما:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# سپس http://localhost:20128 را در مرورگر محلی خود باز کنید و Antigravity را
# بهطور معمول متصل کنید — تغییرمسیر 127.0.0.1:20128/callback اکنون از طریق SSH به VPS میرسد.
```

از آنجا که از طریق `localhost:20128` به داشبورد دسترسی پیدا میکنید، فرایند رضایت
گوگل تکمیل میشود و callback از طریق همان تونل به سرور تحویل داده میشود — نیازی
به blob نیست. تونل را تا زمانی که اتصال بهصورت فعال نمایش داده شود باز نگه دارید.

برخلاف ارائهدهندگان با loopback ثابت که در ادامه آمدهاند، در اینجا **یک forward
کافی است**: callback مربوط به Antigravity از خود پورت داشبورد عبور میکند،
بنابراین پورت جداگانهٔ دیگری مختص ارائهدهنده برای تونل کردن وجود ندارد.

> یک راهکار جایگزین کاملاً headless (بدون ابزار کمکی و بدون تونل) این است که
> اطلاعات اعتبارسنجی Google OAuth **خودتان** را بههمراه یک URL پایهٔ عمومی
> پیکربندی کنید؛ متغیرهای محیطی OAuth ارائهدهنده را ببینید. دو گزینهٔ بالا به
> هیچ تنظیم اضافی در گوگل نیاز ندارند.

---

## اتصال Codex / Grok در نصب راهدور (ارائهدهندگان با loopback ثابت)

Codex،‏ xAI (`xai-oauth`) و Grok CLI (`grok-cli`) یک `redirect_uri` **ثابت** از نوع loopback را در برنامهٔ OAuth بالادستی خود ثبت میکنند. OmniRoute نمیتواند آن را تغییر دهد — ارائهدهنده همیشه مرورگر را به همان نشانی ثابت هدایت میکند:

| ارائهدهنده  | callback ثابتی که ارائهدهنده به آن هدایت میکند |
| ----------- | ---------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`          |
| `xai-oauth` | `http://127.0.0.1:56121/callback`              |
| `grok-cli`  | `http://127.0.0.1:56122/callback`              |

در اینجا `localhost` به معنای **دستگاهی است که مرورگر روی آن اجرا میشود**، درحالیکه سرور callback مربوط به PKCE در OmniRoute روی loopback **سرور** گوش میدهد. اگر داشبورد را با یک نشانی LAN مانند `http://192.168.0.15:20128` باز کنید، این دو هرگز به یکدیگر نمیرسند: کد مجوز به `localhost:1455` لپتاپ خودتان تحویل داده میشود؛ جایی که هیچ چیزی در حال گوشدادن نیست، و ورود به سیستم بدون نمایش هیچ خطایی از سوی ارائهدهنده شکست میخورد.

داشبورد پیش از بازکردن پنجرهٔ بازشو این وضعیت را تشخیص میدهد و بهجای اینکه ورود بیسروصدا شکست بخورد، فرمان tunnel را نمایش میدهد (#8046).

### راهحل — **هر دو** درگاه را forward کنید

```bash
# روی دستگاهی که مرورگر را اجرا میکند:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# سپس به http://localhost:20128 بروید و Codex را از آنجا متصل کنید
```

دو forward لازم است و forward کردن فقط یکی از آنها همچنان با شکست مواجه میشود:

- **`20128`** (درگاه داشبورد) باعث میشود origin واقعاً localhost باشد؛ همین موضوع باعث میشود OmniRoute اساساً سرور callback مربوط به PKCE را راهاندازی کند — یک origin از نوع LAN هرگز به آن شاخه نمیرسد.
- **`1455`** (درگاه callback ثابت ارائهدهنده) جایی است که مرورگر به آن بازگردانده میشود؛ این درگاه باید از طریق tunnel به loopback سرور متصل شود.

هنگام اتصال xAI یا Grok CLI،‏ `1455` را با `56121`/`56122` جایگزین کنید و بهجای `20128` درگاه واقعی داشبورد خود را قرار دهید. tunnel را تا زمانی که وضعیت اتصال فعال نمایش داده شود، باز نگه دارید.

> **به SSH دسترسی ندارید؟** Codex و Grok CLI امکان جایگذاری یک token را نیز فراهم میکنند — زبانهٔ **جایگذاری API Key** / **واردکردن auth.json** در پنجرهٔ اتصال. این مسیر callback از نوع loopback ندارد، بنابراین از هر origin کار میکند. Codex علاوهبراین یک access token ساده یا یک session blob از `~/.codex/auth.json` را نیز میپذیرد.

---

## مدیریت توکن‌ها

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ مقدار سری را یک بار چاپ می‌کند — همین حالا کپی‌اش کنید
omniroute tokens list                 # ماسک‌شده: شناسه، نام، محدوده، پیشوند، وضعیت، انقضا
omniroute tokens revoke <id|prefix>   # فوراً ابطال می‌کند
omniroute tokens scopes               # توضیح سه محدوده
```

دستورات `tokens` به یک اعتبارنامه‌ی **admin** نیاز دارند. همچنین می‌توانید توکن‌ها را در داشبورد زیر **تنظیمات → توکن‌های دسترسی** مدیریت کنید (ساختن، ابطال، کپی یک‌باره).

یک توکن هرگز نمی‌تواند با امتیازی بیشتر از امتیاز سازنده‌اش ساخته شود. یک توکن `admin` تنها توسط اپراتور قابل ساختن است — نشست داشبورد، CLI محلی روی خود سرور، یا `omniroute connect` با رمز عبور. اعتبارنامه‌های ماشینی (یک توکن دسترسی `admin`، یا یک کلید API با محدوده‌ی `manage`/`admin`) فقط می‌توانند توکن‌های `write` و `read` بسازند؛ درخواست `--scope admin` از آن‌ها `403` برمی‌گرداند. غیرفعال کردن ورود، ساختن توکن را باز نمی‌کند: یک توکن دسترسی با هر محدوده‌ای اعتباری است که مسیرهای همیشه‌احراز‌شده می‌پذیرند، بنابراین یک فراخوانی ناشناس در هر محدوده `401` دریافت می‌کند.

---

## پیکربندی یک CLI برنامه‌نویسی از کاتالوگ راه‌دور

`omniroute configure` کاتالوگ زندهٔ مدل‌های **سرور فعال** را می‌خواند و یک پیکربندی روی **دستگاه شما** می‌نویسد.

```bash
omniroute configure codex
#   ارائه‌دهندگان: glm, kmc, ollamacloud, opencode-go, …
#   ارائه‌دهنده: glm
#   شناسه‌ی مدل: glm/glm-5.2
#   ✔ نوشته شد ~/.codex/glm52.config.toml
#   استفاده: codex --profile glm52

# غیرتعاملی
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# یک مدل پرکاربرد را در بالای انتخابگر تعاملی نگه می‌دارد
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

انتخابگر فقط شناسه‌های مدل را (هرگز URL یا اعتبارنامه) در فایل محلی `model-preferences.json` نگه می‌دارد که به زمینه و هدف CLI محدود است. موارد مورد علاقه پیش از انتخاب‌های اخیر نمایش داده می‌شوند؛ از `--unfavorite` برای حذف یک مدل انتخاب‌شده از فهرست آن زمینه/هدف استفاده کنید.

پروفایل نوشته‌شده، کلید استنتاج را با متغیر محیطی (`OMNIROUTE_API_KEY`) ارجاع می‌دهد — رمز هرگز روی دیسک نوشته نمی‌شود. برای راه‌اندازی یک‌باره‌ی پایه‌ی Codex (بلوک `[model_providers.omniroute]`)، به [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) مراجعه کنید.

### اجرای یک CLI روی راه‌دور (بدون نوشتن پیکربندی)

`omniroute run <target>` نیز زمینه‌ی فعال را رعایت می‌کند: URL پایه‌ی راه‌دور و اعتبارنامه‌ی زمینه فقط به فرایند ایجادشده تزریق می‌شوند.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → راه‌دور
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# پیش‌نمایش دقیق آنچه اجرا می‌شود (فقط نام کلیدهای env، هرگز مقادیر):
omniroute run codex --dry-run --json
```

اهداف: `claude`، `codex`، `aider`، `goose`، `opencode`، `qwen`، `gemini` (منبع واحد: `bin/cli/cli-manifest.mjs`). Qwen و Gemini با یک خانه‌ی موقت و ایزوله اجرا می‌شوند که هنگام خروج حذف می‌شود، بنابراین اجرا هرگز به پیکربندی ابزار شخصی شما دست نمی‌زند یا به آن نشت نمی‌کند.

### دستورهای راه‌اندازی هر CLI

هر CLI پشتیبانی‌شده یک دستور راه‌اندازی آگاه از راه‌دور دارد (همه‌ی آن‌ها زمینه‌ی فعال را رعایت می‌کنند، یا `--remote <url> --api-key <key>`):

| CLI         | دستور                      | آنچه می‌نویسد                                                                                                                                                                             |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | پروفایل‌های `~/.codex/<name>.config.toml` (برای هر مدل)                                                                                                                                   |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (برای هر مدل)                                                                                                                                   |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ارائه‌دهنده‌ی سازگار با OpenAI به نام `omniroute` با هر مدل کاتالوگ (اجرا با `opencode -m omniroute/<model>`)                                        |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (حالت CLI) + چاپ تنظیمات افزونه‌ی VS Code برای چسباندن (سازگار با OpenAI، Base URL **بدون** `/v1`)                                             |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + تنظیمات VS Code با `kilocode.*` — سازگار با OpenAI، Base URL **با** `/v1`                                                                         |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI با `cn`) — `provider: openai`، `apiBase` **با** `/v1`، کلید از طریق `${{ secrets.OMNIROUTE_API_KEY }}`                                 |
| Cursor      | `omniroute setup-cursor`   | مراحل درون‌برنامه‌ای را چاپ می‌کند (Settings → Models → Override OpenAI Base URL **با** `/v1` + کلید + مدل). پیکربندی Cursor یک SQLite مبهم است — فقط پنل چت                              |
| Roo Code    | `omniroute setup-roo`      | یک JSON وارد‌سازی Roo (`~/.omniroute/roo-settings.json`) می‌نویسد + `roo-cline.autoImportSettingsPath` را تنظیم می‌کند + مراحل UI را چاپ می‌کند (سازگار با OpenAI، Base URL **با** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — ارائه‌دهنده‌ی `openai-compat`، `base_url` **با** `/v1`، کلید از طریق `$OMNIROUTE_API_KEY`                                                                  |
| Zed         | `omniroute setup-zed`      | `~/.config/zed/settings.json` — `language_models.openai_compatible.omniroute`، `api_url` **با** `/v1`، کلید توسط Zed از `$OMNIROUTE_API_KEY` خوانده می‌شود (هرگز نوشته نمی‌شود)           |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **بدون** `/v1` + `GOOSE_MODEL`) + دستورالعمل env                                                                   |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **بدون** `/v1` + `model: openai/<id>`) + دستورالعمل env (`aider --message --yes`)                                                                  |
| Qwen Code   | `omniroute setup-qwen`     | ورودی V4 `modelProviders.openai` در `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` در `~/.qwen/.env`                                                                                       |

```bash
# OpenCode (ارائه‌دهنده‌ی سازگار با OpenAI، همه‌ی مدل‌های کاتالوگ، VPS راه‌دور)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # فقط مدل‌های مطابق را نگه می‌دارد
opencode -m omniroute/glm/glm-5.2 "..."          # ابتدا OMNIROUTE_API_KEY را export کنید
```

> OpenCode همچنین یک یکپارچگی **افزونه** غنی‌تر دارد: `omniroute setup opencode`
> (اکنون با `--remote` نسبت به راه‌دور آگاه است) افزونه‌ی `@omniroute/opencode-plugin` را نصب می‌کند.
> `setup-opencode` جایگزین سبک و سازگار با OpenAI است. کلید API
> با `{env:OMNIROUTE_API_KEY}` ارجاع داده می‌شود — هرگز روی دیسک نوشته نمی‌شود.
>
> در OpenCode v2 به‌جای آن از `@omniroute/opencode-plugin-v2` استفاده کنید: همان کاتالوگ،
> با قرارداد بارگذاری متفاوت. وقتی یکپارچگی متصل باشد، کلید را از فروشگاه اعتبارنامه‌ی خود OpenCode می‌خواند، بنابراین یک gateway راه‌دور به کلیدی در `opencode.json` نیاز ندارد.

---

## مدیریت زمینهها (جابجایی بین سرورها)

یک **زمینه** (context) یک سرور ذخیره شده است (baseUrl + credential + scope). `omniroute connect`
یکی از آنها را ایجاد کرده و فعال میکند؛ از آن پس هر دستوری آن را هدف قرار میدهد. آنها را با `omniroute contexts` مدیریت و بینشان جابجا شوید:

```bash
omniroute contexts list            # all contexts; the active one is marked ●
omniroute contexts current         # the active server, auth status, scope
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**جابجایی سرورها** — هر دستور بعدی از زمینه فعال پیروی میکند:

```bash
omniroute contexts use vps         # → all commands now hit the remote VPS
omniroute tokens list              #   (runs against the VPS)

omniroute contexts use default     # → back to localhost
omniroute tokens list              #   (runs against the local server)
```

**افزودن یک زمینه به صورت دستی** (به جای `connect`)، بررسی، یا تغییر نام:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # full details for one context
omniroute contexts rename staging stg
```

**حذف یک زمینه** — درخواست تأیید میکند؛ برای رد شدن از آن، `--yes` را ارسال کنید
(برای اسکریپتها / شلهای غیرتعاملی که در غیر این صورت به طور ایمن رد میشوند، لازم است):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) قابل حذف نیست. حذف زمینه فعال به `default` بازمیگردد. نکته: حذف یک زمینه فقط اعتبارنامه ذخیره شده **محلی** را حذف میکند —
> برای از بین بردن واقعی دسترسی، توکن را در سرور با `omniroute tokens revoke <id>` لغو کنید.

**خروجی / ورودی گرفتن** از زمینهها (مثلاً برای انتقال آنها بین ماشینها). خروجیها به طور پیشفرض اعتبارنامهها را حذف میکنند، از جمله اعتبارنامههای ذخیره شده توسط فایل جایگزین.
هنگامی که یک پشتیبان قابل حمل حاوی اعتبارنامه مورد نیاز است، به صراحت از `--include-secrets` استفاده کنید:

```bash
omniroute contexts export --out contexts.json     # redacted; default destination: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # overwrite; --merge to keep existing
omniroute contexts migrate --yes                  # move legacy plaintext tokens to keychain
```

`--include-secrets` قبل از خروجی گرفتن، ارجاعات keychain را حل میکند و در صورتی که هر اعتبارنامه ارجاع داده شده قابل خواندن نباشد، با شکست مواجه میشود. `--no-secrets` همیشه اولویت دارد.
فایلهای خروجی به صورت اتمی با حالت `0600` نوشته میشوند. یک خروجی صریح حاوی اطلاعات محرمانه را به عنوان یک ماده محرمانه در نظر بگیرید. در سیستمهای بدون رابط کاربری گرافیکی (headless) که keychain سیستم عامل قابل استفادهای ندارند، CLI به `config.json` با حالت `0600` بازمیگردد و یک هشدار یکبار مصرف چاپ میکند؛ یک خروجی پیشفرض در این حالت سانسور شده باقی میماند.

---

## بررسی سریع سرتاسری

چرخهای قابل کپی و جایگذاری برای بررسی یک راهاندازی راهدور از ابتدا — اتصال، ایجاد یک
token با scope مشخص، هدایت یک دستور، بازگشت و پاکسازی. مقدار
`192.168.0.15` را با میزبان/IP سرور خود جایگزین کنید (Tailscale، شبکهٔ LAN یا یک URL عمومی
`https://…`).

```bash
# ۱. اتصال (گذرواژه ← token مدیر، ذخیرهشده بهعنوان context که فعال میشود)
omniroute connect 192.168.0.15                 # یا: --key oma_live_xxxx  (بدون گذرواژه)
omniroute contexts current                     # سرور راهدور + scope را نمایش میدهد

# ۲. استفاده از آن — اکنون دستورهای مدیریتی روی سرور راهدور اجرا میشوند
omniroute tokens create --name laptop --scope read   # ایجاد یک token با scope محدودتر
omniroute tokens list                                 # فهرست پوشاندهشده، از سرور راهدور

# ۳. جابهجایی رفتوبرگشتی
omniroute contexts use default                 # ← محلی
omniroute contexts use 192-168-0-15            # ← دوباره راهدور (نام از `contexts list`)

# ۴. پاکسازی. توجه: `contexts remove` فقط اعتبارنامهٔ محلی را حذف میکند —
#    این دستور token روی سرور را باطل نمیکند. اگر میخواهید واقعاً دسترسی را قطع کنید،
#    ابتدا آن را در سمت سرور باطل کنید.
omniroute tokens revoke <id|prefix>            # دسترسی روی سرور را قطع میکند
omniroute contexts remove 192-168-0-15 --yes   # حذف context محلی (حتی اگر فعال باشد ← بازگشت به default)، بدون درخواست تأیید
```

> گزینهٔ `--yes` دستور `contexts remove` را غیرتعاملی میکند (در اسکریپتها/CI الزامی است؛ بدون
> آن، پوستهٔ غیرتعاملی بهجای معطل ماندن، درخواست را با حفظ ایمنی رد میکند). با حذف context
> **فعال**، سیستم بهطور خودکار به `default` بازمیگردد.

---

## نکات امنیتی

- متن سادهٔ توکن فقط یکبار نمایش داده میشود؛ تنها هش SHA-256 آن ذخیره میشود (مانند کلیدهای API).
- `omniroute connect` از همان سازوکار قفلکردن در برابر حملات جستوجوی فراگیرِ ورود و ثبت رویدادهای ممیزی استفاده میکند.
- برای انتقال، HTTPS یا یک Tailnet را ترجیح دهید؛ یک میزبانِ بدون پروتکل، برای سهولت استفاده در LAN/Tailscale بهطور پیشفرض از `http://` استفاده میکند — برای TLS یک URL کامل با قالب `https://…` وارد کنید.
- فایل ترجیحیِ زمینهٔ محلی `~/.omniroute/config.json` (`chmod 600`) است که فقط یک `credentialRef` دارد؛ خود توکن در زنجیرهکلید سیستمعامل (`keytar`) ذخیره میشود و هرگز در گزارشها چاپ نمیشود. نصبهای بدون رابط کاربری که زنجیرهکلید بومیِ فعال ندارند، بهطور صریح از همان فایل با مجوز `0600` بهعنوان راهکار جایگزین استفاده میکنند و یکبار هشدار میدهند. پس از نصب یک بکاند زنجیرهکلید، از `omniroute contexts migrate --yes` استفاده کنید.

---

## نقاط پایانی API (مرجع)

| روش    | مسیر                  | احراز هویت       | دامنهٔ دسترسی                   |
| ------ | --------------------- | ---------------- | ------------------------------- |
| POST   | `/api/cli/connect`    | گذرواژهٔ مدیریتی | — (عمومی، محافظتشده با گذرواژه) |
| GET    | `/api/cli/whoami`     | توکن دسترسی      | خواندن                          |
| GET    | `/api/cli/tokens`     | توکن دسترسی      | مدیریت                          |
| POST   | `/api/cli/tokens`     | توکن دسترسی      | مدیریت                          |
| DELETE | `/api/cli/tokens/:id` | توکن دسترسی      | مدیریت                          |

برای طرحوارههای کامل، [openapi.yaml](../openapi.yaml) را ببینید.
