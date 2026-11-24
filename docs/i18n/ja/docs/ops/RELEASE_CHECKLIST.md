# Release Checklist (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **最終更新:** 2026-08-28 — v3.8.51
> Claude Code のスキルを活用して自動化する、効率化されたリリースフロー。
>
> **リリース間もキューとブランチを正常な状態に保つ:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) を参照
> （`/green-prs` ファミリー + `npm run check:release-green` + `/babysit` + nightly）。これを定期的に、特に
> このチェックリストを実行する**前に**実行すると、リリース PR を正常な状態で開始できます。

## 要約

```bash
# 1. バージョンを更新し、CHANGELOG を生成（スキル）
/version-bump-cc patch    # または minor/major

# 2. ローカルで品質ゲートを実行
npm run check              # lint + テスト
npm run test:coverage      # 完全なカバレッジゲート（60/60/60/60）

# 3. ビルドとスモークテスト
npm run build
npm run test:e2e           # 任意だが推奨

# 4. リリースを生成（スキル）
/generate-release-cc

# 5. デプロイ（スキル）
/deploy-vps-both-cc        # または akamai-cc / local-cc

# 6. リリースエビデンスを取得（スキル）
/capture-release-evidences-cc
```

## npm Trusted Publishing（v3.8.51 以降のデフォルト）— 要求に応じてステージング、フォールバックとして直接公開

`npm-publish.yml` はデフォルトで **npm Trusted Publishing（OIDC）**を介して公開します。
`stage-npm` ジョブ（github-hosted）は、その実行用として GitHub の id-token を有効期間の短い npm
認証情報と交換します。リポジトリシークレットに有効期間の長い npm トークンを保存する必要がなく、2FA のプロンプトもなく、provenance が付与されます。
これは、2FA を省略するトークンが廃止されつつある現在、npm が認めているバイパス方法です。
WS1.3 の保証（漏えいしたトークンだけでは公開できない — そもそもトークンが存在しない）を維持しながら、
v3.8.48 までプロジェクトで利用していた完全自動フローを復元します。

**初回のみのセットアップ（オーナー）:** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
（environment: none）。これが設定されるまでは、自動ステップが `ENEEDAUTH` で失敗します。
`publish_mode=staged`（以下を参照）または `direct` を指定して再ディスパッチしてください。

### ステージング公開（要求時 — `publish_mode=staged`）

npm-publish ワークフローは直接公開を行わなくなりました。パック済み tarball を起動
（`check:pack-boot`）してから `npm stage publish` を実行します。まったく同一のバイト列が
レジストリに保管され、オーナーが承認するまで**インストールできません**。人による 2FA ゲートは
検証前ではなく、検証後に移動しました。

**ワークフローが正常に完了した後のオーナーの手順:**

1. `npm stage list omniroute` — stage id を確認します（ワークフローのサマリーにも表示されます）。
2. ステージングされたバイト列を検証します（推奨）: `npm stage download <id>` を実行し、ダウンロードした
   tarball を一時 prefix にインストールして起動します（`npm run check:pack-boot` は
   CI で同じ pack→install→boot の判定を自動化します）。
3. `npm stage approve <id>` — 2FA プロンプトが公開そのものです。`npm stage reject <id>` は破棄します。
4. 公開後のセーフティネット: 公開後ベリファイア（v3.8.49 計画の WS1.4）が、
   クリーンなコンテナ内で公開バージョンをパブリックレジストリからインストールし、起動します。

**緊急時のフォールバック:** `publish_mode=direct` を指定した `workflow_dispatch` により、
従来の即時 `npm publish` を復元できます（ステージング自体が正しく動作しない場合にのみ使用し、理由を記録してください）。

**初回のみの強化設定（オーナー、npmjs.com）:** `omniroute` の Trusted Publisher を
stage-only モードで構成し、漏えいした有効期間の長いトークンを使って、どこからでも直接 `npm publish`
できないようにします。CI はステージングのみ可能で、公開できるのはオーナーの 2FA を経た場合だけです。

