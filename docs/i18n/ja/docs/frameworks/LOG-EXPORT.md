# Log export (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute のコールログを外部分析ストアへ継続的かつ増分的にエクスポートします。

Logs ダッシュボードタブでは、リクエスト履歴を SQLite（`call_logs`）に保持しますが、その量は
ローテーションと保持期間によって制限されます。ログエクスポートでは、同じレコードセットをスケジュールに従って外部へ送信するため、
ローカルデータベースより長期間保持でき、他のデータと結合できます。最初の送信先は BigQuery です。
パイプラインはレジストリ方式のため、送信先を追加できます。

---

## 1. 仕組み

```
サーバー（設定の復号化と検証、カーソルの調整）
  → IPC を開始 → 分離された exportChild OS プロセス
    → 読み取り専用 storage.sqlite → 共有のコールログクエリ／マッピング
      → 非同期アーティファクトハイドレーション → 送信先の prepare()/send()
        → バッチ IPC → サーバーがカーソルを永続化 → ack IPC
          → 次のバッチ、done IPC → サーバーが成功を記録
```

- **スケジュール** — `JobRegistry` の cron ジョブ `log_export` が 1 つあり、デフォルトは
  `0 * * * *`（毎時、UTC）です。`src/lib/initCloudSync.ts` で登録され、
  `OMNIROUTE_LOG_EXPORT_CRON` で上書きできます。各実行では、すべての**有効な**
  送信先を順番に処理し切ります。
- **カーソル** — SQLite の暗黙的な `call_logs.rowid` を使用し、送信先ごとに
  `log_export_destinations.cursor_row_id` へ永続化します。`timestamp` は意図的にカーソルとして
  使用しません。呼び出し元が独自の値を指定できるため、遅いリクエストが、それより後に開始された
  速いリクエストの後に書き込まれる可能性があり、タイムスタンプカーソルではその行がスキップされるためです。
- **バッチ処理** — リクエストごとに `batch_size` 行（デフォルトは 500）、実行ごとに
  `max_rows_per_run` 行（デフォルトは 10000）を処理します。これにより、大量のバックログが
  1 回の実行をブロックせず、複数回の実行にわたって処理されます。
- **配信** — カーソルは `send()` が解決した後にのみ進みます。バッチが失敗した場合、
  カーソルはその位置に留まるため、同じ行が次回の実行で再試行されます。この保証は真の
  exactly-once ではなく、at-least-once と送信先側での重複排除です。BigQuery は各行のキーとして
  コールログ ID を使用し、独自の重複排除期間内でベストエフォート方式により重複を排除します。
- **重複実行ガード** — cron の実行と `POST .../run` が同時に発生する可能性があります。
  すでに処理中の送信先は二重に処理されるのではなくスキップされます（実行結果では
  `skipped: true`）。そのため、並行実行によってバッチが再送信されたり、カーソルが後退したりすることはありません。
- **パージからの復旧** — `cursor_row_id` が `MAX(rowid)` を上回った場合（テーブル全体が
  パージされ、rowid が最初から振り直された場合）、ランナーは永続的にデータを見失わないよう、
  カーソルを 0 に巻き戻します。

### 分離されたランナーと制限

Node 上では、送信先ごとの各実行で、独立した短命の OS 子プロセス（`worker_threads` ではなく、
IPC を使用する `child_process`）が開始されます。本文の読み取り、ペイロード JSON の解析／シリアライズ、
送信先の `prepare()`、送信先とのネットワーク I/O はすべてそこで実行され、サーバーのイベントループでは
実行されません。IPC を通過するのは設定と小さな進捗メッセージだけであり、エクスポートされたレコードが
サーバーに戻ることはありません。cron ジョブと「今すぐ実行」ルートは、同じ公開結果と重複実行ガードを維持します。

