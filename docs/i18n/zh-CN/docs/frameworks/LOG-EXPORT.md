# Log export (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

将 OmniRoute 调用日志持续、增量地导出到外部分析存储。

日志仪表板选项卡将请求历史记录保存在 SQLite（`call_logs`）中，其数据量受轮转和保留策略限制。
日志导出按计划将同一组记录发送到外部，使其能够在本地数据库之外长期保留，
并与其他数据进行关联。BigQuery 是首个目标；管道采用注册表机制，因此可以通过扩展添加更多目标。

---

## 1. 工作原理

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **调度** — 使用一个 `JobRegistry` cron 作业 `log_export`，默认表达式为 `0 * * * *`（每小时执行一次，
  UTC）。该作业在 `src/lib/initCloudSync.ts` 中注册；可通过 `OMNIROUTE_LOG_EXPORT_CRON` 覆盖。
  每次触发都会依次处理所有**已启用**目标的待导出记录。
- **游标** — 使用 SQLite 隐式的 `call_logs.rowid`，按目标持久化到
  `log_export_destinations.cursor_row_id`。这里刻意不使用 `timestamp` 作为游标：调用方
  可以提供自己的值，因此较慢的请求可能晚于一个启动更晚但完成更快的请求写入，
  而基于时间戳的游标会漏掉该请求。
- **批处理** — 每次请求处理 `batch_size` 行（默认 500），每次运行处理 `max_rows_per_run` 行
  （默认 10000），以便将大量积压数据分散到多次调度中处理，而不是阻塞某一次调度。
- **交付** — 只有在 `send()` 成功完成后，游标才会前进。批次失败时，
  游标保持不变，因此下次运行会重试相同的行。所提供的保证是
  至少一次交付加上目标端去重，而非真正的恰好一次交付：BigQuery 使用调用日志 ID 作为每行的键，
  并在自身的去重时间窗口内尽力依据该键去重。
- **重叠保护** — cron 调度和 `POST .../run` 可能同时触发。如果某个目标
  已在处理待导出记录，则会跳过它，而不会重复处理（运行结果中包含 `skipped: true`），
  因此并发运行不会重新发送批次，也不会将游标写回更早的位置。
- **清空恢复** — 如果 `cursor_row_id` 超过了 `MAX(rowid)`（整张表已被
  清空，且 rowid 重新开始计数），运行器会将游标重置为 0，而不是永久漏读后续记录。

### 隔离运行器与限制

在 Node 上，每个目标的运行都会启动一个独立、短生命周期的操作系统子进程（使用带 IPC 的 `child_process`，
而非 `worker_threads`）。正文读取、载荷 JSON 解析/序列化、目标的
`prepare()` 以及目标网络 I/O 都在该子进程中执行，而不在服务器的事件循环中执行。
只有配置和少量进度消息通过 IPC 传递；导出的记录从不返回
服务器。cron 作业和“立即运行”路由保留相同的公开结果和重叠保护机制。

子进程使用 `node:sqlite` 以只读方式打开服务器解析后的 `DATA_DIR/storage.sqlite`，
并设置 `busy_timeout=5000` 和 `query_only=ON`。它不导入任何数据库单例，也不执行
迁移、备份或 SQLite 更新。缺失/损坏产物的状态记录处理（包括对
损坏产物执行的 UPDATE）仍仅在仪表板详情路径中进行。两条路径共享一个纯
详情解析器；导出使用异步文件系统读取，并遵循相同的解析顺序：产物 → 旧版
内联数据 → 旧版磁盘数据 → 无。子进程打开读取器时，每次运行都会对最大插入 rowid
创建快照；之后插入的数据留待下次运行处理。这是插入
边界，而不是长期持有的 SQLite 事务：在网络等待期间，WAL 写入和检查点操作仍可正常进行。
此边界不会冻结对现有行的更新/删除。

