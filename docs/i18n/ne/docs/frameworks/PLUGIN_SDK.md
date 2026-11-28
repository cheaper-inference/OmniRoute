# OmniRoute Plugin SDK (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## द्रुत सुरुवात

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

## API सन्दर्भ

### `definePlugin(def: PluginDefinition): Plugin`

पूर्वनिर्धारितसँग प्लगइन वस्तु सिर्जना गर्ने फ्याक्ट्री प्रकार्य।

**प्यारामिटरहरू:**

- `name` (स्ट्रिङ, आवश्यक) — प्लगइन नाम कबाब-केसमा
- `priority` (नम्बर, वैकल्पिक, पूर्वनिर्धारित: 100) — तल्लो रन पहिले
- `enabled` (बुलियन, ऐच्छिक, पूर्वनिर्धारित: सत्य) — सुरु सक्षम?
- `onRequest` (कार्य, वैकल्पिक) — च्याट ह्यान्डलर अघि चल्छ
- `onResponse` (कार्य, वैकल्पिक) — च्याट ह्यान्डलर पछि चल्छ
- `onError` (प्रकार्य, वैकल्पिक) — ह्यान्डलर त्रुटिमा चल्छ

### `blockRequest(response?): BlockingHookResult`

अनुरोध रोक्नुहोस् र वैकल्पिक रूपमा अनुकूलन प्रतिक्रिया फर्काउनुहोस्।

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

प्रदायकमा पुग्नु अघि अनुरोध मुख्य भाग परिमार्जन गर्नुहोस्।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

अनुरोध सन्दर्भमा मेटाडेटा संलग्न गर्नुहोस्।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## प्लगइन सन्दर्भ (`PluginContext`)

| क्षेत्र      | टाइप गर्नुहोस्            | विवरण                                     |
| ------------ | ------------------------- | ----------------------------------------- |
| `requestId`  | `string`                  | अद्वितीय अनुरोध पहिचानकर्ता               |
| `model`      | `string`                  | मोडेलको नाम अनुरोध गरियो                  |
| `provider`   | `string`                  | लक्ष्य प्रदायक ID                         |
| `body`       | `Record<string, unknown>` | शरीर अनुरोध गर्नुहोस्                     |
| `headers`    | `Record<string, string>`  | हेडरहरू अनुरोध गर्नुहोस् (नोट हेर्नुहोस्) |
| `metadata`   | `Record<string, unknown>` | परिवर्तनीय मेटाडेटा                       |
| `timestamp`  | `number`                  | टाइमस्ट्याम्प अनुरोध गर्नुहोस्            |
| `apiKeyInfo` | `object` (वैकल्पिक)       | API कुञ्जी मेटाडेटा (नोट हेर्नुहोस्)      |

सन्दर्भले ग्राहकको प्रमाणहरू कहिल्यै बोक्दैन: `authorization`, `x-api-key`, `proxy-authorization` र `cookie` हेडरहरू हटाइन्छ (कुनै पनि आवरण), र `apiKeyInfo` कुञ्जीको मेटाडेटा (जस्तै `id`, `name` र `scopes`) राख्छ तर कुञ्जी मान वा यसको औंठाछाप `src/lib/plugins/hooks.ts` `redactPluginContext()` राख्दैन। यो `onRequest`, `onResponse` र `onError` मा लागू हुन्छ।

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

### Hook को प्राथमिकता

