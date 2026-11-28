# OmniRoute Plugin SDK (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Hızlı Başlangıç

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

## API Referansı

### `definePlugin(def: PluginDefinition): Plugin`

Varsayılanlara sahip bir Eklenti nesnesi oluşturan fabrika işlevi.

**Parametreler:**

- `name` (string, gerekli) — Kebab durumunda eklenti adı
- `priority` (sayı, isteğe bağlı, varsayılan: 100) — Önce alt çalıştırma
- `enabled` (boolean, isteğe bağlı, varsayılan: doğru) — Başlatma etkin mi?
- `onRequest` (işlev, isteğe bağlı) — Sohbet işleyicisinden önce çalışır
- `onResponse` (işlev, isteğe bağlı) — Sohbet işleyicisinden sonra çalışır
- `onError` (işlev, isteğe bağlı) — İşleyici hatası durumunda çalışır

### `blockRequest(response?): BlockingHookResult`

İsteği engelleyin ve isteğe bağlı olarak özel bir yanıt döndürün.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Sağlayıcıya ulaşmadan önce istek gövdesini değiştirin.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Meta verileri istek bağlamına ekleyin.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Eklenti İçeriği (`PluginContext`)

| Alan         | Tip                       | Tanım                                  |
| ------------ | ------------------------- | -------------------------------------- |
| `requestId`  | `string`                  | Benzersiz istek tanımlayıcı            |
| `model`      | `string`                  | İstenen model adı                      |
| `provider`   | `string`                  | Hedef sağlayıcı ID                     |
| `body`       | `Record<string, unknown>` | Talep gövdesi                          |
| `headers`    | `Record<string, string>`  | İstek başlıkları (nota bakın)          |
| `metadata`   | `Record<string, unknown>` | Değiştirilebilir meta veriler          |
| `timestamp`  | `number`                  | Zaman damgası iste                     |
| `apiKeyInfo` | `object` (isteğe bağlı)   | API anahtar meta verileri (nota bakın) |

Bağlam hiçbir zaman müşterinin kimlik bilgilerini taşımaz: `authorization`, `x-api-key`, `proxy-authorization` ve `cookie` başlıkları kaldırılır (herhangi bir büyük harf) ve `apiKeyInfo` anahtarın meta verilerini ( `id`, `name` ve `scopes` gibi) tutar, ancak anahtar değerini veya parmak izini ( `src/lib/plugins/hooks.ts` içindeki `redactPluginContext()` ) tutmaz. Bu `onRequest`, `onResponse` ve `onError` için geçerlidir.

## Manifest (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Örnek bir eklenti",
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
      "description": "Harici hizmet için API anahtarı"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Hook Önceliği

Hook'lar öncelik değeriyle yapılandırılabilir (daha düşük = önce çalışır):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ya da basit boolean değerleri olarak yapılandırılabilir (varsayılan öncelik 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## İzin Sistemi

Varsayılan olarak eklentiler** korumalı alana alınmamış** . Her etkin eklenti, OmniRoute ile aynı işletim sistemi kullanıcısı altında, VM bağlamı ve Node.js izin işaretleri olmadan, ayrı, sıradan bir Node.js alt süreci ( `src/lib/plugins/loader.ts` `loadPlugin()` ) olarak çalışır. Eklenti kodu `node:fs`, `node:child_process`, `fetch` ve diğer tüm Node.js API kullanabilir: OmniRoute kullanıcısının (veri dizini dahil) yapabileceği herhangi bir dosyayı okuyabilir ve yazabilir, programları çalıştırabilir ve ağa erişebilir.

Manifest'in `requires.permissions` `network`, `file-read`, `file-write`, `env` ve `exec` kabul eder. Varsayılan ayarlarla yalnızca `env` çalışma zamanında etkisi vardır.

### Etkinleştirme izni modeli (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` özellik bayrağı ( `security` kategorisi,** varsayılan olarak kapalı** ) her eklenti sürecini [Node.js izin modeliyle](https://nodejs.org/api/permissions.html) başlatır (`--permission`, desteklenen her Node.js satırı tarafından kabul edilir: 22.22 +, 24 ve 26). Bayraklar, `src/lib/plugins/permissionModel.ts` içindeki `buildPermissionModelArgs()` tarafından manifestten oluşturulmuştur. Bayrak, bir eklenti etkinleştirildiğinde okunur, dolayısıyla değişiklikten sonra etkinleştirilen eklentiler için geçerlidir; Uygulamak için çalışan bir eklentiyi devre dışı bırakın ve etkinleştirin.

