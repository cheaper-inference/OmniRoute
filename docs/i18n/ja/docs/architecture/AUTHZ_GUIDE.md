# Authorization Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **信頼できる情報源:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **最終更新日:** 2026-09-22 — スコープの名前空間はMCP-SERVER.mdを参照

OmniRouteには、すべてのAPIリクエストをゲートするルート認識型認可パイプラインがあります。分類は**決定論的**であり、**フェイルクローズ**です。分類できないものはすべて`MANAGEMENT`として扱われ、セッションまたは管理グレードのトークンを要求します。このページでは、ルートを保守するエンジニアや新しいエンドポイントを設計するエンジニア向けにモデルを説明します。

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ソース: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 2つの認証モード

### 1. APIキー（Bearer）

OpenAI/Anthropic/Gemini互換クライアントAPI、およびキーに `manage` スコープがある場合の一部の管理ルートで使用されます。

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` の `isValidApiKey()` / `extractApiKey()` によって検証され、`src/shared/utils/apiAuth.ts` を通じて再エクスポートされます。バリデーターは、永続的なパススルーキーとして `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境変数も受け付けます（issue #1350）。

### 2. ダッシュボードセッション（auth_token Cookie）

ダッシュボードページおよび管理操作で使用されます。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie は、JWT の検証に成功し、かつ `authenticated: true` を持つ場合にのみセッションになります
（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。Cookie のすべての利用箇所（ダッシュボードのルートガード（`isDashboardSessionAuthenticated()`）、認可パイプラインのリフレッシュ、WebSocket ハンドシェイク、ライブサーバー、`/api/settings/require-login`、`/api/auth/status`）は、このヘルパーを経由します。
`JWT_SECRET` で署名された他の JWT も存在します。たとえば、Cursor CLI のパススルーはキー保有者向けに
`iss "omniroute" / aud "cursor-cli"` トークンを発行しますが、これらがセッションになることはありません
（#13298）。

`src/shared/utils/apiAuth.ts` の `isDashboardSessionAuthenticated()` によって検証されます。パイプラインは、30日間の有効期間が残り7日未満になると、JWT を自動的にリフレッシュします。

セッションは、30日間の有効期間が終了する前に終了する場合もあります。これは、すべての発行処理が `mintDashboardSessionToken` を経由し、発行時刻 `iat` と ID `jti` を付与するためです。また、検証処理では2つの設定を確認します。1つ目は、パスワード変更時に設定される `sessionsValidAfter` です。これにより、それより前に発行されたすべてのセッションは検証に失敗します（パスワードを変更したブラウザーには新しい Cookie が発行されます）。2つ目は `revokedDashboardSessions` で、`POST /api/auth/logout` によってサインアウトしたセッションの `jti` が追加されます。以前のリリースで発行されたセッションにはどちらのクレームも含まれず、最初のパスワード変更が行われるまで有効なままです。設定を読み取れない場合、セッションは信頼されません。

一部の管理ルートは、どちらのモードでも受け付けます。APIキーに `manage`（または `admin`）スコープがある場合、Cookie または `Bearer <key>` のいずれかを使用できます。これにより、v3.8 で追加された「API呼び出しで設定可能」なワークフローが実現します。

#### オプションの OIDC ログインゲート（#6973）

ダッシュボードの管理者ログインでは、デフォルトのパスワードログインに加えて、**オプトイン**の OIDC（OpenID Connect）フローも
サポートされます。パスワードログインが削除されることはなく、追加で利用できるようになるだけです。

