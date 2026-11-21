# OmniRoute Plugin SDK (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## त्वरित शुरुआत

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

## API संदर्भ

### `definePlugin(def: PluginDefinition): Plugin`

फ़ैक्टरी फ़ंक्शन जो डिफ़ॉल्ट के साथ एक प्लगइन ऑब्जेक्ट बनाता है।

**पैरामीटर:**

- `name` (स्ट्रिंग, आवश्यक) कबाब-केस में — प्लगइन नाम
- `priority` (संख्या, वैकल्पिक, डिफ़ॉल्ट: 100) — लोअर पहले चलता है
- `enabled` (बूलियन, वैकल्पिक, डिफ़ॉल्ट: सत्य) — प्रारंभ सक्षम?
- `onRequest` (फ़ंक्शन, वैकल्पिक) — चैट हैंडलर से पहले चलता है
- `onResponse` (फ़ंक्शन, वैकल्पिक) — चैट हैंडलर के बाद चलता है
- `onError` (फ़ंक्शन, वैकल्पिक) — हैंडलर त्रुटि पर चलता है

### `blockRequest(response?): BlockingHookResult`

अनुरोध को ब्लॉक करें और वैकल्पिक रूप से एक कस्टम प्रतिक्रिया लौटाएँ।

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

प्रदाता तक पहुंचने से पहले अनुरोध निकाय को संशोधित करें।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

अनुरोध संदर्भ में मेटाडेटा संलग्न करें।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## प्लगइन संदर्भ (`PluginContext`)

| मैदान        | प्रकार                    | विवरण                           |
| ------------ | ------------------------- | ------------------------------- |
| `requestId`  | `string`                  | अद्वितीय अनुरोध पहचानकर्ता      |
| `model`      | `string`                  | मॉडल नाम का अनुरोध किया गया     |
| `provider`   | `string`                  | लक्ष्य प्रदाता ID               |
| `body`       | `Record<string, unknown>` | निकाय से अनुरोध करें            |
| `headers`    | `Record<string, string>`  | हेडर का अनुरोध करें (नोट देखें) |
| `metadata`   | `Record<string, unknown>` | परिवर्तनशील मेटाडेटा            |
| `timestamp`  | `number`                  | टाइमस्टैम्प का अनुरोध करें      |
| `apiKeyInfo` | `object` (वैकल्पिक)       | API कुंजी मेटाडेटा (नोट देखें)  |

संदर्भ में कभी भी क्लाइंट के क्रेडेंशियल नहीं होते हैं: `authorization`, `x-api-key`, `proxy-authorization` और `cookie` हेडर हटा दिए जाते हैं (कोई भी आवरण), और `apiKeyInfo` कुंजी का मेटाडेटा (जैसे `id`, `name` और `scopes`) रखता है, लेकिन कुंजी मान या उसके फिंगरप्रिंट ( `src/lib/plugins/hooks.ts` में`redactPluginContext()` ) नहीं रखता है। यह `onRequest`, `onResponse` और `onError` पर लागू होता है।

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

### Hook प्राथमिकता

Hooks को प्राथमिकता के साथ कॉन्फ़िगर किया जा सकता है (कम मान = पहले चलता है):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

