# 🐳 Docker Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker デプロイの完全なリファレンスです。すぐに始める場合は、[README の Docker セクション](../README.md#-docker)を参照してください。

## 目次

- [クイック実行](#quick-run)
- [環境ファイルを使用する](#with-environment-file)
- [Docker Compose](#docker-compose)
- [利用可能なプロファイル](#available-profiles)
- [OmniRoute を Docker で実行する場合のホスト CLI ツールの設定](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis サイドカー](#redis-sidecar)
- [本番環境向け Compose](#production-compose)
- [Dockerfile のステージ](#dockerfile-stages)
- [重要な環境変数](#critical-environment-variables)
- [Caddy（HTTPS）を使用する Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [イメージタグ](#image-tags)
- [Docker でのダッシュボード更新](#dashboard-updates-in-docker)
- [可用性：デフォルトの SQLite は単一レプリカ](#availability-default-sqlite-is-single-replica)
- [Docker 内での Gemini のリージョンエラー](#gemini-regional-errors-inside-docker)
- [重要な注意事項](#important-notes)

---

## クイック実行

> **1 つのコマンドでセルフホストしますか？**  
> [セルフホストガイド](../getting-started/SELF_HOST_GUIDE.md)を参照してください —
> `docker compose -f docker-compose.selfhost.yml up -d`（公開済みイメージ +
> Redis、ループバックのみに限定、プロファイル選択なし）。以下のクイック実行は、
> すでに別の場所で Redis を実行しているユーザー向けの単一コンテナ方式です。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 環境ファイルを使用する

```bash
# 最初に .env をコピーして編集します
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# ベースプロファイル（CLI ツールなし）
docker compose --profile base up -d

# CLI プロファイル（Claude Code、Codex、OpenClaw を内蔵）
docker compose --profile cli up -d

# ホストプロファイル（主に Linux 向け。ホストの CLI バイナリを読み取り専用でマウント）
docker compose --profile host up -d

# Web プロファイル（Web セッションプロバイダー向けの Chromium/Playwright）
docker compose --profile web up -d

# CLI + CLIProxyAPI サイドカーを組み合わせる
docker compose --profile cli --profile cliproxyapi up -d
```

## 利用可能なプロファイル

OmniRoute には、主要なデプロイ構成向けの Compose プロファイルが用意されています。環境に合うものを選択してください。

| プロファイル         | サービス         | 使用する場合                                                                                                                                   | コマンド                                     |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`（デフォルト） | `omniroute-base` | ヘッドレスサーバー／最小限のランタイム。プロバイダー CLI はバンドルされません                                                                  | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | `omniroute providers/setup/doctor` およびバンドル済み CLI（Codex、Claude Code、Droid、OpenClaw）を呼び出すエージェント型ワークフロー           | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | `~/.local/bin`、`~/.codex`、`~/.claude` などを読み取り専用でマウントし、ホスト CLI への `network_mode` に似たアクセスを必要とする Linux ホスト | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | アップストリーム CLI プロキシ用に、ポート `8317` で [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) サイドカーを実行する           | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | ブラウザーを必要とする Web セッションプロバイダー：`gemini-web`、`claude-web`、`claude-turnstile`（`runner-web` をビルド、Chromium を含む）    | `docker compose --profile web up -d`         |

> 複数のプロファイルを組み合わせることができます：`docker compose --profile cli --profile cliproxyapi up -d`。

## OmniRoute を Docker で実行する場合のホスト CLI ツールの設定

`omniroute setup-codex`、`setup-claude`、`config set <tool>`、およびダッシュボードの
**Save config** ボタンは、いずれも `~/.codex/*.config.toml` のようなファイルを書き込みます。これらのパスが
意味を持つのは、CLI が実際に動作しているマシン上だけです。コンテナ内で実行すると、
書き込み先はコンテナ自身のホーム (`/home/node` —
イメージは `USER node` で実行されます) になります。ホストの CLI がそこを読み取ることはなく、
コンテナが再作成された時点で内容は破棄されます。

OmniRoute はこれを検出し、利用できない成功結果を報告する代わりに、
手順を示して書き込みを拒否します。CLI は `2` で終了し、API は
`containerEphemeralTarget: true` を含む `422` を返します。

### 推奨: CLI はホストで、OmniRoute は Docker で実行する

コンテナは API を提供し、CLI はホスト上のツールを設定します。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI の接続先をコンテナにする
omniroute setup-codex                      # ホスト上の実際の ~/.codex に書き込む
```

Codex、Claude Code、Cursor、または同様のツールをノート PC 上で実行する場合は、
これが適切な選択です。通常はこの構成になります。

### 代替方法: ホストの設定ディレクトリを bind mount する (`host` プロファイル)

コンテナ自体からホストの設定に書き込みたい場合は、それらの
ディレクトリをマウントし、`CLI_CONFIG_HOME` でマウントのルートを指定します。`host` プロファイルでは、
あらかじめ次のように設定されています。

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount によって、そのパスを信頼できるようになります。OmniRoute は
`/proc/self/mountinfo` を読み取り、マウントされたパスへの書き込みを許可します。また、
子ディレクトリがマウントされているディレクトリへの書き込みも許可します。上記の `/host-home` はまさにその構成です。
一方で、マウントされていないパスへの書き込みは引き続き拒否します。

### エスケープハッチ: コンテナ自身の CLI を設定する (使用は最小限に)

CLI が実際にコンテナ内に存在する場合 (`cli` プロファイル) は、書き込みは意図されたものです。
任意の `setup-*` コマンドに `--allow-container-write` を渡すか、サーバーで
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` を設定してください。コンテナが破棄されると
内容が失われるという警告とともに、書き込みが実行されます。

> **セキュリティ警告 — `cli` プロファイル + `docker.sock` マウント。**
> `cli` プロファイルは `/var/run/docker.sock` を bind mount するため、コンテナ内の
> 自動アップデーターはホストのデーモン経由でスタックを再作成できます
> (`src/lib/system/autoUpdate.ts` はそのソケットの存在を確認し、
> 存在しない場合は Docker の処理経路をスキップします)。このソケットは **ホストの root 権限に関わる
> 信頼境界** です。このソケットにアクセスできるものは、すべてホストの Docker デーモンを
> root として操作できます。つまり、ホスト上のあらゆるコンテナを作成、調査、停止、削除できます。
> これに伴う注意事項は次のとおりです。
>
> 1. **`cli` プロファイルのポートをネットワークに公開しないでください。**
>    `127.0.0.1` 上で公開してください (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)。
>    LAN から到達可能な `cli` プロファイルでは、ダッシュボードレベルの任意コード実行が
>    ホスト全体の侵害につながります。
> 2. **`cli` プロファイルに追加のホストディレクトリを bind mount しないでください。**
>    Docker ソケットと追加のマウントを併用すると、コンテナからファイルシステムとホスト設定を
>    完全に読み書きできるようになります。ツールからプロジェクトを参照する必要がある場合は、
>    CLI バイナリを使用してローカルで実行してください。`cli` コンテナには
>    マウントしないでください。
>
> コンテナ内での自動更新が不要な場合は、`cli` プロファイルを無効のままにしてください
> (`COMPOSE_PROFILES=core,redis` または、より短い指定)。他のプロファイルは
> Docker ソケットをマウントしません。
>
> MITM に関連する脅威モデルについては、`docs/security/MITM-TPROXY-DECRYPT.md` (git 上に存在し、`/docs` にはコンパイルされません) を
> 参照してください。また、
> `codex`/`claude-code`/`droid`/`openclaw` バイナリの来歴チェーンについては、
> `docs/security/SUPPLY_CHAIN.md` を参照してください。

## Redis サイドカー

OmniRoute は、分散レートリミッターと共有キャッシュのバックエンドとして Redis を利用します。`redis` サービスは `docker-compose.yml` で**常に定義されており**（プロファイルによる制限はありません）、他のどのプロファイルとも一緒に起動します。

| 詳細                     | 値                                            |
| ------------------------ | --------------------------------------------- |
| イメージ                 | `redis:7-alpine`                              |
| コンテナ名               | `omniroute-redis`                             |
| 内部ポート               | `6379`                                        |
| ホストポート（上書き）   | `REDIS_PORT`（デフォルトは `6379`）           |
| ホストバインド（上書き） | `REDIS_BIND_HOST`（デフォルトは `127.0.0.1`） |
| ボリューム               | `omniroute-redis-data` → `/data`              |
| ヘルスチェック           | `redis-cli ping`（間隔 10 秒）                |

関連する環境変数：

- `REDIS_URL` — アプリに注入される接続文字列（デフォルトは `redis://redis:6379`）。
- `REDIS_PORT` — Redis コンテナのホスト側ポートマッピング。
- `REDIS_BIND_HOST` — ポートを公開するホストインターフェイス。デフォルトは `127.0.0.1`。

> **デフォルトでループバックを使用する理由：** サイドカーは `requirepass` なしで実行され、
> アプリコンテナは Compose ネットワーク経由（`redis:6379`）で接続します。公開ポートは、
> ホスト側のツール（`redis-cli`、ローカルの `npm run dev`）から利用するためだけに存在します。
> `0.0.0.0` で公開すると、認証されていない Redis が LAN 上のすべてのホストに公開されます。
> `REDIS_BIND_HOST=0.0.0.0` を設定する場合は、サービスの `command:` に `--requirepass` も追加してください。

**Redis の無効化**は推奨されません（レートリミッターがインメモリのフォールバックに縮退します）。どうしても必要な場合は、`docker-compose.yml` の `redis:` サービスブロックを削除またはコメントアウトするか、ゼロにスケールしてください：

```bash
docker compose up -d --scale redis=0
```

## 本番環境向け Compose

開発環境と並行して隔離された本番環境スナップショットを実行するには、`docker-compose.prod.yml` を使用します。

| 詳細                             | 値                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| ファイル                         | `docker-compose.prod.yml`                                                             |
| デフォルトのダッシュボードポート | `PROD_DASHBOARD_PORT=20130`（内部の `${DASHBOARD_PORT:-20128}` にマッピング）         |
| デフォルトの API ポート          | `PROD_API_PORT=20131`                                                                 |
| イメージ                         | `omniroute:prod`（`runner-cli` ターゲットからビルド）                                 |
| Redis コンテナ                   | `omniroute-redis-prod`（`redis:8.6.2`、専用の `redis-prod-data` ボリューム）          |
| データボリューム                 | `omniroute-prod-data`（名前付き、再ビルド後も保持）                                   |
| ヘルスチェック                   | `node healthcheck.mjs` + `redis-cli ping`。`depends_on` は Redis の正常性を条件とする |

使用方法：

```bash
# 本番環境スタックをビルドして起動
docker compose -f docker-compose.prod.yml up -d --build

# ログをストリーミング表示
docker compose -f docker-compose.prod.yml logs -f

# 停止して削除（ボリュームは保持）
docker compose -f docker-compose.prod.yml down
```

本番環境スタックは開発環境の Compose と並行して実行されます（コンテナ名、ポート、ボリュームが異なります）。そのため、本番環境を稼働させたまま、ローカルで開発を継続できます。

## Dockerfile のステージ

このリポジトリには、マルチステージ Dockerfile（`Dockerfile`）が含まれています。4 つのステージが公開されているため、用途に適した `target` を選択してください。

| ステージ      | ベースイメージ        | 用途                                                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 依存関係をインストール（`npm ci --legacy-peer-deps`）し、`npm run build` を実行します（デフォルトでは Turbopack — 下記の「ビルド時のリソース」を参照）。                                                                                                                                                                           |
| `runner-base` | `node:26-trixie-slim` | Next.js のスタンドアロン出力を含む本番ランタイムです。**プロバイダーの CLI は同梱されていません。**                                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | `git`、`docker.io`、`docker-compose`、およびグローバル CLI の `@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw` を追加します。**エージェント型ワークフローにはこれを選択してください。**                                                                                                                           |
| `runner-web`  | `runner-base`         | Web セッションプロバイダー `gemini-web`、`claude-web`、`claude-turnstile` 向けに Playwright と Chromium ブラウザー（`--with-deps`）を追加します。**これらのプロバイダーを使用する場合は、これを選択してください** — 通常のイメージでは、これがないとリクエスト時に失敗します（「リリースチャネル」の `-web` に関する注記を参照）。 |

特定のターゲットを手動でビルドするには、次を実行します。

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ビルド時のリソース

3 つのビルド引数で、`builder` ステージのリソース消費量を制御します。これらはビルド時にのみ使用されます —
`OMNIROUTE_MEMORY_MB`（後述）は、これとは別のランタイム設定です。

| ビルド引数                  | デフォルト | 効果                                                                                                                           |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` では webpack を使用してビルドします。ピークメモリは低くなりますが、速度は遅くなります。`1` では Turbopack を有効にします。 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | 起動される `next build` の V8 ヒープ上限（`--max-old-space-size`）です。                                                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` に値を渡します。Next はページデータ収集用に `workers = N - 1` を算出します。                               |

`OMNIROUTE_BUILD_WORKERS` は、大規模なビルダーでは増やすべき設定であり、リソースが制限された環境で `✓ Compiled successfully` の**後に**ビルドが停止する場合に、最初に疑うべき設定でもあります。各ページデータワーカーは個別のプロセスであり、親の `next build` 自体も別プロセスです。実際の VPS での再現（issue #7518）では、各プロセスのピーク RSS が `NODE_OPTIONS` のヒープフラグとは無関係に約 4.5 GB と測定されました（Turbopack は V8 ヒープ外のネイティブ/Rust メモリでコンパイルします）。デフォルト値の `2`（→ 1 ワーカー、合計 2 プロセス）は、公開パイプラインで使用される 16 GB / 4 vCPU の GitHub ホステッドランナーに合わせて設定されています。`8`（→ 7 ワーカー）では、そのランナーはメモリ不足になり、buildkit は `ResourceExhausted: ... cannot allocate memory` でステップを失敗させました。プロセスごとの RSS を推測ではなく直接測定したところ、`3`（→ 2 ワーカー）でも収まりませんでした。`tests/unit/docker-build-memory-budget.test.ts` は、測定値に基づいて計算を行い、いずれかの設定値がランナーの容量を超えると失敗します。

Turbopack は V8 ヒープの**外部**に存在するネイティブ Rust メモリでコンパイルするため、`OMNIROUTE_BUILD_MEMORY_MB` ではその使用量を制限できません。メモリ上限のあるホストでは、ビルドが OOM killer によって SIGKILL されてもエラーテキストはまったく表示されません。単に `Creating an optimized production build` の途中で停止するため、メモリ不足ではなくハングしたように見えます。このため、`npm run dev` / `npm run build` ではコード上のデフォルトが Turbopack であるのに対し、`Dockerfile` では webpack（`OMNIROUTE_USE_TURBOPACK=0`）がデフォルトになっています。ビルド引数なしの単純な `docker build .`（Railway などのワンクリックホストが実行するコマンド）が、メモリ制限のあるビルダー上で何の通知もなく停止してはならないためです。公開イメージでは、`docker-publish.yml` 内ですでに `OMNIROUTE_USE_TURBOPACK=0` を明示的に渡しています。RAM に十分な余裕があるビルダーでは、ビルドを高速化するために Turbopack を有効にできます。

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` が有効になっているため、`next build` は親プロセス**と**ワーカープロセスを実行し、それぞれが個別に `OMNIROUTE_BUILD_MEMORY_MB` に従います。コンテナの上限は、その値の約 1 倍ではなく 2 倍を上回るように設定してください。

このソースツリーでの測定結果（`--target runner-base`、`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| バンドラー | コンテナ上限   | 結果                                    |
| ---------- | -------------- | --------------------------------------- |
| Turbopack  | 8 GiB / 16 GiB | どちらも通知なく OOM により kill された |
| webpack    | 8 GiB          | ビルドワーカーが SIGKILL された         |
| webpack    | 12 GiB         | 成功、ピークは 11.1 GiB                 |

### ランタイムのデフォルト

`runner-base` によってエクスポートされるデフォルト値：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker でのメモリ動作：

- このイメージでは `OMNIROUTE_MEMORY_MB=1024` が設定され、そこから `NODE_OPTIONS=--max-old-space-size=1024` が導出されます。
- 実際のサーバープロセスはスタンドアロンランチャーによって起動されます。このランチャーは `OMNIROUTE_MEMORY_MB` を読み取り、`--max-old-space-size=<OMNIROUTE_MEMORY_MB>` を追加します。
- Node は繰り返し指定された最後の `--max-old-space-size` の値を使用するため、`OMNIROUTE_MEMORY_MB` を設定することで、Docker における実効ヒープ上限を制御できます。
- イメージでは常にこの値が設定されるため、ランチャー独自の RAM 容量に応じたフォールバックは Docker 環境では適用されません。ワークロードに合わせて明示的に引き上げてください（下表を参照）。コーディングエージェントの `/v1/responses` には `2048` でも小さすぎます。

### コーディングエージェント向けの実行時 RAM

Docker のデフォルトである 1 GiB は、ダッシュボードや軽量チャット向けの最低ラインであり、本番環境向けの容量ではありません。長大な `POST /v1/responses` のボディ（数百件のメッセージ、数十個のツール）は、圧縮中に複数のインメモリグラフを保持します。約 3 MiB / 約 750k トークンのリクエストが 2 件重なると、old-space が **12 GiB** でも V8 が異常終了し（`FATAL ERROR: Reached heap limit`）、16 GiB の cgroup でも OOM が発生しています。[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) を参照してください。

**cgroup の `--memory` はヒープより大きく設定してください** — ネイティブバッファ、SQLite、および圧縮処理の中間データは V8 の外部に配置されます。

| ワークロード                                       | `OMNIROUTE_MEMORY_MB`          | コンテナ / cgroup   | 注記                                                                                                            |
| -------------------------------------------------- | ------------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| ダッシュボード、軽量チャット 1 件                  | `1024`（イメージのデフォルト） | ≥2 GiB              |                                                                                                                 |
| コーディングエージェント 1 件（Claude/Codex/Grok） | `8192`                         | ≥10 GiB             | 一般的な単一セッションの `/v1/responses`                                                                        |
| 長大な `/v1/responses` を 2 件同時実行             | `10240`–`12288`                | ≥12–16 GiB          | 約 12 GiB のヒープで V8 の異常終了を確認                                                                        |
| 長大なコンテキストを 3 件以上同時実行              | 1 プロセスでは実行しない       | 直列化 / RAM を増設 | デフォルトでは高負荷リクエストの実行中上限は 1 件です。RAM を増やさずに上限を引き上げると、異常終了が再発します |

ベアメタル上の `omniroute serve` は、`OMNIROUTE_MEMORY_MB` が**未設定**の場合、RAM の約 35%（`[512, 4096]` の範囲に制限）に調整します。Docker では常に `1024` が設定されるため、公式イメージではこの調整処理は実行されません。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 重要な環境変数

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) に記載されているデフォルト設定に加えて、Docker 環境で実行する際は、以下の変数が特に重要です。

| 変数                          | 用途                                                                                                                                                                                                                                                                                                           | デフォルト                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ブリッジの共有シークレット。**本番環境では必須** — 強力なランダム文字列を設定してください。                                                                                                                                                                                                          | 未設定（指定必須）        |
| `REDIS_URL`                   | レートリミッター／キャッシュバックエンドへの接続文字列                                                                                                                                                                                                                                                         | `redis://redis:6379`      |
| `REDIS_PORT`                  | 同梱 Redis コンテナのホスト側ポート                                                                                                                                                                                                                                                                            | `6379`                    |
| `REDIS_BIND_HOST`             | 同梱 Redis ポートの公開先となるホストインターフェース（AUTH を追加しない限りループバック）                                                                                                                                                                                                                     | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 自己更新ワークフロー用に、`cli` プロファイル内の `/workspace/omniroute` へマウントされるホストパス                                                                                                                                                                                                             | `.`（現在のディレクトリ） |
| `OMNIROUTE_MEMORY_MB`         | Docker スタンドアロンサーバーの実行時 Node ヒープ上限。上記のイメージデフォルトを上書きします。コーディングエージェントの場合は `8192` 以上（[実行時 RAM](#runtime-ram-for-coding-agents) を参照）。                                                                                                           | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | ダッシュボード（20128）および API（20129）の公開ポートを上書きします                                                                                                                                                                                                                                           | `20128` / `20129`         |
| `APP_BIND_HOST`               | docker-compose がダッシュボード／API／ライブ WS ポートを公開するホストインターフェース。`REQUIRE_API_KEY=false`（デフォルト）の場合、`0.0.0.0` は匿名の `/v1` プロキシを LAN に公開します。公開範囲を広げるのは、`REQUIRE_API_KEY=true` を設定するか、前段にリバースプロキシを配置する場合のみにしてください。 | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | docker-compose が `cliproxyapi` サイドカーを公開するホストインターフェース。そのデータボリュームにはプロバイダーの認証情報が保存されます。                                                                                                                                                                     | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | ランタイムプラグインスキャナーが読み取りとインストールに使用するディレクトリ。プラグインがバインドマウントされている場合は設定してください。デフォルトは `HOME` に従いますが、イメージによってはエクスポートされていないことがあります。                                                                       | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | アプリがリバースプロキシの背後で公開される場合の URL サブパス（例：`/omniroute`）                                                                                                                                                                                                                              | _（空 = ルート）_         |
| `NEXT_PUBLIC_BASE_URL`        | サブパスを含む公開ブラウザーオリジン（例：`https://host/omniroute`）                                                                                                                                                                                                                                           | 未設定                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` 用のホスト側ダッシュボードポート                                                                                                                                                                                                                                                     | `20130`                   |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` サイドカーのホスト側ポート                                                                                                                                                                                                                                                                       | `8317`                    |

## サブパス上のリバースプロキシ（Traefik / nginx）

Next.js の `basePath` はスタンドアロンバンドルにコンパイルされます。OmniRoute は、ビルド時に組み込まれた値をアプリケーションルートのセンチネルファイルに記録し（`npm run build` の実行中に書き込まれ、`scripts/docker/ensure-docker-base-path.mjs` によって読み込まれます）、コンテナの起動時に `OMNIROUTE_BASE_PATH` と比較します。値が異なり、イメージがドメインルート向けにビルドされている場合、エントリーポイントは `node dev/run-standalone.mjs` が実行される前に、スタンドアロンマニフェスト、埋め込まれた `basePath`/`assetPrefix` リテラル（Next 16 は SSR アセット URL を `assetPrefix` のみから生成するため、パッチャーはサブパスをそこにも反映します）、ビルド時に組み込まれた `/_next/static` アセット URL（クライアント参照マニフェスト、メディアインポート、プリレンダリングされたエラーページ）、およびクライアント側の `process.env` シムを書き換えます。

### Compose によるビルド（推奨）

`.env` に両方の変数を設定し、イメージとランタイムの設定が一致するように再ビルドします。

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` は `OMNIROUTE_BASE_PATH` を Docker のビルド引数およびランタイム環境変数として渡します。

### ビルド済みルートイメージ + ランタイムサブパス

公開されている `diegosouzapw/omniroute:*` イメージは、ドメインルート向けにビルドされています。それでも、ランタイムに `OMNIROUTE_BASE_PATH` を設定できます。コンテナは起動時にバンドルへ一度だけパッチを適用します。対応する公開オリジンも併せて設定してください。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

リバースプロキシは、外部パスを**完全な形のまま**転送するように設定してください（プレフィックスを削除しないでください）。Traefik は `StripPrefix` を使用せずに `PathPrefix(`/omniroute`)` をコンテナへルーティングする必要があります。これにより、Next.js は `/omniroute/...` を受け取り、`/omniroute/_next/...` からアセットを配信します。

Docker ヘルスチェックは、有効な `OMNIROUTE_BASE_PATH` が先頭に付加された軽量な `/healthz` ライフサイクルエンドポイントを検査します。`/api/monitoring/health` は、人による診断やダッシュボードでの診断用として引き続き利用できます。コンテナの HEALTHCHECK をこのエンドポイントへ戻す場合（たとえば、詳細なヘルスチェックを強制する場合）は、`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` を設定してください。このパスは**詳細**チェック（DB + モニタリング概要）です。明示的に再設定する場合、実行頻度の低い Docker の `HEALTHCHECK` には適していますが、Kubernetes の `livenessProbe` 間隔での使用には**適していません**。

オーケストレーター（Kubernetes、Nomad など）の場合：

| プローブ                | 推奨                                                                          | 非推奨                                                   |
| ----------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| Liveness                | HTTP `GET /livez`、またはメインポート（`PORT`、デフォルトは `20128`）への TCP | liveness としての `/api/monitoring/health`               |
| Readiness               | HTTP `GET /healthz`                                                           | イベントループのビジー状態を停止と見なす短いタイムアウト |
| 詳細 / ブラックボックス | `/api/monitoring/health`                                                      | —                                                        |

`/healthz` はプロセスのライフサイクル（`ok` / `starting` / `stopping`）を報告します。`/livez` はプロセスが稼働しているかどうかのみを示します（ハンドラーを実行できる場合は常に 200 を返し、readiness を待機しません）。どちらもリクエスト処理と同じ Node イベントループ上で実行されるため、CPU 負荷の高いカタログ処理や圧縮処理によって応答が遅延する可能性があります。ビジー ≠ 停止です。HTTP プローブがタイムアウトする場合は、TCP liveness を推奨します。プローブに関する完全なガイダンス：
[モニタリングガイド — Kubernetes プローブの推奨事項](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## Caddy を使用した Docker Compose（HTTPS Auto-TLS）

Caddy の自動 SSL プロビジョニングを使用して、OmniRoute を安全に公開できます。ドメインの DNS A レコードがサーバーの IP を指していることを確認してください。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # OAuth コールバック、ダッシュボードのリンク、生成される公開 URL に使用するブラウザー向けオリジン。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # スケジュール済みジョブ／自己フェッチに使用する内部サーバー間 URL。
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy は、アップストリームコンテナ用の標準転送ヘッダーを設定します。OmniRoute は、
OAuth コールバックおよび生成される公開リンクの正規公開オリジンとして
`NEXT_PUBLIC_BASE_URL` を使用します。認証済みのダッシュボード書き込みでは、同一オリジンのリクエストとセッションに紐付けられた CSRF
保護を使用します。明示的な設定ではなく、信頼された転送ヘッダーから OmniRoute に公開オリジンを
導出させたい高度なデプロイメントの場合にのみ、`OMNIROUTE_TRUST_PROXY` を有効にしてください。

## Cloudflare Quick Tunnel

Docker デプロイメント向けのダッシュボードでは、`Dashboard → Endpoints` からワンクリックで **Cloudflare Quick Tunnel** を利用できます。初回の有効化時にのみ、必要に応じて `cloudflared` がダウンロードされ、現在の `/v1` エンドポイントへの一時トンネルが開始されます。生成された `https://*.trycloudflare.com/v1` URL は、通常の公開 URL のすぐ下に表示されます。

エンドポイントのトンネルパネル（Cloudflare、Tailscale、ngrok）は、アクティブなトンネルの状態を変更することなく、`Settings → Appearance` から表示または非表示にできます。

### トンネルに関する注意事項

- Quick Tunnel の URL は一時的なもので、再起動するたびに変更されます。
- OmniRoute またはコンテナの再起動後、Quick Tunnel は自動復元されません。必要に応じて、ダッシュボードから再度有効にしてください。
- マネージドインストールは現在、`x64` / `arm64` 上の Linux、macOS、Windows をサポートしています。
- マネージド Quick Tunnel は、制約のあるコンテナ環境で大量の QUIC UDP バッファー警告が発生するのを避けるため、デフォルトで HTTP/2 トランスポートを使用します。別のトランスポートを使用する場合は、`CLOUDFLARED_PROTOCOL=quic` または `auto` を設定してください。
- Docker イメージにはシステム CA ルートが同梱されており、それらがマネージド `cloudflared` に渡されます。これにより、コンテナ内でトンネルをブートストラップするときの TLS 信頼エラーを回避できます。
- OmniRoute にダウンロードしたバイナリではなく既存のバイナリを使用させる場合は、`CLOUDFLARED_BIN=/absolute/path/to/cloudflared` を設定してください。

## イメージタグ

| イメージ                 | タグ     | サイズ | 説明                                                                      |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | **公開済み**の安定版 SemVer のうち最高のもの（git `main` ではありません） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps ではこの種類のタグに固定してください                               |

マルチプラットフォームマニフェスト：`linux/amd64` + `linux/arm64` ネイティブ（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker は一致するアーキテクチャを自動的に選択します。ARM ホスト上で AMD64 エミュレーションを強制する必要がある場合は、`--platform linux/amd64` を渡してください。

### リリースチャネル

OmniRoute は、安定版リリース、アクティブなリリースブランチのテスト、開発ビルド向けに、それぞれ独立した Docker チャネルを公開しています。

| チャネル                        | ソース                                       | 変更可能性                       | 推奨用途                                                                                                             |
| ------------------------------- | -------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | 署名済み／バージョン管理済みリリース         | 不変                             | 正確なリリースに固定する本番デプロイメント                                                                           |
| `:latest` / `:latest-web`       | **公開済み**の安定版 SemVer のうち最高のもの | 変更可能な安定版ポインター       | SemVer 公開ジョブの**後に**安定版リリースを追跡します。`main` や未リリースの `release/v*` コミットは追跡**しません** |
| `:next` / `:next-web`           | 現在のデフォルト `release/v*` ブランチ       | 変更可能なプレリリースポインター | アクティブなリリースブランチには取り込まれているものの、まだ安定版リリースには含まれていない修正のテスト             |
| `:main` / `:main-web`           | `main` ブランチ                              | 変更可能な開発版ポインター       | 開発および統合テスト専用                                                                                             |

#### Web セッションプロバイダー：`-web` イメージ

上記の各チャネルには、`runner-web` ステージからビルドされた `-web` タグ（`:latest-web`、`:<version>-web`、`:next-web`、`:main-web`）も用意されています。これは同じイメージに Playwright と Chromium ブラウザーを追加したものです。通常のイメージには Chromium が**含まれていません**。`gemini-web`、`claude-web`、`claude-turnstile` には Chromium が必要です。

エラーは起動時ではなく、実際に使用するまで保留されます。これらのプロバイダーはモデル一覧を表示し、ダッシュボード上では接続済みと表示されますが、最初のリクエスト時にのみ次のエラーが発生します。

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

これらのプロバイダーを使用する場合は、現在使用しているチャネルの `-web` タグを取得してください。それ以外の変更は不要です。npm/CLI インストール（Docker イメージを使用しない場合）では、不足する同等の要素はブラウザーのバイナリです。ホスト上で `npx playwright install chromium` を実行してください。

#### プレリリースチャネルの使用

`next` チャネルは、現在のデフォルトの `release/v*` ブランチへプッシュされるたびに再ビルドされ、AMD64 と ARM64 の両方で公開されます。古いメンテナンスブランチがこれを上書きすることはできません。このチャネルでは、次の安定版タグが作成される前に、アクティブなリリースブランチへマージされた修正を含む、pull 可能なイメージが提供されます。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose では、選択したプロファイルで使用されるイメージタグを上書きしてから、サービスを pull して再作成します。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 安全性とロールバック

`next` は変動するプレリリースチャネルです。アクティブなリリースブランチへのプッシュのたびに変更される可能性があり、**本番環境での使用はサポートされていません**。特定のビルドを評価する間は、イメージダイジェストを固定してください。

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

テストする前に、OmniRoute のデータボリュームまたはバインドマウントされたデータディレクトリをバックアップしてください。ロールバックするには、以前使用していた安定版またはダイジェストへ戻し、コンテナを再作成します。

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

リリースブランチのビルドによって `latest` が更新されることはありません。安定版のポインターを更新できるのは、条件を満たす安定版のセマンティックバージョンのみです。`next` イメージでは、リリースイメージの検査と、CRITICAL 脆弱性がある場合にブロックするゲートが維持されます。

**`latest` は git における最新性を保証するものではありません。** `main` またはアクティブな `release/v*` ブランチにマージされた修正は、安定版の SemVer イメージが公開され、公開ジョブによって `:latest` が更新されるまで（その SemVer と同じダイジェストになるまで）、`:latest` には含まれません。GitHub ではすでに修正を確認できるのに `latest` が更新されていないように見える場合は、`:next` を pull してリリースブランチをテストするか、SemVer タグを待ってください。

| 目的                                                     | 使用するもの                                 |
| -------------------------------------------------------- | -------------------------------------------- |
| 変更が発生してはならない GitOps / 本番環境               | `:X.Y.Z`（またはイメージダイジェスト）を固定 |
| 公開された安定版を追跡し、リリースごとの再作成を許容する | `:latest`                                    |
| 未リリースの `release/v*` コミットをテストする           | `:next`（本番環境では使用不可）              |
| `main` をテストする                                      | `:main`（本番環境では使用不可）              |

## Docker でのダッシュボード更新

公開イメージのコンテナは、自分自身を置き換えることができません。OmniRoute がコンテナ内で実行されていること（`.git` チェックアウトではなく、npm インストールでもないこと）を検出すると、ホームダッシュボードの更新バナーには、npm/git の手順の代わりにホストで実行するコマンドとコピーボタンが表示されます。

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

サービス名は `AUTO_UPDATE_SERVICE` から取得されます（デフォルトは `omniroute` で、`docker-compose.selfhost.yml` 内のサービスです）。`pull` で更新されるのは可変タグ（`latest`、`next`）のみです。固定された `:X.Y.Z` タグを使用している場合は、先にタグを編集してください。

### ホストのトリガーファイルによるワンクリック更新

`/var/run/docker.sock` をマウントせずに **Update Now** を機能させ続けるには（これをマウントすると、コンテナにホスト上の root 権限が付与されます。上記の `cli` プロファイルに関する警告を参照してください）、OmniRoute サービスに `DOCKER_UPDATE_TRIGGER_FILE` を設定し、ホスト上でウォッチャーを実行します。

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

パスは `DATA_DIR` 内にある必要があります（相対値はこれを基準に解決されます）。それ以外のパスは拒否されます。その後、**Update Now** は `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` をそのファイルに書き込み、`202` を返します。ダッシュボードは新しいバージョンが稼働するまで `/api/system/version` をポーリングし、その後リロードします。このモードでは、OmniRoute がシェルや Docker コマンドを実行することはありません。すべての更新アクションと同様に、リクエストはループバック/LAN クライアントからのみ受け付けられます。

バインドマウントされたデータディレクトリにより、ホスト側で監視するための安定したパスが提供されます。`systemd` ユニットの例（`/srv/omniroute` は、compose ファイルと `data/` が置かれているディレクトリに合わせて調整してください）：

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Watch for OmniRoute dashboard update requests

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Pull and recreate the OmniRoute container

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

このサービスは、失敗した実行が繰り返されないように、pull の前にリクエストを削除します。`DOCKER_UPDATE_TRIGGER_FILE` が設定されていない場合、ダッシュボードは手動コマンドのフローを維持します。

## 可用性: デフォルトのSQLiteは単一レプリカです

ストックDocker / Kubernetes OmniRouteは**1 つのノード プロセス+ 1 つのSQLiteライター**。高可用性は**サポートされていません**そのトポロジ上で。

| 制約                            | 結果                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| シングルライター                | する**ない**同じSQLiteファイルに対して複数のレプリカを実行します。これによりDBが破損します。                                                                                                                                                                                                                                                 |
| 再作成/再起動/ HEALTHCHECK kill | **完全停止**実行中のSSE、ダッシュボード セッション、およびメモリ内の状態。接続されているすべてのクライアントがドロップします。空のエンドポイント ウィンドウ中の新しいリクエストはリバース プロキシを取得します**`502 Bad Gateway: Unknown error`** OmniRoute JSONではなく、クライアントはこれをプロバイダーの障害と区別できません (#11015)。 |
| `/healthz`と同じイベントループ  | ビジーなカタログまたは圧縮ティックにより、プローブが遅れる可能性があります。短いタイムアウト後に再起動します**のみ**レプリカ。                                                                                                                                                                                                               |

**プローブマトリックス**( [Kubernetes プローブの推奨事項](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)も参照してください):

| プローブ  | ターゲット                                                       | 使用しないでください                                     |
| --------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| 活気      | TCP上の`PORT` (デフォルトは`20128`)、またはソフトHTTP `/healthz` | `/api/monitoring/health`                                 |
| 準備完了  | HTTP `GET /healthz`                                              | イベントループビジーをデッドとして扱う厳しいタイムアウト |
| 深層/人間 | `/api/monitoring/health`                                         | 自動化された kubelet 活性化                              |

**アップグレード:**すべてのセッションがドロップされることが予想されます。可能であればクライアントを排出します。デフォルトのSQLiteにはローリング アップデートはありません。 Compose `restart: unless-stopped` plus Docker `HEALTHCHECK`は、コンテナーが異常である場合、同じ爆発半径の場合にのみプロセスを置き換えます。

既製のマニフェストと Helm チャートは`deploy/kubernetes/`および`deploy/helm/omniroute/`に存在します。Kubernetes[デプロイメント ガイドを](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)参照してください。

の Kubernetes スニペット**単一のレプリカ**(再作成が必要です。1 つのSQLiteファイルに対して`replicas`生成しないでください):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep により、kube はSIGTERMの前にサービス エンドポイントをドロップできるようになります。**新しい**死にかけているプロセスにトラフィックが到達しなくなります。実行中の`/v1/responses` SSEは、ヘビーウェイト アドミッション リース (#11015) を介して`SHUTDOWN_TIMEOUT_MS` (デフォルト 30 秒) まで排出されます。まだプロセスに到達する新しいリクエストは、 `503` + `Retry-After: 5`を取得します。交換の準備ができるまでの空のエンドポイントのギャップの再作成は、ハード停止のままです。これは、プローブの設定ミスではなく、 SQLiteトポロジです。

外部Postgres /マルチライターHAは**ない**文書化されたストックパス。 HAが必要な場合は、単一のレプリカを保持するか、プロジェクトが個別にテストして文書化したトポロジを実行します。 Postgres/MySQL作品は[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)にあります。それが出荷されるまで、サポートされている唯一の乗算方法**大きい**`/v1/responses`容量は、1 つのボリューム上の`replicas > 1`ではなく、N 個の独立したプロセス (次のセクション) です。

## スケールアウト: N 個の独立プロセス

1 つの Node プロセスは、**1 つの V8 ヒープ**です。重複して実行される約 3 MiB / 約 750k トークンのコーディングエージェントによる 2 件の `POST /v1/responses`（RTK + Caveman）は、約 12 Gi でそのヒープを異常終了させ（`FATAL ERROR: Reached heap limit`）、16 Gi の cgroup を OOM に陥らせる可能性があります。[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) を参照してください。この測定結果は**メモリ予算**に関する警告であり、長時間実行される `/v1/responses` の同時実行数を 2 件に制限する製品上のハードリミットではありません。高負荷チャットの受け入れは、同じ V8/cgroup の上限から自動算出される取り込みバイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`、`src/shared/middleware/admissionBudget.ts`）によって制御されます。すでに適切にサイジングされたプロセスで、この値を上方にオーバーライドすると（または従来のリクエスト数上限である `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` を設定すると）、再び異常終了が発生します。小規模なチャット、`/healthz`、`/v1/models`、および MCP は、この上限の**対象外**です。

### 単一プロセス: 2 件を超える長時間 `/v1/responses`

**健全な**プロセス（ヒープが `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`、デフォルト `0.75` 未満）では、プロセス全体の処理中バイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）にまだ余裕がある場合、長時間実行される `POST /v1/responses` を 2 件より多く同時に処理**できる場合があります**。`OMNIROUTE_CHAT_LARGE_BODY_BYTES`（デフォルト 256 KiB）以上のボディは、構造が複雑なリクエストと同じ高負荷リースを取得し、同じ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) の `tryAcquireHealthyHeadroom` エスケープ（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）を使用します。長時間接続する SSE クライアントを数十件同時に処理すること（運用者はしばしば 40～50 件を必要とします）は、**メモリ予算**の問題です。つまり、ヒープ、プライマリ/ヘッドルームのスロット、および `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` を適切にサイジングする必要があり、製品上の「最大 2 件」というハードリミットではありません。負荷のかかったヒープは、#7849 の再発を防ぐため、引き続き再試行可能な `503` でリクエストを排除します。

**ヒープを増やす**（独立した V8 old-space を使用する）ために、**現時点では**次のようにします。

| すべきこと                                                                                                                                                              | すべきでないこと                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **N 個のコンテナ/Pod**を実行し、それぞれに**独自の** `DATA_DIR` / ボリュームを割り当てる                                                                                | 1 つの SQLite ファイルに対して `replicas > 1` を設定する           |
| ヒープ / 処理中バイト予算に基づいて高負荷処理中スロット数と健全時ヘッドルームをサイジングする。1～2 は保守的な #7849 のデフォルトであり、製品上のハードリミットではない | 1 つのプロセスに 8 倍の RAM と無制限の件数上限を与える             |
| オプション: **共有クォータカウンター**には `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` を使用する                                                              | Redis を共有 SQLite として扱う — Redis は共有 SQLite ではない      |
| プロバイダーシークレットを各インスタンスに複製する（またはダッシュボードの分割を許容する）                                                                              | インスタンス間で 1 つのダッシュボード / 1 つのコールログを期待する |
| 任意のロードバランサーを前段に配置する。API キーまたはセッション単位のスティッキー振り分けで十分                                                                        | ベンダー固有のサイズ認識ミドルウェアを必須とする                   |

ハードウェア: インスタンスごとに同時実行される長時間の `/v1/responses` の数は、**メモリ予算**の問題です（ヒープ + 処理中バイト / #10110）。独立した `DATA_DIR` を持つ `N` 個のインスタンスでは、ヒープも増加します。ホスト RAM は「N=8 の 16 Gi Pod 1 つ」ではなく、`N × cgroup` を収容できる必要があります。1 つの SQLite ファイルに対して `replicas > 1` を設定してはいけません。

Compose の例（2 つのヒープ、2 つのボリューム — `deploy.replicas: 2` ではありません）:

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

プロセス内の高密度化（HTTP isolate からの圧縮処理の分離）については [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) を参照してください。共有された永続状態上での単一論理クラスターについては [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) を参照してください。

## Docker 内での Gemini の地域エラー

Google AI Studio / Gemini API は、FAILED_PRECONDITION と
`User location is not supported for the API use.` を伴う HTTP 400 を返すことがあります。ホスト上でリクエストが成功しても、
コンテナが同じ外向きルートを使用しているとは限りません。DNS の順序、
IPv4/IPv6 の接続性、VPN ルーティング、設定済みプロキシが異なる場合があります。
[Google のサポート対象地域](https://ai.google.dev/gemini-api/docs/available-regions)
と実際の接続ルートの両方を確認してください。このエラーだけでは、API キーが無効であるとは判断できません。

### 接続固有のプロキシを優先する

影響を受けている Gemini 接続には、OmniRoute の[接続単位のプロキシ設定](../ops/PROXY_GUIDE.md#4-level-proxy-system)
を使用し、その後、同じモデルで **Test Connection** と小規模なリクエストを
再実行してください。これにより、ルーティングの変更をその接続のみに限定できます。プロキシに
コンテナから到達できること、および接続で実際にそのプロキシが選択されていることを確認してください。
ルートを変更しても、アップストリーム側の地域要件を満たすことが保証されるわけではありません。

### ホストとコンテナのネットワークを比較する

認証済みの結果を比較する際は、キー、モデル、リクエストを同一に保ってください。認証情報、
プロキシパスワード、完全な認証ヘッダーを Issue に貼り付けないでください。
まず、OS のリゾルバーがどのアドレスファミリーを提示するかを、ホストと
コンテナ内で同じコマンドを使用して確認します。

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` は、実行しているサービス（例: `omniroute-web`）に置き換えてください。これらの
コマンドは、認証情報や IP アドレスを表示せずにアドレスファミリーを出力します。`6` が返されても、
IPv6 の DNS 結果が存在することを示すだけであり、使用可能な IPv6 ルートや API アクセスを
証明するものでは**ありません**。`curl` がインストールされている場合は、両方の環境で
`curl -4 -I https://generativelanguage.googleapis.com` と
`curl -6 -I https://generativelanguage.googleapis.com` を比較してください。
未認証エラーであっても、HTTP レスポンスがあれば、そのプローブにおける接続性は証明されます。
Gemini の利用可否を確認できるのは、認証済みのモデルリクエストだけです。

### ホストレベルの代替手段: 動作する IPv6 とリゾルバーポリシー

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) の報告者は、コンテナの IPv6 を有効にし、
glibc のアドレス選択を変更することで、その環境でのアクセスを復旧しました。
これは環境固有の代替手段として扱ってください。リゾルバーの優先設定を調整する前に、
ホストの IPv6 が動作していること、コンテナの外向き通信とルーティング、およびファイアウォールルールを確認してください。
プライベート ULA アドレスがあるだけでは、パブリック IPv6 接続が確立されているとはいえません。

すでに Compose のデフォルトネットワークに接続されているサービスでは、次のフラグメントによって
そのネットワークで IPv6 が有効になります。サービス、ポート、ボリューム、その他の設定は維持してください。

```yaml
networks:
  default:
    enable_ipv6: true
```

名前付きネットワークの場合は、サービスが実際に接続するネットワークで有効にしてください。Docker は
ULA サブネットを割り当てられます。明示的な重複しないサブネットは、ネットワークで必要な場合にのみ選択してください。
[Docker IPv6 ネットワーク](https://docs.docker.com/engine/daemon/ipv6/)
および [Compose のネットワークオプション](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)を参照してください。

**glibc ベースのイメージ**では、`/etc/gai.conf` でアドレス選択を変更できます。現在の
リポジトリの Dockerfile は Debian を使用しています。カスタムの musl ベースイメージでは、この仕組みは共有されません。
報告された調整では、ULA のラベルを `label fc00::/7 6` から
`label fc00::/7 1` に変更しています。イメージの完全なポリシーテーブルを基にして、その他の
エントリを維持してください。`label` または `precedence` のエントリを追加すると、そのデフォルトテーブルが置き換えられるため、
変更した行だけを含むファイルでは不十分です。
[glibc の設定リファレンス](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
に、これらのセマンティクスが記載されています。確認済みのファイルを `/etc/gai.conf` に読み取り専用で
バインドマウントし、サービスを再作成して適用してください。

これにより、そのコンテナ内の**すべての外向きトラフィック**に対する OS のアドレス選択が変更されます。
すべてのアプリケーションに IPv6 の選択を強制するものではありません。Node の DNS 順序と接続の
選択も影響します。特に、`--dns-result-order=ipv4first` は IPv4 を優先するため、
IPv4 のみで発生する障害への対処にはなりません。[Node の DNS 順序](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)を参照してください。

ホストレベルの変更後は、Gemini とその他のプロバイダーを再テストしてください。ロールバックするには、
カスタムの `gai.conf` マウントを削除し、以前のネットワーク設定を復元して、
メンテナンス時間中に影響を受けるサービスまたはネットワークを再作成してください。ネットワークを再作成すると、
それに接続されている他のコンテナが中断される可能性があります。永続データボリュームは削除しないでください。

## 重要な注意事項

- **SQLite WAL モード:** OmniRoute が最新の変更を `storage.sqlite` にチェックポイントできるように、`docker stop` が完了するまで待つ必要があります。同梱の Compose ファイルでは、停止猶予期間がすでに 40 秒に設定されています。イメージを直接実行する場合は、`--stop-timeout 40` を指定してください。
- **`DISABLE_SQLITE_AUTO_BACKUP`:** 定期バックアップや書き込み前バックアップを外部で管理している場合は、`true` に設定してください。既存データベースのマイグレーションには、引き続き永続的で安全なスナップショットと、大規模マイグレーション用の保護機構が必要です。
- **データの永続化:** コンテナの再起動後もデータベース、キー、設定を保持するため、必ず `/app/data` にボリュームをマウントしてください。
- **ポート設定:** デフォルトの `20128` ポートを変更するには、`PORT` 環境変数を上書きしてください。

## 関連項目

- [VM デプロイガイド](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare のセットアップ
- [Fly.io デプロイガイド](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io へのデプロイ
- [環境設定](../reference/ENVIRONMENT.md) — `.env` の完全なリファレンス
