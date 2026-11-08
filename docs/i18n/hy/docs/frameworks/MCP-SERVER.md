# OmniRoute MCP Server Documentation (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Համատեքստային արձանագրության մոդելի սերվեր՝ 110 գործիքներով երթուղման, քեշի, սեղմման, հիշողության, հմտությունների, վստահված անձի, լողավազանի, Ռադարի և համատեքստի աղբյուրի գործառնությունների համար:
>
> Ճշմարտության աղբյուրը՝ `open-sse/mcp-server/server.ts` computes** 110 եզակի գործիքներ** `countUniqueMcpTools()` ով. 45 կանոնական սահմանումներ (ներառյալ CCR կյանքի ցիկլի վեց գործիքները, գործակալ-հմտությունների եռյակը, `omniroute_radar_catalog`, և `omniroute_x_search`), գումարած հիշողություն (3), հմտություններ (4), GitHub հմտություններ (3), լողավազան (6), խաղացում (8), պլագիններ (8), Notion (22) և լոկալ Obsidian : սեղմման գործիքներ.

## Տեղադրում

OmniRoute MCP ներկառուցված է. Սկսեք այն հետևյալով.

```bash
omniroute --mcp
```

Կամ բաց տրանսպորտի միջոցով.

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

HTTP փոխադրումները (`sse` / `streamable-http`, սպասարկվում են ցուցատախտակի սերվերի կողմից) լռելյայն անջատված են և նախկինում փոխարկվում էին միայն `/dashboard/mcp` էջից: v3.8.51-ի դրությամբ CLI ունի հավասարություն.

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH նույն `mcpEnabled` (և ըստ ցանկության `mcpTransport`), որը կարգավորում է վահանակի միացումը `/api/settings` միջոցով: `mcp restart` կանչում է `POST /api/mcp/restart`. այն քանդում է `sse`/`streamable-http` ակտիվ նիստերը, այնպես որ հաջորդ հարցումը նորից սկզբնավորվում է մաքուր կերպով, վերադարձնում է `409`, եթե MCP անջատված է, և `501` `stdio` տրանսպորտի համար (stdio հաճախորդներն ունեն իրենց սեփական ենթապրոցեսը — վերագործարկելու համար ներգործող բռնակ չկա):

## Տրանսպորտ

MCP սերվերը բացահայտում է երեք փոխադրումներ, բոլորն էլ ապահովված են նույն `createMcpServer()` գործարանի կողմից.

| Տրանսպորտ         | Որտեղ                                           | Երբ օգտագործել                                                       |
| :---------------- | :---------------------------------------------- | :------------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | IDE ինտեգրումներ (Claude Desktop, Cursor և այլն)                     |
| `sse`             | `POST/GET /api/mcp/sse` միջոցով `httpTransport` | Browser/agent հաճախորդներ, որոնց անհրաժեշտ է իրադարձությունների հոսք |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Բազմաթիվ նստաշրջան HTTP հաճախորդներ (`mcp-session-id` վերնագիր)      |

Ակտիվ HTTP տրանսպորտը (`sse` կամ `streamable-http`) ընտրվում է `mcpTransport` պարամետրով: Տրանսպորտի փոխարկումը փակում է մյուս տրանսպորտի առկա նիստերը:

### Հեռավոր մուտք (կառավարել շրջանակի շրջանցում)

`/api/mcp/*` գտնվում է LOCAL_ONLY մակարդակում (`src/server/authz/routeGuard.ts`) — լռելյայնորեն միայն loopback հոստերերը (`localhost`, `127.0.0.1`, `::1`) կարող են հասնել դրան: Քանի որ v3.8.2-ը, ոչ loopback հաճախորդները կարող են միանալ, եթե նրանք ներկայացնում են `Authorization: Bearer <api-key>`, որի բանալին կրում է `manage` շրջանակը: Սա հեռավոր MCP սերվերին հասնելու միակ միջոցն է թունելի, հակադարձ պրոքսիի կամ հանրային հոսթի անվան միջոցով:

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

Չկառավարվող բանալին (կամ առանց Կրող) վերադարձնում է `403 LOCAL_ONLY`: `/api/cli-tools/runtime/*` եղբայրական նախածանցը միտումնավոր NOT շրջանցելի է — տե՛ս [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) :

### Ծագման վավերացում

Նույնականացումից հետո յուրաքանչյուր հարցում `/api/mcp/*` — փոխադրումների և կառավարման երթուղիների, ինչպիսիք են `status`, `tools`, `audit` և `restart` — վավերացվում է իր `Origin` վերնագիրը, անկախ նրանից, որ զանգահարողը (API ստեղնը, CLI նշանը, վահանակի նիստը կամ անանուն շրջադարձը, որի մուտքն անջատված է): Սա DNS-վերամիավորման պաշտպանությունն է, որը պահանջում է MCP Streamable HTTP սպեկտրը:

