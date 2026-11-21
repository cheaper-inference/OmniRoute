# OmniRoute Plugin SDK (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Rask start

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

## API Referanse

### `definePlugin(def: PluginDefinition): Plugin`

Fabrikkfunksjon som lager et plugin-objekt med standardinnstillinger.

**Parametere:**

- `name` (streng, påkrevd) — Pluginnavn i kebab-case
- `priority` (nummer, valgfritt, standard: 100) — Lower kjøres først
- `enabled` (boolsk, valgfritt, standard: sant) — Start aktivert?
- `onRequest` (funksjon, valgfritt) — Kjører før chatbehandler
- `onResponse` (funksjon, valgfritt) — Kjører etter chatbehandler
- `onError` (funksjon, valgfritt) — Kjører på behandlerfeil

### `blockRequest(response?): BlockingHookResult`

Blokker forespørselen og returner eventuelt et tilpasset svar.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Endre forespørselsteksten før den når leverandøren.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Legg ved metadata til forespørselskonteksten.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin-kontekst (`PluginContext`)

| Felt         | Type                      | Beskrivelse                      |
| ------------ | ------------------------- | -------------------------------- |
| `requestId`  | `string`                  | Unik forespørselsidentifikator   |
| `model`      | `string`                  | Forespurt modellnavn             |
| `provider`   | `string`                  | Målleverandør ID                 |
| `body`       | `Record<string, unknown>` | Forespørselsinstans              |
| `headers`    | `Record<string, string>`  | Forespørselshoder (se merknad)   |
| `metadata`   | `Record<string, unknown>` | Mulig metadata                   |
| `timestamp`  | `number`                  | Be om tidsstempel                |
| `apiKeyInfo` | `object` (valgfritt)      | API -nøkkelmetadata (se merknad) |

Konteksten har aldri klientens legitimasjon: `authorization`, `x-api-key`, `proxy-authorization` og `cookie` -overskriftene fjernes (hvilket som helst), og `apiKeyInfo` beholder nøkkelens metadata (som `id`, `name` og `scopes`), men ikke nøkkelverdien eller fingeravtrykket (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). Dette gjelder for `onRequest`, `onResponse` og `onError`.

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