每个批次被接受后，子进程都会等待确认。服务器先使用 `advanceLogExportCursor`
持久化游标，然后发送 `ack`；在此之前不会开始下一个批次。
发送失败、崩溃或超时都会记录为失败，且不会推进该批次的游标。此前
已确认的批次保持已提交状态；最多只有一个尚未确认的批次可能被重新发送。
只有收到 `done` 且子进程正常退出后，才会记录成功。发生失败时，会使用 SIGTERM 终止子进程，
500 ms 后若仍未退出，则升级为 SIGKILL，运行器会等待进程关闭。

| 环境变量                                      | 默认值 | 用途                                |
| --------------------------------------------- | ------ | ----------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | 每个目标的实际运行时间上限          |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | 子进程 V8 老生代空间上限，单位为 MB |

无效、非正数或非整数值将使用默认值。堆设置并非总
RSS 上限；过大的批次仍可能耗尽子进程内存，并使本次运行安全失败。
默认的 1024 MB 为启用正文时、由 500 行各含 512 KiB 产物组成的默认批次预留了余量，
其中也包括 BigQuery 按字节分块的 JSON 序列化开销。但这并不意味着
包含正文的 10000 行批次就能安全运行。V8 堆耗尽会记录一条附带处理建议的失败信息：减小批次
大小，或增大 `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`；游标会停留在最后一个
已确认批次的位置。历史内联/磁盘正文不受现代产物大小上限的约束。
运维人员必须单独规划 RSS 预算，尤其是在内存受限的容器中。

子进程仅继承解析后的 `DATA_DIR`、`NODE_ENV`、显式设置的 `TZ`（用于旧版文件名的
本地时间解析）、存在时的 `ELECTRON_RUN_AS_NODE`，以及以下出站配置：
`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY`（及其小写形式）、
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`、`NODE_EXTRA_CA_CERTS`、`SSL_CERT_FILE`、`SSL_CERT_DIR`。
全局 Undici dispatcher 与服务器共享完全基于环境变量的代理解析逻辑和本地主机
绕过规则，包括 `NO_PROXY`；它不导入 `proxyFetch.ts`，也不使用其数据库/功能开关。
转发的输出和记录的错误中的代理凭据会被脱敏。目标端凭据
仅通过一条启动 IPC 消息传递，绝不通过 argv 或环境变量传递；转发的输出/错误均会
添加前缀并进行清理。子进程执行参数中仅禁用 `ExperimentalWarning`，以避免
每次 cron 运行时重复显示 Node 的 SQLite 警告；其他类型的警告仍然可见。

目标端模块必须能够在不依赖 Next.js/server-only 依赖项的情况下导入。现有的
BigQuery 实现已满足这一约定。访问令牌缓存仅在本次子进程
运行期间有效，不会跨运行保留。Node 是受支持的运行时（见 `package.json` 的 engines），但 README 的 Bun
安装章节和 `Dockerfile.bun` 也提供了使用
`bun:sqlite`（`src/lib/db/core.ts` / 适配器）的生产环境兼容方案。因此，在 Bun 下，导出仍保留原有的
进程内执行路径，并发出一次性警告：子进程堆内存/超时隔离不可用。如需
事件循环和 OOM 隔离，请使用 Node；此处并不将 Bun 视为仅限开发使用的运行时。

启用 `includeBodies` 时，建议采用分钟级的执行频率，例如
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`，而不是积累一小时的载荷后再处理。
每次运行仍受批次和行数限制。每个目标端的每次运行都会产生进程启动开销；
这是以少量启动成本换取服务器事件循环隔离，而非降低总 CPU 使用量。

### 载荷（提示词和补全内容）

默认情况下，导出仅包含日志**列表**中显示的摘要字段。开启
**导出提示词和响应**（`includeBodies`）后，还会导出日志**详情**
面板中显示的每次调用的以下内容：

