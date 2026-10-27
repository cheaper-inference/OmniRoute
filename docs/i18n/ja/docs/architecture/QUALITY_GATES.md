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

CI および Quality Gates ワークフローは、それぞれ安定した判定結果 `Gate / CI` と
`Gate / Quality` を出力します。バージョン管理された受け入れポリシーでは、すべての上流ジョブを
必須または参考として列挙します。適用対象の必須ジョブは成功しなければなりません。結果が欠落、
キャンセル済み、スキップ済み、保留中、または不明の場合は、PASS を確定できません。有効な
docs-only または catalog-only の分類によってコードレーンが適用対象外になる場合がありますが、
ドラフト PR は候補として受け入れられません。`hotfix` ラベルによってエビデンスが免除されることはありません。

どちらのワークフローも、main/release ブランチへの PR、`main` へのプッシュ、手動ディスパッチ、
およびマージグループイベントを対象とします。プッシュ、ディスパッチ、マージグループでは、すべての選択対象を実行します。
`release/**` へのプッシュではこれらは開始されません（2026-10-18）。各変更はすでにその PR でマトリクスを実行しており、
マージされた組み合わせの検証は Release-Green の役割です（`docs/ops/RUNNER_BOX.md` → Hosted レーン）。フォークと
マージグループでは、通常セルフホステッドランナーを選択するジョブにホステッドランナーを使用します。
ロールアウト前に十分なホステッド容量を確認する必要があります。

各 JSON レシートは、チェックアウトされた SHA、ワークフロー実行、および試行を識別します。
CLI は、チェックアウト SHA とイベント SHA の不一致を拒否します。ワークフローテストでは、ポリシーのメンバーシップを
判定ジョブの `needs` リストに結び付けるため、新規レーンや削除されたレーンが暗黙に消えることはありません。
レシートが対象とするのは、それ自体のワークフローであり、公開、デプロイ、または既存の参考スキャナーの内部処理ではありません。
ブランチルールで両方のチェック名を有効にすることは、別途必要な管理上の変更です。これらのジョブを追加するだけでは、
ブランチは保護されません。

### 受け入れリデューサーに保持されるエビデンス

`scripts/quality/validate-release-acceptance.mjs` は、指定されたプランとその
マニフェストを集約します。そのプランがリリースパイプライン全体を網羅していることを立証するものではありません。
そのレポートでは、プランが `VERIFIED` の場合でも、`releaseAcceptance: false` が明示的に設定されます。
`release-acceptance.yml` ワークフローでは、実際のビルド、パッケージ、起動、または昇格のレシートではなく、
引き続きシャドウフィクスチャを使用します。

CLI で保持済みエビデンスを検証するには、`--evidence-root` が必要です。ファイルは
`<evidence-root>/<artifact_id>/<member>` として解決され、SHA-256 でハッシュ化されます。エビデンスのない PASS レコード、
欠落または変更されたファイル、安全でないパス、あるいはシンボリックリンクがあると、検証できません。
欠落ファイルは、空の正常なログと同等ではありません。既存の SHA、実行、試行のチェックは独立したままです。
バイト列が一致していても、古いレシートを有効にすることはできません。ファイルの整合性は、実行の真正性や
アーティファクトの昇格を証明するものではありません。

### UI 実行容量

CI は、UI の全インベントリを 4 つの `test-vitest` マトリクスシャードとして実行します。各シャードのワーカー数は最大
2 つで、既存のジョブ期限である 15 分が適用されます。最初のシャードでは、
MCP/autoCombo Vitest スイートも実行します。必須ジョブの結果は、すべてのマトリクスレッグを対象とします。
1 つのシャードが失敗またはキャンセルされた場合、候補の受け入れを確定できません。

夜間オブザーバーでは、UI シャードごとに正確な候補のレシートを個別に保持し、
最初のレシートには MCP の実行も含めます。4 つすべてのレシート、ログ、および一致する
実行 ID が必要です。ローカルの `npm run test:vitest:ui` では引き続きスイート全体が選択されます。
1 回の `--shard` 実行は、部分的なエビデンスにすぎません。

### ユニットカバレッジの収集

