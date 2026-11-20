# OmniRoute Plugin SDK (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Pornire rapidă

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

## API Referință

### `definePlugin(def: PluginDefinition): Plugin`

Funcție de fabrică care creează un obiect Plugin cu valori implicite.

**Parametri:**

- `name` (șir, necesar) — Numele pluginului în cazul kebab
- `priority` (număr, opțional, implicit: 100) — Lower rulează mai întâi
- `enabled` (boolean, opțional, implicit: adevărat) — Start activat?
- `onRequest` (funcție, opțional) — Se execută înainte de gestionarea chatului
- `onResponse` (funcție, opțional) — Se execută după gestionarea chatului
- `onError` (funcție, opțional) — Se execută pe o eroare de gestionare

### `blockRequest(response?): BlockingHookResult`

Blocați cererea și, opțional, returnați un răspuns personalizat.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Modificați corpul cererii înainte ca acesta să ajungă la furnizor.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Atașați metadate la contextul solicitării.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Contextul pluginului (`PluginContext`)

| Domeniu      | Tip                       | Descriere                        |
| ------------ | ------------------------- | -------------------------------- |
| `requestId`  | `string`                  | Identificator unic al cererii    |
| `model`      | `string`                  | Numele modelului solicitat       |
| `provider`   | `string`                  | Furnizorul țintă ID              |
| `body`       | `Record<string, unknown>` | Corpul cererii                   |
| `headers`    | `Record<string, string>`  | Antetele cererii (vezi nota)     |
| `metadata`   | `Record<string, unknown>` | Metadate modificabile            |
| `timestamp`  | `number`                  | Solicitați marca temporală       |
| `apiKeyInfo` | `object` (opțional)       | metadatele cheii API (vezi nota) |

Contextul nu poartă niciodată acreditările clientului: anteturile `authorization`, `x-api-key`, `proxy-authorization` și `cookie` sunt eliminate (orice carcasă), iar `apiKeyInfo` păstrează metadatele cheii (cum ar fi `id`, `name` și `scopes`), dar nu și valoarea cheii sau amprenta acesteia (`redactPluginContext()` în `src/lib/plugins/hooks.ts`). Acest lucru se aplică pentru `onRequest`, `onResponse` și `onError`.

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

### Prioritatea hookurilor

Hookurile pot fi configurate cu o prioritate (mai mică = rulează prima):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Sau ca valori booleene simple (prioritate implicită 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistem de permisiuni

Pluginurile sunt** nu cu nisip** . Fiecare plugin activ rulează ca un proces copil Node.js separat, obișnuit (`loadPlugin()` în `src/lib/plugins/loader.ts`) sub același utilizator de sistem de operare ca OmniRoute, fără context VM și fără steaguri de permisiune Node.js. Codul de plugin poate folosi `node:fs`, `node:child_process`, `fetch` și orice alt Node.js API: poate citi și scrie orice fișier pe care utilizatorul OmniRoute îl poate (inclusiv directorul de date), rula programe și poate ajunge în rețea.

`requires.permissions` al manifestului acceptă `network`, `file-read`, `file-write`, `env` și `exec`, dar astăzi doar `env` are efect în timpul execuției:

| Permisiune                                   | Efect astăzi                                                                                                                                                                                                                             |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Procesul de plugin primește, de asemenea, `PORT`, `HOSTNAME`, `TZ` și `TMPDIR`. Fără el, primește doar `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` și `PLUGIN_NAME` (plus `SystemRoot` și `windir` pe Windows). |
| `network`, `file-read`, `file-write`, `exec` | Nici unul. Sunt doar declarații: nimic nu este blocat atunci când lipsesc.                                                                                                                                                               |

Instalarea unui plugin este ca și instalarea oricărui alt program pe gazdă. Instalați numai pluginuri în a căror sursă aveți încredere.

## Schema de configurare

Definiți setările configurabile în `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Cheie API externă" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Tipuri de câmpuri: `string`, `number`, `boolean`, `select`

Opțiuni pentru câmpuri: `default`, `min`, `max`, `enum`, `description`

Valorile de configurare sunt stocate în baza de date și sunt accesibile prin pagina de configurare a panoului de control.

## Evenimente încorporate

| Eveniment         | Când                                                          | Date utile                    |
| ----------------- | ------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Înaintea gestionarului de chat                                | Contextul cererii             |
| `onResponse`      | După gestionarul de chat                                      | Datele răspunsului            |
| `onError`         | La apariția unei erori în gestionar                           | Obiectul erorii               |
| `onModelSelect`   | La selectarea modelului pentru rutare                         | Informații despre model       |
| `onComboResolve`  | La rezolvarea rutării combinate                               | Destinațiile combinației      |
| `onRateLimit`     | La atingerea limitei de frecvență                             | Informații despre limită      |
| `onQuotaExhaust`  | La epuizarea cotei                                            | Informații despre cotă        |
| `onProviderError` | Când furnizorul returnează o eroare                           | Detaliile erorii              |
| `onStreamStart`   | La pornirea fluxului SSE                                      | Informații despre flux        |
| `onStreamEnd`     | La încheierea fluxului SSE                                    | Statisticile fluxului         |
| `onInstall`       | La instalarea pluginului                                      | `{ name, version, manifest }` |
| `onActivate`      | La activarea pluginului                                       | `{ name, version, manifest }` |
| `onDeactivate`    | La dezactivarea pluginului                                    | `{ name, version, manifest }` |
| `onUninstall`     | La dezinstalarea pluginului (înainte de ștergerea fișierelor) | `{ name, version, manifest }` |

## Exemple

### Solicitați Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limitator de rată

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

### Transformator de răspuns

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
