# OmniRoute Plugin SDK (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Greita pradžia

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

## API nuoroda

### `definePlugin(def: PluginDefinition): Plugin`

Gamyklos funkcija, kuri sukuria papildinio objektą su numatytaisiais parametrais.

**Parametrai:**

- `name` (eilutė, būtina) — Įskiepio pavadinimas kebabo dėkle
- `priority` (skaičius, neprivaloma, numatytasis: 100) — Apatinis paleidžiamas pirmiausia
- `enabled` (bulio reikšmė, neprivaloma, numatytoji: tiesa) — Pradėti įjungta?
- `onRequest` (funkcija, neprivaloma) — Paleidžiama prieš pokalbių tvarkyklę
- `onResponse` (funkcija, neprivaloma) — Vyksta po pokalbių tvarkyklės
- `onError` (funkcija, neprivaloma) — Vykdo tvarkyklės klaidą

### `blockRequest(response?): BlockingHookResult`

Užblokuokite užklausą ir pasirinktinai grąžinkite tinkintą atsakymą.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Pakeiskite užklausos turinį, kol jis pasiekia teikėją.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Pridėkite metaduomenis prie užklausos konteksto.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Papildinio kontekstas (`PluginContext`)

| Laukas       | Tipas                     | Aprašymas                            |
| ------------ | ------------------------- | ------------------------------------ |
| `requestId`  | `string`                  | Unikalus užklausos identifikatorius  |
| `model`      | `string`                  | Prašomo modelio pavadinimo           |
| `provider`   | `string`                  | Tikslinis teikėjas ID                |
| `body`       | `Record<string, unknown>` | Prašymo įstaiga                      |
| `headers`    | `Record<string, string>`  | Užklausų antraštės (žr. pastabą)     |
| `metadata`   | `Record<string, unknown>` | Keičiami metaduomenys                |
| `timestamp`  | `number`                  | Prašyti laiko žymą                   |
| `apiKeyInfo` | `object` (neprivaloma)    | API rakto metaduomenys (žr. pastabą) |

Kontekstas niekada neperduoda kliento kredencialų: `authorization`, `x-api-key`, `proxy-authorization` ir `cookie` antraštės pašalinamos (bet kokia didžioji raidė), o `apiKeyInfo` išsaugo rakto metaduomenis (pvz., `id`, `name` ir `scopes`), bet ne rakto reikšmę ar jo `src/lib/plugins/hooks.ts` `redactPluginContext()`. Tai taikoma `onRequest`, `onResponse` ir `onError`.

## Manifestas (`plugin.json`)

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

### Kablių prioritetas

