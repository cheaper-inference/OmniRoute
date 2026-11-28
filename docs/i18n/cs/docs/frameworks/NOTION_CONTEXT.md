# Notion Context Source (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Zdroj pravdy:** `src/lib/notion/api.ts` (REST klient), `src/lib/db/notion.ts`
> (ukládání tokenu), `open-sse/mcp-server/tools/notionTools.ts` (6 nástrojů MCP),
> `src/app/api/settings/notion/route.ts` (API nastavení). Registrace nástrojů a propojení
> rozsahů oprávnění se nachází v `open-sse/mcp-server/server.ts`.

## Co to je

OmniRoute se může připojit k pracovnímu prostoru **Notion** jako ke **zdroji kontextu** — znalostní
bázi pro čtení i zápis, ke které agenti přistupují prostřednictvím vestavěného serveru MCP. Jakmile je
nakonfigurován token integrace Notion, nástroje MCP umožní LLM vyhledávat stránky a databáze,
číst obsah stránek a stromy bloků, dotazovat se na databáze pomocí filtrů a řazení a přidávat nové
bloky — vše prostřednictvím proxy OmniRoute (s opakováním požadavků, časovým limitem a klasifikací chyb),
takže model nikdy nepřistupuje přímo k API Notion.

Integrace je tenkou, robustně zabezpečenou obálkou nad oficiálním REST API Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klient
(`src/lib/notion/api.ts`) přidává:

- **Opakování s exponenciálním prodlužováním prodlevy** (až 3 pokusy) pro `429` a `5xx`.
- **55sekundový časový limit požadavku** prostřednictvím `AbortController`.
- **Typovou klasifikaci chyb** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respektuje doporučení
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitizaci zpráv**, která před jejich zobrazením odstraňuje fragmenty připomínající trasování zásobníku.

## Nastavení

Pro token Notion **neexistuje žádná proměnná prostředí** — ukládá se do tabulky SQLite
`key_value` (jmenný prostor `notion`, klíč `integration_token`) prostřednictvím
`src/lib/db/notion.ts`. Nakonfigurujte jej na kartě **Zdroje kontextu** v ovládacím panelu
koncového bodu (`NotionSourceCard`, který je sourozencem `ObsidianSourceCard`), nebo prostřednictvím REST API nastavení.

> [!NOTE]
> Token je **token interní integrace Notion**. Vytvořte integraci na adrese
> <https://www.notion.com/my-integrations> a poté s touto integrací sdílejte stránky/databáze, ke kterým má mít
> OmniRoute přístup (model oprávnění Notion je založen na sdílení,
> nikoli na přístupu k celému pracovnímu prostoru).

### Konfigurace prostřednictvím REST

```bash
# Uložení a ověření tokenu integrace (POST provede ověření pomocí testovacího vyhledávání)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Kontrola stavu připojení
curl http://localhost:20128/api/settings/notion

# Odpojení (vymaže uložený token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Všechny tři metody vyžadují ověření v ovládacím panelu (`isAuthenticated`). Při požadavku `POST`
OmniRoute uloží token a okamžitě spustí testovací vyhledávání s 1 výsledkem; pokud Notion
vrátí chybový objekt, token se vymaže a volání selže se stavem `400`.

## nástroje MCP (6)

Definováno v `open-sse/mcp-server/tools/notionTools.ts`. Token je vyřešen v době hovoru prostřednictvím `getNotionToken()`; pokud není nakonfigurován žádný, nástroj vyvolá `"Notion integration token not configured. Set it in Settings > Context Sources."`

| Nástroj                      | Rozsah         | Popis                                                                                          |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Vyhledávání stránek a databází podle textového dotazu (vrací nadpisy, IDs, URLs). Stránkované. |
| `notion_get_page`            | `read:notion`  | Získejte obsah a metadata stránky podle jejího ID.                                             |
| `notion_list_block_children` | `read:notion`  | Vypište všechny potomky bloku nebo stránky (strom bloků). Stránkované.                         |
| `notion_query_database`      | `read:notion`  | Dotaz na databázi s volitelným `filter` + `sorts` (formát Notion API ). Stránkované.           |
| `notion_get_database`        | `read:notion`  | Získejte schema/metadata databáze pomocí ID.                                                   |
| `notion_append_blocks`       | `write:notion` | Připojit děti bloku k existujícímu bloku nebo stránce (max. 100 bloků na požadavek).           |

### Vstupní parametry

- `notion_search` — `query` (1–500 znaků), `pageSize` (1–100, výchozí 20), `startCursor` (volitelné).
- `notion_get_page` — `pageId` (32znakový hex nebo UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, výchozí 50), `startCursor` (volitelné).
- `notion_query_database` — `databaseId`, `filter` (volitelné, formát filtru Notion ), `sorts` (volitelné pole), `pageSize` (1–100, výchozí 50), `startCursor` (volitelné).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (pole blokových objektů), `after` (volitelná pozice).

### Rozsahy

Nástroje pro čtení vyžadují `read:notion` a nástroj pro zápis vyžaduje `write:notion`. Rozsahy jsou vynuceny `withScopeEnforcement()` v `open-sse/mcp-server/server.ts`, když `OMNIROUTE_MCP_ENFORCE_SCOPES=true`, a vždy pro volajícího HTTP/SSE jehož klíč API postrádá `manage`/`admin`; povolené rozsahy volajícího pocházejí z kontextu rozsahu `OMNIROUTE_MCP_SCOPES` (oddělený čárkou) nebo ověřeného klíče API. Viz [MCP-SERVER.md](./MCP-SERVER.md) pro model v plném rozsahu.

## Koncové body

| Metoda   | Cesta                  | Účel                                     |
| -------- | ---------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/notion` | Vrátí `{ connected, hasToken }`.         |
| `POST`   | `/api/settings/notion` | Uloží a ověří integrační token.          |
| `DELETE` | `/api/settings/notion` | Odpojí integraci (vymaže uložený token). |

> Toto jsou trasy nastavení dashboardu. Neexistuje **žádný veřejný proxy koncový bod
> `/v1` pro Notion** — k Notion se přistupuje výhradně prostřednictvím výše uvedených nástrojů MCP.

## Případy použití

- **Odpovědi založené na znalostech** — nechte agenta prohledat pracovní prostor pomocí `notion_search`
  a před odpovědí načíst nejlepší výsledek pomocí `notion_get_page`, aby odpovědi odkazovaly na skutečnou interní dokumentaci.
- **Pracovní postupy založené na databázích** — dotazujte databázi úkolů/CRM pomocí `notion_query_database`
  s filtry a řazením a poté řádky shrňte nebo roztřiďte.
- **Zpětný zápis / protokolování** — pomocí `notion_append_blocks` přidávejte poznámky ze schůzek, souhrny
  běhů nebo výstup agenta na existující stránku (pouze přidávání; žádné destruktivní úpravy).
- **Průzkum struktury** — pomocí `notion_list_block_children` procházejte strom bloků stránky
  nebo pomocí `notion_get_database` zjistěte schéma vlastností databáze před jejím dotazováním.

## Související

- [Server MCP](./MCP-SERVER.md) — transporty, vynucování rozsahu, úplný přehled nástrojů.
- [Zdroj kontextu Obsidian](./OBSIDIAN_CONTEXT.md) — další vestavěný zdroj kontextu.
- [Paměťový systém](./MEMORY.md) — trvalá konverzační paměť (doplňková
  kontextová vrstva, která se vkládá automaticky namísto načítání pomocí nástrojů).
