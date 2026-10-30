# Quality Gates Reference (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

このドキュメントは、OmniRoute におけるすべての CI 品質ゲートの正式なリファレンスです。
各ゲート、その検証内容、実行される CI ジョブ、ラチェットベースラインまたは合否ポリシーの
どちらを使用するか、ビルドをブロックするかアドバイザリかを説明します。

簡潔な概要と許可リストポリシーについては、`AGENTS.md` の「Quality Gates & Ratchets」セクションを
参照してください。同じシステムの批判的評価、成熟度分類、ツール非依存の
再現計画については、
[品質ゲートプレイブック](../ops/QUALITY_GATE_PLAYBOOK.md)を参照してください。

---

## ゲート一覧と実行プロファイル

### 候補の承認

CI ワークフローと Quality Gates ワークフローは、それぞれ安定した判定 `Gate / CI` と
`Gate / Quality` を出力します。バージョン管理された承認ポリシーでは、すべての上流ジョブを
必須または参考として列挙しています。該当する必須ジョブは成功しなければなりません。欠落、
キャンセル、スキップ、保留中、および不明な結果では PASS を確定できません。有効な
ドキュメントのみ、またはカタログのみの分類によって、コードレーンが非該当になる場合があります。
ドラフト PR は承認対象の候補ではありません。`hotfix` ラベルによってエビデンスが免除されることはありません。

両ワークフローは、main/release ブランチへの PR、`main` へのプッシュ、手動ディスパッチ、
およびマージグループイベントを対象とします。プッシュ、ディスパッチ、およびマージグループでは、
完全な選択セットが実行されます。`release/**` へのプッシュでは、これらは開始されません
（2026-10-18）。各変更はすでにその PR でマトリックスを実行しており、マージ後の組み合わせは
Release-Green のジョブであるためです（`docs/ops/RUNNER_BOX.md` → Hosted レーン）。フォークと
マージグループでは、通常はセルフホストランナーを選択するジョブに対してホストランナーを使用します。
ロールアウト前に、十分なホスト側のキャパシティを確認する必要があります。

各 JSON レシートは、チェックアウトされた SHA、ワークフロー実行、および試行を識別します。
CLI は、チェックアウト SHA とイベント SHA の不一致を拒否します。ワークフローテストでは、
ポリシーのメンバーシップを判定ジョブの `needs` リストに関連付けるため、新規または削除された
レーンが暗黙のうちに消えることはありません。レシートが対象とするのは、それ自体のワークフローであり、公開、デプロイ、または既存のアドバイザリースキャナーの内部実装ではありません。該当するチェックをブランチルールで必須にすることは、別途必要な管理上の変更です。ジョブを定義するだけでは、ブランチは保護されません。

`API Route Typecheck` は独立したワークフローチェックであり、2つの集約判定にも、ローカルの完全オブザーバーの静的プロファイルにも含まれません。対象となる候補について、その結果を個別に確認してください。`.github/workflows/api-route-typecheck.yml` は、`main` または `release/**` を対象とするPR、いずれかのブランチファミリーへのプッシュ、および手動ディスパッチで実行されます。パスフィルターはありません。PRのベースブランチを変更すると新しいチェックが要求されます。本文またはタイトルの編集では、監視専用の名前 `Admission not requested / API Route Typecheck` が使用されるため、アドミッションチェックの代わりにはなりません。このワークフローでは、マージグループトリガーが宣言されていません。このチェックを必須とするマージキューを導入する場合は、まず、そのイベントでチェックが実行されるようにする必要があります。

### UI 実行キャパシティ

CI は、UI の全インベントリを 4 つの `test-vitest` マトリックスシャードとして実行します。
各シャードのワーカー数は最大 2 で、既存のジョブ期限は 15 分です。最初のシャードでは、
MCP/autoCombo Vitest スイートも実行します。必須ジョブの結果は、すべてのマトリックス要素を
対象とします。1 つのシャードが失敗またはキャンセルされた場合、候補の承認を確定できません。

夜間オブザーバーは、各 UI シャードについて、完全一致する候補のレシートを個別に保持します。
最初のレシートには MCP の実行も含まれます。4 つすべてのレシート、ログ、および一致する
実行 ID が必要です。ローカルの `npm run test:vitest:ui` は引き続き完全なスイートを選択します。
1 回の `--shard` 実行は部分的なエビデンスにすぎません。

### ユニットカバレッジの収集

12 個のユニットシャードは、既存のテスト実行中に V8 カバレッジを収集します。成功したシャードは、
中間の Istanbul レポートを生成せずに元のファイルを圧縮するため、
`scripts/ci/compact-v8-coverage.mjs` を実行します。最終的な Coverage ジョブでは、12 個すべての
マニフェストを候補 SHA、ランタイム、ソースルート、およびデータハッシュと照合して検証した後、
c8 のレポーターと既存のカバレッジしきい値を実行します。入力では、c8 のグローバルなファイル名順を
維持します。関数カバレッジとブロックカバレッジが混在する場合、シャードごとの事前マージは安全では
ありません。シャードの欠落、不正な形式、または非互換性がある場合、承認は失敗します。失敗した
テストシャードの生の診断用カバレッジは別途保持され、最終マージには含めることができません。

### ユニット実行進捗レシート

共有の `test:unit:ci:shard` コマンドは、`scripts/ci/unit-progress-reporter.mjs` を通じて
`primary`、`dashboard`、`serial` の各フェーズを記録します。通常のテストレポートも引き続き
利用できます。メタデータのみを含む別のレシートには、各ファイルの開始と完了が記録され、
30 秒間隔のハートビートには、実行中のファイルとその経過時間が一覧表示されます。記録されるのは
許可リストに含まれる実行メタデータのみです。テストの説明、出力、エラー本文、および完全な
環境情報はシリアライズされません。

CI と Quality は、JSONL ファイルを `unit-progress-ci-<run>-<attempt>-<shard>` および
`unit-progress-quality-<run>-<attempt>-<shard>` として保持します。ジョブがタイムアウトすると、その後のアップロードが
行われない場合がありますが、すでに送出されたハートビートは診断の根拠として残ります。ハートビートが欠落している場合は、
ランナープロセスがブロックまたは終了された可能性もあります。これらのレシートは、既存のテスト選択、
並行処理、期限、終了ステータスを維持します。候補の採用可否を判定するものではありません。

### 受け入れ結果集約処理における保持済み証跡

`scripts/quality/validate-release-acceptance.mjs` は、指定された計画とそのマニフェストを集約します。計画がリリースパイプライン全体を網羅していることを証明するものではありません。計画が `VERIFIED` であっても、レポートには明示的に `releaseAcceptance: false` が設定されます。`release-acceptance.yml` ワークフローは依然としてシャドー用テストフィクスチャを使用しており、実際のビルド、パッケージ化、起動、昇格の実行記録を使用しているわけではありません。

保持済み証跡を検証するには、CLI に `--evidence-root` が必要です。ファイルは `<evidence-root>/<artifact_id>/<member>` として解決され、SHA-256 ハッシュが計算されます。証跡のない PASS レコード、欠落または変更されたファイル、安全でないパス、シンボリックリンクがあると、検証は成立しません。欠落したファイルは、成功した実行の空のログと同じではありません。既存の SHA/run/attempt の検査は独立したままです。バイト列が一致しても、古い実行記録を有効にはできません。ファイルの完全性は、実行の真正性や成果物の昇格を証明するものではありません。

### 静的スキャン一覧

バージョン管理された npm エイリアス一覧と静的スキャンのメンバーシップは、
`config/quality/gate-manifest.json` にあります。`package.json` に照らしてスクリプト名と
正確なコマンドを検証するには、`npm run check:gate-manifest` を実行してください。追加、削除、
およびコマンドのドリフトがあると、ローカルフックと CI の変更分類ジョブの両方が失敗します。
エイリアスは、ワークフロージョブ、マトリックスインスタンス、またはテストケースではありません。
これらの数を同等のものとして示してはなりません。

選択されたエイリアスを実行せずに確認するには、`npm run quality:scan -- --list` または
`npm run quality:scan:fast -- --list` を使用します。ランナーは npm エントリポイントを呼び出すため、
設定されている場合の Bun を含め、そのランタイムが維持されます。マニフェストでは、これらの
プロファイル外のエイリアスを個別に呼び出されるものとして記録し、読み取り専用スキャン
プロファイルではメンテナンスコマンドを禁止しています。