Eklenti veri dizini, eklenti kökünün yanındaki `plugin-data/<plugin-name>` (varsayılan olarak `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Bayrak açıkken yolu eklentiye `PLUGIN_DATA_DIR` olarak aktarılır.

| İzin         | Bayrak kapalı (varsayılan)                                                                                                                                                                                                         | Bayrak açık                                                                                                                                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (hiçbiri)    | OmniRoute kullanıcısının tam ayrıcalıkları.                                                                                                                                                                                        | Dosya yalnızca eklenti dizininin içinde okunur. Dosya yazma yok, alt süreç yok, çalışan iş parçacığı yok, yerel eklenti yok, WASI yok.                                                                                                                                 |
| `env`        | Eklenti işlemi aynı zamanda `PORT`, `HOSTNAME`, `TZ` ve `TMPDIR` de alır. Bu olmadan yalnızca `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` ve `PLUGIN_NAME` (artı Windows `SystemRoot` ve `windir` ) alır. | Bayrağın kapalı olmasıyla aynı.                                                                                                                                                                                                                                        |
| `file-read`  | Yok (yalnızca beyan).                                                                                                                                                                                                              | Eklenti veri dizini de okunabilir hale gelir (eksikse oluşturulur).                                                                                                                                                                                                    |
| `file-write` | Yok (yalnızca beyan).                                                                                                                                                                                                              | Eklenti veri dizini okunabilir ve yazılabilir hale gelir (`--allow-fs-write`). Başka hiçbir şey yazılamaz.                                                                                                                                                             |
| `exec`       | Yok (yalnızca beyan).                                                                                                                                                                                                              | Alt işlemlere izin verilir (`--allow-child-process`). Node.js izin işaretlerini `NODE_OPTIONS` aracılığıyla alt Node.js işlemlerine iletir, ancak diğer programlar kısıtlama olmadan çalışır, bu nedenle `exec` dosya sistemi sınırlarını etkili bir şekilde kaldırır. |
| `network`    | Yok (yalnızca beyan).                                                                                                                                                                                                              | Hiçbiri. Node.js izin modeli giden ağ erişimini kısıtlamaz, dolayısıyla `network` bir bildirim olarak kalır ve hiçbir zaman uygulanmaz.                                                                                                                                |

Kendi dizinleri dışındaki dosyaları okuyan (örneğin `node_modules` üst öğesinden çözümlenen bir modül), kendi veri dizinleri dışında herhangi bir yere yazan veya `exec` bildiriminde bulunmadan süreçleri oluşturan eklentileri devre dışı bırakma bayrağını açmak. Eklenti üzerindeki işaret olsa bile ağ erişimini korur ve OmniRoute kullanıcısı olarak çalışır, bu nedenle yalnızca kaynağına güvendiğiniz eklentileri yükleyin.

## Yapılandırma Şeması

Yapılandırılabilir ayarları `configSchema` içinde tanımlayın:

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

Alan türleri: `string`, `number`, `boolean`, `select`

Alan seçenekleri: `default`, `min`, `max`, `enum`, `description`

Yapılandırma değerleri veritabanında kalıcı olarak saklanır ve kontrol panelindeki yapılandırma sayfası üzerinden erişilebilir.

## Yerleşik Olaylar

| Olay              | Ne Zaman                                           | Yük                           |
| ----------------- | -------------------------------------------------- | ----------------------------- |
| `onRequest`       | Sohbet işleyicisinden önce                         | İstek bağlamı                 |
| `onResponse`      | Sohbet işleyicisinden sonra                        | Yanıt verileri                |
| `onError`         | İşleyici hatasında                                 | Hata nesnesi                  |
| `onModelSelect`   | Yönlendirme için model seçildiğinde                | Model bilgileri               |
| `onComboResolve`  | Birleşik yönlendirme çözümlendiğinde               | Birleşik hedefler             |
| `onRateLimit`     | Hız sınırına ulaşıldığında                         | Sınır bilgileri               |
| `onQuotaExhaust`  | Kota tükendiğinde                                  | Kota bilgileri                |
| `onProviderError` | Sağlayıcı hata döndürdüğünde                       | Hata ayrıntıları              |
| `onStreamStart`   | SSE akışı başladığında                             | Akış bilgileri                |
| `onStreamEnd`     | SSE akışı sona erdiğinde                           | Akış istatistikleri           |
| `onInstall`       | Eklenti yüklendiğinde                              | `{ name, version, manifest }` |
| `onActivate`      | Eklenti etkinleştirildiğinde                       | `{ name, version, manifest }` |
| `onDeactivate`    | Eklenti devre dışı bırakıldığında                  | `{ name, version, manifest }` |
| `onUninstall`     | Eklenti kaldırıldığında (dosyalar silinmeden önce) | `{ name, version, manifest }` |

## Örnekler

### Talep Kaydedici

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Hız Sınırlayıcı

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

### Tepki Transformatörü

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
