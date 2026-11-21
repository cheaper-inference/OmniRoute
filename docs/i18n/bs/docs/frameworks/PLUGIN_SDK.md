# OmniRoute Plugin SDK (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Brzi početak

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

Tvornička funkcija koja kreira Plugin objekt sa zadanim vrijednostima.

**Parametri:**

- `name` (string, obavezan) — Ime dodatka u kebab-case
- `priority` (broj, opciono, zadano: 100) — Niže se prvo pokreće
- `enabled` (boolean, opciono, default: true) — Pokrenuti omogućeno?
- `onRequest` (funkcija, opciono) — Pokreće se prije rukovatelja chatom
- `onResponse` (funkcija, opciono) — Pokreće se nakon rukovaoca razgovora
- `onError` (funkcija, opciono) — Pokreće grešku rukovaoca

### `blockRequest(response?): BlockingHookResult`

Blokirajte zahtjev i po želji vratite prilagođeni odgovor.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Izmijenite tijelo zahtjeva prije nego što stigne do dobavljača.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Priložite metapodatke kontekstu zahtjeva.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontekst dodatka (`PluginContext`)

| Polje        | Tip                       | Opis                                   |
| ------------ | ------------------------- | -------------------------------------- |
| `requestId`  | `string`                  | Jedinstveni identifikator zahtjeva     |
| `model`      | `string`                  | Traženi naziv modela                   |
| `provider`   | `string`                  | Ciljni provajder ID                    |
| `body`       | `Record<string, unknown>` | Telo zahtjeva                          |
| `headers`    | `Record<string, string>`  | Zaglavlja zahtjeva (vidi napomenu)     |
| `metadata`   | `Record<string, unknown>` | Promjenjivi metapodaci                 |
| `timestamp`  | `number`                  | Zatražite vremensku oznaku             |
| `apiKeyInfo` | `object` (opciono)        | API ključni metapodaci (vidi napomenu) |

Kontekst nikada ne nosi akreditive klijenta: zaglavlja `authorization`, `x-api-key`, `proxy-authorization` i `cookie` su uklonjena (svaka mala slova), a `apiKeyInfo` zadržava metapodatke ključa (kao što su `id`, `name` i `scopes`), ali ne i vrijednost ključa ili njegov otisak prsta (`redactPluginContext()` u `src/lib/plugins/hooks.ts`). Ovo se odnosi na `onRequest`, `onResponse` i `onError`.

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

### Prioritet hook funkcija

