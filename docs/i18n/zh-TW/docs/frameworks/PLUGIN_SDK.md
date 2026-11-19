# OmniRoute Plugin SDK (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md)

---

## 快速入門

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

## API參考

### `definePlugin(def: PluginDefinition): Plugin`

使用預設值建立插件物件的工廠函數。

**參數：**

- `name` （字串，必填） —短橫線格式的插件名稱
- `priority` （數字，可選，預設：100） —下層先運行
- `enabled` （布林值，可選，預設值：true） —啟動已啟用？
- `onRequest` （函數，可選） —在聊天處理程序之前執行
- `onResponse` （函數，可選） —在聊天處理程序之後運行
- `onError` （函數，可選） —在處理程序錯誤時執行

### `blockRequest(response?): BlockingHookResult`

阻止請求並可選擇返回自訂回應。

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

在請求正文到達提供者之前修改請求正文。

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

將元資料附加到請求上下文。

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## 插件上下文 (`PluginContext`)

| 場地         | 類型                      | 描述                  |
| ------------ | ------------------------- | --------------------- |
| `requestId`  | `string`                  | 唯一的請求標識符      |
| `model`      | `string`                  | 請求的型號名稱        |
| `provider`   | `string`                  | 目標提供者ID          |
| `body`       | `Record<string, unknown>` | 請求正文              |
| `headers`    | `Record<string, string>`  | 請求標頭（見註）      |
| `metadata`   | `Record<string, unknown>` | 可變元數據            |
| `timestamp`  | `number`                  | 請求時間戳            |
| `apiKeyInfo` | `object` （可選）         | API金鑰元資料（見註） |

上下文永遠不會攜帶客戶端的憑證： `authorization`、 `x-api-key`、 `proxy-authorization`和`cookie`標頭被刪除（任何大小寫），並且`apiKeyInfo`保留密鑰的元資料（例如`id`、 `name`和`scopes`），但不保留密鑰值或其指紋（ `src/lib/plugins/hooks.ts`中的`redactPluginContext()` ）。這適用於`onRequest`、 `onResponse`和`onError`。

## 資訊清單（`plugin.json`）

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

### Hook 優先順序

可以設定 Hook 的優先順序（數值越低 = 越先執行）：

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

也可以使用簡單的布林值（預設優先順序為 100）：

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## 權限系統

插件有**未沙盒化**。每個活動插件在與OmniRoute相同的作業系統使用者下作為單獨的普通Node.js子程序（ `src/lib/plugins/loader.ts`中的`loadPlugin()` ）運行，沒有VM上下文，也沒有Node.js權限標誌。插件程式碼可以使用`node:fs`、 `node:child_process`、 `fetch`和其他Node.js API：它可以讀寫OmniRoute用戶可以存取的任何檔案（包括資料目錄）、運行程式並存取網路。

清單的`requires.permissions`接受`network`、 `file-read`、 `file-write`、 `env`和`exec`，但現在只有`env`在運行時有效：

| 允許                                         | 今天生效                                                                                                                                                                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | 插件程序也接收`PORT`、 `HOSTNAME`、 `TZ`和`TMPDIR`。如果沒有它，它只會接收`PATH`、 `HOME`、 `USER`、 `LANG`、 `LC_ALL`、 `NODE_ENV`、 `PLUGIN_ENTRY`和`PLUGIN_NAME` （加上Windows上的`SystemRoot`和`windir` ）。 |
| `network`, `file-read`, `file-write`, `exec` | 沒有任何。它們只是聲明：當它們丟失時，任何東西都不會被阻止。                                                                                                                                                     |

安裝插件就像在主機上安裝任何其他程式一樣。僅安裝您信任來源的插件。

## 設定結構描述

在 `configSchema` 中定義可設定的選項：

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

欄位類型：`string`、`number`、`boolean`、`select`

欄位選項：`default`、`min`、`max`、`enum`、`description`

設定值會持久儲存在資料庫中，並可透過儀表板的設定頁面存取。

## 內建事件

| 事件              | 觸發時機                         | 承載資料                      |
| ----------------- | -------------------------------- | ----------------------------- |
| `onRequest`       | 聊天處理常式執行前               | 請求上下文                    |
| `onResponse`      | 聊天處理常式執行後               | 回應資料                      |
| `onError`         | 處理常式發生錯誤時               | 錯誤物件                      |
| `onModelSelect`   | 選擇用於路由的模型時             | 模型資訊                      |
| `onComboResolve`  | 組合路由解析完成時               | 組合目標                      |
| `onRateLimit`     | 達到速率限制時                   | 限制資訊                      |
| `onQuotaExhaust`  | 配額耗盡時                       | 配額資訊                      |
| `onProviderError` | 提供者傳回錯誤時                 | 錯誤詳細資料                  |
| `onStreamStart`   | SSE 串流開始時                   | 串流資訊                      |
| `onStreamEnd`     | SSE 串流結束時                   | 串流統計資料                  |
| `onInstall`       | 外掛程式安裝時                   | `{ name, version, manifest }` |
| `onActivate`      | 外掛程式啟用時                   | `{ name, version, manifest }` |
| `onDeactivate`    | 外掛程式停用時                   | `{ name, version, manifest }` |
| `onUninstall`     | 外掛程式解除安裝時（檔案刪除前） | `{ name, version, manifest }` |

## 範例

### 請求記錄器

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### 速率限制器

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

### 回應變壓器

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
