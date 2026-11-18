# Database Schema & Operations Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **要約**: OmniRoute はプライマリストアとして **WAL ジャーナリングを使用する SQLite** を採用し、機密フィールドの保存時暗号化には **AES-256-GCM** を使用します。このガイドでは、スキーマ、マイグレーション、バックアップ／リカバリ、および運用ランブックについて説明します。

**ソース:**

- `src/lib/db/core.ts` — シングルトン + SCHEMA_SQL（17 個の基本テーブル）
- `src/lib/db/migrationRunner.ts` — バージョン管理されたマイグレーション
- `src/lib/db/migrations/` — バージョン管理された 167 個の SQL ファイル
- `src/lib/db/encryption.ts` — 暗号化ヘルパー
- `src/lib/db/backup.ts` — バックアップのエクスポート／インポート
- `src/lib/db/healthCheck.ts` — ヘルス診断

---

## SQLite を選ぶ理由

OmniRoute が PostgreSQL/MySQL ではなく SQLite を選択した理由はいくつかあります。

| 要素               | SQLite                                   | PostgreSQL                                         |
| ------------------ | ---------------------------------------- | -------------------------------------------------- |
| **デプロイ**       | 組み込み型 — 個別のサーバーは不要        | サーバーのセットアップが必要                       |
| **暗号化**         | アプリケーション層（AES-256-GCM）        | 組み込みの TDE                                     |
| **パフォーマンス** | 小規模／中規模のワークロードで高速       | 大量の同時書き込みに適している                     |
| **同時実行性**     | WAL モードで同時読み取りが可能           | 完全な MVCC                                        |
| **バックアップ**   | 単一ファイルのコピー                     | `pg_dump` またはファイルシステムのスナップショット |
| **ユースケース**   | ユーザーごとのインストール、組み込み用途 | マルチテナント SaaS                                |

**シングルユーザー、単一インスタンス**のデプロイ（OmniRoute の主要なユースケース）では、SQLite の方がシンプルかつ高速です。

### WAL ジャーナリング

`core.ts` は **WAL（Write-Ahead Logging）モード**でデータベースを開きます。

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL では、書き込み中の**同時読み取り**が可能です。これは、リクエストの記録中にもクエリを実行するダッシュボードにとって重要です。

デフォルトのキャッシュサイズは **65,536 KiB（64 MiB）**です。SQLite は負の
`cache_size` を KiB 単位のおおよその上限として解釈し、必要に応じてページを割り当てます。
**設定 > システムとストレージ > キャッシュサイズ**では、**1 から
1,000,000 KiB** までの整数値を指定できます。設定を保存すると、稼働中のデータベース接続に適用され、
OmniRoute は起動時に保存済みの値を復元します。

---

## データベースの場所

SQLite ファイルは次の場所に保存されます。

| OS      | パス                                                |
| ------- | --------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                       |
| macOS   | `~/.omniroute/storage.sqlite`                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`           |
| Docker  | `/app/data/storage.sqlite`（`DATA_DIR` で設定可能） |

関連ファイル:

- `storage.sqlite-wal` — 先行書き込みログ
- `storage.sqlite-shm` — 共有メモリファイル
- `call_logs/` — リクエストペイロードの成果物（有効な場合）

**保存場所を上書きする:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ドメインモジュールアーキテクチャ

OmniRoute のデータベースには、`src/lib/db/` 内に **110 個のトップレベル TypeScript モジュール**があります。各ドメインモジュールは、以下の原則に従います。

- 1 つ以上の特定のテーブルを所有する
- 型付けされた CRUD 関数をエクスポートする
- 他のモジュールのテーブルには一切アクセスしない
- DB へのアクセスには `core.ts` の `getDbInstance()` を使用する

### 110 個のトップレベル DB モジュール

OmniRoute の `src/lib/db/` には、**110 個のトップレベル TypeScript ファイル**があります。以下は主要なモジュールの一部です。完全な一覧については、ディレクトリリストを参照してください。

| モジュール              | テーブル                                                       | 責務                                                                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API キープロバイダーの登録と認証情報                                           |
| `models.ts`             | `key_value`（モデルデータ）                                    | モデル定義、機能、料金                                                               |
| `combos.ts`             | `combos`                                                       | コンボルーティング設定と順序                                                         |
| `apiKeys.ts`            | `api_keys`                                                     | API キーのライフサイクル、スコープ、クォータ追跡                                     |
| `settings.ts`           | `key_value`、`api_keys`、`combos`                              | システム設定と共有 KV ストア                                                         |
| `backup.ts`             | —                                                              | バックアップのエクスポート/インポート操作                                            |
| `proxies.ts`            | `proxy_registry`、`proxy_assignments`、`provider_connections`  | プロキシ設定とルーティングルール                                                     |
| `prompts.ts`            | `prompt_templates`                                             | 再利用可能なプロンプトテンプレートとバージョニング                                   |
| `webhooks.ts`           | `webhooks`                                                     | イベント駆動型の Webhook サブスクリプションとログ                                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | リクエスト単位の監査ログ記録（任意、大容量）                                         |
| `domainState.ts`        | `domain_*`（5 テーブル）                                       | ドメイン予算、サーキットブレーカー、ロックアウト、フォールバックチェーン、コスト履歴 |
| `registeredKeys.ts`     | `registered_keys`、`account_key_limits`、`provider_key_limits` | MCP/A2A 用に許可リストへ登録された API キー                                          |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 過去のクォータ使用量                                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | モデルをデフォルトのコンボへマッピング                                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 固有の永続状態                                                                   |
| `encryption.ts`         | —                                                              | フィールドを暗号化/復号するためのヘルパー                                            |
| `readCache.ts`          | —                                                              | 読み取り負荷の高い処理向けのインメモリキャッシュ                                     |
| `secrets.ts`            | `key_value`（暗号化されたエントリ）                            | 暗号化されたシークレットストレージ                                                   |
| `stateReset.ts`         | —                                                              | テスト用の DB 状態の消去/リセット                                                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | エージェントのハンドオフ用セッションコンテキスト                                     |
| `usage*.ts`             | `usage_history`、`call_logs`、`proxy_logs`                     | 使用量の追跡                                                                         |
| `compression*.ts`       | `compression_settings`、`compression_combos`                   | 圧縮設定                                                                             |

### モジュール境界

中核となるアーキテクチャルールは、**モジュールが互いのテーブルに直接アクセスしないこと**です。別のモジュールのデータを扱う場合は、そのモジュールから関数をインポートします。

```ts
// ❌ 誤り：別のモジュールから直接 SQL を実行
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 正しい：providers モジュールの関数を使用
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

