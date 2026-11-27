# OmniRoute Plugin SDK (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

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

## API Referenca

### `definePlugin(def: PluginDefinition): Plugin`

Tvornička funkcija koja stvara Plugin objekt sa zadanim postavkama.

**Parametri:**

- `name` (string, obavezno) — Naziv dodatka u kebab-case
- `priority` (broj, izborno, zadano: 100) — Lower radi prvi
- `enabled` (booleov, izborno, zadano: istinito) — Start omogućen?
- `onRequest` (funkcija, izborno) — Pokreće se prije rukovatelja chatom
- `onResponse` (funkcija, izborno) — Pokreće se nakon rukovatelja chatom
- `onError` (funkcija, izborno) — Pokreće se nakon pogreške rukovatelja

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

Izmijenite tijelo zahtjeva prije nego što stigne do davatelja.

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

| Polje        | Tip                       | Opis                                         |
| ------------ | ------------------------- | -------------------------------------------- |
| `requestId`  | `string`                  | Jedinstveni identifikator zahtjeva           |
| `model`      | `string`                  | Traženi naziv modela                         |
| `provider`   | `string`                  | Ciljani pružatelj ID                         |
| `body`       | `Record<string, unknown>` | Tijelo zahtjeva                              |
| `headers`    | `Record<string, string>`  | Zaglavlja zahtjeva (pogledajte napomenu)     |
| `metadata`   | `Record<string, unknown>` | Promjenjivi metapodaci                       |
| `timestamp`  | `number`                  | Vremenska oznaka zahtjeva                    |
| `apiKeyInfo` | `object` (izborno)        | API ključni metapodaci (pogledajte napomenu) |

Kontekst nikada ne nosi vjerodajnice klijenta: zaglavlja `authorization`, `x-api-key`, `proxy-authorization` i `cookie` se uklanjaju (svaka velika i mala slova), a `apiKeyInfo` čuva metapodatke ključa (kao što su `id`, `name` i `scopes`), ali ne vrijednost ključa ili njegov otisak (`redactPluginContext()` u `src/lib/plugins/hooks.ts`). Ovo se odnosi na `onRequest`, `onResponse` i `onError`.

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

### Prioritet priključnih točaka

Priključne točke mogu se konfigurirati s prioritetom (niža vrijednost = izvršava se prva):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ili kao jednostavne Booleove vrijednosti (zadani prioritet je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sustav dopuštenja

Dodaci su** nije u sandboxu** . Svaki aktivni dodatak radi kao zasebni, obični Node.js proces dijete (`loadPlugin()` u `src/lib/plugins/loader.ts`) pod istim korisnikom operativnog sustava kao OmniRoute, bez VM konteksta i Node.js oznaka dopuštenja. Kod dodatka može koristiti `node:fs`, `node:child_process`, `fetch` i svaki drugi Node.js API: može čitati i pisati bilo koju datoteku koju OmniRoute korisnik može (uključujući direktorij podataka), pokretati programe i doseći mrežu.

`requires.permissions` manifesta prihvaća `network`, `file-read`, `file-write`, `env` i `exec`, ali danas samo `env` ima učinak tijekom izvođenja:

| Dopuštenje                                   | Učinak danas                                                                                                                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Proces dodatka također prima `PORT`, `HOSTNAME`, `TZ` i `TMPDIR`. Bez njega prima samo `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` i `PLUGIN_NAME` (plus `SystemRoot` i `windir` na Windows). |
| `network`, `file-read`, `file-write`, `exec` | Nijedan. Oni su samo deklaracije: ništa se ne blokira kada nedostaju.                                                                                                                                                  |

Instaliranje dodatka je kao instaliranje bilo kojeg drugog programa na host. Instalirajte samo dodatke čiji izvor vjerujete.

## Konfiguracijska shema

Definirajte postavke koje se mogu konfigurirati u `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Ključ vanjskog API-ja" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Vrste polja: `string`, `number`, `boolean`, `select`

Opcije polja: `default`, `min`, `max`, `enum`, `description`

Konfiguracijske vrijednosti pohranjuju se u bazi podataka i dostupne su putem konfiguracijske stranice nadzorne ploče.

## Ugrađeni događaji

| Događaj           | Kada                                              | Korisni podaci                |
| ----------------- | ------------------------------------------------- | ----------------------------- |
| `onRequest`       | Prije rukovatelja razgovora                       | Kontekst zahtjeva             |
| `onResponse`      | Nakon rukovatelja razgovora                       | Podaci odgovora               |
| `onError`         | Pri pogrešci rukovatelja                          | Objekt pogreške               |
| `onModelSelect`   | Model je odabran za usmjeravanje                  | Informacije o modelu          |
| `onComboResolve`  | Kombinirano usmjeravanje je razriješeno           | Ciljevi kombinacije           |
| `onRateLimit`     | Dosegnuto je ograničenje brzine                   | Informacije o ograničenju     |
| `onQuotaExhaust`  | Kvota je iscrpljena                               | Informacije o kvoti           |
| `onProviderError` | Pružatelj je vratio pogrešku                      | Pojedinosti pogreške          |
| `onStreamStart`   | SSE tok je pokrenut                               | Informacije o toku            |
| `onStreamEnd`     | SSE tok je završen                                | Statistika toka               |
| `onInstall`       | Dodatak je instaliran                             | `{ name, version, manifest }` |
| `onActivate`      | Dodatak je aktiviran                              | `{ name, version, manifest }` |
| `onDeactivate`    | Dodatak je deaktiviran                            | `{ name, version, manifest }` |
| `onUninstall`     | Dodatak je deinstaliran (prije brisanja datoteka) | `{ name, version, manifest }` |

## Primjeri

### Snimač zahtjeva

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Ograničivač brzine

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

### Transformator odziva

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