| 字段                             | 包含的内容                                    |
| -------------------------------- | --------------------------------------------- |
| `request_body` / `response_body` | 仪表板中呈现的调用载荷                        |
| `pipeline_route_decision`        | 路由器选择的目标和模型                        |
| `pipeline_client_request`        | 客户端发送的原始请求，保持原样                |
| `pipeline_openai_request`        | 转换为内部 OpenAI 格式后的请求                |
| `pipeline_provider_request`      | 实际发送到上游的请求，采用提供者格式          |
| `pipeline_provider_response`     | 原始上游响应                                  |
| `pipeline_client_response`       | 返回给调用方的内容                            |
| `pipeline_error`                 | 调用失败时的流水线级错误详情                  |
| `bodies_truncated`               | 上述任一字段达到 `maxBodyBytes` 限制时为 True |

这些属于提示词内容，因此**默认关闭**，并且特意设计为按目标端单独选择。
导出的内容与仪表板显示的内容一致，因为导出与 `getCallLogById` 共用详情
解析逻辑：载荷在
写入时就已经过个人身份信息（PII）清理和密钥脱敏，而使用
`noLog` API 密钥发起的调用完全不存储载荷，因此没有任何载荷可供导出。

载荷按行从文件系统中的产物读取，因此仅对
请求包含载荷的目标端执行数据补全。产物缺失或损坏时，会导出摘要并将载荷设为 null，
而不是让整个批次失败并导致游标停滞。

`maxBodyBytes`（默认值为 262144）限制每个字段的大小。较长的载荷会被**截断而非
丢弃**——截断后的提示词仍能说明“用户问了什么”——且该行会通过
`bodies_truncated` 标记。不会导出流式传输中逐块产生的增量；组装完成的响应
已包含在 `pipeline_provider_response` 和 `pipeline_client_response` 中。

---

## 2. 文件

| 组件                 | 位置                                         |
| -------------------- | -------------------------------------------- |
| 目标端契约           | `src/lib/logExport/types.ts`                 |
| 注册表               | `src/lib/logExport/registry.ts`              |
| 密钥处理             | `src/lib/logExport/secrets.ts`               |
| 执行器（父进程 IPC） | `src/lib/logExport/runner.ts`                |
| 进程生命周期         | `src/lib/logExport/childRunner.ts`           |
| 子进程入口           | `src/lib/logExport/exportChild.ts`           |
| 只读打开器           | `src/lib/db/logExportReadOnly.ts`            |
| 共享查询/映射        | `src/lib/usage/callLogExportQueries.ts`      |
| 详情解析器           | `src/lib/usage/callLogDetailResolver.ts`     |
| API 投影             | `src/lib/logExport/presenter.ts`             |
| BigQuery 目标端      | `src/lib/logExport/destinations/bigquery.ts` |
| Google 服务账号认证  | `src/lib/logExport/googleServiceAccount.ts`  |
| 调用日志数据源       | `src/lib/usage/callLogExportSource.ts`       |
| 持久化               | `src/lib/db/logExportDestinations.ts`        |
| Cron 任务            | `src/lib/jobs/logExportJob.ts`               |
| REST 层              | `src/app/api/log-export/`                    |
| 仪表盘页面           | `src/app/(dashboard)/dashboard/log-export/`  |

数据库结构：`src/lib/db/migrations/170_log_export_destinations.sql`。

---

## 3. REST API

所有路由均需通过管理身份验证（`requireManagementAuth`）。绝不返回密钥：
已存储的密钥会以字面值 `__stored__` 返回，在更新时回传该值
会保留已存储的凭据。

创建或更新其类型声明了密钥的目标端时，**必须提供
`STORAGE_ENCRYPTION_KEY`**。若未提供，`encrypt()` 会静默地原样返回输入，因此会以 400 状态码
拒绝写入，而不是将凭据以明文形式存入 SQLite（Telegram webhook
采用了相同的保护措施）。

