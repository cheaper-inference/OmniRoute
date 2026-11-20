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

## クイックラン

> **1 つのコマンドでセルフホストしますか?**[セルフホスト ガイド](../getting-started/SELF_HOST_GUIDE.md)— `docker compose -f docker-compose.selfhost.yml up -d` (公開イメージ+ Redis、ループバックのみ、プロファイルの選択なし) を参照してください。以下のクイック実行は、すでに他の場所でRedis実行しているユーザーのための単一コンテナーのパスです。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## 環境ファイルあり

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
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

リポジトリには、複数ステージの Dockerfile (`Dockerfile`) が同梱されています。 4 つのステージが公開されます。ユースケースに適した`target`を選択してください。

| ステージ      | ベースイメージ        | 目的                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installs deps (`npm ci --legacy-peer-deps`) and runs `npm run build` (Turbopack by default — see Build-time resources below)                                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Next.jsスタンドアロン出力を使用した運用ランタイム。**プロバイダーCLIsはバンドルされていません。**                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | `git`、 `docker.io`、 `docker-compose`およびグローバルCLIs: `@openai/codex`、 `@anthropic-ai/claude-code`、 `droid`、 `openclaw`を追加します。**エージェント ワークフローの場合はこれを選択します。**                                                                                                     |
| `runner-web`  | `runner-base`         | Web セッションプロバイダー`gemini-web`、 `claude-web`、 `claude-turnstile`) 用の Chromium ブラウザー (`--with-deps`) にPlaywright +追加します。**これらのプロバイダーを使用する場合はこれを選択してください**—プレーン イメージがないと、リクエスト時に失敗します (リリース チャネルの`-web`メモを参照)。 |

特定のターゲットを手動でビルドします。

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ビルド時のリソース

3 つのビルド引数は、 `builder`ステージのコストを制御します。これらはビルド時のみです— `OMNIROUTE_MEMORY_MB` (下記) は別個の実行時ノブです。

| 引数を構築する              | デフォルト | 効果                                                                                                                 |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` webpack を使用してビルドします。ピーク時のメモリが少なく、速度が遅くなります。 `1` Turbopackにオプトインします。 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | 生成された`next build`の V8 ヒープ上限 (`--max-old-space-size`)。                                                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | フィード`CIRCLE_NODE_TOTAL`;次に、ページデータ収集用の`workers = N - 1`を導出します。                                |

`OMNIROUTE_BUILD_WORKERS` 、大きなビルダーに対して発生させるべきものであり、制約されたビルドが停止したときに疑うべきものです**後**`✓ Compiled successfully`。各ページ データ ワーカーは独自のプロセスであり、親`next build`自体も同様です。ライブVPS再現 ( #7518の問題) では、 `NODE_OPTIONS`ヒープ フラグとは関係なく、 ~ 4.5 GBで各プロセスのピークRSSが測定されました (Turbopack V8 ヒープの外のnative/Rustメモリでコンパイルされます)。 `2`のデフォルト (→ 1 ワーカー、合計 2 プロセス) は、パブリッシュ パイプラインが使用する 16 GB / 4 vCPU GitHub ホスト ランナーに合わせてサイズ設定されています。 `8` (→ 7 ワーカー) では、ランナーがメモリを使い果たし、ビルドキットは`ResourceExhausted: ... cannot allocate memory`のステップに失敗しました。プロセスごとのRSSが推測ではなく直接測定されると、 `3` (→ 2 ワーカー) は依然として適合しませんでした。 `tests/unit/docker-build-memory-budget.test.ts`測定された数値に対して演算を実行し、いずれかのノブがランナーを超えると失敗します。

Turbopackネイティブの Rust メモリ内でコンパイルされます。**外**V8 ヒープなので、 `OMNIROUTE_BUILD_MEMORY_MB`それをバインドしません。メモリ上限のあるホストでは、ビルドはOOMキラーによってSIGKILLedれ、エラー テキストはまったく表示されません—は単に`Creating an optimized production build`の途中で停止します。これは、メモリ不足ではなくハングしているように見えます。 Turbopackコードのデフォルトである`npm run dev` / `npm run build`とは異なり、 `Dockerfile`デフォルトが webpack (`OMNIROUTE_USE_TURBOPACK=0`) になるのはこのためです。ビルド引数のない裸の`docker build .` (Railway やその他のワンクリック ホストが実行するもの) は、メモリ制限のあるビルダー上でサイレントに終了してはなりません。パブリッシュされたイメージは、 `docker-publish.yml`で明示的に`OMNIROUTE_USE_TURBOPACK=0`すでに渡しています。 RAMが豊富にあるビルダーでは、ビルドを高速化するためにTurbopackを選択します。

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker`が有効になっているため、 `next build`親を実行します**そして**ワーカー プロセスとそれぞれが個別に`OMNIROUTE_BUILD_MEMORY_MB`尊重します。コンテナの天井のサイズは、その値の 1 倍ではなく、およそ 2 倍以上に設定します。

