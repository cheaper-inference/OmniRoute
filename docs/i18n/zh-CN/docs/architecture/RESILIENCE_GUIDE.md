# Resilience Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute具有三种不同但相关的弹性机制。每个都有不同的范围和目的。调试路由行为时将它们分开。

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> 来源： [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **弹性切换的环境与仪表板优先级。**从环境— `QUOTA_PREFLIGHT_CUTOFF_ENABLED`、 `PROVIDER_COOLDOWN_ENABLED`、 `STREAM_RECOVERY_ENABLED`、 `STREAM_RECOVERY_MIDSTREAM_ENABLED`、 `STREAM_THROUGHPUT_WATCHDOG_ENABLED` —播种的选择加入弹性切换仅提供 *default* （`DEFAULT_RESILIENCE_SETTINGS`、 `src/lib/resilience/settings.ts`）。 `resilienceSettings`中保留了一个布尔值（仪表板→**设置→弹性**/ `PATCH /api/resilience`，存储在`key_value`中）胜过 env 值：规范化（`toBoolean`， `src/lib/resilience/settings/normalize.ts`）在存在时保留存储的布尔值。在仪表板已保存`false`部署上将这样的环境变量设置为`true`因此不会改变任何—翻转切换**设置→弹性**（或清除存储的字段）。

## 1. 提供者熔断器（Provider Circuit Breaker）

**作用范围：**整个提供者（例如 `glm`、`openai`、`anthropic`）。

**用途：**停止向上游/服务层面持续失败的提供者发送流量。

**实现：**

- 核心类：`src/shared/utils/circuitBreaker.ts`
- 接线：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 状态 API：`GET /api/monitoring/health`
- 重置 API：`POST /api/resilience/reset`
- 封装：`open-sse/services/accountFallback.ts`
- 数据库表：`domain_circuit_breakers`

**状态：**

- `CLOSED` — 允许正常流量
- `DEGRADED` — 仍允许流量，但正在跟踪升高的提供者失败次数；在取得足够多的成功、通过有效的连接测试，或在上次失败类型对应的最长 `OPEN` 保持时间（其 `cooldownByKind` 值，否则为 `resetTimeout`，× `maxBackoffMultiplier`，至少一个冷却周期）内没有出现新失败后，会回到 `CLOSED`
- `OPEN` — 提供者被临时阻断；组合路由会跳过它
- `HALF_OPEN` — 重置超时已过；允许探测请求

**可配置默认值（`open-sse/config/constants.ts`，在 Dashboard → Settings → Resilience 中公开）：**

| 类别    | 进入降级（Degraded） | 熔断（Opens） | 重置超时 |
| ------- | -------------------- | ------------- | -------- |
| OAuth   | 5 次失败             | 8 次失败      | 60s      |
| API-key | 7 次失败             | 12 次失败     | 30s      |
| Local   | 派生                 | 2 次失败      | 15s      |

`degradationThreshold` 控制提供者何时进入 `DEGRADED`；`failureThreshold` 控制其何时熔断并被跳过。Local 提供者配置文件尚未在 Resilience 设置页面中公开。

**触发条件码：**仅提供者级状态码 `[408, 500, 502, 503, 504]`。账户级错误（大多数 401/403/429——它们属于冷却或锁定范畴）**不会**触发熔断。

**惰性恢复：**当 `OPEN` 过期时，`getStatus()`、`canExecute()`、`getRetryAfterMs()` 会将状态刷新为 `HALF_OPEN`。同样的读取操作（以及下一次失败）会使过期的 `DEGRADED` 衰减回 `CLOSED`。无需后台定时器。

---

### 可选启用的全局 Provider Cooldown（窗口门控）

第四层是**可选启用**的（`PROVIDER_COOLDOWN_ENABLED`，默认**关闭**），它在
`open-sse/services/providerCooldownTracker.ts` 中保留失败提供者的
跨请求记忆，由组合目标解析逻辑查询，使连续的组合请求不再重新遍历刚刚
失败的提供者。提供者级条目遵循 `PROVIDER_PROFILES` 的窗口门控：

| 配置文件 | 触发所需次数（`providerFailureThreshold`） | 时间窗口（`providerFailureWindowMs`） | 冷却时长（`providerCooldownMs`） |
| -------- | -----------------------------------------: | ------------------------------------: | -------------------------------: |
| OAuth    |                                       `10` |                               `15min` |                           `5min` |
| API key  |                                       `15` |                               `30min` |                          `10min` |

低于阈值时，该提供者**不会**被视为冷却中；一次成功会清除该窗口。
连接级条目（`provider:connectionId`）则保留指数级的
`minRetryCooldownMs → maxRetryCooldownMs` 退避策略。覆盖配置：
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
回归防护测试：`tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 连接冷却

**范围：** 单个提供者连接/账户/密钥。

**目的：** 跳过一个有问题的密钥，同时继续为同一提供者的其他连接提供服务。

**实现：**

- 标记不可用：`src/sse/services/auth.ts::markAccountUnavailable()`
- 选择：同一文件中的 `getProviderCredentials*`
- 冷却计算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置：`src/lib/resilience/settings.ts`

**每个连接的字段：**

- `rateLimitedUntil` — 冷却到期的时间戳
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指数退避计数器

**默认冷却时间：**

- OAuth 基础值：5s
- API 密钥基础值：3s
- API 密钥 429：优先使用上游的 `Retry-After`/重置标头/可解析的重置文本
- 退避：`baseCooldownMs * 2 ** failureIndex`

**按提供者设置重试延迟。** 提供者详情页包含一个 **Retry delay** 选择框（自动、15s 至 1h）。它会将设置保存到 `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`（1–21600，通过 `PATCH /api/resilience`）。当限流错误不包含上游重试提示时，该值会替代该提供者的缩放退避时间，并将 `backoffLevel` 重置为 0（`open-sse/services/rotationConfig.ts::overrideFor`）。对于限流错误，优先级从高到低依次为：上游重试提示、每个连接的 `providerSpecificData.rotationOverrides.rateLimitResetSeconds`、按提供者设置的重试延迟、环境变量 `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`，最后是缩放后的退避时间。自动模式会移除该字段。它只影响限流原因，从不影响终止状态。

**防惊群保护：** 防止并发故障过度延长冷却时间或重复递增 `backoffLevel`。

**并发限制导致的 429 不会沿着退避阶梯递增。** 如果 `429` 的响应正文报告了并发限制（"too many concurrent requests"、"concurrency limit"、"parallel request limit"、GLM `并发数过高`），则表示账户健康但正忙。`checkFallbackError()` 返回原因 `concurrency_limited`：立即故障转移到下一个连接，将当前连接冷却固定的 `CONCURRENCY_LIMIT_COOLDOWN_MS`（1s）或使用上游重试提示，保持 `backoffLevel` 不变，并设置 `skipProviderBreaker`。显式配额正文优先级更高，因此同时匹配配额模式的正文仍会被判定为配额问题。检测函数：`src/shared/utils/classify429.ts` 中的 `looksLikeConcurrencyLimit()`；判定逻辑：`open-sse/services/accountFallback/concurrencyLimit429.ts`。`classify429()`（熔断器的 `FailureKind`）保持不变，并且对于这些正文仍读取 `rate_limit`。

**流内容停滞不会冷却账户。** 当内容停滞监视器（`open-sse/utils/streamHandler.ts`）在规定时间内未收到模型输出而放弃流时，`markAccountUnavailable()` 会在连接上记录错误，但不会设置冷却：停滞属于该请求，最常见的情况是长时间的推理过程尚未产生输出。运维人员可以通过 `resilienceSettings.streamStallCooldown.enabled` 选择启用此行为（默认 `false`）。

**用于 `p2c` 账户选择的可选延迟信号。** 每次分发的尝试都会按连接（以及连接 + 模型）记录首字节时间和结果，并保存在内存滚动窗口中：最近 15 分钟内的最后 20 个样本（`open-sse/services/connectionLatencyTracker.ts`，由 `src/sse/handlers/chatHelpers.ts` 中的 `safeLogEvents()` 记录）。当 `resilienceSettings.p2cLatency.weight` 大于 `0`（范围为 0–20，默认 `0` = 关闭）时，`src/sse/services/auth.ts` 中的 `compareP2CConnections()` 会向候选连接对中的每个候选项增加最多 `weight` 分。其中一半分数来自延迟与较快候选项的比值（速度慢两倍时获得完整的一半分数），另一半来自滚动错误率。仅当两个候选项都至少有 3 个样本时才应用该项，因此不会惩罚新账户，并且其上限仍低于配额阻止和配额耗尽惩罚。它不会自行添加熔断机制：失败账户仍由冷却、锁定和熔断器层处理。使用 `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` 设置该值。

**推理帧会重新开始内容停滞预算。** 推理模型可能需要数分钟才会生成第一个可见 token：Claude 会流式传输 `thinking_delta` 帧，其中的思考文本可能为空，而 Responses API 会连续流式传输多个推理项。`isReasoningProgressFrame()`（`open-sse/utils/streamReadiness.ts`）会识别这些帧，监视器会在每个帧到达时重新开始预算，而不是取消此次处理。它们仍不属于模型输出，因此仅以推理结束的处理仍会被报告为空，而停止推理后仅发送心跳的处理仍会触发监视器。

Kiro 的二进制 `reasoningContentEvent` 帧如果包含非空签名，会通过执行器将此推理活动保留为一个空的 `reasoning_content` 增量。签名不会被转发。元数据、不完整帧和空签名不会重新开始内容预算；独立的活动流超时和客户端取消仍然适用（`open-sse/executors/kiro/reasoning.ts`）。

**终止状态（不是冷却状态）：**

- `banned` — 由禁用关键词/账户封禁检测设置（参见 [BAN_DETECTION](../security/BAN_DETECTION.md)）。上游针对单个请求的拒绝（`request_rejected`，例如 Anthropic OAuth 403 "Request not allowed"）不会设置该状态：它们会按连接和模型分别计数，并通过不断增长的冷却时间将该模型移出轮换，冷却时间上限为 `REQUEST_REJECTED_MAX_COOLDOWN_MS`（1 h）；如果未知模型，则冷却整个连接 — `open-sse/services/requestRejectedStreak.ts`
- `expired`（在有界重试后转为终止状态 — `EXPIRED_RETRY_MAX = 3`，并采用指数退避 — 以便临时 OAuth 错误能够在账户永久停用前自行恢复）
- `credits_exhausted`

这些状态会一直保留，直到凭据发生变化或操作员重置它们。不要使用瞬时冷却状态覆盖终态。

**延迟恢复：**当 `rateLimitedUntil` 已过期后，连接会重新变为可用状态。成功使用后，`clearAccountError()` 会清除所有错误字段。

### Claude OAuth 使用上限：低优先级通道 + 会话限制重置

**范围：**一个 Claude 订阅（OAuth）连接。两项功能均可按**连接单独选择启用**（编辑连接 → Claude 部分 → 在 `providerSpecificData` 中设置 `lowPriorityMode` / `autoLimitReset`，两者默认关闭），并与 Claude Code 的 `/low-priority` 和 `/limit-reset` 命令保持一致（通信协议契约取自 Claude Code 2.1.263）。

**实现：**

- 状态机与响应分类：`open-sse/services/claudeLowPriority.ts`
- 重置状态/声明客户端：`open-sse/services/claudeLimitReset.ts`
- 执行器钩子（注入标头 + 同账户重试）：`open-sse/executors/base.ts::execute()`
- 选择启用项的持久化：`src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**触发条件：**5 小时使用上限 — 响应为 `429`，且其标头包含
`anthropic-ratelimit-unified-status: rejected`；当账户符合条件时，还包含
`anthropic-ratelimit-unified-slow-offer: treatment`。在首次达到上限的
429 之前不会发送任何内容；不带统一标头的突发 429 会进入正常冷却路径。

**低优先级通道**（`lowPriorityMode`）：

- 在达到上限的 429 上，执行器接受该选项，并立即使用同一账户重试，添加
  `anthropic-usage-limit: slow`；通道会一直保持激活，直到所公布的
  `anthropic-ratelimit-unified-reset` 时间（另加 60 秒宽限期），并且该时间窗口内的每个请求都会携带此标头。被拦截的 429 不会到达 `handleChatCore`，因此连接**不会**进入冷却状态，也不会被轮换出去。
- 后续响应中的 `anthropic-ratelimit-unified-slow-status`：`active` /
  `not_needed` 会保持通道；`slot_busy`（429）或 `529` 会等待服务器提供的
  `anthropic-ratelimit-unified-slow-retry-after`（默认 20 秒，限制在 5–600 秒范围内，并添加 ±30% 的抖动）后重试，等待时间受
  `anthropic-ratelimit-unified-slow-max-wait` 限制（默认 20 分钟，限制在
  1 分钟–6 小时范围内）——超过该时间后通道结束，并进入 10 分钟的冷却期，在此期间禁止重新接受。等待时间还会受到请求自身上游启动超时剩余时间的进一步限制（默认由 `resolveFetchStartTimeout` 设置为 10 分钟），并预留 5 秒余量：如果没有此限制，默认 20 分钟的最大等待时间会超过请求本身的生命周期，导致休眠在等待中途被中止，并暴露 `TimeoutError`，而不是正常结束为 `max_wait` 并进入冷却期。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5 小时窗口滚动，或
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`（由于付费超额用量现在可以覆盖该上限，该情况会在任何状态下以 `extra_usage` 结束通道）都会结束通道；随后响应会进入正常冷却路径。`budget_exhausted` 会一直记忆到所公布的预算重置时间（不超过 8 天）。
- 上限检查会在执行器自身由 400 驱动的单次尝试内重试之后执行（上下文编辑、思考/工作量限制、参数自动学习），因此，如果达到上限的 429 仅在其中一次重试中出现，仍会被拦截，而不会进入冷却路径。
- 状态按连接保存在内存中（重启后需要多一个达到上限的 429 才能重新接受）。

**会话限制重置**（`autoLimitReset`，两项功能同时启用时优先于通道尝试）：

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  区块；当 `arm: "reset"` 且 `available: true` 时，向
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` 发送
  `{ "program": "juniper_tide" }`（组织 UUID 来自 `providerSpecificData.organizationUUID`，并提供引导回退值）。
- `result: reset|not_limited` → 请求会以全速重试（不带慢速标头）。
  `already_used` / `not_offered` 会记忆 `next_available_at`（默认一周）；任何失败都会退避 15 分钟。重置每周一次，且仍计入每周上限。

回归保护：`tests/unit/claude-low-priority-mode.test.ts`、
`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### 自动应用存储重置

**范围：** Codex和Claude订阅 (OAuth) 连接。**选择加入**： `bankedResetAutoApply`设置关闭并默认处于`dry-run`模式（设置→ AI →自动应用分组重置）。

**目的：**当帐户达到使用限制时，银行支出会自行重置，而不是等待操作员在提供者限制页面上按“兑换”。

| 信用类型（`creditTypes`） | 赎回的是什么                   | 它运行在哪里                           |
| ------------------------- | ------------------------------ | -------------------------------------- |
| `codexCredits`            | Codex重置积分                  | 后台作业，每 60 秒                     |
| `claudeCredits`           | Claude银行赠款（`GRANT`学分）  | 后台作业，每 60 秒                     |
| `claudeSessionReset`      | Claude每周会话限制重置（上图） | 请求路径，通过与每个帐户切换相同的策略 |

**执行：**

- 纯决策（一条规则集适用于两条路径）： `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- 后台作业： `src/lib/services/bankedResetAutoApply.ts` （从`src/instrumentation-node.ts`开始）
- Claude请求路径门： `src/lib/usage/claudeSessionResetPolicy.ts`，通过`setClaudeLimitResetPolicy()`在`open-sse/services/claudeLimitReset.ts`中注册
- 历史、上限和 webhook： `src/lib/usage/bankedResetAudit.ts`
- 历史API： `GET /api/settings/banked-reset-auto/history?limit=50` （管理授权）

**决策顺序**（第一个失败规则是记录的原因）：

1. 功能关闭、信用类型关闭或账户超出范围（`accountScope` `all` / `selected`加上每个账户的`connections`地图）。
2. 在可选的UTC时间表之外（`startHourUtc` > `endHourUtc`穿过午夜）。
3. 过去 24 小时内的上限：任意两次兑换之间的`maxPerAccountPerDay` (1)、 `maxPerDay` (3) 和`minSpacingMinutes` (30)。
4. 触发器：受围墙的`session`或`weekly`窗口（从`getQuotaWindowStatus().reachedThreshold`读取，而不是`isAccountQuotaExhausted()`，后者仅报告每个窗口花费的帐户），或至少使用`expiringCreditMinUsedPercent` (50) 的帐户在`expiringCreditHours` (24) 内到期的信用。
5. 自然重置守卫：当`sessionResetGuardMinutes` （90）内的围墙5小时窗口重置或`weeklyResetGuardHours` （12）内的围墙每周窗口重置时跳过。
6. 每周下限：当每周剩余时间低于`weeklyFloorPercent` (10) 时，跳过 5 小时重置。
7. `last-resort`模式：当同一提供者的另一个范围内帐户在两个窗口中至少剩余`poolHeadroomPercent` (10) 时跳过。到期信用触发器绕过了这个。
8. `dry-run`记录了一行并且没有赎回任何东西； `last-resort`和`eager`兑换。

丢失配额数据永远无法解锁兑换：未知的重置时间或每周使用量跳过。

**Claude会话重置：**当该功能关闭或`claudeSessionReset`关闭时，每个帐户的`autoLimitReset`切换会像以前一样做出决定。启用两者后，该功能将取代每个帐户的切换：范围内的帐户仅在策略允许时才可以提出索赔，而在`dry-run`模式下则不会提出索赔。

**安全：**该作业每次蜱最多兑换一个积分，在列出积分之前决定（跳过的帐户永远不会列出），使用幂等性密钥`auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`，并在列出或兑换失败后将帐户退回 1 小时。每个兑换、失败和试运行决策都会写入`audit_log` （`action: "bankedReset.redeem"`，无代币或信用 ID）；上限是从这些行中计算的，因此它们在重新启动后仍然存在。成功兑换还会触发`provider.reset_redeemed` webhook。

回归守卫： `tests/unit/banked-reset-policy.test.ts`、 `tests/unit/banked-reset-auto-apply.test.ts`、 `tests/unit/claude-limit-reset-policy-gate.test.ts`、 `tests/unit/banked-reset-history-route.test.ts`。

### 会话亲和性 (#7274)

**范围：**将一个客户端会话（`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 标头）固定到一个连接，适用于**任何**提供者。

**目的：**让多轮代理（Claude Code、aider、自定义代理）在多个请求之间保持使用同一账户，从而减少跨账户上下文丢失，以及在具有按账户维护的会话状态的提供者上反复出现冷启动 429。

**实现：**

- TTL 解析：`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 固定连接的选择/创建：`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 标头提取（通用，适用于任何提供者）：`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 持久化固定表：`sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 设置：`sessionAffinityTtlMs`（以毫秒为单位的全局 TTL，`0` 表示禁用）— `src/lib/db/settings.ts`。通过迁移 `124_generic_session_affinity_ttl.sql`，从仅适用于 Codex 的 `codexSessionAffinityTtlMs` 重命名而来；该迁移会将此前配置的 Codex TTL 作为新的默认值沿用。

在 #7274 之前，`resolveSessionAffinityTtlMs()` 会对除 `codex` 之外的所有提供者提前返回 `0`，因此即使固定机制和标头提取已经与提供者无关，TTL 设置（以及会话标头）在其他任何地方都不起作用。此修复移除了该提前返回；全局设置为大于 `0` 后，TTL 现在会统一应用于所有提供者。

这三个会话亲和性标头绝不会转发到上游 — 执行器会从头构建自己的上游标头，而不是直接传递客户端标头，因此它始终只是一个内部关联 ID。

### 独占的托管会话连接租约

**范围：**一个活动的托管 HTTP 客户端/会话拥有一个符合条件的 OmniRoute 连接。

**目的：**为需要在请求之间设置硬路由隔离的客户端提供持久的独占连接所有权。这不同于会话亲和性，后者是一种软连续性偏好：独占租约会在 SQLite 中持久化生命周期状态，强制执行全局活动所有者唯一性和活动连接唯一性，并在提供者调度之前拒绝过期的 generation。

此功能按 API 密钥选择性启用。托管密钥必须具有 `lease:exclusive` 作用域，并且必须显式提供非空的 `allowedConnections` 列表。任何 HTTP 客户端都可以使用生命周期端点；不需要客户端名称、用户代理、提供者、OAuth 方法或模型。租约拥有的是连接而不是模型，因此模型变更会保留绑定，只要该连接仍然符合通常的条件即可。正常的模型、配额、健康状态、冷却和允许列表规则仍然具有权威性，并且可能将同一 generation 转移到另一个空闲的符合条件的连接。

生命周期通过 `POST /api/v1/session-leases` 实现，JSON 操作为 `acquire`、`renew` 和 `release`。托管推理请求会提供不透明的 `X-OmniRoute-Lease-Owner` 值和精确的 `X-OmniRoute-Lease-Generation`。所有者使用 `vlo_` 加 43 个 base64url 字符组成；系统仅存储其 SHA-256 哈希值。每个最终调度隔离还会绑定经过身份验证的 API 密钥 ID 和活动连接 ID。租约控制标头会从日志、保留的请求快照以及上游执行器标头中移除。

如果普通路由存在符合条件的托管候选连接，但所有空闲候选连接都被其他活动租约占用，OmniRoute 将返回 HTTP `429`、lease-capacity-unavailable 代码、waiting-for-capacity 状态，以及根据最早相关过期时间计算出的有界 `Retry-After`。普通的无可用候选连接不属于租约争用，并继续采用现有的路由错误语义。

相关机制仍彼此独立：

- OAuth 会话占用是针对 OAuth 账户的进程内软分配。
- 账户信号量授予请求并发许可，并在请求完成时结束。
- 独占托管会话租约是具有 generation 隔离的持久生命周期所有权。

## 3. 模型锁定

**范围：**提供者 + 连接 + 模型三元组。

**按状态确定范围：**失败状态决定锁定写入哪个键
（`open-sse/services/accountFallback/exactModelLock.ts` 中的 `resolveLockoutScope()`）：

- `429` / `403` / `402` — 配额或权益信号 — 锁定**配额族**：
  对于 codex，锁定整个 `codex` / `spark` 范围（该连接的每个
  `gpt-5*` 模型）；对于其他提供者，使用
  `getQuotaScopedModelForProvider()`。
- `404` 锁定裸模型（`getModelLockKey()` 会进一步缩小 `not_found` 范围）。
- 任何其他状态 — `5xx` 传输/服务器故障，以及 OmniRoute 在质量验证中自行
  合成的 `502` — 仅锁定**精确的**提供者/连接/模型元组。某个模型的流异常
  不能证明账户配额存在问题；在此规则之前，`codex/gpt-5.6-luna` 的一次空
  响应会将该连接的所有 `gpt-5*` 模型从路由中移除 2–30 分钟（并逐步延长），
  而其配额并未受到影响。
- 调用方显式指定的 `scope` 选项始终优先（Antigravity 传递 `"exact"`）。

**目的：**避免仅因一个模型不可用或受到配额限制，就禁用整个连接。

**示例：**

- 返回 429 的按模型配额提供者
- 对某个缺失模型返回 404 的本地提供者
- 提供者特定的模式/模型权限失败（例如 Grok 模式）

**实现：**`open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### 模型冷却时间面板（v3.8.0）

UI：设置 → 模型冷却时间（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

列出活动锁定项，包括：提供者、连接、模型、原因、expiresAt。操作员可以从卡片中手动重新启用模型。

**REST API：**

- `GET /api/resilience/model-cooldowns` — 列出活动锁定项
- `DELETE /api/resilience/model-cooldowns` — 手动重新启用。请求体：`{provider, connection, model}`。身份验证：management。

### 冷却时间管理器

UI：监控 → 冷却时间管理器（`src/app/(dashboard)/dashboard/resilience/cooldowns/`）。

为每个因临时原因退出路由的连接提供一个统一页面，无需逐个打开提供者页面。该页面列出连接冷却时间、模型锁定项和终止状态，并可按连接、按选定项或按某个提供者的所有连接清除这些状态；还可编辑最常调整的冷却规则：`streamStallCooldown.enabled` 以及 OAuth / API-key 的 `connectionCooldown` 基础冷却时间和最大退避步数（通过 `PATCH /api/resilience` 保存）。终止状态（`banned`、`expired`、`credits_exhausted`）会列出，但永远不会在此处清除。

同一页面上的**错误冷却规则**卡片通过 `PATCH /api/settings` 编辑操作员错误规则（`settings.providerErrorRules`）以及各提供者的兜底默认值（`settings.providerErrorDefaults`）——有关这些规则如何匹配，请参阅第 7 节中的“操作员声明的规则”。时长可以设置为默认值（无显式冷却时间）、30 分钟、1 小时、5 小时、24 小时，或自定义的 1 到 43,200 分钟（30 天）。

**REST API**（`src/lib/resilience/cooldownManager.ts`，身份验证：management）：

- `GET /api/resilience/cooldowns[?provider=]` — 列出连接状态、剩余冷却时间、退避级别、上次错误类型和模型锁定项（不包含凭据）
- `POST /api/resilience/cooldowns` — 请求体 `{connectionIds: string[]}` 或 `{all: true, provider?}`；返回 `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### 锁定设置 UI + 成功衰减恢复（v3.8.23）

模型锁定已从始终启用的硬编码行为，转变为具有独立设置卡片和自愈恢复路径的完全可配置、选择性启用功能。

**设置卡片：**设置 → 模型锁定
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
这与上面的只读 `ModelCooldownsCard` **不同**（后者只会
_列出_ 活动锁定项）——新卡片用于_配置参数_。默认值位于
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）：

| 设置                    | 默认值                           | 含义                                   |
| ----------------------- | -------------------------------- | -------------------------------------- |
| `enabled`               | `false`                          | 主开关 — 模型锁定**默认关闭**。        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 被视为模型范围失败的上游状态。         |
| `baseCooldownMs`        | `120_000`（120 秒）              | 首次失败的初始锁定时长。               |
| `maxCooldownMs`         | `1_800_000`（30 分钟）           | 递增冷却时间的上限。                   |
| `maxBackoffSteps`       | `10`                             | 指数退避递增的最大步数。               |
| `useExponentialBackoff` | `true`                           | 重复失败时是否以指数方式延长冷却时间。 |

设置通过常规设置存储持久化，并通过 resilience 设置架构进行验证；该卡片会限制
`baseCooldownMs`/`maxCooldownMs` 的范围（其中 `maxCooldownMs ≥ baseCooldownMs`），
以及 `maxBackoffSteps` 的范围。

**成功衰减恢复：**恢复并不完全依赖计时器到期。健康的
响应会逐步降低模型的失败计数，因此已恢复的模型会停止
递增，并在计时器到期前解除锁定。在成功的组合目标上，
`open-sse/services/combo.ts` 会调用 `decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`），该函数会将存储的
`failureCount` **减半**（`Math.floor(failureCount / 2)`）；当其达到 `0` 时，
会彻底删除锁定项。对应的 `recordModelLockoutFailure()` 会在递增窗口内发生失败时
增加计数（并延长冷却时间）。这种成功衰减机制是在普通计时器到期之外的额外机制 —
两条路径都可以重新启用模型。

**状态：**锁定状态保存在**内存中**（每个进程的 `Map`s，按
`provider:connectionId:model` 键入 `ModelLockoutEntry`，精确范围锁按
`provider:connectionId:exact:model` 键入），不会持久化到
数据库中——重启后这些状态将丢失。_设置_会持久化；活动锁定_状态_是临时的。

---

## 4. 配额共享并发控制（v3.8.36）

订阅账户（GLM、MiniMax 等）通常仅接受约 1–3 个并发请求；超过此数量会触发 429 和冷却。在
**配额共享**（`qtSd/…`）组合下，这一问题尤为突出，因为多个 API 密钥共享同一个上游账户。以下三层机制可防止共享账户被请求洪泛。

### 每个连接的并发上限（`max_concurrent`）

每个提供者连接都可以声明一个 `max_concurrent` 上限
（`provider_connections.max_concurrent`，在连接模态框 / API / DB 中设置）。
留空表示不设限制。这是驱动下方串行化层的唯一设置——将其设为账户的实际并发数
（例如 GLM 约为 1，MiniMax 约为 2）。

### 每个模型的并发上限（`modelConcurrency`）

连接还可以在其 `rateLimitOverrides` 映射中声明精确的每模型并发上限：

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

在连接模态框中设置（**速率限制覆盖 → 每模型并发上限**，每行填写一个
`model=cap`），或通过
`PATCH /api/providers/[id]` 使用相同的 JSON 结构设置。键的语义如下：

- **连接级与模型级：** `maxConcurrent` 仍是整个连接共享的并发上限。两者同时生效时，会在同一个复合闸门中以原子方式获取两个闸门
  （`global → provider → account → model`）；实际行为遵循适用限制中更严格的那个。
- **精确的模型键匹配：** 键是路由解析后传递给执行器的模型字符串——通常是上游模型的裸 ID
  （`glm-5`），而不是客户端侧的 `provider/model` 别名（`zai/glm-5` 与 `glm-5` 不匹配）。值必须是正整数形式的并发请求上限。
- **本地排队，不进行发现：** 超出的请求会按照现有的队列/超时语义在本地排队（类型化的 `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` 准入错误）。OmniRoute 不会发现或推断上游策略——它只执行操作员配置的精确上限。模型闸门饱和不会禁用提供者，也不会创建永久性的模型锁定；上游 429/冷却/回退行为仍是错误兜底机制。
- **每连接、每进程范围：** 上限按数据库连接分别设置，并保存在内存中，因此复用同一个上游 API 密钥的两个连接不会相互协调。
- **未配置表示不变：** 省略该映射（或将控制面板字段留空）不会添加模型闸门。以下示例配置不声明任何通用的提供者限制：

```text
glm-5=1
glm-4.7=3
```

### 配额共享请求串行化

当配额共享调度目标连接声明了正数
`max_concurrent` 时，发往该**账户**的并发请求会通过每连接信号量（键为
`qsconn:<connectionId>`）进行串行化：超出的请求会**在队列中等待**，而不是向账户发送洪泛请求。该机制采用**故障开放**策略——队列饱和或超时后会继续执行且不占用槽位，不会拒绝任何本可调度的请求。在 **设置 → 弹性 → 配额共享每连接并发**
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`，默认开启）中切换。未设置
`max_concurrent` 上限时，行为保持不变。

> 配额共享路由闸门（`selectQuotaShareTarget`、DRR + P2C）本身采用
> 故障开放策略，只会**降低**达到上限连接的优先级——当连接池只有一个连接时，它无法实施硬限制，因此真正抑制洪泛的是此信号量。

### 组合冷却感知重试

对于每种组合策略（启用时），如果请求会因短暂冷却而产生 429，
则会等待冷却结束并重新调度，而不是直接返回 429——这涵盖 Gemini 类 TPM/RPM 窗口（约 60 秒的 retry-after）
在多模型组合中的情况，例如由两个模型组成的组合中，两个目标都触发了每模型速率限制。该机制受 **设置 → 弹性** 中的
`comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、
`budgetMs`）限制。对于 `quota_exhausted`（锁定至午夜）或身份验证/未找到原因，永远不会等待。

组合可以通过 `config.comboCooldownWaitEnabled: false` 选择退出。只有字面值
`false` 才会禁用这些共享组合等待（调度后冷却等待以及调度前断路器开启/模型锁定等待）及其等待预算超时下限扩展。
缺少该配置或设置为 `true` 时，会保留全局策略；`true` 不能启用全局已禁用的等待。显式的
`targetTimeoutMs` 仍具有更高优先级。此选择退出不会改变独立的原生 Codex 轮次固定调度前等待。

同一个闸门也覆盖调度前场景（#16319）：当组合的每个目标在任何尝试开始前都因其模型处于短暂锁定状态而被跳过时，零尝试路径会在相同上限下等待锁定结束并重新调度，而不是返回不带提示信息的
`503 ALL_TARGETS_SKIPPED`。当不允许等待时（达到上限、尝试次数或预算耗尽，或功能已关闭），终端响应会升级为
`429 rate_limit_error`，并携带最早的短暂锁定到期时间所对应的
`retry_after` / `reset_at`；配额、身份验证和未找到锁定仍会返回不带提示信息的 503。

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. 请求队列准入控制（v3.8.49 · issue #6593）

**范围**：本地的按"提供者+连接"维度划分的限流队列（`open-sse/services/rateLimitManager.ts`，由 Bottleneck 支撑），位于上述三种机制之下的一个层级。

**`maxWaitMs` 约束队列等待；`executionMaxWaitMs` 约束执行。**
两者被有意分开，互不馈入。

`resilienceSettings.requestQueue.maxWaitMs` 是**队列等待预算**：它涵盖等待提供者槽位、随后处于 QUEUED 状态排队的时间，其计时器在任务离开 QUEUED 并开始执行的那一刻被清除（`rateLimitManager.ts`，`wrappedFn`）。超过该预算的请求永远不会到达上游。默认值为 30000ms，由 `src/lib/resilience/settings.ts` 中的 `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` 提供，并被 `tests/unit/ratelimit-admission-control-6593.test.ts` 锁定——因此更改它会让该测试变红，而不是让本段内容悄悄过时。

`resilienceSettings.requestQueue.executionMaxWaitMs` 是作为任务 `expiration` 传给 Bottleneck 的值，其计时器仅在调度后才启动。它是为自身没有上游超时的执行器提供的兜底，并且当执行器自己的 fetch-start 超时更长时会提升到该值，因此它不会切断一个健康的、正在传输中的响应。默认值为 600000ms（10 分钟）。

过去将队列预算馈入 `expiration` 正是曾在传输中途杀死非增量网关的原因——它们在收到首批字节之前合理地运行数分钟——这也是为什么过期会呈现为 `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`（HTTP 504），而队列预算携带的是队列超时错误码。可通过 `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS`（环境变量）或仪表盘（**设置（Settings）→ 弹性（Resilience）**）覆盖任一值。两者在规范化时都会被钳制在 1ms–24h 范围内。

**两者的优先级：**环境变量仅提供_默认值_。持久化在 `resilienceSettings.requestQueue` 中的值（仪表盘 / API patch，存储于 `key_value`）优先于它，而按连接设置的 `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` 又优先于前者。因此，在已有持久化值的部署上设置环境变量不会有任何效果——请改为清除或更新该持久化设置。

队列驻留时间由 `maxWaitMs` 约束；下文的 `maxQueueDepth` 约束同时允许多少调用者排队。

**响应体声明的重试：限速 vs 锁定。**429 响应体可以指定自己的等待时间（Gemini 的 `RetryInfo.retryDelay`、"retry after Ns" 文本），`updateFromResponseBody` 会读取它。能容纳进连接 `maxWaitMs` 的等待属于限速：限流器在该时长内清空其储备量，排队的调用在储备量恢复时被调度。超过 `maxWaitMs` 的等待不是队列能坐等的——Gemini 对耗尽的每日配额会返回 `retryDelay: "86399s"`。重建后的 429 上转发的 `Retry-After`（#16528）已经让回退引擎在该时间窗口内锁定模型，但如果同时为此暂停限流器，仍会让任何提前到达该密钥的调用（例如在弹性重置之后）停滞整整 `maxWaitMs`。当这样的等待来自带类型的 Google `RetryInfo` 详情（`google_rpc_retry_info` 来源）且密钥的限流器已经按模型划分（见 `getLimiterKey`）时，429 会转为对该连接的模型锁定（`open-sse/services/rateLimitManager/bodyRetryPause.ts` 中的 `lockModelForLongBodyRetry`，上限为 24h），限流器保持不暂停。账户选择会通过 `isModelLocked()` 跳过该锁定，针对固定到该连接的目标的组合预调度门控同样如此。在 antigravity 上——其限流器是按配额族划分的——锁定作用于确切的模型，与其其他配额锁定一致。当别名将客户端请求的名称解析到该模型时，该请求名称也会被锁定，因为这些检查使用的是请求的名称；它是被精确锁定的（`lockExactModel`），因此跨越 antigravity 配额族或 codex 作用域的别名永远不会锁定其自身。散文式提示、无类型的 `retryDelay`，或整个连接共享的限流器，则保留暂停行为。当 429 路径刚重建的限流器确实暂停时，剩余排队时间早于暂停结束时间的调用者会立即被以队列超时错误码拒绝（`checkLimiterPause`），而不是干等那段时间耗尽；所记录的结束时间锚定在限流器构建之前——即 Bottleneck 启动其刷新时钟的位置——而之后对储备量的任何更改都会遗忘该锚点。由 `tests/unit/rate-limit-long-body-retry-lockout.test.ts` 和 `tests/unit/rate-limit-body-retry-pause.test.ts` 覆盖。

**`maxQueueDepth`——可选启用的准入上限（新）。**`resilienceSettings.requestQueue.maxQueueDepth`
约束一个"提供者+连接"同时允许多少请求处于排队状态（尚未调度）。当队列已持有 `maxQueueDepth` 个请求时，新请求会在到达 `limiter.schedule()` **之前**被快速拒绝，并携带带类型的 `code: "RATE_LIMIT_QUEUE_FULL"` 错误——因此拒绝的开销很低，并且发生在该请求的任何下游提示词压缩 / 翻译工作之前。默认 `0` = 禁用，保留现有的无界队列行为；取值范围 0–100000。可通过 `RATE_LIMIT_MAX_QUEUE_DEPTH`（环境变量）或 `resilienceSettings.requestQueue.maxQueueDepth`（仪表盘 / API patch）覆盖。

准入检查本身是一个纯函数（`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`），因此无需真实的 Bottleneck 限流器即可进行单元测试。

> 发起 #6593 的 RFC 还提议了一个 `bypassCompressionOnRateLimit` 标志。本仓库的
> `open-sse/services/compression/` 流水线是对出站 LLM 请求进行提示词/上下文压缩（`chatCore.ts` 中
> `resolveCompressionSettings`/`selectCompressionStrategy` 代码块附近），而不是对合成的 429 响应体进行 HTTP 响应压缩——对于字面意义上的绕过标志，不存在匹配的代码路径。该提示词压缩步骤
> 目前在请求流水线中还运行在 `withRateLimit()` _之前_，因此在队列已满而被拒绝时通过重排序来跳过它是一个独立且更大的变更，超出了本问题的范围；此处有意**未**实现，并且如果节省 CPU 的收益值得承担重排序风险，则将其留作后续工作。

### 速率限制自动启用安全网与连接保护 (`rateLimitProtection`)

**自动启用安全网**（`resilienceSettings.requestQueue.autoEnableApiKeyProviders`，默认 `true`）：
默认情况下，OmniRoute 会为所有活动的 API 密钥提供者连接（`getProviderCategory(provider) === "apikey"`）自动启用速率限制队列保护。这可确保发往对速率敏感的上游 API 密钥的传入请求会通过 Bottleneck 排队并限流，而不是突发为上游 429 错误。该安全网可通过 `RATE_LIMIT_AUTO_ENABLE` 环境变量覆盖（`false`/`0`/`off` 禁用，`true`/`1`/`on` 强制开启），其优先级高于持久化的仪表盘设置（**设置 → 弹性** / `PATCH /api/resilience`）。

**每个连接的 `rateLimitProtection` 语义：**
每个连接的速率限制保护通过提供者连接上的 `rateLimitProtection` 布尔字段进行跟踪（在 SQLite 中持久化为 `rate_limit_protection`）：

- **显式开启（`rateLimitProtection === true`）**：无论提供者类别如何，也无论自动启用安全网是否开启，都会为此连接显式启用速率限制保护。
- **显式关闭（`rateLimitProtection === false`）**：会禁用显式保护，但**不会**让活动的 API 密钥连接退出全局自动启用安全网。在 `reconcileEnabledConnections`（`open-sse/services/rateLimitManager.ts`）中，`false` 与 `undefined` 等价：只有 `rateLimitProtection === true` 才被视为显式覆盖。如果 `rateLimitProtection` 为 `false`（或未设置），活动的 API 密钥连接仍会匹配自动启用条件，并继续保持速率限制保护。
- **没有每连接退出选项**：操作员目前无法表达“这一条活动的 API 密钥连接必须在没有速率限制队列保护的情况下运行”，同时为其他连接保持自动启用处于活动状态。要让 API 密钥连接完全在没有速率限制队列的情况下运行，必须全局关闭安全网（`RATE_LIMIT_AUTO_ENABLE=false` 或 `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`）。

**支持的写入路径：**

- **`POST /api/rate-limits`**：用于切换连接 `rateLimitProtection` 的受支持管理写入路径（`{ connectionId: string, enabled: boolean }`）。以 `enabled: true` 调用会开启显式保护；以 `enabled: false` 调用会移除显式保护（不过如果自动启用处于开启状态，活动的 API 密钥连接仍会在全局安全网覆盖之下）。
- **`PUT /api/providers/[id]`**：有意**不**接受或翻转 `rateLimitProtection`（#11278）。通过 `PUT /api/providers/[id]` 更新提供者连接元数据永远不会更改持久化的速率限制保护状态。

---

## 6. 慢流吞吐量看门狗 (#9709)

可选的`resilienceSettings.streamRecovery.throughputWatchdog`防护检测到仍在发送块但生成低于配置的有用输出速率的辅助输出的上游。它故意与空闲超时不同：心跳和元数据都不会重置计时器，也不计为进度。它也与硬尝试截止日期（#9153）不同，无论输出质量如何，它仍然是绝对的安全上限。

看门狗需要一段预热期，然后是一个完整的滚动窗口，然后才能中止。它计算聊天完成和响应API输出事件（保守的UTF-8字节代理）的文本增量，忽略仅使用事件和空事件，并在工具调用或推理事件正在进行时暂停判断。默认情况下它是禁用的，可以通过`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`启用（该 env 值仅种子默认—保存的`resilienceSettings.streamRecovery.throughputWatchdog.enabled`布尔值获胜；请参阅本指南顶部的 env-vs-dashboard 优先级注释）；窗口、预热、最小速率和最小可测量输出受到正常弹性设置归一化层的限制。

启用后，看门狗中止仅应用于活动的上游尝试。在任何客户端可见字节之前，现有的同一帐户早期恢复路径可能会重新开始尝试。提交后，流不会盲目重放；只有现有的安全中游延续合约才可以拼接后缀。最终确定仍然是单次的，因此使用情况统计和信号量释放不会重复。

---

## 7. 上游状态重述（错误的配额错误状态）

**范围：** 一个使用错误 HTTP 状态报告临时配额耗尽的上游网关。

**目的：** 在分类之前纠正误导性的状态，使下游消费者（回退引擎、组合聚合、面向客户端的响应）看到该失败真正可重试的性质。

一些网关会使用不可重试的 HTTP 状态来表示临时配额耗尽。`agentrouter.org` 返回 `403`（有时为 `400`），并在响应正文中包含中文（`用户额度不足` / `额度不足`），而不是标准的 `429`。诸如 Claude
Code 之类的客户端会将 `403` 视为永久性错误并中止会话；如果不进行纠正，回退引擎会将其分类为 `AUTH_ERROR`，而不是配额事件。

**实现：**

- 注册表 + 匹配器：`open-sse/config/upstreamStatusRestatement.ts` — 一个按提供者划分的规则列表（`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`），通过 `applyStatusRestatement()` 进行匹配。
- 调用点：`open-sse/handlers/chatCore.ts` 中的 `providerFailure:` 代码块（约第 3654 行），紧接在 `parseUpstreamError()` 解析出带错误 HTTP 状态的上游响应（`!providerResponse.ok`）之后，并且在任何分类运行之前，因此所有下游消费者都会看到纠正后的状态。嵌入 `200` SSE 流中的错误会遵循单独的、稍后的流解析路径，目前**不**包含在此钩子中——这是一个已知限制，目前 agentrouter 的错误状态不会通过该路径出现，因为它会以错误 HTTP 状态的形式暴露。
- 重试资格：`429` 位于 `RETRY_AFTER_ELIGIBLE_STATUSES`（`open-sse/services/combo/unavailableRetryGate.ts`）中，因此重述后的错误会携带一个真实的重试窗口，而不是以失效的 `403` 暴露。
- 合成的 `60s` `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）只是重述后的响应告知**客户端**的值；它本身不是连接内部的冷却/锁定时长——该时长由实际处理重述错误的机制单独控制（连接冷却的递增退避，第 2 节，API 密钥提供者的基础值为 `3s`；或模型锁定，第 3 节，适用于 agentrouter 这类按模型配额管理的提供者）。路由器可能会在向客户端公布的 60 秒窗口结束之前就具备内部重试资格——这是有意预留的余量，并非错误。

永久性错误（agentrouter 的 `无权访问模型`——无权访问此模型）**绝不会**被重述：即使 `textMarkers` 匹配，`excludeMarkers` 也会否决该规则，因此错误会保留其原始状态，并且不会永远重试。匹配的提供者分类规则（`open-sse/config/providerErrorRules.ts` 中的 `agentrouter-model-access-denied`：`reason: "auth_error"`、`scope: "model"`，声明的基础冷却时间为 `6h`）会由 `checkFallbackError`（`open-sse/services/accountFallback.ts`）在通用 apikey 类别的 `FORBIDDEN` 提前返回之前进行检查，并受 `honorsRuleLockScope(provider)` 的约束（#10334——目前通过 `providerErrorRules.ts` 中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表仅对 agentrouter 生效）。该规则声明的 6 小时冷却时间会作为 `fallbackResult.baseCooldownMs` 传递，但它仍会进入现有的按模型配额锁定路径（`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`，#10334 未改变该路径，只改变了冷却时间的来源）：与所有其他模型锁定一样，它会被限制为不超过操作员的 `mlSettings.maxCooldownMs`（默认值为 `1_800_000ms` / 30 分钟），并且_持久化的锁定原因_仍然是预先存在的硬编码值 `"forbidden"`，而不是规则中的 `"auth_error"`——端到端生效的只有冷却时长，原因字符串不会生效。连接本身仍保持活动状态；同一连接上的其他模型不受影响。

重述后的配额错误（`额度不足`）在生产环境中会匹配一个提供者规则（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`、`scope:
"connection"`，自身未声明冷却时间——持久化层的缩放退避默认值会生效）。自 #10334 起，`ProviderErrorRuleMatch` 上的 `scope` 会端到端地被使用，但**仅**适用于 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表中的提供者（`providerErrorRules.ts`——目前只有 `"agentrouter"`，通过 `honorsRuleLockScope()` 进行限制）。对于其他所有提供者，`scope` 仍然只是信息性的，与 #10334 之前完全相同。`checkFallbackError` 会将匹配规则的作用域暴露为 `fallbackResult.ruleScope`；`isAgentrouterConnectionQuotaScope()`（`src/sse/services/auth.ts`）是共享的保护条件，用于确认某个 `ruleScope` 确实可以安全地作为一个连接级、可自行恢复的信号来使用（作用域为 `"connection"`，原因为 `quota_exhausted`，绝不能是 `permanent`，也绝不能是 `creditsExhausted`——用于防止未来将作用域 `"connection"` 与永久账户状态配对）。有两个消费者会调用它：

- **持久化**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）：
  不再落入 passthrough-provider 的**按模型**锁定分支（agentrouter 是
  `passthroughModels: true` → `hasPerModelQuota()` 返回
  `true`），而是应用**临时连接冷却** —
  `testStatus: "unavailable"` + `rateLimitedUntil`，绝不会设置终端状态
  （`credits_exhausted`/`banned`/`expired`）— 因此连接会在冷却期结束后自动恢复，
  而不需要手动重置凭据。
  对 `disableCooling: true` 的连接跳过（#2997）：此选择退出会改为落入按模型锁定
  （这是文档中说明的权衡 — 请参见该分支上方的代码注释）。
- **同请求组合路由**（`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`）：同一保护逻辑会将连接标记到内存中的
  `exhaustedConnections` 集合中，键为
  `${provider}:${connectionId}`。这只会跳过剩余的同请求目标，前提是该目标自身的目标对象
  已携带完全相同的 `connectionId`（`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`，即在查询 `exhaustedConnections` 之前存在
  `if (provider && connectionId)`）— 普通的模型列表组合中，兄弟目标自身并不携带固定的
  `connectionId`，而是每次分发时根据响应中的
  `X-OmniRoute-Selected-Connection-Id` header 解析，因此永远不会命中该键匹配。对于这种
  常见情况，防止剩余步骤重新使用刚刚耗尽的账户的真正机制不是这个 Set — 而是上面的持久化
  层（连接的 `rateLimitedUntil` 现在位于未来）与同一保护逻辑结合，抑制此次失败的
  `transientRateLimitedProviders`（请参见“Two-stage design”和 `targetExhaustion.ts` 中
  `isAgentrouterConnectionQuotaScope` 分支上的代码注释）：由于该 Set 未被标记，
  `combo.ts` 的 `allowRateLimitedConnection` 强制允许逻辑
  （`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）不会对该 provider 的剩余步骤
  生效，因此凭据选择中的 `rateLimitedUntil` 过滤器（`src/sse/services/auth.ts:1238`）
  会按正常方式执行，剩余步骤要么选择另一个仍符合条件的 agentrouter 连接，要么因无可用
  凭据而失败 — 不会强行回到该分支刚刚冷却的连接。

### 两阶段设计：状态重述，然后分类

状态重述（`upstreamStatusRestatement.ts`）和 provider
分类规则（`open-sse/config/providerErrorRules.ts`、
`providerRuleRegistry`）是彼此独立的注册表，虽然都根据 provider id
和文本标记进行匹配，但它们运行在不同位置、服务于不同目的：重述会在
`chatCore.ts` 中较早地重写 HTTP 状态；分类规则则会在
`checkFallbackError()`（`open-sse/services/accountFallback.ts`）中选择备用
`reason` 并锁定 `scope`（`model` / `provider` / `connection`）。

只有对于 `providerErrorRules.ts` 中
`FULL_TEXT_RULE_PROVIDERS` 允许列表所列出的 provider，分类规则才能看到完整的错误**文本**
（这是匹配 `额度不足` 等正文标记所必需的）— 当前只有 `"agentrouter"`。对于其他所有
**内置目录** provider，`checkFallbackError` 只会将结构化错误（`{code, type}`）传递给
`getProviderErrorRuleMatch`；这足以支持基于 header/status/code 的规则，但无法看到正文文本
标记。辅助函数 `resolveRuleMatchBody()` 执行这一选择：对于允许列表中的 provider 使用完整
错误文本，否则使用结构化错误。将**内置** provider 添加到
`FULL_TEXT_RULE_PROVIDERS` 是针对每个 provider 的显式选择加入 — 该机制的存在是为了让
不在列表中的每个 provider 的默认路径保持逐字节不变。

规则的 `scope`（`model` / `provider` / `connection`）与
`FULL_TEXT_RULE_PROVIDERS` 是彼此独立的选择加入项：`checkFallbackError` 只会将其作为
`fallbackResult.ruleScope` 暴露出来；对于同一文件中
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表中的 provider，下游使用者才会将其视为不仅仅
是信息标签的内容（通过 `honorsRuleLockScope()` 进行门控 — 目前只有 `"agentrouter"`）。
有关 provider 加入该允许列表后，`scope: "connection"` 匹配实际上会执行什么操作，请参见
上面的“Restated quota errors”。

**#11104 — 运营者声明的规则绕过两个允许列表。** 运营者可以在运行时通过
`settings.providerErrorRules`
（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）声明
每个 provider 的规则，而无需编辑此文件。让运营者规则受
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — 这两个旨在保护
**内置目录规则**默认行为的允许列表 — 的限制，会使 settings 机制对除其中已列出的
provider 之外的所有 provider 都失效，因为声明规则本身已经是运营者的明确选择加入。
`resolveRuleMatchBody()` 和 `honorsRuleLockScope()` 都会先检查
`hasOperatorRuleForProvider()`：拥有运营者规则的 provider 会获得原始错误文本，并且其声明的
`scope` 会被遵循，无论它是否同时出现在任一允许列表中。

**运营者声明的规则**（`OperatorProviderErrorRule`）：每条规则都有一个可选的
`status` 和一个可选的 `match`（对错误文本执行普通的不区分大小写的子字符串匹配，绝不会是
RegExp，因此不会导致 ReDoS），并且必须至少设置其中一个。两者都设置时采用 AND 关系；
省略的字段匹配任何内容，因此 `{match: "insufficient_quota"}` 会匹配携带该 code 的任何
status。第一个匹配的规则优先。`cooldownMs` 最长接受 30 天；规则总数最多为 50 条。

**兜底默认值**（`settings.providerErrorDefaults`，选择启用，通过
`setOperatorProviderErrorDefaults` 设置）：`{[provider]: {cooldownMs, scope?, reason?}}`
其中 `cooldownMs` 的范围为 1 分钟到 30 天。仅当没有匹配到操作员规则和内置目录规则时，默认值才会生效，并且仅适用于 402、403、408、429 和 5xx 错误。请求形态错误（400、404、409、413、422）以及单独的 401 错误仍按其自身方式处理。如果未显式指定 `reason`，则原因根据状态码确定，与 `classifyError` 的处理方式相同。声明默认值会被 `hasOperatorRuleForProvider()` 视为操作员规则，因此其 `scope`（默认为 `"connection"`）会生效。默认值的有效冷却时间取其 `cooldownMs` 与提供者自身重试提示（`Retry-After`、`x-ratelimit-reset` 或响应正文中的重置提示，两者使用的是同一个提示；当连接冷却设置“使用上游重试提示”开启时，引擎也会遵循该提示）中较长者，因此默认值可以延长较短的上游提示，但绝不会缩短实际的重置时间。显式操作员规则会保留其准确的 `cooldownMs`。规则和默认值都不会绕过 `markAccountUnavailable` 中的连接冷却保护：活动中的较长冷却时间不会被缩短，终止状态也不会被覆盖。在 `checkFallbackError` 中更早运行的内置文本检测器（积分耗尽、每日配额、账户停用）仍会优先处理其各自的匹配短语。

**已知缺陷 — `providerRuleRegistry` 从未用于 HTTP 400。**
`checkFallbackError` 的 `BAD_REQUEST` 分支完全通过其自身的模式数组（`accountFallback.ts` 中的 `MODEL_ACCESS_DENIED_PATTERNS`、`CONTEXT_OVERFLOW_PATTERNS` 等）对状态 400 进行分类，并在到达其上方的 `configuredRule`/`getProviderErrorRuleMatch` 分支之前返回。包含 `status: 400` 的内置目录规则（或操作员规则）在语法上是有效的，但永远不会触发。目前没有任何现有规则针对 400，因此不会影响生产环境——但未来的 400 规则必须先修改此分支，这比添加规则的改动更大，因为它会重新分类所有已依赖模式数组行为的提供者的 400 错误；对于单个提供者的规则添加而言，这不在范围内。

### 添加一个新的配额误报网关

1. 在 `statusRestatementRegistry`（`open-sse/config/upstreamStatusRestatement.ts`）中注册一个规则数组。保持 `textMarkers`
   具有提供者特异性；绝不要复用会与
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）冲突的通用英文短语。
2. 可以选择在 `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）中注册分类规则，以选择正确的锁定范围（账户级配额使用 `connection`，按模型的错误使用 `model`）。此步骤只有在规则需要完整错误文本（正文标记）的提供者上才会在生产环境中生效：将提供者 id 添加到同一文件中的 `FULL_TEXT_RULE_PROVIDERS`；否则 `checkFallbackError` 只会向规则提供结构化的
   `{code, type}` 错误，正文文本规则在实际流量中永远不会匹配。
   纯粹按 `status`/`headers` 匹配的规则（例如 Opencode 或 Minimax 的规则）不需要此选择启用。除此之外，如果规则声明了 `scope: "connection"`，并且意图是实现实际的全连接冷却以及同一请求的组合跳过（而不仅仅是信息性标签），请将提供者 id 添加到同一文件中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`——该列表控制 `markAccountUnavailable()`（`src/sse/services/auth.ts`）中的 `isAgentrouterConnectionQuotaScope()` 式消费，以及
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）；如果不添加，`scope`
   仍会通过 `fallbackResult.ruleScope` 传递，但不会产生任何实际作用。
3. 添加与
   `tests/unit/upstream-status-restatement.test.ts`
   和 `tests/unit/agentrouter-error-rules.test.ts` 对应的单元测试（包括
   not-permanent / not-creditsExhausted 保护；如果该提供者需要白名单，还应添加测试，断言 `resolveRuleMatchBody()` 仅对该提供者返回完整文本）。

无需修改 `chatCore.ts`、`classifyError` 或 combo。

#### 出口分桶锁定（#10880）

`EGRESS_BUCKETED_LOCK_PROVIDERS` 中的提供者（opencode 系列）会被视为按 IP 分桶的上游（opencode 免费层按 IP 分桶，而不是按账户分桶——参见 #9611）：状态为 429 且被分类为 `quota_exhausted`
**或** `rate_limit_exceeded` 时，会在轮换尝试这些连接之前，冷却所有白名单系列中最后已知出口 IP 与失败连接匹配的连接
——从而避免 N-1 次必然失败的上游调用（机制与 #10460/#10525 相同）。
这里特意包含 `rate_limit_exceeded`：在 `markAccountUnavailable`
路径中，opencode 特定规则永远不会匹配（传递给 `checkFallbackError` 的内容中没有 headers/body，且 opencode 不在 `FULL_TEXT_RULE_PROVIDERS` 中），因此，正文包含订阅配额文本（“monthly usage limit
reached”）的 429 会先由配额文本回退逻辑（`buildSubscriptionQuotaFallback`、`accountFallback.ts`；冷却 1 小时）分类为 `quota_exhausted`，之后才会到达 `status_429` 规则；而不包含配额文本的 429（普通速率限制）则通过 `status_429` 规则分类为 `rate_limit_exceeded`，并仍会冷却整个 IP 系列。对于白名单提供者而言，按 IP 分桶的速率限制与配额耗尽表示相同的信号。需要注意的限制：

- **尽力而为**：锁会从 `proxy_logs` 中解析连接最后已知的 `egress_ip`
  （24 小时窗口、同步执行、无缓存）。缓存为空（从未探测到 egress
  IP）或没有记录时，失败连接仍会由该分支进行冷却（按当前方式记录），只是不会锁定任何同级连接。
- **永不终态**：冷却是一个会续期的配额窗口
  （`testStatus: "unavailable"`）；永远不会从 IP 级信号推导出永久状态。`disableCooling` 连接会完全跳过该分支。
- **允许列表系列的锁粒度发生变化**：这是范围变更，而不仅仅是同级连接优化。opencode 是一个 `passthroughModels`
  提供者，因此在此分支之前，429 会产生按 MODEL 划分的锁定；现在则会产生连接冷却——即使操作员只运行一个连接、完全没有同级连接也是如此。这正是 opencode 规则表已声明正确的粒度（`scope: "connection"`、
  `providerErrorRules.ts`），只是此前由于 opencode 不在
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 中，从未得到遵循。该分支会自行写入失败
  连接的冷却状态和 `backoffLevel`，与连接范围的 agentrouter 分支保持一致，然后返回——按 MODEL 的阻止逻辑和下面的通用路径都不会执行。
- **包含组合调用**：与 agentrouter 分支一样，该范围会有意忽略组合调用方针对 429 应用的
  `persistUnavailableState`/`isCombo` 降级。按 MODEL 的锁定并不是此范围的较弱形式，而是错误的单位：它无法说明哪个 IP 已耗尽，因此组合轮换会在每个同级连接上继续消耗一次必然失败的调用。
- **同级连接安全性**：已经处于终态（banned/credits_exhausted）或已经处于更长冷却期的同级连接，绝不会被覆盖。
- **排他性允许列表**：扩大 `EGRESS_BUCKETED_LOCK_PROVIDERS` 是所有者的明确决策；不存在通用接线逻辑（模式 #10334/#10419）。同级连接查询会绑定同一个允许列表，而不是将其重复写成 SQL 字面量，因此扩大允许列表仍只需修改一行。
- **双向 egress IP 轮换**：查询窗口（24 小时）远大于 egress-IP 缓存 TTL（5 分钟），因此“最后已知 IP”代表的是历史，而不是当前状态。如果连接的代理在窗口内发生轮换，锁可能会**漏掉**一个实际共享的 IP（记录的 IP 是新的、尚未耗尽的 IP）——反过来也可能**冷却一个已从**耗尽 IP **轮换离开的同级连接**。后一种情况会使该同级连接损失一个冷却窗口；这两种情况都是基于历史的查询所能接受的尽力而为限制。
- **成本**：对 `proxy_logs` 执行两次有界扫描（通过 `idx_pl_timestamp` 按窗口过滤），且仅在 429 频率下执行。不新增索引（迁移 134
  YAGNI）。测量基于一份中等规模、真实流量数据库的副本；高吞吐实例在相同窗口内按比例保留更多记录。

## 其他弹性功能

- **20 种路由策略**（priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、headroom、quota-weighted、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline）—— 参见 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)。
- **重置感知路由**（v3.8.0）—— 按配额重置时间对连接进行优先级排序。
- **后台模式降级** —— Responses API 的 `background: true` 会降级为同步执行并附带警告。
- **动态工具数量限制检测** —— 当触及工具数量限制时，对提供者进行退避。
- **紧急回退** —— 由 `OMNIROUTE_EMERGENCY_FALLBACK` 控制；运维人员无需重启即可在功能开关页面覆盖该设置。

