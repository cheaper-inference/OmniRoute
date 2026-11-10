# OmniRoute MCP Server Documentation (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md)

---

> 模型上下文協定伺服器具有 110 個工具，涵蓋路由、快取、壓縮、記憶體、技能、代理、池、雷達和上下文來源操作。
>
> 事實來源： `open-sse/mcp-server/server.ts`計算**110 個獨特的工具**CCR `countUniqueMcpTools()` `omniroute_radar_catalog` `omniroute_x_search` GitHub Notion Obsidian

## 安裝

OmniRoute MCP是內建的。開始：

```bash
omniroute --mcp
```

或透過 open-sse 傳輸：

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

預設情況下， HTTP傳輸（`sse` / `streamable-http`，由儀表板伺服器在進程中提供服務）處於關閉狀態，之前只能從`/dashboard/mcp`頁面進行切換。從 v3.8.51 開始， CLI具有奇偶校驗：

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH `mcpEnabled` （和可選的`mcpTransport`）相同，透過`/api/settings`設定儀表板切換。 `mcp restart`呼叫`POST /api/mcp/restart`：它會拆除活動的`sse`/`streamable-http`會話，以便下一個請求乾淨地重新初始化，如果MCP被禁用，則返回`409` ，並返回`501`用於`stdio`傳輸（stdio 用戶端擁有自己的子進程—沒有進程內句柄可以重新啟動）。

## 交通

MCP伺服器公開三種傳輸，全部由同一個`createMcpServer()`工廠支援：

| 運輸              | 在哪裡                                     | 何時使用                                 |
| :---------------- | :----------------------------------------- | :--------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`            | IDE整合（Claude Desktop、 Cursor等）     |
| `sse`             | `POST/GET /api/mcp/sse`透過`httpTransport` | 需要事件流的Browser/agent客戶端          |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`          | 多會話HTTP客戶端（`mcp-session-id`標頭） |

活動HTTP傳輸（`sse`或`streamable-http`）由`mcpTransport`設定選擇。切換傳輸會關閉其他傳輸上的現有會話。

### 遠端存取（管理範圍旁路）

`/api/mcp/*`位於LOCAL_ONLY層 (`src/server/authz/routeGuard.ts`) —預設只有環回主機 (`localhost`、 `127.0.0.1`、 `::1`) 可以到達它。從 v3.8.2 開始，如果非環回客戶端提供其金鑰攜帶`manage`範圍的`Authorization: Bearer <api-key>`則它們可以連線。這是透過隧道、反向代理或公用主機名稱到達遠端MCP伺服器的唯一方法。

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

非管理金鑰（或無承載）傳回`403 LOCAL_ONLY`。同級前綴`/api/cli-tools/runtime/*`是有意NOT可繞過的—請參閱[Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) 。

### 原產地驗證

驗證後，對`/api/mcp/*` —的每個請求，傳輸和管理路由（例如`status`、 `tools`、 `audit`和`restart` —都會驗證其`Origin`標頭，無論呼叫者是什麼（API金鑰、 CLI令牌、儀表板會話或禁用登入的匿名環回）。這是MCP Streamable HTTP規格要求的 DNS 重新綁定保護。

- **沒有`Origin`標頭**→允許。 OmniRoute CLI、 SDK和IDE客戶端不發送。
- **允許`Origin`**任何連接埠上的→ `localhost`、 `127.0.0.1`或`[::1]` ，或OmniRoute自己的公共來源： `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`，受信任的反向代理的轉送來源（`OMNIROUTE_TRUST_PROXY`，僅當未設定基本URL時），或直接loopback/LAN IP主機。僅靠`Host`標頭永遠不會使來源變得可信。
- **任何其他`Origin`，包括`null`** → `403`帶有 JSON-RPC 錯誤主體： `id: null`、 `error.code: -32000`、 `error.data.code: "INVALID_ORIGIN"`。與其他儀表板寫入一樣，仍接受提供有效CSRF令牌的儀表板會話。

在反向代理後面提供服務的瀏覽器MCP客戶端需要`OMNIROUTE_PUBLIC_BASE_URL`；沒有其他來源的允許名單。 CORS預檢 (`OPTIONS`) 未進行來源檢查；接下來的請求是。

## IDE配置