**破損アーティファクトへの対応手順（変更なし）:** デフォルトの初動として
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` を実行します（数分で完了し、元に戻せます）。
`npm unpublish` は 72 時間以内かつ依存パッケージが存在しない場合にのみ使用し、最初の対応としては決して使用しません。
Docker: バージョンタグを上書きしないでください。ロールバックでは、`latest` を最後の正常な digest に付け替えます。

**Docker Hub の `latest`（安定版 SemVer の公開ごとに必須）:**
`docker-publish` ワークフローでは、`X.Y.Z` と、`should-promote-latest.sh` が
それを最も高い安定版 SemVer と判定した場合は `:latest` の**両方**に、
**同一の digest** をタグ付けする必要があります。ジョブ完了後、Hub の `latest` の digest が
新しい SemVer の digest と一致し、`last_updated` が更新されていることを確認します。
リリースノートで git にのみ存在する修正について説明している一方で、`:latest` を古い
ビルドのままにしないでください。Compose のクイックスタートでは `:latest` を使用します。
GitOps では引き続き `X.Y.Z` を固定指定してください。
[Docker リリースチャネル](../guides/DOCKER_GUIDE.md#release-channels)および #10317 を参照してください。

**Docker Hub の組織リポジトリ（`cheaperinference/omniroute`）:** Docker Hub では
リポジトリを namespace 間で移動できないため、`diegosouzapw/omniroute` は pull 履歴と
すべてのリリースを保持します。また、`docker-publish` の `mirror-org-dockerhub` ジョブが、
リリースされた各バージョン（および昇格時の `:latest`）を
`ghcr.io/cheaper-inference/omniroute` から組織リポジトリへコピーします。
この処理には `DOCKERHUB_ORG_USERNAME` / `DOCKERHUB_ORG_TOKEN` シークレットが必要です。
これらがない場合、ジョブは「Docker Hub org mirror skipped」という警告を表示したまま正常終了し、
他のレジストリへの公開は通常どおり行われます。リリース済みバージョンを後から公開するには、
**Actions → Mirror Docker image to the Docker Hub org → Run workflow** で
`version=X.Y.Z`（最も高い安定版の場合は `promote_latest` も指定）を使用して実行します。
既存のイメージがコピーされ、再ビルドは行われません。

## ホットフィックス・ファストレーン（ラベル `hotfix`）

`hotfix` のラベルが付いた PR は、負荷の高い CI マトリクス（9 シャードの E2E、カバレッジ・ラチェット、
quality-gate、quality-extended）をスキップし、ビルド、
ユニットシャード、インテグレーション、vitest、lint/typecheck、docs-sync、`check:pack-artifact`
および tarball のブートスモーク（`check:pack-boot`）という、高速でシグナルの高いゲートを維持します。目標は、約 33 分ではなく 15 分以内にグリーンにすることです。

**エントリーポリシー — 4 つすべて必須（Chromium/VS Code/Node の緊急レーンをモデルにしたもの）：**

1. **重大度**: 本番環境が壊れている — 公開済みのアーティファクトがブート時にクラッシュする / セキュリティ修正 / リリースの全ユーザーが影響を受ける。「重要」は「壊れている」ことを意味しません。
2. **権限**: `hotfix` ラベルを付けられるのはリポジトリ所有者のみです。ラベル自体が承認を意味します — キャンペーン PR で自分自身に付けることは決してしないでください。
3. **証拠**: PR 本文に、以前の完全にグリーンだったヘビーラン（スキップされるジョブが再検証するスイート）のリンクと、修正に固有の失敗後に成功したテストへのリンクを記載します。
4. **スコープ**: cherry-pick のみ — 最小限の修正に限定し、リファクタリングや便乗変更は含めません。

スキップされたカバレッジ/ラチェットの対象範囲は、リリースブランチでの次回のフル実行（continuous release-green）によって再検証されます — このレーンは WAITING をスキップするだけで、検証をスキップするものではありません。
テストのみの差分（`tests/` 配下のすべてのファイルが対象で、`tests/e2e/` 配下にはファイルがない場合）は、ラベルなしで E2E マトリクスを自動的にスキップします。

## 詳細チェックリスト

### リリース前

- [ ] このリリースを対象とするすべての PR が `release/vX.Y.0` にマージされている
- [ ] このバージョンに関する未完了の Linear/issue 項目がすべて完了しているか、次のマイルストーンに移されている
- [ ] `release/vX.Y.0` ブランチの CI がグリーンである
- [ ] コード内に `TODO(release)` マーカーがない: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker ベースイメージが最新である（現在は `node:24.15.0-trixie-slim`）

### バージョンと変更履歴

- [ ] `/version-bump-cc <patch|minor|major>` を実行する（Claude Code スキル）
  - `package.json`、`electron/package.json` のバージョンを更新
  - 前回のタグ以降の git コミットから `CHANGELOG.md` を再生成
  - README.md のバッジを更新
- [ ] `CHANGELOG.md` を手動でレビューし、必要に応じてコミットメッセージを整理する
- [ ] `CHANGELOG.md` の最新の semver セクションが `package.json` のバージョンと一致していることを確認する
- [ ] 今後の作業のために、`## [Unreleased]` を変更履歴の最初のセクションとして維持する
- [ ] `docs/openapi.yaml` → `info.version` が `package.json` のバージョンと一致していることを確認する

