# Monitoring & Observability Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**：OmniRoute 内置健康监控、提供者自动驾驶、配额跟踪和可观测性钩子。本指南涵盖仪表板、警报和故障排除。

**来源：**

- `src/lib/monitoring/observability.ts` — 可观测性快照
- `src/lib/monitoring/comboHealthAutopilot.ts` — 组合健康自动驾驶
- `src/lib/monitoring/providerHealthAutopilot.ts` — 提供者自动驾驶
- `src/lib/monitoring/providerHealthMatrix.ts` — 提供者健康矩阵
- `src/lib/localHealthCheck.ts` — 本地健康检查
- `src/lib/tokenHealthCheck.ts` — 令牌刷新健康状态
- `src/lib/proxyHealth.ts` — 代理健康状态缓存（详见 PROXY_GUIDE.md）

---

## 概述

OmniRoute 具有 **3 层监控**：

```
┌──────────────────────────────────────────────────────────────┐
│  第 1 层：系统健康状态（服务器级）                           │
│  ├─ localHealthCheck.ts — 数据库、端口、原生依赖项            │
│  ├─ db/healthCheck.ts — 完整性、外键、孤立产物                │
│  └─ 仪表板：/dashboard/health                                │
├──────────────────────────────────────────────────────────────┤
│  第 2 层：提供者健康状态（按提供者提供弹性保障）              │
│  ├─ providerHealthAutopilot.ts — 熔断器、冷却时间             │
│  ├─ providerHealthMatrix.ts — 按提供者/模型划分的健康评分     │
│  └─ 仪表板：/dashboard/providers                             │
├──────────────────────────────────────────────────────────────┤
│  第 3 层：实时可观测性（运行时快照）                          │
│  ├─ observability.ts — 熔断器、会话、配额                    │
│  ├─ tokenHealthCheck.ts — OAuth 令牌刷新健康状态              │
│  └─ MCP 工具：omniroute_get_health、omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## 仪表板页面

### `/dashboard/health`（系统健康状态）

顶层健康仪表板显示：

| 部分             | 显示内容                           |
| ---------------- | ---------------------------------- |
| **服务器状态**   | 运行时间、版本、端口、活动连接数   |
| **数据库**       | 连接、完整性、WAL 大小、最近迁移   |
| **提供者摘要**   | 活跃数量、健康数量、熔断器开启数量 |
| **配额监控器**   | 活动会话数、警报状态、已耗尽数量   |
| **最近错误**     | 最近 10 个错误及其堆栈跟踪         |
| **资源使用情况** | 内存、CPU、堆压力指示器            |

### `/dashboard/providers`（提供者健康状态）

按提供者显示的仪表板：

| 列       | 描述                                 |
| -------- | ------------------------------------ |
| 提供者   | 提供者 ID + 显示名称                 |
| 健康状态 | 绿色/黄色/红色状态                   |
| 熔断器   | 开启/关闭/半开启状态                 |
| 连接     | 连接数、上次刷新时间                 |
| 模型     | 可用模型、各模型的健康状态           |
| 成本     | 今日成本、7 天趋势                   |
| 错误     | 最近 24 小时错误数、最常见的错误类别 |

单击提供者可查看：

- 最近请求及延迟明细
- 各连接的健康评分
- 各模型的锁定状态
- 自动驾驶建议

### `/dashboard/quota`（配额跟踪）

对于每个 API 密钥：

- 当前使用量与限制的对比（进度条）
- 配额趋势（30 天图表）
- 下次重置时间
- 警报历史记录

### `/dashboard/combos`（组合健康状态）

按组合显示：

- 策略 + 目标
- 各目标的健康状态
- 最近的回退事件
- 成功率（24 小时、7 天、30 天）

---

## 健康检查API

OmniRoute曝光**二**HTTP健康面。对于协调器来说，它们不可互换。

| 小路                         | 目的                                                        | 重量                      | 用于                                                  |
| ---------------------------- | ----------------------------------------------------------- | ------------------------- | ----------------------------------------------------- |
| `GET /healthz`               | 生命周期liveness/readiness (`ok` / `starting` / `stopping`) | 简单（仅阶段标志）        | 库伯内斯**准备状态**;柔软的**活力**如果你必须使用HTTP |
| `GET /api/monitoring/health` | 深层系统+提供者摘要（DB、堆、目录计数等）                   | Heavy（同步DB /监控工作） | 仪表板、黑盒深度检查、 Docker的内置健康检查           |

> **笔记：**提供者健康状况矩阵、自动驾驶问题、配额监视器、代币健康状况以及`/api/monitoring/health`之外的延迟详细信息可通过**MCP工具**`observability_snapshot`或**仪表板**页面—没有专用的REST路由。

两条路线均运行于**同一节点事件循环**作为请求处理。 CPU 限制的路径（大型`GET /v1/models`目录工作、长上下文压缩/令牌计数）可能会延迟**全部**HTTP处理程序，包括`/healthz`。事件循环繁忙的≠进程死亡。更喜欢修理猪；探头调整只会减少误杀。

### 轻量级协调器探针

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok`当服务器生命周期阶段准备好时
- **503**启动或关闭期间的+ `starting` / `stopping`
- 实施： `src/app/healthz/route.ts` （无DB ping）

