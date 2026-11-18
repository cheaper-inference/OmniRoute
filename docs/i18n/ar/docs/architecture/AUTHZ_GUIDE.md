# Authorization Guide (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **مصدر الحقيقة:** `src/server/authz/`، `src/shared/constants/publicApiRoutes.ts`، `src/lib/api/requireManagementAuth.ts`، `src/shared/utils/apiAuth.ts`
> **آخر تحديث:** 2026-09-22 — تشير مساحات أسماء النطاقات إلى MCP-SERVER.md

لدى OmniRoute مسار معالجة تخويل مُدرك للمسارات، يتحكم في كل طلب API. ويُعد التصنيف **حتميًا** و**مغلقًا عند الفشل** — فأي شيء يتعذر تصنيفه ينتهي به المطاف ضمن `MANAGEMENT` ويتطلب جلسة أو رمزًا مميزًا بمستوى الإدارة. تشرح هذه الصفحة النموذج للمهندسين الذين يتولون صيانة المسارات أو تصميم نقاط نهاية جديدة.

![مسار معالجة AuthZ (3 فئات للمسارات + تقييم السياسات)](../diagrams/exported/authz-pipeline.svg)

> المصدر: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## وضعا المصادقة

### 1. مفتاح API (Bearer)

يُستخدم مع واجهات عميل OpenAI/Anthropic/Gemini المتوافقة، ومع بعض مسارات الإدارة عندما يمتلك المفتاح نطاق `manage`.

```
Authorization: Bearer <api-key>
```