### コード品質

- [ ] `npm run lint` — エラー 0（警告は既存のもの）
- [ ] `npm run typecheck:core` — クリーン
- [ ] `npm run typecheck:noimplicit:core` — クリーン（strict）
- [ ] `npm run check:cycles:ratchet` — 凍結された `metrics.cycles` の上限以内（素の `check:cycles` はサイクルが 1 つでもあると終了コード 1、#15281）
- [ ] `npm run check:any-budget:t11` — 予算以内
- [ ] `npm run check:route-validation:t06` — クリーン
- [ ] `npm run check:node-runtime` — サポート対象ランタイムの下限を満たしている（`>=22.22.2 <23`、`>=24.0.0 <27`、`src/shared/utils/nodeRuntimeSupport.ts` の `SUPPORTED_NODE_RANGE` に基づく。`package.json` の `engines` と一致）

### テスト

- [ ] `npm run test:unit` — 成功
- [ ] `npm run test:vitest` — 成功（MCP サーバー、autoCombo、キャッシュ）
- [ ] `npm run test:coverage` — ゲート 60/60/60/60 を満たす（statements/lines/functions/branches）
- [ ] `npm run test:integration` — 成功（変更が DB / ハンドラーに影響する場合）
- [ ] `npm run test:combo:matrix` — 成功（コンボ戦略マトリクス: 公開されている 22 個すべてのルーティング戦略の選択判断を決定論的に検証。コンボのルーティング、戦略解決、またはフォールバックロジックに変更を加えた場合に実行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **任意/手動**（ゲート付きの実アップストリーム・スモーク。VPS `root@192.168.0.15` から読み取り専用 DB スナップショットを取得し、実際のプロバイダーにアクセスしてクレジットを消費する。CI では実行されず、ゲートなしでは正常にスキップ）
- [ ] `npm run test:combo:live:vps` — **任意/手動**（Phase-3 VPS ライブスモーク: plain Node ESM によりライブの `.15` サーバーに対して 7 つの HTTP シナリオを実行。`ssh root@192.168.0.15` が必要。`__live_test__*` コンボのみを作成・削除し、実際のプロバイダーにアクセスする。CI では実行されない）
- [ ] `npm run test:e2e` — 成功（UI の変更）
- [ ] `npm run test:protocols:e2e` — 成功（MCP/A2A の変更）
- [ ] `npm run test:ecosystem` — 成功

### フック（Husky による検証）

Husky フックは `.husky/` にあり、git 操作時に自動的に実行されます。

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** 高速で決定論的なゲート — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`（2026-06-13 に有効化）。意図的に `test:unit` を除外しています（低速で、CI の `test-unit` ジョブでカバーされるため）。
  - リリースブランチを push する前に、`npm run test:unit` を手動で実行する。

フックが失敗した場合は、`--no-verify` で回避せず、根本的な問題を修正してください。

### Conventional Commits

リリース対象のすべてのコミットは、`type(scope): subject` 形式に従う必要があります。

**有効な type:** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有効な scope:** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

破壊的変更の場合は、`BREAKING CHANGE:` フッターを追加するか、scope の後に `!` を付けます（例: `feat(api)!: drop /v0`）。

### ドキュメント

- [ ] `npm run check:docs-sync` が成功する（pre-commit により自動実行）
- [ ] `npm run check:docs-all` が成功する（統合: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` が 0 で終了する — コード ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` の環境変数コントラクトが維持されている
- [ ] `npm run check:doc-links` が 0 で終了する — 再構成後に壊れた内部 Markdown 参照がない
- [ ] `docs/architecture/ARCHITECTURE.md` を確認し、ストレージとランタイムの乖離がない
- [ ] `docs/guides/TROUBLESHOOTING.md` を確認し、環境変数と運用上の乖離がない
- [ ] `.env.example` を変更した場合: `docs/reference/ENVIRONMENT.md` を更新する
- [ ] 新機能に UI がある場合: `docs/guides/USER_GUIDE.md` に記載する
- [ ] 新機能に API がある場合: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` を更新する
- [ ] 新機能がモジュールの場合: 専用の `docs/<MODULE>.md` が存在する
- [ ] 破壊的変更の場合: `docs/guides/TROUBLESHOOTING.md` に移行に関する注記がある

