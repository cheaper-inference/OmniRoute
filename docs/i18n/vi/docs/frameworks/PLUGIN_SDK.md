# OmniRoute Plugin SDK (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Bắt đầu nhanh

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

## tham khảo API

### `definePlugin(def: PluginDefinition): Plugin`

Hàm xuất xưởng tạo đối tượng Plugin có giá trị mặc định.

**Thông số:**

- `name` (chuỗi, bắt buộc) Tên plugin — trong trường hợp kebab
- `priority` (số, tùy chọn, mặc định: 100) — Hạ chạy trước
- `enabled` (boolean, tùy chọn, mặc định: true) — Đã bật tính năng Bắt đầu chưa?
- `onRequest` (chức năng, tùy chọn) — Chạy trước trình xử lý trò chuyện
- `onResponse` (chức năng, tùy chọn) — Chạy sau trình xử lý trò chuyện
- `onError` (chức năng, tùy chọn) — Chạy do lỗi xử lý

### `blockRequest(response?): BlockingHookResult`

Chặn yêu cầu và tùy ý trả về phản hồi tùy chỉnh.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Sửa đổi nội dung yêu cầu trước khi nó đến nhà cung cấp.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Đính kèm siêu dữ liệu vào ngữ cảnh yêu cầu.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Bối cảnh plugin (`PluginContext`)

| Cánh đồng    | Kiểu                      | Sự miêu tả                          |
| ------------ | ------------------------- | ----------------------------------- |
| `requestId`  | `string`                  | Mã định danh yêu cầu duy nhất       |
| `model`      | `string`                  | Tên mẫu được yêu cầu                |
| `provider`   | `string`                  | Nhà cung cấp mục tiêu ID            |
| `body`       | `Record<string, unknown>` | Nội dung yêu cầu                    |
| `headers`    | `Record<string, string>`  | Tiêu đề yêu cầu (xem ghi chú)       |
| `metadata`   | `Record<string, unknown>` | Siêu dữ liệu có thể thay đổi        |
| `timestamp`  | `number`                  | Yêu cầu dấu thời gian               |
| `apiKeyInfo` | `object` (tùy chọn)       | Siêu dữ liệu khóa API (xem ghi chú) |

Ngữ cảnh không bao giờ mang thông tin xác thực của khách hàng: các tiêu đề `authorization`, `x-api-key`, `proxy-authorization` và `cookie` bị xóa (bất kỳ cách viết hoa nào) và `apiKeyInfo` giữ siêu dữ liệu của khóa (chẳng hạn như `id`, `name` và `scopes`) nhưng không giữ giá trị khóa hoặc dấu vân tay của nó (`redactPluginContext()` trong `src/lib/plugins/hooks.ts`). Điều này áp dụng cho `onRequest`, `onResponse` và `onError`.

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

### Độ ưu tiên của hook

