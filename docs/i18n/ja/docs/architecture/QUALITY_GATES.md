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

CIおよび Quality Gates ワークフローはそれぞれ、安定した判定`Gate / CI`および`Gate / Quality`を発行します。バージョン管理されたアドミッション ポリシーでは、必須または勧告に応じてすべてのアップストリーム ジョブを列挙します。該当する必須ジョブは成功する必要があります。欠落、キャンセル、スキップ、保留中、および不明な結果ではPASS確立できません。有効なドキュメントのみまたはカタログのみの分類により、コード レーンが適用されなくなる場合があります。通常のPRドラフトは候補として認められません。 `hotfix`ラベルは証拠を放棄しません。

どちらのワークフローも、 PRsからmain/releaseブランチへの移行、 `main`へのプッシュ、手動ディスパッチ、およびグループのマージ イベントをカバーします。プッシュ、ディスパッチ、およびグループのマージは、すべての選択を実行します。信頼できる Mergify キュー ドラフトは、該当する`full-code`/`full-code-e2e`ジョブも実行します。通常のPRsスキップします。手動マージの前に、正確な候補に対して完全なディスパッチを実行します。 `release/**`へのプッシュでは、これらのワークフローは開始されません。 Release-Green は、マージされたベースを個別に観察します (`docs/ops/RUNNER_BOX.md` →ホスト レーン)。フォークおよびマージ グループは、そうでない場合は自己ホスト ランナーを選択するジョブにホスト ランナーを使用します。展開前に十分なホスト容量を検証する必要があります。

通常のPR高速選択を実行します。アドミッション ポリシーの`full-code`レーンと`full-code-e2e`レーン (E2E、統合、パッケージ アーティファクト、 Electronスモーク、 Bun SQLite、エコシステムおよびプロトコル クライアント) は、 Mergify キュー ドラフトまたはフル実行 ( `gh workflow run ci.yml --ref <branch>`) でのみ実行されます。

各JSONレシートは、チェックアウトされたSHA、ワークフローの実行および試行を識別します。 CLI checkout/event SHA不一致を拒否します。ワークフロー テストは、ポリシー メンバーシップを判定ジョブの`needs`リストにバインドするため、新規または削除されたレーンが黙って消えることはありません。領収書は独自のワークフローをカバーしており、公開、展開、または既存のアドバイザリー スキャナーの内部はカバーしていません。ブランチ ルールで必要な該当するチェックを行うことは、個別の管理上の変更です。ジョブを定義すること自体はブランチを保護するものではありません。

`API Route Typecheck` 、集約判定とローカルの完全なオブザーバーの静的プロファイルの両方の外側にある、独立したワークフロー チェックです。正確な候補については、その結果を個別に検査してください。 `.github/workflows/api-route-typecheck.yml` PRs上で`main`または`release/**`に実行され、ブランチ ファミリー、手動ディスパッチ、および`checks_requested`タイプの`merge_group`イベントのいずれかにプッシュされます。パスフィルターはありません。グループを結合して`merge_group.head_sha`をチェックアウトします。その他のイベントは`github.sha`をチェックしてください。すべてのイベントは、同じAPI診断ゲートとゲート単体テストを使用します。 PRベースのリターゲットは新しいチェックを要求します。 body/title編集では観察専用の名前`Admission not requested / API Route Typecheck`が使用され、アドミッション チェックを置き換えることはできません。

### 受諾リデューサーに証拠が保持されている

`scripts/quality/validate-release-acceptance.mjs` 、提供された計画とそのマニフェストを削減します。この計画が完全なリリース パイプラインをカバーしているかどうかは確立されていません。そのレポートでは、プランが`VERIFIED`である場合でも、明示的に`releaseAcceptance: false`が設定されます。 `release-acceptance.yml`ワークフローでは、実際のビルド、パッケージ、ブート、またはプロモーションのレシートではなく、シャドウ フィクスチャが引き続き使用されます。

CLI 、 `--evidence-root`保持された証拠を検証することを要求します。ファイルは`<evidence-root>/<artifact_id>/<member>`として解決され、 SHA-256としてハッシュされます。証拠のないPASSレコード、ファイルの欠落または変更、安全でないパスまたはシンボリックリンクにより、検証が妨げられます。欠落しているファイルは、空の成功ログと同等ではありません。既存のSHA/run/attemptチェックは独立したままです。一致するバイトでは古いレシートを救出することはできません。ファイルの整合性は、実行の信頼性やアーティファクトのプロモーションの証拠ではありません。

### DAST検証済みのCIビルドを使用します

必要な`dast-smoke` CIジョブは、 `build`の後に`.github/workflows/dast-smoke.yml`を呼び出します。サポートされているフォークPRs、リリース ターゲットPRsおよびマージ グループを含む、ビルドと同じcode/draft選択に従います。 DASTジョブが欠落している、失敗している、キャンセルされている、または予期せずスキップされた場合、 `Gate / CI`がブロックされます。再利用可能なワークフローには独立したPR/dispatchトリガーがありません。手動検証ではCIのディスパッチを使用するため、ビルドとコンシューマは 1 回の実行で残ります。

`scripts/ci/next-build-provenance.mjs` 、tar ダイジェスト、 repository/event/run、プロデューサー試行、 head/base/checkout/tree、ワークフロー ID、ロックファイル、正確なノードversion/ABI、プラットフォーム、およびバンドラーを含む完全な Next アーティファクトをシールします。 DAST 、 `needs.build.outputs`から不変アーティファクトID選択し、ダウンロード ダイジェスト検証を必要とし、 `scripts/ci/unpack-ci-build.py`を通じてホワイトリストに登録された 2 つのメンバーを抽出する前に、プロデューサー ダイジェストに対してZIP個別にハッシュします。次のツリーが抽出される前に、マニフェストと tar アーカイブも独立したプロデューサーの出力と一致する必要があります。最新の成功したブランチ ビルドは検索されません。部分的な再実行では、 IDとすべての入力がまだ一致している場合、同じプロデューサーの試行を再利用できます。レシートには両方の試行が記録されています。

