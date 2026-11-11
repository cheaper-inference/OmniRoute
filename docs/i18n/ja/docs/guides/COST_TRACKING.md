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

### 価格設定のソース

コストは、 [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts)のマージされた価格表からこの優先順位で取得されます (**高い順**):

1. **ユーザーによるオーバーライド**—価格はダッシュボードまたは`PATCH /api/pricing` ( `pricing`名前空間) 経由で設定されます。
2. **models.dev の同期**—価格は`https://models.dev/api.json` ( `models_dev_pricing`名前空間) から取得されます。
3. **LiteLLM同期**—価格はLiteLLMのパブリック`model_prices_and_context_window.json` ( `pricing_synced`名前空間) から取得されます。
4. **ハードコードされたデフォルト**—レートは[`src/shared/constants/pricing/`](../../src/shared/constants/pricing/)で発送されます。

同じprovider/modelの場合、優先度の高いレイヤーの値が、下位レイヤーの一致するフィールドを上書きします。上位層に存在しないフィールドでも、下位層から取得することができます。両方の独立した同期ジョブが同時に実行される場合でも、順序は固定されます。 `GET /api/pricing?includeSources=1` `pricing`および`sourceMap`を返します。これらのモデルごとのラベル (`user`、 `modelsDev`、 `litellm`、 `default`) は、そのモデルを含む最も優先度の高い層を識別します。

**LiteLLM同期**はオプトインであり、デフォルトでは無効になっています。その環境変数 ( [`.env.example`](../../.env.example)参照) は次のとおりです。

| 環境変数                | デフォルト | 目的                                                                   |
| ----------------------- | ---------- | ---------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`    | LiteLLM価格設定のバックグラウンド同期を有効にします。                  |
| `PRICING_SYNC_INTERVAL` | `86400`    | 同期間隔 (秒単位) (毎日)。                                             |
| `PRICING_SYNC_SOURCES`  | `litellm`  | この同期のみのソース選択。現在、 `litellm`のみがサポートされています。 |

**models.dev の同期**はLiteLLM同期とは別のものであり、デフォルトでも無効になっています。設定 (models.dev 同期) で有効にするか、次の変数を使用します。

| 環境変数                   | デフォルト | 目的                                                                                                                                                   |
| -------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MODELS_DEV_SYNC_ENABLED`  | _(未設定)_ | 設定を解除すると、設定が切り替わります。 `1/true/on/yes`強制的にオンになり、 `0/false/off/no`強制的にオフになります (設定が有効になっている場合でも)。 |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`    | デフォルトの models.dev 同期間隔 (秒単位) (毎日)。                                                                                                     |

`PRICING_SYNC_SOURCES`行います**ない**models.dev を有効にする; LiteLLM同期のみを制御します。ユーザー オーバーライドを削除しても、同期された名前空間はクリアされません。次に利用可能な価格設定レイヤーが有効になります。価格のないモデルの場合は、手動オーバーライドを追加する前に、同期設定と`sourceMap`両方を確認してください。

### コストの計算式

コストは、 [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`) のトークン数と 100 万トークンあたりのレートからリクエストごとに計算されます。

- **入力トークン**(キャッシュ読み取りとキャッシュ作成トークンを除く) × `input`レート。
- **キャッシュ読み取りトークン**× `cached`レート (入力レートに戻ります)。
- **キャッシュ作成トークン**× `cache_creation`レート (入力レートに戻ります)。
- **出力トークン**× `output`レート。
- **推論トークン**× `reasoning`レート (出力レートに戻ります)。

すべてのレートは、1,000,000 トークンあたりのUSDとして解釈されます。 Codex 「高速」/「優先」または「フレックス」サービス層では、コスト乗数 (`getCodexFastCostMultiplier`) —適用されます。たとえば、フレックスは 50% のトークン割引で請求され、次のように表れます。**フレックス節約**ダッシュボード内。

モデル名は最初に正規化されるため ( `openai/`や`accounts/fireworks/models/`などのプロバイダー パスのプレフィックスは削除されます)、履歴行は引き続き価格と一致します。

### 支出の記録方法

- リクエストごとのコストはリクエストの完了時に計算されます。共有クォータの消費は、 [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts)を介して次のイベント ループ ティックでスケジュールされます。
- API キーの使用量は、 [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts)によってバッファリングされ、バッチでフラッシュされます (デフォルトのフラッシュ間隔は 60 秒、エントリ バッファーは 1,000 件)。以下を介して調整可能:

  | 環境変数                            | デフォルト | 目的                                                     |
  | ----------------------------------- | ---------- | -------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`    | フラッシュ間隔 (ミリ秒単位)。                            |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`     | フラッシュする前にバッファリングされるエントリの最大数。 |

