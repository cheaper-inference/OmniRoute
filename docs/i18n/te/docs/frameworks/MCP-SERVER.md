# OmniRoute MCP Server Documentation (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> రౌటింగ్, కాష్, కంప్రెషన్, మెమరీ, నైపుణ్యాలు, ప్రాక్సీ, పూల్, రాడార్ మరియు కాంటెక్స్ట్ సోర్స్ ఆపరేషన్లలో 110 సాధనాలతో మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ సర్వర్.
>
> Source of truth: `open-sse/mcp-server/server.ts` computes **110 unique tools** with `countUniqueMcpTools()`: 45 canonical definitions (including the six CCR lifecycle tools, the agent-skills trio, `omniroute_radar_catalog`, and `omniroute_x_search`), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), and two RTK-only compression tools.

## సంస్థాపన

OmniRoute MCP అంతర్నిర్మితమైంది. దీనితో ప్రారంభించండి:

```bash
omniroute --mcp
```

లేదా ఓపెన్-sse రవాణా ద్వారా:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

HTTP రవాణాలు (`sse` / `streamable-http`, డ్యాష్బోర్డ్ సర్వర్ ద్వారా ప్రాసెస్లో అందించబడతాయి) డిఫాల్ట్గా ఆఫ్ చేయబడ్డాయి మరియు గతంలో `/dashboard/mcp` పేజీ నుండి మాత్రమే టోగుల్ చేయగలవు. v3.8.51 నాటికి CLI సమానత్వాన్ని కలిగి ఉంది:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH అదే `mcpEnabled` (మరియు ఐచ్ఛికంగా `mcpTransport`) డాష్బోర్డ్ను `/api/settings` ద్వారా టోగుల్ చేస్తుంది. `mcp restart` కాల్స్ `POST /api/mcp/restart`: ఇది యాక్టివ్ `sse`/`streamable-http` సెషన్లను కూల్చివేస్తుంది కాబట్టి తదుపరి అభ్యర్థన క్లీన్గా మళ్లీ ప్రారంభించబడుతుంది, MCP నిలిపివేయబడితే `409` అందిస్తుంది మరియు `stdio` రవాణా కోసం `501` (stdio క్లయింట్లు తమ స్వంత సబ్ప్రాసెస్ — కలిగి ఉంటారు రీస్టార్ట్ చేయడానికి ప్రాసెస్లో హ్యాండిల్ లేదు).

## రవాణా

MCP సర్వర్ మూడు రవాణాలను బహిర్గతం చేస్తుంది, అన్నింటికీ ఒకే `createMcpServer()` ఫ్యాక్టరీ మద్దతు ఉంది:

| రవాణా             | ఎక్కడ                                          | ఎప్పుడు ఉపయోగించాలి                                     |
| :---------------- | :--------------------------------------------- | :------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE ఇంటిగ్రేషన్లు (Claude డెస్క్టాప్, Cursor, మొదలైనవి) |
| `sse`             | `POST/GET /api/mcp/sse` ద్వారా `httpTransport` | ఈవెంట్ స్ట్రీమ్ అవసరమయ్యేBrowser/agent క్లయింట్లు       |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | బహుళ-సెషన్ HTTP క్లయింట్లు (`mcp-session-id` హెడర్)     |

సక్రియ HTTP రవాణా (`sse` లేదా `streamable-http`) `mcpTransport` సెట్టింగ్ ద్వారా ఎంచుకోబడుతుంది. ట్రాన్స్పోర్ట్లను మార్చడం వలన ఇతర రవాణాపై ఇప్పటికే ఉన్న సెషన్లు ముగుస్తాయి.

### రిమోట్ యాక్సెస్ (నిర్వహణ-స్కోప్ బైపాస్)

`/api/mcp/*` LOCAL_ONLY టైర్ (`src/server/authz/routeGuard.ts`) — లో డిఫాల్ట్గా లూప్బ్యాక్ హోస్ట్లు (`localhost`, `127.0.0.1`, `::1`) మాత్రమే చేరుకోగలవు. v3.8.2 నుండి, నాన్-లూప్బ్యాక్ క్లయింట్లు `manage` స్కోప్ని కలిగి ఉన్న `Authorization: Bearer <api-key>` ని ప్రదర్శిస్తే కనెక్ట్ కావచ్చు. టన్నెల్, రివర్స్ ప్రాక్సీ లేదా పబ్లిక్ హోస్ట్నేమ్ ద్వారా రిమోట్ MCP సర్వర్ని చేరుకోవడానికి ఇదే ఏకైక మార్గం.

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

