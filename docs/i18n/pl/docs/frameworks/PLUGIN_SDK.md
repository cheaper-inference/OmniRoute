# OmniRoute Plugin SDK (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Szybki start

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

## API Odniesienie

### `definePlugin(def: PluginDefinition): Plugin`

Funkcja fabryczna, która tworzy obiekt wtyczki z wartościami domyślnymi.

**Parametry:**

- `name` (string, wymagany) — Nazwa wtyczki w kebabie
- `priority` (liczba, opcjonalna, domyślnie: 100) — Najpierw działa dolna część
- `enabled` (wartość logiczna, opcjonalna, domyślnie: prawda) — Włączono opcję Start?
- `onRequest` (funkcja, opcjonalna) — Działa przed programem obsługi czatu
- `onResponse` (funkcja, opcjonalna) — Działa po programie obsługi czatu
- `onError` (funkcja, opcjonalna) — Działa w przypadku błędu procedury obsługi

### `blockRequest(response?): BlockingHookResult`

Zablokuj żądanie i opcjonalnie zwróć niestandardową odpowiedź.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Zmodyfikuj treść żądania, zanim dotrze ona do dostawcy.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Dołącz metadane do kontekstu żądania.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontekst wtyczki (`PluginContext`)

| Pole         | Typ                       | Opis                              |
| ------------ | ------------------------- | --------------------------------- |
| `requestId`  | `string`                  | Unikalny identyfikator żądania    |
| `model`      | `string`                  | Żądana nazwa modelu               |
| `provider`   | `string`                  | Dostawca docelowy ID              |
| `body`       | `Record<string, unknown>` | Treść żądania                     |
| `headers`    | `Record<string, string>`  | Nagłówki żądań (patrz uwaga)      |
| `metadata`   | `Record<string, unknown>` | Zmienne metadane                  |
| `timestamp`  | `number`                  | Poproś o sygnaturę czasową        |
| `apiKeyInfo` | `object` (opcjonalnie)    | metadane klucza API (patrz uwaga) |

