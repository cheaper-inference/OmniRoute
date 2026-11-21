# OmniRoute Plugin SDK (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Γρήγορη εκκίνηση

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

## API Αναφορά

### `definePlugin(def: PluginDefinition): Plugin`

Εργοστασιακή λειτουργία που δημιουργεί ένα αντικείμενο Plugin με προεπιλογές.

**Παράμετροι:**

- `name` (string, απαιτείται) — Όνομα πρόσθετου σε θήκη κεμπάπ
- `priority` (αριθμός, προαιρετικό, προεπιλογή: 100) — Το Lower εκτελείται πρώτα
- `enabled` (boolean, προαιρετικό, προεπιλογή: true) — Ενεργοποιήθηκε η έναρξη;
- `onRequest` (συνάρτηση, προαιρετικό) — Εκτελείται πριν από το πρόγραμμα χειρισμού συνομιλίας
- `onResponse` (συνάρτηση, προαιρετικό) — Εκτελείται μετά το πρόγραμμα χειρισμού συνομιλίας
- `onError` (συνάρτηση, προαιρετικό) — Εκτελείται με σφάλμα χειριστή

### `blockRequest(response?): BlockingHookResult`

Αποκλείστε το αίτημα και προαιρετικά επιστρέψτε μια προσαρμοσμένη απάντηση.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Τροποποιήστε το σώμα του αιτήματος πριν φτάσει στον πάροχο.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Επισυνάψτε μεταδεδομένα στο πλαίσιο αιτήματος.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Πλαίσιο προσθήκης (`PluginContext`)

| Πεδίο        | Τύπος                     | Περιγραφή                                |
| ------------ | ------------------------- | ---------------------------------------- |
| `requestId`  | `string`                  | Μοναδικό αναγνωριστικό αιτήματος         |
| `model`      | `string`                  | Ζητήθηκε όνομα μοντέλου                  |
| `provider`   | `string`                  | Στόχος πάροχος ID                        |
| `body`       | `Record<string, unknown>` | Σώμα αιτήματος                           |
| `headers`    | `Record<string, string>`  | Κεφαλίδες αιτημάτων (βλ. σημείωση)       |
| `metadata`   | `Record<string, unknown>` | Μεταβλητά μεταδεδομένα                   |
| `timestamp`  | `number`                  | Ζητήστε χρονική σήμανση                  |
| `apiKeyInfo` | `object` (προαιρετικό)    | Μεταδεδομένα κλειδιού API (βλ. σημείωση) |

Το περιβάλλον δεν φέρει ποτέ τα διαπιστευτήρια του πελάτη: οι κεφαλίδες `authorization`, `x-api-key`, `proxy-authorization` και `cookie` αφαιρούνται (οποιοδήποτε περίβλημα) και το `apiKeyInfo` διατηρεί τα μεταδεδομένα του κλειδιού (όπως `id`, `name` και `scopes`) αλλά όχι την τιμή κλειδιού ή το δακτυλικό του αποτύπωμα (`redactPluginContext()` σε `src/lib/plugins/hooks.ts`). Αυτό ισχύει για `onRequest`, `onResponse` και `onError`.

## Δηλωτικό αρχείο (`plugin.json`)

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

### Προτεραιότητα Hook