コストでは、プロバイダーが報告した正確な料金 (`provider_cost_usd`)、次にカタログ価格のリクエスト スナップショット (`calculated_cost_usd`)、そして現在のカタログからのトークンの再価格が優先されます。保存されたコストは、トークン数によって再度請求されることはありません。従来のトークンのみの行は、カタログ価格が変更されると引き続き変更されます。

### OCRと埋め込み

- 成功した`/v1/ocr`リクエストでは、リクエストされたページ範囲や返されたページ オブジェクトの数ではなく、アップストリーム`usage_info.pages_processed`が使用されます。推定値はページ× `ocr_cost_per_page` (絶対USD/page、**ない**USD/million）。
- ドキュメントまたは境界ボックスの注釈を含むリクエストには、別の`ocr_cost_per_annotated_page`料金が必要です。それがなければコストは不明のままです。通常のOCR料金は黙って置き換えられるわけではありません。
- LiteLLM sync は、そのアップストリーム`annotation_cost_per_page`フィールドを`ocr_cost_per_annotated_page`にマップし、絶対USD/page値と注釈のみのエントリ (明示的なゼロを含む) を保持します。指定された正規フィールドが優先されます。無効なエイリアス値は無視されます。ユーザー価格の上書きは、通常の優先順位を維持します。 [LiteLLMのOCR価格設定キー](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking)を参照してください。
- OCR使用量には、ページ数、単価、計算されたUSDコスト、 APIキー、および選択された接続が保存されます。ページがトークンとして表現されることはありません。通話ログには、ドキュメントURLs、 PDFバイト、または抽出されたテキストではなく、請求メタデータが含まれます。
- 成功した`/v1/embeddings`リクエストは、同じミリ秒内に完了した個別のバッチを含む、物理バッチごとに 1 つの使用量行を記録します。プロバイダーが報告した料金は、トークンの見積もりよりも優先されます。コンボ ラッパーには料金はかかりません。
- 使用履歴、コスト分析、 provider/accountウィンドウ、API キーの使用制限、リクエストコスト台帳、日次使用量ロールアップには、これらの料金が含まれます。ログなしキーは、ソース テキストを保持せずに数値アカウンティングを保持します。
- 使用量や料金が不足している場合は、**未知**無料ではありません: 応答コスト ヘッダーが省略され、既存の価格設定されていない使用ポリシーが限定されたAPIキーに適用されます。明示的に設定されたゼロ レートは、有効なゼロコスト使用法のままです。

これはフォワードのみの会計です。使用履歴が書き込まれなかった古いOCR/embedding呼び出しは、この移行から再構築できません。カタログ見積もりはUSD見積もりであり、請求書ではなく、通貨換算、税金、割引は含まれません。

### スピーチと画像

- 成功した`/v1/audio/transcriptions`、 `/v1/audio/speech` 、およびイメージ生成の試みは数値計算を共有します。直接呼び出しとコンボ呼び出しでは、呼び出し元のAPIキーと選択された接続が伝えられます。コンボ ラッパーは 2 番目の借方を追加することはありません。
- プロバイダーが報告したUSD 、明示的なゼロ料金を含むカタログ見積もりを勝ち取ります。 OpenRouterのJSON `usage.cost`は`cost_usd`に正規化されます。それ以外の場合、測定されたトークンにはトークン価格が使用され、トランスクリプション秒数には 1 秒あたりの価格が使用され、音声入力には Unicode 文字数が使用され、定額イメージには要求された`n`ではなく実際に返された数値が使用されます。
- バイナリOpenRouter TTSはJSON使用本体がありません。音声が完了するか、発信者がキャンセルした後、 OmniRouteその生成IDを**同じ**設定されたOpenRouterオリジン。 EUリクエストがグローバル オリジンにフォールバックすることはありません。これは、制限された読み取り専用の検索です。アカウンティングのために合成は再試行されません。音声の終了後に請求レコードが表示される場合があります。検索の再試行は、ネットワークの期限を含めて最大約 52 秒間バックグラウンドで実行されます。
- その検索中、音声応答には`X-OmniRoute-Cost-Status: pending`が含まれますが、応答コスト ヘッダーはありません。最終的な料金は、調整後に使用履歴、分析、およびキー台帳に表示されます。メタデータが利用できない場合は、設定された料金表スナップショットが使用されます。それ以外の場合、コストは不明のままです。
- 秒数、文字数、画像数には個別の請求単位フィールドがあり、トークン数を偽ることはありません。アカウンティングには数値の使用のみが保持され、音声テキスト、トランスクリプト、または画像バイトは保持されません。既存の価格のないイメージの免除は変更されていません。本当に欠落しているイメージの料金表は、限定されたキーを新たにロックすることはなく、応答では通話が無料であると宣言するのではなく、コスト ヘッダーが省略されます。価格設定ストアの障害が発生した場合でも、フェールクローズ適用の使用状況の証拠が保持されます。

過去のspeech/image料金が新たに作成されたり、埋め戻されたりすることはありません。プロバイダーへの請求は、請求書および料金が報告されていない通話の参照として残ります。

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
