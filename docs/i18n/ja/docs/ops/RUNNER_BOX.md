# Self-Hosted Runner Box Operations (.113 pool) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

セルフホストプールは **.113** マシン（`tomni-proxmox-113`）で稼働しています。2026-10-18 以降、各
OmniRoute ランナーには **1 つの役割** と 1 つのラベルが割り当てられ、メモリ/CPU 予算は測定されたワークロードに
合わせて設定されています。Turbopack スロットにはビルドに必要なリソースを割り当て、その他のスロットは
測定されたピーク値に合わせてサイジングされています。マシンがオーバーコミット状態になるのは、Turbopack ビルド、
Release-Green webpack ビルド、lint ジョブが同時に実行された場合のみです。その場合はホストのスワップ（16 GB）が
不足分を吸収します。また、プルリクエストの Builds はホステッドランナーで実行されるため、Turbopack スロットは
ほとんどの時間アイドル状態です。

| ランナー             | ラベル           | 役割                                                                                                                                                  | `MemoryHigh` / `MemoryMax`     | `CPUQuota` |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------- |
| `omniroute-113-5`    | `omni-build`     | Turbopack ビルド：`ci.yml` の `Build`（push/dispatch のみ）、Docker amd64、`npm-publish`、`nightly-v4-build`、`preview-artifact`、nightly a11y ビルド | 56 GB / 60 GB（スワップ 0）    | 1600 %     |
| `omniroute-113-6`    | `omni-release`   | Release-Green（`release-green` + `main-green`）、webpack ビルド                                                                                       | 20 GB / 24 GB（スワップ 4 GB） | 800 %      |
| `omniroute-113-2`    | `omni-light`     | nightly ジョブ（Schemathesis、promptfoo、garak、k6）および `quality.yml` の `lint-guard`                                                              | 12 GB / 16 GB（スワップ 4 GB） | 600 %      |
| `omniroute-113`      | `omni-light`     | 上記と同じプール                                                                                                                                      | 8 GB / 12 GB                   | 400 %      |
| OmniHeuris, OmniMind | （各リポジトリ） | Dependabot のみ（各ランナーのピークは 155 MB、2026-10-18）                                                                                            | 4 GB / 6 GB                    | 各 200 %   |

2026-10-18 測定：

| リソース  | 値                           | スケジューリング上の意味                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 コア**          | Turbopack の本番ビルドは、上限なしで 49 GB に達しました（`tests/unit/ci-build-bundler-webpack.test.ts`）。Next 16.3.8 では、コンパイルフェーズだけで約 40 GB を常時使用します（`next-build` の RSS 36 GB に加え、17 個の loader worker が各 3 GB。2026-10-18 測定）。webpack ビルドは約 14～16 GB です。Turbopack ビルド 1 件と webpack ビルド 1 件は同時に収まりますが、Turbopack ビルド 2 件は収まりません |
| スワップ  | 16 GB                        | `omniroute-113-5` はスワップを無効にして実行されるため（`MemorySwapMax=0`）、暴走したビルドはマシンをスワップ状態に陥らせる代わりに、設定された上限で強制終了されます                                                                                                                                                                                                                                        |
| `/tmp`    | **12 GB tmpfs = RAM**        | ここに置かれたものはすべてメモリを消費します。残存ファイルは 3 時間後に削除されます                                                                                                                                                                                                                                                                                                                          |
| CPU       | 32 コアで load 60 を観測     | クォータ導入前は、1 件の Turbopack ビルド（CPU 約 1166 %）とカバレッジスイートを同じマシンで実行すると、他のリスナーのハートビートがリソース不足に陥っていました（`The self-hosted runner lost communication`、#16853）                                                                                                                                                                                      |
| ランナー  | **7 リスナー**（2026-10-28） | OmniRoute 5 台 + OmniHeuris + OmniMind。`omniroute-113-7` は `omni-build` も兼務しています。`omniroute-113-3/-4/-8` はリポジトリから削除されました（2026-10-28）                                                                                                                                                                                                                                             |

制限値は各ユニットの `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
に保存されています（以前の値は `override.conf.bak-20261018` として保持）。これらは
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` を使用して稼働中に適用されました。再起動は行っていないため、
実行中のジョブには影響していません。ラベルも runners API
（`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`）を通じて、稼働中に変更されています。

