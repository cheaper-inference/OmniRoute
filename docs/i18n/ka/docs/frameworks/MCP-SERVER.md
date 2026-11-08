# OmniRoute MCP Server Documentation (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> მოდელის კონტექსტური პროტოკოლის სერვერი 110 ხელსაწყოთი მარშრუტიზაციის, ქეშის, შეკუმშვის, მეხსიერების, უნარების, პროქსის, აუზის, რადარისა და კონტექსტური წყაროს ოპერაციებში.
>
> Source of truth: `open-sse/mcp-server/server.ts` computes **110 unique tools** with `countUniqueMcpTools()`: 45 canonical definitions (including the six CCR lifecycle tools, the agent-skills trio, `omniroute_radar_catalog`, and `omniroute_x_search`), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), and two RTK-only compression tools.

## ინსტალაცია

OmniRoute MCP ჩაშენებულია. დაიწყეთ:

```bash
omniroute --mcp
```

ან ღია სატრანსპორტო საშუალებით:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

HTTP ტრანსპორტები (`sse` / `streamable-http`, დაფის სერვერის მიერ დამუშავების პროცესში მოწოდებული) ნაგულისხმევად გამორთულია და ადრე მხოლოდ `/dashboard/mcp` გვერდიდან გადართვა იყო შესაძლებელი. v3.8.51-ისთვის CLI აქვს პარიტეტი:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH იგივე `mcpEnabled` (და სურვილისამებრ `mcpTransport`) დაფის დაყენება იცვლება `/api/settings` მეშვეობით. `mcp restart` უწოდებს `POST /api/mcp/restart`: ის ანგრევს აქტიურ `sse`/`streamable-http` სესიებს, ასე რომ, შემდეგი მოთხოვნა ხელახლა ინიციალდება სუფთად, აბრუნებს `409`, თუ MCP გამორთულია და `501` `stdio` ტრანსპორტისთვის (stdio კლიენტებს აქვთ საკუთარი ქვეპროცესი — არ არსებობს პროცესის ხელახალი სახელური გადატვირთვისთვის).

## ტრანსპორტი

MCP სერვერი ავლენს სამ ტრანსპორტს, ყველა მხარს უჭერს იგივე `createMcpServer()` ქარხანას:

| ტრანსპორტი        | სად                                               | როდის გამოვიყენოთ                                               |
| :---------------- | :------------------------------------------------ | :-------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                   | IDE ინტეგრაციები (Claude Desktop, Cursor და ა.შ.)               |
| `sse`             | `POST/GET /api/mcp/sse` `httpTransport` მეშვეობით | Browser/agent კლიენტები, რომლებსაც სჭირდებათ ღონისძიების ნაკადი |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                 | მრავალ სესიის HTTP კლიენტები (`mcp-session-id` სათაური)         |

აქტიური HTTP ტრანსპორტი (`sse` ან `streamable-http`) შეირჩევა `mcpTransport` პარამეტრით. ტრანსპორტის გადართვა ხურავს არსებულ სესიებს სხვა ტრანსპორტზე.

### დისტანციური წვდომა (შეზღუდვის არეალის მართვა)

`/api/mcp/*` არის LOCAL_ONLY იარუსში (`src/server/authz/routeGuard.ts`) — ნაგულისხმევად მხოლოდ loopback ჰოსტებს (`localhost`, `127.0.0.1`, `::1`) შეუძლიათ მიაღწიონ მას. v3.8.2-დან მოყოლებული, არა loopback კლიენტებს შეუძლიათ დაკავშირება, თუ ისინი წარმოადგენენ `Authorization: Bearer <api-key>`, რომლის გასაღები ატარებს `manage` სპექტს. ეს არის ერთადერთი გზა, რომ მიაღწიოთ დისტანციურ MCP სერვერს გვირაბის, საპირისპირო პროქსის ან საჯარო ჰოსტის სახელის მეშვეობით.

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

