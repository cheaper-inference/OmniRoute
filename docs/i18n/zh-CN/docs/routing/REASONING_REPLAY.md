# REASONING_REPLAY (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **事实来源：** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`**最后更新：** 2026-06-28 — v3.8.40

OmniRoute捕获由思维模式模型生成的助手`reasoning_content` ，并在上游提供者需要时在多轮请求上透明地重放它。这消除了严格的提供者在客户端的对话历史记录缺少前一轮推理时引发的HTTP 400 错误。

## 为什么存在

一些思维模式提供者拒绝采取后续行动，除非**之前的助理消息包括原来的`reasoning_content`** 。上游返回 400 并包含如下消息：

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

但典型的客户端（Cursor、 Cline、 Roo Code 、 OpenAI SDK）会将`reasoning_content`从它们重播的历史记录中删除。 OmniRoute从服务器端缓存中恢复它，因此上游看到的请求是一致的。 Issue #1628 引入了混合memory/SQLite持久性，因此缓存可以在进程重新启动后继续存在。

## 建筑学

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

捕获发生在`open-sse/handlers/chatCore.ts` （两个站点，两个`cacheReasoningFromAssistantMessage`调用站点）。重播发生在`open-sse/translator/index.ts`模式强制之后但分派之前。

普通（非工具调用）助理轮次的键控方式不同： `buildAssistantMessageCacheKey()`消化会话范围加上该轮次之前的规范化 OpenAI 格式记录，因为一旦`tools`存在， DeepSeek就需要对_每个_先前轮次进行推理。对于 Responses-API 目标（例如`opencode-go/deepseek-v4-flash`，路由到`/responses`），上游主体携带`input`，而不是`messages`，因此`translateRequest()` (`open-sse/translator/index.ts`) 报告它通过回调选项消化的枢轴转录本，并且捕获站点消化相同的转录本。对于每种源格式，响应重播过程都在OpenAI枢轴上运行，因此Anthropic消息客户端（Claude → OpenAI →响应）也会重播。

## 存储—混合内存+ SQLite

热路径使用由SQLite表支持的内存中`Map` （LRU-by-creation），以实现崩溃恢复和仪表板可见性。

| 层   | 执行                                           | 目的                             |
| ---- | ---------------------------------------------- | -------------------------------- |
| 记忆 | `open-sse/services/reasoningCache.ts`中的`Map` | 快速查找，驱逐最旧的 200         |
| DB   | `reasoning_cache`表（`src/lib/db/`）           | 重新启动后仍然存在，驱动统计数据 |

写入到两者。首先读取查询内存，然后回退到DB （DB命中将提升回内存）。 DB故障不是致命的—内存缓存继续为热路径提供服务。

**默认值：**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- 最大内存条目： `200` (`MAX_MEMORY_ENTRIES`)
- 驱逐：最旧的`createdAt`首先

## 数据库架构

