# OmniRoute Plugin SDK (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Tez boshlash

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

## API havolasi

### `definePlugin(def: PluginDefinition): Plugin`

Standart sozlamalar bilan Plugin obyektini yaratuvchi zavod funksiyasi.

**Parametrlar:**

- `name` (string, zarur) — plagin nomi kabob-rejismasida
- `priority` (raqam, ixtiyoriy, sukut bo'yicha: 100) — Avval pastroq ishlaydi
- `enabled` (mantiqiy, ixtiyoriy, standart: rost) — Start yoqilganmi?
- `onRequest` (funksiya, ixtiyoriy) — Chat ishlovchisidan oldin ishlaydi
- `onResponse` (funksiya, ixtiyoriy) — Chat ishlov beruvchidan keyin ishlaydi
- `onError` (funktsiya, ixtiyoriy) — Ishlovchi xatosi ustida ishlaydi

### `blockRequest(response?): BlockingHookResult`

So'rovni bloklang va ixtiyoriy ravishda maxsus javobni qaytaring.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Provayderga yetib borgunga qadar so'rov tanasini o'zgartiring.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Metamaʼlumotlarni soʻrov kontekstiga biriktiring.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plagin konteksti (`PluginContext`)

| Maydon       | Turi                      | Tavsif                                   |
| ------------ | ------------------------- | ---------------------------------------- |
| `requestId`  | `string`                  | Noyob so'rov identifikatori              |
| `model`      | `string`                  | So'ralgan model nomi                     |
| `provider`   | `string`                  | Maqsadli provayder ID                    |
| `body`       | `Record<string, unknown>` | So'rov organi                            |
| `headers`    | `Record<string, string>`  | Sarlavhalarni so'rash (eslatmaga qarang) |
| `metadata`   | `Record<string, unknown>` | O'zgaruvchan metama'lumotlar             |
| `timestamp`  | `number`                  | Vaqt tamg'asini so'rash                  |
| `apiKeyInfo` | `object` (ixtiyoriy)      | API kalit metadata (eslatmaga qarang)    |

Kontekst hech qachon mijozning hisobga olish ma'lumotlarini o'z ichiga olmaydi: `authorization`, `x-api-key`, `proxy-authorization` va `cookie` sarlavhalari o'chiriladi (har qanday korpus) va `apiKeyInfo` kalitning metama'lumotlarini ( `id`, `name` va `scopes` kabi) saqlaydi, lekin kalit qiymati yoki uning barmoq izini (`redactPluginContext()` dagi `src/lib/plugins/hooks.ts`) emas. Bu `onRequest`, `onResponse` va `onError` uchun amal qiladi.

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

### Huk ustuvorligi

Huklarni ustuvorlik bilan sozlash mumkin (pastroq qiymat = avval ishga tushadi):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Yoki oddiy mantiqiy qiymatlar sifatida (standart ustuvorlik 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Ruxsat tizimi

Plaginlar** qum qutisiga kiritilmagan** . Har bir faol plagin OmniRoute bilan bir xil operatsion tizim foydalanuvchisi ostida, VM konteksti va Node.js ruxsat belgilarisiz alohida, oddiy Node.js bola jarayoni ( `src/lib/plugins/loader.ts` da `loadPlugin()` ) sifatida ishlaydi. Plagin kodi `node:fs`, `node:child_process`, `fetch` va boshqa har qanday Node.js API foydalanishi mumkin: u OmniRoute foydalanuvchisi (jumladan, ma'lumotlar katalogini) o'qishi va yozishi, dasturlarni ishga tushirishi va tarmoqqa kirishi mumkin.

Manifestning `requires.permissions` `network`, `file-read`, `file-write`, `env` va `exec` qabul qiladi, ammo bugungi kunda faqat `env` ish vaqtida ta'sir qiladi:

| Ruxsat                                       | Bugungi kunda ta'sir                                                                                                                                                                                                    |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Plagin jarayoni `PORT`, `HOSTNAME`, `TZ` va `TMPDIR` ham oladi. Busiz u faqat `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` va `PLUGIN_NAME` (plyus `SystemRoot` ga Windows va `windir` ) oladi. |
| `network`, `file-read`, `file-write`, `exec` | Yo'q. Ular faqat deklaratsiyalardir: ular yo'qolganda hech narsa bloklanmaydi.                                                                                                                                          |

Plaginni o'rnatish xostga boshqa har qanday dasturni o'rnatishga o'xshaydi. Faqat manbasiga ishonadigan plaginlarni o'rnating.

## Konfiguratsiya sxemasi

Sozlanadigan parametrlarni `configSchema` ichida belgilang:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Tashqi API kaliti" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Maydon turlari: `string`, `number`, `boolean`, `select`

Maydon parametrlari: `default`, `min`, `max`, `enum`, `description`

Konfiguratsiya qiymatlari ma’lumotlar bazasida saqlanadi va boshqaruv panelidagi konfiguratsiya sahifasi orqali foydalanish mumkin.

## Ichki hodisalar

| Hodisa            | Qachon                                               | Foydali yuk                   |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | Chat ishlov beruvchisidan oldin                      | So‘rov konteksti              |
| `onResponse`      | Chat ishlov beruvchisidan keyin                      | Javob ma’lumotlari            |
| `onError`         | Ishlov beruvchi xatosi yuz berganda                  | Xato obyekti                  |
| `onModelSelect`   | Yo‘naltirish uchun model tanlanganda                 | Model ma’lumotlari            |
| `onComboResolve`  | Kombinatsion yo‘naltirish aniqlanganda               | Kombinatsiya maqsadlari       |
| `onRateLimit`     | Tezlik chegarasiga yetilganda                        | Cheklov ma’lumotlari          |
| `onQuotaExhaust`  | Kvota tugaganda                                      | Kvota ma’lumotlari            |
| `onProviderError` | Provayder xato qaytarganda                           | Xato tafsilotlari             |
| `onStreamStart`   | SSE oqimi boshlanganda                               | Oqim ma’lumotlari             |
| `onStreamEnd`     | SSE oqimi tugaganda                                  | Oqim statistikasi             |
| `onInstall`       | Plagin o‘rnatilganda                                 | `{ name, version, manifest }` |
| `onActivate`      | Plagin faollashtirilganda                            | `{ name, version, manifest }` |
| `onDeactivate`    | Plagin faolsizlantirilganda                          | `{ name, version, manifest }` |
| `onUninstall`     | Plagin o‘chirilganda (fayllar o‘chirilishidan oldin) | `{ name, version, manifest }` |

## Misollar

### So'rov jurnali

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Tarif cheklovchisi

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

### Javob transformatori

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
