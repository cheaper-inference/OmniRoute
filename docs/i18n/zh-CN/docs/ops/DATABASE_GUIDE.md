# Database Schema & Operations Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **简而言之**：OmniRoute 使用启用了 **WAL 日志模式的 SQLite** 作为主要存储，并使用 **AES-256-GCM** 对静态存储的敏感字段进行加密。本指南涵盖数据库架构、迁移、备份/恢复以及运维操作手册。

**来源：**

- `src/lib/db/core.ts` — 单例 + SCHEMA_SQL（17 个基础表）
- `src/lib/db/migrationRunner.ts` — 版本化迁移
- `src/lib/db/migrations/` — 167 个版本化 SQL 文件
- `src/lib/db/encryption.ts` — 加密辅助函数
- `src/lib/db/backup.ts` — 备份导出/导入
- `src/lib/db/healthCheck.ts` — 健康诊断

---

## 为什么选择 SQLite？

OmniRoute 选择 SQLite 而非 PostgreSQL/MySQL，原因如下：

| 因素       | SQLite                   | PostgreSQL               |
| ---------- | ------------------------ | ------------------------ |
| **部署**   | 嵌入式——无需单独的服务器 | 需要配置服务器           |
| **加密**   | 应用层（AES-256-GCM）    | 内置 TDE                 |
| **性能**   | 对中小型工作负载更快     | 更适合海量并发写入       |
| **并发性** | WAL 模式允许并发读取     | 完整 MVCC                |
| **备份**   | 复制单个文件             | `pg_dump` 或文件系统快照 |
| **用例**   | 单用户安装、嵌入式部署   | 多租户 SaaS              |

对于**单用户、单实例**部署（OmniRoute 的主要用例），SQLite 更简单、更快速。

### WAL 日志模式

`core.ts` 以 **WAL（预写式日志）模式**打开数据库：

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL 允许在写入期间进行**并发读取**——这对仪表板非常重要，因为仪表板会在记录请求的同时执行查询。

默认缓存大小为 **65,536 KiB（64 MiB）**。SQLite 将负值
`cache_size` 解释为以 KiB 为单位的近似上限，并按需分配页面。
**设置 > 系统与存储 > 缓存大小**接受从 **1 到
1,000,000 KiB** 的整数值；保存设置后，该值会应用于当前数据库连接，
并且 OmniRoute 会在启动时恢复已持久化的值。

---

## 数据库位置

SQLite 文件存储在：

| 操作系统 | 路径                                                 |
| -------- | ---------------------------------------------------- |
| Linux    | `~/.omniroute/storage.sqlite`                        |
| macOS    | `~/.omniroute/storage.sqlite`                        |
| Windows  | `%USERPROFILE%\.omniroute\storage.sqlite`            |
| Docker   | `/app/data/storage.sqlite`（可通过 `DATA_DIR` 配置） |

配套文件：

- `storage.sqlite-wal` — 预写式日志
- `storage.sqlite-shm` — 共享内存文件
- `call_logs/` — 请求负载产物（如果已启用）

**覆盖默认位置：**

```bash
DATA_DIR=/custom/path omniroute
```

---

## 领域模块架构

OmniRoute 的数据库在 `src/lib/db/` 中包含 **110 个顶层 TypeScript 模块**。每个领域模块：

- 负责一个或多个特定表
- 导出类型化的 CRUD 函数
- 从不操作其他模块的表
- 使用 `core.ts` 中的 `getDbInstance()` 访问数据库

### 110 个顶层数据库模块

OmniRoute 在 `src/lib/db/` 中有 **110 个顶层 TypeScript 文件**。以下是核心模块示例；完整列表请参阅目录清单：

