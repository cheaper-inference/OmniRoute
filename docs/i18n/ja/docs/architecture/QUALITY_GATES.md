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

### 候補のアドミッション

CI と Quality Gates ワークフローは、それぞれ安定した判定を出力します: `Gate / CI` と
`Gate / Quality` です。バージョン管理されたアドミッションポリシーは、すべての上流ジョブを
必須またはアドバイザリーとして列挙します。適用対象の必須ジョブは成功しなければなりません:
missing、cancelled、skipped、pending、unknown の結果では PASS を確立できません。有効な
docs のみまたはカタログのみの分類により、コードレーンが適用外になることがあります。
ドラフト PR は受け入れ可能な候補ではありません。`hotfix` ラベルは証拠を免除しません。

両方のワークフローは、main/release ブランチへの PR、`main` へのプッシュ、手動ディスパッチ、
マージグループイベントを対象とします。プッシュ、ディスパッチ、マージグループでは完全な選択が
実行されます。`release/**` へのプッシュではこれらは起動しません (2026-10-18): 各変更はすでに
その PR でマトリックスを実行済みであり、マージされた組み合わせの確認は Release-Green の役割です
(`docs/ops/RUNNER_BOX.md` → ホステッドレーン)。フォークとマージグループでは、通常は
セルフホストランナーを選択するジョブにホステッドランナーを使用します。ロールアウト前に
十分なホステッドキャパシティが確認されている必要があります。

各 JSON レシートは、チェックアウトされた SHA、ワークフロー実行、試行を識別します。
CLI はチェックアウト/イベントの SHA 不一致を拒否します。ワークフローテストは
ポリシーのメンバーシップを判定ジョブの `needs` リストにバインドするため、新規または削除された
レーンが気づかれずに消えることはありません。レシートは自身のワークフローを対象としており、
公開、デプロイ、既存のアドバイザリースキャナーの内部は対象外です。ブランチルールで
両方のチェック名を有効化することは別の管理上の変更です。これらのジョブを追加するだけでは
ブランチは保護されません。

### 静的スキャンインベントリ

バージョン管理された npm エイリアスのインベントリと静的スキャンのメンバーシップは
`config/quality/gate-manifest.json` に格納されています。`npm run check:gate-manifest` を
実行して、`package.json` に対してスクリプト名と正確なコマンドを検証します。追加、削除、
コマンドのドリフトは、ローカルフックと CI の変更分類ジョブの両方を失敗させます。
エイリアスはワークフロージョブ、マトリックスインスタンス、テストケースではありません。
これらのカウントを交換可能なものとして提示してはいけません。

選択されたエイリアスを実行せずに確認するには、`npm run quality:scan -- --list` または
`npm run quality:scan:fast -- --list` を使用します。ランナーは npm エントリーポイントを
呼び出すため、そのランタイム (設定されている場合は Bun を含む) が保持されます。マニフェストは
これらのプロファイル外のエイリアスを個別呼び出しとして記録し、読み取り専用スキャンプロファイルでは
メンテナンスコマンドは禁止されています。

これらのプロファイルは静的スキャンのみを対象とします。プロダクトテスト、カバレッジ、
パッケージング、外部チェック、候補の完全なリリース受け入れを証明するものではありません。
ワークフローのアドミッションは、リンクされた `config/quality/admission-policy.json` と
`scripts/quality/admission-verdict.mjs` を使用します。リリースオブザーバープロファイルは
独立したままです。適用されるチェックとレシートは個別に確認してください。以下の文章による
インベントリは参考情報であり、ゲートが実際に実行されたことの証明ではありません。

スクリプトは `scripts/check/` (ポリシーゲート) と `scripts/quality/` (ラチェットエンジン) に
あります。CI のソース・オブ・トゥルースは `.github/workflows/ci.yml` です。

### リリース PR ファストパス (`quality.yml`)

`.github/workflows/quality.yml` は、main/release PR、`main` へのプッシュ、ディスパッチ、
マージグループで CI を補完します。PR ではパスフィルターによる高速チェックを使用します。
永続的に無効化されていた重複ビルドは削除されました。実際のビルド/パッケージ/ブートチェックは
CI に残っています。

