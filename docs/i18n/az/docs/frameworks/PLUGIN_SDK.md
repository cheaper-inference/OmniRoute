# OmniRoute Plugin SDK (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Tez Başlanğıc

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

## API İstinad

### `definePlugin(def: PluginDefinition): Plugin`

Defoltlarla Plugin obyekti yaradan zavod funksiyası.

**Parametrlər:**

- `name` (string, tələb olunur) — Kabab qutusunda plagin adı
- `priority` (nömrə, isteğe bağlı, defolt: 100) — Aşağı birinci çalışır
- `enabled` (boolean, isteğe bağlı, defolt: doğru) — Start aktivdir?
- `onRequest` (funksiya, isteğe bağlı) — Çat işləyicisindən əvvəl işləyir
- `onResponse` (funksiya, isteğe bağlı) — Söhbət idarəedicisindən sonra işləyir
- `onError` (funksiya, isteğe bağlı) — İşləyici xətası üzərində işləyir

### `blockRequest(response?): BlockingHookResult`

Sorğunu bloklayın və istəyə görə fərdi cavab qaytarın.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Sorğu orqanını provayderə çatmazdan əvvəl dəyişdirin.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Sorğu kontekstinə metadata əlavə edin.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin konteksti (`PluginContext`)

| Sahə         | Növ                       | Təsvir                              |
| ------------ | ------------------------- | ----------------------------------- |
| `requestId`  | `string`                  | Unikal sorğu identifikatoru         |
| `model`      | `string`                  | İstənilən model adı                 |
| `provider`   | `string`                  | Hədəf provayder ID                  |
| `body`       | `Record<string, unknown>` | Sorğu orqanı                        |
| `headers`    | `Record<string, string>`  | Başlıqları tələb edin (qeydə baxın) |
| `metadata`   | `Record<string, unknown>` | Dəyişən metadata                    |
| `timestamp`  | `number`                  | Vaxt möhürü tələb edin              |
| `apiKeyInfo` | `object` (isteğe bağlı)   | API açar metadata (qeydə baxın)     |

Kontekst heç vaxt müştərinin etimadnaməsini daşımır: `authorization`, `x-api-key`, `proxy-authorization` və `cookie` başlıqları silinir (istənilən korpus) və `apiKeyInfo` açarın metadatasını ( `id`, `name` və `scopes` kimi) saxlayır, lakin açar dəyərini və ya onun barmaq izini (`redactPluginContext()` -də `src/lib/plugins/hooks.ts`) deyil. Bu `onRequest`, `onResponse` və `onError` ə aiddir .

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

### Hook prioriteti

