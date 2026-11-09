# OmniRoute MCP Server Documentation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Сървър за Model Context Protocol със 110 инструмента за операции с маршрутизиране, кеш, компресия, памет, умения, прокси, пул, Radar и източници на контекст.
>
> Достоверен източник: `open-sse/mcp-server/server.ts` изчислява **110 уникални инструмента** чрез `countUniqueMcpTools()`: 45 канонични дефиниции (включително шестте инструмента за жизнения цикъл на CCR, трите инструмента за агентски умения, `omniroute_radar_catalog` и `omniroute_x_search`), плюс памет (3), умения (4), GitHub умения (3), пул (6), геймификация (8), плъгини (8), Notion (6), Obsidian (22), локален корпус (3) и два инструмента за компресия само за RTK.

## Монтаж

OmniRoute MCP е вграден. Започнете го с:

```bash
omniroute --mcp
```

Или чрез отворения транспорт:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

HTTP транспортите (`sse` / `streamable-http`, обслужвани в процеса от сървъра на таблото за управление) са изключени по подразбиране и преди това можеха да се превключват само от страницата `/dashboard/mcp`. От v3.8.51 CLI има паритет:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH същото `mcpEnabled` (и по избор `mcpTransport`) настройката на таблото за управление превключва чрез `/api/settings`. `mcp restart` извиква `POST /api/mcp/restart`: разкъсва активните `sse`/`streamable-http` сесии, така че следващата заявка се инициализира отново чисто, връща `409` ако MCP е деактивиран, и `501` за `stdio` транспорта (клиентите на stdio притежават собствен подпроцес — няма манипулатор в процеса за рестартиране).

## Транспорти

MCP сървърът предоставя три транспорта, всички базирани на една и съща фабрика `createMcpServer()`:

| Транспорт         | Къде                                         | Кога да се използва                                              |
| :---------------- | :------------------------------------------- | :--------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Интеграции с IDE (Claude Desktop, Cursor и др.)                  |
| `sse`             | `POST/GET /api/mcp/sse` чрез `httpTransport` | Клиенти за браузъри/агенти, които се нуждаят от поток от събития |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | HTTP клиенти с множество сесии (`mcp-session-id` заглавка)       |

Активният HTTP транспорт (`sse` или `streamable-http`) се избира чрез настройката `mcpTransport`. Превключването на транспортите затваря съществуващите сесии на другия транспорт.

### Отдалечен достъп (заобикаляне чрез обхвата manage)

`/api/mcp/*` е в нивото LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — по подразбиране до него имат достъп само loopback хостове (`localhost`, `127.0.0.1`, `::1`). От v3.8.2 клиентите извън loopback могат да се свързват, ако предоставят `Authorization: Bearer <api-key>`, чийто ключ включва обхвата `manage`. Това е единственият начин за достъп до отдалечения MCP сървър през тунел, обратно прокси или публично име на хост.