子プロセスは、サーバーで解決された `DATA_DIR/storage.sqlite` を `node:sqlite` を使用して読み取り専用で開き、
`busy_timeout=5000` と `query_only=ON` を設定します。DB シングルトンはインポートせず、
マイグレーション、バックアップ、SQLite の更新も実行しません。欠落／破損したアーティファクトの記録処理
（破損アーティファクトに対する UPDATE を含む）は、引き続きダッシュボードの詳細表示パスでのみ行われます。
両方のパスは純粋な詳細リゾルバーを共有します。エクスポートでは非同期ファイルシステム読み取りを使用し、
アーティファクト → 従来のインライン → 従来のディスク → なし、という同じ解決順序を使用します。
実行時、子プロセスはリーダーを開いた時点で挿入 rowid の最大値をスナップショットとして取得します。
それ以降に挿入されたデータは、次回の実行まで待機します。これは挿入境界であり、長時間維持される
SQLite トランザクションではありません。ネットワーク待機中も WAL ライターとチェックポイントは自由に動作できます。
既存行の更新／削除は、この境界によって固定されません。

受理された各バッチの後、子プロセスは確認応答を待機します。サーバーは最初に
`advanceLogExportCursor` でカーソルを永続化し、その後 `ack` を送信します。これが完了するまで
次のバッチは開始されません。送信失敗、クラッシュ、またはタイムアウトが発生した場合、そのバッチの
カーソルを進めずに失敗を記録します。以前に確認応答されたバッチはコミット済みのままとなり、
再送信される可能性があるのは、確認応答されていない最大 1 バッチだけです。成功は `done` の受信後、
かつ子プロセスが正常終了した場合にのみ記録されます。失敗時には SIGTERM で子プロセスを終了し、
500 ms 後に SIGKILL へエスカレーションします。ランナーはプロセスが終了するまで待機します。

| 環境変数                                      | デフォルト | 用途                               |
| --------------------------------------------- | ---------- | ---------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | 送信先ごとの実時間制限             |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | 子 V8 の old-space 上限（MB 単位） |

無効な値、正でない値、または整数でない値にはデフォルトが使用されます。ヒープ設定は RSS 全体の
上限ではありません。非常に大きなバッチでは子プロセスのメモリが枯渇する可能性がありますが、
その場合も実行は安全に失敗します。デフォルトの 1024 MB は、本文を有効にした 512 KiB の
アーティファクトを 500 行含むデフォルトバッチに対し、BigQuery のバイト単位に分割された
JSON シリアライズを含めても余裕を確保します。ただし、本文を含む 10000 行のバッチを安全にするものではありません。
V8 のヒープ枯渇時には、対処可能な失敗として記録されます。バッチサイズを小さくするか、
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` を引き上げてください。カーソルは最後に
確認応答されたバッチの位置に留まります。過去のインライン／ディスク本文は、現行のアーティファクト上限の
対象ではありません。特にメモリ制限のあるコンテナ内では、運用者が RSS を別途見積もる必要があります。

子プロセスが継承するのは、解決済みの `DATA_DIR`、`NODE_ENV`、明示的な `TZ`（従来のファイル名に
おけるローカル時刻の解決用）、存在する場合の `ELECTRON_RUN_AS_NODE`、および以下の外向き通信用入力のみです。
`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY`（およびそれぞれの小文字形式）、
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`、`NODE_EXTRA_CA_CERTS`、`SSL_CERT_FILE`、`SSL_CERT_DIR`。
グローバルな Undici ディスパッチャーは、`NO_PROXY` を含め、サーバーの純粋な環境プロキシ解決と
ローカルホストのバイパスルールを共有します。`proxyFetch.ts` や、その DB／機能フラグはインポートしません。
プロキシ認証情報は、転送される出力と記録されるエラーから秘匿されます。送信先の認証情報は、
起動時の 1 回の IPC メッセージでのみ渡され、argv や環境には決して含まれません。出力／エラーの転送には
プレフィックスが付加され、機密情報が除去されます。cron の実行ごとに Node の SQLite 警告が繰り返されるのを
避けるため、子プロセスの実行引数では `ExperimentalWarning` のみ無効化されます。その他の種類の警告は
引き続き表示されます。