يُتحقق منه بواسطة `isValidApiKey()` / `extractApiKey()` في `src/sse/services/auth.ts`، ويُعاد تصديره عبر `src/shared/utils/apiAuth.ts`. يقبل المدقّق أيضًا متغيرَي البيئة `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` كمفاتيح تمرير دائمة (المشكلة #1350).

### 2. جلسة لوحة المعلومات (ملف تعريف الارتباط auth_token)

لصفحات لوحة المعلومات وعمليات الإدارة.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

لا تُعدّ ملفات تعريف الارتباط جلسةً إلا عندما يتم التحقق من JWT **ويحمل** الخاصية `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). يمر كل
مستهلك لملف تعريف الارتباط (حارس مسار لوحة المعلومات (`isDashboardSessionAuthenticated()`)، وتحديث مسار التفويض، ومصافحة WebSocket، والخادم المباشر،
و`/api/settings/require-login`، و`/api/auth/status`) عبر ذلك المساعد.
توجد رموز JWT أخرى موقعة باستخدام `JWT_SECRET` — إذ تُصدر واجهة Cursor CLI
رموزًا تحمل `iss "omniroute" / aud "cursor-cli"` لحاملي المفاتيح — لكنها ليست جلسات أبدًا
(#13298).

يتم التحقق منها بواسطة `isDashboardSessionAuthenticated()` في `src/shared/utils/apiAuth.ts`. يحدّث المسار JWT تلقائيًا عندما يتبقى على صلاحيته أقل من 7 أيام من عمره البالغ 30 يومًا.

يمكن أن تنتهي الجلسة أيضًا قبل انقضاء أيامها الثلاثين، لأن كل مُصدِر يمر عبر `mintDashboardSessionToken` (بوقت إصدار `iat` ومعرّف `jti`)، ويتحقق المدقّق من إعدادين: `sessionsValidAfter`، الذي يتم تعيينه عند تغيير كلمة المرور، بحيث يتوقف التحقق من كل جلسة أُصدرت قبله (ويحصل المتصفح الذي غيّر كلمة المرور على ملف تعريف ارتباط جديد)، و`revokedDashboardSessions`، الذي يضيف إليه `POST /api/auth/logout` قيمة `jti` الخاصة بالجلسة التي تم تسجيل الخروج منها. لا تحمل الجلسات المُصدرة بواسطة إصدار أقدم أيًا من هاتين الخاصيتين، وتظل صالحة حتى أول تغيير لكلمة المرور. وإذا تعذّر قراءة الإعدادات، فلا يُوثق بالجلسة.

تقبل بعض مسارات الإدارة **أيًا من** الوضعين: ملف تعريف الارتباط أو `Bearer <key>` عندما يمتلك مفتاح API نطاق `manage` (أو `admin`). وهذا ما يتيح سير عمل «القابل للتهيئة عبر استدعاءات API» المضاف في الإصدار v3.8.

#### بوابة تسجيل الدخول الاختيارية عبر OIDC (#6973)

يدعم تسجيل دخول مسؤول لوحة المعلومات أيضًا تدفق OIDC (OpenID Connect) **الاختياري** إلى جانب تسجيل الدخول الافتراضي باستخدام كلمة المرور — لا تتم إزالة تسجيل الدخول باستخدام كلمة المرور أبدًا، بل
تتم إضافته فقط:

- معطّل ما لم تكن `settings.oidcEnabled === true` **وكانت** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` مكوّنة جميعًا (الإعدادات → المصادقة).
  يعيد `GET /api/auth/oidc/login` الحالة `400` خلاف ذلك.
- يكتشف `GET /api/auth/oidc/login` نقطة النهاية `authorization_endpoint` من
  `/.well-known/openid-configuration` الخاصة بالمُصدِر (ويعود إلى
  `<issuer>/authorize` عند التعذر)، وينشئ معرّف URI لإعادة التوجيه من الطلب الوارد
  (مع مراعاة `x-forwarded-proto`)، ثم يعيد التوجيه إلى موفّر الهوية مع قيمة
  `state` عشوائية مخزّنة في ملف تعريف ارتباط `oidc_state` يحمل السمة `httpOnly`.
- يتحقق `GET /api/auth/oidc/callback` من `state`، ويستبدل رمز التفويض، ويتحقق من
  توقيع رمز ID عبر JWKS الخاصة بالمُصدِر (باستخدام `createRemoteJWKSet` من
  `jose`، مع التخزين المؤقت لكل URI خاص بـ JWKS)، إلى جانب فحوصات `issuer` /
  `audience`. يتطلب السماح بالدخول إلى لوحة التحكم قائمة `oidcAllowedSubjects`
  غير فارغة، أو سياسة `oidcAdmissionClaim`، أو كليهما. تطابق قائمة الموضوعات
  `sub` أو `email` فقط عندما تكون `email_verified === true`. تأخذ سياسة المطالبة
  الاختيارية مسار مطالبة مفصولًا بنقاط في رمز ID (مثلًا،
  `realm_access.roles`) ومصفوفة من القيم المقبولة؛ ويجب أن تكون المطالبة المحلولة
  مصفوفة من السلاسل النصية تحتوي على قيمة مقبولة واحدة على الأقل. إذا تم تكوين
  السياستين، فيجب أن تنجح كلتاهما. تؤدي المطالبات المفقودة أو غير الصحيحة إلى
  الرفض الآمن، وبدون أي من السياستين يرفض الاستدعاء تسجيل الدخول
  (`not_configured`). تستمر التكوينات الحالية المعتمدة على الموضوع فقط دون تغيير.
- يعيّن Keycloak عادةً أدوار النطاق إلى رموز الوصول، وليس بالضرورة إلى رموز ID.
  لطلب دور النطاق `admin`، كوّن مُعيّن بروتوكول لهذا العميل بحيث يضمّن
  `realm_access.roles` في **رمز ID** الخاص به، ثم عيّن
  `oidcAdmissionClaim` إلى `{ "path": "realm_access.roles", "values": ["admin"] }`.
  تحقّق من مطالبة رمز ID الفعلية لهذا العميل قبل تفعيل القبول المعتمد على الدور
  فقط؛ فالتطبيق لا يقرأ أدوار رموز الوصول. ويمكن لرفض الرمز من جانب موفّر الهوية
  أن يكمّل هذا الفحص من جانب التطبيق، لكنه لا يستبدله.
- عند النجاح، يُصدر **نفس** JWT الخاص بـ `auth_token` لمدة 30 يومًا الذي يصدره
  تسجيل الدخول باستخدام كلمة المرور (`src/app/api/auth/login/route.ts`)، ولذلك
  تظل بقية آلية جلسة لوحة التحكم (التحديث التلقائي، وسمات ملفات تعريف الارتباط)
  دون تغيير — إذ يستبدل OIDC فقط طريقة إصدار ملف تعريف الارتباط، وليس ما يمنحه.
  لا تؤدي التغييرات التي تطرأ على أدوار/مجموعات موفّر الهوية إلى إبطال جلسات
  OmniRoute الحالية؛ ولا يزال تسجيل الخروج أو تدوير كلمة المرور أو انتهاء الجلسة
  هو ما يحدد مدة صلاحيتها.
- يوجد كل إعداد من إعدادات `oidc*` (`oidcEnabled` و`oidcDisablePasswordLogin`
  و`oidcIssuer` و`oidcClientId` و`oidcClientSecret` و`oidcAllowedSubjects`
  و`oidcAdmissionClaim` و`oidcRedirectPath` و`oidcScopes`) ضمن
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): يعيد
  `PATCH /api/settings` القيمة `400 PASSWORD_REQUIRED` ما لم يتضمن الطلب كلمة
  مرور الإدارة باعتبارها `currentPassword` (ويعيد `401 PASSWORD_MISMATCH` عندما
  تكون غير صحيحة). يمنع `oidcDisablePasswordLogin` تسجيل الدخول باستخدام كلمة
  المرور (`POST /api/auth/login`) لكنه يحتفظ بتجزئة كلمة المرور المخزّنة، كما
  يظل التحقق من المصادقة يعاود فحص `currentPassword` مقابلها.
