# Remote Mode (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

شغّل واجهة سطر الأوامر `omniroute` على حاسوبك المحمول بينما يعمل OmniRoute نفسه في مكان آخر
(خادم VPS، أو خادم منزلي، أو جهاز آخر على شبكة Tailnet الخاصة بك). تسجّل الدخول مرة واحدة باستخدام
`omniroute connect`، ومنذ ذلك الحين يستهدف **كل** أمر في واجهة سطر الأوامر ذلك الخادم البعيد
— الأوامر نفسها والمخرجات نفسها، لكن التنفيذ يتم على الخادم البعيد.

لا توجد أداة ثانية لتثبيتها: الوضع البعيد هو واجهة سطر الأوامر العادية `omniroute`
بالإضافة إلى **رموز وصول** محددة النطاق.

```bash
npm install -g omniroute                 # واجهة سطر الأوامر العادية
omniroute connect 192.168.0.15           # تسجيل الدخول (كلمة المرور ← رمز محدد النطاق)
omniroute models list                    # ← يسرد الآن نماذج الخادم البعيد
omniroute configure codex                # ← ينشئ ملف تعريف Codex محليًا من الكتالوج البعيد
```

---

## آلية العمل

```
حاسوبك المحمول                           OmniRoute البعيد (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ واجهة omniroute    │  POST /api/cli/connect  (كلمة المرور ← رمز)       │
│  السياق: vps       │ ───────────────►  │ يُصدر رمز وصول محدد النطاق    │
│  baseUrl، الرمز    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ كل مسارات الإدارة، مع التحقق  │
│ يكتب الإعدادات     │ ◄───────────────  │ من نطاق الرمز لكل مسار        │
│ محليًا             │                   └───────────────────────────────┘
└────────────────────┘
```

- تخزّن **السياقات** خادمًا واحدًا لكل منها (`~/.omniroute/config.json`، `chmod 600`).
  يبدّل `omniroute contexts use <name>` الخادم النشط؛ ويكون `default` محليًا.
- تخوّل **رموز الوصول** (`oma_live_…`) تنفيذ أوامر الإدارة. وهي
  تختلف عن مفاتيح API الخاصة بالاستدلال (`sk-…`، المستخدمة مع `/v1/chat/completions`).
- لا يُخزّن على الخادم سوى تجزئة SHA-256 للرمز. ويُعرض النص الصريح
  **مرة واحدة فقط** عند الإنشاء.

---

## الاتصال

### باستخدام كلمة مرور الإدارة (التهيئة الأولية)

```bash
omniroute connect 192.168.0.15
# كلمة مرور الإدارة لـ http://192.168.0.15:20128: ********
# ✔ تم الاتصال بـ http://192.168.0.15:20128 — السياق '192.168.0.15' (النطاق: admin)
```

تُصدر آلية كلمة المرور رمز **admin** افتراضيًا (بما أنك تملك كلمة المرور،
فلديك بالفعل تحكم كامل). قلّل النطاق باستخدام `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

الخيارات: `--port <p>` (عندما لا يتضمن المضيف منفذًا)، و`--name <ctx>` (اسم السياق)،
و`--scope read|write|admin`. يُستخدم عنوان URL الكامل كما هو:
`omniroute connect https://omni.example.com`.

### باستخدام رمز مُنشأ مسبقًا

أنشئ رمزًا محدد النطاق في لوحة التحكم (أو باستخدام `omniroute tokens create`) ثم
الصقه — لا حاجة إلى كلمة مرور:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

تتحقق واجهة سطر الأوامر منه عبر `GET /api/cli/whoami` وتحفظه بوصفه السياق النشط.

---

## النطاقات

ثلاثة مستويات هرمية (`admin ⊃ write ⊃ read`):

| النطاق  | ما يمكنه فعله                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------- |
| `read`  | العرض/الفحص — `models list`، و`providers status`، و`logs`، و`usage`، و`cost`                    |
| `write` | القراءة **+** التهيئة/التطبيق — `setup-codex`، و`keys add`، و`config set`، والتركيبات           |
| `admin` | الكتابة **+** الإدارة — عمليات CRUD على `tokens`، وإضافة المزوّدين، والخدمات، والسياسات، وoauth |