宛先モジュールは、Next.js やサーバー専用の依存関係がなくてもインポート可能でなければなりません。既存の
BigQuery 実装は、すでにこの契約を満たしています。アクセストークンのキャッシュは子プロセスでの
実行中のみ維持され、複数の実行をまたいでは保持されません。Node がサポート対象のランタイム
（`package.json` の engines）ですが、README の Bun インストールセクションと `Dockerfile.bun` でも、
`bun:sqlite`（`src/lib/db/core.ts` / アダプター）を使用する本番環境向けの互換性パスを提供しています。
そのため Bun では、エクスポート処理は従来のインプロセス経路を維持し、子プロセスによるヒープ分離および
タイムアウト分離が利用できないことを一度だけ警告します。イベントループと OOM の分離には
Node を使用してください。ここでは Bun を開発専用として扱いません。

`includeBodies` を有効にする場合は、1 時間分のペイロードを蓄積するのではなく、
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` のような分単位の実行間隔を推奨します。
バッチ制限と行数制限によって、各実行の上限は引き続き設定されます。プロセス起動コストは、
実行ごとに宛先単位で発生します。これは、総 CPU 使用量を削減するものではなく、わずかな起動コストと
引き換えにサーバーのイベントループを分離するものです。

### ペイロード（プロンプトと補完）

デフォルトでは、エクスポートに含まれるのは Logs の**一覧**に表示される要約フィールドだけです。
**プロンプトとレスポンスをエクスポート**（`includeBodies`）を有効にすると、各呼び出しについて
Logs の**詳細**ペインに表示される次の内容も送信されます。

| フィールド                       | 格納される内容                                                  |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | ダッシュボードで表示される呼び出しのペイロード                  |
| `pipeline_route_decision`        | ルーターが選択したターゲットとモデル                            |
| `pipeline_client_request`        | クライアントが送信したとおりの未加工リクエスト                  |
| `pipeline_openai_request`        | 内部の OpenAI 形式へ変換した後のリクエスト                      |
| `pipeline_provider_request`      | プロバイダーの方言で実際にアップストリームへ送信した内容        |
| `pipeline_provider_response`     | 未加工のアップストリームレスポンス                              |
| `pipeline_client_response`       | 呼び出し元へ返された内容                                        |
| `pipeline_error`                 | 失敗した呼び出しに関するパイプラインレベルのエラー詳細          |
| `bodies_truncated`               | 上記のいずれかのフィールドが `maxBodyBytes` に達した場合は True |

これはプロンプトの内容であるため、**デフォルトでは無効**であり、意図的に宛先ごとに選択できるように
なっています。エクスポートと `getCallLogById` は詳細解決処理を共有するため、送信される内容は
ダッシュボードに表示される内容と同じです。ペイロードは書き込み時にすでに PII のサニタイズと
シークレットの秘匿化が行われています。また、`noLog` API キーを使用した呼び出しでは
ペイロードが一切保存されないため、エクスポートするものもありません。

ペイロードはファイルシステムのアーティファクトから行ごとに読み取られるため、ハイドレーションは
それを要求した宛先に対してのみ実行されます。アーティファクトが存在しないか破損している場合は、
バッチを失敗させてカーソルを停滞させるのではなく、ペイロードを null として要約をエクスポートします。

`maxBodyBytes`（デフォルトは 262144）は、各フィールドの上限を設定します。これを超えるペイロードは
**破棄されるのではなく切り詰められます**。切り詰められたプロンプトでも「何が尋ねられたか」は
把握でき、該当する行には `bodies_truncated` が設定されます。ストリーミングされたチャンク単位の
差分はエクスポートされません。組み立て済みのレスポンスは、すでに `pipeline_provider_response` と
`pipeline_client_response` に格納されています。

---

## 2. ファイル

| 構成要素               | 場所                                         |
| ---------------------- | -------------------------------------------- |
| 送信先コントラクト     | `src/lib/logExport/types.ts`                 |
| レジストリ             | `src/lib/logExport/registry.ts`              |
| シークレット処理       | `src/lib/logExport/secrets.ts`               |
| ランナー（親 IPC）     | `src/lib/logExport/runner.ts`                |
| プロセスライフサイクル | `src/lib/logExport/childRunner.ts`           |
| 子プロセスエントリ     | `src/lib/logExport/exportChild.ts`           |
| 読み取り専用オープナー | `src/lib/db/logExportReadOnly.ts`            |
| 共有クエリ／マッピング | `src/lib/usage/callLogExportQueries.ts`      |
| 詳細リゾルバー         | `src/lib/usage/callLogDetailResolver.ts`     |
| API プロジェクション   | `src/lib/logExport/presenter.ts`             |
| BigQuery 送信先        | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA 認証         | `src/lib/logExport/googleServiceAccount.ts`  |
| コールログソース       | `src/lib/usage/callLogExportSource.ts`       |
| 永続化                 | `src/lib/db/logExportDestinations.ts`        |
| Cron ジョブ            | `src/lib/jobs/logExportJob.ts`               |
| REST レイヤー          | `src/app/api/log-export/`                    |
| ダッシュボードページ   | `src/app/(dashboard)/dashboard/log-export/`  |

スキーマ: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

すべてのルートで管理認証（`requireManagementAuth`）が必要です。シークレットが返されることはありません。
保存済みのシークレットはリテラル値 `__stored__` として返され、更新時にその値を送り返すと、
保存済みの認証情報が維持されます。

シークレットを宣言しているタイプの送信先を作成または更新するには、**`STORAGE_ENCRYPTION_KEY`
が必要です**。これがない場合、`encrypt()` は暗黙的に値をそのまま通すため、認証情報を
平文で SQLite に保存する代わりに、書き込みは 400 で拒否されます（Telegram webhook と
同じガードです）。

| メソッド | パス                                     | 目的                                            |
| -------- | ---------------------------------------- | ----------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | 送信先タイプとその設定フィールド一覧            |
| `GET`    | `/api/log-export/destinations`           | 送信先一覧（シークレットはマスキング済み）      |
| `POST`   | `/api/log-export/destinations`           | 送信先を作成                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | 1 件を取得                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | 名前 / 有効状態 / 設定 / バッチ処理を更新       |
| `DELETE` | `/api/log-export/destinations/{id}`      | 削除                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | 認証情報を検証し、何も書き込まない              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 即時に処理。同じパスをスケジュール実行でも使用  |
| `GET`    | `/api/log-export/status`                 | Cron の状態、最近の実行、送信先ごとのバックログ |

`GET /api/log-export/types` により UI が汎用化されています。ダッシュボードのフォームは
返されたフィールド記述子からレンダリングされるため、新しい送信先を追加しても UI の変更は不要です。

---

## 4. BigQuery 送信先

設定キー（`type: "bigquery"`）:

| キー                 | 注記                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| `projectId`          | データセットを保持する GCP プロジェクト                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                         |
| `location`           | データセットを作成する必要がある場合にのみ使用（デフォルト `EU`）       |
| `serviceAccountJson` | サービスアカウントキー。シークレット: 保存時に暗号化され、返却されない  |
| `autoCreate`         | 最初のエクスポート時にデータセットとテーブルを作成（デフォルト `true`） |

サービスアカウントには、対象テーブルに対する `bigquery.tables.updateData` が必要です。また、
`autoCreate` が有効な場合は `bigquery.datasets.create` / `bigquery.tables.create` も必要です。

設定されたバッチは HTTP 単位ではなく、**カーソル**単位です。`send()` は、最大 500 行の
insertAll 呼び出しに分割するため、大きな `batch_size` でも BigQuery の 10 MB のリクエスト上限を
超えることはありません。一時的なステータス（408/429/500/502/503/504）は、同じ insertIds を
再利用し、指数バックオフで最大 3 回再試行されます。認証エラーとスキーマエラーは、実行を
無駄に消費しないよう、最初の試行で例外をスローします。

作成直後のテーブルはまだストリーミングエンドポイントから参照できず、数秒間 404 が返されます。
この 404 は再試行されますが、**この実行でテーブルを作成した場合に限られます**。
実際にテーブルが存在しない場合は、即座に失敗します。最近削除したテーブルと同じ名前で
テーブルを再作成すると、BigQuery は数分間ストリーミング挿入を拒否することに注意してください。
これは削除後の再作成に伴う性質であるため、テーブルを削除して再追加するよりも、新しい
テーブル名を使用してください。

**部分的な失敗は、空でない `insertErrors[]` を伴う HTTP 200 として返されます。** これは失敗として
扱われ、例外がスローされます。これにより、BigQuery が受け付けなかった行を越えてカーソルが
進むことを防ぎます。`tests/unit/log-export-bigquery.test.ts` がこの動作を固定しています。

トランスポートには単純な REST を使用します。自己署名した RS256 アサーションを
`https://oauth2.googleapis.com/token` でアクセストークンと交換し、その後、行を
`tabledata.insertAll` に送信します。Google SDK は導入されません。アクセストークンは
（サービスアカウント、スコープ）ごとにプロセス内でキャッシュされます。

