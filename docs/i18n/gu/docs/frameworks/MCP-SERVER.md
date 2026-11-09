# OmniRoute MCP Server Documentation (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> રૂટીંગ, કેશ, કમ્પ્રેશન, મેમરી, કૌશલ્ય, પ્રોક્સી, પૂલ, રડાર અને સંદર્ભ સ્ત્રોત કામગીરીમાં 110 ટૂલ્સ સાથે મોડેલ કોન્ટેક્સ્ટ પ્રોટોકોલ સર્વર.
>
> સત્યનો સ્ત્રોત: `open-sse/mcp-server/server.ts` ગણતરીઓ** 110 અનન્ય સાધનો** `countUniqueMcpTools()` સાથે : 45 પ્રામાણિક વ્યાખ્યાઓ (છ CCR જીવનચક્ર સાધનો, એજન્ટ-કૌશલ્ય ત્રિપુટી, `omniroute_radar_catalog`, અને `omniroute_x_search` સહિત), વત્તા મેમરી (3), કુશળતા (4), GitHub કૌશલ્યો (3), પૂલ (6), ગેમિફિકેશન (8), પ્લગઇન્સ (8), Notion (2), લોકલ (2), Obsidian અને 6 પુલ RTK-માત્ર કમ્પ્રેશન ટૂલ્સ.

## સ્થાપન

OmniRoute MCP બિલ્ટ-ઇન છે. તેની સાથે પ્રારંભ કરો:

```bash
omniroute --mcp
```

અથવા ઓપન-એસએસઇ પરિવહન દ્વારા:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

HTTP ટ્રાન્સપોર્ટ્સ (`sse` / `streamable-http`, ડેશબોર્ડ સર્વર દ્વારા પ્રક્રિયામાં સેવા આપવામાં આવે છે) મૂળભૂત રીતે બંધ છે અને અગાઉ ફક્ત `/dashboard/mcp` પૃષ્ઠથી ટૉગલ કરી શકાય તેવું હતું. v3.8.51 મુજબ CLI ની સમાનતા છે:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH સમાન `mcpEnabled` (અને વૈકલ્પિક રીતે `mcpTransport`) ડેશબોર્ડને `/api/settings` દ્વારા ટૉગલ કરવાનું સેટ કરે છે. `mcp restart` `POST /api/mcp/restart` ને કૉલ કરે છે : તે સક્રિય `sse`/`streamable-http` સત્રોને તોડી નાખે છે જેથી આગળની વિનંતી સ્વચ્છ રીતે ફરી શરૂ થાય, જો MCP અક્ષમ હોય તો `409` પરત કરે છે, અને `stdio` પરિવહન માટે `501` (stdio ક્લાયન્ટ્સ તેમની પોતાની સબપ્રોસેસ — ધરાવે છે પુનઃપ્રારંભ કરવા માટે કોઈ ઇન-પ્રોસેસ હેન્ડલ નથી).

## પરિવહન

MCP સર્વર ત્રણ પરિવહનનો પર્દાફાશ કરે છે, જે બધા સમાન `createMcpServer()` ફેક્ટરી દ્વારા સમર્થિત છે:

| પરિવહન            | જ્યાં                                          | ક્યારે વાપરવું                                         |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE એકીકરણ (Claude ડેસ્કટોપ, Cursor, વગેરે)            |
| `sse`             | `POST/GET /api/mcp/sse` દ્વારા `httpTransport` | Browser/agent ક્લાયંટ કે જેને ઇવેન્ટ સ્ટ્રીમની જરૂર છે |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | મલ્ટિ-સેશન HTTP ક્લાયન્ટ્સ (`mcp-session-id` હેડર)     |

સક્રિય HTTP પરિવહન (`sse` અથવા `streamable-http`) `mcpTransport` સેટિંગ દ્વારા પસંદ કરવામાં આવે છે. પરિવહનને સ્વિચ કરવાથી અન્ય પરિવહન પર હાલના સત્રો બંધ થાય છે.

### રિમોટ એક્સેસ (મેનેજ-સ્કોપ બાયપાસ)

`/api/mcp/*` મૂળભૂત રીતે LOCAL_ONLY ટાયર (`src/server/authz/routeGuard.ts`) — માં છે ફક્ત લૂપબેક હોસ્ટ્સ (`localhost`, `127.0.0.1`, `::1`) તેના સુધી પહોંચી શકે છે. v3.8.2 થી, નોન-લૂપબેક ક્લાયંટ જો તેઓ એક `Authorization: Bearer <api-key>` રજૂ કરે છે જેની કી `manage` સ્કોપ ધરાવે છે તે કનેક્ટ થઈ શકે છે. ટનલ, રિવર્સ પ્રોક્સી અથવા સાર્વજનિક હોસ્ટનામ દ્વારા રિમોટ MCP સર્વર સુધી પહોંચવાનો આ એકમાત્ર રસ્તો છે.

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

બિન-મેનેજ કી (અથવા કોઈ બેરર નથી) `403 LOCAL_ONLY` પરત કરે છે. સિબલિંગ ઉપસર્ગ `/api/cli-tools/runtime/*` એ જાણી જોઈને NOT બાયપાસ કરી શકાય તેવું — છે [રૂટ ગાર્ડ ટિયર્સ — મેનેજ-સ્કોપ કોતરણી-આઉટ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) જુઓ.

### મૂળ માન્યતા

પ્રમાણીકરણ પછી, `/api/mcp/*` — ટ્રાન્સપોર્ટ અને મેનેજમેન્ટ રૂટ્સ જેમ કે `status`, `tools`, `audit` અને `restart` — તેના `Origin` હેડરને માન્ય કરવામાં આવે છે, કૉલર ગમે તે હોય (API કી, CLI ટોકન, ડેશબોર્ડ સત્ર, અથવા અનામી લૂપબેક સાથે અનામી લૂપબેક). આ DNS-રિબાઇન્ડિંગ પ્રોટેક્શન છે જે MCP સ્ટ્રીમેબલ HTTP સ્પેક માટે જરૂરી છે.

