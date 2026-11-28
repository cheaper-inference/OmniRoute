# Notion Context Source (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Източник на истината:** `src/lib/notion/api.ts` (REST клиент), `src/lib/db/notion.ts`
> (съхраняване на токена), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP инструмента),
> `src/app/api/settings/notion/route.ts` (API за настройки). Регистрирането на инструментите и
> свързването на обхватите се намират в `open-sse/mcp-server/server.ts`.

## Какво представлява

OmniRoute може да се свърже с работно пространство в **Notion** като **източник на контекст** — база
от знания за четене и запис, до която агентите достигат чрез вградения MCP сървър. След като бъде
конфигуриран токен за интеграция с Notion, MCP инструментите позволяват на LLM да търси страници и бази
данни, да чете съдържанието на страници и дървета от блокове, да изпълнява заявки към бази данни с филтри/сортиране и да добавя нови
блокове — всичко се препраща чрез OmniRoute (с повторни опити, изчакване и класифициране на грешките),
така че моделът никога да не достъпва директно API на Notion.

Интеграцията е тънка, подсилена обвивка над официалния REST API на Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Клиентът
(`src/lib/notion/api.ts`) добавя:

- **Повторни опити с експоненциално отстъпване** (до 3 опита) при `429` и `5xx`.
- **55-секундно изчакване на заявките** чрез `AbortController`.
- **Типизирано класифициране на грешките** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, съобразява се с указанията за
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Санитизиране на съобщенията**, което премахва фрагменти, наподобяващи проследяване на стека, преди показването им.

## Настройване

Няма **променлива на средата** за токена на Notion — той се съхранява в
SQLite таблицата `key_value` (пространство от имена `notion`, ключ `integration_token`) чрез
`src/lib/db/notion.ts`. Конфигурирайте го от раздела **Източници на контекст** в таблото за управление на
крайната точка (`NotionSourceCard`, съседен на `ObsidianSourceCard`) или чрез REST API за настройки.

> [!NOTE]
> Токенът е **токен за вътрешна интеграция на Notion**. Създайте интеграция на
> <https://www.notion.com/my-integrations>, след което споделете с тази интеграция страниците/базите данни, до които искате
> OmniRoute да има достъп (моделът за разрешения на Notion е базиран на споделяне,
> а не важи за цялото работно пространство).

### Конфигуриране чрез REST

```bash
# Запазване + валидиране на токена за интеграция (POST валидира чрез изпращане на тестово търсене)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Проверка на състоянието на връзката
curl http://localhost:20128/api/settings/notion

# Прекъсване на връзката (изтрива съхранения токен)
curl -X DELETE http://localhost:20128/api/settings/notion
```

И трите метода изискват удостоверяване в таблото за управление (`isAuthenticated`). При `POST`
OmniRoute запазва токена и незабавно изпълнява тестово търсене с 1 резултат; ако Notion
върне обект за грешка, токенът се изтрива и извикването завършва неуспешно с `400`.

## MCP инструменти (6)

Дефинирано в `open-sse/mcp-server/tools/notionTools.ts`. Токенът се разрешава по време на повикване чрез `getNotionToken()`; ако никой не е конфигуриран, инструментът хвърля `"Notion integration token not configured. Set it in Settings > Context Sources."`

| Инструмент                   | Обхват         | Описание                                                                                           |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Търсете страници и бази данни по текстова заявка (връща заглавия, IDs, URLs). Пагиниран.           |
| `notion_get_page`            | `read:notion`  | Вземете съдържание и метаданни на страница чрез нейния ID.                                         |
| `notion_list_block_children` | `read:notion`  | Избройте всички дъщерни блокове на блок или страница (блоково дърво). Пагиниран.                   |
| `notion_query_database`      | `read:notion`  | Изпратете запитване към база данни с опционален `filter` + `sorts` (Notion API формат). Пагиниран. |
| `notion_get_database`        | `read:notion`  | Вземете schema/metadata на база данни от ID.                                                       |
| `notion_append_blocks`       | `write:notion` | Добавете дъщерни блокове към съществуващ блок или страница (максимум 100 блока на заявка).         |

### Входни параметри

- `notion_search` — `query` (1–500 знака), `pageSize` (1–100, по подразбиране 20), `startCursor` (по избор).
- `notion_get_page` — `pageId` (32-char hex или UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, по подразбиране 50), `startCursor` (по избор).
- `notion_query_database` — `databaseId`, `filter` (по избор, Notion филтър формат), `sorts` (по избор масив), `pageSize` (1–100, по подразбиране 50), `startCursor` (по избор).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (масив от блокови обекти), `after` (незадължителна позиция).

### Обхвати

Инструментите за четене изискват `read:notion`, а инструментът за запис изисква `write:notion`. Обхватите се налагат от `withScopeEnforcement()` в `open-sse/mcp-server/server.ts`, когато `OMNIROUTE_MCP_ENFORCE_SCOPES=true`, и винаги за HTTP/SSE повикващ, чийто API ключ липсва `manage`/`admin`; разрешените обхвати на повикващия идват от `OMNIROUTE_MCP_SCOPES` (разделени със запетая) или контекста на обхвата на удостоверения API ключ. Вижте [MCP-SERVER.md](./MCP-SERVER.md) за модела с пълен обхват.

## Крайни точки

| Метод    | Път                    | Предназначение                                |
| -------- | ---------------------- | --------------------------------------------- |
| `GET`    | `/api/settings/notion` | Връща `{ connected, hasToken }`.              |
| `POST`   | `/api/settings/notion` | Запазва и валидира токена за интеграция.      |
| `DELETE` | `/api/settings/notion` | Прекъсва връзката (изчиства запазения токен). |

> Това са маршрути за настройки на таблото за управление. **Няма публична `/v1` крайна
> точка на прокси за Notion** — достъпът до Notion се осъществява изключително чрез MCP инструментите по-горе.

## Случаи на употреба

- **Отговори, базирани на знания** — позволете на агент да използва `notion_search` в работното пространство и
  `notion_get_page` за най-релевантния резултат, преди да отговори, така че отговорите да цитират реални вътрешни документи.
- **Работни процеси, базирани на база данни** — използвайте `notion_query_database` за база данни със задачи/CRM с
  филтри и сортирания, след което обобщете или приоритизирайте редовете.
- **Обратно записване / регистриране** — използвайте `notion_append_blocks`, за да добавяте бележки от срещи, обобщения
  на изпълнения или резултати от агента към съществуваща страница (само добавяне; без разрушителни редакции).
- **Изследване на структурата** — използвайте `notion_list_block_children`, за да обходите дървото от блокове на дадена страница,
  или `notion_get_database`, за да откриете схемата на свойствата на база данни, преди да я заявите.

## Свързани теми

- [MCP сървър](./MCP-SERVER.md) — транспортни механизми, прилагане на обхвата и пълен списък с инструменти.
- [Контекстен източник Obsidian](./OBSIDIAN_CONTEXT.md) — другият вграден източник на контекст.
- [Система за памет](./MEMORY.md) — постоянна разговорна памет (допълващ
  контекстен слой, който се вмъква автоматично, вместо да се извлича чрез инструмент).