Hooks kan konfigureres med prioritet (lavere = kjøres først):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Eller som enkle boolske verdier (standardprioritet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Tillatelsessystem

Som standard er plugins** ikke sandkasse** . Hvert aktive plugin kjører som en separat, vanlig Node.js underordnet prosess (`loadPlugin()` in `src/lib/plugins/loader.ts`) under samme operativsystembruker som OmniRoute, uten VM kontekst og ingen Node.js tillatelsesflagg. Plugin-kode kan bruke `node:fs`, `node:child_process`, `fetch` og annenhver Node.js API: den kan lese og skrive hvilken som helst fil OmniRoute brukeren kan (inkludert datakatalogen), kjøre programmer og nå nettverket.

Manifestets `requires.permissions` aksepterer `network`, `file-read`, `file-write`, `env` og `exec`. Med standardinnstillingene har bare `env` en effekt under kjøring.

### Modell for registreringstillatelse (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` -funksjonsflagget (kategori `security`,** av som standard** ) starter hver plugin-prosess med [Node.js tillatelsesmodellen](https://nodejs.org/api/permissions.html) (`--permission`, akseptert av hver støttede Node.js linje: 22.22 +, 24 og 26). Flaggene er bygget fra manifestet av `buildPermissionModelArgs()` i `src/lib/plugins/permissionModel.ts`. Flagget leses når en plugin aktiveres, så den gjelder for plugins aktivert etter endringen; deaktiver og aktiver en kjørende plugin for å bruke den.

Programtilleggets datakatalog er `plugin-data/<plugin-name>` ved siden av plugin-roten (`~/.omniroute/plugin-data/<plugin-name>` som standard, `getPluginDataDir()`). Med flagget på, sendes banen til plugin som `PLUGIN_DATA_DIR`.

| Tillatelse   | Flagg av (standard)                                                                                                                                                                                                            | Flagg på                                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (ingen)      | Fulle rettigheter for OmniRoute brukeren.                                                                                                                                                                                      | Filen kan kun leses i plugin-katalogen. Ingen filskriving, ingen underordnede prosesser, ingen arbeidertråder, ingen native addons, ingen WASI.                                                                                                                       |
| `env`        | Plugin-prosessen mottar også `PORT`, `HOSTNAME`, `TZ` og `TMPDIR`. Uten den mottar den bare `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` og `PLUGIN_NAME` (pluss `SystemRoot` og `windir` på Windows). | Samme som med flagget av.                                                                                                                                                                                                                                             |
| `file-read`  | Ingen (kun erklæring).                                                                                                                                                                                                         | Programtilleggets datakatalog blir også lesbar (den opprettes hvis den mangler).                                                                                                                                                                                      |
| `file-write` | Ingen (kun erklæring).                                                                                                                                                                                                         | Programtilleggets datakatalog blir lesbar og skrivbar (`--allow-fs-write`). Ingenting annet er skrivbart.                                                                                                                                                             |
| `exec`       | Ingen (kun erklæring).                                                                                                                                                                                                         | Underordnede prosesser er tillatt (`--allow-child-process`). Node.js sender tillatelsesflaggene videre til underordnede Node.js -prosesser gjennom `NODE_OPTIONS`, men ethvert annet program kjører uten begrensninger, så `exec` løfter effektivt filsystemgrensene. |
| `network`    | Ingen (kun erklæring).                                                                                                                                                                                                         | Ingen. Node.js -tillatelsesmodellen begrenser ikke utgående nettverkstilgang, så `network` forblir en erklæring og blir aldri håndhevet.                                                                                                                              |

Å slå på flagget bryter plugins som leser filer utenfor deres egen katalog (for eksempel en modul løst fra en overordnet `node_modules`), skriver hvor som helst unntatt datakatalogen deres, eller starter prosesser uten å deklarere `exec`. Selv med flagget på plugin beholder nettverkstilgang og kjører som OmniRoute bruker, så installer kun plugins hvis kilde du stoler på.

## Konfigurasjonsskjema

Definer konfigurerbare innstillinger i `configSchema`:

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

Feltalternativer: `default`, `min`, `max`, `enum`, `description`

Konfigurasjonsverdier lagres i databasen og er tilgjengelige via konfigurasjonssiden i kontrollpanelet.

## Innebygde hendelser

| Hendelse          | Når                                             | Nyttelast                     |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `onRequest`       | Før chatbehandleren                             | Forespørselskontekst          |
| `onResponse`      | Etter chatbehandleren                           | Responsdata                   |
| `onError`         | Ved behandlerfeil                               | Feilobjekt                    |
| `onModelSelect`   | Modell valgt for ruting                         | Modellinformasjon             |
| `onComboResolve`  | Kombinasjonsruting løst                         | Kombinasjonsmål               |
| `onRateLimit`     | Frekvensgrense nådd                             | Grenseinformasjon             |
| `onQuotaExhaust`  | Kvote oppbrukt                                  | Kvoteinformasjon              |
| `onProviderError` | Leverandøren returnerte en feil                 | Feildetaljer                  |
| `onStreamStart`   | SSE-strøm startet                               | Strøminformasjon              |
| `onStreamEnd`     | SSE-strøm avsluttet                             | Strømstatistikk               |
| `onInstall`       | Programtillegg installert                       | `{ name, version, manifest }` |
| `onActivate`      | Programtillegg aktivert                         | `{ name, version, manifest }` |
| `onDeactivate`    | Programtillegg deaktivert                       | `{ name, version, manifest }` |
| `onUninstall`     | Programtillegg avinstallert (før filer slettes) | `{ name, version, manifest }` |

## Eksempler

### Be om Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Satsbegrenser

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

### Respons transformator

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
