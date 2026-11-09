# OmniRoute MCP Server Documentation (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Sẹ́ńbà Model Context Protocol pẹ̀lú irinṣẹ́ 110 fún ìdarí ipa-ọ̀nà, àpamọ́, ìfúnpọ̀, ìrántí, àwọn ọgbọ́n, aṣojú, àkójọpọ̀, Radar, àti àwọn iṣẹ́ orísun àyíká.
>
> Orísun òtítọ́: `open-sse/mcp-server/server.ts` ṣe ìṣirò **àwọn irinṣẹ́ aláìlẹ́ẹ̀mejì 110** pẹ̀lú `countUniqueMcpTools()`: àwọn ìtumọ̀ àṣẹ 45 (tí ó ní àwọn irinṣẹ́ ìgbésí-ayé CCR mẹ́fà, ẹ̀ẹ̀mẹ́ta ti ọgbọ́n aṣojú, `omniroute_radar_catalog`, àti `omniroute_x_search`), pẹ̀lú ìrántí (3), àwọn ọgbọ́n (4), àwọn ọgbọ́n GitHub (3), àkójọpọ̀ (6), ṣíṣe bí eré (8), àwọn àfikún (8), Notion (6), Obsidian (22), àkójọ ọ̀rọ̀ abẹ́lé (3), àti àwọn irinṣẹ́ ìfúnpọ̀ méjì tí ó jẹ́ ti RTK nìkan.

## Fifi sori ẹrọ

OmniRoute MCP ti wa ni itumọ ti. Bẹrẹ pẹlu:

```bash
omniroute --mcp
```

Tabi nipasẹ gbigbe-si-sse:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

Awọn gbigbe HTTP (`sse` / `streamable-http`, ti o ṣiṣẹ ni ilana nipasẹ olupin dasibodu) wa ni pipa nipasẹ aiyipada ati pe o jẹ iyipada tẹlẹ nikan lati oju-iwe `/dashboard/mcp`. Bi ti v3.8.51 CLI ni o ni ibamu:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH kanna `mcpEnabled` (ati iyan `mcpTransport`) tito dasibodu awọn iyipada nipasẹ `/api/settings`. `mcp restart` n pe `POST /api/mcp/restart`: o ya lulẹ awọn akoko `sse`/`streamable-http` ti nṣiṣe lọwọ nitorina ibeere ti o tẹle tun bẹrẹ ni mimọ, da pada `409` ti o ba jẹ alaabo MCP, ati `501` fun gbigbe `stdio` (awọn alabara stdio ni awọn ilana ti ara wọn — ko si imudani inu-ila lati tun bẹrẹ).

## Àwọn Transport

Olùpín MCP ń pèsè àwọn transport mẹ́ta, gbogbo wọn sì ń lo factory `createMcpServer()` kan náà:

| Transport         | Ibi                                            | Ìgbà tí a ó lò ó                                            |
| :---------------- | :--------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | Àwọn ìṣọ̀kan IDE (Claude Desktop, Cursor, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)    |
| `sse`             | `POST/GET /api/mcp/sse` nípasẹ̀ `httpTransport` | Àwọn client browser/agent tí wọ́n nílò ìṣàn event            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | Àwọn client HTTP onírúurú session (header `mcp-session-id`) |

Setting `mcpTransport` ló ń yan transport HTTP tó ń ṣiṣẹ́ (`sse` tàbí `streamable-http`). Yíyí transport padà máa ń pa àwọn session tó wà tẹ́lẹ̀ lórí transport kejì.

### Ìráàyèsí jíjìn (yíyẹ manage-scope kọjá)

`/api/mcp/*` wà ní ipele LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — ní àìyípadà, àwọn host loopback nìkan (`localhost`, `127.0.0.1`, `::1`) ló lè dé ọ̀dọ̀ rẹ̀. Láti v3.8.2, àwọn client tí kì í ṣe loopback lè sopọ̀ bí wọ́n bá fi `Authorization: Bearer <api-key>` hàn, tí key rẹ̀ sì ní scope `manage`. Èyí nìkan ni ọ̀nà láti dé olùpín MCP jíjìn nípasẹ̀ tunnel, reverse proxy, tàbí hostname gbogbogbò.

