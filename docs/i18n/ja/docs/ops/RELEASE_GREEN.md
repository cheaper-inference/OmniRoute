# Release-Green: candidate validation and evidence (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green は、特定のコミットを監視し、その検証結果を報告します。 [Quality Gates リファレンスでは](../architecture/QUALITY_GATES.md)、現在のCIプロファイル、必要なチェック、および受け入れポリシーが定義されています。バージョン管理された[アドミッション ポリシー](../../config/quality/admission-policy.json)は、 `Gate / CI`および`Gate / Quality`の実行可能な契約です。

## CIとオブザーバー スコープ

`ci.yml`と`quality.yml` 、メイン ブランチとリリース ブランチへのプル リクエストをカバーします。選択したプロファイルによって、どのジョブが適用されるかが決まります。完全なCIは、通常のプル リクエストでは実行されないレーンも含まれます。クイック オブザーバーの結果はこれらのジョブを置き換えることはできません。また、完了したワークフロー ラッパーはそのレシートを置き換えることはできません。

実稼働ビルドはCIに属します。 `quality.yml`には重複したアドバイザリ ビルドはありません。アーティファクトの欠落、キャンセルされた作業、不完全な測定は、必要なチェックを成功させることができません。結果を受け入れる前に、現在のベース、ヘッド、および組み合わせた候補を確認してください。

## ローカル検証

依存関係を準備した後、所有されているワークツリーでオブザーバーを実行します。大量の検証を行う前に、[ワークツリーとリソース プロトコルを](WORKTREE_ISOLATION.md)使用してください。

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

クイックプロフィールは部分的なものです。完全なプロファイルは、モデル化された要件をチェックし、コマンド受信を保存します。導入を保証したり、該当するホスト型チェックの代わりをするものではありません。レポートでは、実行の失敗とメトリックのドリフトが区別されます。必要なラチェットは、選択したポリシーに従ってブロックされたままになります。合格結果を得るためだけにベースラインを上げないでください。

## 夜間および手動のスイープ

夜間リリースおよび互換性リゾルバーは、正規リリース ブランチを選択します。その選択はワークフローをトリガーしたブランチと一致する必要があり、スイートはイベントの不変SHAを使用します。手動で実行する場合は、 `RELEASE_BRANCH`で目的のリリースを選択し、同じ参照でディスパッチします。

```bash
gh workflow run nightly-release-green.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
gh workflow run nightly-compat.yml --ref "$RELEASE_BRANCH" -f branch="$RELEASE_BRANCH"
```

選択したコードを実行する前に、ブランチ間のディスパッチは拒否されます。ホストされたメイン スイートは`main`をチェックアウトし、インストール前にそのSHA解決されたターゲットとまだ一致していることを確認します。メインが解決中に移動した場合は、新しいコミットで不完全なスイープを再実行します。異なる候補者からのスイートの領収書を結合しないでください。

## 障害のトリアージとリカバリ

インシデントを診断インデックスとして使用し、正確な実行、試行、失敗したステップ、および成果物を検査します。失敗の原因を特定する前に、同等の基本証拠と候補証拠を比較します。インフラストラクチャのエラー、継承された欠陥、候補者のリグレッション、および保留中の承認には、さまざまな救済策が必要です。

`/green-prs`、 `/sweep-reds`、 `/validate-release-green`および`/babysit`スキルは証拠を収集し、文書化された範囲内で修正を準備します。貢献者のクレジットを保持し、分離された修復ブランチを使用し、認可されたマージの前に必要なチェックをすべて検証します。合格した現在の候補に代わる自動リベースラインやインシデント クロージャはありません。
