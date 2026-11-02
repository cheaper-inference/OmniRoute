# Cost & Spend Tracking (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

OmniRoute が各リクエストのコストをどのように見積もり、記録し、レポートするか — そして、なぜ
ダッシュボードの数値が請求額ではなく**節約額トラッカー**なのかを説明します。

関連項目: [ユーザーガイド](./USER_GUIDE.md) · [機能ギャラリー](./FEATURES.md)

---

## これは何か（そして何ではないか）

OmniRoute は、トークン数にモデルの料金レートを掛けることで、完了リクエストごとの USD コストを算出します。これらの数値は、**Costs** ダッシュボード、
`omniroute cost` / `omniroute usage` CLI、CSV/JSON エクスポート、API キーごとの予算に使用されます。

> **ダッシュボードの「コスト」は請求額ではなく、節約額トラッカーです。** OmniRoute が料金を請求することはありません
> — リクエストは、すでに接続済みのプロバイダー（ご自身の
> サブスクリプション、無料枠、API キー）へルーティングされます。すべて無料
> モデルの利用で累積した「合計コスト $290」は、有料 API に対しておよそ **$290 を支払わずに済んだ**ことを意味します。この数値は、同じトラフィックを
> 標準の定価で処理した場合にかかっていたコストの_見積もり_です。そのため、
> 利用がどこに集中しているか、より安価または無料のプロバイダーへのルーティングによって
> どれだけ節約できているかを確認できます。

この位置づけは、プロジェクトの [README](../../README.md) にも明記されています（「ダッシュボードの
『コスト』は請求額ではなく、節約額トラッカーです」）。

この数値は見積もりであるため、以下の点に注意してください。

- 各モデルについて OmniRoute が保持する料金表に依存します。料金
  エントリがないモデルのコストは `0` として計上されます（エクスプローラーでは「Legacy / Free」行として表示されます）。
- 無料枠やサブスクリプションのトラフィックにも_推定_コストが計上されます — これは
  支払うべき金額ではなく、節約できた金額です。

---

## コストの見積もり方法

### 料金の取得元

費用は [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts) の統合された料金表から計算され、優先順位は次のとおりです（**高いものが先**）。

1. **ユーザーによる上書き** — ダッシュボードまたは `PATCH /api/pricing` で設定した料金（`pricing` 名前空間）。
2. **models.dev 同期** — `https://models.dev/api.json` から取得した料金（`models_dev_pricing` 名前空間）。
3. **LiteLLM 同期** — LiteLLM の公開ファイル `model_prices_and_context_window.json` から取得した料金（`pricing_synced` 名前空間）。
4. **コード内の既定値** — [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/) に同梱されている単価。

同じプロバイダーとモデルでは、優先度の高い層の値が下位層の対応するフィールドを上書きします。上位層にないフィールドは、引き続き下位層から取得できます。独立した両方の同期ジョブが同時に動作しても、この順序は変わりません。`GET /api/pricing?includeSources=1` は `pricing` と `sourceMap` を返し、モデルごとのラベル（`user`、`modelsDev`、`litellm`、`default`）は、そのモデルを含む最も優先度の高い層を示します。

**LiteLLM 同期**は任意で有効にする機能で、既定では無効です。環境変数は次のとおりです（[`.env.example`](../../.env.example) を参照）。

| 環境変数                | デフォルト | 用途                                                                            |
| ----------------------- | ---------- | ------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`    | バックグラウンドでの LiteLLM 料金同期を有効にします。                           |
| `PRICING_SYNC_INTERVAL` | `86400`    | 同期間隔（**秒**単位、デフォルトは毎日）。                                      |
| `PRICING_SYNC_SOURCES`  | `litellm`  | この同期だけに適用する取得元の選択です。現在は `litellm` のみをサポートします。 |

**models.dev 同期**は LiteLLM 同期とは独立しており、こちらも既定では無効です。設定（models.dev 同期）で有効にするか、次の変数を使用してください。

| 環境変数                   | 既定値       | 用途                                                                                                                                    |
| -------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _（未設定）_ | 未設定なら設定画面のスイッチに従います。`1/true/on/yes` は強制的に有効にし、`0/false/off/no` は設定画面で有効でも強制的に無効にします。 |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`      | models.dev 同期の既定の間隔を秒で指定します。既定の頻度は毎日です。                                                                     |

`PRICING_SYNC_SOURCES` は models.dev を**有効にしません**。制御するのは LiteLLM 同期だけです。ユーザーの上書きを削除しても、同期されたどちらの名前空間も消去されません。次に利用可能な料金層が有効になります。料金がないモデルでは、手動の上書きを追加する前に、両方の同期設定と `sourceMap` を確認してください。

### コストの計算式

コストは、トークン数と 100 万トークンあたりの料金に基づき、リクエストごとに
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
（`computeCostFromPricing` / `calculateCost`）で計算されます。

