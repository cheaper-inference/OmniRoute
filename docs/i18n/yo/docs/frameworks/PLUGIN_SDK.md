# OmniRoute Plugin SDK (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Ibẹrẹ kiakia

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

## API Reference

### `definePlugin(def: PluginDefinition): Plugin`

Iṣẹ ile-iṣẹ ti o ṣẹda ohun itanna kan pẹlu awọn aiyipada.

**Awọn paramita:**

- `name` (okun, beere) orukọ itanna — ni kebab-case
- `priority` (nọmba, iyan, aiyipada: 100) — Isalẹ nṣiṣẹ akọkọ
- `enabled` (boolean, iyan, aiyipada: otitọ) — Ibẹrẹ ṣiṣẹ bi?
- `onRequest` (iṣẹ, iyan) — Ṣiṣe ṣaaju oluṣakoso iwiregbe
- `onResponse` (iṣẹ, iyan) — Ṣiṣe lẹhin oluṣakoso iwiregbe
- `onError` (iṣẹ, iyan) — Ṣiṣe lori aṣiṣe olutọju

### `blockRequest(response?): BlockingHookResult`

Dina ibeere naa ki o da esi aṣa pada ni yiyan.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Ṣe atunṣe ara ibeere ṣaaju ki o de ọdọ olupese.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

So metadata si ipo ibeere.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Ọrọ itanna (`PluginContext`)

| Aaye         | Iru                       | Apejuwe                          |
| ------------ | ------------------------- | -------------------------------- |
| `requestId`  | `string`                  | Oto ìbéèrè idamo                 |
| `model`      | `string`                  | Ti beere orukọ awoṣe             |
| `provider`   | `string`                  | Olupese afojusun ID              |
| `body`       | `Record<string, unknown>` | Beere ara                        |
| `headers`    | `Record<string, string>`  | Beere awọn akọle (wo akọsilẹ)    |
| `metadata`   | `Record<string, unknown>` | metadata iyipada                 |
| `timestamp`  | `number`                  | Beere timestamp                  |
| `apiKeyInfo` | `object` (aṣayan)         | metadata bọtini API (wo akọsilẹ) |

Ayika ko gbe awọn iwe-ẹri alabara: `authorization`, `x-api-key`, `proxy-authorization` ati awọn akọle `cookie` kuro (eyikeyi casing), ati `apiKeyInfo` tọju metadata bọtini (gẹgẹbi `id`, `name` ati `scopes`) ṣugbọn kii ṣe iye bọtini tabi itẹka rẹ (`redactPluginContext()` ni `src/lib/plugins/hooks.ts`). Eyi kan si `onRequest`, `onResponse` ati `onError`.

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

### Ipò Àṣíwájú Hook

A lè ṣètò àwọn hook pẹ̀lú ipò àṣíwájú (tí ó kéré = ó máa ṣiṣẹ́ kọ́kọ́):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Tàbí gẹ́gẹ́ bí àwọn boolean rírọrùn (ipò àṣíwájú àìpé 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Gbigbanilaaye System

Awọn afikun jẹ** ko sandboxed** . Ohun itanna kọọkan n ṣiṣẹ bi lọtọ, ilana ọmọ Node.js lasan (`loadPlugin()` ni `src/lib/plugins/loader.ts`) labẹ olumulo ẹrọ ṣiṣe kanna bi OmniRoute, laisi ipo VM ati ko si awọn asia igbanilaaye Node.js. Awọn koodu itanna le lo `node:fs`, `node:child_process`, `fetch` ati gbogbo Node.js API miiran: o le ka ati kọ faili eyikeyi ti olumulo OmniRoute le (pẹlu itọsọna data), ṣiṣe awọn eto ati de nẹtiwọki.

`requires.permissions` ti ifihan gba `network`, `file-read`, `file-write`, `env` ati `exec`, ṣugbọn loni `env` nikan ni o ni ipa ni akoko asiko:

| Igbanilaaye                                  | Ipa loni                                                                                                                                                                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Ilana itanna tun gba `PORT`, `HOSTNAME`, `TZ` ati `TMPDIR`. Laisi rẹ, o gba `PATH` nikan, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` ati `PLUGIN_NAME` (pẹlu `SystemRoot` ati `windir` lori Windows). |
| `network`, `file-read`, `file-write`, `exec` | Ko si. Wọn jẹ awọn ikede nikan: ko si ohun ti o dina mọ nigbati wọn nsọnu.                                                                                                                                              |

Fifi sori ẹrọ itanna kan dabi fifi sori ẹrọ eyikeyi eto miiran lori agbalejo naa. Fi sori ẹrọ awọn afikun nikan ti orisun wọn ti o gbẹkẹle.

## Schema Ìṣètò

Ṣàlàyé àwọn ìṣètò tí a lè túnṣe nínú `configSchema`:

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

Àwọn irú pápá: `string`, `number`, `boolean`, `select`

Àwọn àṣàyàn pápá: `default`, `min`, `max`, `enum`, `description`

Àwọn iye ìṣètò ni a ń tọ́jú sínú database, a sì lè ráyè sí wọn nípasẹ̀ ojú-ewé ìṣètò dashboard.

## Àwọn Ìṣẹ̀lẹ̀ Tí A Kọ́ Sínú Ètò

| Ìṣẹ̀lẹ̀             | Ìgbà tí ó máa ń ṣẹlẹ̀                                    | Payload                       |
| ----------------- | ------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Ṣáájú chat handler                                      | Àyíká request                 |
| `onResponse`      | Lẹ́yìn chat handler                                      | Dátà response                 |
| `onError`         | Nígbà àṣìṣe handler                                     | Object àṣìṣe                  |
| `onModelSelect`   | Nígbà tí a bá yan model fún routing                     | Àlàyé model                   |
| `onComboResolve`  | Nígbà tí a bá yanjú combo routing                       | Àwọn ibi-àfojúsùn combo       |
| `onRateLimit`     | Nígbà tí a bá dé òpin rate                              | Àlàyé òpin                    |
| `onQuotaExhaust`  | Nígbà tí quota bá tán                                   | Àlàyé quota                   |
| `onProviderError` | Nígbà tí provider bá dá àṣìṣe padà                      | Àwọn kúlẹ̀kúlẹ̀ àṣìṣe           |
| `onStreamStart`   | Nígbà tí stream SSE bá bẹ̀rẹ̀                             | Àlàyé stream                  |
| `onStreamEnd`     | Nígbà tí stream SSE bá parí                             | Àwọn ìṣirò stream             |
| `onInstall`       | Nígbà tí a bá fi plugin sí ẹrọ                          | `{ name, version, manifest }` |
| `onActivate`      | Nígbà tí a bá mú plugin ṣiṣẹ́                            | `{ name, version, manifest }` |
| `onDeactivate`    | Nígbà tí a bá dá plugin dúró                            | `{ name, version, manifest }` |
| `onUninstall`     | Nígbà tí a bá yọ plugin kúrò (ṣáájú pípa àwọn fáìlì rẹ́) | `{ name, version, manifest }` |

## Awọn apẹẹrẹ

### Beere Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Idiwọn Oṣuwọn

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

### Amunawa idahun

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
