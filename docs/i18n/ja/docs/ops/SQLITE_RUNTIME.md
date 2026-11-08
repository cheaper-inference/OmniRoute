# SQLite Runtime Resolution (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute は起動時に、5 段階のフォールバックチェーンを通じて SQLite ドライバーを解決します。

1. **同梱の `better-sqlite3`**（`package.json` の `dependencies` 経由）
   — 最も高速なネイティブバイナリで、ビルドツールが存在する場合に `npm install` によってインストールされます。

2. **実行時にインストールされる `better-sqlite3`**（`~/.omniroute/runtime/` 内）
   — 初回実行時に遅延インストールされるか、**または** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` によってインストールされます。
   読み込む前にネイティブ `.node` のマジックバイト（ELF / Mach-O / PE）を検証し、
   破損したバイナリや対象プラットフォームが異なるバイナリから保護します。

3. **`node:sqlite`**（Node ≥22.5 の標準ライブラリ）— ネイティブビルドは不要です。
   両方の better-sqlite3 パスが失敗した場合に使用されます。機能セットは限定的です。

4. **`sql.js`**（WASM）— 最後のフォールバックです。あらゆる環境で動作しますが、低速であり、
   データは同期的にではなく一定間隔で書き込まれます。

## なぜこれほど複雑なのか？

- **Windows EBUSY**：実行中のプロセスによって以前のバージョンの
  `better_sqlite3.node` がロックされている場合、`npm install -g omniroute@latest` が失敗することがあります。
  `~/.omniroute/runtime/` への実行時インストールにより、グローバル npm キャッシュを迂回できます。
- **ビルドツールがない環境**：一部の環境（VS Build Tools がない企業向け Windows 環境、
  最小構成の Docker イメージ）では、`better-sqlite3` をコンパイルできません。実行時
  インストーラーは npm レジストリからビルド済みバイナリを解決します。これに失敗した場合でも、
  フォールバックドライバーによって OmniRoute を起動できます。
- **エアギャップ環境**：npm レジストリに到達できない場合でも、`node:sqlite`
  または `sql.js` によって基本機能が保証されます。

## マジックバイトの検証

実行時にインストールされた `.node` ファイルを読み込む前に、OmniRoute は先頭 8
バイトを読み取り、既知のプラットフォーム固有マジックと照合します。

| プラットフォーム          | バイト（16 進数） | ラベル      |
| ------------------------- | ----------------- | ----------- |
| Linux                     | `7F 45 4C 46`     | `elf`       |
| macOS 64 ビット BE        | `FE ED FA CF`     | `macho`     |
| macOS 64 ビット LE        | `CF FA ED FE`     | `macho-le`  |
| macOS fat（ユニバーサル） | `CA FE BA BE`     | `macho-fat` |
| Windows                   | `4D 5A` (MZ)      | `pe`        |

マジックが一致しない場合 → ファイルは無視され、次のステップへフォールバックが続行されます。

## 使用中のドライバーの確認

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## 手動制御

```bash
# 高速な CI インストールのため、postinstall のウォームアップをスキップ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# 実行時の better-sqlite3 を強制的に再インストール
rm -rf ~/.omniroute/runtime
omniroute  # 次回起動時に再インストールされる

# 使用中のドライバーを確認
omniroute config db-info  # （CLI コマンドが存在する場合）
```

## 同期処理の停止状態を診断する

`better-sqlite3` では、起動前に `OMNIROUTE_SQLITE_SLOW_MS=200` を設定すると、
同期アダプターの計測を明示的に有効化できます。デフォルトでは無効です。完了した処理に
指定されたミリ秒以上かかった場合、アダプターごとに 10 秒あたり最大 1 回、
`[SQLITE-SLOW]` 警告が出力されます。この警告に含まれるのは、ドライバー、処理クラス
（`prepare`、`get`、`all`、`run`、`exec`、`pragma`、トランザクション、またはメンテナンス）、
および経過ミリ秒だけです。SQL、バインディング、行、パス、例外テキストは含まれません。

これは診断補助機能であり、タイムアウトやクエリ最適化ではありません。戻ることのない
処理を報告したり、CPU 処理とディスク待機を区別したり、正確な SQL を特定したり、
生のドライバーハンドルを通じて実行された処理を監視したりすることはできません。
非同期バックアップの所要時間は意図的に除外されています。他の SQLite ドライバーは、
この明示的に有効化する計測の対象ではありません。変数を無効にすると、タイミングラッパーのない
元のアダプターに戻ります。データベーススキーマや保存済み設定は変更されません。

`/healthz` の遅延警告は、全期間の平均ではなく、前回のサンプル以降における
イベントループのピーク値を報告します。停止状態の原因を SQLite またはディスク障害と判断する前に、
そのタイムスタンプを低速処理の警告およびホスト／ストレージのメトリクスと照合してください。

## リファレンス

実装：

- `bin/cli/runtime/magicBytes.mjs` — バイナリのマジックバイト検証ヘルパー
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 段階の実行時リゾルバーと遅延インストーラー
- `bin/cli/runtime/index.mjs` — 起動オーケストレーター（`warmUpRuntimes()`）
- `scripts/postinstall.mjs` — npm のインストール後フック（非致命的なウォームアップ）
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` のエクスポート

## シングルライター構成（HA 非対応）

上記のドライバーフォールバックチェーンは、引き続き **1 つのプロセス**内で実行されます。
デフォルトの SQLite を使用する OmniRoute は**シングルライター**です。

- 2 つの OmniRoute レプリカを同じ `storage.sqlite` ファイルに接続しないでください。
- コンテナの再起動、Recreate デプロイ、OOM kill、または HEALTHCHECK による再起動が発生すると、
  処理中のすべての SSE セッションが切断されます。標準構成にはセッションのドレイン機能がありません。
- 低速な `/healthz` を異常とみなすオーケストレーターの liveness チェックは、唯一の
  レプリカを終了させます。TCP liveness と HTTP `/healthz` readiness の組み合わせを推奨します。
  [Docker ガイド — 可用性](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  および [Kubernetes プローブの推奨事項](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)を参照してください。