- **કોઈ `Origin` હેડર નથી** → મંજૂર. OmniRoute CLI, SDK અને IDE ક્લાયંટ એક પણ મોકલતા નથી.
- **મંજૂર `Origin`** → `localhost`, `127.0.0.1` અથવા `[::1]` કોઈપણ પોર્ટ પર, અથવા OmniRoute નું પોતાનું સાર્વજનિક મૂળ: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, વિશ્વસનીય રિવર્સ પ્રોક્સીનું ફોરવર્ડ ઑરિજિન (`OMNIROUTE_TRUST_PROXY`, જ્યારે કોઈ આધાર URL સેટ ન હોય ત્યારે જ), અથવા ડાયરેક્ટ loopback/LAN IP. એકલું `Host` હેડર ક્યારેય મૂળને વિશ્વાસપાત્ર બનાવતું નથી.
- **`null` સહિત અન્ય કોઈપણ `Origin`** JSON-RPC એરર બોડી સાથે → `403` : `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. ડેશબોર્ડ સત્ર કે જે માન્ય CSRF ટોકન રજૂ કરે છે તે હજુ પણ સ્વીકારવામાં આવે છે, જેમ કે અન્ય ડેશબોર્ડ લખાણો માટે.

રિવર્સ પ્રોક્સી પાછળ સેવા આપતા બ્રાઉઝર MCP ક્લાયંટને `OMNIROUTE_PUBLIC_BASE_URL` જરૂર છે; અન્ય મૂળ માટે કોઈ મંજૂરી-સૂચિ નથી. CORS પ્રીફ્લાઇટ (`OPTIONS`) મૂળ-તપાસ થયેલ નથી; નીચે મુજબની વિનંતી છે.

## IDE રૂપરેખાંકન

Claude ડેસ્કટોપ, Cursor, Cline, અને સુસંગત MCP ક્લાયંટ સેટઅપ માટે [MCP ક્લાયંટ કન્ફિગરેશન](../guides/SETUP_GUIDE.md#mcp-client-configuration) જુઓ.

---

## આવશ્યક સાધનો (14) — તબક્કો 1

| સાધન                            | અવકાશ                 | વર્ણન                                                                                                                        |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | અપટાઇમ, મેમરી, સર્કિટ બ્રેકર્સ, દર મર્યાદા, કેશ આંકડા                                                                        |
| `omniroute_list_combos`         | `read:combos`         | વ્યૂહરચનાઓ (વૈકલ્પિક મેટ્રિક્સ) સાથે બધા ગોઠવેલા કોમ્બોઝ                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | ચોક્કસ કોમ્બો માટે પ્રદર્શન મેટ્રિક્સ                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | કોમ્બોને સક્રિય અથવા નિષ્ક્રિય કરો                                                                                           |
| `omniroute_create_combo`        | `write:combos`        | હાલના કોમ્બો API દ્વારા માન્ય કોમ્બો બનાવો                                                                                   |
| `omniroute_check_quota`         | `read:quota`          | ક્વોટા used/total, ટકા બાકી, રીસેટ સમય, ટોકન હેલ્થ                                                                           |
| `omniroute_route_request`       | `execute:completions` | OmniRoute રૂટીંગ દ્વારા ચેટ પૂર્ણતા મોકલો                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | સમયગાળા દ્વારા ખર્ચ અહેવાલ (session/day/week/month)                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | ક્ષમતાઓ, સ્થિતિ, કિંમતો સાથે સંપૂર્ણ મોડેલ કેટલોગ                                                                            |
| `omniroute_radar_catalog`       | `read:radar`          | સ્થાનિક હસ્તાક્ષરિત રડાર સૂચિ; વૈકલ્પિક provider/family ફિલ્ટર્સ                                                             |
| `omniroute_tool_search`         | `read:tools`          | નોંધાયેલ MCP કૅટેલોગમાંથી સાધનો શોધો                                                                                         |
| `omniroute_web_search`          | `execute:search`      | રૂપરેખાંકિત શોધ પ્રદાતાઓ દ્વારા વેબ શોધ. X/Twitter. નથી                                                                      |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok દ્વારા X શોધો, અથવા Xquik API પરિણામો માટે `xquik-search` પસંદ કરો. પસંદ કરેલ બેકએન્ડ માટે ઓળખપત્રોની જરૂર છે. |
| `omniroute_web_fetch`           | `execute:search`      | ગોઠવેલ આનયન પ્રદાતાઓ દ્વારા વેબ સામગ્રી મેળવો                                                                                |

## અદ્યતન સાધનો (11) — તબક્કો 2

| સાધન                               | અવકાશ                                | વર્ણન                                                                                                  |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ફોલબેક ટ્રી સાથે ડ્રાય-રન રૂટીંગ સિમ્યુલેશન                                                            |
| `omniroute_set_budget_guard`       | `write:budget`                       | degrade/block/alert ક્રિયા સાથે સત્રનું બજેટ                                                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | રનટાઇમ પર કોમ્બો વ્યૂહરચના અપડેટ કરો (priority/weighted/auto/etc.)                                     |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` સ્થિતિસ્થાપકતા પ્રીસેટ લાગુ કરો                             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | વાસ્તવિક અપસ્ટ્રીમ કૉલનો ઉપયોગ કરીને કૉમ્બોમાં દરેક પ્રદાતાનું લાઇવ પરીક્ષણ                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 લેટન્સી અને સર્કિટ બ્રેકર સ્ટેટ સાથે પ્રતિ-પ્રદાતા મેટ્રિક્સ                               |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | budget/latency અવરોધો સાથે કાર્ય પ્રકાર દ્વારા કોમ્બોની ભલામણ કરો                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | સમજાવો કે શા માટે વિનંતી પ્રદાતાને રૂટ કરવામાં આવી હતી (સ્કોરિંગ પરિબળો + ફોલબેક્સ)                    |
| `omniroute_get_session_snapshot`   | `read:usage`                         | સંપૂર્ણ સત્રનો સ્નેપશોટ: કિંમત, ટોકન્સ, ટોપ models/providers, ભૂલો, બજેટ ગાર્ડ                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | તૂટેલા કોમ્બો રેફ / અનાથ પંક્તિઓ જેવા ડેટાબેઝ ડ્રિફ્ટનું નિદાન કરો (અને વૈકલ્પિક રીતે સ્વતઃ-રિપેર કરો) |
| `omniroute_sync_pricing`           | `pricing:write`                      | બાહ્ય સ્ત્રોતો (LiteLLM); `dryRun` ને સપોર્ટ કરે છે                                                    |

## કેશ ટૂલ્સ (2)

| સાધન                    | અવકાશ         | વર્ણન                                                  |
| :---------------------- | :------------ | :----------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | સિમેન્ટીક કેશ, પ્રોમ્પ્ટ-કેશ અને ઇડેમ્પોટન્સી આંકડા    |
| `omniroute_cache_flush` | `write:cache` | વૈશ્વિક સ્તરે અથવા signature/model દ્વારા કેશ ફ્લશ કરો |

## કમ્પ્રેશન ટૂલ્સ (13)

| સાધન                                | અવકાશ               | વર્ણન                                                                                                                      |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | કમ્પ્રેશન સેટિંગ્સ, એનાલિટિક્સ સારાંશ અને કેશ-અવેર આંકડા ( `analytics.mcpDescriptionCompression` મેટાડેટાનો સમાવેશ થાય છે) |
| `omniroute_compression_configure`   | `write:compression` | કમ્પ્રેશન મોડ, થ્રેશોલ્ડ, લક્ષ્ય ગુણોત્તર, સિસ્ટમ-પ્રોમ્પ્ટ સંરક્ષણ, MCP વર્ણન કમ્પ્રેશન ટૉગલ ગોઠવો                        |
| `omniroute_set_compression_engine`  | `write:compression` | સક્રિય એન્જિન (off/caveman/rtk/stacked) અને Caveman/RTK તીવ્રતા પસંદ કરો                                                   |
| `omniroute_list_compression_combos` | `read:compression`  | કમ્પ્રેશન કોમ્બોઝ અને તેમની એન્જિન પાઇપલાઇન નામની સૂચિ                                                                     |
| `omniroute_compression_combo_stats` | `read:compression`  | કમ્પ્રેશન કોમ્બો અને એન્જિન દ્વારા જૂથબદ્ધ વિશ્લેષણ                                                                        |
| `omniroute_ccr_store`               | `write:compression` | બાઉન્ડેડ ઇન-મેમરી CCR સ્ટોરમાં કોલર-અલગ સામગ્રી સ્ટોર કરો અને માર્કર વત્તા `ccr://` સંદર્ભ પરત કરો                         |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR સામગ્રીને સંપૂર્ણ અથવા માથા, પૂંછડી, રેખાઓ, grep અને આંકડા મોડ સાથે પુનઃપ્રાપ્ત કરો                                    |
| `omniroute_ccr_inspect`             | `read:compression`  | સામગ્રી પરત કર્યા વિના કોલરની માલિકીના CCR મેટાડેટાનું નિરીક્ષણ કરો                                                        |
| `omniroute_ccr_list`                | `read:compression`  | કૉલરની માલિકીના CCR બ્લોક્સ માટે પૃષ્ઠ ક્રમાંકિત મેટાડેટાની સૂચિ બનાવો                                                     |
| `omniroute_ccr_delete`              | `write:compression` | કૉલરની માલિકીના CCR બ્લોકને કાઢી નાખો                                                                                      |
| `omniroute_ccr_stats`               | `read:compression`  | કૉલર-સ્કોપ્ડ મેમરી વપરાશ, જીવનચક્ર કાઉન્ટર્સ અને સ્ટોર મર્યાદાની જાણ કરો                                                   |
| `omniroute_rtk_discover`            | `read:compression`  | ઑપ્ટ-ઇન RTK આઉટપુટ નમૂનાઓમાં રિકરિંગ અવાજ શોધો                                                                             |
| `omniroute_rtk_learn`               | `read:compression`  | ઑપ્ટ-ઇન નમૂનાઓમાંથી સમીક્ષા કરવા યોગ્ય RTK ફિલ્ટર ડ્રાફ્ટ બનાવો                                                            |