これらのプロファイルが対象とするのは静的スキャンのみです。プロダクトテスト、カバレッジ、
パッケージング、外部チェック、または候補の完全なリリース承認を保証するものではありません。
ワークフローの承認では、関連付けられた `config/quality/admission-policy.json` と
`scripts/quality/admission-verdict.mjs` を使用します。リリースオブザーバーのプロファイルは
別のままです。該当するチェックとレシートを個別に確認してください。完全版オブザーバーの静的
コマンドは、`audit:deps`、ミューテーションテストの選択、および翻訳チェックを含め、
`config/quality/release-green-static-profile.json` で宣言されています。ローダーは、npm コマンドを
package.json、およびモデル化された CI/Quality 宣言と照合して検証します。シェルトークンを引数として
実行するのではなく、ドリフトを拒否します。必須スキャナーの SKIP/INCOMPLETE 出力では PASS を
確定できません。このプロファイルは外部除外項目を記録しますが、ホスト環境でのカバレッジ、
テストマトリックス、パッケージ、またはデプロイのエビデンスを置き換えるものではありません。
以下の説明的な一覧は参考情報であり、ゲートが実際に実行されたことの証明ではありません。

スクリプトは `scripts/check/`（ポリシーゲート）および `scripts/quality/`（ラチェットエンジン）配下に
あります。CI の信頼できる唯一の情報源は `.github/workflows/ci.yml` です。

### 公開済みベースドキュメントの健全性

`.github/workflows/i18n-base-health.yml` は、選択された `main` および `release/v*` へのプッシュ後と、手動ディスパッチ時にドキュメントの健全性を監視します。そのフィルターは、ドキュメント、ルートの Markdown、`llm.txt`、翻訳の状態および設定、ならびに関連する i18n ツールを対象とします。単一の `Published base documentation health` ジョブは、ホスト型 Ubuntu を使用し、5 分の期限を設定します。このジョブは読み取り専用の検証を実行し、依存関係のインストール、翻訳、状態の採用を行わずに診断レシートを書き込みます。

`scripts/i18n/check-base-health.mjs` は、ソースハッシュの不整合、ターゲットの欠落、ターゲットハッシュの不整合、古い翻訳、およびセクションキャッシュの不整合が一切ないことを要求します。また、現在のコアドキュメントおよびロケールのスコープと、記録されたその来歴も検証します。無効なコンテキスト、不完全な網羅範囲、または中断されたチェッカーは `INCOMPLETE` を生成し、確認されたドリフトは `FAIL` を生成します。どちらも失敗を示す終了ステータスを返します。レシートは、チェックアウトの SHA、ワークフロー、実行、試行に紐付けられ、`i18n-base-health-<sha>-<run>-<attempt>` として保持されます。

これは、公開済みベースに対する独立した監視です。PR またはマージグループのイベント、必須の PR チェック、npm エイリアス、静的スキャンプロファイルのメンバーは追加されません。既存の差分ベースの PR ポリシーと、基盤となるチェッカーの助言的な分類は、引き続き独立しています。アップロードが成功しても、失敗した健全性結果を PASS に変えることはできません。

### リリース PR の高速パス（`quality.yml`）

`.github/workflows/quality.yml` は、main/release への PR、`main` へのプッシュ、ディスパッチ、
およびマージグループにおいて CI を補完します。PR では、パスでフィルタリングされた高速チェックを
使用します。恒久的に無効化されていた重複ビルドは削除されました。実際のビルド、パッケージ、
および起動チェックは引き続き CI に残ります。

| ジョブ                                           | スコープ                                                                                                                                                                                 | ブロッキング           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | ドキュメント／コードのPR。APIドキュメント参照およびdocs-all                                                                                                                              | はい                   |
| `Fast Quality Gates`                             | コードのPR。静的チェック、型チェック、ダッシュボードの型チェック、影響を受ける単体テスト                                                                                                 | はい                   |
| `Forgotten sibling tests`                        | コードのPR。変更されたモジュールから静的コンシューマーと候補となる兄弟テストを追跡。バレルおよび動的インポートのパスは、参照される許可リストの例外とともに、助言的な診断として報告される | **助言のみ**           |
| `Vitest (fast-path)`                             | コードのPR。高速なvitestスイート                                                                                                                                                         | はい                   |
| `Unit Tests fast-path`                           | コードのPR。4シャードの単体テストスイート                                                                                                                                                | はい                   |
| `No new ESLint warnings`                         | コードのPR。抑制設定を考慮したlintガード                                                                                                                                                 | はい（フォークを含む） |
| `Merge integrity (changelog + generated skills)` | ドラフトではないPR。変更履歴と生成されたスキルの同期                                                                                                                                     | はい（フォークを含む） |

#### 忘れられた兄弟テストのレポート

`npm run check:forgotten-sibling-tests` は、テスト影響マップで使用されているインポートリゾルバーを再利用します。
変更された各本番モジュールについて、候補テストがプルリクエストの差分に含まれていない場合に、決定論的な
`changed module/symbol -> static consumer -> candidate sibling test` チェーンを報告します。MarkdownのサマリーとJSONの結果は、
ブロッキングとして展開する前の調整に使用できるよう、`forgotten-sibling-tests` ワークフローアーティファクトとして保持されます。

バレル再エクスポートと動的インポートは解決診断のみを目的としており、ブロッキング対象の検出結果を生成することはありません。
レビュー済みの例外は `config/quality/forgotten-sibling-allowlist.json` に記載されます。各エントリには、コンシューマーと候補テストを指定し、
具体的な根拠を示したうえで、GitHubのissueまたはプルリクエストへのリンクを含める必要があります。不正な形式のエントリは、
安全側に倒して失敗として扱われます。例外を使用して、削除された候補テストや、`.skip`／`.todo` を追加する差分を抑制することはできません。
アサーションの弱体化やその他のマスキングは、独立したブロッキングゲートである `check:test-masking` が引き続き担当します。

### ジョブ: `lint`

`main` に対するすべてのPRで実行されます。失敗した場合はマージをブロックします。