| ジョブ                                           | スコープ                                                                                                                                                                        | ブロッキング          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | docs/コード PR; API docs 参照および docs-all                                                                                                                                    | はい                  |
| `Fast Quality Gates`                             | コード PR; 静的チェック、型チェック、ダッシュボード型チェック、影響を受けるユニットテスト                                                                                       | はい                  |
| `Forgotten sibling tests`                        | コード PR; 変更されたモジュールを静的コンシューマーと候補の兄弟テストまで追跡。バレルおよび動的インポートパスはアドバイザリー診断として報告され、参照される許可リストの例外あり | **アドバイザリー**    |
| `Vitest (fast-path)`                             | コード PR; 高速 vitest スイート                                                                                                                                                 | はい                  |
| `Unit Tests fast-path`                           | コード PR; 4 シャードのユニットスイート                                                                                                                                         | はい                  |
| `No new ESLint warnings`                         | コード PR; 抑制を考慮した lint ガード                                                                                                                                           | はい (フォークを含む) |
| `Merge integrity (changelog + generated skills)` | ドラフト以外の PR; 変更履歴と生成スキルの同期                                                                                                                                   | はい (フォークを含む) |

#### Forgotten sibling tests レポート

`npm run check:forgotten-sibling-tests` は、テスト影響マップの背後にあるインポートリゾルバーを再利用します。変更されたプロダクションモジュールごとに、候補となるテストがプルリクエストの差分に存在しない場合、決定論的な `changed module/symbol -> static consumer -> candidate sibling test` チェーンを報告します。Markdown サマリーと JSON 結果は、ブロッキングロールアウト前のキャリブレーション用に、`forgotten-sibling-tests` ワークフローアーティファクトとして保持されます。

バレル再エクスポートと動的インポートは解決診断のみであり、ブロッキングとなる検出結果を生成することはありません。レビュー済みの例外は `config/quality/forgotten-sibling-allowlist.json` に記載されています。各エントリーは、コンシューマーと候補テストを明示し、具体的な根拠を示し、GitHub issue またはプルリクエストへのリンクを含める必要があります。形式が不正なエントリーはフェイルクローズとなります。例外は、削除された候補テストや `.skip`/`.todo` を追加する差分を抑制することはできません。アサーションの弱化やその他のマスキングは、独立してブロッキングを行う `check:test-masking` ゲートが引き続き担当します。

### ジョブ: `lint`

`main` へのすべての PR で実行されます。失敗時にマージをブロックします。