CCR એન્ટ્રીઓ ફક્ત મેમરીમાં હોય છે અને પુનઃપ્રારંભ પર અદૃશ્ય થઈ જાય છે. દરેક બ્લોક 2 MiB સુધી મર્યાદિત છે, દરેક મુખ્ય 16 MiB સુધી અને વૈશ્વિક સ્ટોર 64 MiB સુધી મર્યાદિત છે. એન્ટ્રી ડિફોલ્ટ 24-કલાક TTL (મહત્તમ સાત દિવસ) પર હોય છે. સંપૂર્ણ MCP પુનઃપ્રાપ્તિ 256 KiB સુધી મર્યાદિત છે; રેન્જ્ડ અને grep મોડ દ્વારા મોટા બ્લોક્સ ઉપલબ્ધ રહે છે. સ્ટોરેજ, પુનઃપ્રાપ્તિ, સૂચિ, નિરીક્ષણ, કાઢી નાખવું અને આંકડા પ્રમાણિત API-કી પ્રિન્સિપલ દ્વારા અલગ કરવામાં આવે છે. ઓડિટ રેકોર્ડ્સમાં હેશ અને કદના મેટાડેટા હોય છે, ક્યારેય સામગ્રી હોતી નથી.

`omniroute_compression_status` `analytics.mcpDescriptionCompression` હેઠળ MCP વર્ણન કમ્પ્રેશનને અલગથી રિપોર્ટ કરે છે. તે મૂલ્યો MCP સૂચિબદ્ધ વર્ણનો માટે મેટાડેટા-કદના અંદાજો છે (`tools`, `prompts`, `resources`, અને `resourceTemplates`); તે પ્રદાતા વપરાશ રસીદો નથી અને `source: "mcp_metadata_estimate"` સાથે ચિહ્નિત થયેલ છે.

### MCP ઍક્સેસિબિલિટી ટ્રી ફિલ્ટર (v3.8.0)

ઉપરના કમ્પ્રેશન ટૂલ્સથી અલગ, OmniRoute માં પોસ્ટ એક્ઝેક્યુશન ફિલ્ટર શામેલ છે જે** સાધન પરિણામો** MCP browser/accessibility ટૂલ્સ એજન્ટને પરત કરવામાં આવે તે પહેલાં. આ ફિલ્ટર પોતે એક ટૂલ — નથી જે વર્બોઝ એક્સેસિબિલિટી-ટ્રી અથવા બ્રાઉઝર-સ્નેપશોટ ટેક્સ્ટ (≥ 2000 અક્ષરો) ધરાવતા કોઈપણ ટૂલ પરિણામ પર પારદર્શક રીતે ચાલે છે.

મુખ્ય વર્તણૂકો:

- હેડ + પૂંછડીના સારાંશમાં ≥ 30 સળંગ પુનરાવર્તિત ભાઈ-બહેન રેખાઓને સંકુચિત કરે છે
- Playwright/computer-use દ્વારા જરૂરી `[ref=eXX]` એન્કર સાચવે છે
- નેવિગેશન સંકેત સાથે મોટા કદના લખાણ (> 50,000 અક્ષરો) ને સખત કાપે છે
- અપેક્ષિત બચત:** 60-80%** બ્રાઉઝર સ્નેપશોટ પેલોડ્સ પર