作成されるテーブルには、Logs タブの各フィールドに対応する列と `exported_at` があり、
実際の呼び出しログのクエリ方法に合わせて構成されます。

- **`timestamp` で日単位にパーティション分割**されるため、日付で範囲を指定したクエリでは、
  その期間の日だけがスキャンされます。
- **`api_key_name`、`provider`、`model`、`status` の順でクラスタリング**されるため、
  実行者、送信先、失敗の有無でフィルタリングすると、各パーティション内のブロックが
  プルーニングされます。BigQuery ではクラスタリング列を最大 4 列まで指定でき、順序が重要です。
  `api_key_name` のみのフィルターではプルーニングされますが、`status` のみではされません。
- `partitionExpirationDays` による**任意のパーティション保持期間**（0 の場合はすべて保持）が、
  テーブル作成時に適用されます。

どちらの設定も作成時に適用されます。既存のテーブルでは現在のレイアウトがそのまま維持されるため、
これらを採用する場合は、出力先に新しいテーブル ID を指定してください。

`tests/unit/log-export-bigquery.test.ts` は、マッパーとテーブルスキーマが常に同期していることを検証するため、
新しいコールログ列がエクスポート時に暗黙的に欠落することはありません。

バッチは、行数とシリアライズ後のバイト数の**両方**に基づいてチャンク分割されます。ペイロードをエクスポートする場合、
行数だけでは不十分です。プロンプトを含む 500 行は数十メガバイトになる可能性があり、insertAll は
10 MB を超えるリクエストを拒否します。チャンクは、500 行または 9 MB のいずれかに先に達した時点で区切られます。