コンシューマは、読み取り専用リポジトリ権限を持ち、リポジトリ シークレットなしで、ホストされたLinuxランナー上に留まります。プロデューサの正確な Node バージョンをインストールし、 `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`を使用してCLIをアセンブルします。 `scripts/build/standaloneInput.mjs` 、フォールバック ビルドの前に、不足しているスタンドアロン サーバーを拒否します。通常のローカルCLIビルドは既存のフォールバックを保持します。サーバーの準備、スキーマセシス、およびプロンプトフはすべて、変更されていない 25 分のジョブ制限内で成功する必要があります。来歴レシートは入力の ID とバイトを証明するものであり、 DASTスキャンの成功を証明するものではありません。アーティファクトの期限切れ、ランナーの中断、またはスキャナーの失敗は不完全または失敗した証拠のままです。アドバイザリー ラッパーを介してPASSになることはできません。

### UI実行能力

CI 、完全なUIインベントリを 4 つの`test-vitest`マトリックス シャードとして実行します。各シャードには最大 2 人のワーカーが存在し、既存のジョブ期限は 15 分です。最初のシャードはMCP/autoCombo Vitestスイートも実行します。必要なジョブ結果は、すべてのマトリックス レッグをカバーします。 1 つのシャードの失敗またはキャンセルでは、候補者の承認を確立できません。

夜間オブザーバーは、最初のレシートのMCP実行を含む、 UIシャードごとに個別の完全候補レシートを保持します。 4 つのレシート、ログ、および一致する実行 ID がすべて必要です。ローカル`npm run test:vitest:ui`依然として完全なスイートを選択します。 1 回の`--shard`実行は部分的な証拠にすぎません。

### ユニットカバレッジコレクション

12 個のユニット シャードは、既存のテスト実行中に V8 カバレッジを収集します。シャードが成功すると、 `scripts/ci/compact-v8-coverage.mjs`が実行され、イスタンブールの中間レポートが生成されずに元のファイルが圧縮されます。最後のカバレッジ ジョブは、候補SHA、ランタイム、ソース ルート、およびデータ ハッシュに対して 12 個のマニフェストすべてを検証し、c8 のレポーターと既存のカバレッジしきい値を実行します。入力は c8 のグローバル ファイル名の順序を保持します。シャードごとの事前マージは、混合function/blockカバレッジでは安全ではありません。欠落しているシャード、不正なシャード、または互換性のないシャードは承認に失敗します。失敗したテスト シャードは、生の診断カバレッジを個別に保持します。最終マージに入ることができません。

### ユニット実行進捗状況の受信

共有`test:unit:ci:shard`コマンドは、 `scripts/ci/unit-progress-reporter.mjs`を通じて`primary`、 `dashboard` 、および`serial`フェーズを記録します。通常のテストレポートは引き続き利用可能です。別のメタデータのみのレシートには各ファイルの開始と完了が記録され、30 秒のハートビートにはまだアクティブなファイルとその経過時間がリストされます。許可リストに登録された実行メタデータのみが記録されます。テストの説明、出力、エラー本体、および完全な環境はシリアル化されていません。

CI JSONLファイルを`unit-progress-ci-<run>-<attempt>-<shard>`として保持します。ジョブのタイムアウトにより、その後のアップロードが妨げられる場合があります。すでに発せられた心拍は診断の証拠として残ります。ハートビートの欠落は、ランナー プロセスのブロックまたは終了を反映している可能性もあります。これらのレシートには、既存のテストの選択、同時実行性、期限、終了ステータスが保存されます。これらは候補者の入学評決ではありません。

### キューをマージする

`queue`ラベルはPRを Mergify キュー (`.mergify.yml`) に送信します。 Mergify は`mergify/merge-queue/`ブランチ上でドラフトPRを開き、 CIそこで完全な選択を実行し、 `Gate / CI`、 `Gate / Quality`および`Merge integrity (changelog + generated skills)`が通過すると元のPRがマージされます。

Mergify はキューの概要をドラフトの説明に書き込みます。 Body/title-only `pull_request` `edited`イベントは、実行固有の同時実行グループを使用し、分類、行列のテスト、マージ整合性、または許可の判定を再実行しません。監視のみのチェック名は`Gate / CI`または`Gate / Quality`を置き換えることはできません。ターゲット ベースを変更する編集では、新しい候補の検証が要求されます。

デキュー後、プッシュによって常にPR再キューされるわけではありません。 `@mergifyio queue`にコメントしてください。

### 静的スキャン インベントリ

バージョン管理された npm-alias インベントリと静的スキャン メンバーシップは`config/quality/gate-manifest.json`に存在します。 `npm run check:gate-manifest`を実行して、スクリプト名と正確なコマンドを`package.json`に対して検証します。追加、削除、およびコマンド ドリフトは、ローカル フックとCIの分類変更ジョブの両方で失敗します。エイリアスは、ワークフロー ジョブ、マトリックス インスタンス、またはテスト ケースではありません。これらのカウントを交換可能なものとして表現してはなりません。

`npm run quality:scan -- --list`または`npm run quality:scan:fast -- --list`を使用して、選択したエイリアスを実行せずに検査します。ランナーは npm エントリポイントを呼び出すため、そのランタイム (構成されているBunを含む) が保持されます。マニフェストには、これらのプロファイルの外部にあるエイリアスが個別に呼び出されたものとして記録され、読み取り専用スキャン プロファイルではメンテナンス コマンドが禁止されています。

これらのプロファイルは静的スキャンのみをカバーします。これらは、製品テスト、適用範囲、パッケージング、外部チェック、または候補者の完全なリリースの受け入れを認証するものではありません。ワークフローアドミッションは、リンクされた`config/quality/admission-policy.json`および`scripts/quality/admission-verdict.mjs`を使用します。リリースオブザーバープロファイルは別個のままです。該当する小切手と領収書を個別に検査します。 `audit:deps`、突然変異テストの選択、および変換チェックを含む、完全なオブザーバーの静的コマンドは`config/quality/release-green-static-profile.json`で宣言されます。ローダーは、 package.jsonおよびモデル化されたCI/Quality宣言に対して npm コマンドを検証します。シェルトークンを引数として実行するのではなく、ドリフトを拒否します。必要なスキャナSKIP/INCOMPLETE出力がPASSを確立できません。プロファイルはその外部除外を記録し、ホストされたカバレッジ、テスト マトリックス、パッケージまたは展開の証拠を置き換えるものではありません。以下の散文目録は参考資料であり、ゲートが実際に稼働したことを証明するものではありません。

スクリプトは`scripts/check/` (ポリシー ゲート) および`scripts/quality/` (ラチェット エンジン) の下に存在します。 CIの信頼できる情報源は`.github/workflows/ci.yml`です。

### 出版ベースのドキュメントの健全性

