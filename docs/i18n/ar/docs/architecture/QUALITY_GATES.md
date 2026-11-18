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

## بوابة الجرد وملفات التنفيذ

### قبول المرشح

يصدر كل من سير عمل CI وQuality Gates حكمًا ثابتًا: `Gate / CI` و `Gate / Quality`. تعدد سياسة القبول الخاصة بهم كل وظيفة تمهيدية كما هو مطلوب أو استشاري. يجب أن تنجح المهمة المطلوبة القابلة للتطبيق: لا يمكن للنتائج المفقودة أو الملغاة أو التي تم تخطيها أو المعلقة أو غير المعروفة إنشاء PASS. يمكن أن يؤدي التصنيف الصالح للمستندات فقط أو الكتالوج فقط إلى جعل مسار التعليمات البرمجية غير قابل للتطبيق؛ مشروع PR ليس مرشحا مقبولا. تسمية `hotfix` لا تتنازل عن الأدلة.

يغطي كلا سير العمل PRs في فروع main/release ، ويدفع إلى `main`، والإرسال اليدوي، وأحداث دمج المجموعة. يقوم الدفع والإرسال ودمج المجموعة بتشغيل التحديد الكامل. لا تبدأ عمليات الدفع إلى `release/**` (18/10/2026): كل تغيير قام بالفعل بتشغيل المصفوفة على PR الخاص به والتركيبة المدمجة هي مهمة Release-Green (مسار `docs/ops/RUNNER_BOX.md` → المستضاف). تستخدم الشوكات ومجموعات الدمج برامج تشغيل مستضافة للوظائف التي تحدد برامج تشغيل مستضافة ذاتيًا؛ ويجب التحقق من السعة المستضافة الكافية قبل بدء التشغيل.

يقوم PR العادي بإجراء الاختيار السريع. تعمل مسارات `full-code` و `full-code-e2e` الخاصة بسياسة القبول (E2E، التكامل، package artifact، Electron smoke، Bun SQLite، عملاء النظام البيئي والبروتوكول) فقط على مسودة قائمة انتظار Mergify أو على التشغيل الكامل: `gh workflow run ci.yml --ref <branch>`.

يحدد كل إيصال JSON عملية السحب SHA وتشغيل سير العمل والمحاولة. يرفض CLI عدم تطابق checkout/event SHA. تعمل اختبارات سير العمل على ربط عضوية السياسة بقائمة `needs` الخاصة بوظيفة الحكم، لذا لا يمكن أن يختفي المسار الجديد أو المحذوف بصمت. تغطي الإيصالات سير العمل الخاص بها، وليس النشر أو النشر أو الأجزاء الداخلية للماسح الضوئي الاستشاري الموجود. يعد تنشيط كلا الاسمين الاختياريين في قواعد الفرع بمثابة تغيير إداري منفصل؛ إن إضافة هذه الوظائف لا يؤدي في حد ذاته إلى حماية الفرع.

### دمج قائمة الانتظار

ترسل تسمية `queue` PR إلى قائمة انتظار Mergify (`.mergify.yml`). يفتح Mergify مسودة PR على فرع `mergify/merge-queue/` ، ويقوم CI بتشغيل التحديد الكامل هناك، ويتم دمج PR الأصلي عند مرور `Gate / CI` و `Gate / Quality` و `Merge integrity (changelog + generated skills)`.

يقوم Mergify بكتابة ملخص قائمة الانتظار الخاصة به في وصف المسودة، ويمكن للتطبيقات الأخرى تحريره أيضًا. يأخذ حدث `pull_request` `edited` في مثل هذه المسودة مجموعة التزامن الخاصة به (`-queue-edit-<run_id>`) لذا لا يمكنه إلغاء التشغيل الحقيقي للمسودة، ويتخطى البوابة والمصفوفة. فقط `Merge integrity` لا يزال يعمل. تحمل وظيفة البوابة التي تم تخطيها اسم فحص مختلف، لأن Mergify يقرأ `Gate / CI` الذي تم تخطيه باعتباره فحصًا فاشلاً ويضع PR في قائمة الانتظار.

بعد إلغاء قائمة الانتظار، لا يؤدي الدفع دائمًا إلى إعادة وضع PR الانتظار. تعليق `@mergifyio queue` عليه.

### احتفظت بالأدلة في مخفض القبول

`scripts/quality/validate-release-acceptance.mjs` يقلل من الخطة الموردة وبياناتها؛ ولا يثبت أن الخطة تغطي مسار الإصدار الكامل. تقاريرها تحدد بوضوح `releaseAcceptance: false`، حتى عندما تكون تلك الخطة هي `VERIFIED`. لا يزال سير عمل `release-acceptance.yml` يستخدم تركيبات الظل، وليس إيصالات البناء أو الحزمة أو التمهيد أو الترويج الحقيقية.

يتطلب CLI `--evidence-root` للتحقق من الأدلة المحتفظ بها. يتم حل الملفات كـ `<evidence-root>/<artifact_id>/<member>` وتجزئتها كـ SHA-256. سجل PASS بدون دليل، أو ملف مفقود أو تم تغييره، أو مسار غير آمن أو رابط رمزي يمنع التحقق. الملفات المفقودة لا تعادل السجلات الناجحة الفارغة. تظل عمليات فحص SHA/run/attempt الحالية مستقلة: لا يمكن للبايتات المطابقة إنقاذ إيصال قديم. سلامة الملف ليست دليلاً على صحة التنفيذ أو الترويج للمنتج.

### جرد المسح الثابت

يوجد مخزون npm-alias وعضوية المسح الثابت في `config/quality/gate-manifest.json`. قم بتشغيل `npm run check:gate-manifest` للتحقق من صحة أسماء البرامج النصية والأوامر الدقيقة مقابل `package.json`؛ تؤدي عمليات الإضافة والإزالة وانجراف الأوامر إلى فشل كل من الخطاف المحلي ومهام تصنيف التغيير في CI. الاسم المستعار ليس مهمة سير عمل أو مثيل مصفوفة أو حالة اختبار: يجب ألا يتم تقديم هذه الأعداد على أنها قابلة للتبديل.

استخدم `npm run quality:scan -- --list` أو `npm run quality:scan:fast -- --list` لفحص الأسماء المستعارة المحددة دون تنفيذها. يستدعي العداء نقطة دخول npm، لذلك يتم الحفاظ على وقت التشغيل الخاص به (بما في ذلك Bun حيث تم تكوينه). يسجل البيان الأسماء المستعارة خارج ملفات التعريف هذه عند استدعائها بشكل منفصل، ويتم حظر أوامر الصيانة في ملفات تعريف الفحص للقراءة فقط.

