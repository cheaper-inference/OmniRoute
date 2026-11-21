# OmniRoute Plugin SDK (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Schnellstart

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

## API Referenz

### `definePlugin(def: PluginDefinition): Plugin`

Factory-Funktion, die ein Plugin-Objekt mit Standardwerten erstellt.

**Parameter:**

- `name` (Zeichenfolge, erforderlich) — Plugin-Name im Kebab-Fall
- `priority` (Zahl, optional, Standard: 100) — Lower wird zuerst ausgeführt
- `enabled` (boolean, optional, Standard: true) — Start aktiviert?
- `onRequest` (Funktion, optional) — Wird vor dem Chat-Handler ausgeführt
- `onResponse` (Funktion, optional) — Wird nach dem Chat-Handler ausgeführt
- `onError` (Funktion, optional) — Wird bei Handlerfehler ausgeführt

### `blockRequest(response?): BlockingHookResult`

Blockieren Sie die Anfrage und geben Sie optional eine benutzerdefinierte Antwort zurück.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Ändern Sie den Anforderungstext, bevor er den Anbieter erreicht.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Hängen Sie Metadaten an den Anforderungskontext an.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin-Kontext (`PluginContext`)

| Feld         | Typ                       | Beschreibung                            |
| ------------ | ------------------------- | --------------------------------------- |
| `requestId`  | `string`                  | Eindeutiger Anforderungsbezeichner      |
| `model`      | `string`                  | Angeforderter Modellname                |
| `provider`   | `string`                  | Zielanbieter ID                         |
| `body`       | `Record<string, unknown>` | Anforderungstext                        |
| `headers`    | `Record<string, string>`  | Anforderungsheader (siehe Hinweis)      |
| `metadata`   | `Record<string, unknown>` | Veränderbare Metadaten                  |
| `timestamp`  | `number`                  | Zeitstempel anfordern                   |
| `apiKeyInfo` | `object` (optional)       | API -Schlüsselmetadaten (siehe Hinweis) |

Der Kontext enthält niemals die Anmeldeinformationen des Clients: Die Header `authorization`, `x-api-key`, `proxy-authorization` und `cookie` werden entfernt (jede Groß-/Kleinschreibung), und `apiKeyInfo` behält die Metadaten des Schlüssels (z. B. `id`, `name` und `scopes`), jedoch nicht den Schlüsselwert oder seinen Fingerabdruck (`redactPluginContext()` in `src/lib/plugins/hooks.ts`). Dies gilt für `onRequest`, `onResponse` und `onError`.

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

### Hook-Priorität