このルールはコードレビューによって適用されます。静的チェックはありませんが、違反は指摘されます。

---

## 基本スキーマ（17テーブル）

`core.ts` は、`SCHEMA_SQL` 内で17個の基本テーブルを定義します。これらはマイグレーション `001_initial_schema.sql` によって作成され、コアスキーマを構成します。

### コアテーブル（初期マイグレーションで作成）

| テーブル                   | 用途                                   | 主なカラム                                                              |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | プロバイダー認証情報（暗号化済み）     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | プロバイダーノードのルーティング情報   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | 汎用KVストア                           | `namespace`, `key`, `value`                                             |
| `combos`                   | ルーティングコンボの定義               | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ゲートウェイ用APIキー                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | データベースメタデータ                 | `key`, `value`                                                          |
| `usage_history`            | リクエスト使用量レコード               | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | リクエストペイロードとレスポンス       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | プロキシリクエストログ                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | モデルからプロバイダーへのチェーン     | `model`, `chain`                                                        |
| `domain_budgets`           | ドメインごとの支出予算                 | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | 予算リセット履歴                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ドメインごとのコスト追跡               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ドメインのレート制限状態               | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ドメインごとのサーキットブレーカー状態 | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLMレスポンスキャッシュ                | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | 過去のクォータスナップショット         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### 追加テーブル（後続のマイグレーションで追加）

後続のマイグレーションでは、以下のようなテーブルが追加されます。

- `cli_tool_state`（マイグレーション011）— CLIツールの状態
- `mcp_*` テーブル — MCPサーバーの監査
- `a2a_*` テーブル — A2Aタスクの状態
- `usage_*` テーブル — 使用量の追跡
- `plugin_*` テーブル — プラグインシステム
- `skill_executions` — スキル実行履歴
- `memory_*` テーブル — メモリシステム
- `compression_*` テーブル — 圧縮システム
- `webhook_*` テーブル — Webhook配信ログ
- `acp_*` テーブル — Agent Client Protocol
- `oneproxy_*` テーブル — 1proxyマーケットプレイス
- `proxy_assignments` — プロキシスコープのバインディング
- `detailed_call_artifacts` — 呼び出しログのアーティファクトメタデータ
- `quota_alert_history` — クォータアラートの監査
- `command_code_auth_sessions` — Command Code OAuthセッション

約30以上のテーブルの完全な一覧は、`src/lib/db/migrations/` にあります。

---

## 移行

OmniRouteが使用する**バージョン管理された冪等の移行**`src/lib/db/migrations/`で。各移行は単一のSQLファイルです。 2 つの命名形式が共存します。 `_omniroute_migrations`に記録されるバージョンは数値プレフィックスです。

### 移行の命名

