# REASONING_REPLAY (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md)

---

> **事實來源：** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`**最後更新：** 2026-06-28 — v3.8.40

OmniRoute捕捉由思維模式模型產生的助手`reasoning_content` ，並在上游提供者需要時在多輪請求上透明地重播它。這消除了嚴格的提供者在客戶端的對話歷史記錄缺少前一輪推理時引發的HTTP 400 錯誤。

## 為什麼存在

一些思維模式提供者拒絕採取後續行動，除非**之前的助理訊息包括原來的`reasoning_content`** 。上游返回 400 並包含以下訊息：

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

但典型的客戶端（Cursor、 Cline、 Roo Code 、 OpenAI SDK）會將`reasoning_content`從它們重播的歷史記錄中刪除。 OmniRoute從伺服器端快取中恢復它，因此上游看到的請求是一致的。 Issue #1628 引入了混合memory/SQLite持久性，因此快取可以在進程重新啟動後繼續存在。

## 建築學

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

捕獲發生在`open-sse/handlers/chatCore.ts` （兩個站點，兩個`cacheReasoningFromAssistantMessage`呼叫站點）。重播發生在`open-sse/translator/index.ts`模式強制之後但分派之前。

普通（非工具呼叫）協助輪次的鍵控方式不同： `buildAssistantMessageCacheKey()`消化會話範圍加上該輪次之前的規範化 OpenAI 格式記錄，因為一旦`tools`存在， DeepSeek就需要對_每個_先前輪次進行推理。對於 Responses-API 目標（例如`opencode-go/deepseek-v4-flash`，路由到`/responses`），上游主體攜帶`input`，而不是`messages`，因此`translateRequest()` (`open-sse/translator/index.ts`) 報告它通過回調選項消化的樞軸轉錄本，並且捕獲站點消化相同的轉錄本。對於每種來源格式，回應重播過程都在OpenAI樞軸上運行，因此Anthropic訊息用戶端（Claude → OpenAI →回應）也會重播。

## 儲存—混合記憶體+ SQLite

熱路徑使用由SQLite表支援的記憶體中`Map` （LRU-by-creation），以實現崩潰復原和儀表板可見性。

| 層   | 執行                                           | 目的                             |
| ---- | ---------------------------------------------- | -------------------------------- |
| 記憶 | `open-sse/services/reasoningCache.ts`中的`Map` | 快速查找，驅逐最舊的 200         |
| DB   | `reasoning_cache`表（`src/lib/db/`）           | 重新啟動後仍然存在，驅動統計數據 |

寫入到兩者。首先讀取查詢記憶體，然後回退到DB （DB命中將提升回記憶體）。 DB故障不是致命的—記憶體快取繼續為熱路徑提供服務。

**預設值:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- 最大記憶體條目： `200` (`MAX_MEMORY_ENTRIES`)
- 驅逐：最舊的`createdAt`首先

## 資料庫結構定義

遷移： `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

索引： `expires_at`、 `provider`、 `model`、 `created_at`。 `expires_at`儲存為 Unix 紀元秒； SELECT層透過`EXPIRES_AT_EPOCH_SQL`標準化傳統文字值。

## 提供者/型號檢測

當`requiresReasoningReplay(provider, model)`返回`true`時啟用重播。此函數檢查`open-sse/services/reasoningCache.ts`中的兩個列表。

**提供者IDs （精確匹配，不區分大小寫）：**

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

