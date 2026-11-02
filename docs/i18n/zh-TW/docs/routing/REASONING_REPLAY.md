# Reasoning Replay Cache (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md)

---

> **事實來源：** `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 會擷取由思考模式模型產生的助理 `reasoning_content`，並在上游提供者要求時，於多輪請求中透明地重新帶入。這可避免因用戶端的對話歷史缺少上一輪推理內容，而導致嚴格的提供者回傳 HTTP 400 錯誤。

## 存在原因

有些思考模式提供者會拒絕後續輪次，除非**上一則助理訊息包含原始的 `reasoning_content`**。上游會回傳 400，並附帶如下訊息：

```
參數不正確：思考模式中的 reasoning_content 必須傳回 API。
```

但一般用戶端（Cursor、Cline、Roo Code、OpenAI SDK）會從重新傳送的歷史記錄中移除 `reasoning_content`。OmniRoute 會從伺服器端快取還原它，使上游看到的請求保持一致。Issue #1628 引入了記憶體/SQLite 混合持久化機制，讓快取可在程序重新啟動後繼續保留。

## 架構

```
第 N 輪（assistant 產生）：
  → 回應包含 reasoning_content + tool_calls
  → 若 requiresReasoningReplay(provider, model)：cacheReasoningFromAssistantMessage()
      寫入（記憶體 + DB），並以每個 tool_call.id 作為索引鍵
  → 將回應轉送給用戶端（其可能保留，也可能不保留推理內容）

第 N+1 輪（用戶端傳送後續訊息）：
  → 轉換器偵測：requiresReasoningReplay(provider, model) === true
  → 對每個具有 tool_calls 但沒有 reasoning_content 的 assistant 訊息：
      lookupReasoning(toolCalls[0].id) → 記憶體 → DB
      命中  → msg.reasoning_content = cached；recordReplay()
      未命中 → msg.reasoning_content = ""（適用於舊版 DeepSeek 的向後相容備援）
  → 上游取得一致的歷史記錄 → 不會出現 400
