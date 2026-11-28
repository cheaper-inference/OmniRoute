# OmniRoute Plugin SDK (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Kiire algus

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

## API viide

### `definePlugin(def: PluginDefinition): Plugin`

Tehasefunktsioon, mis loob vaikeseadetega pistikprogrammi objekti.

**Parameetrid:**

- `name` (string, nõutav) — Plugina nimi kebab-kastis
- `priority` (arv, valikuline, vaikimisi: 100) — Alumine jookseb esimesena
- `enabled` (tõeväärtus, valikuline, vaikimisi: tõene) — Kas alustada on lubatud?
- `onRequest` (funktsioon, valikuline) — Töötab enne vestluse töötlejat
- `onResponse` (funktsioon, valikuline) — Käitab pärast vestluse töötlejat
- `onError` (funktsioon, valikuline) — Töötab käitleja vea korral

### `blockRequest(response?): BlockingHookResult`

Blokeerige päring ja soovi korral tagastage kohandatud vastus.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Muutke päringu keha, enne kui see teenusepakkujani jõuab.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Lisage päringu kontekstile metaandmed.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugina kontekst (`PluginContext`)

| Väli         | Tüüp                      | Kirjeldus                         |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | Taotluse kordumatu identifikaator |
| `model`      | `string`                  | Soovitud mudeli nimi              |
| `provider`   | `string`                  | Sihtpakkuja ID                    |
| `body`       | `Record<string, unknown>` | Taotluse keha                     |
| `headers`    | `Record<string, string>`  | Taotluse päised (vt märkust)      |
| `metadata`   | `Record<string, unknown>` | Muutuvad metaandmed               |
| `timestamp`  | `number`                  | Taotlege ajatemplit               |
| `apiKeyInfo` | `object` (valikuline)     | API võtme metaandmed (vt märkust) |

Kontekst ei kanna kunagi kliendi mandaate: `authorization`, `x-api-key`, `proxy-authorization` ja `cookie` päised eemaldatakse (mis tahes korpuses) ja `apiKeyInfo` säilitab võtme metaandmed (nt `id`, `name` ja `scopes`), kuid mitte võtme väärtust ega selle sõrmejälge `src/lib/plugins/hooks.ts` `redactPluginContext()`. See kehtib `onRequest`, `onResponse` ja `onError` kohta.

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

### Hook'ide prioriteet

Hook'e saab seadistada prioriteedi alusel (väiksem väärtus = käivitatakse esimesena):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Või lihtsate tõeväärtustena (vaikeprioriteet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Lubade süsteem

Vaikimisi on pluginad** pole liivakastis** . Iga aktiivne pistikprogramm töötab eraldi tavalise Node.js alamprotsessina (`loadPlugin()` in `src/lib/plugins/loader.ts`) sama operatsioonisüsteemi kasutaja all kui OmniRoute, ilma VM konteksti ja Node.js loa lipukesteta. Plugina kood võib kasutada `node:fs`, `node:child_process`, `fetch` ja kõiki teisi Node.js API: see võib lugeda ja kirjutada mis tahes faile, mida OmniRoute kasutaja saab (sh andmekataloogi), käivitada programme ja jõuda võrku.

Manifesti `requires.permissions` aktsepteerib `network`, `file-read`, `file-write`, `env` ja `exec`. Vaikesätete korral mõjutab käitusajal ainult `env`.

### Lubamisloa mudel (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` funktsioonilipp (kategooria `security`,** vaikimisi välja lülitatud** [Node.js](https://nodejs.org/api/permissions.html)`--permission` Node.js + Lipud on koostatud manifestist `buildPermissionModelArgs()` abil in `src/lib/plugins/permissionModel.ts`. Lippu loetakse, kui plugin on aktiveeritud, seega kehtib see pärast muudatust aktiveeritud pluginatele; deaktiveerige ja aktiveerige töötav pistikprogramm selle rakendamiseks.

