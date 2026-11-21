# OmniRoute Plugin SDK (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Hurtig start

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

## API reference

### `definePlugin(def: PluginDefinition): Plugin`

Fabriksfunktion, der opretter et plugin-objekt med standardindstillinger.

**Parametre:**

- `name` (streng, påkrævet) — Plugin-navn i kebab-case
- `priority` (nummer, valgfrit, standard: 100) — Lower kører først
- `enabled` (boolesk, valgfri, standard: sand) — Start aktiveret?
- `onRequest` (funktion, valgfri) — Kører før chatbehandler
- `onResponse` (funktion, valgfri) — Kører efter chatbehandler
- `onError` (funktion, valgfri) — Kører på handlerfejl

### `blockRequest(response?): BlockingHookResult`

Bloker anmodningen og returner eventuelt et tilpasset svar.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Rediger anmodningsteksten, før den når udbyderen.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Vedhæft metadata til anmodningskonteksten.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin-kontekst (`PluginContext`)

| Felt         | Type                      | Beskrivelse                      |
| ------------ | ------------------------- | -------------------------------- |
| `requestId`  | `string`                  | Unik anmodnings-id               |
| `model`      | `string`                  | Anmodet modelnavn                |
| `provider`   | `string`                  | Måludbyder ID                    |
| `body`       | `Record<string, unknown>` | Anmodningsorgan                  |
| `headers`    | `Record<string, string>`  | Anmodningsoverskrifter (se note) |
| `metadata`   | `Record<string, unknown>` | Foranderlig metadata             |
| `timestamp`  | `number`                  | Anmod om tidsstempel             |
| `apiKeyInfo` | `object` (valgfrit)       | API nøgle metadata (se note)     |

Konteksten bærer aldrig klientens legitimationsoplysninger: `authorization`, `x-api-key`, `proxy-authorization` og `cookie` -overskrifterne fjernes (enhver casing), og `apiKeyInfo` beholder nøglens metadata (såsom `id`, `name` og `scopes`), men ikke nøgleværdien eller dens fingeraftryk (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). Dette gælder for `onRequest`, `onResponse` og `onError`.

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

### Hookprioritet