| 模块                    | 表                                                             | 职责                                         |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API 密钥提供者注册和凭据管理           |
| `models.ts`             | `key_value`（模型数据）                                        | 模型定义、功能和定价                         |
| `combos.ts`             | `combos`                                                       | 组合路由配置和排序                           |
| `apiKeys.ts`            | `api_keys`                                                     | API 密钥生命周期、作用域和配额跟踪           |
| `settings.ts`           | `key_value`、`api_keys`、`combos`                              | 系统配置和共享 KV 存储                       |
| `backup.ts`             | —                                                              | 备份导出/导入操作                            |
| `proxies.ts`            | `proxy_registry`、`proxy_assignments`、`provider_connections`  | 代理配置和路由规则                           |
| `prompts.ts`            | `prompt_templates`                                             | 可复用的提示词模板和版本控制                 |
| `webhooks.ts`           | `webhooks`                                                     | 事件驱动的 Webhook 订阅和日志                |
| `detailedLogs.ts`       | `request_detail_logs`                                          | 每请求审计日志记录（可选，高容量）           |
| `domainState.ts`        | `domain_*`（5 个表）                                           | 领域预算、熔断器、锁定、回退链和成本历史记录 |
| `registeredKeys.ts`     | `registered_keys`、`account_key_limits`、`provider_key_limits` | 用于 MCP/A2A 的 API 密钥白名单               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 历史配额使用情况                             |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | 将模型映射到默认组合                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 专用持久化状态                           |
| `encryption.ts`         | —                                                              | 用于加密/解密字段的辅助函数                  |
| `readCache.ts`          | —                                                              | 用于读取密集型操作的内存缓存                 |
| `secrets.ts`            | `key_value`（加密条目）                                        | 加密的密钥存储                               |
| `stateReset.ts`         | —                                                              | 清除/重置数据库状态以进行测试                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | 用于智能体移交的会话上下文                   |
| `usage*.ts`             | `usage_history`、`call_logs`、`proxy_logs`                     | 使用情况跟踪                                 |
| `compression*.ts`       | `compression_settings`、`compression_combos`                   | 压缩配置                                     |

### 模块边界

一项核心架构规则：**模块不能直接访问其他模块的表**。如需操作另一个模块的数据，应从该模块导入相应函数。