`.github/workflows/i18n-base-health.yml` 、選択された`main`および`release/v*`へのプッシュ後、および手動ディスパッチ時にドキュメントの健全性を監視します。そのフィルターは、ドキュメント、ルート マークダウン、 `llm.txt`、翻訳state/configurationおよび関連する i18n ツールをカバーします。単一の`Published base documentation health`ジョブはホストされた Ubuntu を使用し、期限は 5 分です。読み取り専用の検証を実行し、依存関係のインストール、変換、または状態の採用を行わずに診断レシートを書き込みます。

`scripts/i18n/check-base-health.mjs`では、ソース ハッシュ、ターゲットの欠落、ターゲット ハッシュ、古い変換、セクション キャッシュの不整合がないことが必要です。また、現在のコアdocument/localeスコープとその記録された出所も検証します。無効なコンテキスト、不完全なカバレッジ、または中断されたチェッカーにより`INCOMPLETE`が生成されます。確認されたドリフトは`FAIL`を生成します。どちらも失敗した終了ステータスを返します。レシートは、チェックアウトSHA、ワークフロー、実行および試行にバインドされ、 `i18n-base-health-<sha>-<run>-<attempt>`として保持されます。

これは、公開されたベースの独立した観察です。 PRまたはマージグループ イベント、必須のPRチェック、npm エイリアス、または静的スキャン プロファイル メンバーは追加されません。また、基礎となるチェッカーは、絶対モードで 5 つのクラスすべてをブロックします。通常のPR準備は入学とは別に行われます。アップロードが成功しても、失敗したヘルス結果をPASSに変換することはできません。

通常のPR 、 `--preflight`と`--baseline-evidence`によって生成された基本レポートを使用します。完全な翻訳レコードと実際のターゲットバイトがその正確なベースから変更されていない場合にのみ、英語ソースを保留のままにすることができます。新しいターゲットまたはセクション キャッシュの不一致が依然としてブロックされており、不完全な証拠により準備が許可されません。レポートでは、 `preparationPending`と`mergeReady`別々に公開されます。準備が成功しても、保留中の翻訳をマージできる状態にはなりません。許可する前に、構成された候補内の影響を受けるミラーを更新します。信頼できる Mergify キュー候補、 `merge_group`、ブランチ プッシュ、および手動CI実行では、 `--warn`や継承された障害の許容なしで、絶対チェッカーが使用されます。ターゲット ハッシュが欠落していたり、記録されたコア ファイルが削除されてスコープが縮小したりすると、絶対的な判定を成功させることができません。

### PRファストパス (`quality.yml`) をリリース

`.github/workflows/quality.yml` main/release PRs上のCI補完し、 `main`にプッシュし、グループをディスパッチおよびマージします。 PRs 、パス フィルター処理された高速チェックを使用します。永続的に無効になった重複ビルドは削除されました。実際のbuild/package/bootチェックはCIに残ります。ユニット スイートと vitest はCI (`Unit Tests (N/12)`および`Vitest`) でのみ実行されます。

| 仕事                                             | 範囲                                                                                                                                                                                          | ブロッキング           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; APIドキュメント参照およびドキュメント-すべて                                                                                                                                   | はい                   |
| `Fast Quality Gates`                             | コードPRs;静的チェック、タイプチェック、ダッシュボードのタイプチェック、影響を受ける単体テスト                                                                                                | はい                   |
| `Forgotten sibling tests`                        | コードPRs;静的コンシューマと候補兄弟テストまで追跡されるモジュールを変更しました。バレルおよび動的インポート パスは、参照された許可リストの例外とともに、アドバイザリ診断として報告されます。 | **アドバイザリー**     |
| `No new ESLint warnings`                         | コードPRs;抑制を意識した糸くずガード                                                                                                                                                          | はい、フォークも含めて |
| `Merge integrity (changelog + generated skills)` | 非ドラフトPRs;変更ログと生成されたスキルの同期                                                                                                                                                | はい、フォークも含めて |

#### 忘れられた兄弟のテストレポート

`npm run check:forgotten-sibling-tests` `Fast Quality Gates`のアドバイザリー ステップとして実行され、テスト影響マップの背後でインポート リゾルバーを再利用します。変更されたすべての運用モジュールについて、プル リクエストの差分に候補テストが存在しない場合、決定論的な`changed module/symbol -> static consumer -> candidate sibling test`チェーンが報告されます。マークダウンの概要とJSON結果は、ブロッキング ロールアウト前の調整のために`forgotten-sibling-tests`ワークフロー アーティファクトとして保持されます。

バレルの再エクスポートと動的インポートは、解決策の診断のみを目的としています。妨げとなる所見を作成することはありません。レビューされた例外は`config/quality/forgotten-sibling-allowlist.json`にあります。各エントリでは、コンシューマーおよび候補テストの名前を指定し、具体的な根拠を示し、 GitHub問題またはプル リクエストをリンクする必要があります。不正なエントリはフェールクローズされます。例外は、削除された候補テストまたは`.skip`/`.todo`を追加する差分を抑制できません。アサーション弱化およびその他のマスキングは、独立してブロックする`check:test-masking`ゲートによって所有されたままになります。

### ジョブ: `lint`

すべてのPRから`main`で実行されます。ブロックは失敗時にマージされます。

