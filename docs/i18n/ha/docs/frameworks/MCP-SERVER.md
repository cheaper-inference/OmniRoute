# OmniRoute MCP Server Documentation (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol uwar garken tare da kayan aikin 110 a duk faɗin hanyar tuƙi, cache, matsawa, ƙwaƙwalwa, ƙwarewa, wakili, tafkin, Radar, da ayyukan tushen mahallin.
>
> Tushen gaskiya: `open-sse/mcp-server/server.ts` lissafta** 110 na musamman kayan aiki** tare da `countUniqueMcpTools()`: 45 ma'anoni na canonical (ciki har da kayan aikin rayuwa CCR shida, gwanin wakili uku, `omniroute_radar_catalog`, da `omniroute_x_search`), da ƙwaƙwalwar ajiya (3), basira (4), ƙwarewar GitHub (3), tafkin (6), gamification (8), plugins (8), Notion (6), Obsidian (22), na gida corpus (3), da kayan aiki na RTK guda biyu.

## Shigarwa

an gina OmniRoute MCP a ciki. Fara shi da:

```bash
omniroute --mcp
```

Ko ta hanyar sufurin buɗaɗɗen-sse:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

Abubuwan jigilar HTTP (`sse` / `streamable-http`, wanda ke aiki a cikin sabar dashboard) an kashe ta tsohuwa kuma a baya ana iya jujjuyawa daga shafin `/dashboard/mcp` kawai. Dangane da v3.8.51 CLI yana da daidaito:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH `mcpEnabled` iri ɗaya (kuma ba zaɓin `mcpTransport`) saita dashboard ta hanyar `/api/settings`. `mcp restart` yana kiran `POST /api/mcp/restart`: yana rushe zaman `sse`/`streamable-http` mai aiki don haka buƙatu ta gaba ta sake farawa da tsafta, dawo da `409` idan MCP ya naƙasa, kuma `501` don jigilar `stdio` (abokan ciniki na stdio sun mallaki nasu aikin ƙaramin tsari — babu wani tsarin aiki don sake farawa).

## Sufuri

Sabar MCP tana fallasa abubuwan jigilar kayayyaki guda uku, duk masana'antar `createMcpServer()` iri ɗaya ce ke goyan bayansu:

| Sufuri            | Ina                                               | Lokacin amfani                                               |
| :---------------- | :------------------------------------------------ | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                   | haɗin gwiwar IDE ( Desktop Claude, Cursor, da sauransu)      |
| `sse`             | `POST/GET /api/mcp/sse` ta hanyar `httpTransport` | Browser/agent abokan ciniki waɗanda ke buƙatar rafi na taron |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                 | Abokan ciniki HTTP da yawa (jigon `mcp-session-id` )         |

An zaɓi jigilar HTTP mai aiki (`sse` ko `streamable-http`) ta saitin `mcpTransport`. Canjawar sufuri yana rufe zaman da ake da shi akan ɗayan jigilar kaya.

### Samun nisa (sarrafa hanyar wucewa)

`/api/mcp/*` yana cikin matakin LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — ta tsohuwa kawai runduna madauki (`localhost`, `127.0.0.1`, `::1`) zasu iya isa gare ta. Tun da v3.8.2, abokan cinikin da ba su dawo ba suna iya haɗawa idan sun gabatar da `Authorization: Bearer <api-key>` wanda maɓallinsa ke ɗauke da iyakar `manage`. Wannan ita ce hanya ɗaya tilo don isa uwar garken MCP mai nisa ta hanyar rami, wakili na baya, ko sunan mai masaukin jama'a.

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

Maɓalli mara sarrafa (ko babu Mai ɗauka) yana dawo da `403 LOCAL_ONLY`. Prefix na 'yan'uwa `/api/cli-tools/runtime/*` da gangan NOT wanda za'a iya wucewa — duba [Tiers Guard Route — Sarrafa-scope-fitar](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Tabbatar da asali

Bayan tantancewa, duk wata bukata ta `/api/mcp/*` — abubuwan jigilar kayayyaki da hanyoyin gudanarwa kamar `status`, `tools`, `audit` da `restart` — suna da ingantaccen rubutun sa `Origin`, duk abin da mai kira ( maɓalli API, alamar CLI, zaman dashboard, ko madauki mara waya tare da kashe shiga). Wannan ita ce kariyar sake fasalin DNS wanda MCP Mai Rarraba HTTP ke buƙata.

- **`Origin` kai** → a yarda. Abokan ciniki na OmniRoute CLI, SDK da IDE ba sa aika ɗaya.
- **An halatta `Origin`** → `localhost`, `127.0.0.1` ko `[::1]` akan kowace tashar jiragen ruwa, ko asalin jama'a na OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, amintaccen asalin wakili na baya (`OMNIROUTE_TRUST_PROXY`, kawai lokacin da ba a saita tushen URL ba), ko mai masaukin loopback/LAN IP kai tsaye. Kan kai na `Host` shi kadai bai taba yin aminta da asali ba.
- **Duk wani `Origin`, gami da `null`** → `403` tare da jikin kuskuren JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Har yanzu ana karɓar zaman dashboard wanda ke gabatar da ingantacciyar alamar CSRF, kamar yadda sauran dashboard ɗin ke rubutawa.

Abokin ciniki MCP mai bincike yana aiki a bayan wakili na baya yana buƙatar `OMNIROUTE_PUBLIC_BASE_URL`; babu izinin-jerin wasu asali. CORS preflight (`OPTIONS`) ba a bincika asalinsa ba; bukatar da ta biyo baya ita ce.

## IDE Kanfigareshan

Dubi [Kanfigareshan Abokin Ciniki na MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) don Desktop Claude, Cursor, Cline, da madaidaitan saitin abokin ciniki MCP.