არამართვის გასაღები (ან არ არის Bearer) აბრუნებს `403 LOCAL_ONLY`. ძმური პრეფიქსი `/api/cli-tools/runtime/*` არის განზრახ NOT შემოვლითი — იხილეთ [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### წარმოშობის დადასტურება

ავთენტიფიკაციის შემდეგ, ყველა მოთხოვნა `/api/mcp/*` — ტრანსპორტისა და მართვის მარშრუტებისადმი, როგორიცაა `status`, `tools`, `audit` და `restart` — დამოწმებულია მისი `Origin` სათაური, როგორიც არ უნდა იყოს აბონენტი (API კლავიში, CLI ჟეტონი, დაფის სესია ან ანონიმური loopback შესვლა გამორთულია). ეს არის DNS-განახლებადი დაცვა, რომელსაც მოითხოვს MCP Streamable HTTP სპეციფიკაცია.

- **`Origin` სათაური არ არის** → დაშვებულია. OmniRoute CLI, SDK და IDE კლიენტები არ აგზავნიან ერთს.
- **ნებადართული `Origin`** → `localhost`, `127.0.0.1` ან `[::1]` ნებისმიერ პორტზე, ან OmniRoute ის საკუთარი საჯარო წარმოშობა: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, სანდო საპირისპირო პროქსის გადაგზავნილი საწყისი (`OMNIROUTE_TRUST_PROXY`, მხოლოდ მაშინ, როდესაც არ არის დაყენებული საბაზისო URL ) ან პირდაპირი loopback/LAN IP ჰოსტი. მარტო `Host` სათაური არასოდეს ხდის წარმოშობის სანდოს.
- **ნებისმიერი სხვა `Origin`, მათ შორის `null`** → `403` JSON-RPC შეცდომის კორპუსით: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. დაფის სესია, რომელიც წარმოადგენს მოქმედ CSRF ჟეტონს, კვლავ მიღებულია, როგორც სხვა დაფის წერებში.

ბრაუზერის MCP კლიენტს, რომელსაც ემსახურება საპირისპირო პროქსი, სჭირდება `OMNIROUTE_PUBLIC_BASE_URL`; სხვა წარმოშობის დასაშვები სია არ არსებობს. CORS preflight (`OPTIONS`) არ არის შემოწმებული წარმოშობა; მოთხოვნა, რომელიც მოყვება არის.

## IDE კონფიგურაცია

იხილეთ [MCP Client Configuration](../guides/SETUP_GUIDE.md#mcp-client-configuration) Claude Desktop, Cursor, Cline და თავსებადი MCP კლიენტის დაყენებისთვის.

---

## ძირითადი ინსტრუმენტები (14) — ფაზა 1

| ხელსაწყო                        | ფარგლები              | აღწერა                                                                                                                                     |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | მუშაობის დრო, მეხსიერება, ამომრთველები, სიჩქარის ლიმიტები, ქეში სტატისტიკა                                                                 |
| `omniroute_list_combos`         | `read:combos`         | ყველა კონფიგურირებული კომბინაცია სტრატეგიებით (სურვილისამებრ მეტრიკა)                                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | შესრულების მეტრიკა კონკრეტული კომბინაციისთვის                                                                                              |
| `omniroute_switch_combo`        | `write:combos`        | გააქტიურეთ ან გამორთეთ კომბინირებული                                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | შექმენით დადასტურებული კომბინაცია არსებული კომბინირებული API მეშვეობით                                                                     |
| `omniroute_check_quota`         | `read:quota`          | კვოტა used/total, დარჩენილი პროცენტი, გადატვირთვის დრო, სიმბოლოს ჯანმრთელობა                                                               |
| `omniroute_route_request`       | `execute:completions` | გაგზავნეთ ჩატის დასრულება OmniRoute მარშრუტირების საშუალებით                                                                               |
| `omniroute_cost_report`         | `read:usage`          | ღირებულების ანგარიში პერიოდების მიხედვით (session/day/week/month)                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | მოდელის სრული კატალოგი შესაძლებლობებით, სტატუსით, ფასებით                                                                                  |
| `omniroute_radar_catalog`       | `read:radar`          | ადგილობრივი ხელმოწერილი რადარის კატალოგი; სურვილისამებრ provider/family ფილტრები                                                           |
| `omniroute_tool_search`         | `read:tools`          | აღმოაჩინეთ ინსტრუმენტები რეგისტრირებული MCP კატალოგიდან                                                                                    |
| `omniroute_web_search`          | `execute:search`      | ვებ ძიება კონფიგურირებული საძიებო პროვაიდერების მეშვეობით. არა X/Twitter.                                                                  |
| `omniroute_x_search`            | `execute:search`      | მოძებნეთ X მეშვეობით xAI/SuperGrok, ან აირჩიეთ `xquik-search` Xquik API შედეგებისთვის. საჭიროებს რწმუნებათა სიგელებს არჩეული ბექენდისთვის. |
| `omniroute_web_fetch`           | `execute:search`      | მიიღეთ ვებ შინაარსი კონფიგურირებული Fetch პროვაიდერების მეშვეობით                                                                          |

## გაფართოებული ხელსაწყოები (11) — ფაზა 2

| ხელსაწყო                           | ფარგლები                             | აღწერა                                                                                                                         |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | მშრალი გაშვების მარშრუტიზაციის სიმულაცია სარეზერვო ხესთან ერთად                                                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | სესიის ბიუჯეტი degrade/block/alert მოქმედებით                                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | განაახლეთ კომბინირებული სტრატეგია გაშვების დროს (priority/weighted/auto/etc.)                                                  |
| `omniroute_set_resilience_profile` | `write:resilience`                   | გამოიყენეთ `aggressive` / `balanced` / `conservative` გამძლეობის წინასწარ დაყენება                                             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | ყველა პროვაიდერის ცოცხალი ტესტი კომბინაციით რეალური ზემორეული ზარის გამოყენებით                                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | თითო პროვაიდერის მეტრიკა p50/p95/p99 შეყოვნებით და ამომრთველის მდგომარეობით                                                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | რეკომენდაცია კომბინირებული ამოცანის ტიპის მიხედვით budget/latency შეზღუდვებით                                                  |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ახსენით, რატომ იქნა მოთხოვნა მიწოდებული პროვაიდერთან (შეფასების ფაქტორები + სარეზერვო)                                         |
| `omniroute_get_session_snapshot`   | `read:usage`                         | სრული სესიის სურათი: ღირებულება, ნიშნები, top models/providers, შეცდომები, ბიუჯეტის დაცვა                                      |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | დიაგნოსტიკა (და სურვილისამებრ ავტომატური შეკეთება) მონაცემთა ბაზის დრიფტის მსგავსად გატეხილი კომბინირებული refs / ობოლი რიგები |
| `omniroute_sync_pricing`           | `pricing:write`                      | ფასების მონაცემების სინქრონიზაცია გარე წყაროებიდან (LiteLLM); მხარს უჭერს `dryRun`                                             |

## ქეში ინსტრუმენტები (2)

| ხელსაწყო                | ფარგლები      | აღწერა                                                  |
| :---------------------- | :------------ | :------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | სემანტიკური ქეში, სწრაფი ქეში და იმპოტენციის სტატისტიკა |
| `omniroute_cache_flush` | `write:cache` | ქეშის გასუფთავება გლობალურად ან signature/model ით      |

## შეკუმშვის ხელსაწყოები (13)

| ხელსაწყო                            | ფარგლები            | აღწერა                                                                                                                                |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | შეკუმშვის პარამეტრები, ანალიტიკის შეჯამება და ქეშის შესახებ სტატისტიკა (მოიცავს `analytics.mcpDescriptionCompression` მეტამონაცემებს) |
| `omniroute_compression_configure`   | `write:compression` | შეკუმშვის რეჟიმის კონფიგურაცია, ბარიერი, სამიზნე თანაფარდობა, სისტემის მოთხოვნის შენარჩუნება, MCP აღწერილობის შეკუმშვის გადართვა      |
| `omniroute_set_compression_engine`  | `write:compression` | აირჩიეთ აქტიური ძრავა (off/caveman/rtk/stacked) და Caveman/RTK ინტენსივობა                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | ჩამოთვალეთ დასახელებული შეკუმშვის კომბინაციები და მათი ძრავის მილსადენები                                                             |
| `omniroute_compression_combo_stats` | `read:compression`  | ანალიტიკა დაჯგუფებულია შეკუმშვის კომბინაციისა და ძრავის მიხედვით                                                                      |
| `omniroute_ccr_store`               | `write:compression` | შეინახეთ აბონენტის მიერ იზოლირებული კონტენტი შეზღუდული მეხსიერებაში CCR მაღაზიაში და დააბრუნეთ მარკერი პლუს `ccr://` მითითება         |
| `omniroute_ccr_retrieve`            | `read:compression`  | მიიღეთ CCR შინაარსი სრულად ან ხელმძღვანელის, კუდის, ხაზების, grep და სტატისტიკის რეჟიმებით                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | შეამოწმეთ აბონენტის საკუთრებაში არსებული CCR მეტამონაცემები კონტენტის დაბრუნების გარეშე                                               |
| `omniroute_ccr_list`                | `read:compression`  | ჩამოთვალეთ გვერდით დაწერილი მეტამონაცემები აბონენტის საკუთრებაში არსებული CCR ბლოკებისთვის                                            |
| `omniroute_ccr_delete`              | `write:compression` | წაშალეთ აბონენტის საკუთრებაში არსებული CCR ბლოკი                                                                                      |
| `omniroute_ccr_stats`               | `read:compression`  | შეატყობინეთ აბონენტის ფარგლებში მეხსიერების გამოყენებას, სიცოცხლის ციკლის მრიცხველებს და შენახვის ლიმიტებს                            |
| `omniroute_rtk_discover`            | `read:compression`  | აღმოაჩინეთ განმეორებადი ხმაური opt-in RTK გამომავალი ნიმუშებში                                                                        |
| `omniroute_rtk_learn`               | `read:compression`  | შექმენით განხილვადი RTK ფილტრის მონახაზი დაკომპლექტებული ნიმუშებიდან                                                                  |

CCR ჩანაწერები არის მხოლოდ მეხსიერებაში და ქრება გადატვირთვისას. თითოეული ბლოკი შემოიფარგლება 2 MiB, თითოეული ძირითადი 16 MiB, ხოლო გლობალური მაღაზია 64 MiB. ჩანაწერები ნაგულისხმევად არის 24-საათიანი TTL (მაქსიმუმ შვიდი დღე). სრული MCP მოძიება შემოიფარგლება 256 KiB ით; უფრო დიდი ბლოკები რჩება ხელმისაწვდომი დიაპაზონის და grep რეჟიმების მეშვეობით. შენახვა, მოძიება, ჩამონათვალი, შემოწმება, წაშლა და სტატისტიკა იზოლირებულია ავტორიზებული API გასაღების პრინციპით. აუდიტის ჩანაწერები შეიცავს ჰეშებსა და ზომის მეტამონაცემებს და არასოდეს შინაარსს.

`omniroute_compression_status` ავრცელებს MCP აღწერილობის შეკუმშვას ცალკე `analytics.mcpDescriptionCompression` ქვეშ. ეს მნიშვნელობები არის მეტამონაცემების ზომის შეფასებები MCP ჩამონათვალის აღწერებისთვის (`tools`, `prompts`, `resources` და `resourceTemplates`); ისინი არ არიან პროვაიდერის გამოყენების ქვითრები და მონიშნულია `source: "mcp_metadata_estimate"` ით.

### MCP Accessibility Tree Filter (v3.8.0)

ზემოთ ჩამოთვლილი შეკუმშვის ხელსაწყოებისგან განცალკევებით, OmniRoute შეიცავს შესრულების შემდგომ ფილტრს, რომელიც შეკუმშავს** ხელსაწყოს შედეგები** MCP browser/accessibility ინსტრუმენტები, სანამ ისინი დაუბრუნდებიან აგენტს. ეს ფილტრი თავისთავად არ არის ინსტრუმენტი — ის მუშაობს გამჭვირვალედ ნებისმიერი ინსტრუმენტის შედეგზე, რომელიც შეიცავს ვრცელ ხელმისაწვდომობის ხეს ან ბრაუზერის სნეპშოტის ტექსტს (≥ 2000 სიმბოლო).

ძირითადი ქცევები:

- იშლება ≥ 30 ზედიზედ განმეორებითი და-ძმის ხაზი თავში + კუდის შეჯამებად
- ინარჩუნებს `[ref=eXX]` წამყვანებს, რომლებიც საჭიროა Playwright/computer-use
- მყარად ჭრის დიდი ზომის ტექსტს (> 50,000 სიმბოლო) ნავიგაციის მინიშნებით
- მოსალოდნელი დანაზოგი:** 60–80%** ბრაუზერის სნეპშოტის დატვირთვებზე

კონფიგურაცია: `compression.mcpAccessibility` გლობალურ პარამეტრებში (მიგრაცია 056). განხორციელება: `open-sse/services/compression/engines/mcpAccessibility/`. სრული დოკუმენტები: [შეკუმშვის ძრავები — MCP ხელმისაწვდომობის ხის ფილტრი](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

იხილეთ [შეკუმშვის ძრავები](../compression/COMPRESSION_ENGINES.md) და [RTK შეკუმშვა](../compression/RTK_COMPRESSION.md) ამ ხელსაწყოების მიღმა გაშვებული შეკუმშვის მოდელისთვის.

## 1 პროქსი ინსტრუმენტები (3)

| ხელსაწყო                    | ფარგლები       | აღწერა                                                                                        |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | მიიღეთ უფასო მარიონეტები 1პროქსი ბაზრიდან (protocol/country/quality/limit ფილტრები)           |
| `omniroute_oneproxy_rotate` | `read:proxies` | მიიღეთ შემდეგი ხელმისაწვდომი პროქსი სტრატეგიის მიხედვით (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | აუზის სტატისტიკა, სინქრონიზაციის სტატუსი, განაწილება პროტოკოლისა და ქვეყნის მიხედვით          |

## მეხსიერების ხელსაწყოები (3)

განსაზღვრულია `open-sse/mcp-server/tools/memoryTools.ts` ში. Auth/scope სრულდება სტანდარტული MCP მოცულობის მილსადენის მეშვეობით.

| ხელსაწყო                  | ფარგლები       | აღწერა                                                                                                           |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | მოძებნეთ მოგონებები შეკითხვის / ტიპის / API კლავიშის მიხედვით, ტოკენ-ბიუჯეტის აღსრულებით                         |
| `omniroute_memory_add`    | `write:memory` | დაამატეთ ახალი მეხსიერების ჩანაწერი (`factual` / `episodic` / `procedural` / `semantic`)                         |
| `omniroute_memory_clear`  | `write:memory` | გაასუფთავეთ მეხსიერება API გასაღებისთვის, სურვილისამებრ გაფილტრული ტიპის ან `olderThan` დროის ანაბეჭდის მიხედვით |

## უნარების ინსტრუმენტები (4)

განსაზღვრულია `open-sse/mcp-server/tools/skillTools.ts` ში. მხარს უჭერს `src/lib/skills/registry` + `src/lib/skills/executor`.

| ხელსაწყო                      | ფარგლები         | აღწერა                                                                                                    |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | ჩამოთვალეთ რეგისტრირებული უნარები არჩევითი ფილტრით API კლავიშის, სახელის ან ჩართული მდგომარეობის მიხედვით |
| `omniroute_skills_enable`     | `write:skills`   | ჩართეთ ან გამორთეთ კონკრეტული უნარი ID მიერ                                                               |
| `omniroute_skills_execute`    | `execute:skills` | შეასრულეთ უნარი მოწოდებული შეყვანით და დააბრუნეთ შესრულების ჩანაწერი                                      |
| `omniroute_skills_executions` | `read:skills`    | ჩამოთვალეთ უახლესი უნარების შესრულების ისტორია                                                            |

## Notion კონტექსტური წყარო (6)

განსაზღვრულია `open-sse/mcp-server/tools/notionTools.ts` ში. ჟეტონი ინახება `key_value` ცხრილში `src/lib/db/notion.ts` საშუალებით. REST კლიენტი `src/lib/notion/api.ts` ში. პარამეტრები API `src/app/api/settings/notion/route.ts` ში. დაფა UI in `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

დააკონფიგურირეთ თქვენი Notion ინტეგრაციის ჟეტონი დან** კონტექსტური წყაროები** ჩანართი ბოლო წერტილის დაფაზე, ან REST API ის მეშვეობით:

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

| ხელსაწყო                     | ფარგლები       | აღწერა                                                                  |
| :--------------------------- | :------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | სრული ტექსტის ძიება ყველა გვერდზე და მონაცემთა ბაზაში                   |
| `notion_get_page`            | `read:notion`  | მიიღეთ გვერდი ID მიერ თავისი თვისებებით                                 |
| `notion_list_block_children` | `read:notion`  | ჩამოთვალეთ გვერდის ან ბლოკის საბავშვო ბლოკები                           |
| `notion_query_database`      | `read:notion`  | მოითხოვეთ მონაცემთა ბაზა ფილტრებით, სორტირებით და პაგინაციებით          |
| `notion_get_database`        | `read:notion`  | მიიღეთ მონაცემთა ბაზის სქემა ID ს მიერ                                  |
| `notion_append_blocks`       | `write:notion` | ბავშვთა ბლოკების დამატება მშობლის ბლოკში (მაქსიმუმ 100 თითო მოთხოვნაზე) |

## აგენტის უნარების კატალოგი ინსტრუმენტები (3)

განსაზღვრულია `open-sse/mcp-server/tools/agentSkillTools.ts` ში. მხარს უჭერს `src/lib/agentSkills/catalog`. ეს ხელსაწყოები ამჟღავნებს 45 ჩანაწერის Agent Skills დოკუმენტაციის კატალოგს MCP კლიენტებსა და გარე აგენტებს. სფერო: `read:catalog`.

| ხელსაწყო                          | ფარგლები       | აღწერა                                                                                                                             |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ჩამოთვალეთ აგენტის 45-ვე უნარი არჩევითი `category` (api\| cli) და `area` ფილტრებით; აბრუნებს მეტამონაცემების + დაფარვას            |
| `omniroute_agent_skills_get`      | `read:catalog` | მიიღეთ სრული მეტამონაცემების + SKILL.md შინაარსი ერთი უნარისთვის კანონიკური `id` ით                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | დაფარვის სტატისტიკა: 23 API, 21 CLI და 1 კონფიგურაციის უნარებიდან რამდენს აქვს SKILL.md ფაილები ფაილურ სისტემაში კატალოგის ჯამებში |

იხილეთ [AGENT-SKILLS.md](./AGENT-SKILLS.md) სრული კატალოგისთვის და როგორ მოიხმარენ მას გარე აგენტები.

## Related Frameworks (v3.8.0)

MCP ინსტრუმენტის ინვენტარი ზემოთ (110 უნიკალური ხელსაწყო, გამოთვლილია `countUniqueMcpTools()`) განზრახ არის მოცული routing/cache/compression/memory/skills/proxy/context-source ოპერაციებისთვის. ორი მეზობელი ფრეიმერი იგზავნება MCP სერვერთან ერთად v3.8.0-ში და დოკუმენტირებულია ცალკე:

### ღრუბლოვანი აგენტები

Cloud Agents არის AI კოდირების აგენტები (codex-cloud, cursor-cloud, devin, jules) ჩართული OmniRoute ში იმავე კავშირის მოდელის მეშვეობით, რომელიც გამოიყენება LLM პროვაიდერებისთვის. ისინი გამოვლენილია საკუთარი REST ზედაპირის (`/api/v1/agents/*`) მეშვეობით და არიან** არა** MCP ხელსაწყოების კატალოგის ნაწილი — Cloud Agent-ის გამოძახებით არ მოიხმარს MCP ფარგლებს.

- განხორციელება: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- სიცოცხლის ციკლი: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- დოკუმენტაცია: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### მცველები

დამცავი ზოლები არის pre/post-execution ფილტრები (ხედვის ხიდი, pii-masker, სწრაფი ინექცია), რომელიც გამოიყენება ჩატის მილსადენში. ისინი გადის MCP tool/route ფენის მიღწევამდე და ასხივებენ სტრუქტურულ დარღვევებს აუდიტის მილსადენში; ისინი არ გამოიყენება როგორც MCP ინსტრუმენტები.

- განხორციელება: `src/lib/guardrails/`.
- დოკუმენტაცია: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

MCP ზარის გამართვისას, რომელიც, როგორც ჩანს, დაბლოკილია, შეამოწმეთ როგორც MCP აუდიტის ჟურნალი (`scope_denied:*` ჩანაწერები) ასევე დამცავი რელსების აუდიტის ბილიკი — მოთხოვნა შეიძლება უარყოს დამცავი მოაჯირის მიერ** ადრე** ის ოდესმე აღწევს MCP სფეროს აღსრულების ფენას.

---

## REST API საბოლოო წერტილები

| ბოლო წერტილი           | მეთოდი                | აღწერა                                                                                                        | ავტორიზაცია                |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------- |
| `/api/mcp/status`      | `GET`                 | სერვერის სტატუსი: გულისცემა, HTTP ტრანსპორტის მდგომარეობა, აუდიტის აქტივობის შეჯამება                         | მენეჯმენტი (session/admin) |
| `/api/mcp/tools`       | `GET`                 | ხელსაწყოების კატალოგი (სახელი, აღწერა, ფარგლები, ფაზა, წყაროს საბოლოო წერტილები)                              | მენეჯმენტი                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ტრანსპორტის საბოლოო წერტილი (შეზღუდულია `mcpEnabled` + `mcpTransport === "sse"`)                          | API გასაღები + სფეროები    |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | სტრიმირებადი HTTP ტრანსპორტი (იყენებს `mcp-session-id` სათაურს; `DELETE` ამთავრებს სესიას)                    | API გასაღები + სფეროები    |
| `/api/mcp/audit`       | `GET`                 | აუდიტის ჟურნალის ჩანაწერები `mcp_tool_audit` დან (ფილტრები: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | მენეჯმენტი                 |
| `/api/mcp/audit/stats` | `GET`                 | აგრეგირებული აუდიტის სტატისტიკა (`totalCalls`, `successRate`, `avgDurationMs`, საუკეთესო ინსტრუმენტები)       | მენეჯმენტი                 |

წყარო ფაილები: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

ორივე SSE და Streamable HTTP ტრანსპორტი დაბლოკილია, სანამ MCP სერვერი არ ჩაირთვება პარამეტრებში (`mcpEnabled`) და არ აირჩევა შესაბამისი `mcpTransport`. თუ არასწორი ტრანსპორტი არის კონფიგურირებული, მარშრუტი აბრუნებს HTTP 400 პარამეტრების გადართვის მინიშნებით.

---

## ავთენტიფიკაცია და ფარგლები

MCP ინსტრუმენტის ზარები კითხულობს სტრიქონებს აბონენტისგან. ეს შემოწმება არის სამი დამოუკიდებელი სახელების ადგილიდან ერთ-ერთი. ერთი გამშვები პასი არ არის გადაცემა სხვებისგან. წესები [სამი სფეროს სახელების სივრცეა](#three-scope-namespaces). ხელსაწყოების კატალოგი არის [MCP ინსტრუმენტი scopes](#mcp-tool-scopes).

### სამი სფეროს სახელების სივრცე

`manage` API კლავიშზე, `read:compression` MCP ხელსაწყოზე და `read` `oma_live_…` წვდომის ჟეტონზე სამი განსხვავებული გრანტია. აბონენტები, რომლებიც აგზავნიან `read` წვდომის ჟეტონს მუტაციურ მართვის მარშრუტზე, იღებენ HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` ეს წოდება არის `scopeSatisfies`. ის არ ამოწმებს MCP ცხრილს და MCP შესატყვისი არ ამოწმებს მას.

| სახელთა სივრცე            | რწმუნებათა სიგელები                                                            | გამშვები                     | საშვი იძლევა საშუალებას                                    |
| :------------------------ | :----------------------------------------------------------------------------- | :--------------------------- | :--------------------------------------------------------- |
| API გასაღების მართვა      | `api_keys.scopes`                                                              | `hasManageScope`             | მენეჯმენტი REST ამ მატარებლის გასაღებისთვის                |
| API-გასაღების დანამატი    | იგივე მასივი, ერთი ზუსტი სტრიქონი                                              | ქვემოთ დასახელებული დამხმარე | მხოლოდ ერთი უნარი                                          |
| MCP ინსტრუმენტის ფარგლები | იგივე მასივი, სხვა MCP `_meta` (მხოლოდ HTTP/SSE ), სხვა `OMNIROUTE_MCP_SCOPES` | `scopeMatches`               | ეს ინსტრუმენტი, როგორც კი აღსრულება ჩართულია               |
| წვდომის ჟეტონი            | `oma_live_…`                                                                   | `scopeSatisfies`             | მართვის მარშრუტი, რომლის მეთოდი და გზა მოითხოვს ამ წოდებას |

თითოეული რწმუნებათა სიგელის მოპოვება დაფარულია [მენეჯმენტის ავთენტიფიკაციაში](../guides/MANAGEMENT-AUTH.md).

#### API-გასაღების სფეროები

ერთი `api_keys.scopes` მასივი კვებავს ორ სამუშაოს. ისინი იყენებენ სხვადასხვა ფუნქციებს.

**მენეჯმენტი REST.** `manage` და `admin` არიან `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) წევრები. `hasManageScope` არის ის, რაც უფლებას აძლევს მართვის მარშრუტებს ამ გასაღებისთვის. `admin` არის მართვის უნარი ამ მარშრუტებზე. სიტყვა `admin` აქ არ არის წვდომის ნიშნის წოდება და ის არ ვრცელდება MCP ხელსაწყოების სფეროებში.

**დანამატი სიმები.** თითოეული მათგანი ზუსტი წევრობის ტესტია და თითოეული რჩება `MANAGEMENT_API_KEY_SCOPES` გარეთ.

| ფარგლები                       | საშვი იძლევა საშუალებას                                                                                                                                              |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | არა მარყუჟის `/api/mcp/` LOCAL_ONLY მხოლოდ ამოკვეთა (`hasMcpConnectOrManageScope`). გასაღები `manage` ით ან `admin` მაინც გადის ამ ამოკვეთაზე.                       |
| `self:usage`                   | `GET /api/v1/me/status` ამ გასაღებისთვის (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` ამატებს ამ სფეროს შექმნაზე (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | ზემოთ ნაკადის ანგარიშის კვოტები ამ სტატუსის დატვირთვის შიგნით (`src/lib/usage/apiKeySelfService.ts`). სტატუსის მარშრუტი კვლავ მოითხოვს `self:usage`.                 |
| `policy:bypass-provider-quota` | ამ გასაღების დასკვნის ზარები გამოტოვეთ პროვაიდერის კვოტის პოლიტიკა (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                    |

#### შესატყვისი

კატალოგი არის ცხრილი [MCP ხელსაწყოების](#mcp-tool-scopes) ფარგლებში. ნუ განიხილავთ `MCP_SCOPE_LIST` `src/shared/constants/mcpScopes.ts` ში, როგორც იმ კატალოგს: ეს არის ორიგინალური აკრეფილი ქვეჯგუფი. მოგვიანებით ინსტრუმენტები აცხადებენ მის გვერდით შემდგომ მოქმედებებს (`read:notion`, `read:skills`, `read:local-corpus` და დანარჩენი ცხრილი).

`evaluateToolScopes` `open-sse/mcp-server/scopeEnforcement.ts` ში დარეკვის საშუალებას იძლევა, როდესაც ყველა საჭირო საზღვრები ემთხვევა გარკვეულ მინიჭებულ ფარგლებს:

- `*` შეესაბამება ყველა საჭირო სფეროს.
- მინიჭებული დიაპაზონი, რომელიც მთავრდება `*` ზე, ემთხვევა საჭირო ფარგლებს, რომელიც იწყება ვარსკვლავის წინ პრეფიქსით. `read:*` ემთხვევა `read:compression`.
- ყველა სხვა მინიჭებული ფარგლები ემთხვევა მხოლოდ იდენტურ საჭირო სტრიქონს.

გასაღები, რომლის ფარგლებიც არის `["manage"]` ვერ ხერხდება `scopeMatches` `read:compression` სთვის. იგივე გამოძახება ვერ ხერხდება `admin`, `mcp:connect`, `read` და `write` ისთვის, როდესაც ეს მხოლოდ მინიჭებული სტრიქონებია. MCP ხელსაწყოების ფარგლებს შორის არ არსებობს იერარქია ბოლო `*` მიღმა.

აღსრულება გამორთულია, თუ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (ნაგულისხმევი `false`). სანამ ის გამორთულია, `evaluateToolScopes` ნებას რთავს ზარს და გამოტოვებს კატალოგს. სანამ ის ჩართულია, HTTP იყენებს მატარებლის გასაღების `api_keys.scopes` როგორც `authInfo` (იხ. [თითო კლავიშის HTTP ფარგლების შეკვრა](#per-key-http-scope-binding-7895) ). როდესაც გასაღების სფეროები არ წყდება, მინიჭებული ნაკრები გადადის MCP `_meta` ზე (დაფასებული მხოლოდ HTTP/SSE აბონენტებისთვის, HTTP auth კონტექსტში; stdio აბონენტის `_meta` იგნორირებულია, რადგან კლიენტი აკონტროლებს მას და ის არ ატარებს თითო აბონენტის იდენტურობას), შემდეგ `OMNIROUTE_MCP_SCOPES`.

#### ხელმისაწვდომობის ნიშნების ფარგლები

`oma_live_…` ნიშნები (`src/lib/accessTokens/scopes.ts`) ატარებენ `read`, `write` ან `admin`. `scopeSatisfies` არის წოდება: `admin` მოიცავს `write` და `read`, და `write` მოიცავს `read`. უცნობი სფეროები არაფერს მოიცავს.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ადარებს ამ წოდებას `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` და `OPTIONS` მოითხოვს `read`.
- ყველა სხვა მეთოდი მოითხოვს `write`.
- ბილიკები `ADMIN_SCOPE_PREFIXES` ში მოითხოვს `admin` ყველა მეთოდისთვის. `/api/mcp` არის ამ სიაში, ამიტომ `write` წვდომის ჟეტონს ჯერ კიდევ არ შეუძლია MCP HTTP ზედაპირის გამოძახება.
- ბილიკები `ADMIN_MUTATION_PREFIXES` ში მოითხოვს `admin` მხოლოდ მუტაციებისთვის.
- ბილიკები `ADMIN_MUTATION_EXACT_PATHS` ში (`/api/settings`, `/api/settings/require-login`) მოითხოვს `admin` მხოლოდ მუტაციებისთვის და მხოლოდ ზუსტად ამ გზაზე — სხვა `/api/settings/*` ქვე-მარშრუტები ინარჩუნებენ `write`.

`PATCH /api/keys/{id}` არის მუტაცია და არ არის ამ ადმინისტრატორთა სიებში, ამიტომ `read` ჟეტონი იღებს 403 `Access token scope 'read' is insufficient; 'write' required.` `write` ან `admin` წვდომის ნიშანი აკმაყოფილებს ამ მარშრუტს. დაფა JWT, loopback CLI machine-id ჟეტონი და API კლავიში `manage` ან `admin` იღებენ სხვა განშტოებებს და არ ვიწროვდებიან ამ წოდებით.

წვდომის ჟეტონი, რომელიც გადის `scopeSatisfies` `/api/mcp` სთვის, გაასუფთავა მხოლოდ მართვის კარიბჭე. ხელსაწყოების ზარები კვლავ აწარმოებს `scopeMatches` API-გასაღების სფეროებში. ხელმისაწვდომობის ნიშანი არ არის `scopeMatches` ის შეყვანა.

### MCP ინსტრუმენტის ფარგლები

სფეროს აღსრულება ცენტრალიზებულია `open-sse/mcp-server/scopeEnforcement.ts` ში. თითოეული ინსტრუმენტი მოითხოვს სპეციფიკურ სფეროებს:

| ფარგლები              | ხელსაწყოები                                                                                                                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                      |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                              |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                 |
| `read:quota`          | `check_quota`                                                                                                                                                                          |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                 |
| `read:models`         | `list_models_catalog`                                                                                                                                                                  |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                          |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                  |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                     |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                            |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                         |
| `read:cache`          | `cache_stats`                                                                                                                                                                          |
| `write:cache`         | `cache_flush`                                                                                                                                                                          |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                             |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                      |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                  |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                       |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                 |
| `read:memory`         | `memory_search`                                                                                                                                                                        |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                           |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                     |
| `write:skills`        | `skills_enable`                                                                                                                                                                        |
| `execute:skills`      | `skills_execute`                                                                                                                                                                       |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                       |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                              |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                       |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                         |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                     |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                        |
| `read:obsidian`       | წაკითხვის 13 ინსტრუმენტი — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`,… |
| `write:obsidian`      | 9 ჩაწერის ხელსაწყოები — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, ...               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                      |

Wildcard scopes მხარდაჭერილია: `read:*` ანიჭებს ყველა წაკითხვის სფეროს, `*` ანიჭებს სრულ წვდომას.

### `mcp:connect` — ვიწრო მარშრუტის შესაძლებლობა (#7895)

HTTP/SSE MCP ტრანსპორტის (`/api/mcp/*`) მიღწევა არა-მარყუჟიდან მოითხოვს `/api/mcp/` LOCAL_ONLY ამოკვეთას (იხ. `docs/security/ROUTE_GUARD_TIERS.md`). ისტორიულად, ეს ამოკვეთა იღებდა მხოლოდ სრულ `manage`/`admin` -scope API კლავიშს — ძალიან ფართო იმ აბონენტისთვის, რომელსაც მხოლოდ MCP საუბარი სჭირდება. `src/shared/constants/managementScopes.ts` ახლა ექსპორტს ახორციელებს `MCP_CONNECT_SCOPE = "mcp:connect"`: დანამატი, ვიწრო ფარგლები (იგივე პრეცედენტი, როგორც `SELF_USAGE_SCOPE`), რომელიც იძლევა ONLY `/api/mcp/` შემოვლების უფლებას `src/server/authz/policies/management.ts` — ში, იგი არ იძლევა სხვა მართვის მარშრუტზე წვდომას და შეგნებულად ინახება OUT of `MANAGEMENT_API_KEY_SCOPES`. გასაღები, რომელსაც უჭირავს `manage`/`admin`, კვლავ გადის ამოკვეთას უცვლელად; `mcp:connect` არის დაბალი პრივილეგიის ალტერნატივა დისტანციური MCP-მხოლოდ აბონენტებისთვის, შემოწმებული `hasMcpConnectOrManageScope()` მეშვეობით.

### თითო გასაღები HTTP სკუპის შეკვრა (#7895)

HTTP/SSE ზე, `open-sse/mcp-server/httpTransport.ts` ახლა წყვეტს აბონენტის რეალურ `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) მეშვეობით და გადასცემს მას MCP SDK ის `transport.handleRequest(req, { authInfo })` ზე, ასე რომ `extra.authInfo.scopes` ყოველი ხელსაწყოს გამოძახების მიღწევა ასახავს Bearer კლავიშის საკუთარ ფარგლებს. `scopeEnforcement.ts` ის `resolveCallerScopeContext()` უკვე აქვს პრიორიტეტული `authInfo` `_meta` ზე და `OMNIROUTE_MCP_SCOPES` env სარეზერვო — ეს მხოლოდ ავსებს პირველ, ყველაზე პრიორიტეტულ წყაროს, რომელიც ადრე არ იკვებებოდა HTTP ზე. როდესაც არცერთი API კლავიში არ წყდება (სათაური არ არის, არასწორი გასაღები), `authInfo` რჩება `undefined` და გარჩევადობა უცვლელი რჩება არსებულ `meta`/env ჯაჭვში. stdio-ს არ აქვს თითო აბონენტის იდენტურობა (იხ. `mcpCallerIdentity.ts`) და მასზე გავლენას არ ახდენს თითო კლავიშის დაკავშირება — ის გამოტოვებს `_meta` საფეხურს (`_meta` გათვალისწინებულია მხოლოდ HTTP auth კონტექსტში, #15159) და წყვეტს მხოლოდ `OMNIROUTE_MCP_SCOPES` env კლავიშიდან.

**აღსრულება იძულებულია ვიწრო მასშტაბის HTTP/SSE აბონენტებისთვის `OMNIROUTE_MCP_ENFORCE_SCOPES` ის მიუხედავად.** `OMNIROUTE_MCP_ENFORCE_SCOPES` ზე `false` ნაგულისხმევი დაყენება უსაფრთხოა მხოლოდ local/stdio ერთი ოპერატორის ნაკადისთვის, სადაც არ არსებობს თითო აბონენტის იდენტიფიკაცია. `open-sse/mcp-server/server.ts::withScopeEnforcement()` უპირობოდ ჩართავს თითო ხელსაწყოს ფარგლების აღსრულებას (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) ყოველთვის, როცა `resolveCallerScopeContext()` წყვეტს `source === "authInfo"` (ანუ რეალური თითო გასაღები HTTP ავტორიზაციის სათაური, HTTP/SSE-only) AND ეს გასაღები არ ინახავს სრულ `manage`/`admin` ასპექტს. ეს ახურებს უფსკრული, სადაც გასაღები, რომელსაც უჭირავს ONLY ვიწრო `mcp:connect` შემოვლითი არე, — ზემოთ დოკუმენტირებული, როგორც სხვაგვარად ავტორიზაცია, გარდა `/api/mcp/` LOCAL_ONLY ამოკვეთის — სხვაგვარად გამოიძახებს ყველა MCP ხელსაწყოს მას შემდეგ, რაც ოპერატორმა ჩართო remote/non-loopback MCP წვდომა, უბრალოდ იმიტომ, რომ `OMNIROUTE_MCP_ENFORCE_SCOPES` აგზავნის `false` ნაგულისხმევად. სრული `manage`/`admin` კლავიში HTTP ზე და ყველა stdio/local აბონენტი შეინარჩუნებს არსებულ `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated ქცევას უცვლელად.

---

## გარემოს ცვლადები

| ცვლადი                                  | ნაგულისხმევი                                    | მიზანი                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                        | URL ბაზას იყენებს MCP სერვერი OmniRoute შიდა APIs დარეკვისას                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_API_KEY`                     | (ცარიელი)                                       | API გასაღები გადამისამართებულია `Authorization: Bearer` ად შიდა API ზარებზე                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (მხოლოდ `"true"` საშუალებას აძლევს მას) | როდესაც ჩართულია, გამოტოვებული სფეროები უარყოფს ხელსაწყოს ზარებს და აღრიცხავს `scope_denied:<reason>` აუდიტის ჟურნალში. აღსრულება იძულებული ხდება ALSO ამ დროშის მიუხედავად ნებისმიერი HTTP/SSE აბონენტისთვის, რომელიც გადაწყვეტილია თითო კლავიშის ავტორიზაციის სათაურიდან (`source === "authInfo"`), რომელსაც არ აქვს სრული `manage`/`admin` ფარგლები — მაგ. გასაღები, რომელიც ფლობს მხოლოდ `mcp:connect` შემოვლითი არეალის — ასე რომ, ეს ნაგულისხმევი უსაფრთხოა მხოლოდ local/stdio არასოდეს ერთჯერადი ოპერატორის ხელახალი წვდომისთვის. |
| `OMNIROUTE_MCP_SCOPES`                  | (ცარიელი)                                       | ნაგულისხმევად „ხელმისაწვდომად“ მიჩნეული სკოპების მძიმით გამოყოფილი ნებადართული სია (გამოიყენება, როდესაც აბონენტი არ აწვდის საკუთარ ფარგლებს)                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ჩართულია = )                                   | როდესაც დაყენებულია `0/false/off/no` ზე, გამორთავს MCP აღწერილობის შეკუმშვას რეგისტრაციის დროს                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ჩართულია = )                                   | ალტერნატიული მეტსახელი იგივე გადართვისთვის, როგორც ზემოთ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                         | ბიუჯეტის შეწყვეტა შიდა მენეჯმენტისთვის (ჯანმრთელობა, გამძლეობა, კომბინაციები, კვოტა, გამოყენება)                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                         | ბიუჯეტის შეწყვეტა ჰოპებისთვის, რომლებიც ელიან პროვაიდერს (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `MCP_TOOL_DENY`                         | (გაუქმება = ფილტრის გარეშე)                     | მძიმით გამოყოფილი ხელსაწყოების სახელები ჩამოსაშლელი `tools/list` დან (ხელსაწყოების კარდინალურობის შემცირება — იხილეთ ქვემოთ)                                                                                                                                                                                                                                                                                                                                                                                                             |
| `MCP_TOOL_ALLOW`                        | (გაუქმება = ფილტრის გარეშე)                     | მძიმით გამოყოფილი ხელსაწყოების სახელები ექსკლუზიურად შესანახად (დაშვებული სიის რეჟიმი — იხილეთ ქვემოთ)                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `DATA_DIR`                              | `~/.omniroute`                                  | Heartbeat ფაილი იწერება `${DATA_DIR}/runtime/mcp-heartbeat.json` ზე                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

---

## აღწერა შეკუმშვა

MCP ინსტრუმენტს, მოთხოვნას და რესურსების რეესტრებს შეუძლიათ შეკუმშოს აღწერილობები registration/list დროით, რათა შეამცირონ მეტამონაცემების კვალი, რომელიც ექვემდებარება კლიენტებს (და შესაბამისად, სწრაფი კონტექსტის ღირებულება). იმპლემენტაცია მუშაობს `open-sse/mcp-server/descriptionCompressor.ts` ში და მიდის MCP სერვერზე `compressMcpRegistryMetadata` ში `createMcpServer()` მეშვეობით.

- შეკუმშვა გადის აღწერილობის ტექსტზე Caveman წესების (`getRulesForContext("all", "full")`) გამოყენებით შენახული ბლოკის ამოღებით (კოდის ფარდები, შემოღობილი ბლოკები და ა.შ.), ასე რომ, სტრუქტურული შინაარსი არ შეიცვლება.
- გადართეთ თითო განლაგებაზე `compression.mcpDescriptionCompressionEnabled` მნიშვნელობის მეშვეობით `key_value` პარამეტრების ცხრილში (ნაგულისხმევი: ჩართულია) — გამოვლენილია UI ში როგორც** ანალიტიკა → MCP აღწერილობის შეკუმშვა** .
- გადართეთ პროცესის მასშტაბით ან `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ან `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- რეალურ დროში სტატისტიკა გამოქვეყნებულია `omniroute_compression_status` მეშვეობით `analytics.mcpDescriptionCompression` ქვეშ და მონიშნულია `source: "mcp_metadata_estimate"` რეალური პროვაიდერის გამოყენების ქვითრებისგან გასარკვევად.

---

## ხელსაწყოს კარდინალურობის შემცირება (F4.3)

აღწერილობის შეკუმშვა ამცირებს თითოეული ხელსაწყოს მეტამონაცემებს;** ხელსაწყო-კარდინალურობის შემცირება** მიდის ერთი ნაბიჯით წინ, შემცირებით _ რამდენი_ ინსტრუმენტია გამოცხადებული საერთოდ. `tools/list` მანიფესტში ნაკლები ხელსაწყოების რეკლამა ამცირებს თითო მოთხოვნის ნიშნის ღირებულებას, რომელსაც კლიენტის მოდელი იხდის ხელსაწყოების კატალოგში ("ფენის 5" შეკუმშვა). დანერგვა არის სუფთა, მოქალაქეობის არმქონე ფილტრი `open-sse/mcp-server/toolCardinality.ts` ში (`reduceToolManifest`), რომელიც ჩართულია რეგისტრაციის ციკლში `createMcpServer()` ში (`open-sse/mcp-server/server.ts`).

**ჩართვა, გამორთვა ნაგულისხმევად.** ფილტრი მუშაობს მხოლოდ მაშინ, როდესაც დაყენებულია გარემოს ორი ცვლადიდან ერთი მაინც; არცერთი ნაკრებით, 110-ვე ინსტრუმენტი გამოცხადებულია უცვლელად.

| ცვლადი           | რეჟიმი                                                                                                           |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | შავ სიაში — მძიმით გამოყოფილი ხელსაწყოების სახელები, რომლებიც ყოველთვის ამოიშლება `tools/list` დან               |
| `MCP_TOOL_ALLOW` | Allow-list — მძიმით გამოყოფილი ხელსაწყოების სახელები; მხოლოდ ესენი გადარჩებიან, დანარჩენი ყველაფერი ჩამოგდებულია |

`deny` უპირატესობას ანიჭებს `allow`. სახელები გამოყოფილია მძიმით, ამოჭრილია და ცარიელი ჩანაწერები იგნორირებულია. მაგალითები:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**როგორ იშლება გაფილტრული ხელსაწყოები:** რეგისტრაცია ყოველთვის წარმატებულია; ინსტრუმენტი, რომელსაც პროფილი უარყოფს, არის `.disable()` d MCP SDK სახელურზე, ასე რომ, ის არასოდეს გამოჩნდება `tools/list` ში, მაგრამ გაყვანილობა ხელუხლებელი რჩება (სუფთა enable/disable, ხელახალი რეგისტრაცია არ არის). პროფილის პარსერი არის `readMcpToolProfileFromEnv(process.env)`, რომელიც აბრუნებს `null` (გაფილტვრის გარეშე), როდესაც ორივე ვარსი ცარიელია.

უფრო მდიდარი `ToolProfile` ფორმა `reduceToolManifest` მიღმა ასევე მხარს უჭერს ფარგლებს კვეთის ფილტრაციას (`allowScopes`, `read:*` -style სიმბოლოების შესატყვისით) და განმსაზღვრელ `maxTools` თავსახურს, მაგრამ ამ ორ სახელურს სრული მანიფესტი სჭირდება რეგისტრაციის დროს და არის** არა** ექვემდებარება დღეს გარემოს ცვლადების მეშვეობით ( `tools/list` -level hook არის თვალყურის დევნება). `estimateManifestTokens()` ხელმისაწვდომია მანიფესტ ტოკენის ღირებულების შესადარებლად შემცირებამდე და მის შემდეგ.

---

## Runtime Heartbeat

stdio ტრანსპორტი აგრძელებს სიცოცხლისუნარიანობას `${DATA_DIR}/runtime/mcp-heartbeat.json` მდე ყოველ 5 წამში. დაფა (`/api/mcp/status`) კითხულობს ამ ფაილს პლუს PID liveness `online` გამოსაყვანად. ამის ნაცვლად, HTTP ახორციელებს ანგარიშის მდგომარეობას `getMcpHttpStatus()` დან (ფაილის ჩაწერა არ არის).

გულისცემის სურათი შეიცავს:

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

## აუდიტის შესვლა

ყველა ინსტრუმენტის ზარი დარეგისტრირებულია SQLite `mcp_tool_audit` ცხრილში `open-sse/mcp-server/audit.ts` ით:

- ხელსაწყოს სახელი, არგუმენტები (hashed/truncated as per-tool `auditLevel`), შედეგი
- ხანგრძლივობა ms-ში, success/failure დროშა, შეცდომის შეტყობინება (როდესაც შესაძლებელია)
- API გასაღები ჰეში, დროის ანაბეჭდი
- მოცულობის უარყოფა დარეგისტრირებულია როგორც `scope_denied:<reason>` გამოტოვებული ფარგლების სიით

გამოიყენეთ დაფა ან `/api/mcp/audit` და `/api/mcp/audit/stats` REST ბოლო წერტილები ბოლო ზარების შესამოწმებლად.

---

## ფაილები

| ფაილი                                                                    | მიზანი                                                                              |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP სერვერის ქარხანა, stdio შესვლის წერტილი, ასპარეზობის ინსტრუმენტების რეგისტრაცია |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + სტრიმირებადი HTTP ტრანსპორტი (სესიის მართვა)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ხელსაწყოს მასშტაბის შეფასება და აბონენტის გარჩევადობა                               |
| `open-sse/mcp-server/audit.ts`                                           | ხელსაწყოების ზარის აუდიტის აღრიცხვა (`mcp_tool_audit`)                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat მწერალი (`mcp-heartbeat.json`)                                      |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | აღწერილობის შეკუმშვა ხელსაწყოების / მოთხოვნის / რესურსების რეესტრებისთვის           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemas + ინსტრუმენტის რეესტრი (`MCP_TOOLS`, 45 ჩანაწერი)                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2 ფაზა + ქეში + 1პროქსი ხელსაწყოების დამმუშავებლები                                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | შეკუმშვის ხელსაწყოების დამმუშავებლები                                               |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | მეხსიერების ხელსაწყოების განმარტებები (3 ინსტრუმენტი)                               |
| `open-sse/mcp-server/tools/skillTools.ts`                                | უნარების ხელსაწყოების განმარტებები (4 ინსტრუმენტი)                                  |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion კონტექსტური წყარო ინსტრუმენტის განმარტებები (6 ინსტრუმენტი)                  |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | გეიფიკაციის ხელსაწყოების განმარტებები (8 ინსტრუმენტი)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | მოდულების რეგისტრაციისა და მართვის ინსტრუმენტები (8 ინსტრუმენტი)                    |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` ბოლო წერტილი                                                      |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` ბოლო წერტილი                                                       |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE სატრანსპორტო მარშრუტი                                            |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP სატრანსპორტო მარშრუტი                             |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` აუდიტის ჟურნალის მოთხოვნა                                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` აგრეგირებული აუდიტის მეტრიკა                                 |
| `src/lib/notion/api.ts`                                                  | Notion REST API კლიენტი (ხელახლა ცდა, ვადა, შეცდომის კლასიფიკაცია)                  |
| `src/lib/db/notion.ts`                                                   | Notion ნიშნის გამძლეობა (`key_value` ცხრილი)                                        |
| `src/app/api/settings/notion/route.ts`                                   | Notion პარამეტრები API (GET/POST/DELETE)                                            |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ტოკენის მართვა UI                                                            |
| `tests/unit/notion-api.test.ts`                                          | Notion API კლიენტის ტესტები (7)                                                     |
| `tests/unit/notion-tools.test.ts`                                        | Notion ინსტრუმენტების ფარგლების აღსრულების ტესტები (10)                             |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB მოდულის ტესტები (3)                                                       |