| 形式                                           | 例                                   | 用途                                                                                                                                                         |
| ---------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NNN_description.sql` (正確に 3 桁)            | `241_seen_models.sql`                | 旧シリーズ`001`–`241`。タイムスタンプ形式が到着したときにフリーズしました (`240`と`241`その直前にマージされました): 新しいファイルには連番が付けられません。 |
| `YYYYMMDDHHMMSS_description.sql` (14 桁、 UTC) | `20261113120000_add_usage_index.sql` | 2026 年 11 月 13 日以降に作成されたすべての移行。                                                                                                            |

変更の理由: 連続した番号では、並列PRs同じ次の番号を選択し、1 つを除くすべての番号をマージする前に再番号付けする必要がありました。 UTCタイムスタンプは、各PRに独自のバージョンを与えます。

タイムスタンプ形式のルール ( `npm run check:migration-numbering`によって強制され、 `scripts/check/lib/migrationNaming.mjs`のジェネレーターと共有):

- タイムスタンプは実際のUTC日付と時刻で、 `20261113000000`よりも前ではなく、10 分以内の将来のものです。
- 説明は文字で始まる小文字の`snake_case` (`a-z`、 `0-9`、単語間の単一の`_` )、最大 80 文字です。
- 同じタイムスタンプを持つ 2 つのファイルは重複です。
- ギャップなしルールは古い系列にのみ適用されます。既知のギャップ`026`、 `055`および`121`を除き、 `001`から`241`までのすべての数値が存在する必要があります。 `241` (または古いファイル) を削除するとゲートに失敗します。 `001`および`241` `KNOWN_GAPS`ホワイトリストに追加することはできません。タイムスタンプのあるファイルにはギャップが生じることはありません。
- `src/lib/db/migrations/`内のすべてのエントリは、有効な小文字の`.sql`名を持つ通常のファイルである必要があります。ディレクトリ、シンボリックリンク、 `.SQL`または`.sql.bak`ファイル、隠しファイル、またはスペースを含む名前はゲートに失敗します。これは、ランナーがサイレントにスキップするか、起動時にクラッシュするためです。

**注文を適用します。**ランナーはテキストではなくプレフィックスの数値によってソートします。最初に古い`001`–`241`ファイル、次にタイムスタンプ順にタイムスタンプ付きファイル、次に`OMNIROUTE_EXTRA_MIGRATIONS_DIRS` ( `ee-001`などのバージョン) に登録されている名前空間ディレクトリの順にソートします。保留中の移行とは、バージョンが`_omniroute_migrations`にないファイルであるため、新しいブランチの後にマージされる古いブランチからの移行は、引き続き既存のデータベースに適用されます。

**タイムスタンプは作成順であり、マージ順ではありません。**移行が、移行によって作成されたテーブルまたは列に依存している場合、**新しい**タイムスタンプ (たとえば、最初にマージされた別のPRのタイムスタンプ) を使用すると、新しいデータベースが最初に実行され、失敗します。 PRがまだ開いている間に、 `npm run db:new-migration`を使用してファイル名を再生成して、新しいタイムスタンプを取得するか、独立させます。 `npm run test:migrations:fresh` 、すべての移行を空のデータベースに適用し、これをキャッチします。

### マージされた移行は削除されたり名前が変更されたりすることはありません

移行ファイルがリリース ブランチまたは`main`に配置されると、そのファイルはホモログ データベースと開発者データベース、 VPSインストール、およびエンタープライズ同期ですでに実行されています。それ以降:

- **決して削除しないでください。**新規インストールではスキーマが失われますが、アップグレードされたデータベースではスキーマが保持されます。
- **決して名前を変更しないでください。** `_omniroute_migrations`のバージョンはファイルと一致しなくなるため、すでにそのバージョンを適用しているすべてのデータベースでそのバージョンが再度実行されます。その後、非冪等SQLデータを複製するか、ブートを停止します。
- **別のスキーマが必要ですか?** `npm run db:new-migration`を使用して新しい移行を作成します。

Renaming is safe only for a file that is not merged yet, which is the case the gate's hints refer to. A release tag changes nothing here: every push to a `release/v*` branch publishes the Docker `:next` image and runs on homolog, VPS installs and the Enterprise sync, so a merged migration has run on real databases before any `vX.Y.Z` tag exists. The gate fails every removal of a base file, tagged or not.

- **マージされた移行を元に戻す。**ファイルを削除する`git revert`ゲートに失敗します。ファイルを保持し、新しい移行 ( `npm run db:new-migration -- <description>`、 `DROP TABLE IF EXISTS`、 `DROP INDEX IF EXISTS`など) でそのスキーマを元に戻します。アップグレードされたデータベースと新しいデータベースは同じスキーマで終了します。
- **受け入れられた名前の変更: 互換性エントリと同一のコンテンツ。**マージされたファイルを移動する必要がある場合 (たとえば、2 つのマージされたファイルがタイムスタンプを共有し、バージョンの衝突によりランナーが停止する場合)、 SQLを変更せずに後のファイルの名前を変更し、 `src/lib/db/migrationRunner/constants.ts`の`RENAMED_MIGRATION_COMPATIBILITY`に`{ fromVersion, fromName, toVersion, toName }`を追加します。古いバージョンを適用したデータベースでは、ファイルを再度実行する代わりに、 `_omniroute_migrations`行が移動されます。ゲートはそのような名前変更について警告し、新しいタイムスタンプが何であれ、常に変更チェックを実行します。新規インストールではファイルが新しい位置に適用されますが、アップグレードされたデータベースでは適用されないため、古いタイムスタンプに近い新しいタイムスタンプを選択します。コンテンツが変更された場合 (新しい移行でスキーマ変更が引き続き行われる場合)、またはエントリのターゲット ファイルがディスク上にない場合、ゲートは名前変更に失敗します。
- **同じタイムスタンプ内で名前を変更しないでください。**タイムスタンプを保持し、説明のみを変更する名前変更は、エントリの有無にかかわらず、ゲートに失敗します。 `toVersion`が`fromVersion`と等しいエントリの場合、ランナーは古い`_omniroute_migrations`行を削除し、そのファイルをすでに実行しているすべてのデータベースに再度適用します。エントリがない場合、ランナーはバージョンのみを追跡します。つまり、これらのデータベース上のファイルをスキップし (新しいコンテンツがそこで実行されることはありません)、ブートごとに再番号付けエラーをログに記録します。別のタイムスタンプと互換性エントリを使用するか、名前をそのまま使用します。
- **ゲートは、名前が変更されたファイルが再度実行されないことをチェックします。**対象となる名前変更ごとに、ゲートは新しいファイル名を`--must-not-apply`による交換チェックに渡します。このチェックにより、アップグレードされたデータベースが実際のランナーで起動され、ランナーがそのファイルを再度適用すると (たとえば、エントリのバージョンまたは名前が間違っているため、またはゲートのテキスト パーサーが`constants.ts` TypeScriptと異なるように読み取ったために)、ゲートは`migration renomeada rodaria de novo`で失敗し、エントリの新旧のバージョンと名前を確認するように求められます。

### ゲートがベースに対して何をチェックするか

プル リクエストとマージ キューの実行時に、 `npm run check:migration-numbering`ディスク上の`src/lib/db/migrations/`ベース ブランチ上の同じディレクトリと比較します。ベースは、この順序で、 `--base-latest-tag`、 `--base <ref>`、 `MIGRATION_BASE_REF`変数、または`GITHUB_EVENT_NAME`が`pull_request`、 `pull_request_target`または`merge_group`の場合は、マージ コミットの最初の親、イベント ペイロードの`merge_group.base_sha` 、または`git merge-base HEAD origin/$GITHUB_BASE_REF`。解決可能なベースがないプル リクエストまたはマージ キューの実行では、ゲートが失敗します。 `--base`のないCI外側では、 `comparação com a base: pulada (sem --base)`が出力され、これらのルールがスキップされます。

`--base-latest-tag` 、 `--base`と同じルールで、 `HEAD`の履歴にある最新のリリース タグ (semver 順に`vX.Y.Z` 。nightlies などの接尾辞付きタグはカウントされません) と比較します。 Release-Green (`scripts/quality/validate-release-green.mjs`) はこの方法でゲートを実行します。プッシュおよびスケジュールされた実行にはプル リクエスト ベースがなく、新しいCIを実行しなくてもマージが完了する可能性があるためです。履歴にリリース タグがない場合、ゲートは失敗します。 `git fetch --tags`を実行します ( CIでは、 `actions/checkout`と`fetch-depth: 0`がタグをもたらします)。

| プルリクエストの変更                                                                                                          | 結果                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ベース上に存在するファイルの名前が変更され、 `RENAMED_MIGRATION_COMPATIBILITY`エントリが追加されます。                        | **警告**内容が同一で、新しいタイムスタンプに関係なく交換チェックが実行される場合。新しい位置によって最終スキーマが変更される場合 (名前変更を元に戻すか、交換する別の新しいタイムスタンプを選択する)、またはランナーが名前変更されたファイルをアップグレードされたデータベースに再度適用する場合、この処理は失敗します。**失敗する**内容が変わった場合。 |
| ベース上に存在するファイルは、タイムスタンプを維持したまま名前が変更されます（説明のみが変更されます）。                      | **失敗する**、エントリの有無にかかわらず、ランナーはそれを再度適用するか (エントリあり)、バージョンごとにスキップします (エントリなし)。別のタイムスタンプと互換性エントリを使用するか、名前をそのまま使用します。                                                                                                                                      |
| ベース上に存在するファイルが削除されるか、エントリなしで名前が変更される                                                      | **失敗する**、ファイルがリリースタグ内にあるかどうかに関係なく。元に戻すには、 `git checkout <base> -- src/lib/db/migrations/<file>`を使用してファイルを復元します。スキーマを元に戻すには、 `DROP ... IF EXISTS`を使用して新しい移行を追加します。                                                                                                     |
| ベース上に存在するファイルの内容が異なる                                                                                      | **警告**( GitHubアクションの`::warning`アノテーション)、交換チェックが実行されます。編集により最終スキーマが変更される場合、アップグレードされたデータベースは編集されたファイルを再度適用しないため、失敗します。変更を新しい移行に含めます。無害な編集 (コメント、 `IF NOT EXISTS`) は警告のみを出します。                                            |
| タイムスタンプ付きファイルは、ベースの最新のものより新しくないタイムスタンプで追加されます。                                  | 以下で説明する転流チェックを実行します。                                                                                                                                                                                                                                                                                                                |
| 古い形式の`NNN_`ファイルは、ベースの最新の古い形式のファイルの下に番号が付けられて追加されます。                              | **失敗する**`KNOWN_GAPS`同じプル リクエスト内で編集されている場合でも、古いシリーズは凍結されており、 `npm run db:new-migration`で移行を作成します。ベースの最新ファイル ( `release/v*`から`main`へのプル リクエスト) よりも古い形式のファイルが受け入れられます。                                                                                      |
| 順序が正しくない、編集または名前変更されたファイルに`INSERT`、 `UPDATE`、 `DELETE`または`REPLACE`ステートメントが含まれている | **警告**: 交換チェックではデータは比較されないため、アップグレードされたデータベースと新しいデータベースが適用される順序によって結果が変わるかどうかを確認してください。                                                                                                                                                                                |

交換チェックを 1 回実行すると、順序が乱れているファイル、編集されたファイル、および名前が変更されたファイルがすべてカバーされます。

交換チェック (`scripts/check/migration-commutation.ts`) は、実際のインストール パスを使用して 2 つの一時データベースを構築します。**アップグレードされた**1 つ (ベースの移行で起動し、プル リクエストの移行で同じファイルで再度起動) と 1 つ**新鮮な**1 つ (プル リクエストの移行を含む 1 つのブート)。結果のスキーマ: テーブルと列 (列の順序は無視)、 UNIQUE / PRIMARY KEYおよびFOREIGN KEY制約、各テーブルの正規化された`CREATE TABLE`テキスト ( CHECK制約、照合順序、生成された列とテーブル オプションをカバーします)、インデックス、トリガー、ビューを比較します。行データは比較されません。それらが一致する場合、ゲートはファイルが故障しているが通勤し、通過することを出力します。それらが異なる場合、ゲートはその違いとその場合のヒントで失敗します。順序が正しくないファイルの場合は、 `npm run db:new-migration`を使用してその名前を再生成します。ファイルはまだマージされていないため安全です。編集されたベース ファイルの場合は、ベース コンテンツを復元し、変更を新しい移行に反映します。名前を変更したファイルの場合は、名前の変更を元に戻すか、交換できる別の新しいタイムスタンプを選択します。別の名前と同じタイムスタンプは使用しないでください。チェック自体を実行できない場合、ゲートはCIで失敗し、ローカルでのみ警告します。編集されたベース ファイルの場合、アップグレードされたデータベースはそのファイルのベースのコンテンツを使用して構築され、バージョンがすでに記録されているため、2 回目の起動ではスキップされます。名前が変更されたファイルの場合、アップグレードされたデータベースは古い名前でファイルを使用して構築され、2 回目のブートでは、その`_omniroute_migrations`行が再度実行されるのではなく、互換性エントリを介して移動されます。ゲートは`--must-not-apply`を使用して新しい名前を渡すため、2 回目のブートでその名前が適用されるとチェックは失敗します。プル リクエストの移行がアップグレードされたパスに適用できない場合、つまり、ベースの移行が完了するたびに (新規インストールでも失敗するかどうかに関係なく)、ゲートは`migration do PR não aplica`報告し、ベースの現在のスキーマに対してSQL修正するように求めます。ファイルが、より後のタイムスタンプを持つ別のプル リクエストの移行に依存している場合は、 `npm run db:new-migration`を使用してその名前を再生成します。

同じ比較をローカルで実行するには、ベースを明示的に渡します (たとえば、 `npm run check:migration-numbering -- --base origin/<base-branch>`または`npm run check:migration-numbering -- --base-latest-tag` 。最新リリースと比較します。

### Open PRの`NNN`移行の変換

切り替え前にオープンされたプル リクエストには、 `242_add_widgets.sql`などのシーケンシャル ファイルが含まれる場合があります。 `241`より上の古い番号は拒否されるため、マージする前に変換します。

1. **説明を維持したまま、ジェネレーターを使用してファイルの名前を変更します。** `npm run db:new-migration -- <same description>`を実行して新しい名前を取得し、その中にSQLを移動し、古い`NNN_`ファイルを削除します。説明は同一でなければなりません。以下の互換性エントリがそれに一致します。
2. **永続データベースが古い番号を実行していた場合は、互換性エントリを追加します。**保存されているデータベース (ホモログ、 VPS、寄稿者自身のインストール) が`NNN_`ファイルを使用してPRのビルドを実行した場合は、 `src/lib/db/migrationRunner/constants.ts`の`RENAMED_MIGRATION_COMPATIBILITY`に`{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }`追加します。これは**`237`から`241`への変換に必要**: これらのスロットには正規の`237_usage_history_calculated_cost.sql`、 `238_codex_connection_fences.sql`、 `239_call_logs_pending_detail_index.sql`、 `240_provider_node_custom_json_config.sql`および`241_seen_models.sql`が保持されるようになり、エントリがないと、そのようなデータベースは正規の移行を永久にスキップし、変換された移行を再度実行します。また、宛先がタイムスタンプである場合、 `242`などの空のままのスロットでも機能します。疑問がある場合は、エントリを追加してください。配列内のどこに追加するかは重要ではありません。エントリのターゲット スロットが、別のエントリが移動する行をまだ保持している場合 (たとえば、古い`usage_history_calculated_cost`行が`237`への移動を待機している間、 `237` PR行を保持している場合)、ランナーはスロットが空くまでそのエントリを待機させます。 `Cannot reconcile ...`によるブートが停止するのは、行によって保持されているスロットがエントリを移動しない場合や、2 つのエントリがスロットを交換する場合など、実際の競合のみです。
3. **SQLべき等に保つ**(`CREATE TABLE IF NOT EXISTS`、 `CREATE INDEX IF NOT EXISTS`、 `INSERT OR IGNORE`)。これは、変換された移行が、そのスキーマがすでに存在するデータベースに遭遇する可能性があるためです。
4. **バージョンキー付きの特殊なケースを移動します。** PR `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) または`OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) に古い番号の大文字と小文字を追加した場合は、キーを新しいタイムスタンプに変更します。

`tests/unit/db/codex-fence-migration-rename.test.ts` 、名前を変更した移行のテストの実例です。

### 切り替え前のブランチへのバックポート

`YYYYMMDDHHMMSS_`ファイルを、切り替えよりも前のブランチ (古い`release/v*`ブランチなど) に厳選したり、バックポートしたりしないでください。そこのランナーはファイル名をテキストとしてソートするため、タイムスタンプ付きファイルは新しいデータベース上の`201_`と`202_`の間で実行されますが、そこにある古いゲートは 14 桁のプレフィックスを認識しません。そのようなブランチでは、変更をそのブランチ独自の次の`NNN_`ファイルとして冪等に書き込むため、タイムスタンプ付きのバージョンが後で到着しても何も操作されません。

### 移行の実行方法

起動時に、 `migrationRunner.ts`:

1. `_omniroute_migrations`テーブルが存在しない場合は作成します
2. すでに適用されている移行のクエリ
3. 新しい移行をトランザクション内で順番に適用します。
4. 適用された各移行をタイムスタンプ付きで記録します

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### べき等性

移行は次のようにする必要があります**冪等**—これらを 2 回実行しても何も実行されないはずです。

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`、 `IF EXISTS`、および`OR IGNORE` / `OR REPLACE`句を自由に使用してください。