このツリー (`--target runner-base`、 `OMNIROUTE_BUILD_MEMORY_MB=6144`) で測定されます:

| バンドラー   | コンテナ天井   | 結果                            |
| ------------ | -------------- | ------------------------------- |
| Turbopack    | 8 GiB / 16 GiB | 両方とも黙って OOM で殺害された |
| ウェブパック | 8 GiB          | ビルドワーカーSIGKILLed         |
| ウェブパック | 12 GiB         | 成功、ピークはGiB               |

### 実行時のデフォルト

`runner-base`によってエクスポートされるデフォルト: `PORT=20128`、 `HOSTNAME=0.0.0.0`、 `OMNIROUTE_MEMORY_MB=1024`、 `NODE_OPTIONS=--max-old-space-size=1024`、 `DATA_DIR=/app/data`、 `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Dockerでのメモリの動作:

- 画像は`OMNIROUTE_MEMORY_MB=1024`を設定し、そこから`NODE_OPTIONS=--max-old-space-size=1024`を導出します。
- 実際のサーバー プロセスは、 `OMNIROUTE_MEMORY_MB`読み取り、 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`を追加するスタンドアロン ランチャーによって開始されます。
- ノードは最後に繰り返された`--max-old-space-size`値を使用するため、 `OMNIROUTE_MEMORY_MB`を設定すると、有効なDockerヒープ制限が制御されます。
- イメージによって常に設定されるため、ランチャー自身の RAM 調整されたフォールバックはDockerでは決して適用されません。ワークロードに対して明示的に値を上げます (以下の表)。 `2048`はコーディング エージェント`/v1/responses`にはまだ小さすぎます。

### コーディングエージェント用のランタイムRAM

1 GiB Dockerデフォルトは、実稼働サイズではなく、 dashboard/light-chatフロアです。長い`POST /v1/responses`本体 (数百のメッセージ、数十のツール) は、圧縮中に複数のメモリ内グラフを保持します。 2 つの重複する~ 3 MiB / ~ 750k トークン要求により、V8 が一度に中止されました。** GiB** old-space (`FATAL ERROR: Reached heap limit`) と 16 GiB cgroup OOMもヒットしました。 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)参照してください。

サイズ**ヒープ上の cgroup `--memory`** —ネイティブ バッファー、 SQLite、および圧縮中間バッファーは V8 の外部にあります。

| ワークロード                                        | `OMNIROUTE_MEMORY_MB`                | コンテナ/cgroup        | 注意事項                                                                                      |
| --------------------------------------------------- | ------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------- |
| ダッシュボード、軽いチャット 1 つ                   | `1024` (画像のデフォルト)            | ≥2 GiB                 |                                                                                               |
| 1 つのコーディング エージェント (Claude/Codex/Grok) | `8192`                               | ≥10 GiB                | 一般的な単一セッションの`/v1/responses`                                                       |
| 2 つの同時ロング`/v1/responses`                     | `10240`–`12288`                      | ≥12–16 GiB             | ~ 12 GiBヒープでの V8 アボートの測定                                                          |
| 3 つの+同時の長いコンテキスト                       | 1 つのプロセスでは行わないでください | シリアル化 / もっとRAM | デフォルトの重量級入場は機内で 1 回です。 RAM使用せずにそれを起動すると、中断が再導入されます |

