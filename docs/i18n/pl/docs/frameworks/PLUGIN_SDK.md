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

Wtyczki są** nie w piaskownicy** . Każda aktywna wtyczka działa jako oddzielny, zwykły proces potomny Node.js (`loadPlugin()` w `src/lib/plugins/loader.ts`) w ramach tego samego użytkownika systemu operacyjnego co OmniRoute, bez kontekstu VM i bez flag uprawnień Node.js. Kod wtyczki może używać `node:fs`, `node:child_process`, `fetch` i każdego innego Node.js API: może czytać i zapisywać dowolny plik, jaki może użytkownik OmniRoute (w tym katalog danych), uruchamiać programy i łączyć się z siecią.

`requires.permissions` manifestu akceptuje `network`, `file-read`, `file-write`, `env` i `exec`, ale obecnie tylko `env` ma wpływ w czasie wykonywania:

| Pozwolenie                                   | Efekt dzisiaj                                                                                                                                                                                                                |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Proces wtyczki otrzymuje także `PORT`, `HOSTNAME`, `TZ` i `TMPDIR`. Bez tego otrzymuje tylko `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` i `PLUGIN_NAME` (plus `SystemRoot` i `windir` na Windows). |
| `network`, `file-read`, `file-write`, `exec` | Nic. Są to jedynie deklaracje: w przypadku ich braku nic nie jest blokowane.                                                                                                                                                 |

Instalowanie wtyczki przypomina instalację dowolnego innego programu na hoście. Instaluj tylko wtyczki, których źródła ufasz.

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
