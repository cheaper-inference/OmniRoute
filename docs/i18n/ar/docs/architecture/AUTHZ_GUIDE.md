# Authorization Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **مصدر الحقيقة:** `src/server/authz/`، `src/shared/constants/publicApiRoutes.ts`، `src/lib/api/requireManagementAuth.ts`، `src/shared/utils/apiAuth.ts`
> **آخر تحديث:** 2026-09-22 — تشير مساحات أسماء النطاقات إلى MCP-SERVER.md

لدى OmniRoute مسار معالجة تخويل مُدرك للمسارات، يتحكم في كل طلب API. ويُعد التصنيف **حتميًا** و**مغلقًا عند الفشل** — فأي شيء يتعذر تصنيفه ينتهي به المطاف ضمن `MANAGEMENT` ويتطلب جلسة أو رمزًا مميزًا بمستوى الإدارة. تشرح هذه الصفحة النموذج للمهندسين الذين يتولون صيانة المسارات أو تصميم نقاط نهاية جديدة.

![مسار معالجة AuthZ (3 فئات للمسارات + تقييم السياسات)](../diagrams/exported/authz-pipeline.svg)

> المصدر: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## نمطا المصادقة

### 1. مفتاح API (Bearer)

يُستخدم مع واجهات برمجة التطبيقات للعملاء المتوافقة مع OpenAI وAnthropic وGemini، وفي بعض مسارات الإدارة، عندما يملك المفتاح النطاق `manage`.

```
Authorization: Bearer <api-key>
```

