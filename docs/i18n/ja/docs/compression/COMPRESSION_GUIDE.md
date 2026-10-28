# 🗜️ Prompt Compression Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 対象となるコンテキストを自動的に圧縮し、15～95%削減します。概要については、[README の「Compression」セクション](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)を参照してください。

## 概要

OmniRoute は、リクエストが上流プロバイダーに到達する**前に**プロアクティブに実行される、モジュール式のプロンプト圧縮パイプラインを実装しています。つまり、ワークフローを変更することなく、透過的にトークンを節約できます。

```
クライアントリクエスト
  → 圧縮戦略セレクター
    → コンボによるオーバーライド？ → コンボ設定を使用
    → 自動トリガーのしきい値？ → 自動モードを使用
    → デフォルトモード？ → グローバル設定を使用
    → オフ？ → 圧縮をスキップ
  → 選択された圧縮モード
    → オフ：圧縮なし
    → Lite：安全な空白・書式のクリーンアップ（約15%）
    → Standard：片言化による冗長表現の削除（約30%）
    → Aggressive：履歴の経過時間に応じた処理＋要約（約50%）
    → Ultra：ヒューリスティックな枝刈り＋コードブロックの間引き（約75%）
    → RTK：コマンドを認識したターミナル／ツール出力のフィルタリング（上流で60～90%の範囲）
    → Stacked：順序付けされたマルチエンジンパイプライン。通常は RTK の後に Caveman（対象範囲で78～95%）
  → 圧縮済みリクエスト → プロバイダー
```

---

## 圧縮モード

### オフ

圧縮は適用されません。すべてのメッセージは変更されずそのまま通過します。

### ライトモード(約15%削減、レイテンシ1ms未満)

最も安全なモード — 意味的な変更はゼロで、書式のクリーンアップのみを行います:

| 手法                     | 説明                               |
| ------------------------ | ---------------------------------- |
| `collapseWhitespace`     | 連続する空行と行末のスペースを結合 |
| `dedupSystemPrompt`      | 重複するシステムメッセージを削除   |
| `compressToolResults`    | 冗長なツール/関数の出力を圧縮      |
| `removeRedundantContent` | 繰り返される指示を除去             |
| `replaceImageUrls`       | base64画像データURIを短縮          |

**最適な用途:** 常時有効化する用途、安全性が重要なワークフロー。

### スタンダードモード(約30%削減)