- **`Origin` վերնագիր չկա** → թույլատրված. OmniRoute CLI, SDK և IDE հաճախորդները չեն ուղարկում մեկը:
- **Թույլատրված `Origin`** → `localhost`, `127.0.0.1` կամ `[::1]` ցանկացած նավահանգստում կամ OmniRoute ի սեփական հանրային ծագումը. `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, վստահելի հակադարձ պրոքսիի փոխանցված սկզբնաղբյուր (`OMNIROUTE_TRUST_PROXY`, միայն այն դեպքում, երբ բազային URL սահմանված չէ) կամ ուղղակի loopback/LAN IP հոսթ: Միայն `Host` վերնագիրը երբեք չի դարձնում վստահելի ծագումը:
- **Ցանկացած այլ `Origin`, ներառյալ `null`** → `403` JSON-RPC սխալի մարմնով. `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`: Վահանակի նիստը, որը ներկայացնում է վավեր CSRF նշան, դեռևս ընդունվում է, ինչպես մյուս վահանակի գրությունները:

Զննարկչի MCP հաճախորդին, որը սպասարկվում է հակադարձ վստահված անձի հետևում, կարիք ունի `OMNIROUTE_PUBLIC_BASE_URL`; այլ ծագման թույլատրելի ցուցակ չկա: CORS preflight (`OPTIONS`) ծագումը ստուգված չէ. հետևյալ խնդրանքն է.

## IDE կոնֆիգուրացիա

Տես [MCP Client Configuration](../guides/SETUP_GUIDE.md#mcp-client-configuration) Claude Desktop, Cursor, Cline և համատեղելի MCP հաճախորդի կարգավորումների համար:

---

## Հիմնական գործիքներ (14) — Փուլ 1

| Գործիք                          | Շրջանակներ            | Նկարագրություն                                                                                                                                |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Գործողության ժամանակ, հիշողություն, անջատիչներ, արագության սահմանաչափեր, քեշի վիճակագրություն                                                 |
| `omniroute_list_combos`         | `read:combos`         | Բոլոր կազմաձևված կոմբինացիաները ռազմավարություններով (կամընտիր չափումներ)                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | Արդյունավետության չափումներ կոնկրետ կոմբինատի համար                                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | Ակտիվացրեք կամ անջատեք կոմբինատը                                                                                                              |
| `omniroute_create_combo`        | `write:combos`        | Ստեղծեք վավերացված կոմբինացիա գոյություն ունեցող API միջոցով                                                                                  |
| `omniroute_check_quota`         | `read:quota`          | Քվոտա used/total, մնացած տոկոսը, վերակայման ժամանակը, նշանի առողջությունը                                                                     |
| `omniroute_route_request`       | `execute:completions` | Ուղարկեք զրույցի ավարտը OmniRoute երթուղղման միջոցով                                                                                          |
| `omniroute_cost_report`         | `read:usage`          | Ծախսերի հաշվետվություն ըստ ժամանակաշրջանի (session/day/week/month)                                                                            |
| `omniroute_list_models_catalog` | `read:models`         | Մոդելների ամբողջական կատալոգ՝ հնարավորություններով, կարգավիճակով, գնով                                                                        |
| `omniroute_radar_catalog`       | `read:radar`          | Տեղական ստորագրված Ռադարների կատալոգ; ընտրովի provider/family զտիչներ                                                                         |
| `omniroute_tool_search`         | `read:tools`          | Բացահայտեք գործիքներ գրանցված MCP կատալոգից                                                                                                   |
| `omniroute_web_search`          | `execute:search`      | Վեբ որոնում կազմաձևված որոնման պրովայդերների միջոցով: Ոչ X/Twitter.                                                                           |
| `omniroute_x_search`            | `execute:search`      | Որոնեք X-ը xAI/SuperGrok միջոցով կամ ընտրեք `xquik-search` ՝ Xquik API արդյունքների համար: Պահանջում է հավատարմագրեր ընտրված հետնամասի համար: |
| `omniroute_web_fetch`           | `execute:search`      | Ներբեռնեք վեբ բովանդակությունը կազմաձևված առբերման մատակարարների միջոցով                                                                      |

## Ընդլայնված գործիքներ (11) — Փուլ 2

| Գործիք                             | Շրջանակներ                           | Նկարագրություն                                                                                                                 |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Չոր վազքի երթուղիների մոդելավորում հետադարձ ծառով                                                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | Նստաշրջանի բյուջեն degrade/block/alert գործողությամբ                                                                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Թարմացրեք համակցված ռազմավարությունը գործարկման ժամանակ (priority/weighted/auto/etc.)                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Կիրառել `aggressive` / `balanced` / `conservative` առաձգականության նախադրվածը                                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Յուրաքանչյուր մատակարարի ուղիղ թեստը կոմբինատում, օգտագործելով իրական վերընթաց զանգ                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Մեկ մատակարարի չափումներ p50/p95/p99 ուշացումով և անջատիչի վիճակով                                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Առաջարկեք կոմբինացիա ըստ առաջադրանքի տեսակի՝ budget/latency սահմանափակումներով                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Բացատրեք, թե ինչու է հարցումը ուղղորդվել մատակարարին (նշել + գործոնները)                                                       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Ամբողջական նստաշրջանի նկարը. ծախսեր, նշաններ, լավագույն models/providers, սխալներ, բյուջեի պահակ                               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Ախտորոշել (և ըստ ցանկության՝ ավտոմատ վերանորոգում) տվյալների բազայի շեղումը, ինչպես կոտրված համակցված ռեֆերատները / որբ տողերը |
| `omniroute_sync_pricing`           | `pricing:write`                      | Համաժամացնել գնագոյացման տվյալները արտաքին աղբյուրներից (LiteLLM); աջակցում է `dryRun`                                         |

## Քեշի գործիքներ (2)

| Գործիք                  | Շրջանակներ    | Նկարագրություն                                           |
| :---------------------- | :------------ | :------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Իմաստային քեշ, հուշում-քեշ և անզորության վիճակագրություն |
| `omniroute_cache_flush` | `write:cache` | Լվացեք քեշը գլոբալ կամ signature/model միջոցով           |

## Կոմպրեսիոն գործիքներ (13)

| Գործիք                              | Շրջանակներ          | Նկարագրություն                                                                                                                                           |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Սեղմման կարգավորումներ, վերլուծությունների ամփոփում և քեշի մասին իրազեկ վիճակագրություն (ներառում է `analytics.mcpDescriptionCompression` մետատվյալները) |
| `omniroute_compression_configure`   | `write:compression` | Կազմաձևեք սեղմման ռեժիմը, շեմը, թիրախային հարաբերակցությունը, համակարգի հուշման պահպանումը, MCP նկարագրության սեղմման անջատիչը                           |
| `omniroute_set_compression_engine`  | `write:compression` | Ընտրեք ակտիվ շարժիչը (off/caveman/rtk/stacked) և Caveman/RTK ինտենսիվությունը                                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | Նշեք սեղմման կոմբինատները և դրանց շարժիչային խողովակաշարերը                                                                                              |
| `omniroute_compression_combo_stats` | `read:compression`  | Վերլուծություն խմբավորված ըստ սեղմման կոմբինատի և շարժիչի                                                                                                |
| `omniroute_ccr_store`               | `write:compression` | Պահեք զանգահարողի կողմից մեկուսացված բովանդակությունը սահմանափակված հիշողության CCR խանութում և վերադարձրեք նշիչ գումարած `ccr://` հղումը                |
| `omniroute_ccr_retrieve`            | `read:compression`  | Առբերեք CCR բովանդակությունը ամբողջությամբ կամ գլխի, պոչի, գծերի, grep և վիճակագրության ռեժիմներով                                                       |
| `omniroute_ccr_inspect`             | `read:compression`  | Ստուգեք զանգահարողին պատկանող CCR մետատվյալները՝ առանց բովանդակությունը վերադարձնելու                                                                    |
| `omniroute_ccr_list`                | `read:compression`  | Ցուցակեք էջանշված մետատվյալները զանգահարողին պատկանող CCR բլոկների համար                                                                                 |
| `omniroute_ccr_delete`              | `write:compression` | Ջնջել զանգահարողին պատկանող CCR բլոկը                                                                                                                    |
| `omniroute_ccr_stats`               | `read:compression`  | Զեկուցեք զանգահարողի շրջանակի հիշողության օգտագործման, կյանքի ցիկլի հաշվիչների և պահեստի սահմանափակումների մասին                                         |
| `omniroute_rtk_discover`            | `read:compression`  | Բացահայտեք կրկնվող աղմուկը ընտրված RTK ելքային նմուշներում                                                                                               |
| `omniroute_rtk_learn`               | `read:compression`  | Ստեղծեք վերանայվող RTK ֆիլտրի նախագիծ ընտրված նմուշներից                                                                                                 |

