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

## التشغيل السريع

> **هل تريد الاستضافة الذاتية بأمر واحد؟** راجع
> [دليل الاستضافة الذاتية](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (صورة منشورة +
> Redis، مقيّد بواجهة loopback فقط، ومن دون اختيار ملف تعريف). التشغيل السريع أدناه هو
> مسار الحاوية الواحدة للمستخدمين الذين يشغّلون Redis بالفعل في مكان آخر.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## باستخدام ملف البيئة

```bash
# انسخ ملف .env وعدّله أولًا
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

## مراحل Dockerfile

يأتي المستودع مع Dockerfile متعدد المراحل (`Dockerfile`). تتوفر أربع مراحل؛ اختر `target` المناسب لحالة استخدامك.

| المرحلة       | الصورة الأساسية       | الغرض                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | تثبّت التبعيات (`npm ci --legacy-peer-deps`) وتشغّل `npm run build` (باستخدام Turbopack افتراضيًا — راجع موارد وقت البناء أدناه)                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | بيئة تشغيل الإنتاج مع مخرجات Next.js المستقلة. **لا تتضمن أدوات CLI خاصة بموفري الخدمات.**                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | تضيف `git` و`docker.io` و`docker-compose` وأدوات CLI العامة: `@openai/codex` و`@anthropic-ai/claude-code` و`droid` و`openclaw`. **اختر هذه المرحلة لتدفقات العمل الوكيلة.**                                                                           |
| `runner-web`  | `runner-base`         | تضيف Playwright ومتصفح Chromium (`--with-deps`) لموفري جلسات الويب: `gemini-web` و`claude-web` و`claude-turnstile`. **اختر هذه المرحلة عند استخدام أولئك الموفّرين** — تفشل الصورة العادية وقت الطلب من دونها (راجع ملاحظة `-web` ضمن قنوات الإصدار). |

ابنِ هدفًا محددًا يدويًا:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### موارد وقت البناء

تتحكم ثلاث وسائط بناء في تكلفة مرحلة `builder`. وهي مخصصة لوقت البناء فقط —
أما `OMNIROUTE_MEMORY_MB` (أدناه) فهو إعداد منفصل خاص بوقت التشغيل.

| وسيطة البناء                | القيمة الافتراضية | التأثير                                                                                                  |
| --------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`               | تنفّذ القيمة `0` البناء باستخدام webpack: ذروة ذاكرة أقل، لكن أبطأ. وتفعّل القيمة `1` استخدام Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | الحد الأقصى لذاكرة كومة V8 (`--max-old-space-size`) لعملية `next build` المنشأة.                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | يمرّر القيمة إلى `CIRCLE_NODE_TOTAL`؛ ويشتق Next منها `workers = N - 1` لجمع بيانات الصفحات.             |

`OMNIROUTE_BUILD_WORKERS` هو الإعداد الذي ينبغي زيادته على جهاز بناء كبير، وهو أول ما
يجب الاشتباه فيه عندما تفشل عملية بناء ذات موارد محدودة **بعد** `✓ Compiled successfully`. كل
عامل لبيانات الصفحات هو عملية مستقلة، وكذلك عملية `next build` الأم نفسها؛
وقد أظهر اختبار مباشر قابل لإعادة الإنتاج على VPS (المشكلة #7518) أن ذروة RSS لكل عملية بلغت
~4.5 GB بصرف النظر عن خيار كومة `NODE_OPTIONS` (يُجري Turbopack التجميع في
ذاكرة Rust أصلية خارج كومة V8). صُممت القيمة الافتراضية `2` (← عامل واحد، وعمليتان
إجمالًا) لتناسب مشغّلات GitHub المستضافة ذاتيًا بسعة 16 GB و4 وحدات vCPU التي
يستخدمها مسار النشر. عند القيمة `8` (← 7 عمال)، نفدت ذاكرة ذلك المشغّل
وفشلت خطوة buildkit بالرسالة `ResourceExhausted: ... cannot allocate memory`؛
كما أن القيمة `3` (← عاملان) لم تكن مناسبة أيضًا بعد قياس RSS لكل عملية
مباشرةً بدلًا من استنتاجها. يُجري `tests/unit/docker-build-memory-budget.test.ts`
الحسابات استنادًا إلى القيمة المقاسة ويفشل إذا تسبب أي من الإعدادين في
تجاوز سعة المشغّل.

يُجري Turbopack التجميع في ذاكرة Rust أصلية تقع **خارج** كومة V8، ولذلك
لا يضع `OMNIROUTE_BUILD_MEMORY_MB` حدًا لها. وعلى مضيف ذي حد أقصى للذاكرة،
تنهي أداة OOM killer عملية البناء بإشارة SIGKILL من دون أي نص خطأ — إذ تتوقف ببساطة
في منتصف `Creating an optimized production build`، ما يبدو كتوقف معلّق بدلًا من
نفاد للذاكرة. ولهذا يستخدم `Dockerfile` افتراضيًا webpack
(`OMNIROUTE_USE_TURBOPACK=0`)، بخلاف `npm run dev` / `npm run build`، حيث
يكون Turbopack هو الخيار الافتراضي في الشيفرة: يجب ألا يفشل أمر `docker build .` المجرد
من دون وسائط بناء (وهو ما تشغّله Railway وغيرها من منصات الاستضافة بنقرة واحدة)
بصمت على جهاز بناء مقيّد الذاكرة. تمرّر الصور المنشورة بالفعل
`OMNIROUTE_USE_TURBOPACK=0` صراحةً في `docker-publish.yml`. وعلى جهاز بناء
مزود بذاكرة RAM وفيرة، فعّل Turbopack للحصول على بناء أسرع:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

يكون `webpackBuildWorker` مفعّلًا، لذا يشغّل `next build` عمليةً أمًا **و**عملية عامل،
وتلتزم كل منهما بـ`OMNIROUTE_BUILD_MEMORY_MB` بصورة منفصلة. اضبط الحد الأقصى لذاكرة
الحاوية على أكثر من ضعف تلك القيمة تقريبًا، وليس على القيمة نفسها.

القياسات على هذه الشجرة (`--target runner-base`، و`OMNIROUTE_BUILD_MEMORY_MB=6144`):

| أداة التجميع | الحد الأقصى للحاوية | النتيجة                                           |
| ------------ | ------------------- | ------------------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB      | أنهت أداة OOM killer العملية عند كلا الحدين، بصمت |
| webpack      | 8 GiB               | أُنهي عامل البناء بإشارة SIGKILL                  |
| webpack      | 12 GiB              | نجح، وبلغت الذروة 11.1 GiB                        |

### القيم الافتراضية لوقت التشغيل

القيم الافتراضية التي تصدّرها `runner-base`: `PORT=20128`، و`HOSTNAME=0.0.0.0`، و`OMNIROUTE_MEMORY_MB=1024`، و`NODE_OPTIONS=--max-old-space-size=1024`، و`DATA_DIR=/app/data`، و`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

سلوك الذاكرة في Docker:

- تضبط الصورة `OMNIROUTE_MEMORY_MB=1024` وتشتق منها `NODE_OPTIONS=--max-old-space-size=1024`.
- تُشغَّل عملية الخادم الفعلية بواسطة مُشغِّل مستقل يقرأ `OMNIROUTE_MEMORY_MB` ويُلحق `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- يستخدم Node آخر قيمة مكررة للخيار `--max-old-space-size`، لذا فإن ضبط `OMNIROUTE_MEMORY_MB` يتحكم في حدّ كومة Docker الفعلي.
- لأن الصورة تضبط هذه القيمة دائمًا، فلن يُطبَّق الخيار الاحتياطي الخاص بالمُشغِّل والمُعايَر وفق ذاكرة RAM ضمن Docker. ارفعها صراحةً بما يناسب حمل العمل (الجدول أدناه). لا تزال القيمة `2048` صغيرة جدًا بالنسبة إلى `/v1/responses` لوكلاء البرمجة.

### ذاكرة RAM أثناء التشغيل لوكلاء البرمجة

القيمة الافتراضية البالغة 1 GiB في Docker هي حدّ أدنى للوحة المعلومات/الدردشة الخفيفة، وليست حجمًا مناسبًا للإنتاج. تحتفظ أجسام طلبات `POST /v1/responses` الطويلة (مئات الرسائل وعشرات الأدوات) بعدة رسوم بيانية في الذاكرة أثناء الضغط. تسبّب طلبان متداخلان بحجم يقارب 3 MiB / 750k رمزًا لكل منهما في إيقاف V8 عند مساحة قديمة قدرها **12 GiB** (`FATAL ERROR: Reached heap limit`)، كما تسبّبا في نفاد ذاكرة cgroup بسعة 16 GiB. راجع [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

اضبط حجم **`--memory` الخاص بـ cgroup ليكون أكبر من الكومة** — إذ تقع المخازن المؤقتة الأصلية وSQLite والبيانات الوسيطة للضغط خارج V8.

| حمل العمل                             | `OMNIROUTE_MEMORY_MB`             | الحاوية / cgroup                  | ملاحظات                                                                                        |
| ------------------------------------- | --------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| لوحة المعلومات، دردشة خفيفة واحدة     | `1024` (القيمة الافتراضية للصورة) | ≥2 GiB                            |                                                                                                |
| وكيل برمجة واحد (Claude/Codex/Grok)   | `8192`                            | ≥10 GiB                           | جلسة `/v1/responses` واحدة نموذجية                                                             |
| طلبا `/v1/responses` طويلان ومتزامنان | `10240`–`12288`                   | ≥12–16 GiB                        | تم قياس إيقاف V8 عند كومة بحجم ~12 GiB                                                         |
| ثلاثة سياقات طويلة متزامنة أو أكثر    | لا تشغّلها في عملية واحدة         | نفّذها تسلسليًا / وفّر RAM إضافية | القبول الافتراضي للأحمال الثقيلة هو طلب واحد قيد التنفيذ؛ وزيادته من دون RAM تعيد حدوث الإيقاف |

يعاير `omniroute serve` على النظام مباشرةً نحو 35% من RAM (ضمن النطاق `[512, 4096]`) عندما يكون `OMNIROUTE_MEMORY_MB` **غير مضبوط**. يضبط Docker القيمة `1024` دائمًا، لذا لا تُنفَّذ هذه المعايرة مطلقًا في الصورة الرسمية.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## الوكيل العكسي على مسار فرعي (Traefik / nginx)

يُضمَّن `basePath` الخاص بـ Next.js في الحزمة المستقلة عند تجميعها. تسجّل OmniRoute القيمة
المضمّنة في ملف علامة عند جذر التطبيق (تتم كتابته أثناء `npm run build`؛ وتتم قراءته بواسطة
`scripts/docker/ensure-docker-base-path.mjs`) وتقارنها مع
`OMNIROUTE_BASE_PATH` عند بدء تشغيل الحاوية. عندما تختلف القيمتان وتكون الصورة قد
بُنيت لجذر النطاق، تعيد نقطة الدخول كتابة بيانات الحزمة المستقلة، وقيم
`basePath`/`assetPrefix` الحرفية المضمّنة (يعرض Next 16 عناوين URL لأصول SSR من
`assetPrefix` وحده — وتنسخ أداة التصحيح المسار الفرعي إليه)، وعناوين URL المضمّنة لأصول
`/_next/static` (بيانات مراجع العميل، واستيرادات الوسائط، وصفحات الأخطاء المعروضة
مسبقًا)، وطبقة توافق `process.env` الخاصة بالعميل قبل تشغيل `node dev/run-standalone.mjs`.

### البناء باستخدام Compose (موصى به)

عيّن كلا المتغيرين في `.env`، ثم أعد البناء بحيث تتطابق الصورة مع بيئة التشغيل:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

يمرّر `docker-compose.yml` المتغير `OMNIROUTE_BASE_PATH` كوسيطة بناء Docker وكمتغير
بيئة وقت التشغيل.

### صورة جذر مبنية مسبقًا + مسار فرعي في وقت التشغيل

تُبنى صور `diegosouzapw/omniroute:*` المنشورة لجذر النطاق. لا يزال بإمكانك
تعيين `OMNIROUTE_BASE_PATH` في وقت التشغيل؛ إذ تصحّح الحاوية الحزمة مرة واحدة عند بدء التشغيل.
استخدمه مع الأصل العام المطابق:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

اضبط الوكيل العكسي لتمرير المسار الخارجي **كاملًا** (لا تزل
البادئة). يجب أن يوجّه Traefik المسار `PathPrefix(`/omniroute`)` إلى الحاوية من دون
`StripPrefix`، بحيث يستقبل Next.js المسار `/omniroute/...` ويقدّم الأصول من
`/omniroute/_next/...`.

يفحص التحقق من سلامة Docker نقطة نهاية دورة الحياة خفيفة الوزن `/healthz` بعد إضافة
بادئة `OMNIROUTE_BASE_PATH` النشطة إليها. تظل `/api/monitoring/health` متاحة
لتشخيصات المستخدمين ولوحات المعلومات؛ ولإعادة توجيه HEALTHCHECK الخاص بالحاوية إليها (على سبيل المثال
لفرض فحص سلامة متعمّق)، عيّن `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
يمثّل هذا المسار فحصًا **متعمّقًا** (قاعدة البيانات + ملخص المراقبة) — وهو مناسب
لأمر `HEALTHCHECK` غير المتكرر في Docker إذا اخترت إعادة تفعيله، لكنه **غير** مناسب لفواصل
`livenessProbe` الزمنية في Kubernetes.

بالنسبة إلى أنظمة التنسيق (Kubernetes وNomad وغيرها):

| الفحص          | المفضّل                                                                           | تجنّب                                                       |
| -------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| البقاء         | HTTP `GET /livez`، أو TCP على المنفذ الرئيسي (`PORT`، والقيمة الافتراضية `20128`) | استخدام `/api/monitoring/health` لفحص البقاء                |
| الجاهزية       | HTTP `GET /healthz`                                                               | المهل الزمنية القصيرة التي تعتبر انشغال حلقة الأحداث توقفًا |
| متعمّق / خارجي | `/api/monitoring/health`                                                          | —                                                           |

يبلّغ `/healthz` عن دورة حياة العملية (`ok` / `starting` / `stopping`). أما `/livez`
فيتحقق من بقاء العملية فقط (ويُرجع 200 متى أمكن تشغيل المعالج؛ ولا ينتظر
الجاهزية). ولا يزال كلاهما يعمل على حلقة أحداث Node نفسها المستخدمة لمعالجة الطلبات، ولذلك
قد تؤخرهما أعمال الكتالوج أو الضغط الكثيفة على وحدة المعالجة المركزية — الانشغال ≠ التوقف. فضّل فحص البقاء عبر TCP
إذا انتهت مهلة فحوصات HTTP. إرشادات الفحص الكاملة:
[دليل المراقبة — توصيات فحوصات Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose مع Caddy (‏HTTPS Auto-TLS)

يمكن إتاحة OmniRoute بأمان باستخدام التوفير التلقائي لشهادة SSL من Caddy. تأكد من أن سجل DNS من النوع A لنطاقك يشير إلى عنوان IP الخاص بخادمك.

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
      # المصدر الظاهر للمتصفح لاستدعاءات OAuth وروابط لوحة المعلومات وعناوين URL العامة المُنشأة.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # عنوان URL الداخلي بين الخوادم للمهام المجدولة / الطلبات الذاتية.
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

يضبط Caddy ترويسات إعادة التوجيه القياسية للحاوية العلوية. يستخدم OmniRoute
`NEXT_PUBLIC_BASE_URL` بوصفه المصدر العام الأساسي لاستدعاءات OAuth والروابط العامة
المُنشأة؛ وتستخدم عمليات الكتابة الموثّقة في لوحة المعلومات طلبات من المصدر نفسه إلى جانب حماية CSRF
مرتبطة بالجلسة. لا تفعّل `OMNIROUTE_TRUST_PROXY` إلا لعمليات النشر المتقدمة التي تريد فيها عمدًا
أن يستنتج OmniRoute المصدر العام من ترويسات إعادة التوجيه الموثوقة بدلًا من الإعداد
الصريح.

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

## وسوم الصور

| الصورة                   | الوسم    | الحجم  | الوصف                                                  |
| ------------------------ | -------- | ------ | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | أعلى إصدار SemVer مستقر **منشور** (وليس `main` في git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ثبّت هذه الفئة من الوسوم لاستخدام GitOps               |

بيان متعدد المنصات: `linux/amd64` + `linux/arm64` أصليان (Apple Silicon وAWS Graviton وRaspberry Pi). يحدد Docker البنية المطابقة تلقائيًا؛ مرّر `--platform linux/amd64` إذا احتجت إلى فرض محاكاة AMD64 على مضيفات ARM.

### قنوات الإصدار

ينشر OmniRoute قنوات Docker منفصلة للإصدارات المستقرة، واختبار فرع الإصدار النشط، وبُنى التطوير.

| القناة                          | المصدر                            | قابلية التغيير                   | الاستخدام الموصى به                                                                                      |
| ------------------------------- | --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | إصدار موقّع/مرقّم                 | غير قابل للتغيير                 | عمليات نشر الإنتاج التي تثبّت إصدارًا محددًا بدقة                                                        |
| `:latest` / `:latest-web`       | أعلى إصدار SemVer مستقر **منشور** | مؤشر مستقر قابل للتغيير          | يتبع الإصدارات المستقرة **بعد** مهمة نشر SemVer — ولا يتتبع `main` أو التزامات `release/v*` غير المنشورة |
| `:next` / `:next-web`           | فرع `release/v*` الافتراضي الحالي | مؤشر ما قبل الإصدار قابل للتغيير | اختبار الإصلاحات التي أُضيفت إلى فرع الإصدار النشط لكنها لم تُضمَّن بعد في إصدار مستقر                   |
| `:main` / `:main-web`           | فرع `main`                        | مؤشر تطوير قابل للتغيير          | للتطوير واختبار التكامل فقط                                                                              |

#### موفرو جلسات الويب: صور `-web`

تتوفر كل قناة أعلاه أيضًا بوسم `-web` (`:latest-web` و`:<version>-web` و`:next-web` و`:main-web`)، وهي مبنية من مرحلة `runner-web` — الصورة نفسها بالإضافة إلى Playwright ومتصفح Chromium. تأتي الصورة العادية **من دون** Chromium؛ ويحتاج إليه `gemini-web` و`claude-web` و`claude-turnstile`.

يُؤجَّل الفشل ولا يحدث عند بدء التشغيل: يعرض هؤلاء الموفّرون نماذجهم ويظهرون على أنهم متصلون في لوحة المعلومات، ولا يفشل إلا الطلب الأول مع الرسالة:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

إذا كنت تستخدم هؤلاء الموفّرين، فاسحب وسم `-web` للقناة التي تستخدمها بالفعل — ولا يتغير أي شيء آخر. في تثبيت npm/CLI (من دون صورة Docker)، يكون الجزء المفقود المكافئ هو الملف التنفيذي للمتصفح: شغّل `npx playwright install chromium` على المضيف.

#### استخدام قناة ما قبل الإصدار

تُعاد بناء قناة `next` عند كل عملية دفع إلى فرع `release/v*` الافتراضي الحالي، وتُنشر لكلٍ من AMD64 وARM64. ولا يمكن لفروع الصيانة الأقدم الكتابة فوقها. توفّر القناة صورة قابلة للسحب للإصلاحات التي دُمجت في فرع الإصدار النشط قبل إنشاء وسم الإصدار المستقر التالي.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

بالنسبة إلى Docker Compose، تجاوز وسم الصورة الذي يستخدمه ملف التعريف المحدد، ثم اسحب الخدمة وأعد إنشاءها:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### الأمان والتراجع

`next` هي قناة عائمة لما قبل الإصدار. وقد تتغير عند أي عملية دفع إلى فرع الإصدار النشط، وهي **غير مدعومة للاستخدام في بيئات الإنتاج**. ثبّت ملخص الصورة أثناء تقييم بنية محددة:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

قبل الاختبار، أنشئ نسخة احتياطية من وحدة تخزين بيانات OmniRoute أو دليل البيانات المُثبّت بالربط. للتراجع، استعد الإصدار المستقر أو الملخص المستخدم سابقًا، ثم أعد إنشاء الحاوية:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

لا يمكن لبنية فرع إصدار نقل `latest` مطلقًا؛ ولا يجوز ترقية المؤشر المستقر إلا بواسطة إصدار دلالي مستقر مؤهل. تحتفظ صور `next` بفحص صورة الإصدار وبوابة الحظر للثغرات ذات الخطورة CRITICAL.

**لا يضمن `latest` حداثة git.** لا تكون الإصلاحات المدمجة في `main` أو في فرع `release/v*` النشط موجودة في `:latest` حتى تُنشر صورة SemVer مستقرة وتقوم مهمة النشر بترقية `:latest` (بالملخص نفسه الخاص بإصدار SemVer). إذا بدا `latest` ثابتًا بينما يعرض GitHub الإصلاح بالفعل، فاسحب `:next` لاختبار فرع الإصدار أو انتظر وسم SemVer.

| ما تريده                                                            | ما يجب استخدامه                |
| ------------------------------------------------------------------- | ------------------------------ |
| GitOps / بيئة إنتاج يجب ألا تنحرف                                   | ثبّت `:X.Y.Z` (أو ملخص الصورة) |
| متابعة الإصدارات المستقرة المنشورة وقبول إعادة الإنشاء عند كل إصدار | `:latest`                      |
| اختبار التثبيتات غير المنشورة في `release/v*`                       | `:next` (ليس للإنتاج)          |
| اختبار `main`                                                       | `:main` (ليس للإنتاج)          |

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

## التوافر: SQLite الافتراضية أحادية النسخة

يتكوّن إعداد OmniRoute القياسي في Docker / Kubernetes من **عملية Node واحدة + كاتب SQLite واحد**. **التوافر العالي غير مدعوم** في هذه البنية.

| القيد                                                      | النتيجة                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| كاتب واحد                                                  | **لا** تشغّل نسخاً متعددة على ملف SQLite نفسه. فهذا يفسد قاعدة البيانات.                                                                                                                                                                                                                                           |
| إعادة الإنشاء / إعادة التشغيل / الإنهاء بواسطة HEALTHCHECK | **انقطاع كامل** لاتصالات SSE قيد التنفيذ، وجلسات لوحة المعلومات، والحالة الموجودة في الذاكرة. ينقطع اتصال كل عميل متصل. تتلقى الطلبات الجديدة أثناء نافذة غياب نقاط النهاية خطأ **`502 Bad Gateway: Unknown error`** من الوكيل العكسي، وليس JSON من OmniRoute — ولا يستطيع العملاء تمييزه عن فشل المزوّد (#11015). |
| حلقة الأحداث نفسها الخاصة بـ `/healthz`                    | قد تؤخر دورة كتالوج أو ضغط مشغولة عمليات الفحص؛ وعندها تؤدي مهلة قصيرة إلى إعادة تشغيل النسخة **الوحيدة**.                                                                                                                                                                                                         |

**مصفوفة عمليات الفحص** (راجع أيضاً [توصيات عمليات الفحص في Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| الفحص           | الهدف                                                                  | لا تستخدم                                        |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------ |
| البقاء          | TCP على `PORT` (القيمة الافتراضية `20128`)، أو HTTP مرن على `/healthz` | `/api/monitoring/health`                         |
| الجاهزية        | HTTP `GET /healthz`                                                    | مهل زمنية قصيرة تعتبر انشغال حلقة الأحداث تعطلًا |
| المتعمق / للبشر | `/api/monitoring/health`                                               | فحص بقاء kubelet آلي                             |

**الترقيات:** توقّع انقطاع كل جلسة. أخلِ العملاء إن استطعت؛ لا يتوفر تحديث متدرج مع SQLite الافتراضية. كما أن إعداد Compose بالقيمة `restart: unless-stopped` مع `HEALTHCHECK` في Docker سيستبدل العملية الوحيدة عندما تصبح الحاوية Unhealthy — وبنطاق التأثير نفسه.

مقتطف Kubernetes خاص **بنسخة واحدة** (يلزم استخدام Recreate؛ لا ترفع قيمة `replicas` مع ملف SQLite واحد):

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

يتيح التأخير باستخدام `preStop` لـ kube إزالة نقاط نهاية Service قبل SIGTERM، بحيث تتوقف حركة المرور **الجديدة** عن الوصول إلى العملية التي يجري إنهاؤها. تُستكمل اتصالات SSE قيد التنفيذ على `/v1/responses` خلال مدة تصل إلى `SHUTDOWN_TIMEOUT_MS` (القيمة الافتراضية 30 ثانية) عبر عقود قبول للمهام الثقيلة (#11015). تتلقى الطلبات الجديدة التي لا تزال تصل إلى العملية استجابة `503` مع `Retry-After: 5`. وتظل فجوة غياب نقاط النهاية الناتجة عن Recreate إلى أن تصبح النسخة البديلة Ready انقطاعًا كاملًا للخدمة — فهذا ناتج عن طوبولوجيا SQLite، وليس عن سوء تهيئة للمسبار.

لا يُعد استخدام Postgres خارجي أو إعداد HA متعدد الكتّاب مسارًا قياسيًا **موثقًا**. إذا كنت بحاجة إلى HA، فاحتفظ بنسخة متماثلة واحدة أو شغّل طوبولوجيا اختبرها المشروع ووثّقها بشكل منفصل. يجري العمل على Postgres/MySQL ضمن [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). وحتى إصدار ذلك، فإن الطريقة الوحيدة المدعومة لمضاعفة سعة طلبات `/v1/responses` **الكبيرة** هي تشغيل N من العمليات المستقلة (القسم التالي)، وليس استخدام `replicas > 1` على وحدة تخزين واحدة.

## التوسّع الأفقي: N من العمليات المستقلة

عملية Node واحدة تعني **كومة V8 واحدة**. يؤدي طلبان متداخلان لوكيل برمجي بحجم ~3 MiB / ~750k-token من نوع `POST /v1/responses` ‏(RTK + Caveman) إلى إيقاف تلك الكومة عند ~12 Gi (`FATAL ERROR: Reached heap limit`)، ويمكن أن يتسببا في نفاد الذاكرة ضمن cgroup بحجم 16 Gi. راجع [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). هذا القياس هو تحذير متعلق **بميزانية الذاكرة**، وليس حدًا أقصى ثابتًا في المنتج يقتصر على طلبين طويلين متزامنين من `/v1/responses`. يُتحكم في قبول محادثات الدردشة الثقيلة بواسطة ميزانية بايتات إدخال مشتقة تلقائيًا (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`، ‏`src/shared/middleware/admissionBudget.ts`) ومحددة وفق سقف V8/cgroup نفسه — وتؤدي زيادة قيمتها يدويًا (أو تعيين حد عدد الطلبات القديم `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) في عملية جرى تحديد حجمها مسبقًا إلى إعادة حدوث الإيقاف. لا تخضع المحادثات الصغيرة و`/healthz` و`/v1/models` وMCP لهذا الحد.

### عملية واحدة: أكثر من طلبين طويلين من `/v1/responses`

**قد** تشغّل عملية **سليمة** (تكون فيها الكومة دون `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`، والقيمة الافتراضية `0.75`) أكثر من طلبين طويلين متزامنين من نوع `POST /v1/responses` عندما تظل هناك مساحة ضمن ميزانية البايتات قيد التنفيذ على مستوى العملية (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). تحصل الأجسام التي يبلغ حجمها `OMNIROUTE_CHAT_LARGE_BODY_BYTES` أو يتجاوزه (القيمة الافتراضية 256 KiB) على الإيجار الثقيل نفسه المخصص للطلبات كثيفة البنية، وتستخدم آلية الإفلات `tryAcquireHealthyHeadroom` نفسها من [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ‏(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). إن تشغيل عشرات عملاء SSE الطويلين بصورة متزامنة (يحتاج المشغّلون غالبًا إلى 40–50) هو مسألة **ميزانية ذاكرة** — أي تحديد حجم الكومة + الخانات الأساسية/الاحتياطية + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — وليس حدًا ثابتًا في المنتج يبلغ «2 كحد أقصى». وتستمر الكومة الواقعة تحت الضغط في رفض الحمل مع استجابة `503` قابلة لإعادة المحاولة، كي لا تعود مشكلة #7849.

من أجل **مضاعفة الأكوام** (مساحات V8 القديمة المستقلة) **اليوم**:

| افعل                                                                                                                                                                                              | لا تفعل                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| شغّل **N من الحاويات/وحدات pods**، بحيث يكون لكل منها `DATA_DIR` / وحدة تخزين **خاصة بها**                                                                                                        | تعيّن `replicas > 1` على ملف SQLite واحد                       |
| حدّد حجم الطلبات الثقيلة قيد التنفيذ + السعة الاحتياطية السليمة وفق الكومة / ميزانية البايتات قيد التنفيذ؛ والقيمة 1–2 هي الإعداد الافتراضي المحافظ لمشكلة #7849 وليست حدًا أقصى ثابتًا في المنتج | تمنح عملية واحدة ذاكرة RAM أكبر بمقدار 8× وحدًا غير مقيد للعدد |
| اختياري: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` للحصول على **عدادات حصص مشتركة**                                                                                                    | تعامل Redis على أنه SQLite مشترك — فهو ليس كذلك                |
| انسخ أسرار موفري الخدمة إلى كل نسخة (أو اقبل لوحات معلومات مجزأة)                                                                                                                                 | تتوقع لوحة معلومات واحدة / سجل استدعاءات واحدًا عبر النسخ      |
| ضع أي موازن أحمال في الواجهة؛ ويكفي تثبيت الجلسة حسب مفتاح API أو الجلسة                                                                                                                          | تشترط برمجية وسيطة خاصة بمورّد معين ومدركة للحجم               |

العتاد: عدد طلبات `/v1/responses` الطويلة المتزامنة لكل نسخة هو مسألة **ميزانية ذاكرة** (الكومة + البايتات قيد التنفيذ / #10110). ما تزال قيم `DATA_DIR` المستقلة وعددها `N` تضاعف الأكوام: يجب أن تغطي ذاكرة RAM للمضيف `N × cgroup`، وليس «وحدة pod واحدة بسعة 16 Gi مع N=8». لا تستخدم مطلقًا `replicas > 1` على ملف SQLite واحد.

مخطط Compose (كومتان ووحدتا تخزين — وليس `deploy.replicas: 2`):

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

تُناقش كثافة العمل داخل العملية (مع نقل الضغط خارج سياق HTTP المعزول) في [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). وتُناقش مجموعة منطقية واحدة تعتمد على حالة دائمة مشتركة في [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