- **入力トークン**（キャッシュ読み取りトークンとキャッシュ作成トークンを除く）× `input` 料金。
- **キャッシュ読み取りトークン** × `cached` 料金（未設定の場合は入力料金を使用）。
- **キャッシュ作成トークン** × `cache_creation` 料金（未設定の場合は入力料金を使用）。
- **出力トークン** × `output` 料金。
- **推論トークン** × `reasoning` 料金（未設定の場合は出力料金を使用）。

すべての料金は、1,000,000 トークンあたりの USD として解釈されます。Codex の「fast」/「priority」または
「flex」サービス階層にはコスト倍率（`getCodexFastCostMultiplier`）が適用されます。たとえば flex
ではトークン料金が 50% 割引され、ダッシュボードに **flex savings** として表示されます。

最初にモデル名が正規化され（`openai/` や
`accounts/fireworks/models/` などのプロバイダーパスのプレフィックスが削除されます）、過去の行も料金に一致するようにします。

### 支出の記録方法

- リクエストごとのコストはレスポンス後に計算され、クライアントへのレイテンシーを一切増やさないよう、完了を待たずに記録されます。共有クォータの消費は、
  [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts) を介して次の
  イベントループのティックにスケジュールされます。
- API キーの支出はバッファリングされ、
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) によりバッチ単位でフラッシュされます（デフォルトのフラッシュ間隔は 60 秒、
  バッファは 1,000 エントリ）。以下で調整できます。

  | 環境変数                            | デフォルト | 用途                                             |
  | ----------------------------------- | ---------- | ------------------------------------------------ |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`    | フラッシュ間隔（ミリ秒単位）。                   |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`     | フラッシュ前にバッファリングする最大エントリ数。 |

ダッシュボードのコスト数値は、保存された行ごとの金額から読み取られるものでは**ありません**。分析エンドポイントが実行されるたびに、トークン数と現在の料金表から
動的に再計算されます。つまり、誤った料金を修正して再同期すると、
過去のコスト見積もりにも遡及的に反映されます。

---

## ダッシュボード：コストページ

**Costs** ページは `/dashboard/costs`
（`src/app/(dashboard)/dashboard/costs/`）にあります。
メインビューは **Cost Overview** タブ
（`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`）で、
すべてのデータを `GET /api/usage/analytics` から読み込みます。

表示内容：

- **支出タイル** — _今日（1d）_、_7d_、_30d_、および選択した期間の推定支出。期間セレクター：`7d`、`30d`、`90d`、`all`。
- **主要指標** — 期間内のリクエスト数、アクティブなプロバイダー数、アクティブなモデル数、リクエストあたりの平均コスト。
- **コストエクスプローラー** — **プロバイダー**、**モデル**、**API キー**、**アカウント**、または**サービスティア**別にグループ化できる、並べ替え／フィルタリング対応のテーブル。コスト、リクエスト数、トークン数、リクエストあたりの平均コスト、合計に占める割合（%）を表示します。
- **トークン使用量** — 合計／入力／出力トークン数と、入力：出力比率。
- **ルーティング効率** — フォールバック数、フォールバック率、およびリクエストされたモデルのカバレッジ。
- **月次予測** — 直近の日次平均から月末時点の支出を予測します。
- **期間比較** — 期間の前半と後半の変化率（%）。
- **チャート** — 日次コスト推移、プロバイダー構成比（円グラフ）、上位プロバイダー、上位モデル、API キー別コスト、アカウント別コスト、週次利用パターン、アクティビティヒートマップ。
- **エクスポート** — 現在の期間を **CSV** または **JSON** としてダウンロードします（コストデータが 0 でない場合にボタンが表示されます）。

価格設定済みのトラフィックがない場合、行には `$0` の代わりに「Legacy / Free」ラベルが表示され、節約トラッカーモデルを反映します。

### 関連する Costs サブページ

Costs エリアには、以下のページもあります（すべて `/dashboard/costs/` 配下）：

- **Pricing**（`/dashboard/costs/pricing`）— モデルごとの価格を表示および上書きします（共有 Pricing タブをレンダリングします）。
- **Budget**（`/dashboard/costs/budget`）— スコープごとの支出上限を設定します（共有 Budget タブをレンダリングします）。
- **Quota Share**（`/dashboard/costs/quota-share`）— 共有クォータプールと消費率のビュー。

---

## API エンドポイント

特記がない限り、これらすべてで管理認証（`requireManagementAuth` を介したループバック／JWT）が必要です。

### 使用量とコストの分析

