# Merge Queue & Manual Merge-Train Runbook (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## リリースブランチに着地する

オムニキューは、 `release/vX.Y.Z`への着陸を制御します。 PRをランディングする前に、デフォルト ブランチの`config/merge-queue/config.json`内のトップレベル`mode`読み取ります。[オムニキュー を](OMNI_QUEUE.md)参照してください。

- **`shadow`**検証を実行し、着陸を手動マージに任せます。承認されたPRの最終先頭に`omni-queue`を適用します。 `npm run queue -- why <PR>`で適格性を確認します。 `npm run queue -- history --base <branch>`でそのヘッドに対する評決を待ちます。 `would-land`に進みます。 `culprit-found`または`would-dequeue`で、マージを保留し、原因を修正します。
- **シャドウの例外。**現在のベースチップに対して緑色の完全なCIを持つトレインは、別のキューの判定なしで続行できます。同じ例外が、 PRヘッドに現在のベース チップがすでに含まれている場合にも適用されます。
- **`live`** `omni-queue`ラベルを使用して着陸をトリガーします。キューだけでPRが到着します。マージ コマンドと直接プッシュをキューに残します。

すべての着陸には所有者の許可と該当する必要なチェックが必要です。 `omni-queue` 、所有者が着陸を許可した後にのみ適用してください。キューに入れられたPRsが保護されたパスに触れるには、そのPRに対する所有者の`protected-approved`の決定も必要です。

「アクティブなリリースに緑色のゲートが必要」ルールセットでは、先頭に緑色の`Gate / CI`および`Gate / Quality`必要です。赤いゲートをバイパスするために`--admin`使用しないでください。解放されたフリーズ ブロックは、フリーズされたブランチにマージされます。[厳格な規則 21](HARD_RULES_DETAIL.md)を参照してください。別のセッションが動作しているというラベルを付けたり、プル リクエストにマージしたり、プル リクエストにプッシュしたりしないでください。[厳格な規則 22](HARD_RULES_DETAIL.md)を参照してください。

## トレインプルリクエスト

1. 現在のリリースのベース チップでトレイン ブランチを開始します。マージコミットを使用して、正確に承認されたメンバーヘッドを統合します。スカッシュやリベースを避けてコミット履歴を保存します。
2. トレイン ブランチのプル リクエストを 1 つ開きます。現在のベース チップ上の独自の完全なCIを使用して、そのPRを検証します。着陸前にベースの先端と承認されたメンバーヘッドを再確認してください。検証された候補が変更された場合は、トレインとそのCIを更新します。
3. 該当するキュー モードでマージ コミットを使用してトレインPRを着陸させます。ライブ モードでは、キューの`merge-ff`ランディング メソッドによってマージ コミットが保存されます。元のメンバーのヘッドには、リリース ブランチからアクセスできるようになります。 GitHubメンバーPRsマージ済みとしてマークし、コミットは作成者を保持します。

公開されている例は[PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071)です。 18 メンバーのPRsを結合し、2026 年 11 月 24 日にマージ コミットで着陸しました。

`main`から次のリリース ブランチへの同期バックも、マージ コミットを通じて行われます。 `main`祖先を保持することは、後の同期バックのために必要です。 [「ワークツリーの分離」を](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash)参照してください。

## ローカルのマージトレインバリデーター

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

バリデーターはベースとPRヘッドをフェッチし、それらを使い捨てのワークツリーに結合します。結果のツリー上でパリティ スイートを 1 回実行します。ヘッドのフェッチまたはマージの競合が失敗すると、そのPRが排除され、スクリプトは残りのPRsで続行されます。

- **`--plan`**選択したモードのステップを出力し、ワークツリーを作成したり、リモートに接続したりせずに終了します。 `--fast`と組み合わせて高速プランを検査します。
- **`--fast`**共通の静的ゲート、 `tests/unit/`および`npm run test:vitest`の下で選択された変更された`node:test`ファイルを実行します。高速モードを使用している場合は、蓄積されたチップに対して少なくとも 1 日に 1 回完全なローカル検証を実行します。
- **フルモード**完全専用の静的ゲートを追加し、 `npm run test:unit`および`npm run test:vitest`を実行します。

ベース プローブが使用可能な場合、失敗したスタティック ゲートは未タッチのベースで再実行されます。スクリプトは継承されたエラーを報告し、認識されたすべての違反行がベースにも表示され、合計数が増加していない場合に継続します。

| 出口 | 意味                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `0`  | 計画を印刷するか、スイートを完成させます。スイートの概要には、継承された静的エラーと排出されたPRsがリストされます。                  |
| `1`  | 引数が無効です、Git チェックアウトがありません、プリフライトが失敗しました、またはPRボードされていません。                           |
| `2`  | スイートのチェックが失敗し、継承として認定されませんでした。オペレーターはバッチを二分し、問題のあるPRを取り出して、再実行できます。 |

ローカル パスは、所有者の書類のみの診断証拠を提供します。各着陸には、所有者の承認、独自の必要なチェック、および該当する場合はシャドウ キューの判定が必要です。

## 階層化

- **PRごとに。** CIおよび品質選択は、変更されたパスに基づいてチェックします。コードPRs 、 CIの個別のユニット ジョブとVitestジョブを使用して、高速品質のゲートと影響を受けるテストを実行します。
- **キュー候補ごと。** CIと Quality は、キュー参照で構成された候補の完全なプロファイルを実行します。
- **リリースチップごと。** Release-Green は、パス フィルターに一致するプッシュに対して迅速なハード ゲートを実行します。 1 日あたり 3 回のスケジュールされた実行では、リリース ブランチの完全なスイープが使用されます。
- **リリースごと。**完全なCIマトリックスには、 E2Eシャード、パッケージ検証、tarball ブート スモーク、およびカバレッジ チェックが含まれています。 「[リリース チェックリスト」](RELEASE_CHECKLIST.md)を参照してください。

## `merge-train.sh`のフレッシュチェックアウトの前提条件

プリフライトは、ワークツリーを作成する前に実行されます。 `npm ci`を使用して依存関係をインストールします。 `node_modules/.bin/tsc`が実行可能であり、 `node_modules/node_modules`が存在しないことを確認します。 `node_modules/.bin/bun --version`成功することを確認します。

Bunポストインストールがスキップされた場合は、 `(cd node_modules/bun && node install.js)`を実行します。プロバイダーの整合性と既知のシンボルのチェックではBunを使用します。バリデーターは、 `npm run check:cycles:ratchet`ブロッキング ゲートとして実行します。スタンドアロンの`npm run check:cycles`コマンドは推奨です。

## 歴史

Mergify マージ キューは 2026 年 11 月 19 日に廃止されました。
