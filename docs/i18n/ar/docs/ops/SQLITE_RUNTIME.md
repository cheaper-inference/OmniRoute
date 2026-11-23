# SQLite Runtime Resolution (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

يحدّد OmniRoute برنامج تشغيل SQLite عند بدء التشغيل من خلال سلسلة احتياطية من 5 خطوات:

1. **`better-sqlite3` المضمّن** (عبر `dependencies` في `package.json`)
   — الأسرع، ويستخدم ملفًا ثنائيًا أصليًا، ويُثبَّت بواسطة `npm install` عند توفّر أدوات البناء.

2. **`better-sqlite3` المثبّت وقت التشغيل** (في `~/.omniroute/runtime/`)
   — يُثبَّت عند الحاجة في أول تشغيل **أو** بواسطة `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   يتحقق من البايتات السحرية لملف `.node` الأصلي (ELF / Mach-O / PE) قبل تحميله
   للحماية من الملفات الثنائية التالفة أو المخصّصة لمنصة مختلفة.

3. **`node:sqlite`** (المكتبة القياسية في Node ≥22.5) — لا يتطلب بناءً أصليًا؛ ويُستخدم عندما
   يفشل مسارا better-sqlite3 كلاهما. مجموعة ميزاته محدودة.

4. **`sql.js`** (WASM) — الخيار الاحتياطي الأخير. يعمل في كل مكان، لكنه أبطأ
   ويكتب البيانات على فترات زمنية بدلًا من كتابتها بصورة متزامنة.

## لماذا كل هذا التعقيد؟

- **Windows EBUSY**: قد يفشل `npm install -g omniroute@latest` إذا كان
  `better_sqlite3.node` الخاص بالإصدار السابق مقفلًا بواسطة عملية قيد التشغيل. يتجاوز التثبيت
  وقت التشغيل في `~/.omniroute/runtime/` ذاكرة npm المخبئية العامة.
- **عدم توفّر أدوات البناء**: لا تستطيع بعض البيئات (مثل Windows المؤسسي من دون VS Build
  Tools، وصور Docker المصغّرة) ترجمة `better-sqlite3`. يجلب مثبّت وقت التشغيل
  ملفًا ثنائيًا مسبق البناء من سجل npm؛ وتضمن برامج التشغيل الاحتياطية استمرار تشغيل OmniRoute
  حتى إذا فشل ذلك.
- **الأنظمة المعزولة عن الشبكة**: إذا تعذّر الوصول إلى سجل npm، فإن `node:sqlite`
  أو `sql.js` يضمنان توفير الوظائف الأساسية.

## التحقق من البايتات السحرية

قبل تحميل ملف `.node` مثبّت وقت التشغيل، يقرأ OmniRoute أول 8
بايتات ويطابقها مع القيم السحرية المعروفة للمنصات:

| المنصة            | البايتات (ست عشرية) | التسمية     |
| ----------------- | ------------------- | ----------- |
| Linux             | `7F 45 4C 46`       | `elf`       |
| macOS ‏64 بت BE   | `FE ED FA CF`       | `macho`     |
| macOS ‏64 بت LE   | `CF FA ED FE`       | `macho-le`  |
| macOS متعدد (عام) | `CA FE BA BE`       | `macho-fat` |
| Windows           | `4D 5A` (MZ)        | `pe`        |

عند عدم تطابق القيمة السحرية، يُتجاهل الملف ← وتنتقل العملية إلى الخطوة الاحتياطية التالية.

## التحقق من برنامج التشغيل النشط

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## التحكم اليدوي

```bash
# تخطي التهيئة المسبقة بعد التثبيت لتسريع عمليات تثبيت CI
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# فرض إعادة تثبيت better-sqlite3 الخاص بوقت التشغيل
rm -rf ~/.omniroute/runtime
omniroute  # ستُعاد عملية التثبيت عند بدء التشغيل التالي

