# Log export (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

将 OmniRoute 调用日志持续、增量地导出到外部分析存储。

Logs 仪表板标签页将请求历史记录保存在 SQLite (`call_logs`) 中，其容量受轮换和保留策略限制。日志导出会按计划将同一组记录发送出去，使其存续时间超过本地数据库，并可与其他数据联接。BigQuery 是首个目标端；该管道采用注册表机制，因此可以增量添加更多目标端。

---

## 1. 工作原理

```
服务器（解密并验证配置、协调游标）
  → 启动 IPC → 隔离的 exportChild 操作系统进程
    → 只读 storage.sqlite → 共享的调用日志查询/映射
      → 异步制品加载 → 目标 prepare()/send()
        → 批次 IPC → 服务器持久化游标 → 确认 IPC
          → 下一批次；完成 IPC → 服务器记录成功
```

- **调度** — 一个 `JobRegistry` cron 作业 `log_export`，默认为 `0 * * * *`（每小时，
  UTC）。在 `src/lib/initCloudSync.ts` 中注册；可使用 `OMNIROUTE_LOG_EXPORT_CRON` 覆盖。
  每次触发都会依次处理完每个**已启用**的目标。
- **游标** — SQLite 的隐式 `call_logs.rowid`，按目标持久化在
  `log_export_destinations.cursor_row_id` 中。刻意不使用 `timestamp` 作为游标：调用方
  可能会提供自己的值，因此较慢的请求可能在启动时间更晚但完成更快的请求之后写入，
  而时间戳游标会跳过它。
- **批处理** — 每个请求包含 `batch_size` 行（默认 500），每次运行最多处理
  `max_rows_per_run` 行（默认 10000），这样大量积压会在多次触发中逐步清空，而不是阻塞单次运行。
- **投递** — 只有在 `send()` 成功解析后游标才会前进。失败的批次会使游标保持原位，
  因而相同的行会在下次运行时重试。其保证是至少一次投递并由目标端去重，而不是真正的
  恰好一次：BigQuery 使用调用日志 id 作为每行的键，并在其自身的去重窗口内尽力保证去重。
- **重叠防护** — cron 触发与 `POST .../run` 可能同时发生。对于已经在处理的目标，
  会跳过而不是重复处理（运行结果中为 `skipped: true`），因此并发运行无法重新发送批次，
  也无法将游标向后写入。
- **清理恢复** — 如果 `cursor_row_id` 最终大于 `MAX(rowid)`（整个表已被清理且 rowid
  重新开始），运行程序会将其回退到 0，而不会永久无法发现新数据。

### 隔离运行程序与限制

在 Node 上，每个目标的每次运行都会启动一个独立且短生命周期的操作系统子进程
（使用带 IPC 的 `child_process`，而非 `worker_threads`）。正文读取、负载 JSON
解析/序列化、目标 `prepare()` 以及目标网络 I/O 全部在该进程中运行，而不在服务器的事件循环中运行。
只有配置和小型进度消息会通过 IPC；导出的记录绝不会返回服务器。
cron 作业和“立即运行”路由保持相同的公共结果和重叠防护机制。

子进程使用 `node:sqlite` 以只读方式打开服务器解析后的 `DATA_DIR/storage.sqlite`，
并设置 `busy_timeout=5000` 和 `query_only=ON`。它不会导入任何数据库单例，也不会执行
迁移、备份或 SQLite 更新。缺失/损坏制品的记录处理（包括针对损坏制品的 UPDATE）
仍然仅存在于仪表板详情路径中。两条路径共享一个纯详情解析器；导出使用异步文件系统读取，
并采用相同的“制品 → 旧版内联 → 旧版磁盘 → 无”解析顺序。子进程打开读取器时，
每次运行都会创建最大插入 rowid 的快照；之后的插入会等待下一次运行。这是一个插入边界，
而不是长期存在的 SQLite 事务：在网络等待期间，WAL 写入程序和检查点仍可自由运行。
现有行的更新/删除不会被此边界冻结。

每个批次被接受后，子进程会等待确认。服务器先使用 `advanceLogExportCursor`
持久化游标，然后发送 `ack`；在此之前不会开始下一批次。发送失败、崩溃或超时会记录失败，
且不会推进该批次的游标。先前已确认的批次仍会保持提交状态；最多只有一个尚未确认的批次
可能被重新发送。只有收到 `done` 且子进程正常退出后才会记录成功。发生失败时，会使用
SIGTERM 终止子进程，500 ms 后升级为 SIGKILL，并且运行程序会等待进程关闭。

