# Plugin Marketplace (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **信頼できる情報源:** `src/lib/plugins/`（`marketplace.ts`、`manager.ts`、`manifest.ts`、
> `scanner.ts`、`loader.ts`）、`src/app/api/plugins/`、および
> `src/app/(dashboard)/dashboard/plugins/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute には、WordPress 形式のプラグインシステムが搭載されています。プラグインは自己完結型の
ディレクトリであり、それぞれに `plugin.json` マニフェストとエントリーファイルが含まれます。プラグインは、
リクエストパイプライン（`onRequest` / `onResponse` / `onError`）と、
ライフサイクルイベント（`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`）に
フックします。

**プラグインマーケットプレイス**は、そのシステム上に構築された検出レイヤーです。
インストール可能なプラグインを閲覧できるカタログを提供します。デフォルトでは、このカタログは
小規模な組み込みシードレジストリです。オペレーターはカスタムリモート
レジストリ URL を指定できます。その場合、DNS 解決を行う SSRF ガードによってフェッチが強化されます
（[セキュリティ](#security)を参照）。

すべてのプラグインルートは**ループバック限定**（Tier 1 — `LOCAL_ONLY`）です。プラグインは
子プロセス内でコードを読み込んで実行するため、認証の有無にかかわらず、
ループバック以外のオリジンからルートへアクセスすることはできません。詳細については、
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)を参照してください。

## Together適合する方法

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **レジストリ層**— `src/lib/plugins/marketplace.ts`: カタログをリスト/検索し、失敗するとシード レジストリにフォールバックします。
- **ライフサイクル層**— `src/lib/plugins/manager.ts` (`pluginManager`シングルトン): インストール、アップグレード、アクティブ化、非アクティブ化、アンインストール、スキャン、起動ロード。
- **マニフェスト層**— `src/lib/plugins/manifest.ts`: Zodスキーマ+ `plugin.json`のデフォルトです。
- **スキャナー**— `src/lib/plugins/scanner.ts`: プラグイン ディレクトリ下のディスク上のプラグインを検出します。
- **ローダ**— `src/lib/plugins/loader.ts`: 個別のNode.js子プロセスで各プラグインを生成し、 IPCを介してフック呼び出しを仲介します。子はサンドボックスではありません (下記の「プラグイン実行の分離」を参照)。

## マーケットプレイスカタログ

`listMarketplacePlugins()`（`src/lib/plugins/marketplace.ts`）は、
`MarketplaceEntry` オブジェクトのリストを返します。

| フィールド    | 型       | 備考                                       |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | kebab-case 形式のプラグイン名              |
| `version`     | string   | semver                                     |
| `description` | string   | 短い概要                                   |
| `author`      | string   | 作者 / 組織                                |
| `license`     | string   | SPDX 形式のライセンス ID                   |
| `downloadUrl` | string   | ソースのダウンロード URL（空の場合あり）   |
| `repository`  | string?  | オプションのリポジトリ URL                 |
| `tags`        | string[] | 検索 / フィルター用タグ                    |
| `downloads`   | number   | ダウンロード数                             |
| `rating`      | number   | 0～5                                       |
| `verified`    | boolean  | エントリが検証済みとしてマークされているか |
| `lastUpdated` | string   | ISO に準拠した日付文字列                   |

カスタムレジストリ URL が設定されていない場合、カタログには組み込みの
`SEED_REGISTRY`（現在は `request-logger`、`rate-limiter`、`cost-tracker`、
`theme-manager`）が使用されます。シードレジストリは常に利用できます。設定されたリモート
レジストリに到達できない場合、`200` 以外のステータスが返された場合、または認識できない
本文が返された場合、`listMarketplacePlugins()` は警告をログに記録し、シードリストへフォールバックします。

> 注: マーケットプレイスの**カタログ**（閲覧 / 検索）はエンドツーエンドで接続されていますが、
> カタログからのワンクリックによるマーケットプレイス**インストール**はまだ実装されていません。
> 現在、マーケットプレイスのエントリにあるダッシュボードの「インストール」ボタンを押すと、
> 「近日対応予定」という通知が表示されます。現時点では、ローカルパスからのインストールフロー
> （`POST /api/plugins`）とディスク上の検出（`POST /api/plugins/scan`）を通じてインストールします。

## REST API

すべてのエンドポイントには管理認証 (`requireManagementAuth`) が必要です**そして**ループバック専用の— `/api/plugins`および`/api/plugins/`は`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) にリストされています。