Kontekst nigdy nie przenosi poświadczeń klienta: nagłówki `authorization`, `x-api-key`, `proxy-authorization` i `cookie` są usuwane (dowolna wielkość liter), a `apiKeyInfo` przechowuje metadane klucza (takie jak `id`, `name` i `scopes`), ale nie wartość klucza ani jego odcisk palca (`redactPluginContext()` w `src/lib/plugins/hooks.ts`). Dotyczy to `onRequest`, `onResponse` i `onError`.

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
    "apiKey": { "type": "string", "description": "API key for external service" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Priorytet haka

Hooki można skonfigurować z priorytetem (najpierw uruchamiane jest dolne = ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Lub jako proste wartości logiczne (domyślny priorytet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## System uprawnień

Domyślnie są to wtyczki** nie w piaskownicy** . Każda aktywna wtyczka działa jako oddzielny, zwykły proces potomny Node.js (`loadPlugin()` w `src/lib/plugins/loader.ts`) w ramach tego samego użytkownika systemu operacyjnego co OmniRoute, bez kontekstu VM i bez flag uprawnień Node.js. Kod wtyczki może używać `node:fs`, `node:child_process`, `fetch` i każdego innego Node.js API: może czytać i zapisywać dowolny plik, jaki może użytkownik OmniRoute (w tym katalog danych), uruchamiać programy i łączyć się z siecią.

`requires.permissions` manifestu akceptuje `network`, `file-read`, `file-write`, `env` i `exec`. Przy ustawieniach domyślnych tylko `env` ma wpływ na środowisko wykonawcze.

### Model uprawnień opt-in (`PLUGIN_PERMISSION_MODEL_ENABLED`)

Flaga funkcji `PLUGIN_PERMISSION_MODEL_ENABLED` (kategoria `security`,** domyślnie wyłączone** ) rozpoczyna każdy proces wtyczki z [modelem uprawnień Node.js](https://nodejs.org/api/permissions.html) (`--permission`, akceptowany przez każdą obsługiwaną linię Node.js : 22.22 +, 24 i 26). Flagi są budowane z manifestu przez `buildPermissionModelArgs()` w `src/lib/plugins/permissionModel.ts`. Flaga jest odczytywana w momencie aktywacji wtyczki, zatem dotyczy wtyczek aktywowanych po zmianie; dezaktywuj i aktywuj działającą wtyczkę, aby ją zastosować.

Katalog danych wtyczki to `plugin-data/<plugin-name>` obok katalogu głównego wtyczki (domyślnie `~/.omniroute/plugin-data/<plugin-name>`, `getPluginDataDir()`). Gdy flaga jest włączona, jej ścieżka jest przekazywana do wtyczki jako `PLUGIN_DATA_DIR`.

| Pozwolenie   | Flaga wyłączona (domyślnie)                                                                                                                                                                                                  | Flaga włączona                                                                                                                                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (nic)        | Pełne uprawnienia użytkownika OmniRoute.                                                                                                                                                                                     | Plik czyta się tylko w katalogu wtyczki. Żadnych zapisów plików, żadnych procesów potomnych, żadnych wątków roboczych, żadnych natywnych dodatków, żadnych WASI.                                                                                           |
| `env`        | Proces wtyczki otrzymuje także `PORT`, `HOSTNAME`, `TZ` i `TMPDIR`. Bez tego otrzymuje tylko `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` i `PLUGIN_NAME` (plus `SystemRoot` i `windir` na Windows). | To samo, co przy zdjętej flagi.                                                                                                                                                                                                                            |
| `file-read`  | Brak (tylko deklaracja).                                                                                                                                                                                                     | Katalog danych wtyczki również staje się czytelny (jest tworzony w przypadku jego braku).                                                                                                                                                                  |
| `file-write` | Brak (tylko deklaracja).                                                                                                                                                                                                     | Katalog danych wtyczki staje się czytelny i zapisywalny (`--allow-fs-write`). Nic innego nie da się zapisać.                                                                                                                                               |
| `exec`       | Brak (tylko deklaracja).                                                                                                                                                                                                     | Procesy potomne są dozwolone (`--allow-child-process`). Node.js przekazuje flagi uprawnień do potomnych procesów Node.js poprzez `NODE_OPTIONS`, ale każdy inny program działa bez ograniczeń, więc `exec` skutecznie podnosi ograniczenia systemu plików. |
| `network`    | Brak (tylko deklaracja).                                                                                                                                                                                                     | Nic. Model uprawnień Node.js nie ogranicza wychodzącego dostępu do sieci, więc `network` pozostaje deklaracją i nigdy nie jest wymuszane.                                                                                                                  |

Włączenie flagi powoduje przerwanie działania wtyczek, które czytają pliki poza ich własnym katalogiem (na przykład moduł wyodrębniony z nadrzędnego `node_modules`), zapisują gdziekolwiek poza swoim katalogiem danych lub uruchamiają procesy bez deklarowania `exec`. Nawet z flagą na wtyczce utrzymuje dostęp do sieci i działa jako użytkownik OmniRoute, więc instaluj tylko wtyczki, których źródła ufasz.

## Schemat konfiguracji

Zdefiniuj konfigurowalne ustawienia w `configSchema`:

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

Typy pól: `string`, `number`, `boolean`, `select`

Opcje pól: `default`, `min`, `max`, `enum`, `description`

Wartości konfiguracji są utrwalane w bazie danych i są dostępne za pośrednictwem strony konfiguracji pulpitu nawigacyjnego.

## Wbudowane zdarzenia

| Wydarzenie        | Gdy                                             | Ładunek                       |
| ----------------- | ----------------------------------------------- | ----------------------------- |
| `onRequest`       | Przed obsługą czatu                             | Kontekst żądania              |
| `onResponse`      | Po obsłudze czatu                               | Dane odpowiedzi               |
| `onError`         | W przypadku błędu obsługi                       | Obiekt błędu                  |
| `onModelSelect`   | Model wybrany do trasowania                     | Informacje o modelu           |
| `onComboResolve`  | Rozwiązano routing kombinowany                  | Cele kombinowane              |
| `onRateLimit`     | Osiągnięto limit stawki                         | Ogranicz informacje           |
| `onQuotaExhaust`  | Limit wyczerpany                                | Informacje o kwocie           |
| `onProviderError` | Dostawca zwrócił błąd                           | Szczegóły błędu               |
| `onStreamStart`   | Rozpoczęto transmisję SSE                       | Informacje o strumieniu       |
| `onStreamEnd`     | Strumień SSE zakończył się                      | Statystyki transmisji         |
| `onInstall`       | Wtyczka zainstalowana                           | `{ name, version, manifest }` |
| `onActivate`      | Wtyczka aktywowana                              | `{ name, version, manifest }` |
| `onDeactivate`    | Wtyczka dezaktywowana                           | `{ name, version, manifest }` |
| `onUninstall`     | Wtyczka odinstalowana (przed usunięciem plików) | `{ name, version, manifest }` |

## Przykłady

### Rejestrator żądań

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Ogranicznik szybkości

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

### Transformator odpowiedzi

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
