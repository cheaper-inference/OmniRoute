# OmniRoute MCP Server Documentation (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> ルーティング、キャッシュ、圧縮、メモリ、スキル、プロキシ、プール、Radar、およびコンテキストソース操作にまたがる110個のツールを備えたModel Context Protocolサーバー。
>
> 信頼できる情報源: `open-sse/mcp-server/server.ts` は、`countUniqueMcpTools()`を使用して**110個の一意なツール**を算出します。内訳は、45個の標準定義（6つのCCRライフサイクルツール、agent-skillsの3ツール、`omniroute_radar_catalog`、および`omniroute_x_search`を含む）に加え、メモリ（3）、スキル（4）、GitHubスキル（3）、プール（6）、ゲーミフィケーション（8）、プラグイン（8）、Notion（6）、Obsidian（22）、ローカルコーパス（3）、およびRTK専用の圧縮ツール2つです。

## インストール

OmniRoute MCPは組み込みです。次のコマンドで起動します。

```bash
omniroute --mcp
```

または、open-sseトランスポートを使用します。

```bash
# HTTPストリーミング対応トランスポート（ポート20130）
omniroute --dev  # MCPは/mcpエンドポイントで自動起動します
```

HTTPトランスポート（`sse` / `streamable-http`。ダッシュボードサーバーによって同一プロセス内で提供）は、デフォルトでは無効で、以前は`/dashboard/mcp`ページからのみ切り替え可能でした。v3.8.51以降、CLIでも同等の操作が可能です。

```bash
omniroute mcp status                                  # 有効/オンライン、トランスポート、ツール数
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # アクティブなsse/streamable-httpセッションをリセット
```

`mcp enable`/`mcp disable`は、ダッシュボードが`/api/settings`経由で切り替えるものと同じ`mcpEnabled`設定（および任意で`mcpTransport`）にPATCHを送信します。`mcp restart`は`POST /api/mcp/restart`を呼び出します。アクティブな`sse`/`streamable-http`セッションを終了し、次のリクエスト時にクリーンな状態で再初期化されるようにします。MCPが無効な場合は`409`を返し、`stdio`トランスポートの場合は`501`を返します（stdioクライアントは独自のサブプロセスを所有するため、再起動できる同一プロセス内のハンドルはありません）。

## トランスポート

MCPサーバーは3つのトランスポートを公開しており、すべて同じ`createMcpServer()`ファクトリーを基盤としています。

| トランスポート    | 場所                                         | 使用する場面                                                    |
| :---------------- | :------------------------------------------- | :-------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | IDE統合（Claude Desktop、Cursorなど）                           |
| `sse`             | `httpTransport`経由の`POST/GET /api/mcp/sse` | イベントストリームを必要とするブラウザ/エージェントクライアント |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | マルチセッションHTTPクライアント（`mcp-session-id`ヘッダー）    |

アクティブなHTTPトランスポート（`sse`または`streamable-http`）は、`mcpTransport`設定によって選択されます。トランスポートを切り替えると、もう一方のトランスポート上にある既存のセッションが閉じられます。

### リモートアクセス（manageスコープによるバイパス）

`/api/mcp/*`はLOCAL_ONLY階層（`src/server/authz/routeGuard.ts`）に属しています。デフォルトでは、ループバックホスト（`localhost`、`127.0.0.1`、`::1`）からのみアクセスできます。v3.8.2以降、非ループバッククライアントでも、`manage`スコープを持つキーを使用した`Authorization: Bearer <api-key>`を提示すれば接続できます。トンネル、リバースプロキシ、またはパブリックホスト名を介してリモートMCPサーバーに到達するには、これが唯一の方法です。

```bash
# manageスコープを付与: ダッシュボードのAPI Keysページを開き、キーの
# 「Management Access」を有効にするか、作成時にscopes:["manage"]をPOSTします。

# 次に、リモートMCPクライアントから接続します。
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage`を持たないキー（またはBearerなし）は`403 LOCAL_ONLY`を返します。同階層のプレフィックス`/api/cli-tools/runtime/*`は、意図的にバイパスできないようになっています。詳しくは[ルートガード階層 — manageスコープの例外](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)を参照してください。

### Origin の検証

認証後、`/api/mcp/*` へのすべてのリクエスト（トランスポートと `status`, `tools`, `audit`, `restart` などの管理ルート）は、呼び出し元（API キー、CLI トークン、ダッシュボードセッション、ログイン無効時の匿名ループバック）に関係なく `Origin` ヘッダーが検証されます。これは MCP Streamable HTTP 仕様が求める DNS リバインディング対策です。

- **`Origin` ヘッダーなし** → 許可。OmniRoute CLI、SDK、IDE クライアントはこのヘッダーを送信しません。
- **許可される `Origin`** → 任意のポートの `localhost` / `127.0.0.1` / `[::1]`、または OmniRoute 自身の公開 origin：`OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`、信頼済みリバースプロキシが転送した origin（`OMNIROUTE_TRUST_PROXY`、base URL が未設定の場合のみ）、またはループバック／LAN IP ホストへの直接アクセス。`Host` ヘッダーだけで origin が信頼されることはありません。
- **それ以外の `Origin`（`null` を含む）** → `403`。本文は JSON-RPC エラー：`id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`。有効な CSRF トークンを提示したダッシュボードセッションは、他のダッシュボード書き込みと同様に引き続き許可されます。