يتحقق منه `isValidApiKey()` / `extractApiKey()` في `src/sse/services/auth.ts`، ويُعاد تصديرهما عبر `src/shared/utils/apiAuth.ts`. ويقبل المدقق أيضًا متغيّري البيئة `OMNIROUTE_API_KEY` و`ROUTER_API_KEY` بوصفهما مفاتيح تمرير دائمة (issue #1350).

### 2. جلسة لوحة التحكم (ملف الارتباط auth_token)

لصفحات لوحة التحكم وعمليات الإدارة.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

لا يُعدّ ملف الارتباط جلسةً إلا إذا تحقّق رمز JWT الخاص به **و**كان يحمل `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). ويمرّ كل مستهلك لملف الارتباط — حارس مسارات لوحة التحكم (`isDashboardSessionAuthenticated()`)، وخط معالجة تحديث المصادقة، ومصافحة WebSocket، والخادم الحي، و`/api/settings/require-login`، و`/api/auth/status` — عبر هذه الدالة المساعدة.
توجد رموز JWT أخرى موقّعة بـ `JWT_SECRET`، إذ تصدر رموز Cursor CLI passthrough الرمز `iss "omniroute" / aud "cursor-cli"` لحاملي المفاتيح، وهي لا تُعدّ جلسات أبدًا (#13298).

تُتحقَّق الجلسة عبر `isDashboardSessionAuthenticated()` في `src/shared/utils/apiAuth.ts`. ويجدّد خط المعالجة رمز JWT تلقائيًا عندما يبقى له أقل من 7 أيام من عمره البالغ 30 يومًا.

قد تنتهي الجلسة قبل انقضاء أيامها الثلاثين، لأن كل جهة إصدار تمرّ عبر `mintDashboardSessionToken` (وتحمل وقت إصدار `iat` ومعرّفًا `jti`)، ويتحقق المُدقّق من إعدادين: `sessionsValidAfter`، الذي تضبطه عملية تغيير كلمة المرور فتتوقف عن التحقق كل جلسة صدرت قبله (ويحصل المتصفح الذي غيّر كلمة المرور على ملف ارتباط جديد)، و`revokedDashboardSessions`، الذي يضيف إليه `POST /api/auth/logout` قيمة `jti` الخاصة بالجلسة المُنهاة. والجلسات التي تصدرها نسخة أقدم لا تحمل أيًّا من المطالبتين، فتبقى صالحة حتى أول تغيير لكلمة المرور. وإذا تعذّرت قراءة الإعدادات فلا تُعتمد الجلسة.

تقبل بعض مسارات الإدارة **أيًّا** من النمطين: ملف الارتباط، أو `Bearer <key>` عندما يملك المفتاح النطاق `manage` (أو `admin`). وهذا ما يتيح سير العمل "القابل للتهيئة عبر استدعاءات API" الذي أُضيف في الإصدار v3.8.

#### بوابة تسجيل دخول OIDC الاختيارية (#6973)

يدعم تسجيل دخول مدير لوحة التحكم أيضًا تدفق OIDC (OpenID Connect) **الاختياري** إلى جانب تسجيل الدخول الافتراضي بكلمة المرور، فلا يُزال تسجيل الدخول بكلمة المرور أبدًا، بل يُكمَّل فقط:

- معطّل ما لم يكن `settings.oidcEnabled === true` **و**كانت `oidcIssuer` و`oidcClientId` و`oidcClientSecret` مُعدّة كلها (الإعدادات ← المصادقة). ويعيد `GET /api/auth/oidc/login` الاستجابة `400` في غير ذلك.
- يكتشف `GET /api/auth/oidc/login` قيمة `authorization_endpoint` من `/.well-known/openid-configuration` الخاص بالمُصدِر (ويعود إلى `<issuer>/authorize` عند الفشل)، ويبني عنوان إعادة التوجيه (redirect URI) من الطلب الوارد مع مراعاة `x-forwarded-proto`، ثم يعيد التوجيه إلى مزوّد الهوية مع قيمة `state` عشوائية مخزّنة في ملف الارتباط `oidc_state` بخاصية `httpOnly`.
- يتحقق `GET /api/auth/oidc/callback` من `state`، ويستبدل رمز التفويض (authorization code)، ويتحقق من توقيع رمز الهوية (ID token) عبر JWKS الخاص بالمُصدِر (`createRemoteJWKSet` من `jose`، مع تخزينه مؤقتًا لكل عنوان JWKS) مع فحوص `issuer` و`audience`. قائمة السماح `oidcAllowedSubjects` إلزامية: فهي تُطابَق مع المطالبة `sub` في الرمز أو مع المطالبة `email`، ولا تُعتمد مطالبة البريد إلا عندما تكون `email_verified === true`، فلا يستطيع بريد غير موثّق لدى مزوّد الهوية أن يجتاز البوابة. وإذا كانت القائمة فارغة رفض الاستدعاء كل تسجيل دخول (`not_configured`).
- عند النجاح يُصدر **الرمز نفسه** `auth_token` من نوع JWT لمدة 30 يومًا الذي يُصدره تسجيل الدخول بكلمة المرور (`src/app/api/auth/login/route.ts`)، فتبقى بقية خط معالجة جلسة لوحة التحكم (التحديث التلقائي وعلامات ملف الارتباط) دون تغيير، إذ يغيّر OIDC طريقة إصدار ملف الارتباط فقط، لا ما يمنحه.
- تدخل كل إعدادات `oidc*` (`oidcEnabled` و`oidcDisablePasswordLogin` و`oidcIssuer` و`oidcClientId` و`oidcClientSecret` و`oidcAllowedSubjects` و`oidcRedirectPath` و`oidcScopes`) في `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): فيجيب `PATCH /api/settings` بالخطأ `400 PASSWORD_REQUIRED` ما لم يحمل الطلب كلمة مرور الإدارة بوصفها `currentPassword` (ويعيد `401 PASSWORD_MISMATCH` عند خطئها). ويرفض `oidcDisablePasswordLogin` تسجيل الدخول بكلمة المرور (`POST /api/auth/login`) دون أن يحذف تجزئة كلمة المرور المخزّنة، ويظل تحقق إعادة المصادقة يقارن `currentPassword` بها.
- و`corsOrigins` و`bruteForceProtection` موجودان في `SECURITY_IMPACTING_SETTINGS_KEYS` أيضًا: فتوسيع أيٍّ منهما يُضعف دفاعات تسجيل الدخول، لذلك يتطلبان إعادة المصادقة نفسها بـ`currentPassword` (وتطلبها تبويبة الأمان)، ويُسقطهما استيراد JSON.
- كل مفتاح سياسة أمنية، أي مدخلات `SECURITY_IMPACTING_SETTINGS_KEYS` وكل مفتاح `oidc*` وحالة جلسة لوحة التحكم، **مخصص للمشغّل فقط** في `PATCH /api/settings`: يُرفض مفتاح بنطاق `manage` أو رمز وصول `oma_` بالخطأ `403` حتى لو أرسل `currentPassword` الصحيح، ويُدقَّق الرفض بوصفه `settings.update_failed` مع `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` في `src/lib/api/operatorCredential.ts`). أما الإعدادات العادية (السمة وتفضيلات العرض) فتبقى قابلة للكتابة لمفتاح `manage` أو لرمز وصول `admin`. وكل تعديل على `/api/settings` نفسه (وعلى `/api/settings/require-login`) يتطلب أيضًا نطاق رمز الوصول `admin` (`ADMIN_MUTATION_EXACT_PATHS` في `src/server/authz/accessScopes.ts`، بمطابقة المسار تمامًا)؛ أما `GET` فيبقى `read`، وتحتفظ مسارات `/api/settings/*` الفرعية الأخرى (الوكلاء، والإعدادات الافتراضية للتركيبات، والأسماء المستعارة للنماذج، والضغط، وعمليات التطهير…) بنطاق `write` المستنتج من طريقة الطلب.
- يتجاوز `POST /api/settings/import-json` إعادة المصادقة تلك، لذلك يُسقط كل مفتاح في `IMPORT_STRIPPED_SETTINGS_KEYS` (في الملف نفسه) قبل الكتابة: كلمة المرور و`currentPassword`، وكل مدخل في `SECURITY_IMPACTING_SETTINGS_KEYS`، وحالة جلسة لوحة التحكم (`sessionsValidAfter` و`revokedDashboardSessions`). ولذلك لا يستطيع استيراد نسخة احتياطية قديمة إحياء جلسة أنهاها تغيير كلمة مرور أو تسجيل خروج.