請參閱[MCP客戶端配置](../guides/SETUP_GUIDE.md#mcp-client-configuration)以了解Claude Desktop、 Cursor、 Cline和相容的MCP客戶端設定。

---

## 基本工具 (14) —第一階段

| 工具                            | 範圍                  | 描述                                                                                    |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | 正常運行時間、記憶體、斷路器、速率限制、快取統計信息                                    |
| `omniroute_list_combos`         | `read:combos`         | 所有配置的組合與策略（可選指標）                                                        |
| `omniroute_get_combo_metrics`   | `read:combos`         | 特定組合的性能指標                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | 啟用或停用組合                                                                          |
| `omniroute_create_combo`        | `write:combos`        | 透過現有的組合API創建一個經過驗證的組合                                                 |
| `omniroute_check_quota`         | `read:quota`          | 配額used/total、剩餘百分比、重設時間、令牌運作狀況                                      |
| `omniroute_route_request`       | `execute:completions` | 透過OmniRoute路由發送聊天完成訊息                                                       |
| `omniroute_cost_report`         | `read:usage`          | 按期間的成本報告 (session/day/week/month)                                               |
| `omniroute_list_models_catalog` | `read:models`         | 包含功能、狀態、定價的完整型號目錄                                                      |
| `omniroute_radar_catalog`       | `read:radar`          | 本地簽署的雷達目錄；可選provider/family過濾器                                           |
| `omniroute_tool_search`         | `read:tools`          | 從註冊的MCP目錄中發現工具                                                               |
| `omniroute_web_search`          | `execute:search`      | 透過設定的搜尋提供者進行 Web 搜尋。不是X/Twitter.                                       |
| `omniroute_x_search`            | `execute:search`      | 透過xAI/SuperGrok搜尋 X，或選擇`xquik-search`來取得 Xquik API結果。需要所選後端的憑證。 |
| `omniroute_web_fetch`           | `execute:search`      | 透過配置的取得提供者取得網頁內容                                                        |

## 進階工具（11） —第2期

| 工具                               | 範圍                                 | 描述                                                            |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | 使用後備樹進行試運行路由模擬                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | degrade/block/alert行動的會議預算                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 在運行時更新組合策略（priority/weighted/auto/etc.）             |
| `omniroute_set_resilience_profile` | `write:resilience`                   | 應用`aggressive` / `balanced` / `conservative`彈性預設          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 使用真實的上游呼叫對組合中的每個提供者進行即時測試              |
| `omniroute_get_provider_metrics`   | `read:health`                        | 每個提供者的指標，包括p50/p95/p99延遲和斷路器狀態               |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 根據budget/latency約束依任務類型推薦組合                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | 解釋為什麼請求被路由到提供者（評分因素+後備）                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | 完整會話快照：成本、代幣、頂級models/providers、錯誤、預算保護  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 診斷（以及可選的自動修復）資料庫漂移，例如損壞的組合參考/孤立行 |
| `omniroute_sync_pricing`           | `pricing:write`                      | 同步外部來源的定價資料（LiteLLM）；支援`dryRun`                 |

## 快取工具 (2)

| 工具                    | 範圍          | 描述                               |
| :---------------------- | :------------ | :--------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | 語義快取、提示快取和冪等性統計訊息 |
| `omniroute_cache_flush` | `write:cache` | 全域或透過signature/model刷新快取  |

## 壓縮工具 (13)

| 工具                                | 範圍                | 描述                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | 壓縮設定、分析摘要和快取感知統計資料（包括`analytics.mcpDescriptionCompression`資料） |
| `omniroute_compression_configure`   | `write:compression` | 配置壓縮模式、閾值、目標比率、系統提示儲存、 MCP描述壓縮切換                          |
| `omniroute_set_compression_engine`  | `write:compression` | 選擇活動引擎（off/caveman/rtk/stacked）和Caveman/RTK強度                              |
| `omniroute_list_compression_combos` | `read:compression`  | 列出命名的壓縮組合及其引擎管道                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | 按壓縮組合和引擎分組的分析                                                            |
| `omniroute_ccr_store`               | `write:compression` | 將呼叫者隔離的內容儲存在有界記憶體CCR儲存中，並傳回標記和`ccr://`引用                 |
| `omniroute_ccr_retrieve`            | `read:compression`  | 完整或使用 head、tail、lines、grep 和 stats 模式檢索CCR內容                           |
| `omniroute_ccr_inspect`             | `read:compression`  | 檢查呼叫者擁有的CCR資料而不回傳內容                                                   |
| `omniroute_ccr_list`                | `read:compression`  | 列出呼叫者擁有的CCR區塊的分頁元數據                                                   |
| `omniroute_ccr_delete`              | `write:compression` | 刪除呼叫者擁有的CCR塊                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | 報告呼叫者範圍的記憶體使用情況、生命週期計數器和儲存限制                              |
| `omniroute_rtk_discover`            | `read:compression`  | 發現選擇加入RTK輸出樣本中反覆出現的噪音                                               |
| `omniroute_rtk_learn`               | `read:compression`  | 從選擇加入的樣本產生可審查的RTK過濾器草稿                                             |

CCR條目使用兩層儲存：在本地非雲端運行時上由持久SQLite層（`ccr_blocks`，預設啟用）支援的熱記憶體層，因此區塊可以在驅逐或重新啟動後繼續存在，直到其TTL用完—但超過 512 個KB和雲端運行時的區塊除外，它們僅保留記憶體。每個區塊限制為 2 MiB，每個主體限制為 16 MiB，全域儲存限制為 64 MiB。條目預設為 24 小時TTL （最長 7 天）。完整的MCP檢索僅限於 256 個KiB；更大的區塊仍然可以透過 ranged 和 grep 模式使用。儲存、檢索、列出、檢查、刪除和統計由經過驗證的 API 金鑰主體隔離。審計記錄包含哈希值和大小元數據，而不是內容。操作員為導向的詳細資料（兩個標記、客戶端先決條件、 `codemode:false`、每個工具範圍、分頁和診斷矩陣）位於[壓縮引擎→先決條件/操作員指南](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup)中。

`omniroute_compression_status`在`analytics.mcpDescriptionCompression`下單獨報告MCP描述壓縮。這些值是MCP可列出描述的元資料大小估計（`tools`、 `prompts`、 `resources`和`resourceTemplates`）；它們不是提供者使用收據並標示`source: "mcp_metadata_estimate"`。

### MCP可訪問性樹過濾器 (v3.8.0)

與上面的壓縮工具不同， OmniRoute包含一個執行後過濾器，用於壓縮**工具結果**MCP browser/accessibility工具在傳回給代理之前。此過濾器本身不是工具—它在包含詳細可訪問性樹或瀏覽器快照文字（≥ 2000 個字元）的任何工具結果上透明地運行。

關鍵行為：

- 將≥ 30 個連續重複的兄弟行折疊成 head + tail 摘要
- 保留Playwright/computer-use所需的`[ref=eXX]`錨點
- 硬截斷超大文字（> 50,000 個字元）並帶有導航提示
- 預期節省：** 60–80%**在瀏覽器快照負載上

配置：全域設定中的`compression.mcpAccessibility` （遷移056）。實作： `open-sse/services/compression/engines/mcpAccessibility/`。完整文件：[壓縮引擎— MCP輔助功能樹過濾器](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

有關這些工具背後的運行時壓縮模型，請參閱[壓縮引擎](../compression/COMPRESSION_ENGINES.md)和[RTK壓縮](../compression/RTK_COMPRESSION.md)。

## 1代理工具 (3)

| 工具                        | 範圍           | 描述                                                               |
| :-------------------------- | :------------- | :----------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 從 1proxy 市場取得免費代理（protocol/country/quality/limit過濾器） |
| `omniroute_oneproxy_rotate` | `read:proxies` | 按策略取得下一個可用代理程式 (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | 礦池統計資料、同步狀態、依協定和國家分佈                           |

## 記憶工具 (3)

在`open-sse/mcp-server/tools/memoryTools.ts`中定義。 Auth/scope透過標準MCP範圍管道強制執行。

| 工具                      | 範圍           | 描述                                                                     |
| :------------------------ | :------------- | :----------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | 透過查詢/類型/ API密鑰搜尋記憶體，並執行代幣預算                         |
| `omniroute_memory_add`    | `write:memory` | 新增新的記憶體條目（`factual` / `episodic` / `procedural` / `semantic`） |
| `omniroute_memory_clear`  | `write:memory` | 清除API金鑰的記憶體，可選擇按類型或`olderThan`時間戳進行過濾             |

## 技能工具 (4)

在`open-sse/mcp-server/tools/skillTools.ts`中定義。由`src/lib/skills/registry` + `src/lib/skills/executor`支援。

| 工具                          | 範圍             | 描述                                                        |
| :---------------------------- | :--------------- | :---------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | 列出已註冊的技能，並可按API金鑰、名稱或啟用狀態進行可選過濾 |
| `omniroute_skills_enable`     | `write:skills`   | 透過ID啟動或停用特定技能                                    |
| `omniroute_skills_execute`    | `execute:skills` | 根據提供的輸入執行技能並傳回執行記錄                        |
| `omniroute_skills_executions` | `read:skills`    | 列出最近的技能執行歷史                                      |

## Notion上下文原始碼（6）

在`open-sse/mcp-server/tools/notionTools.ts`中定義。令牌透過`src/lib/db/notion.ts`儲存在`key_value`表中。 `src/lib/notion/api.ts`中的REST客戶端。在`src/app/api/settings/notion/route.ts`中設定API 。 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`中的儀表板UI 。

從以下位置配置您的Notion整合令牌**上下文來源**Endpoint 儀表板中的選項卡，或透過REST API：

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

| 工具                         | 範圍           | 描述                                        |
| :--------------------------- | :------------- | :------------------------------------------ |
| `notion_search`              | `read:notion`  | 跨所有頁面和資料庫的全文搜索                |
| `notion_get_page`            | `read:notion`  | 取得ID的頁面及其屬性                        |
| `notion_list_block_children` | `read:notion`  | 列出頁面或區塊的子區塊                      |
| `notion_query_database`      | `read:notion`  | 使用篩選器、排序和分頁查詢資料庫            |
| `notion_get_database`        | `read:notion`  | 透過ID獲取資料庫schema                      |
| `notion_append_blocks`       | `write:notion` | 將子區塊附加到父區塊（每個請求最多 100 個） |

## 特工技能目錄工具 (3)

在`open-sse/mcp-server/tools/agentSkillTools.ts`中定義。由`src/lib/agentSkills/catalog`支援。這些工具向MCP客戶端和外部代理程式公開包含 45 個條目的代理技能文件目錄。範圍： `read:catalog`.

| 工具                              | 範圍           | 描述                                                                                          |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | 使用可選的`category` (api\| cli) 和`area`過濾器列出所有 45 個代理技能；返回元資料+覆蓋範圍    |
| `omniroute_agent_skills_get`      | `read:catalog` | 透過規範`id`獲取單一技能的完整元資料+ SKILL.md內容                                            |
| `omniroute_agent_skills_coverage` | `read:catalog` | 覆蓋率統計數據：23 個API、21 個CLI和 1 個設定技能中有多少在檔案系統上有SKILL.md檔案與目錄總數 |

請參閱[AGENT-SKILLS.md](./AGENT-SKILLS.md)以了解完整目錄以及外部代理程式如何使用它。

## 相關框架（v3.8.0）

上面的MCP工具清單（110 個獨特的工具，由`countUniqueMcpTools()`計算）有意限定為運行時routing/cache/compression/memory/skills/proxy/context-source操作。在 v3.8.0 中，兩個相鄰的框架與MCP伺服器一起提供，並單獨記錄：

### 雲端代理

雲端代理是進程外的AI編碼代理程式（codex-cloud、cursor-cloud、devin、jules），透過與LLM提供者使用的相同連接模型連接到OmniRoute 。它們透過自己的REST表面 (`/api/v1/agents/*`) 暴露出來，並且**不是**MCP工具目錄的一部分—呼叫雲端代理不消耗MCP作用域。

- 實作： `src/lib/cloudAgent/` （`registry.ts`、 `agents/codex.ts`、 `agents/cursor.ts`、 `agents/devin.ts`、 `agents/jules.ts`）。
- 生命週期： `createTask`、 `getStatus`、 `approvePlan`、 `sendMessage`、 `listSources`。
- 文件： [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### 護欄

Guardrail 是應用於聊天管道內的pre/post-execution過濾器（vision-bridge、pii-masker、prompt-injection）。它們在到達MCP tool/route層之前運行，並向審計管道發出結構化違規；它們不會作為MCP工具被呼叫。

- 實施： `src/lib/guardrails/`。
- 文件： [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

當偵錯似乎被阻止的MCP呼叫時，請檢查MCP審核日誌（`scope_denied:*`條目）和 Guardrails 審核追蹤—請求可能被 Guardrail 拒絕**前**它曾經到達MCP範圍執行層。

---

## REST API端點

| 端點                   | 方法                  | 描述                                                                                              | 授權                  |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------ | :-------------------- |
| `/api/mcp/status`      | `GET`                 | 伺服器狀態：心跳、 HTTP傳輸狀態、審核活動摘要                                                     | 管理（session/admin） |
| `/api/mcp/tools`       | `GET`                 | 工具目錄（名稱、描述、範圍、階段、來源端點）                                                      | 管理                  |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE傳輸端點（由`mcpEnabled` + `mcpTransport === "sse"`閘控）                                      | API密鑰+範圍          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | 可串流HTTP傳輸（使用`mcp-session-id`標頭； `DELETE`結束會話）                                     | API密鑰+範圍          |
| `/api/mcp/audit`       | `GET`                 | 來自`mcp_tool_audit`審核日誌條目（過濾器： `limit`、 `offset`、 `tool`、 `success`、 `apiKeyId`） | 管理                  |
| `/api/mcp/audit/stats` | `GET`                 | 聚合審計統計資料（`totalCalls`、 `successRate`、 `avgDurationMs`、頂級工具）                      | 管理                  |

原始檔： `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

SSE和 Streamable HTTP傳輸都會被阻止，直到在「設定」(`mcpEnabled`) 中啟用MCP伺服器並選擇適當的`mcpTransport` 。如果配置了錯誤的傳輸，則路由將返回HTTP 400 並提示切換設定。

---

## 身份驗證和範圍

MCP工具呼叫從呼叫者讀取範圍字串。此檢查是三個獨立命名空間之一。一名檢查員的傳球不等於其他檢查員的傳球。規則是[三個範圍名稱空間](#three-scope-namespaces)。工具目錄是[MCP工具範圍](#mcp-tool-scopes)。

### 三個作用域命名空間

API金鑰上的`manage` 、 MCP工具上的`read:compression`和`oma_live_…`存取權杖上的`read`是三種不同的授權。將`read`存取令牌傳送到變異管理路由的呼叫者將獲得HTTP 403 `Access token scope 'read' is insufficient; 'write' required.`該等級為`scopeSatisfies`。它不查閱MCP表，並且MCP匹配器也不查閱它。

| 命名空間      | 憑證                                                                      | 檢查者           | 通行證允許                       |
| :------------ | :------------------------------------------------------------------------ | :--------------- | :------------------------------- |
| API 金鑰管理  | `api_keys.scopes`                                                         | `hasManageScope` | 此承載密鑰的管理REST             |
| API金鑰添加劑 | 相同的數組，一個完全相同的字串                                            | 下面命名的幫助者 | 只有這項能力                     |
| MCP工具範圍   | 相同的數組，否則MCP `_meta` （僅限HTTP/SSE ），否則`OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | 一旦執行該工具                   |
| 訪問令牌      | `oma_live_…`                                                              | `scopeSatisfies` | 其方法和路徑需要該等級的管理路由 |

[管理身分驗證](../guides/MANAGEMENT-AUTH.md)中介紹了建立每個憑證的過程。

#### API 金鑰範圍

一個`api_keys.scopes`陣列可滿足兩項作業。他們使用不同的功能。

**管理REST.** `manage`和`admin`是`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) 的成員。 `hasManageScope`是為該金鑰授權管理路由的內容。 `admin`能夠對這些路由進行管理。這裡的`admin`一詞不是存取令牌等級，它不會擴展到MCP工具範圍。

**附加字串。**每一項都是精確的會員資格測試，每一項都位於`MANAGEMENT_API_KEY_SCOPES`之外。

| 範圍                           | 通行證允許                                                                                                                                            |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | 僅非環回`/api/mcp/` LOCAL_ONLY剝離 (`hasMcpConnectOrManageScope`)。具有`manage`或`admin`密鑰仍然可以通過該排除。                                      |
| `self:usage`                   | 此密鑰的`GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)。 `POST /api/keys`在建立（`normalizeSelfServiceScopesForCreate`）時新增此範圍。 |
| `self:account-quota`           | 此狀態負載 (`src/lib/usage/apiKeySelfService.ts`) 內的上游帳戶配額。狀態路由仍然需要`self:usage`。                                                    |
| `policy:bypass-provider-quota` | 此金鑰的推理呼叫會跳過提供者配額策略（ `src/sse/handlers/chat.ts`中的`hasProviderQuotaBypassScope` ）。                                               |

#### 匹配

目錄是[MCP工具範圍](#mcp-tool-scopes)下的表格。不要將`src/shared/constants/mcpScopes.ts`中的`MCP_SCOPE_LIST`視為該目錄：它是原始類型化子集。後來的工具在它旁邊聲明了更多範圍（`read:notion`、 `read:skills`、 `read:local-corpus`和表的其餘部分）。

`open-sse/mcp-server/scopeEnforcement.ts`中的`evaluateToolScopes`允許在每個所需範圍與某個授予範圍相符時進行呼叫：

- `*`符合每個所需的範圍。
- 以`*`結尾的授予範圍與以星號之前的前綴開頭的必要範圍相符。 `read:*`匹配`read:compression`。
- 每個其他授予的範圍僅匹配相同的必需字串。

對於`read:compression`，範圍為`["manage"]`的鍵無法使用`scopeMatches` 。當`admin`、 `mcp:connect`、 `read`和`write`是唯一被授予的字串時，相同的呼叫會失敗。除了尾隨`*`之外， MCP工具範圍之間沒有層次結構。

除非`OMNIROUTE_MCP_ENFORCE_SCOPES=true` （預設`false`），否則強制執行。當它關閉時， `evaluateToolScopes`允許呼叫並跳過目錄。當它打開時， HTTP使用承載密鑰的`api_keys.scopes`作為`authInfo` （請參閱[每個密鑰HTTP範圍綁定](#per-key-http-scope-binding-7895)）。當沒有關鍵範圍解析時，授予的集合會落入MCP `_meta` （僅適用於HTTP身份驗證上下文中的HTTP/SSE呼叫者；stdio 呼叫者的`_meta`會被忽略，因為客戶端控制它並且它不攜帶每個呼叫者身份），然後是`OMNIROUTE_MCP_SCOPES`。

#### 訪問令牌範圍

`oma_live_…`幣 (`src/lib/accessTokens/scopes.ts`) 帶有`read`、 `write`或`admin`。 `scopeSatisfies`是一個等級： `admin`涵蓋`write`和`read`，而`write`涵蓋`read`。未知的範圍什麼也覆蓋不了。

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) 將此排名與`inferRequiredScope` (`src/server/authz/accessScopes.ts`) 進行比較：

- `GET`、 `HEAD`和`OPTIONS`需要`read`。
- 所有其他方法都需要`write`。
- `ADMIN_SCOPE_PREFIXES`中的路徑對於每個方法都需要`admin` 。 `/api/mcp`位於該清單中，因此`write`存取權杖仍然無法呼叫MCP HTTP表面。
- `ADMIN_MUTATION_PREFIXES`中的路徑只需要`admin`來進行突變。
- `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) 中的路徑僅需要`admin`進行突變，並且僅在該確切路徑—上，其他`/api/settings/*`路由保留`write`。

`PATCH /api/keys/{id}`是一個突變，不在這些管理清單中，因此`read`令牌會收到 403 `Access token scope 'read' is insufficient; 'write' required.` `write`或`admin`存取權杖滿足該路由。儀表板JWT、環回CLI機器 ID 令牌以及具有`manage`或`admin` API密鑰採用其他分支，並且不會受到此等級的限制。

為`/api/mcp`傳遞`scopeSatisfies`存取權杖僅清除了管理閘。工具呼叫仍然針對 API 金鑰範圍執行`scopeMatches` 。訪問令牌排名不是`scopeMatches`的輸入。

### MCP工具範圍

範圍執行集中在`open-sse/mcp-server/scopeEnforcement.ts`。每個工具都需要特定的範圍：

| 範圍                  | 工具                                                                                                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                          |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                  |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                     |
| `read:quota`          | `check_quota`                                                                                                                                                              |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                     |
| `read:models`         | `list_models_catalog`                                                                                                                                                      |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                              |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                      |
| `write:budget`        | `set_budget_guard`                                                                                                                                                         |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                |
| `pricing:write`       | `sync_pricing`                                                                                                                                                             |
| `read:cache`          | `cache_stats`                                                                                                                                                              |
| `write:cache`         | `cache_flush`                                                                                                                                                              |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                 |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                          |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                      |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                           |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                     |
| `read:memory`         | `memory_search`                                                                                                                                                            |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                               |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                         |
| `write:skills`        | `skills_enable`                                                                                                                                                            |
| `execute:skills`      | `skills_execute`                                                                                                                                                           |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                           |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                    |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                  |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                           |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                             |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                         |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                            |
| `read:obsidian`       | 13個閱讀工具— `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9個寫入工具— `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                          |

支援通配符範圍： `read:*`授予所有讀取範圍， `*`授予完全存取權限。

### `mcp:connect` —窄路能力 (#7895)

從非環回到達HTTP/SSE MCP傳輸 (`/api/mcp/*`) 需要`/api/mcp/` LOCAL_ONLY剝離（請參閱`docs/security/ROUTE_GUARD_TIERS.md`）。從歷史上看，剝離只接受完整的`manage`/`admin` -scope API密鑰—對於只需要談論MCP呼叫者來說太廣泛了。 `src/shared/constants/managementScopes.ts`現在導出`MCP_CONNECT_SCOPE = "mcp:connect"`：一個附加的窄範圍（與`SELF_USAGE_SCOPE`相同的先例），授權ONLY `src/server/authz/policies/management.ts` —中的`/api/mcp/`旁路，它不授予其他管理路由存取權限，並故意保留OUT或`MANAGEMENT_API_KEY_SCOPES`。持有`manage`/`admin`金鑰仍然透過剝離不變； `mcp:connect`是遠端僅 MCP 呼叫者的低權限替代方案，透過`hasMcpConnectOrManageScope()`檢查。

### 每鍵HTTP範圍綁定 (#7895)

透過HTTP/SSE， `open-sse/mcp-server/httpTransport.ts`現在透過`resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) 解析呼叫者的真實`api_keys.scopes`並將其傳遞給MCP SDK的`transport.handleRequest(req, { authInfo })`，因此`extra.authInfo.scopes`到達每個工具呼叫都反映了 Bearer key 自己的範圍。 `scopeEnforcement.ts`的`resolveCallerScopeContext()`已經將`authInfo`優先於`_meta`和`OMNIROUTE_MCP_SCOPES` env 後備—這僅填充第一個、最高優先級的源，該源之前未通過HTTP提供。當沒有API金鑰解析時（無標頭、無效金鑰）， `authInfo`保持`undefined`狀態，且解析會繼續到現有的`meta`/env 鏈不變。 stdio 沒有每個呼叫者的身份（請參閱`mcpCallerIdentity.ts`），並且不受每個密鑰綁定—影響，它會跳過`_meta`步驟（`_meta`僅在HTTP身份驗證上下文中受到尊重，#15159）並僅從`OMNIROUTE_MCP_SCOPES` env 密鑰解析。

**Enforcement is forced on for narrow-scoped HTTP/SSE callers regardless of `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` defaulting to `false` is only safe for the local/stdio single-operator flow, where there is no per-caller identity to scope against. `open-sse/mcp-server/server.ts::withScopeEnforcement()` turns per-tool scope enforcement on unconditionally (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) whenever `resolveCallerScopeContext()` resolved `source === "authInfo"` (i.e. a real per-key HTTP Authorization header, HTTP/SSE-only) AND that key does not hold full `manage`/`admin` scope. This closes the gap where a key holding ONLY the narrow `mcp:connect` bypass scope — documented above as authorizing nothing but the `/api/mcp/` LOCAL_ONLY carve-out — could otherwise invoke every MCP tool once an operator enabled remote/non-loopback MCP access, simply because `OMNIROUTE_MCP_ENFORCE_SCOPES` ships `false` by default. A full `manage`/`admin` key over HTTP, and every stdio/local caller, keep the existing `OMNIROUTE_MCP_ENFORCE_SCOPES`-gated behavior unchanged.

---

## 環境變數

| 多變的                                  | 預設                       | 目的                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------------- | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`   | MCP伺服器呼叫OmniRoute內部APIs時所使用的基礎URL                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_API_KEY`                     | （空的）                   | API密鑰作為`Authorization: Bearer`轉發到內部API呼叫                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` （僅`"true"`啟用） | 啟用後，缺失範圍會拒絕工具呼叫並將`scope_denied:<reason>`記錄在審核日誌中。對於從缺乏完整`manage`/`admin`範圍—的每鍵授權標頭 (`source === "authInfo"`) 解析的任何HTTP/SSE呼叫者，無論此標誌如何，強制執行ALSO例如僅保留窄`mcp:connect`旁路範圍—鍵，因此此預設值僅對於local/stdio單操作符流是安全的，對於遠端非環回存取 |
| `OMNIROUTE_MCP_SCOPES`                  | （空的）                   | 預設被視為「可用」的範圍的逗號分隔白名單（當呼叫者不提供自己的範圍時使用）                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | （取消=開啟）              | 當設定為`0/false/off/no`，在註冊時會停用MCP描述壓縮                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | （取消=開啟）              | 與上面相同的切換的備用別名                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                    | 中止內部管理讀取預算（健康、彈性、組合、配額、使用）                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                    | 中止等待提供者的躍點的預算（`route_request`、 `web_search`、 `web_fetch`）                                                                                                                                                                                                                                             |
| `MCP_TOOL_DENY`                         | （取消設定=無過濾器）      | 從`tools/list`中刪除的以逗號分隔的工具名稱（工具基數縮減—見下文）                                                                                                                                                                                                                                                      |
| `MCP_TOOL_ALLOW`                        | （取消設定=無過濾器）      | 以逗號分隔的工具名稱以獨佔方式保留（允許清單模式—見下文）                                                                                                                                                                                                                                                              |
| `DATA_DIR`                              | `~/.omniroute`             | 心跳檔寫入`${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                     |

---

## 描述 壓縮

MCP工具、提示和資源註冊表可以在registration/list時壓縮描述，以減少暴露給客戶端的元資料佔用空間（從而減少提示上下文成本）。實作位於`open-sse/mcp-server/descriptionCompressor.ts`中，並透過`createMcpServer()`內的`compressMcpRegistryMetadata`連接到MCP伺服器。

- 使用 Caveman 規則集 (`getRulesForContext("all", "full")`) 和保留區塊提取（程式碼跨度、隔離區塊等）對描述文字進行壓縮，因此結構內容不會改變。
- 透過`key_value`設定表中的`compression.mcpDescriptionCompressionEnabled`值切換每個部署（預設：啟用） —在UI中公開為**分析→ MCP描述壓縮**。
- 透過`OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`或`OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`在進程範圍內切換。
- 即時統計數據透過`analytics.mcpDescriptionCompression`下的`omniroute_compression_status`呈現，並標記為`source: "mcp_metadata_estimate"` ，以消除與真實提供者使用收據的歧義。

---

## 工具基數減少 (F4.3)

描述壓縮縮小了每個工具的元資料；**工具基數約簡**更進一步，減少了發布的工具數量。在`tools/list`清單中宣傳較少的工具可以減少客戶端模型為工具目錄支付的每個請求令牌成本（「第 5 層」壓縮）。此實作是`open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) 中的純無狀態過濾器，連接到`createMcpServer()` (`open-sse/mcp-server/server.ts`) 中的註冊循環。

**選擇加入，預設為關閉。**只有在設定了兩個環境變數中的至少一個時，過濾器才會運作；兩者皆未設置，所有 110 個工具都宣布不變。

| 多變的           | 模式                                                                  |
| :--------------- | :-------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | 將始終從`tools/list`中刪除的—逗號分隔工具名稱列入黑名單               |
| `MCP_TOOL_ALLOW` | 將—逗號分隔的工具名稱列入允許清單；只有這些倖存下來，其他一切都被丟棄 |

`deny`優先於`allow`。名稱以逗號分隔、經過修剪，空白條目將被忽略。範例：

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**如何刪除過濾工具：**註冊總是成功；設定檔拒絕的工具是MCP SDK句柄上的`.disable()` d ，因此它永遠不會出現在`tools/list`中，但接線保持不變（乾淨的enable/disable，無需重新註冊）。設定檔解析器是`readMcpToolProfileFromEnv(process.env)`，當兩個變數都為空時，它會傳回`null` （無過濾）。

`reduceToolManifest`後面更豐富的`ToolProfile`形狀也支援範圍交叉過濾（`allowScopes`，與`read:*` -style通配符匹配）和確定性`maxTools`上限，但這兩個旋鈕在註冊時需要完整的清單，並且是**不是**今天透過環境變數暴露（ `tools/list` -level鉤子是追蹤的後續）。 `estimateManifestTokens()`可用於比較減少前後的清單代幣成本。

---

## 運行時心跳

stdio 傳輸每 5 秒保持`${DATA_DIR}/runtime/mcp-heartbeat.json`活動狀態。儀表板 (`/api/mcp/status`) 讀取此檔案加上PID liveness 來匯出`online`。 HTTP相反地從進程內`getMcpHttpStatus()`傳輸報告狀態（無檔案寫入）。

心跳快照包含：

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

## 審計日誌記錄

每個工具呼叫都會由`open-sse/mcp-server/audit.ts`記錄到SQLite `mcp_tool_audit`表：

- 工具名稱、參數（hashed/truncated作為每個工具`auditLevel`）、結果
- 持續時間（以毫秒為單位）、 success/failure標誌、錯誤訊息（如果適用）
- API密鑰哈希、時間戳
- 範圍拒絕被記錄為`scope_denied:<reason>`並缺少範圍列表

使用儀表板或`/api/mcp/audit`和`/api/mcp/audit/stats` REST端點來檢查最近的呼叫。

---

## 文件

| 文件                                                                     | 目的                                          |
| :----------------------------------------------------------------------- | :-------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP伺服器工廠、stdio 入口點、範圍工具註冊     |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE +可串流HTTP傳輸（會話管理）               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | 工具範圍評估和呼叫者解析                      |
| `open-sse/mcp-server/audit.ts`                                           | 工具呼叫審計日誌記錄（`mcp_tool_audit`）      |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio 心跳寫入器 (`mcp-heartbeat.json`)       |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | 工具/提示/資源登錄的描述壓縮                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod模式+工具登錄（`MCP_TOOLS`，45 個條目）    |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 第 2 階段+快取+ 1proxy 工具處理程序           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 壓縮工具處理程序                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | 記憶工具定義（3個工具）                       |
| `open-sse/mcp-server/tools/skillTools.ts`                                | 技能工具定義（4個工具）                       |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion上下文來源工具定義（6個工具）           |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | 遊戲化工具定義（8 個工具）                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | 外掛程式註冊和管理工具（8個工具）             |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`端點                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`端點                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE運輸路線                    |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP傳輸路線     |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit`稽核日誌查詢                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats`聚合審計指標            |
| `src/lib/notion/api.ts`                                                  | Notion REST API客戶端（重試、逾時、錯誤分類） |
| `src/lib/db/notion.ts`                                                   | Notion令牌持久化（`key_value`表）             |
| `src/app/api/settings/notion/route.ts`                                   | Notion設定API (GET/POST/DELETE)               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion幣管理UI                                |
| `tests/unit/notion-api.test.ts`                                          | Notion API客戶端測試（7）                     |
| `tests/unit/notion-tools.test.ts`                                        | Notion工具範圍執行測試 (10)                   |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB模組測試（3）                        |