```ts
// ❌ 错误：直接对另一个模块执行 SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 正确：使用 providers 模块的函数
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

此规则通过代码审查强制执行——虽然没有静态检查，但任何违规都会被标记。

---

## 基础架构（17 个表）

`core.ts` 在 `SCHEMA_SQL` 中定义了 17 个基础表。这些表由迁移 `001_initial_schema.sql` 创建，并构成核心架构。

### 核心表（在初始迁移中创建）

| 表                         | 用途                 | 关键列                                                                  |
| -------------------------- | -------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | 提供者凭据（已加密） | `id`、`provider`、`auth_type`、`api_key`、`is_active`                   |
| `provider_nodes`           | 提供者节点路由信息   | `id`、`type`、`name`、`base_url`、`created_at`                          |
| `key_value`                | 通用 KV 存储         | `namespace`、`key`、`value`                                             |
| `combos`                   | 路由组合定义         | `id`、`name`、`data`、`sort_order`                                      |
| `api_keys`                 | 网关的 API 密钥      | `id`、`name`、`key`、`machine_id`、`allowed_models`                     |
| `db_meta`                  | 数据库元数据         | `key`、`value`                                                          |
| `usage_history`            | 请求用量记录         | `id`、`provider`、`model`、`tokens_input`、`tokens_output`、`timestamp` |
| `call_logs`                | 请求载荷和响应       | `id`、`timestamp`、`status`、`model`、`provider`、`latency_ms`          |
| `proxy_logs`               | 代理请求日志         | `id`、`timestamp`、`proxy_type`、`status`、`provider`                   |
| `domain_fallback_chains`   | 模型到提供者的回退链 | `model`、`chain`                                                        |
| `domain_budgets`           | 每个域的支出预算     | `api_key_id`、`daily_limit_usd`、`warning_threshold`、`reset_interval`  |
| `domain_budget_reset_logs` | 预算重置历史         | `id`、`api_key_id`、`reset_interval`、`previous_spend`、`reset_at`      |
| `domain_cost_history`      | 每个域的成本跟踪     | `id`、`api_key_id`、`cost`、`timestamp`                                 |
| `domain_lockout_state`     | 域限流状态           | `identifier`、`attempts`、`locked_until`                                |
| `domain_circuit_breakers`  | 每个域的熔断器状态   | `name`、`state`、`failure_count`、`last_failure_time`                   |
| `semantic_cache`           | LLM 响应缓存         | `id`、`signature`、`model`、`prompt_hash`、`response`                   |
| `quota_snapshots`          | 历史配额快照         | `id`、`provider`、`connection_id`、`window_key`、`remaining_percentage` |

### 附加表（由后续迁移添加）

后续迁移添加了如下表：

- `cli_tool_state`（迁移 011）— CLI 工具状态
- `mcp_*` 表 — MCP 服务器审计
- `a2a_*` 表 — A2A 任务状态
- `usage_*` 表 — 用量跟踪
- `plugin_*` 表 — 插件系统
- `skill_executions` — 技能执行历史
- `memory_*` 表 — 记忆系统
- `compression_*` 表 — 压缩系统
- `webhook_*` 表 — Webhook 投递日志
- `acp_*` 表 — Agent Client Protocol
- `oneproxy_*` 表 — 1proxy 市场
- `proxy_assignments` — 代理作用域绑定
- `detailed_call_artifacts` — 调用日志制品元数据
- `quota_alert_history` — 配额警报审计
- `command_code_auth_sessions` — Command Code OAuth 会话

约 30 多个表的完整列表位于 `src/lib/db/migrations/`。

---

## 迁移

OmniRoute使用**版本化、幂等迁移**在`src/lib/db/migrations/`.每个迁移都是一个SQL文件。两种命名格式并存； `_omniroute_migrations`中记录的版本是数字前缀。

### 迁移命名

| 格式                                                 | 例子                                 | 用于                                                                                            |
| ---------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `NNN_description.sql` （正好 3 位数字）              | `241_seen_models.sql`                | 旧系列`001`–`241`。当时间戳格式登陆时冻结（`240`和`241`就在它之前合并）：没有新文件获得序列号。 |
| `YYYYMMDDHHMMSS_description.sql` （14 位数字， UTC） | `20261113120000_add_usage_index.sql` | 自 2026 年 11 月 13 日起创建的每个迁移。                                                        |

为什么改变：对于连续编号，并行PRs选择相同的下一个编号，除了一个编号外，所有编号都必须在合并之前重新编号。 UTC时间戳为每个PR提供了自己的版本。

时间戳格式规则（由`npm run check:migration-numbering`强制执行，与`scripts/check/lib/migrationNaming.mjs`中的生成器共享）：

- 时间戳是真实的UTC日期和时间，不早于`20261113000000`且不超过未来10分钟。
- 描述为小写`snake_case`以字母开头（`a-z`、 `0-9`、单词之间单个`_` ），最多 80 个字符。
- 具有相同时间戳的两个文件是重复的。
- 无间隙规则仅适用于旧系列：从`001`到`241`每个数字都必须存在，除了已知的间隙`026`、 `055`和`121`。删除`241` （或任何旧文件）会使门失败。 `001`和`241`永远不能添加到`KNOWN_GAPS`名单中。带时间戳的文件永远不会产生间隙。
- `src/lib/db/migrations/`中的每个条目都必须是具有有效小写`.sql`名称的常规文件。目录、符号链接、 `.SQL`或`.sql.bak`文件、隐藏文件或带有空格的名称都无法通过该门，因为运行程序会默默地跳过它或在启动时崩溃。

**申请订单。**运行程序按前缀的数值排序，而不是按文本排序：首先是旧的`001`–`241`文件，然后是按时间戳顺序的带时间戳的文件，然后是使用`OMNIROUTE_EXTRA_MIGRATIONS_DIRS`注册的任何命名空间目录（例如`ee-001`等版本）。挂起的迁移是其版本不在`_omniroute_migrations`中的任何文件，因此从旧分支迁移到新分支之后合并的迁移仍然适用于现有数据库。

**时间戳是创建顺序，而不是合并顺序。**如果您的迁移依赖于由迁移创建的表或列**较新的**时间戳（例如，来自首先合并的另一个PR数据库），新的数据库将首先运行您的数据库并失败。当您的PR仍然打开时，使用`npm run db:new-migration`重新生成文件名，以便它获得更新的时间戳，或使其独立。 `npm run test:migrations:fresh`将每个迁移应用到一个空数据库并捕获它。

### 合并的迁移永远不会被删除或重命名

一旦迁移文件位于发布分支或`main`上，它就已经在同源数据库和开发人员数据库、 VPS安装和企业同步中运行。从此：

- **切勿删除它。**全新安装将丢失其架构，而升级的数据库则保留其架构。
- **永远不要重命名它。** `_omniroute_migrations`中的版本将不再与文件匹配，因此每个已应用该版本的数据库都将再次运行它。然后，非幂等SQL会复制数据或停止启动。
- **需要不同的架构吗？**使用`npm run db:new-migration`创建新的迁移。

重命名仅对于尚未合并的文件是安全的，这就是门的提示所指的情况。发布标签在这里不会改变任何内容：每次推送到`release/v*`分支都会发布Docker `:next`映像并在同源、 VPS安装和企业同步上运行，因此在任何`vX.Y.Z`标签存在之前，合并迁移已在真实数据库上运行。每次删除基本文件（无论是否已标记）都会失败。

- **恢复合并的迁移。**删除文件的`git revert`会失败。保留文件并在新迁移中撤消其架构： `npm run db:new-migration -- <description>`、 `DROP TABLE IF EXISTS`、 `DROP INDEX IF EXISTS`等。升级后的新数据库将以相同的架构结束。
- **接受的重命名是：兼容性条目和相同的内容。**如果合并的文件必须移动（例如，两个合并的文件共享时间戳并且运行程序因版本冲突而停止），请重命名后一个文件而不触及其SQL并将`{ fromVersion, fromName, toVersion, toName }`添加到`src/lib/db/migrationRunner/constants.ts`中的`RENAMED_MIGRATION_COMPATIBILITY` 。应用旧版本的数据库会移动其`_omniroute_migrations`行，而不是再次运行该文件。无论新的时间戳是什么，门都会对此类重命名发出警告，并始终对其运行交换检查：全新安装将文件应用到新位置，升级的数据库则不会，因此请选择靠近旧时间戳的新时间戳。如果内容发生更改（新迁移中仍会发生架构更改），或者条目的目标文件不在磁盘上，则门将导致重命名失败。
- **切勿在同一时间戳内重命名。**保留时间戳并仅更改描述的重命名会失败，无论有或没有条目。对于`toVersion`等于`fromVersion`的条目，运行程序将删除旧的`_omniroute_migrations`行，并将该文件再次应用于已运行该文件的每个数据库。如果没有条目，运行程序将仅跟踪版本：它会跳过这些数据库上的文件（新内容永远不会在那里运行）并在每次启动时记录重新编号错误。使用另一个时间戳加上兼容性条目，或保留名称。
- **该门检查重命名的文件是否不会再次运行。**对于每个覆盖的重命名，门将新文件名传递给`--must-not-apply`进行交换检查。检查使用真实的运行程序启动升级的数据库，如果运行程序再次应用该文件（例如，因为条目的版本或名称错误，或者因为门的文本解析器读取`constants.ts`与TypeScript不同），门会失败并显示`migration renomeada rodaria de novo`并要求您检查条目的旧版本和新版本和名称。

### 大门与基地检查什么

在拉取请求和合并队列运行时， `npm run check:migration-numbering`将磁盘上的`src/lib/db/migrations/`与基本分支上的相同目录进行比较。基数按此顺序为： `--base-latest-tag`、 `--base <ref>`、 `MIGRATION_BASE_REF`变量，或者，当`GITHUB_EVENT_NAME`为`pull_request`、 `pull_request_target`或`merge_group`时，合并提交的第一个父级、事件负载的`merge_group.base_sha`或`git merge-base HEAD origin/$GITHUB_BASE_REF`。在没有可解析基础的拉取请求或合并队列运行中，门会失败。在没有`--base` CI之外，它会打印`comparação com a base: pulada (sem --base)`并跳过这些规则。

`--base-latest-tag`与`HEAD`历史记录中的最新版本标签（按 semver 顺序的`vX.Y.Z` ；nightlies 等后缀标签不算在内）进行比较，规则与`--base`相同。 Release-Green (`scripts/quality/validate-release-green.mjs`) 以这种方式运行门，因为推送和计划运行没有拉取请求基础，并且合并可以在没有新的CI运行的情况下落地。由于历史记录中没有发布标签，门会失败；运行`git fetch --tags` （在CI中， `actions/checkout`和`fetch-depth: 0`带来标签）。

| 拉取请求的更改                                                            | 结果                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 基地上存在的文件被重命名，带有`RENAMED_MIGRATION_COMPATIBILITY`条目       | **警告**如果内容相同，并且无论新时间戳如何，换向检查都会运行；如果新位置更改了最终架构（撤消重命名，或在通勤时选择另一个新时间戳），或者运行程序在升级的数据库上再次应用重命名的文件，则该操作会失败。**失败**如果内容发生变化。 |
| 基地上存在的文件被重命名，保留其时间戳（仅描述发生变化）                  | **失败**，有或没有条目：跑步者将再次应用它（带有条目）或按版本跳过它（没有条目）。使用另一个时间戳加上兼容性条目，或保留名称。                                                                                                   |
| 基础上存在的文件被删除，或在没有条目的情况下重命名                        | **失败**，无论文件是否在发布标签中。要撤消它，请使用`git checkout <base> -- src/lib/db/migrations/<file>`恢复文件；要恢复其架构，请使用`DROP ... IF EXISTS`添加新的迁移。                                                        |
| 基地上存在的文件具有不同的内容                                            | **警告**（ GitHub操作中的`::warning`注释），并且运行换向检查。如果编辑更改了最终架构，则会失败，因为升级的数据库不会再次应用编辑的文件：将更改放入新的迁移中。无害的编辑（评论， `IF NOT EXISTS`）仅发出警告。                   |
| 添加带时间戳的文件，其时间戳不比基础的最新时间戳更新                      | 运行换向检查，如下所述。                                                                                                                                                                                                         |
| 旧格式`NNN_`文件添加了一个数字，位于基地最新的旧格式文件下方              | **失败**，即使`KNOWN_GAPS`在同一个拉取请求中进行编辑：旧系列已冻结，请使用`npm run db:new-migration`创建迁移。接受高于基地最新文件（ `release/v*`到`main`拉取请求）的旧格式文件。                                                |
| 无序、编辑或重命名的文件包含`INSERT`、 `UPDATE`、 `DELETE`或`REPLACE`语句 | **警告**：交换检查不会比较数据，因此请检查升级后的数据库和新数据库应用它的顺序是否会更改结果。                                                                                                                                   |

一次交换检查会将无序、已编辑和重命名的文件一起覆盖。

交换检查（`scripts/check/migration-commutation.ts`）使用实际安装路径构建两个临时数据库：一个**升级版**一个（使用基本迁移启动，然后使用拉取请求的迁移在同一文件上再次启动）和一个**新鲜的**一个（通过拉取请求的迁移启动一次）。它比较结果模式：表和列（忽略列顺序）、 UNIQUE / PRIMARY KEY和FOREIGN KEY约束、每个表的规范化`CREATE TABLE`文本（涵盖CHECK约束、排序规则、生成的列和表选项）、索引、触发器和视图。不比较行数据。如果它们匹配，门就会打印出文件无序，但会通勤并通过。如果它们不同，则门会失败，并显示差异和情况提示：对于无序文件，使用`npm run db:new-migration`重新生成其名称，这是安全的，因为文件尚未合并；对于已编辑的基础文件，恢复基础内容并将更改放入新的迁移中；对于重命名的文件，撤消重命名或在其通勤处选择另一个新时间戳，切勿使用其他名称的相同时间戳。如果检查本身无法运行，则CI中的门会失败，并且仅在本地发出警告。对于已编辑的基本文件，升级的数据库是使用该文件的基本内容构建的，并且第二次引导会跳过它，因为它的版本已被记录。对于重命名的文件，升级后的数据库是使用旧名称下的文件构建的，第二次启动时将其`_omniroute_migrations`行移动到兼容性条目，而不是再次运行；门通过`--must-not-apply`传递新名称，因此如果第二次启动应用它，检查将失败。如果拉取请求迁移无法应用于升级的路径，即在每次基础迁移之后（无论是否在全新安装时也失败），gate 会报告`migration do PR não aplica`并要求您针对基础的当前架构修复SQL ；如果文件依赖于具有较晚时间戳的另一个拉取请求迁移，请使用`npm run db:new-migration`重新生成其名称。

要在本地运行相同的比较，请显式传递基数，例如`npm run check:migration-numbering -- --base origin/<base-branch>`或`npm run check:migration-numbering -- --base-latest-tag`来与最新版本进行比较。

### 转换 Open PR的`NNN`迁移

在切换之前打开的拉取请求可能仍然携带顺序文件，例如`242_add_widgets.sql`。 `241`以上的旧数字被拒绝，因此在合并之前将其转换：

1. **使用生成器重命名文件，保留描述。**运行`npm run db:new-migration -- <same description>`获取新名称，将SQL移入其中，然后删除旧的`NNN_`文件。描述必须保持相同：下面的兼容性条目与之匹配。
2. **如果持久数据库运行旧版本，请添加兼容性条目。**如果保留的任何数据库（同源、 VPS、贡献者自己的安装）使用`NNN_`文件运行PR的构建，请将`{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }`添加到`src/lib/db/migrationRunner/constants.ts`中的`RENAMED_MIGRATION_COMPATIBILITY` 。这是**`237`到`241`所需**：这些槽现在保存规范的`237_usage_history_calculated_cost.sql`、 `238_codex_connection_fences.sql`、 `239_call_logs_pending_detail_index.sql`、 `240_provider_node_custom_json_config.sql`和`241_seen_models.sql`，如果没有该条目，这样的数据库将永远跳过规范迁移并再次运行转换后的迁移。当目标是时间戳时，它也适用于保持空的槽，例如`242`。如有疑问，请添加该条目。将其添加到数组中的位置并不重要：当一个条目的目标槽仍然保留另一个条目移走的行时（例如`237`持有PR行，而较旧的`usage_history_calculated_cost`行等待移入`237`），运行程序会让该条目等待，直到槽空闲。只有真正的冲突，例如没有条目移动的行所持有的槽，或者交换槽的两个条目，才会停止`Cannot reconcile ...`的引导。
3. **保持SQL幂等**（`CREATE TABLE IF NOT EXISTS`、 `CREATE INDEX IF NOT EXISTS`、 `INSERT OR IGNORE`），因为转换后的迁移可能会遇到其架构已存在的数据库。
4. **移动版本键控的特殊情况。**如果PR在`isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) 或`OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) 中添加了旧编号的情况，请将密钥更改为新时间戳。

`tests/unit/db/codex-fence-migration-rename.test.ts`是重命名迁移测试的工作示例。

### 向后移植到切换前的分支

切勿将`YYYYMMDDHHMMSS_`文件挑选或反向移植到交换机之前的分支（例如较旧的`release/v*`分支）。那里的运行程序将文件名排序为文本，因此带时间戳的文件将在新数据库上的`201_`和`202_`之间运行，而那里的旧门不理解 14 位前缀。在这样的分支上，将更改写入该分支自己的下一个`NNN_`文件，幂等，因此当带时间戳的版本稍后到达时，它是一个无操作。

### 迁移如何运行

启动时， `migrationRunner.ts`：

1. 如果`_omniroute_migrations`表不存在则创建
2. 查询已应用的迁移
3. 按顺序应用任何新迁移，每个迁移都在一个事务中
4. 记录每个应用的迁移和时间戳

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### 幂等性

迁移必须是**幂等的**—运行它们两次应该是无操作：

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

自由使用`IF NOT EXISTS`、 `IF EXISTS`和`OR IGNORE` / `OR REPLACE`子句。

### 添加新的迁移

1. **使用生成器创建文件**: `npm run db:new-migration -- <description>` （例如`npm run db:new-migration -- add combo priority`）。它使用当前UTC时间和注释标头写入`src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` ，如果采用该时间戳则向前移动一秒，并且永远不会覆盖文件。不要手动选择号码。
2. **使用安全DDL** ： `CREATE TABLE IF NOT EXISTS`、 `CREATE INDEX IF NOT EXISTS`、 `ALTER TABLE ... ADD COLUMN`
3. **仔细回填数据**：使用`UPDATE ... WHERE ...`处理现有行
4. **检查顺序和命名**： `npm run test:migrations:fresh` （空数据库上的所有迁移）和`npm run check:migration-numbering`
5. **在副本上测试**：永远不要在生产环境中运行未经测试的迁移

例子：

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **向后不兼容的更改**（例如，删除列）很棘手。 OmniRoute NOT是否支持降级—一旦应用迁移，架构更改是永久性的。相应地计划。

---

## 静态数据加密

敏感字段（API 密钥、OAuth 令牌、连接字符串）使用 **AES-256-GCM** 进行静态加密。

### 工作原理

```ts
// src/lib/db/encryption.ts（简化版）
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 使用位置

