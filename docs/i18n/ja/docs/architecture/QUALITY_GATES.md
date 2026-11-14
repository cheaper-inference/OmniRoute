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

どちらのワークフローも、 PRsからmain/releaseブランチへの変換、 `main`へのプッシュ、手動ディスパッチ、およびグループのマージ イベントをカバーします。プッシュ、ディスパッチ、およびマージグループは、選択されたすべてのものを実行します。 `release/**`にプッシュしても開始されません (2026-10-18): 各変更はすでにそのPR上でマトリックスを実行しており、マージされた組み合わせは Release-Green の仕事です (`docs/ops/RUNNER_BOX.md` →ホスト レーン)。フォークおよびマージ グループは、そうでない場合は自己ホスト ランナーを選択するジョブにホスト ランナーを使用します。展開前に十分なホスト容量を検証する必要があります。

通常のPR高速選択を実行します。アドミッション ポリシーの`full-code`および`full-code-e2e`レーン (E2E、統合、パッケージ アーティファクト、 Electronスモーク、 Bun SQLite、エコシステムおよびプロトコル クライアント) は、 Mergify キュー ドラフトまたはフル実行 ( `gh workflow run ci.yml --ref <branch>`) でのみ実行されます。

各JSON受領書は、チェックアウトされたSHA、ワークフローの実行および試行を識別します。 CLI 、 checkout/event SHA不一致を拒否します。ワークフロー テストは、ポリシー メンバーシップを判定ジョブの`needs`リストにバインドするため、新規または削除されたレーンが黙って消えることはありません。領収書は独自のワークフローをカバーしており、公開、展開、または既存のアドバイザリー スキャナーの内部はカバーしていません。ブランチ ルールで両方のチェック名をアクティブにすることは、別個の管理上の変更です。これらのジョブを追加すること自体はブランチを保護しません。

### キューをマージする

`queue`ラベルは、 PR Mergify キュー (`.mergify.yml`) に送信します。 Mergify は`mergify/merge-queue/`ブランチ上でドラフトPRを開き、 CIそこで完全な選択を実行し、 `Gate / CI`、 `Gate / Quality` 、 `Merge integrity (changelog + generated skills)`が通過すると元のPRがマージされます。

Mergify はキューの概要をドラフトの説明に書き込み、他のアプリもそれを編集できます。このようなドラフトの`pull_request` `edited`イベントは独自の同時実行グループ (`-queue-edit-<run_id>`) を使用するため、ドラフトの実際の実行をキャンセルできず、ゲートとマトリックスをスキップします。 `Merge integrity`だけがまだ実行されます。 Mergify はスキップされた`Gate / CI`失敗したチェックとして読み取り、 PRデキューするため、スキップされたゲート ジョブには別のチェック名が付けられます。

デキュー後、プッシュによってPR再キューされるとは限りません。 `@mergifyio queue`にコメントしてください。

### 受諾リデューサーに証拠が保持されている

`scripts/quality/validate-release-acceptance.mjs`提供されたプランとそのマニフェストを削減します。この計画が完全なリリース パイプラインをカバーしているかどうかは確立されていません。そのレポートでは、プランが`VERIFIED`である場合でも、明示的に`releaseAcceptance: false`が設定されます。 `release-acceptance.yml`ワークフローでは、実際のビルド、パッケージ、ブート、またはプロモーションのレシートではなく、シャドウ フィクスチャが引き続き使用されます。

CLI `--evidence-root`保持された証拠を検証することを要求します。ファイルは`<evidence-root>/<artifact_id>/<member>`として解決され、 SHA-256としてハッシュされます。証拠のないPASSレコード、欠落または変更されたファイル、安全でないパスまたはシンボリックリンクがあると、検証が妨げられます。欠落しているファイルは、空の成功ログと同等ではありません。既存のSHA/run/attemptチェックは独立したままです。一致するバイトによって古いレシートを救済することはできません。ファイルの整合性は、実行の信頼性やアーティファクトのプロモーションの証拠ではありません。

### 静的スキャン インベントリ

バージョン管理された npm-alias インベントリと静的スキャン メンバーシップは`config/quality/gate-manifest.json`に存在します。 `npm run check:gate-manifest`実行して、スクリプト名と正確なコマンドを`package.json`に対して検証します。追加、削除、およびコマンド ドリフトは、ローカル フックとCIの分類変更ジョブの両方で失敗します。エイリアスは、ワークフロー ジョブ、マトリックス インスタンス、またはテスト ケースではありません。これらのカウントを交換可能として表現してはなりません。

`npm run quality:scan -- --list`または`npm run quality:scan:fast -- --list`を使用して、選択したエイリアスを実行せずに検査します。ランナーは npm エントリポイントを呼び出すため、そのランタイム (構成されているBunを含む) が保持されます。マニフェストには、これらのプロファイルの外部にあるエイリアスが個別に呼び出されたものとして記録され、読み取り専用スキャン プロファイルではメンテナンス コマンドが禁止されています。

