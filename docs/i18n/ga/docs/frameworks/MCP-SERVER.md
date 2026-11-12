# OmniRoute MCP Server Documentation (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Freastalaí Model Context Protocol ina bhfuil 110 uirlis thar oibríochtaí ródaithe, taisce, comhbhrúite, cuimhne, scileanna, seachfhreastalaí, linn, Radar, agus foinse comhthéacs.
>
> Foinse na fírinne: ríomhann `open-sse/mcp-server/server.ts` **110 uirlis uathúla** le `countUniqueMcpTools()`: 45 sainmhíniú canónach (lena n-áirítear na sé uirlis saolré CCR, tríréad scileanna gníomhaire, `omniroute_radar_catalog`, agus `omniroute_x_search`), chomh maith le cuimhne (3), scileanna (4), scileanna GitHub (3), linn (6), cluicheú (8), breiseáin (8), Notion (6), Obsidian (22), corpas áitiúil (3), agus dhá uirlis chomhbhrúite RTK amháin.

## Suiteáil

Tá OmniRoute MCP ionsuite. Tosaigh é le:

```bash
omniroute --mcp
```

Nó tríd an iompar sse oscailte:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

Tá na hiompair HTTP (`sse` / `streamable-http`, a bhfreastalaíonn an freastalaí deais orthu in-phróiseála) múchta de réir réamhshocraithe agus ní raibh siad in ann ach scoránaigh ón leathanach `/dashboard/mcp` amháin roimhe seo. Mar v3.8.51 tá paireacht ag an CLI :

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH an `mcpEnabled` céanna (agus go roghnach `mcpTransport`) ag socrú an deais scoránaigh trí `/api/settings`. glaonna `mcp restart` `POST /api/mcp/restart`: deora sé síos seisiúin `sse`/`streamable-http` gníomhach agus mar sin ath-thionscnaíonn an chéad iarratas eile go glan, filleann `409` má tá MCP díchumasaithe, agus `501` le haghaidh an iompair `stdio` (tá a bhfophróiseas féin ag cliaint stdio — níl aon láimhseáil in-phróiseas le atosú).

## Iompar

Nochtann freastalaí MCP trí iompar, agus iad ar fad le tacaíocht ón monarcha `createMcpServer()` céanna:

| Iompar            | An áit                                      | Cathain le húsáid                                                  |
| :---------------- | :------------------------------------------ | :----------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Comhtháthuithe IDE (Claude Desktop, Cursor, srl.)                  |
| `sse`             | `POST/GET /api/mcp/sse` trí `httpTransport` | Cliaint brabhsálaí/oibríochtaí a dteastaíonn sruth imeachtaí uathu |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Cliaint HTTP il-seisiún (`mcp-session-id` ceanntásc)               |

Roghnaíonn an socrú `mcpTransport` iompar gníomhach HTTP (`sse` nó `streamable-http`). Dúnann malartú iompair na seisiúin atá ann cheana féin ar an iompar eile.

### Rochtain iargúlta (tearmann scóip an bhainistíochta)

Tá `/api/mcp/*` sa tairm `LOCAL_ONLY` (`src/server/authz/routeGuard.ts`) - de réir réamhshocraithe, ní féidir ach freastraitheoirí traschlasta (`localhost`, `127.0.0.1`, `::1`) teacht air. Ó v3.8.2, is féidir le cliaint nach iad iad féin traschlasta ceangal má chuireann siad `Authorization: Bearer <api-key>` i láthair a bhfuil an scóip `manage` ag an eochair. Is é seo an t-aon bhealach le teagmháil a dhéanamh leis an bhfreastalaí iargúlta MCP trí tunel, seachfhreastalaí cumhdaigh, óstainm poiblí.