| スクリプト (`npm run ...`)        | 検証内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ブロッキング                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Node.js のバージョンがサポート対象の範囲内であること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                        |
| `check:cycles`                    | `src/` + `open-sse/` 全体における循環インポート（AST ベース、tsconfig の `paths` 解決済み）。ベア実行では、サイクルが存在する場合は常に終了コード 1 で終了し（#15281 以降のフェイルクローズ）、SCC を一覧表示する。`check:cycles:ratchet`（CI で実行されるもの）は、カウントが `quality-baseline.json` の `metrics.cycles` 上限（現在は 14、`direction: down` なので減少のみ可能）を超えた場合にブロックする（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい（ratchet）                             |
| `check:boundary`                  | `open-sse → src` の結合: エンジンからアプリへの一意なファイル間インポート（`scripts/quality/measure-boundary.mjs`。エッジリストは v4 のコア/モジュール分割に関する改善バックログ）。ベア = 助言的レポート（`quality:boundary` と同じ）。`check:boundary:ratchet`（CI で実行されるもので、`quality.yml` の fast-gates ratchet ループにも含まれる）は、カウントが `quality-baseline.json` の `metrics.boundaryOpenSseToSrc` 上限（実測値 771 でシード、`direction: down`）を超えた場合にブロックする。`--update` は値の引き下げのみ行う。PR ではベース相対（`--base-ref`、下記参照）                                                                                                                                                                                                                                                                                                                                                                    | はい（ratchet）                             |
| `check:route-validation:t06`      | すべてのルートに Zod スキーマが存在すること（Tier 6 ポリシー）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` のカウントが予算を超過しないこと（Tier 11 ラチェット）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                        |
| `check:provider-consistency`      | `providers.ts` 内のすべてのプロバイダーに、`providerRegistry.ts` 内の対応するエントリーがあること（およびその逆も、許可リストの範囲内で）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                        |
| `check:model-lifecycle`           | 手動で保守されている 3 つのルーティングテーブルが、チェックイン済みのライフサイクルスナップショット（#11503）と一貫していること: `FITNESS_TABLE`（`taskFitness.ts`）は `REGISTRY` がルーティングできる廃止済み ID にスコアを付けていない; すべての `BUILT_IN_ALIASES` ターゲットは `REGISTRY` に存在し、廃止済み ID スナップショットには存在しない; `REGISTRY` に残っているすべての廃止済み ID は転送されているか `allowedRetiredInCatalog` にリストされている; また `DEFAULT_DEGRADATION_MAP` のソースおよびターゲットはそのスナップショットで廃止済みとして表示されない。これは、モデルが現在稼働中のアップストリームによって提供されていることを証明するものではない。オフライン — `config/quality/model-lifecycle.json` と比較し、`npm run quality:refresh-model-lifecycle` で手動更新する（ネットワーク; CI には組み込まれていない）。`allowedRetiredInCatalog` はバーンダウンラチェット: エントリーは追跡イシューがある場合にのみ追加すること。 | はい                                        |
| `check:fetch-targets`             | クライアント側の `src/` 内のすべての `fetch("/api/...")` が実際の `route.ts` に解決されること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                        |
| `check:deps`                      | リポジトリ内のすべての `package.json` にわたる `npm install` 可能なすべての依存関係が `dependency-allowlist.json` に含まれていること; ピン留めされていない新規パッケージやスロップスクワットされたパッケージにフラグを付ける                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                        |
| `audit:deps`                      | `npm audit`（ルート + electron）— 高/重大なアドバイザリがないこと（osv の `check:vuln-ratchet` と重複; 合理化バックログ（Rationalization Backlog）を参照）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                        |
| `check:lockfile`                  | `package-lock.json` の完全性 — https レジストリ、integrity ハッシュ、ホスト上書きなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                        |
| `check:licenses`                  | 本番依存関係に対する SPDX ライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                        |
| `check:tracked-artifacts`         | ビルド成果物やコミットされた `node_modules` シンボリックリンクが存在しないこと（husky の pre-commit でも実行。pre-push は意図的に軽量 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                        |
| `check:ai-attribution`            | PR のコミット、タイトル、本文に AI／ボットの `Co-Authored-By` トレーラーや AI 生成フッターが含まれていないこと — Hard Rule #16（PR→`release/**` では `quality.yml` の fast-gates ループ内で実行され、イベントペイロードを読み取り、PR 以外では何もしない。また PR→`main` では `ci.yml` の lint 内の PR 限定ステップとして実行。さらに husky の `commit-msg` フックでも実行。人間の共著者は許可。 #14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | すべての Vitest 除外項目がトラッキング issue を明記し、`config/quality/vitest-exclusions.json` に記載されていること（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                        |
| `check:file-size`                 | ソースファイル（`src/`、`open-sse/`、`electron/`、`bin/` 内の `.ts`/`.tsx`）は `cap` 以内、テストファイル（`*.test.ts(x)`）は `testCap` 以内に収まること。`file-size-baseline.json` で凍結されたファイル（`frozen` / `testFrozen`）は、記録されたサイズを超えて増加してはならない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                        |
| `check:error-helper`              | executor/handler のエラーレスポンスで `buildErrorBody()` / `sanitizeErrorMessage()` が使用されている（ハードルール #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                        |
| `check:migration-numbering`       | マイグレーション SQL ファイルが連番で採番されており、欠番や重複がない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                        |
| `check:public-creds`              | `publicCreds.ts` 以外の場所に OAuth の `client_id`/`client_secret` や Firebase Web キーのリテラルが存在しない（ハードルール #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                        |
| `check:db-rules`                  | `src/lib/db/` モジュール以外に生の SQL が存在しない。`localDb.ts` からのバレルインポートがない（ハードルール #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                        |
| `check:known-symbols`             | ディスパッチテーブルに登録されているプロバイダー executor、ルーティング戦略、トランスレーターがディスク上のファイルと一致している — 孤立したシンボルや未宣言のシンボルがない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                        |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートが `isLocalOnlyPath()` によって分類されている（ハードルール #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                        |
| `check:test-discovery`            | リポジトリ内のすべての `*.test.ts` / `*.spec.ts` ファイルが、少なくとも1つのテストランナーによって収集されている(ラチェット: `test-discovery-baseline.json` 内の孤立ファイルリストは縮小する方向のみ変更可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                        |
| `check:test-tla-order`            | `tests/unit` 配下の `node:test` ファイルで、テストを登録した後にトップレベルの `await` に到達し、その後さらにテストを登録しているものが存在しない(#18045;ラチェット: `test-tla-order-allowlist.json` は縮小する方向のみ変更可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                        |
| `check:agent-skills-sync`         | 生成された agent-skills アーティファクトがソースカタログと一致している(ドリフトなし)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | プロバイダーのロゴ/アセットに、記録済みのプロビナンス(provenance)エントリが付随している                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | JSON 設定ファイルがパース可能で、リポジトリの lint ルールを満たしている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | TypeScript コンパイルがエラーなく完了する(アドバイザリ扱いの警告のみ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                        |
| `typecheck:noimplicit:core`       | 厳格な `noImplicitAny` — 将来を見据えたチェック。既存の多くのコールサイトにはまだアノテーションが必要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **アドバイザリ**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` にスコープした `tsc`（#7033）— `typecheck:core` の精選された 27 ファイルの許可リストにはダッシュボードの TSX が一切含まれておらず、`next build` も型チェックを行わない（`next.config.mjs` で `ignoreBuildErrors: true` が設定されている）ため、そこでの孤立識別子のリグレッション（#6625/#6909）は CI から見えなかった。凍結されたファイル単位・TS エラーコード単位のカウントベースライン（`config/quality/dashboard-typecheck-baseline.json`、`check:known-symbols` と同じ陳腐化強制パターン）と差分比較する — ベースラインのカウントを超える新規エラーのみがゲートを失敗させる。既存エラーが修正された場合は `--update` でベースラインを引き下げる。                                                                                                                                                                                                                                                                       | はい                                        |

### ジョブ: `quality-gate`

`test-coverage` の後に実行。失敗時はマージをブロックする。

| スクリプト                   | 検証内容                                                                                                                                                                                            | ブロッキング             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` を出力（ESLint 警告数、マージされたシャードレポートからのカバレッジ）                                                                                                        | はい（ラチェットの上流） |
| `quality:ratchet`            | `quality-baseline.json` の各メトリクスがリグレッションしていないこと（ESLint 警告 ≤ ベースライン、カバレッジ ≥ ベースライン）                                                                       | はい                     |
| `check:duplication`          | コード重複（jscpd@4）が `quality-baseline.json` のベースラインを超えていないこと                                                                                                                    | はい                     |
| `check:complexity`           | ファイルレベルの循環的複雑度が上限を超えていないこと（コア ESLint の `complexity` + `max-lines-per-function`）                                                                                      | はい                     |
| `check:cognitive-complexity` | 認知的複雑度ラチェット（`eslint-plugin-sonarjs`）— 独立した ESLint パス。CI では両方を単一の `check:complexity-ratchets` ステップにマージして実行                                                   | はい                     |
| `check:dead-code`            | 未使用エクスポート / ファイルのラチェット（knip）がベースラインからリグレッションしていないこと                                                                                                     | はい                     |
| `check:compression-budget`   | 圧縮ベンチマークの予算 — エンジンごとのトークン削減率の下限がリグレッションしていないこと                                                                                                           | はい                     |
| `check:type-coverage`        | 型付け率ラチェット（`type-coverage`）がリグレッションしていないこと。`typecheck:noimplicit:core` をほぼ包含する                                                                                     | はい                     |
| `check:codeql-ratchet`       | オープン状態の CodeQL アラート数がリグレッションしていないこと（`gh api` 経由で読み取り。トークンがない場合はグレースフルスキップ）— 更新頻度と手動トリガーについては後述の「CodeQL ratchet」を参照 | はい                     |

### ジョブ: `quality-extended`

ジョブ全体がアドバイザリー（`continue-on-error: true`）。npm ベースのラチェットは実際に実行される。外部スキャナーは `gh release download` でインストールされ、バイナリが依然として存在しない場合は自己スキップ（終了コード 0）する。

| スクリプト               | 検証内容                                                                                                                                                                                                        | ブロッキング                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | 循環依存が存在しないこと（dpdm）                                                                                                                                                                                | **アドバイザリー**                              |
| `check:bundle-size`      | バンドルサイズが上限を超えていないこと                                                                                                                                                                          | **アドバイザリー**                              |
| `check:secrets`          | シークレットスキャン（gitleaks）— バイナリがない場合はスキップ                                                                                                                                                  | **アドバイザリー**                              |
| `check:vuln-ratchet`     | 依存関係の脆弱性（osv-scanner）がリグレッションしていないこと — バイナリがない場合はスキップ                                                                                                                    | **アドバイザリー**                              |
| `check:workflows`        | ワークフローの lint（actionlint + zizmor）。スキャナーの欠落・破損、無効なレポート、ラチェットベースラインの欠落は INCOMPLETE として失敗する。有効な検出結果は選択された strict/advisory/ratchet ポリシーに従う | 実行必須。zizmor ラチェットは CI でブロッキング |
| `check:openapi-breaking` | ベースブランチと比較した公開 API コントラクト（`openapi.yaml`）への破壊的変更（oasdiff）— `openapiBreaking=N` を出力。oasdiff がない場合やベーススペックが解決できない場合はスキップ                            | **アドバイザリー**                              |

### ジョブ: `docs-sync-strict`

`main` へのすべての PR で実行。失敗時はマージをブロックする。

| スクリプト                     | 検証内容                                                                                                                                                                | ブロッキング                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `check:docs-all`               | 以下の 6 つのサブゲートを順次実行するメタゲート                                                                                                                         | はい                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt のバージョン整合性                                                                                                                        | はい                            |
| ↳ `check:docs-counts`          | 文章中の数値（プロバイダー数、マイグレーション数など）が実際の数値のラチェット範囲内に収まっていること                                                                  | はい                            |
| ↳ `check:env-doc-sync`         | `.env.example` 内のすべての環境変数がドキュメントの表に記載されており、その逆も同様であること                                                                           | はい                            |
| ↳ `check:deprecated-versions`  | ドキュメントに非推奨のバージョン文字列が含まれていないこと                                                                                                              | はい                            |
| ↳ `check:doc-links`            | ドキュメント内の内部 Markdown リンク（`[text]`/`(path)` 形式）が実際のファイルに解決されること                                                                          | はい                            |
| ↳ `check:fabricated-docs`      | ドキュメントに引用されたルート、環境変数、CLI コマンド、フック名、ファイルパスがコードベースに実在すること。`--strict` でハードゲート化。フラグなしではソフトフェイル。 | はい（CI では `--strict` 経由） |
| `check:cli-i18n`               | CLI コマンド文字列がすべての i18n ロケールファイルに存在すること                                                                                                        | はい                            |
| `check:openapi-coverage`       | OpenAPI 仕様が実際のルートについてラチェットされた下限以上をカバーしていること                                                                                          | はい                            |
| `check:openapi-security-tiers` | `openapi.yaml` のセキュリティティア注釈が `routeGuard.ts` の分類と一致していること                                                                                      | **アドバイザリ**                |
| `check:openapi-routes`         | `openapi.yaml` 内のすべてのパスが実際の `route.ts` に解決されること（ハルシネーション防止）                                                                             | はい                            |
| `check:docs-symbols`           | `docs/**/*.md` 内のすべての `/api/...` 参照が実際の `route.ts` に解決されること（ハルシネーション防止）                                                                 | はい                            |
| `i18n translation drift`       | i18n ロケールファイル内の未翻訳キー — 警告のみ                                                                                                                          | **アドバイザリ**                |

`docs/diagrams/` 配下の 12 個の README SVG は生成物です（`scripts/docs/gen-readme-<name>.mjs`。
`npm run docs:readme-diagrams` ですべて再生成されます）。それぞれにバイト比較のユニットテスト
（`tests/unit/docs/readme-*-svg.test.ts`、ジョブ `test-unit`）があり、コミット済みファイルが
古くなっている場合に失敗します。また、`check:docs-counts` はこれらの `<text>` ノードから正規の数値を
読み取ります — これが、数値がパスへアウトライン化されない理由です。SVG 正規数値チェックは
`SVG_DIAGRAM_FILES`（`scripts/check/check-docs-counts-sync.mjs`）に列挙されたファイルを読み取ります:
`docs/diagrams/readme-hero.svg`、`free-tier-budget.svg`、`promise-pillars.svg`、`comparison-table.svg`、
`cli-terminal.svg`、`tier-cascade.svg`、さらに `public/images/tier-flow-dark.svg` と
`tier-flow-light.svg`。free-forever、catalog-entry、recurring-pool、scoring-factors の各クレームも
`promise-pillars.svg`、`free-tier-budget.svg`、`strategies-grid.svg` を読み取ります。`free-tier-budget.svg`
はライブのカタログローダーから数値を取得するため、`FREE_MODEL_BUDGETS` やプロバイダー表示名を変更すると、
そのファイルが再生成されるまで CI が赤くなります。

### ジョブ: `i18n-ui-coverage`

| スクリプト                             | 検証内容                                                                                                                                                      | ブロッキング     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage`（インライン） | UI i18n キーのカバレッジが 65% 以上であること                                                                                                                 | はい             |
| `check-ui-value-drift`（インライン）   | 書き換えられた英語の**値**に古い翻訳が残っていないこと                                                                                                        | はい             |
| `check-new-key-coverage`（インライン） | **新規**の英語キーがすべてのロケールで翻訳されていること — `__MISSING__:` マーカーは拒否される                                                                | はい             |
| `check-translation-ratio`              | ロケールごとの実翻訳率（英語と同一／プレースホルダー／欠落のリーフは許可リスト外）が `config/quality/i18n-translation-baseline.json` + スラックを超えないこと | **アドバイザリ** |