- `settings.oidcEnabled === true` **かつ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` がすべて設定されている場合を除き無効です（設定 → 認証）。
  それ以外の場合、`GET /api/auth/oidc/login` は `400` を返します。
- `GET /api/auth/oidc/login` は、Issuer の
  `/.well-known/openid-configuration` から `authorization_endpoint` を検出し
  （`<issuer>/authorize` にフォールバック）、受信リクエスト
  （`x-forwarded-proto` 対応）からリダイレクト URI を構築し、ランダムな `state` を
  `httpOnly` の `oidc_state` Cookie に保存したうえで、IdP にリダイレクトします。
- `GET /api/auth/oidc/callback` は `state` を検証し、認可コードを交換し、
  Issuer の JWKS（`jose` の `createRemoteJWKSet`、JWKS URI ごとにキャッシュ）
  を使用して ID トークンの署名を検証し、`issuer`/`audience` をチェックします。
  ダッシュボードへのアクセス許可には、空でない `oidcAllowedSubjects` リスト、
  `oidcAdmissionClaim` ポリシー、またはその両方が必要です。サブジェクトリストは、
  `email_verified === true` の場合に限り `sub` または `email` と照合されます。
  オプションのクレームポリシーには、ドット区切りの ID トークンクレームパス
  （例: `realm_access.roles`）と、受け入れる値の配列を指定します。解決された
  クレームは文字列の配列であり、受け入れ値を少なくとも 1 つ含んでいる必要があります。
  両方のポリシーが設定されている場合は、両方を満たす必要があります。クレームが
  存在しない場合や形式が不正な場合はフェイルクローズとなり、どちらのポリシーも
  ない場合、コールバックはログインを拒否します（`not_configured`）。
  既存のサブジェクトのみの設定は変更なく引き続き動作します。
- Keycloak は通常、レルムロールを ID トークンではなくアクセストークンにマッピングします。
  レルムロール `admin` を必須にするには、このクライアント用のプロトコルマッパーを
  設定して `realm_access.roles` を **ID トークン** に含め、そのうえで
  `oidcAdmissionClaim` を `{ "path": "realm_access.roles", "values": ["admin"] }`
  に設定します。ロールのみのアクセス許可を有効にする前に、このクライアントの
  実際の ID トークンクレームを確認してください。このアプリケーションは
  アクセストークンのロールを読み取りません。IdP 側でのトークン拒否は補助的に
  使用できますが、このアプリケーション側のチェックの代わりにはなりません。
- 成功すると、パスワードログインが発行するものと**まったく同じ** 30 日間有効な
  `auth_token` JWT（`src/app/api/auth/login/route.ts`）を発行するため、
  ダッシュボードの残りのセッション処理パイプライン（自動更新、Cookie フラグ）は
  変更されません — OIDC は Cookie の発行方法のみを置き換え、Cookie が与える
  権限は変えません。IdP のロールやグループを変更しても、既存の OmniRoute
  セッションは無効になりません。セッションの有効期間は、ログアウト、パスワードの
  ローテーション、またはセッションの有効期限によって引き続き管理されます。
- すべての `oidc*` 設定（`oidcEnabled`、`oidcDisablePasswordLogin`、
  `oidcIssuer`、`oidcClientId`、`oidcClientSecret`、`oidcAllowedSubjects`、
  `oidcAdmissionClaim`、`oidcRedirectPath`、`oidcScopes`）は
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  （`src/shared/constants/securityImpactingSettings.ts`）に含まれます。
  `PATCH /api/settings` は、リクエスト本文に管理パスワードを
  `currentPassword` として含めない限り `400 PASSWORD_REQUIRED` を返し、
  パスワードが正しくない場合は `401 PASSWORD_MISMATCH` を返します。
  `oidcDisablePasswordLogin` はパスワード _login_（`POST /api/auth/login`）を拒否しますが、
  保存済みのパスワードハッシュは保持し、再認証では引き続き
  `currentPassword` と照合します。
- `corsOrigins` と `bruteForceProtection` も
  `SECURITY_IMPACTING_SETTINGS_KEYS` に含まれます。いずれかを緩和すると
  ログイン防御が弱まるため、同じ `currentPassword` による再認証が必要です
  （セキュリティタブで入力を求められます）。また、JSON インポートではこれらが
  破棄されます。
- すべてのセキュリティポリシーキー — `SECURITY_IMPACTING_SETTINGS_KEYS` のエントリ、
  すべての `oidc*` キー、ダッシュボードセッション状態 — は
  `PATCH /api/settings` において **operator-only** です。manage スコープの API キーや
  `oma_` アクセストークンは、正しい `currentPassword` を送信した場合でも
  `403` で拒否されます。この拒否は、`reason: OPERATOR_REQUIRED` を伴う
  `settings.update_failed` として監査記録されます
  （`src/lib/api/operatorCredential.ts` の `requireOperatorCredential()`）。
  通常の設定（テーマ、表示設定）は、`manage` キーまたは `admin` アクセストークンで
  引き続き書き込み可能です。`/api/settings` 自体（および
  `/api/settings/require-login`）へのすべての変更には、`admin` アクセストークンの
  スコープも必要です（`src/server/authz/accessScopes.ts` の
  `ADMIN_MUTATION_EXACT_PATHS` による完全なパス一致）。`GET` は引き続き `read` で、
  その他の `/api/settings/*` サブルート（プロキシ、コンボのデフォルト、
  モデルエイリアス、圧縮、パージなど）は、メソッドから推測される `write` スコープを
  引き続き使用します。
- `POST /api/settings/import-json` はこの再認証をスキップするため、書き込み前に
  `IMPORT_STRIPPED_SETTINGS_KEYS`（同じファイル）に含まれるすべてのキーを破棄します。
  これには、パスワードと `currentPassword`、すべての
  `SECURITY_IMPACTING_SETTINGS_KEYS` エントリ、ダッシュボードセッション状態
  （`sessionsValidAfter`、`revokedDashboardSessions`）が含まれます。
  そのため、古いバックアップをインポートしても、パスワード変更やサインアウトで
  すでに終了したセッションが復活することはありません。

#### オプションの TOTP 二要素ログイン (#16619)

設定 → セキュリティから登録します。オペレーターが有効にするまでオフです
（`src/server/auth/dashboardMfa.ts`）。

- **対象:** パスワードログイン（`POST /api/auth/login`。その後 `POST /api/auth/mfa/verify` が必要）と、`omniroute connect`（`POST /api/cli/connect`。パスワードのみの交換は拒否され、コードは `totp` として受け取られます）。
- **対象外:** OIDC / SSO サインイン（`/api/auth/oidc/callback`）では OmniRoute の TOTP は要求されません。IdP 独自の二要素認証に依存するため、OIDC が有効な場合は IdP で MFA を強制してください。
- **復旧**（デバイスを紛失した場合、リカバリーコードが残っていない場合、または `STORAGE_ENCRYPTION_KEY` の変更後など、要素を検証できなくなった場合）:
  1. `OMNIROUTE_DISABLE_MFA=true` を設定してサーバーを再起動します。
  2. ホスト自体（ループバックピアおよび `Host` がループバックである環境。例: `http://localhost:20128`）で、パスワードを使用してサインインします。このオリジンに限り二要素目がスキップされます。それ以外のすべてのオリジンでは引き続きコードが必要です。
  3. 設定 → セキュリティ → 無効化で、パスワードを入力し、コードは空欄のままにします。`POST /api/auth/mfa/disable` は、この変数が設定されていて、リクエストがホストから送信された場合に限り、`code` のないボディを受け付けます。それでもダッシュボードのセッションと現在のパスワードが必要であり、`auth.mfa.disabled` として、`secondFactor: "recovery_switch"` の監査記録が残されます。
  4. `OMNIROUTE_DISABLE_MFA` の設定を解除して再起動し、必要に応じて再登録します。

## ルートクラス

`src/server/authz/types.ts` 3 つのクラスを定義します。決定的に分類できないルートは`MANAGEMENT`にフォールバックします。

| クラス       | 説明                                                                                                                                                           | 認証が必要です                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `PUBLIC`     | 明示的に安全なルート—ログイン、ログアウト、ステータス、ヘルス、オンボーディング ブートストラップ。                                                             | なし                                                         |
| `CLIENT_API` | モデル提供エンドポイント— `/api/v1/*`、 `/api/v1beta/*`、およびエイリアス`/v1/*`、 `/v1beta/*`、 `/chat/completions`、 `/responses`、 `/models`、 `/codex/*`。 | 有効な`REQUIRE_API_KEY`機能フラグが有効な場合のベアラー キー |
| `MANAGEMENT` | ダッシュボード ページ、設定、プロバイダー、キー、管理エンドポイント、診断エンドポイント。                                                                      | `manage`スコープを備えたダッシュボード セッションOR Bearer   |

いくつかの`MANAGEMENT`アクションは次のとおりです。**オペレータのみ**: `manage`キーでは十分ではありません。保存されている資格情報のエクスポート (`GET /api/settings/export-json`、 `GET /api/db-backups/export`、 `GET /api/db-backups/exportAll`)、ライブ データのバックアップの復元 ( `dryRun=true`を含む`POST /api/db-backups/import` 、 id による`POST /api/db-backups`復元、 `POST /api/settings/import-json`)、復元ポイントの破棄 (`DELETE /api/db-backups`クリーンアップ、および`PATCH /api/db-backups`保持が保持されるためバックアップごとに自動プルーニングが行われるため)、ダッシュボード セッション、ローカルCLIサブジェクト、またはログインが無効になっている必要があります。同期トークン (`POST /api/sync/tokens`) の発行と`admin` CLIアクセス トークン (`POST /api/cli/tokens`) の作成には、すべてのログイン モードでダッシュボード セッションまたはローカルCLIサブジェクトが必要です。任意のスコープのAPIキーと`oma_`アクセス トークンはオペレーターの資格情報ではありません。必要な場合は常に`403`取得します。チェックは`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) にあります。ログイン設定の変更もオペレータのみです。 `POST /api/settings/require-login` (管理パスワードの設定 / `requireLogin`の切り替え) は、パスワードが存在するとそれらの資格情報のみを受け入れます。 —初回実行ブートストラップ ウィンドウ (パスワードはまだありません) は変更されません。 —とダッシュボード セッションは、パスワードを置き換えるために`currentPassword`送信する必要があります (`403`見つからないか間違っている場合は、 `settings.update_failed`として監査されます)。ローカルのCLIとログインが無効になっているインスタンスはリカバリ パスを保持しており、両方ともデータ ディレクトリを所有するホストにバインドされているため、リカバリ パスなしでパスワードを設定できます。

## パイプライン

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

信頼できる内部ヘッダー ( `src/server/authz/headers.ts`で定義) は次のとおりです。**受信リクエストから削除される**分類の前に、 —クライアントは、サブジェクトになりすますために`x-omniroute-auth-*`事前に設定することはできません。

### 保険契約

各ルート クラスには`src/server/authz/policies/`にポリシーがあります。

- **`publicPolicy`** (`policies/public.ts`) —常に`allow({ kind: "anonymous", id: "anonymous" })`を返します。
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer を抽出し、 `validateApiKey()`経由で検証します。有効な`REQUIRE_API_KEY`機能フラグが無効になっている場合にのみ、匿名に移行します。有効なフラグは`isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) によって解決されるため、ダッシュボード機能フラグと環境変数によって`/api/v1/*`、 `/api/v1beta/*`、およびエイリアスが一貫して制御されます。リゾルバ障害がフェールクローズされる。クライアントAPIルート (ダッシュボード モデル カタログで使用される`/api/v1/models`を含む) でのダッシュボード セッション リクエストを許可します。 Entra ID SSOが有効な場合、構造的に Entra トークンであるベアラー (3 つの Base64url セグメント、 `RS*` alg、 `kid`) はSSOブランチによって処理されます。**前に**`validateApiKey()`とその判定は最終的な—であり、API キー パスや匿名ブランチへの劣化は決して通過しないため、アイデンティティ プロバイダーの停止がオープン アクセスになることはありません。静的APIキーは影響を受けません。 [「エントラID SSOを](../security/ENTRA_SSO.md)参照してください。
- **`managementPolicy`** (`policies/management.ts`) — 、ダッシュボード セッション、内部モデル同期リクエスト ( `/api/providers/[name]/(sync-models|models)`と照合) を受け入れるか、 `isAuthRequired()` false を返した場合は完全にスキップします。 Bearer トークンが存在するが無効な場合は 403 (`AUTH_001`) を返し、それ以外の場合は 401 を返します。また、認証ブランチ—の前にルート ガード層 (LOCAL_ONLY / ALWAYS_PROTECTED) を適用します。 [「ルート ガード層」](../security/ROUTE_GUARD_TIERS.md)を参照してください。 `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (現在: `/api/mcp/`) のLOCAL_ONLYパスは、Bearer キーが`manage`スコープを保持している場合、非ループバックからアクセスできます。他のすべてのLOCAL_ONLYパスは、スコープに関係なく厳密なループバックのままです。

ポリシーが成功すると、 `AuthSubject`と`kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`が返されます。ダウンストリーム ハンドラーは、認証ロジックを再実行する代わりに、 `src/server/authz/assertAuth.ts`の`assertAuth(request, "CLIENT_API")`を介してそれを読み取ることができます。

## パブリックルートリスト

`src/shared/constants/publicApiRoutes.ts`は明示的な許可リストです。

リストは次のように分割されます**形**、分割は負荷に耐えます (GHSA-74g9-q8f6-793h)。プレフィックスは`startsWith()`と一致するため、先頭文字を共有するすべての隣接パスとも一致します。 `/api/usage/om-usage` `/api/usage/om-usage<anything>` PUBLICとマークされたプレフィックスとして使用され、 Next はそれを`/api/usage/[connectionId]` —という独自の認証を持たないハンドラーに解決します。

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

読み取り専用ルートはパブリックです**のみ**安全な方法のために。注: `classifyRoute()` 、 PUBLICフォールスルー—から`/api/v1/*`と`/api/v1beta/*`を除外します。これらは常に`CLIENT_API`あるため、Bearer-key ポリシーが引き続き適用されます。

## 新しいルートの追加

### パターン 1 — 公開クライアント API エンドポイント（Bearer 認証）

`/api/v1/` および `/api/v1beta/` 配下のルートは、自動的に `CLIENT_API` として分類されます。ミドルウェアが Bearer チェックを強制するため、ルートハンドラーで再度実行する必要はありませんが、必要に応じてサブジェクトを読み取ることができます。

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ハンドラーのロジック
}
```

### パターン 2 — 管理エンドポイント（セッション、または Bearer + manage）

`src/lib/api/requireManagementAuth.ts` の `requireManagementAuth()` を使用します。

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ハンドラーのロジック
}
```

`requireManagementAuth()` は、成功時には `null`、エラー時には JSON エラーの `Response` を返します。

- 401 `AUTH_001`「認証が必要です」— 認証情報がまったくない
- 403 — Bearer が無効、**または** Bearer は存在するものの、キーに `manage` / `admin` スコープがない

`hasManageScope(scopes)` は、`"manage"` または `"admin"` の場合に true を返します。

### パターン 3 — 公開許可リストへの追加

利便性ではなく、形状に基づいて追加先のセットを選択してください。単一ルートは `PUBLIC_API_ROUTES_EXACT`（GET 専用の場合は `PUBLIC_READONLY_CORS_API_ROUTES`）に追加します。真のサブツリーのみを `PUBLIC_API_ROUTE_PREFIXES` に追加でき、エントリは**必ず `/` で終わる必要があります**。単一ルートをプレフィックスリストに追加すると、先頭文字列が共通するすべての隣接パスも公開されます。これには、後から追加される動的セグメントの兄弟ルートも含まれます（GHSA-74g9-q8f6-793h）。`tests/unit/public-api-routes.test.ts`、`tests/unit/authz/public-route-exact-match.test.ts`、`tests/unit/authz/classify.test.ts` の単体テストも更新してください。

## スコープ

3つの名前空間があります。各チェッカーは自身の文字列のみを読み取ります。`manage`が`read:compression`に対して`scopeMatches`で失敗する理由や、`read`アクセストークンが`PATCH /api/keys/{id}`を実行できない理由を含む、並列の比較については、[3つのスコープ名前空間](../frameworks/MCP-SERVER.md#three-scope-namespaces)を参照してください。

APIキーには`scopes`配列が含まれています（`api_keys.scopes`にJSONとして保存されます。`src/lib/db/apiKeys.ts`を参照）。

### 管理スコープ

- `manage` / `admin` — `hasManageScope`。管理APIルートへのベアラーアクセス。
- `mcp:connect`、`self:usage`、`self:account-quota`、および`policy:bypass-provider-quota`は、追加的な完全一致スコープです。これらは`MANAGEMENT_API_KEY_SCOPES`の範囲外にあります。`mcp:connect`は、`/api/mcp/`の非ループバックの切り出しのみを開放します。

### MCPツールスコープ

カタログとマッチングルール（同一文字列、または`*`で終わる付与されたスコープ）：[MCPツールスコープ](../frameworks/MCP-SERVER.md#mcp-tool-scopes)。`src/shared/constants/mcpScopes.ts`にある`MCP_SCOPE_LIST`は、完全なカタログではなく、元の型付きサブセットです。`resolveCallerScopeContext()`がMCP認証情報、リクエストメタデータ、または`OMNIROUTE_MCP_SCOPES`からスコープを解決した後、`open-sse/mcp-server/scopeEnforcement.ts`で強制が実行されます。`OMNIROUTE_MCP_ENFORCE_SCOPES=true`でない限り、これは無効のままです。

### アクセストークンスコープ

`oma_live_…`トークンに対する`read` / `write` / `admin`は、`scopeSatisfies`（`src/lib/accessTokens/scopes.ts`）によってランク付けされます。このランクはアクセストークン資格情報にのみ適用されます。[管理認証](../guides/MANAGEMENT-AUTH.md)を参照してください。

## 認証が必要です切り替え

`src/shared/utils/apiAuth.ts`の`isAuthRequired()`次のことを決定します。**どれでも**リクエストに対して認証が強制されます。

- `settings.requireLogin === false` → auth は、常時保護層 ( [「 Route Guard Tiers 」](../security/ROUTE_GUARD_TIERS.md)を参照) と、それが受け入れる認証情報を渡す呼び出しを除き、グローバルに無効になっています。これらの呼び出しには、ログイン時と同じ認証情報が必要です。同期トークンの発行、任意のスコープでのCLIアクセス トークンの生成、 `manage`/`admin`スコープでのAPIキーの作成、そのスコープをキーに付与するか、そのスコープを再生成または公開する場合と同じです。キー ( `src/lib/api/requireManagementAuth.ts`の`requireCredentialForManagementScopedKey()` )。推論専用キーは開いたままになります。保護された機能フラグ (`REQUIRE_API_KEY`、その他のセキュリティ フラグ、および[機能フラグ](../reference/FEATURE_FLAGS.md#rest-api)にリストされているSSRF / TLS / MCP スコープ / サンドボックス フラグ) の書き込みと、 PIIマスキング設定の保存 (`PUT /api/settings/pii`) にも、引き続き資格情報が必要です。
- パスワードが設定されていません**そして**no `INITIAL_PASSWORD` env var →ブートストラップ モードでは、オンボーディング ウィザードとループバック リクエストが許可されますが、公開されたネットワーク リクエストには依然として認証情報が必要です。例外: 保護された機能フラグの書き込みとPIIマスキング設定 (`PUT /api/settings/pii`) の保存には、ループバックからでも認証情報が必要なので、ループバックだけでは十分ではありません。
- DBエラー→失敗して閉じられます (デフォルトでセキュア)。

クライアントのAPIキーの強制では、 `process.env.REQUIRE_API_KEY`直接読み取りではなく、 `src/shared/utils/featureFlags.ts`内の`isRequireApiKeyEnabled()`が使用されます。これはデプロイされたインスタンスにとって重要です。ダッシュボード→機能フラグで`REQUIRE_API_KEY`切り替えると、 DBオーバーライドが保存され`/v1/*`、 `/v1beta/*`、 `/models`、 `/responses`、 `/chat/completions`、 `/codex/*`、およびこのヘルパーを共有する他のクライアント API 認証チェックに直ちに影響します。機能フラグ ストアを読み取れない場合、クライアントAPI認証は失敗し、キーが必要になります。

## 破壊的変更 — v3.8.0

`/api/v1/agents/tasks/*` および `/api/resilience/model-cooldowns` エンドポイントは、**管理認証が必須**になりました（コミット `588a0333`）。以前のように `manage` スコープを持たない通常の API キーを送信するクライアントには、`403` が返されます。移行方法：API Keys ダッシュボードでキーに `manage` スコープを付与するか、ログイン済みのダッシュボードセッションを使用してください。

## 動作変更 — v3.8.2

`/api/mcp/*`（リモート MCP サーバー）は引き続きデフォルトで LOCAL_ONLY ですが、`Authorization: Bearer <api-key>` ヘッダーに `manage` スコープが含まれている場合、ループバック以外からのリクエストも受け付けるようになりました。この例外は、`src/server/authz/routeGuard.ts` の `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` を介してパスごとに明示的に制御されます。同じく LOCAL_ONLY プレフィックスである `/api/cli-tools/runtime/*` は、任意のサブプロセスを起動できるため、意図的にバイパスできないようになっています。ループバック以外から `/api/mcp/*` に送信された匿名リクエストには、引き続き `403 LOCAL_ONLY` が返されます。新しい LOCAL_ONLY パスのデフォルトは、今後も厳格なループバック限定です。[ルートガードの階層](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)を参照してください。

## テスト

- ユニットテスト：`tests/unit/authz/` — `classify.test.ts`、`pipeline.test.ts`、`client-api-policy.test.ts`、`management-policy.test.ts`、`public-policy.test.ts`。
- パブリック許可リスト：`tests/unit/public-api-routes.test.ts`。
- 対象を絞って実行：`node --import tsx/esm --test tests/unit/authz/classify.test.ts`。

## デバッグ

パイプラインは常に応答に次のスタンプを付けます。

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

認証されたリクエストの場合、上流 (ハンドラー側) リクエスト ヘッダーには次のものも含まれます。

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ハンドラー—内で`assertAuth(req, expectedClass)`使用します。ミドルウェアがバイパスされた場合、コード`AUTHZ_NOT_INITIALIZED`で`AuthzAssertionError`をスローします (テストで構成のリグレッションを検出するのに役立ちます)。

## 関連項目

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — エンドポイントごとの認証マーカー
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 認証イベントの監査ログ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — 3つのスコープ名前空間とMCPツールスコープカタログ
- ソース: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
