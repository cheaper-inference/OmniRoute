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

### 候補の受け入れ

CI と Quality Gates ワークフローは、それぞれ安定した判定結果 `Gate / CI` と
`Gate / Quality` を出力します。バージョン管理された受け入れポリシーでは、上流の各ジョブを必須または参考扱いとして列挙しています。該当する必須ジョブは成功しなければなりません。結果が存在しない、キャンセル済み、スキップ済み、保留中、または不明な場合、PASS を確立することはできません。有効な docs-only または catalog-only 分類により、コードレーンを該当なしにすることはできますが、ドラフト PR は受け入れ候補ではありません。`hotfix` ラベルによって証拠要件が免除されることはありません。

両方のワークフローは、main/release ブランチへの PR、`main` への push、手動ディスパッチ、merge-group イベントを対象とします。Push、ディスパッチ、merge-group では完全な選択が実行されます。`release/**` への push ではこれらは開始されません（2026-10-18）。各変更はすでに PR 上でマトリックスを実行済みであり、マージ後の組み合わせは Release-Green の担当です（`docs/ops/RUNNER_BOX.md` → Hosted lane）。フォークと merge group では、通常 self-hosted runner を選択するジョブにも hosted runner を使用します。ロールアウト前に、十分な hosted 容量を検証する必要があります。

通常の PR では高速選択が実行されます。受け入れポリシーの
`full-code` および `full-code-e2e` レーン（E2E、統合、パッケージ成果物、Electron スモーク、Bun SQLite、エコシステムおよびプロトコルクライアント）は、Mergify キューのドラフト上、または完全実行でのみ実行されます。
`gh workflow run ci.yml --ref <branch>`。

各 JSON レシートには、チェックアウトした SHA、ワークフロー実行、および試行回数が記録されます。
CLI はチェックアウト SHA とイベント SHA が一致しない場合に拒否します。ワークフローテストは、判定ジョブの `needs` リストにポリシーのメンバーシップを紐付けるため、新しいレーンや削除されたレーンが暗黙に消えることはありません。レシートが対象とするのは自身のワークフローであり、公開、デプロイ、または既存の参考スキャナーの内部処理ではありません。ブランチルールで両方のチェック名を有効化することは別個の管理上の変更であり、これらのジョブを追加しただけではブランチは保護されません。

### マージキュー

`queue` ラベルを付けると、PR は Mergify キュー（`.mergify.yml`）に送られます。Mergify は
`mergify/merge-queue/` ブランチ上にドラフト PR を開き、その上で CI が完全な選択を実行します。`Gate / CI`、`Gate / Quality`、および
`Merge integrity (changelog + generated skills)` が成功すると、元の PR がマージされます。

Mergify はキューの概要をドラフトの説明に書き込みますが、他のアプリもそこを編集できます。
そのようなドラフトでの `pull_request` `edited` イベントは独自の同時実行グループ
(`-queue-edit-<run_id>`) を使用するため、ドラフトの実行中の本番 run をキャンセルできず、ゲートとマトリックスをスキップします。`Merge integrity` のみが引き続き実行されます。
スキップされたゲートジョブには別のチェック名が付けられます。これは、Mergify がスキップされた `Gate / CI` を失敗したチェックとして読み取り、PR をキューから外すためです。

キューから外された後、push しても PR が必ず再キューされるとは限りません。PR に
`@mergifyio queue` とコメントしてください。

### 受け入れ判定で保持される証拠

`scripts/quality/validate-release-acceptance.mjs` は、指定されたプランとそのマニフェストを縮約しますが、そのプランが完全なリリースパイプラインを対象としていることは立証しません。
そのレポートは、プランが `VERIFIED` であっても、明示的に `releaseAcceptance: false` を設定します。`release-acceptance.yml` ワークフローは、実際のビルド、パッケージ、起動、または昇格のレシートではなく、引き続きシャドーフィクスチャを使用します。

CLI で保持された証拠を検証するには `--evidence-root` が必要です。ファイルは `<evidence-root>/<artifact_id>/<member>` として解決され、SHA-256 でハッシュ化されます。証拠のない PASS レコード、欠落または変更されたファイル、安全でないパス、またはシンボリックリンクがある場合、検証は妨げられます。ファイルがないことは、空の成功ログと同等ではありません。既存の SHA/run/attempt チェックは独立したままです。一致するバイト列によって古いレシートが救済されることはありません。ファイルの完全性は、実行の真正性や成果物の昇格を証明するものではありません。

### 静的スキャン一覧

バージョン管理された npm-alias インベントリと静的スキャンのメンバーシップは、
`config/quality/gate-manifest.json` にあります。`npm run check:gate-manifest` を実行すると、
`package.json` に対するスクリプト名と完全なコマンドが検証されます。追加、削除、コマンドのドリフトがあると、ローカルフックと CI の変更分類ジョブの両方が失敗します。
エイリアスはワークフロージョブ、マトリックスインスタンス、またはテストケースではありません。これらの数を互換可能なものとして扱ってはなりません。

`npm run quality:scan -- --list` または `npm run quality:scan:fast -- --list` を使用すると、実行せずに選択されたエイリアスを確認できます。ランナーは npm エントリポイントを呼び出すため、設定されている場合は Bun を含め、そのランタイムが保持されます。
マニフェストには、これらのプロファイル外のエイリアスが個別に呼び出されるものとして記録され、保守コマンドは読み取り専用スキャンプロファイルでは禁止されています。

これらのプロファイルが対象とするのは静的スキャンのみです。製品テスト、カバレッジ、パッケージ化、外部チェック、または候補の完全なリリース受け入れを証明するものではありません。
ワークフローの受け入れでは、関連付けられた `config/quality/admission-policy.json` と
`scripts/quality/admission-verdict.mjs` が使用されます。Release-observer プロファイルは分離されたままです。該当するチェックとレシートを個別に確認してください。完全な observer の静的コマンドは `config/quality/release-green-static-profile.json` で宣言されており、`audit:deps`、mutation-test の選択、翻訳チェックが含まれます。ローダーは npm コマンドを package.json およびモデル化された CI/Quality 宣言に対して検証し、シェルのトークンを引数として実行するのではなく、ドリフトを拒否します。必須スキャナーの SKIP/INCOMPLETE 出力によって PASS を確立することはできません。このプロファイルには外部除外項目が記録されており、hosted coverage、テストマトリックス、パッケージ、またはデプロイの証拠を置き換えるものではありません。以下の説明的な一覧は参照情報であり、ゲートが実際に実行されたことの証明ではありません。

スクリプトは `scripts/check/`（ポリシーゲート）と `scripts/quality/`（ラチェットエンジン）にあります。
CI の信頼できる唯一の情報源は `.github/workflows/ci.yml` です。

### リリース PR の高速パス（`quality.yml`）

`.github/workflows/quality.yml` は、main/release PR、`main` への push、ディスパッチ、merge group において CI を補完します。PR ではパスフィルターされた高速チェックが使用されます。恒久的に無効化されていた重複ビルドは削除されました。実際のビルド、パッケージ、起動チェックは CI に残っています。
ユニットスイートと vitest は CI（`Unit Tests (N/8)` および `Vitest`）でのみ実行されます。