રૂપરેખાંકન: વૈશ્વિક સેટિંગ્સમાં `compression.mcpAccessibility` (માઇગ્રેશન 056). અમલીકરણ: `open-sse/services/compression/engines/mcpAccessibility/`. સંપૂર્ણ દસ્તાવેજ: [કમ્પ્રેશન એન્જિન્સ — MCP ઍક્સેસિબિલિટી ટ્રી ફિલ્ટર](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

આ ટૂલ્સ પાછળના રનટાઇમ કમ્પ્રેશન મોડલ માટે [કમ્પ્રેશન એન્જિન્સ](../compression/COMPRESSION_ENGINES.md) અને [RTK કમ્પ્રેશન](../compression/RTK_COMPRESSION.md) જુઓ.

## 1પ્રોક્સી ટૂલ્સ (3)

| સાધન                        | અવકાશ          | વર્ણન                                                                                      |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1પ્રોક્સી માર્કેટપ્લેસ (protocol/country/quality/limit ફિલ્ટર્સ) માંથી મફત પ્રોક્સીઓ મેળવો |
| `omniroute_oneproxy_rotate` | `read:proxies` | વ્યૂહરચના દ્વારા આગામી ઉપલબ્ધ પ્રોક્સી મેળવો (`random` / `quality` / `sequential`)         |
| `omniroute_oneproxy_stats`  | `read:proxies` | પૂલ આંકડા, સમન્વયન સ્થિતિ, પ્રોટોકોલ અને દેશ દ્વારા વિતરણ                                  |

## મેમરી ટૂલ્સ (3)

`open-sse/mcp-server/tools/memoryTools.ts` માં વ્યાખ્યાયિત. Auth/scope પ્રમાણભૂત MCP સ્કોપ પાઇપલાઇન દ્વારા લાગુ કરવામાં આવે છે.

| સાધન                      | અવકાશ          | વર્ણન                                                                                              |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | ટોકન-બજેટ અમલીકરણ સાથે ક્વેરી / પ્રકાર / API કી દ્વારા યાદોને શોધો                                 |
| `omniroute_memory_add`    | `write:memory` | નવી મેમરી એન્ટ્રી ઉમેરો (`factual` / `episodic` / `procedural` / `semantic`)                       |
| `omniroute_memory_clear`  | `write:memory` | API કી માટેની યાદોને સાફ કરો, વૈકલ્પિક રીતે પ્રકાર અથવા `olderThan` ટાઇમસ્ટેમ્પ દ્વારા ફિલ્ટર કરેલ |

## કૌશલ્ય સાધનો (4)

`open-sse/mcp-server/tools/skillTools.ts` માં વ્યાખ્યાયિત. `src/lib/skills/registry` + `src/lib/skills/executor` દ્વારા સમર્થિત.

| સાધન                          | અવકાશ            | વર્ણન                                                                                    |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API કી, નામ અથવા સક્ષમ રાજ્ય દ્વારા વૈકલ્પિક ફિલ્ટરિંગ સાથે નોંધાયેલ કુશળતાની સૂચિ બનાવો |
| `omniroute_skills_enable`     | `write:skills`   | ID દ્વારા ચોક્કસ કૌશલ્યને સક્ષમ અથવા અક્ષમ કરો                                           |
| `omniroute_skills_execute`    | `execute:skills` | પ્રદાન કરેલ ઇનપુટ સાથે કૌશલ્ય ચલાવો અને એક્ઝેક્યુશન રેકોર્ડ પરત કરો                      |
| `omniroute_skills_executions` | `read:skills`    | તાજેતરના કૌશલ્ય અમલના ઇતિહાસની સૂચિ બનાવો                                                |

## Notion સંદર્ભ સ્ત્રોત (6)

`open-sse/mcp-server/tools/notionTools.ts` માં વ્યાખ્યાયિત. ટોકન `key_value` ટેબલમાં `src/lib/db/notion.ts` મારફતે સંગ્રહિત થાય છે. `src/lib/notion/api.ts` માં REST ક્લાયન્ટ. `src/app/api/settings/notion/route.ts` માં સેટિંગ્સ API. `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` માં ડેશબોર્ડ UI.

થી તમારા Notion એકીકરણ ટોકનને ગોઠવો** સંદર્ભ સ્ત્રોતો** એન્ડપોઇન્ટ ડેશબોર્ડમાં ટેબ, અથવા REST API દ્વારા :

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

| સાધન                         | અવકાશ          | વર્ણન                                                         |
| :--------------------------- | :------------- | :------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | બધા પૃષ્ઠો અને ડેટાબેસેસ પર સંપૂર્ણ-ટેક્સ્ટ શોધ               |
| `notion_get_page`            | `read:notion`  | તેના ગુણધર્મો સાથે ID દ્વારા પૃષ્ઠ મેળવો                      |
| `notion_list_block_children` | `read:notion`  | પૃષ્ઠ અથવા બ્લોકના ચાઇલ્ડ બ્લોક્સની સૂચિ બનાવો                |
| `notion_query_database`      | `read:notion`  | ફિલ્ટર્સ, સૉર્ટ્સ અને પૃષ્ઠ ક્રમાંક સાથે ડેટાબેઝની ક્વેરી કરો |
| `notion_get_database`        | `read:notion`  | ID દ્વારા ડેટાબેઝ સ્કીમા મેળવો                                |
| `notion_append_blocks`       | `write:notion` | બાળકોના બ્લોકને પેરેન્ટ બ્લોકમાં જોડો (વિનંતી દીઠ મહત્તમ 100) |

## એજન્ટ કૌશલ્ય કેટલોગ સાધનો (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` માં વ્યાખ્યાયિત. `src/lib/agentSkills/catalog` દ્વારા સમર્થિત. આ સાધનો 45-એન્ટ્રી એજન્ટ કૌશલ્ય દસ્તાવેજીકરણ સૂચિને MCP ક્લાયન્ટ્સ અને બાહ્ય એજન્ટો સમક્ષ રજૂ કરે છે. અવકાશ: `read:catalog`.

| સાધન                              | અવકાશ          | વર્ણન                                                                                                                   |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | વૈકલ્પિક `category` (api\| cli) અને `area` ફિલ્ટર્સ સાથે તમામ 45 એજન્ટ કુશળતાની સૂચિ બનાવો; મેટાડેટા + કવરેજ પરત કરે છે |
| `omniroute_agent_skills_get`      | `read:catalog` | કેનોનિકલ `id` દ્વારા એક જ કૌશલ્ય માટે સંપૂર્ણ મેટાડેટા + SKILL.md સામગ્રી મેળવો                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | કવરેજ આંકડા: 23 API, 21 CLI અને 1 રૂપરેખા કૌશલ્યમાંથી કેટલી ફાઇલસિસ્ટમ વિ કેટેલોગ ટોટલ પર SKILL.md ફાઇલો ધરાવે છે       |

સંપૂર્ણ કેટલોગ અને બાહ્ય એજન્ટો તેનો ઉપયોગ કેવી રીતે કરે છે તે માટે [AGENT-SKILLS.md](./AGENT-SKILLS.md) જુઓ.

## સંબંધિત ફ્રેમવર્ક (v3.8.0)

ઉપરોક્ત MCP ટૂલ ઇન્વેન્ટરી (110 અનન્ય સાધનો, `countUniqueMcpTools()` દ્વારા ગણતરી કરવામાં આવે છે) ઇરાદાપૂર્વક રનટાઇમ routing/cache/compression/memory/skills/proxy/context-source ઑપરેશન્સ માટે સ્કોપ્ડ છે. બે સંલગ્ન ફ્રેમવર્ક v3.8.0 માં MCP સર્વરની સાથે મોકલે છે અને અલગથી દસ્તાવેજીકૃત થયેલ છે:

### મેઘ એજન્ટો

ક્લાઉડ એજન્ટ એ AI કોડિંગ એજન્ટો (કોડેક્સ-ક્લાઉડ, કર્સર-ક્લાઉડ, ડેવિન, જ્યુલ્સ) LLM પ્રદાતાઓ માટે ઉપયોગમાં લેવાતા સમાન કનેક્શન મોડેલ દ્વારા OmniRoute માં વાયર્ડ છે. તેઓ તેમની પોતાની REST સપાટી (`/api/v1/agents/*`) દ્વારા પ્રગટ થાય છે અને છે** નથી** MCP ટૂલ કેટલોગનો ભાગ — ક્લાઉડ એજન્ટને કૉલ કરવા માટે MCP સ્કોપનો ઉપયોગ થતો નથી.

- અમલીકરણ: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- જીવનચક્ર: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- દસ્તાવેજીકરણ: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### ગાર્ડરેલ્સ

ગાર્ડરેલ્સ એ pre/post-execution ફિલ્ટર્સ છે (વિઝન-બ્રિજ, પીઆઈ-માસ્કર, પ્રોમ્પ્ટ-ઇન્જેક્શન) ચેટ પાઇપલાઇનની અંદર લાગુ કરવામાં આવે છે. તેઓ MCP tool/route સ્તર સુધી પહોંચે તે પહેલાં દોડે છે અને ઓડિટ પાઇપલાઇનમાં માળખાગત ઉલ્લંઘનો બહાર કાઢે છે; તેઓને MCP સાધનો તરીકે બોલાવવામાં આવતા નથી.

- અમલીકરણ: `src/lib/guardrails/`.
- દસ્તાવેજીકરણ: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

બ્લોક થયેલ દેખાતા MCP કોલને ડીબગ કરતી વખતે, MCP ઓડિટ લોગ (`scope_denied:*` એન્ટ્રીઓ) અને ગાર્ડરેલ્સ ઓડિટ ટ્રેઇલ — બંને તપાસો કે રેકરેલ દ્વારા વિનંતી નકારી શકાય છે** પહેલાં** તે ક્યારેય MCP સ્કોપ એન્ફોર્સમેન્ટ લેયર સુધી પહોંચે છે.

---

## REST API એન્ડપોઇન્ટ્સ

| અંતિમ બિંદુ            | પદ્ધતિ                | વર્ણન                                                                                                 | ઓથ                         |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | સર્વર સ્થિતિ: ધબકારા, HTTP પરિવહન સ્થિતિ, ઓડિટ પ્રવૃત્તિ સારાંશ                                       | મેનેજમેન્ટ (session/admin) |
| `/api/mcp/tools`       | `GET`                 | સાધન સૂચિ (નામ, વર્ણન, અવકાશ, તબક્કો, સ્ત્રોત અંતિમ બિંદુઓ)                                           | મેનેજમેન્ટ                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ટ્રાન્સપોર્ટ એન્ડપોઇન્ટ ( `mcpEnabled` + `mcpTransport === "sse"` દ્વારા ગેટેડ)                   | API કી + સ્કોપ્સ           |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | સ્ટ્રીમેબલ HTTP ટ્રાન્સપોર્ટ ( `mcp-session-id` હેડરનો ઉપયોગ કરે છે; `DELETE` સત્ર સમાપ્ત કરે છે)     | API કી + સ્કોપ્સ           |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` માંથી ઓડિટ લોગ એન્ટ્રીઓ (ફિલ્ટર્સ: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | મેનેજમેન્ટ                 |
| `/api/mcp/audit/stats` | `GET`                 | એકીકૃત ઓડિટ આંકડા (`totalCalls`, `successRate`, `avgDurationMs`, ટોચના સાધનો)                         | મેનેજમેન્ટ                 |

સ્રોત ફાઇલો: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

સેટિંગ્સ (`mcpEnabled`) માં MCP સર્વર સક્ષમ ન થાય અને યોગ્ય `mcpTransport` પસંદ કરવામાં ન આવે ત્યાં સુધી બંને SSE અને સ્ટ્રીમેબલ HTTP પરિવહન અવરોધિત છે. જો ખોટું પરિવહન ગોઠવેલું હોય તો રૂટ સેટિંગ્સ સ્વિચ કરવા માટે સંકેત સાથે HTTP 400 પરત કરે છે.

---

## પ્રમાણીકરણ અને અવકાશ

MCP ટૂલ કૉલ કૉલર તરફથી સ્કોપ સ્ટ્રિંગ્સ વાંચે છે. તે ચેક ત્રણ સ્વતંત્ર નેમસ્પેસમાંથી એક છે. એક ચેકરનો પાસ એ બીજાનો પાસ નથી. નિયમો [ત્રણ સ્કોપ નેમસ્પેસ](#three-scope-namespaces) છે. ટૂલ કેટલોગ [MCP ટૂલ સ્કોપ્સ](#mcp-tool-scopes) છે.

### ત્રણ સ્કોપ નેમસ્પેસ

API કી પર `manage`, MCP ટૂલ પર `read:compression` અને `oma_live_…` એક્સેસ ટોકન પર `read` ત્રણ અલગ અલગ અનુદાન છે. મ્યુટેટીંગ મેનેજમેન્ટ રૂટ પર `read` એક્સેસ ટોકન મોકલનાર કોલર્સને HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` મળે છે તે રેન્ક `scopeSatisfies` છે. તે MCP ટેબલની સલાહ લેતા નથી, અને MCP મેચર તેની સલાહ લેતા નથી.

| નેમસ્પેસ          | ઓળખપત્ર                                                                    | તપાસનાર          | પાસ પરવાનગી આપે છે                                         |
| :---------------- | :------------------------------------------------------------------------- | :--------------- | :--------------------------------------------------------- |
| API-કી મેનેજમેન્ટ | `api_keys.scopes`                                                          | `hasManageScope` | તે બેરર કી માટે મેનેજમેન્ટ REST                            |
| API-કી એડિટિવ     | સમાન એરે, એક ચોક્કસ શબ્દમાળા                                               | નીચે આપેલ મદદગાર | માત્ર એક જ ક્ષમતા                                          |
| MCP ટૂલ સ્કોપ્સ   | સમાન એરે, અન્ય MCP `_meta` ( માત્ર HTTP/SSE ), અન્ય `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | તે સાધન, એકવાર અમલીકરણ ચાલુ થઈ જાય                         |
| ઍક્સેસ ટોકન       | `oma_live_…`                                                               | `scopeSatisfies` | મેનેજમેન્ટ રૂટ કે જેની પદ્ધતિ અને પાથને તે રેન્કની જરૂર છે |

દરેક ઓળખપત્રને મિન્ટિંગ [મેનેજમેન્ટ ઓથેન્ટિકેશનમાં](../guides/MANAGEMENT-AUTH.md) આવરી લેવામાં આવ્યું છે.

#### API-કી સ્કોપ્સ

એક `api_keys.scopes` એરે બે જોબ ફીડ કરે છે. તેઓ વિવિધ કાર્યોનો ઉપયોગ કરે છે.

**મેનેજમેન્ટ REST.** `manage` અને `admin` એ `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) ના સભ્યો છે. `hasManageScope` તે કી માટે મેનેજમેન્ટ રૂટને અધિકૃત કરે છે. `admin` તે રૂટ પર મેનેજમેન્ટ-સક્ષમ છે. અહીં શબ્દ `admin` એ એક્સેસ-ટોકન રેન્ક નથી અને તે MCP ટૂલ સ્કોપ્સમાં વિસ્તરતો નથી.