### 新しい移行の追加

1. **ジェネレーターでファイルを作成する**: `npm run db:new-migration -- <description>` (たとえば、 `npm run db:new-migration -- add combo priority`)。現在のUTC時間とコメント ヘッダーを含む`src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql`書き込み、そのタイムスタンプが取得された場合は 1 秒進み、ファイルを上書きすることはありません。数字を手で選択しないでください。
2. **安全なDDLを使用する**: `CREATE TABLE IF NOT EXISTS`、 `CREATE INDEX IF NOT EXISTS`、 `ALTER TABLE ... ADD COLUMN`
3. **データを慎重に埋め戻します**: `UPDATE ... WHERE ...`を使用して既存の行を処理します
4. **順番と名前を確認する**: `npm run test:migrations:fresh` (空のデータベース上のすべての移行) および`npm run check:migration-numbering`
5. **コピーでテストする**: 本番環境ではテストされていない移行を決して実行しないでください

例：

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **下位互換性のない変更**(列の削除など) は注意が必要です。 OmniRoute NOTは—ダウングレードをサポートします。移行が適用されると、スキーマの変更は永続的になります。それに応じて計画を立ててください。

---

## 保存データの暗号化

機密性の高いフィールド（API キー、OAuth トークン、接続文字列）は、**AES-256-GCM** を使用して保存時に暗号化されます。