| ジョブ                                           | スコープ                                                                                                                | ブロッキング         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | ドキュメント/コード PR、API ドキュメント参照、docs-all                                                                  | はい                 |
| `Fast Quality Gates`                             | コード PR、静的チェック、型チェック、ダッシュボードの型チェック、影響を受けるユニットテスト、未実施の兄弟テスト（助言） |
| `No new ESLint warnings`                         | コード PR、抑制を考慮した lint ガード                                                                                   | はい、フォークを含む |
| `Merge integrity (changelog + generated skills)` | 非ドラフト PR、変更履歴と生成されたスキルの同期                                                                         | はい、フォークを含む |

#### 未実施の兄弟テストレポート

`npm run check:forgotten-sibling-tests` は `Fast Quality Gates` の助言ステップとして実行され、テスト影響マップの背後で使用されているインポートリゾルバーを再利用します。
変更された各本番モジュールについて、候補テストがプルリクエストの差分に存在しない場合に、決定論的な
`changed module/symbol -> static consumer -> candidate sibling test` のチェーンを報告します。Markdown サマリーと JSON 結果は、
ブロッキングを伴うロールアウトの前に調整するため、`forgotten-sibling-tests` ワークフローアーティファクトとして保持されます。

バレル再エクスポートと動的インポートは解決診断にのみ使用され、ブロッキング対象の検出結果を生成することはありません。レビュー済みの例外は
`config/quality/forgotten-sibling-allowlist.json` に記載されています。各エントリにはコンシューマーと候補テストを明記し、
具体的な理由を示したうえで、GitHub issue またはプルリクエストへのリンクを含める必要があります。不正な形式のエントリはフェイルクローズします。例外によって削除された候補テストや、`.skip`/`.todo` を追加する差分を抑制することはできません。
アサーションの弱体化やその他の隠蔽は、独立してブロッキングする
`check:test-masking` ゲートの管轄です。

### ジョブ: `lint`

すべての `main` への PR で実行されます。失敗した場合、マージをブロックします。

| Script (`npm run ...`)            | 検証対象                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ブロッキング                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | Node.js のバージョンがサポート対象範囲内であること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                    |
| `check:cycles`                    | `src/` + `open-sse/` 全体にわたる循環インポート（AST ベース、tsconfig の `paths` を解決）。循環が存在する場合、Bare は常に終了コード 1 で終了し（#15281 以降はフェイルクローズ）、SCC を一覧表示します。`check:cycles:ratchet`（CI が実行するもの）は、`quality-baseline.json` の `metrics.cycles` 上限を超えるとブロックします — 現在は 14、`direction: down` なので減少のみ可能です（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい（ラチェット）                      |
| `check:boundary`                  | `open-sse → src` の結合：エンジンからアプリへのファイル間の一意なインポート（`scripts/quality/measure-boundary.mjs`；エッジ一覧は v4 コア／モジュール分割の改善バックログです）。Bare は助言的なレポートです（`quality:boundary` と同じ）。`check:boundary:ratchet`（CI が実行するもの。`quality.yml` の fast-gates ラチェットループにも含まれます）は、`quality-baseline.json` の `metrics.boundaryOpenSseToSrc` 上限を超えるとブロックします — 実測値 771 で初期化され、`direction: down` です。`--update` では値を下げることのみ可能です。PR ではベース相対です（`--base-ref`、下記参照）                                                                                                                                                                                                                                                                                                                                                                                                                       | はい（ラチェット）                      |
| `check:route-validation:t06`      | すべてのルートに Zod スキーマが存在すること（Tier 6 ポリシー）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` の数が予算を超えない（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:provider-consistency`      | `providers.ts` のすべてのプロバイダーに、`providerRegistry.ts` 内の対応するエントリが存在する（および許可リストの範囲内でその逆も成り立つ）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                    |
| `check:model-lifecycle`           | 手動管理されている3つのルーティングテーブルが、チェックイン済みのライフサイクルスナップショット（#11503）と整合していることを確認します：`FITNESS_TABLE`（`taskFitness.ts`）が、`REGISTRY` でルーティング可能な引退済みIDをスコアリングしないこと、すべての `BUILT_IN_ALIASES` の対象が `REGISTRY` に存在し、引退済みIDのスナップショットには存在しないこと、`REGISTRY` に残っているすべての引退済みIDが転送されるか `allowedRetiredInCatalog` に記載されていること、さらに `DEFAULT_DEGRADATION_MAP` のソースまたは対象がそのスナップショットで引退済みとして扱われていないことを確認します。これは、モデルが現在稼働中のアップストリームによって提供されていることを証明するものではありません。オフラインで実行されます — `npm run quality:refresh-model-lifecycle`（ネットワークを使用し、CIには組み込まれていません）によって手動更新される `config/quality/model-lifecycle.json` と比較します。`allowedRetiredInCatalog` は縮小用のラチェットです：追跡用のIssueがある場合にのみエントリを追加してください。 | はい                                    |
| `check:fetch-targets`             | クライアント側の `src/` にあるすべての `fetch("/api/...")` が実在する `route.ts` に解決される                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                    |
| `check:deps`                      | リポジトリ内のすべての `package.json` に含まれる、`npm install` 可能な依存関係が `dependency-allowlist.json` に登録されていることを確認します。新たに追加された、バージョン固定されていないパッケージやスロップスクワッティングされたパッケージを検出します                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                    |
| `audit:deps`                      | 5つすべての独立したロックファイル（ルート、Electron、OpenCode plugins v1/v2、provider）に対して npm audit を実行します。重大なアドバイザリはブロックし、高リスクのアドバイザリは警告として表示し続けます。監査の欠落または失敗は INCOMPLETE とみなされ、ブロックします。スコープごとのロックハッシュとレポートは保持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                    |
| `check:lockfile`                  | `package-lock.json` の整合性 — https レジストリ、整合性ハッシュ、ホストの上書きなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                    |
| `check:licenses`                  | 本番依存関係に対する SPDX ライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                    |
| `check:tracked-artifacts`         | ビルド成果物やコミット済みの `node_modules` シンボリックリンクがないこと（husky の pre-commit でも実行される。pre-push は意図的に軽量 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | はい                                    |
| `check:ai-attribution`            | PR のコミット、タイトル、本文に AI／ボットの `Co-Authored-By` トレーラーや AI 生成フッターがないこと — ハードルール #16（PR→`release/**` 向けの `quality.yml` の fast-gates ループ内 — イベントペイロードを読み取り、PR 以外では何もしない — および PR→`main` 向けの `ci.yml` lint 内の PR 専用ステップ。また husky の `commit-msg` フックでも実行。人間の共同作成者は許可。#14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | すべての Vitest 除外に追跡用 issue が指定され、`config/quality/vitest-exclusions.json` に記載されていること（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                    |
| `check:file-size`                 | ソースファイル（`src/`、`open-sse/`、`electron/`、`bin/` 内の `.ts`／`.tsx`）が `cap` 以内に収まり、テストファイル（`*.test.ts(x)`）が `testCap` 以内に収まること。`file-size-baseline.json` で凍結されたファイル（`frozen`／`testFrozen`）は、記録されたサイズを超えて増加してはならない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                    |
| `check:error-helper`              | executors/handlers のエラーレスポンスでは `buildErrorBody()` / `sanitizeErrorMessage()` を使用する（Hard Rule #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                    |
| `check:migration-numbering`       | マイグレーション SQL ファイルには連番が付けられており、欠番や重複がない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                    |
| `check:public-creds`              | `publicCreds.ts` の外部に OAuth の `client_id`/`client_secret` や Firebase Web キーのリテラルがない（Hard Rule #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:db-rules`                  | `src/lib/db/` モジュールの外部に生の SQL がないこと、および `localDb.ts` からのバレルインポートがないこと（Hard Rules #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                    |
| `check:known-symbols`             | ディスパッチテーブルに登録されたプロバイダーの executor、ルーティング戦略、translator がディスク上のファイルと一致しており、孤立したシンボルや未宣言のシンボルがない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:route-guard-membership`    | 子プロセスを起動するすべてのルートが `isLocalOnlyPath()` によって分類されている（Hard Rules #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                    |
| `check:test-discovery`            | リポジトリ内のすべての `*.test.ts` / `*.spec.ts` ファイルが、少なくとも1つのテストランナーによって収集される（ラチェット: `test-discovery-baseline.json` の孤立ファイル一覧は縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                    |
| `check:test-tla-order`            | `tests/unit` 配下の `node:test` ファイルでは、テストを登録し、トップレベルの `await` に到達した後、さらにテストを登録してはならない（#18045; ラチェット: `test-tla-order-allowlist.json` は縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                    |
| `check:agent-skills-sync`         | 生成された agent-skills 成果物がソースカタログと一致している（ドリフトなし）。リリースモードではすべてのスキルをチェックし、機能 PR（`pr` モード）では、生成テキストを編集するスキルのみをチェックする — [生成ファイルと派生ベースライン](#generated-files-and-derived-baselines-written-at-release) を参照                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | プロバイダーのロゴ/アセットに、記録された来歴エントリが付与されている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON 設定ファイルが解析可能で、リポジトリの lint ルールを満たしている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | エラーなしで TypeScript をコンパイルする（警告のみの場合は助言扱い）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `typecheck:noimplicit:core`       | 厳格な `noImplicitAny` — 将来を見据えたチェック。既存の多くの呼び出し箇所には、まだ注釈が必要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **助言的**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` を対象とする `tsc`（#7033） — `typecheck:core` の厳選された27ファイルの許可リストにはダッシュボードのTSXが1つも含まれておらず、`next build` も型チェックを行わない（`next.config.mjs` で `ignoreBuildErrors: true` が設定されている）ため、そこでの孤立した識別子のリグレッション（#6625/#6909）はCIから見えない状態だった。固定されたファイル別・TSコード別の件数ベースライン（`config/quality/dashboard-typecheck-baseline.json`、`check:known-symbols` と同じ古いベースラインの強制パターン）との差分を取り、ベースラインの件数を超える**新しい**エラーだけがゲートを失敗させる。既存のエラーを修正した場合は、`--update` でラチェットを下げる。                                                                                                                                                                                                                                                                                                                                       | はい                                    |
| `check:build-typecheck`           | `tsconfig.build.json`（`src`、`open-sse`、`packages`、`bin`、`scripts`、`electron/**/*.d.ts`）全体を対象とする、本番用の型チェック。対象範囲は、`typecheck:core` の27ファイルの許可リストとダッシュボードのゲートではカバーされない。`config/quality/build-typecheck-baseline.json` との差分を取り、ファイルとコードの組み合わせごとの件数が新たに増えるか、増加した場合は失敗し、件数が減少した場合はラチェットを促す。実行結果に新規または増加した組み合わせが含まれている間は `--update` を拒否し、`--force-regressions` を渡した場合のみ許可する。また、新たに無視されたファイルについても `--force-nocheck` を渡さない限り拒否する。そのため、グリーンにするためにベースラインを拡大することと、恒久的な無視を許可することは、意図的に分けて行う2つの操作になる。単独の `--force` は拒否される。さらに、ビルド対象範囲について `@ts-nocheck` を `config/quality/ts-nocheck-baseline.json` と照合する。これを使用するファイルは診断を一切報告せず、そうでなければすべてのゲートから見えなくなるためである。    | はい                                    |