# التحقق من برنامج التشغيل النشط
omniroute config db-info  # إذا كان أمر CLI موجودًا
```

## تشخيص حالات التوقف المتزامن

مع `better-sqlite3`، اضبط `OMNIROUTE_SQLITE_SLOW_MS=200` قبل بدء التشغيل للاشتراك
في قياس توقيت المهايئ المتزامن. يكون هذا الخيار معطّلًا افتراضيًا. إذا استغرقت عملية مكتملة
هذا العدد من المللي ثانية على الأقل، فسيصدر تحذير `[SQLITE-SLOW]`، وبحد أقصى مرة واحدة كل
عشر ثوانٍ لكل مهايئ. لا يحتوي التحذير إلا على برنامج التشغيل، وفئة العملية
(`prepare` أو `get` أو `all` أو `run` أو `exec` أو `pragma` أو المعاملة أو الصيانة)،
والزمن المنقضي بالمللي ثانية: ولا يتضمن SQL أو الارتباطات أو الصفوف أو المسارات أو نص الاستثناء.

هذه أداة مساعدة للتشخيص، وليست مهلة زمنية أو تحسينًا للاستعلامات. لا يمكنها الإبلاغ
عن عملية لا تعود أبدًا، أو التمييز بين عمل وحدة المعالجة المركزية وانتظار القرص، أو تحديد
تعليمة SQL الدقيقة، أو مراقبة العمليات المنفّذة من خلال مقبض برنامج التشغيل الخام.
تُستثنى مدة النسخ الاحتياطي غير المتزامن عمدًا؛ ولا تُضاف أدوات القياس إلى برامج تشغيل SQLite
الأخرى من خلال هذا الاشتراك. يؤدي تعطيل المتغير إلى استعادة المهايئ الأصلي
من دون أغلفة التوقيت. ولا يتغير مخطط قاعدة البيانات أو الإعدادات المخزنة.

يُبلغ تحذير التأخر في `/healthz` عن ذروة تأخر حلقة الأحداث منذ العينة السابقة،
وليس عن متوسط مدة التشغيل بأكملها. اربط طوابعه الزمنية بتحذيرات العمليات البطيئة
ومقاييس المضيف/التخزين قبل عزو التوقف إلى SQLite أو إلى عطل في القرص.

## المرجع

التنفيذ:

- `bin/cli/runtime/magicBytes.mjs` — أدوات مساعدة للتحقق من البايتات السحرية للملفات الثنائية
- `bin/cli/runtime/sqliteRuntime.mjs` — محلّل وقت التشغيل المكوّن من 5 خطوات + المثبّت الكسول
- `bin/cli/runtime/index.mjs` — منسّق بدء التشغيل (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — خطاف npm لما بعد التثبيت (تهيئة مسبقة غير فادحة)
- `src/lib/db/core.ts` — تصديرات `ensureDbInitialized()` / `getDriverInfo()`

## بنية الكاتب الواحد (HA غير مدعوم)

لا تزال سلسلة برامج التشغيل الاحتياطية أعلاه تعمل ضمن **عملية واحدة**. يستخدم OmniRoute
مع SQLite الافتراضي **كاتبًا واحدًا**:

- لا تربط نسختين متماثلتين من OmniRoute بملف `storage.sqlite` نفسه.
- تؤدي إعادة تشغيل الحاوية، أو نشر Recreate، أو إنهاء OOM، أو إعادة تشغيل HEALTHCHECK إلى قطع
  كل جلسة SSE قيد التنفيذ. لا توجد عملية استنزاف للجلسات في المسار الافتراضي.
- سيؤدي فحص حيوية المنسّق الذي يعتبر استجابة `/healthz` البطيئة حالة توقف إلى إنهاء النسخة
  الوحيدة. استخدم فحص حيوية TCP + فحص جاهزية HTTP عبر `/healthz`. راجع
  [دليل Docker — التوفّر](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  و[توصيات مجسّات Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