ベアメタル上の`omniroute serve` ~ `[512, 4096]` RAM `OMNIROUTE_MEMORY_MB`**設定を解除する**。 Docker常に`1024`を設定するため、公式イメージではキャリブレーションが実行されません。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## サブパス上のリバース プロキシ (Traefik / nginx)

Next.js `basePath`はスタンドアロン バンドルにコンパイルされます。 OmniRouteアプリのルートにあるセンチネル ファイルにベイクされた値を記録し ( `npm run build`中に書き込まれ、 `scripts/docker/ensure-docker-base-path.mjs`によって読み取られます)、コンテナーの起動時にそれを`OMNIROUTE_BASE_PATH`と比較します。これらが異なり、イメージがドメイン ルート用に構築された場合、エントリポイントはスタンドアロン マニフェスト、埋め込み`basePath`/`assetPrefix`リテラル (次の 16 は`assetPrefix`のみからSSRアセットURLsレンダリングします—パッチャーはサブパスをミラーリングします)、ベイクされた`/_next/static`アセットURLs (クライアント参照マニフェスト、メディア インポート、事前レンダリングされたエラー ページ)、およびクライアント`process.env`書き換えます。 `node dev/run-standalone.mjs`を実行する前に shim を実行します。

### Compose ビルド (推奨)

`.env`で両方の変数を設定し、イメージとランタイムが一致するように再構築します。

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Dockerビルド引数およびランタイム環境変数として転送します。

### 事前に構築されたルート イメージ+ランタイム サブパス

公開された`cheaperinference/omniroute:*`イメージは、ドメイン ルート用に構築されます。実行時に`OMNIROUTE_BASE_PATH`を設定することもできます。コンテナーは起動時にバンドルにパッチを 1 回適用します。一致するパブリックオリジンとペアリングします。

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

リバースプロキシを転送するように設定します。**満杯**外部パス (プレフィックスを削除しないでください)。 Traefik は、 `StripPrefix`を使用せずに`PathPrefix(`/omniroute `)`コンテナにルーティングする必要があるため、 Next.js `/omniroute/...`受け取り、 `/omniroute/_next/...`からアセットを提供します。

Docker healthcheck は、アクティブな`OMNIROUTE_BASE_PATH`がプレフィックスとして付けられた軽量`/healthz`ライフサイクル エンドポイントを調査します。 `/api/monitoring/health`は引き続きhuman/dashboard診断に使用できます。コンテナーHEALTHCHECKそのコンテナーに戻すようにするには (たとえば、ディープ・ヘルスの強制のため)、 `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`を設定します。その道は、**深い**チェック (DB +監視概要) — Dockerの頻度の低い`HEALTHCHECK`に適しています (オプトインした場合)。**ない**Kubernetes `livenessProbe`間隔の場合。

オーケストレーターの場合 (Kubernetes、Nomad など):

| プローブ                  | 好む                                                                     | 避ける                                                   |
| ------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| 活気                      | メインポート上のHTTP `GET /livez`、またはTCP (`PORT`、デフォルト`20128`) | ライブネスとしての`/api/monitoring/health`               |
| 準備完了                  | HTTP `GET /healthz`                                                      | イベントループビジーをデッドとして扱う厳しいタイムアウト |
| ディープ/ブラックボックス | `/api/monitoring/health`                                                 | —                                                        |

