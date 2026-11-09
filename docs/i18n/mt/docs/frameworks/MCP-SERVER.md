# OmniRoute MCP Server Documentation (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server tal-Protokoll tal-Kuntest Mudell b'110 għodda madwar operazzjonijiet ta' rotta, cache, kompressjoni, memorja, ħiliet, prokura, pool, Radar, u operazzjonijiet tas-sors tal-kuntest.
>
> Source of truth: `open-sse/mcp-server/server.ts` computes **110 unique tools** with `countUniqueMcpTools()`: 45 canonical definitions (including the six CCR lifecycle tools, the agent-skills trio, `omniroute_radar_catalog`, and `omniroute_x_search`), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), and two RTK-only compression tools.

## Installazzjoni

OmniRoute MCP huwa mibni. Ibda bi:

```bash
omniroute --mcp
```

Jew permezz tat-trasport open-sse:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

It-trasporti HTTP (`sse` / `streamable-http`, moqdija waqt il-proċess mis-server tad-dashboard) huma mitfija awtomatikament u qabel kienu toggleable biss mill-paġna `/dashboard/mcp`. Minn v3.8.51 iż- CLI għandu parità:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH l-istess `mcpEnabled` (u optionalment `mcpTransport`) issettjar tad-dashboard toggles permezz `/api/settings`. `mcp restart` isejjaħ `POST /api/mcp/restart`: ineħħi s-sessjonijiet attivi `sse`/`streamable-http` sabiex it-talba li jmiss terġa tibda b'mod nadif, tirritorna `409` jekk MCP huwa diżattivat, u `501` għat-trasport `stdio` (il-klijenti stdio jippossjedu s-subproċess tagħhom stess — m'hemm l-ebda manku fil-proċess biex jerġa 'jibda).

## Trasporti

Is-server MCP jesponi tliet trasporti, kollha appoġġjati mill-istess fabbrika `createMcpServer()` :

| Trasport          | Fejn                                        | Meta tuża                                                      |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Integrazzjonijiet IDE (Claude Desktop, Cursor, eċċ.)           |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Browser/agent klijenti li jeħtieġu event stream                |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Klijenti HTTP b'ħafna sessjonijiet ( header `mcp-session-id` ) |

It-trasport attiv HTTP (`sse` jew `streamable-http`) jintgħażel mill-issettjar `mcpTransport`. It-tibdil tat-trasport jagħlaq is-sessjonijiet eżistenti fuq it-trasport l-ieħor.

### Aċċess mill-bogħod (manage-scope bypass)

`/api/mcp/*` huwa fil-livell LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — b'mod awtomatiku l-hosts loopback biss (`localhost`, `127.0.0.1`, `::1`) jistgħu jilħquha. Minn v3.8.2, klijenti mhux loopback jistgħu jgħaqqdu jekk jippreżentaw `Authorization: Bearer <api-key>` li ċ-ċavetta tagħha ġġorr l-ambitu `manage`. Dan huwa l-uniku mod biex tilħaq is-server MCP remot permezz ta 'mina, reverse proxy, jew hostname pubbliku.

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

