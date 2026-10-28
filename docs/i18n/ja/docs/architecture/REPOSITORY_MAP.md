# Repository Map (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **各ディレクトリとルートファイルの1行説明。**
> 最終更新日: 2026-06-28 — OmniRoute v3.8.40
>
> このマップを使用して、コードベース内をすばやく移動できます。詳しく調べる場合は、専用ドキュメントへのリンクを参照してください。

## トップレベルツリー

```
OmniRoute/
├── src/                  # Next.js 16アプリケーション（UI + APIルート + ライブラリ + ドメイン + サーバー）
├── open-sse/             # ストリーミングエンジンのワークスペース（ハンドラー、エグゼキューター、トランスレーター、MCPサーバー）
├── packages/            # npmワークスペース: ui-kit（ベンダー提供のKeak CI UI Kit）とbrowser-pool
├── electron/             # デスクトップラッパー（Electron 41 + electron-builder 26.10）
├── bin/                  # CLIエントリーポイントとコマンドハンドラー
├── scripts/              # ビルド、チェック、同期、単発スクリプト
├── docs/                 # 公開ドキュメント（現在の場所）
├── tests/                # すべてのテストスイート（ユニット、統合、e2e、プロトコルクライアント）
├── public/               # Next.jsの静的アセット、PWAマニフェスト、サービスワーカー、アイコン
├── config/               # 静的設定 + 品質ゲートの状態（i18n、payloadRules、quality/）
├── images/               # マーケティング用 / README用の画像アセット
├── @omniroute/           # 公開可能な関連パッケージ（opencode-plugin、opencode-provider）
├── skills/               # CLI/エージェント用スキルパック（cli-* + omni-* + config-codex-cli）
├── examples/             # サンプルプラグイン + omniroute-cmd-helloスターター
├── contrib/              # コミュニティによるコントリビューション（podman/）
├── .source/              # Fumadocsのソース設定（source.config.mjs + server/browser/dynamic）
├── .github/              # GitHub Actionsワークフロー + Issueテンプレート + PRテンプレート
├── .husky/               # Gitフック（pre-commit、pre-push）
├── .claude/              # Claude Codeのスラッシュコマンド（プロジェクトスコープ）
├── .agents/              # Codex / 汎用エージェントのワークフロー + スキル（.claude/のミラー）
├── .vscode/              # VS Codeワークスペース設定
├── _ideia/               # 計画メモ（非公式。配布対象外）
├── _mono_repo/           # 過去のサブプロジェクト（cloud、site、vscode-extension）
├── _references/          # 関連OSSプロジェクトから取得した読み取り専用の参照クローン
├── _tasks/               # リリースごとのタスク追跡ファイル（非公式）
├── .build/ .worktrees/ dist/   # ローカルビルド / git-worktree / ビルド出力用の一時領域（Git管理対象外）
├── .issues/              # ローカルIssueキャッシュ（Git管理対象外）
├── .playwright-mcp/      # Playwright MCPのテスト成果物
├── coverage/             # c8のカバレッジ出力（Git管理対象外）
├── logs/                 # ランタイムログ（Git管理対象外）
├── node_modules/         # 依存関係（Git管理対象外）
├── package/              # npm packのステージング領域（ビルド成果物）
├── .next/                # Next.jsのビルド出力（Git管理対象外）
└── (ルートファイル — 以下を参照)
```

---

## ルートファイル

| ファイル                                    | 目的                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **README.md**                               | マーケティング用ランディングページ + クイックスタート + 機能マトリクス（`llm.txt` も参照）      |
| **CHANGELOG.md**                            | リリースごとの変更履歴（`/version-bump-cc` スキルによる自動生成）                               |
| **LICENSE**                                 | MIT ライセンスの本文                                                                            |
| **CLAUDE.md**                               | Claude Code エージェント向けのプロジェクトルール（厳格なルール、規約、シナリオ）                |
| **AGENTS.md**                               | CLAUDE.md の非 Claude AI エージェント向け版（Codex、Cursor など）                               |
| **GEMINI.md**                               | Gemini ベースのエージェント向けの簡潔なルール（CLAUDE.md のサブセット）                         |
| **CONTRIBUTING.md**                         | コントリビューターガイド：セットアップ、Conventional Commits、テスト、PR フロー                 |
| **SECURITY.md**                             | 脆弱性の報告ポリシー、サポート対象バージョン、脅威モデル                                        |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — コミュニティで期待される行動                                             |
| **llm.txt**                                 | LLM クローラー向けに最適化されたプレーンテキストのランディングページ（AI アシスタント向け SEO） |
| **package.json**                            | npm マニフェスト、スクリプト、依存関係、エンジン、c8 カバレッジゲート                           |
| **package-lock.json**                       | ロックされた依存関係ツリー                                                                      |
| **tsconfig.json**                           | ルート TypeScript 設定                                                                          |
| **tsconfig.typecheck-core.json**            | `src/` コア用の型チェック設定                                                                   |
| **tsconfig.typecheck-noimplicit-core.json** | 厳格な（`noImplicitAny`）型チェック                                                             |
| **tsconfig.tsbuildinfo**                    | TS インクリメンタルビルドキャッシュ（gitignore 対象）                                           |
| **next.config.mjs**                         | Next.js 16 のビルド設定（スタンドアロン出力）                                                   |
| **next-env.d.ts**                           | Next.js が自動生成する環境型定義                                                                |
| **eslint.config.mjs**                       | ESLint フラット設定（プロジェクト領域ごとのルール）                                             |
| **prettier.config.mjs**                     | Prettier のフォーマットルール                                                                   |
| **postcss.config.mjs**                      | Tailwind/CSS パイプライン用の PostCSS 設定                                                      |
| **playwright.config.ts**                    | Playwright E2E テスト設定                                                                       |
| **vitest.config.ts**                        | Vitest 設定（デフォルトスイート）                                                               |
| **vitest.mcp.config.ts**                    | MCP サーバー / autoCombo / キャッシュスイート用の Vitest 設定                                   |
| **sonar-project.properties**                | SonarQube/SonarCloud 設定（コード品質）                                                         |
| **Dockerfile**                              | マルチステージ Docker ビルド（builder → runner-base → runner-cli）                              |
| **docker-compose.yml**                      | 4 つのプロファイル（base、cli、host、cliproxyapi）+ redis サイドカーを含む開発用 compose        |
| **docker-compose.prod.yml**                 | 本番環境用 compose（ポート 20130、redis、名前付きボリューム）                                   |
| **.dockerignore**                           | Docker コンテキストから除外されるファイル                                                       |
| **fly.toml**                                | Fly.io デプロイ設定（リージョン `sin`、ポート 20128、/data ボリューム）                         |
| **.env.example**                            | 環境ファイルのテンプレート（初回インストール時に `.env` へ自動コピー）                          |
| **.gitignore**                              | Git の無視パターン                                                                              |
| **.npmignore**                              | npm 公開時の除外リスト                                                                          |
| **.npmrc**                                  | npm 設定（レジストリ、ロックファイルポリシー）                                                  |
| **.node-version**                           | Node の固定バージョン（nvm 互換ツールで使用）                                                   |
| **.nvmrc**                                  | nvm 用の Node 固定バージョン                                                                    |
| **eslint.complexity.config.mjs**            | 複雑度ラチェット用の ESLint 設定（`scripts/check/check-complexity.mjs --config`）               |
| **eslint.sonarjs.config.mjs**               | SonarJS ルール用の ESLint 設定（認知的複雑度 / 重複）                                           |
| **source.config.ts**                        | Fumadocs の `defineDocs` ソース設定（`.source/` への入力）                                      |
| **knip.json**                               | Knip 設定 — 未使用のファイル / エクスポート / 依存関係（デッドコードゲートへの入力）            |
| **stryker.conf.json**                       | Stryker ミューテーションテスト設定                                                              |
| **.size-limit.json**                        | size-limit バンドル予算設定                                                                     |
| **promptfooconfig.yaml**                    | promptfoo 評価設定                                                                              |
| **.gitleaks.toml**                          | gitleaks シークレットスキャンルールセット                                                       |
| **.zizmor.yml**                             | zizmor GitHub Actions セキュリティリント設定                                                    |
| **socket.yml**                              | Socket.dev サプライチェーン設定                                                                 |
| **news.json**                               | ローカライズされた v2 お知らせフィード。Radar のリリース項目は非アクティブな状態で提供          |
| **flake.nix** / **flake.lock**              | Nix 開発シェル定義とロック                                                                      |
| **.env**                                    | ローカルシークレット（gitignore 対象 — `.env.example` から生成）                                |

