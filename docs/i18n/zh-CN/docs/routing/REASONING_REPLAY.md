# Reasoning Replay Cache (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **事实来源：** `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 会捕获思考模式模型生成的助手 `reasoning_content`，并在上游提供者需要时，在多轮请求中透明地重放它。这样可以避免严格的提供者因客户端对话历史中缺少上一轮推理内容而返回 HTTP 400 错误。

## 存在原因

一些思考模式提供者会拒绝后续轮次，除非**上一条助手消息包含原始 `reasoning_content`**。上游会返回 400，并附带如下消息：

```
参数错误：思考模式中的 reasoning_content 必须传回 API。
```

但常见客户端（Cursor、Cline、Roo Code、OpenAI SDK）会从其重放的历史记录中移除 `reasoning_content`。OmniRoute 会从服务端缓存中恢复它，使上游看到的请求保持一致。Issue #1628 引入了内存/SQLite 混合持久化机制，使缓存能够在进程重启后继续保留。

## 架构

```
第 N 轮（assistant 生成）：
  → 响应包含 reasoning_content + tool_calls
  → 如果 requiresReasoningReplay(provider, model)：cacheReasoningFromAssistantMessage()
      写入（内存 + DB），并以每个 tool_call.id 作为键
  → 将响应转发给客户端（客户端可能保留 reasoning，也可能不保留）

第 N+1 轮（客户端发送后续请求）：
  → translator 检测：requiresReasoningReplay(provider, model) === true
  → 对于每条包含 tool_calls 但不包含 reasoning_content 的 assistant 消息：
      lookupReasoning(toolCalls[0].id) → 内存 → DB
      命中  → msg.reasoning_content = cached；recordReplay()
      未命中 → msg.reasoning_content = ""（针对旧版 DeepSeek 的兼容回退）
  → 上游接收到一致的历史记录 → 不会出现 400
```

捕获发生在 `open-sse/handlers/chatCore.ts` 中（共两处，即两个 `cacheReasoningFromAssistantMessage` 调用点）。重放发生在 `open-sse/translator/index.ts` 中，在 schema 强制转换之后、分发之前。

纯文本（不含工具调用）的 assistant 轮次采用不同的键：`buildAssistantMessageCacheKey()` 会对会话作用域以及截至该轮、经过规范化的 OpenAI 格式对话记录计算摘要，因为一旦存在 `tools`，DeepSeek 就要求提供之前_每一轮_的 reasoning。对于 Responses-API 目标（例如路由到 `/responses` 的 `opencode-go/deepseek-v4-flash`），上游请求体携带的是 `input`，而不是 `messages`，因此 `translateRequest()`（`open-sse/translator/index.ts`）会通过回调选项报告其计算摘要时使用的中间对话记录，捕获点也会对同一份对话记录计算摘要。Responses 重放过程会针对每一种源格式在 OpenAI 中间格式上运行，因此 Anthropic Messages 客户端（Claude → OpenAI → Responses）也会得到重放。

## 存储 — 内存 + SQLite 混合模式

热路径使用内存中的 `Map`（按创建时间执行 LRU），并由 SQLite 表提供支持，以便进行崩溃恢复和在仪表板中显示。

| 层   | 实现                                             | 用途                                  |
| ---- | ------------------------------------------------ | ------------------------------------- |
| 内存 | `open-sse/services/reasoningCache.ts` 中的 `Map` | 快速查找，在达到 200 条时淘汰最旧条目 |
| DB   | `reasoning_cache` 表（`src/lib/db/`）            | 跨重启持久化，并为统计数据提供支持    |

写入操作会同时写入两者。读取操作会先查询内存，然后回退到 DB（从 DB 命中的条目会被提升回内存）。DB 故障不会导致致命错误——内存缓存会继续为热路径提供服务。

**默认值：**

- TTL：`2h`（`TTL_MS = 2 * 60 * 60 * 1000`）
- 最大内存条目数：`200`（`MAX_MEMORY_ENTRIES`）
- 淘汰策略：优先淘汰 `createdAt` 最早的条目

## 数据库架构

迁移：`src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

索引：`expires_at`、`provider`、`model`、`created_at`。`expires_at` 以 Unix 纪元秒数存储；SELECT 层通过 `EXPIRES_AT_EPOCH_SQL` 对旧版文本值进行规范化。

## 提供者 / 模型检测

当 `requiresReasoningReplay(provider, model)` 返回 `true` 时，将启用重放。该函数会检查 `open-sse/services/reasoningCache.ts` 中的两个列表。

**提供者 ID（精确匹配，不区分大小写）：**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**模型正则表达式模式（不区分大小写）：**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` 和 `/deepseek[-/]?v4[-.]pro/i`（V4 Flash / Pro，可选 `-free` 后缀）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

添加新的严格模式提供者/模型时，需要将其追加到其中一个列表，并编写单元测试来断言重放注入。PR 描述中应引用促使此次更改的上游 400 错误原文。

## REST API

缓存通过 `src/app/api/cache/reasoning/route.ts` 提供两个端点。两者都需要管理身份验证（来自 `@/shared/utils/apiAuth` 的 `isAuthenticated`）。

| 方法   | 端点                                                      | 描述                                             |
| ------ | --------------------------------------------------------- | ------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | 统计信息 + 分页条目                              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 筛选后的列表（`limit` 限制在 `[1, 200]` 范围内） |
| DELETE | `/api/cache/reasoning`                                    | 清除所有内容（内存 + DB）并重置命中/未命中计数   |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 仅清除某个提供者的条目                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 删除单个条目                                     |

