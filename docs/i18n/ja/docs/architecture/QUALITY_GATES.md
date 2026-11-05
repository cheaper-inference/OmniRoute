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

### キューをマージする

`queue`ラベルは、 PR Mergify キュー (`.mergify.yml`) に送信します。 Mergify は`mergify/merge-queue/`ブランチ上でドラフトPRを開き、 CIそこで完全な選択を実行し、 `Gate / CI`、 `Gate / Quality` 、 `Merge integrity (changelog + generated skills)`が通過すると元のPRがマージされます。

Mergify はキューの概要をドラフトの説明に書き込み、他のアプリもそれを編集できます。このようなドラフトの`pull_request` `edited`イベントは独自の同時実行グループ (`-queue-edit-<run_id>`) を使用するため、ドラフトの実際の実行をキャンセルできず、ゲートとマトリックスをスキップします。 `Merge integrity`だけがまだ実行されます。 Mergify はスキップされた`Gate / CI`失敗したチェックとして読み取り、 PRデキューするため、スキップされたゲート ジョブには別のチェック名が付けられます。

デキュー後、プッシュによってPR再キューされるとは限りません。 `@mergifyio queue`にコメントしてください。

各JSON受領書は、チェックアウトされたSHA、ワークフローの実行および試行を識別します。 CLI 、 checkout/event SHA不一致を拒否します。ワークフロー テストは、ポリシー メンバーシップを判定ジョブの`needs`リストにバインドするため、新規または削除されたレーンが黙って消えることはありません。領収書は独自のワークフローをカバーしており、公開、展開、または既存のアドバイザリー スキャナーの内部はカバーしていません。ブランチ ルールで両方のチェック名をアクティブにすることは、別個の管理上の変更です。これらのジョブを追加すること自体はブランチを保護しません。

### 静的スキャン インベントリ

バージョン管理された npm-alias インベントリと静的スキャン メンバーシップは`config/quality/gate-manifest.json`に存在します。 `npm run check:gate-manifest`実行して、スクリプト名と正確なコマンドを`package.json`に対して検証します。追加、削除、およびコマンド ドリフトは、ローカル フックとCIの分類変更ジョブの両方で失敗します。エイリアスは、ワークフロー ジョブ、マトリックス インスタンス、またはテスト ケースではありません。これらのカウントを交換可能なものとして表現してはなりません。

`npm run quality:scan -- --list`または`npm run quality:scan:fast -- --list`を使用して、選択したエイリアスを実行せずに検査します。ランナーは npm エントリポイントを呼び出すため、そのランタイム (構成されているBunを含む) が保持されます。マニフェストには、これらのプロファイルの外部にあるエイリアスが個別に呼び出されたものとして記録され、読み取り専用スキャン プロファイルではメンテナンス コマンドが禁止されています。

これらのプロファイルは静的スキャンのみをカバーします。これらは、製品テスト、適用範囲、パッケージング、外部チェック、または候補者の完全なリリースの受け入れを認証するものではありません。ワークフローアドミッションでは、リンクされた`config/quality/admission-policy.json`および`scripts/quality/admission-verdict.mjs`を使用します。リリースオブザーバープロファイルは分離されたままです。該当する小切手と領収書を個別に検査します。以下の散文目録は参考資料であり、ゲートが実際に稼働したことを証明するものではありません。

スクリプトは`scripts/check/` (ポリシー ゲート) および`scripts/quality/` (ラチェット エンジン) の下に存在します。 CIの信頼できる情報源は`.github/workflows/ci.yml`です。

### PR高速パス (`quality.yml`) をリリースする