يستنتج الخادم النطاق الذي يتطلبه كل مسار من طريقة HTTP
(`GET`←قراءة، والتعديلات←كتابة)، بالإضافة إلى قائمة سماح للمشرف للأسطح الحساسة
(`/api/cli/tokens`، وتعديلات `/api/providers`، و`/api/oauth`، و`/api/services`، …).
يحصل الرمز ذو النطاق غير الكافي على `403` مع رسالة واضحة.

> تظل المسارات التي تُنشئ عمليات (`/api/services/*`، و`/api/mcp/*`، …)
> **مقصورة على loopback** — ولا يمكن لرمز بعيد الوصول إليها مطلقًا، بغض النظر عن نطاقه.

---

## توصيل Antigravity في تثبيت بعيد

يستخدم Antigravity شاشة موافقة firstparty/nativeapp من Google. لا تُصدر Google
رمز التفويض إلا عندما تكون **إعادة توجيه loopback**
(`http://127.0.0.1:<port>/callback`) **قابلة للوصول من المتصفح الذي
يوافق على تسجيل الدخول**. في تثبيت بعيد على VPS، يكون عنوان loopback هذا موجودًا على
الخادم، لا على جهازك، ولذلك **تظل شاشة الموافقة معلّقة إلى الأبد ولا
تُصدر أي رمز** — وبالتالي لا يتوفر أي شيء للصقه عبر خيار الرجوع المعتاد «لصق عنوان URL الخاص بردّ الاتصال».
(هذا قيد من جانب Google: يحدث التعليق نفسه في أي وكيل
يستخدم عميل سطح المكتب المضمّن في Antigravity، وليس في OmniRoute وحده.)

تكتشف لوحة المعلومات ذلك قبل أن تعلق: عند فتح **Providers → Antigravity →
Connect** من عنوان غير localhost، يُستبدل إشعار «نسخ عنوان URL الخاص بردّ الاتصال»
العام بالحلّين أدناه، مع ملء المضيف والمنفذ الخاصين بك مسبقًا في كل منهما.
(يُحتسب عنوان LAN أيضًا — إذ لا يُعد `192.168.x.x` عنوان localhost فيما يتعلق
بردّ الاتصال هذا.)

توجد طريقتان مدعومتان لتوصيل Antigravity إلى OmniRoute بعيد.

### الخيار A — مساعد تسجيل الدخول المحلي (موصى به)

شغّل OAuth على **جهاز الكمبيوتر الخاص بك**، حيث يمكن الوصول إلى `127.0.0.1`. يتصل المساعد
مباشرةً بـ Google، ولذلك تكتمل الموافقة في المكان الذي يتعذر فيه على نسخة لوحة المعلومات
إكمالها.

**إذا كنت متصلًا بالفعل** (`omniroute connect <host>`)، فلا يوجد شيء
لنسخه — إذ يرسل المساعد بيانات الاعتماد إلى ذلك التثبيت نيابةً عنك:

```bash
# على جهازك المحلي (يتطلب Node.js + متصفحًا):
omniroute connect 192.168.0.15        # مرة واحدة — يُصدر رمز سياق بنطاق صلاحيات المسؤول
npx omniroute login antigravity
#   ↳ يفتح شاشة موافقة Google، ويلتقط ردّ الاتصال على منفذ loopback محلي،
#     ويبادله، ثم يرسل بيانات الاعتماد عبر POST إلى السياق النشط:
#
#   تم توصيل Antigravity على http://192.168.0.15:20128 (الاتصال abc123).
#   لا شيء للصقه — يمكنك إغلاق هذه الوحدة الطرفية.
```

يحدث الإرسال تلقائيًا كلما كان السياق النشط يشير إلى جهاز آخر.
يمكنك فرضه في أي من الاتجاهين باستخدام `--push` / `--no-push`، أو استهداف سياق
محدد باستخدام `--context <name>`.

**إذا تعذر على جهازك الوصول إلى VPS** (بسبب جدار حماية، أو عدم توفر SSH، أو وجوده في بيئة معزولة)، فسيظل
المساعد يعمل — فهو لا _يحتاج_ إلا إلى Google. استخدم `--no-push`، أو اترك
الإرسال يفشل فحسب: إذ سيعود إلى طباعة الكتلة بدلًا من التخلص من
تفويض أكملته بالفعل.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