---

## Kayayyakin Mahimmanci (14) — Mataki na 1

| Kayan aiki                      | Iyaka                 | Bayani                                                                                                                          |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Lokacin aiki, ƙwaƙwalwar ajiya, masu watsewar kewayawa, iyakokin ƙima, ƙididdigar cache                                         |
| `omniroute_list_combos`         | `read:combos`         | Duk abubuwan da aka saita tare da dabaru (ma'auni na zaɓi)                                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | Ma'aunin aiki don takamaiman haduwa                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | Kunna ko kashe haɗin haɗin gwiwa                                                                                                |
| `omniroute_create_combo`        | `write:combos`        | Ƙirƙiri ingantacciyar haɗaɗɗiyar ta hanyar haɗaɗɗun API da ke akwai                                                             |
| `omniroute_check_quota`         | `read:quota`          | Quota used/total, ragowar kashi, lokacin sake saiti, alamar lafiya                                                              |
| `omniroute_route_request`       | `execute:completions` | Aika kammala taɗi ta hanyar OmniRoute routing                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | Rahoton farashi ta lokaci (session/day/week/month)                                                                              |
| `omniroute_list_models_catalog` | `read:models`         | Cikakken kundin tsarin ƙira tare da iyawa, matsayi, farashi                                                                     |
| `omniroute_radar_catalog`       | `read:radar`          | Katalojin Radar da aka sa hannu; na zaɓi provider/family tace                                                                   |
| `omniroute_tool_search`         | `read:tools`          | Nemo kayan aikin daga kundin MCP mai rijista                                                                                    |
| `omniroute_web_search`          | `execute:search`      | Binciken yanar gizo ta hanyar da aka saita masu samar da bincike. Ba X/Twitter.                                                 |
| `omniroute_x_search`            | `execute:search`      | Bincika X ta hanyar xAI/SuperGrok, ko zaɓi `xquik-search` don sakamakon Xquik API. Yana buƙatar takaddun shaida don zaɓin baya. |
| `omniroute_web_fetch`           | `execute:search`      | Dauki abun ciki na gidan yanar gizo ta hanyar da aka saita masu samar da ɗabo                                                   |

## Nagartattun Kayan aiki (11) — Mataki na 2

| Kayan aiki                         | Iyaka                                | Bayani                                                                                                           |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulation busasshen gudu tare da bishiyar fallback                                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | Kasafin kudin zama tare da aikin degrade/block/alert                                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Sabunta dabarun haɗin gwiwa a lokacin aiki (priority/weighted/auto/etc.)                                         |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Aiwatar da saitin juriya na `aggressive` / `balanced` / `conservative`                                           |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Gwajin kai tsaye na kowane mai bayarwa a cikin haɗin gwiwa ta amfani da ainihin kira na sama                     |
| `omniroute_get_provider_metrics`   | `read:health`                        | Ma'auni na kowane mai bayarwa tare da jinkirin p50/p95/p99 da yanayin mai watsewar da'ira                        |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Ba da shawarar haduwa ta nau'in ɗawainiya tare da ƙuntatawa budget/latency                                       |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Bayyana dalilin da yasa aka tuntuɓar buƙatun zuwa mai bayarwa (masu ƙima + faɗuwar baya)                         |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Hoton cikakken zaman: farashi, alamu, babban models/providers, kurakurai, tsarin kasafin kuɗi                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Binciko (kuma ba na zaɓi auto-gyara) bayanan bayanai suna jujjuyawa kamar karyewar haɗaɗɗen refs / layuka marayu |
| `omniroute_sync_pricing`           | `pricing:write`                      | Daidaita bayanan farashi daga tushen waje (LiteLLM); yana goyan bayan `dryRun`                                   |

## Kayan aikin Cache (2)

| Kayan aiki              | Iyaka         | Bayani                                                      |
| :---------------------- | :------------ | :---------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Cache na Semantic, cache mai sauri, da ƙididdiga masu ƙarfi |
| `omniroute_cache_flush` | `write:cache` | Cire cache a duniya ko ta signature/model                   |

## Kayayyakin Matsi (13)

| Kayan aiki                          | Iyaka               | Bayani                                                                                                                      |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Saitunan matsawa, taƙaitaccen nazari, da ƙididdiga masu fa'ida (ya haɗa da metadata `analytics.mcpDescriptionCompression` ) |
| `omniroute_compression_configure`   | `write:compression` | Saita yanayin matsawa, bakin kofa, rabon manufa, tsarin gaggawar kiyayewa, kwatancen matsi MCP                              |
| `omniroute_set_compression_engine`  | `write:compression` | Zaɓi injin mai aiki (off/caveman/rtk/stacked) da ƙarfin Caveman/RTK                                                         |
| `omniroute_list_compression_combos` | `read:compression`  | Jerin sunayen combos masu matsawa da bututun injin su                                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | Ana tattara bayanai ta hanyar haɗakarwa da injin                                                                            |
| `omniroute_ccr_store`               | `write:compression` | Ajiye abun cikin keɓancewar mai kira a cikin shagon CCR mai iyaka a cikin memori kuma mayar da alamar da bayanin `ccr://`   |
| `omniroute_ccr_retrieve`            | `read:compression`  | Mai da abun ciki CCR cikakke ko tare da kai, wutsiya, layi, grep, da yanayin ƙididdiga                                      |
| `omniroute_ccr_inspect`             | `read:compression`  | Bincika metadata CCR mallakar mai kira ba tare da mayar da abun ciki ba                                                     |
| `omniroute_ccr_list`                | `read:compression`  | Lissafin metadata da aka keɓe don tubalan CCR mallakar mai kira                                                             |
| `omniroute_ccr_delete`              | `write:compression` | Share block CCR mallakar mai kira                                                                                           |
| `omniroute_ccr_stats`               | `read:compression`  | Ba da rahoto game da amfani da ƙwaƙwalwar ajiyar mai kira, ƙidayar rayuwa, da iyakan adanawa                                |
| `omniroute_rtk_discover`            | `read:compression`  | Gano maimaita hayaniyar a cikin samfuran fitarwa RTK                                                                        |
| `omniroute_rtk_learn`               | `read:compression`  | Ƙirƙirar daftarin tace RTK da za'a iya bita daga samfuran ficewa                                                            |

shigarwar CCR suna cikin ƙwaƙwalwar ajiya kawai kuma suna ɓacewa a sake farawa. Kowane toshe yana iyakance ga 2 MiB, kowane babba zuwa 16 MiB, kuma kantin sayar da kayayyaki na duniya zuwa 64 MiB. Matsakaicin shigarwar zuwa TTL na awa 24 (mafi girman kwanaki bakwai). Cikakken dawo da MCP yana iyakance zuwa 256 KiB; manyan tubalan sun kasance suna samuwa ta hanyar jeri da grep. Ma'ajiya, dawo da, jeri, dubawa, gogewa, da ƙididdiga an ware su ta ingantacciyar maɓalli na API. Rubutun dubawa sun ƙunshi hashes da girman metadata, ba abun ciki ba.

`omniroute_compression_status` ya ba da rahoton matsawa bayanin MCP daban a ƙarƙashin `analytics.mcpDescriptionCompression`. Waɗannan ƙididdiga sune ƙididdiga-girman metadata don kwatancen MCP (`tools`, `prompts`, `resources`, da `resourceTemplates`); ba masu bada rasidun amfani ba ne kuma ana yiwa alama da `source: "mcp_metadata_estimate"`.

### Tace Bishiyar Samun damar MCP (v3.8.0)

Ya bambanta da kayan aikin matsawa da ke sama, OmniRoute ya haɗa da tacewa bayan aiwatarwa wanda ke matsawa** sakamakon kayan aiki** na MCP browser/accessibility kayan aikin kafin a mayar da su zuwa ga wakili. Wannan matattarar ba ita kanta kayan aikin — bane tana gudana a bayyane akan kowane sakamakon kayan aiki wanda ke ƙunshe da kalmar shiga-itace ko rubutu-snapshot (≥ 2000 chars).

Mahimman halaye:

- Rushe ≥ 30 a jere akai-akai layukan 'yan uwan juna zuwa cikin taƙaicen wutsiya na +
- Yana adana anchors na `[ref=eXX]` da Playwright/computer-use ke buƙata
- Matsakaicin rubutu mai girma (> 50,000 chars) tare da alamar kewayawa
- Adadin da ake tsammani:** 60-80%** a kan kayan aikin bincike na hoto

Kanfigareshan: `compression.mcpAccessibility` a cikin saitunan duniya (hijira 056). Aiki: `open-sse/services/compression/engines/mcpAccessibility/`. Cikakkun takardu: [Injin Matsi — MCP Tacewar Bishiyar Samun Samun damar](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Dubi [Injin Matsawa](../compression/COMPRESSION_ENGINES.md) da [Matsin RTK](../compression/RTK_COMPRESSION.md) don ƙirar matsi na lokacin gudu a bayan waɗannan kayan aikin.

## 1 Kayan aikin wakili (3)

| Kayan aiki                  | Iyaka          | Bayani                                                                                      |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Nemo wakili na kyauta daga kasuwan wakili na 1 ( masu tace protocol/country/quality/limit ) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Sami wakili na gaba ta hanyar dabara (`random` / `quality` / `sequential`)                  |
| `omniroute_oneproxy_stats`  | `read:proxies` | Ƙididdigar tafkin, yanayin daidaitawa, rarraba ta yarjejeniya da ƙasa                       |

## Kayayyakin Ƙwaƙwalwa (3)

An bayyana a cikin `open-sse/mcp-server/tools/memoryTools.ts`. ana aiwatar da Auth/scope ta hanyar daidaitaccen bututun iyakar MCP.

| Kayan aiki                | Iyaka          | Bayani                                                                                               |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Nemo abubuwan tunawa ta hanyar tambaya / nau'in / maɓallan API tare da aiwatar da token-kasafin kuɗi |
| `omniroute_memory_add`    | `write:memory` | Ƙara sabon shigarwar ƙwaƙwalwar ajiya (`factual` / `episodic` / `procedural` / `semantic`)           |
| `omniroute_memory_clear`  | `write:memory` | Share memories don maɓallin API, zaɓin tace ta nau'in ko tambarin lokaci `olderThan`                 |

## Kayayyakin Ƙwarewa (4)

An bayyana a cikin `open-sse/mcp-server/tools/skillTools.ts`. An goyi bayan `src/lib/skills/registry` + `src/lib/skills/executor`.

| Kayan aiki                    | Iyaka            | Bayani                                                                                      |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Yi lissafin ƙwarewar rajista tare da tace zaɓi ta maɓallin API, suna, ko jihar da aka kunna |
| `omniroute_skills_enable`     | `write:skills`   | Kunna ko kashe takamaiman fasaha ta ID                                                      |
| `omniroute_skills_execute`    | `execute:skills` | Yi fasaha tare da shigar da aka bayar kuma mayar da rikodin aiwatarwa                       |
| `omniroute_skills_executions` | `read:skills`    | Jerin tarihin aiwatar da fasaha na kwanan nan                                               |

## Notion Magana (6)

An bayyana a cikin `open-sse/mcp-server/tools/notionTools.ts`. Alamar da aka adana a cikin tebur `key_value` ta hanyar `src/lib/db/notion.ts`. REST client in `src/lib/notion/api.ts`. Saitunan API a cikin `src/app/api/settings/notion/route.ts`. Dashboard UI in `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Sanya alamar haɗin kai na Notion daga** Tushen Magana** tab a cikin dashboard na Ƙarshen, ko ta hanyar REST API:

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

| Kayan aiki                   | Iyaka          | Bayani                                                         |
| :--------------------------- | :------------- | :------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Binciken cikakken-rubutu a duk shafuka da bayanan bayanai      |
| `notion_get_page`            | `read:notion`  | Samu shafi ta ID tare da kaddarorin sa                         |
| `notion_list_block_children` | `read:notion`  | Jera tubalan yara na shafi ko toshe                            |
| `notion_query_database`      | `read:notion`  | Nemi bayanan bayanai tare da masu tacewa, nau'ikan, da fage    |
| `notion_get_database`        | `read:notion`  | Samun tsarin bayanai ta ID                                     |
| `notion_append_blocks`       | `write:notion` | Haɗa katangar yara zuwa katangar iyaye (max 100 kowace buƙata) |

## Kayan aikin Ƙwarewar Wakili (3)

An bayyana a cikin `open-sse/mcp-server/tools/agentSkillTools.ts`. `src/lib/agentSkills/catalog` ya goyi bayan . Waɗannan kayan aikin suna fallasa katalogin ƙwararrun masu shiga wakili 45 ga abokan cinikin MCP da wakilai na waje. iyaka: `read:catalog`.

| Kayan aiki                        | Iyaka          | Bayani                                                                                                                                       |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Yi lissafin duk ƙwarewar wakili 45 tare da zaɓin `category` (api\| cli) da tace `area` ; yana dawo da bayanan metadata +                     |
| `omniroute_agent_skills_get`      | `read:catalog` | Samun cikakken metadata + SKILL.md abun ciki don fasaha ɗaya ta canonical `id`                                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | Ƙididdigar ɗaukar hoto: nawa ne daga cikin 23 API, 21 CLI da 1 config skills suna da fayilolin SKILL.md akan tsarin fayil vs jimlar katalogi |

Dubi [AGENT-SKILLS.md](./AGENT-SKILLS.md) don cikakken kasida da yadda wakilai na waje ke cinye shi.

## Tsarukan da ke da alaƙa (v3.8.0)

Ƙirar kayan aikin MCP da ke sama (kayan aiki na musamman 110, wanda `countUniqueMcpTools()` ya ƙididdige shi) da gangan an keɓe shi don ayyukan routing/cache/compression/memory/skills/proxy/context-source na lokaci. Jigilar gine-gine guda biyu kusa da sabar MCP a v3.8.0 kuma an rubuta su daban:

### Cloud Agents

Wakilan Cloud ba su da tsari AI masu coding (codex-cloud, cursor-cloud, devin, jules) cikin OmniRoute ta hanyar haɗin haɗin da aka yi amfani da shi don masu samar da LLM. Ana fallasa su ta fuskar REST nasu (`/api/v1/agents/*`) kuma suna** ba** wani ɓangare na kundin kayan aikin MCP — kiran wakilin Cloud baya cinye iyakar MCP.

- Aiwatar da: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Rayuwar rayuwa: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Takardun: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Hanyar gadi

Wuraren gadi sune filtattun pre/post-execution (gadar hangen nesa, mai-masker, allura da gaggawa) waɗanda ake amfani da su a cikin bututun taɗi. Suna gudu kafin a kai ga layin MCP tool/route kuma suna fitar da ƙetaren tsari ga bututun tantancewa; ba a kiran su azaman kayan aikin MCP.

- Aiki: `src/lib/guardrails/`.
- Takardun: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Lokacin zana kiran MCP da ya bayyana an katange, duba duka rajistan binciken MCP ( shigarwar `scope_denied:*` ) da kuma hanyar duba hanyoyin tsaro — za a iya ki amincewa da bukatar ta hanyar tsaro.** kafin** ya tava kaiwa ma'aunin tilastawa iyakar MCP.

---

## REST API Endpoints

| Ƙarshen Ƙarshe         | Hanya                 | Bayani                                                                                              | Gaskiya                   |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Matsayin uwar garken: bugun zuciya, jihar safarar HTTP, taƙaita ayyukan dubawa                      | Gudanarwa (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Kas ɗin kayan aiki (suna, bayanin, scopes, lokaci, wuraren ƙarshen tushe)                           | Gudanarwa                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE kawo ƙarshen tashar (gated by `mcpEnabled` + `mcpTransport === "sse"`)                          | API key + scopes          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | jigilar HTTP mai gudana (yana amfani da taken `mcp-session-id` ; `DELETE` yana ƙare zaman)          | API key + scopes          |
| `/api/mcp/audit`       | `GET`                 | Shigar da rajista daga `mcp_tool_audit` ( tacewa: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Gudanarwa                 |
| `/api/mcp/audit/stats` | `GET`                 | Ƙididdigar ƙididdigar ƙididdiga (`totalCalls`, `successRate`, `avgDurationMs`, manyan kayan aikin)  | Gudanarwa                 |

Source files: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Ana toshe jigilar SSE da Streamable HTTP har sai an kunna uwar garken MCP a cikin Saituna (`mcpEnabled`) kuma an zaɓi `mcpTransport` da ya dace. Idan an saita jigilar da ba daidai ba hanyar zata dawo HTTP 400 tare da alamar canza saitunan.

---

## Tabbatarwa & Iyaka

kiran kayan aiki MCP karanta iyakar kirtani daga mai kira. Wannan cak ɗin ɗaya ne daga cikin wuraren sunaye masu zaman kansu. Fassara daga mai duba ɗaya ba wucewa ce daga sauran ba. Dokokin sune [wuraren sunaye guda uku](#three-scope-namespaces). Kas ɗin kayan aiki shine [iyakokin kayan aiki na MCP](#mcp-tool-scopes).

### Wuraren sunaye guda uku

`manage` akan maɓallin API, `read:compression` akan kayan aiki MCP, da `read` akan alamar samun damar `oma_live_…` kyauta ne daban-daban guda uku. Masu kira waɗanda suka aika alamar samun damar `read` zuwa hanyar sarrafa mutating suna samun HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Wannan daraja shine `scopeSatisfies`. Ba ya tuntubar teburin MCP, kuma mai daidaita MCP ba ya shawarce shi.

| Wurin suna            | Takaddun shaida                                                                                 | Mai duba                  | Fas ɗin yana ba da izini                                          |
| :-------------------- | :---------------------------------------------------------------------------------------------- | :------------------------ | :---------------------------------------------------------------- |
| API-key management    | `api_keys.scopes`                                                                               | `hasManageScope`          | Gudanar da REST don maɓallin Mai ɗauka                            |
| API-key additive      | tsararru iri ɗaya, daidai kirtani ɗaya                                                          | mataimaki mai suna a kasa | Iyawar daya ce kawai                                              |
| MCP kayan aiki scopes | tsararru iri ɗaya, da sauransu MCP `_meta` (HTTP/SSE kawai), da sauransu `OMNIROUTE_MCP_SCOPES` | `scopeMatches`            | Wannan kayan aikin, da zarar an kunna aiwatarwa                   |
| Alamar shiga          | `oma_live_…`                                                                                    | `scopeSatisfies`          | Hanyar gudanarwa wacce hanya da tafarki ke buƙatar wannan matsayi |

Ƙaddamar da kowane takaddun shaida an rufe shi a cikin [Tabbatar da Gudanarwa](../guides/MANAGEMENT-AUTH.md).

#### Maɓallin maɓallin API

Tsarin `api_keys.scopes` ɗaya yana ciyar da ayyuka biyu. Suna amfani da ayyuka daban-daban.

**Management REST.** `manage` da `admin` su ne mambobi na `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` shine abin da ke ba da izinin hanyoyin gudanarwa don wannan maɓalli. `admin` yana da ikon sarrafawa akan waɗannan hanyoyin. Kalmar `admin` a nan ba ita ce darajar samun damar shiga ba kuma baya faɗaɗa cikin MCP kayan aiki scopes.

**Adadin igiyoyi.** Kowannensu ainihin gwajin zama memba ne, kuma kowanne yana tsayawa a wajen `MANAGEMENT_API_KEY_SCOPES`.

| Iyakar                         | Fas ɗin yana ba da izini                                                                                                                                                        |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | `/api/mcp/` LOCAL_ONLY wanda ba na loopback ba ne kawai (`hasMcpConnectOrManageScope`). Maɓalli tare da `manage` ko `admin` har yanzu yana wucewa wanda aka sassaƙa.            |
| `self:usage`                   | `GET /api/v1/me/status` don wannan maɓalli (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` yana ƙara wannan iyaka akan ƙirƙira (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Ƙididdigar asusu na sama a cikin waccan ƙimar matsayi (`src/lib/usage/apiKeySelfService.ts`). Hanyar halin har yanzu tana buƙatar `self:usage`.                                 |
| `policy:bypass-provider-quota` | Ƙididdigar maɓalli na kira ta tsallake manufofin keɓaɓɓun mai bada (`hasProviderQuotaBypassScope` a `src/sse/handlers/chat.ts`).                                                |

#### Daidaitawa

Katalogin shine tebur a ƙarƙashin [MCP kayan aiki scopes](#mcp-tool-scopes). Kar a ɗauki `MCP_SCOPE_LIST` a cikin `src/shared/constants/mcpScopes.ts` azaman kasidar: shine asalin ƙasidar da aka buga. Daga baya kayan aikin suna bayyana ƙarin iyakoki kusa da shi (`read:notion`, `read:skills`, `read:local-corpus`, da sauran tebur).

`evaluateToolScopes` a cikin `open-sse/mcp-server/scopeEnforcement.ts` yana ba da damar kira lokacin da kowane iyakar da ake buƙata ya dace da wasu iyawar da aka bayar:

- `*` yayi daidai da kowane iyakar da ake buƙata.
- Ƙimar da aka ba da ita wacce ta ƙare a cikin `*` ta yi daidai da iyakar da ake buƙata wanda ke farawa da prefix kafin tauraro. `read:*` matches `read:compression`.
- Duk sauran iyakokin da aka ba su yayi daidai da irin wannan kirtani da ake buƙata kawai.

Maɓalli wanda iyakar sa `["manage"]` ya gaza `scopeMatches` don `read:compression`. Kira guda ɗaya ya kasa ga `admin`, `mcp:connect`, `read`, da `write` lokacin da waɗancan ne kawai da aka ba da kirtani. Babu wani matsayi a tsakanin iyakokin kayan aikin MCP da ya wuce `*` mai bin diddigi.

An kashe tilastawa sai dai idan `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (tsoho `false`). Yayin da yake a kashe, `evaluateToolScopes` yana ba da damar kira kuma ya tsallake kasida. Yayin da yake kunne, HTTP yana amfani da `api_keys.scopes` ɗin maɓallin Bearer azaman `authInfo` (duba [Per-key HTTP scope daurin](#per-key-http-scope-binding-7895) ). Lokacin da ba a warware maɓalli na maɓalli ba, saitin da aka bayar yana faɗuwa zuwa MCP `_meta` (wanda aka girmama shi kawai don masu kiran HTTP/SSE, a cikin mahallin auth HTTP ; ana watsi da `_meta` mai kiran stdio saboda abokin ciniki yana sarrafa shi kuma ba ya ɗauke da ainihin mai kira), sannan `OMNIROUTE_MCP_SCOPES`.

#### Matsakaicin damar shiga

`oma_live_…` token (`src/lib/accessTokens/scopes.ts`) ɗauke da `read`, `write`, ko `admin`. `scopeSatisfies` matsayi ne: `admin` yana rufe `write` da `read`, kuma `write` yana rufe `read`. Wuraren da ba a sani ba sun rufe komai.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ya kwatanta wannan matsayi da `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, da `OPTIONS` suna buƙatar `read`.
- Duk wata hanya tana buƙatar `write`.
- Hanyoyi a cikin `ADMIN_SCOPE_PREFIXES` suna buƙatar `admin` ga kowace hanya. `/api/mcp` yana kan wannan jerin, don haka alamar samun damar `write` har yanzu ba zai iya kiran saman MCP HTTP.
- Hanyoyi a cikin `ADMIN_MUTATION_PREFIXES` suna buƙatar `admin` kawai don maye gurbi.
- Hanyoyi a cikin `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) suna buƙatar `admin` don maye gurbi kawai, kuma akan wannan ainihin hanyar — sauran ƙananan hanyoyin `/api/settings/*` suna kiyaye `write`.

`PATCH /api/keys/{id}` maye gurbi ne kuma baya cikin waɗancan jerin sunayen admin, don haka alamar `read` tana karɓar 403 `Access token scope 'read' is insufficient; 'write' required.` A `write` ko alamar shiga `admin` yana gamsar da wannan hanyar. Dashboard JWT, madauki CLI na'ura-id alama, da maɓallin API mai `manage` ko `admin` suna ɗaukar wasu rassan kuma ba a rage su da wannan daraja ba.

Alamar shiga da ta wuce `scopeSatisfies` don `/api/mcp` ta share ƙofar gudanarwa kawai. Kiran kayan aiki har yanzu yana gudana `scopeMatches` akan maɓallan maɓalli na API. Matsayin alamar shiga ba shigarwar `scopeMatches` ba ne.

### MCP kayan aiki scopes

Ƙaddamar da aiwatar da iyaka a cikin `open-sse/mcp-server/scopeEnforcement.ts`. Kowane kayan aiki yana buƙatar takamaiman iyakoki:

| Iyakar                | Kayan aiki                                                                                                                                                                           |
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
| `read:obsidian`       | 13 karanta kayan aikin — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`,… |
| `write:obsidian`      | 9 rubuta kayan aikin — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`,…                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Ana tallafawa iyakoki na kati: `read:*` yana ba da damar duk abubuwan karantawa, `*` yana ba da cikakken dama.

### `mcp:connect` — madaidaicin iyawar hanya (#7895)

Isar da jigilar HTTP/SSE MCP (`/api/mcp/*`) daga waɗanda ba madauki ba yana buƙatar sassaƙa `/api/mcp/` LOCAL_ONLY (duba `docs/security/ROUTE_GUARD_TIERS.md`). A tarihi cewa sassaƙaƙƙen ya karɓi cikakken `manage`/`admin` -scope API maɓalli — mai faɗi sosai ga mai kira wanda kawai yana buƙatar yin magana MCP. `src/shared/constants/managementScopes.ts` yanzu yana fitar da `MCP_CONNECT_SCOPE = "mcp:connect"`: ƙari, kunkuntar iyaka (daidaitacce kamar `SELF_USAGE_SCOPE`) wanda ke ba da izinin ONLY ta hanyar `/api/mcp/` a cikin `src/server/authz/policies/management.ts` — ba ta ba da wata hanyar gudanarwa ba kuma ana kiyaye OUT na `MANAGEMENT_API_KEY_SCOPES` da gangan. Maɓalli mai riƙe da `manage`/`admin` har yanzu yana wucewa da sassaƙa ba canzawa; `mcp:connect` shine mafi ƙarancin gata don masu kiran MCP-kawai na nesa, wanda aka bincika ta hanyar `hasMcpConnectOrManageScope()`.

### Ƙaƙƙarfan HTTP na kowane maɓalli (#7895)

A kan HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` yanzu yana warware ainihin `api_keys.scopes` na mai kira ta hanyar `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) kuma ya wuce shi zuwa MCP SDK's `transport.handleRequest(req, { authInfo })`, don haka `extra.authInfo.scopes` isa kowane kiran kayan aiki yana nuna maɓalli na maɓalli na kansa. `scopeEnforcement.ts`'s `resolveCallerScopeContext()` ya riga ya fifita `authInfo` akan `_meta` da `OMNIROUTE_MCP_SCOPES` env fallback — wannan shine kawai tushen farko, mafi girman fifiko, wanda a baya ba a ciyar dashi akan HTTP. Lokacin da babu maɓallin API da ya warware (babu mai kai, maɓalli mara inganci), `authInfo` yana tsayawa `undefined` kuma ƙuduri ya faɗi zuwa sarkar `meta`/env data kasance baya canzawa. stdio ba shi da shaidar kowane mai kira (duba `mcpCallerIdentity.ts`) kuma ba shi da tasiri ta kowane maɓalli daure — ya tsallake matakin `_meta` (`_meta` ana girmama shi ne kawai a cikin mahallin HTTP auth, #15159) kuma yana warwarewa daga maɓallin `OMNIROUTE_MCP_SCOPES` env kaɗai.

**Ana tilasta tilasta yin aiki ga masu kiran HTTP/SSE kunkuntar ba tare da la'akari da `OMNIROUTE_MCP_ENFORCE_SCOPES` ba.** Tsokacin `OMNIROUTE_MCP_ENFORCE_SCOPES` zuwa `false` yana da aminci kawai ga local/stdio mai gudanar da aikin guda ɗaya, inda babu kowane mai kiran da zai yi iyaka da shi. `open-sse/mcp-server/server.ts::withScopeEnforcement()` yana juya ikon aiwatar da kowane kayan aiki ba tare da wani sharadi ba (`shouldForceScopeEnforcement()` a cikin `scopeEnforcement.ts`) a duk lokacin da `resolveCallerScopeContext()` ya warware `source === "authInfo"` (watau ainihin kowane maɓalli HTTP mai ba da izini, HTTP/SSE-only) AND wannan maɓalli ba ya riƙe cikakken ikon `manage`/`admin`. Wannan yana rufe tazarar inda maɓalli mai riƙe ONLY kunkuntar `mcp:connect` kewayawa — da aka rubuta a sama kamar yadda ba ta ba da izinin komai ba face `/api/mcp/` LOCAL_ONLY sassaƙa — ba zai iya kiran kowane kayan aikin MCP da zarar ma'aikaci ya kunna damar remote/non-loopback MCP, kawai saboda `OMNIROUTE_MCP_ENFORCE_SCOPES` yana jigilar `false` ta tsohuwa. Cikakken maɓalli na `manage`/`admin` akan HTTP, kuma kowane mai kiran stdio/local, kiyaye halin -gated `OMNIROUTE_MCP_ENFORCE_SCOPES` da ake ciki baya canzawa.

---

## Canje-canjen Muhalli

| Mai canzawa                             | Tsohuwar                                    | Manufar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------------------------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                    | Tushen URL uwar garken MCP yana amfani dashi lokacin kiran OmniRoute na ciki APIs                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_API_KEY`                     | (Ba komai)                                  | maɓallin API da aka tura azaman `Authorization: Bearer` zuwa kiran API na ciki                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` ( `"true"` ne kawai yake kunna shi) | Lokacin da aka kunna, ɓangarorin da suka ɓace suna ƙin kiran kayan aiki da shiga `scope_denied:<reason>` a cikin log ɗin dubawa. Ana tilastawa aiwatar da ALSO ba tare da la'akari da wannan tuta ba ga kowane mai kiran HTTP/SSE da aka warware daga kowane maɓalli na izini (`source === "authInfo"`) wanda ba shi da cikakken `manage`/`admin` scope — misali maɓalli mai riƙe da ƙunƙunwar `mcp:connect` kewayawa — don haka wannan tsoho ba shi da aminci kawai ga local/stdio mai aiki guda ɗaya kawai, ba don samun nisa daga nesa ba. |
| `OMNIROUTE_MCP_SCOPES`                  | (Ba komai)                                  | Jerin izinin waƙafi-wakafi da aka yi la'akari da "samuwa" ta tsohuwa (amfani da shi lokacin da mai kira bai samar da nasa ikon)                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (unset = on)                                | Lokacin da aka saita zuwa `0/false/off/no`, yana hana matsi bayanin MCP a lokacin rajista                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (unset = on)                                | Madadin laƙabi don juyawa iri ɗaya kamar na sama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                     | Zubar da kasafin kuɗi don karantawa na gudanarwa na ciki (lafiya, juriya, haɗaka, keɓaɓɓu, amfani)                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                     | Zubar da kasafin kuɗi don hops waɗanda ke jiran mai bayarwa (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `MCP_TOOL_DENY`                         | (unset = no filter)                         | Sunayen kayan aiki da aka raba waƙafi don saukewa daga `tools/list` ( rage girman kayan aiki-kardinality — duba ƙasa)                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `MCP_TOOL_ALLOW`                        | (unset = no filter)                         | Sunayen kayan aikin da aka ware waƙafi don kiyaye keɓancewar (yanayin-jerin izini — duba ƙasa)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `DATA_DIR`                              | `~/.omniroute`                              | An rubuta fayil ɗin bugun zuciya zuwa `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

---

## Bayanin Matsi

MCP kayan aiki, gaggawa, da albarkatun albarkatun suna iya damfara kwatance a lokacin registration/list don rage sawun metadata da aka fallasa ga abokan ciniki (saboda haka farashin mahallin da sauri). Aiwatar tana zaune a cikin `open-sse/mcp-server/descriptionCompressor.ts` kuma ana haɗa shi cikin uwar garken MCP ta hanyar `compressMcpRegistryMetadata` cikin `createMcpServer()`.

- Matsawa yana gudana akan rubutun bayanin ta amfani da dokokin Caveman (`getRulesForContext("all", "full")`) tare da cire katangar da aka kiyaye (tsararrun lambobi, shingen shinge, da sauransu) don haka abun ciki na tsari ba ya canzawa.
- Juya kowane tura aiki ta hanyar ƙimar `compression.mcpDescriptionCompressionEnabled` a cikin tebur saitunan `key_value` (tsoho: kunna) — fallasa a cikin UI kamar yadda** Analytics → MCP kwatancin matsawa** .
- Juyawa tsari-fadi ta ko dai `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ko `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Ana fitar da ƙididdiga na ainihi ta hanyar `omniroute_compression_status` ƙarƙashin `analytics.mcpDescriptionCompression` kuma ana yiwa `source: "mcp_metadata_estimate"` alama don ɓata daga rasidun amfanin mai bada na gaske.

---

## Rage Cardinality Kayan aiki (F4.3)

Matsa bayanin yana raguwa kowane metadata na kayan aiki;** kayan aiki-kardinality rage** ya wuce mataki daya ta hanyar rage _nawa_ kayan aikin da aka sanar kwata-kwata. Tallan kayan aikin ƙanƙanta a cikin bayanin `tools/list` yana rage ƙimar buƙatun kowane ƙima na abokin ciniki yana biyan kundin kayan aiki (matsi "Layer 5"). Aiwatar da tsaftataccen tacewa mara jiha a cikin `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), wanda aka haɗa cikin madaukin rajista a cikin `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Ficewa, kashe ta tsohuwa.** Tace tana gudana ne kawai lokacin da aka saita aƙalla ɗaya daga cikin masu canjin yanayi biyu; ba tare da saiti ba, duk kayan aikin 110 an sanar da su ba canzawa.

| Mai canzawa      | Yanayin                                                                                     |
| :--------------- | :------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Baƙaƙe sunayen kayan aikin waƙafi — waɗanda koyaushe ana barin su daga `tools/list`         |
| `MCP_TOOL_ALLOW` | Sunayen kayan aikin da aka raba wakafi- — ; kawai waɗannan sun tsira, duk abin da aka jefar |

`deny` tana ɗaukar fifiko akan `allow`. Sunaye an raba waƙafi, daddatsa, kuma an yi watsi da shigarwar wofi. Misalai:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Yadda ake cire kayan aikin tacewa:** rajista kullum yana yin nasara; kayan aikin da bayanin martaba ya ƙi sai `.disable()` d akan hannun MCP SDK, don haka ba zai taɓa bayyana a `tools/list` ba amma wiring ɗin ya tsaya daidai (tsabta enable/disable, babu sake yin rajista). Fassarar bayanan martaba shine `readMcpToolProfileFromEnv(process.env)`, wanda ke dawo da `null` (babu tacewa) lokacin da duka vars ba su da komai.

Siffar `ToolProfile` mafi arziƙi a bayan `reduceToolManifest` kuma tana goyan bayan tace-intersection (`allowScopes`, tare da `read:*` -style matching wildcard) da madaidaicin `maxTools` cap, amma waɗannan kulli guda biyu suna buƙatar cikakken bayyanar a lokacin rajista kuma suna** ba** fallasa ta hanyar sauye-sauyen yanayi a yau (ƙugiya `tools/list` -level shine bibiyar sa ido). `estimateManifestTokens()` yana samuwa don kwatanta farashi mai bayyanawa kafin da bayan raguwa.

---

## Runtime Heartbeat

Jirgin sitiyo yana dawwama zuwa `${DATA_DIR}/runtime/mcp-heartbeat.json` kowane daƙiƙa 5. Dashboard (`/api/mcp/status`) yana karanta wannan fayil tare da PID liveness don samun `online`. HTTP yana jigilar rahoton jihar daga cikin tsarin `getMcpHttpStatus()` maimakon (babu rubutaccen fayil).

Hoton bugun zuciya ya ƙunshi:

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

## Shigar Audit

Ana shigar da kowane kiran kayan aiki zuwa teburin SQLite `mcp_tool_audit` ta `open-sse/mcp-server/audit.ts`:

- Sunan kayan aiki, muhawara (hashed/truncated as per-tool `auditLevel`), sakamako
- Tsawon lokaci a cikin ms, tutar success/failure, saƙon kuskure (idan an zartar)
- API key hash, timestamp
- An shigar da musun iyaka a matsayin `scope_denied:<reason>` tare da jerin abubuwan da ya ɓace

Yi amfani da dashboard ko `/api/mcp/audit` da `/api/mcp/audit/stats` REST wuraren ƙarshe don duba kiran kwanan nan.

---

## Fayiloli

| Fayil                                                                    | Manufar                                                                              |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | masana'antar uwar garken MCP, wurin shiga stdio, rajistar kayan aiki da aka iyakance |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP sufuri (Gudanar da zaman)                                      |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Ƙimar iyakar kayan aiki da ƙudurin mai kira                                          |
| `open-sse/mcp-server/audit.ts`                                           | Toolkiran duba rajistan shiga (`mcp_tool_audit`)                                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | marubucin bugun zuciya (`mcp-heartbeat.json`)                                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Matsa bayanin don kayan aiki / gaggawa / rajistar albarkatu                          |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemas + kayan aikin rajista (`MCP_TOOLS`, shigarwar 45)                        |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Mataki na 2 + cache + 1proxy Tool handlers                                           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Masu sarrafa kayan aikin matsawa                                                     |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Ma'anar kayan aikin ƙwaƙwalwar ajiya (kayan aiki 3)                                  |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Ma'anar kayan aikin fasaha (kayan aiki 4)                                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion mahallin ma'anar kayan aikin tushen tushen (kayan aiki 6)                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Ma'anar kayan aikin Gamification (kayan aikin 8)                                     |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Rijistar plugin da kayan aikin gudanarwa (kayan aiki 8)                              |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` karshen                                                            |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` karshen                                                             |
| `src/app/api/mcp/sse/route.ts`                                           | hanyar sufuri `/api/mcp/sse` SSE                                                     |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP hanyar sufuri                                      |
| `src/app/api/mcp/audit/route.ts`                                         | tambayar log na duba `/api/mcp/audit`                                                |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` yawan awo awo                                                 |
| `src/lib/notion/api.ts`                                                  | Notion REST API abokin ciniki (sake gwadawa, ƙarewar lokaci, rarraba kuskure)        |
| `src/lib/db/notion.ts`                                                   | Notion token dagewa ( tebur `key_value` )                                            |
| `src/app/api/settings/notion/route.ts`                                   | Notion settings API (GET/POST/DELETE)                                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion token management UI                                                           |
| `tests/unit/notion-api.test.ts`                                          | Gwajin abokin ciniki Notion API (7)                                                  |
| `tests/unit/notion-tools.test.ts`                                        | Gwaje-gwajen tilasta aiwatar da kayan aikin Notion (10)                              |
| `tests/unit/db/notion.test.mjs`                                          | gwajin module Notion DB (3)                                                          |