### i18n

- [ ] `npm run i18n:check` が 0 で終了する — 翻訳状態（`.i18n-state.json`）がソースドキュメントと同期している（strict モードでソースのドリフトがないこと。warn モードでの助言的な警告は、直前のドキュメント修正については許容されるが、タグ付け前には 0 であること）
- [ ] `npm run i18n:check-ui-coverage` が 0 で終了する — すべての UI ロケールが 80% のカバレッジ下限以上である
- [ ] `npm run i18n:sync-ui:dry` が 66 個すべての対象ロケールで不足キー 0 件を報告する（`en` ソースを除くすべてのロケール）
- [ ] ソースの英語ドキュメントを変更した場合、タグ付け前に `npm run i18n:run` を実行する（`.env` に `OMNIROUTE_TRANSLATION_API_KEY` が必要）
- [ ] 軽微な場合、翻訳への貢献は次のリリースまで延期できる（CHANGELOG で追跡する）

### データベースマイグレーション

- [ ] `src/lib/db/migrations/` に新しいファイルがある場合:
  - [ ] 各マイグレーションが冪等である（`CREATE TABLE IF NOT EXISTS` など）
  - [ ] マイグレーションがトランザクションでラップされている
  - [ ] 番号が正しい（連番に欠落がない）
- [ ] 新規インストールでテストする: `~/.omniroute/omniroute.db` を削除し、`npm run dev` を実行する
- [ ] 既存インストールでテストする: DB をバックアップし、マイグレーションを実行してスキーマを検証する
- [ ] マイグレーションでテーブルを書き換える場合、WAL ファイル（`-wal`、`-shm`）が正しく処理される

### プロバイダーカタログ（Zod による検証）

- [ ] `src/shared/constants/providers.ts` の Zod スキーマがロード時に有効である
  - [ ] すべてのプロバイダーに必須フィールド（`id`、`label`、`kind` など）がある
  - [ ] 新しい無料プロバイダーに `freeNote` が指定されている
  - [ ] OAuth プロバイダーに `src/lib/oauth/constants/oauth.ts` で `oauthConfig` が登録されている
- [ ] 新しいプロバイダーを追加した場合: `open-sse/executors/` に対応するエグゼキューターがある
- [ ] OpenAI 形式ではない場合: `open-sse/translator/` にトランスレーターがある
- [ ] モデルが `open-sse/config/providerRegistry.ts` に登録されている
- [ ] `tests/unit/` の単体テストでプロバイダーの分類とルーティングをカバーしている

### デスクトップ（Electron）

`electron/` を変更した場合:

- [ ] `npm run electron:smoke:packaged` が成功する
- [ ] `:win`、`:mac`、`:linux` の少なくともいずれか 1 つでビルドをテストしている
- [ ] コード署名証明書の有効期限が切れていない（署名する場合）
- [ ] `electron/package.json` のバージョンがルートの `package.json` と一致している
- [ ] `stable` にリリースする場合、自動更新チャネルのポインターを更新している

### ビルドレイアウト

このリポジトリでは、出力ディレクトリを 3 つ明確に使い分けています — 決して混同しないでください:

| ディレクトリ | 用途                                                      | 追跡対象?       |
| ------------ | --------------------------------------------------------- | --------------- |
| `src/`       | アプリケーションソース（TypeScript / TSX）                | Yes             |
| `.build/`    | ビルド中間生成物 — `next build` の出力（`distDir`）       | No (gitignored) |
| `dist/`      | 配布可能な npm バンドル — `assembleStandalone` が組み立て | No (gitignored) |

