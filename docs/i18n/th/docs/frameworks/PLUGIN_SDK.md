# OmniRoute Plugin SDK (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## เริ่มต้นอย่างรวดเร็ว

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

## อ้างอิง API

### `definePlugin(def: PluginDefinition): Plugin`

ฟังก์ชั่นโรงงานที่สร้างวัตถุปลั๊กอินด้วยค่าเริ่มต้น

**พารามิเตอร์:**

- `name` (สตริง, จำเป็น) — ชื่อปลั๊กอินใน kebab-case
- `priority` (ตัวเลข, ทางเลือก, ค่าเริ่มต้น: 100) — รันต่ำกว่าก่อน
- `enabled` (บูลีน, ตัวเลือก, ค่าเริ่มต้น: จริง) — เริ่มเปิดใช้งานหรือไม่
- `onRequest` (ฟังก์ชัน, ทางเลือก) — ทำงานก่อนตัวจัดการแชท
- `onResponse` (ฟังก์ชัน, ทางเลือก) — ทำงานตามตัวจัดการแชท
- `onError` (ฟังก์ชัน, ทางเลือก) — รันบนข้อผิดพลาดของตัวจัดการ

### `blockRequest(response?): BlockingHookResult`

บล็อกคำขอและส่งคืนการตอบกลับที่กำหนดเอง (ไม่บังคับ)

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

แก้ไขเนื้อหาคำขอก่อนที่จะถึงผู้ให้บริการ

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

แนบข้อมูลเมตากับบริบทคำขอ

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## บริบทปลั๊กอิน (`PluginContext`)

| สนาม         | พิมพ์                     | คำอธิบาย                          |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | ตัวระบุคำขอที่ไม่ซ้ำ              |
| `model`      | `string`                  | ชื่อรุ่นที่ขอ                     |
| `provider`   | `string`                  | ผู้ให้บริการเป้าหมาย ID           |
| `body`       | `Record<string, unknown>` | ขอร่างกาย                         |
| `headers`    | `Record<string, string>`  | ส่วนหัวของคำขอ (ดูหมายเหตุ)       |
| `metadata`   | `Record<string, unknown>` | ข้อมูลเมตาที่ไม่แน่นอน            |
| `timestamp`  | `number`                  | ขอประทับเวลา                      |
| `apiKeyInfo` | `object` (ไม่จำเป็น)      | ข้อมูลเมตาของคีย์API (ดูหมายเหตุ) |

บริบทไม่เคยนำข้อมูลรับรองของลูกค้า: ส่วนหัว `authorization`, `x-api-key`, `proxy-authorization` และ `cookie` จะถูกลบออก (ตัวพิมพ์เล็ก/ใหญ่) และ `apiKeyInfo` จะเก็บข้อมูลเมตาของคีย์ (เช่น `id`, `name` และ `scopes`) แต่ไม่ใช่ค่าคีย์หรือลายนิ้วมือ (`redactPluginContext()` ใน `src/lib/plugins/hooks.ts`) สิ่งนี้ใช้กับ `onRequest`, `onResponse` และ `onError`

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

### ลำดับความสำคัญของ Hook

สามารถกำหนดลำดับความสำคัญให้ Hook ได้ (ค่าที่ต่ำกว่า = ทำงานก่อน):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