- `provider_connections.api_key`——在应用层加密
- `provider_connections.access_token`、`refresh_token`、`id_token`——在应用层加密
- `namespace = "secrets"` 的 `key_value` 条目——在应用层加密
- `proxy_registry.auth`——在应用层加密（如果存在）

### 加密密钥

加密密钥派生自一个**口令**（通过 `STORAGE_ENCRYPTION_KEY` 环境变量设置）和一个**盐值**（存储在数据库中）。解密数据时，两者缺一不可。

```bash
# 生成安全口令
openssl rand -hex 32

# 在 .env 中设置
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **关键提示**：丢失加密密钥意味着无法再访问所有加密数据。**请将密钥与数据库分开备份**。

### 未加密的内容

出于性能考虑，以下内容以明文形式存储：

- 提供者显示名称
- 模型定义（已公开）
- 路由规则
- 使用记录（不含个人身份信息）

---

## 加密注意事项 (v3.8.16+)

OmniRoute 使用 **`migrateLegacyEncryptedString()`** 透明地处理两种加密方案：

- **旧版**（v3.5.0 之前）：基于 XOR 的“加密”（并非真正的加密）
- **当前版本**：AES-256-GCM，使用正确的 IV 和认证标签

迁移辅助函数会检测旧格式，并在首次读取时使用新方案重新加密。这意味着你可以升级旧数据库而不会丢失凭据。

---

## 读取缓存

对于频繁读取的数据（模型、提供者、设置），`readCache.ts` 提供了**内存缓存**：

```ts
// 启动时缓存，写入时失效
const providers = await getCachedProviders(); // 快速，从内存读取
const fresh = await listProviders(); // 较慢，访问数据库
```

| 缓存实体               | 缓存键         | TTL      |
| ---------------------- | -------------- | -------- |
| `models`               | `models:v1`    | 直到写入 |
| `provider_connections` | `providers:v1` | 直到写入 |
| `settings`             | `settings:v1`  | 直到写入 |
| `combos`               | `combos:v1`    | 直到写入 |

每次写入相应的数据表时，缓存都会失效。

---

## 备份与恢复

### 手动备份

```bash
# 使用 CLI 创建本地备份
omniroute backup create --name pre-migration