> **運用上の注記:** リモート VPS のイメージディレクトリは引き続き `/usr/lib/node_modules/omniroute/app/` です。
> 移動したのは **リポジトリ内の** ビルド出力（`app/` → `dist/`）のみです。デプロイ用スキルは
> `dist/` の内容をリモートの `app/` ディレクトリに rsync するため、VPS のパス変更は必要ありません。

**単一ビルドのフロー:**

```
npm run build:release
  └─ rm -rf .build dist          (クリーンアップ)
  └─ next build → .build/next/   (中間生成物)
  └─ assembleStandalone          (standalone + static + public + natives → dist/ をコピー)
  └─ writes dist/BUILD_SHA       (HEAD センチネルを書き込む)
```

デプロイ時に `npm run build` を実行してから別途 `npm run build:cli` を実行 **しないでください** — 1 回のコマンドでクリーンな再ビルドとセンチネルの書き込みを行う `npm run build:release` を使用してください。

### 成果物の検証

- [ ] `npm run build:release` が成功し、`dist/BUILD_SHA` == `git rev-parse --short HEAD` である
- [ ] `npm run check:pack-artifact` がクリーンである — `app.__qa_backup`、`scripts/scratch`、`package-lock.json`、その他のローカル残留物がない
- [ ] ビルド後に `dist/server.js` が存在する
- [ ] 任意のローカルパッケージランタイムスモーク: `npm run dev:candidate -- build` の後に `npm run dev:candidate -- validate` を実行すると、隔離された `DATA_DIR` 上でパッケージ済み tarball を起動し、`/api/health` + `/v1/models` を検証する（[Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) を参照）

### タグ付けとリリース

- [ ] `/generate-release-cc`（Claude Code スキル）を実行する:
  - タグ `vX.Y.Z` を作成する
  - タグとブランチをプッシュする
  - 変更履歴本文付きで GitHub Release を開く
  - Electron インストーラーを添付する（ビルド済みの場合）
- [ ] または手動で実行する:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### デプロイ

デプロイ用スキルは軽量な rsync フローを使用します — `npm pack` も `npm i -g` も使用しません:

- [ ] 対象に合ったデプロイスキルを使用する:
  - `/deploy-vps-local-cc` — ローカル VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — 両方
- [ ] デプロイ前に `dist/BUILD_SHA` == `git rev-parse --short HEAD` であることを確認する
- [ ] `node_modules` が実体である場所でビルドを実行する（メインチェックアウトまたは `npm ci`'d worktree — シンボリックリンクされた worktree は不可）
- [ ] デプロイ済みインスタンスのスモークテストを実行する:
  - `/dashboard/health` を開く → バージョン文字列がリリースと一致することを確認する
  - 既知のプロバイダーに対して `/v1/chat/completions` リクエストを実行する
  - `/api/monitoring/health` が `CLOSED` のサーキットブレーカーを返すことを確認する
  - MCP トランスポートが応答することを確認する（`/mcp` HTTP、`/mcp-sse` SSE）

### リリース後

- [ ] `/capture-release-evidences-cc`（Claude Code スキル）を実行する
  - 新機能の WebP スクリーンショット／録画を取得する
  - リリースノート／ブログ記事に添付する
- [ ] リリース告知を GitHub Discussions／Discord に投稿する
- [ ] 次のバージョン用のマイルストーンを作成する
- [ ] 重大な場合: ディスカッションをピン留めするか、アプリ内バナー用に `news.json` に投稿する

### Radar の公開ローンチゲート

Radar の告知は意図的に `active: false` の状態でコミットされています。有効化は、以下のすべての項目について証跡が確認された後に行う別個の変更です:

- [ ] Radar の積み上げられた PR がすべてマージされ、リリース先端の CI がグリーンである
- [ ] `RADAR_ENABLED` を引き続きデフォルトでオフにした状態で、OSS Radar のルートをデプロイしてスモークテストする
- [ ] 指定された Radar ホストで `GET /planos`、`/termos`、`/privacidade`、`/reembolso` をスモークテストする
- [ ] 運用担当者の身元情報／連絡先／住所、およびオーナー承認済みの法務レビューをプライベートサービスに記録する
- [ ] Stripe Checkout と署名付き Webhook をテストモードのみで実行する
- [ ] 承認済みの送信者／ドメインを使用して、暗号化されたトランザクションメールの配送を1件実行する
- [ ] バックアップのリストアと、監督下で予算上限を設定した調査実行を1件実証する
- [ ] 寄付の証跡を受け付ける前に、BRL/PIX レビューポリシーを承認する
- [ ] 上記のゲートを通過した後にのみ公開 Checkout を有効化し、新しい `news.json` ID を有効にする
- [ ] ホームバナーがローカライズされた文言を使用し、古い ID を閉じた後に新しい ID が再表示されることを確認する