迁移： `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

索引： `expires_at`、 `provider`、 `model`、 `created_at`。 `expires_at`存储为 Unix 纪元秒； SELECT层通过`EXPIRES_AT_EPOCH_SQL`标准化传统文本值。

## 提供者/型号检测

当`requiresReasoningReplay(provider, model)`返回`true`时启用重播。该函数检查`open-sse/services/reasoningCache.ts`中的两个列表。

**提供者IDs （精确匹配，不区分大小写）：**

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
- `/deepseek[-/]?v4[-.]flash/i`和`/deepseek[-/]?v4[-.]pro/i` （V4 Flash/Pro，可选`-free`后缀）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

添加新的严格provider/model意味着附加到这些列表之一并编写断言重放注入的单元测试。 PR描述应引用引发更改的确切上游 400 字符串。

## REST API

缓存在`src/app/api/cache/reasoning/route.ts`下公开两个端点。两者都需要管理身份验证（来自`@/shared/utils/apiAuth`的`isAuthenticated` ）。

| 方法   | 端点                                                      | 描述                                       |
| ------ | --------------------------------------------------------- | ------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | 统计+分页条目                              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 过滤列表（`limit`固定到`[1, 200]`）        |
| DELETE | `/api/cache/reasoning`                                    | 清除所有内容（内存+ DB）并重置hit/miss计数 |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 仅清除一个提供者的条目                     |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 删除单个条目                               |

**GET响应形状：**

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

## 操作注意事项

- **清理：** `cleanupReasoningCache()`清除过期的内存条目并运行`DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`。健康检查人员会定期拨打此电话。
- **崩溃恢复：**重新启动后，内存为空，但DB仍保留未过期的条目。给定`tool_call_id`的第一次查找是DB命中；随后的查找是内存命中。
- **没有推理，没有缓存：**当助手消息没有`reasoning_content` / `reasoning`字段时， `cacheReasoningFromAssistantMessage`返回`0` ，因此非思考响应不需要任何成本。
- **写入也被门控：** `chatCore.ts`中的两个调用站点（非流式和流式）仅在`requiresReasoningReplay(provider, model)`是`true` —时调用`cacheReasoningFromAssistantMessage()`读取端检查的谓词相同。从未触及重放提供程序的安装将停止为每个带有推理的响应的写入、索引更新和try/catch付费。
- **非严格提供者：**当`requiresReasoningReplay`为`false`且目标格式为OpenAI时，翻译器**条状**传出消息中的任何`reasoning_content`字段— OpenAI聊天完成不接受它。

## Muse 不透明推理所有权

Muse (`muse-code`) 返回调用者绑定的不透明推理 (`encrypted_content`)。在不同的帐户或重新生成的凭据下重播它会在上游失败，因此本机OAuth请求使用会话级所有权而不是每个请求轮换（`src/sse/services/museSessionOwnership.ts`，在`src/sse/handlers/chat.ts`中强制执行）。显式选择的 API 密钥连接和仅 API 密钥配置将保留其现有路由，而无需此所有权模式。

- 每次都提供稳定的会话ID ： `x-omniroute-session-id`、 `x-omniroute-session`、 `x-session-id`或`x-codex-session-id`；或者在正文中使用`prompt_cache_key`、 `session_id`、 `conversation_id`或`metadata.session_id` （按优先顺序）。当两个或多个本机OAuth帐户处于活动状态时，缺失或空白IDs返回 400；对于单个OAuth帐户，没有任何内容可以轮换，因此此类请求会保持未固定的路由。范围包括调用者的OmniRoute API 密钥ID。
- 新的独立会话在 API 密钥连接策略允许的活动本机OAuth帐户之间循环，按连接ID排序。循环跳过连接冷却中的帐户，具有终端状态（`banned`、 `expired`、 `credits_exhausted`），或针对请求的模型进行模型锁定； Muse 上游故障像其他提供者一样记录冷却时间和断路器状态。显式强制连接会绕过新会话的循环，但无法覆盖现有所有者。
- 在所有者提供成功响应之前，所有者不可用的会话将被重新声明到正常帐户上。第一次成功响应后，会话将保持固定到该所有者，直到它闲置 30 天 (`MUSE_SESSION_IDLE_TTL_MS`)。
- 每个延续和工具结果转向都保持固定到会话所有者：连接、帐户身份和推理凭证生成，在上游尝试之前再次检查，包括凭证刷新重试。响应调用IDs/item引用和聊天完成工具调用IDs必须已针对该会话和生成进行记录。
- `muse_session_ownership`命名空间 (`src/lib/db/museSessionOwnership.ts`) 中的SQLite `key_value`记录在重新启动后保留所有权和旋转游标。每个声明和提供的响应都会刷新会话的活动标记；空闲时间超过`MUSE_SESSION_IDLE_TTL_MS`会话将被修剪（所有者 pin、服务标志和记录的opaque/reference哈希值），最多每 10 分钟一次且分批进行修剪，因此稍后重播其历史记录会因未知所有者而失败。记录包含连接IDs以及帐户身份、凭据、不透明内容和连续引用的哈希值，而不是机密或对话历史记录。客户必须保留并发送他们的完整历史记录和不透明的推理。
- 未知或外部不透明的推理、丢失的所有者、不可用的所有者帐户或记录历史记录的代更改失败，并通过显式4xx/503 —从不静默的跨帐户故障转移和从不放弃推理来关闭。
- 仅当会话没有记录可重放的历史记录时，才采用重复的同账户密钥；录制的会话一直失败关闭，直到重新开始。
- 空的上游响应（`upstream_empty_response` / `empty_response`，没有发送给调用者）最多在同一所有者上重试两次，先是 0.5 秒，然后是 1.5 秒（`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`）。如果所有尝试都是空的，则返回原始 502，没有冷却时间或断路器标记，因此不稳定的回复永远不会锁定所有者。
- 所有`muse-code`请求都会绕过语义缓存读取和写入，包括流式写入，因此缓存的不透明输出无法获取不同的会话所有者。

回归守卫： `tests/unit/muse-session-ownership.test.ts`、 `tests/unit/muse-session-ownership-retention.test.ts`、 `tests/unit/muse-empty-response-retry.test.ts`和`tests/unit/chatcore-semantic-cache.test.ts`。

## 参见

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —断路器、冷却时间、模型锁定
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) —诊断上游 400s
- 资料来源： `src/lib/db/reasoningCache.ts`、 `open-sse/services/reasoningCache.ts`、 `open-sse/translator/index.ts`
- 迁移： `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API路线： `src/app/api/cache/reasoning/route.ts`
- 原问题：#1628