#### 2つの型チェックプログラムは異なる結果を返す

`typecheck:core` と `check:build-typecheck` は、異なるオプションの下で異なる
プログラムをコンパイルするため、同じファイルが一方では問題なく、もう一方では
エラーだらけになることがあります。

`tsconfig.build.json` では `"strict": false` が設定されているため、`noImplicitAny` は
無効です。core の設定では、より厳格なオプションを使用して厳選された27ファイルの
許可リストをコンパイルし、各エントリのインポートグラフをたどります。そのため、
ビルドプログラムには一度も登場しないファイルも、こちらではチェックされます。

ファイルが型付けされているかどうかを判断する際には、この点が重要になります。
**`check:build-typecheck` で診断がゼロであっても、ゼロを意味するわけではありません**。
26ファイルから `@ts-nocheck` を削除したところ、ビルドプログラムでは23ファイルに
問題がありませんでしたが、そのうち16ファイルでは、厳格なプログラムで約120件の
implicit-any エラーが発生しました。ファイルを問題なしと判断する前に、両方を
チェックしてください。

### ジョブ: `quality-gate`

`test-coverage` の後に実行されます。失敗するとマージをブロックします。

| スクリプト                   | 検証内容                                                                                                                                                                                | ブロッキング           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json` を出力（ESLint 警告数、マージされたシャードレポートからのカバレッジ）                                                                                            | はい（ratchet の上流） |
| `quality:ratchet`            | `quality-baseline.json` の各メトリクスが悪化していないことを検証（ESLint 警告数 ≤ ベースライン、カバレッジ ≥ ベースライン）                                                             | はい                   |
| `check:duplication`          | コードの重複（jscpd@4）が `quality-baseline.json` のベースラインを超えないことを検証                                                                                                    | はい                   |
| `check:complexity`           | ファイルレベルの循環的複雑度が上限を超えないことを検証（コア ESLint の `complexity` + `max-lines-per-function`）                                                                        | はい                   |
| `check:cognitive-complexity` | 認知的複雑度の ratchet（`eslint-plugin-sonarjs`）— 独立した ESLint パス。CI では両方を単一の `check:complexity-ratchets` ステップとして実行                                             | はい                   |
| `check:dead-code`            | 未使用のエクスポート / ファイルの ratchet（knip）がベースラインと比較して悪化していないことを検証                                                                                       | はい                   |
| `check:compression-budget`   | 圧縮ベンチマークの予算 — エンジンごとのトークン削減量の下限が悪化していないことを検証                                                                                                   | はい                   |
| `check:type-coverage`        | 型付け率の ratchet（`type-coverage`）が悪化していないことを検証。大部分は `typecheck:noimplicit:core` を包含                                                                            | はい                   |
| `check:codeql-ratchet`       | オープンな CodeQL アラート数が悪化していないことを検証（`gh api` 経由で読み取り、トークンがない場合は正常にスキップ）— 更新頻度と手動トリガーについては、以下の「CodeQL ratchet」を参照 | はい                   |

### ジョブ: `quality-extended`

ジョブ全体が参考扱いです（`continue-on-error: true`）。npm ベースの ratchet は
実際に実行されます。外部スキャナーは `gh release download` 経由でインストールされ、バイナリがまだ存在しない場合は自動的にスキップします（exit 0）。

| スクリプト               | 検証内容                                                                                                                                                                                                                | ブロッキング                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | 循環依存がないこと（dpdm）                                                                                                                                                                                              | **参考扱い**                                    |
| `check:bundle-size`      | バンドルサイズが上限を超えないこと                                                                                                                                                                                      | **参考扱い**                                    |
| `check:secrets`          | シークレットスキャン（gitleaks）— バイナリがない場合はスキップ                                                                                                                                                          | **参考扱い**                                    |
| `check:vuln-ratchet`     | 依存関係の脆弱性（osv-scanner）が悪化していないこと — 未測定の場合、`--ratchet` は INCOMPLETE（exit 2）として失敗                                                                                                       | **参考扱い**                                    |
| `check:workflows`        | ワークフローの lint（actionlint + zizmor）。スキャナーの欠落 / 破損、無効なレポート、または ratchet ベースラインの欠落は INCOMPLETE として失敗。有効な検出結果は、選択された strict / advisory / ratchet ポリシーに従う | 実行必須；CI では zizmor ratchet がブロッキング |
| `check:openapi-breaking` | 固定されたイベントコミットに対する公開 API コントラクト（PR の merge-base、push 前、merge-group の base；スケジュール / 手動チェックアウトでは first parent）。必須の測定に失敗した場合はクローズドフェイル             | `--ratchet` 使用時は **ブロッキング**           |

### ジョブ: `docs-sync-strict`

`main` へのすべての PR で実行されます。失敗するとマージがブロックされます。

| Script                         | 検証内容                                                                                                                                                                 | ブロッキング                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `check:docs-all`               | 以下の6つのサブゲートを順番に実行するメタゲート                                                                                                                          | はい                             |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI のバージョン整合性。リリースモードでは、66個の `llm.txt` ミラーと翻訳済み CHANGELOG セクションも対象（PRモードではミラーの一致）                     | はい                             |
| ↳ `check:docs-counts`          | 文章中の数値（プロバイダー数、移行数など）。2つのモードがあります。機能PRでは `pr`、それ以外では `release` — 以下の「派生値」を参照                                      | はい                             |
| ↳ `check:env-doc-sync`         | `.env.example` 内のすべての環境変数がドキュメントの表に記載され、その逆も満たすこと                                                                                      | はい                             |
| ↳ `check:deprecated-versions`  | ドキュメントに非推奨のバージョン文字列がないこと                                                                                                                         | はい                             |
| ↳ `check:doc-links`            | ドキュメント内の内部Markdownリンクが実在するファイルに解決されること（`[text]`/`(path)` 形式）                                                                           | はい                             |
| ↳ `check:fabricated-docs`      | ドキュメントで参照されているルート、環境変数、CLIコマンド、フック名、ファイルパスがコードベースに存在すること。`--strict` によるハードゲート。フラグなしではソフト失敗。 | CIでは `--strict` 経由で「はい」 |
| `check:cli-i18n`               | CLIの `t()` キーが `bin/cli/locales/en.json` に存在すること（両モード）。リリースモードのみ、pt-BR / zh-CN / zh-TW と `en.json` の対応も検証                             | はい                             |
| `check:openapi-coverage`       | OpenAPI仕様が、実在するルートのうち、段階的に引き上げられる最低基準以上をカバーしていること                                                                              | はい                             |
| `check:openapi-security-tiers` | `openapi.yaml` のセキュリティ層アノテーションが、`routeGuard.ts` の分類と整合していること                                                                                | **助言扱い**                     |
| `check:openapi-routes`         | `openapi.yaml` 内のすべてのパスが実在する `route.ts` に解決されること（幻覚防止）                                                                                        | はい                             |
| `check:docs-symbols`           | `docs/**/*.md` 内のすべての `/api/...` 参照が実在する `route.ts` に解決されること（幻覚防止）                                                                            | はい                             |
| `i18n translation drift`       | `docs/i18n/**` のミラーと `.i18n-state.json` の差分 — PRでは助言扱い（ミラーは翻訳ウェーブによって更新）、pushおよび nightly では厳格に検証                              | PRでは**助言扱い**               |

#### 翻訳ミラーは派生ファイルです（PRモードとリリースモード）

機能PRでは英語のソースのみを編集します。`docs/i18n/<locale>/**` のミラー（66個の
`llm.txt` コピーと翻訳済み `CHANGELOG.md` ファイルを含む）および `.i18n-state.json` は、翻訳ウェーブ（`docs/i18n-*` / `chore/i18n-*` ブランチ、スケジュール実行される
`i18n-mirror-refresh.yml`）とリリース（`npm run release:sync-changelog-i18n`）によって1つのステップで書き換えられます。したがってミラーゲートは2つのモードで実行され、`scripts/check/lib/gateMode.mjs` によって解決されます（`--mode=pr|release`、次に
`OMNIROUTE_GATE_MODE`、最後にActionsイベントの順で判定。ローカル実行では `release`）：

- `check:docs-sync` — リリースモードではすべてのチェックを実行します。PR モードでは package.json/OpenAPI のバージョン、ルート CHANGELOG の見出し、superseded-docs ガードを維持し、`llm.txt` のミラーコピーと翻訳済み CHANGELOG セクションについては
  `SKIP reason=pr-mode` を出力します — ただし、PR がミラーを書き込む場合を除きます。`config/quality/derived-paths/*.json` で `docs/i18n/**` ファミリーの writer として宣言された head ブランチでは、両方のチェックを厳密に実行します。また、diff のベースを解決できる場合は、その差分自体で `docs/i18n/<locale>/llm.txt` または `CHANGELOG.md` を編集した変更についても、そのチェックを厳密に実行します。depth-1 checkout（`docs-sync-strict` ジョブ）では diff のベースを解決できないため、PR モードではベースを必要としないチェックも 1 つ実行します。すべての `llm.txt` ミラーが存在し、`---` セパレーターを維持し、ルートの本文または大半のミラーが共有する本文のいずれかを含んでいることを確認します。ベースが移動した場合は、すべてのミラーが同じように古くなるため合格します。1 つのミラーを手動編集すると失敗します。depth-1 PR checkout では、翻訳済みの `CHANGELOG.md` ファイルにこのようなチェックはありません。
- pre-commit フックは `check-docs-sync.mjs --mode=pr` を実行します。コミットは、そのコミットが行う内容に基づいて判定されます。フラグを指定しないローカル実行はリリースモードになり、root の `llm.txt` を編集する PR が 1 つマージされると、その wave が実行されるまで、そのベース上の後続のすべてのコミットをブロックしてしまいます。Husky フックが実行するモード対応ゲートにも同じルールが適用されます。フックは `--mode=pr` を渡し、厳密な判定はリリースモードでの実行（リリース PR、`main` への push、通常のローカル実行）に委ねられます。
- ミラー内容のユニットテスト（`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`、`resilience-pre-dispatch-docs-mirrors`、`cli-env-quality-docs-mirrors`、`docs/*-locales`）では、リリースモードですべての locale を検証します。PR モードでは、`.i18n-state.json` に基づいて英語ソースと同期しているミラー（ファイル全体のハッシュ、またはテストが固定するセクションの記録済みセクションハッシュ）のみを検証し、古いものは理由を示してスキップします。`target_hash` の provenance チェックは、どちらのモードでもすべての locale に対して実行されます。鮮度は各 `## ` セクション単位で判定され、ユニットの `run-translation.mjs` がハッシュを計算します。このファイルのゲート一覧のように長いセクションは、そのセクション内のどの編集でも該当するミラーが古くなることを意味し、次の wave まで PR モードのアサーションはスキップされます。英語ソースに存在しなくなったアンカーは、ファイル全体の比較にフォールバックします。
- `i18n translation drift` — PR では advisory、push、nightly、リリースカットでは strict です。そのため、古いミラーがリリースに含まれることはありません。

`scripts/i18n/sync-llm-mirrors.mjs`（`syncLlmMirrors()` としても export され、`--dry-run` に対応）は `llm.txt` のミラーを書き換えます。リリース更新、翻訳 wave、スケジュールされた `i18n-mirror-refresh.yml` はこれを実行します（drift レポートにはミラーが一覧表示されないため、更新処理は dry run で古い `llm.txt` ミラーを検出し、`check:docs-all` の前に同期します）。

`docs/diagrams/` 以下の 12 個の README SVG は生成物です（`scripts/docs/gen-readme-<name>.mjs`。`npm run docs:readme-diagrams` ですべて再生成できます）。それぞれにバイト比較のユニットテスト（`tests/unit/docs/readme-*-svg.test.ts`、ジョブ `test-unit`）があり、リリースモードではコミット済みファイルが古い場合に失敗します。PR では、`check:generated-artifacts` が PR で編集された SVG を判定し、ベースの drift はリリース更新に委ねられます（[生成ファイルとリリース時に書き込まれる派生ベースライン](#generated-files-and-derived-baselines-written-at-release) を参照）。また、`check:docs-counts` は `<text>` ノードから正規の数値を読み取ります。これが、アウトライン化のステップで、アウトライン化されたすべての文字列を非表示の `<text>` としてファイル内に保持する理由です。SVG の正規数値チェックは `SVG_DIAGRAM_FILES`（`scripts/check/check-docs-counts-sync.mjs`）に列挙されたファイルを読み取ります。対象は `docs/diagrams/readme-hero.svg`、`free-tier-budget.svg`、`promise-pillars.svg`、`comparison-table.svg`、`cli-terminal.svg`、`tier-cascade.svg`、さらに `public/images/tier-flow-dark.svg` と `tier-flow-light.svg` です。free-forever、catalog-entry、recurring-pool、scoring-factors のクレームについても、`promise-pillars.svg`、`free-tier-budget.svg`、`strategies-grid.svg` を読み取ります。これらの生成物が描画する数値（provider の合計、MCP tools、routing strategies、free-forever providers など）は、リテラル値ではなく、`scripts/docs/readmeFacts.mjs` を通じて facts スナップショット `docs/reference/derived-facts.json` から取得されるため、どのブランチでもダイアグラムを再生成すればコミット済みファイルを再現できます。`free-tier-budget.svg` は同じスナップショット（facts probe が記録するカタログ概要である `code.freeTierBudget`）から行を描画するため、`FREE_MODEL_BUDGETS` の変更は次回の更新でカードに反映され、CI が赤くなることはありません。

### 派生値: `pr` および `release` ゲートモード

機能 PR が、ベースの状態に依存する値（provider、migration、MCP-tool、strategy の数、README SVG の数値、facts スナップショット）を書き込むことはありません。1 つのステップですべてを再計算し、リリースと nightly の derived-refresh PR が `npm run release:refresh-derived` を実行します。そのため、**リリース間ではベースが意図的に実際のコードに遅れています**。ライブコードとツリーを比較するゲートやテストは、兄弟 PR が provider を追加した後のすべての PR で赤になってしまいます。したがって、派生値を判定するゲートは、`scripts/check/lib/gateMode.mjs` が解決する次の 2 つのモードのいずれかで実行されます（最初に一致したものが優先されます）。

1. コマンドラインの `--mode=pr|release`;
2. `OMNIROUTE_GATE_MODE` 環境変数（`pr` または `release`）;
3. GitHub Actions のイベントに基づく自動判定。head が `release/v*` ではない `pull_request`、`merge_group`、または `omni-queue/**` への push → `pr`。それ以外（push、schedule、dispatch、リリース PR `release/v* → main`、すべてのローカル実行）→ `release`。

各モードで `check:docs-counts`（`scripts/check/check-docs-counts-sync.mjs`）が失敗する条件は次のとおりです。

| Mode      | Fails                                                                                                                                                                                                                                                                                                                                                                                                                                         | Needs the live facts |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `release` | すべてのチェック。ツリーから収集した事実との厳密な一致を検証します（ゲートが常に備えていた動作）。古いカウント、バージョン、カバレッジ下限、または SVG の数値は、STRICT な差分として扱われます                                                                                                                                                                                                                                                | Yes                  |
| `pr`      | 変更された内容のみを、同じクレーム抽出器を使って PR のベースとの差分として検証します。(1) そのチェックとファイルについて、ベースに存在しなかった管理対象の値（「PR が管理対象の数値を編集しました — 行をベースのテキストに戻してください」）。(2) ベースに存在していた必須クレームがヘッドで失われている場合。事実を必要としないコンテンツ不変条件は release モードと同様に実行されます。release 専用チェックは一覧表示され、スキップされます | No                   |

エージェント指示ファイルには、派生したカウントが一切ありません。`AGENTS.md`、`llm.txt`（およびその
`docs/i18n/*/llm.txt` コピー）、bs の `AGENTS.md` フォーク、`open-sse/services/AGENTS.md`、
`src/shared/constants/agentSkills.ts`、`skills/README.md`、すべての `skills/*/SKILL.md` は、
ソース（たとえば `src/shared/constants/routingStrategies.ts` の `ROUTING_STRATEGY_VALUES`）と
`npm run facts` を参照します。不変条件「No derived counts (agent-instruction file …)」は、
両方のモードで、そこにあるカウント（プロバイダー、マイグレーション、MCP ツールとスコープ、
ルーティング戦略、スコアリング要素、モードパック）に対して失敗します。そのため、release の
更新処理が指示ファイルを書き換える必要はありません。

`pr` モードでは、書き込みを行うブランチが管理対象の値を編集する場合があります。
`chore/derived-*`（夜間更新 PR）、`release/v*`、翻訳ウェーブの `docs/i18n-*` と
`chore/i18n-*`（`scripts/check/lib/derivedClaimsDiff.mjs`）が該当します。キューバッチ
（`merge_group`、Mergify のドラフト、`omni-queue/**`）は、ゲートが各 PR を個別に判定済みで
あるため、再度判定されません。

終了コード: `0` はクリーン、`1` は STRICT な差分（または `--strict` 指定時のソフトな差分）、
または管理対象値の違反、`2` はインフラストラクチャエラーです。インフラストラクチャエラーは、
コード上の事実を収集できなかった場合（tsx プローブが失敗またはタイムアウトした場合。
タイムアウトは `OMNIROUTE_FACTS_TIMEOUT_MS` で、デフォルトは 600000 ms）や、CI で PR の
差分ベースを解決できなかった場合に発生します。終了コード 2 はドキュメントの不一致を意味する
ものではありません。ジョブを再実行するか、環境を修正してください。

各モードが実行される場所:

| Where                                                                                                 | Mode                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 機能 PR — `ci.yml` ジョブ `docs-sync-strict`、`quality.yml` のステップ「Docs accuracy」               | `pr`（自動）。ジョブはベースを `BASE_SHA` として渡し、`fetch-depth: 2` でチェックアウトします                                                                                                                                 |
| `merge_group`、`omni-queue/**` の候補、マージトレインの完全なゲートリスト                             | `pr`                                                                                                                                                                                                                          |
| リリース PR（`release/v* → main`）、プッシュ、スケジュール実行、手動実行                              | `release`                                                                                                                                                                                                                     |
| Release-Green（`scripts/quality/validate-release-green.mjs`）                                         | HARD 項目は `OMNIROUTE_GATE_MODE=pr`（「ベースが壊れていないか」）で実行されます。DRIFT 項目 `derived-refresh` は `npm run release:refresh-derived -- --check` を実行します（strict ビューで、base-red は決して作成しません） |
| Release（`/generate-release` のフェーズ 0a と 1。スキルの配線は、承認済みの別オーナーによる変更です） | `npm run release:refresh-derived` が派生ファイルを書き込みます。その後、リリース PR 自体のチェックが `release` モードで実行されます                                                                                           |
| `nightly-derived-refresh.yml`（毎日実行、最も新しい `release/vX.Y.Z`、release-freeze 中はスキップ）   | `npm run release:refresh-derived -- --profile=nightly`。差分がある場合は `chore/derived-refresh` から ONE PR だけをオープンし、マージは行いません                                                                             |

これを実行するコマンドは次のとおりです:

- `npm run facts` は、派生したすべての数値を JSON として出力します（`scripts/release/facts.mjs`）。
  `--key=code.mcpTools` は 1 つの値を出力し、`--snapshot` はライブツリーではなくコミット済みのスナップショットを読み取ります。facts を収集できない場合は終了コード 2 になります。
- `npm run release:refresh-derived`（`scripts/release/refresh-derived.mjs`）は、派生ファイルを次の順序で 1 回のパスで再計算します（`--only=` のステップ ID）：`provider-reference`
  （`docs/reference/PROVIDER_REFERENCE.md`）、`facts`（スナップショット）、`numbers`（counts gate の書き換え計画をドキュメントに適用し、その後 `docs/i18n/` のミラーにも反映）、`readme-diagrams`、
  `skills`（生成された `SKILL.md`）、`e2e-timings`（ツリーに `syncE2eTimings` が追加されるまでスキップ）、`ui-keys`（`en.json` から削除されたキーを削除し、`--rewritten-since=<ref>`（デフォルトは `origin/main`）を指定した場合は、前回のリリース以降に書き換えられた英語の値を再キュー）、`llm-mirrors`、および `verify-generated`（書き込み後、リリースモードでは `check:generated-artifacts` と `check:agent-skills-sync` に合格する必要があります。`--check` の場合、および `--only` でこのステップを除外した場合はスキップされます。失敗時の終了コードは 2 です）。  
  `changelog` ステップはオプトインです（リリースプロファイルでのみ `--with-changelog`）。`--profile=nightly` はバージョンに関する主張を一切変更しません。`-- --check` を指定すると何も書き込まず、変更されるファイルまたは手動編集が必要な管理対象の値がある場合（両方を一覧表示）は終了コード 1 で終了します。インフラストラクチャの失敗時は終了コード 2 です。`--json` は結果を JSON として出力します。
- `docs/reference/derived-facts.json` は、最後の refresh で使用された facts のスナップショットです。これを書き込むのは refresh だけです。README の SVG ジェネレーターはこれを読み取り、PR 時のユニットテストはライブコードではなく、コミット済みのドキュメントおよび生成ファイルとこれを比較します。スイートで唯一のライブ比較は、`tests/unit/check-docs-counts-sync.test.ts` にある「release refresh がサイクルを完了する」テストです。ライブ facts を使用し、refresh の書き換え計画をメモリ上で適用した結果、報告されない STRICT drift が残らず、再計画しても何も変更されないことを確認します。

ローカルで再現するには（ローカル実行のデフォルトは `release` です）：

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # feature PR で判定される内容
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # release で書き換えられる内容
```

解決可能な base がない場合（`BASE_SHA`/`BASE_REF` がなく、ローカルの `origin/release/v<version>` もない場合）、ローカルの
`pr` 実行は警告を出して diff をスキップし、失敗にはなりません。

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                                     | Blocking                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n キーのカバレッジが 65% 以上であること                                                                                                                                                                 | Yes (both modes)        |
| `check:ui-icu`                    | すべての UI カタログのすべてのメッセージが `IntlMessageFormat` でコンパイルできること                                                                                                                         | Yes (both modes)        |
| `check-ui-value-drift` (inline)   | 書き換えられた英語の **値** に古い翻訳が残っていないこと                                                                                                                                                      | Yes (release mode only) |
| `check-new-key-coverage` (inline) | **新しい** 英語キーがすべてのロケールで翻訳されていること — `__MISSING__:` マーカーは拒否されます                                                                                                             | Yes (release mode only) |
| `check-key-completeness` (inline) | すべての UI カタログ（および `--catalog=cli` 指定時はすべての CLI カタログ）が `en.json` と完全に同じキーセットを持つこと。`pr` モードでは、PR が変更した各カタログについて、マージベース時点の自身と比較する | Yes (both modes)        |
| `check-translation-ratio`         | ロケールごとの実翻訳率（英語と同一／プレースホルダー／未翻訳で、allowlist 外に残るもの）が `config/quality/i18n-translation-baseline.json` + slack を超えないこと                                             | Yes (release mode only) |

`fetch-depth: 0` が必要です — value-drift gate は `en.json` をマージベースとの差分として比較します。

**2 つのモード（2026-11-13 以降）。** feature PR では `en.json`（および
`bin/cli/locales/en.json`）のキーを追加または書き換え、他のロケールには変更を加えません。`check:pr-derived-paths`（job
`pr-test-policy`、family `config/quality/derived-paths/translation.json`）は、それを行った feature PR を失敗させます。他のロケールは、リリースごとに 1 回 `release:refresh-derived` によって完成されます。このコマンドは
`scripts/i18n/sync-ui-keys.mjs` の `syncUiKeys()` を呼び出し（不足しているキーを追加し、削除されたキーを削除し、書き換えられた英語に対する翻訳を `rewrittenSinceRef` でマークし、翻訳する）、または翻訳ウェーブによって完成されます。ゲートは `scripts/check/lib/gateMode.mjs` からモードを読み取ります。`pr` モード（feature PR、`merge_group`、`omni-queue/**`）では、上記のリリースモードのゲートは `SKIP reason=pr-mode` を出力して終了コード 0 で終了します。`release` モード（リリース PR、`main` への push、`workflow_dispatch`、ローカル実行）では、従来どおり厳格に実行されます。リリース PR では、diff を認識するゲートに `BASE_REF=origin/main` が設定されるため、そのサイクルで追加または書き換えられたすべてのキーが判定対象になります。feature PR の判定結果は、`--mode=pr` を指定してローカルで確認できます。

`pr` モードでロケールカタログを変更する PR（翻訳ウェーブ、リリース更新、翻訳のみの修正）もスキップされません。`check-key-completeness` は、変更された各カタログをマージベース時点の同じカタログ（`scripts/i18n/lib/touched-catalogs.mjs`）と比較し、カタログから失われたキー、`en.json` に存在しないキー、実際の翻訳から `__MISSING__:` マーカーまたは英語テキストに変わった値、または PR が変更していない英語文字列のプレースホルダーやタグを補間できなくなった値があると失敗します。PR で新規追加されたカタログには、`en.json` のキーセット全体が含まれていなければなりません。これにより、PR が変更したカタログについて、ratio ゲートと CLI-parity ゲートで確認される内容がカバーされます。

ロケールパリティのユニットテスト（`cli-i18n-catalog`、`i18n-pt-br`、`i18n-vi-completeness`、`i18n-placeholder-parity`）は、`tests/_helpers/localeParityMode.ts` を通じて同じモードに従います。`pr` モードではキーのパリティ検証をスキップし、マージベース以降に英語が変更されたキーのプレースホルダー・パリティについては、リリース更新に任せます（ユニットテストジョブの浅いチェックアウトからマージベースを読み取れない場合は、すべてのキーが対象になります）。このヘルパーは、モードに応じたスキップとして認められている唯一のものです。`check:test-masking` は `.skip(` と `{ skip: true }` をカウントしますが、返される計算済みの `{ skip: "<reason>" }` はカウントしません。そのため、`tests/unit/locale-parity-mode.test.ts` では、このヘルパーの使用を許可するテストの一覧を固定しています。そこへの追加は、その一覧に対するレビュー済みの編集となります。

#### `check-ui-value-drift` — 古い翻訳の検出ゲート

他のゲートでは構造的に検出できない、i18n における 1 つのリグレッションを検出します。英語の値が書き換えられたにもかかわらず、以前の英語から派生した翻訳が更新されずに残り、英語以外のユーザーが、自信に満ちた表現ではあるものの現在は誤っている文言を読み続けるケースです。

これは実際に発生しました。Antigravity のログインヘルパーが追加された際（#5203）、`oauthModal.googleOAuthWarning` が書き換えられました。しかし、**43 ロケール中 39 ロケール**では、オペレーターに「完全な URL をコピーして下に貼り付ける」よう伝えるテキストが残っていました。このプロバイダーでは完了できないフローです。#8463 まで気づかれなかった理由は次のとおりです。

- `sync-ui-keys` は**存在しない**キーのみを補完し、古くなったキーは補完しない。
- `check-ui-keys-coverage` はキーの _存在_ を数えるため、古い翻訳もカバー済みとしてスコアリングされる。
- `check-translation-drift` は `docs/i18n/<locale>/**.md` のドキュメントミラーを追跡するもので、`src/i18n/messages/*.json` は読み取らない。これは `docs-sync-strict` ジョブで実行され、PR では助言的、push と nightly では厳格に実行される。翻訳ウェーブではミラーが更新されるのであって、機能 PR が更新されるわけではない。

**ベースラインではなく差分を認識します。** マージベース時点の `en.json` と作業ツリーを比較し、英語の値が変更されたすべてのキーについて、翻訳が変更されていないロケールを古いものとして扱います。これは既存の負債を意図的に**凍結**します。差分からは、長期間存在する翻訳がどの古い英語から派生したものかを特定できないため、このゲートでは現在の変更が触れているものだけを判定します。代替案であるキーごとのハッシュベースラインでは、約 600 KB の生成ファイルが必要になり、既存の最大ベースラインの 3 倍に達するうえ、i18n PR ごとに変更が発生します。

これを満たす方法は 2 つあります。

1. 影響を受ける翻訳を更新する。
2. `__MISSING__:<new english>` に設定する。ランタイムは修正済みの英語を提供し（`src/i18n/request.ts::deepMergeFallback`、#7258）、そのキーを翻訳キューに入れます。

文字列の**意味**が変わった場合は、キーの**名前変更**を優先してください。新しいキーが古い翻訳を引き継ぐことはありません。#8463 ではこのパターンが使用されました。

```bash
npm run i18n:check-value-drift          # 厳格（CI で実行されるもの）
npm run i18n:check-value-drift:warn     # レポートのみ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ベースカタログを読み取れない場合（ベース ref を含まない浅いクローン）は、`check-openapi-breaking` と同様に、`SKIP reason=base-unresolved` を出力して 0 で終了します。リリースモードのみが対象です。機能 PR は英語を書き換えてそこで止まり、リリース更新で残された翻訳に印が付けられます（`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`、同じ `findStaleTranslations`）。

### ジョブ: `i18n`

完全な i18n 検証マトリックス（ロケールごとに 1 ジョブ）。ジョブ全体が助言的です。

| スクリプト                      | 検証対象                   | ブロッキング                                         |
| ------------------------------- | -------------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | ロケールごとの翻訳の完全性 | **助言的**（ジョブ全体で `continue-on-error: true`） |

### ジョブ: `pr-test-policy`

プルリクエストでのみ実行されます。

| スクリプト             | 検証対象                                                                                                                                      | ブロッキング |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | `src/`、`open-sse/`、`electron/`、`bin/` の本番コードを変更する PR に、テストの追加または更新が含まれていること（Hard Rule #8）               | Yes          |
| `check:test-masking`   | 変更されたテストファイルがアサート数の実質的な減少や `assert.ok(true)` の恒真式を追加していないこと                                           | Yes          |
| `check:pr-evidence`    | 変更に関するテスト/VPS のエビデンスが PR 本文に記載されていること（PR の文章を grep して Hard Rule #18 を機械化。脆弱であり、Backlog を参照） | Yes          |

### ジョブ: `test-vitest`

`build` の後に実行されます。失敗するとマージをブロックします。

| スイート         | 検証内容                                                            | ブロッキング                                                                                                        |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP サーバー（110 ツール）、autoCombo、キャッシュ — vitest ランナー | はい                                                                                                                |
| `test:vitest:ui` | UI コンポーネントテスト — vitest ランナー                           | **ブロッキング** — 既存の失敗は `vitest.config.ts` で明示的に除外されています。新たな失敗があるとジョブは失敗します |

### Nightly ワークフロー（スケジュール実行、助言目的）

これらは cron スケジュール（および `workflow_dispatch`）で実行され、PR では実行されません。すべて助言目的です。

| ワークフロー           | 検証内容                                                                                                                                                              | ブロッキング |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | ランダムシード + 高い実行回数による fast-check プロパティテスト                                                                                                       | **助言目的** |
| `nightly-resilience`   | ヒープ増加ゲート、カオス障害注入、k6 による負荷・ソークテスト                                                                                                         | **助言目的** |
| `nightly-llm-security` | promptfoo によるインジェクションガード（ブロックモード） + garak プローブ（プロバイダーシークレットがない場合はスキップ）                                             | **助言目的** |
| `nightly-schemathesis` | `docs/openapi.yaml` を使用し、稼働中の OmniRoute に対して実行する OpenAPI コントラクトファジング（schemathesis） — 仕様違反 / 未処理の 500 エラーを検出（Fase 8 B.4） | **助言目的** |
| `nightly-mutation`     | 高速ユニットレーンに対する Stryker ミューテーションテストのスコア — 生き残ったミュータントからアサーションの弱さを検出                                                | **助言目的** |
| `nightly-compat`       | サポート対象の `engines.node` 範囲全体にわたる Node エンジン互換性マトリクス                                                                                          | **助言目的** |

パフォーマンスのベースライン（ヒープ、TTFB、ビルド時間）は記録されますが、ゲートの対象にはなりません。[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）を参照してください。

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

## 生成ファイルと派生ベースライン（リリース時に書き込まれる）

計画 2026-11-13（「派生した数値とテキストはリリース時にのみ解決」）：機能 PR は
**ソース** — `src/shared/constants/providers.ts`、`docs/openapi.yaml`、スキルカタログ、
無料ティアカタログ、新しい e2e spec — を変更します。ソースから計算されるファイルは再生成せず、
測定された改善をベースラインに反映もしません。これらのファイルは、リリース更新
（`release:refresh-derived`）または夜間の更新 PR によって一度だけ書き換えられます。これ以前は、
すべての sibling PR がそれぞれ再生成済みのコピーを含めていたため、次のマージと競合していました
（2026-11-13：オープン中の 321 PR のうち 30 件が `PROVIDER_REFERENCE.md` を書き換え、26～28 件が
README の図を書き換えていました）。

**ガード。** `check:pr-derived-paths`（ジョブ `pr-test-policy`）は、
`config/quality/derived-paths/` 内のファミリーに属するファイルに変更を加えた機能 PR を失敗させます。

| ファミリー  | ファイル                                                                                                                                                                          | 書き換え元                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; 12 個の生成済み README SVG；`skills/*/references/**`；カスタムブロックを持たない `SKILL.md` ファイル | `release:refresh-derived`（facts）、`gen:provider-reference`、`docs:readme-diagrams`、`generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                 | `balance-e2e-shards.mjs --sync`（`syncE2eTimings()`）                                                                     |

書き換え元（ベースラインの場合は `release/v*`、`chore/derived-*`、`chore/bank-ratchet-*`）は除外されます。
また、一方のファミリーとその関連ファイルだけを変更する PR も除外されます（`generated` の場合は、
ジェネレータースクリプト、そのテスト、エージェントスキルの入力ファイル — `src/shared/constants/agentSkills.ts`、
手書きの `skills/**` ドキュメント、`docs/openapi.yaml` — および `changelog.d/**`）。
たとえば、ヒーローレイアウトの変更と、それに伴う生成済み SVG の変更、または生成済みの
`SKILL.md` ファイルをテストが読み込むスキル修正などです。手書きの
`<!-- skill:custom-start -->` ブロックを含む `SKILL.md` はファミリーに属しません。そのカスタムブロックは、
機能の変更と同じ場所で編集可能なままです。

**ゲートモードごとのチェック**（`scripts/check/lib/gateMode.mjs`；ヘルパー
`scripts/check/lib/derivedArtifactScope.mjs`）：

| チェック                                                                  | `release`（push、schedule、release PR、ローカル）                                        | `pr`（機能 PR、キューバッチ）                                                                                                                                                                                          |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                 | すべてのスキルがジェネレーターの出力と一致する必要がある                                 | PR が編集した、生成テキスト（カスタムブロック外）または `references/` を持つスキルのみ；それ以外は `SKIP reason=pr-mode`                                                                                               |
| `check:generated-artifacts`（README SVG + e2e timings；完全な履歴が必要） | すべての SVG がジェネレーターと一致し、すべての spec に timings エントリがある必要がある | PR が編集したアーティファクトのみ；残りは `SKIP reason=pr-mode`；diff base がない場合 → すべてのアーティファクトを判定（fail-closed）                                                                                  |
| README SVG のバイト比較テスト（`tests/unit/docs/readme-*-svg.test.ts`）   | すべての SVG                                                                             | base が解決できる場合に限り、PR が編集した SVG のみ；`test-unit` の浅い PR checkout には base がないため、そこでのテストは `SKIP reason=base-unresolved` でスキップされ、比較は `check:generated-artifacts` が担当する |
| e2e timings の完全性（`tests/unit/balance-e2e-shards.test.ts`）           | すべての spec にエントリが必要                                                           | SVG テストと同じルール（新しい spec は中央値の重みで実行される）                                                                                                                                                       |
| `check-quality-ratchet.mjs --require-tighten`                             | バンクされていない改善は失敗（`_policy` を除く）                                         | 改善は報告されるが、失敗にはならない；リグレッションは引き続き失敗する                                                                                                                                                 |

Release モードでは、分割前にこれらのチェックが持っていた判定、終了コード、メッセージが維持されます。追加されるのは最大でも 1 行で、解決されたモード（`[agent-skills-sync] mode=release (auto: local run)`）を示します。
テストは node:test の `{ skip: releaseOnlyUnlessTouched(...) }` オプションによってスキップされます。`check:test-masking` はこれをレポート専用ブロックに一覧表示します（`.skip(` でも `{ skip: true }` でもないため、ハードスキップとしてはカウントされません）。`check:generated-artifacts` はベースを解決できる場所、つまりジョブ `lint`（`fetch-depth: 0`）で、`check:agent-skills-sync` の直後に実行されます。ローカルでは、`npm run check:generated-artifacts -- --mode=pr` により、そのステップが PR 上で判定する内容を確認できます。`check:docs-counts` のプロバイダー合計のクロスチェック「プロバイダー参照合計（ドキュメント対ライブモジュール）」はカウントゲートの一部であり、そのゲート独自のモードに従います。

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
