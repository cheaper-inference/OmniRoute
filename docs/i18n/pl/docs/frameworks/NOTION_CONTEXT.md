# Notion Context Source (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

title: "Źródło kontekstu Notion"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Źródło kontekstu Notion

> **Source of truth:** `src/lib/notion/api.ts` (klient REST), `src/lib/db/notion.ts`
> (trwałość tokenu), `open-sse/mcp-server/tools/notionTools.ts` (6 narzędzi MCP),
> `src/app/api/settings/notion/route.ts` (API ustawień). Rejestracja narzędzi i podłączenie
> scope'ów znajdują się w `open-sse/mcp-server/server.ts`.

## Czym to jest

OmniRoute może połączyć się z workspace'em **Notion** jako **źródłem kontekstu** — bazą
wiedzy do odczytu i zapisu, do której agenci docierają przez wbudowany serwer MCP. Po
skonfigurowaniu tokenu integracji Notion narzędzia MCP pozwalają LLM wyszukiwać strony
i bazy danych, czytać treść stron i drzewa bloków, odpytywać bazy z filtrami/sortowaniem
oraz dopisywać nowe bloki — wszystko proksowane przez OmniRoute (z retry, timeoutem
i klasyfikacją błędów), dzięki czemu model nigdy nie wywołuje Notion API bezpośrednio.

Integracja to cienka, utwardzona nakładka na oficjalne Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klient
(`src/lib/notion/api.ts`) dodaje:

- **Retry z exponential backoff** (do 3 prób) dla `429` i `5xx`.
- **55-sekundowy request timeout** przez `AbortController`.
- **Typowaną klasyfikację błędów** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, honoruje wskazówki
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanityzację komunikatów**, która usuwa fragmenty przypominające stack trace przed
  ich ujawnieniem.

## Konfiguracja

**Nie ma zmiennej środowiskowej** na token Notion — jest przechowywany w tabeli
SQLite `key_value` (namespace `notion`, klucz `integration_token`) przez
`src/lib/db/notion.ts`. Skonfiguruj go w zakładce **Context Sources** dashboardu
Endpoint (`NotionSourceCard` — odpowiednik `ObsidianSourceCard`) albo przez REST API
ustawień.

> [!NOTE]
> Token to **Notion internal integration token**. Utwórz integrację pod
> <https://www.notion.com/my-integrations>, a następnie udostępnij tej integracji
> strony/bazy, do których OmniRoute ma mieć dostęp (model uprawnień Notion opiera się
> na udostępnianiu, a nie na dostępie do całego workspace'u).

### Konfiguracja przez REST

```bash
# Save + validate the integration token (POST validates by issuing a test search)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Check connection status
curl http://localhost:20128/api/settings/notion

# Disconnect (clears the stored token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Wszystkie trzy metody wymagają uwierzytelnienia dashboardu (`isAuthenticated`). Przy
`POST` OmniRoute zapisuje token i od razu wykonuje testowe wyszukiwanie z 1 wynikiem;
jeśli Notion zwróci obiekt błędu, token jest czyszczony, a wywołanie kończy się
`400`.

## narzędzia MCP (6)

Zdefiniowane w `open-sse/mcp-server/tools/notionTools.ts`. Token jest rozwiązywany w czasie połączenia poprzez `getNotionToken()`; jeśli żaden nie jest skonfigurowany, narzędzie zgłasza `"Notion integration token not configured. Set it in Settings > Context Sources."`

| Narzędzie                    | Zakres         | Opis                                                                                                   |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Przeszukuj strony i bazy danych za pomocą zapytania tekstowego (zwraca tytuły, IDs, URLs). Paginowane. |
| `notion_get_page`            | `read:notion`  | Pobierz treść i metadane strony poprzez jej ID.                                                        |
| `notion_list_block_children` | `read:notion`  | Lista wszystkich bloków potomnych bloku lub strony (drzewo bloków). Paginowane.                        |
| `notion_query_database`      | `read:notion`  | Zapytanie do bazy danych za pomocą opcjonalnego `filter` + `sorts` (format Notion API ). Paginowane.   |
| `notion_get_database`        | `read:notion`  | Pobierz schema/metadata bazy danych przez ID.                                                          |
| `notion_append_blocks`       | `write:notion` | Dołącz elementy podrzędne bloku do istniejącego bloku lub strony (maksymalnie 100 bloków na żądanie).  |

### Parametry wejściowe

- `notion_search` — `query` (1–500 znaków), `pageSize` (1–100, domyślnie 20), `startCursor` (opcjonalnie).
- `notion_get_page` — `pageId` (32 znaki szesnastkowe lub UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, domyślnie 50), `startCursor` (opcjonalnie).
- `notion_query_database` — `databaseId`, `filter` (opcjonalnie, format filtra Notion ), `sorts` (tablica opcjonalna), `pageSize` (1–100, domyślnie 50), `startCursor` (opcjonalnie).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (tablica obiektów blokowych), `after` (opcjonalna pozycja).

### Zakresy

Narzędzia do odczytu wymagają `read:notion`, a narzędzie do zapisu wymaga `write:notion`. Zakresy są wymuszane przez `withScopeEnforcement()` w `open-sse/mcp-server/server.ts`, gdy `OMNIROUTE_MCP_ENFORCE_SCOPES=true` i zawsze dla osoby wywołującej HTTP/SSE, której klucz API nie zawiera `manage`/`admin`; dozwolone zakresy wywołującego pochodzą z `OMNIROUTE_MCP_SCOPES` (oddzielone przecinkami) lub kontekstu zasięgu uwierzytelnionego klucza API. Zobacz [MCP-SERVER.md](./MCP-SERVER.md), aby zapoznać się z modelem o pełnym zakresie.

## Endpointy

| Method   | Path                   | Purpose                               |
| -------- | ---------------------- | ------------------------------------- |
| `GET`    | `/api/settings/notion` | Zwraca `{ connected, hasToken }`.     |
| `POST`   | `/api/settings/notion` | Zapisuje i waliduje token integracji. |
| `DELETE` | `/api/settings/notion` | Rozłącza (czyści zapisany token).     |

> To są trasy ustawień dashboardu. **Nie ma publicznego endpointu proxy Notion pod
> `/v1`** — do Notion dociera się wyłącznie przez powyższe narzędzia MCP.

## Przypadki użycia

- **Odpowiedzi oparte na wiedzy** — agent robi `notion_search` w workspace i
  `notion_get_page` na najlepszym trafieniu przed odpowiedzią, żeby cytować realne
  wewnętrzne dokumenty.
- **Workflowy oparte na bazach** — `notion_query_database` na bazie tasks/CRM z
  filtrami + sortami, potem podsumowanie lub triaż wierszy.
- **Write-back / logowanie** — `notion_append_blocks` dopisuje notatki ze spotkań,
  podsumowania runów albo output agenta do istniejącej strony (tylko append; bez
  destrukcyjnych edycji).
- **Eksploracja struktury** — `notion_list_block_children` do przejścia drzewa
  bloków strony albo `notion_get_database` do odkrycia schematu właściwości bazy
  przed jej odpytaniem.

## Powiązane

- [MCP Server](./MCP-SERVER.md) — transporty, egzekwowanie scope'ów, pełny inwentarz narzędzi.
- [Obsidian Context Source](./OBSIDIAN_CONTEXT.md) — drugie wbudowane źródło kontekstu.
- [Memory System](./MEMORY.md) — trwała pamięć konwersacyjna (komplementarna
  warstwa kontekstu, wstrzykiwana automatycznie zamiast pobierana narzędziami).