**ઉમેરણ શબ્દમાળાઓ.** દરેક એક ચોક્કસ સભ્યપદ પરીક્ષણ છે, અને દરેક `MANAGEMENT_API_KEY_SCOPES` બહાર રહે છે.

| અવકાશ                          | પાસ પરવાનગી આપે છે                                                                                                                                          |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | નોન-લૂપબેક `/api/mcp/` LOCAL_ONLY માત્ર કોતરવામાં આવે છે (`hasMcpConnectOrManageScope`). `manage` અથવા `admin` સાથેની ચાવી હજી પણ તે કોતરીને પસાર કરે છે.   |
| `self:usage`                   | આ કી (`src/app/api/v1/me/status/route.ts`) માટે`GET /api/v1/me/status`. `POST /api/keys` બનાવો (`normalizeSelfServiceScopesForCreate`) પર આ અવકાશ ઉમેરે છે. |
| `self:account-quota`           | તે સ્ટેટસ પેલોડ (`src/lib/usage/apiKeySelfService.ts`) ની અંદર અપસ્ટ્રીમ એકાઉન્ટ ક્વોટા. સ્ટેટસ રૂટને હજુ પણ `self:usage` ની જરૂર છે.                       |
| `policy:bypass-provider-quota` | આ કીનું અનુમાન પ્રદાતા-ક્વોટા નીતિને છોડવા કહે છે (`hasProviderQuotaBypassScope` માં `src/sse/handlers/chat.ts`).                                           |

#### મેચિંગ

