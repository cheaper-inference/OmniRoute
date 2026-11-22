# OmniRoute Plugin SDK (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## بداية سريعة

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## مرجع API

### `definePlugin(def: PluginDefinition): Plugin`

وظيفة المصنع التي تقوم بإنشاء كائن مكون إضافي مع الإعدادات الافتراضية.

**حدود:**

- `name` (سلسلة، مطلوبة) اسم البرنامج المساعد — في حالة الكباب
- `priority` (الرقم، اختياري، الافتراضي: 100) يتم تشغيل — Lower أولاً
- `enabled` (منطقي، اختياري، افتراضي: صحيح) — هل تم تمكين البدء؟
- `onRequest` (وظيفة، اختيارية) — يتم تشغيله قبل معالج الدردشة
- `onResponse` (وظيفة، اختيارية) — يتم تشغيله بعد معالج الدردشة
- `onError` (وظيفة، اختيارية) — يعمل عند حدوث خطأ في المعالج

### `blockRequest(response?): BlockingHookResult`

قم بحظر الطلب وإرجاع استجابة مخصصة اختياريًا.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

قم بتعديل نص الطلب قبل أن يصل إلى الموفر.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

إرفاق بيانات التعريف بسياق الطلب.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## سياق البرنامج المساعد (`PluginContext`)

| مجال         | يكتب                      | وصف                                             |
| ------------ | ------------------------- | ----------------------------------------------- |
| `requestId`  | `string`                  | معرف الطلب الفريد                               |
| `model`      | `string`                  | اسم الموديل المطلوب                             |
| `provider`   | `string`                  | موفر الهدف ID                                   |
| `body`       | `Record<string, unknown>` | هيئة الطلب                                      |
| `headers`    | `Record<string, string>`  | رؤوس الطلبات (انظر الملاحظة)                    |
| `metadata`   | `Record<string, unknown>` | البيانات الوصفية القابلة للتغيير                |
| `timestamp`  | `number`                  | طلب الطابع الزمني                               |
| `apiKeyInfo` | `object` (اختياري)        | البيانات التعريفية الرئيسية API (انظر الملاحظة) |

لا يحمل السياق أبدًا بيانات اعتماد العميل: تتم إزالة الرؤوس `authorization` و `x-api-key` و `proxy-authorization` و `cookie` (أي غلاف)، ويحتفظ `apiKeyInfo` بالبيانات الوصفية للمفتاح (مثل `id` و `name` و `scopes`) ولكن ليس قيمة المفتاح أو بصمة إصبعه (`redactPluginContext()` في `src/lib/plugins/hooks.ts`). وهذا ينطبق على `onRequest` و `onResponse` و `onError`.

## ملف البيان (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### أولوية الخطافات

يمكن تكوين الخطافات باستخدام الأولوية (القيمة الأقل = تُنفَّذ أولًا):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

أو باستخدام قيم منطقية بسيطة (الأولوية الافتراضية 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## نظام الأذونات

الإضافات هي** ليس في وضع الحماية** . يعمل كل مكون إضافي نشط كعملية فرعية منفصلة وعادية لـ Node.js (`loadPlugin()` في `src/lib/plugins/loader.ts`) تحت نفس مستخدم نظام التشغيل مثل OmniRoute، بدون سياق VM ولا إشارات إذن Node.js. يمكن أن يستخدم رمز البرنامج المساعد `node:fs` و `node:child_process` و `fetch` وكل Node.js API الأخرى: يمكنه قراءة وكتابة أي ملف يستطيع مستخدم OmniRoute (بما في ذلك دليل البيانات)، تشغيل البرامج والوصول إلى الشبكة.

يقبل `requires.permissions` الخاص بالبيان `network` `file-read` و `file-write` و `env` و `exec`، ولكن اليوم `env` فقط له تأثير في وقت التشغيل:

| إذن                                          | تأثير اليوم                                                                                                                                                                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | تتلقى عملية البرنامج المساعد أيضًا `PORT` `HOSTNAME` و `TZ` و `TMPDIR`. بدونها، فإنه يتلقى فقط `PATH` `HOME` و `USER` و `LANG` و `LC_ALL` و `NODE_ENV` و `PLUGIN_ENTRY` و `PLUGIN_NAME` (بالإضافة إلى `SystemRoot` و `windir` على Windows). |
| `network`, `file-read`, `file-write`, `exec` | لا أحد. إنها إعلانات فقط: لا يتم حظر أي شيء عندما يكون مفقودًا.                                                                                                                                                                             |

يشبه تثبيت البرنامج الإضافي تثبيت أي برنامج آخر على المضيف. قم بتثبيت المكونات الإضافية التي تثق بمصدرها فقط.

## مخطط الإعدادات

عرّف الإعدادات القابلة للتهيئة في `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "External API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

أنواع الحقول: `string`، `number`، `boolean`، `select`

خيارات الحقول: `default`، `min`، `max`، `enum`، `description`

تُحفَظ قيم الإعدادات في قاعدة البيانات ويمكن الوصول إليها عبر صفحة الإعدادات في لوحة المعلومات.

## الأحداث المضمّنة

| الحدث             | وقت حدوثه                                 | الحمولة                       |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | قبل معالج المحادثة                        | سياق الطلب                    |
| `onResponse`      | بعد معالج المحادثة                        | بيانات الاستجابة              |
| `onError`         | عند حدوث خطأ في المعالج                   | كائن الخطأ                    |
| `onModelSelect`   | عند تحديد النموذج للتوجيه                 | معلومات النموذج               |
| `onComboResolve`  | عند تحديد توجيه المجموعة                  | أهداف المجموعة                |
| `onRateLimit`     | عند بلوغ حد المعدل                        | معلومات الحد                  |
| `onQuotaExhaust`  | عند نفاد الحصة                            | معلومات الحصة                 |
| `onProviderError` | عند إرجاع المزوّد خطأً                    | تفاصيل الخطأ                  |
| `onStreamStart`   | عند بدء تدفق SSE                          | معلومات التدفق                |
| `onStreamEnd`     | عند انتهاء تدفق SSE                       | إحصاءات التدفق                |
| `onInstall`       | عند تثبيت الإضافة                         | `{ name, version, manifest }` |
| `onActivate`      | عند تفعيل الإضافة                         | `{ name, version, manifest }` |
| `onDeactivate`    | عند إلغاء تفعيل الإضافة                   | `{ name, version, manifest }` |
| `onUninstall`     | عند إلغاء تثبيت الإضافة (قبل حذف الملفات) | `{ name, version, manifest }` |

## أمثلة

### مسجل الطلب

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### محدد المعدل

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.apiKeyInfo?.id || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### محول الاستجابة

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