تغطي ملفات التعريف هذه الفحص الثابت فقط. إنهم لا يصدقون على اختبارات المنتج أو التغطية أو التغليف أو الفحوصات الخارجية أو قبول الإصدار الكامل للمرشح. يستخدم قبول سير العمل `config/quality/admission-policy.json` و `scripts/quality/admission-verdict.mjs` المرتبطين. تظل ملفات تعريف مراقب الإصدار منفصلة؛ فحص الشيكات والإيصالات المعمول بها بشكل مستقل. يتم الإعلان عن الأوامر الثابتة الكاملة للمراقب في `config/quality/release-green-static-profile.json`، بما في ذلك `audit:deps` واختيار اختبار الطفرة وفحوصات الترجمة. يتحقق المُحمل من صحة أوامر npm مقابل إعلانات package.json وإعلانات CI/Quality النموذجية؛ فهو يرفض الانجراف بدلاً من تنفيذ رموز الصدفة كوسائط. لا يمكن لإخراج SKIP/INCOMPLETE للماسح الضوئي المطلوب إنشاء PASS. يسجل ملف التعريف الاستثناءات الخارجية ولا يحل محل التغطية المستضافة أو مصفوفات الاختبار أو الحزمة أو دليل النشر. يعد المخزون النثري أدناه مرجعًا، وليس دليلاً على أن البوابة كانت تعمل بالفعل.

تعمل النصوص تحت `scripts/check/` (بوابات السياسة) و `scripts/quality/` (محرك السقاطة). مصدر الحقيقة CI هو `.github/workflows/ci.yml`.

### الافراج عن المسار السريع PR (`quality.yml`)

`.github/workflows/quality.yml` يكمل CI على main/release PRs، ويدفع إلى `main`، ويرسل ويدمج المجموعات. يستخدم PRs عمليات الفحص السريع التي تمت تصفيتها بواسطة المسار. تمت إزالة البنية المكررة المعطلة نهائيًا؛ الشيكات build/package/boot الحقيقية تبقى في CI. يتم تشغيل جناح الوحدة وvitest فقط في CI (`Unit Tests (N/8)` و `Vitest`).

| وظيفة                                            | نِطَاق                                                                                                                                      | الحظر                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; مراجع مستندات API وdocs-all                                                                                                  | نعم                   |
| `Fast Quality Gates`                             | كود PRs; عمليات الفحص الثابتة، والتحقق من الكتابة، والتحقق من لوحة المعلومات، واختبارات الوحدة المتأثرة، واختبارات الأخوة المنسية (استشاري) |
| `No new ESLint warnings`                         | كود PRs; واقي الوبر المدرك للقمع                                                                                                            | نعم، بما في ذلك الشوك |
| `Merge integrity (changelog + generated skills)` | PRs غير مسودة ؛ سجل التغيير ومزامنة المهارات التي تم إنشاؤها                                                                                | نعم، بما في ذلك الشوك |

#### تقرير اختبارات الأخوة المنسية

يعمل `npm run check:forgotten-sibling-tests` كخطوة استشارية لـ `Fast Quality Gates` ويعيد استخدام محلل الاستيراد خلف خريطة تأثير الاختبار. بالنسبة لكل وحدة إنتاج تم تغييرها، فإنها تقوم بالإبلاغ عن سلاسل `changed module/symbol -> static consumer -> candidate sibling test` الحتمية عندما يكون اختبار المرشح غائبًا عن فرق طلب السحب. يتم الاحتفاظ بملخص Markdown ونتيجة JSON كأداة سير عمل `forgotten-sibling-tests` للمعايرة قبل بدء أي حظر.

تعد عمليات إعادة تصدير البراميل والواردات الديناميكية بمثابة تشخيصات للدقة فقط؛ لا يقومون أبدًا بإنشاء نتيجة حظر. الاستثناءات التي تمت مراجعتها تعيش في `config/quality/forgotten-sibling-allowlist.json`. يجب أن يذكر كل إدخال اسم اختبار المستهلك والمرشح، ويقدم سببًا منطقيًا محددًا، ويربط مشكلة GitHub أو طلب السحب. فشل إغلاق الإدخالات المشوهة. لا يمكن للاستثناءات منع اختبار مرشح محذوف أو فرق يضيف `.skip`/`.todo`؛ يظل إضعاف التأكيد والإخفاء الآخر مملوكًا لبوابة `check:test-masking` التي يتم حظرها بشكل مستقل.

### الوظيفة: `lint`

يعمل على كل PR إلى `main`. دمج الكتل عند الفشل.