```bash
# Deonaigh scóip bainistíochta: oscail an leathanach Eochracha API sa deais agus cuir go bhfuil
# "Rochtain Bhainistíochta" air san eochair, nó POST scopes:["manage"] agus tú ag cruthú.

# Ansin ceangail ó chliant iargúlta MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Filleann eochair nach bhfuil scóip bainistíochta aici (nó gan Bearer) `403 LOCAL_ONLY`. Ní féidir an t-iarmhír comharsanachta `/api/cli-tools/runtime/*` a sheachbhóthar go feasach - féach [Tairmeanna Cosanta Acmhainní — Marcáil Tharmainn Scóip Bainistíochta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Bailíochtú Origin

Tar éis fíordheimhnithe, déantar ceanntásc `Origin` gach iarratais chuig `/api/mcp/*` — na transports agus na bealaí bainistíochta ar nós `status`, `tools`, `audit`, `restart` — a bhailíochtú, cibé cé hé an glaoiteoir (eochair API, comhartha CLI, seisiún painéil, nó loopback gan ainm agus logáil isteach díchumasaithe). Seo í an chosaint ar DNS rebinding a éilíonn sonraíocht MCP Streamable HTTP.

- **Gan cheanntásc `Origin`** → ceadaithe. Ní sheolann OmniRoute CLI, an SDK ná cliaint IDE é.
- **`Origin` ceadaithe** → `localhost` / `127.0.0.1` / `[::1]` ar aon phort, nó bunús poiblí OmniRoute féin: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, an bunús a chuireann seachfhreastalaí droim ar ais iontaofa ar aghaidh (`OMNIROUTE_TRUST_PROXY`, ach amháin nuair nach bhfuil base URL socraithe), nó óstach IP loopback/LAN a rochtainítear go díreach. Ní dhéanann ceanntásc `Host` leis féin bunús iontaofa riamh.
- **Aon `Origin` eile, `null` san áireamh** → `403` le corp earráide JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Glactar fós le seisiún painéil a chuireann comhartha CSRF bailí i láthair, mar a dhéantar le scríbhinní eile an phainéil.

Teastaíonn `OMNIROUTE_PUBLIC_BASE_URL` ó chliant MCP brabhsálaí a fhreastalaítear taobh thiar de sheachfhreastalaí droim ar ais; níl liosta ceadaithe ann do bhunúis eile. Ní sheiceáiltear Origin ar réamhiarratas CORS (`OPTIONS`); seiceáiltear an t-iarratas a leanann é.

## Cumraíocht IDE

Féach [Cumraíocht Chliaint MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) le haghaidh Claude Desktop,
Cursor, Cline, agus socrú cliaint MCP comhoiriúnach.

---

## Uirlisí Riachtanacha (14) — Céim 1

| Uirlis                          | Scóip                 | Cur Síos                                                                                                                             |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, cuimhne, scoradáin chiorcaid, teorainneacha ráta, staitisticí taisce                                                         |
| `omniroute_list_combos`         | `read:combos`         | Gach combo cumraithe le straitéisí (méadracht roghnach)                                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | Méadracht feidhmíochta do combo ar leith                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | Combo a ghníomhachtú nó a dhíghníomhachtú                                                                                            |
| `omniroute_create_combo`        | `write:combos`        | Combo bailíochtaithe a chruthú tríd an API combo atá ann cheana                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Cuóta úsáidte/iomlán, céatadán fágtha, am athshocraithe, sláinte comhartha                                                           |
| `omniroute_route_request`       | `execute:completions` | Comhlánú comhrá a sheoladh trí ródú OmniRoute                                                                                        |
| `omniroute_cost_report`         | `read:usage`          | Tuarascáil costais de réir tréimhse (seisiún/lá/seachtain/mí)                                                                        |
| `omniroute_list_models_catalog` | `read:models`         | Catalóg iomlán samhlacha le cumais, stádas, praghsáil                                                                                |
| `omniroute_radar_catalog`       | `read:radar`          | Catalóg Radar sínithe áitiúil; scagairí roghnacha soláthraí/teaghlaigh                                                               |
| `omniroute_tool_search`         | `read:tools`          | Uirlisí a fháil amach ón gcatalóg MCP cláraithe                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Cuardach gréasáin trí na soláthraithe cuardaigh cumraithe. Ní X/Twitter.                                                             |
| `omniroute_x_search`            | `execute:search`      | Cuardach X trí xAI/SuperGrok, nó roghnaigh `xquik-search` le haghaidh torthaí API Xquik. Éilíonn dintiúir don chúlchóras roghnaithe. |
| `omniroute_web_fetch`           | `execute:search`      | Ábhar gréasáin a fháil trí na soláthraithe feitseála cumraithe                                                                       |

## Uirlisí Casta (11) — Céim 2

| Uirlis                             | Scóip                                | Cur Síos                                                                                                     |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Insamhladh ródaithe tirim le crann titim-siar                                                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | Buiséad seisiúin le gníomh díghrádaithe/coisc/foláirimh                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Nuashonraigh straitéis combo ag am rite (tosaíocht/meáite/uathoibríoch/srl.)                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Cuir réamhshocrú athléimneachta `aggressive` / `balanced` / `conservative` i bhfeidhm                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Tástáil bheo ar gach soláthróir i gcombo ag úsáid glao fíor-uasshrutha                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Méadracht in aghaidh an tsoláthróra le latency p50/p95/p99 agus staid scoradáin chiorcaid                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Mol combo de réir chineál tasc le srianta buiséid/latency                                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Mínigh cén fáth ar ródaíodh iarratas chuig soláthróir (fachtóirí scórála + titim-siar)                       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Léargas iomlán seisiúin: costas, comharthaí, samhlacha/soláthróirí is fearr, earráidí, garda buiséid         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnóisigh (agus deisigh go roghnach) sruth bunachair shonraí cosúil le tagairtí combo briste / ró-eangacha |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sync sonraí praghsála ó fhoinsí seachtracha (LiteLLM); tacaíonn sé le `dryRun`                               |

## Uirlisí Taisce (2)

| Uirlis                  | Scóip         | Cur Síos                                                              |
| :---------------------- | :------------ | :-------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Taisce shéimeantach, taisce leid, agus staitisticí idir-éifeachtachta |
| `omniroute_cache_flush` | `write:cache` | Sruthlaigh taisce go domhanda nó de réir sínithe/samhla               |

## Uirlisí Comhbhrú (13)

| Uirlis                              | Scóip               | Cur síos                                                                                                                                                     |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Socruithe comhbhrú, achoimre anailísíochta, agus staitisticí ar an eolas faoi thaisce (lena n-áirítear meiteashonraí `analytics.mcpDescriptionCompression` ) |
| `omniroute_compression_configure`   | `write:compression` | Cumraigh mód comhbhrú, tairseach, cóimheas sprice, caomhnú pras córais, scorán comhbhrú tuairisc MCP                                                         |
| `omniroute_set_compression_engine`  | `write:compression` | Roghnaigh an t-inneall gníomhach (off/caveman/rtk/stacked) agus an déine Caveman/RTK                                                                         |
| `omniroute_list_compression_combos` | `read:compression`  | Liostaigh combos comhbhrú ainmnithe agus a bpíblínte innill                                                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytics grúpáilte de réir teaglama comhbhrú agus inneall                                                                                                   |
| `omniroute_ccr_store`               | `write:compression` | Stóráil inneachar atá aonraithe ag an nglaoiteoir sa stór CCR i gcuimhne ar an teorainn agus seol ar ais marcóir móide tagairt `ccr://`                      |
| `omniroute_ccr_retrieve`            | `read:compression`  | Aisghabh ábhar CCR ina iomláine nó le modhanna cloigne, eireaball, línte, grep, agus stats                                                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | Iniúchadh meiteashonraí CCR atá faoi úinéireacht an ghlaoiteora gan inneachar a sheoladh ar ais                                                              |
| `omniroute_ccr_list`                | `read:compression`  | Liostaigh meiteashonraí uimhrithe maidir le bloic CCR atá faoi úinéireacht an ghlaoiteora                                                                    |
| `omniroute_ccr_delete`              | `write:compression` | Scrios bloc CCR atá faoi úinéireacht an ghlaoiteora                                                                                                          |
| `omniroute_ccr_stats`               | `read:compression`  | Tuairiscigh úsáid chuimhne a bhfuil scóip an té a ghlaoigh uirthi, cuntair saolré, agus teorainneacha stórais                                                |
| `omniroute_rtk_discover`            | `read:compression`  | Faigh amach torann athfhillteach i samplaí aschuir RTK rogha an diúltaithe                                                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | Gin dréacht scagaire RTK inathbhreithnithe ó shamplaí rogha an diúltaithe                                                                                    |

Úsáideann iontrálacha CCR stór dhá chiseal: sraith te i gcuimhne le tacaíocht, ar amanna rite neamh-scamall áitiúil, ag sraith durable SQLite (`ccr_blocks`, ar aghaidh de réir réamhshocraithe) mar sin maireann bloc díshealbhú nó atosú go dtí go n-imíonn a TTL amach — ach amháin bloic os cionn 512 KB agus amanna rite scamall, a fhanann cuimhne-amháin. Tá gach bloc teoranta do 2 MiB, gach príomhoide go 16 MiB, agus an siopa domhanda go 64 MiB. Réamhshocrú iontrálacha chuig TTL 24 uair an chloig (seacht lá ar a mhéad). Tá aisghabháil iomlán MCP teoranta do 256 KiB; tá bloic níos mó fós ar fáil trí na modhanna raoin agus grep. Tá stóráil, aisghabháil, liostú, cigireacht, scriosadh agus staitisticí aonraithe ag an bpríomhoide API-eochair fhíordheimhnithe. Tá hashes agus meiteashonraí méide i dtaifid iniúchta, ní ábhar iad. Tá sonraí os comhair an oibreora (an dá mharcóir, réamhriachtanais an chliaint, `codemode:false`, scóip in aghaidh an uirlis, uimhriú, agus maitrís dhiagnóiseach) ina gcónaí in [Innill Chomhbhrú → Réamhriachtanais / treoir oibreora](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

tuairiscíonn `omniroute_compression_status` comhbhrú tuairisc MCP ar leithligh faoi `analytics.mcpDescriptionCompression`. Is meastacháin ar mhéid meiteashonraí iad na luachanna sin le haghaidh tuairiscí inliostaithe MCP (`tools`, `prompts`, `resources`, agus `resourceTemplates`); ní admhálacha úsáide soláthraithe iad agus tá siad marcáilte le `source: "mcp_metadata_estimate"`.

### MCP Scagaire Crann Inrochtaineachta (v3.8.0)

Ar leithligh ó na huirlisí comhbhrú thuas, folaíonn OmniRoute scagaire iar-fhorghníomhaithe a chomhbhrúigh an** torthaí uirlisí** na n-uirlisí MCP browser/accessibility sula gcuirtear ar ais chuig an ngníomhaire iad. Ní uirlis é an scagaire seo féin — ritheann sé go trédhearcach ar aon toradh uirlise ina bhfuil téacs inrochtaineachta briathartha nó téacs brabhsálaí (≥ 2000 chars).

Príomh-iompraíochtaí:

- Laghdaíonn ≥ 30 líne siblín as a chéile arís agus arís eile go hachomair eireaball ceann +
- Caomhnaíonn sé ancairí `[ref=eXX]` a theastaíonn ó Playwright/computer-use
- Téacs atá ró-mhór le teascán crua (> 50,000 charn) le leid loingseoireachta
- Coigilteas ionchais:** 60–80%** ar uaslódálacha seat brabhsálaí

Cumraíocht: `compression.mcpAccessibility` i suíomhanna domhanda (imirce 056). Cur i bhfeidhm: `open-sse/services/compression/engines/mcpAccessibility/`. Doiciméid iomlána: [Innill Chomhbhrú — MCP Inrochtaineacht Crann Scagaire](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Féach [Innill Chomhbhrú](../compression/COMPRESSION_ENGINES.md) agus [Comhbhrú RTK](../compression/RTK_COMPRESSION.md) le haghaidh an tsamhail chomhbhrú ama rite taobh thiar de na huirlisí seo.

## Uirlisí 1Proxy (3)

| Uirlis                      | Scóipeanna     | Cur Síos                                                                                 |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Faigh saor-phróicsí ó mhargadh 1proxy (scagairí prótacail/tíre/cáilíochta/teorainn)      |
| `omniroute_oneproxy_rotate` | `read:proxies` | Faigh an chéad phróicsí ar fáil de réir straitéise (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Staitisticí polla, stádas sioncronaithe, dáileadh de réir prótacail agus tíre            |

## Uirlisí Cuimhne (3)

Sainmhínithe in `open-sse/mcp-server/tools/memoryTools.ts`. Cuirtear údarú/scóip i bhfeidhm tríd an stáslán scóipe MCP caighdeánach.

| Uirlis                    | Scóipeanna     | Cur Síos                                                                                         |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Cuardaigh cuimhní de réir iarratais / cineáil / eochair API le buiséid token á cur i bhfeidhm    |
| `omniroute_memory_add`    | `write:memory` | Cuir iontráil cuimhne nua leis (`factual` / `episodic` / `procedural` / `semantic`)              |
| `omniroute_memory_clear`  | `write:memory` | Glan cuimhní le haghaidh eochaire API, scagtha go roghnach de réir cineáil nó stampa `olderThan` |

## Uirlisí Scileanna (4)

Sainmhínithe in `open-sse/mcp-server/tools/skillTools.ts`. Tacaíocht ag `src/lib/skills/registry` + `src/lib/skills/executor`.

| Uirlis                        | Scóipeanna       | Cur Síos                                                                                           |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Liostaigh scileanna cláraithe le scagadh roghnach de réir eochaire API, ainm, nó stádas cumasaithe |
| `omniroute_skills_enable`     | `write:skills`   | Cumasaigh nó díchumasaigh scile ar leith de réir ID                                                |
| `omniroute_skills_execute`    | `execute:skills` | Rith scile le tionchur ar fáil agus fill ar an taifead rith                                        |
| `omniroute_skills_executions` | `read:skills`    | Liostaigh stair na rithanna scileanna le déanaí                                                    |

## Foinse Comhthéacs Notion (6)

Sainmhínithe in `open-sse/mcp-server/tools/notionTools.ts`. Stóráiltear an tseonm i mbunachar sonraí `key_value` trí `src/lib/db/notion.ts`./cliant REST in `src/lib/notion/api.ts`. API socruithe in `src/app/api/settings/notion/route.ts`. Taispeáint ID i `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Cumraigh do shonm comhtháthú Notion ón táb **Foinse Comhthéacs** san ionad deireadh, nó trí an REST API:

```bash
# Socrú sonm
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Seiceáil stádas
curl http://localhost:20128/api/settings/notion

# Dícheangal
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Uirlis                       | Scóipeanna     | Cur Síos                                                                                 |
| :--------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Cuardach téacs iomlán ar gach leathanach agus bunachar sonraí                            |
| `notion_get_page`            | `read:notion`  | Faigh leathanach de réir ID lena shaintréithe                                            |
| `notion_list_block_children` | `read:notion`  | Liostaigh na bloic pháistreacha de leathanach nó bloic                                   |
| `notion_query_database`      | `read:notion`  | Iarr ar bhunachar sonraí le scagairí, sórtáil agus leathanachú                           |
| `notion_get_database`        | `read:notion`  | Faigh scéimre bunachar sonraí de réir ID                                                 |
| `notion_append_blocks`       | `write:notion` | Ceangail bloic pháistreacha le bloic tuismitheora (uasmhéid 100 in aghaidh an iarratais) |

## Liosta Uirlisí Scileanna Gníomhaire (3)

Sainmhínithe in `open-sse/mcp-server/tools/agentSkillTools.ts`. Tacaíochta ag `src/lib/agentSkills/catalog`. Nochtann na huirlisí seo an catalóg scileanna gníomhaire 45 iontráil do chliant MCP agus gníomhairí seachtracha. Scóp: `read:catalog`.

| Uirlis                            | Scóipanna      | Cur Síos                                                                                                                                                              |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Liostaigh gach 45 scil gníomhaire le rogha scagairí `category` (api\|cli) agus `area`; tugann metadata + clúdach leis                                                 |
| `omniroute_agent_skills_get`      | `read:catalog` | Faigh metadata iomlán + ábhar SKILL.md do scil amháin le `id` canonach                                                                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | Staitisticí clúdaigh: cé méid de na 23 scil API, 21 scil CLI agus 1 scil cumraíochta atá comhaid SKILL.md acu ar anbhíomaíochtaí i gcomparáid leis na hiomlán catalóg |

Féach [AGENT-SKILL.md](./AGENT-SKILLS.md) le haghaidh an chatalóg iomlán agus conas a úsáideann gníomhairí seachtracha é.

## Creatanna Gaolmhara (v3.8.0)

Tá rith an MPCI uirlisí thuas (110 uirlis uathúil, á ríomh ag `countUniqueMcpTools()`) scópaithe go sonrach d'oibríochtaí rithseanais/ag privathabháil/comhbhrú/wuí/skills/proxy/context-source. Tá dhá chreat in aice teachta le freastalaí MPCI i v3.8.0 agus tá siad docummentáithe ar leith:

### Gníomhairí Scála

Is iad Gníomhairí Scála ná gníomhairí códála AI i bpróiseas seachtrach (codex-cloud, cursor-cloud, devin, jules) a nascadh le OmniRoute tríd an tsamhail nasc céanna a úsáidtear do sholáthraithe LLM. Nochtaítear iad trína dromchla REST féin (`/api/v1/agents/*`) agus **ní** bhaineann siad le catalóg uirlisí MPCI — ní íocann glao ar Ghníomhaire Scála le scóp MPCI.

- Impleachtú: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Saolré: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Doiciméadú: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Treoracha Sábháilteachta

Is iad Treoracha Sábháilteachta réamh/in-iardhírithe éisteachtaí (vision-bridge, pii-masker, prompt-injection) a chur i bhfeidhm taobh istigh de phiomsa comhrá. Rith siad sula bhfaighfidh siad an chiseal uirlisí/rithseanais MPCI agus seolann siad sáruithe struchtúrtha le pipelines iniúchta; ní ghlaoitear iad mar uirlisí MPCI.

- Impleachtú: `src/lib/guardrails/`.
- Doiciméadú: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Agus tú ag dífhabhtú glao MPCI a chosnaítear, déan iniúchadh ar an log iniúchta MPCI (iontrálacha `scope_denied:*`) agus ar an gcosán iniúchta treoracha — d'fhéadfadh go gcuirfí iarratas ar ceal ag treoras **sula bhfaighfidh sé an chiseal forfheidhmiúcháin scóp MPCI riamh.

---

## Toirt-pointí REST API

| Toirt-pointí           | Modh                  | Cur Síos                                                                                                 | Údarás                           |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `/api/mcp/status`      | `GET`                 | Stádas freastalaí: croí-theans, stádas iompar HTTP, achoimre gníomhaíochta iniúchta                      | Bainistíocht (seisiún/riarachán) |
| `/api/mcp/tools`       | `GET`                 | Catalóg uirlisí (ainm, cur síos, scóipanna, céim, toirt-pointí foinse)                                   | Bainistíocht                     |
| `/api/mcp/sse`         | `GET` / `POST`        | Toirt-pointí iompar SSE (cosnaithe ag `mcpEnabled` + `mcpTransport === "sse"`)                           | Eochair API + scóipanna          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Iompar HTTP in-stream (úsáideann ceanntásc `mcp-session-id`; cuireann `DELETE` an seisiún deireadh)      | Eochair API + scóipanna          |
| `/api/mcp/audit`       | `GET`                 | Iontrálacha log iniúchta ó `mcp_tool_audit` (scagairí: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Bainistíocht                     |
| `/api/mcp/audit/stats` | `GET`                 | Staitisticí iniúchta comhiomlána (`totalCalls`, `successRate`, `avgDurationMs`, uirlisí barr)            | Bainistíocht                     |

Foinsí comhaid: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Tá iompar SSE agus HTTP in-stream cosnaithe go dtí go ndéantar an freastalaí MPCI a chumasú i Socruithe (`mcpEnabled`) agus go roghnaítear an t-iompar `mcpTransport` cuí. Má chumraítear an t-iompar mícheart, fillfidh an rithse le HTTP 400 le leid chun socruithe a athrú.

## Fíordheimhniú & Scóip

Léann glaonna uirlis MCP teaghráin scóip ón nglaoiteoir. Tá an tseiceáil sin ar cheann de thrí ainmspás neamhspleácha. Ní pas ó sheiceálaí amháin pas ón gceann eile. [Trí ainmspás raon feidhme](#three-scope-namespaces) atá sna rialacha . Is éard atá sa chatalóg uirlisí ná [scopes uirlisí MCP](#mcp-tool-scopes).

### Trí ainmspás scóip

Is trí dheontas éagsúla iad `manage` ar eochair API, `read:compression` ar uirlis MCP, agus `read` ar chomhartha rochtana `oma_live_…`. Faigheann glaoiteoirí a sheolann comhartha rochtana `read` chuig bealach bainistíochta sóchán HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Is é an céim sin `scopeSatisfies`. Ní théann sé i gcomhairle leis an tábla MCP, agus ní théann an matcher MCP i gcomhairle leis.

| Ainmspás                 | Dintiúir                                                                      | seiceálaí                      | Ceadaíonn pas                                                       |
| :----------------------- | :---------------------------------------------------------------------------- | :----------------------------- | :------------------------------------------------------------------ |
| Bainistíocht eochair API | `api_keys.scopes`                                                             | `hasManageScope`               | Bainistíocht REST don eochair Iompróir sin                          |
| breiseán eochair API     | eagar céanna, teaghrán cruinn amháin                                          | an cúntóir atá ainmnithe thíos | Níl ach an cumas amháin sin                                         |
| scóip uirlisí MCP        | eagar céanna, eile MCP `_meta` (HTTP/SSE amháin), eile `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                 | An uirlis sin, a luaithe a bheidh forfheidhmiú curtha i gcrích      |
| Comhartha rochtana       | `oma_live_…`                                                                  | `scopeSatisfies`               | An bealach bainistíochta a éilíonn a modh agus a cosán an chéim sin |

Tá mionú gach dintiúr clúdaithe sa [Fhíordheimhniú Bainistíochta](../guides/MANAGEMENT-AUTH.md).

#### Scóipeanna eochair-API

Cothaíonn eagar `api_keys.scopes` amháin dhá phost. Úsáideann siad feidhmeanna éagsúla.

**REST.** Is iad `manage` agus `admin` baill `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). Is é `hasManageScope` a údaraíonn bealaí bainistíochta don eochair sin. tá `admin` in ann bainistíocht a dhéanamh ar na bealaí sin. Ní hé an focal `admin` anseo an chéim chomhartha rochtana agus ní leathnaíonn sé isteach i scóip uirlisí MCP.

**Teaghráin breiseán.** Is tástáil bhallraíochta chruinn gach ceann acu, agus fanann gach ceann acu lasmuigh `MANAGEMENT_API_KEY_SCOPES`.

| Raon feidhme                   | Ceadaíonn pas                                                                                                                                                            |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | An neamh-lúb `/api/mcp/` LOCAL_ONLY carve-out amháin (`hasMcpConnectOrManageScope`). Gabhann eochair le `manage` nó `admin` go fóill.                                    |
| `self:usage`                   | `GET /api/v1/me/status` don eochair seo (`src/app/api/v1/me/status/route.ts`). Cuireann `POST /api/keys` an scóip seo le create (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Cuótaí cuntais in aghaidh srutha taobh istigh den pálasta stádais sin (`src/lib/usage/apiKeySelfService.ts`). Tá `self:usage` fós ag teastáil don bhealach stádais .     |
| `policy:bypass-provider-quota` | Scipeáil glaonna tátal na heochrach seo an polasaí cuóta soláthraí (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                        |

#### Meaitseáil

Is é an catalóg an tábla faoi [scopes uirlis MCP](#mcp-tool-scopes). Ná caith `MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` mar an chatalóg sin: is é an fothacar clóscríofa bunaidh é. Dearbhaíonn uirlisí níos déanaí scóip bhreise in aice leis (`read:notion`, `read:skills`, `read:local-corpus`, agus an chuid eile den tábla).

Ceadaíonn `evaluateToolScopes` in `open-sse/mcp-server/scopeEnforcement.ts` glao nuair a mheaitseálann gach scóip riachtanach le raon feidhme a deonaíodh:

- meaitseálann `*` gach scóip riachtanach.
- Meaitseálann scóip dheonaithe a chríochnaíonn le `*` raon feidhme riachtanach a thosaíonn leis an réimír roimh an réalta. meaitseálann `read:*` `read:compression`.
- Ní mheaitseálann gach scóip eile a dheonaítear ach an teaghrán comhionann a theastaíonn.

Teipeann `scopeMatches` le haghaidh `read:compression` ar eochair a bhfuil a scóip `["manage"]`. Teipeann ar an nglao céanna le haghaidh `admin`, `mcp:connect`, `read`, agus `write` nuair is iad sin na teaghráin amháin a deonaíodh. Níl aon ordlathas i measc scopes uirlisí MCP níos faide ná an `*` trailing.

Tá forfheidhmiú múchta mura `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (réamhshocraithe `false`). Cé go bhfuil sé múchta, ceadaíonn `evaluateToolScopes` an glaoch agus scipeann sé an chatalóg. Cé go bhfuil sé ar siúl, úsáideann HTTP `api_keys.scopes` an eochair Iompróra mar `authInfo` (féach [Per-key ceangailteach raon feidhme HTTP](#per-key-http-scope-binding-7895) ). Nuair nach réitíonn eochairscóip, titfidh an tacar deonaithe go MCP `_meta` (onóir amháin do ghlaoiteoirí HTTP/SSE, taobh istigh de chomhthéacs HTTP auth; ní thugtar aird `_meta` an ghlaoiteora stdio toisc go rialaíonn an cliant é agus nach n-iompraíonn sé aon aitheantas in aghaidh an ghlaoiteora), ansin `OMNIROUTE_MCP_SCOPES`.

#### Scóip chomhartha rochtana

iompraíonn comharthaí `oma_live_…` (`src/lib/accessTokens/scopes.ts`) `read`, `write`, nó `admin`. Is céim é `scopeSatisfies` : clúdaíonn `admin` `write` agus `read`, agus clúdaíonn `write` `read`. Ní chlúdaíonn scóip anaithnid rud ar bith.

Déanann `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) an chéim sin i gcomparáid le `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- Teastaíonn `GET`, `HEAD`, agus `OPTIONS` `read`.
- Éilíonn gach modh eile `write`.
- Teastaíonn `admin` le haghaidh cosáin i `ADMIN_SCOPE_PREFIXES` le haghaidh gach modha. Tá `/api/mcp` ar an liosta sin, mar sin ní féidir glaoch ar chomhartha rochtana `write` fós ar an dromchla MCP HTTP.
- Ní theastaíonn `admin` ach amháin le haghaidh sócháin amháin le haghaidh cosáin i `ADMIN_MUTATION_PREFIXES`.
- Ní éilíonn cosáin i `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) `admin` ach amháin le haghaidh sócháin, agus ar an gcosán cruinn sin amháin coinníonn — fo-bhealaí eile `/api/settings/*` `write`.

Is sóchán é `PATCH /api/keys/{id}` agus níl sé ar na liostaí riaracháin sin, mar sin faigheann comhartha `read` 403 `Access token scope 'read' is insufficient; 'write' required.` Sásaíonn comhartha rochtana `write` nó `admin` an bealach sin. Glacann painéal JWT, an comhartha meaisín-id loopback CLI, agus eochair API le `manage` nó `admin` brainsí eile agus ní cúngaítear iad ag an gcéim seo.

Níl ach an geata bainistíochta glanta ag comhartha rochtana a théann thar `scopeSatisfies` do `/api/mcp`. Ritheann glaonna uirlisí `scopeMatches` fós i gcoinne scóip eochair-API. Ní ionchur chuig `scopeMatches` é an t-ainm comhartha rochtana.

### scóip uirlisí MCP

Tá raon feidhme forfheidhmithe láraithe in `open-sse/mcp-server/scopeEnforcement.ts`. Tá scóip shonracha ag teastáil ó gach uirlis:

| Raon feidhme          | Uirlisí                                                                                                                                                                        |
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
| `read:obsidian`       | 13 uirlis léite — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 uirlisí scríobh — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …             |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                              |

Tacaítear le scópanna saoróg: tugann `read:*` cead do gach scóip léite, tugann `*` rochtain iomlán.

### cumas caolbhealaigh `mcp:connect` — (#7895)

Chun an t-iompar HTTP/SSE MCP (`/api/mcp/*`) a bhaint amach ó neamh-lúb tá gá le `/api/mcp/` LOCAL_ONLY carve-out (féach `docs/security/ROUTE_GUARD_TIERS.md`). Go stairiúil níor ghlac an carve-out ach eochair iomlán `manage`/`admin` -scope API — ró-leathan do ghlaoiteoir nach gá dó ach labhairt MCP. Onnmhairíonn `src/shared/constants/managementScopes.ts` anois `MCP_CONNECT_SCOPE = "mcp:connect"`: breiseán, raon feidhme cúng (fasach céanna le `SELF_USAGE_SCOPE`) a údaraíonn ONLY an seachbhóthar `/api/mcp/` i `src/server/authz/policies/management.ts` — ní thugann sé aon rochtain eile ar bhealaí bainistíochta agus a choinnítear d'aon ghnó OUT of `MANAGEMENT_API_KEY_SCOPES`. Gabhann eochair-shealbhú `manage`/`admin` an carve-amach gan athrú; Is rogha eile le pribhléid níos ísle é `mcp:connect` do ghlaoiteoirí cianda MCP amháin, arna sheiceáil trí `hasMcpConnectOrManageScope()`.

### Ceangal scóip HTTP per-eochair (#7895)

Thar HTTP/SSE, réitíonn `open-sse/mcp-server/httpTransport.ts` fíor- `api_keys.scopes` an ghlaoiteora trí `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) anois agus cuireann sé ar aghaidh chuig `transport.handleRequest(req, { authInfo })` an MCP SDK, agus mar sin léiríonn `extra.authInfo.scopes` gach glao uirlise scóip an Iompróra féin. Thug `scopeEnforcement.ts`'s `resolveCallerScopeContext()` tosaíocht do `authInfo` cheana féin thar an `_meta` agus `OMNIROUTE_MCP_SCOPES` env fallback — ní léiríonn sé seo ach an chéad fhoinse is airde tosaíochta, nach raibh á chothú roimhe seo thar HTTP. Nuair nach réitíonn aon eochair API (gan ceanntásc, eochair neamhbhailí), fanann `authInfo` `undefined` agus titeann an taifeach tríd go dtí an slabhra `meta`/env atá ann cheana féin gan athrú. Níl aon chéannacht in aghaidh an ghlaoiteora ag stdio (féach `mcpCallerIdentity.ts`) agus ní chuireann an ceangal in aghaidh na heochrach — isteach air ní scipeann sé an chéim `_meta` (ní thugtar onóir `_meta` ach laistigh de chomhthéacs HTTP auth, #15159) agus réitíonn sé ón eochair env `OMNIROUTE_MCP_SCOPES` amháin.

**Cuirtear iallach ar ghlaoiteoirí scóip chaol HTTP/SSE beag beann ar `OMNIROUTE_MCP_ENFORCE_SCOPES`.** Níl mainneachtain `OMNIROUTE_MCP_ENFORCE_SCOPES` go `false` ach sábháilte do shreabhadh oibritheora aonair local/stdio, nuair nach bhfuil aon chéannacht in aghaidh an ghlaoiteora le scóip ina aghaidh. Déanann `open-sse/mcp-server/server.ts::withScopeEnforcement()` forfheidhmiú scóip in aghaidh na huirlise a iompú go neamhchoinníollach (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) aon uair a réitíonn `resolveCallerScopeContext()` `source === "authInfo"` (.i. fíorcheannteideal údaraithe HTTP per-eochair, HTTP/SSE-only) AND níl scóip iomlán `manage`/`admin` ag an eochair sin. Dúnann sé seo an bhearna ina bhféadfadh eochair-shealbhú ONLY an scóip sheachbhóthar caol `mcp:connect` — doiciméadaithe thuas mar ní a údarú ach an `/api/mcp/` LOCAL_ONLY carve-out — a d’fhéadfadh gach uirlis MCP a agairt ar shlí eile nuair a chumasaigh oibreoir rochtain remote/non-loopback MCP, go simplí mar gheall ar longa `OMNIROUTE_MCP_ENFORCE_SCOPES` `false` de réir réamhshocraithe. Eochair `manage`/`admin` iomlán os cionn HTTP, agus gach glaoiteoir stdio/local, coinnigh an t-iompar `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated reatha gan athrú.

---

## Athróga Timpeallachta

| Athróg                                  | Réamhshocrú                             | Cuspóir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | URL bonn a úsáideann an freastalaí MCP agus é ag glaoch ar APIanna inmheánacha OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_API_KEY`                     | (folamh)                                | Eochair API a chuirtear ar aghaidh mar `Authorization: Bearer` chuig glaonna API inmheánacha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (ní chumasaíonn ach `"true"` é) | Nuair a chumasaítear é, diúltaíonn scóip atá ar iarraidh glaonna uirlisí agus logálann siad `scope_denied:<reason>` sa loga iniúchta. Cuirtear forfheidhmiú i bhfeidhm FREISIN beag beann ar an mbratach seo d’aon ghlaoiteoir HTTP/SSE a réitítear ó cheanntásc Authorization in aghaidh na heochrach (`source === "authInfo"`) nach bhfuil scóip iomlán `manage`/`admin` aige — m.sh. eochair nach bhfuil aici ach scóip sheachanta chúng `mcp:connect` — mar sin níl an réamhshocrú seo sábháilte ach amháin don sreabhadh áitiúil/stdio d’oibreoir aonair, agus ní do chianrochtain neamh-loopback riamh |
| `OMNIROUTE_MCP_SCOPES`                  | (folamh)                                | Liosta ceadaithe scóp, deighilte le camóga, a mheastar a bheith “ar fáil” de réir réamhshocraithe (úsáidtear é nuair nach soláthraíonn an glaoiteoir a scóip féin)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (gan socrú = ann)                       | Nuair a shocraítear é go `0/false/off/no`, díchumasaítear comhbhrú tuairiscí MCP tráth an chlárúcháin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (gan socrú = ann)                       | Ailias malartach don scorán céanna thuas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | Buiséad tobscortha do léamha bainistíochta inmheánacha (sláinte, athléimneacht, teaglamaí, cuóta, úsáid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | Buiséad tobscortha do leannlusanna a fhanann le soláthraí (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_DENY`                         | (gan socrú = gan scagaire)              | Ainmneacha uirlisí, deighilte le camóga, atá le baint ó `tools/list` (laghdú ar chairdinéalacht uirlisí — féach thíos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_ALLOW`                        | (gan socrú = gan scagaire)              | Ainmneacha uirlisí scartha le camóga le coinneáil go heisiach (mód liosta ceadaithe — féach thíos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `DATA_DIR`                              | `~/.omniroute`                          | Scríobhtar an comhad buille croí chuig `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

---

## Comhbhrú Cur Síosa

Is féidir le formáidí uirlisí, leideanna, acmhainneacha MCP cur síos a chomhbhrú ag am clárnachais/liosta chun an t-aitheantas meiteashonraí a nochtar do chliaint a laghdú (agus mar sin an costas comhthéacs leideanna). Tá an t-impleacht suite i `open-sse/mcp-server/descriptionCompressor.ts` agus tá sé ceangailte isteach sa MCP freastalaí trí `compressMcpRegistryMetadata` laistigh de `createMcpServer()`.

- Rithann comhbhrú thar an téacs cur síos ag baint úsáide as an tacar rialacha Caveman (`getRulesForContext("all", "full")`) le gabháil blocanna stóráilte (spásanna cód, blocanna fallaí, srl.) ionas nach n-athraítear ábhar struchtúrach.
- Cuir tús/tuirlingt in aghaidh an imscaraidh tríd an luach `compression.mcpDescriptionCompressionEnabled` sa tábla socruithe `key_value` (réamhshocrú: cumasaithe) — nochtar sa tsiúl mar **Anailís → Comhbhrú cur síos MCP**.
- Cuir tús/tuirlingt tríd an phróiseas trí `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` nó `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Nochtar staitisticí fíor-ama trí `omniroute_compression_status` faoi `analytics.mcpDescriptionCompression` agus tá sé marcáilte le `source: "mcp_metadata_estimate"` chun é a dhifriú ó admhálacha úsáide soláthraí fíor.

## Laghdú Líon na nUirlisí (F4.3)

Cuireann comhbhrú cur síos ar mhéadrachtaí gach uirlis i bhfeidhm; téann **laghdú uirlis-lion** níos faide fós trí laghdú ar _cé mhéad_ uirlis a fógraítear ar chor ar bith. Laghdaíonn fógraíocht níos lú uirlisí i liosta Manifest `tools/list` an costas comhartha in aghaidh an iarratais a íocann múnla an chliaint don chatalóg uirlisí ("comhbhrú sraith 5"). Is scagaire neamhstáit gan stáit iad an t-impriseamh in `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), a nasctar isteach sa lúb clárnúcháin in `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Roghnach, as amhlaidh de réir réamhshocraithe.** Ní rithann an scagaire ach nuair a shocrútear a laghad de dhá athróg timpeallachta; gan iad á socrú, fógraítear na 110 uirlis go léir gan athrú.

| Athróg           | Mód                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Dubhliosta — ainmneacha uirlisí scartha le camóg a bhaintear i gcónaí ó `tools/list`                     |
| `MCP_TOOL_ALLOW` | Liosta ceadaithe — ainmneacha uirlisí scartha le camóg; ní maireann ach iad seo, tógtar gach rud eile as |

Tosaíonn `deny` os cionn `allow`. Scartha le camóg iad na hainmneacha, baintear spásanna bána, agus fágann iad a bhaineann le folamh ina n-éagsúla. Samplaí:

```bash
# Bain dhá uirlis as an catalóg
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Fógraigh ach na huirlisí ródú + cuóta (mód liosta ceadaithe)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Conas a bhaintear uirlisí scagtha:** éiríonn le clárnúchán i gcónaí; díultaíonn próifíl uirlis ansin ar an sciath MCP SDK trí `.disable()`, ionas nach bhfeicfear riamh iad in `tools/list` ach go gcoinneoidh an nascadh i bhfeidhm (cumasaigh/díchumasaigh glan, gan athchlárnú). Is é an parsálaí próifíle `readMcpToolProfileFromEnv(process.env)`, a thugann `null` (gan scagadh) ar ais nuair a bhíonn an dá athróg folamh.

Tacaíonn an cruth níos saibhre `ToolProfile` atá taobh thiar de `reduceToolManifest` le scagadh idirbhreise scópa (`allowScopes`, le meaitseáil saoire stíl `read:*`) agus le huasteorainn `maxTools` cinnte, ach teastaíonn an manifest iomlán ag am clárnúcháin le haghaidh an dá chnaipe sin agus ní bhíonn siad **nochttha** tríd na haithreacha timpeallachta inniu (tá beanntán leibhéal `tools/list` á rianú mar leanúint). Tá `estimateManifestTokens()` ar fáil le costas comhartha an manifest a chur i gcomparáid roimh agus i ndiaidh an laghduithe.

---

## Beatha Rith-ama

Coinníonn an t-iompar stdio beo i `${DATA_DIR}/runtime/mcp-heartbeat.json` gach 5 soicind. Léann an deasc (`/api/mcp/status`) an comhad seo móide beo PID chun `online` a tharraingt as. Tuairiscíonn iompair HTTP stát ó `getMcpHttpStatus()` sa phróiseas ina ionad (gan scríobh comhaid).

Tá an seat beatha ann:

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

## Taifeadadh iniúchadh

Taifeadtar gach glao uirlise sa tábla SQLite `mcp_tool_audit` trí `open-sse/mcp-server/audit.ts`:

- Ainm na huirlise, argóintí (hasháilte gearrtha de réir `auditLevel` in aghaidh na huirlise), toradh
- Fad ama i ms, bratach ratha/teipthe, teachtaireacht earráide (nuair is infheidhme)
- Hais eochair API, stampa ama
- Diúltaí scópa taifeadtar mar `scope_denied:<reason>` le liosta na scópanna atá in easnamh

Úsáid an deasc nó na pointí stad REST `/api/mcp/audit` agus `/api/mcp/audit/stats` chun glaonna le déanaí a iniúchadh.

---

## Comhaid

| Comhaid                                                                  | Cuspóir                                                               |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | monarcha freastalaí MCP, pointe istigh stdio, clárlann uirlisí scóipe |
| `open-sse/mcp-server/httpTransport.ts`                                   | Iompar SSE + HTTP in-inrite (bhainistíocht seisiúin)                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Measúnú scóip uirlisí agus réiteach glaoiteora                        |
| `open-sse/mcp-server/audit.ts`                                           | logáil iniúchta glao uirlisí (`mcp_tool_audit`)                       |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | scríobhaí croí-defined stdio (`mcp-heartbeat.json`)                   |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | comhbhrú cur síos do chlárlanna uirlisí / leid / acmhainne            |
| `open-sse/mcp-server/schemas/tools.ts`                                   | scéimeanna Zod + clárlann uirlisí (`MCP_TOOLS`, 45 iontráil)          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | láimhseálaithe uirlisí Céim 2 + taisce + 1proxy                       |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | láimhseálaithe uirlisí comhbhrú                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | sainmhínithe uirlisí cuimhne (3 uirlis)                               |
| `open-sse/mcp-server/tools/skillTools.ts`                                | sainmhínithe uirlisí scile (4 uirlis)                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | sainmhínithe uirlisí foinse comhthéacs Notion (6 uirlis)              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | sainmhínithe uirlisí cluichithe (8 uirlis)                            |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | uirlisí clárlanna agus bainistíochta breiseán (8 uirlis)              |
| `src/app/api/mcp/status/route.ts`                                        | _pointe deiridh `/api/mcp/status`                                     |
| `src/app/api/mcp/tools/route.ts`                                         | pointe deiridh `/api/mcp/tools`                                       |
| `src/app/api/mcp/sse/route.ts`                                           | cosán iompar SSE `/api/mcp/sse`                                       |
| `src/app/api/mcp/stream/route.ts`                                        | cosán iompar HTTP in-inrite `/api/mcp/stream`                         |
| `src/app/api/mcp/audit/route.ts`                                         | iarratas loga iniúchta `/api/mcp/audit`                               |
| `src/app/api/mcp/audit/stats/route.ts`                                   | méadrachtaí iniúchta comhiomlán `/api/mcp/audit/stats`                |
| `src/lib/notion/api.ts`                                                  | cliant REST API Notion (attempts arís, am amach, aicmiú earráid)      |
| `src/lib/db/notion.ts`                                                   | seasmhacht comhartha Notion (`key_value` tábla)                       |
| `src/app/api/settings/notion/route.ts`                                   | API socruithe Notion (GET/POST/DELETE)                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | comhéadan bainistíochta comhartha Notion                              |
| `tests/unit/notion-api.test.ts`                                          | tástálacha cliant API Notion (7)                                      |
| `tests/unit/notion-tools.test.ts`                                        | tástálacha forfheidhmiú scóip uirlisí Notion (10)                     |
| `tests/unit/db/notion.test.mjs`                                          | tástálanna modúil DB Notion (3)                                       |
