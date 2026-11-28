# OmniRoute Plugin SDK (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Mula Pantas

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

## API Rujukan

### `definePlugin(def: PluginDefinition): Plugin`

Fungsi kilang yang mencipta objek Plugin dengan lalai.

**Parameter:**

- `name` (rentetan, diperlukan) — Nama pemalam dalam kebab-case
- `priority` (nombor, pilihan, lalai: 100) — Lower dijalankan dahulu
- `enabled` (boolean, pilihan, lalai: benar) — Mula didayakan?
- `onRequest` (fungsi, pilihan) — Dijalankan sebelum pengendali sembang
- `onResponse` (fungsi, pilihan) — Berjalan selepas pengendali sembang
- `onError` (fungsi, pilihan) — Berjalan pada ralat pengendali

### `blockRequest(response?): BlockingHookResult`

Sekat permintaan dan kembalikan respons tersuai secara pilihan.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Ubah suai badan permintaan sebelum ia sampai kepada pembekal.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Lampirkan metadata pada konteks permintaan.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Konteks Pemalam (`PluginContext`)

| Padang       | taip                      | Penerangan                      |
| ------------ | ------------------------- | ------------------------------- |
| `requestId`  | `string`                  | Pengecam permintaan unik        |
| `model`      | `string`                  | Nama model yang diminta         |
| `provider`   | `string`                  | Pembekal sasaran ID             |
| `body`       | `Record<string, unknown>` | Badan permintaan                |
| `headers`    | `Record<string, string>`  | Permintaan tajuk (lihat nota)   |
| `metadata`   | `Record<string, unknown>` | Metadata boleh ubah             |
| `timestamp`  | `number`                  | Minta cap masa                  |
| `apiKeyInfo` | `object` (pilihan)        | metadata kunci API (lihat nota) |

Konteks tidak pernah membawa bukti kelayakan pelanggan: pengepala `authorization`, `x-api-key`, `proxy-authorization` dan `cookie` dialih keluar (sebarang selongsong) dan `apiKeyInfo` menyimpan metadata kunci (seperti `id`, `name` dan `scopes`) tetapi bukan nilai kunci atau cap jarinya (`redactPluginContext()` dalam `src/lib/plugins/hooks.ts`). Ini terpakai kepada `onRequest`, `onResponse` dan `onError`.

## Manifes (`plugin.json`)

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

### Keutamaan Cangkuk

