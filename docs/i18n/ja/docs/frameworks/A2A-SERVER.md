# OmniRoute A2A Server Documentation (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — インテリジェントルーティングエージェントとしての OmniRoute

A2A インターフェースには、次の 2 つの形態があります。

- `POST /a2a` の **JSON-RPC 2.0**（標準エントリーポイント。`src/app/a2a/route.ts` で定義）。
- ダッシュボードおよびツール向けの `/api/a2a/*` 配下の **REST**（ステータス、タスク一覧、キャンセル）。

タスクは `A2ATaskManager`（`src/lib/a2a/taskManager.ts`、デフォルト TTL は 5 分）によって追跡されます。スキルは `src/lib/a2a/taskExecution.ts` 内の `A2A_SKILL_HANDLERS` を介してディスパッチされます。

## エージェントの検出

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute の機能、スキル、認証要件を記述したエージェントカードを返します。

エージェントカードの `version` フィールドは `process.env.npm_package_version` から取得されるため（`src/app/.well-known/agent.json/route.ts:13` を参照）、リリースのたびに `package.json` と自動的に同期されます。

---

## 認証

すべての `/a2a` リクエストでは、`Authorization` ヘッダーを介した API キーが必要です。

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

サーバーに API キーが設定されていない場合、認証はバイパスされます。

## 有効化

A2A は **Endpoints → A2A** トグルで制御され、デフォルトでは無効です。無効な場合、
`GET /api/a2a/status` は `status: "disabled"` および `online: false` を報告し、`POST /a2a`
への JSON-RPC 呼び出しは、JSON-RPC エラーコード `-32000` とともに HTTP 503 を返します。

---

## JSON-RPC 2.0 メソッド

### `message/send` — 同期実行

スキルにメッセージを送信し、完全なレスポンスを待機します。

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

`smart-routing` の場合、`metadata.combo` はゲートウェイリクエストにおいて
`metadata.model` を明示的に上書きします。無視される `x-combo` JSON フィールドとしてではなく、
実際の `model` として送信されます。ゲートウェイの通常の API キー認証および
ターゲットごとの認可は引き続き適用されます。無効または空のコンボは拒否されます。

結果には、`requested_combo`（呼び出し元の意図）、`dispatched_model`
（実際のゲートウェイリクエスト）、`response_model`（ゲートウェイのレスポンス）、
および `confirmed_combo` が含まれます。最後のフィールドは、ゲートウェイがコンボを明示的に
識別しない限り `null` です。A2A の決定ログでは、実行は確認済みのコンボにのみ帰属され、
未確認のリクエストは `requestedCombo` として保持されます。

**レスポンス:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — SSE ストリーミング

`message/send` と同様ですが、リアルタイムストリーミング用の Server-Sent Events を返します。

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE イベント:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — タスクステータスの照会

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — タスクのキャンセル

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 利用可能なスキル

OmniRoute 、 `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`に接続された 6 つのA2Aスキルを公開します。各スキル モジュールは`src/lib/a2a/skills/`に存在します。

| スキル               | ID                   | 説明                                                                                                                                                                          | タグ                       | 例                                                       |
| :------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------------------------------------------- |
| スマートルーティング | `smart-routing`      | OmniRouteのコンボ エンジン+スコアリングを使用して、最適なprovider/comboを介してプロンプトをルーティングします。                                                               | ルーティング、プロバイダー | 「このプロンプトを最適なモデル経由でルーティングします」 |
| クォータ管理         | `quota-management`   | プロバイダーごとのクォータ状態をレポートし、発信者がいつthrottle/switchを行うかを決定するのに役立ちます                                                                       | クォータ、プロバイダー     | 「人族の割り当てを確認してください」                     |
| プロバイダーの検出   | `provider-discovery` | インストールされているプロバイダーと機能、無料利用枠フラグ、 OAuthステータスをリストします。                                                                                  | プロバイダー、検出         | 「どんなプロバイダーが利用できるの？」                   |
| コスト分析           | `cost-analysis`      | カタログ+の最近の使用状況を考慮してrequest/conversationのコストを見積もります                                                                                                 | 費用、使い方               | 「この会話にかかる費用を見積もってください」             |
| 健康レポート         | `health-report`      | プロバイダーごとにサーキット ブレーカー、クールダウン、ロックアウト状態を集約します                                                                                           | 健康、回復力               | 「すべてのプロバイダーの健康状態を表示」                 |
| リスト機能           | `list-capabilities`  | 完全な 45 エントリのエージェント スキル カタログ (23 API + 21 CLI + 1 構成) を、コンテキスト インジェクション用の生のSKILL.md URLsを含むマークダウン テーブルとして返します。 | カタログ、発見、スキル     | 「すべてのOmniRoute機能をリストする」                    |