**GET 响应结构：**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## 运维说明

- **清理：** `cleanupReasoningCache()` 会清除内存中已过期的条目，并执行 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`。健康检查工作进程会定期调用此函数。
- **崩溃恢复：** 重启后，内存为空，但 DB 中仍保留未过期的条目。首次查找给定 `tool_call_id` 时会命中 DB；后续查找则会命中内存。
- **无推理，不缓存：** 当助手消息不包含 `reasoning_content` / `reasoning` 字段时，`cacheReasoningFromAssistantMessage` 返回 `0`，因此非思考响应不会产生任何开销。
- **写入也受条件限制：** `chatCore.ts` 中的两个调用点（非流式和流式）仅在 `requiresReasoningReplay(provider, model)` 为 `true` 时调用 `cacheReasoningFromAssistantMessage()`——这与读取端检查的谓词相同。对于从不使用重放提供者的安装实例，无需再为每个包含推理内容的响应承担写入、索引更新以及 try/catch 的开销。
- **非严格模式提供者：** 当 `requiresReasoningReplay` 为 `false` 且目标格式为 OpenAI 时，转换器会从传出消息中**移除**所有 `reasoning_content` 字段——OpenAI Chat Completions 不接受该字段。

## Muse 不透明推理的所有权

Muse（`muse-code`）返回与调用方绑定的不透明推理（`encrypted_content`）。使用其他账户或重新签发的凭据重放它会在上游失败，因此原生 OAuth 请求采用会话级所有权，而非逐请求轮换（`src/sse/services/museSessionOwnership.ts`，在 `src/sse/handlers/chat.ts` 中强制执行）。显式选中的 API 密钥连接及仅使用 API 密钥的配置保留现有路由，不使用这种所有权模式。

- 每个轮次都应提供稳定的会话 ID：`x-omniroute-session-id`、`x-omniroute-session`、`x-session-id` 或 `x-codex-session-id`；也可在请求体中使用 `prompt_cache_key`、`session_id`、`conversation_id` 或 `metadata.session_id`（按此优先级）。当有两个或更多活跃的原生 OAuth 账户时，缺失或空白 ID 会返回 400；只有一个 OAuth 账户时没有其他轮换目标，因此此类请求保持未固定路由。作用域包含调用方的 OmniRoute API 密钥 ID。
- 新的独立会话会在 API 密钥连接策略允许的活跃原生 OAuth 账户间轮询，按连接 ID 排序。轮询会跳过处于连接冷却、终止状态（`banned`、`expired`、`credits_exhausted`）或对请求模型已锁定的账户；Muse 上游失败与其他提供者一样记录冷却和熔断状态。显式强制连接会在新会话中绕过轮询，但不能替换已经提供过成功响应的所有者。
- 在所有者提供成功响应之前，若其不可用，会将会话重新分配给健康账户。首次成功响应之后，会话固定到该所有者，直到闲置满 30 天（`MUSE_SESSION_IDLE_TTL_MS`）。
- 每次续接和工具结果轮次都固定到会话所有者：连接、账户身份和推理凭据代次；在上游尝试之前会再次检查，包括凭据刷新后的重试。Responses 调用 ID/项目引用和 Chat Completions 工具调用 ID 必须已针对该会话和代次记录。
- SQLite `key_value` 记录位于 `muse_session_ownership` 命名空间（`src/lib/db/museSessionOwnership.ts`），可在重启之间保留所有权和轮换游标。每次认领和提供响应都会刷新会话活动时间戳；闲置超过 `MUSE_SESSION_IDLE_TTL_MS` 的会话会被清理（所有者固定、已响应标志，以及记录的不透明内容/引用哈希），最多每 10 分钟一次且分批限量执行，因此之后重放其历史时会因所有者未知而安全拒绝。记录包含连接 ID，以及账户身份、凭据、不透明内容和续接引用的哈希，不包含秘密或对话历史。客户端必须保留并发送完整历史和不透明推理。
- 对未知或外来的不透明推理、缺失的所有者、不可用的所有者账户，或已有历史记录时发生的代次变更，系统会以明确的 4xx/503 安全拒绝；绝不会静默跨账户故障转移，也绝不会丢弃推理。
- 同一账户重新签发的密钥，只有在会话未记录可重放历史时才会被采用；已有记录的会话会继续安全拒绝，直到重新开始。
- 空的上游响应（`upstream_empty_response` / `empty_response`，未向调用方输出任何内容）最多在同一所有者上重试两次，分别等待 0.5 s 和 1.5 s（`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`）。如果所有尝试均为空，则返回原始 502，不标记冷却或熔断，因此偶发空响应不会锁定所有者。
- 所有 `muse-code` 请求都绕过语义缓存读取和写入，包括流式写入，避免缓存的不透明输出被分配给其他会话所有者。

回归保护：`tests/unit/muse-session-ownership.test.ts`、`tests/unit/muse-session-ownership-retention.test.ts`、`tests/unit/muse-empty-response-retry.test.ts` 和 `tests/unit/chatcore-semantic-cache.test.ts`。

## 另请参阅

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 熔断器、冷却期、模型锁定
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 诊断上游 400 错误
- 源代码：`src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`、`open-sse/translator/index.ts`
- 迁移：`src/lib/db/migrations/033_create_reasoning_cache.sql`
- API 路由：`src/app/api/cache/reasoning/route.ts`
- 原始问题：#1628