`/healthz`プロセスのライフサイクル (`ok` / `starting` / `stopping`) をレポートします。 `/livez`はプロセスアライブのみです (ハンドラーが実行できるときは常に 200、準備完了を待機しません)。どちらもリクエスト処理として同じ Node イベント ループで実行されるため、CPU に依存するカタログや圧縮作業≠ —が発生する可能性があります。 HTTPプローブがタイムアウトした場合は、 TCP liveness を優先します。完全なプローブ ガイダンス:[モニタリング ガイド— Kubernetes プローブの推奨事項](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## Docker Compose with Caddy (HTTPS Auto-TLS)

Caddy の自動SSLプロビジョニングを使用して、OmniRoute安全に公開できます。ドメインのDNS A レコードがサーバーのIPを指していることを確認してください。

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
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

Caddy は、上流コンテナの標準転送ヘッダーを設定します。 OmniRoute OAuthコールバックおよび生成されたパブリック リンクの正規のパブリック オリジンとして`NEXT_PUBLIC_BASE_URL`使用します。認証されたダッシュボードの書き込みでは、同一オリジンのリクエストとセッション バインドのCSRF保護が使用されます。 OmniRoute明示的な構成ではなく、信頼できる転送ヘッダーからパブリック オリジンを意図的に取得するようにする高度な展開の場合にのみ、 `OMNIROUTE_TRUST_PROXY`有効にします。

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

## 画像タグ

| 画像                         | タグ     | サイズ  | 説明                                                       |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | 最高**出版された**安定版SemVer ( git `main`ではありません) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | このクラスのタグをGitOpsに固定します                       |

The same images are published to three repositories, with the same per-architecture digests: `cheaperinference/omniroute` (Docker Hub, the Cheaper Inference organization, from 3.8.53 on), `ghcr.io/cheaper-inference/omniroute` and the legacy `diegosouzapw/omniroute`, which keeps its pull history and still receives every release. Existing `diegosouzapw/omniroute` deployments keep updating; switching the image name is optional. The `:next` / `:next-web` pre-release channel below is published to `diegosouzapw/omniroute` and GHCR only.

マルチプラットフォーム マニフェスト: `linux/amd64` + `linux/arm64`ネイティブ (Apple Silicon、 AWS Graviton、Raspberry Pi)。 Docker一致するアーキテクチャを自動的に選択します。 ARMホスト上でAMD64エミュレーションを強制する必要がある場合は、 `--platform linux/amd64`を渡します。

### リリースチャンネル

OmniRoute 、安定リリース、アクティブなリリース ブランチ テスト、および開発ビルド用に個別のDockerチャネルを公開します。

| チャネル                        | ソース                                 | 可変性                          | 推奨用途                                                                                                                     |
| ------------------------------- | -------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versionedリリース               | 不変                            | 正確なリリースを固定する運用環境の展開                                                                                       |
| `:latest` / `:latest-web`       | 最高**出版された**安定したSemVer       | 可変の安定したポインタ          | 安定版リリースに従う**後**SemVerパブリッシュ ジョブ—が実行する**ない**`main`または未リリースの`release/v*`コミットを追跡する |
| `:next` / `:next-web`           | 現在のデフォルトの`release/v*`ブランチ | 変更可能なプレリリース ポインタ | アクティブなリリース ブランチには到達したが、まだ安定リリースにはなっていない修正のテスト                                    |
| `:main` / `:main-web`           | `main`支店                             | 可変開発ポインター              | 開発および統合テストのみ                                                                                                     |

#### Web セッションプロバイダー: `-web`イメージ

上記のすべてのチャネルは、 `-web`タグ (`:latest-web`、 `:<version>-web`、 `:next-web`、 `:main-web`) としても機能し、 `runner-web`ステージ—から同じイメージにPlaywrightと Chromium ブラウザを加えて構築されます。プレーンな画像が出荷されます**それなし**クロム; `gemini-web`、 `claude-web` 、 `claude-turnstile`にはそれが必要です。

失敗は起動時ではなく延期されます。これらのプロバイダーはモデルをリストし、ダッシュボードに接続済みとして表示され、最初のリクエストのみが失敗します。

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

これらのプロバイダーを使用する場合は、既に—に接続しているチャネルの`-web`タグをプルします。他には何も変更されません。 npm/CLIインストール ( Dockerイメージなし) では、同等の欠落部分はブラウザー バイナリです。ホスト上で`npx playwright install chromium`実行します。

#### プレリリースチャンネルの使用

`next`チャネルは、現在のデフォルトの`release/v*`ブランチにプッシュされるたびに再構築され、 AMD64とARM64両方に対して公開されます。古いメンテナンス ブランチはこれを上書きできません。このチャネルは、次の安定したタグがカットされる前に、アクティブなリリース ブランチにマージされた修正のプル可能なイメージを提供します。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose の場合、選択したプロファイルで使用されるイメージ タグをオーバーライドし、サービスをプルして再作成します。

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

`next`は、フローティングのプレリリース チャネルです。アクティブなリリース ブランチにプッシュすると変更される可能性があり、**運用環境での使用はサポートされていません**。特定のビルドを評価するときにイメージ ダイジェストをピン留めします。

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

テストする前に、 OmniRouteデータ ボリュームまたはバインド マウントされたデータ ディレクトリをバックアップします。ロールバックするには、以前に使用した安定バージョンまたはダイジェストを復元し、コンテナーを再作成します。

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

リリース ブランチ ビルドでは`latest`移動することはできません。適格な安定したセマンティック バージョンのみが安定したポインタを昇格できます。 `next`イメージには、リリース イメージ検査とクリティカル脆弱性ゲートのブロックが保持されます。

**`latest`は git の通貨保証ではありません。** `main`またはアクティブな`release/v*`ブランチ上でマージされた修正は次のとおりです。**ない**安定したSemVerイメージが公開され、公開ジョブが`:latest` (そのSemVerと同じダイジェスト) をプロモートするまで、 `:latest`内で実行されます。 GitHubすでに修正を示しているのに`latest`フリーズしているように見える場合は、 `:next`をプルしてリリース ブランチをテストするか、 SemVerタグを待ちます。

| あなたが欲しいのは                                         | 使用                                  |
| ---------------------------------------------------------- | ------------------------------------- |
| GitOps / 流れてはいけない制作                              | ピン`:X.Y.Z` (または画像ダイジェスト) |
| 公開された安定版に従い、リリースごとに再作成を受け入れます | `:latest`                             |
| 未リリースの`release/v*`コミットをテストする               | `:next` (実稼働ではない)              |
| `main`をテストする                                         | `:main` (実稼働ではない)              |

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

## スケールアウト: N 個の独立したプロセス

### Codexトークンのローテーションの所有権

1 つのCodexアカウントのコピーは、その 1 回限りのリフレッシュ トークンを個別に消費してはなりません。同期された認証情報のみを使用するインスタンスでは、 `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (エイリアス`cx`) を設定します。単一回転の所有者では未設定のままにしておきます。各プロセスには依然として独自の`DATA_DIR`が必要です。このオプションは、 SQLiteを共有せず、トークン同期や分散ロックも提供しません。

パッシブ インスタンスは、更新が必要なときに接続を再読み込みし、期限切れになっていない別のアクセス トークンのみを採用します。それ以外の場合、接続の有効期限が切れたり非アクティブ化されたり、リフレッシュ ブレーカーの失敗がカウントされたりすることなく、リフレッシュは無効になります。実際のアップストリーム認証の失敗では、引き続き通常の失敗アカウンティング、指数関数的クールダウン、および通常のクライアント エラーが使用されます。アカウントの無効化は永久的なままです。アクセス トークンの有効期限が切れる前に、所有者のローテーションされたトークンを同期するか (デフォルトのプロアクティブな更新リードタイムは 5 分です)、 Codex認証ファイルを再インポートします。パッシブ インポートでは、提供されたトークンがトークン エンドポイントで検証されずに保存されます。手動dashboard/APIリフレッシュは`409 refresh_disabled`を返します。新しいOAuthログインは変更されません。[環境リファレンス を](../reference/ENVIRONMENT.md#passive-codex-token-refresh)参照してください。

One Node process is **one V8 heap**. Two overlapping ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) abort that heap at ~12 Gi (`FATAL ERROR: Reached heap limit`) and can OOM a 16 Gi cgroup. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). That measurement is a **memory-budget** warning, not a product hard-max of two concurrent long `/v1/responses`. Heavyweight chat admission is gated by an auto-derived ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) sized from that same V8/cgroup ceiling — overriding it upward (or setting the legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) on an already-sized process reintroduces the abort. Small chats, `/healthz`, `/v1/models`, and MCP are **not** in that cap.

### 1 プロセス: 2 つ以上の長い`/v1/responses`

あ**健康**プロセス ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`の下のヒープ、デフォルト`0.75`)** 5月**プロセス全体のインフライトバイト バジェット (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) にまだ余裕がある場合は、2 つを超えるロング`POST /v1/responses`を同時に実行します。 `OMNIROUTE_CHAT_LARGE_BODY_BYTES`以上のボディ (デフォルトは 256 KiB) は、構造が重いリクエストと同じヘビーウェイト リースを取得し、同じ[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom`エスケープ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) を使用します。数十の長いSSEクライアントを同時に実行する (オペレーターは通常 40 ～ 50 を必要とする)**メモリバジェット**質問—サイズ ヒープ+ primary/headroomスロット+ `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` —製品の厳密な「最大 2」制限ではありません。圧力をかけられたヒープは依然として再試行可能な`503`でシェッドされるため、#7849 は返されません。

に**ヒープを乗算する**(独立した V8 オールドスペース)**今日**:

| する                                                                                                                                                       | しないでください                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 走る**containers/pods** 、それぞれにその**自分の**`DATA_DIR` / ボリューム                                                                                  | 1 つのSQLiteファイルに対して`replicas > 1`設定する                           |
| ヒープ/インフライトバイトバジェットからの重いインフライト+健全なヘッドルームのサイズ。 1–2 は保守的な #7849 のデフォルトであり、製品の最大値ではありません | 1 つのプロセスに 8 × RAMと無制限のカウント上限を与える                       |
| オプション: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`**共有クォータカウンター**                                                                 | Redis共有SQLite —として扱いますが、そうではありません                        |
| プロバイダーのシークレットを各インスタンスに複製します (またはパーティション化されたダッシュボードを受け入れます)。                                        | 複数のインスタンスにわたって 1 つのダッシュボード / 1 つの通話ログが必要です |
| 前面にはロードバランサーが装備されています。 APIキーまたはセッションによるスティッキーで十分です                                                           | ベンダー固有のサイズ認識ミドルウェアが必要                                   |

セッションとアカウントのアフィニティは、 Redisを通じて共有することもできます。同じ`REDIS_KEY_PREFIX`と正の`sessionAffinityTtlMs`設定を使用して、各プロセスで`OMNIROUTE_SESSION_AFFINITY_STORE=redis`と`REDIS_URL`設定します。 Pin は、ハッシュされた使用状況アカウント ID を各プロセスの適格なローカル接続に解決するため、一致する ID メタデータを持つOAuthアカウントには一致する接続IDsが必要ありません。既知のアカウント ID は、PIN 解決および保護されたエビクションにおいて、矛盾するローカルIDsよりも優先されます。 ID のないレコード (または ID のない削除呼び出し元) は、従来のIDガードを保持します。安定した使用 ID を持たないアカウントでも、 IDs照合が必要です。 Redisエラーまたは 100 ミリ秒を超える呼び出しは、ローカルSQLiteにフォールバックします。各Redisアフィニティ ストアは、未処理の操作を 8 に制限し、満杯の場合は直ちにRedisバイパスし、呼び出し元の期限ではなく、基礎となる作業が落ち着いたときにのみスロットを解放します。 Redis停止中、共有される真実はありません。各インスタンスは独自のローカル アフィニティにフォールバックし、セッションはインスタンスごとに 1 回再固定される可能性があり、インスタンスが分岐する可能性があります。スティッキーは、回復するとRedisを通じて再収束します。タイムアウトは送信されたEVALではなく待機を制限し、フォールバック後に到達する可能性があります。ルーティング書き込みでは、新たな変更時間の読み取りではなく、ルーティング決定によって観察された正確な値が比較されます。観測されたミスまたはSQLiteフォールバック観測は、存在しないRedisキーとして比較されます。廃止されたピンは 1 つのCASで置き換えられるため、後のコマンドでは新しい別のピンを置き換えたり削除したりすることはできません。 Redisアトミックに値を読み取り、残りのサーバーTTLを返します。書き込み側のJSONタイムスタンプや読み取り側のクロックではなく、正のPTTL (または有効期限なし) によって生存性が決まります。ローカル スナップショットは、残りのTTLをローカルの期限にマッピングします。既存のJSONキーは読み取り可能なままであり、その生のバイトはCAS用に保持されます。 Redis 、応答する際の唯一の真実の情報源です。共有の更新/挿入、タッチ、および削除によってローカル エントリが削除されることを確認し、インストールまたは更新を行わないでください。 Redisパス上のSQLite 、以前と同様に TTL 制限付きで、 Redisエラー、タイムアウト、またはアドミッション飽和からのこのインスタンス自身のフォールバック決定のみを保持します。その後の停止時にローカル PIN が失われると、間違ったアカウントや削除されたアカウントではなく、新しい選択が 1 回 (プロンプト キャッシュ ミスが 1 回) 発生します。拒否された upsert は、共有された勝者とその残りのTTLアトミックに返します。通常の選択では、マップされたローカル期限を再チェックし、まだ有効な勝者を使用し、別の共有書き込みを行わずにそのアカウントの使用状況とログに影響を与えます。使用できない場合は、ローカル候補が選択され、共有ピンは変更されないままとなり、1 つのデバッグ メッセージが生成されます。拒否されたCAS SQLiteを書き込みません。 Redisエラー、タイムアウト、またはアドミッションの飽和の場合は、代わりに既存のローカル操作が適用されます。送信されたミューテーションの応答がタイムアウト (受け入れ、拒否、またはエラー) 後に到着した場合、同期の正確なシリアル値の比較と削除により、バイトが同一のタイムアウト フォールバック行のみが削除されます。その比較と削除の間に待機はありません。新しい停止書き込みは保存されます。ガード付きエビクションでは、 Redisダウンしている場合でも、失敗したアカウント自体のローカル PIN が削除され、共有エビクションが確認された後に再度クリーンアップされます。共有成功ではSQLiteが書き込まれないため、保留中の以前の共有応答では、排除されたローカル ピンを復元できません。その後の停止フォールバックにより、アカウントが再固定される可能性があります。後で受け入れられる共有書き込みはRedisにのみ存在します。 Redisミスはローカル フォールバック状態を参照しません。ドライバーがオフの場合、新しく選択されたピンは従来の 4 フィールドSQLite JSON形状を保持します。 Redisルーティングのみがハッシュ化されたアカウント ID を追加します。プリフェッチされたピンは、有効期限の境界で再チェックされます。 Redis非リース選択ではストアが再読み取りされますが、同期リース プランニングでは、プリフェッチとプランニングの間で削除されたピンを引き続き使用できます (ベスト エフォート ウィンドウとして認められています)。リースコミットは、永続的要求の後にアカウントを切り替えることはできません。拒否された upsert では、その要求に対してのみ要求された候補を保持し、共有された勝者には影響を与えないため、インスタンス間の合意はそのパスに制限されます。表の残りの部分は引き続き適用されます。これは、コンボ セッションのスティッキー性、ネイティブCodexターン ピン、アカウント セマフォ、ロックアウト、支出制限、構成、または通話ログを共有しません。

ハードウェア: インスタンスごとの同時実行ロング`/v1/responses`は、**メモリバジェット**質問 (ヒープ+飛行中のバイト / #10110)。 `N`に依存しない`DATA_DIR`は依然としてヒープを増大させます。ホストRAM 、「N = 8 を備えた 1 つの 16 Gi ポッド」ではなく、 `N × cgroup`をカバーする必要があります。 1 つのSQLiteファイルに対して`replicas > 1`実行しないでください。

スケッチを作成します (2 つのヒープ、2 つのボリューム—ではなく`deploy.replicas: 2`):

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

インプロセス密度 ( HTTP分離株からの圧縮) は[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)です。共有永続状態の 1 つの論理クラスターは[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)です。

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