| 环境变量                                      | 默认值 | 用途                           |
| --------------------------------------------- | ------ | ------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | 每个目标的实际运行时间限制     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | 子进程 V8 老生代空间限制（MB） |

无效、非正数或非整数值会使用默认值。堆设置并不是总 RSS 限制；非常大的批次仍可能耗尽
子进程内存，并使运行安全地失败。默认的 1024 MB 为默认的 500 行批次留出了余量，
其中每行包含 512 KiB 制品且启用了正文，包括 BigQuery 的按字节分块 JSON 序列化。
它并不能确保包含正文的 10000 行批次安全运行。V8 堆耗尽会记录可操作的失败信息：
减小批次大小或提高 `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`；游标会停留在最后一个
已确认批次的位置。历史内联/磁盘正文不受现代制品上限约束。运维人员必须单独规划 RSS，
尤其是在内存受限的容器中。

子进程仅继承解析后的 `DATA_DIR`、`NODE_ENV`、显式的 `TZ`（用于旧版文件名的本地时间解析）、
存在时的 `ELECTRON_RUN_AS_NODE`，以及以下出站输入：
`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY`（及其小写形式）、
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`、`NODE_EXTRA_CA_CERTS`、`SSL_CERT_FILE`、`SSL_CERT_DIR`。
全局 Undici 调度程序共享服务器的纯环境代理解析和本地主机绕过规则，包括 `NO_PROXY`；
它不会导入 `proxyFetch.ts` 或其数据库/功能标志。转发的输出和记录的错误中会隐去代理凭据。
目标凭据仅通过一条启动 IPC 消息传输，绝不会出现在 argv 或环境变量中；输出/错误转发
会添加前缀并进行清理。子进程执行参数中仅禁用 `ExperimentalWarning`，以避免每次 cron
运行时重复显示 Node 的 SQLite 警告；其他类型的警告仍然可见。

目标模块必须可在不依赖 Next.js/仅服务器端依赖项的情况下导入。现有的
BigQuery 实现已经满足该约定。访问令牌缓存仅在子进程单次
运行期间有效，不会跨运行保留。Node 是受支持的运行时（见 `package.json` 中的 engines），但 README 的 Bun
安装章节和 `Dockerfile.bun` 也声明了使用
`bun:sqlite`（`src/lib/db/core.ts` / 适配器）的生产环境兼容路径。因此，在 Bun 下，导出会保留之前的
进程内路径，并发出一次性警告：无法提供子进程堆内存/超时隔离。请使用
Node 实现事件循环和 OOM 隔离；此处不将 Bun 视为仅用于开发环境。

启用 `includeBodies` 时，建议采用分钟级执行频率，例如
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`，而不是累积每小时的有效负载积压。
批次和行数限制仍会约束每次运行。每个目标在每次运行时都会产生进程启动开销；
这是以少量启动成本换取服务器事件循环隔离，而不是减少总 CPU 使用量。

### 有效负载（提示词和补全内容）

默认情况下，导出仅包含 Logs **列表**中显示的摘要字段。启用
**导出提示词和响应**（`includeBodies`）后，还会传输 Logs **详情**
窗格中为每次调用显示的内容：

| 字段                             | 所含内容                                  |
| -------------------------------- | ----------------------------------------- |
| `request_body` / `response_body` | 调用的有效负载，与仪表板呈现的内容一致    |
| `pipeline_route_decision`        | 路由器选择的目标和模型                    |
| `pipeline_client_request`        | 客户端发送的原始请求，保持完全一致        |
| `pipeline_openai_request`        | 转换为内部 OpenAI 格式后的请求            |
| `pipeline_provider_request`      | 实际发送到上游的请求，使用提供者方言      |
| `pipeline_provider_response`     | 原始上游响应                              |
| `pipeline_client_response`       | 返回给调用方的内容                        |
| `pipeline_error`                 | 调用失败时的管线级错误详情                |
| `bodies_truncated`               | 上述任一字段达到 `maxBodyBytes` 时为 True |

这些是提示词内容，因此**默认关闭**，并且刻意设计为由每个目标单独选择。
传输的内容与仪表板显示的内容一致，因为导出和 `getCallLogById` 共用详情
解析逻辑：有效负载在写入时
已经过 PII 清理和密钥脱敏处理，而使用
`noLog` API 密钥发起的调用根本不会存储任何有效负载，因此没有可供导出的内容。