Hook-lar prioritetlə konfiqurasiya edilə bilər (daha aşağı = əvvəl icra olunur):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Yaxud sadə boolean dəyərləri kimi (standart prioritet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## İcazə sistemi

Varsayılan olaraq plaginlərdir** sandboxed deyil** . Hər bir aktiv plagin ayrıca, adi Node.js uşaq prosesi ( `src/lib/plugins/loader.ts`-də `loadPlugin()` ) kimi OmniRoute ilə eyni əməliyyat sistemi istifadəçisi altında, VM konteksti və Node.js icazə bayraqları olmadan işləyir. Plugin kodu `node:fs`, `node:child_process`, `fetch` və hər hansı digər Node.js API istifadə edə bilər: o, OmniRoute istifadəçisinin (məlumat kataloqu daxil olmaqla) edə biləcəyi istənilən faylı oxuya və yaza bilər, proqramları işlədə və şəbəkəyə daxil ola bilər.

Manifestin `requires.permissions` `network`, `file-read`, `file-write`, `env` və `exec` qəbul edir. Varsayılan parametrlərlə yalnız `env` işləmə zamanı təsir göstərir.

### Daxil olmaq icazə modeli (`PLUGIN_PERMISSION_MODEL_ENABLED`)

`PLUGIN_PERMISSION_MODEL_ENABLED` xüsusiyyət bayrağı (kateqoriya `security`,** default olaraq söndürülür** ) hər bir plagin prosesini [Node.js icazə modeli](https://nodejs.org/api/permissions.html) ilə başlayır (`--permission`, hər dəstəklənən Node.js xətti tərəfindən qəbul edilir: 22.22 +, 24 və 26). Bayraqlar `src/lib/plugins/permissionModel.ts`-də `buildPermissionModelArgs()` tərəfindən manifestdən tikilir. Plugin aktivləşdirildikdə bayraq oxunur, ona görə də dəyişiklikdən sonra aktivləşdirilmiş plaginlərə şamil edilir; onu tətbiq etmək üçün işləyən plaqini deaktiv edin və aktivləşdirin.

Plugin məlumat kataloqu plagin kökünün yanında `plugin-data/<plugin-name>` (defolt olaraq `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Bayraq açıq olduqda onun yolu `PLUGIN_DATA_DIR` olaraq plaginə ötürülür.

| İcazə        | Bayraq deaktivdir (defolt)                                                                                                                                                                                                          | Bayraq                                                                                                                                                                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (heç biri)   | OmniRoute istifadəçisinin tam imtiyazları.                                                                                                                                                                                          | Fayl yalnız plugin qovluğunda oxunur. Heç bir fayl yazılmır, uşaq prosesləri yoxdur, işçi mövzuları yoxdur, yerli əlavələr yoxdur, WASI yoxdur.                                                                                                                                      |
| `env`        | Plugin prosesi həmçinin `PORT`, `HOSTNAME`, `TZ` və `TMPDIR` qəbul edir . Onsuz o, yalnız `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` və `PLUGIN_NAME` ( Windows üzərində `SystemRoot` və `windir` ) alır. | Bayraq söndükdə olduğu kimi.                                                                                                                                                                                                                                                         |
| `file-read`  | Yoxdur (yalnız bəyannamə).                                                                                                                                                                                                          | Plugin məlumat kataloqu da oxunaqlı olur (itkin olduqda yaradılır).                                                                                                                                                                                                                  |
| `file-write` | Yoxdur (yalnız bəyannamə).                                                                                                                                                                                                          | Plugin məlumat kataloqu oxunaqlı və yazıla bilən olur (`--allow-fs-write`). Başqa heç nə yazıla bilməz.                                                                                                                                                                              |
| `exec`       | Yoxdur (yalnız bəyannamə).                                                                                                                                                                                                          | Uşaq proseslərinə icazə verilir (`--allow-child-process`). Node.js icazə bayraqlarını uşaq Node.js proseslərinə `NODE_OPTIONS` vasitəsilə ötürür, lakin hər hansı digər proqram məhdudiyyətsiz işləyir, ona görə də `exec` fayl sistemi məhdudiyyətlərini effektiv şəkildə qaldırır. |
| `network`    | Yoxdur (yalnız bəyannamə).                                                                                                                                                                                                          | Heç biri. Node.js icazə modeli gedən şəbəkəyə girişi məhdudlaşdırmır, ona görə də `network` bəyannamə olaraq qalır və heç vaxt tətbiq edilmir.                                                                                                                                       |

Bayrağın yandırılması faylları öz kataloqundan kənarda oxuyan (məsələn, ana `node_modules` dan həll olunan modul), onların məlumat kataloqundan başqa hər hansı yerə yazan və ya `exec` elan etmədən prosesləri yaradan plaginləri pozur. Plugin üzərindəki bayraq olsa belə, şəbəkəyə girişi saxlayır və OmniRoute istifadəçisi kimi işləyir, ona görə də yalnız mənbəsinə etibar etdiyiniz plaginləri quraşdırın.

## Konfiqurasiya Sxemi

Konfiqurasiya edilə bilən parametrləri `configSchema` daxilində müəyyənləşdirin:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Xarici API açarı" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Sahə növləri: `string`, `number`, `boolean`, `select`

Sahə seçimləri: `default`, `min`, `max`, `enum`, `description`

Konfiqurasiya dəyərləri verilənlər bazasında saxlanılır və idarəetmə panelinin konfiqurasiya səhifəsi vasitəsilə əlçatandır.

## Daxili Hadisələr

| Hadisə            | Nə zaman                                      | Faydalı yük                   |
| ----------------- | --------------------------------------------- | ----------------------------- |
| `onRequest`       | Çat emalçısından əvvəl                        | Sorğu konteksti               |
| `onResponse`      | Çat emalçısından sonra                        | Cavab məlumatları             |
| `onError`         | Emalçı xətası zamanı                          | Xəta obyekti                  |
| `onModelSelect`   | Marşrutlaşdırma üçün model seçildikdə         | Model məlumatları             |
| `onComboResolve`  | Kombinə edilmiş marşrut həll edildikdə        | Kombinasiya hədəfləri         |
| `onRateLimit`     | Tezlik limitinə çatdıqda                      | Limit məlumatları             |
| `onQuotaExhaust`  | Kvota tükəndikdə                              | Kvota məlumatları             |
| `onProviderError` | Provayder xəta qaytardıqda                    | Xəta təfərrüatları            |
| `onStreamStart`   | SSE axını başladıqda                          | Axın məlumatları              |
| `onStreamEnd`     | SSE axını bitdikdə                            | Axın statistikası             |
| `onInstall`       | Plagin quraşdırıldıqda                        | `{ name, version, manifest }` |
| `onActivate`      | Plagin aktivləşdirildikdə                     | `{ name, version, manifest }` |
| `onDeactivate`    | Plagin deaktivləşdirildikdə                   | `{ name, version, manifest }` |
| `onUninstall`     | Plagin silindikdə (fayllar silinməzdən əvvəl) | `{ name, version, manifest }` |

## Nümunələr

### Sorğu Qeydiyyatçısı

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Məzənnə Limiteri

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

### Cavab transformatoru

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