- يوجد `corsOrigins` و`bruteForceProtection` أيضًا ضمن
  `SECURITY_IMPACTING_SETTINGS_KEYS`: يؤدي تخفيف أيٍّ منهما إلى إضعاف وسائل
  حماية تسجيل الدخول، ولذلك يتطلبان إعادة المصادقة نفسها باستخدام
  `currentPassword` (وتطلبها علامة تبويب الأمان)، كما يتجاهلهما استيراد JSON.
- كل مفتاح من مفاتيح سياسة الأمان — أي إدخالات
  `SECURITY_IMPACTING_SETTINGS_KEYS`، وكل مفتاح `oidc*`، وحالة جلسة لوحة التحكم —
  مخصص **للمشغّل فقط** في `PATCH /api/settings`: ويُرفض مفتاح API ذي نطاق
  manage أو رمز وصول `oma_` مع `403` حتى عند إرساله `currentPassword` الصحيح،
  ويُسجّل الرفض تدقيقيًا باعتباره `settings.update_failed` مع
  `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` في
  `src/lib/api/operatorCredential.ts`). تظل الإعدادات العادية (السمة وتفضيلات
  العرض) قابلة للكتابة باستخدام مفتاح `manage` أو رمز وصول `admin`. كما يتطلب
  كل تغيير في `/api/settings` نفسه (وفي `/api/settings/require-login`) نطاق
  رمز الوصول `admin` (`ADMIN_MUTATION_EXACT_PATHS` في
  `src/server/authz/accessScopes.ts`، مع مطابقة المسار حرفيًا)؛ ويظل `GET`
  ضمن `read`، بينما تحتفظ المسارات الفرعية الأخرى ضمن `/api/settings/*`
  (الوكلاء، والإعدادات الافتراضية المجمّعة، والأسماء المستعارة للنماذج،
  والضغط، وعمليات الحذف… إلخ) بنطاق `write` المستنتج من الأسلوب.
