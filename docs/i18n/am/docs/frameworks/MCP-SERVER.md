# OmniRoute MCP Server Documentation (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> በራውቲንግ፣ ካሽ፣ መጭመቅ፣ ማህደረ ትውስታ፣ ክህሎቶች፣ ፕሮክሲ፣ ፑል፣ Radar እና የአውድ ምንጭ ክዋኔዎች ዙሪያ 110 መሣሪያዎች ያሉት Model Context Protocol ሰርቨር።
>
> ትክክለኛው የመረጃ ምንጭ፦ `open-sse/mcp-server/server.ts` በ`countUniqueMcpTools()` አማካኝነት **110 ልዩ መሣሪያዎችን** ያሰላል፦ 45 መደበኛ ትርጓሜዎች (ስድስቱን የCCR የሕይወት ዑደት መሣሪያዎች፣ የagent-skills ሶስትዮሽ፣ `omniroute_radar_catalog` እና `omniroute_x_search` ጨምሮ)፣ እንዲሁም ማህደረ ትውስታ (3)፣ ክህሎቶች (4)፣ GitHub ክህሎቶች (3)፣ ፑል (6)፣ የጨዋታ ባህሪያት (8)፣ ተሰኪዎች (8)፣ Notion (6)፣ Obsidian (22)፣ የአካባቢ ኮርፐስ (3) እና ለRTK ብቻ የሆኑ ሁለት የመጭመቂያ መሣሪያዎች።

## መጫን

OmniRoute MCP አብሮገነብ ነው። ጀምር በ:

```bash
omniroute --mcp
```

ወይም በክፍት-ሴ ትራንስፖርት በኩል፡-

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

HTTP ማጓጓዣዎች (`sse` / `streamable-http`፣ በሂደት በዳሽቦርድ አገልጋይ የቀረቡ) በነባሪነት ጠፍተዋል እና ከዚህ ቀደም ከ `/dashboard/mcp` ገጽ ብቻ ተለዋወጡ። ከ v3.8.51 ጀምሮ CLI እኩልነት አለው፡-

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH ተመሳሳይ `mcpEnabled` (እና እንደ አማራጭ `mcpTransport`) ዳሽቦርዱን በ `/api/settings` በኩል ማቀናበር። `mcp restart` `POST /api/mcp/restart` ይደውላል፡ ንቁ `sse`/`streamable-http` ክፍለ ጊዜዎችን ያፈርሳል ስለዚህ የሚቀጥለው ጥያቄ በንጽህና እንደገና ይጀምራል፣ MCP ከተሰናከለ `409` ይመለሳል እና `501` ለ `stdio` ትራንስፖርት (የስቲዲዮ ደንበኞች የራሳቸው ንዑስ ፕሮሰስ አላቸው — እንደገና ለመጀመር በሂደት ላይ ያለ እጀታ የለውም)።

## ማጓጓዣዎች

የMCP ሰርቨሩ ሦስት ማጓጓዣዎችን ያቀርባል፤ ሁሉም በተመሳሳዩ `createMcpServer()` ፋብሪካ የሚደገፉ ናቸው፦

| ማጓጓዣ              | የሚገኝበት ቦታ                                    | መቼ እንደሚጠቀሙበት                                  |
| :---------------- | :------------------------------------------- | :-------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | የIDE ውህደቶች (Claude Desktop፣ Cursor፣ ወዘተ)      |
| `sse`             | `POST/GET /api/mcp/sse` በ`httpTransport` በኩል | የክስተት ዥረት ለሚያስፈልጋቸው የአሳሽ/ወኪል ደንበኞች            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | ባለብዙ-ክፍለ ጊዜ HTTP ደንበኞች (`mcp-session-id` ራስጌ) |

ገቢር የHTTP ማጓጓዣው (`sse` ወይም `streamable-http`) በ`mcpTransport` ቅንብር ይመረጣል። ማጓጓዣዎችን መቀየር በሌላው ማጓጓዣ ላይ ያሉ ክፍት ክፍለ ጊዜዎችን ይዘጋል።

### የርቀት መዳረሻ (`manage` ወሰንን ማለፍ)

`/api/mcp/*` በLOCAL_ONLY ደረጃ (`src/server/authz/routeGuard.ts`) ውስጥ ነው—በነባሪነት የloopback አስተናጋጆች (`localhost`፣ `127.0.0.1`፣ `::1`) ብቻ ሊደርሱበት ይችላሉ። ከv3.8.2 ጀምሮ፣ የ`manage` ወሰን ያለው ቁልፍ የያዘ `Authorization: Bearer <api-key>` ካቀረቡ የloopback ያልሆኑ ደንበኞች መገናኘት ይችላሉ። በዋሻ፣ reverse proxy ወይም ይፋዊ hostname በኩል የርቀት MCP ሰርቨሩን ለመድረስ ይህ ብቸኛው መንገድ ነው።