Cangkuk boleh dikonfigurasikan dengan keutamaan (lebih rendah = dijalankan dahulu):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Atau sebagai nilai boolean ringkas (keutamaan lalai 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistem Kebenaran

Secara lalai pemalam adalah** bukan kotak pasir** . Setiap pemalam aktif berjalan sebagai proses anak Node.js biasa yang berasingan (`loadPlugin()` dalam `src/lib/plugins/loader.ts`) di bawah pengguna sistem pengendalian yang sama seperti OmniRoute, tanpa konteks VM dan tiada bendera kebenaran Node.js. Kod pemalam boleh menggunakan `node:fs`, `node:child_process`, `fetch` dan setiap Node.js API yang lain : ia boleh membaca dan menulis sebarang fail yang pengguna OmniRoute boleh (termasuk direktori data), menjalankan program dan mencapai rangkaian.

`requires.permissions` manifes menerima `network`, `file-read`, `file-write`, `env` dan `exec`. Dengan tetapan lalai hanya `env` mempunyai kesan pada masa jalan.

### Model kebenaran ikut serta (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Bendera ciri `PLUGIN_PERMISSION_MODEL_ENABLED` (kategori `security`,** dimatikan secara lalai** ) memulakan setiap proses pemalam dengan [model kebenaran Node.js](https://nodejs.org/api/permissions.html) (`--permission`, diterima oleh setiap baris Node.js yang disokong: 22.22 +, 24 dan 26). Bendera dibina daripada manifes oleh `buildPermissionModelArgs()` dalam `src/lib/plugins/permissionModel.ts`. Bendera dibaca apabila pemalam diaktifkan, jadi ia digunakan pada pemalam yang diaktifkan selepas perubahan; nyahaktifkan dan aktifkan pemalam yang sedang berjalan untuk menggunakannya.

Direktori data pemalam ialah `plugin-data/<plugin-name>` di sebelah akar pemalam (`~/.omniroute/plugin-data/<plugin-name>` secara lalai, `getPluginDataDir()`). Dengan bendera dihidupkan, laluannya dihantar ke pemalam sebagai `PLUGIN_DATA_DIR`.

| kebenaran    | Tandakan mati (lalai)                                                                                                                                                                                                                   | Benderakan dihidupkan                                                                                                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (tiada)      | Keistimewaan penuh pengguna OmniRoute.                                                                                                                                                                                                  | Fail dibaca hanya di dalam direktori pemalam. Tiada penulisan fail, tiada proses kanak-kanak, tiada benang pekerja, tiada tambahan asli, tiada WASI.                                                                                                                  |
| `env`        | Proses pemalam juga menerima `PORT`, `HOSTNAME`, `TZ` dan `TMPDIR`. Tanpanya, ia hanya menerima `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` dan `PLUGIN_NAME` (tambah `SystemRoot` dan `windir` pada Windows). | Sama seperti bendera dimatikan.                                                                                                                                                                                                                                       |
| `file-read`  | Tiada (pengisytiharan sahaja).                                                                                                                                                                                                          | Direktori data pemalam juga boleh dibaca (ia dibuat jika tiada).                                                                                                                                                                                                      |
| `file-write` | Tiada (pengisytiharan sahaja).                                                                                                                                                                                                          | Direktori data pemalam menjadi boleh dibaca dan boleh ditulis (`--allow-fs-write`). Tiada apa-apa lagi yang boleh ditulis.                                                                                                                                            |
| `exec`       | Tiada (pengisytiharan sahaja).                                                                                                                                                                                                          | Proses kanak-kanak dibenarkan (`--allow-child-process`). Node.js menghantar bendera kebenaran kepada proses Node.js kanak-kanak melalui `NODE_OPTIONS`, tetapi mana-mana program lain berjalan tanpa sekatan, jadi `exec` secara berkesan mengangkat had sistem fail. |
| `network`    | Tiada (pengisytiharan sahaja).                                                                                                                                                                                                          | tiada. Model kebenaran Node.js tidak menyekat akses rangkaian keluar, jadi `network` kekal sebagai pengisytiharan dan tidak pernah dikuatkuasakan.                                                                                                                    |

Menghidupkan bendera mematahkan pemalam yang membaca fail di luar direktori mereka sendiri (contohnya modul diselesaikan daripada induk `node_modules`), tulis di mana-mana kecuali direktori data mereka, atau menghasilkan proses tanpa mengisytiharkan `exec`. Walaupun dengan bendera pada pemalam mengekalkan akses rangkaian dan berjalan sebagai pengguna OmniRoute, jadi pasang hanya pemalam yang sumbernya anda percayai.

## Skema Konfigurasi

Takrifkan tetapan yang boleh dikonfigurasi dalam `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Kunci API luaran" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Jenis medan: `string`, `number`, `boolean`, `select`

Pilihan medan: `default`, `min`, `max`, `enum`, `description`

Nilai konfigurasi disimpan secara berterusan dalam pangkalan data dan boleh diakses melalui halaman konfigurasi papan pemuka.

## Peristiwa Terbina Dalam

| Peristiwa         | Bila                                        | Muatan                        |
| ----------------- | ------------------------------------------- | ----------------------------- |
| `onRequest`       | Sebelum pengendali sembang                  | Konteks permintaan            |
| `onResponse`      | Selepas pengendali sembang                  | Data respons                  |
| `onError`         | Apabila berlaku ralat pengendali            | Objek ralat                   |
| `onModelSelect`   | Model dipilih untuk penghalaan              | Maklumat model                |
| `onComboResolve`  | Penghalaan kombo diselesaikan               | Sasaran kombo                 |
| `onRateLimit`     | Had kadar dicapai                           | Maklumat had                  |
| `onQuotaExhaust`  | Kuota habis                                 | Maklumat kuota                |
| `onProviderError` | Penyedia mengembalikan ralat                | Butiran ralat                 |
| `onStreamStart`   | Strim SSE dimulakan                         | Maklumat strim                |
| `onStreamEnd`     | Strim SSE tamat                             | Statistik strim               |
| `onInstall`       | Pemalam dipasang                            | `{ name, version, manifest }` |
| `onActivate`      | Pemalam diaktifkan                          | `{ name, version, manifest }` |
| `onDeactivate`    | Pemalam dinyahaktifkan                      | `{ name, version, manifest }` |
| `onUninstall`     | Pemalam dinyahpasang (sebelum fail dipadam) | `{ name, version, manifest }` |

## Contoh

### Permintaan Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Penghad Kadar

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

### Pengubah Gerak Balas

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
