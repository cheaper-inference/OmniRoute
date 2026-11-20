# OmniRoute Plugin SDK (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## فوری آغاز

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

## API حوالہ

### `definePlugin(def: PluginDefinition): Plugin`

فیکٹری فنکشن جو ڈیفالٹس کے ساتھ پلگ ان آبجیکٹ بناتا ہے۔

**پیرامیٹرز:**

- `name` (سٹرنگ، مطلوبہ) — پلگ ان کا نام کباب کیس میں
- `priority` (نمبر، اختیاری، ڈیفالٹ: 100) — لوئر پہلے چلتا ہے
- `enabled` (بولین، اختیاری، ڈیفالٹ: سچ) — اسٹارٹ فعال ہے؟
- `onRequest` (فنکشن، اختیاری) — چیٹ ہینڈلر سے پہلے چلتا ہے۔
- `onResponse` (فنکشن، اختیاری) — چیٹ ہینڈلر کے بعد چلتا ہے۔
- `onError` (فنکشن، اختیاری) — ہینڈلر کی غلطی پر چلتا ہے۔

### `blockRequest(response?): BlockingHookResult`

درخواست کو مسدود کریں اور اختیاری طور پر حسب ضرورت جواب واپس کریں۔

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

فراہم کنندہ تک پہنچنے سے پہلے درخواست کی باڈی میں ترمیم کریں۔

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

درخواست کے سیاق و سباق میں میٹا ڈیٹا منسلک کریں۔

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## پلگ ان سیاق و سباق (`PluginContext`)

| میدان        | قسم                       | تفصیل                             |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | منفرد درخواست شناخت کنندہ         |
| `model`      | `string`                  | ماڈل کے نام کی درخواست کی۔        |
| `provider`   | `string`                  | ہدف فراہم کنندہ ID                |
| `body`       | `Record<string, unknown>` | جسم کی درخواست کریں۔              |
| `headers`    | `Record<string, string>`  | ہیڈر کی درخواست کریں (نوٹ دیکھیں) |
| `metadata`   | `Record<string, unknown>` | تغیر پذیر میٹا ڈیٹا               |
| `timestamp`  | `number`                  | ٹائم اسٹیمپ کی درخواست کریں۔      |
| `apiKeyInfo` | `object` (اختیاری)        | API کلیدی میٹا ڈیٹا (نوٹ دیکھیں)  |

سیاق و سباق میں کبھی بھی کلائنٹ کی اسناد نہیں ہوتی ہیں: `authorization`، `x-api-key`، `proxy-authorization` اور `cookie` ہیڈر کو ہٹا دیا جاتا ہے (کوئی بھی کیسنگ)، اور `apiKeyInfo` کلید کا میٹا ڈیٹا (جیسے `id`، `name` اور `scopes`) رکھتا ہے لیکن کلیدی قدر یا اس کے فنگر پرنٹ (`redactPluginContext()` ) `src/lib/plugins/hooks.ts` نہیں رکھتا ہے۔ یہ `onRequest`، `onResponse` اور `onError` پر لاگو ہوتا ہے۔

## Manifest (`plugin.json`)

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

### Hook کی ترجیح

Hooks کو ترجیح کے ساتھ ترتیب دیا جا سکتا ہے (کم قدر = پہلے چلتا ہے):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

