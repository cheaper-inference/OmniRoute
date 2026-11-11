# Release-Green: candidate validation and evidence (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

يلاحظ Release-Green التزامًا محددًا ويبلغ عن نتائج التحقق من صحته. يحدد [مرجع بوابات الجودة](../architecture/QUALITY_GATES.md) ملفات تعريف CI الحالية والفحوصات المطلوبة وسياسة القبول. سياسة القبول الصادرة في `config/quality/admission-policy.json` هي العقد القابل للتنفيذ لـ `Gate / CI` و `Gate / Quality`.

## CI ونطاق المراقب

يغطي `ci.yml` و `quality.yml` طلبات السحب إلى الفروع الرئيسية وفروع الإصدار. يحدد ملف التعريف المحدد الوظائف التي سيتم تطبيقها. يتضمن Full CI أيضًا الممرات التي لا يتم تنفيذ طلب السحب العادي. لا يمكن لنتيجة المراقب السريع أن تحل محل تلك المهام، ولا يمكن أن يحل مجمّع سير العمل المكتمل محل إيصالاتها.

ينتمي بناء الإنتاج إلى CI. لا يوجد إصدار استشاري مكرر في `quality.yml`. لا تؤدي القطع الأثرية المفقودة والعمل الملغى والقياسات غير المكتملة إلى إجراء فحص مطلوب ناجح. قم بتأكيد القاعدة الحالية والرئيس والمرشح المشترك قبل قبول النتائج.

## التحقق المحلي

قم بتشغيل المراقب في شجرة عمل مملوكة بعد إعداد تبعياته. اتبع شجرة العمل وبروتوكول الموارد في `docs/ops/WORKTREE_ISOLATION.md` قبل التحقق من الصحة بشكل مكثف.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

الملف الشخصي السريع جزئي. يتحقق الملف الشخصي الكامل من متطلباته النموذجية ويحتفظ بإيصالات الأوامر؛ ولا يصدق على النشر أو البديل عن عمليات التحقق المستضافة المعمول بها. يميز التقرير بين فشل التنفيذ والانحراف المتري. تظل السقاطات المطلوبة محظورة وفقًا للسياسة المحددة. لا ترفع خط الأساس لمجرد الحصول على نتيجة ناجحة.

## عمليات المسح الليلية واليدوية

تحدد وحدات حل التوافق والإصدار الليلي فرع الإصدار الأساسي. يجب أن يتطابق هذا التحديد مع الفرع الذي قام بتشغيل سير العمل، وتستخدم المجموعات SHA غير القابل للتغيير للحدث. للتنفيذ اليدوي، حدد الإصدار المقصود في `release_branch` وأرسله على نفس المرجع:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

يتم رفض الإرسال عبر الفروع قبل تنفيذ التعليمات البرمجية المحددة. الأجنحة الرئيسية المستضافة تحقق من `main` وتحقق من أن SHA الخاص بها لا يزال يطابق الهدف الذي تم حله قبل التثبيت. إذا كانت هناك تحركات رئيسية أثناء الحل، فأعد تشغيل عملية المسح غير الكاملة على الالتزام الجديد. لا تجمع بين إيصالات الجناح من مرشحين مختلفين.

## فرز الفشل والانتعاش

استخدم الحادث كمؤشر تشخيصي، ثم افحص التشغيل الدقيق والمحاولة والخطوة الفاشلة والقطعة الأثرية. قارن بين الأدلة الأساسية والمرشحة المكافئة قبل إسناد الفشل إلى أحد المساهمين. تتطلب أخطاء البنية التحتية والعيوب الموروثة وتراجعات المرشحين والموافقات المعلقة علاجات مختلفة.

تقوم مهارات `/green-prs` و `/sweep-reds` و `/validate-release-green` و `/babysit` بجمع الأدلة وإعداد الإصلاحات ضمن نطاقها الموثق. احتفظ برصيد المساهم، واستخدم فروع الإصلاح المعزولة، وتحقق من جميع الفحوصات المطلوبة قبل الدمج المعتمد. لا توجد بدائل تلقائية لخط الأساس أو إغلاق الحادث للمرشح الحالي الناجح.
