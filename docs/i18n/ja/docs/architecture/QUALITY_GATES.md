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

### 候補の受理（アドミッション）

CI ワークフローと Quality Gates ワークフローは、それぞれ安定した判定（verdict）を出力します: `Gate / CI` と `Gate / Quality` です。これらのバージョン管理されたアドミッションポリシーは、すべての上流ジョブを必須（required）またはアドバイザリ（advisory）として列挙します。適用対象となる必須ジョブは成功しなければなりません: 欠落（missing）、キャンセル（cancelled）、スキップ（skipped）、保留中（pending）、不明（unknown）の結果では PASS を確立できません。有効な docs-only または catalog-only の分類により、コードレーンが適用対象外になることがあります。ドラフト PR は受理される候補ではありません。`hotfix` ラベルによって証拠が免除されることはありません。

両方のワークフローは、main/release ブランチへの PR、`main` へのプッシュ、手動ディスパッチ、マージグループイベントを対象とします。プッシュ、ディスパッチ、マージグループでは完全な選択（フルセレクション）が実行されます。`release/**` へのプッシュではこれらは起動しません（2026-10-18）: 各変更はすでにその PR でマトリックスを実行済みであり、マージされた組み合わせの確認は Release-Green の役割です（`docs/ops/RUNNER_BOX.md` → Hosted lane）。フォークとマージグループでは、通常はセルフホステッドランナーを選択するジョブにもホステッドランナーが使用されます。ロールアウト前に十分なホステッド容量を検証する必要があります。

各 JSON レシートは、チェックアウトされた SHA、ワークフロー実行、試行（attempt）を識別します。CLI はチェックアウト SHA とイベント SHA の不一致を拒否します。ワークフローテストはポリシーのメンバーシップを判定ジョブの `needs` リストに結びつけるため、新規追加または削除されたレーンがサイレントに消失することはありません。レシートの対象は自身のワークフローであり、公開（publication）、デプロイメント、既存のアドバイザリスキャナーの内部は対象外です。ブランチルールで両方のチェック名を有効化することは別個の管理上の変更であり、これらのジョブを追加するだけではブランチは保護されません。

### 静的スキャンインベントリ

バージョン管理された npm エイリアスのインベントリと静的スキャンのメンバーシップは `config/quality/gate-manifest.json` にあります。`npm run check:gate-manifest` を実行して、スクリプト名と正確なコマンドを `package.json` と照合検証します。追加、削除、コマンドのずれ（ドリフト）は、ローカルフックと CI の変更分類ジョブの両方を失敗させます。エイリアスはワークフロージョブ、マトリックスインスタンス、テストケースではありません。これらのカウントを互換可能なものとして提示してはいけません。

`npm run quality:scan -- --list` または `npm run quality:scan:fast -- --list` を使用すると、選択されたエイリアスを実行せずに確認できます。ランナーは npm エントリポイントを呼び出すため、そのランタイム（Bun が設定されている場合は Bun を含む）が保持されます。マニフェストはこれらのプロファイル外のエイリアスを個別呼び出しとして記録し、メンテナンスコマンドは読み取り専用スキャンプロファイルでは禁止されています。

これらのプロファイルの対象は静的スキャンのみです。製品テスト、カバレッジ、パッケージング、外部チェック、候補の完全なリリース受け入れを認定するものではありません。ワークフローのアドミッションは、リンクされた `config/quality/admission-policy.json` と `scripts/quality/admission-verdict.mjs` を使用します。Release-observer プロファイルは別個のままです。該当するチェックとレシートは独立して確認してください。以下の散文によるインベントリは参考情報であり、ゲートが実際に実行されたことの証拠ではありません。

スクリプトは `scripts/check/`（ポリシーゲート）と `scripts/quality/`（ラチェットエンジン）配下にあります。CI の信頼できる情報源（source of truth）は `.github/workflows/ci.yml` です。