```bash
# Предоставяне на обхват manage: отворете страницата API Keys в таблото и включете
# „Management Access“ за ключа или изпратете POST с scopes:["manage"] при създаването му.

# След това се свържете от отдалечен MCP клиент:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ключ без обхват `manage` (или без Bearer) връща `403 LOCAL_ONLY`. Съседният префикс `/api/cli-tools/runtime/*` умишлено НЕ може да бъде заобиколен — вижте [Нива на Route Guard — изключение за обхвата manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Проверка на Origin

След удостоверяване всяка заявка към `/api/mcp/*` — транспортите и управляващите маршрути като `status`, `tools`, `audit`, `restart` — получава проверка на заглавката `Origin`, независимо от извикващия (API ключ, CLI токен, сесия на таблото или анонимен loopback при изключен вход). Това е защитата срещу DNS rebinding, която изисква спецификацията MCP Streamable HTTP.

- **Без заглавка `Origin`** → разрешено. OmniRoute CLI, SDK и IDE клиентите не я изпращат.
- **Разрешен `Origin`** → `localhost` / `127.0.0.1` / `[::1]` на произволен порт или собственият публичен origin на OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, origin, препратен от доверен обратен прокси (`OMNIROUTE_TRUST_PROXY`, само ако не е зададен base URL), или директно достъпван loopback/LAN IP хост. Самата заглавка `Host` никога не прави даден origin доверен.
- **Всеки друг `Origin`, включително `null`** → `403` с тяло на грешка JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Сесия на таблото с валиден CSRF токен продължава да се приема, както при другите записи от таблото.

Браузърен MCP клиент зад обратен прокси се нуждае от `OMNIROUTE_PUBLIC_BASE_URL`; няма списък с разрешени други origin. Предварителната CORS заявка (`OPTIONS`) не се проверява за Origin; следващата заявка — да.

## Конфигурация на IDE

Вижте [Конфигурация на MCP клиент](../guides/SETUP_GUIDE.md#mcp-client-configuration) за настройването на Claude Desktop,
Cursor, Cline и съвместими MCP клиенти.

---

## Основни инструменти (14) — Фаза 1

| Инструмент                      | Обхвати               | Описание                                                                                                                                 |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Време на работа, памет, прекъсвачи на вериги, ограничения на заявките, статистика за кеша                                                |
| `omniroute_list_combos`         | `read:combos`         | Всички конфигурирани комбинации със стратегии (незадължителни метрики)                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | Метрики за производителността на конкретна комбинация                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | Активиране или деактивиране на комбинация                                                                                                |
| `omniroute_create_combo`        | `write:combos`        | Създаване на валидирана комбинация чрез съществуващия API за комбинации                                                                  |
| `omniroute_check_quota`         | `read:quota`          | Използвана/обща квота, оставащ процент, време за нулиране, състояние на токена                                                           |
| `omniroute_route_request`       | `execute:completions` | Изпращане на заявка за завършване на чат чрез маршрутизирането на OmniRoute                                                              |
| `omniroute_cost_report`         | `read:usage`          | Отчет за разходите по периоди (сесия/ден/седмица/месец)                                                                                  |
| `omniroute_list_models_catalog` | `read:models`         | Пълен каталог с модели, включващ възможности, състояние и цени                                                                           |
| `omniroute_radar_catalog`       | `read:radar`          | Локален подписан каталог Radar; незадължителни филтри по доставчик/семейство                                                             |
| `omniroute_tool_search`         | `read:tools`          | Откриване на инструменти от регистрирания MCP каталог                                                                                    |
| `omniroute_web_search`          | `execute:search`      | Търсене в мрежата чрез конфигурираните доставчици за търсене. Не поддържа X/Twitter.                                                     |
| `omniroute_x_search`            | `execute:search`      | Търсене в X чрез xAI/SuperGrok или избор на `xquik-search` за резултати от Xquik API. Изисква идентификационни данни за избрания бекенд. |
| `omniroute_web_fetch`           | `execute:search`      | Извличане на уеб съдържание чрез конфигурираните доставчици за извличане                                                                 |

## Разширени инструменти (11) — Фаза 2

| Инструмент                         | Обхвати                              | Описание                                                                                                                                  |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Симулация на маршрутизирането без реално изпълнение с дърво за резервно превключване                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Бюджет за сесията с действие за понижаване, блокиране или предупреждение                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Актуализиране на стратегията на комбинацията по време на изпълнение (приоритетна/претеглена/автоматична и т.н.)                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Прилагане на предварително зададен профил за устойчивост: `aggressive` / `balanced` / `conservative`                                      |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Тест в реално време на всеки доставчик в комбинация чрез действителна заявка към външна услуга                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Метрики по доставчици със закъснение p50/p95/p99 и състояние на автоматичния прекъсвач                                                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Препоръчване на комбинация според типа задача с ограничения за бюджет и закъснение                                                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Обяснение защо заявката е маршрутизирана към даден доставчик (фактори за оценяване + резервни варианти)                                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Пълна моментна снимка на сесията: разходи, токени, водещи модели/доставчици, грешки, защита на бюджета                                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Диагностика (и по избор автоматично поправяне) на несъответствия в базата данни, като повредени препратки към комбинации/осиротели редове |
| `omniroute_sync_pricing`           | `pricing:write`                      | Синхронизиране на ценови данни от външни източници (LiteLLM); поддържа `dryRun`                                                           |

## Инструменти за кеширане (2)

| Инструмент              | Обхвати       | Описание                                                          |
| :---------------------- | :------------ | :---------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Статистики за семантичния кеш, кеша за подкани и идемпотентността |
| `omniroute_cache_flush` | `write:cache` | Изчистване на кеша глобално или по сигнатура/модел                |

## Инструменти за компресиране (13)

| Инструмент                          | Обхвати             | Описание                                                                                                                                  |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Настройки за компресиране, обобщение на анализа и статистика за кеша (включва `analytics.mcpDescriptionCompression` метаданни)            |
| `omniroute_compression_configure`   | `write:compression` | Конфигуриране на режим на компресиране, праг, целево съотношение, запазване на системни подкани, превключване на компресията MCP описание |
| `omniroute_set_compression_engine`  | `write:compression` | Изберете активния двигател (off/caveman/rtk/stacked) и интензитета Caveman/RTK                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | Избройте именувани комбинации за компресия и техните конвейери на двигателя                                                               |
| `omniroute_compression_combo_stats` | `read:compression`  | Анализи, групирани по комбинация от компресия и двигател                                                                                  |
| `omniroute_ccr_store`               | `write:compression` | Съхранявайте изолирано от повикващия съдържание в ограниченото CCR хранилище в паметта и връщайте маркер плюс `ccr://` препратка          |
| `omniroute_ccr_retrieve`            | `read:compression`  | Извличане на CCR съдържание изцяло или с режими head, tail, lines, grep и stats                                                           |
| `omniroute_ccr_inspect`             | `read:compression`  | Проверете CCR метаданните, притежавани от обаждащия се, без да връщате съдържание                                                         |
| `omniroute_ccr_list`                | `read:compression`  | Избройте пагинирани метаданни за CCR блокове, притежавани от повикващия                                                                   |
| `omniroute_ccr_delete`              | `write:compression` | Изтрийте CCR блок, притежаван от обаждащия се                                                                                             |
| `omniroute_ccr_stats`               | `read:compression`  | Отчитайте използването на паметта в обхвата на повикващия, броячите на жизнения цикъл и ограниченията за съхранение                       |
| `omniroute_rtk_discover`            | `read:compression`  | Открийте повтарящ се шум в изходни проби RTK за включване                                                                                 |
| `omniroute_rtk_learn`               | `read:compression`  | Генерирайте чернова RTK филтър, която може да бъде прегледана, от проби за включване                                                      |

CCR записите използват двустепенно хранилище: горещ слой в паметта, подкрепен, на локални не-облачни изпълнения, от издръжлив SQLite слой (`ccr_blocks`, включено по подразбиране), така че блок оцелява при изгонване или рестартиране, докато неговият TTL не изтече — с изключение на блокове над 512 KB и облачни изпълнения, които остават само в паметта. Всеки блок е ограничен до 2 MiB, всеки принципал до 16 MiB, а глобалното хранилище до 64 MiB. Записите по подразбиране са 24-часов TTL (максимум седем дни). Пълното извличане MCP е ограничено до 256 KiB; по-големите блокове остават достъпни чрез режимите ranged и grep. Съхранението, извличането, изброяването, проверката, изтриването и статистиката са изолирани от удостоверения принципал на API ключ. Одитните записи съдържат хешове и метаданни за размера, никога съдържание. Подробности за оператора (двата маркера, предпоставки на клиента, `codemode:false`, обхвати за всеки инструмент, пагинация и диагностична матрица) се намират в [Compression Engines → Предварителни условия / ръководство за оператора](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` докладва компресията на описанието MCP отделно под `analytics.mcpDescriptionCompression`. Тези стойности са приблизителни оценки на размера на метаданните за MCP изброими описания (`tools`, `prompts`, `resources` и `resourceTemplates`); те не са разписки за използване на доставчика и са маркирани с `source: "mcp_metadata_estimate"`.

### MCP Дървовиден филтър за достъпност (v3.8.0)

Отделно от инструментите за компресиране по-горе, OmniRoute включва филтър след изпълнение, който компресира** резултати от инструмента** на MCP browser/accessibility инструменти, преди да бъдат върнати на агента. Този филтър сам по себе си не е инструмент — той работи прозрачно върху всеки резултат от инструмента, който съдържа подробен текст на дървото за достъпност или моментна снимка на браузъра (≥ 2000 знака).

Ключови поведения:

- Свива ≥ 30 последователни повтарящи се родствени реда в резюме на главата + опашката
- Запазва `[ref=eXX]` котви, изисквани от Playwright/computer-use
- Твърдо съкращава твърде големия текст (> 50 000 знака) с навигационен съвет
- Очаквани спестявания:** 60–80%** върху полезните натоварвания за моментна снимка на браузъра

Конфигурация: `compression.mcpAccessibility` в глобалните настройки (миграция 056). Внедряване: `open-sse/services/compression/engines/mcpAccessibility/`. Пълни документи: [Двигатели за компресия — MCP Дървовиден филтър за достъпност](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Вижте [Compression Engines](../compression/COMPRESSION_ENGINES.md) и [RTK Compression](../compression/RTK_COMPRESSION.md) за модела на компресиране по време на изпълнение зад тези инструменти.

## Инструменти на 1Proxy (3)

| Инструмент                  | Обхвати        | Описание                                                                                        |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Извличане на безплатни проксита от пазара на 1proxy (филтри за протокол/държава/качество/лимит) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Получаване на следващото налично прокси според стратегия (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | Статистика за пула, състояние на синхронизацията и разпределение по протокол и държава          |

## Инструменти за памет (3)

Дефинирани в `open-sse/mcp-server/tools/memoryTools.ts`. Удостоверяването/обхватът се прилага чрез стандартния механизъм за MCP обхвати.

| Инструмент                | Обхвати        | Описание                                                                                             |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Търсене в спомените по заявка / тип / API ключ с прилагане на ограничение за бюджета от токени       |
| `omniroute_memory_add`    | `write:memory` | Добавяне на нов запис в паметта (`factual` / `episodic` / `procedural` / `semantic`)                 |
| `omniroute_memory_clear`  | `write:memory` | Изчистване на спомените за API ключ, с възможност за филтриране по тип или времеви печат `olderThan` |

## Инструменти за умения (4)

Дефинирани в `open-sse/mcp-server/tools/skillTools.ts`. Поддържани от `src/lib/skills/registry` + `src/lib/skills/executor`.

| Инструмент                    | Обхвати          | Описание                                                                                                     |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Изброяване на регистрираните умения с незадължително филтриране по API ключ, име или състояние на активиране |
| `omniroute_skills_enable`     | `write:skills`   | Активиране или деактивиране на конкретно умение по ID                                                        |
| `omniroute_skills_execute`    | `execute:skills` | Изпълнение на умение с предоставени входни данни и връщане на записа за изпълнението                         |
| `omniroute_skills_executions` | `read:skills`    | Изброяване на скорошната хронология на изпълненията на умения                                                |

## Източник на контекст Notion (6)

Дефинирани в `open-sse/mcp-server/tools/notionTools.ts`. Токенът се съхранява в таблицата `key_value` чрез `src/lib/db/notion.ts`. REST клиентът се намира в `src/lib/notion/api.ts`. API за настройките се намира в `src/app/api/settings/notion/route.ts`. Потребителският интерфейс на таблото се намира в `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Конфигурирайте токена за интеграция с Notion от раздела **Източници на контекст** в таблото на крайната точка или чрез REST API:

```bash
# Задаване на токен
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Проверка на състоянието
curl http://localhost:20128/api/settings/notion

# Прекъсване на връзката
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Инструмент                   | Обхвати        | Описание                                                                 |
| :--------------------------- | :------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Пълнотекстово търсене във всички страници и бази данни                   |
| `notion_get_page`            | `read:notion`  | Получаване на страница по ID заедно с нейните свойства                   |
| `notion_list_block_children` | `read:notion`  | Изброяване на дъщерните блокове на страница или блок                     |
| `notion_query_database`      | `read:notion`  | Заявка към база данни с филтри, сортиране и страниране                   |
| `notion_get_database`        | `read:notion`  | Получаване на схемата на база данни по ID                                |
| `notion_append_blocks`       | `write:notion` | Добавяне на дъщерни блокове към родителски блок (максимум 100 на заявка) |

## Инструменти за каталога с умения на агенти (3)

Дефинирани в `open-sse/mcp-server/tools/agentSkillTools.ts`. Поддържани от `src/lib/agentSkills/catalog`. Тези инструменти предоставят на MCP клиенти и външни агенти достъп до каталога с документация за 45 умения на агенти. Обхват: `read:catalog`.

| Инструмент                        | Обхвати        | Описание                                                                                                                                                    |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Изброява всички 45 умения на агенти с незадължителни филтри `category` (api\|cli) и `area`; връща метаданни + покритие                                      |
| `omniroute_agent_skills_get`      | `read:catalog` | Получава пълните метаданни + съдържанието на SKILL.md за конкретно умение по каноничен `id`                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Статистика за покритието: колко от 23-те API, 21-те CLI и 1 конфигурационно умение имат файлове SKILL.md във файловата система спрямо общия брой в каталога |

Вижте [AGENT-SKILLS.md](./AGENT-SKILLS.md) за пълния каталог и начина, по който външните агенти го използват.

## Свързани платформи (v3.8.0)

Списъкът с MCP инструменти по-горе (110 уникални инструмента, изчислени чрез `countUniqueMcpTools()`) е умишлено
ограничен до операции по маршрутизиране по време на изпълнение, кеширане, компресиране, памет, умения, прокси и източници на контекст. Две съседни
платформи се доставят заедно с MCP сървъра във v3.8.0 и са документирани отделно:

### Облачни агенти

Облачните агенти са AI агенти за програмиране, изпълнявани извън процеса (codex-cloud, cursor-cloud, devin, jules), свързани с
OmniRoute чрез същия модел за свързване, който се използва за доставчиците на LLM. Те са достъпни чрез
собствен REST интерфейс (`/api/v1/agents/*`) и **не** са част от каталога с MCP инструменти
— извикването на облачен агент не използва MCP обхват.

- Реализация: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Жизнен цикъл: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Документация: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Предпазни механизми

Предпазните механизми са филтри преди/след изпълнение (vision-bridge, pii-masker, prompt-injection),
прилагани в конвейера за чат. Те се изпълняват, преди да бъде достигнат слоят за MCP инструменти/маршрути,
и изпращат структурирани нарушения към конвейера за одит; не се извикват като MCP инструменти.

- Реализация: `src/lib/guardrails/`.
- Документация: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Когато отстранявате проблем с привидно блокирано MCP извикване, проверете както одитния дневник на MCP
(записи `scope_denied:*`), така и одитната следа на предпазните механизми — заявката може да бъде отхвърлена от
предпазен механизъм, **преди** изобщо да достигне слоя за налагане на MCP обхватите.

---

## Крайни точки на REST API

| Крайна точка           | Метод                 | Описание                                                                                                 | Удостоверяване                   |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `/api/mcp/status`      | `GET`                 | Състояние на сървъра: сигнал за активност, състояние на HTTP транспорта, обобщение на одитната активност | Управление (сесия/администратор) |
| `/api/mcp/tools`       | `GET`                 | Каталог с инструменти (име, описание, обхвати, фаза, изходни крайни точки)                               | Управление                       |
| `/api/mcp/sse`         | `GET` / `POST`        | Крайна точка за SSE транспорт (ограничена чрез `mcpEnabled` + `mcpTransport === "sse"`)                  | API ключ + обхвати               |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Поточен HTTP транспорт (използва заглавката `mcp-session-id`; `DELETE` прекратява сесията)               | API ключ + обхвати               |
| `/api/mcp/audit`       | `GET`                 | Записи в одитния дневник от `mcp_tool_audit` (филтри: `limit`, `offset`, `tool`, `success`, `apiKeyId`)  | Управление                       |
| `/api/mcp/audit/stats` | `GET`                 | Обобщена одитна статистика (`totalCalls`, `successRate`, `avgDurationMs`, най-използвани инструменти)    | Управление                       |

Изходни файлове: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Както SSE, така и поточният HTTP транспорт са блокирани, докато MCP сървърът не бъде активиран в настройките (`mcpEnabled`) и не бъде избран подходящият `mcpTransport`. Ако е конфигуриран неправилен транспорт, маршрутът връща HTTP 400 с указание за промяна на настройките.

---

## Удостоверяване и обхвати

MCP инструментът извиква низове за четене на обхват от повикващия. Тази проверка е едно от трите независими пространства от имена. Пас от един пул не е пас от останалите. Правилата са [три пространства от имена на обхват](#three-scope-namespaces). Каталогът с инструменти е [MCP tool scopes](#mcp-tool-scopes).

### Три пространства от имена на обхват

`manage` на API ключ, `read:compression` на MCP инструмент и `read` на `oma_live_…` токен за достъп са три различни разрешения. Обаждащите се, които изпращат `read` токен за достъп до мутиращ маршрут за управление, получават HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Този ранг е `scopeSatisfies`. Той не прави справка с таблицата MCP и инструментът за съвпадение MCP не се консултира с нея.

| Пространство от имена     | Удостоверение                                                                 | Дама                        | Пропуск позволява                                             |
| :------------------------ | :---------------------------------------------------------------------------- | :-------------------------- | :------------------------------------------------------------ |
| Управление на API ключове | `api_keys.scopes`                                                             | `hasManageScope`            | Управление REST за този ключ на носителя                      |
| API-ключова добавка       | същия масив, един точен низ                                                   | помощникът, посочен по-долу | Само тази единствена способност                               |
| обхват на инструмента MCP | същия масив, иначе MCP `_meta` (само HTTP/SSE ), иначе `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | Този инструмент, след като прилагането е включено             |
| Токен за достъп           | `oma_live_…`                                                                  | `scopeSatisfies`            | Маршрутът на управление, чийто метод и път изискват този ранг |

Сеченето на всяко пълномощно е обхванато в [Удостоверяване на управлението](../guides/MANAGEMENT-AUTH.md).

#### Обхват на API-ключ

Един `api_keys.scopes` масив захранва две задачи. Те използват различни функции.

**Управление REST.** `manage` и `admin` са членовете на `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` е това, което разрешава маршрути за управление за този ключ. `admin` е способен да управлява тези маршрути. Думата `admin` тук не е рангът на токена за достъп и не се разширява в обхвата на инструмента MCP.

**Добавъчни низове.** Всеки от тях е точен тест за членство и всеки остава извън `MANAGEMENT_API_KEY_SCOPES`.

| Обхват                         | Пропуск позволява                                                                                                                                                        |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Не-loopback `/api/mcp/` LOCAL_ONLY само отделяне (`hasMcpConnectOrManageScope`). Ключ с `manage` или `admin` все още преминава това изрязване.                           |
| `self:usage`                   | `GET /api/v1/me/status` за този ключ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` добавя този обхват при създаване (`normalizeSelfServiceScopesForCreate`).   |
| `self:account-quota`           | Квотите на акаунта нагоре по веригата в този полезен товар на състоянието (`src/lib/usage/apiKeySelfService.ts`). Маршрутът на състоянието все още изисква `self:usage`. |
| `policy:bypass-provider-quota` | Извикванията за извод на този ключ пропускат политиката за квоти на доставчика (`hasProviderQuotaBypassScope` в `src/sse/handlers/chat.ts`).                             |

#### Съвпадение

Каталогът е таблицата под [обхватите на инструмента MCP](#mcp-tool-scopes). Не третирайте `MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` като този каталог: това е оригиналното въведено подмножество. По-късните инструменти декларират допълнителни обхвати до него (`read:notion`, `read:skills`, `read:local-corpus` и останалата част от таблицата).

`evaluateToolScopes` в `open-sse/mcp-server/scopeEnforcement.ts` позволява извикване, когато всеки необходим обхват съответства на даден предоставен обхват:

- `*` съответства на всеки необходим обхват.
- Предоставен обхват, който завършва на `*` съответства на задължителен обхват, който започва с префикса преди звездата. `read:*` съответства `read:compression`.
- Всеки друг предоставен обхват съответства само на идентичния задължителен низ.

Ключ, чийто обхват е `["manage"]` се проваля `scopeMatches` за `read:compression`. Същото извикване е неуспешно за `admin`, `mcp:connect`, `read` и `write` когато това са единствените предоставени низове. Няма йерархия между обхватите на инструмента MCP извън края на `*`.

Налагането е изключено, освен ако `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (по подразбиране `false`). Докато е изключен, `evaluateToolScopes` позволява повикването и пропуска каталога. Докато е включен, HTTP използва `api_keys.scopes` на ключа на носителя като `authInfo` (вижте [Обвързване на обхвата на HTTP за ключ](#per-key-http-scope-binding-7895) ). Когато няма разрешени обхвати на ключове, предоставеният набор попада в MCP `_meta` (отчита се само за HTTP/SSE повикващите, в рамките на HTTP auth контекст; `_meta` на stdio повикващия се игнорира, защото клиентът го контролира и не носи самоличност на повикващия), след това `OMNIROUTE_MCP_SCOPES`.

#### Обхват на маркер за достъп

`oma_live_…` токените (`src/lib/accessTokens/scopes.ts`) носят `read`, `write` или `admin`. `scopeSatisfies` е ранг: `admin` покрива `write` и `read`, а `write` покрива `read`. Неизвестните обхвати не покриват нищо.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) сравнява този ранг с `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` и `OPTIONS` изискват `read`.
- Всеки друг метод изисква `write`.
- Пътищата в `ADMIN_SCOPE_PREFIXES` изискват `admin` за всеки метод. `/api/mcp` е в този списък, така че `write` маркер за достъп все още не може да извика MCP HTTP повърхността.
- Пътищата в `ADMIN_MUTATION_PREFIXES` изискват `admin` само за мутации.
- Пътищата в `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) изискват `admin` само за мутации и само по този точен път — други `/api/settings/*` подмаршрути запазват `write`.

`PATCH /api/keys/{id}` е мутация и не е в тези администраторски списъци, така че `read` токен получава 403 `Access token scope 'read' is insufficient; 'write' required.` `write` или `admin` токен за достъп удовлетворява този маршрут. Таблото JWT, loopback CLI machine-id токен и API ключ с `manage` или `admin` вземат други разклонения и не се стесняват от този ранг.

Токен за достъп, който предава `scopeSatisfies` за `/api/mcp` е изчистил само вратата за управление. Извикванията на инструмента все още изпълняват `scopeMatches` срещу обхвати на API ключ. Рангът на токена за достъп не е вход за `scopeMatches`.

### обхват на инструмента MCP

Налагането на обхват е централизирано в `open-sse/mcp-server/scopeEnforcement.ts`. Всеки инструмент изисква специфични обхвати:

| Обхват                | Инструменти                                                                                                                                                                             |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                       |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                               |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                  |
| `read:quota`          | `check_quota`                                                                                                                                                                           |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                  |
| `read:models`         | `list_models_catalog`                                                                                                                                                                   |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                           |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                   |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                      |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                             |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                          |
| `read:cache`          | `cache_stats`                                                                                                                                                                           |
| `write:cache`         | `cache_flush`                                                                                                                                                                           |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                              |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                       |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                   |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                        |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                  |
| `read:memory`         | `memory_search`                                                                                                                                                                         |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                            |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                      |
| `write:skills`        | `skills_enable`                                                                                                                                                                         |
| `execute:skills`      | `skills_execute`                                                                                                                                                                        |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                        |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                 |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                               |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                        |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                          |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                      |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                         |
| `read:obsidian`       | 13 инструмента за четене — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 инструменти за писане — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                       |

Поддържат се обхвати със заместващи знаци: `read:*` предоставя всички обхвати за четене, `*` предоставя пълен достъп.

### `mcp:connect` — възможност за тесен маршрут (#7895)

Достигането до транспорта HTTP/SSE MCP (`/api/mcp/*`) от non-loopback изисква отделянето на `/api/mcp/` LOCAL_ONLY (вижте `docs/security/ROUTE_GUARD_TIERS.md`). Исторически това изрязване приема само пълен `manage`/`admin` -scope API ключ — твърде широк за обаждащ се, който трябва да говори само MCP. `src/shared/constants/managementScopes.ts` сега експортира `MCP_CONNECT_SCOPE = "mcp:connect"`: допълнителен, тесен обхват (същия прецедент като `SELF_USAGE_SCOPE`), който разрешава ONLY байпаса на `/api/mcp/` в `src/server/authz/policies/management.ts` — не предоставя друг достъп до маршрут за управление и съзнателно се запазва OUT на `MANAGEMENT_API_KEY_SCOPES`. Ключ, който държи `manage`/`admin` все още преминава през изрязването непроменен; `mcp:connect` е алтернатива с по-ниски привилегии за отдалечени обаждащи се само с MCP, проверени чрез `hasMcpConnectOrManageScope()`.

### Обвързване на HTTP обхват на ключ (#7895)

Над HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` вече разрешава реалния `api_keys.scopes` на повикващия чрез `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) и го предава на `transport.handleRequest(req, { authInfo })` на MCP SDK, така че `extra.authInfo.scopes` достигайки всяко извикване на инструмент, отразява собствените обхвати на ключа на носещия. `resolveCallerScopeContext()` на `scopeEnforcement.ts` вече даде приоритет `authInfo` пред `_meta` и `OMNIROUTE_MCP_SCOPES` env резервен — това попълва само този първи източник с най-висок приоритет, който преди това не е бил захранван през HTTP. Когато ключът API не се разреши (няма заглавка, невалиден ключ), `authInfo` остава `undefined` и разрешаването преминава към съществуващата верига `meta`/env непроменена. stdio няма идентичност на обаждащия се (вижте `mcpCallerIdentity.ts`) и не се влияе от обвързването на ключ — той пропуска стъпката `_meta` (`_meta` се зачита само в контекста на удостоверяване на HTTP, #15159) и разрешава само от ключа `OMNIROUTE_MCP_SCOPES` env.

**Изпълнението е принудително включено за HTTP/SSE повикващи с тесен обхват, независимо от `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` по подразбиране на `false` е безопасен само за local/stdio потока с един оператор, където няма идентичност на обаждащия се срещу обхват. `open-sse/mcp-server/server.ts::withScopeEnforcement()` включва прилагането на обхвата на инструмента безусловно (`shouldForceScopeEnforcement()` в `scopeEnforcement.ts`) всеки път, когато `resolveCallerScopeContext()` разреши `source === "authInfo"` (т.е. реален за ключ HTTP Authorization header, HTTP/SSE-only) AND този ключ не съдържа пълния обхват `manage`/`admin`. Това затваря празнината, при която ключ, който държи ONLY тесния обхват на `mcp:connect` заобикаляне — документиран по-горе като разрешаващ нищо друго освен `/api/mcp/` LOCAL_ONLY отделянето — може иначе да извика всеки MCP инструмент, след като оператор разреши remote/non-loopback MCP достъп, просто защото `OMNIROUTE_MCP_ENFORCE_SCOPES` изпраща `false` по подразбиране. Пълен ключ `manage`/`admin` над HTTP и всеки извикващ stdio/local запазва съществуващото поведение `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated непроменено.

---

## Променливи на средата

| Променлива                              | Стойност по подразбиране            | Предназначение                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :-------------------------------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`            | Базов URL адрес, който MCP сървърът използва при извикване на вътрешните API на OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_API_KEY`                     | (празно)                            | API ключ, препращан като `Authorization: Bearer` към вътрешните API извиквания                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (само `"true"` го активира) | Когато е активирано, липсващите обхвати блокират извикванията на инструменти и записват `scope_denied:<reason>` в журнала за одит. Прилагането СЪЩО се налага независимо от този флаг за всеки HTTP/SSE клиент, идентифициран чрез индивидуален Authorization header за ключ (`source === "authInfo"`), който няма пълен обхват `manage`/`admin` — например ключ, притежаващ само тесния обхват за заобикаляне `mcp:connect` — така че тази стойност по подразбиране е безопасна само за локалния/stdio режим с един оператор, но никога за отдалечен достъп извън loopback |
| `OMNIROUTE_MCP_SCOPES`                  | (празно)                            | Разделен със запетаи списък с разрешени обхвати, считани за „налични“ по подразбиране (използва се, когато клиентът не предоставя свои собствени обхвати)                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (незададено = включено)             | Когато е зададено на `0/false/off/no`, деактивира компресирането на описанията на MCP по време на регистрацията                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (незададено = включено)             | Алтернативен псевдоним за същата настройка като горната                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                             | Времеви лимит за прекратяване на вътрешни заявки за управление (състояние, устойчивост, комбинации, квота, използване)                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                             | Времеви лимит за прекратяване на стъпки, които изчакват доставчик (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_DENY`                         | (незададено = без филтър)           | Разделени със запетаи имена на инструменти, които да бъдат премахнати от `tools/list` (намаляване на броя инструменти — вижте по-долу)                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `MCP_TOOL_ALLOW`                        | (не е зададено = без филтър)        | Разделени със запетаи имена на инструменти, които да бъдат запазени изключително (режим със списък на разрешените — вижте по-долу)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `DATA_DIR`                              | `~/.omniroute`                      | Файлът за пулс се записва в `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

---

## Компресиране на описанията

Регистрите на MCP инструменти, подкани и ресурси могат да компресират описанията при регистрация/извеждане на списък, за да намалят обема на метаданните, предоставяни на клиентите (и следователно разхода за контекста на подкана). Реализацията се намира в `open-sse/mcp-server/descriptionCompressor.ts` и е свързана с MCP сървъра чрез `compressMcpRegistryMetadata` в `createMcpServer()`.

- Компресирането се прилага върху текста на описанието чрез набора от правила Caveman (`getRulesForContext("all", "full")`) с извличане на запазени блокове (фрагменти код, оградени блокове и т.н.), така че структурното съдържание да не бъде променяно.
- Превключва се за всяко внедряване чрез стойността `compression.mcpDescriptionCompressionEnabled` в таблицата с настройки `key_value` (по подразбиране: активирано) — достъпно в потребителския интерфейс като **Анализи → Компресиране на MCP описанията**.
- Превключва се за целия процес чрез `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` или `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Статистиките в реално време се предоставят чрез `omniroute_compression_status` под `analytics.mcpDescriptionCompression` и са маркирани с `source: "mcp_metadata_estimate"`, за да се разграничават от действителните отчети за потребление от доставчика.

---

## Намаляване на броя инструменти (F4.3)

Компресирането на описанията намалява метаданните на всеки инструмент; **намаляването на броя инструменти** отива една стъпка по-далеч, като намалява _броя_ на обявяваните инструменти. Обявяването на по-малко инструменти в манифеста `tools/list` намалява разхода на токени за всяка заявка, който моделът на клиента плаща за каталога с инструменти („слой 5“ на компресията). Реализацията представлява чист филтър без състояние в `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), включен в цикъла за регистриране в `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Активира се по избор и по подразбиране е изключено.** Филтърът се изпълнява само когато е зададена поне една от двете променливи на средата; ако нито една не е зададена, всичките 110 инструмента се обявяват без промяна.

| Променлива       | Режим                                                                                                                |
| :--------------- | :------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Черен списък — разделени със запетаи имена на инструменти, които винаги се премахват от `tools/list`                 |
| `MCP_TOOL_ALLOW` | Списък с разрешени — разделени със запетаи имена на инструменти; запазват се само те, а всички останали се премахват |

`deny` има приоритет пред `allow`. Имената са разделени със запетаи, интервалите около тях се премахват, а празните записи се игнорират. Примери:

```bash
# Премахване на два инструмента от каталога
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Обявяване само на инструментите за маршрутизиране и квоти (режим със списък с разрешени)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Как се премахват филтрираните инструменти:** регистрирането винаги е успешно; след това за инструмент, който профилът отхвърля, се извиква `.disable()` върху манипулатора на MCP SDK, така че той никога да не се появява в `tools/list`, но свързването остава непокътнато (чисто активиране/деактивиране без повторно регистриране). Парсерът на профила е `readMcpToolProfileFromEnv(process.env)`, който връща `null` (без филтриране), когато и двете променливи са празни.

По-богатата структура `ToolProfile` зад `reduceToolManifest` поддържа също филтриране чрез сечение на обхвати (`allowScopes`, със съпоставяне чрез заместващи символи от типа `read:*`) и детерминирано ограничение `maxTools`, но тези две настройки изискват пълния манифест по време на регистрирането и днес **не** са достъпни чрез променливите на средата (проследява се последваща задача за кука на ниво `tools/list`). `estimateManifestTokens()` може да се използва за сравняване на разхода на токени за манифеста преди и след намаляването.

---

## Периодичен сигнал за състоянието по време на изпълнение

Транспортът stdio записва информация за активността в `${DATA_DIR}/runtime/mcp-heartbeat.json` на всеки 5 секунди. Таблото (`/api/mcp/status`) прочита този файл заедно със състоянието на PID, за да определи `online`. Вместо това HTTP транспортите отчитат състоянието чрез вътрешнопроцесния `getMcpHttpStatus()` (без запис във файл).

Моментната снимка на периодичния сигнал съдържа:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Одитно регистриране

Всяко извикване на инструмент се записва в SQLite таблицата `mcp_tool_audit` от `open-sse/mcp-server/audit.ts`:

- Име на инструмента, аргументи (хеширани/съкратени според специфичното за инструмента `auditLevel`), резултат
- Продължителност в ms, флаг за успех/неуспех, съобщение за грешка (когато е приложимо)
- Хеш на API ключа, времеви печат
- Отказите за обхват се записват като `scope_denied:<reason>` със списъка на липсващите обхвати

Използвайте таблото или REST крайните точки `/api/mcp/audit` и `/api/mcp/audit/stats`, за да прегледате последните извиквания.

---

## Файлове

| Файл                                                                     | Предназначение                                                                         |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Фабрика за MCP сървър, входна точка за stdio, регистрации на инструменти с обхват      |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP транспорт (управление на сесии)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Оценяване на обхвата на инструментите и определяне на извикващата страна               |
| `open-sse/mcp-server/audit.ts`                                           | Одитно регистриране на извикванията на инструменти (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Записване на stdio heartbeat (`mcp-heartbeat.json`)                                    |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Компресиране на описанията за регистрите на инструменти / подкани / ресурси            |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod схеми + регистър на инструменти (`MCP_TOOLS`, 45 записа)                           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Манипулатори за инструменти от фаза 2 + кеш + 1proxy                                   |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Манипулатори за инструменти за компресиране                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Дефиниции на инструменти за памет (3 инструмента)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Дефиниции на инструменти за умения (4 инструмента)                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Дефиниции на инструменти за източник на контекст от Notion (6 инструмента)             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Дефиниции на инструменти за геймификация (8 инструмента)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Инструменти за регистриране и управление на приставки (8 инструмента)                  |
| `src/app/api/mcp/status/route.ts`                                        | Крайна точка `/api/mcp/status`                                                         |
| `src/app/api/mcp/tools/route.ts`                                         | Крайна точка `/api/mcp/tools`                                                          |
| `src/app/api/mcp/sse/route.ts`                                           | Маршрут за SSE транспорт `/api/mcp/sse`                                                |
| `src/app/api/mcp/stream/route.ts`                                        | Маршрут за Streamable HTTP транспорт `/api/mcp/stream`                                 |
| `src/app/api/mcp/audit/route.ts`                                         | Заявка към одитния регистър `/api/mcp/audit`                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Обобщени одитни показатели `/api/mcp/audit/stats`                                      |
| `src/lib/notion/api.ts`                                                  | Клиент за Notion REST API (повторни опити, време за изчакване, класификация на грешки) |
| `src/lib/db/notion.ts`                                                   | Съхраняване на Notion токени (таблица `key_value`)                                     |
| `src/app/api/settings/notion/route.ts`                                   | API за настройките на Notion (GET/POST/DELETE)                                         |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Потребителски интерфейс за управление на Notion токени                                 |
| `tests/unit/notion-api.test.ts`                                          | Тестове на клиента за Notion API (7)                                                   |
| `tests/unit/notion-tools.test.ts`                                        | Тестове за налагане на обхвата на инструментите за Notion (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Тестове на модула за базата данни на Notion (3)                                        |