بعد ذلك، في لوحة المعلومات **البعيدة**: **Providers → Antigravity → Connect**، والصق
كتلة `omniroute-cred-v1.…` في حقل **الخطوة 2** (يقبل إما
عنوان URL لردّ الاتصال أو كتلة بيانات اعتماد). يفك OmniRoute ترميزها، ويشغّل عملية تهيئة Cloud Code
على جانب الخادم، ويحفظ الاتصال.

> تحتوي الكتلة على رمز تحديث — تعامل معها ككلمة مرور. في مسار الإرسال،
> تُرسل مرة واحدة عبر اتصال السياق الموثّق؛ وفي مسار اللصق، عبر
> اتصال لوحة المعلومات. وفي كلتا الحالتين تُخزّن مشفّرة أثناء السكون، ولا تؤدي
> عملية الإرسال الناجحة مطلقًا إلى طباعتها في وحدتك الطرفية.

الخيارات: `--no-browser` (طباعة عنوان URL بدلًا من فتحه تلقائيًا)، و`--port <n>`
(تثبيت منفذ loopback)، و`--timeout <ms>`، و`--push` / `--no-push` (تجاوز
التسليم التلقائي)، و`--context <name>` (استهداف سياق محدد).

### الخيار B — نفق إعادة توجيه محلي عبر SSH

إذا كان لديك وصول إلى VPS عبر SSH، فأعِد توجيه منفذ لوحة المعلومات بحيث يعود
ردّ اتصال loopback إلى الخادم عبر النفق:

```bash
# على جهازك المحلي:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# ثم افتح http://localhost:20128 في متصفحك المحلي، ووصّل Antigravity
# بالطريقة المعتادة — إذ تصل الآن إعادة التوجيه 127.0.0.1:20128/callback إلى VPS عبر SSH.
```

لأنك تصل إلى لوحة المعلومات عبر `localhost:20128`، تكتمل موافقة Google
ويُسلَّم ردّ الاتصال إلى الخادم عبر النفق نفسه —
ولا حاجة إلى كتلة. أبقِ النفق مفتوحًا حتى يظهر الاتصال على أنه نشط.

على خلاف مزوّدي loopback الثابت أدناه، **تكفي عملية إعادة توجيه واحدة** هنا:
إذ يستخدم ردّ اتصال Antigravity منفذ لوحة المعلومات نفسه، ولذلك لا يوجد منفذ ثانٍ
خاص بالمزوّد يتعين تمريره عبر النفق.

> يتوفر بديل يعمل بالكامل دون واجهة رسومية (لا مساعد ولا نفق)، وهو إعداد بيانات اعتماد الويب
> **الخاصة بك** لـ Google OAuth مع عنوان URL أساسي عام؛ راجع متغيرات بيئة OAuth
> الخاصة بالمزوّد. لا يتطلب الخياران أعلاه أي إعداد إضافي في Google.

---

## توصيل Codex / Grok في تثبيت بعيد (موفّرو الاسترجاع الحلقي الثابت)

تُسجّل Codex وxAI ‏(`xai-oauth`) وGrok CLI ‏(`grok-cli`) عنوان
`redirect_uri` **ثابتًا** للاسترجاع الحلقي مع تطبيق OAuth التابع لها. لا يمكن لـ OmniRoute تغييره — إذ
يعيد الموفّر المتصفح دائمًا إلى العنوان نفسه المضمّن مسبقًا:

| الموفّر     | عنوان الاسترجاع الثابت الذي يعيد الموفّر التوجيه إليه |
| ----------- | ----------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                 |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                     |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                     |

يشير `localhost` هنا إلى **الجهاز الذي يعمل عليه المتصفح**، بينما يستمع خادم
استرجاع PKCE الخاص بـ OmniRoute على الواجهة الحلقية **للخادم**. إذا فتحت لوحة المعلومات عبر
عنوان LAN مثل `http://192.168.0.15:20128` فلن يلتقي الطرفان أبدًا: إذ يُسلَّم رمز
التفويض إلى `localhost:1455` على حاسوبك المحمول، حيث لا توجد خدمة تستمع،
ويفشل الموفّر في تسجيل الدخول من دون إظهار خطأ.

