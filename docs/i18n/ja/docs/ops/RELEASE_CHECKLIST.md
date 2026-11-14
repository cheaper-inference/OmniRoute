# Release Checklist (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **最終更新:** 2026-08-28 — v3.8.51
> Claude Code スキルを活用して自動化する、合理化されたリリースフロー。
>
> **リリース間もキュー/ブランチをグリーンに保つ:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) を参照
> （`/green-prs` ファミリー + `npm run check:release-green` + `/babysit` + nightly）。これを定期的に、特に
> このチェックリストを実行する**前に**行うことで、リリース PR をグリーンな状態で開始できます。

## TL;DR

```bash
# 1. バージョンを更新して CHANGELOG を生成（スキル）
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

`npm-publish.yml` は、デフォルトで **npm Trusted Publishing (OIDC)** を通じて公開します。
`stage-npm` ジョブ（github-hosted）は、GitHub の id-token をその実行専用の短期間有効な npm
認証情報と交換します。リポジトリシークレットに長期間有効な npm トークンを保存する必要がなく、2FA プロンプトもなく、provenance が付与されます。
これは、2FA をスキップするトークンが廃止される現在、npm が認めるバイパス方法です。
これにより、WS1.3 の保証（漏洩したトークンだけでは公開できない。そもそもトークンが存在しない）を維持しつつ、
v3.8.48 までプロジェクトで使用していた完全自動フローを復元します。

**初回のみのセットアップ（オーナー）:** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`、repo `OmniRoute`、workflow `npm-publish.yml`
（environment: none）。これが設定されるまでは、自動ステップが `ENEEDAUTH` で失敗します。
`publish_mode=staged`（下記）または `direct` を指定して再ディスパッチしてください。

### ステージング公開（要求時 — `publish_mode=staged`）

npm-publish ワークフローは直接公開を行わなくなりました。パック済み tarball を起動
（`check:pack-boot`）した後、`npm stage publish` を実行します。まったく同じバイト列が
レジストリに保管され、オーナーが承認するまで**インストールできません**。人間による 2FA ゲートは、
検証前ではなく検証後に移動しました。

**ワークフローがグリーンになった後のオーナー向け手順:**

1. `npm stage list omniroute` — stage id を見つけます（ワークフローのサマリーにも表示されます）。
2. ステージングされたバイト列を検証します（推奨）: `npm stage download <id>` を実行し、ダウンロードした
   tarball を一時 prefix にインストールして起動します（CI では `npm run check:pack-boot` が
   同じ pack→install→boot の判定を自動化します）。
3. `npm stage approve <id>` — 2FA プロンプトが公開そのものです。`npm stage reject <id>` は破棄します。
4. 公開後のセーフティネット: 公開後ベリファイア（v3.8.49 計画の WS1.4）が、クリーンなコンテナ内で
   公開バージョンをパブリックレジストリからインストールして起動します。

**緊急時のフォールバック:** `publish_mode=direct` を指定した `workflow_dispatch` により、
従来の即時 `npm publish` を復元できます（ステージング自体が正常に動作しない場合にのみ使用し、理由を記録してください）。

**初回のみのハードニング（オーナー、npmjs.com）:** `omniroute` の Trusted Publisher を
stage-only モードに設定し、漏洩した長期間有効なトークンを使って任意の場所から直接 `npm publish`
できないようにしてください。CI はステージングのみ可能で、リリースできるのはオーナーの 2FA のみです。