## فئات المسارات

يعرّف `src/server/authz/types.ts` ثلاث فئات، وأي مسار لا يمكن تصنيفه بشكل حتمي يرجع إلى `MANAGEMENT`.

| Class        | Description                                                                                                                                                     | Auth required                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `PUBLIC`     | مسارات آمنة صراحةً: تسجيل الدخول، وتسجيل الخروج، والحالة، والتهيئة، والصحة، وتمهيد الإعداد الأولي.                                                              | لا شيء                                                        |
| `CLIENT_API` | نقاط خدمة النماذج: `/api/v1/*` و`/api/v1beta/*`، بالإضافة إلى الأسماء المستعارة `/v1/*` و`/v1beta/*` و`/chat/completions` و`/responses` و`/models` و`/codex/*`. | مفتاح Bearer عندما تكون ميزة `REQUIRE_API_KEY` الفعلية مفعّلة |
| `MANAGEMENT` | صفحات لوحة التحكم، والإعدادات، والمزوّدون، والمفاتيح، ونقاط الإدارة والتشخيص.                                                                                   | جلسة لوحة التحكم **أو** Bearer بنطاق `manage`                 |

تحتاج بعض إجراءات `MANAGEMENT` إلى **المشغّل فقط**: فمفتاح `manage` لا يكفي. فتصدير بيانات الاعتماد المخزّنة (`GET /api/settings/export-json` و`GET /api/db-backups/export` و`GET /api/db-backups/exportAll`)، واستعادة نسخة احتياطية فوق البيانات الحية (`POST /api/db-backups/import` بما فيه `dryRun=true`، و`POST /api/db-backups` للاستعادة بالمعرّف، و`POST /api/settings/import-json`)، وإتلاف نقاط الاستعادة (تنظيف `DELETE /api/db-backups`، و`PATCH /api/db-backups` لأن الاحتفاظ الذي يحفظه يقود التقليم التلقائي بعد كل نسخة احتياطية) كلها تتطلب جلسة لوحة التحكم، أو هوية CLI المحلية، أو تعطيل تسجيل الدخول. ويتطلب إصدار رمز مزامنة (`POST /api/sync/tokens`) وسكّ رمز وصول CLI بنطاق `admin` (`POST /api/cli/tokens`) جلسة لوحة التحكم أو هوية CLI المحلية في كل أوضاع تسجيل الدخول. ومفاتيح API بأي نطاق ورموز الوصول `oma_` ليست بيانات اعتماد للمشغّل: فتتلقى الخطأ `403` كلما اشترط المسار ذلك. ويقع الفحص في `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). وتغيير إعدادات تسجيل الدخول مقصور على المشغّل أيضًا: إذ لا يقبل `POST /api/settings/require-login` (لضبط كلمة مرور الإدارة أو تبديل `requireLogin`) إلا هذه البيانات بعد وجود كلمة مرور، أما نافذة التمهيد الأولي عند أول تشغيل (قبل وجود كلمة مرور) فتبقى كما هي، ويجب أن ترسل جلسة لوحة التحكم `currentPassword` لاستبدال كلمة المرور (فيعيد `403` عند غيابها أو خطئها، ويُدقَّق بوصفه `settings.update_failed`). وتحتفظ CLI المحلية، والنسخة التي عُطّل فيها تسجيل الدخول، بمسار الاسترداد، ويجوز لها ضبط كلمة مرور دون هذا الشرط، لأن كليهما مرتبط بالمضيف الذي يملك مجلد البيانات.

## خط المعالجة

```
الطلب الوارد → src/proxy.ts
  → runAuthzPipeline() في src/server/authz/pipeline.ts
    1. إزالة الترويسات الداخلية الموثوقة (x-omniroute-auth-*, x-omniroute-route-class)
    2. إنشاء معرّف للطلب، وتصنيف المسار عبر classifyRoute()
    3. إذا كان pathname == "/" → إعادة التوجيه إلى /dashboard
    4. إذا كان النظام في وضع التفريغ (إيقاف تشغيل سلس) وكان المسار /api/* → 503
    5. إذا لم تكن الطريقة GET وكان المسار /api/* → تطبيق حاجز checkBodySize()
    6. إذا كانت الطريقة OPTIONS → استجابة تمهيدية لـ CORS بالحالة 204
    7. إذا كان options.enforce == false → تمرير الطلب مع ترويسات فئة المسار
    8. خلاف ذلك: POLICIES[routeClass].evaluate(ctx)
       - السماح  → تعيين x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - الرفض → خطأ JSON يتضمن correlation_id (صفحات لوحة المعلومات → 302 /login)
```

تُزال الترويسات الداخلية الموثوقة (المعرّفة في `src/server/authz/headers.ts`) **من الطلبات الواردة** قبل التصنيف — ولا يمكن للعملاء تعبئة `x-omniroute-auth-*` مسبقًا لانتحال هوية جهة ما.

### عقود السياسات

لكل فئة مسار سياسة في `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — تعيد دائمًا `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — تستخرج Bearer وتتحقق منه عبر `validateApiKey()`. ولا تنتقل إلى الوصول المجهول إلا عند تعطيل علامة الميزة الفعلية `REQUIRE_API_KEY`. تُحدَّد العلامة الفعلية من خلال `isRequireApiKeyEnabled()` (`تجاوز علامة الميزة في قاعدة البيانات > process.env.REQUIRE_API_KEY > القيمة الافتراضية`)، بحيث تتحكم علامات الميزات في لوحة المعلومات ومتغيرات البيئة في `/api/v1/*`، و`/api/v1beta/*`، والأسماء البديلة بشكل متسق؛ وتؤدي إخفاقات أداة الحل إلى الرفض الآمن. تسمح بطلبات جلسة لوحة المعلومات على مسارات واجهة API الخاصة بالعميل (بما فيها `/api/v1/models`، الذي يستخدمه كتالوج النماذج في لوحة المعلومات).
- **`managementPolicy`** (`policies/management.ts`) — تقبل جلسة لوحة المعلومات، أو طلبات مزامنة النماذج الداخلية (المطابَقة مع `/api/providers/[name]/(sync-models|models)`)، أو تتخطى التحقق بالكامل إذا أعادت `isAuthRequired()` القيمة false. تعيد 403 (`AUTH_001`) عند وجود رمز Bearer لكنه غير صالح، وتعيد 401 خلاف ذلك. كما تفرض مستويات حراسة المسارات (LOCAL_ONLY / ALWAYS_PROTECTED) قبل أي فرع للمصادقة — راجع [مستويات حراسة المسارات](../security/ROUTE_GUARD_TIERS.md). يمكن الوصول إلى مسارات LOCAL_ONLY الموجودة في `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (حاليًا: `/api/mcp/`) من خارج عنوان الاسترجاع المحلي عندما يحمل مفتاح Bearer النطاق `manage`؛ وتظل جميع مسارات LOCAL_ONLY الأخرى مقتصرة بشكل صارم على عنوان الاسترجاع المحلي بغض النظر عن النطاق.

تعيد السياسة الناجحة `AuthSubject` بحيث تكون `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. ويمكن للمعالِجات اللاحقة قراءته عبر `assertAuth(request, "CLIENT_API")` في `src/server/authz/assertAuth.ts` بدلًا من إعادة تنفيذ منطق المصادقة.

## قائمة المسارات العامة

الملف `src/shared/constants/publicApiRoutes.ts` هو قائمة السماح الصريحة:

تُقسَّم القائمة حسب **الشكل**، وهذا التقسيم ضروري للأمان (GHSA-74g9-q8f6-793h): تتم مطابقة البادئة باستخدام
`startsWith()`، ولذلك فإنها تطابق أيضًا كل مسار مجاور يشترك معها في المحارف الأولى.
أدّى استخدام `/api/usage/om-usage` كبادئة إلى جعل `/api/usage/om-usage<anything>` عامًا، ويحوّل Next ذلك
إلى `/api/usage/[connectionId]` — وهو معالج لا يملك آلية مصادقة خاصة به.

```ts
// أشجار فرعية فعلية. يجب أن ينتهي كل إدخال بـ "/" (ويتحقق من ذلك اختبار وحدة).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // يُعامل على أنه CLIENT_API في classify، وليس عامًا «من دون مصادقة»
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// مسارات منفردة، تُطابق بصورة تامة (مع شرطة مائلة ختامية أو من دونها).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// مسارات منفردة للقراءة فقط تستفيد أيضًا من تخفيف قيود أصل CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// مسار منفرد للقراءة فقط من دون تخفيف قيود CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

تكون مسارات القراءة فقط عامة **فقط** مع الطرق الآمنة. ملاحظة: تستثني `classifyRoute()` المسارين `/api/v1/*` و`/api/v1beta/*` من الرجوع الافتراضي إلى PUBLIC — إذ يُصنَّفان دائمًا على أنهما `CLIENT_API` كي تظل سياسة مفتاح Bearer مطبقة.

## إضافة مسار جديد

### النمط 1 — نقطة نهاية عامة لواجهة API الخاصة بالعميل (مصادقة Bearer)

تُصنَّف المسارات الواقعة تحت `/api/v1/` و`/api/v1beta/` تلقائيًا على أنها `CLIENT_API`. تفرض البرمجية الوسيطة التحقق من Bearer؛ ولا تحتاج معالجات المسارات إلى تكراره، لكن يمكنها قراءة هوية صاحب الطلب عند الحاجة.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... منطق المعالج
}
```

### النمط 2 — نقطة نهاية إدارية (جلسة أو Bearer + manage)

استخدم `requireManagementAuth()` من `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... منطق المعالج
}
```

تعيد `requireManagementAuth()` القيمة `null` عند النجاح، أو `Response` لخطأ بصيغة JSON:

- 401 `AUTH_001` "المصادقة مطلوبة" — لا توجد أي بيانات اعتماد
- 403 — بيانات Bearer غير صالحة **أو** توجد بيانات Bearer لكن المفتاح يفتقر إلى النطاق `manage` / `admin`

تعيد `hasManageScope(scopes)` القيمة true عند وجود `"manage"` أو `"admin"`.

### النمط 3 — الإضافة إلى قائمة السماح العامة

اختر المجموعة بناءً على الشكل، لا على سهولة الاستخدام. يوضع المسار المنفرد في `PUBLIC_API_ROUTES_EXACT` (أو في `PUBLIC_READONLY_CORS_API_ROUTES` إذا كان مخصصًا لـ GET فقط)؛ ولا يوضع في `PUBLIC_API_ROUTE_PREFIXES` سوى شجرة فرعية فعلية، ويجب أن **تنتهي بـ `/`**. يؤدي وضع مسار منفرد في قائمة البادئات أيضًا إلى نشر كل مسار مجاور يشترك معه في المحارف الأولى — بما في ذلك المسارات الشقيقة ذات المقاطع الديناميكية التي تُضاف لاحقًا (GHSA-74g9-q8f6-793h). حدّث اختبارات الوحدة في `tests/unit/public-api-routes.test.ts` و`tests/unit/authz/public-route-exact-match.test.ts` و`tests/unit/authz/classify.test.ts`.

## النطاقات

ثلاثة مساحات أسماء. يقرأ كل مدقّق السلاسل النصية الخاصة به فقط. للمقارنة جنبًا إلى جنب، بما في ذلك سبب فشل `manage` في `scopeMatches` بالنسبة إلى `read:compression` وسبب عدم تمكّن رمز وصول ذي نطاق `read` من تنفيذ `PATCH /api/keys/{id}`، راجع
[مساحات أسماء النطاقات الثلاث](../frameworks/MCP-SERVER.md#three-scope-namespaces).

تحمل مفاتيح API مصفوفة `scopes` (مخزّنة بصيغة JSON في `api_keys.scopes`، راجع `src/lib/db/apiKeys.ts`).

### نطاق الإدارة

- `manage` / `admin` — `hasManageScope`. وصول حامل الرمز إلى مسارات واجهة API الإدارية.
- إن `mcp:connect` و`self:usage` و`self:account-quota` و
  `policy:bypass-provider-quota` هي نطاقات تراكمية تعتمد على التطابق التام. وهي تقع
  خارج `MANAGEMENT_API_KEY_SCOPES`. لا يتيح `mcp:connect` سوى
  استثناء الوصول غير المحلي إلى `/api/mcp/`.

### نطاقات أدوات MCP

دليل النطاقات وقواعد المطابقة (سلسلة نصية متطابقة، أو نطاق ممنوح ينتهي بـ `*`):
[نطاقات أدوات MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
تمثّل `MCP_SCOPE_LIST` في `src/shared/constants/mcpScopes.ts` المجموعة الفرعية الأصلية
ذات الأنواع المحددة، وليست الدليل الكامل. يجري الإنفاذ في
`open-sse/mcp-server/scopeEnforcement.ts` بعد أن تحلّ `resolveCallerScopeContext()`
النطاقات من معلومات مصادقة MCP أو بيانات الطلب الوصفية أو `OMNIROUTE_MCP_SCOPES`.
ويظل معطّلًا ما لم تكن `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### نطاقات رموز الوصول

`read` / `write` / `admin` على رموز `oma_live_…`، مرتبة بواسطة `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). ينطبق هذا الترتيب على بيانات اعتماد رمز الوصول
فقط. راجع [مصادقة الإدارة](../guides/MANAGEMENT-AUTH.md).

## تبديل اشتراط المصادقة

تحدّد `isAuthRequired()` في `src/shared/utils/apiAuth.ts` ما إذا كانت **أي** مصادقة مطلوبة لطلب ما:

- `settings.requireLogin === false` ← تُعطّل المصادقة على مستوى النظام، باستثناء فئة الحماية الدائمة (انظر [مستويات حارس المسارات](../security/ROUTE_GUARD_TIERS.md)) والاستدعاءات التي تُسلّم بيانات اعتماد يقبلها النظام، والتي تتطلب بيانات الاعتماد نفسها كما لو كان تسجيل الدخول مفعّلًا: إصدار رموز المزامنة، وسكّ رموز وصول CLI بأي نطاق، وإنشاء مفتاح API بنطاق `manage`/`admin`، ومنح هذا النطاق لمفتاح، أو إعادة توليد مفتاح من هذا النوع أو كشفه (`requireCredentialForManagementScopedKey()` في `src/lib/api/requireManagementAuth.ts`). أما مفاتيح الاستدلال فقط فتبقى مفتوحة.
- لا توجد كلمة مرور مُعدّة **ولا** متغير البيئة `INITIAL_PASSWORD` ← يسمح وضع التمهيد بمعالج الإعداد وبالطلبات المحلية (loopback)، لكن الطلبات الشبكية المكشوفة ما زالت تحتاج إلى بيانات اعتماد.
- أي خطأ في قاعدة البيانات ← يفشل النظام مغلقًا (آمن افتراضيًا).

يستخدم فرض مفتاح API للعميل `isRequireApiKeyEnabled()` في `src/shared/utils/featureFlags.ts`، لا قراءة مباشرة لـ `process.env.REQUIRE_API_KEY`. وهذا مهم للنسخ المنشورة: فتبديل `REQUIRE_API_KEY` في لوحة التحكم ← أعلام الميزات يخزّن تجاوزًا في قاعدة البيانات ويؤثر فورًا في `/v1/*` و`/v1beta/*` و`/models` و`/responses` و`/chat/completions` و`/codex/*`، وفي فحوص مصادقة واجهة برمجة العميل الأخرى التي تشارك هذه الدالة المساعدة. وإذا تعذّرت قراءة مخزن أعلام الميزات فإن مصادقة واجهة العميل تفشل مغلقة وتشترط مفتاحًا.

## تغيير غير متوافق — v3.8.0

أصبحت نقطتا النهاية `/api/v1/agents/tasks/*` و`/api/resilience/model-cooldowns` **تتطلبان الآن مصادقة إدارية** (الالتزام `588a0333`). تتلقى تطبيقات العميل التي كانت ترسل سابقًا مفتاح API عاديًا من دون نطاق `manage` استجابة `403`. الترحيل: امنح المفتاح نطاق `manage` من لوحة معلومات API Keys، أو استخدم جلسة مسجَّلة الدخول في لوحة المعلومات.

## تغيير في السلوك — v3.8.2

لا يزال `/api/mcp/*` (خادم MCP البعيد) مضبوطًا افتراضيًا على LOCAL_ONLY، لكنه يقبل الآن الطلبات غير الواردة من عنوان الاسترجاع المحلي عندما يحمل الترويس `Authorization: Bearer <api-key>` نطاق `manage`. يُقيَّد هذا الاستثناء صراحةً لكل مسار عبر `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` في `src/server/authz/routeGuard.ts`؛ أما بادئة LOCAL_ONLY الشقيقة `/api/cli-tools/runtime/*` فلا يمكن تجاوزها عمدًا لأنها تستطيع تشغيل عمليات فرعية عشوائية. تستمر الطلبات المجهولة إلى `/api/mcp/*` من عناوين غير محلية في تلقي `403 LOCAL_ONLY` — ويظل الإعداد الافتراضي لأي مسار LOCAL_ONLY جديد مقتصرًا بصرامة على الاسترجاع المحلي. راجع [مستويات حارس المسارات](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## الاختبار

- اختبارات الوحدة: `tests/unit/authz/` — `classify.test.ts` و`pipeline.test.ts` و`client-api-policy.test.ts` و`management-policy.test.ts` و`public-policy.test.ts`.
- قائمة السماح العامة: `tests/unit/public-api-routes.test.ts`.
- لتشغيل اختبار محدد: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## تصحيح الأخطاء

يُضيف خط الأنابيب دائمًا الترويسات التالية إلى الاستجابات:

```
x-request-id:               <معرّف الارتباط، يُعاد في نصوص الأخطاء>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

بالنسبة إلى الطلبات المُصادَق عليها، تتضمن ترويسات طلب المنبع (من جهة المعالج) أيضًا:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<آخر 4 أحرف> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (اختياري)
x-omniroute-auth-scopes:    قائمة مفصولة بفواصل
```

استخدم `assertAuth(req, expectedClass)` داخل المعالجات — إذ يرمي الخطأ `AuthzAssertionError` بالرمز `AUTHZ_NOT_INITIALIZED` إذا تم تجاوز البرمجية الوسيطة (وهو أمر مفيد لاكتشاف حالات التراجع في الإعدادات ضمن الاختبارات).

## انظر أيضًا

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — علامة المصادقة لكل نقطة نهاية
- [COMPLIANCE.md](../security/COMPLIANCE.md) — سجل التدقيق لأحداث المصادقة
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — نطاقات الأذونات الثلاثة ودليل نطاقات أدوات MCP
- المصدر: `src/server/authz/`، `src/lib/api/requireManagementAuth.ts`
