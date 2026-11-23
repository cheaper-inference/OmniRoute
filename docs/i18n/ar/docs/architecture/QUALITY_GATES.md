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

يُصدر كلٌّ من مساري عمل CI وبوابات الجودة حكمًا ثابتًا: `Gate / CI` و
`Gate / Quality`. وتُعدِّد سياسة القبول ذات الإصدارات الخاصة بهما كل مهمة من المهام السابقة
بوصفها مطلوبة أو استشارية. يجب أن تنجح أي مهمة مطلوبة منطبقة: فالنتائج المفقودة،
أو الملغاة، أو المتخطاة، أو المعلّقة، أو غير المعروفة لا يمكنها إثبات PASS. ويمكن لتصنيف صالح
خاص بالتوثيق فقط أو بالكتالوج فقط أن يجعل مسارًا برمجيًا غير منطبق؛
أما طلب السحب المسودة فلا يُعد مرشحًا مقبولًا. ولا تُسقط تسمية `hotfix` متطلبات الإثبات.

يغطي كلا مساري العمل طلبات السحب وعمليات الدفع إلى الفروع الرئيسية/فروع الإصدار، والتشغيل اليدوي،
وأحداث مجموعات الدمج. وتُشغِّل عمليات الدفع والتشغيل اليدوي ومجموعات الدمج مجموعة الاختبارات الكاملة. تستخدم النسخ المتشعبة
ومجموعات الدمج مشغِّلات مستضافة للمهام التي تختار بخلاف ذلك مشغِّلات ذاتية الاستضافة؛ ويجب
التحقق من توفر سعة استضافة كافية قبل الطرح.

يحدِّد كل إيصال JSON قيمة SHA التي جرى سحبها، وتشغيل مسار العمل، والمحاولة.
وترفض CLI عدم تطابق SHA بين النسخة المسحوبة والحدث. وتربط اختبارات مسار العمل عضوية السياسة
بقائمة `needs` الخاصة بمهمة الحكم، بحيث لا يمكن لمسار جديد أو مُزال أن يختفي بصمت.
تغطي الإيصالات مسار العمل الخاص بها، لا النشر أو التوزيع أو الأجزاء الداخلية
لأداة فحص استشارية موجودة. ويُعد تفعيل اسمي الفحص كليهما ضمن قواعد الفروع
تغييرًا إداريًا منفصلًا؛ فإضافة هذه المهام لا تحمي الفرع بحد ذاتها.

### مخزون الفحص الثابت

يوجد مخزون الأسماء المستعارة لـ npm ذو الإصدارات وعضوية الفحص الثابت في
`config/quality/gate-manifest.json`. شغِّل `npm run check:gate-manifest` للتحقق
من أسماء البرامج النصية والأوامر الدقيقة بمقارنتها مع `package.json`؛ إذ تؤدي الإضافات وعمليات الإزالة
وانحراف الأوامر إلى فشل كلٍّ من الخطاف المحلي ومهام تصنيف التغييرات في CI.
الاسم المستعار ليس مهمة في مسار عمل، ولا نسخة من مصفوفة، ولا حالة اختبار: يجب
عدم عرض هذه الأعداد كما لو كانت قابلة للتبادل.

استخدم `npm run quality:scan -- --list` أو `npm run quality:scan:fast -- --list`
لفحص الأسماء المستعارة المحددة دون تنفيذها. يستدعي المشغِّل
نقطة دخول npm، ولذلك تبقى بيئة تشغيلها محفوظة (بما في ذلك Bun حيث تم تكوينه).
يسجِّل البيان الأسماء المستعارة الواقعة خارج ملفات التعريف تلك على أنها تُستدعى بشكل منفصل، كما
تُحظر أوامر الصيانة في ملفات تعريف الفحص المخصصة للقراءة فقط.

لا تغطي ملفات التعريف هذه سوى الفحص الثابت. وهي لا تصادق على اختبارات المنتج،
أو التغطية، أو التحزيم، أو الفحوص الخارجية، أو القبول الكامل لمرشح الإصدار.
يستخدم قبول مسار العمل الملف المرتبط `config/quality/admission-policy.json` و
`scripts/quality/admission-verdict.mjs`. وتظل ملفات تعريف مراقب الإصدار منفصلة؛
افحص فحوصها وإيصالاتها المنطبقة بصورة مستقلة. أما المخزون
النصي أدناه فهو مرجع، وليس دليلًا على أن إحدى البوابات قد شُغِّلت بالفعل.

