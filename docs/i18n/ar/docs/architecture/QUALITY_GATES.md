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

تصدر مسارا عمل CI وQuality Gates حكمًا ثابتًا: `Gate / CI` و
`Gate / Quality`. وتعدّد سياسة القبول ذات الإصدارات كل مهمة upstream باعتبارها مطلوبة أو
استشارية. يجب أن تنجح المهمة المطلوبة المنطبقة: لا يمكن للنتائج المفقودة،
أو الملغاة، أو المتخطاة، أو المعلّقة، أو غير المعروفة أن تثبت PASS. ويمكن لتصنيف صالح
يقتصر على المستندات أو الكتالوج أن يجعل مسار التعليمات البرمجية غير منطبق؛
ولا يُعد طلب السحب المسودة مرشحًا مقبولًا. ولا تُعفي تسمية `hotfix` من تقديم الأدلة.

يغطي كلا مساري العمل طلبات السحب إلى فروع main/release، وعمليات الدفع إلى
`main`، والتشغيل اليدوي، وأحداث merge-group. ويجري الدفع والتشغيل اليدوي وmerge-group
الاختيار الكامل. لا تبدأ عمليات الدفع إلى `release/**` مساري العمل هذين (2026-10-18): فقد
شغّل كل تغيير المصفوفة مسبقًا ضمن طلب السحب، ويُعد الجمع بعد الدمج من مسؤولية Release-Green
(`docs/ops/RUNNER_BOX.md` → مسار الاستضافة). وتستخدم التفرعات وmerge groups
المشغّلات المستضافة للمهام التي تختار المشغّلات المستضافة ذاتيًا بخلاف ذلك؛
ويجب التحقق من كفاية سعة الاستضافة قبل الطرح.

يحدد كل إيصال JSON قيمة SHA التي تم سحبها، وتشغيل مسار العمل، والمحاولة.
ترفض CLI عدم التطابق بين SHA الخاص بالسحب وSHA الخاص بالحدث. وتربط اختبارات مسار العمل
عضوية السياسة بقائمة `needs` الخاصة بمهمة الحكم، بحيث لا يمكن لمسار جديد أو محذوف أن
يختفي بصمت. وتغطي الإيصالات مسار عملها الخاص، لا النشر، أو التوزيع، أو الأجزاء الداخلية
لفاحص استشاري موجود. ويُعد تفعيل اسمي الفحص في قواعد الفروع تغييرًا إداريًا منفصلًا؛
فإضافة هذه المهام لا تحمي فرعًا بحد ذاتها.

### جرد الفحص الثابت

يوجد جرد npm-alias ذي الإصدارات وعضوية الفحص الثابت في
`config/quality/gate-manifest.json`. شغّل `npm run check:gate-manifest` للتحقق من
أسماء البرامج النصية والأوامر الدقيقة مقابل `package.json`؛ إذ يؤديَت الإضافات، والإزالات،
وانحراف الأوامر إلى فشل كل من الخطاف المحلي ومهام تصنيف التغيير في CI.
الاسم المستعار ليس مهمة في مسار عمل، أو مثيلًا في مصفوفة، أو حالة اختبار: يجب
ألا تُعرض هذه الأعداد على أنها قابلة للتبادل.

استخدم `npm run quality:scan -- --list` أو `npm run quality:scan:fast -- --list`
لفحص الأسماء المستعارة المحددة دون تنفيذها. يستدعي المشغّل نقطة دخول npm، ولذلك يُحافَظ
على بيئة التشغيل الخاصة به (بما في ذلك Bun عند تكوينه).
يسجل البيان الأسماء المستعارة خارج تلك الملفات التعريفية باعتبارها مستدعاة بشكل منفصل،
وتُحظر أوامر الصيانة في ملفات تعريف الفحص للقراءة فقط.

تغطي هذه الملفات التعريفية الفحص الثابت فقط. ولا تصادق على اختبارات المنتج، أو التغطية،
أو التغليف، أو الفحوص الخارجية، أو قبول الإصدار الكامل للمرشح.
يستخدم قبول مسار العمل `config/quality/admission-policy.json` و
`scripts/quality/admission-verdict.mjs` المرتبطين. وتبقى ملفات تعريف مراقب الإصدار
منفصلة؛ افحص فحوصها وإيصالاتها المنطبقة بشكل مستقل. والجرد النصي
أدناه مرجع، وليس دليلًا على أن بوابة ما قد شُغّلت فعليًا.

