# OmniRoute Plugin SDK (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Брзи почетак

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

## API Референце

### `definePlugin(def: PluginDefinition): Plugin`

Фабричка функција која креира Плугин објекат са подразумеваним вредностима.

**Параметри:**

- `name` (стринг, обавезан) — Име додатка у кебаб-цасе
- `priority` (број, опционо, подразумевано: 100) — Ловер се прво покреће
- `enabled` (боолеан, опционо, подразумевано: тачно) — Старт је омогућен?
- `onRequest` (функција, опционо) — Покреће се пре обрађивача ћаскања
- `onResponse` (функција, опционо) — Покреће се након обрађивача ћаскања
- `onError` (функција, опционо) — Покреће грешку руковаоца

### `blockRequest(response?): BlockingHookResult`

Блокирајте захтев и опционо вратите прилагођени одговор.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Измените тело захтева пре него што стигне до добављача.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Приложите метаподатке контексту захтева.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Контекст додатка (`PluginContext`)

| Поље         | Тип                       | Опис                                        |
| ------------ | ------------------------- | ------------------------------------------- |
| `requestId`  | `string`                  | Јединствени идентификатор захтева           |
| `model`      | `string`                  | Тражени назив модела                        |
| `provider`   | `string`                  | Циљни провајдер ID                          |
| `body`       | `Record<string, unknown>` | Тело захтева                                |
| `headers`    | `Record<string, string>`  | Заглавља захтева (погледајте напомену)      |
| `metadata`   | `Record<string, unknown>` | Променљиви метаподаци                       |
| `timestamp`  | `number`                  | Захтевај временску ознаку                   |
| `apiKeyInfo` | `object` (опционо)        | API кључни метаподаци (погледајте напомену) |

Контекст никада не носи акредитиве клијента: `authorization`, `x-api-key`, `proxy-authorization` и `cookie` заглавља се уклањају (свака мала слова), а `apiKeyInfo` задржава метаподатке кључа (као што су `id`, `name` и `scopes`), али не и вредност кључа или његов отисак прста (`redactPluginContext()` у `src/lib/plugins/hooks.ts`). Ово се односи на `onRequest`, `onResponse` и `onError`.

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

Hook funkcije mogu biti konfigurisane pomoću prioriteta (niža vrednost = izvršava se prva):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ili kao jednostavne boolean vrednosti (podrazumevani prioritet je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Систем дозвола

Додаци су** није заштићен од песка** . Сваки активни додатак ради као посебан, обичан Node.js подређени процес (`loadPlugin()` у `src/lib/plugins/loader.ts`) под истим корисником оперативног система као OmniRoute, без VM контекста и без Node.js заставица дозволе. Плугин код може да користи `node:fs`, `node:child_process`, `fetch` и сваки други Node.js API: може да чита и пише било коју датотеку OmniRoute корисник (укључујући директоријум података), покреће програме и долази до мреже.

`requires.permissions` манифеста прихвата `network`, `file-read`, `file-write`, `env` и `exec`, али данас само `env` има ефекат током извршавања:

| Дозвола                                      | Ефекат данас                                                                                                                                                                                                          |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Процес додатка такође прима `PORT`, `HOSTNAME`, `TZ` и `TMPDIR`. Без тога, прима само `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` и `PLUGIN_NAME` (плус `SystemRoot` и `windir` на Windows). |
| `network`, `file-read`, `file-write`, `exec` | Ниједан. То су само декларације: ништа није блокирано када недостају.                                                                                                                                                 |

Инсталирање додатка је као инсталирање било ког другог програма на хосту. Инсталирајте само додатке чији извор верујете.

## Шема конфигурације

Дефинишите подесива подешавања у `configSchema`:

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

Типови поља: `string`, `number`, `boolean`, `select`

Опције поља: `default`, `min`, `max`, `enum`, `description`

Вредности конфигурације чувају се у бази података и доступне су преко странице за конфигурацију на контролној табли.

## Уграђени догађаји

| Догађај           | Када                                           | Садржај                       |
| ----------------- | ---------------------------------------------- | ----------------------------- |
| `onRequest`       | Пре обрађивача ћаскања                         | Контекст захтева              |
| `onResponse`      | После обрађивача ћаскања                       | Подаци одговора               |
| `onError`         | При грешци обрађивача                          | Објекат грешке                |
| `onModelSelect`   | Модел је изабран за усмеравање                 | Информације о моделу          |
| `onComboResolve`  | Комбиновано усмеравање је разрешено            | Комбинована одредишта         |
| `onRateLimit`     | Ограничење учесталости је достигнуто           | Информације о ограничењу      |
| `onQuotaExhaust`  | Квота је исцрпљена                             | Информације о квоти           |
| `onProviderError` | Добављач је вратио грешку                      | Детаљи грешке                 |
| `onStreamStart`   | SSE ток је покренут                            | Информације о току            |
| `onStreamEnd`     | SSE ток је завршен                             | Статистика тока               |
| `onInstall`       | Додатак је инсталиран                          | `{ name, version, manifest }` |
| `onActivate`      | Додатак је активиран                           | `{ name, version, manifest }` |
| `onDeactivate`    | Додатак је деактивиран                         | `{ name, version, manifest }` |
| `onUninstall`     | Додатак је деинсталиран (пре брисања датотека) | `{ name, version, manifest }` |

## Примери

### Рекуест Логгер

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Рате Лимитер

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

### Респонсе Трансформер

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
