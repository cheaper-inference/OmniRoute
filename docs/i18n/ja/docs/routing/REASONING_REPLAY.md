# REASONING_REPLAY (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **真実の情報源:** `src/lib/db/reasoningCache.ts`、 `open-sse/services/reasoningCache.ts`**最終更新日:** 2026-06-28 — v3.8.40

OmniRoute 、思考モード モデルによって生成されたアシスタント`reasoning_content`をキャプチャし、上流のプロバイダーが要求したときにマルチターン リクエストで透過的に再生します。これにより、クライアントの会話履歴に前のターンの推論が欠けている場合に厳密なプロバイダーが発生させるHTTP 400 エラーが排除されます。

## これが存在する理由

いくつかの思考モードプロバイダーは、次のターンを拒否します。**前のアシスタント メッセージには元の`reasoning_content`が含まれています**。アップストリームは次のようなメッセージとともに 400 を返します。

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

ただし、一般的なクライアント (Cursor、 Cline、 Roo Code、 OpenAI SDK) は、再生する履歴から`reasoning_content`を削除します。 OmniRouteサーバー側のキャッシュからリクエストを復元するため、アップストリームで認識されるリクエストは一貫しています。問題 #1628 では、プロセスの再起動後もキャッシュが存続するように、ハイブリッドmemory/SQLite永続性が導入されました。

## 建築

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

キャプチャは`open-sse/handlers/chatCore.ts` (2 つのサイト、2 つの`cacheReasoningFromAssistantMessage`呼び出しサイト) で行われます。再生は、スキーマ強制の後、ディスパッチ前に`open-sse/translator/index.ts`で行われます。

Plain (non-tool-call) assistant turns are keyed differently: `buildAssistantMessageCacheKey()` digests the session scope plus the normalized OpenAI-format transcript up to that turn, because DeepSeek requires the reasoning of _every_ prior turn once `tools` is present. For Responses-API targets (for example `opencode-go/deepseek-v4-flash`, routed to `/responses`) the upstream body carries `input`, not `messages`, so `translateRequest()` (`open-sse/translator/index.ts`) reports the pivot transcript it digested through a callback option and the capture sites digest that same transcript. The Responses replay pass runs on the OpenAI pivot for every source format, so Anthropic Messages clients (Claude → OpenAI → Responses) are replayed too.

## ストレージ—ハイブリッド メモリ+ SQLite

ホット パスは、クラッシュ リカバリとダッシュボードの可視性のために、 SQLiteテーブルに裏付けされたメモリ内`Map` (LRU-by-creation) を使用します。

| 層     | 実装                                         | 目的                                       |
| ------ | -------------------------------------------- | ------------------------------------------ |
| メモリ | `open-sse/services/reasoningCache.ts`の`Map` | 高速ルックアップ、200 で最も古いものを削除 |
| DB     | `reasoning_cache`テーブル (`src/lib/db/`)    | 再起動後も維持され、統計情報が表示されます |

書き込みは両方に行われます。読み取りは最初にメモリを参照し、次にDBにフォールバックします (DBヒットはメモリに戻されます)。 DB障害は致命的ではありません—メモリ内キャッシュがホット パスとして機能し続けます。

**デフォルト:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- 最大メモリエントリ数: `200` (`MAX_MEMORY_ENTRIES`)
- エビクション: 最も古い`createdAt`最初

## データベーススキーマ

移行: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

インデックス: `expires_at`、 `provider`、 `model`、 `created_at`。 `expires_at`は Unix エポック秒として保存されます。 SELECTレイヤーは、 `EXPIRES_AT_EPOCH_SQL`を介してレガシー テキスト値を正規化します。

## プロバイダー/モデルの検出

`requiresReasoningReplay(provider, model)` `true`を返すと、再生が有効になります。この関数は、 `open-sse/services/reasoningCache.ts`内の 2 つのリストをチェックします。

**プロバイダーIDs (完全一致、大文字と小文字は区別されません):**

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

**モデル正規表現パターン (大文字と小文字は区別されません):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i`および`/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro、オプションの`-free`サフィックス)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

新しい厳密なprovider/modelを追加するということは、これらのリストの 1 つに追加し、リプレイ インジェクションをアサートする単体テストを作成することを意味します。 PR説明では、変更の動機となった正確なアップストリーム 400 文字列を引用する必要があります。

## REST API

キャッシュは`src/app/api/cache/reasoning/route.ts`の下で 2 つのエンドポイントを公開します。どちらも管理認証 ( `@/shared/utils/apiAuth`からの`isAuthenticated` ) が必要です。

| 方法   | 終点                                                      | 説明                                                               |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | 統計+ページ分割されたエントリ                                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | フィルタリングされたリスト (`limit` `[1, 200]`に固定されている)    |
| DELETE | `/api/cache/reasoning`                                    | すべてをクリアし (メモリ+ DB)、 hit/missカウントをリセットします。 |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 1 つのプロバイダーのエントリのみをクリアします                     |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 単一のエントリを削除する                                           |

**GET応答形状:**

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

## 操作上の注意事項

