# CORS Configuration & Security (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute تسيطر عليها **أصول المتصفح** قد يقرأ الاستجابات المشتركة المصدر من قائمة مسموح بها مركزية واحدة. النموذج هو **فشل مغلقة افتراضيا** : لا يُسمح بأي أصل حتى تقوم باشتراك واحد. توثق هذه الصفحة كيفية حل القائمة المسموح بها، وما يكشفه `CORS_ALLOW_ALL=true` فعليًا (والأهم من ذلك، ما يفعله)**لا** )، وكيفية تكوين dev vs production بأمان، ويظهر تحذير وقت التشغيل على لوحة المعلومات عندما يكون حرف البدل نشطًا.

**مصدر الحقيقة:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`، `applyCorsHeaders`، `getCorsStatus`). يتم تطبيق القائمة المسموح بها مرة واحدة، في البرنامج الوسيط (`src/server/authz/pipeline.ts`) لا تقوم معالجات — لكل مسار بتعيين `Access-Control-Allow-Origin` بنفسها.

## كيف يتم حل الأصل

لكل طلب، تقوم البرمجيات الوسيطة بحساب قيمة `Access-Control-Allow-Origin` بهذا الترتيب:

1. **`CORS_ALLOW_ALL=true`** (أو `CORS_ORIGIN=*` القديم ) يردد → صدى `Origin` الخاص بالمتصل (أو `*` عندما لا يكون هناك رأس `Origin` )، مع `Vary: Origin` بحيث تظل ذاكرة التخزين المؤقت صحيحة. تقوم نقطة `applyCorsHeaders()` نفسها أيضًا بإلحاق `Vary: Accept-Encoding` بكل استجابة 2xx-with-body على سطح `/v1*`/`/v1beta*` المصادق عليه بالرمز المميز (`relaxForTokenAuth`، RFC 9110 §12.5.5، الإصدار #6737) ، لذلك يمكن لذاكرة التخزين المؤقت downstream/shared التمييز بشكل صحيح بين المتغيرات المضغوطة وغير المضغوطة.
2. وبخلاف ذلك، تتم تسوية الطلب `Origin` (بأحرف صغيرة، وتجريد الشرطة المائلة اللاحقة) ومطابقته مع **القائمة المسموح بها المدمجة** :
   - بيئة **`CORS_ALLOWED_ORIGINS`** — قائمة مفصولة بفواصل، و
   - وقت التشغيل **`corsOrigins`** الإعداد (Dashboard → Security → _CORSallowed Origins_)، الذي تم إدخاله عبر `setRuntimeAllowedOrigins()` من `src/lib/config/runtimeSettings.ts`.
3. لا يوجد تطابق →**لا ينبعث رأس `Access-Control-Allow-Origin`** . يحظر المتصفح القراءة المشتركة. هذا هو الإعداد الافتراضي الذي تم إغلاقه بالفشل.

| البيئة فار             | معنى                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ذات الأصول الدقيقة المسموح بها (مستحسن).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → صدى أي أصل (حرف البدل). ديف فقط.                                      |
| `CORS_ORIGIN`          | إرث. `*` يتصرف مثل `CORS_ALLOW_ALL`؛ تتم إضافة قيمة واحدة إلى القائمة المسموح بها. |

## نموذج التهديد — هو ما يكشفه `CORS_ALLOW_ALL=true` بالفعل

تحذير OWASP العام ("حرف البدل CORS = يمكن لأي موقع الاتصال بـ API الخاص بك") يستحق أن يؤخذ على محمل الجد، ولكن تعرض OmniRoute هو **أضيق من الحالة العامة** ، بسبب حقيقة تنفيذ ملموسة واحدة:

> **لا ينبعث `applyCorsHeaders()` المركزي أبدًا `Access-Control-Allow-Credentials`.** لن يعرض المتصفح استجابة عبر الأصل _credentialed_ (تحمل ملف تعريف الارتباط) ما لم يرسل الخادم `Access-Control-Allow-Credentials: true`. مسار CORS المشترك لـ OmniRoute لا يحدث أبدًا.

ماذا يعني ذلك لكل سطح، حتى مع `CORS_ALLOW_ALL=true`:

| سطح                                     | آلية المصادقة             | تأثير حرف البدل CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| لوحة القيادة / MANAGEMENT `/api/*`      | جلسة ملفات تعريف الارتباط | وردد الأصل، ولكن **بدون `Allow-Credentials`** المتصفح **كتل** قراءة الاعتماد. موقع ضار عبر الأصل **لا أستطيع القراءة** استجابات لوحة المعلومات التي تمت مصادقتها، ولا يتم الكشف عن ملف تعريف الارتباط للجلسة.                                                                                                                                                                                                                                                                                                |
| العميل API `/v1/*`، `/v1beta/*`         | الحامل / رأس `x-api-key`  | متساهل بالفعل **حسب التصميم** (`relaxForTokenAuth`): لا تقوم المتصفحات مطلقًا بإرفاق `Authorization`/`x-api-key` تلقائيًا، لذلك لا يمكن لصفحة المهاجم توفير المفتاح الخاص بك. يتطلب الصدى المريح موضوعًا تمت المصادقة عليه (مفتاح API أو جلسة لوحة معلومات تم التحقق منها)، وليس مجرد رأس بيانات اعتماد، ولا يتضمن `Access-Control-Allow-Credentials` أبدًا. تستخدم الاستجابات المجهولة (`REQUIRE_API_KEY=false`) القائمة المسموح بها للأصل التي تم ضبطها، بما في ذلك الاشتراك الصريح `CORS_ALLOW_ALL=true`. |
| للقراءة العامة فقط (`/api/health`، ...) | لا أحد                    | غير حساس؛ حرف البدل غير ضار.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

لذلك **المتبقية** يقتصر التعرض لـ `CORS_ALLOW_ALL=true` على: (أ) مصدر مشترك غير معتمد **يقرأ** من البيانات التي لم تتم مصادقتها بالفعل، و(ب) السماح CORS**تمريرة الاختبار المبدئي** على مسارات الإدارة — التي لا تزال تتطلب مصادقة لا يمكن للصفحة المشتركة الأصل توفيرها. إنها **لا** ناقل اختطاف الجلسة أو سرقة بيانات الاعتماد على مسار CORS المشترك.

### استثناء حقيقي واحد — `/api/v1/agents/`

تقوم مسارات وكيل السحابة (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) بتعيين **ملك** رؤوس CORS (`src/lib/cloudAgent/api.ts`، `getCloudAgentCorsHeaders`) و **يفعل** تنبعث منها `Access-Control-Allow-Origin: <origin>|*` مع `Access-Control-Allow-Credentials: true`. هذا هو السطح الوحيد الذي يتعايش فيه صدى الأصل وأوراق الاعتماد، وهو كذلك بالفعل **مستقلة عن `CORS_ALLOW_ALL`** . تتم مصادقة هذه المسارات من قبل الإدارة (`requireManagementAuth`)؛ يجب أن يدرك المشغلون الذين يعرضون لوحة المعلومات خارج المضيف أن هذا هو المكان الوحيد الذي يُسمح فيه بقراءة بيانات الاعتماد عبر الأصل بواسطة رؤوس الاستجابة. يتم تتبع تشديدها إلى القائمة المسموح بها بشكل منفصل عن إرشادات CORS هذه.

## قائمة مراجعة الإنتاج

- **لا تقم مطلقًا بتعيين `CORS_ALLOW_ALL=true` في الإنتاج.** اتركه بدون ضبط.
- تعيين **صريحة** قائمة الأصل — إما env var أو حقل علامة التبويب Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- إذا كان OmniRoute يعمل خلف وكيل/نفق عكسي (nginx، Caddy، Cloudflare Tunnel، Tailscale)، فإن CORS يكون **لا** عنصر التحكم الوحيد الخاص بك — لا يزال حارس مسار الاسترجاع يحمي المسارات القادرة على النشر (انظر [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). لا تقم بتزوير `X-Forwarded-For: 127.0.0.1` "لإصلاح" 403؛ الذي يعيد فتح فئة RCE التي يغلقها حارس الطريق.
- تأكيد حالة وقت التشغيل: تعرض لوحة المعلومات أ **راية العنبر المستمرة** ضمن Dashboard → Security، مخزون تفويض → عندما يكون `CORS_ALLOW_ALL=true` مباشرًا، وتقوم `/api/settings/authz-inventory` بإرجاع أدوات مراقبة مغلف `cors: { allowAll, allowedOrigins }` التي يمكنها الاستقصاء.

## سهولة التطوير — تسمح بأصول محلية محددة

نادرًا ما تحتاج إلى حرف البدل حتى في عملية التطوير. السماح فقط لخوادم التطوير التي تستخدمها:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

تتم مطابقة الأصول بشكل غير حساس لحالة الأحرف مع تجاهل الشرطة المائلة اللاحقة، لذا `http://localhost:3000` و `http://localhost:3000/` متساويان. يمكن ضبط نفس CSV في وقت التشغيل **لوحة المعلومات → Security → CORS الأصول المسموح بها** دون إعادة التشغيل.

## مفاتيح API مقابل جلسات ملفات تعريف الارتباط

- **الحامل / `x-api-key` (سطح الاستدلال `/v1/*` ):** لا تقوم المتصفحات بإرفاق هذه العناصر تلقائيًا أبدًا. CORS ليس حاجزًا ذا معنى هنا — مفتاح API هو الحاجز — ولهذا السبب يكون هذا السطح متساهلًا عن عمد حتى يتمكن المتصفح وعملاء Electron من قراءة الاستجابات التي يحق لهم الحصول عليها بالفعل. يتطلب الصدى المريح موضوعًا تمت مصادقته (مفتاح API أو جلسة لوحة معلومات تم التحقق منها)، وليس مجرد رأس بيانات اعتماد، ولا يتضمن `Access-Control-Allow-Credentials` أبدًا. تستخدم الاستجابات المجهولة (`REQUIRE_API_KEY=false`) القائمة المسموح بها للأصل التي تم ضبطها، بما في ذلك الاشتراك الصريح `CORS_ALLOW_ALL=true`. تظل حالات رفض المصادقة (401) قابلة للقراءة حتى يتمكن العملاء من إظهار مفتاح تم إبطاله أو كتابته بشكل خاطئ (#5242): يحتفظ المسار 401 الخاص بخط الأنابيب بالصدى، والمسار الذي يرفض المفتاح نفسه بعد أن يقدمه خط الأنابيب كمجهول (`/v1/models` و `/v1beta/models` مع تكوين مصادقة الإدارة، ويضيف `/v1/files` و `/v1/batches` و `/v1/media` و `/v1/session-leases` ومسارات التحرير والسرد التلقائية المرشحة الصدى إلى ذلك 401 عبر `credentialRejectionHeaders()`. يتم تحديد الصدى عند الطلب الذي يحمل رأس بيانات الاعتماد (`Authorization` أو `x-api-key` أو `x-goog-api-key` أو ملف تعريف الارتباط `auth_token` )، وليس على أي منها تم فحص المسار، ولا يتم إقرانه مطلقًا مع `Access-Control-Allow-Credentials`؛ الجسم عبارة عن مظروف خطأ ثابت. لا تستخدم مسارات الإدارة ضمن `/api/v1/` المحمية بواسطة `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) استثناء رفض بيانات الاعتماد هذا: مع `REQUIRE_API_KEY=false`، تتبع استجابات 401/403 سياسة أصل CORS التي تم تكوينها.
- **جلسة ملفات تعريف الارتباط (لوحة القيادة):** محمي بواسطة الوضع الافتراضي المغلق بالفشل **و** بسبب غياب `Access-Control-Allow-Credentials` على المسار المشترك. احتفظ بأصول management/dashboard بعيدًا عن أي تكوين متساهل؛ يجب أن يظلوا مغلقين تمامًا.

## مصافحات WebSocket (`/v1/responses`, `/v1/ws`)

لا تطبق المتصفحات CORS على WebSocket، لذا فإن WebSocket ينقل مخرجات الاستدلال التي ترجع التحقق من المصافحة `Origin` نفسها (`src/server/origin/wsOrigin.ts`): الردود WebSocket (`/v1/responses`) وعندما يتم تشغيل OmniRoute عبر `npm start` / `npm run dev`، فإن جسر `/v1/ws` و `/api/v1/ws` ، الذي يتدفق `/v1/chat/completions` و `/v1/messages` و `/v1/responses` كإطارات. يطلب الجسر من `/api/v1/ws?handshake=1` إصدار الحكم ويرفض الترقية ما لم يتم فحص هذا المسار. لا تزال متطلبات المصادقة مطبقة بشكل منفصل. يتم التحقق من الأصل عندما:

- لا يحتوي على رأس `Origin` (Codex CLI و SDKs وعملاء آخرين غير مستعرضين)؛
- يتم قبول `Origin` من خلال القائمة المسموح بها أعلاه (`CORS_ALLOWED_ORIGINS`, إعداد `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` هو أحد الأصول العامة الخاصة بـ OmniRoute(القاعدة العامة التي تم تكوينها URL، أو الأصل المعاد توجيهه للوكيل الموثوق به، أو مضيف loopback/LAN مباشر يتم تقديمه كـ IP حرفي أو `localhost` — نفس المرشحين الذين يستخدمهم فحص طفرة لوحة المعلومات)؛ أو
- فهو يحمل مفتاح API صالحًا، كما هو الحال على سطح HTTP `/v1/*`.

أي شيء آخر يحصل على `403 ws_origin_forbidden`. لا يعفي ملف تعريف الارتباط لجلسة لوحة المعلومات `Origin` الأجنبي، لأن المتصفح يربطه بمقبس أي صفحة. لا يتم التعامل مع `localhost` الموجود على منفذ آخر على أنه من نفس الأصل؛ أضف أصول التطوير هذه إلى `CORS_ALLOWED_ORIGINS`.

## مثال: الوكيل العكسي أمام OmniRoute

يتم فرض CORS بواسطة OmniRoute نفسه، لذا يجب على الوكيل عمومًا أن يفعل ذلك **لا** إضافة أو إعادة كتابة رؤوس `Access-Control-*` (الرؤوس المزدوجة تكسر المتصفحات). قم بإنهاء TLS وإعادة توجيه — للسماح OmniRoute بالإجابة على الاختبار المبدئي:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

قم بتعيين أصول المتصفح المسموح بها في OmniRoute (`CORS_ALLOWED_ORIGINS` أو علامة التبويب Security)، وليس في الوكيل.

## ملفات المصدر

| هَم                                         | ملف                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------- |
| دقة القائمة المسموح بها + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| تطبيق البرمجيات الوسيطة (مصدر واحد للحقيقة) | `src/server/authz/pipeline.ts`                                       |
| إعدادات الحقن الأصلي لوقت تشغيل →           | `src/lib/config/runtimeSettings.ts`                                  |
| حالة وقت التشغيل للوحة القيادة              | `src/app/api/settings/authz-inventory/route.ts`                      |
| لافتة تحذيرية على لوحة القيادة              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| حقل CORS للأصول المسموح بها                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| وكيل السحابة لكل مسار CORS (الاستثناء)      | `src/lib/cloudAgent/api.ts`                                          |
| فحص WebSocket للمصافحة `Origin`             | `src/server/origin/wsOrigin.ts`                                      |

## انظر أيضا

- تطبيق الاسترجاع — [لطبقات حماية الطريق](./ROUTE_GUARD_TIERS.md) للمسارات القادرة على النشر (تحكم منفصل ومتكامل).
- [دليل التفويض](../architecture/AUTHZ_GUIDE.md) — خط أنابيب المصادقة الكامل.