| スクリプト (`npm run ...`)        | 検証内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ブロッキング                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `check:node-runtime`              | Node.js のバージョンがサポート対象範囲内であること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                  |
| `check:test-tla-order`            | `tests/unit` 配下の `node:test` ファイルが、テストを登録し、トップレベルの `await` に到達した後、さらにテストを登録していないこと（#18045、ラチェット方式: `test-tla-order-allowlist.json` は縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                  |
| `check:cycles`                    | `src/` + `open-sse/` 全体の循環インポート（AST ベース、tsconfig の `paths` を解決）。循環が 1 つでも存在する場合、ベア実行は終了コード 1 で終了し（#15281 以降はフェイルクローズ）、SCC を一覧表示します。`check:cycles:ratchet`（CI で実行されるもの）は、循環数が `quality-baseline.json` の `metrics.cycles` 上限を超えた場合にブロックします。現在は 14、`direction: down` であるため、減少のみ可能です（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい（ラチェット）                    |
| `check:boundary`                  | `open-sse → src` の結合: エンジンからアプリへの一意なファイル間インポート（`scripts/quality/measure-boundary.mjs`。エッジ一覧は v4 のコア／モジュール分割に関する修正バックログです）。ベア実行 = アドバイザリーレポート（`quality:boundary` と同じ）。`check:boundary:ratchet`（CI で実行され、`quality.yml` の高速ゲート用ラチェットループにも含まれるもの）は、数が `quality-baseline.json` の `metrics.boundaryOpenSseToSrc` 上限を超えた場合にブロックします。上限は測定値 771 で初期設定され、`direction: down` です。`--update` では値を下げることしかできません。PR ではベース相対です（`--base-ref`、下記参照）                                                                                                                                                                                                                                                                                                                                                                                                   | はい（ラチェット）                    |
| `check:route-validation:t06`      | すべてのルートに Zod スキーマが存在する（Tier 6 ポリシー）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                  |
| `check:any-budget:t11`            | `@ts-expect-error // any` の数が予算を超えていない（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                  |
| `check:provider-consistency`      | `providers.ts` 内のすべてのプロバイダーに、`providerRegistry.ts` 内の対応するエントリが存在する（また、その逆も allowlist の範囲内で成立する）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                  |
| `check:model-lifecycle`           | 手動で管理される 3 つのルーティングテーブルが、チェックイン済みのライフサイクルスナップショット（#11503）との整合性を維持していることを確認する。`FITNESS_TABLE`（`taskFitness.ts`）は、`REGISTRY` がルーティング可能な廃止済み id をスコアリングしない。すべての `BUILT_IN_ALIASES` のターゲットは `REGISTRY` に存在し、廃止済み id のスナップショットには存在しない。`REGISTRY` に残っているすべての廃止済み id は転送されているか、`allowedRetiredInCatalog` に記載されている。また、`DEFAULT_DEGRADATION_MAP` のソースまたはターゲットは、そのスナップショット内で廃止済みになっていない。これは、モデルが現在、稼働中のアップストリームによって提供されていることを証明するものではない。オフライン — `config/quality/model-lifecycle.json` と比較する。このファイルは `npm run quality:refresh-model-lifecycle` を使用して手動で更新する（ネットワークが必要。CI には組み込まれていない）。`allowedRetiredInCatalog` は段階的削減のためのラチェットである。エントリを追加する場合は、必ず追跡用 issue を添えること。 | はい                                  |
| `check:fetch-targets`             | クライアント側の `src/` 内にあるすべての `fetch("/api/...")` が、実在する `route.ts` に解決される                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                  |
| `check:deps`                      | リポジトリ内のすべての `package.json` に含まれる、`npm install` でインストール可能な依存関係がすべて `dependency-allowlist.json` に含まれている。新たに追加されたバージョン固定されていないパッケージや、スロップスクワッティングされたパッケージにはフラグが付けられる                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | はい                                  |
| `audit:deps`                      | 5 つの独立したロックファイル（ルート、Electron、OpenCode plugins v1/v2、provider）すべてに対する npm audit。重大なアドバイザリがある場合はブロックし、重要度が高いアドバイザリは可視の警告として残ります。監査の欠落または失敗は INCOMPLETE としてブロックされ、スコープごとのロックハッシュとレポートが保持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                  |
| `check:lockfile`                  | `package-lock.json` の整合性 — https レジストリ、整合性ハッシュ、ホストのオーバーライドなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                  |
| `check:licenses`                  | 本番環境用依存関係に対する SPDX ライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                  |
| `check:tracked-artifacts`         | ビルド成果物およびコミットされた `node_modules` シンボリックリンクがないこと（husky の pre-commit でも実行。pre-push は意図的に軽量化 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                  |
| `check:ai-attribution`            | PR のコミット、タイトル、本文に AI／ボットによる `Co-Authored-By` トレーラーまたは AI 生成フッターがないこと — ハードルール #16（PR→`release/**` 向けの `quality.yml` 高速ゲートループ内 — イベントペイロードを読み取り、PR 以外では何もしない — および PR→`main` 向けの `ci.yml` lint にある PR 専用ステップ。また、husky の `commit-msg` フックでも実行。人間の共同作成者は許可。#14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | すべての Vitest 除外で追跡 Issue が指定され、`config/quality/vitest-exclusions.json` に記載されていること（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                  |
| `check:file-size`                 | ソースファイル（`src/`、`open-sse/`、`electron/`、`bin/` 内の `.ts`/`.tsx`）は `cap` 以内、テストファイル（`*.test.ts(x)`）は `testCap` 以内に収める必要があります。`file-size-baseline.json` で固定されているファイル（`frozen` / `testFrozen`）は、記録されたサイズを超えて増大してはなりません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                  |
| `check:error-helper`              | executor/handler のエラーレスポンスでは `buildErrorBody()` / `sanitizeErrorMessage()` を使用します（厳格なルール #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                  |
| `check:migration-numbering`       | マイグレーション SQL ファイルには欠番や重複がなく、連番が付けられている必要があります                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                  |
| `check:public-creds`              | `publicCreds.ts` 以外に OAuth の `client_id`/`client_secret` または Firebase Web キーのリテラルを記述してはなりません（厳格なルール #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                  |
| `check:db-rules`                  | `src/lib/db/` モジュール外で生の SQL を使用してはなりません。また、`localDb.ts` からのバレルインポートも禁止されています（厳格なルール #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                  |
| `check:known-symbols`             | ディスパッチテーブルに登録されているプロバイダー executor、ルーティング戦略、translator がディスク上のファイルと一致している必要があります。孤立したシンボルや未宣言のシンボルがあってはなりません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                  |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートが `isLocalOnlyPath()` によって分類されていること（ハードルール #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                  |
| `check:test-discovery`            | リポジトリ内のすべての `*.test.ts` / `*.spec.ts` ファイルが少なくとも1つのテストランナーによって収集されること（ラチェット方式: `test-discovery-baseline.json` 内の孤立ファイル一覧は減少のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                  |
| `check:agent-skills-sync`         | 生成されたエージェントスキルの成果物がソースカタログと一致していること（差異なし）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | プロバイダーのロゴ/アセットに記録済みの出所情報エントリがあること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON 設定ファイルが解析可能で、リポジトリの lint ルールを満たしていること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | エラーなしで TypeScript をコンパイルできること（警告は勧告のみ）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                  |
| `typecheck:noimplicit:core`       | 厳格な `noImplicitAny` — 将来を見据えたチェック。既存の多くの呼び出し箇所には依然として型注釈が必要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **勧告**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` に限定した `tsc`（#7033）— `typecheck:core` の厳選された27ファイルの許可リストにはダッシュボードの TSX が一切含まれておらず、`next build` も型チェックを一切行いません（`next.config.mjs` で `ignoreBuildErrors: true` が設定されています）。そのため、そこで発生した孤立識別子のリグレッション（#6625/#6909）は CI で検出できませんでした。固定されたファイル別／TS コード別の件数ベースライン（`config/quality/dashboard-typecheck-baseline.json`、`check:known-symbols` と同じ陳腐化検出パターン）との差分を比較します。ベースラインの件数を超える新規エラーのみがゲートを失敗させます。既存エラーを修正した場合は、`--update` を使用してベースラインを段階的に引き下げます。                                                                                                                                                                                                                                                                                                                  | はい                                  |

### ジョブ: `quality-gate`

`test-coverage` の後に実行されます。失敗するとマージをブロックします。

| スクリプト                   | 検証内容                                                                                                                                                                                   | ブロッキング             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `quality:collect`            | `quality-metrics.json`（ESLint の警告数、統合されたシャードレポートから取得したカバレッジ）を出力します                                                                                    | はい（ラチェットの前段） |
| `quality:ratchet`            | `quality-baseline.json` の各メトリクスが悪化していないこと（ESLint の警告数 ≤ ベースライン、カバレッジ ≥ ベースライン）                                                                    | はい                     |
| `check:duplication`          | コードの重複（jscpd@4）が `quality-baseline.json` のベースラインを超えていないこと                                                                                                         | はい                     |
| `check:complexity`           | ファイル単位の循環的複雑度が上限を超えていないこと（コア ESLint の `complexity` + `max-lines-per-function`）                                                                               | はい                     |
| `check:cognitive-complexity` | 認知的複雑度のラチェット（`eslint-plugin-sonarjs`）— 個別の ESLint パスです。CI では両方を統合し、単一の `check:complexity-ratchets` ステップとして実行します                              | はい                     |
| `check:dead-code`            | 未使用のエクスポート／ファイルのラチェット（knip）がベースラインに対して悪化していないこと                                                                                                 | はい                     |
| `check:compression-budget`   | 圧縮ベンチマークの予算 — エンジンごとのトークン削減率の下限が悪化してはならないこと                                                                                                        | はい                     |
| `check:type-coverage`        | 型付け率のラチェット（`type-coverage`）が悪化していないこと。`typecheck:noimplicit:core` をほぼ包含します                                                                                  | はい                     |
| `check:codeql-ratchet`       | 未解決の CodeQL アラート数が悪化していないこと（`gh api` 経由で取得。トークンがない場合は正常にスキップ）— 更新頻度と手動トリガーについては、下記の「CodeQL ラチェット」を参照してください | はい                     |

### ジョブ: `quality-extended`

このジョブは、該当する候補をブロックします。バンドルサイズ、シークレットの検出結果、脆弱性の
検出結果、ワークフローの検出結果、および OpenAPI の変更は、必須のラチェットでチェックされます。
循環依存関係の診断は引き続き参考情報です。スキャナーのインストールは必須です。
`scripts/ci/install-quality-scanners.sh` は固定されたバージョンをプロビジョニングし、
インストールの失敗を伝播します。ツールの欠落、無効なレポート、またはベースラインの欠落がある場合、
必須のスキャナーゲートは未完了のままとなります。

| スクリプト               | 検証内容                                                                                                                                                                                                                    | ブロッキング                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | 循環依存がないこと（dpdm）                                                                                                                                                                                                  | **勧告のみ**                                    |
| `check:bundle-size`      | バンドルサイズが上限を超えていないこと。測定できない場合は失敗                                                                                                                                                              | **--ratchet 使用時はブロッキング**              |
| `check:secrets`          | Gitleaks の検出結果が悪化していないこと。必須スキャンでは、ツール、ソース、ベースラインの欠落、スキャンの失敗、無効なレポートを拒否                                                                                         | **--ratchet 使用時はブロッキング**              |
| `check:vuln-ratchet`     | 依存関係の脆弱性が悪化していないこと。必須スキャンでは、ツールの欠落、無効なレポート、ベースラインの欠落を拒否                                                                                                              | **--ratchet 使用時はブロッキング**              |
| `check:workflows`        | ワークフローの lint（actionlint + zizmor）。スキャナーの欠落または故障、無効なレポート、ratchet ベースラインの欠落は INCOMPLETE として失敗。有効な検出結果には、選択された strict/advisory/ratchet ポリシーを適用           | 実行必須。CI では zizmor ratchet がブロッキング |
| `check:openapi-breaking` | 固定されたイベントコミットに対する公開 API コントラクト（PR のマージベース、push 前、merge-group のベース。スケジュール実行または手動実行ではチェックアウトされたコミットの第一親）。必須の測定に失敗した場合は閉鎖的に失敗 | **--ratchet 使用時はブロッキング**              |

### ジョブ: `docs-sync-strict`

`main` または `release/**` へのプルリクエストでは、このジョブは、ドラフトではない（または信頼済みキューの）候補で、ドキュメント変更またはコード変更に分類されたものに対してのみ実行されます。PR 以外の CI イベントでも実行されますが、このワークフローの push トリガーは `main` のみが対象で、`release/**` は対象外です。終了コードがゼロ以外のステップはジョブをブロックします。以下の報告のみの指摘や文書化された例外はブロックしません。

| スクリプト                     | 検証内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ブロッキング                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | 以下の 7 つのサブゲートを順番に実行するメタゲート                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                                                                                                   |
| ↳ `check:docs-sync`            | パッケージ/OpenAPI/CHANGELOG のバージョン整合性、`llm.txt` ミラーの完全一致、翻訳済み CHANGELOG のセクションとサイズの不変条件、置き換え済みの重複ドキュメントがないこと                                                                                                                                                                                                                                                                                                                       | はい                                                                                                                   |
| ↳ `check:docs-frontmatter`     | コンパイルされたドキュメントページに有効な frontmatter タイトルが含まれていること                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                                                                                                   |
| ↳ `check:docs-counts`          | 信頼度の高い件数の不変条件は厳格に検証します。ファイル数のヒューリスティックな検査は、スクリプトに `--strict` が渡されない限り警告のみです（CI のメタゲートはこのフラグを渡しません）                                                                                                                                                                                                                                                                                                          | 厳格な層はブロック、ソフトな層は勧告のみ                                                                               |
| ↳ `check:env-doc-sync`         | 明示的な ignore、doc-only、env-only の許可リストを適用した後、ソースコードでの環境変数の読み取り、`.env.example`、`docs/reference/ENVIRONMENT.md` が一致すること                                                                                                                                                                                                                                                                                                                               | はい。文書化された許可リストの対象外でブロック                                                                         |
| ↳ `check:deprecated-versions`  | 無視対象のドキュメントを除き、安全な履歴コンテキスト以外にある古い可能性のあるバージョンと、古い更新日を報告します                                                                                                                                                                                                                                                                                                                                                                             | 現在の CI 構成では勧告のみ（`--strict` は渡されません）                                                                |
| ↳ `check:doc-links`            | ドキュメント内の内部 Markdown リンクが実在するファイルに解決されること（`[text]`/`(path)` 形式）                                                                                                                                                                                                                                                                                                                                                                                               | はい                                                                                                                   |
| ↳ `check:fabricated-docs`      | ドキュメントで言及されているルート、環境変数、CLI コマンド、フック名、ファイルパスがコードベース内に存在すること。`--strict` によるハードゲート。フラグなしではソフトフェイル。                                                                                                                                                                                                                                                                                                                | はい（CI では `--strict` を使用）                                                                                      |
| `check:cli-i18n`               | 使用される CLI の `t()` キーが `en` に存在し、`pt-BR` がすべての最上位セクションを保持し、`zh-CN` と `zh-TW` が `en` のすべてのキーを含むこと                                                                                                                                                                                                                                                                                                                                                  | はい                                                                                                                   |
| `check:openapi-coverage`       | OpenAPI 仕様が、実在するルートについて ratchet で設定された最低カバレッジ以上を網羅していること                                                                                                                                                                                                                                                                                                                                                                                                | はい                                                                                                                   |
| `check:openapi-security-tiers` | 宣言された `x-loopback-only`/`x-always-protected` アノテーションには `routeGuard.ts` の裏付けが必要です。パーサーエラーと順方向の不一致はブロックします。ローカル専用プレフィックス配下で欠落した `x-loopback-only` を調べる逆方向の検査は警告のみで、パターンだけで定義されたルートはこの逆方向検査から除外されます。                                                                                                                                                                         | パーサー/順方向の検査はブロック、逆方向の検査は勧告のみ                                                                |
| `check:openapi-routes`         | 正当な理由のある `KNOWN_STALE_SPEC` 許可リストを適用した後、`openapi.yaml` 内の各 `/api...` パスがパラメーター名に依存せず実在のルートに対応すること。許可リストの古い項目も失敗になります                                                                                                                                                                                                                                                                                                     | はい                                                                                                                   |
| `check:docs-symbols`           | ミラーではない正本ドキュメントの内部 `/api/...` URL 参照が、実在のルートまたはルート群に対応すること。プロキシ/上流/プレースホルダー/ファイルへの参照と、正当な理由のある `KNOWN_STALE_DOC_REFS` 項目は除外されます。許可リストの古い項目は失敗になります                                                                                                                                                                                                                                      | はい                                                                                                                   |
| `i18n translation drift`       | 主要ドキュメントのソースとターゲットのハッシュ、および翻訳の来歴を検証します。PR 比較では、完全に同一の継承された失敗のみを許容します。ソース、ターゲットの欠落、ターゲットのハッシュ、古い翻訳、セクションキャッシュに関する新規または未検証の不整合はブロックします。PR 比較の外では、ソース・ターゲットの欠落・ターゲットのハッシュに関する失敗はブロックし、古い翻訳と不整合なセクションキャッシュは警告のみとなります。旧形式のセクションキャッシュが存在しないことは失敗ではありません。 | PR の新規・未検証の差異はブロックし、完全に同一の継承された差異は警告のみ。PR 以外の規則は失敗の種類によって異なります |

### ジョブ: `i18n-ui-coverage`

| スクリプト                             | 検証内容                                                                                                                                                    | ブロッキング     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage`（インライン） | UI i18n キーのカバレッジが 65% 以上であること                                                                                                               | はい             |
| `check-ui-value-drift`（インライン）   | 書き換えられた英語の**値**に対して、古い翻訳が残っていないこと                                                                                              | はい             |
| `check-new-key-coverage`（インライン） | **新しい**英語キーがすべてのロケールで翻訳されていること — `__MISSING__:` マーカーは拒否される                                                              | はい             |
| `check-translation-ratio`              | ロケールごとの実翻訳率（英語と同一／プレースホルダー／許可リスト外の未翻訳リーフ）が `config/quality/i18n-translation-baseline.json` + 許容幅を超えないこと | **ブロッキング** |

`fetch-depth: 0` が必要です — 値ドリフトゲートは、マージベースと `en.json` の差分を確認します。

#### `check-ui-value-drift` — 古い翻訳を検出するゲート

他のゲートでは構造上検出できない、ある種の i18n リグレッションを検出します。英語の値が
書き換えられたにもかかわらず、_以前の_英語を基にした翻訳が残ることで、
英語以外のユーザーが、断定的に書かれているものの現在は誤っている文面を読み続ける問題です。

これは実際にリリースされました。Antigravity のログインヘルパーが導入された際（#5203）に
`oauthModal.googleOAuthWarning` が書き換えられましたが、**43 ロケール中 39 ロケール**には、
運用担当者に「完全な URL をコピーして下に貼り付ける」よう指示する文面が残っていました。
このプロバイダーでは完了できないフローです。#8463 まで見過ごされていた理由は次のとおりです。

- `sync-ui-keys` は**存在しない**キーのみを補完し、**古くなった**キーは補完しない。
- `check-ui-keys-coverage` はキーの_存在_を数えるため、古い翻訳もカバー済みとして評価される。
- `check-translation-drift` が追跡するのは `docs/i18n/<locale>/**.md` のドキュメントミラーであり、
  `src/i18n/messages/*.json` は一切読み取らない。2026-09 の再同期以降、ジョブ `docs-sync-strict` でブロッキング：
  コアドキュメントを編集 → `npm run i18n:run -- --files=<doc>`（セクション単位で低コスト）。

**ベースライン方式ではなく、差分認識方式です。** マージベース時点の `en.json` と
作業ツリーを比較します。英語の値が変更されたすべてのキーについて、どのロケールでも
未変更の翻訳が残っていれば、古い翻訳と見なされます。これは意図的に**既存の負債を凍結**します。
差分からは、長期間存在する翻訳がどの古い英語に由来するか判別できないため、ゲートは
現在の変更が触れた箇所のみを判定します。代替案（キーごとのハッシュベースライン）では、
既存の最大ベースラインの 3 倍に当たる約 600 KB の生成ファイルが必要となり、i18n PR のたびに
大量の差分が発生します。

このゲートを満たす方法は 2 つあります。

1. 影響を受ける翻訳を更新する、または
2. それらを `__MISSING__:<new english>` に設定する — これにより、ランタイムは修正済みの英語を
   提供し（`src/i18n/request.ts::deepMergeFallback`、#7258）、そのキーは翻訳待ちキューに追加されます。

文字列の**意味**が変わった場合は、**キー名の変更**を優先してください。新しいキーが
古い翻訳を引き継ぐことはありません。#8463 ではこのパターンが使用されました。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

値ドリフトゲートと新規キーゲートは、`scripts/i18n/resolve-ui-diff-base.mjs` による単一の不変な比較を共有します。ワークフローは、両方のチェックに同じベース、ベース先端、および候補の SHA を渡します。PR/ベースのリターゲット、push、および merge-group の実行では、それぞれのイベントコンテキストが使用されます。候補ブランチを手動実行するには、そのブランチに対応する正確なオープン PR、または明示的な `i18n_base_sha` 入力が必要です。この入力を指定せずに `main` または `release/vX.Y.Z` を手動実行またはスケジュール実行で確認した場合、最後のコミットとその最初の親が比較されます。これは、継承された翻訳負債全体の監査ではありません。ローカルでの実行には、上記の `BASE_REF` コマンドなど、明示的な比較ベースが必要です。

比較コンテキストが欠落または曖昧である場合、必要なカタログが読み取り不能または無効である場合、および候補が変更された場合は、警告モードを含め、終了コード **2** の `INCOMPLETE` になります。カタログの読み取りには `scripts/i18n/read-ui-catalog.mjs` が使用されます。読み取りに失敗しても、空のオブジェクトで代替されることはありません。ベースが利用できない場合も、入力が不完全な場合も、PASS とは判定されません。

### ジョブ：`i18n`

完全な i18n 検証マトリクスです（ロケールごとに 1 ジョブ）。ジョブ全体が勧告のみです。

| スクリプト                      | 検証内容                   | ブロッキング                                           |
| ------------------------------- | -------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | ロケールごとの翻訳の完全性 | **勧告のみ**（ジョブ全体に `continue-on-error: true`） |

### ジョブ：`pr-test-policy`

プルリクエストでのみ実行されます。

| スクリプト             | 検証内容                                                                                                                                    | ブロッキング |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する PR に、テストの追加または更新が含まれていること（Hard Rule #8）      | はい         |
| `check:test-masking`   | 変更されたテストファイルで、アサーションの純増減数が減少しておらず、`assert.ok(true)` のような恒真式が追加されていないこと                  | はい         |
| `check:pr-evidence`    | PR 本文に変更に関するテスト／VPS の証跡が記載されていること（PR の文章を grep して Hard Rule #18 を機械化 — 壊れやすいため Backlog を参照） | はい         |

### ジョブ：`test-vitest`

`changes` 分類ジョブが必要です。該当するマトリックスシャードが失敗すると、マージはブロックされます。

| スイート         | 検証内容                                                            | ブロッキング                                                                                                        |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP サーバー（110 ツール）、autoCombo、キャッシュ — vitest ランナー | はい                                                                                                                |
| `test:vitest:ui` | UI コンポーネントテスト — vitest ランナー                           | **ブロッキング** — 既存の失敗は `vitest.config.ts` で明示的に除外されます。新たな失敗が発生するとジョブは失敗します |

### ナイトリーワークフロー（スケジュール実行、参考情報）

これらは cron スケジュール（および `workflow_dispatch`）で実行され、PR では実行されません。すべて参考情報として扱われます。

| ワークフロー           | 検証内容                                                                                                                                                            | ブロッキング |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | ランダムシードと多い実行回数を使用した fast-check プロパティテスト                                                                                                  | **参考情報** |
| `nightly-resilience`   | ヒープ増加ゲート、カオス障害注入、k6 負荷／ソークテスト                                                                                                             | **参考情報** |
| `nightly-llm-security` | promptfoo インジェクションガード（ブロックモード）+ garak プローブ（プロバイダーシークレットがない場合はスキップ）                                                  | **参考情報** |
| `nightly-schemathesis` | `docs/openapi.yaml` を使用し、稼働中の OmniRoute に対して行う OpenAPI コントラクトファジング（schemathesis）— 仕様違反／未処理の 500 エラーを検出（フェーズ 8 B.4） | **参考情報** |
| `nightly-mutation`     | 高速ユニットレーンに対する Stryker ミューテーションテストスコア — 生き残ったミュータントから弱いアサーションを検出                                                  | **参考情報** |
| `nightly-compat`       | サポート対象の `engines.node` 範囲全体にわたる Node エンジン互換性マトリックス                                                                                      | **参考情報** |

パフォーマンスベースライン（ヒープ、TTFB、ビルド時間）は記録されますが、ゲートとしては使用されません。[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）を参照してください。

---

## ベロシティフェーズ（2026-08-30 → v4.0 LTS）：すべてのベースラインを20%緩和

オーナー決定（2026-08-30）：v4.0でのモジュール化までは、技術的負債の水準を維持することよりもリリース速度を優先します。すべての**数値**ラチェットベースラインを、監査可能な1回の処理で20%緩和しました。また、このフェーズは`config/quality/quality-baseline.json`で次のように宣言されています：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 変更内容                                                                                                                                                                                      | 変更箇所                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 小さいほど良いカウントは×1.2、大きいほど良いパーセンテージは÷1.2（カバレッジの下限60は維持、`eslintErrors`は0のまま、`eslintWarnings`は0から固定された抑制数の20%へ変更） | `quality-baseline.json`（`_relax_velocity_2026_08_30`の注記に、変更前 → 変更後をすべて記載）           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                              | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`、すべての`frozen[*]` / `testFrozen[*]`行数上限を×1.2                                                                                                                         | `file-size-baseline.json`                                                                              |
| ファイル単位 / TSコード単位のカウントを×1.2                                                                                                                                                   | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false`の間、`--require-tighten`を勧告扱いに変更                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nightlyの`bank-ratchet-shrinks`を一時停止（測定された縮小分を確定して余裕を取り消してしまうため）                                                                                             | `.github/workflows/nightly-release-green.yml`                                                          |

許可リスト（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json`など）は**予算ではない**ため、変更していません。合否判定を行うポリシーゲート（シークレット、SQLルール、docs/env契約、i18nパリティ、ユニットテスト）にも変更はありません。テストの失敗は、引き続き失敗として扱われます。

**ツール**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 1回限りの緩和処理（`scripts/quality/relax-baselines.mjs`）。同じ注記を指定して2回実行することはできません。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — CIと同じ方法ですべての数値ゲートを測定し、ゲートごとの残りの余裕を出力します（`scripts/quality/baseline-headroom.mjs`）。nightlyの`baseline-headroom`ジョブは、ワークフロー実行サマリーに表を掲載し、JSON/Markdownレポートを`baseline-headroom-<run_id>`としてアップロードして90日間保持します。警告行と重大行は、上限まで10%以内に迫っているゲート、またはすでに上限を超えているゲートを示します。予算消費の早期警告としてこれらのレポートを確認し、該当するゲートの`_rebaseline_*`注記を調査してください。このジョブは、永続的なIssueの作成や更新を行わなくなりました。以前のレポート履歴は#12149に保存されています。

**新規コードモード（Clean-as-You-Code）— 2026-08-30以降、PRの高速パスのみ**

`pull_request`イベントでは、`quality.yml`が`check:file-size`、`check:complexity-ratchets`、`check:dead-code`に`--base-ref <PR base SHA>`を渡します。`check:complexity-ratchets`と`check:dead-code`では、ゲートはPRが変更したファイル**のみ**に限定して、HEADとマージベースを比較します（`scripts/check/newCodeMode.mjs`：マージベースを一時的な`git worktree`に展開し、そこで、およびHEAD上でESLint/knipを実行して、ファイルごとのカウントの差分を取ります）：

- **ブロッキング** — PRが、変更したファイルに循環的複雑度違反、認知的複雑度違反、またはデッドエクスポートを追加した場合（ログ内の`complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=`）。
- **勧告** — グローバル合計と固定されたベースラインとの比較。継承されたドリフトによって無関係な
  PR が赤になることはありません。このドリフトはリリース調整時の修正対象として追跡され、
  headroom ジョブによって監視されます。

`check:file-size`は独自の条件でベース参照を使用します（`scripts/check/check-file-size.mjs`、#8522）。ツリー内のすべてのソースファイルとテストファイルを確認し、`git show`を使用してPRベース時点の各ファイルの行数を読み取ります。そして、ベースライン上限（`frozen` / `testFrozen`、またはベースライン外のファイルの場合は`cap` / `testCap`）とベース時点のサイズのうち、大きい方を超えて増加したファイルのみを失敗とします。したがって、ベース時点ですでにドリフトしていたファイルが、無関係なPRを失敗させることはありません。

`check:boundary:ratchet` は、その単一の数値にも同じルールを適用します
（`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`）。PR イベントでは、
`quality.yml` の高速ゲートと `ci.yml` の lint ジョブの両方が PR のベース SHA を渡し、
ベースコミットは `git archive` のエクスポートから測定されます。また、PR が失敗するのは、
その `open-sse → src` エッジ数が `metrics.boundaryOpenSseToSrc` とベース上のカウントの
大きい方を超えた場合のみです。上限を超えるベースのドリフトは報告されます
（`base drift herdado`）が、無関係な PR を失敗させることはありません。push → main では
絶対上限が維持され、ベース SHA を解決できない場合は、警告付きでその上限にフォールバックします。

`workflow_dispatch` の実行、リリース成功確認の一括チェック、および nightly headroom ジョブには
PR ベースがないため、絶対値（グローバル）比較が維持されます。カバレッジ、重複、および
型カバレッジは、当面グローバルのままです（それらのツールではファイル単位の差分を低コストで
生成できません）。これらは、同じ対応を適用する候補です。

**v4.0 でフェーズを完了する（LTS = 以前より厳格であり、「通常に戻す」わけではない）**

1. 純粋な `release/v4.0.0` の先端で、記録のために `npm run quality:headroom --json` を実行し、その後
   `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`、および各 typecheck ゲートの
   `--update` を実行します。すべてのベースラインが測定値まで引き下げられます。
2. `quality-baseline.json` から `_policy` を削除し（`--require-tighten` と nightly の
   バンキングを再有効化）、`check-openapi-coverage.mjs` の `THRESHOLD = 36`（またはそれ以上）を復元します。
3. モジュール化の効果が得られた箇所では、測定値を超えてさらに厳格化します。file-size の `cap` を
   1000（または 800）に戻し、カバレッジの下限を +5 とし、モジュール化されたパッケージの dead exports を 0 にします。

## ラチェットベースライン (`quality-baseline.json`)

ラチェットエンジン (`scripts/quality/check-quality-ratchet.mjs`) は `quality-baseline.json`
を読み込み、新たに収集された `quality-metrics.json` と比較します。イプシロンを超えて
悪化したメトリクスがある場合、ビルドは失敗します。

現在追跡されているメトリクス:

| メトリクス            | 方向   | 意味                                         |
| --------------------- | ------ | -------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint の警告数が増えてはならない            |
| `coverage.statements` | `up`   | ステートメントカバレッジが低下してはならない |
| `coverage.lines`      | `up`   | 行カバレッジが低下してはならない             |
| `coverage.functions`  | `up`   | 関数カバレッジが低下してはならない           |
| `coverage.branches`   | `up`   | ブランチカバレッジが低下してはならない       |

実際に改善された後でベースラインを更新するには、次を実行します:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` フラグは、現在の測定値を `quality-baseline.json` に書き込みます。
このファイルは、メトリクスを改善した変更と一緒にコミットしてください。メトリクスを
改善してもベースラインを更新していない PR は、`--require-tighten` によって検出されます
（フェーズ 6A.5、実装予定）。

### CodeQL ラチェット: 更新頻度と手動トリガー

`check:codeql-ratchet` は、**スケジュールに従って更新されるリポジトリの状態を読み取ります。PR ごとではありません。**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` は
`state: configured`、`schedule: weekly` を返します。これは GitHub のデフォルトセットアップによるスキャンであり、
push ごとの分析ではありません。そのため、アラートを修正する PR がマージされた後も、次回の
スケジュール済みスキャンが実行されるまでは、ラチェットが古い高い件数を読み取り続けます。その結果、
スキャン結果が追いつくまで、修正 PR 自体のフォローアップを含むすべてのオープンな PR で
リグレッションが報告されます。

**手動更新**: `gh workflow run codeql.yml --ref release/vX.Y.Z` を実行すると、
分析が再実行され、数分以内にアラートが再公開されます。最初に `.github/workflows/codeql.yml`
を読んでください。そのヘッダーでは、GitHub の「デフォルトセットアップ」と競合するため、
`workflow_dispatch` 専用であることが説明されています（`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`）。`push`/`pull_request`/
`schedule` トリガーを復元するには、まず**オーナーによる操作**が必要です: Settings → Code security →
CodeQL: Default → Advanced。この切り替えを行わずに `schedule:` トリガーを追加しないでください。
失敗する実行が生成されるだけです。

**件数が減少したらベースラインを厳格化してください** — `node scripts/check/check-codeql-ratchet.mjs
--update` は、新しい測定件数を `quality-baseline.json` →
`metrics.codeqlAlerts.value` に書き込みます。これにより、ラチェットが以前の上限までのリグレッションを
暗黙に許可することを防ぎます。実例（2026-09-02/03）: PR #12502 で実在する 7 件のアラートを
修正しました（測定されたオープン件数は 13 → 6）。PR #12530 では、それに合わせて固定された
ベースラインを 11 → 6 に厳格化しました。その後、残りの 6 件はアラートごとの根拠を添えて却下され、
オープン件数は 0 になりました。

**却下はオペレーターの判断です（ハードルール #14）** — CodeQL アラートを却下する際は、
必ず却下コメントに技術的な根拠を記録してください。上流プロトコルの要件には `won't fix`、
テストフィクスチャには `used in tests`、CodeQL が認識できないサニタイザーには `false positive`
を使用します（先例: `docs/security/ERROR_SANITIZATION.md`）。

---

## テスト再試行ポリシー (WS5.4, v3.8.49)

再試行はランナー単位で行い、グローバルに一律適用してはなりません。一律の再試行は、実際のリグレッションを見えないフレークへと変えてしまいます。

| ランナー         | ポリシー                                                                                                                                            | 理由                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI でのみ `retries: 1`、および `trace: on-first-retry`                                                                                              | ブラウザーやネットワークのタイミングは実際に非決定的です。トレース付きで1回再試行することで、フレークを診断可能な成果物に変えられます |
| Vitest           | グローバルな再試行は禁止。フレークすることが確認されたテストにのみ、テスト単位の再試行を明示的に設定します（差分に表示され、PR でレビューされます） | 隔離リストを不透明にせず、リポジトリ内に保持します                                                                                    |
| node:test (unit) | 再試行は常に禁止                                                                                                                                    | 不安定なユニットテストはテストのバグです。再実行するのではなく、修正してください                                                      |

フレークのテレメトリが導入された後の目標 SLO (WS5.2/5.3)：テストごとのフレーク率 <1%
（「今すぐ修正」のしきい値）、パイプラインごとの合格率 ≥95%。これらは業界の参考値です。
自分たちの測定結果に基づいて再調整してください。

## リリースレベルのラチェットドリフト (WS5.5, v3.8.49)

PURE リリース先端でラチェット（ファイルサイズ、複雑度、eslint 警告）が悪化した場合、
つまり、マージの組み合わせによって悪化したものの、個々の PR のブランチでは
そのリグレッションを再現できない場合、その修正は**リリースキャプテンが一度だけ、
リリースブランチ上で**行う責任があります。抽出やリファクタリングを優先し、
ベースラインの再設定は、根拠を記録したエントリがある場合にのみ行ってください。
組み合わせによるドリフトをコントリビューターの PR に押し付けてはならず、
PR ごとにベースラインを再設定してもなりません（実際のリグレッションが隠れてしまいます）。
まず原因を切り分けてください。自分の PR が原因だと決めつける前に、検証用 worktree で
純粋な先端に対して失敗を再現してください。

## ラチェット縮小値のバンキング — 下方への方向 (#8584)

ラチェットの自動化は半分しかなく、しかも自動化されているのは間違った側です。
上限の**引き上げ**は10秒で済む手動の JSON 編集であり、失敗している PR のブロックを
解除する最速の方法です。上限の**引き下げ**には、誰かが `--update` を実行して結果を
コミットする必要があります。そして `bank-ratchet-shrinks` ジョブが導入されるまで、
それを実行するワークフローはありませんでした。測定された結果 (2026-07-25)：
18個の frozen ファイルがすでに新規ファイルの800行上限以下であり、最悪のものでは
132倍（`src/shared/validation/schemas.ts` は19行なのに2,523の上限を保持）。
複雑度の上限は約37件のベースライン再設定メモを経て `1794 → 2169` まで上昇し、
低下はちょうど1回（−1）だけでした。また、「次のサイクルで `--update` を使って
厳格化する」と31回記載されたものの、実行されたのは1回だけでした。
その上限の根拠となったコードより長く残り続ける上限は、完了した分割作業のすべてを、
次にそのファイルを編集する人のための増加許容量へと密かに変えてしまいます。

`nightly-release-green.yml` → ジョブ **`bank-ratchet-shrinks`** がこのループを閉じます。

|          |                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------- |
| 実行条件 | `schedule`（1日3回）+ `workflow_dispatch` — 意図的に `push` では**実行しません**                   |
| 測定対象 | 最上位の `release/vX.Y.Z`。`release-green` と同じ解決処理およびインジェクションガードを使用します  |
| 書き込み | `check:file-size --update` および `check:complexity-ratchets --update`（どちらも構造上、縮小のみ） |
| 検証     | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                           |
| 提供方法 | リリースブランチに対する、常に最新の単一 PR — 強制更新され、PR が乱立することはありません          |

バンキングはプッシュごとではなく、まとめて実行されます。これはレイテンシー要件がなく
（縮小が8時間以内にバンキングされれば十分）、マージ作業中にマージごとに実行すると、
PR ブランチが繰り返し再構築され、そのたびに ESLint の完全な走査コストがかかるためです。
検出は引き続き push 時に行われます (`release-green`)。まとめて実行されるのは
バンキングだけです。

### 安全性検証ツール

このジョブは無人でベースラインへ書き込むため、それを許容可能にしているのが
`verify-ratchet-bank.mjs` です。これは `--update` 後のツリーと `HEAD` の差分を取得し、
すべての変更が次のいずれかに該当しない限り、**コミットが作成される前にジョブを中止**
します。その場合、PR は作成されません。

- `frozen` / `testFrozen` の数値エントリが**引き下げられた**、または**削除された**
- `complexity-baseline.json` → `count` が**引き下げられた**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` が**引き下げられた**

それ以外はすべて失敗となります。数値の引き上げ、エントリの追加、`cap`/`testCap` の変更、
または `_rebaseline_*` メモの削除や書き換えは禁止です（これらのメモは各上限が存在する
理由を示す監査証跡であり、ファイルエントリと同じ `frozen` オブジェクト内に保存されます）。
上限を引き上げられるボットは、現状より確実に悪いものとなります。
リグレッションガード：`tests/unit/verify-ratchet-bank.test.ts`。

このジョブが `release/*` にプッシュすることはありません。PR は人間がマージするため、
誤った測定結果がレビューなしで取り込まれることはありません。

## 許可リストポリシー

既存の違反によって失敗しないようにする必要があるすべてのゲートでは、固定された許可リスト
（例: `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）を使用します。ポリシーは次のとおりです。

**根本原因を修正してください。許可リストは、違反が既存のものであり、
同じ PR 内で修正できない場合にのみ使用してください。**

許可リストにエントリを追加する場合:

1. 正当な理由を示すコメントを含めてください。
2. 追跡用 Issue を参照してください（例: `// #3498 — Phase 2 feature, not yet implemented`）。
3. 違反を修正するのと同じ PR でエントリを削除してください。アクティブな違反を抑制しなくなった古いエントリは、それ自体が不具合です（6A.3 の古い強制ルールが実装されると、孤立した許可リストエントリによって
   ゲートが失敗します）。

テストを早く通過させる目的で、許可リストにエントリを追加しては**なりません**。許可リストが増え続けているにもかかわらず
ゲートが成功している状態は、品質に対する誤った安心感を与えます。

### PR でゲートが失敗した場合

1. **ゲートの出力を注意深く確認してください** — ルールに違反したファイルまたはシンボルが正確に示されています。
2. **違反を修正してください** — ほとんどのゲートは決定論的なファイルシステムチェックであり、コードが正しくなればすぐに成功します。
3. **違反が既存のものである場合**（つまり、自分が導入したものではないが、ゲートの対象に新たに含まれた場合）: 正当な理由を示すコメントと追跡用 Issue を添えて、許可リストにエントリを追加してください。
4. **ゲートがラチェット方式の場合**（カバレッジ、ESLint の警告、重複、複雑度）:
   変更によって指標が悪化しています。根本的な問題を修正するか、変更が意図的で指標の悪化を許容できる場合に限り、まれな措置として
   `npm run quality:ratchet -- --update` を実行してください。ただし、その理由を PR の説明に記載してください。
5. **アドバイザリゲート**（`continue-on-error: true`）は情報提供を目的としたものであり、マージをブロックしませんが、
   CI のサマリーには表示されます。それでも修正してください。

---

## 新しいゲートの追加

1. `scripts/check/check-<name>.mjs`（または `.ts`）を作成します。ポリシーゲートは終了コード 0/1 で終了します。
   ラチェット方式のゲートは、`collect-metrics.mjs` を介して `quality-metrics.json` にメトリクスを出力します。
2. `"check:<name>": "node scripts/check/check-<name>.mjs"` を `package.json` に追加し、
   エイリアスとその正確なコマンドを `config/quality/gate-manifest.json` で同期します。
   既存の検証エイリアスを変更または削除する場合も、同様に同期してください。
   `npm run check:gate-manifest` を実行します。pre-commit フックと CI の変更分類によって、
   この規約が適用されます。
3. `.github/workflows/ci.yml` の適切なジョブ配下に組み込みます
   （ポリシー → `lint` または `docs-sync-strict`、ラチェット → `quality-gate`）。
4. 許可リストがある場合は、古いエントリが自動的に検出されるように、
   `scripts/check/lib/allowlist.mjs` の `reportStaleEntries()` を適用します。
5. ゲートの検出ロジックをカバーするテストを `tests/unit/build/` に記述します。
6. このドキュメントを更新します（該当するジョブの表に行を追加します）。

---

## エージェントツール: LSP-in-the-loop（オプトイン）

CI ゲートに加えて、OmniRoute には**オプトイン**の `agent-lsp` スキャフォールド
（プロジェクトレベルの `.mcp.json`、Fase 7 Task 15）が含まれています。`.mcp.json`
を作成して TypeScript 言語サーバーをコーディングエージェントに公開することで、エージェントがコードを記述する**前に**シンボルや診断情報を解決できるようにします。これは、発生源で「存在しないシンボルを捏造する」エラーを減らす、`typecheck:core` のコンパイル前提の主張を補完する仕組みです。これは意図的に自動読み込みされません（MCP↔LSP ブリッジは利用者が選択して検証します）。壊れたエントリがあっても接続エラーがログに記録されるだけで、セッションが中断されることはありません。

---

## 合理化バックログ（ROIレビュー — フェーズ9 ウェーブ3）

このインベントリは、2026-06-17に`ci.yml`と照合されました（以前のバージョンでは
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`が漏れていました）。照合済みセットのROIレビューにより、
以下の合理化候補が特定されました。**統合は機械的なCI変更ですが、
切り替え／削除はオペレーターに委ねられるポリシー判断です。** 以下の内容はまだ
適用されていません。

**上記で文書化されていないもの**（アドバイザリ、シグナルが弱い）：`docs-lint`ジョブ
（markdownlint + Vale、ジョブ全体が`continue-on-error`）および独立したスキャナーワークフロー
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`semgrepFindings: 0`は
`quality-baseline.json`にありますが、`ci.yml`内のブロッキング・ラチェットには接続されていません。このメトリクスは
現在孤立しています。

### 統合／重複排除（機械的、低リスク）

各候補は、2026-06-17時点の稼働中のゲート状態に対して検証されました（信頼しつつ検証）。
一見「明白」な統合のいくつかは、実際には負債を隠していることが判明し、**そのまま置き換えられるものではありません**。

- **`check:docs-sync`が2回実行される** — `lint`ジョブ内で単独実行され、さらに`check:docs-all`（`docs-sync-strict`）内およびhuskyのpre-commitフックでも実行されていました。✅ **完了** — 単独の`lint`実行を削除しました。
- **CVEスキャン** — ❌ **単純には統合できません。** `audit:deps`は5つすべてのロックファイルについて、重大なアドバイザリと不完全な監査をブロックする一方、現在のポリシーでは高レベルのアドバイザリを警告として報告します。`check:vuln-ratchet`（osv）は、チェックイン済みベースラインからの_悪化_があった場合にのみ失敗し、必須の場合には測定値の欠落を拒否します。セマンティクスが異なるため、`audit:deps`を削除すると、絶対的な重大度ゲートと独立したパッケージ監査の証跡が失われます。両方を維持してください。
- **循環依存の検出** — ✅ **完了**（#15159 G-01/G-02）。ここにあった旧テキストでは、`check:cycles`を「グリーンで厳選された」ゲートと呼び、`check:circular-deps`（dpdm）が91件の循環を報告していたため、ブロッキングのまま維持することを正当化していました。しかし、そのグリーンは**偽のグリーン**でした。`check:cycles`は5つのサブディレクトリ（450ファイル）をスキャンし、静的な`import|export … from`のみに一致し、すべての`@/`および`@omniroute/open-sse/`指定子を除外していたため、リポジトリの大半を占めていた動的import + エイリアスの循環を検出できませんでした。修正後、ゲートは`src` + `open-sse`（5023ファイル）を走査し、TypeScript ASTから指定子を収集し（そのため`import("…")`はカウントされますが、型位置の`typeof import("…")`はカウントされません）、tsconfigの`paths`を解決するようになりました。検出される循環は0件ではなく**14件**です。既存の14件の循環をゲートPR内で修正することはできないため、`check:cycles`は現在**ラチェット**になっています（`--ratchet`、`quality-baseline.json`内の上限は`metrics.cycles.value = 14`、`direction: down`）。あらゆる_悪化_をブロックし、件数は減少しかできません。CIでは`npm run check:cycles:ratchet`を実行します。段階的な削減は**A-01**とともに進めます。`check:circular-deps`（dpdm）は、より広範なセカンドオピニオンとしてアドバイザリのまま維持します。
- **複雑度** — ✅ **完了**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：ESLintを1回走査し、ruleId別にカウントすることで、循環的複雑度 + 最大行数と認知的複雑度のベースラインを独立したまま維持します。個別の`check:complexity` / `check:cognitive-complexity`は、ローカルでの`--update`用に維持します。
- **`/api`の幻覚防止** — ✅ **完了**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：`src/app/api`のファイルシステムインベントリを1回実行し、openapi-routes + docs-symbolsは引き続き個別に報告します。個別のチェックはローカル実行用に維持します。
- **`check:node-runtime`が11ジョブで実行される** — ⚠️ **ROIは低いです。** それぞれが別々のランナーであり、チェックは1秒未満です。安価なジョブ単位のガードを失う代償に対し、合計の節約時間は約10秒です。変更に伴う混乱に見合いません。
- **CI lintでの`typecheck:noimplicit:core`** — ✅ **lintジョブから削除済み**（以前はアドバイザリの`continue-on-error`でした）。ブロッキング型サーフェスは`typecheck:core` + `check:type-coverage`です。ローカルスクリプトは維持します。

### 切り替え／決定（オペレーターポリシー）

- `check:openapi-security-tiers`（アドバイザリ）— ❌ **そのままでは切り替えられません。** 終了コードは0ですが、`LOCAL_ONLY_API_PREFIXES`配下の複数の`traffic-inspector`ルートに`x-loopback-only: true`アノテーションがないという警告が出ます。強制するには、まずそれらのアノテーションを`openapi.yaml`に追加する必要があります。
- `typecheck:noimplicit:core`（アドバイザリ）— ブロッキングの`check:type-coverage`ラチェットによってほぼ包含されています。ラチェットに切り替えるか、冗長な2回目の`tsc`パスを削除してください。
- `test:vitest:ui`（現在は**ブロッキング**）— 既存の失敗は`vitest.config.ts`内で`// #8618`追跡コメントとともに明示的に除外されています。新たな失敗が発生するとジョブは失敗します。
- `check:secrets`（gitleaks、ブロッキング・ラチェット）— 現在の上限は`quality-baseline.json`内の`metrics.secretFindings`です。例外には、正当な理由のある`.gitleaks.toml`エントリが必要です。測定不能な場合はINCOMPLETEとなります。このスキャンは、GitHubネイティブのシークレットスキャンおよび`check:public-creds`を補完します。
- `check:pr-evidence`（ブロッキング、PR本文の文章をgrep）— 誤検知のリスクが高く、削除するとハードルール#18の強制力が弱まるため、これは実質的なポリシー判断です。
- `semgrep`（独立したアドバイザリ）— OWASP系の検出範囲がCodeQLと重複しています。ベースラインをラチェットに接続するか、削除してください。

---

## 関連ドキュメント

- サプライチェーン（provenance、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — キーセット同等性ゲート

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`、ジョブ `i18n-ui-coverage`）。
すべての `src/i18n/messages/<locale>.json` のリーフキーセットを `en.json` と比較し、
キーが追加された時期にかかわらず、欠落または余分なリーフがあれば失敗します。`__MISSING__:`
プレースホルダーは存在するものとして数えられます（その内容は比率ゲートの管轄です）。
これは、差分ベース／パーセンテージベースの2つのゲートを絶対的に補完するものです。
`check-ui-keys-coverage` はロケールごとに 80 % の下限を適用します（約13,000キー中43キーが
欠落していても 99.7 % と表示されます）。一方、`check-new-key-coverage` はPRが
`en.json` に追加したキーだけを判定します。ロケールバッチは、ブランチを切った日の
`en.json` から生成され、ベース側でキーが追加され続けている間も数日かけて翻訳されます。
バッチPR自体はキーを追加しないため、バッチ1（#13044）が9ロケールで43キー不足のまま、
バッチ2（#13660）が8ロケールで10キー不足のままマージされた際（2026-09-15）、
いずれの兄弟ゲートも何も報告しませんでした。失敗を修正するには、
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` を使用してください。
`extra` リーフはソース側でそのキーが削除されたことを意味するため、ロケール側からも
削除してください。`--warn` を指定すると、失敗させずに報告します。
`--catalog=cli` は `bin/cli/locales` に対して同じ比較を実行します
（`npm run i18n:check-keys:cli`）。どちらのステップもジョブ `i18n-ui-coverage` に含まれます。

#### `check-new-key-coverage` — 新規キーのi18nゲート

`check-ui-value-drift` の兄弟ゲートです。後者は、英語の値が**書き換えられた**にもかかわらず
翻訳が更新されていない場合を検出し、こちらは英語のキーが**追加された**にもかかわらず、
一部のロケールに追加されなかった場合を検出します。

`check-ui-keys-coverage` ではこの種の問題を検出できません。これはロケールごとに
パーセンテージの下限を適用するため、約13,000個のリーフのうち11キーが欠落していても、
カバレッジは 99.9% のままです。言語ごとのパーセンテージでは「この機能が未翻訳のまま
リリースされた」ことを表現できません。ある機能全体が新しいロケールにテキストなしで
追加されても、数値がまったく変化しない可能性があります。

このゲートが記録しているインシデントは次のとおりです。Orchestration Canvasのフェーズ3では、
当時存在していた42ロケールすべてに11個のキーが翻訳されました。その数時間後、
EU言語バッチ（#13044）によってリポジトリのロケール数が51に増えましたが、
新たに加わった9ロケール（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）には
それらのキーが追加されませんでした。`deepMergeFallback` は欠落したキーを英語で補完するため、
障害の現れ方は空のUIではなく未翻訳のUIでした。これは実際の問題でありながら、
仕組み上、検出されませんでした。

兄弟ゲートと同様に、これは**差分を認識**し、マージベース時点の英語と作業ツリーを
比較します。そのため、既存の欠落はそのまま固定され、このゲートを有効化するための
移行は不要でした。

**`__MISSING__:<english>` マーカーでは条件を満たしません（2026-09-17以降）。**
以前は、ランタイムが正しい英語へフォールバックするため、文書化された延期手段として
扱われていました。しかし、2026-09-16に8件の機能PRが61個のキーを追加し、翻訳する代わりに
65ロケールすべてへマーカーを一括設定しました。このゲートはそのすべてを受け入れ、
PRをブロックするものはなく、その後、実翻訳率をブロッキング判定するゲートが
リリース先端で全員に対して失敗しました（pt-BR 3.2 % > 2.5 % + 0.5）。
現在、マーカーは翻訳の欠落として判定されます。失敗を修正するには、
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
を使用するか、`npm run i18n:translate-new-keys`
（`scripts/i18n/translate-new-keys.sh`、デタッチ状態でも安全で、
`OMNIROUTE_TRANSLATION_*` 環境変数がない場合は起動を拒否します）を使用して、
すべてのロケールを並列処理してください。英語のままにする必要があるキー
（固定された製品名、エンジン名、フラグ名）は、マーカーの背後に置くのではなく、
`scripts/i18n/untranslatable-keys.json` に登録してください。`vi` ではマーカーが
全面的に禁止されています（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 保留テストゲート

`vitest.config.ts` の `exclude` リストに含まれるファイルは実行されないテストですが、
ツリーを読む人にはカバレッジがあるように見えます。62個のファイルが
`// #8618 — pre-existing failure; remove this exclusion when fixed` というコメントの背後に
蓄積されました。Issue #8618 は2026-08-11にクローズされましたが、そのIssueが追跡していた
リストは45エントリから62エントリに増え、新しい各エントリは終了済みIssueを指すコメントを
引き継いでいました。このリストを最終的にファイル単位で測定したところ（#13204）、
**62個中51個が、ソースを変更しなくても現在のツリーに対して成功しました**。

このゲートでは、実在するファイルとして解決されるすべての除外項目について、
（a）追跡Issueを指定し、（b）測定済みステータスとともに
`config/quality/vitest-exclusions.json` に記載することを必須とします。これにより、
除外項目の追加は、60エントリある配列にもう1行を足すだけではなく、専用ファイル上で
レビュー可能な差分になります。このゲートは意図的に除外対象テストを再実行しません。
それには約10分かかり、定期ジョブで行うべきだからです。インベントリには、
各テストが最後に測定された日時が記録されます。