# 或通过 API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

备份文件包括：

- 所有数据库表（序列化为 JSON）
- 调用日志制品（使用 base64 编码，可选）
- 设置和密钥（已加密）
- 插件配置

### 恢复

```bash
# 通过 CLI
omniroute restore pre-migration

# 通过 API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **警告**：恢复操作会覆盖整个数据库。请先停止所有客户端。

### 自动备份

```bash
# 通过 CLI 启用每日自动备份
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

该计划由服务器端的后台作业执行，此作业每 30 秒触发一次
（默认值），并根据服务器本地时间计算 cron 表达式。

| 变量                                        | 默认值  | 说明                                                                                          |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | 触发间隔，以毫秒为单位（最小值为 `5000`）。必须短于 60 秒，才能可靠地落在匹配的 cron 分钟内。 |

### SQLite 热备份

如需对正在使用的数据库进行零停机备份：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

此命令使用 SQLite 的在线备份 API，因此可在 OmniRoute 运行时安全执行。

---

## 性能调优

### WAL模式

WAL默认启用。对于高写入工作负载，请考虑：

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute不设置`journal_size_limit`。检查点将WAL帧移动到主文件中，但WAL文件保持其最大分配大小。 `OMNIROUTE_WAL_GUARD_MAX_MB`守卫仅警告并运行`wal_checkpoint(RESTART)`；它不是磁盘大小上限。

