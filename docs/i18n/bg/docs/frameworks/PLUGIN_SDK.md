# OmniRoute Plugin SDK (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Бърз старт

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

## справка API

### `definePlugin(def: PluginDefinition): Plugin`

Фабрична функция, която създава Plugin обект с настройки по подразбиране.

**Параметри:**

- `name` (низ, задължително) — Име на приставката в kebab-case
- `priority` (число, по избор, по подразбиране: 100) — Долен се изпълнява първи
- `enabled` (булева стойност, по избор, по подразбиране: вярно) — Старт разрешено?
- `onRequest` (функция, по избор) — Изпълнява се преди манипулатора на чат
- `onResponse` (функция, по избор) — Изпълнява се след манипулатора на чат
- `onError` (функция, по избор) — Изпълнява се при грешка на манипулатора

### `blockRequest(response?): BlockingHookResult`

Блокирайте заявката и по желание върнете персонализиран отговор.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Променете тялото на заявката, преди да достигне до доставчика.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Прикрепете метаданни към контекста на заявката.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Контекст на приставката (`PluginContext`)

| Поле         | Тип                       | Описание                                |
| ------------ | ------------------------- | --------------------------------------- |
| `requestId`  | `string`                  | Уникален идентификатор на заявка        |
| `model`      | `string`                  | Искано име на модела                    |
| `provider`   | `string`                  | Целеви доставчик ID                     |
| `body`       | `Record<string, unknown>` | Тяло на заявката                        |
| `headers`    | `Record<string, string>`  | Заглавки на заявките (вижте бележката)  |
| `metadata`   | `Record<string, unknown>` | Променливи метаданни                    |
| `timestamp`  | `number`                  | Заявка за дата и час                    |
| `apiKeyInfo` | `object` (по избор)       | API ключови метаданни (вижте бележката) |

Контекстът никога не носи идентификационните данни на клиента: заглавките `authorization`, `x-api-key`, `proxy-authorization` и `cookie` се премахват (всеки регистър), а `apiKeyInfo` запазва метаданните на ключа (като `id`, `name` и `scopes`), но не и стойността на ключа или неговия пръстов отпечатък (`redactPluginContext()` в `src/lib/plugins/hooks.ts`). Това се отнася за `onRequest`, `onResponse` и `onError`.

## Манифест (`plugin.json`)

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

### Приоритет на hook функциите

