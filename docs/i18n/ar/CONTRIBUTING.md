# Contributing to OmniRoute (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## إعداد التطوير

### المتطلبات الأساسية

- **Node.js** `>=22.22.2 <23`، أو `>=24.0.0 <27` (موصى به: 24 LTS)
- **npm** 10+

> **Windows مع Node 24:** استخدم إصدار التصحيح الحالي من 24 LTS (24.20.0 على الأقل).
> يمكن للإصدارات الأقدم الإنهاء بعد نجاح الاختبارات عند إغلاق `--test-force-exit`
> للعملية. يعالج [إصلاح Windows libuv](https://github.com/nodejs/node/pull/61999) في Node
> هذا التعطل أثناء التشغيل؛ أبقِ تأكيدات الاختبار وفحوصات خروج المشغّل مفعّلة.

> **مستخدمو npm v11+ (Node 24+):** بعد تنفيذ `npm install`، تحقّق من تثبيت الوحدات الأصلية:
> `node -e "require('better-sqlite3')"`. إذا فشل الأمر مع ظهور `MODULE_NOT_FOUND`،
> نفّذ `npm approve-scripts better-sqlite3 && npm install`. راجع
> [استكشاف الأخطاء وإصلاحها](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### الاستنساخ والتثبيت

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### متغيرات البيئة

```bash
# أنشئ ملف .env من القالب
cp .env.example .env

# أنشئ الأسرار المطلوبة
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

المتغيرات الأساسية للتطوير:

| المتغير                | القيمة الافتراضية للتطوير | الوصف                              |
| ---------------------- | ------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                   | منفذ الخادم                        |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | عنوان URL الأساسي للواجهة الأمامية |
| `JWT_SECRET`           | (أنشئه أعلاه)             | السر المستخدم لتوقيع JWT           |
| `INITIAL_PASSWORD`     | `CHANGEME`                | كلمة مرور تسجيل الدخول الأولى      |
| `APP_LOG_LEVEL`        | `info`                    | مستوى إسهاب السجل                  |

### إعدادات لوحة التحكم

توفر لوحة التحكم مفاتيح تبديل في واجهة المستخدم للميزات التي يمكن تهيئتها أيضًا عبر متغيرات البيئة:

| موقع الإعداد       | مفتاح التبديل       | الوصف                                      |
| ------------------ | ------------------- | ------------------------------------------ |
| الإعدادات ← متقدمة | وضع التصحيح         | تمكين سجلات طلبات التصحيح (واجهة المستخدم) |
| الإعدادات ← عامة   | ظهور الشريط الجانبي | إظهار/إخفاء أقسام الشريط الجانبي           |

تُخزَّن هذه الإعدادات في قاعدة البيانات وتستمر عبر عمليات إعادة التشغيل، وتتجاوز القيم الافتراضية لمتغيرات البيئة عند تعيينها.

### التشغيل محليًا

```bash
# وضع التطوير (إعادة التحميل السريع)
npm run dev

# بناء الإنتاج
npm run build    # next build → .build/next/ ثم assembleStandalone → dist/
npm run start

# تجميع سريع للخلفية/واجهة API فقط لتغييرات المساهمين
npm run build:contributor

# بناء الإصدار (إعادة بناء نظيفة + sentinel لـ HEAD — مطلوب للنشر)
npm run build:release   # rm -rf .build dist ثم build + يكتب dist/BUILD_SHA

# إعداد المنفذ الشائع
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

ينفّذ بناء المساهمين عملية تحقق للتجميع فقط: فهو لا ينشئ توزيعًا مستقلًا أو يبني أصول التغليف الأصلية الاختيارية. استخدم بناء الإنتاج العادي عندما تحتاج إلى التحقق من الحزمة الجاهزة للشحن.

### بنية مخرجات البناء

| الدليل    | المحتويات                                                                       | متتبَّع |
| --------- | ------------------------------------------------------------------------------- | ------- |
| `src/`    | مصدر التطبيق (TypeScript / TSX)                                                 | نعم     |
| `.build/` | الملفات الوسيطة — مخرجات `next build` (متجاهلة في Git، `distDir = .build/next`) | لا      |
| `dist/`   | الحزمة الجاهزة للشحن — يتم تجميعها بواسطة `assembleStandalone` (متجاهلة في Git) | لا      |

يمر مسار البناء بمرحلة واحدة:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

يعمل `npm run build:release` أيضًا على تنظيف الدليلين أولًا ويكتب
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) باعتباره مؤشرًا لسلامة النشر.

يستخدم `npm run build:contributor` ملف تعريف البناء الخاص بالخلفية فقط. ويستبدل مؤقتًا
ملفات واجهة لوحة التحكم بملفات بديلة أثناء البناء، ويُبقي معالجات مسارات API، ثم يستعيد الملفات الأصلية
بعد انتهاء البناء. استخدم `npm run build` للتغييرات التي تؤثر في واجهة لوحة التحكم أو للتحقق الكامل من الإصدار؛
فملف تعريف المساهمين ليس بديلًا عن بناء الإصدار.

> **ملاحظة حول النشر على VPS:** لا يتغير دليل الصور البعيد `/usr/lib/node_modules/omniroute/app/`.
> تعمل مهارات النشر على مزامنة محتويات `dist/` معه باستخدام rsync.
> مسار مخرجات البناء داخل المستودع فقط هو الذي تغيّر (`app/` → `dist/`).

عناوين URL الافتراضية:

- **لوحة التحكم**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## سير عمل Git

> ⚠️ **لا تُجرِ أي عملية commit مباشرةً إلى `main` مطلقًا.** استخدم دائمًا فروع الميزات.
>
> **قاعدة PR:** استهدف فرع `release/vX.Y.Z` النشط (وليس `main`). راجع
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) للاطلاع على
> نموذج إصدار لكل فرع + وسم عند الإطلاق.