| 方法     | 路径                                     | 用途                                       |
| -------- | ---------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | 目标端类型及其配置字段列表                 |
| `GET`    | `/api/log-export/destinations`           | 列出目标端（密钥已脱敏）                   |
| `POST`   | `/api/log-export/destinations`           | 创建目标端                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | 读取单个目标端                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | 更新名称 / 启用状态 / 配置 / 批处理设置    |
| `DELETE` | `/api/log-export/destinations/{id}`      | 删除                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | 验证凭据，不写入任何数据                   |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 立即处理完积压数据，执行路径与定时运行相同 |
| `GET`    | `/api/log-export/status`                 | Cron 状态、近期运行记录、各目标端的积压量  |

`GET /api/log-export/types` 使 UI 具备通用性：仪表盘表单根据
返回的字段描述符渲染，因此新增目标端无需更改 UI。

---

## 4. BigQuery 目标端

配置键（`type: "bigquery"`）：

| 键                   | 说明                                                 |
| -------------------- | ---------------------------------------------------- |
| `projectId`          | 数据集所在的 GCP 项目                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                      |
| `location`           | 仅在需要创建数据集时使用（默认值为 `EU`）            |
| `serviceAccountJson` | 服务账号密钥。属于机密信息：静态存储时加密，绝不返回 |
| `autoCreate`         | 首次导出时创建数据集和表（默认值为 `true`）          |

服务账号需要拥有目标表的 `bigquery.tables.updateData` 权限；
启用 `autoCreate` 时，还需要 `bigquery.datasets.create` / `bigquery.tables.create` 权限。

配置的批次是**游标**单位，而不是 HTTP 请求单位：`send()` 会将其拆分为每次最多 500 行的 insertAll
调用，因此较大的 `batch_size` 不会触发 BigQuery 的 10 MB 请求大小上限。
对于临时状态码（408/429/500/502/503/504），会采用指数退避策略最多重试三次，
并复用相同的 insertIds；身份验证和架构错误则会在首次尝试时直接抛出，
避免在本次运行中徒劳重试。

刚创建的表尚未对流式写入端点可见，该端点会在几秒内返回
404。系统会重试此类 404，但**仅当该表是在本次运行中创建时**才会重试 —
如果表确实不存在，仍会快速失败。请注意，使用最近删除的表名重新创建表，
会导致 BigQuery 在数分钟内拒绝流式插入；这是先删除再重建操作的固有特性，
因此应优先使用新的表名，而不是删除后再添加同名表。

**部分失败会以 HTTP 200 响应返回，并包含非空的 `insertErrors[]`。** 系统会将其视为
失败并抛出异常，从而阻止游标越过 BigQuery 从未接收的行；
`tests/unit/log-export-bigquery.test.ts` 通过测试固定了这一行为。

传输使用纯 REST — 先在
`https://oauth2.googleapis.com/token` 用自签名的 RS256 断言换取访问令牌，再将行发送到 `tabledata.insertAll`。
不会引入 Google SDK。访问令牌按（服务账号，作用域）组合缓存在进程内。

创建的表为“日志”选项卡中的每个字段各设置一列，另加 `exported_at`，并根据
调用日志的实际查询方式进行布局：

- **按 `timestamp` 进行每日分区**，因此限定日期范围的查询只会扫描这些日期的数据。
- **按 `api_key_name`、`provider`、`model`、`status` 聚簇**（顺序如上），因此按
  调用方、请求去向或是否失败进行筛选时，可以裁剪每个分区内的数据块。BigQuery
  最多允许四个聚簇列，且顺序很重要：仅按 `api_key_name` 筛选
  可以裁剪数据块，仅按 `status` 筛选则不能。
- **可选的分区保留期限**，通过 `partitionExpirationDays` 设置（0 表示保留所有数据），
  在创建表时应用。

分区和聚簇这两项设置均在创建时应用。现有表会保留其原有布局，因此
如果要采用这些设置，请将目标端指向新的表 ID。

`tests/unit/log-export-bigquery.test.ts` 会断言映射器和表架构始终
保持同步，确保新增的调用日志列不会在导出过程中被静默丢弃。