Hook функциите могат да бъдат конфигурирани с приоритет (по-ниска стойност = изпълнява се първа):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Или като обикновени булеви стойности (приоритет по подразбиране 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Разрешителна система

По подразбиране плъгините са** не е пясъчна среда** . Всеки активен плъгин работи като отделен, обикновен Node.js дъщерен процес (`loadPlugin()` в `src/lib/plugins/loader.ts`) под същия потребител на операционната система като OmniRoute, без VM контекст и без Node.js флагове за разрешение. Кодът на приставката може да използва `node:fs`, `node:child_process`, `fetch` и всеки друг Node.js API: той може да чете и записва всеки файл, който потребителят OmniRoute може (включително директорията с данни), да изпълнява програми и да достига до мрежата.

`requires.permissions` на манифеста приема `network`, `file-read`, `file-write`, `env` и `exec`. С настройките по подразбиране само `env` има ефект по време на изпълнение.

### Модел на разрешение за включване (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Флагът на функцията `PLUGIN_PERMISSION_MODEL_ENABLED` (категория `security`,** изключено по подразбиране** ) стартира всеки процес на приставка с [модела на разрешение Node.js](https://nodejs.org/api/permissions.html) (`--permission`, приет от всеки поддържан Node.js ред: 22.22 +, 24 и 26). Флаговете са изградени от манифеста от `buildPermissionModelArgs()` в `src/lib/plugins/permissionModel.ts`. Флагът се чете, когато даден плъгин е активиран, така че се прилага за плъгини, активирани след промяната; деактивирайте и активирайте работещ плъгин, за да го приложите.

Директорията с данни на приставката е `plugin-data/<plugin-name>` до корена на приставката (`~/.omniroute/plugin-data/<plugin-name>` по подразбиране, `getPluginDataDir()`). С включен флаг пътят му се предава на приставката като `PLUGIN_DATA_DIR`.

| разрешение   | Отбелязване (по подразбиране)                                                                                                                                                                                                     | Включено знаме                                                                                                                                                                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (няма)       | Пълни привилегии на потребителя OmniRoute.                                                                                                                                                                                        | Файлът се чете само в директорията на приставката. Без запис на файл, без дъщерни процеси, без работни нишки, без собствени добавки, без WASI.                                                                                                                            |
| `env`        | Процесът на приставката също получава `PORT`, `HOSTNAME`, `TZ` и `TMPDIR`. Без него получава само `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` и `PLUGIN_NAME` (плюс `SystemRoot` и `windir` на Windows). | Същото като с изключен флаг.                                                                                                                                                                                                                                              |
| `file-read`  | Няма (само декларация).                                                                                                                                                                                                           | Директорията с данни на плъгина също става четима (създава се, ако липсва).                                                                                                                                                                                               |
| `file-write` | Няма (само декларация).                                                                                                                                                                                                           | Директорията с данни на плъгина става четима и записваема (`--allow-fs-write`). Нищо друго не може да се записва.                                                                                                                                                         |
| `exec`       | Няма (само декларация).                                                                                                                                                                                                           | Дъщерните процеси са разрешени (`--allow-child-process`). Node.js предава флаговете за разрешение на дъщерните Node.js процеси чрез `NODE_OPTIONS`, но всяка друга програма работи без ограничения, така че `exec` ефективно премахва ограниченията на файловата система. |
| `network`    | Няма (само декларация).                                                                                                                                                                                                           | Няма. Моделът на разрешение Node.js не ограничава изходящия мрежов достъп, така че `network` остава декларация и никога не се прилага.                                                                                                                                    |

Включването на флага прекъсва плъгините, които четат файлове извън собствената си директория (например модул, разрешен от родител `node_modules`), пишат навсякъде освен в тяхната директория с данни или създават процеси, без да декларират `exec`. Дори и с флага на плъгина запазва достъпа до мрежата и работи като OmniRoute потребител, така че инсталирайте само плъгини, на чийто източник имате доверие.

## Схема на конфигурацията

Дефинирайте конфигурируемите настройки в `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Ключ за външен API" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Типове полета: `string`, `number`, `boolean`, `select`

Опции за полетата: `default`, `min`, `max`, `enum`, `description`

Стойностите на конфигурацията се съхраняват в базата данни и са достъпни чрез страницата за конфигурация в таблото за управление.

## Вградени събития

| Събитие           | Кога                                                          | Данни                         |
| ----------------- | ------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Преди обработчика на чата                                     | Контекст на заявката          |
| `onResponse`      | След обработчика на чата                                      | Данни от отговора             |
| `onError`         | При грешка в обработчика                                      | Обект на грешката             |
| `onModelSelect`   | При избор на модел за маршрутизиране                          | Информация за модела          |
| `onComboResolve`  | При определяне на комбиниран маршрут                          | Цели на комбинацията          |
| `onRateLimit`     | При достигане на ограничението на честотата                   | Информация за ограничението   |
| `onQuotaExhaust`  | При изчерпване на квотата                                     | Информация за квотата         |
| `onProviderError` | Когато доставчикът върне грешка                               | Подробности за грешката       |
| `onStreamStart`   | При стартиране на SSE поток                                   | Информация за потока          |
| `onStreamEnd`     | При завършване на SSE потока                                  | Статистика за потока          |
| `onInstall`       | При инсталиране на плъгина                                    | `{ name, version, manifest }` |
| `onActivate`      | При активиране на плъгина                                     | `{ name, version, manifest }` |
| `onDeactivate`    | При деактивиране на плъгина                                   | `{ name, version, manifest }` |
| `onUninstall`     | При деинсталиране на плъгина (преди изтриването на файловете) | `{ name, version, manifest }` |

## Примери

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

### Ограничител на скоростта

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

### Трансформатор за реакция

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