```bash
# أنشئ الفرع من أحدث نقطة في الإصدار النشط (مثال: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... أجرِ التغييرات ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# افتح طلب سحب بحيث تكون القاعدة = release/v3.8.49
```

### تسمية الفروع

| البادئة     | الغرض                     |
| ----------- | ------------------------- |
| `feat/`     | ميزات جديدة               |
| `fix/`      | إصلاحات الأخطاء           |
| `refactor/` | إعادة هيكلة الشيفرة       |
| `docs/`     | تغييرات التوثيق           |
| `test/`     | إضافات/إصلاحات الاختبارات |
| `chore/`    | الأدوات، CI، التبعيات     |

### رسائل Commit

اتبع معيار [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

النطاقات (v3.8): `db`، `sse`، `oauth`، `dashboard`، `api`، `cli`، `docker`، `ci`، `mcp`، `a2a`، `memory`، `skills`، `cloud-agent`، `guardrails`، `compression`، `auto-combo`، `resilience`، `providers`، `executors`، `translator`، `domain`، `authz`.

---

## تشغيل الاختبارات

```bash
# جميع الاختبارات (الوحدة + vitest + المنظومة + من طرف إلى طرف)
npm run test:all

# ملف اختبار واحد (مشغّل الاختبارات الأصلي في Node.js — تستخدمه معظم الاختبارات)
node --import tsx/esm --test tests/unit/your-file.test.ts

# اختبارات الوحدة المتأثرة فقط بتغييرك (محدّد TIA نفسه المستخدم كبوابة في CI، ‏#8084)
npm run test:scoped            # التغييرات في آخر عملية تثبيت (أو شجرة العمل)
npm run test:scoped:staged     # التغييرات المرحّلة فقط — يتكامل جيدًا مع التشغيل قبل التثبيت
npm run test:scoped:full       # أعِد بناء خريطة رسم الاستيراد أولًا (بعد إضافة الملفات أو نقلها)
# الخروج بالرمز 1 مع ظهور "شغّل المجموعة الكاملة" يعني أن ملفًا محوريًا (tsconfig، أو package.json، أو …) أو مصدرًا
# غير معيّن قد تغيّر — يفشل المحدّد بأمان ولا يتخطى أي شيء بصمت مطلقًا.

# Vitest (خادم MCP، وautoCombo، وذاكرة التخزين المؤقت)
npm run test:vitest

# اختبارات من طرف إلى طرف (تتطلب Playwright)
npm run test:e2e

# اختبارات عملاء البروتوكول من طرف إلى طرف (وسائط نقل MCP، وA2A)
npm run test:protocols:e2e

# اختبارات توافق المنظومة
npm run test:ecosystem

# بوابة التغطية: 60% من العبارات/الأسطر/الدوال/الفروع
npm run test:coverage
npm run coverage:report

# فحص قواعد التنسيق + التنسيق
npm run lint
npm run check

# اختبار دخاني محكوم للتركيبات مع خدمات المنبع الحقيقية (يتطلب الوصول إلى VPS + أرصدة حقيقية لدى المزوّد)
# يتصل بمزوّدين حقيقيين — بتكلفة بسيطة. لا يعمل مطلقًا في CI. يُتخطى بشكل سليم من دون البوابة.
# يتطلب: صلاحية وصول ssh root@192.168.0.15 (يأخذ لقطة DB للقراءة فقط من VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# اختبار دخاني مباشر للمرحلة الثالثة على VPS — نصوص Node ESM عادية، تتصل مباشرة بالخادم المباشر .15.
# يتطلب: صلاحية وصول ssh root@192.168.0.15 (تُنشأ التركيبات وتُزال عبر SSH sqlite).
# يتصل بمزوّدين حقيقيين (بتكلفة بسيطة). ينشئ/يحذف فقط تركيبات __live_test__*. لا يعمل مطلقًا في CI.
# ‏REQUIRE_API_KEY=false على .15، لذا لا يلزم مفتاح API، لكنه يراعي COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY إذا ضُبطا.
npm run test:combo:live:vps              # 7 سيناريوهات HTTP (الأولوية/التناوب/الترجيح/التكلفة/الدمج/التلقائي + السلامة)
npm run test:combo:live:vps:failover     # يضيف سيناريو تجاوز فشل حقيقيًا بين المزوّدين (الإجمالي 8)
```

ملاحظات التغطية:

- يقيس `npm run test:coverage` تغطية المصدر لمجموعة اختبارات الوحدة الرئيسية، ويستبعد `tests/**`، ويتضمن `open-sse/**`
- يجب أن تحافظ طلبات السحب على بوابة تغطية بنسبة **60%+** للعبارات/الأسطر/الدوال/الفروع
- إذا غيّر طلب سحب شيفرة إنتاج في `src/`، أو `open-sse/`، أو `electron/`، أو `bin/`، فيجب أن يضيف اختبارات آلية أو يحدّثها في طلب السحب نفسه
- يطبع `npm run coverage:report` التقرير التفصيلي ملفًا بملف من أحدث تشغيل للتغطية
- يحافظ `npm run test:coverage:legacy` على المقياس الأقدم للمقارنة التاريخية
- راجع `docs/ops/COVERAGE_PLAN.md` للاطلاع على خارطة طريق تحسين التغطية على مراحل

### متطلبات طلب السحب

قبل فتح طلب سحب، استخدم
[المسار الذهبي للمساهمة](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) لتشغيل الحلقة المركّزة الخاصة
بما غيّرته. تقع مسؤولية مجموعة اختبارات الوحدة الكاملة (4 أجزاء في CI)، وVitest، وبوابة التغطية **60%+**،
وبناء الإنتاج على CI — ولا يضيف تشغيلها محليًا أي معلومات لن توفرها لك بالفعل
عمليات التحقق من طلب السحب، كما قد يستنفد موارد المضيف على الأجهزة الأصغر (#8084):

- شغّل ملفات الاختبار التي تغطي تغييرك: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- شغّل `npm run lint`
- أدرج اختبارات آلية أو حدّثها في طلب السحب نفسه كلما تغيّرت شيفرة الإنتاج
- في ملفات `node:test`، ضع كل تعليمة `await` في المستوى الأعلى (مثل `await import(...)`) قبل أول `test()` / `describe()`: عند استخدام `--test-force-exit`، قد لا تعمل الاختبارات المسجّلة بعدها مطلقًا من دون أي تنبيه (#18045؛ يفرضه `npm run check:test-tla-order`)
- أدرج ملفات الاختبار التي غُيّرت أو أُضيفت في وصف طلب السحب عند تغيير شيفرة الإنتاج
- تحقّق من نتيجة SonarQube في طلب السحب عندما تكون أسرار المشروع مضبوطة في CI

حالة الاختبارات الحالية: **122 ملفًا لاختبارات الوحدة** تغطي:

- محوّلات المزوّدين وتحويل التنسيقات
- تحديد المعدّل، وقاطع الدائرة، والمرونة
- ذاكرة التخزين المؤقت الدلالية، والتكرارية الآمنة، وتتبع التقدم
- عمليات قاعدة البيانات والمخطط (21 وحدة DB)
- تدفقات OAuth والمصادقة
- التحقق من نقاط نهاية API ‏(Zod v4)
- أدوات خادم MCP وإنفاذ النطاق
- نظامَي الذاكرة والمهارات

---

## نمط الشيفرة

- **ESLint** — شغّل `npm run lint` قبل إجراء الالتزام
- **Prettier** — تُنسَّق الشيفرة تلقائيًا عبر `lint-staged` عند الالتزام (مسافتان، فواصل منقوطة، علامات اقتباس مزدوجة، عرض 100 محرف، وفواصل لاحقة وفق es5)
- **TypeScript** — تستخدم جميع الشيفرات في `src/` الامتدادات `.ts`/`.tsx`؛ ويستخدم `open-sse/` الامتدادات `.ts`/`.js`؛ وثّق باستخدام TSDoc (`@param`، `@returns`، `@throws`)
- **ممنوع استخدام `eval()`** — يفرض ESLint القواعد `no-eval`، و`no-implied-eval`، و`no-new-func`
- **التحقق باستخدام Zod** — استخدم مخططات Zod v4 للتحقق من جميع مدخلات API
- **التسمية**: الملفات = camelCase/kebab-case، والمكوّنات = PascalCase، والثوابت = UPPER_SNAKE

### معالجة الأخطاء / كتل catch الفارغة

لا تترك أي `catch` من دون تفسير. صنّفها ضمن إحدى الفئتين التاليتين (لتطبيق
القاعدة الصارمة «عدم تجاهل الأخطاء بصمت مطلقًا في تدفقات SSE»):

- **متعمدة (عمليات التنظيف/القياس عن بُعد بأفضل جهد من جانبنا)** — الفشل هنا متوقع
  وغير ضار؛ أضف تعليقًا من سطر واحد يوضح السبب، من دون تسجيل (فالتسجيل مع كل طلب هو
  الضوضاء التي تتجنبها هذه القاعدة).

  ```ts
  } catch {} // من المتوقع إغلاق متحكم مغلق بالفعل بعد انقطاع اتصال العميل
  ```

- **يجب تسجيلها (شيفرة خارجية/مقدمة من المستدعي، أو عندما يؤدي التجاهل إلى تغيير تدفق التحكم)** — أبقِ
  كتلة catch (ولا تسمح لها مطلقًا بتعطيل التدفق)، ولكن أصدِر `console.debug`/`warn` سياقيًا حتى يكون
  الفشل قابلًا للاكتشاف.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

راجع `open-sse/utils/stream.ts` و`open-sse/utils/streamHandler.ts` للاطلاع على أمثلة مطبقة.

---

## هيكل المشروع

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## إضافة مزوّد جديد

### الخطوة 1: تسجيل ثوابت المزوّد

أضفها إلى `src/shared/constants/providers.ts` — حيث يتم التحقق منها باستخدام Zod عند تحميل الوحدة.

### الخطوة 2: إضافة منفّذ (إذا كان يلزم منطق مخصّص)

أنشئ منفّذًا في `open-sse/executors/your-provider.ts` يمتد من المنفّذ الأساسي.

### الخطوة 3: إضافة مترجم (إذا كان التنسيق غير متوافق مع OpenAI)

أنشئ مترجمات للطلبات والاستجابات في `open-sse/translator/`.

### الخطوة 4: إضافة إعدادات OAuth (إذا كان يعتمد على OAuth)

أضف بيانات اعتماد OAuth في `src/lib/oauth/constants/oauth.ts` والخدمة في `src/lib/oauth/services/`.

إذا كان المزوّد المصدر يوزّع `client_id`/سرًا عامًا لـ OAuth أو مفتاح Firebase Web API ضمن أداة CLI عامة أو حزمة متصفح عامة، **فلا** تضمّنه كسلسلة نصية حرفية. استخدم `resolvePublicCred()` من `open-sse/utils/publicCreds.ts` وأضف إدخال بايتات مُقنّعًا إلى `EMBEDDED_DEFAULTS`. سير العمل الإلزامي الكامل موثّق في [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

داخل المعالجات/المنفّذات، يجب تمرير رسائل الخطأ التي تصل إلى العميل عبر `buildErrorBody()` / `sanitizeErrorMessage()` من `open-sse/utils/error.ts` — لا تضع مطلقًا `err.stack` أو `err.message` الخام في نص Response. راجع [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### الخطوة 5: تسجيل النماذج

أضف تعريفات النماذج في `open-sse/config/providerRegistry.ts`.

### الخطوة 6: إضافة اختبارات

اكتب اختبارات وحدة في `tests/unit/` تغطي، كحد أدنى:

- تسجيل المزوّد
- ترجمة الطلبات/الاستجابات
- معالجة الأخطاء

---

## سحب قائمة التحقق من الطلب

- [ ] اجتياز الاختبارات (`npm test`)
- [ ] تمريرات الوبر (`npm run lint`)
- [ ] البناء ينجح (`npm run build`)
- [ ] تمت إضافة أنواع TypeScript للوظائف والواجهات العامة الجديدة
- [ ] لا توجد أسرار مضمنة أو قيم احتياطية
- [ ] تم تضمين بيانات الاعتماد الأولية العامة عبر `resolvePublicCred()` (انظر [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ) ، وليس كأحرف حرفية أبدًا
- [ ] يتم توجيه استجابات الأخطاء عبر `buildErrorBody()` / `sanitizeErrorMessage()` — ولا توجد آثار مكدس خام في أجسام الاستجابة (راجع [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] أوامر Shell (`exec` / `spawn`) تمرر قيم وقت التشغيل عبر `env`، وليس عبر استيفاء السلسلة
- [ ] تم التحقق من صحة جميع المدخلات باستخدام مخططات Zod
- [ ] سجل التغيير** جزء** تمت إضافته ضمن `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` للتغييرات التي يواجهها المستخدم (انظر [`changelog.d/README.md`](./changelog.d/README.md) ) — do** لا** تحرير `CHANGELOG.md` مباشرة؛ يتم تجميع الأجزاء في وقت الإصدار ولا تتعارض أبدًا بين PRs
- [ ] تم تحديث الوثائق (إن وجدت)
- [ ] لم يتم فتح تنبيهات CodeQL / Secret-Scanning جديدة، أو تم رفض كل منها مع وجود مبرر فني يشير إلى مستند `docs/security/` ذي الصلة
- [ ] المسارات التي تنتج العمليات الفرعية (`/api/mcp/`, `/api/cli-tools/runtime/`) المصنفة على أنها `isLocalOnlyPath()` في `src/server/authz/routeGuard.ts` — راجع [القاعدة الصعبة #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] لا توجد مقطورات AI/bot `Co-authored-by` في رسائل الالتزام (القاعدة الصارمة #16) يُنسب الفضل إلى المتعاونين البشريين — الذين تمت إعادة استخدام عملهم في مقطورات `Co-authored-by: Name <email>` القياسية

---

## الإصدار

تُدار الإصدارات عبر سير العمل `/generate-release`. عند إنشاء إصدار GitHub جديد، تُنشر الحزمة **تلقائيًا على npm** عبر GitHub Actions.

لعمليات النشر على VPS، استخدم `npm run build:release` (وليس `npm run build`) — إذ يُجري
إعادة بناء نظيفة، ويُجمّع الحزمة داخل `dist/`، وينشئ الملف الدال `dist/BUILD_SHA`.
ثم استخدم مهارات `/deploy-vps-*-cc` التي تستخدم rsync لمزامنة `dist/` مع دليل `app/` البعيد.

---

## الحصول على المساعدة

- **البنية المعمارية**: راجع [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **مرجع API**: راجع [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **وثائق الأمان**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)، [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)، [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)، [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **وثائق العمليات**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **المشكلات**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
