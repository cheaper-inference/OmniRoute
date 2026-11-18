# Custom JSON API provider nodes (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

تقوم عقدة JSON API المخصصة بتوصيل نقطة نهاية أعمال JSON التي لا تتحدث بروتوكول OpenAI أو Anthropic. يقوم OmniRoute بملء قالب طلب JSON ، ويرسله إلى نقطة النهاية الكاملة URL، ويقرأ الرد من مسار الاستجابة ويعيده إلى العميل بالتنسيق الخاص بالعميل (إكمال الدردشة، الردود، الرسائل، ...).

إنها عقدة متوافقة مع OpenAI مع `apiType: "custom-json"`؛ معرف له النموذج `openai-compatible-custom-json-<suffix>`. نموذج لوحة القيادة غير متوفر بعد. قم بإنشاء وتحرير هذه العقد من خلال عقدة المزود API أدناه.

## إنشاء عقدة

`POST /api/provider-nodes` (مصادقة الإدارة):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` هو** مكتمل** نقطة النهاية URL. لا يتم إلحاق أي شيء (لا يوجد `/chat/completions` ولا `/models`) وعلى عكس العقد الأخرى المتوافقة مع OpenAI، لا يوجد URL افتراضي. يجب أن تكون `http(s)`، بدون بيانات اعتماد مضمنة أو `#fragment`، وتمرر نفس حارس URL الصادر مثل كل عقدة مزود، سواء عند حفظ العقدة أو عند كل طلب.
- العقدة التي ترسل مفتاح الاتصال (`authType` `bearer` أو `api-key`، بما في ذلك المفتاح الافتراضي) يجب أن تستخدم `https://`. يتم قبول `http://` العادي فقط لمضيف الاسترجاع (`localhost`، `127.0.0.0/8`، `::1`) أو مع `authType: "none"`، الذي لا يرسل أي مفتاح. عناوين LAN الخاصة (`10.x`, `172.16-31.x`, `192.168.x`) ليست معفاة: يمكن لأي شخص على تلك الشبكة قراءة المفتاح. يفشل حفظ هذه العقدة باستخدام `400`، وتفشل العقدة المخزنة مسبقًا في الإغلاق عند كل طلب بنفس الرسالة، قبل إرسال أي طلب. بالنسبة لنقطة النهاية ذات المفاتيح على LAN، ضعها خلف TLS (على سبيل المثال وكيل عكسي).
- يتم التحقق من صحة `customJson` مع Zod; تم رفض المفاتيح غير المعروفة. كل حقل اختياري:

| مجال              | قيم                                 | تقصير                                                  |
| ----------------- | ----------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`              | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`         | `bearer`                                               |
| `authHeader`      | اسم الرأس المستخدم عند `api-key`    | `X-API-Key`                                            |
| `requestTemplate` | كائن JSON (≤ 64 KB، العمق ≤ 32)     | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | المسار الميداني، أو `$` لكامل الجسم | `choices[0].message.content`                           |

- يبقى السر في مفتاح API الخاص بالاتصال، وليس في القالب أبدًا. `bearer` يرسل `Authorization: Bearer <key>`. `api-key` يرسل `<authHeader>: <key>`. لا يمكن أن يكون رأس المصادقة `Host` `Content-Type` `Content-Length` أو `Connection` `Transfer-Encoding` أو `Authorization` أو `Cookie` أو رأس hop-by-hop. مع `none`، لا تحتاج الاتصالات إلى مفتاح.
- تستخدم الرؤوس الثابتة الإضافية `customHeaders` العادية للعقدة (نفس التحقق من الصحة مثل كل عقدة أخرى متوافقة؛ ولا يُسمح برؤوس المصادقة هناك).

يقبل `PUT /api/provider-nodes/<id>` نفس `customJson` ويعيد كتابة `baseUrl` والتكوين على كل اتصال موجود للعقدة. يؤدي حذف `customJson` إلى الاحتفاظ بالتكوين المخزن؛ يؤدي تبديل `apiType` إلى `chat` أو `responses` إلى إزالته من العقدة واتصالاتها.

ثم أضف اتصالاً بالعقدة كالمعتاد (`POST /api/providers` بمعرف العقدة) واطلب `<prefix>/<model>`، على سبيل المثال `biz/assistant-v1`. لا تكشف نقطة النهاية عن قائمة نماذج، لذا قم بإضافة معرفات النماذج يدويًا.