या साधारण boolean मानों के रूप में (डिफ़ॉल्ट प्राथमिकता 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## अनुमति प्रणाली

डिफ़ॉल्ट रूप से प्लगइन्स हैं** सैंडबॉक्स नहीं किया गया** . प्रत्येक सक्रिय प्लगइन एक अलग, सामान्य Node.js चाइल्ड प्रोसेस (`loadPlugin()` in `src/lib/plugins/loader.ts`) के रूप में OmniRoute के समान ऑपरेटिंग-सिस्टम उपयोगकर्ता के तहत चलता है, जिसमें कोई VM संदर्भ और कोई Node.js अनुमति ध्वज नहीं होता है। प्लगइन कोड `node:fs`, `node:child_process`, `fetch` और अन्य सभी Node.js API उपयोग कर सकता है: यह OmniRoute उपयोगकर्ता (डेटा निर्देशिका सहित) किसी भी फाइल को पढ़ और लिख सकता है, प्रोग्राम चला सकता है और नेटवर्क तक पहुंच सकता है।

मेनिफेस्ट का `requires.permissions` `network`, `file-read`, `file-write`, `env` और `exec` स्वीकार करता है। डिफ़ॉल्ट सेटिंग्स के साथ रनटाइम पर केवल `env` प्रभाव पड़ता है।

### ऑप्ट-इन अनुमति मॉडल (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` फ़ीचर फ़्लैग (श्रेणी `security`,** डिफ़ॉल्ट रूप से बंद** ) प्रत्येक प्लगइन प्रक्रिया को [Node.js अनुमति मॉडल](https://nodejs.org/api/permissions.html) (`--permission`, प्रत्येक समर्थित Node.js लाइन द्वारा स्वीकृत: 22.22 +, 24 और 26) के साथ शुरू करता है। झंडे `src/lib/plugins/permissionModel.ts` में `buildPermissionModelArgs()` द्वारा मैनिफ़ेस्ट से बनाए गए हैं। जब कोई प्लगइन सक्रिय होता है तो ध्वज पढ़ा जाता है, इसलिए यह परिवर्तन के बाद सक्रिय प्लगइन पर लागू होता है; इसे लागू करने के लिए चल रहे प्लगइन को निष्क्रिय और सक्रिय करें।

प्लगइन डेटा निर्देशिका प्लगइन रूट के बगल में `plugin-data/<plugin-name>` है (डिफ़ॉल्ट रूप से`~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`)। ध्वज चालू होने पर, इसका पथ `PLUGIN_DATA_DIR` के रूप में प्लगइन को भेज दिया जाता है।

| अनुमति       | फ़्लैगऑफ़ (डिफ़ॉल्ट)                                                                                                                                                                                                                                | ध्वजारोहण करें                                                                                                                                                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (कोई नहीं)   | OmniRoute उपयोगकर्ता के पूर्ण विशेषाधिकार।                                                                                                                                                                                                          | फ़ाइल केवल प्लगइन निर्देशिका के अंदर ही पढ़ी जाती है। कोई फ़ाइल नहीं लिखती, कोई चाइल्ड प्रोसेस नहीं, कोई वर्कर थ्रेड नहीं, कोई नेटिव ऐडऑन नहीं, कोई WASI नहीं।                                                                                                                  |
| `env`        | प्लगइन प्रक्रिया को `PORT`, `HOSTNAME`, `TZ` और `TMPDIR` भी प्राप्त होता है। इसके बिना, यह केवल `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` और `PLUGIN_NAME` ( Windows पर प्लस `SystemRoot` और `windir` ) प्राप्त करता है। | ध्वजारोहण के समान ही।                                                                                                                                                                                                                                                           |
| `file-read`  | कोई नहीं (केवल घोषणा)।                                                                                                                                                                                                                              | प्लगइन डेटा निर्देशिका भी पढ़ने योग्य हो जाती है (अनुपलब्ध होने पर इसे बनाया जाता है)।                                                                                                                                                                                          |
| `file-write` | कोई नहीं (केवल घोषणा)।                                                                                                                                                                                                                              | प्लगइन डेटा निर्देशिका पढ़ने योग्य और लिखने योग्य (`--allow-fs-write`) बन जाती है। और कुछ भी लिखने योग्य नहीं है.                                                                                                                                                               |
| `exec`       | कोई नहीं (केवल घोषणा)।                                                                                                                                                                                                                              | बाल प्रक्रियाओं की अनुमति है (`--allow-child-process`)। Node.js `NODE_OPTIONS` के माध्यम से चाइल्ड Node.js प्रक्रियाओं को अनुमति फ़्लैग भेजता है, लेकिन कोई भी अन्य प्रोग्राम बिना किसी प्रतिबंध के चलता है, इसलिए `exec` फ़ाइल-सिस्टम की सीमाओं को प्रभावी ढंग से हटा देता है। |
| `network`    | कोई नहीं (केवल घोषणा)।                                                                                                                                                                                                                              | कोई नहीं। Node.js अनुमति मॉडल आउटबाउंड नेटवर्क एक्सेस को प्रतिबंधित नहीं करता है, इसलिए `network` एक घोषणा बनकर रह जाता है और इसे कभी लागू नहीं किया जाता है।                                                                                                                   |

फ़्लैग को चालू करने से प्लगइन्स टूट जाते हैं जो अपनी निर्देशिका के बाहर फ़ाइलों को पढ़ते हैं (उदाहरण के लिए मूल `node_modules` से हल किया गया एक मॉड्यूल), अपनी डेटा निर्देशिका के अलावा कहीं भी लिखें, या `exec` घोषित किए बिना प्रक्रियाओं को स्पॉन करें। यहां तक कि प्लगइन पर ध्वज के साथ भी नेटवर्क एक्सेस रहता है और OmniRoute उपयोगकर्ता के रूप में चलता है, इसलिए केवल उन प्लगइन्स को इंस्टॉल करें जिनके स्रोत पर आपको भरोसा है।

## कॉन्फ़िग स्कीमा

कॉन्फ़िगर करने योग्य सेटिंग्स को `configSchema` में परिभाषित करें:

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

फ़ील्ड प्रकार: `string`, `number`, `boolean`, `select`

फ़ील्ड विकल्प: `default`, `min`, `max`, `enum`, `description`

कॉन्फ़िग मान डेटाबेस में सहेजे जाते हैं और डैशबोर्ड कॉन्फ़िग पृष्ठ के माध्यम से उपलब्ध होते हैं।

## अंतर्निहित इवेंट

| इवेंट             | कब                                                   | पेलोड                         |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | चैट हैंडलर से पहले                                   | अनुरोध संदर्भ                 |
| `onResponse`      | चैट हैंडलर के बाद                                    | प्रतिक्रिया डेटा              |
| `onError`         | हैंडलर त्रुटि होने पर                                | त्रुटि ऑब्जेक्ट               |
| `onModelSelect`   | रूटिंग के लिए मॉडल चुने जाने पर                      | मॉडल जानकारी                  |
| `onComboResolve`  | कॉम्बो रूटिंग हल होने पर                             | कॉम्बो लक्ष्य                 |
| `onRateLimit`     | दर सीमा पूरी होने पर                                 | सीमा जानकारी                  |
| `onQuotaExhaust`  | कोटा समाप्त होने पर                                  | कोटा जानकारी                  |
| `onProviderError` | प्रदाता द्वारा त्रुटि लौटाए जाने पर                  | त्रुटि विवरण                  |
| `onStreamStart`   | SSE स्ट्रीम शुरू होने पर                             | स्ट्रीम जानकारी               |
| `onStreamEnd`     | SSE स्ट्रीम समाप्त होने पर                           | स्ट्रीम आँकड़े                |
| `onInstall`       | प्लगइन इंस्टॉल होने पर                               | `{ name, version, manifest }` |
| `onActivate`      | प्लगइन सक्रिय होने पर                                | `{ name, version, manifest }` |
| `onDeactivate`    | प्लगइन निष्क्रिय होने पर                             | `{ name, version, manifest }` |
| `onUninstall`     | प्लगइन अनइंस्टॉल होने पर (फ़ाइलें हटाए जाने से पहले) | `{ name, version, manifest }` |

## उदाहरण

### लॉगर से अनुरोध करें

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### दर सीमक

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

### प्रतिक्रिया ट्रांसफार्मर

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
