# OmniRoute Plugin SDK (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Rychlý start

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

Tovární funkce, která vytvoří objekt Plugin s výchozími hodnotami.

**Parametry:**

- `name` (řetězec, povinné) — Název pluginu v kebab-case
- `priority` (číslo, volitelné, výchozí: 100) — Lower běží jako první
- `enabled` (logická, volitelné, výchozí: true) — Start povolen?
- `onRequest` (funkce, volitelné) — Spustí se před obsluhou chatu
- `onResponse` (funkce, volitelné) — Spustí po obsluze chatu
- `onError` (funkce, volitelné) — Spustí se při chybě obsluhy

### `blockRequest(response?): BlockingHookResult`

Zablokujte požadavek a případně vraťte vlastní odpověď.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Upravte tělo požadavku, než se dostane k poskytovateli.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Připojte metadata ke kontextu požadavku.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontext pluginu (`PluginContext`)

| Pole         | Typ                       | Popis                             |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | Jedinečný identifikátor požadavku |
| `model`      | `string`                  | Požadovaný název modelu           |
| `provider`   | `string`                  | Cílový poskytovatel ID            |
| `body`       | `Record<string, unknown>` | Tělo žádosti                      |
| `headers`    | `Record<string, string>`  | Záhlaví požadavku (viz poznámka)  |
| `metadata`   | `Record<string, unknown>` | Proměnná metadata                 |
| `timestamp`  | `number`                  | Požádat o časové razítko          |
| `apiKeyInfo` | `object` (volitelné)      | metadata klíče API (viz poznámka) |

Kontext nikdy nenese přihlašovací údaje klienta: záhlaví `authorization`, `x-api-key`, `proxy-authorization` a `cookie` jsou odstraněna (jakákoli velká a malá písmena) a `apiKeyInfo` uchovává metadata klíče (jako jsou `id`, `name` a `scopes`), ale ne hodnotu klíče ani jeho otisk (`redactPluginContext()` v `src/lib/plugins/hooks.ts`). To platí pro `onRequest`, `onResponse` a `onError`.

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

### Priorita hooků

