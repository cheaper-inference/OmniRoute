# Reasoning Replay Cache (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **信頼できる情報源:** `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute は、思考モードのモデルによって生成されたアシスタントの `reasoning_content` を取得し、アップストリームプロバイダーが必要とする場合、複数ターンのリクエストで透過的に再利用します。これにより、クライアントの会話履歴に前のターンの推論が含まれていない場合に、厳格なプロバイダーが返す HTTP 400 エラーを回避できます。

## この機能が必要な理由

一部の思考モードプロバイダーは、**直前のアシスタントメッセージに元の `reasoning_content` が含まれていない限り**、後続ターンを拒否します。アップストリームは、次のようなメッセージとともに 400 を返します。

```
パラメーターが正しくありません: 思考モードの reasoning_content を API に返す必要があります。
```

しかし、一般的なクライアント（Cursor、Cline、Roo Code、OpenAI SDK）は、再送する履歴から `reasoning_content` を削除します。OmniRoute はサーバー側キャッシュからこれを復元し、アップストリームから見たリクエストの整合性を保ちます。Issue #1628 でメモリと SQLite を組み合わせたハイブリッド永続化が導入され、プロセスを再起動してもキャッシュが保持されるようになりました。

## アーキテクチャ

```
ターン N（assistant が生成）:
  → レスポンスに reasoning_content + tool_calls が含まれる
  → requiresReasoningReplay(provider, model) の場合: cacheReasoningFromAssistantMessage()
      すべての tool_call.id をキーとして（メモリ + DB）に書き込む
  → レスポンスをクライアントへ転送（クライアントが reasoning を保持する場合もしない場合もある）

ターン N+1（クライアントがフォローアップを送信）:
  → translator が requiresReasoningReplay(provider, model) === true を検出
  → tool_calls があり reasoning_content がない各 assistant メッセージについて:
      lookupReasoning(toolCalls[0].id) → メモリ → DB
      ヒット  → msg.reasoning_content = cached; recordReplay()
      ミス → msg.reasoning_content = ""（古い DeepSeek 向けのレガシーフォールバック）
  → upstream に一貫した履歴が渡される → 400 エラーを回避
```

キャプチャは `open-sse/handlers/chatCore.ts` 内の 2 か所（2 つの `cacheReasoningFromAssistantMessage` 呼び出し箇所）で行われます。リプレイは、スキーマ強制変換後かつディスパッチ前に、`open-sse/translator/index.ts` で行われます。

通常の（ツール呼び出しではない）assistant ターンには、異なるキーが使用されます。`buildAssistantMessageCacheKey()` は、セッションスコープと、そのターンまでの正規化された OpenAI 形式のトランスクリプトをダイジェストします。これは、`tools` が存在すると、DeepSeek が過去の _すべての_ ターンの reasoning を必要とするためです。Responses API ターゲット（たとえば `/responses` にルーティングされる `opencode-go/deepseek-v4-flash`）では、upstream のボディは `messages` ではなく `input` を保持するため、`translateRequest()`（`open-sse/translator/index.ts`）は、コールバックオプションを通じて、ダイジェストしたピボットトランスクリプトを報告し、キャプチャ箇所も同じトランスクリプトをダイジェストします。Responses のリプレイ処理は、すべてのソース形式に対して OpenAI ピボット上で実行されるため、Anthropic Messages クライアント（Claude → OpenAI → Responses）もリプレイされます。

## ストレージ — メモリ + SQLite のハイブリッド

ホットパスでは、クラッシュからの復旧とダッシュボードでの可視化のために SQLite テーブルでバックアップされた、インメモリの `Map`（作成日時に基づく LRU）を使用します。

| レイヤー | 実装                                             | 目的                                     |
| -------- | ------------------------------------------------ | ---------------------------------------- |
| メモリ   | `open-sse/services/reasoningCache.ts` 内の `Map` | 高速な検索、200 件で最も古い項目を削除   |
| DB       | `reasoning_cache` テーブル（`src/lib/db/`）      | 再起動後も永続化し、統計情報の基盤となる |

書き込みは両方に対して行われます。読み取りでは最初にメモリを参照し、その後 DB にフォールバックします（DB で見つかった項目はメモリへ再格納されます）。DB 障害は致命的ではありません。インメモリキャッシュは引き続きホットパスを処理します。

**デフォルト:**