`fetch-depth: 0` が必要です — value-drift ゲートは `en.json` をマージベースと差分比較するためです。

#### `check-ui-value-drift` — 古い翻訳の検出ゲート

他のゲートでは構造的に検出できない唯一の i18n リグレッションを捕捉します。英語の値が書き換えられても、_以前の_英語から派生した翻訳が取り残されるため、英語以外のユーザーは自信に満ちた表現の、今では誤ったコピーを読み続けることになります。

これは実際にリリースされた問題です。Antigravity ログインヘルパーが導入された際 (#5203) に `oauthModal.googleOAuthWarning` が書き換えられましたが、**43 ロケール中 39 ロケール**が、オペレーターに「完全な URL をコピーして下に貼り付けてください」と伝えるテキストを保持したままでした — そのプロバイダーでは完了できないフローです。#8463 まで誰にも気づかれなかった理由は次のとおりです。

- `sync-ui-keys` は**欠落している**キーのみを補完し、**古くなった**キーは決して補完しません。
- `check-ui-keys-coverage` はキーの_存在_をカウントするため、古い翻訳もカバー済みとしてスコアされます。
- `check-translation-drift` は `docs/i18n/<locale>/**.md` のドキュメントミラーを追跡します — `src/i18n/messages/*.json` は一切読み取りません。2026-09 の再同期以降、ジョブ `docs-sync-strict` でブロッキング中: コアドキュメントを編集 → `npm run i18n:run -- --files=<doc>`(セクションレベル、低コスト)。

**diff 認識型であり、ベースライン依存ではありません。** マージベース時点の `en.json` をワーキングツリーと比較します。英語の値が変更されたすべてのキーについて、未変更の翻訳を保持しているロケールは stale(古い)と判定されます。これは意図的に**既存の負債を凍結します** — diff では長年存在する翻訳がどの古い英語から派生したかを明らかにできないため、ゲートは現在の変更が触れる部分のみを判定します。代替案(キーごとのハッシュベースライン)では約 600 KB の生成ファイルが必要になり、既存の最大ベースラインの 3 倍のサイズで、i18n PR のたびに変更が発生します。

これを満たす方法は 2 つあります。

1. 影響を受ける翻訳を更新するか、
2. `__MISSING__:<new english>` に設定します — ランタイムは修正された英語を提供し(`src/i18n/request.ts::deepMergeFallback`、#7258)、そのキーは翻訳キューに入ります。

文字列の**意味**が変わった場合は、**キーのリネーム**を優先してください。新しいキーは古い翻訳を継承できません。これが #8463 で使われたパターンです。

```bash
npm run i18n:check-value-drift          # 厳密モード(CI が実行するもの)
npm run i18n:check-value-drift:warn     # レポートのみ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ベースカタログを読み取れない場合(ベース ref を持たない shallow clone)、`check-openapi-breaking` と同様に、`SKIP reason=base-unresolved` を伴って終了コード 0 で終了します。

### ジョブ: `i18n`

完全な i18n 検証マトリックス(ロケールごとに 1 ジョブ)。ジョブ全体がアドバイザリーです。

| スクリプト                      | 検証内容                   | ブロッキング                                               |
| ------------------------------- | -------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | ロケールごとの翻訳の完全性 | **アドバイザリー**(ジョブ全体で `continue-on-error: true`) |

### ジョブ: `pr-test-policy`

プルリクエストでのみ実行されます。

| スクリプト             | 検証内容                                                                                                                                   | ブロッキング |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check:pr-test-policy` | `src/`、`open-sse/`、`electron/`、`bin/` のプロダクションコードを変更する PR は、テストの追加または更新を含める必要がある(ハードルール #8) | はい         |
| `check:test-masking`   | 変更されたテストファイルがアサート数を正味で減らしたり、`assert.ok(true)` のトートロジーを追加したりしていないこと                         | はい         |
| `check:pr-evidence`    | PR 本文が変更に対するテスト/VPS のエビデンスを引用していること(PR の文章を grep してハードルール #18 を機械化 — 脆弱、バックログ参照)      | はい         |

### ジョブ: `test-vitest`

`build` の後に実行されます。失敗時はマージをブロックします。

| スイート         | 検証内容                                                          | ブロッキング                                                                                                    |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP サーバー(110 ツール)、autoCombo、キャッシュ — vitest ランナー | はい                                                                                                            |
| `test:vitest:ui` | UI コンポーネントテスト — vitest ランナー                         | **ブロッキング** — 既存の失敗は `vitest.config.ts` で明示的に除外されています。新しい失敗はジョブを失敗させます |

### ナイトリーワークフロー(スケジュール実行、アドバイザリー)

これらは cron スケジュール(および `workflow_dispatch`)で実行され、PR では実行されません。すべてアドバイザリーです。

| ワークフロー           | 検証内容                                                                                                                                                    | ブロッキング       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | ランダムシード + 高実行回数による fast-check プロパティテスト                                                                                               | **アドバイザリー** |
| `nightly-resilience`   | ヒープ増大ゲート、カオス障害注入、k6 負荷/ソーク                                                                                                            | **アドバイザリー** |
| `nightly-llm-security` | promptfoo インジェクションガード（ブロックモード）+ garak プローブ（プロバイダーのシークレットがない場合はスキップ）                                        | **アドバイザリー** |
| `nightly-schemathesis` | `docs/openapi.yaml` を使用した稼働中の OmniRoute に対する OpenAPI コントラクトファジング（schemathesis）— 仕様違反や未処理の 500 エラーを検出（Fase 8 B.4） | **アドバイザリー** |
| `nightly-mutation`     | 高速ユニットレーンに対する Stryker ミューテーションテストスコア — 生き残ったミュータントが弱いアサートを浮き彫りにする                                      | **アドバイザリー** |
| `nightly-compat`       | サポートされる `engines.node` 範囲全体にわたる Node エンジン互換性マトリックス                                                                              | **アドバイザリー** |

パフォーマンスベースライン（ヒープ、TTFB、ビルド時間）はゲート対象ではなく記録されます：[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）を参照してください。

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