## 組み込みサービスのスモークテスト（v3.8.4+）

組み込みサービスの変更を含むリリースを出荷する前に、以下を確認してください。

### Fresh-DB の起動（マイグレーションの衝突を検出 — v3.8.4 hotfix 後に追加）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 起動を 10 秒待つ
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` が `"9router"` を返す（404 でも 500 でもない）。マイグレーション `071_services.sql` が適用され、行がシードされていることを確認する。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` が 3 行を返す。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` が 2 行を返す（`070_webhooks_kind_metadata.sql` が適用されたことを検証）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` が成功する — 将来の衝突を防止する。

### 9Router

- [ ] `POST /api/services/9router/install` が 2 分以内に `installedVersion` を含む 200 を返す
- [ ] `POST /api/services/9router/start` が 30 秒以内に 200 と `state: "running"` を返す
- [ ] `GET /api/services/9router/status` が `health: "healthy"` を報告する
- [ ] `"model": "9router/auto/..."` を指定した `POST /v1/chat/completions` が 200 を返す（9Router を経由したエンドツーエンドのルーティング）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` がプロキシ内に 9Router のネイティブ UI を表示する（直接の `127.0.0.1:port` iframe ではない）
- [ ] `POST /api/services/9router/rotate-key` が `{ keyRotated: true }` を返し、サービスが正常に再起動する
- [ ] `POST /api/services/9router/stop` が 200 と `state: "stopped"` を返す
- [ ] `GET /api/services/9router/logs?tail=50` が、最近の行を含む `snapshot` イベント付きの SSE ストリームを返す
- [ ] `npm` が PATH にない環境でのインストールが、500 と親切な（スタックトレースを含まない）エラーメッセージを返す

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` が 2 分以内に 200 を返す
- [ ] `POST /api/services/cliproxy/start` が 30 秒以内に 200 と `state: "running"` を返す
- [ ] `GET /api/services/cliproxy/status` が `health: "healthy"` を報告する
- [ ] `POST /api/services/cliproxy/stop` が 200 と `state: "stopped"` を返す
- [ ] `GET /api/services/cliproxy/logs?tail=50` が SSE ストリームを返す

### セキュリティ回帰

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` が `403 LOCAL_ONLY` を返す
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` が `403 LOCAL_ONLY` を返す
- [ ] `/api/services/*` からのエラーレスポンスに `err.stack` や絶対ファイルパスが含まれていない

## v3.8.0+ の確認項目

v3.8.x のリリースを出荷する前に、以下の追加項目を確認してください。

- [ ] `omniroute --tray` が macOS で起動する（systray2 が `~/.omniroute/runtime/` にインストールされている）
- [ ] `omniroute --tray` が Linux で起動する（DISPLAY が必要。未設定の場合は正常にエラーになる）
- [ ] `omniroute --tray` が Windows で起動する（PowerShell NotifyIcon、追加のバイナリは不要）
- [ ] `omniroute config tray enable` が自動起動エントリを作成し、disable で削除する
- [ ] `npm install -g omniroute@<this-version>` が致命的な終了なしに postinstall を実行する
- [ ] 更新経路で optional deps が維持される：`omniroute update --apply` と自動更新機能が
      `npm install -g … --include=optional` を実行し、`optionalDependencies`（better-sqlite3、
      keytar、tls-client、および llmlingua SLM スタック：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）が更新後も維持される。ultra の `modelPath` SLM tier には
      tinybert model も必要で、初回使用時に `${DATA_DIR}/models/llmlingua` へ自動ダウンロードされる。postinstall
      （`scripts/build/colocateOptionals.mjs`）はその後、SLM の optional closure を
      `dist/node_modules` に co-locate し、worker が単一の `@huggingface/transformers` ^4.2.0
      インスタンスを解決するようにする。standalone trace bundles には transformers のみが含まれ、
      動的に import される optionals は含まれないため、これがない場合、worker は root の transformers に対して
      llmlingua-2 を読み込み、SLM tier は気付かれないまま fail-open する。