### 仕組み

```ts
// src/lib/db/encryption.ts（簡略版）
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 使用箇所

- `provider_connections.api_key` — アプリケーションレベルで暗号化
- `provider_connections.access_token`、`refresh_token`、`id_token` — アプリケーションレベルで暗号化
- `namespace = "secrets"` の `key_value` エントリ — アプリケーションレベルで暗号化
- `proxy_registry.auth` — 存在する場合、アプリケーションレベルで暗号化

### 暗号化キー

暗号化キーは、**パスフレーズ**（環境変数 `STORAGE_ENCRYPTION_KEY` で設定）と**ソルト**（DB に保存）から導出されます。データを復号するには、両方が必要です。

```bash
# 安全なパスフレーズを生成
openssl rand -hex 32

# .env に設定
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **重要**: 暗号化キーを紛失すると、暗号化されたすべてのデータにアクセスできなくなります。**キーはデータベースとは別にバックアップしてください**。

### 暗号化されないもの

パフォーマンス上の理由から、以下は平文で保存されます。

- プロバイダーの表示名
- モデル定義（すでに公開されている情報）
- ルーティングルール
- 使用状況レコード（PII なし）

---

## 暗号化に関する注意事項 (v3.8.16+)

OmniRoute は、2 つの暗号化方式を透過的に処理するために **`migrateLegacyEncryptedString()`** を使用します。