నాన్-మేనేజ్ కీ (లేదా బేరర్ లేదు) `403 LOCAL_ONLY` ని అందిస్తుంది. తోబుట్టువుల ఉపసర్గ `/api/cli-tools/runtime/*` ఉద్దేశపూర్వకంగా NOT బైపాస్ చేయదగిన — [రూట్ గార్డ్ టైర్స్ చూడండి — మేనేజ్-స్కోప్ కార్వ్-అవుట్](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### మూలం ధ్రువీకరణ

ప్రామాణీకరణ తర్వాత, రవాణాలు మరియు నిర్వహణ మార్గాలైన `status`, `tools`, `audit` మరియు `restart` — వంటి `/api/mcp/*` — కోసం ప్రతి అభ్యర్థన దాని `Origin` హెడర్ని ధృవీకరించింది, కాలర్ ఏమైనా (API కీ, CLI టోకెన్, డ్యాష్బోర్డ్ సెషన్ లేదా లోజిన్ డిసేబుల్ లూప్బ్యాక్తో). ఇది MCP స్ట్రీమబుల్ HTTP స్పెక్కి అవసరమైన DNS-రీబైండింగ్ రక్షణ.

- **`Origin` హెడర్ లేదు** → అనుమతించబడింది. OmniRoute CLI, SDK మరియు IDE క్లయింట్లు ఒకదానిని పంపవు.
- **అనుమతించబడిన `Origin`** → `localhost`, `127.0.0.1` లేదా `[::1]` ఏదైనా పోర్ట్లో, లేదా OmniRoute యొక్క స్వంత పబ్లిక్ మూలం: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, విశ్వసనీయ రివర్స్ ప్రాక్సీ యొక్క ఫార్వార్డ్ మూలం (`OMNIROUTE_TRUST_PROXY`, బేస్ URL సెట్ చేయనప్పుడు మాత్రమే) లేదా ప్రత్యక్ష loopback/LAN IP హోస్ట్. `Host` హెడర్ మాత్రమే మూలాన్ని విశ్వసించదు.
- **`null` తో సహా ఏదైనా ఇతర `Origin`** JSON-RPC ఎర్రర్ బాడీతో → `403` : `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. చెల్లుబాటు అయ్యే CSRF టోకెన్ను ప్రదర్శించే డాష్బోర్డ్ సెషన్ ఇతర డాష్బోర్డ్ వ్రాతలకు సంబంధించి ఇప్పటికీ ఆమోదించబడుతుంది.

రివర్స్ ప్రాక్సీ వెనుక అందించబడిన బ్రౌజర్ MCP క్లయింట్కు `OMNIROUTE_PUBLIC_BASE_URL` అవసరం; ఇతర మూలాలకు అనుమతి జాబితా లేదు. CORS ప్రీఫ్లైట్ (`OPTIONS`) మూలం-చెక్ చేయబడలేదు; క్రింది అభ్యర్థన.

## IDE కాన్ఫిగరేషన్

Claude డెస్క్టాప్, Cursor, Cline మరియు అనుకూలమైన MCP క్లయింట్ సెటప్ కోసం [MCP క్లయింట్ కాన్ఫిగరేషన్ను](../guides/SETUP_GUIDE.md#mcp-client-configuration) చూడండి.

---

## ముఖ్యమైన సాధనాలు (14) — దశ 1

| సాధనం                           | పరిధులు               | వివరణ                                                                                                                           |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | సమయ, మెమరీ, సర్క్యూట్ బ్రేకర్లు, రేటు పరిమితులు, కాష్ గణాంకాలు                                                                  |
| `omniroute_list_combos`         | `read:combos`         | వ్యూహాలతో కాన్ఫిగర్ చేయబడిన అన్ని కాంబోలు (ఐచ్ఛిక కొలమానాలు)                                                                    |
| `omniroute_get_combo_metrics`   | `read:combos`         | నిర్దిష్ట కాంబో కోసం పనితీరు కొలమానాలు                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | కాంబోను యాక్టివేట్ చేయండి లేదా డియాక్టివేట్ చేయండి                                                                              |
| `omniroute_create_combo`        | `write:combos`        | ఇప్పటికే ఉన్న కాంబో API ద్వారా ధృవీకరించబడిన కాంబోను సృష్టించండి                                                                |
| `omniroute_check_quota`         | `read:quota`          | కోటా used/total, మిగిలిన శాతం, రీసెట్ సమయం, టోకెన్ ఆరోగ్యం                                                                      |
| `omniroute_route_request`       | `execute:completions` | OmniRoute రూటింగ్ ద్వారా చాట్ పూర్తిని పంపండి                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | వ్యవధి వారీగా ఖర్చు నివేదిక (session/day/week/month)                                                                            |
| `omniroute_list_models_catalog` | `read:models`         | సామర్థ్యాలు, స్థితి, ధరలతో పూర్తి మోడల్ కేటలాగ్                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | స్థానిక సంతకం రాడార్ కేటలాగ్; ఐచ్ఛిక provider/family ఫిల్టర్లు                                                                  |
| `omniroute_tool_search`         | `read:tools`          | నమోదిత MCP కేటలాగ్ నుండి సాధనాలను కనుగొనండి                                                                                     |
| `omniroute_web_search`          | `execute:search`      | కాన్ఫిగర్ చేయబడిన సెర్చ్ ప్రొవైడర్ల ద్వారా వెబ్ శోధన. X/Twitter. కాదు                                                           |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok ద్వారా Xని శోధించండి లేదా Xquik API ఫలితాల కోసం `xquik-search` ఎంచుకోండి. ఎంచుకున్న బ్యాకెండ్ కోసం ఆధారాలు అవసరం. |
| `omniroute_web_fetch`           | `execute:search`      | కాన్ఫిగర్ చేయబడిన ఫెచ్ ప్రొవైడర్ల ద్వారా వెబ్ కంటెంట్ని పొందండి                                                                 |

## అధునాతన సాధనాలు (11) — దశ 2

| సాధనం                              | పరిధులు                              | వివరణ                                                                                                 |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ఫాల్బ్యాక్ ట్రీతో డ్రై-రన్ రూటింగ్ సిమ్యులేషన్                                                        |
| `omniroute_set_budget_guard`       | `write:budget`                       | degrade/block/alert చర్యతో సెషన్ బడ్జెట్                                                              |
| `omniroute_set_routing_strategy`   | `write:combos`                       | రన్టైమ్లో కాంబో స్ట్రాటజీని అప్డేట్ చేయండి (priority/weighted/auto/etc.)                              |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` రెసిలెన్స్ ప్రీసెట్ను వర్తింపజేయండి                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | నిజమైన అప్స్ట్రీమ్ కాల్ని ఉపయోగించి కాంబోలోని ప్రతి ప్రొవైడర్ యొక్క ప్రత్యక్ష పరీక్ష                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 జాప్యం మరియు సర్క్యూట్ బ్రేకర్ స్థితితో ప్రతి ప్రొవైడర్ కొలమానాలు                         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | budget/latency పరిమితులతో టాస్క్ రకం ద్వారా కాంబోని సిఫార్సు చేయండి                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | అభ్యర్థనను ప్రొవైడర్కు ఎందుకు పంపారో వివరించండి (స్కోరింగ్ కారకాలు + ఫాల్బ్యాక్లు)                    |
| `omniroute_get_session_snapshot`   | `read:usage`                         | పూర్తి సెషన్ స్నాప్షాట్: ధర, టోకెన్లు, టాప్ models/providers, లోపాలు, బడ్జెట్ గార్డ్                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | విరిగిన కాంబో రెఫ్లు / అనాధ వరుసల వంటి డేటాబేస్ డ్రిఫ్ట్ని నిర్ధారించండి (మరియు ఐచ్ఛికంగా ఆటో-రిపేర్) |
| `omniroute_sync_pricing`           | `pricing:write`                      | బాహ్య మూలాల నుండి ధర డేటాను సమకాలీకరించండి (LiteLLM); `dryRun` మద్దతు ఇస్తుంది                        |

## కాష్ సాధనాలు (2)

| సాధనం                   | పరిధులు       | వివరణ                                                            |
| :---------------------- | :------------ | :--------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | సెమాంటిక్ కాష్, ప్రాంప్ట్-కాష్ మరియు ఐడెంపోటెన్సీ గణాంకాలు       |
| `omniroute_cache_flush` | `write:cache` | ప్రపంచవ్యాప్తంగా లేదా signature/model ద్వారా కాష్ని ఫ్లష్ చేయండి |

## కుదింపు సాధనాలు (13)

| సాధనం                               | పరిధులు             | వివరణ                                                                                                                           |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | కంప్రెషన్ సెట్టింగ్లు, అనలిటిక్స్ సారాంశం మరియు కాష్-అవేర్ గణాంకాలు ( `analytics.mcpDescriptionCompression` మెటాడేటాతో సహా)     |
| `omniroute_compression_configure`   | `write:compression` | కంప్రెషన్ మోడ్, థ్రెషోల్డ్, టార్గెట్ రేషియో, సిస్టమ్-ప్రాంప్ట్ ప్రిజర్వేషన్, MCP వివరణ కంప్రెషన్ టోగుల్ని కాన్ఫిగర్ చేయండి      |
| `omniroute_set_compression_engine`  | `write:compression` | క్రియాశీల ఇంజిన్ (off/caveman/rtk/stacked) మరియు Caveman/RTK తీవ్రతను ఎంచుకోండి                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | కంప్రెషన్ కాంబోలు మరియు వాటి ఇంజిన్ పైప్లైన్ల పేరు పెట్టబడిన జాబితా                                                             |
| `omniroute_compression_combo_stats` | `read:compression`  | కంప్రెషన్ కాంబో మరియు ఇంజిన్ ద్వారా సమూహం చేయబడిన విశ్లేషణలు                                                                    |
| `omniroute_ccr_store`               | `write:compression` | బౌండెడ్ ఇన్-మెమరీ CCR స్టోర్లో కాలర్-ఐసోలేటెడ్ కంటెంట్ను స్టోర్ చేయండి మరియు మార్కర్తో పాటు `ccr://` రిఫరెన్స్ను తిరిగి ఇవ్వండి |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR కంటెంట్ను పూర్తిగా లేదా తల, తోక, పంక్తులు, grep మరియు గణాంకాల మోడ్లతో తిరిగి పొందండి                                        |
| `omniroute_ccr_inspect`             | `read:compression`  | కంటెంట్ని తిరిగి ఇవ్వకుండా కాలర్ యాజమాన్యంలోని CCR మెటాడేటాను తనిఖీ చేయండి                                                      |
| `omniroute_ccr_list`                | `read:compression`  | కాలర్ యాజమాన్యంలోని CCR బ్లాక్ల కోసం పేజీల మెటాడేటాను జాబితా చేయండి                                                             |
| `omniroute_ccr_delete`              | `write:compression` | కాలర్ యాజమాన్యంలోని CCR బ్లాక్ని తొలగించండి                                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | కాలర్-స్కోప్డ్ మెమరీ వినియోగం, జీవితచక్ర కౌంటర్లు మరియు స్టోర్ పరిమితులను నివేదించండి                                           |
| `omniroute_rtk_discover`            | `read:compression`  | ఆప్ట్-ఇన్ RTK అవుట్పుట్ నమూనాలలో పునరావృత శబ్దాన్ని కనుగొనండి                                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | ఎంపిక నమూనాల నుండి సమీక్షించదగిన RTK ఫిల్టర్ డ్రాఫ్ట్ను రూపొందించండి                                                            |

CCR ఎంట్రీలు మెమరీలో మాత్రమే ఉంటాయి మరియు పునఃప్రారంభించినప్పుడు అదృశ్యమవుతాయి. ప్రతి బ్లాక్ 2 MiB కి, ప్రతి ప్రిన్సిపల్ 16 MiB కి మరియు గ్లోబల్ స్టోర్ 64 MiB కి పరిమితం చేయబడింది. ఎంట్రీలు 24-గంటల TTL కి డిఫాల్ట్గా ఉంటాయి (గరిష్టంగా ఏడు రోజులు). పూర్తి MCP తిరిగి పొందడం 256 KiB కి పరిమితం చేయబడింది; రేంజ్డ్ మరియు grep మోడ్ల ద్వారా పెద్ద బ్లాక్లు అందుబాటులో ఉంటాయి. నిల్వ, పునరుద్ధరణ, జాబితా, తనిఖీ, తొలగింపు మరియు గణాంకాలు ప్రమాణీకరించబడిన API-కీ ప్రిన్సిపాల్ ద్వారా వేరుచేయబడతాయి. ఆడిట్ రికార్డ్లు హ్యాష్లు మరియు సైజ్ మెటాడేటాను కలిగి ఉంటాయి, ఎప్పుడూ కంటెంట్ కాదు.

`omniroute_compression_status` `analytics.mcpDescriptionCompression` కింద విడిగా MCP వివరణ కుదింపును నివేదిస్తుంది. ఆ విలువలు MCP జాబితా చేయదగిన వివరణల కోసం మెటాడేటా-పరిమాణ అంచనాలు (`tools`, `prompts`, `resources`, మరియు `resourceTemplates`); అవి ప్రొవైడర్ వినియోగ రశీదులు కావు మరియు `source: "mcp_metadata_estimate"` తో గుర్తించబడతాయి.

### MCP యాక్సెసిబిలిటీ ట్రీ ఫిల్టర్ (v3.8.0)

పైన ఉన్న కంప్రెషన్ టూల్స్ నుండి వేరుగా, OmniRoute ఒక పోస్ట్-ఎగ్జిక్యూషన్ ఫిల్టర్ని కలిగి ఉంటుంది, అది కంప్రెస్ చేస్తుంది** సాధన ఫలితాలు** MCP browser/accessibility సాధనాలు ఏజెంట్కు తిరిగి రావడానికి ముందు. ఈ ఫిల్టర్ అనేది టూల్ — కాదు ఇది వెర్బోస్ యాక్సెసిబిలిటీ-ట్రీ లేదా బ్రౌజర్-స్నాప్షాట్ టెక్స్ట్ (≥ 2000 అక్షరాలు) కలిగి ఉన్న ఏదైనా సాధన ఫలితంపై పారదర్శకంగా నడుస్తుంది.

ముఖ్య ప్రవర్తనలు:

- ≥ 30 వరుసగా పునరావృతమయ్యే తోబుట్టువుల పంక్తులను హెడ్ + టెయిల్ సారాంశంలో కుదించింది
- Playwright/computer-use కి అవసరమైన `[ref=eXX]` యాంకర్లను భద్రపరుస్తుంది
- నావిగేషన్ సూచనతో భారీ వచనాన్ని (> 50,000 అక్షరాలు) కఠినంగా కత్తిరించండి
- ఆశించిన పొదుపులు:** 60–80%** బ్రౌజర్ స్నాప్షాట్ పేలోడ్లపై

కాన్ఫిగరేషన్: గ్లోబల్ సెట్టింగ్లలో `compression.mcpAccessibility` (మైగ్రేషన్ 056). అమలు: `open-sse/services/compression/engines/mcpAccessibility/`. పూర్తి డాక్స్: [కంప్రెషన్ ఇంజన్లు — MCP యాక్సెసిబిలిటీ ట్రీ ఫిల్టర్](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

ఈ సాధనాల వెనుక ఉన్న రన్టైమ్ కంప్రెషన్ మోడల్ కోసం [కంప్రెషన్ ఇంజిన్లు](../compression/COMPRESSION_ENGINES.md) మరియు [RTK కంప్రెషన్](../compression/RTK_COMPRESSION.md) చూడండి.

## 1ప్రాక్సీ సాధనాలు (3)

| సాధనం                       | పరిధులు        | వివరణ                                                                                              |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1ప్రాక్సీ మార్కెట్ప్లేస్ (protocol/country/quality/limit ఫిల్టర్లు) నుండి ఉచిత ప్రాక్సీలను పొందండి |
| `omniroute_oneproxy_rotate` | `read:proxies` | వ్యూహం ద్వారా తదుపరి అందుబాటులో ఉన్న ప్రాక్సీని పొందండి (`random` / `quality` / `sequential`)      |
| `omniroute_oneproxy_stats`  | `read:proxies` | పూల్ గణాంకాలు, సమకాలీకరణ స్థితి, ప్రోటోకాల్ మరియు దేశం ద్వారా పంపిణీ                               |

## మెమరీ సాధనాలు (3)

`open-sse/mcp-server/tools/memoryTools.ts` లో నిర్వచించబడింది. Auth/scope ప్రామాణిక MCP స్కోప్ పైప్లైన్ ద్వారా అమలు చేయబడుతుంది.

| సాధనం                     | పరిధులు        | వివరణ                                                                                                        |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | టోకెన్-బడ్జెట్ అమలుతో ప్రశ్న / రకం / API కీ ద్వారా జ్ఞాపకాలను శోధించండి                                      |
| `omniroute_memory_add`    | `write:memory` | కొత్త మెమరీ ఎంట్రీని జోడించండి (`factual` / `episodic` / `procedural` / `semantic`)                          |
| `omniroute_memory_clear`  | `write:memory` | API కీ కోసం జ్ఞాపకాలను క్లియర్ చేయండి, ఐచ్ఛికంగా రకం లేదా `olderThan` టైమ్స్టాంప్ ద్వారా ఫిల్టర్ చేయబడుతుంది |

## నైపుణ్య సాధనాలు (4)

`open-sse/mcp-server/tools/skillTools.ts` లో నిర్వచించబడింది. `src/lib/skills/registry` + `src/lib/skills/executor`.

| సాధనం                         | పరిధులు          | వివరణ                                                                                                 |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API కీ, పేరు లేదా ప్రారంభించబడిన స్థితి ద్వారా ఐచ్ఛిక వడపోతతో నమోదు చేయబడిన నైపుణ్యాలను జాబితా చేయండి |
| `omniroute_skills_enable`     | `write:skills`   | ID ద్వారా నిర్దిష్ట నైపుణ్యాన్ని ప్రారంభించండి లేదా నిలిపివేయండి                                      |
| `omniroute_skills_execute`    | `execute:skills` | అందించిన ఇన్పుట్తో నైపుణ్యాన్ని అమలు చేయండి మరియు ఎగ్జిక్యూషన్ రికార్డ్ను తిరిగి ఇవ్వండి              |
| `omniroute_skills_executions` | `read:skills`    | ఇటీవలి నైపుణ్యం అమలు చరిత్రను జాబితా చేయండి                                                           |

## Notion సందర్భ మూలం (6)

`open-sse/mcp-server/tools/notionTools.ts` లో నిర్వచించబడింది. `src/lib/db/notion.ts` ద్వారా `key_value` పట్టికలో టోకెన్ నిల్వ చేయబడుతుంది. `src/lib/notion/api.ts` లో REST క్లయింట్. `src/app/api/settings/notion/route.ts` లో API సెట్టింగ్లు. `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` లో డాష్బోర్డ్ UI.

నుండి మీ Notion ఇంటిగ్రేషన్ టోకెన్ను కాన్ఫిగర్ చేయండి** సందర్భ మూలాలు** ఎండ్పాయింట్ డాష్బోర్డ్లో లేదా REST API ద్వారా ట్యాబ్:

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

| సాధనం                        | పరిధులు        | వివరణ                                                                   |
| :--------------------------- | :------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | అన్ని పేజీలు మరియు డేటాబేస్లలో పూర్తి-వచన శోధన                          |
| `notion_get_page`            | `read:notion`  | దాని లక్షణాలతో ID ద్వారా పేజీని పొందండి                                 |
| `notion_list_block_children` | `read:notion`  | పేజీ లేదా బ్లాక్ యొక్క చైల్డ్ బ్లాక్లను జాబితా చేయండి                   |
| `notion_query_database`      | `read:notion`  | ఫిల్టర్లు, రకాలు మరియు పేజినేషన్తో డేటాబేస్ను ప్రశ్నించండి              |
| `notion_get_database`        | `read:notion`  | ID ద్వారా డేటాబేస్ స్కీమాను పొందండి                                     |
| `notion_append_blocks`       | `write:notion` | పిల్లల బ్లాక్లను పేరెంట్ బ్లాక్కి జోడించు (ఒక అభ్యర్థనకు గరిష్టంగా 100) |

## ఏజెంట్ స్కిల్ కేటలాగ్ సాధనాలు (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` లో నిర్వచించబడింది. `src/lib/agentSkills/catalog` మద్దతు. ఈ సాధనాలు 45-ఎంట్రీ ఏజెంట్ స్కిల్స్ డాక్యుమెంటేషన్ కేటలాగ్ను MCP క్లయింట్లు మరియు బాహ్య ఏజెంట్లకు బహిర్గతం చేస్తాయి. పరిధి: `read:catalog`.

| సాధనం                             | పరిధులు        | వివరణ                                                                                                                               |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ఐచ్ఛిక `category` (api\| cli) మరియు `area` ఫిల్టర్లతో మొత్తం 45 ఏజెంట్ నైపుణ్యాలను జాబితా చేయండి; మెటాడేటా + కవరేజీని అందిస్తుంది   |
| `omniroute_agent_skills_get`      | `read:catalog` | కానానికల్ `id` ద్వారా ఒకే నైపుణ్యం కోసం పూర్తి మెటాడేటా + SKILL.md కంటెంట్ను పొందండి                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | కవరేజ్ గణాంకాలు: 23 API, 21 CLI మరియు 1 కాన్ఫిగర్ నైపుణ్యాలలో ఎన్ని ఫైల్సిస్టమ్ vs కేటలాగ్ మొత్తాలలో SKILL.md ఫైల్లను కలిగి ఉన్నాయి |

పూర్తి కేటలాగ్ కోసం [AGENT-SKILLS.md](./AGENT-SKILLS.md) చూడండి మరియు బాహ్య ఏజెంట్లు దానిని ఎలా వినియోగిస్తారు.

## సంబంధిత ఫ్రేమ్వర్క్లు (v3.8.0)

పైన ఉన్న MCP టూల్ ఇన్వెంటరీ (110 ప్రత్యేక సాధనాలు, `countUniqueMcpTools()` ద్వారా గణించబడింది) ఉద్దేశపూర్వకంగా రన్టైమ్ routing/cache/compression/memory/skills/proxy/context-source ఆపరేషన్లకు స్కోప్ చేయబడింది. రెండు ప్రక్కనే ఉన్న ఫ్రేమ్వర్క్లు v3.8.0లో MCP సర్వర్తో పాటుగా రవాణా చేయబడతాయి మరియు విడిగా డాక్యుమెంట్ చేయబడతాయి:

### క్లౌడ్ ఏజెంట్లు

క్లౌడ్ ఏజెంట్లు అనేది AI కోడింగ్ ఏజెంట్లు (కోడెక్స్-క్లౌడ్, కర్సర్-క్లౌడ్, డెవిన్, జూల్స్) LLM ప్రొవైడర్ల కోసం ఉపయోగించే అదే కనెక్షన్ మోడల్ ద్వారా OmniRoute లోకి వైర్ చేయబడి ఉంటాయి. అవి వాటి స్వంత REST ఉపరితలం (`/api/v1/agents/*`) ద్వారా బహిర్గతమవుతాయి మరియు ఉంటాయి** కాదు** క్లౌడ్ ఏజెంట్కి కాల్ చేసే MCP టూల్ కేటలాగ్ — భాగం MCP పరిధిని వినియోగించదు.

- అమలు: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- జీవితచక్రం: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- డాక్యుమెంటేషన్: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### గార్డ్రైల్స్

గార్డ్రెయిల్లు చాట్ పైప్లైన్ లోపల వర్తించే pre/post-execution ఫిల్టర్లు (విజన్-బ్రిడ్జ్, పై-మాస్కర్, ప్రాంప్ట్-ఇంజెక్షన్). అవి MCP tool/route లేయర్ను చేరుకోవడానికి ముందు అమలు చేస్తాయి మరియు ఆడిట్ పైప్లైన్కు నిర్మాణాత్మక ఉల్లంఘనలను విడుదల చేస్తాయి; అవి MCP సాధనాలుగా ఉపయోగించబడవు.

- అమలు: `src/lib/guardrails/`.
- డాక్యుమెంటేషన్: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

బ్లాక్ చేయబడినట్లు కనిపించే MCP కాల్ను డీబగ్ చేస్తున్నప్పుడు, MCP ఆడిట్ లాగ్ (`scope_denied:*` ఎంట్రీలు) మరియు గార్డ్రైల్స్ ఆడిట్ ట్రయిల్ — రెండింటినీ తనిఖీ చేయండి, ఒక అభ్యర్థనను గార్డ్రైల్ తిరస్కరించవచ్చు.** ముందు** ఇది ఎప్పుడైనా MCP స్కోప్ ఎన్ఫోర్స్మెంట్ లేయర్కు చేరుకుంటుంది.

---

## REST API ముగింపు పాయింట్లు

| ఎండ్ పాయింట్           | పద్ధతి                | వివరణ                                                                                                    | ప్రమాణీకరణ              |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | సర్వర్ స్థితి: హృదయ స్పందన, HTTP రవాణా స్థితి, ఆడిట్ కార్యాచరణ సారాంశం                                   | నిర్వహణ (session/admin) |
| `/api/mcp/tools`       | `GET`                 | టూల్ కేటలాగ్ (పేరు, వివరణ, పరిధులు, దశ, మూలాధార ముగింపు బిందువులు)                                       | నిర్వహణ                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE రవాణా ముగింపు స్థానం ( `mcpEnabled` + `mcpTransport === "sse"` ద్వారా గేట్ చేయబడింది)                | API కీ + స్కోప్లు       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | స్ట్రీమబుల్ HTTP రవాణా ( `mcp-session-id` హెడర్ని ఉపయోగిస్తుంది; `DELETE` సెషన్ను ముగిస్తుంది)           | API కీ + స్కోప్లు       |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` నుండి ఆడిట్ లాగ్ ఎంట్రీలు (ఫిల్టర్లు: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | నిర్వహణ                 |
| `/api/mcp/audit/stats` | `GET`                 | సమగ్ర ఆడిట్ గణాంకాలు (`totalCalls`, `successRate`, `avgDurationMs`, అగ్ర సాధనాలు)                        | నిర్వహణ                 |

మూల ఫైళ్లు: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

SSE మరియు స్ట్రీమబుల్ HTTP ట్రాన్స్పోర్ట్లు రెండూ సెట్టింగులలో (`mcpEnabled`) MCP సర్వర్ ప్రారంభించబడే వరకు మరియు తగిన `mcpTransport` ఎంచుకోబడే వరకు బ్లాక్ చేయబడతాయి. తప్పు రవాణా కాన్ఫిగర్ చేయబడితే, మార్గం సెట్టింగులను మార్చడానికి సూచనతో HTTP 400ని అందిస్తుంది.

---

## ప్రమాణీకరణ & పరిధులు

MCP టూల్ కాల్లు కాలర్ నుండి స్కోప్ స్ట్రింగ్లను రీడ్ చేస్తాయి. ఆ చెక్ మూడు స్వతంత్ర నేమ్స్పేస్లలో ఒకటి. ఒక చెకర్ నుండి పాస్ ఇతరుల నుండి పాస్ కాదు. నియమాలు [మూడు స్కోప్ నేమ్స్పేస్లు](#three-scope-namespaces). టూల్ కేటలాగ్ [MCP టూల్ స్కోప్లు](#mcp-tool-scopes).

### మూడు స్కోప్ నేమ్స్పేస్లు

API కీపై`manage`, MCP సాధనంపై `read:compression` మరియు `oma_live_…` యాక్సెస్ టోకెన్పై `read` మూడు వేర్వేరు గ్రాంట్లు. పరివర్తన చెందుతున్న నిర్వహణ మార్గానికి `read` యాక్సెస్ టోకెన్ను పంపిన కాలర్లు HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` పొందుతారు ఆ ర్యాంక్ `scopeSatisfies`. ఇది MCP పట్టికను సంప్రదించదు మరియు MCP సరిపోలిక దానిని సంప్రదించదు.

| నేమ్స్పేస్        | క్రెడెన్షియల్                                                                | చెకర్                     | ఒక పాస్ అనుమతిస్తుంది                                       |
| :---------------- | :--------------------------------------------------------------------------- | :------------------------ | :---------------------------------------------------------- |
| API-కీ నిర్వహణ    | `api_keys.scopes`                                                            | `hasManageScope`          | ఆ బేరర్ కీ కోసం మేనేజ్మెంట్ REST                            |
| API-కీ సంకలితం    | అదే శ్రేణి, ఒక ఖచ్చితమైన స్ట్రింగ్                                           | క్రింద పేర్కొన్న సహాయకుడు | ఆ ఒక్క సామర్ధ్యం మాత్రమే                                    |
| MCP టూల్ స్కోప్లు | అదే శ్రేణి, else MCP `_meta` (HTTP/SSE మాత్రమే), else `OMNIROUTE_MCP_SCOPES` | `scopeMatches`            | ఆ సాధనం, ఒకసారి అమలు చేయడం ప్రారంభించబడింది                 |
| యాక్సెస్ టోకెన్   | `oma_live_…`                                                                 | `scopeSatisfies`          | నిర్వహణ మార్గం దీని పద్ధతి మరియు మార్గానికి ఆ ర్యాంక్ అవసరం |

ప్రతి క్రెడెన్షియల్ని మింటింగ్ [మేనేజ్మెంట్ అథెంటికేషన్లో](../guides/MANAGEMENT-AUTH.md) కవర్ చేస్తుంది.

#### API-కీ స్కోప్లు

ఒక `api_keys.scopes` శ్రేణి రెండు ఉద్యోగాలను అందిస్తుంది. వారు వివిధ విధులను ఉపయోగిస్తారు.

**నిర్వహణ REST.** `manage` మరియు `admin` `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) సభ్యులు. `hasManageScope` అనేది ఆ కీ కోసం నిర్వహణ మార్గాలను అధీకృతం చేస్తుంది. `admin` ఆ మార్గాల్లో నిర్వహణ సామర్థ్యం కలిగి ఉంటుంది. ఇక్కడ `admin` అనే పదం యాక్సెస్-టోకెన్ ర్యాంక్ కాదు మరియు ఇది MCP టూల్ స్కోప్లలోకి విస్తరించదు.

**సంకలిత తీగలు.** ప్రతి ఒక్కటి ఖచ్చితమైన సభ్యత్వ పరీక్ష, మరియు ప్రతి ఒక్కటి `MANAGEMENT_API_KEY_SCOPES` వెలుపల ఉంటుంది.

| పరిధి                          | ఒక పాస్ అనుమతిస్తుంది                                                                                                                                               |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | నాన్-లూప్బ్యాక్ `/api/mcp/` LOCAL_ONLY కార్వ్-అవుట్ మాత్రమే (`hasMcpConnectOrManageScope`). `manage` లేదా `admin` ఉన్న కీ ఇప్పటికీ ఆ కార్వ్-అవుట్ను పాస్ చేస్తుంది. |
| `self:usage`                   | ఈ కీ (`src/app/api/v1/me/status/route.ts`) కోసం`GET /api/v1/me/status`. `POST /api/keys` క్రియేట్ (`normalizeSelfServiceScopesForCreate`)లో ఈ స్కోప్ని జోడిస్తుంది. |
| `self:account-quota`           | ఆ స్థితి పేలోడ్ (`src/lib/usage/apiKeySelfService.ts`) లోపల అప్స్ట్రీమ్ ఖాతా కోటాలు. స్థితి మార్గానికి ఇప్పటికీ `self:usage` అవసరం.                                 |
| `policy:bypass-provider-quota` | ఈ కీ యొక్క అనుమితి కాల్లు ప్రొవైడర్-కోటా విధానాన్ని దాటవేస్తాయి (`hasProviderQuotaBypassScope` ఇన్ `src/sse/handlers/chat.ts`).                                     |

#### సరిపోలిక

కేటలాగ్ అనేది [MCP టూల్ స్కోప్ల](#mcp-tool-scopes) క్రింద ఉన్న పట్టిక. `MCP_SCOPE_LIST` `src/shared/constants/mcpScopes.ts` లో ఆ కేటలాగ్గా పరిగణించవద్దు: ఇది అసలైన టైప్ చేసిన ఉపసమితి. తరువాతి సాధనాలు దాని ప్రక్కన మరిన్ని స్కోప్లను ప్రకటిస్తాయి (`read:notion`, `read:skills`, `read:local-corpus`, మరియు మిగిలిన పట్టిక).

`open-sse/mcp-server/scopeEnforcement.ts` లోని`evaluateToolScopes` అవసరమైన ప్రతి స్కోప్ కొంత మంజూరు చేయబడిన స్కోప్తో సరిపోలినప్పుడు కాల్ని అనుమతిస్తుంది:

- `*` ప్రతి అవసరమైన స్కోప్తో సరిపోతుంది.
- `*` తో ముగిసే మంజూరు చేయబడిన స్కోప్, నక్షత్రానికి ముందు ఉపసర్గతో ప్రారంభమయ్యే అవసరమైన స్కోప్తో సరిపోతుంది. `read:*` `read:compression` తో సరిపోతుంది.
- ప్రతి ఇతర మంజూరు చేయబడిన స్కోప్ ఒకే విధమైన అవసరమైన స్ట్రింగ్తో మాత్రమే సరిపోలుతుంది.

`["manage"]` స్కోప్ ఉన్న కీ `read:compression` కోసం `scopeMatches` విఫలమవుతుంది. `admin`, `mcp:connect`, `read`, మరియు `write` మాత్రమే మంజూరు చేయబడిన స్ట్రింగ్లు అయినప్పుడు అదే కాల్ విఫలమవుతుంది. MCP టూల్ స్కోప్లలో వెనుకంజలో ఉన్న `*` మించిన సోపానక్రమం లేదు.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (డిఫాల్ట్ `false`) తప్ప ఎన్ఫోర్స్మెంట్ ఆఫ్లో ఉంటుంది. ఇది ఆఫ్లో ఉన్నప్పుడు, `evaluateToolScopes` కాల్ని అనుమతిస్తుంది మరియు కేటలాగ్ను దాటవేస్తుంది. ఇది ఆన్లో ఉన్నప్పుడు, HTTP బేరర్ కీ యొక్క `api_keys.scopes` `authInfo` గా ఉపయోగిస్తుంది ( [పర్-కీ HTTP స్కోప్ బైండింగ్](#per-key-http-scope-binding-7895) చూడండి). కీ స్కోప్లు పరిష్కరించనప్పుడు, మంజూరు చేయబడిన సెట్ MCP `_meta` ( HTTP/SSE కాలర్లకు మాత్రమే గౌరవించబడుతుంది, HTTP auth సందర్భం లోపల; stdio కాలర్ యొక్క `_meta` విస్మరించబడుతుంది ఎందుకంటే క్లయింట్ దానిని నియంత్రిస్తుంది మరియు ఇది ప్రతి కాలర్ గుర్తింపును కలిగి ఉండదు), ఆపై `OMNIROUTE_MCP_SCOPES`.

#### యాక్సెస్-టోకెన్ స్కోప్లు

`oma_live_…` టోకెన్లు (`src/lib/accessTokens/scopes.ts`) `read`, `write` లేదా `admin` ని కలిగి ఉంటాయి. `scopeSatisfies` అనేది ఒక ర్యాంక్: `admin` `write` మరియు `read` కవర్ చేస్తుంది మరియు `write` `read` కవర్ చేస్తుంది. తెలియని స్కోప్లు దేనినీ కవర్ చేయవు.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ఆ ర్యాంక్ను `inferRequiredScope` (`src/server/authz/accessScopes.ts`)తో పోలుస్తుంది:

- `GET`, `HEAD` మరియు `OPTIONS` `read` అవసరం.
- ప్రతి ఇతర పద్ధతికి `write` అవసరం.
- `ADMIN_SCOPE_PREFIXES` లోని మార్గాలకు ప్రతి పద్ధతికి `admin` అవసరం. `/api/mcp` ఆ జాబితాలో ఉంది, కాబట్టి `write` యాక్సెస్ టోకెన్ ఇప్పటికీ MCP HTTP ఉపరితలాన్ని కాల్ చేయలేదు.
- `ADMIN_MUTATION_PREFIXES` లోని మార్గాలకు ఉత్పరివర్తనాల కోసం మాత్రమే `admin` అవసరం.
- `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`)లోని మార్గాలకు ఉత్పరివర్తనాల కోసం మాత్రమే `admin` అవసరం, మరియు ఆ ఖచ్చితమైన మార్గంలో మాత్రమే — ఇతర `/api/settings/*` ఉప-మార్గాలు `write` ఉంచుతాయి.

`PATCH /api/keys/{id}` అనేది మ్యుటేషన్ మరియు ఆ నిర్వాహకుల జాబితాలలో లేదు, కాబట్టి `read` టోకెన్ 403 `Access token scope 'read' is insufficient; 'write' required.` A `write` లేదా `admin` యాక్సెస్ టోకెన్ ఆ మార్గాన్ని సంతృప్తిపరుస్తుంది. డాష్బోర్డ్ JWT, లూప్బ్యాక్ CLI మెషిన్-ఐడి టోకెన్ మరియు `manage` లేదా `admin` తో కూడిన API కీ ఇతర శాఖలను తీసుకుంటాయి మరియు ఈ ర్యాంక్తో కుదించబడవు.

`/api/mcp` కోసం `scopeSatisfies` పాస్ చేసే యాక్సెస్ టోకెన్ నిర్వహణ గేట్ను మాత్రమే క్లియర్ చేసింది. టూల్ కాల్లు ఇప్పటికీ API-కీ స్కోప్లకు వ్యతిరేకంగా `scopeMatches` అమలు చేస్తాయి. యాక్సెస్-టోకెన్ ర్యాంక్ `scopeMatches` కి ఇన్పుట్ కాదు.

### MCP టూల్ స్కోప్లు

స్కోప్ ఎన్ఫోర్స్మెంట్ `open-sse/mcp-server/scopeEnforcement.ts` లో కేంద్రీకృతమై ఉంది. ప్రతి సాధనానికి నిర్దిష్ట పరిధులు అవసరం:

| పరిధి                 | ఉపకరణాలు                                                                                                                                                                      |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 13 రీడ్ టూల్స్ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 రైట్ టూల్స్ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

వైల్డ్కార్డ్ స్కోప్లకు మద్దతు ఉంది: `read:*` అన్ని రీడ్-స్కోప్లను మంజూరు చేస్తుంది, `*` పూర్తి యాక్సెస్ను మంజూరు చేస్తుంది.

### `mcp:connect` — ఇరుకైన మార్గం సామర్థ్యం (#7895)

నాన్-లూప్బ్యాక్ నుండి HTTP/SSE MCP రవాణా (`/api/mcp/*`) చేరుకోవడానికి `/api/mcp/` LOCAL_ONLY కార్వ్-అవుట్ అవసరం ( `docs/security/ROUTE_GUARD_TIERS.md` చూడండి). చారిత్రాత్మకంగా ఆ కార్వ్-అవుట్ పూర్తి `manage`/`admin` -scope API కీ — మాత్రమే ఆమోదించింది, ఇది MCP మాత్రమే మాట్లాడాల్సిన కాలర్కు చాలా విస్తృతమైనది. `src/shared/constants/managementScopes.ts` ఇప్పుడు `MCP_CONNECT_SCOPE = "mcp:connect"` ఎగుమతి చేస్తుంది: `src/server/authz/policies/management.ts` — లో `/api/mcp/` బైపాస్ను ONLY అధికారం ఇచ్చే ఒక సంకలిత, ఇరుకైన స్కోప్ ( `SELF_USAGE_SCOPE` లాంటిదే) ఇది ఏ ఇతర నిర్వహణ-మార్గం యాక్సెస్ను మంజూరు చేయదు మరియు ఉద్దేశపూర్వకంగా `MANAGEMENT_API_KEY_SCOPES` యొక్క OUT ఉంచబడుతుంది. ఒక కీ హోల్డింగ్ `manage`/`admin` ఇప్పటికీ కార్వ్-అవుట్ను మార్చకుండా పాస్ చేస్తుంది; `mcp:connect` అనేది రిమోట్ MCP-మాత్రమే కాలర్లకు తక్కువ-ప్రత్యేక ప్రత్యామ్నాయం, `hasMcpConnectOrManageScope()` ద్వారా తనిఖీ చేయబడుతుంది.

### పర్-కీ HTTP స్కోప్ బైండింగ్ (#7895)

HTTP/SSE కంటే, `open-sse/mcp-server/httpTransport.ts` ఇప్పుడు కాలర్ యొక్క నిజమైన `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) ద్వారా పరిష్కరిస్తుంది మరియు దానిని MCP SDK యొక్క `transport.handleRequest(req, { authInfo })` కి పంపుతుంది, కాబట్టి `extra.authInfo.scopes` ప్రతి టూల్ కాల్ను చేరుకోవడం బేరర్ కీ యొక్క స్వంత స్కోప్లను ప్రతిబింబిస్తుంది. `scopeEnforcement.ts` యొక్క `resolveCallerScopeContext()` ఇప్పటికే `_meta` మరియు `OMNIROUTE_MCP_SCOPES` env ఫాల్బ్యాక్ — కంటే `authInfo` ప్రాధాన్యత ఇవ్వబడింది, ఇది మునుపు HTTP కంటే ఎక్కువగా అందించబడిన మొదటి, అత్యధిక ప్రాధాన్యత గల మూలాన్ని మాత్రమే అందిస్తుంది. API కీ పరిష్కరించనప్పుడు (హెడర్ లేదు, చెల్లని కీ), `authInfo` `undefined` ఉంటుంది మరియు రిజల్యూషన్ ఇప్పటికే ఉన్న `meta`/env చైన్కు మారదు. stdioకి పర్-కాలర్ గుర్తింపు లేదు ( `mcpCallerIdentity.ts` చూడండి) మరియు పర్-కీ బైండింగ్ — ద్వారా ప్రభావితం కాదు ఇది `_meta` దశను దాటవేస్తుంది (`_meta` అనేది HTTP auth సందర్భం లోపల మాత్రమే గౌరవించబడుతుంది, #15159) మరియు `OMNIROUTE_MCP_SCOPES` env కీ నుండి మాత్రమే పరిష్కరిస్తుంది.

**`OMNIROUTE_MCP_ENFORCE_SCOPES` తో సంబంధం లేకుండా ఇరుకైన స్కోప్ ఉన్న HTTP/SSE కాలర్ల కోసం అమలు చేయవలసి ఉంటుంది.** `false` కి `OMNIROUTE_MCP_ENFORCE_SCOPES` డిఫాల్ట్ చేయడం అనేది local/stdio సింగిల్-ఆపరేటర్ ఫ్లోకి మాత్రమే సురక్షితం, ఇక్కడ స్కోప్ చేయడానికి పర్-కాలర్ గుర్తింపు ఉండదు. `resolveCallerScopeContext()` `source === "authInfo"` ని పరిష్కరించినప్పుడల్లా `open-sse/mcp-server/server.ts::withScopeEnforcement()` `admin` HTTP/SSE-only టూల్ స్కోప్ HTTP బేషరతుగా ఆన్ `manage` AND `scopeEnforcement.ts` లో`shouldForceScopeEnforcement()` ) ఇది ONLY ని పట్టుకుని ఉన్న గ్యాప్ను మూసివేస్తుంది, ఎగువన డాక్యుమెంట్ చేయబడిన ఇరుకైన `mcp:connect` బైపాస్ స్కోప్ — `/api/mcp/` LOCAL_ONLY కార్వ్-అవుట్ — తప్ప మరేదైనా ఆథరైజ్ చేయబడదు, లేకపోతే ఒక ఆపరేటర్ remote/non-loopback MCP యాక్సెస్ను ప్రారంభించిన తర్వాత ప్రతి MCP సాధనాన్ని ప్రారంభించవచ్చు, ఎందుకంటే `OMNIROUTE_MCP_ENFORCE_SCOPES` డిఫాల్ట్ `false` ద్వారా HTTP పై పూర్తి `manage`/`admin` కీ మరియు ప్రతి stdio/local కాలర్, ఇప్పటికే ఉన్న `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated ప్రవర్తనను మార్చకుండా ఉంచండి.

---

## ఎన్విరాన్మెంట్ వేరియబుల్స్

| వేరియబుల్                               | డిఫాల్ట్                                           | ప్రయోజనం                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------------- | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                           | బేస్ URL MCP సర్వర్ OmniRoute అంతర్గత APIs కి కాల్ చేస్తున్నప్పుడు ఉపయోగిస్తుంది                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_API_KEY`                     | (ఖాళీ)                                             | API కీ అంతర్గత API కాల్లకు `Authorization: Bearer` గా ఫార్వార్డ్ చేయబడింది                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` ( `"true"` మాత్రమే దీన్ని ప్రారంభిస్తుంది) | ప్రారంభించబడినప్పుడు, తప్పిపోయిన స్కోప్లు టూల్ కాల్లను నిరాకరిస్తాయి మరియు ఆడిట్ లాగ్లో `scope_denied:<reason>` లాగ్ చేస్తాయి. పూర్తి `manage`/`admin` స్కోప్ — లేని పర్-కీ ఆథరైజేషన్ హెడర్ (`source === "authInfo"`) నుండి పరిష్కరించబడిన ఏదైనా HTTP/SSE కాలర్ కోసం ఈ ఫ్లాగ్తో సంబంధం లేకుండా ALSO బలవంతంగా అమలు చేయబడుతుంది, ఉదా. ఇరుకైన `mcp:connect` బైపాస్ స్కోప్ — మాత్రమే కలిగి ఉన్న కీ, కాబట్టి ఈ సింగిల్ డిఫాల్ట్ local/stdio యాక్సెసేటర్-నాన్-బ్యాక్ ఫ్లో కోసం మాత్రమే సురక్షితం కాదు. |
| `OMNIROUTE_MCP_SCOPES`                  | (ఖాళీ)                                             | డిఫాల్ట్గా "అందుబాటులో" పరిగణించబడే స్కోప్ల కామాతో వేరు చేయబడిన అనుమతి జాబితా (కాలర్ దాని స్వంత స్కోప్లను అందించనప్పుడు ఉపయోగించబడుతుంది)                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | ( = ని అన్సెట్ చేయి)                               | `0/false/off/no` కి సెట్ చేసినప్పుడు, రిజిస్ట్రేషన్ సమయంలో MCP వివరణ కుదింపును నిలిపివేస్తుంది                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | ( = ని అన్సెట్ చేయి)                               | పైన పేర్కొన్న అదే టోగుల్ కోసం ప్రత్యామ్నాయ మారుపేరు                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                            | అంతర్గత నిర్వహణ రీడ్ల కోసం బడ్జెట్ను రద్దు చేయండి (ఆరోగ్యం, స్థితిస్థాపకత, కాంబోలు, కోటా, వినియోగం)                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                            | ప్రొవైడర్ (`route_request`, `web_search`, `web_fetch`) కోసం వేచి ఉండే హాప్ల కోసం బడ్జెట్ను రద్దు చేయండి                                                                                                                                                                                                                                                                                                                                                                                          |
| `MCP_TOOL_DENY`                         | ( = ఏ ఫిల్టర్ను సెట్ చేయవద్దు)                     | `tools/list` నుండి డ్రాప్ చేయడానికి కామాతో వేరు చేయబడిన సాధనాల పేర్లు (టూల్-కార్డినాలిటీ తగ్గింపు — క్రింద చూడండి)                                                                                                                                                                                                                                                                                                                                                                               |
| `MCP_TOOL_ALLOW`                        | ( = ఏ ఫిల్టర్ను సెట్ చేయవద్దు)                     | ప్రత్యేకంగా ఉంచడానికి కామాతో వేరు చేయబడిన సాధనం పేర్లు (అనుమతి-జాబితా మోడ్ — క్రింద చూడండి)                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DATA_DIR`                              | `~/.omniroute`                                     | హృదయ స్పందన ఫైల్ `${DATA_DIR}/runtime/mcp-heartbeat.json` కి వ్రాయబడింది                                                                                                                                                                                                                                                                                                                                                                                                                         |

---

## వివరణ కుదింపు

MCP టూల్, ప్రాంప్ట్ మరియు రిసోర్స్ రిజిస్ట్రీలు క్లయింట్లకు బహిర్గతమయ్యే మెటాడేటా పాదముద్రను తగ్గించడానికి registration/list సమయంలో వివరణలను కుదించగలవు (అందువల్ల ప్రాంప్ట్ కాంటెక్స్ట్ ధర). అమలు `open-sse/mcp-server/descriptionCompressor.ts` లో నివసిస్తుంది మరియు `createMcpServer()` లోపల `compressMcpRegistryMetadata` ద్వారా MCP సర్వర్లోకి వైర్ చేయబడుతుంది.

- సంరక్షించబడిన-బ్లాక్ ఎక్స్ట్రాక్షన్ (కోడ్ స్పాన్లు, ఫెన్స్డ్ బ్లాక్లు మొదలైనవి)తో కేవ్మ్యాన్ రూల్సెట్ (`getRulesForContext("all", "full")`) ఉపయోగించి వివరణ టెక్స్ట్పై కంప్రెషన్ నడుస్తుంది కాబట్టి నిర్మాణాత్మక కంటెంట్ మార్చబడదు.
- `key_value` సెట్టింగుల పట్టికలోని `compression.mcpDescriptionCompressionEnabled` విలువ ద్వారా ప్రతి విస్తరణను టోగుల్ చేయండి (డిఫాల్ట్: ప్రారంభించబడింది) — UI లో ఇలా బహిర్గతం చేయబడింది** Analytics → MCP వివరణ కుదింపు** .
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` లేదా `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` ద్వారా ప్రాసెస్-వైడ్ టోగుల్ చేయండి.
- నిజ సమయ గణాంకాలు `analytics.mcpDescriptionCompression` క్రింద `omniroute_compression_status` ద్వారా ప్రదర్శించబడతాయి మరియు నిజమైన ప్రొవైడర్ వినియోగ రసీదుల నుండి అస్పష్టంగా ఉండటానికి `source: "mcp_metadata_estimate"` ట్యాగ్ చేయబడతాయి.

---

## టూల్ కార్డినాలిటీ తగ్గింపు (F4.3)

వివరణ కుదింపు ప్రతి సాధనం యొక్క మెటాడేటాను తగ్గిస్తుంది;** సాధనం-కార్డినాలిటీ తగ్గింపు** _ఎన్ని_ సాధనాలు అన్నీ ప్రకటించబడ్డాయి తగ్గించడం ద్వారా ఒక అడుగు ముందుకు వెళుతుంది. `tools/list` మానిఫెస్ట్లో తక్కువ సాధనాలను ప్రకటించడం వలన టూల్ కేటలాగ్ ("లేయర్ 5" కంప్రెషన్) కోసం క్లయింట్ మోడల్ చెల్లించే ప్రతి అభ్యర్థన టోకెన్ ధరను తగ్గిస్తుంది. అమలు అనేది `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`)లో స్వచ్ఛమైన, స్థితిలేని ఫిల్టర్, `createMcpServer()` (`open-sse/mcp-server/server.ts`)లోని రిజిస్ట్రేషన్ లూప్లోకి వైర్ చేయబడింది.

**ఆప్ట్-ఇన్, డిఫాల్ట్గా ఆఫ్.** కనీసం రెండు ఎన్విరాన్మెంట్ వేరియబుల్స్లో ఒకటి సెట్ చేయబడినప్పుడు మాత్రమే ఫిల్టర్ రన్ అవుతుంది; ఏ సెట్ లేకుండా, మొత్తం 110 సాధనాలు మారకుండా ప్రకటించబడ్డాయి.

| వేరియబుల్        | మోడ్                                                                                                   |
| :--------------- | :----------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | `tools/list` నుండి ఎల్లప్పుడూ తొలగించబడే — కామాతో వేరు చేయబడిన సాధనాల పేర్లను బ్లాక్లిస్ట్ చేయండి      |
| `MCP_TOOL_ALLOW` | అనుమతించు-జాబితా — కామాతో వేరు చేయబడిన సాధనం పేర్లు; ఇవి మాత్రమే మనుగడలో ఉన్నాయి, మిగతావన్నీ పడిపోయాయి |

`deny` `allow` కంటే ప్రాధాన్యతనిస్తుంది. పేర్లు కామాతో వేరు చేయబడ్డాయి, కత్తిరించబడ్డాయి మరియు ఖాళీ ఎంట్రీలు విస్మరించబడతాయి. ఉదాహరణలు:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ఫిల్టర్ చేసిన సాధనాలు ఎలా తీసివేయబడతాయి:** నమోదు ఎల్లప్పుడూ విజయవంతమవుతుంది; ప్రొఫైల్ తిరస్కరించే సాధనం MCP SDK హ్యాండిల్పై `.disable()` d, కాబట్టి ఇది ఎప్పుడూ `tools/list` లో కనిపించదు కానీ వైరింగ్ అలాగే ఉంటుంది (క్లీన్ enable/disable, రీ-రిజిస్ట్రేషన్ లేదు). ప్రొఫైల్ పార్సర్ `readMcpToolProfileFromEnv(process.env)`, ఇది రెండు varలు ఖాళీగా ఉన్నప్పుడు `null` (ఫిల్టరింగ్ లేదు)ని అందిస్తుంది.

`reduceToolManifest` వెనుక ఉన్న రిచ్ `ToolProfile` ఆకృతి స్కోప్-ఇంటర్సెక్షన్ ఫిల్టరింగ్కు (`allowScopes`, `read:*` -style వైల్డ్కార్డ్ మ్యాచింగ్తో) మరియు డిటర్మినిస్టిక్ `maxTools` క్యాప్కు మద్దతు ఇస్తుంది, అయితే ఆ రెండు నాబ్లకు రిజిస్ట్రేషన్ సమయంలో పూర్తి మానిఫెస్ట్ అవసరం మరియు అవి** కాదు** నేడు ఎన్విరాన్మెంట్ వేరియబుల్స్ ద్వారా బహిర్గతం చేయబడింది ( `tools/list` -level హుక్ అనేది ట్రాక్ చేయబడిన ఫాలో-అప్). తగ్గింపుకు ముందు మరియు తర్వాత మానిఫెస్ట్ టోకెన్ ధరను పోల్చడానికి `estimateManifestTokens()` అందుబాటులో ఉంది.

---

## రన్టైమ్ హార్ట్బీట్

stdio రవాణా ప్రతి 5 సెకన్లకు `${DATA_DIR}/runtime/mcp-heartbeat.json` వరకు లైవ్నెస్ను కొనసాగిస్తుంది. డ్యాష్బోర్డ్ (`/api/mcp/status`) `online` ని పొందేందుకు ఈ ఫైల్తో పాటు PID లైవ్నెస్ని చదువుతుంది. HTTP బదులుగా ఇన్-ప్రాసెస్ `getMcpHttpStatus()` నుండి నివేదిక స్థితిని రవాణా చేస్తుంది (ఫైల్ రైట్ లేదు).

హృదయ స్పందన స్నాప్షాట్ వీటిని కలిగి ఉంటుంది:

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

## ఆడిట్ లాగింగ్

ప్రతి టూల్ కాల్ SQLite `mcp_tool_audit` పట్టికకు `open-sse/mcp-server/audit.ts` ద్వారా లాగిన్ చేయబడింది:

- సాధనం పేరు, ఆర్గ్యుమెంట్లు (hashed/truncated పర్-టూల్ `auditLevel`), ఫలితం
- ms, success/failure ఫ్లాగ్, ఎర్రర్ మెసేజ్లో వ్యవధి (వర్తించినప్పుడు)
- API కీ హాష్, టైమ్స్టాంప్
- స్కోప్ తిరస్కరణలు తప్పిపోయిన స్కోప్ జాబితాతో `scope_denied:<reason>` గా లాగ్ చేయబడ్డాయి

ఇటీవలి కాల్లను తనిఖీ చేయడానికి డాష్బోర్డ్ లేదా `/api/mcp/audit` మరియు `/api/mcp/audit/stats` REST ఎండ్ పాయింట్లను ఉపయోగించండి.

---

## ఫైళ్లు

| ఫైల్                                                                     | ప్రయోజనం                                                                       |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP సర్వర్ ఫ్యాక్టరీ, stdio ఎంట్రీ పాయింట్, స్కోప్డ్ టూల్ రిజిస్ట్రేషన్లు      |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + స్ట్రీమబుల్ HTTP రవాణా (సెషన్ నిర్వహణ)                                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | టూల్ స్కోప్ మూల్యాంకనం మరియు కాలర్ రిజల్యూషన్                                  |
| `open-sse/mcp-server/audit.ts`                                           | టూల్ కాల్ ఆడిట్ లాగింగ్ (`mcp_tool_audit`)                                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio హార్ట్బీట్ రైటర్ (`mcp-heartbeat.json`)                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | సాధనం / ప్రాంప్ట్ / వనరుల రిజిస్ట్రీల కోసం వివరణ కుదింపు                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod స్కీమాస్ + టూల్ రిజిస్ట్రీ (`MCP_TOOLS`, 45 ఎంట్రీలు)                      |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | దశ 2 + కాష్ + 1ప్రాక్సీ టూల్ హ్యాండ్లర్లు                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | కంప్రెషన్ టూల్ హ్యాండ్లర్లు                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | మెమరీ టూల్ నిర్వచనాలు (3 సాధనాలు)                                              |
| `open-sse/mcp-server/tools/skillTools.ts`                                | నైపుణ్య సాధనాల నిర్వచనాలు (4 సాధనాలు)                                          |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion సందర్భోచిత మూల సాధనం నిర్వచనాలు (6 సాధనాలు)                             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | గేమిఫికేషన్ సాధనం నిర్వచనాలు (8 సాధనాలు)                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ప్లగిన్ నమోదు మరియు నిర్వహణ సాధనాలు (8 సాధనాలు)                                |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` ముగింపు స్థానం                                               |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` ముగింపు స్థానం                                                |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE రవాణా మార్గం                                                |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` స్ట్రీమబుల్ HTTP రవాణా మార్గం                                |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ఆడిట్ లాగ్ ప్రశ్న                                             |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` సమగ్ర ఆడిట్ కొలమానాలు                                   |
| `src/lib/notion/api.ts`                                                  | Notion REST API క్లయింట్ (మళ్లీ ప్రయత్నించండి, గడువు ముగిసింది, లోపం వర్గీకరణ) |
| `src/lib/db/notion.ts`                                                   | Notion టోకెన్ పెర్సిస్టెన్స్ (`key_value` పట్టిక)                              |
| `src/app/api/settings/notion/route.ts`                                   | Notion సెట్టింగ్లు API (GET/POST/DELETE)                                       |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion టోకెన్ నిర్వహణ UI                                                       |
| `tests/unit/notion-api.test.ts`                                          | Notion API క్లయింట్ పరీక్షలు (7)                                               |
| `tests/unit/notion-tools.test.ts`                                        | Notion టూల్స్ స్కోప్ ఎన్ఫోర్స్మెంట్ పరీక్షలు (10)                              |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB మాడ్యూల్ పరీక్షలు (3)                                                |