[Caveman](https://github.com/JuliusBrussee/caveman) に着想を得たモード — 意味を保持しながら、フィラー語や冗長な表現を削除します:

- フィラー語を削除("please"、"I think"、"basically"、"actually")
- 冗長なフレーズを短縮("in order to" → "to"、"as a result of" → "because")
- 丁寧な遠回し表現を除去("Would you mind..."、"If you could possibly...")
- コーディングプロンプト向けに調整された30以上の正規表現ルール

**最適な用途:** 日常的なコーディングワークフロー、コストを重視するチーム。

### アグレッシブモード(約50%削減)

長時間セッション向けのスマートな履歴管理:

- **メッセージエージング** — 古いメッセージが段階的に圧縮されます
- **ツール結果の圧縮** — 長いツール出力を切り詰めまたは省略(先頭/末尾行の保持、
  マッチ行フィルタリング、JSONキーの圧縮)
- **構造整合性ガード** — `tool_use` + `tool_result` ペアの一貫性を確保
- **コンテキストウィンドウ認識** — モデルごとのトークン制限を尊重

**最適な用途:** 長時間のデバッグセッション、大規模なコードベース。

### ウルトラモード(約75%削減)

トークンが切迫したシナリオ向けの最大圧縮:

- **ヒューリスティック枝刈り** — スコアベースで散文のトークンを枝刈り
- **構造保持** — フェンス付きコードブロック、インラインコード、URL、識別子は
  トゥームストーン化されて逐語的に再結合され、枝刈りされることはありません
- **オプションのSLMティア** — 設定されている場合、小型ローカルモデルが枝刈りを精緻化できます
- アグレッシブモードから独立: メッセージエージング、ツール結果圧縮、
  フォールバック要約機能は実行しません(SLMティアの失敗時のみ、フォールバックパスが
  アグレッシブを経由します)

**最適な用途:** コンテキスト制限に繰り返し達している場合。

### RTKモード(上流側で60-90%の範囲)

RTKモードは、コーディングエージェントセッションに現れる冗長なツール出力向けに最適化されています:

- `git status`、`git diff`、`git log`、テストランナー、TypeScript/Vite/Webpackビルド、
  ESLint/Biome/Prettier、npm audit/install、Dockerログ、インフラ出力、一般的なシェル出力などの
  コマンド/出力クラスを検出
- `open-sse/services/compression/engines/rtk/filters/` のJSONフィルターパックを適用
- プロジェクトまたはグローバルの `filters.toml` ファイルからRTK TOMLスキーマv1フィルターを
  インポート(インラインテスト検証とプロジェクトファイルのトラストゲーティング付き)
- インライン検証サンプル付きの56個の組み込みフィルターを同梱
- ANSI制御シーケンス、プログレスバー、重複行、アクションにつながらないノイズを除去
- 失敗、エラー、警告、変更ファイル、要約、長い出力の末尾を保持
- トラストゲート付きプロジェクトフィルター、グローバルフィルター、オプションの
  マスク済み生出力リカバリをサポート

**最適な用途:** シェル、ビルド、テスト、git、grep、ファイル出力のトランスクリプトを含むエージェントセッション。

### スタックモード(対象範囲で78-95%)

スタックモードは、複数の圧縮エンジンを決定論的な順序で実行します。デフォルトのパイプラインは次のとおりです:

```txt
RTK -> Caveman
```

この順序により、まずターミナル/ツール出力をコンパクトにし、その後残りの自然言語プロンプトに
Cavemanの意味的凝縮を適用します。スタックパイプラインは、グローバルに、または
ルーティングコンボに割り当てられた圧縮コンボを通じて設定できます。

**最適な用途:** 大規模なツールログと人間の指示やアシスタントの要約が混在するコンテキスト。

---

## アップストリームの削減率計算

OmniRoute は、圧縮による削減効果を、アップストリームプロジェクトのベンチマークと
OmniRoute 独自のエンジン構成という2つの情報源に基づいて文書化しています。

| 情報源  | ここで使用するアップストリーム README の数値                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| Caveman | 出力トークンを `~75%` 削減、ベンチマークでの平均出力削減率 `65%`、範囲 `22-87%`、入力圧縮ツールでは `~46%`         |
| RTK     | コマンド出力を `60-90%` 削減。サンプルセッションでは `~118,000 -> ~23,900` トークン、つまり `79.7%` 削減（`~80%`） |

ツール／コンテキストのペイロードが重複する場合、デフォルトの OmniRoute コンボではエンジンを次の順序で重ねます。

```txt
RTK -> Caveman
```

合計削減率は加算ではなく、乗算で求めます。

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

この `78-95%` という数値は、RTK と Caveman の両方が同じ入力／コンテキストのペイロードを削減できる場合に適用されます。
Caveman のレスポンス出力モードは別機能です。有効にした場合は、Caveman 独自の出力削減率（平均 `65%`、
代表値 `~75%`、範囲 `22-87%`）を使用してください。請求額全体の削減率は、プロンプトと出力の構成比によって異なります。

### 「対象になる」の実際の意味

15-95% という代表的な範囲は実際のものですが、適用されるのは、繰り返される
エラー行、同じ警告を大量に出力するビルドログ、過大な `grep`／ファイル読み取りダンプなど、**冗長または過度に詳細な**
コンテンツだけです。すべてのリクエストでこれほど削減されるという意味では
**ありません**。

実測で検証済みです（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）。同一の
エラー行を300行含む Anthropic 形式の `tool_result` ブロックに対して `stacked`（RTK + Caveman）を
実行したところ、**トークンを 95.93% 削減／文字数を 96.26% 削減**でき、提示された範囲内に
十分収まりました。しかし、通常の非冗長なツール出力（整理された `grep` の一致結果一覧、
短いファイル読み取り、通常の会話テキスト）に対して同じパイプラインを実行すると、正しく
**ほぼゼロの削減率**になります。これは、除去できる反復がなく、`validateCompression()`（`validation.ts`）が、
コードブロック、URL、見出し、バージョン、または ALL-CAPS の定数識別子を削除または変更する
書き換えを許可しないためです。

これはバグではなく、想定された安全な動作です。主に整理されたファイルを読み取ったり grep したりするコーディングセッションでは、
圧縮を完全に有効にしていても全体の削減率は控えめになります。一方、失敗を繰り返す
ループや冗長な出力を行うリンターに遭遇するセッションでは、そのトラフィックに対して 78-95% の範囲全体の
削減効果が得られます。単一セッションの総削減率が低いことだけを根拠に、圧縮の設定ミスだと判断しないでください。
まず、元のツール出力が実際に冗長だったかどうかを確認してください。

---

## トークン削減の可視化

```
圧縮なし:               LLM に送信されるトークンは 47K
Lite:                    送信されるトークンは 40K          （15% 削減 — 安全、常時有効）
Standard:                送信されるトークンは 33K          （30% 削減 — caveman-speak ルール）
Aggressive:              送信されるトークンは 24K          （50% 削減 — エージング + 要約）
Ultra:                   送信されるトークンは 12K          （75% 削減 — ヒューリスティックな枝刈り）
RTK:                     送信されるトークンは 19K-5K       （コマンド／ツール出力を 60-90% 削減）
Stacked:                 送信されるトークンは 10K-2.5K     （対象となる RTK+Caveman の範囲で 78-95% 削減）
```

---

## 設定

### ダッシュボード

`ダッシュボード → コンテキストとキャッシュ` に移動します。

- **Caveman** — モード選択、言語パック、プレビュー、グローバルデフォルト
- **RTK** — コマンドフィルターのプレビュー、RTK の安全設定、フィルターカタログ
- **圧縮コンボ** — ルーティングコンボに割り当てる名前付きエンジンパイプライン
- **自動トリガーしきい値** — トークン数がしきい値を超えた場合に圧縮を自動的に有効化

### コンボ単位のオーバーライド

`ダッシュボード → コンテキストとキャッシュ → 圧縮コンボ` で、圧縮コンボをルーティング
コンボに割り当てます。

```txt
コンボ: "free-tier-fallback"
  圧縮コンボ: "coding-agent-stack"
  パイプライン: RTK -> Caveman
  ターゲット:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

これにより、有料サブスクリプションではライトモードを維持しながら、無料／コーディングプロバイダーで
積み重ねた圧縮を使用できます。

この「コンボ単位のオーバーライド」割り当ては、**ルーティングコンボの圧縮
モード**オーバーライド（デフォルト／オフ／ライト／標準／アグレッシブ／ウルトラ／Codex Responses — このフィールドの
スキーマは `rtk`、`stacked`、`omniglyph` も受け付けます）とは異なる制御です。このオーバーライドでは、名前付きの
圧縮コンボパイプラインは選択されません。単に `resolveCompressionPlan` が参照する
`compressionMode` フィールドを設定するだけです。コンボカード（`ダッシュボード → コンボ`）で設定できるほか、
#6760 以降では、`ダッシュボード → コンテキストとキャッシュ → 圧縮コンボ` の
「ルーティングに割り当て」リストで、上記のパイプライン割り当てチェックボックスのすぐ横から、ルーティングコンボごとに
設定することもできます。どちらの画面でも、同じ `PUT /api/combos/{id}` エンドポイントを通じて保存されます。

### リクエスト単位のオーバーライド

単一のリクエストについて圧縮プランをオーバーライドするには、`x-omniroute-compression` リクエストヘッダーを
送信します。このヘッダーの優先順位が最も高く、ルーティングコンボのオーバーライド、アクティブなプロファイル、
自動トリガー、パネルのデフォルトよりも優先されます。不明な値は無視され（リクエストが拒否されることはありません）、
グローバルマスタースイッチによる制御は引き続き適用されます。圧縮がグローバルにオフの場合、このヘッダーで
オンにすることはできません。値は次のとおりです。

| 値            | 効果                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | このリクエストでは圧縮しません。                                                                                         |
| `default`     | パネルから導出されたデフォルトプロファイル（アクティブなプロファイルは無視）。非可逆エンジンはオフのままです。           |
| `safe`        | ヘッダーを省略した場合と同じです。重複排除と空白の折りたたみのみを行います。                                             |
| `allow-lossy` | 要約、関連性フィルター、スタイル書き換えを含む、このリクエストのオペレータープランを維持します。                         |
| `engine:<id>` | 有効な場合に単一のエンジンを使用します（例: `engine:rtk`）。これは、そのエンジンに対するリクエスト単位のオプトインです。 |
| `<combo>`     | 名前付きコンボ。最初に名前（大文字と小文字を区別しない）、次に ID で照合されます。                                       |

`allow-lossy`、`engine:<id>`、または名前付きコンボが指定されていない場合、非可逆エンジンは
適用されません。圧縮がオンの場合、リクエストには引き続きセッションの重複排除と空白の折りたたみが
適用されます。

適用されたプランは、`X-OmniRoute-Compression: <mode>; source=<source>` レスポンス
ヘッダーで返されます。`<source>` は `request-header`、`routing-override`、`active-profile`、
`auto-trigger`、`default`、`off` のいずれかです。

### API

```bash
# 圧縮設定を取得
curl http://localhost:20128/api/settings/compression

# 圧縮設定を更新
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 特定の RTK/stacked ペイロードをプレビュー
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK フィルターパックを一覧表示
curl http://localhost:20128/api/context/rtk/filters

# オプションのコマンドメタデータを使用して RTK を直接テスト
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 保護されるもの

圧縮エンジンは、以下を**常に保持します：**

- ✅ コードブロック（フェンス形式およびインライン）
- ✅ URLおよびファイルパス
- ✅ JSON構造および構造化データ
- ✅ 識別子および保護対象の技術トークン
- ✅ 数式
- ✅ ツール／関数呼び出しの定義
- ✅ システムプロンプト（liteモード）

RTKのraw-outputリカバリーは、何らかのデータが永続化される前に、一般的なAPIキー、bearerトークン、Slackトークン、AWSアクセスキー、パスワード、トークン、およびシークレットを編集して隠します。

---

## 圧縮統計

圧縮されたすべてのリクエストには、サーバーログに統計情報が含まれます：

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## フェーズ別ロードマップ

| フェーズ   | モード                                                                                                                                               | ステータス      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| フェーズ1  | Off、Lite                                                                                                                                            | ✅ リリース済み |
| フェーズ2  | Standard、Aggressive、Ultra                                                                                                                          | ✅ リリース済み |
| フェーズ3  | RTK、Stacked、Compression Combos                                                                                                                     | ✅ リリース済み |
| フェーズ4  | Output Styles、SLM-tier Ultra、evalハーネス                                                                                                          | ✅ リリース済み |
| フェーズ4C | 適応型コンテキスト予算（「ダイヤル」）— 計算エンジン + API（`PUT /api/settings/compression`の`contextBudget`）+ ダッシュボードのモード／ポリシー制御 | ✅ リリース済み |

---

## 謝辞

Standardモードの圧縮ルールは、**[JuliusBrussee](https://github.com/JuliusBrussee)**による**[Caveman](https://github.com/JuliusBrussee/caveman)**（⭐ 51K+）— 話題となった「少ないトークンで用が足りるのに、なぜ多くのトークンを使うのか」というプロジェクト — に着想を得ています。Cavemanは、出力トークンを`~75%`削減、ベンチマーク平均で出力を`65%`削減、出力の削減幅は`22-87%`、入力圧縮ツールでは`~46%`削減と報告しています。

RTKモードは、**[RTK AI](https://github.com/rtk-ai)**による**[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — ターミナル、ビルド、テスト、git、およびツール出力のフィルタリングに対応する高性能なコマンド出力圧縮プロジェクト — に着想を得ています。RTKは`60-90%`の削減を報告しており、READMEのサンプルセッションでは`~80%`の削減が示されています。

---

## 高度な圧縮システム

上記で説明した7つのモード以外にも（ソースは `codex-responses` および
`omniglyph` モードも受け付けますが、このガイドでは扱いません）、以下のセクションでは、
これらのモード内またはモードと併用して機能する各種機能について説明します。Tool Result Compression と Progressive Aging は、
aggressive エンジン（Aggressive モード、およびスタック型パイプラインの `aggressive` ステップ）のステップ1と2です。
Stacked Pipeline は Stacked モードの実行方式です。Cache-Aware Compression は、
圧縮が有効な場合、キャッシュ対応プロバイダーに対して `aggressive` と `ultra` を
`standard` にダウングレードします。また、Caveman Output Mode と Output Styles は、
デフォルトでは無効になっているオプトインのシステムプロンプト命令であり、リクエストを圧縮する代わりに
モデルの出力形式を調整します。

### キャッシュ対応圧縮

一部のプロバイダー（プロンプトキャッシュを使用する Anthropic など）は、
プロンプトの一部をキャッシュしてコストとレイテンシーを削減できる
**プロンプトキャッシュ**をサポートしています。キャッシュが有効な場合、
aggressive 圧縮はキャッシュされたトークンを変更してキャッシュを無効化するため、
実際にはパフォーマンスを**低下**させる可能性があります。

`cachingAware.ts` モジュールは、**キャッシュコンテキストを検出**し、
それに応じて**圧縮戦略を調整**することで、この問題を解決します。

#### 仕組み

1. **キャッシュコンテキストを検出** — リクエスト本文をスキャンして `cache_control` マーカーを探します
2. **キャッシュ対応プロバイダーを特定** — 対象プロバイダーがキャッシュをサポートしているか確認します
3. **戦略を調整** — キャッシュ対応プロバイダーでは `aggressive`/`ultra` を `standard` にダウングレードします
4. **システムプロンプトをスキップ** — 通常、システムプロンプトはキャッシュされるため、圧縮しません

戦略ヘルパーは `deterministicOnly` フラグも返しますが、プランビルダーが利用するのは
戦略のみです。現時点では、後続処理でこのフラグを読み取るものはありません。

#### コード例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← キャッシュマーカー
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用する場面

キャッシュ対応圧縮は**常に有効**であり、設定は不要です。
圧縮が有効で、対象プロバイダーがプロンプトキャッシュをサポートしている場合（Anthropic、OpenAI など）に作動します。
明示的な `cache_control` マーカーは必要ありません。キャッシュ対応プロバイダーであるだけで
ダウングレードが行われますが、マーカーだけでは実行されません（マーカー検出はキャッシュの
テレメトリーに使用されるもので、戦略の決定には使用されません）。

### 段階的エージング

長い会話では多数のメッセージターンが蓄積されますが、古いターンほど
関連性が低くなります。`progressiveAging.ts` モジュールは、**ターン距離に応じてメッセージを簡略化**します
（距離は会話の末尾から測定されます）。提供時のデフォルト設定
（`verbatim: 2, light: 2, moderate: 3`）では、次のように処理されます。

- **直近2ターン（距離 ≤ 2）**：原文のまま保持
- **距離3**：Caveman 圧縮（不要語の除去）
- **距離4以上**：アシスタントメッセージは要約され、ユーザーメッセージは先頭行のみに縮約されて
  120文字を上限とします。それ以外のロールは変更されません。システムプロンプト、すでにエージング済みの
  メッセージ、および最新のユーザーメッセージは、距離にかかわらず常に原文のまま保持されます。
  完全に削除されるものはなく、提供時のデフォルト設定では `light`
  が `verbatim` と等しいため、`light` バンドには到達しません。

#### コード例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... さらに50ターン ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 直近3ターン：原文のまま
  light: 8, // 距離 <= 8：軽量圧縮
  moderate: 20, // 距離 <= 20：Caveman 圧縮
  fullSummary: 5, // 型では必須だが、バンド分けのコードでは読み取られない
  // 距離 > 20：要約（assistant）／先頭行を保持（user）
});

// saved = 節約されたトークン数
```

#### 使用する場面

段階的エージングは `aggressive` モードで**常に有効**です。これは
`compressAggressive()` のステップ2です。Ultra モードでは実行されません。
特に次の用途で効果的です。

- 長時間継続するコーディングセッション
- 複数日にわたる会話
- 多数のツール呼び出しを伴うエージェント型ワークフロー

### Caveman 出力モード

Caveman 出力モードでは、簡潔な出力を生成するようモデル自体に求める
**システムプロンプト命令**を追加します。`lite` レベルでは完全な文を維持しつつ簡潔に回答するよう求め、
`full` では「賢い原始人のように簡潔に応答する」よう求め、`ultra` では電文調の出力を求めます。
これらはあくまで命令であり、必ず従われることを保証するものではありません。リクエストは
`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）を通じてこれらを受け取ります。
`open-sse/handlers/chatCore.ts` はまず、後方互換シム
（`open-sse/services/compression/outputStyles/backCompat.ts` の
`resolveOutputStyleSelection()`）を使用して選択内容を解決します。このシムは、`outputStyles`
が空の場合、有効な `cavemanOutputMode` を `cavemanOutputMode.intensity` の強度で
`terse-prose` 出力スタイルにマッピングします（下記の「後方互換性」を参照）。空ではない `outputStyles`
選択はそのまま使用され、その場合、`cavemanOutputMode.enabled` と `intensity` は
効果を持ちませんが、`autoClarity` トグルは引き続き適用されます。`outputMode.ts` には、
命令テキスト（`CAVEMAN_INSTRUCTION_BY_LANGUAGE`）、コンテンツのバイパス処理、および
注入で使用される配置ヘルパーが含まれます。一方、同ファイル独自の
`applyCavemanOutputMode()` インジェクターには、本番環境での呼び出し元がありません。

#### 仕組み

このモードは入力を圧縮しません。システムプロンプトに命令ブロックを追加し
（以下の「注入の仕組み」を参照）、リクエストに対して選択された入力圧縮モードは、
そのブロックを含むようになった本文に対して、その後も実行されます。すべてのレベルの末尾に付く
共通境界条項の前に、英語の `full` レベルでは次のように記述されています。

> 「賢い原始人のように簡潔に応答せよ。冠詞（a/an/the）、つなぎ語（just/really/basically/actually/simply）、社交辞令、曖昧表現を省け。断片文でもよい。短い同義語を使え（extensive ではなく big、implement ではなく fix）。技術的内容、コード、エラー、URL、識別子はすべて正確に維持せよ。」

これは特に次の場合に効果的です。

- コード生成（簡潔な出力 = トークン数の削減）
- 簡単なQ&A（詳細な説明は不要）
- バッチ処理（スループットを最大化）

#### 使用するタイミング

Caveman出力モードは**オプトイン**です。圧縮をオン（`enabled: true`、Compression Settingsページのマスタートグルを
オン）にした状態で、`cavemanOutputMode.enabled` を使って有効にします。`intensity`
では `lite`、`full`、`ultra` のいずれかを選択します。

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

圧縮コンボの **Output Mode** トグル（`outputMode`、レベルは `outputModeIntensity`）
は、そのコンボが適用されるリクエストに対して同じスイッチを設定します。また、
`omniroute_set_compression_engine` MCPツールは、ブール値の `outputMode`
引数を通じてこの設定を書き込みます。空でない `outputStyles` の選択は、このスイッチより優先されます。
ダッシュボードで **Terse prose** 出力スタイルを有効にすると、同じブロックが注入されます（以下のOutput
Stylesを参照）。

### Output Styles（カタログ）

上記のCaveman出力モードは、**従来の単一スタイル経路**です。Phase 4では、これを
組み合わせ可能な出力スタイルのカタログへと一般化しました。これは
`open-sse/services/compression/outputStyles/catalog.ts` の `OUTPUT_STYLE_CATALOG` です。各スタイルは、
モデル自体に低コストな出力を要求するシステムプロンプト命令です。複数のスタイルを同時に有効化でき、
カタログ順に注入されます。

| スタイル                               | `id`            | 動作                                                                                                                                                                                                                                                                                         | 命令の言語                                    |
| -------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 簡潔な文章                             | `terse-prose`   | つなぎ語、冠詞、曖昧表現を省き、技術的内容を正確に維持します。従来のCaveman出力モードと同じテキストです（再記載せず参照します）。                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| コードを減らす                         | `less-code`     | YAGNIラダー：動作する最小限の変更にとどめ、要求されていない抽象化を行いません。                                                                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ポニーテール（怠惰なシニア開発者）     | `ponytail`      | 「最良のコードは、決して書かれなかったコード」：書き直しより再利用、症状より根本原因、動作する最短の差分を優先します。                                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 私はADHD（行動優先）                   | `i-have-adhd`   | 行動を先に提示（文章より先にコマンド、パス、スニペット）、上限のある番号付き手順、具体的な次のステップは1つだけ、前置き、要約、締めの言葉はなし。[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）を基にしています。                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UIフィルター                  | `antislop-ui`   | すべての視覚的手法は目的テスト（階層、独自性、可読性）を通過する必要があります。既定のグラデーション、ガラス効果、発光効果を使わず、パレットを制限し、テンプレート的なレイアウトを避けます。両方のantislopスタイルには、機能しないコントロールや捏造された主張を禁止する境界も追加されます。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislopコピーおよび人間向けフィルター | `antislop-copy` | 具体的なコピー（emダッシュ、一般的なCTA、バズワード、チャットボット的な締め、架空の事実を使用しない）に加え、人間向けの規則として、WCAG AAコントラスト、視認可能なフォーカス、キーボード操作、空、読み込み中、エラーの各状態、モバイルでのリフローを求めます。                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 簡潔なCJK（文言）                      | `terse-cjk`     | `full`/`ultra` では漢文（文言）で回答します。`lite` では、機能語、社交辞令、装飾表現を使わない短い回答のみを求めます。                                                                                                                                                                       | zh（ロケール制限あり。以下を参照）            |

すべてのスタイルには、`lite`、`full`、`ultra` の3つの強度レベルがあり、各レベルの
末尾には共通境界条項（`outputMode.ts` の `SHARED_BOUNDARIES`）が付きます。これにより、
コードブロック、ファイルパス、コマンド、エラー、URLが正確に維持されます。`terse-prose` と
`terse-cjk` の各レベルのテキストでは、そのリストに識別子も追加されます。

`terse-cjk` は2か所で `zh` にロケール制限されています。Compression Settingsページでは、
ダッシュボードのUI言語が中国語（`zh-CN` または `zh-TW`）の場合にのみ
その行が表示され、`applyOutputStyles()` はリクエストの解決済み言語（以下の「言語の
選択」を参照）が `zh` の場合にのみ注入します。行を非表示にしても、保存済みの `terse-cjk` 選択は
消去されません。設定APIは任意のスタイルIDを受け入れ、ページ上で他のスタイルを保存しても
その選択は維持されます。リクエスト時には、`applyOutputStyles()` の言語チェックだけがロケールゲートとして機能します。

#### 注入の仕組み

`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）は、選択内容をカタログと照合して解決します（不明な ID やロケールが一致しないスタイルは除外され、エラーにはなりません。解決後にスタイルが 1 つも残らない選択では本文は変更されず、`no_styles` としてスキップされます）。選択された指示をカタログ順に連結し、境界条項を **1 回だけ** 追加します（`less-code` または `ponytail` が選択されている場合は、安全条項である `SAFETY_BOUNDARIES` またはその翻訳も追加されます）。また、ブロックの先頭には単一の冪等性マーカー（`[OmniRoute Output Styles]`）が付くため、再適用しても何も起こりません。解決された言語（下記の「言語選択」を参照）に翻訳がある場合は、英語ではなくローカライズされた指示が挿入されます。

空でない `messages` 配列を持つ本文では、冪等性チェックがコンテンツバイパスより先に実行されます。`[OmniRoute Output Styles]` マーカーが、トップレベルの `system` フィールド（文字列またはコンテンツブロック配列）、あるいは文字列コンテンツを持つ system メッセージにすでに含まれている場合、本文は `already_applied` として変更されず、キーワードチェックも実行されません。それ以外の場合、コンテンツバイパス（`open-sse/services/compression/outputMode.ts` の `shouldBypassCavemanOutputMode()`）が、ロールを問わず直近 3 件のメッセージのテキストを確認し、そのテキストがセキュリティ、不可逆操作、明確化に関するキーワード、または順序依存のシーケンスに一致すると、ターン全体でスタイルをスキップします。順序依存のシーケンスとは、`first`、`then`、`after that`、`before`、`rollback`、`backup` のいずれかに続き、240 文字以内に `delete`、`drop`、`migrate`、`deploy`、`release` のいずれかが現れるものです。バイパスは **Auto-Clarity Bypass** トグル（`cavemanOutputMode.autoClarity`、デフォルトでオン）がオンの間に実行されます。このトグルをオフにすると、キーワードチェックはスキップされます。

バイパスによってターンの処理が許可されると、`placeSystemInstruction()`（同じファイル）が、以下のうち最初に見つかった場所へブロックを配置します。この関数が新しい `messages[0]` を作成することはありません。

1. 先頭にある、文字列コンテンツを持つ system メッセージ：そのテキストの後ろにブロックを追加します。
2. トップレベルの `system` フィールド：文字列の場合はそのテキストの後ろにブロックを追加し、コンテンツブロック配列の場合は新しいテキストブロックとして追加します。
3. それより後ろで最初に見つかった、文字列コンテンツを持つ system メッセージ：そのテキストの後ろにブロックを追加します。
4. 上記のいずれにも該当しない場合：`messages` の末尾に新しい system メッセージとしてブロックを追加します。

`messages` 配列がない（または空の）本文では、コンテンツバイパスは実行されず、トップレベルの `system` フィールドも参照されません。文字列の `instructions` フィールドがある場合、そのテキストの後ろにブロックが追加されます。ただし、そのフィールドに `[OmniRoute Output Styles]` マーカーがすでに含まれている場合、本文は `already_applied` として変更されません。文字列の `instructions` フィールドがなく、`input`（文字列または配列）がある場合、ブロックが `instructions` となり、そのフィールドに保持されていた文字列以外の値を置き換えます。文字列の `instructions` フィールドも、文字列または配列の `input` もない本文は変更されず、`no_messages` としてスキップされます。

#### 有効化方法

ダッシュボードの **Compression Context → Compression Settings**（`/dashboard/context/settings`）にある Output styles セクションでは、スタイルごとに 1 行が表示され、オン／オフトグルとレベルセレクターを使用できます。スタイルは、圧縮自体（ページのマスタートグルである `enabled`）がオンの間に挿入されます。**Auto-Clarity Bypass** トグルは、**Caveman** ページ（`/dashboard/context/caveman`）の **Output Mode** カード内にあります。プログラム上では、圧縮設定に選択内容が次のように保存されます。

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

後方互換性：`outputStyles` が空の間は、従来の `cavemanOutputMode.enabled` 設定が、`cavemanOutputMode.intensity` の強度で `terse-prose` にマッピングされます。この場合、従来の `applyCavemanOutputMode()` インジェクターが `[OmniRoute Caveman Output Mode]` を挿入していた箇所で、ブロックは `[OmniRoute Output Styles]` マーカーから始まります。マーカーより下のテキストは、en、pt-BR、es、de、fr、it、ru、id、vi では従来の挿入内容と一致します。ja と zh では、境界条項の前にスペースが 1 つ余分に入ります。`terse-prose` には pt-BR、es、de、fr、it、ru、zh、ja、id、vi の翻訳があるため、解決された言語が `hu` のリクエストでは、従来のインジェクターがハンガリー語のテキストを使用していたのに対し、英語のテキストが使用されます。

出力スタイルの言語選択（`outputStyles/apply.ts` の `resolveOutputStyleLanguage()`）：`languageConfig.enabled` がオンの場合、`autoDetect` はリクエストの `messages` 配列から、テキストを持つ最新の user メッセージ（文字列コンテンツ、またはコンテンツパーツの `text`）をサンプリングし、Caveman エンジンの検出器（`detectCompressionLanguage()`）をそのテキストに対して実行します。検出器は、漢字を含み、かなを含まないテキストに対して `zh` を返します。それ以外の場合は、`it`、`pt-BR`、`es`、`de`、`fr`、`ru`、`ja`、`hu`、`id` のうちヒントの一致数が最も多いものを返し、一致がない場合は `en` を返します。分類できないテキストには `defaultLanguage` ではなく常に英語が使用されます。また、スタイルに `vi` のテキストが含まれていても、`vi` が検出されることはありません。Responses API の本文ではターンが `input` に保持されますが、これはサンプリングされないため、`defaultLanguage`、次いで英語が使用されます。`messages` 内にテキストを持つ user メッセージがない場合、または `autoDetect` がオフの場合は、`defaultLanguage`、次いで英語が適用されます。`languageConfig.enabled` がオフの場合、言語は英語になります。ただし、圧縮コンボがリクエストに適用される場合（リクエストのルーティングコンボに割り当てられたコンボ、または組み込みのスタックパイプラインで chatCore がフォールバックするデフォルトの圧縮コンボ）は例外です。コンボを適用すると、そのリクエストでは `languageConfig.enabled` がオンになり、コンボの言語パックから `defaultLanguage` が設定されます（保存済みの値がコンボのパックのいずれかであればその値、それ以外の場合はコンボの最初のパック。デフォルトは `en`）。一方、保存済みの `autoDetect`（デフォルトでオン）は引き続き適用されます。Caveman 入力エンジンは、これとは異なる方法でルールパックの言語を選択します。選択はテキストパーツごとに行われ、自動検出がオフの場合は `enabledPacks` によって制限されます。

スタイル × 言語マトリックスは
`tests/unit/compression/output-styles-i18n-matrix.test.ts` によって固定されています。すべてのカタログスタイルには、テストの `BASELINE_LANGUAGES` にエントリが必要です。ロケール制限のないスタイルには pt-BR 翻訳を同梱する必要があります（ロケール制限のある `terse-cjk` はこのルールの対象外です）。ただし、`KNOWN_ENGLISH_ONLY` に記載されている場合は除きます。このリストには翻訳がまったく存在しないスタイルのみを含めることができ、記載されたスタイルに何らかの翻訳があるとテストは失敗します。また、スタイルがその `BASELINE_LANGUAGES` エントリに記載されている言語を失った場合も、テストは失敗します。スタイルを追加する方法については、
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) を参照してください。

### ツール結果の圧縮

`open-sse/services/compression/toolResultCompressor.ts` の `compressToolResult()` は、
**5 つの戦略**でツール結果のテキストを圧縮します。以下の順序で試行され、有効になっていて、そのチェックが内容に一致した最初の戦略が結果を決定します。

1. **`fileContent`**: 3 行以上の内容で、先頭のインデントを無視したときに、少なくとも 1 行が `import `、`export `、`function `、`class `、
   `const `、`let `、`var `、`return `（キーワードの後に空白）で始まるか、`if`、
   `for`、`while` の後に `(` または ` (` が続く場合、先頭 20 行と末尾 5 行を保持し、省略された中間部分にマーカーを付けます。
2. **`grepSearch`**: `<path>:<digits>:` 形式の行を少なくとも 1 行含み、最初のコロンより前のテキストに空白がない場合、そのような行だけを最大 30 行まで保持し、さらに一致した行の件数と、一致したファイルの一覧を後に付けます。それ以外の行はすべて破棄されます。この戦略を発動するには、そのような行が 1 行あれば十分なため、`12:30:45` のようなタイムスタンプで始まるログ行も該当します。
3. **`shellOutput`**: ANSI CSI シーケンス（`ESC[` の後に数字またはセミコロンが続き、さらに文字が続くもの。カラーコードなど）または `$` の後に空白が続く箇所をテキスト内のどこかに含む出力では、それらのシーケンスが削除されます（`ESC[?25l` や OSC ウィンドウタイトルシーケンスなど、その他のエスケープは保持されます）。また、連続して繰り返される行をまとめた上で、末尾 50 行を保持します。このチェックは `json` と `errorMessage` より先に実行されるため、そのような `$` を含む JSON またはエラー出力は、`shellOutput` が有効である限りそれらの戦略に到達しません。
4. **`json`**: 2,000 文字を超え、任意の空白の後に `{` または `[` で始まり、正常に解析できる JSON ペイロードは要約されます。7 項目を超える配列では、先頭 5 項目と末尾 2 項目、および項目総数を保持します。オブジェクトでは先頭 20 個のキーを保持し、ネストされた各オブジェクトまたは配列の値を `{…N keys}` プレースホルダー（配列の場合、N はその長さ）に置き換え、先頭 20 個より後に破棄されたキー数を示す `_remaining_<N>_keys` マーカーを追加します。スカラー値はそのまま全体がコピーされるため、キーが 20 個以下でネストされた値のないオブジェクトは、インデントが付け直されるだけです。最小化された JSON では文字数が増えるため、変更されないままになります。
5. **`errorMessage`**: 大文字と小文字を区別せず、任意の位置に `error:`、
   `error `（`no error found` のように、単語の後に空白が続くもの）、`[error]`、
   `exception:`、`exception `、`[exception]`、または `traceback` を含む出力では、最初の行、その後の 10 行、および末尾 3 行を保持し、それらの間の行を `… [N frames elided] …` マーカーに置き換えます。このマーカーは、最初の行より後に 13 行を超える行がある場合にのみ表示されるため、14 行以下のエラー出力は短縮されません（12 行または 13 行では、末尾 3 行がすでに保持されている行と重複します）。

戦略が一致すると、何も節約できない場合でも、後続の戦略は試行されません。一致した戦略で推定トークン数（長さ ÷ 4 を切り上げ）が削減されない場合、たとえばコードに似たファイルが 25 行以下の場合や、2,000 文字を超える JSON 配列の項目数が 7 個以下の場合、アグレッシブエンジンは元のツール結果を保持します。両方の呼び出し元（`compressAggressive()` と `compressAnthropicToolResultBlock()`）は、`saved` が 0 以下の場合に元の結果を保持しますが、`compressToolResult()` 自体はその戦略の出力を返します。ツール結果ステップが最終処理ではありません。エンジンのフォールバック要約機能は、8,192 文字（`maxTokensPerMessage` の 2,048 に 4 を掛けた値）を超える `tool` または `function` メッセージをさらに短縮できます。

#### 使用する場面

ツール結果の圧縮は、アグレッシブエンジン（`open-sse/services/compression/aggressive.ts` の `compressAggressive()`）のステップ 1 です。そのため、Aggressive モードと、スタックされたパイプラインの `aggressive` ステップで実行されます。OpenAI 形式の `tool` および `function` メッセージと、Anthropic の `tool_result` ブロック内のテキストを圧縮します。各戦略には `aggressive.toolStrategies` 配下に個別のスイッチがあり、すべてデフォルトでオンになっています。ダッシュボードでは、圧縮がオンでデフォルトモードが Aggressive の場合、スイッチは Caveman ページの **Advanced** ビューにあります。

### スタックパイプライン

スタックモードでは、**複数のエンジンを順番に**実行します。通常は、最初に RTK（ツール出力を 60～90% 削減）、次に残りのテキストに対して Caveman（入力を約 46% 削減）を実行します。この組み合わせによる**対象範囲での削減率は 78～95%**です（上記の「Upstream Savings Math」を参照）。`1 - (1 - 0.60..0.90) × (1 - 0.46)` の平均は約 89% です。

#### 仕組み

```
入力（1000 トークン）
  → RTK（コマンド対応フィルター）→ 200 トークン
    → Caveman（不要語の除去）→ 108 トークン
  → 出力（108 トークン、約 89% 削減）
```

#### 使用する場面

以下の場合にスタックモードを使用します。

- ツールを多用するワークフロー（エージェント型コーディング、調査）
- コストを重視するバッチ処理
- トークン削減量を最大化する必要がある場合

スタックパイプラインは、グローバルな `stackedPipeline` 圧縮設定、またはルーティングコンボに割り当てられた名前付き圧縮コンボ（上記の「Per-Combo Override」を参照）を通じて設定します。auto-combo の `modePack` を通じて設定するものではありません（このフィールドは auto-combo のモデル選択における重み付けを変更するだけであり、`stacked` は有効なパック名ではありません）。

---

## コンボごとの圧縮オーバーライド

ユースケースごとに動作を微調整するため、グローバルな圧縮モードを**コンボ単位**でオーバーライドできます。

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

これは次のような場合に便利です。

- **コーディング用コンボ**: 長時間のセッションには `aggressive` モードを使用
- **簡単なQ&A用コンボ**: 高速な応答には `lite` モードを使用
- **ツールを多用するコンボ**: 削減効果を最大化するには `stacked` モードを使用
- **本番環境用コンボ**: キャッシュプロバイダーではオーバーライドを無効のままにしてください — 常時有効なキャッシュ対応の調整により、`aggressive`/`ultra` は自動的に `standard` にダウングレードされます（選択可能な `cache-aware` モードはありません）

---

## 関連項目

- [環境設定](../reference/ENVIRONMENT.md) — 圧縮に関する環境変数
- [アーキテクチャガイド](../architecture/ARCHITECTURE.md) — 圧縮パイプラインの内部構造
- [ユーザーガイド](../guides/USER_GUIDE.md) — 圧縮の始め方
- [RTK圧縮](./RTK_COMPRESSION.md) — RTKフィルター、信頼モデル、検証ゲート、生出力の復元
- [圧縮エンジン](./COMPRESSION_ENGINES.md) — Caveman、RTK、stacked、API、MCP、ダッシュボード
- [圧縮ルール形式](./COMPRESSION_RULES_FORMAT.md) — JSONルールパック形式
- [圧縮言語パック](./COMPRESSION_LANGUAGE_PACKS.md) — 言語固有のCavemanルール