```bash
# Fún un ní scope manage: ṣí ojú-ìwé API Keys lórí dashboard, kí o sì tan
# "Management Access" fún key náà, tàbí ṣe POST scopes:["manage"] nígbà tí o bá ń ṣẹ̀dá rẹ̀.

# Lẹ́yìn náà, sopọ̀ láti client MCP jíjìn:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Key tí kò ní `manage` (tàbí tí kò ní Bearer) máa dá `403 LOCAL_ONLY` padà. A kò mọ̀ọ́mọ̀ gba àkọ́lé ìbátan `/api/cli-tools/runtime/*` láàyè láti kọjá ààlà yìí — wo [Àwọn Ipele Route Guard — ààyè àkànṣe manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Ìjẹ́rìísí Origin

Lẹ́yìn ìfọwọ́sí, gbogbo ìbéèrè sí `/api/mcp/*` — àwọn transport àti àwọn ọ̀nà ìṣàkóso bíi `status`, `tools`, `audit`, `restart` — ni a máa ń ṣàyẹ̀wò àkọlé `Origin` wọn, ẹnikẹ́ni tó bá ń pè é (kọ́kọ́rọ́ API, àmì CLI, ìgbà dashboard, tàbí loopback aláìlórúkọ nígbà tí a pa wíwọlé). Èyí ni ààbò DNS rebinding tí ìlànà MCP Streamable HTTP béèrè.

- **Kò sí àkọlé `Origin`** → a gbà á láàyè. OmniRoute CLI, SDK àti àwọn oníbàárà IDE kì í fi í ránṣẹ́.
- **`Origin` tí a gbà láàyè** → `localhost` / `127.0.0.1` / `[::1]` lórí port èyíkéyìí, tàbí origin gbangba ti OmniRoute fúnra rẹ̀: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, origin tí reverse proxy tí a gbẹ́kẹ̀lé fi ránṣẹ́ (`OMNIROUTE_TRUST_PROXY`, kìkì nígbà tí a kò ṣètò base URL), tàbí agbàlejò IP loopback/LAN tí a wọlé sí tààrà. Àkọlé `Host` nìkan kì yóò sọ origin kankan di ẹni tí a gbẹ́kẹ̀lé láéláé.
- **`Origin` mìíràn èyíkéyìí, pẹ̀lú `null`** → `403` pẹ̀lú ara àṣìṣe JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Ìgbà dashboard tí ó fi àmì CSRF tó tọ́ hàn ṣì máa ń jẹ́ títẹ́wọ́gbà, bí ti àwọn kíkọ dashboard mìíràn.

Oníbàárà MCP aṣàwákiri tí a ń pèsè lẹ́yìn reverse proxy nílò `OMNIROUTE_PUBLIC_BASE_URL`; kò sí àkójọ ìgbàláàyè fún àwọn origin mìíràn. A kì í ṣàyẹ̀wò Origin nínú ìbéèrè ìṣáájú CORS (`OPTIONS`); a máa ń ṣàyẹ̀wò ìbéèrè tó tẹ̀lé e.

## Ìṣètò IDE

Wo [Ìṣètò Oníbàárà MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) fún ìṣètò Claude Desktop,
Cursor, Cline, àti àwọn oníbàárà MCP tó bá a mu.

---

## Àwọn Irinṣẹ́ Pàtàkì (14) — Ìpele 1

| Irinṣẹ́                          | Àwọn Àṣẹ              | Àpèjúwe                                                                                                                 |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Àkókò tí ó ti ń ṣiṣẹ́, ìrántí, àwọn olùdáwọ́lé àyíká, àwọn òpin ìwọ̀n, àwọn ìṣirò àpamọ́                                    |
| `omniroute_list_combos`         | `read:combos`         | Gbogbo àwọn combo tí a ti ṣètò pẹ̀lú àwọn ọgbọ́n ìlànà (àwọn ìwọ̀n iṣẹ́ jẹ́ àṣàyàn)                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | Àwọn ìwọ̀n iṣẹ́ fún combo kan pàtó                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | Mú combo kan ṣiṣẹ́ tàbí dá a dúró                                                                                        |
| `omniroute_create_combo`        | `write:combos`        | Ṣẹ̀dá combo tí a ti fìdí rẹ̀ múlẹ̀ nípasẹ̀ API combo tó wà tẹ́lẹ̀                                                             |
| `omniroute_check_quota`         | `read:quota`          | Ìpín tí a lò/lápapọ̀, ìdá ọgọ́rùn-ún tó kù, àkókò àtúntò, ìlera token                                                     |
| `omniroute_route_request`       | `execute:completions` | Fi ìbéèrè ìparí ìfọ̀rọ̀wérọ̀ ránṣẹ́ nípasẹ̀ ìdarí ọ̀nà OmniRoute                                                              |
| `omniroute_cost_report`         | `read:usage`          | Ìròyìn iye owó gẹ́gẹ́ bí àkókò (ìgbà/ọjọ́/ọ̀sẹ̀/oṣù)                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | Àkójọ model kíkún pẹ̀lú àwọn agbára, ipò, àti ìdíyelé                                                                    |
| `omniroute_radar_catalog`       | `read:radar`          | Àkójọ Radar agbègbè tí a fọwọ́ sí; àwọn àsẹ̀ olùpèsè/ẹbí jẹ́ àṣàyàn                                                        |
| `omniroute_tool_search`         | `read:tools`          | Ṣàwárí àwọn irinṣẹ́ láti inú àkójọ MCP tí a forúkọsílẹ̀                                                                   |
| `omniroute_web_search`          | `execute:search`      | Ṣàwárí wẹ́ẹ̀bù nípasẹ̀ àwọn olùpèsè ìṣàwárí tí a ti ṣètò. Kì í ṣe X/Twitter.                                               |
| `omniroute_x_search`            | `execute:search`      | Ṣàwárí X nípasẹ̀ xAI/SuperGrok, tàbí yan `xquik-search` fún àwọn èsì Xquik API. Ó nílò ẹ̀rí ìdánimọ̀ fún backend tí a yàn. |
| `omniroute_web_fetch`           | `execute:search`      | Gba àkóónú wẹ́ẹ̀bù nípasẹ̀ àwọn olùpèsè ìgbàwá tí a ti ṣètò                                                                |

## Àwọn Irinṣẹ́ Onípele Gíga (11) — Ìpele 2

| Irinṣẹ́                             | Àwọn Ààyè Àṣẹ                        | Àpèjúwe                                                                                                   |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Ìfọwọ́ṣe ìdarí ọ̀nà láìṣe ìmúlò gidi pẹ̀lú igi ọ̀nà àfirọ́pò                                                   |
| `omniroute_set_budget_guard`       | `write:budget`                       | Ìṣúná sáà pẹ̀lú ìgbésẹ̀ ìdínkù/ìdènà/ìkìlọ̀                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ṣàfikún ọgbọ́n combo ní àsìkò ìṣiṣẹ́ (ààyò/ìwọ̀n/àìfọwọ́yí/àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)                                    |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Lo àgbékalẹ̀ ìfaradà `aggressive` / `balanced` / `conservative`                                            |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Ìdánwò tààrà fún gbogbo olùpèsè inú combo nípa lílo ìpè gidi sí upstream                                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | Àwọn òṣùwọ̀n olùpèsè kọ̀ọ̀kan pẹ̀lú ìdádúró p50/p95/p99 àti ipò circuit breaker                               |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Dábàá combo gẹ́gẹ́ bí irú iṣẹ́, pẹ̀lú àwọn ààlà ìṣúná/ìdádúró                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Ṣàlàyé ìdí tí a fi darí ìbéèrè kan sí olùpèsè kan (àwọn kókó ìṣírò àmì + àwọn ọ̀nà àfirọ́pò)                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Àwòrán-ẹ̀kúnrẹ́rẹ́ sáà: iye owó, token, àwọn model/olùpèsè àkọ́kọ́, àṣìṣe, olùṣọ́ ìṣúná                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Ṣàyẹ̀wò (kí o sì túnṣe fúnra rẹ bí ó bá yẹ) yíyapa database bíi combo refs tó bàjẹ́ / àwọn ìlà aláìní-olùní |
| `omniroute_sync_pricing`           | `pricing:write`                      | Mú dátà ìdíyelé bá àwọn orísun ìta mu (LiteLLM); ó ṣe àtìlẹ́yìn `dryRun`                                   |

## Àwọn Irinṣẹ́ Cache (2)

| Irinṣẹ́                  | Àwọn Ààyè Àṣẹ | Àpèjúwe                                                  |
| :---------------------- | :------------ | :------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Àwọn ìṣirò semantic cache, prompt-cache, àti idempotency |
| `omniroute_cache_flush` | `write:cache` | Pa cache rẹ́ káàkiri tàbí nípasẹ̀ signature/model          |

## Awọn irin-iṣẹ funmorawon (13)

| Irinṣẹ                              | Awọn aaye           | Apejuwe                                                                                                          |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Awọn eto funmorawon, akopọ atupale, ati awọn iṣiro kaṣe-mọ (pẹlu `analytics.mcpDescriptionCompression` metadata) |
| `omniroute_compression_configure`   | `write:compression` | Ṣe atunto ipo funmorawon, iloro, ipin ibi-afẹde, itọju eto-kia, ijuwe funmorawon MCP                             |
| `omniroute_set_compression_engine`  | `write:compression` | Mu engine ti nṣiṣe lọwọ (off/caveman/rtk/stacked) ati kikankikan Caveman/RTK                                     |
| `omniroute_list_compression_combos` | `read:compression`  | Akojọ ti a npè ni combos funmorawon ati awọn won engine pipelines                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | Awọn atupale ṣe akojọpọ nipasẹ konbo funmorawon ati ẹrọ                                                          |
| `omniroute_ccr_store`               | `write:compression` | Tọju akoonu ti o yasọtọ olupe sinu ibi-ipamọ iranti CCR ile-itaja ati da asami pada pẹlu itọkasi `ccr://`        |
| `omniroute_ccr_retrieve`            | `read:compression`  | Gba akoonu CCR pada ni kikun tabi pẹlu ori, iru, awọn laini, grep, ati awọn ipo iṣiro                            |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspect caller-owned CCR metadata without returning content                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Ṣe atokọ awọn metadata paginated fun awọn bulọọki CCR ti olupe                                                   |
| `omniroute_ccr_delete`              | `write:compression` | Pa idinaki CCR ti olupe rẹ rẹ                                                                                    |
| `omniroute_ccr_stats`               | `read:compression`  | Jabọ lilo iranti ti olupe, awọn iṣiro igbesi aye, ati awọn opin ile itaja                                        |
| `omniroute_rtk_discover`            | `read:compression`  | Ṣe iwari ariwo loorekoore ni ijade-inu awọn ayẹwo igbejade RTK                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | Ṣe agbekalẹ apẹrẹ àlẹmọ RTK atunyẹwo lati awọn ayẹwo ijade                                                       |

awọn titẹ sii CCR lo ibi-itaja meji-ipele: ipele iranti ti o gbona ti o ṣe afẹyinti, lori awọn akoko asiko-awọsanma ti agbegbe, nipasẹ ipele SQLite ti o tọ (`ccr_blocks`, lori aiyipada) nitoribẹẹ bulọki kan ye kuro ni ilekuro tabi tun bẹrẹ titi TTL rẹ yoo fi jade — ayafi awọn bulọọki lori 512 KB ati awọn akoko asiko awọsanma, eyiti o duro iranti-lori. Bulọọki kọọkan ni opin si 2 MiB, ọkọọkan si 16 MiB, ati ile itaja agbaye si 64 MiB. Awọn titẹ sii aiyipada si 24-wakati TTL (o pọju ọjọ meje). Igbapada MCP ni kikun ni opin si 256 KiB; awọn bulọọki ti o tobi julọ wa nipasẹ awọn ipo larin ati awọn ipo grep. Ibi ipamọ, imupadabọ, kikojọ, ayewo, piparẹ, ati awọn iṣiro jẹ iyasọtọ nipasẹ oluṣakoso bọtini API-ifọwọsi. Awọn igbasilẹ iṣayẹwo ni awọn hashes ati metadata iwọn, ko ni akoonu rara. Awọn alaye ti nkọju si oniṣẹ (awọn ami ami meji, awọn ohun pataki alabara, `codemode:false`, awọn iwọn-ọpa-ọpa, pagination, ati matrix iwadii kan) n gbe ni [Awọn ẹrọ Imudarapọ → Awọn iṣaaju / itọsọna oniṣẹ](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` ṣe ijabọ funmorawon apejuwe MCP lọtọ labẹ `analytics.mcpDescriptionCompression`. Awọn iye wọnyẹn jẹ awọn iṣiro iwọn-metadata fun awọn apejuwe MCP ti a ṣe akojọ (`tools`, `prompts`, `resources`, ati `resourceTemplates`); wọn kii ṣe awọn sisanwo lilo olupese ati pe wọn samisi pẹlu `source: "mcp_metadata_estimate"`.

### MCP Ajọ Igi Wiwọle (v3.8.0)

Lọtọ si awọn irinṣẹ funmorawon loke, OmniRoute pẹlu àlẹmọ lẹhin-ipaniyan ti o compresses awọn** irinṣẹ esi** ti awọn irinṣẹ MCP browser/accessibility ṣaaju ki wọn to da wọn pada si oluranlowo. Àlẹmọ yii kii ṣe irinṣẹ — funrarẹ o nṣiṣẹ ni itara lori abajade irinṣẹ eyikeyi ti o ni iraye si-igi-igi tabi ọrọ-fọọti aṣawakiri (≥ 2000 chars).

Awọn iwa pataki:

- Pa ≥ 30 leralera awọn laini arakunrin leralera sinu akopọ iru + ori
- Ṣe itọju awọn ìdákọró `[ref=eXX]` ti o nilo nipasẹ Playwright/computer-use
- Lile-pipa ọrọ ti o tobi ju (> 50,000 chars) pẹlu itọka lilọ kiri
- Awọn ifipamọ ti a nireti:** 60–80%** lori awọn owo sisan aworan aworan aṣawakiri

Iṣeto ni: `compression.mcpAccessibility` ni agbaye eto (migration 056). imuse: `open-sse/services/compression/engines/mcpAccessibility/`. Awọn iwe-kikun kikun: [Awọn ẹrọ Imudanu — MCP Ajọ Igi Wiwọle](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Wo [Awọn enjini funmorawon](../compression/COMPRESSION_ENGINES.md) ati [RTK funmorawon](../compression/RTK_COMPRESSION.md) fun awoṣe funmorawon asiko isise lẹhin awọn irinṣẹ wọnyi.

## Àwọn Irinṣẹ́ 1Proxy (3)

| Irinṣẹ́                      | Àwọn àyè ìwọlé | Àpèjúwe                                                                         |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Gba àwọn proxy ọ̀fẹ́ láti ọjà 1proxy (àwọn àsẹ protocol/orílẹ̀-èdè/dídára/òpin)    |
| `omniroute_oneproxy_rotate` | `read:proxies` | Gba proxy tó wà nílẹ̀ tó tẹ̀lé nípasẹ̀ ọgbọ́n (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Àwọn ìṣirò àkójọpọ̀, ipò ìṣiṣẹ́pọ̀, àti pínpín gẹ́gẹ́ bí protocol àti orílẹ̀-èdè      |

## Àwọn Irinṣẹ́ Ìrántí (3)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/memoryTools.ts`. A ń fipá mú ìfàṣẹsí/àyè ìwọlé ṣiṣẹ́ nípasẹ̀ ìlànà àyè ìwọlé MCP tó ṣe déédé.

| Irinṣẹ́                    | Àwọn àyè ìwọlé | Àpèjúwe                                                                                     |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Ṣàwárí àwọn ìrántí nípasẹ̀ ìbéèrè / irú / kọ́kọ́rọ́ API pẹ̀lú ìmúlò òfin ààlà token              |
| `omniroute_memory_add`    | `write:memory` | Ṣàfikún àkọsílẹ̀ ìrántí tuntun (`factual` / `episodic` / `procedural` / `semantic`)          |
| `omniroute_memory_clear`  | `write:memory` | Pa àwọn ìrántí fún kọ́kọ́rọ́ API kan rẹ́, pẹ̀lú àsẹ àṣàyàn nípasẹ̀ irú tàbí àmì-àkókò `olderThan` |

## Àwọn Irinṣẹ́ Ọgbọ́n (4)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/skillTools.ts`. `src/lib/skills/registry` + `src/lib/skills/executor` ló ń ṣe àtìlẹ́yìn fún wọn.

| Irinṣẹ́                        | Àwọn àyè ìwọlé   | Àpèjúwe                                                                                        |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Ṣe àtòjọ àwọn ọgbọ́n tí a forúkọsílẹ̀ pẹ̀lú àsẹ àṣàyàn nípasẹ̀ kọ́kọ́rọ́ API, orúkọ, tàbí ipò ìmúṣiṣẹ́ |
| `omniroute_skills_enable`     | `write:skills`   | Mú ọgbọ́n pàtó kan ṣiṣẹ́ tàbí pa á nípasẹ̀ ID                                                     |
| `omniroute_skills_execute`    | `execute:skills` | Ṣe ọgbọ́n kan pẹ̀lú ìwọlé tí a pèsè, kí o sì dá àkọsílẹ̀ ìṣiṣẹ́ padà                               |
| `omniroute_skills_executions` | `read:skills`    | Ṣe àtòjọ ìtàn àwọn ìṣiṣẹ́ ọgbọ́n láìpẹ́                                                           |

## Orísun Àyíká-ọ̀rọ̀ Notion (6)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/notionTools.ts`. A fi token pamọ́ sínú tábìlì `key_value` nípasẹ̀ `src/lib/db/notion.ts`. Oníbàárà REST wà nínú `src/lib/notion/api.ts`. API ètò wà nínú `src/app/api/settings/notion/route.ts`. UI pátákó ìṣàkóso wà nínú `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Ṣètò token ìṣọ̀kan Notion rẹ láti taabu **Àwọn Orísun Àyíká-ọ̀rọ̀** nínú pátákó ìṣàkóso Endpoint, tàbí nípasẹ̀ REST API:

```bash
# Ṣètò token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Ṣàyẹ̀wò ipò
curl http://localhost:20128/api/settings/notion

# Já ìsopọ̀
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Irinṣẹ́                       | Àwọn àyè ìwọlé | Àpèjúwe                                                                          |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Ṣàwárí ọ̀rọ̀-kíkún jákèjádò gbogbo ojú-ewé àti ibi ìpamọ́ dátà                      |
| `notion_get_page`            | `read:notion`  | Gba ojú-ewé kan nípasẹ̀ ID pẹ̀lú àwọn ohun-ìní rẹ                                  |
| `notion_list_block_children` | `read:notion`  | Ṣe àtòjọ àwọn block ọmọ inú ojú-ewé tàbí block kan                               |
| `notion_query_database`      | `read:notion`  | Ṣe ìbéèrè sí ibi ìpamọ́ dátà pẹ̀lú àwọn àsẹ, àwọn ìtòlẹ́sẹẹsẹ, àti pípín sí ojú-ewé |
| `notion_get_database`        | `read:notion`  | Gba schema ibi ìpamọ́ dátà nípasẹ̀ ID                                              |
| `notion_append_blocks`       | `write:notion` | Ṣàfikún àwọn block ọmọ sí block òbí kan (ó pọ̀jù 100 fún ìbéèrè kọ̀ọ̀kan)           |

## Àwọn Irinṣẹ́ Àkójọ Ọgbọ́n Aṣojú (3)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/agentSkillTools.ts`. `src/lib/agentSkills/catalog` ni ó ń pèsè àtìlẹ́yìn fún wọn. Àwọn irinṣẹ́ wọ̀nyí ń ṣí àkójọ ìwé àkọsílẹ̀ Ọgbọ́n Aṣojú tó ní àkọsílẹ̀ 45 sílẹ̀ fún àwọn oníbárà MCP àti àwọn aṣojú ìta. Ààlà: `read:catalog`.

| Irinṣẹ́                            | Àwọn Ààlà      | Àpèjúwe                                                                                                                                 |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Ṣe àkójọ gbogbo ọgbọ́n aṣojú 45 pẹ̀lú àwọn àsẹ̀ `category` (api\|cli) àti `area` tí kò pọndandan; ó dá metadata + coverage padà            |
| `omniroute_agent_skills_get`      | `read:catalog` | Gba metadata kíkún + àkóónú SKILL.md fún ọgbọ́n kan ṣoṣo nípasẹ̀ `id` àṣẹ                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Àwọn ìṣirò coverage: mélòó nínú ọgbọ́n API 23, CLI 21 àti config 1 ni àwọn fáìlì SKILL.md lórí ètò fáìlì ní ìfiwéra pẹ̀lú àpapọ̀ inú àkójọ |

Wo [AGENT-SKILLS.md](./AGENT-SKILLS.md) fún àkójọ kíkún àti bí àwọn aṣojú ìta ṣe ń lò ó.

## Àwọn Framework Tó Jẹmọ́ (v3.8.0)

Àkójọ irinṣẹ́ MCP tó wà lókè (àwọn irinṣẹ́ aláìlẹ́ẹ̀ke 110, tí `countUniqueMcpTools()` ṣírò) ni a mọ̀ọ́mọ̀
fi ààlà sí àwọn iṣẹ́ routing/cache/compression/memory/skills/proxy/context-source ní àkókò ìṣiṣẹ́. Àwọn
framework méjì tó sún mọ́ ọn wà pẹ̀lú olupin MCP nínú v3.8.0, a sì ṣe àkọsílẹ̀ wọn lọ́tọ̀ọ̀tọ̀:

### Àwọn Aṣojú Cloud

Àwọn Aṣojú Cloud jẹ́ àwọn aṣojú AI fún kíkọ kóòdù tí ń ṣiṣẹ́ níta process (codex-cloud, cursor-cloud, devin, jules), tí a so mọ́
OmniRoute nípasẹ̀ àwòṣe ìsopọ̀ kan náà tí a ń lò fún àwọn olùpèsè LLM. A ṣí wọn sílẹ̀ nípasẹ̀
REST surface tiwọn (`/api/v1/agents/*`), wọn kò sì jẹ́ apá kan nínú àkójọ irinṣẹ́ MCP
— pípè Aṣojú Cloud kan kì í lo ààlà MCP kan.

- Ìmúṣẹ: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ìgbésí-ayé: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Ìwé àkọsílẹ̀: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Àwọn Guardrail

Àwọn Guardrail jẹ́ àsẹ̀ ṣáájú/lẹ́yìn ìmúṣẹ (vision-bridge, pii-masker, prompt-injection)
tí a fi sí inú pipeline ìbánisọ̀rọ̀. Wọn ń ṣiṣẹ́ kí a tó dé ipele irinṣẹ́/route MCP,
wọ́n sì ń fi àwọn ìrúfin tó ní ìṣètò ránṣẹ́ sí pipeline àyẹ̀wò; a kì í pè wọ́n gẹ́gẹ́ bí irinṣẹ́ MCP.

- Ìmúṣẹ: `src/lib/guardrails/`.
- Ìwé àkọsílẹ̀: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Nígbà tí o bá ń ṣàwárí àṣìṣe ìpè MCP kan tó dà bí ẹni pé a dínà rẹ̀, yẹ àkọsílẹ̀ àyẹ̀wò MCP méjèèjì wò
(àwọn àkọsílẹ̀ `scope_denied:*`) àti ipa ọ̀nà àyẹ̀wò guardrail — guardrail kan lè kọ ìbéèrè kan
**kí** ó tó dé ipele ìfipá-mú ààlà MCP rárá.

---

## Àwọn Endpoint REST API

| Endpoint               | Ọ̀nà                   | Àpèjúwe                                                                                               | Ìfàṣẹsí                 |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | Ipò olupin: heartbeat, ipò HTTP transport, àkótán iṣẹ́ àyẹ̀wò                                           | Ìṣàkóso (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Àkójọ irinṣẹ́ (orúkọ, àpèjúwe, àwọn ààlà, ipele, àwọn endpoint orísun)                                 | Ìṣàkóso                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint SSE transport (tí `mcpEnabled` + `mcpTransport === "sse"` ń ṣàkóso)                          | Kọ́kọ́rọ́ API + àwọn ààlà  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (ń lo header `mcp-session-id`; `DELETE` ń parí session)                     | Kọ́kọ́rọ́ API + àwọn ààlà  |
| `/api/mcp/audit`       | `GET`                 | Àwọn àkọsílẹ̀ audit láti `mcp_tool_audit` (àwọn àsẹ̀: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Ìṣàkóso                 |
| `/api/mcp/audit/stats` | `GET`                 | Àwọn ìṣirò audit àpapọ̀ (`totalCalls`, `successRate`, `avgDurationMs`, àwọn irinṣẹ́ tó ga jù)           | Ìṣàkóso                 |

Àwọn fáìlì orísun: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

A dènà àwọn transport SSE àti Streamable HTTP méjèèjì títí a ó fi mú olupin MCP ṣiṣẹ́ nínú Àwọn Ètò (`mcpEnabled`) tí a sì yan `mcpTransport` tó yẹ. Bí transport tí a ṣètò kò bá tọ́, route náà yóò dá HTTP 400 padà pẹ̀lú ìtọ́kasí láti yí àwọn ètò padà.

---

## Ijeri & Awọn aaye

Awọn ipe irinṣẹ MCP ka awọn gbolohun ọrọ ipari lati ọdọ olupe naa. Ayẹwo yẹn jẹ ọkan ninu awọn aye orukọ ominira mẹta. A kọja lati ọkan checker ni ko kan kọja lati awọn miiran. Awọn ofin jẹ [awọn aaye orukọ iwọn mẹta](#three-scope-namespaces). Katalogi irinṣẹ jẹ [awọn iwọn irinṣẹ MCP](#mcp-tool-scopes).

### Meta dopin awọn aaye orukọ

`manage` lori bọtini API, `read:compression` lori irinṣẹ MCP, ati `read` lori ami iraye si `oma_live_…` jẹ awọn ifunni oriṣiriṣi mẹta. Awọn olupe ti o fi ami ami wiwọle `read` ranṣẹ si ipa ọna iṣakoso iyipada gba HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Ipo yẹn jẹ `scopeSatisfies`. Ko ṣe ijumọsọrọpọ tabili MCP, ati pe akọrin MCP ko ni ijumọsọrọpọ rẹ.

| Ààyè orúkọ         | Ijẹrisi                                                                        | Oluyẹwo                      | A kọja laaye                               |
| :----------------- | :----------------------------------------------------------------------------- | :--------------------------- | :----------------------------------------- |
| API-bọtini isakoso | `api_keys.scopes`                                                              | `hasManageScope`             | REST isakoso fun awọn ti o Bearer bọtini   |
| API-bọtini aropo   | kanna orun, ọkan gangan okun                                                   | oluranlọwọ ti a npè ni isalẹ | Nikan ti o kan agbara                      |
| MCP ọpa scopes     | orun kanna, miiran MCP `_meta` (HTTP/SSE nikan), miiran `OMNIROUTE_MCP_SCOPES` | `scopeMatches`               | Ọpa yẹn, ni kete ti imuse ti wa ni titan   |
| Wiwọle àmi         | `oma_live_…`                                                                   | `scopeSatisfies`             | Ọna iṣakoso ti ọna ati ọna rẹ nilo ipo yẹn |

Minting iwe-ẹri kọọkan ni aabo ni [Ijeri Isakoso](../guides/MANAGEMENT-AUTH.md).

#### API-bọtini dopin

Eto `api_keys.scopes` kan n ṣe ifunni awọn iṣẹ meji. Wọn lo awọn iṣẹ oriṣiriṣi.

**Isakoso REST.** `manage` ati `admin` je omo egbe `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` jẹ ohun ti o fun laṣẹ awọn ipa ọna iṣakoso fun bọtini yẹn. `admin` jẹ agbara iṣakoso lori awọn ipa-ọna wọnyẹn. Ọrọ `admin` nibi kii ṣe ipo-iwọle ati pe ko faagun sinu awọn aaye irinṣẹ MCP.

**Awọn gbolohun ọrọ afikun.** Ọkọọkan jẹ idanwo ọmọ ẹgbẹ gangan, ati pe ọkọọkan duro ni ita `MANAGEMENT_API_KEY_SCOPES`.

| Ààlà                           | A kọja laaye                                                                                                                                                           |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Ti kii ṣe loopback `/api/mcp/` LOCAL_ONLY gbe-jade nikan (`hasMcpConnectOrManageScope`). Bọtini kan pẹlu `manage` tabi `admin` ṣi kọja ti o ya jade.                   |
| `self:usage`                   | `GET /api/v1/me/status` fun bọtini yii (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` ṣe afikun aaye yii lori ṣiṣẹda (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Awọn ipin iwe-ipamọ ti oke ti o wa ninu isanwo ipo yẹn (`src/lib/usage/apiKeySelfService.ts`). Ọna ipo ṣi nilo `self:usage`.                                           |
| `policy:bypass-provider-quota` | Awọn ipe itọka bọtini yi fo eto imulo ipin olupese (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                                      |

#### Ibamu

Katalogi naa jẹ tabili labẹ [awọn aaye irinṣẹ MCP](#mcp-tool-scopes). Ma ṣe tọju `MCP_SCOPE_LIST` ni `src/shared/constants/mcpScopes.ts` bi iwe-ipamọ yẹn: o jẹ ipilẹ ti a tẹ atilẹba. Awọn irinṣẹ nigbamii sọ awọn aaye siwaju sii lẹgbẹẹ rẹ (`read:notion`, `read:skills`, `read:local-corpus`, ati iyokù tabili).

`evaluateToolScopes` ni `open-sse/mcp-server/scopeEnforcement.ts` ngbanilaaye ipe nigbati gbogbo aaye ti a beere ba baamu diẹ ninu aaye ti a funni:

- `*` ibaamu gbogbo aaye ti a beere.
- Opin ti a funni ti o pari ni `*` baamu aaye ti a beere ti o bẹrẹ pẹlu ìpele ṣaaju ki irawọ naa. `read:*` ibaamu `read:compression`.
- Gbogbo aaye ti a funni ni ibamu nikan ni okun ti o nilo kanna.

Bọtini ti awọn aaye rẹ jẹ `["manage"]` kuna `scopeMatches` fun `read:compression`. Ipe kanna kuna fun `admin`, `mcp:connect`, `read`, ati `write` nigbati awọn nikan ni awọn gbolohun ọrọ ti a funni. Ko si awọn ilana laarin awọn aaye irinṣẹ MCP ti o kọja `*` titọpa.

Imudaniloju wa ni pipa ayafi ti `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (aiyipada `false`). Lakoko ti o wa ni pipa, `evaluateToolScopes` ngbanilaaye ipe ati fo katalogi naa. Lakoko ti o wa ni titan, HTTP nlo bọtini Bearer's `api_keys.scopes` bi `authInfo` (wo [Per-bọtini HTTP dopin abuda](#per-key-http-scope-binding-7895) ). Nigbati ko ba si awọn iwọn bọtini ti o yanju, eto ti a fun ni yoo ṣubu si MCP `_meta` (ti a bu ọla fun awọn olupe HTTP/SSE nikan, inu ọrọ auth HTTP kan; `_meta` olupe stdio kan ko bikita nitori pe alabara n ṣakoso rẹ ati pe ko ni idanimọ olupe), lẹhinna `OMNIROUTE_MCP_SCOPES`.

#### Wiwọle-àmi dopin

awọn ami `oma_live_…` (`src/lib/accessTokens/scopes.ts`) gbe `read`, `write`, tabi `admin`. `scopeSatisfies` jẹ ipo: `admin` bo `write` ati `read`, ati `write` bo `read`. Aimọ scopes bo ohunkohun.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ṣe afiwe ipo yẹn pẹlu `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, ati `OPTIONS` nilo `read`.
- Gbogbo ọna miiran nilo `write`.
- Awọn ọna ni `ADMIN_SCOPE_PREFIXES` nilo `admin` fun gbogbo ọna. `/api/mcp` wa lori atokọ yẹn, nitorinaa ami iraye si `write` ko le pe aaye MCP HTTP.
- Awọn ọna ni `ADMIN_MUTATION_PREFIXES` nilo `admin` nikan fun awọn iyipada.
- Awọn ipa ọna ni `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) nilo `admin` nikan fun awọn iyipada, ati pe lori ọna gangan — miiran `/api/settings/*` awọn ipa-ọna iha-ọna pa `write`.

`PATCH /api/keys/{id}` jẹ iyipada ati pe ko si lori awọn atokọ abojuto wọnyẹn, nitorinaa ami ami `read` kan gba 403 `Access token scope 'read' is insufficient; 'write' required.` A `write` tabi ami wiwọle `admin` ni itẹlọrun ipa-ọna yẹn. Dasibodu JWT, loopback CLI machine-id token, ati bọtini API kan pẹlu `manage` tabi `admin` mu awọn ẹka miiran ko si dín nipasẹ ipo yii.

Àmi wiwọle ti o kọja `scopeSatisfies` fun `/api/mcp` ti nu ẹnu-ọna iṣakoso nikan kuro. Awọn ipe irin-iṣẹ ṣi nṣiṣẹ `scopeMatches` lodi si awọn aaye bọtini API. Ipo-àmi wiwọle kii ṣe igbewọle si `scopeMatches`.

### MCP ọpa scopes

Imudaniloju aaye jẹ aarin aarin ni `open-sse/mcp-server/scopeEnforcement.ts`. Ọpa kọọkan nilo awọn aaye kan pato:

| Ààlà                  | Awọn irinṣẹ                                                                                                                                                                     |
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
| `read:obsidian`       | 13 ka awọn irinṣẹ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`,… |
| `write:obsidian`      | 9 kọ awọn irinṣẹ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`,…                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                               |

Awọn aaye kaadi Wild jẹ atilẹyin: `read:*` funni ni gbogbo awọn iwọn kika, `*` funni ni iwọle ni kikun.

### `mcp:connect` — agbara ipa ọna dín (#7895)

Gigun HTTP/SSE MCP irinna (`/api/mcp/*`) lati ti kii-loopback nbeere `/api/mcp/` LOCAL_ONLY carve-out (wo `docs/security/ROUTE_GUARD_TIERS.md`). Itan-akọọlẹ pe gbigbe-jade gba nikan ni kikun `manage`/`admin` -scope API bọtini — gbooro pupọ fun olupe ti o nilo lati sọrọ MCP nikan. `src/shared/constants/managementScopes.ts` n ṣe okeere `MCP_CONNECT_SCOPE = "mcp:connect"`: aropo kan, iwọn tooro (iṣaaju kanna bi `SELF_USAGE_SCOPE`) ti o fun laṣẹ ONLY fori `/api/mcp/` ni `src/server/authz/policies/management.ts` — ko funni ni iwọle si ọna iṣakoso miiran ati pe a mọọmọ tọju OUT ti `MANAGEMENT_API_KEY_SCOPES`. Bọtini kan ti o ni idaduro `manage`/`admin` ṣi kọja ohun-igi-jade ko yipada; `mcp:connect` jẹ yiyan anfani-kekere fun awọn olupe latọna jijin MCP-nikan, ṣayẹwo nipasẹ `hasMcpConnectOrManageScope()`.

### Bọtini-kọọkan HTTP abuda (#7895)

Lori HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` ni bayi ṣe ipinnu `api_keys.scopes` gidi ti olupe nipasẹ `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) o si gbe lọ si MCP SDK's `transport.handleRequest(req, { authInfo })`, nitorinaa `extra.authInfo.scopes` de ọdọ ipe ohun elo kọọkan ṣe afihan awọn aaye ti bọtini Bearer tirẹ. `scopeEnforcement.ts`'s `resolveCallerScopeContext()` ti ṣe pataki `authInfo` tẹlẹ lori `_meta` ati `OMNIROUTE_MCP_SCOPES` env fallback — eyi nikan ni o gbejade ni akọkọ, orisun pataki ti o ga julọ, eyiti a ko jẹ tẹlẹ lori HTTP. Nigbati bọtini API ko ba pinnu (ko si akọsori, bọtini invalid), `authInfo` duro `undefined` ati pe ipinnu ṣubu nipasẹ pq `meta`/env ti o wa tẹlẹ ko yipada. stdio ko ni idanimọ olupe kọọkan (wo `mcpCallerIdentity.ts`) ati pe ko ni ipa nipasẹ asopọ-bọtini — o fo igbesẹ `_meta` (`_meta` jẹ ọlá nikan inu ipo HTTP auth, #15159) ati pinnu lati bọtini `OMNIROUTE_MCP_SCOPES` env nikan.

**Ti fi agbara mu imuṣẹ fun awọn olupe HTTP/SSE ti o ni iwọn-diẹ laibikita `OMNIROUTE_MCP_ENFORCE_SCOPES`.** aiyipada `OMNIROUTE_MCP_ENFORCE_SCOPES` si `false` jẹ ailewu nikan fun sisan oniṣẹ ẹyọkan local/stdio, nibiti ko si idanimọ olupe kan lati dopin lodi si. `open-sse/mcp-server/server.ts::withScopeEnforcement()` yi imuṣiṣẹ agbara dopin-ọpa-ọpa lori lainidi (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) nigbakugba ti `resolveCallerScopeContext()` ṣe ipinnu `source === "authInfo"` (ie kan gidi fun bọtini-bọtini HTTP akọsori Aṣẹ, HTTP/SSE-only) AND bọtini yẹn ko ni idaduro aaye `manage`/`admin` ni kikun. Eyi tilekun aafo nibiti bọtini kan ti o dani ONLY dín `mcp:connect` fori dopin — ti a ṣe akọsilẹ loke bi ko ṣe laṣẹ nkankan bikoṣe `/api/mcp/` LOCAL_ONLY carve-out — le bibẹẹkọ pe gbogbo ohun elo MCP ni kete ti oniṣẹ ba ṣiṣẹ remote/non-loopback MCP wiwọle, nìkan nitori `OMNIROUTE_MCP_ENFORCE_SCOPES` ọkọ `false` nipasẹ aiyipada. Bọtini `manage`/`admin` ni kikun lori HTTP, ati gbogbo olupe stdio/local, tọju ihuwasi `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated ti o wa tẹlẹ ko yipada.

---

## Àwọn Àyípadà Àyíká

| Àyípadà                                 | Àiyípadà                                 | Ète                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                 | URL ìpìlẹ̀ tí olupin MCP ń lò nígbà tí ó bá ń pe àwọn API abẹ́nú OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_API_KEY`                     | (òfo)                                    | Kọ́kọ́rọ́ API tí a ń fi ránṣẹ́ sí àwọn ìpè API abẹ́nú gẹ́gẹ́ bí `Authorization: Bearer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` nìkan ló ń mú un ṣiṣẹ́) | Nígbà tí a bá mú un ṣiṣẹ́, àìsí àwọn scope yóò kọ àwọn ìpè irinṣẹ́, yóò sì kọ `scope_denied:<reason>` sínú àkọsílẹ̀ àyẹ̀wò. A tún máa fipá mú ìmúlò yìí ṣiṣẹ́ láìka àmì yìí sí fún olùpè HTTP/SSE èyíkéyìí tí a dá mọ̀ láti inú àkọlé Authorization fún kọ́kọ́rọ́ kọ̀ọ̀kan (`source === "authInfo"`) tí kò ní scope `manage`/`admin` kíkún — fún àpẹẹrẹ, kọ́kọ́rọ́ kan tí ó ní scope ìkọjá `mcp:connect` tóóró nìkan — nítorí náà, àiyípadà yìí kò léwu fún ìṣàn olùṣàkóso kan ṣoṣo ti agbègbè/stdio nìkan, kì í ṣe fún ìráàyèsí jíjìnnà tí kì í ṣe loopback láé |
| `OMNIROUTE_MCP_SCOPES`                  | (òfo)                                    | Àtòjọ àwọn scope tí a yà pẹ̀lú àmì kọ́má, tí a kà sí “tó wà” nípa àiyípadà (a máa ń lò ó nígbà tí olùpè kò bá pèsè àwọn scope tirẹ̀)                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (a kò ṣètò = ó ṣiṣẹ́)                     | Nígbà tí a bá ṣètò rẹ̀ sí `0/false/off/no`, ó máa dá fífúnpọ̀ àpèjúwe MCP dúró ní àkókò ìforúkọsílẹ̀                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (a kò ṣètò = ó ṣiṣẹ́)                     | Orúkọ àfidípò fún bọ́tìnì kan náà bí èyí tó wà lókè                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                  | Ìwọ̀n àkókò fífiṣẹ́ dúró fún àwọn ìkà ìṣàkóso abẹ́nú (ìlera, ìfaradà, àwọn àkójọpọ̀, ìpín, ìlò)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                  | Ìwọ̀n àkókò fífiṣẹ́ dúró fún àwọn ìgbésẹ̀ tí ń dúró de olùpèsè kan (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_DENY`                         | (a kò ṣètò = kò sí àlẹ́mọ́)                | Àwọn orúkọ irinṣẹ́ tí a yà pẹ̀lú àmì kọ́má láti yọ kúrò nínú `tools/list` (dídín iye àwọn irinṣẹ́ kù — wo ìsàlẹ̀)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_ALLOW`                        | (kò ṣètò = kò sí àlẹ́mọ́)                  | Àwọn orúkọ irinṣẹ́ tí a fi àmì kọ́má yà sọ́tọ̀ láti pa mọ́ ní àdáṣe (ipò àkójọ-ìyọ̀ǹda — wo ìsàlẹ̀)                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DATA_DIR`                              | `~/.omniroute`                           | A kọ fáìlì heartbeat sí `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## Ìkópọ̀ Àpèjúwe

Àwọn ibi ìforúkọsílẹ̀ irinṣẹ́, ìtọ́ni, àti ohun àmúlò MCP lè kó àwọn àpèjúwe pọ̀ ní àsìkò ìforúkọsílẹ̀/àkójọ láti dín iye metadata tí a fi hàn àwọn oníbàárà kù (àti nítorí náà, láti dín iye àyíká ìtọ́ni kù). Ìmúṣẹ náà wà nínú `open-sse/mcp-server/descriptionCompressor.ts`, a sì so ó mọ́ olupin MCP nípasẹ̀ `compressMcpRegistryMetadata` nínú `createMcpServer()`.

- Ìkópọ̀ máa ń ṣiṣẹ́ lórí ọ̀rọ̀ àpèjúwe ní lílo ètò òfin Caveman (`getRulesForContext("all", "full")`) pẹ̀lú yíyọ àwọn abala tí a dáàbò bo jáde (àwọn àlàfo kóòdù, àwọn búlọ́ọ̀kù tí a fi ààlà sí, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) kí àkóónú ìgbékalẹ̀ má bàa yí padà.
- Ṣàkóso rẹ̀ fún ìmúṣiṣẹ́ kọ̀ọ̀kan nípasẹ̀ iye `compression.mcpDescriptionCompressionEnabled` nínú tábìlì ètò `key_value` (àìyípadà: ó ṣiṣẹ́) — a fi hàn nínú UI gẹ́gẹ́ bí **Ìtúpalẹ̀ → Ìkópọ̀ àpèjúwe MCP**.
- Ṣàkóso rẹ̀ káàkiri gbogbo ìlànà nípasẹ̀ bóyá `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` tàbí `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- A fi àwọn ìṣirò àsìkò-gidi hàn nípasẹ̀ `omniroute_compression_status` lábẹ́ `analytics.mcpDescriptionCompression`, a sì fi àmì `source: "mcp_metadata_estimate"` sí wọn láti yà wọ́n sọ́tọ̀ kúrò nínú àwọn ẹ̀rí lílò olupèsè gidi.

---

## Ìdínkù Iye Àwọn Irinṣẹ́ (F4.3)

Ìkópọ̀ àpèjúwe máa ń dín metadata irinṣẹ́ kọ̀ọ̀kan kù; **ìdínkù iye àwọn irinṣẹ́** lọ síwájú sí i nípa dídín _iye_ àwọn irinṣẹ́ tí a kéde rárá kù. Kíkéde àwọn irinṣẹ́ díẹ̀ nínú manifest `tools/list` máa ń dín iye token fún ìbéèrè kọ̀ọ̀kan tí model oníbàárà ń ná lórí katalogi irinṣẹ́ kù (ìkópọ̀ “layer 5”). Ìmúṣẹ náà jẹ́ àsẹ̀ aláìní-state pátápátá nínú `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), tí a so mọ́ lúpù ìforúkọsílẹ̀ nínú `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**A gbọ́dọ̀ yàn án kí ó tó ṣiṣẹ́, ó sì wà ní pípa ní àkọ́kọ́.** Àsẹ̀ náà máa ń ṣiṣẹ́ nìkan nígbà tí ó kéré tán ọ̀kan lára àwọn environment variable méjì bá ti jẹ́ ṣíṣètò; tí a kò bá ṣètò èyíkéyìí, gbogbo irinṣẹ́ 110 ni a ó kéde láìsí ìyípadà.

| Variable         | Ìpo                                                                                                             |
| :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Àtòjọ-ìdènà — àwọn orúkọ irinṣẹ́ tí a fi àmì-comma yà, tí a máa ń yọ kúrò nínú `tools/list` ní gbogbo ìgbà       |
| `MCP_TOOL_ALLOW` | Àtòjọ-ìfàyègbà — àwọn orúkọ irinṣẹ́ tí a fi àmì-comma yà; àwọn wọ̀nyí nìkan ni yóò kù, gbogbo èyí tó kù ni a ó yọ |

`deny` ní ipò àkọ́kọ́ ju `allow` lọ. A fi àmì-comma ya àwọn orúkọ, a gé ààyè àfikún wọn kúrò, a sì kọbi ara sí àwọn àkọsílẹ̀ òfo. Àwọn àpẹẹrẹ:

```bash
# Yọ irinṣẹ́ méjì kúrò nínú katalogi
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Kéde àwọn irinṣẹ́ ìdarí-ọ̀nà àti quota nìkan (ìpo àtòjọ-ìfàyègbà)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Bí a ṣe ń yọ àwọn irinṣẹ́ tí a ti ṣe àsẹ̀ sí kúrò:** ìforúkọsílẹ̀ máa ń ṣàṣeyọrí ní gbogbo ìgbà; lẹ́yìn náà, irinṣẹ́ tí profile kọ̀ ni a máa ń `.disable()` lórí handle MCP SDK, nítorí náà kò ní farahàn nínú `tools/list`, ṣùgbọ́n àsopọ̀ rẹ̀ á dúró ṣinṣin (mímú ṣiṣẹ́/pípa tó mọ́, kò sí àtúnforúkọsílẹ̀). Parser profile náà ni `readMcpToolProfileFromEnv(process.env)`, èyí tí ó máa ń dá `null` padà (kò sí àsẹ̀) nígbà tí variable méjèèjì bá ṣófo.

Ìrísí `ToolProfile` tó kúnrẹ́rẹ́ sí i lẹ́yìn `reduceToolManifest` tún ṣe àtìlẹ́yìn fún àsẹ̀ ìkóríta scope (`allowScopes`, pẹ̀lú ìbámu wildcard irú `read:*`) àti ààlà `maxTools` tó máa ń fúnni ní àbájáde kan náà ní gbogbo ìgbà, ṣùgbọ́n àwọn ìṣàkóso méjèèjì yìí nílò manifest kíkún ní àkókò ìforúkọsílẹ̀, a kò sì tíì mú wọn jáde nípasẹ̀ àwọn environment variable lónìí (hook ní ipele `tools/list` jẹ́ iṣẹ́ ìtẹ̀lé tí a ń tọpinpin). `estimateManifestTokens()` wà fún fífi iye token manifest ṣáájú àti lẹ́yìn ìdínkù wéra.

---

## Ìlù-ọkàn Runtime

Transport stdio máa ń tọ́jú àmì pé ó ṣì wà láàyè sínú `${DATA_DIR}/runtime/mcp-heartbeat.json` ní gbogbo ìṣẹ́jú-àáyá 5. Dashboard (`/api/mcp/status`) máa ń ka fáìlì yìí pẹ̀lú àyẹ̀wò bóyá PID ṣì wà láàyè láti pinnu `online`. Àwọn transport HTTP máa ń fi state láti inú `getMcpHttpStatus()` tó ń ṣiṣẹ́ nínú process náà hàn dípò rẹ̀ (kò kọ fáìlì).

Snapshot ìlù-ọkàn náà ní:

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

## Ìkọ Àkọsílẹ̀ Àyẹ̀wò

Gbogbo ìpè irinṣẹ́ ni a máa ń kọ sínú tábìlì SQLite `mcp_tool_audit` nípasẹ̀ `open-sse/mcp-server/audit.ts`:

- Orúkọ irinṣẹ́, àwọn argument (tí a ṣe hash/gé kúrú gẹ́gẹ́ bí `auditLevel` irinṣẹ́ kọ̀ọ̀kan), àbájáde
- Iye àkókò ní ms, àmì àṣeyọrí/ìkùnà, ìfiránṣẹ́ àṣìṣe (nígbà tó bá yẹ)
- Hash kọ́kọ́rọ́ API, timestamp
- A máa ń kọ àwọn ìkọ̀sílẹ̀ scope sílẹ̀ gẹ́gẹ́ bí `scope_denied:<reason>` pẹ̀lú àtòjọ àwọn scope tí kò sí

Lo dashboard tàbí àwọn endpoint REST `/api/mcp/audit` àti `/api/mcp/audit/stats` láti ṣàyẹ̀wò àwọn ìpè àìpẹ́.

---

## Àwọn Fáìlì

| Fáìlì                                                                    | Ète                                                                     |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Ilé-iṣẹ́ olupin MCP, ibi ìbẹ̀rẹ̀ stdio, àwọn ìforúkọsílẹ̀ irinṣẹ́ tó ní ààlà |
| `open-sse/mcp-server/httpTransport.ts`                                   | Ìgbéjàde SSE + Streamable HTTP (ìṣàkóso session)                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Ìṣírò ààlà irinṣẹ́ àti ìyanjú olùpè                                      |
| `open-sse/mcp-server/audit.ts`                                           | Ìforúkọsílẹ̀ àyẹ̀wò ìpè irinṣẹ́ (`mcp_tool_audit`)                         |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Olùkọ heartbeat stdio (`mcp-heartbeat.json`)                            |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Ìfúnpọ̀ àpèjúwe fún àwọn ibi ìforúkọsílẹ̀ irinṣẹ́ / prompt / resource      |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Àwọn schema Zod + ibi ìforúkọsílẹ̀ irinṣẹ́ (`MCP_TOOLS`, àwọn àkọọlẹ̀ 45)  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + cache + àwọn olùṣàkóso irinṣẹ́ 1proxy                          |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Àwọn olùṣàkóso irinṣẹ́ ìfúnpọ̀                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Àwọn ìtumọ̀ irinṣẹ́ ìrántí (irinṣẹ́ 3)                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Àwọn ìtumọ̀ irinṣẹ́ ọgbọ́n (irinṣẹ́ 4)                                      |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Àwọn ìtumọ̀ irinṣẹ́ orísun àyíká-ọ̀rọ̀ Notion (irinṣẹ́ 6)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Àwọn ìtumọ̀ irinṣẹ́ ìsọdi-nǹkan-sí-eré (irinṣẹ́ 8)                         |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Ìforúkọsílẹ̀ plugin àti àwọn irinṣẹ́ ìṣàkóso (irinṣẹ́ 8)                   |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                              |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                               |
| `src/app/api/mcp/sse/route.ts`                                           | Ọ̀nà ìgbéjàde SSE `/api/mcp/sse`                                         |
| `src/app/api/mcp/stream/route.ts`                                        | Ọ̀nà ìgbéjàde Streamable HTTP `/api/mcp/stream`                          |
| `src/app/api/mcp/audit/route.ts`                                         | Ìbéèrè àkọsílẹ̀ àyẹ̀wò `/api/mcp/audit`                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Àwọn òṣùwọ̀n àyẹ̀wò àkójọpọ̀ `/api/mcp/audit/stats`                        |
| `src/lib/notion/api.ts`                                                  | Oníbàárà Notion REST API (àtúnṣè, àkókò-parí, ìpínsísọ̀rí àṣìṣe)         |
| `src/lib/db/notion.ts`                                                   | Ìtọ́jú token Notion (`key_value` table)                                  |
| `src/app/api/settings/notion/route.ts`                                   | API ètò Notion (GET/POST/DELETE)                                        |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI ìṣàkóso token Notion                                                 |
| `tests/unit/notion-api.test.ts`                                          | Àwọn ìdánwò oníbàárà Notion API (7)                                     |
| `tests/unit/notion-tools.test.ts`                                        | Àwọn ìdánwò ìmúlò ààlà àwọn irinṣẹ́ Notion (10)                          |
| `tests/unit/db/notion.test.mjs`                                          | Àwọn ìdánwò module DB Notion (3)                                        |
