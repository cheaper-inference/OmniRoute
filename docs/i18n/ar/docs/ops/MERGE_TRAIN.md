# Merge Queue & Manual Merge-Train Runbook (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## الهبوط على فرع الإصدار

تتحكم قائمة الانتظار الشاملة في عمليات الهبوط في `release/vX.Y.Z`. اقرأ `mode` عالي المستوى في `config/merge-queue/config.json` على الفرع الافتراضي قبل الهبوط على PR. راجع [قائمة الانتظار الشاملة](OMNI_QUEUE.md).

- **`shadow`** يقوم بتشغيل التحقق من الصحة ويترك الهبوط للدمج اليدوي. قم بتطبيق `omni-queue` على PR المعتمد في رأسه النهائي. تحقق من الأهلية باستخدام `npm run queue -- why <PR>`. انتظر الحكم على ذلك الرأس في `npm run queue -- history --base <branch>`. المضي قدما في `would-land`. في `culprit-found` أو `would-dequeue`، استمر في الضغط على زر الدمج وأصلح السبب.
- **استثناءات الظل** يمكن للقطار ذي اللون الأخضر الكامل CI مقابل طرف القاعدة الحالي أن يستمر دون إصدار حكم منفصل في قائمة الانتظار. ينطبق نفس الاستثناء عندما يحتوي رأس PR بالفعل على طرف القاعدة الحالي.
- **`live`** يستخدم علامة `omni-queue` لبدء عملية الهبوط. قائمة الانتظار وحدها تصل إلى PR. اترك أوامر الدمج والدفعات المباشرة إلى قائمة الانتظار.

يتطلب كل هبوط تصريح المالك وإجراء الفحوصات المطلوبة المعمول بها. لا تطبق `omni-queue` إلا بعد أن يأذن المالك بالهبوط. يتطلب لمس المسارات المحمية PRs في قائمة الانتظار أيضًا قرار المالك `protected-approved` لذلك PR.

تتطلب مجموعة القواعد "يتطلب بوابات خضراء عند الإصدار النشط" `Gate / CI` و `Gate / Quality` باللون الأخضر على الرأس. لا تستخدم أبدًا `--admin` لتجاوز البوابة الحمراء. يتم دمج كتل التجميد المحررة في الفرع المجمد. انظر [القاعدة الصعبة 21](HARD_RULES_DETAIL.md). لا تقم أبدًا بتسمية طلب سحب أو دمجه أو دفعه إلى أن هناك جلسة أخرى تعمل. انظر [القاعدة الصعبة 22](HARD_RULES_DETAIL.md).

## طلب سحب القطار

1. ابدأ فرع القطار عند طرف قاعدة الإصدار الحالي. قم بدمج رؤساء الأعضاء المعتمدين بالضبط باستخدام عمليات الدمج. حافظ على تاريخ التزامهم عن طريق تجنب الاسكواش وإعادة القاعدة.
2. فتح طلب سحب واحد لفرع القطار. التحقق من صحة تلك PR باستخدام CI الكامل الخاص بها على طرف القاعدة الحالي. أعد فحص طرف القاعدة ورؤوس الأعضاء المعتمدة قبل الهبوط. قم بتحديث القطار و CI الخاص به عندما يتغير المرشح الذي تم التحقق من صحته.
3. قم بتثبيت قطار PR مع التزام الدمج ضمن وضع قائمة الانتظار المطبق. في الوضع المباشر، تحافظ طريقة الهبوط `merge-ff` الخاصة بقائمة الانتظار على عمليات الدمج. يصبح من الممكن الوصول إلى رؤوس الأعضاء الأصليين من فرع الإصدار. يضع GitHub علامة على العضو PRs على أنه مندمج وتحتفظ الالتزامات بمؤلفيها.

والمثال العام هو [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). لقد جمعت 18 عضوًا من PRs وهبطت بالتزام دمج في 24/11/2026.