有效负载按行从文件系统构件中读取，因此仅对请求了有效负载的目标执行数据填充。
如果构件缺失或损坏，则会导出其摘要并将有效负载设为 null，而不会导致批次失败并使游标停滞。

`maxBodyBytes`（默认为 262144）会限制每个字段的大小。较长的有效负载会被**截断而不是
丢弃**——被裁剪的提示词仍能回答“提出了什么问题”——并且该行会使用
`bodies_truncated` 标记。不会导出逐块流式传输的增量；组装后的响应已位于
`pipeline_provider_response` 和 `pipeline_client_response` 中。

---

## 2. 文件

| 组件                 | 位置                                         |
| -------------------- | -------------------------------------------- |
| 目标端契约           | `src/lib/logExport/types.ts`                 |
| 注册表               | `src/lib/logExport/registry.ts`              |
| 密钥处理             | `src/lib/logExport/secrets.ts`               |
| 运行器（父进程 IPC） | `src/lib/logExport/runner.ts`                |
| 进程生命周期         | `src/lib/logExport/childRunner.ts`           |
| 子进程入口           | `src/lib/logExport/exportChild.ts`           |
| 只读打开器           | `src/lib/db/logExportReadOnly.ts`            |
| 共享查询/映射        | `src/lib/usage/callLogExportQueries.ts`      |
| 详细信息解析器       | `src/lib/usage/callLogDetailResolver.ts`     |
| API 投影             | `src/lib/logExport/presenter.ts`             |
| BigQuery 目标端      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA 身份验证   | `src/lib/logExport/googleServiceAccount.ts`  |
| 调用日志源           | `src/lib/usage/callLogExportSource.ts`       |
| 持久化               | `src/lib/db/logExportDestinations.ts`        |
| Cron 作业            | `src/lib/jobs/logExportJob.ts`               |
| REST 层              | `src/app/api/log-export/`                    |
| 仪表板页面           | `src/app/(dashboard)/dashboard/log-export/`  |

架构：`src/lib/db/migrations/170_log_export_destinations.sql`。

---

## 3. REST API

所有路由均需要管理身份验证（`requireManagementAuth`）。密钥绝不会被返回：
存储的密钥会以字面值 `__stored__` 返回，更新时将该值原样发回会保留已存储的凭据。

创建或更新其类型声明了密钥的目标端时，**必须提供
`STORAGE_ENCRYPTION_KEY`**。如果没有该变量，`encrypt()` 会静默直通，因此写入操作会
以 400 被拒绝，而不是将凭据以明文形式写入 SQLite（这与 Telegram webhook 所采用的
防护措施相同）。

| 方法     | 路径                                     | 用途                                          |
| -------- | ---------------------------------------- | --------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | 目标端类型及其配置字段列表                    |
| `GET`    | `/api/log-export/destinations`           | 列出目标端（密钥已脱敏）                      |
| `POST`   | `/api/log-export/destinations`           | 创建目标端                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | 读取单个目标端                                |
| `PUT`    | `/api/log-export/destinations/{id}`      | 更新名称 / 启用状态 / 配置 / 批处理设置       |
| `DELETE` | `/api/log-export/destinations/{id}`      | 删除                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | 探测凭据，不写入任何内容                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 立即清空积压，使用与计划任务相同的执行路径    |
| `GET`    | `/api/log-export/status`                 | Cron 状态、最近的运行记录、各目标端的积压情况 |

`GET /api/log-export/types` 使 UI 能够保持通用：仪表板表单根据返回的字段描述符进行
渲染，因此新增目标端无需更改 UI。

---

## 4. BigQuery 目标端

配置键（`type: "bigquery"`）：

| 键                   | 说明                                        |
| -------------------- | ------------------------------------------- |
| `projectId`          | 承载数据集的 GCP 项目                       |
| `datasetId`          | `[A-Za-z0-9_]+`                             |
| `tableId`            | `[A-Za-z0-9_]+`                             |
| `location`           | 仅在必须创建数据集时使用（默认值为 `EU`）   |
| `serviceAccountJson` | 服务账号密钥。密钥：静态加密，绝不返回      |
| `autoCreate`         | 首次导出时创建数据集和表（默认值为 `true`） |

服务账号需要目标表的 `bigquery.tables.updateData` 权限；启用 `autoCreate` 时，还需要
`bigquery.datasets.create` / `bigquery.tables.create` 权限。