### リリース PR 高速パス（`quality.yml`）

`.github/workflows/quality.yml` は、main/release PR、`main` へのプッシュ、ディスパッチ、マージグループにおいて CI を補完します。PR ではパスでフィルタリングされた高速チェックが使用されます。恒久的に無効化されていた重複ビルドは削除されました。実際のビルド/パッケージ/ブートチェックは CI に残っています。

| ジョブ                                           | スコープ                                                                                                                                                                                     | ブロッキング           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Docs/コード PR、API ドキュメント参照と docs-all                                                                                                                                              | はい                   |
| `Fast Quality Gates`                             | コード PR、静的チェック、型チェック、ダッシュボード型チェック、影響を受けるユニットテスト                                                                                                    | はい                   |
| `Forgotten sibling tests`                        | コード PR、変更されたモジュールを静的コンシューマーと候補となる兄弟テストに追跡。barrel および動的インポートのパスは、参照されている許可リストの例外を伴うアドバイザリ診断として報告されます | **アドバイザリ**       |
| `Vitest (fast-path)`                             | コード PR、高速 vitest スイート                                                                                                                                                              | はい                   |
| `Unit Tests fast-path`                           | コード PR、4 シャードのユニットスイート                                                                                                                                                      | はい                   |
| `No new ESLint warnings`                         | コード PR、抑制（suppression）を考慮する lint ガード                                                                                                                                         | はい（フォークを含む） |
| `Merge integrity (changelog + generated skills)` | 非ドラフト PR、変更履歴（changelog）と生成スキルの同期                                                                                                                                       | はい（フォークを含む） |

#### Forgotten sibling tests レポート

`npm run check:forgotten-sibling-tests` は、テスト影響マップの基盤となるインポートリゾルバーを再利用します。
変更されたすべてのプロダクションモジュールについて、候補となるテストがプルリクエストの差分に
存在しない場合、決定的な
`changed module/symbol -> static consumer -> candidate sibling test` チェーンを報告します。Markdown サマリーと JSON 結果は、
ブロッキングロールアウト前のキャリブレーション用に
`forgotten-sibling-tests` ワークフローアーティファクトとして保持されます。

バレル再エクスポートと動的インポートは解決診断のみであり、ブロッキングの
検出結果を生成することはありません。レビュー済みの例外は
`config/quality/forgotten-sibling-allowlist.json` に配置されます。各エントリーは、コンシューマーと候補
テストを明示し、具体的な根拠を示し、GitHub の issue またはプルリクエストへのリンクを含めなければなりません。不正な形式のエントリーは
フェイルクローズとなります。例外は、削除された候補テストや `.skip`/`.todo` を追加する差分を抑制することは
できません。アサーションの弱体化やその他のマスキングは、独立してブロッキングを行う
`check:test-masking` ゲートが引き続き担当します。

### ジョブ: `lint`

`main` へのすべての PR で実行されます。失敗時にはマージをブロックします。

