# OmniRoute MCP Server Documentation (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server ng Model Context Protocol na may 110 tool para sa mga operasyon ng routing, cache, compression, memory, skills, proxy, pool, Radar, at context source.
>
> Pinagmumulan ng katotohanan: kinakalkula ng `open-sse/mcp-server/server.ts` ang **110 natatanging tool** gamit ang `countUniqueMcpTools()`: 45 canonical na definition (kabilang ang anim na CCR lifecycle tool, ang agent-skills trio, `omniroute_radar_catalog`, at `omniroute_x_search`), kasama ang memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), at dalawang RTK-only compression tool.

## Pag-install

OmniRoute MCP ay built-in. Simulan ito sa:

```bash
omniroute --mcp
```

O sa pamamagitan ng open-sse transport:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
omniroute                                          # start the dashboard server
omniroute mcp enable --transport streamable-http   # from another shell; HTTP is off by default
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

Ang HTTP transports (`sse` / `streamable-http`, na inihahatid sa proseso ng dashboard server) ay naka-off bilang default at dati ay na-toggle lang mula sa `/dashboard/mcp` page. Sa v3.8.51 ang CLI ay may parity:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH ang parehong `mcpEnabled` (at opsyonal `mcpTransport`) ang pagtatakda ng mga toggle ng dashboard sa pamamagitan ng `/api/settings`. `mcp restart` ay tumatawag `POST /api/mcp/restart`: pinuputol nito ang mga aktibong `sse`/`streamable-http` session kaya ang susunod na kahilingan ay muling magsisimula nang malinis, nagbabalik ng `409` kung MCP ay hindi pinagana, at `501` para sa `stdio` transport (ang mga kliyente ng stdio ay nagmamay-ari ng kanilang sariling subprocess — walang in-process na handle upang i-restart).

## Mga sasakyan

Inilalantad ng MCP server ang tatlong transport, lahat ay sinusuportahan ng parehong pabrika `createMcpServer()` :

| Transportasyon    | saan                                                      | Kailan gagamitin                                               |
| :---------------- | :-------------------------------------------------------- | :------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                           | mga pagsasama ng IDE (Claude Desktop, Cursor, atbp.)           |
| `sse`             | `POST/GET /api/mcp/sse` sa pamamagitan ng `httpTransport` | Browser/agent client na nangangailangan ng stream ng kaganapan |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                         | Mga multi-session HTTP client (`mcp-session-id` header)        |

Ang aktibong HTTP transport (`sse` o `streamable-http`) ay pinili ng `mcpTransport` na setting. Ang paglipat ng mga sasakyan ay nagsasara ng mga kasalukuyang session sa kabilang transportasyon.

### Malayong pag-access (pamahalaan ang saklaw ng bypass)

`/api/mcp/*` ay nasa LOCAL_ONLY tier (`src/server/authz/routeGuard.ts`). Kinikilala ng bantay ng ruta ang loopback at mga pinagkakatiwalaang private-LAN na mga kapantay. Maaaring maabot ng ibang mga kliyente ang mga transport kapag pinagana ang naka-configure `/api/mcp/` bypass at nagpapakita sila ng `Authorization: Bearer <api-key>` na may `mcp:connect`, `manage` o `admin`. Ang isang authenticated na session ng dashboard ay maaari ding matugunan ang bypass na ito.

Para sa isang malayuang MCP-only na kliyente, ibigay ang `mcp:connect` kasama ang mga saklaw ng mga tool na kailangan nito; halimbawa, pinahihintulutan ng `mcp:connect` at `read:health` ang pagkonekta at pagtawag `omniroute_get_health`. Ang saklaw ng koneksyon lamang ay hindi nagpapahintulot sa mga pagpapatakbo ng tool. Ang mga pagsusuri sa saklaw ng tool ay sapilitan para sa mga HTTP/SSE key na walang `manage` o `admin`, anuman ang `OMNIROUTE_MCP_ENFORCE_SCOPES`.