Hooks kan konfigureres med en prioritet (lavere = køres først):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Eller som simple booleske værdier (standardprioritet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Tilladelsessystem

Som standard er plugins** ikke sandkasse** . Hvert aktivt plugin kører som en separat, almindelig Node.js underordnet proces (`loadPlugin()` i `src/lib/plugins/loader.ts`) under den samme operativsystembruger som OmniRoute, uden VM kontekst og ingen Node.js tilladelsesflag. Plugin-kode kan bruge `node:fs`, `node:child_process`, `fetch` og hver anden Node.js API: den kan læse og skrive enhver fil, som OmniRoute brugeren kan (inklusive databiblioteket), køre programmer og nå netværket.

Manifestets `requires.permissions` accepterer `network`, `file-read`, `file-write`, `env` og `exec`. Med standardindstillingerne har kun `env` en effekt under kørsel.

### Tilvalgstilladelsesmodel (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` -funktionsflaget (kategori `security`,** slukket som standard** ) starter hver plugin-proces med [Node.js tilladelsesmodellen](https://nodejs.org/api/permissions.html) (`--permission`, accepteret af hver understøttet Node.js linje: 22.22 +, 24 og 26). Flagene er bygget ud fra manifestet af `buildPermissionModelArgs()` i `src/lib/plugins/permissionModel.ts`. Flaget læses, når et plugin er aktiveret, så det gælder for plugins aktiveret efter ændringen; deaktiver og aktiver et kørende plugin for at anvende det.

Plugin-datamappen er `plugin-data/<plugin-name>` ved siden af plugin-roden (`~/.omniroute/plugin-data/<plugin-name>` som standard, `getPluginDataDir()`). Med flaget tændt, sendes dets sti til plugin'et som `PLUGIN_DATA_DIR`.

| Tilladelse   | Flag fra (standard)                                                                                                                                                                                                              | Flag på                                                                                                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (ingen)      | OmniRoute brugerens fulde rettigheder.                                                                                                                                                                                           | Filen kan kun læses inde i plugin-mappen. Ingen filskrivning, ingen underordnede processer, ingen arbejdstråde, ingen native tilføjelser, ingen WASI.                                                                                                                |
| `env`        | Plugin-processen modtager også `PORT`, `HOSTNAME`, `TZ` og `TMPDIR`. Uden den modtager den kun `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` og `PLUGIN_NAME` (plus `SystemRoot` og `windir` på Windows). | Samme som med flaget af.                                                                                                                                                                                                                                             |
| `file-read`  | Ingen (kun erklæring).                                                                                                                                                                                                           | Plugin-databiblioteket bliver også læsbart (det oprettes, hvis det mangler).                                                                                                                                                                                         |
| `file-write` | Ingen (kun erklæring).                                                                                                                                                                                                           | Plugin-datamappen bliver læsbar og skrivbar (`--allow-fs-write`). Intet andet kan skrives.                                                                                                                                                                           |
| `exec`       | Ingen (kun erklæring).                                                                                                                                                                                                           | Underordnede processer er tilladt (`--allow-child-process`). Node.js sender tilladelsesflagene videre til underordnede Node.js -processer gennem `NODE_OPTIONS`, men ethvert andet program kører uden begrænsninger, så `exec` ophæver effektivt filsystemgrænserne. |
| `network`    | Ingen (kun erklæring).                                                                                                                                                                                                           | Ingen. Node.js tilladelsesmodellen begrænser ikke udgående netværksadgang, så `network` forbliver en erklæring og håndhæves aldrig.                                                                                                                                  |

Hvis flaget slås til, afbrydes plugins, der læser filer uden for deres egen mappe (for eksempel et modul, der er løst fra en overordnet `node_modules`), skriver hvor som helst end deres datamappe eller afføder processer uden at erklære `exec`. Selv med flaget på plugin bevarer netværksadgang og kører som OmniRoute brugeren, så installer kun plugins, hvis kilde du har tillid til.

## Konfigurationsskema

Definer konfigurerbare indstillinger i `configSchema`:

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

Felttyper: `string`, `number`, `boolean`, `select`

Feltindstillinger: `default`, `min`, `max`, `enum`, `description`

Konfigurationsværdier gemmes i databasen og er tilgængelige via dashboardets konfigurationsside.

## Indbyggede hændelser

| Hændelse          | Hvornår                                  | Data                          |
| ----------------- | ---------------------------------------- | ----------------------------- |
| `onRequest`       | Før chat-handleren                       | Forespørgselskontekst         |
| `onResponse`      | Efter chat-handleren                     | Svardata                      |
| `onError`         | Ved handlerfejl                          | Fejlobjekt                    |
| `onModelSelect`   | Model valgt til routing                  | Modeloplysninger              |
| `onComboResolve`  | Kombinationsrouting afklaret             | Kombinationsmål               |
| `onRateLimit`     | Hastighedsgrænse nået                    | Grænseoplysninger             |
| `onQuotaExhaust`  | Kvote opbrugt                            | Kvoteoplysninger              |
| `onProviderError` | Udbyderen returnerede en fejl            | Fejloplysninger               |
| `onStreamStart`   | SSE-stream startet                       | Streamoplysninger             |
| `onStreamEnd`     | SSE-stream afsluttet                     | Streamstatistik               |
| `onInstall`       | Plugin installeret                       | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktiveret                         | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deaktiveret                       | `{ name, version, manifest }` |
| `onUninstall`     | Plugin afinstalleret (før filer slettes) | `{ name, version, manifest }` |

## Eksempler

### Anmod om Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Satsbegrænser

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

### Respons Transformer

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
