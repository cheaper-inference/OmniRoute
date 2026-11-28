# Log export (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute の呼び出しログを外部の分析用ストアへ継続的かつ増分でエクスポートします。

ダッシュボードの「ログ」タブは、リクエスト履歴を SQLite（`call_logs`）に保存しますが、その保存範囲は
ローテーションと保持期間によって制限されます。ログエクスポートは、同じレコード群をスケジュールに従って外部へ送信することで、
ローカルデータベースの保持期間を超えた保存や、他のデータとの結合を可能にします。最初の送信先は BigQuery です。
パイプラインはレジストリ方式のため、送信先を追加して拡張できます。

---

## 1. 仕組み

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **スケジュール**— one `JobRegistry` cron ジョブ、 `log_export`、デフォルトは`0 * * * *` (時間ごと、 UTC)。 `src/lib/initCloudSync.ts`に登録されました。 `OMNIROUTE_LOG_EXPORT_CRON`でオーバーライド可能。各ダニは毎回排出されます**有効**目的地を順番に。
- **Cursor** — SQLiteの暗黙的な`call_logs.rowid` `log_export_destinations.cursor_row_id`宛先ごとに保持されます。 `timestamp`は意図的にカーソルではありません。呼び出し元は独自の値を指定できるため、後で開始された高速リクエストの後に低速リクエストを書き込むことができ、タイムスタンプ カーソルはそれをスキップします。
- **バッチ処理**— `batch_size`はリクエストごとに行数 (デフォルトは 500)、 `max_rows_per_run`実行ごとに行数 (デフォルトは 10000) なので、大きなバックログは 1 ティックをブロックするのではなく、数ティックにわたって排出されます。
- **Delivery** — the cursor advances only after `send()` resolves. A failed batch leaves the cursor where it was, so the same rows are retried on the next run. The guarantee is at-least-once plus destination-side de-duplication, not true exactly-once: BigQuery keys each row by the call-log id, which it honours on a best-effort basis within its own dedup window.
- **オーバーラップガード**— the cron ticket と`POST .../run`一緒に起動できます。すでに排出されている宛先は 2 回排出されるのではなくスキップされるため (実行結果の`skipped: true` )、同時実行ではバッチを再送信したり、カーソルを逆方向に書き込んだりすることはできません。
- **パージ回復**— `cursor_row_id` `MAX(rowid)`を上回った場合 (テーブル全体がパージされ、ROWID が再起動された場合)、ランナーは永久にブラインド状態になるのではなく、0 に巻き戻されます。

### 孤立したランナーと制限

Node 上で実行されるすべての宛先は、別個の短期間のOS子プロセス ( IPCではなく、 `worker_threads`を伴う`child_process` ) を開始します。本体の読み取り、ペイロードJSON parsing/serialization、宛先`prepare()` 、および宛先ネットワークI/Oはすべて、サーバーのイベント ループ上ではなく、そこで実行されます。 IPCを通過するのは構成メッセージと小さな進行状況メッセージのみです。エクスポートされたレコードはサーバーに戻ることはありません。 cron ジョブと今すぐ実行ルートは同じ公開結果を維持し、ガードをオーバーラップします。

The child opens the server's resolved `DATA_DIR/storage.sqlite` read-only using `node:sqlite`, with `busy_timeout=5000` and `query_only=ON`. It imports no DB singleton and performs no migrations, backups or SQLite updates. Missing/corrupt artifact bookkeeping (including the corrupt-artifact UPDATE) remains in the dashboard detail path only. Both paths share a pure detail resolver; export uses asynchronous filesystem reads and the same artifact → legacy inline → legacy disk → none resolution order. A run snapshots the maximum insertion rowid when the child opens its reader; later inserts wait for the next run. This is an insertion boundary, not a long-lived SQLite transaction: WAL writers and checkpoints remain free during network waits. Updates/deletions of existing rows are not frozen by this boundary.

バッチが受け入れられるたびに、子は確認応答を待ちます。サーバーはまず`advanceLogExportCursor`でカーソルを保持し、次に`ack`を送信します。その前に次のバッチが開始されることはありません。送信失敗、クラッシュ、またはタイムアウトは、そのバッチを進めることなく失敗を記録します。以前に承認されたバッチはコミットされたままになります。再送信できるのは、最大でも 1 つの未確認バッチです。成功は、 `done`とクリーンな子終了後にのみ記録されます。障害が発生すると、子はSIGTERMで終了し、500 ミリ秒後にSIGKILLにエスカレートし、ランナーはプロセスが終了するまで待機します。

| 環境変数                                      | デフォルト | 目的                           |
| --------------------------------------------- | ---------- | ------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | 宛先ごとのウォールクロック制限 |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | MBの子 V8 古いスペースの制限   |