**破損アーティファクトへの対処手順（変更なし）:** デフォルトの初動として
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` を使用します（数分で実行でき、元に戻せます）。
`npm unpublish` は 72 時間以内かつ依存パッケージがない場合にのみ使用し、決して最初の対応にはしないでください。
Docker: バージョンタグを上書きしないでください。ロールバックとは、`latest` を直前の正常な digest に付け替えることです。

**Docker Hub の `latest`（安定版 SemVer を公開するたびに必須）:**
`docker-publish` ワークフローは **`X.Y.Z` と**、`should-promote-latest.sh` が
これを最新の安定版 SemVer と判定した場合は `:latest` の**両方**に、
**同じ digest** をタグ付けする必要があります。ジョブ完了後、Hub の `latest` digest が新しい
SemVer digest と一致し、`last_updated` が更新されていることを確認してください。リリースノートで
git 上にしか存在しない修正について説明しながら、`:latest` を古いビルドのままにしないでください。
Compose のクイックスタートでは `:latest` を使用しますが、GitOps では引き続き `X.Y.Z` に固定してください。
[Docker のリリースチャネル](../guides/DOCKER_GUIDE.md#release-channels)および #10317 を参照してください。

## ホットフィックス・ファストレーン（ラベル `hotfix`）

`hotfix` ラベルが付いた PR は、負荷の高い CI マトリクス（9 シャード E2E、カバレッジ・ラチェット、
quality-gate、quality-extended）をスキップし、高速で検出力の高いゲート（ビルド、
ユニットテストのシャード、統合テスト、vitest、lint/typecheck、docs-sync、`check:pack-artifact`、
および tarball の起動スモークテスト（`check:pack-boot`））を維持します。目標：所要時間を約 33 分から 15 分以内に短縮。

**適用ポリシー — 4 項目すべてが必須（Chromium/VS Code/Node の緊急レーンをモデル化）：**

1. **重大度**：本番環境が壊れていること — 公開済みアーティファクトが起動時にクラッシュする /
   セキュリティ修正である / リリースの全ユーザーが影響を受ける。「重要」は「壊れている」ではありません。
2. **権限**：`hotfix` ラベルを付与できるのはリポジトリ所有者のみです。このラベル自体が
   承認を意味します — キャンペーン PR で自己判断により使用してはいけません。
3. **証拠**：PR 本文に、直前の完全成功した負荷の高い実行（スキップされるジョブが再検証する
   スイート）と、修正自体について失敗後に成功するようになったテストへのリンクを記載します。
4. **スコープ**：cherry-pick のみに限定 — 最小限の修正とし、リファクタリングや便乗変更を含めません。

スキップされたカバレッジ/ラチェットの対象は、リリースブランチで次回実行される
完全なテスト（継続的なリリース成功状態）によって再検証されます — このレーンがスキップするのは待機であり、検証ではありません。
テストのみの差分（すべてのファイルが `tests/` 配下にあり、`tests/e2e/` 配下にはない場合）は、
ラベルなしで E2E マトリクスを自動的にスキップします。

## 詳細なチェックリスト

### プレリリース

- [ ] このリリースを対象とするすべてのPRsは`release/vX.Y.0`にマージされます
- [ ] このバージョンのすべてのオープンLinear/issueアイテムはクローズされるか、次のマイルストーンにプッシュされます
- [ ] `release/vX.Y.0`ブランチのCIグリーン
- [ ] コードに`TODO(release)`マーカーがありません: `grep -r "TODO(release)" src/ open-sse/`
- [ ] 最新のDocker基本イメージ (現在は`node:24.15.0-trixie-slim`)

### バージョンと変更履歴

- [ ] `/version-bump-cc <patch|minor|major>`を実行する (Claudeコード スキル)
  - バンプ`package.json`、 `electron/package.json`
  - 最後のタグ以降の git コミットから`CHANGELOG.md`再生成します
  - README.mdバッジを更新します
- [ ] CHANGELOG.md手動で確認し、必要に応じてコミット メッセージをクリーンアップする
- [ ] `CHANGELOG.md`の最新の semver セクションが`package.json`バージョンと等しいことを確認します。
- [ ] 今後の作業の最初の変更ログセクションとして`## [Unreleased]`保持します
- [ ] `docs/openapi.yaml` → `info.version`を更新するには、 `package.json`バージョンと一致する必要があります

### コードの品質