```bash
# የmanage ወሰን ይስጡ፦ የዳሽቦርዱን API Keys ገጽ ከፍተው
# በቁልፉ ላይ "Management Access"ን ያብሩ፣ ወይም ሲፈጥሩ POST scopes:["manage"] ያድርጉ።

# ከዚያ ከርቀት MCP ደንበኛ ይገናኙ፦
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

የ`manage` ወሰን የሌለው ቁልፍ (ወይም Bearer አለመኖር) `403 LOCAL_ONLY`ን ይመልሳል። ጎን ለጎን ያለው ቅድመ ቅጥያ `/api/cli-tools/runtime/*` ሆን ተብሎ ሊታለፍ የማይችል ነው—[የRoute Guard ደረጃዎች — የ`manage` ወሰን ልዩ ሁኔታ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)ን ይመልከቱ።

### የOrigin ማረጋገጫ

ከማረጋገጫ በኋላ ወደ `/api/mcp/*` የሚላክ እያንዳንዱ ጥያቄ — ትራንስፖርቶቹ እና እንደ `status`, `tools`, `audit`, `restart` ያሉ የአስተዳደር መስመሮች — ጠሪው ማንም ይሁን (API ቁልፍ፣ የCLI ቶከን፣ የዳሽቦርድ ክፍለ ጊዜ ወይም መግቢያ ሲጠፋ ስም-አልባ loopback) የ`Origin` ራስጌው ይረጋገጣል። ይህ MCP Streamable HTTP ዝርዝር መግለጫ የሚጠይቀው የDNS rebinding ጥበቃ ነው።

- **የ`Origin` ራስጌ የለም** → ይፈቀዳል። OmniRoute CLI፣ SDK እና የIDE ደንበኞች አይልኩትም።
- **የተፈቀደ `Origin`** → በማንኛውም ወደብ ላይ `localhost` / `127.0.0.1` / `[::1]`፣ ወይም የOmniRoute የራሱ ይፋዊ origin፦ `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`፣ በታመነ reverse proxy የተላለፈ origin (`OMNIROUTE_TRUST_PROXY`፣ base URL ካልተዘጋጀ ብቻ)፣ ወይም በቀጥታ የሚደረስ loopback/LAN IP አስተናጋጅ። የ`Host` ራስጌ ብቻውን አንድን origin በጭራሽ የታመነ አያደርግም።
- **`null`ን ጨምሮ ማንኛውም ሌላ `Origin`** → ከJSON-RPC የስህተት አካል ጋር `403`፦ `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`። ትክክለኛ የCSRF ቶከን የሚያቀርብ የዳሽቦርድ ክፍለ ጊዜ፣ እንደሌሎች የዳሽቦርድ ጽሑፎች ሁሉ፣ አሁንም ተቀባይነት አለው።

ከreverse proxy ጀርባ የሚቀርብ የአሳሽ MCP ደንበኛ `OMNIROUTE_PUBLIC_BASE_URL` ያስፈልገዋል፤ ለሌሎች origins የፍቃድ ዝርዝር የለም። የCORS ቅድመ ጥያቄ (`OPTIONS`) ለOrigin አይፈተሽም፤ የሚከተለው ጥያቄ ግን ይፈተሻል።

## IDE ውቅረት

ለClaude Desktop፣ Cursor፣ Cline እና ተኳኋኝ MCP ደንበኞች ማዋቀሪያ [MCP ደንበኛ ውቅረት](../guides/SETUP_GUIDE.md#mcp-client-configuration)ን ይመልከቱ።

---

## አስፈላጊ መሣሪያዎች (14) — ደረጃ 1

| መሣሪያ                            | የፈቃድ ወሰኖች             | መግለጫ                                                                                                              |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | የሥራ ጊዜ፣ ማህደረ ትውስታ፣ የወረዳ ማቋረጫዎች፣ የፍጥነት ገደቦች፣ የመሸጎጫ ስታቲስቲክስ                                                         |
| `omniroute_list_combos`         | `read:combos`         | ሁሉም የተዋቀሩ combos ከስልቶቻቸው ጋር (አማራጭ መለኪያዎች)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | ለአንድ የተወሰነ combo የአፈጻጸም መለኪያዎች                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | comboን ማንቃት ወይም ማቦዘን                                                                                              |
| `omniroute_create_combo`        | `write:combos`        | ነባሩን combo API በመጠቀም የተረጋገጠ combo መፍጠር                                                                            |
| `omniroute_check_quota`         | `read:quota`          | ጥቅም ላይ የዋለ/ጠቅላላ ኮታ፣ የቀረው መቶኛ፣ የዳግም ማስጀመሪያ ጊዜ፣ የቶከን ጤንነት                                                           |
| `omniroute_route_request`       | `execute:completions` | የውይይት ማጠናቀቂያ ጥያቄን በOmniRoute ማዘዋወሪያ በኩል መላክ                                                                       |
| `omniroute_cost_report`         | `read:usage`          | በጊዜ ወቅት (ክፍለ ጊዜ/ቀን/ሳምንት/ወር) የተከፋፈለ የወጪ ሪፖርት                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | ችሎታዎችን፣ ሁኔታን እና ዋጋን ያካተተ ሙሉ የሞዴል ካታሎግ                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | በአካባቢው ያለ የተፈረመ Radar ካታሎግ፤ አማራጭ የአቅራቢ/ቤተሰብ ማጣሪያዎች                                                                |
| `omniroute_tool_search`         | `read:tools`          | ከተመዘገበው MCP ካታሎግ መሣሪያዎችን ማግኘት                                                                                     |
| `omniroute_web_search`          | `execute:search`      | በተዋቀሩ የፍለጋ አቅራቢዎች በኩል ድርን መፈለግ። X/Twitterን አያካትትም።                                                                |
| `omniroute_x_search`            | `execute:search`      | Xን በxAI/SuperGrok በኩል መፈለግ፣ ወይም የXquik API ውጤቶችን ለማግኘት `xquik-search`ን መምረጥ። ለተመረጠው backend የመግቢያ ማረጋገጫዎች ያስፈልጋሉ። |
| `omniroute_web_fetch`           | `execute:search`      | በተዋቀሩ የይዘት ሰርስሮ ማምጫ አቅራቢዎች በኩል የድር ይዘትን ማምጣት                                                                      |

## የላቁ መሣሪያዎች (11) — ደረጃ 2

| መሣሪያ                               | የፈቃድ ወሰኖች                            | መግለጫ                                                                                    |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ከአማራጭ የመውደቂያ ዛፍ ጋር ትዕዛዞችን ሳያስፈጽም የማዞሪያ ማስመሰል                                            |
| `omniroute_set_budget_guard`       | `write:budget`                       | የክፍለ ጊዜ በጀት ከ degrade/block/alert እርምጃ ጋር                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | በሂደት ጊዜ የጥምረት ስልትን ያዘምኑ (priority/weighted/auto/etc.)                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` የመቋቋም ችሎታ ቅድመ-ቅንብርን ይተግብሩ                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | እውነተኛ upstream ጥሪን በመጠቀም በአንድ ጥምረት ውስጥ ያለውን እያንዳንዱን አቅራቢ በቀጥታ ይፈትሹ                      |
| `omniroute_get_provider_metrics`   | `read:health`                        | ለእያንዳንዱ አቅራቢ p50/p95/p99 መዘግየትን እና የወረዳ ሰባሪ ሁኔታን የሚያካትቱ መለኪያዎች                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ከበጀት/መዘግየት ገደቦች ጋር በተግባር ዓይነት መሠረት ጥምረትን ይምከሩ                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | አንድ ጥያቄ ለአቅራቢ ለምን እንደተዘዋወረ ያብራሩ (የውጤት አሰጣጥ ምክንያቶች + አማራጭ የመውደቂያ መንገዶች)                  |
| `omniroute_get_session_snapshot`   | `read:usage`                         | ሙሉ የክፍለ ጊዜ ቅጽበታዊ እይታ፦ ወጪ፣ ቶከኖች፣ ዋና ሞዴሎች/አቅራቢዎች፣ ስህተቶች፣ የበጀት ጠባቂ                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | እንደ የተበላሹ የጥምረት ማጣቀሻዎች / ወላጅ አልባ ረድፎች ያሉ የውሂብ ጎታ መዛባቶችን ይመርምሩ (እና እንደ አማራጭ በራስ-ሰር ይጠግኑ) |
| `omniroute_sync_pricing`           | `pricing:write`                      | የዋጋ ውሂብን ከውጫዊ ምንጮች (LiteLLM) ያመሳስሉ፤ `dryRun`ን ይደግፋል                                     |

## የመሸጎጫ መሣሪያዎች (2)

| መሣሪያ                    | የፈቃድ ወሰኖች     | መግለጫ                                           |
| :---------------------- | :------------ | :--------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | የትርጉማዊ መሸጎጫ፣ የጥያቄ መሸጎጫ እና የidempotency ስታቲስቲክስ |
| `omniroute_cache_flush` | `write:cache` | መሸጎጫን በአጠቃላይ ወይም በፊርማ/ሞዴል ያጽዱ                  |

## የማመቂያ መሳሪያዎች (13)

| መሳሪያ                                | ወሰኖች                | መግለጫ                                                                                                |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | የማመቂያ ቅንጅቶች፣ የትንታኔ ማጠቃለያ እና መሸጎጫ የሚያውቁ ስታቲስቲክስ ( `analytics.mcpDescriptionCompression` ሜታዳታን ያካትታል) |
| `omniroute_compression_configure`   | `write:compression` | የማመቅ ሁነታን አዋቅር፣ ደፍ፣ ዒላማ ሬሾ፣ በስርአት ፈጣን ጥበቃ፣ MCP መግለጫ የማመቅ መቀያየር                                      |
| `omniroute_set_compression_engine`  | `write:compression` | የነቃውን ሞተር (off/caveman/rtk/stacked) እና Caveman/RTK ጥንካሬን ይምረጡ                                       |
| `omniroute_list_compression_combos` | `read:compression`  | የተሰየሙ የማመቂያ ጥንብሮች እና የሞተር ቧንቧ መስመሮቻቸው ይዘርዝሩ                                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | ትንታኔዎች በማመቅ ጥምር እና ሞተር ተመድበው                                                                        |
| `omniroute_ccr_store`               | `write:compression` | የደዋይ-ነጠላ ይዘትን በተከለከለው የማህደረ ትውስታ CCR መደብር ውስጥ ያከማቹ እና ምልክት ማድረጊያ እና የ `ccr://` ማጣቀሻ ይመልሱ            |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR ይዘትን ሙሉ በሙሉ ወይም በጭንቅላት፣ ጅራት፣ መስመሮች፣ grep እና ስታቲስቲክስ ሁነታዎች ያውጡ                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | ይዘትን ሳይመልሱ የደዋይ ባለቤትነት ያለው CCR ሜታዳታ ይፈትሹ                                                            |
| `omniroute_ccr_list`                | `read:compression`  | በጠዋቂ ባለቤትነት የተያዙ CCR ብሎኮች ፔጃኒዝድ ሜታዳታ ይዘርዝሩ                                                          |
| `omniroute_ccr_delete`              | `write:compression` | የደዋይ ባለቤት የሆነ CCR ብሎክን ሰርዝ                                                                          |
| `omniroute_ccr_stats`               | `read:compression`  | የደዋይ-ወሰን የማህደረ ትውስታ አጠቃቀምን፣ የህይወት ዑደት ቆጣሪዎችን እና የማከማቻ ገደቦችን ሪፖርት ያድርጉ                               |
| `omniroute_rtk_discover`            | `read:compression`  | መርጦ መግባት RTK ውፅዓት ናሙናዎች ውስጥ ተደጋጋሚ ጫጫታ ያግኙ                                                           |
| `omniroute_rtk_learn`               | `read:compression`  | ከመርጦ መግቢያ ናሙናዎች ሊገመገም የሚችል RTK ማጣሪያ ረቂቅ ይፍጠሩ                                                        |

CCR ግቤቶች ባለ ሁለት ደረጃ ሱቅ ይጠቀማሉ፡ ሙቅ ውስጠ-ማህደረ ትውስታ ደረጃ የሚደገፍ፣ በአካባቢው ደመና ባልሆኑ የሩጫ ጊዜዎች፣ በረጅም SQLite ደረጃ (`ccr_blocks`፣ በነባሪ) ስለዚህ አንድ ብሎክ ከመባረር ወይም እንደገና እስኪጀምር TTL እስኪያልቅ ድረስ — ከ512 KB እና የደመና ሩጫ ጊዜዎች በስተቀር፣ በማስታወስ የሚቆይ። እያንዳንዱ ብሎክ በ2 MiB፣እያንዳንዱ ርእሰመምህር እስከ 16 MiB እና የአለምአቀፍ መደብር በ64 MiB የተገደበ ነው። ግቤቶች ለ24-ሰዓት TTL ነባሪ (ቢበዛ ሰባት ቀናት)። ሙሉ MCP መልሶ ማግኘት በ 256 KiB የተገደበ ነው; ትላልቅ ብሎኮች በክልል እና በግሬፕ ሁነታዎች ይገኛሉ። ማከማቻ፣ ሰርስሮ ማውጣት፣ መዘርዘር፣ ፍተሻ፣ መሰረዝ እና ስታቲስቲክስ በተረጋገጠው የኤፒአይ-ቁልፍ ርእሰ መምህር ተለይተዋል። የኦዲት መዝገቦች ሃሽ እና መጠን ሜታዳታ ይይዛሉ፣ በጭራሽ ይዘት የላቸውም። ኦፕሬተር ፊት ለፊት የተቀመጡ ዝርዝሮች (ሁለቱ ማርከሮች፣ የደንበኛ ቅድመ ሁኔታዎች፣ `codemode:false`፣ በመሳሪያ ስፔሻሊስቶች፣ ፔጅኒሽኖች እና የምርመራ ማትሪክስ) በ [Compression Engines → ቅድመ ተፈላጊዎች/ኦፕሬተር መመሪያ](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup) ውስጥ ይኖራሉ።

`omniroute_compression_status` MCP መግለጫ መጭመቅን በ `analytics.mcpDescriptionCompression` ስር ዘግቧል። እነዚያ እሴቶች ለ MCP ሊዘረዘሩ የሚችሉ መግለጫዎች (`tools`, `prompts`, `resources` እና `resourceTemplates`) የሜታዳታ መጠን ግምቶች ናቸው; የአቅራቢዎች መጠቀሚያ ደረሰኞች አይደሉም እና በ `source: "mcp_metadata_estimate"` ምልክት የተደረገባቸው ናቸው.

### MCP ተደራሽነት ዛፍ ማጣሪያ (v3.8.0)

ከላይ ካሉት የማመቂያ መሳሪያዎች የተለየ፣ OmniRoute ከአፈፃፀም በኋላ የሚጨመቅ ማጣሪያን ያካትታል** የመሳሪያ ውጤቶች** የ MCP browser/accessibility መሳሪያዎች ወደ ተወካዩ ከመመለሳቸው በፊት. ይህ ማጣሪያ ራሱ — መሳሪያ አይደለም የቃል ተደራሽነት-ዛፍ ወይም የአሳሽ ቅጽበታዊ ጽሑፍ (≥ 2000 chars) በያዘ በማንኛውም መሳሪያ ውጤት ላይ በግልፅ ይሰራል።

ቁልፍ ባህሪዎች

- ≥ 30 ተከታታይ ተደጋጋሚ ወንድም እህት መስመሮችን ወደ ራስ + ጅራት ማጠቃለያ ሰብስብ
- በ Playwright/computer-use የሚፈለጉ `[ref=eXX]` መልህቆችን ይጠብቃል።
- ጠንካራ-መጠን ያለ ጽሑፍ (> 50,000 chars) ከአሰሳ ፍንጭ ጋር ይቆርጣል
- የሚጠበቁ ቁጠባዎች፡-** 60-80%** በአሳሽ ቅጽበተ-ፎቶ ጭነት ላይ

ውቅር `compression.mcpAccessibility` በአለምአቀፍ መቼቶች (ፍልሰት 056)። ትግበራ `open-sse/services/compression/engines/mcpAccessibility/`. ሙሉ ሰነዶች [፡ የማመቂያ ሞተርስ — MCP ተደራሽነት ዛፍ ማጣሪያ](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter) ።

ከእነዚህ መሳሪያዎች በስተጀርባ ላለው የአሂድ ጊዜ መጭመቂያ ሞዴል [Compression Engines](../compression/COMPRESSION_ENGINES.md) እና [RTK Compression](../compression/RTK_COMPRESSION.md) ይመልከቱ።

## 1Proxy መሳሪያዎች (3)

| መሳሪያ                        | ወሰኖች           | መግለጫ                                                                  |
| :-------------------------- | :------------- | :-------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | ነጻ proxy-ዎችን ከ1proxy የገበያ ቦታ ያምጡ (የፕሮቶኮል/አገር/ጥራት/ገደብ ማጣሪያዎች)          |
| `omniroute_oneproxy_rotate` | `read:proxies` | በስትራቴጂ (`random` / `quality` / `sequential`) መሠረት ቀጣዩን የሚገኝ proxy ያግኙ |
| `omniroute_oneproxy_stats`  | `read:proxies` | የpool ስታቲስቲክስ፣ የማመሳሰል ሁኔታ፣ እና በፕሮቶኮልና በአገር የተከፋፈለ ስርጭት                |

## የማስታወሻ መሳሪያዎች (3)

በ`open-sse/mcp-server/tools/memoryTools.ts` ውስጥ ተገልጸዋል። ማረጋገጫ/ወሰን በመደበኛው MCP የወሰን ሂደት በኩል ይተገበራል።

| መሳሪያ                      | ወሰኖች           | መግለጫ                                                                     |
| :------------------------ | :------------- | :----------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | የtoken በጀት ገደብን በማስከበር፣ ማስታወሻዎችን በጥያቄ / ዓይነት / API ቁልፍ ይፈልጉ              |
| `omniroute_memory_add`    | `write:memory` | አዲስ የማስታወሻ ግቤት ያክሉ (`factual` / `episodic` / `procedural` / `semantic`)  |
| `omniroute_memory_clear`  | `write:memory` | ለአንድ API ቁልፍ ማስታወሻዎችን ያጽዱ፤ እንደ አማራጭ በዓይነት ወይም በ`olderThan` timestamp ይጣሩ |

## የክህሎት መሳሪያዎች (4)

በ`open-sse/mcp-server/tools/skillTools.ts` ውስጥ ተገልጸዋል። በ`src/lib/skills/registry` + `src/lib/skills/executor` የተደገፉ ናቸው።

| መሳሪያ                          | ወሰኖች             | መግለጫ                                                          |
| :---------------------------- | :--------------- | :------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | የተመዘገቡ ክህሎቶችን በAPI ቁልፍ፣ በስም ወይም በነቃ/የቦዘነ ሁኔታ በአማራጭ በማጣራት ዘርዝሩ |
| `omniroute_skills_enable`     | `write:skills`   | አንድን የተወሰነ ክህሎት በID ያንቁ ወይም ያሰናክሉ                             |
| `omniroute_skills_execute`    | `execute:skills` | ክህሎትን በቀረበው ግቤት ያስፈጽሙ እና የአፈጻጸም መዝገቡን ይመልሱ                    |
| `omniroute_skills_executions` | `read:skills`    | የቅርብ ጊዜ የክህሎት አፈጻጸም ታሪክን ዘርዝሩ                                 |

## የNotion አውድ ምንጭ (6)

በ`open-sse/mcp-server/tools/notionTools.ts` ውስጥ ተገልጸዋል። Token በ`src/lib/db/notion.ts` በኩል በ`key_value` ሰንጠረዥ ውስጥ ይከማቻል። REST client በ`src/lib/notion/api.ts` ውስጥ ነው። የቅንብሮች API በ`src/app/api/settings/notion/route.ts` ውስጥ ነው። የdashboard UI በ`src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` ውስጥ ነው።

የNotion ውህደት tokenዎን በEndpoint dashboard ውስጥ ካለው **የአውድ ምንጮች** ትር ወይም በREST API በኩል ያዋቅሩ፦

```bash
# Token ያዘጋጁ
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# ሁኔታውን ያረጋግጡ
curl http://localhost:20128/api/settings/notion

# ግንኙነቱን ያቋርጡ
curl -X DELETE http://localhost:20128/api/settings/notion
```

| መሳሪያ                         | ወሰኖች           | መግለጫ                                                  |
| :--------------------------- | :------------- | :---------------------------------------------------- |
| `notion_search`              | `read:notion`  | በሁሉም ገጾችና databases ውስጥ የሙሉ ጽሑፍ ፍለጋ ያድርጉ              |
| `notion_get_page`            | `read:notion`  | አንድን ገጽ ከባህሪያቱ ጋር በID ያግኙ                             |
| `notion_list_block_children` | `read:notion`  | የአንድ ገጽ ወይም block ልጅ blocks ዘርዝሩ                      |
| `notion_query_database`      | `read:notion`  | databaseን በማጣሪያዎች፣ በቅደም ተከተሎች እና በገጽ ክፍፍል ይጠይቁ        |
| `notion_get_database`        | `read:notion`  | የdatabase schemaን በID ያግኙ                             |
| `notion_append_blocks`       | `write:notion` | ወደ parent block ልጅ blocks ያክሉ (በእያንዳንዱ ጥያቄ ከፍተኛው 100) |

## የወኪል ክህሎት ካታሎግ መሣሪያዎች (3)

በ`open-sse/mcp-server/tools/agentSkillTools.ts` ውስጥ ተገልጸዋል። በ`src/lib/agentSkills/catalog` የተደገፉ ናቸው። እነዚህ መሣሪያዎች 45 ግቤቶች ያሉትን የወኪል ክህሎቶች ሰነድ ካታሎግ ለMCP ደንበኞችና ለውጫዊ ወኪሎች ያቀርባሉ። ወሰን፦ `read:catalog`።

| መሣሪያ                              | ወሰኖች           | መግለጫ                                                                                                    |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | ሁሉንም 45 የወኪል ክህሎቶች በአማራጭ `category` (api\|cli) እና `area` ማጣሪያዎች ይዘርዝራል፤ ሜታዳታ + ሽፋን ይመልሳል                |
| `omniroute_agent_skills_get`      | `read:catalog` | አንድን ክህሎት በቀኖናዊ `id` በመጠቀም ሙሉ ሜታዳታውን + የSKILL.md ይዘቱን ያገኛል                                              |
| `omniroute_agent_skills_coverage` | `read:catalog` | የሽፋን ስታቲስቲክስ፦ ከካታሎጉ ድምር ጋር ሲነጻጸር ከ23 API፣ 21 CLI እና 1 ውቅር ክህሎቶች ምን ያህሎቹ በፋይል ስርዓቱ ላይ SKILL.md ፋይሎች አሏቸው |

ሙሉውን ካታሎግ እና ውጫዊ ወኪሎች እንዴት እንደሚጠቀሙበት ለማየት [AGENT-SKILLS.md](./AGENT-SKILLS.md)ን ይመልከቱ።

## ተዛማጅ ማዕቀፎች (v3.8.0)

ከላይ ያለው የMCP መሣሪያ ዝርዝር (110 ልዩ መሣሪያዎች፣ በ`countUniqueMcpTools()` የተሰሉ) ሆን ተብሎ
በአሂድ ጊዜ ማስተላለፍ/መሸጎጫ/መጭመቅ/ማህደረ ትውስታ/ክህሎቶች/ወኪል አገልጋይ/የአውድ-ምንጭ ክዋኔዎች ላይ የተወሰነ ነው። ሁለት አጎራባች
ማዕቀፎች ከMCP አገልጋዩ ጎን ለጎን በv3.8.0 ውስጥ ይቀርባሉ፣ እና ለየብቻ ተሰንደዋል፦

### የደመና ወኪሎች

የደመና ወኪሎች ከሂደቱ ውጭ የሚሰሩ የAI ኮድ ማዘጋጃ ወኪሎች (codex-cloud, cursor-cloud, devin, jules) ሲሆኑ፣ ለLLM አቅራቢዎች ጥቅም ላይ በሚውለው
ተመሳሳይ የግንኙነት ሞዴል በኩል ከOmniRoute ጋር ተያይዘዋል። በራሳቸው
የREST በይነገጽ (`/api/v1/agents/*`) በኩል ይቀርባሉ፣ እና የMCP መሣሪያ ካታሎግ አካል **አይደሉም**
— የደመና ወኪልን መጥራት የMCP ወሰን አይጠቀምም።

- አተገባበር፦ `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)።
- የሕይወት ዑደት፦ `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`።
- ሰነድ፦ [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)።

### መከላከያዎች

መከላከያዎች በውይይት ሂደቱ ውስጥ የሚተገበሩ ከአፈጻጸም በፊት/በኋላ ማጣሪያዎች (vision-bridge, pii-masker, prompt-injection)
ናቸው። የMCP መሣሪያ/መስመር ንብርብር ከመደረሱ በፊት ይሰራሉ፣
እና የተዋቀሩ ጥሰቶችን ወደ ኦዲት ሂደቱ ይልካሉ፤ እንደ MCP መሣሪያዎች አይጠሩም።

- አተገባበር፦ `src/lib/guardrails/`።
- ሰነድ፦ [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)።

የታገደ የሚመስልን የMCP ጥሪ ሲያርሙ፣ ሁለቱንም የMCP ኦዲት ምዝግብ
(`scope_denied:*` ግቤቶች) እና የመከላከያዎች ኦዲት መከታተያ ይፈትሹ — ጥያቄው
የMCP ወሰን ማስፈጸሚያ ንብርብርን ከመድረሱ **በፊት** በመከላከያ ሊቀበል አይችልም።

---

## የREST API የመጨረሻ ነጥቦች

| የመጨረሻ ነጥብ              | ዘዴ                    | መግለጫ                                                                                             | ማረጋገጫ                  |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------- | :--------------------- |
| `/api/mcp/status`      | `GET`                 | የአገልጋይ ሁኔታ፦ የልብ ምት፣ የHTTP ማጓጓዣ ሁኔታ፣ የኦዲት እንቅስቃሴ ማጠቃለያ                                            | አስተዳደር (ክፍለ ጊዜ/አስተዳዳሪ) |
| `/api/mcp/tools`       | `GET`                 | የመሣሪያ ካታሎግ (ስም፣ መግለጫ፣ ወሰኖች፣ ደረጃ፣ የምንጭ የመጨረሻ ነጥቦች)                                                | አስተዳደር                 |
| `/api/mcp/sse`         | `GET` / `POST`        | የSSE ማጓጓዣ የመጨረሻ ነጥብ (በ`mcpEnabled` + `mcpTransport === "sse"` የተገደበ)                             | የAPI ቁልፍ + ወሰኖች        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ሊለቀቅ የሚችል የHTTP ማጓጓዣ (`mcp-session-id` ራስጌን ይጠቀማል፤ `DELETE` ክፍለ ጊዜውን ያበቃል)                       | የAPI ቁልፍ + ወሰኖች        |
| `/api/mcp/audit`       | `GET`                 | ከ`mcp_tool_audit` የሚመጡ የኦዲት ምዝግብ ግቤቶች (ማጣሪያዎች፦ `limit`, `offset`, `tool`, `success`, `apiKeyId`) | አስተዳደር                 |
| `/api/mcp/audit/stats` | `GET`                 | የተዋሃዱ የኦዲት ስታቲስቲክስ (`totalCalls`, `successRate`, `avgDurationMs`, በብዛት ጥቅም ላይ የዋሉ መሣሪያዎች)        | አስተዳደር                 |

የምንጭ ፋይሎች፦ `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`።

MCP አገልጋዩ በቅንብሮች (`mcpEnabled`) ውስጥ እስኪነቃ እና ተገቢው `mcpTransport` እስኪመረጥ ድረስ ሁለቱም SSE እና ሊለቀቅ የሚችል HTTP ማጓጓዣዎች ታግደው ይቆያሉ። የተሳሳተው ማጓጓዣ ከተዋቀረ፣ መስመሩ ቅንብሮችን እንዲቀይሩ ከሚጠቁም ፍንጭ ጋር HTTP 400 ይመልሳል።

---

## ማረጋገጫ እና ወሰን

MCP መሣሪያ ጥሪዎች ከደዋዩ የወሰን ሕብረቁምፊዎችን ያንብቡ። ያ ቼክ ከሦስቱ ገለልተኛ የስም ቦታዎች አንዱ ነው። ከአንዱ ፈታሽ ማለፍ ከሌሎቹ ማለፍ አይደለም። ደንቦቹ [ሶስት ወሰን የስም ቦታዎች](#three-scope-namespaces) ናቸው. የመሳሪያው ካታሎግ [MCP የመሳሪያ ወሰን](#mcp-tool-scopes) ነው።

### ሶስት ወሰን የስም ቦታዎች

`manage` በ API ቁልፍ፣ `read:compression` በ MCP መሳሪያ ላይ፣ እና `read` በ `oma_live_…` መዳረሻ ቶከን ላይ ሶስት የተለያዩ ድጋፎች ናቸው። የ `read` መዳረሻ ማስመሰያ ወደ ሚውቴሽን የአስተዳደር መንገድ የላኩ ደዋዮች HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` ያገኛሉ ያ ደረጃ `scopeSatisfies` ነው። የ MCP ጠረጴዛን አያማክርም, እና MCP ተዛማጅ አያማክረውም.

| የስም ቦታ          | ምስክርነት                                                              | አረጋጋጭ            | ማለፊያ ይፈቅዳል                                |
| :-------------- | :------------------------------------------------------------------ | :--------------- | :---------------------------------------- |
| ኤፒአይ-ቁልፍ አስተዳደር | `api_keys.scopes`                                                   | `hasManageScope` | ለዛ ተሸካሚ ቁልፍ አስተዳደር REST                   |
| ኤፒአይ-ቁልፍ ተጨማሪ   | ተመሳሳይ ድርድር ፣ አንድ ትክክለኛ ሕብረቁምፊ                                       | ከታች የተጠቀሰው ረዳት   | አንድ ችሎታ ብቻ                                |
| MCP የመሳሪያ ወሰኖች  | ተመሳሳይ ድርድር፣ ሌላ MCP `_meta` (HTTP/SSE ብቻ)፣ ሌላ `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | ያ መሳሪያ፣ አንዴ ማስፈጸሚያ ከበራ                    |
| የመዳረሻ ማስመሰያ     | `oma_live_…`                                                        | `scopeSatisfies` | ዘዴው እና መንገዱ ያንን ደረጃ የሚያስፈልገው የአስተዳደር መንገድ |

እያንዳንዱን የምስክር ወረቀት ማውጣት [በአስተዳደር ማረጋገጫ](../guides/MANAGEMENT-AUTH.md) ውስጥ ተሸፍኗል።

#### የኤፒአይ-ቁልፍ ወሰኖች

አንድ `api_keys.scopes` ድርድር ሁለት ስራዎችን ይመገባል። የተለያዩ ተግባራትን ይጠቀማሉ.

**አስተዳደር REST.** `manage` እና `admin` የ `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) አባላት ናቸው። `hasManageScope` ለዚያ ቁልፍ የአስተዳደር መንገዶችን የፈቀደው ነው። `admin` በእነዚያ መንገዶች ላይ ማስተዳደር የሚችል ነው። እዚህ ላይ `admin` የሚለው ቃል የመዳረሻ-ቶከን ደረጃ አይደለም እና ወደ MCP መሣሪያ ወሰን አይስፋፋም።

**ተጨማሪ ሕብረቁምፊዎች.** እያንዳንዱ ትክክለኛ የአባልነት ፈተና ነው፣ እና እያንዳንዱ ከ `MANAGEMENT_API_KEY_SCOPES` ውጭ ይቆያል።

| ወሰን                            | ማለፊያ ይፈቅዳል                                                                                                                                             |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | ሉፕባክ ያልሆነው `/api/mcp/` LOCAL_ONLY የተቀረጸው ብቻ (`hasMcpConnectOrManageScope`)። `manage` ወይም `admin` ያለው ቁልፍ አሁንም ያንን ቀረጻ ያልፋል።                            |
| `self:usage`                   | `GET /api/v1/me/status` ለዚህ ቁልፍ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` ይህንን ወሰን በፍጠር (`normalizeSelfServiceScopesForCreate`) ላይ ያክላል። |
| `self:account-quota`           | በዚያ የሁኔታ ክፍያ (`src/lib/usage/apiKeySelfService.ts`) ውስጥ ያሉ የወራጅ መለያ ኮታዎች። የሁኔታ መንገዱ አሁንም `self:usage` ያስፈልገዋል።                                         |
| `policy:bypass-provider-quota` | የዚህ ቁልፍ ፍንጭ ጥሪዎች የአቅራቢ-ኮታ ፖሊሲን ዝለል (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`)።                                                      |

#### ማዛመድ

ካታሎግ በ [MCP የመሳሪያ](#mcp-tool-scopes) ወሰን ስር ያለው ሰንጠረዥ ነው። በ `src/shared/constants/mcpScopes.ts` ውስጥ `MCP_SCOPE_LIST` እንደዚያ ካታሎግ አትያዙ፡ ዋናው የተተየበው ንዑስ ስብስብ ነው። በኋላ መሳሪያዎች ከጎኑ ያሉትን ተጨማሪ ወሰኖች ያውጃሉ (`read:notion`፣ `read:skills`፣ `read:local-corpus` እና የቀረው የሰንጠረዡ ክፍል)።

`evaluateToolScopes` በ `open-sse/mcp-server/scopeEnforcement.ts` ውስጥ እያንዳንዱ አስፈላጊ ወሰን ከተወሰነ ወሰን ጋር ሲዛመድ ጥሪን ይፈቅዳል።

- `*` ከእያንዳንዱ አስፈላጊ ወሰን ጋር ይዛመዳል።
- በ `*` የሚያልቅ የተሰጠ ወሰን ከኮከቡ በፊት ባለው ቅድመ ቅጥያ የሚጀምረው ከሚፈለገው ወሰን ጋር ይዛመዳል። `read:*` ግጥሚያዎች `read:compression`.
- እያንዳንዱ ሌላ የተፈቀደ ወሰን የሚዛመደው ከተፈለገው ሕብረቁምፊ ጋር ብቻ ነው።

ስፋቱ ዝቃ የሆነ ቁልፍ `["manage"]` ለ `read:compression` `scopeMatches` ። ተመሳሳይ ጥሪ ለ `admin`፣ `mcp:connect`፣ `read` እና `write` እነዚያ ብቸኛ የተሰጡ ሕብረቁምፊዎች ሲሆኑ አይሳካም። ከ `*` በላይ MCP መሣሪያ ወሰን መካከል ተዋረድ የለም።

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (ነባሪ `false`) ካልሆነ በስተቀር ማስፈጸሚያ ጠፍቷል። ጠፍቶ እያለ፣ `evaluateToolScopes` ጥሪውን ይፈቅዳል እና ካታሎጉን ይዘላል። በርቶ እያለ፣ HTTP የተሸካሚውን `api_keys.scopes` እንደ `authInfo` ይጠቀማል ( [የፐር-ቁልፍ HTTP ስፋት ማሰሪያን](#per-key-http-scope-binding-7895) ይመልከቱ)። ምንም የቁልፍ ወሰኖች ካልተፈቱ፣ የተሰጠው ስብስብ ወደ MCP `_meta` (ለ HTTP/SSE ደዋዮች ብቻ የተከበረ፣ በ HTTP auth አውድ ውስጥ፣ የ stdio ደዋይ `_meta` ችላ ይባላል ደንበኛው ስለሚቆጣጠረው እና የደዋይ ማንነት ስለሌለው) ከዚያም `OMNIROUTE_MCP_SCOPES`.

#### የመዳረሻ-ቶከን ወሰኖች

`oma_live_…` tokens (`src/lib/accessTokens/scopes.ts`) `read`፣ `write` ወይም `admin` ያዙ። `scopeSatisfies` ደረጃ ነው `admin` `write` እና `read` ይሸፍናል እና `write` `read` ይሸፍናል። ያልታወቁ መጠኖች ምንም አይሸፍኑም።

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ያንን ደረጃ ከ `inferRequiredScope` (`src/server/authz/accessScopes.ts`) ጋር ያወዳድራል

- `GET`፣ `HEAD` እና `OPTIONS` `read` ያስፈልጋቸዋል።
- ማንኛውም ሌላ ዘዴ `write` ያስፈልገዋል.
- በ `ADMIN_SCOPE_PREFIXES` ውስጥ ያሉ መንገዶች ለእያንዳንዱ ዘዴ `admin` ያስፈልጋቸዋል። `/api/mcp` በዚያ ዝርዝር ውስጥ አለ፣ ስለዚህ የ `write` መዳረሻ ማስመሰያ አሁንም የ MCP HTTP ወለል መደወል አይችልም።
- በ `ADMIN_MUTATION_PREFIXES` ውስጥ ያሉ መንገዶች `admin` ለሚውቴሽን ብቻ ያስፈልጋቸዋል።
- በ `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`፣ `/api/settings/require-login`) ውስጥ ያሉ ዱካዎች `admin` ለሚውቴሽን ብቻ ይፈልጋሉ፣ እና በትክክለኛው መንገድ ላይ ብቻ — ሌሎች `/api/settings/*` ንዑስ-መስመሮች `write` ይጠብቃሉ።

`PATCH /api/keys/{id}` ሚውቴሽን ነው እና በእነዚያ የአስተዳዳሪ ዝርዝሮች ውስጥ የለም፣ ስለዚህ የ `read` ማስመሰያ 403 `Access token scope 'read' is insufficient; 'write' required.` A `write` ወይም `admin` የመዳረሻ ማስመሰያ ያንን መንገድ ያሟላል። ዳሽቦርድ JWT፣ loopback CLI machine-id token እና `manage` ወይም `admin` ያለው API ቁልፍ ሌሎች ቅርንጫፎችን ይወስዳሉ እና በዚህ ማዕረግ አይጠበቡም።

`scopeSatisfies` ለ `/api/mcp` የሚያልፍ የመዳረሻ ማስመሰያ የአስተዳደር በርን ብቻ አጽድቷል። የመሳሪያ ጥሪዎች አሁንም `scopeMatches` ከኤፒአይ-ቁልፍ ወሰኖች ጋር ያካሂዳሉ። የመዳረሻ-ቶከን ደረጃ ለ `scopeMatches` ግቤት አይደለም።

### MCP የመሳሪያ ወሰኖች

የወሰን ማስፈጸሚያ በ `open-sse/mcp-server/scopeEnforcement.ts` ውስጥ የተማከለ ነው። እያንዳንዱ መሣሪያ የተወሰኑ ልኬቶችን ይፈልጋል-

| ወሰን                   | መሳሪያዎች                                                                                                                                                                         |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                              |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                      |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                         |
| `read:quota`          | `check_quota`                                                                                                                                                                  |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                         |
| `read:models`         | `list_models_catalog`                                                                                                                                                          |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                  |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                          |
| `write:budget`        | `set_budget_guard`                                                                                                                                                             |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                    |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                 |
| `read:cache`          | `cache_stats`                                                                                                                                                                  |
| `write:cache`         | `cache_flush`                                                                                                                                                                  |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                     |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                              |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                          |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                               |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                         |
| `read:memory`         | `memory_search`                                                                                                                                                                |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                   |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                             |
| `write:skills`        | `skills_enable`                                                                                                                                                                |
| `execute:skills`      | `skills_execute`                                                                                                                                                               |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                               |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                        |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                      |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                               |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                 |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                             |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                |
| `read:obsidian`       | 13 መሳሪያዎችን ያንብቡ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 መሳሪያዎችን ፃፍ — `obsidian_write_note`፣ `obsidian_append_note`፣ `obsidian_patch_note`፣ `obsidian_move_note`፣ `obsidian_delete_note`፣ `obsidian_sync_trigger`፣…                   |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                              |

የ Wildcard ወሰን ይደገፋል `read:*` ሁሉንም የንባብ ወሰን ይሰጣል፣ `*` ሙሉ መዳረሻን ይሰጣል።

### `mcp:connect` — ጠባብ መንገድ ችሎታ (#7895)

ከloopback ወደ HTTP/SSE MCP ትራንስፖርት (`/api/mcp/*`) መድረስ `/api/mcp/` LOCAL_ONLY carve-out ያስፈልገዋል ( `docs/security/ROUTE_GUARD_TIERS.md` ይመልከቱ)። ከታሪክ አኳያ ያ ቀረጻ የተቀበለችው ሙሉ `manage`/`admin` -scope API key — ለጠሪው በጣም ሰፊ ነው MCP ማውራት ብቻ ያስፈልገዋል። `src/shared/constants/managementScopes.ts` አሁን ወደ ውጭ ይላካል `MCP_CONNECT_SCOPE = "mcp:connect"`: ተጨማሪ ጠባብ ወሰን ( `SELF_USAGE_SCOPE` ጋር ተመሳሳይ ነው) ONLY በ `src/server/authz/policies/management.ts` — ውስጥ የ `/api/mcp/` ማለፊያ ፍቃድ ሌላ የአስተዳደር-መንገድ መዳረሻ አይሰጥም እና ሆን ተብሎ OUT የ `MANAGEMENT_API_KEY_SCOPES` እንዲቆይ ይደረጋል። `manage`/`admin` የያዘ ቁልፍ አሁንም ቀረጻውን ሳይለወጥ ያልፋል። `mcp:connect` ለርቀት MCP-ብቻ ደዋዮች ዝቅተኛ መብት አማራጭ ነው፣ በ `hasMcpConnectOrManageScope()` የተረጋገጠ።

### HTTP ወሰን ማሰሪያ (#7895)

በ HTTP/SSE፣ `open-sse/mcp-server/httpTransport.ts` አሁን የደዋዩን ትክክለኛ `api_keys.scopes` በ `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) ፈትቶ ወደ MCP SDK `transport.handleRequest(req, { authInfo })` ያስተላልፋል፣ ስለዚህ `extra.authInfo.scopes` ለእያንዳንዱ የመሳሪያ ጥሪ መድረስ የተሸካሚውን ቁልፍ የራሱን ወሰን ያንፀባርቃል። `scopeEnforcement.ts`'s `resolveCallerScopeContext()` አስቀድሞ ለ `authInfo` ቅድሚያ ሰጥቷል `_meta` እና `OMNIROUTE_MCP_SCOPES` env fallback — ይህ የመጀመሪያውን፣ ከፍተኛ ቅድሚያ የሚሰጠውን ምንጭ ብቻ ይሞላል፣ ይህም ቀደም ሲል ከ HTTP በላይ ያልተመገበ ነው። ምንም API ቁልፍ ሲፈታ (ራስጌ የለም፣ ልክ ያልሆነ ቁልፍ) `authInfo` `undefined` ይቆያል እና መፍታት ወደ ነባሩ `meta`/env ሰንሰለት ያልተለወጠ ነው። stdio የጠሪው ማንነት የለውም ( `mcpCallerIdentity.ts` ይመልከቱ) እና በያንዳንዱ በቁልፍ ማሰሪያ — ያልተነካ ነው `_meta` እርምጃን ይዘላል (`_meta` የተከበረው በ HTTP auth አውድ ውስጥ ብቻ ነው፣ #15159) እና ከ `OMNIROUTE_MCP_SCOPES` env ቁልፍ ብቻውን ይፈታል።

**`OMNIROUTE_MCP_ENFORCE_SCOPES` ምንም ይሁን ምን ማስፈጸሚያ በጠባብ ወሰን ላሉ HTTP/SSE ጠሪዎች ይገደዳል።** `OMNIROUTE_MCP_ENFORCE_SCOPES` ወደ `false` ነባሪ ማድረግ ለ local/stdio ነጠላ ኦፕሬተር ፍሰት ብቻ ደህንነቱ የተጠበቀ ነው፣ ይህም የሚከለክለው የደዋይ ማንነት በሌለበት ነው። `open-sse/mcp-server/server.ts::withScopeEnforcement()` በአንድ መሣሪያ ወሰን ማስፈጸሚያ ያለ ምንም ቅድመ ሁኔታ (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) በማንኛውም ጊዜ `resolveCallerScopeContext()` ሲፈታ `source === "authInfo"` (ማለትም በያንዳንዱ ቁልፍ HTTP የፈቃድ ራስጌ፣ HTTP/SSE-only) AND ያ ቁልፍ ሙሉ `manage`/`admin` ወሰን አይይዝም። ይህ ክፍተቱን የሚዘጋው ከላይ የተመዘገበው ጠባብ `mcp:connect` ማለፊያ ወሰን ONLY ምንም ፍቃድ ሳይሰጥ ነው ግን `/api/mcp/` LOCAL_ONLY carve-out — አለበለዚያ አንድ ኦፕሬተር remote/non-loopback MCP መድረስን ካነቃቁ በኋላ እያንዳንዱን MCP መሳሪያ ሊጠራ አይችልም፣ምክንያቱም `OMNIROUTE_MCP_ENFORCE_SCOPES` በነባሪነት `false` ስለሚልክ — ። ሙሉ `manage`/`admin` ቁልፍ በ HTTP ላይ፣ እና እያንዳንዱ stdio/local ደዋይ፣ ያለውን `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated ባህሪ ሳይለወጥ ያቆዩት።

---

## የአካባቢ ተለዋዋጮች

| ተለዋዋጭ                                   | ነባሪ                         | ዓላማ                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`    | የMCP አገልጋዩ የOmniRoute ውስጣዊ APIዎችን ሲጠራ የሚጠቀምበት መሠረታዊ URL                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_API_KEY`                     | (ባዶ)                        | ወደ ውስጣዊ API ጥሪዎች እንደ `Authorization: Bearer` የሚተላለፍ API ቁልፍ                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` ብቻ ያነቃዋል) | ሲነቃ፣ የጎደሉ የፈቃድ ወሰኖች የመሣሪያ ጥሪዎችን ይከለክላሉ፣ እና `scope_denied:<reason>`ን በኦዲት ምዝግብ ውስጥ ይመዘግባሉ። ሙሉ የ`manage`/`admin` ፈቃድ ወሰን ከሌለው፣ ለእያንዳንዱ ቁልፍ ከተዘጋጀ የAuthorization ራስጌ (`source === "authInfo"`) ለሚለይ ማንኛውም የHTTP/SSE ጠሪ፣ የዚህ ጠቋሚ ዋጋ ምንም ይሁን ምን ማስፈጸሙ እንዲሁ በግድ ይነቃል — ለምሳሌ፣ ጠባቡን የ`mcp:connect` ማለፊያ የፈቃድ ወሰን ብቻ የያዘ ቁልፍ — ስለዚህ ይህ ነባሪ ለአካባቢያዊ/stdio የአንድ ኦፕሬተር ፍሰት ብቻ ደህንነቱ የተጠበቀ ነው፤ ለርቀት loopback ላልሆነ መዳረሻ ፈጽሞ አይደለም |
| `OMNIROUTE_MCP_SCOPES`                  | (ባዶ)                        | በነባሪነት «የሚገኙ» ተብለው የሚታሰቡ በኮማ የተለዩ የፈቃድ ወሰኖች ዝርዝር (ጠሪው የራሱን የፈቃድ ወሰኖች በማያቀርብበት ጊዜ ጥቅም ላይ ይውላል)                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ካልተዋቀረ = ነቅቷል)             | ወደ `0/false/off/no` ሲዋቀር፣ በምዝገባ ጊዜ የMCP መግለጫ መጭመቅን ያሰናክላል                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ካልተዋቀረ = ነቅቷል)             | ከላይ ላለው ተመሳሳይ መቀያየሪያ አማራጭ ቅጽል ስም                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                     | ለውስጣዊ የአስተዳደር ንባቦች (health፣ resilience፣ combos፣ quota፣ usage) የማቋረጫ ጊዜ በጀት                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                     | አቅራቢን ለሚጠብቁ ሽግግሮች (`route_request`፣ `web_search`፣ `web_fetch`) የማቋረጫ ጊዜ በጀት                                                                                                                                                                                                                                                                                                                                         |
| `MCP_TOOL_DENY`                         | (ካልተዋቀረ = ማጣሪያ የለም)         | ከ`tools/list` የሚወገዱ በኮማ የተለዩ የመሣሪያ ስሞች (የመሣሪያ ብዛት ቅነሳ — ከታች ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                  |
| `MCP_TOOL_ALLOW`                        | (ካልተዋቀረ = ማጣሪያ የለም)         | ብቻቸውን እንዲቆዩ በኮማ የተለያዩ የመሣሪያ ስሞች (የፍቀድ-ዝርዝር ሁነታ — ከታች ይመልከቱ)                                                                                                                                                                                                                                                                                                                                                         |
| `DATA_DIR`                              | `~/.omniroute`              | የልብ ምት ፋይሉ ወደ `${DATA_DIR}/runtime/mcp-heartbeat.json` ይጻፋል                                                                                                                                                                                                                                                                                                                                                         |

---

## የመግለጫ መጨመቅ

የMCP መሣሪያ፣ መጠየቂያ እና ሀብት መዝገቦች ለደንበኞች የሚቀርበውን የሜታዳታ መጠን (እና በዚህም የመጠየቂያ ዐውድ ወጪን) ለመቀነስ በምዝገባ/ዝርዝር ጊዜ መግለጫዎችን መጨመቅ ይችላሉ። አተገባበሩ በ`open-sse/mcp-server/descriptionCompressor.ts` ውስጥ ይገኛል፣ እንዲሁም በ`createMcpServer()` ውስጥ ባለው `compressMcpRegistryMetadata` በኩል ከMCP አገልጋዩ ጋር ተገናኝቷል።

- መጨመቁ መዋቅራዊ ይዘት እንዳይለወጥ የተጠበቁ ብሎኮችን (የኮድ ክፍሎች፣ በአጥር የተከበቡ ብሎኮች፣ ወዘተ) በማውጣት፣ የCaveman የደንብ ስብስብን (`getRulesForContext("all", "full")`) በመጠቀም በመግለጫ ጽሑፉ ላይ ይከናወናል።
- በ`key_value` ቅንብሮች ሰንጠረዥ ውስጥ ባለው `compression.mcpDescriptionCompressionEnabled` እሴት (ነባሪ፦ ነቅቷል) በኩል ለእያንዳንዱ ማሰማራት ይቀያይሩት — በUI ውስጥ እንደ **ትንታኔ → የMCP መግለጫ መጨመቅ** ቀርቧል።
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`ን ወይም `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`ን በመጠቀም በሂደቱ አጠቃላይ ይቀያይሩት።
- የቅጽበታዊ ጊዜ ስታቲስቲክስ በ`omniroute_compression_status` በኩል በ`analytics.mcpDescriptionCompression` ሥር ይቀርባሉ፣ እንዲሁም ከእውነተኛ የአቅራቢ አጠቃቀም ደረሰኞች ለመለየት `source: "mcp_metadata_estimate"` የሚል መለያ ይደረግባቸዋል።

---

## የመሣሪያዎች ብዛት መቀነስ (F4.3)

የመግለጫ ማመቅ የእያንዳንዱን መሣሪያ ሜታዳታ ይቀንሳል፤ **የመሣሪያዎች ብዛት መቀነስ** ደግሞ _ምን ያህል_ መሣሪያዎች እንደሚታወጁ በመቀነስ አንድ ደረጃ ወደፊት ይሄዳል። በ`tools/list` ማኒፌስት ውስጥ አነስተኛ መሣሪያዎችን ማሳወቅ የደንበኛው ሞዴል ለመሣሪያ ካታሎጉ በእያንዳንዱ ጥያቄ የሚከፍለውን የቶከን ወጪ ("layer 5" ማመቅ) ይቀንሳል። ትግበራው በ`open-sse/mcp-server/toolCardinality.ts` ውስጥ የሚገኝ ሙሉ በሙሉ ከሁኔታ ነጻ የሆነ ማጣሪያ (`reduceToolManifest`) ሲሆን፣ በ`createMcpServer()` (`open-sse/mcp-server/server.ts`) ውስጥ ካለው የምዝገባ ዑደት ጋር ተገናኝቷል።

**በፍላጎት የሚነቃ ሲሆን፣ በነባሪነት ጠፍቷል።** ማጣሪያው የሚሠራው ከሁለቱ የአካባቢ ተለዋዋጮች ቢያንስ አንዱ ሲዋቀር ብቻ ነው፤ ሁለቱም ካልተዋቀሩ፣ ሁሉም 110 መሣሪያዎች ያለምንም ለውጥ ይታወቃሉ።

| ተለዋዋጭ            | ሁነታ                                                         |
| :--------------- | :---------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ጥቁር ዝርዝር — በኮማ የተለዩ እና ሁልጊዜ ከ`tools/list` የሚወገዱ የመሣሪያ ስሞች   |
| `MCP_TOOL_ALLOW` | የፍቃድ ዝርዝር — በኮማ የተለዩ የመሣሪያ ስሞች፤ እነዚህ ብቻ ይቀራሉ፣ ሌሎቹ በሙሉ ይወገዳሉ |

`deny` ከ`allow` ቅድሚያ ይወስዳል። ስሞች በኮማ ይለያያሉ፣ ዙሪያቸው ያለው ባዶ ቦታ ይወገዳል፣ እና ባዶ ግቤቶች ችላ ይባላሉ። ምሳሌዎች፦

```bash
# ሁለት መሣሪያዎችን ከካታሎጉ አስወግድ
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# የማዞሪያ እና የኮታ መሣሪያዎችን ብቻ አሳውቅ (የፍቃድ ዝርዝር ሁነታ)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**የተጣሩ መሣሪያዎች የሚወገዱበት መንገድ፦** ምዝገባው ሁልጊዜ በተሳካ ሁኔታ ይጠናቀቃል፤ መገለጫው የማይቀበለው መሣሪያ ከዚያ በMCP SDK መያዣው ላይ `.disable()` ይደረጋል፣ ስለዚህ በ`tools/list` ውስጥ ፈጽሞ አይታይም፣ ነገር ግን ግንኙነቱ ሳይፈርስ ይቆያል (ንጹህ ማንቃት/ማሰናከል፣ ዳግም ምዝገባ የለም)። የመገለጫ ተንታኙ `readMcpToolProfileFromEnv(process.env)` ሲሆን፣ ሁለቱም ተለዋዋጮች ባዶ ሲሆኑ `null` (ምንም ማጣራት የለም) ይመልሳል።

ከ`reduceToolManifest` ጀርባ ያለው የበለጸገ `ToolProfile` ቅርጽ የወሰን-መገናኛ ማጣራትን (`allowScopes`፣ ከ`read:*`-ቅጥ የዱር ካርድ ማዛመድ ጋር) እና ተወስኖ የሚደገም `maxTools` ገደብንም ይደግፋል፤ ነገር ግን እነዚህ ሁለት ቅንብሮች በምዝገባ ጊዜ ሙሉውን ማኒፌስት የሚፈልጉ ሲሆን፣ በአሁኑ ጊዜ በአካባቢ ተለዋዋጮቹ በኩል **አልተጋለጡም** (የ`tools/list`-ደረጃ ማያያዣ ለወደፊት ክትትል የሚደረግበት ሥራ ነው)። `estimateManifestTokens()` ማኒፌስቱ ከመቀነሱ በፊትና በኋላ ያለውን የቶከን ወጪ ለማነጻጸር ይገኛል።

---

## የአሂድ ጊዜ የልብ ምት

የstdio ማጓጓዣው በየ5 ሰከንዱ የሕያውነት ሁኔታን በ`${DATA_DIR}/runtime/mcp-heartbeat.json` ያስቀምጣል። ዳሽቦርዱ (`/api/mcp/status`) `online`ን ለመወሰን ይህን ፋይል ከPID ሕያውነት ጋር ያነባል። የHTTP ማጓጓዣዎች በምትኩ ሁኔታን በሂደት ውስጥ ካለው `getMcpHttpStatus()` ያሳውቃሉ (ምንም የፋይል ጽሕፈት የለም)።

የልብ ምት ቅጽበታዊ ምስሉ የሚከተለውን ይይዛል፦

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

## የኦዲት ምዝግብ ማስቀመጥ

እያንዳንዱ የመሣሪያ ጥሪ በ`open-sse/mcp-server/audit.ts` አማካኝነት ወደSQLite `mcp_tool_audit` ሰንጠረዥ ይመዘገባል፦

- የመሣሪያ ስም፣ ነጋሪ እሴቶች (በእያንዳንዱ መሣሪያ `auditLevel` መሠረት ሃሽ የተደረጉ/የተቆረጡ)፣ ውጤት
- ቆይታ በms፣ የስኬት/ውድቀት ምልክት፣ የስህተት መልዕክት (ተፈጻሚ ሲሆን)
- የAPI ቁልፍ ሃሽ፣ የጊዜ ማህተም
- የወሰን ክልከላዎች ከጎደሉት ወሰኖች ዝርዝር ጋር እንደ`scope_denied:<reason>` ይመዘገባሉ

የቅርብ ጊዜ ጥሪዎችን ለመመርመር ዳሽቦርዱን ወይም የ`/api/mcp/audit` እና `/api/mcp/audit/stats` REST መዳረሻዎችን ይጠቀሙ።

---

## ፋይሎች

| ፋይል                                                                      | ዓላማ                                                      |
| :----------------------------------------------------------------------- | :------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | የMCP ሰርቨር ፋብሪካ፣ የstdio መግቢያ ነጥብ፣ በወሰን የተገደቡ የመሣሪያ ምዝገባዎች |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ማጓጓዣ (የክፍለ ጊዜ አስተዳደር)              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | የመሣሪያ ወሰን ግምገማ እና የጠሪ መለየት                               |
| `open-sse/mcp-server/audit.ts`                                           | የመሣሪያ ጥሪ ኦዲት ምዝግብ (`mcp_tool_audit`)                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | የstdio የልብ ምት ጸሐፊ (`mcp-heartbeat.json`)                 |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ለመሣሪያ / ጥያቄ / ሀብት መዝገቦች የመግለጫ ማመቂያ                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod መርሃግብሮች + የመሣሪያ መዝገብ (`MCP_TOOLS`፣ 45 ግቤቶች)          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | የደረጃ 2 + መሸጎጫ + 1proxy መሣሪያ ተቆጣጣሪዎች                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | የማመቂያ መሣሪያ ተቆጣጣሪዎች                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | የማህደረ ትውስታ መሣሪያ ትርጓሜዎች (3 መሣሪያዎች)                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | የክህሎት መሣሪያ ትርጓሜዎች (4 መሣሪያዎች)                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | የNotion አውድ ምንጭ መሣሪያ ትርጓሜዎች (6 መሣሪያዎች)                   |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | የጨዋታዊነት መሣሪያ ትርጓሜዎች (8 መሣሪያዎች)                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | የፕለጊን ምዝገባ እና አስተዳደር መሣሪያዎች (8 መሣሪያዎች)                   |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` መጨረሻ ነጥብ                               |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` መጨረሻ ነጥብ                                |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE የማጓጓዣ መስመር                            |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP የማጓጓዣ መስመር             |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` የኦዲት ምዝግብ መጠይቅ                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` የተጠቃለሉ የኦዲት መለኪያዎች                |
| `src/lib/notion/api.ts`                                                  | የNotion REST API ደንበኛ (ዳግም ሙከራ፣ የጊዜ ገደብ፣ የስህተት ምደባ)      |
| `src/lib/db/notion.ts`                                                   | የNotion ቶከን ቀጣይነት (`key_value` ሰንጠረዥ)                    |
| `src/app/api/settings/notion/route.ts`                                   | የNotion ቅንብሮች API (GET/POST/DELETE)                      |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | የNotion ቶከን አስተዳደር UI                                    |
| `tests/unit/notion-api.test.ts`                                          | የNotion API ደንበኛ ፈተናዎች (7)                               |
| `tests/unit/notion-tools.test.ts`                                        | የNotion መሣሪያዎች ወሰን ማስፈጸሚያ ፈተናዎች (10)                     |
| `tests/unit/db/notion.test.mjs`                                          | የNotion DB ሞጁል ፈተናዎች (3)                                 |