**模型正規表示式模式（不區分大小寫）：**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i`和`/deepseek[-/]?v4[-.]pro/i` （V4 Flash/Pro，可選`-free`後綴）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

新增的嚴格provider/model意味著附加到這些清單之一併編寫斷言重播注入的單元測試。 PR描述應引用引發變更的確切上游 400 字串。

## REST API

快取在`src/app/api/cache/reasoning/route.ts`下方公開兩個端點。兩者都需要管理身份驗證（來自`@/shared/utils/apiAuth`的`isAuthenticated` ）。

| 方法   | 端點                                                      | 描述                                         |
| ------ | --------------------------------------------------------- | -------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | 統計+分頁條目                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 過濾列表（`limit`固定到`[1, 200]`）          |
| DELETE | `/api/cache/reasoning`                                    | 清除所有內容（記憶體+ DB）並重置hit/miss計數 |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 僅清除一個提供者的條目                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 刪除單一條目                                 |

**GET回應形狀：**

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

## 操作注意事項

- **清理：** `cleanupReasoningCache()`清除過期的記憶體條目並執行`DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`。健康檢查人員會定期撥打此電話。
- **崩潰恢復：**重新啟動後，記憶體為空，但DB仍保留未過期的條目。給定`tool_call_id`的第一次查找是DB命中；隨後的查找是記憶體命中。
- **沒有推理，沒有快取：**當助手訊息沒有`reasoning_content` / `reasoning`欄位時， `cacheReasoningFromAssistantMessage`返回`0` ，因此非思考回應不需要任何成本。
- **寫入也被門控：** `chatCore.ts`中的兩個呼叫站點（非流式和流式）僅在`requiresReasoningReplay(provider, model)`是`true` —時呼叫`cacheReasoningFromAssistantMessage()`讀取端檢查的謂詞相同。從未觸及重播提供者的安裝將停止為每個帶有推理的回應的寫入、索引更新和try/catch付費。
- **非嚴格提供者：**當`requiresReasoningReplay`為`false`且目標格式為OpenAI時，翻譯器**條狀**傳出訊息中的任何`reasoning_content`欄位— OpenAI聊天完成不接受它。

## Muse 不透明推理所有權

Muse (`muse-code`) 傳回呼叫者綁定的不透明推理 (`encrypted_content`)。在不同的帳戶或重新產生的憑證下重播它會在上游失敗，因此本機OAuth請求使用會話級所有權而不是每個請求輪換（`src/sse/services/museSessionOwnership.ts`，在`src/sse/handlers/chat.ts`中強制執行）。明確選擇的 API 金鑰連接和僅 API 金鑰配置將保留其現有路由，而無需此所有權模式。

- 每次提供穩定的會話ID ： `x-omniroute-session-id`、 `x-omniroute-session`、 `x-session-id`或`x-codex-session-id`；或在正文中使用`prompt_cache_key`、 `session_id`、 `conversation_id`或`metadata.session_id` （依優先順序）。當兩個或多個本機OAuth帳戶處於活動狀態時，缺失或空白IDs傳回 400；對於單一OAuth帳戶，沒有任何內容可以輪換，因此此類請求會保持未固定的路由。範圍包括呼叫者的OmniRoute API 金鑰ID。
- 新的獨立會話在 API 金鑰連線策略允許的活動本機OAuth帳戶之間循環，按連線ID排序。循環跳過連線冷卻中的帳戶，具有終端狀態（`banned`、 `expired`、 `credits_exhausted`），或針對請求的模型進行模型鎖定； Muse 上游故障像其他提供者一樣記錄冷卻時間和斷路器狀態。明確強制連線會繞過新會話的循環，但無法覆蓋現有擁有者。
- 在所有者提供成功回應之前，所有者不可用的會話將被重新聲明到正常帳戶上。第一次成功回應後，會話將保持固定到該所有者，直到它閒置 30 天 (`MUSE_SESSION_IDLE_TTL_MS`)。
- 每個延續和工具結果轉向都保持固定到會話所有者：連接、帳戶身份和推理憑證生成，在上游嘗試之前再次檢查，包括憑證刷新重試。回應呼叫IDs/item引用和聊天完成工具呼叫IDs必須已針對該會話和生成進行記錄。
- `muse_session_ownership`命名空間 (`src/lib/db/museSessionOwnership.ts`) 中的SQLite `key_value`記錄在重新啟動後保留所有權和旋轉遊標。每個聲明和提供的回應都會刷新會話的活動標記；空閒時間超過`MUSE_SESSION_IDLE_TTL_MS`會話將被修剪（所有者 pin、服務標誌和記錄的opaque/reference哈希值），最多每 10 分鐘一次且分批進行修剪，因此稍後重播其歷史記錄會因未知所有者而失敗。記錄包含連接IDs以及帳戶身分、憑證、不透明內容和連續引用的雜湊值，而不是機密或對話歷史記錄。客戶必須保留並發送他們的完整歷史記錄和不透明的推理。
- 未知或外部不透明的推理、丟失的所有者、不可用的所有者帳戶或記錄歷史記錄的代更改失敗，並通過顯式4xx/503 —從不靜默的跨帳戶故障轉移和從不放棄推理來關閉。
- 只有當會話沒有記錄可重播的歷史記錄時，才採用重複的同帳戶密鑰；錄製的會話一直失敗關閉，直到重新開始。
- 空的上游回應（`upstream_empty_response` / `empty_response`，沒有發送給呼叫者）最多在同一所有者上重試兩次，先是 0.5 秒，然後是 1.5 秒（`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`）。如果所有嘗試都是空的，則返回原始 502，沒有冷卻時間或斷路器標記，因此不穩定的回應永遠不會鎖定所有者。
- 所有`muse-code`請求都會繞過語義快取讀取和寫入，包括串流寫入，因此快取的不透明輸出無法取得不同的會話擁有者。

回歸守衛： `tests/unit/muse-session-ownership.test.ts`、 `tests/unit/muse-session-ownership-retention.test.ts`、 `tests/unit/muse-empty-response-retry.test.ts`和`tests/unit/chatcore-semantic-cache.test.ts`。

## 參見

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —斷路器、冷卻時間、模型鎖定
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) —診斷上游 400s
- 來源： `src/lib/db/reasoningCache.ts`、 `open-sse/services/reasoningCache.ts`、 `open-sse/translator/index.ts`
- 遷移： `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API路線： `src/app/api/cache/reasoning/route.ts`
- 原問題：#1628
