# OmniRoute MCP Server Documentation (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol server se 110 nástroji pro operace směrování, mezipaměti, komprese, paměti, dovedností, proxy, fondu, radaru a zdroje kontextu.
>
> Zdroj pravdy: `open-sse/mcp-server/server.ts` computes** 110 unikátních nástrojů** se `countUniqueMcpTools()`: 45 kanonických definic (včetně šesti nástrojů životního cyklu CCR, tria agent-skills, `omniroute_radar_catalog` a `omniroute_x_search`), plus paměť (3), dovednosti (4), dovednosti GitHub (3), pool (6), gamifikace (8), pluginy (8), Notion (6), Obsidian (22), nástroje pro lokální kompresi RTK-only (3),

## Instalace

OmniRoute MCP je vestavěný. Začněte s:

```bash
omniroute --mcp
```

Nebo prostřednictvím dopravy open-sse:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

Přenosy HTTP (`sse` / `streamable-http`, obsluhované v průběhu procesu serverem řídicího panelu) jsou ve výchozím nastavení vypnuty a dříve je bylo možné přepínat pouze ze stránky `/dashboard/mcp`. Od verze 3.8.51 má CLI paritu:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH stejné nastavení `mcpEnabled` (a volitelně `mcpTransport`) se přepíná pomocí `/api/settings`. `mcp restart` volá `POST /api/mcp/restart`: ruší aktivní relace `sse`/`streamable-http`, takže další požadavek se čistě znovu inicializuje, vrací `409` pokud je MCP zakázáno, a `501` pro přenos `stdio` (klienti stdio vlastní svůj vlastní podproces — neexistuje žádný popisovač procesu, který by se restartoval).

## Přepravy

Server MCP odhaluje tři transporty, všechny podporované stejnou továrnou `createMcpServer()` :

| Doprava           | Kde                                          | Kdy použít                                               |
| :---------------- | :------------------------------------------- | :------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | integrace IDE (Claude Desktop, Cursor atd.)              |
| `sse`             | `POST/GET /api/mcp/sse` přes `httpTransport` | klienti Browser/agent, kteří potřebují stream událostí   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Klienti HTTP s více relacemi (záhlaví `mcp-session-id` ) |

Aktivní transport HTTP (`sse` nebo `streamable-http`) je vybrán nastavením `mcpTransport`. Přepínání přenosů ukončí existující relace na druhém přenosu.

### Vzdálený přístup (bypass správy rozsahu)

`/api/mcp/*` je ve výchozím nastavení ve vrstvě LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — mohou dosáhnout pouze hostitelé zpětné smyčky (`localhost`, `127.0.0.1`, `::1`). Od verze 3.8.2 se mohou klienti bez zpětné smyčky připojit, pokud předloží `Authorization: Bearer <api-key>`, jehož klíč nese rozsah `manage`. Toto je jediný způsob, jak dosáhnout vzdáleného serveru MCP prostřednictvím tunelu, reverzního proxy nebo veřejného názvu hostitele.