Plugina andmekataloog on plugina juure kõrval `plugin-data/<plugin-name>` (vaikimisi `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Kui lipp on sisse lülitatud, edastatakse selle tee pistikprogrammile kujul `PLUGIN_DATA_DIR`.

| Luba           | Lipp väljas (vaikimisi)                                                                                                                                                                                                                      | Lipp peal                                                                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (mitte ühtegi) | OmniRoute kasutaja täielikud õigused.                                                                                                                                                                                                        | Faili loetakse ainult pistikprogrammide kataloogis. Ühtegi faili ei kirjuta, alamprotsesse, töölõime, natiivseid lisandmooduleid ega WASI pole.                                                                                             |
| `env`          | Plugina protsess võtab vastu `PORT`, `HOSTNAME`, `TZ` ja `TMPDIR`. Ilma selleta võtab see vastu ainult `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` ja `PLUGIN_NAME` (pluss `SystemRoot` ja `windir` Windows puhul). | Sama, mis lipu mahavõtmisega.                                                                                                                                                                                                               |
| `file-read`    | Puudub (ainult deklaratsioon).                                                                                                                                                                                                               | Samuti muutub loetavaks pistikprogrammi andmekataloog (see luuakse, kui see puudub).                                                                                                                                                        |
| `file-write`   | Puudub (ainult deklaratsioon).                                                                                                                                                                                                               | Plugina andmekataloog muutub loetavaks ja kirjutatavaks (`--allow-fs-write`). Midagi muud pole kirjutatav.                                                                                                                                  |
| `exec`         | Puudub (ainult deklaratsioon).                                                                                                                                                                                                               | Lapsprotsessid on lubatud (`--allow-child-process`). Node.js edastab lubade lipud alam Node.js -protsessidele `NODE_OPTIONS` kaudu, kuid mis tahes muu programm töötab piiranguteta, seega tõstab `exec` tõhusalt failisüsteemi piiranguid. |
| `network`      | Puudub (ainult deklaratsioon).                                                                                                                                                                                                               | Mitte ühtegi. Node.js loa mudel ei piira juurdepääsu väljaminevale võrgule, seega jääb `network` deklaratsiooniks ja seda ei jõustata kunagi.                                                                                               |

Lipu sisselülitamine katkestab pistikprogrammid, mis loevad faile väljaspool oma kataloogi (nt moodul, mis on lahendatud vanemast `node_modules`), kirjutavad kõikjal peale nende andmekataloogi või loovad protsesse ilma `exec` deklareerimata. Isegi kui pistikprogrammil on lipp, säilitab see juurdepääsu võrgule ja töötab OmniRoute kasutajana, seega installige ainult need pistikprogrammid, mille allikat usaldate.

## Konfiguratsiooniskeem

Määratlege konfigureeritavad sätted väljal `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Välise API võti" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Väljade tüübid: `string`, `number`, `boolean`, `select`

Väljade valikud: `default`, `min`, `max`, `enum`, `description`

Konfiguratsiooniväärtused salvestatakse andmebaasi ja neile pääseb juurde juhtpaneeli konfiguratsioonilehe kaudu.

## Sisseehitatud sündmused

| Sündmus           | Millal                                          | Andmed                        |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `onRequest`       | Enne vestluse töötlejat                         | Päringu kontekst              |
| `onResponse`      | Pärast vestluse töötlejat                       | Vastuse andmed                |
| `onError`         | Töötleja vea korral                             | Veaobjekt                     |
| `onModelSelect`   | Mudel valiti marsruutimiseks                    | Mudeli teave                  |
| `onComboResolve`  | Kombineeritud marsruutimine lahendati           | Kombinatsiooni sihtmärgid     |
| `onRateLimit`     | Kiirusepiirangu saavutamisel                    | Piirangu teave                |
| `onQuotaExhaust`  | Kvoodi ammendumisel                             | Kvoodi teave                  |
| `onProviderError` | Teenusepakkuja tagastas vea                     | Vea üksikasjad                |
| `onStreamStart`   | SSE-voog käivitati                              | Voo teave                     |
| `onStreamEnd`     | SSE-voog lõppes                                 | Voo statistika                |
| `onInstall`       | Plugin installiti                               | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktiveeriti                              | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin inaktiveeriti                            | `{ name, version, manifest }` |
| `onUninstall`     | Plugin desinstalliti (enne failide kustutamist) | `{ name, version, manifest }` |

## Näited

### Taotle logijat

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Rate Limiter

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

### Vastuse transformer

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