CCR գրառումները միայն հիշողության մեջ են և անհետանում են վերագործարկման ժամանակ: Յուրաքանչյուր բլոկ սահմանափակված է 2 MiB ով, յուրաքանչյուր հիմնական գումարով՝ 16 MiB, իսկ համաշխարհային խանութը՝ 64 MiB ով: Գրառումները կանխադրված են 24-ժամյա TTL (առավելագույնը յոթ օր): Ամբողջական MCP որոնումը սահմանափակված է 256 KiB ով; ավելի մեծ բլոկները մնում են հասանելի միջակայքի և grep ռեժիմների միջոցով: Պահպանումը, առբերումը, ցուցակագրումը, ստուգումը, ջնջումը և վիճակագրությունը մեկուսացված են վավերացված API-բանալու գլխավոր տնօրենի կողմից: Աուդիտի գրառումները պարունակում են հեշեր և չափի մետատվյալներ, ոչ երբեք բովանդակություն:

`omniroute_compression_status` հաղորդում է MCP նկարագրության սեղմումը առանձին `analytics.mcpDescriptionCompression` տակ: Այդ արժեքները մետատվյալների չափի գնահատումներ են MCP ցուցակվող նկարագրությունների համար (`tools`, `prompts`, `resources` և `resourceTemplates`); դրանք մատակարարի օգտագործման անդորրագրեր չեն և նշված են `source: "mcp_metadata_estimate"` ով:

### MCP Accessibility Tree Filter (v3.8.0)

Բացի վերը նշված սեղմման գործիքներից, OmniRoute ներառում է հետկատարման ֆիլտր, որը սեղմում է** գործիքի արդյունքները** MCP browser/accessibility գործիքների նախքան դրանք գործակալին վերադարձվելը: Այս ֆիլտրն ինքնին գործիք չէ — այն թափանցիկ է աշխատում ցանկացած գործիքի արդյունքի վրա, որը պարունակում է մանրամասն հասանելիության ծառի կամ բրաուզերի պատկերի տեքստ (≥ 2000 նիշ):

Հիմնական վարքագիծը.

- Փլուզում է ≥ 30 անընդմեջ կրկնվող եղբայրական տողերը գլխի + պոչում
- Պահպանում է `[ref=eXX]` խարիսխները, որոնք պահանջվում են Playwright/computer-use կողմից
- Կոշտ կտրում է մեծածավալ տեքստը (> 50,000 նիշ) նավիգացիոն հուշումով
- Ակնկալվող խնայողություններ.** 60–80%** զննարկչի ակնթարթային բեռների վրա

Կազմաձևում՝ `compression.mcpAccessibility` գլոբալ կարգավորումներում (միգրացիա 056): Իրականացում՝ `open-sse/services/compression/engines/mcpAccessibility/`. Ամբողջական փաստաթղթեր. [Կոմպրեսիոն շարժիչներ — MCP Մատչելիության ծառի զտիչ](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter) :

Տե՛ս [«Կոմպրեսիոն շարժիչներ»](../compression/COMPRESSION_ENGINES.md) և [RTK սեղմում»](../compression/RTK_COMPRESSION.md) այս գործիքների հետևում գործող սեղմման մոդելի համար:

## 1 վստահված անձի գործիքներ (3)

