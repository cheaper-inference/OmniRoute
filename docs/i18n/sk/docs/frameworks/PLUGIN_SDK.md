# OmniRoute Plugin SDK (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Rýchly štart

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

## API Referencia

### `definePlugin(def: PluginDefinition): Plugin`

Továrenská funkcia, ktorá vytvára objekt Plugin s predvolenými hodnotami.

**Parametre:**

- `name` (reťazec, povinné) — Názov doplnku v kebab-case
- `priority` (číslo, voliteľné, predvolená hodnota: 100) — Nižšia beží ako prvá
- `enabled` (boolovská hodnota, voliteľné, predvolená hodnota: true) — Štart je povolený?
- `onRequest` (funkcia, voliteľná) — Spustí sa pred obsluhou chatu
- `onResponse` (funkcia, voliteľná) — Spustí sa po obsluhe chatu
- `onError` (funkcia, voliteľná) — Spustí sa pri chybe obsluhy

### `blockRequest(response?): BlockingHookResult`

Zablokujte požiadavku a prípadne vráťte vlastnú odpoveď.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Upravte telo žiadosti skôr, ako sa dostane k poskytovateľovi.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Pripojte metadáta ku kontextu požiadavky.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontext doplnku (`PluginContext`)

| Pole         | Typ                       | Popis                               |
| ------------ | ------------------------- | ----------------------------------- |
| `requestId`  | `string`                  | Jedinečný identifikátor požiadavky  |
| `model`      | `string`                  | Požadovaný názov modelu             |
| `provider`   | `string`                  | Cieľový poskytovateľ ID             |
| `body`       | `Record<string, unknown>` | Telo žiadosti                       |
| `headers`    | `Record<string, string>`  | Hlavičky žiadostí (pozri poznámku)  |
| `metadata`   | `Record<string, unknown>` | Meniteľné metadáta                  |
| `timestamp`  | `number`                  | Žiadosť o časovú pečiatku           |
| `apiKeyInfo` | `object` (voliteľné)      | metadáta kľúča API (pozri poznámku) |

Kontext nikdy nenesie prihlasovacie údaje klienta: hlavičky `authorization`, `x-api-key`, `proxy-authorization` a `cookie` sú odstránené (akékoľvek veľké a malé písmená) a `apiKeyInfo` uchováva metadáta kľúča (napríklad `id`, `name` a `scopes`), ale nie hodnotu kľúča ani jeho odtlačok (`redactPluginContext()` v `src/lib/plugins/hooks.ts`). Platí to pre `onRequest`, `onResponse` a `onError`.

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

### Priorita hookov