---

## 5. 送信先の追加

1. `LogExportDestinationType` をエクスポートする `src/lib/logExport/destinations/<name>.ts` を作成します。これには、Zod の `configSchema`、UI 用の `fields` 記述子配列、`secretFields`、および `test()` / `prepare()` / `send(records)` を返す `createClient(config)` を含めます。
2. `src/lib/logExport/registry.ts` の `DESTINATIONS` 配列に追加します。
3. `tests/unit/` 配下にテストを作成します。

変更はこれだけです。永続化、cron ジョブ、REST レイヤー、シークレットの暗号化、およびダッシュボードフォームは、すべてレジストリを参照します。

新しい送信先には、次の 2 つのルールがあります。

- 部分的な失敗が発生した場合、`send()` は**必ず例外をスローしなければなりません**。正常終了した場合は「送信先にこれらの行が存在する」ことを意味し、カーソルはそれらの行を完全に通過します。
- ユーザー指定の URL を受け取る送信先は、webhook と同じ方法で、フェッチ前に `parseAndValidateWebhookUrl`（`src/shared/network/outboundUrlGuardPolicy.ts`）を使用して URL を検証する必要があります。BigQuery ではホストが定数であるため、この検証は不要です。

---

## 6. 運用方法

- **ダッシュボード**: Integrations → Log export。送信先を追加し、行を書き込まずに認証情報を確認するために **Test** を実行してから、有効化します。
- **バックログ**: 各送信先カードには、保留中の行数とカーソルが表示されます。`GET /api/log-export/status` は、同じ情報に加えて直近 20 回のジョブ実行結果を返します。
- **1 つの送信先で失敗しても、他の送信先は失敗しません** — 実行サマリーでは送信先ごとのステータスが `last_status` / `last_error` に記録され、ジョブ実行履歴には集計結果が保持されます。
- **送信先を削除すると、そのカーソルも削除されます。** 再度追加すると、保持されている最古の呼び出しログから開始されるため、その送信先にすでに存在する可能性がある行が再送信されます。BigQuery では、行ごとの `insertId` による重複排除が有効なのは BigQuery 自体の重複排除期間内に限られるため、送信先は削除するよりも無効化することを推奨します。
