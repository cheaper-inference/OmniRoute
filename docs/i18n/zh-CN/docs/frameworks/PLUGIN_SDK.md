# OmniRoute Plugin SDK (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## 快速入门

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

## API参考

### `definePlugin(def: PluginDefinition): Plugin`

使用默认值创建插件对象的工厂函数。

**参数：**

- `name` （字符串，必填） —短横线格式的插件名称
- `priority` （数字，可选，默认：100） —下层首先运行
- `enabled` （布尔值，可选，默认值：true） —启动已启用？
- `onRequest` （函数，可选） —在聊天处理程序之前运行
- `onResponse` （函数，可选） —在聊天处理程序之后运行
- `onError` （函数，可选） —在处理程序错误时运行

### `blockRequest(response?): BlockingHookResult`

阻止请求并可选择返回自定义响应。

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

在请求正文到达提供者之前修改请求正文。

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

将元数据附加到请求上下文。

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## 插件上下文 (`PluginContext`)

| 场地         | 类型                      | 描述                    |
| ------------ | ------------------------- | ----------------------- |
| `requestId`  | `string`                  | 唯一的请求标识符        |
| `model`      | `string`                  | 请求的型号名称          |
| `provider`   | `string`                  | 目标提供者ID            |
| `body`       | `Record<string, unknown>` | 请求正文                |
| `headers`    | `Record<string, string>`  | 请求标头（见注释）      |
| `metadata`   | `Record<string, unknown>` | 可变元数据              |
| `timestamp`  | `number`                  | 请求时间戳              |
| `apiKeyInfo` | `object` （可选）         | API密钥元数据（见注释） |

上下文永远不会携带客户端的凭据： `authorization`、 `x-api-key`、 `proxy-authorization`和`cookie`标头被删除（任何大小写），并且`apiKeyInfo`保留密钥的元数据（例如`id`、 `name`和`scopes`），但不保留密钥值或其指纹（ `src/lib/plugins/hooks.ts`中的`redactPluginContext()` ）。这适用于`onRequest`、 `onResponse`和`onError`。

## 清单（`plugin.json`）

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

### 钩子优先级

可以为钩子配置优先级（数值越低，执行越早）：

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

也可以使用简单的布尔值（默认优先级为 100）：

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## 权限系统

默认情况下插件是**未沙盒化**。每个活动插件在与OmniRoute相同的操作系统用户下作为单独的普通Node.js子进程（ `src/lib/plugins/loader.ts`中的`loadPlugin()` ）运行，没有VM上下文，也没有Node.js权限标志。插件代码可以使用`node:fs`、 `node:child_process`、 `fetch`和其他Node.js API：它可以读写OmniRoute用户可以访问的任何文件（包括数据目录）、运行程序并访问网络。

清单的`requires.permissions`接受`network`、 `file-read`、 `file-write`、 `env`和`exec`。使用默认设置，只有`env`在运行时有效。

### 选择加入权限模型 (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED`功能标志（类别`security`，**默认关闭**）使用[Node.js权限模型](https://nodejs.org/api/permissions.html)（`--permission`，被每个支持的Node.js行接受：22.22 +、 24 和 26 ）启动每个插件进程。这些标志是由`buildPermissionModelArgs()`在`src/lib/plugins/permissionModel.ts`中根据清单构建的。该标志是在插件激活时读取的，因此它适用于更改后激活的插件；停用并激活正在运行的插件以应用它。

插件数据目录是插件根目录旁边的`plugin-data/<plugin-name>` （默认为`~/.omniroute/plugin-data/<plugin-name>` ， `getPluginDataDir()`）。启用该标志后，其路径将作为`PLUGIN_DATA_DIR`传递给插件。

| 允许         | 标记关闭（默认）                                                                                                                                                                                                 | 标记开启                                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| （没有任何） | OmniRoute用户的全部权限。                                                                                                                                                                                        | 文件仅在插件目录内读取。没有文件写入，没有子进程，没有工作线程，没有本机插件，没有WASI。                                                                            |
| `env`        | 插件进程还接收`PORT`、 `HOSTNAME`、 `TZ`和`TMPDIR`。如果没有它，它只会接收`PATH`、 `HOME`、 `USER`、 `LANG`、 `LC_ALL`、 `NODE_ENV`、 `PLUGIN_ENTRY`和`PLUGIN_NAME` （加上Windows上的`SystemRoot`和`windir` ）。 | 与国旗关闭时相同。                                                                                                                                                  |
| `file-read`  | 无（仅声明）。                                                                                                                                                                                                   | 插件数据目录也变得可读（如果丢失，则会创建）。                                                                                                                      |
| `file-write` | 无（仅声明）。                                                                                                                                                                                                   | 插件数据目录变得可读可写（`--allow-fs-write`）。其他都不可写。                                                                                                      |
| `exec`       | 无（仅声明）。                                                                                                                                                                                                   | 允许子进程 (`--allow-child-process`)。 Node.js通过`NODE_OPTIONS`将权限标志传递给Node.js子进程，但任何其他程序的运行都不受限制，因此`exec`有效地解除了文件系统限制。 |
| `network`    | 无（仅声明）。                                                                                                                                                                                                   | 没有任何。 Node.js权限模型不限制出站网络访问，因此`network`仍然是声明并且从不强制执行。                                                                             |

打开该标志会破坏那些读取自己目录之外的文件的插件（例如从父`node_modules`解析的模块）、在其数据目录之外的任何地方写入或在不声明`exec`情况下生成进程。即使插件上有标志，也会保持网络访问并以OmniRoute用户身份运行，因此仅安装您信任来源的插件。

## 配置模式

在 `configSchema` 中定义可配置的设置：

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

字段类型：`string`、`number`、`boolean`、`select`

字段选项：`default`、`min`、`max`、`enum`、`description`

配置值会持久化到数据库中，并可通过仪表板配置页面进行访问。

## 内置事件

| 事件              | 触发时机                   | 载荷                          |
| ----------------- | -------------------------- | ----------------------------- |
| `onRequest`       | 聊天处理程序执行前         | 请求上下文                    |
| `onResponse`      | 聊天处理程序执行后         | 响应数据                      |
| `onError`         | 处理程序发生错误时         | 错误对象                      |
| `onModelSelect`   | 选择用于路由的模型时       | 模型信息                      |
| `onComboResolve`  | 组合路由解析完成时         | 组合目标                      |
| `onRateLimit`     | 触发速率限制时             | 限制信息                      |
| `onQuotaExhaust`  | 配额耗尽时                 | 配额信息                      |
| `onProviderError` | 提供者返回错误时           | 错误详情                      |
| `onStreamStart`   | SSE 流启动时               | 流信息                        |
| `onStreamEnd`     | SSE 流结束时               | 流统计信息                    |
| `onInstall`       | 插件安装时                 | `{ name, version, manifest }` |
| `onActivate`      | 插件激活时                 | `{ name, version, manifest }` |
| `onDeactivate`    | 插件停用时                 | `{ name, version, manifest }` |
| `onUninstall`     | 插件卸载时（删除文件之前） | `{ name, version, manifest }` |

## 示例

### 请求记录器

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

### 响应变压器

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