Invalid/non-positive/non-integer値はデフォルトを使用します。ヒープ設定は、 RSS合計制限ではありません。非常に大きなバッチでも子メモリを使い果たし、実行が安全に失敗する可能性があります。 1024 MBのデフォルトでは、 BigQueryのバイトチャンク化されたJSONシリアル化を含む、ボディが有効になっている 512 KiBアーティファクトのデフォルトの 500 行バッチ用のヘッドルームが残されています。 10000 行のボディのバッチを安全にするわけではありません。 V8 ヒープ枯渇は、対処可能なエラーを記録します。バッチ サイズを下げるか、 `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`を上げます。カーソルは最後に確認されたバッチに留まります。歴史的なinline/diskボディは、現代のアーティファクトのキャップで覆われていません。オペレータは、特にメモリが制限されたコンテナ内では、 RSS個別に予算設定する必要があります。

子は、解決された`DATA_DIR`、 `NODE_ENV`、明示的な`TZ` (従来のファイル名ローカル時間解決)、 `ELECTRON_RUN_AS_NODE`存在する場合)、および次の送信入力のみを継承します: `HTTP_PROXY`、 `HTTPS_PROXY`、 `ALL_PROXY`、 `NO_PROXY` (およびそれらの小文字形式)、 `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`、 `NODE_EXTRA_CA_CERTS`、 `SSL_CERT_FILE`、 `SSL_CERT_DIR`。グローバル Undici ディスパッチャは、サーバーの純粋な環境プロキシ解決とローカル ホスト バイパス ルール`NO_PROXY`を含む) を共有します。 `proxyFetch.ts`またはそのDB/featureフラグはインポートされません。プロキシ資格情報は、転送された出力と記録されたエラーから編集されます。宛先資格情報は 1 つの開始IPCメッセージ内でのみ送信され、argv や環境では送信されません。 output/error転送にはプレフィックスが付けられ、サニタイズされます。 cron が実行されるたびにノードのSQLite警告が繰り返されるのを避けるために、子 exec 引数では`ExperimentalWarning`のみが無効になります。他の種類の警告は表示されたままになります。

宛先モジュールは、 Next.js/server-only依存関係なしでインポート可能である必要があります。既存のBigQuery実装はすでにその契約を満たしています。アクセス トークン キャッシュは、実行間ではなく、子の実行に対してのみ保持されます。ノードはサポートされているランタイム (`package.json`エンジン) です。ベストエフォートのサポートされていないBun互換パス ( `src/lib/db/core.ts` /adapters の`bun:sqlite` 、および`Dockerfile.bun`) が存在するため、エクスポートがそのパスで中断されないようにする必要があります。 Bunでは、エクスポートは以前のインプロセス パスを保持し、子heap/timeout分離が利用できないという 1 回限りの警告を発行します。イベント ループとOOM分離にはノードを使用します。

`includeBodies`が有効な場合は、時間ごとのペイロード バックログを蓄積するのではなく、 `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`などの分レベルのケイデンスを優先します。バッチと行の制限は依然として各実行に制限されています。プロセスの起動料金は、実行ごとに宛先ごとに支払われます。これにより、 CPU合計使用量が削減されるのではなく、サーバーのイベント ループが分離されるため、わずかな起動コストが犠牲になります。

### ペイロード (プロンプトと完了)

デフォルトでは、エクスポートにはログの概要フィールドのみが含まれます。**リスト**を示しています。電源を入れる**プロンプトと応答をエクスポートする**(`includeBodies`) には、ログが追加で出荷されます。**詳細**ペインには各通話が表示されます。

| 分野                             | 保持しているもの                                            |
| -------------------------------- | ----------------------------------------------------------- |
| `request_body` / `response_body` | ダッシュボードがレンダリングする通話ペイロード              |
| `pipeline_route_decision`        | ルーターが選択したターゲットとモデル                        |
| `pipeline_client_request`        | クライアントが送信したままの生のリクエスト                  |
| `pipeline_openai_request`        | 内部OpenAI形状への変換後                                    |
| `pipeline_provider_request`      | 実際に上流に送信されるように、プロバイダーの方言で          |
| `pipeline_provider_response`     | 生のアップストリーム応答                                    |
| `pipeline_client_response`       | 発信者に返されたもの                                        |
| `pipeline_error`                 | 失敗した呼び出しのパイプラインレベルのエラーの詳細          |
| `bodies_truncated`               | 上記のいずれかのフィールドが`maxBodyBytes`ヒットすると True |