| メソッド | エンドポイント           | 目的                                                                                                                                                                |
| -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/usage/analytics`   | コスト／使用量の完全な分析：概要、日次推移、プロバイダー／モデル／API キー／アカウント／ティア別。クエリ：`range`、`startDate`、`endDate`、`apiKeyIds`、`presets`。 |
| `GET`    | `/api/usage/utilization` | プロバイダーごとのクォータ使用率の推移。クエリ：`range`（`1h`/`24h`/`7d`/`30d`）、`provider`。                                                                      |
| `GET`    | `/api/usage/history`     | 生の使用履歴行。                                                                                                                                                    |
| `GET`    | `/api/usage/call-logs`   | リクエストごとの呼び出しログ（モデル、トークン、コスト、レイテンシー、ステータス）。                                                                                |
| `GET`    | `/api/usage/quota`       | プロバイダーのクォータステータス。                                                                                                                                  |
| `GET`    | `/api/usage/proxy-logs`  | プロキシリクエストログ。                                                                                                                                            |

### 予算

| メソッド | エンドポイント           | 目的                                                                                     |
| -------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `GET`    | `/api/usage/budget`      | 1 つの API キーに対するコスト概要と予算チェック（`apiKeyId` クエリパラメーターが必須）。 |
| `POST`   | `/api/usage/budget`      | API キーの日次／週次／月次 USD 上限と警告しきい値を設定します。                          |
| `GET`    | `/api/usage/budget/bulk` | API キー全体の予算概要を一括取得します。                                                 |

> Budget API のスコープは **API キー**（`apiKeyId`）単位です。
> `GET /api/usage/budget` が返す上限には、`dailyLimitUsd`、`weeklyLimitUsd`、`monthlyLimitUsd`、
> `warningThreshold`、および累計値（`totalCostToday`、`totalCostMonth`、…）が含まれます。

### 価格設定

| メソッド | エンドポイント          | 目的                                                                                                                                                 |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | 四層を統合した料金（ユーザー、models.dev、LiteLLM、既定値）。`?includeSources=1` は `pricing` + `sourceMap` を返します。                             |
| `PATCH`  | `/api/pricing`          | `{ provider: { model: { input, output, cached, … } } }` の価格設定を上書きします。                                                                   |
| `DELETE` | `/api/pricing`          | ユーザーの料金上書きを削除します。`?provider=&model=` で対象を絞ることもできます。同期済みの単価や組み込みの既定値は、代わりに使う層として残ります。 |
| `GET`    | `/api/pricing/defaults` | 100 万単位あたりのデフォルトのフォールバック料金を表示します。                                                                                       |
| `GET`    | `/api/pricing/models`   | モデルをキーとした価格設定。                                                                                                                         |
| `POST`   | `/api/pricing/sync`     | 外部ソース（LiteLLM）からの手動同期を開始します。                                                                                                    |
| `GET`    | `/api/pricing/sync`     | 現在の同期ステータス。                                                                                                                               |
| `DELETE` | `/api/pricing/sync`     | LiteLLM から同期した料金（`pricing_synced`）だけを消去します。models.dev のデータは別に管理されます。                                                |

### その他のコスト関連エンドポイント

| メソッド | エンドポイント                | 目的                                                   |
| -------- | ----------------------------- | ------------------------------------------------------ |
| `GET`    | `/api/free-tier/summary`      | 無料モデルのトークン合計、今月の使用量、残りの無料枠。 |
| `GET`    | `/api/quota/pools/[id]/usage` | 共有クォータプールの使用量。                           |

---

## CLI

OmniRoute の CLI は、コスト、使用状況、料金に関するコマンドを提供します（[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs) で登録されています）。

### `omniroute cost`

`/api/usage/analytics` から集計されたコストレポートです。

```bash
omniroute cost                          # 過去 30 日間、プロバイダー別にグループ化
omniroute cost --period 7d              # 過去 7 日間
omniroute cost --group-by model         # provider | model | combo | api-key | day でグループ化
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

列：グループ、リクエスト数、入出力トークン数、コスト（USD）、合計に占める割合（%）。末尾には総合計行が出力されます（`--quiet` または `--output json` を指定すると省略されます）。

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # プロバイダー別のコスト概要
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# 予算
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` は `GET /api/pricing/defaults` を読み取ります。代わりに個々のモデルの料金を編集するには、ダッシュボードの **Pricing** ページまたは `PATCH /api/pricing` を使用してください。

---

## トラブルシューティング

- **すべてのコストが $0 / 「Legacy / Free」と表示される。** 使用中のモデルに料金情報がありません。外部同期を有効化（`PRICING_SYNC_ENABLED=true`）して `omniroute pricing sync` を実行するか、Pricing ページまたは `PATCH /api/pricing` から料金を手動で設定してください。
- **過去に使用したモデルの料金が正しくない。** 料金を修正してください（上書きまたは再同期）。分析データを読み取るたびにトークン数からコストが再計算されるため、見積額は過去分にも遡って更新されます。
- **支出額の反映がリアルタイムより遅れる。** キーごとの支出額はバッチ処理されます。より新しい数値が必要な場合は、`OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` を小さくしてください。

---

ダッシュボード全体における位置づけについては、[ユーザーガイド](./USER_GUIDE.md)および[機能ギャラリー](./FEATURES.md)を参照してください。
