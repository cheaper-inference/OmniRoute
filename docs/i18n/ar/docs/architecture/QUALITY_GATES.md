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

## جرد البوابات وملفات التنفيذ

### قبول المرشحين

تُصدر كلٌّ من سيرتي عمل CI وQuality Gates نتيجة مستقرة: `Gate / CI` و
`Gate / Quality`. وتسرد سياسة القبول المُصدرة بإصداراتها كل مهمة من مهام المنبع باعتبارها مطلوبة أو استشارية. يجب أن تنجح المهمة المطلوبة المنطبقة: إذ لا يمكن للنتائج المفقودة أو الملغاة أو المتخطاة أو المعلّقة أو غير المعروفة أن تثبت PASS. ويمكن لتصنيف صالح يقتصر على الوثائق أو الكتالوج أن يجعل مسار التعليمات البرمجية غير منطبق؛ ولا تُعدّ PR مسودة مرشحًا مقبولًا. ولا يعفي تصنيف `hotfix` من تقديم الأدلة.

تغطي سيرتا العمل كلًّا من PRs إلى فروع main/release، وعمليات الدفع إلى
`main`، والتشغيل اليدوي، وأحداث مجموعات الدمج. ويشغّل الدفع والإرسال ومجموعة الدمج عملية الاختيار الكاملة. ولا تبدأ عمليات الدفع إلى `release/**` تشغيلهما (2026-10-18): فقد شغّل كل تغيير المصفوفة بالفعل على PR الخاصة به، ويكون الجمع المدمج من مسؤولية Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). وتستخدم التفرعات ومجموعات الدمج المُشغّلات المستضافة للمهام التي تختار المُشغّلات المستضافة ذاتيًا بخلاف ذلك؛ ويجب التحقق من كفاية السعة المستضافة قبل الإطلاق.

تشغّل PR العادية عملية الاختيار السريعة. ولا تعمل مسارا `full-code` و`full-code-e2e` في سياسة القبول (E2E، والتكامل، وأثر حزمة المنتج، واختبار Electron السريع، وBun SQLite، وعملاء المنظومة والبروتوكول) إلا على مسودة طابور Mergify أو ضمن تشغيل كامل:
`gh workflow run ci.yml --ref <branch>`.

تحدد كل إيصال JSON قيمة SHA التي تم سحبها، وتشغيل سير العمل، والمحاولة. وترفض CLI عدم تطابق SHA الخاص بالسحب/الحدث. وتربط اختبارات سير العمل عضوية السياسة بقائمة `needs` الخاصة بمهمة النتيجة، بحيث لا يمكن لمسار جديد أو مُزال أن يختفي دون ملاحظة. وتغطي الإيصالات سير العمل الخاص بها، وليس النشر أو التوزيع أو الأجزاء الداخلية من ماسح استشاري موجود. ويُعد تفعيل اسمي الفحص في قواعد الفروع تغييرًا إداريًا منفصلًا؛ وإضافة هذه المهام لا تحمي فرعًا بحد ذاتها.

### طابور الدمج

ترسل التسمية `queue` PR إلى طابور Mergify (`.mergify.yml`). ويفتح Mergify PR مسودة على فرع
`mergify/merge-queue/`، وتشغّل CI عملية الاختيار الكاملة هناك، ثم تُدمج PR الأصلية عندما تنجح `Gate / CI` و`Gate / Quality` و`Merge integrity (changelog + generated skills)`.

يكتب Mergify ملخص الطابور في وصف المسودة، ويمكن للتطبيقات الأخرى تعديله أيضًا.
ويحصل حدث `pull_request` `edited` على مسودة كهذه على مجموعة تزامن خاصة به
(`-queue-edit-<run_id>`) بحيث لا يمكنه إلغاء التشغيل الفعلي للمسودة، كما أنه يتخطى البوابة والمصفوفة. ولا تزال `Merge integrity` وحدها تعمل. وتحمل مهمة البوابة المتخطاة اسم فحص مختلفًا، لأن Mergify يقرأ `Gate / CI` المتخطاة باعتبارها فحصًا فاشلًا، فيزيل PR من الطابور.

بعد الإخراج من الطابور، لا تعيد عملية دفع إدراج PR في الطابور دائمًا. أضف التعليق `@mergifyio queue` عليها.

### الأدلة المحتفظ بها في مُختزِل القبول

يختزل `scripts/quality/validate-release-acceptance.mjs` خطةً مقدمة وبياناتها الوصفية؛ ولا يثبت أن الخطة تغطي مسار الإصدار الكامل.
وتضبط تقاريره صراحةً `releaseAcceptance: false`، حتى عندما تكون تلك الخطة
`VERIFIED`. ولا يزال سير العمل `release-acceptance.yml` يستخدم تركيبات اختبار ظل، وليس إيصالات حقيقية للبناء أو الحزمة أو الإقلاع أو الترقية.

تتطلب CLI الوسيط `--evidence-root` للتحقق من الأدلة المحتفظ بها. وتُحل الملفات باعتبارها `<evidence-root>/<artifact_id>/<member>` وتُجزّأ باستخدام SHA-256. ويمنع التحققَ سجلُّ PASS من دون دليل، أو ملف مفقود أو متغير، أو مسار غير آمن، أو رابط رمزي. ولا تعادل الملفات المفقودة سجلات نجاح فارغة. وتظل فحوص SHA/run/attempt الحالية مستقلة: فلا يمكن للبايتات المتطابقة إنقاذ إيصال قديم. كما أن سلامة الملف ليست دليلًا على أصالة التنفيذ أو ترقية الأثر.

### جرد الفحص الثابت

يوجد جرد أسماء npm المستعارة المُصدر بإصداراته وعضوية الفحص الثابت في
`config/quality/gate-manifest.json`. شغّل `npm run check:gate-manifest` للتحقق من أسماء البرامج النصية والأوامر الدقيقة مقابل `package.json`؛ وتؤدي الإضافات والإزالات وانحراف الأوامر إلى فشل كلٍّ من الخطاف المحلي ومهام تصنيف التغيير في CI.
والاسم المستعار ليس مهمة سير عمل أو مثيل مصفوفة أو حالة اختبار: يجب عدم عرض هذه الأعداد باعتبارها قابلة للتبادل.

استخدم `npm run quality:scan -- --list` أو `npm run quality:scan:fast -- --list`
لفحص الأسماء المستعارة المحددة دون تنفيذها. ويستدعي المشغّل نقطة إدخال npm، ولذلك يُحافَظ على بيئة تشغيلها (بما في ذلك Bun عند تكوينه).
ويسجل البيان الأسماء المستعارة الموجودة خارج تلك الملفات التعريفية باعتبارها مستدعاة بصورة منفصلة، كما تُحظر أوامر الصيانة في ملفات تعريف الفحص للقراءة فقط.

تغطي هذه الملفات التعريفية الفحص الثابت فقط. ولا تشهد باختبارات المنتج أو التغطية أو التغليف أو الفحوص الخارجية أو القبول الكامل لإصدار مرشح. ويستخدم قبول سير العمل `config/quality/admission-policy.json` و`scripts/quality/admission-verdict.mjs` المرتبطين. وتظل ملفات تعريف مراقب الإصدار منفصلة؛ افحص فحوصها وإيصالاتها المنطبقة بصورة مستقلة. وتُعلن الأوامر الثابتة الكاملة للمراقب في `config/quality/release-green-static-profile.json`، بما في ذلك `audit:deps` واختيار اختبار الطفرات وفحوص الترجمة. ويتحقق المحمّل من أوامر npm مقابل package.json وإعلانات CI/Quality المُنمذجة؛ ويرفض الانحراف بدلًا من تنفيذ رموز الصدفة كوسائط. ولا يمكن لخرج SKIP/INCOMPLETE الخاص بالماسح المطلوب أن يثبت PASS. ويسجل الملف التعريفي استثناءاته الخارجية ولا يحل محل التغطية المستضافة أو مصفوفات الاختبار أو أدلة الحزم أو التوزيع. أما جرد النص أدناه فمرجع، وليس دليلًا على أن بوابة ما قد عملت بالفعل.

توجد البرامج النصية ضمن `scripts/check/` (بوابات السياسة) و`scripts/quality/` (محرك الزيادة التدريجية). ومصدر الحقيقة لـ CI هو `.github/workflows/ci.yml`.

### المسار السريع لـ PR الإصدار (`quality.yml`)

يكمل `.github/workflows/quality.yml` عمل CI على PRs الخاصة بـ main/release، وعمليات الدفع إلى `main`، والإرسال، ومجموعات الدمج. وتستخدم PRs فحوصًا سريعة مصفاة حسب المسار. وقد أزيل البناء المكرر المعطل نهائيًا؛ بينما تظل فحوص البناء/الحزمة/الإقلاع الفعلية في CI. ولا تعمل مجموعة الوحدات وvitest إلا في CI (`Unit Tests (N/8)` و`Vitest`).

| المهمة                                           | النطاق                                                                                                                                       | الحظر                    |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | طلبات سحب التوثيق/الشفرة؛ مراجع توثيق API و`docs-all`                                                                                        | نعم                      |
| `Fast Quality Gates`                             | طلبات سحب الشفرة؛ الفحوصات الساكنة، وفحص الأنواع، وفحص أنواع لوحة المعلومات، واختبارات الوحدات المتأثرة، واختبارات الأشقاء المنسية (استشاري) |
| `No new ESLint warnings`                         | طلبات سحب الشفرة؛ حارس lint يراعي عمليات الكبت                                                                                               | نعم، بما في ذلك التفرعات |
| `Merge integrity (changelog + generated skills)` | طلبات السحب غير المسودة؛ سجل التغييرات ومزامنة المهارات المُولّدة                                                                            | نعم، بما في ذلك التفرعات |

#### تقرير اختبارات الأشقاء المنسية

يُشغّل `npm run check:forgotten-sibling-tests` كخطوة استشارية ضمن `Fast Quality Gates`، ويعيد استخدام محلّل الاستيراد الموجود خلف خريطة تأثير الاختبارات.
لكل وحدة إنتاج متغيّرة، يُبلغ عن سلاسل حتمية من الشكل
`changed module/symbol -> static consumer -> candidate sibling test` عندما يكون الاختبار المرشح
غائبًا عن فرق طلب السحب. يُحتفظ بملخص Markdown ونتيجة JSON باعتبارهما أثر سير العمل
`forgotten-sibling-tests` للمعايرة قبل طرح أي عملية حظر.

إعادة التصدير عبر Barrel والاستيرادات الديناميكية هي تشخيصات دقة فقط؛ ولا تُنشئ أبدًا نتيجة حظر. توجد الاستثناءات المُراجَعة في
`config/quality/forgotten-sibling-allowlist.json`. يجب أن يسمّي كل إدخال المستهلك والاختبار المرشح،
وأن يقدّم مبررًا محددًا، ويربط بمشكلة أو طلب سحب على GitHub. تؤدي الإدخالات غير الصحيحة إلى الفشل بشكل آمن. لا يمكن للاستثناءات كبت اختبار مرشح محذوف أو فرق يضيف `.skip`/`.todo`؛
أما إضعاف التأكيدات وغيره من أساليب الإخفاء فتظل مسؤولية بوابة
`check:test-masking` المستقلة والحاجبة.

### المهمة: `lint`

تُشغّل في كل طلب سحب إلى `main`. وتمنع الدمج عند الفشل.

