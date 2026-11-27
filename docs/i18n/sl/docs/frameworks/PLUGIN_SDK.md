# OmniRoute Plugin SDK (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Hitri začetek

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

## Referenca API

### `definePlugin(def: PluginDefinition): Plugin`

Tovarniška funkcija, ki ustvari objekt vtičnika s privzetimi nastavitvami.

**Parametri:**

- `name` (niz, obvezno) — Ime vtičnika v kebab-case
- `priority` (število, neobvezno, privzeto: 100) — Lower se najprej zažene
- `enabled` (logična vrednost, neobvezno, privzeto: resnično) — Start omogočen?
- `onRequest` (funkcija, neobvezno) — Zažene se pred upravljalnikom klepeta
- `onResponse` (funkcija, neobvezno) — Zažene se po upravljalniku klepeta
- `onError` (funkcija, neobvezno) — Zažene se ob napaki upravljalnika

### `blockRequest(response?): BlockingHookResult`

Blokirajte zahtevo in po želji vrnite odgovor po meri.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Spremenite telo zahteve, preden doseže ponudnika.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Priložite metapodatke kontekstu zahteve.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontekst vtičnika (`PluginContext`)

| Polje        | Vrsta                     | Opis                                   |
| ------------ | ------------------------- | -------------------------------------- |
| `requestId`  | `string`                  | Enolični identifikator zahteve         |
| `model`      | `string`                  | Zahtevano ime modela                   |
| `provider`   | `string`                  | Ciljni ponudnik ID                     |
| `body`       | `Record<string, unknown>` | Telo zahteve                           |
| `headers`    | `Record<string, string>`  | Glave zahtev (glejte opombo)           |
| `metadata`   | `Record<string, unknown>` | Spremenljivi metapodatki               |
| `timestamp`  | `number`                  | Časovni žig zahteve                    |
| `apiKeyInfo` | `object` (neobvezno)      | metapodatki ključa API (glejte opombo) |

Kontekst nikoli ne nosi odjemalčevih poverilnic: glave `authorization`, `x-api-key`, `proxy-authorization` in `cookie` so odstranjene (poljubna mala črka), `apiKeyInfo` pa obdrži metapodatke ključa (kot so `id`, `name` in `scopes`), ne pa vrednosti ključa ali njegovega prstnega odtisa (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). To velja za `onRequest`, `onResponse` in `onError`.

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

### Prednost kavljev

Kavlje je mogoče nastaviti s prednostjo (nižja vrednost = izvede se prej):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ali kot preproste logične vrednosti (privzeta prednost je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistem dovoljenj

Vtičniki so** ni v peskovniku** . Vsak aktivni vtičnik se izvaja kot ločen, navaden podrejeni proces Node.js (`loadPlugin()` in `src/lib/plugins/loader.ts`) pod istim uporabnikom operacijskega sistema kot OmniRoute, brez konteksta VM in zastavic za dovoljenje Node.js. Koda vtičnika lahko uporablja `node:fs`, `node:child_process`, `fetch` in vse druge Node.js API: lahko bere in piše katero koli datoteko, ki jo lahko uporabnik OmniRoute (vključno z imenikom podatkov), izvaja programe in doseže omrežje.

`requires.permissions` manifesta sprejema `network`, `file-read`, `file-write`, `env` in `exec`, vendar ima danes samo `env` učinek med izvajanjem:

| Dovoljenje                                   | Učinek danes                                                                                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Proces vtičnika prejme tudi `PORT`, `HOSTNAME`, `TZ` in `TMPDIR`. Brez njega prejme samo `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` in `PLUGIN_NAME` (ter `SystemRoot` in `windir` na Windows). |
| `network`, `file-read`, `file-write`, `exec` | Noben. So le izjave: nič ni blokirano, če manjkajo.                                                                                                                                                                       |

Namestitev vtičnika je kot namestitev katerega koli drugega programa na gostitelja. Namestite samo vtičnike, katerih virom zaupate.

## Konfiguracijska shema

Nastavitve, ki jih je mogoče konfigurirati, določite v `configSchema`:

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

Vrste polj: `string`, `number`, `boolean`, `select`

Možnosti polj: `default`, `min`, `max`, `enum`, `description`

Konfiguracijske vrednosti so shranjene v podatkovni zbirki in dostopne prek konfiguracijske strani nadzorne plošče.

## Vgrajeni dogodki

| Dogodek           | Kdaj                                             | Koristna vsebina              |
| ----------------- | ------------------------------------------------ | ----------------------------- |
| `onRequest`       | Pred obravnavo klepeta                           | Kontekst zahteve              |
| `onResponse`      | Po obravnavi klepeta                             | Podatki odgovora              |
| `onError`         | Ob napaki obravnavalnika                         | Objekt napake                 |
| `onModelSelect`   | Ko je model izbran za usmerjanje                 | Informacije o modelu          |
| `onComboResolve`  | Ko je kombinirano usmerjanje razrešeno           | Cilji kombinacije             |
| `onRateLimit`     | Ko je dosežena omejitev pogostosti               | Informacije o omejitvi        |
| `onQuotaExhaust`  | Ko je kvota izčrpana                             | Informacije o kvoti           |
| `onProviderError` | Ko ponudnik vrne napako                          | Podrobnosti napake            |
| `onStreamStart`   | Ko se tok SSE začne                              | Informacije o toku            |
| `onStreamEnd`     | Ko se tok SSE konča                              | Statistični podatki toka      |
| `onInstall`       | Ko je vtičnik nameščen                           | `{ name, version, manifest }` |
| `onActivate`      | Ko je vtičnik aktiviran                          | `{ name, version, manifest }` |
| `onDeactivate`    | Ko je vtičnik deaktiviran                        | `{ name, version, manifest }` |
| `onUninstall`     | Ko je vtičnik odstranjen (pred izbrisom datotek) | `{ name, version, manifest }` |

## Primeri

### Request Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Omejevalnik hitrosti

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

### Odzivni transformator

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
