# OmniRoute Plugin SDK (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Snel beginnen

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

## API Referentie

### `definePlugin(def: PluginDefinition): Plugin`

Fabrieksfunctie die een Plugin-object met standaardwaarden maakt.

**Parameters:**

- `name` (string, vereist) — Plug-innaam in kebab-case
- `priority` (aantal, optioneel, standaard: 100) — Lower wordt eerst uitgevoerd
- `enabled` (boolean, optioneel, standaard: true) — Start ingeschakeld?
- `onRequest` (functie, optioneel) — Wordt uitgevoerd vóór de chathandler
- `onResponse` (functie, optioneel) — Wordt uitgevoerd na de chathandler
- `onError` (functie, optioneel) — Wordt uitgevoerd bij handlerfout

### `blockRequest(response?): BlockingHookResult`

Blokkeer het verzoek en retourneer optioneel een aangepast antwoord.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Wijzig de aanvraagtekst voordat deze de provider bereikt.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Voeg metagegevens toe aan de verzoekcontext.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugincontext (`PluginContext`)

| Veld         | Type                      | Beschrijving                            |
| ------------ | ------------------------- | --------------------------------------- |
| `requestId`  | `string`                  | Unieke aanvraag-ID                      |
| `model`      | `string`                  | Gevraagde modelnaam                     |
| `provider`   | `string`                  | Doelaanbieder ID                        |
| `body`       | `Record<string, unknown>` | Lichaam aanvragen                       |
| `headers`    | `Record<string, string>`  | Verzoekheaders (zie opmerking)          |
| `metadata`   | `Record<string, unknown>` | Veranderlijke metagegevens              |
| `timestamp`  | `number`                  | Tijdstempel aanvragen                   |
| `apiKeyInfo` | `object` (optioneel)      | API sleutelmetagegevens (zie opmerking) |

De context bevat nooit de inloggegevens van de cliënt: de headers `authorization`, `x-api-key`, `proxy-authorization` en `cookie` worden verwijderd (elke hoofdletter) en `apiKeyInfo` behoudt de metagegevens van de sleutel (zoals `id`, `name` en `scopes`) maar niet de sleutelwaarde of de vingerafdruk ervan (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). Dit geldt voor `onRequest`, `onResponse` en `onError`.

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

### Hookprioriteit

