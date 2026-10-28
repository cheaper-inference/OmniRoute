# OmniRoute MCP Server Documentation (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server ng Model Context Protocol na may 110 tool para sa mga operasyon ng routing, cache, compression, memory, skills, proxy, pool, Radar, at context source.
>
> Pinagmumulan ng katotohanan: kinakalkula ng `open-sse/mcp-server/server.ts` ang **110 natatanging tool** gamit ang `countUniqueMcpTools()`: 45 canonical na definition (kabilang ang anim na CCR lifecycle tool, ang agent-skills trio, `omniroute_radar_catalog`, at `omniroute_x_search`), kasama ang memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), at dalawang RTK-only compression tool.

## Pag-install

Built-in ang OmniRoute MCP. Simulan ito gamit ang:

```bash
omniroute --mcp
```

O sa pamamagitan ng open-sse transport:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # Awtomatikong nagsisimula ang MCP sa /mcp endpoint
```

Naka-off bilang default ang mga HTTP transport (`sse` / `streamable-http`, na inihahatid sa loob ng proseso ng dashboard server) at dati ay maaari lamang i-toggle mula sa `/dashboard/mcp` page. Simula sa v3.8.51, may kapantay na kakayahan na rin ang CLI:

```bash
omniroute mcp status                                  # enabled/online, transport, bilang ng tool
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # nire-reset ang mga aktibong sse/streamable-http session
```

Ang `mcp enable`/`mcp disable` ay nagpa-PATCH sa parehong `mcpEnabled` (at opsyonal na `mcpTransport`) setting na tina-toggle ng dashboard sa pamamagitan ng `/api/settings`. Tinatawag ng `mcp restart` ang `POST /api/mcp/restart`: isinasara nito ang mga aktibong `sse`/`streamable-http` session upang malinis na makapag-initialize muli ang susunod na request, nagbabalik ng `409` kung naka-disable ang MCP, at `501` para sa `stdio` transport (ang mga stdio client ang namamahala sa sarili nilang subprocess — walang in-process handle na maaaring i-restart).

## Mga Transport

Naglalantad ang MCP server ng tatlong transport, na lahat ay sinusuportahan ng parehong `createMcpServer()` factory:

| Transport         | Lokasyon                                    | Kailan gagamitin                                            |
| :---------------- | :------------------------------------------ | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Mga IDE integration (Claude Desktop, Cursor, atbp.)         |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Mga browser/agent client na nangangailangan ng event stream |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Mga multi-session HTTP client (`mcp-session-id` header)     |

Pinipili ng `mcpTransport` setting ang aktibong HTTP transport (`sse` o `streamable-http`). Kapag nagpapalit ng transport, isinasara ang mga kasalukuyang session sa kabilang transport.

### Malayuang pag-access (pag-bypass gamit ang manage scope)

Nasa LOCAL_ONLY tier ang `/api/mcp/*` (`src/server/authz/routeGuard.ts`) — bilang default, tanging mga loopback host (`localhost`, `127.0.0.1`, `::1`) lamang ang makaka-access dito. Simula sa v3.8.2, maaaring kumonekta ang mga non-loopback client kung magpapakita sila ng `Authorization: Bearer <api-key>` na ang key ay may `manage` scope. Ito lamang ang paraan upang ma-access ang remote MCP server sa pamamagitan ng tunnel, reverse proxy, o pampublikong hostname.

```bash
# Magbigay ng manage scope: buksan ang dashboard API Keys page at i-toggle
# ang "Management Access" sa key, o POST scopes:["manage"] kapag gumagawa nito.

# Pagkatapos, kumonekta mula sa isang remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ang key na walang `manage` scope (o walang Bearer) ay nagbabalik ng `403 LOCAL_ONLY`. Sadyang HINDI maaaring i-bypass ang sibling prefix na `/api/cli-tools/runtime/*` — tingnan ang [Mga Tier ng Route Guard — Eksepsyon para sa manage scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Pagpapatunay ng Origin

Pagkatapos ng authentication, bawat request sa `/api/mcp/*` — ang mga transport at mga management route gaya ng `status`, `tools`, `audit`, `restart` — ay sinusuri ang `Origin` header, sinuman ang tumatawag (API key, CLI token, dashboard session, o anonymous loopback kapag naka-off ang login). Ito ang proteksyon laban sa DNS rebinding na hinihingi ng MCP Streamable HTTP spec.

- **Walang `Origin` header** → pinapayagan. Hindi ito ipinapadala ng OmniRoute CLI, SDK at mga IDE client.
- **Pinapayagang `Origin`** → `localhost` / `127.0.0.1` / `[::1]` sa anumang port, o ang sariling public origin ng OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, ang origin na ipinasa ng pinagkakatiwalaang reverse proxy (`OMNIROUTE_TRUST_PROXY`, kapag walang nakatakdang base URL lamang), o isang direktang ina-access na loopback/LAN IP host. Ang `Host` header lamang ay hindi kailanman nagpapagawang pinagkakatiwalaan ang isang origin.
- **Anumang ibang `Origin`, kasama ang `null`** → `403` na may JSON-RPC error body: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Tinatanggap pa rin ang dashboard session na may valid na CSRF token, gaya ng ibang dashboard write.

Ang browser MCP client na nakalagay sa likod ng reverse proxy ay nangangailangan ng `OMNIROUTE_PUBLIC_BASE_URL`; walang allow-list para sa ibang origin. Hindi sinusuri ang Origin sa CORS preflight (`OPTIONS`); sinusuri ang kasunod na request.

## Configuration ng IDE

Tingnan ang [Configuration ng MCP Client](../guides/SETUP_GUIDE.md#mcp-client-configuration) para sa pag-setup ng Claude Desktop,
Cursor, Cline, at mga katugmang MCP client.

---

## Mahahalagang Tool (14) — Yugto 1

| Tool                            | Mga Saklaw            | Paglalarawan                                                                                                                                                     |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, memory, mga circuit breaker, mga limitasyon sa rate, mga estadistika ng cache                                                                            |
| `omniroute_list_combos`         | `read:combos`         | Lahat ng naka-configure na combo kasama ang mga estratehiya (opsyonal na mga sukatan)                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | Mga sukatan ng performance para sa isang partikular na combo                                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | I-activate o i-deactivate ang isang combo                                                                                                                        |
| `omniroute_create_combo`        | `write:combos`        | Gumawa ng na-validate na combo sa pamamagitan ng kasalukuyang combo API                                                                                          |
| `omniroute_check_quota`         | `read:quota`          | Nagamit/kabuuang quota, natitirang porsiyento, oras ng pag-reset, kalagayan ng token                                                                             |
| `omniroute_route_request`       | `execute:completions` | Magpadala ng chat completion sa pamamagitan ng routing ng OmniRoute                                                                                              |
| `omniroute_cost_report`         | `read:usage`          | Ulat ng gastos ayon sa panahon (session/araw/linggo/buwan)                                                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | Kumpletong katalogo ng modelo kasama ang mga kakayahan, katayuan, at presyo                                                                                      |
| `omniroute_radar_catalog`       | `read:radar`          | Lokal at nilagdaang katalogo ng Radar; mga opsyonal na filter ayon sa provider/pamilya                                                                           |
| `omniroute_tool_search`         | `read:tools`          | Tumuklas ng mga tool mula sa nakarehistrong katalogo ng MCP                                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Paghahanap sa web sa pamamagitan ng mga naka-configure na search provider. Hindi para sa X/Twitter.                                                              |
| `omniroute_x_search`            | `execute:search`      | Maghanap sa X gamit ang xAI/SuperGrok, o piliin ang `xquik-search` para sa mga resulta ng Xquik API. Nangangailangan ng mga kredensyal para sa napiling backend. |
| `omniroute_web_fetch`           | `execute:search`      | Kunin ang nilalaman ng web sa pamamagitan ng mga naka-configure na fetch provider                                                                                |

## Mga Advanced na Tool (11) — Yugto 2

| Tool                               | Mga Scope                            | Paglalarawan                                                                                               |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Dry-run na simulation ng routing na may fallback tree                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Badyet ng session na may aksyong degrade/block/alert                                                       |
| `omniroute_set_routing_strategy`   | `write:combos`                       | I-update ang combo strategy habang tumatakbo (priority/weighted/auto/atbp.)                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Ilapat ang `aggressive` / `balanced` / `conservative` na resilience preset                                 |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Live na pagsubok sa bawat provider sa isang combo gamit ang tunay na upstream call                         |
| `omniroute_get_provider_metrics`   | `read:health`                        | Mga metric ng bawat provider na may p50/p95/p99 latency at circuit breaker state                           |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Magrekomenda ng combo ayon sa uri ng gawain na may mga limitasyon sa badyet/latency                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Ipaliwanag kung bakit ni-route ang isang request sa provider (scoring factors + fallbacks)                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Buong snapshot ng session: gastos, mga token, nangungunang modelo/provider, mga error, budget guard        |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | I-diagnose (at opsyonal na awtomatikong ayusin) ang database drift gaya ng sirang combo refs / orphan rows |
| `omniroute_sync_pricing`           | `pricing:write`                      | I-sync ang pricing data mula sa mga panlabas na source (LiteLLM); sinusuportahan ang `dryRun`              |

## Mga Cache Tool (2)

| Tool                    | Mga Scope     | Paglalarawan                                             |
| :---------------------- | :------------ | :------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Mga stat ng semantic cache, prompt-cache, at idempotency |
| `omniroute_cache_flush` | `write:cache` | I-flush ang cache sa kabuuan o ayon sa signature/model   |

## Mga Compression Tool (13)

| Tool                                | Mga Scope           | Paglalarawan                                                                                                                            |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Mga setting ng compression, buod ng analytics, at mga cache-aware na stat (kabilang ang `analytics.mcpDescriptionCompression` metadata) |
| `omniroute_compression_configure`   | `write:compression` | I-configure ang compression mode, threshold, target ratio, pagpapanatili ng system-prompt, at toggle ng MCP description compression     |
| `omniroute_set_compression_engine`  | `write:compression` | Piliin ang aktibong engine (off/caveman/rtk/stacked) at intensity ng Caveman/RTK                                                        |
| `omniroute_list_compression_combos` | `read:compression`  | Ilista ang mga pinangalanang compression combo at ang mga engine pipeline ng mga ito                                                    |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytics na nakapangkat ayon sa compression combo at engine                                                                            |
| `omniroute_ccr_store`               | `write:compression` | Mag-imbak ng caller-isolated na content sa bounded in-memory CCR store at magbalik ng marker kasama ang `ccr://` reference              |
| `omniroute_ccr_retrieve`            | `read:compression`  | Kunin ang CCR content nang buo o gamit ang mga mode na head, tail, lines, grep, at stats                                                |
| `omniroute_ccr_inspect`             | `read:compression`  | Siyasatin ang CCR metadata na pag-aari ng caller nang hindi ibinabalik ang content                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Ilista ang naka-pagination na metadata para sa mga CCR block na pag-aari ng caller                                                      |
| `omniroute_ccr_delete`              | `write:compression` | Magtanggal ng CCR block na pag-aari ng caller                                                                                           |
| `omniroute_ccr_stats`               | `read:compression`  | Iulat ang caller-scoped na paggamit ng memory, mga lifecycle counter, at mga limitasyon ng store                                        |
| `omniroute_rtk_discover`            | `read:compression`  | Tuklasin ang paulit-ulit na ingay sa mga opt-in na sample ng RTK output                                                                 |
| `omniroute_rtk_learn`               | `read:compression`  | Bumuo ng masusuring draft ng RTK filter mula sa mga opt-in na sample                                                                    |

Ang mga CCR entry ay nasa memory lamang at nawawala kapag nag-restart. Limitado ang bawat block sa 2 MiB, ang bawat
principal sa 16 MiB, at ang global store sa 64 MiB. Bilang default, may 24 na oras na TTL ang mga entry (maximum na
pitong araw). Limitado sa 256 KiB ang buong MCP retrieval; mananatiling available ang mas malalaking block sa pamamagitan ng
mga ranged at grep mode. Ang storage, retrieval, listing, inspection, deletion, at stats ay nakahiwalay ayon sa
authenticated na API-key principal. Ang mga audit record ay naglalaman ng mga hash at size metadata, at hindi kailanman ng content.

Iniuulat ng `omniroute_compression_status` nang hiwalay ang compression ng paglalarawan ng MCP sa ilalim ng
`analytics.mcpDescriptionCompression`. Ang mga value na iyon ay mga pagtatantya sa laki ng metadata para sa mga
paglalarawang maaaring ilista ng MCP (`tools`, `prompts`, `resources`, at `resourceTemplates`); hindi ang mga ito mga resibo
ng paggamit ng provider at minarkahan ang mga ito ng `source: "mcp_metadata_estimate"`.

### Filter ng Accessibility Tree ng MCP (v3.8.0)

Hiwalay sa mga compression tool sa itaas, may kasamang post-execution filter ang OmniRoute na
nagko-compress sa mga **resulta ng tool** ng mga MCP browser/accessibility tool bago ibalik ang mga ito sa
agent. Ang filter na ito ay hindi mismo isang tool — awtomatiko itong tumatakbo sa anumang resulta ng tool na naglalaman ng
detalyadong accessibility-tree o browser-snapshot text (≥2000 character).

Mga pangunahing gawi:

- Pinagsasama ang ≥30 magkakasunod at nauulit na sibling line sa buod ng simula + dulo
- Pinapanatili ang mga `[ref=eXX]` anchor na kinakailangan ng Playwright/computer-use
- Sapilitang pinuputol ang sobrang laking text (>50,000 character) na may pahiwatig sa pag-navigate
- Inaasahang matitipid: **60–80%** sa mga browser snapshot payload

Configuration: `compression.mcpAccessibility` sa mga global setting (migration 056).
Implementation: `open-sse/services/compression/engines/mcpAccessibility/`.
Buong dokumentasyon: [Mga Compression Engine — Filter ng Accessibility Tree ng MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Tingnan ang [Mga Compression Engine](../compression/COMPRESSION_ENGINES.md) at [RTK Compression](../compression/RTK_COMPRESSION.md) para sa
runtime compression model na ginagamit ng mga tool na ito.

## Mga Tool ng 1Proxy (3)

| Tool                        | Mga Saklaw     | Paglalarawan                                                                                             |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Kumuha ng mga libreng proxy mula sa 1proxy marketplace (mga filter ng protocol/bansa/kalidad/limitasyon) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Kunin ang susunod na available na proxy ayon sa estratehiya (`random` / `quality` / `sequential`)        |
| `omniroute_oneproxy_stats`  | `read:proxies` | Mga istatistika ng pool, status ng pag-sync, at distribusyon ayon sa protocol at bansa                   |

## Mga Tool ng Memorya (3)

Tinukoy sa `open-sse/mcp-server/tools/memoryTools.ts`. Ipinapatupad ang awtentikasyon/saklaw sa pamamagitan ng karaniwang pipeline ng saklaw ng MCP.

| Tool                      | Mga Saklaw     | Paglalarawan                                                                                            |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Maghanap sa mga memorya ayon sa query / uri / API key na may pagpapatupad ng badyet ng token            |
| `omniroute_memory_add`    | `write:memory` | Magdagdag ng bagong entry sa memorya (`factual` / `episodic` / `procedural` / `semantic`)               |
| `omniroute_memory_clear`  | `write:memory` | I-clear ang mga memorya para sa isang API key, na maaaring i-filter ayon sa uri o `olderThan` timestamp |

## Mga Tool ng Kasanayan (4)

Tinukoy sa `open-sse/mcp-server/tools/skillTools.ts`. Sinusuportahan ng `src/lib/skills/registry` + `src/lib/skills/executor`.

| Tool                          | Mga Saklaw       | Paglalarawan                                                                                                             |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Ilista ang mga nakarehistrong kasanayan na may opsyonal na pag-filter ayon sa API key, pangalan, o naka-enable na estado |
| `omniroute_skills_enable`     | `write:skills`   | I-enable o i-disable ang isang partikular na kasanayan ayon sa ID                                                        |
| `omniroute_skills_execute`    | `execute:skills` | Isagawa ang isang kasanayan gamit ang ibinigay na input at ibalik ang tala ng pagpapatupad                               |
| `omniroute_skills_executions` | `read:skills`    | Ilista ang kamakailang kasaysayan ng pagpapatupad ng kasanayan                                                           |

## Pinagmulan ng Konteksto ng Notion (6)

Tinukoy sa `open-sse/mcp-server/tools/notionTools.ts`. Nakaimbak ang token sa talahanayang `key_value` sa pamamagitan ng `src/lib/db/notion.ts`. Nasa `src/lib/notion/api.ts` ang REST client. Nasa `src/app/api/settings/notion/route.ts` ang Settings API. Nasa `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` ang UI ng dashboard.

I-configure ang iyong token ng integrasyon sa Notion mula sa tab na **Mga Pinagmulan ng Konteksto** sa dashboard ng Endpoint, o sa pamamagitan ng REST API:

```bash
# Itakda ang token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Suriin ang status
curl http://localhost:20128/api/settings/notion

# Idiskonekta
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tool                         | Mga Saklaw     | Paglalarawan                                                                      |
| :--------------------------- | :------------- | :-------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Maghanap ng buong teksto sa lahat ng page at database                             |
| `notion_get_page`            | `read:notion`  | Kumuha ng page ayon sa ID kasama ang mga property nito                            |
| `notion_list_block_children` | `read:notion`  | Ilista ang mga child block ng isang page o block                                  |
| `notion_query_database`      | `read:notion`  | Mag-query ng database gamit ang mga filter, sort, at pagination                   |
| `notion_get_database`        | `read:notion`  | Kunin ang schema ng database ayon sa ID                                           |
| `notion_append_blocks`       | `write:notion` | Magdagdag ng mga child block sa isang parent block (maximum na 100 bawat request) |

## Mga Tool ng Catalog ng Agent Skill (3)

Tinukoy sa `open-sse/mcp-server/tools/agentSkillTools.ts`. Sinusuportahan ng `src/lib/agentSkills/catalog`. Inilalantad ng mga tool na ito ang 45-entry na catalog ng dokumentasyon ng Agent Skills sa mga MCP client at external agent. Saklaw: `read:catalog`.

| Tool                              | Mga Saklaw     | Paglalarawan                                                                                                                                     |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Ilista ang lahat ng 45 agent skill na may opsyonal na mga filter na `category` (api\|cli) at `area`; nagbabalik ng metadata + coverage           |
| `omniroute_agent_skills_get`      | `read:catalog` | Kunin ang buong metadata + nilalaman ng SKILL.md para sa isang skill gamit ang canonical na `id`                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Mga estadistika ng coverage: ilan sa 23 API, 21 CLI, at 1 config skill ang may mga SKILL.md file sa filesystem kumpara sa mga kabuuan sa catalog |

Tingnan ang [AGENT-SKILLS.md](./AGENT-SKILLS.md) para sa buong catalog at kung paano ito ginagamit ng mga external agent.

## Mga Kaugnay na Framework (v3.8.0)

Ang imbentaryo ng MCP tool sa itaas (110 natatanging tool, kinalkula ng `countUniqueMcpTools()`) ay sadyang
nilimitahan sa mga operasyon ng runtime routing/cache/compression/memory/skills/proxy/context-source. Dalawang katabing
framework ang kasama ng MCP server sa v3.8.0 at hiwalay na nakadokumento:

### Mga Cloud Agent

Ang mga Cloud Agent ay mga out-of-process na AI coding agent (codex-cloud, cursor-cloud, devin, jules) na nakakonekta sa
OmniRoute sa pamamagitan ng parehong modelo ng koneksyon na ginagamit para sa mga LLM provider. Inilalantad ang mga ito sa pamamagitan ng
sarili nilang REST surface (`/api/v1/agents/*`) at **hindi** bahagi ng catalog ng MCP tool
— ang pagtawag sa isang Cloud Agent ay hindi gumagamit ng MCP scope.

- Implementasyon: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Lifecycle: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentasyon: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Mga Guardrail

Ang mga Guardrail ay mga filter bago/pagkatapos ng pagpapatupad (vision-bridge, pii-masker, prompt-injection)
na inilalapat sa loob ng chat pipeline. Tumatakbo ang mga ito bago maabot ang layer ng MCP tool/route
at nagpapadala ng mga structured violation sa audit pipeline; hindi tinatawag ang mga ito bilang mga MCP tool.

- Implementasyon: `src/lib/guardrails/`.
- Dokumentasyon: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Kapag nagde-debug ng isang MCP call na mukhang na-block, suriin ang MCP audit log
(mga entry na `scope_denied:*`) at ang guardrails audit trail — maaaring tanggihan ang isang request ng
isang guardrail **bago** pa nito maabot ang layer ng pagpapatupad ng MCP scope.

---

## Mga Endpoint ng REST API

| Endpoint               | Pamamaraan            | Paglalarawan                                                                                                    | Auth                       |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status ng server: heartbeat, estado ng HTTP transport, buod ng aktibidad sa audit                               | Pamamahala (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Catalog ng tool (pangalan, paglalarawan, mga saklaw, phase, mga source endpoint)                                | Pamamahala                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint ng SSE transport (kinokontrol ng `mcpEnabled` + `mcpTransport === "sse"`)                              | API key + mga saklaw       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (gumagamit ng `mcp-session-id` header; tinatapos ng `DELETE` ang session)             | API key + mga saklaw       |
| `/api/mcp/audit`       | `GET`                 | Mga entry ng audit log mula sa `mcp_tool_audit` (mga filter: `limit`, `offset`, `tool`, `success`, `apiKeyId`)  | Pamamahala                 |
| `/api/mcp/audit/stats` | `GET`                 | Pinagsama-samang mga estadistika ng audit (`totalCalls`, `successRate`, `avgDurationMs`, mga nangungunang tool) | Pamamahala                 |

Mga source file: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Parehong naka-block ang SSE at Streamable HTTP transport hanggang sa paganahin ang MCP server sa Settings (`mcpEnabled`) at piliin ang naaangkop na `mcpTransport`. Kung maling transport ang naka-configure, nagbabalik ang route ng HTTP 400 na may pahiwatig na baguhin ang mga setting.

---

## Autentikasyon at Mga Scope

Ang mga tawag sa MCP tool ay nagbabasa ng mga string ng scope mula sa tumatawag. Ang check na iyon ay isa sa tatlong malalayang namespace. Ang pagpasa mula sa isang checker ay hindi pagpasa mula sa iba. Ang mga patakaran ay nasa [Tatlong namespace ng scope](#three-scope-namespaces). Ang katalogo ng tool ay nasa [MCP tool scopes](#mcp-tool-scopes).

### Tatlong namespace ng scope

Ang `manage` sa isang API key, ang `read:compression` sa isang MCP tool, at ang `read` sa isang access token na `oma_live_…` ay tatlong magkaibang grant. Ang mga tumatawag na nagpapadala ng access token na `read` sa isang management route na nagbabago ay makakatanggap ng HTTP 403 na `Access token scope 'read' is insufficient; 'write' required.` Ang rang na iyon ay `scopeSatisfies`. Hindi ito nagsusuri sa talahanayan ng MCP, at hindi rin nagsusuri ang MCP matcher dito.

| Namespace             | Kredensyal                                                                                           | Checker                          | Pinapayagan ng pagpasa                                                         |
| :-------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------------- | :----------------------------------------------------------------------------- |
| Pamamahala ng API key | `api_keys.scopes`                                                                                    | `hasManageScope`                 | Management REST para sa Bearer key na iyon                                     |
| Additive ng API key   | parehong array, isang eksaktong string                                                               | ang helper na nabanggit sa ibaba | Tanging iisang capability na iyon                                              |
| Scope ng MCP tool     | parehong array, kung wala ay MCP `_meta` (HTTP/SSE lang), kung wala pa rin ay `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                   | Ang tool na iyon, kapag naka-on na ang enforcement                             |
| Access token          | `oma_live_…`                                                                                         | `scopeSatisfies`                 | Ang management route na nangangailangan ng rang na iyon ayon sa method at path |

Ang pag-issue ng bawat kredensyal ay saklaw sa [Management Authentication](../guides/MANAGEMENT-AUTH.md).

#### Scope ng API key

Isang array na `api_keys.scopes` ang nagpapakain sa dalawang trabaho. Gumagamit sila ng iba't ibang function.

**Management REST.** Ang mga miyembro ng `MANAGEMENT_API_KEY_SCOPES` ay ang `manage` at `admin` (`src/shared/constants/managementScopes.ts`). Ang `hasManageScope` ang nag-aawtorisa ng mga management route para sa key na iyon. Ang `admin` ay may kakayahang pang-management sa mga route na iyon. Ang salitang `admin` dito ay hindi ang rang ng access token at hindi ito lumalawak sa mga scope ng MCP tool.

**Additive na string.** Bawat isa ay eksaktong membership test, at bawat isa ay nananatiling nasa labas ng `MANAGEMENT_API_KEY_SCOPES`.

| Scope                          | Pinapayagan ng pagpasa                                                                                                                                                                        |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Tanging carve-out na LOCAL_ONLY na `/api/mcp/` na hindi loopback (`hasMcpConnectOrManageScope`). Ang key na may `manage` o `admin` ay dumadaan pa rin sa carve-out na iyon.                   |
| `self:usage`                   | Ang `GET /api/v1/me/status` para sa key na ito (`src/app/api/v1/me/status/route.ts`). Ang `POST /api/keys` ay nagdaragdag ng scope na ito sa paggawa (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Ang upstream account quota sa loob ng status payload na iyon (`src/lib/usage/apiKeySelfService.ts`). Hinihingi pa rin ng status route ang `self:usage`.                                       |
| `policy:bypass-provider-quota` | Ang inference call ng key na ito ay lumalaktaw sa provider-quota policy (`hasProviderQuotaBypassScope` sa `src/sse/handlers/chat.ts`).                                                        |

#### Pagtutugma

Ang katalogo ay ang talahanayan sa ilalim ng [MCP tool scopes](#mcp-tool-scopes). Huwag ituring ang `MCP_SCOPE_LIST` sa `src/shared/constants/mcpScopes.ts` bilang katalogo na iyon: ito ang orihinal na typed subset. Ang mga susunod na tool ay nagde-declare ng karagdagang scope sa tabi nito (`read:notion`, `read:skills`, `read:local-corpus`, at ang iba pa sa talahanayan).

Ang `evaluateToolScopes` sa `open-sse/mcp-server/scopeEnforcement.ts` ay pinapayagan ang tawag kapag tumutugma ang bawat required scope sa ilang granted scope:

- Ang `*` ay tumutugma sa bawat required scope.
- Ang granted scope na nagtatapos sa `*` ay tumutugma sa required scope na nagsisimula sa prefix bago ang bituin. Ang `read:*` ay tumutugma sa `read:compression`.
- Ang bawat ibang granted scope ay tumutugma lamang sa eksaktong required string.

Ang key na ang scopes ay `["manage"]` ay nabigo sa `scopeMatches` para sa `read:compression`. Ang parehong tawag ay nabigo rin para sa `admin`, `mcp:connect`, `read`, at `write` kapag ang mga ito lamang ang granted na string. Walang hierarkiya sa pagitan ng mga scope ng MCP tool maliban sa trailing na `*`.

Naka-off ang enforcement maliban kung `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (default na `false`). Habang naka-off ito, pinapayagan ng `evaluateToolScopes` ang tawag at nilalaktawan ang katalogo. Habang naka-on ito, ginagamit ng HTTP ang `api_keys.scopes` ng Bearer key bilang `authInfo` (tingnan ang [Per-key HTTP scope binding](#per-key-http-scope-binding-7895)). Kapag walang naresolven na key scopes, dumadaan ang granted set sa MCP `_meta` (iginalang lamang para sa mga tumatawag na HTTP/SSE, sa loob ng HTTP auth context; ang `_meta` ng stdio caller ay hindi pinapansin dahil kontrolado ito ng client at wala itong dalang per-caller identity), pagkatapos ay `OMNIROUTE_MCP_SCOPES`.

#### Scope ng access token

Ang mga token na `oma_live_…` (`src/lib/accessTokens/scopes.ts`) ay may dalang `read`, `write`, o `admin`. Ang `scopeSatisfies` ay isang rang: saklaw ng `admin` ang `write` at `read`, at saklaw ng `write` ang `read`. Ang mga hindi-kilalang scope ay walang saklaw.

Ang `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ay naghahambing ng rang na iyon sa `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, at `OPTIONS` ay nangangailangan ng `read`.
- Bawat ibang method ay nangangailangan ng `write`.
- Ang mga path sa `ADMIN_SCOPE_PREFIXES` ay nangangailangan ng `admin` para sa bawat method. `/api/mcp`
  ay nasa listahang iyon, kaya ang access token na `write` ay hindi pa rin makakatawag sa MCP HTTP
  surface.
- Ang mga path sa `ADMIN_MUTATION_PREFIXES` ay nangangailangan ng `admin` lamang para sa mga mutasyon.
- Ang mga path sa `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`,
  `/api/settings/require-login`) ay nangangailangan ng `admin` lamang para sa mga mutasyon, at lamang sa
  eksaktong path na iyon — ang iba pang sub-route ng `/api/settings/*` ay nag-iingat pa rin ng `write`.

`PATCH /api/keys/{id}` ay isang mutasyon at wala sa mga listahan ng admin na iyon, kaya ang
`read` token ay makakatanggap ng 403
`Access token scope 'read' is insufficient; 'write' required.`
Ang access token na `write` o `admin` ay tumutugma sa route na iyon. Ang dashboard JWT, ang
loopback CLI machine-id token, at ang API key na may `manage` o `admin` ay dumadaan sa iba pang
branch at hindi pinipigilan ng rank na ito.

Ang access token na pumasa sa `scopeSatisfies` para sa `/api/mcp` ay malalimut lamang na maliwanag
ang management gate. Ang mga tool call ay nagpapatakbo pa rin ng `scopeMatches` laban sa mga scope
ng API key. Ang rank ng access token ay hindi isang input sa `scopeMatches`.

### Mga scope ng tool ng MCP

Ang pagpapatupad ng scope ay nasa iisang lugar sa `open-sse/mcp-server/scopeEnforcement.ts`.
Bawat tool ay nangangailangan ng mga partikular na scope:

| Saklaw                | Mga tool                                                                                                                                                                     |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `read:quota`          | `check_quota`                                                                                                                                                                |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `read:models`         | `list_models_catalog`                                                                                                                                                        |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `write:budget`        | `set_budget_guard`                                                                                                                                                           |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `pricing:write`       | `sync_pricing`                                                                                                                                                               |
| `read:cache`          | `cache_stats`                                                                                                                                                                |
| `write:cache`         | `cache_flush`                                                                                                                                                                |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                       |
| `read:memory`         | `memory_search`                                                                                                                                                              |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                 |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                           |
| `write:skills`        | `skills_enable`                                                                                                                                                              |
| `execute:skills`      | `skills_execute`                                                                                                                                                             |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                      |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                               |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                           |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                              |
| `read:obsidian`       | 13 read tools — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 write tools — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                            |

Sinusuportahan ang wildcard scopes: `read:*` ay nagbibigay ng lahat ng read-scopes, `*` ay nagbibigay ng buong access.

### `mcp:connect` — narrow route capability (#7895)

Ang pag-abot sa HTTP/SSE MCP transport (`/api/mcp/*`) mula sa non-loopback ay nangangailangan ng
`/api/mcp/` LOCAL_ONLY carve-out (tingnan `docs/security/ROUTE_GUARD_TIERS.md`). Kasalukuyan,
tinatanggap lamang ng carve-out na iyon ang isang full `manage`/`admin`-scope API key — masyadong malawak para sa
isang caller na kailangan lamang makipag-usap sa MCP. Ngayon ay nag-e-export ang `src/shared/constants/managementScopes.ts` ng
`MCP_CONNECT_SCOPE = "mcp:connect"`: isang additive, narrow scope (parehong pin precedents ang
`SELF_USAGE_SCOPE`) na nag-aauthorize LAMANG sa `/api/mcp/` bypass sa
`src/server/authz/policies/management.ts` — walang ibang management-route access ang ibinibigay nito
at sadyang PINAGABAWAL sa `MANAGEMENT_API_KEY_SCOPES`. Ang key na may hawak na `manage`/`admin`
ay nananatiling dumaan sa carve-out nang walang pagbabago; ang `mcp:connect` ay isang mas mababang-privilege na alternatib para sa
remote MCP-only callers, na sinusuri sa pamamagitan ng `hasMcpConnectOrManageScope()`.

### Per-key HTTP scope binding (#7895)

Sa HTTP/SSE, ngayon ay nilal.Resolve ng `open-sse/mcp-server/httpTransport.ts` ang tunay na
`api_keys.scopes` ng caller sa pamamagitan ng `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
at ipinapasa ito sa `transport.handleRequest(req, { authInfo })` ng MCP SDK, kaya
ang `extra.authInfo.scopes` na dumadaloy sa bawat tool call ay nakasentro sa sariling scopes ng Bearer key.
Naging prayoridad ng `resolveCallerScopeContext()` sa `scopeEnforcement.ts` ang `authInfo` kaysa sa
`_meta` at `OMNIROUTE_MCP_SCOPES` env fallback — pinopopulate lamang nito ang unang, pinakamataas na prayoridad na pinagmulan,
na dating hindi napupunan sa HTTP. Kapag walang naresolve na API key
(walang header, invalid key), nananatiling `undefined` ang `authInfo` at dumadaloy ang resolution sa
existing `meta`/env chain nang walang pagbabago. Walang per-caller identity ang stdio (tingnan
`mcpCallerIdentity.ts`) at hindi ito naaapektuhan ng per-key binding — nilalaktawan nito ang `_meta` step
(honored lang ang `_meta` sa loob ng HTTP auth context, #15159) at naresolve mula sa
`OMNIROUTE_MCP_SCOPES` env key lamang.

**Pinipilit ang enforcement para sa narrow-scoped HTTP/SSE callers anuman ang
`OMNIROUTE_MCP_ENFORCE_SCOPES`.** Ang pagiging `false` ng default ng `OMNIROUTE_MCP_ENFORCE_SCOPES` ay ligtas lamang
para sa local/stdio single-operator flow, kung saan walang per-caller identity na maaaring i-scope laban.
Pinapailawan ng `open-sse/mcp-server/server.ts::withScopeEnforcement()` ang per-tool scope
enforcement nang walang kondisyon (`shouldForceScopeEnforcement()` sa `scopeEnforcement.ts`)
kapag naresolve ng `resolveCallerScopeContext()` ang
`source === "authInfo"` (ibig sabihin, isang tunay na per-key HTTP Authorization header, HTTP/SSE lamang) AT ang
key na iyon ay walang hawak na full `manage`/`admin` scope. Isinasara nito ang puwang kung saan ang key na may hawak LAMANG
sa narrow na `mcp:connect` bypass scope — na nakadokumento sa itaas bilang awtomatikong walang ibang awtorisasyon kundi ang
`/api/mcp/` LOCAL_ONLY carve-out — ay maaaring tumawag ng bawat MCP tool kapag nakatanggap ang isang operator ng remote/non-loopback MCP access, dahil lamang
`OMNIROUTE_MCP_ENFORCE_SCOPES` ay ipinapadala bilang `false` sa default. Ang full `manage`/`admin` key sa HTTP, at bawat stdio/local caller, ay pinananatili
ang umiiral na `OMNIROUTE_MCP_ENFORCE_SCOPES`-gated na pag-uugoy nang walang pagbabago.

---

## Mga Variable ng Kapaligiran

| Variable                                | Default                                        | Layunin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------- | :--------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                       | Base URL na ginagamit ng MCP server kapag tumatawag sa mga internal API ng OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_API_KEY`                     | (walang laman)                                 | API key na ipinapasa bilang `Authorization: Bearer` sa mga internal API call                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` lamang ang nagpapagana rito) | Kapag pinagana, tatanggihan ng mga nawawalang scope ang mga tool call at itatala ang `scope_denied:<reason>` sa audit log. Sapilitan DING ipinapatupad ito anuman ang flag na ito para sa anumang HTTP/SSE caller na natukoy mula sa isang Authorization header na partikular sa key (`source === "authInfo"`) at walang buong `manage`/`admin` scope — hal. isang key na mayroon lamang ng limitadong `mcp:connect` bypass scope — kaya ligtas lamang ang default na ito para sa lokal/stdio na daloy na may iisang operator, at hindi kailanman para sa remote na non-loopback access |
| `OMNIROUTE_MCP_SCOPES`                  | (walang laman)                                 | Allowlist ng mga scope na pinaghihiwalay ng kuwit at itinuturing na "available" bilang default (ginagamit kapag hindi nagbibigay ang caller ng sarili nitong mga scope)                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (hindi nakatakda = naka-on)                    | Kapag itinakda sa `0/false/off/no`, hindi pinapagana ang compression ng paglalarawan ng MCP sa oras ng pagpaparehistro                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (hindi nakatakda = naka-on)                    | Alternatibong alias para sa toggle ding nasa itaas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                        | Limitasyon ng oras bago i-abort ang mga internal management read (kalusugan, katatagan, mga combo, quota, paggamit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                        | Limitasyon ng oras bago i-abort ang mga hop na naghihintay sa isang provider (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `MCP_TOOL_DENY`                         | (hindi nakatakda = walang filter)              | Mga pangalan ng tool na pinaghihiwalay ng kuwit na aalisin mula sa `tools/list` (pagbabawas ng bilang ng mga tool — tingnan sa ibaba)                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `MCP_TOOL_ALLOW`                        | (hindi nakatakda = walang filter)              | Mga pangalan ng tool na pinaghihiwalay ng kuwit na eksklusibong pananatilihin (allow-list mode — tingnan sa ibaba)                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DATA_DIR`                              | `~/.omniroute`                                 | Isinusulat ang heartbeat file sa `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

---

## Compression ng Paglalarawan

Maaaring i-compress ng mga registry ng tool, prompt, at resource ng MCP ang mga paglalarawan sa oras ng pagpaparehistro/paglilista upang mabawasan ang dami ng metadata na inilalantad sa mga client (at samakatuwid, ang gastos sa konteksto ng prompt). Matatagpuan ang implementasyon sa `open-sse/mcp-server/descriptionCompressor.ts` at isinama ito sa MCP server sa pamamagitan ng `compressMcpRegistryMetadata` sa loob ng `createMcpServer()`.

- Isinasagawa ang compression sa teksto ng paglalarawan gamit ang ruleset ng Caveman (`getRulesForContext("all", "full")`) na may preserved-block extraction (mga code span, fenced block, atbp.) upang hindi mabago ang estruktural na nilalaman.
- I-toggle sa bawat deployment sa pamamagitan ng value na `compression.mcpDescriptionCompressionEnabled` sa settings table na `key_value` (default: pinagana) — makikita sa UI bilang **Analytics → Compression ng paglalarawan ng MCP**.
- I-toggle sa buong proseso sa pamamagitan ng alinman sa `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` o `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Ipinapakita ang mga realtime na estadistika sa pamamagitan ng `omniroute_compression_status` sa ilalim ng `analytics.mcpDescriptionCompression` at tina-tag na `source: "mcp_metadata_estimate"` upang maiba sa mga aktuwal na resibo ng paggamit mula sa provider.

---

## Pagbabawas ng Bilang ng Tool (F4.3)

Pinapaliit ng compression ng paglalarawan ang metadata ng bawat tool; lumalampas pa rito ang **pagbabawas ng bilang ng tool** sa pamamagitan ng pagbawas sa _dami_ ng mga tool na ipinapahayag. Ang pagpapakita ng mas kaunting tool sa manifest na `tools/list` ay nagpapababa sa token cost kada request na binabayaran ng modelo ng client para sa catalog ng tool ("layer 5" compression). Ang implementasyon ay isang purong stateless na filter sa `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), na nakakabit sa registration loop sa `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, naka-off bilang default.** Tumatakbo lamang ang filter kapag nakatakda ang kahit isa sa dalawang environment variable; kapag walang nakatakda sa dalawa, ipinapahayag ang lahat ng 110 tool nang walang pagbabago.

| Variable         | Mode                                                                                                                            |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Blacklist — mga pangalan ng tool na pinaghihiwalay ng kuwit at palaging inaalis sa `tools/list`                                 |
| `MCP_TOOL_ALLOW` | Allow-list — mga pangalan ng tool na pinaghihiwalay ng kuwit; ang mga ito lamang ang mananatili, at aalisin ang lahat ng iba pa |

Mas inuuna ang `deny` kaysa sa `allow`. Pinaghihiwalay ng kuwit ang mga pangalan, inaalis ang sobrang espasyo, at binabalewala ang mga blangkong entry. Mga halimbawa:

```bash
# Alisin ang dalawang tool mula sa catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ipahayag lamang ang mga tool para sa routing at quota (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Paano inaalis ang mga na-filter na tool:** palaging matagumpay ang registration; pagkatapos ay `.disable()`d sa MCP SDK handle ang isang tool na tinatanggihan ng profile, kaya hindi ito kailanman lumilitaw sa `tools/list` ngunit nananatiling buo ang wiring (malinis na pag-enable/pag-disable, walang muling registration). Ang profile parser ay `readMcpToolProfileFromEnv(process.env)`, na nagbabalik ng `null` (walang filtering) kapag walang laman ang parehong variable.

Sinusuportahan din ng mas kumpletong anyo ng `ToolProfile` sa likod ng `reduceToolManifest` ang scope-intersection filtering (`allowScopes`, na may `read:*`-style na wildcard matching) at isang deterministic na `maxTools` cap, ngunit kailangan ng dalawang kontrol na iyon ang buong manifest sa oras ng registration at **hindi** pa inilalantad sa pamamagitan ng mga environment variable sa kasalukuyan (isang `tools/list`-level hook ang sinusubaybayang susunod na gawain). Magagamit ang `estimateManifestTokens()` upang ihambing ang token cost ng manifest bago at pagkatapos ng pagbabawas.

---

## Runtime Heartbeat

Itinatala ng stdio transport ang liveness sa `${DATA_DIR}/runtime/mcp-heartbeat.json` kada 5 segundo. Binabasa ng dashboard (`/api/mcp/status`) ang file na ito kasama ang PID liveness upang matukoy ang `online`. Sa halip, nag-uulat ang mga HTTP transport ng estado mula sa in-process na `getMcpHttpStatus()` (walang pagsusulat sa file).

Nilalaman ng heartbeat snapshot ang:

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

## Audit Logging

Ang bawat tool call ay itinatala sa SQLite table na `mcp_tool_audit` ng `open-sse/mcp-server/audit.ts`:

- Pangalan ng tool, mga argument (na-hash/pinaikli ayon sa `auditLevel` ng bawat tool), resulta
- Tagal sa ms, flag ng tagumpay/pagkabigo, mensahe ng error (kapag naaangkop)
- Hash ng API key, timestamp
- Itinatala ang mga pagtanggi dahil sa scope bilang `scope_denied:<reason>` kasama ang listahan ng mga nawawalang scope

Gamitin ang dashboard o ang mga REST endpoint na `/api/mcp/audit` at `/api/mcp/audit/stats` upang suriin ang mga kamakailang call.

---

## Mga File

| File                                                                     | Layunin                                                                         |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | Factory ng MCP server, stdio entry point, mga scoped na pagpaparehistro ng tool |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (pamamahala ng session)                         |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Pagsusuri ng scope ng tool at pagtukoy sa tumatawag                             |
| `open-sse/mcp-server/audit.ts`                                           | Pag-log ng audit sa pagtawag ng tool (`mcp_tool_audit`)                         |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat writer (`mcp-heartbeat.json`)                                   |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Pag-compress ng paglalarawan para sa mga registry ng tool / prompt / resource   |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Mga Zod schema + registry ng tool (`MCP_TOOLS`, 45 entry)                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Mga handler ng Phase 2 + cache + 1proxy tool                                    |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Mga handler ng compression tool                                                 |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Mga depinisyon ng memory tool (3 tool)                                          |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Mga depinisyon ng skill tool (4 na tool)                                        |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Mga depinisyon ng tool para sa Notion context source (6 na tool)                |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Mga depinisyon ng gamification tool (8 tool)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Mga tool para sa pagpaparehistro at pamamahala ng plugin (8 tool)               |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endpoint                                                      |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endpoint                                                       |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` na ruta ng SSE transport                                         |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` na ruta ng Streamable HTTP transport                          |
| `src/app/api/mcp/audit/route.ts`                                         | Query sa audit log ng `/api/mcp/audit`                                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Pinagsama-samang mga sukatan ng audit ng `/api/mcp/audit/stats`                 |
| `src/lib/notion/api.ts`                                                  | Notion REST API client (muling pagsubok, timeout, pag-uuri ng error)            |
| `src/lib/db/notion.ts`                                                   | Pagpapanatili ng Notion token (`key_value` table)                               |
| `src/app/api/settings/notion/route.ts`                                   | API ng mga setting ng Notion (GET/POST/DELETE)                                  |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI para sa pamamahala ng Notion token                                           |
| `tests/unit/notion-api.test.ts`                                          | Mga test ng Notion API client (7)                                               |
| `tests/unit/notion-tools.test.ts`                                        | Mga test sa pagpapatupad ng scope ng Notion tools (10)                          |
| `tests/unit/db/notion.test.mjs`                                          | Mga test ng Notion DB module (3)                                                |
