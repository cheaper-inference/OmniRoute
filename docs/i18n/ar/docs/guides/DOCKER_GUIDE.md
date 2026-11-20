# 🐳 Docker Guide — OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> مرجع كامل لنشر Docker. للبدء السريع، راجع [قسم Docker في README](../README.md#-docker).

## جدول المحتويات

- [التشغيل السريع](#quick-run)
- [باستخدام ملف البيئة](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ملفات التعريف المتاحة](#available-profiles)
- [تهيئة أدوات CLI على المضيف عند تشغيل OmniRoute داخل Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [حاوية Redis الجانبية](#redis-sidecar)
- [Compose للإنتاج](#production-compose)
- [مراحل Dockerfile](#dockerfile-stages)
- [متغيرات البيئة المهمة](#critical-environment-variables)
- [Docker Compose مع Caddy ‏(HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [نفق Cloudflare السريع](#cloudflare-quick-tunnel)
- [وسوم الصور](#image-tags)
- [تحديثات لوحة المعلومات في Docker](#dashboard-updates-in-docker)
- [التوافر: إعداد SQLite الافتراضي أحادي النسخة](#availability-default-sqlite-is-single-replica)
- [أخطاء Gemini الإقليمية داخل Docker](#gemini-regional-errors-inside-docker)
- [ملاحظات مهمة](#important-notes)

---

## تشغيل سريع

> **المضيف الذاتي في أمر واحد؟** راجع [دليل المضيف الذاتي](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (الصورة المنشورة + Redis، استرجاع فقط، لا يوجد خيار للملف الشخصي). التشغيل السريع أدناه هو مسار الحاوية الواحدة للمستخدمين الذين يقومون بالفعل بتشغيل Redis في مكان آخر.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## مع ملف البيئة

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# ملف التعريف الأساسي (من دون أدوات CLI)
docker compose --profile base up -d

# ملف تعريف CLI‏ (Claude Code وCodex وOpenClaw مضمّنة)
docker compose --profile cli up -d

# ملف تعريف المضيف (موجّه أساسًا إلى Linux؛ يوصّل ملفات CLI التنفيذية من المضيف للقراءة فقط)
docker compose --profile host up -d

# ملف تعريف الويب (Chromium/Playwright لموفّري جلسات الويب)
docker compose --profile web up -d

# الجمع بين CLI وحاوية CLIProxyAPI الجانبية
docker compose --profile cli --profile cliproxyapi up -d
```

## ملفات التعريف المتاحة

يوفّر OmniRoute ملفات تعريف Compose لأشكال النشر الرئيسية. اختر الملف الذي يلائم بيئتك.

| ملف التعريف      | الخدمة           | متى يُستخدم                                                                                                                                            | الأمر                                        |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (افتراضي) | `omniroute-base` | خادم بلا واجهة رسومية / بيئة تشغيل مصغّرة، من دون أدوات CLI خاصة بموفّري الخدمة مضمّنة                                                                 | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | تدفقات عمل وكيلة تستدعي `omniroute providers/setup/doctor` وأدوات CLI المضمّنة (Codex وClaude Code وDroid وOpenClaw)                                   | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | مضيفو Linux الذين يريدون وصولًا شبيهًا بـ `network_mode` إلى أدوات CLI على المضيف عبر توصيل `~/.local/bin` و`~/.codex` و`~/.claude` وغيرها للقراءة فقط | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | تشغيل حاوية [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) الجانبية على المنفذ `8317` لاستخدام وكيل CLI في المنبع                         | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | موفّرو جلسات الويب الذين يحتاجون إلى متصفح: `gemini-web` و`claude-web` و`claude-turnstile` (يبني `runner-web`، ويتضمن Chromium)                        | `docker compose --profile web up -d`         |

> يمكن الجمع بين عدة ملفات تعريف: `docker compose --profile cli --profile cliproxyapi up -d`.

## تهيئة أدوات CLI على المضيف عند تشغيل OmniRoute في Docker

تكتب الأوامر `omniroute setup-codex` و`setup-claude` و`config set <tool>` وزر
**حفظ الإعدادات** في لوحة المعلومات جميعها ملفات مثل `~/.codex/*.config.toml`. ولا يكون لهذه المسارات
معنى إلا على الجهاز الذي تعمل عليه واجهة CLI فعليًا. إذا شغّلتها داخل
الحاوية، فستتم الكتابة في المجلد الرئيسي الخاص بالحاوية (`/home/node` —
إذ تعمل الصورة باستخدام `USER node`)، حيث لن تقرأها أي أداة CLI على المضيف مطلقًا، كما ستُحذف
بمجرد إعادة إنشاء الحاوية.

يكتشف OmniRoute ذلك ويرفض الكتابة مع عرض إرشادات بدلًا من
الإبلاغ عن نجاح لا يمكنك الاستفادة منه: تخرج واجهة CLI بالرمز `2`، وتستجيب API بالرمز `422`
مع `containerEphemeralTarget: true`.

### موصى به: شغّل واجهة CLI على المضيف وOmniRoute داخل Docker

توفّر الحاوية API، بينما تهيّئ واجهة CLI أدوات المضيف.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # وجّه واجهة CLI إلى الحاوية
omniroute setup-codex                      # يكتب في ~/.codex الفعلي على مضيفك
```

هذا هو الخيار الصحيح عندما تعمل Codex أو Claude Code أو Cursor أو أدوات مشابهة على
حاسوبك المحمول — وهو الإعداد المعتاد.

### بديل: اربط مجلدات إعدادات المضيف (`host` profile)

إذا أردت أن تكتب الحاوية نفسها إعدادات المضيف، فاربط
المجلدات داخلها ووجّه `CLI_CONFIG_HOME` إلى جذر نقطة الربط. يقوم ملف التعريف `host`
بذلك بالفعل:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ربط المجلد هو ما يجعل المسار موثوقًا: يقرأ OmniRoute
`/proc/self/mountinfo` ويسمح بالكتابة في المسارات المرتبطة (وكذلك في المجلدات
التي تكون مجلداتها الفرعية نقاط ربط، وهو بالضبط شكل `/host-home` أعلاه)، مع
استمراره في رفض المسارات غير المرتبطة.

### مخرج طوارئ: هيّئ أدوات CLI الخاصة بالحاوية نفسها (استخدمه باعتدال)

عندما تكون أدوات CLI موجودة فعلًا داخل الحاوية (ملف التعريف `cli`)، تكون الكتابة
مقصودة. مرّر `--allow-container-write` إلى أي أمر `setup-*`، أو عيّن
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` للخادم. ستتم الكتابة
مع تحذير بأنها لن تبقى بعد زوال الحاوية.

> **تحذير أمني — ملف التعريف `cli` + ربط `docker.sock`.**
> يربط ملف التعريف `cli` المسار `/var/run/docker.sock` لكي يتمكن
> محدّث الحاوية التلقائي من إعادة إنشاء الحزمة عبر برنامج Docker الخفي على المضيف
> (يتحقق `src/lib/system/autoUpdate.ts` من وجود ذلك المقبس ويتجاوز
> مسار Docker عند غيابه). يُعد ذلك المقبس **حد ثقة بصلاحيات root على
> المضيف**: فأي شيء يمكنه الوصول إليه يستطيع التحكم في برنامج Docker الخفي على المضيف
> بصلاحيات root — ويمكنه إنشاء أي حاوية على المضيف وفحصها وإيقافها وإزالتها.
> الآثار المترتبة:
>
> 1. **لا تكشف مطلقًا منفذ ملف التعريف `cli` للشبكة.** انشره
>    على `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — إذ إن إتاحة ملف التعريف `cli` عبر الشبكة المحلية تحوّل أي ثغرة RCE على مستوى لوحة المعلومات إلى
>    اختراق كامل للمضيف.
> 2. **لا تربط أي مجلدات إضافية من المضيف بملف التعريف `cli`.**
>    يمنح مقبس Docker مع أي ربط إضافي الحاوية صلاحية كاملة
>    للقراءة والكتابة في نظام ملفاتك وإعدادات المضيف. إذا احتجت إلى أن تتمكن أداة من
>    رؤية مشروع، فشغّلها محليًا باستخدام ملف CLI التنفيذي — ولا تربط المشروع
>    بحاوية `cli`.
>
> إذا لم تكن بحاجة إلى التحديث التلقائي من داخل الحاوية، فلا تفعّل ملف التعريف `cli`
> (`COMPOSE_PROFILES=core,redis` أو صيغة أقصر). لا تربط ملفات التعريف الأخرى
> مقبس Docker.
>
> راجع `docs/security/MITM-TPROXY-DECRYPT.md` (ضمن git؛ غير مضمّن في `/docs`) للاطلاع على نموذج التهديد ذي الصلة
> المتعلق بهجمات MITM، و`docs/security/SUPPLY_CHAIN.md` للاطلاع على
> سلسلة مصدر الملفات التنفيذية `codex`/`claude-code`/`droid`/`openclaw`.

## حاوية Redis الجانبية

يعتمد OmniRoute على Redis لدعم محدِّد المعدل الموزّع وذاكرة التخزين المؤقت المشتركة. تكون خدمة `redis` **مُعرَّفة دائمًا** في `docker-compose.yml` (ولا تخضع لأي ملف تعريف)، وتبدأ إلى جانب أي ملف تعريف آخر.

| التفصيل                  | القيمة                                            |
| ------------------------ | ------------------------------------------------- |
| الصورة                   | `redis:7-alpine`                                  |
| اسم الحاوية              | `omniroute-redis`                                 |
| المنفذ الداخلي           | `6379`                                            |
| منفذ المضيف (تجاوز)      | `REDIS_PORT` (القيمة الافتراضية `6379`)           |
| عنوان ربط المضيف (تجاوز) | `REDIS_BIND_HOST` (القيمة الافتراضية `127.0.0.1`) |
| وحدة التخزين             | `omniroute-redis-data` → `/data`                  |
| فحص السلامة              | `redis-cli ping` (بفاصل زمني قدره 10 ثوانٍ)       |

متغيرات البيئة ذات الصلة:

- `REDIS_URL` — سلسلة الاتصال التي يتم حقنها في التطبيق (`redis://redis:6379` افتراضيًا).
- `REDIS_PORT` — تعيين المنفذ على جانب المضيف لحاوية Redis.
- `REDIS_BIND_HOST` — واجهة المضيف التي يُنشر عليها المنفذ. القيمة الافتراضية هي `127.0.0.1`.

> **سبب استخدام عنوان الاسترجاع الحلقي افتراضيًا:** تعمل الحاوية الجانبية من دون `requirepass`، وتصل
> حاويات التطبيق إليها عبر شبكة compose (`redis:6379`) — والمنفذ المنشور موجود فقط
> لأدوات جانب المضيف (`redis-cli`، أو تشغيل `npm run dev` محليًا). سيؤدي النشر على
> `0.0.0.0` إلى كشف Redis غير مصادق عليه لكل مضيف على شبكتك المحلية. إذا عيّنت
> `REDIS_BIND_HOST=0.0.0.0`، فأضف أيضًا `--requirepass` إلى `command:` الخاص بالخدمة.

لا يُنصح **بتعطيل Redis** (سيتراجع محدِّد المعدل إلى آلية احتياطية تعمل في الذاكرة). إذا اضطررت إلى ذلك، فأزِل/علّق كتلة خدمة `redis:` في `docker-compose.yml` أو اضبط عدد نسخها على صفر:

```bash
docker compose up -d --scale redis=0
```

## Compose للإنتاج

لإنشاء نسخة إنتاج معزولة تعمل إلى جانب بيئة التطوير، استخدم `docker-compose.prod.yml`.

| التفصيل                       | القيمة                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| الملف                         | `docker-compose.prod.yml`                                                           |
| منفذ لوحة المعلومات الافتراضي | `PROD_DASHBOARD_PORT=20130` (مُعيَّن إلى المنفذ الداخلي `${DASHBOARD_PORT:-20128}`) |
| منفذ API الافتراضي            | `PROD_API_PORT=20131`                                                               |
| الصورة                        | `omniroute:prod` (مُنشأة من الهدف `runner-cli`)                                     |
| حاوية Redis                   | `omniroute-redis-prod` (`redis:8.6.2`، مع وحدة تخزين مخصصة `redis-prod-data`)       |
| وحدة تخزين البيانات           | `omniroute-prod-data` (مُسمّاة، وتستمر عبر عمليات إعادة البناء)                     |
| فحوصات السلامة                | `node healthcheck.mjs` + `redis-cli ping`، مع تقييد `depends_on` بسلامة Redis       |

كيفية الاستخدام:

```bash
# بناء حزمة الإنتاج وتشغيلها
docker compose -f docker-compose.prod.yml up -d --build

# بث السجلات
docker compose -f docker-compose.prod.yml logs -f

# إيقاف الحزمة وإزالتها (مع الاحتفاظ بوحدات التخزين)
docker compose -f docker-compose.prod.yml down
```

تعمل حزمة الإنتاج بالتوازي مع إعداد compose الخاص بالتطوير (بأسماء حاويات ومنافذ ووحدات تخزين مختلفة)، لذا يمكنك مواصلة التطوير محليًا بينما تظل بيئة الإنتاج قيد التشغيل.

## مراحل ملف الإرساء

يشحن المستودع ملف Dockerfile متعدد المراحل (`Dockerfile`). يتم الكشف عن أربع مراحل. اختر `target` المناسب لحالة الاستخدام الخاصة بك.

| منصة          | الصورة الأساسية       | غاية                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | تثبيت deps (`npm ci --legacy-peer-deps`) وتشغيل `npm run build` (Turbopack بشكل افتراضي — راجع موارد وقت البناء أدناه)                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | وقت تشغيل الإنتاج مع إخراج Next.js المستقل.** لا يوجد مزود CLIs المجمعة.**                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | ويضيف `git`، `docker.io`، `docker-compose` و CLIs العالمية: `@openai/codex`، `@anthropic-ai/claude-code`، `droid`، `openclaw`.** اختر هذا لسير عمل الوكيل.**                                                                                   |
| `runner-web`  | `runner-base`         | يضيف Playwright + متصفح Chromium (`--with-deps`) لموفري جلسات الويب: `gemini-web`، `claude-web`، `claude-turnstile`.** اختر هذا عند استخدام هؤلاء المزودين** — تفشل الصورة العادية في وقت الطلب بدونها (راجع ملاحظة `-web` ضمن قنوات الإصدار). |

بناء هدف محدد يدويًا:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### موارد وقت البناء

تتحكم ثلاث وسيطات بناء في تكلفة مرحلة `builder`. إنها وقت البناء فقط — `OMNIROUTE_MEMORY_MB` (أدناه) عبارة عن مقبض منفصل لوقت التشغيل.

| بناء الوسيط                 | تقصير  | تأثير                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | يتم إنشاء `0` باستخدام حزمة الويب: ذاكرة ذروة أقل، وأبطأ. `1` يختار Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | سقف كومة V8 (`--max-old-space-size`) لل `next build` المولد.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | يغذي `CIRCLE_NODE_TOTAL`; التالي يشتق `workers = N - 1` لجمع بيانات الصفحة.    |

`OMNIROUTE_BUILD_WORKERS` هو الذي يرفع على بناء كبير وهو الذي يشتبه عندما يموت بناء مقيد** بعد** `✓ Compiled successfully`. كل عامل لبيانات الصفحة هو عملية خاصة به، وكذلك الأمر بالنسبة للأصل `next build` نفسه؛ قام إعادة إنتاج VPS مباشر (الإصدار #7518) بقياس ذروة RSS لكل عملية عند ~ 4.5 GB بشكل مستقل عن علامة `NODE_OPTIONS` الكومة (يجمع Turbopack في ذاكرة native/Rust خارج كومة V8). تم تحديد الحجم الافتراضي لـ `2` (عامل → 1، وإجمالي عمليتين) لـ 16 GB / 4 vCPU التي تستضيفها GitHub والتي يستخدمها خط أنابيب النشر. في `8` (→ 7 عاملين) نفدت ذاكرة هذا العداء وفشل buildkit في الخطوة مع `ResourceExhausted: ... cannot allocate memory`؛ لا يزال `3` (عاملو → 2) غير مناسب بمجرد قياس RSS لكل عملية بشكل مباشر بدلاً من الاستدلال عليه. يقوم `tests/unit/docker-build-memory-budget.test.ts` بإجراء العمليات الحسابية مقابل الرقم المُقاس ويفشل إذا تجاوز أي من المقبضين حجم العداء.

يتم تجميع Turbopack في ذاكرة Rust الأصلية التي تعيش** الخارج** كومة V8، لذلك لا يربطها `OMNIROUTE_BUILD_MEMORY_MB`. على مضيف بسقف ذاكرة، يتم بعد ذلك إنشاء SIGKILLed بواسطة القاتل OOM مع عدم وجود نص خطأ على الإطلاق — فهو يتوقف ببساطة في منتصف `Creating an optimized production build`، والذي يُقرأ مثل تعليق وليس نفاد الذاكرة. هذا هو السبب وراء تعيين `Dockerfile` افتراضيًا على webpack (`OMNIROUTE_USE_TURBOPACK=0`) ، على عكس `npm run dev` / `npm run build`، حيث Turbopack هو الرمز الافتراضي: `docker build .` المجرد بدون وسيطات البناء (ما يتم تشغيله بواسطة Railway والمضيفين الآخرين بنقرة واحدة) يجب ألا يموت بصمت على منشئ ذو ذاكرة محدودة. الصور المنشورة تمر بالفعل `OMNIROUTE_USE_TURBOPACK=0` بشكل صريح في `docker-publish.yml`. في منشئ يحتوي على الكثير من RAM، قم باختيار Turbopack لبناء أسرع:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

تم تمكين `webpackBuildWorker` ، لذلك يقوم `next build` بتشغيل أحد الوالدين** و** عملية عاملة وكل منها يكرم `OMNIROUTE_BUILD_MEMORY_MB` على حدة. حجم سقف الحاوية أعلى من ضعف هذه القيمة تقريبًا، وليس مرة واحدة.

تقاس على هذه الشجرة (`--target runner-base`، `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| المجمع    | سقف الحاوية    | نتيجة                           |
| --------- | -------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB | قتل OOM في كليهما، بصمت         |
| webpack   | 8 GiB          | بناء عامل SIGKILLed             |
| webpack   | 12 GiB         | نجحت، وبلغت ذروتها عند 11.1 GiB |

### افتراضيات وقت التشغيل

الافتراضيات التي تم تصديرها بواسطة `runner-base`: `PORT=20128`، `HOSTNAME=0.0.0.0`، `OMNIROUTE_MEMORY_MB=1024`، `NODE_OPTIONS=--max-old-space-size=1024`، `DATA_DIR=/app/data`، `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

سلوك الذاكرة في Docker:

- الصورة تحدد `OMNIROUTE_MEMORY_MB=1024` وتستمد `NODE_OPTIONS=--max-old-space-size=1024` منها.
- تبدأ عملية الخادم الفعلية بواسطة المشغل المستقل، الذي يقرأ `OMNIROUTE_MEMORY_MB` ويُلحق `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- تستخدم العقدة آخر قيمة `--max-old-space-size` متكررة، لذا فإن إعداد `OMNIROUTE_MEMORY_MB` يتحكم في الحد الفعال لكومة Docker.
- نظرًا لأن الصورة تحددها دائمًا، فإن الإجراء الاحتياطي الخاص بمعايرة ذاكرة الوصول العشوائي (RAM) الخاص بالمشغل لا ينطبق أبدًا ضمن Docker. ارفعه بشكل صريح لحجم العمل (الجدول أدناه). `2048` لا يزال صغيرًا جدًا بالنسبة لعامل التشفير `/v1/responses`.

### وقت التشغيل RAM لوكلاء الترميز

الإعداد الافتراضي 1 GiB Docker هو أرضية dashboard/light-chat ، وليس حجم الإنتاج. تحتفظ أجسام `POST /v1/responses` الطويلة (مئات الرسائل وعشرات الأدوات) برسوم بيانية متعددة في الذاكرة أثناء الضغط. قام طلبان متداخلان من ~ 3 MiB / ~ 750k-token بإلغاء V8 عند** 12 GiB** المساحة القديمة (`FATAL ERROR: Reached heap limit`) وضربت أيضًا 16 GiB cgroup OOM. انظر [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

مقاس** cgroup `--memory` فوق الكومة** توجد المخازن المؤقتة الأصلية — و SQLite ووسيطات الضغط خارج V8.

| عبء العمل                           | `OMNIROUTE_MEMORY_MB`      | الحاوية / المجموعة | ملحوظات                                                                              |
| ----------------------------------- | -------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| لوحة القيادة، دردشة خفيفة واحدة     | `1024` (الصورة الافتراضية) | ≥2 GiB             |                                                                                      |
| وكيل ترميز واحد (Claude/Codex/Grok) | `8192`                     | ≥10 GiB            | `/v1/responses` نموذجي لجلسة واحدة                                                   |
| `/v1/responses` طويلتان متزامنتان   | `10240`–`12288`            | ≥12–16 GiB         | إحباط V8 المُقاس عند ~ 12 GiB                                                        |
| ثلاثة سياقات طويلة متزامنة +        | لا على عملية واحدة         | تسلسل / المزيد RAM | القبول الافتراضي للوزن الثقيل هو 1 على متن الطائرة؛ رفعه بدون RAM يعيد تقديم الإجهاض |

يقوم `omniroute serve` على المعدن العاري بمعايرة ~ 35% من RAM ( `[512, 4096]` المثبت) عندما يكون `OMNIROUTE_MEMORY_MB`** غير محدد** . يقوم Docker دائمًا بتعيين `1024`، بحيث لا تعمل المعايرة أبدًا في الصورة الرسمية.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## متغيرات البيئة الحرجة

بالإضافة إلى القيم الافتراضية الموثّقة في [ENVIRONMENT.md](../reference/ENVIRONMENT.md)، تُعد المتغيرات التالية الأكثر أهمية عند التشغيل ضمن Docker:

| المتغير                       | الغرض                                                                                                                                                                                                                                                                       | القيمة الافتراضية      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | السر المشترك لجسر WebSocket. **مطلوب في بيئة الإنتاج** — عيّنه إلى سلسلة عشوائية قوية.                                                                                                                                                                                      | غير معيّن (يجب توفيره) |
| `REDIS_URL`                   | سلسلة الاتصال بالخلفية المستخدمة لمحدد المعدل / ذاكرة التخزين المؤقت                                                                                                                                                                                                        | `redis://redis:6379`   |
| `REDIS_PORT`                  | المنفذ من جانب المضيف لحاوية Redis المضمّنة                                                                                                                                                                                                                                 | `6379`                 |
| `REDIS_BIND_HOST`             | واجهة المضيف التي يُنشر عليها منفذ Redis المضمّن (واجهة الاسترجاع ما لم تُضِف AUTH)                                                                                                                                                                                         | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | مسار المضيف المركّب في ملف التعريف `cli` عند `/workspace/omniroute` لعمليات التحديث الذاتي                                                                                                                                                                                  | `.` (الدليل الحالي)    |
| `OMNIROUTE_MEMORY_MB`         | الحد الأقصى لكومة Node في وقت التشغيل لخادم Docker المستقل؛ يتجاوز القيمة الافتراضية للصورة المذكورة أعلاه. وكلاء البرمجة: `8192`+ (راجع [ذاكرة RAM في وقت التشغيل](#runtime-ram-for-coding-agents)).                                                                       | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | تجاوز المنافذ المكشوفة للوحة المعلومات (20128) وواجهة API ‏(20129)                                                                                                                                                                                                          | `20128` / `20129`      |
| `APP_BIND_HOST`               | واجهة المضيف التي ينشر docker-compose عليها منافذ لوحة المعلومات/API/‏WS المباشر. عند استخدام `REQUIRE_API_KEY=false` (وهو الإعداد الافتراضي)، تكشف `0.0.0.0` وكيل `/v1` المجهول للشبكة المحلية — لا توسّع النطاق إلا مع `REQUIRE_API_KEY=true` أو عند وضع وكيل عكسي أمامه. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | واجهة المضيف التي ينشر docker-compose عليها الخدمة الجانبية `cliproxyapi` — يحتوي مجلد بياناتها على بيانات اعتماد المزوّد.                                                                                                                                                  | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | الدليل الذي يفحصه ماسح الإضافات في وقت التشغيل وتُثبّت الإضافات فيه. عيّنه عند تركيب الإضافات عبر ربط المجلدات: يتبع الإعداد الافتراضي `HOME`، والذي قد لا تصدّره الصورة.                                                                                                   | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | المسار الفرعي لعنوان URL عند نشر التطبيق خلف وكيل عكسي (مثل `/omniroute`)                                                                                                                                                                                                   | _(فارغ = الجذر)_       |
| `NEXT_PUBLIC_BASE_URL`        | أصل المتصفح العام متضمنًا المسار الفرعي (مثل `https://host/omniroute`)                                                                                                                                                                                                      | غير معيّن              |
| `PROD_DASHBOARD_PORT`         | منفذ لوحة المعلومات من جانب المضيف للملف `docker-compose.prod.yml`                                                                                                                                                                                                          | `20130`                |
| `CLIPROXYAPI_PORT`            | المنفذ من جانب المضيف للخدمة الجانبية `cliproxyapi`                                                                                                                                                                                                                         | `8317`                 |

## الوكيل العكسي على المسار الفرعي (Traefik / nginx)

يتم تجميع Next.js `basePath` في الحزمة المستقلة. يسجل OmniRoute القيمة المخبوزة في ملف الحارس في جذر التطبيق (المكتوبة أثناء `npm run build`؛ المقروءة بواسطة `scripts/docker/ensure-docker-base-path.mjs`) ويقارنها بـ `OMNIROUTE_BASE_PATH` عند بدء تشغيل الحاوية. عندما تختلف ويتم إنشاء الصورة لجذر المجال، تعيد نقطة الإدخال كتابة البيانات المستقلة، وأحرف `basePath`/`assetPrefix` المضمنة (يعرض 16 التالي أصل SSR URLs من `assetPrefix` وحده — ويعكس جهاز التصحيح المسار الفرعي فيه)، وأصل `/_next/static` المخبوز URLs (بيانات مرجع العميل، وواردات الوسائط، وصفحات الخطأ المعروضة مسبقًا) والعميل `process.env` shim قبل تشغيل `node dev/run-standalone.mjs`.

### إنشاء البنية (مستحسن)

قم بتعيين كلا المتغيرين في `.env`، ثم أعد البناء بحيث تتوافق الصورة ووقت التشغيل:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

يقوم `docker-compose.yml` بإعادة توجيه `OMNIROUTE_BASE_PATH` باعتباره وسيط إنشاء Docker وكمتغير بيئة وقت التشغيل.

### المسار الفرعي لوقت تشغيل الصورة الجذرية + المبني مسبقًا

تم تصميم صور `cheaperinference/omniroute:*` المنشورة لجذر المجال. لا يزال بإمكانك ضبط `OMNIROUTE_BASE_PATH` في وقت التشغيل؛ تقوم الحاوية بتصحيح الحزمة مرة واحدة عند بدء التشغيل. قم بإقرانه بالأصل العام المطابق:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

قم بتكوين الوكيل العكسي لإعادة توجيه الملف** ممتلىء** المسار الخارجي (لا تجرد البادئة). يجب على Traefik توجيه `PathPrefix(`/omniroute `)` إلى الحاوية بدون `StripPrefix`، لذلك يتلقى Next.js `/omniroute/...` ويخدم الأصول من `/omniroute/_next/...`.

يقوم فحص الصحة Docker بالتحقق من نقطة نهاية دورة حياة `/healthz` خفيفة الوزن والمسبوقة بـ `OMNIROUTE_BASE_PATH` النشط. يظل `/api/monitoring/health` متاحًا لتشخيصات human/dashboard ؛ لتوجيه الحاوية HEALTHCHECK إليها مرة أخرى (على سبيل المثال لتطبيق الصحة العميقة)، قم بتعيين `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. هذا المسار هو** عميق** تحقق من (ملخص مراقبة DB + ) — المناسب لـ `HEALTHCHECK` غير المتكرر لـ Docker إذا قمت بإعادة الاشتراك، ولكن** لا** لفترات Kubernetes `livenessProbe`.

بالنسبة للمنسقين (Kubernetes وNomad وما إلى ذلك):

| دقق                   | يفضل                                                                    | يتجنب                                                           |
| --------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| حيوية                 | HTTP `GET /livez` أو TCP على المنفذ الرئيسي (`PORT`، `20128` الافتراضي) | `/api/monitoring/health` كالحيوية                               |
| استعداد               | HTTP `GET /healthz`                                                     | المهلات الضيقة التي تتعامل مع حلقة الحدث المزدحمة على أنها ميتة |
| عميق / الصندوق الأسود | `/api/monitoring/health`                                                | —                                                               |

دورة حياة عملية تقارير `/healthz` (`ok` / `starting` / `stopping`). `/livez` عملية حية فقط (200 عندما يتمكن المعالج من التشغيل؛ ولا ينتظر الاستعداد). لا يزال كلاهما يعملان على نفس حلقة حدث العقدة مثل معالجة الطلب، لذا فإن الكتالوج المرتبط بوحدة المعالجة المركزية أو عمل الضغط يمكن أن يؤخرهما — مشغول ≠ ميت. تفضل حيوية TCP إذا انتهت مهلة تحقيقات HTTP. إرشادات التحقيق الكاملة: [دليل المراقبة توصيات مسبار — Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker يؤلف مع العلبة (HTTPS Auto-TLS)

يمكن كشف OmniRoute بشكل آمن باستخدام توفير SSL التلقائي الخاص بـ Caddy. تأكد من أن سجل DNS A الخاص بمجالك يشير إلى IP الخاص بخادمك.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
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

يقوم Caddy بتعيين رؤوس إعادة التوجيه القياسية للحاوية الأولية. يستخدم OmniRoute `NEXT_PUBLIC_BASE_URL` باعتباره الأصل العام الأساسي لعمليات الاسترجاعات OAuth والروابط العامة التي تم إنشاؤها؛ تستخدم عمليات كتابة لوحة المعلومات المصادق عليها طلبات من نفس المصدر بالإضافة إلى حماية CSRF المرتبطة بالجلسة. قم بتمكين `OMNIROUTE_TRUST_PROXY` فقط لعمليات النشر المتقدمة حيث تريد عمدًا أن يشتق OmniRoute الأصل العام من الرؤوس المعاد توجيهها الموثوقة بدلاً من التكوين الصريح.

## نفق Cloudflare السريع

يتضمن دعم لوحة المعلومات لعمليات نشر Docker خيار **Cloudflare Quick Tunnel** بنقرة واحدة ضمن `Dashboard → Endpoints`. عند التفعيل لأول مرة، يُنزَّل `cloudflared` عند الحاجة فقط، ويبدأ نفقًا مؤقتًا إلى نقطة النهاية الحالية `/v1`، ويعرض عنوان URL المُنشأ `https://*.trycloudflare.com/v1` مباشرةً أسفل عنوان URL العام المعتاد.

يمكن إظهار لوحات أنفاق نقاط النهاية (Cloudflare وTailscale وngrok) أو إخفاؤها من `Settings → Appearance` دون تغيير حالة النفق النشط.

### ملاحظات حول النفق

- عناوين URL الخاصة بالنفق السريع مؤقتة وتتغير بعد كل إعادة تشغيل.
- لا تُستعاد الأنفاق السريعة تلقائيًا بعد إعادة تشغيل OmniRoute أو الحاوية. أعد تفعيلها من لوحة المعلومات عند الحاجة.
- يدعم التثبيت المُدار حاليًا Linux وmacOS وWindows على `x64` / `arm64`.
- تستخدم الأنفاق السريعة المُدارة نقل HTTP/2 افتراضيًا لتجنب تحذيرات مخزن UDP المؤقت المزعجة الخاصة بـ QUIC في بيئات الحاويات محدودة الموارد. اضبط `CLOUDFLARED_PROTOCOL=quic` أو `auto` إذا كنت تريد وسيلة نقل مختلفة.
- تتضمن صور Docker جذور CA الخاصة بالنظام وتمررها إلى `cloudflared` المُدار، ما يمنع حالات فشل ثقة TLS عند بدء تشغيل النفق داخل الحاوية.
- اضبط `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` إذا كنت تريد أن يستخدم OmniRoute ملفًا تنفيذيًا موجودًا بدلًا من تنزيله.

## علامات الصورة

| صورة                         | علامة    | مقاس       | وصف                                             |
| ---------------------------- | -------- | ---------- | ----------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 ميجا | الأعلى** نشرت** SemVer مستقرة (وليس git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 ميجا | قم بتثبيت هذه الفئة من العلامات لـ GitOps       |

يتم نشر الصور نفسها في ثلاثة مستودعات، مع نفس الملخصات لكل بنية: `cheaperinference/omniroute` (Docker Hub، منظمة Cheaper Inference، بدءًا من 3.8.53 فصاعدًا)، و `ghcr.io/cheaper-inference/omniroute` والإرث القديم `diegosouzapw/omniroute`، الذي يحتفظ بسجل السحب الخاص به ولا يزال يتلقى كل إصدار. تستمر عمليات نشر `diegosouzapw/omniroute` الحالية في التحديث؛ تبديل اسم الصورة اختياري. يتم نشر قناة الإصدار التجريبي `:next` / `:next-web` أدناه على `diegosouzapw/omniroute` و GHCR فقط.

بيان متعدد المنصات: `linux/amd64` + `linux/arm64` الأصلي (Apple Silicon، AWS Graviton، Raspberry Pi). يقوم Docker بتحديد البنية المطابقة تلقائيًا؛ قم بتمرير `--platform linux/amd64` إذا كنت بحاجة إلى فرض مضاهاة AMD64 على مضيفات ARM.

### إطلاق القنوات

تنشر OmniRoute قنوات Docker منفصلة للإصدارات المستقرة واختبار فرع الإصدار النشط وبنيات التطوير.

| قناة                            | مصدر                              | التحولية                         | الاستخدام الموصى به                                                                                                       |
| ------------------------------- | --------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | الافراج Signed/versioned          | غير قابل للتغيير                 | عمليات نشر الإنتاج التي تثبت الإصدار الدقيق                                                                               |
| `:latest` / `:latest-web`       | الأعلى** نشرت** SemVer مستقرة     | مؤشر ثابت قابل للتغيير           | يتبع الإصدارات المستقرة** بعد** وظيفة نشر SemVer يفعلها —** لا** تتبع `main` أو التزامات `release/v*` التي لم يتم إصدارها |
| `:next` / `:next-web`           | فرع `release/v*` الافتراضي الحالي | مؤشر ما قبل الإصدار قابل للتغيير | إصلاحات الاختبار التي وصلت إلى فرع الإصدار النشط ولكنها لم تصل بعد إلى إصدار مستقر                                        |
| `:main` / `:main-web`           | فرع `main`                        | مؤشر تطوير قابل للتغيير          | اختبار التطوير والتكامل فقط                                                                                               |

#### موفرو جلسات الويب: صور `-web`

تتضاعف كل قناة أعلاه كعلامة `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`)، تم إنشاؤها من مرحلة `runner-web` — نفس الصورة بالإضافة إلى Playwright ومتصفح Chromium. سفن الصورة العادية** بدون** الكروم. `gemini-web` و `claude-web` و `claude-turnstile` في حاجة إليها.

يتم تأجيل الفشل، وليس وقت بدء التشغيل: يقوم هؤلاء الموفرون بإدراج نماذجهم ويظهرونها على أنها متصلة في لوحة المعلومات، ويفشل الطلب الأول فقط مع

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

إذا كنت تستخدم هؤلاء الموفرين، فاسحب علامة `-web` الخاصة بالقناة التي تتواجد فيها بالفعل على — ولن يتغير أي شيء آخر. في تثبيت npm/CLI (بدون صورة Docker )، فإن القطعة المفقودة المكافئة هي الملف الثنائي للمتصفح: قم بتشغيل `npx playwright install chromium` على المضيف.

#### استخدام قناة ما قبل الإصدار

يُعاد إنشاء قناة `next` عند كل دفعة إلى فرع `release/v*` الافتراضي الحالي ويتم نشرها لكل من AMD64 و ARM64. لا يمكن لفروع الصيانة الأقدم استبدالها. توفر القناة صورة قابلة للسحب للإصلاحات التي تم دمجها في فرع الإصدار النشط قبل قطع العلامة الثابتة التالية.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

بالنسبة إلى Docker Compose، قم بتجاوز علامة الصورة المستخدمة بواسطة ملف التعريف المحدد، ثم اسحب الخدمة وأعد إنشائها:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### السلامة والتراجع

`next` هي قناة عائمة للإصدار المسبق. قد يتغير عند أي دفعة إلى فرع الإصدار النشط وهو كذلك** غير معتمد للاستخدام في الإنتاج** . قم بتثبيت ملخص الصورة أثناء تقييم بنية معينة:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

قبل الاختبار، قم بعمل نسخة احتياطية من حجم بيانات OmniRoute أو دليل البيانات المثبت على الربط. للتراجع، قم باستعادة الإصدار الثابت الذي تم استخدامه سابقًا أو استوعب الحاوية وأعد إنشائها:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

لا يمكن أبدًا أن يقوم بناء فرع الإصدار بتحريك `latest`؛ فقط الإصدار الدلالي المستقر المؤهل يمكنه الترويج للمؤشر المستقر. تحتفظ صور `next` بفحص صورة الإصدار وحظر بوابة الضعف الحرجة.

**`latest` ليس ضمانًا للعملة لـ git.** الإصلاحات المدمجة على `main` أو على فرع `release/v*` النشط هي** لا** في `:latest` حتى يتم نشر صورة SemVer مستقرة وتقوم مهمة النشر بترويج `:latest` (نفس الملخص مثل SemVer). إذا بدا `latest` متجمدًا بينما يظهر GitHub الإصلاح بالفعل، فاسحب `:next` لاختبار فرع الإصدار أو انتظر علامة SemVer.

| تريد                                                    | يستخدم                         |
| ------------------------------------------------------- | ------------------------------ |
| GitOps / الإنتاج الذي يجب أن لا ينجرف                   | دبوس `:X.Y.Z` (أو ملخص الصورة) |
| اتبع الاسطبلات المنشورة واقبل إعادة الإنشاء في كل إصدار | `:latest`                      |
| اختبار التزامات `release/v*` التي لم يتم إصدارها        | `:next` (ليس الإنتاج)          |
| اختبار `main`                                           | `:main` (ليس الإنتاج)          |

## تحديثات لوحة المعلومات في Docker

لا يمكن لحاوية منشأة من صورة منشورة استبدال نفسها. عندما يكتشف OmniRoute أنه يعمل داخل
حاوية (من دون نسخة عمل `.git`، وليس كتثبيت npm)، تعرض لافتة التحديث في لوحة المعلومات الرئيسية
أمر المضيف المطلوب تشغيله بدلاً من تعليمات npm/git، مع زر للنسخ:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

يأتي اسم الخدمة من `AUTO_UPDATE_SERVICE` (القيمة الافتراضية `omniroute`، وهي الخدمة الموجودة في
`docker-compose.selfhost.yml`). لا ينقل `pull` سوى وسم متغير (`latest`، أو `next`)؛ أما مع وسم
مثبّت مثل `:X.Y.Z`، فعدّل الوسم أولاً.

### تحديثات بنقرة واحدة باستخدام ملف تشغيل على المضيف

لإبقاء **التحديث الآن** عاملاً من دون وصل `/var/run/docker.sock` (مما يمنح الحاوية
صلاحيات root على المضيف — راجع تحذير ملف تعريف `cli` أعلاه)، عيّن `DOCKER_UPDATE_TRIGGER_FILE` في
خدمة OmniRoute وشغّل مراقباً على المضيف:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

يجب أن يكون المسار داخل `DATA_DIR` (تُحل القيم النسبية استناداً إليه)؛ ويُرفض أي مسار آخر.
عندئذٍ يكتب **التحديث الآن** القيمة `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` في ذلك
الملف، ويستجيب بالرمز `202`، وتستطلع لوحة المعلومات `/api/system/version` إلى أن يصبح الإصدار الجديد
نشطاً ثم تعيد التحميل. لا يشغّل OmniRoute أي أمر shell أو Docker في هذا الوضع. وكما هي الحال مع كل
إجراءات التحديث، لا يُقبل الطلب إلا من عملاء loopback/LAN.

يوفّر دليل بيانات موصول عبر bind mount مساراً ثابتاً يمكن للمضيف مراقبته. فيما يلي وحدات `systemd`
نموذجية (عدّل `/srv/omniroute` ليطابق الدليل الذي يحتوي على ملف compose والمجلد `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=مراقبة طلبات تحديث OmniRoute الواردة من لوحة المعلومات

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=سحب حاوية OmniRoute وإعادة إنشائها

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

تزيل الخدمة الطلب قبل السحب كي لا تتكرر المحاولة عند فشل التشغيل. من دون
`DOCKER_UPDATE_TRIGGER_FILE`، تحتفظ لوحة المعلومات بمسار الأوامر اليدوي.

## التوفر: SQLite الافتراضي هو نسخة طبق الأصل واحدة

الأسهم Docker / Kubernetes OmniRoute هي** عملية عقدة واحدة + كاتب واحد SQLite** . التوافر العالي هو** غير معتمد** على تلك الطوبولوجيا.

| القيد                                       | عاقبة                                                                                                                                                                                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| كاتب واحد                                   | يفعل** لا** تشغيل نسخ متماثلة متعددة على نفس ملف SQLite. هذا يفسد DB.                                                                                                                                                                                                                   |
| إعادة إنشاء / إعادة تشغيل / قتل HEALTHCHECK | **انقطاع كامل** من SSE على متن الطائرة، وجلسات لوحة القيادة، وحالة الذاكرة. يسقط كل عميل متصل. تحصل الطلبات الجديدة خلال نافذة نقطة النهاية الفارغة على وكيل عكسي**`502 Bad Gateway: Unknown error`** ، وليس OmniRoute JSON - لا يمكن للعملاء التمييز بين هذا وبين فشل الموفر (#11015). |
| نفس حلقة الحدث مثل `/healthz`               | قد يؤدي الكتالوج المزدحم أو علامة الضغط إلى تأخير التحقيقات؛ مهلة قصيرة ثم إعادة تشغيل** فقط** نسخة طبق الأصل.                                                                                                                                                                          |

**مصفوفة التحقيق** (راجع أيضًا [توصيات مسبار Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| دقق          | هدف                                                        | لا تستخدم                                                       |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------------------- |
| حيوية        | TCP on `PORT` ( `20128` الافتراضي) أو soft HTTP `/healthz` | `/api/monitoring/health`                                        |
| استعداد      | HTTP `GET /healthz`                                        | المهلات الضيقة التي تتعامل مع حلقة الحدث المزدحمة على أنها ميتة |
| عميق / البشر | `/api/monitoring/health`                                   | حيوية kubelet الآلي                                             |

**الترقيات:** نتوقع أن تنخفض كل جلسة. استنزاف العملاء إذا استطعت؛ لا يوجد تحديث متجدد على SQLite الافتراضي. سيحل أيضًا Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` محل العملية الوحيدة عندما تكون الحاوية غير صحية - نفس نصف قطر الانفجار.

البيانات الجاهزة ومخطط Helm موجودان في `deploy/kubernetes/` و `deploy/helm/omniroute/` - راجع [دليل نشر Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

مقتطف Kubernetes لـ** نسخة طبق الأصل واحدة** (مطلوب إعادة الإنشاء؛ لا ترفع `replicas` مقابل ملف SQLite واحد):

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

يتيح `preStop` Sleep لـ kube إسقاط نقاط نهاية الخدمة قبل SIGTERM** جديد** توقف حركة المرور ضرب عملية الموت. يتم استنزاف `/v1/responses` SSE على متن الطائرة حتى `SHUTDOWN_TIMEOUT_MS` (30 ثانية افتراضية) عبر عقود إيجار القبول ذات الوزن الثقيل (#11015). الطلبات الجديدة التي لا تزال تصل إلى العملية تحصل على `503` + `Retry-After: 5`. تظل إعادة إنشاء فجوة نقطة النهاية الفارغة حتى يصبح الاستبدال جاهزًا بمثابة انقطاع قوي - وهذا هو هيكل SQLite ، وليس خطأ في تكوين المسبار.

Postgres الخارجية / متعدد الكاتب HA هو** لا** مسار المخزون الموثق. إذا كنت بحاجة إلى HA، فاحتفظ بنسخة متماثلة واحدة أو قم بتشغيل الهيكل الذي اختبره المشروع ووثقه بشكل منفصل. عمل Postgres/MySQL موجود في [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). حتى تلك السفن، هي الطريقة الوحيدة المدعومة للتكاثر** كبير** سعة `/v1/responses` هي N عمليات مستقلة (القسم التالي)، وليست `replicas > 1` في مجلد واحد.

## التوسع: N عمليات مستقلة

### ملكية دوران الرمز المميز Codex

يجب ألا تستهلك نسخ حساب Codex بشكل مستقل رمز التحديث المخصص للاستخدام الواحد. في المثيلات التي تستهلك بيانات الاعتماد المتزامنة فقط، قم بتعيين `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (الاسم المستعار `cx`). اتركه بدون ضبط على مالك الدوران الفردي. لا تزال كل عملية بحاجة إلى `DATA_DIR` الخاص بها؛ لا يشارك هذا الخيار SQLite ولا يوفر مزامنة الرمز المميز أو القفل الموزع.

يقوم المثيل الخامل بإعادة قراءة الاتصال عند الحاجة إلى التحديث ويعتمد فقط رمز وصول مختلفًا غير منتهي الصلاحية. وإلا فسيتم تعطيل التحديث دون انتهاء صلاحية الاتصال أو إلغاء تنشيطه أو حساب فشل قاطع التحديث. لا تزال حالات فشل المصادقة الأولية الحقيقية تستخدم محاسبة الفشل العادية، وفترة التباطؤ الأسية، وخطأ العميل العادي؛ يظل تعطيل الحساب دائمًا. قم بمزامنة الرموز المميزة التي تم تدويرها للمالك قبل انتهاء صلاحية رموز الوصول (مدة التحديث الاستباقي الافتراضية هي خمس دقائق)، أو أعد استيراد ملف مصادقة Codex. تقوم الواردات السلبية بتخزين الرموز المميزة المقدمة دون التحقق من صحتها عند نقطة نهاية الرمز المميز. يقوم التحديث اليدوي dashboard/API بإرجاع `409 refresh_disabled`؛ تسجيلات الدخول OAuth الجديدة لم تتغير. انظر [مرجع البيئة](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

عملية عقدة واحدة هي** كومة V8 واحدة** . اثنان متداخلان ~ 3 MiB / ~ 750k-token coding-agent `POST /v1/responses` (RTK + Caveman) يجهضان الكومة عند ~ 12 Gi (`FATAL ERROR: Reached heap limit`) ويمكنهما OOM a 16 Gi cgroup. انظر [رقم #7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). وهذا القياس هو أ** ميزانية الذاكرة** تحذير، ليس منتجًا بحد أقصى اثنين من `/v1/responses` طويلين متزامنين. يتم بوابات قبول الدردشة ذات الوزن الثقيل من خلال ميزانية استيعاب بايت مشتقة تلقائيًا (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، `src/shared/middleware/admissionBudget.ts`) بحجم من نفس سقف V8/cgroup — الذي يتجاوزها لأعلى (أو تعيين الحد الأقصى لعدد طلبات `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` القديم) في عملية بحجم بالفعل يعيد تقديم الإجهاض. الدردشات الصغيرة و `/healthz` و `/v1/models` و MCP هي** لا** في تلك القبعة.

### عملية واحدة: أكثر من `/v1/responses` طويلتين

أ** صحيح** العملية (الكومة أسفل `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`، `0.75` الافتراضي)** يمكن** قم بتشغيل أكثر من اثنين من `POST /v1/responses` الطويلين المتزامنين عندما لا يزال هناك مساحة لميزانية البايت على متن الطائرة على مستوى العملية (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). الهيئات عند `OMNIROUTE_CHAT_LARGE_BODY_BYTES` أو أعلى (افتراضي 256 KiB) تأخذ نفس عقد الإيجار الثقيل مثل الطلبات ذات البنية الثقيلة وتستخدم نفس [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). العشرات من عملاء SSE الطويلين المتزامنين (يحتاج المشغلون غالبًا إلى 40-50) هو أ** ميزانية الذاكرة** سؤال حجم — الكومة + primary/headroom فتحات + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ليس حدًا صارمًا للمنتج "max 2". لا تزال الكومة المضغوطة تتساقط مع `503` القابل لإعادة المحاولة، لذا لا يعود #7849.

ل** مضاعفة أكوام** (المساحات القديمة المستقلة V8)** اليوم** :

| يفعل                                                                                                                                                        | لا                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| يجري** ن containers/pods** ، ولكل منها** ملك** `DATA_DIR` / حجم                                                                                             | اضبط `replicas > 1` مقابل ملف SQLite واحد            |
| حجم كبير على متن الطائرة + صحي للرأس من ميزانية الكومة / البايت على متن الطائرة؛ 1–2 هو الإعداد الافتراضي المحافظ رقم #7849، وليس الحد الأقصى للمنتج الثابت | أعط عملية واحدة 8 × RAM وغطاء عدد غير محدود          |
| اختياري: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` لـ** عدادات الحصص المشتركة**                                                                  | تعامل مع Redis على أنه SQLite — مشترك، فهو ليس كذلك  |
| تكرار أسرار الموفر في كل مثيل (أو قبول لوحات المعلومات المقسمة)                                                                                             | توقع لوحة تحكم واحدة / سجل مكالمات واحد عبر المثيلات |
| أمام أي موازن أحمال؛ يكفي اللصق بواسطة مفتاح API أو الجلسة                                                                                                  | تتطلب برمجيات وسيطة مدركة للحجم خاصة بالبائع         |

يمكن أيضًا مشاركة تقارب الجلسة مع الحساب من خلال Redis: قم بتعيين `OMNIROUTE_SESSION_AFFINITY_STORE=redis` و `REDIS_URL` في كل عملية، باستخدام نفس `REDIS_KEY_PREFIX` وإعداد `sessionAffinityTtlMs` الإيجابي. تقوم الدبابيس بتحليل هويات حساب الاستخدام المجزأة إلى الاتصال المحلي المؤهل لكل عملية، لذلك لا تحتاج حسابات OAuth ذات البيانات التعريفية المطابقة للهوية إلى اتصال مطابق IDs. لهويات الحساب المعروفة الأسبقية على IDs المحلية المتناقضة في دقة الدبوس والإخلاء الخاضع للحراسة؛ تحتفظ السجلات بدون هوية (أو المتصلين بالإخلاء بدون هوية) بحارس ID القديم. لا تزال الحسابات التي ليس لها هوية استخدام مستقرة تتطلب مطابقة IDs. أخطاء Redis أو المكالمات التي تتجاوز 100 مللي ثانية ترجع إلى SQLite المحلي. يحدد كل متجر تقارب Redis العمليات المعلقة عند 8، ويتجاوز Redis فورًا عند اكتماله، ويحرر الفتحات فقط عندما يستقر العمل الأساسي، وليس في الموعد النهائي للمتصل. أثناء انقطاع Redis لا توجد حقيقة مشتركة: يعود كل مثيل إلى تقاربه المحلي، وقد يتم إعادة تثبيت الجلسات مرة واحدة لكل مثيل، وقد تتباعد المثيلات. تتقارب الالتصاق مرة أخرى من خلال Redis عندما يتعافى. حدود المهلة في انتظار، وليس EVAL المرسلة، والتي قد تهبط بعد التراجع. تقارن عمليات كتابة التوجيه القيمة الدقيقة التي لاحظها قرار التوجيه، وليس قراءة وقت الطفرة الجديدة؛ تتم مقارنة الخطأ الملحوظ أو الملاحظة الاحتياطية SQLite كمفتاح Redis غائب. يتم استبدال الأطراف القديمة في CAS واحد، لذلك لا يمكن للأمر المتأخر استبدال أو حذف طرف جديد مختلف. يقرأ Redis ذريًا ويعيد القيمة والخادم المتبقي TTL؛ PTTL الإيجابي (أو عدم انتهاء الصلاحية) هو الذي يحدد مدى الحياة، وليس الطابع الزمني JSON للكاتب أو ساعة القارئ. تحدد اللقطات المحلية تلك TTL المتبقية بموعد نهائي محلي؛ تظل مفاتيح JSON الموجودة قابلة للقراءة ويتم الاحتفاظ بوحدات البايت الأولية الخاصة بها لـ CAS. Redis هو المصدر الوحيد للحقيقة بينما يجيب. تؤدي عمليات الإدخال واللمس والحذف المشتركة المؤكدة إلى إزالة الإدخال المحلي، ولا تقم بتثبيته أو تحديثه مطلقًا. يحتفظ SQLite الموجود على مسار Redis فقط بالقرارات الاحتياطية الخاصة بهذا المثيل من أخطاء Redis أو المهلات أو تشبع القبول، المحدود بـ TTL كما كان من قبل. يكلف الدبوس المحلي المفقود عند انقطاع الخدمة لاحقًا اختيارًا جديدًا (خطأ واحد في ذاكرة التخزين المؤقت السريعة)، وليس حسابًا خاطئًا أو تم إخلاؤه. تقوم عمليات الإدخال المرفوضة بإرجاع الفائز المشترك و TTL المتبقي الخاص به ذريًا: يعيد التحديد العادي التحقق من الموعد النهائي المحلي المعين ويستخدم فائزًا مؤهلاً لا يزال حيًا، ويلمس الاستخدام ويسجل هذا الحساب دون كتابة مشتركة أخرى. إذا لم يكن متاحًا، فسيحتفظ التحديد بالمرشح المحلي، ويترك الدبوس المشترك دون تغيير ويرسل رسالة تصحيح واحدة. رفض CAS لا يكتب SQLite; تطبق أخطاء Redis أو المهلات أو تشبع القبول العملية المحلية الحالية بدلاً من ذلك. إذا وصل رد الطفرة المرسلة بعد انتهاء المهلة (القبول أو الرفض أو الخطأ)، فإن مقارنة وحذف القيمة المتسلسلة الدقيقة المتزامنة يزيل فقط الصف الاحتياطي لمهلة البايت المتطابقة. ولا انتظار بين تلك المقارنة والحذف؛ يتم الاحتفاظ بالكتابة الأحدث للانقطاع. يؤدي الإخلاء المحمي إلى إزالة الرقم السري المحلي الخاص بالحساب الفاشل حتى مع إيقاف تشغيل Redis ، وتنظيفه مرة أخرى بعد تأكيد الإخلاء المشترك. لا يمكن للردود المشتركة المعلقة السابقة استعادة رقم التعريف الشخصي المحلي الذي تم إخلاؤه لأن النجاحات المشتركة لا تكتب أبدًا SQLite. يمكن أن يؤدي التراجع اللاحق عن انقطاع الحساب إلى إعادة تشغيل الحساب؛ توجد كتابة مشتركة تم قبولها لاحقًا فقط في Redis. لا تستشير أخطاء Redis الحالة الاحتياطية المحلية. مع إيقاف تشغيل برنامج التشغيل، تحتفظ الأطراف المحددة حديثًا بالشكل القديم ذو الأربعة حقول SQLite JSON ؛ يضيف توجيه Redis فقط هوية الحساب المجزأة. يتم إعادة فحص الدبابيس التي تم جلبها مسبقًا عند حدود انتهاء صلاحيتها. يؤدي تحديد Redis غير الإيجاري إلى إعادة قراءة المتجر، ولكن لا يزال من الممكن لتخطيط الإيجار المتزامن استخدام دبوس تم إخلاؤه بين الجلب المسبق والتخطيط (نافذة مقبولة لأقصى جهد). لا يمكن لالتزام التأجير تبديل الحسابات بعد مطالبة دائمة: في حالة الرفض المرفوض، فإنه يحتفظ بالمرشح المطالب به لهذا الطلب فقط ويترك الفائز المشترك دون تغيير، لذا فإن الاتفاق عبر المثيلات يقتصر على هذا المسار. لا يزال باقي الجدول ساريًا: لا يشارك هذا في ثبات جلسة التحرير والسرد أو دبابيس تشغيل Codex الأصلية أو إشارات الحساب أو عمليات التأمين أو حدود الإنفاق أو التكوين أو سجلات المكالمات.

الأجهزة: `/v1/responses` الطويل المتزامن لكل مثيل هو a** ميزانية الذاكرة** سؤال (كومة + inflight-byte / #10110). لا تزال `N` المستقلة `DATA_DIR` تضاعف الكومة: يجب أن يغطي المضيف RAM `N × cgroup`، وليس "واحد 16 Gi pod مع N = 8." أبدا `replicas > 1` على ملف SQLite واحد.

رسم تخطيطي (كومتان ومجلدان — وليس `deploy.replicas: 2`):

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

الكثافة أثناء العملية (ضغط عزل HTTP ) هي [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). إحدى المجموعات المنطقية في الحالة الدائمة المشتركة هي [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## أخطاء Gemini الإقليمية داخل Docker

قد تُرجع Google AI Studio / Gemini API استجابة HTTP 400 بالحالة FAILED_PRECONDITION والرسالة
`User location is not supported for the API use.` لا يثبت نجاح الطلب على المضيف
أن الحاوية تستخدم مسار الخروج نفسه. فقد يختلف ترتيب DNS واتصال IPv4/IPv6
وتوجيه VPN والوكلاء المُعدّون. تحقّق من
[المناطق التي تدعمها Google](https://ai.google.dev/gemini-api/docs/available-regions)
وكذلك من مسار الاتصال الفعلي؛ فهذا الخطأ وحده لا يشير إلى أن مفتاح API غير صالح.

### فضّل وكيلاً خاصاً بالاتصال

استخدم [إعداد الوكيل لكل اتصال](../ops/PROXY_GUIDE.md#4-level-proxy-system) في OmniRoute
لاتصال Gemini المتأثر، ثم أعد تنفيذ **اختبار الاتصال** وطلب صغير
باستخدام النموذج نفسه. يؤدي ذلك إلى حصر تغيير التوجيه في ذلك الاتصال. تحقّق
من إمكانية الوصول إلى الوكيل من داخل الحاوية، ومن أن الاتصال يختاره فعلاً.
لا يضمن تغيير المسار الأهلية الإقليمية لدى الجهة المقدّمة للخدمة.

### قارن شبكة المضيف بشبكة الحاوية

أبقِ المفتاح والنموذج والطلب متطابقة عند مقارنة النتائج المصادق عليها؛ ولا
تلصق مطلقاً بيانات الاعتماد أو كلمات مرور الوكيل أو ترويسات التفويض الكاملة في بلاغ مشكلة.
افحص أولاً عائلات العناوين التي يوفّرها محلّل نظام التشغيل، باستخدام الأمر نفسه
على المضيف وداخل الحاوية:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

استبدل `omniroute` بالخدمة التي تشغّلها (على سبيل المثال، `omniroute-web`). تطبع هذه
الأوامر عائلات العناوين من دون بيانات اعتماد أو عناوين IP. لا تُظهر القيمة `6`
المُعادة سوى نتيجة DNS لـ IPv6؛ وهي **لا** تثبت وجود مسار IPv6 صالح للاستخدام أو إمكانية الوصول إلى API.
عندما يكون `curl` مثبّتاً، قارن `curl -4 -I https://generativelanguage.googleapis.com`
مع `curl -6 -I https://generativelanguage.googleapis.com` في كلتا البيئتين.
تثبت استجابة HTTP وجود اتصال لذلك الاختبار، حتى لو كانت خطأً غير مصادق عليه؛
ولا يختبر أهلية Gemini سوى طلب النموذج المصادق عليه.

### بديل على مستوى المضيف: IPv6 فعّال وسياسة المحلّل

استعاد مُبلّغ المشكلة [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)
الوصول في بيئته من خلال تمكين IPv6 للحاوية وتغيير آلية اختيار العناوين في glibc.
تعامل مع هذا بوصفه بديلاً خاصاً بالبيئة. تأكّد من عمل IPv6 على المضيف
ومن مسار خروج الحاوية وتوجيهها وقواعد جدار الحماية قبل تعديل تفضيلات المحلّل.
لا يثبت عنوان ULA خاص بمفرده وجود اتصال IPv6 عام.

بالنسبة إلى الخدمات المتصلة بالفعل بشبكة Compose الافتراضية، يفعّل هذا المقتطف
IPv6 على تلك الشبكة؛ احتفظ ببقية إعدادات الخدمة والمنافذ ووحدات التخزين والتهيئة:

```yaml
networks:
  default:
    enable_ipv6: true
```

بالنسبة إلى شبكة مسماة، فعّله على الشبكة التي تنضم إليها الخدمة فعلياً. يستطيع Docker
تخصيص شبكة فرعية من نوع ULA؛ حدّد شبكة فرعية صريحة وغير متداخلة فقط عندما تتطلب شبكتك
ذلك. راجع [شبكات IPv6 في Docker](https://docs.docker.com/engine/daemon/ipv6/)
و[خيارات شبكات Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

في **صورة مبنية على glibc**، يمكن لـ `/etc/gai.conf` تغيير آلية اختيار العناوين. يستخدم
Dockerfile الحالي للمستودع Debian؛ ولا تشترك الصور المخصصة المبنية على musl في هذه الآلية.
يغيّر التعديل المُبلّغ عنه تسمية ULA من `label fc00::/7 6` إلى
`label fc00::/7 1`. ابدأ من جدول السياسات الكامل للصورة واحتفظ بإدخالاته الأخرى:
فإضافة إدخال `label` أو `precedence` تستبدل ذلك الجدول الافتراضي، ولذلك لا يكفي ملف
لا يحتوي إلا على السطر المعدّل. يوثّق
[مرجع تهيئة glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
هذه الدلالات. اربط الملف الذي تمت مراجعته عند `/etc/gai.conf` بوضع القراءة فقط
وأعد إنشاء الخدمة لتطبيقه.

يؤدي ذلك إلى تغيير آلية اختيار العناوين في نظام التشغيل **لكل حركة المرور الصادرة من تلك الحاوية**.
ولا يُجبر كل تطبيق على اختيار IPv6، إذ إن ترتيب DNS وآلية اختيار الاتصال في Node
مهمان أيضاً. وعلى وجه الخصوص، يفضّل `--dns-result-order=ipv4first` بروتوكول IPv4
ولا يُعد حلاً لفشل يقتصر على IPv4. راجع [ترتيب DNS في Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

أعد اختبار Gemini وموفّري الخدمات الآخرين بعد أي تغيير على مستوى المضيف. للتراجع،
أزل ربط ملف `gai.conf` المخصص، واستعد تهيئة الشبكة السابقة، ثم
أعد إنشاء الخدمة/الشبكة المتأثرة خلال نافذة صيانة. قد تؤدي إعادة إنشاء الشبكة
إلى مقاطعة الحاويات الأخرى المتصلة بها؛ لا تحذف وحدة تخزين البيانات الدائمة.

## ملاحظات مهمة

- **وضع SQLite WAL:** يجب السماح للأمر `docker stop` بالاكتمال حتى يتمكن OmniRoute من تسجيل أحدث التغييرات في `storage.sqlite`. تضبط ملفات Compose المرفقة بالفعل فترة سماح للإيقاف تبلغ 40 ثانية. إذا شغّلت الصورة مباشرةً، فاحتفظ بالخيار `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** اضبطه على `true` إذا كانت النسخ الاحتياطية الدورية/السابقة للكتابة تُدار خارجيًا. لا تزال عمليات ترحيل قواعد البيانات الموجودة تتطلب لقطة أمان دائمة خاصة بها وإجراء حماية لعمليات الترحيل الجماعية.
- **استمرارية البيانات:** احرص دائمًا على تحميل وحدة تخزين إلى `/app/data` للحفاظ على قاعدة بياناتك ومفاتيحك وإعداداتك عبر عمليات إعادة تشغيل الحاوية.
- **إعداد المنفذ:** تجاوز متغير البيئة `PORT` لتغيير المنفذ الافتراضي `20128`.

## انظر أيضًا

- [دليل النشر على جهاز افتراضي](../ops/VM_DEPLOYMENT_GUIDE.md) — إعداد جهاز افتراضي + nginx + Cloudflare
- [دليل النشر على Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — النشر على Fly.io
- [إعدادات البيئة](../reference/ENVIRONMENT.md) — مرجع `.env` الكامل
