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

## ゲートインベントリと実行プロファイル

### 候補者の入学

CIおよび Quality Gates ワークフローはそれぞれ、安定した判定`Gate / CI`および`Gate / Quality`を発行します。バージョン管理されたアドミッション ポリシーでは、必須または勧告に応じてすべてのアップストリーム ジョブを列挙します。該当する必須ジョブは成功する必要があります。欠落、キャンセル、スキップ、保留中、および不明な結果の場合は、 PASSを確立できません。有効なドキュメントのみまたはカタログのみの分類により、コード レーンが適用されなくなる場合があります。ドラフトPRは承認された候補者ではありません。 `hotfix`ラベルは証拠を放棄しません。

どちらのワークフローも、 PRsからmain/releaseブランチへの変換、 `main`へのプッシュ、手動ディスパッチ、およびグループのマージ イベントをカバーします。プッシュ、ディスパッチ、およびマージグループは、選択全体を実行します。 `release/**`にプッシュしても開始されません (2026-10-18): 各変更はすでにそのPR上でマトリックスを実行しており、マージされた組み合わせは Release-Green の仕事です (`docs/ops/RUNNER_BOX.md` →ホスト レーン)。フォークおよびマージ グループは、そうでない場合は自己ホスト ランナーを選択するジョブにホスト ランナーを使用します。展開前に十分なホスト容量を検証する必要があります。

通常のPR高速選択を実行します。アドミッション ポリシーの`full-code`および`full-code-e2e`レーン (E2E、統合、パッケージ アーティファクト、 Electronスモーク、 Bun SQLite、エコシステムおよびプロトコル クライアント) は、 Mergify キュー ドラフトまたはフル実行 ( `gh workflow run ci.yml --ref <branch>`) でのみ実行されます。

各JSON受領書は、チェックアウトされたSHA、ワークフローの実行および試行を識別します。 CLI 、 checkout/event SHA不一致を拒否します。ワークフロー テストは、ポリシー メンバーシップを判定ジョブの`needs`リストにバインドするため、新規または削除されたレーンが黙って消えることはありません。領収書は独自のワークフローをカバーしており、公開、展開、または既存のアドバイザリー スキャナーの内部はカバーしていません。ブランチ ルールで両方のチェック名をアクティブにすることは、別個の管理上の変更です。これらのジョブを追加すること自体はブランチを保護しません。

### キューをマージする

> **2026-11-19: Mergify のマージキューを廃止しました**（オーナーの判断）。`.mergify.yml` はキューを定義せず、プルリクエストをマージまたは書き換える Mergify のコマンドを拒否します。omni-queue が live モードで動作するまでは、リリースブランチへのプルリクエストをリポジトリのルールセット「Require green gates on the active release」（`Gate / CI` + `Gate / Quality`）に従って手動でマージします。その後は omni-queue を通じてマージします（[OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)）。以下で説明する Mergify のドラフトを処理するワークフローは `ci.yml` と `quality.yml` に残っていますが、Mergify のドラフトは作成されなくなりました。

`queue`ラベルは、 PR Mergify キュー (`.mergify.yml`) に送信します。 Mergify は`mergify/merge-queue/`ブランチ上でドラフトPRを開き、 CIそこで完全な選択を実行し、 `Gate / CI`、 `Gate / Quality` 、 `Merge integrity (changelog + generated skills)`が通過すると元のPRがマージされます。

Mergify はキューの概要をドラフトの説明に書き込み、他のアプリもそれを編集できます。このようなドラフトの`pull_request` `edited`イベントは独自の同時実行グループ (`-queue-edit-<run_id>`) を使用するため、ドラフトの実際の実行をキャンセルできず、ゲートとマトリックスをスキップします。 `Merge integrity`だけがまだ実行されます。 Mergify はスキップされた`Gate / CI`失敗したチェックとして読み取り、 PRデキューするため、スキップされたゲート ジョブには別のチェック名が付けられます。

デキュー後、プッシュによってPR再キューされるとは限りません。 `@mergifyio queue`にコメントしてください。

### 受諾リデューサーに証拠が保持されている

`scripts/quality/validate-release-acceptance.mjs`提供されたプランとそのマニフェストを削減します。この計画が完全なリリース パイプラインをカバーしているかどうかは確立されていません。そのレポートでは、プランが`VERIFIED`である場合でも、明示的に`releaseAcceptance: false`が設定されます。 `release-acceptance.yml`ワークフローでは、実際のビルド、パッケージ、ブート、またはプロモーションのレシートではなく、シャドウ フィクスチャが引き続き使用されます。

CLI `--evidence-root`保持された証拠を検証することを要求します。ファイルは`<evidence-root>/<artifact_id>/<member>`として解決され、 SHA-256としてハッシュされます。証拠のないPASSレコード、欠落または変更されたファイル、安全でないパスまたはシンボリックリンクがあると、検証が妨げられます。欠落しているファイルは、空の成功ログと同等ではありません。既存のSHA/run/attemptチェックは独立したままです。一致するバイトによって古いレシートを救済することはできません。ファイルの整合性は、実行の信頼性やアーティファクトのプロモーションの証拠ではありません。

### 静的スキャン インベントリ

バージョン管理された npm-alias インベントリと静的スキャン メンバーシップは`config/quality/gate-manifest.json`に存在します。 `npm run check:gate-manifest`実行して、スクリプト名と正確なコマンドを`package.json`に対して検証します。追加、削除、およびコマンド ドリフトは、ローカル フックとCIの分類変更ジョブの両方で失敗します。エイリアスは、ワークフロー ジョブ、マトリックス インスタンス、またはテスト ケースではありません。これらのカウントを交換可能として表現してはなりません。

`npm run quality:scan -- --list`または`npm run quality:scan:fast -- --list`を使用して、選択したエイリアスを実行せずに検査します。ランナーは npm エントリポイントを呼び出すため、そのランタイム (構成されているBunを含む) が保持されます。マニフェストには、これらのプロファイルの外部にあるエイリアスが個別に呼び出されたものとして記録され、読み取り専用スキャン プロファイルではメンテナンス コマンドが禁止されています。

これらのプロファイルは静的スキャンのみをカバーします。これらは、製品テスト、適用範囲、パッケージング、外部チェック、または候補者の完全なリリースの受け入れを認証するものではありません。ワークフローアドミッションでは、リンクされた`config/quality/admission-policy.json`および`scripts/quality/admission-verdict.mjs`を使用します。リリースオブザーバープロファイルは分離されたままです。該当する小切手と領収書を個別に検査します。 `audit:deps`、突然変異テストの選択、および変換チェックを含む、完全なオブザーバーの静的コマンドは`config/quality/release-green-static-profile.json`で宣言されます。ローダーは、 package.jsonおよびモデル化されたCI/Quality宣言に対して npm コマンドを検証します。シェルトークンを引数として実行するのではなく、ドリフトを拒否します。必要なスキャナーSKIP/INCOMPLETE出力はPASSを確立できません。プロファイルはその外部除外を記録し、ホストされたカバレッジ、テスト マトリックス、パッケージまたは展開の証拠を置き換えるものではありません。以下の散文目録は参考資料であり、ゲートが実際に稼働したことを証明するものではありません。

スクリプトは`scripts/check/` (ポリシー ゲート) および`scripts/quality/` (ラチェット エンジン) の下に存在します。 CIの信頼できる情報源は`.github/workflows/ci.yml`です。

### PR高速パス (`quality.yml`) をリリースする

`.github/workflows/quality.yml` は、main/release PR、`main` への push、ディスパッチ、
merge group において CI を補完します。PR ではパスフィルター済みの高速チェックを使用します。
恒久的に無効化されていた重複ビルドは削除され、実際のビルド、パッケージ、起動チェックは
CI に残っています。ユニットスイートと vitest は CI（`Unit Tests (N/8)` と `Vitest`）
でのみ実行されます。

| ジョブ                                           | スコープ                                                                                                                  | ブロッキング         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | ドキュメント/コード PR、API ドキュメント参照、docs-all                                                                    | はい                 |
| `Fast Quality Gates`                             | コード PR、静的チェック、型チェック、ダッシュボードの型チェック、影響を受けるユニットテスト、忘れられた兄弟テスト（助言） |
| `No new ESLint warnings`                         | コード PR、抑制を考慮した lint ガード                                                                                     | フォークを含めてはい |
| `Merge integrity (changelog + generated skills)` | 非ドラフト PR、変更履歴と生成されたスキルの同期                                                                           | フォークを含めてはい |

#### 忘れられた兄弟テストのレポート

`npm run check:forgotten-sibling-tests` `Fast Quality Gates`のアドバイザリー ステップとして実行され、テスト影響マップの背後でインポート リゾルバーを再利用します。変更されたすべての運用モジュールについて、プル リクエストの差分に候補テストが存在しない場合、決定論的な`changed module/symbol -> static consumer -> candidate sibling test`チェーンが報告されます。マークダウンの概要とJSONの結果は、ブロッキング ロールアウト前の調整のために`forgotten-sibling-tests`ワークフロー アーティファクトとして保持されます。

バレルの再エクスポートと動的インポートは、解決策の診断のみを目的としています。妨げとなる所見を作成することはありません。レビューされた例外は`config/quality/forgotten-sibling-allowlist.json`にあります。各エントリでは、コンシューマおよび候補テストの名前を指定し、具体的な根拠を示し、 GitHub issue または pull request にリンクする必要があります。不正なエントリはフェールクローズされます。例外では、削除された候補テストや`.skip`/`.todo`を追加する diff を抑制することはできません。アサーション弱化およびその他のマスキングは、独立してブロックする`check:test-masking`ゲートによって所有されたままになります。

### ジョブ: `lint`

すべてのPRから`main`で実行されます。ブロックは失敗時にマージされます。

