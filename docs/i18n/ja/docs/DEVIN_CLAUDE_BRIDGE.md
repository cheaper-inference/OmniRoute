# Devin Claude Bridge (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇦 [bs](../../bs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` を使用すると、実際の Claude Code ランタイムは OmniRoute のローカル Anthropic
Messages エンドポイントを利用しつつ、公式の Devin CLI が ACP stdio 経由でモデル応答を提供できます。
既存の Anthropic、Claude OAuth、Claude Web、または `devin-cli` プロバイダーは変更されません。

クライアント所有のツール呼び出しには、Claude 形式でツール対応のプロバイダーである
`devin-cli-agentic`（エイリアス `dva`）を経由してください。従来の `devin-cli`（`dv`）ACP エグゼキューターは
テキスト専用です。Devin のツールなし summarizer を実行するため、ツール呼び出しを返すことはできません。
そのモデルメタデータにもこの点が明記されているため、ツールを必要とするコンボルーティングでは使用されません。

> **現在のステータス: Claude Code `2.1.258` に固定済み。オフライン検証とライブ検証が最後に記録された
> バージョンは `2.1.220` です。** `2.1.220` への固定では、Devin CLI
> `3000.2.17` とモデル `swe-1-7-lightning` を使用して、分離された3つのシナリオを完了しました。最後のライブ実行では、クライアント所有の `Read`、
> `Edit`、`Bash` の各ターン、`npm test` の成功、プロジェクトコマンドとスキルの
> 検出、Devin のみによるルーティング、および Claude への送信がゼロであることが実証されました。その後、固定バージョンは `2.1.258`
> （OmniRoute の Claude アイデンティティが偽装する CLI 世代であり、Fable 5.1 ティアを
> ネイティブに搭載する最初の系列）に引き上げられました。新しい固定バージョンでは、固定済みのベースイメージ上でインストールレイヤーと `claude --version` が
> 検証され、ブリッジのユニットスイート、`compose config`、および
> 静的分離の証明は成功していますが、オフラインのモックシナリオとライブの3シナリオ
> スイートはまだ再実行されていません。この固定バージョンでブリッジを使用する前に、再実行してください（「固定ツールの更新」を参照）。

## アーキテクチャ

```text
Claude Code 2.1.258（分離された非 root Linux コンテナ）
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic（Claude 形式、認証不要のプロバイダー）
  -> devin acp --agent-type summarizer（公式 ACP stdio、Devin ツールなし）
  -> 専用の devin-auth ボリューム内の Devin アカウント
```

公式 CLI のデフォルト ACP エージェントは自身のツールを実行できるため、このブリッジでは
使用しません。代わりに、公式 CLI モードではツールを持たない固定の `summarizer` ACP エージェントを起動し、
シリアライズされた Anthropic リクエストを実行トレースとして構成します。Claude が所有する別の
アクションが必要な場合、応答にはクライアントツールのエンベロープを正確に1つだけ含める必要があります。応答を
成功として報告する前に、すべての ACP `tool_call` または `tool_call_update` が拒否されます。

`open-sse/executors/devin-agentic/serializer.ts` のシリアライザーは、Claude Code から提供された
`system`、`text`、`tool_use`、`tool_result`、`thinking`、`redacted_thinking`、`tool_choice`、および
ツールを保持します。画像および不明なブロックは明示的に失敗します。サイズの大きなツール結果には、
可視の切り詰めマーカーが使用されます。

パーサーは、モデルの各ターンにつき、単独の `<tool>{...}</tool>` エンベロープを1つ受け入れます。
名前がリクエストのツール一覧に含まれていることを確認し、そのツールの JSON
Schema に照らして引数を検証し、説明文とアクションの混在を拒否し、上限1回の修復を許可します。その後、Claude Code は
生成された Anthropic `tool_use` をローカルで実行し、`tool_result` を OmniRoute 経由で
送り返します。

## 自動ルーティング

このプロバイダーは、ブロックされていない場合、OmniRoute の `auto/*` 候補プールで選択対象になります。
候補としての適格性は、選択を保証するものではありません。コンボのルーティング戦略（たとえば、
last-known-good）によっては、別のプロバイダーが優先される場合があります。すべてのリクエストを
Devin 経由にする必要がある場合は、`dva/<model>` または Devin 優先のコンボを使用してください。

## 分離と脅威モデル

ホストの Claude インストール、アカウント、および設定は対象外であり、使用禁止として扱われます。Compose サービスは以下のように構成されています。

- UID/GID `10001:10001` で、読み取り専用のルートファイルシステム、削除されたケイパビリティ、および
  `no-new-privileges` を使用して実行される。
- プライベートな `/home/bridge`、専用の Claude 設定ボリューム、分離された OmniRoute データ、
  および個別の `devin-auth` ボリュームを使用する。
- 破棄可能な `.sandbox` ワークスペース/証拠のみをマウントする。
- ホストのホーム、キーチェーン、SSH、クラウド認証情報、Docker ソケットをマウントしない。
- 明示的な環境を構築し、Anthropic API/OAuth/ルーティング変数を削除する。
- Claude Code の推論を、ローカル専用キーを使用して `http://omniroute:20128` のみに転送する。