| السيناريو (`npm run ...`)         | التحقق من صحة                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | الحظر                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | إصدار Node.js ضمن النطاق المدعوم                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                      |
| `check:cycles`                    | الواردات الدائرية عبر جميع `src/` + `open-sse/` (المعتمدة على AST، والتي تم حلها بواسطة tsconfig `paths` ). يخرج Bare 1 عند وجود أي دورة (تم إغلاق الفشل منذ #15281) ويسرد SCCs. يتم حظر `check:cycles:ratchet` (ما يعمله CI ) عندما يتجاوز العدد سقف `metrics.cycles` في `quality-baseline.json` — حاليًا 14، `direction: down`، لذلك يمكن أن يسقط فقط (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم (السقاطة)                            |
| `check:boundary`                  | اقتران `open-sse → src` : عمليات استيراد فريدة من ملف إلى ملف من المحرك إلى التطبيق (`scripts/quality/measure-boundary.mjs`؛ قائمة الحافة هي تراكم معالجة v4 core/module-split ). التقرير الاستشاري لـ = (مثل `quality:boundary`). `check:boundary:ratchet` (ما يتم تشغيله CI ، أيضًا في حلقة السقاطة ذات البوابات السريعة `quality.yml` ) يتم حظره عندما يتجاوز العدد سقف `metrics.boundaryOpenSseToSrc` في `quality-baseline.json` — المصنف عند القياس 771، `direction: down`؛ `--update` يخفضه فقط؛ قاعدة نسبية على PRs (`--base-ref`، انظر أدناه)                                                                                                                                                                                                                                                                                              | نعم (السقاطة)                            |
| `check:route-validation:t06`      | مخططات Zod موجودة على كافة المسارات (سياسة المستوى 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | نعم                                      |
| `check:any-budget:t11`            | عدد `@ts-expect-error // any` لا يتجاوز الميزانية (المستوى 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | نعم                                      |
| `check:provider-consistency`      | كل مزود في `providers.ts` لديه إدخال مطابق في `providerRegistry.ts` (والعكس صحيح، ضمن القائمة المسموح بها).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | نعم                                      |
| `check:model-lifecycle`           | تظل جداول التوجيه الثلاثة التي يتم صيانتها يدويًا متسقة مع لقطة دورة الحياة التي تم تسجيلها (#11503): `FITNESS_TABLE` (`taskFitness.ts`) لا يسجل أي معرف متقاعد يمكن لـ `REGISTRY` توجيهه؛ كل هدف `BUILT_IN_ALIASES` موجود في `REGISTRY` وهو غائب عن لقطة المعرف المتقاعد؛ تتم إعادة توجيه كل معرف متقاعد لا يزال في `REGISTRY` أو إدراجه في `allowedRetiredInCatalog`؛ ولا يظهر أي مصدر أو هدف `DEFAULT_DEGRADATION_MAP` متقاعدًا في تلك اللقطة. هذا لا يثبت أن النموذج يتم تقديمه حاليًا من خلال البث المباشر. تتم مقارنة — غير المتصل بالإنترنت مع `config/quality/model-lifecycle.json`، ويتم تحديثه يدويًا باستخدام `npm run quality:refresh-model-lifecycle` (شبكة؛ غير موصلة بـ CI). `allowedRetiredInCatalog` عبارة عن سقاطة محترق: قم بإضافة إدخال فقط مع وجود مشكلة في التتبع.                                                           | نعم                                      |
| `check:fetch-targets`             | كل `fetch("/api/...")` في `src/` من جانب العميل يتحول إلى `route.ts` حقيقي                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                      |
| `check:deps`                      | جميع `npm install` -able deps عبر كل `package.json` في الريبو موجودة في `dependency-allowlist.json`؛ تم وضع علامة على الحزم الجديدة غير المثبتة أو المائلة                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                      |
| `audit:deps`                      | تدقيق npm لجميع ملفات القفل الخمسة المستقلة (root، Electron، OpenCode plugins، v1/v2 وprovider). كتلة النصائح الهامة؛ تظل التحذيرات العالية تحذيرات مرئية. عمليات تدقيق Missing/failed هي INCOMPLETE وblock؛ يتم الاحتفاظ بتجزئة القفل والتقارير لكل نطاق.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                      |
| `check:lockfile`                  | تسجيل `package-lock.json` Integrity — https، تجزئة التكامل، لا يوجد تجاوزات للمضيف                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                      |
| `check:licenses`                  | القائمة المسموح بها لترخيص SPDX لتبعيات الإنتاج                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | نعم                                      |
| `check:tracked-artifacts`         | لا توجد عناصر بناء / روابط `node_modules` الرمزية المخصصة (يتم تشغيلها أيضًا في الالتزام المسبق الهاسكي؛ الدفع المسبق خفيف عمدًا — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | نعم                                      |
| `check:ai-attribution`            | لا يوجد مقطع دعائي AI/bot `Co-Authored-By` أو تذييل جيل الذكاء الاصطناعي في عمليات PR أو العنوان أو النص — Hard Rule #16 (في حلقة `quality.yml` fast-gates لـ PR→ `release/**` — يقرأ حمولة الحدث، no-op off PRs — وخطوة العلاقات العامة فقط في `ci.yml` lint لـ PR→ `main`؛ وأيضًا خطاف `commit-msg` الهاسكي؛ يُسمح للمؤلفين المشاركين من البشر؛ #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | يشير كل استبعاد Vitest إلى مشكلة تتبع ويظهر في `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | نعم                                      |
| `check:file-size`                 | ملفات المصدر (`.ts`/`.tsx` في `src/`، `open-sse/`، `electron/`، `bin/`) تبقى ضمن `cap` وملفات الاختبار (`*.test.ts(x)`) داخل `testCap`؛ يجب ألا تتجاوز الملفات المجمدة في `file-size-baseline.json` (`frozen` / `testFrozen`) حجمها المسجل                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | نعم                                      |
| `check:error-helper`              | استجابات الخطأ في executors/handlers تستخدم `buildErrorBody()` / `sanitizeErrorMessage()` (القاعدة الصعبة #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | نعم                                      |
| `check:migration-numbering`       | يتم ترقيم ملفات SQL للترحيل بشكل تسلسلي، ولا توجد فجوات أو تكرارات                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | نعم                                      |
| `check:public-creds`              | لا توجد مفاتيح OAuth `client_id`/`client_secret` أو Firebase Web حرفية خارج `publicCreds.ts` (القاعدة الصلبة #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | نعم                                      |
| `check:db-rules`                  | لا يوجد SQL خام خارج وحدات `src/lib/db/` ؛ لا توجد واردات برميل من `localDb.ts` (القواعد الصارمة #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | نعم                                      |
| `check:known-symbols`             | يتطابق منفذو الموفرين واستراتيجيات التوجيه والمترجمون المسجلون في جداول الإرسال الخاصة بهم مع الملفات الموجودة على القرص — ولا توجد رموز معزولة أو غير معلنة                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | نعم                                      |
| `check:route-guard-membership`    | يتم تصنيف كل مسار يولد عملية فرعية حسب `isLocalOnlyPath()` (القواعد الصارمة #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | نعم                                      |
| `check:test-discovery`            | يتم جمع كل ملف `*.test.ts` / `*.spec.ts` في الريبو بواسطة عداء اختبار واحد على الأقل (السقاطة: يمكن تقليص القائمة اليتيمة في `test-discovery-baseline.json` فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | نعم                                      |
| `check:test-tla-order`            | لا يوجد ملف `node:test` ضمن `tests/unit` يسجل اختبارًا، ويصل إلى `await` عالي المستوى، ثم يسجل المزيد (#18045; اسئلة: `test-tla-order-allowlist.json` يمكن أن يتقلص فقط)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | نعم                                      |
| `check:agent-skills-sync`         | تتوافق عناصر مهارات العميل التي تم إنشاؤها مع كتالوج المصدر الخاص بها (بدون انحراف). وضع الإصدار يتحقق من كل مهارة؛ تعمل ميزة PR (وضع `pr` ) على التحقق فقط من المهارات التي يقوم بتحرير النص الذي تم إنشاؤه — راجع [الملفات التي تم إنشاؤها وخطوط الأساس المشتقة](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
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

| البرنامج النصي               | التحقق من صحة                                                                                                                                               | الحظر                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | يصدر `quality-metrics.json` (عدد تحذيرات ESLint ، تغطية من تقرير الجزء المدمج)                                                                              | نعم (المنبع من السقاطة) |
| `quality:ratchet`            | لم يتراجع كل مقياس في `quality-baseline.json` (تحذيرات ESLint خط الأساس ≤ ؛ خط الأساس ≥ التغطية)                                                            | نعم                     |
| `check:duplication`          | لا يتجاوز تكرار الكود (jscpd@4) خط الأساس في `quality-baseline.json`                                                                                        | نعم                     |
| `check:complexity`           | لا يتجاوز التعقيد الدوري على مستوى الملف الحد الأقصى (core ESLint `complexity` + `max-lines-per-function`)                                                  | نعم                     |
| `check:cognitive-complexity` | سقاطة التعقيد المعرفي (`eslint-plugin-sonarjs`) — ممر ESLint منفصل؛ يعمل CI على حد سواء مدمجين كخطوة `check:complexity-ratchets` الفردية                    | نعم                     |
| `check:dead-code`            | لا تتراجع الصادرات/الملفات غير المستخدمة (knip) عن خط الأساس                                                                                                | نعم                     |
| `check:compression-budget`   | يجب ألا تتراجع حدود توفير الرمز المميز للميزانية المعيارية للضغط — لكل محرك                                                                                 | نعم                     |
| `check:type-coverage`        | السقاطة المكتوبة بنسبة مئوية (`type-coverage`) لا تتراجع؛ يتضمن إلى حد كبير `typecheck:noimplicit:core`                                                     | نعم                     |
| `check:codeql-ratchet`       | لا يتراجع عدد تنبيهات CodeQL المفتوحة (يقرأ عبر `gh api`؛ تخطي رشيق بدون رمز مميز) إيقاع تحديث — والمشغل اليدوي: راجع "CodeQL اسئلة" أدناه                  | نعم                     |
| `check:type-scale-ratchet`   | مقياس نوع المجموعة: الأحجام أقل من 12 بكسل و `font-bold` في `src/` تنخفض فقط (`typeScaleSubFloorSizes`, `typeScaleFontBold`); أيضًا في خطاف الالتزام المسبق | نعم                     |

### الوظيفة: `quality-extended`

وظيفة مختلطة، بدون `continue-on-error` على مستوى الوظيفة: الخطوة التي تتجاوز `--ratchet` تفشل الوظيفة على انحدار مُقاس مقابل `quality-baseline.json`. تعتبر `check:circular-deps` وخطوة تثبيت الماسح الضوئي فقط بمثابة خطوات استشارية ( `continue-on-error: true` على مستوى الخطوة). يتم تثبيت الماسحات الضوئية الخارجية عبر `gh release download`؛ يقوم `check:secrets` بالتخطي الذاتي (المخرج 0) عند غياب gitleaks، بينما يفشل `check:vuln-ratchet` و `check:workflows` و `check:openapi-breaking` في الإغلاق عندما يكون قياسهم مفقودًا.

| البرنامج النصي           | التحقق من صحة                                                                                                                                                                                          | الحظر                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:circular-deps`    | لا توجد تبعيات دائرية (dpdm)                                                                                                                                                                           | **استشارية**                            |
| `check:bundle-size`      | حجم الحزمة لا يتجاوز الحد الأقصى؛ حجم غير قابل للقياس يفشل أيضًا                                                                                                                                       | **الحظر باستخدام --ratchet**            |
| `check:secrets`          | يتم تخطي المسح السري (gitleaks) — في حالة غياب الثنائي                                                                                                                                                 | **الحظر باستخدام --ratchet**            |
| `check:vuln-ratchet`     | لا تتراجع ثغرات التبعية (osv-scanner) عن فشل — `--ratchet` كـ INCOMPLETE (مخرج 2) إذا لم يتم قياسها                                                                                                    | **الحظر باستخدام --ratchet**            |
| `check:workflows`        | لينت سير العمل (actionlint + zizmor)؛ تفشل الماسحات الضوئية missing/broken أو التقارير غير الصالحة أو خط الأساس المفقود في حالة INCOMPLETE. تتبع النتائج الصالحة سياسة strict/advisory/ratchet المحددة | التنفيذ مطلوب؛ zizmor حجب السقاطة في CI |
| `check:openapi-breaking` | عقد API العام ضد ارتكابات الأحداث المثبتة (قاعدة دمج PR ، الدفع قبل، قاعدة مجموعة الدمج؛ scheduled/manual checkout أول أصل)؛ فشل القياس المطلوب مغلقة                                                  | **الحظر باستخدام --ratchet**            |

### الوظيفة: `docs-sync-strict`

يعمل على كل PR إلى `main`. دمج الكتل عند الفشل.

| البرنامج النصي                 | التحقق من صحة                                                                                                                                                       | الحظر                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | البوابة الوصفية التي تدير البوابات الفرعية الستة أدناه بالتسلسل                                                                                                     | نعم                        |
| ↳ `check:docs-sync`            | تناسق إصدار CHANGELOG / OpenAPI ؛ وضع التحرير أيضًا 66 مرايا `llm.txt` وأقسام CHANGELOG المترجمة (وضع PR : المرايا توافق)                                           | نعم                        |
| ↳ `check:docs-counts`          | الأعداد النثرية (عدد مقدمي الخدمة، عدد الهجرة، وما إلى ذلك). وضعان: `pr` في الميزة PRs و `release` في مكان آخر — راجع "القيم المشتقة" أدناه                         | نعم                        |
| ↳ `check:env-doc-sync`         | يتم توثيق كل env var في `.env.example` في جدول المستندات، والعكس صحيح                                                                                               | نعم                        |
| ↳ `check:deprecated-versions`  | لا توجد سلاسل إصدار مهملة في المستندات                                                                                                                              | نعم                        |
| ↳ `check:doc-links`            | روابط تخفيض السعر الداخلية في المستندات تتحول إلى ملفات حقيقية (نموذج `[text]`/`(path)` )                                                                           | نعم                        |
| ↳ `check:fabricated-docs`      | توجد المسارات وenv vars وأوامر CLI وأسماء الخطافات ومسارات الملفات المذكورة في المستندات في قاعدة التعليمات البرمجية. بوابة صلبة عبر `--strict`؛ فشل ناعم بدون علم. | نعم (عبر `--strict` في CI) |
| `check:cli-i18n`               | مفاتيح CLI `t()` موجودة في `bin/cli/locales/en.json` (كلا الوضعين)؛ تكافؤ pt-BR / zh-CN / zh-TW مع `en.json` في وضع التحرير فقط                                     | نعم                        |
| `check:openapi-coverage`       | تغطي مواصفات OpenAPI على الأقل أرضية متصاعدة من الطرق الحقيقية                                                                                                      | نعم                        |
| `check:openapi-security-tiers` | تتوافق التعليقات التوضيحية لطبقة الأمان في `openapi.yaml` مع تصنيفات `routeGuard.ts`                                                                                | **استشارية**               |
| `check:openapi-routes`         | كل مسار في `openapi.yaml` يتحول إلى `route.ts` حقيقي (مضاد للهلوسة)                                                                                                 | نعم                        |
| `check:docs-symbols`           | كل مرجع `/api/...` في `docs/**/*.md` يتحول إلى `route.ts` حقيقي (مضاد للهلوسة)                                                                                      | نعم                        |
| `i18n translation drift`       | مرايا `docs/i18n/**` مقابل `.i18n-state.json` — استشارية بشأن PRs (يتم تحديث المرايا بواسطة موجة الترجمة)، صارمة عند الدفع والليل                                   | **استشارية** على PRs       |

#### مرايا الترجمة هي ملفات مشتقة (وضع PR مقابل وضع الإصدار)

ميزة PR تقوم بتحرير المصادر الإنجليزية فقط. تتم إعادة كتابة مرايا `docs/i18n/<locale>/**` (بما في ذلك نسخ `llm.txt` الـ 66 وملفات `CHANGELOG.md` المترجمة) و `.i18n-state.json` في خطوة واحدة بواسطة موجة الترجمة (فروع `docs/i18n-*` / `chore/i18n-*` ، `i18n-mirror-refresh.yml` المجدولة) ومن خلال الإصدار (`npm run release:sync-changelog-i18n`). وبالتالي، تعمل البوابات المرآة في وضعين، يتم حلهما بواسطة `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`، ثم `OMNIROUTE_GATE_MODE`، ثم حدث Actions؛ والتشغيل المحلي هو `release`):

- يعمل وضع تحرير `check:docs-sync` — على تشغيل كل فحص. يحتفظ وضع PR بإصدار package.json/OpenAPI ، وعناوين الجذر CHANGELOG وحارس المستندات التي تم استبدالها، ويطبع `SKIP reason=pr-mode` لنسخ مرآة `llm.txt` وأقسام CHANGELOG المترجمة — ما لم يكتب PR مرايا: يقوم فرع رئيسي تم الإعلان عنه ككاتب لعائلة `docs/i18n/**` في `config/quality/derived-paths/*.json` بإجراء كلا الفحصين بدقة، وعندما يتم حل قاعدة الاختلاف، فإن التغيير الذي يقوم بتحريره diff `docs/i18n/<locale>/llm.txt` أو `CHANGELOG.md` يقوم بتشغيل هذا الفحص بدقة. لا يتم حل قاعدة الاختلاف في فحص depth-1 (مهمة `docs-sync-strict` )، لذلك يقوم وضع PR أيضًا بإجراء فحص واحد لا يحتاج إلى قاعدة: يجب أن تكون كل مرآة `llm.txt` موجودة، وتحتفظ بفاصل `---` الخاص بها وتحمل إما الجسم الجذر أو الجسم الذي تشترك فيه معظم المرايا. القاعدة التي تحركت تترك جميع المرايا قديمة بشكل متساوٍ وتمر؛ فشل التعديل اليدوي على مرآة واحدة. لا تحتوي ملفات `CHANGELOG.md` المترجمة على مثل هذا الفحص في عملية الدفع depth-1 PR.
- يعمل خطاف الالتزام المسبق على تشغيل `check-docs-sync.mjs --mode=pr`: يتم الحكم على الالتزام بناءً على ما يفعله. بدون العلم، يكون التشغيل المحلي هو وضع الإصدار، وسيعمل PR المدمج الذي يحرر الجذر `llm.txt` على منع كل التزام لاحق على تلك القاعدة حتى يتم تشغيل الموجة. تنطبق نفس القاعدة على أي بوابة مدركة للوضع يتم تشغيلها بواسطة خطاف Husky: يمر الخطاف `--mode=pr`، ويظل الحكم الصارم مع تشغيل وضع الإصدار (يدفع الإصدار PR إلى `main`، وهو تشغيل محلي عادي).
- اختبارات وحدة المحتوى المرآة (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) يؤكد وضع إصدار — على كل لغة. يؤكد وضع PR فقط على المرايا الحالية مع المصدر الإنجليزي وفقًا لـ `.i18n-state.json` (تجزئة الملف بالكامل، أو تجزئة القسم المسجل لقسم دبابيس الاختبار) ويتخطى المرايا القديمة لسبب ما. يتم تشغيل عمليات التحقق من مصدر `target_hash` لكل لغة في كلا الوضعين. الحداثة لكل قسم `## ` ، وحدة تجزئات `run-translation.mjs` ؛ قسم طويل (مخزون بوابة هذا الملف هو حوالي نصفه) يعني أن أي تعديل فيه يترك تلك المرايا قديمة، وتتخطى تأكيدات وضع العلاقات العامة الخاصة بها حتى الموجة التالية. المرساة التي لم يعد المصدر الإنجليزي يحتوي عليها تعود إلى مقارنة الملف بأكمله.
- `i18n translation drift` — استشارية بشأن PRs، صارمة بشأن الدفع، ليلاً وقطع الإصدار، لذلك لا يمكن شحن المرآة التي لا معنى لها في الإصدار.

`scripts/i18n/sync-llm-mirrors.mjs` (الذي تم تصديره أيضًا كـ `syncLlmMirrors()`، مع `--dry-run`) يعيد كتابة مرايا `llm.txt` ؛ يقوم تحديث الإصدار وموجة الترجمة و `i18n-mirror-refresh.yml` المجدولة بتشغيله (يكتشف التحديث مرايا `llm.txt` التي لا معنى لها مع التشغيل الجاف، نظرًا لأن تقرير الانجراف لا يسردها، ويقوم بمزامنتها قبل `check:docs-all`).

يتم إنشاء اثني عشر README SVGs تحت `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` يجدد كل منهم). يحتوي كل منها على اختبار وحدة مقارنة البايت (`tests/unit/docs/readme-*-svg.test.ts`، job `test-unit`) الذي يفشل عندما يكون الملف الملتزم قديمًا في وضع الإصدار؛ في PR، يحكم `check:generated-artifacts` على SVG ويحرر PR ويترك انحراف القاعدة لتحديث الإصدار (راجع [الملفات التي تم إنشاؤها وخطوط الأساس المشتقة](#generated-files-and-derived-baselines-written-at-release) ) يقرأ — و `check:docs-counts` الأرقام المتعارف عليها من عقد `<text>` الخاصة بها — وهذا هو السبب في أن الخطوة التفصيلية تحافظ على كل سلسلة محددة في الملف على أنها `<text>` غير مرئية. يقرأ فحص الأرقام الأساسية SVG الملفات المدرجة في `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg` و `free-tier-budget.svg` و `promise-pillars.svg` و `comparison-table.svg` و `cli-terminal.svg` و `tier-cascade.svg` بالإضافة إلى `public/images/tier-flow-dark.svg` و `tier-flow-light.svg`؛ كما تقرأ المطالبات المجانية للأبد وإدخال الكتالوج والتجميع المتكرر وعوامل التسجيل `promise-pillars.svg` و `free-tier-budget.svg` و `strategies-grid.svg`. الأعداد التي ترسمها هذه المولدات (إجمالي الموفر، وأدوات MCP ، واستراتيجيات التوجيه، وموفري الخدمات المجانية إلى الأبد، ...) تأتي من لقطة الحقائق `docs/reference/derived-facts.json` حتى `scripts/docs/readmeFacts.mjs`، وليس من القيم الحرفية، لذا فإن إعادة إنشاء رسم تخطيطي على أي فرع يؤدي إلى إعادة إنتاج الملف الملتزم. `free-tier-budget.svg` يرسم صفوفه من نفس اللقطة (`code.freeTierBudget`، يلخص الكتالوج سجلات مسبار الحقائق)، وبالتالي فإن التغيير إلى `FREE_MODEL_BUDGETS` يصل إلى البطاقة في التحديث التالي بدلاً من تحويل CI اللون الأحمر.

### القيم المشتقة: أوضاع بوابة `pr` و `release`

الميزة PR لا تكتب أبدًا قيمة تعتمد على حالة قاعدتها: الموفر، والترحيل، وأداة MCP وعدد الاستراتيجيات، وأرقام README SVG ، ولقطات الحقائق. تقوم خطوة واحدة بإعادة حساب كل منهم، `npm run release:refresh-derived`، الذي يتم تشغيله بواسطة الإصدار ومن خلال التحديث المشتق ليلاً PR. لذا** بين الإصدارات، تكون القاعدة خلف الكود المباشر حسب التصميم** ، وستكون البوابة أو الاختبار الذي يقارن الشجرة بالرمز المباشر باللون الأحمر في كل PR بعد أن يقوم الأخ بإضافة موفر. وبالتالي فإن البوابات التي تحكم على القيم المشتقة تعمل في أحد الوضعين، ويتم حلها بواسطة `scripts/check/lib/gateMode.mjs` (المباراة الأولى تفوز):

1. `--mode=pr|release` في سطر الأوامر؛
2. متغير البيئة `OMNIROUTE_GATE_MODE` (`pr` أو `release`) ؛
3. تلقائي، من حدث GitHub Actions: `pull_request` الذي ليس رأسه `release/v*` أو `merge_group` أو يُدفع إلى `omni-queue/**` → `pr`؛ كل شيء آخر (الدفع، الجدول الزمني، الإرسال، الإصدار PR `release/v* → main`، أي تشغيل محلي) → `release`.

ما يفشل `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) في كل وضع:

| وضع       | فشل                                                                                                                                                                                                                                                                                                                                                             | يحتاج إلى الحقائق الحية |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `release` | كل فحص، مساواة صارمة مع الحقائق التي تم جمعها من الشجرة (السلوك الذي اتبعته البوابة دائمًا): العدد القديم، الإصدار، أرضية التغطية أو رقم SVG هو انحراف STRICT                                                                                                                                                                                                   | نعم                     |
| `pr`      | فقط ما فعله التغيير، اختلف مع قاعدة PR مع نفس مستخرجي المطالبات: (1) قيمة مُدارة لم تكن موجودة في القاعدة لهذا الشيك والملف (" قام PR بتحرير رقم مُدار — استعادة السطر إلى النص الأساسي")؛ (٢) دعوى مطلوبة حملت القاعدة وفقد الرأس. تعمل ثوابت المحتوى التي لا تحتاج إلى حقائق كما هو الحال في وضع الإصدار؛ يتم إدراج عمليات التحقق الخاصة بالتحرير فقط وتخطيها | لا                      |

تحمل ملفات تعليمات الوكيل** لا** العدد المشتق على الإطلاق: `AGENTS.md` و `llm.txt` (ونسخها `docs/i18n/*/llm.txt` ) و bs `AGENTS.md` fork و `open-sse/services/AGENTS.md` `src/shared/constants/agentSkills.ts` و `skills/README.md` وكل `skills/*/SKILL.md` يشير إلى المصدر (على سبيل المثال `ROUTING_STRATEGY_VALUES` في `src/shared/constants/routingStrategies.ts`) وإلى `npm run facts` بدلاً من ذلك. يفشل "لا توجد أعداد مشتقة (ملف تعليمات الوكيل...)" في العد هناك (الموفرون، وعمليات الترحيل، وأدوات ونطاقات MCP ، واستراتيجيات التوجيه، وعوامل التسجيل، وحزم الأوضاع) في كلا الوضعين، لذلك لا يتعين على تحديث الإصدار أبدًا إعادة كتابة ملف تعليمات.

في وضع `pr` قد تقوم فروع الكاتب بتحرير القيم المُدارة: `chore/derived-*` (التحديث الليلي PR) و `release/v*` وموجات الترجمة `docs/i18n-*` و `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). لا يتم الحكم على دفعات قائمة الانتظار (`merge_group`، Mergify Drafts، `omni-queue/**`) مرة أخرى: فهي تجمع PRs البوابة التي تم الحكم عليها بالفعل واحدة تلو الأخرى.

رموز الخروج: `0` clean · `1` STRICT الانجراف (أو الانجراف الناعم مع `--strict`) أو انتهاك القيمة المُدارة · البنية التحتية `2` — تعذر جمع حقائق الكود (فشل مسبار tsx أو انتهت مهلته؛ المهلة هي `OMNIROUTE_FACTS_TIMEOUT_MS`، الافتراضي 600000 مللي ثانية) أو، في CI، لا يمكن حل قاعدة PR diff. إن المخرج 2 لا يمثل أبدًا اختلافًا في الوثائق: أعد تشغيل المهمة أو أصلح البيئة.

حيث يعمل كل وضع:

| أين                                                                                             | وضع                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ميزة PR — `ci.yml` job `docs-sync-strict` و `quality.yml` step "دقة المستندات"                  | `pr` (تلقائي)؛ تمر المهمة بالقاعدة كـ `BASE_SHA` وتتحقق من خلال `fetch-depth: 2`                                                                                                                            |
| `merge_group`، مرشحو `omni-queue/**` ، قائمة البوابات الكاملة لقطار الدمج                       | `pr`                                                                                                                                                                                                        |
| قم بتحرير PR (`release/v* → main`) والدفعات وعمليات التشغيل المجدولة واليدوية                   | `release`                                                                                                                                                                                                   |
| الإصدار-الأخضر (`scripts/quality/validate-release-green.mjs`)                                   | يتم تشغيل عناصر HARD باستخدام `OMNIROUTE_GATE_MODE=pr` ("هل انكسرت القاعدة؟")؛ يقوم عنصر DRIFT `derived-refresh` بتشغيل `npm run release:refresh-derived -- --check` (عرض صارم، ولا يفتح أبدًا قاعدة حمراء) |
| الإصدار (مرحلتا `/generate-release` 0a و1؛ أسلاك المهارات عبارة عن تغيير منفصل معتمد من المالك) | `npm run release:refresh-derived` يكتب الملفات المشتقة؛ يتم تشغيل الشيكات الخاصة بإصدار PR في وضع `release`                                                                                                 |
| `nightly-derived-refresh.yml` (يوميًا، أعلى `release/vX.Y.Z`، تم تخطيه تحت تجميد الإصدار)       | `npm run release:refresh-derived -- --profile=nightly`; على فرق فإنه يبقي ONE PR مفتوحًا من `chore/derived-refresh`؛ لا يدمج أبدا                                                                           |

الأوامر وراء ذلك:

- `npm run facts` بطباعة كل رقم مشتق كـ JSON (`scripts/release/facts.mjs`). يطبع `--key=code.mcpTools` قيمة واحدة، ويقرأ `--snapshot` اللقطة المخصصة بدلاً من الشجرة الحية. خروج 2 عندما لا يمكن جمع الحقائق.
- يقوم `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) بإعادة حساب الملفات المشتقة في مسار واحد، بهذا الترتيب (معرفات الخطوة لـ `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`)، `facts` (اللقطة)، `numbers` (تم تطبيق خطة إعادة كتابة بوابة العد على المستندات، ثم نقلها إلى مرايا `docs/i18n/` الخاصة بها)، `readme-diagrams`، `skills` (تم إنشاء `SKILL.md`) ، `e2e-timings` (تم تخطيه حتى يتم شحن الشجرة `syncE2eTimings`)، `ui-keys` (برقوق) تم إسقاط المفاتيح `en.json` ، ومع إعادة كتابة القيم الإنجليزية لقوائم الانتظار `--rewritten-since=<ref>` — الافتراضية `origin/main` — منذ الإصدار الأخير)، `llm-mirrors` و `verify-generated` (بعد الكتابة، يجب أن يمر `check:generated-artifacts` و `check:agent-skills-sync` في وضع الإصدار؛ تم تخطيهما في `--check` وعندما يتركهما `--only` ؛ الفشل هو المخرج 2). خطوة `changelog` هي الاشتراك (`--with-changelog`، ملف تعريف الإصدار فقط). `--profile=nightly` لا يمس أبدًا مطالبة الإصدار. مع `-- --check` لا يكتب شيئًا ويخرج 1 عندما يتغير أي ملف أو عندما تحتاج القيمة المُدارة إلى تعديل يدوي (سرد كليهما)؛ خروج 2 على فشل البنية التحتية. `--json` يطبع النتيجة كـ JSON.
- `docs/reference/derived-facts.json` هي لقطة للحقائق التي تم استخدامها في آخر تحديث. فقط التحديث يكتب ذلك. تقرأه مولدات README SVG ، وتقارن اختبارات وحدة PR-time المستندات الملتزم بها والملفات التي تم إنشاؤها معها — أبدًا مع الكود المباشر. المقارنة المباشرة الوحيدة للمجموعة هي "تحديث الإصدار يغلق الدورة" في `tests/unit/check-docs-counts-sync.test.ts`: مع الحقائق المباشرة، لا تترك خطة إعادة كتابة التحديث المطبقة في الذاكرة أي انحراف STRICT ولا يتم الإبلاغ عنه، وإعادة التخطيط لا تغير شيئًا.

لإعادة الإنتاج محليًا (التشغيل المحلي هو `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

بدون قاعدة قابلة للحل (لا يوجد `BASE_SHA`/`BASE_REF`، لا يوجد `origin/release/v<version>` محلي) يطبع تشغيل `pr` المحلي تحذيرًا ويتخطى الفرق بدلاً من الفشل.

### الوظيفة: `i18n-ui-coverage`

| البرنامج النصي                   | التحقق من صحة                                                                                                                                                                                  | الحظر                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `check-ui-keys-coverage` (مضمنة) | تغطية مفتاح UI i18n هي ≥ 65%                                                                                                                                                                   | نعم (كلا الوضعين)     |
| `check:ui-icu`                   | يتم تجميع كل رسالة من كل كتالوج UI باستخدام `IntlMessageFormat`                                                                                                                                | نعم (كلا الوضعين)     |
| `check-ui-value-drift` (مضمنة)   | الإنجليزية المعاد كتابتها** قيمة** لا يترك أي ترجمة قديمة وراءه                                                                                                                                | نعم (وضع التحرير فقط) |
| `check-new-key-coverage` (مضمنة) | أ** جديد** تتم ترجمة مفتاح اللغة الإنجليزية في كل لغة — ويتم رفض علامة `__MISSING__:`                                                                                                          | نعم (وضع التحرير فقط) |
| `check-key-completeness` (مضمنة) | كل كتالوج UI (ومع `--catalog=cli`، كل كتالوج CLI ) يحمل بالضبط مجموعة مفاتيح `en.json` الخاصة به؛ في وضع `pr` ، يتم تغيير كل كتالوج PR ضد نفسه عند قاعدة الدمج                                 | نعم (كلا الوضعين)     |
| `check-translation-ratio`        | يجب ألا تتجاوز نسبة الترجمة الحقيقية لكل لغة (متطابقة مع اللغة الإنجليزية / العنصر النائب / الأوراق المفقودة خارج القائمة المسموح بها) `config/quality/i18n-translation-baseline.json` + slack | نعم (وضع التحرير فقط) |

يحتاج `fetch-depth: 0` — إلى أن تختلف بوابة انجراف القيمة `en.json` عن قاعدة الدمج.

**وضعين (منذ 2026-11-13).** تضيف ميزة PR أو تعيد كتابة المفاتيح في `en.json` (و `bin/cli/locales/en.json`) ولا تلمس أي لغة أخرى؛ `check:pr-derived-paths` (job `pr-test-policy`, Family `config/quality/derived-paths/translation.json`) يفشل في ميزة PR التي تفعل ذلك. يتم إكمال اللغات الأخرى مرة واحدة لكل إصدار بواسطة `release:refresh-derived`، الذي يستدعي `syncUiKeys()` في `scripts/i18n/sync-ui-keys.mjs` (إضافة المفاتيح المفقودة، تقليم المفاتيح المسقطة، وضع علامة على ترجمات اللغة الإنجليزية المعاد كتابتها باستخدام `rewrittenSinceRef`، ترجمة)، أو عن طريق موجة الترجمة. تقرأ البوابات الوضع من `scripts/check/lib/gateMode.mjs`: في وضع `pr` (ميزة PRs، `merge_group`، `omni-queue/**`) بوابات وضع التحرير فوق print `SKIP reason=pr-mode` والخروج 0؛ في وضع `release` (الإصدار PR، يدفع إلى `main`، `workflow_dispatch`، عمليات التشغيل المحلية) يكونون صارمين كما كان من قبل، وفي الإصدار PR يحصل الأشخاص الذين يدركون الفرق على `BASE_REF=origin/main`، لذا فهم يحكمون على كل مفتاح تمت إضافته أو إعادة كتابته في الدورة. قم بمعاينة حكم الميزة-PR محليًا باستخدام `--mode=pr`.

لا يتم تخطي PR الذي لا يزال يغير كتالوجات الإعدادات المحلية في وضع `pr` (موجة ترجمة، تحديث الإصدار، إصلاح للترجمة فقط): يحكم `check-key-completeness` على كل كتالوج تم تغييره مقابل نفس الكتالوج في قاعدة الدمج (`scripts/i18n/lib/touched-catalogs.mjs`) ويفشل في مفتاح فقد الكتالوج، أو يفتقر إلى مفتاح `en.json` ، أو تحولت ترجمة حقيقية إلى علامة `__MISSING__:` أو إلى نص إنجليزي، أو قيمة لم تعد تستكمل placeholders/tags لسلسلة إنجليزية لم PR لا تلمس. يجب أن يحمل الكتالوج الجديد في PR مجموعة مفاتيح `en.json` بأكملها. يغطي ذلك، بالنسبة للكتالوجات التي تلامس PR ، ما ستشاهده بوابات النسبة وتكافؤ CLI.

تتبع اختبارات وحدة التكافؤ المحلية (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) نفس الأوضاع من خلال `tests/_helpers/localeParityMode.ts`: في وضع `pr` فإنها تتخطى تأكيدات تكافؤ المفاتيح وتترك للإصدار تحديث تكافؤ العنصر النائب للمفاتيح التي تغيرت اللغة الإنجليزية منذ قاعدة الدمج (كل مفتاح عندما لا يمكن لوظيفة اختبار الوحدة قراءته). ذلك المساعد هو** فقط** الوضع المعتمد - التخطي المشروط: `check:test-masking` يحسب `.skip(` و `{ skip: true }` ولكن ليس `{ skip: "<reason>" }` المحسوب الذي يعيده، لذلك يقوم `tests/unit/locale-parity-mode.test.ts` بتثبيت قائمة الاختبارات المسموح باستخدامها — إضافة واحد هو تعديل تمت مراجعته لتلك القائمة.

#### `check-ui-value-drift` — بوابة الترجمة التي لا معنى لها

يلتقط انحدار i18n الوحيد الذي لا تستطيع البوابات الأخرى رؤيته من الناحية الهيكلية: تتم إعادة كتابة القيمة الإنجليزية وتبقى الترجمات المشتقة من اللغة الإنجليزية _السابقة، لذلك يستمر المستخدمون غير الإنجليزيين في قراءة النسخة ذات الكلمات الواثقة والتي أصبحت الآن خاطئة.

تم شحن هذا بشكل حقيقي. تمت إعادة كتابة `oauthModal.googleOAuthWarning` عندما وصل مساعد تسجيل الدخول Antigravity (#5203) ؛** 39 من 43 منطقة** احتفظ بنص يخبر المشغلين "بنسخ URL الكامل ولصقه أدناه" — وهو تدفق لا يمكن إكماله لهذا المزود. لقد مرت دون أن يلاحظها أحد حتى #8463 للأسباب التالية:

- `sync-ui-keys` يقوم فقط بملء المفاتيح الموجودة** غائب** ، أبدا تلك التي** قديمة** ;
- تحسب `check-ui-keys-coverage` _التواجد_ الرئيسي، لذلك يتم تصنيف الترجمة القديمة على أنها مغطاة؛
- `check-translation-drift` يتتبع مرايا وثائق `docs/i18n/<locale>/**.md` — ولا يقرأ `src/i18n/messages/*.json` أبدًا. يتم تشغيله في job `docs-sync-strict`: استشاري بشأن PRs، صارم بشأن الدفع والليل؛ تعمل موجة الترجمة على تحديث المرايا، وليس ميزة PR.

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

يتم الخروج من 0 باستخدام `SKIP reason=base-unresolved` عندما لا يمكن قراءة الكتالوج الأساسي (استنساخ سطحي بدون المرجع الأساسي)، مما يعكس `check-openapi-breaking`. وضع الإصدار فقط: ميزة PR تعيد كتابة اللغة الإنجليزية وتتوقف عند هذا الحد؛ يشير تحديث الإصدار إلى الترجمات التي تركها خلفه (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, نفس `findStaleTranslations`).

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
| `test:vitest:ui` | اختبارات مكون UI — vitest runner                                      | **الحظر** يتم استبعاد حالات الفشل الموجودة مسبقًا — بشكل صريح في `vitest.config.ts`؛ الإخفاقات الجديدة تفشل المهمة |

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