> **v3.8.26 でルート外へ移動（整理）：**
>
> - **→ `config/quality/`：** `quality-baseline.json`、`complexity-baseline.json`、`duplication-baseline.json`、`file-size-baseline.json`、`test-discovery-baseline.json`、`dependency-allowlist.json`、`.license-allowlist.json`、および生成される `quality-metrics.json`（gitignore 対象）。[`## config/`](#config--static-configs--quality-gate-state)を参照してください。

---

## `src/` — Next.js アプリケーション

```
src/
├── app/                 # App Router（ページ + API ルート + ステータスページ + ランディングページ）
├── lib/                 # コアライブラリ / ドメインモジュール（80 個のサブディレクトリ + 約 70 個のトップレベルファイル）
├── domain/              # 純粋なドメインロジック（ポリシーエンジン、フォールバック、コスト、ロックアウト、comboResolver、アセスメント）
├── server/              # サーバー専用モジュール（認可パイプライン、CORS、認証ミドルウェア）— クライアントからインポート不可
├── shared/              # 安全な範囲でサーバーとクライアント間で共有（定数、型、バリデーション、コントラクト、ユーティリティ）
├── i18n/                # next-intl 設定 + ロケールごとのメッセージ JSON（67 ロケール）
├── middleware/          # Next.js ミドルウェア（リクエスト情報の拡充、ロケール検出）
├── mitm/                # MITM プロキシのコア：証明書の生成/インストール、ハンドラー、ターゲット、インスペクター、マスク、パススルー
│   ├── handlers/        # MitmHandlerBase を拡張する 9 個の IDE エージェント用ハンドラークラス（antigravity、kiro、copilot、codex、cursor、zed、claudeCode、openCode、trae）
│   └── inspector/       # トラフィックキャプチャ層：buffer（インメモリリング）、sseMerger、conversationNormalizer、kindDetector、contextKey、httpProxyServer、systemProxyConfig
├── models/              # モデルアダプターの連携コード（レガシーシム）
├── scripts/             # ツリー内のメンテナンススクリプト（例：backfillAggregation）
├── sse/                 # レガシー SSE ハンドラー/サービス（chat.ts、chatHelpers.ts、services/auth.ts）
├── store/               # レガシーのインメモリストア（src/lib/db へ段階的に移行中）
├── types/               # 共有 TS 型ファイル
├── instrumentation.ts   # Next.js テレメトリフック（ブラウザー + Edge）
├── instrumentation-node.ts  # Node 専用インストルメンテーション
└── proxy.ts             # HTTP プロキシのエントリーシム
```

### `src/app/` — App Router（Next.js 16）

| Path                                                                         | 目的                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | 公開 OpenAI 互換 API（約25個のサブルート：チャット、補完、埋め込み、ファイル、バッチ、音声、画像、動画、音楽、再ランキング、モデレーション、検索、ws、エージェント、アカウント、プロバイダーなど）                                                                                                                             |
| `app/api/v1beta/`                                                            | Gemini 形式の API エンドポイント                                                                                                                                                                                                                                                                                               |
| `app/api/playground/`                                                        | Playground Studio のルート：`improve-prompt/`（POST — LLM プロンプトリライター）、`presets/`（GET による一覧取得 / POST による作成）、`presets/[id]/`（GET / PUT / DELETE）— `docs/frameworks/PLAYGROUND_STUDIO.md` を参照                                                                                                     |
| `app/api/` (non-v1)                                                          | 管理用ルート（約60個のディレクトリ：プロバイダー、コンボ、設定、mcp、a2a、評価、メモリ、スキル、Webhook、コンプライアンス、レジリエンス、監視、トンネル、CLI ツールなど）                                                                                                                                                      |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12個のルート（サーバー制御、エージェントの状態/DNS/マッピング、バイパス、証明書、アップストリーム CA）。LOCAL_ONLY + SPAWN_CAPABLE。`docs/frameworks/AGENTBRIDGE.md §7` を参照。                                                                                                                        |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16個以上のルート（リクエスト、セッション、ホスト、キャプチャモード、エクスポート、ws）。LOCAL_ONLY + SPAWN_CAPABLE。`docs/frameworks/TRAFFIC_INSPECTOR.md §8` を参照。                                                                                                                       |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 エントリーポイント（`POST /a2a`）                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | A2A Agent Card（ディスカバリー）                                                                                                                                                                                                                                                                                               |
| `app/(dashboard)/dashboard/`                                                 | ダッシュボード UI ページ（50以上のセクション、約118個の page.tsx ファイル：プロバイダー、コンボ、設定、メモリ、スキル、Webhook、評価、監査、バッチ、キャッシュ、コスト、ヘルス、システム、アクティビティなど）                                                                                                                 |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI（3つのタブ：検索/スクレイピング/比較 + SearchConceptCard + ProviderCatalog）— `docs/frameworks/SEARCH_TOOLS_STUDIO.md` を参照                                                                                                                                                                           |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio（プラン21）：`page.tsx`（3タブ構成のシェル）、`components/`（MemoryConceptCard、MemoryEngineStatus、EmbeddingSourceSelector、EditMemoryModal、RetrievePreview、QdrantConfigCard、RerankConfigCard）、`components/tabs/`（MemoriesTab、PlaygroundTab、EngineTab）、`hooks/`（useEngineStatus、useMemorySettings） |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge ダッシュボードページ — サーバーカード、9個のエージェントカード、セットアップウィザード、モデルマッピング、バイパスリスト。i18n は PT-BR + EN に対応。`docs/frameworks/AGENTBRIDGE.md` を参照。                                                                                                                     |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector ダッシュボードページ — DevTools 分割ビュー、7つの詳細タブ、4つのキャプチャモード切り替え、セッションレコーダー、コンテキストの色分け。i18n は PT-BR + EN に対応。`docs/frameworks/TRAFFIC_INSPECTOR.md` を参照。                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | アクティビティフィードページ（グループB）：`page.tsx`（サーバー）+ `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — `docs/architecture/MONITORING_SECTIONS.md` を参照                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | クォータ共有ページ（グループB）：`QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                   |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | プロバイダープラン設定ページ（グループB）：`page.tsx` + `ProviderPlanConfigClient.tsx` — 接続ごとにクォータディメンションをオーバーライド                                                                                                                                                                                      |
| `app/docs/`                                                                  | 組み込みドキュメントビューアー（`docs/*.md` をレンダリング）                                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | マーケティングランディングページ                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | 認証関連ページ                                                                                                                                                                                                                                                                                                                 |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTPエラーページ                                                                                                                                                                                                                                                                                                               |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | 静的／ステータスページ                                                                                                                                                                                                                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | ルートレイアウト、ホーム、PWAマニフェスト、グローバルCSS                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | エラーバウンダリ                                                                                                                                                                                                                                                                                                               |

### `src/lib/` — コアライブラリ（約50モジュール）

| モジュール                               | 目的                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A プロトコルのタスクマネージャー、スキル（5）、ストリーミング                                                                                                                                                                                                                                                                   |
| `acp/`                                   | CLI エージェントレジストリ（ローカル CLI の検出 — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md` を参照）                                                                                                                                                                                                                             |
| `api/`                                   | 共有 API ヘルパー（`requireManagementAuth`、バリデーション）                                                                                                                                                                                                                                                                      |
| `auth/`                                  | セッション、パスワードのハッシュ化、トークンの検証                                                                                                                                                                                                                                                                                |
| `batches/`                               | OpenAI Batches API ハンドラー                                                                                                                                                                                                                                                                                                     |
| `catalog/`                               | プロバイダーカタログの Zod バリデーション + ケイパビリティ解決                                                                                                                                                                                                                                                                    |
| `cloudAgent/`                            | クラウドエージェント（Codex Cloud、Devin、Jules）— `docs/frameworks/CLOUD_AGENT.md` を参照                                                                                                                                                                                                                                        |
| `combos/`                                | コンボ解決 + 並べ替えヘルパー                                                                                                                                                                                                                                                                                                     |
| `audit/`                                 | アクティビティフィードのヘルパー：`highLevelActions.ts`（許可リスト + `isHighLevelAction()`）、`activityIcons.ts`（アクション → アイコン／動詞のマッピング）、`timeline.ts`（groupByDay/relativeTime）— `docs/architecture/MONITORING_SECTIONS.md` を参照                                                                         |
| `compliance/`                            | 監査ログ + プロバイダー監査 — `docs/security/COMPLIANCE.md` を参照                                                                                                                                                                                                                                                                |
| `compression/`                           | 圧縮エンジンのグルーコード（エンジンは `open-sse/services/compression/` に配置）                                                                                                                                                                                                                                                  |
| `config/`                                | ランタイム設定ヘルパー                                                                                                                                                                                                                                                                                                            |
| `db/`                                    | 120 以上のドメイン DB モジュール + 168 件のマイグレーション（SQLite へのアクセスには必ずここを経由）                                                                                                                                                                                                                              |
| `quota/`                                 | クォータ共有エンジン：`dimensions.ts`（型／Zod）、`types.ts`（QuotaStore インターフェース）、`sqliteQuotaStore.ts`、`redisQuotaStore.ts`、`storeFactory.ts`、`fairShare.ts`、`burnRate.ts`、`planResolver.ts`、`planRegistry.ts`、`saturationSignals.ts`、`enforce.ts`、`spendRecorder.ts` — `docs/routing/QUOTA_SHARE.md` を参照 |
| `radar/`                                 | Radar 無料モデルカタログクライアント：`feedSchema.ts`、`pinnedKeys.ts`、`verify.ts`、`sync.ts`、`applyFeed.ts`、`index.ts`（`getRadarCatalog()`）— `docs/frameworks/RADAR.md` を参照                                                                                                                                              |
| `display/`                               | UI フォーマット用ヘルパー（コスト、レイテンシなど）                                                                                                                                                                                                                                                                               |
| `embeddings/`                            | Embeddings サービス用ヘルパー                                                                                                                                                                                                                                                                                                     |
| `env/`                                   | 環境変数の解析と検証                                                                                                                                                                                                                                                                                                              |
| `evals/`                                 | Eval フレームワーク（スイート、ランナー、ランタイム）— `docs/frameworks/EVALS.md` を参照                                                                                                                                                                                                                                          |
| `guardrails/`                            | PII マスカー、プロンプトインジェクション、ビジョンブリッジ — `docs/security/GUARDRAILS.md` を参照                                                                                                                                                                                                                                 |
| `jobs/`                                  | バックグラウンドジョブ（cron 形式）                                                                                                                                                                                                                                                                                               |
| `memory/`                                | 会話メモリ（SQLite FTS5 + sqlite-vec ハイブリッド RRF + Qdrant ティア 2）— `docs/frameworks/MEMORY.md` を参照                                                                                                                                                                                                                     |
| `memory/embedding/`                      | マルチソース Embedding レイヤー：`index.ts`（リゾルバー）、`remote.ts`、`staticPotion.ts`、`transformersLocal.ts`、`cache.ts`、`types.ts`（プラン 21）                                                                                                                                                                            |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 ラッパー — KNN 総当たり検索 + ハイブリッド RRF（FTS5 + ベクトル、k=60）。遅延初期化を行い、sqlite-vec が利用できない場合も適切に縮退します。（プラン 21）                                                                                                                                                       |
| `memory/reindex.ts`                      | `runReindexBatch()` — バックグラウンドで `needs_reindex=1` のメモリを処理します。`POST /api/memory/reindex` および遅延バックフィル経路から呼び出されます。（プラン 21）                                                                                                                                                           |
| `monitoring/`                            | ヘルスチェック、メトリクス送信                                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | 22 個のプロバイダーモジュール向け OAuth／インポートフロー（agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、grok-cli、kilocode、kimi-coding、kiro、openference、qoder、trae、xai-oauth、zed-hosted、zed）                                            |
| `plugins/`                               | プラグインレジストリ                                                                                                                                                                                                                                                                                                              |
| `promptCache/`                           | Anthropic 形式のプロンプトキャッシュブレークポイント                                                                                                                                                                                                                                                                              |
| `skills/`                                | Skills フレームワーク（組み込み + マーケットプレイス + SkillsSH）— `docs/frameworks/SKILLS.md` を参照                                                                                                                                                                                                                             |
| `playground/`                            | Playground Studio の共有ヘルパー：`codeExport.ts`（curl/Python/TS ジェネレーター）、`promptImprover.ts`（メタプロンプトビルダー）、`streamMetrics.ts`（純粋な TTFT/TPS）、`types.ts`（料金表）— `docs/frameworks/PLAYGROUND_STUDIO.md` を参照                                                                                     |
| `webhookDispatcher.ts`                   | HMAC Webhook 配信 — `docs/frameworks/WEBHOOKS.md` を参照                                                                                                                                                                                                                                                                          |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | トンネルマネージャー — `docs/ops/TUNNELS_GUIDE.md` を参照                                                                                                                                                                                                                                                                         |
| `cloudSync.ts`, `initCloudSync.ts`       | オプションの状態クラウド同期                                                                                                                                                                                                                                                                                                      |
| `localDb.ts`                             | db モジュール用の再エクスポートバレル（ロジックなし — 再エクスポートのみ）                                                                                                                                                                                                                                                        |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | リクエストキャッシュ + 冪等性                                                                                                                                                                                                                                                                                                     |
| （その他約30個のトップレベルファイル）   | 専用ヘルパー（logEnv、modelsDevSync、piiSanitizer など）                                                                                                                                                                                                                                                                          |

### `src/lib/db/` — データベース（147モジュール + 208マイグレーション）

| サブディレクトリ          | 目的                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | WAL ジャーナリングを使用する `getDbInstance()` シングルトン                                                                                                                         |
| `db/migrations/`          | バージョン管理された SQL ファイル（冪等かつトランザクショナル）。`073_memory_vec.sql` は `memory_vec_meta` + `needs_reindex` カラムを追加（プラン21）。                             |
| `db/playgroundPresets.ts` | Playground Studio プリセット用 CRUD モジュール（`listPlaygroundPresets`、`getPlaygroundPreset`、`createPlaygroundPreset`、`updatePlaygroundPreset`、`deletePlaygroundPreset`）      |
| `db/memoryVec.ts`         | `memory_vec_meta`（active_dim、embedding_signature、last_reset_at、vec_loaded）の CRUD + `markMemoryNeedsReindex`、`getMemoryReindexQueue` など（プラン21）                         |
| `db/<domain>.ts`          | ドメインごとに1つのモジュール：providers、combos、apiKeys、users、sessions、usage、audit*log、webhooks、skills、memory_entries、cloud_agent_tasks、evals*\*、reasoning_cache など。 |

### `src/domain/`

| モジュール             | 目的                                          |
| ---------------------- | --------------------------------------------- |
| `policy.ts`            | ポリシーエンジン                              |
| `fallbackPolicy.ts`    | フォールバック決定木                          |
| `costRules.ts`         | コスト計算ルール                              |
| `lockoutPolicy.ts`     | モデル/接続のロックアウトポリシー             |
| `tagRouter.ts`         | タグベースのルーティング                      |
| `comboResolver.ts`     | コンボ解決（コンボエンジンで使用）            |
| `modelAvailability.ts` | モデルごとの可用性チェック                    |
| `assessment/`          | モデル評価（RFC-AUTO-ASSESSMENT のフェーズ1） |

### `src/server/`

| モジュール | 目的                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `authz/`   | 認可パイプライン：`classify` → `policies` → `enforce` — `docs/architecture/AUTHZ_GUIDE.md` を参照 |
| `cors/`    | CORS 設定                                                                                         |
| `auth/`    | セッションミドルウェア                                                                            |

### `src/shared/`

| モジュール                       | 目的                                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `components/`                    | ダッシュボードコンポーネント API：`packages/ui-kit` のアダプター — `docs/architecture/DESIGN_SYSTEM.md` を参照 |
| `constants/iconMap.ts`           | `ICON_MAP`：画面で使用されるアイコン名 → Lucide コンポーネント（`<Icon>`）                                     |
| `constants/providers.ts`         | Zod バリデーション付きの **376 プロバイダー**（信頼できる唯一の情報源）                                        |
| `constants/cliTools.ts`          | 外部 CLI ツールレジストリ                                                                                      |
| `constants/routingStrategies.ts` | 優先度付きの **20 ルーティング戦略**                                                                           |
| `constants/publicApiRoutes.ts`   | （管理認証ではなく）Bearer 認証を必要とするルート                                                              |
| `constants/upstreamHeaders.ts`   | アップストリームリクエスト用ヘッダーの拒否リスト                                                               |
| `validation/schemas.ts`          | 約 80 個の Zod スキーマ（API コントラクトの信頼できる唯一の情報源）                                            |
| `validation/helpers.ts`          | Zod バリデーションヘルパー（`validateBody` など）                                                              |
| `types/`                         | 共有 TS 型                                                                                                     |
| `contracts/`                     | 公開 API コントラクト（`package.json` 内の `files:` から使用）                                                 |
| `utils/circuitBreaker.ts`        | プロバイダーのサーキットブレーカー（`docs/architecture/RESILIENCE_GUIDE.md` を参照）                           |
| `utils/apiAuth.ts`               | API キーの検証、スコープの確認                                                                                 |
| `utils/fetchTimeout.ts`          | アップストリーム fetch 用のタイムアウト／中止ラッパー                                                          |
| `utils/releaseNotes.ts`          | 終了済みの v2／レガシー告知のパーサー、ローカライズ、および ID による非表示処理                                |

---

## `open-sse/` — ストリーミングエンジンワークスペース

独立した npm ワークスペース（`@omniroute/open-sse`）。リクエスト処理とプロバイダー実行を担当します。

```
open-sse/
├── handlers/            # 16ファイル（12個のハンドラー + 4個のヘルパー）：chatCore、responsesHandler、embeddings、audio、image、video、music、rerank、moderations、searchなど
├── executors/           # 150個のエグゼキューターモジュール（BaseExecutorを拡張するクラス + プロバイダーごとのヘルパー）
├── translator/          # フォーマットコンバーター（リクエスト用9個、レスポンス用9個、ヘルパー9個）
├── transformer/         # Responses API ↔ Chat Completions（TransformStream）
├── services/            # 約80以上のサービスモジュール（combo、accountFallback、autoCombo、reasoningCache、claude code/chatgpt stealth、modelDeprecation、taskAwareRouter、workflowFSMなど）
├── mcp-server/          # MCPサーバー（110個のツール、3種類のトランスポート、33個のスコープ）
├── config/              # プロバイダー／モデルレジストリ、ヘッダー設定、モデルエイリアス
├── utils/               # TLSクライアント、プロキシfetch／dispatcher、ネットワークヘルパー
├── index.ts             # ワークスペースエントリ
├── package.json         # ワークスペースマニフェスト
├── tsconfig.json        # ワークスペースのTS設定
└── types.d.ts           # ワークスペースの型宣言
```

### `open-sse/mcp-server/`

| パス                        | 目的                                                                     |
| --------------------------- | ------------------------------------------------------------------------ |
| `server.ts`                 | MCPサーバーのライフサイクル（stdio + HTTPトランスポート）                |
| `httpTransport.ts`          | HTTP Streamable + SSEトランスポート（`/api/mcp/sse`、`/api/mcp/stream`） |
| `audit.ts`                  | `mcp_tool_audit`テーブルへの監査ログ記録                                 |
| `scopeEnforcement.ts`       | ツールごとのスコープ検証                                                 |
| `runtimeHeartbeat.ts`       | `DATA_DIR/runtime/mcp-heartbeat.json`へのヘルスハートビート              |
| `descriptionCompressor.ts`  | コンテキストを節約するためのツール説明メタデータの圧縮                   |
| `schemas/tools.ts`          | 36個の基本ツール定義 + スコープ                                          |
| `tools/advancedTools.ts`    | 高度なツールの実装                                                       |
| `tools/memoryTools.ts`      | 3個のメモリツール（検索／追加／クリア）                                  |
| `tools/skillTools.ts`       | 4個のスキルツール（一覧／有効化／実行／実行履歴）                        |
| `tools/compressionTools.ts` | 5個の圧縮ツール                                                          |
| `README.md`                 | 内部MCPサーバーREADME（`docs/frameworks/MCP-SERVER.md`から相互リンク）   |

---

## `packages/` — ワークスペース

| パス                     | 目的                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — Keak CI UI Kitのベンダー提供スナップショット（`private`、`UNLICENSED`）。ソースとして利用されます（ビルドなし）。`UPSTREAM.md`はアップストリームのコミットを固定し、ライセンス承認を記録します。`PATCHES.md`はローカルパッチの一覧です（現在はなし）。`src/`は`scripts/dev/sync-ui-kit.sh`によってのみ同期され、`npm run check:ui-kit-snapshot`によって保護されます。`docs/architecture/DESIGN_SYSTEM.md`を参照してください |
| `packages/browser-pool/` | `@omniroute/browser-pool` — オプションのブラウザプールサービス（CloakBrowserおよびPlaywrightベースのチャット）                                                                                                                                                                                                                                                                                                                                    |

---

## `electron/` — デスクトップラッパー

| ファイル         | 目的                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------- |
| `main.js`        | Electron メインプロセス（BrowserWindow、組み込み Next.js サーバー、トレイ、自動更新） |
| `preload.js`     | IPC ブリッジ（contextBridge → `window.omniroute`）                                    |
| `package.json`   | electron-builder の設定 + Electron 41 + electron-builder 26.10 の依存関係             |
| `assets/`        | アプリアイコン（Windows .ico、macOS .icns、Linux .png）                               |
| `dist-electron/` | ビルド出力（gitignore 対象）                                                          |
| `types.d.ts`     | レンダラーブリッジの型宣言                                                            |
| `README.md`      | Electron の内部 README（`docs/guides/ELECTRON_GUIDE.md` も参照）                      |

---

## `bin/` — CLI

| ファイル                                                                                                    | 目的                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | CLI のメインエントリ — `omniroute serve`、`omniroute setup`、`omniroute doctor`、`omniroute providers`、`omniroute combos` など |
| `reset-password.mjs`                                                                                        | スタンドアロンのパスワードリセット CLI                                                                                          |
| `cli/commands/setup.mjs`                                                                                    | 対話式 + 非対話式のセットアップウィザード                                                                                       |
| `cli/commands/doctor.mjs`                                                                                   | システムヘルス診断（8 項目以上のチェック）                                                                                      |
| `cli/commands/providers.mjs`                                                                                | プロバイダーの一覧表示／テスト／検証                                                                                            |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI ヘルパーモジュール                                                                                                          |
| `cli/tray/tray.ts`                                                                                          | システムトレイ統合（クロスプラットフォーム：Windows では NotifyIcon、macOS/Linux では systray2）                                |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon バックエンド（Windows、新しいバイナリは不要）                                                             |
| `cli/tray/autostart.ts`                                                                                     | クロスプラットフォームの自動起動（LaunchAgent / .desktop / レジストリ）                                                         |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 段階の SQLite ドライバー解決チェーン（バンドル版 → ランタイム版 → 遅延インストール → node:sqlite → sql.js）                   |
| `cli/runtime/magicBytes.mjs`                                                                                | バイナリのマジックバイト検証（ELF / Mach-O / Mach-O fat / PE）                                                                  |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — postinstall 時または初回起動時にドライバーを事前解決                                                       |
| `nodeRuntimeSupport.mjs`                                                                                    | インストール時にサポート対象の Node.js バージョンを検証                                                                         |

---

## `skills/` — 公開エージェントスキル

| ファイル                     | 目的                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `skills/omniroute*/SKILL.md` | 外部AIエージェント（Claude Desktop、ChatGPT、Cursor、Cline）向けの10個のスキルマニフェスト |

---

## `scripts/` — ビルド＆チェックスクリプト

| スクリプト                          | 目的                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | 環境変数を読み込む開発／起動ランナー                                                             |
| `build-next-isolated.mjs`           | スタンドアロンビルド（Next.js 16スタンドアロン）                                                 |
| `prepublish.ts`                     | `npm pack` 前のパッケージ準備                                                                    |
| `postinstall.mjs`                   | 初回インストール時に `.env.example` から `.env` を自動作成                                       |
| `sync-env.mjs`                      | `.env` のキーを `.env.example` と再同期                                                          |
| `check-cycles.mjs`                  | 循環依存関係を検出                                                                               |
| `check-route-validation.mjs`        | すべてのAPIルートにZodバリデーションがあることを検証                                             |
| `check-t11-any-budget.mjs`          | ファイルごとに明示的な `any` の上限を適用                                                        |
| `check-docs-sync.mjs`               | ドキュメントのバージョン同期を検証（既存のpre-commit）                                           |
| **`check-env-doc-sync.mjs`**        | 新規：コード内の環境変数、`.env.example`、`ENVIRONMENT.md` を相互照合                            |
| **`check-docs-counts-sync.mjs`**    | 新規：件数（エグゼキューター、戦略、OAuth、A2Aスキル）がドキュメントと一致することを検証         |
| **`check-deprecated-versions.mjs`** | 新規：ドキュメント内の古いバージョン／日付を検出                                                 |
| `check-supported-node-runtime.ts`   | 現在のNodeバージョンがサポート対象であることを検証                                               |
| `check-pr-test-policy.mjs`          | 本番コード変更に「テスト必須」ルールを適用                                                       |
| **`gen-provider-reference.ts`**     | 新規：カタログから `docs/reference/PROVIDER_REFERENCE.md` を自動生成                             |
| `i18n/generate-multilang.mjs`       | Google Translateを使用してUI文字列とドキュメントを翻訳                                           |
| `i18n_autotranslate.py`             | LLMベースのドキュメント翻訳パイプライン                                                          |
| `validate_translation.py`           | ロケールごとの翻訳検証                                                                           |
| `check_translations.py`             | コード側のi18nキーをチェック                                                                     |
| `run-playwright-tests.mjs`          | Playwright E2Eランナー                                                                           |
| `run-protocol-clients-tests.mjs`    | MCP／A2A E2Eランナー                                                                             |
| `run-ecosystem-tests.mjs`           | エコシステム（プロバイダー統合）テスト                                                           |
| `test-report-summary.mjs`           | カバレッジ概要のMarkdownを生成                                                                   |
| `smoke-electron-packaged.mjs`       | パッケージ化されたElectronビルドのスモークテスト                                                 |
| `native-binary-compat.mjs`          | ネイティブ依存関係（`better-sqlite3`）がElectronのNodeと一致することを検証                       |
| `validate-pack-artifact.ts`         | npmパッケージの出力を検証                                                                        |
| `responses-ws-proxy.mjs`            | Codex Responses API用WebSocketブリッジ                                                           |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` エンドポイント用WebSocketブリッジ                                                   |
| `standalone-server-ws.mjs`          | スタンドアロンWSサーバーランナー                                                                 |
| `system-info.mjs`                   | サポート用にシステム／ランタイム情報を出力                                                       |
| `healthcheck.mjs`                   | 1回限りのヘルスチェック（Docker HEALTHCHECKで使用）                                              |
| `uninstall.mjs`                     | クリーンアンインストールスクリプト                                                               |
| `dev/sync-ui-kit.sh`                | 固定されたコミット時点のCI UI Kitの `src/` を `packages/ui-kit/src` にコピー                     |
| `check/check-ui-kit-snapshot.mjs`   | pre-commitゲート：`packages/ui-kit/src` が固定されたアップストリームコミットと一致することを検証 |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — 使用中だが `ICON_MAP` にマッピングされていないアイコン名                |
| `dev/codemod-material-icons.mjs`    | リテラルのMaterial Symbols spanを `<Icon>` に書き換え（移行ツール）                              |

---

## `docs/` — 公開ドキュメント(ルートファイル 7 件 + サブディレクトリ 17 件)

### トップレベルガイド

| ドキュメント                | 目的                                                                             |
| --------------------------- | -------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高レベルアーキテクチャ、サブシステムマップ、ダッシュボード画面                   |
| `CODEBASE_DOCUMENTATION.md` | エンジニアリングリファレンス:ディレクトリ、モジュール、規約                      |
| `FEATURES.md`               | v3.8 のハイライトを含む機能マトリックス                                          |
| `USER_GUIDE.md`             | エンドユーザーマニュアル(セットアップ、モデル、コンボ、CLI、オーディオなど)      |
| `API_REFERENCE.md`          | 認証モデルを含む API エンドポイントリファレンス                                  |
| `openapi.yaml`              | OpenAPI 3.0 仕様(121 パス)                                                       |
| `SETUP_GUIDE.md`            | インストール方法(npm、npx、Docker、Electron、Termux、ソース)                     |
| `ENVIRONMENT.md`            | すべての環境変数(約 800 件を文書化、`.env.example` は約 3,050 行)                |
| `TROUBLESHOOTING.md`        | 一般的なエラー + v3.8.0 の既知の問題                                             |
| `RELEASE_CHECKLIST.md`      | 完全なリリースフロー(skills、husky、conventional commits、デプロイ)              |
| `COVERAGE_PLAN.md`          | カバレッジ目標と現状                                                             |
| `FREE_TIERS.md`             | 厳選された無料枠プロバイダー(48+ の無料 + 11 の OAuth)                           |
| `CLI-TOOLS.md`              | 外部 CLI 統合 + 内部 OmniRoute CLI                                               |
| `I18N.md`                   | i18n アーキテクチャ、言語の追加、67 ロケール                                     |
| `UNINSTALL.md`              | クリーンなアンインストール手順                                                   |
| `PROVIDER_REFERENCE.md`     | 376 プロバイダーの**自動生成**カタログ(再生成: `npm run gen:provider-reference`) |

### サブシステム詳細解説

| ドキュメント                                | 目的                                                                             |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCP サーバー: 110 ツール、3 トランスポート、33 スコープ、REST エンドポイント     |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC、6 スキル、REST ヘルパー、エージェントカード                  |
| `AGENT_PROTOCOLS_GUIDE.md`                  | 統合ガイド: A2A vs ACP vs Cloud Agents                                           |
| `CLOUD_AGENT.md`                            | Codex Cloud / Devin / Jules オーケストレーション                                 |
| `SKILLS.md`                                 | Skills フレームワーク(組み込み + マーケットプレイス + SkillsSH + サンドボックス) |
| `RADAR.md`                                  | Radar 無料モデルカタログオーバーレイ(`RADAR_ENABLED`、デフォルトでオフ)          |
| `MEMORY.md`                                 | メモリシステム(SQLite FTS5 + Qdrant)                                             |
| `EVALS.md`                                  | 評価フレームワーク(スイート、実行、ルーブリック)                                 |
| `GUARDRAILS.md`                             | PII マスカー、プロンプトインジェクション、ビジョンブリッジ                       |
| `COMPLIANCE.md`                             | 監査ログ、保持、noLog オプトアウト                                               |
| `WEBHOOKS.md`                               | HMAC 署名付き Webhook 配信                                                       |
| `REASONING_REPLAY.md`                       | `reasoning_content` 用ハイブリッドメモリ/SQLite キャッシュ                       |
| `AUTHZ_GUIDE.md`                            | 認可パイプライン(`classify` → `policies` → `enforce`)                            |
| `RESILIENCE_GUIDE.md`                       | サーキットブレーカー + クールダウン + モデルロックアウト                         |
| `docs/security/STEALTH_GUIDE.md` (git のみ) | TLS フィンガープリンティング(JA3/JA4)、Claude Code CCH、MITM 証明書              |
| `AUTO-COMBO.md`                             | Auto Combo エンジン(16 ファクタースコアリング、6 モードパック、仮想ファクトリー) |

### 圧縮

| ドキュメント                    | 目的                                           |
| ------------------------------- | ---------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | 圧縮モードの概要 + ロードマップ                |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK エンジン、レジストリコントラクト |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman ルールパック JSON スキーマ             |
| `COMPRESSION_LANGUAGE_PACKS.md` | 言語別ルールパック一覧                         |
| `RTK_COMPRESSION.md`            | RTK 宣言型パイプライン(56 フィルター)          |

### デプロイメント

| ドキュメント                 | 目的                                                                      |
| ---------------------------- | ------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker ビルド、プロファイル (base/cli/host/cliproxyapi)、Redis サイドカー |
| `VM_DEPLOYMENT_GUIDE.md`     | 汎用 VM/VPS デプロイ (Ubuntu/Debian + nginx + systemd)                    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io デプロイ (現在は中国語のみ)                                        |
| `TERMUX_GUIDE.md`            | Termux による Android ヘッドレス実行                                      |
| `PWA_GUIDE.md`               | Progressive Web App のインストール + サービスワーカー                     |
| `ELECTRON_GUIDE.md`          | デスクトップアプリのビルド + 署名 + 配布                                  |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                    |
| `PROXY_GUIDE.md`             | 4 段階のアウトバウンドプロキシ + 1proxy マーケットプレイス                |

### サブディレクトリ

| サブディレクトリ      | 目的                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | ローカライズされたドキュメント翻訳 (41 ロケール)                                                                                                                                                                                           |
| `docs/screenshots/`   | ガイド用の画像アセット                                                                                                                                                                                                                     |
| `_tasks/superpowers/` | superpowers (`writing-plans`/`brainstorming`) からの計画/仕様 + リサーチ — 分離された個別にバージョン管理されるリポジトリで、メインツリーでは gitignore されています。CLAUDE.md → 「計画とリサーチのアーティファクト」を参照してください。 |

---

## `tests/` — テストスイート

| サブディレクトリ                     | 種類                                         | ランナー                                  |
| ------------------------------------ | -------------------------------------------- | ----------------------------------------- |
| `tests/unit/`                        | ユニットテスト（約4,800ファイル、最速）      | Node ネイティブテストランナー             |
| `tests/integration/`                 | 複数モジュール + DB 統合テスト               | Node ネイティブテストランナー（並行数 1） |
| `tests/e2e/`                         | UI + ワークフロー E2E                        | Playwright                                |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A 実クライアント E2E                 | カスタムプロトコルクライアント            |
| `tests/e2e/ecosystem.test.ts`        | プロバイダー統合（ネットワークアクセスあり） | Node ネイティブテストランナー             |

---

## `public/` — 静的アセット

| パス                | 用途                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| `public/`（ルート） | ファビコン、robots.txt、マニフェスト、Service Worker、マーケティング画像 |
| `public/providers/` | プロバイダーのロゴ PNG/SVG（ダッシュボードで使用）                       |

---

## `config/` — 静的設定 + 品質ゲートの状態

配布用の設定テンプレートと、コミット済みの品質ゲートベースライン
（ルートを簡潔に保つため、v3.8.26 でリポジトリのルートからここへ移動）。

| パス                                          | 用途                                                                                   |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | ロケール一覧 + メタデータ（42ロケールというカウントの正規ソース）                      |
| `config/i18n-schema.json`                     | `i18n.json` を検証する JSON スキーマ                                                   |
| `config/payloadRules.json`                    | アップストリームペイロードのサニタイズルール                                           |
| `config/quality/quality-baseline.json`        | 複数メトリクスのラチェットベースライン（`scripts/quality/check-quality-ratchet.mjs`）  |
| `config/quality/complexity-baseline.json`     | 固定された ESLint 複雑度ベースライン（`check-complexity.mjs`）                         |
| `config/quality/duplication-baseline.json`    | 固定された jscpd 重複ベースライン（`check-duplication.mjs`）                           |
| `config/quality/file-size-baseline.json`      | 固定されたファイル単位のサイズベースライン（`check-file-size.mjs`）                    |
| `config/quality/test-discovery-baseline.json` | 固定された孤立テストのベースライン（`check-test-discovery.mjs`）                       |
| `config/quality/dependency-allowlist.json`    | 承認済み依存関係の許可リスト（`check-deps.mjs`）                                       |
| `config/quality/.license-allowlist.json`      | SPDX ライセンス許可リスト（`check-licenses.mjs`）                                      |
| `config/quality/quality-metrics.json`         | 一時的に収集されるメトリクス（`collect-metrics.mjs` により生成、**Git の追跡対象外**） |

---

## `.github/` — GitHub 連携

| パス                               | 目的                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions の CI/CD ワークフロー（lint、テスト、カバレッジ、リリース） |
| `.github/ISSUE_TEMPLATE/`          | バグ／機能の Issue テンプレート                                            |
| `.github/pull_request_template.md` | PR テンプレート                                                            |
| `.github/dependabot.yml`           | 依存関係更新の設定                                                         |

---

## `.husky/` — Git フック

| ファイル     | 目的                                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged + check-docs-sync + check:any-budget:t11` を実行                    |
| `pre-push`   | 現在は無効（コメントアウト済み）。`npm run test:unit` を手動で実行してください。 |
| `_/`         | Husky の内部ファイル                                                             |

---

## `.claude/` — Claude Code スラッシュコマンド

| ファイル                                            | 目的                                                    |
| --------------------------------------------------- | ------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — バージョン更新＋変更履歴の自動生成 |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — 完全なリリースワークフロー     |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | VPS へデプロイ                                          |
| `commands/capture-release-evidences-cc.md`          | 新機能をブラウザで記録し、WebP として保存               |
| `commands/review-{prs,discussions}-cc.md`           | GitHub の PR／ディスカッションをトリアージ              |
| `commands/{review-issues,implement-features}-cc.md` | Issue ワークフロー                                      |
| `settings.local.json`                               | プロジェクト単位の Claude Code 設定                     |

---

## `.agents/` — 汎用エージェントワークフロー（Codex / Cursor / など）

| パス                     | 目的                                                    |
| ------------------------ | ------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 個のワークフロー定義（`.claude/commands/` のミラー） |
| `skills/<name>/SKILL.md` | Codex 実行ノートを含む 9 個のスキル定義                 |

> **注:** 現在、ワークフローとコマンドはバイト単位で同一です。`.agents/` が異なるエージェントランタイム（Codex）を対象としているのであれば、それぞれの差異を明確かつ有意なものにする必要があります。

---

## `_ideia/`、`_mono_repo/`、`_references/`、`_tasks/` — ツリー外

これらのアンダースコアで始まるディレクトリには、配布対象外のコンテンツが格納されています。

- **`_ideia/`** — 設計メモ（defer / notfit / viable カテゴリ）
- **`_mono_repo/`** — 過去のサブプロジェクト（omnirouteCloud、omnirouteSite、vscode-extension）
- **`_references/`** — 開発時の相互参照用に用意された、関連 OSS プロジェクト（LiteLLM、9router、ClawRouter、CLIProxyAPI、modelrelay、new-api など）の読み取り専用クローン
- **`_tasks/`** — リリースごとのタスク追跡ファイル（非公式）

`npm pack` の出力には含まれません。`.npmignore` を参照してください。

---

## 生成物 / Git 管理対象外

| パス                   | 用途                            |
| ---------------------- | ------------------------------- |
| `node_modules/`        | npm の依存関係                  |
| `.next/`               | Next.js のビルド出力            |
| `coverage/`            | c8 のカバレッジレポート         |
| `logs/`                | ランタイムログ                  |
| `package/`             | npm pack のステージング領域     |
| `.playwright-mcp/`     | Playwright MCP のテスト成果物   |
| `.issues/`             | ローカルの Issue キャッシュ     |
| `tsconfig.tsbuildinfo` | TS のインクリメンタルキャッシュ |

---

## ナビゲーションのヒント

- **初めてコントリビュートする場合** `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md` の順に読んでください。
- **プロバイダーを追加する場合** `docs/architecture/ARCHITECTURE.md § Adding a New Provider` に従い、`docs/reference/PROVIDER_REFERENCE.md` と照合してください。
- **ルートを追加する場合** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` と `src/shared/validation/schemas.ts` を参照してください。
- **MCP ツールを追加する場合** `docs/frameworks/MCP-SERVER.md § Adding a Tool` を参照してください。
- **A2A スキルを追加する場合** `docs/frameworks/A2A-SERVER.md § Adding a New Skill` を参照してください。
- **ローカルで実行する場合** `docs/guides/SETUP_GUIDE.md` を参照してください。
- **デプロイする場合** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md` を参照してください。
- **リリースする場合** `docs/ops/RELEASE_CHECKLIST.md`（および `/generate-release-cc` Claude Code スキル）を参照してください。