Hooks लाई प्राथमिकतासहित कन्फिगर गर्न सकिन्छ (कम = पहिले चल्छ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

वा साधारण boolean का रूपमा (पूर्वनिर्धारित प्राथमिकता 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## अनुमति प्रणाली

पूर्वनिर्धारित प्लगइनहरू हुन्** स्यान्डबक्स गरिएको छैन** । प्रत्येक सक्रिय प्लगइन एक अलग, साधारण Node.js बाल प्रक्रिया ( `src/lib/plugins/loader.ts` मा`loadPlugin()` ) को रूपमा OmniRoute समान अपरेटिङ-सिस्टम प्रयोगकर्ता अन्तर्गत चल्छ, कुनै VM सन्दर्भ र कुनै Node.js अनुमति झण्डाहरू बिना। प्लगइन कोडले `node:fs`, `node:child_process`, `fetch` र अन्य सबै Node.js API प्रयोग गर्न सक्छ: यसले OmniRoute प्रयोगकर्ताले (डेटा डाइरेक्टरी सहित), प्रोग्रामहरू चलाउन र नेटवर्कमा पुग्न सक्ने कुनै पनि फाइल पढ्न र लेख्न सक्छ।

म्यानिफेस्टको `requires.permissions` `network`, `file-read`, `file-write`, `env` र `exec` स्वीकार गर्दछ। पूर्वनिर्धारित सेटिङहरूसँग मात्र `env` रनटाइममा प्रभाव पार्छ।

### अप्ट-इन अनुमति मोडेल (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` सुविधा झण्डा (श्रेणी `security`,** पूर्वनिर्धारित रूपमा बन्द** ) प्रत्येक प्लगइन प्रक्रियालाई [Node.js अनुमति मोडेल](https://nodejs.org/api/permissions.html) (`--permission`, प्रत्येक समर्थित Node.js लाइन द्वारा स्वीकार गरिएको: 22.22 +, 24 र 26) को साथ सुरु गर्दछ। झण्डाहरू `src/lib/plugins/permissionModel.ts` मा `buildPermissionModelArgs()` द्वारा manifest बाट बनाइन्छ। प्लगइन सक्रिय हुँदा झण्डा पढिन्छ, त्यसैले यो परिवर्तन पछि सक्रिय प्लगइनहरूमा लागू हुन्छ; यसलाई लागू गर्न चलिरहेको प्लगइन निष्क्रिय र सक्रिय गर्नुहोस्।

प्लगइन डाटा डाइरेक्टरी प्लगइन रूटको छेउमा `plugin-data/<plugin-name>` छ (`~/.omniroute/plugin-data/<plugin-name>` पूर्वनिर्धारित रूपमा, `getPluginDataDir()`)। झण्डा अन गर्दा, यसको मार्ग `PLUGIN_DATA_DIR` को रूपमा प्लगइनमा पास हुन्छ।

| अनुमति       | फ्ल्याग अफ (पूर्वनिर्धारित)                                                                                                                                                                                                                 | झण्डा अन गर्नुहोस्                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (कुनै पनि)   | OmniRoute प्रयोगकर्ताको पूर्ण विशेषाधिकारहरू।                                                                                                                                                                                               | फाइल प्लगइन डाइरेक्टरी भित्र मात्र पढ्छ। कुनै फाइल लेख्दैन, कुनै चाइल्ड प्रक्रियाहरू छैनन्, कुनै कार्यकर्ता थ्रेडहरू छैनन्, कुनै नेटिभ एडअनहरू छैनन्, कुनै WASI छैन।                                                                                            |
| `env`        | प्लगइन प्रक्रियाले `PORT`, `HOSTNAME`, `TZ` र `TMPDIR` पनि प्राप्त गर्दछ। यो बिना, यसले `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` र `PLUGIN_NAME` (प्लस `SystemRoot` र `windir` मा Windows) मात्र प्राप्त गर्दछ। | झण्डा फहराइए जस्तै।                                                                                                                                                                                                                                             |
| `file-read`  | कुनै पनि छैन (घोषणा मात्र)।                                                                                                                                                                                                                 | प्लगइन डाटा डाइरेक्टरी पनि पढ्न योग्य हुन्छ (यो हराइरहेको छ भने सिर्जना गरिएको छ)।                                                                                                                                                                              |
| `file-write` | कुनै पनि छैन (घोषणा मात्र)।                                                                                                                                                                                                                 | प्लगइन डाटा डाइरेक्टरी पढ्न योग्य र लेख्न योग्य हुन्छ (`--allow-fs-write`)। अरु केही लेख्न मिल्दैन ।                                                                                                                                                            |
| `exec`       | कुनै पनि छैन (घोषणा मात्र)।                                                                                                                                                                                                                 | बाल प्रक्रियाहरूलाई अनुमति दिइएको छ (`--allow-child-process`)। Node.js `NODE_OPTIONS` मार्फत बाल Node.js प्रक्रियाहरूमा अनुमति झण्डाहरू पास गर्दछ, तर कुनै पनि अन्य कार्यक्रम प्रतिबन्ध बिना चल्छ, त्यसैले `exec` प्रभावकारी रूपमा फाइल-प्रणाली सीमाहरू उठाउँछ। |
| `network`    | कुनै पनि छैन (घोषणा मात्र)।                                                                                                                                                                                                                 | कुनै पनि छैन। Node.js अनुमति मोडेलले आउटबाउन्ड नेटवर्क पहुँचलाई प्रतिबन्धित गर्दैन, त्यसैले `network` घोषणा रहन्छ र कहिल्यै लागू हुँदैन।                                                                                                                        |

आफ्नो डाइरेक्टरी बाहिरका फाईलहरू पढ्ने (उदाहरणका लागि अभिभावक `node_modules` बाट समाधान गरिएको मोड्युल) लाई ब्रेक गर्ने प्लगइनहरूमा फ्ल्याग खोल्दा, तिनीहरूको डाटा डाइरेक्टरी, वा `exec` घोषणा नगरिकन प्रक्रियाहरू स्प्यान नगरी जहाँ पनि लेख्नुहोस्। प्लगइनमा झण्डाको साथ पनि नेटवर्क पहुँच राख्छ र OmniRoute प्रयोगकर्ताको रूपमा चल्छ, त्यसैले केवल प्लगइनहरू स्थापना गर्नुहोस् जसको स्रोत तपाईंले विश्वास गर्नुहुन्छ।

## कन्फिग स्किमा

कन्फिगर गर्न मिल्ने सेटिङहरू `configSchema` मा परिभाषित गर्नुहोस्:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "बाह्य API कुञ्जी" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

फिल्डका प्रकारहरू: `string`, `number`, `boolean`, `select`

फिल्डका विकल्पहरू: `default`, `min`, `max`, `enum`, `description`

कन्फिग मानहरू डेटाबेसमा सुरक्षित रहन्छन् र ड्यासबोर्डको कन्फिग पृष्ठमार्फत पहुँचयोग्य हुन्छन्।

## अन्तर्निर्मित इभेन्टहरू

| इभेन्ट            | कहिले                               | पेलोड                         |
| ----------------- | ----------------------------------- | ----------------------------- |
| `onRequest`       | च्याट ह्यान्डलरअघि                  | अनुरोध सन्दर्भ                |
| `onResponse`      | च्याट ह्यान्डलरपछि                  | प्रतिक्रिया डेटा              |
| `onError`         | ह्यान्डलरमा त्रुटि हुँदा            | त्रुटि वस्तु                  |
| `onModelSelect`   | राउटिङका लागि मोडेल चयन हुँदा       | मोडेल जानकारी                 |
| `onComboResolve`  | कम्बो राउटिङ समाधान हुँदा           | कम्बो लक्ष्यहरू               |
| `onRateLimit`     | दर सीमा पुग्दा                      | सीमा जानकारी                  |
| `onQuotaExhaust`  | कोटा समाप्त हुँदा                   | कोटा जानकारी                  |
| `onProviderError` | प्रदायकले त्रुटि फर्काउँदा          | त्रुटि विवरण                  |
| `onStreamStart`   | SSE स्ट्रिम सुरु हुँदा              | स्ट्रिम जानकारी               |
| `onStreamEnd`     | SSE स्ट्रिम समाप्त हुँदा            | स्ट्रिम तथ्याङ्क              |
| `onInstall`       | प्लगइन स्थापना हुँदा                | `{ name, version, manifest }` |
| `onActivate`      | प्लगइन सक्रिय हुँदा                 | `{ name, version, manifest }` |
| `onDeactivate`    | प्लगइन निष्क्रिय हुँदा              | `{ name, version, manifest }` |
| `onUninstall`     | प्लगइन हटाइँदा (फाइलहरू मेटाउनुअघि) | `{ name, version, manifest }` |

## उदाहरणहरू

### Logger अनुरोध गर्नुहोस्

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### रेट लिमिटर

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

### प्रतिक्रिया ट्रान्सफर्मर

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