> エージェント カードは、ライブ 382 プロバイダー カタログと一致させておく必要があります。プロバイダー数とfree/no-authメタデータは、ランタイム レジストリから取得されます。

### `list-capabilities` スキルの詳細

`list-capabilities` スキルは、API 呼び出しを送信する前に OmniRoute が公開している機能を検出する必要がある外部エージェントに特に役立ちます。このスキルは、構造化された Markdown テーブルアーティファクトを返します。

```
| ID | 名前 | カテゴリ | 領域 | エンドポイント／コマンド | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | 認証とセッション | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

各行には `rawUrl` 列が含まれているため、エージェントは完全な SKILL.md をすぐに取得できます。`metadata.totalSkills` フィールドはカタログのサイズ（現在は 45）と一致します。実装: `src/lib/a2a/skills/listCapabilities.ts`。[AGENT-SKILLS.md](./AGENT-SKILLS.md) も参照してください。

---

## REST API（補助）

JSON-RPC エンドポイント `/a2a` が正式な A2A エントリーポイントです。以下の REST エンドポイントは、ダッシュボードや外部ツール向けの補助的なアクセスを提供します。

| Endpoint                     | Method | Description                                                     | Auth                                                                                    |
| :--------------------------- | :----- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | サーバーの状態、登録済みスキル                                  | （公開）                                                                                |
| `/api/a2a/tasks`             | GET    | フィルター付きでタスクを一覧表示                                | 管理用認証または API キー（下記参照）                                                   |
| `/api/a2a/tasks/[id]`        | GET    | ID でタスクを取得                                               | 管理用認証または API キー（下記参照）                                                   |
| `/api/a2a/tasks/[id]/cancel` | POST   | 実行中のタスクをキャンセル                                      | 管理用認証または API キー（下記参照）                                                   |
| `/.well-known/agent.json`    | GET    | エージェントカード（A2A ディスカバリー）                        | （公開、3600 秒間キャッシュ）                                                           |
| `/api/a2a/tasks`             | POST   | OmniConductor フリートへのインバウンド委任（Conductor PRD RF5） | `GET` と同じ。`REQUIRE_API_KEY` がオフの場合は `OMNIROUTE_API_KEY` も必要；`a2aEnabled` |

`/api/a2a/tasks*` ルートを通過できるユーザーは、ログインおよび API キーの設定によって決まります。

- `requireLogin=true`（デフォルト）の場合、ミドルウェアは管理用認証情報（ダッシュボードセッション、`manage` スコープの API キー、`oma_` アクセストークン）と `OMNIROUTE_API_KEY` のみを許可します。通常の推論キーでは `403` になります。`Authorization` ヘッダーでは、ミドルウェアは `OMNIROUTE_API_KEY` を `Bearer <key>` として指定した場合のみ受け付けます。キーのみを指定した場合や `Bearer` の後にタブを入れた場合は `401` になります。
- `requireLogin=false`、またはオンボーディング前のループバックウィンドウの場合：`REQUIRE_API_KEY=true` では、有効な OmniRoute API キーまたは管理用認証情報が受け付けられ、匿名の呼び出し元は `401` になります。`REQUIRE_API_KEY` がオフの場合、ルートは公開されます。
- `POST /api/a2a/tasks` では、`REQUIRE_API_KEY` がオフでその変数が設定されている場合、`Authorization` ヘッダーに `OMNIROUTE_API_KEY` も必要です。`x-api-key` などの他のヘッダーはここでは認証情報として扱われません。ログインがオフの場合、またはオンボーディング前は、`Bearer` プレフィックスの有無にかかわらずキーが受け付けられます。ログインがオンの場合、ミドルウェアを通過できるのは `Bearer <key>` の形式のみです。

認証情報が必要な場合、`read` スコープの `oma_` トークンは `GET` に対してのみ機能します。

**インバウンド Conductor 委任（`POST /api/a2a/tasks`）：** 外部の A2A エージェントは、OmniRoute を介して OmniConductor フリートにコーディング作業を委任します。本文：`{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — 委任できるのは Conductor フリートのスキル（Agent Card で告知されているもの）のみです。`metadata.conductor.repo.url` は必須です（フリートは git リポジトリ上で作業します）。このルートは、サーバー側の `CONDUCTOR_ORCHESTRATOR_TOKEN`（フォールバックは `CONDUCTOR_HUB_TOKEN`）を使用してハブの `POST /v1/tasks` に変換し、`201 { conductor_task_id, state: "submitted" }` を返します。タスクの状態は SSE→A2A ミラー（RF1）経由で返され、`GET /api/a2a/tasks?skill=conductor` で確認できます。

## 新しいスキルの追加

1. **スキルファイルを作成:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` という非同期関数をエクスポートします。`smartRouting.ts` などの既存スキルの形式に従ってください。スキルが HTTP 経由で OmniRoute にコールバックする場合は、`src/lib/a2a/selfLoopAuth.ts` の `buildSelfLoopHeaders(caller)` を使用してヘッダーを構築し、`OMNIROUTE_API_KEY` ではなく A2A 呼び出し元のキーで呼び出しが実行されるようにします。また、リダイレクトによってキーが送信されないよう、`fetch` に `redirect: "error"` を渡してください。ヘルパーはヘッダーのみを構築するため、各スキルでリダイレクトポリシーを設定します。解決されたベース URL が、プライベートネットワーク外の平文の http（ループバック、コンテナまたはサービス名、プライベートアドレスは使用可能）である場合、または認証情報を含む場合、キーを付与する代わりに `UnsafeSelfLoopTargetError` をスローします。そのため、拒否された呼び出しを握りつぶすスキルでは、このエラーを再スローする必要があります。

2. **ハンドラーを登録:** `src/lib/a2a/taskExecution.ts` の `A2A_SKILL_HANDLERS` にエントリを追加します。

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...既存のスキル
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Agent Card に公開:** `/.well-known/agent.json` および `/.well-known/agent-card.json` で共有される `src/lib/a2a/agentCardMetadata.ts` の `skills` 配列に追加します。

   ```json
   {
     "id": "your-skill",
     "name": "スキル名",
     "description": "簡潔で意図に沿った説明",
     "tags": ["routing", "quota"],
     "examples": ["自然言語による呼び出しの例"]
   }
   ```

4. **テストを作成:** `tests/unit/a2a-<your-skill>.test.ts`。正常系とエラー系をカバーします。

5. このファイルの `Available Skills` テーブルに新しいスキルを**文書化**します。

## タスクの TTL

タスクは `ttlMinutes`（デフォルトは 5 分）後に期限切れになります。これは `src/lib/a2a/taskManager.ts:82` にある `A2ATaskManager` のコンストラクターで設定されます。カスタマイズするには、`A2ATaskManager` のインスタンス化部分をフォークし、別の値を渡します（例：TTL を 15 分にする場合は `new A2ATaskManager(15)`）。バックグラウンドのインターバル処理が、期限切れのタスクを 60 秒ごとに削除します。

---

## タスクのライフサイクル

```
送信済み → 処理中 → 完了
                  → 失敗
                  → キャンセル済み
```

- タスクはデフォルトで 5 分後に期限切れになります（[タスクの TTL](#task-ttl)を参照）
- 終端状態：`completed`、`failed`、`cancelled`
- イベントログには、すべての状態遷移が記録されます

---

## エラーコード

| コード | 意味                                  |
| :----- | :------------------------------------ |
| -32700 | 解析エラー（無効な JSON）             |
| -32600 | 無効なリクエスト / 認証されていません |
| -32601 | メソッドまたはスキルが見つかりません  |
| -32602 | 無効なパラメーター                    |
| -32603 | 内部エラー                            |
| -32000 | A2A エンドポイントが無効です          |

---

## 統合例

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