توجد البرامج النصية ضمن `scripts/check/` (بوابات السياسة) و`scripts/quality/` (محرك
الضبط التدريجي). ومصدر الحقيقة لـ CI هو `.github/workflows/ci.yml`.

### المسار السريع لطلبات سحب الإصدار (`quality.yml`)

يكمل `.github/workflows/quality.yml` مسار CI في طلبات السحب إلى main/release، وعمليات الدفع إلى `main`،
والتشغيل اليدوي، ومجموعات الدمج. وتستخدم طلبات السحب فحوصًا سريعة مفلترة حسب المسار.
وقد أزيلت عملية البناء المكررة المعطلة دائمًا؛ بينما تبقى فحوص البناء/التغليف/الإقلاع الفعلية في CI.

| المهمة                                           | النطاق                                                                                                                                                                                                                       | الحظر                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | طلبات سحب المستندات/التعليمات البرمجية؛ مراجع مستندات API وdocs-all                                                                                                                                                          | نعم                      |
| `Fast Quality Gates`                             | طلبات سحب التعليمات البرمجية؛ الفحوص الثابتة، والتحقق من الأنواع، والتحقق من أنواع لوحة المعلومات، واختبارات الوحدات المتأثرة                                                                                                | نعم                      |
| `Forgotten sibling tests`                        | طلبات سحب التعليمات البرمجية؛ الوحدات المتغيرة المتتبعة إلى المستهلكين الثابتين واختبارات الأشقاء المرشحة؛ ويُبلّغ عن مسارات barrel والاستيراد الديناميكي باعتبارها تشخيصات استشارية، مع استثناءات قائمة السماح المشار إليها | **استشاري**              |
| `Vitest (fast-path)`                             | طلبات سحب التعليمات البرمجية؛ مجموعة vitest السريعة                                                                                                                                                                          | نعم                      |
| `Unit Tests fast-path`                           | طلبات سحب التعليمات البرمجية؛ مجموعة اختبارات الوحدات ذات 4 أجزاء                                                                                                                                                            | نعم                      |
| `No new ESLint warnings`                         | طلبات سحب التعليمات البرمجية؛ حارس lint يراعي التثبيطات                                                                                                                                                                      | نعم، بما في ذلك التفرعات |
| `Merge integrity (changelog + generated skills)` | طلبات السحب غير المسودة؛ مزامنة سجل التغييرات والمهارات المُولّدة                                                                                                                                                            | نعم، بما في ذلك التفرعات |

#### تقرير اختبارات الأشقاء المنسية

تعيد `npm run check:forgotten-sibling-tests` استخدام محلّل الاستيراد الكامن وراء خريطة تأثير الاختبارات.
لكل وحدة إنتاج متغيّرة، يُبلغ عن سلاسل حتمية من الشكل
`changed module/symbol -> static consumer -> candidate sibling test` عندما يكون الاختبار المرشّح
غائبًا عن فروق طلب السحب. ويُحتفظ بملخّص Markdown ونتيجة JSON باعتبارهما
أثر سير عمل `forgotten-sibling-tests` لمعايرتهما قبل طرح أي حظر.

إعادة التصدير عبر Barrel والاستيرادات الديناميكية ليست سوى تشخيصات لحلّ الاستيراد؛ ولا تنشئ مطلقًا
نتيجة حظر. توجد الاستثناءات التي خضعت للمراجعة في
`config/quality/forgotten-sibling-allowlist.json`. يجب أن يسمّي كل إدخال المستهلك والاختبار
المرشّح، وأن يقدّم مبررًا محددًا، وأن يربط بمشكلة أو طلب سحب على GitHub. تؤدي الإدخالات غير الصحيحة إلى
الفشل الآمن. لا يمكن للاستثناءات منع نتيجة اختبار مرشّح محذوف أو فرق يضيف `.skip`/`.todo`؛
أما إضعاف التأكيدات وعمليات الإخفاء الأخرى فتظل من مسؤولية بوابة
`check:test-masking` المستقلة التي تفرض الحظر.

### المهمة: `lint`

تعمل على كل طلب سحب إلى `main`. تمنع الدمج عند الفشل.

