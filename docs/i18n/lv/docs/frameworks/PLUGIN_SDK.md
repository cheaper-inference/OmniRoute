# OmniRoute Plugin SDK (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Ātrais sākums

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

## API atsauce

### `definePlugin(def: PluginDefinition): Plugin`

Rūpnīcas funkcija, kas izveido spraudņa objektu ar noklusējuma iestatījumiem.

**Parametri:**

- `name` (virkne, obligāta) — Spraudņa nosaukums kebab-case
- `priority` (numurs, neobligāts, noklusējuma: 100) — Vispirms tiek palaists zemākais
- `enabled` (būla, neobligāts, noklusējuma: true) — Sākt iespējot?
- `onRequest` (funkcija, izvēles) — Darbojas pirms tērzēšanas apstrādātāja
- `onResponse` (funkcija, izvēles) — Darbojas pēc tērzēšanas apstrādātāja
- `onError` (funkcija, izvēles) — Darbojas apdarinātāja kļūdas gadījumā

### `blockRequest(response?): BlockingHookResult`

Bloķējiet pieprasījumu un pēc izvēles atgrieziet pielāgotu atbildi.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Mainiet pieprasījuma pamattekstu, pirms tas sasniedz pakalpojumu sniedzēju.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Pievienojiet metadatus pieprasījuma kontekstam.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Spraudņa konteksts (`PluginContext`)

| Lauks        | Tips                      | Apraksts                                |
| ------------ | ------------------------- | --------------------------------------- |
| `requestId`  | `string`                  | Unikāls pieprasījuma identifikators     |
| `model`      | `string`                  | Pieprasītā modeļa nosaukums             |
| `provider`   | `string`                  | Mērķa nodrošinātājs ID                  |
| `body`       | `Record<string, unknown>` | Pieprasījuma struktūra                  |
| `headers`    | `Record<string, string>`  | Pieprasījuma galvenes (skatiet piezīmi) |
| `metadata`   | `Record<string, unknown>` | Maināmi metadati                        |
| `timestamp`  | `number`                  | Pieprasīt laikspiedolu                  |
| `apiKeyInfo` | `object` (pēc izvēles)    | API atslēgas metadati (skatiet piezīmi) |

Konteksts nekad nesatur klienta akreditācijas datus: `authorization`, `x-api-key`, `proxy-authorization` un `cookie` galvenes tiek noņemtas (jebkurš korpuss), un `apiKeyInfo` saglabā atslēgas metadatus (piemēram, `id`, `name` un `scopes`), bet ne atslēgas vērtību vai tās pirkstu nospiedumu `src/lib/plugins/hooks.ts` `redactPluginContext()` in). Tas attiecas uz `onRequest`, `onResponse` un `onError`.

## Manifests (`plugin.json`)

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

### Āķu prioritāte