リバースプロキシの背後で配信されるブラウザ MCP クライアントには `OMNIROUTE_PUBLIC_BASE_URL` の設定が必要です。その他の origin 用の許可リストはありません。CORS プリフライト（`OPTIONS`）は Origin を検証しませんが、続く実際のリクエストは検証されます。

## IDE の設定

Claude Desktop、Cursor、Cline、および互換性のある MCP クライアントのセットアップについては、[MCP クライアントの設定](../guides/SETUP_GUIDE.md#mcp-client-configuration)を参照してください。

---

## 必須ツール（14）— フェーズ 1

| ツール                          | スコープ              | 説明                                                                                                                        |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | 稼働時間、メモリ、サーキットブレーカー、レート制限、キャッシュ統計                                                          |
| `omniroute_list_combos`         | `read:combos`         | 設定済みのすべてのコンボと戦略（メトリクスは任意）                                                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | 特定のコンボのパフォーマンスメトリクス                                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | コンボを有効化または無効化                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | 既存のコンボ API を通じて検証済みのコンボを作成                                                                             |
| `omniroute_check_quota`         | `read:quota`          | 使用済み／合計クォータ、残量の割合、リセット時刻、トークンの状態                                                            |
| `omniroute_route_request`       | `execute:completions` | OmniRoute のルーティングを通じてチャット補完を送信                                                                          |
| `omniroute_cost_report`         | `read:usage`          | 期間別（セッション／日／週／月）のコストレポート                                                                            |
| `omniroute_list_models_catalog` | `read:models`         | 機能、ステータス、価格を含む完全なモデルカタログ                                                                            |
| `omniroute_radar_catalog`       | `read:radar`          | ローカルで署名された Radar カタログ（プロバイダー／ファミリーによるフィルターは任意）                                       |
| `omniroute_tool_search`         | `read:tools`          | 登録済みの MCP カタログからツールを検索                                                                                     |
| `omniroute_web_search`          | `execute:search`      | 設定済みの検索プロバイダーを通じて Web を検索。X/Twitter は対象外。                                                         |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok を通じて X を検索。または、Xquik API の結果には `xquik-search` を選択。選択したバックエンドの認証情報が必要。 |
| `omniroute_web_fetch`           | `execute:search`      | 設定済みの取得プロバイダーを通じて Web コンテンツを取得                                                                     |

## 高度なツール (11) — フェーズ 2

| ツール                             | スコープ                             | 説明                                                                                             |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | フォールバックツリーを使用したドライランのルーティングシミュレーション                           |
| `omniroute_set_budget_guard`       | `write:budget`                       | 劣化／ブロック／アラートのアクションを備えたセッション予算ガード                                 |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 実行時にコンボ戦略（優先順位／重み付き／自動など）を更新                                         |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive`／`balanced`／`conservative` のレジリエンスプリセットを適用                          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 実際のアップストリーム呼び出しを使用して、コンボ内のすべてのプロバイダーをライブテスト           |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50／p95／p99 レイテンシーおよびサーキットブレーカーの状態を含むプロバイダー別メトリクス         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 予算／レイテンシーの制約に基づき、タスク種別ごとにコンボを推奨                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | リクエストが特定のプロバイダーにルーティングされた理由を説明（スコアリング要因＋フォールバック） |
| `omniroute_get_session_snapshot`   | `read:usage`                         | 完全なセッションスナップショット：コスト、トークン、上位モデル／プロバイダー、エラー、予算ガード |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 壊れたコンボ参照／孤立行などのデータベースドリフトを診断（およびオプションで自動修復）           |
| `omniroute_sync_pricing`           | `pricing:write`                      | 外部ソース（LiteLLM）から料金データを同期。`dryRun` をサポート                                   |

## キャッシュツール (2)

| ツール                  | スコープ      | 説明                                                           |
| :---------------------- | :------------ | :------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | セマンティックキャッシュ、プロンプトキャッシュ、冪等性の統計   |
| `omniroute_cache_flush` | `write:cache` | グローバル、またはシグネチャ／モデル別にキャッシュをフラッシュ |

## 圧縮ツール (13)

| ツール                              | スコープ            | 説明                                                                                                                |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | 圧縮設定、分析サマリー、キャッシュ考慮型の統計（`analytics.mcpDescriptionCompression` メタデータを含む）            |
| `omniroute_compression_configure`   | `write:compression` | 圧縮モード、しきい値、目標比率、システムプロンプトの保持、MCP 説明圧縮の切り替えを設定                              |
| `omniroute_set_compression_engine`  | `write:compression` | アクティブなエンジン（off/caveman/rtk/stacked）と Caveman/RTK の強度を選択                                          |
| `omniroute_list_compression_combos` | `read:compression`  | 名前付き圧縮コンボとそのエンジンパイプラインを一覧表示                                                              |
| `omniroute_compression_combo_stats` | `read:compression`  | 圧縮コンボおよびエンジン別にグループ化された分析                                                                    |
| `omniroute_ccr_store`               | `write:compression` | 呼び出し元ごとに分離されたコンテンツを、容量制限付きのインメモリ CCR ストアに保存し、マーカーと `ccr://` 参照を返す |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR コンテンツを完全取得、または先頭、末尾、行、grep、統計モードで取得                                              |
| `omniroute_ccr_inspect`             | `read:compression`  | コンテンツを返さずに、呼び出し元が所有する CCR メタデータを検査                                                     |
| `omniroute_ccr_list`                | `read:compression`  | 呼び出し元が所有する CCR ブロックのメタデータをページネーション付きで一覧表示                                       |
| `omniroute_ccr_delete`              | `write:compression` | 呼び出し元が所有する CCR ブロックを削除                                                                             |
| `omniroute_ccr_stats`               | `read:compression`  | 呼び出し元スコープのメモリ使用量、ライフサイクルカウンター、ストア制限を報告                                        |
| `omniroute_rtk_discover`            | `read:compression`  | オプトインされた RTK 出力サンプル内の繰り返しノイズを検出                                                           |
| `omniroute_rtk_learn`               | `read:compression`  | オプトインされたサンプルからレビュー可能な RTK フィルタードラフトを生成                                             |

CCR エントリはインメモリ専用であり、再起動すると消失します。各ブロックの上限は 2 MiB、各
プリンシパルの上限は 16 MiB、グローバルストアの上限は 64 MiB です。エントリのデフォルト TTL は 24 時間（最大
7 日間）です。MCP による完全取得は 256 KiB に制限されます。それより大きいブロックも、
範囲指定モードおよび grep モードで引き続き取得できます。保存、取得、一覧表示、検査、削除、統計は、
認証済み API キーのプリンシパルごとに分離されます。監査レコードにはハッシュとサイズのメタデータのみが含まれ、コンテンツは含まれません。

`omniroute_compression_status` は、MCP の説明圧縮を
`analytics.mcpDescriptionCompression` の下に個別に報告します。これらの値は、MCP で一覧取得可能な
説明（`tools`、`prompts`、`resources`、`resourceTemplates`）のメタデータサイズ推定値です。プロバイダーの使用量
記録ではなく、`source: "mcp_metadata_estimate"` としてマークされます。

### MCP アクセシビリティツリーフィルター (v3.8.0)

上記の圧縮ツールとは別に、OmniRoute には、MCP のブラウザ／アクセシビリティツールの**ツール結果**をエージェントへ返す前に圧縮する、実行後フィルターが含まれています。このフィルター自体はツールではありません。冗長なアクセシビリティツリーまたはブラウザスナップショットのテキスト（2,000文字以上）を含む任意のツール結果に対して透過的に実行されます。

主な動作:

- 30行以上連続して繰り返される兄弟行を、先頭＋末尾の要約にまとめる
- Playwright／computer-use に必要な `[ref=eXX]` アンカーを保持する
- サイズが過大なテキスト（50,000文字超）を、ナビゲーションヒント付きで強制的に切り詰める
- 想定削減率: ブラウザスナップショットのペイロードで **60～80%**

設定: グローバル設定の `compression.mcpAccessibility`（マイグレーション 056）。
実装: `open-sse/services/compression/engines/mcpAccessibility/`。
完全なドキュメント: [圧縮エンジン — MCP アクセシビリティツリーフィルター](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)。

これらのツールの基盤となるランタイム圧縮モデルについては、[圧縮エンジン](../compression/COMPRESSION_ENGINES.md)および[RTK 圧縮](../compression/RTK_COMPRESSION.md)を参照してください。

## 1Proxy ツール (3)

| ツール                      | スコープ       | 説明                                                                                            |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy マーケットプレイスから無料プロキシを取得（プロトコル／国／品質／件数のフィルターに対応） |
| `omniroute_oneproxy_rotate` | `read:proxies` | 指定した戦略（`random` / `quality` / `sequential`）で次に利用可能なプロキシを取得               |
| `omniroute_oneproxy_stats`  | `read:proxies` | プールの統計、同期ステータス、プロトコル別および国別の分布                                      |

## メモリツール (3)

`open-sse/mcp-server/tools/memoryTools.ts` で定義されています。認証／スコープは標準の MCP スコープパイプラインを通じて適用されます。

| ツール                    | スコープ       | 説明                                                                                        |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | トークン予算を適用し、クエリ／タイプ／API キーでメモリを検索                                |
| `omniroute_memory_add`    | `write:memory` | 新しいメモリエントリ（`factual` / `episodic` / `procedural` / `semantic`）を追加            |
| `omniroute_memory_clear`  | `write:memory` | API キーに関連するメモリを消去。タイプまたは `olderThan` タイムスタンプによる絞り込みも可能 |

## スキルツール (4)

`open-sse/mcp-server/tools/skillTools.ts` で定義されています。`src/lib/skills/registry` と `src/lib/skills/executor` を基盤として使用します。

| ツール                        | スコープ         | 説明                                                                               |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | 登録済みスキルを一覧表示。API キー、名前、または有効状態による任意の絞り込みが可能 |
| `omniroute_skills_enable`     | `write:skills`   | ID を指定して特定のスキルを有効化または無効化                                      |
| `omniroute_skills_execute`    | `execute:skills` | 指定された入力でスキルを実行し、実行記録を返す                                     |
| `omniroute_skills_executions` | `read:skills`    | 最近のスキル実行履歴を一覧表示                                                     |

## Notion コンテキストソース (6)

`open-sse/mcp-server/tools/notionTools.ts` で定義されています。トークンは `src/lib/db/notion.ts` を介して `key_value` テーブルに保存されます。REST クライアントは `src/lib/notion/api.ts` にあります。設定 API は `src/app/api/settings/notion/route.ts` にあります。ダッシュボード UI は `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` にあります。

Endpoint ダッシュボードの **コンテキストソース** タブ、または REST API を使用して Notion インテグレーショントークンを設定します。

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
| `notion_search`              | `read:notion`  | すべてのページとデータベースを対象に全文検索                       |
| `notion_get_page`            | `read:notion`  | ID を指定してページとそのプロパティを取得                          |
| `notion_list_block_children` | `read:notion`  | ページまたはブロックの子ブロックを一覧表示                         |
| `notion_query_database`      | `read:notion`  | フィルター、並べ替え、ページネーションを使用してデータベースを照会 |
| `notion_get_database`        | `read:notion`  | ID を指定してデータベーススキーマを取得                            |
| `notion_append_blocks`       | `write:notion` | 親ブロックに子ブロックを追加（1 リクエストあたり最大 100 個）      |

## エージェントスキルカタログツール（3）

`open-sse/mcp-server/tools/agentSkillTools.ts` で定義されています。`src/lib/agentSkills/catalog` を基盤としています。これらのツールは、45件のエージェントスキルドキュメントカタログをMCPクライアントおよび外部エージェントに公開します。スコープ：`read:catalog`。

| ツール                            | スコープ       | 説明                                                                                                                                                 |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | 45件のエージェントスキルをすべて一覧表示します。オプションで`category`（api\|cli）および`area`フィルターを指定でき、メタデータとカバレッジを返します |
| `omniroute_agent_skills_get`      | `read:catalog` | 正規`id`を使用して、単一スキルの完全なメタデータとSKILL.mdの内容を取得します                                                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | カバレッジ統計：23件のAPI、21件のCLI、1件のconfigスキルのうち、カタログ総数に対してファイルシステム上にSKILL.mdファイルが存在する数を示します        |

完全なカタログと外部エージェントによる利用方法については、[AGENT-SKILLS.md](./AGENT-SKILLS.md)を参照してください。

## 関連フレームワーク（v3.8.0）

上記のMCPツール一覧（`countUniqueMcpTools()`で算出された110個の一意なツール）は、意図的に
ランタイムのルーティング、キャッシュ、圧縮、メモリ、スキル、プロキシ、コンテキストソース操作に限定されています。v3.8.0では、
隣接する2つのフレームワークがMCPサーバーとともに提供されており、それぞれ個別にドキュメント化されています。

### クラウドエージェント

クラウドエージェントは、LLMプロバイダーに使用されるものと同じ接続モデルを通じて
OmniRouteに統合された、プロセス外のAIコーディングエージェント（codex-cloud、cursor-cloud、devin、jules）です。これらは
独自のRESTインターフェース（`/api/v1/agents/*`）を介して公開され、MCPツールカタログには**含まれません**
— クラウドエージェントを呼び出してもMCPスコープは消費されません。

- 実装：`src/lib/cloudAgent/`（`registry.ts`、`agents/codex.ts`、`agents/cursor.ts`、`agents/devin.ts`、`agents/jules.ts`）。
- ライフサイクル：`createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`。
- ドキュメント：[docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)。

### ガードレール

ガードレールは、チャットパイプライン内で適用される実行前後のフィルター（vision-bridge、pii-masker、prompt-injection）です。
MCPツール／ルート層に到達する前に実行され、構造化された違反情報を監査パイプラインに送出します。MCPツールとして呼び出されるものではありません。

- 実装：`src/lib/guardrails/`。
- ドキュメント：[docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)。

ブロックされたように見えるMCP呼び出しをデバッグする際は、MCP監査ログ
（`scope_denied:*`エントリ）とガードレールの監査証跡の両方を確認してください。リクエストは、
MCPスコープ適用層に到達する**前に**ガードレールによって拒否される場合があります。

---

## REST APIエンドポイント

| エンドポイント         | メソッド              | 説明                                                                                                   | 認証                       |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | サーバー状態：ハートビート、HTTPトランスポートの状態、監査アクティビティの概要                         | 管理（セッション／管理者） |
| `/api/mcp/tools`       | `GET`                 | ツールカタログ（名前、説明、スコープ、フェーズ、ソースエンドポイント）                                 | 管理                       |
| `/api/mcp/sse`         | `GET` / `POST`        | SSEトランスポートエンドポイント（`mcpEnabled` + `mcpTransport === "sse"`によって制御）                 | APIキー + スコープ         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ストリーミング可能なHTTPトランスポート（`mcp-session-id`ヘッダーを使用し、`DELETE`でセッションを終了） | APIキー + スコープ         |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit`からの監査ログエントリ（フィルター：`limit`、`offset`、`tool`、`success`、`apiKeyId`） | 管理                       |
| `/api/mcp/audit/stats` | `GET`                 | 集計された監査統計（`totalCalls`、`successRate`、`avgDurationMs`、上位ツール）                         | 管理                       |

ソースファイル：`src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`。

SSEとストリーミング可能なHTTPトランスポートはどちらも、設定でMCPサーバーが有効化（`mcpEnabled`）され、適切な`mcpTransport`が選択されるまでブロックされます。誤ったトランスポートが設定されている場合、ルートは設定を切り替えるためのヒントとともにHTTP 400を返します。

---

# 認証とスコープ

MCP ツール呼び出しは、呼び出し元からスコープ文字列を読み取ります。この検査は3つの独立した名前空間のうち1つです。1つのチェッカーが通ったことは、他のチェッカーが通ったことを意味しません。ルールは[3つのスコープ名前空間](#three-scope-namespaces)にあり、ツールカタログは[MCP ツールスコープ](#mcp-tool-scopes)です。

### 3つのスコープ名前空間

API キーへの `manage`、MCP ツールへの `read:compression`、そして `oma_live_…` アクセストークンへの `read` は、それぞれ別の3つの権限です。変更を伴う管理ルートに `read` アクセストークンを送った呼び出し元は、HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` を受け取ります。そのランク判定が `scopeSatisfies` です。`scopeSatisfies` は MCP テーブルを参照せず、MCP マッチャーも `scopeSatisfies` を参照しません。

| 名前空間           | 資格情報                                                                                  | チェッカー       | 通過により許可される操作                       |
| :----------------- | :---------------------------------------------------------------------------------------- | :--------------- | :--------------------------------------------- |
| API キー管理       | `api_keys.scopes`                                                                         | `hasManageScope` | その Bearer キーに対する管理 REST              |
| API キー追加       | 同じ配列、厳密に一致する1つの文字列                                                       | 下記のヘルパー   | その1つの機能のみ                              |
| MCP ツールスコープ | 同じ配列、なければ MCP の `_meta`（HTTP/SSE のみ）、さらになければ `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | 強制が有効になった後、そのツール               |
| アクセストークン   | `oma_live_…`                                                                              | `scopeSatisfies` | そのランクを要求するメソッドとパスの管理ルート |

各資格情報の発行は[管理認証](../guides/MANAGEMENT-AUTH.md)で扱われています。

#### API キースコープ

1つの `api_keys.scopes` 配列が2つの仕事を支えます。両者は異なる関数を使います。

**管理 REST。** `manage` と `admin` は `MANAGEMENT_API_KEY_SCOPES` のメンバーです（`src/shared/constants/managementScopes.ts`）。`hasManageScope` が、そのキーに対して管理ルートを認可する仕組みです。`admin` はそのルート上で管理権限を持ちます。ここでの `admin` はアクセストークンのランクではなく、MCP ツールスコープへ展開されるものでもありません。

**追加文字列。** それぞれ厳密なメンバーシップ判定であり、どれも `MANAGEMENT_API_KEY_SCOPES` の外側に留まります。

| スコープ                       | 通過により許可される操作                                                                                                                                                        |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | ループバック以外の `/api/mcp/` の LOCAL_ONLY carve-out のみ（`hasMcpConnectOrManageScope`）。`manage` や `admin` を持つキーでも、その carve-out は通過します。                  |
| `self:usage`                   | このキーに対する `GET /api/v1/me/status`（`src/app/api/v1/me/status/route.ts`）。`POST /api/keys` は作成時にこのスコープを追加します（`normalizeSelfServiceScopesForCreate`）。 |
| `self:account-quota`           | その status ペイロード内のアップストリームのアカウントクォータ（`src/lib/usage/apiKeySelfService.ts`）。status ルートには引き続き `self:usage` が必要です。                     |
| `policy:bypass-provider-quota` | このキーの推論呼び出しはプロバイダークォータポリシーをスキップします（`src/sse/handlers/chat.ts` の `hasProviderQuotaBypassScope`）。                                           |

#### マッチング

カタログは[MCP ツールスコープ](#mcp-tool-scopes)の下の表です。`src/shared/constants/mcpScopes.ts` の `MCP_SCOPE_LIST` をそのカタログとして扱わないでください。それは当初の型付きサブセットです。後のツールはそれに加えてさらにスコープを宣言しています（`read:notion`、`read:skills`、`read:local-corpus`、および表の残りの部分）。

`open-sse/mcp-server/scopeEnforcement.ts` の `evaluateToolScopes` は、必要なすべてのスコープがいずれかの付与済みスコープと一致する場合に呼び出しを許可します：

- `*` はすべての必要なスコープに一致します。
- `*` で終わる付与済みスコープは、星の前の接頭辞で始まる必要なスコープに一致します。`read:*` は `read:compression` に一致します。
- それ以外の付与済みスコープは、同一の必要な文字列にのみ一致します。

スコープが `["manage"]` のキーは、`read:compression` に対して `scopeMatches` に失敗します。同じ呼び出しは、付与された文字列がそれだけである場合、`admin`、`mcp:connect`、`read`、`write` のそれぞれでも失敗します。末尾の `*` 除此之外、MCP ツールスコープに階層は存在しません。

`OMNIROUTE_MCP_ENFORCE_SCOPES=true`（デフォルトは `false`）でない限り、強制はオフです。オフの間、`evaluateToolScopes` は呼び出しを許可し、カタログを読み飛ばします。オンの間、HTTP は Bearer キーの `api_keys.scopes` を `authInfo` として使います（[キーごとの HTTP スコープバインディング](#per-key-http-scope-binding-7895)を参照）。キースコープが解決されない場合、付与済みセットは MCP の `_meta` にフォールスルーします（HTTP/SSE 呼び出し元のみ、HTTP 認証コンテキスト内で尊重されます。stdio 呼び出し元の `_meta` は、クライアント側が制御し呼び出し元ごとの識別子も持たないため無視されます）。その次に `OMNIROUTE_MCP_SCOPES` となります。

#### アクセストークンスコープ

`oma_live_…` トークン（`src/lib/accessTokens/scopes.ts`）は `read`、`write`、`admin` のいずれかを持ちます。`scopeSatisfies` はランクです：`admin` は `write` と `read` をカバーし、`write` は `read` をカバーします。未知のスコープは何もカバーしません。

`evaluateAccessTokenAuth`（`src/server/authz/accessTokenAuth.ts`）は、そのランクを `inferRequiredScope`（`src/server/authz/accessScopes.ts`）と比較します：

- `GET`、`HEAD`、`OPTIONS` には `read` が必要。
- その他のすべてのメソッドには `write` が必要。
- `ADMIN_SCOPE_PREFIXES` 内のパスは、すべてのメソッドで `admin` が必要。`/api/mcp` はそのリストに含まれるため、`write` のアクセストークンでも MCP の HTTP サーフェスを呼び出せない。
- `ADMIN_MUTATION_PREFIXES` 内のパスは、ミューテーションの場合のみ `admin` が必要。
- `ADMIN_MUTATION_EXACT_PATHS` 内のパス (`/api/settings`、`/api/settings/require-login`) は、ミューテーションの場合のみ `admin` が必要 — ただしその完全一致パスに限られ、他の `/api/settings/*` サブルートは `write` のままである。

`PATCH /api/keys/{id}` はミューテーションであり、上記の admin リストには含まれていないため、`read` トークンは 403 `Access token scope 'read' is insufficient; 'write' required.` を受け取る。`write` または `admin` のアクセストークンはそのルートを満たすすべての条件を満たす。ダッシュボードの JWT、ループバック CLI のマシン ID トークン、`manage` または `admin` を持つ API キーは別の分岐を取るため、このランクによる絞り込みは適用されない。

`/api/mcp` に対して `scopeSatisfies` を通過したアクセストークンは、管理ゲートを通過したにすぎない。ツール呼び出しは依然として API キーのスコープに対して `scopeMatches` を実行する。アクセストークンのランクは `scopeMatches` の入力にはなっていない。

### MCP ツールスコープ

スコープの強制は `open-sse/mcp-server/scopeEnforcement.ts` に一元化されている。各ツールは特定のスコープを必要とする：

| スコープ              | ツール                                                                                                                                                                             |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                  |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                          |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                             |
| `read:quota`          | `check_quota`                                                                                                                                                                      |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                             |
| `read:models`         | `list_models_catalog`                                                                                                                                                              |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                      |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                              |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                 |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                        |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                     |
| `read:cache`          | `cache_stats`                                                                                                                                                                      |
| `write:cache`         | `cache_flush`                                                                                                                                                                      |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                         |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                  |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                              |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                   |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                             |
| `read:memory`         | `memory_search`                                                                                                                                                                    |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                       |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                 |
| `write:skills`        | `skills_enable`                                                                                                                                                                    |
| `execute:skills`      | `skills_execute`                                                                                                                                                                   |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                   |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                            |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                          |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                   |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                     |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                 |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                    |
| `read:obsidian`       | 13 個の read ツール — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 個の write ツール — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

ワイルドカードスコープがサポートされています: `read:*` はすべての read スコープを、`*` はフルアクセスを許可します。

### `mcp:connect` — ナロールート機能 (#7895)

非ループバックから HTTP/SSE MCP トランスポート (`/api/mcp/*`) に到達するには、`/api/mcp/` の LOCAL_ONLY carve-out が必要です (`docs/security/ROUTE_GUARD_TIERS.md` を参照)。従来この carve-out はフル `manage`/`admin` スコープの API キーしか受け入れず、MPC との通信のみを必要とする呼び出し元には広すぎました。`src/shared/constants/managementScopes.ts` は現在 `MCP_CONNECT_SCOPE = "mcp:connect"` をエクスポートしています: これは追加的なナロースコープ (`SELF_USAGE_SCOPE` と同じ先例) であり、`src/server/authz/policies/management.ts` における `/api/mcp/` のバイパスのみを認可します — 他の管理ルートへのアクセスは一切付与せず、意図的に `MANAGEMENT_API_KEY_SCOPES` には含めていません。`manage`/`admin` を保持するキーは従来どおり carve-out を通過します; `mcp:connect` はリモートで MCP のみを利用する呼び出し元向けの低権限の代替手段であり、`hasMcpConnectOrManageScope()` で判定されます。

### キーごとの HTTP スコープバインディング (#7895)

HTTP/SSE 上では、`open-sse/mcp-server/httpTransport.ts` は現在 `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) を介して呼び出し元の本物の `api_keys.scopes` を解決し、MCP SDK の `transport.handleRequest(req, { authInfo })` に渡すため、各ツールコールに届く `extra.authInfo.scopes` は Bearer キー自身のスコープを反映します。`scopeEnforcement.ts` の `resolveCallerScopeContext()` はすでに `_meta` や `OMNIROUTE_MCP_SCOPES` の環境変数フォールバックより `authInfo` を優先していました — 本変更は、従来 HTTP 上で給電されていなかったこの最優先のソースに値を与えるだけです。API キーが解決されない場合 (ヘッダーなし、無効なキー)、`authInfo` は `undefined` のままとなり、解決は既存の `meta`/環境変数のチェーンへそのままフォールスルーします。stdio には呼び出し元ごとのアイデンティティがないため (`mcpCallerIdentity.ts` を参照)、キーごとのバインディングの影響は受けません — `_meta` のステップをスキップし (`_meta` は HTTP 認証コンテキスト内でのみ有効、#15159)、`OMNIROUTE_MCP_SCOPES` の環境変数キーからのみ解決します。

**`OMNIROUTE_MCP_ENFORCE_SCOPES` にかかわらず、ナロースコープの HTTP/SSE 呼び出し元では強制的にエンフォースメントが有効になります。** `OMNIROUTE_MCP_ENFORCE_SCOPES` のデフォルトが `false` であることは、スコープの基準となる呼び出し元ごとのアイデンティティが存在しない、ローカル/stdio のシングルオペレータ運用でのみ安全です。`open-sse/mcp-server/server.ts::withScopeEnforcement()` は、`resolveCallerScopeContext()` が `source === "authInfo"` を解決した場合 (すなわち実際のキーごとの HTTP Authorization ヘッダー、HTTP/SSE 限定) かつ、そのキーがフル `manage`/`admin` スコープを保持していない場合に、ツールごとのスコープエンフォースメントを無条件に有効化します (`scopeEnforcement.ts` の `shouldForceScopeEnforcement()`)。これにより、ナローの `mcp:connect` バイパススコープのみを保持するキー — 上記に記載のとおり `/api/mcp/` の LOCAL_ONLY carve-out 以外を何认可しないもの — が、オペレータがリモート/非ループバックの MCP アクセスを有効化した途端に `OMNIROUTE_MCP_ENFORCE_SCOPES` が既定で `false` であるPropagation だけですべての MCP ツールを呼出できてしまうという隙間を塞ぎます。HTTP 経由のフル `manage`/`admin` キー、およびすべての stdio/ローカルの呼び出し元は、既存の `OMNIROUTE_MCP_ENFORCE_SCOPES` によるゲート制御の動作をそのまま維持します。

## 環境変数

| 変数                                    | デフォルト                         | 用途                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :-------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | MCP サーバーが OmniRoute の内部 API を呼び出す際に使用するベース URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_API_KEY`                     | （空）                             | 内部 API 呼び出しに `Authorization: Bearer` として転送される API キー                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false`（`"true"` の場合のみ有効） | 有効にすると、必要なスコープがない場合はツール呼び出しを拒否し、監査ログに `scope_denied:<reason>` を記録します。また、このフラグに関係なく、キーごとの Authorization ヘッダーから解決された HTTP/SSE 呼び出し元（`source === "authInfo"`）が完全な `manage`/`admin` スコープを持たない場合（たとえば、限定的な `mcp:connect` バイパススコープしか持たないキー）にも、適用が強制されます。そのため、このデフォルト設定が安全なのはローカル/stdio の単一オペレーター構成のみであり、リモートの非ループバックアクセスには決して使用しないでください |
| `OMNIROUTE_MCP_SCOPES`                  | （空）                             | デフォルトで「利用可能」と見なされるスコープのカンマ区切り許可リスト（呼び出し元が独自のスコープを指定しない場合に使用）                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | （未設定 = オン）                  | `0/false/off/no` に設定すると、登録時の MCP 説明圧縮を無効にします                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | （未設定 = オン）                  | 上記と同じ切り替え設定の代替エイリアス                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | 内部管理情報の読み取り（ヘルス、レジリエンス、組み合わせ、クォータ、使用量）に対する中断までの時間                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | プロバイダーからの応答を待つホップ（`route_request`、`web_search`、`web_fetch`）に対する中断までの時間                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `MCP_TOOL_DENY`                         | （未設定 = フィルターなし）        | `tools/list` から除外するツール名のカンマ区切りリスト（ツール数の削減 — 以下を参照）                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_ALLOW`                        | （未設定 = フィルターなし）        | 排他的に保持するツール名のカンマ区切りリスト（許可リストモード — 下記参照）                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DATA_DIR`                              | `~/.omniroute`                     | ハートビートファイルは `${DATA_DIR}/runtime/mcp-heartbeat.json` に書き込まれます                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

---

## 説明の圧縮

MCP のツール、プロンプト、およびリソースのレジストリでは、クライアントに公開されるメタデータの量（したがってプロンプトのコンテキストコスト）を削減するため、登録時または一覧取得時に説明を圧縮できます。実装は `open-sse/mcp-server/descriptionCompressor.ts` にあり、`createMcpServer()` 内の `compressMcpRegistryMetadata` を介して MCP サーバーに組み込まれています。

- 圧縮では、構造的な内容が変更されないように保持対象ブロック（コードスパン、フェンス付きブロックなど）を抽出したうえで、Caveman ルールセット（`getRulesForContext("all", "full")`）を使用して説明テキストを処理します。
- デプロイごとに、`key_value` 設定テーブルの `compression.mcpDescriptionCompressionEnabled` 値（デフォルト：有効）で切り替えられます。UI では **Analytics → MCP description compression** として表示されます。
- プロセス全体では、`OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` または `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` のいずれかで切り替えられます。
- リアルタイム統計は、`analytics.mcpDescriptionCompression` 配下の `omniroute_compression_status` を介して公開され、実際のプロバイダー使用量のレシートと区別するために `source: "mcp_metadata_estimate"` がタグ付けされます。

---

## ツール数の削減（F4.3）

説明の圧縮では各ツールのメタデータを縮小しますが、**ツール数の削減**ではさらに一歩進め、通知するツールの_数そのもの_を減らします。`tools/list` マニフェストで公開するツールを減らすことで、クライアントのモデルがツールカタログに対して支払うリクエストごとのトークンコスト（「レイヤー5」の圧縮）を削減します。実装は `open-sse/mcp-server/toolCardinality.ts` の純粋かつステートレスなフィルター（`reduceToolManifest`）であり、`createMcpServer()`（`open-sse/mcp-server/server.ts`）の登録ループに組み込まれています。

**オプトイン方式で、デフォルトでは無効です。** このフィルターは、2つの環境変数のうち少なくとも1つが設定されている場合にのみ実行されます。どちらも設定されていない場合、110個のツールがすべて変更なしで通知されます。

| 変数             | モード                                                                                  |
| :--------------- | :-------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ブラックリスト — `tools/list` から常に除外するツール名をカンマ区切りで指定              |
| `MCP_TOOL_ALLOW` | 許可リスト — ツール名をカンマ区切りで指定し、指定したツールのみを残して、それ以外は除外 |

`deny` は `allow` より優先されます。名前はカンマで区切られ、前後の空白は除去され、空のエントリは無視されます。例：

```bash
# カタログから2つのツールを除外
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# ルーティングとクォータのツールのみを通知（許可リストモード）
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**フィルタリングされたツールの削除方法：** 登録自体は常に成功します。その後、プロファイルによって拒否されたツールに対して、MCP SDKハンドル上で `.disable()` が呼び出されます。これにより、そのツールは `tools/list` に表示されなくなりますが、接続構成は維持されます（再登録せずに明確な有効化／無効化が可能です）。プロファイルパーサーは `readMcpToolProfileFromEnv(process.env)` で、両方の変数が空の場合は `null`（フィルタリングなし）を返します。

`reduceToolManifest` の背後にある、より高機能な `ToolProfile` の構造では、スコープの共通部分によるフィルタリング（`allowScopes`。`read:*` 形式のワイルドカードマッチングに対応）と、決定論的な `maxTools` 上限もサポートしています。ただし、この2つの設定には登録時に完全なマニフェストが必要であり、現時点では環境変数を通じて**公開されていません**（`tools/list` レベルのフックは、追跡中のフォローアップ項目です）。`estimateManifestTokens()` を使用すると、削減前後のマニフェストのトークンコストを比較できます。

---

## ランタイムハートビート

stdioトランスポートは、5秒ごとに稼働状態を `${DATA_DIR}/runtime/mcp-heartbeat.json` に永続化します。ダッシュボード（`/api/mcp/status`）は、このファイルとPIDの稼働状態を読み取り、`online` を判定します。一方、HTTPトランスポートは、プロセス内の `getMcpHttpStatus()` から状態を報告します（ファイルへの書き込みはありません）。

ハートビートのスナップショットには、次の情報が含まれます：

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

すべてのツール呼び出しは、`open-sse/mcp-server/audit.ts` によってSQLiteの `mcp_tool_audit` テーブルへ記録されます：

- ツール名、引数（ツールごとの `auditLevel` に従ってハッシュ化／切り詰め）、結果
- 所要時間（ミリ秒）、成功／失敗フラグ、エラーメッセージ（該当する場合）
- APIキーハッシュ、タイムスタンプ
- スコープ拒否は、不足しているスコープのリストとともに `scope_denied:<reason>` として記録

最近の呼び出しを確認するには、ダッシュボード、または `/api/mcp/audit` および `/api/mcp/audit/stats` RESTエンドポイントを使用してください。

---

## ファイル

| ファイル                                                                 | 目的                                                                     |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP サーバーファクトリ、stdio エントリーポイント、スコープ付きツール登録 |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP トランスポート（セッション管理）                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ツールスコープの評価と呼び出し元の解決                                   |
| `open-sse/mcp-server/audit.ts`                                           | ツール呼び出しの監査ログ（`mcp_tool_audit`）                             |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio ハートビートライター（`mcp-heartbeat.json`）                       |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ツール／プロンプト／リソースレジストリ向けの説明圧縮                     |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod スキーマ + ツールレジストリ（`MCP_TOOLS`、45 エントリ）              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | フェーズ 2 + キャッシュ + 1proxy ツールハンドラー                        |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 圧縮ツールハンドラー                                                     |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | メモリツール定義（3 ツール）                                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | スキルツール定義（4 ツール）                                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion コンテキストソースツール定義（6 ツール）                          |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ゲーミフィケーションツール定義（8 ツール）                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | プラグイン登録および管理ツール（8 ツール）                               |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` エンドポイント                                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` エンドポイント                                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE トランスポートルート                                  |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP トランスポートルート                   |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` 監査ログクエリ                                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` 集約監査メトリクス                                |
| `src/lib/notion/api.ts`                                                  | Notion REST API クライアント（再試行、タイムアウト、エラー分類）         |
| `src/lib/db/notion.ts`                                                   | Notion トークンの永続化（`key_value` テーブル）                          |
| `src/app/api/settings/notion/route.ts`                                   | Notion 設定 API（GET/POST/DELETE）                                       |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion トークン管理 UI                                                   |
| `tests/unit/notion-api.test.ts`                                          | Notion API クライアントテスト（7 件）                                    |
| `tests/unit/notion-tools.test.ts`                                        | Notion ツールのスコープ適用テスト（10 件）                               |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB モジュールテスト（3 件）                                       |