### 索引

性能关键指标（由迁移自动创建）：

- 按提供者查找`idx_models_provider` —模型
- `idx_combo_targets_combo_id` —组合目标扩展
- `idx_usage_history_api_key_timestamp` —使用情况分析
- `idx_quota_snapshots_api_key_window` —配额跟踪
- `idx_call_logs_timestamp` —通话记录查询

要添加新索引，请创建迁移：

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### 内存映射I/O

对于非常大的数据库（> 10GB），可以通过SQLite pragma 调整内存映射：

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 压实

长期运行的OmniRoute实例受益于偶尔的`VACUUM`：

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

在低流量时段每月运行一次。 （WAL模式减少了这种需求，但并没有消除它。）

---

## 健康检查

`src/lib/db/healthCheck.ts` 提供**数据库级健康诊断**：

这两种请求方法都需要身份验证（否则返回 `401`）。`GET` 仅进行诊断；`POST` 则在启用
`autoRepair` 的情况下运行相同检查。

```bash
GET  /api/db/health   # 诊断
POST /api/db/health   # 诊断并修复
```

响应是由 `runDbHealthCheck()` 生成的 `DbHealthCheckResult`
（`src/lib/db/healthCheck.ts`）：

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "域预算引用了已不存在的 API 密钥。",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| 字段              | 含义                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | 当 `issues` 为空时为 `true`。`driver` 永远不会影响该值。                                                   |
| `issues[].type`   | `integrity_check_failed`、`broken_reference`、`stale_snapshot`、`invalid_state` 之一。                     |
| `repairedCount`   | 本次运行期间修复的行数；当 `autoRepair` 为 false 时始终为 `0`。                                            |
| `backupCreated`   | 修复前是否已创建备份。                                                                                     |
| `checkedAt`       | 本次运行与其写入的任何修复说明共用的 ISO 时间戳。                                                          |
| `driver.name`     | 为被检查数据库提供服务的 SQLite 驱动程序。                                                                 |
| `driver.degraded` | 当写入内容未由数据库文件持久保存时为 `true`——即使用 `sql.js` WASM 回退方案（全文件持久化）或内存数据库时。 |