| 終点                             | 方法   | 説明                                                                                |
| -------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | インストールされているプラグインを一覧表示します (オプションの`?status=`フィルター) |
| `/api/plugins`                   | POST   | プラグインのソース ディレクトリからプラグインをインストールする                     |
| `/api/plugins/scan`              | POST   | プラグイン ディレクトリをスキャンし、新しいプラグインを登録します                   |
| `/api/plugins/marketplace`       | GET    | マーケットプレイスのカタログ エントリを一覧表示する                                 |
| `/api/plugins/[name]`            | GET    | インストールされているプラグインの詳細を取得する                                    |
| `/api/plugins/[name]`            | DELETE | プラグインをアンインストールする                                                    |
| `/api/plugins/[name]/activate`   | POST   | アクティブ化 ( +レジスターフックのロード)                                           |
| `/api/plugins/[name]/deactivate` | POST   | 非アクティブ化 ( `onDeactivate`を起動、フックの登録を解除)                          |
| `/api/plugins/[name]/config`     | GET    | プラグイン構成+構成スキーマを取得する                                               |
| `/api/plugins/[name]/config`     | PUT    | プラグイン構成を更新します (スキーマに対して検証済み)                               |

`GET /api/plugins` `status`フィルターは、 `installed` / `active` / `inactive` / `error`のいずれかを受け入れます。無効な値は`400`を返します。

### インストールされているプラグインを一覧表示する

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### ローカルパスからインストールする

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