| スクリプト (`npm run ...`)        | 検証内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ブロッキング                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js のバージョンがサポート対象の範囲内であること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                    |
| `check:cycles`                    | `src/` + `open-sse/` 全体にわたる循環インポート（AST ベース、tsconfig の `paths` を解決済み）。ベア版は循環が存在する場合に常に終了コード 1 で終了し（#15281 以降のフェイルクローズ）、SCC（強連結成分）を一覧表示する。`check:cycles:ratchet`（CI で実行されるもの）は、循環数が `quality-baseline.json` の `metrics.cycles` 上限を超えた場合にブロックする — 現在は 14 で `direction: down` のため、減少する一方となる（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい（ratchet）                         |
| `check:boundary`                  | `open-sse → src` の結合度：エンジンからアプリへの一意なファイル間インポート（`scripts/quality/measure-boundary.mjs`。エッジリストは v4 コア/モジュール分割の改善バックログ）。ベア版 = 情報提供のみのレポート（`quality:boundary` と同じ）。`check:boundary:ratchet`（CI で実行されるもので、`quality.yml` の fast-gates ratchet ループにも含まれる）は、数が `quality-baseline.json` の `metrics.boundaryOpenSseToSrc` 上限を超えた場合にブロックする — 実測値 771 でシードされ、`direction: down`。`--update` は値を引き下げる場合のみ。PR ではベース相対（`--base-ref`、後述）                                                                                                                                                                                                                                                                                                                                                                                                                             | はい（ratchet）                         |
| `check:route-validation:t06`      | すべてのルートに Zod スキーマが存在すること（Tier 6 ポリシー）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` の数がバジェットを超えないこと（Tier 11 ラチェット）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                    |
| `check:provider-consistency`      | `providers.ts` 内のすべてのプロバイダーが `providerRegistry.ts` に対応するエントリーを持つこと（およびその逆。allowlist の範囲内）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                    |
| `check:model-lifecycle`           | 手作業でメンテナンスされている 3 つのルーティングテーブルが、チェックイン済みのライフサイクルスナップショット（#11503）と整合していること: `FITNESS_TABLE`（`taskFitness.ts`）が `REGISTRY` からルーティング可能な retired id をスコアリングしていないこと。すべての `BUILT_IN_ALIASES` ターゲットが `REGISTRY` に存在し、retired-id スナップショットには存在しないこと。`REGISTRY` に残っているすべての retired id が転送されているか、`allowedRetiredInCatalog` にリストされていること。そして `DEFAULT_DEGRADATION_MAP` のソースまたはターゲットのいずれも、そのスナップショットで retired として現れないこと。これは、モデルが現在ライブのアップストリームから提供されていることを証明するものではない。オフライン — `config/quality/model-lifecycle.json` と比較する。これは `npm run quality:refresh-model-lifecycle` で手動更新される（ネットワーク使用。CI には組み込まれていない）。`allowedRetiredInCatalog` は burn-down ラチェット: エントリーの追加は必ずトラッキング issue とセットで行うこと。 | はい                                    |
| `check:fetch-targets`             | クライアント側 `src/` 内のすべての `fetch("/api/...")` が実在する `route.ts` に解決されること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                    |
| `check:deps`                      | リポジトリ内のすべての `package.json` にまたがる `npm install` 可能な依存関係が、すべて `dependency-allowlist.json` に含まれていること。ピン留めされていない新規パッケージや slopsquat されたパッケージをフラグする                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                    |
| `audit:deps`                      | `npm audit`（root + electron）— high/critical のアドバイザリがないこと（osv の `check:vuln-ratchet` と重複。Rationalization Backlog を参照）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:lockfile`                  | `package-lock.json` の整合性 — https レジストリ、integrity ハッシュ、ホストのオーバーライドなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:licenses`                  | 本番依存関係に対する SPDX ライセンスの許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                    |
| `check:tracked-artifacts`         | ビルド成果物やコミットされた `node_modules` シンボリックリンクが存在しないこと（husky の pre-commit でも実行。pre-push は意図的に軽量化されている — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | はい                                    |
| `check:ai-attribution`            | PR のコミット、タイトル、本文に AI/ボットの `Co-Authored-By` トレーラーや AI 生成フッターが含まれないこと — ハードルール #16（PR→`release/**` に対する `quality.yml` の fast-gates ループ内で実行 — イベントペイロードを読み取り、PR 以外では no-op — および PR→`main` に対する `ci.yml` lint 内の PR 専用ステップ。husky の `commit-msg` フックでも実行。人間の共同著者は許可。#14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | すべての Vitest 除外にトラッキングイシューが明記され、`config/quality/vitest-exclusions.json` に登録されていること（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:file-size`                 | ソースファイル（`src/`、`open-sse/`、`electron/`、`bin/` 内の `.ts`/`.tsx`）が `cap` 以内、テストファイル（`*.test.ts(x)`）が `testCap` 以内に収まること。`file-size-baseline.json` で凍結されたファイル（`frozen` / `testFrozen`）は記録されたサイズを超えて増大してはならない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:error-helper`              | エグゼキューター/ハンドラーのエラーレスポンスは `buildErrorBody()` / `sanitizeErrorMessage()` を使用する（ハードルール #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                    |
| `check:migration-numbering`       | マイグレーション SQL ファイルは連番で採番され、欠番や重複がない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:public-creds`              | `publicCreds.ts` 以外の場所に OAuth の `client_id`/`client_secret` や Firebase Web キーのリテラルが存在しない（ハードルール #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                    |
| `check:db-rules`                  | `src/lib/db/` モジュール以外に生の SQL が存在しない。`localDb.ts` からのバレルインポートもない（ハードルール #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい                                    |
| `check:known-symbols`             | ディスパッチテーブルに登録されたプロバイダーエグゼキューター、ルーティング戦略、トランスレーターがディスク上のファイルと一致している — 孤立したシンボルや未宣言のシンボルがない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | はい                                    |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートが `isLocalOnlyPath()` によって分類されている（ハードルール #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                    |
| `check:test-discovery`            | リポジトリ内のすべての `*.test.ts` / `*.spec.ts` ファイルが、少なくとも1つのテストランナーによって収集されること(ラチェット: `test-discovery-baseline.json` 内の孤立リストは縮小のみ可能)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                    |
| `check:agent-skills-sync`         | 生成された agent-skills アーティファクトがソースカタログと一致していること(ドリフトなし)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | プロバイダーのロゴ/アセットに、記録されたプロビナンスエントリが付与されていること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON 設定ファイルがパース可能で、リポジトリの lint ルールを満たしていること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | エラーのない TypeScript コンパイル(警告は参考扱いのみ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | はい                                    |
| `typecheck:noimplicit:core`       | 厳格な `noImplicitAny` — 将来を見据えたもの。既存の多くのコールサイトにはまだアノテーションが必要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **参考扱い**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` をスコープとする `tsc`(#7033)— `typecheck:core` の精選された27ファイルの許可リストにはダッシュボードの TSX が一切含まれておらず、`next build` もそれを型チェックしない(`next.config.mjs` で `ignoreBuildErrors: true` が設定されている)ため、そこでの識別子の孤立リグレッション(#6625/#6909)は CI から見えなかった。凍結されたファイルごと/TSコードごとのエラー数ベースライン(`config/quality/dashboard-typecheck-baseline.json`、`check:known-symbols` と同じ陳腐化強制パターン)との差分を取る — ベースライン数を超える新規エラーのみがゲートを失敗させる。既存エラーが修正された場合は `--update` でラチェットダウンする。                                                                                                                                                                                                                                                                                                                                                         | はい                                    |

### ジョブ: `quality-gate`

`test-coverage` の後に実行されます。失敗するとマージがブロックされます。

| スクリプト                   | 検証内容                                                                                                                                                                           | ブロッキング             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` を出力（ESLint の警告数、マージされたシャードレポートからのカバレッジ）                                                                                     | はい（ラチェットの上流） |
| `quality:ratchet`            | `quality-baseline.json` の各メトリクスが退行していないこと（ESLint 警告 ≤ ベースライン、カバレッジ ≥ ベースライン）                                                                | はい                     |
| `check:duplication`          | コードの重複（jscpd@4）が `quality-baseline.json` のベースラインを超えていないこと                                                                                                 | はい                     |
| `check:complexity`           | ファイルレベルの循環的複雑度が上限を超えていないこと（ESLint コアの `complexity` + `max-lines-per-function`）                                                                      | はい                     |
| `check:cognitive-complexity` | 認知的複雑度のラチェット（`eslint-plugin-sonarjs`）— 別の ESLint パス。CI では両方を単一の `check:complexity-ratchets` ステップにマージして実行                                    | はい                     |
| `check:dead-code`            | 未使用のエクスポート / ファイルのラチェット（knip）がベースラインに対して退行していないこと                                                                                        | はい                     |
| `check:compression-budget`   | 圧縮ベンチマークのバジェット — エンジンごとのトークン削減率の下限が退行しないこと                                                                                                  | はい                     |
| `check:type-coverage`        | 型付け率のラチェット（`type-coverage`）が退行していないこと。`typecheck:noimplicit:core` をほぼ包含                                                                                | はい                     |
| `check:codeql-ratchet`       | オープンな CodeQL アラート数が退行していないこと（`gh api` 経由で読み取り。トークンがない場合は正常にスキップ）— 更新頻度と手動トリガーについては後述の「CodeQL ラチェット」を参照 | はい                     |

### ジョブ: `quality-extended`

ジョブ全体がアドバイザリです（`continue-on-error: true`）。npm ベースのラチェットは
実際に実行されます。外部スキャナは `gh release download` でインストールされ、
バイナリがまだ存在しない場合は自己スキップします（exit 0）。

| スクリプト               | 検証内容                                                                                                                                                                                                        | ブロッキング                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | 循環依存がないこと（dpdm）                                                                                                                                                                                      | **アドバイザリ**                                  |
| `check:bundle-size`      | バンドルサイズが上限を超えていないこと                                                                                                                                                                          | **アドバイザリ**                                  |
| `check:secrets`          | シークレットスキャン（gitleaks）— バイナリがない場合はスキップ                                                                                                                                                  | **アドバイザリ**                                  |
| `check:vuln-ratchet`     | 依存関係の脆弱性（osv-scanner）が退行していないこと — バイナリがない場合はスキップ                                                                                                                              | **アドバイザリ**                                  |
| `check:workflows`        | ワークフローの lint（actionlint + zizmor）。スキャナの欠落・破損、無効なレポート、またはラチェットのベースライン欠落は INCOMPLETE として失敗。有効な検出結果は選択された strict/advisory/ratchet ポリシーに従う | 実行必須。CI では zizmor ラチェットがブロッキング |
| `check:openapi-breaking` | ベースブランチに対する公開 API コントラクト（`openapi.yaml`）の破壊的変更（oasdiff）— `openapiBreaking=N` を出力。oasdiff がない場合、またはベース仕様を解決できない場合はスキップ                              | **アドバイザリ**                                  |

### ジョブ: `docs-sync-strict`

`main` へのすべての PR で実行されます。失敗するとマージがブロックされます。

| スクリプト                     | 検証内容                                                                                                                                                                      | ブロッキング                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | 以下の6つのサブゲートを順次実行するメタゲート                                                                                                                                 | はい                          |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt のバージョン整合性                                                                                                                              | はい                          |
| ↳ `check:docs-counts`          | 文章中の数値(プロバイダー数、マイグレーション数など)が実際の数値のラチェット範囲内に収まっていること                                                                          | はい                          |
| ↳ `check:env-doc-sync`         | `.env.example` 内のすべての環境変数がドキュメントの表に記載されていること(およびその逆)                                                                                       | はい                          |
| ↳ `check:deprecated-versions`  | ドキュメントに非推奨のバージョン文字列が含まれていないこと                                                                                                                    | はい                          |
| ↳ `check:doc-links`            | ドキュメント内の内部 Markdown リンク(`[text]`/`(path)` 形式)が実在のファイルに解決されること                                                                                  | はい                          |
| ↳ `check:fabricated-docs`      | ドキュメントに引用されているルート、環境変数、CLI コマンド、フック名、ファイルパスがコードベースに実在すること。`--strict` によるハードゲート。フラグなしではソフトフェイル。 | はい(CI では `--strict` 経由) |
| `check:cli-i18n`               | CLI コマンド文字列がすべての i18n ロケールファイルに存在すること                                                                                                              | はい                          |
| `check:openapi-coverage`       | OpenAPI 仕様が実際のルートのラチェットされた下限以上をカバーしていること                                                                                                      | はい                          |
| `check:openapi-security-tiers` | `openapi.yaml` のセキュリティティア注釈が `routeGuard.ts` の分類と一致していること                                                                                            | **アドバイザリー**            |
| `check:openapi-routes`         | `openapi.yaml` 内のすべてのパスが実在の `route.ts` に解決されること(ハルシネーション防止)                                                                                     | はい                          |
| `check:docs-symbols`           | `docs/**/*.md` 内のすべての `/api/...` 参照が実在の `route.ts` に解決されること(ハルシネーション防止)                                                                         | はい                          |
| `i18n translation drift`       | i18n ロケールファイル内の未翻訳キー — 警告のみ                                                                                                                                | **アドバイザリー**            |

### ジョブ: `i18n-ui-coverage`

| スクリプト                           | 検証内容                                                                                                                                                          | ブロッキング       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage`(インライン) | UI i18n キーのカバレッジが 65% 以上であること                                                                                                                     | はい               |
| `check-ui-value-drift`(インライン)   | 書き換えられた英語の**値**に古い翻訳が残っていないこと                                                                                                            | はい               |
| `check-new-key-coverage`(インライン) | **新規**の英語キーがすべてのロケールで翻訳されていること — `__MISSING__:` マーカーは拒否される                                                                    | はい               |
| `check-translation-ratio`            | ロケールごとの実翻訳率(英語と同一 / プレースホルダー / 欠落のリーフは許可リスト対象外)が `config/quality/i18n-translation-baseline.json` + スラックを超えないこと | **アドバイザリー** |