- يتجاوز `POST /api/settings/import-json` إعادة المصادقة هذه، ولذلك يحذف كل مفتاح
  موجود في `IMPORT_STRIPPED_SETTINGS_KEYS` (في الملف نفسه) قبل الكتابة: كلمة
  المرور و`currentPassword`، وكل إدخال من إدخالات
  `SECURITY_IMPACTING_SETTINGS_KEYS`، وحالة جلسة لوحة التحكم
  (`sessionsValidAfter` و`revokedDashboardSessions`). ولذلك لا يمكن لاستيراد
  نسخة احتياطية أقدم إعادة إحياء جلسة أنهتها بالفعل عملية تغيير كلمة المرور أو
  تسجيل الخروج.

#### تسجيل الدخول الاختياري بالمصادقة الثنائية TOTP (#16619)

يُسجَّل من الإعدادات → الأمان؛ ويظل متوقفًا إلى أن يفعّله المشغّل
(`src/server/auth/dashboardMfa.ts`).

- **ما يغطيه:** تسجيل الدخول بكلمة المرور (`POST /api/auth/login`، الذي يحتاج بعد ذلك إلى
  `POST /api/auth/mfa/verify`) و`omniroute connect` (`POST /api/cli/connect`،
  الذي يرفض تبادلًا يعتمد على كلمة المرور فقط ويتلقى الرمز بصفته `totp`).
- **ما لا يغطيه:** تسجيل الدخول عبر OIDC / SSO (`/api/auth/oidc/callback`) لا
  يطلب TOTP الخاص بـ OmniRoute. فهو يعتمد على العامل الثاني الخاص بموفر الهوية،
  لذا يجب فرض MFA في موفر الهوية إذا كان OIDC مفعّلًا.
- **الاسترداد** (في حال فقدان الجهاز، أو عدم تبقي أي رموز استرداد، أو تعذّر
  التحقق من عامل ما، مثلًا بعد تغيير `STORAGE_ENCRYPTION_KEY`):
  1. أعد تشغيل الخادم مع `OMNIROUTE_DISABLE_MFA=true`.
  2. على المضيف نفسه (نظير loopback وقيمة `Host` الخاصة بـ loopback، مثل
     `http://localhost:20128`)، سجّل الدخول باستخدام كلمة المرور. يتم تخطي العامل الثاني لهذا المصدر فقط؛ بينما لا يزال كل مصدر آخر يحتاج إلى الرمز.
  3. في الإعدادات → الأمان → تعطيل، أدخل كلمة المرور واترك الرمز فارغًا. يقبل `POST /api/auth/mfa/disable` نصًا دون `code` فقط أثناء تعيين المتغير وعندما يأتي الطلب من المضيف؛ ولا يزال يتطلب جلسة لوحة المعلومات وكلمة المرور الحالية، ويُسجّل في سجل التدقيق باسم `auth.mfa.disabled` مع `secondFactor: "recovery_switch"`.
  4. ألغِ تعيين `OMNIROUTE_DISABLE_MFA`، وأعد التشغيل، وسجّل العوامل من جديد إذا لزم الأمر.

## فئات الطريق

`src/server/authz/types.ts` يحدد ثلاث فئات؛ أي طريق لا يمكن تصنيفه بشكل حتمي يعود إلى `MANAGEMENT`.

| فصل          | وصف                                                                                                                                                                       | المصادقة مطلوبة                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `PUBLIC`     | طرق آمنة بشكل صريح تسجيل الدخول — ، تسجيل الخروج، الحالة، الصحة، onboarding bootstrap.                                                                                    | لا أحد                                                      |
| `CLIENT_API` | نقاط نهاية خدمة النماذج — `/api/v1/*` `/api/v1beta/*` بالإضافة إلى الأسماء المستعارة `/v1/*` و `/v1beta/*` و `/chat/completions` و `/responses` و `/models` و `/codex/*`. | مفتاح الحامل عند تمكين علامة ميزة `REQUIRE_API_KEY` الفعالة |
| `MANAGEMENT` | صفحات لوحة المعلومات والإعدادات والموفرين والمفاتيح والمسؤول ونقاط نهاية التشخيص.                                                                                         | جلسة لوحة القيادة OR Bearer مع نطاق `manage`                |