- **掃除：** `cleanupReasoningCache()`期限切れのメモリ エントリをパージし、 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`を実行します。健康診断員が定期的に電話をかけます。
- **クラッシュリカバリ:**再起動後、メモリは空になりますが、 DB期限切れのエントリがまだ保持されています。特定の`tool_call_id`の最初の検索はDBヒットです。後続の検索はメモリ ヒットになります。
- **推論もキャッシュもありません:**アシスタント メッセージに`reasoning_content` / `reasoning`フィールドがない場合、 `cacheReasoningFromAssistantMessage` `0`を返すため、何も考えずに応答してもコストはかかりません。
- **書き込みもゲートされます。** `chatCore.ts`の両方の呼び出しサイト (非ストリーミングとストリーミング) は、 `requiresReasoningReplay(provider, model)`が`true` —である場合にのみ、 `cacheReasoningFromAssistantMessage()`を呼び出します。読み取り側が同じ述語をチェックします。リプレイ プロバイダーにまったくアクセスしないインストールでは、推論を伴うすべての応答について、書き込み、インデックスの更新、およびtry/catchに対する支払いが停止されます。
- **非厳密なプロバイダー:** `requiresReasoningReplay`が`false`で、ターゲット形式がOpenAIの場合、トランスレータは**ストリップ**送信メッセージ— OpenAIの`reasoning_content`フィールドは、チャット完了では受け入れられません。

## ミューズの不透明な推論の所有権

Muse (`muse-code`) は、呼び出し元に束縛された不透明な推論 (`encrypted_content`) を返します。別のアカウントまたは再生成された資格情報で再生するとアップストリームで失敗するため、ネイティブOAuthリクエストはリクエストごとのローテーション (`src/sse/services/museSessionOwnership.ts`、 `src/sse/handlers/chat.ts`で強制) ではなくセッション レベルの所有権を使用します。明示的に選択された API キー接続と API キーのみの構成は、この所有権モードなしで既存のルーティングを保持します。

- 安定したセッションID毎ターン提供します: `x-omniroute-session-id`、 `x-omniroute-session`、 `x-session-id`、または`x-codex-session-id`。あるいは、本文で`prompt_cache_key`、 `session_id`、 `conversation_id`、または`metadata.session_id`を使用します (この優先順位で)。 2 つ以上のネイティブOAuthアカウントがアクティブな場合、欠落しているか空白のIDs 400 を返します。単一のOAuthアカウントではローテーション先が何もないため、そのようなリクエストは固定されていないルーティングを維持します。スコープには、呼び出し元のOmniRoute API キーIDが含まれます。
- 新しい独立したセッションは、API キー接続ポリシーによって許可されたアクティブなネイティブOAuthアカウント間でラウンドロビンされ、接続IDによって順序付けされます。ラウンドロビンは、接続クールダウン中のアカウントをスキップし、端末ステータス (`banned`、 `expired`、 `credits_exhausted`)、または要求されたモデルがモデルロックされています。 Muse アップストリームの障害は、他のプロバイダーと同様に、クールダウンとブレーカーの状態を記録します。明示的に強制された接続は、新しいセッションのラウンドロビンをバイパスしますが、既存の所有者をオーバーライドすることはできません。
- 所有者が正常な応答を返すまで、所有者が使用できなくなったセッションは正常なアカウントに再要求されます。最初の正常な応答の後、セッションは 30 日間アイドル状態になるまで (`MUSE_SESSION_IDLE_TTL_MS`)、その所有者に固定されたままになります。
- すべての継続とツール結果のターンは、接続、アカウント ID、推論資格情報の生成など、セッション所有者に固定されたままになり、資格情報の更新の再試行を含むアップストリームの試行の前に再度チェックされます。応答呼び出しIDs/item参照とチャット完了ツール呼び出しIDsそのセッションおよび世代に対して記録されている必要があります。
- `muse_session_ownership`名前空間 (`src/lib/db/museSessionOwnership.ts`) 内のSQLite `key_value`レコードは、再起動後も所有権と回転カーソルを保持します。各クレームと提供された応答は、セッションのアクティビティ スタンプを更新します。 `MUSE_SESSION_IDLE_TTL_MS`よりも長いセッションアイドル状態は、多くても 10 分に 1 回、制限されたバッチでプルーニング (所有者ピン、提供されたフラグ、および記録されたopaque/referenceハッシュ) されるため、その後の履歴の再生は不明な所有者として失敗して閉じられます。レコードには、シークレットや会話履歴ではなく、接続IDsとアカウント ID のハッシュ、資格情報、不透明なコンテンツ、および継続参照が含まれます。クライアントは、完全な履歴と不透明な推論を保持し、送信する必要があります。
- 未知または外部の不透明な推論、所有者の欠落、使用できない所有者アカウント、または履歴が記録された世代変更は、明示的な4xx/503 —でフェールクローズされますが、サイレントクロスアカウントフェイルオーバーはなく、推論がドロップされることはありません。
- 再ミントされた同一アカウント キーは、セッションで再生可能な履歴が記録されなかった場合にのみ採用されます。記録されたセッションは、新しく開始されるまで失敗し続けます。
- 空のアップストリーム応答 (`upstream_empty_response` / `empty_response`、呼び出し元には何も出力されない) は、同じ所有者に対して最大 2 回、0.5 秒後、次に 1.5 秒後に再試行されます (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`)。すべての試行が空の場合は、クールダウンやブレーカー マークなしで元の 502 が返されるため、不安定な応答によって所有者がロックアウトされることはありません。
- すべての`muse-code`リクエストは、ストリーミング書き込みを含むセマンティック キャッシュの読み取りと書き込みをバイパスするため、キャッシュされた不透明な出力は別のセッション所有者を取得できません。

回帰ガード: `tests/unit/muse-session-ownership.test.ts`、 `tests/unit/muse-session-ownership-retention.test.ts`、 `tests/unit/muse-empty-response-retry.test.ts`、および`tests/unit/chatcore-semantic-cache.test.ts`。

## 関連項目

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) —サーキット ブレーカー、クールダウン、モデル ロックアウト
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) —によるアップストリーム 400 の診断
- ソース: `src/lib/db/reasoningCache.ts`、 `open-sse/services/reasoningCache.ts`、 `open-sse/translator/index.ts`
- 移行: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- APIルート: `src/app/api/cache/reasoning/route.ts`
- 元の問題: #1628