配置的批次是一个**游标**单位，而不是 HTTP 单位：`send()` 会将其拆分为每次最多 500 行的
insertAll 调用，因此较大的 `batch_size` 不会触发 BigQuery 的 10 MB 请求上限。
对于瞬时状态码（408/429/500/502/503/504），系统会采用指数退避策略最多重试三次，并复用
相同的 insertIds；身份验证和架构失败会在第一次尝试时直接抛出异常，而不会浪费本次运行。

刚刚创建的表不会立即对流式端点可见，该端点在几秒内会返回 404。系统会重试该 404，
但**仅限于本次运行创建了该表时**——真正缺失的表仍会快速失败。请注意，如果使用一个
最近删除的表名重新创建表，BigQuery 会在数分钟内拒绝流式插入；这是先删除再重建操作本身
的特性，因此应优先使用新的表名，而不是删除后再重新添加。

**部分失败会以 HTTP 200 和非空的 `insertErrors[]` 返回。**这种情况会被视为失败并抛出
异常，从而阻止游标越过 BigQuery 从未接受的行；`tests/unit/log-export-bigquery.test.ts`
固定了这一行为。

传输使用纯 REST——先在 `https://oauth2.googleapis.com/token` 将自签名的 RS256 断言交换为
访问令牌，然后将行发送到 `tabledata.insertAll`。不引入任何 Google SDK。访问令牌按
（服务账号、作用域）在进程内缓存。

创建的表为 Logs 选项卡中的每个字段设置一列，另外还包含 `exported_at`，并根据调用日志的
实际查询方式进行布局：

- **按 `timestamp` 进行日分区**，因此按日期限定范围的查询只会扫描对应日期。
- **按 `api_key_name`、`provider`、`model`、`status` 聚簇**（依此顺序），因此按执行者、
  请求去向或是否失败进行筛选时，可在每个分区内裁剪数据块。BigQuery 最多允许四个聚簇列，
  且顺序很重要：仅按 `api_key_name` 筛选可以进行裁剪，仅按 `status` 筛选则不能。
- **可选的分区保留期限**通过 `partitionExpirationDays` 设置（0 表示保留所有内容），并在
  创建表时应用。

这两个设置都在创建时生效。现有表会保留其已有的布局，因此，如果你想采用这些设置，请将目标指向一个新的表 ID。

`tests/unit/log-export-bigquery.test.ts` 会断言映射器与表结构始终保持同步，因此新增的调用日志列不会在导出过程中被悄然丢弃。

批次会同时按行数和序列化后的字节数进行分块。导出载荷后，仅按行数分块是不够的：500 行包含提示词的数据可能达到数十兆字节，而 insertAll 会拒绝超过 10 MB 的请求。每个分块达到 500 行或 9 MB 时即结束，以先达到者为准。

---

## 5. 添加目标

1. 创建 `src/lib/logExport/destinations/<name>.ts`，导出一个 `LogExportDestinationType`：
   包含一个 Zod `configSchema`、用于 UI 的 `fields` 描述符数组、`secretFields`，以及一个
   返回 `test()` / `prepare()` / `send(records)` 的 `createClient(config)`。
2. 将其添加到 `src/lib/logExport/registry.ts` 中的 `DESTINATIONS` 数组。
3. 在 `tests/unit/` 下编写测试。

这就是全部改动：持久化、cron 作业、REST 层、密钥加密和仪表板表单都会读取该注册表。

新目标需遵循两条规则：

- `send()` 在部分失败时**必须抛出异常**。成功返回意味着“目标中已有这些行”，
  此时游标将永久越过这些行。
- 接受用户提供 URL 的目标在发起请求前，必须通过
  `parseAndValidateWebhookUrl`（`src/shared/network/outboundUrlGuardPolicy.ts`）进行验证，
  其方式与 webhook 相同。BigQuery 不需要此验证，因为它的主机地址是常量。

---

## 6. 运维

- **仪表板**：集成 → 日志导出。添加一个目标，运行**测试**以在不写入任何行的情况下检查凭据，
  然后启用该目标。
- **积压**：每张目标卡片都会显示待处理行数和游标；`GET
/api/log-export/status` 会返回相同数据，以及最近 20 次作业运行记录。
- **某个目标失败不会导致其他目标失败**——运行摘要会在 `last_status` / `last_error` 中记录各目标的
  状态，作业运行历史则会保留汇总结果。
- **删除目标也会删除其游标。** 重新添加该目标后，将从保留的最早调用日志开始，
  这会重新发送目标中可能已存在的行。在 BigQuery 中，每行的 `insertId` 仅能在 BigQuery 自身的
  去重窗口内消除此类重复，因此应优先禁用目标，而不是删除它。