تكتشف لوحة المعلومات هذا قبل فتح النافذة المنبثقة وتعرض أمر النفق
بدلًا من السماح بفشل تسجيل الدخول بصمت (#8046).

### الإصلاح — إعادة توجيه **كلا** المنفذين

```bash
# على الجهاز الذي يعمل عليه المتصفح:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# ثم انتقل إلى http://localhost:20128 وصِل Codex من هناك
```

يلزم إعداد عمليتَي إعادة توجيه، وستظل العملية تفشل إذا أُعيد توجيه منفذ واحد فقط:

- **`20128`** (منفذ لوحة المعلومات) يجعل المصدر localhost محليًا فعليًا، وهذا ما
  يدفع OmniRoute إلى تشغيل خادم استرجاع PKCE أصلًا — فمصدر LAN لا
  يصل إلى ذلك الفرع أبدًا.
- **`1455`** (منفذ الاسترجاع الثابت للموفّر) هو الوجهة التي يُعاد المتصفح
  إليها؛ لذا يجب تمريره عبر النفق إلى الواجهة الحلقية للخادم.

استبدل `1455` بـ `56121`/`56122` عند توصيل xAI أو Grok CLI، واستبدل `20128`
بمنفذ لوحة المعلومات الفعلي لديك. أبقِ النفق مفتوحًا حتى يظهر الاتصال على أنه
نشط.

> **لا يتوفر وصول SSH؟** تقبل Codex وGrok CLI أيضًا رمزًا ملصقًا — عبر علامة التبويب **Paste API
> Key** / **Import auth.json** في مربع حوار الاتصال. لا يستخدم هذا المسار عنوان استرجاع
> حلقيًا، ولذلك يعمل من أي مصدر. تقبل Codex أيضًا رمز وصول مجردًا
> أو بيانات جلسة `~/.codex/auth.json`.

---

## إدارة الرموز

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ يطبع السر مرة واحدة فقط، فانسخه الآن
omniroute tokens list                 # مُقنّعة: المعرّف والاسم والنطاق والبادئة والحالة والانتهاء
omniroute tokens revoke <id|prefix>   # إلغاء فوري
omniroute tokens scopes               # شرح النطاقات الثلاثة
```

تتطلب أوامر `tokens` بيانات اعتماد من نوع **admin**. ويمكنك أيضًا إدارة الرموز في
لوحة التحكم ضمن **Settings ← Access Tokens** (الإنشاء، والإلغاء، والنسخ مرة واحدة).

لا يمكن سكّ رمز بصلاحيات أعلى مما يملكه منشئه. ولا يُنشئ رمز `admin` إلا المشغّل: أي جلسة لوحة التحكم، أو CLI المحلية على الخادم نفسه، أو `omniroute connect` مع كلمة المرور. وتستطيع بيانات الاعتماد الآلية (رمز وصول `admin`، أو مفتاح API بنطاق `manage`/`admin`) سكّ رموز `write` و`read` فقط، فإذا طلبت `--scope admin` تُعيد `403`. وتعطيل تسجيل الدخول لا يفتح باب السكّ: فرمز الوصول بأي نطاق هو بيانات اعتماد تقبلها المسارات المصادَقة دائمًا، فيتلقى الاستدعاء المجهول الخطأ `401` مهما كان النطاق.

---

## إعداد CLI للبرمجة من كتالوج البعيد

يقرأ `omniroute configure` كتالوج النماذج الحي للخادم **النشط**، ويكتب إعدادًا على **جهازك** أنت.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Wrote ~/.codex/glm52.config.toml
#   Use it:  codex --profile glm52

# غير تفاعلي
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# أبقِ نموذجًا كثير الاستخدام في أعلى منتقي التفاعل
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

يحتفظ المنتقي بمعرّفات النماذج فقط (دون عناوين URL أو بيانات اعتماد) في الملف المحلي
`model-preferences.json`، مُحدَّدةً بالسياق وهدف CLI. وتظهر المفضلات قبل الاختيارات الأخيرة، ويزيل `--unfavorite` النموذج المختار من قائمة ذلك السياق/الهدف.

يشير الملف الشخصي المكتوب إلى مفتاح الاستدلال عبر متغير البيئة (`OMNIROUTE_API_KEY`)، فلا يُكتب السر على القرص أبدًا. أما الإعداد الأساسي لمرة واحدة في Codex (كتلة `[model_providers.omniroute]`) فانظر [دليل إعداد Codex CLI](./CODEX-CLI-CONFIGURATION.md).

### تشغيل CLI مقابل الخادم البعيد (دون كتابة إعداد)

يحترم `omniroute run <target>` السياق النشط أيضًا: يُحقن عنوان URL الأساسي للخادم البعيد وبيانات اعتماد السياق في العملية المُشغَّلة فقط.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code ← البعيد
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# معاينة ما سيُشغَّل بالضبط (أسماء مفاتيح البيئة فقط، لا قيمها):
omniroute run codex --dry-run --json
```

الأهداف: `claude` و`codex` و`aider` و`goose` و`opencode` و`qwen` و`gemini`
(المصدر الوحيد: `bin/cli/cli-manifest.mjs`). ويعمل Qwen وGemini بمجلد منزل معزول ومؤقت يُحذف عند الخروج، فلا يمسّ التشغيل إعدادات أدواتك الشخصية ولا يتسرب إليها.

### أوامر الإعداد لكل CLI

كل CLI مدعومة لها أمر إعداد يدرك الخادم البعيد (وكلها تحترم السياق النشط، أو `--remote <url> --api-key <key>`):

| CLI         | Command                    | What it writes                                                                                                                                                              |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | ملفات تعريف `~/.codex/<name>.config.toml` (لكل نموذج)                                                                                                                       |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (لكل نموذج)                                                                                                                       |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json`: مزوّد `omniroute` المتوافق مع openai مع كل نماذج الكتالوج (شغّل `opencode -m omniroute/<model>`)                                        |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (وضع CLI) + يطبع إعدادات امتداد VS Code لتلصقها (متوافق مع OpenAI، وعنوان Base URL **دون** `/v1`)                                |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + إعدادات `kilocode.*` لـ VS Code، متوافقة مع OpenAI، وعنوان Base URL **مع** `/v1`                                                    |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI الأمر `cn`): `provider: openai`، و`apiBase` **مع** `/v1`، والمفتاح عبر `${{ secrets.OMNIROUTE_API_KEY }}`                |
| Cursor      | `omniroute setup-cursor`   | يطبع خطوات داخل التطبيق (Settings ← Models ← Override OpenAI Base URL **مع** `/v1` + المفتاح + النموذج). إعداد Cursor قاعدة SQLite مُعتمة، ونافذة الدردشة فقط               |
| Roo Code    | `omniroute setup-roo`      | يكتب ملف JSON لاستيراد Roo (`~/.omniroute/roo-settings.json`) ويضبط `roo-cline.autoImportSettingsPath` ويطبع خطوات الواجهة (متوافق مع OpenAI، وعنوان Base URL **مع** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json`: مزوّد `openai-compat`، و`base_url` **مع** `/v1`، والمفتاح عبر `$OMNIROUTE_API_KEY`                                                            |
| Zed         | `omniroute setup-zed`      | `~/.config/zed/settings.json`: `language_models.openai_compatible.omniroute`، و`api_url` **مع** `/v1`، ويقرأ Zed المفتاح من `$OMNIROUTE_API_KEY` (ولا يُكتب أبدًا)          |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **دون** `/v1` + `GOOSE_MODEL`) + وصفة بيئة (env recipe)                                              |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **دون** `/v1` + `model: openai/<id>`) + وصفة بيئة (`aider --message --yes`)                                                          |
| Qwen Code   | `omniroute setup-qwen`     | إدخال `modelProviders.openai` بالإصدار V4 في `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` في `~/.qwen/.env`                                                                |