| Գործիք                      | Շրջանակներ     | Նկարագրություն                                                                                |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ստացեք անվճար վստահված անձինք 1proxy շուկայից (protocol/country/quality/limit զտիչներ)        |
| `omniroute_oneproxy_rotate` | `read:proxies` | Ստացեք հաջորդ հասանելի վստահված անձը ըստ ռազմավարության (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Լողավազանի վիճակագրություն, համաժամացման կարգավիճակ, բաշխում ըստ արձանագրության և երկրի       |

## Հիշողության գործիքներ (3)

Սահմանված է `open-sse/mcp-server/tools/memoryTools.ts` ում: Auth/scope իրականացվում է ստանդարտ MCP շրջանակի խողովակաշարի միջոցով:

| Գործիք                    | Շրջանակներ     | Նկարագրություն                                                                                         |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Որոնեք հիշողությունները հարցման / տիպի / API ստեղնով՝ նշան-բյուջեի կատարման միջոցով                    |
| `omniroute_memory_add`    | `write:memory` | Ավելացնել հիշողության նոր մուտք (`factual` / `episodic` / `procedural` / `semantic`)                   |
| `omniroute_memory_clear`  | `write:memory` | Մաքրել հիշողությունները API ստեղնի համար, որոնք ընտրովի զտված են ըստ տեսակի կամ `olderThan` ժամադրոշմի |

## Հմտության գործիքներ (4)

Սահմանված է `open-sse/mcp-server/tools/skillTools.ts` ում: Աջակցված է `src/lib/skills/registry` + `src/lib/skills/executor`.

| Գործիք                        | Շրջանակներ       | Նկարագրություն                                                                                  |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Ցուցակագրեք գրանցված հմտությունները կամընտիր զտմամբ ըստ API ստեղնի, անվանման կամ միացված վիճակի |
| `omniroute_skills_enable`     | `write:skills`   | Միացնել կամ անջատել որոշակի հմտություն ID կողմից                                                |
| `omniroute_skills_execute`    | `execute:skills` | Կատարեք հմտություն տրամադրված մուտքագրմամբ և վերադարձրեք կատարման գրառումը                      |
| `omniroute_skills_executions` | `read:skills`    | Թվարկեք վերջին հմտությունների կատարման պատմությունը                                             |

## Notion Համատեքստային աղբյուր (6)

Սահմանված է `open-sse/mcp-server/tools/notionTools.ts` ում: Token-ը պահվում է `key_value` աղյուսակում `src/lib/db/notion.ts` միջոցով: REST հաճախորդը `src/lib/notion/api.ts` ում: Կարգավորումներ API `src/app/api/settings/notion/route.ts` ում: Վահանակ UI է `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Կազմաձևեք ձեր Notion ինտեգրման նշանը** Համատեքստային աղբյուրներ** ներդիրը Endpoint վահանակում կամ REST API ի միջոցով.

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

| Գործիք                       | Շրջանակներ     | Նկարագրություն                                                                               |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Ամբողջ տեքստի որոնում բոլոր էջերում և տվյալների բազաներում                                   |
| `notion_get_page`            | `read:notion`  | Ստացեք էջ ըստ ID ՝ իր հատկություններով                                                       |
| `notion_list_block_children` | `read:notion`  | Թվարկեք էջի կամ բլոկի մանկական բլոկները                                                      |
| `notion_query_database`      | `read:notion`  | Հարցրեք տվյալների բազա՝ զտիչներով, տեսակավորումներով և էջադրումներով                         |
| `notion_get_database`        | `read:notion`  | Ստացեք տվյալների բազայի սխեման ID ի կողմից                                                   |
| `notion_append_blocks`       | `write:notion` | Ավելացրեք երեխաների բլոկները ծնողական բլոկին (առավելագույնը 100 յուրաքանչյուր հարցման համար) |

## Գործակալների հմտությունների կատալոգի գործիքներ (3)

Սահմանված է `open-sse/mcp-server/tools/agentSkillTools.ts` ում: Աջակցված է `src/lib/agentSkills/catalog` ի կողմից: Այս գործիքները ցուցադրում են 45 մուտքագրված Agent Skills փաստաթղթերի կատալոգը MCP հաճախորդների և արտաքին գործակալների համար: Շրջանակ՝ `read:catalog`.

| Գործիք                            | Շրջանակներ     | Նկարագրություն                                                                                                                                            |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Թվարկեք գործակալի բոլոր 45 հմտությունները կամընտիր `category` (api\| cli) և `area` զտիչներով; վերադարձնում է մետատվյալների + ծածկույթը                    |
| `omniroute_agent_skills_get`      | `read:catalog` | Ստացեք ամբողջական մետատվյալների + SKILL.md բովանդակությունը մեկ հմտության համար կանոնական `id` միջոցով                                                    |
| `omniroute_agent_skills_coverage` | `read:catalog` | Ծածկույթի վիճակագրություն. 23 API, 21 CLI և 1 կազմաձևման հմտություններից քանիսն ունեն SKILL.md ֆայլեր ֆայլային համակարգում ընդդեմ կատալոգի ընդհանուրների: |

Տես [AGENT-SKILLS.md](./AGENT-SKILLS.md) ի ամբողջական կատալոգը և ինչպես են այն օգտագործում արտաքին գործակալները:

## Առնչվող շրջանակներ (v3.8.0)

MCP գործիքների վերը նշված գույքագրումը (110 եզակի գործիքներ, որոնք հաշվարկված են `countUniqueMcpTools()` կողմից) միտումնավոր ընդգրկված են գործարկման ժամանակի routing/cache/compression/memory/skills/proxy/context-source գործառնությունների համար: Երկու հարակից շրջանակներ ուղարկվում են MCP սերվերի կողքին v3.8.0-ում և փաստաթղթավորված են առանձին.

### Ամպային գործակալներ

Cloud Agents-ը գործընթացից դուրս AI կոդավորման գործակալներ են (codex-cloud, cursor-cloud, devin, jules) միացված OmniRoute մեջ նույն կապի մոդելի միջոցով, որն օգտագործվում է LLM մատակարարների համար: Նրանք ենթարկվում են իրենց սեփական REST մակերեսի (`/api/v1/agents/*`) միջոցով և են** ոչ** MCP գործիքների կատալոգի մի մասը — կանչում է Cloud Agent-ը, չի սպառում MCP շրջանակը:

- Իրականացում՝ `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Կյանքի ցիկլ՝ `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`:
- Փաստաթղթեր՝ [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Պահակներ

Պաշտպանական պատնեշները pre/post-execution զտիչներ են (տեսողության կամուրջ, pii-masker, արագ ներարկում), որոնք կիրառվում են չաթի խողովակաշարի ներսում: Նրանք աշխատում են նախքան MCP tool/route շերտը հասնելը և կառուցվածքային խախտումներ են արձակում աուդիտի խողովակաշարին. դրանք չեն կանչվում որպես MCP գործիքներ:

- Իրականացում՝ `src/lib/guardrails/`.
- Փաստաթղթեր՝ [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Երբ վրիպազերծում եք MCP զանգը, որը հայտնվում է արգելափակված, ստուգեք և՛ MCP աուդիտի մատյանը (`scope_denied:*` գրառումները) և՛ պաշտպանական բազրիքների աուդիտի ուղին — խնդրանքը կարող է մերժվել պաշտպանական գծի կողմից:** առաջ** այն երբևէ հասնում է MCP շրջանակի կիրառման շերտին:

---

## REST API Վերջնակետեր

| Վերջնակետ              | Մեթոդ                 | Նկարագրություն                                                                                                               | Հաստատություն              |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Սերվերի կարգավիճակը՝ սրտի բաբախյուն, HTTP տրանսպորտի վիճակ, աուդիտի գործունեության ամփոփում                                  | Կառավարում (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Գործիքների կատալոգ (անուն, նկարագրություն, շրջանակներ, փուլ, աղբյուրի վերջնակետեր)                                           | Կառավարում                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE տրանսպորտի վերջնակետ (դռնփակ `mcpEnabled` + `mcpTransport === "sse"`)                                                    | API բանալի + շրջանակները   |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Հոսքային HTTP տրանսպորտ (օգտագործում է `mcp-session-id` վերնագիրը, `DELETE` ավարտում է նիստը)                                | API բանալի + շրջանակները   |
| `/api/mcp/audit`       | `GET`                 | Աուդիտի գրանցամատյանում գրանցված գրառումները `mcp_tool_audit` ից (զտիչներ՝ `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Կառավարում                 |
| `/api/mcp/audit/stats` | `GET`                 | Աուդիտի ընդհանուր վիճակագրություն (`totalCalls`, `successRate`, `avgDurationMs`, լավագույն գործիքներ)                        | Կառավարում                 |

Աղբյուրի ֆայլեր՝ `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

SSE և Streamable HTTP փոխադրումները արգելափակված են այնքան ժամանակ, մինչև MCP սերվերը միացվի Կարգավորումներում (`mcpEnabled`) և ընտրվի համապատասխան `mcpTransport` : Եթե տրանսպորտը սխալ է կազմաձևված, երթուղին վերադարձնում է HTTP 400՝ կարգավորումները փոխելու ակնարկով:

---

## Նույնականացում և շրջանակներ

MCP գործիքի կանչերը կարդում են տիրույթի տողերը զանգահարողից: Այդ ստուգումը երեք անկախ անվանատարածքներից մեկն է: Մեկ խաղաքարտի փոխանցումը մյուսներից փոխանցում չէ: Կանոնները [երեք շրջանակի անվանատարածքներ](#three-scope-namespaces) են: Գործիքների կատալոգը [MCP գործիքների շրջանակներն](#mcp-tool-scopes) են:

### Երեք շրջանակի անվանատարածք

`manage` API ստեղնի վրա, `read:compression` MCP գործիքի վրա և `read` `oma_live_…` մուտքի նշանի վրա երեք տարբեր դրամաշնորհներ են: Զանգահարողները, ովքեր `read` մուտքի նշան են ուղարկում կառավարման փոփոխվող երթուղի, ստանում են HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Այդ աստիճանը `scopeSatisfies` է: Այն չի խորհրդակցում MCP աղյուսակի հետ, և MCP համընկնողը չի խորհրդակցում դրա հետ:

| Անվան տարածություն        | Հավատարմագիր                                                                          | Ստուգիչ              | Անցումը թույլ է տալիս                                              |
| :------------------------ | :------------------------------------------------------------------------------------ | :------------------- | :----------------------------------------------------------------- |
| API-բանալու կառավարում    | `api_keys.scopes`                                                                     | `hasManageScope`     | Կառավարման REST այդ Կրող բանալիի համար                             |
| API-բանալին հավելում      | նույն զանգված, մեկ ճշգրիտ տող                                                         | ստորև նշված օգնականը | Միայն այդ մեկ հնարավորությունը                                     |
| MCP գործիքների շրջանակներ | նույն զանգվածը, այլապես MCP `_meta` (միայն HTTP/SSE ), այլապես `OMNIROUTE_MCP_SCOPES` | `scopeMatches`       | Այդ գործիքը, երբ կիրառումը միացված է                               |
| Մուտքի նշան               | `oma_live_…`                                                                          | `scopeSatisfies`     | Կառավարման երթուղին, որի մեթոդն ու ուղին պահանջում են այդ աստիճանը |

Յուրաքանչյուր հավատարմագրերի հատումը ծածկված է [կառավարման վավերացման](../guides/MANAGEMENT-AUTH.md) մեջ:

#### API-բանալու շրջանակներ

Մեկ `api_keys.scopes` զանգվածը կերակրում է երկու աշխատանք: Նրանք օգտագործում են տարբեր գործառույթներ.

**Կառավարում REST.** `manage` և `admin` `MANAGEMENT_API_KEY_SCOPES` ի անդամներն են (`src/shared/constants/managementScopes.ts`): `hasManageScope` այն է, ինչ թույլատրում է կառավարման երթուղիները այդ բանալու համար: `admin` ն այդ երթուղիներում կարող է կառավարել: Այստեղ `admin` բառը հասանելիության նշանի աստիճան չէ և այն չի ընդլայնվում MCP գործիքի շրջանակների մեջ:

**Հավելումային տողեր.** Յուրաքանչյուրը անդամակցության ճշգրիտ թեստ է, և յուրաքանչյուրը մնում է `MANAGEMENT_API_KEY_SCOPES` դուրս:

| Շրջանակ                        | Անցումը թույլ է տալիս                                                                                                                                                            |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Ոչ loopback `/api/mcp/` LOCAL_ONLY միայն փորագրվում է (`hasMcpConnectOrManageScope`): `manage` կամ `admin` ով բանալի դեռ անցնում է այդ փորագրումը:                               |
| `self:usage`                   | `GET /api/v1/me/status` այս բանալի համար (`src/app/api/v1/me/status/route.ts`): `POST /api/keys` ավելացնում է այս շրջանակը ստեղծման վրա (`normalizeSelfServiceScopesForCreate`): |
| `self:account-quota`           | Վերին հոսքի հաշվի քվոտաներ այդ կարգավիճակի բեռնվածքի ներսում (`src/lib/usage/apiKeySelfService.ts`): Կարգավիճակի երթուղին դեռ պահանջում է `self:usage`:                          |
| `policy:bypass-provider-quota` | Այս բանալու եզրակացության կանչերը բաց թողնում են մատակարարի քվոտայի քաղաքականությունը (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`):                             |

#### Համապատասխանեցում

Կատալոգը աղյուսակն է [MCP գործիքի շրջանակների](#mcp-tool-scopes) ներքո: Մի վերաբերվեք `MCP_SCOPE_LIST` ին `src/shared/constants/mcpScopes.ts` ում որպես այդ կատալոգի. այն բնօրինակ տպագրված ենթաբազմություն է: Հետագա գործիքները դրա կողքին հայտարարում են հետագա շրջանակներ (`read:notion`, `read:skills`, `read:local-corpus` և աղյուսակի մնացած մասը):

`evaluateToolScopes` `open-sse/mcp-server/scopeEnforcement.ts` ում թույլ է տալիս զանգահարել, երբ յուրաքանչյուր պահանջվող շրջանակը համընկնում է որոշ տրված շրջանակի հետ.

- `*` համապատասխանում է բոլոր պահանջվող շրջանակներին:
- Տրված շրջանակը, որն ավարտվում է `*` համապատասխանում է պահանջվող շրջանակին, որը սկսվում է աստղից առաջ նախածանցով: `read:*` համապատասխանում է `read:compression`:
- Յուրաքանչյուր այլ տրված շրջանակը համընկնում է միայն նույնական պահանջվող տողի հետ:

Բանալին, որի շրջանակները `["manage"]` են, ձախողվում է `scopeMatches` `read:compression` համար: Նույն զանգը ձախողվում է `admin`, `mcp:connect`, `read` և `write` համար, երբ դրանք միակ տրված տողերն են: MCP գործիքի շրջանակների միջև չկա հիերարխիա, որը գտնվում է հետագային `*` դուրս:

Կիրառումն անջատված է, եթե `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (կանխադրված `false`): Մինչ այն անջատված է, `evaluateToolScopes` թույլ է տալիս զանգը և բաց է թողնում կատալոգը: Մինչ այն միացված է, HTTP օգտագործում է Կրող ստեղնի `api_keys.scopes` որպես `authInfo` (տես [Բանալին HTTP շրջանակի կապում](#per-key-http-scope-binding-7895) ): Երբ ոչ մի հիմնական շրջանակ չի լուծվում, տրված հավաքածուն ընկնում է MCP `_meta` ին (նախատեսված է միայն HTTP/SSE զանգահարողների համար, HTTP auth համատեքստում; stdio զանգահարողի `_meta` անտեսվում է, քանի որ հաճախորդը վերահսկում է այն և այն չունի յուրաքանչյուր զանգողի ինքնությունը), ապա `OMNIROUTE_MCP_SCOPES`:

#### Մուտքի նշանի շրջանակներ

`oma_live_…` նշանները (`src/lib/accessTokens/scopes.ts`) կրում են `read`, `write` կամ `admin`: `scopeSatisfies` աստիճան է՝ `admin` ծածկում է `write` և `read`, իսկ `write` ծածկում է `read`: Անհայտ շրջանակները ոչինչ չեն ներառում:

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) համեմատում է այդ աստիճանը `inferRequiredScope` (`src/server/authz/accessScopes.ts`) հետ.

- `GET`, `HEAD` եւ `OPTIONS` պահանջում են `read`:
- Ցանկացած այլ մեթոդ պահանջում է `write`:
- `ADMIN_SCOPE_PREFIXES` ի ուղիները պահանջում են `admin` յուրաքանչյուր մեթոդի համար: `/api/mcp` այդ ցանկում է, ուստի `write` մուտքի նշանը դեռ չի կարող զանգահարել MCP HTTP մակերեսը:
- `ADMIN_MUTATION_PREFIXES` ի ուղիները պահանջում են `admin` միայն մուտացիաների համար:
- `ADMIN_MUTATION_EXACT_PATHS` ի ուղիները (`/api/settings`, `/api/settings/require-login`) պահանջում են `admin` միայն մուտացիաների համար, և միայն այդ ճշգրիտ ճանապարհի վրա — մյուս `/api/settings/*` ենթաերթուղիները պահպանում են `write`:

`PATCH /api/keys/{id}` մուտացիա է և չկա այդ ադմինիստրատորների ցուցակներում, ուստի `read` նշանը ստանում է 403 `Access token scope 'read' is insufficient; 'write' required.` `write` կամ `admin` մուտքի նշանը բավարարում է այդ երթուղին: JWT վահանակը, շրջադարձ CLI machine-id նշանը և `manage` կամ `admin` API ստեղնը այլ ճյուղեր են վերցնում և չեն նեղանում այս աստիճանով:

Մուտքի նշանը, որը `scopeSatisfies` է փոխանցում `/api/mcp` ին, մաքրել է միայն կառավարման դարպասը: Գործիքների կանչերը դեռևս աշխատում են `scopeMatches` API-բանալու շրջանակների դեմ: Մուտքի նշանի աստիճանը մուտքագրում չէ `scopeMatches` ին:

### MCP գործիքների շրջանակներ

Շրջանակի կիրարկումը կենտրոնացված է `open-sse/mcp-server/scopeEnforcement.ts` ում: Յուրաքանչյուր գործիք պահանջում է հատուկ շրջանակներ.

| Շրջանակ               | Գործիքներ                                                                                                                                                                            |
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
| `read:obsidian`       | 13 կարդալու գործիքներ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 գրելու գործիքներ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                  |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Wildcard շրջանակները աջակցվում են. `read:*` տրամադրում է բոլոր ընթերցման շրջանակները, `*` տրամադրում է ամբողջական մուտք:

### `mcp:connect` — նեղ երթուղու հնարավորություն (#7895)

HTTP/SSE MCP տրանսպորտին (`/api/mcp/*`) հասնելու համար ոչ հանգույցից պահանջվում է `/api/mcp/` LOCAL_ONLY փորագրում (տես `docs/security/ROUTE_GUARD_TIERS.md`): Պատմականորեն այդ փորագրումն ընդունում էր միայն `manage`/`admin` -scope API ստեղնը — չափազանց լայն էր այն զանգահարողի համար, որը միայն պետք է խոսի MCP: `src/shared/constants/managementScopes.ts` այժմ արտահանում է `MCP_CONNECT_SCOPE = "mcp:connect"`. հավելում, նեղ շրջանակ (նույն նախադեպը, ինչ `SELF_USAGE_SCOPE`), որը թույլ է տալիս ONLY `/api/mcp/` շրջանցումը `src/server/authz/policies/management.ts` — ում, այն չի տրամադրում կառավարման այլ երթուղի մուտք և դիտավորյալ պահվում է OUT ից `MANAGEMENT_API_KEY_SCOPES`: Բանալին, որը պահում է `manage`/`admin` դեռևս անցնում է փորագրումը անփոփոխ; `mcp:connect` ավելի ցածր արտոնություններ ունեցող այլընտրանք է միայն հեռավոր MCP-ով զանգահարողների համար, որը ստուգվում է `hasMcpConnectOrManageScope()` միջոցով:

### Բանալին HTTP շրջանակի կապում (#7895)

HTTP/SSE միջոցով `open-sse/mcp-server/httpTransport.ts` այժմ լուծում է զանգահարողի իրական `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) միջոցով և այն փոխանցում է MCP SDK ի `transport.handleRequest(req, { authInfo })` ին, այնպես որ `extra.authInfo.scopes` հասնելով յուրաքանչյուր գործիքի կանչին, արտացոլում է Կրող բանալիի սեփական շրջանակները: `scopeEnforcement.ts` ի `resolveCallerScopeContext()` արդեն առաջնահերթություն է տվել `authInfo` `_meta` և `OMNIROUTE_MCP_SCOPES` env-ի փոխարեն — ն լրացնում է միայն առաջին, ամենաբարձր առաջնահերթ աղբյուրը, որը նախկինում չէր սնվում HTTP: Երբ ոչ մի API ստեղն չի լուծվում (առանց վերնագրի, անվավեր բանալի), `authInfo` մնում է `undefined`, և լուծումը ընկնում է գոյություն ունեցող `meta`/env շղթայի մեջ՝ անփոփոխ: stdio-ն չունի յուրաքանչյուր զանգողի ինքնություն (տես `mcpCallerIdentity.ts`) և չի ազդում մեկ բանալու վրա — վրա, այն բաց է թողնում `_meta` քայլը (`_meta` հարգվում է միայն HTTP auth համատեքստում, #15159) և լուծում է միայն `OMNIROUTE_MCP_SCOPES` env ստեղնով:

**Կատարումը հարկադրված է նեղ շրջանակներով HTTP/SSE զանգահարողների համար՝ անկախ `OMNIROUTE_MCP_ENFORCE_SCOPES` ից:** `OMNIROUTE_MCP_ENFORCE_SCOPES` լռելյայնությունը `false` համար անվտանգ է միայն local/stdio մեկ օպերատորի հոսքի համար, որտեղ չկա մեկ զանգահարողի նույնականացում, որի դեմ կարող է լինել: `open-sse/mcp-server/server.ts::withScopeEnforcement()` անվերապահորեն միացնում է յուրաքանչյուր գործիքի շրջանակի կիրառումը (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) ամեն անգամ, երբ `resolveCallerScopeContext()` լուծվում է `source === "authInfo"` (այսինքն իրական մեկ բանալիով HTTP թույլտվության վերնագիր, HTTP/SSE-only) AND այդ բանալին չի պահպանում `manage`/`admin` ամբողջական շրջանակը: Սա փակում է այն բացը, որտեղ բանալին, որը պահում է ONLY նեղ `mcp:connect` շրջանցման շրջանակը — որը վերևում փաստագրված է, որ ոչ այլ ինչ չի թույլատրում, բացի `/api/mcp/` LOCAL_ONLY քանդակած —, այլ կերպ կարող է կանչել բոլոր MCP գործիքը, երբ օպերատորը միացրել է remote/non-loopback MCP մուտքը, պարզապես այն պատճառով, որ `OMNIROUTE_MCP_ENFORCE_SCOPES` լռելյայն առաքում է `false` : Ամբողջական `manage`/`admin` ստեղնը HTTP վրա, և յուրաքանչյուր stdio/local զանգահարող, գոյություն ունեցող `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated վարքագիծն անփոփոխ պահեք:

---

## Շրջակա միջավայրի փոփոխականներ

| Փոփոխական                               | Կանխադրված                                | Նպատակը                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | Հիմնական URL որն օգտագործում է MCP սերվերը, երբ զանգում է OmniRoute ներքին APIs                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_API_KEY`                     | (դատարկ)                                  | API ստեղնը փոխանցվում է որպես `Authorization: Bearer` ներքին API զանգերին                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (միայն `"true"` թույլ է տալիս դա) | Երբ միացված է, բացակայող շրջանակները մերժում են գործիքի կանչերը և գրանցում `scope_denied:<reason>` աուդիտի մատյանում: Կիրառումը պարտադիր է ALSO անկախ այս դրոշից, ցանկացած HTTP/SSE զանգահարողի համար, որը լուծվում է մեկ բանալիով թույլտվության վերնագրից (`source === "authInfo"`), որը չունի `manage`/`admin` ամբողջական տիրույթ — օր.՝ մի բանալի, որը պահում է միայն `mcp:connect` շրջանցման նեղ շրջանակը — այնպես որ այս լռելյայն անվտանգ է միայն local/stdio երբեք միակողմանի օպերատորի մուտքի համար: |
| `OMNIROUTE_MCP_SCOPES`                  | (դատարկ)                                  | Լռելյայնորեն «հասանելի» համարվող շրջանակների՝ ստորակետերով բաժանված թույլտվությունների ցանկ (օգտագործվում է, երբ զանգահարողը չի տրամադրում իր սեփական շրջանակները)                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (անջատել = ն)                             | Երբ սահմանվում է `0/false/off/no`, գրանցման ժամանակ անջատում է MCP նկարագրության սեղմումը                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (անջատել = ն)                             | Այլընտրանքային կեղծանունը նույն անջատիչի համար, ինչպես վերևում                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | Ներքին կառավարման համար բյուջեի դադարեցում (առողջություն, ճկունություն, զուգորդումներ, քվոտա, օգտագործում)                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | Չեղարկել բյուջեն հոփերի համար, որոնք սպասում են մատակարարին (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                    |
| `MCP_TOOL_DENY`                         | (անջատել = առանց զտիչ)                    | Ստորակետերով բաժանված գործիքների անունները, որոնք պետք է հանվեն `tools/list` ից (գործիքների կարդինալության կրճատում — տե՛ս ստորև)                                                                                                                                                                                                                                                                                                                                                                           |
| `MCP_TOOL_ALLOW`                        | (անջատել = առանց զտիչ)                    | Ստորակետերով բաժանված գործիքների անունները բացառապես պահելու համար (թույլատրելի ցուցակի ռեժիմ — տե՛ս ստորև)                                                                                                                                                                                                                                                                                                                                                                                                 |
| `DATA_DIR`                              | `~/.omniroute`                            | Heartbeat ֆայլը գրված է `${DATA_DIR}/runtime/mcp-heartbeat.json` ում                                                                                                                                                                                                                                                                                                                                                                                                                                        |

---

## Նկարագրություն Սեղմում

MCP գործիքը, հուշագիրը և ռեսուրսների գրանցամատյանները կարող են սեղմել նկարագրությունները registration/list ժամանակում՝ նվազեցնելու մետատվյալների հետքը, որոնք ենթարկվում են հաճախորդներին (և հետևաբար՝ համատեքստի արագ արժեքը): Իրականացումը ապրում է `open-sse/mcp-server/descriptionCompressor.ts` ում և միացված է MCP սերվերին `compressMcpRegistryMetadata` ի ներսում `createMcpServer()` միջոցով:

- Սեղմումը կատարվում է նկարագրության տեքստի վրա՝ օգտագործելով Caveman կանոնների հավաքածուն (`getRulesForContext("all", "full")`)՝ պահպանված բլոկների արդյունահանմամբ (կոդերի բացվածքներ, ցանկապատված բլոկներ և այլն), այնպես որ կառուցվածքային բովանդակությունը չի փոխվում:
- Փոխարկել մեկ տեղակայումը `compression.mcpDescriptionCompressionEnabled` արժեքի միջոցով `key_value` կարգավորումների աղյուսակում (կանխադրված՝ միացված է) — ցուցադրված է UI ում որպես** Վերլուծություն → MCP նկարագրության սեղմում** .
- Անջատեք գործընթացն ամբողջապես `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` կամ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` միջոցով:
- Իրական ժամանակի վիճակագրությունը հայտնվում է `omniroute_compression_status` միջոցով `analytics.mcpDescriptionCompression` տակ և հատկորոշվում է `source: "mcp_metadata_estimate"` իրական մատակարարների օգտագործման անդորրագրերից տարբերվելու համար:

---

## Գործիքների կարդինալության նվազեցում (F4.3)

Նկարագրության սեղմումը կրճատում է յուրաքանչյուր գործիքի մետատվյալները.** գործիք-կարդինալության կրճատում** գնում է մեկ քայլ առաջ՝ նվազեցնելով _ինչքան_ գործիքներ ընդհանրապես հայտարարված: `tools/list` մանիֆեստում ավելի քիչ գործիքների գովազդումը կրճատում է յուրաքանչյուր հարցման նշանի արժեքը, որը հաճախորդի մոդելը վճարում է գործիքների կատալոգի համար («5-րդ շերտ» սեղմում): Իրականացումը մաքուր, քաղաքացիություն չունեցող զտիչ է `open-sse/mcp-server/toolCardinality.ts` ում (`reduceToolManifest`), որը միացված է գրանցման օղակին `createMcpServer()` ում (`open-sse/mcp-server/server.ts`):

**Միացնել, անջատել լռելյայն:** Զտիչը աշխատում է միայն այն դեպքում, երբ սահմանված է շրջակա միջավայրի երկու փոփոխականներից առնվազն մեկը. ոչ մի հավաքածուով, բոլոր 110 գործիքները հայտարարված են անփոփոխ:

| Փոփոխական        | Ռեժիմ                                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Սև ցուցակում — ստորակետերով բաժանված գործիքների անունները, որոնք միշտ հանվում են `tools/list` ից              |
| `MCP_TOOL_ALLOW` | Allow-list — ստորակետերով առանձնացված գործիքների անունները; միայն սրանք են գոյատևում, մնացած ամեն ինչ գցված է |

`deny` առաջնահերթ է `allow`: Անունները բաժանված են ստորակետերով, կտրված, իսկ դատարկ գրառումներն անտեսվում են: Օրինակներ.

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Ինչպես են հեռացվում զտված գործիքները.** գրանցումը միշտ հաջողվում է; գործիքը, որը պրոֆիլը մերժում է, այնուհետև `.disable()` d է MCP SDK բռնակի վրա, ուստի այն երբեք չի հայտնվում `tools/list`, բայց լարերը մնում են անփոփոխ (մաքուր enable/disable, վերագրանցում չկա): Պրոֆիլների վերլուծիչը `readMcpToolProfileFromEnv(process.env)` է, որը վերադարձնում է `null` (զտում չկա), երբ երկու var-երը դատարկ են:

`reduceToolManifest` ետևում գտնվող ավելի հարուստ `ToolProfile` ձևը նաև աջակցում է շրջանակի խաչմերուկի զտմանը (`allowScopes`, `read:*` -style նիշերի համընկնումով) և որոշիչ `maxTools` գլխարկով, սակայն այդ երկու կոճակներին անհրաժեշտ է ամբողջական մանիֆեստը գրանցման ժամանակ և** ոչ** այսօր ենթարկվում է շրջակա միջավայրի փոփոխականների միջոցով ( `tools/list` -level կեռիկը հետևում է): `estimateManifestTokens()` հասանելի է մանիֆեստի նշանի արժեքը կրճատումից առաջ և հետո համեմատելու համար:

---

## Runtime Heartbeat

Stdio տրանսպորտը պահպանում է աշխուժությունը դեպի `${DATA_DIR}/runtime/mcp-heartbeat.json` յուրաքանչյուր 5 վայրկյանը մեկ: Վահանակի վահանակը (`/api/mcp/status`) կարդում է այս ֆայլը, գումարած PID liveness՝ `online` դուրս բերելու համար: HTTP փոխադրում է հաշվետվության վիճակը ընթացող `getMcpHttpStatus()` ից (ֆայլ չի գրում):

Սրտի բաբախման լուսանկարը պարունակում է.

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

## Աուդիտի գրանցում

Գործիքի յուրաքանչյուր զանգ գրանցվում է SQLite `mcp_tool_audit` աղյուսակում `open-sse/mcp-server/audit.ts` կողմից.

- Գործիքի անվանումը, արգումենտները (hashed/truncated as per-tool `auditLevel`), արդյունք
- Տևողությունը ms-ով, success/failure դրոշակ, սխալի հաղորդագրություն (եթե կիրառելի է)
- API key hash, ժամանակի դրոշմ
- Շրջանակի մերժումները գրանցվում են որպես `scope_denied:<reason>` ՝ բացակայող շրջանակների ցանկով

Վերջին զանգերը ստուգելու համար օգտագործեք վահանակը կամ `/api/mcp/audit` և `/api/mcp/audit/stats` REST վերջնակետերը:

---

## Ֆայլեր

| Ֆայլ                                                                     | Նպատակը                                                                  |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP սերվերի գործարան, stdio մուտքի կետ, շրջանակի գործիքների գրանցումներ  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Հոսքային HTTP տրանսպորտ (նստաշրջանի կառավարում)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Գործիքի շրջանակի գնահատում և զանգահարողի լուծում                         |
| `open-sse/mcp-server/audit.ts`                                           | Գործիքի զանգերի աուդիտի գրանցում (`mcp_tool_audit`)                      |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat գրող (`mcp-heartbeat.json`)                              |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Նկարագրության սեղմում գործիքի / հուշման / ռեսուրսների ռեեստրների համար   |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemas + գործիքի գրանցամատյան (`MCP_TOOLS`, 45 գրառում)             |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + cache + 1proxy tool handlers                                   |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Կոմպրեսիոն գործիքների մշակիչներ                                          |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Հիշողության գործիքների սահմանումներ (3 գործիք)                           |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Հմտությունների գործիքների սահմանումներ (4 գործիք)                        |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion համատեքստի աղբյուրի գործիքի սահմանումներ (6 գործիք)               |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Gamification գործիքների սահմանումներ (8 գործիք)                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Plugin գրանցման և կառավարման գործիքներ (8 գործիք)                        |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` վերջնակետ                                              |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` վերջնակետ                                               |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE տրանսպորտային երթուղի                                 |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP տրանսպորտային երթուղի                  |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` աուդիտի մատյան հարցում                                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` համախառն աուդիտի չափումներ                        |
| `src/lib/notion/api.ts`                                                  | Notion REST API հաճախորդ (կրկին փորձ, ժամանակի ավարտ, սխալի դասակարգում) |
| `src/lib/db/notion.ts`                                                   | Notion նշանի համառություն (`key_value` աղյուսակ)                         |
| `src/app/api/settings/notion/route.ts`                                   | Notion կարգավորումներ API (GET/POST/DELETE)                              |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion նշանի կառավարում UI                                               |
| `tests/unit/notion-api.test.ts`                                          | Notion API հաճախորդի թեստեր (7)                                          |
| `tests/unit/notion-tools.test.ts`                                        | Notion գործիքների շրջանակի կիրառման թեստեր (10)                          |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB մոդուլի թեստեր (3)                                             |