Các hook có thể được cấu hình với độ ưu tiên (thấp hơn = chạy trước):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Hoặc dưới dạng các giá trị boolean đơn giản (độ ưu tiên mặc định là 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Hệ thống cấp phép

Theo mặc định các plugin là** không có hộp cát** . Mỗi plugin hoạt động chạy như một quy trình con Node.js thông thường, riêng biệt (`loadPlugin()` trong `src/lib/plugins/loader.ts`) dưới cùng một người dùng hệ điều hành như OmniRoute, không có ngữ cảnh VM và không có cờ cấp phép Node.js. Mã plugin có thể sử dụng `node:fs`, `node:child_process`, `fetch` và mọi Node.js API khác : nó có thể đọc và ghi bất kỳ tệp nào mà người dùng OmniRoute có thể (bao gồm cả thư mục dữ liệu), chạy chương trình và truy cập mạng.

`requires.permissions` của tệp kê khai chấp nhận `network`, `file-read`, `file-write`, `env` và `exec`. Với cài đặt mặc định, chỉ `env` có hiệu lực khi chạy.

### Mô hình cấp phép chọn tham gia (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Cờ tính năng `PLUGIN_PERMISSION_MODEL_ENABLED` (danh mục `security`,** tắt theo mặc định** ) bắt đầu mỗi quy trình plugin với [mô hình cấp phép Node.js](https://nodejs.org/api/permissions.html) (`--permission`, được chấp nhận bởi mọi dòng Node.js được hỗ trợ: 22.22 +, 24 và 26). Các cờ được tạo từ tệp kê khai bởi `buildPermissionModelArgs()` trong `src/lib/plugins/permissionModel.ts`. Cờ được đọc khi plugin được kích hoạt, do đó, nó áp dụng cho các plugin được kích hoạt sau khi thay đổi; tắt và kích hoạt plugin đang chạy để áp dụng nó.

Thư mục dữ liệu plugin là `plugin-data/<plugin-name>` bên cạnh root plugin (`~/.omniroute/plugin-data/<plugin-name>` theo mặc định, `getPluginDataDir()`). Khi cờ được bật, đường dẫn của nó được chuyển tới plugin dưới dạng `PLUGIN_DATA_DIR`.

| Sự cho phép  | Tắt cờ (mặc định)                                                                                                                                                                                                                           | Gắn cờ                                                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (không có)   | Đặc quyền đầy đủ của người dùng OmniRoute.                                                                                                                                                                                                  | Tệp chỉ đọc bên trong thư mục plugin. Không ghi tập tin, không có tiến trình con, không có chuỗi công việc, không có addon gốc, không có WASI.                                                                                                                  |
| `env`        | Quá trình plugin cũng nhận được `PORT`, `HOSTNAME`, `TZ` và `TMPDIR`. Không có nó, nó chỉ nhận được `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` và `PLUGIN_NAME` (cộng với `SystemRoot` và `windir` trên Windows). | Tương tự với việc tắt cờ.                                                                                                                                                                                                                                       |
| `file-read`  | Không có (chỉ khai báo).                                                                                                                                                                                                                    | Thư mục dữ liệu plugin cũng có thể đọc được (nó sẽ được tạo nếu thiếu).                                                                                                                                                                                         |
| `file-write` | Không có (chỉ khai báo).                                                                                                                                                                                                                    | Thư mục dữ liệu plugin trở nên có thể đọc và ghi được (`--allow-fs-write`). Không có gì khác có thể ghi được.                                                                                                                                                   |
| `exec`       | Không có (chỉ khai báo).                                                                                                                                                                                                                    | Quá trình con được phép (`--allow-child-process`). Node.js chuyển cờ quyền cho các tiến trình Node.js con thông qua `NODE_OPTIONS`, nhưng bất kỳ chương trình nào khác chạy mà không bị hạn chế, do đó `exec` nâng cao giới hạn hệ thống tệp một cách hiệu quả. |
| `network`    | Không có (chỉ khai báo).                                                                                                                                                                                                                    | Không có. Mô hình quyền Node.js không hạn chế quyền truy cập mạng bên ngoài, vì vậy `network` vẫn là một tuyên bố và không bao giờ được thực thi.                                                                                                               |

Việc bật cờ sẽ ngắt các plugin đọc tệp bên ngoài thư mục riêng của chúng (ví dụ: mô-đun được phân giải từ cha mẹ `node_modules`), ghi ở bất kỳ đâu ngoại trừ thư mục dữ liệu của chúng hoặc tạo ra các quy trình mà không khai báo `exec`. Ngay cả khi có cờ trên plugin vẫn giữ quyền truy cập mạng và chạy với tư cách là người dùng OmniRoute, vì vậy chỉ cài đặt các plugin có nguồn mà bạn tin cậy.

## Lược đồ cấu hình

Định nghĩa các thiết lập có thể cấu hình trong `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Khóa API bên ngoài" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Các kiểu trường: `string`, `number`, `boolean`, `select`

Các tùy chọn trường: `default`, `min`, `max`, `enum`, `description`

Các giá trị cấu hình được lưu trữ trong cơ sở dữ liệu và có thể truy cập thông qua trang cấu hình của bảng điều khiển.

## Các sự kiện tích hợp sẵn

| Sự kiện           | Khi nào                                    | Payload                       |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `onRequest`       | Trước trình xử lý trò chuyện               | Ngữ cảnh yêu cầu              |
| `onResponse`      | Sau trình xử lý trò chuyện                 | Dữ liệu phản hồi              |
| `onError`         | Khi trình xử lý gặp lỗi                    | Đối tượng lỗi                 |
| `onModelSelect`   | Mô hình được chọn để định tuyến            | Thông tin mô hình             |
| `onComboResolve`  | Định tuyến kết hợp được phân giải          | Các đích kết hợp              |
| `onRateLimit`     | Đạt giới hạn tốc độ                        | Thông tin giới hạn            |
| `onQuotaExhaust`  | Hạn ngạch đã cạn                           | Thông tin hạn ngạch           |
| `onProviderError` | Nhà cung cấp trả về lỗi                    | Chi tiết lỗi                  |
| `onStreamStart`   | Luồng SSE bắt đầu                          | Thông tin luồng               |
| `onStreamEnd`     | Luồng SSE kết thúc                         | Thống kê luồng                |
| `onInstall`       | Plugin được cài đặt                        | `{ name, version, manifest }` |
| `onActivate`      | Plugin được kích hoạt                      | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin bị vô hiệu hóa                      | `{ name, version, manifest }` |
| `onUninstall`     | Plugin được gỡ cài đặt (trước khi xóa tệp) | `{ name, version, manifest }` |

## Ví dụ

### Trình ghi yêu cầu

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Giới hạn tỷ lệ

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

### Máy biến áp đáp ứng

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