### 系统健康状况（深）

```bash
GET /api/monitoring/health
```

回复：

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`：探针缓存与SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth`是**内存探针缓存测量仪**，不是`provider_connections.test_status`的实时转储。 #12532之后请求路径只读取`getCachedCredentialHealthSummary()` ；后台探测器在事件循环之外刷新缓存。

| 层                 | 在哪里                                                                | 这意味着什么                                                                                                                                                              |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 探针高速缓存测量仪 | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | 最后的凭据运行状况探测结果仍保留在进程内存中。 `source`始终是`probe-cache`。                                                                                              |
| 连接失败详细信息   | `credentialHealth.failedConnections`                                  | 展示**只有当`failed > 0`** 。带有`status=error`缓存行的有界列表（`connectionId`、 `status`、清理的`lastError` / `lastErrorType`）。 `failedOmitted`在列表达到上限时设置。 |
| SQLite粘性状态     | `credentialHealth.staleDbNonOkCount`                                  | 计数**积极的**(`is_active=1`) 持久化`test_status`已知不正常的连接行（`error`、 `expired`、 `credits_exhausted`、 `banned`、 `deactivated`、 `unavailable`）。             |

两层可能故意不一致：

- 测量`failed=0`而`staleDbNonOkCount>0` — SQLite仍然具有粘性`test_status` （例如`expired`或`credits_exhausted`），最新的探针缓存快照不计为`status=error`。
- 当SQLite看起来健康时测量`failed>0` —最近的探测失败并被缓存； DB行尚未更新，或后来被清除。

抓取此端点时，不要仅针对`provider_connections.test_status`发出警报。对于实时探测失败，请使用`failed` + `failedConnections`当您需要持久的粘性状态计数时，请使用`staleDbNonOkCount` 。

### Kubernetes 探针建议

OmniRoute是一个**单节点进程**（一个事件循环）。库存Docker `HEALTHCHECK`目标是轻量级`/healthz`。 `/api/monitoring/health`是**太重了**用于 kubelet 活动间隔。

| 探测         | 推荐目标                                                          | 笔记                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **启动**     | HTTP `GET /healthz`带有长`failureThreshold` （或大`startPeriod`） | 冷启动+ SQLite迁移可能会超过几秒                                                                                                                                                                                                                                     |
| **准备状态** | HTTP `GET /healthz`                                               | 生命周期`ok` / `starting` / `stopping` （200 与 503）。如果循环被 CPU 阻塞，仍然会抖动。一个**多秒内 200 次是不健康的**(#10303) —这意味着事件循环在 3 字节处理程序运行之前就处于饥饿状态                                                                             |
| **活力**     | HTTP `GET /livez`,**或TCP**在主服务端口上（`PORT`，默认`20128`）  | `/livez`仅进程处于活动状态（如果处理程序运行，则始终为 200）。它仍然共享事件循环— busy ≠ dead，并且它不会比TCP更好地检测事件循环饥饿（#10303）。更喜欢**TCP**如果HTTP探测在catalog/compression负载下超时；做**不是**无论哪种方式，都会在短暂的事件循环停止时杀死 pod |
| **深层健康** | 来自外部检查员的`GET /api/monitoring/health`                      | 不适用于 kubelet `livenessProbe` / 紧`readinessProbe`                                                                                                                                                                                                                |

形状示例（根据冷启动和压缩负载调整阈值）：

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**不要**库贝莱特角**活力**在`/api/monitoring/health`。该路径确实可以DB/monitoring工作，并且在负载下会出现误报。

相关： [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) （事件循环繁忙时进行探测）、 [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) （目录定价猪）、 [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) （压缩令牌计数猪）。

### systemd 看门狗（冻结事件循环）

在 systemd 主机上， OmniRoute会告诉服务管理器何时准备好并持续对其执行 ping 操作，因此事件循环卡住的服务器会被终止并重新启动，而不是保持静止状态。 ping 来自服务器自己的事件循环：当它阻塞时，它们会停止，一旦`WatchdogSec`没有事件循环，systemd 就会重新启动服务。

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs)已经用它编写了一个用户单元。您自己编写的单元（默认的`Type=simple`）没有看门狗，因此将这些行添加到其`[Service]`部分：

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

