# Quality Gates Reference (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

هذا المستند هو المرجع المعتمد لجميع بوابات جودة CI في OmniRoute.
وهو يصف كل بوابة، وما تتحقق منه، ومهمة CI التي تعمل ضمنها، وما إذا كانت تستخدم
خط أساس تصاعديًا أم سياسة نجاح/فشل، وما إذا كانت تحظر عملية البناء أم أنها استشارية.

للاطلاع على ملخص موجز وسياسة قائمة السماح، راجع قسم "بوابات الجودة والخطوط الأساسية التصاعدية"
في `AGENTS.md`. وللاطلاع على التقييم النقدي، وتصنيف النضج، وخطة النسخ المحايدة للأدوات
للنظام نفسه، راجع
[دليل بوابات الجودة](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## مخزون البوابات وملفات تعريف التنفيذ

### قبول المرشحين

يُصدر كلٌّ من سيرَي عمل CI وبوابات الجودة حكمًا ثابتًا: `Gate / CI` و
`Gate / Quality`. وتُعدِّد سياسة القبول ذات الإصدارات الخاصة بهما كل مهمة منبع
بوصفها مطلوبة أو استشارية. يجب أن تنجح المهمة المطلوبة المنطبقة: فالنتائج
المفقودة أو الملغاة أو المتخطاة أو المعلقة أو المجهولة لا يمكنها إثبات PASS. قد
يجعل التصنيف الصالح الخاص بالتوثيق فقط أو بالكتالوج فقط مسار الشيفرة غير منطبق؛
ولا يُعد طلب السحب المسودة مرشحًا مقبولًا. لا تُسقط تسمية `hotfix` متطلبات الأدلة.

يغطي سيرا العمل كلاهما طلبات السحب إلى فروع main/release، وعمليات الدفع إلى `main`، والتشغيل اليدوي،
وأحداث مجموعة الدمج. تشغّل عمليات الدفع والتشغيل ومجموعة الدمج التحديد الكامل. لا تؤدي عمليات الدفع إلى
`release/**` إلى تشغيلهما (2026-10-18): إذ خضع كل تغيير بالفعل للمصفوفة في طلب السحب الخاص به،
وتكون التركيبة المدمجة من اختصاص Release-Green ‏(`docs/ops/RUNNER_BOX.md` → المسار المستضاف). تستخدم النسخ المتفرعة
ومجموعات الدمج مشغّلات مستضافة للمهام التي كانت ستختار بخلاف ذلك مشغّلات
ذاتية الاستضافة؛ ويجب التحقق من كفاية السعة المستضافة قبل الطرح.

يشغّل طلب السحب العادي التحديد السريع. ولا تعمل مسارات `full-code` و`full-code-e2e` في
سياسة القبول (E2E، والتكامل، وأداة الحزمة، واختبار Electron السريع، وBun SQLite، والنظام البيئي،
وعملاء البروتوكول) إلا على مسودة قائمة انتظار Mergify أو ضمن تشغيل كامل:
`gh workflow run ci.yml --ref <branch>`.

### قائمة انتظار الدمج

ترسل تسمية `queue` طلب سحب إلى قائمة انتظار Mergify ‏(`.mergify.yml`). يفتح Mergify طلب سحب مسودة على
فرع `mergify/merge-queue/`، ويشغّل CI التحديد الكامل هناك، ويُدمج طلب السحب الأصلي
عند نجاح `Gate / CI` و`Gate / Quality` و`Merge integrity (changelog + generated skills)`.

يكتب Mergify ملخص قائمة الانتظار الخاص به في وصف المسودة، ويمكن لتطبيقات أخرى تعديله أيضًا.
يتخذ حدث `pull_request` من النوع `edited` في مثل هذه المسودة مجموعة تزامن خاصة به
(`-queue-edit-<run_id>`) كي لا يتمكن من إلغاء التشغيل الحقيقي للمسودة، ويتخطى البوابة
والمصفوفة. يظل `Merge integrity` وحده قيد التشغيل. تحمل مهمة البوابة المتخطاة اسم فحص مختلفًا،
لأن Mergify يقرأ `Gate / CI` المتخطاة بوصفها فحصًا فاشلًا ويزيل طلب السحب من قائمة الانتظار.

بعد الإزالة من قائمة الانتظار، لا تؤدي عملية الدفع دائمًا إلى إعادة طلب السحب إليها. علّق بـ `@mergifyio queue` عليه.

يحدد كل إيصال JSON قيمة SHA التي تم جلبها، وتشغيل سير العمل، والمحاولة.
ترفض CLI عدم تطابق SHA بين النسخة التي تم جلبها والحدث. تربط اختبارات سير العمل عضوية السياسة
بقائمة `needs` الخاصة بمهمة الحكم، بحيث لا يمكن لمسار جديد أو مُزال أن يختفي دون تنبيه.
تغطي الإيصالات سير العمل الخاص بها، لا النشر أو التوزيع أو التفاصيل الداخلية
لأداة فحص استشارية موجودة. يُعد تفعيل اسمي الفحص كليهما في قواعد الفروع
تغييرًا إداريًا منفصلًا؛ ولا تؤدي إضافة هذه المهام بحد ذاتها إلى حماية فرع.

### مخزون الفحص الثابت

يوجد مخزون الأسماء البديلة لـ npm ذي الإصدارات وعضوية الفحص الثابت في
`config/quality/gate-manifest.json`. شغّل `npm run check:gate-manifest` للتحقق
من أسماء البرامج النصية والأوامر الدقيقة بمقارنتها مع `package.json`؛ وتؤدي الإضافات وعمليات الإزالة
وانحراف الأوامر إلى فشل كلٍّ من الخطاف المحلي ومهام تصنيف التغييرات في CI.
الاسم البديل ليس مهمة سير عمل أو مثيل مصفوفة أو حالة اختبار: ويجب
ألا تُعرض هذه الأعداد بوصفها قابلة للتبادل.

استخدم `npm run quality:scan -- --list` أو `npm run quality:scan:fast -- --list`
لفحص الأسماء البديلة المحددة دون تنفيذها. يستدعي المشغّل
نقطة دخول npm، ولذلك تُحفظ بيئة تشغيلها (بما في ذلك Bun حيث تم إعداده).
يسجل ملف البيان الأسماء البديلة خارج ملفات التعريف هذه بوصفها مستدعاة على نحو منفصل، وتُحظر
أوامر الصيانة في ملفات تعريف الفحص المخصصة للقراءة فقط.

لا تغطي ملفات التعريف هذه سوى الفحص الثابت. وهي لا تصدّق على اختبارات المنتج،
أو التغطية، أو التحزيم، أو الفحوص الخارجية، أو القبول الكامل للمرشح للإصدار.
يستخدم قبول سير العمل الملف المرتبط `config/quality/admission-policy.json` و
`scripts/quality/admission-verdict.mjs`. وتظل ملفات تعريف مراقب الإصدار منفصلة؛
افحص فحوصها وإيصالاتها المنطبقة بصورة مستقلة. المخزون النصي
أدناه مرجع، وليس دليلًا على أن بوابة قد عملت بالفعل.

توجد البرامج النصية ضمن `scripts/check/` (بوابات السياسة) و`scripts/quality/` (محرك التشديد التدريجي).
مصدر الحقيقة الخاص بـ CI هو `.github/workflows/ci.yml`.

### المسار السريع لطلب سحب الإصدار (`quality.yml`)

يكمّل `.github/workflows/quality.yml` ‏CI في طلبات السحب إلى main/release، وعمليات الدفع إلى `main`،
والتشغيل، ومجموعات الدمج. تستخدم طلبات السحب فحوصًا سريعة مرشحة حسب المسار. أُزيلت
عملية البناء المكررة المعطّلة نهائيًا؛ وتظل فحوص البناء/الحزم/الإقلاع الحقيقية في CI.
ولا تعمل حزمة اختبارات الوحدة وvitest إلا في CI ‏(`Unit Tests (N/8)` و`Vitest`).

| المهمة                                           | النطاق                                                                                                                                  | حاجبة                          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Docs Gates (fast-path)`                         | طلبات سحب التوثيق/الشيفرة؛ مراجع توثيق API والتوثيق الكامل                                                                              | نعم                            |
| `Fast Quality Gates`                             | طلبات سحب الشيفرة؛ فحوص ثابتة، وفحص الأنواع، وفحص أنواع لوحة المعلومات، واختبارات الوحدة المتأثرة، واختبارات الأشقاء المنسية (استشارية) |
| `No new ESLint warnings`                         | طلبات سحب الشيفرة؛ حارس lint مدرك لعمليات الكبت                                                                                         | نعم، بما في ذلك النسخ المتفرعة |
| `Merge integrity (changelog + generated skills)` | طلبات السحب غير المسودة؛ مزامنة سجل التغييرات والمهارات المولدة                                                                         | نعم، بما في ذلك النسخ المتفرعة |

#### تقرير اختبارات الأشقاء المنسية

يعمل `npm run check:forgotten-sibling-tests` كخطوة استشارية ضمن `Fast Quality Gates` ويعيد استخدام
محلّل الاستيراد الذي تستند إليه خريطة تأثير الاختبارات.
ولكل وحدة إنتاجية متغيّرة، يُبلغ عن سلاسل حتمية من النوع
`changed module/symbol -> static consumer -> candidate sibling test` عندما لا يكون الاختبار المرشّح
موجودًا في فرق تغييرات طلب السحب. ويُحتفظ بملخص Markdown ونتيجة JSON بوصفهما أثر سير العمل
`forgotten-sibling-tests` لأغراض المعايرة قبل أي طرح يفرض الحظر.

لا تُستخدم عمليات إعادة التصدير عبر ملفات Barrel وعمليات الاستيراد الديناميكي إلا لتشخيص التحليل؛ ولا تؤدي مطلقًا إلى
نتيجة تحظر الدمج. توجد الاستثناءات التي خضعت للمراجعة في
`config/quality/forgotten-sibling-allowlist.json`. يجب أن يحدّد كل إدخال المستهلك والاختبار
المرشّح، وأن يقدّم مبررًا محددًا، وأن يتضمن رابطًا إلى مشكلة أو طلب سحب على GitHub. تؤدي الإدخالات غير الصالحة
إلى الحظر افتراضيًا. لا يمكن للاستثناءات أن تتجاوز حذف اختبار مرشّح أو فرق تغييرات يضيف `.skip`/`.todo`؛
ويظل إضعاف التأكيدات وغيره من أساليب الإخفاء ضمن مسؤولية بوابة
`check:test-masking` المستقلة والحاظرة للدمج.

### المهمة: `lint`

تعمل مع كل طلب سحب إلى `main`. وتحظر الدمج عند الفشل.

| السكربت (`npm run ...`)           | ما يتحقق منه                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | الحظر                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | وقوع إصدار Node.js ضمن النطاق المدعوم                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | نعم                                      |
| `check:cycles`                    | الاستيرادات الدائرية في جميع أجزاء `src/` و`open-sse/` (استنادًا إلى AST، مع تحليل `paths` في tsconfig). ينتهي الفحص الأساسي بالرمز 1 متى وُجدت أي دورة (فشل مغلق منذ #15281)، ويسرد مكوّنات SCC. يحظر `check:cycles:ratchet` (الذي تشغّله CI) عندما يتجاوز العدد الحد الأقصى `metrics.cycles` في `quality-baseline.json` — وهو حاليًا 14، مع `direction: down`، لذا لا يمكنه إلا الانخفاض (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم (آلية السقاطة)                       |
| `check:boundary`                  | اقتران `open-sse → src`: الاستيرادات الفريدة من ملف إلى ملف من المحرّك إلى التطبيق (`scripts/quality/measure-boundary.mjs`؛ قائمة الحواف هي قائمة الأعمال المتراكمة لمعالجة فصل النواة/الوحدات في v4). الفحص الأساسي = تقرير استشاري (مثل `quality:boundary`). يحظر `check:boundary:ratchet` (الذي تشغّله CI، والموجود أيضًا في حلقة السقاطة للبوابات السريعة في `quality.yml`) عندما يتجاوز العدد الحد الأقصى `metrics.boundaryOpenSseToSrc` في `quality-baseline.json` — وقد ضُبط مبدئيًا على القيمة المقاسة 771، مع `direction: down`؛ ولا يؤدي `--update` إلا إلى خفضه؛ ويكون نسبيًا إلى الفرع الأساسي في طلبات PR (`--base-ref`، انظر أدناه)                                                                                                                                                                                                  | نعم (آلية السقاطة)                       |
| `check:route-validation:t06`      | وجود مخططات Zod في جميع المسارات (سياسة المستوى 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                      |
| `check:any-budget:t11`            | عدد `@ts-expect-error // any` لا يتجاوز الميزانية (المستوى 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | نعم                                      |
| `check:provider-consistency`      | لكل موفّر في `providers.ts` إدخال مطابق في `providerRegistry.ts` (والعكس صحيح، ضمن قائمة السماح)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                      |
| `check:model-lifecycle`           | تظل جداول التوجيه الثلاثة التي تتم صيانتها يدويًا متسقة مع لقطة دورة الحياة المحفوظة في المستودع (#11503): لا يمنح `FITNESS_TABLE` (`taskFitness.ts`) درجة لأي معرّف متقاعد يمكن لـ `REGISTRY` توجيهه؛ وكل هدف في `BUILT_IN_ALIASES` موجود في `REGISTRY` وغير موجود في لقطة المعرّفات المتقاعدة؛ وكل معرّف متقاعد لا يزال في `REGISTRY` تتم إعادة توجيهه أو إدراجه في `allowedRetiredInCatalog`؛ ولا يظهر أي مصدر أو هدف في `DEFAULT_DEGRADATION_MAP` بصفته متقاعدًا في تلك اللقطة. لا يثبت هذا أن النموذج تتم خدمته حاليًا بواسطة جهة خارجية عاملة. يعمل دون اتصال — إذ يقارن مع `config/quality/model-lifecycle.json`، الذي يُحدَّث يدويًا باستخدام `npm run quality:refresh-model-lifecycle` (يتطلب الشبكة؛ غير مدمج في CI). يمثّل `allowedRetiredInCatalog` آلية تصعيد تدريجية للتقليص: لا تُضف إدخالًا إلا مع مشكلة تتبّع.                    | نعم                                      |
| `check:fetch-targets`             | كل استدعاء `fetch("/api/...")` في `src/` من جانب العميل يُحل إلى ملف `route.ts` فعلي                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                      |
| `check:deps`                      | جميع التبعيات القابلة للتثبيت عبر `npm install` في كل ملف `package.json` في المستودع موجودة في `dependency-allowlist.json`؛ ويتم وضع علامة على الحزم الجديدة غير المثبّتة بإصدار محدد أو التي تنتحل أسماء حزم شائعة                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                      |
| `audit:deps`                      | `npm audit` (الجذر + electron) — لا توجد تحذيرات عالية أو حرجة (يتداخل مع فحص osv ‏`check:vuln-ratchet`؛ راجع قائمة الأعمال المتراكمة للترشيد)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                      |
| `check:lockfile`                  | سلامة `package-lock.json` — سجل https، وتجزئات السلامة، وعدم وجود تجاوزات للمضيف                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                      |
| `check:licenses`                  | قائمة السماح لتراخيص SPDX لتبعيات الإنتاج                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                      |
| `check:tracked-artifacts`         | عدم وجود عناصر ناتجة عن البناء / روابط رمزية لـ `node_modules` ملتزم بها (يُشغَّل أيضًا في husky pre-commit؛ أما pre-push فخفيف عمدًا — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                      |
| `check:ai-attribution`            | عدم وجود تذييل `Co-Authored-By` من ذكاء اصطناعي/روبوت أو تذييل يشير إلى التوليد بالذكاء الاصطناعي في التزامات طلب السحب أو عنوانه أو نصه — القاعدة الصارمة #16 (ضمن حلقة البوابات السريعة في `quality.yml` لطلب سحب→`release/**` — يقرأ حمولة الحدث ولا ينفّذ شيئًا خارج طلبات السحب — وخطوة مخصصة لطلبات السحب فقط ضمن فحص lint في `ci.yml` لطلب سحب→`main`؛ وكذلك خطاف husky `commit-msg`؛ يُسمح بالمؤلفين المشاركين من البشر؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | يجب أن يشير كل استثناء في Vitest إلى مشكلة تتبّع وأن يظهر في `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                      |
| `check:file-size`                 | يجب أن تظل ملفات المصدر (`.ts`/`.tsx` في `src/` و`open-sse/` و`electron/` و`bin/`) ضمن `cap`، وملفات الاختبار (`*.test.ts(x)`) ضمن `testCap`؛ ويجب ألا تتجاوز الملفات المجمّدة في `file-size-baseline.json` (`frozen` / `testFrozen`) حجمها المسجّل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                      |
| `check:error-helper`              | استجابات الخطأ في executors/handlers تستخدم `buildErrorBody()` / `sanitizeErrorMessage()` (القاعدة الصعبة #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                      |
| `check:migration-numbering`       | يتم ترقيم ملفات SQL للترحيل بشكل تسلسلي، ولا توجد فجوات أو تكرارات                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                      |
| `check:public-creds`              | لا توجد مفاتيح OAuth `client_id`/`client_secret` أو Firebase Web حرفية خارج `publicCreds.ts` (القاعدة الصلبة #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                      |
| `check:db-rules`                  | لا يوجد SQL خام خارج وحدات `src/lib/db/` ؛ لا توجد واردات برميل من `localDb.ts` (القواعد الصارمة #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | نعم                                      |
| `check:known-symbols`             | يتطابق منفذو الموفرين واستراتيجيات التوجيه والمترجمون المسجلون في جداول الإرسال الخاصة بهم مع الملفات الموجودة على القرص — ولا توجد رموز معزولة أو غير معلنة                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                      |
| `check:route-guard-membership`    | يتم تصنيف كل مسار يولد عملية فرعية حسب `isLocalOnlyPath()` (القواعد الصارمة #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                      |
| `check:test-discovery`            | يتم جمع كل ملف `*.test.ts` / `*.spec.ts` في الريبو بواسطة عداء اختبار واحد على الأقل (السقاطة: يمكن تقليص القائمة اليتيمة في `test-discovery-baseline.json` فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                      |
| `check:test-tla-order`            | لا يوجد ملف `node:test` ضمن `tests/unit` يسجل اختبارًا، ويصل إلى `await` عالي المستوى، ثم يسجل المزيد (#18045; اسئلة: `test-tla-order-allowlist.json` يمكن أن يتقلص فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | نعم                                      |
| `check:agent-skills-sync`         | تتطابق القطع الأثرية التي تم إنشاؤها لمهارات العميل مع كتالوج المصدر الخاص بها (بدون انحراف)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | مزود logos/assets يحمل إدخال مصدر مسجل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | تقوم ملفات التكوين JSON بتحليل وتلبية قواعد الريبو لينت                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | تجميع TypeScript بدون أخطاء (التحذيرات الاستشارية فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | نعم                                      |
| `typecheck:noimplicit:core`       | تطلعية صارمة `noImplicitAny` — ؛ لا تزال العديد من مواقع الاتصال الموجودة مسبقًا بحاجة إلى التعليقات التوضيحية                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **استشارية** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | تم تحديد نطاق `tsc` إلى `src/app/(dashboard)/**` (#7033) — `typecheck:core` لا تتضمن القائمة المسموح بها المكونة من 27 ملفًا أي لوحة معلومات TSX، ولم يتحقق `next build` أبدًا من الكتابة أيضًا (`next.config.mjs` يحدد `ignoreBuildErrors: true`) ، لذلك كانت انحدارات المعرف اليتيم هناك (#6625/#6909) غير مرئية لـ CI. يختلف عن خط الأساس لعدد per-file/per-TS-code المجمد (`config/quality/dashboard-typecheck-baseline.json`، نفس نمط الإنفاذ الذي لا معنى له مثل `check:known-symbols`) — فقط أخطاء NEW التي تتجاوز العد الأساسي تفشل في البوابة؛ قم بالسحب لأسفل باستخدام `--update` عند إصلاح خطأ موجود مسبقًا.                                                                                                                                                                                                                            | نعم                                      |
| `check:build-typecheck`           | التحقق من نوع إنتاج التطبيق بالكامل عبر `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`)، ولا تغطي القائمة المسموح بها المكونة من 27 ملفًا لـ `typecheck:core` السطحي وبوابة لوحة المعلومات. يختلف ضد `config/quality/build-typecheck-baseline.json`; يفشل عدد جديد أو مرتفع لكل (ملف، رمز)، ويطلب منك عدد أقل التصعيد. يرفض `--update` بينما يحتوي التشغيل على زوج جديد أو مرفوع ما لم يتم تمرير `--force-regressions` ، ويرفض ملفًا تم إسكاته حديثًا ما لم يتم تمرير `--force-nocheck` ، لذا فإن توسيع خط الأساس للحصول على اللون الأخضر ومنح صمت دائم هما عملان متعمدان منفصلان. تم رفض `--force` العارية. يقوم أيضًا بفحص نطاق البناء لـ `@ts-nocheck` مقابل `config/quality/ts-nocheck-baseline.json`، لأن الملف الذي يستخدمه لا يُبلغ عن أي تشخيصات على الإطلاق، وإلا سيكون غير مرئي لكل بوابة. | نعم                                      |

#### هناك برنامجان للتحقق من الكتابة يجيبان بشكل مختلف

يقوم `typecheck:core` و `check:build-typecheck` بتجميع برامج مختلفة ضمن خيارات مختلفة، ويمكن أن يكون الملف نفسه نظيفًا في أحدهما ومليئًا بالأخطاء في الآخر.

يقوم `tsconfig.build.json` بتعيين `"strict": false`، لذلك يتم إيقاف تشغيل `noImplicitAny`. يقوم التكوين الأساسي بتجميع قائمة مسموحة منسقة مكونة من 27 ملفًا مع خيارات أكثر صرامة ويتبع الرسم البياني للاستيراد لكل إدخال، لذلك يتم التحقق من الملفات التي لا تظهر أبدًا في برنامج الإنشاء هناك.

العواقب مهمة عند الحكم على ما إذا كان الملف قد تم كتابته:** التشخيص الصفري تحت `check:build-typecheck` لا يعني الصفر** . أدى تجريد `@ts-nocheck` من 26 ملفًا إلى إظهار 23 منها نظيفة في برنامج البناء؛ ظهرت ستة عشر منها حوالي 120 خطأ ضمنيًا في الخطأ الصارم. تحقق من كليهما قبل استدعاء ملف نظيف.

### الوظيفة: `quality-gate`

يعمل بعد `test-coverage`. دمج الكتل عند الفشل.

| البرنامج النصي               | التحقق من صحة                                                                                                                              | الحظر                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `quality:collect`            | يصدر `quality-metrics.json` (عدد تحذيرات ESLint ، تغطية من تقرير الجزء المدمج)                                                             | نعم (المنبع من السقاطة) |
| `quality:ratchet`            | لم يتراجع كل مقياس في `quality-baseline.json` (تحذيرات ESLint خط الأساس ≤ ؛ خط الأساس ≥ التغطية)                                           | نعم                     |
| `check:duplication`          | لا يتجاوز تكرار الكود (jscpd@4) خط الأساس في `quality-baseline.json`                                                                       | نعم                     |
| `check:complexity`           | لا يتجاوز التعقيد الدوري على مستوى الملف الحد الأقصى (core ESLint `complexity` + `max-lines-per-function`)                                 | نعم                     |
| `check:cognitive-complexity` | سقاطة التعقيد المعرفي (`eslint-plugin-sonarjs`) — ممر ESLint منفصل؛ يعمل CI على حد سواء مدمجين كخطوة `check:complexity-ratchets` الفردية   | نعم                     |
| `check:dead-code`            | لا تتراجع الصادرات/الملفات غير المستخدمة (knip) عن خط الأساس                                                                               | نعم                     |
| `check:compression-budget`   | يجب ألا تتراجع حدود توفير الرمز المميز للميزانية المعيارية للضغط — لكل محرك                                                                | نعم                     |
| `check:type-coverage`        | السقاطة المكتوبة بنسبة مئوية (`type-coverage`) لا تتراجع؛ يتضمن إلى حد كبير `typecheck:noimplicit:core`                                    | نعم                     |
| `check:codeql-ratchet`       | لا يتراجع عدد تنبيهات CodeQL المفتوحة (يقرأ عبر `gh api`؛ تخطي رشيق بدون رمز مميز) إيقاع تحديث — والمشغل اليدوي: راجع "CodeQL اسئلة" أدناه | نعم                     |

### الوظيفة: `quality-extended`

الوظيفة بأكملها استشارية (`continue-on-error: true`). تعمل السقاطات المستندة إلى npm بشكل حقيقي؛ يتم تثبيت الماسحات الضوئية الخارجية عبر `gh release download` والتخطي الذاتي (الخروج 0) عندما لا يزال الملف الثنائي غائبًا.

| البرنامج النصي           | التحقق من صحة                                                                                                                                                                                          | الحظر                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:circular-deps`    | لا توجد تبعيات دائرية (dpdm)                                                                                                                                                                           | **استشارية**                            |
| `check:bundle-size`      | حجم الحزمة لا يتجاوز الحد الأقصى                                                                                                                                                                       | **استشارية**                            |
| `check:secrets`          | يتم تخطي المسح السري (gitleaks) — في حالة غياب الثنائي                                                                                                                                                 | **استشارية**                            |
| `check:vuln-ratchet`     | لا تتراجع ثغرات التبعية (osv-scanner) عن تخطي — في حالة غياب الثنائي                                                                                                                                   | **استشارية**                            |
| `check:workflows`        | لينت سير العمل (actionlint + zizmor)؛ تفشل الماسحات الضوئية missing/broken أو التقارير غير الصالحة أو خط الأساس المفقود في حالة INCOMPLETE. تتبع النتائج الصالحة سياسة strict/advisory/ratchet المحددة | التنفيذ مطلوب؛ zizmor حجب السقاطة في CI |
| `check:openapi-breaking` | تغييرات جذرية على عقد API العام (`openapi.yaml`) مقابل الفرع الأساسي (oasdiff) — ينبعث `openapiBreaking=N`؛ يتم التخطي في حالة غياب oasdiff أو عدم إمكانية حل المواصفات الأساسية                       | **استشارية**                            |

### الوظيفة: `docs-sync-strict`

يعمل على كل PR إلى `main`. دمج الكتل عند الفشل.

| البرنامج النصي                 | التحقق من صحة                                                                                                                                                       | الحظر                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | البوابة الوصفية التي تدير البوابات الفرعية الستة أدناه بشكل تسلسلي                                                                                                  | نعم                        |
| ↳ `check:docs-sync`            | تناسق إصدار CHANGELOG / OpenAPI / llm.txt                                                                                                                           | نعم                        |
| ↳ `check:docs-counts`          | توجد الأعداد النثرية (عدد الموفرين، وعدد الترحيل، وما إلى ذلك) ضمن نافذة السقاطة للأعداد الحقيقية                                                                   | نعم                        |
| ↳ `check:env-doc-sync`         | يتم توثيق كل env var في `.env.example` في جدول المستندات، والعكس صحيح                                                                                               | نعم                        |
| ↳ `check:deprecated-versions`  | لا توجد سلاسل إصدار مهملة في المستندات                                                                                                                              | نعم                        |
| ↳ `check:doc-links`            | روابط تخفيض السعر الداخلية في المستندات تتحول إلى ملفات حقيقية (نموذج `[text]`/`(path)` )                                                                           | نعم                        |
| ↳ `check:fabricated-docs`      | توجد المسارات وenv vars وأوامر CLI وأسماء الخطافات ومسارات الملفات المذكورة في المستندات في قاعدة التعليمات البرمجية. بوابة صلبة عبر `--strict`؛ فشل ناعم بدون علم. | نعم (عبر `--strict` في CI) |
| `check:cli-i18n`               | سلاسل أوامر CLI موجودة في كافة الملفات المحلية لـ i18n                                                                                                              | نعم                        |
| `check:openapi-coverage`       | تغطي مواصفات OpenAPI على الأقل أرضية متصاعدة من الطرق الحقيقية                                                                                                      | نعم                        |
| `check:openapi-security-tiers` | تتوافق التعليقات التوضيحية لطبقة الأمان في `openapi.yaml` مع تصنيفات `routeGuard.ts`                                                                                | **استشارية**               |
| `check:openapi-routes`         | كل مسار في `openapi.yaml` يتحول إلى `route.ts` حقيقي (مضاد للهلوسة)                                                                                                 | نعم                        |
| `check:docs-symbols`           | كل مرجع `/api/...` في `docs/**/*.md` يتحول إلى `route.ts` حقيقي (مضاد للهلوسة)                                                                                      | نعم                        |
| `i18n translation drift`       | المفاتيح غير المترجمة في ملفات لغة i18n — تحذير فقط                                                                                                                 | **استشارية**               |

يتم إنشاء اثني عشر README SVGs تحت `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` يجددهم جميعًا). يحتوي كل منها على اختبار وحدة مقارنة البايت (`tests/unit/docs/readme-*-svg.test.ts`، job `test-unit`) الذي يفشل عندما يكون الملف الملتزم قديمًا، ويقرأ `check:docs-counts` الأرقام المتعارف عليها من عقد `<text>` الخاصة بها — ولهذا السبب تحافظ خطوة التحديد التفصيلي على كل سلسلة محددة في الملف على أنها `<text>` غير مرئية. يقرأ فحص الأرقام الأساسية SVG الملفات المدرجة في `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg` `free-tier-budget.svg` و `promise-pillars.svg` و `comparison-table.svg` و `cli-terminal.svg` و `tier-cascade.svg` بالإضافة إلى `public/images/tier-flow-dark.svg` و `tier-flow-light.svg`؛ كما تقرأ المطالبات المجانية للأبد وإدخال الكتالوج والتجميع المتكرر وعوامل التسجيل `promise-pillars.svg` و `free-tier-budget.svg` و `strategies-grid.svg`. يسحب `free-tier-budget.svg` أرقامه من أداة تحميل الكتالوج المباشر، لذا فإن التغيير إلى `FREE_MODEL_BUDGETS` أو اسم عرض الموفر باللون الأحمر CI حتى يتم إعادة إنشاء هذا الملف.

### الوظيفة: `i18n-ui-coverage`

| البرنامج النصي                   | التحقق من صحة                                                                                                                                                                                  | الحظر        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (مضمنة) | تغطية مفتاح UI i18n هي ≥ 65%                                                                                                                                                                   | نعم          |
| `check-ui-value-drift` (مضمنة)   | الإنجليزية المعاد كتابتها** قيمة** لا يترك أي ترجمة قديمة وراءه                                                                                                                                | نعم          |
| `check-new-key-coverage` (مضمنة) | أ** جديد** تتم ترجمة مفتاح اللغة الإنجليزية في كل لغة — ويتم رفض علامة `__MISSING__:`                                                                                                          | نعم          |
| `check-translation-ratio`        | يجب ألا تتجاوز نسبة الترجمة الحقيقية لكل لغة (متطابقة مع اللغة الإنجليزية / العنصر النائب / الأوراق المفقودة خارج القائمة المسموح بها) `config/quality/i18n-translation-baseline.json` + slack | **استشارية** |

تحتاج إلى `fetch-depth: 0` — حيث تختلف بوابة انجراف القيمة `en.json` عن قاعدة الدمج.

#### `check-ui-value-drift` — بوابة الترجمة التي لا معنى لها

يلتقط انحدار i18n الوحيد الذي لا تستطيع البوابات الأخرى رؤيته من الناحية الهيكلية: تتم إعادة كتابة القيمة الإنجليزية وتبقى الترجمات المشتقة من اللغة الإنجليزية _السابقة، لذلك يستمر المستخدمون غير الإنجليزيين في قراءة النسخة ذات الكلمات الواثقة والتي أصبحت الآن خاطئة.

تم شحن هذا بشكل حقيقي. تمت إعادة كتابة `oauthModal.googleOAuthWarning` عندما وصل مساعد تسجيل الدخول Antigravity (#5203) ؛** 39 من 43 منطقة** احتفظ بنص يخبر المشغلين "بنسخ URL الكامل ولصقه أدناه" — وهو تدفق لا يمكن إكماله لهذا المزود. لقد مرت دون أن يلاحظها أحد حتى #8463 للأسباب التالية:

- `sync-ui-keys` يقوم فقط بملء المفاتيح الموجودة** غائب** ، أبدا تلك التي** قديمة** ;
- تحسب `check-ui-keys-coverage` _التواجد_ الرئيسي، لذلك يتم تصنيف الترجمة القديمة على أنها مغطاة؛
- `check-translation-drift` يتتبع مرايا وثائق `docs/i18n/<locale>/**.md` — ولا يقرأ `src/i18n/messages/*.json` أبدًا. حظر الوظيفة `docs-sync-strict` منذ إعادة المزامنة 2026-09: تحرير مستند أساسي → `npm run i18n:run -- --files=<doc>` (على مستوى القسم، رخيص).

**علمًا بالفرق، وليس مدعومًا بخط الأساس.** إنه يقارن `en.json` عند قاعدة الدمج بشجرة العمل؛ مقابل كل مفتاح تغيرت قيمته الإنجليزية، فإن أي لغة لا تزال تحتوي على ترجمة لم تمسها تصبح قديمة. هذا عمدا** تجميد الديون الموجودة مسبقا** لا يمكن — a diff الكشف عن اللغة الإنجليزية القديمة التي جاءت منها الترجمة القديمة، لذا فإن البوابة تحكم فقط على ما يمسه التغيير الحالي. البديل (خط أساس التجزئة لكل مفتاح) سيكلف ملفًا تم إنشاؤه ~ 600 KB ، 3 × وهو أكبر خط أساس موجود، ويتم تشغيله على كل i18n PR.

طريقتان لإرضائه:

1. قم بتحديث الترجمات المتأثرة، أو
2. اضبطهم على `__MISSING__:<new english>` — في وقت التشغيل ثم يخدم اللغة الإنجليزية المصححة (`src/i18n/request.ts::deepMergeFallback`، #7258) وقوائم الانتظار الرئيسية للترجمة.

إذا كانت السلسلة** معنى** تغيرت، تفضل** إعادة تسمية المفتاح** : لا يمكن للمفتاح الجديد أن يرث ترجمة قديمة. هذا هو النمط المستخدم #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

يتم الخروج من 0 باستخدام `SKIP reason=base-unresolved` عندما لا يمكن قراءة الكتالوج الأساسي (استنساخ سطحي بدون المرجع الأساسي)، مما يعكس `check-openapi-breaking`.

### الوظيفة: `i18n`

مصفوفة التحقق من صحة i18n الكاملة (وظيفة واحدة لكل لغة). الوظيفة بأكملها استشارية.

| البرنامج النصي                  | التحقق من صحة          | الحظر                                                  |
| ------------------------------- | ---------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | اكتمال الترجمة لكل لغة | **استشارية** (`continue-on-error: true` على العمل كله) |

### الوظيفة: `pr-test-policy`

يعمل على طلبات السحب فقط.

| البرنامج النصي         | التحقق من صحة                                                                                                                             | الحظر |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `check:pr-test-policy` | PRs التي تغير كود الإنتاج في `src/` أو `open-sse/` أو `electron/` أو `bin/` يجب أن تتضمن أو تقوم بتحديث الاختبارات (Hard Rule #8)         | نعم   |
| `check:test-masking`   | لا تؤدي ملفات الاختبار التي تم تغييرها إلى تقليل عدد التأكيدات الصافية أو إضافة حشوات `assert.ok(true)`                                   | نعم   |
| `check:pr-evidence`    | يستشهد جسم PR بأدلة test/VPS على التغيير (يعمل على أتمتة القاعدة الصارمة #18 عن طريق الاستيلاء على نثر PR — الهش، راجع الأعمال المتراكمة) | نعم   |

### الوظيفة: `test-vitest`

يعمل بعد `build`. دمج الكتل عند الفشل.

| جناح             | التحقق من صحة                                                         | الحظر                                                                                                              |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | خادم MCP (110 أدوات)، autoCombo، ذاكرة التخزين المؤقت — vitest runner | نعم                                                                                                                |
| `test:vitest:ui` | اختبارات مكون UI — vitest runner                                      | **الحظر** يتم استبعاد حالات الفشل الموجودة مسبقًا في — صراحةً في `vitest.config.ts`؛ الإخفاقات الجديدة تفشل المهمة |

### سير العمل الليلي (المجدول، الاستشاري)

تعمل هذه وفقًا لجدول cron (و `workflow_dispatch`) ، ولا تعمل أبدًا على PRs. كلها استشارية.

| سير العمل              | التحقق من صحة                                                                                                                    | الحظر        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | اختبارات خاصية التحقق السريع من خلال عدد مرات التشغيل العالية + العشوائية                                                        | **استشارية** |
| `nightly-resilience`   | بوابة نمو الكومة، حقن خطأ الفوضى، k6 load/soak                                                                                   | **استشارية** |
| `nightly-llm-security` | حارس حقن موجه (وضع الحظر) تحقيقات + garak (تم تخطيه بدون سر المزود)                                                              | **استشارية** |
| `nightly-schemathesis` | عقد OpenAPI (التخطيط) ضد OmniRoute المباشر باستخدام انتهاكات مواصفات أسطح `docs/openapi.yaml` — / 500s غير المعالجة (Fase 8 B.4) | **استشارية** |
| `nightly-mutation`     | درجة اختبار طفرة سترايكر على سطح الوحدة السريعة — تؤكد الطفرات الباقية على قيد الحياة بشكل ضعيف                                  | **استشارية** |
| `nightly-compat`       | مصفوفة توافق محرك العقدة عبر نطاقات `engines.node` المدعومة                                                                      | **استشارية** |

يتم تسجيل الخطوط الأساسية للأداء (الكومة، TTFB، وقت البناء)، وليست مسورة: راجع [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## مرحلة السرعة (2026-08-30 → v4.0 LTS): تخفيف كل خطوط الأساس بنسبة 20%

قرار المالك (2026-08-30): حتى اكتمال التقسيم إلى وحدات في v4.0، تكون سرعة الإصدار أهم
من الالتزام بحدّ الدين التقني. جرى تخفيف كل خط أساس **رقمي** للتشديد التدريجي بنسبة 20% في
تمرير واحد قابل للتدقيق، وأُعلن عن المرحلة في `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| ما الذي تغيّر                                                                                                                                                                                                                                    | أين                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — الأعداد التي يكون الأقل فيها أفضل ×1.2، والنسب المئوية التي يكون الأعلى فيها أفضل ÷1.2 (تم الإبقاء على الحد الأدنى للتغطية عند 60، وتظل `eslintErrors` عند 0، و`eslintWarnings` من 0 إلى 20% من عدد عمليات التجاوز المجمّدة) | `quality-baseline.json` (تسرد ملاحظة `_relax_velocity_2026_08_30` كل قيمة قبل → بعد)                   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                 | `complexity-baseline.json`، `duplication-baseline.json`                                                |
| `cap`، و`testCap`، وحدّ أسطر كل عنصر في `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                       | `file-size-baseline.json`                                                                              |
| الأعداد لكل ملف / لكل شفرة TS ×1.2                                                                                                                                                                                                               | `api-typecheck-baseline.json`، `dashboard-typecheck-baseline.json`، `open-sse-typecheck-baseline.json` |
| `THRESHOLD` من 36 إلى 30                                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| يصبح `--require-tighten` استشاريًا عندما تكون `_policy.requireTighten === false`                                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| إيقاف `bank-ratchet-shrinks` الليلي مؤقتًا (إذ كان سيسجّل الانخفاض المقاس ويلغي الهامش المتاح)                                                                                                                                                   | `.github/workflows/nightly-release-green.yml`                                                          |

قوائم السماح (`eslint-suppressions.json`، و`test-masking-allowlist.json`، و`test-discovery-baseline.json`،
…) ليست **ميزانيات** ولم تُعدَّل. لم تتغير بوابات سياسة النجاح/الفشل (الأسرار، وقواعد SQL،
وعقد التوثيق/البيئة، وتكافؤ i18n، واختبارات الوحدات) — فالاختبار الأحمر يظل اختبارًا أحمر.

**الأدوات**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — عملية
  التخفيف لمرة واحدة (`scripts/quality/relax-baselines.mjs`)؛ وترفض التشغيل مرتين باستخدام
  الملاحظة نفسها.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  يقيس كل بوابة رقمية بالطريقة نفسها التي يستخدمها CI، ويطبع الهامش المتبقي لكل بوابة
  (`scripts/quality/baseline-headroom.mjs`). تنشر مهمة `baseline-headroom` الليلية
  الجدول في ملخص تشغيل سير العمل، وترفع تقريرها بصيغتي JSON/Markdown باسم
  `baseline-headroom-<run_id>`، مع الاحتفاظ به لمدة 90 يومًا. تحدد صفوف التحذير والحالة الحرجة البوابات
  التي أصبحت ضمن 10% من حدها الأقصى أو تجاوزته بالفعل. راجع هذه التقارير بوصفها إنذارًا مبكرًا
  باستهلاك الميزانيات؛ وافحص ملاحظات `_rebaseline_*` للبوابة المتسببة. لم تعد المهمة
  تنشئ مشكلة دائمة أو تحدّثها؛ ويحفظ #12149 سجل التقارير السابق.

**وضع الشفرة الجديدة (Clean-as-You-Code) — منذ 2026-08-30، للمسار السريع لطلبات PR فقط**

في أحداث `pull_request`، يمرر `quality.yml` الخيار `--base-ref <PR base SHA>` إلى `check:file-size`،
و`check:complexity-ratchets`، و`check:dead-code`. بالنسبة إلى `check:complexity-ratchets` و
`check:dead-code`، تقارن البوابة HEAD مع أساس الدمج **مقيدًا بالملفات التي عدّلها طلب PR**
(`scripts/check/newCodeMode.mjs`: يُنشأ أساس الدمج في `git worktree` مؤقت،
ثم يُشغَّل ESLint/knip هناك وعلى HEAD، وتُحسب فروق الأعداد لكل ملف):

- **مانع** — أضاف طلب PR مخالفات للتعقيد الدوري/الإدراكي أو صادرات غير مستخدمة في الملفات التي غيّرها
  (`complexityNewCode=`، و`cognitiveComplexityNewCode=`، و`deadExportsNewCode=` في السجل)؛
- **استشاري** — الإجمالي العام مقارنة بخط الأساس المجمّد. لا يؤدي الانحراف الموروث مطلقًا إلى إحباط
  طلب PR بريء؛ ويُعاد تجميد الانحراف عند تسوية الإصدار، وتراقبه مهمة الهامش المتاح.

يستخدم `check:file-size` المرجع الأساسي وفق قواعده الخاصة (`scripts/check/check-file-size.mjs`، #8522):
إذ يفحص كل ملف مصدر واختبار في الشجرة، ويقرأ عدد أسطر كل ملف عند أساس طلب PR
باستخدام `git show`، ولا يُفشل ملفًا إلا عندما يتجاوز نموه القيمة الأكبر من سقف خط أساسه
(`frozen` / `testFrozen`، أو `cap` / `testCap` لملف خارج خط الأساس) وحجمه الأساسي.
وبذلك، فإن الملف الذي كان منحرفًا بالفعل في الأساس لا يؤدي مطلقًا إلى إحباط طلب PR بريء.

يطبّق `check:boundary:ratchet` القاعدة نفسها على رقمه الوحيد
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): في أحداث PR، تمرّر كلٌّ من
بوابات `quality.yml` السريعة ومهمة lint في `ci.yml` قيمة SHA لقاعدة PR، ويُقاس الالتزام الأساسي
من تصدير `git archive`، ولا يفشل PR إلا عندما يتجاوز عدد حواف `open-sse → src` القيمة الأكبر
بين `metrics.boundaryOpenSseToSrc` والعدد الموجود في القاعدة. يُبلَّغ عن انحراف القاعدة فوق الحد
(`base drift herdado`)، لكنه لا يتسبب أبدًا في إخفاق PR بريء؛ ويُبقي push → main
على الحد الأقصى المطلق، وإذا تعذّر تحديد SHA للقاعدة، فيعود إليه مع تحذير.

تشغيلات `workflow_dispatch`، والفحص الشامل لحالة الإصدار الخضراء، ومهمة هامش الأمان الليلية ليس لديها قاعدة PR،
ولذلك تُبقي على المقارنة المطلقة (العامة). تظل التغطية والتكرار وتغطية الأنواع عامة
في الوقت الحالي (إذ لا تنتج أدواتها فرقًا لكل ملف بتكلفة منخفضة) — وهي مرشحة للمعاملة نفسها.

**إغلاق المرحلة عند v4.0 (يعني LTS أكثر صرامة من السابق، وليس «العودة إلى الوضع الطبيعي»)**

1. عند أحدث التزام خالص في `release/v4.0.0`: شغّل `npm run quality:headroom --json` للتوثيق، ثم
   `npm run quality:ratchet -- --update`، و`check:file-size --update`،
   و`check:complexity-ratchets --update`، و`check:dead-code --update`، وخيار
   `--update` لكل بوابة typecheck — بحيث ينخفض كل خط أساس إلى القيمة المقاسة.
2. احذف `_policy` من `quality-baseline.json` (ما يعيد تفعيل `--require-tighten` والتجميع الليلي)،
   وأعِد `THRESHOLD = 36` (أو قيمة أعلى) في `check-openapi-coverage.mjs`.
3. شدّد الحدود لما دون القيم المقاسة حيث أثمرت عملية التقسيم إلى وحدات: أعِد `cap` لحجم الملفات إلى 1000
   (أو 800)، وارفع الحدود الدنيا للتغطية بمقدار +5، واجعل عدد التصديرات الميتة 0 للحزم التي قُسّمت إلى وحدات.

## خط الأساس لآلية Ratchet ‏(`quality-baseline.json`)

يقرأ محرك ratchet ‏(`scripts/quality/check-quality-ratchet.mjs`) الملف `quality-baseline.json`
ويقارنه بالملف `quality-metrics.json` الذي جُمعت بياناته حديثًا. يؤدي أي مقياس يتراجع
بما يتجاوز قيمة epsilon الخاصة به إلى فشل عملية البناء.

المقاييس المتتبعة حاليًا:

| المقياس               | الاتجاه | المعنى                           |
| --------------------- | ------- | -------------------------------- |
| `eslintWarnings`      | `down`  | يجب ألا يزداد عدد تحذيرات ESLint |
| `coverage.statements` | `up`    | يجب ألا تنخفض تغطية العبارات     |
| `coverage.lines`      | `up`    | يجب ألا تنخفض تغطية الأسطر       |
| `coverage.functions`  | `up`    | يجب ألا تنخفض تغطية الدوال       |
| `coverage.branches`   | `up`    | يجب ألا تنخفض تغطية الفروع       |

لتحديث خط الأساس بعد حدوث تحسين فعلي:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

تكتب العلامة `--update` القيم المقاسة حاليًا في `quality-baseline.json`.
ثبّت هذا الملف مع التغيير الذي حسّن المقياس. سيكتشف الخيار `--require-tighten` أي طلب PR
يحسّن مقياسًا من دون تحديث خط الأساس (المرحلة 6A.5،
قيد التنفيذ).

### آلية ratchet الخاصة بـ CodeQL: وتيرة التحديث والتشغيل اليدوي

يقرأ `check:codeql-ratchet` **حالة المستودع، التي تُحدَّث وفق جدول زمني — وليس لكل PR.**
يعرض `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`
القيمتين `state: configured` و`schedule: weekly`: أي فحص الإعداد الافتراضي في GitHub، وليس تحليلًا
يُجرى مع كل عملية دفع. والنتيجة: بعد دمج طلب PR يعمل على إصلاح التنبيهات، تستمر آلية ratchet في قراءة
العدد القديم الأعلى حتى تشغيل الفحص المجدول التالي — ولذلك تُبلغ عن تراجع
في كل طلب PR مفتوح، بما في ذلك المتابعات الخاصة بطلب PR الذي نفّذ الإصلاح، إلى أن يلحق الفحص بالتغييرات.

**التحديث اليدوي**: يعيد `gh workflow run codeql.yml --ref release/vX.Y.Z` تشغيل
التحليل وينشر التنبيهات مجددًا خلال دقائق. اقرأ `.github/workflows/codeql.yml`
أولًا — إذ يوضح ترويسته أنه مخصص لـ `workflow_dispatch` فقط **لأنه يتعارض مع
"الإعداد الافتراضي" في GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). تتطلب استعادة مشغلات `push`/`pull_request`/
`schedule` **إجراءً من المالك أولًا**: Settings → Code security →
CodeQL: Default → Advanced. لا تضف مشغل `schedule:` من دون إجراء ذلك التبديل — فلن
ينتج عنه سوى عمليات تشغيل فاشلة.

**شدّد خط الأساس بعد انخفاض العدد** — يكتب `node scripts/check/check-codeql-ratchet.mjs
--update` العدد الجديد المقاس في `quality-baseline.json` →
`metrics.codeqlAlerts.value`، كي لا تسمح آلية ratchet ضمنيًا بحدوث تراجع يعيد العدد
إلى الحد الأقصى القديم. مثال عملي (2026-09-02/03): أصلح طلب PR رقم #12502 سبعة تنبيهات حقيقية
(من 13 إلى 6 تنبيهات مفتوحة مقاسة)؛ وشدّد طلب PR رقم #12530 خط الأساس المجمّد من 11 إلى 6 ليتطابق معه؛ ثم
رُفضت التنبيهات الستة المتبقية مع تقديم مبرر لكل تنبيه، حتى وصل عدد التنبيهات المفتوحة إلى 0.

**قرارات الرفض من اختصاص المشغّل (القاعدة الصارمة رقم #14)** — لا ترفض أبدًا تنبيه CodeQL
من دون تسجيل المبرر التقني في تعليق الرفض: `won't fix` لمتطلب يخص بروتوكولًا تابعًا لجهة خارجية،
و`used in tests` لوحدة اختبار ثابتة، و`false positive`
لأداة تنقية لا يستطيع CodeQL اكتشافها (السابقة: `docs/security/ERROR_SANITIZATION.md`).

---

## سياسة إعادة محاولة الاختبارات (WS5.4، v3.8.49)

تُطبَّق إعادة المحاولة لكل مشغّل على حدة، وليست سياسة عامة شاملة أبدًا — إذ إن إعادة المحاولة الشاملة تحوّل حالات التراجع الحقيقية
إلى اختبارات متذبذبة غير مرئية:

| المشغّل          | السياسة                                                                                                                | السبب                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` في CI فقط، مع `trace: on-first-retry`                                                                     | توقيت المتصفح/الشبكة غير حتمي بطبيعته؛ وإعادة محاولة واحدة مع تتبّع تحوّل الاختبار المتذبذب إلى أثر قابل للتشخيص |
| Vitest           | لا توجد إعادة محاولة عامة. يحصل الاختبار المثبت تذبذبه على إعادة محاولة صريحة لكل اختبار (تظهر في الفرق وتُراجع في PR) | يُبقي قائمة العزل في المستودع، ولا يجعلها مبهمة أبدًا                                                            |
| node:test (unit) | لا إعادة محاولة، إطلاقًا                                                                                               | الاختبار الوحدوي المتذبذب هو خطأ في الاختبار — أصلحه، ولا تعِد تشغيله على أمل نتيجة مختلفة                       |

مستهدفات SLO بعد توافر قياس تذبذب الاختبارات (WS5.2/5.3): معدل تذبذب <1% لكل اختبار
(عتبة "الإصلاح الآن")، ومعدل نجاح ≥95% لكل مسار. هذه قيم مرجعية متداولة في المجال —
تُعاد معايرتها استنادًا إلى قياساتنا الخاصة.

## انحراف سقوف الضبط على مستوى الإصدار (WS5.5، v3.8.49)

عندما يتراجع أحد سقوف الضبط (حجم الملف، أو التعقيد، أو تحذيرات eslint) عند الطرف الخالص لفرع الإصدار
— أي إن **اجتماع** عمليات الدمج هو الذي سبّب التراجع، ولا يعيد أي PR منفرد إنتاج
التراجع على فرعه الخاص — فإن مسؤولية الإصلاح تقع على **قائد الإصدار، مرة واحدة، على
فرع الإصدار**: يُفضَّل الاستخراج/إعادة الهيكلة؛ ولا تُعَد معايرة خط الأساس إلا مع إدخال
التبرير الموثّق. لا تُحمِّل انحرافًا ناتجًا عن اجتماع التغييرات على PR لأحد المساهمين، ولا
تعِد معايرة خط الأساس لكل PR (فهذا يخفي حالات التراجع الحقيقية). ميّز السبب أولًا: أعِد إنتاج
حالة الفشل عند الطرف الخالص داخل شجرة عمل استقصائية قبل افتراض أن PR الخاص بك سبّبها.

## حفظ انخفاضات سقوف الضبط — الاتجاه التنازلي (#8584)

سقف الضبط مؤتمت إلى النصف فقط، وهو النصف الخطأ. **رفع** الحد الأقصى هو
تعديل يدوي على JSON يستغرق عشر ثوانٍ، وهو أسرع طريقة لإلغاء حظر PR فاشل.
أما **خفضه** فيتطلب من شخص تشغيل `--update` وإيداع النتيجة — وحتى
إطلاق مهمة `bank-ratchet-shrinks`، لم يكن هناك أي سير عمل يشغّلها. النتيجة المقاسة
(2026-07-25): يوجد 18 ملفًا مجمدًا بالفعل عند الحد الأقصى البالغ 800 سطر للملفات الجديدة أو دونه، وأسوأها
عند 132× (`src/shared/validation/schemas.ts`، إذ يحتوي 19 سطرًا مع حد أقصى قدره 2,523)؛ كما ارتفع
سقف التعقيد من `1794 → 2169` عبر نحو 37 ملاحظة لإعادة معايرة خط الأساس، مع انخفاض واحد بالضبط
(−1)؛ وكُتبت عبارة "التشديد عبر `--update` في الدورة التالية" 31 مرة ولم تُنفّذ إلا
مرة واحدة. الحد الأقصى الذي يبقى بعد زوال الشيفرة التي استوجبته يحوّل بصمت كل عملية
تفكيك مكتملة إلى سماح بالنمو لمن يعدّل الملف بعد ذلك.

`nightly-release-green.yml` → المهمة **`bank-ratchet-shrinks`** تغلق هذه الحلقة:

|           |                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------- |
| تعمل عند  | `schedule` (3 مرات/يوم) + `workflow_dispatch` — وعمداً **ليس** عند `push`                                 |
| تقيس      | أعلى `release/vX.Y.Z`، مع آلية الحل نفسها + حاجز الحقن نفسه كما في `release-green`                        |
| تكتب      | `check:file-size --update` و`check:complexity-ratchets --update` (كلاهما لا يسمح إلا بالخفض بحكم التصميم) |
| تتحقق عبر | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                  |
| تسلّم     | PR واحدًا محدّثًا دائمًا مقابل فرع الإصدار — يُحدَّث قسرًا، ولا يرسل طلبات مزعجة متعددة                   |

يُنفَّذ حفظ الانخفاضات على دفعات بدلًا من تنفيذه عند كل عملية دفع، لأنه لا يتطلب زمن استجابة منخفضًا (يكفي
حفظ الانخفاض خلال 8 ساعات)، بينما سيؤدي التشغيل عند كل دمج إلى إعادة بناء فرع PR مرارًا
أثناء حملات الدمج، مع تحمّل تكلفة فحص ESLint كامل في كل مرة. يظل الكشف عند
الدفع (`release-green`)؛ أما الحفظ وحده فيُنفَّذ على دفعات.

### أداة التحقق من السلامة

تكتب المهمة إلى خطوط الأساس دون إشراف، ولذلك فإن `verify-ratchet-bank.mjs` هو ما يجعل
ذلك مقبولًا. تقارن الأداة شجرة ما بعد `--update` مع `HEAD`، ثم **تُجهض المهمة
قبل وجود أي عملية إيداع** — من دون فتح أي PR — ما لم يكن كل تغيير واحدًا مما يلي:

- إدخال رقمي في `frozen` / `testFrozen` تم **خفضه** أو **إزالته**
- `complexity-baseline.json` → تم **خفض** `count`
- `quality-baseline.json` → تم **خفض** `metrics.cognitiveComplexity.value`

يفشل أي شيء آخر: رفع رقم، أو إضافة إدخال، أو تغيير `cap`/`testCap`، أو
حذف/إعادة كتابة ملاحظة `_rebaseline_*` (هذه الملاحظات هي سجل التدقيق الذي يوضح سبب وجود كل
سقف، وهي مخزنة داخل كائن `frozen` نفسه مع إدخالات الملفات).
أي روبوت يمكنه رفع حد أقصى سيكون أسوأ قطعًا من الوضع الراهن. حاجز التراجع:
`tests/unit/verify-ratchet-bank.test.ts`.

لا تدفع المهمة أبدًا إلى `release/*` — بل يدمج إنسان PR، بحيث لا يمكن
لقياس سيئ أن يصل دون مراجعة.

## سياسة قائمة السماح

تستخدم كل بوابة لا يمكن أن تفشل بسبب انتهاكات موجودة مسبقًا قائمة سماح مجمّدة
(مثل `KNOWN_STALE_DOC_REFS` و`KNOWN_MISSING` و`KNOWN_RAW_SQL`). والسياسة هي:

**أصلح السبب الجذري؛ ولا تستخدم قائمة السماح إلا عندما يكون الانتهاك موجودًا مسبقًا
ولا يمكن إصلاحه ضمن طلب السحب نفسه.**

عند إضافة إدخال إلى قائمة سماح:

1. أضف تعليقًا يوضّح المبرر.
2. أشر إلى مشكلة التتبع (مثل `// #3498 — ميزة المرحلة الثانية، لم تُنفّذ بعد`).
3. أزل الإدخال ضمن طلب السحب نفسه الذي يُصلح الانتهاك — فالإدخال المتقادم الذي لم يعد
   يمنع الإبلاغ عن انتهاك نشط يُعدّ عيبًا بحد ذاته (سيؤدي فرض التحقق من الإدخالات المتقادمة في 6A.3
   إلى إفشال البوابة عند وجود إدخال يتيم في قائمة السماح بمجرد تنفيذه).

**لا** تضف إدخالات إلى قائمة السماح لتسريع اجتياز الاختبارات. فالبوابة الناجحة مع قائمة سماح
متنامية تمنح إحساسًا زائفًا بالجودة.

### عندما تفشل بوابة في طلب السحب الخاص بك

1. **اقرأ مخرجات البوابة بعناية** — فهي تخبرك بدقة بالملف أو الرمز الذي خالف
   القاعدة.
2. **أصلح الانتهاك** — معظم البوابات عبارة عن عمليات تحقق حتمية من نظام الملفات تنجح بمجرد
   تصحيح الشيفرة.
3. **إذا كان الانتهاك موجودًا مسبقًا** (أي إنك لم تُدخله، لكن البوابة أصبحت
   تغطيه الآن): أضف إدخالًا إلى قائمة السماح مع تعليق يوضّح المبرر وإشارة إلى مشكلة تتبع.
4. **إذا كانت البوابة تصاعدية** (التغطية، وتحذيرات ESLint، والتكرار، والتعقيد):
   فقد جعل تغييرك المقياس أسوأ. أصلح المشكلة الأساسية، أو شغّل في حالات نادرة
   `npm run quality:ratchet -- --update` إذا كان التغيير مقصودًا وكان تراجع
   المقياس مقبولًا — لكن وثّق السبب في وصف طلب السحب.
5. **البوابات الاستشارية** (`continue-on-error: true`) إعلامية — فهي لا تمنع
   الدمج، لكنها تظهر في ملخص CI. أصلحها رغم ذلك.

---

## إضافة بوابة جديدة

1. أنشئ `scripts/check/check-<name>.mjs` (أو `.ts`). تُنهي بوابات السياسة التنفيذ بالرمز 0/1.
   وتصدر البوابات التصاعدية مقياسًا إلى `quality-metrics.json` عبر `collect-metrics.mjs`.
2. أضف `"check:<name>": "node scripts/check/check-<name>.mjs"` إلى `package.json`.
3. اربطها في `.github/workflows/ci.yml` ضمن المهمة المناسبة
   (السياسة ← `lint` أو `docs-sync-strict`؛ التصاعدية ← `quality-gate`).
4. إذا كانت لها قائمة سماح، فطبّق `reportStaleEntries()` من
   `scripts/check/lib/allowlist.mjs` لكي تُكتشف الإدخالات المتقادمة تلقائيًا.
5. اكتب اختبارًا في `tests/unit/build/` يغطي منطق الكشف الخاص بالبوابة.
6. حدّث هذا المستند (أضف صفًا إلى جدول المهمة ذات الصلة).

---

## أدوات الوكلاء: دمج LSP في الحلقة (اختياري)

إلى جانب بوابات CI، يوفّر OmniRoute هيكل `agent-lsp` **اختياريًا**
(ملف `.mcp.json` على مستوى المشروع، المهمة 15 من المرحلة 7). أنشئ `.mcp.json`
لإتاحة خادم لغة TypeScript لوكلاء البرمجة، حتى يتمكنوا من تحليل الرموز /
والتشخيصات **قبل** كتابة الشيفرة — وهو رفيق لـ`typecheck:core` يعمل وفق مبدأ الترجمة قبل الادعاء،
ويحدّ من أخطاء «الرموز المختلقة» من مصدرها. وهو لا يُحمّل تلقائيًا عن قصد
(إذ تختار جسر MCP↔LSP وتتحقق منه بنفسك)؛ ولا يؤدي الإدخال المعطّل إلا إلى تسجيل
خطأ اتصال، ولا يتسبب أبدًا في تعطيل الجلسات.

---

## قائمة أعمال الترشيد المتراكمة (مراجعة العائد على الاستثمار — المرحلة 9، الموجة 3)

تمت مطابقة هذا الحصر مع `ci.yml` في 2026-06-17 (أغفل الإصدار السابق
`audit:deps` و`check:tracked-artifacts` و`check:lockfile` و`check:licenses`
و`check:dead-code` و`check:cognitive-complexity` و`check:type-coverage`
و`check:codeql-ratchet` و`check:pr-evidence`). حدّدت مراجعة العائد على الاستثمار للمجموعة التي تمت مطابقتها
مرشحي الترشيد الآتين. **عمليات الدمج هي تغييرات آلية في CI؛ أما تغييرات الحالة/عمليات الحذف فهي قرارات سياسات متروكة للمشغّل.** لم يُطبّق أي مما يرد أدناه
حتى الآن.

**ومن الأمور غير الموثقة أعلاه أيضًا** (استشارية، منخفضة الدلالة): مهمة `docs-lint`
(markdownlint + Vale، مع تعيين `continue-on-error` للمهمة بأكملها) ومسارات عمل الفحص المستقلة
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. القيمة `semgrepFindings: 0` موجودة في
`quality-baseline.json` لكنها غير موصولة بآلية سقاطة مانعة في `ci.yml` — وهذا المقياس
يتيم حاليًا.

### الدمج / إزالة التكرار (آلي، أقل مخاطرة)

تم التحقق من كل مرشح مقابل الحالة الفعلية للبوابات في 2026-06-17 (الثقة مع التحقق)؛
وتبيّن أن عدة عمليات دمج «بديهية» تخفي ديونًا، ولذلك فهي **ليست** بدائل مباشرة سليمة.

- **يُشغَّل `check:docs-sync` مرتين** — بصورة مستقلة في مهمة `lint`، ومرة أخرى داخل `check:docs-all` (`docs-sync-strict`) وفي خطاف husky السابق للالتزام. ✅ **تم** — أزيل الاستدعاء المستقل من `lint`.
- **فحص CVE** — ❌ **ليس دمجًا سليمًا مباشرًا.** يفشل `audit:deps` فشلًا قاطعًا عند وجود أي ثغرة CVE عالية/حرجة؛ بينما لا يفشل `check:vuln-ratchet` (osv) إلا عند حدوث _تراجع_ مقارنة بخط الأساس (حاليًا 1 MODERATE). الدلالات مختلفة — سيؤدي حذف `audit:deps` إلى فقدان البوابة المطلقة للثغرات العالية/الحرجة. أبقِ كليهما.
- **اكتشاف الدورات** — ✅ **تم** (#15159 G-01/G-02). وصف النص القديم هنا `check:cycles` بأنه البوابة «الخضراء والمنتقاة» وبرّر إبقاءها مانعة لأن `check:circular-deps` (dpdm) أبلغ عن 91 دورة. كان ذلك اللون الأخضر **نجاحًا زائفًا**: كان `check:cycles` يفحص 5 أدلة فرعية (450 ملفًا)، ولا يطابق سوى `import|export … from` الساكنة، ويتجاهل كل محددات `@/` و`@omniroute/open-sse/`، ولذلك لم يكن يستطيع رؤية دورات الاستيراد الديناميكي + الأسماء المستعارة التي كانت سائدة في المستودع. تم الإصلاح: تجتاز البوابة الآن `src` + `open-sse` (5023 ملفًا)، وتجمع المحددات من TypeScript AST (وبالتالي يُحتسب `import("…")`، بينما لا يُحتسب `typeof import("…")` في موضع النوع)، وتحل `paths` في tsconfig. وهي تعثر على **14** دورة، لا 0. ولأن إصلاح 14 دورة موجودة مسبقًا غير ممكن في طلب سحب خاص بالبوابة، أصبح `check:cycles` الآن **سقاطة** (`--ratchet`، بسقف `metrics.cycles.value = 14` في `quality-baseline.json`، و`direction: down`) — فهي تمنع أي _تراجع_، ولا يمكن للعدد إلا أن ينخفض. يشغّل CI الأمر `npm run check:cycles:ratchet`. تتم معالجة الخفض التدريجي ضمن **A-01**. يبقى `check:circular-deps` (dpdm) استشاريًا بوصفه رأيًا ثانيًا أوسع نطاقًا.
- **التعقيد** — ✅ **تم** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): اجتياز واحد بواسطة ESLint، مع العد حسب ruleId بحيث تظل خطوط الأساس للتعقيد الدوري+الحد الأقصى للأسطر وللتعقيد المعرفي مستقلة؛ ويظل كل من `check:complexity` / `check:cognitive-complexity` متاحًا للاستخدام المحلي مع `--update`.
- **مكافحة الهلوسة في `/api`** — ✅ **تم** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): حصر واحد لنظام الملفات في `src/app/api`، مع استمرار openapi-routes + docs-symbols في إعداد تقارير مستقلة؛ وتظل الفحوص الفردية متاحة للتشغيل المحلي.
- **يُشغَّل `check:node-runtime` في 11 مهمة** — ⚠️ **عائد منخفض على الاستثمار.** تستخدم كل مهمة مشغّلًا منفصلًا، ويستغرق الفحص أقل من ثانية واحدة؛ الوفر الإجمالي نحو 10 ثوانٍ، مقابل فقدان إجراء حماية زهيد لكل مهمة. لا يستحق عناء التغيير.
- **`typecheck:noimplicit:core` ضمن lint في CI** — ✅ **أزيل من مهمة lint** (كان استشاريًا مع `continue-on-error`)؛ سطح الأنواع المانع هو `typecheck:core` + `check:type-coverage`. تم الاحتفاظ بالبرنامج النصي المحلي.

### تغيير الحالة / اتخاذ القرار (سياسة المشغّل)

- `check:openapi-security-tiers` (استشاري) — ❌ **لا يمكن تحويله إلى مانع بصورة سليمة مباشرةً.** ينتهي بالرمز 0، لكنه يحذر من أن عدة مسارات `traffic-inspector` ضمن `LOCAL_ONLY_API_PREFIXES` تفتقر إلى التعليق التوضيحي `x-loopback-only: true`. يتطلب فرضه إضافة تلك التعليقات التوضيحية إلى `openapi.yaml` أولًا.
- `typecheck:noimplicit:core` (استشاري) — تغطيه إلى حد كبير سقاطة `check:type-coverage` المانعة. حوّله إلى سقاطة أو احذف مرور `tsc` الثاني المتكرر.
- `test:vitest:ui` (أصبح الآن **مانعًا**) — حالات الفشل الموجودة مسبقًا مستثناة صراحةً في `vitest.config.ts` مع تعليقات التتبع `// #8618`؛ وتؤدي حالات الفشل الجديدة إلى فشل المهمة.
- `check:secrets` (gitleaks، سقاطة مانعة مجمّدة عند 3 نتائج إيجابية زائفة موثقة) — أضف الحالات الثلاث إلى قائمة السماح للوصول إلى 0، أو اخفضه إلى استشاري. يتداخل مع فحص الأسرار الأصلي في GitHub ومع `check:public-creds`.
- `check:pr-evidence` (مانع، يبحث في نثر متن طلب السحب باستخدام grep) — ينطوي على خطر مرتفع للنتائج الإيجابية الزائفة؛ وسيؤدي حذفه إلى إضعاف فرض القاعدة الصارمة رقم 18، لذا فهذا قرار سياسات حقيقي.
- `semgrep` (مستقل واستشاري) — يتداخل مع CodeQL بالنسبة إلى عائلات OWASP؛ صِل خط أساسه بسقاطة أو احذفه.

---

## الوثائق ذات الصلة

- سلسلة التوريد (المصدر، SBOM، Trivy، Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — بوابة تكافؤ مجموعات المفاتيح

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`، المهمة `i18n-ui-coverage`).
تقارن مجموعة المفاتيح الطرفية لكل ملف `src/i18n/messages/<locale>.json` مع `en.json` وتُفشل
التحقق عند وجود أي مفتاح طرفي مفقود أو زائد، بصرف النظر عن وقت إضافة المفتاح. تُعد العناصر النائبة
`__MISSING__:` موجودة (أما محتواها فهو من اختصاص بوابة النسبة). وهي المكمّل المطلق
للبوابتين القائمتين على الفروقات/النسب المئوية: تفرض `check-ui-keys-coverage` حدًا أدنى قدره 80 % لكل
لغة محلية (حتى مع غياب 43 مفتاحًا من أصل ~13,000 تظل القراءة 99.7 %)، بينما تحكم `check-new-key-coverage`
فقط على المفاتيح التي يضيفها طلب سحب إلى `en.json`. تُنشأ دفعة لغة محلية من نسخة `en.json` المتاحة يوم
إنشاء فرعها، وتستمر الترجمة أيامًا بينما تواصل القاعدة إضافة المفاتيح؛ ولا يضيف طلب سحب الدفعة
أي مفتاح بنفسه، لذلك ظلت البوابتان الشقيقتان صامتتين عندما دُمجت الدفعة 1 (#13044) وهي تفتقر إلى 43 مفتاحًا في تسع
لغات محلية، والدفعة 2 (#13660) وهي تفتقر إلى 10 مفاتيح في ثمانٍ منها (2026-09-15). أصلح الفشل باستخدام
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`؛ ويعني وجود مفتاح طرفي `extra`
أن المصدر قد حذفه — فاحذفه من اللغة المحلية. يُبلغ `--warn` دون التسبب في الفشل.
يشغّل `--catalog=cli` المقارنة نفسها على `bin/cli/locales` (`npm run i18n:check-keys:cli`)؛
وتوجد كلتا الخطوتين في المهمة `i18n-ui-coverage`.

#### `check-new-key-coverage` — بوابة تدويل المفاتيح الجديدة

بوابة شقيقة لـ `check-ui-value-drift`. تلتقط الأخيرة قيمة إنجليزية **أُعيدت صياغتها**
بينما تُركت ترجماتها دون تحديث؛ أما هذه فتلتقط مفتاحًا إنجليزيًا **أُضيف**
بينما لم تتلقّه بعض اللغات المحلية قط.

لا تستطيع `check-ui-keys-coverage` رؤية هذه الفئة: فهي تفرض حدًا أدنى لنسبة التغطية لكل لغة محلية،
وغياب أحد عشر مفتاحًا من أصل ~13,000 يترك التغطية عند 99.9%. لا يمكن لنسبة مئوية لكل لغة
التعبير عن أن «هذه الميزة أُصدرت دون ترجمة» — إذ يمكن أن تصل ميزة كاملة إلى لغة محلية جديدة دون أي
نص، من دون أن يتغير الرقم مطلقًا.

الحادثة التي تجسّدها: ترجمت المرحلة 3 من لوحة التنسيق مفاتيحها الأحد عشر عبر
اللغات المحلية الـ42 الموجودة آنذاك. وبعد ساعات، رفعت دفعة لغات الاتحاد الأوروبي (#13044) عدد اللغات المحلية في المستودع
إلى 51، ولم تتلقَّ اللغات التسع الجديدة (`el`، `et`، `ga`، `hr`، `lt`، `lv`، `mt`، `sl`، `sr`)
هذه المفاتيح مطلقًا. يستبدل `deepMergeFallback` المفتاح الغائب بالنص الإنجليزي، لذلك تمثل نمط
الفشل في واجهة مستخدم غير مترجمة بدلًا من واجهة مستخدم فارغة — وهو فشل حقيقي وصامت بحكم التصميم.

وكما هو الحال مع البوابة الشقيقة، فهي **مدركة للفروقات**، إذ تقارن الإنجليزية عند قاعدة الدمج مع شجرة
العمل، ولذلك تظل الفجوات الموجودة مسبقًا مجمّدة ولم تحتج البوابة إلى أي ترحيل لتفعيلها.

**لا تفي العلامة `__MISSING__:<english>` بالمتطلب (منذ 2026-09-17).** كانت سابقًا وسيلة التأجيل
الموثقة — إذ يعود وقت التشغيل إلى نص إنجليزي صحيح — إلى أن أضافت ثمانية طلبات سحب للميزات في
2026-09-16 عدد 61 مفتاحًا ووضعت العلامة في جميع اللغات المحلية الـ65 بدلًا من ترجمتها: قبلت
هذه البوابة كل واحد منها، ولم يمنع شيء طلبات السحب، ثم فشلت بوابة نسبة الترجمة الحقيقية الإلزامية
عند طرف الإصدار لدى الجميع (pt-BR 3.2 % > 2.5 % + 0.5). تُعامل العلامة الآن
كترجمة غائبة. أصلح الفشل باستخدام
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`، أو
نفّذ ذلك لجميع اللغات المحلية بالتوازي باستخدام `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`،
آمن في الوضع المنفصل، ويرفض البدء دون متغيرات البيئة `OMNIROUTE_TRANSLATION_*`). يجب وضع المفتاح الذي يلزم أن يبقى
بالإنجليزية (اسم منتج/محرك/علامة مثبّت) في `scripts/i18n/untranslatable-keys.json`،
وليس خلف علامة أبدًا. تحظر `vi` العلامات منعًا باتًا (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — بوابة الاختبارات المركونة

الملف الموجود في قائمة `exclude` ضمن `vitest.config.ts` هو اختبار لا يعمل، ومع ذلك يبدو
كتغطية لمن يقرأ الشجرة. تراكم اثنان وستون ملفًا خلف التعليق
`// #8618 — pre-existing failure; remove this exclusion when fixed`. أُغلقت المشكلة #8618 في
2026-08-11 بينما نمت القائمة التي كانت تتعقبها من 45 إدخالًا إلى 62، وكان كل إدخال جديد يرث تعليقًا
يشير إلى مشكلة منتهية. وعندما قِيست القائمة أخيرًا ملفًا تلو الآخر (#13204)، **نجح 51 من أصل 62
مقابل الشجرة الحالية دون أي تغيير في المصدر**.

تتطلب البوابة من كل استثناء يُحل إلى ملف حقيقي أن (أ) يذكر مشكلة تتبع، وأن
(ب) يظهر في `config/quality/vitest-exclusions.json` مع حالته المقاسة، بحيث تصبح إضافة أي استثناء
فرقًا قابلًا للمراجعة في ملف مخصص بدلًا من مجرد سطر آخر في مصفوفة تضم 60 إدخالًا. وهي تتعمد
عدم إعادة تشغيل الاختبارات المستثناة — إذ يستغرق ذلك ~10 دقائق وينتمي إلى مهمة دورية؛ ويسجل
المخزون وقت آخر قياس لكل منها.