```bash
# Create an OmniRoute key with mcp:connect and the required tool scopes.
# A key with manage or admin also passes the remote route gate.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ang isang panlabas na kliyente na hindi matugunan ang pinaganang bypass ay nagbabalik `403 LOCAL_ONLY`. Ang hindi pagpapagana `localOnlyManageScopeBypassEnabled` o pag-alis ng `/api/mcp/` prefix ay hindi pinapagana ang panlabas na access sa ruta kahit na para sa isang management key. Ang prefix ng magkapatid `/api/cli-tools/runtime/*` ay sadyang hindi ma-bypass — tingnan ang [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Pagpapatunay ng pinagmulan

Pagkatapos ng pag-authenticate, bawat kahilingan sa `/api/mcp/*` — ang mga transportasyon at ang mga ruta ng pamamahala gaya ng `status`, `tools`, `audit` at `restart` — ay na-validate ang `Origin` header nito, anuman ang tumatawag (API key, CLI token, session ng dashboard, o anonymous na loopback na hindi pinagana ang pag-login). Ito ang DNS-rebinding na proteksyon na kinakailangan ng MCP Streamable HTTP spec.

- **Walang `Origin` header** pinapayagan ang →. Ang OmniRoute CLI, SDK at IDE na kliyente ay hindi nagpapadala ng isa.
- **Pinayagan `Origin`** → `localhost`, `127.0.0.1` o `[::1]` sa anumang port, o sariling pampublikong pinanggalingan ng OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, isang pinagkakatiwalaang reverse proxy na ipinasa na pinanggalingan (`OMNIROUTE_TRUST_PROXY`, kapag walang nakatakdang base URL ), o isang direktang loopback/LAN IP host. Ang `Host` header lamang ay hindi kailanman pinagkakatiwalaan ang pinagmulan.
- **Anumang iba pang `Origin`, kabilang ang `null`** → `403` na may JSON-RPC error body: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Ang isang dashboard session na nagpapakita ng wastong CSRF token ay tinatanggap pa rin, tulad ng para sa iba pang dashboard na nagsusulat.

Ang isang browser MCP client na inihatid sa likod ng isang reverse proxy ay nangangailangan `OMNIROUTE_PUBLIC_BASE_URL`; walang allow-list para sa iba pang pinanggalingan. CORS preflight (`OPTIONS`) ay hindi sinusuri ang Pinagmulan; ang kasunod na kahilingan ay.

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

## Mga Tool sa Compression (13)

| Tool                                | Saklaw              | Paglalarawan                                                                                                                                        |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Mga setting ng compression, buod ng analytics, at mga istatistika ng kamalayan sa cache (kasama ang `analytics.mcpDescriptionCompression` metadata) |
| `omniroute_compression_configure`   | `write:compression` | I-configure ang compression mode, threshold, target ratio, system-prompt preservation, MCP description compression toggle                           |
| `omniroute_set_compression_engine`  | `write:compression` | Piliin ang aktibong makina (off/caveman/rtk/stacked) at Caveman/RTK intensity                                                                       |
| `omniroute_list_compression_combos` | `read:compression`  | Ilista ang pinangalanang compression combos at ang kanilang mga pipeline ng engine                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Ang Analytics ay nakapangkat ayon sa compression combo at engine                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Mag-imbak ng content na nakahiwalay sa tumatawag sa bounded in-memory CCR store at magbalik ng marker at `ccr://` reference                         |
| `omniroute_ccr_retrieve`            | `read:compression`  | Kunin ang nilalaman CCR nang buo o may mga mode ng head, tail, lines, grep, at stats                                                                |
| `omniroute_ccr_inspect`             | `read:compression`  | Suriin ang CCR metadata na pagmamay-ari ng tumatawag nang hindi nagbabalik ng nilalaman                                                             |
| `omniroute_ccr_list`                | `read:compression`  | Ilista ang paginated metadata para sa mga block CCR na pagmamay-ari ng tumatawag                                                                    |
| `omniroute_ccr_delete`              | `write:compression` | Magtanggal ng CCR block na pagmamay-ari ng tumatawag                                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | Iulat ang paggamit ng memory na saklaw ng tumatawag, mga lifecycle counter, at mga limitasyon sa tindahan                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Tuklasin ang paulit-ulit na ingay sa mga opt-in na RTK output sample                                                                                |
| `omniroute_rtk_learn`               | `read:compression`  | Bumuo ng nasusuri na RTK filter draft mula sa mga opt-in na sample                                                                                  |

Gumagamit ang mga entry CCR ng dalawang-tier na tindahan: isang mainit na in-memory na tier na naka-back, sa mga lokal na non-cloud na runtime, ng isang matibay SQLite tier (`ccr_blocks`, naka-on bilang default) kaya ang isang block ay nakaligtas sa pagpapalayas o isang restart hanggang sa TTL nito ay maubusan ng — maliban sa mga block na higit sa 512 KB, cloud runtimes at `COMPRESSION_CCR_DURABLE_STORE=false` na mananatili sa memory-only. Ang matibay na pagsulat ay pinakamahusay na pagsisikap: ito ay ibinabagsak habang ang 1,000 na pagsusulat ay nakabinbin na, at ang isang nabigong SQLite na pagsulat ay naka-log, hindi muling sinubukan, upang ang block na iyon ay nawala sa pag-restart. Ang bawat bloke ay limitado sa 2 MiB, bawat punong-guro sa 16 MiB, at ang pandaigdigang tindahan sa 64 MiB. Default ang mga entry sa 24 na oras TTL (maximum na pitong araw). Ang buong pagkuha MCP ay limitado sa 256 KiB; mananatiling available ang malalaking bloke sa pamamagitan ng ranged at grep mode. Ang storage, retrieval, listing, inspeksyon, pagtanggal, at mga istatistika ay ibinukod ng na-authenticate na API-key principal. Ang mga talaan ng audit ay naglalaman ng mga hash at laki ng metadata, hindi kailanman nilalaman. Ang mga detalyeng nakaharap sa operator (ang dalawang marker, mga kinakailangan ng kliyente, `codemode:false`, mga saklaw ng bawat tool, pagination, at isang diagnostic matrix) ay nakatira sa [Mga Compression Engine → Mga Kinakailangan / gabay ng operator](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

Iniuulat ng `omniroute_compression_status` ang MCP description compression nang hiwalay sa ilalim ng `analytics.mcpDescriptionCompression`. Ang mga halagang iyon ay mga pagtatantya sa laki ng metadata para sa mga nakalistang paglalarawan MCP (`tools`, `prompts`, `resources`, at `resourceTemplates`); hindi sila mga resibo sa paggamit ng provider at minarkahan ng `source: "mcp_metadata_estimate"`.

### MCP Accessibility Tree Filter (v3.8.0)

Hiwalay sa mga compression tool sa itaas, OmniRoute ay may kasamang post-execution na filter na nag-compress sa** resulta ng tool** ng MCP browser/accessibility tools bago sila ibalik sa ahente. Ang filter na ito ay hindi mismo isang tool — ito ay tumatakbo nang malinaw sa anumang resulta ng tool na naglalaman ng verbose accessibility-tree o browser-snapshot text (≥ 2000 chars).

Mga pangunahing gawi:

- Kino-collapse ang ≥ ng 30 magkakasunod na paulit-ulit na linya ng magkapatid sa head + tail summary
- Pinapanatili ang mga `[ref=eXX]` anchor na kinakailangan ng Playwright/computer-use
- Mga hard-truncate na sobrang laki ng text (> 50,000 chars) na may hint ng navigation
- Inaasahang matitipid:** 60–80%** sa mga payload ng snapshot ng browser

Configuration: `compression.mcpAccessibility` sa mga pandaigdigang setting (migration 056). Pagpapatupad: `open-sse/services/compression/engines/mcpAccessibility/`. Mga kumpletong doc: [Mga Compression Engine — MCP Accessibility Tree Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Tingnan ang [Compression Engines](../compression/COMPRESSION_ENGINES.md) at [RTK Compression](../compression/RTK_COMPRESSION.md) para sa runtime compression model sa likod ng mga tool na ito.

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

## Authentication at Saklaw

Ang mga tawag MCP tool ay nagbabasa ng mga string ng saklaw mula sa tumatawag. Ang tseke na iyon ay isa sa tatlong independiyenteng namespace. Ang pass mula sa isang checker ay hindi pass mula sa iba. Ang mga panuntunan ay [Tatlong saklaw na mga namespace](#three-scope-namespaces). Ang tool catalog ay [MCP tool scopes](#mcp-tool-scopes).

### Tatlong saklaw na namespace

`manage` sa isang API key, `read:compression` sa isang MCP tool, at `read` sa isang `oma_live_…` access token ay tatlong magkakaibang mga gawad. Ang mga tumatawag na nagpapadala ng `read` access token sa isang mutating na ruta ng pamamahala ay makakakuha ng HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Ang ranggo na iyon ay `scopeSatisfies`. Hindi ito kumunsulta sa MCP table, at ang MCP matcher ay hindi kumunsulta dito.

| Namespace              | kredensyal                                                                  | Checker                               | Pinapayagan ng isang pass                                                               |
| :--------------------- | :-------------------------------------------------------------------------- | :------------------------------------ | :-------------------------------------------------------------------------------------- |
| Pamamahala ng API-key  | `api_keys.scopes`                                                           | `hasManageScope`                      | Pamamahala ng REST para sa Bearer key na iyon                                           |
| API-key additive       | parehong array, isang eksaktong string                                      | ang katulong na pinangalanan sa ibaba | Iyon lang ang kakayahan                                                                 |
| mga saklaw ng MCP tool | parehong array, iba MCP `_meta` (HTTP/SSE lang), iba `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                        | Ang tool na iyon, kapag naka-on na ang pagpapatupad                                     |
| Access token           | `oma_live_…`                                                                | `scopeSatisfies`                      | Ang ruta ng pamamahala na ang pamamaraan at landas ay nangangailangan ng ranggo na iyon |

Ang pag-minting ng bawat kredensyal ay saklaw sa [Pamamahala ng Pagpapatunay](../guides/MANAGEMENT-AUTH.md).

#### Mga saklaw ng API-key

Ang isang `api_keys.scopes` array ay nagpapakain ng dalawang trabaho. Gumagamit sila ng iba't ibang mga function.

**Pamamahala REST.** `manage` at `admin` ay mga miyembro ng `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` ay kung ano ang nagpapahintulot sa mga ruta ng pamamahala para sa key na iyon. `admin` ay may kakayahang pangasiwaan sa mga rutang iyon. Ang salitang `admin` dito ay hindi ang ranggo ng access-token at hindi ito lumalawak sa mga saklaw ng MCP tool.

**Mga additive na string.** Ang bawat isa ay isang eksaktong pagsusulit sa pagiging miyembro, at ang bawat isa ay nananatili sa labas `MANAGEMENT_API_KEY_SCOPES`.

| Saklaw                         | Pinapayagan ng isang pass                                                                                                                                                              |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Ang non-loopback `/api/mcp/` LOCAL_ONLY carve-out lang (`hasMcpConnectOrManageScope`). Ang isang susi na may `manage` o `admin` ay pumasa pa rin sa carve-out na iyon.                 |
| `self:usage`                   | `GET /api/v1/me/status` para sa key na ito (`src/app/api/v1/me/status/route.ts`). idinaragdag ng `POST /api/keys` ang saklaw na ito sa create (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Mga upstream na quota ng account sa loob ng status payload na iyon (`src/lib/usage/apiKeySelfService.ts`). Ang ruta ng katayuan ay nangangailangan pa rin ng `self:usage`.             |
| `policy:bypass-provider-quota` | Ang mga inference call ng key na ito ay laktawan ang patakaran ng provider-quota (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                        |

#### Pagtutugma

Ang catalog ay ang talahanayan sa ilalim ng [MCP tool scopes](#mcp-tool-scopes). Huwag ituring `MCP_SCOPE_LIST` sa `src/shared/constants/mcpScopes.ts` bilang catalog na iyon: ito ang orihinal na na-type na subset. Ang mga tool sa ibang pagkakataon ay nagdedeklara ng mga karagdagang saklaw sa tabi nito (`read:notion`, `read:skills`, `read:local-corpus`, at ang natitirang bahagi ng talahanayan).

`evaluateToolScopes` sa `open-sse/mcp-server/scopeEnforcement.ts` ay nagbibigay-daan sa isang tawag kapag ang bawat kinakailangang saklaw ay tumutugma sa ilang ibinigay na saklaw:

- `*` ay tumutugma sa bawat kinakailangang saklaw.
- Ang isang ibinigay na saklaw na nagtatapos sa `*` ay tumutugma sa kinakailangang saklaw na nagsisimula sa prefix bago ang bituin. `read:*` ay tumutugma `read:compression`.
- Ang bawat iba pang ibinigay na saklaw ay tumutugma lamang sa kaparehong kinakailangang string.

Ang isang susi na ang mga saklaw ay `["manage"]` ay nabigo `scopeMatches` para sa `read:compression`. Nabigo ang parehong tawag para sa `admin`, `mcp:connect`, `read`, at `write` kapag iyon lang ang mga pinagkaloob na string. Walang hierarchy sa mga saklaw ng MCP tool na lampas sa sumusunod na `*`.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` ay nagbibigay-daan sa pagpapatupad sa buong mundo (default `false`). Sapilitan din ang pagpapatupad sa tuwing lulutasin HTTP/SSE ang mga saklaw ng key mula sa `authInfo` at kulang ang key `manage` o `admin`, kabilang ang mga kahilingang ginawa sa pag-loopback. Sa mga natitirang daloy, kinokontrol ng pandaigdigang bandila kung sinusuri ng `evaluateToolScopes` ang catalog. HTTP/SSE ay nagbubuklod sa `api_keys.scopes` ng Bearer key sa `authInfo` nang hiwalay sa flag na iyon (tingnan [ang Per-key HTTP scope binding](#per-key-http-scope-binding-7895) ). Kapag walang nalutas na mga pangunahing saklaw, ang ibinigay na hanay ay mapupunta sa MCP `_meta` (pinarangalan lamang para sa HTTP/SSE na tumatawag, sa loob ng konteksto ng HTTP auth; `_meta` ng isang stdio na tumatawag ay hindi pinapansin dahil kinokontrol ito ng kliyente at wala itong dala na pagkakakilanlan ng bawat tumatawag), pagkatapos ay `OMNIROUTE_MCP_SCOPES`.

#### Mga saklaw ng access-token

Ang mga `oma_live_…` token (`src/lib/accessTokens/scopes.ts`) ay nagdadala ng `read`, `write`, o `admin`. `scopeSatisfies` ay isang ranggo: sinasaklaw `admin` `write` at `read`, at sinasaklaw ng `write` `read`. Walang saklaw ang hindi kilalang saklaw.

ikinukumpara ng `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ang ranggo na iyon sa `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, at `OPTIONS` ay nangangailangan ng `read`.
- Ang bawat iba pang paraan ay nangangailangan ng `write`.
- Ang mga landas sa `ADMIN_SCOPE_PREFIXES` ay nangangailangan `admin` para sa bawat pamamaraan. Nasa listahang iyon `/api/mcp`, kaya hindi pa rin matatawag ng `write` access token ang MCP HTTP surface.
- Ang mga landas sa `ADMIN_MUTATION_PREFIXES` ay nangangailangan lamang `admin` para sa mga mutasyon.
- Ang mga path sa `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) ay nangangailangan `admin` para lamang sa mga mutasyon, at sa eksaktong path na iyon lang — na iba pang mga `/api/settings/*` sub-ruta ay nagpapanatili `write`.

`PATCH /api/keys/{id}` ay isang mutation at wala sa mga listahan ng admin na iyon, kaya ang isang `read` token ay tumatanggap ng 403 `Access token scope 'read' is insufficient; 'write' required.` Isang `write` o `admin` access token ang nakakatugon sa rutang iyon. Ang isang dashboard na JWT, ang loopback CLI machine-id token, at isang API key na may `manage` o `admin` ay kumukuha ng iba pang mga branch at hindi pinaliit ng ranggo na ito.

Ang isang access token na pumasa sa `scopeSatisfies` para sa `/api/mcp` ay na-clear lang ang gate ng pamamahala. Ang mga tawag sa tool ay tumatakbo pa rin `scopeMatches` laban sa mga saklaw ng API-key. Ang ranggo ng access-token ay hindi isang input sa `scopeMatches`.

### mga saklaw ng MCP tool

Ang pagpapatupad ng saklaw ay sentralisado sa `open-sse/mcp-server/scopeEnforcement.ts`. Ang bawat tool ay nangangailangan ng mga partikular na saklaw:

| Saklaw                | Mga gamit                                                                                                                                                                    |
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

Sinusuportahan ang mga wildcard scope: binibigyan ng `read:*` ang lahat ng read-scope, binibigyan ng `*` ang buong access.

### `mcp:connect` — kakayahang makitid na ruta (#7895)

Ang pag-abot sa HTTP/SSE MCP transport (`/api/mcp/*`) mula sa labas ng loopback o ang pinagkakatiwalaang LAN ay nangangailangan ng `/api/mcp/` LOCAL_ONLY carve-out (tingnan `docs/security/ROUTE_GUARD_TIERS.md`). Sa kasaysayan, tinanggap lang ng carve-out na iyon ang buong `manage`/`admin` -scope API key — masyadong malawak para sa isang tumatawag na kailangan lang makipag-usap MCP. `src/shared/constants/managementScopes.ts` ngayon ay nag-e-export ng `MCP_CONNECT_SCOPE = "mcp:connect"`: isang additive, makitid na saklaw (parehong precedent bilang `SELF_USAGE_SCOPE`) na nagpapahintulot ONLY ang `/api/mcp/` bypass sa `src/server/authz/policies/management.ts` — hindi ito nagbibigay ng ibang access sa ruta ng pamamahala at sadyang pinapanatili OUT ng `MANAGEMENT_API_KEY_SCOPES`. Ang isang susi na may hawak na `manage`/`admin` ay pumasa pa rin sa carve-out na hindi nagbabago; `mcp:connect` ay isang alternatibong mas mababang pribilehiyo para sa mga malayuang tumatawag na MCP lamang, na sinuri sa pamamagitan ng `hasMcpConnectOrManageScope()`.

### Per-key HTTP scope binding (#7895)

Sa paglipas ng HTTP/SSE, nireresolba na ngayon `open-sse/mcp-server/httpTransport.ts` ang tunay na `api_keys.scopes` ng tumatawag sa pamamagitan `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) at ipinapasa ito sa `transport.handleRequest(req, { authInfo })` ng MCP SDK, kaya ang pag-abot ng `extra.authInfo.scopes` sa bawat tawag sa tool ay sumasalamin sa sariling mga saklaw ng Bearer key. Inuna na ng `scopeEnforcement.ts` ng `resolveCallerScopeContext()` `authInfo` kaysa sa `_meta` at `OMNIROUTE_MCP_SCOPES` env fallback — ito lang ang pumupuno sa una, pinakamataas na priyoridad na pinagmumulan, na dati ay hindi pinapakain sa HTTP. Kapag walang API key na naresolba (walang header, invalid na key), `authInfo` ay mananatiling `undefined` at ang resolution ay napupunta sa umiiral `meta`/env chain na hindi nagbabago. Ang stdio ay walang pagkakakilanlan ng bawat tumatawag (tingnan `mcpCallerIdentity.ts`) at hindi naaapektuhan ng per-key binding — ay nilalaktawan nito ang `_meta` step (`_meta` ay pinarangalan lamang sa loob ng isang HTTP auth context, #15159) at nagre-resolve mula sa `OMNIROUTE_MCP_SCOPES` env key nang mag-isa.

**Pinipilit ang pagpapatupad para sa mga tumatawag HTTP/SSE na may makitid na saklaw anuman ang `OMNIROUTE_MCP_ENFORCE_SCOPES`.** Ino-on `open-sse/mcp-server/server.ts::withScopeEnforcement()` ang pagpapatupad ng saklaw ng bawat tool nang walang kundisyon (`shouldForceScopeEnforcement()` sa `scopeEnforcement.ts`) sa tuwing malulutas ng `resolveCallerScopeContext()` ang `source === "authInfo"` (ibig sabihin, isang real per-key HTTP Authorization header, HTTP/SSE-only) AND ang key na iyon ay hindi humahawak ng buong saklaw ng `manage`/`admin`. Sinasara nito ang puwang kung saan ang isang key na may hawak na ONLY ang makitid `mcp:connect` bypass scope — na nakadokumento sa itaas bilang walang pahintulot kundi ang `/api/mcp/` LOCAL_ONLY carve-out — ay maaaring mag-invoke ng bawat MCP tool kapag na-enable ng operator ang remote/non-loopback MCP access, dahil lang sa `OMNIROUTE_MCP_ENFORCE_SCOPES` na nagpapadala `false` bilang default. Ang isang `manage`/`admin` key sa HTTP, stdio callers at HTTP ay dumadaloy nang walang per-key `authInfo` na nagpapanatili ng gawi ng pandaigdigang bandila. Hindi ibinubukod ng Localhost ang isang HTTP na tumatawag na may makitid na key scope mula sa mandatoryong pagsusuri.

---

## Mga variable ng kapaligiran

| Variable                                | Default                                       | Layunin                                                                                                                                                                                                                                                                                                    |
| :-------------------------------------- | :-------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                      | Base URL na ginagamit ng MCP server kapag tumatawag OmniRoute internal APIs                                                                                                                                                                                                                                |
| `OMNIROUTE_API_KEY`                     | (walang laman)                                | API key na ipinasa bilang `Authorization: Bearer` sa mga internal API na tawag                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` ( `"true"` lang ang nagpapagana nito) | Pinapagana ang mga pangkalahatang pagsusuri sa saklaw ng tool; pagtanggi log `scope_denied:<reason>`. Palaging ipinapatupad ang mga tseke para sa mga HTTP/SSE na tumatawag na may per-key `authInfo` na kulang `manage`/`admin`, kahit na over loopback. Ginagamit ng ibang mga daloy ang watawat na ito. |
| `OMNIROUTE_MCP_SCOPES`                  | (walang laman)                                | Comma-separated allowlist ng mga saklaw na itinuturing na "available" bilang default (ginagamit kapag ang tumatawag ay hindi nagbibigay ng sarili nitong mga saklaw)                                                                                                                                       |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (i-unset = on)                                | Kapag nakatakda sa `0/false/off/no`, idi-disable MCP description compression sa oras ng pagpaparehistro                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (i-unset = on)                                | Kahaliling alias para sa parehong toggle tulad ng nasa itaas                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                       | I-abort ang badyet para sa internal management reads (health, resilience, combos, quota, usage)                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                       | I-abort ang badyet para sa mga hop na naghihintay sa isang provider (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                           |
| `MCP_TOOL_DENY`                         | (i-unset = walang filter)                     | Mga pangalan ng tool na pinaghihiwalay ng kuwit upang i-drop mula sa `tools/list` (tool-cardinality reduction — tingnan sa ibaba)                                                                                                                                                                          |
| `MCP_TOOL_ALLOW`                        | (i-unset = walang filter)                     | Mga pangalan ng tool na pinaghihiwalay ng kuwit upang panatilihing eksklusibo (allow-list mode — tingnan sa ibaba)                                                                                                                                                                                         |
| `DATA_DIR`                              | `~/.omniroute`                                | Ang heartbeat file ay isinulat sa `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                 |

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