`.github/workflows/quality.yml` 、 main/release PRs上のCI補完し、 `main`にプッシュし、グループをディスパッチおよびマージします。 PRs 、パスでフィルターされた高速チェックを使用します。永続的に無効になった重複ビルドは削除されました。実際のbuild/package/bootチェックはCIに残ります。ユニット スイートと vitest はCI (`Unit Tests (N/8)`および`Vitest`) でのみ実行されます。

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
| `check:deps`                      | リポジトリ内のすべての`package.json`にわたるすべての`npm install` -able dep は`dependency-allowlist.json`にあります。新しいピン留めされていないパッケージまたはずさんなパッケージにフラグが立てられています                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                          |
| `audit:deps`                      | `npm audit` (ルート+電子) — high/criticalアドバイザリーなし (osv `check:vuln-ratchet`と重複。合理化バックログを参照)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                          |
| `check:lockfile`                  | `package-lock.json`整合性— https レジストリ、整合性ハッシュ、ホスト オーバーライドなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                          |
| `check:licenses`                  | 実稼働依存関係のSPDXライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                          |
| `check:tracked-artifacts`         | ビルドアーティファクトなし / コミットされた`node_modules`シンボリックリンク (ハスキーなプリコミットでも実行; プリプッシュは意図的に軽い— #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                          |
| `check:ai-attribution`            | PRコミット、タイトル、本文にAI/bot `Co-Authored-By`トレーラーまたは AI 生成フッターはありません。 —ハード ルール#16 ( PR→ `release/**`の`quality.yml`高速ゲート ループ内で、 —はイベント ペイロード、no-op PRs —およびPR→ `main`の`ci.yml` lint の PR のみのステップを読み取ります。ハスキー`commit-msg`フック、人間の共著者が許可されます#14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | すべてのVitest除外には追跡問題の名前が付けられ、 `config/quality/vitest-exclusions.json` (#13204) に表示されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                          |
| `check:file-size`                 | ソース ファイル ( `src/`、 `open-sse/`、 `electron/`、 `bin/`の`.ts`/`.tsx` ) は`cap`内に保持され、テスト ファイル (`*.test.ts(x)`) は`testCap`内に保持されます。 `file-size-baseline.json` (`frozen` / `testFrozen`) で凍結されたファイルは、記録されたサイズを超えてはなりません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                          |
| `check:error-helper`              | executors/handlersのエラー応答は`buildErrorBody()` / `sanitizeErrorMessage()` (ハード ルール#12) を使用します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:migration-numbering`       | 移行SQLファイルには連続した番号が付けられ、ギャップや重複はありません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:public-creds`              | `publicCreds.ts`外側にリテラルOAuth `client_id`/`client_secret`または Firebase Web キーはありません（ハード ルール#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                          |
| `check:db-rules`                  | `src/lib/db/`モジュールの外部に生のSQLありません。 `localDb.ts`からのバレルインポートはありません (ハードルール#2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:known-symbols`             | ディスパッチ テーブルに登録されているプロバイダー エグゼキュータ、ルーティング ストラテジー、およびトランスレータがディスク上のファイルと一致する—孤立したシンボルや未宣言のシンボルがない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                          |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートは`isLocalOnlyPath()` (ハード ルール#15/#17) によって分類されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:test-discovery`            | リポジトリ内のすべての`*.test.ts` / `*.spec.ts`ファイルは、少なくとも 1 つのテスト ランナーによって収集されます (ラチェット: `test-discovery-baseline.json`の孤立リストは縮小することしかできません)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                          |
| `check:test-tla-order`            | `tests/unit`の下の`node:test`ファイルはテストを登録せず、トップレベルの`await`にヒットし、その後さらに登録します (#18045; ラチェット: `test-tla-order-allowlist.json`縮小のみ可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                          |
| `check:agent-skills-sync`         | 生成されたエージェント スキル アーティファクトはソース カタログと一致します (ドリフトなし)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | プロバイダーlogos/assetsは記録された来歴エントリを保持します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON構成ファイルが解析され、リポリント ルールを満たす                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | エラーなしのTypeScriptコンパイル (勧告警告のみ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                          |
| `typecheck:noimplicit:core`       | 厳格な`noImplicitAny` —前向き。既存の呼び出しサイトの多くは依然として注釈を必要としています                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **アドバイザリー**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`スコープは`src/app/(dashboard)/**` (#7033) — `typecheck:core`の厳選された 27 ファイルの許可リストにはダッシュボードTSXが含まれておらず、 `next build`もそれを型チェックしないため (`next.config.mjs` set `ignoreBuildErrors: true`)、そこでの孤立識別子の回帰 (#6625/#6909) はCIには見えませんでした。凍結されたper-file/per-TS-codeカウント ベースライン (`config/quality/dashboard-typecheck-baseline.json`、 `check:known-symbols`と同じ古い強制パターン) との差分。 NEW —のみがゲートに失敗します。既存のエラーが修正されると、 `--update`でラチェットダウンします。                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`) を介したアプリ全体の運用タイプ チェック、surface `typecheck:core`の 27 ファイルの許可リスト、およびダッシュボード ゲートはカバーされません。 `config/quality/build-typecheck-baseline.json`との差分。 (ファイル、コード) ごとの新しいカウントまたは増加したカウントは失敗し、カウントが低い場合はラチェットするように求められます。 `--update` 、実行に新しいペアまたは発生したペアが含まれている間は`--force-regressions`が渡されない限り拒否し、新しくサイレント化されたファイルは`--force-nocheck`が渡されない限り拒否します。そのため、ベースラインを広げて緑色にすることと、永続的なサイレンスを許可することは、2 つの別個の意図的な行為です。裸の`--force`は拒否されます。また、 `config/quality/ts-nocheck-baseline.json`に対して`@ts-nocheck`のビルド スコープをスキャンします。これを使用するファイルは診断をまったく報告せず、そうでない場合はすべてのゲートから見えなくなるためです。 | はい                                          |

#### 2 つの型チェック プログラムの応答が異なる

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

ジョブ全体がアドバイザリー (`continue-on-error: true`) です。 npm ベースのラチェットは実際に実行されます。外部スキャナは`gh release download`経由でインストールされ、バイナリがまだ存在しない場合は自己スキップ (0 で終了) します。

| スクリプト               | 検証します                                                                                                                                                                                                                 | ブロッキング                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | 循環依存関係なし (dpdm)                                                                                                                                                                                                    | **アドバイザリー**                                  |
| `check:bundle-size`      | バンドルのサイズが上限を超えないこと                                                                                                                                                                                       | **アドバイザリー**                                  |
| `check:secrets`          | バイナリが存在しない場合、シークレット スキャン (gitleaks) —がスキップされる                                                                                                                                               | **アドバイザリー**                                  |
| `check:vuln-ratchet`     | バイナリが存在しない場合、依存関係の脆弱性 (osv-scanner) が—スキップを回復しない                                                                                                                                           | **アドバイザリー**                                  |
| `check:workflows`        | ワークフロー lint (actionlint + zizmor); missing/brokenスキャナ、無効なレポート、または欠落しているラチェット ベースラインは、 INCOMPLETEとして失敗します。有効な結果は、選択したstrict/advisory/ratchetポリシーに従います | 実行が必要です。 CIでの zizmor ラチェットのブロック |
| `check:openapi-breaking` | パブリックAPIコントラクト (`openapi.yaml`) とベース ブランチ (oasdiff) に対する重大な変更—は`openapiBreaking=N`を生成します。 oasdiff が存在しない場合、または基本仕様が解決できない場合はスキップします。                 | **アドバイザリー**                                  |

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
| `check:cli-i18n`               | CLIコマンド文字列はすべての i18n ロケール ファイルに存在します                                                                                                              | はい                       |
| `check:openapi-coverage`       | OpenAPI仕様は実際のルートの少なくともラチェットフロアをカバーします                                                                                                         | はい                       |
| `check:openapi-security-tiers` | `openapi.yaml`のセキュリティ層のアノテーションは`routeGuard.ts`分類と一致しています                                                                                         | **アドバイザリー**         |
| `check:openapi-routes`         | `openapi.yaml`のすべてのパスは実際の`route.ts` (幻覚防止) に解決されます。                                                                                                  | はい                       |
| `check:docs-symbols`           | `docs/**/*.md`内のすべての`/api/...`参照は実際の`route.ts` (幻覚防止) に解決されます。                                                                                      | はい                       |
| `i18n translation drift`       | i18n ロケール ファイルの未翻訳キー—警告のみ                                                                                                                                 | **アドバイザリー**         |

`docs/diagrams/`の下に 12 個のREADME SVGsが生成されます (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams`それらすべてを再生成します)。それぞれには、コミットされたファイルが古い場合に失敗するバイト比較単体テスト (`tests/unit/docs/readme-*-svg.test.ts`、ジョブ`test-unit`) があり、 `check:docs-counts` `<text>`ノード—から正規の数値を読み取ります。そのため、アウトライン ステップではファイル内のすべてのアウトライン文字列が非表示の`<text>`として保持されます。 SVG canonical-numbers チェックは、 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) にリストされているファイル`docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`、および`public/images/tier-flow-dark.svg`および`tier-flow-light.svg`) を読み取ります。永久無料、カタログエントリー、定期プール、およびスコアリングファクターの主張は`promise-pillars.svg`、 `free-tier-budget.svg`および`strategies-grid.svg`とも読み取られます。 `free-tier-budget.svg`ライブ カタログ ローダーから図を描画するため、ファイルが再生成されるまで`FREE_MODEL_BUDGETS`またはプロバイダー表示名 reds CIに変更します。

### ジョブ: `i18n-ui-coverage`

| スクリプト                            | 検証します                                                                                                                                                                 | ブロッキング       |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (インライン) | UI i18n キー カバレッジは≥ 65%                                                                                                                                             | はい               |
| `check-ui-value-drift` (インライン)   | 書き直された英語**価値**古い翻訳を残さない                                                                                                                                 | はい               |
| `check-new-key-coverage` (インライン) | あ**新しい**英語キーはすべてのロケールで翻訳されます— 、 `__MISSING__:`マーカーは拒否されます。                                                                            | はい               |
| `check-translation-ratio`             | ロケールごとの実際の翻訳率 (英語と同一、プレースホルダー、ホワイトリスト外の欠落した葉) は、 `config/quality/i18n-translation-baseline.json` +スラックを超えてはなりません | **アドバイザリー** |

`fetch-depth: 0` —値ドリフト ゲート diff `en.json`とマージ ベースが必要です。

#### `check-ui-value-drift` —古い翻訳ゲート

他のゲートでは構造的に認識できない 1 つの i18n 回帰を捕捉します。英語の値が書き換えられ、_前の_ 英語から派生した翻訳が残されるため、英語以外のユーザーは自信を持って表現された、間違ったコピーを読み続けます。

これは実際に発送されました。 `oauthModal.googleOAuthWarning` 、 Antigravityログイン ヘルパー (#5203) が登場したときに書き直されました。** 43 ロケール中 39 か所**オペレーターに「完全なURLコピーして下に貼り付ける」ように指示するテキストが保持されていたため、そのプロバイダーではフローを完了できませんでし— 。 #8463まで気付かれなかった理由は次のとおりです。

- `sync-ui-keys` 、次のキーのみをバックフィルします。**不在**、決してそうではありません**古い**;
- `check-ui-keys-coverage` key _presence_ をカウントするため、古い翻訳はカバーされているとスコアが付けられます。
- `check-translation-drift` `docs/i18n/<locale>/**.md`ドキュメントのミラーリング—を追跡しますが、 `src/i18n/messages/*.json`を読み取ることはありません。 2026-09 の再同期以降、ジョブ`docs-sync-strict`がブロックされています: コア ドキュメント→ `npm run i18n:run -- --files=<doc>`を編集します (セクション レベル、安価)。

**ベースラインに裏付けられたものではなく、差分を認識します。**マージベースの`en.json`作業ツリーと比較します。英語の値が変更されたキーごとに、未変更の翻訳が保持されているロケールはすべて古いものになります。これは意図的に**既存の借金を凍結する**— a diff では、長年の翻訳がどの古英語から来たのかを明らかにすることはできないため、ゲートは現在の変更が何に触れているかのみを判断します。代替案 (キーごとのハッシュ ベースライン) では、 ~ 600 KBで生成されたファイル (既存の最大のベースラインである 3 ×がかかり、 i18n PRごとに撹拌されます。

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

## 許可リストポリシー

既存の違反によって失敗させることができないすべてのゲートでは、固定された許可リスト
（例: `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）を使用します。ポリシーは次のとおりです。

**根本原因を修正してください。違反が既存のものであり、同じ PR 内で修正できない場合にのみ許可リストを使用してください。**

許可リストにエントリを追加する場合:

1. 理由を記載したコメントを含めます。
2. 追跡用 Issue を参照します（例: `// #3498 — フェーズ 2 の機能、未実装`）。
3. 違反を修正する同じ PR 内でエントリを削除します。アクティブな違反を抑制しなくなった古いエントリは、それ自体が不具合です（6A.3 の古い適用ルールのチェックが実装されると、孤立した許可リストエントリによってゲートが失敗します）。

テストを早く通すために許可リストエントリを追加しては**なりません**。許可リストが増え続ける一方でゲートが成功していても、品質に対する誤った安心感を与えるだけです。

### PR でゲートが失敗した場合

1. **ゲートの出力を注意深く読みます** — ルールに違反したファイルまたはシンボルが正確に示されています。
2. **違反を修正します** — ほとんどのゲートは決定的なファイルシステムチェックであり、コードが正しくなればすぐに成功します。
3. **違反が既存のものである場合**（つまり、自分が導入したものではなく、ゲートが新たに対象とするようになった場合）: 理由を記載したコメントと追跡用 Issue を添えて、許可リストにエントリを追加します。
4. **ゲートがラチェット方式の場合**（カバレッジ、ESLint の警告、重複、複雑度）:
   変更によってメトリクスが悪化しています。根本的な問題を修正するか、変更が意図的でメトリクスの悪化が許容可能な場合に限り、（まれに）`npm run quality:ratchet -- --update` を実行します。ただし、その理由を PR の説明に記載してください。
5. **助言目的のゲート**（`continue-on-error: true`）は情報提供用です。マージをブロックしませんが、CI のサマリーに表示されます。それでも修正してください。

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

## 合理化バックログ（ROI レビュー — フェーズ 9 ウェーブ 3）

このインベントリは 2026-06-17 に `ci.yml` と照合されました（以前のバージョンでは
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence` が欠落していました）。照合済みのセットに対する ROI レビューにより、
以下の合理化候補が特定されました。**統合は機械的な CI
変更です。切り替え／削除はオペレーターに委ねられたポリシー判断です。** 以下の項目は
まだ何も適用されていません。

**上記に記載されていないもの**（アドバイザリー、シグナルが弱い）：`docs-lint` ジョブ
（markdownlint + Vale、ジョブ全体が `continue-on-error`）および独立したスキャナーワークフロー
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`semgrepFindings: 0` は
`quality-baseline.json` にありますが、`ci.yml` のブロッキングラチェットには接続されていません。このメトリクスは
現在孤立しています。

### 統合／重複排除（機械的、低リスク）

各候補は 2026-06-17 時点の実際のゲート状態と照合して検証されました（信頼しつつ検証）。
「明らか」に見えた複数の統合が、実際には負債を隠しており、**そのまま置き換えられるものではない**ことが判明しました。

- **`check:docs-sync` が 2 回実行される** — `lint` ジョブで単独実行され、さらに `check:docs-all`（`docs-sync-strict`）内と husky の pre-commit フックでも実行されます。✅ **完了** — 単独の `lint` 呼び出しを削除しました。
- **CVE スキャン** — ❌ **そのまま統合可能ではありません。** `audit:deps` は high/critical の CVE が 1 件でもあればハードフェイルします。`check:vuln-ratchet`（osv）はベースライン（現在 1 MODERATE）に対する_悪化_の場合にのみ失敗します。セマンティクスが異なるため、`audit:deps` を削除すると high/critical に対する絶対的なゲートが失われます。両方を維持します。
- **循環検出** — ✅ **完了**（#15159 G-01/G-02）。以前の記述では `check:cycles` を「グリーンで、厳選された」ゲートと呼び、`check:circular-deps`（dpdm）が 91 件の循環を報告していたことを理由に、ブロッキングのまま維持することを正当化していました。そのグリーンは**偽のグリーン**でした。`check:cycles` は 5 個のサブディレクトリ（450 ファイル）をスキャンし、静的な `import|export … from` のみにマッチし、すべての `@/` および `@omniroute/open-sse/` 指定子を除外していたため、リポジトリ内の大半を占める動的 import + エイリアスの循環を検出できませんでした。修正済みです。現在のゲートは `src` + `open-sse`（5023 ファイル）を走査し、TypeScript AST から指定子を収集し（そのため `import("…")` はカウントされ、型位置の `typeof import("…")` はカウントされません）、tsconfig の `paths` を解決します。検出される循環は 0 件ではなく **14** 件です。既存の 14 件の循環はゲート PR では修正できないため、`check:cycles` は現在**ラチェット**になっています（`--ratchet`、`quality-baseline.json` 内の上限は `metrics.cycles.value = 14`、`direction: down`）。あらゆる_悪化_をブロックし、件数は減少することしか許されません。CI は `npm run check:cycles:ratchet` を実行します。段階的な解消は **A-01** と併せて進めます。`check:circular-deps`（dpdm）は、より広範なセカンドオピニオンとしてアドバイザリーのまま維持します。
- **複雑度** — ✅ **完了**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：1 回の ESLint 走査で、ruleId ごとにカウントするため、循環的複雑度 + 最大行数と認知的複雑度のベースラインは独立したままです。個別の `check:complexity` / `check:cognitive-complexity` は、ローカルでの `--update` 用に維持します。
- **`/api` の幻覚防止** — ✅ **完了**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：`src/app/api` に対する 1 回の FS インベントリで、openapi-routes + docs-symbols は引き続き個別に報告します。個別のチェックはローカル実行用に維持します。
- **`check:node-runtime` が 11 ジョブで実行される** — ⚠️ **ROI が低いです。** それぞれが別のランナーであり、チェックは 1 秒未満です。節約できる合計時間は約 10 秒ですが、その代わりに安価なジョブ単位のガードを失います。変更に伴う手間に見合いません。
- **CI lint での `typecheck:noimplicit:core`** — ✅ **lint ジョブから削除済み**（以前はアドバイザリーの `continue-on-error`）。ブロッキング対象の型サーフェスは `typecheck:core` + `check:type-coverage` です。ローカルスクリプトは維持しています。

### 切り替え／判断（オペレーターポリシー）

- `check:openapi-security-tiers`（アドバイザリー）— ❌ **そのまま切り替えることはできません。** 終了コードは 0 ですが、`LOCAL_ONLY_API_PREFIXES` 配下の複数の `traffic-inspector` ルートに `x-loopback-only: true` アノテーションがないことを警告します。強制するには、まずそれらのアノテーションを `openapi.yaml` に追加する必要があります。
- `typecheck:noimplicit:core`（アドバイザリー）— 大部分がブロッキングの `check:type-coverage` ラチェットに包含されています。ラチェットに切り替えるか、重複する 2 回目の `tsc` パスを削除します。
- `test:vitest:ui`（現在は**ブロッキング**）— 既存の失敗は、`// #8618` 追跡コメント付きで `vitest.config.ts` から明示的に除外されています。新たな失敗が発生するとジョブは失敗します。
- `check:secrets`（gitleaks、文書化された 3 件の誤検知で固定されたブロッキングラチェット）— 3 件を許可リストに追加して 0 件にするか、アドバイザリーへ降格します。GitHub ネイティブの secret-scanning + `check:public-creds` と重複します。
- `check:pr-evidence`（ブロッキング、PR 本文の文章を grep）— 誤検知のリスクが高いです。削除するとハードルール #18 の強制力が弱まるため、これは実質的なポリシー判断です。
- `semgrep`（独立したアドバイザリー）— OWASP 系統について CodeQL と重複します。ベースラインをラチェットに接続するか、削除します。

---

## 関連ドキュメント

- サプライチェーン（プロベナンス、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — キーセット整合性ゲート

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`、ジョブ `i18n-ui-coverage`）。
各 `src/i18n/messages/<locale>.json` の末端キーセットを `en.json` と比較し、キーが追加された時期にかかわらず、欠落または余分な末端キーが1つでもあれば失敗します。`__MISSING__:` プレースホルダーは存在するものとして扱われます（その内容は比率ゲートの管轄です）。これは、差分ベース／パーセンテージベースの2つのゲートを完全に補完するものです。`check-ui-keys-coverage` はロケールごとに 80 % の下限を適用します（約13,000個のうち43個のキーが欠落していても 99.7 % と表示されます）。一方、`check-new-key-coverage` はPRによって `en.json` に追加されたキーのみを判定します。ロケールバッチは、ブランチを切った当日の `en.json` から生成され、ベース側でキーが追加され続けている間も数日間にわたって翻訳が行われます。バッチPR自体はキーを追加しないため、バッチ1（#13044）が9ロケールで43キー不足のまま、バッチ2（#13660）が8ロケールで10キー不足のまま取り込まれた際（2026-09-15）、どちらの関連ゲートも何も検出しませんでした。失敗を修正するには、`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` を実行します。`extra` の末端キーはソース側で削除されたことを意味するため、ロケールからも削除してください。`--warn` を指定すると、失敗させずに報告のみ行います。`--catalog=cli` を指定すると、`bin/cli/locales` に対して同じ比較を実行します（`npm run i18n:check-keys:cli`）。両方のステップはジョブ `i18n-ui-coverage` に含まれています。

#### `check-new-key-coverage` — 新規キーのi18nゲート

`check-ui-value-drift` の関連ゲートです。`check-ui-value-drift` は、英語の値が**書き換えられた**にもかかわらず翻訳が更新されていないケースを検出します。一方、このゲートは、英語のキーが**追加された**にもかかわらず、一部のロケールにそのキーが追加されていないケースを検出します。

`check-ui-keys-coverage` では、この種類の問題を検出できません。ロケールごとにカバレッジ率の下限を適用するため、約13,000個の末端キーのうち11個が欠落していても、カバレッジは 99.9% のままです。言語ごとのパーセンテージでは「この機能が未翻訳のままリリースされた」という状況を表現できません。新しいロケールで機能全体にテキストが存在しなくても、数値がまったく変化しないことがあります。

このゲートが防ぐことになったインシデントは、Orchestration Canvasのフェーズ3に関するものです。当時存在していた42ロケールすべてで11個のキーが翻訳されました。その数時間後、EU言語バッチ（#13044）によってリポジトリのロケール数が51に増えましたが、新たに追加された9ロケール（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）には、それらのキーが追加されませんでした。`deepMergeFallback` は欠落したキーを英語で置き換えるため、障害の現れ方は空白のUIではなく未翻訳のUIでした。これは実際の問題でありながら、設計上、検知されないものでした。

関連ゲートと同様に、このゲートも**差分を認識**し、マージベース時点の英語と作業ツリーを比較します。そのため、既存の欠落はそのまま固定され、このゲートを有効化するための移行は不要でした。

**`__MISSING__:<english>` マーカーでは要件を満たしません（2026-09-17以降）。** 以前は、ランタイムが正しい英語へフォールバックするため、文書化された延期手段として使用されていました。しかし、2026-09-16に8件の機能PRで61個のキーが追加された際、翻訳の代わりに全65ロケールへマーカーが一括設定されました。このゲートはそれらすべてを受け入れ、PRをブロックするものは何もありませんでした。その結果、実際の翻訳率を検証するブロッキングゲートがリリース先端で全員に対して失敗しました（pt-BR 3.2 % > 2.5 % + 0.5）。現在、マーカーは翻訳の欠落として判定されます。失敗を修正するには、`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` を実行します。または、`npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`、デタッチ状態でも安全、`OMNIROUTE_TRANSLATION_*` 環境変数がなければ開始を拒否）を使用して、すべてのロケールを並列に処理します。英語のままにする必要があるキー（固定された製品名、エンジン名、フラグ名）は、マーカーの背後に置くのではなく、`scripts/i18n/untranslatable-keys.json` に登録してください。`vi` ではマーカーが全面的に禁止されています（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 保留テストゲート

`vitest.config.ts` の `exclude` リストにあるファイルは、実行されないテストであり、ツリーを読む人にはカバレッジがあるように見えます。62個のファイルが、コメント `// #8618 — 既存の失敗。修正後、この除外を削除すること` の背後に蓄積されていました。Issue #8618 は2026-08-11にクローズされましたが、その間、追跡対象のリストは45エントリから62エントリに増え、新しいエントリのそれぞれが、終了済みのIssueを指すコメントを継承していました。最終的にファイルごとの測定が行われたところ（#13204）、**62個中51個が、ソースを変更することなく現在のツリーに対して合格しました**。

このゲートでは、実在するファイルへ解決されるすべての除外項目について、（a）追跡用Issueを明記し、（b）測定済みステータスとともに `config/quality/vitest-exclusions.json` に記載することを要求します。これにより、除外の追加は、60エントリの配列にさらに1行を足すだけではなく、専用ファイル上でレビュー可能な差分になります。このゲートは、除外されたテストを意図的に再実行しません。再実行には約10分かかり、定期ジョブで行うべきだからです。インベントリには、各テストが最後に測定された日時が記録されます。