| البرنامج النصي (`npm run ...`)    | يتحقق من                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | الحظر                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | أن إصدار Node.js يقع ضمن النطاق المدعوم                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                     |
| `check:cycles`                    | عمليات الاستيراد الدائرية عبر كلٍّ من `src/` و`open-sse/` (مبنية على AST، مع حلّ `paths` في tsconfig). يخرج التشغيل الأساسي بالرمز 1 عند وجود أي دورة (يفشل مغلقًا منذ #15281) ويسرد مكوّنات الاتصال القوية (SCCs). تمنع `check:cycles:ratchet` (وهو ما تشغّله CI) تجاوز العدد لسقف `metrics.cycles` في `quality-baseline.json` — وهو حاليًا 14، مع `direction: down`، لذا لا يمكنه إلا الانخفاض (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                      | نعم (تدرّج)                             |
| `check:boundary`                  | الترابط `open-sse → src`: عمليات الاستيراد الفريدة من ملف إلى ملف من المحرّك إلى التطبيق (`scripts/quality/measure-boundary.mjs`؛ وقائمة الحواف هي قائمة الأعمال المتراكمة لمعالجة تقسيم v4 الأساسي/الوحدات). التشغيل الأساسي هو تقرير إرشادي (مثل `quality:boundary`). تمنع `check:boundary:ratchet` (وهو ما تشغّله CI، والمضمّن أيضًا في حلقة التدرّج fast-gates في `quality.yml`) تجاوز العدد لسقف `metrics.boundaryOpenSseToSrc` في `quality-baseline.json` — وقد تم تحديده مبدئيًا عند القيمة المقاسة 771، مع `direction: down`؛ ولا يؤدي `--update` إلا إلى خفضه؛ وهو نسبي إلى الفرع الأساسي في طلبات السحب (`--base-ref`، انظر أدناه)                                                                                                                                                                             | نعم (تدرّج)                             |
| `check:route-validation:t06`      | وجود مخططات Zod في جميع المسارات (سياسة المستوى 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                     |
| `check:any-budget:t11`            | لا يتجاوز عدد `@ts-expect-error // any` الميزانية (catraca من المستوى 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | نعم                                     |
| `check:provider-consistency`      | لكل موفّر في `providers.ts` إدخال مطابق في `providerRegistry.ts` (والعكس صحيح، ضمن قائمة السماح)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                     |
| `check:model-lifecycle`           | تظل جداول التوجيه الثلاثة المُدارة يدويًا متسقة مع لقطة دورة الحياة المُضمّنة في المستودع (#11503): تسجّل `FITNESS_TABLE` (`taskFitness.ts`) درجةً لكل معرّف غير متقاعد يمكن لـ `REGISTRY` توجيهه؛ ويكون كل هدف في `BUILT_IN_ALIASES` موجودًا في `REGISTRY` وغير موجود في لقطة المعرّفات المتقاعدة؛ ويُعاد توجيه كل معرّف متقاعد لا يزال في `REGISTRY` أو يُدرج في `allowedRetiredInCatalog`؛ ولا يظهر أي مصدر أو هدف في `DEFAULT_DEGRADATION_MAP` على أنه متقاعد في تلك اللقطة. لا يثبت هذا أن نموذجًا ما يُخدَم حاليًا بواسطة مزوّد upstream مباشر. يعمل دون اتصال — ويقارن مع `config/quality/model-lifecycle.json`، التي تُحدّث يدويًا باستخدام `npm run quality:refresh-model-lifecycle` (يتطلب الشبكة؛ وغير موصول بـ CI). تمثّل `allowedRetiredInCatalog` آلية خفض تدريجي: لا تضف إدخالًا إلا مع وجود مشكلة تتبّع. | نعم                                     |
| `check:fetch-targets`             | كل استدعاء `fetch("/api/...")` في `src/` من جهة العميل يُحلّ إلى `route.ts` حقيقي                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                     |
| `check:deps`                      | جميع التبعيات القابلة للتثبيت باستخدام `npm install` عبر كل ملفات `package.json` في المستودع موجودة في `dependency-allowlist.json`؛ ويُبلّغ عن الحزم الجديدة غير المثبّتة بإصدار محدد أو المنتحلة لأسماء حزم أخرى                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                     |
| `audit:deps`                      | `npm audit` (الجذر + electron) — لا توجد تحذيرات أمنية عالية أو حرجة (يتداخل مع `check:vuln-ratchet` في osv؛ راجع قائمة الأعمال المتراكمة للترشيد)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                     |
| `check:lockfile`                  | سلامة `package-lock.json` — سجل https، وتجزئات السلامة، وعدم وجود تجاوزات للمضيف                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                     |
| `check:licenses`                  | قائمة السماح بتراخيص SPDX للاعتماديات الإنتاجية                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                     |
| `check:tracked-artifacts`         | عدم وجود عناصر بناء / روابط رمزية لـ `node_modules` ملتزم بها (يُشغَّل أيضًا في مرحلة pre-commit الخاصة بـ husky؛ أما pre-push فخفيف عمدًا — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                     |
| `check:ai-attribution`            | عدم وجود تذييل `Co-Authored-By` للذكاء الاصطناعي/الروبوت أو تذييل توليد بالذكاء الاصطناعي في التزامات PR أو عنوانه أو متنِه — القاعدة الصارمة رقم 16 (في حلقة البوابات السريعة `quality.yml` لطلبات PR→`release/**` — تقرأ حمولة الحدث، ولا تنفذ شيئًا خارج طلبات PR — وخطوة خاصة بطلبات PR في فحص lint ضمن `ci.yml` لطلبات PR→`main`؛ وكذلك في hook `commit-msg` الخاص بـ husky؛ يُسمح بالمؤلفين المشاركين البشريين؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | كل استثناء في Vitest يذكر مشكلة تتبّع ويظهر في `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                     |
| `check:file-size`                 | تبقى ملفات المصدر (`.ts`/`.tsx` في `src/` و`open-sse/` و`electron/` و`bin/`) ضمن `cap`، وتبقى ملفات الاختبار (`*.test.ts(x)`) ضمن `testCap`؛ ويجب ألا تتجاوز الملفات المجمدة في `file-size-baseline.json` (`frozen` / `testFrozen`) حجمها المسجل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                     |
| `check:error-helper`              | تستخدم استجابات الأخطاء في المنفّذات/المعالجات `buildErrorBody()` / `sanitizeErrorMessage()` (القاعدة الصارمة #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                     |
| `check:migration-numbering`       | ملفات SQL الخاصة بالترحيل مرقّمة بالتسلسل، من دون فجوات أو تكرارات                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                     |
| `check:public-creds`              | لا يوجد `client_id`/`client_secret` حرفي لـ OAuth أو مفاتيح الويب الخاصة بـ Firebase خارج `publicCreds.ts` (القاعدة الصارمة #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                     |
| `check:db-rules`                  | لا توجد SQL خام خارج وحدات `src/lib/db/`؛ ولا توجد عمليات استيراد شاملة من `localDb.ts` (القواعد الصارمة #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                     |
| `check:known-symbols`             | تتطابق منفّذات المزوّد واستراتيجيات التوجيه والمترجمات المسجّلة في جداول الإرسال الخاصة بها مع الملفات الموجودة على القرص — ولا توجد رموز孤 orphaned أو غير مُعلنة                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                     |
| `check:route-guard-membership`    | كل مسار ينشئ عملية فرعية مصنّف بواسطة `isLocalOnlyPath()` (القواعد الصارمة #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | نعم                                     |
| `check:test-discovery`            | يتم جمع كل ملف `*.test.ts` / `*.spec.ts` في المستودع بواسطة مشغّل اختبار واحد على الأقل (قاعدة التدرّج: لا يمكن لقائمة الملفات المعزولة في `test-discovery-baseline.json` إلا أن تتقلّص)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                     |
| `check:test-tla-order`            | لا يسجّل أي ملف `node:test` ضمن `tests/unit` اختبارًا، ثم يصل إلى `await` على المستوى الأعلى، ثم يسجّل اختبارات أخرى (#18045؛ قاعدة التدرّج: لا يمكن لقائمة السماح `test-tla-order-allowlist.json` إلا أن تتقلّص)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                     |
| `check:agent-skills-sync`         | تتطابق ملفات مهارات الوكلاء المُنشأة مع كتالوجها المصدر (من دون انحراف)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | تحمل شعارات/أصول المزوّد إدخالًا موثّقًا لمصدرها                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | يتم تحليل ملفات إعدادات JSON وتستوفي قواعد الفحص في المستودع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | تجميع TypeScript من دون أخطاء (تحذيرات استشارية فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                     |
| `typecheck:noimplicit:core`       | `noImplicitAny` الصارم — للمستقبل؛ لا تزال العديد من مواضع الاستدعاء الموجودة مسبقًا بحاجة إلى تعليقات توضيحية للأنواع                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **استشاري** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — لا تتضمن قائمة السماح المنتقاة المكوّنة من 27 ملفًا في `typecheck:core` أي ملفات TSX الخاصة بلوحة المعلومات، كما أن `next build` لا يتحقق من أنواعها أيضًا (`next.config.mjs` يعيّن `ignoreBuildErrors: true`)، ولذلك كانت حالات التراجع الناتجة عن المعرّفات اليتيمة فيها (#6625/#6909) غير مرئية لـ CI. تُجرى المقارنات مقابل خط أساس ثابت لعدد الأخطاء لكل ملف/رمز TypeScript (`config/quality/dashboard-typecheck-baseline.json`، باستخدام نمط فرض التقادم نفسه المتّبع في `check:known-symbols`) — ولا تفشل البوابة إلا بسبب الأخطاء الجديدة التي تتجاوز العدد المحدد في خط الأساس؛ خفّض العدد باستخدام `--update` عند إصلاح خطأ موجود مسبقًا.                                                                                                                   | نعم                                     |

### المهمة: `quality-gate`

تُشغّل بعد `test-coverage`. تمنع الدمج عند الفشل.

| البرنامج النصي               | ما يتم التحقق منه                                                                                                                                                        | الحظر                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `quality:collect`            | يُصدر `quality-metrics.json` (عدد تحذيرات ESLint، والتغطية من تقرير الأجزاء المدمج)                                                                                      | نعم (في مرحلة سابقة من ratchet) |
| `quality:ratchet`            | لم يتراجع أي مقياس في `quality-baseline.json` (تحذيرات ESLint ≤ خط الأساس؛ التغطية ≥ خط الأساس)                                                                          | نعم                             |
| `check:duplication`          | لا يتجاوز تكرار التعليمات البرمجية (jscpd@4) خط الأساس في `quality-baseline.json`                                                                                        | نعم                             |
| `check:complexity`           | لا يتجاوز التعقيد الدوري على مستوى الملف الحد الأقصى (قاعدة ESLint الأساسية `complexity` بالإضافة إلى `max-lines-per-function`)                                          | نعم                             |
| `check:cognitive-complexity` | آلية ضبط التعقيد المعرفي (`eslint-plugin-sonarjs`) — تمريرة ESLint منفصلة؛ يشغّل CI كليهما مدمجين كخطوة واحدة هي `check:complexity-ratchets`                             | نعم                             |
| `check:dead-code`            | لا يتراجع ضبط الصادرات/الملفات غير المستخدمة (knip) مقارنةً بخط الأساس                                                                                                   | نعم                             |
| `check:compression-budget`   | ميزانية قياس الضغط — يجب ألا تتراجع الحدود الدنيا لتوفير الرموز لكل محرك                                                                                                 | نعم                             |
| `check:type-coverage`        | لا تتراجع آلية ضبط النسبة المئوية للأنواع (`type-coverage`)؛ وهي تستوعب إلى حد كبير `typecheck:noimplicit:core`                                                          | نعم                             |
| `check:codeql-ratchet`       | لا يتراجع عدد تنبيهات CodeQL المفتوحة (يُقرأ عبر `gh api`؛ ويتم التخطي بسلاسة من دون رمز مميز) — للاطلاع على وتيرة التحديث والمشغّل اليدوي، راجع "آلية ضبط CodeQL" أدناه | نعم                             |

### المهمة: `quality-extended`

المهمة بأكملها استشارية (`continue-on-error: true`). تُشغّل آليات الضبط المستندة إلى npm
فعليًا؛ أما الماسحات الخارجية فتُثبّت عبر `gh release download` وتتخطى نفسها (بشفرة خروج 0)
عند غياب ملف ثنائي.

| البرنامج النصي           | ما يتم التحقق منه                                                                                                                                                                                               | الحظر                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:circular-deps`    | عدم وجود تبعيات دائرية (dpdm)                                                                                                                                                                                   | **استشاري**                           |
| `check:bundle-size`      | ألا يتجاوز حجم الحزمة الحد الأقصى                                                                                                                                                                               | **استشاري**                           |
| `check:secrets`          | فحص الأسرار (gitleaks) — يتم التخطي عند غياب الملف الثنائي                                                                                                                                                      | **استشاري**                           |
| `check:vuln-ratchet`     | ألا تتراجع ثغرات التبعيات (osv-scanner) — يتم التخطي عند غياب الملف الثنائي                                                                                                                                     | **استشاري**                           |
| `check:workflows`        | فحص سير العمل (actionlint + zizmor)؛ تؤدي الماسحات المفقودة/المعطلة، أو التقارير غير الصالحة، أو خط أساس الضبط المفقود إلى الفشل باعتباره غير مكتمل. تتبع النتائج الصالحة سياسة الصرامة/الاستشارة/الضبط المحددة | التنفيذ مطلوب؛ وضبط zizmor يحظر في CI |
| `check:openapi-breaking` | التغييرات المتعارضة مع عقد API العام (`openapi.yaml`) مقارنةً بالفرع الأساسي (oasdiff) — يُصدر `openapiBreaking=N`؛ ويتم التخطي عند غياب oasdiff أو تعذّر حل مواصفة الأساس                                      | **استشاري**                           |

### المهمة: `docs-sync-strict`

تُشغّل في كل PR إلى `main`. تمنع الدمج عند الفشل.

| Script                         | Validates                                                                                                                                                                       | Blocking                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | بوابة عليا تُشغّل البوابات الفرعية الست أدناه بالتتابع                                                                                                                          | Yes                        |
| ↳ `check:docs-sync`            | اتساق إصدارات CHANGELOG / OpenAPI / llm.txt                                                                                                                                     | Yes                        |
| ↳ `check:docs-counts`          | تكون الأعداد الواردة في النثر (عدد المزوّدين، وعدد عمليات الترحيل، وغير ذلك) ضمن نافذة التدرّج الخاصة بالأعداد الفعلية                                                          | Yes                        |
| ↳ `check:env-doc-sync`         | توثيق كل متغيّر بيئي في `.env.example` في جدول توثيق، والعكس صحيح                                                                                                               | Yes                        |
| ↳ `check:deprecated-versions`  | عدم وجود سلاسل إصدارات مهملة في التوثيق                                                                                                                                         | Yes                        |
| ↳ `check:doc-links`            | حلّ روابط Markdown الداخلية في التوثيق إلى ملفات فعلية (`[text]`/`(path)` form)                                                                                                 | Yes                        |
| ↳ `check:fabricated-docs`      | وجود المسارات، والمتغيّرات البيئية، وأوامر CLI، وأسماء الخطافات، ومسارات الملفات المذكورة في التوثيق ضمن قاعدة الشيفرة. بوابة صارمة عبر `--strict`؛ وفشل غير مؤثر من دون العلم. | Yes (via `--strict` in CI) |
| `check:cli-i18n`               | وجود سلاسل أوامر CLI في جميع ملفات لغات i18n                                                                                                                                    | Yes                        |
| `check:openapi-coverage`       | تغطية مواصفة OpenAPI لما لا يقل عن حد أدنى متدرّج من المسارات الفعلية                                                                                                           | Yes                        |
| `check:openapi-security-tiers` | اتساق تعليقات مستويات الأمان في `openapi.yaml` مع تصنيفات `routeGuard.ts`                                                                                                       | **Advisory**               |
| `check:openapi-routes`         | حلّ كل مسار في `openapi.yaml` إلى `route.ts` فعلي (لمكافحة الهلوسة)                                                                                                             | Yes                        |
| `check:docs-symbols`           | حلّ كل مرجع `/api/...` في `docs/**/*.md` إلى `route.ts` فعلي (لمكافحة الهلوسة)                                                                                                  | Yes                        |
| `i18n translation drift`       | المفاتيح غير المترجمة في ملفات لغات i18n — تحذير فقط                                                                                                                            | **Advisory**               |

ملفات README SVG الاثنا عشر الموجودة ضمن `docs/diagrams/` مُولّدة (`scripts/docs/gen-readme-<name>.mjs`؛ ويعيد `npm run docs:readme-diagrams` توليدها جميعًا). ولكل منها اختبار وحدة لمقارنة البايتات (`tests/unit/docs/readme-*-svg.test.ts`، والمهمة `test-unit`) يفشل عندما يكون الملف الملتزم به قديمًا، كما أن `check:docs-counts` يقرأ الأرقام الأساسية من عقد `<text>` فيها — ولهذا تُبقي خطوة التحويل إلى مخططات كل سلسلة محوّلة في الملف على هيئة `<text>` غير مرئية. يتحقق فحص الأرقام الأساسية في SVG من الملفات المدرجة في `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`، و`free-tier-budget.svg`، و`promise-pillars.svg`، و`comparison-table.svg`، و`cli-terminal.svg`، و`tier-cascade.svg`، بالإضافة إلى `public/images/tier-flow-dark.svg` و`tier-flow-light.svg`؛ كما أن ادعاءات free-forever وcatalog-entry وrecurring-pool وscoring-factors تقرأ أيضًا `promise-pillars.svg` و`free-tier-budget.svg` و`strategies-grid.svg`. يستمد `free-tier-budget.svg` أرقامه من محمّل الكتالوج الفعلي، لذا فإن تغييرًا في `FREE_MODEL_BUDGETS` أو في اسم العرض الخاص بمزوّد يؤدي إلى إظهار فشل CI إلى أن يُعاد توليد ذلك الملف.

### المهمة: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                  | Blocking     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check-ui-keys-coverage` (inline) | تبلغ تغطية مفاتيح i18n لواجهة المستخدم ≥ 65%                                                                                                                                               | Yes          |
| `check-ui-value-drift` (inline)   | لا يترك إعادة كتابة **قيمة** إنجليزية أي ترجمة قديمة خلفها                                                                                                                                 | Yes          |
| `check-new-key-coverage` (inline) | تُترجم **كل** قيمة إنجليزية جديدة في كل لغة — ويُرفض وجود علامة `__MISSING__:`                                                                                                             | Yes          |
| `check-translation-ratio`         | يجب ألا تتجاوز نسبة الترجمات الفعلية لكل لغة (المطابقة للإنجليزية / العنصر النائب / الأوراق المفقودة خارج قائمة السماح) قيمة `config/quality/i18n-translation-baseline.json` + هامش السماح | **Advisory** |

يتطلب `fetch-depth: 0` — إذ تقارن بوابة انحراف القيم `en.json` بقاعدة الدمج.

#### `check-ui-value-drift` — بوابة الترجمات القديمة

يلتقط هذا التراجع الوحيد في i18n الذي لا تستطيع البوابات الأخرى رؤيته بنيويًا: تتم إعادة كتابة قيمة إنجليزية
وتبقى الترجمات المشتقة من الإنجليزية _السابقة_ كما هي، لذلك يواصل المستخدمون غير الناطقين بالإنجليزية قراءة نص
مصاغ بثقة، لكنه أصبح خاطئًا.

حدث هذا فعليًا. أُعيدت كتابة `oauthModal.googleOAuthWarning` عند إضافة مساعد تسجيل الدخول Antigravity
(#5203)؛ إذ احتفظت **39 من أصل 43 لغة** بنص يخبر المشغّلين بـ«نسخ عنوان URL الكامل ولصقه أدناه» — وهو
تدفق لا يمكن إكماله لهذا المزوّد. ولم يُكتشف الأمر حتى #8463 لأن:

- لا يقوم `sync-ui-keys` إلا بملء المفاتيح **الغائبة**، ولا يتعامل مع المفاتيح **القديمة**؛
- يحسب `check-ui-keys-coverage` وجود المفتاح، ولذلك تُحتسب الترجمة القديمة على أنها مغطاة؛
- يتتبع `check-translation-drift` نسخ الوثائق المطابقة الموجودة في `docs/i18n/<locale>/**.md` —
  ولا يقرأ مطلقًا `src/i18n/messages/*.json`. الحظر في المهمة `docs-sync-strict` منذ إعادة المزامنة
  في 2026-09: عدّل وثيقة أساسية ← `npm run i18n:run -- --files=<doc>` (على مستوى القسم، وبتكلفة منخفضة).

**يعتمد على الفروقات، وليس على خط أساس.** يقارن `en.json` عند نقطة الدمج الأساسية بشجرة العمل؛ وبالنسبة
لكل مفتاح تغيّرت قيمته الإنجليزية، تكون أي لغة لا تزال تحتوي على ترجمة لم تُمسّ قديمة. وهذا يجمّد عمدًا
الدَّين الموجود مسبقًا — إذ لا يمكن للفارق أن يكشف أي نسخة إنجليزية قديمة استندت إليها ترجمة طويلة الأمد،
لذلك تحكم البوابة فقط على ما يلمسه التغيير الحالي. أما البديل (خط أساس يتضمن تجزئة لكل مفتاح) فسيتطلب
ملفًا مولّدًا بحجم يقارب 600 كيلوبايت، أي ثلاثة أضعاف أكبر خط أساس موجود حاليًا، وسيتسبب في تغييرات
متكررة مع كل طلب i18n.

طريقتان لاستيفاء الشرط:

1. حدّث الترجمات المتأثرة، أو
2. عيّنها إلى `__MISSING__:<new english>` — عندها يعرض وقت التشغيل الإنجليزية المصححة
   (`src/i18n/request.ts::deepMergeFallback`، #7258)، ويُدرج المفتاح في قائمة انتظار الترجمة.

إذا تغيّر **معنى** السلسلة النصية، ففضّل **إعادة تسمية المفتاح**: لا يمكن لمفتاح جديد أن يرث
ترجمة قديمة. هذا هو النمط الذي استخدمه #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

يخرج بالرمز 0 مع `SKIP reason=base-unresolved` عندما يتعذر قراءة الكتالوج الأساسي (استنساخ سطحي
من دون المرجع الأساسي)، على غرار `check-openapi-breaking`.

### المهمة: `i18n`

مصفوفة تحقق i18n كاملة (مهمة واحدة لكل لغة). المهمة بأكملها استشارية.

| Script                          | Validates              | Blocking                                                   |
| ------------------------------- | ---------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | اكتمال الترجمة لكل لغة | **استشاري** (`continue-on-error: true` على المهمة بأكملها) |

### المهمة: `pr-test-policy`

تُشغّل في طلبات السحب فقط.

| Script                 | Validates                                                                                                                                             | Blocking |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | يجب أن تتضمن طلبات السحب التي تغيّر شيفرة الإنتاج في `src/` أو `open-sse/` أو `electron/` أو `bin/` اختبارات أو تحدّثها (القاعدة الصارمة #8)          | نعم      |
| `check:test-masking`   | لا تقلّل ملفات الاختبار المتغيّرة العدد الصافي للتأكيدات ولا تضيف بدهيات `assert.ok(true)`                                                            | نعم      |
| `check:pr-evidence`    | يستشهد نص طلب السحب بأدلة الاختبار/‏VPS على التغيير (يطبّق آليًا القاعدة الصارمة #18 عبر البحث في نص طلب السحب — وهو هش، انظر قائمة الأعمال المتأخرة) | نعم      |

### المهمة: `test-vitest`

تُشغّل بعد `build`. تمنع الدمج عند الفشل.

| Suite            | Validates                                                             | Blocking                                                                                                             |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | خادم MCP (110 أداة)، وautoCombo، وذاكرة التخزين المؤقت — مشغّل vitest | نعم                                                                                                                  |
| `test:vitest:ui` | اختبارات مكوّنات واجهة المستخدم — مشغّل vitest                        | **حظر** — تُستبعد حالات الفشل الموجودة مسبقًا صراحةً في `vitest.config.ts`؛ وتؤدي حالات الفشل الجديدة إلى فشل المهمة |

### مهام سير العمل الليلية (مجدولة، استشارية)

تُشغّل وفق جدول cron (وكذلك عبر `workflow_dispatch`) ولا تُشغّل مطلقًا في طلبات السحب. جميعها استشارية.

| سير العمل              | يتحقق من                                                                                                                                                                      | الحظر       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | اختبارات الخصائص باستخدام `fast-check` مع بذرة عشوائية وعدد تشغيلات مرتفع                                                                                                     | **استشاري** |
| `nightly-resilience`   | بوابة نمو الكومة، وحقن الأعطال الفوضوي، واختبارات التحميل/التحمل باستخدام `k6`                                                                                                | **استشاري** |
| `nightly-llm-security` | حارس حقن `promptfoo` (وضع الحظر) + مجسات `garak` (يتم تخطيها دون سر موفّر)                                                                                                    | **استشاري** |
| `nightly-schemathesis` | اختبار ضبابي لعقود OpenAPI باستخدام `schemathesis` ضد OmniRoute قيد التشغيل مع استخدام `docs/openapi.yaml` — يكشف انتهاكات المواصفات / أخطاء 500 غير المعالجة (المرحلة 8 B.4) | **استشاري** |
| `nightly-mutation`     | درجة اختبار الطفرات باستخدام Stryker ضمن مسار اختبار الوحدات السريع — تكشف الطفرات الناجية عن تأكيدات ضعيفة                                                                   | **استشاري** |
| `nightly-compat`       | مصفوفة توافق محرك Node عبر نطاقات `engines.node` المدعومة                                                                                                                     | **استشاري** |

يتم تسجيل خطوط الأساس للأداء (الكومة، وTTFB، ووقت البناء) دون فرض قيود: راجع [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