یا سادہ booleans کے طور پر (طے شدہ ترجیح 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## اجازت کا نظام

پلگ انز ہیں۔** سینڈ باکس نہیں** . ہر ایک فعال پلگ ان ایک الگ، عام Node.js چائلڈ پروسیس (`loadPlugin()` میں `src/lib/plugins/loader.ts`) کے طور پر اسی آپریٹنگ سسٹم کے صارف کے تحت چلتا ہے OmniRoute، بغیر VM سیاق و سباق اور بغیر Node.js اجازت کے جھنڈے کے۔ پلگ ان کوڈ `node:fs`، `node:child_process`، `fetch` اور ہر دوسری Node.js API استعمال کر سکتا ہے: یہ OmniRoute صارف (بشمول ڈیٹا ڈائرکٹری) کی کسی بھی فائل کو پڑھ اور لکھ سکتا ہے، پروگرام چلا سکتا ہے اور نیٹ ورک تک پہنچ سکتا ہے۔

مینی فیسٹ کا `requires.permissions` `network`، `file-read`، `file-write`، `env` اور `exec` قبول کرتا ہے، لیکن آج رن ٹائم پر صرف `env` اثر ہوتا ہے:

| اجازت                                        | آج کا اثر                                                                                                                                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `env`                                        | پلگ ان کا عمل `PORT`, `HOSTNAME`, `TZ` اور `TMPDIR` بھی حاصل کرتا ہے۔ اس کے بغیر، یہ صرف `PATH`، `HOME`، `USER`، `LANG`، `LC_ALL`، `NODE_ENV`، `PLUGIN_ENTRY` اور `PLUGIN_NAME` (مزید Windows پر `SystemRoot` اور `windir` ) وصول کرتا ہے۔ |
| `network`, `file-read`, `file-write`, `exec` | کوئی نہیں۔ وہ صرف اعلانات ہیں: جب وہ غائب ہوتے ہیں تو کچھ بھی مسدود نہیں ہوتا ہے۔                                                                                                                                                          |

پلگ ان انسٹال کرنا میزبان پر کسی دوسرے پروگرام کو انسٹال کرنے کے مترادف ہے۔ صرف پلگ ان انسٹال کریں جن کے ذریعہ آپ کو بھروسہ ہے۔

## کنفیگریشن اسکیما

قابلِ کنفیگریشن ترتیبات کو `configSchema` میں متعین کریں:

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

فیلڈ کی اقسام: `string`، `number`، `boolean`، `select`

فیلڈ کے اختیارات: `default`، `min`، `max`، `enum`، `description`

کنفیگریشن کی قدریں ڈیٹابیس میں محفوظ رہتی ہیں اور ڈیش بورڈ کے کنفیگریشن صفحے کے ذریعے قابلِ رسائی ہوتی ہیں۔

## بلٹ اِن ایونٹس

| ایونٹ             | کب                                                   | پے لوڈ                        |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | چیٹ ہینڈلر سے پہلے                                   | درخواست کا سیاق               |
| `onResponse`      | چیٹ ہینڈلر کے بعد                                    | جوابی ڈیٹا                    |
| `onError`         | ہینڈلر میں خرابی پر                                  | خرابی کا آبجیکٹ               |
| `onModelSelect`   | روٹنگ کے لیے ماڈل منتخب ہونے پر                      | ماڈل کی معلومات               |
| `onComboResolve`  | کومبو روٹنگ حل ہونے پر                               | کومبو اہداف                   |
| `onRateLimit`     | شرح کی حد پوری ہونے پر                               | حد کی معلومات                 |
| `onQuotaExhaust`  | کوٹہ ختم ہونے پر                                     | کوٹے کی معلومات               |
| `onProviderError` | فراہم کنندہ کی جانب سے خرابی لوٹانے پر               | خرابی کی تفصیلات              |
| `onStreamStart`   | SSE اسٹریم شروع ہونے پر                              | اسٹریم کی معلومات             |
| `onStreamEnd`     | SSE اسٹریم ختم ہونے پر                               | اسٹریم کے اعداد و شمار        |
| `onInstall`       | پلگ اِن انسٹال ہونے پر                               | `{ name, version, manifest }` |
| `onActivate`      | پلگ اِن فعال ہونے پر                                 | `{ name, version, manifest }` |
| `onDeactivate`    | پلگ اِن غیر فعال ہونے پر                             | `{ name, version, manifest }` |
| `onUninstall`     | پلگ اِن اَن انسٹال ہونے پر (فائلیں حذف ہونے سے پہلے) | `{ name, version, manifest }` |

## مثالیں

### Logger کی درخواست کریں۔

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ریٹ لِمیٹر

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

### رسپانس ٹرانسفارمر

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