| スクリプト (`npm run ...`)        | 検証します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ブロッキング                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.jsバージョンはサポート範囲内です                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                          |
| `check:cycles`                    | すべての`src/` + `open-sse/`にわたる循環インポート (AST ベース、tsconfig `paths`解決済み)。 Bare は、サイクルが存在するたびに 1 を終了し ( #15281以降フェールクローズされます)、 SCCsをリストします。 `check:cycles:ratchet` ( CI実行するもの) は、カウントが`quality-baseline.json` —の`metrics.cycles`上限 (現在 14、 `direction: down`を超えるとブロックされるため、下がることしかできません (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい（ラチェット）                            |
| `check:boundary`                  | `open-sse → src` カップリング: エンジンからアプリへの一意のファイル間のインポート (`scripts/quality/measure-boundary.mjs`;エッジリストはv4です core/module-split 修復のバックログ）。裸 = 勧告報告書（と同じ） `quality:boundary`). `check:boundary:ratchet` （何 CI も実行されます `quality.yml` ファストゲート ラチェット ループ) カウントが `metrics.boundaryOpenSseToSrc` 天井 `quality-baseline.json` — 測定された 771 でシードされ、 `direction: down`; `--update` 下げるだけです。ベース相対 PRs (`--base-ref`、 以下を参照してください）                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい（ラチェット）                            |
| `check:route-validation:t06`      | Zodスキーマがすべてのルートに存在する (Tier 6 ポリシー)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any`数が予算を超えない (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                          |
| `check:provider-consistency`      | `providers.ts`のすべてのプロバイダーは、 `providerRegistry.ts`に一致するエントリを持っています (逆も同様で、ホワイトリスト内にあります)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                          |
| `check:model-lifecycle`           | 手動で管理される 3 つのルーティング テーブルは、チェックインされたライフサイクル スナップショット (#11503) と一貫性を保ちます。 `FITNESS_TABLE` (`taskFitness.ts`) は、 `REGISTRY`がルーティングできる廃止された ID をスコアしません。すべての`BUILT_IN_ALIASES`ターゲットは`REGISTRY`に存在しますが、リタイア ID スナップショットには存在しません。 `REGISTRY`内に残っている廃止された ID はすべて、 `allowedRetiredInCatalog`に転送またはリストされます。また、そのスナップショットでは`DEFAULT_DEGRADATION_MAP`ソースまたはターゲットがリタイアされたように見えません。これは、モデルが現在ライブアップストリームによって提供されていることを証明するものではありません。オフライン— `config/quality/model-lifecycle.json`と比較し、 `npm run quality:refresh-model-lifecycle` (ネットワーク。 CIに接続されていない) を使用して手動で更新されます。 `allowedRetiredInCatalog`はバーンダウン ラチェットです。追跡の問題がある場合のみエントリを追加します。                                 | はい                                          |
| `check:fetch-targets`             | クライアント側`src/`内のすべての`fetch("/api/...")`は実際の`route.ts`に解決されます                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                          |
| `check:deps`                      | リポジトリ内のすべての`package.json`にわたるすべての`npm install` -able dep は`dependency-allowlist.json`にあります。固定されていない、またはずさんなパッケージにフラグが立てられた新しいパッケージ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                          |
| `audit:deps`                      | 5 つの独立したロックファイルすべて (ルート、 Electron、 OpenCodeプラグインv1/v2およびプロバイダー) の npm 監査。重要な勧告はブロックされます。高度な勧告は引き続き警告として表示されます。 Missing/failed監査はINCOMPLETEおよびブロックです。スコープごとのロック ハッシュとレポートは保持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                          |
| `check:lockfile`                  | `package-lock.json`整合性— https レジストリ、整合性ハッシュ、ホスト オーバーライドなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                          |
| `check:licenses`                  | 実稼働依存関係のSPDXライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                          |
| `check:tracked-artifacts`         | ビルドアーティファクトなし / コミットされた`node_modules`シンボリックリンク (ハスキーなプリコミットでも実行; プリプッシュは意図的に軽い— #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:ai-attribution`            | PRコミット、タイトル、または本文にAI/bot `Co-Authored-By`トレーラーまたは AI 生成フッターがない—ハード ルール#16 ( PR→ `release/**`の`quality.yml`高速ゲート ループ内) —イベント ペイロード、 PRs —ノーオペ オフ、およびPR→ `main`の`ci.yml` lint の PR のみのステップを読み取ります。ハスキー`commit-msg`フックもあり、人間の共著者が許可されます。 #14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | すべてのVitest除外には追跡問題の名前が付けられ、 `config/quality/vitest-exclusions.json` (#13204) に表示されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                          |
| `check:file-size`                 | ソース ファイル ( `src/`、 `open-sse/`、 `electron/`、 `bin/`の`.ts`/`.tsx` ) は`cap`内に保持され、テスト ファイル (`*.test.ts(x)`) は`testCap`内に保持されます。 `file-size-baseline.json` (`frozen` / `testFrozen`) で凍結されたファイルは、記録されたサイズを超えてはなりません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                          |
| `check:error-helper`              | executors/handlersのエラー応答は`buildErrorBody()` / `sanitizeErrorMessage()` (ハード ルール#12) を使用します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                          |
| `check:migration-numbering`       | 移行SQLファイルには連続した番号が付けられ、ギャップや重複はありません                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                          |
| `check:public-creds`              | `publicCreds.ts`の外にはリテラルOAuth `client_id`/`client_secret`または Firebase Web キーはありません（ハード ルール#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                          |
| `check:db-rules`                  | `src/lib/db/`モジュールの外部に生のSQLありません。 `localDb.ts`からのバレルインポートなし (ハードルール#2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                          |
| `check:known-symbols`             | ディスパッチ テーブルに登録されているプロバイダー エグゼキュータ、ルーティング ストラテジー、およびトランスレータは、ディスク—上のファイルと一致します。 孤立したシンボルや宣言されていないシンボルはありません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                          |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートは`isLocalOnlyPath()` (ハード ルール#15/#17) によって分類されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                          |
| `check:test-discovery`            | リポジトリ内のすべての`*.test.ts` / `*.spec.ts`ファイルは、少なくとも 1 人のテスト ランナーによって収集されます (ラチェット: `test-discovery-baseline.json`の孤立リストは縮小のみ可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                          |
| `check:test-tla-order`            | `tests/unit`の下の`node:test`ファイルはテストを登録せず、トップレベル`await`にヒットし、その後さらに登録します (#18045; ラチェット: `test-tla-order-allowlist.json`縮小のみ可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                          |
| `check:agent-skills-sync`         | 生成されたエージェント スキル アーティファクトはソース カタログと一致します (ドリフトなし)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | プロバイダlogos/assets記録された来歴エントリを保持します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON構成ファイルは解析され、リポリント ルールを満たす                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | エラーなしのTypeScriptコンパイル (勧告警告のみ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `typecheck:noimplicit:core`       | 厳格な`noImplicitAny` —前向き。多くの既存の呼び出しサイトでは依然として注釈が必要です                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **アドバイザリー**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` 範囲を限定する `src/app/(dashboard)/**` (#7033) — `typecheck:core`が厳選した 27 ファイルの許可リストにはダッシュボードが含まれていません TSX、 そして `next build` 決して型チェックもしません(`next.config.mjs` セット `ignoreBuildErrors: true`）、孤立した識別子の回帰がそこにあります（#6625/#6909）には見えませんでした CI。凍結との違い per-file/per-TS-code カウントベースライン (`config/quality/dashboard-typecheck-baseline.json`、と同じ古い施行パターン `check:known-symbols`) — のみ NEW ベースラインカウントを超えるエラーはゲートに失敗します。でラチェットダウン `--update` 既存のエラーが修正されたとき。                                                                                                                                                                                                                                                                                                                                                               | はい                                          |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`) によるアプリ全体の運用タイプ チェック、サーフェス`typecheck:core`の 27 ファイルの許可リスト、およびダッシュボード ゲートはカバーされません。 `config/quality/build-typecheck-baseline.json`との差分。新しいカウントまたは (ファイル、コード) ごとのカウントの増加は失敗し、カウントが低い場合はラチェットする必要があります。 `--update` 、実行に新しいペアまたは発生したペアが含まれている間は`--force-regressions`が渡されない限り拒否し、新しくサイレント化されたファイルは`--force-nocheck`が渡されない限り拒否します。そのため、ベースラインを広げてグリーンにすることと、永久的なサイレンスを許可することは、2 つの別個の意図的な行為です。裸の`--force`は拒否されます。また、 `config/quality/ts-nocheck-baseline.json`に対して`@ts-nocheck`のビルド スコープをスキャンします。これを使用するファイルは診断をまったく報告せず、そうしないとすべてのゲートから見えなくなるためです。 | はい                                          |

#### 2 つの型チェック プログラムの答えが異なる

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) および`check:build-typecheck` 、異なるオプションで異なるプログラムをコンパイルします。同じファイルでも、一方ではクリーンでも、もう一方ではエラーが発生する可能性があります。

`tsconfig.build.json` `"strict": false`を設定するため、 `noImplicitAny`はオフになります。コア構成は、より厳密なオプションを使用して厳選された 27 ファイルの許可リストをコンパイルし、各エントリのインポート グラフに従います。そのため、ビルド プログラムに表示されないファイルもそこでチェックされます。

ファイルがタイプされたかどうかを判断する場合、結果が重要になります。**`check:build-typecheck`でのゼロ診断はゼロを意味するものではありません**。 26 個のファイルから`@ts-nocheck`削除すると、ビルド プログラムではそのうち 23 個がクリーンであることがわかりました。そのうち 16 件では、約 120 件の暗黙的なエラー (厳密なエラー) が表面化しました。ファイルをクリーンと呼ぶ前に両方をチェックしてください。

### ジョブ: `quality-gate`

`test-coverage`の後に実行されます。ブロックは失敗時にマージされます。

| スクリプト                   | 検証します                                                                                                                                   | ブロッキング             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json`を発行します (ESLint警告数、マージされたシャード レポートからのカバレッジ)                                             | あり（ラチェットの上流） |
| `quality:ratchet`            | `quality-baseline.json`の各メトリクスは後退していません (ESLint警告≤ベースライン、カバレッジ≥ベースライン)                                   | はい                     |
| `check:duplication`          | コードの重複 (jscpd@4) は`quality-baseline.json`のベースラインを超えません                                                                   | はい                     |
| `check:complexity`           | ファイルレベルの循環的複雑度は上限 (コアESLint `complexity` + `max-lines-per-function`) を超えません                                         | はい                     |
| `check:cognitive-complexity` | 認知複雑性ラチェット (`eslint-plugin-sonarjs`) —別個のESLintパス。 CI両方を単一の`check:complexity-ratchets`ステップとして結合して実行します | はい                     |
| `check:dead-code`            | 未使用のエクスポート/ファイルのラチェット (knip) がベースラインと比較して後退しない                                                          | はい                     |
| `check:compression-budget`   | 圧縮ベンチマーク バジェット—のエンジンごとのトークン節約の下限が後退してはなりません                                                         | はい                     |
| `check:type-coverage`        | パーセント型ラチェット (`type-coverage`) は後退しません。 `typecheck:noimplicit:core`を主に包含                                              | はい                     |

### ジョブ: `codeql-scan`および`codeql-admission`

`codeql-scan` 、構成されたすべての分析カテゴリを生成します。そのジョブが成功すると、 `codeql-admission`正確なアップロードと候補アラート ラチェットを検証します。どちらも`Gate / CI`の必須の依存関係であり、ドキュメントのみの候補も含まれます。管理上のアクティベーションとカナリアの要件については、以下の「CodeQLラチェット」で説明します。

| スクリプト             | 検証します                                                                                                                                                                                    | ブロッキング |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:codeql-ratchet` | 候補ref/SHAと構成されたすべての分析カテゴリは、アラート ラチェットの前に最新のものである必要があります。証拠ブロックが欠けている。グローバル在庫は別個のまま—下記の「CodeQLラチェット」を参照 | はい         |

### ジョブ: `quality-extended`

この求人は該当する候補者をブロックします。バンドルのサイズ、秘密の調査結果、脆弱性の調査結果、ワークフローの調査結果、 OpenAPI 変更は必要なラチェットでチェックされます。循環依存性の診断は依然として助言です。スキャナーのインストールが必要です: `scripts/ci/install-quality-scanners.sh` 固定されたバージョンをプロビジョニングし、インストールの失敗を伝播します。不足しているツール、無効なレポート、または不足しているベースラインにより、必要なスキャナー ゲートが残されます。 INCOMPLETE.

| スクリプト               | 検証します                                                                                                                                                                                                              | ブロッキング                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | 循環依存関係なし (dpdm)                                                                                                                                                                                                 | **アドバイザリー**                                  |
| `check:bundle-size`      | バンドルのサイズは上限を超えません。使用できない測定は失敗します                                                                                                                                                        | **--ratchetによるブロック**                         |
| `check:secrets`          | Gitleaks の調査結果は後退しません。必要なスキャンは、欠落したtools/source/baseline、失敗したスキャン、および無効なレポートを拒否します                                                                                  | **--ratchetによるブロック**                         |
| `check:vuln-ratchet`     | 依存関係の脆弱性は後退しません。必要なスキャンは、不足しているツール、無効なレポート、または不足しているベースラインを拒否します                                                                                        | **--ratchetによるブロック**                         |
| `check:workflows`        | ワークフロー lint (actionlint + zizmor); missing/brokenスキャナ、無効なレポート、または欠落しているラチェット ベースラインはINCOMPLETEとして失敗します。有効な結果は、選択したstrict/advisory/ratchetポリシーに従います | 実行が必要です。 CIでの zizmor ラチェットのブロック |
| `check:openapi-breaking` | ピン留めされたイベントコミットに対するパブリックAPIコントラクト (PRマージベース、プッシュビフォー、マージグループベース、 scheduled/manualチェックアウトの最初の親)。必要な測定が失敗して終了しました                   | **--ratchetによるブロック**                         |

### ジョブ: `docs-sync-strict`

`main`または`release/**`へのプル リクエストの場合、このジョブはドキュメントまたはコードの変更として分類された非ドラフト (または信頼できるキュー) の候補に対してのみ実行されます。 PR 以外のCIイベントでも実行されます。このワークフローのプッシュ トリガーは`main`のみをカバーし、 `release/**`はカバーしません。ゼロ以外で終了するステップはジョブをブロックします。レポートのみの調査結果および以下の文書化された免除には適用されません。

| スクリプト                     | 検証します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ブロッキング                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | 以下の7つのサブゲートを順番に実行するメタゲート                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                                                                                                                       |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOGバージョンの一貫性、正確な`llm.txt`ミラー、翻訳されたCHANGELOG section/size不変条件、および置き換えられる重複ドキュメントの不在                                                                                                                                                                                                                                                                                                                                            | はい                                                                                                                                       |
| ↳ `check:docs-frontmatter`     | コンパイルされたドキュメント ページには有効な前付タイトルが付けられます                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                                                                                                                       |
| ↳ `check:docs-counts`          | 信頼度の高いカウント不変条件は厳密です。ヒューリスティック ファイル数チェックでは、スクリプトが受信しない限り警告のみが表示されます。 `--strict` ( CI メタゲートは通過しません）                                                                                                                                                                                                                                                                                                                    | 厳格な階層ブロック。ソフト層のアドバイザリー                                                                                               |
| ↳ `check:env-doc-sync`         | ソース環境読み取り、 `.env.example`、および`docs/reference/ENVIRONMENT.md` 、明示的な無視、ドキュメントのみ、および環境のみのホワイトリストの後に一致します                                                                                                                                                                                                                                                                                                                                         | はい、文書化された許可リストの範囲外です                                                                                                   |
| ↳ `check:deprecated-versions`  | 無視されたドキュメントを除き、安全な履歴コンテキスト外の潜在的な古いバージョンと古い更新日をレポートします。                                                                                                                                                                                                                                                                                                                                                                                        | 現在のCI配線における注意事項（`--strict`は通さない）                                                                                       |
| ↳ `check:doc-links`            | ドキュメント内の内部マークダウン リンクは実際のファイル (`[text]`/`(path)`形式) に解決されます。                                                                                                                                                                                                                                                                                                                                                                                                    | はい                                                                                                                                       |
| ↳ `check:fabricated-docs`      | ドキュメントで引用されているルート、環境変数、 CLIコマンド、フック名、ファイル パスはコードベースに存在します。 `--strict`経由のハードゲート;フラグなしのソフトフェイル。                                                                                                                                                                                                                                                                                                                           | はい ( CIの`--strict`経由)                                                                                                                 |
| `check:cli-i18n`               | 使用されたCLI `t()`キーは`en`に存在します。 `pt-BR`すべてのトップレベル セクションを保持します。 `zh-CN`と`zh-TW` `en`のすべてのキーが含まれます                                                                                                                                                                                                                                                                                                                                                    | はい                                                                                                                                       |
| `check:openapi-coverage`       | OpenAPI仕様は、実際のルートの少なくともラチェットフロアをカバーします                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                                                                                                                       |
| `check:openapi-security-tiers` | 宣言された`x-loopback-only`/`x-always-protected`アノテーションは`routeGuard.ts`によって裏付けられる必要があります。パーサーと前方不一致ブロック。ローカルのみのプレフィックスで欠落している`x-loopback-only`逆方向チェックでは警告が表示され、パターンのみのルートはその逆方向パスから除外されます。                                                                                                                                                                                                | Parser/forwardブロッキングをチェックします。リバースチェック勧告                                                                           |
| `check:openapi-routes`         | `openapi.yaml`内の各`/api...`パスは、パラメータに依存せずに、正当な`KNOWN_STALE_SPEC`ホワイトリストの後の実際のルートに解決されます。古いホワイトリストのエントリも失敗します                                                                                                                                                                                                                                                                                                                       | はい                                                                                                                                       |
| `check:docs-symbols`           | 正規の非ミラー ドキュメント内の内部`/api/...` URL参照は、実際のルートまたはルート ファミリに解決されます。 proxy/upstream/placeholder/file参照と正当化された`KNOWN_STALE_DOC_REFS`エントリは除外され、古いホワイトリスト エントリは失敗します                                                                                                                                                                                                                                                       | はい                                                                                                                                       |
| `i18n translation drift`       | 絶対的な承認には、ソース、ターゲットの欠落、ターゲット ハッシュ、古い変換、およびセクション キャッシュの不整合がないことが必要です。通常のPR準備では、正確に継承された証拠、または完全な状態とターゲット バイトが変更されていない英語のみの保留中の変更が保持される場合があります。そのレポートでは、マージの準備が整っていることが別途宣言されています。ターゲットのハッシュが欠落しており、基本的な証拠ブロックが不完全です。レガシー セクション キャッシュが存在しないことは障害ではありません。 | 5 つのクラスすべてがqueue/base入場をブロックします。通常の準備では、証明された継承された作業または英語のみの保留中の作業のみが許可されます |

`docs/diagrams/`の下に 12 個のREADME SVGsが生成されます (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams`それらすべてを再生成します)。それぞれには、コミットされたファイルが古い場合に失敗するバイト比較単体テスト (`tests/unit/docs/readme-*-svg.test.ts`、ジョブ`test-unit`) があり、 `check:docs-counts` `<text>`ノード—から正規の数値を読み取ります。そのため、アウトライン ステップではファイル内のすべてのアウトライン文字列が非表示の`<text>`として保持されます。 SVG正規番号チェックでは、 `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) にリストされているファイル ( `docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`に加えて`public/images/tier-flow-dark.svg`および`tier-flow-light.svg`を読み取ります。永久無料、カタログエントリー、定期プール、およびスコアリングファクターの主張には、 `promise-pillars.svg`、 `free-tier-budget.svg` 、および`strategies-grid.svg`も含まれます。 `free-tier-budget.svg`ライブ カタログ ローダーから数値を取得するため、 `FREE_MODEL_BUDGETS`またはプロバイダー表示名を変更すると、そのファイルが再生成されるまでCI赤色になります。

### ジョブ: `i18n-ui-coverage`

| スクリプト                              | 検証します                                                                                                                                                         | ブロッキング     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `check-ui-keys-coverage` （インライン） | UI i18n キー カバレッジは≥ 65%                                                                                                                                     | はい             |
| `check-ui-value-drift` （インライン）   | 書き直された英語**価値**古い翻訳を残さない                                                                                                                         | はい             |
| `check-new-key-coverage` （インライン） | あ**新しい**英語キーはすべてのロケールで翻訳されます— `__MISSING__:`マーカーは拒否されます                                                                         | はい             |
| `check-translation-ratio`               | ロケールごとの実際の翻訳率 (英語と同一/プレースホルダ/ホワイトリスト外の欠落葉) は、 `config/quality/i18n-translation-baseline.json` +スラックを超えてはなりません | **ブロッキング** |

`fetch-depth: 0` —値ドリフト ゲート`en.json`とマージ ベースの差分が必要です。

#### `check-ui-value-drift` —古い翻訳ゲート

他のゲートでは構造的に認識できない 1 つの i18n 回帰を捕捉します。英語の値が書き換えられ、_前の_ 英語から派生した翻訳が残されるため、英語以外のユーザーは自信を持って表現された、間違ったコピーを読み続けます。

これは実際に発送されました。 `oauthModal.googleOAuthWarning` 、 Antigravityログイン ヘルパー (#5203) が到着したときに書き直されました。**43 ロケール中 39 か所**オペレーターに「完全なURLコピーして下に貼り付ける」ように指示するテキストが残されていましたが、そのプロバイダーではフローを完了できない—た。 #8463まで注目されなかったのは、次の理由からです。

- `sync-ui-keys` 、次のキーのみをバックフィルします。**不在**、決してそうではありません**古い**;
- `check-ui-keys-coverage`キーの存在をカウントするため、古い翻訳はカバーされているとスコアが付けられます。
- `check-translation-drift` `docs/i18n/<locale>/**.md`ドキュメントを追跡し、 —をミラーリングしますが、 `src/i18n/messages/*.json`を読み取ることはありません。 2026-09 の再同期以降、ジョブ`docs-sync-strict`がブロックされています: コア ドキュメント→ `npm run i18n:run -- --files=<doc>` (セクション レベル、安価) を編集します。

**ベースラインに裏付けられたものではなく、差分を認識します。**マージベースの`en.json`作業ツリーと比較します。英語の値が変更されたすべてのキーについて、未変更の翻訳が保持されているロケールはすべて古いものになります。これは意図的に**既存の借金を凍結する**—差分では、長年の翻訳がどの古い英語から来たのかを明らかにすることはできないため、ゲートは現在の変更が何に触れているかのみを判断します。代替案 (キーごとのハッシュ ベースライン) では、 ~ 600 KB生成ファイル、3 ×が既存の最大のベースラインとなり、i18n PRごとにチャーンされます。

それを満たすための 2 つの方法:

1. 影響を受ける翻訳を更新するか、
2. それらを`__MISSING__:<new english>` —に設定すると、ランタイムは修正された英語 (`src/i18n/request.ts::deepMergeFallback`、 #7258) と翻訳用のキー キューを提供します。

文字列の場合**意味**変更されました、好みます**キーの名前を変更する**: 新しいキーは古い変換を継承できません。それが#8463が使用したパターンです。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

値ドリフト ゲートと新しいキー ゲートは、 `scripts/i18n/resolve-ui-diff-base.mjs`からの 1 つの不変比較を共有します。ワークフローは、同じベース、ベースチップ、および候補SHAsを両方のチェックに渡します。 PR/base-retarget、プッシュおよびマージグループの実行では、イベント コンテキストが使用されます。候補ブランチをディスパッチするには、その正確なオープンPRまたは明示的な`i18n_base_sha`入力が必要です。その入力を使用しない`main`または`release/vX.Y.Z`のディスパッチまたはスケジュールされた観察では、最後のコミットと最初の親が比較されます。これは、継承されたすべての翻訳債務を監査するものではありません。ローカル呼び出しには、上記の`BASE_REF`コマンドなどの明示的な比較ベースが必要です。

比較コンテキストの欠落またはあいまいさ、必要なカタログの読み取り不能または無効、および変更された候補により、終了コードを含む`INCOMPLETE`が生成される**2** 、警告モードを含む。カタログ読み取りには`scripts/i18n/read-ui-catalog.mjs`が使用されます。読み取り失敗は空のオブジェクトに置き換えられません。使用できないベースも不完全な入力もPASSを確立しません。

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
| `check:pr-evidence`    | PR団体は変更のtest/VPS証拠を引用 ( PR散文—脆弱性をグレッピングすることでハード ルール#18機械化、バックログを参照)                         | はい         |

### ジョブ: `test-vitest`

`changes`分類ジョブが必要です。該当するマトリックス シャードは、失敗時にマージをブロックします。

| スイート         | 検証します                                                       | ブロッキング                                                                                          |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCPサーバー（110ツール）、 autoCombo、キャッシュ— vitestランナー | はい                                                                                                  |
| `test:vitest:ui` | UIコンポーネント テスト— vitest ランナー                         | **ブロッキング**—の既存の障害は`vitest.config.ts`では明示的に除外されます。新たな失敗が仕事に失敗する |

### 夜間のワークフロー (スケジュール済み、アドバイス)

これらは cron スケジュール (および`workflow_dispatch`) で実行され、 PRsでは決して実行されません。すべてアドバイスです。

| ワークフロー           | 検証します                                                                                                                                                        | ブロッキング       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | ランダム シード+高い実行数を使用した高速チェック プロパティ テスト                                                                                                | **アドバイザリー** |
| `nightly-resilience`   | ヒープ成長ゲート、カオスフォールトインジェクション、k6 load/soak                                                                                                  | **アドバイザリー** |
| `nightly-llm-security` | Promptfoo インジェクション ガード (ブロック モード) + garak プローブ (プロバイダー シークレットなしでスキップ)                                                    | **アドバイザリー** |
| `nightly-schemathesis` | `docs/openapi.yaml` —を使用したライブOmniRouteに対するOpenAPIコントラクト ファジング (スキーマセシス) により、仕様違反 / 未処理の 500 が表面化します (Fase 8 B.4) | **アドバイザリー** |
| `nightly-mutation`     | 高速ユニットレーンでの Stryker 変異テストのスコア—生存変異体が弱いアサートを表面化                                                                                | **アドバイザリー** |
| `nightly-compat`       | サポートされている`engines.node`範囲にわたるノード エンジン互換性マトリックス                                                                                     | **アドバイザリー** |

パフォーマンスのベースライン (ヒープ、 TTFB、ビルド時間) は記録されますが、ゲートされません: を参照してください。 [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQLラチェット: 候補者の入場とリポジトリの目録

CI 候補者を所有しています CodeQL 明示的な依存関係チェーンを介した許可: `codeql-scan` で 4 つの言語マトリックスを呼び出します `codeql.yml`、 それから `codeql-admission` 走る `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` 両方の結果が必要です。 Quality は独自の数値チェックを保持しますが、プロデューサーが終了する前にスキャナーにクエリを実行しません。 `Gate / Quality` それだけでは候補者の入学は完了しません。 CodeQL 書類のみの候補者には引き続き必須です。

`config/quality/codeql-admission-policy.json`のポリシーでは、アクション、 C/C++、 JavaScript/TypeScriptおよび Python、クエリ スイートのデフォルト、リモート脅威モデル、およびビルド モード なしを選択します。プロデューサーのプリフライトは保留中のアクティベーション レコードを拒否し、明示的なターゲット リストの外に分岐します。現在のターゲットはメインであり、 release/v3.8.54. Contract テストはこの有限リストとメンテナンス プッシュ トリガーをパッケージ バージョンと比較します。次のリリースではオンボーディングを確認する必要があります。 CIの既存の広範なリリースPRトリガーは保持されますが、オンボードされていないターゲットは、未測定のPASSを取得するのではなく、抽出前にHOLDを報告します。

各マトリックス ジョブは、実際のSARIFアップロードID、言語、カテゴリ、実行と試行、呼び出し元のワークフロー ID、イベントref/head/base/merge SHA 、およびポリシー ハッシュを記録します。依存ジョブは、この実行のレシートのみをダウンロードし、アーティファクト ダイジェストを検証します。これには、4 つのカテゴリすべて、成功したプロデューサー、および正確な各アップロードの処理が完了していることが必要です。ブランチで見つかった最新の分析ではなく、 APIの sarif_id フィルターを使用します。部分的な再実行では、同じ実行と候補の以前の試行からの成功したカテゴリを再利用して、生成された試行を保存できます。失敗した現在のプロデューサーは、以前のグリーン証拠を再利用できません。

の CodeQL アクションは処理を待機しますが、ピン留めされた実装では、ステータス読み取りの失敗または待機が終了した後に警告を発して続行することができます。したがって、アドミッションは処理を再度検証します。カテゴリの欠落、保留中の処理、失敗またはキャンセルされたジョブ、古い ID、不完全なページネーション、または使用不可 APIs 生産する HOLD 独立したスキャナー ワークフローの固定待機は残りません。未スキャンの PR アラート クエリが 0 を返したため、合格できません。測定されたカウントが上記を超えています `metrics.codeqlAlerts.value` 出口1。別のブランチのアラートを吸収するためにベースラインが引き上げられることはありません。 [アップロードステータスと分析ルックアップ](https://docs.github.com/en/rest/code-scanning/code-scanning).

レシート記録のアップロードと分析IDs、カテゴリ、ツール バージョン、 ref/SHA、ベースラインおよびアラート番号。 SARIF identity/result数、最小ルール数、正確なアラート インスタンスは引き続き必須です。 PR/analysis ID は、受け入れる前に再チェックされます。これらのチェックでは、抽出されたすべてのソース ファイルのインベントリではなく、構成されたカテゴリの範囲が確立されます。 C/C++ビルドなし抽出には、プロジェクトのビルド中に生成されたコードは含まれません。情報源の除外については依然として検討が必要であり、貢献者の帰属については同等の正確な証拠が必要です。

`codeql-maintenance.yml` PR/mainプロデューサーを複製することなく、アクティブ リリースのプッシュ スキャンと週間スケジュールを提供します。 `nightly-codeql-inventory.yml`リポジトリ全体のベースラインを分離し、 `--strict-measurement`と測定が利用できない場合の障害を保持します。ローカルレガシーコレクターの優雅なスキップは候補者の入場ではありません。グローバル カウントの低下が確認された後も、引き締めは明示的な`--update`ままです。

デフォルト セットアップが構成されている間は、高度なワークフローを公開しないでください。 GitHub その組み合わせを拒否します。バージョン管理されたポリシーは、レビューされた管理移行が読み戻されるまで保留状態になります。公開前に、オペレーターがリポジトリを固定します。 head/base/tree, policy/patch/rollback ハッシュと観察されたセットアップ状態。 `node scripts/quality/codeql-producer.mjs verify-admin-readback` 提供された期待値と実際値をチェックします JSON 記録。これは技術的な保護であり、オペレータの承認や新しいリードバックの取得の代替ではありません。の PR トークンが管理アクセスを要求することはありません。ロールアウトおよびスキャナの変更には、個別のリードバックと実際のリードバックが必要です PR、フォークおよびマージグループの互換性の証拠。

フォークはホストされたランナーを使用し、永続的な認証情報を使用せずにチェックアウトし、プロデューサーにプロジェクトinstall/build使用せず、リポジトリ シークレットを継承しません。 GitHub 、削減されたフォーク トークンを使用して pull_request イベントのSARIFアップロードをサポートします。初回の貢献実行の承認はGitHubポリシーのままです。信頼できないコードを実行するために pull_request_target を使用しないでください。移行が完了したと考える前に、制御されたカナリア内の実際のトークン権限、analyze_key、およびすべてのカテゴリ環境を確認してください。[アップロード ルールのフォーク](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible)、[セットアップ モードの競合](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows)。

**解雇はオペレーターの判断によるものです（ハードルール） #14)** — 決して解雇しないでください CodeQL 解雇コメントに技術的な正当性を記録せずに警告する: `won't fix` アップストリームプロトコル要件の場合、 `used in tests` テストフィクスチャの場合、 `false positive` 消毒剤用 CodeQL 見えない（前例： `docs/security/ERROR_SANITIZATION.md`).

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

**上記でまだ文書化されていない項目**（助言扱い、得られるシグナルは弱い）：`docs-lint` ジョブ（markdownlint + Vale、ジョブ全体が `continue-on-error`）と、独立したスキャナーワークフロー `semgrep.yml` / `scorecard.yml` です。CodeQL には現在、`Gate / CI` 配下に必須の生成ジョブと受け入れジョブがあり、上記の有効化要件が適用されます。`semgrepFindings: 0` は `quality-baseline.json` にありますが、`ci.yml` のブロッキングラチェットには接続されていません。このメトリックは現在、実行チェックから切り離されています。

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
