# OmniRoute Plugin SDK (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Արագ մեկնարկ

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

## API Հղում

### `definePlugin(def: PluginDefinition): Plugin`

Գործարանային գործառույթ, որը ստեղծում է Plugin օբյեկտ լռելյայններով:

**Պարամետրեր:**

- `name` (string, պարտադիր) — Plugin name in kebab-case
- `priority` (համար, ընտրովի, լռելյայն՝ 100) — Ստորին գործարկվում է առաջինը
- `enabled` (բուլյան, կամընտիր, լռելյայն՝ ճշմարիտ) — Սկսե՞լ միացվա՞ծ:
- `onRequest` (գործառույթ, կամընտիր) — Գործում է մինչև չաթի մշակիչը
- `onResponse` (գործառույթ, կամընտիր) — Գործում է զրույցի կառավարիչից հետո
- `onError` (գործառույթ, ընտրովի) — Գործում է կարգավորիչի սխալի վրա

### `blockRequest(response?): BlockingHookResult`

Արգելափակել հարցումը և ցանկության դեպքում վերադարձնել հատուկ պատասխան:

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Փոփոխեք հարցման մարմինը՝ նախքան այն մատակարարողին հասնելը:

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Կցեք մետատվյալները հարցման համատեքստին:

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| Դաշտ         | Տեսակ                     | Նկարագրություն                      |
| ------------ | ------------------------- | ----------------------------------- |
| `requestId`  | `string`                  | Հարցման եզակի նույնացուցիչ          |
| `model`      | `string`                  | Պահանջվող մոդելի անվանումը          |
| `provider`   | `string`                  | Թիրախային մատակարար ID              |
| `body`       | `Record<string, unknown>` | Հարցման մարմին                      |
| `headers`    | `Record<string, string>`  | Հարցման վերնագրեր (տես նշումը)      |
| `metadata`   | `Record<string, unknown>` | Փոփոխական մետատվյալներ              |
| `timestamp`  | `number`                  | Հարցման ժամանակի դրոշմակնիք         |
| `apiKeyInfo` | `object` (ըստ ցանկության) | API բանալի մետատվյալներ (տես նշում) |

Համատեքստը երբեք չի կրում հաճախորդի հավատարմագրերը. `authorization`, `x-api-key`, `proxy-authorization` և `cookie` վերնագրերը հանվում են (ցանկացած պատյան), իսկ `apiKeyInfo` պահում է բանալու մետատվյալները (օրինակ՝ `id`, `name` և `scopes`), բայց ոչ հիմնական արժեքը կամ դրա մատնահետքը (`redactPluginContext()` in `src/lib/plugins/hooks.ts`): Սա վերաբերում է `onRequest`, `onResponse` և `onError`:

## Մանիֆեստ (`plugin.json`)

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

### Hook-ի առաջնահերթություն

Hook-երը կարող են կազմաձևվել առաջնահերթությամբ (ավելի ցածր արժեք = գործարկվում է առաջինը)՝

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Կամ որպես պարզ բուլյան արժեքներ (լռելյայն առաջնահերթությունը՝ 100)՝

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Թույլտվությունների համակարգ

Պլագիններն են** ավազապատված չէ** . Յուրաքանչյուր ակտիվ փլագին աշխատում է որպես առանձին, սովորական Node.js երեխայի պրոցես (`loadPlugin()` in `src/lib/plugins/loader.ts`) նույն օպերացիոն համակարգի օգտագործողի ներքո, ինչպիսին OmniRoute է, առանց VM համատեքստի և Node.js թույլտվության դրոշների: Plugin կոդը կարող է օգտագործել `node:fs`, `node:child_process`, `fetch` և ցանկացած այլ Node.js API. այն կարող է կարդալ և գրել ցանկացած ֆայլ, որը կարող է OmniRoute օգտագործողը (ներառյալ տվյալների գրացուցակը), գործարկել ծրագրեր և հասնել ցանց:

Մանիֆեստի `requires.permissions` ընդունում է `network`, `file-read`, `file-write`, `env` և `exec`, բայց այսօր միայն `env` է ազդեցություն գործում գործարկման ժամանակ.

| Թույլտվություն                               | Էֆեկտն այսօր                                                                                                                                                                                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Պլագինների գործընթացը նաև ստանում է `PORT`, `HOSTNAME`, `TZ` և `TMPDIR`: Առանց դրա այն ստանում է միայն `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` և `PLUGIN_NAME` (գումարած `SystemRoot` և `windir` Windows ի վրա)։ |
| `network`, `file-read`, `file-write`, `exec` | Ոչ մեկը: Դրանք միայն հայտարարագրեր են. բացակայելու դեպքում ոչինչ արգելափակված չէ:                                                                                                                                                             |

Փլագինի տեղադրումը նման է հոսթի վրա որևէ այլ ծրագրի տեղադրմանը: Տեղադրեք միայն պլագիններ, որոնց աղբյուրին վստահում եք:

## Կոնֆիգուրացիայի սխեմա

Կոնֆիգուրացվող կարգավորումները սահմանեք `configSchema`-ում․

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Արտաքին API բանալի" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Դաշտերի տեսակները՝ `string`, `number`, `boolean`, `select`

Դաշտերի ընտրանքները՝ `default`, `min`, `max`, `enum`, `description`

Կոնֆիգուրացիայի արժեքները պահպանվում են տվյալների բազայում և հասանելի են կառավարման վահանակի կոնֆիգուրացիայի էջի միջոցով։

## Ներկառուցված իրադարձություններ

| Իրադարձություն    | Երբ                                              | Օգտակար բեռ                   |
| ----------------- | ------------------------------------------------ | ----------------------------- |
| `onRequest`       | Զրույցի մշակիչից առաջ                            | Հարցման համատեքստ             |
| `onResponse`      | Զրույցի մշակիչից հետո                            | Պատասխանի տվյալներ            |
| `onError`         | Մշակիչի սխալի դեպքում                            | Սխալի օբյեկտ                  |
| `onModelSelect`   | Երթուղավորման համար մոդելն ընտրվել է             | Մոդելի տեղեկություններ        |
| `onComboResolve`  | Համակցված երթուղավորումը որոշվել է               | Համակցման թիրախներ            |
| `onRateLimit`     | Հարցումների հաճախականության սահմանաչափը լրացել է | Սահմանաչափի տեղեկություններ   |
| `onQuotaExhaust`  | Քվոտան սպառվել է                                 | Քվոտայի տեղեկություններ       |
| `onProviderError` | Մատակարարը սխալ է վերադարձրել                    | Սխալի մանրամասներ             |
| `onStreamStart`   | SSE հոսքը սկսվել է                               | Հոսքի տեղեկություններ         |
| `onStreamEnd`     | SSE հոսքն ավարտվել է                             | Հոսքի վիճակագրություն         |
| `onInstall`       | Փլագինը տեղադրվել է                              | `{ name, version, manifest }` |
| `onActivate`      | Փլագինն ակտիվացվել է                             | `{ name, version, manifest }` |
| `onDeactivate`    | Փլագինն ապաակտիվացվել է                          | `{ name, version, manifest }` |
| `onUninstall`     | Փլագինը հեռացվել է (նախքան ֆայլերի ջնջումը)      | `{ name, version, manifest }` |

## Օրինակներ

### Հայցեք լոգեր

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Գնահատման սահմանափակիչ

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

### Արձագանքման տրանսֆորմատոր

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