- **旧方式** (v3.5.0 より前): XOR ベースの「暗号化」(実際の暗号技術ではありません)
- **現行方式**: 適切な IV と認証タグを使用する AES-256-GCM

移行ヘルパーは旧形式を検出し、初回読み取り時に新しい方式で再暗号化します。これにより、認証情報を失うことなく古いデータベースをアップグレードできます。

---

## 読み取りキャッシュ

頻繁に読み取られるデータ (モデル、プロバイダー、設定) に対して、`readCache.ts` は**インメモリキャッシュ**を提供します。

```ts
// 起動時にキャッシュされ、書き込み時に無効化される
const providers = await getCachedProviders(); // 高速、インメモリ
const fresh = await listProviders(); // 低速、DB にアクセス
```

| キャッシュ対象エンティティ | キャッシュキー | TTL          |
| -------------------------- | -------------- | ------------ |
| `models`                   | `models:v1`    | 書き込みまで |
| `provider_connections`     | `providers:v1` | 書き込みまで |
| `settings`                 | `settings:v1`  | 書き込みまで |
| `combos`                   | `combos:v1`    | 書き込みまで |

対応するテーブルへの書き込みが行われるたびに、キャッシュは無効化されます。

---

## バックアップと復旧

### 手動バックアップ

```bash
# CLI を使用してローカルバックアップを作成する
omniroute backup create --name pre-migration

# または API 経由
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

バックアップファイルには以下が含まれます。

- すべての DB テーブル (JSON にシリアライズ)
- 呼び出しログのアーティファクト (base64 エンコード、任意)
- 設定 + シークレット (暗号化済み)
- プラグイン設定

### 復元

```bash
# CLI 経由
omniroute restore pre-migration