| スクリプト (`npm run ...`)        | 検証します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ブロッキング                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js のバージョンがサポート対象範囲内であること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                    |
| `check:cycles`                    | `src/` + `open-sse/` 全体にわたる循環インポート（AST ベース、tsconfig の `paths` を解決）。循環が存在する場合、Bare は常に終了コード 1 で終了し（#15281 以降のフェイルクローズ）、SCC を一覧表示します。`check:cycles:ratchet`（CI で実行されるもの）は、`quality-baseline.json` の `metrics.cycles` 上限を件数が超えた場合にブロックします — 現在は 14、`direction: down` なので減少のみ可能です（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい（ラチェット）                      |
| `check:boundary`                  | `open-sse → src` の結合: エンジンからアプリへのファイル間の一意なインポート（`scripts/quality/measure-boundary.mjs`；エッジ一覧は v4 コア／モジュール分割の是正バックログです）。Bare はアドバイザリーレポートを出力します（`quality:boundary` と同じ）。`check:boundary:ratchet`（CI で実行されるもの。`quality.yml` の fast-gates ラチェットループにも含まれます）は、`quality-baseline.json` の `metrics.boundaryOpenSseToSrc` 上限を件数が超えた場合にブロックします — 実測値 771 で初期設定され、`direction: down` です。`--update` では値を下げることのみ可能です。PR ではベース相対となります（`--base-ref`、下記参照）                                                                                                                                                                                                                                                                                                                                                                                  | はい（ラチェット）                      |
| `check:route-validation:t06`      | すべてのルートに Zod スキーマが存在すること（Tier 6 ポリシー）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` の数が予算を超えない（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:provider-consistency`      | `providers.ts` 内のすべてのプロバイダーに、`providerRegistry.ts` 内の対応するエントリが存在する（また、その逆も許可リストの範囲内で成立する）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | はい                                    |
| `check:model-lifecycle`           | 手動管理されている3つのルーティングテーブルが、チェックイン済みのライフサイクルスナップショット（#11503）と整合していることを確認する：`FITNESS_TABLE`（`taskFitness.ts`）が、`REGISTRY` でルーティング可能な引退済み ID をスコアリングしないこと、すべての `BUILT_IN_ALIASES` のターゲットが `REGISTRY` に存在し、引退済み ID のスナップショットには存在しないこと、`REGISTRY` に残っているすべての引退済み ID が転送されるか `allowedRetiredInCatalog` に列挙されていること、そして `DEFAULT_DEGRADATION_MAP` のソースまたはターゲットがそのスナップショットで引退済みになっていないこと。これは、モデルが現在稼働中のアップストリームによって提供されていることを証明するものではない。オフラインで実行される — `npm run quality:refresh-model-lifecycle`（ネットワークが必要。CI には組み込まれていない）で手動更新される `config/quality/model-lifecycle.json` と比較する。`allowedRetiredInCatalog` は解消状況を段階的に追跡するためのラチェットであり、追跡用 issue がある場合にのみエントリを追加する。 | はい                                    |
| `check:fetch-targets`             | クライアント側の `src/` にあるすべての `fetch("/api/...")` が、実在する `route.ts` に解決される                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                    |
| `check:deps`                      | リポジトリ内のすべての `package.json` に含まれる、`npm install` 可能な依存関係が `dependency-allowlist.json` に登録されていること。新しいバージョン固定なしのパッケージや、名前を詐称したパッケージが検出された場合はフラグを立てる                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                    |
| `audit:deps`                      | 5つすべての独立したロックファイル（ルート、Electron、OpenCode plugins v1/v2、provider）に対する npm audit。重大なアドバイザリはブロックし、高い重要度のアドバイザリは引き続き警告として表示する。監査が存在しない場合や失敗した場合は INCOMPLETE となり、ブロックする。スコープごとのロックハッシュとレポートは保持される。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                    |
| `check:lockfile`                  | `package-lock.json` の整合性 — https レジストリ、integrity ハッシュ、ホストの上書きなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                    |
| `check:licenses`                  | 本番依存関係に対する SPDX ライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:tracked-artifacts`         | ビルド成果物やコミット済みの `node_modules` シンボリックリンクがないこと（husky の pre-commit でも実行；pre-push は意図的に軽量 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                    |
| `check:ai-attribution`            | PR のコミット、タイトル、本文に AI/bot の `Co-Authored-By` トレーラーや AI 生成フッターがないこと — ハードルール #16（PR→`release/**` 向けの `quality.yml` fast-gates ループ内 — イベントペイロードを読み取り、PR 以外では何もしない — および PR→`main` 向けの `ci.yml` lint における PR 専用ステップ；さらに husky の `commit-msg` フック；人間の共同作成者は許可；#14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | すべての Vitest 除外項目が追跡用 issue を指定し、`config/quality/vitest-exclusions.json` に記載されていること（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                    |
| `check:file-size`                 | ソースファイル（`src/`、`open-sse/`、`electron/`、`bin/` 内の `.ts`/`.tsx`）が `cap` 以内、テストファイル（`*.test.ts(x)`）が `testCap` 以内に収まること；`file-size-baseline.json` で凍結されたファイル（`frozen` / `testFrozen`）は、記録されたサイズを超えて増大してはならない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:error-helper`              | executors/handlers のエラーレスポンスでは、`buildErrorBody()` / `sanitizeErrorMessage()` を使用する（ハードルール #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                    |
| `check:migration-numbering`       | 移行ファイル名: 古い`001`–`241`シリーズは凍結され、新しいファイルは`YYYYMMDDHHMMSS_<description>.sql`です。 PRベースに対して、削除された移行、互換性エントリのない名前変更された移行、および最終スキーマが互換性のない順序が乱れているか編集された移行は拒否されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:public-creds`              | `publicCreds.ts` の外部に、リテラルの OAuth `client_id`/`client_secret` や Firebase Web キーが存在しない（ハードルール #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | はい                                    |
| `check:db-rules`                  | `src/lib/db/` モジュールの外部に生の SQL が存在しない。`localDb.ts` からのバレルインポートも存在しない（ハードルール #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | はい                                    |
| `check:known-symbols`             | ディスパッチテーブルに登録されたプロバイダーエグゼキューター、ルーティング戦略、トランスレーターがディスク上のファイルと一致しており、孤立したシンボルや未宣言のシンボルがない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートが `isLocalOnlyPath()` によって分類されている（ハードルール #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                    |
| `check:test-discovery`            | リポジトリ内のすべての `*.test.ts` / `*.spec.ts` ファイルが、少なくとも 1 つのテストランナーによって収集される（ラチェット: `test-discovery-baseline.json` 内の孤立リストは縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                    |
| `check:test-tla-order`            | `tests/unit` 配下の `node:test` ファイルでは、テストを登録し、トップレベルの `await` に到達した後で、さらにテストを登録してはならない（#18045; ラチェット: `test-tla-order-allowlist.json` は縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                    |
| `check:agent-skills-sync`         | 生成されたエージェント スキル アーティファクトは、ソース カタログと一致します (ドリフトはありません)。リリースモードではすべてのスキルをチェックします。機能PR (`pr`モード) は、生成されたテキストを編集するスキルのみをチェックします。 — [「生成されたファイルと派生ベースライン」](#generated-files-and-derived-baselines-written-at-release)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | プロバイダーのロゴ/アセットに、記録されたプロヴェナンスエントリが付与されている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON 設定ファイルが解析可能で、リポジトリの lint ルールを満たしている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | エラーなしで TypeScript をコンパイルできる（警告は助言目的のみ）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                    |
| `typecheck:noimplicit:core`       | 厳格な `noImplicitAny` — 将来を見据えた設定。既存の多くの呼び出し箇所では、まだ型注釈が必要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **助言的**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` に対象を限定した `tsc`（#7033） — `typecheck:core` の厳選された27ファイルの許可リストにはダッシュボードの TSX が1つも含まれておらず、`next build` も型チェックを行わない（`next.config.mjs` で `ignoreBuildErrors: true` が設定されている）ため、そこで発生した孤立した識別子のリグレッション（#6625/#6909）が CI から見えない状態だった。凍結されたファイル別・TS コード別の件数ベースライン（`config/quality/dashboard-typecheck-baseline.json`、`check:known-symbols` と同じ古い状態を許容する適用パターン）との差分を検査し、ベースラインの件数を超える新しいエラーだけでゲートを失敗させる。既存のエラーを修正した場合は `--update` でラチェットを下げる。                                                                                                                                                                                                                                                                                                                        | はい                                    |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`) を介したアプリ全体の運用タイプ チェック、surface `typecheck:core`の 27 ファイルの許可リスト、およびダッシュボード ゲートはカバーされません。 `config/quality/build-typecheck-baseline.json`との差分。 (ファイル、コード) ごとの新しいカウントまたは増加したカウントは失敗し、カウントが低い場合はラチェットする必要があります。 `--update` 、実行に新しいペアまたは発生したペアが含まれている間は`--force-regressions`が渡されない限り拒否し、新しくサイレント化されたファイルは`--force-nocheck`が渡されない限り拒否します。そのため、ベースラインを広げて緑色にすることと、永続的なサイレンスを許可することは、2 つの別個の意図的な行為です。裸の`--force`は拒否されます。また、 `config/quality/ts-nocheck-baseline.json`に対して`@ts-nocheck`のビルド スコープをスキャンします。これを使用するファイルは診断をまったく報告せず、そうでない場合はすべてのゲートから見えなくなるためです。                 | はい                                    |

#### 2 つの型チェック プログラムの答えが異なる

`typecheck:core`と`check:build-typecheck` 、異なるオプションで異なるプログラムをコンパイルします。同じファイルでも、一方ではクリーンでも、もう一方ではエラーが発生する可能性があります。

`tsconfig.build.json` `"strict": false`を設定するため、 `noImplicitAny`はオフになります。コア構成は、より厳密なオプションを使用して厳選された 27 ファイルの許可リストをコンパイルし、各エントリのインポート グラフに従います。そのため、ビルド プログラムに表示されないファイルもそこでチェックされます。

ファイルがタイプされたかどうかを判断する場合、結果が重要になります。** `check:build-typecheck`でのゼロ診断はゼロを意味するわけではありません**。 26 個のファイルから`@ts-nocheck`削除すると、ビルド プログラムではそのうち 23 個がクリーンであることがわかりました。そのうち 16 件では、約 120 件の暗黙的なエラー (厳密なエラー) が表面化しました。ファイルをクリーンと呼ぶ前に両方をチェックしてください。

### ジョブ: `quality-gate`

`test-coverage`の後に実行されます。ブロックは失敗時にマージされます。

| スクリプト                   | 検証します                                                                                                                                                                  | ブロッキング             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json`を出力します (ESLint警告数、マージされたシャード レポートからのカバレッジ)                                                                            | あり（ラチェットの上流） |
| `quality:ratchet`            | `quality-baseline.json`の各メトリクスは後退していません (ESLint警告≤ベースライン、カバレッジ≥ベースライン)                                                                  | はい                     |
| `check:duplication`          | コードの重複 (jscpd@4) は`quality-baseline.json`のベースラインを超えません                                                                                                  | はい                     |
| `check:complexity`           | ファイルレベルの循環的複雑度は上限を超えません (コアESLint `complexity` + `max-lines-per-function`)                                                                         | はい                     |
| `check:cognitive-complexity` | 認知複雑性ラチェット (`eslint-plugin-sonarjs`) —個別のESLintパス。 CI両方を単一の`check:complexity-ratchets`ステップとしてマージして実行します                              | はい                     |
| `check:dead-code`            | 未使用のエクスポート/ファイルのラチェット (knip) がベースラインと比較して後退しない                                                                                         | はい                     |
| `check:compression-budget`   | 圧縮ベンチマーク バジェット—のエンジンごとのトークン節約の下限が後退してはなりません                                                                                        | はい                     |
| `check:type-coverage`        | パーセント型ラチェット (`type-coverage`) は退行しません。主に`typecheck:noimplicit:core`を包含します                                                                        | はい                     |
| `check:codeql-ratchet`       | オープンCodeQLアラート数が後退しない ( `gh api`経由で読み取り、トークンなしのグレースフルスキップ) —リフレッシュ ケイデンスと手動トリガー: 下記の「CodeQLラチェット」を参照 | はい                     |
| `check:type-scale-ratchet`   | キット タイプ スケール: 12 px 未満のサイズと`src/`の`font-bold`のみが下がります (`typeScaleSubFloorSizes`、 `typeScaleFontBold`)。コミット前フックにもあります              | はい                     |

### ジョブ: `quality-extended`

ジョブレベルの `continue-on-error` を設定しない混在ジョブです。`--ratchet` を渡して実行するステップは、
`quality-baseline.json` と比較して測定された悪化があるとジョブを失敗させます。`check:circular-deps` とスキャナーの
インストールステップのみが助言的です（ステップレベルで `continue-on-error: true`）。外部スキャナーは
`gh release download` 経由でインストールされます。`check:secrets` は gitleaks がない場合に自動的にスキップし（終了コード 0）、
`check:vuln-ratchet`、`check:workflows`、`check:openapi-breaking` は測定値がない場合に fail closed となります。

| スクリプト               | 検証します                                                                                                                                                                                                                   | ブロッキング                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | 循環依存関係なし (dpdm)                                                                                                                                                                                                      | **アドバイザリー**                                  |
| `check:bundle-size`      | バンドルのサイズは上限を超えません。測れないサイズも失敗する                                                                                                                                                                 | **--ratchetによるブロック**                         |
| `check:secrets`          | バイナリが存在しない場合、シークレット スキャン (gitleaks) —がスキップされる                                                                                                                                                 | **--ratchetによるブロック**                         |
| `check:vuln-ratchet`     | 依存関係の脆弱性 (osv-scanner) —に戻らない、未測定の場合、 `--ratchet` INCOMPLETE (exit 2) として失敗する                                                                                                                    | **--ratchetによるブロック**                         |
| `check:workflows`        | ワークフロー lint (actionlint + zizmor); missing/brokenスキャナー、無効なレポート、または欠落しているラチェット ベースラインは、 INCOMPLETEとして失敗します。有効な結果は、選択したstrict/advisory/ratchetポリシーに従います | 実行が必要です。 CIでの zizmor ラチェットのブロック |
| `check:openapi-breaking` | ピン留めされたイベントコミットに対するパブリックAPIコントラクト (PR merge-base、push before、merge-group Base、 scheduled/manual checkout firstparent)。必要な測定が失敗して終了しました                                     | **--ratchetによるブロック**                         |

### ジョブ: `docs-sync-strict`

すべてのPRから`main`で実行されます。ブロックは失敗時にマージされます。

| スクリプト                     | 検証します                                                                                                                                                                  | ブロッキング               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 以下の6つのサブゲートを順番に実行するメタゲート                                                                                                                             | はい                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPIバージョンの一貫性。リリース モードでは、66 の`llm.txt`ミラーと変換されたCHANGELOGセクションも含まれます (PRモード: ミラーは一致します)                  | はい                       |
| ↳ `check:docs-counts`          | 散文でのカウント (プロバイダー数、移行数など)。 2 つのモード: 機能の`pr` PRs、その他の場所の`release` —下記の「導出値」を参照                                               | はい                       |
| ↳ `check:env-doc-sync`         | `.env.example`のすべての環境変数はドキュメント テーブルに文書化され、その逆も同様です。                                                                                     | はい                       |
| ↳ `check:deprecated-versions`  | ドキュメントには非推奨のバージョン文字列はありません                                                                                                                        | はい                       |
| ↳ `check:doc-links`            | ドキュメント内の内部マークダウン リンクは実際のファイル (`[text]`/`(path)`形式) に解決されます。                                                                            | はい                       |
| ↳ `check:fabricated-docs`      | ドキュメントで引用されているルート、環境変数、 CLIコマンド、フック名、ファイル パスはコードベースに存在します。 `--strict`経由のハード ゲート。フラグなしのソフトフェイル。 | はい ( CIの`--strict`経由) |
| `check:cli-i18n`               | CLI `t()`キーは`bin/cli/locales/en.json`に存在します (両方のモード)。リリースモードのみでの`en.json`との pt-BR / zh-CN / zh-TW パリティ                                     | はい                       |
| `check:openapi-coverage`       | OpenAPI仕様は実際のルートの少なくともラチェットフロアをカバーします                                                                                                         | はい                       |
| `check:openapi-security-tiers` | `openapi.yaml`のセキュリティ層のアノテーションは`routeGuard.ts`分類と一致しています                                                                                         | **アドバイザリー**         |
| `check:openapi-routes`         | `openapi.yaml`のすべてのパスは実際の`route.ts` (幻覚防止) に解決されます。                                                                                                  | はい                       |
| `check:docs-symbols`           | `docs/**/*.md`内のすべての`/api/...`参照は実際の`route.ts` (幻覚防止) に解決されます。                                                                                      | はい                       |
| `i18n translation drift`       | `docs/i18n/**`ミラーと`.i18n-state.json` PRsに関する—アドバイザリー (ミラーは変換 Wave によって更新されます)、プッシュと夜間に厳密                                          | **アドバイザリー**PRsで    |

#### 変換ミラーは派生ファイルです (PRモードとリリース モード)

PR機能は英語のソースのみを編集します。 `docs/i18n/<locale>/**`ミラー (66 の`llm.txt`コピーと変換された`CHANGELOG.md`ファイルを含む) と`.i18n-state.json` 、変換ウェーブ (`docs/i18n-*` / `chore/i18n-*`ブランチ、スケジュールされた`i18n-mirror-refresh.yml`) とリリース (`npm run release:sync-changelog-i18n`) によって 1 ステップで書き換えられます。したがって、ミラー ゲートは 2 つのモードで実行され、 `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`、次に`OMNIROUTE_GATE_MODE`、次に Actions イベント。ローカル実行は`release`) によって解決されます。

- `check:docs-sync` — リリースモードではすべてのチェックを実行します。PR モードでは package.json/OpenAPI のバージョン、
  ルート CHANGELOG の見出し、superseded-docs ガードを維持し、`llm.txt` のミラーコピーと翻訳済み CHANGELOG セクションについては
  `SKIP reason=pr-mode` を出力します — ただし、PR がミラーを書き込む場合を除きます。`config/quality/derived-paths/*.json` で
  `docs/i18n/**` ファミリーの writer として宣言された head ブランチは、両方のチェックを厳密に実行します。また、diff base が解決できる場合、
  自身の diff で `docs/i18n/<locale>/llm.txt` または `CHANGELOG.md` を編集する変更は、そのチェックを厳密に実行します。depth-1 checkout
  （`docs-sync-strict` ジョブ）では diff base が解決されないため、PR モードでも base を必要としないチェックを 1 つ実行します。つまり、
  すべての `llm.txt` ミラーが存在し、`---` 区切りを維持し、ルートの本文または大半のミラーで共有される本文のいずれかを含んでいることを確認します。
  base が移動した場合は、すべてのミラーが同じように古くなるため合格します。1 つのミラーを手動編集すると失敗します。翻訳済みの
  `CHANGELOG.md` ファイルには、depth-1 の PR checkout でこのようなチェックはありません。

- pre-commit フックは `check-docs-sync.mjs --mode=pr` を実行します。コミットは、そのコミットが行う変更に基づいて判定されます。
  フラグなしのローカル実行はリリースモードとなり、ルートの `llm.txt` を編集する PR が 1 つマージされると、その wave が実行されるまで、
  その base に対する後続のすべてのコミットがブロックされます。Husky フックが実行する mode-aware gate にも同じルールが適用されます。
  フックは `--mode=pr` を渡し、厳密な判定はリリースモードの実行（リリース PR、`main` への push、通常のローカル実行）に残ります。
- ミラーコンテンツ単体テスト (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`、 `resilience-pre-dispatch-docs-mirrors`、 `cli-env-quality-docs-mirrors`、 `docs/*-locales`) —リリース モードはすべてのロケールをアサートします。 PRモードは、 `.i18n-state.json` (ファイル全体のハッシュ、またはテストでピン留めされたセクションの記録されたセクション ハッシュ) に従って英語のソースで最新のミラーのみをアサートし、理由を付けて古いミラーをスキップします。 `target_hash`来歴チェックは、両方のモードのすべてのロケールに対して実行されます。鮮度は`## `セクション、つまり`run-translation.mjs`ハッシュ単位ごとです。長いセクション (このファイルのゲート インベントリはその約半分) は、そのセクションを編集するとミラーが古いままになり、PR モード アサーションが次のウェーブまでスキップされることを意味します。英語のソースに含まれなくなったアンカーは、ファイル全体の比較に戻ります。
- PRsに関する`i18n translation drift` —アドバイザリー、プッシュ、夜間、およびリリース カットに厳密であるため、古いミラーをリリースで出荷することはできません。

`scripts/i18n/sync-llm-mirrors.mjs`（`--dry-run` とともに `syncLlmMirrors()` としても export されています）は、`llm.txt` ミラーを書き換えます。
リリース refresh、translation wave、スケジュールされた `i18n-mirror-refresh.yml` はこれを実行します（refresh は drift report にミラーが一覧表示されないため、
dry run によって古い `llm.txt` ミラーを検出し、`check:docs-all` の前に同期します）。

`docs/diagrams/` 配下の 12 個の README SVG は生成物です（`scripts/docs/gen-readme-<name>.mjs`。
`npm run docs:readme-diagrams` ですべて再生成します）。それぞれにバイト比較のユニットテスト（`tests/unit/docs/readme-*-svg.test.ts`、ジョブ
`test-unit`）があり、リリースモードではコミット済みファイルが古い場合に失敗します。PR では、`check:generated-artifacts` が PR で編集された SVG を判定し、
base の drift はリリース refresh に委ねられます（[生成ファイルとリリース時に書き込まれる派生ベースライン](#generated-files-and-derived-baselines-written-at-release) を参照）。
また、`check:docs-counts` は `<text>` ノードから正規の数値を読み取ります。これが、アウトライン化の手順ですべてのアウトライン化された文字列を
非表示の `<text>` としてファイル内に保持する理由です。SVG の正規数値チェックは `SVG_DIAGRAM_FILES`
（`scripts/check/check-docs-counts-sync.mjs`）に列挙されたファイルを読み取ります：
`docs/diagrams/readme-hero.svg`、`free-tier-budget.svg`、`promise-pillars.svg`、`comparison-table.svg`、`cli-terminal.svg`、
`tier-cascade.svg`、さらに `public/images/tier-flow-dark.svg` と `tier-flow-light.svg` です。free-forever、catalog-entry、recurring-pool、
scoring-factors の各 claim も `promise-pillars.svg`、`free-tier-budget.svg`、`strategies-grid.svg` を読み取ります。これらのジェネレーターが
描画する数値（provider の合計、MCP tools、routing strategies、free-forever providers など）は、リテラル値ではなく、
`scripts/docs/readmeFacts.mjs` を通じて facts snapshot `docs/reference/derived-facts.json` から取得されるため、どのブランチでも図を再生成すれば
コミット済みファイルが再現されます。`free-tier-budget.svg` は同じ snapshot（facts probe が記録する catalog summary である `code.freeTierBudget`）
から行を描画するため、`FREE_MODEL_BUDGETS` の変更は CI を赤にするのではなく、次回の refresh でカードに反映されます。

### 派生値: `pr`および`release`ゲート モード

フィーチャーPR 、そのベースの状態 (プロバイダー、移行、MCP ツールおよび戦略の数、 README SVG数、ファクトのスナップショット) に依存する値を書き込むことはありません。 1 つのステップで、リリースおよび夜間の派生リフレッシュPRによって実行されるすべての`npm run release:refresh-derived`が再計算されます。それで**リリース間では、仕様によりベースがライブコードの背後にあります**、ツリーとライブ コードを比較するゲートまたはテストは、兄弟がプロバイダーを追加した後、すべてのPRで赤になります。したがって、派生値を判断するゲートは、 `scripts/check/lib/gateMode.mjs`によって解決される 2 つのモードのいずれかで実行されます (最初に一致したものが勝ち)。

1. コマンドラインの`--mode=pr|release` 。
2. `OMNIROUTE_GATE_MODE`環境変数 (`pr`または`release`)。
3. GitHubアクション イベントからの自動: ヘッドが`release/v*`、 `merge_group`、または`omni-queue/**` → `pr`へのプッシュではない`pull_request` 。その他すべて (プッシュ、スケジュール、ディスパッチ、リリースPR `release/v* → main`、ローカル実行) → `release`。

各モードで失敗する`check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) は次のとおりです。

| モード    | 失敗する                                                                                                                                                                                                                                                                                                                                                                                                                | 生きた事実が必要だ |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `release` | すべてのチェック、ツリーから収集された事実に対する厳密な同等性 (ゲートが常に持っていた動作): 古いカウント、バージョン、カバレッジフロア、またはSVG番号はSTRICTドリフトです                                                                                                                                                                                                                                              | はい               |
| `pr`      | 変更によって行われた内容のみを、同じクレーム エクストラクターを使用してPRベースと比較します。 (1) そのチェックおよびファイルのベースに存在しなかった管理値 (「PR管理番号を編集しました—その行をベース テキストに復元しました」)。 (2) ベースが保持し、ヘッドが失われた必要な要求。ファクトを必要としないコンテンツ不変条件は、リリース モードと同様に実行されます。リリースのみのチェックはリストされ、スキップされます | いいえ             |

エージェント命令ファイルには次の内容が含まれます。**いいえ**すべての派生カウント: `AGENTS.md`、 `llm.txt` (およびその`docs/i18n/*/llm.txt`コピー)、bs `AGENTS.md`フォーク、 `open-sse/services/AGENTS.md`、 `src/shared/constants/agentSkills.ts`、 `skills/README.md` 、およびすべての`skills/*/SKILL.md`はソース (たとえば、 `src/shared/constants/routingStrategies.ts`の`ROUTING_STRATEGY_VALUES` ) と代わりに`npm run facts`を指します。不変の「派生カウントなし (エージェント命令ファイル…)」は、両方のモードでカウント (プロバイダー、移行、 MCPツールとスコープ、ルーティング戦略、スコアリング係数、モード パック) に失敗するため、リリースの更新で命令ファイルを書き換える必要はありません。

`pr`モードでは、ライター ブランチは管理値`chore/derived-*` (夜間更新PR)、 `release/v*`、および変換ウェーブ`docs/i18n-*`および`chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`) を編集できます。キュー バッチ (`merge_group`、 Mergify ドラフト、 `omni-queue/**`) は再度判定されません。すでに判定されたゲートのPRs 1 つずつ合計します。

終了コード: `0` clean · `1` STRICTドリフト (または`--strict`によるソフト ドリフト) または管理値違反 · `2`インフラストラクチャ—コード ファクトを収集できませんでした (tsx プローブが失敗したか、タイムアウトしました。タイムアウトは`OMNIROUTE_FACTS_TIMEOUT_MS`、デフォルトは 600000 ミリ秒です)、またはCIでは、 PR diff ベースを解決できませんでした。出口 2 はドキュメントの相違ではありません。ジョブを再実行するか、環境を修正してください。

各モードが実行される場所:

| どこ                                                                                                   | モード                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 機能PR — `ci.yml`ジョブ`docs-sync-strict`、 `quality.yml`ステップ「ドキュメントの精度」                | `pr` (自動);ジョブはベースを`BASE_SHA`として渡し、 `fetch-depth: 2`でチェックアウトします。                                                                                                                             |
| `merge_group`、 `omni-queue/**`候補、併合列車のフル ゲート リスト                                      | `pr`                                                                                                                                                                                                                    |
| PR (`release/v* → main`) のリリース、プッシュ、スケジュールされた実行、および手動実行                  | `release`                                                                                                                                                                                                               |
| リリース-グリーン (`scripts/quality/validate-release-green.mjs`)                                       | HARDアイテムは`OMNIROUTE_GATE_MODE=pr` (「ベースが壊れましたか?」) とともに実行されます。 DRIFTアイテム`derived-refresh` `npm run release:refresh-derived -- --check`を実行します (厳密なビュー、base-red は開きません) |
| リリース (`/generate-release`フェーズ 0a および 1、スキルのワイヤリングは所有者が承認した別の変更です) | `npm run release:refresh-derived`派生ファイルを書き込みます。リリースPR自身のチェックは`release`モードで実行されます                                                                                                    |
| `nightly-derived-refresh.yml` (毎日、最高の`release/vX.Y.Z`、リリースフリーズ下でスキップ)             | `npm run release:refresh-derived -- --profile=nightly`; diff では、 ONE PR `chore/derived-refresh`から開いたままにします。決してマージしない                                                                            |

その背後にあるコマンドは次のとおりです。

- `npm run facts` 、導出されたすべての数値をJSON (`scripts/release/facts.mjs`) として出力します。 `--key=code.mcpTools` 1 つの値を出力し、 `--snapshot`ライブ ツリーの代わりにコミットされたスナップショットを読み取ります。事実が収集できない場合は、2 を終了します。
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) は、派生ファイルを次の順序 ( `--only=`のステップ ID) で 1 つのパスで再計算します: `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`)、 `facts` (スナップショット)、 `numbers` (ドキュメントに適用されたカウント ゲートの書き換え計画。その後、 `docs/i18n/`ミラーに転送されます)、 `readme-diagrams`、 `skills` (生成された`SKILL.md`)、 `e2e-timings` (ツリーが`syncE2eTimings`を出荷するまでスキップされます)、 `ui-keys` ( `en.json`がドロップしたキーをプルーニングし、 `--rewritten-since=<ref>` —デフォルトの`origin/main` —では、前回のリリース以降に書き換えられた英語の値を再キューに入れます。値は、環境内で構成されたバックエンドまたは`.env` (`OMNIROUTE_TRANSLATION_*`、それらのキーのみが読み取られます)、またはGoogleエンジンによって同じ実行で変換されます。バックエンドがなければ、 `__MISSING__`を書き込むことはありません。マーカー: リリース プロファイルが失敗し、nightly がキーをスキップし、 `--allow-untranslated`意図的にキーを書き込む)、 `llm-mirrors`と`verify-generated` (書き込み後、リリース モードの`check:generated-artifacts`と`check:agent-skills-sync`通過する必要があります`--check`でスキップされ、 `--only`それを省略した場合、失敗は exit 2)。 `changelog`ステップはオプトインです (`--with-changelog`、リリース プロファイルのみ)。 `--profile=nightly`バージョン要求には決して触れません。 `-- --check`では、ファイルが変更されるか、管理対象の値を手動で編集する必要がある場合 (両方をリストします)、何も書き込まずに 1 で終了します。インフラストラクチャ障害が発生した場合は 2 を終了します。 `--json`結果をJSONとして出力します。
- `docs/reference/derived-facts.json`は、最後の更新で使用されたファクトのスナップショットです。リフレッシュのみが書き込みます。 README SVGジェネレーターはそれを読み取り、PR 時の単体テストはコミットされたドキュメントと生成されたファイルをそれと比較しますが、ライブ コードとは決して比較しませ— 。スイートの単一のライブ比較は、 `tests/unit/check-docs-counts-sync.test.ts`の「リリースのリフレッシュによってサイクルが終了する」です。ライブの事実では、メモリに適用されたリフレッシュの再書き込み計画はレポートされないSTRICTドリフトを残さず、再計画は何も変更しません。

ローカルで再現するには (ローカル実行のデフォルトは`release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

解決可能なベースがない場合 ( `BASE_SHA`/`BASE_REF`、ローカル`origin/release/v<version>`がない)、ローカル`pr`の実行は警告を出力し、失敗せずに diff をスキップします。

### ジョブ: `i18n-ui-coverage`

| スクリプト                            | 検証します                                                                                                                                                                                    | ブロッキング              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check-ui-keys-coverage` (インライン) | UI i18n キー カバレッジは≥ 65%                                                                                                                                                                | はい (両方のモード)       |
| `check:ui-icu`                        | すべてのUIカタログのすべてのメッセージは`IntlMessageFormat`でコンパイルされます                                                                                                               | はい (両方のモード)       |
| `check-ui-value-drift` (インライン)   | 書き直された英語**価値**古い翻訳を残さない                                                                                                                                                    | はい (リリースモードのみ) |
| `check-new-key-coverage` (インライン) | あ**新しい**英語キーはすべてのロケールで翻訳されます— 、 `__MISSING__:`マーカーは拒否されます。                                                                                               | はい (リリースモードのみ) |
| `check-key-completeness` (インライン) | すべてのUIカタログ (および`--catalog=cli`の場合はすべてのCLIカタログ) は、その`en.json`のキー セットを正確に保持します。 `pr`モードでは、 PRマージ ベースでそれ自体に対して変更した各カタログ | はい (両方のモード)       |
| `check-translation-ratio`             | ロケールごとの実際の翻訳率 (英語と同一、プレースホルダー、ホワイトリスト外の欠落した葉) は、 `config/quality/i18n-translation-baseline.json` +スラックを超えてはなりません                    | はい (リリースモードのみ) |

`fetch-depth: 0` —値ドリフト ゲート diff `en.json`とマージ ベースが必要です。

**2 つのモード（2026-11-13 以降）。** feature PR では `en.json`（および
`bin/cli/locales/en.json`）のキーの追加または書き換えを行い、他のロケールには触れません。
`check:pr-derived-paths`（ジョブ `pr-test-policy`、ファミリー
`config/quality/derived-paths/translation.json`）は、これに違反する feature PR を失敗させます。
他のロケールは、`scripts/i18n/sync-ui-keys.mjs` の `syncUiKeys()`（不足しているキーを追加し、
削除されたキーを削除し、書き換えられた英語の翻訳を `rewrittenSinceRef` でマークし、翻訳する）を
呼び出す `release:refresh-derived` によって、または翻訳ウェーブによって、リリースごとに 1 回
完成されます。ゲートは `scripts/check/lib/gateMode.mjs` からモードを読み取ります。`pr` モード
（feature PR、`merge_group`、`omni-queue/**`）では、上記の release-mode ゲートは
`SKIP reason=pr-mode` を出力して 0 で終了します。`release` モード（リリース PR、
`main` への push、`workflow_dispatch`、ローカル実行）では従来どおり厳格に動作し、リリース PR
では差分対応のゲートに `BASE_REF=origin/main` が渡されるため、そのサイクルで追加または
書き換えられたすべてのキーを判定します。feature PR の判定結果は、ローカルで `--mode=pr` を
指定して確認できます。

`pr` モードでロケールカタログを変更する PR（翻訳ウェーブ、リリース更新、翻訳のみの修正）がスキップされることはありません。`check-key-completeness` は、変更された各カタログをマージベースにおける同じカタログ（`scripts/i18n/lib/touched-catalogs.mjs`）と比較し、カタログから失われたキー、`en.json` に存在しないキー、実際の翻訳から `__MISSING__:` マーカーまたは英語テキストに変わった値、あるいは PR が変更していない英語文字列のプレースホルダーやタグを値が引き継がなくなった場合に失敗します。PR で新規追加されたカタログには、`en.json` のキーセット全体が含まれていなければなりません。これにより、PR が変更するカタログについて、ratio ゲートと CLI-parity ゲートで確認される内容をカバーできます。

ロケール パリティ単体テスト (`cli-i18n-catalog`、 `i18n-pt-br`、 `i18n-vi-completeness`、 `i18n-placeholder-parity`) は、 `tests/_helpers/localeParityMode.ts`まで同じモードに従います。 `pr`モードでは、キー パリティ アサーションをスキップし、マージ ベース以降に英語が変更されたキー (単体テスト ジョブの浅いチェックアウトで読み取れない場合のすべてのキー) のプレースホルダー パリティをリリースまでリフレッシュします。その助っ人は、**のみ**許可されたモード条件付きスキップ: `check:test-masking` `.skip(`と`{ skip: true }`をカウントしますが、返される計算された`{ skip: "<reason>" }`はカウントしません。そのため、 `tests/unit/locale-parity-mode.test.ts` 、使用を許可されたテストのリストを固定します—追加することは、リストへのレビュー済みの編集です。

#### `check-ui-value-drift` —古い翻訳ゲート

他のゲートでは構造的に認識できない 1 つの i18n 回帰を捕捉します。英語の値が書き換えられ、_前の_ 英語から派生した翻訳が残されるため、英語以外のユーザーは自信を持って表現された、間違ったコピーを読み続けます。

これは実際に発送されました。 `oauthModal.googleOAuthWarning` 、Antigravity ログイン ヘルパー (#5203) が登場したときに書き直されました。** 43 ロケール中 39 か所**オペレーターに「完全なURLをコピーして下に貼り付けてください」と指示するテキストが保持され、そのプロバイダーではフローを完了できませんでし— 。 #8463まで気付かれなかったのは、次の理由からです。

- `sync-ui-keys` 、次のキーのみをバックフィルします。**不在**、決してそうではありません**古い**;
- `check-ui-keys-coverage` key _presence_ をカウントするため、古い翻訳はカバーされているとスコアが付けられます。
- `check-translation-drift` `docs/i18n/<locale>/**.md`ドキュメントのミラーリング—を追跡しますが、 `src/i18n/messages/*.json`を読み取ることはありません。これはジョブ`docs-sync-strict`: PRsでアドバイザリー、プッシュと夜間で厳密に実行されます。変換ウェーブは、機能PRではなく、ミラーをリフレッシュします。

**ベースラインに裏付けられたものではなく、差分を認識します。**マージベースの`en.json`作業ツリーと比較します。英語の値が変更されたすべてのキーについて、未変更の翻訳が保持されているロケールはすべて古いものになります。これは意図的に**既存の借金を凍結する**— a diff では、長年の翻訳がどの古英語から来たのかを明らかにすることはできないため、ゲートは現在の変更が何に触れているかのみを判断します。代替案 (キーごとのハッシュ ベースライン) では、 ~ 600 KBで生成されたファイル (既存の最大のベースラインである 3 ×がかかり、 i18n PRごとに撹拌されます。

それを満たすための 2 つの方法:

1. 影響を受ける翻訳を更新するか、
2. それらを`__MISSING__:<new english>` —に設定すると、ランタイムは修正された英語 (`src/i18n/request.ts::deepMergeFallback`、 #7258) と翻訳用のキー キューを提供します。

文字列の場合**意味**変更されました、好みます**キーの名前を変更する**: 新しいキーは古い変換を継承できません。それが#8463が使用したパターンです。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

基本カタログを読み取れない場合 (基本参照のない浅いクローン)、 `SKIP reason=base-unresolved`で 0 を終了し、 `check-openapi-breaking`をミラーリングします。リリース モードのみ: PR機能は英語を書き換えてそこで停止します。リリースの更新では、残された翻訳 (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`、同じ`findStaleTranslations`) がマークされます。

### ジョブ: `i18n`

完全な i18n 検証マトリックス (ロケールごとに 1 つのジョブ)。仕事全体はアドバイスです。

| スクリプト                      | 検証します                 | ブロッキング                                               |
| ------------------------------- | -------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | ロケールごとの翻訳の完全性 | **アドバイザリー**(ジョブ全体の`continue-on-error: true` ) |

### ジョブ: `pr-test-policy`

プル リクエストでのみ実行されます。

| スクリプト             | 検証します                                                                                                                                | ブロッキング |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | `src/`、 `open-sse/`、 `electron/`、または`bin/`の実稼働コードを変更するPRsには、テストを含めるか更新する必要があります (ハード ルール#8) | はい         |
| `check:test-masking`   | 変更されたテスト ファイルによってネット アサート数が減ったり、 `assert.ok(true)`トートロジーが追加されたりすることはありません            | はい         |
| `check:pr-evidence`    | PR本文は、変更のtest/VPS証拠を引用しています ( PR散文—壊れやすいを grep することでハード ルール#18機械化します。バックログを参照)         | はい         |

### ジョブ: `test-vitest`

`build`の後に実行されます。ブロックは失敗時にマージされます。

| スイート         | 検証します                                                        | ブロッキング                                                                                             |
| ---------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCPサーバー (110 ツール)、 autoCombo、キャッシュ— vitest ランナー | はい                                                                                                     |
| `test:vitest:ui` | UIコンポーネント テスト— vitest ランナー                          | **ブロッキング**—の既存の障害は、 `vitest.config.ts`では明示的に除外されます。新たな失敗が仕事に失敗する |

### 夜間のワークフロー (スケジュール済み、アドバイス)

これらは cron スケジュール (および`workflow_dispatch`) で実行され、 PRsでは実行されません。すべてアドバイスです。

| ワークフロー           | 検証します                                                                                                                                                        | ブロッキング       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | ランダムシード+高い実行数を使用した高速チェックプロパティテスト                                                                                                   | **アドバイザリー** |
| `nightly-resilience`   | ヒープ成長ゲート、カオスフォールトインジェクション、k6 load/soak                                                                                                  | **アドバイザリー** |
| `nightly-llm-security` | Promptfoo インジェクション ガード (ブロック モード) + garak プローブ (プロバイダー シークレットなしでスキップ)                                                    | **アドバイザリー** |
| `nightly-schemathesis` | `docs/openapi.yaml` —を使用したライブOmniRouteに対するOpenAPIコントラクト ファジング (スキーマセシス) により、仕様違反 / 未処理の 500 が表面化します (Fase 8 B.4) | **アドバイザリー** |
| `nightly-mutation`     | 高速ユニット レーン—での Stryker 変異テスト スコア、生き残った変異体が弱いアサートを表面化                                                                        | **アドバイザリー** |
| `nightly-compat`       | サポートされている`engines.node`範囲にわたるノード エンジンの互換性マトリックス                                                                                   | **アドバイザリー** |

パフォーマンス ベースライン (ヒープ、 TTFB、ビルド時間) はゲートされずに記録されます[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) を参照してください。

---

## Velocity フェーズ（2026-08-30 → v4.0 LTS）：すべてのベースラインを20%緩和

オーナー決定（2026-08-30）：v4.0 のモジュール化が完了するまで、負債ラインを維持することよりも
出荷速度を重視する。すべての**数値**ラチェットベースラインを、監査可能な1回の適用で20%緩和し、
このフェーズを `config/quality/quality-baseline.json` で宣言する：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 変更内容                                                                                                                                                                                   | 場所                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 少ないほど良いカウントは×1.2、多いほど良いパーセンテージは÷1.2（カバレッジの下限60は維持、`eslintErrors` は0のまま、`eslintWarnings` は凍結された抑制件数の20%に変更） | `quality-baseline.json`（`_relax_velocity_2026_08_30` の注記に変更前 → 変更後をすべて記載）            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                           | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`、すべての `frozen[*]` / `testFrozen[*]` の行数上限を×1.2                                                                                                                  | `file-size-baseline.json`                                                                              |
| ファイル単位 / TSコード単位のカウントを×1.2                                                                                                                                                | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` の間、`--require-tighten` は助言扱いになる                                                                                                              | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nightly の `bank-ratchet-shrinks` を一時停止（測定された縮小を記録して余裕を取り消してしまうため）                                                                                         | `.github/workflows/nightly-release-green.yml`                                                          |

許可リスト（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json`、
…）は**予算ではない**ため、変更していない。合否ポリシーゲート（シークレット、SQLルール、
docs/env の契約、i18n の同等性、ユニットテスト）は変更されない — 赤いテストは引き続き赤いテストである。

**ツール**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` —
  1回限りの緩和（`scripts/quality/relax-baselines.mjs`）。同じ注記で2回実行することは拒否される。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CIと同じ方法ですべての数値ゲートを測定し、ゲートごとに残りの余裕を出力する
  （`scripts/quality/baseline-headroom.mjs`）。nightly の `baseline-headroom` ジョブはワークフロー実行概要に
  表を公開し、JSON/Markdown レポートを `baseline-headroom-<run_id>` としてアップロードする。これらは90日間保持される。
  警告行とクリティカル行には、上限の10%以内にあるゲート、またはすでに上限を超えているゲートが示される。
  これらのレポートを、予算が消費されていることを示す早期警告として確認し、問題のゲートにある
  `_rebaseline_*` 注記を調査する。ジョブは恒久的な issue を作成・更新しなくなった。#12149 により、以前のレポート履歴は保持される。

**新規コードモード（Clean-as-You-Code）— 2026-08-30以降、PRの高速パスのみ**

`pull_request` イベントでは、`quality.yml` が `check:file-size`、
`check:complexity-ratchets`、`check:dead-code` に `--base-ref <PR base SHA>` を渡す。
`check:complexity-ratchets` と `check:dead-code` では、ゲートはマージベースと HEAD を、
**PRが変更したファイルに限定して**比較する（`scripts/check/newCodeMode.mjs`：マージベースは一時的な
`git worktree` に展開され、そこで ESLint/knip を実行し、HEAD でも実行して、ファイルごとのカウントを差分比較する）：

- **ブロッキング** — PRが変更したファイルで、サイクロマティック違反 / 認知的複雑度違反、
  またはデッドエクスポートを追加した場合
  （ログには `complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=` が出力される）；
- **助言扱い** — 凍結されたベースラインに対するグローバル合計。継承されたドリフトによって
  無関係なPRが赤になることはない。ドリフトはリリース時の調整で再凍結され、headroom ジョブで監視される。

`check:file-size` は独自のルールでベースリファレンスを使用する（`scripts/check/check-file-size.mjs`、#8522）。
ツリー内のすべてのソースファイルとテストファイルを確認し、`git show` でPRベース時点の各ファイルの行数を読み取り、
ベースラインの上限（`frozen` / `testFrozen`、またはベースライン外のファイルについては `cap` / `testCap`）と
ベース時点のサイズのうち大きい方を超えて増加した場合にのみファイルを失敗させる。ベース時点ですでにドリフトしていた
ファイルによって、無関係なPRが赤になることはない。

`check:boundary:ratchet` は単一の数値にも同じルールを適用します
（`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`）：PR イベントでは、
`quality.yml` の fast-gates と `ci.yml` の lint ジョブの両方が PR のベース SHA を渡し、
ベースコミットは `git archive` のエクスポートから測定されます。PR が失敗するのは、
その `open-sse → src` エッジ数が `metrics.boundaryOpenSseToSrc` とベース上のカウントの
大きい方を超えた場合だけです。上限を超えるベースのドリフトは報告されます
（`base drift herdado`）が、問題のない PR を失敗させることはありません。push → main
では絶対上限が維持され、解決できないベース SHA は警告とともにその上限にフォールバックします。

オムニキューの候補（`omni-queue/**` への push。[OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) を参照）
はプルリクエストと同じ扱いになります。両方のワークフローが候補のベース
（`needs.changes.outputs.candidateBase`）を `--base-ref` として渡し、
`check:ts7-diagnostics-ratchet` もそれに対して実行されます。2 つの新規コードゲートでは、
比較対象のベースはその SHA 自体であり、トップマージコミットの最初の親ではありません。
そのため、バッチ内のすべてのプルリクエストが判定対象になります。

`workflow_dispatch` による実行、リリースのグリーンスイープ、夜間のヘッドルームジョブには
PR ベースがなく、絶対値（グローバル）の比較を維持します。カバレッジ、重複、
型カバレッジは、現時点ではグローバルのままです（それらのツールではファイル単位の
差分を低コストで生成できないため）。同じ扱いの候補です。

**v4.0 でフェーズを完了（LTS = 以前より厳格であり、「通常に戻る」ではない）**

1. 純粋な `release/v4.0.0` の先端で、記録用に `npm run quality:headroom --json` を実行し、
   続けて `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`、各 typecheck ゲートの
   `--update` を実行します。すべてのベースラインを測定値まで引き下げます。
2. `quality-baseline.json` から `_policy` を削除します（`--require-tighten` と夜間の
   banking を再び有効にします）。`check-openapi-coverage.mjs` の `THRESHOLD = 36`
   （またはそれ以上）を復元します。
3. モジュール化によって改善された部分では、測定値を超えてさらに厳格化します：
   file-size の `cap` を 1000（または 800）に戻し、カバレッジの下限を +5、
   モジュール化したパッケージの dead exports を 0 にします。

## Ratchet ベースライン（`quality-baseline.json`）

ratchet エンジン（`scripts/quality/check-quality-ratchet.mjs`）は `quality-baseline.json`
を読み込み、収集したばかりの `quality-metrics.json` と比較します。いずれかのメトリクスが
許容誤差を超えて悪化すると、ビルドは失敗します。

現在追跡中のメトリクス:

| メトリクス            | 方向   | 意味                                   |
| --------------------- | ------ | -------------------------------------- |
| `eslintWarnings`      | `down` | ESLint の警告数を増加させない          |
| `coverage.statements` | `up`   | ステートメントカバレッジを低下させない |
| `coverage.lines`      | `up`   | 行カバレッジを低下させない             |
| `coverage.functions`  | `up`   | 関数カバレッジを低下させない           |
| `coverage.branches`   | `up`   | 分岐カバレッジを低下させない           |

本当の改善後にベースラインを更新するには:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` フラグは、現在測定されている値を `quality-baseline.json` に書き込みます。
改善を反映する作業は、機能 PR ではなくリリース／ nightly の作業です。`--require-tighten`
（フェーズ 6A.5）は、リリースモード（push、schedule、リリース PR、
ローカル実行）でのみ、反映されていない改善を失敗にします。機能 PR（`pr` ゲートモード）では、
改善を情報として表示して成功します。回帰は両方のモードで失敗します。速度重視のフェーズでは、どこでも助言的な動作になります
（`_policy.requireTighten: false`）。詳しくは
[生成ファイルとリリース時に書き込まれる派生ベースライン](#generated-files-and-derived-baselines-written-at-release)を参照してください。

### CodeQL ratchet: 更新頻度と手動トリガー

`check:codeql-ratchet` は、**PR ごとではなく、スケジュールに従って更新されるリポジトリの状態を読み取ります。**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` は
`state: configured`、`schedule: weekly` を報告します。これは GitHub のデフォルトセットアップによるスキャンであり、プッシュごとの分析ではありません。
その結果、アラートを修正する PR がマージされた後も、次回のスケジュールスキャンが実行されるまで ratchet は
古い、より多い件数を読み取り続けます。そのため、スキャンが追いつくまで、修正 PR 自身の後続 PR を含む、オープン中のすべての PR で回帰が報告されます。

**手動更新**: `gh workflow run codeql.yml --ref release/vX.Y.Z` は
分析を再実行し、数分以内にアラートを再公開します。まず `.github/workflows/codeql.yml`
を確認してください。そのヘッダーには、GitHub の「デフォルトセットアップ」と競合する
**`workflow_dispatch` のみである理由**が説明されています（`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`）。`push`／`pull_request`／
`schedule` トリガーを復元するには、まず **オーナーによる操作が必要です**: Settings → Code security →
CodeQL: Default → Advanced。この切り替えを行わずに `schedule:` トリガーを追加しないでください。
失敗する実行が発生するだけです。

**件数が減少したらベースラインを引き締める** — `node scripts/check/check-codeql-ratchet.mjs
--update` は、新しく測定された件数を `quality-baseline.json` →
`metrics.codeqlAlerts.value` に書き込みます。これにより、ratchet が古い上限までの回帰を暗黙的に許可することを防ぎます。実例（2026-09-02/03）: PR #12502 は実際のアラートを 7 件修正し
（測定されたオープン件数は 13 → 6）、PR #12530 は一致するように固定されたベースラインを 11 → 6 に引き締めました。その後、残りの 6 件はアラートごとの正当な理由を付けて却下され、オープン件数は 0 になりました。

**却下はオペレーターの判断です（ハードルール #14）** — 却下コメントに技術的な正当性を記録せずに、CodeQL アラートを決して却下しないでください。上流プロトコル上の要件には `won't fix`、テストフィクスチャには `used in tests`、CodeQL が検出できないサニタイザーには `false positive` を使用します（先例: `docs/security/ERROR_SANITIZATION.md`）。

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

## 生成されたファイルと派生ベースライン (リリース時に作成)

計画 2026-11-13 (「導出された数値とテキストはリリース時にのみ解決される」): 機能PRは、**ソース**— `src/shared/constants/providers.ts`、 `docs/openapi.yaml`、スキル カタログ、無料層カタログ、新しい e2e 仕様。そのソースから計算されたファイルは再生成されません。また、測定された改善をベースラインに保存しません。これらのファイルは、リリース更新 (`release:refresh-derived`) または夜間更新PRによって 1 回書き換えられます。これ以前は、すべての兄弟PR独自の再生成されたコピーを保持しており、次のマージと競合していました (2026-11-13: 321 個のオープンPRsのうち 30 個が`PROVIDER_REFERENCE.md`書き換え、26 ～ 28 個がREADMEダイアグラムを書き換えました)。

**警備員。** `check:pr-derived-paths` (ジョブ`pr-test-policy`) は、 `config/quality/derived-paths/`内のファミリーのファイルにアクセスする機能PRに失敗します。

| ファミリー  | ファイル                                                                                                                                                                          | 書き換え元                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; 12 個の生成済み README SVG；`skills/*/references/**`；カスタムブロックを持たない `SKILL.md` ファイル | `release:refresh-derived`（facts）、`gen:provider-reference`、`docs:readme-diagrams`、`generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                 | `balance-e2e-shards.mjs --sync`（`syncE2eTimings()`）                                                                     |

ライター (ベースラインの`release/v*`、 `chore/derived-*`、および`chore/bank-ratchet-*` ) は免除されます。つまり、1 つのファミリーとそのコンパニオン ( `generated`の場合: ジェネレーター スクリプト、そのテスト、エージェント スキル入力— `src/shared/constants/agentSkills.ts`、手書きの`skills/**`ドキュメント、 `docs/openapi.yaml` —および`changelog.d/**`) のみを変更するPRです。たとえば、再生成されたSVGによるヒーロー レイアウトの変更や、再生成された`SKILL.md`ファイルをテストで読み取るスキルの修正などです。手書きの`<!-- skill:custom-start -->`ブロックを持つ`SKILL.md`ファミリーに含まれていません。そのカスタム ブロックはフィーチャの隣で編集可能なままです。

孤立したクリーンアップはファミリによっても判断されません。マージ ベースにそのミラーがあり、 `<doc>` PRのヘッドに存在しなくなった場合、 PR `docs/i18n/<locale>/<doc>`削除する可能性があり、そのようなドキュメントを`sources`から削除するためだけに`.i18n-state.json`を編集する可能性があります。ガードは、それらのファイルを`orphan-cleanup`の下にリストします。まだ存在するドキュメントのミラーを削除すると、違反のままになります。他のパイプラインはその状態を追跡せず、 `llm.txt`ミラーと`CHANGELOG.md`ミラーには独自のライターがあります。

**チェック、ゲートごとのモード**(`scripts/check/lib/gateMode.mjs`; ヘルパー`scripts/check/lib/derivedArtifactScope.mjs`):

| チェック                                                                     | `release` (プッシュ、スケジュール、リリースPR、ローカル)                               | `pr` (機能PR、キューバッチ)                                                                                                                                                                                      |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                    | すべてのスキルはジェネレーターの出力と同等でなければなりません                         | 生成されたテキスト (カスタム ブロックの外側) または`references/` PRによって編集されるスキルのみ。それ以外の場合は`SKIP reason=pr-mode`                                                                           |
| `check:generated-artifacts` (README SVGs + e2e タイミング; 完全な履歴が必要) | すべてのSVGそのジェネレーターと同等です。すべての仕様にはタイミング エントリがあります | PR編集する成果物のみ。残りの`SKIP reason=pr-mode`。差分なしベース→すべてのアーティファクトが判定される (フェイルクローズ)                                                                                        |
| README SVGバイト比較テスト (`tests/unit/docs/readme-*-svg.test.ts`)          | すべてのSVG                                                                            | ベースが解決されるときにPRが編集するのはSVGのみです。 `test-unit`の浅いPRチェックアウトにはベースがないため、テストは`SKIP reason=base-unresolved`でスキップされ、 `check:generated-artifacts`比較を所有します。 |
| e2e タイミングの完全性 (`tests/unit/balance-e2e-shards.test.ts`)             | すべての仕様にエントリがあります                                                       | SVGテストと同じルール (新しい仕様は重みの中央値で実行されます)                                                                                                                                                   |
| `check-quality-ratchet.mjs --require-tighten`                                | バンクされていない改善は失敗します ( `_policy`を除く)                                  | 改善が報告されましたが、失敗は一度もありませんでした。回帰はまだ失敗します                                                                                                                                       |

リリース モードでは、これらのチェックが分割前に持っていた判定、終了コード、およびメッセージが保持されます。最大 1 行が追加され、解決されたモード (`[agent-skills-sync] mode=release (auto: local run)`) に名前が付けられます。テストは、 `check:test-masking`がレポート専用ブロックにリストする node:test の`{ skip: releaseOnlyUnlessTouched(...) }`オプションをスキップします (これは`.skip(`でも`{ skip: true }`でもないため、ハード スキップとしてカウントされません)。 `check:generated-artifacts` 、ベースが解決可能な場所、つまり`check:agent-skills-sync`の直後のジョブ`lint` (`fetch-depth: 0`) で実行されます。ローカルでは、 `npm run check:generated-artifacts -- --mode=pr` 、そのステップがPRで判断した内容を示します。 `check:docs-counts`のプロバイダー合計クロスチェック (「プロバイダー参照合計 (ドキュメント対ライブ モジュール)」) はカウント ゲートの一部であり、そのゲート独自のモードに従います。

意図的にどのファミリーにも属さないものとして、人が判断するポリシーファイル（`gate-manifest.json`、許可リスト、`admission-policy.json`、`provider-assets-provenance.jsonl`、`model-lifecycle.json`）と、機能 PR でコードと一緒に編集が必要になる可能性のある上限値（`quality-baseline.json` のメトリクスエントリ、型チェック／ファイルサイズ／複雑度のベースライン、`eslint-suppressions.json` — PR で凍結された違反を修正した場合は、pre-commit の ESLint 実行によって整理されます）があります。`src/i18n/routeNamespaces.generated.json` も生成物ですが、実行時にアプリがインポートするため、更新を待つことができず、機能 PR に残ります。

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

既存の違反に対して失敗させることのできないすべてのゲートでは、凍結された許可リスト
（例: `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）を使用します。ポリシーは次のとおりです。

**根本原因を修正し、同じ PR で修正できない既存の違反に限って許可リストを使用してください。**

許可リストにエントリを追加する場合:

1. 正当な理由を記載したコメントを含める。
2. 追跡用イシューを参照する（例: `// #3498 — Phase 2 feature, not yet implemented`）。
3. 違反を修正する PR と同じ PR でエントリを削除する — アクティブな違反を抑制しなくなった古いエントリ自体が欠陥です（実装後は、6A.3 の `stale-enforcement` により、孤立した許可リストエントリがあるとゲートが失敗します）。

テストに早く合格するために許可リストエントリを追加しないでください。増え続ける許可リストを伴うグリーンなゲートは、品質についての誤った安心感をもたらします。

### PR でゲートが失敗した場合

1. **ゲートの出力を注意深く読む** — どのファイルまたはシンボルがルールに違反したかが正確に示されています。
2. **違反を修正する** — ほとんどのゲートは決定論的なファイルシステムチェックであり、コードが正しくなればすぐに合格します。
3. **違反が既存のものである場合**（つまり、違反を導入していないものの、ゲートの対象になった場合）: 正当な理由のコメントと追跡用イシューを添えて、許可リストエントリを追加します。
4. **ゲートがラチェットの場合**（カバレッジ、ESLint 警告、重複、複雑度）: 変更によってメトリクスが悪化しています。根本的な問題を修正するか、（まれに）変更が意図的でメトリクスの悪化を許容できる場合は `npm run quality:ratchet -- --update` を実行します — ただし、その理由を PR の説明に記載してください。
5. **アドバイザリーゲート**（`continue-on-error: true`）は情報提供のみを目的としています — マージをブロックしませんが、CI の概要に表示されます。それでも修正してください。

---

## 新しいゲートの追加

1. `scripts/check/check-<name>.mjs`（または `.ts`）を作成します。ポリシーゲートは終了コード 0/1 で終了します。
   ラチェット方式のゲートは、`collect-metrics.mjs` を介して `quality-metrics.json` にメトリクスを出力します。
2. `"check:<name>": "node scripts/check/check-<name>.mjs"` を `package.json` に追加します。
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

## 合理化バックログ（ROIレビュー — フェーズ9・ウェーブ3）

このインベントリは、2026-06-17 に `ci.yml` と照合済みです（以前のバージョンでは
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence` が抜けていました）。照合済みセットのROIレビューにより、
以下の合理化候補が特定されました。**マージは機械的なCI変更であり、切り替えや削除はオペレーターに委ねられたポリシー判断です。** 以下の項目はまだ適用されていません。

**上記に記載されていないもの**（参考情報、シグナルが弱いもの）：`docs-lint` ジョブ
（markdownlint + Vale、ジョブ全体が `continue-on-error`）と、スタンドアロンのスキャナーワークフロー
`semgrep.yml` / `codeql.yml` / `scorecard.yml` です。`semgrepFindings: 0` は
`quality-baseline.json` にありますが、`ci.yml` のブロッキング・ラチェットには接続されておらず、このメトリクスは現在孤立しています。

### マージ / 重複排除（機械的、低リスク）

各候補は、2026-06-17 時点の実稼働ゲート状態に対して検証済みです（信頼しつつ検証する方式）。
いくつかの「明らかな」マージには負債が隠れていることが判明し、**そのまま置き換えられるものではありません。**

- **`check:docs-sync` が2回実行される** — `lint` ジョブで単独実行され、さらに `check:docs-all`（`docs-sync-strict`）と husky の pre-commit フック内でも実行されます。✅ **完了** — 単独の `lint` 呼び出しを削除しました。
- **CVEスキャン** — ❌ **そのままマージできません。** `audit:deps` は5つすべてのロックファイルについて、重大なアドバイザリと不完全な監査をブロックします。一方、現在のポリシーでは高レベルのアドバイザリは警告として報告します。`check:vuln-ratchet`（osv）は、チェックイン済みベースラインに対する_regression_の場合のみ失敗し、必要な場合は測定値の欠落も拒否します。セマンティクスが異なるため、`audit:deps` を削除すると、重大度が絶対的な重大ゲートと、独立したパッケージ監査の証跡が失われます。両方を維持してください。
- **循環検出** — ✅ **完了**（#15159 G-01/G-02）。ここで以前使われていた説明では、`check:cycles` を「グリーンで、精選された」ゲートとし、`check:circular-deps`（dpdm）が91件の循環を報告したため、ブロッキングのまま維持することを正当化していました。そのグリーンは**誤ったグリーン**でした。`check:cycles` は5つのサブディレクトリ（450ファイル）だけをスキャンし、静的な `import|export … from` にしか一致せず、すべての `@/` および `@omniroute/open-sse/` の指定子を無視していたため、リポジトリの大半を占める動的インポートとエイリアスによる循環を検出できませんでした。修正後のゲートは `src` + `open-sse`（5023ファイル）を走査し、TypeScript ASTから指定子を収集します（そのため `import("…")` はカウントされますが、型位置の `typeof import("…")` はカウントされません）。さらに、tsconfig の `paths` を解決します。循環は0件ではなく、**14件**検出されます。既存の循環14件はゲートPRで修正できないため、`check:cycles` は現在 **ラチェット**（`--ratchet`、`quality-baseline.json` の上限 `metrics.cycles.value = 14`、`direction: down`）になっています。つまり、_regression_をブロックし、件数は減少のみ可能です。CIでは `npm run check:cycles:ratchet` を実行します。削減作業は **A-01** と連動します。より広範なセカンドオピニオンとして、`check:circular-deps`（dpdm）は参考扱いのまま維持します。
- **複雑度** — ✅ **完了**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：ESLintの走査を1回に集約し、cyclomatic と max-lines のベースラインおよび cognitive のベースラインを独立させるために ruleId ごとにカウントします。個別の `check:complexity` / `check:cognitive-complexity` は、ローカルでの `--update` 用に引き続き残します。
- **`/api` の幻覚防止** — ✅ **完了**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：`src/app/api` のファイルシステムインベントリを1回だけ作成し、openapi-routes と docs-symbols は引き続き独立して報告します。個別の項目はローカル実行用に残します。
- **`check:node-runtime` が11個のジョブで実行される** — ⚠️ **ROIが低い。** それぞれ別のランナーで、チェックは1秒未満です。合計の削減効果は約10秒ですが、ジョブごとの安価なガードを失うことになります。変更に伴う手間に見合いません。
- **CIのlintにおける `typecheck:noimplicit:core`** — ✅ **lintジョブから削除済み**（参考扱いの `continue-on-error` でした）。ブロッキング対象の型サーフェスは `typecheck:core` + `check:type-coverage` です。ローカルスクリプトは保持しています。

### 切り替え / 判断（オペレーターポリシー）

- `check:openapi-security-tiers`（参考扱い） — ❌ **そのまま切り替えることはできません。** `LOCAL_ONLY_API_PREFIXES` 配下の複数の `traffic-inspector` ルートに `x-loopback-only: true` アノテーションがないことを警告しつつ、終了コード0で終了します。強制するには、まず `openapi.yaml` にこれらのアノテーションを追加する必要があります。
- `typecheck:noimplicit:core`（参考扱い） — ブロッキングの `check:type-coverage` ラチェットに大部分が包含されています。ラチェットに切り替えるか、冗長な2回目の `tsc` パスを削除してください。
- `test:vitest:ui`（現在は**ブロッキング**） — 既存の失敗は `vitest.config.ts` で `// #8618` の追跡コメントとともに明示的に除外されています。新たな失敗があるとジョブは失敗します。
- `check:secrets`（gitleaks、3件の文書化済み誤検知で凍結されたブロッキング・ラチェット） — 3件を許可リストに追加して0件にするか、参考扱いに降格します。GitHubネイティブのシークレットスキャンおよび `check:public-creds` と重複しています。
- `check:pr-evidence`（ブロッキング、PR本文の文章をgrep） — 誤検知のリスクが高く、削除するとHard Rule #18の適用が弱まるため、これは実際のポリシー判断です。
- `semgrep`（スタンドアロン、参考扱い） — OWASPのファミリーについてCodeQLと重複しています。ベースラインをラチェットに接続するか、削除してください。

---

## 関連ドキュメント

- サプライチェーン（provenance、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — キーセット同等性ゲート

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`、ジョブ `i18n-ui-coverage`）。
すべての `src/i18n/messages/<locale>.json` のリーフキーセットを `en.json` と比較し、キーが追加された時期に関係なく、欠落または余分なリーフがあると失敗します。`__MISSING__:` プレースホルダーは存在するものとして数えられます（その内容は比率ゲートの対象です）。これは、差分ベースおよびパーセンテージベースの2つのゲートを完全に補完するものです。`check-ui-keys-coverage` はロケールごとに80%の下限を適用し（約13,000キー中43個の欠落でも99.7%と表示されます）、`check-new-key-coverage` はPRが `en.json` に追加したキーのみを判定します。ロケールのバッチはブランチ作成日の `en.json` から生成され、ベース側ではキーの追加が続く中で何日も翻訳が行われます。バッチPR自体はキーを追加しないため、バッチ1（#13044）が9ロケールで43キー不足の状態で取り込まれ、バッチ2（#13660）が8ロケールで10キー不足の状態で取り込まれた際（2026-09-15）も、両方の兄弟ゲートは何も報告しませんでした。赤色になった場合は `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` で修正します。`extra` リーフはソースから削除されたことを意味し、`sync-ui-keys` が削除します（デフォルトは `--prune-extra`）。`--warn` は失敗させずに報告します。
`--catalog=cli` は `bin/cli/locales` に対して同じ比較を実行します（`npm run i18n:check-keys:cli`）。
両方のステップはジョブ `i18n-ui-coverage` に含まれます。絶対チェックはリリースモードのみで実行されます。機能PRでは `SKIP reason=pr-mode` となり、修正はリリース更新または翻訳ウェーブで実施され、機能PRでは実施されません。ロケールカタログを変更するPRでは、代わりに各カタログがマージベースに対して判定されます（ジョブ `i18n-ui-coverage` の「2つのモード」を参照）。

#### `check-new-key-coverage` — 新規キーi18nゲート

`check-ui-value-drift` の兄弟ゲートです。前者は、英語の値が**書き換えられた**にもかかわらず翻訳が古いままになっているケースを検出します。こちらは、英語のキーが**追加された**にもかかわらず、一部のロケールに反映されていないケースを検出します。

`check-ui-keys-coverage` ではこの種類の問題を検出できません。ロケールごとにパーセンテージの下限を適用するため、約13,000個のリーフ中11個のキーが欠落していてもカバレッジは99.9%になります。言語ごとのパーセンテージでは、「この機能が未翻訳のままリリースされた」ことを表現できません。機能全体が新しいロケールにテキストなしで追加されても、数値が変わらない可能性があります。

このゲートが想定しているインシデントは次のとおりです。Orchestration Canvasのフェーズ3では、その時点で存在していた42ロケールに11個のキーを翻訳しました。その数時間後、EU言語バッチ（#13044）によってリポジトリは51ロケールになりましたが、新たに追加された9ロケール（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）には、それらのキーが反映されませんでした。`deepMergeFallback` は欠落したキーを英語に置き換えるため、障害モードは空白のUIではなく未翻訳のUIでした。これは実際の問題であり、仕組み上、気づきにくいものでした。

兄弟ゲートと同様に、これは**差分を認識**し、マージベースの英語とワーキングツリーを比較します。そのため、既存の欠落は固定されたままとなり、導入のための移行も不要でした。

**`__MISSING__:<english>` マーカーは、2026-09-17以降、このゲートを満たしません。** 以前は文書化された保留方法でした。実行時には正しい英語にフォールバックするためです。しかし2026-09-16、8件の機能PRが61キーを追加し、翻訳する代わりに65ロケールすべてへマーカーを設定しました。このゲートはすべてを受け入れ、PRを阻止するものはなく、その後、リリース先端でブロッキング対象の実翻訳比率ゲートが全員に対して失敗しました（pt-BRは3.2% > 2.5% + 0.5）。現在、マーカーは翻訳欠落として判定されます。2026-11-13以降はリリースモードのみです。機能PRでは `SKIP reason=pr-mode` となり、リリースPR（`BASE_REF=origin/main`）では、そのサイクルで追加されたすべてのキーがゲートの判定対象になります。赤色になった場合は、リリース更新または翻訳ウェーブで `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` を実行して修正します。または `npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`、デタッチ状態でも安全に実行可能）で、すべてのロケールを並列処理できます。これは `OMNIROUTE_TRANSLATION_*` 環境変数なしでは開始しません。英語のままにしておく必要があるキー（固定された製品名、エンジン名、フラグ名）は `scripts/i18n/untranslatable-keys.json` に登録し、マーカーで保留してはいけません。`vi` ではマーカーが全面的に禁止されています（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 保留テストゲート

`vitest.config.ts` の `exclude` リストにあるファイルは実行されないテストであり、ツリーを読む人にはカバレッジがあるように見えます。62個のファイルが、`// #8618 — pre-existing failure; remove this exclusion when fixed` というコメントの後ろに蓄積されました。Issue #8618は2026-08-11にクローズされましたが、その問題に関連付けられていたリストは45件から62件へ増え、新しく追加された各項目にも終了済みのIssueを指すコメントが引き継がれました。最終的にリストをファイルごとに測定したところ（#13204）、62件中**51件はソースを変更せずに現在のツリーに対して合格しました**。

このゲートでは、実ファイルに解決されるすべての除外について、(a) 追跡用Issueを記載し、(b) 測定済みのステータスとともに `config/quality/vitest-exclusions.json` に登録することを求めます。これにより、追加は60件の配列にもう1行を加えるのではなく、専用ファイルでレビュー可能な差分になります。除外されたテストを再実行することは意図的に行いません。約10分かかり、定期ジョブで実行すべきものだからです。インベントリには、それぞれが最後に測定された日時が記録されます。