સૂચિ એ [MCP ટૂલ સ્કોપ્સ](#mcp-tool-scopes) હેઠળનું ટેબલ છે. `src/shared/constants/mcpScopes.ts` માં `MCP_SCOPE_LIST` તે સૂચિ તરીકે ગણશો નહીં: તે મૂળ ટાઇપ કરેલ સબસેટ છે. પાછળથી ટૂલ્સ તેની બાજુમાં વધુ સ્કોપ્સ જાહેર કરે છે (`read:notion`, `read:skills`, `read:local-corpus`, અને બાકીનું કોષ્ટક).

`open-sse/mcp-server/scopeEnforcement.ts` માં`evaluateToolScopes` કૉલને મંજૂરી આપે છે જ્યારે દરેક જરૂરી અવકાશ કેટલાક મંજૂર અવકાશ સાથે મેળ ખાય છે:

- `*` દરેક જરૂરી અવકાશ સાથે મેળ ખાય છે.
- મંજૂર કરેલ અવકાશ જે `*` માં સમાપ્ત થાય છે તે જરૂરી અવકાશ સાથે મેળ ખાય છે જે તારા પહેલા ઉપસર્ગથી શરૂ થાય છે. `read:*` `read:compression` સાથે મેળ ખાય છે.
- દરેક અન્ય મંજૂર અવકાશ માત્ર સમાન જરૂરી સ્ટ્રિંગ સાથે મેળ ખાય છે.

એક કી કે જેના સ્કોપ્સ `["manage"]` છે તે `read:compression` માટે `scopeMatches` નિષ્ફળ જાય છે. સમાન કૉલ `admin`, `mcp:connect`, `read`, અને `write` માટે નિષ્ફળ જાય છે જ્યારે તે એકમાત્ર મંજૂર સ્ટ્રિંગ્સ હોય છે. પાછળના `*` બહાર MCP ટૂલ સ્કોપ્સમાં કોઈ વંશવેલો નથી.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (ડિફૉલ્ટ `false`) સિવાય અમલીકરણ બંધ છે. જ્યારે તે બંધ હોય, ત્યારે `evaluateToolScopes` કૉલને મંજૂરી આપે છે અને કેટલોગને છોડી દે છે. જ્યારે તે ચાલુ હોય, ત્યારે HTTP બેરર કીના `api_keys.scopes` નો `authInfo` તરીકે ઉપયોગ કરે છે (જુઓ [Per-key HTTP સ્કોપ બાઈન્ડિંગ](#per-key-http-scope-binding-7895) ). જ્યારે કોઈ કી સ્કોપ્સ ઉકેલાતી નથી, ત્યારે ગ્રાન્ટેડ સેટ MCP `_meta` પર આવે છે (ફક્ત HTTP/SSE કૉલર્સ માટે સન્માનિત, HTTP પ્રમાણીકરણ સંદર્ભમાં; stdio કૉલરની `_meta` અવગણવામાં આવે છે કારણ કે ક્લાયંટ તેને નિયંત્રિત કરે છે અને તે કૉલર દીઠ કોઈ ઓળખ ધરાવતું નથી), પછી `OMNIROUTE_MCP_SCOPES`.

#### એક્સેસ-ટોકન સ્કોપ્સ

`oma_live_…` ટોકન્સ (`src/lib/accessTokens/scopes.ts`) `read`, `write`, અથવા `admin` વહન કરે છે. `scopeSatisfies` એ એક રેન્ક છે: `admin` `write` અને `read` ને આવરી લે છે, અને `write` `read` ને આવરી લે છે. અજ્ઞાત સ્કોપ્સ કંઈપણ આવરી લે છે.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) તે રેન્કને `inferRequiredScope` (`src/server/authz/accessScopes.ts`) સાથે સરખાવે છે :

- `GET`, `HEAD`, અને `OPTIONS` `read` જરૂર છે.
- દરેક અન્ય પદ્ધતિ માટે `write` ની જરૂર છે.
- `ADMIN_SCOPE_PREFIXES` માં પાથને દરેક પદ્ધતિ માટે `admin` જરૂર પડે છે. `/api/mcp` તે સૂચિમાં છે, તેથી `write` ઍક્સેસ ટોકન હજુ પણ MCP HTTP સપાટીને કૉલ કરી શકતું નથી.
- `ADMIN_MUTATION_PREFIXES` માં પાથને માત્ર પરિવર્તન માટે જ `admin` જરૂર પડે છે.
- `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) માં પાથને માત્ર પરિવર્તન માટે જ `admin` જરૂર પડે છે, અને માત્ર તે ચોક્કસ પાથ પર — અન્ય `/api/settings/*` પેટા-માર્ગો `write` રાખે છે.

`PATCH /api/keys/{id}` એ મ્યુટેશન છે અને તે એડમિન લિસ્ટમાં નથી, તેથી `read` ટોકન 403 `Access token scope 'read' is insufficient; 'write' required.` મેળવે છે A `write` અથવા `admin` એક્સેસ ટોકન તે રૂટને સંતોષે છે. ડેશબોર્ડ JWT, લૂપબેક CLI મશીન-id ટોકન, અને `manage` અથવા `admin` સાથેની API કી અન્ય શાખાઓ લે છે અને આ રેન્ક દ્વારા સંકુચિત નથી.

એક એક્સેસ ટોકન જે `/api/mcp` માટે `scopeSatisfies` પસાર કરે છે તે ફક્ત મેનેજમેન્ટ ગેટને સાફ કરે છે. ટૂલ કોલ્સ હજુ પણ API-કી સ્કોપ્સ સામે `scopeMatches` ચલાવે છે. એક્સેસ-ટોકન રેન્ક એ `scopeMatches` માટે ઇનપુટ નથી.

### MCP ટૂલ સ્કોપ્સ

સ્કોપ અમલીકરણ `open-sse/mcp-server/scopeEnforcement.ts` માં કેન્દ્રિત છે. દરેક સાધનને ચોક્કસ અવકાશની જરૂર છે:

| અવકાશ                 | સાધનો                                                                                                                                                                         |
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
| `read:obsidian`       | 13 વાંચન સાધનો — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 લખવાના સાધનો — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

વાઇલ્ડકાર્ડ સ્કોપ્સ સપોર્ટેડ છે: `read:*` તમામ રીડ-સ્કોપ્સ આપે છે, `*` સંપૂર્ણ ઍક્સેસ આપે છે.

### `mcp:connect` — સાંકડા માર્ગની ક્ષમતા (#7895)

નોન-લૂપબેકથી HTTP/SSE MCP ટ્રાન્સપોર્ટ (`/api/mcp/*`) સુધી પહોંચવા માટે `/api/mcp/` LOCAL_ONLY કોતરણીની જરૂર પડે છે (જુઓ `docs/security/ROUTE_GUARD_TIERS.md`). ઐતિહાસિક રીતે તે કોતરીને માત્ર સંપૂર્ણ `manage`/`admin` -scope API કી — સ્વીકારવામાં આવે છે જે કૉલર માટે ખૂબ વ્યાપક છે જેને ફક્ત MCP સાથે વાત કરવાની જરૂર છે. `src/shared/constants/managementScopes.ts` હવે `MCP_CONNECT_SCOPE = "mcp:connect"` નિકાસ કરે છે: એક એડિટિવ, સાંકડો અવકાશ ( `SELF_USAGE_SCOPE` જેવો જ પૂર્વવર્તી) જે `src/server/authz/policies/management.ts` — માં `/api/mcp/` બાયપાસને ONLY ને અધિકૃત કરે છે તે અન્ય કોઈ મેનેજમેન્ટ-રૂટ એક્સેસ આપતું નથી અને જાણી જોઈને `MANAGEMENT_API_KEY_SCOPES` ની OUT રાખવામાં આવે છે. `manage`/`admin` હોલ્ડિંગ કી હજુ પણ કોતરણીને યથાવત પસાર કરે છે; `mcp:connect` એ રિમોટ MCP-ફક્ત કૉલર્સ માટે નિમ્ન-વિશેષાધિકાર વિકલ્પ છે, જે `hasMcpConnectOrManageScope()` દ્વારા તપાસવામાં આવે છે.

### પ્રતિ-કી HTTP સ્કોપ બંધનકર્તા (#7895)

HTTP/SSE પર, `open-sse/mcp-server/httpTransport.ts` હવે કૉલરના વાસ્તવિક `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) દ્વારા ઉકેલે છે અને તેને MCP SDK ના `transport.handleRequest(req, { authInfo })` માં પાસ કરે છે, તેથી `extra.authInfo.scopes` દરેક ટૂલ કૉલ સુધી પહોંચવું એ બેરર કીના પોતાના સ્કોપ્સને પ્રતિબિંબિત કરે છે. `scopeEnforcement.ts` ના `resolveCallerScopeContext()` એ `_meta` અને `OMNIROUTE_MCP_SCOPES` env ફૉલબૅક — પર `authInfo` પહેલેથી જ પ્રાધાન્ય આપ્યું છે, આ ફક્ત તે જ પ્રથમ, સર્વોચ્ચ-પ્રાધાન્યતા સ્ત્રોતને બનાવે છે, જે અગાઉ HTTP પર અનફેડ હતું. જ્યારે કોઈ API કી ઉકેલાતી નથી (કોઈ હેડર, અમાન્ય કી નથી), `authInfo` `undefined` રહે છે અને રિઝોલ્યુશન હાલની `meta`/env સાંકળમાં યથાવત રહે છે. stdio ની પ્રતિ-કોલર ઓળખ નથી (જુઓ `mcpCallerIdentity.ts`) અને પ્રતિ-કી બંધનકર્તા — દ્વારા અપ્રભાવિત છે તે `_meta` સ્ટેપને છોડી દે છે (`_meta` માત્ર HTTP auth સંદર્ભ, #15159 ની અંદર જ સન્માનિત થાય છે) અને એકલા `OMNIROUTE_MCP_SCOPES` env કીથી ઉકેલે છે.

**`OMNIROUTE_MCP_ENFORCE_SCOPES` ને ધ્યાનમાં લીધા વિના સાંકડા-સ્કોપવાળા HTTP/SSE કૉલર્સ માટે અમલીકરણ ફરજિયાત છે.** `OMNIROUTE_MCP_ENFORCE_SCOPES` `false` માં ડિફોલ્ટિંગ માત્ર local/stdio સિંગલ-ઓપરેટર ફ્લો માટે જ સલામત છે, જ્યાં પ્રતિ-કોલર ઓળખ સામે અવકાશ નથી. જ્યારે પણ `resolveCallerScopeContext()` `source === "authInfo"` (એટલે કે વાસ્તવિક પ્રતિ-કી HTTP ઓથોરાઇઝેશન હેડર, HTTP/SSE-only) AND ઉકેલે ત્યારે બિનશરતી ( `scopeEnforcement.ts` માં`shouldForceScopeEnforcement()` ) પર `open-sse/mcp-server/server.ts::withScopeEnforcement()` પ્રતિ-ટૂલ અવકાશ અમલીકરણને ચાલુ કરે છે જે કી સંપૂર્ણ `manage`/`admin` સ્કોપ ધરાવતી નથી. આ ગેપને બંધ કરે છે જ્યાં ONLY સાંકડી `mcp:connect` બાયપાસ સ્કોપ — ધરાવતું કી `OMNIROUTE_MCP_ENFORCE_SCOPES` `/api/mcp/` LOCAL_ONLY કોતરણી-આઉટ — અધિકૃત કરવા સિવાય કંઈપણ અધિકૃત કરતું નથી `false` અન્યથા એકવાર ઑપરેટર remote/non-loopback MCP ઍક્સેસને સક્ષમ કરે તે પછી દરેક MCP ટૂલનો ઉપયોગ કરી શકે છે. HTTP પર સંપૂર્ણ `manage`/`admin` કી, અને દરેક stdio/local કૉલર, વર્તમાન `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated વર્તનને યથાવત રાખો.

---

## પર્યાવરણ ચલો

| ચલ                                      | ડિફૉલ્ટ                                    | હેતુ                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                   | OmniRoute આંતરિક APIs ને કૉલ કરતી વખતે URL MCP ઉપયોગ કરે છે                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_API_KEY`                     | (ખાલી)                                     | API કીને `Authorization: Bearer` તરીકે આંતરિક API કૉલ્સમાં ફોરવર્ડ કરવામાં આવી છે                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (માત્ર `"true"` તેને સક્ષમ કરે છે) | જ્યારે સક્ષમ હોય, ત્યારે ખૂટતા સ્કોપ્સ ટૂલ કૉલ્સને નકારે છે અને ઑડિટ લૉગમાં `scope_denied:<reason>` લોગ કરે છે. પ્રતિ-કી અધિકૃતતા હેડર (`source === "authInfo"`) માંથી ઉકેલાયેલ કોઈપણ HTTP/SSE કૉલર માટે આ ફ્લેગને ધ્યાનમાં લીધા વિના અમલીકરણ ALSO છે કે જેમાં સંપૂર્ણ `manage`/`admin` સ્કોપ — નો અભાવ છે દા.ત. માત્ર સાંકડી `mcp:connect` બાયપાસ સ્કોપ — ધરાવતી કી ધરાવે છે તેથી આ ડિફૉલ્ટ ફક્ત local/stdio ઓપરેટર-નૉન-ઓપરેટર માટે સલામત છે. |
| `OMNIROUTE_MCP_SCOPES`                  | (ખાલી)                                     | ડિફૉલ્ટ રૂપે "ઉપલબ્ધ" ગણાતા સ્કોપ્સની અલ્પવિરામથી અલગ કરેલ અનુમતિ સૂચિ (જ્યારે કૉલર તેના પોતાના સ્કોપ્સ પ્રદાન કરતું નથી ત્યારે વપરાય છે)                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | ( = ચાલુ કરો)                              | જ્યારે `0/false/off/no` પર સેટ કરેલ હોય, ત્યારે નોંધણી સમયે MCP વર્ણન સંકોચનને અક્ષમ કરે છે                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | ( = ચાલુ કરો)                              | ઉપરની જેમ સમાન ટૉગલ માટે વૈકલ્પિક ઉપનામ                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                    | આંતરિક વ્યવસ્થાપન વાંચન માટેનું બજેટ રદ કરો (સ્વાસ્થ્ય, સ્થિતિસ્થાપકતા, કોમ્બોઝ, ક્વોટા, ઉપયોગ)                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                    | પ્રદાતા (`route_request`, `web_search`, `web_fetch`) પર રાહ જોતા હોપ્સ માટેનું બજેટ રદ કરો                                                                                                                                                                                                                                                                                                                                                     |
| `MCP_TOOL_DENY`                         | ( = નો ફિલ્ટર અનસેટ કરો)                   | અલ્પવિરામથી અલગ કરેલ ટૂલના નામ `tools/list` માંથી છોડવા માટે (ટૂલ-કાર્ડિનેલિટી રિડક્શન — નીચે જુઓ)                                                                                                                                                                                                                                                                                                                                             |
| `MCP_TOOL_ALLOW`                        | ( = નો ફિલ્ટર અનસેટ કરો)                   | અલ્પવિરામથી વિભાજિત ટૂલ નામો ફક્ત રાખવા માટે (મંજૂરી-સૂચિ મોડ — નીચે જુઓ)                                                                                                                                                                                                                                                                                                                                                                      |
| `DATA_DIR`                              | `~/.omniroute`                             | હાર્ટબીટ ફાઈલ `${DATA_DIR}/runtime/mcp-heartbeat.json` ને લખવામાં આવે છે                                                                                                                                                                                                                                                                                                                                                                       |

---

## વર્ણન સંકોચન

MCP ટૂલ, પ્રોમ્પ્ટ અને રિસોર્સ રજિસ્ટ્રીઝ ક્લાયન્ટ્સ (અને તેથી પ્રોમ્પ્ટ સંદર્ભ ખર્ચ) માટે ખુલ્લા મેટાડેટા ફૂટપ્રિન્ટને ઘટાડવા માટે registration/list સમયે વર્ણનને સંકુચિત કરી શકે છે. અમલીકરણ `open-sse/mcp-server/descriptionCompressor.ts` માં રહે છે અને `createMcpServer()` ની અંદર `compressMcpRegistryMetadata` મારફતે MCP સર્વરમાં વાયર થયેલ છે.

- પ્રિઝર્વ્ડ-બ્લોક એક્સટ્રેક્શન (કોડ સ્પાન્સ, ફેન્સ્ડ બ્લોક્સ, વગેરે) સાથે કેવમેન રૂલ્સસેટ (`getRulesForContext("all", "full")`) નો ઉપયોગ કરીને વર્ણન ટેક્સ્ટ પર કમ્પ્રેશન ચાલે છે જેથી માળખાકીય સામગ્રીમાં ફેરફાર થતો નથી.
- `key_value` સેટિંગ્સ કોષ્ટકમાં `compression.mcpDescriptionCompressionEnabled` મૂલ્ય દ્વારા પ્રતિ જમાવટને ટૉગલ કરો (ડિફૉલ્ટ: સક્ષમ) — તરીકે UI માં ખુલ્લું** Analytics → MCP વર્ણન કમ્પ્રેશન** .
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` અથવા `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` મારફતે પ્રક્રિયા-વ્યાપી ટૉગલ કરો.
- વાસ્તવિક પ્રદાતાના ઉપયોગની રસીદોથી અસ્પષ્ટ કરવા માટે વાસ્તવિક સમયના આંકડા `analytics.mcpDescriptionCompression` હેઠળ `omniroute_compression_status` દ્વારા સપાટી પર આવે છે અને `source: "mcp_metadata_estimate"` ટૅગ કરવામાં આવે છે.

---

## ટૂલ કાર્ડિનલિટી રિડક્શન (F4.3)

વર્ણન સંકોચન દરેક સાધનના મેટાડેટાને સંકોચાય છે;** ટૂલ-કાર્ડિનેલિટી ઘટાડો** _કેટલા_ સાધનોની જાહેરાત કરવામાં આવે છે તે ઘટાડીને એક પગલું આગળ વધે છે. `tools/list` મેનિફેસ્ટમાં ઓછા ટૂલ્સની જાહેરાત કરવાથી ક્લાયંટનું મોડેલ ટૂલ કેટલોગ ("લેયર 5" કમ્પ્રેશન) માટે ચૂકવે છે તે પ્રતિ-વિનંતી ટોકન ખર્ચ ઘટાડે છે. અમલીકરણ એ `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) માં શુદ્ધ, સ્ટેટલેસ ફિલ્ટર છે, જે `createMcpServer()` (`open-sse/mcp-server/server.ts`) માં નોંધણી લૂપમાં જોડાયેલ છે.

**ઑપ્ટ-ઇન, ડિફૉલ્ટ રૂપે બંધ.** ફિલ્ટર ફક્ત ત્યારે જ ચાલે છે જ્યારે ઓછામાં ઓછા બે પર્યાવરણ ચલોમાંનું એક સેટ કરેલ હોય; કોઈપણ સેટ સાથે, બધા 110 સાધનો અપરિવર્તિત જાહેર કરવામાં આવ્યા છે.

| ચલ               | મોડ                                                                                               |
| :--------------- | :------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | બ્લેકલિસ્ટ — અલ્પવિરામ-વિભાજિત ટૂલ નામો કે જે હંમેશા `tools/list` માંથી કાઢી નાખવામાં આવે છે      |
| `MCP_TOOL_ALLOW` | — અલ્પવિરામથી અલગ કરેલ ટૂલ નામોની મંજૂરી આપો; ફક્ત આ જ બચે છે, બાકીનું બધું પડતું મૂકવામાં આવે છે |

`deny` `allow` કરતાં અગ્રતા લે છે. નામો અલ્પવિરામથી વિભાજિત, સુવ્યવસ્થિત છે અને ખાલી એન્ટ્રીઓને અવગણવામાં આવે છે. ઉદાહરણો:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ફિલ્ટર કરેલ સાધનો કેવી રીતે દૂર કરવામાં આવે છે:** નોંધણી હંમેશા સફળ થાય છે; પ્રોફાઇલ જે સાધનને નકારી કાઢે છે તે પછી MCP SDK હેન્ડલ પર `.disable()` d છે, તેથી તે ક્યારેય `tools/list` માં દેખાતું નથી પરંતુ વાયરિંગ અકબંધ રહે છે (ક્લીન enable/disable, ફરીથી નોંધણી નહીં). પ્રોફાઇલ પાર્સર `readMcpToolProfileFromEnv(process.env)` છે, જે `null` (કોઈ ફિલ્ટરિંગ નહીં) પરત કરે છે જ્યારે બંને var ખાલી હોય.

`reduceToolManifest` પાછળનો વધુ સમૃદ્ધ `ToolProfile` આકાર સ્કોપ-ઇન્ટરસેક્શન ફિલ્ટરિંગ (`allowScopes`, `read:*` -style વાઇલ્ડકાર્ડ મેચિંગ સાથે) અને નિર્ધારિત `maxTools` કેપને પણ સપોર્ટ કરે છે, પરંતુ તે બે નોબ્સને નોંધણી સમયે સંપૂર્ણ મેનિફેસ્ટની જરૂર છે અને** નથી** આજે પર્યાવરણ વેરીએબલ્સ દ્વારા ખુલ્લું મૂકવામાં આવ્યું છે (એક `tools/list` -level હૂક એ ટ્રેક કરેલ ફોલો-અપ છે). ઘટાડા પહેલા અને પછી મેનિફેસ્ટ ટોકન ખર્ચની સરખામણી કરવા માટે `estimateManifestTokens()` ઉપલબ્ધ છે.

---

## રનટાઇમ ધબકારા

stdio પરિવહન દર 5 સેકન્ડે `${DATA_DIR}/runtime/mcp-heartbeat.json` માટે જીવંત રહે છે. ડેશબોર્ડ (`/api/mcp/status`) `online` મેળવવા માટે આ ફાઇલ વત્તા PID જીવંતતા વાંચે છે. HTTP તેના બદલે પ્રક્રિયામાં `getMcpHttpStatus()` થી રિપોર્ટ સ્ટેટ ટ્રાન્સપોર્ટ કરે છે (કોઈ ફાઇલ લખી નથી).

હાર્ટબીટ સ્નેપશોટ સમાવે છે:

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

## ઓડિટ લોગીંગ

દરેક ટૂલ કોલને SQLite `mcp_tool_audit` ટેબલ પર `open-sse/mcp-server/audit.ts` દ્વારા લૉગ કરવામાં આવે છે:

- સાધનનું નામ, દલીલો (hashed/truncated પ્રતિ-ટૂલ `auditLevel`), પરિણામ
- ms માં અવધિ, success/failure ફ્લેગ, ભૂલ સંદેશ (જ્યારે લાગુ હોય)
- API કી હેશ, ટાઇમસ્ટેમ્પ
- અવકાશ અસ્વીકાર ગુમ થયેલ અવકાશ સૂચિ સાથે `scope_denied:<reason>` તરીકે લૉગ થયેલ છે

તાજેતરના કૉલ્સનું નિરીક્ષણ કરવા માટે ડેશબોર્ડ અથવા `/api/mcp/audit` અને `/api/mcp/audit/stats` REST એન્ડપોઇન્ટનો ઉપયોગ કરો.

---

## ફાઇલો

| ફાઈલ                                                                     | હેતુ                                                               |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP સર્વર ફેક્ટરી, stdio એન્ટ્રી પોઈન્ટ, સ્કોપ્ડ ટૂલ રજીસ્ટ્રેશન   |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + સ્ટ્રીમેબલ HTTP પરિવહન (સત્ર વ્યવસ્થાપન)                     |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ટૂલ સ્કોપ મૂલ્યાંકન અને કોલર રિઝોલ્યુશન                            |
| `open-sse/mcp-server/audit.ts`                                           | ટૂલ કોલ ઓડિટ લોગીંગ (`mcp_tool_audit`)                             |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio હૃદયના ધબકારા લેખક (`mcp-heartbeat.json`)                    |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ટૂલ / પ્રોમ્પ્ટ / રિસોર્સ રજિસ્ટ્રી માટે વર્ણન કમ્પ્રેશન           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod સ્કીમા + ટૂલ રજિસ્ટ્રી (`MCP_TOOLS`, 45 એન્ટ્રીઓ)              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | તબક્કો 2 + કેશ + 1proxy ટૂલ હેન્ડલર્સ                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | કમ્પ્રેશન ટૂલ હેન્ડલર્સ                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | મેમરી ટૂલની વ્યાખ્યાઓ (3 ટૂલ્સ)                                    |
| `open-sse/mcp-server/tools/skillTools.ts`                                | કૌશલ્ય સાધનની વ્યાખ્યાઓ (4 સાધનો)                                  |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion સંદર્ભ સ્ત્રોત સાધન વ્યાખ્યાઓ (6 સાધનો)                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ગેમિફિકેશન ટૂલ વ્યાખ્યાઓ (8 સાધનો)                                 |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | પ્લગઇન નોંધણી અને સંચાલન સાધનો (8 સાધનો)                           |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` એન્ડપોઇન્ટ                                       |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` એન્ડપોઇન્ટ                                        |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE પરિવહન માર્ગ                                    |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` સ્ટ્રીમેબલ HTTP પરિવહન માર્ગ                     |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ઓડિટ લોગ ક્વેરી                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` એગ્રીગેટેડ ઓડિટ મેટ્રિક્સ                   |
| `src/lib/notion/api.ts`                                                  | Notion REST API ક્લાયંટ (ફરી પ્રયાસ કરો, સમયસમાપ્તિ, ભૂલ વર્ગીકરણ) |
| `src/lib/db/notion.ts`                                                   | Notion ટોકન પર્સિસ્ટન્સ (`key_value` ટેબલ)                         |
| `src/app/api/settings/notion/route.ts`                                   | Notion સેટિંગ્સ API (GET/POST/DELETE)                              |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ટોકન મેનેજમેન્ટ UI                                          |
| `tests/unit/notion-api.test.ts`                                          | Notion API ક્લાયંટ પરીક્ષણો (7)                                    |
| `tests/unit/notion-tools.test.ts`                                        | Notion ટૂલ્સ સ્કોપ એન્ફોર્સમેન્ટ ટેસ્ટ્સ (10)                      |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB મોડ્યુલ પરીક્ષણો (3)                                     |