## janitor のインストール（初回のみ、対象マシン上で実施）

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron（root）：30 分ごとに実行し、/var/log/runner-janitor.log に記録
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` は必須です。janitor はパスを削除する前に、開いているファイルの単一スナップショットを使って、そのパスがアイドル状態であることを確認します。このツールがなければ何も削除せず、その旨を通知します（exit 1）。変更は必ず最初に `--dry-run` で試してください。実行する内容を正確に表示し、何も変更しません。

各実行時の処理：独自の残留物（`runner-*`、`omniroute-*`、`next-build*`、
`e2e-build.tar.gz`）を、**tmpfs 上では 3 時間後**、ディスク上の
`_work/_temp` では 24 時間後に削除します。75 分を超えた `next-build` を終了します（これほど長く実行されるジョブはありません。2026-08-27 には、GitHub がジョブを消失したと判定した後も、あるジョブが 70 分間実行され続けました）。ユニットが**停止中**の runner について、48 時間以上経過した checkout を削除します。ディスク使用率が 85 % 以上、メモリ PSI の
`full/avg60` が 10 % 以上、または listener 数が `MAX_ACTIVE_RUNNERS` を超えた場合に警告します（omniroute/other の内訳も表示します）。exit 1 = 対応が必要です。ログを確認してください。

75 分ルールでは、GitHub がすでに断念したジョブの build を検出できません。
`Runner.Listener` がジョブを更新できない場合、`_diag/Runner_*.log` には
`POST request to …/renewjob timed out after 100 seconds` と表示されます。API は最後に正常更新されてから約 10 分後にジョブを `completed`
（failure）として報告しますが、`next-build` はジョブが紐付いていないまま実行され続けます
（2026-10-18：#17066 の Build は 19:43 に failed となりましたが、その build は 5 分後も
40 GB を占有していました）。最新の `_diag/Worker_*.log` で ref を確認してから、
PID を指定し、build のプロセスツリーのみを SIGTERM で終了してください。対象は `next-build`、`npm run build`、`build-next-isolated.mjs`、
および `_work` の worker です。`Runner.Listener`、`RunnerService.js`、`Runner.Worker` には決して手を触れないでください。
worker がジョブを cancelled として報告し、listener は自動的にオンラインへ復帰します。

## Runner ユニット：KillMode

runner のデフォルトである `KillMode=process` では、ユニットを停止または再起動しても
`Runner.Worker → npm → next-build` が動作し続けます。孤立した build が、ジョブが紐付いていないまま RAM と
CPU を消費し続けます。すべての OmniRoute ユニットには、
`KillMode=mixed` を設定する drop-in
（`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`）
があります。まず listener に SIGTERM を送り、`TimeoutStop` の時点で cgroup 全体に
SIGKILL を送ります。この設定は、ユニットの次回再起動時に有効になります。**一度に 1 つの runner のみを、アイドル時に限って**再起動し、アイドル確認と再起動を同じコマンド内で実行してください。

## 運用ルール

- **Turbopack ビルドは一度に 1 つのみ — ラベルで強制。** 完全な Turbopack
  `next build` を実行するすべてのジョブは `[self-hosted, omni-build]` を対象とし、その
  ラベルを持つのは **`omniroute-113-5`** のみです: `ci.yml` の `Build`、`npm-publish.yml` の `publish`、`nightly-v4-build`、`preview-artifact`、
  nightly a11y ビルド（#16853）、および `docker-publish.yml` の **amd64**（BuildKit 内では webpack —
  Turbopack はそこでパニックしました。実行 33253576569）。arm64 Docker の処理は引き続き `ubuntu-24.04-arm` で実行します。
  `docker-publish` の amd64 は、`ci.yml` の `Build` と `heavy-build-main` concurrency group を共有します
  （`cancel-in-progress: false`）。Docker Engine は `omniroute-113-5` 上に存在する必要があります。2 つ目の Turbopack
  スロットは 78 GB には収まりません（33～37 GB × 2 に加えて、マシンの残りの処理があるため）。2 つ目のスロットが安全なのは
  webpack ビルドの場合のみです。
- **プルリクエストのビルドはホストランナーで実行（2026-10-18）。** `ci.yml` の `Build` が `omni-build` に到達するのは
  `push` と `workflow_dispatch` の場合のみです。すべての `pull_request`（同一オリジンまたはフォーク）と `merge_group` の Build
  は、webpack を使用して `ubuntu-latest` 上で実行されます。同一オリジンのすべての PR をこのスロットにルーティングしていたときは、Turbopack
  Build がスロットを 29～58 分間占有し、18 件の Build が最大 18 時間キューで待機し、リリースライン自体の push Build が
  40 ジョブ中でスロットを獲得できたのは 1 回だけでした。ホストランナーでは、同じ PR Build がその PR の他の
  ジョブと並行して 8～12 分で完了します。`npm-publish` が配布するバンドラーである Turbopack は、デフォルトブランチの
  nightly a11y ビルド（04:41 UTC）、スロットに到達するすべての push または dispatch Build、
  および `npm-publish` 自体によって、リリースライン上で引き続き検証されます。`tests/unit/build/heavy-build-queue.test.ts`
  がこの 4 条件のゲートを固定します。
- **Turbopack スロットを、測定された必要量より小さくしてはなりません。** 2026-10-18 の 18:06 に、
  `omni-release` のための余地を確保する目的で、スロットを 56G/60G から 40G/44G に引き下げました。コンパイルフェーズは
  実行中ずっと `MemoryHigh` に張り付き（memory PSI `full` は 30～43 %）、同じ
  cgroup を共有する `Runner.Listener` はジョブを更新できませんでした。2026-10-17 に所有者が設定した 56G/60G は
  同日中に復元されました。この値を下回ってもビルドは失敗しません。スラッシングが発生し、ジョブが失われます。
- **Release-Green には専用スロットがあります（2026-10-18）。** それまでは、両方の Release-Green 検証が
  `omni-build` 上で実行されていました。すべての push（約 10 回/時、1 日で 100 回の push 実行のうち 97 回が処理途中でキャンセル）と、
  1 日 3 回の約 2 時間のフルスイープ（05:29 のスイープはスロットを 6 時間待機）により、単一のビルド
  スロットは許容量を何倍も超えて利用され、同一オリジンの PR Build は何時間も待機していました。
  `release-green` と `main-green` は現在、`OMNIROUTE_USE_TURBOPACK=0` を設定して
  `omni-release`（`omniroute-113-6` のみ）を対象としています。また、開始済みの実行が新しい push によってキャンセルされることはなくなりました
  （保留中のスロットについては、引き続き大量発生した実行が集約されます）。`tests/unit/build/runner-capacity-routing.test.ts`
  がルーティング、webpack への切り替え、および `omni-release` 上では何も Turbopack でビルドされないことを固定します。
- **軽量プール: `omni-light`。** `omniroute-113` と `omniroute-113-2` は、
  バックエンド専用の `next build`（約 5～6 GB、webpack）が必要な nightly と、`quality.yml` の `lint-guard` を実行します。`omniroute-113`
  では 2026-10-18 まで `MemoryHigh=4G` でした。そのため、promptfoo ビルドは 54 分間、メモリを回収しながら
  何とか処理を進めていました。8 GB にすることでスロットリングが解消されます。
- **リスナー数を意図的に削減。** 2026-08-29 に 4 つの OmniRoute ユニットを無効化しました。追加の
  リスナーはそれぞれ、上記のメモリ予算を消費する新たなテナントになります。janitor の上限は 8 です（cron の `MAX_ACTIVE_RUNNERS=8`）。これは
  マシン上のすべての `Runner.Listener` をカウントし、OmniHeuris と OmniMind が、こちらの 5 つに加えて 2 つを使用します。
- **Unit と Vitest のジョブはホステッドのままです。** `ci.yml` が unit シャードと Vitest ジョブを `[self-hosted, omni-ci]` に送るのは、リポジトリ変数 `vars.USE_VPS_TEST_RUNNER` が `true` の場合だけで、しかも同一リポジトリからの `pull_request` 実行に限られます。フォーク、`merge_group`、push は `ubuntu-latest` のままです（`tests/unit/vps-runner-variable-scope.test.ts`）。この変数は `false` です。2026-10-28 には、4 コアの `omni-ci` リスナー 3 台で `npm ci` に 250–270 秒かかり、すべての unit シャードが 30 分のジョブ上限に達しました。ホステッドのシャードは約 634 秒で、マシンの負荷は 17–24 でした。これらのリスナーは削除されました。unit シャードに見合ったサイズのリスナーを用意せずに、この変数を再び有効にしないでください。
- **いずれかのランナーが稼働中の場合、`/tmp` または `_work` を手動でクリーンアップしてはなりません。**
  チェックと削除の間に間隔がある処理によって、2026-08-27 に稼働中の Build ジョブの
  `_work` が失われました。janitor はチェックと削除を 1 ステップで実行します。
  そのまま janitor に任せてください。
- ジョブの途中でランナーを停止すると、そのジョブはキャンセルされます（実環境で確認済み）。`systemctl stop` は、
  リスナーに `Runner.Worker` 子プロセスがない場合に限り、かつ 1 つのコマンドで実行してください。
- ワークフローはアーティファクトを `/tmp` に置いたままにしてはなりません（ここは RAM です）。
  `$RUNNER_TEMP`（ランナーごとのディスク上の領域）にダウンロードしてください。1.3 GB の `next-build` アーティファクトを
  tmpfs に保存するには 27～32 分かかりましたが、ディスクからのアップロードは 2 分でした。
- `.15` VPS は homologation 専用です。CI ランナーを実行してはなりません。

## ホステッドレーン（GitHub ホステッドランナー）

このリポジトリは `cheaper-inference` Organization に属し、**Team** プランを利用しており、**同時実行可能なホステッドジョブは 60 件**です。この上限は、Organization 内のすべてのリポジトリ、すべての PR チェック、push によってトリガーされるすべてのワークフロー、および CodeQL のデフォルトセットアップで共有されます。以下の数値は **Pro** プラン（同時実行可能なホステッドジョブ 40 件）で計測したものです。2026-10-18 に、`release/v3.8.52` でのマージキャンペーン（約 10 マージ/時間）中に計測したところ、**24 時間で 2,500 件のワークフロー実行が作成**され、6 時間でブランチへの push が 44 回発生し、PR チェックが数時間待機する間に **106 件のホステッドジョブがキューに滞留**し、チェックなしで PR がマージされました。ブランチへの push ごとに、次の 9 つのワークフローが起動していました。

| `release/v*` への push ごと                 | ホステッドジョブ | 集中発生時の結果                                                       | 2026-10-18 以降                                                                   |
| ------------------------------------------- | ---------------: | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `ci.yml`（フルマトリックス）                |          最大 30 | 次の push によりキャンセル、1 日で 24 件中 24 件                       | `release/**` への push では起動しない（PR 実行 + Release-Green）                  |
| `quality.yml`                               |               ~6 | キャンセル、23 件中 23 件                                              | `release/**` への push では起動しない                                             |
| `Release-Green` `--quick`                   |                0 | `omni-build` で実行、100 件中 97 件がキャンセル                        | `omni-release` スロットを使用し、キャンセルせず、保留中の実行を集約               |
| `Lock released branch`、`OpenSSF Scorecard` |                2 | push ごとに 1 件の実行がキューに追加                                   | ref ごとに 1 件の実行（`tests/unit/build/hosted-lane-concurrency.test.ts`）       |
| `Release acceptance`（シャドーレポート）    |                1 | push ごとにホステッド環境で `npm ci` を 1 回実行し、キャンセルされない | 変更なし — `paths:` フィルターの候補                                              |
| `Publish to Docker Hub` → `Deploy to VPS`   |                2 | push ごとにキャンセルされ、amd64 レッグが `omni-build` で競合          | 変更なし — オーナーのデプロイチャネル                                             |
| CodeQL デフォルトセットアップ（`dynamic`）  |                4 | push ごとに `javascript-typescript`、`actions`、`c-cpp`、`python`      | 変更なし — Settings → Code security。ここでは `c-cpp`/`python` のスキャン対象なし |

`tests/unit/build/push-storm-diet.test.ts` は、`ci.yml` と `quality.yml` の push トリガーが `main` のみに限定されていることを固定します。副作用として、Codecov は release への push ごとのベースアップロードを受信しなくなります（このステップは情報提供用であり、`continue-on-error` が設定されています）。リポジトリ内のカバレッジゲートと PR コメントには影響しません。

**セルフホステッドのキャパシティを増やしても、ホステッドキューは解消されません。** devbox（`devbox-vm-06-dev002`、24 vCPU / 54 GB）でランナーをホストすることは可能ですが、エージェントセッションによってすでに負荷が 20～26 に達しており、エージェントコンテナには Docker デーモンがなく、飽和しているのはホステッド側のレーンです。同じ時点で `.113` ボックスには 71 GB の空き容量があり、負荷は 5～8 でした。このボックスの制約は CPU ではなく、上記のリスナーあたりのメモリ予算（上限 6 リスナー）です。残る対策はプロセス面にあります。キャンペーン PR は Mergify キュー（`label=queue`）を通じてマージし、PR ごとに 1 回、さらに push ごとに 1 回実行する代わりに、バッチで 1 回の `merge_group` CI 実行を共有します。また、CodeQL デフォルトセットアップの言語を絞り込み、`release-acceptance.yml` が読み取るファイルに基づいてフィルターを設定します。