これは即時的な内容ですので、**デフォルトではオフになっています**そして意図的に目的地ごとに選択します。エクスポートと`getCallLogById`詳細な解決策を共有しているため、出荷されるものはダッシュボードに表示されます。ペイロードは、書き込み時にすでに PII サニタイズおよび秘密編集されており、 `noLog` APIキーを使用して行われた呼び出しではペイロードがまったく保存されないため、エクスポートするものはありません。

ペイロードはファイルシステム アーティファクトから行ごとに読み取られるため、ハイドレーションはそれを要求した宛先に対してのみ実行されます。欠落または破損したアーティファクトは、バッチが失敗してカーソルが停止するのではなく、null ペイロードで概要をエクスポートします。

`maxBodyBytes` (デフォルトは 262144) は各フィールドの上限を設定します。より長いペイロードは、**削除されるのではなく切り捨てられる**—クリップされたプロンプトは依然として「質問された内容」に応答します—と、行には`bodies_truncated`のフラグが立てられます。ストリーミングされたチャンクごとのデルタはエクスポートされません。組み立てられた応答はすでに`pipeline_provider_response`と`pipeline_client_response`にあります。

---

## 2. ファイル

| 構成要素                       | 場所                                         |
| ------------------------------ | -------------------------------------------- |
| 送信先の契約                   | `src/lib/logExport/types.ts`                 |
| レジストリ                     | `src/lib/logExport/registry.ts`              |
| シークレットの処理             | `src/lib/logExport/secrets.ts`               |
| ランナー（親プロセスのIPC）    | `src/lib/logExport/runner.ts`                |
| プロセスのライフサイクル       | `src/lib/logExport/childRunner.ts`           |
| 子プロセスのエントリーポイント | `src/lib/logExport/exportChild.ts`           |
| 読み取り専用で開く処理         | `src/lib/db/logExportReadOnly.ts`            |
| 共通のクエリ／マッピング       | `src/lib/usage/callLogExportQueries.ts`      |
| 詳細リゾルバー                 | `src/lib/usage/callLogDetailResolver.ts`     |
| API向けの射影                  | `src/lib/logExport/presenter.ts`             |
| BigQuery送信先                 | `src/lib/logExport/destinations/bigquery.ts` |
| Googleサービスアカウント認証   | `src/lib/logExport/googleServiceAccount.ts`  |
| 呼び出しログのソース           | `src/lib/usage/callLogExportSource.ts`       |
| 永続化                         | `src/lib/db/logExportDestinations.ts`        |
| Cronジョブ                     | `src/lib/jobs/logExportJob.ts`               |
| RESTレイヤー                   | `src/app/api/log-export/`                    |
| ダッシュボードページ           | `src/app/(dashboard)/dashboard/log-export/`  |

スキーマ: `src/lib/db/migrations/170_log_export_destinations.sql`。

---

## 3. REST API

すべてのルートで管理者認証（`requireManagementAuth`）が必要です。シークレットが返されることはありません。
保存済みのシークレットはリテラル値 `__stored__` として返され、更新時にその値を送り返すと
保存済みの認証情報が維持されます。

シークレットを宣言するタイプの送信先を作成または更新するには、**`STORAGE_ENCRYPTION_KEY`
が必要です**。これがない場合、`encrypt()` は何も通知せずに入力をそのまま返すため、
認証情報がSQLiteに平文で保存されないよう、書き込みは400で拒否されます（Telegram webhookで
適用されるものと同じガードです）。

| メソッド | パス                                     | 用途                                                 |
| -------- | ---------------------------------------- | ---------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | 送信先タイプとその設定フィールド一覧                 |
| `GET`    | `/api/log-export/destinations`           | 送信先の一覧取得（シークレットは非表示）             |
| `POST`   | `/api/log-export/destinations`           | 送信先の作成                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | 1件の取得                                            |
| `PUT`    | `/api/log-export/destinations/{id}`      | 名前／有効状態／設定／バッチ処理設定の更新           |
| `DELETE` | `/api/log-export/destinations/{id}`      | 削除                                                 |
| `POST`   | `/api/log-export/destinations/{id}/test` | 認証情報の検証（書き込みなし）                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | スケジュール実行と同じ処理経路で、未処理分を即時処理 |
| `GET`    | `/api/log-export/status`                 | Cronの状態、最近の実行、送信先ごとの未処理件数       |

`GET /api/log-export/types` によってUIの汎用性が実現されています。ダッシュボードのフォームは
返されたフィールド記述子から描画されるため、新しい送信先を追加してもUIの変更は不要です。

---

## 4. BigQuery 宛先

設定キー（`type: "bigquery"`）:

| キー                 | 注記                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `projectId`          | データセットを保持する GCP プロジェクト                                                                        |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                |
| `location`           | データセットの作成が必要な場合にのみ使用（デフォルトは `EU`）                                                  |
| `serviceAccountJson` | サービスアカウントキー。Secret: 保存時に暗号化され、返されることはない                                         |
| `autoCreate`         | 存在しないデータセット／テーブルを作成し、NULL 許容の使用状況証拠カラムを条件付きで追加（デフォルトは `true`） |

