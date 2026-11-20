# OmniRoute Plugin SDK (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## দ্রুত শুরু

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

## API রেফারেন্স

### `definePlugin(def: PluginDefinition): Plugin`

ফ্যাক্টরি ফাংশন যা ডিফল্ট সহ একটি প্লাগইন অবজেক্ট তৈরি করে।

**পরামিতি:**

- কাবাব-কেসে`name` (স্ট্রিং, প্রয়োজনীয়) — প্লাগইন নাম
- `priority` (সংখ্যা, ঐচ্ছিক, ডিফল্ট: 100) — লোয়ার প্রথমে রান করে
- `enabled` (বুলিয়ান, ঐচ্ছিক, ডিফল্ট: সত্য) — স্টার্ট সক্ষম?
- `onRequest` (ফাংশন, ঐচ্ছিক) — চ্যাট হ্যান্ডলারের আগে চলে
- `onResponse` (ফাংশন, ঐচ্ছিক) — চ্যাট হ্যান্ডলারের পরে চলে
- `onError` (ফাংশন, ঐচ্ছিক) — হ্যান্ডলার ত্রুটির উপর চলে

### `blockRequest(response?): BlockingHookResult`

অনুরোধ ব্লক করুন এবং ঐচ্ছিকভাবে একটি কাস্টম প্রতিক্রিয়া ফেরত দিন।

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

প্রদানকারীর কাছে পৌঁছানোর আগে অনুরোধের মূল অংশটি পরিবর্তন করুন।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

অনুরোধের প্রসঙ্গে মেটাডেটা সংযুক্ত করুন।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## প্লাগইন প্রসঙ্গ (`PluginContext`)

| মাঠ          | টাইপ                      | বর্ণনা                           |
| ------------ | ------------------------- | -------------------------------- |
| `requestId`  | `string`                  | অনন্য অনুরোধ শনাক্তকারী          |
| `model`      | `string`                  | মডেল নাম অনুরোধ করা হয়েছে       |
| `provider`   | `string`                  | লক্ষ্য প্রদানকারী ID             |
| `body`       | `Record<string, unknown>` | শরীরের অনুরোধ                    |
| `headers`    | `Record<string, string>`  | অনুরোধ শিরোনাম (দ্রষ্টব্য দেখুন) |
| `metadata`   | `Record<string, unknown>` | পরিবর্তনযোগ্য মেটাডেটা           |
| `timestamp`  | `number`                  | অনুরোধ টাইমস্ট্যাম্প             |
| `apiKeyInfo` | `object` (ঐচ্ছিক)         | API কী মেটাডেটা (নোট দেখুন)      |

প্রসঙ্গটি কখনই ক্লায়েন্টের শংসাপত্র বহন করে না: `authorization`, `x-api-key`, `proxy-authorization` এবং `cookie` শিরোনামগুলি সরানো হয় (যেকোন কেসিং), এবং `apiKeyInfo` কী এর মেটাডেটা রাখে (যেমন `id`, `name` এবং `scopes`) কিন্তু মূল মান বা এর আঙুলের ছাপ `src/lib/plugins/hooks.ts` `redactPluginContext()` নয়। এটি `onRequest`, `onResponse` এবং `onError` ক্ষেত্রে প্রযোজ্য।

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

### Hook-এর অগ্রাধিকার

Hook-গুলো priority দিয়ে কনফিগার করা যায় (কম মান = আগে চলে):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