هناك عدد قليل من الإجراءات `MANAGEMENT`** المشغل فقط** : مفتاح `manage` لا يكفي. تصدير بيانات الاعتماد المخزنة (`GET /api/settings/export-json` و `GET /api/db-backups/export` و `GET /api/db-backups/exportAll`) واستعادة نسخة احتياطية على البيانات المباشرة (`POST /api/db-backups/import` بما في ذلك `dryRun=true` و `POST /api/db-backups` استعادة بواسطة المعرف و `POST /api/settings/import-json`) وتدمير نقاط الاستعادة ( تنظيف `DELETE /api/db-backups` و `PATCH /api/db-backups` لأن الاحتفاظ بها المستمر يؤدي إلى التقليم التلقائي بعد كل نسخة احتياطية) يتطلب جلسة لوحة معلومات، أو موضوع CLI المحلي، أو تعطيل تسجيل الدخول. يتطلب إصدار رمز المزامنة (`POST /api/sync/tokens`) وسك رمز وصول `admin` CLI (`POST /api/cli/tokens`) جلسة لوحة معلومات أو موضوع CLI المحلي في كل وضع تسجيل دخول. مفاتيح API من أي نطاق ورموز الوصول `oma_` ليست بيانات اعتماد المشغل: فهي تحصل على `403` عندما يكون ذلك مطلوبًا. الشيك موجود في `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). تغيير إعدادات تسجيل الدخول هو للمشغل فقط أيضًا: `POST /api/settings/require-login` (تعيين كلمة مرور الإدارة / تبديل `requireLogin`) يقبل فقط بيانات الاعتماد هذه بمجرد وجود كلمة مرور — نافذة التمهيد التي تم تشغيلها لأول مرة (لا توجد كلمة مرور حتى الآن) لم تتغير — ويجب أن ترسل جلسة لوحة المعلومات `currentPassword` لاستبدال كلمة المرور (`403` عندما تكون مفقودة أو خاطئة، يتم تدقيقها كـ `settings.update_failed`). يحتفظ CLI المحلي والمثيل الذي تم تعطيل تسجيل الدخول بمسار الاسترداد وقد يقومان بتعيين كلمة مرور بدونه، حيث أن كلاهما مرتبطان بالمضيف الذي يمتلك دليل البيانات.

## خط أنابيب

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

الرؤوس الداخلية الموثوقة (المحددة في `src/server/authz/headers.ts`) هي** جردت من الطلبات الواردة** قبل التصنيف، لا يمكن لعملاء — تعبئة `x-omniroute-auth-*` مسبقًا لانتحال شخصية موضوع ما.

### عقود السياسة

كل فئة مسار لها سياسة في `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — يُرجع دائمًا `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — يستخرج Bearer، ويتم التحقق من صحته عبر `validateApiKey()`. يصل إلى المجهول فقط عند تعطيل علامة ميزة `REQUIRE_API_KEY` الفعالة. يتم حل العلامة الفعالة من خلال `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) لذا فإن علامات ميزات لوحة المعلومات ومتغيرات البيئة تحكم `/api/v1/*` و `/api/v1beta/*` والأسماء المستعارة بشكل متسق؛ فشل محلل مغلقة. يسمح بطلبات جلسة لوحة المعلومات على مسارات API للعميل (بما في ذلك `/api/v1/models`، المستخدمة بواسطة كتالوج نموذج لوحة المعلومات). عند تمكين Entra ID SSO ، تتم معالجة الحامل الذي يمثل رمز Entra من الناحية الهيكلية (ثلاثة مقاطع base64url، `RS*` alg، `kid`) بواسطة فرع SSO** قبل** `validateApiKey()` وحكمه نهائي — فهو لا يصل أبدًا إلى مسار مفتاح واجهة برمجة التطبيقات (API) أو الفرع الذي يتحول إلى مجهول، لذلك لا يمكن أن يصبح انقطاع موفر الهوية وصولاً مفتوحًا. لا تتأثر مفاتيح API الثابتة. انظر [إنترا ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) يقبل — جلسة لوحة المعلومات، أو طلبات مزامنة النموذج الداخلي (المتطابقة مع `/api/providers/[name]/(sync-models|models)`)، أو يتخطى كليًا إذا أعاد `isAuthRequired()` خطأ. تُرجع 403 (`AUTH_001`) في حالة وجود رمز حامل ولكنه غير صالح، وتُرجع 401 بخلاف ذلك. يفرض أيضًا طبقات حماية الطريق (LOCAL_ONLY / ALWAYS_PROTECTED) قبل أي فرع مصادقة — راجع [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). يمكن الوصول إلى مسارات LOCAL_ONLY في `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (اليوم: `/api/mcp/`) من دون استرجاع عندما يحمل المفتاح Bearer نطاق `manage` ؛ تظل كافة مسارات LOCAL_ONLY الأخرى ذات استرجاع صارم بغض النظر عن النطاق.

السياسة الناجحة ترجع `AuthSubject` مع `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. يمكن للمعالجات النهائية قراءتها عبر `assertAuth(request, "CLIENT_API")` في `src/server/authz/assertAuth.ts` بدلاً من إعادة تشغيل منطق المصادقة.

