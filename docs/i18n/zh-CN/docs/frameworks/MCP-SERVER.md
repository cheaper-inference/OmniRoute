# OmniRoute MCP Server Documentation (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> 模型上下文协议服务器具有 110 个工具，涵盖路由、缓存、压缩、内存、技能、代理、池、雷达和上下文源操作。
>
> 事实来源： `open-sse/mcp-server/server.ts`计算**110 个独特的工具**使用`countUniqueMcpTools()`：45 个规范定义（包括 6 个CCR生命周期工具、代理技能三重奏、 `omniroute_radar_catalog`和`omniroute_x_search`），加上内存 (3)、技能 (4)、 GitHub技能 (3)、池 (6)、游戏化 (8)、插件 (8)、 Notion (6)、 Obsidian (22)、本地语料库 (3) 和两个仅 RTK 的压缩工具。

## 安装

OmniRoute MCP是内置的。开始：

```bash
omniroute --mcp
```

或者通过 open-sse 传输：

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

默认情况下， HTTP传输（`sse` / `streamable-http`，由仪表板服务器在进程中提供服务）处于关闭状态，并且之前只能从`/dashboard/mcp`页面进行切换。从 v3.8.51 开始， CLI具有奇偶校验：

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH `mcpEnabled` （和可选的`mcpTransport`）相同，通过`/api/settings`设置仪表板切换。 `mcp restart`调用`POST /api/mcp/restart`：它会拆除活动的`sse`/`streamable-http`会话，以便下一个请求干净地重新初始化，如果MCP被禁用，则返回`409` ，并返回`501`用于`stdio`传输（stdio 客户端拥有自己的子进程—没有进程内句柄可以重新启动）。

## 交通

MCP服务器公开三种传输，全部由同一个`createMcpServer()`工厂支持：

| 运输              | 在哪里                                     | 何时使用                                 |
| :---------------- | :----------------------------------------- | :--------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`            | IDE集成（Claude Desktop、 Cursor等）     |
| `sse`             | `POST/GET /api/mcp/sse`通过`httpTransport` | 需要事件流的Browser/agent客户端          |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`          | 多会话HTTP客户端（`mcp-session-id`标头） |

活动HTTP传输（`sse`或`streamable-http`）由`mcpTransport`设置选择。切换传输会关闭其他传输上的现有会话。

### 远程访问（管理范围旁路）

`/api/mcp/*`位于LOCAL_ONLY层 (`src/server/authz/routeGuard.ts`) —默认情况下只有环回主机 (`localhost`、 `127.0.0.1`、 `::1`) 可以到达它。从 v3.8.2 开始，如果非环回客户端提供其密钥携带`manage`范围的`Authorization: Bearer <api-key>`则它们可以连接。这是通过隧道、反向代理或公共主机名到达远程MCP服务器的唯一方法。

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

非管理密钥（或无承载）返回`403 LOCAL_ONLY`。同级前缀`/api/cli-tools/runtime/*`是有意NOT可绕过的—请参阅[Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) 。

### 原产地验证

身份验证后，对`/api/mcp/*` —的每个请求，传输和管理路由（例如`status`、 `tools`、 `audit`和`restart` —都会验证其`Origin`标头，无论调用者是什么（API密钥、 CLI令牌、仪表板会话或禁用登录的匿名环回）。这是MCP Streamable HTTP规范要求的 DNS 重新绑定保护。

- **没有`Origin`标头**→允许。 OmniRoute CLI、 SDK和IDE客户端不发送。
- **允许`Origin`**任何端口上的→ `localhost`、 `127.0.0.1`或`[::1]` ，或OmniRoute自己的公共来源： `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`，受信任的反向代理的转发来源（`OMNIROUTE_TRUST_PROXY`，仅当未设置基本URL时），或直接loopback/LAN IP主机。仅靠`Host`标头永远不会使来源变得可信。
- **任何其他`Origin`，包括`null`** → `403`带有 JSON-RPC 错误主体： `id: null`、 `error.code: -32000`、 `error.data.code: "INVALID_ORIGIN"`。与其他仪表板写入一样，仍接受提供有效CSRF令牌的仪表板会话。

在反向代理后面提供服务的浏览器MCP客户端需要`OMNIROUTE_PUBLIC_BASE_URL`；没有其他来源的允许名单。 CORS预检 (`OPTIONS`) 未进行来源检查；接下来的请求是。

## IDE配置

