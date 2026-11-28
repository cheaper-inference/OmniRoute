# OmniRoute Plugin SDK (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Snabbstart

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

## API referens

### `definePlugin(def: PluginDefinition): Plugin`

Fabriksfunktion som skapar ett plugin-objekt med standardinställningar.

**Parametrar:**

- `name` (sträng, krävs) — Plugin-namn i kebab-case
- `priority` (nummer, valfritt, standard: 100) — Lower körs först
- `enabled` (boolesk, valfritt, standard: sant) — Start aktiverad?
- `onRequest` (funktion, valfritt) — Körs före chathanteraren
- `onResponse` (funktion, valfritt) — Körs efter chatthanteraren
- `onError` (funktion, valfritt) — Körs vid hanterarfel

### `blockRequest(response?): BlockingHookResult`

Blockera begäran och returnera eventuellt ett anpassat svar.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Ändra förfrågan innan den når leverantören.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Bifoga metadata till förfrågningskontexten.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Pluginkontext (`PluginContext`)

| Fält         | Typ                       | Beskrivning                    |
| ------------ | ------------------------- | ------------------------------ |
| `requestId`  | `string`                  | Unik förfrågningsidentifierare |
| `model`      | `string`                  | Begärt modellnamn              |
| `provider`   | `string`                  | Målleverantör ID               |
| `body`       | `Record<string, unknown>` | Begäran kropp                  |
| `headers`    | `Record<string, string>`  | Request headers (se not)       |
| `metadata`   | `Record<string, unknown>` | Föränderlig metadata           |
| `timestamp`  | `number`                  | Begär tidsstämpel              |
| `apiKeyInfo` | `object` (valfritt)       | API nyckelmetadata (se not)    |

Kontexten innehåller aldrig klientens autentiseringsuppgifter: `authorization`, `x-api-key`, `proxy-authorization` och `cookie` -huvudena tas bort (vilket som helst), och `apiKeyInfo` behåller nyckelns metadata (som `id`, `name` och `scopes`) men inte nyckelvärdet eller dess fingeravtryck (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). Detta gäller för `onRequest`, `onResponse` och `onError`.

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

### Hook-prioritet

Hooks kan konfigureras med prioritet (lägre = körs först):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Eller som enkla booleska värden (standardprioritet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Behörighetssystem

Plugins är** inte sandlåda** . Varje aktiv plugin körs som en separat, vanlig Node.js underordnad process (`loadPlugin()` in `src/lib/plugins/loader.ts`) under samma operativsystemanvändare som OmniRoute, utan VM kontext och inga Node.js -behörighetsflaggor. Plugin-koden kan använda `node:fs`, `node:child_process`, `fetch` och varannan Node.js API: den kan läsa och skriva vilken fil som helst som OmniRoute användaren kan (inklusive datakatalogen), köra program och nå nätverket.

Manifestets `requires.permissions` accepterar `network`, `file-read`, `file-write`, `env` och `exec`, men idag har endast `env` en effekt vid körning:

| Tillstånd                                    | Effekt idag                                                                                                                                                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Plugin-processen tar också emot `PORT`, `HOSTNAME`, `TZ` och `TMPDIR`. Utan den tar den bara emot `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` och `PLUGIN_NAME` (plus `SystemRoot` och `windir` på Windows). |
| `network`, `file-read`, `file-write`, `exec` | Ingen. De är endast deklarationer: ingenting är blockerat när de saknas.                                                                                                                                                              |

Att installera ett plugin är som att installera vilket annat program som helst på värden. Installera endast plugins vars källa du litar på.

## Konfigurationsschema

Definiera konfigurerbara inställningar i `configSchema`:

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

Fälttyper: `string`, `number`, `boolean`, `select`

Fältalternativ: `default`, `min`, `max`, `enum`, `description`

Konfigurationsvärden sparas i databasen och är tillgängliga via konfigurationssidan i instrumentpanelen.

## Inbyggda händelser

| Händelse          | När                                        | Nyttolast                     |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `onRequest`       | Före chatthanteraren                       | Begärankontext                |
| `onResponse`      | Efter chatthanteraren                      | Svarsdata                     |
| `onError`         | Vid hanteringsfel                          | Felobjekt                     |
| `onModelSelect`   | Modell vald för dirigering                 | Modellinformation             |
| `onComboResolve`  | Kombinationsdirigering löst                | Kombinationsmål               |
| `onRateLimit`     | Hastighetsgräns uppnådd                    | Gränsinformation              |
| `onQuotaExhaust`  | Kvot förbrukad                             | Kvotinformation               |
| `onProviderError` | Leverantören returnerade ett fel           | Felinformation                |
| `onStreamStart`   | SSE-ström startad                          | Ströminformation              |
| `onStreamEnd`     | SSE-ström avslutad                         | Strömstatistik                |
| `onInstall`       | Plugin installerad                         | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktiverad                           | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin inaktiverad                         | `{ name, version, manifest }` |
| `onUninstall`     | Plugin avinstallerad (innan filer raderas) | `{ name, version, manifest }` |

## Exempel

### Begär Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Prisbegränsare

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

### Svarstransformator

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