批次会**同时**根据行数和序列化后的字节数拆分为块。导出包含负载的数据后，仅限制行数并不足够：
携带提示词的 500 行数据可能达到数十兆字节，而 insertAll
会拒绝超过 10 MB 的请求。每个块在达到 500 行或 9 MB 时结束，以先达到的限制为准。

---

## 5. OTLP/HTTP 追踪目标

配置使用 `type: "otlp-http"`。这是对已持久化调用日志进行的定时、基于游标的导出，
而不是 `open-sse/services/routing/otel.ts` 中尽力而为的实时路由事件接收器。
它不会读取或更改该接收器的环境变量、定时器或缓冲区。同时启用两者可能会产生两种独立的跨度；
可使用 `omniroute.log-export` 插桩作用域来区分这些调用日志跨度。

| 键                       | 默认值 / 用途                                           |
| ------------------------ | ------------------------------------------------------- |
| `endpoint`               | 必填的完整 HTTP(S) 追踪 URL；不会追加 `/v1/traces` 后缀 |
| `headers`                | 可选的 `Name: value` 行或字符串值 JSON 对象；加密存储   |
| `requestHeaderAllowlist` | 默认为空（关闭）；要捕获为跨度属性的客户端标头名称/前缀 |
| `serviceName`            | `omniroute`；资源属性 `service.name`                    |
| `langfuseMapping`        | `false`；添加 Langfuse 生成/会话/用户属性               |
| `identity`               | `pseudonymous`、`keyName` 或 `none`                     |
| `paths`                  | `/v1/chat/completions`、`/v1/responses`、`/v1/messages` |
| `timeoutMs`              | 每次 HTTP 尝试为 `30000`                                |
| `environment`            | 未设置；可选的 `langfuse.environment`                   |

通用仪表板会呈现这些字段。`paths` 接受 API 数组，或在文本区域中以换行符/逗号分隔的
精确路径。除非明确允许，否则会跳过嵌入、重排序及其他路径。跳过的行仍会推进游标；现有
运行器的 `exported`/`exportedTotal` 计数器统计的是已处理的源数据行（包括被过滤的
行），而不是被接受的跨度。过滤在子进程中完成，不会改变其
IPC/游标契约。

URL 验证使用 `src/shared/network/outboundUrlGuard.ts` 中无需访问数据库的
`parseAndValidateNonMetadataUrl` 辅助函数，采用 `block-metadata` 策略。它与允许私有 URL 的
webhook 验证器一样，会无条件检查元数据地址、协议及内嵌凭据，
但特意允许 localhost/LAN 目标，无需通过全局
功能开关覆盖。这使其支持自托管的 Langfuse、Phoenix、Tempo 和 Collector
端点，包括私有 HTTP 端点。云元数据主机始终会被阻止。
不会跟随重定向，因此收集器无法将凭据重定向到其他主机。
与现有的词法 URL 防护机制一样，此机制不会固定 DNS 解析结果；请仅配置
由运营方控制的主机。如果端点不在可信网络上，请优先使用 HTTPS。

### 载荷与投递

OTLP/HTTP JSON（`ExportTraceServiceRequest`、`Content-Type: application/json`）为每个
获准导出的行携带一个 CLIENT 跨度，并以其精确的请求路径命名。基于路径的命名可区分
Chat Completions、Responses 和 Messages，而不在跨度名称中嵌入模型或身份数据。
资源属性包括 `service.name` 和软件包的 `service.version`。

常规聊天尝试日志记录器（`open-sse/handlers/chatCore/attemptLogging.ts`）在完成时写入
`duration = Date.now() - startTime`，但不提供时间戳；
`src/lib/usage/callLogs.ts` 中的 `saveCallLogOperation` 默认将时间戳设为写入
（完成）时间。因此，导出时将结束时间设为行时间戳，将开始时间设为结束时间减去持续时间
（以毫秒计，转换为十进制纳秒）。调用方提供的历史时间戳
也会保留为结束时间；没有逐行区分开始时间/完成时间的标识。
持续时间为 null 时按零处理。无效或缺失的时间戳会导致整个批次失败，而不是创建
不确定的跨度。`ttftMs` 可为 null，并映射到 `omniroute.ttft_ms`。