Hooky lze nakonfigurovat s prioritou (nižší hodnota = spustí se dříve):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Nebo jako jednoduché booleovské hodnoty (výchozí priorita je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Systém povolení

Ve výchozím nastavení jsou pluginy** není sandboxed** . Každý aktivní plugin běží jako samostatný, běžný podřízený proces Node.js (`loadPlugin()` v `src/lib/plugins/loader.ts`) pod stejným uživatelem operačního systému jako OmniRoute, bez kontextu VM a bez příznaků oprávnění Node.js. Kód pluginu může používat `node:fs`, `node:child_process`, `fetch` a každý jiný Node.js API: může číst a zapisovat jakýkoli soubor, který může uživatel OmniRoute (včetně datového adresáře), spouštět programy a dostat se do sítě.

`requires.permissions` manifestu přijímá `network`, `file-read`, `file-write`, `env` a `exec`. S výchozím nastavením má za běhu vliv pouze `env`.

### Model povolení k přihlášení (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Příznak funkce `PLUGIN_PERMISSION_MODEL_ENABLED` (kategorie `security`,** ve výchozím nastavení vypnuto** ) spouští každý proces zásuvného modulu s [modelem oprávnění Node.js](https://nodejs.org/api/permissions.html) (`--permission`, přijímá každý podporovaný řádek Node.js : 22.22 +, 24 a 26). Příznaky jsou sestaveny z manifestu pomocí `buildPermissionModelArgs()` v `src/lib/plugins/permissionModel.ts`. Příznak se čte, když je plugin aktivován, takže platí pro pluginy aktivované po změně; deaktivujte a aktivujte běžící plugin, abyste jej mohli použít.

Datový adresář pluginu je `plugin-data/<plugin-name>` vedle kořenového adresáře pluginu (`~/.omniroute/plugin-data/<plugin-name>` ve výchozím nastavení, `getPluginDataDir()`). Se zapnutým příznakem je jeho cesta předána pluginu jako `PLUGIN_DATA_DIR`.

| Povolení     | Vypnout příznak (výchozí)                                                                                                                                                                                              | Vlajka zapnutá                                                                                                                                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (žádný)      | Úplná oprávnění uživatele OmniRoute.                                                                                                                                                                                   | Soubor se čte pouze v adresáři pluginu. Žádné zápisy souborů, žádné podřízené procesy, žádná pracovní vlákna, žádné nativní doplňky, žádné WASI.                                                                                                           |
| `env`        | Proces pluginu také přijímá `PORT`, `HOSTNAME`, `TZ` a `TMPDIR`. Bez něj přijímá pouze `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` a `PLUGIN_NAME` (plus `SystemRoot` a `windir` na Windows). | Stejně jako s vypnutou vlajkou.                                                                                                                                                                                                                            |
| `file-read`  | Žádné (pouze prohlášení).                                                                                                                                                                                              | Datový adresář pluginu se také stane čitelným (pokud chybí), vytvoří se.                                                                                                                                                                                   |
| `file-write` | Žádné (pouze prohlášení).                                                                                                                                                                                              | Datový adresář pluginu se stane čitelným a zapisovatelným (`--allow-fs-write`). Nic jiného není zapisovatelné.                                                                                                                                             |
| `exec`       | Žádné (pouze prohlášení).                                                                                                                                                                                              | Podřízené procesy jsou povoleny (`--allow-child-process`). Node.js předává příznaky oprávnění podřízeným procesům Node.js prostřednictvím `NODE_OPTIONS`, ale jakýkoli jiný program běží bez omezení, takže `exec` účinně ruší limity souborového systému. |
| `network`    | Žádné (pouze prohlášení).                                                                                                                                                                                              | Žádný. Model oprávnění Node.js neomezuje odchozí síťový přístup, takže `network` zůstává deklarací a není nikdy vynucováno.                                                                                                                                |

Zapnutí příznaku přeruší zásuvné moduly, které čtou soubory mimo svůj vlastní adresář (například modul přeložený z nadřazeného `node_modules`), zapisují kamkoli kromě svého datového adresáře nebo vytvářejí procesy bez deklarace `exec`. I s příznakem na pluginu si zachovává přístup k síti a běží jako uživatel OmniRoute, takže instalujte pouze pluginy, jejichž zdroji důvěřujete.

## Schéma konfigurace

Konfigurovatelná nastavení definujte v `configSchema`:

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

Typy polí: `string`, `number`, `boolean`, `select`

Možnosti polí: `default`, `min`, `max`, `enum`, `description`

Hodnoty konfigurace jsou uloženy v databázi a dostupné prostřednictvím konfigurační stránky řídicího panelu.

## Vestavěné události

| Událost           | Kdy                                         | Datová část                   |
| ----------------- | ------------------------------------------- | ----------------------------- |
| `onRequest`       | Před obslužnou rutinou chatu                | Kontext požadavku             |
| `onResponse`      | Po obslužné rutině chatu                    | Data odpovědi                 |
| `onError`         | Při chybě obslužné rutiny                   | Objekt chyby                  |
| `onModelSelect`   | Model vybrán pro směrování                  | Informace o modelu            |
| `onComboResolve`  | Kombinované směrování vyřešeno              | Cíle kombinace                |
| `onRateLimit`     | Dosažen limit požadavků                     | Informace o limitu            |
| `onQuotaExhaust`  | Kvóta vyčerpána                             | Informace o kvótě             |
| `onProviderError` | Poskytovatel vrátil chybu                   | Podrobnosti o chybě           |
| `onStreamStart`   | Stream SSE spuštěn                          | Informace o streamu           |
| `onStreamEnd`     | Stream SSE ukončen                          | Statistiky streamu            |
| `onInstall`       | Plugin nainstalován                         | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktivován                            | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deaktivován                          | `{ name, version, manifest }` |
| `onUninstall`     | Plugin odinstalován (před smazáním souborů) | `{ name, version, manifest }` |

## Příklady

### Vyžádejte si Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Omezovač rychlosti

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

### Transformátor odezvy

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