`fetch-depth: 0` が必要 — 値ドリフトゲートは `en.json` をマージベースと差分比較する。

#### `check-ui-value-drift` — 古い翻訳ゲート

他のゲートでは構造的に検出できない唯一の i18n リグレッションを捕捉する: 英語の値が書き換えられ、_以前の_英語から派生した翻訳が取り残されると、英語以外のユーザーは自信満々に書かれた、今や誤った文言を読み続けることになる。

これは実際に発生した。`oauthModal.googleOAuthWarning` は Antigravity ログインヘルパーの導入時(#5203)に書き換えられたが、**43 ロケール中 39 ロケール**が、オペレーターに「完全な URL をコピーして以下に貼り付ける」よう指示する文言を保持し続けた — そのプロバイダーでは完了できないフローである。#8463 まで気づかれなかった理由:

- `sync-ui-keys` は**存在しない**キーのみを補完し、**古い**キーは決して補完しない。
- `check-ui-keys-coverage` はキーの_存在_をカウントするため、古い翻訳もカバー済みとして計上される。
- `check-translation-drift` は `docs/i18n/<locale>/**.md` のドキュメントミラーを追跡するもので、`src/i18n/messages/*.json` は決して読まない。2026-09 の再同期以降、ジョブ `docs-sync-strict` でブロッキング: コアドキュメントを編集 → `npm run i18n:run -- --files=<doc>`(セクションレベル、低コスト)。

**差分認識型であり、ベースライン依存ではありません。** マージベース時点の `en.json` をワークツリーと比較します。英語の値が変更されたすべてのキーについて、変更されていない翻訳を保持しているロケールは陳腐化しているとみなされます。これは意図的に**既存の負債を凍結します** — 差分では、長年存在する翻訳がどの古い英語に基づいていたかを判別できないため、このゲートは現在の変更が触れる部分のみを判定します。代替案（キーごとのハッシュベースライン）では、約 600 KB の生成ファイルが必要になり、既存の最大のベースラインの 3 倍のサイズで、i18n PR のたびに変更が発生してしまいます。

これを満たす方法は 2 つあります：

1. 影響を受ける翻訳を更新するか、
2. それらを `__MISSING__:<new english>` に設定する — するとランタイムが修正済みの英語を提供し（`src/i18n/request.ts::deepMergeFallback`、#7258）、そのキーは翻訳キューに入ります。

文字列の**意味**が変わった場合は、**キーの名前変更**を推奨します。新しいキーは陳腐化した翻訳を継承しません。これが #8463 で使われたパターンです。

```bash
npm run i18n:check-value-drift          # 厳密モード（CI が実行するもの）
npm run i18n:check-value-drift:warn     # レポートのみ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ベースカタログを読み取れない場合（ベース ref のない浅いクローンなど）、`SKIP reason=base-unresolved` を出力して終了コード 0 で終了します。これは `check-openapi-breaking` と同じ動作です。

### ジョブ: `i18n`

完全な i18n 検証マトリックス（ロケールごとに 1 ジョブ）。ジョブ全体がアドバイザリーです。

| スクリプト                      | 検証内容                   | ブロッキング                                                 |
| ------------------------------- | -------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | ロケールごとの翻訳の完全性 | **アドバイザリー**（ジョブ全体に `continue-on-error: true`） |

### ジョブ: `pr-test-policy`

プルリクエストでのみ実行されます。

| スクリプト             | 検証内容                                                                                                                            | ブロッキング |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | `src/`、`open-sse/`、`electron/`、`bin/` 内の本番コードを変更する PR は、テストを追加または更新する必要がある（ハードルール #8）    | はい         |
| `check:test-masking`   | 変更されたテストファイルがアサートの正味の数を減らしたり、`assert.ok(true)` のトートロジーを追加したりしていないこと                | はい         |
| `check:pr-evidence`    | PR 本文が変更に対するテスト/VPS の証跡を引用していること（PR の文章を grep してハードルール #18 を機械化 — 脆弱。バックログを参照） | はい         |

### ジョブ: `test-vitest`

`build` の後に実行されます。失敗時はマージをブロックします。

| スイート         | 検証内容                                                            | ブロッキング                                                                                                  |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP サーバー（110 ツール）、autoCombo、キャッシュ — vitest ランナー | はい                                                                                                          |
| `test:vitest:ui` | UI コンポーネントテスト — vitest ランナー                           | **ブロッキング** — 既存の失敗は `vitest.config.ts` で明示的に除外されており、新たな失敗はジョブを失敗させます |

### ナイトリーワークフロー（スケジュール実行、アドバイザリー）

これらは cron スケジュール（および `workflow_dispatch`）で実行され、PR では実行されません。すべてアドバイザリーです。

| ワークフロー           | 検証内容                                                                                                                                                      | ブロッキング       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | ランダムシード + 高い実行回数による fast-check プロパティテスト                                                                                               | **アドバイザリー** |
| `nightly-resilience`   | ヒープ増加ゲート、カオス障害注入、k6 負荷/ソークテスト                                                                                                        | **アドバイザリー** |
| `nightly-llm-security` | promptfoo インジェクションガード（ブロックモード）+ garak プローブ（プロバイダーシークレットがない場合はスキップ）                                            | **アドバイザリー** |
| `nightly-schemathesis` | `docs/openapi.yaml` を使用した、稼働中の OmniRoute に対する OpenAPI コントラクトファジング（schemathesis）— 仕様違反や未処理の 500 エラーを検出（Fase 8 B.4） | **アドバイザリー** |
| `nightly-mutation`     | 高速ユニットレーンに対する Stryker ミューテーションテストスコア — 生き残ったミュータントは弱いアサートを浮き彫りにする                                        | **アドバイザリー** |
| `nightly-compat`       | サポートされる `engines.node` 範囲にわたる Node エンジン互換性マトリックス                                                                                    | **アドバイザリー** |

パフォーマンスベースライン（ヒープ、TTFB、ビルド時間）はゲートではなく記録されます。[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）を参照してください。

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