## طلب القوالب

القوالب بسيطة JSON. قد تحتوي قيمة السلسلة على علامات `{{placeholder}}` ؛ لا يتم تقييم أي شيء أو تنفيذه، ولا يتم استبدال مفاتيح الكائنات أبدًا.

| العنصر النائب        | قيمة                                                      |
| -------------------- | --------------------------------------------------------- |
| `{{prompt}}`         | نص رسالة المستخدم الأخيرة (أجزاء النص مرتبطة بأسطر جديدة) |
| `{{messages}}`       | المحادثة بتنسيق OpenAI chat                               |
| `{{model}}`          | معرف النموذج المطلوب، بدون بادئة الموفر                   |
| `{{stream}}`         | دائمًا `false` — تجيب نقطة النهاية بمستند JSON واحد       |
| `{{request.<path>}}` | حقل للطلب المترجم (صيغة الدردشة OpenAI ).                 |

- القيمة التي تمثل عنصرًا نائبًا واحدًا بالضبط تحتفظ بنوع JSON (يتحول `"{{messages}}"` إلى مصفوفة)؛ يتم إدراج عنصر نائب داخل سلسلة أطول كنص.
- العنصر النائب الذي لا يحل أي شيء يفشل الطلب باستخدام HTTP 400 بدلاً من إرسال حمولة غير كاملة.
- تستخدم المسارات التدوين النقطي والفهارس الرقمية (`data.items[0].text`). يتم رفض `__proto__` و `prototype` و `constructor` في المفاتيح والمسارات.

## الردود

تصبح القيمة عند `responsePath` هي الرد المساعد: حيث تمر السلاسل، ويتم إجراء تسلسل لقيم JSON الأخرى. يُرجع الحقل المفقود أو `null` ، أو النص غير JSON، HTTP 502. ويتم تمرير حالات الخطأ في المنبع. بالنسبة لعملاء الدفق، ينتظر OmniRoute استجابة JSON بالكامل ثم يصدرها كقطعة محتوى واحدة بالإضافة إلى قطعة النهاية؛ هذا ليس تدفق رمزي. لم يتم تعيين استدعاءات الأداة وحقول الاستخدام.

## لم تعاد أبدا

يمكن أن يكون لطلب العمل آثار جانبية حتى في حالة فشله. لذلك يرسلها OmniRoute مرة واحدة:

- لا إعادة محاولة النقل ولا متابعة إعادة التوجيه؛
- لا يمكن إعادة المحاولة على اتصال آخر (احتياطي للحساب) — يتم إرجاع الفشل كما هو ولا يتم تبريد الاتصال؛
- لا يمكن الرجوع إلى هدف التحرير والسرد التالي، حتى بالنسبة للرد الفارغ أو الفاشل.

لا تزال طلبات العملاء المنفصلة ولوحات الدمج التي تستدعي عدة نماذج بشكل صريح تستدعي نقطة النهاية بشكل مستقل.

## اختبار العقدة

حفظ اتصال، الاتصال** امتحان** لا تستدعي عمليات التحقق من صحة الزر والخلفية نقطة النهاية أبدًا: فهي تتحقق فقط من صحة التكوين المخزن وتبلغ عن أن الاتصال غير قابل للتحقق.

يرسل `POST /api/provider-nodes/validate` مع `"apiType": "custom-json"` وحقول العقدة (`baseUrl` و `apiKey` و `customJson` و `customHeaders` و `modelId` الاختيارية ) طلبًا حقيقيًا واحدًا بالضبط، مع `ping` كأحدث نص للمستخدم. يجيب على `{ "valid": true }` أو حالة المنبع (وليس الجسم المنبع أبدًا).

## تخزين

يتم تخزين التكوين في `provider_nodes.custom_json_config_json` (الترحيل `240_provider_node_custom_json_config.sql`) ونسخه في `providerSpecificData.customJson` لكل اتصال.

التنفيذ: `open-sse/utils/customJson.ts` (التحقق والنموذج)، `open-sse/executors/customJson.ts` (المنفذ)، `open-sse/services/combo/noReplayLatch.ts` و `src/sse/handlers/chat/responsePolicies.ts` (بدون إعادة).