| Script (`npm run ...`)            | يتحقق من                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | حظر التنفيذ                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | إصدار Node.js يقع ضمن النطاق المدعوم                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                    |
| `check:cycles`                    | الاستيرادات الدائرية عبر كامل `src/` + `open-sse/` (مبنية على AST، مع حلّ مسارات `paths` في tsconfig). يُنهي التنفيذ بحالة 1 دائمًا عند وجود أي دورة (يفشل بشكل آمن منذ #15281) ويسرد مكوّنات الاتصال القوية (SCCs). تقوم `check:cycles:ratchet` (وهو ما يشغّله CI) بالحظر عندما يتجاوز العدد الحد الأقصى المحدد في `metrics.cycles` داخل `quality-baseline.json` — وهو حاليًا 14، مع `direction: down`، لذا لا يمكنه إلا الانخفاض (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم (تدريجي)                           |
| `check:boundary`                  | الاقتران بين `open-sse → src`: استيرادات فريدة من ملف إلى ملف من المحرك إلى التطبيق (`scripts/quality/measure-boundary.mjs`؛ وقائمة الحواف هي قائمة الأعمال المتراكمة لمعالجة فصل النواة/الوحدات في الإصدار الرابع). الوضع الأساسي = تقرير إرشادي (مثل `quality:boundary`). تقوم `check:boundary:ratchet` (وهو ما يشغّله CI، والموجود أيضًا في حلقة التحقق التدريجي للمراحل السريعة في `quality.yml`) بالحظر عندما يتجاوز العدد الحد الأقصى المحدد في `metrics.boundaryOpenSseToSrc` داخل `quality-baseline.json` — وقد تم ضبطه مبدئيًا على القيمة المقاسة 771، مع `direction: down`؛ ولا يؤدي `--update` إلا إلى خفضه؛ ويُقاس بالنسبة إلى الأساس في طلبات الدمج (`--base-ref`، راجع أدناه)                                                                                                                                                                                                                                                 | نعم (تدريجي)                           |
| `check:route-validation:t06`      | وجود مخططات Zod في جميع المسارات (سياسة المستوى 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                    |
| `check:any-budget:t11`            | لا يتجاوز عدد `@ts-expect-error // any` الميزانية (كاتراكا من المستوى 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:provider-consistency`      | لكل موفّر في `providers.ts` إدخال مطابق في `providerRegistry.ts` (والعكس صحيح، ضمن قائمة السماح)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | نعم                                    |
| `check:model-lifecycle`           | تظل جداول التوجيه الثلاثة التي تُدار يدويًا متسقة مع لقطة دورة الحياة المُدخلة في المستودع (#11503): لا تسجّل `FITNESS_TABLE` (`taskFitness.ts`) درجة لأي معرّف متقاعد يمكن لـ `REGISTRY` توجيهه؛ كل هدف في `BUILT_IN_ALIASES` موجود في `REGISTRY` وغير موجود في لقطة المعرّفات المتقاعدة؛ وكل معرّف متقاعد لا يزال في `REGISTRY` تتم إعادة توجيهه أو إدراجه في `allowedRetiredInCatalog`؛ ولا يظهر أي مصدر أو هدف في `DEFAULT_DEGRADATION_MAP` على أنه متقاعد في تلك اللقطة. لا يثبت هذا أن نموذجًا ما يُقدَّم حاليًا بواسطة خدمة upstream مباشرة. يعمل دون اتصال — ويقارن مع `config/quality/model-lifecycle.json`، التي تُحدَّث يدويًا باستخدام `npm run quality:refresh-model-lifecycle` (عبر الشبكة؛ وليس موصولًا بـ CI). تُعد `allowedRetiredInCatalog` آلية خفض تدريجي للمتبقيات: لا تضف إدخالًا إلا مع وجود قضية تتبّع.                                                                                                             | نعم                                    |
| `check:fetch-targets`             | كل استدعاء `fetch("/api/...")` في `src/` من جهة العميل يُحلّ إلى `route.ts` حقيقي                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | نعم                                    |
| `check:deps`                      | جميع التبعيات القابلة للتثبيت باستخدام `npm install` عبر كل ملفات `package.json` في المستودع موجودة في `dependency-allowlist.json`؛ ويتم الإبلاغ عن الحزم الجديدة غير المثبّتة الإصدار أو الحزم التي تنتحل أسماء حزم أخرى                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `audit:deps`                      | تدقيق npm لجميع ملفات القفل الخمسة المستقلة (الجذر، وElectron، وإضافات OpenCode v1/v2، وموفّر الخدمة). تحجب التحذيرات الحرجة عملية التنفيذ؛ بينما تظل التحذيرات عالية الخطورة ظاهرة. تُعد عمليات التدقيق المفقودة أو الفاشلة غير مكتملة وتحجب التنفيذ؛ ويتم الاحتفاظ بتجزئات ملفات القفل والتقارير لكل نطاق.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                    |
| `check:lockfile`                  | سلامة `package-lock.json` — سجل `https`، تجزئات التكامل، وعدم وجود تجاوزات للمضيف                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | نعم                                    |
| `check:licenses`                  | قائمة السماح بتراخيص SPDX لتبعيات الإنتاج                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:tracked-artifacts`         | عدم وجود ملفات بناء أثرية / روابط رمزية لـ `node_modules` ملتزم بها (يُشغَّل أيضًا في husky pre-commit؛ أما pre-push فخفيف عمدًا — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:ai-attribution`            | عدم وجود تذييل `Co-Authored-By` للذكاء الاصطناعي/الروبوت أو تذييل إنشاء بالذكاء الاصطناعي في التزامات PR أو عنوانه أو نصه — القاعدة الصارمة رقم #16 (في حلقة البوابات السريعة `quality.yml` لطلبات PR→`release/**` — تقرأ حمولة الحدث ولا تُجري أي عملية خارج طلبات PR — وخطوة مخصصة لطلبات PR فقط في lint ضمن `ci.yml` لطلبات PR→`main`؛ وكذلك في خطاف `commit-msg` الخاص بـ husky؛ يُسمح بالمؤلفين المشاركين من البشر؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | يجب أن يذكر كل استثناء في Vitest مشكلة تتبّع وأن يظهر في `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                    |
| `check:file-size`                 | يجب أن تبقى الملفات المصدرية (`.ts`/`.tsx` في `src/` و`open-sse/` و`electron/` و`bin/`) ضمن `cap`، وملفات الاختبار (`*.test.ts(x)`) ضمن `testCap`؛ ويجب ألا تنمو الملفات المجمّدة في `file-size-baseline.json` (`frozen` / `testFrozen`) لتتجاوز الحجم المسجّل لها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                    |
| `check:error-helper`              | تستخدم استجابات الأخطاء في المنفِّذات/المعالجات `buildErrorBody()` / `sanitizeErrorMessage()` (القاعدة الصارمة Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                    |
| `check:migration-numbering`       | ملفات SQL الخاصة بالترحيلات مرقّمة بالتسلسل، من دون فجوات أو تكرارات                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                    |
| `check:public-creds`              | لا توجد قيم OAuth الحرفية `client_id`/`client_secret` أو مفاتيح الويب لـ Firebase خارج `publicCreds.ts` (القاعدة الصارمة Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                    |
| `check:db-rules`                  | لا توجد SQL خام خارج وحدات `src/lib/db/`؛ ولا توجد استيرادات شاملة من `localDb.ts` (القواعد الصارمة Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                    |
| `check:known-symbols`             | تتطابق منفِّذات المزوّدين واستراتيجيات التوجيه والمترجمات المسجّلة في جداول التوزيع الخاصة بها مع الملفات الموجودة على القرص — ولا توجد رموز يتيمة أو غير مصرّح بها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                    |
| `check:route-guard-membership`    | كل مسار ينشئ عمليةً فرعيةً مصنّف بواسطة `isLocalOnlyPath()` (القواعد الصارمة Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | نعم                                    |
| `check:test-discovery`            | يتم جمع كل ملف `*.test.ts` / `*.spec.ts` في المستودع بواسطة مشغّل اختبارات واحد على الأقل (آلية التقييد: لا يمكن لقائمة الملفات اليتيمة في `test-discovery-baseline.json` إلا أن تتقلص)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                    |
| `check:test-tla-order`            | لا يسجّل أي ملف `node:test` ضمن `tests/unit` اختبارًا، ثم يصل إلى `await` على المستوى الأعلى، ثم يسجّل اختبارات إضافية (#18045؛ آلية التقييد: لا يمكن لـ `test-tla-order-allowlist.json` إلا أن يتقلص)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                    |
| `check:agent-skills-sync`         | تتطابق الملفات الناتجة لمهارات الوكلاء مع كتالوج المصدر الخاص بها (من دون اختلاف). يتحقق وضع الإصدار من كل مهارة؛ أما طلب الميزة (`pr` mode) فيتحقق فقط من المهارات التي يعدّل نصها الناتج — راجع [الملفات الناتجة وخطوط الأساس المشتقة](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | تحمل شعارات/أصول الموفر إدخالًا مسجّلًا لمنشئها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | يتم تحليل ملفات إعداد JSON وتستوفي قواعد الفحص في المستودع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | تجميع TypeScript من دون أخطاء (تحذيرات إرشادية فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                    |
| `typecheck:noimplicit:core`       | `noImplicitAny` صارم — استشرافي؛ لا تزال العديد من مواضع الاستدعاء الموجودة مسبقًا بحاجة إلى تعليقات توضيحية                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **إرشادي** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` محصور بالنطاق `src/app/(dashboard)/**` (#7033) — لا تتضمن قائمة السماح المنسّقة المكوّنة من 27 ملفًا في `typecheck:core` أي ملف TSX خاص بلوحة المعلومات، كما أن `next build` لا يتحقق من الأنواع فيها أصلًا (`next.config.mjs` يعيّن `ignoreBuildErrors: true`)، ولذلك كانت التراجعات الناتجة عن المعرّفات المعزولة هناك (#6625/#6909) غير مرئية لـ CI. يقارن الفروقات مع خط أساس ثابت لكل ملف/رمز TS (`config/quality/dashboard-typecheck-baseline.json`، باستخدام نمط فرض التقادم نفسه المتبع في `check:known-symbols`) — ولا تفشل البوابة إلا عند ظهور أخطاء جديدة تتجاوز العدد الموجود في خط الأساس؛ ويمكن خفض العدد باستخدام `--update` عند إصلاح خطأ موجود مسبقًا.                                                                                                                                                                                                                                                              | نعم                                    |
| `check:build-typecheck`           | يتحقق من أنواع التطبيق بالكامل في الإنتاج عبر `tsconfig.build.json` (`src`، `open-sse`، `packages`، `bin`، `scripts`، `electron/**/*.d.ts`)، وهي مساحة لا تغطيها قائمة السماح السطحية المكوّنة من 27 ملفًا في `typecheck:core` ولا بوابة لوحة المعلومات. يقارن الفروقات مع `config/quality/build-typecheck-baseline.json`؛ ويؤدي ظهور عدد جديد أو متزايد لكل زوج (ملف، رمز) إلى الفشل، بينما يطلب العدد الأقل منك ضبط قيمة خط الأساس تدريجيًا. يرفض `--update` ما دام التشغيل يتضمن زوجًا جديدًا أو متزايدًا، ما لم يتم تمرير `--force-regressions`، كما يرفض ملفًا جرى إسكاتُه حديثًا ما لم يتم تمرير `--force-nocheck`، ولذلك فإن توسيع خط الأساس للحصول على نتيجة ناجحة ومنح إسكات دائم هما إجراءان متعمدان منفصلان. يتم رفض `--force` المجرد. كما يفحص نطاق البناء بحثًا عن `@ts-nocheck` مقابل `config/quality/ts-nocheck-baseline.json`، لأن الملف الذي يستخدمه لا يُصدر أي تشخيصات على الإطلاق، وإلا فسيكون غير مرئي لجميع البوابات. | نعم                                    |

#### يجيب برنامجا فحص الأنواع بطريقة مختلفة

يقوم كل من `typecheck:core` و`check:build-typecheck` بترجمة برنامجين مختلفين
ضمن خيارات مختلفة، وقد يكون الملف نفسه خاليًا من الأخطاء في أحدهما ومليئًا بها في الآخر.

يعيّن `tsconfig.build.json` الخيار `"strict": false`، ولذلك يكون `noImplicitAny` معطّلًا. يترجم إعداد النواة قائمة سماح منسّقة مكوّنة من 27 ملفًا باستخدام خيارات أكثر صرامة، ويتتبع الرسم البياني للاستيرادات الخاص بكل إدخال، ولذلك تظل الملفات التي لا تظهر مطلقًا في برنامج البناء خاضعة للفحص هناك.

وتكمن أهمية ذلك عند تقييم ما إذا كان الملف مكتوب الأنواع: **لا يعني وجود صفر من التشخيصات
ضمن `check:build-typecheck` وجود صفر من الأخطاء**. أظهرت إزالة `@ts-nocheck` من 26
ملفًا أن 23 منها نظيفة في برنامج البناء؛ وقد أظهر ستة عشر ملفًا من بينها نحو 120 خطأ من نوع
implicit-any في البرنامج الصارم. افحص كليهما قبل اعتبار الملف نظيفًا.

### المهمة: `quality-gate`

تُشغّل بعد `test-coverage`. وتمنع الدمج عند الفشل.

| Script                       | التحقّق                                                                                                                                                          | الحظر             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | يُصدر `quality-metrics.json` (عدد تحذيرات ESLint، والتغطية من تقرير الأجزاء المدمج)                                                                              | نعم (قبل ratchet) |
| `quality:ratchet`            | لم تتراجع أيٌّ من المقاييس في `quality-baseline.json` (تحذيرات ESLint ≤ خط الأساس؛ التغطية ≥ خط الأساس)                                                          | نعم               |
| `check:duplication`          | لا يتجاوز تكرار التعليمات البرمجية (jscpd@4) خط الأساس في `quality-baseline.json`                                                                                | نعم               |
| `check:complexity`           | لا يتجاوز التعقيد الدوري على مستوى الملف الحد الأقصى (قاعدة ESLint الأساسية `complexity` + `max-lines-per-function`)                                             | نعم               |
| `check:cognitive-complexity` | تثبيت التعقيد المعرفي (`eslint-plugin-sonarjs`) — تمريرة ESLint منفصلة؛ يشغّل CI كليهما مدمجين في خطوة `check:complexity-ratchets` الوحيدة                       | نعم               |
| `check:dead-code`            | لا يتراجع تثبيت الصادرات / الملفات غير المستخدمة (knip) مقارنةً بخط الأساس                                                                                       | نعم               |
| `check:compression-budget`   | ميزانية اختبار الضغط — يجب ألا تتراجع الحدود الدنيا لتوفير الرموز لكل محرّك                                                                                      | نعم               |
| `check:type-coverage`        | لا يتراجع تثبيت النسبة المئوية للأنواع (`type-coverage`)؛ ويشمل إلى حد كبير `typecheck:noimplicit:core`                                                          | نعم               |
| `check:codeql-ratchet`       | لا يتراجع عدد تنبيهات CodeQL المفتوحة (يُقرأ عبر `gh api`؛ مع تخطٍّ سلس من دون رمز مميّز) — للاطلاع على وتيرة التحديث والمشغّل اليدوي: راجع "تثبيت CodeQL" أدناه | نعم               |

### المهمة: `quality-extended`

المهمة بأكملها استشارية (`continue-on-error: true`). تعمل آليات التثبيت المستندة إلى npm
فعليًا؛ أما الماسحات الخارجية فتُثبّت عبر `gh release download` وتتخطى نفسها (رمز الخروج 0)
عندما تظل ثنائية التنفيذ غير موجودة.

| Script                   | التحقّق                                                                                                                                                                                                               | الحظر                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:circular-deps`    | لا توجد تبعيات دائرية (dpdm)                                                                                                                                                                                          | **استشاري**                            |
| `check:bundle-size`      | لا يتجاوز حجم الحزمة الحد الأقصى                                                                                                                                                                                      | **استشاري**                            |
| `check:secrets`          | فحص الأسرار (gitleaks) — يتخطى الفحص إذا كانت الثنائية غير موجودة                                                                                                                                                     | **استشاري**                            |
| `check:vuln-ratchet`     | لا تتراجع ثغرات التبعيات (osv-scanner) — يفشل `--ratchet` بالحالة INCOMPLETE (الخروج 2) إذا لم يتم القياس                                                                                                             | **استشاري**                            |
| `check:workflows`        | فحص سير العمل (actionlint + zizmor)؛ تؤدي الماسحات المفقودة/المعطّلة، أو التقارير غير الصالحة، أو خط الأساس المفقود للتثبيت إلى الفشل بالحالة INCOMPLETE. تتبع النتائج الصالحة سياسة التشدد/الاستشارة/التثبيت المحددة | مطلوب للتنفيذ؛ تثبيت zizmor حاجب في CI |
| `check:openapi-breaking` | عقد API العام مقابل التزامات الأحداث المثبّتة (خط أساس دمج PR، وما قبل الدفع، وخط أساس مجموعة الدمج؛ وفي الفحص المجدول/اليدوي أول أصل لعملية checkout)؛ يفشل القياس المطلوب بشكل مغلق                                 | **حاجب مع --ratchet**                  |

### المهمة: `docs-sync-strict`

تعمل عند كل PR إلى `main`. وتحظر الدمج عند الفشل.

| البرنامج النصي                 | يتحقق من                                                                                                                                                                     | الحظر                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | بوابة عليا تشغّل البوابات الفرعية الست أدناه بالتسلسل                                                                                                                        | نعم                        |
| ↳ `check:docs-sync`            | اتساق إصدار CHANGELOG / OpenAPI؛ وفي وضع الإصدار، النسخ المطابقة الـ66 من `llm.txt` وأقسام CHANGELOG المترجمة أيضًا (وضع PR: تطابق النسخ)                                    | نعم                        |
| ↳ `check:docs-counts`          | الأعداد الواردة في النصوص (عدد موفّري الخدمة، وعدد عمليات الترحيل، وما إلى ذلك). وضعان: `pr` في طلبات الميزات، و`release` خلاف ذلك — راجع "القيم المشتقة" أدناه              | نعم                        |
| ↳ `check:env-doc-sync`         | توثيق كل متغير بيئة في `.env.example` في جدول توثيق، والعكس صحيح                                                                                                             | نعم                        |
| ↳ `check:deprecated-versions`  | عدم وجود سلاسل إصدارات مهملة في التوثيق                                                                                                                                      | نعم                        |
| ↳ `check:doc-links`            | إحالة الروابط الداخلية في مستندات Markdown إلى ملفات حقيقية (`[text]`/`(path)`)                                                                                              | نعم                        |
| ↳ `check:fabricated-docs`      | وجود المسارات، ومتغيرات البيئة، وأوامر CLI، وأسماء الخطافات، ومسارات الملفات المذكورة في التوثيق في قاعدة التعليمات البرمجية. بوابة صارمة عبر `--strict`؛ وفشل لين دون العلم | نعم (عبر `--strict` في CI) |
| `check:cli-i18n`               | وجود مفاتيح `t()` الخاصة بـ CLI في `bin/cli/locales/en.json` (في كلا الوضعين)؛ والتكافؤ بين pt-BR / zh-CN / zh-TW و`en.json` في وضع الإصدار فقط                              | نعم                        |
| `check:openapi-coverage`       | تغطية مواصفة OpenAPI لما لا يقل عن حد أدنى متدرج من المسارات الحقيقية                                                                                                        | نعم                        |
| `check:openapi-security-tiers` | اتساق تعليقات مستوى الأمان في `openapi.yaml` مع تصنيفات `routeGuard.ts`                                                                                                      | **استشاري**                |
| `check:openapi-routes`         | إحالة كل مسار في `openapi.yaml` إلى `route.ts` حقيقي (مكافحة الاختلاق)                                                                                                       | نعم                        |
| `check:docs-symbols`           | إحالة كل مرجع `/api/...` في `docs/**/*.md` إلى `route.ts` حقيقي (مكافحة الاختلاق)                                                                                            | نعم                        |
| `i18n translation drift`       | النسخ المطابقة في `docs/i18n/**` مقابل `.i18n-state.json` — استشاري في طلبات PR (تُحدَّث النسخ المطابقة بواسطة موجة الترجمة)، وصارم عند الدفع والتنفيذ الليلي                | **استشاري** في طلبات PR    |

#### النسخ المطابقة للترجمة ملفات مشتقة (وضع PR مقابل وضع الإصدار)

يعدّل طلب الميزات مصادر اللغة الإنجليزية فقط. وتُعاد كتابة النسخ المطابقة في `docs/i18n/<locale>/**` (بما في ذلك النسخ الـ66 من
`llm.txt` وملفات `CHANGELOG.md` المترجمة) و`.i18n-state.json` في خطوة واحدة بواسطة موجة الترجمة (الفروع
`docs/i18n-*` / `chore/i18n-*`، و`i18n-mirror-refresh.yml` المجدول) وبواسطة الإصدار (`npm run release:sync-changelog-i18n`). ولذلك تعمل بوابات النسخ المطابقة
في وضعين، يحددهما `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`،
ثم `OMNIROUTE_GATE_MODE`، ثم حدث Actions؛ ويكون التشغيل المحلي في وضع `release`):

- `check:docs-sync` — يشغّل وضع الإصدار جميع عمليات التحقق. أما وضع PR فيُبقي إصدار package.json/OpenAPI،
  وعناوين CHANGELOG الجذرية وحارس المستندات المستبدلة، ويطبع
  `SKIP reason=pr-mode` لنسخ المرآة الخاصة بـ `llm.txt` وأقسام CHANGELOG المترجمة —
  ما لم يكتب PR المرايا: إذ إن الفرع الأساسي المعلن ككاتب لعائلة `docs/i18n/**` في
  `config/quality/derived-paths/*.json` يشغّل عمليتي التحقق بصرامة، وعندما تُحلّ قاعدة الفرق،
  فإن التغيير الذي يحرر `docs/i18n/<locale>/llm.txt` أو `CHANGELOG.md` ضمن فرقه الخاص يشغّل
  عملية التحقق تلك بصرامة. لا تُحلّ قاعدة الفرق في عملية استنساخ بعمق 1 (المهمة
  `docs-sync-strict`)، لذلك يشغّل وضع PR أيضًا عملية تحقق واحدة لا تحتاج إلى قاعدة: يجب أن تكون
  كل مرآة `llm.txt` موجودة، وأن تُبقي الفاصل `---`، وأن تحمل إما متن الجذر أو المتن الذي تشترك
  فيه معظم المرايا. تؤدي قاعدة تحركت إلى ترك جميع المرايا قديمة بالقدر نفسه، ويمر التحقق؛ أما
  التعديل اليدوي لإحدى المرايا فيؤدي إلى الفشل. ولا يوجد فحص مماثل لملفات `CHANGELOG.md`
  المترجمة في عملية PR مستنسخة بعمق 1.
- يشغّل خطاف ما قبل الإيداع `check-docs-sync.mjs --mode=pr`: ويُقيَّم الإيداع بناءً على ما يفعله.
  من دون العلم، يكون التشغيل المحلي في وضع الإصدار، وكان PR مدمج واحد يحرر `llm.txt` الجذري
  سيمنع كل إيداع لاحق على تلك القاعدة حتى تُنفَّذ الموجة. وتنطبق القاعدة نفسها على أي بوابة
  تراعي الوضع ويشغّلها خطاف Husky: يمرر الخطاف `--mode=pr`، وتبقى النتيجة الصارمة مع عمليات
  التشغيل في وضع الإصدار (إصدار PR، وعمليات الدفع إلى `main`، والتشغيل المحلي العادي).
- اختبارات وحدة محتوى المرايا (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — يتحقق وضع الإصدار من كل لغة. أما وضع PR فلا يتحقق إلا من المرايا
  المتزامنة حاليًا مع المصدر الإنجليزي وفقًا لـ `.i18n-state.json` (تجزئة الملف بالكامل، أو
  تجزئة القسم المسجلة للقسم الذي يثبّته الاختبار)، ويتخطى القديمة مع ذكر السبب. وتُجرى عمليات
  التحقق من مصدر `target_hash` لكل لغة في كلا الوضعين. تكون الحداثة حسب كل قسم `## `
  على حدة، وتُجري الوحدة `run-translation.mjs` التجزئة؛ ويعني طول القسم (إذ إن قائمة البوابات في هذا الملف
  تشكّل نحو نصفه) أن أي تعديل فيه يترك تلك المرايا قديمة، وتتخطى تأكيدات وضع PR الخاصة بها
  حتى الموجة التالية. وإذا لم يعد المصدر الإنجليزي يحتوي على مرساة، يُرجع الأمر إلى مقارنة
  الملف بالكامل.
- `i18n translation drift` — استشاري في طلبات PR، وصارم عند الدفع، وفي التشغيل الليلي وعند
  قطع الإصدار، حتى لا يمكن شحن مرآة قديمة ضمن إصدار.

يعيد `scripts/i18n/sync-llm-mirrors.mjs` (المُصدَّر أيضًا باسم `syncLlmMirrors()`، مع
`--dry-run`) كتابة مرايا `llm.txt`؛ ويشغّله تحديث الإصدار، وموجة الترجمة، وجدولة
`i18n-mirror-refresh.yml` (يكتشف التحديث المرايا القديمة لـ `llm.txt` عبر تشغيل تجريبي، لأن
تقرير الانحراف لا يسردها، ثم يزامنها قبل `check:docs-all`).

تُولَّد ملفات SVG الاثنا عشر الخاصة بـ README الموجودة تحت `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`؛
ويعيد `npm run docs:readme-diagrams` توليدها جميعًا). ولكل ملف اختبار وحدة للمقارنة
بايتًا ببايت (`tests/unit/docs/readme-*-svg.test.ts`، المهمة `test-unit`) يفشل عندما يكون الملف
المُثبت قديمًا في وضع الإصدار؛ أما في PR، فتُقيِّم `check:generated-artifacts` ملف SVG الذي
يعدّله PR، ويُترك انحراف القاعدة لتحديث الإصدار (راجع [الملفات المُولَّدة والأسس المشتقة المكتوبة عند الإصدار](#generated-files-and-derived-baselines-written-at-release)) — بينما
تقرأ `check:docs-counts` الأرقام الأساسية من عقد `<text>` الخاصة بها — ولهذا تُبقي
خطوة التحويل إلى مسارات كل سلسلة محوَّلة إلى مسار داخل الملف على هيئة `<text>` غير مرئي.
يقرأ فحص الأرقام الأساسية في SVG الملفات المدرجة في
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`، إضافةً إلى `public/images/tier-flow-dark.svg` و
`tier-flow-light.svg`؛ كما تقرأ ادعاءات المجانية الدائمة، وإدخالات الكتالوج، والمجمع المتكرر
وعوامل التقييم أيضًا
`promise-pillars.svg` و`free-tier-budget.svg` و`strategies-grid.svg`. وتأتي الأعداد التي
ترسمها هذه المولِّدات (إجمالي المزوّدين، وأدوات MCP، واستراتيجيات التوجيه، والمزوّدون المجانيون
دائمًا، …) من لقطة الحقائق `docs/reference/derived-facts.json` عبر
`scripts/docs/readmeFacts.mjs`، لا من قيم حرفية، ولذلك تؤدي إعادة توليد مخطط في أي فرع إلى
إعادة إنتاج الملف المُثبت. ويرسم `free-tier-budget.svg` صفوفه من اللقطة نفسها
(`code.freeTierBudget`، وملخص الكتالوج الذي تسجله عملية فحص الحقائق)، لذلك يصل التغيير في
`FREE_MODEL_BUDGETS` إلى البطاقة عند التحديث التالي بدلًا من تحويل CI إلى حالة فشل.

### القيم المشتقة: وضْعا بوابة `pr` و`release`

لا يكتب PR الخاص بميزة قيمة تعتمد على حالة قاعدته: أعداد المزوّدين، وعمليات الترحيل،
وأدوات MCP والاستراتيجيات، وأرقام SVG الخاصة بـ README، ولقطة الحقائق. تعيد خطوة واحدة
حسابها جميعًا، وهي `npm run release:refresh-derived`، ويشغّلها الإصدار وPR التحديث الليلي
للقيم المشتقة. لذلك **تكون القاعدة بين الإصدارات متأخرة عن الشيفرة الفعلية عمدًا**، وستكون
البوابة أو الاختبار الذي يقارن الشجرة بالشيفرة الفعلية باللون الأحمر في كل PR بعد أن يضيف
فرع شقيق مزوّدًا. ومن ثم تعمل البوابات التي تقيّم القيم المشتقة في أحد وضعين، ويحددهما
`scripts/check/lib/gateMode.mjs` (تُطبَّق المطابقة الأولى أولًا):

1. `--mode=pr|release` في سطر الأوامر؛
2. متغير البيئة `OMNIROUTE_GATE_MODE` (`pr` أو `release`)؛
3. تلقائيًا من حدث GitHub Actions: `pull_request` الذي لا يكون رأسه `release/v*`،
   أو `merge_group`، أو الدفع إلى `omni-queue/**` → `pr`؛ وكل ما عدا ذلك (الدفع، والجدولة،
   والإرسال، وPR الإصدار `release/v* → main`، وأي تشغيل محلي) → `release`.

ما الذي يفشل فيه `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) في كل وضع:

| Mode      | حالات الفشل                                                                                                                                                                                                                                                                                                                                                               | يحتاج إلى الحقائق المباشرة |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `release` | كل عملية تحقق، مع مساواة صارمة بالحقائق المجمّعة من الشجرة (السلوك الذي كان عليه الحاجز دائمًا): يُعدّ العدد القديم، أو الإصدار، أو الحد الأدنى للتغطية، أو رقم SVG انحرافًا STRICT                                                                                                                                                                                       | نعم                        |
| `pr`      | ما غيّره التغيير فقط، مع مقارنته بقاعدة PR باستخدام مستخرجات الادعاءات نفسها: (1) قيمة مُدارة لم تكن موجودة في القاعدة لذلك التحقق والملف ("عدّل PR رقمًا مُدارًا — أعد السطر إلى نص القاعدة")؛ (2) ادعاء مطلوب كانت القاعدة تتضمنه وفقده الرأس. تعمل ثوابت المحتوى التي لا تحتاج إلى حقائق كما في وضع الإصدار؛ أما عمليات التحقق الخاصة بالإصدار فتُدرج ويُتجاوز تنفيذها | لا                         |

لا تحتوي ملفات تعليمات الوكيل على أي عدد مشتق: تشير `AGENTS.md` و`llm.txt` (ونسخ
`docs/i18n/*/llm.txt` منها)، وتفرع `AGENTS.md` الخاص بـ bs، و`open-sse/services/AGENTS.md`،
و`src/shared/constants/agentSkills.ts`، و`skills/README.md` وكل `skills/*/SKILL.md` إلى
المصدر (مثل `ROUTING_STRATEGY_VALUES` في `src/shared/constants/routingStrategies.ts`) وإلى
`npm run facts` بدلًا من ذلك. يفشل الثابت "لا توجد أعداد مشتقة (ملف تعليمات الوكيل …)" عند
وجود عدد هناك (المزوّدون، وعمليات الترحيل، وأدوات MCP ونطاقاته، واستراتيجيات التوجيه،
وعوامل التقييم، وحزم الأوضاع) في كلا الوضعين، ولذلك لا يحتاج تحديث الإصدار إلى إعادة كتابة
ملف تعليمات.

في وضع `pr`، قد تعدّل فروع الكاتب القيم المُدارة: `chore/derived-*` (طلب PR الخاص
بالتحديث الليلي)، و`release/v*`، وموجات الترجمة `docs/i18n-*` و`chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). لا يُعاد تقييم دفعات قائمة الانتظار
(`merge_group` ومسودات Mergify و`omni-queue/**`): فهي تجمع طلبات PR سبق للحاجز تقييمها
واحدًا تلو الآخر.

رموز الخروج: `0` نظيف · `1` انحراف STRICT (أو انحراف لين مع `--strict`) أو مخالفة قيمة
مُدارة · `2` للبنية التحتية — تعذّر جمع حقائق الشيفرة (فشل مسبار tsx أو انتهت مهلته؛
المهلة هي `OMNIROUTE_FACTS_TIMEOUT_MS` وقيمتها الافتراضية 600000 ms) أو، في CI، تعذّر
تحديد قاعدة اختلاف PR. لا يشير رمز الخروج 2 مطلقًا إلى اختلاف في الوثائق: أعد تشغيل
المهمة أو أصلح البيئة.

أماكن تشغيل كل وضع:

| المكان                                                                                      | الوضع                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| طلب PR للميزة — مهمة `ci.yml` ‏`docs-sync-strict`، وخطوة "Docs accuracy" في `quality.yml`   | `pr` (تلقائيًا)؛ تمرر المهمة القاعدة باعتبارها `BASE_SHA` وتنفّذ checkout باستخدام `fetch-depth: 2`                                                                                                    |
| مرشحو `merge_group` و`omni-queue/**`، وقائمة الحواجز الكاملة لقطار الدمج                    | `pr`                                                                                                                                                                                                   |
| طلب إصدار (`release/v* → main`)، وعمليات الدفع، والتشغيلات المجدولة واليدوية                | `release`                                                                                                                                                                                              |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                | تُشغّل العناصر HARD مع `OMNIROUTE_GATE_MODE=pr` ("هل أفسدت القاعدة؟")؛ ويشغّل عنصر DRIFT ‏`derived-refresh` الأمر `npm run release:refresh-derived -- --check` (عرض صارم، ولا يفتح مطلقًا قاعدة حمراء) |
| الإصدار (`/generate-release` في المرحلتين 0a و1؛ توصيل المهارة تغيير منفصل معتمد من المالك) | يكتب `npm run release:refresh-derived` الملفات المشتقة؛ ثم تعمل عمليات التحقق الخاصة بطلب PR للإصدار في وضع `release`                                                                                  |
| `nightly-derived-refresh.yml` (يوميًا، أعلى `release/vX.Y.Z`، ويُتخطى أثناء تجميد الإصدار)  | `npm run release:refresh-derived -- --profile=nightly`؛ عند وجود اختلاف، يُبقي طلب PR واحدًا مفتوحًا من `chore/derived-refresh`؛ ولا يدمجه أبدًا                                                       |

الأوامر التي تقف وراء ذلك:

- يطبع `npm run facts` كل رقم مشتق بصيغة JSON (`scripts/release/facts.mjs`).
  يطبع `--key=code.mcpTools` قيمة واحدة، بينما يقرأ `--snapshot` اللقطة الملتزم بها بدلاً من
  الشجرة الحية. يخرج بالرمز 2 عندما يتعذر جمع الحقائق.
- يعيد `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) حساب
  الملفات المشتقة في تمريرة واحدة، بالترتيب التالي (معرّفات الخطوات لـ `--only=`):
  `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`)، و`facts` (اللقطة)، و`numbers` (تطبيق خطة
  إعادة الكتابة الخاصة ببوابة التعدادات على المستندات، ثم نقلها إلى النسخ المطابقة في
  `docs/i18n/`)، و`readme-diagrams`، و`skills` (`SKILL.md` المُنشأ)، و`e2e-timings` (يُتخطى
  إلى أن تتضمن الشجرة `syncE2eTimings`)، و`ui-keys` (يحذف المفاتيح التي أسقطها
  `en.json`، ومع `--rewritten-since=<ref>` — والقيمة الافتراضية هي `origin/main` — يعيد
  إدراج القيم الإنجليزية التي أُعيدت كتابتها منذ الإصدار الأخير)، و`llm-mirrors` و`verify-generated`
  (بعد الكتابة، يجب أن ينجح `check:generated-artifacts` و`check:agent-skills-sync` في وضع
  الإصدار؛ ويُتخطيان في `--check` وعندما يستبعدهما `--only`؛ ويكون الخروج بالرمز 2 عند
  الفشل). خطوة `changelog` اختيارية (`--with-changelog`، في ملف تعريف الإصدار فقط).
  لا يلمس `--profile=nightly` أي مطالبة بإصدار. مع `-- --check` لا يكتب شيئاً ويخرج بالرمز 1
  عندما يتغير أي ملف أو تحتاج قيمة مُدارة إلى تعديل يدوي (مع إدراج كليهما)؛ ويخرج بالرمز 2
  عند حدوث فشل في البنية التحتية. يطبع `--json` النتيجة بصيغة JSON.
- يمثّل `docs/reference/derived-facts.json` لقطة الحقائق التي استخدمها آخر تحديث. لا
  يكتبها إلا التحديث. تقرأها مولدات SVG الخاصة بـ README، وتقارن اختبارات الوحدة وقت طلب
  الدمج المستندات والملفات المُنشأة الملتزم بها بها — وليس بالكود الحي. والمقارنة الحية الوحيدة
  في المجموعة هي «تحديث الإصدار يغلق الدورة» في
  `tests/unit/check-docs-counts-sync.test.ts`: باستخدام الحقائق الحية، لا تترك خطة إعادة
  الكتابة الخاصة بالتحديث، بعد تطبيقها في الذاكرة، أي انحراف STRICT لم تُبلغ عنه، ولا يغيّر
  التخطيط مرة أخرى.

لإعادة الإنتاج محلياً (يستخدم التشغيل المحلي افتراضياً `release`):

```bash
npm run check:docs-counts                                       # الإصدار: صارم، حقائق حية
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # ما يُحكَم على طلب ميزة وفقه
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # ما سيعيد الإصدار كتابته
```

من دون أساس قابل للحل (أي من دون `BASE_SHA`/`BASE_REF`، ومن دون
`origin/release/v<version>` محلياً)، يطبع تشغيل `pr` المحلي تحذيراً ويتخطى الفرق بدلاً من
الفشل.

### المهمة: `i18n-ui-coverage`

| البرنامج النصي                   | عمليات التحقق                                                                                                                                                                       | يحجب التنفيذ          |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `check-ui-keys-coverage` (مضمّن) | تبلغ تغطية مفاتيح i18n لواجهة المستخدم ≥ 65%                                                                                                                                        | نعم (في كلا الوضعين)  |
| `check:ui-icu`                   | تُجمّع كل رسالة في كل كتالوج لواجهة المستخدم باستخدام `IntlMessageFormat`                                                                                                           | نعم (في كلا الوضعين)  |
| `check-ui-value-drift` (مضمّن)   | لا تترك **قيمة** إنجليزية أُعيدت كتابتها ترجمة قديمة                                                                                                                                | نعم (وضع الإصدار فقط) |
| `check-new-key-coverage` (مضمّن) | تُترجم **مفتاح** إنجليزي **جديد** في كل لغة — ويُرفض مؤشر `__MISSING__:`                                                                                                            | نعم (وضع الإصدار فقط) |
| `check-key-completeness` (مضمّن) | يحمل كل كتالوج لواجهة المستخدم (ومع `--catalog=cli`، كل كتالوج CLI) مجموعة مفاتيح `en.json` نفسها تماماً؛ وفي وضع `pr`، كل كتالوج غيّره طلب الدمج مقارنةً بنفسه عند نقطة أساس الدمج | نعم (في كلا الوضعين)  |
| `check-translation-ratio`        | يجب ألا تتجاوز نسبة الترجمة الفعلية لكل لغة (المطابق للإنجليزية / العنصر النائب / المفقود خارج قائمة السماح) `config/quality/i18n-translation-baseline.json` + الهامش               | نعم (وضع الإصدار فقط) |

يتطلب `fetch-depth: 0` — إذ تقارن بوابة انحراف القيمة `en.json` بنقطة أساس الدمج.

**وضعان (منذ 2026-11-13).** يضيف طلب الميزة مفاتيح في `en.json` (و
`bin/cli/locales/en.json`) أو يعيد كتابتها، ولا يلمس أي لغة أخرى؛ ويفشل
`check:pr-derived-paths` (المهمة `pr-test-policy`، والعائلة
`config/quality/derived-paths/translation.json`) طلب الميزة الذي يفعل ذلك. تُستكمل اللغات
الأخرى مرة واحدة في كل إصدار بواسطة `release:refresh-derived`، الذي يستدعي
`syncUiKeys()` في `scripts/i18n/sync-ui-keys.mjs` (إضافة المفاتيح المفقودة، وحذف المفاتيح
المسقطة، ووضع علامة على ترجمات الإنجليزية المعاد كتابتها باستخدام `rewrittenSinceRef`،
والترجمة)، أو بواسطة موجة ترجمة. تقرأ البوابات الوضع من
`scripts/check/lib/gateMode.mjs`: في وضع `pr` (طلبات الميزات، و
`merge_group`، و`omni-queue/**`) تطبع بوابات وضع الإصدار المذكورة أعلاه
`SKIP reason=pr-mode` وتخرج بالرمز 0؛ وفي وضع `release` (طلب الإصدار، والدفعات إلى
`main`، و`workflow_dispatch`، والتشغيلات المحلية) تكون صارمة كما في السابق، وفي طلب
الإصدار تحصل البوابات المعتمدة على الفرق على `BASE_REF=origin/main`، ولذلك تحكم على كل
مفتاح أضافته الدورة أو أعادت كتابته. عاين نتيجة طلب الميزة محلياً باستخدام
`--mode=pr`.

لا يتم تخطي طلب سحب يغيّر كتالوجات اللغات في وضع `pr` (موجة ترجمة، أو تحديث إصدار، أو إصلاح خاص بالترجمة): إذ يتحقق `check-key-completeness` من كل كتالوج غيّره الطلب مقابل الكتالوج نفسه عند قاعدة الدمج (`scripts/i18n/lib/touched-catalogs.mjs`)، ويفشل عند فقدان الكتالوج لمفتاح، أو وجود مفتاح لا يحتوي عليه `en.json`، أو تحوّل ترجمة حقيقية إلى علامة `__MISSING__:` أو إلى النص الإنجليزي، أو وجود قيمة لم تعد تتضمن العناصر النائبة/الوسوم الموجودة في سلسلة إنجليزية لم يغيّرها طلب السحب. يجب أن يتضمن أي كتالوج جديد في طلب السحب مجموعة مفاتيح `en.json` كاملة. ويغطي ذلك، بالنسبة إلى الكتالوجات التي يلمسها طلب السحب، ما ستراه بوابتا النسبة والتطابق مع CLI.

تتبع اختبارات وحدة تطابق اللغات (`cli-i18n-catalog`، `i18n-pt-br`، `i18n-vi-completeness`، `i18n-placeholder-parity`) الأوضاع نفسها عبر `tests/_helpers/localeParityMode.ts`: في وضع `pr`، تتخطى تأكيدات تطابق المفاتيح وتترك لتحديث الإصدار مهمة التحقق من تطابق العناصر النائبة للمفاتيح التي تغيرت إنجليزيتها منذ قاعدة الدمج (ولكل مفتاح عندما يتعذر على نسخة الدفع السطحية الخاصة بمهمة اختبار الوحدة قراءتها). هذا المساعد هو **التخطي الوحيد المشروط بالوضع والمصرّح به**:
إذ يحصي `check:test-masking` كلًا من `.skip(` و`{ skip: true }`، لكنه لا يحصي `{ skip: "<reason>" }` المحسوب الذي يعيده، لذلك يثبت `tests/unit/locale-parity-mode.test.ts` قائمة الاختبارات المسموح لها باستخدامه — وإضافة اختبار إليها تُعد تعديلًا خاضعًا للمراجعة على تلك القائمة.

#### `check-ui-value-drift` — بوابة الترجمة القديمة

تلتقط مشكلة i18n واحدة لا تستطيع البوابات الأخرى رؤيتها بنيويًا: إعادة كتابة قيمة إنجليزية وبقاء الترجمات المشتقة من الإنجليزية _السابقة_ دون تحديث، بحيث يواصل المستخدمون غير الناطقين بالإنجليزية قراءة نص يبدو موثوقًا لكنه أصبح خاطئًا.

تم إطلاق هذه الآلية فعليًا. أُعيدت كتابة `oauthModal.googleOAuthWarning` عند إضافة مساعد تسجيل الدخول إلى Antigravity (#5203)؛ **احتفظت 39 من أصل 43 لغة** بنص يخبر المشغّلين بـ"نسخ عنوان URL الكامل ولصقه أدناه" — وهو مسار لا يمكن إكماله لدى موفّر الخدمة هذا. ولم يُكتشف الأمر حتى #8463 للأسباب التالية:

- لا يقوم `sync-ui-keys` إلا بملء المفاتيح **الغائبة**، ولا يملأ المفاتيح **القديمة**؛
- يحسب `check-ui-keys-coverage` _وجود_ المفتاح، ولذلك تُحتسب الترجمة القديمة على أنها مغطاة؛
- يتتبع `check-translation-drift` نسخ وثائق `docs/i18n/<locale>/**.md` المطابقة —
  ولا يقرأ مطلقًا `src/i18n/messages/*.json`. ويُشغّل في المهمة `docs-sync-strict`: بصورة استشارية في طلبات السحب، وبصورة صارمة عند الدفع وفي التشغيل الليلي؛ وتحدّث موجة الترجمة النسخ المطابقة، لا طلب الميزة.

**يعتمد على الفروقات، لا على خط أساس.** يقارن `en.json` عند قاعدة الدمج بشجرة العمل؛ ولكل مفتاح تغيرت قيمته الإنجليزية، تُعد أي لغة لا تزال تحتوي على ترجمة لم تُلمس قديمة. ويؤدي ذلك عمدًا إلى **تجميد الدين التقني الموجود مسبقًا** — فلا يمكن للفارق أن يكشف الإنجليزية القديمة التي جاءت منها ترجمة قديمة قائمة منذ زمن، ولذلك لا تحكم البوابة إلا على ما يلمسه التغيير الحالي. أما البديل (خط أساس يتضمن تجزئة لكل مفتاح) فسيتطلب ملفًا مُولّدًا بحجم نحو 600 كيلوبايت، أي ثلاثة أضعاف أكبر خط أساس موجود حاليًا، مع تغييره في كل طلب i18n.

هناك طريقتان لاستيفاء المتطلب:

1. تحديث الترجمات المتأثرة، أو
2. تعيينها إلى `__MISSING__:<new english>` — عندها يقدّم وقت التشغيل الإنجليزية المصححة
   (`src/i18n/request.ts::deepMergeFallback`، #7258) وتُضاف المفاتيح إلى قائمة انتظار الترجمة.

إذا تغير **معنى** السلسلة، فالأفضل **إعادة تسمية المفتاح**: إذ لا يمكن لمفتاح جديد أن يرث ترجمة قديمة. وهذا هو النمط الذي استخدمه #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

يخرج بالرمز 0 مع `SKIP reason=base-unresolved` عندما يتعذر قراءة كتالوج القاعدة (نسخة سطحية من المستودع دون مرجع القاعدة)، محاكيًا `check-openapi-breaking`. في وضع الإصدار فقط: يعيد طلب الميزة كتابة الإنجليزية ويتوقف عند هذا الحد؛ ويضع تحديث الإصدار علامات على الترجمات التي تركها خلفه
(`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`، باستخدام `findStaleTranslations` نفسه).

### المهمة: `i18n`

مصفوفة تحقق كاملة من i18n (مهمة واحدة لكل لغة). المهمة بأكملها استشارية.

| البرنامج النصي                  | ما يتحقق منه           | الحجب                                                  |
| ------------------------------- | ---------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | اكتمال الترجمة لكل لغة | **استشاري** (`continue-on-error: true` للمهمة بأكملها) |

### المهمة: `pr-test-policy`

تُشغّل في طلبات السحب فقط.

| البرنامج النصي         | ما يتحقق منه                                                                                                                                          | الحجب |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `check:pr-test-policy` | يجب أن تتضمن طلبات السحب التي تغيّر كود الإنتاج في `src/` أو `open-sse/` أو `electron/` أو `bin/` اختبارات أو تحدّثها (القاعدة الصارمة #8)            | نعم   |
| `check:test-masking`   | لا تقلل ملفات الاختبار التي تغيرت العدد الصافي للتأكيدات ولا تضيف عبارات tautology من نوع `assert.ok(true)`                                           | نعم   |
| `check:pr-evidence`    | يشير نص طلب السحب إلى أدلة الاختبار/‏VPS الخاصة بالتغيير (يطبّق آليًا القاعدة الصارمة #18 عبر البحث في نص طلب السحب — وهو هش، راجع الأعمال المتراكمة) | نعم   |

### المهمة: `test-vitest`

تُشغّل بعد `build`. وتمنع الدمج عند الفشل.

| Suite            | التحقّقات                                                             | إلزامي                                                                                                                  |
| ---------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | خادم MCP (110 أداة)، وautoCombo، وذاكرة التخزين المؤقت — مشغّل vitest | نعم                                                                                                                     |
| `test:vitest:ui` | اختبارات مكوّنات واجهة المستخدم — مشغّل vitest                        | **إلزامي** — تُستبعد حالات الفشل الموجودة مسبقًا صراحةً في `vitest.config.ts`؛ وتؤدي حالات الفشل الجديدة إلى فشل المهمة |

### سير عمل الاختبارات الليلية (مجدولة، استشارية)

تُشغَّل هذه وفق جدول cron (وكذلك عبر `workflow_dispatch`)، ولا تُشغَّل مطلقًا عند طلبات السحب. وجميعها استشارية.

| سير العمل              | التحقّقات                                                                                                                                                       | إلزامي      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | اختبارات الخصائص باستخدام fast-check مع بذرة عشوائية + عدد تشغيل مرتفع                                                                                          | **استشاري** |
| `nightly-resilience`   | بوابة نمو الذاكرة، وإدخال أعطال الفوضى، واختبارات التحميل/التحمّل باستخدام k6                                                                                   | **استشاري** |
| `nightly-llm-security` | حارس حقن promptfoo (وضع الحظر) + مجسّات garak (يُتخطّى التشغيل دون سرّ موفّر)                                                                                   | **استشاري** |
| `nightly-schemathesis` | اختبار ضبابي لعقود OpenAPI (schemathesis) مقابل OmniRoute مباشر باستخدام `docs/openapi.yaml` — يكشف انتهاكات المواصفات / أخطاء 500 غير المعالجة (المرحلة 8 B.4) | **استشاري** |
| `nightly-mutation`     | نتيجة اختبار الطفرات باستخدام Stryker عبر مسار اختبارات الوحدات السريع — تكشف الطفرات الباقية عن تأكيدات ضعيفة                                                  | **استشاري** |
| `nightly-compat`       | مصفوفة توافق محرك Node عبر نطاقات `engines.node` المدعومة                                                                                                       | **استشاري** |

تُسجَّل خطوط الأساس للأداء (الذاكرة، وTTFB، ووقت الإنشاء) ولا تُستخدم كمعايير حظر: راجع [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## مرحلة السرعة (2026-08-30 → v4.0 LTS): تم تخفيف كل خط أساس بنسبة 20%

قرار المالك (2026-08-30): حتى إتمام عملية التقسيم إلى وحدات في الإصدار v4.0، أصبحت سرعة
الإصدار أهم من الحفاظ على حد الدين التقني. تم تخفيف كل خط أساس رقمي بنسبة 20% في عملية واحدة
قابلة للتدقيق، وتم تحديد المرحلة في `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| ما الذي تغيّر                                                                                                                                                                                                                         | المكان                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — تم ضرب أعداد القيم الأقل أفضل في 1.2، وقسمة النسب المئوية الأعلى أفضل على 1.2 (تم الإبقاء على حد التغطية الأدنى 60، وتظل `eslintErrors` تساوي 0، بينما أصبحت `eslintWarnings` تساوي 20% من عدد الإخمادات المجمّد) | `quality-baseline.json` (تسرد ملاحظة `_relax_velocity_2026_08_30` كل قيمة قبل → بعد)                   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                      | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| تم ضرب حدود `cap` و`testCap` وكل سطر من `frozen[*]` / `testFrozen[*]` في 1.2                                                                                                                                                          | `file-size-baseline.json`                                                                              |
| تم ضرب أعداد كل ملف / كل رمز TypeScript في 1.2                                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` من 36 إلى 30                                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| يصبح `--require-tighten` استشارياً عندما تكون قيمة `_policy.requireTighten === false`                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| يتوقف التشغيل الليلي لـ `bank-ratchet-shrinks` مؤقتاً (إذ إنه سيحفظ الانكماش المقاس ويلغي الهامش المتاح)                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                          |

قوائم السماح (`eslint-suppressions.json` و`test-masking-allowlist.json` و`test-discovery-baseline.json`
وغيرها) **ليست ميزانيات ولم يتم تعديلها**. كما أن بوابات سياسة النجاح/الفشل (الأسرار وقواعد SQL
وعقد الوثائق/البيئة وتكافؤ i18n واختبارات الوحدات) لم تتغير — يظل الاختبار الفاشل اختباراً فاشلاً.

**الأدوات**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — أداة
  التخفيف لمرة واحدة (`scripts/quality/relax-baselines.mjs`)؛ وترفض التشغيل مرتين بالملاحظة نفسها.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  تقيس كل بوابة رقمية بالطريقة التي تستخدمها CI وتطبع الهامش المتبقي لكل بوابة
  (`scripts/quality/baseline-headroom.mjs`). تنشر المهمة الليلية `baseline-headroom` الجدول
  في ملخص تشغيل سير العمل، وترفع تقرير JSON/Markdown الخاص بها باسم
  `baseline-headroom-<run_id>`، مع الاحتفاظ به لمدة 90 يوماً. تحدد صفوف التحذير والحرج البوابات
  التي تقع ضمن 10% من حدها الأقصى أو التي تجاوزته بالفعل. راجعوا هذه التقارير باعتبارها إنذاراً
  مبكراً لاستهلاك الميزانيات؛ وافحصوا ملاحظات `_rebaseline_*` الخاصة بالبوابة المتسببة. لم تعد
  المهمة تنشئ مشكلة دائمة أو تحدّثها؛ ويحافظ #12149 على سجل التقارير السابق.

**وضع الشيفرة الجديدة (التنظيف أثناء البرمجة) — منذ 2026-08-30، لمسار PR السريع فقط**

في أحداث `pull_request`، يمرر `quality.yml` الوسيط `--base-ref <PR base SHA>` إلى
`check:file-size` و`check:complexity-ratchets` و`check:dead-code`. وبالنسبة إلى
`check:complexity-ratchets` و`check:dead-code`، تقارن البوابة HEAD بقاعدة الدمج، مع
حصر المقارنة في الملفات التي لمسها PR (`scripts/check/newCodeMode.mjs`: تتم عملية تجسيد قاعدة
الدمج في `git worktree` مؤقت، ويُشغَّل ESLint/knip هناك وعلى HEAD، ثم تتم مقارنة الأعداد لكل ملف):

- **حاجب** — أضاف PR انتهاكات دورية/معرفية أو صادرات ميتة في الملفات التي غيّرها
  (`complexityNewCode=` و`cognitiveComplexityNewCode=` و`deadExportsNewCode=` في السجل)؛
- **استشاري** — الإجمالي العام مقارنة بخط الأساس المجمّد. لا يؤدي الانحراف الموروث إلى جعل PR
  سليم يفشل؛ ويُعاد تجميد الانحراف عند تسوية الإصدار وتتم مراقبته بواسطة مهمة الهامش المتاح.

يستخدم `check:file-size` مرجع الأساس وفق شروطه الخاصة (`scripts/check/check-file-size.mjs`، #8522):
إذ يفحص كل ملف مصدر واختبار في الشجرة، ويقرأ عدد أسطر كل ملف عند قاعدة PR باستخدام `git show`،
ولا يفشل الملف إلا عندما يتجاوز الحد الأكبر بين سقف خط أساسه
(`frozen` / `testFrozen`، أو `cap` / `testCap` لملف خارج خط الأساس) وحجمه عند القاعدة. لذلك
فإن الملف الذي كان قد انحرف بالفعل عند القاعدة لا يجعل PR سليماً يفشل.

`check:boundary:ratchet` يطبّق القاعدة نفسها على رقمه الوحيد
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): في أحداث PR، تمرّر كلٌّ من
بوابات الجودة السريعة في `quality.yml` ومهمة الفحص في `ci.yml` قيمة SHA الأساسية للـ PR، ويُقاس
الالتزام الأساسي من تصدير `git archive`، ولا يفشل الـ PR إلا عندما يتجاوز عدد حواف
`open-sse → src` فيه القيمة الأكبر من `metrics.boundaryOpenSseToSrc` والعدد في الالتزام الأساسي.
يُبلَّغ عن تجاوز الالتزام الأساسي للسقف (`base drift herdado`) لكنه لا يتسبب إطلاقًا في فشل
PR سليم؛ أما الدفع إلى main فيُبقي السقف المطلق، وعند تعذّر حل SHA الأساسي يُستخدم السقف
المطلق مع إصدار تحذير.

يحصل مرشح omni-queue (دفعة إلى `omni-queue/**`، راجع [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md))
على المعاملة نفسها التي يحصل عليها طلب السحب: تمرّر كلتا سيرتي العمل أساس المرشح
(`needs.changes.outputs.candidateBase`) بوصفه `--base-ref`، كما تُشغَّل
`check:ts7-diagnostics-ratchet` عليه أيضًا. وبالنسبة إلى بوابتي الكود الجديد، يكون أساس
المقارنة هو قيمة SHA نفسها، وليس أول أبّ لالتزام الدمج الأعلى، ولذلك يُقيَّم كل طلب سحب
في الدفعة.

لا تملك عمليات التشغيل `workflow_dispatch`، وفحص release-green، ومهمة headroom الليلية أساس
PR، ولذلك تُبقي المقارنة المطلقة (العالمية). أما التغطية، والتكرار، وتغطية الأنواع فتبقى
عالمية في الوقت الحالي (إذ لا تنتج أدواتها فرقًا لكل ملف بتكلفة منخفضة) — وهي مرشحون
للمعاملة نفسها.

**اختتام المرحلة عند v4.0 (‏LTS = أكثر تشددًا من السابق، وليس «العودة إلى الوضع الطبيعي»)**

1. على طرف `release/v4.0.0` النقي: شغّل `npm run quality:headroom --json` للتسجيل، ثم
   `npm run quality:ratchet -- --update`، و`check:file-size --update`،
   و`check:complexity-ratchets --update`، و`check:dead-code --update`، وخيار
   `--update` لكل بوابة فحص للأنواع — يجب أن ينخفض كل خط أساس إلى القيمة المقاسة.
2. احذف `_policy` من `quality-baseline.json` (لإعادة تفعيل `--require-tighten` وعمليات
   الإيداع الليلية)، وأعد `THRESHOLD = 36` (أو قيمة أعلى) في `check-openapi-coverage.mjs`.
3. شدّد القيود إلى ما يتجاوز القيم المقاسة حيث أتت عملية التقسيم إلى وحدات ثمارها:
   أعد `cap` لحجم الملف إلى 1000 (أو 800)، وارفع حدود التغطية الدنيا بمقدار +5،
   واجعل الصادرات غير المستخدمة 0 للحزم التي جرى تقسيمها إلى وحدات.

## خط الأساس للتدرّج (`quality-baseline.json`)

يقرأ محرّك التدرّج (`scripts/quality/check-quality-ratchet.mjs`) الملف `quality-baseline.json`
ويقارنه بملف `quality-metrics.json` الذي جُمعت بياناته حديثًا. وأي مقياس يتراجع
بما يتجاوز هامش السماح الخاص به يؤدي إلى فشل عملية البناء.

المقاييس المتتبعة حاليًا:

| المقياس               | الاتجاه | المعنى                           |
| --------------------- | ------- | -------------------------------- |
| `eslintWarnings`      | `down`  | يجب ألا يزداد عدد تحذيرات ESLint |
| `coverage.statements` | `up`    | يجب ألا تنخفض تغطية العبارات     |
| `coverage.lines`      | `up`    | يجب ألا تنخفض تغطية الأسطر       |
| `coverage.functions`  | `up`    | يجب ألا تنخفض تغطية الدوال       |
| `coverage.branches`   | `up`    | يجب ألا تنخفض تغطية الفروع       |

لتحديث خط الأساس بعد تحسّن فعلي:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

يكتب الخيار `--update` القيم المقاسة الحالية في `quality-baseline.json`.
إن اعتماد التحسّن هو عمل خاص بالإصدارات/التشغيل الليلي، وليس عمل طلبات سحب الميزات:
يفشل `--require-tighten`
(المرحلة 6A.5) عند وجود تحسّن غير معتمد فقط في وضع الإصدار (الدفع، والجدولة، وطلب سحب الإصدار،
والتشغيلات المحلية). أما في طلب سحب لميزة (وضع بوابة `pr`) فيعرض التحسّن كمعلومة
ويجتاز العملية؛ بينما يؤدي التراجع إلى الفشل في كلا الوضعين. وخلال مرحلة زيادة السرعة، يكون هذا
استشاريًا في كل مكان (`_policy.requireTighten: false`). راجع
[الملفات المُنشأة وخطوط الأساس المشتقة](#generated-files-and-derived-baselines-written-at-release).

### تدرّج CodeQL: وتيرة التحديث والمشغّل اليدوي

يقرأ `check:codeql-ratchet` **حالة المستودع، التي تُحدَّث وفق جدول زمني — وليس لكل طلب سحب.**
يُظهر `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`
`state: configured` و`schedule: weekly`: أي فحص الإعداد الافتراضي في GitHub، وليس
تحليلًا لكل عملية دفع. والنتيجة: بعد دمج طلب سحب يُصلح التنبيهات، يواصل التدرّج قراءة
العدد القديم الأعلى حتى يُشغَّل الفحص المجدول التالي — لذلك يُبلغ عن تراجع في كل طلب سحب مفتوح،
بما في ذلك المتابعات الخاصة بطلب السحب المُصلح نفسه، إلى أن يلحق الفحص بالوضع الحالي.

**التحديث اليدوي**: يعيد `gh workflow run codeql.yml --ref release/vX.Y.Z` تشغيل
التحليل ويعيد نشر التنبيهات خلال دقائق. اقرأ `.github/workflows/codeql.yml`
أولًا — يوضح رأسه أنه لا يقبل سوى `workflow_dispatch` **لأنه يتعارض مع
"الإعداد الافتراضي" في GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). تتطلب استعادة مشغلات `push`/`pull_request`/
`schedule` إجراءً من **المالك أولًا**: Settings → Code security →
CodeQL: Default → Advanced. لا تضف مشغّل `schedule:` دون إجراء ذلك التبديل — إذ
لن يؤدي إلا إلى تشغيلات فاشلة.

**شدّد خط الأساس بعد انخفاض العدد** — يكتب `node scripts/check/check-codeql-ratchet.mjs
--update` العدد المقاس الجديد في `quality-baseline.json` →
`metrics.codeqlAlerts.value`، حتى لا يسمح التدرّج بصمت بحدوث تراجع يعود
إلى السقف القديم. مثال عملي (2026-09-02/03): أصلح طلب السحب #12502 سبعة تنبيهات
حقيقية (من 13 إلى 6 تنبيهات مفتوحة مقاسة)؛ وشدّد طلب السحب #12530 خط الأساس المجمّد من 11 إلى 6 ليتطابق معه؛ ثم رُفضت التنبيهات الستة المتبقية مع تبرير لكل تنبيه، لينخفض العدد إلى 0 تنبيه مفتوح.

**قرارات الرفض من مسؤول التشغيل (القاعدة الصارمة #14)** — لا ترفض تنبيه CodeQL
دون تسجيل التبرير التقني في تعليق الرفض: `won't fix` لمتطلب صادر عن بروتوكول upstream، و`used in tests` لبيئة اختبار،
و`false positive` لحالة إيجابية زائفة لا يستطيع CodeQL رؤية أداة التعقيم فيها (سابقة:
`docs/security/ERROR_SANITIZATION.md`).

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

## الملفات المُولَّدة وخطوط الأساس المشتقة (تُكتب عند الإصدار)

الخطة 2026-11-13 ("تُحل الأرقام والنصوص المشتقة عند الإصدار فقط"): يغيّر طلب ميزة **المصدر** — `src/shared/constants/providers.ts` و`docs/openapi.yaml` وكتالوج المهارات وكتالوج المستوى المجاني ومواصفة e2e جديدة. ولا يعيد توليد الملفات المحسوبة من ذلك المصدر، كما لا يضيف تحسينًا مقاسًا إلى خط أساس. تُعاد كتابة هذه الملفات مرة واحدة بواسطة تحديث الإصدار (`release:refresh-derived`) أو بواسطة طلب تحديث ليلي. قبل ذلك، كان كل طلب شقيق يتضمن نسخته المُعاد توليدها، مما كان يتسبب في تعارضه مع عملية الدمج التالية (2026-11-13: أعاد 30 من أصل 321 طلب PR مفتوح كتابة `PROVIDER_REFERENCE.md`، وأعاد 26–28 منها كتابة مخططات README).

**الحارس.** يفشل `check:pr-derived-paths` (المهمة `pr-test-policy`) طلبَ ميزة يلمس ملفًا من عائلة موجودة في `config/quality/derived-paths/`:

| العائلة     | الملفات                                                                                                                                                                                       | يُعاد كتابة الملفات بواسطة                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`؛ `docs/reference/PROVIDER_REFERENCE.md`؛ ملفات README SVG الاثنا عشر المُولَّدة؛ `skills/*/references/**`؛ ملفات `SKILL.md` التي لا تحتوي على كتلة مخصّصة | `release:refresh-derived` (الحقائق)، `gen:provider-reference`، `docs:readme-diagrams`، `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                             | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                       |

تُستثنى الكتّابات (`release/v*` و`chore/derived-*` و`chore/bank-ratchet-*` لخطوط الأساس)، وكذلك طلبات PR التي تغيّر عائلة واحدة فقط مع مرافِقاتها (بالنسبة إلى `generated`: نصوص المولّدات البرمجية، واختباراتها، ومدخلات مهارات الوكيل — `src/shared/constants/agentSkills.ts`، ووثائق `skills/**` المكتوبة يدويًا، و`docs/openapi.yaml` — و`changelog.d/**`)؛ مثل تغيير تخطيط الواجهة الرئيسية مع SVG المُعاد توليده، أو إصلاح المهارات الذي يقرأ اختباره ملفات `SKILL.md` المُعاد توليدها. لا يكون ملف `SKILL.md` الذي يحتوي على كتلة مكتوبة يدويًا `<!-- skill:custom-start -->` ضمن العائلة: إذ تبقى كتلته المخصّصة قابلة للتحرير بجانب الميزة.

**التحققات، حسب وضع البوابة** (`scripts/check/lib/gateMode.mjs`؛ المساعد `scripts/check/lib/derivedArtifactScope.mjs`):

| التحقق                                                                            | `release` (دفع، جدولة، طلب PR للإصدار، محلي)                             | `pr` (طلب PR لميزة، دفعة قائمة الانتظار)                                                                                                                                                                    |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                         | يجب أن تساوي كل مهارة ناتج المولّد                                       | المهارات التي يعدّل طلب PR نصها المُولَّد (خارج الكتلة المخصّصة) أو `references/` فقط؛ وإلا `SKIP reason=pr-mode`                                                                                           |
| `check:generated-artifacts` (ملفات README SVG + توقيتات e2e؛ يتطلب السجل الكامل)  | يجب أن يساوي كل SVG ناتج مولّده؛ ويجب أن تحتوي كل مواصفة على إدخال توقيت | العناصر المُنشأة التي يعدّلها طلب PR فقط؛ أما الباقي فـ `SKIP reason=pr-mode`؛ ولا يوجد أساس للمقارنة → تُقيَّم كل العناصر (مع الفشل الآمن)                                                                 |
| اختبارات مقارنة البايت لملفات README SVG (`tests/unit/docs/readme-*-svg.test.ts`) | كل SVG                                                                   | أي SVG يعدّله طلب PR فقط، عندما يُحل الأساس؛ لا تتضمن عملية الدفع السطحي لـ `test-unit` أساسًا، لذلك يتخطى الاختبار هناك مع `SKIP reason=base-unresolved`، بينما يتولى `check:generated-artifacts` المقارنة |
| اكتمال توقيتات e2e (`tests/unit/balance-e2e-shards.test.ts`)                      | يجب أن تحتوي كل مواصفة على إدخال                                         | القاعدة نفسها المتّبعة لاختبارات SVG (تُشغَّل المواصفة الجديدة بوزن الوسيط)                                                                                                                                 |
| `check-quality-ratchet.mjs --require-tighten`                                     | يفشل التحسين غير المُودَع (ما لم يكن `_policy`)                          | يُبلَّغ عن التحسين، ولا يُعد فشلًا مطلقًا؛ أما التراجع فما يزال يفشل                                                                                                                                        |

يُبقي وضع الإصدار على الأحكام ورموز الخروج والرسائل التي كانت لهذه الفحوصات قبل التقسيم؛ ولا يُضاف أكثر من سطر واحد، لتسمية الوضع المُحلّ (`[agent-skills-sync] mode=release (auto: local run)`).

تتخطى الاختبارات ذلك عبر خيار `{ skip: releaseOnlyUnlessTouched(...) }` في `node:test`، والذي يسرده `check:test-masking` في كتلة مخصّصة للتقارير فقط (فهو ليس `.skip(` ولا `{ skip: true }`، ولذلك لا يُحتسب كتخطٍّ قسري). ويُشغّل `check:generated-artifacts` حيث يمكن حلّ المرجع الأساسي: في المهمة `lint` (`fetch-depth: 0`)، مباشرةً بعد `check:agent-skills-sync`. محليًا، يعرض `npm run check:generated-artifacts -- --mode=pr` ما الذي يحكم عليه ذلك الإجراء في طلب PR. أما التحقق المتقاطع من إجمالي المزوّدين في `check:docs-counts` ("Provider reference total (doc vs live modules)") فهو جزء من بوابة التعدادات ويتبع أوضاع تلك البوابة نفسها.

ليست ضمن عائلة، عن قصد: ملفات السياسات التي يحدّدها الأشخاص (`gate-manifest.json`، وقوائم السماح، و`admission-policy.json`، و`provider-assets-provenance.jsonl`، و`model-lifecycle.json`) والأسقف التي قد يتعين على طلب PR للميزة تعديلها مع الشيفرة (`quality-baseline.json` وإدخالات المقاييس، وخطوط أساس فحص الأنواع/حجم الملفات/التعقيد، و`eslint-suppressions.json` — التي تُنقّى بواسطة تشغيل ESLint في مرحلة pre-commit عندما يُصلح طلب PR مخالفة مجمّدة). كما أن `src/i18n/routeNamespaces.generated.json` مُولّد أيضًا، لكنه يبقى ضمن طلبات PR للميزات: إذ يستورده التطبيق وقت التشغيل، ولذلك لا يمكنه انتظار التحديث.

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

## سياسة القائمة المسموح بها

تستخدم كل بوابة لا يمكنها الفشل بسبب انتهاكات موجودة مسبقًا قائمةَ سماح مجمّدة
(مثل `KNOWN_STALE_DOC_REFS` و`KNOWN_MISSING` و`KNOWN_RAW_SQL`). وتتمثل السياسة في ما يلي:

**أصلح السبب الجذري؛ واستخدم قائمة السماح فقط عندما تكون المخالفة موجودة مسبقًا
ولا يمكن إصلاحها في طلب السحب نفسه.**

عند إضافة إدخال إلى قائمة سماح:

1. أدرج تعليقًا يوضح المبرر.
2. أشر إلى مشكلة التتبع (مثل `// #3498 — Phase 2 feature, not yet implemented`).
3. أزل الإدخال في طلب السحب نفسه الذي يصلح المخالفة — فالإدخال القديم الذي لم يعد
   يمنع مخالفة نشطة يُعد عيبًا بحد ذاته (سيفشل فرض القواعد القديمة 6A.3
   البوابة بسبب إدخال孤 orphaned في قائمة السماح عند تنفيذه).

**لا تضف إدخالات إلى قائمة السماح لجعل الاختبارات تنجح بصورة أسرع.** فالبوابة الخضراء
مع قائمة سماح آخذة في التوسع تمنح شعورًا زائفًا بالجودة.

### عند فشل بوابة في طلب السحب الخاص بك

1. **اقرأ مخرجات البوابة بعناية** — فهي تخبرك بالضبط بالملف أو الرمز الذي خالف
   القاعدة.
2. **أصلح المخالفة** — معظم البوابات عبارة عن فحوصات حتمية لنظام الملفات تنجح
   بمجرد أن يصبح الكود صحيحًا.
3. **إذا كانت المخالفة موجودة مسبقًا** (أي إنك لم تُدخلها، لكن البوابة تشملها الآن):
   أضف إدخالًا إلى قائمة السماح مع تعليق يوضح المبرر ومشكلة تتبع.
4. **إذا كانت البوابة آلية تصعيد** (التغطية، وتحذيرات ESLint، والتكرار، والتعقيد):
   فقد جعل تغييرك المقياس أسوأ. أصلح المشكلة الأساسية، أو (في حالات نادرة) شغّل
   `npm run quality:ratchet -- --update` إذا كان التغيير مقصودًا وكان تدهور المقياس مقبولًا — لكن
   وثّق السبب في وصف طلب السحب.
5. **البوابات الاستشارية** (`continue-on-error: true`) هي بوابات إعلامية — ولا تمنع
   الدمج، لكنها تظهر في ملخص CI. أصلحها على أي حال.

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

## قائمة انتظار الترشيد (مراجعة ROI — المرحلة 9 الموجة 3)

تمت مطابقة هذا الجرد مع `ci.yml` في 2026-06-17 (كانت النسخة السابقة تفتقد
`audit:deps` و`check:tracked-artifacts` و`check:lockfile` و`check:licenses`،
`check:dead-code` و`check:cognitive-complexity` و`check:type-coverage`،
`check:codeql-ratchet` و`check:pr-evidence`). حدّدت مراجعة ROI للمجموعة المطابقة
المرشحين التاليين للترشيد. **عمليات الدمج تغييرات ميكانيكية في CI؛ أما عمليات التبديل/الحذف فهي قرارات سياسات محفوظة للمشغّل.** لم يُطبَّق أي مما يلي حتى الآن.

**كما لم يتم توثيقه أعلاه** (استشاري، منخفض الإشارة): مهمة `docs-lint`
(`markdownlint` + Vale، مع `continue-on-error` للمهمة بأكملها) وسير عمل الماسحات المستقلة
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. توجد القيمة `semgrepFindings: 0` في
`quality-baseline.json` لكنها غير موصولة بآلية ratchet حاجزة في `ci.yml` — لذا فإن المقياس معزول حاليًا.

### الدمج / إزالة التكرار (ميكانيكي، أقل مخاطرة)

تم التحقق من كل مرشح مقابل حالة البوابات الفعلية في 2026-06-17 (الثقة مع التحقق)؛ واتضح أن عدة عمليات دمج «بديهية» تخفي ديونًا ولم تكن **إضافات مباشرة نظيفة**.

- **يُشغَّل `check:docs-sync` مرتين** — بشكل مستقل في مهمة `lint` ومرة أخرى داخل `check:docs-all` (`docs-sync-strict`) وخطاف pre-commit الخاص بـ husky. ✅ **تم** — أُزيل استدعاء `lint` المستقل.
- **فحص CVE** — ❌ **ليس دمجًا نظيفًا.** تمنع `audit:deps` الاستشارات الحرجة وعمليات التدقيق غير المكتملة عبر ملفات القفل الخمسة، بينما تُبلّغ عن الاستشارات عالية الخطورة كتحذيرات وفق السياسة الحالية؛ ولا تفشل `check:vuln-ratchet` (`osv`) إلا عند حدوث _تراجع_ مقارنة بالخط الأساسي الموجود في المستودع، كما ترفض القياسات المفقودة عند طلبها. الدلالات مختلفة — سيؤدي حذف `audit:deps` إلى فقدان البوابة الحرجة المطلقة وإيصالات تدقيق الحزم المستقلة. يجب الإبقاء عليهما.
- **اكتشاف الدورات** — ✅ **تم** (#15159 G-01/G-02). كان النص القديم هنا يصف `check:cycles` بأنه البوابة «الخضراء والمنقّحة» ويبرر إبقاءها حاجزة لأن `check:circular-deps` (`dpdm`) أبلغ عن 91 دورة. كانت تلك الخضرة **خضرة زائفة**: إذ فحصت `check:cycles` خمسة مجلدات فرعية (450 ملفًا)، وطابقت فقط `import|export … from` الساكنة، وأسقطت كل محددات `@/` و`@omniroute/open-sse/`، ولذلك لم تتمكن من رؤية دورات الاستيراد الديناميكي + alias التي كانت مهيمنة في المستودع. تم الإصلاح: تتنقل البوابة الآن داخل `src` + `open-sse` (5023 ملفًا)، وتجمع المحددات من شجرة بنية TypeScript (بحيث يُحتسب `import("…")` ولا يُحتسب `typeof import("…")` في موضع النوع)، وتحلّ مسارات `paths` في tsconfig. وهي تجد **14** دورة، لا 0. ونظرًا إلى أن 14 دورة موجودة مسبقًا لا يمكن إصلاحها في طلب بوابة، أصبحت `check:cycles` الآن **ratchet** (`--ratchet`، وسقف `metrics.cycles.value = 14` في `quality-baseline.json`، و`direction: down`) — فهي تمنع أي _تراجع_ ولا يمكن للعدد إلا أن ينخفض. يشغّل CI الأمر `npm run check:cycles:ratchet`. يجري تقليص العدد بالتزامن مع **A-01**. وتبقى `check:circular-deps` (`dpdm`) استشارية باعتبارها رأيًا ثانيًا أوسع.
- **التعقيد** — ✅ **تم** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): مسح واحد لـ ESLint، مع العد حسب ruleId بحيث تظل خطوط الأساس لـ cyclomatic+max-lines وcognitive مستقلة؛ وتبقى `check:complexity` / `check:cognitive-complexity` الفردية متاحة للتشغيل المحلي باستخدام `--update`.
- **منع الهلوسة في `/api`** — ✅ **تم** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): جرد واحد لنظام الملفات في `src/app/api`، مع استمرار openapi-routes + docs-symbols في الإبلاغ بشكل مستقل؛ وتبقى العمليات الفردية متاحة للتشغيل المحلي.
- **يُشغَّل `check:node-runtime` في 11 مهمة** — ⚠️ **عائد استثمار منخفض.** كل منها مشغّل منفصل، والفحص يستغرق أقل من ثانية؛ ويبلغ إجمالي التوفير نحو 10 ثوانٍ، مقابل فقدان حارس رخيص لكل مهمة. لا يستحق ذلك التغيير.
- **`typecheck:noimplicit:core` في CI lint** — ✅ **أُزيل من مهمة lint** (كان استشاريًا مع `continue-on-error`)؛ سطح الأنواع الحاجز هو `typecheck:core` + `check:type-coverage`. أُبقي على البرنامج النصي المحلي.

### التبديل / اتخاذ القرار (سياسة المشغّل)

- `check:openapi-security-tiers` (استشاري) — ❌ **لا يمكن تبديله بشكل نظيف.** يخرج بالرمز 0 لكنه يحذّر من أن عدة مسارات `traffic-inspector` ضمن `LOCAL_ONLY_API_PREFIXES` تفتقر إلى التعليق التوضيحي `x-loopback-only: true`. يتطلب فرض ذلك إضافة تلك التعليقات التوضيحية إلى `openapi.yaml` أولًا.
- `typecheck:noimplicit:core` (استشاري) — مغطى إلى حد كبير بآلية ratchet الحاجزة `check:type-coverage`. يمكن تبديله إلى ratchet أو حذف تمريرة `tsc` الثانية الزائدة.
- `test:vitest:ui` (أصبح الآن **حاجزًا**) — تُستبعد حالات الفشل الموجودة مسبقًا صراحةً في `vitest.config.ts` مع تعليقات تتبع `// #8618`؛ أما حالات الفشل الجديدة فتفشل المهمة.
- `check:secrets` (gitleaks، ratchet حاجز مجمّد عند 3 إيجابيات كاذبة موثقة) — أدرج الثلاثة في قائمة السماح للوصول إلى 0، أو خفّضه إلى استشاري. يتداخل مع فحص الأسرار الأصلي في GitHub + `check:public-creds`.
- `check:pr-evidence` (حاجز، يبحث باستخدام grep في نص متن طلب الدمج) — مخاطرة عالية بالإيجابيات الكاذبة؛ وسيؤدي حذفه إلى إضعاف تطبيق Hard Rule #18، لذا فهذا قرار سياسة حقيقي.
- `semgrep` (مستقل واستشاري) — يتداخل مع CodeQL في عائلات OWASP؛ صِل خطه الأساسي بآلية ratchet أو احذفه.

## الوثائق ذات الصلة

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — بوابة تطابق مجموعات المفاتيح

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, المهمة `i18n-ui-coverage`).
تقارن مجموعة المفاتيح الطرفية لكل ملف `src/i18n/messages/<locale>.json` مع `en.json` وتفشل
عند غياب أي مفتاح طرفي أو وجود مفتاح زائد، بغض النظر عن وقت إضافة المفتاح. تُحتسب العناصر
النائبة `__MISSING__:` على أنها موجودة (إذ إن محتواها من مسؤولية بوابة النسبة). وهي المكمل
المطلق للبوابتين القائمتين على الفروقات/النسبة: إذ تفرض `check-ui-keys-coverage` حدًا أدنى
قدره 80 % لكل لغة محلية (43 مفتاحًا غائبًا من أصل نحو 13,000 لا تزال تُظهر تغطية بنسبة 99.7 %)،
بينما تحكم `check-new-key-coverage` على المفاتيح التي يضيفها طلب السحب إلى `en.json` فقط. تُنشأ
دفعة اللغة المحلية من `en.json` في يوم إنشاء فرعها وتستمر في الترجمة لأيام بينما يواصل الفرع الأساسي
إضافة المفاتيح؛ ولا يضيف طلب سحب الدفعة أي مفتاح بحد ذاته، لذلك ظل الشقيقان صامتين عندما وصلت
الدفعة 1 (#13044) وهي تفتقد 43 مفتاحًا في تسع لغات محلية، والدفعة 2 (#13660) وهي تفتقد 10
مفاتيح في ثماني لغات (2026-09-15). أصلح الحالة الحمراء باستخدام
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`؛ ويعني وجود ورقة
`extra` أن المصدر قد أسقطها — إذ تسقطها `sync-ui-keys` (`--prune-extra`، وهو الإعداد الافتراضي).
أما `--warn` فيبلغ عن المشكلة دون إحداث فشل.
يشغّل `--catalog=cli` المقارنة نفسها على `bin/cli/locales` (`npm run i18n:check-keys:cli`)؛
وتوجد الخطوتان ضمن المهمة `i18n-ui-coverage`. لا يعمل الفحص المطلق إلا في وضع الإصدار: إذ يرى
طلب سحب الميزة `SKIP reason=pr-mode`، ويُجرى الإصلاح في تحديث الإصدار أو موجة ترجمة، وليس
في طلب سحب ميزة؛ أما طلب السحب الذي يغيّر كتالوجات اللغات المحلية فيُحكَم على كل منها مقابل
الأساس الذي تم الدمج عليه بدلًا من ذلك (راجع "وضعان" ضمن المهمة `i18n-ui-coverage`).

#### `check-new-key-coverage` — بوابة i18n للمفاتيح الجديدة

شقيقة `check-ui-value-drift`. تلتقط تلك البوابة قيمة إنجليزية أُعيدت **كتابتها**
بينما تُركت ترجماتها دون تغيير؛ أما هذه فتلتقط مفتاحًا إنجليزيًا أُضيف
بينما لم تحصل عليه بعض اللغات المحلية.

لا تستطيع `check-ui-keys-coverage` رؤية هذه الفئة: فهي تفرض حدًا أدنى للنسبة لكل لغة محلية،
ويمكن أن تؤدي أحد عشر مفتاحًا غائبًا من أصل نحو 13,000 ورقة إلى بقاء التغطية عند 99.9%.
ولا تستطيع نسبة لكل لغة التعبير عن أن "هذه الميزة أُطلقت دون ترجمة" — إذ يمكن أن تصل ميزة كاملة
إلى لغة محلية جديدة دون أي نص، ولا يتغير الرقم أبدًا.

الحادثة التي توثقها هذه البوابة: ترجمت المرحلة 3 من Orchestration Canvas مفاتيحها الأحد عشر
عبر اللغات المحلية البالغ عددها 42 لغة في ذلك الوقت. وبعد ساعات، رفعت دفعة اللغات الأوروبية
(#13044) عدد اللغات المحلية في المستودع إلى 51، ولم تحصل اللغات التسع الجديدة
(`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) على هذه المفاتيح مطلقًا. تستبدل
`deepMergeFallback` المفتاح الغائب باللغة الإنجليزية، لذلك كان نمط الفشل واجهة مستخدم غير
مترجمة بدلًا من واجهة فارغة — وهو فشل حقيقي وصامت بحكم التصميم.

وكما هو الحال مع شقيقتها، فهي **تراعي الفروقات**، إذ تقارن الإنجليزية عند أساس الدمج مع شجرة
العمل، لذلك تبقى الفجوات الموجودة مسبقًا ثابتة ولم تكن هناك حاجة إلى ترحيل لتفعيل البوابة.

**لا يفي مؤشر `__MISSING__:<english>` بالغرض (منذ 2026-09-17).** كان هذا المؤشر في السابق
تأجيلًا موثقًا — إذ يتراجع وقت التشغيل إلى الإنجليزية الصحيحة — إلى أن أضافت ثمانية طلبات
سحب للميزات 61 مفتاحًا في 2026-09-16 ووضعت المؤشر في جميع اللغات المحلية البالغ عددها 65 بدلًا
من الترجمة: قبلت هذه البوابة كل حالة، ولم يحظر أي شيء طلبات السحب، ثم فشلت بوابة نسبة الترجمة
الحقيقية الحاجبة على رأس الإصدار أمام الجميع (pt-BR بنسبة 3.2 % > 2.5 % + 0.5). ويُحكَم الآن
على المؤشر باعتباره ترجمة غائبة. لا يعمل ذلك إلا في وضع الإصدار منذ 2026-11-13: إذ يرى طلب سحب
الميزة `SKIP reason=pr-mode`، وفي طلب سحب الإصدار (`BASE_REF=origin/main`) تحكم البوابة على كل
مفتاح أضافته الدورة. أصلح الحالة الحمراء في تحديث الإصدار أو موجة ترجمة باستخدام
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`، أو
جميع اللغات المحلية بالتوازي باستخدام `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`، آمن عند العمل المنفصل، ويرفض البدء دون متغيرات البيئة
`OMNIROUTE_TRANSLATION_*`). ينتمي المفتاح الذي يجب أن يبقى بالإنجليزية (اسم منتج/محرك/خيار
مثبت) إلى `scripts/i18n/untranslatable-keys.json`، ولا يجوز وضعه خلف مؤشر. وتحظر `vi`
المؤشرات منعًا باتًا (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — بوابة الاختبارات المركونة

الملف الموجود في قائمة `exclude` الخاصة بـ `vitest.config.ts` هو اختبار لا يُشغّل، ويبدو
كتغطية لمن يقرأ شجرة المشروع. تراكمت 62 ملفًا خلف التعليق
`// #8618 — pre-existing failure; remove this exclusion when fixed`. أُغلقت المشكلة #8618 في
2026-08-11، بينما نمت القائمة التي كانت تتعقبها من 45 إدخالًا إلى 62، وكل إدخال جديد يرث تعليقًا
يشير إلى مشكلة ميتة. وعندما قيسَت القائمة أخيرًا ملفًا ملفًا (#13204)، **اجتاز 51 من أصل 62
الملف الشجرة الحالية دون أي تغيير في المصدر**.

تتطلب البوابة أن يقوم كل استثناء يُحل إلى ملف حقيقي بما يلي: (أ) تسمية مشكلة تتبعه، و(ب) الظهور
في `config/quality/vitest-exclusions.json` مع حالته المقيسة، بحيث تكون إضافة استثناء فرقًا يمكن
مراجعته في ملف مخصص بدلًا من أن تكون سطرًا آخر في مصفوفة تضم 60 إدخالًا. وهي لا تعيد تشغيل
الاختبارات المستثناة عمدًا — فهذا يستغرق نحو 10 دقائق وينتمي إلى مهمة دورية؛ ويسجل الجرد وقت
آخر قياس لكل اختبار.