Hook funkcije mogu se konfigurirati pomoću prioriteta (niža vrijednost = izvršava se prva):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ili kao jednostavne boolean vrijednosti (zadani prioritet je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistem dozvola

Po defaultu su dodaci** nije sandboxed** . Svaki aktivni dodatak radi kao zasebni, obični Node.js podređeni proces (`loadPlugin()` u `src/lib/plugins/loader.ts`) pod istim korisnikom operativnog sistema kao OmniRoute, bez VM konteksta i bez Node.js zastavica dozvole. Plugin kod može koristiti `node:fs`, `node:child_process`, `fetch` i svaki drugi Node.js API: može čitati i pisati bilo koju datoteku OmniRoute korisnik (uključujući direktorij podataka), pokrenuti programe i doći do mreže.

`requires.permissions` manifesta prihvata `network`, `file-read`, `file-write`, `env` i `exec`. Sa zadanim postavkama samo `env` ima efekta u vrijeme izvođenja.

### Model dozvole za uključivanje (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Zastava funkcije `PLUGIN_PERMISSION_MODEL_ENABLED` (kategorija `security`,** isključeno prema zadanim postavkama** ) započinje svaki proces dodatka sa [Node.js modelom dozvole](https://nodejs.org/api/permissions.html) (`--permission`, prihvaćen od strane svake podržane linije Node.js : 22.22 +, 24 i 26). Zastave su izgrađene iz manifesta pomoću `buildPermissionModelArgs()` u `src/lib/plugins/permissionModel.ts`. Oznaka se čita kada je dodatak aktiviran, tako da se primjenjuje na dodatke koji su aktivirani nakon promjene; deaktivirajte i aktivirajte aktivni dodatak da ga primijenite.

Direktorij podataka dodatka je `plugin-data/<plugin-name>` pored korijena dodatka (`~/.omniroute/plugin-data/<plugin-name>` po defaultu, `getPluginDataDir()`). Sa uključenom zastavicom, njegova putanja se prosljeđuje dodatku kao `PLUGIN_DATA_DIR`.

| Dozvola      | Zastavica isključena (zadano)                                                                                                                                                                                          | Zastava uključena                                                                                                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (nijedna)    | Pune privilegije korisnika OmniRoute.                                                                                                                                                                                  | Datoteka se čita samo unutar direktorija dodataka. Nema pisanja datoteka, nema podređenih procesa, nema radnih niti, nema izvornih dodataka, nema WASI.                                                                                                            |
| `env`        | Proces dodatka također prima `PORT`, `HOSTNAME`, `TZ` i `TMPDIR`. Bez toga, prima samo `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` i `PLUGIN_NAME` (plus `SystemRoot` i `windir` na Windows). | Isto kao i sa isključenom zastavom.                                                                                                                                                                                                                                |
| `file-read`  | Nema (samo deklaracija).                                                                                                                                                                                               | Direktorij podataka dodatka također postaje čitljiv (kreira se ako nedostaje).                                                                                                                                                                                     |
| `file-write` | Nema (samo deklaracija).                                                                                                                                                                                               | Direktorij podataka dodatka postaje čitljiv i upisiv (`--allow-fs-write`). Ništa drugo nije za pisanje.                                                                                                                                                            |
| `exec`       | Nema (samo deklaracija).                                                                                                                                                                                               | Podređeni procesi su dozvoljeni (`--allow-child-process`). Node.js prosljeđuje zastavice dozvole na podređene Node.js procese kroz `NODE_OPTIONS`, ali bilo koji drugi program radi bez ograničenja, tako da `exec` efektivno podiže ograničenja sistema datoteka. |
| `network`    | Nema (samo deklaracija).                                                                                                                                                                                               | Nema. Model dozvole Node.js ne ograničava izlazni pristup mreži, tako da `network` ostaje deklaracija i nikada se ne primjenjuje.                                                                                                                                  |

Uključivanje zastavice prekida dodatke koji čitaju datoteke izvan svog vlastitog direktorija (na primjer modul razriješen iz nadređenog `node_modules`), pišu bilo gdje osim u njihov direktorij podataka ili pokreću procese bez deklariranja `exec`. Čak i sa zastavicom na dodatku zadržava pristup mreži i radi kao OmniRoute korisnik, tako da instalirajte samo dodatke čiji izvor vjerujete.

## Konfiguracijska shema

Definirajte postavke koje se mogu konfigurirati u `configSchema`:

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

Tipovi polja: `string`, `number`, `boolean`, `select`

Opcije polja: `default`, `min`, `max`, `enum`, `description`

Konfiguracijske vrijednosti pohranjuju se u bazi podataka i dostupne su putem stranice za konfiguraciju na kontrolnoj ploči.

## Ugrađeni događaji

| Događaj           | Kada                                           | Sadržaj                       |
| ----------------- | ---------------------------------------------- | ----------------------------- |
| `onRequest`       | Prije obrađivača razgovora                     | Kontekst zahtjeva             |
| `onResponse`      | Nakon obrađivača razgovora                     | Podaci odgovora               |
| `onError`         | Pri grešci obrađivača                          | Objekt greške                 |
| `onModelSelect`   | Model odabran za usmjeravanje                  | Informacije o modelu          |
| `onComboResolve`  | Kombinirano usmjeravanje razriješeno           | Kombinirana odredišta         |
| `onRateLimit`     | Dosegnuto ograničenje učestalosti              | Informacije o ograničenju     |
| `onQuotaExhaust`  | Kvota iscrpljena                               | Informacije o kvoti           |
| `onProviderError` | Pružalac usluge vratio grešku                  | Detji greške                  |
| `onStreamStart`   | SSE tok pokrenut                               | Informacije o toku            |
| `onStreamEnd`     | SSE tok završen                                | Statistika toka               |
| `onInstall`       | Dodatak instaliran                             | `{ name, version, manifest }` |
| `onActivate`      | Dodatak aktiviran                              | `{ name, version, manifest }` |
| `onDeactivate`    | Dodatak deaktiviran                            | `{ name, version, manifest }` |
| `onUninstall`     | Dodatak deinstaliran (prije brisanja datoteka) | `{ name, version, manifest }` |

## Primjeri

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