生成的单元设置了`Restart=on-failure`，因此请添加该行以及—如果没有它，看门狗只会杀死卡住的服务而不是重新启动它。

- `Type=notify`：服务在服务器发送`READY=1`时“启动”，而不是在进程分叉时“启动”。 `TimeoutStartSec`限制了一个缓慢的开始。
- `NotifyAccess=all`： ping 由服务器进程发送，该进程是`omniroute serve`管理程序的子进程。
- `WatchdogSec`： ping 每 60 秒发出一次，所以使用**120 或更多**。较小的值将重新启动健康的服务器。
- 在前台运行`omniroute serve` 。 `--daemon`将服务器与设备的 cgroup 分离，并且通知握手永远不会完成。

重新启动后检查它是否处于活动状态：

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec`显示配置的延迟， `WatchdogTimestamp`每分钟向前移动一次。由看门狗引起的重启被记录为`Result=watchdog`。要关闭 ping，同时保持设备不变，请设置`OMNIROUTE_DISABLE_SD_NOTIFY=1`；如果没有`NOTIFY_SOCKET` （终端、 Docker、 Electron、 Windows），则不会发送任何内容。

看门狗仅检查事件循环是否继续运行。速度慢但仍在转动的服务器不会重新启动。

### 可选的请求路径工作（内存、技能、令牌刷新）

内存提取、技能注入、 OAuth token刷新共享**主节点事件循环**与`/healthz`。它们是仪表板切换功能（`memoryEnabled`、 `skillsEnabled`），而不是工作池。请参阅[环境—事件循环成本](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)。

### 提供者健康

> **没有REST端点。**提供者健康数据可通过MCP工具`observability_snapshot`或仪表板`/dashboard/providers`页面获得。

### 提供者详细信息

> **没有REST端点。**每个提供者的详细信息可通过仪表板`/dashboard/providers`页面获得。

---

## 提供者健康自动驾驶

`providerHealthAutopilot.ts` 模块是一个**自愈系统**，它可以：

1. 检测提供者问题（断路器开启、冷却、锁定、配额警告）
2. 生成解决问题的**建议操作**
3. 可选地**自动执行**低风险操作

### 检测到的问题类型

| 问题类型                     | 严重程度 | 示例条件                    |
| ---------------------------- | -------- | --------------------------- |
| `provider_circuit_open`      | 严重     | 失败 5 次后断路器开启       |
| `provider_circuit_half_open` | 警告     | 断路器正在测试是否已恢复    |
| `connection_cooldown`        | 警告     | 收到 429 后连接进入冷却状态 |
| `stale_connection_error`     | 警告     | 上次刷新失败已超过 30 分钟  |
| `terminal_connection_error`  | 严重     | OAuth 已撤销、密钥无效      |
| `inactive_connection`        | 信息     | 已在设置中禁用连接          |
| `model_lockout`              | 警告     | 特定模型处于隔离状态        |
| `quota_monitor_warning`      | 警告     | 配额使用率达到 80% 以上     |

### 生成的操作类型

| 操作                           | 风险 | 描述                   |
| ------------------------------ | ---- | ---------------------- |
| `clear_provider_breaker`       | 中   | 将断路器重置为关闭状态 |
| `clear_connection_cooldown`    | 低   | 解除连接的冷却状态     |
| `clear_stale_connection_error` | 低   | 清除过时的错误标志     |
| `clear_model_lockout`          | 低   | 重新启用被隔离的模型   |
| `reactivate_connection`        | 中   | 重新启用已停用的连接   |
| `deactivate_connection`        | 高   | 禁用存在问题的连接     |

### API

> **没有 REST 端点。** 自动驾驶问题可通过 MCP 工具 `observability_snapshot` 或仪表板获取。自动驾驶在内部运行；其行为通过设置数据库（每个连接的 `autopilotMode` 字段）进行配置，而不是通过环境变量配置——使用 `grep -rn` 搜索自动驾驶模式环境变量不会返回任何结果。

### 自动驾驶模式

自动驾驶默认以**手动模式**运行——它会检测问题并生成建议操作，但不会自动应用这些操作。可以通过仪表板应用操作。

---

## 组合健康自动驾驶

`comboHealthAutopilot.ts` 是提供者自动驾驶的**组合专用**版本。它可以：

- 检测不健康的组合
- 建议重新排序目标
- 建议禁用故障目标
- 在失败 N 次后自动移除失效目标

### 组合问题示例

```
组合 "always-on"（优先级策略）
├─ 目标 1：openai/gpt-5（健康）
├─ 目标 2：anthropic/claude-opus-4-6（⚠️ 模型锁定至 14:00）
└─ 目标 3：kiro/claude-sonnet-4-5（健康）

