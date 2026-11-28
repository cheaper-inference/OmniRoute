# OmniRoute Plugin SDK (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Gyors kezdés

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

Gyári függvény, amely létrehoz egy Plugin objektumot az alapértelmezett beállításokkal.

**Paraméterek:**

- `name` (karakterlánc, kötelező) — Beépülő modul neve kebab-esetben
- `priority` (szám, nem kötelező, alapértelmezett: 100) — Az alsó fut először
- `enabled` (logikai, opcionális, alapértelmezett: igaz) — Indítás engedélyezve?
- `onRequest` (függvény, opcionális) — A chatkezelő előtt fut
- `onResponse` (függvény, opcionális) — A chatkezelő után fut
- `onError` (függvény, opcionális) — Kezelő hibája esetén fut

### `blockRequest(response?): BlockingHookResult`

Blokkolja a kérést, és opcionálisan küldjön vissza egyéni választ.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Módosítsa a kérés törzsét, mielőtt az elérné a szolgáltatót.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Csatolja metaadatokat a kéréskörnyezethez.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Beépülő modul kontextusa (`PluginContext`)

| Mező         | Írja be                   | Leírás                                    |
| ------------ | ------------------------- | ----------------------------------------- |
| `requestId`  | `string`                  | Egyedi kérelemazonosító                   |
| `model`      | `string`                  | Kért modellnév                            |
| `provider`   | `string`                  | Célszolgáltató ID                         |
| `body`       | `Record<string, unknown>` | Kérelem szerve                            |
| `headers`    | `Record<string, string>`  | Kérelem fejlécek (lásd a megjegyzést)     |
| `metadata`   | `Record<string, unknown>` | Változtatható metaadatok                  |
| `timestamp`  | `number`                  | Időbélyeg kérése                          |
| `apiKeyInfo` | `object` (opcionális)     | API kulcs metaadatai (lásd a megjegyzést) |

A kontextus soha nem hordozza az ügyfél hitelesítő adatait: a `authorization`, `x-api-key`, `proxy-authorization` és `cookie` fejléceket eltávolítják (bármilyen kis- és nagybetűs), és `apiKeyInfo` megtartja a kulcs metaadatait (például `id`, `name` és `scopes`), de a kulcs értékét vagy ujjlenyomatát `src/lib/plugins/hooks.ts` `redactPluginContext()` nem. Ez vonatkozik `onRequest`, `onResponse` és `onError`.

## Jegyzékfájl (`plugin.json`)

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

### Hookok prioritása