请参阅[MCP客户端配置](../guides/SETUP_GUIDE.md#mcp-client-configuration)以了解Claude Desktop、 Cursor、 Cline和兼容的MCP客户端设置。

---

## 基本工具 (14) —第一阶段

| 工具                            | 范围                  | 描述                                                                                    |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | 正常运行时间、内存、断路器、速率限制、缓存统计信息                                      |
| `omniroute_list_combos`         | `read:combos`         | 所有配置的组合与策略（可选指标）                                                        |
| `omniroute_get_combo_metrics`   | `read:combos`         | 特定组合的性能指标                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | 激活或停用组合                                                                          |
| `omniroute_create_combo`        | `write:combos`        | 通过现有的组合API创建一个经过验证的组合                                                 |
| `omniroute_check_quota`         | `read:quota`          | 配额used/total、剩余百分比、重置时间、令牌运行状况                                      |
| `omniroute_route_request`       | `execute:completions` | 通过OmniRoute路由发送聊天完成信息                                                       |
| `omniroute_cost_report`         | `read:usage`          | 按期间的成本报告 (session/day/week/month)                                               |
| `omniroute_list_models_catalog` | `read:models`         | 包含功能、状态、定价的完整型号目录                                                      |
| `omniroute_radar_catalog`       | `read:radar`          | 本地签署的雷达目录；可选provider/family过滤器                                           |
| `omniroute_tool_search`         | `read:tools`          | 从注册的MCP目录中发现工具                                                               |
| `omniroute_web_search`          | `execute:search`      | 通过配置的搜索提供程序进行 Web 搜索。不是X/Twitter.                                     |
| `omniroute_x_search`            | `execute:search`      | 通过xAI/SuperGrok搜索 X，或选择`xquik-search`来获取 Xquik API结果。需要所选后端的凭据。 |
| `omniroute_web_fetch`           | `execute:search`      | 通过配置的获取提供程序获取网页内容                                                      |

## 高级工具（11） —第2期

| 工具                               | 范围                                 | 描述                                                            |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | 使用后备树进行试运行路由模拟                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | degrade/block/alert行动的会议预算                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 在运行时更新组合策略（priority/weighted/auto/etc.）             |
| `omniroute_set_resilience_profile` | `write:resilience`                   | 应用`aggressive` / `balanced` / `conservative`弹性预设          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 使用真实的上游调用对组合中的每个提供者进行实时测试              |
| `omniroute_get_provider_metrics`   | `read:health`                        | 每个提供者的指标，包括p50/p95/p99延迟和断路器状态               |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 根据budget/latency约束按任务类型推荐组合                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | 解释为什么请求被路由到提供者（评分因素+后备）                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | 完整会话快照：成本、代币、顶级models/providers、错误、预算保护  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 诊断（以及可选的自动修复）数据库漂移，例如损坏的组合引用/孤立行 |
| `omniroute_sync_pricing`           | `pricing:write`                      | 同步外部来源的定价数据（LiteLLM）；支持`dryRun`                 |

## 缓存工具 (2)

| 工具                    | 范围          | 描述                               |
| :---------------------- | :------------ | :--------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | 语义缓存、提示缓存和幂等性统计信息 |
| `omniroute_cache_flush` | `write:cache` | 全局或通过signature/model刷新缓存  |

## 压缩工具 (13)

| 工具                                | 范围                | 描述                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | 压缩设置、分析摘要和缓存感知统计数据（包括`analytics.mcpDescriptionCompression`数据） |
| `omniroute_compression_configure`   | `write:compression` | 配置压缩模式、阈值、目标比率、系统提示保存、 MCP描述压缩切换                          |
| `omniroute_set_compression_engine`  | `write:compression` | 选择活动引擎（off/caveman/rtk/stacked）和Caveman/RTK强度                              |
| `omniroute_list_compression_combos` | `read:compression`  | 列出命名的压缩组合及其引擎管道                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | 按压缩组合和引擎分组的分析                                                            |
| `omniroute_ccr_store`               | `write:compression` | 将调用者隔离的内容存储在有界内存CCR存储中，并返回标记和`ccr://`引用                   |
| `omniroute_ccr_retrieve`            | `read:compression`  | 完整或使用 head、tail、lines、grep 和 stats 模式检索CCR内容                           |
| `omniroute_ccr_inspect`             | `read:compression`  | 检查调用者拥有的CCR数据而不返回内容                                                   |
| `omniroute_ccr_list`                | `read:compression`  | 列出调用者拥有的CCR块的分页元数据                                                     |
| `omniroute_ccr_delete`              | `write:compression` | 删除调用者拥有的CCR块                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | 报告调用者范围的内存使用情况、生命周期计数器和存储限制                                |
| `omniroute_rtk_discover`            | `read:compression`  | 发现选择加入RTK输出样本中反复出现的噪声                                               |
| `omniroute_rtk_learn`               | `read:compression`  | 从选择加入的样本生成可审查的RTK过滤器草稿                                             |

CCR条目使用两层存储：在本地非云运行时上由持久SQLite层（`ccr_blocks`，默认情况下启用）支持的热内存层，因此块可以在驱逐或重新启动后继续存在，直到其TTL用完—但超过 512 个KB和云运行时的块除外，它们仅保留内存。每个区块限制为 2 MiB，每个主体限制为 16 MiB，全局存储限制为 64 MiB。条目默认为 24 小时TTL （最长 7 天）。完整的MCP检索仅限于 256 个KiB；更大的块仍然可以通过 ranged 和 grep 模式使用。存储、检索、列出、检查、删除和统计由经过身份验证的 API 密钥主体隔离。审计记录包含哈希值和大小元数据，而不是内容。面向操作员的详细信息（两个标记、客户端先决条件、 `codemode:false`、每个工具范围、分页和诊断矩阵）位于[压缩引擎→先决条件/操作员指南](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup)中。

`omniroute_compression_status`在`analytics.mcpDescriptionCompression`下单独报告MCP描述压缩。这些值是MCP可列出描述的元数据大小估计（`tools`、 `prompts`、 `resources`和`resourceTemplates`）；它们不是提供者使用收据并标有`source: "mcp_metadata_estimate"`。

### MCP可访问性树过滤器 (v3.8.0)

与上面的压缩工具不同， OmniRoute包含一个执行后过滤器，用于压缩**工具结果**MCP browser/accessibility工具在返回给代理之前。此过滤器本身不是工具—它在包含详细可访问性树或浏览器快照文本（≥ 2000 个字符）的任何工具结果上透明地运行。

关键行为：

- 将≥ 30 个连续重复的兄弟行折叠成 head + tail 摘要
- 保留Playwright/computer-use所需的`[ref=eXX]`锚点
- 硬截断超大文本（> 50,000 个字符）并带有导航提示
- 预期节省：** 60–80%**在浏览器快照负载上

配置：全局设置中的`compression.mcpAccessibility` （迁移056）。实现： `open-sse/services/compression/engines/mcpAccessibility/`。完整文档：[压缩引擎— MCP辅助功能树过滤器](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

有关这些工具背后的运行时压缩模型，请参阅[压缩引擎](../compression/COMPRESSION_ENGINES.md)和[RTK压缩](../compression/RTK_COMPRESSION.md)。

## 1代理工具 (3)

| 工具                        | 范围           | 描述                                                               |
| :-------------------------- | :------------- | :----------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 从 1proxy 市场获取免费代理（protocol/country/quality/limit过滤器） |
| `omniroute_oneproxy_rotate` | `read:proxies` | 按策略获取下一个可用代理 (`random` / `quality` / `sequential`)     |
| `omniroute_oneproxy_stats`  | `read:proxies` | 矿池统计数据、同步状态、按协议和国家/地区分布                      |

## 记忆工具 (3)

在`open-sse/mcp-server/tools/memoryTools.ts`中定义。 Auth/scope通过标准MCP范围管道强制执行。

| 工具                      | 范围           | 描述                                                                   |
| :------------------------ | :------------- | :--------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | 通过查询/类型/ API密钥搜索内存，并执行代币预算                         |
| `omniroute_memory_add`    | `write:memory` | 添加新的内存条目（`factual` / `episodic` / `procedural` / `semantic`） |
| `omniroute_memory_clear`  | `write:memory` | 清除API密钥的内存，可选择按类型或`olderThan`时间戳进行过滤             |

## 技能工具 (4)

在`open-sse/mcp-server/tools/skillTools.ts`中定义。由`src/lib/skills/registry` + `src/lib/skills/executor`支持。

| 工具                          | 范围             | 描述                                                        |
| :---------------------------- | :--------------- | :---------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | 列出已注册的技能，并可按API密钥、名称或启用状态进行可选过滤 |
| `omniroute_skills_enable`     | `write:skills`   | 通过ID启用或禁用特定技能                                    |
| `omniroute_skills_execute`    | `execute:skills` | 根据提供的输入执行技能并返回执行记录                        |
| `omniroute_skills_executions` | `read:skills`    | 列出最近的技能执行历史                                      |

## Notion上下文源码（6）

在`open-sse/mcp-server/tools/notionTools.ts`中定义。令牌通过`src/lib/db/notion.ts`存储在`key_value`表中。 `src/lib/notion/api.ts`中的REST客户端。在`src/app/api/settings/notion/route.ts`中设置API 。 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`中的仪表板UI 。

从以下位置配置您的Notion集成令牌**上下文来源**Endpoint 仪表板中的选项卡，或通过REST API：

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

| 工具                         | 范围           | 描述                                    |
| :--------------------------- | :------------- | :-------------------------------------- |
| `notion_search`              | `read:notion`  | 跨所有页面和数据库的全文搜索            |
| `notion_get_page`            | `read:notion`  | 获取ID的页面及其属性                    |
| `notion_list_block_children` | `read:notion`  | 列出页面或块的子块                      |
| `notion_query_database`      | `read:notion`  | 使用过滤器、排序和分页查询数据库        |
| `notion_get_database`        | `read:notion`  | 通过ID获取数据库schema                  |
| `notion_append_blocks`       | `write:notion` | 将子块附加到父块（每个请求最多 100 个） |

## 特工技能目录工具 (3)

在`open-sse/mcp-server/tools/agentSkillTools.ts`中定义。由`src/lib/agentSkills/catalog`支持。这些工具向MCP客户端和外部代理公开包含 45 个条目的代理技能文档目录。范围： `read:catalog`.

| 工具                              | 范围           | 描述                                                                                          |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | 使用可选的`category` (api\| cli) 和`area`过滤器列出所有 45 个代理技能；返回元数据+覆盖范围    |
| `omniroute_agent_skills_get`      | `read:catalog` | 通过规范`id`获取单个技能的完整元数据+ SKILL.md内容                                            |
| `omniroute_agent_skills_coverage` | `read:catalog` | 覆盖率统计数据：23 个API、21 个CLI和 1 个配置技能中有多少在文件系统上有SKILL.md文件与目录总数 |

请参阅[AGENT-SKILLS.md](./AGENT-SKILLS.md)了解完整目录以及外部代理如何使用它。

## 相关框架（v3.8.0）

上面的MCP工具清单（110 个独特的工具，由`countUniqueMcpTools()`计算）有意限定为运行时routing/cache/compression/memory/skills/proxy/context-source操作。在 v3.8.0 中，两个相邻的框架与MCP服务器一起提供，并单独记录：

### 云代理

云代理是进程外的AI编码代理（codex-cloud、cursor-cloud、devin、jules），通过与LLM提供者使用的相同连接模型连接到OmniRoute 。它们通过自己的REST表面 (`/api/v1/agents/*`) 暴露出来，并且**不是**MCP工具目录的一部分—调用云代理不消耗MCP作用域。

- 实现： `src/lib/cloudAgent/` （`registry.ts`、 `agents/codex.ts`、 `agents/cursor.ts`、 `agents/devin.ts`、 `agents/jules.ts`）。
- 生命周期： `createTask`、 `getStatus`、 `approvePlan`、 `sendMessage`、 `listSources`。
- 文档： [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### 护栏

Guardrail 是应用于聊天管道内的pre/post-execution过滤器（vision-bridge、pii-masker、prompt-injection）。它们在到达MCP tool/route层之前运行，并向审计管道发出结构化违规；它们不会作为MCP工具被调用。

- 实施： `src/lib/guardrails/`。
- 文档： [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

调试似乎被阻止的MCP调用时，请检查MCP审核日志（`scope_denied:*`条目）和 Guardrails 审核跟踪—请求可能被 Guardrail 拒绝**前**它曾经到达MCP范围执行层。

---

## REST API端点

| 端点                   | 方法                  | 描述                                                                                              | 授权                  |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------ | :-------------------- |
| `/api/mcp/status`      | `GET`                 | 服务器状态：心跳、 HTTP传输状态、审核活动摘要                                                     | 管理（session/admin） |
| `/api/mcp/tools`       | `GET`                 | 工具目录（名称、描述、范围、阶段、源端点）                                                        | 管理                  |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE传输端点（由`mcpEnabled` + `mcpTransport === "sse"`门控）                                      | API密钥+范围          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | 可流式HTTP传输（使用`mcp-session-id`标头； `DELETE`结束会话）                                     | API密钥+范围          |
| `/api/mcp/audit`       | `GET`                 | 来自`mcp_tool_audit`审核日志条目（过滤器： `limit`、 `offset`、 `tool`、 `success`、 `apiKeyId`） | 管理                  |
| `/api/mcp/audit/stats` | `GET`                 | 聚合审计统计数据（`totalCalls`、 `successRate`、 `avgDurationMs`、顶级工具）                      | 管理                  |

源文件： `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

SSE和 Streamable HTTP传输都会被阻止，直到在“设置”(`mcpEnabled`) 中启用MCP服务器并选择适当的`mcpTransport` 。如果配置了错误的传输，则路由将返回HTTP 400 并提示切换设置。

---

## 身份验证和范围

MCP工具调用从调用者处读取范围字符串。该检查是三个独立命名空间之一。一名检查员的传球不等于其他检查员的传球。规则是[三个范围名称空间](#three-scope-namespaces)。工具目录是[MCP工具范围](#mcp-tool-scopes)。

### 三个作用域命名空间

API密钥上的`manage` 、 MCP工具上的`read:compression`和`oma_live_…`访问令牌上的`read`是三种不同的授权。将`read`访问令牌发送到变异管理路由的调用者将获得HTTP 403 `Access token scope 'read' is insufficient; 'write' required.`该等级为`scopeSatisfies`。它不查阅MCP表，并且MCP匹配器也不查阅它。

| 命名空间      | 凭据                                                                      | 检查者           | 通行证允许                       |
| :------------ | :------------------------------------------------------------------------ | :--------------- | :------------------------------- |
| API 密钥管理  | `api_keys.scopes`                                                         | `hasManageScope` | 该承载密钥的管理REST             |
| API密钥添加剂 | 相同的数组，一个完全相同的字符串                                          | 下面命名的帮助者 | 只有这一项能力                   |
| MCP工具范围   | 相同的数组，否则MCP `_meta` （仅限HTTP/SSE ），否则`OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | 一旦执行该工具                   |
| 访问令牌      | `oma_live_…`                                                              | `scopeSatisfies` | 其方法和路径需要该等级的管理路由 |

[管理身份验证](../guides/MANAGEMENT-AUTH.md)中介绍了创建每个凭证的过程。

#### API 密钥范围

一个`api_keys.scopes`阵列可满足两项作业。他们使用不同的功能。

**管理REST.** `manage`和`admin`是`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) 的成员。 `hasManageScope`是为该密钥授权管理路由的内容。 `admin`能够对这些路由进行管理。这里的`admin`一词不是访问令牌等级，它不会扩展到MCP工具范围。

**附加字符串。**每一项都是精确的会员资格测试，并且每一项都位于`MANAGEMENT_API_KEY_SCOPES`之外。

| 范围                           | 通行证允许                                                                                                                                            |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | 仅非环回`/api/mcp/` LOCAL_ONLY剥离 (`hasMcpConnectOrManageScope`)。具有`manage`或`admin`密钥仍然可以通过该排除。                                      |
| `self:usage`                   | 此密钥的`GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)。 `POST /api/keys`在创建（`normalizeSelfServiceScopesForCreate`）时添加此范围。 |
| `self:account-quota`           | 该状态负载 (`src/lib/usage/apiKeySelfService.ts`) 内的上游帐户配额。状态路由仍然需要`self:usage`。                                                    |
| `policy:bypass-provider-quota` | 该密钥的推理调用会跳过提供者配额策略（ `src/sse/handlers/chat.ts`中的`hasProviderQuotaBypassScope` ）。                                               |

#### 匹配

目录是[MCP工具范围](#mcp-tool-scopes)下的表格。不要将`src/shared/constants/mcpScopes.ts`中的`MCP_SCOPE_LIST`视为该目录：它是原始类型化子集。后来的工具在它旁边声明了更多范围（`read:notion`、 `read:skills`、 `read:local-corpus`和表的其余部分）。

`open-sse/mcp-server/scopeEnforcement.ts`中的`evaluateToolScopes`允许在每个所需范围与某个授予范围匹配时进行调用：

- `*`匹配每个所需的范围。
- 以`*`结尾的授予范围与以星号之前的前缀开头的必需范围匹配。 `read:*`匹配`read:compression`。
- 每个其他授予的范围仅匹配相同的必需字符串。

对于`read:compression`，范围为`["manage"]`的键无法使用`scopeMatches` 。当`admin`、 `mcp:connect`、 `read`和`write`是唯一授予的字符串时，相同的调用会失败。除了尾随`*`之外， MCP工具范围之间没有层次结构。

除非`OMNIROUTE_MCP_ENFORCE_SCOPES=true` （默认`false`），否则强制执行。当它关闭时， `evaluateToolScopes`允许调用并跳过目录。当它打开时， HTTP使用承载密钥的`api_keys.scopes`作为`authInfo` （请参阅[每密钥HTTP范围绑定](#per-key-http-scope-binding-7895)）。当没有关键范围解析时，授予的集合会落入MCP `_meta` （仅适用于HTTP身份验证上下文中的HTTP/SSE调用者；stdio 调用者的`_meta`会被忽略，因为客户端控制它并且它不携带每个调用者身份），然后是`OMNIROUTE_MCP_SCOPES`。

#### 访问令牌范围

`oma_live_…`币 (`src/lib/accessTokens/scopes.ts`) 带有`read`、 `write`或`admin`。 `scopeSatisfies`是一个等级： `admin`涵盖`write`和`read`，而`write`涵盖`read`。未知的范围什么也覆盖不了。

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) 将该排名与`inferRequiredScope` (`src/server/authz/accessScopes.ts`) 进行比较：

- `GET`、 `HEAD`和`OPTIONS`需要`read`。
- 所有其他方法都需要`write`。
- `ADMIN_SCOPE_PREFIXES`中的路径对于每个方法都需要`admin` 。 `/api/mcp`位于该列表中，因此`write`访问令牌仍然无法调用MCP HTTP表面。
- `ADMIN_MUTATION_PREFIXES`中的路径仅需要`admin`来进行突变。
- `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) 中的路径仅需要`admin`进行突变，并且仅在该确切路径—上，其他`/api/settings/*`路由保留`write`。

`PATCH /api/keys/{id}`是一个突变，不在这些管理列表中，因此`read`令牌会收到 403 `Access token scope 'read' is insufficient; 'write' required.` `write`或`admin`访问令牌满足该路由。仪表板JWT、环回CLI机器 ID 令牌以及带有`manage`或`admin` API密钥采用其他分支，并且不会受到此等级的限制。

为`/api/mcp`传递`scopeSatisfies`访问令牌仅清除了管理门。工具调用仍然针对 API 密钥范围运行`scopeMatches` 。访问令牌排名不是`scopeMatches`的输入。

### MCP工具范围

范围执行集中在`open-sse/mcp-server/scopeEnforcement.ts`中。每个工具都需要特定的范围：

| 范围                  | 工具                                                                                                                                                                       |
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
| `read:obsidian`       | 13个阅读工具— `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9个写入工具— `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                          |

支持通配符范围： `read:*`授予所有读取范围， `*`授予完全访问权限。

### `mcp:connect` —窄路能力 (#7895)

从非环回到达HTTP/SSE MCP传输 (`/api/mcp/*`) 需要`/api/mcp/` LOCAL_ONLY剥离（请参阅`docs/security/ROUTE_GUARD_TIERS.md`）。从历史上看，剥离只接受完整的`manage`/`admin` -scope API密钥—对于只需要谈论MCP调用者来说太宽泛了。 `src/shared/constants/managementScopes.ts`现在导出`MCP_CONNECT_SCOPE = "mcp:connect"`：一个附加的窄范围（与`SELF_USAGE_SCOPE`相同的先例），授权ONLY `src/server/authz/policies/management.ts` —中的`/api/mcp/`旁路，它不授予其他管理路由访问权限，并故意保留OUT或`MANAGEMENT_API_KEY_SCOPES`。持有`manage`/`admin`密钥仍然通过剥离不变； `mcp:connect`是远程仅 MCP 调用者的低权限替代方案，通过`hasMcpConnectOrManageScope()`检查。

### 每键HTTP范围绑定 (#7895)

通过HTTP/SSE， `open-sse/mcp-server/httpTransport.ts`现在通过`resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) 解析调用者的真实`api_keys.scopes`并将其传递给MCP SDK的`transport.handleRequest(req, { authInfo })`，因此`extra.authInfo.scopes`到达每个工具调用都反映了 Bearer key 自己的范围。 `scopeEnforcement.ts`的`resolveCallerScopeContext()`已经将`authInfo`优先于`_meta`和`OMNIROUTE_MCP_SCOPES` env 后备—这仅填充第一个、最高优先级的源，该源之前未通过HTTP提供。当没有API密钥解析时（无标头、无效密钥）， `authInfo`保持`undefined`状态，并且解析会继续到现有的`meta`/env 链不变。 stdio 没有每个调用者的身份（请参阅`mcpCallerIdentity.ts`），并且不受每个密钥绑定—影响，它会跳过`_meta`步骤（`_meta`仅在HTTP身份验证上下文中受到尊重，#15159）并仅从`OMNIROUTE_MCP_SCOPES` env 密钥解析。

**Enforcement is forced on for narrow-scoped HTTP/SSE callers regardless of `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` defaulting to `false` is only safe for the local/stdio single-operator flow, where there is no per-caller identity to scope against. `open-sse/mcp-server/server.ts::withScopeEnforcement()` turns per-tool scope enforcement on unconditionally (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) whenever `resolveCallerScopeContext()` resolved `source === "authInfo"` (i.e. a real per-key HTTP Authorization header, HTTP/SSE-only) AND that key does not hold full `manage`/`admin` scope. This closes the gap where a key holding ONLY the narrow `mcp:connect` bypass scope — documented above as authorizing nothing but the `/api/mcp/` LOCAL_ONLY carve-out — could otherwise invoke every MCP tool once an operator enabled remote/non-loopback MCP access, simply because `OMNIROUTE_MCP_ENFORCE_SCOPES` ships `false` by default. A full `manage`/`admin` key over HTTP, and every stdio/local caller, keep the existing `OMNIROUTE_MCP_ENFORCE_SCOPES`-gated behavior unchanged.

---

## 环境变量

| 多变的                                  | 默认                       | 目的                                                                                                                                                                                                                                                                                                                             |
| :-------------------------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`   | MCP服务器调用OmniRoute内部APIs时使用的基础URL                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_API_KEY`                     | （空的）                   | API密钥作为`Authorization: Bearer`转发到内部API调用                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` （仅`"true"`启用） | 启用后，缺失范围会拒绝工具调用并将`scope_denied:<reason>`记录在审核日志中。对于从缺乏完整`manage`/`admin`范围—的每键授权标头 (`source === "authInfo"`) 解析的任何HTTP/SSE调用者，无论此标志如何，强制执行ALSO例如仅保留窄`mcp:connect`旁路范围—键，因此此默认值仅对于local/stdio单操作符流是安全的，对于远程非环回访问永远不安全 |
| `OMNIROUTE_MCP_SCOPES`                  | （空的）                   | 默认情况下被视为“可用”的范围的逗号分隔白名单（当调用者不提供自己的范围时使用）                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | （取消=开启）              | 当设置为`0/false/off/no`，在注册时禁用MCP描述压缩                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | （取消=开启）              | 与上面相同的切换的备用别名                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                    | 中止内部管理读取预算（健康、弹性、组合、配额、使用）                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                    | 中止等待提供者的跃点的预算（`route_request`、 `web_search`、 `web_fetch`）                                                                                                                                                                                                                                                       |
| `MCP_TOOL_DENY`                         | （取消设置=无过滤器）      | 从`tools/list`中删除的以逗号分隔的工具名称（工具基数缩减—见下文）                                                                                                                                                                                                                                                                |
| `MCP_TOOL_ALLOW`                        | （取消设置=无过滤器）      | 以逗号分隔的工具名称以独占方式保留（允许列表模式—见下文）                                                                                                                                                                                                                                                                        |
| `DATA_DIR`                              | `~/.omniroute`             | 心跳文件写入`${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                             |

---

## 描述 压缩

MCP工具、提示和资源注册表可以在registration/list时压缩描述，以减少暴露给客户端的元数据占用空间（从而减少提示上下文成本）。该实现位于`open-sse/mcp-server/descriptionCompressor.ts`中，并通过`createMcpServer()`内的`compressMcpRegistryMetadata`连接到MCP服务器。

- 使用 Caveman 规则集 (`getRulesForContext("all", "full")`) 和保留块提取（代码跨度、隔离块等）对描述文本进行压缩，因此结构内容不会改变。
- 通过`key_value`设置表中的`compression.mcpDescriptionCompressionEnabled`值切换每个部署（默认：启用） —在UI中公开为**分析→ MCP描述压缩**。
- 通过`OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`或`OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`在进程范围内切换。
- 实时统计数据通过`analytics.mcpDescriptionCompression`下的`omniroute_compression_status`呈现，并标记为`source: "mcp_metadata_estimate"` ，以消除与真实提供者使用收据的歧义。

---

## 工具基数减少 (F4.3)

描述压缩缩小了每个工具的元数据；**工具基数约简**更进一步，减少了发布的工具数量。在`tools/list`清单中宣传较少的工具可以减少客户端模型为工具目录支付的每个请求令牌成本（“第 5 层”压缩）。该实现是`open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) 中的纯无状态过滤器，连接到`createMcpServer()` (`open-sse/mcp-server/server.ts`) 中的注册循环。

**选择加入，默认关闭。**仅当设置了两个环境变量中的至少一个时，过滤器才会运行；两者均未设置，所有 110 个工具均宣布不变。

| 多变的           | 模式                                                                  |
| :--------------- | :-------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | 将始终从`tools/list`中删除的—逗号分隔工具名称列入黑名单               |
| `MCP_TOOL_ALLOW` | 将—逗号分隔的工具名称列入允许列表；只有这些幸存下来，其他一切都被丢弃 |

`deny`优先于`allow`。名称以逗号分隔、经过修剪，空条目将被忽略。示例：

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**如何删除过滤工具：**注册总是成功；配置文件拒绝的工具是MCP SDK句柄上的`.disable()` d ，因此它永远不会出现在`tools/list`中，但接线保持不变（干净的enable/disable，无需重新注册）。配置文件解析器是`readMcpToolProfileFromEnv(process.env)`，当两个变量都为空时，它返回`null` （无过滤）。

`reduceToolManifest`后面更丰富的`ToolProfile`形状还支持范围交叉过滤（`allowScopes`，与`read:*` -style通配符匹配）和确定性`maxTools`上限，但这两个旋钮在注册时需要完整的清单，并且是**不是**今天通过环境变量暴露（ `tools/list` -level钩子是跟踪的后续）。 `estimateManifestTokens()`可用于比较减少前后的清单代币成本。

---

## 运行时心跳

stdio 传输每 5 秒保持`${DATA_DIR}/runtime/mcp-heartbeat.json`活动状态。仪表板 (`/api/mcp/status`) 读取此文件加上PID liveness 来导出`online`。 HTTP相反从进程内`getMcpHttpStatus()`传输报告状态（无文件写入）。

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

## 审计日志记录

每个工具调用都会由`open-sse/mcp-server/audit.ts`记录到SQLite `mcp_tool_audit`表中：

- 工具名称、参数（hashed/truncated作为每个工具`auditLevel`）、结果
- 持续时间（以毫秒为单位）、 success/failure标志、错误消息（如果适用）
- API密钥哈希、时间戳
- 范围拒绝被记录为`scope_denied:<reason>`并缺少范围列表

使用仪表板或`/api/mcp/audit`和`/api/mcp/audit/stats` REST端点来检查最近的呼叫。

---

## 文件

| 文件                                                                     | 目的                                          |
| :----------------------------------------------------------------------- | :-------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP服务器工厂、stdio 入口点、范围工具注册     |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE +可流式HTTP传输（会话管理）               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | 工具范围评估和调用者解析                      |
| `open-sse/mcp-server/audit.ts`                                           | 工具调用审计日志记录（`mcp_tool_audit`）      |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio 心跳写入器 (`mcp-heartbeat.json`)       |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | 工具/提示/资源注册表的描述压缩                |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod模式+工具注册表（`MCP_TOOLS`，45 个条目）  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 第 2 阶段+缓存+ 1proxy 工具处理程序           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 压缩工具处理程序                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | 记忆工具定义（3个工具）                       |
| `open-sse/mcp-server/tools/skillTools.ts`                                | 技能工具定义（4个工具）                       |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion上下文源工具定义（6个工具）             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | 游戏化工具定义（8 个工具）                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | 插件注册和管理工具（8个工具）                 |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`端点                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`端点                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE运输路线                    |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP传输路线     |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit`审计日志查询                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats`聚合审计指标            |
| `src/lib/notion/api.ts`                                                  | Notion REST API客户端（重试、超时、错误分类） |
| `src/lib/db/notion.ts`                                                   | Notion令牌持久化（`key_value`表）             |
| `src/app/api/settings/notion/route.ts`                                   | Notion设置API (GET/POST/DELETE)               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion币管理UI                                |
| `tests/unit/notion-api.test.ts`                                          | Notion API客户端测试（7）                     |
| `tests/unit/notion-tools.test.ts`                                        | Notion工具范围执行测试 (10)                   |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB模块测试（3）                        |