تتم أيضًا عملية المزامنة من `main` إلى فرع الإصدار التالي من خلال التزام الدمج. يعد الحفاظ على أصل `main` مطلوبًا لعمليات المزامنة اللاحقة. راجع [عزل شجرة العمل](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## أداة التحقق من صحة الدمج المحلي

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

يقوم المدقق بإحضار القاعدة ورؤوس PR ويجمعهما في شجرة عمل يمكن التخلص منها. يقوم بتشغيل مجموعة التكافؤ الخاصة به مرة واحدة على الشجرة الناتجة. يؤدي فشل جلب الرأس أو تعارض الدمج إلى إخراج PR ويستمر البرنامج النصي مع PRs المتبقي.

- **`--plan`** طباعة خطوات الوضع المحدد والخروج دون إنشاء شجرة عمل أو الاتصال بجهاز التحكم عن بعد. ادمجها مع `--fast` لتفقد الخطة السريعة.
- **`--fast`** يقوم بتشغيل البوابات الثابتة المشتركة وملفات `node:test` التي تم تغييرها والمحددة ضمن `tests/unit/` و `npm run test:vitest`. قم بإجراء التحقق المحلي الكامل مرة واحدة على الأقل يوميًا على الطرف المتراكم عند استخدام الوضع السريع.
- **الوضع الكامل** يضيف البوابات الثابتة الكاملة فقط ويدير `npm run test:unit` و `npm run test:vitest`.

تتم إعادة تشغيل البوابة الثابتة الفاشلة على القاعدة التي لم تمسها إذا كان مسبار القاعدة متاحًا. يُبلغ البرنامج النصي عن حالات الفشل الموروثة ويستمر عندما يظهر أيضًا كل سطر انتهاك تم التعرف عليه على القاعدة ولا يتزايد العدد الإجمالي.

| مخرج | معنى                                                                                               |
| ---- | -------------------------------------------------------------------------------------------------- |
| `0`  | طبع الخطة أو أكمل المجموعة. يسرد ملخص المجموعة أي حالات فشل ثابتة موروثة وإخراج PRs.               |
| `1`  | وسائط غير صالحة، أو لا يوجد تسجيل خروج لـ Git، أو فشل الاختبار المبدئي، أو لا توجد لوحة PR.        |
| `2`  | فشل فحص المجموعة ولم يتم تأهيله كموروث. يمكن للمشغل تقسيم الدفعة وإخراج PR المخالف وإعادة التشغيل. |

يوفر تصريح المرور المحلي أدلة تشخيصية لملف المالك فقط. لا يزال كل هبوط يتطلب تصريح المالك، والفحوصات المطلوبة الخاصة به، وحكم قائمة الانتظار الظلية عند الاقتضاء.

## التدرج

- **لكل PR.** CI وفحوصات تحديد الجودة بناءً على المسارات التي تم تغييرها. يقوم Code PRs بتشغيل بوابات الجودة السريعة والاختبارات المتأثرة، مع وحدة منفصلة ووظائف Vitest في CI.
- **لكل مرشح قائمة الانتظار.** يقوم CI وQuality بتشغيل الملف الشخصي الكامل للمرشح المؤلف في قائمة الانتظار الخاصة به.
- **لكل نصيحة الإصدار.** يقوم Release-Green بتشغيل بوابات صلبة سريعة على الدفعات التي تتوافق مع مرشحات المسار الخاصة به. تستخدم ثلاث عمليات تشغيل مجدولة يوميًا عملية المسح الكاملة لفرع الإصدار.
- **لكل إصدار.** تشتمل مصفوفة CI الكاملة على أجزاء E2E والتحقق من صحة الحزمة ودخان حذاء القطران وفحوصات التغطية. راجع [قائمة التحقق من الإصدار](RELEASE_CHECKLIST.md).

## متطلبات الخروج الجديدة لـ `merge-train.sh`

يتم تشغيل الاختبار المبدئي قبل إنشاء أشجار العمل. تثبيت التبعيات مع `npm ci`. تأكد من أن `node_modules/.bin/tsc` قابل للتنفيذ وأن `node_modules/node_modules` غير موجود. تأكد من نجاح `node_modules/.bin/bun --version`.

إذا تم تخطي التثبيت اللاحق Bun ، فقم بتشغيل `(cd node_modules/bun && node install.js)`. يستخدم تناسق الموفر وفحوصات الرموز المعروفة Bun. يقوم المدقق بتشغيل `npm run check:cycles:ratchet` كبوابة حظر. يعتبر الأمر `npm run check:cycles` المستقل استشاريًا.

## تاريخ

تم إيقاف قائمة انتظار دمج Mergify بتاريخ 19-11-2026.