サービスアカウントには対象テーブルに対する `bigquery.tables.updateData` と、`autoCreate` が有効な場合は
`bigquery.datasets.create` / `bigquery.tables.create` が必要です。既存のテーブルに2つの NULL 許容の使用状況証拠フィールドを追加する場合は、
`bigquery.tables.update` も必要です。権限が不足している場合、カーソルを進めずにエクスポートは失敗します。

設定されたバッチは HTTP の単位ではなく**カーソルの単位**です。`send()` はこれを最大500行の
insertAll 呼び出しに分割するため、大きな `batch_size` でも BigQuery の10 MBリクエスト上限には抵触しません。
一時的なステータス（408/429/500/502/503/504）は、同じ insertIds を再利用しながら指数バックオフで
最大3回再試行されます。認証およびスキーマの失敗は、実行を無駄に消費することなく、初回試行でスローされます。

作成直後のテーブルはストリーミングエンドポイントからまだ認識できず、数秒間404を返すことがあります。
この404は再試行されますが、**この実行でテーブルを作成した場合に限ります**。本当に存在しないテーブルの場合は即座に失敗します。
最近削除されたテーブルを同じ名前で再作成すると、BigQuery は数分間ストリーミング挿入を拒否することにも注意してください。
これは削除してから再作成する操作の特性であるため、テーブルを削除して再追加するよりも、新しいテーブル名を使用してください。

**部分的な失敗は、空でない `insertErrors[]` を伴う HTTP 200 として返されます。** これは
失敗として扱われてスローされます。これにより、BigQuery が受け付けなかった行を越えてカーソルが進むことを防ぎます。
`tests/unit/log-export-bigquery.test.ts` がこの動作を固定化しています。

トランスポートは通常の REST です。自己署名 RS256 アサーションを
`https://oauth2.googleapis.com/token` でアクセストークンに交換し、その後、行を
`tabledata.insertAll` に送信します。Google SDK は導入されません。アクセストークンはプロセス内で
（サービスアカウント、スコープ）ごとにキャッシュされます。

作成されるテーブルには Logs タブの各フィールドに対応するカラムが1つずつ追加され、さらに `exported_at` が追加されます。
また、実際の呼び出しログのクエリ方法に合わせて、次のように構成されます。

- **`timestamp` による日単位のパーティション分割**。日付で範囲を指定したクエリでは、その日付に該当する日だけがスキャンされます。
- **`api_key_name`、`provider`、`model`、`status` の順でクラスタリング**。これにより、
  誰が実行したか、どこに送信されたか、失敗したかどうかによるフィルタリングで、各パーティション内のブロックが絞り込まれます。BigQuery では
  クラスタリングカラムは最大4つまで許可され、順序が重要です。`api_key_name` のみでフィルタすると
  絞り込まれますが、`status` のみでフィルタしても絞り込まれません。
- **`partitionExpirationDays` による任意のパーティション保持**（0 はすべて保持）。テーブルの作成時に適用されます。

両方の設定は作成時に適用されます。既存のテーブルでは現在のレイアウトが維持されるため、
これらを適用したい場合は、宛先を新しいテーブル ID に指定してください。

`tests/unit/log-export-bigquery.test.ts` は、マッパーとテーブルスキーマが常に一致していることを検証するため、
新しい呼び出しログのカラムが出力時に黙って失われることはありません。

バッチは**行数とシリアライズ後のバイト数の両方**で分割されます。ペイロードをエクスポートする場合、
行数だけでは不十分です。プロンプトを含む500行は数十メガバイトになる可能性があり、insertAll は10 MBを超えるリクエストを拒否します。
チャンクは、500行または9 MBのいずれか早い方で確定します。

---

## 5. OTLP/HTTP トレース送信先

設定では `type: "otlp-http"` を使用します。これは永続化された呼び出しログをスケジュール実行でカーソルに基づいてエクスポートするものであり、
`open-sse/services/routing/otel.ts` にあるベストエフォート型のライブ routing-event シンクではありません。そちらのシンクの環境変数、
タイマー、バッファーを読み取ったり変更したりすることはありません。両方を有効にすると、独立した 2 種類のスパンが生成される可能性があります。
これらの call-log スパンを区別するには、`omniroute.log-export` インストルメンテーションスコープを使用してください。