属性包括 `gen_ai.operation.name="chat"`、提供者、请求/响应模型、
输入/输出令牌数、可选的缓存读取/缓存创建/推理令牌数、HTTP 状态、
组合、缓存来源、会话标签和关联 ID。OTLP 整数值和时间戳
使用十进制字符串；字符串、布尔值和小数使用各自原生的 OTLP 值
变体。错误跨度具有 ERROR 状态和经过脱敏处理的状态消息。规范
记录中没有上游主机 URL，因此会省略 `server.address`，而不是错误地
将收集器标识为模型服务器。不导出费用。

只有 `includeBodies=true` 时才会补全内容。当 `langfuseMapping=false` 时，
`gen_ai.input.messages` / `gen_ai.output.messages` 承载 OmniRoute 存储的、经过脱敏处理的请求/响应
正文 JSON（可解析时会进行规范化），而不是重新构造的语义约定
消息数组。被截断或非 JSON 的正文会保留为原始文本。当 `langfuseMapping=true` 时，
正文仅作为 `langfuse.observation.input` / `langfuse.observation.output` 发出；
会省略 `gen_ai.*.messages` 属性，确保每个正文只发送一次。两种模式
均沿用现有内容补全流程中的 `maxBodyBytes`；
`omniroute.bodies_truncated=true` 用于标记截断。
此目标不会添加额外的流水线快照，也不会读取未经脱敏的产物；
可选的请求标头捕获使用下文所述的现有已补全客户端快照。
导出正文时，请使用分钟级调度频率，例如 `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`，
避免积累一小时的待处理数据。

### 可选的客户端请求标头

标头捕获**默认关闭**。在目标配置中设置 `requestHeaderAllowlist`，
并启用**导出提示词和响应**（目标上的 `includeBodies: true`）。
允许列表接受 API 数组，或在文本区域中以换行符/逗号分隔的名称：

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

名称匹配不区分大小写且必须完全一致，除非末尾的单个 `*` 用于选择非空的
请求头名称前缀。不接受单独的 `*`、嵌入式通配符和无效的 HTTP 请求头名称。
最多可配置 64 个选择器，每个名称/前缀最多为 256 个 ASCII 字节。
此设置独立于 `headers`，后者用于导出器向收集器进行身份验证。

捕获仅读取 `pipeline_client_request`，其内容来自已保存的详细流水线中的
`clientRawRequest`（或旧版 `clientRequest`）。它绝不会回退到提供者请求头。
记录请求时必须已启用详细流水线日志。如果
禁用了 `includeBodies`，或者客户端快照 JSON 缺失、损坏或被截断，则不会输出任何请求头
属性。增大 `maxBodyBytes` 可以避免导出时快照被截断；
但无法恢复从未保存过的详细信息。超过 1 MiB 或包含超过
256 个请求头条目的快照会被忽略。现有的提示词/响应导出在
捕获请求头时仍保持启用；此允许列表不提供仅加载请求头的模式。