- TTL: `2h`（`TTL_MS = 2 * 60 * 60 * 1000`）
- メモリ内の最大エントリ数: `200`（`MAX_MEMORY_ENTRIES`）
- エビクション: `createdAt` が最も古いものから

## データベーススキーマ

マイグレーション: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

インデックス: `expires_at`、`provider`、`model`、`created_at`。`expires_at` は Unix エポック秒として保存されます。SELECT レイヤーでは、`EXPIRES_AT_EPOCH_SQL` を使用して従来のテキスト値を正規化します。

## プロバイダー / モデルの検出

`requiresReasoningReplay(provider, model)` が `true` を返す場合、リプレイが有効になります。この関数は `open-sse/services/reasoningCache.ts` 内の2つのリストを確認します。

**プロバイダー ID（完全一致、大文字・小文字を区別しない）:**

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

**モデルの正規表現パターン（大文字・小文字を区別しない）:**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` および `/deepseek[-/]?v4[-.]pro/i`（V4 Flash / Pro、任意の `-free` サフィックス）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

新しい厳密なプロバイダーまたはモデルを追加するには、これらのリストのいずれかに追記し、リプレイの注入を検証するユニットテストを作成します。PR の説明には、変更の契機となったアップストリームの正確な 400 エラー文字列を記載する必要があります。

## REST API

キャッシュは `src/app/api/cache/reasoning/route.ts` 配下で2つのエンドポイントを公開します。どちらも管理認証（`@/shared/utils/apiAuth` の `isAuthenticated`）が必要です。

| メソッド | エンドポイント                                            | 説明                                                     |
| -------- | --------------------------------------------------------- | -------------------------------------------------------- |
| GET      | `/api/cache/reasoning`                                    | 統計情報 + ページネーションされたエントリ                |
| GET      | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | フィルタリングされた一覧（`limit` は `[1, 200]` に制限） |
| DELETE   | `/api/cache/reasoning`                                    | すべて（メモリ + DB）を消去し、ヒット/ミス回数をリセット |
| DELETE   | `/api/cache/reasoning?provider=deepseek`                  | 1つのプロバイダーのエントリのみを消去                    |
| DELETE   | `/api/cache/reasoning?toolCallId=call_abc`                | 単一のエントリを削除                                     |

**GET レスポンスの形式:**

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

## 運用上の注意事項

- **クリーンアップ:** `cleanupReasoningCache()` は期限切れのメモリエントリを削除し、`DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` を実行します。ヘルスチェックワーカーがこれを定期的に呼び出します。
- **クラッシュからの復旧:** 再起動後、メモリは空になりますが、DB には期限切れでないエントリが残ります。特定の `tool_call_id` に対する最初の検索は DB ヒットとなり、以降の検索はメモリヒットになります。
- **推論がなければキャッシュもなし:** アシスタントメッセージに `reasoning_content` / `reasoning` フィールドがない場合、`cacheReasoningFromAssistantMessage` は `0` を返すため、非思考レスポンスではコストが発生しません。
- **書き込みも制御対象:** `chatCore.ts` 内の両方の呼び出し箇所（非ストリーミングおよびストリーミング）は、`requiresReasoningReplay(provider, model)` が `true` の場合にのみ `cacheReasoningFromAssistantMessage()` を呼び出します。これは読み取り側が確認するものと同じ述語です。リプレイ対象のプロバイダーを一度も使用しない環境では、推論を含むすべてのレスポンスに対する書き込み、インデックス更新、および try/catch のコストが発生しなくなります。
- **非厳密プロバイダー:** `requiresReasoningReplay` が `false` で、ターゲット形式が OpenAI の場合、トランスレーターは送信メッセージから `reasoning_content` フィールドを**削除**します。OpenAI Chat Completions はこのフィールドを受け付けません。

## Muse の不透明な推論データの所有権

Muse（`muse-code`）は、呼び出し元に結び付いた不透明な推論データ（`encrypted_content`）を返します。これを別のアカウントや再発行された認証情報で再送すると上流で失敗します。そのため、ネイティブ OAuth リクエストでは、リクエストごとのローテーションではなくセッション単位の所有権を使います（`src/sse/services/museSessionOwnership.ts`、適用箇所は `src/sse/handlers/chat.ts`）。明示的に選んだ API キー接続と、API キーのみの構成は、この所有権モードを使わず従来のルーティングを維持します。

- すべてのターンで安定したセッション ID を指定してください。`x-omniroute-session-id`、`x-omniroute-session`、`x-session-id`、`x-codex-session-id`、または本文の `prompt_cache_key`、`session_id`、`conversation_id`、`metadata.session_id` を使います（優先順位はこの順です）。ネイティブ OAuth アカウントが二つ以上アクティブなとき、ID がないか空白なら 400 を返します。OAuth アカウントが一つだけなら切り替え先がないため、そのリクエストは固定先を持たないルーティングを維持します。スコープには、呼び出し元の OmniRoute API キー ID が含まれます。
- 新しい独立したセッションは、API キーの接続ポリシーで許可されたアクティブなネイティブ OAuth アカウント間を、接続 ID 順のラウンドロビンで割り当てます。接続クールダウン中、最終状態（`banned`、`expired`、`credits_exhausted`）、または要求モデルに対してモデルロックアウト中のアカウントは飛ばします。Muse の上流エラーも他のプロバイダーと同じようにクールダウンとブレーカーの状態へ記録されます。明示的に接続を強制した場合、新規セッションではラウンドロビンを迂回しますが、所有アカウントが成功した応答を返した後は、その所有者を上書きできません。
- 所有アカウントが成功した応答を返すまでは、その所有者が利用できなくなったセッションを正常なアカウントで再確保します。最初に成功した応答を返した後は、セッションが 30 日間アイドルになるまでその所有者に固定されます（`MUSE_SESSION_IDLE_TTL_MS`）。
- 継続リクエストとツール結果のターンはすべて、セッションの所有者に固定されます。接続、アカウント識別情報、推論用認証情報の世代を、認証情報更新後の再試行を含む各上流試行の前に再確認します。Responses の呼び出し ID・項目参照と Chat Completions のツール呼び出し ID は、そのセッションと世代について記録済みでなければなりません。
- `muse_session_ownership` 名前空間の SQLite `key_value` レコード（`src/lib/db/museSessionOwnership.ts`）が、再起動をまたいで所有権とローテーションカーソルを保持します。確保のたび、応答を返すたびにセッションのアクティビティ時刻を更新します。`MUSE_SESSION_IDLE_TTL_MS` より長くアイドルのセッションは、最大でも 10 分に一度、件数を制限したバッチで削除されます（所有者の固定、応答済みフラグ、記録済みの不透明データ・参照のハッシュ）。そのため、後で履歴を再送しても、所有者不明として安全側に倒して拒否します。レコードに含まれるのは接続 ID と、アカウント識別情報、認証情報、不透明な内容、継続参照のハッシュであり、秘密情報や会話履歴ではありません。クライアントは完全な履歴と不透明な推論データを保持して送信する必要があります。
- 不透明な推論データが未知または別の所有者に属する場合、所有者が存在しない場合、所有アカウントが利用できない場合、または履歴が記録済みの状態で世代が変わった場合は、安全側に倒して明示的な 4xx/503 で拒否します。別アカウントへの無言のフェイルオーバーや、推論データの破棄は一切行いません。
- 同一アカウントの再発行キーを採用できるのは、そのセッションに再送可能な履歴が記録されていない場合だけです。履歴が記録されたセッションは、新しく開始し直すまで安全側に倒して拒否し続けます。
- 空の上流応答（`upstream_empty_response` / `empty_response`、呼び出し元には何も出力されない）は、同じ所有者で最大二回再試行します。待ち時間は順に 0.5 秒、1.5 秒です（`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`）。すべての試行が空なら、クールダウンやブレーカーへの記録を行わず元の 502 を返します。一時的に不安定な応答によって所有者がロックアウトされることはありません。
- すべての `muse-code` リクエストは、ストリーミング時の書き込みを含め、セマンティックキャッシュの読み取りと書き込みを迂回します。そのため、キャッシュされた不透明な出力に別のセッション所有者が割り当てられることはありません。

回帰防止テスト: `tests/unit/muse-session-ownership.test.ts`、`tests/unit/muse-session-ownership-retention.test.ts`、`tests/unit/muse-empty-response-retry.test.ts`、`tests/unit/chatcore-semantic-cache.test.ts`。

## 関連項目

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — サーキットブレーカー、クールダウン、モデルのロックアウト
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — アップストリームの 400 エラーの診断
- ソース: `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`、`open-sse/translator/index.ts`
- マイグレーション: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ルート: `src/app/api/cache/reasoning/route.ts`
- 元の Issue: #1628