| Key                      | Default / purpose                                                          |
| ------------------------ | -------------------------------------------------------------------------- |
| `endpoint`               | 必須の完全な HTTP(S) トレース URL。`/v1/traces` サフィックスは付加されない |
| `headers`                | 任意の `Name: value` 行または文字列の JSON オブジェクト。暗号化される      |
| `requestHeaderAllowlist` | 空（オフ）。スパン属性として取得するクライアントヘッダー名／プレフィックス |
| `serviceName`            | `omniroute`。リソースの `service.name`                                     |
| `langfuseMapping`        | `false`。Langfuse の generation/session/user 属性を追加                    |
| `identity`               | `pseudonymous`、`keyName`、または `none`                                   |
| `paths`                  | `/v1/chat/completions`、`/v1/responses`、`/v1/messages`                    |
| `timeoutMs`              | HTTP 試行ごとに `30000`                                                    |
| `environment`            | 未設定。任意の `langfuse.environment`                                      |

汎用ダッシュボードでは、これらのフィールドが表示されます。`paths` には API 配列、または改行／カンマで区切った完全一致パスのテキストエリアを指定できます。
Embeddings、rerank、その他のパスは明示的に許可しない限りスキップされます。スキップされた行でもカーソルは進みます。既存 runner の
`exported`／`exportedTotal` カウンターは、許可されたスパンではなく、フィルタリングされた行を含む処理済みソース行をカウントします。フィルタリングは子プロセス内で行われ、
IPC／カーソルの契約は変更されません。

URL の検証には、`src/shared/network/outboundUrlGuard.ts` の DB を使用しない
`parseAndValidateNonMetadataUrl` ヘルパーの `block-metadata` ポリシーを使用します。これは webhook バリデーターと同じ
メタデータ／プロトコル／埋め込み認証情報に対する無条件のチェックを行い、プライベート URL は許可します。ただし、グローバルな
feature-flag による上書きなしで localhost／LAN の宛先を意図的に許可します。これにより、プライベート HTTP エンドポイントを含む、
セルフホスト型の Langfuse、Phoenix、Tempo、Collector のエンドポイントを使用できます。クラウドメタデータのホストは常にブロックされます。
リダイレクトは追跡されないため、Collector が認証情報を別のホストへリダイレクトすることはできません。既存の字句ベースの URL ガードと同様に、
これは DNS 解決を固定しません。運用者が管理するホストのみを設定してください。エンドポイントが信頼できるネットワーク上にない場合は、
HTTPS を優先してください。

### ペイロードと配信

OTLP/HTTP JSON（`ExportTraceServiceRequest`、`Content-Type: application/json`）には、許可された各行につき 1 つの
CLIENT スパンが含まれ、その名前には完全一致するリクエストパスが使用されます。パス名により Chat Completions、Responses、Messages を区別できます。
スパン名にモデルや ID データを埋め込むことはありません。リソース属性には `service.name` とパッケージの `service.version` が含まれます。

通常のチャット試行ロガー（`open-sse/handlers/chatCore/attemptLogging.ts`）は完了時に
`duration = Date.now() - startTime` を書き込み、タイムスタンプは提供しません。
`src/lib/usage/callLogs.ts` の `saveCallLogOperation` は、タイムスタンプをデフォルトで書き込み時刻（完了時刻）に設定します。
そのためエクスポートでは、end に行のタイムスタンプを設定し、start には end − duration
（ミリ秒を 10 進ナノ秒に変換）を設定します。呼び出し元から提供された過去のタイムスタンプも同様に end 時刻として保持されます。
行ごとの開始時刻／完了時刻を判別する情報はありません。null の duration はゼロになります。無効または欠落したタイムスタンプは、
非決定的なスパンを作成せずにバッチを失敗させます。`ttftMs` は nullable で、`omniroute.ttft_ms` にマッピングされます。

属性には、`gen_ai.operation.name="chat"`、provider、要求モデル／応答モデル、入力／出力トークン、任意のキャッシュ読み取り／キャッシュ作成／推論トークン、
HTTP ステータス、combo、キャッシュソース、セッションタグ、相関 ID が含まれます。整数の OTLP 値とタイムスタンプは 10 進文字列で表現されます。
文字列、ブール値、少数値には、それぞれのネイティブ OTLP 値バリアントが使用されます。エラースパンには ERROR ステータスとサニタイズ済みのステータスメッセージが設定されます。
正規レコードには上流ホスト URL がないため、モデルサーバーとして Collector を誤って識別しないよう、`server.address` は省略されます。
コストはエクスポートされません。