- [ ] `npm run lint` — 0 エラー (警告はすでに存在します)
- [ ] `npm run typecheck:core` —クリーン
- [ ] `npm run typecheck:noimplicit:core` —クリーン (厳密)
- [ ] 凍結された`metrics.cycles`天井内の`npm run check:cycles:ratchet` — (裸の`check:cycles`はどのサイクルでも 1 で終了します、 #15281)
- [ ] 予算内で`npm run check:any-budget:t11` —
- [ ] `npm run check:route-validation:t06` —クリーン
- [ ] `npm run check:node-runtime` —サポートされるランタイムフロアを満たす (`>=22.22.2 <23`、 `>=24.0.0 <27`、 `src/shared/utils/nodeRuntimeSupport.ts`の`SUPPORTED_NODE_RANGE`ごと、 `package.json` `engines`と調整される)

### テスト

- [ ] `npm run test:unit` —パス
- [ ] `npm run test:vitest` —パス (MCPサーバー、 autoCombo、キャッシュ)
- [ ] `npm run test:coverage` —ゲート60/60/60/60満足 (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (変更がDB / ハンドラーに影響を与える場合)
- [ ] `npm run test:combo:matrix` — pass (コンボ戦略マトリックス: 22 個すべてのパブリック ルーティング戦略の選択決定を決定論的に証明します。コンボ ルーティング、戦略解決、またはフォールバック ロジックに触れたときに実行されます)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (ゲートされたリアルアップストリームスモーク; VPS `root@192.168.0.15`から読み取り専用のDBスナップショットをソースします; 実際のプロバイダーにヒットしますが、クレジットがかかります; CIでは決して実行されません; ゲートなしできれいにスキップします)
- [ ] `npm run test:combo:live:vps` — **optional/manual** (Phase-3 VPS live smoke: 7 HTTP scenarios against the live `.15` server via plain Node ESM; requires `ssh root@192.168.0.15`; creates/deletes only `__live_test__*` combos; hits real providers; never runs in CI)
- [ ] `npm run test:e2e` —パス (UI変更)
- [ ] `npm run test:protocols:e2e` —パス (MCP/A2A変更)
- [ ] `npm run test:ecosystem` —パス

### フック (Husky 検証済み)

Husky フックは`.husky/`に存在し、git 操作で自動的に実行されます。

- **事前コミット:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **プリプッシュ:**高速決定性ゲート— `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026 年 6 月 13 日に有効化)。 `test:unit`意図的に除外します (遅い; CI `test-unit`ジョブによってカバーされます)。
  - リリース ブランチをプッシュする前に、 `npm run test:unit`手動で実行します。

フックが失敗した場合: 根本的な問題を修正し、 `--no-verify`でバイパスしないでください。

### 従来のコミット

すべてのリリースバインドされたコミットは、 `type(scope): subject`形式に従う必要があります。

**有効なタイプ:** `feat`、 `fix`、 `refactor`、 `docs`、 `test`、 `chore`、 `perf`、 `style`、 `ci`

**有効なスコープ:** `db`、 `sse`、 `oauth`、 `dashboard`、 `api`、 `cli`、 `docker`、 `ci`、 `mcp`、 `a2a`、 `memory`、 `skills`、 `cloud-agent`、 `guardrails`、 `compression`、 `auto-combo`、 `resilience`、 `providers`、 `executors`、 `translator`、 `domain`、 `authz`

重大な変更: スコープの後に`BREAKING CHANGE:`フッターまたは`!`を追加します (例: `feat(api)!: drop /v0`)。

### ドキュメント

- [ ] `npm run check:docs-sync`パス (事前コミットによる自動実行)
- [ ] `npm run check:docs-all`パス (傘: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync`終了 0 —コード↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env 契約はそのままです
- [ ] `npm run check:doc-links` 0 を終了します。 —再構築後に壊れた内部マークダウン参照はありません。
- [ ] `docs/architecture/ARCHITECTURE.md` storage/runtimeドリフトについてレビューしました
- [ ] 環境変数と運用上のドリフトについて`docs/guides/TROUBLESHOOTING.md`レビューされました
- [ ] `.env.example`が変更された場合: `docs/reference/ENVIRONMENT.md`が更新されました
- [ ] 新しい機能にUIがある場合: `docs/guides/USER_GUIDE.md`それについて言及します
- [ ] 新しい機能にAPIがある場合: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`が更新されました
- [ ] 新機能がモジュールの場合: 専用の`docs/<MODULE>.md`が存在します
- [ ] 重大な変更の場合: `docs/guides/TROUBLESHOOTING.md`は移行に関するメモがあります

### i18n

- [ ] `npm run i18n:check`ソース ドキュメントと同期して 0 —変換状態 (`.i18n-state.json`) を終了します (厳密モードではドリフト ソースはありません。直前のドキュメントの修正には警告モード アドバイザリが受け入れられますが、タグ付け前は 0 である必要があります)。
- [ ] `npm run i18n:check-ui-coverage` 80% カバレッジフロア以上のUIロケールごとに 0 —を終了します。
- [ ] `npm run i18n:sync-ui:dry` 66 のターゲット ロケールすべてで欠落キーが 0 であることを報告します ( `en`ソースを除くすべてのロケール)
- [ ] ソースの英語ドキュメントが変更された場合は、タグ付けする前に`npm run i18n:run` ( `.env`で`OMNIROUTE_TRANSLATION_API_KEY`が必要) を実行してください
- [ ] 翻訳の貢献は、軽微な場合は次のリリースに延期することができます ( CHANGELOGのトラック)

### データベースの移行

- [ ] `src/lib/db/migrations/`に新しいファイルがある場合:
  - [ ] 各移行はべき等です (`CREATE TABLE IF NOT EXISTS`など)
  - [ ] トランザクションにラップされた移行
  - [ ] 番号が正しく付けられている (順序にギャップがない)
- [ ] 新規インストールでテスト: `~/.omniroute/omniroute.db`を削除して`npm run dev`を実行
- [ ] 既存のインストールでのテスト: DBのバックアップ、移行の実行、スキーマの検証
- [ ] 移行によってテーブルが書き換えられた場合、WALファイル (`-wal`、 `-shm`) が正しく処理されるようになりました

### プロバイダー カタログ (Zod 検証済み)

- [ ] ロード時に有効な`src/shared/constants/providers.ts` Zodスキーマ
  - [ ] すべてのプロバイダーには必須フィールド (`id`、 `label`、 `kind`など) があります。
  - [ ] 新しい無料プロバイダー向けに提供される`freeNote`
  - [ ] OAuthプロバイダーは`oauthConfig` `src/lib/oauth/constants/oauth.ts`に登録しています
- [ ] 新しいプロバイダーが追加された場合: `open-sse/executors/`の対応するエグゼキューター
- [ ] 非 OpenAI 形式の場合: `open-sse/translator/`のトランスレーター
- [ ] `open-sse/config/providerRegistry.ts`に登録されているモデル
- [ ] `tests/unit/`の単体テストはプロバイダーの分類とルーティングをカバーします

### デスクトップ (Electron)

`electron/`が変更された場合:

- [ ] `npm run electron:smoke:packaged`パス
- [ ] `:win`、 `:mac`、 `:linux`の少なくとも 1 つについてテストされたビルド
- [ ] コード署名証明書の有効期限が切れていない (署名している場合)
- [ ] `electron/package.json`バージョンはルート`package.json`と一致します
- [ ] 自動更新`stable`にリリースするとチャネル ポインターが更新される

### ビルドレイアウト

リポジトリは 3 つの異なる出力ディレクトリを使用します。これらを決して混同しないようにして— 。

| ディレクトリ | 目的                                                               | 追跡されましたか？  |
| ------------ | ------------------------------------------------------------------ | ------------------- |
| `src/`       | アプリケーションソース (TypeScript / TSX)                          | はい                |
| `.build/`    | 中間ビルド— `next build`出力 (`distDir`)                           | いいえ (ギティ無視) |
| `dist/`      | `assembleStandalone`によって組み立てられた出荷可能な npm バンドル— | いいえ (ギティ無視) |

> **オペレーターメモ:**リモートVPSイメージ ディレクトリは`/usr/lib/node_modules/omniroute/app/`ままです。のみ**インレポ**ビルド出力が移動されました (`app/` → `dist/`)。デプロイ スキルは、 `dist/`コンテンツをリモート`app/`ディレクトリ—に rsync しますVPSパスの変更は必要ありません。

**単一ビルド フロー:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Do NOT run `npm run build` followed by a separate `npm run build:cli` for deploy — use `npm run build:release` which does a clean rebuild + sentinel in one command.

### アーティファクトの検証

- [ ] `npm run build:release`成功し、 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`、 `scripts/scratch`、 `package-lock.json`、またはその他のローカル残留物
- [ ] `dist/server.js`ビルド後に存在します
- [ ] オプションのローカルのパッケージ化されたランタイム スモーク: `npm run dev:candidate -- build`分離された`DATA_DIR`上でパックされた tarball を起動し、 `/api/health` + `/v1/models`をチェックした後の`npm run dev:candidate -- validate` ([コントリビューションのゴールデン パス](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop)を参照)

### タグ付けとリリース

- [ ] `/generate-release-cc` (Claudeコードスキル) を実行します。
  - タグ`vX.Y.Z`を作成します
  - タグとブランチをプッシュします
  - 変更ログ本文を含むGitHubリリースを開きます
  - Electronインストーラーを添付します (ビルドされている場合)
- [ ] または手動で:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 展開する

スキルのデプロイでは、軽い rsync フロー— 、 `npm pack`、 `npm i -g`を使用しません。

- [ ] ターゲットに一致するデプロイ スキルを使用します。
  - `/deploy-vps-local-cc` —ローカルVPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` —アカマイVPS (69.164.221.35)
  - `/deploy-vps-both-cc` —両方
- [ ] デプロイする前に、 `dist/BUILD_SHA` == `git rev-parse --short HEAD`を確認してください
- [ ] ビルドは、 `node_modules`が実際の場所 (メイン チェックアウトまたは`npm ci`で指定されたワークツリー— NOTシンボリックリンクされたワークツリー) で実行する必要があります。
- [ ] スモークテストのデプロイされたインスタンス:
  - `/dashboard/health` →を開き、バージョン文字列がリリースと一致することを確認します
  - 既知のプロバイダーに対して`/v1/chat/completions`リクエストを実行する
  - `/api/monitoring/health` `CLOSED`サーキット ブレーカーを返すことを確認する
  - MCPトランスポートが応答することを確認します (`/mcp` HTTP、 `/mcp-sse` SSE)

### リリース後

- [ ] `/capture-release-evidences-cc`を実行する (Claudeコード スキル)
  - 新機能のWebP screenshots/recordingsをキャプチャします
  - リリースノート/ブログ投稿に添付
- [ ] GitHubディスカッション / Discordをリリース発表で更新
- [ ] 次のバージョンのマイルストーンを開く
- [ ] 重要な場合: ディスカッションをピン留めするか、アプリ内バナーの`news.json`に投稿します

### レーダー一般発射ゲート

Radar のアナウンスは、 `active: false`を使用して意図的にコミットされています。アクティベーションは、以下のすべての項目が証明された後の個別の変更です。

- [ ] スタックされたすべてのレーダーPRsがマージされ、リリースチップCIが緑色になります
- [ ] `RADAR_ENABLED`がデフォルトでオフのままで、 OSS Radar ルートをデプロイして実行します。
- [ ] 指定された Radar ホストで`GET /planos`、 `/termos`、 `/privacidade`、および`/reembolso`をスモークします。
- [ ] レコードオペレーターidentity/contact/addressとプライベートサービスでの所有者承認の法的レビュー
- [ ] Stripe Checkout と署名付き Webhook をテストモードのみで実行する
- [ ] 承認されたsender/domainを使用して、暗号化されたトランザクション電子メール配信を 1 回実行します
- [ ] バックアップの復元と、予算を制限した監視付きの 1 回の調査の実行を証明する
- [ ] 寄付の証拠を受け入れる前に、 BRL/PIXレビューポリシーを承認してください
- [ ] 前のゲートの後でのみパブリック チェックアウトを有効にし、新しい`news.json` IDをアクティブ化します。
- [ ] ホーム バナーがローカライズされたコピーを使用し、古いIDが閉じられた後に新しいIDが再表示されることを確認します。

## 組み込みサービスのスモークテスト (v3.8.4+)

組み込みサービスの変更を含むリリースを公開する前に、以下を確認してください。

### 新規DBでの起動（マイグレーションの競合を検出 — v3.8.4のホットフィックス後に追加）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 起動するまで10秒待つ
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` が `"9router"` を返す（404でも500でもない）。マイグレーション `071_services.sql` が適用され、行がシードされたことを確認する。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` が3行を返す。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` が2行を返す（`070_webhooks_kind_metadata.sql` が適用されたことを検証）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` が成功する — 将来の競合を防止する。

### 9Router

- [ ] `POST /api/services/9router/install` が2分以内に `installedVersion` を含む200を返す
- [ ] `POST /api/services/9router/start` が30秒以内に200と `state: "running"` を返す
- [ ] `GET /api/services/9router/status` が `health: "healthy"` を報告する
- [ ] `"model": "9router/auto/..."` を指定した `POST /v1/chat/completions` が200を返す（9Routerを介したエンドツーエンドのルーティング）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` がプロキシ内に9RouterのネイティブUIをレンダリングする（`127.0.0.1:port` を直接指定するiframeではない）
- [ ] `POST /api/services/9router/rotate-key` が `{ keyRotated: true }` を返し、サービスが正常に再起動する
- [ ] `POST /api/services/9router/stop` が200と `state: "stopped"` を返す
- [ ] `GET /api/services/9router/logs?tail=50` が、直近の行を含む `snapshot` イベント付きのSSEストリームを返す
- [ ] PATHに `npm` がない環境でインストールすると、わかりやすい（スタックトレースではない）エラーメッセージとともに500が返される

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` が2分以内に200を返す
- [ ] `POST /api/services/cliproxy/start` が30秒以内に200と `state: "running"` を返す
- [ ] `GET /api/services/cliproxy/status` が `health: "healthy"` を報告する
- [ ] `POST /api/services/cliproxy/stop` が200と `state: "stopped"` を返す
- [ ] `GET /api/services/cliproxy/logs?tail=50` がSSEストリームを返す

### セキュリティのリグレッション

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` が `403 LOCAL_ONLY` を返す
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` が `403 LOCAL_ONLY` を返す
- [ ] `/api/services/*` からのエラーレスポンスに `err.stack` や絶対ファイルパスが含まれていない

## v3.8.0+の確認項目

v3.8.xリリースを公開する前に、以下の追加項目を確認してください。

- [ ] `omniroute --tray` がmacOSで起動する（systray2が `~/.omniroute/runtime/` にインストールされる）
- [ ] `omniroute --tray` がLinuxで起動する（DISPLAYが必要。未設定の場合は適切なエラーを表示する）
- [ ] `omniroute --tray` がWindowsで起動する（PowerShell NotifyIconを使用し、追加のバイナリは不要）
- [ ] `omniroute config tray enable` が自動起動エントリを作成し、無効化すると削除される
- [ ] `npm install -g omniroute@<this-version>` が致命的エラーで終了することなくpostinstallを実行する
- [ ] 更新経路でオプション依存関係が維持される：`omniroute update --apply` と自動アップデーターが
      `npm install -g … --include=optional` を実行し、`optionalDependencies`（better-sqlite3、
      keytar、tls-client、およびllmlingua SLMスタック：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）が更新後も維持される。ultra `modelPath` SLM階層には
      tinybertモデルも必要で、初回使用時に `${DATA_DIR}/models/llmlingua` へ自動ダウンロードされる。Postinstall
      （`scripts/build/colocateOptionals.mjs`）はその後、SLMのオプション依存関係一式を
      `dist/node_modules` に併置し、ワーカーが単一の `@huggingface/transformers` ^4.2.0
      インスタンスを解決するようにする — スタンドアロンのトレースではtransformersのみがバンドルされ、動的にインポートされる
      オプション依存関係はバンドルされないため、これがないとワーカーはルートのtransformersに対してllmlingua-2を読み込み、
      SLM階層が通知なくフェイルオープンする。
- [ ] `.env` がなくても `omniroute status` が動作する（CLIトークン経路、ループバックのみ）
- [ ] `curl http://localhost:20128/api/shutdown` が401を返す（常に保護されるルート）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` が401を返す（ループバックガード）
- [ ] 初回実行時にSQLiteランタイムが `bundled` として解決される（同梱バイナリがプラットフォームで有効）
- [ ] `node_modules/better-sqlite3` を削除すると、SQLiteランタイムが `runtime` にフォールバックする
- [ ] Smart MCPフィルターが実際の `playwright-mcp browser_snapshot` 出力を圧縮する（50%以上削減）
- [ ] 10個すべての `skills/omniroute*/SKILL.md` ファイルがGitHubのraw URL経由で公開取得できる
- [ ] 新規セットアップ時に、オンボーディングウィザードに「仕組み」の階層ツアーステップが表示される
- [ ] ホームダッシュボードの階層カバレッジウィジェットに、設定済み数とアクティブ数が表示される

---

## 3.9.0 LTS カット（3.8.58 でリハーサル済み）

v3.8.59 の次のバージョンは 3.9.0 となり、その先端から長期運用される 2 つのブランチが作成されます：
`stable/v3`（v3 LTS 系列、npm `latest`）と `develop`（v4、4.0.0 に更新、npm
`nightly`）です。ブランチ／チャンネルモデル、フォワードポート、ラベルについては
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) を、計画については [ROADMAP](../../ROADMAP.md)（Phase 3）を参照してください。このカットは一度だけ実行されます。
3.8.58 ではフォーク上で最初から最後までリハーサルを行い、3.8.59 は
[GO/NO-GO チェックリスト](./LTS_GO_NO_GO.md)で完了します。

### ドライラン（読み取り専用、いつでも安全）

```bash
npm run release:dry-run-lts-cut                       # 実際のカット：HEAD から 3.9.0、直前のタグは v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # ソースコミットを固定
```

`scripts/release/dry-run-lts-cut.mjs` は何も実行しません。git と `gh` から情報を読み取り、
一連の手順全体を出力します。これには、前提条件（ソースを解決できること、ソースリポジトリに完全な履歴があること —
shallow clone からは `stable/v3` をプッシュできず、受信側が最初の
grafted parent で pack を拒否するため、完全な clone からカットするか、先に
`git fetch --unshallow origin` を実行すること —、直前の
タグが存在すること、`package.json` が対象バージョンであること、`release-freeze` issue がオープンであること、既存のリリースブランチ上に
`Release branch not green` issue がオープンされていないこと
— 存在しないブランチは green ではなく、不明を示す `?` と報告されます —、Mergify の `release` キューが設定されていること（G11：`queue_rules`、`checks_timeout`、
ラベル `queue`）、`release/*` ルールセットが削除と force-push を引き続きブロックしていること、さらに
`stable/v3` と `develop` がまだ存在しないこと）、2 つのブランチ作成手順、休止中のどのワークフローの
トリガーと `if:` 条件が真になるか（および、どれがリポジトリ変数によって引き続きゲートされるか、または
canonical repository に固定されるか）、想定される dist-tag（`latest` → 3.9.0、`next` と
`nightly` は空）、およびロールバックが含まれます。終了コード `0` = `RESULT: READY`、`1` = ブロッキング前提条件の
失敗（`✗`）、`2` = 使用方法のエラーです。`--advisory <id,...>` は、チェックを非表示にすることなく警告（`!`）へ
格下げします。

3.9.0 のリリースフリーズがまだ有効な間に、実際のカット用ドライランを実行してください。ブランチは
タグの作成後、Phase 12c でフリーズを解除する前に作成されます。

### 3.8.58 のリハーサル（フォークのみ）

```bash
# 1. リハーサル用パラメーターを使用して現在の先端でドライランを実行
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. FORK の remote に対して実行（origin、または URL が canonical
#    repository である任意の remote は拒否されます。すべての手順でターミナル上の確認が求められます）
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. フォーク内で休止中のワークフローを実行（ドライランで canonical-repository への
#    固定が報告される場合は workflow_dispatch を使用）し、その後ロールバック
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop のバンプコミットは git plumbing を使用して作成され（working tree には触れません）、
サイクル開始コミットと同じ 5 つのファイルを更新します：`package.json`、`open-sse/package.json`、
`electron/package.json`、`package-lock.json`、`docs/openapi.yaml`。`[4.0.0]`
CHANGELOG セクションとその i18n ミラーは、その後 `develop` 上で、最初の
PR より前に開かれます。このスクリプトが npm dist-tag を変更することはありません。dist-tag のリハーサルにはスクラッチ用パッケージを使用してください。

### PR プレビューアーティファクト（一度だけビルドし、同じバイト列を昇格）

`.github/workflows/preview-artifact.yml` は PR head から本番用 tarball を 1 つビルドし、
そのビルド自体を検証します（#8084 slice (a)）。同一リポジトリの PR のみが対象で、何も公開されません。

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # または `preview-artifact` ラベルを追加
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # プレビュー版をインストール
```

この run では `npm ci`、`npm run build:release`、`npm run check:pack-artifact` を実行し、tarball を
pack した後、`npm run check:pack-boot`（偽のシークレット、一時データディレクトリ）を実行して再度 pack します。
digest が一致しない場合は失敗します。その後、`artifact-identity.json`（head SHA、base
SHA、lockfile hash、platform、arch、node ABI、bundler、build policy —
`scripts/release/artifact-identity.mjs`）を記録し、別の job で tarball を attest します。プレビューを
昇格するとは、その tarball をインストールすることです。ソースから再ビルドしてはなりません。

### カット（3.9.0、GO 後）

1. GO が [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) に記録されていること。
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` が `RESULT: READY` を出力すること。
3. ドライランで出力されたコマンドを使用して、`origin` 上にブランチを手動で作成します。
   スクリプトは `origin` へのプッシュを拒否します。レビュー済みの develop コミットを再利用するには、まず
   フォークに対して 3.9.0 の先端で `--execute` リハーサルを実行してください。両方の SHA が出力され、
   同じコミットをプッシュできます：

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 最初の PR がマージされる前に、`stable/v3` と `develop` を保護します（ルールセット + マージキュー）。
5. 休止中のワークフローは、ブランチの存在によって有効になります：`forward-port.yml`（`stable/v3` への push）、
   `validate-stable-pr.yml`（`stable/v3` への PR）、および `nightly-v4-build.yml`
   （`develop` をビルド）。本稼働前に、リポジトリシークレット `secrets.FORWARD_PORT_TOKEN` を設定します
   （forward-port PR で CI が実行されるようにするため）。nightly の公開は、オーナーがリポジトリ変数
   `vars.NIGHTLY_PUBLISH` を `true` に設定し、npm Trusted Publishing が
   `nightly-v4-build.yml` を受け入れるまで無効のままです。チャネルの解決には `scripts/release/dist-tag.mjs` を使用します。これは
   `npm-publish.yml` が使用するものと同じリゾルバーです。
6. チャネルを確認します：`npm view omniroute dist-tags --json` で `latest` = 3.9.0 と表示され、v4 が公開されるまでは
   `next` / `nightly` が存在しないことを確認します。
7. 必要な場合のロールバック：`git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   および `npm dist-tag add omniroute@3.8.59 latest`。

---

## ロールバック

リリースに重大な問題がある場合：

1. `gh release edit vX.Y.Z --prerelease`（最新リリースではないものとしてマーク）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（まだユーザーに利用されていない場合のみ）
3. または：`release/vX.Y.0` でホットフィックスを実施 → パッチリリース `vX.Y.(Z+1)`
4. GitHub Discussions と Discord で直ちに告知

## 厳守事項

- `main` に直接コミットしない
- `main` または `release/*` ブランチに対して `git push --force` を使用しない
- Husky フックをスキップしない（`--no-verify`）
- シークレット、認証情報、または `.env` ファイルをコミットしない
- カバレッジは 60/60/60/60 以上（ステートメント／行／関数／ブランチ）を維持する
- `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する場合は、必ずテストを追加または更新する

## 自動同期チェック

PR を作成する前に、ドキュメント同期ガードをローカルで実行してください：

```bash
npm run check:docs-sync
```

CI でも `.github/workflows/ci.yml`（lint ジョブ）でこのチェックが実行されます。