これらのプロファイルは静的スキャンのみをカバーします。これらは、製品テスト、適用範囲、パッケージング、外部チェック、または候補者の完全なリリースの受け入れを認証するものではありません。ワークフローアドミッションでは、リンクされた`config/quality/admission-policy.json`および`scripts/quality/admission-verdict.mjs`を使用します。リリースオブザーバープロファイルは別個のままです。該当する小切手と領収書を個別に検査します。 `audit:deps`、突然変異テストの選択、および変換チェックを含む、完全なオブザーバーの静的コマンドは`config/quality/release-green-static-profile.json`で宣言されます。ローダーは、 package.jsonおよびモデル化されたCI/Quality宣言に対して npm コマンドを検証します。シェルトークンを引数として実行するのではなく、ドリフトを拒否します。必要なスキャナーSKIP/INCOMPLETE出力はPASSを確立できません。プロファイルはその外部除外を記録し、ホストされたカバレッジ、テスト マトリックス、パッケージまたは展開の証拠を置き換えるものではありません。以下の散文目録は参考資料であり、ゲートが実際に稼働したことを証明するものではありません。

スクリプトは`scripts/check/` (ポリシー ゲート) および`scripts/quality/` (ラチェット エンジン) の下に存在します。 CIの信頼できる情報源は`.github/workflows/ci.yml`です。

### PR高速パス (`quality.yml`) をリリースする

`.github/workflows/quality.yml` 、 main/release PRs上のCI補完し、 `main`にプッシュし、グループをディスパッチおよびマージします。 PRsパスでフィルターされた高速チェックを使用します。永続的に無効になった重複ビルドは削除されました。実際のbuild/package/bootチェックはCIに残ります。ユニット スイートと vitest はCI (`Unit Tests (N/8)`および`Vitest`) でのみ実行されます。

| 仕事                                             | 範囲                                                                                                                        | ブロッキング           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs と docs-all                                                                                    | はい                   |
| `Fast Quality Gates`                             | コードPRs;静的チェック、タイプチェック、ダッシュボードのタイプチェック、影響を受ける単体テスト、忘れられた兄弟テスト (勧告) |
| `No new ESLint warnings`                         | コードPRs;抑制を意識した糸くずガード                                                                                        | はい、フォークも含めて |
| `Merge integrity (changelog + generated skills)` | 非ドラフトPRs;変更ログと生成されたスキルの同期                                                                              | はい、フォークも含めて |

#### 忘れられた兄弟のテストレポート

`npm run check:forgotten-sibling-tests` `Fast Quality Gates`のアドバイザリー ステップとして実行され、テスト影響マップの背後でインポート リゾルバーを再利用します。変更されたすべての運用モジュールについて、プル リクエストの差分に候補テストが存在しない場合、決定論的な`changed module/symbol -> static consumer -> candidate sibling test`チェーンが報告されます。マークダウンの概要とJSONの結果は、ブロッキング ロールアウト前の調整のために`forgotten-sibling-tests`ワークフロー アーティファクトとして保持されます。

バレルの再エクスポートと動的インポートは、解決策の診断のみを目的としています。妨げとなる所見を作成することはありません。レビューされた例外は`config/quality/forgotten-sibling-allowlist.json`にあります。各エントリでは、コンシューマおよび候補テストの名前を指定し、具体的な根拠を示し、 GitHub issue または pull request にリンクする必要があります。不正なエントリはフェールクローズされます。例外では、削除された候補テストや`.skip`/`.todo`を追加する diff を抑制することはできません。アサーション弱化およびその他のマスキングは、独立してブロックする`check:test-masking`ゲートによって所有されたままになります。

### ジョブ: `lint`

すべてのPRから`main`で実行されます。ブロックは失敗時にマージされます。

