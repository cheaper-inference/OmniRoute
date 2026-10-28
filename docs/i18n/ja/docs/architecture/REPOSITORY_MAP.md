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

## `src/` — Next.jsアプリケーション

```
src/
├── app/                 # App Router (pages + API routes + status pages + landing)
├── lib/                 # Core libraries / domain modules (80 subdirs + ~70 top-level files)
├── domain/              # Pure domain logic (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Server-only modules (authz pipeline, cors, auth middleware) — cannot import from client
├── shared/              # Shared between server and client where safe (constants, types, validation, contracts, utils)
├── i18n/                # next-intl config + per-locale message JSON (67 locales)
├── middleware/          # Next.js middleware (request enrichment, locale detection)
├── mitm/                # MITM proxy core: cert gen/install, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agent handler classes extending MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Traffic capture layer: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapter glue (legacy shim)
├── scripts/             # In-tree maintenance scripts (e.g., backfillAggregation)
├── sse/                 # Legacy SSE handlers/services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy in-memory store (being phased out for src/lib/db)
├── types/               # Shared TS type files
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Node-only instrumentation
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — アプリルーター (Next.js 16)

| パス                                                                         | 目的                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | パブリック OpenAI-compat API (~ 25 のサブルート: チャット、補完、埋め込み、ファイル、バッチ、オーディオ、画像、ビデオ、音楽、再ランク、モデレーション、検索、WS、エージェント、アカウント、プロバイダーなど)                                                                                                                      |
| `app/api/v1beta/`                                                            | Gemini スタイルのAPIエンドポイント                                                                                                                                                                                                                                                                                                |
| `app/api/playground/`                                                        | Playground Studio ルート: `improve-prompt/` (POST — LLMプロンプト リライター)、 `presets/` (GET list / POST create)、 `presets/[id]/` (GET / PUT / DELETE) — `docs/frameworks/PLAYGROUND_STUDIO.md`参照                                                                                                                           |
| `app/api/` (非 v1)                                                           | Management/adminルート (~ 60 ディレクトリ: プロバイダー、コンボ、設定、mcp、a2a、evals、メモリ、スキル、Webhook、コンプライアンス、復元力、モニタリング、トンネル、cli-tools など)                                                                                                                                                |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ルート (サーバー制御、エージェントstate/DNS/mappings、バイパス、証明書、アップストリーム CA)。 LOCAL_ONLY + SPAWN_CAPABLE。 `docs/frameworks/AGENTBRIDGE.md §7`を参照してください。                                                                                                                     |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 の+ルート (リクエスト、セッション、ホスト、キャプチャ モード、エクスポート、WS)。 LOCAL_ONLY + SPAWN_CAPABLE。 `docs/frameworks/TRAFFIC_INSPECTOR.md §8`を参照してください。                                                                                                                 |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 エントリ ポイント (`POST /a2a`)                                                                                                                                                                                                                                                                                  |
| `app/.well-known/agent.json/`                                                | A2Aエージェント カード (ディスカバリー)                                                                                                                                                                                                                                                                                           |
| `app/(dashboard)/dashboard/`                                                 | ダッシュボードUIページ (50 +セクション、 ~ 118 page.tsxファイル: プロバイダー、コンボ、設定、メモリ、スキル、Webhook、評価、監査、バッチ、キャッシュ、コスト、ヘルス、システム、アクティビティなど)                                                                                                                               |
| `app/(dashboard)/dashboard/search-tools/`                                    | 検索ツール スタジオUI (3 つのタブ: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — `docs/frameworks/SEARCH_TOOLS_STUDIO.md`参照                                                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (プラン 21): `page.tsx` (3 タブ シェル)、 `components/` (MemoryConceptCard、 MemoryEngineStatus、 EmbeddingSourceSelector、 EditMemoryModal、 RetrievePreview、 QdrantConfigCard、 RerankConfigCard)、 `components/tabs/` (MemoriesTab、 PlaygroundTab、 EngineTab)、 `hooks/` (useEngineStatus、useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridgeダッシュボード ページ — サーバー カード、9 つのエージェント カード、セットアップ ウィザード、モデル マッピング、バイパス リスト。 i18n PT-BR + EN。 `docs/frameworks/AGENTBRIDGE.md`を参照してください。                                                                                                               |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector ダッシュボード ページ — DevTools分割、7 つの詳細タブ、4 つのキャプチャ モード切り替え、セッション レコーダー、コンテキストの色付け。 i18n PT-BR + EN。 `docs/frameworks/TRAFFIC_INSPECTOR.md`を参照してください。                                                                                               |
| `app/(dashboard)/dashboard/activity/`                                        | アクティビティ フィード ページ (グループ B): `page.tsx` (サーバー) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — `docs/architecture/MONITORING_SECTIONS.md`参照                                                                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | クォータ共有ページ (グループ B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | プロバイダー プランの構成ページ (グループ B): `page.tsx` + `ProviderPlanConfigClient.tsx` — 接続ごとのクォータ ディメンションのオーバーライド                                                                                                                                                                                     |
| `app/docs/`                                                                  | 埋め込みドキュメント ビューア ( `docs/*.md`をレンダリング)                                                                                                                                                                                                                                                                        |
| `app/landing/`                                                               | マーケティングのランディング ページ                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | 認証関連ページ                                                                                                                                                                                                                                                                                                                    |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTPエラーページ                                                                                                                                                                                                                                                                                                                  |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Static/statusページ                                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | ルート レイアウト、ホーム、 PWAマニフェスト、グローバルCSS                                                                                                                                                                                                                                                                        |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | エラー境界                                                                                                                                                                                                                                                                                                                        |

### `src/lib/` — コア ライブラリ (~ 50 モジュール)

| モジュール                               | 目的                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2Aプロトコル タスク マネージャー、スキル (5)、ストリーミング                                                                                                                                                                                                                                                                            |
| `acp/`                                   | CLIエージェント レジストリ (ローカルCLI検出 — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`を参照)                                                                                                                                                                                                                                          |
| `api/`                                   | 共有APIヘルパー (`requireManagementAuth`、検証)                                                                                                                                                                                                                                                                                          |
| `auth/`                                  | セッション、パスワードハッシュ、トークン検証                                                                                                                                                                                                                                                                                             |
| `batches/`                               | OpenAIバッチAPIハンドラー                                                                                                                                                                                                                                                                                                                |
| `catalog/`                               | プロバイダー カタログZod検証+機能解決                                                                                                                                                                                                                                                                                                    |
| `cloudAgent/`                            | クラウド エージェント (Codex Cloud、 Devin、 Jules) — `docs/frameworks/CLOUD_AGENT.md`参照                                                                                                                                                                                                                                               |
| `combos/`                                | コンボ解決+並べ替えヘルパー                                                                                                                                                                                                                                                                                                              |
| `audit/`                                 | アクティビティ フィード ヘルパー: `highLevelActions.ts` (ホワイトリスト+ `isHighLevelAction()`)、 `activityIcons.ts` (アクション→ icon/verbマップ)、 `timeline.ts` (groupByDay/relativeTime) — `docs/architecture/MONITORING_SECTIONS.md`参照                                                                                            |
| `compliance/`                            | 監査ログ+プロバイダー監査 — `docs/security/COMPLIANCE.md`を参照                                                                                                                                                                                                                                                                          |
| `compression/`                           | 圧縮エンジン接着剤 (エンジンは`open-sse/services/compression/`にあります)                                                                                                                                                                                                                                                                |
| `config/`                                | ランタイム構成ヘルパー                                                                                                                                                                                                                                                                                                                   |
| `db/`                                    | 120 の+ドメインDBモジュール+ 168 の移行 ( SQLiteについては常にここを経由します)                                                                                                                                                                                                                                                          |
| `quota/`                                 | クォータ共有エンジン: `dimensions.ts` (types/Zod)、 `types.ts` (QuotaStoreインターフェイス)、 `sqliteQuotaStore.ts`、 `redisQuotaStore.ts`、 `storeFactory.ts`、 `fairShare.ts`、 `burnRate.ts`、 `planResolver.ts`、 `planRegistry.ts`、 `saturationSignals.ts`、 `enforce.ts`、 `spendRecorder.ts` — `docs/routing/QUOTA_SHARE.md`参照 |
| `radar/`                                 | レーダー フリーモデル カタログ クライアント: `feedSchema.ts`、 `pinnedKeys.ts`、 `verify.ts`、 `sync.ts`、 `applyFeed.ts`、 `index.ts` (`getRadarCatalog()`) — `docs/frameworks/RADAR.md`参照                                                                                                                                            |
| `display/`                               | UIフォーマットヘルパー (コスト、レイテンシなど)                                                                                                                                                                                                                                                                                          |
| `embeddings/`                            | 埋め込みサービスヘルパー                                                                                                                                                                                                                                                                                                                 |
| `env/`                                   | 環境変数解析+検証                                                                                                                                                                                                                                                                                                                        |
| `evals/`                                 | 評価フレームワーク (スイート、ランナー、ランタイム) — `docs/frameworks/EVALS.md`参照                                                                                                                                                                                                                                                     |
| `guardrails/`                            | PIIマスカー、プロンプト インジェクション、ビジョン ブリッジ — `docs/security/GUARDRAILS.md`を参照                                                                                                                                                                                                                                        |
| `jobs/`                                  | バックグラウンドジョブ (cron のような)                                                                                                                                                                                                                                                                                                   |
| `memory/`                                | 会話記憶 (SQLite FTS5 + sqlite-vec ハイブリッドRRF + Qdrant tier 2) — `docs/frameworks/MEMORY.md`参照                                                                                                                                                                                                                                    |
| `memory/embedding/`                      | マルチソース埋め込み層: `index.ts` (リゾルバー)、 `remote.ts`、 `staticPotion.ts`、 `transformersLocal.ts`、 `cache.ts`、 `types.ts` (計画 21)                                                                                                                                                                                           |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 ラッパー — KNNブルート フォース+ハイブリッドRRF (FTS5 +ベクトル、k = 60)。 Lazy-init は、sqlite-vec が利用できない場合に正常に機能を低下させます。 (計画21)                                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — バックグラウンドで`needs_reindex=1`を使用してメモリを処理します。 `POST /api/memory/reindex`および遅延バックフィル パスによって呼び出されます。 (計画21)                                                                                                                                                           |
| `monitoring/`                            | ヘルスチェック、メトリクスの発行                                                                                                                                                                                                                                                                                                         |
| `oauth/`                                 | 22 のプロバイダー モジュールのOAuth/importフロー (agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、grok-cli、kilocode、kimi-coding、kiro、openference、qoder、trae、xai-oauth、 zed-hosted、zed)                                                            |
| `plugins/`                               | プラグインレジストリ                                                                                                                                                                                                                                                                                                                     |
| `promptCache/`                           | Anthropic スタイルのプロンプト キャッシュ ブレークポイント                                                                                                                                                                                                                                                                               |
| `skills/`                                | スキル フレームワーク (組み込みの+マーケットプレイス+ SkillsSH) — `docs/frameworks/SKILLS.md`を参照                                                                                                                                                                                                                                      |
| `playground/`                            | Playground Studio 共有ヘルパー: `codeExport.ts` (curl/Python/TSジェネレーター)、 `promptImprover.ts` (メタプロンプト ビルダー)、 `streamMetrics.ts` (純粋なTTFT/TPS)、 `types.ts` (価格表) — `docs/frameworks/PLAYGROUND_STUDIO.md`参照                                                                                                  |
| `webhookDispatcher.ts`                   | HMAC webhook 配信 — `docs/frameworks/WEBHOOKS.md`参照                                                                                                                                                                                                                                                                                    |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | トンネル マネージャー — `docs/ops/TUNNELS_GUIDE.md`参照                                                                                                                                                                                                                                                                                  |
| `cloudSync.ts`, `initCloudSync.ts`       | オプションの状態のクラウド同期                                                                                                                                                                                                                                                                                                           |
| `localDb.ts`                             | db モジュールの再エクスポート バレル (ロジックなし - 再エクスポートのみ)                                                                                                                                                                                                                                                                 |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | リクエストのキャッシュ+冪等性                                                                                                                                                                                                                                                                                                            |
| (~ 30 個以上のトップレベル ファイル)     | 特殊なヘルパー (logEnv、modelDevSync、piiSanitizer など)                                                                                                                                                                                                                                                                                 |

### `src/lib/db/` — データベース (147 モジュール+ 208 移行)

| サブディレクトリ          | 目的                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | WALジャーナリングを使用した`getDbInstance()`シングルトン                                                                                                                                        |
| `db/migrations/`          | バージョン管理されたSQLファイル (冪等、トランザクション)。 `073_memory_vec.sql` `memory_vec_meta` + `needs_reindex`列を追加します (計画 21)。                                                   |
| `db/playgroundPresets.ts` | Playground Studio プリセット用のCRUDモジュール (`listPlaygroundPresets`、 `getPlaygroundPreset`、 `createPlaygroundPreset`、 `updatePlaygroundPreset`、 `deletePlaygroundPreset`)               |
| `db/memoryVec.ts`         | `memory_vec_meta`のCRUD (active_dim、embedding_signature、last_reset_at、vec_loaded) + `markMemoryNeedsReindex`、 `getMemoryReindexQueue`など (計画 21)                                         |
| `db/<domain>.ts`          | ドメインごとに 1 つのモジュール: プロバイダー、コンボ、apiKey、ユーザー、セッション、使用状況、監査ログ、Webhook、スキル、memory_entries、cloud_agent_tasks、evals* \* 、reasoning_cache など。 |

### `src/domain/`

| モジュール             | 目的                                             |
| ---------------------- | ------------------------------------------------ |
| `policy.ts`            | ポリシーエンジン                                 |
| `fallbackPolicy.ts`    | フォールバックデシジョンツリー                   |
| `costRules.ts`         | コスト計算ルール                                 |
| `lockoutPolicy.ts`     | Model/connectionロックアウト ポリシー            |
| `tagRouter.ts`         | タグベースのルーティング                         |
| `comboResolver.ts`     | コンボ解像度 (コンボ エンジンによって使用される) |
| `modelAvailability.ts` | モデルごとの在庫状況の確認                       |
| `assessment/`          | モデル評価 (RFC-AUTO-ASESSMENT のフェーズ 1)     |

### `src/server/`

| モジュール | 目的                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------ |
| `authz/`   | 認可パイプライン: `classify` → `policies` → `enforce` — `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`    | CORS構成                                                                                   |
| `auth/`    | セッションミドルウェア                                                                     |

### `src/shared/`

| モジュール                       | 目的                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `components/`                    | ダッシュボードコンポーネントAPI: `packages/ui-kit`上のアダプター — `docs/architecture/DESIGN_SYSTEM.md`を参照 |
| `constants/iconMap.ts`           | `ICON_MAP`: 画面で使用されるアイコン名→ Lucide コンポーネント (`<Icon>`)                                      |
| `constants/providers.ts`         | **377 プロバイダー**Zod検証あり (信頼できる情報源)                                                            |
| `constants/cliTools.ts`          | 外部CLIツール レジストリ                                                                                      |
| `constants/routingStrategies.ts` | **20 のルーティング戦略**優先順位を付けて                                                                     |
| `constants/publicApiRoutes.ts`   | ベアラー (管理ではなく) 認証が必要なルート                                                                    |
| `constants/upstreamHeaders.ts`   | アップストリームリクエストのヘッダー拒否リスト                                                                |
| `validation/schemas.ts`          | ~ 80 Zodスキーマ ( APIコントラクトの信頼できる唯一の情報源)                                                   |
| `validation/helpers.ts`          | Zod検証ヘルパー (`validateBody`など)                                                                          |
| `types/`                         | 共有TSタイプ                                                                                                  |
| `contracts/`                     | パブリックAPIコントラクト ( `package.json`の`files:`によって消費される)                                       |
| `utils/circuitBreaker.ts`        | プロバイダーのサーキット ブレーカー ( `docs/architecture/RESILIENCE_GUIDE.md`を参照)                          |
| `utils/apiAuth.ts`               | APIキーの検証、スコープのチェック                                                                             |
| `utils/fetchTimeout.ts`          | 上流フェッチ用のTimeout/abortラッパー                                                                         |
| `utils/releaseNotes.ts`          | v2/legacyアナウンスパーサー、ローカリゼーション、 IDの解除を終了                                              |

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

## `docs/` — 公開ドキュメント (7 つのルート ファイル+ 17 のサブディレクトリ)

### トップレベルのガイド

| ドクター                    | 目的                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高レベルのアーキテクチャ、サブシステム マップ、ダッシュボードの表面               |
| `CODEBASE_DOCUMENTATION.md` | エンジニアリングリファレンス: ディレクトリ、モジュール、規約                      |
| `FEATURES.md`               | v3.8 のハイライトを含む機能マトリックス                                           |
| `USER_GUIDE.md`             | エンドユーザーマニュアル (セットアップ、モデル、コンボ、 CLIs、オーディオなど)    |
| `API_REFERENCE.md`          | 認証モデルを使用したAPIエンドポイント参照                                         |
| `openapi.yaml`              | OpenAPI 3.0 仕様 (121 パス)                                                       |
| `SETUP_GUIDE.md`            | インストール方法 (npm、npx、 Docker、 Electron、Termux、source)                   |
| `ENVIRONMENT.md`            | すべての環境変数 (~ 800 文書化、 ~ 3,050 行`.env.example`)                        |
| `TROUBLESHOOTING.md`        | 一般的なエラー+ v3.8.0 の既知の問題                                               |
| `RELEASE_CHECKLIST.md`      | 完全なリリース フロー (スキル、ハスキー、従来のコミット、デプロイ)                |
| `COVERAGE_PLAN.md`          | 対象範囲の目標と現状                                                              |
| `FREE_TIERS.md`             | 厳選された無料利用枠プロバイダー (48 +無料+ 11 OAuth)                             |
| `CLI-TOOLS.md`              | 外部CLI統合+内部OmniRoute CLI                                                     |
| `I18N.md`                   | i18n アーキテクチャ、言語の追加、67 ロケール                                      |
| `UNINSTALL.md`              | クリーンなアンインストール手順                                                    |
| `PROVIDER_REFERENCE.md`     | **自動生成**377 プロバイダーのカタログ (再生成: `npm run gen:provider-reference`) |

### サブシステムの詳細

| ドクター                                    | 目的                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCPサーバー: 110 ツール、3 トランスポート、33 スコープ、 RESTエンドポイント     |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC、6 スキル、 RESTヘルパー、エージェント カード                |
| `AGENT_PROTOCOLS_GUIDE.md`                  | 統合ガイド: A2A 、 ACP 、クラウド エージェント                                  |
| `CLOUD_AGENT.md`                            | Codexクラウド / Devin / Julesオーケストレーション                               |
| `SKILLS.md`                                 | スキル フレームワーク (組み込みの+マーケットプレイス+ SkillsSH +サンドボックス) |
| `RADAR.md`                                  | レーダー フリーモデル カタログ オーバーレイ (`RADAR_ENABLED`、デフォルトでオフ) |
| `MEMORY.md`                                 | メモリ システム (SQLite FTS5 + Qdrant)                                          |
| `EVALS.md`                                  | 評価フレームワーク (スイート、実行、ルーブリック)                               |
| `GUARDRAILS.md`                             | PIIマスカー、プロンプトインジェクション、ビジョンブリッジ                       |
| `COMPLIANCE.md`                             | 監査ログ、保持、noLog オプトアウト                                              |
| `WEBHOOKS.md`                               | HMAC 署名付き Webhook 配信                                                      |
| `REASONING_REPLAY.md`                       | `reasoning_content`用のハイブリッドmemory/SQLiteキャッシュ                      |
| `AUTHZ_GUIDE.md`                            | 認可パイプライン (`classify` → `policies` → `enforce`)                          |
| `RESILIENCE_GUIDE.md`                       | サーキットブレーカー+クールダウン+モデル ロックアウト                           |
| `docs/security/STEALTH_GUIDE.md` (git のみ) | TLSフィンガープリンティング (JA3/JA4)、 ClaudeコードCCH、 MITM cert             |
| `AUTO-COMBO.md`                             | オートコンボエンジン (16 要素スコアリング、6 モードパック、仮想ファクトリー)    |

### 圧縮

| ドクター                        | 目的                                  |
| ------------------------------- | ------------------------------------- |
| `COMPRESSION_GUIDE.md`          | 圧縮モードの概要+ロードマップ         |
| `COMPRESSION_ENGINES.md`        | Caveman + RTKエンジン、レジストリ契約 |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman ルール パックJSONスキーマ     |
| `COMPRESSION_LANGUAGE_PACKS.md` | 言語ごとのルール パック インベントリ  |
| `RTK_COMPRESSION.md`            | RTK宣言パイプライン (56 フィルター)   |

### 導入

| ドクター                     | 目的                                                                     |
| ---------------------------- | ------------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Dockerビルド、プロファイル (base/cli/host/cliproxyapi)、 Redisサイドカー |
| `VM_DEPLOYMENT_GUIDE.md`     | 汎用VM/VPSデプロイメント (Ubuntu/Debian + nginx + systemd)               |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io の展開 (現在は中国語のみ)                                         |
| `TERMUX_GUIDE.md`            | Termux 経由の Android ヘッドレス                                         |
| `PWA_GUIDE.md`               | Progressive Web App インストール+サービス ワーカー                       |
| `ELECTRON_GUIDE.md`          | デスクトップ アプリのビルド+署名+配布                                    |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscaleファネル                                  |
| `PROXY_GUIDE.md`             | 4 レベルのアウトバウンド プロキシ+ 1proxy マーケットプレイス             |

### サブディレクトリ

| サブディレクトリ      | 目的                                                                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | ローカライズされたドキュメント翻訳 (41 ロケール)                                                                                                                                                                            |
| `docs/screenshots/`   | ガイド用の画像アセット                                                                                                                                                                                                      |
| `_tasks/superpowers/` | スーパーパワーのPlans/specs (`writing-plans`/`brainstorming`) + Research — メイン ツリーによって gitignored され、個別にバージョン管理された分離されたリポジトリ。 CLAUDE.md → 「計画および研究成果物」を参照してください。 |

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