12 個のユニットシャードは、既存のテスト実行中に V8 カバレッジを収集します。成功した
シャードは `scripts/ci/compact-v8-coverage.mjs` を実行し、中間の Istanbul レポートを生成せずに
元のファイルを圧縮します。最終的な Coverage ジョブは、12 個すべてのマニフェストを
候補 SHA、ランタイム、ソースルート、およびデータハッシュと照合して検証した後、c8 のレポーターと既存の
カバレッジしきい値を実行します。入力では、c8 のグローバルなファイル名順序を維持します。
関数カバレッジとブロックカバレッジが混在する場合、シャード単位の事前マージは安全ではありません。
欠落、不正な形式、または互換性のないシャードがあると、受け入れは失敗します。
失敗したテストシャードの生の診断カバレッジは別途保持され、最終マージには含められません。

### 静的スキャン一覧

バージョン管理された npm エイリアス一覧と静的スキャンのメンバーシップは、
`config/quality/gate-manifest.json` にあります。`npm run check:gate-manifest` を実行して、
スクリプト名と正確なコマンドを `package.json` と照合して検証してください。追加、削除、
およびコマンドの相違があると、ローカルフックと CI の変更分類ジョブの両方が失敗します。
エイリアスは、ワークフロージョブ、マトリクスインスタンス、テストケースのいずれでもありません。
これらの件数を同等のものとして扱ってはなりません。

選択されたエイリアスを実行せずに確認するには、`npm run quality:scan -- --list` または
`npm run quality:scan:fast -- --list` を使用してください。ランナーは npm エントリポイントを呼び出すため、
そのランタイム（設定されている場合は Bun を含む）が維持されます。
マニフェストでは、これらのプロファイル外のエイリアスを個別に呼び出されるものとして記録します。
また、読み取り専用のスキャンプロファイルではメンテナンスコマンドは禁止されています。

これらのプロファイルが対象とするのは静的スキャンのみです。プロダクトテスト、
カバレッジ、パッケージング、外部チェック、または候補のリリース受け入れ全体を保証するものではありません。
ワークフローの受け入れでは、リンクされた `config/quality/admission-policy.json` と
`scripts/quality/admission-verdict.mjs` を使用します。リリースオブザーバーのプロファイルは別個のままです。
適用対象のチェックとレシートは個別に確認してください。完全版オブザーバーの静的コマンドは、
`audit:deps`、ミューテーションテストの選択、および翻訳チェックを含め、
`config/quality/release-green-static-profile.json` で宣言されています。ローダーは npm
コマンドを package.json およびモデル化された CI/Quality 宣言と照合して検証します。シェルトークンを引数として
実行するのではなく、相違があれば拒否します。必須スキャナーの SKIP/INCOMPLETE 出力では、
PASS を確定できません。このプロファイルは外部の除外対象を記録するものであり、
ホステッドカバレッジ、テストマトリクス、パッケージ、またはデプロイのエビデンスを置き換えるものではありません。
以下の文章による一覧は参考情報であり、ゲートが実際に実行されたことの証明ではありません。

スクリプトは `scripts/check/`（ポリシーゲート）および `scripts/quality/`（ラチェットエンジン）配下にあります。
CI の信頼できる唯一の情報源は `.github/workflows/ci.yml` です。

### リリース PR 高速パス（`quality.yml`）

`.github/workflows/quality.yml` は、main/release PR、`main` へのプッシュ、
手動実行、およびマージグループに対する CI を補完します。PR では、パスフィルタリングされた高速チェックを使用します。恒久的に
無効化されていた重複ビルドは削除され、実際のビルド／パッケージ化／起動チェックは CI に残されています。

| ジョブ                                           | 対象範囲                                                                                                                                                                                | ブロッキング        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | ドキュメント／コードの PR；API ドキュメント参照と docs-all                                                                                                                              | はい                |
| `Fast Quality Gates`                             | コードの PR；静的チェック、型チェック、ダッシュボードの型チェック、影響を受けるユニットテスト                                                                                           | はい                |
| `Forgotten sibling tests`                        | コードの PR；変更されたモジュールから静的利用箇所と候補 sibling テストを追跡；barrel と動的インポートのパスは、参照先を明記した許可リストの例外とともに、助言的な診断として報告されます | **助言のみ**        |
| `Vitest (fast-path)`                             | コードの PR；高速 vitest スイート                                                                                                                                                       | はい                |
| `Unit Tests fast-path`                           | コードの PR；4 シャードのユニットテストスイート                                                                                                                                         | はい                |
| `No new ESLint warnings`                         | コードの PR；抑制を考慮した lint ガード                                                                                                                                                 | はい（fork を含む） |
| `Merge integrity (changelog + generated skills)` | draft ではない PR；changelog と生成された skill の同期                                                                                                                                  | はい（fork を含む） |