`omniroute_db_health_check` MCP 工具会返回相同的有效负载。

运行 `PRAGMA integrity_check` 以检测损坏：

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 应输出：ok
```

如果返回除 `ok` 之外的任何内容，请**立即停止使用该数据库**并从备份中恢复。

---

## 灾难恢复

### 场景 1：WAL 文件丢失

`-wal` 文件丢失，但 `-shm` 文件和主数据库完好：

```bash
# 下次打开时自动恢复
omniroute
```

如果 SQLite 无法自动恢复：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 场景 2：主数据库文件损坏

从备份恢复：

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` 仅从正在运行的服务器下载完整的 `.tar.gz` 归档
（`GET /api/db-backups/exportAll`，需要操作员凭据）；它不会执行任何恢复操作。

### 场景 3：加密密钥丢失

没有密钥时**无法恢复**。加密字段将无法读取。请使用新凭据手动重新添加所有提供者。

> **缓解措施**：请始终单独备份加密密钥，最好将其存储在密码管理器或 KMS 中。

### 场景 4：磁盘已满

SQLite 将返回 `SQLITE_FULL` 错误。释放磁盘空间，然后执行：

```bash
# 对 WAL 执行检查点操作以释放空间
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 常用操作

### 检查表

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### 计算所有表中的行数

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### 重置（擦除）所有数据

```bash
# Stop OmniRoute first
omniroute stop