`includeBodies=true` の場合にのみ、コンテンツが読み込まれます。`langfuseMapping=false` では、
`gen_ai.input.messages`／`gen_ai.output.messages` に、OmniRoute が保存したサニタイズ済みのリクエスト／レスポンス本文 JSON が格納されます
（解析可能な場合は正規化されます）。切り詰められた本文や JSON でない本文は、未加工のテキストのままです。
`langfuseMapping=true` では、本文は `langfuse.observation.input`／`langfuse.observation.output` としてのみ出力されます。
各本文を 1 回だけ送信するため、`gen_ai.*.messages` 属性は省略されます。どちらのモードも既存の hydration path から
`maxBodyBytes` を継承します。本文が切り詰められた場合は `omniroute.bodies_truncated=true` が設定されます。
この送信先によって、追加のパイプラインスナップショットやサニタイズされていないアーティファクトの読み取りが追加されることはありません。
任意のリクエストヘッダー取得では、以下で説明する既存の hydrated client snapshot を使用します。本文をエクスポートする場合は、
1 時間分のバックログを蓄積するのではなく、`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` のような分単位の間隔を使用してください。

### 任意のクライアントリクエストヘッダー

ヘッダー取得は**デフォルトでオフ**です。送信先設定で `requestHeaderAllowlist` を設定し、
**プロンプトとレスポンスをエクスポート**（送信先で `includeBodies: true`）を有効にしてください。
許可リストには API 配列、または改行／カンマで区切った名前を含むテキストエリアを指定できます。

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

名前は大文字と小文字を区別せず、末尾に単一の `*` がある場合を除いて完全一致します。この `*` は空でない
header-name プレフィックスを選択します。単独の `*`、埋め込みワイルドカード、無効な HTTP ヘッダー名は拒否されます。
セレクターは最大 64 個で、それぞれの名前またはプレフィックスは ASCII 256 バイト以内です。
この設定は `headers` とは別のものであり、`headers` はエクスポーターがコレクターに対して認証するために使用されます。

キャプチャでは、保存された詳細パイプラインの
`clientRawRequest`（または従来の `clientRequest`）から設定される `pipeline_client_request` のみを読み取ります。プロバイダーのリクエストヘッダーにフォールバックすることはありません。
リクエストの記録時に詳細パイプラインのログが有効になっていなければなりません。
`includeBodies` が無効の場合、またはクライアントスナップショット JSON が欠落、破損、もしくは切り詰められている場合、ヘッダー属性は出力されません。`maxBodyBytes` を増やすことでエクスポート時のスナップショット切り詰めを回避できますが、保存されなかった詳細を復元することはできません。1 MiB を超えるスナップショット、または 256 個を超えるヘッダーエントリを含むスナップショットは無視されます。既存のプロンプト／レスポンスのエクスポートはヘッダーキャプチャと併用して有効なままです。許可リストによってヘッダーのみをハイドレーションするモードが提供されるわけではありません。