Τα hooks μπορούν να διαμορφωθούν με προτεραιότητα (χαμηλότερη τιμή = εκτελείται πρώτο):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ή ως απλές δυαδικές τιμές (προεπιλεγμένη προτεραιότητα 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Σύστημα αδειών

Τα πρόσθετα είναι** δεν έχει άμμο** . Κάθε ενεργό πρόσθετο εκτελείται ως ξεχωριστή, συνηθισμένη θυγατρική διεργασία Node.js (`loadPlugin()` σε `src/lib/plugins/loader.ts`) στον ίδιο χρήστη λειτουργικού συστήματος με OmniRoute, χωρίς πλαίσιο VM και σημαίες άδειας Node.js. Ο κώδικας προσθήκης μπορεί να χρησιμοποιεί `node:fs`, `node:child_process`, `fetch` και κάθε άλλο Node.js API: μπορεί να διαβάσει και να γράψει οποιοδήποτε αρχείο μπορεί ο χρήστης OmniRoute (συμπεριλαμβανομένου του καταλόγου δεδομένων), να εκτελέσει προγράμματα και να φτάσει στο δίκτυο.

Το `requires.permissions` του μανιφέστου δέχεται `network`, `file-read`, `file-write`, `env` και `exec`, αλλά σήμερα μόνο `env` έχει αποτέλεσμα κατά το χρόνο εκτέλεσης:

| Αδεια                                        | Επίδραση σήμερα                                                                                                                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Η διαδικασία προσθήκης λαμβάνει επίσης `PORT`, `HOSTNAME`, `TZ` και `TMPDIR`. Χωρίς αυτό, λαμβάνει μόνο `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` και `PLUGIN_NAME` (συν `SystemRoot` και `windir` στο Windows). |
| `network`, `file-read`, `file-write`, `exec` | Κανένας. Είναι μόνο δηλώσεις: τίποτα δεν μπλοκάρεται όταν λείπουν.                                                                                                                                                                          |

Η εγκατάσταση ενός πρόσθετου είναι σαν να εγκαθιστάτε οποιοδήποτε άλλο πρόγραμμα στον κεντρικό υπολογιστή. Εγκαταστήστε μόνο προσθήκες των οποίων την πηγή εμπιστεύεστε.

## Σχήμα Ρυθμίσεων

Ορίστε τις παραμετροποιήσιμες ρυθμίσεις στο `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Κλειδί εξωτερικού API" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Τύποι πεδίων: `string`, `number`, `boolean`, `select`

Επιλογές πεδίων: `default`, `min`, `max`, `enum`, `description`

Οι τιμές των ρυθμίσεων αποθηκεύονται στη βάση δεδομένων και είναι προσβάσιμες μέσω της σελίδας ρυθμίσεων του πίνακα ελέγχου.

## Ενσωματωμένα Συμβάντα

| Συμβάν            | Πότε                                                   | Ωφέλιμο φορτίο                |
| ----------------- | ------------------------------------------------------ | ----------------------------- |
| `onRequest`       | Πριν από τον χειριστή συνομιλίας                       | Περιβάλλον αιτήματος          |
| `onResponse`      | Μετά τον χειριστή συνομιλίας                           | Δεδομένα απόκρισης            |
| `onError`         | Σε περίπτωση σφάλματος του χειριστή                    | Αντικείμενο σφάλματος         |
| `onModelSelect`   | Επιλέγεται μοντέλο για δρομολόγηση                     | Πληροφορίες μοντέλου          |
| `onComboResolve`  | Επιλύεται η συνδυαστική δρομολόγηση                    | Προορισμοί συνδυασμού         |
| `onRateLimit`     | Συμπληρώνεται το όριο ρυθμού                           | Πληροφορίες ορίου             |
| `onQuotaExhaust`  | Εξαντλείται το όριο χρήσης                             | Πληροφορίες ορίου χρήσης      |
| `onProviderError` | Ο πάροχος επιστρέφει σφάλμα                            | Λεπτομέρειες σφάλματος        |
| `onStreamStart`   | Ξεκινά η ροή SSE                                       | Πληροφορίες ροής              |
| `onStreamEnd`     | Τερματίζεται η ροή SSE                                 | Στατιστικά ροής               |
| `onInstall`       | Εγκαθίσταται το πρόσθετο                               | `{ name, version, manifest }` |
| `onActivate`      | Ενεργοποιείται το πρόσθετο                             | `{ name, version, manifest }` |
| `onDeactivate`    | Απενεργοποιείται το πρόσθετο                           | `{ name, version, manifest }` |
| `onUninstall`     | Απεγκαθίσταται το πρόσθετο (πριν διαγραφούν τα αρχεία) | `{ name, version, manifest }` |

## Παραδείγματα

### Καταγραφικό αιτήματος

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Rate Limiter

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

### Μετασχηματιστής απόκρισης

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