#### Forgotten sibling tests レポート

`npm run check:forgotten-sibling-tests` は、テスト影響マップの基盤となるインポートリゾルバーを再利用します。
変更された各本番モジュールについて、候補テストがプルリクエストの diff に存在しない場合に、決定論的な
`changed module/symbol -> static consumer -> candidate sibling test` チェーンを報告します。Markdown のサマリーと JSON の結果は、
ブロッキング運用を開始する前の調整用として、`forgotten-sibling-tests` ワークフローアーティファクトに保持されます。

barrel の再エクスポートと動的インポートは、解決に関する診断にのみ使用され、ブロッキング対象の検出結果を生成することはありません。
レビュー済みの例外は
`config/quality/forgotten-sibling-allowlist.json` に記載されます。各エントリには、consumer と候補
テストを指定し、具体的な根拠を示し、GitHub issue または pull request へのリンクを含める必要があります。不正な形式のエントリは
安全側に倒して失敗として扱われます。例外によって、削除された候補テストや、`.skip`／`.todo` を追加する diff を抑制することはできません。
アサーションの弱体化やその他のマスキングは、独立してブロッキングとして機能する
`check:test-masking` ゲートが引き続き担当します。

### ジョブ：`lint`

`main` へのすべての PR で実行されます。失敗した場合はマージをブロックします。