หรือกำหนดเป็นค่าบูลีนแบบง่าย (ลำดับความสำคัญเริ่มต้นคือ 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ระบบการอนุญาต

โดยค่าเริ่มต้นปลั๊กอินคือ** ไม่ใช่แซนด์บ็อกซ์** . ปลั๊กอินที่ใช้งานอยู่แต่ละตัวจะทำงานเป็นกระบวนการลูก Node.js ธรรมดาแยกต่างหาก (`loadPlugin()` ใน `src/lib/plugins/loader.ts`) ภายใต้ผู้ใช้ระบบปฏิบัติการเดียวกันกับ OmniRoute โดยไม่มีบริบท VM และไม่มีแฟล็กสิทธิ์อนุญาต Node.js รหัสปลั๊กอินสามารถใช้ `node:fs`, `node:child_process`, `fetch` และ Node.js API อื่นๆ : มันสามารถอ่านและเขียนไฟล์ใดๆ ที่ผู้ใช้ OmniRoute สามารถทำได้ (รวมถึงไดเรกทอรีข้อมูล) เรียกใช้โปรแกรมและเข้าถึงเครือข่าย

`requires.permissions` ของรายการยอมรับ `network`, `file-read`, `file-write`, `env` และ `exec` ด้วยการตั้งค่าเริ่มต้น มีเพียง `env` เท่านั้นที่มีผลกระทบต่อรันไทม์

### รูปแบบการอนุญาตการเลือกใช้ (`PLUGIN_PERMISSION_MODEL_ENABLED`)

ธงคุณลักษณะ `PLUGIN_PERMISSION_MODEL_ENABLED` (หมวดหมู่ `security`,** ปิดโดยค่าเริ่มต้น** ) เริ่มต้นกระบวนการปลั๊กอินแต่ละรายการด้วย [โมเดลการอนุญาต Node.js](https://nodejs.org/api/permissions.html) (`--permission` ยอมรับโดยทุกบรรทัด Node.js ที่รองรับ: 22.22 +, 24 และ 26) แฟล็กถูกสร้างขึ้นจากรายการโดย `buildPermissionModelArgs()` ใน `src/lib/plugins/permissionModel.ts` ธงจะถูกอ่านเมื่อเปิดใช้งานปลั๊กอิน ดังนั้นจึงใช้กับปลั๊กอินที่เปิดใช้งานหลังการเปลี่ยนแปลง ปิดการใช้งานและเปิดใช้งานปลั๊กอินที่ทำงานอยู่เพื่อใช้งาน

ไดเร็กทอรีข้อมูลปลั๊กอินคือ `plugin-data/<plugin-name>` ถัดจากรูทปลั๊กอิน (`~/.omniroute/plugin-data/<plugin-name>` โดยค่าเริ่มต้น `getPluginDataDir()`) เมื่อเปิดแฟล็ก เส้นทางจะถูกส่งไปยังปลั๊กอินเป็น `PLUGIN_DATA_DIR`

| การอนุญาต    | ปิดการตั้งค่าสถานะ (ค่าเริ่มต้น)                                                                                                                                                                                            | ติดธง                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (ไม่มี)      | สิทธิ์เต็มรูปแบบของผู้ใช้ OmniRoute                                                                                                                                                                                         | ไฟล์อ่านได้เฉพาะภายในไดเร็กทอรีปลั๊กอินเท่านั้น ไม่มีการเขียนไฟล์, ไม่มีกระบวนการย่อย, ไม่มีเธรดผู้ปฏิบัติงาน, ไม่มีส่วนเสริมดั้งเดิม, ไม่มี WASI                                                                                 |
| `env`        | กระบวนการปลั๊กอินยังได้รับ `PORT`, `HOSTNAME`, `TZ` และ `TMPDIR` หากไม่มีมันจะได้รับเพียง `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` และ `PLUGIN_NAME` (บวก `SystemRoot` และ `windir` บน Windows) | เช่นเดียวกับการปลดธง                                                                                                                                                                                                              |
| `file-read`  | ไม่มี (การประกาศเท่านั้น)                                                                                                                                                                                                   | ไดเร็กทอรีข้อมูลปลั๊กอินยังสามารถอ่านได้ (สร้างขึ้นหากไม่มี)                                                                                                                                                                      |
| `file-write` | ไม่มี (การประกาศเท่านั้น)                                                                                                                                                                                                   | ไดเร็กทอรีข้อมูลปลั๊กอินสามารถอ่านและเขียนได้ (`--allow-fs-write`) ไม่มีอะไรอื่นที่จะเขียนได้                                                                                                                                     |
| `exec`       | ไม่มี (การประกาศเท่านั้น)                                                                                                                                                                                                   | อนุญาตให้ใช้กระบวนการลูก (`--allow-child-process`) Node.js ส่งแฟล็กการอนุญาตไปยังลูก Node.js ประมวลผลผ่าน `NODE_OPTIONS` แต่โปรแกรมอื่น ๆ ทำงานโดยไม่มีข้อจำกัด ดังนั้น `exec` จึงยกระดับขีดจำกัดของระบบไฟล์ได้อย่างมีประสิทธิภาพ |
| `network`    | ไม่มี (การประกาศเท่านั้น)                                                                                                                                                                                                   | ไม่มี. โมเดลสิทธิ์ Node.js ไม่จำกัดการเข้าถึงเครือข่ายขาออก ดังนั้น `network` จึงยังคงเป็นการประกาศและไม่มีการบังคับใช้                                                                                                           |

การเปิดแฟล็กบนปลั๊กอินตัวแบ่งที่อ่านไฟล์นอกไดเร็กทอรีของตัวเอง (เช่น โมดูลที่แก้ไขจากพาเรนต์ `node_modules`) เขียนที่ใดก็ได้ยกเว้นไดเร็กทอรีข้อมูล หรือสร้างกระบวนการโดยไม่ประกาศ `exec` แม้ว่าการตั้งค่าสถานะบนปลั๊กอินจะยังคงเข้าถึงเครือข่ายและทำงานในฐานะผู้ใช้ OmniRoute ดังนั้นให้ติดตั้งเฉพาะปลั๊กอินที่มีแหล่งที่คุณเชื่อถือเท่านั้น

## สคีมาการกำหนดค่า

กำหนดการตั้งค่าที่ปรับแต่งได้ใน `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "คีย์ API ภายนอก" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ประเภทฟิลด์: `string`, `number`, `boolean`, `select`

ตัวเลือกฟิลด์: `default`, `min`, `max`, `enum`, `description`

ค่าการกำหนดค่าจะถูกจัดเก็บอย่างถาวรในฐานข้อมูลและสามารถเข้าถึงได้ผ่านหน้าการกำหนดค่าของแดชบอร์ด

## อีเวนต์ในตัว

| อีเวนต์           | เกิดขึ้นเมื่อ                          | เพย์โหลด                      |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | ก่อนตัวจัดการแชต                       | บริบทคำขอ                     |
| `onResponse`      | หลังตัวจัดการแชต                       | ข้อมูลการตอบกลับ              |
| `onError`         | เมื่อตัวจัดการเกิดข้อผิดพลาด           | ออบเจ็กต์ข้อผิดพลาด           |
| `onModelSelect`   | เลือกโมเดลสำหรับการกำหนดเส้นทางแล้ว    | ข้อมูลโมเดล                   |
| `onComboResolve`  | ระบุการกำหนดเส้นทางแบบคอมโบแล้ว        | เป้าหมายคอมโบ                 |
| `onRateLimit`     | ถึงขีดจำกัดอัตราการใช้งาน              | ข้อมูลขีดจำกัด                |
| `onQuotaExhaust`  | โควตาหมด                               | ข้อมูลโควตา                   |
| `onProviderError` | ผู้ให้บริการส่งคืนข้อผิดพลาด           | รายละเอียดข้อผิดพลาด          |
| `onStreamStart`   | สตรีม SSE เริ่มต้น                     | ข้อมูลสตรีม                   |
| `onStreamEnd`     | สตรีม SSE สิ้นสุด                      | สถิติสตรีม                    |
| `onInstall`       | ติดตั้งปลั๊กอินแล้ว                    | `{ name, version, manifest }` |
| `onActivate`      | เปิดใช้งานปลั๊กอินแล้ว                 | `{ name, version, manifest }` |
| `onDeactivate`    | ปิดใช้งานปลั๊กอินแล้ว                  | `{ name, version, manifest }` |
| `onUninstall`     | ถอนการติดตั้งปลั๊กอินแล้ว (ก่อนลบไฟล์) | `{ name, version, manifest }` |

## ตัวอย่าง

### ขอคนบันทึก

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ตัวจำกัดอัตรา

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

### หม้อแปลงตอบสนอง

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