オフラインプロファイルでは内部ネットワークを使用します。ライブプロファイルでは、OmniRoute は
`network-guard` を介してのみ Devin の公式エンドポイントに到達でき、無関係な宛先へのアクセスは拒否されます。
Claude Code には個別の全送信拒否ガードがあり、`NO_PROXY` を介してローカルの OmniRoute
サービスのみに到達できます。ガードの監査ファイルは、それぞれのガードプロセスからのみマウントされます。
スクリプトは、トークンを含まない証拠をエクスポートする前に、ファイルの所有権、モード、リンク数、およびすべての判定を検証します。

分離証明を個別に実行します。

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

これは、トポロジー、名前付きマウント、非 root/読み取り専用設定、明示的なローカルルーティング、
機密性の高い環境変数が存在しないこと、Docker ソケットが存在しないこと、
`api.anthropic.com` および `claude.ai` へのアクセスがブロックされること、Devin のみがプロバイダーとして選択されること、
および ACP バックエンドが利用できない場合に明示的に失敗することを検証します。

## 初回セットアップと通常の使用

固定されたイメージをビルドします。

```bash
./scripts/devin-bridge/build
```

分離された Devin ボリュームのみを認証します。

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

ログインコマンドは、リモート/コンテナ環境向けの公式な手動トークンフローを使用します。
値は CLI プロンプトに直接入力されます。プロセス引数として渡されたり、Git に書き込まれたり、
ホストからコピーされたりすることはありません。

分離された Claude Code ランタイムを起動します。

```bash
./scripts/devin-bridge/launch
```

`launch` は、コンテナ化された Claude Code を起動する前に、分離、Devin 認証、およびモデル検出を再確認します。
ホストの Claude 実行ファイルを実行することはありません。モデルのエイリアスは
`.env.devin-bridge` で設定できます。設定するすべての値には
`devin-cli-agentic/` プレフィックスを維持する必要があります。

## 検証コマンド

再現可能なオフライン経路では Devin アカウントは不要であり、実行時にインターネットへ接続しません。

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

認証済みで明示的に有効化するライブ経路は次のとおりです。

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

ライブランナーは、ACP セッションが短時間に集中して開始されるのを避けるため、シナリオ間で待機し、
テキストによる主張を信用するのではなく、構造化された Claude ストリームイベントを検証します。
次の 3 つのシナリオによって証明します。

1. プロジェクトの直接読み取りと不具合分析。
2. 実際の `Edit`、クライアント所有の `Bash` による `npm test`、および最終結果。
3. `/bridge-check` と `bridge-proof` の検出、プロジェクトの読み取り、クライアント所有の別の
   `npm test` の成功、および保留中の作業がない状態での完了。

最終ゲートでは Devin のネットワーク監査も確認し、Claude の送信監査が空のままであることを必須とします。

## 固定されたツールの更新

このイメージでは、Node、Claude Code、Devin CLI のバージョンが
`docker/devin-bridge/Dockerfile` に固定されています。更新するには、以下を実施します。

1. 明示的に指定されたバージョンを変更する。
2. アーキテクチャごとに指定された両方の Devin アーカイブチェックサムを、公式
   アーティファクトの値に置き換える。
3. 再ビルドし、すべてのオフライン検証コマンドを実行する。
4. イメージ内のバージョンを確認する。
5. 認証が必要な 3 シナリオのライブスイートを再実行する。

どちらの CLI もホストにグローバルインストールしないでください。また、チェックサム検証を
未検証のダウンロードに置き換えないでください。

## 診断とクリーンアップ

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  では、ローカルルーティングとサニタイズされたエグゼキューターエラーを確認できます。
- `.sandbox/evidence/mock-acp.jsonl` には、決定論的なモック ACP アクションが記録されます。
- `.sandbox/evidence/claude-stream.jsonl` には、実際の Claude Code オフライン実行が記録されます。
- `.sandbox/evidence/live-*.jsonl` には、検証済みの 3 つのライブストリームが記録されます。
- `.sandbox/evidence/egress.jsonl` と `.sandbox/evidence/claude-egress.jsonl` は、検証済みで
  トークンを含まないガード監査のコピーです。

ログイン／設定用ボリュームを保持したまま、管理対象のコンテナとネットワークを停止します。

```bash
./scripts/devin-bridge/clean
```

名前付きボリュームを含む、ブリッジが所有する環境全体を削除します。

```bash
./scripts/devin-bridge/clean --all
```

## 制限事項

- Devin CLI `3000.2.17` は、ツールを使用しない中立的な ACP エージェントを公開していないため、
  ブリッジは固定されたツールなしの `summarizer` ロールに依存しています。アダプターは要約形式の
  中間レスポンスを補正しますが、1 回に制限された修復処理でも明示的に失敗する可能性があります。
- ライブ ACP 呼び出しでは、一時的な `502`/`504` レスポンスが返される場合があります。ハーネスは
  シナリオ間に間隔を設けますが、失敗が継続する場合はフェイルクローズとなり、別のプロバイダーが
  選択されることはありません。
- ACP コンテキストは、Anthropic への各リクエストから再構築されます。プロセス／セッションへの
  アフィニティはありません。
- モデルレスポンスごとに 1 回のツール呼び出しがサポートされます。並列呼び出しは拒否されます。
- 画像は明示的にサポートされていません。ビジョン、思考出力、effort 制御、100 万トークンの
  コンテキストウィンドウは提供機能として通知されません。
- SSE では有効な Anthropic ライフサイクルイベントを使用しますが、上限付き ACP ターンの収集後に
  送出されます。ACP チャンクは逐次転送されません。