```bash
# OpenCode (مزوّد متوافق مع openai، كل نماذج الكتالوج، VPS بعيد)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # أبقِ النماذج المطابقة فقط
opencode -m omniroute/glm/glm-5.2 "..."          # صدّر OMNIROUTE_API_KEY أولًا
```

> يتوفر لدى OpenCode أيضًا تكامل **إضافة** أغنى: إذ يثبّت `omniroute setup opencode`
> (الذي صار يدرك الخادم البعيد عبر `--remote`) الحزمة `@omniroute/opencode-plugin`.
> و`setup-opencode` بديل أخف يتوافق مع openai. ويُشار إلى مفتاح API عبر
> `{env:OMNIROUTE_API_KEY}` ولا يُكتب على القرص أبدًا.
>
> على OpenCode v2 استخدم `@omniroute/opencode-plugin-v2` بدلًا منه: الكتالوج نفسه، لكن
> عقد المحمّل مختلف. فهو يقرأ المفتاح من مخزن بيانات الاعتماد الخاص بـ OpenCode عندما يكون
> التكامل متصلًا، لذلك لا يحتاج الخادم البعيد إلى أي مفتاح في `opencode.json`.

---

## إدارة السياقات (التبديل بين الخوادم)

**السياق** هو خادم محفوظ (baseUrl + credential + scope). ينشئ `omniroute connect` سياقًا ويجعله نشطًا؛ ومنذ ذلك الحين تستهدف كل الأوامر هذا السياق. قم بإدارتها والتبديل بينها باستخدام `omniroute contexts`:

```bash
omniroute contexts list            # جميع السياقات؛ يتم تمييز السياق النشط بـ ●
omniroute contexts current         # الخادم النشط، حالة المصادقة، النطاق
```

```text
  | الاسم   | عنوان URL الأساسي         | المصادقة | النطاق | الوصف
● | vps     | http://100.67.86.91:20128 | token | admin | OmniRoute عن بعد (…)
  | default | http://localhost:20128    | ✗     |       |
```

**تبديل الخوادم** — يتبع كل أمر لاحق السياق النشط:

```bash
omniroute contexts use vps         # → جميع الأوامر تستهدف الآن الخادم الافتراضي الخاص (VPS) البعيد
omniroute tokens list              #   (يعمل على الخادم الافتراضي الخاص (VPS))

omniroute contexts use default     # → العودة إلى localhost
omniroute tokens list              #   (يعمل على الخادم المحلي)
```

**إضافة سياق يدويًا** (بدلاً من `connect`)، أو فحصه، أو إعادة تسميته:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "صندوق الاختبار"
omniroute contexts show staging    # التفاصيل الكاملة لسياق واحد
omniroute contexts rename staging stg
```

**إزالة سياق** — يطلب تأكيدًا؛ مرر `--yes` لتخطيه (مطلوب للنصوص البرمجية / الصدف غير التفاعلية، والتي ترفض بأمان بخلاف ذلك):

```bash
omniroute contexts remove stg --yes
```

> لا يمكن إزالة `default` (localhost). تؤدي إزالة السياق النشط إلى العودة إلى `default`. نصيحة: إزالة سياق تؤدي فقط إلى حذف بيانات الاعتماد المحفوظة **محليًا** — قم بإلغاء الرمز المميز على الخادم باستخدام `omniroute tokens revoke <id>` لإنهاء الوصول فعليًا.

**تصدير / استيراد** السياقات (على سبيل المثال لنقلها بين الأجهزة). تستبعد عمليات التصدير بيانات الاعتماد افتراضيًا، بما في ذلك بيانات الاعتماد المخزنة بواسطة آلية الرجوع للملف. استخدم `--include-secrets` بشكل صريح عندما تكون هناك حاجة لنسخة احتياطية محمولة تحتوي على بيانات اعتماد:

```bash
omniroute contexts export --out contexts.json     # منقح؛ الوجهة الافتراضية: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # الكتابة فوق؛ --merge للاحتفاظ بالموجود
omniroute contexts migrate --yes                  # نقل الرموز المميزة القديمة ذات النص العادي إلى سلسلة المفاتيح
```

يقوم `--include-secrets` بحل مراجع سلسلة المفاتيح قبل التصدير ويفشل إذا تعذر قراءة أي بيانات اعتماد مشار إليها. يأخذ `--no-secrets` الأسبقية دائمًا. تتم كتابة ملفات التصدير بشكل ذري بوضع `0600`. تعامل مع التصدير الصريح الذي يحتوي على أسرار كمادة سرية. على الأنظمة التي لا تحتوي على واجهة رسومية (headless systems) وبدون سلسلة مفاتيح نظام تشغيل قابلة للاستخدام، يعود CLI إلى `config.json` بوضع `0600` ويطبع تحذيرًا لمرة واحدة؛ ويبقى التصدير الافتراضي منقحًا في هذا الوضع.

---

## فحص سريع شامل

دورة حياة قابلة للنسخ واللصق للتحقق من إعداد بعيد من البداية — الاتصال، وإصدار
رمز مميز مقيّد النطاق، وتوجيه أمر، والعودة، ثم التفكيك. استبدل
`192.168.0.15` بمضيف خادمك/IP الخاص به (Tailscale أو LAN أو عنوان URL عام
يبدأ بـ `https://…`).