Hooks können mit einer Priorität konfiguriert werden (niedriger = wird zuerst ausgeführt):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Oder als einfache boolesche Werte (Standardpriorität 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Berechtigungssystem

Standardmäßig sind Plugins vorhanden** nicht sandboxed** . Jedes aktive Plugin wird als separater, gewöhnlicher untergeordneter Node.js Prozess (`loadPlugin()` in `src/lib/plugins/loader.ts`) unter demselben Betriebssystembenutzer wie OmniRoute ausgeführt, ohne VM Kontext und ohne Node.js -Berechtigungsflags. Der Plugin-Code kann `node:fs`, `node:child_process`, `fetch` und jedes andere Node.js API verwenden: Er kann jede Datei lesen und schreiben, die der OmniRoute Benutzer lesen und schreiben kann (einschließlich des Datenverzeichnisses), Programme ausführen und das Netzwerk erreichen.

Das `requires.permissions` des Manifests akzeptiert `network`, `file-read`, `file-write`, `env` und `exec`. Mit den Standardeinstellungen hat zur Laufzeit nur `env` eine Auswirkung.

### Opt-in-Berechtigungsmodell (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Das `PLUGIN_PERMISSION_MODEL_ENABLED` -Feature-Flag (Kategorie `security`,** standardmäßig deaktiviert** ) startet jeden Plugin-Prozess mit dem [Node.js Berechtigungsmodell](https://nodejs.org/api/permissions.html) (`--permission`, akzeptiert von jeder unterstützten Node.js Zeile: 22.22 +, 24 und 26). Die Flags werden aus dem Manifest von `buildPermissionModelArgs()` in `src/lib/plugins/permissionModel.ts` erstellt. Das Flag wird gelesen, wenn ein Plugin aktiviert wird, es gilt also für Plugins, die nach der Änderung aktiviert wurden; Deaktivieren und aktivieren Sie ein laufendes Plugin, um es anzuwenden.

Das Plugin-Datenverzeichnis ist `plugin-data/<plugin-name>` neben dem Plugin-Stammverzeichnis (standardmäßig `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Wenn das Flag aktiviert ist, wird sein Pfad als `PLUGIN_DATA_DIR` an das Plugin übergeben.

| Erlaubnis    | Flag aus (Standard)                                                                                                                                                                                                                   | Flagge an                                                                                                                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (keiner)     | Volle Rechte des OmniRoute Benutzers.                                                                                                                                                                                                 | Die Datei kann nur im Plugin-Verzeichnis gelesen werden. Keine Dateischreibvorgänge, keine untergeordneten Prozesse, keine Arbeitsthreads, keine nativen Add-ons, kein WASI.                                                                                                             |
| `env`        | Der Plugin-Prozess empfängt auch `PORT`, `HOSTNAME`, `TZ` und `TMPDIR`. Ohne sie empfängt es nur `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` und `PLUGIN_NAME` (plus `SystemRoot` und `windir` auf Windows). | Dasselbe wie bei ausgeschalteter Flagge.                                                                                                                                                                                                                                                 |
| `file-read`  | Keine (nur Deklaration).                                                                                                                                                                                                              | Das Plugin-Datenverzeichnis wird ebenfalls lesbar (es wird erstellt, wenn es fehlt).                                                                                                                                                                                                     |
| `file-write` | Keine (nur Deklaration).                                                                                                                                                                                                              | Das Plugin-Datenverzeichnis wird lesbar und beschreibbar (`--allow-fs-write`). Nichts anderes ist beschreibbar.                                                                                                                                                                          |
| `exec`       | Keine (nur Deklaration).                                                                                                                                                                                                              | Untergeordnete Prozesse sind erlaubt (`--allow-child-process`). Node.js gibt die Berechtigungsflags über `NODE_OPTIONS` an untergeordnete Node.js -Prozesse weiter, aber jedes andere Programm läuft ohne Einschränkungen, sodass `exec` effektiv die Dateisystembeschränkungen aufhebt. |
| `network`    | Keine (nur Deklaration).                                                                                                                                                                                                              | Keiner. Das Node.js -Berechtigungsmodell schränkt den ausgehenden Netzwerkzugriff nicht ein, daher bleibt `network` eine Deklaration und wird niemals erzwungen.                                                                                                                         |

Wenn Sie das Flag aktivieren, werden Plugins unterbrochen, die Dateien außerhalb ihres eigenen Verzeichnisses lesen (z. B. ein Modul, das von einem übergeordneten `node_modules` aufgelöst wurde), irgendwo anders als in ihrem Datenverzeichnis schreiben oder Prozesse starten, ohne `exec` zu deklarieren. Auch wenn das Flag aktiviert ist, behält das Plugin den Netzwerkzugriff und wird als OmniRoute Benutzer ausgeführt. Installieren Sie daher nur Plugins, deren Quelle Sie vertrauen.

## Konfigurationsschema

Definieren Sie konfigurierbare Einstellungen in `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Externer API-Schlüssel" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Feldtypen: `string`, `number`, `boolean`, `select`

Feldoptionen: `default`, `min`, `max`, `enum`, `description`

Konfigurationswerte werden in der Datenbank gespeichert und sind über die Konfigurationsseite des Dashboards zugänglich.

## Integrierte Ereignisse

| Ereignis          | Zeitpunkt                                            | Nutzdaten                     |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | Vor dem Chat-Handler                                 | Anfragekontext                |
| `onResponse`      | Nach dem Chat-Handler                                | Antwortdaten                  |
| `onError`         | Bei einem Handler-Fehler                             | Fehlerobjekt                  |
| `onModelSelect`   | Modell für das Routing ausgewählt                    | Modellinformationen           |
| `onComboResolve`  | Kombinations-Routing aufgelöst                       | Kombinationsziele             |
| `onRateLimit`     | Ratenbegrenzung erreicht                             | Begrenzungsinformationen      |
| `onQuotaExhaust`  | Kontingent ausgeschöpft                              | Kontingentinformationen       |
| `onProviderError` | Anbieter hat einen Fehler zurückgegeben              | Fehlerdetails                 |
| `onStreamStart`   | SSE-Stream gestartet                                 | Stream-Informationen          |
| `onStreamEnd`     | SSE-Stream beendet                                   | Stream-Statistiken            |
| `onInstall`       | Plugin installiert                                   | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktiviert                                     | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deaktiviert                                   | `{ name, version, manifest }` |
| `onUninstall`     | Plugin deinstalliert (bevor Dateien gelöscht werden) | `{ name, version, manifest }` |

## Beispiele

### Logger anfordern

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Ratenbegrenzer

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

### Antworttransformator

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
