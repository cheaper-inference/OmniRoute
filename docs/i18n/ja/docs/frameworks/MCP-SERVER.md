# OmniRoute MCP Server Documentation (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> ルーティング、キャッシュ、圧縮、メモリ、スキル、プロキシ、プール、Radar、コンテキストソースの操作にわたる110個のツールを備えた Model Context Protocol サーバー。
>
> 信頼できる情報源: `open-sse/mcp-server/server.ts` は `countUniqueMcpTools()` を使用して **110個の一意なツール**を算出します。45個の標準定義（6つの CCR ライフサイクルツール、agent-skills の3つのツール、`omniroute_radar_catalog`、`omniroute_x_search` を含む）に加え、memory (3)、skills (4)、GitHub skills (3)、pool (6)、gamification (8)、plugins (8)、Notion (6)、Obsidian (22)、local corpus (3)、RTK 専用の圧縮ツール2つで構成されます。

## インストール

OmniRoute MCP は組み込み済みです。次のコマンドで起動します。

```bash
omniroute --mcp
```

または、open-sse トランスポート経由で起動します。

```bash
# HTTP ストリーム可能トランスポート（ポート20130）
omniroute --dev  # MCP は /mcp エンドポイントで自動的に起動します
```

HTTP トランスポート（`sse` / `streamable-http`、ダッシュボードサーバーがプロセス内で提供）は
デフォルトでは無効で、以前は `/dashboard/mcp` ページからのみ切り替え可能でした。v3.8.51 以降、
CLI でも同等の操作が可能です。

```bash
omniroute mcp status                                  # 有効化/オンライン状態、トランスポート、ツール数
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # アクティブな sse/streamable-http セッションをリセット
```

`mcp enable`/`mcp disable` は、ダッシュボードが `/api/settings` 経由で切り替える
`mcpEnabled`（および任意の `mcpTransport`）と同じ設定に PATCH します。`mcp restart` は
`POST /api/mcp/restart` を呼び出します。これによりアクティブな `sse`/`streamable-http` セッションが
終了し、次のリクエストでクリーンに再初期化されます。MCP が無効な場合は
`409` を返し、`stdio` トランスポートの場合は `501` を返します（stdio クライアントは
独自のサブプロセスを管理するため、再起動するプロセス内ハンドルがありません）。

## トランスポート

MCP サーバーは、同じ `createMcpServer()` ファクトリに基づく3つのトランスポートを公開します。

| トランスポート    | 場所                                        | 用途                                                            |
| :---------------- | :------------------------------------------ | :-------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE 統合（Claude Desktop、Cursor など）                         |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | イベントストリームを必要とするブラウザ/エージェントクライアント |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | マルチセッション HTTP クライアント（`mcp-session-id` ヘッダー） |

アクティブな HTTP トランスポート（`sse` または `streamable-http`）は `mcpTransport` 設定で
選択されます。トランスポートを切り替えると、もう一方のトランスポートに存在するセッションが閉じられます。

### リモートアクセス（manage スコープによるバイパス）

`/api/mcp/*` は LOCAL_ONLY ティア（`src/server/authz/routeGuard.ts`）に属しており、デフォルトでは
ループバックホスト（`localhost`、`127.0.0.1`、`::1`）からのみアクセスできます。v3.8.2 以降は、
`manage` スコープを持つキーの `Authorization: Bearer <api-key>` を提示すれば、ループバック以外のクライアントも
接続できます。トンネル、リバースプロキシ、パブリックホスト名を経由してリモート MCP サーバーに
到達する唯一の方法です。