Ċavetta mhux maniġerjali (jew ebda Bearer) tirritorna `403 LOCAL_ONLY`. Il-prefiss tal-aħwa `/api/cli-tools/runtime/*` huwa intenzjonalment NOT bypassable — ara [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Validazzjoni tal-oriġini

Wara l-awtentikazzjoni, kull talba biex `/api/mcp/*` — it-trasporti u r-rotot ta 'ġestjoni bħal `status`, `tools`, `audit` u `restart` — għandha l-header `Origin` tagħha vvalidat, ikun x'ikun min iċempel (API key, CLI token, dashboard session, jew loopback anonimu b'login disable). Din hija l-protezzjoni tad-DNS-rebinding li teħtieġ l-spec MCP Streamable HTTP.

- **Ebda `Origin` header** → permess. Il-klijenti OmniRoute CLI, SDK u IDE ma jibagħtux wieħed.
- **Allowed `Origin`** → `localhost`, `127.0.0.1` jew `[::1]` fuq kwalunkwe port, jew l-oriġini pubblika ta' OmniRoute stess: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, oriġini mgħoddija ta' reverse proxy ta' fiduċja (`OMNIROUTE_TRUST_PROXY`, biss meta l-ebda bażi URL ma tkun stabbilita), jew loopback/LAN IP host dirett. L-header `Host` waħdu qatt ma jagħmel oriġini fdata.
- **Kull `Origin`, inkluz `null`** → `403` b'korp ta' żball JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Sessjoni tad-dashboard li tippreżenta token CSRF validu għadha aċċettata, bħal għal kitbiet oħra ta 'dashboard.

A browser MCP client served wara reverse proxy jeħtieġ `OMNIROUTE_PUBLIC_BASE_URL`; m'hemm l-ebda lista ta' permessi għal oriġini oħra. CORS preflight (`OPTIONS`) mhuwiex iċċekkjat mill-oriġini; it-talba li ġejja hija.

## IDE Konfigurazzjoni

Ara [l-Konfigurazzjoni tal-Klijent MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) għal Claude Desktop, Cursor, Cline, u s-setup tal-klijent MCP kompatibbli.

---

## Għodda Essenzjali (14) — Fażi 1

| Għodda                          | Ambiti                | Deskrizzjoni                                                                                                                       |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, memorja, circuit breakers, limiti tar-rata, stats tal-cache                                                                |
| `omniroute_list_combos`         | `read:combos`         | Il-kombinazzjonijiet kollha kkonfigurati bi strateġiji (metriċi fakultattivi)                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriċi tal-prestazzjoni għal combo speċifiku                                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | Attiva jew iddiżattiva combo                                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | Oħloq combo validat permezz tal-combo API eżistenti                                                                                |
| `omniroute_check_quota`         | `read:quota`          | Kwota used/total, fil-mija li jifdal, reset time, token health                                                                     |
| `omniroute_route_request`       | `execute:completions` | Ibgħat tlestija ta' chat permezz ta OmniRoute routing                                                                              |
| `omniroute_cost_report`         | `read:usage`          | Rapport tal-ispiża skond il-perjodu (session/day/week/month)                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | Katalgu mudell sħiħ b'kapaċitajiet, status, prezzijiet                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | Katalgu tar-radar ffirmat lokali; filtri provider/family fakultattivi                                                              |
| `omniroute_tool_search`         | `read:tools`          | Skopri għodod mill-katalgu MCP reġistrat                                                                                           |
| `omniroute_web_search`          | `execute:search`      | Tfittxija fuq il-web permezz tal-fornituri tat-tiftix konfigurati. Mhux X/Twitter.                                                 |
| `omniroute_x_search`            | `execute:search`      | Fittex X permezz ta' xAI/SuperGrok, jew agħżel `xquik-search` għar-riżultati Xquik API. Jeħtieġ kredenzjali għall-backend magħżul. |
| `omniroute_web_fetch`           | `execute:search`      | Iġbed il-kontenut tal-web permezz tal-fornituri tal-ġbir konfigurati                                                               |

## Għodda Avvanzata (11) — Fażi 2

| Għodda                             | Ambiti                               | Deskrizzjoni                                                                                                |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulazzjoni ta 'routing dry-run b'siġra ta' riżerva                                                        |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budget tas-sessjoni b'azzjoni degrade/block/alert                                                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aġġorna l-istrateġija kombinata waqt ir-runtime (priority/weighted/auto/etc.)                               |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Applika `aggressive` / `balanced` / `conservative` reżiljenza issettjat minn qabel                          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Test dirett ta 'kull fornitur f'combo bl-użu ta' sejħa upstream reali                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriċi għal kull fornitur b'latency p50/p95/p99 u stat ta 'circuit breaker                                 |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Irrakkomanda combo skont it-tip ta' kompitu b'restrizzjonijiet budget/latency                               |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Spjega għaliex talba ġiet indirizzata lil fornitur (fatturi ta' punteġġ + fallbacks)                        |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Snapshot tas-sessjoni sħiħa: spiża, tokens, top models/providers, żbalji, gwardja tal-baġit                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Iddijanjostika (u optionalment awto-tiswija) id-drift tad-database bħal refs combo miksura / ringieli orfni |
| `omniroute_sync_pricing`           | `pricing:write`                      | Issinkronizza data tal-prezzijiet minn sorsi esterni (LiteLLM); jappoġġja `dryRun`                          |

## Għodda tal-Cache (2)

| Għodda                  | Ambiti        | Deskrizzjoni                                              |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Cache semantiku, cache fil-pront, u stats tal-idempotenza |
| `omniroute_cache_flush` | `write:cache` | Aħsel il-cache globalment jew bi signature/model          |

## Għodda tal-Kompressjoni (13)

| Għodda                              | Ambiti              | Deskrizzjoni                                                                                                                                                    |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Issettjar tal-kompressjoni, sommarju analitiku, u stats konxji mill-cache (jinkludi metadejta `analytics.mcpDescriptionCompression` )                           |
| `omniroute_compression_configure`   | `write:compression` | Ikkonfigura l-mod tal-kompressjoni, il-limitu, il-proporzjon fil-mira, il-preservazzjoni fil-pront tas-sistema, it-toggle tal-kompressjoni tad-deskrizzjoni MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Agħżel il-magna attiva (off/caveman/rtk/stacked) u l-intensità Caveman/RTK                                                                                      |
| `omniroute_list_compression_combos` | `read:compression`  | Lista combos ta' kompressjoni msemmija u l-pipelines tal-magni tagħhom                                                                                          |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitiċi raggruppati skont kompressjoni u magna                                                                                                                |
| `omniroute_ccr_store`               | `write:compression` | Aħżen il-kontenut iżolat minn min iċempel fil-maħżen CCR mlimitat fil-memorja u rritorna markatur flimkien ma' referenza `ccr://`                               |
| `omniroute_ccr_retrieve`            | `read:compression`  | Irkupra l-kontenut CCR b'mod sħiħ jew b'modi ta' ras, denb, linji, grep, u stats                                                                                |
| `omniroute_ccr_inspect`             | `read:compression`  | Spezzjona l-metadata CCR ta' min iċempel mingħajr ma tirritorna l-kontenut                                                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Elenka l-metadejta paġnata għall-blokki CCR ta' min iċempel                                                                                                     |
| `omniroute_ccr_delete`              | `write:compression` | Ħassar blokk CCR ta' min iċempel                                                                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | Irrapporta l-użu tal-memorja b'ambitu ta' min iċempel, il-counters taċ-ċiklu tal-ħajja, u l-limiti tal-maħżen                                                   |
| `omniroute_rtk_discover`            | `read:compression`  | Skopri storbju rikorrenti fil-kampjuni tal-output RTK opt-in                                                                                                    |
| `omniroute_rtk_learn`               | `read:compression`  | Iġġenera abbozz ta' filtru RTK li jista' jiġi rivedut minn kampjuni opt-in                                                                                      |

L-entrati CCR jużaw maħżen b'żewġ saffi: saff sħun fil-memorja appoġġjat, fuq runtimes lokali mhux cloud, minn saff SQLite durabbli (`ccr_blocks`, fuq awtomatikament) sabiex blokka tibqa 'ħajja żgumbrament jew bidu mill-ġdid sakemm TTL tagħha jispiċċa — ħlief blokki ta' aktar minn 512 KB u runtimes cloud-only, li jibqgħu runtimes. Kull blokka hija limitata għal 2 MiB, kull prinċipali għal 16 MiB, u l-maħżen globali għal 64 MiB. L-iskrizzjonijiet default għal TTL ta' 24 siegħa (massimu ta' sebat ijiem). L-irkupru sħiħ MCP huwa limitat għal 256 KiB; blokki akbar jibqgħu disponibbli permezz tal-modi ranged u grep. Il-ħażna, l-irkupru, l-elenkar, l-ispezzjoni, it-tħassir u l-istatistiċi huma iżolati mill-prinċipal awtentikat taċ-ċavetta API. Ir-rekords tal-awditjar fihom hashes u metadata tad-daqs, qatt kontenut. Dettalji li jiffaċċjaw l-operatur (iż-żewġ markaturi, il-prerekwiżiti tal-klijenti, `codemode:false`, ambiti għal kull għodda, paġnar, u matriċi dijanjostika) jgħixu f'Compression [Engines → Prerekwiżiti / gwida tal-operatur](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` tirrapporta MCP deskrizzjoni kompressjoni separatament taħt `analytics.mcpDescriptionCompression`. Dawk il-valuri huma stimi tad-daqs tal-metadejta għal deskrizzjonijiet listabbli MCP (`tools`, `prompts`, `resources`, u `resourceTemplates`); mhumiex irċevuti tal-użu tal-fornitur u huma mmarkati `source: "mcp_metadata_estimate"`.

### MCP Filtru tas-Siġra tal-Aċċessibilità (v3.8.0)

Separati mill-għodod ta' kompressjoni ta' hawn fuq, OmniRoute jinkludi filtru ta' wara l-eżekuzzjoni li jikkompressa l-** riżultati tal-għodda** ta 'għodod MCP browser/accessibility qabel ma jintbagħtu lura lill-aġent. Dan il-filtru innifsu mhuwiex għodda — jaħdem b'mod trasparenti fuq kwalunkwe riżultat ta' għodda li jkun fih test verbali ta' aċċessibbiltà-siġra jew browser-snapshot (≥ 2000 chars).

Imġieba ewlenin:

- Jiġġarraf ≥ 30 linja ripetuta konsekuttiva aħwa fis-sommarju tar-ras + denb
- Preserves `[ref=eXX]` ankri mitluba minn Playwright/computer-use
- Tnaqqas b'mod iebes test kbir (> 50,000 karattri) b'ħjiel ta' navigazzjoni
- Iffrankar mistenni:** 60–80%** fuq payloads ta' snapshot tal-browser

Konfigurazzjoni: `compression.mcpAccessibility` f'settings globali (migrazzjoni 056). Implimentazzjoni: `open-sse/services/compression/engines/mcpAccessibility/`. Dokumenti sħaħ: [Magni tal-Kompressjoni — MCP Filtru tas-Siġra tal-Aċċessibilità](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Ara [Magni tal-Kompressjoni](../compression/COMPRESSION_ENGINES.md) u [Kompressjoni RTK](../compression/RTK_COMPRESSION.md) għall-mudell tal-kompressjoni tar-runtime wara dawn l-għodod.

## 1 Għodda Proxy (3)

| Għodda                      | Ambiti         | Deskrizzjoni                                                                                    |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Iġbor prokuri b'xejn mis-suq 1proxy (filtri protocol/country/quality/limit )                    |
| `omniroute_oneproxy_rotate` | `read:proxies` | Ikseb il-prokura disponibbli li jmiss skont l-istrateġija (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statstiċi tal-grupp, status ta' sinkronizzazzjoni, distribuzzjoni skont il-protokoll u l-pajjiż |

## Għodda tal-memorja (3)

Defined in `open-sse/mcp-server/tools/memoryTools.ts`. Auth/scope huwa infurzat permezz tal-pipeline standard tal-ambitu MCP.

| Għodda                    | Ambiti         | Deskrizzjoni                                                                                                 |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Fittex il-memorji skont il-mistoqsija / tip / ċavetta API b'infurzar ta' token-budget                        |
| `omniroute_memory_add`    | `write:memory` | Żid dħul ġdid fil-memorja (`factual` / `episodic` / `procedural` / `semantic`)                               |
| `omniroute_memory_clear`  | `write:memory` | Memorji ċari għal ċavetta API, iffiltrata b'mod fakultattiv skont it-tip jew it-timbru taż-żmien `olderThan` |

## Għodda tal-Ħiliet (4)

Defined in `open-sse/mcp-server/tools/skillTools.ts`. Appoġġjata minn `src/lib/skills/registry` + `src/lib/skills/executor`.

| Għodda                        | Ambiti           | Deskrizzjoni                                                                                            |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Elenka l-ħiliet reġistrati b'filtrazzjoni fakultattiva skont iċ-ċavetta API, l-isem jew l-istat attivat |
| `omniroute_skills_enable`     | `write:skills`   | Attiva jew tiddiżattiva skill speċifika minn ID                                                         |
| `omniroute_skills_execute`    | `execute:skills` | Teżegwixxi ħila b'input ipprovdut u rritorna r-rekord tal-eżekuzzjoni                                   |
| `omniroute_skills_executions` | `read:skills`    | Elenka l-istorja reċenti tal-eżekuzzjoni tal-ħiliet                                                     |

## Notion Sors tal-Kuntest (6)

Defined in `open-sse/mcp-server/tools/notionTools.ts`. Token maħżun fit-tabella `key_value` permezz ta ' `src/lib/db/notion.ts`. REST client `src/lib/notion/api.ts`. Settings API fi `src/app/api/settings/notion/route.ts`. Dashboard UI fi `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Ikkonfigura t-token tal-integrazzjoni Notion tiegħek mill-** Sorsi tal-Kuntest** tab fid-dashboard Endpoint, jew permezz ta’ REST API:

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

| Għodda                       | Ambiti         | Deskrizzjoni                                                           |
| :--------------------------- | :------------- | :--------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Tfittxija bit-test sħiħ fil-paġni u fid-databases kollha               |
| `notion_get_page`            | `read:notion`  | Ikseb paġna minn ID bil-proprjetajiet tagħha                           |
| `notion_list_block_children` | `read:notion`  | Elenka l-blokki tfal ta 'paġna jew blokk                               |
| `notion_query_database`      | `read:notion`  | Mistoqsija database b'filtri, xorta, u paġnar                          |
| `notion_get_database`        | `read:notion`  | Ikseb id-database schema minn ID                                       |
| `notion_append_blocks`       | `write:notion` | Waħħal blokki tat-tfal ma' blokk ġenitur (massimu 100 għal kull talba) |

## Għodod tal-Katalgu tal-Ħiliet tal-Aġenti (3)

Defined in `open-sse/mcp-server/tools/agentSkillTools.ts`. Sostnuti minn `src/lib/agentSkills/catalog`. Dawn l-għodod jesponu l-katalgu tad-dokumentazzjoni tal-Ħiliet tal-Aġenti b'45 entrata lil klijenti MCP u aġenti esterni. Skop: `read:catalog`.

| Għodda                            | Ambiti         | Deskrizzjoni                                                                                                                                            |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | Elenka l-45 ħiliet tal-aġent kollha `category` (api\| cli) u filtri `area` fakultattivi; jirritorna metadata + kopertura                                |
| `omniroute_agent_skills_get`      | `read:catalog` | Ikseb kontenut sħiħ ta' metadejta + SKILL.md għal ħila waħda minn `id` canonical                                                                        |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistika ta' kopertura: kemm mit-23 API, 21 CLI u 1 ħiliet ta' konfigurazzjoni għandhom fajls SKILL.md fuq is-sistema tal-fajls vs totali tal-katalgu |

Ara [AGENT-SKILLS.md](./AGENT-SKILLS.md) għall-katalgu sħiħ u kif aġenti esterni jikkunsmawh.

## Oqfsa Relatati (v3.8.0)

L-inventarju tal-għodda MCP hawn fuq (110 għodda unika, ikkalkulat minn `countUniqueMcpTools()`) huwa intenzjonalment skopert għal operazzjonijiet routing/cache/compression/memory/skills/proxy/context-source runtime. Żewġ oqfsa maġenb jintbagħtu flimkien mas-server MCP fi v3.8.0 u huma dokumentati separatament:

### Aġenti tas-Cloud

L-Aġenti tal-Cloud huma aġenti ta' kodifikazzjoni AI barra mill-proċess (codex-cloud, cursor-cloud, devin, jules) iwblati OmniRoute permezz tal-istess mudell ta' konnessjoni użat għall-fornituri LLM. Huma esposti permezz tal-wiċċ REST tagħhom stess (`/api/v1/agents/*`) u huma** le** parti mill-katalgu tal-għodda MCP — li ssejjaħ Cloud Agent ma tikkonsmax ambitu MCP.

- Implimentazzjoni: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ċiklu tal-ħajja: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentazzjoni: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails huma filtri pre/post-execution (vision-bridge, pii-masker, prompt-injection) applikati ġewwa l-pipeline taċ-chat. Jiġru qabel ma jintlaħaq is-saff MCP tool/route u jarmu vjolazzjonijiet strutturati lill-pipeline tal-verifika; ma jiġux invokati bħala għodod MCP.

- Implimentazzjoni: `src/lib/guardrails/`.
- Dokumentazzjoni: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Meta tiddibaggja sejħa MCP li tidher imblukkata, iċċekkja kemm ir-reġistru tal-awditjar MCP ( entrati `scope_denied:*` ) kif ukoll it-traċċa tal-awditjar tal-guardrails — talba tista’ tiġi miċħuda minn guardrail** qabel** qatt jilħaq is-saff ta 'infurzar ta' l-ambitu MCP.

---

## REST API Endpoints

| Endpoint               | Metodu                | Deskrizzjoni                                                                                                       | Awt                        |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | L-istatus tas-server: taħbit tal-qalb, stat tat-trasport HTTP, sommarju tal-attività tal-verifika                  | Management (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalgu tal-għodda (isem, deskrizzjoni, ambiti, fażi, endpoints tas-sors)                                          | Ġestjoni                   |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint tat-trasport SSE (gwardjat minn `mcpEnabled` + `mcpTransport === "sse"`)                                  | API key + ambiti           |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Trasport HTTP streamable (uża `mcp-session-id` header; `DELETE` is-sessjoni)                                       | API key + ambiti           |
| `/api/mcp/audit`       | `GET`                 | Entrati tar-reġistru tal-verifika minn `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Ġestjoni                   |
| `/api/mcp/audit/stats` | `GET`                 | Statistika tal-awditjar aggregata (`totalCalls`, `successRate`, `avgDurationMs`, l-aqwa għodod)                    | Ġestjoni                   |

Fajls tas-sors: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Kemm it-trasport SSE kif ukoll Streamable HTTP huma mblukkati sakemm is-server MCP jiġi attivat f'Settings (`mcpEnabled`) u jintgħażel iż `mcpTransport` xieraq. Jekk it-trasport ħażin huwa kkonfigurat ir-rotta tirritorna HTTP 400 bi ħjiel biex taqleb is-settings.

---

## Awtentikazzjoni u Ambiti

għodda MCP sejħiet jaqraw strings ambitu minn min iċempel. Dak il-kontroll huwa wieħed minn tliet spazji tal-isem indipendenti. Pass minn kontrollur wieħed mhuwiex pass mill-oħrajn. Ir-regoli huma [Tliet ambitu namespaces](#three-scope-namespaces). Il-katalgu tal-għodda huwa [ambiti tal-għodda MCP](#mcp-tool-scopes).

### Tliet ispazji tal-ismijiet tal-ambitu

`manage` fuq ċavetta API, `read:compression` fuq għodda MCP, u `read` fuq token ta’ aċċess `oma_live_…` huma tliet għotjiet differenti. Dawk li jċemplu li jibagħtu token ta' aċċess `read` għal rotta ta' ġestjoni mutating jiksbu HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Dak ir-rank huwa `scopeSatisfies`. Ma jikkonsultax it-tabella MCP, u l-matcher MCP ma jikkonsultahx.

| Spazju tal-isem       | Kredenzjali                                                                         | Kontrollur                 | Pass jippermetti                                                       |
| :-------------------- | :---------------------------------------------------------------------------------- | :------------------------- | :--------------------------------------------------------------------- |
| Ġestjoni API-key      | `api_keys.scopes`                                                                   | `hasManageScope`           | Management REST ghal dik Bearer key                                    |
| Addittiv API-key      | istess firxa, sekwenza waħda eżatta                                                 | l-helper imsemmi hawn taħt | Biss dik il-kapaċità waħda                                             |
| ambiti tal-għodda MCP | l-istess array, inkella MCP `_meta` (HTTP/SSE biss), inkella `OMNIROUTE_MCP_SCOPES` | `scopeMatches`             | Dik l-għodda, ladarba l-infurzar ikun fuq                              |
| Token ta' aċċess      | `oma_live_…`                                                                        | `scopeSatisfies`           | Ir-rotta tal-ġestjoni li l-metodu u t-triq tagħha jeħtieġu dak il-grad |

L-istampar ta' kull kredenzjali huwa kopert fl- [Awtentikazzjoni tal-Ġestjoni](../guides/MANAGEMENT-AUTH.md).

#### Ambiti taċ-ċavetta API

Array `api_keys.scopes` wiehed jaghti zewg impjiegi. Huma jużaw funzjonijiet differenti.

**Management REST.** `manage` u `admin` huma l-membri ta’ `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` huwa dak li jawtorizza rotot ta' ġestjoni għal dik iċ-ċavetta. `admin` huwa kapaċi għall-ġestjoni fuq dawk ir-rotot. Il-kelma `admin` hawnhekk mhijiex ir-rank ta 'access-token u ma tespandix f'ambiti ta' għodda MCP.

**Kordi addittivi.** Kull wiehed huwa test ta' membri ezatt, u kull wiehed jibqa' barra `MANAGEMENT_API_KEY_SCOPES`.

| Ambitu                         | Pass jippermetti                                                                                                                                                          |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | Il-loopback `/api/mcp/` LOCAL_ONLY carve-out biss (`hasMcpConnectOrManageScope`). Ċavetta bi `manage` jew `admin` għadha tgħaddi dak carve-out.                           |
| `self:usage`                   | `GET /api/v1/me/status` għal din iċ-ċavetta (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` iżid dan l-ambitu fuq create (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Kwoti tal-kont upstream ġewwa dak it-tagħbija tal-istatus (`src/lib/usage/apiKeySelfService.ts`). Ir-rotta tal-istatus għadha teħtieġ `self:usage`.                       |
| `policy:bypass-provider-quota` | Is-sejħiet ta' inferenza ta' din iċ-ċavetta skip the provider-quota policy (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                 |

#### Tqabbil

Il-katalgu huwa t-tabella taħt [l-iskopijiet tal-għodda MCP](#mcp-tool-scopes). Tittrattax `MCP_SCOPE_LIST` `src/shared/constants/mcpScopes.ts` bħala dak il-katalgu: huwa s-subsett oriġinali ittajpjat. Għodod aktar tard jiddikjaraw aktar ambiti maġenbha (`read:notion`, `read:skills`, `read:local-corpus`, u l-bqija tat-tabella).

`evaluateToolScopes` `open-sse/mcp-server/scopeEnforcement.ts` jippermetti sejħa meta kull ambitu meħtieġ jaqbel ma' xi ambitu mogħti:

- `*` taqbel ma kull ambitu mehtieg.
- Ambitu mogħti li jispiċċa `*` jaqbel ma' ambitu meħtieġ li jibda bil-prefiss qabel l-istilla. `read:*` taqbel `read:compression`.
- Kull ambitu ieħor mogħti jaqbel biss mal-sekwenza meħtieġa identika.

Ċavetta li l-iskopijiet tagħha huma `["manage"]` tfalli `scopeMatches` għal `read:compression`. L-istess sejħa tonqos għal `admin`, `mcp:connect`, `read`, u `write` meta dawk huma l-uniċi kordi mogħtija. M'hemm l-ebda ġerarkija fost l-iskopijiet tal-għodda MCP lil hinn mill- `*` ta' wara.

L-infurzar huwa mitfi sakemm `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (default `false`). Waqt li jkun mitfi, `evaluateToolScopes` jippermetti s-sejħa u taqbeż il-katalgu. Waqt li jkun mixgħul, HTTP juża `api_keys.scopes` taċ-ċavetta Bearer bħala `authInfo` (ara [Per-key HTTP scope binding](#per-key-http-scope-binding-7895) ). Meta l-ebda ambiti ewlenin ma jsolvu, is-sett mogħti jaqa 'għal MCP `_meta` (onorat biss għal min iċempel HTTP/SSE, f'kuntest ta' awtentikazzjoni HTTP ; `_meta` ta' min iċempel stdio jiġi injorat minħabba li l-klijent jikkontrollah u ma jġorr l-ebda identità għal kull min iċempel), imbagħad `OMNIROUTE_MCP_SCOPES`.

#### Ambiti tat-token tal-aċċess

`oma_live_…` tokens (`src/lib/accessTokens/scopes.ts`) iġorru `read`, `write`, jew `admin`. `scopeSatisfies` huwa rank: `admin` tkopri `write` u `read`, u `write` tkopri `read`. Ambiti mhux magħrufa ma jkopru xejn.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) iqabbel dak ir-rank ma `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, u `OPTIONS` jeħtieġu `read`.
- Kull metodu iehor jehtieg `write`.
- Il-mogħdijiet fiż `ADMIN_SCOPE_PREFIXES` jeħtieġu `admin` għal kull metodu. `/api/mcp` jinsab fuq dik il-lista, għalhekk token ta 'aċċess `write` għadu ma jistax isejjaħ il-wiċċ MCP HTTP.
- Il-mogħdijiet `ADMIN_MUTATION_PREFIXES` jeħtieġu `admin` biss għal mutazzjonijiet.
- Il-mogħdijiet `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) jeħtieġu `admin` biss għal mutazzjonijiet, u biss fuq dik il-mogħdija eżatta — sub-rotot oħra `/api/settings/*` iżommu `write`.

`PATCH /api/keys/{id}` hija mutazzjoni u mhix fuq dawk il-listi ta' amministrazzjoni, għalhekk token `read` jirċievi 403 `Access token scope 'read' is insufficient; 'write' required.` A token ta' aċċess `write` jew `admin` jissodisfa dik ir-rotta. Dashboard JWT, il-loopback CLI machine-id token, u ċavetta API `manage` jew `admin` jieħdu fergħat oħra u mhumiex imdejqa b'dan ir-rank.

Token ta' aċċess li jgħaddi `scopeSatisfies` għal `/api/mcp` ikklerja l-bieb tal-maniġment biss. Sejħiet għall-għodda għadhom imexxu `scopeMatches` kontra ambiti taċ-ċavetta API. Il-grad tat-token tal-aċċess mhuwiex input għal `scopeMatches`.

### ambiti tal-għodda MCP

L-infurzar tal-kamp ta' applikazzjoni huwa ċentralizzat fiż `open-sse/mcp-server/scopeEnforcement.ts`. Kull għodda teħtieġ ambiti speċifiċi:

| Ambitu                | Għodda                                                                                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                               |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                       |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                          |
| `read:quota`          | `check_quota`                                                                                                                                                                   |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                          |
| `read:models`         | `list_models_catalog`                                                                                                                                                           |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                   |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                           |
| `write:budget`        | `set_budget_guard`                                                                                                                                                              |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                     |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                  |
| `read:cache`          | `cache_stats`                                                                                                                                                                   |
| `write:cache`         | `cache_flush`                                                                                                                                                                   |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                      |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                               |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                           |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                          |
| `read:memory`         | `memory_search`                                                                                                                                                                 |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                    |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                              |
| `write:skills`        | `skills_enable`                                                                                                                                                                 |
| `execute:skills`      | `skills_execute`                                                                                                                                                                |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                         |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                       |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                  |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                              |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                 |
| `read:obsidian`       | 13 aqra għodda — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, ... |
| `write:obsidian`      | 9 għodod tal-kitba — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, ...           |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                               |

Ambiti wildcard huma appoġġjati: `read:*` jagħti l-iskopijiet kollha tal-qari, `*` jagħti aċċess sħiħ.

### `mcp:connect` — kapaċità ta' rotta dejqa (#7895)

Reaching the HTTP/SSE MCP transport (`/api/mcp/*`) from non-loopback requires the `/api/mcp/` LOCAL_ONLY carve-out (see `docs/security/ROUTE_GUARD_TIERS.md`). Historically that carve-out only accepted a full `manage`/`admin`-scope API key — too broad for a caller that only needs to talk MCP. `src/shared/constants/managementScopes.ts` now exports `MCP_CONNECT_SCOPE = "mcp:connect"`: an additive, narrow scope (same precedent as `SELF_USAGE_SCOPE`) that authorizes ONLY the `/api/mcp/` bypass in `src/server/authz/policies/management.ts` — it grants no other management-route access and is deliberately kept OUT of `MANAGEMENT_API_KEY_SCOPES`. A key holding `manage`/`admin` still passes the carve-out unchanged; `mcp:connect` is a lower-privilege alternative for remote MCP-only callers, checked via `hasMcpConnectOrManageScope()`.

### L-irbit tal-ambitu HTTP għal kull ċavetta (#7895)

Fuq HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` issa jsolvi l- `api_keys.scopes` reali ta' min iċempel permezz `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) u jgħaddiha lill- `transport.handleRequest(req, { authInfo })` ta' SDKMCP, għalhekk `extra.authInfo.scopes` li jilħaq kull sejħa tal-għodda tirrifletti l-iskopijiet tal-Bearer key stess. Iż- `resolveCallerScopeContext()` ta' `scopeEnforcement.ts` diġà pprijoritizza `authInfo` fuq iż- `_meta` u `OMNIROUTE_MCP_SCOPES` env fallback — dan jimla biss dak l-ewwel sors ta' prijorità għolja, li qabel ma kienx mitmugħ fuq HTTP. Meta l-ebda ċavetta API ma tissolva (l-ebda header, ċavetta invalida), `authInfo` jibqa ' `undefined` u r-riżoluzzjoni taqa' għall-katina eżistenti `meta`/env mhux mibdula. stdio m'għandu l-ebda identità għal kull min iċempel (ara `mcpCallerIdentity.ts`) u mhux affettwat mill-irbit għal kull ċavetta — huwa jaqbeż il-pass `_meta` (`_meta` huwa onorat biss ġewwa kuntest ta 'awtentikazzjoni HTTP, #15159) u jirrisolvi mill-ċavetta `OMNIROUTE_MCP_SCOPES` env biss.

**L-infurzar huwa sfurzat għal min iċempel HTTP/SSE b'ambitu dejjaq irrispettivament minn `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` inadempjenti għal `false` huwa sikur biss għall-fluss ta' operatur wieħed local/stdio, fejn m'hemm l-ebda identità għal kull min iċempel li għandu jiġi skopert. `open-sse/mcp-server/server.ts::withScopeEnforcement()` idawwar l-infurzar tal-ambitu għal kull għodda bla kundizzjoni (`shouldForceScopeEnforcement()` `scopeEnforcement.ts`) kull meta `resolveCallerScopeContext()` solvuti `source === "authInfo"` (jiġifieri header ta' Awtorizzazzjoni HTTP reali għal kull ċavetta, HTTP/SSE-only) AND dik iċ-ċavetta ma żżommx ambitu `manage`/`admin` sħiħ. Dan jagħlaq id-distakk fejn ċavetta li żżomm ONLY l-ambitu dejjaq `mcp:connect` bypass — iddokumentat hawn fuq bħala li ma jawtorizza xejn ħlief l `/api/mcp/` LOCAL_ONLY carve-out — jista’ inkella jinvoka kull għodda MCP ladarba operatur ippermettiet remote/non-loopback MCP aċċess, sempliċiment għax `OMNIROUTE_MCP_ENFORCE_SCOPES` vapuri `false` b’mod awtomatiku. Ċavetta sħiħa `manage`/`admin` fuq HTTP, u kull min iċempel stdio/local, iżommu l-imġieba eżistenti `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated mhux mibdula.

---

## Varjabbli Ambjentali

| Varjabbli                               | Default                                | Għan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------------------------- | :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`               | Bażi URL is-server MCP juża meta jsejjaħ OmniRoute intern APIs                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_API_KEY`                     | (vojta)                                | API key mibgħuta bħala `Authorization: Bearer` għal sejħiet interni API                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` ( `"true"` biss jippermettiha) | Meta ppermettiet, ambiti neqsin jiċħdu sejħiet tal-għodda u jilloggjaw `scope_denied:<reason>` fir-reġistru tal-verifika. L-infurzar huwa ALSO sfurzat irrispettivament minn din il-bandiera għal kull min iċempel HTTP/SSE solvut minn header ta' Awtorizzazzjoni għal kull ċavetta (`source === "authInfo"`) li m'għandux skop sħiħ `manage`/`admin` — eż. ċavetta li żżomm biss l-ambitu dejjaq `mcp:connect` bypass — għalhekk dan default huwa sikur biss għall-flow-loopj local/stdio, qatt b'lura remota |
| `OMNIROUTE_MCP_SCOPES`                  | (vojta)                                | Lista permessa separata b'virgola ta' ambiti meqjusa bħala "disponibbli" awtomatikament (użata meta min iċempel ma jipprovdix l-iskopijiet tiegħu stess)                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (unset = on)                           | Meta ssettjat għal `0/false/off/no`, tiddiżattiva l-kompressjoni tad-deskrizzjoni MCP fil-ħin tar-reġistrazzjoni                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (unset = on)                           | Alias alternattiv għall-istess toggle bħal hawn fuq                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                | Abort il-baġit għall-qari tal-ġestjoni interna (saħħa, reżiljenza, combos, kwota, użu)                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                | Aborta l-baġit għall-ħops li jistenna lil fornitur (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `MCP_TOOL_DENY`                         | (unset = no filter)                    | Ismijiet ta' għodda separati b'virgola biex jinżlu minn `tools/list` (tnaqqis tal-kardinalità tal-għodda — ara hawn taħt)                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_ALLOW`                        | (unset = no filter)                    | Ismijiet ta' għodda separati b'virgola biex iżommu esklussivament (modalità ta' lista permessa — hawn taħt)                                                                                                                                                                                                                                                                                                                                                                                                     |
| `DATA_DIR`                              | `~/.omniroute`                         | Il-fajl tal-qalb huwa miktub fuq `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                       |

---

## Deskrizzjoni Kompressjoni

MCP tool, prompt, u reġistri tar-riżorsi jistgħu jikkompressaw deskrizzjonijiet f'ħin registration/list biex inaqqsu l-impronta tal-metadata esposta għall-klijenti (u għalhekk l-ispiża tal-kuntest fil-pront). L-implimentazzjoni tgħix `open-sse/mcp-server/descriptionCompressor.ts` u hija fili fis-server MCP permezz ta' `compressMcpRegistryMetadata` ġewwa `createMcpServer()`.

- Il-kompressjoni tgħaddi fuq it-test tad-deskrizzjoni billi tuża r-regoli ta' Caveman (`getRulesForContext("all", "full")`) b'estrazzjoni ta' blokok ippreservat (it-tul ta' kodiċi, blokki magħluqa, eċċ.) Għalhekk il-kontenut strutturali ma jinbidelx.
- Aqleb għal kull skjerament permezz tal-valur `compression.mcpDescriptionCompressionEnabled` fit-tabella tas-settings `key_value` (default: attivat) — espost fiż- UI bħala** Analytics → MCP deskrizzjoni kompressjoni** .
- Aqleb mal-proċess kollu permezz ta' `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` jew `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- L-istatistiċi f'ħin reali jitfaċċaw permezz ta' `omniroute_compression_status` taħt `analytics.mcpDescriptionCompression` u ttikkettati `source: "mcp_metadata_estimate"` biex tiddisambigua mill-irċevuti tal-użu reali tal-fornitur.

---

## Tnaqqis tal-Kardinalità tal-Għodda (F4.3)

Il-kompressjoni tad-deskrizzjoni tnaqqas il-metadata ta 'kull għodda;** tnaqqis tal-kardinalità tal-għodda** imur pass ieħor billi jnaqqas _kemm_ għodod jitħabbru għal kollox. Ir-reklamar ta' inqas għodod fil-manifest `tools/list` inaqqas l-ispiża tat-token għal kull talba li l-mudell tal-klijent iħallas għall-katalgu tal-għodda ("saff 5") kompressjoni. L-implimentazzjoni hija filtru pur, mingħajr stat `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), iwblat fil-linja ta 'reġistrazzjoni `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, off awtomatikament.** Il-filtru jaħdem biss meta mill-inqas waħda miż-żewġ varjabbli ambjentali tkun issettjata; bl-ebda sett, il-110 għodda kollha huma mħabbra mhux mibdula.

| Varjabbli        | Modalità                                                                                             |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Lista sewda ta — ismijiet ta' għodda separati b'virgola li dejjem jitneħħew minn `tools/list`        |
| `MCP_TOOL_ALLOW` | Allow-list — ismijiet ta' għodda separati b'virgola; dawn biss jibqgħu ħajjin, kull ħaġa oħra tinżel |

`deny` jieħu prijorità fuq `allow`. L-ismijiet huma separati b'virgola, mirqum, u l-entrati vojta huma injorati. Eżempji:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kif jitneħħew l-għodod iffiltrati:** ir-reġistrazzjoni dejjem tirnexxi; għodda li l-profil jirrifjuta hija mbagħad `.disable()` d fuq il-manku MCP SDK, għalhekk qatt ma tidher `tools/list` iżda l-wajers jibqgħu intatti (nadif enable/disable, l-ebda reġistrazzjoni mill-ġdid). L-parser tal-profil huwa `readMcpToolProfileFromEnv(process.env)`, li jirritorna `null` (l-ebda filtrazzjoni) meta ż-żewġ vars ikunu vojta.

Il-forma `ToolProfile` aktar sinjura wara `reduceToolManifest` tappoġġja wkoll filtrazzjoni tal-ambitu tal-intersezzjoni (`allowScopes`, bi `read:*` -style wildcard matching) u limitu deterministiku `maxTools`, iżda dawk iż-żewġ pumi jeħtieġu l-manifest sħiħ fil-ħin tar-reġistrazzjoni u huma** le** esposti permezz tal-varjabbli ambjentali llum (ganċ `tools/list` -level huwa segwitu tracked). `estimateManifestTokens()` huwa disponibbli biex iqabbel l-ispiża tat-token manifest qabel u wara t-tnaqqis.

---

## Runtime Taħbit tal-Qalb

It-trasport stdio jippersisti ħajja għal `${DATA_DIR}/runtime/mcp-heartbeat.json` kull 5 sekondi. Id-dashboard (`/api/mcp/status`) jaqra dan il-fajl flimkien ma' PID liveness biex jiġi derivat `online`. HTTP jittrasporta l-istat tar-rapport minn `getMcpHttpStatus()` fil-proċess minflok (l-ebda kitba tal-fajl).

L-istampa tat-taħbit tal-qalb fiha:

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

## Logging tal-Verifika

Kull sejħa għall-għodda hija illoggjata fit-tabella SQLite `mcp_tool_audit` minn `open-sse/mcp-server/audit.ts`:

- Isem tal-għodda, argumenti (hashed/truncated bħala kull għodda `auditLevel`), riżultat
- Tul f'ms, bandiera success/failure, messaġġ ta' żball (meta applikabbli)
- API key hash, timestamp
- Iċ-ċaħdiet ta' l-ambitu huma rreġistrati bħala `scope_denied:<reason>` -lista ta' l-ambitu nieqsa

Uża d-dashboard jew l-endpoints `/api/mcp/audit` u `/api/mcp/audit/stats` REST biex tispezzjona sejħiet riċenti.

---

## Fajls

| Fajl                                                                     | Għan                                                                                 |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fabbrika ta 'server MCP, punt ta' dħul stdio, reġistrazzjonijiet ta 'għodda b'ambitu |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Trasport HTTP Streamable (ġestjoni tas-sessjoni)                               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evalwazzjoni tal-ambitu tal-għodda u riżoluzzjoni ta' min iċempel                    |
| `open-sse/mcp-server/audit.ts`                                           | Logging tal-verifika tas-sejħiet tal-għodda (`mcp_tool_audit`)                       |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat writer (`mcp-heartbeat.json`)                                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompressjoni tad-deskrizzjoni għar-reġistri tal-għodda/pront/riżorsi                 |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemas + tool reġistru (`MCP_TOOLS`, 45 daħla)                                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Fażi 2 + cache + 1proxy tool handlers                                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Maniġers tal-għodda tal-kompressjoni                                                 |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definizzjonijiet tal-għodda tal-memorja (3 għodod)                                   |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definizzjonijiet tal-għodda tal-ħiliet (4 għodod)                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definizzjonijiet tal-għodda tas-sors tal-kuntest Notion (6 għodod)                   |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definizzjonijiet tal-għodda tal-gamifikazzjoni (8 għodod)                            |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Għodod ta' reġistrazzjoni u ġestjoni tal-plugins (8 għodod)                          |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endpoint                                                           |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endpoint                                                            |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transport route                                                   |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transport route                                    |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` verifika log query                                                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` aggregated audit metrics                                      |
| `src/lib/notion/api.ts`                                                  | Notion REST API client (erġa' pprova, timeout, klassifikazzjoni ta' żball)           |
| `src/lib/db/notion.ts`                                                   | Notion token persistenza ( tabella `key_value` )                                     |
| `src/app/api/settings/notion/route.ts`                                   | Notion settings API (GET/POST/DELETE)                                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion token management UI                                                           |
| `tests/unit/notion-api.test.ts`                                          | testijiet tal-klijenti Notion API (7)                                                |
| `tests/unit/notion-tools.test.ts`                                        | testijiet ta' infurzar tal-ambitu tal-għodda Notion (10)                             |
| `tests/unit/db/notion.test.mjs`                                          | testijiet tal-modulu Notion DB 3)                                                    |