選択された値は、単一の文字列の場合でも、OTLP の文字列配列として
`http.request.header.<full lowercase header name>` になります。たとえば、
`X-OmniRoute-Meta-Team: example-team` は
`http.request.header.x-omniroute-meta-team` となり、
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` が設定されます。
完全なプレフィックスは保持されます。これらは通常のヘッダーであり、ビジネスフィールドの解析や
`omniroute.metadata.*`／Langfuse メタデータへの変換は行われません。
`langfuseMapping` によってヘッダーの意味は変わりません。選択された単一値の `User-Agent` は、標準のスカラー属性
`user_agent.original` も設定します。1 つの値に含まれるカンマは分割されません。大文字と小文字の異なる形式は、保存されたエントリの順序で統合されます。いずれかの形式が無効な場合、そのヘッダー全体が省略されます。属性は小文字の名前順に並べられます。

Authorization、Proxy-Authorization、Cookie、Set-Cookie、API キーヘッダー、auth/token/secret/password/credential マーカーを含む名前、内部ゲートウェイ認証情報は、選択されている場合やストレージ内で部分的にマスクされている場合でも常に除外されます。既知の認証情報パターンでは共有認証情報検出器が再利用されます。削除マーカーは省略され、安全な値としてエクスポートされません。
受け入れられるのは文字列と空でない文字列配列のみであり、数値やオブジェクトが強制的に変換されることはありません。
無効な名前、プロトタイプキー、制御文字（水平タブを除く）、不正な Unicode は、バッチを失敗させたり、その内容をエラーに反映したりすることなく無視されます。

各スパンでキャプチャされるヘッダーは最大 32 個、各ヘッダーの値は最大 16 個、各値は UTF-8 で 4096 バイト、キャプチャされたヘッダー名と値の合計は UTF-8 で 16384 バイトです。サイズ超過または無効なヘッダーは切り詰められず、全体が省略されます。選択はオペレーターによるプライバシー上の判断です。安全そうな名前でも個人データを含む可能性があり、これらの上限や検出器は汎用的な PII スクラバーではありません。

### 配信上の制限

リクエストは、エンベロープを含め、最大 500 スパンかつ UTF-8 JSON で 4 MiB に制限されます。許可された各スパンは、カーソルバッチの最初のリクエストの前にサイズチェックされます。個々のスパンが上限を超える場合、そのバッチの一部も送信されず、`maxBodyBytes` を下げるよう案内して失敗します。暗黙に破棄されることはありません。事前チェックではレコード参照とバイト数のみを保持し、一時的なスパン／JSON はそれぞれ破棄します。バッチのシリアライズ済みコピーをもう 1 つ保持するのではなく、上限内のチャンク用にスパンを再構築します。HTTP 408/429/5xx、ネットワーク障害、タイムアウトは、最大 3 回試行され、250/500 ms の指数バックオフが適用されます。`Retry-After` の秒数または HTTP 日付によって、遅延が最大 5 秒まで延長される場合があります。それ以外のステータスは直ちに失敗します。OTLP 2xx の部分拒否も、失われたスパンを了承するのではなく例外を発生させます。空の、または有効な JSON による了承は受け入れられ、レスポンス読み取りの上限は 64 KiB です。

エラーには、エクスポーターが所有する事実のみが含まれます。HTTP ステータス、再試行クラス、試行回数、送信されたスパン数、または固定の了承／ネットワーク失敗メッセージです。コレクターのレスポンス本文、部分成功数、レスポンスヘッダーがエラー、ログ、ダッシュボードにコピーされることはありません。失敗したバッチまたは部分的に受け入れられたバッチは了承されません。宛先はそのステータスとともに Failing を示し、カーソルは最後に了承されたバッチに留まり、次回の実行では同じ行が再送されます。恒久的なステータスでは、コレクターまたは設定が修正されるまで失敗し続けます。レスポンスの詳細については、コレクター独自のログを使用してください。呼び出しログのエラー概要では、別個のマスキングが維持されます。
`prepare()` は何もプロビジョニングしません。Test は `{"resourceSpans":[]}` を正確に POST し、呼び出しログのスパンを書き込まずに HTTP ステータスを報告します。

トレース ID とスパン ID は、`"omniroute.trace\\0" + callLogId` および
`"omniroute.span\\0" + callLogId` に対する SHA-256 の先頭 32／16 桁の 16 進数です。再送時も同じ ID が付与されます。これは重複排除を保証するものではありません。Langfuse v4 の取り込みを含む一部のバックエンドでは、同じ ID のスパンが重複排除されません。クラッシュまたはチャンクの部分的な失敗が発生した場合、再送される可能性があるのは、了承されていない 1 つのカーソルバッチまでです。そのバッチ全体が重複する可能性があり、最後の HTTP チャンクだけとは限りません。このトレードオフを考慮してカーソルバッチのサイズを選択してください。

### Langfuse の例

セルフホスト型 Langfuse インスタンスでは、次のフィールドを設定します。

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization の値は、リテラルな `public-key:secret-key`
文字列を Base64 としてローカルで生成します（たとえば、`Buffer.from(publicKey + ":" + secretKey).toString("base64")` を使用します）。
実際の認証情報をログ、スクリーンショット、Issue に貼り付けないでください。マッピングによって
`x-langfuse-ingestion-version: 4` が自動的に設定されます。Authorization は引き続き `headers` で指定します。
ヘッダーと生成された ID ソルトの両方で、既存の暗号化されたシークレットフィールド機構と API プレースホルダーが使用されます。`STORAGE_ENCRYPTION_KEY` が必要です。

マッピングに生成タイプ/モデル、JSON の使用状況の詳細（入力/出力/合計および利用可能な
キャッシュキー）、JSON の入力/出力スナップショット、ERROR/DEFAULT レベル、サニタイズ済み
ステータスメッセージ、トレース名、セッション ID、プロバイダー、要求されたモデル、パス、組み合わせ、キャッシュ
ソース、ステータス用のオプションの環境情報およびフィルタリング可能な
`langfuse.observation.metadata.<key>` を追加します。`langfuse.observation.completion_start_time` は ISO 8601 形式で、
開始時刻に TTFT を加えた値です。ただし、TTFT が判明しており、継続時間内に収まる場合に限ります。コスト属性は送信されません。

ID モードは `langfuse.user.id` に適用されます。

- `pseudonymous`（デフォルト）：API キーの内部 ID に、宛先ごとにランダムに生成された 32 バイトのソルトを使用して HMAC-SHA256 を適用します。ソルトは作成時に存在しない場合に生成され、`identitySalt` として暗号化され、返されることはなく、編集時にも保持されます。生のキー ID がスパン属性に入ることはありません。宛先のソルトを再作成/ローテーションすると、ID が変わります。
- `keyName`：設定された API キー名。オペレーターのラベルが意図的に公開されます。
- `none`：ユーザー ID はありません。存在する場合、セッションタグは引き続きエクスポートされます。これらのモードは、任意のプロンプト内容や、オペレーターが指定したセッション/相関ラベルを匿名化するものではありません。

### バックフィルなしで開始する

作成時のみ、**現在の位置から開始（既存のログをスキップ）**を有効にするか、作成 API ペイロードのトップレベルで
`startFromCurrentPosition: true` を渡します。既存のカーソルヘルパーを使用して、保持されているコールログの現在の最大 rowid に
`cursor_row_id` を初期化します。マイグレーションは行いません。デフォルトは false（カーソル 0 で、保持履歴をバックフィル）です。
これは更新時にカーソルをリセットする設定ではありません。

共有の `ttftMs` 追加により、BigQuery マッパーと新しいテーブルスキーマにも nullable な `ttft_ms` 列が追加されます。
そのスキーマテストでは、正規レコードのすべてのフィールドに列が存在することが必須です。既存のテーブルでは、エクスポート内容は変更されません。
`prepare()` はテーブルスキーマを読み取り、その列が存在しない場合に限って `ttft_ms` を省略します。次回の実行で TTFT を取得するには、
nullable な INT64 列を追加するか、新しいテーブルを使用してください。オプションの TTFT 列によってスキーマ更新がトリガーされることはありません。使用状況の証拠に関する列は、以下の条件付きオプトイン互換フローに従います。それ以外の行フィールドでは、厳密なスキーマチェックが維持されます。

---

## 6. 送信先の追加

1. `LogExportDestinationType` をエクスポートする `src/lib/logExport/destinations/<name>.ts` を作成します。
   Zod の `configSchema`、UI 用の `fields` 記述子配列、`secretFields`、および
   `test()` / `prepare()` / `send(records)` を返す `createClient(config)` を実装します。
2. `src/lib/logExport/registry.ts` の `DESTINATIONS` 配列に追加します。
3. `tests/unit/` にテストを作成します。

変更はこれだけです。永続化、cron ジョブ、REST レイヤー、シークレットの暗号化、
ダッシュボードのフォームは、すべてレジストリを参照します。

新しい送信先には、次の 2 つのルールがあります。

- 部分的な失敗が発生した場合、`send()` は**必ず例外をスローしなければなりません**。正常に完了することは「送信先がこれらの行を保持している」ことを意味し、
  カーソルはそれらの行を越えて進み、元には戻りません。
- ユーザー指定の URL を受け取る送信先は、取得処理を行う前に、Webhook と同様に
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) を使って URL を検証する必要があります。
  BigQuery ではホストが定数であるため、この検証は不要です。

---

## 7. 操作方法

- **ダッシュボード**: Integrations → Log export。宛先を追加し、資格情報を確認するために **テスト** を実行します。
  行を書き込まずに確認してから、有効にします。
- **バックログ**: 各宛先カードには保留中の行数とカーソルが表示されます。`GET
/api/log-export/status` は、同じ値に加えて直近 20 回分のジョブ実行結果を返します。
- **ある宛先で失敗しても、他の宛先は失敗しません** — 実行概要には、`last_status` / `last_error` に宛先ごとのステータスが記録され、ジョブ実行履歴には集計結果が保持されます。
- **宛先を削除すると、そのカーソルも削除されます。** 再追加すると、保持されている最も古いコールログから開始されるため、宛先がすでに保持している行が再送信される可能性があります。BigQuery では、行ごとの `insertId` によって重複が吸収されるのは BigQuery 自身の重複排除期間内に限られるため、宛先を削除するより無効化することを推奨します。

### 使用量エビデンスのスキーマ互換性

新しい BigQuery テーブルには、NULL を許容する `usage_evidence`（JSON を含む STRING）と
`usage_estimated`（BOOL）が含まれます。`autoCreate` を有効にすると、既存のテーブルには不足しているこれらの NULL 許容列のみを追加できます。エクスポーターは、フィールドメタデータを含む既存の完全なスキーマを保持し、返された etag を使用して条件付き PATCH を送信します。並行してスキーマが変更された場合、上書きする代わりにエクスポートが失敗し、次回の実行時にテーブルが再度読み取られます。

`autoCreate` を無効にしている場合は、使用量エビデンスを含むレコードをエクスポートする前に、これらの列を自分で追加してください。スキーマまたは etag のメタデータが不足している場合や更新に失敗した場合も、エビデンスを含む挿入は実行されません。その失敗時にはエクスポートカーソルは進まず、エビデンスが暗黙的に破棄されることもありません。エクスポートがブロックされている間もローカルログの保持期間は適用されるため、保持されているソース行の有効期限が切れる前に失敗を解決してください。