توجد البرامج النصية ضمن `scripts/check/` (بوابات السياسة) و`scripts/quality/` (محرك التصعيد التدريجي).
ومصدر الحقيقة الخاص بـ CI هو `.github/workflows/ci.yml`.

### المسار السريع لطلب سحب الإصدار (`quality.yml`)

يُكمِّل `.github/workflows/quality.yml` مسار CI لطلبات السحب على الفروع الرئيسية/فروع الإصدار، وعمليات الدفع
إلى الفروع المحمية، والتشغيل اليدوي، ومجموعات الدمج. وتستخدم طلبات السحب فحوصًا سريعة مرشَّحة حسب المسار. وقد أُزيلت
عملية البناء المكررة والمعطلة دائمًا؛ بينما تظل فحوص البناء/التحزيم/الإقلاع الفعلية ضمن CI.

| المهمة                                           | النطاق                                                                                                                                                                                                  | الحظر                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Docs Gates (fast-path)`                         | طلبات سحب التوثيق/الشيفرة؛ مراجع توثيق API وdocs-all                                                                                                                                                    | نعم                            |
| `Fast Quality Gates`                             | طلبات سحب الشيفرة؛ الفحوص الثابتة، وفحص الأنواع، وفحص أنواع لوحة المعلومات، واختبارات الوحدات المتأثرة                                                                                                  | نعم                            |
| `Forgotten sibling tests`                        | طلبات سحب الشيفرة؛ تتبُّع الوحدات التي تغيرت إلى المستهلكين الثابتين واختبارات الأشقاء المرشحة؛ وتُبلَّغ مسارات barrel والاستيراد الديناميكي كتشخيصات استشارية، مع استثناءات قائمة السماح المُشار إليها | **استشاري**                    |
| `Vitest (fast-path)`                             | طلبات سحب الشيفرة؛ حزمة vitest السريعة                                                                                                                                                                  | نعم                            |
| `Unit Tests fast-path`                           | طلبات سحب الشيفرة؛ حزمة اختبارات الوحدات ذات الأجزاء الأربعة                                                                                                                                            | نعم                            |
| `No new ESLint warnings`                         | طلبات سحب الشيفرة؛ حارس lint المراعي لعمليات الكبت                                                                                                                                                      | نعم، بما في ذلك النسخ المتشعبة |
| `Merge integrity (changelog + generated skills)` | طلبات السحب غير المسودة؛ مزامنة سجل التغييرات والمهارات المُنشأة                                                                                                                                        | نعم، بما في ذلك النسخ المتشعبة |

#### تقرير اختبارات الأشقاء المنسية

يعيد `npm run check:forgotten-sibling-tests` استخدام محلّل الاستيراد وراء خريطة تأثير الاختبار.
ولكل وحدة إنتاج تغيرت، فإنه يبلّغ عن سلاسل حتمية
`changed module/symbol -> static consumer -> candidate sibling test` عندما يكون الاختبار
المرشح غائبًا عن فرق طلب السحب. ويُحتفظ بملخص Markdown ونتيجة JSON بوصفهما
أثر مسار العمل `forgotten-sibling-tests` لأغراض المعايرة قبل أي طرح حاجب.

تُستخدم عمليات إعادة التصدير عبر ملفات Barrel وعمليات الاستيراد الديناميكية لتشخيص عملية الحل فقط؛ ولا تؤدي مطلقًا إلى إنشاء
نتيجة مانعة. توجد الاستثناءات التي تمت مراجعتها في
`config/quality/forgotten-sibling-allowlist.json`. يجب أن يحدد كل إدخال الاختبار المستهلك والاختبار المرشح،
وأن يقدم مبررًا محددًا، وأن يتضمن رابطًا إلى مشكلة أو طلب سحب على GitHub. تؤدي الإدخالات غير الصالحة إلى
الفشل الآمن. لا يمكن للاستثناءات تجاهل اختبار مرشح محذوف أو فرق يضيف `.skip`/`.todo`؛
ويظل إضعاف التأكيدات وغيره من أساليب الإخفاء خاضعًا لبوابة
`check:test-masking` المانعة بشكل مستقل.

### المهمة: `lint`

تُشغَّل عند كل طلب سحب إلى `main`. تمنع الدمج عند الفشل.

| البرنامج النصي (`npm run ...`)    | ما يتحقق منه                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | الحظر                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | أن يكون إصدار Node.js ضمن النطاق المدعوم                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                    |
| `check:cycles`                    | عمليات الاستيراد الدائرية عبر كامل `src/` و`open-sse/` (استنادًا إلى AST، مع حل `paths` الخاصة بـ tsconfig). تخرج النسخة الأساسية بالرمز 1 كلما وُجدت أي دورة (فشل آمن منذ #15281) وتسرد المكونات شديدة الاتصال (SCCs). تمنع `check:cycles:ratchet` (وهي ما تشغّله CI) التنفيذ عندما يتجاوز العدد حد `metrics.cycles` في `quality-baseline.json` — وهو حاليًا 14، مع `direction: down`، لذا لا يمكنه إلا الانخفاض (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                              | نعم (آلية تصعيد أحادية الاتجاه)        |
| `check:boundary`                  | ترابط `open-sse → src`: عمليات الاستيراد الفريدة من ملف إلى ملف من المحرك إلى التطبيق (`scripts/quality/measure-boundary.mjs`؛ قائمة الحواف هي قائمة مهام المعالجة المتراكمة لفصل النواة/الوحدات في الإصدار v4). النسخة الأساسية = تقرير استشاري (مثل `quality:boundary`). تمنع `check:boundary:ratchet` (وهي ما تشغّله CI، كما توجد ضمن حلقة التصعيد للبوابات السريعة في `quality.yml`) التنفيذ عندما يتجاوز العدد حد `metrics.boundaryOpenSseToSrc` في `quality-baseline.json` — الذي بدأ عند القيمة المقاسة 771، مع `direction: down`؛ ولا يؤدي `--update` إلا إلى خفضه؛ وتكون المقارنة نسبية إلى الفرع الأساسي في طلبات السحب (`--base-ref`، انظر أدناه)                                                                                                                                                      | نعم (آلية تصعيد أحادية الاتجاه)        |
| `check:route-validation:t06`      | وجود مخططات Zod في جميع المسارات (سياسة المستوى 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                    |
| `check:any-budget:t11`            | لا يتجاوز عدد `@ts-expect-error // any` الميزانية (بوابة المستوى 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | نعم                                    |
| `check:provider-consistency`      | لكل موفّر في `providers.ts` إدخال مطابق في `providerRegistry.ts` (والعكس صحيح، ضمن قائمة السماح)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                    |
| `check:model-lifecycle`           | تظل جداول التوجيه الثلاثة التي تُصان يدويًا متسقة مع لقطة دورة الحياة المحفوظة في المستودع (#11503): لا يمنح `FITNESS_TABLE` (`taskFitness.ts`) درجة لأي معرّف متقاعد يستطيع `REGISTRY` توجيهه؛ وكل هدف في `BUILT_IN_ALIASES` موجود في `REGISTRY` وغير موجود في لقطة المعرّفات المتقاعدة؛ وكل معرّف متقاعد لا يزال موجودًا في `REGISTRY` تتم إعادة توجيهه أو إدراجه في `allowedRetiredInCatalog`؛ ولا يظهر أي مصدر أو هدف في `DEFAULT_DEGRADATION_MAP` بوصفه متقاعدًا في تلك اللقطة. لا يثبت هذا أن النموذج مخدوم حاليًا من مزوّد فعلي مباشر. يعمل دون اتصال — إذ يقارن مع `config/quality/model-lifecycle.json`، الذي يُحدَّث يدويًا باستخدام `npm run quality:refresh-model-lifecycle` (يتطلب الشبكة؛ وغير موصول بخط CI). يُعد `allowedRetiredInCatalog` آلية تناقص تدريجي: لا تُضف إدخالًا إلا مع مشكلة تتبّع. | نعم                                    |
| `check:fetch-targets`             | كل استدعاء `fetch("/api/...")` في `src/` من جانب العميل يُحلّ إلى ملف `route.ts` فعلي                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | نعم                                    |
| `check:deps`                      | جميع التبعيات القابلة للتثبيت باستخدام `npm install` عبر كل ملف `package.json` في المستودع موجودة في `dependency-allowlist.json`؛ وتُعلَّم الحزم الجديدة غير المثبّتة على إصدار محدد أو المنتحلة لأسماء حزم أخرى                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                    |
| `audit:deps`                      | `npm audit` (الجذر + electron) — لا توجد تحذيرات عالية أو حرجة (يتداخل مع `check:vuln-ratchet` الخاص بـ osv؛ راجع قائمة مهام الترشيد المتأخرة)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | نعم                                    |
| `check:lockfile`                  | سلامة `package-lock.json` — سجل https، وتجزئات السلامة، وعدم وجود تجاوزات للمضيف                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                    |
| `check:licenses`                  | قائمة سماح تراخيص SPDX لاعتماديات الإنتاج                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                    |
| `check:tracked-artifacts`         | عدم وجود نواتج بناء / روابط رمزية ملتزم بها لـ `node_modules` (يعمل أيضًا في husky pre-commit؛ أما pre-push فهو خفيف عمدًا — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                    |
| `check:ai-attribution`            | عدم وجود تذييل `Co-Authored-By` للذكاء الاصطناعي/الروبوتات أو تذييل يشير إلى التوليد بالذكاء الاصطناعي في التزامات PR أو عنوانه أو نصه — القاعدة الصارمة #16 (ضمن حلقة البوابات السريعة في `quality.yml` لطلبات PR→`release/**` — يقرأ حمولة الحدث، ولا ينفذ أي إجراء خارج طلبات PR — وخطوة خاصة بطلبات PR في فحص lint ضمن `ci.yml` لطلبات PR→`main`؛ وكذلك خطاف husky `commit-msg`؛ يُسمح بالمؤلفين المشاركين من البشر؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | يجب أن يسمّي كل استثناء في Vitest مشكلة تتبّع وأن يظهر في `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                    |
| `check:file-size`                 | يجب أن تبقى ملفات المصدر (`.ts`/`.tsx` في `src/` و`open-sse/` و`electron/` و`bin/`) ضمن `cap`، وملفات الاختبار (`*.test.ts(x)`) ضمن `testCap`؛ ويجب ألا تتجاوز الملفات المجمّدة في `file-size-baseline.json` (`frozen` / `testFrozen`) حجمها المسجّل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | نعم                                    |
| `check:error-helper`              | تستخدم استجابات الأخطاء في المنفّذات/المعالجات `buildErrorBody()` / `sanitizeErrorMessage()` (القاعدة الصارمة رقم 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | نعم                                    |
| `check:migration-numbering`       | ملفات SQL الخاصة بالترحيل مرقّمة تسلسليًا، دون فجوات أو تكرارات                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:public-creds`              | لا توجد قيم OAuth حرفية لـ `client_id`/`client_secret` أو مفاتيح Firebase Web خارج `publicCreds.ts` (القاعدة الصارمة رقم 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                    |
| `check:db-rules`                  | لا توجد عبارات SQL خام خارج وحدات `src/lib/db/`؛ ولا عمليات استيراد تجميعية من `localDb.ts` (القاعدتان الصارمتان رقم 2 ورقم 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | نعم                                    |
| `check:known-symbols`             | تتطابق منفّذات المزوّدين واستراتيجيات التوجيه والمترجمات المسجّلة في جداول الإرسال الخاصة بها مع الملفات الموجودة على القرص — دون رموز يتيمة أو غير مصرّح بها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                    |
| `check:route-guard-membership`    | يُصنَّف كل مسار ينشئ عملية فرعية بواسطة `isLocalOnlyPath()` (القاعدتان الصارمتان رقم 15 ورقم 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                    |
| `check:test-discovery`            | يُجمَع كل ملف `*.test.ts` / `*.spec.ts` في المستودع بواسطة مشغّل اختبار واحد على الأقل (آلية تصاعدية: لا يمكن لقائمة الملفات اليتيمة في `test-discovery-baseline.json` إلا أن تتقلص)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | نعم                                    |
| `check:agent-skills-sync`         | تتطابق عناصر agent-skills المُنشأة مع كتالوج المصدر الخاص بها (من دون انحراف)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | تحمل شعارات/عناصر المزوّد إدخالًا مسجلًا للمصدر                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | تُحلَّل ملفات إعداد JSON وتستوفي قواعد التدقيق الخاصة بالمستودع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | ترجمة TypeScript من دون أخطاء (تحذيرات إرشادية فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                    |
| `typecheck:noimplicit:core`       | تطبيق صارم لـ `noImplicitAny` — استشرافي؛ لا تزال العديد من مواضع الاستدعاء الموجودة مسبقًا بحاجة إلى تعليقات توضيحية للأنواع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **إرشادي** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | تشغيل `tsc` ضمن نطاق `src/app/(dashboard)/**` ‏(#7033) — لا تتضمن قائمة السماح المنتقاة والمكوّنة من 27 ملفًا في `typecheck:core` أي ملفات TSX للوحة المعلومات، كما أن `next build` لا يتحقق من أنواعها أيضًا (يضبط `next.config.mjs` الخيار `ignoreBuildErrors: true`)، ولذلك لم تكن انحدارات المعرّفات اليتيمة هناك (#6625/#6909) مرئية لنظام CI. تُقارَن النتائج بخط أساس مجمّد لعدد الأخطاء لكل ملف/رمز TS (`config/quality/dashboard-typecheck-baseline.json`، بنمط فرض التقادم نفسه المستخدم في `check:known-symbols`) — لا تؤدي إلا الأخطاء الجديدة التي تتجاوز العدد المسجّل في خط الأساس إلى فشل البوابة؛ اخفض خط الأساس تدريجيًا باستخدام `--update` عند إصلاح خطأ موجود مسبقًا.                                                                                                                        | نعم                                    |

### المهمة: `quality-gate`

يعمل بعد `test-coverage`. يمنع الدمج عند الفشل.

| السكربت                      | ما يتحقق منه                                                                                                                                                       | حاجب للدمج                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `quality:collect`            | يُنشئ `quality-metrics.json` (عدد تحذيرات ESLint، والتغطية من تقرير الأجزاء المدمج)                                                                                | نعم (سابق لآلية الرفع التدريجي) |
| `quality:ratchet`            | عدم تراجع أي مقياس في `quality-baseline.json` (تحذيرات ESLint ≤ خط الأساس؛ التغطية ≥ خط الأساس)                                                                    | نعم                             |
| `check:duplication`          | عدم تجاوز تكرار الشيفرة (jscpd@4) لخط الأساس في `quality-baseline.json`                                                                                            | نعم                             |
| `check:complexity`           | عدم تجاوز التعقيد الدوري على مستوى الملف الحد الأقصى (`complexity` الأساسي في ESLint + `max-lines-per-function`)                                                   | نعم                             |
| `check:cognitive-complexity` | آلية رفع تدريجي للتعقيد المعرفي (`eslint-plugin-sonarjs`) — تمريرة ESLint منفصلة؛ يشغّل CI كلتيهما مدمجتين بوصفهما خطوة `check:complexity-ratchets` واحدة          | نعم                             |
| `check:dead-code`            | عدم تراجع آلية الرفع التدريجي للتصديرات / الملفات غير المستخدمة (knip) مقارنةً بخط الأساس                                                                          | نعم                             |
| `check:compression-budget`   | ميزانية معيار قياس الضغط — يجب ألا تتراجع الحدود الدنيا لتوفير الرموز لكل محرك                                                                                     | نعم                             |
| `check:type-coverage`        | عدم تراجع آلية الرفع التدريجي لنسبة الأنواع المعرّفة (`type-coverage`)؛ وهي تغطي إلى حد كبير `typecheck:noimplicit:core`                                           | نعم                             |
| `check:codeql-ratchet`       | عدم تراجع عدد تنبيهات CodeQL المفتوحة (تُقرأ عبر `gh api`؛ تخطٍّ سلس من دون رمز وصول) — لدورية التحديث والتشغيل اليدوي: راجع "آلية الرفع التدريجي لـ CodeQL" أدناه | نعم                             |

### المهمة: `quality-extended`

المهمة بأكملها استشارية (`continue-on-error: true`). تعمل آليات الرفع التدريجي المستندة إلى npm
فعليًا؛ بينما تُثبَّت أدوات الفحص الخارجية عبر `gh release download` وتتخطى نفسها (exit 0)
عندما يظل الملف الثنائي غير موجود.

| السكربت                  | ما يتحقق منه                                                                                                                                                                                                             | حاجب للدمج                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `check:circular-deps`    | عدم وجود تبعيات دائرية (dpdm)                                                                                                                                                                                            | **استشاري**                                                    |
| `check:bundle-size`      | عدم تجاوز حجم الحزمة الحد الأقصى                                                                                                                                                                                         | **استشاري**                                                    |
| `check:secrets`          | فحص الأسرار (gitleaks) — يُتخطى إذا كان الملف الثنائي غير موجود                                                                                                                                                          | **استشاري**                                                    |
| `check:vuln-ratchet`     | عدم تراجع ثغرات التبعيات (osv-scanner) — يُتخطى إذا كان الملف الثنائي غير موجود                                                                                                                                          | **استشاري**                                                    |
| `check:workflows`        | تدقيق سير العمل (actionlint + zizmor)؛ يؤدي غياب/تعطل أدوات الفحص أو التقارير غير الصالحة أو غياب خط أساس الرفع التدريجي إلى الفشل بحالة INCOMPLETE. تتبع النتائج الصالحة سياسة الصرامة/الاستشارة/الرفع التدريجي المحددة | التنفيذ مطلوب؛ آلية الرفع التدريجي لـ zizmor حاجبة للدمج في CI |
| `check:openapi-breaking` | التغييرات الكاسرة لعقد API العام (`openapi.yaml`) مقارنةً بالفرع الأساسي (oasdiff) — يُصدر `openapiBreaking=N`؛ يُتخطى إذا كان oasdiff غير موجود أو تعذّر تحليل المواصفة الأساسية                                        | **استشاري**                                                    |

### المهمة: `docs-sync-strict`

تعمل عند كل PR إلى `main`. تمنع الدمج عند الفشل.

| السكربت                        | ما يتحقق منه                                                                                                                                                                      | الحظر                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | بوابة شاملة تشغّل البوابات الفرعية الست أدناه بالتسلسل                                                                                                                            | نعم                        |
| ↳ `check:docs-sync`            | اتساق الإصدارات بين CHANGELOG وOpenAPI وllm.txt                                                                                                                                   | نعم                        |
| ↳ `check:docs-counts`          | الأعداد الواردة في النصوص (عدد المزوّدين، وعدد عمليات الترحيل، وما إلى ذلك) تقع ضمن نافذة التصعيد التدريجي للأعداد الفعلية                                                        | نعم                        |
| ↳ `check:env-doc-sync`         | كل متغير بيئة في `.env.example` موثّق في جدول ضمن الوثائق، والعكس صحيح                                                                                                            | نعم                        |
| ↳ `check:deprecated-versions`  | عدم وجود سلاسل إصدارات مهملة في الوثائق                                                                                                                                           | نعم                        |
| ↳ `check:doc-links`            | روابط Markdown الداخلية في الوثائق تشير إلى ملفات فعلية (بصيغة `[text]`/`(path)`)                                                                                                 | نعم                        |
| ↳ `check:fabricated-docs`      | المسارات، ومتغيرات البيئة، وأوامر CLI، وأسماء الخطافات، ومسارات الملفات المذكورة في الوثائق موجودة في قاعدة الشيفرة. بوابة صارمة عبر `--strict`؛ وفشل غير مانع من دون هذا الخيار. | نعم (عبر `--strict` في CI) |
| `check:cli-i18n`               | سلاسل أوامر CLI موجودة في جميع ملفات الإعدادات المحلية لـ i18n                                                                                                                    | نعم                        |
| `check:openapi-coverage`       | تغطي مواصفات OpenAPI حدًا أدنى متصاعدًا من المسارات الفعلية                                                                                                                       | نعم                        |
| `check:openapi-security-tiers` | تعليقات مستويات الأمان في `openapi.yaml` متسقة مع تصنيفات `routeGuard.ts`                                                                                                         | **استشاري**                |
| `check:openapi-routes`         | كل مسار في `openapi.yaml` يشير إلى ملف `route.ts` فعلي (لمكافحة الهلوسة)                                                                                                          | نعم                        |
| `check:docs-symbols`           | كل مرجع إلى `/api/...` في `docs/**/*.md` يشير إلى ملف `route.ts` فعلي (لمكافحة الهلوسة)                                                                                           | نعم                        |
| `i18n translation drift`       | المفاتيح غير المترجمة في ملفات الإعدادات المحلية لـ i18n — تحذير فقط                                                                                                              | **استشاري**                |

### المهمة: `i18n-ui-coverage`

| السكربت                          | ما يتحقق منه                                                                                                                                                                                                                      | الحظر       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (مضمّن) | تغطية مفاتيح i18n لواجهة المستخدم تبلغ ≥ 65%                                                                                                                                                                                      | نعم         |
| `check-ui-value-drift` (مضمّن)   | إعادة كتابة **قيمة** إنجليزية لا تترك وراءها أي ترجمة قديمة                                                                                                                                                                       | نعم         |
| `check-new-key-coverage` (مضمّن) | كل مفتاح إنجليزي **جديد** مترجم في جميع الإعدادات المحلية — تُرفض علامة `__MISSING__:`                                                                                                                                            | نعم         |
| `check-translation-ratio`        | يجب ألا تتجاوز نسبة الترجمات الفعلية لكل إعداد محلي (القيم المطابقة للإنجليزية / العناصر النائبة / العناصر المفقودة خارج قائمة السماح) القيمة المحددة في `config/quality/i18n-translation-baseline.json` مضافًا إليها هامش السماح | **استشاري** |

يتطلب `fetch-depth: 0` — تقارن بوابة انحراف القيم ملف `en.json` مع قاعدة الدمج.

#### `check-ui-value-drift` — بوابة الترجمات القديمة

تكتشف حالة تراجع i18n الوحيدة التي لا تستطيع البوابات الأخرى اكتشافها بنيويًا: تُعاد كتابة قيمة إنجليزية
بينما تبقى الترجمات المشتقة من النص الإنجليزي _السابق_، ولذلك يواصل المستخدمون غير الناطقين بالإنجليزية
قراءة نص واثق الصياغة لكنه أصبح خاطئًا.

حدث هذا فعليًا في إصدار منشور. أُعيدت كتابة `oauthModal.googleOAuthWarning` عند إضافة مساعد تسجيل الدخول
Antigravity (#5203)؛ وأبقت **39 من أصل 43 إعدادًا محليًا** على نص يطلب من المشغّلين «نسخ عنوان URL
الكامل ولصقه أدناه» — وهو تدفق لا يمكن إكماله لذلك المزوّد. ولم يُلاحظ ذلك حتى #8463 للأسباب التالية:

- لا يملأ `sync-ui-keys` إلا المفاتيح **الغائبة**، وليس المفاتيح **القديمة** مطلقًا؛
- يحسب `check-ui-keys-coverage` _وجود_ المفتاح، ولذلك تُحتسب الترجمة القديمة على أنها مغطاة؛
- يتتبع `check-translation-drift` نُسخ الوثائق المتطابقة في `docs/i18n/<locale>/**.md` —
  ولا يقرأ `src/i18n/messages/*.json` مطلقًا. أصبح مانعًا في المهمة `docs-sync-strict` منذ
  إعادة المزامنة في 2026-09: عند تعديل مستند أساسي → `npm run i18n:run -- --files=<doc>` (على مستوى القسم، ومنخفض التكلفة).

**مدرك للفروقات، وليس مستندًا إلى خط أساس.** يقارن `en.json` عند قاعدة الدمج
بشجرة العمل؛ ولكل مفتاح تغيّرت قيمته الإنجليزية، تُعدّ أي لغة ما تزال تحتفظ بترجمة
لم تُمس قديمة. يؤدي هذا عمدًا إلى **تجميد الدَّين الموجود مسبقًا** — إذ لا يمكن للفرق
كشف النص الإنجليزي القديم الذي جاءت منه ترجمة قائمة منذ مدة طويلة، ولذلك لا تتحقق البوابة
إلا مما يمسّه التغيير الحالي. أما البديل (خط أساس لتجزئة كل مفتاح) فسيتطلب
ملفًا مولدًا بحجم نحو 600 KB، أي 3 أضعاف أكبر خط أساس موجود، مع تغيّره في كل طلب سحب خاص بالتدويل.

هناك طريقتان لاستيفاء هذا الشرط:

1. تحديث الترجمات المتأثرة، أو
2. تعيينها إلى `__MISSING__:<new english>` — وعندئذ يقدّم وقت التشغيل النص الإنجليزي المصحح
   (`src/i18n/request.ts::deepMergeFallback`، #7258)، ويُضاف المفتاح إلى قائمة انتظار الترجمة.

إذا تغيّر **معنى** السلسلة النصية، فمن الأفضل **إعادة تسمية المفتاح**: لا يمكن لمفتاح جديد أن يرث
ترجمة قديمة. وهذا هو النمط الذي استخدمه #8463.

```bash
npm run i18n:check-value-drift          # صارم (ما تشغّله CI)
npm run i18n:check-value-drift:warn     # إعداد تقرير فقط
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ينتهي بالرمز 0 مع `SKIP reason=base-unresolved` عندما يتعذر قراءة الكتالوج الأساسي (نسخة
مستنسخة ضحلة دون المرجع الأساسي)، بما يماثل `check-openapi-breaking`.

### المهمة: `i18n`

مصفوفة التحقق الكاملة من التدويل (مهمة واحدة لكل لغة). المهمة بأكملها استشارية.

| السكربت                         | ما يتحقق منه           | الحجب                                                  |
| ------------------------------- | ---------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | اكتمال الترجمة لكل لغة | **استشاري** (`continue-on-error: true` للمهمة بأكملها) |

### المهمة: `pr-test-policy`

تُشغَّل على طلبات السحب فقط.

| السكربت                | ما يتحقق منه                                                                                                                                 | الحجب |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `check:pr-test-policy` | يجب أن تتضمن طلبات السحب التي تغيّر شيفرة الإنتاج في `src/` أو `open-sse/` أو `electron/` أو `bin/` اختبارات أو تحدّثها (القاعدة الصارمة #8) | نعم   |
| `check:test-masking`   | ملفات الاختبار المتغيّرة لا تقلل صافي عدد التأكيدات ولا تضيف تحصيلات حاصلة من نوع `assert.ok(true)`                                          | نعم   |
| `check:pr-evidence`    | يشير نص طلب السحب إلى دليل اختبار/VPS للتغيير (يؤتمت القاعدة الصارمة #18 عبر البحث في نص طلب السحب — هش، راجع الأعمال المتراكمة)             | نعم   |

### المهمة: `test-vitest`

تُشغَّل بعد `build`. وتحجب الدمج عند الفشل.

| الحزمة           | ما تتحقق منه                                                            | الحجب                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | خادم MCP ‏(110 أدوات)، وautoCombo، وذاكرة التخزين المؤقت — مشغّل vitest | نعم                                                                                                                   |
| `test:vitest:ui` | اختبارات مكونات واجهة المستخدم — مشغّل vitest                           | **حاجب** — تُستبعد حالات الفشل الموجودة مسبقًا صراحةً في `vitest.config.ts`؛ وتؤدي حالات الفشل الجديدة إلى فشل المهمة |

### مسارات العمل الليلية (مجدولة، استشارية)

تُشغَّل وفق جدول cron (وعبر `workflow_dispatch`)، ولا تُشغَّل أبدًا على طلبات السحب. وجميعها استشارية.

| مسار العمل             | ما يتحقق منه                                                                                                                                                           | الحجب       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | اختبارات الخصائص باستخدام fast-check مع بذرة عشوائية وعدد تشغيلات مرتفع                                                                                                | **استشاري** |
| `nightly-resilience`   | بوابة نمو الكومة، وحقن أخطاء الفوضى، واختبارات التحميل/التحمل باستخدام k6                                                                                              | **استشاري** |
| `nightly-llm-security` | حاجز الحقن في promptfoo (وضع الحجب) + مجسّات garak (يتم تخطيها دون سر خاص بموفّر)                                                                                      | **استشاري** |
| `nightly-schemathesis` | اختبار عشوائي لعقد OpenAPI باستخدام schemathesis مقابل OmniRoute مباشر باستخدام `docs/openapi.yaml` — يكشف انتهاكات المواصفات / أخطاء 500 غير المعالجة (المرحلة 8 B.4) | **استشاري** |
| `nightly-mutation`     | نتيجة اختبار الطفرات باستخدام Stryker على مسار اختبارات الوحدة السريع — تكشف الطفرات الباقية عن التأكيدات الضعيفة                                                      | **استشاري** |
| `nightly-compat`       | مصفوفة توافق محرك Node عبر نطاقات `engines.node` المدعومة                                                                                                              | **استشاري** |

تُسجَّل خطوط أساس الأداء (الكومة، وTTFB، ووقت البناء) ولا تُستخدم كبوابات: راجع [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
