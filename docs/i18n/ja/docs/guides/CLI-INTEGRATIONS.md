# CLI Integrations (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

共有実行可能マニフェスト、制限された子環境、および永続的なGeminiセットアップについては、 [CLI launch Contract 」を](./CLI-LAUNCH-CONTRACTS.md)参照してください。

OmniRouteは、 OmniRouteバックエンドとして使用するようにコーディングCLI (Codex、 Claude Code、 OpenCode、 Cline、…) を構成する`setup-*`コマンド ファミリが同梱されています。そのため、ツールは次のように通信します。** 1つ**エンドポイントとOmniRoute 、自動フォールバックを使用して適切なプロバイダーにルートします。各コマンドは、**ライブ**実行中のOmniRoute (ローカルまたはリモート) からモデル カタログを取得し、ツール独自の構成ファイルを書き込みます。**あなたの**機械。 APIキーは、ツールがサポートする環境変数によって参照されます。ツールローカル環境ファイルを永続化するコマンドを以下に示します。

構成をまったく書かずに、適切な環境を挿入して`claude`、 `codex`、 `aider`、 `goose`、 `opencode`、 `qwen`、 `gemini`または`whycodes`を生成する汎用ランチャー — `omniroute run <target>` — もあります。ターゲットとそのエイリアスは正規マニフェスト`bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`、 `codex-cli|openai-codex|openai`、 `goose-cli`、 `open-code`、 `qwen-code`、 `gemini-cli`、 `why-codes|why`) から取得され、 `omniroute completion`同じマニフェスト由来のターゲット ワードを提供します。従来のツールごとのランチャー、 `omniroute launch` (Claudeコード) および`omniroute launch-codex` (Codex) は引き続き使用できます。

プロバイダーのオンボーディングは、同じlocal/remoteコンテキストから利用できます。以下の API ファースト コマンドは、管理認証をプロバイダーの資格情報から分離し、構造化された出力に資格情報を出力しません。

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

スクリプトの場合は、 `--credential-stdin`または`--credential-env`を推奨します。 `--credential`は、制御されたローカル使用のために保持されます。 `providers remove`非対話型端末で`--yes`必要とし、5 つのコマンドはすべてアクティブ コンテキストまたはグローバル`--base-url`/`--api-key`オプションを尊重します。

プロバイダー セレクターは、あいまいなIDプレフィックス、名前、またはプロバイダー名を拒否します。複数の接続が一致する場合は、完全な接続ID使用します。作成および編集コマンドは保存された接続を読み取り、削除すると読み取り不能になったことを確認します。インポートでは、既存のprovider/nameペアがスキップされます。インポートされたエントリは、 CLIに提供された管理エンドポイント、コンテキスト、または管理資格情報をオーバーライドできません。

2 つの最も豊富な統合の 1 回限りの手書きの基本セットアップについては、ツールごとの詳細を参照してください。

- [Claudeコード構成](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI構成](./CODEX-CLI-CONFIGURATION.md)
- [リモート モード](./REMOTE-MODE.md)— ラップトップからリモートOmniRoute (VPS / Tailnet) を駆動します
- [VSコードCopilotチャット](./VSCODE-COPILOT.md)— OmniCopilot拡張機能。これらの`setup-*`コマンドをエディター内から実行することもできます。

---

## マスターテーブル

すべてのコマンドは、**アクティブなコンテキスト**( `omniroute connect`で設定、 [「リモート モード」](./REMOTE-MODE.md)を参照)、または明示的な`--remote <url> --api-key <key>`フラグ。以下の「ローカル vs リモート」は、フラグがない場合は`http://localhost:20128`をターゲットとすることを意味します。 `--remote` (またはアクティブなリモート コンテキスト) を使用すると、そのサーバーからカタログを取得し、構成をローカルに書き込みます。