- [ ] `.env` がなくても `omniroute status` が動作する（CLI token path、loopback のみ）
- [ ] `curl http://localhost:20128/api/shutdown` が 401 を返す（常に保護されるルート）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` が 401 を返す（loopback guard）
- [ ] SQLite runtime が初回実行時に `bundled` に解決される（bundled binary がプラットフォームに対して有効）
- [ ] `node_modules/better-sqlite3` を削除した場合、SQLite runtime が `runtime` にフォールバックする
- [ ] Smart MCP filter が実際の `playwright-mcp browser_snapshot` 出力を圧縮する（50%以上削減）
- [ ] `skills/omniroute*/SKILL.md` の全 10 ファイルが raw GitHub URL 経由で公開取得できる
- [ ] オンボーディングウィザードが新規セットアップ時に「How It Works」tier tour step を表示する
- [ ] Home dashboard の tier coverage widget が configured/active の件数を表示する

---

## 3.9.0 LTS のカット（3.8.58 でリハーサル済み）

v3.8.59 の後の次のバージョンは 3.9.0 で、その先端から長期保守される 2 つのブランチが派生します：
`stable/v3`（v3 LTS 系列、npm の `latest`）と `develop`（v4、4.0.0 に更新、npm の
`nightly`）です。ブランチ／チャネルモデル、フォワードポート、ラベルについては
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) に、計画については [ROADMAP](../../ROADMAP.md)
（フェーズ 3）に記載されています。カットは 1 回だけ実行します。3.8.58 ではフォーク上で
エンドツーエンドのリハーサルを行い、3.8.59 では
[GO/NO-GO チェックリスト](./LTS_GO_NO_GO.md)で完了させます。

### ドライラン（読み取り専用、安全な任意のタイミングで実行可能）

```bash
npm run release:dry-run-lts-cut                       # 実際のカット：HEAD から 3.9.0、直前のタグは v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # ソースコミットを固定
```

`scripts/release/dry-run-lts-cut.mjs` は何も実行しません。git と `gh` を読み取り、全シーケンスを
出力します — 前提条件（ソースが解決されること、ソースリポジトリに完全な履歴があること —
浅いクローンでは `stable/v3` をプッシュできず、受信側が最初の graft された親で pack を拒否するため、
完全なクローンからカットするか、先に `git fetch --unshallow origin` を実行すること — 直前の
タグが存在すること、`package.json` が対象バージョンであること、`release-freeze` Issue が
オープンであること、既存のリリースブランチ上にオープンな `Release branch not green` Issue
がないこと — 存在しないブランチは `?` unknown と報告され、green になることは決してない —
omni-queue がリリースブランチにプルリクエストをマージすること（G11：`config/merge-queue/config.json` が有効で、`bases` がリリースブランチを管理し、`mode` が `live` に設定され、ラベルが存在すること）、`release/*` ルールセットが引き続き削除と force-push をブロックしていること、
`stable/v3` と `develop` がまだ存在しないこと）、2 つのブランチ手順、どの dormant-workflow
トリガーと `if:` 条件が true になり、どれがリポジトリ変数によるゲートのままになるか、または
正規リポジトリに固定されるか、想定される dist-tag（`latest` → 3.9.0、`next` と `nightly` は
空）、そしてロールバックです。終了コード `0` = `RESULT: READY`、`1` = ブロックする前提条件が
失敗（`✗`）、`2` = 使用方法エラーです。`--advisory <id,...>` を指定すると、チェックを警告（`!`）
に格下げできます（非表示にはなりません）。

3.9.0 のリリースフリーズがまだオープンしている間に、実際のカットのドライランを実行してください —
ブランチはタグの作成後、フェーズ 12c でフリーズを解除する前に作成されます。

### 3.8.58 のリハーサル（フォークのみ）

```bash
# 1. リハーサル用パラメーターで現在の先端に対してドライランを実行
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. FORK のリモートに対して実行（origin、または URL が正規リポジトリであるリモートは拒否される；
#    各手順でターミナル上の確認を求められる）
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. フォーク内の dormant workflow を実行（ドライランで canonical-repository pin が報告された場合は
#    workflow_dispatch を使用）、その後ロールバック
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop のバンプコミットは git plumbing を使用して構築されます（working tree には触れません）。
また、サイクル開始コミットと同じ 5 つのファイルを更新します：`package.json`、
`open-sse/package.json`、`electron/package.json`、`package-lock.json`、`docs/openapi.yaml`。
`[4.0.0]` CHANGELOG セクションとその i18n ミラーは、最初の PR の前に `develop` 上で開かれます。
このスクリプトが npm dist-tag を変更することはありません — それらのリハーサルはスクラッチ
パッケージ上で行ってください。

### PR プレビューアーティファクト（1 回ビルドし、同じバイト列を昇格）

`.github/workflows/preview-artifact.yml` は、PR の先端から本番用 tarball を 1 つビルドし、
その正確なビルドを検証します（#8084 のスライス (a)）。同一リポジトリの PR のみが対象で、
公開は行われません。

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # または `preview-artifact` ラベルを追加
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # プレビューをインストール
```

この実行では `npm ci`、`npm run build:release`、`npm run check:pack-artifact` を行い、tarball を
パックし、`npm run check:pack-boot`（偽のシークレット、一時的なデータディレクトリ）を実行します。
その後再度パックし、ダイジェストが同一でない場合は失敗します。続いて
`artifact-identity.json`（head SHA、base SHA、lockfile ハッシュ、プラットフォーム、アーキテクチャ、
node ABI、バンドラー、ビルドポリシー —
`scripts/release/artifact-identity.mjs`）を記録し、別ジョブで tarball のアテステーションを行います。
プレビューを昇格するとは、その tarball をインストールすることです。ソースから再ビルドしてはなりません。

### カット（3.9.0、GO 後）

1. GO を [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) に記録する。
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` が `RESULT: READY` を出力することを確認する。
3. ドライランが出力するコマンドを使い、`origin` 上に手動でブランチを作成する —
   スクリプトは `origin` へのプッシュを拒否します。レビュー済みの develop コミットを再利用するには、
   まず 3.9.0 の先端に対してフォークを対象に `--execute` リハーサルを実行してください。
   その際、両方の SHA が出力され、同じコミットをプッシュできます。

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 最初の PR が作成される前に、`stable/v3` と `develop` を保護します（ルールセット + マージキュー）。
5. 休止中のワークフローは、ブランチの存在によって有効になります。`forward-port.yml`（
   `stable/v3` へのプッシュ）、`validate-stable-pr.yml`（`stable/v3` への PR）、および
   `nightly-v4-build.yml`（`develop` のビルド）。一般公開の前に、リポジトリシークレット
   `secrets.FORWARD_PORT_TOKEN` を設定してください（これにより CI が
   フォワードポート PR で実行されます）。夜間公開は、所有者がリポジトリ変数
   `vars.NIGHTLY_PUBLISH` を `true` に設定し、npm Trusted Publishing が
   `nightly-v4-build.yml` を受け入れるまで無効のままです。チャネルの解決は
   `scripts/release/dist-tag.mjs` で行われ、`npm-publish.yml` でも同じ
   リゾルバーが使用されます。
6. チャネルを確認します。`npm view omniroute dist-tags --json` で、v4 が公開されるまで
   `latest` = 3.9.0 となり、`next` / `nightly` が存在しないことを確認します。
7. 必要に応じてロールバックします。`git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   および `npm dist-tag add omniroute@3.8.59 latest` を実行します。

---

## ロールバック

リリースに重大な問題がある場合：

1. `gh release edit vX.Y.Z --prerelease`（最新リリースではないものとしてマークします）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（ユーザーにまだ採用されていない場合のみ）
3. または：`release/vX.Y.0` でホットフィックス → パッチリリース `vX.Y.(Z+1)`
4. GitHub Discussions と Discord ですぐに告知する

## 厳守事項

- `main` に直接コミットしない
- `main` または `release/*` ブランチに対して `git push --force` を使用しない
- Husky フックをスキップしない（`--no-verify`）
- シークレット、認証情報、または `.env` ファイルをコミットしない
- カバレッジは ≥60/60/60/60（ステートメント/行/関数/ブランチ）を維持する
- `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する場合は、必ずテストを追加または更新する

## 自動同期チェック

PR を作成する前に、ローカルでドキュメント同期ガードを実行します：

```bash
npm run check:docs-sync
```

CI でも `.github/workflows/ci.yml`（lint ジョブ）でこのチェックを実行します。