# API 経由
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **警告**: 復元すると DB 全体が上書きされます。最初にすべてのクライアントを停止してください。

### 自動バックアップ

```bash
# CLI を使用して毎日の自動バックアップを有効化する
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

スケジュールは、30 秒ごと (デフォルト) に実行されるバックグラウンドジョブによってサーバー側で処理され、ローカルサーバー時刻に基づいて cron 式が評価されます。

| 変数                                        | デフォルト | 説明                                                                                                                           |
| ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | ミリ秒単位の実行間隔 (最小 `5000`)。cron に一致する分の範囲内で確実に実行されるようにするには、60 秒未満にする必要があります。 |

### SQLite ホットバックアップ

稼働中の DB をダウンタイムなしでバックアップするには、以下を実行します。

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

これは SQLite のオンラインバックアップ API を使用するため、OmniRoute の実行中でも安全に実行できます。

---

## パフォーマンスチューニング

### WALモード

WALはデフォルトで有効になっています。書き込み頻度の高いワークロードの場合は、次のことを考慮してください。

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute `journal_size_limit`を設定しません。チェックポイントはWALフレームをメイン ファイルに移動しますが、 WALファイルは割り当てられた最大サイズを維持します。 `OMNIROUTE_WAL_GUARD_MAX_MB`ガードは警告を発し、 `wal_checkpoint(RESTART)`を実行するだけです。ディスクサイズの上限ではありません。

### インデックス

パフォーマンスの主要なインデックス (移行によって自動作成されます):

- `idx_models_provider` —プロバイダー別のモデル検索
- `idx_combo_targets_combo_id` —コンボ対象拡張
- `idx_usage_history_api_key_timestamp` —使用状況分析
- `idx_quota_snapshots_api_key_window` —クォータの追跡
- `idx_call_logs_timestamp` —通話ログ クエリ

新しいインデックスを追加するには、移行を作成します。

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### メモリマップドI/O

非常に大規模なデータベース (> 10GB) の場合、 SQLiteプラグマを介してメモリ マッピングを調整できます。

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 圧縮

長時間実行されるOmniRouteインスタンスは、時折`VACUUM`を利用することで恩恵を受けます。

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

毎月、トラフィックの少ない時間帯に実行します。 (WALモードは必要性を軽減しますが、排除するわけではありません。)

---

## ヘルスチェック

`src/lib/db/healthCheck.ts` は、**DB レベルのヘルス診断**を提供します。

どちらの HTTP メソッドにも認証が必要です（未認証の場合は `401`）。`GET` は診断のみを行い、`POST` は
`autoRepair` を有効にして同じチェックを実行します。

```bash
GET  /api/db/health   # 診断
POST /api/db/health   # 診断と修復
```

レスポンスは、`runDbHealthCheck()` によって生成される `DbHealthCheckResult` です
（`src/lib/db/healthCheck.ts`）。

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ドメイン予算が、すでに存在しないAPIキーを参照していました。",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| フィールド        | 意味                                                                                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` が空の場合は `true` です。`driver` がこの値に影響することはありません。                                                                                             |
| `issues[].type`   | `integrity_check_failed`、`broken_reference`、`stale_snapshot`、`invalid_state` のいずれかです。                                                                             |
| `repairedCount`   | 今回の実行中に修復された行数です。`autoRepair` が false の場合は常に `0` です。                                                                                              |
| `backupCreated`   | 修復前にバックアップが作成されたかどうかを示します。                                                                                                                         |
| `checkedAt`       | 実行時と、その実行によって書き込まれた修復メモで共通して使用される ISO タイムスタンプです。                                                                                  |
| `driver.name`     | チェック対象のデータベースを処理している SQLite ドライバーです。                                                                                                             |
| `driver.degraded` | 書き込みがデータベースファイルに永続的に保存されない場合は `true` です。該当するのは、`sql.js` WASM フォールバック（ファイル全体の永続化）またはインメモリデータベースです。 |