```bash
# Grant manage scope: open the dashboard API Keys page and toggle
# "Management Access" on the key, or POST scopes:["manage"] when creating.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Nespravovací klíč (nebo žádný nosič) vrací `403 LOCAL_ONLY`. Sourozenecká předpona `/api/cli-tools/runtime/*` je záměrně NOT obejitelná — viz [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Ověření původu

Po autentizaci má každý požadavek na `/api/mcp/*` — přenosy a cesty správy, jako jsou `status`, `tools`, `audit` a `restart` — ověřeno záhlaví `Origin`, bez ohledu na volajícího (klíč API, token CLI, relace řídicího panelu nebo anonymní smyčka s deaktivovaným přihlášením). Toto je ochrana DNS-rebinding, kterou vyžaduje specifikace MCP Streamable HTTP.

- **Žádná hlavička `Origin`** → povoleno. Klienti OmniRoute CLI, SDK a IDE žádný neodesílají.
- **Povoleno `Origin`** → `localhost`, `127.0.0.1` nebo `[::1]` na libovolném portu nebo vlastní veřejný původ OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, předaný původ důvěryhodného reverzního proxy (`OMNIROUTE_TRUST_PROXY`, pouze když není nastaven žádný základní URL ) nebo přímý hostitel loopback/LAN IP. Samotná hlavička `Host` nikdy nečiní původ důvěryhodným.
- **Jakékoli jiné `Origin`, včetně `null`** → `403` s tělem chyby JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Relace řídicího panelu, která představuje platný token CSRF, je stále přijímána, stejně jako u jiných zápisů na řídicí panel.

Klient MCP prohlížeče obsluhovaný za reverzním proxy potřebuje `OMNIROUTE_PUBLIC_BASE_URL`; neexistuje žádný seznam povolených pro jiné zdroje. CORS preflight (`OPTIONS`) není kontrolován původem; požadavek, který následuje, je.

## Konfigurace IDE

Viz [Konfigurace klienta MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) pro nastavení Claude Desktop, Cursor, Cline a kompatibilního klienta MCP.

---

## Základní nástroje (14) — Fáze 1

| Nástroj                         | Rozsahy               | Popis                                                                                                                                |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Doba provozuschopnosti, paměť, jističe, limity rychlosti, statistiky mezipaměti                                                      |
| `omniroute_list_combos`         | `read:combos`         | Všechna nakonfigurovaná komba se strategiemi (volitelné metriky)                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriky výkonu pro konkrétní kombinaci                                                                                               |
| `omniroute_switch_combo`        | `write:combos`        | Aktivujte nebo deaktivujte kombo                                                                                                     |
| `omniroute_create_combo`        | `write:combos`        | Vytvořte ověřené kombo prostřednictvím existujícího komba API                                                                        |
| `omniroute_check_quota`         | `read:quota`          | Kvóta used/total, zbývající procento, čas resetování, stav tokenu                                                                    |
| `omniroute_route_request`       | `execute:completions` | Odešlete dokončení chatu přes směrování OmniRoute                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | Přehled nákladů podle období (session/day/week/month)                                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Kompletní katalog modelů se schopnostmi, stavem, cenou                                                                               |
| `omniroute_radar_catalog`       | `read:radar`          | Místní podepsaný katalog radarů; volitelné filtry provider/family                                                                    |
| `omniroute_tool_search`         | `read:tools`          | Objevte nástroje z registrovaného katalogu MCP                                                                                       |
| `omniroute_web_search`          | `execute:search`      | Vyhledávání na webu prostřednictvím nakonfigurovaných poskytovatelů vyhledávání. Ne X/Twitter.                                       |
| `omniroute_x_search`            | `execute:search`      | Prohledejte X přes xAI/SuperGrok nebo zvolte `xquik-search` pro výsledky Xquik API. Vyžaduje přihlašovací údaje pro vybraný backend. |
| `omniroute_web_fetch`           | `execute:search`      | Načítání webového obsahu prostřednictvím nakonfigurovaných poskytovatelů načítání                                                    |

## Pokročilé nástroje (11) — Fáze 2

| Nástroj                            | Rozsahy                              | Popis                                                                                                    |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulace směrování nasucho s nouzovým stromem                                                            |
| `omniroute_set_budget_guard`       | `write:budget`                       | Rozpočet relace s akcí degrade/block/alert                                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aktualizovat kombinovanou strategii za běhu (priority/weighted/auto/etc.)                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Použijte předvolbu odolnosti `aggressive` / `balanced` / `conservative`                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Živý test každého poskytovatele v kombinaci pomocí skutečného upstream hovoru                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriky na poskytovatele s latencí p50/p95/p99 a stavem jističe                                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Doporučit combo podle typu úkolu s omezeními budget/latency                                              |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Vysvětlete, proč byl požadavek směrován k poskytovateli (hodnotící faktory + záložních reklam)           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Úplný snímek relace: cena, tokeny, nejvyšší models/providers, chyby, strážce rozpočtu                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostikujte (a případně automaticky opravte) posun databáze jako nefunkční combo refs / osiřelé řádky |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronizace cenových dat z externích zdrojů (LiteLLM); podporuje `dryRun`                              |

## Nástroje mezipaměti (2)

| Nástroj                 | Rozsahy       | Popis                                                     |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Sémantická cache, prompt-cache a statistiky idempotence   |
| `omniroute_cache_flush` | `write:cache` | Vyprázdnit mezipaměť globálně nebo pomocí signature/model |

## Kompresní nástroje (13)

| Nástroj                             | Rozsahy             | Popis                                                                                                                 |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavení komprese, shrnutí analýzy a statistiky s mezipamětí (včetně metadat `analytics.mcpDescriptionCompression` ) |
| `omniroute_compression_configure`   | `write:compression` | Nakonfigurujte režim komprese, práh, cílový poměr, zachování systémových pokynů, přepínač komprese popisu MCP         |
| `omniroute_set_compression_engine`  | `write:compression` | Vyberte aktivní motor (off/caveman/rtk/stacked) a intenzitu Caveman/RTK                                               |
| `omniroute_list_compression_combos` | `read:compression`  | Seznam pojmenovaných kompresních komb a jejich motorových potrubí                                                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Analýza seskupená podle kombinace komprese a motoru                                                                   |
| `omniroute_ccr_store`               | `write:compression` | Uložte obsah izolovaný od volajícího do ohraničeného úložiště CCR v paměti a vraťte značku plus referenci `ccr://`    |
| `omniroute_ccr_retrieve`            | `read:compression`  | Získejte obsah CCR v plném rozsahu nebo s režimy hlava, ocas, linie, grep a statistiky                                |
| `omniroute_ccr_inspect`             | `read:compression`  | Zkontrolovat metadata CCR vlastněná volajícím bez vracení obsahu                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Seznam stránkovaných metadat pro bloky CCR vlastněné volajícím                                                        |
| `omniroute_ccr_delete`              | `write:compression` | Smazat blok CCR vlastněný volajícím                                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | Hlásit využití paměti v rozsahu volajícího, počítadla životního cyklu a limity úložiště                               |
| `omniroute_rtk_discover`            | `read:compression`  | Objevte opakující se šum v volitelných výstupních vzorcích RTK                                                        |
| `omniroute_rtk_learn`               | `read:compression`  | Vygenerujte zkontrolovatelný koncept filtru RTK z volitelných vzorků                                                  |

Záznamy CCR používají dvouvrstvé úložiště: horká vrstva v paměti podporovaná na lokálních necloudových runtimech trvalou vrstvou SQLite (`ccr_blocks`, ve výchozím nastavení zapnuto), takže blok přežije vystěhování nebo restart, dokud jeho TTL nedojde — kromě bloků nad 512 KB a cloudových runtime, které zůstávají pouze v paměti. Každý blok je omezen na 2 MiB, každý hlavní na 16 MiB a globální úložiště na 64 MiB. Výchozí nastavení položek je 24hodinový TTL (maximálně sedm dní). Plné načtení MCP je omezeno na 256 KiB; větší bloky zůstávají dostupné prostřednictvím režimů ranged a grep. Úložiště, načítání, výpis, kontrola, mazání a statistiky jsou izolovány autentizovaným principem klíče API. Záznamy auditu obsahují hash a metadata velikosti, nikoli obsah. Podrobnosti týkající se operátora (dvě značky, předpoklady klienta, `codemode:false`, rozsahy pro jednotlivé nástroje, stránkování a diagnostická matice) jsou k dispozici v [Compression Engines → Předpoklady / příručka operátora](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` hlásí kompresi popisu MCP samostatně pod `analytics.mcpDescriptionCompression`. Tyto hodnoty jsou odhady velikosti metadat pro popisy v seznamu MCP (`tools`, `prompts`, `resources` a `resourceTemplates`); nejedná se o potvrzení o používání poskytovatele a jsou označeny `source: "mcp_metadata_estimate"`.

### MCP stromový filtr přístupnosti (v3.8.0)

Odděleně od výše uvedených kompresních nástrojů obsahuje OmniRoute filtr po spuštění, který komprimuje soubor** výsledky nástroje** nástrojů MCP browser/accessibility než budou vráceny agentovi. Tento filtr sám o sobě není nástrojem — spouští se transparentně na jakémkoli výsledku nástroje, který obsahuje podrobný strom přístupnosti nebo text snímku prohlížeče (≥ 2000 znaků).

Klíčové chování:

- Sbalí ≥ 30 po sobě jdoucích opakovaných sourozeneckých linií do souhrnu hlavy + ocasu
- Zachovává kotvy `[ref=eXX]` požadované Playwright/computer-use
- Pevně zkrátí příliš velký text (> 50 000 znaků) s navigační nápovědou
- Očekávané úspory:** 60–80 %** na užitečné zatížení snímků prohlížeče

Konfigurace: `compression.mcpAccessibility` v globálním nastavení (migrace 056). Realizace: `open-sse/services/compression/engines/mcpAccessibility/`. Úplné dokumenty: [Kompresní stroje — MCP Stromový filtr přístupnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Viz [Compression Engines](../compression/COMPRESSION_ENGINES.md) a [RTK Compression](../compression/RTK_COMPRESSION.md) pro běhový model komprese za těmito nástroji.

## 1Proxy Tools (3)

| Nástroj                     | Rozsahy        | Popis                                                                               |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Získejte zdarma proxy z tržiště 1 proxy (filtry protocol/country/quality/limit )    |
| `omniroute_oneproxy_rotate` | `read:proxies` | Získejte další dostupný proxy podle strategie (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistiky fondu, stav synchronizace, distribuce podle protokolu a země             |

## Paměťové nástroje (3)

Definováno v `open-sse/mcp-server/tools/memoryTools.ts`. Auth/scope se vynucuje prostřednictvím standardního potrubí rozsahu MCP.

| Nástroj                   | Rozsahy        | Popis                                                                                          |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Prohledávejte paměti podle dotazu / typu / klíče API s vynucením tokenového rozpočtu           |
| `omniroute_memory_add`    | `write:memory` | Přidat nový záznam paměti (`factual` / `episodic` / `procedural` / `semantic`)                 |
| `omniroute_memory_clear`  | `write:memory` | Vymazat paměti pro klíč API, volitelně filtrované podle typu nebo časového razítka `olderThan` |

## Dovednostní nástroje (4)

Definováno v `open-sse/mcp-server/tools/skillTools.ts`. Podporováno `src/lib/skills/registry` + `src/lib/skills/executor`.

| Nástroj                       | Rozsahy          | Popis                                                                                                |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Seznam registrovaných dovedností s volitelným filtrováním podle klíče API, názvu nebo stavu povolení |
| `omniroute_skills_enable`     | `write:skills`   | Povolte nebo zakažte konkrétní dovednost pomocí ID                                                   |
| `omniroute_skills_execute`    | `execute:skills` | Proveďte dovednost s poskytnutým vstupem a vraťte záznam o provedení                                 |
| `omniroute_skills_executions` | `read:skills`    | Seznam nedávné historie provádění dovedností                                                         |

## Notion kontextový zdroj (6)

Definováno v `open-sse/mcp-server/tools/notionTools.ts`. Token uložený v tabulce `key_value` prostřednictvím `src/lib/db/notion.ts`. REST klient v `src/lib/notion/api.ts`. Nastavení API v `src/app/api/settings/notion/route.ts`. Palubní deska UI v `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Nakonfigurujte svůj integrační token Notion z** Kontextové zdroje** kartu na řídicím panelu Endpoint nebo prostřednictvím REST API:

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Nástroj                      | Rozsahy        | Popis                                                                 |
| :--------------------------- | :------------- | :-------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fulltextové vyhledávání napříč všemi stránkami a databázemi           |
| `notion_get_page`            | `read:notion`  | Získejte stránku od ID s jejími vlastnostmi                           |
| `notion_list_block_children` | `read:notion`  | Vypište podřízené bloky stránky nebo bloku                            |
| `notion_query_database`      | `read:notion`  | Dotaz na databázi pomocí filtrů, řazení a stránkování                 |
| `notion_get_database`        | `read:notion`  | Získejte schéma databáze pomocí ID                                    |
| `notion_append_blocks`       | `write:notion` | Připojit podřízené bloky k rodičovskému bloku (max. 100 na požadavek) |

## Nástroje katalogu dovedností agentů (3)

Definováno v `open-sse/mcp-server/tools/agentSkillTools.ts`. Podporováno `src/lib/agentSkills/catalog`. Tyto nástroje zpřístupňují 45položkový dokumentační katalog dovedností agentů klientům MCP a externím agentům. Rozsah: `read:catalog`.

| Nástroj                           | Rozsahy        | Popis                                                                                                                          |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Seznam všech 45 dovedností agentů s volitelnými filtry `category` (api\| cli) a `area` ; vrátí pokrytí metadat +               |
| `omniroute_agent_skills_get`      | `read:catalog` | Získejte úplný obsah metadat + SKILL.md pro jednu dovednost od canonical `id`                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistiky pokrytí: kolik z dovedností 23 API, 21 CLI a 1 config má soubory SKILL.md v souborovém systému vs součty v katalogu |

Podívejte se na [AGENT-SKILLS.md](./AGENT-SKILLS.md) pro celý katalog a jak jej externí agenti využívají.

## Související rámce (v3.8.0)

Výše uvedený inventář nástrojů MCP (110 jedinečných nástrojů, počítá `countUniqueMcpTools()`) je záměrně omezen na operace routing/cache/compression/memory/skills/proxy/context-source za běhu. Dva sousední rámce se dodávají spolu se serverem MCP ve verzi 3.8.0 a jsou dokumentovány samostatně:

### Cloud Agenti

Cloud Agenti jsou mimoprocesní kódovací agenti AI (codex-cloud, kurzor-cloud, devin, jules) zapojení do OmniRoute prostřednictvím stejného modelu připojení, jaký používají poskytovatelé LLM. Jsou vystaveny prostřednictvím vlastního povrchu REST (`/api/v1/agents/*`) a jsou** ne** část katalogu nástrojů MCP — volání Cloud Agent nespotřebovává rozsah MCP.

- Implementace: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životní cyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentace: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Zábradlí

Ochranné zábradlí jsou filtry pre/post-execution (Vision-bridge, pii-masker, prompt-injection) aplikované uvnitř kanálu chatu. Spouštějí se před dosažením vrstvy MCP tool/route a vysílají strukturovaná porušení do kanálu auditu; nejsou vyvolány jako nástroje MCP.

- Realizace: `src/lib/guardrails/`.
- Dokumentace: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Při ladění volání MCP, které se zdá být zablokované, zkontrolujte jak protokol auditu MCP (záznamy `scope_denied:*` ), tak audit trail — požadavek může být odmítnut zábradlím** před** vždy dosáhne úrovně vynucování rozsahu MCP.

---

## REST API Koncové body

| Koncový bod            | Metoda                | Popis                                                                                                   | Auth                   |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------- |
| `/api/mcp/status`      | `GET`                 | Stav serveru: prezenční signál, stav přenosu HTTP, shrnutí aktivity auditu                              | řízení (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog nástrojů (název, popis, rozsahy, fáze, zdrojové koncové body)                                   | Řízení                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transportní koncový bod (omezený `mcpEnabled` + `mcpTransport === "sse"`)                           | API klíč + rozsahy     |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamovatelný přenos HTTP (používá záhlaví `mcp-session-id` ; `DELETE` ukončí relaci)                  | API klíč + rozsahy     |
| `/api/mcp/audit`       | `GET`                 | Záznamy protokolu auditu ze `mcp_tool_audit` (filtry: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Řízení                 |
| `/api/mcp/audit/stats` | `GET`                 | Agregované statistiky auditu (`totalCalls`, `successRate`, `avgDurationMs`, nejlepší nástroje)          | Řízení                 |

Zdrojové soubory: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Přenosy SSE i Streamable HTTP jsou blokovány, dokud není server MCP povolen v Nastavení (`mcpEnabled`) a není vybrán příslušný `mcpTransport`. Pokud je nakonfigurován nesprávný přenos, cesta vrátí HTTP 400 s nápovědou k přepnutí nastavení.

---

## Autentizace a rozsahy

Volání nástroje MCP čtou řetězce oboru od volajícího. Tato kontrola je jedním ze tří nezávislých jmenných prostorů. Přihrávka od jedné dámy není přihrávkou od ostatních. Pravidla jsou [tři obory názvů](#three-scope-namespaces). Katalog nástrojů je [rozsahy nástrojů MCP](#mcp-tool-scopes).

### Tři obory názvů

`manage` na klíči API, `read:compression` na nástroji MCP a `read` na přístupovém tokenu `oma_live_…` jsou tři různé granty. Volající, kteří pošlou přístupový token `read` na mutující trasu správy, dostanou HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Tato hodnost je `scopeSatisfies`. Nenahlíží do tabulky MCP a MCP matcher ji nenahlíží.

| Jmenný prostor       | Pověření                                                                       | Dáma                    | Průchod umožňuje                                           |
| :------------------- | :----------------------------------------------------------------------------- | :---------------------- | :--------------------------------------------------------- |
| Správa klíčů API     | `api_keys.scopes`                                                              | `hasManageScope`        | Management REST pro tento klíč nosiče                      |
| Aditivum klíče API   | stejné pole, jeden přesný řetězec                                              | níže jmenovaný pomocník | Pouze jedna schopnost                                      |
| rozsahy nástrojů MCP | stejné pole, jinak MCP `_meta` (pouze HTTP/SSE ), jinak `OMNIROUTE_MCP_SCOPES` | `scopeMatches`          | Tento nástroj, jakmile bude vymáhání zapnuto               |
| Přístupový token     | `oma_live_…`                                                                   | `scopeSatisfies`        | Cesta správy, jejíž metoda a cesta vyžadují toto hodnocení |

Ražba každého pověření je zahrnuta v [Autentizaci pro správu](../guides/MANAGEMENT-AUTH.md).

#### Rozsahy klíčů API

Jedno pole `api_keys.scopes` napájí dvě úlohy. Používají různé funkce.

**Management REST.** `manage` a `admin` jsou členy `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` je to, co autorizuje cesty správy pro tento klíč. `admin` je na těchto trasách schopný správy. Slovo `admin` zde nepředstavuje hodnost přístupového tokenu a nerozšiřuje se do rozsahu nástrojů MCP.

**Aditivní struny.** Každý z nich je přesným testem členství a každý zůstává mimo `MANAGEMENT_API_KEY_SCOPES`.

| Rozsah                         | Průchod umožňuje                                                                                                                                                         |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Pouze vyříznutí `/api/mcp/` LOCAL_ONLY bez zpětné smyčky (`hasMcpConnectOrManageScope`). Klíč se `manage` nebo `admin` stále prochází tímto vyříznutím.                  |
| `self:usage`                   | `GET /api/v1/me/status` pro tento klíč (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` přidá tento rozsah při vytvoření (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Kvóty upstreamových účtů uvnitř této stavové zátěže (`src/lib/usage/apiKeySelfService.ts`). Stavová cesta stále vyžaduje `self:usage`.                                   |
| `policy:bypass-provider-quota` | Volání odvození tohoto klíče přeskakují zásady kvóty poskytovatele (`hasProviderQuotaBypassScope` v `src/sse/handlers/chat.ts`).                                         |

#### Vhodný

Katalog je tabulka pod [rozsahy nástrojů MCP](#mcp-tool-scopes). Nepovažujte `MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts` za katalog: je to původní typovaná podmnožina. Pozdější nástroje vedle něj deklarují další rozsahy (`read:notion`, `read:skills`, `read:local-corpus` a zbytek tabulky).

`evaluateToolScopes` v `open-sse/mcp-server/scopeEnforcement.ts` umožňuje volání, když každý požadovaný rozsah odpovídá některému udělenému rozsahu:

- `*` odpovídá každému požadovanému rozsahu.
- Udělený rozsah, který končí na `*` odpovídá požadovanému rozsahu, který začíná předponou před hvězdičkou. `read:*` odpovídá `read:compression`.
- Každý další přidělený rozsah odpovídá pouze identickému požadovanému řetězci.

Klíč, jehož rozsahy jsou `["manage"]`, selže `scopeMatches` pro `read:compression`. Stejné volání selže pro `admin`, `mcp:connect`, `read` a `write` pokud jsou to jediné přidělené řetězce. Neexistuje žádná hierarchie mezi rozsahy nástrojů MCP za koncovým `*`.

Vynucení je vypnuto, pokud není `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (výchozí `false`). Když je vypnuto, `evaluateToolScopes` povolí volání a přeskočí katalog. Když je HTTP zapnuto, používá `api_keys.scopes` nosného klíče jako `authInfo` (viz [Vazba rozsahu HTTP na klíč](#per-key-http-scope-binding-7895) ). Když se nevyřeší žádné klíčové rozsahy, udělená sada spadne na MCP `_meta` (uplatňuje se pouze pro volající HTTP/SSE, v kontextu auth HTTP ; `_meta` volajícího stdio je ignorován, protože jej ovládá klient a nenese žádnou identitu pro volajícího), pak `OMNIROUTE_MCP_SCOPES`.

#### Rozsahy přístupových tokenů

žetony `oma_live_…` (`src/lib/accessTokens/scopes.ts`) nesou `read`, `write` nebo `admin`. `scopeSatisfies` je hodnost: `admin` pokrývá `write` a `read` a `write` pokrývá `read`. Neznámé rozsahy nepokrývají nic.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) porovnává toto hodnocení se `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` a `OPTIONS` vyžadují `read`.
- Každá další metoda vyžaduje `write`.
- Cesty v `ADMIN_SCOPE_PREFIXES` vyžadují pro každou metodu `admin`. `/api/mcp` je na tomto seznamu, takže přístupový token `write` stále nemůže volat povrch MCP HTTP.
- Cesty v `ADMIN_MUTATION_PREFIXES` vyžadují `admin` pouze pro mutace.
- Cesty v `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) vyžadují `admin` pouze pro mutace a pouze na této přesné cestě — ostatní `/api/settings/*` podcesty uchovávají `write`.

`PATCH /api/keys/{id}` je mutace a není na těchto seznamech správců, takže token `read` obdrží 403 `Access token scope 'read' is insufficient; 'write' required.` Přístupový token `write` nebo `admin` vyhovuje této cestě. Řídicí panel JWT, token CLI machine-id zpětné smyčky a klíč API se `manage` nebo `admin` přebírají další větve a nejsou zúženy o tuto úroveň.

Přístupový token, který předává `scopeSatisfies` pro `/api/mcp` vyčistil pouze bránu pro správu. Volání nástrojů stále běží `scopeMatches` proti rozsahům klíče API. Hodnocení přístupového tokenu není vstupem do `scopeMatches`.

### rozsahy nástrojů MCP

Vynucení rozsahu je centralizováno v `open-sse/mcp-server/scopeEnforcement.ts`. Každý nástroj vyžaduje specifické rozsahy:

| Rozsah                | Nástroje                                                                                                                                                                             |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | 13 nástrojů pro čtení — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 nástroje pro zápis — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Jsou podporovány obory zástupných znaků: `read:*` uděluje všechny rozsahy čtení, `*` uděluje plný přístup.

### `mcp:connect` — schopnost úzké trasy (#7895)

Dosažení transportu HTTP/SSE MCP (`/api/mcp/*`) z non-loopback vyžaduje `/api/mcp/` LOCAL_ONLY carve-out (viz `docs/security/ROUTE_GUARD_TIERS.md`). Historicky toto vyčlenění akceptovalo pouze plné `manage`/`admin` -scope API klíč — příliš široký pro volajícího, který potřebuje pouze mluvit MCP. `src/shared/constants/managementScopes.ts` nyní exportuje `MCP_CONNECT_SCOPE = "mcp:connect"`: aditivní, úzký rozsah (stejný precedens jako `SELF_USAGE_SCOPE`), který povoluje ONLY obejít `/api/mcp/` v `src/server/authz/policies/management.ts` — neuděluje žádný jiný přístup ke správě-routě a je záměrně zachován OUT `MANAGEMENT_API_KEY_SCOPES`. Klíč držící `manage`/`admin` stále prochází vyříznutím beze změny; `mcp:connect` je alternativa s nižším oprávněním pro vzdálené volající pouze MCP, kontrolovaná přes `hasMcpConnectOrManageScope()`.

### Vazba rozsahu HTTP na klíč (#7895)

Přes HTTP/SSE nyní `open-sse/mcp-server/httpTransport.ts` rozlišuje skutečné `api_keys.scopes` volajícího přes `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) a předává jej MCP `transport.handleRequest(req, { authInfo })` SDK, takže `extra.authInfo.scopes` dosažení každého volání nástroje odráží vlastní rozsahy nosné klávesy. `scopeEnforcement.ts` `resolveCallerScopeContext()` již upřednostnil `authInfo` před `_meta` a `OMNIROUTE_MCP_SCOPES` env záložní — tím se naplní pouze první zdroj s nejvyšší prioritou, který byl dříve nenapájen před HTTP. Když se nevyřeší žádný klíč API (žádné záhlaví, neplatný klíč), `authInfo` zůstane `undefined` a rozlišení spadne do stávajícího řetězce `meta`/ env beze změny. stdio nemá žádnou identitu pro volajícího (viz `mcpCallerIdentity.ts`) a není ovlivněno vazbou na klíč — přeskočí krok `_meta` (`_meta` je respektováno pouze v kontextu ověřování HTTP, #15159) a rozlišuje se pouze z klíče env `OMNIROUTE_MCP_SCOPES`.

**Vynucení je vynuceno pro uživatele HTTP/SSE s úzkým rozsahem bez ohledu na `OMNIROUTE_MCP_ENFORCE_SCOPES`.** Výchozí nastavení `OMNIROUTE_MCP_ENFORCE_SCOPES` na `false` je bezpečné pouze pro tok local/stdio s jedním operátorem, kde neexistuje žádná identita pro každého volajícího, která by se dala použít. `open-sse/mcp-server/server.ts::withScopeEnforcement()` bezpodmínečně zapne vynucení rozsahu pro jednotlivé nástroje (`shouldForceScopeEnforcement()` v `scopeEnforcement.ts`), kdykoli `resolveCallerScopeContext()` vyřeší `source === "authInfo"` (tj. skutečná hlavička HTTP autorizace na klíč, HTTP/SSE-only) AND tento klíč neobsahuje plný rozsah `manage`/`admin`. Tím se uzavírá mezera, kdy klíč držící ONLY úzký rozsah `mcp:connect` bypassu — dokumentovaný výše jako autorizující nic jiného než `/api/mcp/` LOCAL_ONLY carve-out — by jinak mohl vyvolat každý nástroj MCP jakmile operátor povolil přístup remote/non-loopback MCP, jednoduše proto, že `OMNIROUTE_MCP_ENFORCE_SCOPES` standardně dodává `false`. Úplný klíč `manage`/`admin` přes HTTP a každý volající stdio/local udrží stávající chování `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated nezměněné.

---

## Proměnné prostředí

| Variabilní                              | Výchozí                              | Účel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | Základní URL kterou server MCP používá při volání OmniRoute interního APIs                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_API_KEY`                     | (prázdný)                            | API klíč přesměrován jako `Authorization: Bearer` na interní API volání                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (pouze `"true"` to umožňuje) | Pokud je povoleno, chybějící rozsahy odmítají volání nástroje a zaznamenávají `scope_denied:<reason>` do protokolu auditu. Vynucení je vynuceno ALSO bez ohledu na tento příznak pro libovolného volajícího HTTP/SSE vyřešeného z hlavičky autorizace na klíč (`source === "authInfo"`), která postrádá plný rozsah `manage`/`admin` — např. klíč obsahující pouze úzký rozsah obcházení `mcp:connect` — takže toto výchozí nastavení je bezpečné pouze pro tok local/stdio s jedním operátorem, nikdy pro vzdálený přístup bez zpětné smyčky |
| `OMNIROUTE_MCP_SCOPES`                  | (prázdný)                            | Čárkami oddělený seznam povolených rozsahů považovaných ve výchozím nastavení za „dostupné“ (používá se, když volající neposkytne své vlastní rozsahy)                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (zrušit = zapnuto)                   | Při nastavení na `0/false/off/no` deaktivuje kompresi popisu MCP v době registrace                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (zrušit = zapnuto)                   | Alternativní alias pro stejný přepínač jako výše                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Zrušit rozpočet pro čtení interní správy (zdraví, odolnost, kombinace, kvóta, využití)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Zrušit rozpočet pro skoky, které čekají na poskytovatele (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `MCP_TOOL_DENY`                         | (nenastaveno = bez filtru)           | Názvy nástrojů oddělené čárkami, které se mají vypustit z `tools/list` (snížení mohutnosti nástroje — viz níže)                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `MCP_TOOL_ALLOW`                        | (nenastaveno = bez filtru)           | Názvy nástrojů oddělené čárkami, které se mají uchovávat výhradně (režim seznamu povolených — viz níže)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DATA_DIR`                              | `~/.omniroute`                       | Soubor prezenčního signálu je zapsán do `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

---

## Popis Komprese

Registry nástrojů, výzev a zdrojů MCP mohou komprimovat popisy v čase registration/list, aby se snížila stopa metadat vystavená klientům (a tedy náklady na kontext promptní). Implementace žije v `open-sse/mcp-server/descriptionCompressor.ts` a je připojena k serveru MCP přes `compressMcpRegistryMetadata` uvnitř `createMcpServer()`.

- Komprese probíhá nad textem popisu pomocí sady pravidel Caveman (`getRulesForContext("all", "full")`) s extrakcí zachovaných bloků (rozpětí kódu, oplocené bloky atd.), takže strukturální obsah není změněn.
- Přepnout na jednotlivá nasazení pomocí hodnoty `compression.mcpDescriptionCompressionEnabled` v tabulce nastavení `key_value` (výchozí: povoleno) — vystavené v UI jako** Analytická → MCP komprese popisu** .
- Přepínání v rámci celého procesu buď pomocí `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` nebo `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistiky v reálném čase se zobrazují prostřednictvím `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` a označeny `source: "mcp_metadata_estimate"`, aby se odlišily od skutečných příjmů poskytovatele.

---

## Snížení mohutnosti nástroje (F4.3)

Komprese popisu zmenší metadata každého nástroje;** snížení kardinality nástroje** jde ještě o krok dále tím, že snižuje _počet_ nástrojů, které jsou vůbec oznámeny. Inzerce menšího počtu nástrojů v manifestu `tools/list` snižuje náklady na token za požadavek, které klientský model platí za katalog nástrojů (komprese „vrstvy 5“). Implementace je čistý, bezstavový filtr v `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), zapojený do registrační smyčky v `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Přihlásit se, ve výchozím nastavení vypnuto.** Filtr se spustí pouze v případě, že je nastavena alespoň jedna ze dvou proměnných prostředí; u žádné sady je všech 110 nástrojů oznámeno beze změny.

| Variabilní       | Režim                                                                                          |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Černá listina názvů nástrojů — oddělených čárkami, které jsou vždy odstraněny ze `tools/list`  |
| `MCP_TOOL_ALLOW` | Seznam povolených — názvy nástrojů oddělených čárkami; přežijí pouze tyto, vše ostatní zanikne |

`deny` má přednost před `allow`. Jména jsou oddělena čárkami, oříznuta a prázdné položky jsou ignorovány. Příklady:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Jak jsou filtrované nástroje odstraněny:** registrace vždy proběhne úspěšně; nástroj, který profil odmítne, je pak `.disable()` d na rukojeti MCP SDK, takže se nikdy neobjeví v `tools/list`, ale kabeláž zůstane nedotčena (čisté enable/disable, bez opětovné registrace). Analyzátor profilu je `readMcpToolProfileFromEnv(process.env)`, který vrací `null` (bez filtrování), když jsou obě proměnné prázdné.

Bohatší tvar `ToolProfile` za `reduceToolManifest` také podporuje filtrování protínání rozsahů (`allowScopes`, s shodu zástupných znaků `read:*` -style ) a deterministické omezení `maxTools`, ale tyto dva knoflíky potřebují úplný manifest v době registrace a jsou** ne** vystaveny prostřednictvím proměnných prostředí dnes ( `tools/list` -level hook je sledované pokračování). `estimateManifestTokens()` je k dispozici pro porovnání nákladů na token před a po snížení.

---

## Runtime Heartbeat

Přenos stdio zachovává živost do `${DATA_DIR}/runtime/mcp-heartbeat.json` každých 5 sekund. Řídicí panel (`/api/mcp/status`) čte tento soubor plus živost PID pro odvození `online`. HTTP místo toho přenáší stav zprávy z probíhajícího `getMcpHttpStatus()` (žádný zápis do souboru).

Snímek srdečního tepu obsahuje:

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

## Protokolování auditu

Každé volání nástroje je zaznamenáno do tabulky SQLite `mcp_tool_audit` pomocí `open-sse/mcp-server/audit.ts`:

- Název nástroje, argumenty (hashed/truncated jako per-tool `auditLevel`), výsledek
- Doba trvání v ms, příznak success/failure, chybová zpráva (je-li k dispozici)
- hash klíče API, časové razítko
- Odmítnutí rozsahu jsou protokolována jako `scope_denied:<reason>` s chybějícím seznamem rozsahů

Ke kontrole nedávných hovorů použijte řídicí panel nebo koncové body `/api/mcp/audit` a `/api/mcp/audit/stats` REST.

---

## Soubory

| Soubor                                                                   | Účel                                                               |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP server factory, stdio vstupní bod, rozsah registrace nástrojů  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamovatelný přenos HTTP (správa relace)                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Vyhodnocení rozsahu nástroje a rozlišení volajícího                |
| `open-sse/mcp-server/audit.ts`                                           | Protokolování auditu volání nástroje (`mcp_tool_audit`)            |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat spisovatel (`mcp-heartbeat.json`)                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Komprese popisu pro registry nástrojů / výzev / prostředků         |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schémata registr nástrojů + (`MCP_TOOLS`, 45 záznamů)          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Fáze 2 obslužné nástroje + cache + 1proxy                          |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Manipulátory kompresních nástrojů                                  |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definice paměťových nástrojů (3 nástroje)                          |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definice dovednostních nástrojů (4 nástroje)                       |
| `open-sse/mcp-server/tools/notionTools.ts`                               | definice kontextového zdrojového nástroje Notion (6 nástrojů)      |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definice nástrojů pro gamifikaci (8 nástrojů)                      |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Nástroje pro registraci a správu pluginů (8 nástrojů)              |
| `src/app/api/mcp/status/route.ts`                                        | koncový bod `/api/mcp/status`                                      |
| `src/app/api/mcp/tools/route.ts`                                         | koncový bod `/api/mcp/tools`                                       |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE dopravní cesta                                  |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamovatelná přepravní trasa HTTP              |
| `src/app/api/mcp/audit/route.ts`                                         | dotaz na protokol auditu `/api/mcp/audit`                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | agregované metriky auditu `/api/mcp/audit/stats`                   |
| `src/lib/notion/api.ts`                                                  | Notion REST API klient (opakování, časový limit, klasifikace chyb) |
| `src/lib/db/notion.ts`                                                   | perzistence tokenu Notion (tabulka `key_value` )                   |
| `src/app/api/settings/notion/route.ts`                                   | nastavení Notion API (GET/POST/DELETE)                             |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | správa tokenů Notion UI                                            |
| `tests/unit/notion-api.test.ts`                                          | klientské testy Notion API (7)                                     |
| `tests/unit/notion-tools.test.ts`                                        | testy vynucování rozsahu nástrojů Notion (10)                      |
| `tests/unit/db/notion.test.mjs`                                          | testy modulu Notion DB (3)                                         |