Āķus var konfigurēt ar prioritāti (mazāka vērtība = tiek izpildīts vispirms):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Vai kā vienkāršas Būla vērtības (noklusējuma prioritāte ir 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Atļauju sistēma

Pēc noklusējuma spraudņi ir** nav smilškastes** . Katrs aktīvais spraudnis darbojas kā atsevišķs, parasts Node.js pakārtots process (`loadPlugin()` in `src/lib/plugins/loader.ts`) ar to pašu operētājsistēmas lietotāju kā OmniRoute, bez VM konteksta un bez Node.js atļauju karodziņiem. Spraudņa kods var izmantot `node:fs`, `node:child_process`, `fetch` un visus citus Node.js API: tas var lasīt un rakstīt jebkuru failu, ko OmniRoute lietotājs var (ieskaitot datu direktoriju), palaist programmas un sasniegt tīklu.

Manifesta `requires.permissions` pieņem `network`, `file-read`, `file-write`, `env` un `exec`. Izmantojot noklusējuma iestatījumus, izpildlaikā darbojas tikai `env`.

### Pieteikšanās atļaujas modelis (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` iezīmes karogs (kategorija `security`,** izslēgts pēc noklusējuma** ) sāk katru spraudņa procesu ar [Node.js atļaujas modeli](https://nodejs.org/api/permissions.html) (`--permission`, ko pieņem katra atbalstītā Node.js rinda: 22.22 +, 24 un 26). Karodziņus no manifesta veido `buildPermissionModelArgs()` in `src/lib/plugins/permissionModel.ts`. Karogs tiek nolasīts, kad spraudnis ir aktivizēts, tāpēc tas attiecas uz spraudņiem, kas aktivizēti pēc izmaiņām; deaktivizējiet un aktivizējiet darbojošos spraudni, lai to lietotu.

Spraudņa datu direktorijs ir `plugin-data/<plugin-name>` blakus spraudņa saknei (pēc noklusējuma `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Ja karodziņš ir ieslēgts, tā ceļš tiek nodots spraudnim kā `PLUGIN_DATA_DIR`.

| Atļauja      | Atzīmēts izslēgts (noklusējums)                                                                                                                                                                                             | Karogs ieslēgts                                                                                                                                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (nav)        | Pilnas OmniRoute lietotāja privilēģijas.                                                                                                                                                                                    | Fails tiek lasīts tikai spraudņa direktorijā. Netiek rakstīts fails, nav pakārtotu procesu, nav darbinieku pavedienu, nav vietējo papildinājumu, nav WASI.                                                                                               |
| `env`        | Spraudņa process saņem arī `PORT`, `HOSTNAME`, `TZ` un `TMPDIR`. Bez tā tas saņem tikai `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` un `PLUGIN_NAME` (kā arī `SystemRoot` un `windir` uz Windows). | Tāpat kā ar noņemtu karogu.                                                                                                                                                                                                                              |
| `file-read`  | Nav (tikai deklarācija).                                                                                                                                                                                                    | Arī spraudņa datu direktorijs kļūst lasāms (tas tiek izveidots, ja trūkst).                                                                                                                                                                              |
| `file-write` | Nav (tikai deklarācija).                                                                                                                                                                                                    | Spraudņa datu direktorijs kļūst lasāms un rakstāms (`--allow-fs-write`). Nekas cits nav rakstāms.                                                                                                                                                        |
| `exec`       | Nav (tikai deklarācija).                                                                                                                                                                                                    | Bērna procesi ir atļauti (`--allow-child-process`). Node.js nodod atļauju karogus bērnu Node.js procesiem, izmantojot `NODE_OPTIONS`, taču jebkura cita programma darbojas bez ierobežojumiem, tāpēc `exec` efektīvi atceļ failu sistēmas ierobežojumus. |
| `network`    | Nav (tikai deklarācija).                                                                                                                                                                                                    | Nav. Node.js atļauju modelis neierobežo piekļuvi izejošajam tīklam, tāpēc `network` paliek deklarācija un nekad netiek izpildīts.                                                                                                                        |

Ieslēdzot karogu, tiek pārtraukti spraudņi, kas nolasa failus ārpus sava direktorija (piemēram, modulis, kas atrisināts no vecāka `node_modules`), raksta jebkur, izņemot to datu direktoriju, vai aktivizē procesus, nedeklarējot `exec`. Pat ar karodziņu uz spraudņa saglabā piekļuvi tīklam un darbojas kā OmniRoute lietotājs, tāpēc instalējiet tikai tos spraudņus, kuru avotam uzticaties.

## Konfigurācijas shēma

Definējiet konfigurējamos iestatījumus laukā `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Ārējās API atslēga" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Lauku tipi: `string`, `number`, `boolean`, `select`

Lauku opcijas: `default`, `min`, `max`, `enum`, `description`

Konfigurācijas vērtības tiek saglabātas datubāzē un ir pieejamas informācijas paneļa konfigurācijas lapā.

## Iebūvētie notikumi

| Notikums          | Kad                                          | Derīgā slodze                 |
| ----------------- | -------------------------------------------- | ----------------------------- |
| `onRequest`       | Pirms tērzēšanas apstrādātāja                | Pieprasījuma konteksts        |
| `onResponse`      | Pēc tērzēšanas apstrādātāja                  | Atbildes dati                 |
| `onError`         | Apstrādātāja kļūdas gadījumā                 | Kļūdas objekts                |
| `onModelSelect`   | Maršrutēšanai atlasīts modelis               | Modeļa informācija            |
| `onComboResolve`  | Atrisināta kombinētā maršrutēšana            | Kombinācijas mērķi            |
| `onRateLimit`     | Sasniegts ātruma ierobežojums                | Ierobežojuma informācija      |
| `onQuotaExhaust`  | Kvota izsmelta                               | Kvotas informācija            |
| `onProviderError` | Pakalpojumu sniedzējs atgrieza kļūdu         | Kļūdas informācija            |
| `onStreamStart`   | Sākta SSE straume                            | Straumes informācija          |
| `onStreamEnd`     | Pabeigta SSE straume                         | Straumes statistika           |
| `onInstall`       | Spraudnis instalēts                          | `{ name, version, manifest }` |
| `onActivate`      | Spraudnis aktivizēts                         | `{ name, version, manifest }` |
| `onDeactivate`    | Spraudnis deaktivizēts                       | `{ name, version, manifest }` |
| `onUninstall`     | Spraudnis atinstalēts (pirms failu dzēšanas) | `{ name, version, manifest }` |

## Piemēri

### Pieprasīt reģistrētāju

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Likmes ierobežotājs

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

### Atbildes transformators

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