同じペイロードが `omniroute_db_health_check` MCP ツールからも返されます。

破損を検出するには、`PRAGMA integrity_check` を実行します。

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 以下が表示される必要があります: ok
```

`ok` 以外が返された場合は、**直ちにデータベースの使用を停止**し、バックアップから復元してください。

---

## ディザスタリカバリ

### シナリオ 1: WAL ファイルの消失

`-wal` ファイルが見つからないものの、`-shm` ファイルとメイン DB が無傷の場合:

```bash
# 次回起動時に自動的に復旧
omniroute
```

SQLite が自動復旧できない場合:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### シナリオ 2: メイン DB ファイルの破損

バックアップから復元します:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` は、稼働中のサーバーから完全な `.tar.gz` アーカイブをダウンロードするだけです
（`GET /api/db-backups/exportAll`、オペレーター認証情報が必要）。復元処理は行いません。

### シナリオ 3: 暗号化キーの紛失

キーがなければ**復旧は不可能です**。暗号化されたフィールドは読み取れません。新しい認証情報を使用して、すべてのプロバイダーを手動で再追加してください。

> **対策**: 暗号化キーは必ず別途バックアップしてください。パスワードマネージャーまたは KMS に保管することを推奨します。

### シナリオ 4: ディスク容量不足

SQLite は `SQLITE_FULL` エラーを返します。ディスク容量を解放してから、次を実行します:

```bash
# WAL をチェックポイントして容量を解放
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 一般的な操作

### テーブルを確認する

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### すべてのテーブルの行数を数える

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### すべてのデータをリセット（消去）する

```bash
# 最初に OmniRoute を停止する
omniroute stop

# DB ファイルを削除する
rm ~/.omniroute/storage.sqlite*

# 再起動する（空の DB が再作成される）
omniroute
```

**選択的な**リセット（プロバイダーを保持し、使用履歴を消去する）の場合：

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 単一のテーブルをエクスポートする

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## トラブルシューティング

### 「データベースがロックされています」

別のプロセスが書き込みロックを保持しています。以下のいずれかを行ってください:

- 他のプロセスが完了するまで待つ（`lsof | grep storage.sqlite` で確認）
- 他のプロセスを終了する
- 問題が続く場合は OmniRoute を再起動する

### 「外部キー制約に違反しました」

ドメインモジュールが参照整合性に違反しています。以下を確認してください:

- 依存テーブル内の孤立した行
- 伝播されなかったカスケード削除
- 外部キーを変更した最近のマイグレーション

違反を特定するには、`PRAGMA foreign_key_check;` を実行してください。

### 「メモリ不足」

SQLite のメモリマップド I/O が OS の上限を超えています。SQLite pragma を使用して削減してください:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB ではなく 128MB
```

または無効化します:

```sql
PRAGMA mmap_size = 0;
```

### 「マイグレーションが途中で失敗しました」

マイグレーションはトランザクション内で実行されたため、ロールバックされているはずです。ロールバックされていない場合:

1. **OmniRoute を停止する**（それ以上の試行を防止）
2. `sqlite3` で **DB の状態を確認する**
3. 不完全なマイグレーションを**手動で修正する**
4. OmniRoute を**再実行する**（マイグレーションが再試行されます）

これを防ぐため、必ず最初にコピー上でマイグレーションをテストしてください。

---

## 関連項目

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用状況テーブル
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ヘルスモニタリング
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — リリースフロー
- ソース: `src/lib/db/`（80 以上のファイル、約 25K LOC）