选中的值会转换为 `http.request.header.<full lowercase header name>` OTLP 字符串数组，
即使只有一个字符串也是如此。例如，`X-OmniRoute-Meta-Team: example-team` 会转换为
`http.request.header.x-omniroute-meta-team`，其值为
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`。
完整前缀会被保留：这些都是普通请求头，不进行业务字段解析，也不执行
`omniroute.metadata.*` / Langfuse 元数据转换。`langfuseMapping` 不会改变请求头的
语义。选中的单值 `User-Agent` 还会设置标准标量属性
`user_agent.original`。同一个值中的逗号不会用于拆分。大小写不同的变体会按已保存
条目的顺序合并；任何无效变体都会导致整个请求头被省略。属性按小写名称排序。

Authorization、Proxy-Authorization、Cookie、Set-Cookie、API 密钥请求头，名称中包含
auth/token/secret/password/credential 标记的请求头，以及内部网关凭据，始终
被排除，即使它们已被选中或在存储中被部分掩码处理也是如此。已知凭据模式复用
共享的凭据检测器；脱敏标记会被省略，而不会作为安全值导出。
仅接受字符串和非空字符串数组；不会对数字或对象进行强制类型转换。
无效名称、原型键、控制字符（水平制表符除外）和格式错误的 Unicode
会被忽略，不会导致批次失败，也不会在错误中回显其内容。

每个 span 最多捕获 32 个请求头，每个请求头最多 16 个值，每个值最多 4096 个 UTF-8 字节，
且捕获的请求头名称和值的 UTF-8 字节总数最多为 16384。超限或无效的请求头
会被整体省略，而不是截断。选择哪些请求头属于运营人员的隐私决策：看似安全的名称
仍可能包含个人数据，这些限制和检测器并不是通用的个人身份信息（PII）清理工具。

### 交付限制

每个请求最多包含 500 个 span，UTF-8 JSON 大小最多为 4 MiB，包含封装结构。
在发送游标批次的第一个请求之前，会检查每个允许导出的 span 的大小。如果单个
span 超过限制，则不会发送该批次的任何部分，并会报错，提示调低
`maxBodyBytes`；不会将其静默丢弃。预检仅保留记录引用和
字节数，并丢弃每个临时 span/JSON；发送有大小限制的分块时会重新构建 span，
而不是在内存中保留批次的第二份序列化副本。对于 HTTP 408/429/5xx、网络故障和超时，最多
尝试三次，采用 250/500 ms 的指数退避。`Retry-After` 指定的秒数或 HTTP 日期
可将延迟延长至最多 5 秒。其他状态码会立即导致失败。OTLP 2xx 部分拒绝也会抛出错误，而不是
确认已丢失的 span；接受空响应或有效 JSON 确认响应，
响应读取上限为 64 KiB。

错误仅包含导出器自身掌握的信息：HTTP 状态、重试类别、尝试次数和已发送的 span
数量，或固定的确认响应/网络故障描述。收集器响应体、
部分成功计数和响应头绝不会被复制到错误、日志或
仪表板中。失败或部分接受的批次不会被确认为成功：目标会显示
失败及对应状态，游标保持在最后一个已确认的批次，下次运行
会重新发送相同的行。永久性错误状态会持续导致失败，直到收集器或配置
得到修复。请使用收集器自身的日志查看响应详情。调用日志错误摘要保留
其独立的脱敏处理。
`prepare()` 不会预配任何资源；测试操作仅发送 `{"resourceSpans":[]}`，并报告
HTTP 状态，不会写入调用日志 span。

Trace ID 和 span ID 分别是对
`"omniroute.trace\\0" + callLogId` 和 `"omniroute.span\\0" + callLogId` 计算 SHA-256 后得到的前 32/16 个十六进制数字。重新发送时使用
相同的 ID。这并不保证去重：某些后端，包括 Langfuse
v4 数据接收端，不会对相同 ID 的 span 去重。崩溃或部分分块失败最多会导致
重新发送一个尚未确认的游标批次；整个批次都可能重复，
而不仅仅是最后一个 HTTP 分块。选择游标批次大小时，请考虑这一权衡。

### Langfuse 示例

为自托管的 Langfuse 实例配置以下字段：

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

在本地将字面字符串 `public-key:secret-key` 进行 Base64 编码，以构建 Authorization 值
（例如使用 `Buffer.from(publicKey + ":" + secretKey).toString("base64")`）。
不要将真实凭据粘贴到日志、截图或问题报告中。此映射会自动
设置 `x-langfuse-ingestion-version: 4`；Authorization 仍通过 `headers` 提供。
请求头和生成的身份盐值均使用现有的加密敏感字段
机制及 API 占位符；必须设置 `STORAGE_ENCRYPTION_KEY`。

映射会添加生成类型/模型、JSON 用量详情（输入/输出/总量及可用的缓存键）、JSON 输入/输出快照、ERROR/DEFAULT 级别、经过脱敏处理的状态消息、跟踪名称、会话 ID、可选的环境，以及可用于筛选的
`langfuse.observation.metadata.<key>`，用于记录提供者、请求的模型、路径、组合、缓存来源和状态。仅当 TTFT 已知且位于持续时间范围内时，才会将 `langfuse.observation.completion_start_time` 设置为开始时间 + TTFT，以 ISO 8601 格式表示。不发送任何成本属性。

身份模式适用于 `langfuse.user.id`：

- `pseudonymous`（默认）：使用每个目标独有的随机 32 字节盐值，对 API 密钥的内部 ID 进行 HMAC-SHA256 计算。如果创建时未提供盐值，则会自动生成，并以 `identitySalt` 的形式加密存储，永不返回，且在编辑时保留。原始密钥 ID 绝不会放入 span 属性中。重新创建/轮换目标的盐值会改变身份标识。
- `keyName`：配置的 API 密钥名称，会有意暴露该操作员标签。
- `none`：不提供用户 ID。如果存在会话标签，仍会将其导出；这些模式不会对任意提示词内容或操作员提供的会话/关联标签进行匿名化处理。

### 启动时不回填历史数据

仅在创建时，启用 **从当前位置开始（跳过现有日志）**，或在创建 API 的请求体顶层传入
`startFromCurrentPosition: true`。它会使用现有的游标辅助函数，将
`cursor_row_id` 初始化为当前保留的调用日志中的最大 rowid，无需迁移。默认值为 false（游标为 0，并回填保留的历史数据）。
它不是用于在更新时重置游标的设置。

共享的 `ttftMs` 新增功能还会在 BigQuery 映射器和新表架构中添加一个可为空的 `ttft_ms` 列：其架构测试要求每个规范记录字段都有对应的列。现有表的导出行为保持不变：`prepare()` 会读取表架构，仅在缺少 `ttft_ms` 列时省略该字段。添加可为空的 INT64 列，即可在下次运行时获取 TTFT，或者使用新表。无需 PATCH、自动架构变更或额外权限；所有其他行字段仍保留严格的架构检查。

---

## 6. 添加目标

1. 创建 `src/lib/logExport/destinations/<name>.ts`，导出一个 `LogExportDestinationType`：
   包含 Zod `configSchema`、用于 UI 的 `fields` 描述符数组、`secretFields`，以及
   返回 `test()` / `prepare()` / `send(records)` 的 `createClient(config)`。
2. 将其添加到 `src/lib/logExport/registry.ts` 中的 `DESTINATIONS` 数组。
3. 在 `tests/unit/` 下编写测试。

这就是全部改动：持久化、cron 任务、REST 层、密钥加密和
仪表板表单都会读取注册表。

新目标需遵循两条规则：

- `send()` 在部分失败时**必须抛出异常**。正常完成意味着“目标已拥有这些行”，
  游标会永久越过这些行。
- 如果目标接受用户提供的 URL，则必须在发起请求之前，通过
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) 验证该 URL，
  与 webhook 的处理方式相同。BigQuery 不需要这样做：其主机地址是常量。

---

## 7. 运行与管理

- **仪表板**：集成 → 日志导出。添加目标，运行**测试**以检查凭据
  而不写入行，然后启用它。
- **积压数据**：每个目标卡片都会显示待处理行数和游标；`GET
/api/log-export/status` 返回相同的数据，以及最近 20 次任务运行记录。
- **某个目标失败不会导致其他目标失败**——运行摘要会在 `last_status` / `last_error` 中记录各目标的
  状态，任务运行历史则保留汇总信息。
- **删除目标也会删除其游标。** 重新添加后，会从保留的最早
  调用日志开始处理，从而重新发送目标可能已经拥有的行。在 BigQuery 上，每行的
  `insertId` 仅在 BigQuery 自身的去重时间窗口内才能消除这种重复，因此应优先选择禁用
  目标，而不是删除它。