The `path` must be an **absolute** path to a directory **inside the plugin sources directory**: `plugin-sources` next to the plugin root, so `~/.omniroute/plugin-sources/` by default, or `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` when that variable is set (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Copy or clone the plugin there first. The install is refused with `400` when the path contains `..` or a null byte, lies outside that directory, resolves outside it through a symlink, contains a symlink whose target is outside it, or when the directory does not exist. The source directory must contain a valid `plugin.json` (or be a parent of one). On success the response is `201` with the installed plugin row.

他のプラグイン ルートとは異なり、このルートでは、ログインが無効になっている場合でも (`requireLogin=false`)、管理資格情報 (ダッシュボード セッションまたは管理スコープのAPIキー) が必要です。コードのインストールは決して匿名のアクションではありません。

### マーケットプレイスを閲覧する

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### プラグイン設定を更新する

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validates each provided value against the plugin's `configSchema` (declared in the manifest): `number` fields honor `min`/`max`, `select` fields must match the declared `enum`. Keys not present in the schema are allowed through.

## 設定

### プラグインディレクトリ

プラグインは OmniRoute のデータディレクトリ配下に配置されます。

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # （または manifest.main が指すファイル）
```

`getDefaultPluginDir()`（`src/lib/plugins/scanner.ts`）は、次の
3 段階でこのディレクトリを解決します。

1. **`OMNIROUTE_PLUGINS_DIR`** が設定されている場合は、`HOME` の値に関係なく、その値をそのまま使用します。これは
   Docker/K8s 向けの明示的な設定項目です。これらの環境では、通常コンテナのホームディレクトリとは
   無関係なパスにプラグインツリーがバインドマウントされます（#11827）。
2. `<home>/.omniroute/plugins`。ここで `<home>` は `HOME` / `USERPROFILE`
   環境変数から取得されます。
3. プロセスにホームが一切設定されていない場合は、`/tmp/.omniroute/plugins`。

解決されたディレクトリは、起動時に `scanner.dir_resolved` として一度ログに記録され、
採用された入力（`OMNIROUTE_PLUGINS_DIR`、`home`、または `no-home-fallback`）も示されます。これにより、暗黙に手順 3 が選択されたイメージでも、単に空のプラグイン一覧だけを報告するのではなく、その旨が明示されます。
`POST /api/plugins/scan` は、その場所にある有効な
`plugin.json` を保持するすべてのサブディレクトリを検出して登録します。同じディレクトリが、
`pluginManager.install()` によるプラグインのコピー先ルートでもあるため、オーバーライドすると検出先と
インストール先が一緒に移動します。

> **`OMNIROUTE_PLUGINS_DIR` は `OMNIROUTE_PLUGIN_PATH` ではありません。** 後者は、
> `omniroute` サブコマンドを追加する `omniroute-cmd-*` npm パッケージを見つけるために、
> CLI コマンドプラグインローダー（`bin/cli/plugins.mjs`）のみが読み取ります。ここで説明しているランタイムスキャナーには
> 影響しません。こちらについては [PLUGINS.md](./PLUGINS.md) を参照してください。

### カスタムマーケットプレイスレジストリ URL

マーケットプレイスカタログのソースは、`pluginMarketplaceUrl` 設定から読み取られます
（`src/lib/plugins/marketplace.ts` は `settings.pluginMarketplaceUrl` を読み取ります）。
`http(s)` URL が設定されている場合、`listMarketplacePlugins()` はその URL を取得し、
トップレベルの JSON エントリ配列、または `plugins` 配列を持つオブジェクトのいずれかを受け付けます。
文字列の `name` を持たないエントリは除外されます。未設定の場合（または取得が
SSRF ガードにより失敗した場合や、不正なレスポンスが返された場合）は、組み込みのシードレジストリが
使用されます。

ダッシュボードの「Marketplace」タブには、この URL を入力するフィールドがあります（
`GET /api/settings` から読み戻されます）。

> 実装上の注意：ダッシュボードの「Save」アクションは、
> `pluginMarketplaceUrl` を `PATCH /api/settings` に送信します。執筆時点では、この
> キーは `updateSettingsSchema`
> （`src/shared/validation/settingsSchemas.ts`）で宣言されていないため、これに依存する前に、
> 使用しているリリースで設定が永続化されることを確認してください。設定ストアにキーが存在すれば、**読み取り**パス（`getSettings()` →
> `listMarketplacePlugins()`）はそのキーを反映します。

## 安全

### ルート層—ループバックのみ

プラグインは生成された子プロセスでコードを実行するため、 `/api/plugins`サーフェス全体が`LOCAL_ONLY` (Tier 1) に分類されます。ループバック強制は無条件で実行されます**前に**認証チェックがないため、漏洩した管理トークンがトンネルを介してボックスに到達しても、プラグインのインストール、アクティブ化、またはアンインストールはできません。 [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)およびハード ルール#15 / #17を参照してください。

### マーケットプレイス レジストリSSRFガード

カスタム レジストリURLは攻撃者の影響を受ける構成であるため、 `listMarketplacePlugins()`それをフェッチする前に 2 つのレイヤーを介して実行します。

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:`以外のものはすべて拒否します。
   - リテラルのprivate/loopback/link-local/ULAホスト (IPv4**そして**正規の`isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) を介したIPv6、 IPv4-mappedを含む)。
   - 解決します**両方**`A`および`AAAA`記録し、次の場合は拒否します。**どれでも**解決されたアドレスはプライベート—で、パブリックホスト名→プライベート IP バイパスを閉じています。
   - **フェイルクローズ**: DNS解決失敗によりURLが拒否されます。
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): フェッチ時にパブリック専用のURLガードを再適用し、**リダイレクトをブロックする**(パブリック→プライベート`30x`ピボットはありません)。

いずれかの層で失敗したURLはリクエスト—を中止せず、マーケットプレイスは黙って組み込みのシード レジストリにフォールバックし、警告を記録します。

> このガードは、特に A + AAAA解決し、 IPv4-onlyチェックの代わりに正規の`isPrivateHost`を使用するために、 PR #3774で強化されました。

### プラグイン実行の分離

> **プラグインはサンドボックス化されていません。**子プロセスは、 OmniRouteユーザーとして実行される通常のNode.jsプロセスであり、 VMコンテキストやNode.js権限フラグはありません。そのため、プラグイン コードは、ユーザーが実行できる任意のファイルの読み取りと書き込み、プログラムの実行、ネットワークへのアクセスが可能です。 `requires.permissions` 、子がどの環境変数を受け取るかを決定するだけです。他の権限は強制されません。信頼できるプラグインのみをインストールしてください。以下のプロセス境界にはクラッシュとハングが含まれています。それはセキュリティ境界ではありません。

- **プロセスの分離**— `loadPlugin()` (`src/lib/plugins/loader.ts`) は、個別のNode.js子プロセスで各プラグインを生成し、 IPC経由で通信します。フック呼び出しには、 `SIGTERM` → `SIGKILL`エスカレーションでタイムアウトが発生します。
- **環境許可リスト**—子は、許可リストに登録された環境変数セットのみを受け取ります。より広範なセットは、マニフェストが`env`権限を要求した場合にのみ付与されます。
- **ソース封じ込めをインストールする**— `POST /api/plugins`プラグインのソース ディレクトリからのみ読み取ります (「ローカル パスからのインストール」を参照)。パスは`realpath`で正規化されており、厳密にそのディレクトリ内に存在する必要があり、それをエスケープするシンボリックリンクを含むソース ツリーは、何かがコピーされる前に拒否されます。
- **パスの封じ込め**— install/upgrade/uninstallプラグイン ディレクトリと`manifest.main`が解決されることをアサートします**内で**コピーまたは再帰的削除の前に管理対象プラグインのルートを作成します (改ざんされたDBパスと`manifest.main`での`../`トラバーサルを防ぎます)。アクティブ化すると、 `realpath`経由でシンボリックリンクが解決され、プラグイン ディレクトリをエスケープするエントリ ポイントのロードが拒否されます。
- **オプションの整合性ピン**—マニフェストでは`integrity` (`sha256-<base64>`、 SRI形式) フィールドを宣言できます。存在する場合、ローダーはロード時にエントリ ファイルのハッシュを検証し、不一致がある場合はアクティブ化を拒否します。オプトインの改ざん検出です。**ない**セキュリティ境界: ロードされたプラグインが実行できることは制限されません。
- **フックにクライアント資格情報がありません**— `onRequest`、 `onResponse`および`onError`に渡されるコンテキストでは、 `authorization`、 `x-api-key`、 `proxy-authorization`および`cookie`ヘッダーが削除され、 APIキー レコードにはキー値が含まれません ( `src/lib/plugins/hooks.ts`の`redactPluginContext()` )。

## マニフェスト (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) によって検証されました:

| 分野               | タイプ    | 注意事項                                                      |
| ------------------ | --------- | ------------------------------------------------------------- |
| `name`             | 弦        | 必須;ケバブケース (`^[a-z0-9-]+$`)、1 ～ 100 文字             |
| `version`          | 弦        | 必須;センバー (`MAJOR.MINOR.PATCH`)                           |
| `description`      | 弦？      | ≤ 500 文字                                                    |
| `author`           | 弦？      | ≤ 200文字                                                     |
| `license`          | 弦？      | デフォルトは`MIT`                                             |
| `main`             | 弦？      | エントリーファイル;デフォルトは`index.js`                     |
| `source`           | 列挙型?   | `local` \| `marketplace` (デフォルトは`local`)                |
| `tags`             | 弦[]？    | タグを検索                                                    |
| `requires`         | 物体？    | `{ omniroute?, permissions[] }`                               |
| `hooks`            | 物体？    | プラグインが実装するフックを宣言するブール値                  |
| `skills`           | 物体[]？  | オプションのスキル定義                                        |
| `enabledByDefault` | ブール値? | インストール時に自動アクティブ化                              |
| `configSchema`     | 物体？    | 設定フィールドのマップ (`string`/`number`/`boolean`/`select`) |
| `integrity`        | 弦？      | オプションの`sha256-<base64>`エントリーファイル ピン          |

権限は列挙型`network` / `file-read` / `file-write` / `env` / `exec`から取得されます。 `env`のみが実行時効果 (子に対するわずかに大きい環境変数許可リスト) を持ちます。他のものは宣言であり、強制されません。

## ライフサイクルフロー

```
install (POST /api/plugins, パス)
  → マニフェストをスキャン/検証 → ステージングへコピー → main がディレクトリ内にあることを確認
  → ~/.omniroute/plugins/<name> へアトミックに名前を変更 → DB 行を挿入
  → onInstall を実行 → enabledByDefault の場合: activate

activate (POST /api/plugins/{name}/activate)
  → realpath の包含チェック → loadPlugin()（子プロセスを起動）
  → 宣言されたフックを登録 → status = "active" → onActivate を実行

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate を実行（登録解除の前）→ フックの登録を解除
  → 子プロセスを終了 → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → active の場合は deactivate → onUninstall を実行
  → 包含チェック済みのプラグインディレクトリを再帰的に削除 → DB 行を削除
```

マニフェストのバージョンがインストール済みのバージョンより**厳密に
新しい**ディレクトリに対して `install` を再実行すると、自動的にアップグレードされます（クリーン再インストールとなり、設定は
デフォルトにリセットされます）。同じかそれ以前のバージョンは拒否されます。

## データベース

テーブル `plugins`（マイグレーション `076_create_plugins.sql`）:

| 列              | 型      | 備考                                              |
| --------------- | ------- | ------------------------------------------------- |
| `id`            | TEXT PK | UUID                                              |
| `name`          | TEXT    | 一意                                              |
| `version`       | TEXT    | semver。デフォルトは `1.0.0`                      |
| `description`   | TEXT    | 任意                                              |
| `author`        | TEXT    | 任意                                              |
| `license`       | TEXT    | デフォルトは `MIT`                                |
| `main`          | TEXT    | エントリファイル。デフォルトは `index.js`         |
| `source`        | TEXT    | デフォルトは `local`                              |
| `tags`          | TEXT    | JSON 配列。デフォルトは `[]`                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`  |
| `enabled`       | INT     | 0/1。デフォルトは 0                               |
| `manifest`      | TEXT    | 完全なマニフェスト JSON                           |
| `config`        | TEXT    | JSON。デフォルトは `{}`                           |
| `config_schema` | TEXT    | JSON。デフォルトは `{}`                           |
| `hooks`         | TEXT    | 宣言されたフック名の JSON 配列。デフォルトは `[]` |
| `permissions`   | TEXT    | JSON 配列。デフォルトは `[]`                      |
| `plugin_dir`    | TEXT    | 絶対インストールディレクトリ                      |
| `error_message` | TEXT    | `status = "error"` の場合に設定                   |
| `installed_at`  | TEXT    | `datetime('now')`                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                 |
| `activated_at`  | TEXT    | アクティベーション時に設定                        |

プラグインのメトリクス/分析は、追加のテーブル
（`090_plugin_metrics.sql`、`091_plugin_analytics.sql`）で追跡されます。

## ダッシュボード

`/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) のダッシュボード ページには 2 つのタブがあります。

- **インストール済み**— 、宣言されたフック、 activate/deactivateトグル、アンインストール ボタン、および「プラグインのスキャン」アクション (`POST /api/plugins/scan`) とともに、インストールされているプラグインをリストします。
- **市場**—カスタム レジストリURLを設定するフィールドを含む`GET /api/plugins/marketplace`のカタログを表示します。

このページには、プラグインがOmniRouteプロセスの完全な権限で実行されるという警告が常に表示されます。

プラグインごとの設定ページは`/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`) にあります。

## 関連項目

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` がループバック限定（Tier 1）である理由
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 関連するスキルフレームワーク
  （`src/lib/skills/`）。プラグインはマニフェストでスキルを宣言できます
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — イベント駆動型の外部向け
  連携
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  すべてのプラグインルートがエラーレスポンスに使用する `buildErrorBody()` パターン