| スクリプト (`npm run ...`)        | 検証内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ブロッキング                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js のバージョンがサポート対象範囲内であること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | はい                                      |
| `check:cycles`                    | `src/` + `open-sse/` 全体の循環インポート（AST ベース、tsconfig の `paths` を解決）。単独実行では、循環が存在する場合は常に終了コード 1 で終了し（#15281 以降はフェイルクローズ）、SCC を一覧表示します。`check:cycles:ratchet`（CI で実行されるもの）は、循環数が `quality-baseline.json` の `metrics.cycles` 上限を超えるとブロックします。現在は 14、`direction: down` であるため、減少のみ可能です（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | はい（ラチェット）                        |
| `check:boundary`                  | `open-sse → src` の結合度：エンジンからアプリへの一意なファイル間インポート（`scripts/quality/measure-boundary.mjs`。エッジリストは v4 のコア／モジュール分割に関する修正バックログです）。単独実行 = アドバイザリーレポート（`quality:boundary` と同じ）。`check:boundary:ratchet`（CI で実行され、`quality.yml` の高速ゲート用ラチェットループにも含まれるもの）は、カウントが `quality-baseline.json` の `metrics.boundaryOpenSseToSrc` 上限を超えるとブロックします。上限は測定値 771 で初期設定され、`direction: down` です。`--update` では上限を下げることしかできません。PR ではベース相対です（`--base-ref`、以下を参照）                                                                                                                                                                                                                                                                                                                                                                                  | はい（ラチェット）                        |
| `check:route-validation:t06`      | すべてのルートに Zod スキーマが存在すること（Tier 6 ポリシー）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | はい                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` の数がバジェットを超えていないこと（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                      |
| `check:provider-consistency`      | `providers.ts` 内のすべてのプロバイダーに、`providerRegistry.ts` 内の対応するエントリが存在すること（およびその逆。ただし許可リスト内に限る）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | はい                                      |
| `check:model-lifecycle`           | 手動で管理されている3つのルーティングテーブルが、チェックイン済みのライフサイクルスナップショット（#11503）と整合していること：`FITNESS_TABLE`（`taskFitness.ts`）が、`REGISTRY` でルーティング可能な廃止済み ID を評価対象にしていないこと、すべての `BUILT_IN_ALIASES` のターゲットが `REGISTRY` に存在し、廃止済み ID のスナップショットには存在しないこと、`REGISTRY` に残っているすべての廃止済み ID が転送されるか、`allowedRetiredInCatalog` に記載されていること、また、`DEFAULT_DEGRADATION_MAP` のソースまたはターゲットがそのスナップショット内で廃止済みになっていないこと。これは、モデルが現在稼働中のアップストリームから提供されていることを証明するものではありません。オフライン — `config/quality/model-lifecycle.json` と比較します。このファイルは `npm run quality:refresh-model-lifecycle`（ネットワークを使用。CI には組み込まれていません）で手動更新します。`allowedRetiredInCatalog` は段階的削減のためのラチェットです。エントリを追加する場合は、必ず追跡用 Issue を伴わせてください。 | はい                                      |
| `check:fetch-targets`             | クライアント側の `src/` にあるすべての `fetch("/api/...")` が、実在する `route.ts` に解決されること                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | はい                                      |
| `check:deps`                      | リポジトリ内のすべての `package.json` に含まれる、`npm install` でインストール可能なすべての依存関係が `dependency-allowlist.json` に登録されていること。新規のバージョン固定されていないパッケージや、スロップスクワッティングの疑いがあるパッケージはフラグ付けされます                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                      |
| `audit:deps`                      | 5つの独立したロックファイル（ルート、Electron、OpenCode プラグイン v1/v2、プロバイダー）すべてに対する npm audit。重大なアドバイザリはブロックし、高レベルのアドバイザリは可視の警告として残ります。監査の欠落または失敗は未完了（INCOMPLETE）として扱われ、ブロックされます。スコープごとのロックハッシュとレポートは保持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                      |
| `check:lockfile`                  | `package-lock.json` の整合性 — https レジストリ、整合性ハッシュ、ホストのオーバーライドなし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                      |
| `check:licenses`                  | 本番環境用依存関係に対する SPDX ライセンス許可リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | はい                                      |
| `check:tracked-artifacts`         | ビルド成果物およびコミットされた `node_modules` シンボリックリンクがないこと（husky の pre-commit でも実行。pre-push は意図的に軽量化 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                      |
| `check:ai-attribution`            | PR のコミット、タイトル、本文に AI／ボットによる `Co-Authored-By` トレーラーや AI 生成フッターがないこと — ハードルール #16（PR→`release/**` では `quality.yml` の高速ゲートループ内で実行 — イベントペイロードを読み取り、PR 以外では何もしない — また、PR→`main` では `ci.yml` の lint にある PR 専用ステップでも実行。さらに husky の `commit-msg` フックでも実行。人間の共同作成者は許可。#14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | すべての Vitest 除外項目に追跡用 Issue が明記され、`config/quality/vitest-exclusions.json` に記載されていること（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | はい                                      |
| `check:file-size`                 | ソースファイル（`src/`、`open-sse/`、`electron/`、`bin/` 内の `.ts`／`.tsx`）が `cap` 以内、テストファイル（`*.test.ts(x)`）が `testCap` 以内であること。`file-size-baseline.json` で凍結されたファイル（`frozen`／`testFrozen`）は、記録されたサイズを超えて増大してはならない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                      |
| `check:error-helper`              | executor/handler のエラーレスポンスで `buildErrorBody()` / `sanitizeErrorMessage()` を使用している（ハードルール #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | はい                                      |
| `check:migration-numbering`       | マイグレーション SQL ファイルに欠番や重複がなく、連番になっている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | はい                                      |
| `check:public-creds`              | `publicCreds.ts` 以外に OAuth の `client_id`/`client_secret` または Firebase Web キーのリテラルが存在しない（ハードルール #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                      |
| `check:db-rules`                  | `src/lib/db/` モジュール以外に生の SQL が存在せず、`localDb.ts` からのバレルインポートも存在しない（ハードルール #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                      |
| `check:known-symbols`             | ディスパッチテーブルに登録されたプロバイダー executor、ルーティング戦略、および translator がディスク上のファイルと一致しており、孤立したシンボルや未宣言のシンボルが存在しない                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | はい                                      |
| `check:route-guard-membership`    | 子プロセスを生成するすべてのルートが `isLocalOnlyPath()` によって分類されている（ハードルール #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | はい                                      |
| `check:test-discovery`            | リポジトリ内のすべての `*.test.ts` / `*.spec.ts` ファイルが、少なくとも1つのテストランナーによって収集される（ラチェット方式: `test-discovery-baseline.json` 内の孤立ファイル一覧は縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | はい                                      |
| `check:test-tla-order`            | `tests/unit` 配下の `node:test` ファイルが、テストを登録し、トップレベルの `await` に到達した後、さらにテストを登録することがない（#18045、ラチェット方式: `test-tla-order-allowlist.json` は縮小のみ可能）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | はい                                      |
| `check:agent-skills-sync`         | 生成されたエージェントスキルの成果物がソースカタログと一致している（差異なし）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | プロバイダーのロゴ／アセットに、記録済みの出所情報エントリが付与されている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON 設定ファイルが正常に解析され、リポジトリの lint ルールを満たしている                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | エラーなしの TypeScript コンパイル（警告は参考情報のみ）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | はい                                      |
| `typecheck:noimplicit:core`       | 厳格な `noImplicitAny` — 将来を見据えた設定。既存の多くの呼び出し箇所には、依然として型注釈が必要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **参考情報**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` にスコープされた `tsc` (#7033) — `typecheck:core` の厳選された27ファイルの許可リストにはダッシュボードの TSX が一切含まれておらず、`next build` も型チェックを一切行いません（`next.config.mjs` で `ignoreBuildErrors: true` が設定されています）。そのため、そこで発生した孤立識別子のリグレッション (#6625/#6909) は CI で検出できませんでした。固定されたファイルごと／TS コードごとの件数ベースライン（`config/quality/dashboard-typecheck-baseline.json`、`check:known-symbols` と同じ陳腐化強制パターン）との差分を比較します。ベースラインの件数を超える新規エラーのみがゲートを失敗させます。既存エラーを修正した場合は `--update` で段階的にベースラインを引き下げます。                                                                                                                                                                                                                                                                                                          | はい                                      |

### ジョブ: `quality-gate`

`test-coverage` の後に実行されます。失敗した場合はマージをブロックします。

| スクリプト                   | 検証内容                                                                                                                                                                                       | ブロッキング             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json`（ESLint の警告数、マージ済みシャードレポートからのカバレッジ）を出力します                                                                                              | はい（ラチェットの上流） |
| `quality:ratchet`            | `quality-baseline.json` 内の各メトリクスが悪化していないこと（ESLint の警告数 ≤ ベースライン、カバレッジ ≥ ベースライン）                                                                      | はい                     |
| `check:duplication`          | コード重複（jscpd@4）が `quality-baseline.json` のベースラインを超えていないこと                                                                                                               | はい                     |
| `check:complexity`           | ファイルレベルの循環的複雑度が上限を超えていないこと（コア ESLint の `complexity` + `max-lines-per-function`）                                                                                 | はい                     |
| `check:cognitive-complexity` | 認知的複雑度ラチェット（`eslint-plugin-sonarjs`）— 個別の ESLint パス。CI では両方を単一の `check:complexity-ratchets` ステップとして統合して実行します                                        | はい                     |
| `check:dead-code`            | 未使用のエクスポート／ファイルのラチェット（knip）がベースラインと比較して悪化していないこと                                                                                                   | はい                     |
| `check:compression-budget`   | 圧縮ベンチマークの予算 — エンジンごとのトークン削減率の下限が悪化してはならないこと                                                                                                            | はい                     |
| `check:type-coverage`        | 型付け率ラチェット（`type-coverage`）が悪化していないこと。`typecheck:noimplicit:core` をほぼ包含します                                                                                        | はい                     |
| `check:codeql-ratchet`       | 未解決の CodeQL アラート数が悪化していないこと（`gh api` 経由で読み取り。トークンがない場合は正常にスキップ）— 更新頻度と手動トリガーについては、以下の「CodeQL ラチェット」を参照してください | はい                     |

### ジョブ: `quality-extended`

このジョブは、該当する候補をブロックします。バンドルサイズ、シークレットの検出結果、脆弱性の
検出結果、ワークフローの検出結果、および OpenAPI の変更は、必須ラチェットによってチェックされます。
循環依存関係の診断は、引き続き参考情報として扱われます。スキャナーのインストールは必須です。
`scripts/ci/install-quality-scanners.sh` は固定バージョンをプロビジョニングし、
インストールの失敗を伝播させます。ツールの欠落、無効なレポート、またはベースラインの欠落がある場合、
必須のスキャナーゲートは未完了のままとなります。

| スクリプト               | 検証内容                                                                                                                                                                                                      | ブロッキング                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | 循環依存がないこと（dpdm）                                                                                                                                                                                    | **勧告のみ**                                    |
| `check:bundle-size`      | バンドルサイズが上限を超えていないこと。測定できない場合は失敗                                                                                                                                                | **--ratchet 使用時はブロッキング**              |
| `check:secrets`          | Gitleaks の検出結果が悪化していないこと。必須スキャンでは、ツール、ソース、ベースラインの欠落、スキャンの失敗、無効なレポートを拒否                                                                           | **--ratchet 使用時はブロッキング**              |
| `check:vuln-ratchet`     | 依存関係の脆弱性が悪化していないこと。必須スキャンでは、ツールの欠落、無効なレポート、ベースラインの欠落を拒否                                                                                                | **--ratchet 使用時はブロッキング**              |
| `check:workflows`        | ワークフローの lint（actionlint + zizmor）。スキャナーの欠落や破損、無効なレポート、ratchet ベースラインの欠落は INCOMPLETE として失敗。有効な検出結果には、選択された strict/advisory/ratchet ポリシーを適用 | 実行必須。CI では zizmor ratchet がブロッキング |
| `check:openapi-breaking` | 固定されたイベントコミットに対する公開 API コントラクト（PR の merge-base、push の before、merge-group の base、scheduled/manual ではチェックアウトしたコミットの最初の親）。必須測定はフェイルクローズ       | **--ratchet 使用時はブロッキング**              |

### ジョブ: `docs-sync-strict`

`main` または `release/**` へのプルリクエストでは、このジョブは、ドラフトではない（または信頼済みキューの）候補で、ドキュメント変更またはコード変更に分類されたものに対してのみ実行されます。PR 以外の CI イベントでも実行されますが、このワークフローの push トリガーは `main` のみが対象で、`release/**` は対象外です。終了コードがゼロ以外のステップはジョブをブロックします。以下の報告のみの指摘や文書化された例外はブロックしません。

| スクリプト                     | 検証内容                                                                                                                                                                                                                                                                                                               | ブロッキング                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `check:docs-all`               | 以下の 7 つのサブゲートを順番に実行するメタゲート                                                                                                                                                                                                                                                                      | はい                                                                                 |
| ↳ `check:docs-sync`            | パッケージ/OpenAPI/CHANGELOG のバージョン整合性、`llm.txt` ミラーの完全一致、翻訳済み CHANGELOG のセクションとサイズの不変条件、置き換え済みの重複ドキュメントがないこと                                                                                                                                               | はい                                                                                 |
| ↳ `check:docs-frontmatter`     | コンパイルされたドキュメントページに有効な frontmatter タイトルが含まれていること                                                                                                                                                                                                                                      | はい                                                                                 |
| ↳ `check:docs-counts`          | 信頼度の高い件数の不変条件は厳格に検証します。ファイル数のヒューリスティックな検査は、スクリプトに `--strict` が渡されない限り警告のみです（CI のメタゲートはこのフラグを渡しません）                                                                                                                                  | 厳格な層はブロック、ソフトな層は勧告のみ                                             |
| ↳ `check:env-doc-sync`         | 明示的な ignore、doc-only、env-only の許可リストを適用した後、ソースコードでの環境変数の読み取り、`.env.example`、`docs/reference/ENVIRONMENT.md` が一致すること                                                                                                                                                       | はい。文書化された許可リストの対象外でブロック                                       |
| ↳ `check:deprecated-versions`  | 無視対象のドキュメントを除き、安全な履歴コンテキスト以外にある古い可能性のあるバージョンと、古い更新日を報告します                                                                                                                                                                                                     | 現在の CI 構成では勧告のみ（`--strict` は渡されません）                              |
| ↳ `check:doc-links`            | ドキュメント内の内部 Markdown リンクが実在するファイルを参照していること（`[text]`/`(path)` 形式）                                                                                                                                                                                                                     | はい                                                                                 |
| ↳ `check:fabricated-docs`      | ドキュメントに記載されたルート、環境変数、CLI コマンド、フック名、ファイルパスがコードベースに存在すること。`--strict` 使用時はハードゲート、フラグなしではソフトフェイル。                                                                                                                                            | はい（CI では `--strict` を使用）                                                    |
| `check:cli-i18n`               | 使用される CLI の `t()` キーが `en` に存在し、`pt-BR` がすべての最上位セクションを保持し、`zh-CN` と `zh-TW` が `en` のすべてのキーを含むこと                                                                                                                                                                          | はい                                                                                 |
| `check:openapi-coverage`       | OpenAPI 仕様が、実在するルート数に対して ratchet された最低基準以上をカバーしていること                                                                                                                                                                                                                                | はい                                                                                 |
| `check:openapi-security-tiers` | 宣言された `x-loopback-only`/`x-always-protected` アノテーションには `routeGuard.ts` の裏付けが必要です。パーサーエラーと順方向の不一致はブロックします。ローカル専用プレフィックス配下で欠落した `x-loopback-only` を調べる逆方向の検査は警告のみで、パターンだけで定義されたルートはこの逆方向検査から除外されます。 | パーサー/順方向の検査はブロック、逆方向の検査は勧告のみ                              |
| `check:openapi-routes`         | 正当な理由のある `KNOWN_STALE_SPEC` 許可リストを適用した後、`openapi.yaml` 内の各 `/api...` パスがパラメーター名に依存せず実在のルートに対応すること。許可リストの古い項目も失敗になります                                                                                                                             | はい                                                                                 |
| `check:docs-symbols`           | ミラーではない正本ドキュメントの内部 `/api/...` URL 参照が、実在のルートまたはルート群に対応すること。プロキシ/上流/プレースホルダー/ファイルへの参照と、正当な理由のある `KNOWN_STALE_DOC_REFS` 項目は除外されます。許可リストの古い項目は失敗になります                                                              | はい                                                                                 |
| `i18n translation drift`       | コア翻訳ドキュメントのソース/ターゲットのハッシュが `.i18n-state.json` と一致すること。PR は、新たに生じたソースのドリフト、ターゲットの欠落、ターゲットハッシュのドリフトに対してのみ失敗します。PR 以外の検査は厳格です。PR が引き継いだドリフトと、古いターゲットのソースハッシュは警告です。                       | PR の新規ドリフト/PR 以外の厳格なドリフト検査はブロック、継承済み/古いものは勧告のみ |

`docs/diagrams/` 内の README 用 SVG 12 個は `scripts/docs/gen-readme-<name>.mjs` で生成され、`npm run docs:readme-diagrams` ですべて再生成できます。
各 SVG にはバイト単位で比較するユニットテスト（`tests/unit/docs/readme-*-svg.test.ts`、ジョブ `test-unit`）があり、コミット済みファイルが古くなると失敗します。
`check:docs-counts` はそれらの `<text>` ノードから正規の数値を読み取るため、数値の文字をアウトラインのパスに変換することはありません。
SVG の正規数値チェックは `SVG_DIAGRAM_FILES`（`scripts/check/check-docs-counts-sync.mjs`）に列挙されたファイルを読み取ります：`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`。
永久無料のプロバイダー、カタログ項目、繰り返し利用枠のプール、スコアリング要素に関する記述の検証でも `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` を読み取ります。
`free-tier-budget.svg` の数値は現在のカタログを読み込むローダーから取得するため、`FREE_MODEL_BUDGETS` またはプロバイダーの表示名を変更すると、このファイルを再生成するまで CI が失敗します。

### ジョブ: `i18n-ui-coverage`

| スクリプト                            | 検証内容                                                                                                                                                                    | ブロッキング |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (インライン) | UI i18n キーのカバレッジが 65% 以上であること                                                                                                                               | はい         |
| `check-ui-value-drift` (インライン)   | 書き換えられた英語の**値**に対応する古い翻訳が残っていないこと                                                                                                              | はい         |
| `check-new-key-coverage` (インライン) | **新しい**英語キーがすべてのロケールで翻訳されていること — `__MISSING__:` マーカーは拒否される                                                                              | はい         |
| `check-translation-ratio`             | ロケールごとの実翻訳率（許可リスト外にある、英語と同一の値／プレースホルダー／欠落したリーフ）が `config/quality/i18n-translation-baseline.json` + 許容値を超えていないこと | **勧告のみ** |

`fetch-depth: 0` が必要です — 値ドリフトゲートは、マージベースとの差分を `en.json` について取得します。

#### `check-ui-value-drift` — 古い翻訳のゲート

ほかのゲートでは構造上検出できない、ある種の i18n リグレッションを検出します。英語の値が
書き換えられたにもかかわらず、_以前の_ 英語から作成された翻訳が残り、
英語以外のユーザーが、断定的に書かれてはいるものの、今では誤っている文面を読み続ける問題です。

これは実際にリリースされました。Antigravity のログインヘルパーが導入された際（#5203）、
`oauthModal.googleOAuthWarning` が書き換えられましたが、**43 ロケール中 39 ロケール**には、
運用担当者に「完全な URL をコピーして下に貼り付ける」よう指示する文面が残りました。そのプロバイダーでは
完了できないフローです。次の理由により、#8463 まで見落とされていました。

- `sync-ui-keys` は**存在しない**キーのみを補完し、**古い**キーは補完しない。
- `check-ui-keys-coverage` はキーの_存在_を数えるため、古い翻訳もカバー済みとして計上される。
- `check-translation-drift` は `docs/i18n/<locale>/**.md` のドキュメントミラーを追跡する —
  `src/i18n/messages/*.json` は一切読み取らない。2026-09 の再同期以降、ジョブ `docs-sync-strict` でブロッキング：
  コアドキュメントを編集 → `npm run i18n:run -- --files=<doc>`（セクション単位で低コスト）。

**差分認識型であり、ベースライン依存ではありません。** マージベース時点の `en.json` と
作業ツリーを比較します。英語の値が変更された各キーについて、変更されていない翻訳を
保持しているロケールは古いと判定されます。これは意図的に**既存の負債を固定**します — 差分からは、
以前から存在する翻訳がどの古い英語に由来するのか判別できないため、ゲートは
現在の変更で触れたものだけを判定します。代替案（キーごとのハッシュベースライン）では、
生成ファイルが約 600 KB、既存の最大ベースラインの 3 倍となり、i18n PR のたびに大量の変更が発生します。

このゲートを満たす方法は 2 つあります。

1. 影響を受ける翻訳を更新する、または
2. それらを `__MISSING__:<new english>` に設定する — これによりランタイムは修正済みの英語を提供し
   （`src/i18n/request.ts::deepMergeFallback`、#7258）、そのキーは翻訳待ちキューに入ります。

文字列の**意味**が変わった場合は、**キー名の変更**を推奨します。新しいキーが古い翻訳を
継承することはありません。#8463 ではこのパターンが使用されました。

```bash
npm run i18n:check-value-drift          # 厳格（CI で実行されるもの）
npm run i18n:check-value-drift:warn     # レポートのみ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ベースカタログを読み取れない場合（ベース参照のないシャロークローン）は、
`check-openapi-breaking` と同様に `SKIP reason=base-unresolved` を出力して終了コード 0 で終了します。

### ジョブ：`i18n`

完全な i18n 検証マトリックス（ロケールごとに 1 ジョブ）。ジョブ全体が勧告のみです。

| スクリプト                      | 検証内容                 | ブロッキング                                           |
| ------------------------------- | ------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | ロケールごとの翻訳完全性 | **勧告のみ**（ジョブ全体に `continue-on-error: true`） |

### ジョブ：`pr-test-policy`

プルリクエストでのみ実行されます。

| スクリプト             | 検証内容                                                                                                                                                   | ブロッキング |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する PR に、テストの追加または更新が含まれていること（ハードルール #8）                  | はい         |
| `check:test-masking`   | 変更されたテストファイルで、アサーションの正味数が減少しておらず、`assert.ok(true)` のような恒真式が追加されていないこと                                   | はい         |
| `check:pr-evidence`    | PR 本文に、その変更に関するテスト／VPS の証跡が記載されていること（PR の文章を grep することでハードルール #18 を機械化 — 壊れやすいため、Backlog を参照） | はい         |

### ジョブ：`test-vitest`

`build` の後に実行されます。失敗するとマージをブロックします。

| スイート         | 検証対象                                                            | ブロッキング                                                                                                            |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP サーバー（110 ツール）、autoCombo、キャッシュ — vitest ランナー | はい                                                                                                                    |
| `test:vitest:ui` | UI コンポーネントテスト — vitest ランナー                           | **ブロッキング** — 既存の失敗は `vitest.config.ts` で明示的に除外されています。新たな失敗が発生するとジョブは失敗します |

### ナイトリーワークフロー（スケジュール実行、参考情報）

これらは cron スケジュール（および `workflow_dispatch`）で実行され、PR では実行されません。すべて参考情報として扱われます。

| ワークフロー           | 検証対象                                                                                                                                                            | ブロッキング |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | ランダムシードと多い実行回数を使用した fast-check プロパティテスト                                                                                                  | **参考情報** |
| `nightly-resilience`   | ヒープ増加ゲート、カオス障害注入、k6 負荷／ソークテスト                                                                                                             | **参考情報** |
| `nightly-llm-security` | promptfoo インジェクションガード（ブロックモード）+ garak プローブ（プロバイダーシークレットがない場合はスキップ）                                                  | **参考情報** |
| `nightly-schemathesis` | `docs/openapi.yaml` を使用し、稼働中の OmniRoute に対して行う OpenAPI コントラクトファジング（schemathesis）— 仕様違反／未処理の 500 エラーを検出（フェーズ 8 B.4） | **参考情報** |
| `nightly-mutation`     | 高速ユニットレーンに対する Stryker ミューテーションテストスコア — 生き残ったミュータントから弱いアサーションを検出                                                  | **参考情報** |
| `nightly-compat`       | サポート対象の `engines.node` 範囲全体にわたる Node エンジン互換性マトリックス                                                                                      | **参考情報** |

パフォーマンスベースライン（ヒープ、TTFB、ビルド時間）は記録されますが、ゲート条件にはなりません。[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）を参照してください。

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