# Delete the DB file
rm ~/.omniroute/storage.sqlite*

# Restart (will recreate empty DB)
omniroute
```

对于一个**选择性的**重置（保留提供程序，擦除使用情况）：

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 导出单表

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## 故障排除

### “数据库已锁定”

另一个进程持有写锁。可以：

- 等待另一个进程完成（使用 `lsof | grep storage.sqlite` 检查）
- 终止另一个进程
- 如果问题持续存在，请重启 OmniRoute

### “外键约束失败”

某个领域模块违反了引用完整性。请检查：

- 依赖表中的孤立行
- 未能传播的级联删除
- 最近更改了外键的迁移

运行 `PRAGMA foreign_key_check;` 以查找违规项。

### “内存不足”

SQLite 的内存映射 I/O 超出了操作系统限制。可通过 SQLite pragma 减少其大小：

```sql
PRAGMA mmap_size = 134217728;  -- 使用 128MB，而不是 256MB
```

或者将其禁用：

```sql
PRAGMA mmap_size = 0;
```

### “迁移中途失败”

迁移在事务中运行，因此应该已回滚。如果没有：

1. **停止 OmniRoute**（防止继续尝试）
2. 使用 `sqlite3` **检查数据库状态**
3. **手动修复**未完成的迁移
4. **重新运行** OmniRoute（将重试迁移）

为防止这种情况，请始终先在副本上测试迁移。

---

## 另请参阅

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用情况表
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — 健康监控
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — 发布流程
- 源代码：`src/lib/db/`（80 多个文件，约 25K 行代码）