```

擷取發生於 `open-sse/handlers/chatCore.ts`（共兩處，即兩個 `cacheReasoningFromAssistantMessage` 呼叫位置）。重播發生於 `open-sse/translator/index.ts`，位於結構描述強制轉換之後、分派之前。

純文字（非工具呼叫）assistant 輪次採用不同的索引鍵：`buildAssistantMessageCacheKey()` 會對工作階段範圍，以及截至該輪為止經正規化的 OpenAI 格式對話記錄進行摘要，因為只要存在 `tools`，DeepSeek 就會要求提供_每一個_先前輪次的推理內容。對於 Responses API 目標（例如 `opencode-go/deepseek-v4-flash`，路由至 `/responses`），上游請求本文攜帶的是 `input`，而非 `messages`，因此 `translateRequest()`（`open-sse/translator/index.ts`）會透過回呼選項回報其進行摘要的樞紐對話記錄，而擷取位置也會對相同的對話記錄進行摘要。Responses 重播流程會針對每種來源格式在 OpenAI 樞紐上執行，因此 Anthropic Messages 用戶端（Claude → OpenAI → Responses）也會被重播。

## 儲存 — 記憶體 + SQLite 混合模式

熱路徑使用記憶體內的 `Map`（依建立時間採用 LRU），並以 SQLite 資料表作為後端，以便在當機後復原並提供儀表板可見性。

| 層級   | 實作                                             | 用途                                |
| ------ | ------------------------------------------------ | ----------------------------------- |
| 記憶體 | `open-sse/services/reasoningCache.ts` 中的 `Map` | 快速查詢，達到 200 筆時移除最舊項目 |
| DB     | `reasoning_cache` 資料表（`src/lib/db/`）        | 跨重新啟動持久保存，並提供統計資料  |

寫入會同時進入兩者。讀取時會先查詢記憶體，之後才回退至 DB（DB 命中項目會提升回記憶體）。DB 失敗不會造成致命錯誤——記憶體內快取會繼續服務熱路徑。

**預設值：**

- TTL：`2h`（`TTL_MS = 2 * 60 * 60 * 1000`）
- 記憶體項目上限：`200`（`MAX_MEMORY_ENTRIES`）
- 移除策略：優先移除 `createdAt` 最舊的項目

## 資料庫結構描述

遷移：`src/lib/db/migrations/033_create_reasoning_cache.sql`

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

索引：`expires_at`、`provider`、`model`、`created_at`。`expires_at` 以 Unix 紀元秒數儲存；SELECT 層透過 `EXPIRES_AT_EPOCH_SQL` 將舊版文字值正規化。

## 提供者 / 模型偵測

當 `requiresReasoningReplay(provider, model)` 回傳 `true` 時，即會啟用重播。此函式會檢查 `open-sse/services/reasoningCache.ts` 中的兩個清單。

**提供者 ID（完全相符，不區分大小寫）：**

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
- `/deepseek[-/]?v4[-.]flash/i` 和 `/deepseek[-/]?v4[-.]pro/i`（V4 Flash / Pro，可選的 `-free` 後綴）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

若要新增嚴格模式的提供者／模型，需將其附加至其中一個清單，並撰寫單元測試來斷言已注入重播內容。PR 說明應引用促成此變更的確切上游 400 錯誤字串。

## REST API

快取在 `src/app/api/cache/reasoning/route.ts` 下提供兩個端點。兩者都需要管理驗證（來自 `@/shared/utils/apiAuth` 的 `isAuthenticated`）。

| 方法   | 端點                                                      | 說明                                              |
| ------ | --------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | 統計資料 + 分頁項目                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 篩選後的清單（`limit` 限制在 `[1, 200]` 範圍內）  |
| DELETE | `/api/cache/reasoning`                                    | 清除所有內容（記憶體 + DB）並重設命中／未命中計數 |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 僅清除某一個提供者的項目                          |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 刪除單一項目                                      |

**GET 回應格式：**

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

- **清理：** `cleanupReasoningCache()` 會清除記憶體中已過期的項目，並執行 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`。健康檢查工作程序會定期呼叫此函式。
- **當機復原：** 重新啟動後，記憶體是空的，但 DB 仍會保留尚未過期的項目。首次查詢指定的 `tool_call_id` 時會命中 DB；後續查詢則會命中記憶體。
- **沒有推理，就不快取：** 當助理訊息沒有 `reasoning_content` / `reasoning` 欄位時，`cacheReasoningFromAssistantMessage` 會回傳 `0`，因此非思考型回應不會產生任何成本。
- **寫入也受條件限制：** `chatCore.ts` 中的兩個呼叫位置（非串流和串流）都只會在 `requiresReasoningReplay(provider, model)` 為 `true` 時呼叫 `cacheReasoningFromAssistantMessage()`——這與讀取端檢查的述詞相同。從不使用重播提供者的安裝環境，不必再為每個包含推理內容的回應支付寫入、索引更新及 try/catch 的成本。
- **非嚴格模式提供者：** 當 `requiresReasoningReplay` 為 `false` 且目標格式為 OpenAI 時，轉譯器會從傳出訊息中**移除**任何 `reasoning_content` 欄位——OpenAI Chat Completions 不接受此欄位。

## Muse 不透明推理的擁有權

Muse（`muse-code`）傳回與呼叫端綁定的不透明推理（`encrypted_content`）。使用其他帳戶或重新核發的憑證重播它會在上游失敗，因此原生 OAuth 請求採用工作階段層級的擁有權，而非逐請求輪替（`src/sse/services/museSessionOwnership.ts`，在 `src/sse/handlers/chat.ts` 中強制執行）。明確選取的 API 金鑰連線及僅使用 API 金鑰的設定保留既有路由，不使用這種擁有權模式。