| スクリプト (`npm run ...`)        | 検証します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ブロッキング                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.jsバージョンはサポート範囲内です                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:cycles`                    | すべての`src/` + `open-sse/`にわたる循環インポート (AST ベース、tsconfig `paths`解決済み)。 Bare は、サイクルが存在するたびに 1 を終了し ( #15281以降フェイルクローズされます)、 SCCsをリストします。 `check:cycles:ratchet` ( CI実行するもの) は、カウントが`quality-baseline.json` —の`metrics.cycles`上限 (現在 14、 `direction: down`を超えるとブロックされるため、下降することしかできません (#15159 G-01/G-02)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい（ラチェット）                            |
| `check:boundary`                  | `open-sse → src`カップリング: エンジンからアプリへの一意のファイル間インポート (`scripts/quality/measure-boundary.mjs`; エッジ リストは v4 core/module-split修復バックログです)。裸の=アドバイザリ レポート ( `quality:boundary`と同じ)。 `check:boundary:ratchet` ( CI実行するもの、 `quality.yml`高速ゲート ラチェット ループでも) は、カウントが測定された 771、 `direction: down`でシードされた`quality-baseline.json` —の`metrics.boundaryOpenSseToSrc`上限を超えるとブロックします。 `--update`それを下げるだけです。 PRsの基底相対 (`--base-ref`、以下を参照)                                                                                                                                                                                                                                                                                                                                                                                                                                | はい（ラチェット）                            |
| `check:route-validation:t06`      | Zodスキーマがすべてのルートに存在する (Tier 6 ポリシー)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any`数が予算を超えない (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:provider-consistency`      | `providers.ts`内のすべてのプロバイダーには、 `providerRegistry.ts`内に一致するエントリがあります (また、その逆もホワイトリスト内にあります)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:model-lifecycle`           | 手動で管理される 3 つのルーティング テーブルは、チェックインされたライフサイクル スナップショット (#11503) と一貫性を保ちます。 `FITNESS_TABLE` (`taskFitness.ts`) は、 `REGISTRY`がルーティングできる廃止された ID をスコアしません。すべての`BUILT_IN_ALIASES`ターゲットは`REGISTRY`に存在しますが、リタイア ID スナップショットには存在しません。 `REGISTRY`内に残っている廃止されたすべての ID は、 `allowedRetiredInCatalog`に転送またはリストされます。そして、そのスナップショットでは`DEFAULT_DEGRADATION_MAP`ソースまたはターゲットがリタイアされたように見えません。これは、モデルが現在ライブアップストリームによって提供されていることを証明するものではありません。オフライン— `config/quality/model-lifecycle.json`と比較し、 `npm run quality:refresh-model-lifecycle` (ネットワーク; CIに接続されていない) を使用して手動で更新します。 `allowedRetiredInCatalog`はバーンダウン ラチェットです。追跡の問題がある場合のみエントリを追加します。                                      | はい                                          |
| `check:fetch-targets`             | クライアント側`src/`内のすべての`fetch("/api/...")`実際の`route.ts`に解決されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                          |
| `check:deps`                      | リポジトリ内のすべての`package.json`にわたるすべての`npm install` -able dep は`dependency-allowlist.json`にあります。固定されていない、またはずさんなパッケージにフラグが立てられた新しいパッケージ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                          |
| `audit:deps`                      | 5 つの独立したロックファイルすべて (root、 Electron、 OpenCodeプラグイン、 v1/v2 、プロバイダー) の npm 監査。重要な勧告はブロックされます。高度な勧告は引き続き警告として表示されます。 Missing/failed監査はINCOMPLETEとブロックです。スコープごとのロック ハッシュとレポートは保持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                          |
| `check:lockfile`                  | `package-lock.json`整合性— https レジストリ、整合性ハッシュ、ホスト オーバーライドなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                          |
| `check:licenses`                  | 実稼働依存関係のSPDXライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                          |
| `check:tracked-artifacts`         | ビルドアーティファクトなし / コミットされた`node_modules`シンボリックリンク (ハスキーなプリコミットでも実行; プリプッシュは意図的に軽い— #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                          |
| `check:ai-attribution`            | PRコミット、タイトル、本文にAI/bot `Co-Authored-By`トレーラーまたは AI 生成フッターはありません。 —ハード ルール#16 ( PR→ `release/**`の`quality.yml`高速ゲート ループ内で、 —はイベント ペイロード、no-op PRs —およびPR→ `main`の`ci.yml` lint の PR のみのステップを読み取ります。ハスキー`commit-msg`フック、人間の共著者が許可されます#14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | すべてのVitest除外には追跡問題の名前が付けられ、 `config/quality/vitest-exclusions.json` (#13204) に表示されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                          |
| `check:file-size`                 | ソース ファイル ( `src/`、 `open-sse/`、 `electron/`、 `bin/`の`.ts`/`.tsx` ) は`cap`内に保持され、テスト ファイル (`*.test.ts(x)`) は`testCap`内に保持されます。 `file-size-baseline.json` (`frozen` / `testFrozen`) で凍結されたファイルは、記録されたサイズを超えてはなりません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                          |
| `check:error-helper`              | executors/handlersのエラー応答は`buildErrorBody()` / `sanitizeErrorMessage()` (ハード ルール#12) を使用します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:migration-numbering`       | 移行SQLファイルには連続した番号が付けられ、ギャップや重複はありません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:public-creds`              | `publicCreds.ts`の外にはリテラルOAuth `client_id`/`client_secret`または Firebase Web キーはありません（ハード ルール#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                          |
| `check:db-rules`                  | `src/lib/db/`モジュールの外部に生のSQLありません。 `localDb.ts`からのバレルインポートはありません (ハードルール#2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:known-symbols`             | ディスパッチ テーブルに登録されているプロバイダー エグゼキュータ、ルーティング ストラテジー、およびトランスレータがディスク上のファイルと一致する—孤立したシンボルや未宣言のシンボルがない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                          |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートは`isLocalOnlyPath()` (ハード ルール#15/#17) によって分類されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:test-discovery`            | リポジトリ内のすべての`*.test.ts` / `*.spec.ts`ファイルは、少なくとも 1 つのテスト ランナーによって収集されます (ラチェット: `test-discovery-baseline.json`の孤立リストは縮小することしかできません)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                          |
| `check:test-tla-order`            | `tests/unit`の下の`node:test`ファイルはテストを登録せず、トップレベルの`await`にヒットし、その後さらに登録します (#18045; ラチェット: `test-tla-order-allowlist.json`縮小のみ可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                          |
| `check:agent-skills-sync`         | 生成されたエージェント スキル アーティファクトはソース カタログと一致します (ドリフトなし)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | プロバイダーlogos/assetsは記録された来歴エントリを保持します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON構成ファイルが解析され、リポリント ルールを満たす                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | エラーなしのTypeScriptコンパイル (勧告警告のみ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                          |
| `typecheck:noimplicit:core`       | 厳格な`noImplicitAny` —前向き。多くの既存の呼び出しサイトでは依然として注釈が必要です                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **アドバイザリー**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`スコープは`src/app/(dashboard)/**` (#7033) — `typecheck:core`の厳選された 27 ファイルの許可リストにはダッシュボードTSXが含まれておらず、 `next build`もそれを型チェックしないため (`next.config.mjs` set `ignoreBuildErrors: true`)、そこでの孤立識別子の回帰 (#6625/#6909) はCIには見えませんでした。凍結されたper-file/per-TS-codeカウント ベースライン (`config/quality/dashboard-typecheck-baseline.json`、 `check:known-symbols`と同じ古い強制パターン) との差分。 NEW —のみがゲートに失敗します。既存のエラーが修正されると、 `--update`でラチェットダウンします。                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`) を介したアプリ全体の運用タイプ チェック、surface `typecheck:core`の 27 ファイルの許可リスト、およびダッシュボード ゲートはカバーされません。 `config/quality/build-typecheck-baseline.json`との差分。 (ファイル、コード) ごとの新しいカウントまたは増加したカウントは失敗し、カウントが低い場合はラチェットするように求められます。 `--update` 、実行に新しいペアまたは発生したペアが含まれている間は`--force-regressions`が渡されない限り拒否し、新しくサイレント化されたファイルは`--force-nocheck`が渡されない限り拒否します。そのため、ベースラインを広げて緑色にすることと、永続的なサイレンスを許可することは、2 つの別個の意図的な行為です。裸の`--force`は拒否されます。また、 `config/quality/ts-nocheck-baseline.json`に対して`@ts-nocheck`のビルド スコープをスキャンします。これを使用するファイルは診断をまったく報告せず、そうでない場合はすべてのゲートから見えなくなるためです。 | はい                                          |

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
| `check:complexity`           | ファイルレベルの循環的複雑度は上限 (core ESLint `complexity` + `max-lines-per-function`) を超えません                                                                       | はい                     |
| `check:cognitive-complexity` | 認知複雑性ラチェット (`eslint-plugin-sonarjs`) —個別のESLintパス。 CI両方を単一の`check:complexity-ratchets`ステップとしてマージして実行します                              | はい                     |
| `check:dead-code`            | 未使用のエクスポート/ファイルのラチェット (knip) がベースラインと比較して後退しない                                                                                         | はい                     |
| `check:compression-budget`   | 圧縮ベンチマーク バジェット—のエンジンごとのトークン節約の下限が後退してはなりません                                                                                        | はい                     |
| `check:type-coverage`        | パーセント型ラチェット (`type-coverage`) は退行しません。主に`typecheck:noimplicit:core`を包含します                                                                        | はい                     |
| `check:codeql-ratchet`       | オープンCodeQLアラート数が後退しない ( `gh api`経由で読み取り、トークンなしのグレースフルスキップ) —リフレッシュ ケイデンスと手動トリガー: 下記の「CodeQLラチェット」を参照 | はい                     |

### ジョブ: `quality-extended`

ジョブ全体がアドバイス (`continue-on-error: true`) です。 npm ベースのラチェットは実際に実行されます。外部スキャナは`gh release download`経由でインストールされ、バイナリがまだ存在しない場合は自己スキップ (0 で終了) します。

| スクリプト               | 検証します                                                                                                                                                                                                                 | ブロッキング                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | 循環依存関係なし (dpdm)                                                                                                                                                                                                    | **アドバイザリー**                                  |
| `check:bundle-size`      | バンドルのサイズが上限を超えないこと                                                                                                                                                                                       | **アドバイザリー**                                  |
| `check:secrets`          | バイナリが存在しない場合、シークレット スキャン (gitleaks) —がスキップされる                                                                                                                                               | **アドバイザリー**                                  |
| `check:vuln-ratchet`     | 依存関係の脆弱性 (osv-scanner) —に戻らない、未測定の場合、 `--ratchet` INCOMPLETE (exit 2) として失敗する                                                                                                                  | **アドバイザリー**                                  |
| `check:workflows`        | ワークフロー lint (actionlint + zizmor); missing/brokenスキャナ、無効なレポート、または欠落しているラチェット ベースラインは、 INCOMPLETEとして失敗します。有効な結果は、選択したstrict/advisory/ratchetポリシーに従います | 実行が必要です。 CIでの zizmor ラチェットのブロック |
| `check:openapi-breaking` | ピン留めされたイベントコミットに対するパブリックAPIコントラクト (PR merge-base、push before、merge-group Base、 scheduled/manual checkout firstparent)。必要な測定が失敗して終了しました                                   | **--ratchetによるブロック**                         |

### ジョブ: `docs-sync-strict`

すべてのPRから`main`で実行されます。ブロックは失敗時にマージされます。

| スクリプト                     | 検証します                                                                                                                                                                  | ブロッキング               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 以下の6つのサブゲートを順番に実行するメタゲート                                                                                                                             | はい                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txtバージョンの一貫性                                                                                                                             | はい                       |
| ↳ `check:docs-counts`          | 散文内のカウント (プロバイダー数、移行数など) は、実際のカウントのラチェット ウィンドウ内にあります。                                                                       | はい                       |
| ↳ `check:env-doc-sync`         | `.env.example`のすべての環境変数はドキュメント テーブルに文書化され、その逆も同様です。                                                                                     | はい                       |
| ↳ `check:deprecated-versions`  | ドキュメントには非推奨のバージョン文字列はありません                                                                                                                        | はい                       |
| ↳ `check:doc-links`            | ドキュメント内の内部マークダウン リンクは実際のファイル (`[text]`/`(path)`形式) に解決されます。                                                                            | はい                       |
| ↳ `check:fabricated-docs`      | ドキュメントで引用されているルート、環境変数、 CLIコマンド、フック名、ファイル パスはコードベースに存在します。 `--strict`経由のハード ゲート。フラグなしのソフトフェイル。 | はい ( CIの`--strict`経由) |
| `check:cli-i18n`               | CLIコマンド文字列はすべての i18n ロケール ファイルに存在します。                                                                                                            | はい                       |
| `check:openapi-coverage`       | OpenAPI仕様は実際のルートの少なくともラチェットフロアをカバーします                                                                                                         | はい                       |
| `check:openapi-security-tiers` | `openapi.yaml`のセキュリティ層のアノテーションは`routeGuard.ts`分類と一致しています                                                                                         | **アドバイザリー**         |
| `check:openapi-routes`         | `openapi.yaml`のすべてのパスは実際の`route.ts` (幻覚防止) に解決されます。                                                                                                  | はい                       |
| `check:docs-symbols`           | `docs/**/*.md`内のすべての`/api/...`参照は実際の`route.ts` (幻覚防止) に解決されます。                                                                                      | はい                       |
| `i18n translation drift`       | i18n ロケール ファイルの未翻訳キー—警告のみ                                                                                                                                 | **アドバイザリー**         |

`docs/diagrams/`の下に 12 個のREADME SVGsが生成されます (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams`それらすべてを再生成します)。それぞれには、コミットされたファイルが古い場合に失敗するバイト比較単体テスト (`tests/unit/docs/readme-*-svg.test.ts`、ジョブ`test-unit`) があり、 `check:docs-counts` `<text>`ノード—から正規の数値を読み取ります。そのため、アウトライン ステップではファイル内のすべてのアウトライン文字列が非表示の`<text>`として保持されます。 SVG canonical-numbers チェックは、 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) にリストされているファイル`docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`、および`public/images/tier-flow-dark.svg`および`tier-flow-light.svg`) を読み取ります。永久無料、カタログエントリー、定期プール、およびスコアリングファクターの主張は`promise-pillars.svg`、 `free-tier-budget.svg`および`strategies-grid.svg`とも読み取られます。 `free-tier-budget.svg`ライブ カタログ ローダーから図を描画するため、ファイルが再生成されるまで`FREE_MODEL_BUDGETS`またはプロバイダー表示名 reds CIに変更します。

### ジョブ: `i18n-ui-coverage`

| スクリプト                            | 検証します                                                                                                                                                             | ブロッキング       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (インライン) | UI i18n キー カバレッジは≥ 65%                                                                                                                                         | はい               |
| `check-ui-value-drift` (インライン)   | 書き直された英語**価値**古い翻訳を残さない                                                                                                                             | はい               |
| `check-new-key-coverage` (インライン) | あ**新しい**英語キーはすべてのロケールで翻訳されます— 、 `__MISSING__:`マーカーは拒否されます。                                                                        | はい               |
| `check-translation-ratio`             | ロケールごとの実際の翻訳率 (英語と同一/プレースホルダ/ホワイトリスト外の欠落した葉) は、 `config/quality/i18n-translation-baseline.json` +スラックを超えてはなりません | **アドバイザリー** |

`fetch-depth: 0` —値ドリフト ゲートの差分`en.json`とマージ ベースが必要です。

#### `check-ui-value-drift` —古い翻訳ゲート

他のゲートでは構造的に認識できない 1 つの i18n 回帰を捕捉します。英語の値が書き換えられ、_前の_ 英語から派生した翻訳が残されるため、英語以外のユーザーは自信を持って表現された、間違ったコピーを読み続けます。

これは実際に発送されました。 `oauthModal.googleOAuthWarning` 、 Antigravityログイン ヘルパー (#5203) が登場したときに書き直されました。** 43 ロケール中 39 か所**オペレーターに「完全なURLコピーして下に貼り付ける」ように指示するテキストが保持されていたため、そのプロバイダーではフローを完了できませんでし— 。 #8463まで気付かれなかった理由は次のとおりです。

- `sync-ui-keys` 、次のキーのみをバックフィルします。**不在**、決してそうではありません**古い**;
- `check-ui-keys-coverage` key _presence_ をカウントするため、古い翻訳はカバーされているとスコアが付けられます。
- `check-translation-drift` `docs/i18n/<locale>/**.md`ドキュメントのミラーリング—を追跡しますが、 `src/i18n/messages/*.json`を読み取ることはありません。 2026-09 の再同期以降、ジョブ`docs-sync-strict`がブロックされています: コア ドキュメント→ `npm run i18n:run -- --files=<doc>`を編集します (セクション レベル、安価)。

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

基本カタログを読み取れない場合 (基本参照のない浅いクローン)、 `SKIP reason=base-unresolved`で 0 を終了し、 `check-openapi-breaking`をミラーリングします。

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

パフォーマンスのベースライン (ヒープ、 TTFB、ビルド時間) はゲートされずに記録されます。 [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) を参照してください。

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
- **勧告** — グローバル合計と固定ベースラインの比較。継承されたドリフトが無関係なPRを失敗させることはありません。ドリフトはリリース時の調整で再固定され、headroomジョブによって監視されます。

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

## ホワイトリストポリシー

既存の違反で失敗できないすべてのゲートは、凍結された許可リスト ( `KNOWN_STALE_DOC_REFS`、 `KNOWN_MISSING`、 `KNOWN_RAW_SQL`) を使用します。ポリシーは次のとおりです。

**根本原因を修正します。ホワイトリストは、違反がすでに存在しており、同じPRで修正できない場合にのみ使用してください。**

ホワイトリストにエントリを追加する場合:

1. 理由を含むコメントを含めてください。
2. 追跡の問題を参照してください (例: `// #3498 — Phase 2 feature, not yet implemented`)。
3. 違反を修正する同じPR内のエントリを削除します—アクティブな違反を抑制しなくなった古いエントリ自体が欠陥です (6A.3 の古い強制は、実装されると孤立したホワイトリスト エントリのゲートに失敗します)。

する**ない**ホワイトリスト エントリを追加して、テストをより速く通過できるようにします。ホワイト リストが増加している緑色のゲートは、誤った品質の感覚です。

### PRでゲートが失敗した場合

1. **ゲート出力を注意深く読んでください**— 、どのファイルまたはシンボルがルールに違反したかを正確に示します。
2. **違反を修正する**—ほとんどのゲートは、コードが正しいとすぐに通過する確定的なファイルシステム チェックです。
3. **違反が以前から存在している場合**(つまり、あなたはそれを導入しなかったが、ゲートがそれをカバーしました): 正当化コメントと追跡問題を含むホワイトリスト エントリを追加します。
4. **ゲートがラチェットの場合**(カバレッジ、 ESLint警告、重複、複雑さ): 変更によりメトリクスが悪化しました。根本的な問題を修正するか、変更が意図的でメトリックの低下—許容できる場合は (まれに) `npm run quality:ratchet -- --update`を実行しますが、その理由をPR説明に文書化します。
5. **勧告ゲート**(`continue-on-error: true`) は情報提供用の—であり、マージをブロックしませんが、 CI概要に表示されます。とにかく修正してください。

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

## 合理化バックログ (ROIレビュー— Fase 9 Onda 3)

このインベントリは、2026-06-17 に`ci.yml`に対して調整されました (以前のバージョンでは、 `audit:deps`、 `check:tracked-artifacts`、 `check:lockfile`、 `check:licenses`、 `check:dead-code`、 `check:cognitive-complexity`、 `check:type-coverage`、 `check:codeql-ratchet`、 `check:pr-evidence`が省略されていました)。調整されたセットのROIレビューにより、次の合理化候補が特定されました。**マージは機械的なCI変更です。 flips/drops 、オペレーターのために予約されたポリシー決定です。**以下はまだ何も適用されていません。

**上記でも文書化されていません**(アドバイザリー、低信号): `docs-lint`ジョブ (markdownlint + Vale、ジョブ全体`continue-on-error`) およびスタンドアロン スキャナー ワークフロー`semgrep.yml` / `codeql.yml` / `scorecard.yml`。 `semgrepFindings: 0`は`quality-baseline.json`にありますが、 `ci.yml` —のブロッキング ラチェットに接続されていません。メトリックは現在孤立しています。

### マージ/重複排除 (機械的、低リスク)

各候補は、2026 年 6 月 17 日にライブ ゲート状態に対して検証されました (信頼するが検証する)。いくつかの「明らかな」合併は負債を隠すことが判明し、**ない**クリーンなドロップイン。

- **`check:docs-sync` 2 回実行されます**— `lint`ジョブ内でスタンドアロンで使用され、再び`check:docs-all` (`docs-sync-strict`) 内で使用され、ハスキーな事前コミット フックが使用されます。 ✅**DONE** —スタンドアロン`lint`呼び出しが削除されました。
- **CVEスキャン**— ❌**NOTクリーン マージです。** `audit:deps` 、5 つのロックファイルすべてにわたって重要な勧告と不完全な監査をブロックしますが、現在のポリシーでは高レベルの勧告は警告として報告します。 `check:vuln-ratchet` (osv) は、チェックインされたベースラインに対する _regression_ でのみ失敗し、必要に応じて欠落している測定値を拒否します。異なるセマンティクス— `audit:deps`をドロップすると、絶対クリティカル ゲートと独立したパッケージ監査レシートが失われます。両方とも保管してください。
- **周期検出**— ✅**DONE** (#15159 G-01/G-02)。ここの古いテキストでは、 `check:cycles` 「グリーンで厳選された」ゲートと呼び、 `check:circular-deps` (dpdm) が 91 サイクルを報告したため、ブロックし続けることが正当化されました。あの緑は、**偽緑**: `check:cycles` 5 つのサブディレクトリ (450 ファイル) をスキャンし、静的`import|export … from`のみに一致し、すべての`@/`および`@omniroute/open-sse/`指定子を削除したため、リポジトリを支配していた動的インポート+エイリアス サイクルを確認できませんでした。修正: ゲートは`src` + `open-sse` (5023 ファイル) を歩き、 TypeScript ASTから指定子を収集し ( `import("…")`カウントしますが、type-position `typeof import("…")`はカウントしません)、 tsconfig `paths`を解決します。それは見つけます**14** 0 ではなくサイクルです。 14 の既存のサイクルをゲートPRで固定できないため、 `check:cycles`は**ラチェット**(`--ratchet`、天井`metrics.cycles.value = 14` in `quality-baseline.json`、 `direction: down`) —は、あらゆる _regression_ をブロックし、カウントは低下するだけです。 CI `npm run check:cycles:ratchet`を実行します。バーンダウンライド**A-01** 。 `check:circular-deps` (dpdm) は、より広範なセカンドオピニオンとして助言を提供し続けます。
- **複雑**— ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): 1 つのESLintウォークruleIdによってカウントされるため、循環+最大ラインと認知ベースラインは独立したままになります。個々の`check:complexity` / `check:cognitive-complexity`はローカル`--update`に残ります。
- **`/api`抗幻覚剤**— ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`の 1 つのFSインベントリ、openapi-routes + docs-symbols は依然として独立してレポートします。個人はローカルランのために残ります。
- **`check:node-runtime` 11 のジョブで実行されます**— ⚠️**低いROI。**それぞれが別個のランナーであり、チェックは< 1 です。合計~ 10 秒の節約。ジョブごとの安価なガードを失うことを防ぎます。解約する価値はありません。
- **CI lint 上の`typecheck:noimplicit:core`** — ✅**糸くずジョブから削除されました**(勧告`continue-on-error`でした);ブロッキング タイプ サーフェスは`typecheck:core` + `check:type-coverage`です。ローカルスクリプトは保持されます。

### 反転・決定（運営方針）

- `check:openapi-security-tiers` (勧告) — ❌**NOTきれいに反転可能です。** 0 で終了しますが、 `LOCAL_ONLY_API_PREFIXES`の下のいくつかの`traffic-inspector`ルートに`x-loopback-only: true`アノテーションが欠落していることを警告します。これを強制するには、最初にそれらのアノテーションを`openapi.yaml`に追加する必要があります。
- `typecheck:noimplicit:core` (勧告) —大部分は、ブロッキング`check:type-coverage`ラチェットに組み込まれます。ラチェットに切り替えるか、冗長な 2 番目の`tsc`パスをドロップします。
- `test:vitest:ui` （現在**ブロッキング**) —の既存の障害は、 `// #8618`追跡コメントにより`vitest.config.ts`で明示的に除外されます。新たな障害が発生すると仕事が失敗します。
- `check:secrets` (gitleaks、文書化された誤検知 3 件でブロックされるラチェット) —ホワイトリストに 3 件を 0 にするか、勧告に降格します。 GitHubネイティブ シークレットスキャン+ `check:public-creds`と重複します。
- `check:pr-evidence` (ブロッキング、greps PR-body 散文) —偽陽性リスクが高い。削除された場合、ハード ルール#18適用が弱まるため、これは本物のポリシー コールです。
- `semgrep` (アドバイザリー スタンドアロン) — OWASPファミリのCodeQLと重複します。ベースラインをラチェットまたはドロップに配線します。

---

## 関連ドキュメント

- サプライチェーン (来歴、 SBOM、Trivy、スコアカード): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` —キーセット パリティ ゲート

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`). Compares the leaf key set of every `src/i18n/messages/<locale>.json` with `en.json` and fails on any absent or extra leaf, regardless of when the key was added. `__MISSING__:` placeholders count as present (their content is the ratio gate's business). It is the absolute complement of the two diff-based/percentage gates: `check-ui-keys-coverage` enforces an 80 % floor per locale (43 absent keys out of ~13,000 still read 99.7 %) and `check-new-key-coverage` judges only the keys a PR adds to `en.json`. A locale batch is generated from the `en.json` of the day its branch is cut and translates for days while the base keeps adding keys; the batch PR adds no key itself, so both siblings stayed silent when batch 1 (#13044) landed 43 keys short in nine locales and batch 2 (#13660) 10 keys short in eight (2026-09-15). Fix a red with `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; an `extra` leaf means the source dropped it — delete it from the locale. `--warn` reports without failing. `--catalog=cli` runs the same comparison over `bin/cli/locales` (`npm run i18n:check-keys:cli`); both steps live in job `i18n-ui-coverage`.

#### `check-new-key-coverage` —新しいキー i18n ゲート

`check-ui-value-drift`の兄弟。これは、次のような英語の値を捉えています。**書き直された**その翻訳は残されました。これは英語のキーをキャッチします**追加した**一方、一部のロケールでは受信できませんでした。

`check-ui-keys-coverage`このクラスを認識できません。ロケールごとにパーセンテージの下限が適用され、 ~ 13,000 のうち 11 個のキーが存在しないため、カバレッジは 99.9% のままになります。言語ごとのパーセンテージでは、「この機能は翻訳されていない状態で出荷される」ことを表現することはできません。 —機能全体がテキストなしで新しいロケールに導入される可能性があり、数値が移動することはありません。

それがエンコードするインシデント: オーケストレーション キャンバスのフェーズ 3 は、その 11 のキーを当時存在していた 42 のロケールにわたって翻訳しました。数時間後、EU 言語バッチ (#13044) はリポジトリを 51 ロケールに移動しましたが、新規の 9 つ (`el`、 `et`、 `ga`、 `hr`、 `lt`、 `lv`、 `mt`、 `sl`、 `sr`) はそれらを受け取りませんでした。 `deepMergeFallback` 、存在しないキーを英語で置き換えるため、障害モードは空白のUI — real ではなく、未翻訳のUIとなり、構造上サイレントでした。

その兄弟のように、それは**差分認識**、マージベースの英語を作業ツリーと比較するため、既存のギャップは凍結されたままとなり、ゲートをオンにするために移行する必要はありません。

**`__MISSING__:<english>`マーカーはそれを満たしていません (2026 年 9 月 17 日以降)。**以前は文書化された延期—でしたが、2026 年 9 月 16 日の 8 機能PRs —フォールバックしました。このゲートはすべてを受け入れ、 PRsをブロックするものは何もなく、実際の翻訳比率をブロックするゲートは全員のリリース ヒントで失敗しました (pt-BR 3.2 % > 2.5)。 % + 0.5)。マーカーは不在翻訳として判断されるようになりました。 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`で赤を修正するか、 `npm run i18n:translate-new-keys`と並行してすべてのロケールを修正します (`scripts/i18n/translate-new-keys.sh`、デタッチセーフ、 `OMNIROUTE_TRANSLATION_*`環境なしでの起動を拒否します)。英語のままである必要があるキー (固定されたproduct/engine/flag名) は`scripts/i18n/untranslatable-keys.json`に属し、マーカーの背後に存在することはありません。 `vi`マーカーを完全に禁止します (`tests/unit/i18n-vi-completeness.test.ts`)。

#### `check-vitest-exclusions` —パークテストゲート

`vitest.config.ts`の`exclude`リスト内のファイルは実行されないテストであり、ツリーを読み取る人にはカバレッジのように見えます。コメント`// #8618 — pre-existing failure; remove this exclusion when fixed`の背後に 62 個のファイルが蓄積されました。問題#8618は 2026 年 8 月 11 日に閉鎖されましたが、追跡されたリストは 45 エントリから 62 エントリに増加し、新しいエントリのそれぞれに、廃止された問題を指すコメントが継承されています。最終的にリストがファイルごとに測定されたとき (#13204)、** 62 個のうち 51 個はソースを変更せずに現在のツリーに対して合格しました**。

ゲートでは、(a) 追跡問題に名前を付け、(b) 測定されたステータスとともに`config/quality/vitest-exclusions.json`に表示されるように、実際のファイルに解決されるすべての除外が必要です。そのため、1 つ追加すると、60 エントリの配列に 1 行追加するのではなく、専用のファイルで確認可能な diff になります。 ~ 10 分のコストがかかり、定期ジョブに属する除外されたテスト—意図的に再実行しません。在庫は、それぞれが最後に測定されたときを記録します。