## قائمة الطرق العامة

`src/shared/constants/publicApiRoutes.ts` هي القائمة المسموح بها الصريحة:

القائمة مقسمة حسب** شكل** ، والتقسيم حامل (GHSA-74g9-q8f6-793h): تتم مطابقة البادئة مع `startsWith()`، لذا فهي تتطابق أيضًا مع كل مسار مجاور يتقاسم أحرفه الرئيسية. `/api/usage/om-usage` كبادئة تم وضع علامة `/api/usage/om-usage<anything>` PUBLIC عليها، ويحل Next ذلك إلى `/api/usage/[connectionId]` — معالج بدون مصادقة خاصة به.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

طرق القراءة فقط عامة** فقط** للطرق الآمنة. ملاحظة: `classifyRoute()` تستبعد `/api/v1/*` و `/api/v1beta/*` من PUBLIC Fall-through — وهما دائمًا `CLIENT_API` لذا تظل سياسة Bearer-key سارية.

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

## المصادقة مطلوبة للتبديل

`isAuthRequired()` في `src/shared/utils/apiAuth.ts` يقرر ما إذا كان** أي** يتم فرض المصادقة على الطلب:

- تم تعطيل مصادقة `settings.requireLogin === false` → عالميًا، باستثناء الطبقة المحمية دائمًا (راجع [طبقات حماية الطريق](../security/ROUTE_GUARD_TIERS.md) ) والمكالمات التي توزع بيانات اعتماد تقبلها، والتي تحتاج إلى نفس بيانات الاعتماد كما هو الحال عند تسجيل الدخول: إصدار رموز المزامنة، وسك رموز وصول CLI في أي نطاق، وإنشاء مفتاح API باستخدام نطاق `manage`/`admin` ، ومنح هذا النطاق لمفتاح، أو إعادة إنشاء مثل هذا المفتاح أو الكشف عنه (`requireCredentialForManagementScopedKey()` في `src/lib/api/requireManagementAuth.ts`). تظل مفاتيح الاستدلال فقط مفتوحة. كتابة علامة ميزة محمية (`REQUIRE_API_KEY`، وعلامات الأمان الأخرى، وإشارات SSRF / TLS / MCP-scope / sandbox المدرجة في [علامات الميزات](../reference/FEATURE_FLAGS.md#rest-api) ) وحفظ إعدادات إخفاء PII (`PUT /api/settings/pii`) تظل أيضًا بحاجة إلى بيانات اعتماد.
- لم يتم تكوين كلمة مرور** و** لا يسمح وضع `INITIAL_PASSWORD` env var → bootstrap بمعالج الإعداد وطلبات الاسترجاع، لكن طلبات الشبكة المكشوفة لا تزال بحاجة إلى بيانات الاعتماد. استثناء: كتابة علامة ميزة محمية وحفظ إعدادات إخفاء PII (`PUT /api/settings/pii`) تحتاج إلى بيانات اعتماد حتى من الاسترجاع، لذا فإن الاسترجاع في حد ذاته لا يكفي هناك.
- أي خطأ DB فشل → في إغلاقه (آمن بشكل افتراضي).

يستخدم تطبيق مفتاح API للعميل `isRequireApiKeyEnabled()` في `src/shared/utils/featureFlags.ts`، وليس قراءة `process.env.REQUIRE_API_KEY` مباشرة. هذا مهم بالنسبة للمثيلات المنشورة: يؤدي تبديل `REQUIRE_API_KEY` في Dashboard → Features Flags إلى تخزين تجاوز DB ويؤثر على الفور على `/v1/*` و `/v1beta/*` `/models` `/responses` و `/chat/completions` و `/codex/*` وغيرها من عمليات التحقق من مصادقة واجهة برمجة التطبيقات الخاصة بالعميل والتي تشترك في هذا المساعد. إذا تعذرت قراءة مخزن علامة الميزة، فسيفشل إغلاق مصادقة العميل API ويتطلب مفتاحًا.

## تغيير غير متوافق — v3.8.0

أصبحت نقطتا النهاية `/api/v1/agents/tasks/*` و`/api/resilience/model-cooldowns` **تتطلبان الآن مصادقة إدارية** (الالتزام `588a0333`). تتلقى تطبيقات العميل التي كانت ترسل سابقًا مفتاح API عاديًا من دون نطاق `manage` استجابة `403`. الترحيل: امنح المفتاح نطاق `manage` من لوحة معلومات API Keys، أو استخدم جلسة مسجَّلة الدخول في لوحة المعلومات.

## تغيير في السلوك — v3.8.2

لا يزال `/api/mcp/*` (خادم MCP البعيد) مضبوطًا افتراضيًا على LOCAL_ONLY، لكنه يقبل الآن الطلبات غير الواردة من عنوان الاسترجاع المحلي عندما يحمل الترويس `Authorization: Bearer <api-key>` نطاق `manage`. يُقيَّد هذا الاستثناء صراحةً لكل مسار عبر `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` في `src/server/authz/routeGuard.ts`؛ أما بادئة LOCAL_ONLY الشقيقة `/api/cli-tools/runtime/*` فلا يمكن تجاوزها عمدًا لأنها تستطيع تشغيل عمليات فرعية عشوائية. تستمر الطلبات المجهولة إلى `/api/mcp/*` من عناوين غير محلية في تلقي `403 LOCAL_ONLY` — ويظل الإعداد الافتراضي لأي مسار LOCAL_ONLY جديد مقتصرًا بصرامة على الاسترجاع المحلي. راجع [مستويات حارس المسارات](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## الاختبار

- اختبارات الوحدة: `tests/unit/authz/` — `classify.test.ts` و`pipeline.test.ts` و`client-api-policy.test.ts` و`management-policy.test.ts` و`public-policy.test.ts`.
- قائمة السماح العامة: `tests/unit/public-api-routes.test.ts`.
- لتشغيل اختبار محدد: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## تصحيح الأخطاء

يقوم المسار دائمًا بختم الاستجابات بـ:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

بالنسبة للطلبات التي تمت مصادقتها، تتضمن رؤوس الطلب الأولية (جانب المعالج) أيضًا ما يلي:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

استخدم `assertAuth(req, expectedClass)` داخل المعالجات — حيث يرمي `AuthzAssertionError` بالكود `AUTHZ_NOT_INITIALIZED` إذا تم تجاوز البرنامج الوسيط (مفيد في اكتشاف تراجعات التكوين في الاختبارات).

## انظر أيضًا

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — علامة المصادقة لكل نقطة نهاية
- [COMPLIANCE.md](../security/COMPLIANCE.md) — سجل التدقيق لأحداث المصادقة
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — نطاقات الأذونات الثلاثة ودليل نطاقات أدوات MCP
- المصدر: `src/server/authz/`، `src/lib/api/requireManagementAuth.ts`