Hooky možno nakonfigurovať s prioritou (nižšia hodnota = spustí sa ako prvý):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Alebo ako jednoduché booleovské hodnoty (predvolená priorita je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Systém povolení

V predvolenom nastavení sú pluginy** nie v pieskovisku** . Každý aktívny doplnok beží ako samostatný, obyčajný podradený proces Node.js (`loadPlugin()` v `src/lib/plugins/loader.ts`) pod tým istým používateľom operačného systému ako OmniRoute, bez kontextu VM a bez príznakov povolenia Node.js. Kód zásuvného modulu môže používať `node:fs`, `node:child_process`, `fetch` a každý iný Node.js API: môže čítať a zapisovať akýkoľvek súbor, ktorý môže používateľ OmniRoute (vrátane adresára s údajmi), spúšťať programy a dostať sa do siete.

`requires.permissions` manifestu prijíma `network`, `file-read`, `file-write`, `env` a `exec`. Pri predvolených nastaveniach má za behu vplyv iba `env`.

### Model povolení na prihlásenie (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Príznak funkcie `PLUGIN_PERMISSION_MODEL_ENABLED` (kategória `security`,** predvolene vypnuté** ) spustí každý proces pluginu s [modelom povolení Node.js](https://nodejs.org/api/permissions.html) (`--permission`, akceptovaný každým podporovaným riadkom Node.js : 22,22 +, 24 a 26). Vlajky sú zostavené z manifestu pomocou `buildPermissionModelArgs()` v `src/lib/plugins/permissionModel.ts`. Príznak sa načíta pri aktivácii zásuvného modulu, takže sa vzťahuje na zásuvné moduly aktivované po zmene; deaktivujte a aktivujte spustený doplnok, aby ste ho mohli použiť.

Adresár s údajmi doplnku je `plugin-data/<plugin-name>` vedľa koreňa doplnku ( predvolene `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). So zapnutým príznakom sa jeho cesta odovzdá doplnku ako `PLUGIN_DATA_DIR`.

| Povolenie    | Nahlásiť vypnuté (predvolené)                                                                                                                                                                                        | Vlajka zapnutá                                                                                                                                                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (žiadny)     | Úplné oprávnenia používateľa OmniRoute.                                                                                                                                                                              | Súbor sa číta iba v adresári pluginu. Žiadne zápisy súborov, žiadne podradené procesy, žiadne pracovné vlákna, žiadne natívne doplnky, žiadne WASI.                                                                                                            |
| `env`        | Proces pluginu tiež prijíma `PORT`, `HOSTNAME`, `TZ` a `TMPDIR`. Bez nej dostane len `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` a `PLUGIN_NAME` (plus `SystemRoot` a `windir` na Windows). | Rovnako ako pri vypnutej vlajke.                                                                                                                                                                                                                               |
| `file-read`  | Žiadne (iba vyhlásenie).                                                                                                                                                                                             | Adresár údajov doplnku sa tiež stane čitateľným (vytvorí sa, ak chýba).                                                                                                                                                                                        |
| `file-write` | Žiadne (iba vyhlásenie).                                                                                                                                                                                             | Adresár s údajmi doplnku sa stane čitateľným a zapisovateľným (`--allow-fs-write`). Nič iné nie je zapisovateľné.                                                                                                                                              |
| `exec`       | Žiadne (iba vyhlásenie).                                                                                                                                                                                             | Podradené procesy sú povolené (`--allow-child-process`). Node.js odovzdá príznaky oprávnenia podriadeným procesom Node.js prostredníctvom `NODE_OPTIONS`, ale akýkoľvek iný program beží bez obmedzení, takže `exec` efektívne ruší limity súborového systému. |
| `network`    | Žiadne (iba vyhlásenie).                                                                                                                                                                                             | žiadne. Model povolení Node.js neobmedzuje výstupný prístup k sieti, takže `network` zostáva deklaráciou a nikdy sa nevynucuje.                                                                                                                                |

Zapnutie príznaku preruší zásuvné moduly, ktoré čítajú súbory mimo svojho vlastného adresára (napríklad modul vyriešený z nadradeného `node_modules`), zapisujú kamkoľvek okrem svojho dátového adresára alebo vytvárajú procesy bez deklarovania `exec`. Dokonca aj s príznakom na doplnku si zachováva prístup k sieti a beží ako používateľ OmniRoute, takže inštalujte iba doplnky, ktorých zdroju dôverujete.

## Schéma konfigurácie

Konfigurovateľné nastavenia definujte v `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Kľúč externého API" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Typy polí: `string`, `number`, `boolean`, `select`

Možnosti polí: `default`, `min`, `max`, `enum`, `description`

Hodnoty konfigurácie sa ukladajú v databáze a sú dostupné prostredníctvom konfiguračnej stránky ovládacieho panela.

## Vstavané udalosti

| Udalosť           | Kedy                                            | Dáta                          |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `onRequest`       | Pred obslužnou rutinou chatu                    | Kontext požiadavky            |
| `onResponse`      | Po obslužnej rutine chatu                       | Dáta odpovede                 |
| `onError`         | Pri chybe obslužnej rutiny                      | Objekt chyby                  |
| `onModelSelect`   | Model vybraný na smerovanie                     | Informácie o modeli           |
| `onComboResolve`  | Kombinované smerovanie vyriešené                | Ciele kombinácie              |
| `onRateLimit`     | Dosiahnutý limit požiadaviek                    | Informácie o limite           |
| `onQuotaExhaust`  | Kvóta vyčerpaná                                 | Informácie o kvóte            |
| `onProviderError` | Poskytovateľ vrátil chybu                       | Podrobnosti chyby             |
| `onStreamStart`   | SSE stream spustený                             | Informácie o streame          |
| `onStreamEnd`     | SSE stream ukončený                             | Štatistiky streamu            |
| `onInstall`       | Plugin nainštalovaný                            | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktivovaný                               | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deaktivovaný                             | `{ name, version, manifest }` |
| `onUninstall`     | Plugin odinštalovaný (pred odstránením súborov) | `{ name, version, manifest }` |

## Príklady

### Vyžiadajte si Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Obmedzovač rýchlosti

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

### Transformátor odozvy

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