Kablius galima konfigūruoti nurodant prioritetą (mažesnė reikšmė = vykdoma pirmiau):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Arba kaip paprastas logines reikšmes (numatytasis prioritetas 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Leidimų sistema

Pagal numatytuosius nustatymus įskiepiai yra** ne smėlio dėžė** . Kiekvienas aktyvus įskiepis veikia kaip atskiras įprastas Node.js antrinis procesas (`loadPlugin()` in `src/lib/plugins/loader.ts`) naudojant tą patį operacinės sistemos vartotoją kaip ir OmniRoute, be VM konteksto ir be Node.js leidimo vėliavėlių. Įskiepio kodas gali naudoti `node:fs`, `node:child_process`, `fetch` ir visus kitus Node.js API: jis gali skaityti ir rašyti bet kokį failą, kurį gali OmniRoute vartotojas (įskaitant duomenų katalogą), paleisti programas ir pasiekti tinklą.

Manifesto `requires.permissions` priima `network`, `file-read`, `file-write`, `env` ir `exec`. Naudojant numatytuosius nustatymus, vykdymo metu veikia tik `env`.

### Pasirinkimo leidimo modelis (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` funkcijos vėliavėlė (kategorija `security`,** išjungtas pagal numatytuosius nustatymus** ) pradeda kiekvieną papildinio procesą su [Node.js leidimo modeliu](https://nodejs.org/api/permissions.html) (`--permission`, priimama kiekvienoje palaikomoje Node.js eilutėje: 22.22 +, 24 ir 26). Vėliavos yra sukurtos iš manifesto `buildPermissionModelArgs()` `src/lib/plugins/permissionModel.ts`. Vėliava nuskaitoma, kai įskiepis suaktyvinamas, todėl ji taikoma po pakeitimo aktyvuotiems įskiepiams; išjunkite ir suaktyvinkite veikiantį papildinį, kad jį pritaikytumėte.

Papildinio duomenų katalogas yra `plugin-data/<plugin-name>` šalia papildinio šaknies (`~/.omniroute/plugin-data/<plugin-name>` pagal numatytuosius nustatymus, `getPluginDataDir()`). Kai vėliavėlė įjungta, jos kelias perduodamas įskiepiui kaip `PLUGIN_DATA_DIR`.

| Leidimas     | Žymėjimas išjungtas (numatytasis)                                                                                                                                                                                              | Vėliava įjungta                                                                                                                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (nėra)       | Visos OmniRoute vartotojo privilegijos.                                                                                                                                                                                        | Failas skaitomas tik įskiepių kataloge. Jokie failai neįrašo, nėra antrinių procesų, nėra darbuotojo gijų, nėra vietinių priedų, nėra WASI.                                                                                                         |
| `env`        | Įskiepio procesas taip pat gauna `PORT`, `HOSTNAME`, `TZ` ir `TMPDIR`. Be jo jis gauna tik `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` ir `PLUGIN_NAME` (plius `SystemRoot` ir `windir` ant Windows). | Lygiai taip pat, kaip ir išjungus vėliavą.                                                                                                                                                                                                          |
| `file-read`  | Nėra (tik deklaracija).                                                                                                                                                                                                        | Įskiepio duomenų katalogas taip pat tampa skaitomas (jei trūksta, sukuriamas).                                                                                                                                                                      |
| `file-write` | Nėra (tik deklaracija).                                                                                                                                                                                                        | Papildinio duomenų katalogas tampa skaitomas ir įrašomas (`--allow-fs-write`). Daugiau nieko nerašo.                                                                                                                                                |
| `exec`       | Nėra (tik deklaracija).                                                                                                                                                                                                        | Vaiko procesai leidžiami (`--allow-child-process`). Node.js perduoda leidimų vėliavėles antriniams Node.js procesams per `NODE_OPTIONS`, tačiau bet kuri kita programa veikia be apribojimų, todėl `exec` veiksmingai pakelia failų sistemos ribas. |
| `network`    | Nėra (tik deklaracija).                                                                                                                                                                                                        | Nėra. Node.js leidimo modelis neriboja išeinančio tinklo prieigos, todėl `network` lieka deklaracija ir niekada nėra vykdomas.                                                                                                                      |

Įjungus vėliavėlę, sustabdomi įskiepiai, kurie nuskaito failus, esančius už savo katalogo ribų (pavyzdžiui, modulį, išspręstą iš pirminio `node_modules`), rašo bet kur, išskyrus savo duomenų katalogą, arba sukuria procesus nedeklaruodami `exec`. Net ir su vėliavėle papildinys išlaiko prieigą prie tinklo ir veikia kaip OmniRoute vartotojas, todėl įdiekite tik tuos papildinius, kurių šaltiniu pasitikite.

## Konfigūracijos schema

Konfigūruojamus nustatymus apibrėžkite `configSchema`:

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

Laukų tipai: `string`, `number`, `boolean`, `select`

Laukų parinktys: `default`, `min`, `max`, `enum`, `description`

Konfigūracijos reikšmės išsaugomos duomenų bazėje ir yra pasiekiamos valdymo skydelio konfigūracijos puslapyje.

## Integruotieji įvykiai

| Įvykis            | Kada                                         | Naudingoji apkrova            |
| ----------------- | -------------------------------------------- | ----------------------------- |
| `onRequest`       | Prieš pokalbių apdorojimo funkciją           | Užklausos kontekstas          |
| `onResponse`      | Po pokalbių apdorojimo funkcijos             | Atsakymo duomenys             |
| `onError`         | Įvykus apdorojimo klaidai                    | Klaidos objektas              |
| `onModelSelect`   | Parinkus modelį maršrutizavimui              | Modelio informacija           |
| `onComboResolve`  | Nustačius kombinuoto maršrutizavimo tikslus  | Kombinacijos tikslai          |
| `onRateLimit`     | Pasiekus dažnio ribą                         | Ribos informacija             |
| `onQuotaExhaust`  | Išnaudojus kvotą                             | Kvotos informacija            |
| `onProviderError` | Teikėjui grąžinus klaidą                     | Klaidos informacija           |
| `onStreamStart`   | Pradėjus SSE srautą                          | Srauto informacija            |
| `onStreamEnd`     | Pasibaigus SSE srautui                       | Srauto statistika             |
| `onInstall`       | Įdiegus papildinį                            | `{ name, version, manifest }` |
| `onActivate`      | Aktyvavus papildinį                          | `{ name, version, manifest }` |
| `onDeactivate`    | Deaktyvavus papildinį                        | `{ name, version, manifest }` |
| `onUninstall`     | Pašalinus papildinį (prieš ištrinant failus) | `{ name, version, manifest }` |

## Pavyzdžiai

### Užklausų registratorius

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Normos ribotuvas

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

### Reagavimo transformatorius

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