---

## 调试

- 加权组合（Weighted combo）返回 `503 all_targets_cooling_down`（设置了 `Retry-After`，`diagnostics.excluded` 列出每个目标及其 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` 状态）→ 说明资源池已配置并连接，只是所有目标都被某个弹性计时器排除了；`[COMBO] Weighted selection: every target excluded before dispatch — …` 警告会给出原因和剩余秒数。同一个组合返回 `404 no_executable_targets` 则表示没有涉及弹性计时器（没有可运行的目标，或者每个账号都未通过可用性探测）。构建逻辑位于 `open-sse/services/combo/pinRecovery.ts`，排除信息收集自 `targetResolution.ts`。
- 某个提供者的所有密钥都被跳过 → 同时检查熔断器状态**和**每个连接的 `rateLimitedUntil`/`testStatus`。
- 提供者在重置窗口之后仍被永久排除 → 代码直接读取原始 `state`，而不是使用 `getStatus()`/`canExecute()`。
- 一个密钥失败，其他密钥应该可用 → 优先使用连接冷却而非熔断器。
- 只有一个模型失败 → 优先使用模型锁定而非连接冷却。
- 状态本应自动恢复但没有恢复 → 检查是否存在未来时间戳，以及读取路径是否会刷新过期状态。永久性状态需要手动修改。

---

## 运行时状态 —— 代理快速参考

> 原文从 `AGENTS.md` 的 "Resilience Runtime State" 一节原样迁移而来（PR #12743），
> 以使代理指南保持在 40k 上下文预算之内。这是上述各节的精简、面向代理的视图；
> 编号章节仍是完整参考。

OmniRoute 有三种相关但不同的临时故障机制。在调试路由行为时，请保持它们的
作用域清晰区分。参见
[3 层弹性架构图](../diagrams/exported/resilience-3layers.svg)
（源文件：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)）
以快速了解整体结构。

### 提供者熔断器

**作用域**：整个提供者，例如 `glm`、`openai`、`anthropic`。

**目的**：停止向在上游/服务层面反复失败的提供者发送流量，避免一个不健康的
提供者拖慢每个请求。

**实现**：

- 核心类：`src/shared/utils/circuitBreaker.ts`
- 聊天门控/执行接线：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 运行时状态 API：`src/app/api/monitoring/health/route.ts`
- 共享封装：`open-sse/services/accountFallback.ts`
- 持久化状态表：`domain_circuit_breakers`

**状态**（共 4 个 —— `src/shared/utils/circuitBreaker.ts`）：

- `CLOSED`：正常放行流量。
- `DEGRADED`：预警区间 —— 失败次数已越过降级阈值，但尚未达到熔断
  阈值；流量仍然放行，仪表盘显示警告。一次有效的连接测试或一段没有
  新故障的静默窗口会使其回到 `CLOSED`
  （窗口说明见 `docs/architecture/RESILIENCE_GUIDE.md`）。
- `OPEN`：提供者被临时阻断；调用方会收到提供者熔断响应，
  或者组合路由跳到其他目标。
- `HALF_OPEN`：重置超时已到；允许一个探测请求。探测成功则闭合
  熔断器，失败则再次打开。

**默认值**（`open-sse/config/constants.ts` → `PROVIDER_PROFILES`，经由
`src/lib/resilience/settings.ts` 中的 `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` 消费，
再传入 `src/sse/handlers/chatHelpers.ts` 中的 `getCircuitBreaker(provider, …)`）。整个提供者级别的
熔断器依据 `circuitBreakerThreshold` / `circuitBreakerReset` 运行：

| 配置文件 | 降级阈值 | 熔断阈值（`circuitBreakerThreshold`） | 重置时间（`circuitBreakerReset`） |
| -------- | -------: | ------------------------------------: | --------------------------------: |
| OAuth    |      `5` |                                   `8` |                             `60s` |
| API 密钥 |      `7` |                                  `12` |                             `30s` |
| 本地     | （派生） |                                   `2` |                             `15s` |

`PROVIDER_PROFILES` 还定义了 `providerFailureThreshold`（10/15/2）、
`providerFailureWindowMs`（15/30/5 分钟）和 `providerCooldownMs`（5/10/1 分钟）：这些参数驱动的是
**可选开启的全局提供者冷却（Provider Cooldown）的窗口门控**（`PROVIDER_COOLDOWN_ENABLED`，默认
关闭）—— `open-sse/services/providerCooldownTracker.ts` 中的提供者级条目只有在
`providerFailureWindowMs` 窗口内达到 `providerFailureThreshold` 次失败后才算进入冷却，随后
冷却 `providerCooldownMs` 时长。它们**不是**实时熔断器的阈值 —— 不要调整它们并期望
改变熔断器行为。所有默认值都可以通过
`OMNIROUTE_PROVIDER_BREAKER_*` 和 `OMNIROUTE_CIRCUIT_BREAKER_*` 环境变量覆盖；
与运行时一致的参考表位于 `docs/architecture/RESILIENCE_GUIDE.md`。

只有提供者级别的故障状态码才应触发提供者熔断器：

```ts
(408, 500, 502, 503, 504);
```

对于普通的账号/密钥/模型错误，例如大多数 `401`、`403` 或 `429` 情况，不应触发
整个提供者级别的熔断器。这些通常属于连接冷却或模型锁定的范畴。通用 API 密钥
提供者返回的 `403` 应该是可恢复的，除非它被归类为终止性的提供者/账号错误。

断路器采用惰性恢复，而非后台定时器。当 `OPEN` 状态过期时，诸如
`getStatus()`、`canExecute()` 和 `getRetryAfterMs()` 的读取操作会将状态刷新为
`HALF_OPEN`，这样仪表盘和组合候选构建器就不会一直无限期地排除一个已过期的 provider。

### 连接冷却（Connection Cooldown）

**作用范围**：单个 provider 连接/账户/密钥。

**目的**：临时跳过一个异常的密钥/账户，同时允许同一 provider 的其他连接继续处理请求。

**实现**：

- 写入/更新路径：`src/sse/services/auth.ts::markAccountUnavailable()`
- 账户选择/过滤：`src/sse/services/auth.ts::getProviderCredentials...`
- 冷却时间计算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置：`src/lib/resilience/settings.ts`

provider 连接上的重要字段：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在账户选择期间，满足以下条件时连接会被跳过：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷却同样是惰性的：当 `rateLimitedUntil` 已成为过去时间，连接将重新变为可用。成功使用后，`clearAccountError()` 会清除 `testStatus`、
`rateLimitedUntil`、错误字段以及 `backoffLevel`。

默认的连接冷却行为：

- OAuth 基础冷却时间：`5s`。
- API 密钥基础冷却时间：`3s`。
- API 密钥遇到 `429` 时，应优先采用上游的重试提示（`Retry-After`、reset 响应头或
  可解析的 reset 文本），如果有的话。
- 重复出现的可恢复故障使用指数退避：

```ts
baseCooldownMs * 2 ** failureIndex;
```

防惊群（anti-thundering-herd）保护机制可防止同一连接上的并发故障反复延长冷却时间或重复递增 `backoffLevel`。

终态（terminal states）不是冷却。`banned`、`expired`（仅在经过 N 次有界重试后才变为终态，由 `EXPIRED_RETRY_MAX` 控制）和 `credits_exhausted` 旨在保持不可用状态，直到凭据/设置发生变更或由运维人员手动重置。
不要用瞬态冷却状态覆盖终态。

### 模型锁定（Model Lockout）

**作用范围**：provider + 连接 + 模型。

**目的**：当某个连接上仅有一个模型不可用或配额受限时，避免禁用整个连接。

示例：

- 按模型配额计费的 provider 返回 `429`。
- 本地 provider 对某个缺失的模型返回 `404`。
- 特定 provider 的模式/模型权限故障，例如选定的 Grok 模式。

模型锁定位于 `open-sse/services/accountFallback.ts`，它允许同一连接继续为其他模型提供服务。

### 调试指南

- 如果某个 provider 的所有密钥都被跳过，请同时检查 provider 断路器状态和每个
  连接的 `rateLimitedUntil`/`testStatus`。
- 如果某个 provider 在重置窗口之后似乎被永久排除，请检查代码是否在直接读取原始的
  `state`，而没有使用 `getStatus()`/`canExecute()`。
- 如果某个 provider 密钥失败但其他密钥应该可用，优先使用连接冷却而非
  provider 断路器。
- 如果只有一个模型失败，优先使用模型锁定而非连接冷却。
- 如果某个状态应当自我恢复，它应该具有一个未来的时间戳/重置超时，以及一条
  能刷新过期状态的读取路径。永久性状态需要手动修改凭据或配置。

---

## TLS 指纹识别与隐匿

特定于提供者的隐匿技术（JA3/JA4、CCH、混淆）另有单独文档记载 — 参见 `docs/security/STEALTH_GUIDE.md`（位于 git 中；未编译进 `/docs`）。

---

## 韧性测试（第 8 阶段 · Block C）

除了针对韧性逻辑的单元测试之外，还有三个测试在真实的压力/故障条件下检验运行时（全部为集成/夜间测试 — 均不阻塞 PR）：

| 测试        | 说明                                                                                                                       | 运行方式                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | 伪上游节点注入真实的延迟/重置/超时/503；验证断路器是否打开/恢复，以及 `checkFallbackError` 是否将 503 归类为可恢复的回退。 | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | 在 `--expose-gc` 下每次 `createSSEStream` 运行约 500 个流；若堆增长超过上限则失败（OOM 防护 #3069）。                      | `npm run test:heap`                    |
| k6 soak     | 对 `/api/monitoring/health` 施加持续负载；检查 p95/错误率阈值。                                                            | `k6 run tests/load/k6-soak.js`（夜间） |

由 `.github/workflows/nightly-resilience.yml`（cron + dispatch）编排。在默认的 `test:integration` 中，chaos 和 heap 测试会自动跳过（缺少 `RUN_CHAOS_INT`/`--expose-gc` 时）。

---

## 另请参阅

- [架构指南](./ARCHITECTURE.md) — 系统架构与内部实现
- [用户指南](../guides/USER_GUIDE.md) — 提供者、组合与 CLI 集成
- [自动组合引擎](../routing/AUTO-COMBO.md) — 16 因子评分与模式包
