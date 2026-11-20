# OmniRoute Plugin SDK (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## شروع سریع

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

تابع Factory که یک شی پلاگین با پیش فرض ایجاد می کند.

**پارامترها:**

- `name` (رشته، مورد نیاز) — نام افزونه در کباب
- `priority` (تعداد، اختیاری، پیشفرض: 100) — Lower ابتدا اجرا میشود
- `enabled` (بولی، اختیاری، پیشفرض: درست) — شروع فعال است؟
- `onRequest` (عملکرد، اختیاری) — قبل از کنترل کننده چت اجرا می شود
- `onResponse` (عملکرد، اختیاری) — بعد از کنترل کننده چت اجرا می شود
- `onError` (عملکرد، اختیاری) — با خطای کنترل کننده اجرا می شود

### `blockRequest(response?): BlockingHookResult`

درخواست را مسدود کنید و به صورت اختیاری یک پاسخ سفارشی برگردانید.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

بدنه درخواست را قبل از رسیدن به ارائه دهنده تغییر دهید.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

متادیتا را به زمینه درخواست پیوست کنید.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## زمینه پلاگین (`PluginContext`)

| میدان        | تایپ کنید                 | توضیحات                                      |
| ------------ | ------------------------- | -------------------------------------------- |
| `requestId`  | `string`                  | شناسه درخواست منحصر به فرد                   |
| `model`      | `string`                  | نام مدل درخواستی                             |
| `provider`   | `string`                  | ارائه دهنده هدف ID                           |
| `body`       | `Record<string, unknown>` | درخواست بدن                                  |
| `headers`    | `Record<string, string>`  | سرصفحه های درخواستی (به یادداشت مراجعه کنید) |
| `metadata`   | `Record<string, unknown>` | ابرداده قابل تغییر                           |
| `timestamp`  | `number`                  | درخواست مهر زمانی                            |
| `apiKeyInfo` | `object` (اختیاری)        | فراداده کلید API (به یادداشت مراجعه کنید)    |

زمینه هرگز اعتبار مشتری را ندارد: سرصفحههای `authorization`، `x-api-key`، `proxy-authorization` و `cookie` حذف میشوند (هر نوع پوشش)، و `apiKeyInfo` ابردادههای کلید (مانند `id`، `name` و `scopes`) را نگه میدارد، اما مقدار کلید یا اثر انگشت آن را نگه نمیدارد (`redactPluginContext()` در `src/lib/plugins/hooks.ts`). این برای `onRequest`, `onResponse` و `onError` صدق می کند .

## مانیفست (`plugin.json`)

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

### اولویت هوکها

هوکها را میتوان با اولویت پیکربندی کرد (مقدار کمتر = اجرای زودتر):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

یا بهصورت مقادیر بولی ساده (اولویت پیشفرض 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## سیستم مجوز

پلاگین ها هستند** سندباکس نشده** . هر افزونه فعال بهعنوان یک فرآیند جداگانه و عادی Node.js فرزند (`loadPlugin()` در `src/lib/plugins/loader.ts`) تحت همان کاربر سیستم عامل OmniRoute اجرا میشود، بدون زمینه VM و هیچ پرچم مجوز Node.js. کد پلاگین میتواند `node:fs`، `node:child_process`، `fetch` و هر Node.js API دیگری استفاده کند: میتواند هر فایلی را که کاربر OmniRoute میتواند بخواند و بنویسد (از جمله فهرست دادهها)، برنامهها را اجرا کند و به شبکه دسترسی پیدا کند.

`requires.permissions` مانیفست `network`، `file-read`، `file-write`، `env` و `exec` را میپذیرد، اما امروزه فقط `env` در زمان اجرا تأثیر دارد:

| اجازه                                        | اثر امروز                                                                                                                                                                                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | فرآیند پلاگین نیز `PORT`, `HOSTNAME`, `TZ` و `TMPDIR` را دریافت می کند. بدون آن فقط `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` و `PLUGIN_NAME` (به علاوه `SystemRoot` و `windir` روی Windows) را دریافت می کند. |
| `network`, `file-read`, `file-write`, `exec` | هیچ کدام. آنها فقط اعلامیه هستند: هنگامی که آنها گم شوند هیچ چیز مسدود نمی شود.                                                                                                                                                           |

نصب یک افزونه مانند نصب هر برنامه دیگری بر روی هاست است. فقط افزونه هایی را نصب کنید که به منبع آنها اعتماد دارید.

## طرحواره پیکربندی

تنظیمات قابل پیکربندی را در `configSchema` تعریف کنید:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "کلید API خارجی" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

انواع فیلد: `string`، `number`، `boolean`، `select`

گزینههای فیلد: `default`، `min`، `max`، `enum`، `description`

مقادیر پیکربندی در پایگاه داده ذخیره میشوند و از طریق صفحه پیکربندی داشبورد قابل دسترسی هستند.

## رویدادهای داخلی

| رویداد            | زمان وقوع                            | داده ارسالی                   |
| ----------------- | ------------------------------------ | ----------------------------- |
| `onRequest`       | پیش از مدیریتکننده چت                | زمینه درخواست                 |
| `onResponse`      | پس از مدیریتکننده چت                 | داده پاسخ                     |
| `onError`         | هنگام خطای مدیریتکننده               | شیء خطا                       |
| `onModelSelect`   | هنگام انتخاب مدل برای مسیریابی       | اطلاعات مدل                   |
| `onComboResolve`  | هنگام تعیین مسیریابی ترکیبی          | مقصدهای ترکیبی                |
| `onRateLimit`     | هنگام رسیدن به محدودیت نرخ           | اطلاعات محدودیت               |
| `onQuotaExhaust`  | هنگام اتمام سهمیه                    | اطلاعات سهمیه                 |
| `onProviderError` | هنگام بازگرداندن خطا توسط ارائهدهنده | جزئیات خطا                    |
| `onStreamStart`   | هنگام شروع جریان SSE                 | اطلاعات جریان                 |
| `onStreamEnd`     | هنگام پایان جریان SSE                | آمار جریان                    |
| `onInstall`       | هنگام نصب افزونه                     | `{ name, version, manifest }` |
| `onActivate`      | هنگام فعالسازی افزونه                | `{ name, version, manifest }` |
| `onDeactivate`    | هنگام غیرفعالسازی افزونه             | `{ name, version, manifest }` |
| `onUninstall`     | هنگام حذف افزونه (پیش از حذف فایلها) | `{ name, version, manifest }` |

## نمونه ها

### درخواست Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### محدود کننده نرخ

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

### ترانسفورماتور واکنش

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