| 指示                       | 道具                          | 書かれていること                                                                                                                                                                 | 主要なフラグ                                                                                                                               | ローカルとリモート |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI              | `~/.codex/<name>.config.toml` — 互換性のあるテキスト モデルごとに 1 つのプロファイル (`codex --profile <name>`)                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 両方               |
| `omniroute setup-claude`   | Claudeコード                  | `~/.claude/profiles/<name>/settings.json` — 一致するモデルごとに 1 つのプロファイル (`CLAUDE_CONFIG_DIR`)                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 両方               |
| `omniroute setup-opencode` | OpenCode (openai 互換)        | `~/.config/opencode/opencode.json` — すべてのカタログ モデルを備えた`omniroute`プロバイダー (`opencode -m omniroute/<model>`)                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 両方               |
| `omniroute setup-cline`    | Cline                         | `~/.cline/data/{globalState,secrets}.json` (CLIモード) + VSコード拡張設定を出力します                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 両方               |
| `omniroute setup-kilo`     | キロコード                    | `~/.local/share/kilo/auth.json` (CLI) + `kilocode.*` VSにマージします コード`settings.json`存在する場合                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 両方               |
| `omniroute setup-continue` | 続行 / `cn` CLI               | `~/.continue/config.yaml` — `provider: openai`モデル、 `${{ secrets.OMNIROUTE_API_KEY }}`経由のキー                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 両方               |
| `omniroute setup-cursor`   | Cursor                        | 何もしない — アプリ内の手順を出力します (Cursor config は不透明SQLite)                                                                                                           | `--remote` `--api-key` `--only` `--port`                                                                                                   | 両方               |
| `omniroute setup-roo`      | Roo コード                    | `~/.omniroute/roo-settings.json` (インポートドキュメント) VSコード`settings.json`が存在する場合、 + `roo-cline.autoImportSettingsPath`を設定します                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 両方               |
| `omniroute setup-crush`    | 打ち砕く                      | `~/.config/crush/crush.json` — `openai-compat`プロバイダー、 `$OMNIROUTE_API_KEY`経由のキー                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 両方               |
| `omniroute setup-zed`      | Zed                           | `~/.config/zed/settings.json` — `openai_compatible.omniroute`プロバイダー (≤ 25 ツール対応モデル)、 `$OMNIROUTE_API_KEY`経由のキー                                               | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | 両方               |
| `omniroute setup-goose`    | ガチョウ                      | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) +環境レシピを出力します                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute setup-aider`    | 補助者                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) +環境レシピを出力します                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute setup-qwen`     | Qwenコード                    | `~/.qwen/settings.json` — V4 `modelProviders.openai`配列+ `OMNIROUTE_API_KEY` `~/.qwen/.env`                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 両方               |
| `omniroute setup-5dive`    | 5dive（エージェントフリート） | `$HOME`の下には何もありません — 5dive を書き込みます**認証プロファイル**(`/var/lib/5dive/auth-profiles/<name>/`) `5dive agent auth set`経由。 root のみ、フリート ホスト上で実行 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 両方               |
| `omniroute setup-whycodes` | WhyCodes                      | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`);パスは`$WHYCODES_HOME/config.toml`または`~/.whycodes/config.toml`です                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute run <target>`   | ランタイム起動 (汎用)         | 何もありません — 正しい環境と引数を使用して`claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes`を生成します。 QwenとGemini一時的に隔離された家を使用します     | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 両方               |
| `omniroute launch`         | Claudeコード                  | なし — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`が注入された`claude`を生成します                                                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 両方               |
| `omniroute launch-codex`   | OpenAI Codex CLI              | なし — `-c`フラグを介して挿入された`omniroute`プロバイダーを使用して`codex`を生成します                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 両方               |

フラグに関する注意事項 (コマンド ソースで確認):

- `--remote <url>` — リモートOmniRouteからカタログを取得します ( `--port`およびアクティブ コンテキストをオーバーライドします)。 `--api-key <key>` 、そのサーバーの資格情報を提供します (デフォルトは`OMNIROUTE_API_KEY`環境変数、またはアクティブなコンテキストのトークン)。
- `--only <patterns>` — カンマで区切られた部分文字列。一致するモデルIDsのみを保持します (例: `--only glm,kimi`)。 `setup-codex`、 `setup-claude`、 `setup-opencode`、 `setup-continue`、 `setup-cursor`、 `setup-crush`、 `setup-zed`で利用できます。
- `--dry-run` — ファイルシステムに触れることなく、書き込まれる内容を正確に出力します。すべての`setup-*`コマンドで使用可能**を除外する**`setup-cursor` (ファイルを書き込むことはありません)。
- `--model <id>` — モデルの自動検出を持たないツールに必須 (または対話的に選択): Cline、 Kilo、Roo、Goose、 Qwen、 Aider、5dive、 WhyCodes。これらのツールは、非対話型実行の`--yes`も受け入れます (これには`--model`が必要です)。 `setup-opencode` 、 `--model`を使用してデフォルトの最上位モデルを設定します。
- `omniroute run`上の`--model <id>` 、マニフェストのターゲットごとの配線 (`bin/cli/cli-manifest.mjs`) に従います。**補助者**`--model openai/<id>`を受信し、**オープンコード**`--model omniroute/<id>` (プレフィックスは、ID にまだプレフィックスが含まれていない場合にのみ追加されます)。**クウェン**そして**ジェミニ**ID をそのまま受け取る。**クロード**`ANTHROPIC_MODEL`経由で取得します。**ガチョウ**`GOOSE_MODEL`経由で、**なぜコード**`-P omniroute -m <id>`経由、および**コーデックス**`-c model_providers.omniroute.*`引数経由。**Qwenは、 `--model`ハード的に必要とする唯一の実行ターゲットです**— これを指定しない`omniroute run qwen` 、明示的なエラーで`2`を終了します。
- `--port <port>` — ローカルOmniRouteポート (デフォルトは`20128`、 `--remote`が設定されている場合は無視されます)。すべての`setup-*`と両方のランチャーに存在します。
- `omniroute run`終了コード: 子CLI自体の終了コードはそのまま伝播されます。 `2` =無効な引数 (サポートされていないターゲット、必要な`--model`、コンテナ ガードの欠落)。 `127` =ターゲットバイナリは`PATH`にありません。 `130`/`143`/`SIGHUP`によって起動が終了した場合は`SIGINT`/`SIGTERM`/`129` 。 `1` =他のランタイムの起動に失敗しました。
- 2 つのランチャー (`launch`、 `launch-codex`) は、 `--profile <name>`受け入れて、 `setup-claude` / `setup-codex`によって書き込まれたプロファイルと、基礎となる`claude` / `codex`バイナリのパススルー引数を選択します。

インタラクティブ ピッカーはセットアップ レシピでも共有されます。

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` `kilo`、 `codex`、 `claude`、 `opencode`、 `qwen`、 `aider`、 zqg 、 `goose`、 `cline`、 `continue`、および`5dive`のテスト済みレシピに委譲します。 IDE のみ、 MITM、およびガイドのみのカタログ エントリは明示的な`setup-*`/manual フローのままであり、起動可能なターゲットとしては表示されません。