```bash
# 1. الاتصال (كلمة المرور ← رمز مميز بصلاحية admin، يُحفظ كسياق ويصبح نشطًا)
omniroute connect 192.168.0.15                 # أو: --key oma_live_xxxx  (من دون كلمة مرور)
omniroute contexts current                     # يعرض الخادم البعيد + النطاق

# 2. استخدامه — تُنفَّذ أوامر الإدارة الآن على الخادم البعيد
omniroute tokens create --name laptop --scope read   # إصدار رمز مميز ذي نطاق أضيق
omniroute tokens list                                 # قائمة مقنّعة من الخادم البعيد

# 3. التبديل ذهابًا وإيابًا
omniroute contexts use default                 # → محلي
omniroute contexts use 192-168-0-15            # → بعيد مجددًا (الاسم من `contexts list`)

# 4. التفكيك. ملاحظة: لا يحذف `contexts remove` سوى بيانات الاعتماد المحلية —
#    ولا يلغي الرمز المميز على الخادم. ألغِه على الخادم أولًا إذا كنت
#    تريد إنهاء الوصول فعليًا.
omniroute tokens revoke <id|prefix>            # ينهي الوصول على الخادم
omniroute contexts remove 192-168-0-15 --yes   # حذف السياق المحلي (حتى إن كان نشطًا ← يرجع إلى default)، من دون مطالبة
```

> يجعل `--yes` الأمر `contexts remove` غير تفاعلي (وهو مطلوب في البرامج النصية/CI؛ ومن دونه
> يرفض الصدَف غير التفاعلي العملية بأمان بدلًا من التعليق). تؤدي إزالة السياق
> **النشط** إلى الرجوع إلى `default` تلقائيًا.

---

## ملاحظات الأمان

- يُعرض النص الصريح للرمز المميز مرة واحدة؛ ولا يُحفَظ إلا تجزئة SHA-256 (كما هو الحال مع مفاتيح API).
- يعيد `omniroute connect` استخدام آلية قفل محاولات تسجيل الدخول بالقوة الغاشمة، بالإضافة إلى تسجيل أحداث التدقيق.
- يُفضَّل استخدام HTTPS أو Tailnet للنقل؛ ويكون المضيف المجرّد مضبوطًا افتراضيًا على `http://`
  لتسهيل الاستخدام ضمن LAN/Tailscale — مرّر عنوان URL كاملًا يبدأ بـ `https://…` لاستخدام TLS.
- ملف السياق المحلي المفضّل هو `~/.omniroute/config.json` (`chmod 600`)،
  ولا يحتوي إلا على `credentialRef`؛ أما الرمز المميز نفسه فيُخزَّن في سلسلة مفاتيح نظام التشغيل
  (`keytar`) ولا يُطبع مطلقًا في السجلات. تستخدم عمليات التثبيت دون واجهة رسومية التي لا تتوفر لها
  سلسلة مفاتيح أصلية عاملة ملف `0600` نفسه كخيار احتياطي صريح،
  وتُصدر تحذيرًا مرة واحدة. استخدم `omniroute contexts migrate --yes` بعد تثبيت
  واجهة خلفية لسلسلة المفاتيح.

---

## نقاط نهاية API (مرجع)

| الطريقة | المسار                | المصادقة          | النطاق                   |
| ------- | --------------------- | ----------------- | ------------------------ |
| POST    | `/api/cli/connect`    | كلمة مرور الإدارة | — (عام، محمي بكلمة مرور) |
| GET     | `/api/cli/whoami`     | رمز وصول          | قراءة                    |
| GET     | `/api/cli/tokens`     | رمز وصول          | إدارة                    |
| POST    | `/api/cli/tokens`     | رمز وصول          | إدارة                    |
| DELETE  | `/api/cli/tokens/:id` | رمز وصول          | إدارة                    |

راجع [openapi.yaml](../openapi.yaml) للاطلاع على المخططات الكاملة.