建议操作：重新排序——在锁定到期之前，将 kiro 移到 anthropic 之前
```

---

## 配额监控器

`observability.ts` 为订阅提供者（Claude Code、Codex、GitHub Copilot）公开**按会话划分的配额监控器**：

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### 状态含义

| 状态        | 出现条件         | UI 操作                      |
| ----------- | ---------------- | ---------------------------- |
| `starting`  | 正在进行初始轮询 | 显示加载指示器               |
| `idle`      | 最近没有活动     | 在仪表板中隐藏               |
| `healthy`   | 剩余配额 > 50%   | 绿色圆点                     |
| `warning`   | 剩余配额 < 50%   | 黄色警告                     |
| `exhausted` | 配额 = 0%        | 红色阻断，路由到下一个提供者 |
| `error`     | 轮询失败         | 红色圆点，尽快重试           |

### API

> **没有 REST 端点。** 配额监控器数据可通过 MCP 工具 `observability_snapshot` 或仪表板获取。

---

## 可观测性快照

MCP 工具 `observability_snapshot` 会为 AI 智能体返回一份**完整的系统快照**：

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* 见上文 */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

智能体使用此快照来作出**路由决策**——例如，“如果 openai 的熔断器处于开启状态，则优先路由至 anthropic”。

---

## 令牌健康检查

OAuth 提供者（Claude Code、GitHub Copilot、Cursor）需要**定期刷新令牌**。`src/lib/tokenHealthCheck.ts` 会运行一个后台调度器：

- **轮询周期**：每 60 秒一次（`src/lib/tokenHealthCheck.ts:30` 中的轮询配置为 `TICK_MS = 60 * 1000`）
- **每个连接的健康检查间隔**：默认为 60 分钟（`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`）；可通过设置数据库进行配置
- **发生 401 时抢先刷新**：由每个连接对应的拦截器处理

### 令牌健康状态

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### 配置

令牌健康检查配置由 `tokenHealthCheck.ts` 在内部处理。

### 令牌健康状况

> **没有 REST 端点。**令牌健康数据可通过仪表板或 MCP 工具 `observability_snapshot` 获取。

---

## 告警

### 内置渠道

OmniRoute 支持 **3 种告警渠道**：

| 渠道       | 设置     | 使用场景                  |
| ---------- | -------- | ------------------------- |
| 仪表板横幅 | 始终启用 | 应用内通知                |
| Webhook    | 配置 URL | Slack、Discord、PagerDuty |
| 日志       | 默认启用 | 用于外部日志聚合          |

### Webhook 配置

> **注意：**Webhook 告警配置通过仪表板的“设置”页面进行管理。有关 Webhook URL、事件筛选和有效负载自定义，请参阅设置界面。

### 告警类型

| 告警                         | 触发条件                          | 默认严重级别 |
| ---------------------------- | --------------------------------- | ------------ |
| `provider_circuit_open`      | 熔断器开启                        | 严重         |
| `provider_circuit_half_open` | 熔断器测试恢复情况                | 信息         |
| `quota_warning`              | 配额使用率达到 80% 及以上         | 警告         |
| `quota_exhausted`            | 配额使用率达到 100%               | 严重         |
| `token_refresh_failed`       | 连续刷新失败 3 次及以上           | 警告         |
| `token_expired`              | 令牌已过期                        | 严重         |
| `combo_target_unhealthy`     | 组合目标处于冷却状态达 1 小时以上 | 警告         |
| `db_integrity_warning`       | FK 违规数大于 0                   | 警告         |
| `heap_pressure`              | 堆使用量超过阈值的 80%            | 警告         |

---

## 性能指标

### 跟踪的指标

| 指标                    | 类型   | 来源                            |
| ----------------------- | ------ | ------------------------------- |
| `request_count`         | 计数器 | `services/usage.ts`             |
| `request_latency_ms`    | 直方图 | `services/usage.ts`             |
| `tokens_consumed`       | 计数器 | `services/usage.ts`             |
| `cost_usd`              | 计数器 | `services/usage.ts`             |
| `provider_errors`       | 计数器 | `services/errorClassifier.ts`   |
| `circuit_state_changes` | 计数器 | `services/resilience.ts`        |
| `cache_hits`            | 计数器 | `services/signatureCache.ts`    |
| `compression_savings`   | 直方图 | `services/compression/stats.ts` |
| `quota_used`            | 仪表   | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | 仪表   | `observability.ts`              |

### 延迟百分位数 (p50/p95/p99)

> **没有 REST 端点。** 延迟百分位数数据可通过仪表板的 `/dashboard/health` 页面获取。计划在 v3.9 中支持 Prometheus/OpenTelemetry 导出。

### Prometheus / OpenTelemetry 导出（第 2 阶段）

计划在 v3.9 中原生支持导出到 Prometheus、OpenTelemetry 和 Datadog。

目前，可使用任何基于 HTTP 的监控系统（Prometheus blackbox exporter、Datadog HTTP check 等）抓取 `/api/monitoring/health`。

---

## 告警配置方案

### Slack

> **注意：** Webhook 告警通过仪表板的设置页面进行配置——没有专用的 webhook 环境变量（`grep -rn` 返回零条结果）。有关 webhook URL、事件筛选和有效载荷自定义，请参阅设置界面。

### Discord

> Webhook 告警使用与 Slack 相同的设置界面流程。Discord 接受相同格式的 JSON 有效载荷。

### PagerDuty

> Webhook 告警使用相同的设置界面流程。PagerDuty Events API v2 路由密钥在设置界面中配置。

### 自定义 Webhook（JSON）

> 任何接受带 JSON 正文的 POST 请求的 HTTP 端点均可使用。请在设置界面中配置 URL。

---

## 仪表板配置

### 自定义健康状态仪表板

创建 `~/.omniroute/dashboard.json`：

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### 将提供者固定到顶部

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## 故障排除

### “提供者显示健康，但请求失败”

1. 检查 **autopilot 问题**——可能有模型被锁定
2. 查看**最近的错误**，确认具体的错误类别
3. 尝试提供者卡片中的**连接测试**
4. 检查提供者是否在**上游受到速率限制**（本地不可见）

### “配额显示健康，但我看到了 429”

- 429 表示提供者认为你的配额已用尽
- OmniRoute 的配额跟踪可能**已过时**——应以上游提供者的数据为准
- 配额数据会通过内部配额监控器自动刷新

### “组合失败，但所有目标看起来都很健康”

- 检查**组合健康状态**仪表板是否存在目标排序问题
- 查看**回退事件**——组合可能过快耗尽所有目标
- 验证所用**策略**是否符合你的使用场景（优先级、轮询或自动）

### “数据库健康检查失败”

- 运行 `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- 如果返回“ok”——这是误报，健康检查过于严格
- 如果返回任何其他内容——**停止 OmniRoute**，然后按照[灾难恢复指南](./DATABASE_GUIDE.md#disaster-recovery)操作

### “内存堆压力达到严重级别”

```bash
# 检查当前堆
node -e "console.log(process.memoryUsage())"

# 触发手动 GC（如果使用 --expose-gc）
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# 减少并发请求数（通过仪表板设置页面进行设置，而不是通过环境变量）
# 不存在 `MAX_CONCURRENT_REQUESTS` 环境变量——请在设置 → 并发中进行配置。
```

---

## 另请参阅

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用量和成本跟踪
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — 数据库架构和健康状况
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 代理健康状况（独立缓存）
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 系统架构
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 熔断器详情
- 源代码：`src/lib/monitoring/`（4 个文件，2121 行代码）