> `setup-opencode`は**軽量 openai 互換**OpenCode統合。 `@omniroute/opencode-plugin`をインストールする、より豊富なプラグイン統合 ( `omniroute setup opencode` ) もあります。これらは異なるコマンドです。上の表は`setup-opencode`示しています。
>
> このプラグインは 2 つのパッケージ ( OpenCodeメジャーごとに 1 つ) で提供されます。これは、2 つのローダーが異なるエントリポイント ( OpenCode v1 の場合は`@omniroute/opencode-plugin` 、 OpenCode v2 の場合は`@omniroute/opencode-plugin-v2`を想定しているためです。 v2 パッケージは新しい (`0.1.0`) で、現在も移行中のホスト コントラクトに従っているため、形状OpenCodeシードを想定するのではなく、カタログ ドラフトに読み取ります。 `plugins`エントリを`opencode.json`に追加してインストールします。 `omniroute setup opencode`引き続き v1 パッケージをインストールします。オプションと資格情報の検索順序は、 READMEパッケージに含まれています。

---

## ローカルでの使用

OmniRoute が `localhost:20128` で実行されている状態で、お使いのツール用のセットアップコマンドを実行するだけです。カタログはローカルサーバーから取得されます。

```bash
# Codex: 一致したモデルごとのプロファイルを ~/.codex/ に書き込む
omniroute setup-codex
codex --profile glm52            # 生成されたプロファイルを使用

# Claude Code: モデルごとのプロファイルを書き込み、そのうち1つを起動
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: すべてのカタログモデルを含む openai 互換プロバイダーを書き込む
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} 経由で参照され、ディスクには保存されない
opencode -m omniroute/glm/glm-5.2 "..."

# 自動検出に対応していないツールでは、モデルを明示的に指定する必要がある:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 何も書き込まずにプレビュー:
omniroute setup-continue --dry-run
```

設定を一切書き込まずに起動します（環境変数の注入のみ）。

```bash
omniroute launch                 # Claude Code → ローカルの OmniRoute
omniroute launch-codex           # Codex CLI → ローカルの OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 明示的なコマンドパス: -- より後にあるものをそのまま渡す
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## リモートでの使用

任意のセットアップコマンドに `--remote` と `--api-key` を指定し、リモートの OmniRoute を参照させます。カタログはリモートから取得され、設定はローカルマシンに書き込まれます。

```bash
# リモート VPS 上の OpenCode で、glm/kimi モデルのみを保持
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 先に OMNIROUTE_API_KEY を export する

# リモートカタログから Codex プロファイルを生成
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# リモートに直接接続して CLI を起動
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

毎回 `--remote`/`--api-key` を渡す代わりに、一度ログインして、**アクティブコンテキスト**から自動的に指定できます。

```bash
omniroute connect 192.168.0.15        # スコープ付きトークンを発行し、コンテキストを保存
omniroute setup-codex                 # ← 以降はリモートカタログを使用
omniroute setup-opencode              # ← 同様
omniroute launch                      # ← リモートに接続して Claude Code を起動
```

コンテキスト、スコープ、トークン管理については、[リモートモード](./REMOTE-MODE.md)を参照してください。

---

## 5dive エージェントフリート

[5dive](https://5dive.ai) は、長時間稼働するコーディングエージェントのフリートを実行します。各エージェントは、それぞれ専用の Unix ユーザーで動作する systemd ユニットです。5dive 自体はコーディング CLI ではないため、`omniroute run` で起動するものはありません。`5dive` は**設定専用**のターゲットです。

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

どちらの形式でも、1つの 5dive **認証プロファイル**を書き込みます。そのプロファイルに紐付けられたすべての `claude` シートは、その後 OmniRoute と通信します。このターゲットには、以下の3つの固有事項があります。

- **フリートホスト上で root として実行されます。** 5dive のコマンドはローカルの systemd ユニットと root 所有の状態ディレクトリに作用するため、リモートモードはありません。すでに root でない場合、レシピは `sudo` 経由で自身を再実行します（`--no-sudo` を指定すると、この動作を無効化し、代わりにコマンドを表示します）。
- **ループバックでない限り、エンドポイントは `https://` でなければなりません。** エージェントの API キーはリクエストのたびにその URL を通じて送信されるため、5dive はマシン外部への平文エンドポイントを拒否します。プライベート LAN アドレスも例外ではありません。
- **各シート独自のモデル固定設定は、プロファイルより優先されます。** プロファイルには `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` が含まれますが、標準モデル ID に固定されたままのシートは、最初のターンで _「選択したモデルに問題があります」_ というエラーになります。シートも固定するには `--agent <name>` を渡します（複数回指定可能）。指定しない場合、レシピがコマンドを表示します。

API キーは **stdin**（`--api-key=-`）で 5dive に渡されるため、`ps` の出力には表示されません。

プロファイルを単一モデルではなく OmniRoute の **combo** に向けることで、フリートでプロバイダーのフェイルオーバーが利用可能になります。[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) に記録された実行では、プライマリエンドポイントがターンの途中で完全にダウンした際、エージェントは残りのステップをフォールバック上で完了し、障害が表面化することはありませんでした。

---

## 基本URL規則 (どのツールが`/v1`必要とするか)

OmniRoute 、 `/v1`でOpenAIサーフェス、ルートでAnthropicサーフェス、および`/v1beta`でネイティブGeminiサーフェスを公開します。各統合は、そのツールが期待する形式に接続されます (コマンド ソースで確認済み)。

| 統合                                                                       | 基本URLが書かれています | `/v1`?                                              |
| -------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | 根                      | いいえ — Cline `/v1/chat/completions`を追加します   |
| `setup-goose` (`OPENAI_HOST`)                                              | 根                      | いいえ — グースがパスを追加します                   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 根                      | いいえ — LiteLLM `/v1/chat/completions`を追加します |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1`と                 | はい                                                |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | `/v1`と                 | はい                                                |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 根                      | いいえ — Claudeコードは`/v1/messages`を追加します   |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1`と                 | はい                                                |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1`と                 | はい                                                |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 根                      | いいえ — SDKは`/v1beta/models/…`を追加します        |
| `setup-5dive` (認証プロファイル内の`ANTHROPIC_BASE_URL` )                  | 根                      | いいえ — Claudeコードは`/v1/messages`を追加します   |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | `/v1`と                 | はい — WhyCodes `/chat/completions`を投稿します     |

---

## 更新時にネイティブ依存関係を維持する：`--include=optional`

`omniroute update` で更新すると（確認後、または `--apply` を指定した場合）、
OmniRoute は `--include=optional` を組み込んだ次のインストールコマンドを実行します。

```bash
npm install -g omniroute@latest --include=optional
```

これは `omniroute update` に渡すフラグでは**ありません**。アップデーターによって
常に適用されます。これにより、npm 設定で `omit=optional` が設定されていても、
`optionalDependencies`（`better-sqlite3`、`keytar`、`tls-client`、
LLMLingua SLM スタック）が更新後も維持されます。この指定がない場合、ネイティブの
SQLite ドライバーと OS キーリングのバインディングが通知なく削除される可能性があります。
適用せずに実際のコマンドをプレビューするには、次を実行します。

```bash
omniroute update --dry-run
# [ドライラン] 実行予定: npm install -g omniroute@latest --include=optional
```

その他の `omniroute update` フラグ（ソースで確認済み）：`--check`（古い場合は終了コード
1）、`--apply`（確認なしでインストール）、`--changelog`、`--no-backup`、
`--yes`。

---

## `omniroute run gemini` 経由での Google Gemini CLI

`@google/gemini-cli` 0.50.0 に対して契約を確認済みです。この CLI は
`GOOGLE_GEMINI_BASE_URL` を尊重し、そこに対して
`POST /v1beta/models/<model>:generateContent`
（および `:streamGenerateContent?alt=sse`）を発行します。これは OmniRoute の
ネイティブ Gemini インターフェース（`/v1beta`）と正確に一致します。
`omniroute run gemini` はこれを自動的に構成します。

- `GOOGLE_GEMINI_BASE_URL` → アクティブな OmniRoute の Base URL（ルート、`/v1` なし）。
- `GEMINI_API_KEY` → 解決済みの OmniRoute 認証情報（オプション／環境変数／コンテキスト）。
- `gemini-api-key` 認証を選択する `.gemini/settings.json` を含む、**一時的で隔離された `GEMINI_CLI_HOME`**。これにより、保存済みの Google OAuth セッション（Code Assist）が OmniRoute 向けの起動設定を上書きすることはありません。終了後に削除されます。
- **環境変数の衛生管理**：子プロセスの環境から `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI`、`GOOGLE_GENAI_USE_GCA`（認証先を Vertex/Code Assist
  に変更する可能性があるもの）を除去し、念には念を入れたフォールバックとして
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` を設定します。他の `run` ターゲットにも、
  それぞれ競合する変数に対して同様の処理が適用されます。
- `--provider`／`--model` に基づく `--model <id>` の挿入。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini のワークスペース信頼ガードはヘッドレスモードでも適用されます。`--skip-trust`
を自分で渡す（または対話形式でディレクトリを信頼する）必要があります。ランチャーは
意図的にこのガードを回避しません。このランチャーは **ACP 登録**
（`src/lib/acp/registry.ts`、`gemini --acp`）とは別のものであり、後者は引き続き
`/dashboard/acp-agents` 用のエージェントプロトコル統合です。

---

## 実環境スモークスイープ（オプトイン）

決定論的な起動プランの回帰テストは CI で実行されます（`tests/unit/cli/run-command.test.ts`、
`tests/unit/cli/run-execution.test.ts`）。実際の OmniRoute サーバーに対して実際のバイナリを検証するために、
オプトイン形式のテストハーネスが `tests/integration/upstream-cli-smoke.int.test.ts` に用意されています。
これは自動的には実行されません（`RUN_CLI_SMOKE=1` が設定されていない限り、すべてのサブテストがスキップされます）。
認証情報は値ではなく環境変数名で渡され、記録される出力からキー形式の文字列が編集除去されます。
また、バイナリがインストールされていないターゲットはスキップされ、失敗は単純な真偽値ではなく
認証 / アップストリーム / 設定に分類されます。

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

任意: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` を指定するとスイープ対象を限定できます。
`OMNIROUTE_SMOKE_TIMEOUT_MS` を指定すると、ターゲットごとのデフォルトのタイムアウトである 120 秒を上書きできます。

---

## 関連項目

- [Claude Code の設定](./CLAUDE-CODE-CONFIGURATION.md) — Claude Code の詳細ガイド
- [Codex CLI の設定](./CODEX-CLI-CONFIGURATION.md) — 初回のみ必要な `[model_providers.omniroute]` の基本セットアップ
- [リモートモード](./REMOTE-MODE.md) — コンテキスト、スコープ付きアクセストークン、リモートサーバーの操作
- [CLI ツールリファレンス](../reference/CLI-TOOLS.md) — サポートされるツールとダッシュボードページの完全な一覧
- [セットアップガイド](./SETUP_GUIDE.md) — インストール方法と初回起動時のオンボーディング