Hooks kunnen met een prioriteit worden geconfigureerd (lager = wordt eerder uitgevoerd):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Of als eenvoudige booleaanse waarden (standaardprioriteit 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Toestemmingssysteem

Standaard zijn plug-ins dat** niet in de sandbox** . Elke actieve plug-in wordt uitgevoerd als een afzonderlijk, gewoon Node.js onderliggend proces (`loadPlugin()` in `src/lib/plugins/loader.ts`) onder dezelfde besturingssysteemgebruiker als OmniRoute, zonder VM context en zonder Node.js -machtigingsvlaggen. Plug-incode kan `node:fs`, `node:child_process`, `fetch` en elke andere Node.js API gebruiken: het kan elk bestand lezen en schrijven dat de OmniRoute gebruiker kan (inclusief de gegevensmap), programma's uitvoeren en het netwerk bereiken.

De `requires.permissions` van het manifest accepteert `network`, `file-read`, `file-write`, `env` en `exec`. Met de standaardinstellingen heeft alleen `env` effect tijdens runtime.

### Opt-in toestemmingsmodel (`PLUGIN_PERMISSION_MODEL_ENABLED`)

De `PLUGIN_PERMISSION_MODEL_ENABLED` -functievlag (categorie `security`,** standaard uitgeschakeld** ) start elk plug-inproces met het [Node.js machtigingsmodel](https://nodejs.org/api/permissions.html) (`--permission`, geaccepteerd door elke ondersteunde Node.js regel: 22.22 +, 24 en 26). De vlaggen zijn opgebouwd uit het manifest door `buildPermissionModelArgs()` in `src/lib/plugins/permissionModel.ts`. De vlag wordt gelezen wanneer een plug-in wordt geactiveerd en is dus van toepassing op plug-ins die na de wijziging zijn geactiveerd; deactiveer en activeer een actieve plug-in om deze toe te passen.

De gegevensmap van de plug-in is `plugin-data/<plugin-name>` naast de hoofdmap van de plug-in (standaard `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Als de vlag is ingeschakeld, wordt het pad als `PLUGIN_DATA_DIR` aan de plug-in doorgegeven.

| Toestemming  | Vlag uit (standaard)                                                                                                                                                                                                                  | Vlag aan                                                                                                                                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (geen)       | Volledige rechten van de OmniRoute gebruiker.                                                                                                                                                                                         | Bestand leest alleen binnen de plug-inmap. Geen bestandsschrijfbewerkingen, geen onderliggende processen, geen werkthreads, geen native add-ons, geen WASI.                                                                                                                                |
| `env`        | Het plug-inproces ontvangt ook `PORT`, `HOSTNAME`, `TZ` en `TMPDIR`. Zonder dit ontvangt het alleen `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` en `PLUGIN_NAME` (plus `SystemRoot` en `windir` op Windows). | Hetzelfde als met de vlag uit.                                                                                                                                                                                                                                                             |
| `file-read`  | Geen (alleen aangifte).                                                                                                                                                                                                               | De gegevensmap van de plug-in wordt ook leesbaar (deze wordt aangemaakt als deze ontbreekt).                                                                                                                                                                                               |
| `file-write` | Geen (alleen aangifte).                                                                                                                                                                                                               | De gegevensmap van de plug-in wordt leesbaar en beschrijfbaar (`--allow-fs-write`). Niets anders is beschrijfbaar.                                                                                                                                                                         |
| `exec`       | Geen (alleen aangifte).                                                                                                                                                                                                               | Onderliggende processen zijn toegestaan (`--allow-child-process`). Node.js geeft de toestemmingsvlaggen door aan onderliggende Node.js processen via `NODE_OPTIONS`, maar elk ander programma draait zonder beperkingen, dus `exec` heft effectief de limieten van het bestandssysteem op. |
| `network`    | Geen (alleen aangifte).                                                                                                                                                                                                               | Geen. Het Node.js -machtigingsmodel beperkt de uitgaande netwerktoegang niet, dus `network` blijft een verklaring en wordt nooit afgedwongen.                                                                                                                                              |

Als u de vlag aanzet, worden plug-ins verbroken die bestanden buiten hun eigen map lezen (bijvoorbeeld een module die is opgelost vanuit een bovenliggende `node_modules`), ergens anders schrijven dan hun gegevensmap, of processen voortbrengen zonder `exec` te declareren. Zelfs met de vlag op de plug-in blijft de netwerktoegang behouden en wordt deze uitgevoerd als de OmniRoute gebruiker, dus installeer alleen plug-ins waarvan u de bron vertrouwt.

## Configuratieschema

Definieer configureerbare instellingen in `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Externe API-sleutel" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Veldtypen: `string`, `number`, `boolean`, `select`

Veldopties: `default`, `min`, `max`, `enum`, `description`

Configuratiewaarden worden opgeslagen in de database en zijn toegankelijk via de configuratiepagina van het dashboard.

## Ingebouwde gebeurtenissen

| Gebeurtenis       | Wanneer                                                 | Payload                       |
| ----------------- | ------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Vóór de chathandler                                     | Verzoekcontext                |
| `onResponse`      | Na de chathandler                                       | Responsgegevens               |
| `onError`         | Bij een handlerfout                                     | Foutobject                    |
| `onModelSelect`   | Model geselecteerd voor routering                       | Modelinformatie               |
| `onComboResolve`  | Combinatieroutering opgelost                            | Combinatiedoelen              |
| `onRateLimit`     | Frequentielimiet bereikt                                | Limietinformatie              |
| `onQuotaExhaust`  | Quotum uitgeput                                         | Quotuminformatie              |
| `onProviderError` | Provider heeft een fout geretourneerd                   | Foutdetails                   |
| `onStreamStart`   | SSE-stream gestart                                      | Streaminformatie              |
| `onStreamEnd`     | SSE-stream beëindigd                                    | Streamstatistieken            |
| `onInstall`       | Plugin geïnstalleerd                                    | `{ name, version, manifest }` |
| `onActivate`      | Plugin geactiveerd                                      | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin gedeactiveerd                                    | `{ name, version, manifest }` |
| `onUninstall`     | Plugin verwijderd (voordat bestanden verwijderd worden) | `{ name, version, manifest }` |

## Voorbeelden

### Logger aanvragen

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Tariefbegrenzer

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

### Reactietransformator

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