```bash
# manage スコープを付与するには、ダッシュボードの API Keys ページを開いてキーの
# 「Management Access」を有効にするか、作成時に scopes:["manage"] を POST します。

# その後、リモート MCP クライアントから接続します。
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

manage スコープのないキー（または Bearer がない場合）は `403 LOCAL_ONLY` を返します。兄弟プレフィックス
`/api/cli-tools/runtime/*` は意図的にバイパスできません。詳しくは
[Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) を参照してください。

### Origin の検証

認証後、`/api/mcp/*` へのすべてのリクエスト（トランスポート、および `status`、`tools`、`audit`、`restart` などの
管理ルート）は、呼び出し元が API キー、CLI トークン、ダッシュボードセッション、ログインを無効にした
匿名のループバック接続のいずれであっても、`Origin` ヘッダーの検証を受けます。これは MCP Streamable HTTP 仕様が
要求する DNS リバインディング対策です。

- **`Origin` ヘッダーなし** → 許可されます。OmniRoute CLI、SDK、IDE クライアントはこれを送信しません。
- **許可された `Origin`** → 任意のポートの `localhost`、`127.0.0.1`、`[::1]`、または OmniRoute 独自のパブリック Origin: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`、信頼されたリバースプロキシの転送 Origin（`OMNIROUTE_TRUST_PROXY`、ベース URL が設定されていない場合のみ）、あるいは直接接続されたループバック/LAN IP ホスト。`Host` ヘッダーだけでは Origin は決して信頼済みになりません。
- **その他の `Origin`（`null` を含む）** → JSON-RPC エラーボディとともに `403` を返します: `id: null`、`error.code: -32000`、`error.data.code: "INVALID_ORIGIN"`。有効な CSRF トークンを提示するダッシュボードセッションは、他のダッシュボード書き込みと同様に受け入れられます。

リバースプロキシの背後で提供されるブラウザ MCP クライアントには `OMNIROUTE_PUBLIC_BASE_URL` が必要です。
その他の Origin に対する許可リストはありません。CORS プリフライト（`OPTIONS`）は Origin の検証対象外ですが、
続いて送信されるリクエストは検証対象です。

## IDE 設定

Claude Desktop、Cursor、Cline、および互換性のある MCP クライアントのセットアップについては、[MCP クライアント設定](../guides/SETUP_GUIDE.md#mcp-client-configuration)を参照してください。

---

## 必須ツール（14）— フェーズ 1

| Tool                            | Scopes                | Description                                                                                                                |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | 稼働時間、メモリ、サーキットブレーカー、レート制限、キャッシュ統計                                                         |
| `omniroute_list_combos`         | `read:combos`         | 戦略を含む、設定済みのすべてのコンボ（メトリクスは任意）                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | 特定のコンボのパフォーマンスメトリクス                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | コンボを有効化または無効化                                                                                                 |
| `omniroute_create_combo`        | `write:combos`        | 既存のコンボ API を通じて、検証済みのコンボを作成                                                                          |
| `omniroute_check_quota`         | `read:quota`          | 使用済み／合計クォータ、残りの割合、リセット時刻、トークンの健全性                                                         |
| `omniroute_route_request`       | `execute:completions` | OmniRoute のルーティングを通じてチャット補完を送信                                                                         |
| `omniroute_cost_report`         | `read:usage`          | 期間別（セッション／日／週／月）のコストレポート                                                                           |
| `omniroute_list_models_catalog` | `read:models`         | 機能、ステータス、料金を含む完全なモデルカタログ                                                                           |
| `omniroute_radar_catalog`       | `read:radar`          | ローカルの署名済み Radar カタログ。プロバイダー／ファミリーによるフィルターは任意                                          |
| `omniroute_tool_search`         | `read:tools`          | 登録済み MCP カタログからツールを検出                                                                                      |
| `omniroute_web_search`          | `execute:search`      | 設定済みの検索プロバイダーを通じたウェブ検索。X／Twitter は対象外。                                                        |
| `omniroute_x_search`            | `execute:search`      | xAI／SuperGrok を通じて X を検索するか、Xquik API の結果には `xquik-search` を選択。選択したバックエンドの認証情報が必要。 |
| `omniroute_web_fetch`           | `execute:search`      | 設定済みのフェッチプロバイダーを通じてウェブコンテンツを取得                                                               |

## 高度なツール (11) — フェーズ 2

| ツール                             | スコープ                             | 説明                                                                                             |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | フォールバックツリーを使用したドライランのルーティングシミュレーション                           |
| `omniroute_set_budget_guard`       | `write:budget`                       | 劣化／ブロック／アラートのアクションを設定できるセッション予算                                   |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 実行時にコンボ戦略（priority/weighted/auto など）を更新                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` のレジリエンスプリセットを適用                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 実際の上流呼び出しを使用して、コンボ内のすべてのプロバイダーをライブテスト                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 レイテンシーとサーキットブレーカー状態を含むプロバイダーごとのメトリクス             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 予算／レイテンシーの制約に基づいてタスク種別に適したコンボを推奨                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | リクエストがプロバイダーにルーティングされた理由を説明（スコアリング要因 + フォールバック）      |
| `omniroute_get_session_snapshot`   | `read:usage`                         | セッション全体のスナップショット：コスト、トークン、上位モデル／プロバイダー、エラー、予算ガード |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 壊れたコンボ参照／孤立行など、データベースのドリフトを診断（および任意で自動修復）               |
| `omniroute_sync_pricing`           | `pricing:write`                      | 外部ソース（LiteLLM）から料金データを同期。`dryRun` に対応                                       |

## キャッシュツール (2)

| ツール                  | スコープ      | 説明                                                           |
| :---------------------- | :------------ | :------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | セマンティックキャッシュ、プロンプトキャッシュ、べき等性の統計 |
| `omniroute_cache_flush` | `write:cache` | キャッシュをグローバルに、または署名／モデル単位でフラッシュ   |

## 圧縮ツール (13)

| ツール                              | スコープ            | 説明                                                                                                    |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | 圧縮設定、分析サマリー、キャッシュ対応の統計（`analytics.mcpDescriptionCompression` メタデータを含む）  |
| `omniroute_compression_configure`   | `write:compression` | 圧縮モード、しきい値、目標比率、システムプロンプトの保持、MCP 説明の圧縮切り替えを設定                  |
| `omniroute_set_compression_engine`  | `write:compression` | アクティブなエンジン（off/caveman/rtk/stacked）と Caveman/RTK の強度を選択                              |
| `omniroute_list_compression_combos` | `read:compression`  | 名前付きの圧縮コンボとそのエンジンパイプラインを一覧表示                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | 圧縮コンボおよびエンジン別にグループ化した分析                                                          |
| `omniroute_ccr_store`               | `write:compression` | 呼び出し元ごとに分離されたコンテンツを有界インメモリ CCR ストアに保存し、マーカーと `ccr://` 参照を返す |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR コンテンツを完全な形式、または head、tail、lines、grep、stats モードで取得                          |
| `omniroute_ccr_inspect`             | `read:compression`  | コンテンツを返さずに、呼び出し元が所有する CCR メタデータを検査                                         |
| `omniroute_ccr_list`                | `read:compression`  | 呼び出し元が所有する CCR ブロックのページ分けされたメタデータを一覧表示                                 |
| `omniroute_ccr_delete`              | `write:compression` | 呼び出し元が所有する CCR ブロックを削除                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | 呼び出し元のスコープにおけるメモリ使用量、ライフサイクルカウンター、ストア制限を報告                    |
| `omniroute_rtk_discover`            | `read:compression`  | オプトインされた RTK 出力サンプル内の繰り返し発生するノイズを検出                                       |
| `omniroute_rtk_learn`               | `read:compression`  | オプトインされたサンプルから、レビュー可能な RTK フィルタードラフトを生成                               |

CCR エントリはインメモリのみで、再起動すると消失します。各ブロックの上限は 2 MiB、各
プリンシパルの上限は 16 MiB、グローバルストアの上限は 64 MiB です。エントリの TTL はデフォルトで
24 時間（最大 7 日間）です。MCP による完全取得の上限は 256 KiB です。これを超えるブロックは
範囲指定および grep モードで引き続き利用できます。保存、取得、一覧表示、検査、削除、統計は、
認証済み API キーのプリンシパルごとに分離されます。監査レコードにはハッシュとサイズのメタデータのみが
含まれ、コンテンツは含まれません。

`omniroute_compression_status` は、MCP の説明の圧縮を
`analytics.mcpDescriptionCompression` の下で個別に報告します。これらの値は、MCP の一覧表示可能な
説明（`tools`、`prompts`、`resources`、`resourceTemplates`）のメタデータサイズの推定値であり、プロバイダーの使用量レシートではありません。また、`source: "mcp_metadata_estimate"` としてマークされます。

### MCP アクセシビリティツリーフィルター（v3.8.0）

上記の圧縮ツールとは別に、OmniRoute には、MCP ブラウザー／アクセシビリティツールの
**ツール結果**をエージェントに返す前に圧縮する実行後フィルターが含まれています。このフィルター自体はツールではなく、詳細なアクセシビリティツリーまたはブラウザースナップショットのテキスト（2000 文字以上）を含むツール結果に対して透過的に実行されます。

主な動作：

- 30 行以上連続する同一の兄弟行を、先頭 + 末尾の要約に折りたたむ
- Playwright／computer-use に必要な `[ref=eXX]` アンカーを保持する
- サイズが大きすぎるテキスト（50,000 文字超）をナビゲーションヒント付きで強制的に切り詰める
- 期待される削減率：ブラウザースナップショットのペイロードで **60～80%**

設定：グローバル設定の `compression.mcpAccessibility`（マイグレーション 056）。
実装：`open-sse/services/compression/engines/mcpAccessibility/`。
詳細なドキュメント：[Compression Engines — MCP Accessibility Tree Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

これらのツールの基盤となるランタイム圧縮モデルについては、[Compression Engines](../compression/COMPRESSION_ENGINES.md) および [RTK Compression](../compression/RTK_COMPRESSION.md) を参照してください。

## 1Proxy ツール（3）

| ツール                      | スコープ       | 説明                                                                                    |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy マーケットプレイスから無料プロキシを取得（プロトコル／国／品質／上限フィルター） |
| `omniroute_oneproxy_rotate` | `read:proxies` | 戦略（`random` / `quality` / `sequential`）に基づいて次に利用可能なプロキシを取得       |
| `omniroute_oneproxy_stats`  | `read:proxies` | プールの統計、同期ステータス、プロトコルおよび国別の分布                                |

## メモリーツール（3）

`open-sse/mcp-server/tools/memoryTools.ts` に定義されています。認証とスコープは標準の MCP スコープパイプラインによって適用されます。

| ツール                    | スコープ       | 説明                                                                                            |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | トークン予算の適用を伴う、クエリ／タイプ／API キーによるメモリーの検索                          |
| `omniroute_memory_add`    | `write:memory` | 新しいメモリーエントリ（`factual` / `episodic` / `procedural` / `semantic`）を追加              |
| `omniroute_memory_clear`  | `write:memory` | API キーのメモリーを消去（タイプまたは `olderThan` タイムスタンプによる任意のフィルターに対応） |

## スキルツール（4）

`open-sse/mcp-server/tools/skillTools.ts` に定義されています。`src/lib/skills/registry` + `src/lib/skills/executor` を基盤としています。

| ツール                        | スコープ         | 説明                                                                               |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API キー、名前、または有効状態による任意のフィルタリングで登録済みスキルを一覧表示 |
| `omniroute_skills_enable`     | `write:skills`   | ID によって特定のスキルを有効または無効にする                                      |
| `omniroute_skills_execute`    | `execute:skills` | 指定された入力でスキルを実行し、実行レコードを返す                                 |
| `omniroute_skills_executions` | `read:skills`    | 最近のスキル実行履歴を一覧表示                                                     |

## Notion コンテキストソース（6）

`open-sse/mcp-server/tools/notionTools.ts` に定義されています。トークンは `src/lib/db/notion.ts` を介して `key_value` テーブルに保存されます。REST クライアントは `src/lib/notion/api.ts` にあります。設定 API は `src/app/api/settings/notion/route.ts` にあります。ダッシュボード UI は `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` にあります。

Endpoint ダッシュボードの **コンテキストソース** タブから、または REST API を使用して Notion 統合トークンを設定します。

```bash
# トークンを設定
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# ステータスを確認
curl http://localhost:20128/api/settings/notion

# 接続を解除
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ツール                       | スコープ       | 説明                                                               |
| :--------------------------- | :------------- | :----------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | すべてのページおよびデータベースを対象とした全文検索               |
| `notion_get_page`            | `read:notion`  | プロパティを含む ID によるページの取得                             |
| `notion_list_block_children` | `read:notion`  | ページまたはブロックの子ブロックを一覧表示                         |
| `notion_query_database`      | `read:notion`  | フィルター、ソート、ページネーションを使用したデータベースのクエリ |
| `notion_get_database`        | `read:notion`  | ID によるデータベーススキーマの取得                                |
| `notion_append_blocks`       | `write:notion` | 親ブロックに子ブロックを追加（1 リクエストあたり最大 100 件）      |

## エージェントスキルカタログツール（3）

`open-sse/mcp-server/tools/agentSkillTools.ts` で定義されています。`src/lib/agentSkills/catalog` によってバックアップされています。これらのツールは、45 エントリの Agent Skills ドキュメントカタログを MCP クライアントおよび外部エージェントに公開します。スコープ: `read:catalog`

| ツール                            | スコープ       | 説明                                                                                                                                                                         |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | オプションの `category`（api\|cli）および `area` フィルターを使用して、45 個すべてのエージェントスキルを一覧表示します。メタデータとカバレッジを返します                     |
| `omniroute_agent_skills_get`      | `read:catalog` | 正規の `id` によって単一スキルの完全なメタデータと SKILL.md の内容を取得します                                                                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | 23 個の API スキル、21 個の CLI スキル、1 個の config スキルについて、カタログの合計に対して SKILL.md ファイルがファイルシステム上に存在する数を示すカバレッジ統計を返します |

完全なカタログと外部エージェントによる利用方法については、[AGENT-SKILLS.md](./AGENT-SKILLS.md) を参照してください。

## 関連フレームワーク（v3.8.0）

上記の MCP ツールインベントリ（`countUniqueMcpTools()` によって計算された 110 個の一意なツール）は、ランタイムのルーティング、キャッシュ、圧縮、メモリ、スキル、プロキシ、コンテキストソースの操作に意図的に限定されています。v3.8.0 には、MCP サーバーとともに 2 つの隣接するフレームワークも提供されますが、これらは別途ドキュメント化されています。

### Cloud Agents

Cloud Agents は、codex-cloud、cursor-cloud、devin、jules で構成される、プロセス外で動作する AI コーディングエージェントです。LLM プロバイダーに使用されるものと同じ接続モデルを通じて OmniRoute に接続されます。これらは独自の REST サーフェス（`/api/v1/agents/*`）を介して公開され、MCP ツールカタログの一部ではありません
— Cloud Agent の呼び出しで MCP スコープが消費されることはありません。

- 実装: `src/lib/cloudAgent/`（`registry.ts`、`agents/codex.ts`、`agents/cursor.ts`、`agents/devin.ts`、`agents/jules.ts`）。
- ライフサイクル: `createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`。
- ドキュメント: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)。

### Guardrails

Guardrails は、チャットパイプライン内で適用される実行前／実行後フィルター（vision-bridge、pii-masker、prompt-injection）です。MCP ツール／ルートレイヤーに到達する前に実行され、監査パイプラインに構造化された違反情報を出力します。MCP ツールとして呼び出されることはありません。

- 実装: `src/lib/guardrails/`。
- ドキュメント: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)。

ブロックされたように見える MCP 呼び出しをデバッグする場合は、MCP 監査ログ（`scope_denied:*` エントリ）と Guardrails の監査証跡の両方を確認してください。リクエストは、MCP スコープ強制レイヤーに到達する**前に** Guardrail によって拒否される場合があります。

---

## REST API エンドポイント

| エンドポイント         | メソッド              | 説明                                                                                                         | 認証                       |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | サーバーのステータス: ハートビート、HTTP トランスポートの状態、監査アクティビティの概要                      | 管理（セッション／管理者） |
| `/api/mcp/tools`       | `GET`                 | ツールカタログ（名前、説明、スコープ、フェーズ、ソースエンドポイント）                                       | 管理                       |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE トランスポートエンドポイント（`mcpEnabled` + `mcpTransport === "sse"` によって制御）                     | API キー + スコープ        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ストリーム可能な HTTP トランスポート（`mcp-session-id` ヘッダーを使用し、`DELETE` でセッションを終了します） | API キー + スコープ        |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` の監査ログエントリ（フィルター: `limit`、`offset`、`tool`、`success`、`apiKeyId`）          | 管理                       |
| `/api/mcp/audit/stats` | `GET`                 | 集計された監査統計（`totalCalls`、`successRate`、`avgDurationMs`、上位ツール）                               | 管理                       |

ソースファイル: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`。

SSE とストリーム可能な HTTP の両トランスポートは、Settings（`mcpEnabled`）で MCP サーバーが有効化され、適切な `mcpTransport` が選択されるまでブロックされます。誤ったトランスポートが設定されている場合、ルートは HTTP 400 と設定を切り替えるよう促すヒントを返します。

---

## 認証とスコープ

MCP ツール呼び出しは、呼び出し元からスコープ文字列を読み取ります。このチェックは、相互に独立した 3 つの名前空間のいずれかで行われます。
あるチェッカーを通過しても、他のチェッカーを通過したことにはなりません。
ルールについては[3 つのスコープ名前空間](#three-scope-namespaces)を参照してください。
ツールカタログについては[MCP ツールスコープ](#mcp-tool-scopes)を参照してください。

### 3 つのスコープ名前空間

API キーの `manage`、MCP ツールの `read:compression`、`oma_live_…` アクセストークンの `read` は、3 つの異なる権限です。`read` アクセストークンを変更操作用の管理ルートに送信すると、HTTP 403
`Access token scope 'read' is insufficient; 'write' required.` が返されます。
そのランク付けを行うのが `scopeSatisfies` です。これは MCP テーブルを参照せず、MCP マッチャーもこれを参照しません。

| 名前空間           | 認証情報                                                                               | チェッカー       | 通過時に許可される内容                                     |
| :----------------- | :------------------------------------------------------------------------------------- | :--------------- | :--------------------------------------------------------- |
| API キー管理       | `api_keys.scopes`                                                                      | `hasManageScope` | その Bearer キーに対する管理 REST                          |
| API キーの追加権限 | 同じ配列内の、完全一致する 1 つの文字列                                                | 後述のヘルパー   | その 1 つの機能のみ                                        |
| MCP ツールスコープ | 同じ配列、なければ MCP `_meta`（HTTP/SSE のみ）、それもなければ `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | 強制適用が有効になっている場合の、そのツール               |
| アクセストークン   | `oma_live_…`                                                                           | `scopeSatisfies` | そのランクを必要とする、メソッドとパスに対応する管理ルート |

各認証情報の発行については、
[管理認証](../guides/MANAGEMENT-AUTH.md)を参照してください。

#### API キーのスコープ

1 つの `api_keys.scopes` 配列が 2 つの役割を担います。それぞれ異なる関数を使用します。

**管理 REST。** `manage` と `admin` は
`MANAGEMENT_API_KEY_SCOPES`（`src/shared/constants/managementScopes.ts`）のメンバーです。
`hasManageScope` が、そのキーによる管理ルートへのアクセスを認可します。これらのルートでは `admin` も管理機能を使用できます。ここでの `admin` はアクセストークンのランクではなく、MCP ツールスコープに展開されることもありません。

**追加文字列。** それぞれ完全一致のメンバーシップテストであり、すべて
`MANAGEMENT_API_KEY_SCOPES` の外部にあります。

| スコープ                       | 通過時に許可される内容                                                                                                                                                          |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | 非ループバックの `/api/mcp/` に対する LOCAL_ONLY 例外のみ（`hasMcpConnectOrManageScope`）。`manage` または `admin` を持つキーも、この例外を通過します。                         |
| `self:usage`                   | このキーに対する `GET /api/v1/me/status`（`src/app/api/v1/me/status/route.ts`）。`POST /api/keys` は作成時にこのスコープを追加します（`normalizeSelfServiceScopesForCreate`）。 |
| `self:account-quota`           | そのステータスのペイロード内にある、上流アカウントのクォータ（`src/lib/usage/apiKeySelfService.ts`）。ステータスルートには引き続き `self:usage` が必要です。                    |
| `policy:bypass-provider-quota` | このキーによる推論呼び出しで、プロバイダークォータポリシーをスキップします（`src/sse/handlers/chat.ts` の `hasProviderQuotaBypassScope`）。                                     |

#### マッチング

カタログは[MCP ツールスコープ](#mcp-tool-scopes)の下にあるテーブルです。
`src/shared/constants/mcpScopes.ts` の `MCP_SCOPE_LIST` をそのカタログとして扱わないでください。
これは元の型付きサブセットです。後から追加されたツールでは、さらに別のスコープ（`read:notion`、`read:skills`、`read:local-corpus` など）がテーブルの横で宣言されています。

`open-sse/mcp-server/scopeEnforcement.ts` の `evaluateToolScopes` は、必要なすべてのスコープが、付与されたスコープのいずれかと一致する場合に呼び出しを許可します。

- `*` は、すべての必要なスコープに一致します。
- `*` で終わる付与済みスコープは、アスタリスクより前のプレフィックスで始まる必要なスコープに一致します。`read:*` は `read:compression` に一致します。
- それ以外の付与済みスコープは、同一の必要な文字列にのみ一致します。

スコープが `["manage"]` のキーは、`read:compression` に対する `scopeMatches` に失敗します。
同じ呼び出しは、付与された文字列が `admin`、`mcp:connect`、`read`、`write` のいずれか 1 つだけの場合にも失敗します。末尾の `*` 以外に、MCP ツールスコープ間の階層はありません。

`OMNIROUTE_MCP_ENFORCE_SCOPES=true`（デフォルトは
`false`）でない限り、強制適用は無効です。無効な間は、`evaluateToolScopes` が呼び出しを許可し、カタログをスキップします。有効な場合、HTTP は Bearer キーの `api_keys.scopes` を `authInfo` として使用します（[キーごとの HTTP スコープバインディング](#per-key-http-scope-binding-7895)を参照）。キーのスコープを解決できない場合、付与済みスコープの集合は MCP `_meta` にフォールスルーします（HTTP/SSE 呼び出し元に対してのみ、HTTP 認証コンテキスト内で尊重されます。stdio 呼び出し元の `_meta` は、クライアントが制御しており、呼び出し元ごとのアイデンティティを持たないため無視されます）。それでもなければ `OMNIROUTE_MCP_SCOPES` にフォールスルーします。

#### アクセストークンのスコープ

`oma_live_…` トークン（`src/lib/accessTokens/scopes.ts`）には、`read`、`write`、または `admin` が含まれます。`scopeSatisfies` はランクとして機能します。`admin` は `write` と `read` を包含し、`write` は `read` を包含します。未知のスコープは何も包含しません。

`evaluateAccessTokenAuth`（`src/server/authz/accessTokenAuth.ts`）は、そのランクを `inferRequiredScope`（`src/server/authz/accessScopes.ts`）と比較します。

- `GET`、`HEAD`、`OPTIONS` には `read` が必要です。
- その他のすべてのメソッドには `write` が必要です。
- `ADMIN_SCOPE_PREFIXES` 内のパスには、すべてのメソッドで `admin` が必要です。`/api/mcp`
  はこのリストに含まれているため、`write` アクセストークンでは MCP HTTP
  サーフェスを呼び出すことができません。
- `ADMIN_MUTATION_PREFIXES` 内のパスには、ミューテーションの場合のみ `admin` が必要です。
- `ADMIN_MUTATION_EXACT_PATHS`（`/api/settings`、
  `/api/settings/require-login`）内のパスには、ミューテーションの場合のみ `admin` が必要です。また、対象はその完全一致するパスのみであり、その他の `/api/settings/*` サブルートでは引き続き `write` が必要です。

`PATCH /api/keys/{id}` はミューテーションですが、これらの admin リストには含まれていないため、
`read` トークンには 403 が返されます。
`Access token scope 'read' is insufficient; 'write' required.`
`write` または `admin` アクセストークンであれば、このルートを利用できます。ダッシュボード JWT、
ループバック CLI のマシン ID トークン、`manage` または `admin` を持つ API キーは
別の分岐に進むため、このランクによる制限を受けません。

`/api/mcp` に対して `scopeSatisfies` を通過したアクセストークンは、管理ゲートを通過しただけです。ツール呼び出しでは、引き続き API キーのスコープに対して `scopeMatches` が実行されます。アクセストークンのランクは `scopeMatches` への入力にはなりません。

### MCP ツールのスコープ

スコープの強制は `open-sse/mcp-server/scopeEnforcement.ts` に一元化されています。
各ツールには特定のスコープが必要です：

| スコープ              | ツール                                                                                                                                                                            |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                 |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                         |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                            |
| `read:quota`          | `check_quota`                                                                                                                                                                     |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                            |
| `read:models`         | `list_models_catalog`                                                                                                                                                             |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                     |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                             |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                       |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                    |
| `read:cache`          | `cache_stats`                                                                                                                                                                     |
| `write:cache`         | `cache_flush`                                                                                                                                                                     |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                        |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                 |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                             |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                  |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                            |
| `read:memory`         | `memory_search`                                                                                                                                                                   |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                      |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                |
| `write:skills`        | `skills_enable`                                                                                                                                                                   |
| `execute:skills`      | `skills_execute`                                                                                                                                                                  |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                  |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                           |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                         |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                  |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                    |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                   |
| `read:obsidian`       | 読み取りツール13個 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 書き込みツール9個 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

ワイルドカードスコープがサポートされています。`read:*` はすべての読み取りスコープを許可し、`*` は完全なアクセスを許可します。

### `mcp:connect` — 限定的なルート機能 (#7895)

非ループバックから HTTP/SSE MCP トランスポート（`/api/mcp/*`）に到達するには、
`/api/mcp/` の LOCAL_ONLY 例外（`docs/security/ROUTE_GUARD_TIERS.md` を参照）が必要です。歴史的には、
この例外では完全な `manage`/`admin` スコープの API キーのみが受け入れられていましたが、これは
MCP との通信だけを必要とする呼び出し元には広すぎました。現在、`src/shared/constants/managementScopes.ts` は
`MCP_CONNECT_SCOPE = "mcp:connect"` をエクスポートします。これは追加的かつ限定的なスコープであり、
`SELF_USAGE_SCOPE` と同じ前例に基づくものです。このスコープは `src/server/authz/policies/management.ts` の
`/api/mcp/` バイパスのみを認可し、他の管理ルートへのアクセスは一切許可しません。また、
意図的に `MANAGEMENT_API_KEY_SCOPES` の外部に置かれています。`manage`/`admin` を保持するキーは
引き続き変更なくこの例外を通過します。`mcp:connect` は、リモートから MCP のみを利用する呼び出し元向けの
より低権限な代替手段であり、`hasMcpConnectOrManageScope()` によってチェックされます。

### キーごとの HTTP スコープバインディング (#7895)

HTTP/SSE 経由では、`open-sse/mcp-server/httpTransport.ts` が
`resolveMcpCallerAuthInfo()`（`open-sse/mcp-server/httpAuthContext.ts`）を介して呼び出し元の実際の
`api_keys.scopes` を解決し、それを MCP SDK の
`transport.handleRequest(req, { authInfo })` に渡すようになりました。これにより、各ツール呼び出しに到達する
`extra.authInfo.scopes` は Bearer キー自身のスコープを反映します。
`scopeEnforcement.ts` の `resolveCallerScopeContext()` はすでに `_meta` および
`OMNIROUTE_MCP_SCOPES` 環境変数のフォールバックより `authInfo` を優先していました。今回の変更は、
以前 HTTP 経由では入力されていなかった、この最も優先度の高い最初のソースに値を設定するものです。API キーを
解決できない場合（ヘッダーがない、キーが無効など）、`authInfo` は `undefined` のままとなり、解決処理は
既存の `meta`/env チェーンに変更なくフォールバックします。stdio には呼び出し元ごとのアイデンティティがなく
（`mcpCallerIdentity.ts` を参照）、キーごとのバインディングの影響を受けません。stdio は `_meta` の手順を
スキップし（`_meta` は HTTP 認証コンテキスト内でのみ有効、#15159）、`OMNIROUTE_MCP_SCOPES` 環境キーだけから
解決します。

**限定スコープの HTTP/SSE 呼び出し元については、
`OMNIROUTE_MCP_ENFORCE_SCOPES` の値にかかわらず、強制的に有効化されます。**
`OMNIROUTE_MCP_ENFORCE_SCOPES` のデフォルト値が `false` であることが安全なのは、
スコープを適用すべき呼び出し元ごとのアイデンティティが存在しないローカル/stdio の単一オペレーター構成に
限られます。`open-sse/mcp-server/server.ts::withScopeEnforcement()` は、
`resolveCallerScopeContext()` が `source === "authInfo"`（実際のキーごとの HTTP Authorization ヘッダー、
HTTP/SSE のみ）を解決し、かつそのキーが完全な `manage`/`admin` スコープを保持していない場合に、
ツールごとのスコープ適用を無条件で有効にします（`scopeEnforcement.ts` の
`shouldForceScopeEnforcement()`）。これにより、上記で `/api/mcp/` の LOCAL_ONLY 例外のみを認可し、
それ以外は一切認可しないと説明した狭い `mcp:connect` バイパススコープだけを保持するキーが、
オペレーターによってリモート/非ループバック MCP アクセスが有効化された際に、
`OMNIROUTE_MCP_ENFORCE_SCOPES` がデフォルトで `false` であるというだけの理由で、すべての MCP ツールを
呼び出せてしまう問題を解消します。HTTP 経由の完全な `manage`/`admin` キー、およびすべての
stdio/ローカル呼び出し元では、既存の `OMNIROUTE_MCP_ENFORCE_SCOPES` によって制御される動作が
変更なく維持されます。

---

## 環境変数

| 変数                                    | デフォルト                       | 用途                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`         | MCP サーバーが OmniRoute 内部 API を呼び出す際に使用するベース URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_API_KEY`                     | (空)                             | 内部 API 呼び出しに `Authorization: Bearer` として転送される API キー                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false`（`"true"` のみで有効化） | 有効にすると、スコープが不足しているツール呼び出しを拒否し、監査ログに `scope_denied:<reason>` を記録します。さらに、このフラグの値にかかわらず、キーごとの Authorization ヘッダー（`source === "authInfo"`）から解決された HTTP/SSE 呼び出し元で、完全な `manage`/`admin` スコープを持たないものについては、適用が強制されます — たとえば、狭い `mcp:connect` バイパススコープのみを保持するキーなどが該当します。そのため、このデフォルトが安全なのはローカル/stdio の単一オペレーターによるフローに限られ、リモートの非ループバックアクセスには決して適用できません |
| `OMNIROUTE_MCP_SCOPES`                  | (空)                             | デフォルトで「利用可能」と見なされるスコープのカンマ区切りの許可リスト（呼び出し元が独自のスコープを提供しない場合に使用）                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | （未設定 = 有効）                | `0/false/off/no` に設定すると、登録時の MCP 説明の圧縮を無効にします                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | （未設定 = 有効）                | 上記と同じ切り替えの別名                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                          | 内部管理情報の読み取り（health、resilience、combos、quota、usage）に対する中止までの時間                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                          | プロバイダーからの応答を待機するホップ（`route_request`、`web_search`、`web_fetch`）に対する中止までの時間                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `MCP_TOOL_DENY`                         | （未設定 = フィルターなし）      | `tools/list` から除外するツール名のカンマ区切りリスト（ツール数の削減 — 下記参照）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `MCP_TOOL_ALLOW`                        | (未設定 = フィルターなし)        | 排他的に許可するツール名をカンマ区切りで指定（許可リストモード — 下記参照）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DATA_DIR`                              | `~/.omniroute`                   | ハートビートファイルは `${DATA_DIR}/runtime/mcp-heartbeat.json` に書き込まれます                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

---

## 説明の圧縮

MCP ツール、プロンプト、リソースのレジストリでは、登録時またはリスト表示時に説明を圧縮して、クライアントに公開されるメタデータのフットプリント（ひいてはプロンプトコンテキストのコスト）を削減できます。実装は `open-sse/mcp-server/descriptionCompressor.ts` にあり、`createMcpServer()` 内の `compressMcpRegistryMetadata` を介して MCP サーバーに組み込まれています。

- 圧縮は、保持ブロックの抽出（コードスパン、フェンス付きブロックなど）を使用し、構造的なコンテンツを変更しないようにしたうえで、Caveman ルールセット（`getRulesForContext("all", "full")`）によって説明テキストに対して実行されます。
- `key_value` 設定テーブルの `compression.mcpDescriptionCompressionEnabled` の値でデプロイメントごとに切り替えられます（デフォルト: 有効）。UI では **分析 → MCP 説明の圧縮** として公開されています。
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` または `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` のいずれかによって、プロセス全体で切り替えられます。
- リアルタイム統計は `analytics.mcpDescriptionCompression` の下にある `omniroute_compression_status` を介して公開され、実際のプロバイダー利用レシートと区別できるよう `source: "mcp_metadata_estimate"` のタグが付けられます。

---

## ツール数の削減（F4.3）

説明の圧縮は各ツールのメタデータを縮小しますが、**ツール数の削減**ではさらに一歩進んで、そもそも通知するツールの数を減らします。`tools/list` マニフェストで公開するツールを減らすことで、クライアントのモデルがツールカタログに対してリクエストごとに支払うトークンコスト（「レイヤー 5」の圧縮）を削減できます。実装は `open-sse/mcp-server/toolCardinality.ts` の純粋かつステートレスなフィルター（`reduceToolManifest`）であり、`createMcpServer()`（`open-sse/mcp-server/server.ts`）の登録ループに組み込まれています。

**オプトインで、デフォルトでは無効です。** このフィルターは、2 つの環境変数のうち少なくとも 1 つが設定されている場合にのみ実行されます。どちらも設定されていない場合、110 個すべてのツールが変更されずに通知されます。

| 変数             | モード                                                                                |
| :--------------- | :------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | ブラックリスト — `tools/list` から常に除外するツール名をカンマ区切りで指定            |
| `MCP_TOOL_ALLOW` | 許可リスト — ツール名をカンマ区切りで指定し、これらのみを残して、それ以外をすべて除外 |

`deny` は `allow` より優先されます。名前はカンマ区切りで指定し、前後の空白が削除され、空のエントリは無視されます。例:

```bash
# カタログから 2 つのツールを除外
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# ルーティングツールとクォータツールのみを通知（許可リストモード）
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**フィルターされたツールの削除方法:** 登録は常に成功します。プロファイルによって拒否されたツールは、MCP SDK ハンドル上で `.disable()` されるため、`tools/list` には表示されませんが、配線は維持されます（再登録なしで、適切に有効化・無効化できます）。プロファイルパーサーは `readMcpToolProfileFromEnv(process.env)` であり、両方の変数が空の場合は `null`（フィルタリングなし）を返します。

`reduceToolManifest` が内部でサポートする、より豊富な `ToolProfile` の形状には、スコープの積集合によるフィルタリング（`allowScopes`、`read:*` 形式のワイルドカードマッチングを使用）と、決定論的な `maxTools` 上限も含まれます。ただし、この 2 つの設定は登録時に完全なマニフェストを必要とするため、現在は環境変数では公開されていません（`tools/list` レベルのフックは追跡中のフォローアップ項目です）。`estimateManifestTokens()` を使用すると、削減前後のマニフェストのトークンコストを比較できます。

---

## ランタイムハートビート

stdio トランスポートは、5 秒ごとに `${DATA_DIR}/runtime/mcp-heartbeat.json` へ稼働状態を永続化します。ダッシュボード（`/api/mcp/status`）は、このファイルと PID の稼働状態を読み取り、`online` を判定します。一方、HTTP トランスポートはインプロセスの `getMcpHttpStatus()` から状態を報告します（ファイルへの書き込みはありません）。

ハートビートスナップショットには以下が含まれます。

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## 監査ログ

すべてのツール呼び出しは、`open-sse/mcp-server/audit.ts` により SQLite の `mcp_tool_audit` テーブルへ記録されます。

- ツール名、引数（ツールごとの `auditLevel` に従ってハッシュ化／切り詰め）、結果
- ms 単位の所要時間、成功／失敗フラグ、エラーメッセージ（該当する場合）
- API キーのハッシュ、タイムスタンプ
- スコープによる拒否は、`scope_denied:<reason>` として、不足しているスコープのリストとともに記録されます

最近の呼び出しを確認するには、ダッシュボード、または `/api/mcp/audit` と `/api/mcp/audit/stats` の REST エンドポイントを使用します。

---

## ファイル

| ファイル                                                                 | 目的                                                                   |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP サーバーファクトリ、stdio エントリポイント、スコープ付きツール登録 |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP トランスポート（セッション管理）                 |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ツールスコープの評価と呼び出し元の解決                                 |
| `open-sse/mcp-server/audit.ts`                                           | ツール呼び出しの監査ログ（`mcp_tool_audit`）                           |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio ハートビートライター（`mcp-heartbeat.json`）                     |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ツール／プロンプト／リソースレジストリの説明の圧縮                     |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod スキーマ + ツールレジストリ（`MCP_TOOLS`、45 エントリ）            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + キャッシュ + 1proxy ツールハンドラー                         |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 圧縮ツールハンドラー                                                   |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | メモリーツール定義（3 ツール）                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                                | スキルツール定義（4 ツール）                                           |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion コンテキストソースツール定義（6 ツール）                        |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ゲーミフィケーションツール定義（8 ツール）                             |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | プラグイン登録および管理ツール（8 ツール）                             |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` エンドポイント                                       |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` エンドポイント                                        |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE トランスポートルート                                |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP トランスポートルート                 |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` 監査ログクエリ                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` 集計済み監査メトリクス                          |
| `src/lib/notion/api.ts`                                                  | Notion REST API クライアント（再試行、タイムアウト、エラー分類）       |
| `src/lib/db/notion.ts`                                                   | Notion トークンの永続化（`key_value` テーブル）                        |
| `src/app/api/settings/notion/route.ts`                                   | Notion 設定 API（GET/POST/DELETE）                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion トークン管理 UI                                                 |
| `tests/unit/notion-api.test.ts`                                          | Notion API クライアントテスト（7）                                     |
| `tests/unit/notion-tools.test.ts`                                        | Notion ツールのスコープ強制テスト（10）                                |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB モジュールテスト（3）                                        |