অথবা সাধারণ boolean হিসেবে (ডিফল্ট priority 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## অনুমতি সিস্টেম

প্লাগইন হয়** স্যান্ডবক্সযুক্ত নয়** . প্রতিটি সক্রিয় প্লাগইন একটি পৃথক, সাধারণ Node.js চাইল্ড প্রক্রিয়া ( `src/lib/plugins/loader.ts` তে`loadPlugin()` ) OmniRoute মতো একই অপারেটিং-সিস্টেম ব্যবহারকারীর অধীনে চলে, কোনো VM প্রসঙ্গ এবং কোনো Node.js অনুমতি পতাকা ছাড়াই। প্লাগইন কোড `node:fs`, `node:child_process`, `fetch` এবং অন্যান্য Node.js API ব্যবহার করতে পারে: এটি OmniRoute ব্যবহারকারী (ডেটা ডিরেক্টরি সহ) যেকোন ফাইল পড়তে এবং লিখতে পারে, প্রোগ্রাম চালাতে পারে এবং নেটওয়ার্কে পৌঁছাতে পারে।

ম্যানিফেস্টের `requires.permissions` `network`, `file-read`, `file-write`, `env` এবং `exec` গ্রহণ করে, কিন্তু আজ রানটাইমে শুধুমাত্র `env` প্রভাব আছে:

| অনুমতি                                       | আজ প্রভাব                                                                                                                                                                                                                                |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | The plugin process also receives `PORT`, `HOSTNAME`, `TZ` and `TMPDIR`. Without it, it receives only `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` and `PLUGIN_NAME` (plus `SystemRoot` and `windir` on Windows). |
| `network`, `file-read`, `file-write`, `exec` | কোনোটিই নয়। তারা শুধুমাত্র ঘোষণা: তারা অনুপস্থিত যখন কিছুই অবরুদ্ধ করা হয় না.                                                                                                                                                          |

একটি প্লাগইন ইনস্টল করা হোস্টে অন্য কোনো প্রোগ্রাম ইনস্টল করার মতো। শুধুমাত্র প্লাগইন ইনস্টল করুন যার উৎস আপনি বিশ্বাস করেন।

## কনফিগ স্কিমা

কনফিগারযোগ্য সেটিংস `configSchema`-তে নির্ধারণ করুন:

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

ফিল্ডের ধরন: `string`, `number`, `boolean`, `select`

ফিল্ডের বিকল্প: `default`, `min`, `max`, `enum`, `description`

কনফিগের মানগুলো ডেটাবেজে সংরক্ষিত থাকে এবং ড্যাশবোর্ডের কনফিগ পৃষ্ঠার মাধ্যমে অ্যাক্সেস করা যায়।

## বিল্ট-ইন ইভেন্ট

| ইভেন্ট            | কখন                                        | পেলোড                         |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `onRequest`       | চ্যাট হ্যান্ডলারের আগে                     | অনুরোধের প্রসঙ্গ              |
| `onResponse`      | চ্যাট হ্যান্ডলারের পরে                     | প্রতিক্রিয়ার ডেটা            |
| `onError`         | হ্যান্ডলারে ত্রুটি হলে                     | ত্রুটি অবজেক্ট                |
| `onModelSelect`   | রাউটিংয়ের জন্য মডেল নির্বাচিত হলে         | মডেলের তথ্য                   |
| `onComboResolve`  | কম্বো রাউটিং সমাধান হলে                    | কম্বোর লক্ষ্যসমূহ             |
| `onRateLimit`     | রেট সীমায় পৌঁছালে                         | সীমার তথ্য                    |
| `onQuotaExhaust`  | কোটা শেষ হয়ে গেলে                         | কোটার তথ্য                    |
| `onProviderError` | প্রোভাইডার ত্রুটি ফেরত দিলে                | ত্রুটির বিস্তারিত             |
| `onStreamStart`   | SSE স্ট্রিম শুরু হলে                       | স্ট্রিমের তথ্য                |
| `onStreamEnd`     | SSE স্ট্রিম শেষ হলে                        | স্ট্রিমের পরিসংখ্যান          |
| `onInstall`       | প্লাগইন ইনস্টল হলে                         | `{ name, version, manifest }` |
| `onActivate`      | প্লাগইন সক্রিয় হলে                        | `{ name, version, manifest }` |
| `onDeactivate`    | প্লাগইন নিষ্ক্রিয় হলে                     | `{ name, version, manifest }` |
| `onUninstall`     | প্লাগইন আনইনস্টল হলে (ফাইল মুছে ফেলার আগে) | `{ name, version, manifest }` |

## উদাহরণ

### লগার অনুরোধ করুন

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### রেট লিমিটার

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

### রেসপন্স ট্রান্সফরমার

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