- 每個輪次都應提供穩定的工作階段 ID：`x-omniroute-session-id`、`x-omniroute-session`、`x-session-id` 或 `x-codex-session-id`；也可在請求本文中使用 `prompt_cache_key`、`session_id`、`conversation_id` 或 `metadata.session_id`（依此優先順序）。當有兩個或更多作用中的原生 OAuth 帳戶時，缺失或空白 ID 會傳回 400；只有一個 OAuth 帳戶時沒有其他輪替目標，因此這類請求保持未固定路由。範圍包含呼叫端的 OmniRoute API 金鑰 ID。
- 新的獨立工作階段會在 API 金鑰連線政策允許的作用中原生 OAuth 帳戶間循序輪替，依連線 ID 排序。輪替會略過處於連線冷卻、終止狀態（`banned`、`expired`、`credits_exhausted`）或對請求模型已鎖定的帳戶；Muse 上游失敗與其他提供者一樣記錄冷卻和斷路器狀態。明確強制的連線會在新工作階段中略過輪替，但不能取代已提供過成功回應的擁有者。
- 在擁有者提供成功回應之前，若其無法使用，會將工作階段重新分配給健康帳戶。首次成功回應之後，工作階段固定到該擁有者，直到閒置滿 30 天（`MUSE_SESSION_IDLE_TTL_MS`）。
- 每次接續和工具結果輪次都固定到工作階段擁有者：連線、帳戶身分和推論憑證世代；在上游嘗試之前會再次檢查，包括憑證更新後的重試。Responses 呼叫 ID/項目參照和 Chat Completions 工具呼叫 ID 必須已針對該工作階段和世代記錄。
- SQLite `key_value` 記錄位於 `muse_session_ownership` 命名空間（`src/lib/db/museSessionOwnership.ts`），可在重新啟動之間保留擁有權和輪替游標。每次認領和提供回應都會更新工作階段活動時間戳記；閒置超過 `MUSE_SESSION_IDLE_TTL_MS` 的工作階段會被清理（擁有者固定、已回應旗標，以及記錄的不透明內容/參照雜湊），最多每 10 分鐘一次且分批限量執行，因此之後重播其歷程時會因擁有者未知而安全拒絕。記錄包含連線 ID，以及帳戶身分、憑證、不透明內容和接續參照的雜湊，不包含祕密或對話歷程。用戶端必須保留並傳送完整歷程和不透明推理。
- 對未知或外來的不透明推理、缺失的擁有者、無法使用的擁有者帳戶，或已有歷程記錄時發生的世代變更，系統會以明確的 4xx/503 安全拒絕；絕不會靜默跨帳戶容錯移轉，也絕不會捨棄推理。
- 同一帳戶重新核發的金鑰，只有在工作階段未記錄可重播歷程時才會採用；已有記錄的工作階段會繼續安全拒絕，直到重新開始。
- 空白上游回應（`upstream_empty_response` / `empty_response`，未向呼叫端輸出任何內容）最多在同一擁有者上重試兩次，分別等待 0.5 s 和 1.5 s（`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`）。如果所有嘗試均為空白，則傳回原始 502，不標記冷卻或斷路器，因此偶發空白回應不會鎖定擁有者。
- 所有 `muse-code` 請求都略過語意快取讀取和寫入，包括串流寫入，避免快取的不透明輸出被分配給其他工作階段擁有者。

迴歸保護：`tests/unit/muse-session-ownership.test.ts`、`tests/unit/muse-session-ownership-retention.test.ts`、`tests/unit/muse-empty-response-retry.test.ts` 和 `tests/unit/chatcore-semantic-cache.test.ts`。

## 另請參閱

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 斷路器、冷卻期、模型鎖定
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 診斷上游 400 錯誤
- 原始碼：`src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`、`open-sse/translator/index.ts`
- 遷移：`src/lib/db/migrations/033_create_reasoning_cache.sql`
- API 路由：`src/app/api/cache/reasoning/route.ts`
- 原始議題：#1628