A hookok prioritással konfigurálhatók (alacsonyabb érték = előbb fut le):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Vagy egyszerű logikai értékekként (az alapértelmezett prioritás 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Engedélyrendszer

Alapértelmezés szerint a bővítmények** nem homokozó** . Minden aktív beépülő modul különálló, közönséges Node.js gyermekfolyamatként fut (`loadPlugin()` `src/lib/plugins/loader.ts`-ben) ugyanazon operációs rendszer-felhasználó alatt, mint OmniRoute, VM kontextus és Node.js engedélyjelzők nélkül. A beépülő modul használhatja `node:fs`, `node:child_process`, `fetch` és minden más Node.js API: képes olvasni és írni bármilyen fájlt, amit a OmniRoute felhasználó tud (beleértve az adatkönyvtárat is), programokat futtathat és elérheti a hálózatot.

A jegyzék `requires.permissions` elfogadja `network`, `file-read`, `file-write`, `env` és `exec`. Az alapértelmezett beállításokkal csak `env` van hatással futás közben.

### Engedélyezési modell (`PLUGIN_PERMISSION_MODEL_ENABLED`)

A `PLUGIN_PERMISSION_MODEL_ENABLED` funkciójelző ( `security` kategória,** alapértelmezés szerint kikapcsolva** ) minden egyes beépülő modult elindít a [Node.js engedélymodelljével](https://nodejs.org/api/permissions.html) (`--permission`, minden támogatott Node.js sor elfogadja: 22.22 +, 24 és 26). A zászlókat a jegyzékből `buildPermissionModelArgs()` a `src/lib/plugins/permissionModel.ts` ban építi fel. A jelző beolvasásra kerül egy plugin aktiválásakor, tehát a módosítás után aktivált bővítményekre vonatkozik; deaktiváljon és aktiváljon egy futó bővítményt az alkalmazáshoz.

A beépülő modul adatkönyvtára `plugin-data/<plugin-name>` a beépülő modul gyökere mellett (alapértelmezés szerint `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Ha a zászló be van kapcsolva, az elérési útja `PLUGIN_DATA_DIR` néven kerül átadásra a bővítménynek.

| Engedély     | Megjelölés kikapcsolva (alapértelmezett)                                                                                                                                                                                             | Zászló fel                                                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (egyik sem)  | A OmniRoute felhasználó teljes jogosultsága.                                                                                                                                                                                         | A fájl csak a plugin könyvtárában olvasható. Nincs fájlírás, nincsenek gyermekfolyamatok, nincsenek munkaszálak, nincsenek natív kiegészítők, nincsenek WASI.                                                                                                       |
| `env`        | A beépülő modul `PORT`, `HOSTNAME`, `TZ` és `TMPDIR` fájlokat is megkapja . Enélkül csak `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` és `PLUGIN_NAME` fogadja (plusz `SystemRoot` és `windir` a Windows-n). | Ugyanúgy, mint lekapcsolt zászló esetén.                                                                                                                                                                                                                            |
| `file-read`  | Nincs (csak nyilatkozat).                                                                                                                                                                                                            | A plugin adatkönyvtára is olvashatóvá válik (ha hiányzik, akkor létrejön).                                                                                                                                                                                          |
| `file-write` | Nincs (csak nyilatkozat).                                                                                                                                                                                                            | A bővítmény adatkönyvtára olvashatóvá és írhatóvá válik (`--allow-fs-write`). Semmi más nem írható.                                                                                                                                                                 |
| `exec`       | Nincs (csak nyilatkozat).                                                                                                                                                                                                            | A gyermekfolyamatok megengedettek (`--allow-child-process`). Node.js `NODE_OPTIONS` keresztül továbbítja az engedélyjelzőket a gyermek Node.js folyamatoknak, de minden más program korlátozás nélkül fut, így `exec` hatékonyan felemeli a fájlrendszer korlátait. |
| `network`    | Nincs (csak nyilatkozat).                                                                                                                                                                                                            | Egyik sem. A Node.js engedélymodell nem korlátozza a kimenő hálózati hozzáférést, így `network` deklaráció marad, és soha nem érvényesül.                                                                                                                           |

A jelző bekapcsolása megszakítja azokat a beépülő modulokat, amelyek a saját könyvtárukon kívüli fájlokat olvasnak be (például egy szülő `node_modules` feloldott modult), bárhová írnak, kivéve az adatkönyvtárukat, vagy `exec` deklarálása nélkül indítanak el folyamatokat. Még a jelzővel együtt is megtartja a hálózati hozzáférést, és OmniRoute felhasználóként fut, ezért csak azokat a beépülő modulokat telepítse, amelyek forrásában megbízik.

## Konfigurációs séma

A konfigurálható beállításokat a `configSchema` objektumban adhatja meg:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Külső API-kulcs" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Mezőtípusok: `string`, `number`, `boolean`, `select`

Mezőbeállítások: `default`, `min`, `max`, `enum`, `description`

A konfigurációs értékek az adatbázisban maradandóan tárolódnak, és az irányítópult konfigurációs oldalán érhetők el.

## Beépített események

| Esemény           | Mikor                                                    | Adattartalom                  |
| ----------------- | -------------------------------------------------------- | ----------------------------- |
| `onRequest`       | A csevegéskezelő előtt                                   | Kéréskörnyezet                |
| `onResponse`      | A csevegéskezelő után                                    | Válaszadatok                  |
| `onError`         | Kezelőhiba esetén                                        | Hibaobjektum                  |
| `onModelSelect`   | Az útválasztási modell kiválasztásakor                   | Modellinformációk             |
| `onComboResolve`  | A kombinált útválasztás feloldásakor                     | Kombinációs célok             |
| `onRateLimit`     | A sebességkorlát elérésekor                              | Korlátinformációk             |
| `onQuotaExhaust`  | A kvóta kimerülésekor                                    | Kvótainformációk              |
| `onProviderError` | Amikor a szolgáltató hibát küld vissza                   | Hiba részletei                |
| `onStreamStart`   | Az SSE-adatfolyam elindulásakor                          | Adatfolyam-információk        |
| `onStreamEnd`     | Az SSE-adatfolyam befejeződésekor                        | Adatfolyam-statisztikák       |
| `onInstall`       | A beépülő modul telepítésekor                            | `{ name, version, manifest }` |
| `onActivate`      | A beépülő modul aktiválásakor                            | `{ name, version, manifest }` |
| `onDeactivate`    | A beépülő modul deaktiválásakor                          | `{ name, version, manifest }` |
| `onUninstall`     | A beépülő modul eltávolításakor (a fájlok törlése előtt) | `{ name, version, manifest }` |

## Példák

### Kérjen Loggert

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

### Response Transformer

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
