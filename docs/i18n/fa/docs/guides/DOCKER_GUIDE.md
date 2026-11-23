# 🐳 Docker Guide — OmniRoute (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> مرجع کامل استقرار Docker. برای شروع سریع، به [بخش Docker در README](../README.md#-docker) مراجعه کنید.

## فهرست مطالب

- [اجرای سریع](#quick-run)
- [استفاده از فایل محیطی](#with-environment-file)
- [Docker Compose](#docker-compose)
- [پروفایلهای موجود](#available-profiles)
- [پیکربندی ابزارهای CLI میزبان هنگام اجرای OmniRoute در Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [سرویس جانبی Redis](#redis-sidecar)
- [Compose برای محیط عملیاتی](#production-compose)
- [مراحل Dockerfile](#dockerfile-stages)
- [متغیرهای محیطی حیاتی](#critical-environment-variables)
- [Docker Compose با Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [تونل سریع Cloudflare](#cloudflare-quick-tunnel)
- [برچسبهای ایمیج](#image-tags)
- [بهروزرسانیهای داشبورد در Docker](#dashboard-updates-in-docker)
- [دسترسپذیری: SQLite پیشفرض تکنمونهای است](#availability-default-sqlite-is-single-replica)
- [خطاهای منطقهای Gemini درون Docker](#gemini-regional-errors-inside-docker)
- [نکات مهم](#important-notes)

---

## اجرای سریع

> **خودمیزبانی تنها با یک فرمان؟** به
> [راهنمای خودمیزبانی](../getting-started/SELF_HOST_GUIDE.md) مراجعه کنید —
> `docker compose -f docker-compose.selfhost.yml up -d` (ایمیج منتشرشده +
> Redis، فقط روی loopback و بدون انتخاب پروفایل). اجرای سریع زیر، روش
> تککانتینری برای کاربرانی است که Redis را از قبل در جای دیگری اجرا میکنند.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## استفاده از فایل محیطی

```bash
# ابتدا .env را کپی و ویرایش کنید
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# پروفایل پایه (بدون ابزارهای CLI)
docker compose --profile base up -d

# پروفایل CLI (با Claude Code، Codex و OpenClaw داخلی)
docker compose --profile cli up -d

# پروفایل میزبان (در درجه اول برای Linux؛ باینریهای CLI میزبان را بهصورت فقطخواندنی mount میکند)
docker compose --profile host up -d

# پروفایل وب (Chromium/Playwright برای ارائهدهندگان مبتنی بر نشست وب)
docker compose --profile web up -d

# ترکیب CLI و سرویس جانبی CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## پروفایلهای موجود

OmniRoute برای الگوهای اصلی استقرار، پروفایلهای Compose ارائه میکند. پروفایلی را انتخاب کنید که با محیط شما مطابقت دارد.

| پروفایل         | سرویس            | زمان استفاده                                                                                                                                                  | فرمان                                        |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (پیشفرض) | `omniroute-base` | سرور بدون رابط گرافیکی / محیط اجرای حداقلی، بدون CLIهای ارائهدهندگان                                                                                          | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | گردشکارهای عاملی که `omniroute providers/setup/doctor` و CLIهای همراه (Codex، Claude Code، Droid، OpenClaw) را فراخوانی میکنند                                | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | میزبانهای Linux که میخواهند با mount کردن فقطخواندنی `~/.local/bin`، `~/.codex`، `~/.claude` و غیره، دسترسی مشابه `network_mode` به CLIهای میزبان داشته باشند | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | اجرای سرویس جانبی [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) روی پورت `8317` برای پروکسیکردن CLI بالادستی                                    | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | ارائهدهندگان نشست وب که به مرورگر نیاز دارند: `gemini-web`، `claude-web`، `claude-turnstile` (ساخت `runner-web`، شامل Chromium)                               | `docker compose --profile web up -d`         |

> میتوان چندین پروفایل را با هم ترکیب کرد: `docker compose --profile cli --profile cliproxyapi up -d`.

## پیکربندی ابزارهای CLI میزبان هنگامی که OmniRoute در Docker اجرا میشود

دستورهای `omniroute setup-codex`، `setup-claude`، `config set <tool>` و دکمهٔ
**ذخیرهٔ پیکربندی** در داشبورد، همگی فایلهایی مانند `~/.codex/*.config.toml` را مینویسند. این مسیرها
فقط روی ماشینی معنا دارند که CLI واقعاً در آن اجرا میشود. اگر آنها را داخل
کانتینر اجرا کنید، عملیات نوشتن در home خود کانتینر (`/home/node` —
ایمیج با `USER node` اجرا میشود) انجام خواهد شد؛ جایی که هیچ CLI روی میزبان آن را نمیخواند و
بهمحض ایجاد مجدد کانتینر، محتویاتش حذف میشود.

OmniRoute این وضعیت را تشخیص میدهد و بهجای گزارش موفقیتی که قابل استفاده نیست،
از نوشتن خودداری کرده و دستورالعملهایی ارائه میکند: CLI با کد `2` خارج میشود و API با `422`
و `containerEphemeralTarget: true` پاسخ میدهد.

### روش توصیهشده: CLI را روی میزبان و OmniRoute را در Docker اجرا کنید

کانتینر API را ارائه میدهد؛ CLI ابزارهای میزبان شما را پیکربندی میکند.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI را به کانتینر متصل کنید
omniroute setup-codex                      # مسیر واقعی ~/.codex را روی میزبان شما مینویسد
```

وقتی Codex، Claude Code، Cursor یا ابزارهای مشابه روی لپتاپ شما اجرا میشوند —
که حالت معمول نیز همین است — این روش انتخاب درستی است.

### روش جایگزین: دایرکتوریهای پیکربندی میزبان را bind-mount کنید (پروفایل `host`)

اگر میخواهید خود کانتینر پیکربندی میزبان شما را بنویسد، دایرکتوریها را
mount کرده و `CLI_CONFIG_HOME` را روی ریشهٔ mount تنظیم کنید. پروفایل `host`
از قبل این کار را انجام میدهد:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount همان چیزی است که مسیر را قابلاعتماد میکند: OmniRoute فایل
`/proc/self/mountinfo` را میخواند و نوشتن در مسیرهای mountشده (و دایرکتوریهایی
که فرزندانشان mount شدهاند، که دقیقاً با ساختار `/host-home` در بالا مطابقت دارد) را مجاز میکند،
درحالیکه همچنان از نوشتن در مسیرهای mountنشده خودداری میکند.

### راه گریز: پیکربندی CLIهای داخل خود کانتینر (با احتیاط استفاده کنید)

وقتی CLIها واقعاً داخل کانتینر قرار دارند (پروفایل `cli`)، عملیات نوشتن
عمدی است. گزینهٔ `--allow-container-write` را به هر دستور `setup-*` بدهید، یا برای
سرور مقدار `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` را تنظیم کنید. عملیات نوشتن
با هشداری مبنی بر اینکه دادهها پس از حذف کانتینر باقی نمیمانند، انجام میشود.

> **هشدار امنیتی — پروفایل `cli` بههمراه mount کردن `docker.sock`.**
> پروفایل `cli` مسیر `/var/run/docker.sock` را bind-mount میکند تا بهروزرسان خودکار
> داخل کانتینر بتواند stack را از طریق daemon میزبان دوباره ایجاد کند
> (`src/lib/system/autoUpdate.ts` وجود آن socket را بررسی میکند و در صورت نبودنش،
> مسیر Docker را نادیده میگیرد). این socket **یک مرز اعتماد با سطح دسترسی root
> میزبان** است: هر چیزی که بتواند به آن دسترسی پیدا کند، daemon مربوط به Docker میزبان را با
> دسترسی root کنترل میکند — و میتواند هر کانتینری را روی میزبان ایجاد، بررسی، متوقف یا حذف کند.
> پیامدها:
>
> 1. **هرگز پورت پروفایل `cli` را در معرض شبکه قرار ندهید.** آن را روی
>    `127.0.0.1` منتشر کنید (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — قابلدسترسی بودن پروفایل `cli` از طریق LAN، هر RCE در سطح داشبورد را به
>    نفوذ کامل به میزبان تبدیل میکند.
> 2. **هیچ دایرکتوری دیگری از میزبان را به پروفایل `cli` متصل نکنید.**
>    socket مربوط به Docker همراه با هر mount اضافی، دسترسی کامل خواندن/نوشتن به
>    سیستم فایل و پیکربندی میزبان شما را در اختیار کانتینر قرار میدهد. اگر لازم است ابزاری
>    به یک پروژه دسترسی داشته باشد، آن را بهصورت محلی با فایل باینری CLI اجرا کنید — پروژه را
>    داخل کانتینر `cli` mount نکنید.
>
> اگر به بهروزرسانی خودکار داخل کانتینر نیاز ندارید، پروفایل `cli` را غیرفعال نگه دارید
> (`COMPOSE_PROFILES=core,redis` یا کوتاهتر). سایر پروفایلها
> socket مربوط به Docker را mount نمیکنند.
>
> برای مشاهدهٔ مدل تهدید مرتبط با MITM به `docs/security/MITM-TPROXY-DECRYPT.md` مراجعه کنید
> (در git قرار دارد و در `/docs` کامپایل نشده است)، و برای زنجیرهٔ منشأ فایلهای باینری
> `codex`/`claude-code`/`droid`/`openclaw` به `docs/security/SUPPLY_CHAIN.md` مراجعه کنید.

## سایدکار Redis

OmniRoute برای پشتیبانی از محدودکنندهٔ نرخ توزیعشده و کش اشتراکی به Redis متکی است. سرویس `redis` **همیشه** در `docker-compose.yml` تعریف شده است (هیچ محدودیت پروفایلی ندارد) و همراه با هر پروفایل دیگری اجرا میشود.

| جزئیات                   | مقدار                                        |
| ------------------------ | -------------------------------------------- |
| ایمیج                    | `redis:7-alpine`                             |
| نام کانتینر              | `omniroute-redis`                            |
| پورت داخلی               | `6379`                                       |
| پورت میزبان (قابل تغییر) | `REDIS_PORT` (مقدار پیشفرض `6379`)           |
| رابط میزبان (قابل تغییر) | `REDIS_BIND_HOST` (مقدار پیشفرض `127.0.0.1`) |
| والیوم                   | `omniroute-redis-data` → `/data`             |
| بررسی سلامت              | `redis-cli ping` (با فاصلهٔ زمانی 10 ثانیه)  |

متغیرهای محیطی مرتبط:

- `REDIS_URL` — رشتهٔ اتصال تزریقشده به برنامه (بهطور پیشفرض `redis://redis:6379`).
- `REDIS_PORT` — نگاشت پورت سمت میزبان برای کانتینر Redis.
- `REDIS_BIND_HOST` — رابط میزبانی که پورت روی آن منتشر میشود. مقدار پیشفرض `127.0.0.1` است.

> **دلیل استفادهٔ پیشفرض از رابط loopback:** سایدکار بدون `requirepass` اجرا میشود و کانتینرهای
> برنامه از طریق شبکهٔ compose به آن دسترسی دارند (`redis:6379`) — پورت منتشرشده فقط برای
> ابزارهای سمت میزبان (`redis-cli` و اجرای محلی `npm run dev`) در نظر گرفته شده است. انتشار روی
> `0.0.0.0` یک Redis بدون احراز هویت را در معرض دسترسی تمام میزبانهای شبکهٔ LAN شما قرار میدهد. اگر
> `REDIS_BIND_HOST=0.0.0.0` را تنظیم میکنید، `--requirepass` را نیز به `command:` سرویس اضافه کنید.

**غیرفعالکردن Redis** توصیه نمیشود (محدودکنندهٔ نرخ به حالت جایگزین درونحافظهای تنزل پیدا میکند). اگر ناچار به این کار هستید، بلوک سرویس `redis:` را در `docker-compose.yml` حذف/کامنت کنید یا مقیاس آن را به صفر کاهش دهید:

```bash
docker compose up -d --scale redis=0
```

## Compose محیط تولید

برای اجرای یک نمونهٔ مستقل تولید در کنار محیط توسعه، از `docker-compose.prod.yml` استفاده کنید.

| جزئیات              | مقدار                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| فایل                | `docker-compose.prod.yml`                                                       |
| پورت پیشفرض داشبورد | `PROD_DASHBOARD_PORT=20130` (نگاشتشده به پورت داخلی `${DASHBOARD_PORT:-20128}`) |
| پورت پیشفرض API     | `PROD_API_PORT=20131`                                                           |
| ایمیج               | `omniroute:prod` (ساختهشده از هدف `runner-cli`)                                 |
| کانتینر Redis       | `omniroute-redis-prod` (`redis:8.6.2`، با والیوم اختصاصی `redis-prod-data`)     |
| والیوم داده         | `omniroute-prod-data` (نامگذاریشده و ماندگار در بازسازیها)                      |
| بررسیهای سلامت      | `node healthcheck.mjs` + `redis-cli ping`، با `depends_on` مشروط به سلامت Redis |

نحوهٔ استفاده:

```bash
# استک تولید را بسازید و اجرا کنید
docker compose -f docker-compose.prod.yml up -d --build

# گزارشها را بهصورت زنده مشاهده کنید
docker compose -f docker-compose.prod.yml logs -f

# استک را متوقف و حذف کنید (والیومها حفظ شوند)
docker compose -f docker-compose.prod.yml down
```

استک تولید بهصورت موازی با compose توسعه اجرا میشود (نام کانتینرها، پورتها و والیومهای متفاوتی دارد)، بنابراین درحالیکه محیط تولید فعال باقی میماند، میتوانید توسعهٔ محلی را ادامه دهید.

## مراحل Dockerfile

مخزن همراه با یک Dockerfile چندمرحلهای (`Dockerfile`) ارائه میشود. چهار مرحله در دسترس هستند؛ `target` مناسب را برای کاربرد خود انتخاب کنید.

| مرحله         | ایمیج پایه            | هدف                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | وابستگیها را نصب میکند (`npm ci --legacy-peer-deps`) و `npm run build` را اجرا میکند (بهصورت پیشفرض با Turbopack — بخش منابع زمان ساخت را در ادامه ببینید)                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | محیط اجرای تولید با خروجی مستقل Next.js. **هیچ CLI مربوط به ارائهدهندگان در آن گنجانده نشده است.**                                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | ابزارهای `git`، `docker.io`، `docker-compose` و CLIهای سراسری زیر را اضافه میکند: `@openai/codex`، `@anthropic-ai/claude-code`، `droid`، `openclaw`. **برای گردشکارهای عاملی این مرحله را انتخاب کنید.**                                                                                                        |
| `runner-web`  | `runner-base`         | Playwright و مرورگر Chromium را (`--with-deps`) برای ارائهدهندگان نشست وب اضافه میکند: `gemini-web`، `claude-web`، `claude-turnstile`. **هنگام استفاده از این ارائهدهندگان، این مرحله را انتخاب کنید** — ایمیج ساده بدون آن هنگام درخواست با خطا مواجه میشود (یادداشت `-web` را در بخش کانالهای انتشار ببینید). |

ساخت دستی یک هدف مشخص:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### منابع زمان ساخت

سه آرگومان ساخت، هزینه منابع مرحله `builder` را کنترل میکنند. این آرگومانها فقط مربوط به زمان ساخت هستند —
`OMNIROUTE_MEMORY_MB` (در ادامه) یک تنظیم جداگانه برای زمان اجرا است.

| آرگومان ساخت                | پیشفرض | تأثیر                                                                                                        |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | مقدار `0` با webpack میسازد: اوج مصرف حافظه کمتر، اما کندتر. مقدار `1` استفاده از Turbopack را فعال میکند.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | سقف heap مربوط به V8 (`--max-old-space-size`) برای فرایند `next build` ایجادشده.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | مقدار `CIRCLE_NODE_TOTAL` را تأمین میکند؛ Next برای جمعآوری دادههای صفحه، `workers = N - 1` را محاسبه میکند. |

`OMNIROUTE_BUILD_WORKERS` همان گزینهای است که باید در یک سازنده قدرتمند افزایش دهید و
زمانی که یک ساخت با محدودیت منابع **پس از** `✓ Compiled successfully` متوقف میشود، به آن
مشکوک شوید. هر worker مربوط به دادههای صفحه، فرایند مستقل خود را دارد و فرایند والد
`next build` نیز مستقل است؛ یک بازتولید زنده روی VPS (مسئله #7518) نشان داد که اوج RSS
هر فرایند، مستقل از پرچم heap در `NODE_OPTIONS`، حدود
~4.5 GB است (Turbopack عملیات کامپایل را در حافظه بومی/Rust خارج از heap مربوط به V8
انجام میدهد). مقدار پیشفرض `2` (← ۱ worker، در مجموع ۲
فرایند) متناسب با runnerهای میزبانیشده توسط GitHub با 16 GB حافظه و 4 vCPU است که
خط لوله انتشار از آنها استفاده میکند. با مقدار `8` (← ۷ worker)، حافظه آن runner تمام شد و
buildkit مرحله را با خطای `ResourceExhausted: ... cannot allocate memory` متوقف کرد؛
مقدار `3` (← ۲ worker) نیز پس از آنکه RSS هر فرایند بهجای استنباط، مستقیماً اندازهگیری شد،
همچنان در حافظه موجود جا نشد. فایل `tests/unit/docker-build-memory-budget.test.ts`
محاسبات را بر اساس مقدار اندازهگیریشده انجام میدهد و اگر هرکدام از این تنظیمات
از ظرفیت runner فراتر بروند، شکست میخورد.

Turbopack عملیات کامپایل را در حافظه بومی Rust انجام میدهد که **خارج از** heap مربوط به V8 است، بنابراین
`OMNIROUTE_BUILD_MEMORY_MB` آن را محدود نمیکند. در میزبانی با سقف حافظه، ساخت
بدون نمایش هیچ متن خطایی توسط OOM killer با SIGKILL متوقف میشود — فرایند صرفاً
در میانه `Creating an optimized production build` متوقف میشود، که بیشتر شبیه
گیرکردن به نظر میرسد تا اتمام حافظه. به همین دلیل `Dockerfile` برخلاف
`npm run dev` / `npm run build` که در آنها Turbopack پیشفرض کد است، بهصورت پیشفرض
از webpack استفاده میکند (`OMNIROUTE_USE_TURBOPACK=0`): اجرای ساده `docker build .`
بدون آرگومان ساخت (همان کاری که Railway و سایر میزبانهای نصب تککلیکی انجام میدهند)
نباید روی سازندهای با حافظه محدود، بیصدا متوقف شود. ایمیجهای منتشرشده از قبل
`OMNIROUTE_USE_TURBOPACK=0` را بهطور صریح در `docker-publish.yml` ارسال میکنند.
در سازندهای با RAM کافی، برای ساخت سریعتر استفاده از Turbopack را فعال کنید:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` فعال است، بنابراین `next build` یک فرایند والد **و** یک فرایند worker
را اجرا میکند و هرکدام بهطور جداگانه از `OMNIROUTE_BUILD_MEMORY_MB` پیروی میکنند. سقف
حافظه کانتینر را تقریباً بیشتر از دو برابر این مقدار در نظر بگیرید، نه برابر با خود آن.

اندازهگیریشده روی این درخت (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| بستهبند   | سقف حافظه کانتینر | نتیجه                                  |
| --------- | ----------------- | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB    | در هر دو حالت، بیصدا توسط OOM متوقف شد |
| webpack   | 8 GiB             | فرایند worker ساخت با SIGKILL متوقف شد |
| webpack   | 12 GiB            | موفق شد؛ اوج مصرف 11.1 GiB بود         |

### پیشفرضهای زمان اجرا

مقادیر پیشفرض صادرشده توسط `runner-base`: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

رفتار حافظه در Docker:

- ایمیج مقدار `OMNIROUTE_MEMORY_MB=1024` را تنظیم میکند و `NODE_OPTIONS=--max-old-space-size=1024` را از آن به دست میآورد.
- فرایند واقعی سرور توسط اجراگر مستقل آغاز میشود؛ این اجراگر `OMNIROUTE_MEMORY_MB` را میخواند و `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` را اضافه میکند.
- Node از آخرین مقدار تکرارشدهٔ `--max-old-space-size` استفاده میکند؛ بنابراین تنظیم `OMNIROUTE_MEMORY_MB` محدودیت مؤثر heap در Docker را کنترل میکند.
- از آنجا که ایمیج همیشه این مقدار را تنظیم میکند، سازوکار جایگزین خود اجراگر که بر اساس RAM تنظیم میشود، هرگز در Docker اعمال نمیشود. این مقدار را متناسب با بار کاری بهطور صریح افزایش دهید (جدول زیر). مقدار `2048` همچنان برای `/v1/responses` عاملهای کدنویسی بسیار کم است.

### RAM زمان اجرا برای عاملهای کدنویسی

مقدار پیشفرض ۱ GiB در Docker، حداقل لازم برای داشبورد/گفتوگوی سبک است، نه اندازهای مناسب برای محیط عملیاتی. بدنههای طولانی `POST /v1/responses` (صدها پیام و دهها ابزار) هنگام فشردهسازی، چندین گراف را در حافظه نگه میدارند. دو درخواست همپوشان با اندازهٔ حدود ۳ MiB / حدود ۷۵۰ هزار توکن، V8 را با old-space برابر با **۱۲ GiB** متوقف کردهاند (`FATAL ERROR: Reached heap limit`) و همچنین موجب OOM در cgroup با ۱۶ GiB شدهاند. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) را ببینید.

اندازهٔ **`--memory` در cgroup را بیشتر از heap** در نظر بگیرید — بافرهای بومی، SQLite و دادههای میانی فشردهسازی خارج از V8 قرار میگیرند.

| بار کاری                            | `OMNIROUTE_MEMORY_MB`    | کانتینر / cgroup       | توضیحات                                                                                                           |
| ----------------------------------- | ------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| داشبورد، یک گفتوگوی سبک             | `1024` (پیشفرض ایمیج)    | ≥۲ GiB                 |                                                                                                                   |
| یک عامل کدنویسی (Claude/Codex/Grok) | `8192`                   | ≥۱۰ GiB                | حالت معمول برای `/v1/responses` تکنشستی                                                                           |
| دو `/v1/responses` طولانی و همزمان  | `10240`–`12288`          | ≥۱۲–۱۶ GiB             | توقف اندازهگیریشدهٔ V8 با heap حدود ۱۲ GiB                                                                        |
| سه یا چند زمینهٔ طولانی همزمان      | روی یک فرایند اجرا نکنید | سریالیسازی / RAM بیشتر | پذیرش پیشفرض بارهای سنگین به ۱ درخواست در حال اجرا محدود است؛ افزایش آن بدون RAM کافی، توقف را دوباره ایجاد میکند |

وقتی `OMNIROUTE_MEMORY_MB` **تنظیم نشده باشد**، دستور `omniroute serve` روی سیستم بدون واسطه، مقدار را روی حدود ۳۵٪ از RAM تنظیم میکند (با محدودیت `[512, 4096]`). Docker همیشه مقدار `1024` را تنظیم میکند، بنابراین این تنظیم خودکار هرگز در ایمیج رسمی اجرا نمیشود.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## متغیرهای حیاتی محیطی

علاوه بر مقادیر پیشفرض مستندشده در [ENVIRONMENT.md](../reference/ENVIRONMENT.md)، متغیرهای زیر هنگام اجرا تحت Docker بیشترین اهمیت را دارند:

| متغیر                         | کاربرد                                                                                                                                                                                                                                                                                     | مقدار پیشفرض               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | راز مشترک برای پل WebSocket. **در محیط تولید الزامی است** — آن را روی یک رشته تصادفی قوی تنظیم کنید.                                                                                                                                                                                       | تنظیمنشده (باید ارائه شود) |
| `REDIS_URL`                   | رشته اتصال برای محدودکننده نرخ / بکاند کش                                                                                                                                                                                                                                                  | `redis://redis:6379`       |
| `REDIS_PORT`                  | پورت سمت میزبان برای کانتینر Redis همراه                                                                                                                                                                                                                                                   | `6379`                     |
| `REDIS_BIND_HOST`             | رابط میزبان که پورت Redis همراه روی آن منتشر میشود (loopback، مگر اینکه AUTH را اضافه کنید)                                                                                                                                                                                                | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | مسیر میزبان که برای گردشکارهای بهروزرسانی خودکار، در پروفایل `cli` روی `/workspace/omniroute` متصل میشود                                                                                                                                                                                   | `.` (دایرکتوری فعلی)       |
| `OMNIROUTE_MEMORY_MB`         | سقف heap زمان اجرای Node برای سرور مستقل Docker؛ مقدار پیشفرض ایمیج در بالا را بازنویسی میکند. عاملهای کدنویسی: `8192`+ (به [RAM زمان اجرا](#runtime-ram-for-coding-agents) مراجعه کنید).                                                                                                  | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | بازنویسی پورتهای در معرض دسترس برای داشبورد (20128) و API (20129)                                                                                                                                                                                                                          | `20128` / `20129`          |
| `APP_BIND_HOST`               | رابط میزبانی که docker-compose پورتهای داشبورد/API/live-WS را روی آن منتشر میکند. با `REQUIRE_API_KEY=false` (مقدار پیشفرض)، `0.0.0.0` پراکسی ناشناس `/v1` را در معرض LAN قرار میدهد — تنها در صورت `REQUIRE_API_KEY=true` یا وجود یک پراکسی معکوس در جلوی آن، دامنه دسترسی را گسترش دهید. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | رابط میزبانی که docker-compose سرویس جانبی `cliproxyapi` را روی آن منتشر میکند — volume داده آن حاوی اطلاعات اعتبارسنجی ارائهدهنده است.                                                                                                                                                    | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | دایرکتوریای که اسکنر افزونه زمان اجرا از آن میخواند و افزونهها را در آن نصب میکند. هنگامی که افزونهها بهصورت bind-mount متصل شدهاند، آن را تنظیم کنید: مقدار پیشفرض از `HOME` پیروی میکند که ممکن است یک ایمیج آن را export نکند.                                                          | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | زیرمسیر URL هنگامی که برنامه پشت یک پراکسی معکوس منتشر میشود (برای مثال، `/omniroute`)                                                                                                                                                                                                     | _(خالی = ریشه)_            |
| `NEXT_PUBLIC_BASE_URL`        | مبدأ عمومی مرورگر، شامل زیرمسیر (برای مثال، `https://host/omniroute`)                                                                                                                                                                                                                      | تنظیمنشده                  |
| `PROD_DASHBOARD_PORT`         | پورت داشبورد سمت میزبان برای `docker-compose.prod.yml`                                                                                                                                                                                                                                     | `20130`                    |
| `CLIPROXYAPI_PORT`            | پورت سمت میزبان برای سرویس جانبی `cliproxyapi`                                                                                                                                                                                                                                             | `8317`                     |

## پروکسی معکوس روی یک زیرمسیر (Traefik / nginx)

مقدار `basePath` در Next.js داخل بستهٔ مستقل کامپایل میشود. OmniRoute مقدار ثبتشده را در یک فایل نشانهگذار در ریشهٔ برنامه ذخیره میکند (که هنگام اجرای `npm run build` نوشته و توسط `scripts/docker/ensure-docker-base-path.mjs` خوانده میشود) و هنگام راهاندازی کانتینر، آن را با `OMNIROUTE_BASE_PATH` مقایسه میکند. اگر این مقادیر متفاوت باشند و ایمیج برای ریشهٔ دامنه ساخته شده باشد، نقطهٔ ورود پیش از اجرای `node dev/run-standalone.mjs`، مانیفستهای مستقل، مقادیر تعبیهشدهٔ `basePath`/`assetPrefix` (Next 16 آدرسهای URL داراییهای SSR را صرفاً از `assetPrefix` تولید میکند — وصلهگر زیرمسیر را در آن نیز منعکس میکند)، آدرسهای URL داراییهای ثبتشدهٔ `/_next/static` (مانیفستهای ارجاع کلاینت، واردسازیهای رسانهای و صفحههای خطای ازپیشرندرشده) و شیم `process.env` کلاینت را بازنویسی میکند.

### ساخت با Compose (توصیهشده)

هر دو متغیر را در `.env` تنظیم کنید، سپس ایمیج را دوباره بسازید تا تنظیمات ایمیج و محیط اجرا یکسان باشند:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

فایل `docker-compose.yml` مقدار `OMNIROUTE_BASE_PATH` را هم بهعنوان آرگومان ساخت Docker و هم بهعنوان متغیر محیطی زمان اجرا ارسال میکند.

### ایمیج ریشهٔ ازپیشساختهشده + زیرمسیر زمان اجرا

ایمیجهای منتشرشدهٔ `diegosouzapw/omniroute:*` برای ریشهٔ دامنه ساخته شدهاند. بااینحال، همچنان میتوانید `OMNIROUTE_BASE_PATH` را در زمان اجرا تنظیم کنید؛ کانتینر هنگام راهاندازی، بسته را یکبار وصله میکند. آن را همراه با مبدأ عمومی منطبق تنظیم کنید:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

پروکسی معکوس را طوری پیکربندی کنید که مسیر خارجی **کامل** را ارسال کند (پیشوند را حذف نکنید). Traefik باید `PathPrefix(`/omniroute`)` را بدون `StripPrefix` به کانتینر هدایت کند تا Next.js مسیر `/omniroute/...` را دریافت کرده و داراییها را از `/omniroute/_next/...` ارائه کند.

بررسی سلامت Docker، نقطهٔ پایانی سبکوزن چرخهٔ حیات `/healthz` را با پیشوند `OMNIROUTE_BASE_PATH` فعال بررسی میکند. مسیر `/api/monitoring/health` همچنان برای عیبیابی انسانی یا داشبورد در دسترس است؛ برای هدایت مجدد HEALTHCHECK کانتینر به آن (برای مثال، جهت اعمال بررسی سلامت عمیق)، مقدار `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` را تنظیم کنید. این مسیر یک بررسی **عمیق** است (پایگاه داده + خلاصهٔ نظارت) — اگر دوباره آن را فعال کنید، برای `HEALTHCHECK` کمتکرار Docker مناسب است، اما برای بازههای زمانی `livenessProbe` در Kubernetes **مناسب نیست**.

برای هماهنگکنندهها (Kubernetes، Nomad و غیره):

| کاوش            | ترجیح دهید                                                       | اجتناب کنید                                                      |
| --------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| زندهبودن        | HTTP `GET /livez`، یا TCP روی پورت اصلی (`PORT`، پیشفرض `20128`) | استفاده از `/api/monitoring/health` برای زندهبودن                |
| آمادگی          | HTTP `GET /healthz`                                              | مهلتهای کوتاهی که مشغولبودن حلقهٔ رویداد را مردهبودن تلقی میکنند |
| عمیق / جعبهسیاه | `/api/monitoring/health`                                         | —                                                                |

مسیر `/healthz` وضعیت چرخهٔ حیات فرایند (`ok` / `starting` / `stopping`) را گزارش میکند. مسیر `/livez` فقط زندهبودن فرایند را بررسی میکند (هر زمان کنترلکننده بتواند اجرا شود، وضعیت 200 را برمیگرداند؛ منتظر آمادهشدن نمیماند). هر دو همچنان روی همان حلقهٔ رویداد Node اجرا میشوند که درخواستها را مدیریت میکند؛ بنابراین، پردازش کاتالوگ یا فشردهسازیِ وابسته به CPU میتواند آنها را به تأخیر بیندازد — مشغول ≠ مرده. اگر کاوشهای HTTP با پایان مهلت مواجه میشوند، زندهبودن مبتنی بر TCP را ترجیح دهید. راهنمای کامل کاوشها:
[راهنمای نظارت — توصیههای مربوط به کاوشهای Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose با Caddy ‏(HTTPS Auto-TLS)

میتوان OmniRoute را با استفاده از فراهمسازی خودکار SSL در Caddy بهصورت امن در دسترس قرار داد. مطمئن شوید رکورد A دامنه شما به IP سرورتان اشاره میکند.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # مبدأ قابلمشاهده برای مرورگر جهت callbackهای OAuth، پیوندهای داشبورد و URLهای عمومی تولیدشده.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL داخلی سروربهسرور برای کارهای زمانبندیشده / واکشیهای داخلی.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy هدرهای استاندارد ارسال را برای کانتینر بالادستی تنظیم میکند. OmniRoute از
`NEXT_PUBLIC_BASE_URL` بهعنوان مبدأ عمومی مرجع برای callbackهای OAuth و پیوندهای عمومی
تولیدشده استفاده میکند؛ عملیات نوشتن احراز هویتشده در داشبورد از درخواستهای هممبدأ بههمراه محافظت
CSRF وابسته به نشست استفاده میکنند. `OMNIROUTE_TRUST_PROXY` را فقط برای استقرارهای پیشرفتهای فعال کنید که در آنها عمداً
میخواهید OmniRoute بهجای پیکربندی صریح، مبدأ عمومی را از هدرهای ارسالشده مورداعتماد استخراج
کند.

## تونل سریع Cloudflare

پشتیبانی داشبورد برای استقرارهای Docker شامل یک **تونل سریع Cloudflare** با یک کلیک در `Dashboard → Endpoints` است. نخستین فعالسازی، `cloudflared` را فقط در صورت نیاز دانلود میکند، یک تونل موقت به endpoint فعلی `/v1` شما راهاندازی میکند و URL تولیدشده `https://*.trycloudflare.com/v1` را مستقیماً زیر URL عمومی معمول شما نمایش میدهد.

پنلهای تونل endpoint ‏(Cloudflare، Tailscale، ngrok) را میتوان از `Settings → Appearance` بدون تغییر وضعیت تونل فعال نمایش داد یا پنهان کرد.

### نکات تونل

- URLهای تونل سریع موقتی هستند و پس از هر راهاندازی مجدد تغییر میکنند.
- تونلهای سریع پس از راهاندازی مجدد OmniRoute یا کانتینر بهطور خودکار بازیابی نمیشوند. در صورت نیاز، آنها را از داشبورد دوباره فعال کنید.
- نصب مدیریتشده در حال حاضر از Linux، macOS و Windows روی `x64` / `arm64` پشتیبانی میکند.
- تونلهای سریع مدیریتشده بهطور پیشفرض از انتقال HTTP/2 استفاده میکنند تا از هشدارهای پرسروصدای بافر UDP مربوط به QUIC در محیطهای کانتینری دارای محدودیت جلوگیری شود. اگر انتقال دیگری میخواهید، `CLOUDFLARED_PROTOCOL=quic` یا `auto` را تنظیم کنید.
- imageهای Docker شامل ریشههای CA سیستم هستند و آنها را به `cloudflared` مدیریتشده منتقل میکنند؛ این کار از خطاهای اعتماد TLS هنگام راهاندازی اولیه تونل درون کانتینر جلوگیری میکند.
- اگر میخواهید OmniRoute بهجای دانلود، از یک فایل باینری موجود استفاده کند، `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` را تنظیم کنید.

## تگهای Image

| Image                    | تگ       | اندازه | توضیحات                                             |
| ------------------------ | -------- | ------ | --------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | بالاترین SemVer پایدار **منتشرشده** (نه git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | برای GitOps این نوع تگ را ثابت نگه دارید            |

manifest چندپلتفرمی: `linux/amd64` + `linux/arm64` بومی (Apple Silicon، AWS Graviton، Raspberry Pi). Docker معماری منطبق را بهطور خودکار انتخاب میکند؛ اگر لازم است شبیهسازی AMD64 را روی میزبانهای ARM اجباری کنید، `--platform linux/amd64` را وارد کنید.

### کانالهای انتشار

OmniRoute کانالهای Docker جداگانهای برای انتشارهای پایدار، آزمایش شاخه انتشار فعال و buildهای توسعه منتشر میکند.

| کانال                           | منبع                                | تغییرپذیری                  | کاربرد توصیهشده                                                                                                                 |
| ------------------------------- | ----------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | انتشار امضاشده/نسخهبندیشده          | تغییرناپذیر                 | استقرارهای عملیاتی که به یک انتشار دقیق ثابت شدهاند                                                                             |
| `:latest` / `:latest-web`       | بالاترین SemVer پایدار **منتشرشده** | اشارهگر پایدار تغییرپذیر    | انتشارهای پایدار را **پس از** یک کار انتشار SemVer دنبال میکند — `main` یا commitهای منتشرنشده `release/v*` را دنبال **نمیکند** |
| `:next` / `:next-web`           | شاخه پیشفرض فعلی `release/v*`       | اشارهگر پیشانتشار تغییرپذیر | آزمایش اصلاحاتی که به شاخه انتشار فعال وارد شدهاند، اما هنوز در یک انتشار پایدار قرار ندارند                                    |
| `:main` / `:main-web`           | شاخه `main`                         | اشارهگر توسعه تغییرپذیر     | فقط برای آزمایش توسعه و یکپارچهسازی                                                                                             |

#### ارائهدهندگان نشست وب: imageهای `-web`

هر کانال بالا یک تگ `-web` نیز دارد (`:latest-web`، `:<version>-web`، `:next-web`، `:main-web`) که از مرحله `runner-web` ساخته شده است — همان image بهعلاوه Playwright و مرورگر Chromium. image معمولی **بدون** Chromium عرضه میشود؛ `gemini-web`، `claude-web` و `claude-turnstile` به آن نیاز دارند.

خطا به تعویق میافتد و هنگام راهاندازی رخ نمیدهد: این ارائهدهندگان مدلهای خود را فهرست میکنند و در داشبورد بهصورت متصل نمایش داده میشوند، و فقط نخستین درخواست با خطای زیر مواجه میشود

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

اگر از این ارائهدهندگان استفاده میکنید، تگ `-web` کانالی را که در حال حاضر روی آن هستید pull کنید — هیچ چیز دیگری تغییر نمیکند. در نصب npm/CLI (بدون image ‏Docker)، بخش مفقود معادل، فایل باینری مرورگر است: دستور `npx playwright install chromium` را روی میزبان اجرا کنید.

#### استفاده از کانال پیشانتشار

کانال `next` با هر push به شاخهٔ پیشفرض فعلی `release/v*` دوباره ساخته میشود و برای هر دو معماری AMD64 و ARM64 منتشر میشود. شاخههای نگهداری قدیمیتر نمیتوانند آن را بازنویسی کنند. این کانال یک image قابل pull برای اصلاحاتی فراهم میکند که پیش از ایجاد tag پایدار بعدی، در شاخهٔ release فعال merge شدهاند.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

برای Docker Compose، tag مربوط به image استفادهشده توسط profile انتخابی را override کنید، سپس service را pull کرده و دوباره ایجاد کنید:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ایمنی و بازگشت به نسخهٔ قبلی

`next` یک کانال شناور پیشانتشار است. ممکن است با هر push به شاخهٔ release فعال تغییر کند و **برای استفاده در محیط production پشتیبانی نمیشود**. هنگام ارزیابی یک build مشخص، digest مربوط به image را pin کنید:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

پیش از آزمایش، از volume دادهٔ OmniRoute یا دایرکتوری دادهای که بهصورت bind mount متصل شده است نسخهٔ پشتیبان تهیه کنید. برای بازگشت، نسخهٔ پایدار یا digest استفادهشدهٔ قبلی را بازیابی کرده و container را دوباره ایجاد کنید:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

یک build از شاخهٔ release هرگز نمیتواند `latest` را جابهجا کند؛ فقط یک نسخهٔ معنایی پایدار واجد شرایط میتواند اشارهگر پایدار را ارتقا دهد. imageهای `next` همچنان تحت بازرسی image مربوط به release و دروازهٔ مسدودکنندهٔ آسیبپذیریهای CRITICAL قرار میگیرند.

**`latest` تضمینی برای بهروز بودن نسبت به git نیست.** اصلاحات mergeشده در `main` یا شاخهٔ فعال `release/v*` تا زمانی که یک image با SemVer پایدار منتشر نشود و job انتشار، `:latest` را ارتقا ندهد (با همان digest مربوط به آن SemVer)، در `:latest` وجود ندارند. اگر `latest` ثابت به نظر میرسد، در حالی که GitHub از قبل اصلاح را نشان میدهد، برای آزمایش شاخهٔ release، `:next` را pull کنید یا منتظر tag مربوط به SemVer بمانید.

| هدف شما                                                            | استفاده کنید                                    |
| ------------------------------------------------------------------ | ----------------------------------------------- |
| GitOps / محیط production که نباید دچار تغییر ناخواسته شود          | `:X.Y.Z` (یا digest مربوط به image) را pin کنید |
| دنبالکردن نسخههای پایدار منتشرشده و پذیرش ایجاد مجدد در هر release | `:latest`                                       |
| آزمایش commitهای منتشرنشدهٔ `release/v*`                           | `:next` (نه برای production)                    |
| آزمایش `main`                                                      | `:main` (نه برای production)                    |

## بهروزرسانیهای داشبورد در Docker

یک کانتینر مبتنی بر ایمیج منتشرشده نمیتواند خودش را جایگزین کند. وقتی OmniRoute تشخیص میدهد که داخل یک
کانتینر اجرا میشود (بدون checkout از `.git` و نه بهصورت نصب npm)، بنر بهروزرسانی داشبورد اصلی، بهجای
دستورالعملهای npm/git، فرمانی را که باید روی میزبان اجرا شود همراه با یک دکمهٔ کپی نمایش میدهد:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

نام سرویس از `AUTO_UPDATE_SERVICE` گرفته میشود (مقدار پیشفرض `omniroute` است؛ همان سرویس موجود در
`docker-compose.selfhost.yml`). دستور `pull` فقط یک تگ شناور (`latest`، `next`) را جابهجا میکند؛ در صورت استفاده از
تگ ثابت `:X.Y.Z`، ابتدا تگ را ویرایش کنید.

### بهروزرسانیهای تککلیکی با فایل محرک روی میزبان

برای فعال نگه داشتن **اکنون بهروزرسانی شود** بدون mount کردن `/var/run/docker.sock` (که دسترسی
root میزبان را به کانتینر میدهد — هشدار پروفایل `cli` در بالا را ببینید)، `DOCKER_UPDATE_TRIGGER_FILE` را روی
سرویس OmniRoute تنظیم کرده و یک watcher روی میزبان اجرا کنید:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

مسیر باید داخل `DATA_DIR` باشد (مقادیر نسبی بر اساس آن resolve میشوند)؛ هر مسیر دیگری
رد میشود. سپس **اکنون بهروزرسانی شود** مقدار `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` را در آن
فایل مینویسد، با `202` پاسخ میدهد و داشبورد تا زمانی که نسخهٔ جدید فعال شود، `/api/system/version` را
poll کرده و سپس صفحه را دوباره بارگذاری میکند. OmniRoute در این حالت هرگز shell یا فرمان Docker اجرا نمیکند. مانند همهٔ
عملیات بهروزرسانی، درخواست فقط از کلاینتهای loopback/LAN پذیرفته میشود.

یک دایرکتوری دادهٔ bind-mounted، مسیری پایدار برای پایش در اختیار میزبان قرار میدهد. نمونه واحدهای `systemd`
(مسیر `/srv/omniroute` را با دایرکتوری حاوی فایل compose و `data/` خود تطبیق دهید):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=پایش درخواستهای بهروزرسانی داشبورد OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=دریافت ایمیج و ایجاد مجدد کانتینر OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

سرویس پیش از pull کردن، درخواست را حذف میکند تا اجرای ناموفق وارد حلقه نشود. بدون
`DOCKER_UPDATE_TRIGGER_FILE`، داشبورد روند فرمان دستی را حفظ میکند.

## دسترسپذیری: SQLite پیشفرض تکنمونهای است

نسخهٔ استاندارد Docker / Kubernetes از OmniRoute شامل **یک فرایند Node و یک نویسندهٔ SQLite** است. دسترسپذیری بالا در این توپولوژی **پشتیبانی نمیشود**.

| محدودیت                                             | پیامد                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| نویسندهٔ منفرد                                      | چندین replica را روی یک فایل SQLite اجرا **نکنید**. این کار DB را خراب میکند.                                                                                                                                                                                                                                                                   |
| ایجاد مجدد / راهاندازی مجدد / توقف توسط HEALTHCHECK | **قطعی کامل** SSEهای در حال اجرا، نشستهای داشبورد و وضعیتهای درونحافظهای. اتصال همهٔ کلاینتهای متصل قطع میشود. درخواستهای جدید در بازهای که endpoint وجود ندارد، از reverse proxy پاسخ **`502 Bad Gateway: Unknown error`** دریافت میکنند، نه JSON مربوط به OmniRoute؛ کلاینتها نمیتوانند این وضعیت را از خرابی ارائهدهنده تشخیص دهند (#11015). |
| event loop مشترک با `/healthz`                      | یک catalog یا چرخهٔ فشردهسازی پرمشغله میتواند probeها را به تأخیر بیندازد؛ در این صورت timeout کوتاه باعث راهاندازی مجدد **تنها** replica میشود.                                                                                                                                                                                                |

**ماتریس probe** (همچنین [توصیههای probe در Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) را ببینید):

| Probe               | هدف                                                    | استفاده نکنید از                                                        |
| ------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| Liveness            | TCP روی `PORT` (پیشفرض `20128`) یا HTTP نرم `/healthz` | `/api/monitoring/health`                                                |
| Readiness           | HTTP `GET /healthz`                                    | timeoutهای کوتاهی که مشغول بودن event loop را بهمنزلهٔ توقف تلقی میکنند |
| عمیق / برای انسانها | `/api/monitoring/health`                               | liveness خودکار kubelet                                                 |

**ارتقاها:** انتظار داشته باشید اتصال همهٔ نشستها قطع شود. در صورت امکان، کلاینتها را تخلیه کنید؛ روی SQLite پیشفرض rolling update وجود ندارد. تنظیم Compose با `restart: unless-stopped` بههمراه `HEALTHCHECK` در Docker نیز وقتی کانتینر Unhealthy شود، تنها فرایند را جایگزین خواهد کرد — با همان دامنهٔ اثر.

قطعهپیکربندی Kubernetes برای یک **replica منفرد** (`Recreate` الزامی است؛ مقدار `replicas` را برای یک فایل SQLite افزایش ندهید):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

توقف موقت `preStop` به kube فرصت میدهد تا پیش از SIGTERM، نقاط پایانی Service را حذف کند؛ در نتیجه ترافیک **جدید** دیگر به فرایندی که در حال خاتمه است ارسال نمیشود. SSEهای در حال پردازشِ `/v1/responses` با استفاده از مجوزهای پذیرش سنگینوزن (#11015)، حداکثر تا مدت تعیینشده در `SHUTDOWN_TIMEOUT_MS` (پیشفرض ۳۰ ثانیه) تخلیه میشوند. درخواستهای جدیدی که همچنان به فرایند میرسند، پاسخ `503` بههمراه `Retry-After: 5` دریافت میکنند. فاصلهٔ زمانیِ بدون نقطهٔ پایانی در حالت Recreate تا زمانی که جایگزین Ready شود، همچنان یک قطعی کامل است — این ویژگی توپولوژی SQLite است، نه پیکربندی نادرست پروب.

Postgres خارجی / دسترسپذیری بالای چندنویسندهای، **یک مسیر استاندارد مستندشده نیست**. اگر به دسترسپذیری بالا نیاز دارید، یک replica منفرد نگه دارید یا توپولوژیای را اجرا کنید که پروژه آن را جداگانه آزمایش و مستند کرده است. کار مربوط به Postgres/MySQL در [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) دنبال میشود. تا زمانی که آن قابلیت منتشر شود، تنها روش پشتیبانیشده برای افزایش ظرفیت درخواستهای **بزرگ** `/v1/responses`، استفاده از N فرایند مستقل است (بخش بعدی)، نه `replicas > 1` روی یک volume.

## مقیاسافزایی افقی: N فرایند مستقل

یک فرایند Node برابر با **یک heap از V8** است. دو درخواست همپوشان عامل کدنویسی با اندازه حدود 3 MiB / حدود 750k توکن به `POST /v1/responses` ‏(RTK + Caveman)، آن heap را در حدود 12 Gi متوقف میکنند (`FATAL ERROR: Reached heap limit`) و میتوانند باعث OOM در یک cgroup با ظرفیت 16 Gi شوند. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) را ببینید. این اندازهگیری یک هشدار درباره **بودجه حافظه** است، نه محدودیت سخت محصول به دو درخواست طولانی همزمان `/v1/responses`. پذیرش چتهای سنگین بهوسیله بودجه بایت ورودی که بهطور خودکار محاسبه میشود (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، `src/shared/middleware/admissionBudget.ts`) کنترل میشود؛ این بودجه بر اساس همان سقف V8/cgroup تعیین میشود — افزایش دستی آن (یا تنظیم سقف قدیمی مبتنی بر تعداد درخواست `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) روی فرایندی که از قبل اندازهگذاری شده است، دوباره باعث توقف میشود. چتهای کوچک، `/healthz`، `/v1/models` و MCP **مشمول** این سقف نیستند.

### یک فرایند: بیش از دو `/v1/responses` طولانی

یک فرایند **سالم** (با heap کمتر از `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`، با مقدار پیشفرض `0.75`) **ممکن است** بیش از دو درخواست طولانی همزمان `POST /v1/responses` را اجرا کند، مشروط بر اینکه بودجه بایت درحالاجرای کل فرایند (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) همچنان ظرفیت داشته باشد. بدنههایی با اندازه برابر یا بیشتر از `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (با مقدار پیشفرض 256 KiB)، همان مجوز سنگین درخواستهای دارای ساختار پیچیده را میگیرند و از همان مسیر گریز `tryAcquireHealthyHeadroom` در [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ‏(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) استفاده میکنند. دهها کلاینت طولانی SSE همزمان (اپراتورها اغلب به 40–50 مورد نیاز دارند) یک مسئله **بودجه حافظه** است — اندازه heap، اسلاتهای اصلی/ظرفیت اضافه و `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` را تعیین کنید — نه یک محدودیت سخت محصول با عنوان «حداکثر 2». یک heap تحت فشار همچنان درخواستها را با `503` قابلتلاشمجدد کنار میگذارد تا مشکل #7849 بازنگردد.

برای **چندبرابر کردن heapها** (فضاهای قدیمی مستقل V8) **در حال حاضر**:

| انجام دهید                                                                                                                                                                 | انجام ندهید                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **N کانتینر/پاد** اجرا کنید که هرکدام `DATA_DIR` / volume **مختص خود** را داشته باشند                                                                                      | `replicas > 1` را روی یک فایل SQLite تنظیم نکنید                     |
| تعداد درخواستهای سنگین درحالاجرا و ظرفیت اضافه سالم را بر اساس heap / بودجه بایت درحالاجرا اندازهگذاری کنید؛ 1–2 مقدار پیشفرض محافظهکارانه #7849 است، نه محدودیت سخت محصول | به یک فرایند 8× RAM و یک سقف تعداد نامحدود اختصاص ندهید              |
| اختیاری: `QUOTA_STORE_DRIVER=redis` بههمراه `QUOTA_STORE_REDIS_URL` برای **شمارندههای سهمیه مشترک**                                                                        | Redis را SQLite مشترک تلقی نکنید — چنین نیست                         |
| رازهای ارائهدهنده را در هر نمونه کپی کنید (یا داشبوردهای تفکیکشده را بپذیرید)                                                                                              | انتظار یک داشبورد / یک گزارش تماس مشترک میان نمونهها را نداشته باشید |
| از هر load balancer در جلوی سرویس استفاده کنید؛ چسبندگی بر اساس API key یا session کافی است                                                                                | به middleware مختص یک عرضهکننده و آگاه از اندازه نیاز ندارید         |

سختافزار: تعداد درخواستهای طولانی همزمان `/v1/responses` در هر نمونه، یک مسئله **بودجه حافظه** است (heap بهعلاوه بودجه بایت درحالاجرا / #10110). تعداد `N` عدد `DATA_DIR` مستقل همچنان heapها را چندبرابر میکند: RAM میزبان باید پاسخگوی `N × cgroup` باشد، نه «یک پاد 16 Gi با N=8». هرگز `replicas > 1` را روی یک فایل SQLite تنظیم نکنید.

نمونه Compose (دو heap و دو volume — نه `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

چگالی درونفرایندی (انتقال فشردهسازی به خارج از isolate مربوط به HTTP) در [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) مطرح شده است. یک کلاستر منطقی روی وضعیت پایدار مشترک در [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) مطرح شده است.

## خطاهای منطقهای Gemini در داخل Docker

Google AI Studio / Gemini API ممکن است پاسخ HTTP 400 همراه با FAILED_PRECONDITION و پیام
`User location is not supported for the API use.` برگرداند. موفقیتآمیز بودن یک درخواست روی میزبان
ثابت نمیکند که کانتینر نیز از همان مسیر خروجی استفاده میکند. ترتیب DNS،
اتصالپذیری IPv4/IPv6، مسیریابی VPN و پراکسیهای پیکربندیشده ممکن است متفاوت باشند. علاوه بر مسیر واقعی اتصال،
[مناطق پشتیبانیشده Google](https://ai.google.dev/gemini-api/docs/available-regions)
را نیز بررسی کنید؛ این خطا بهتنهایی نشاندهنده نامعتبر بودن کلید API نیست.

### پراکسی مختص اتصال را ترجیح دهید

برای اتصال Gemini متأثرشده، از [پیکربندی پراکسی بهازای هر اتصال](../ops/PROXY_GUIDE.md#4-level-proxy-system)
در OmniRoute استفاده کنید، سپس **Test Connection** و یک درخواست کوچک
با همان مدل را دوباره اجرا کنید. به این ترتیب، تغییر مسیریابی فقط به همان اتصال محدود میشود. بررسی کنید
که پراکسی از داخل کانتینر قابل دسترسی است و اتصال واقعاً آن را انتخاب میکند.
تغییر مسیر، واجد شرایط بودن منطقهای در سرویس بالادستی را تضمین نمیکند.

### شبکه میزبان و کانتینر را مقایسه کنید

هنگام مقایسه نتایج احراز هویتشده، کلید، مدل و درخواست را یکسان نگه دارید؛ هرگز
اطلاعات احراز هویت، گذرواژههای پراکسی یا هدرهای کامل مجوز را در یک issue قرار ندهید.
ابتدا با اجرای دستور یکسان روی میزبان و داخل کانتینر، بررسی کنید که resolver سیستمعامل
کدام خانوادههای آدرس را ارائه میدهد:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` را با سرویسی که اجرا میکنید جایگزین کنید (برای مثال، `omniroute-web`). این
دستورها خانوادههای آدرس را بدون نمایش اطلاعات احراز هویت یا آدرسهای IP چاپ میکنند. برگردانده شدن `6`
فقط وجود یک نتیجه DNS از نوع IPv6 را نشان میدهد: این موضوع، قابل استفاده بودن مسیر IPv6 یا دسترسی به API را
**ثابت نمیکند**. در محیطهایی که `curl` نصب است،
`curl -4 -I https://generativelanguage.googleapis.com`
را با `curl -6 -I https://generativelanguage.googleapis.com` در هر دو محیط مقایسه کنید.
یک پاسخ HTTP، اتصالپذیری آن آزمون را ثابت میکند، حتی اگر یک خطای بدون احراز هویت باشد؛
فقط درخواست احراز هویتشده مدل میتواند واجد شرایط بودن برای Gemini را آزمایش کند.

### جایگزین در سطح میزبان: IPv6 فعال و سیاست resolver

گزارشدهنده [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) با فعال کردن
IPv6 کانتینر و تغییر نحوه انتخاب آدرس در glibc، دسترسی را در محیط خود بازیابی کرد.
این راهکار را بهعنوان جایگزینی مختص همان محیط در نظر بگیرید. پیش از تغییر ترجیحات resolver،
از کارکرد صحیح IPv6 میزبان، خروجی/مسیریابی کانتینر و قوانین فایروال اطمینان حاصل کنید.
وجود یک آدرس خصوصی ULA بهتنهایی، اتصالپذیری عمومی IPv6 را اثبات نمیکند.

برای سرویسهایی که از قبل به شبکه پیشفرض Compose متصل هستند، این قطعه
IPv6 را روی آن شبکه فعال میکند؛ سایر تنظیمات سرویس، پورتها، volumeها و پیکربندی خود را حفظ کنید:

```yaml
networks:
  default:
    enable_ipv6: true
```

برای یک شبکه نامگذاریشده، IPv6 را روی شبکهای فعال کنید که سرویس واقعاً به آن متصل میشود. Docker میتواند
یک زیرشبکه ULA تخصیص دهد؛ فقط زمانی یک زیرشبکه صریح و بدون همپوشانی انتخاب کنید که شبکه شما
به آن نیاز دارد. به [شبکه IPv6 در Docker](https://docs.docker.com/engine/daemon/ipv6/)
و [گزینههای شبکه Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) مراجعه کنید.

در یک **image مبتنی بر glibc**، فایل `/etc/gai.conf` میتواند نحوه انتخاب آدرس را تغییر دهد. Dockerfile فعلی
مخزن از Debian استفاده میکند؛ imageهای سفارشی مبتنی بر musl از این سازوکار استفاده نمیکنند.
تغییر گزارششده، برچسب ULA را از `label fc00::/7 6` به
`label fc00::/7 1` تغییر میدهد. کار را از جدول کامل سیاستهای image آغاز کنید و سایر
ورودیهای آن را حفظ کنید: افزودن یک ورودی `label` یا `precedence` جدول پیشفرض را جایگزین میکند، بنابراین فایلی
که فقط شامل خط تغییریافته باشد کافی نیست.
[مرجع پیکربندی glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
این رفتار را مستند کرده است. فایل بازبینیشده را بهصورت فقطخواندنی در `/etc/gai.conf`
bind-mount کنید و برای اعمال آن، سرویس را دوباره ایجاد کنید.

این کار نحوه انتخاب آدرس سیستمعامل را برای **تمام ترافیک خروجی آن کانتینر** تغییر میدهد.
این تغییر، همه برنامهها را مجبور به انتخاب IPv6 نمیکند: ترتیب DNS و انتخاب اتصال در Node
نیز مؤثر هستند. بهطور خاص، `--dns-result-order=ipv4first`، IPv4 را ترجیح میدهد و
راهحلی برای خرابی ناشی از استفاده انحصاری از IPv4 نیست. به [ترتیب DNS در Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) مراجعه کنید.

پس از هر تغییر در سطح میزبان، Gemini و سایر ارائهدهندگان خود را دوباره آزمایش کنید. برای بازگردانی،
mount سفارشی `gai.conf` را حذف کنید، پیکربندی قبلی شبکه را بازیابی کنید و
سرویس/شبکه متأثرشده را در یک بازه نگهداری دوباره ایجاد کنید. ایجاد مجدد یک شبکه
ممکن است عملکرد سایر کانتینرهای متصل به آن را مختل کند؛ volume دادههای ماندگار را حذف نکنید.

## نکات مهم

- **حالت WAL در SQLite:** باید اجازه دهید `docker stop` کامل شود تا OmniRoute بتواند آخرین تغییرات را در `storage.sqlite` ثبت کند. فایلهای Compose ارائهشده از قبل یک دوره مهلت توقف 40 ثانیهای تنظیم کردهاند. اگر ایمیج را مستقیماً اجرا میکنید، `--stop-timeout 40` را حفظ کنید.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اگر پشتیبانگیریهای دورهای/پیش از نوشتن بهصورت خارجی مدیریت میشوند، آن را روی `true` تنظیم کنید. مهاجرت پایگاههای داده موجود همچنان به یک اسنپشات ایمنی پایدار مختص خود و محافظ مهاجرت انبوه نیاز دارد.
- **ماندگاری دادهها:** همیشه یک ولوم را در `/app/data` مانت کنید تا پایگاه داده، کلیدها و پیکربندیهای شما پس از راهاندازی مجدد کانتینر حفظ شوند.
- **پیکربندی پورت:** برای تغییر پورت پیشفرض `20128`، متغیر محیطی `PORT` را بازنویسی کنید.

## همچنین ببینید

- [راهنمای استقرار VM](../ops/VM_DEPLOYMENT_GUIDE.md) — راهاندازی VM + nginx + Cloudflare
- [راهنمای استقرار Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — استقرار در Fly.io
- [پیکربندی محیط](../reference/ENVIRONMENT.md) — مرجع کامل `.env`
