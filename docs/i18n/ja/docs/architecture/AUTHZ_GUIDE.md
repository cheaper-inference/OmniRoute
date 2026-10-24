# Authorization Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **信頼できる情報源:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **最終更新日:** 2026-09-22 — スコープの名前空間はMCP-SERVER.mdを参照

OmniRouteには、すべてのAPIリクエストをゲートするルート認識型認可パイプラインがあります。分類は**決定論的**であり、**フェイルクローズ**です。分類できないものはすべて`MANAGEMENT`として扱われ、セッションまたは管理グレードのトークンを要求します。このページでは、ルートを保守するエンジニアや新しいエンドポイントを設計するエンジニア向けにモデルを説明します。

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ソース: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 2 つの認証モード

### 1. API キー (Bearer)

OpenAI/Anthropic/Gemini 互換のクライアント API と、キーが `manage` スコープを持つ場合の一部の管理ルートで使用されます。

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` の `isValidApiKey()` / `extractApiKey()` で検証され、`src/shared/utils/apiAuth.ts` 経由で再エクスポートされます。バリデーターは、`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境変数も永続的なパススルーキーとして受け付けます (issue #1350)。

### 2. ダッシュボードセッション (auth_token Cookie)

ダッシュボードのページと管理操作で使用されます。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie がセッションとして扱われるのは、JWT の検証が成功し、かつ `authenticated: true` を持つ場合に限られます (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)。Cookie を使用するすべてのコンシューマー（ダッシュボードのルートガード (`isDashboardSessionAuthenticated()`)、authz パイプラインの更新、WebSocket ハンドシェイク、ライブサーバー、`/api/settings/require-login`、`/api/auth/status`）は、このヘルパーを経由します。`JWT_SECRET` で署名された他の JWT も存在します。Cursor CLI のパススルーは、キーの保持者向けに `iss "omniroute" / aud "cursor-cli"` のトークンを発行しますが、それらがセッションとして扱われることはありません (#13298)。

`src/shared/utils/apiAuth.ts` の `isDashboardSessionAuthenticated()` で検証されます。パイプラインは、30 日間の有効期間の残りが 7 日未満になると JWT を自動更新します。

セッションは 30 日経過する前に終了する場合もあります。すべての発行は `mintDashboardSessionToken`（発行時刻 `iat` と ID `jti` を含む）を経由し、検証では 2 つの設定を確認します。`sessionsValidAfter` はパスワード変更時に設定され、それ以前に発行されたすべてのセッションは検証されなくなります（パスワードを変更したブラウザには新しい Cookie が発行されます）。`revokedDashboardSessions` には、`POST /api/auth/logout` がサインアウトしたセッションの `jti` が追加されます。古いリリースで発行されたセッションにはこれらのクレームがないため、最初のパスワード変更まで有効のままです。設定を読み取れない場合、そのセッションは信頼されません。

一部の管理ルートは、**いずれか**のモードを受け付けます。Cookie、または API キーが `manage`（または `admin`）スコープを持つ場合の `Bearer <key>` です。これにより、v3.8 で追加された「API 経由で設定」ワークフローが可能になります。

#### オプションの OIDC ログインゲート (#6973)

ダッシュボードの管理者ログインは、デフォルトのパスワードログインに加えて、オプトインの OIDC (OpenID Connect) フローもサポートします。パスワードログインが削除されることはなく、補完されるだけです：

- `settings.oidcEnabled === true` **かつ** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` がすべて設定されている場合にのみ有効になります（設定 → Auth）。それ以外の場合、`GET /api/auth/oidc/login` は `400` を返します。
- `GET /api/auth/oidc/login` は、発行者の `/.well-known/openid-configuration` から `authorization_endpoint` を検出し（見つからない場合は `<issuer>/authorize` にフォールバック）、受信リクエストからリダイレクト URI を構築（`x-forwarded-proto` を考慮）し、ランダムな `state` を `httpOnly` の `oidc_state` Cookie に保存したうえで IdP にリダイレクトします。
- `GET /api/auth/oidc/callback` は `state` を検証し、認可コードを交換し、ID トークンの署名を発行者の JWKS で検証します（`jose` の `createRemoteJWKSet`、JWKS URI ごとにキャッシュ）。`issuer`/`audience` の確認も行います。`oidcAllowedSubjects` の許可リストは必須です。トークンの `sub` クレーム、または `email` クレームと照合されます。`email` クレームは `email_verified === true` の場合にのみ考慮されるため、IdP で未検証のメールアドレスがゲートを通過することはありません。エントリがない場合、コールバックはすべてのログインを拒否します (`not_configured`)。
- 成功すると、パスワードログインが発行するものと **まったく同じ** 30 日有効の `auth_token` JWT を発行します（`src/app/api/auth/login/route.ts`）。そのため、ダッシュボードのセッションパイプライン（自動更新、Cookie フラグ）は変更されません。OIDC が変えるのは Cookie の発行方法だけで、付与される権限は変わりません。
- すべての `oidc*` 設定（`oidcEnabled`、`oidcDisablePasswordLogin`、`oidcIssuer`、`oidcClientId`、`oidcClientSecret`、`oidcAllowedSubjects`、`oidcRedirectPath`、`oidcScopes`）は `SECURITY_IMPACTING_SETTINGS_KEYS`（`src/shared/constants/securityImpactingSettings.ts`）に含まれます。`PATCH /api/settings` は、ボディに管理パスワードが `currentPassword` として含まれていない限り `400 PASSWORD_REQUIRED` を返します（パスワードが誤っている場合は `401 PASSWORD_MISMATCH`）。`oidcDisablePasswordLogin` はパスワード _ログイン_ (`POST /api/auth/login`) を拒否しますが、保存済みのパスワードハッシュは保持され、再認証では引き続き `currentPassword` がそのハッシュと照合されます。
- `corsOrigins` と `bruteForceProtection` も `SECURITY_IMPACTING_SETTINGS_KEYS` に含まれます。どちらを緩めてもログインの防御が弱まるため、同じ `currentPassword` による再認証が必要です（セキュリティタブでこの入力が求められます）。また、JSON インポート時にはこれらが破棄されます。
- すべてのセキュリティポリシーのキー（`SECURITY_IMPACTING_SETTINGS_KEYS` のエントリ、すべての `oidc*` キー、ダッシュボードセッションの状態）は、`PATCH /api/settings` で **オペレーター専用** です。`manage` スコープの API キーや `oma_` アクセストークンは、正しい `currentPassword` を送信しても `403` で拒否されます。この拒否は `reason: OPERATOR_REQUIRED` 付きで `settings.update_failed` として監査ログに記録されます（`src/lib/api/operatorCredential.ts` の `requireOperatorCredential()`）。通常の設定（テーマや表示設定）は、`manage` キーや `admin` アクセストークンで引き続き書き込み可能です。`/api/settings`（および `/api/settings/require-login`）へのすべての変更にも `admin` アクセストークンスコープが必要です（`src/server/authz/accessScopes.ts` の `ADMIN_MUTATION_EXACT_PATHS`、完全一致）。`GET` は `read` のままで、その他の `/api/settings/*` サブルート（プロキシ、コンボのデフォルト、モデルエイリアス、圧縮、パージなど）は、メソッドから推定される `write` スコープを維持します。
- `POST /api/settings/import-json` はその再認証を省略するため、書き込み前に同じファイル内の `IMPORT_STRIPPED_SETTINGS_KEYS` に含まれるキーをすべて削除します。対象は、パスワードと `currentPassword`、すべての `SECURITY_IMPACTING_SETTINGS_KEYS` のエントリ、そしてダッシュボードのセッション状態（`sessionsValidAfter`、`revokedDashboardSessions`）です。そのため、古いバックアップをインポートしても、パスワード変更やサインアウトで終了済みのセッションが復活することはありません。

## ルートのクラス

`src/server/authz/types.ts` は 3 つのクラスを定義します。決定的に分類できないルートはすべて `MANAGEMENT` にフォールバックします。

| Class        | Description                                                                                                                                                  | Auth required                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `PUBLIC`     | 明示的に安全なルート — ログイン、ログアウト、ステータス、初期化、ヘルスチェック、オンボーディングのブートストラップ。                                        | なし                                                                  |
| `CLIENT_API` | モデル提供エンドポイント — `/api/v1/*`、`/api/v1beta/*`、およびエイリアスの `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 有効な `REQUIRE_API_KEY` フィーチャーフラグが有効な場合は Bearer キー |
| `MANAGEMENT` | ダッシュボードのページ、設定、プロバイダー、キー、管理者および診断エンドポイント。                                                                           | ダッシュボードセッション、または `manage` スコープの Bearer           |

一部の `MANAGEMENT` 操作は **オペレーター専用** です。`manage` キーだけでは不十分です。保存済みの認証情報のエクスポート（`GET /api/settings/export-json`、`GET /api/db-backups/export`、`GET /api/db-backups/exportAll`）、ライブデータへのバックアップの復元（`dryRun=true` を含む `POST /api/db-backups/import`、ID による `POST /api/db-backups` の復元、`POST /api/settings/import-json`）、復元ポイントの破棄（`DELETE /api/db-backups` のクリーンアップ、および `PATCH /api/db-backups`。このエンドポイントで永続化される保持期間設定は、バックアップのたびに実行される自動削除を制御するためです）には、ダッシュボードセッション、ローカル CLI のサブジェクト、またはログインが無効であることが必要です。同期トークンの発行（`POST /api/sync/tokens`）と `admin` の CLI アクセストークンの発行（`POST /api/cli/tokens`）には、すべてのログインモードでダッシュボードセッションまたはローカル CLI のサブジェクトが必要です。どのスコープの API キーも、`oma_` アクセストークンも、オペレーターの認証情報ではありません。これらが必要とされる場合は、常に `403` が返されます。このチェックは `src/lib/api/operatorCredential.ts`（`resolveOperatorCredential()` / `requireOperatorCredential()`）にあります。ログイン設定の変更もオペレーター専用です。`POST /api/settings/require-login`（管理パスワードの設定、`requireLogin` の切り替え）は、パスワードが存在すると、これらの認証情報のみを受け付けます。最初の実行時のブートストラップ期間（パスワードがまだない状態）は変更されません。ダッシュボードセッションでパスワードを置き換えるには `currentPassword` の送信が必要です（欠落または誤りの場合は `403` で、`settings.update_failed` として監査ログに記録されます）。ローカル CLI とログインが無効なインスタンスは復旧パスを維持し、このパラメーターなしでパスワードを設定できます。どちらもデータディレクトリを所有するホストに紐づけられているためです。

## パイプライン

```
受信リクエスト → src/proxy.ts
  → src/server/authz/pipeline.ts の runAuthzPipeline()
    1. 信頼済み内部ヘッダーを除去（x-omniroute-auth-*、x-omniroute-route-class）
    2. リクエストIDを生成し、classifyRoute() でルートを分類
    3. pathname == "/" の場合 → /dashboard にリダイレクト
    4. ドレイン中（グレースフルシャットダウン）かつ /api/* の場合 → 503
    5. GET以外の /api/* の場合 → checkBodySize() ガード
    6. OPTIONS の場合 → CORSプリフライト 204
    7. options.enforce == false の場合 → ルートクラスヘッダーを付けてそのまま通過
    8. それ以外の場合: POLICIES[routeClass].evaluate(ctx)
       - 許可  → x-omniroute-auth-{kind,id,label,scopes} を付与 → NextResponse.next()
       - 拒否 → correlation_id 付きのJSONエラー（ダッシュボードページの場合 → 302 /login）
```

信頼済み内部ヘッダー（`src/server/authz/headers.ts` で定義）は、分類前に**受信リクエストから除去されます**。クライアントが `x-omniroute-auth-*` を事前に設定して主体になりすますことはできません。

### ポリシーの契約

各ルートクラスには、`src/server/authz/policies/` 内にポリシーがあります。

- **`publicPolicy`**（`policies/public.ts`）— 常に `allow({ kind: "anonymous", id: "anonymous" })` を返します。
- **`clientApiPolicy`**（`policies/clientApi.ts`）— Bearerを抽出し、`validateApiKey()` で検証します。有効な `REQUIRE_API_KEY` 機能フラグが無効な場合に限り、匿名アクセスへフォールスルーします。有効なフラグは `isRequireApiKeyEnabled()`（`DB feature flag override > process.env.REQUIRE_API_KEY > default`）によって解決されるため、ダッシュボードの機能フラグと環境変数が `/api/v1/*`、`/api/v1beta/*`、およびエイリアスを一貫して制御します。リゾルバーで障害が発生した場合は、フェイルクローズします。クライアントAPIルートでのダッシュボードセッションリクエストを許可します（ダッシュボードのモデルカタログで使用される `/api/v1/models` を含む）。
- **`managementPolicy`**（`policies/management.ts`）— ダッシュボードセッション、内部モデル同期リクエスト（`/api/providers/[name]/(sync-models|models)` に対して照合）、または `isAuthRequired()` がfalseを返した場合は認証を完全にスキップします。Bearerトークンが存在するものの無効な場合は403（`AUTH_001`）を返し、それ以外の場合は401を返します。また、すべての認証分岐の前にルートガード階層（LOCAL_ONLY / ALWAYS_PROTECTED）も適用します。[ルートガード階層](../security/ROUTE_GUARD_TIERS.md)を参照してください。`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` 内のLOCAL_ONLYパス（現時点では `/api/mcp/`）は、Bearerキーが `manage` スコープを持つ場合、非ループバックからアクセスできます。それ以外のすべてのLOCAL_ONLYパスは、スコープに関係なく厳密にループバック限定のままです。

ポリシーが成功すると、`kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` を持つ `AuthSubject` が返されます。後続のハンドラーは認証ロジックを再実行する代わりに、`src/server/authz/assertAuth.ts` の `assertAuth(request, "CLIENT_API")` を介してこれを読み取れます。

## 公開ルート一覧

`src/shared/constants/publicApiRoutes.ts` は明示的な許可リストです。

リストは**形状**ごとに分割されており、この分割はセキュリティ上不可欠です（GHSA-74g9-q8f6-793h）。プレフィックスは
`startsWith()` で照合されるため、先頭文字列が共通する隣接パスもすべて一致します。
`/api/usage/om-usage` をプレフィックスとして指定すると、`/api/usage/om-usage<anything>` がすべて公開され、
Next はこれを `/api/usage/[connectionId]`、つまり独自の認証を持たないハンドラーとして解決します。

```ts
// 真のサブツリー。各エントリは必ず "/" で終わる必要があります（単体テストで検証されます）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify では CLIENT_API として扱われ、「認証不要の公開」にはなりません
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 単一ルート。完全一致で照合されます（末尾のスラッシュの有無は問いません）。
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS オリジン制限の緩和も適用される、読み取り専用の単一ルート。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS 制限の緩和が適用されない、読み取り専用の単一ルート。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

読み取り専用ルートが公開されるのは、**安全なメソッドの場合のみ**です。注意：`classifyRoute()` は `/api/v1/*` と `/api/v1beta/*` を PUBLIC へのフォールスルーから除外します。これらは常に `CLIENT_API` となるため、Bearer キーのポリシーが引き続き適用されます。

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

## 認証必須トグル

`src/shared/utils/apiAuth.ts` の `isAuthRequired()` は、リクエストに対して **いかなる** 認証を適用するかを決定します：

- `settings.requireLogin === false` → 認証はグローバルに無効になります。ただし、常に保護される階層（[Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) を参照）と、認証情報を発行する操作は例外です。これらの操作では、ログインが有効な場合と同じ認証情報が必要です。具体的には、同期トークンの発行、任意のスコープでの CLI アクセストークンの発行、`manage`/`admin` スコープを持つ API キーの作成、そのスコープのキーへの付与、そのようなキーの再生成または表示（`src/lib/api/requireManagementAuth.ts` の `requireCredentialForManagementScopedKey()`）です。推論専用のキーは引き続きオープンです。
- パスワードが設定されておらず **かつ** `INITIAL_PASSWORD` 環境変数もない → ブートストラップモードでは、オンボーディングウィザードとループバックからのリクエストを許可しますが、外部ネットワークからのリクエストには引き続き認証情報が必要です。
- DB エラーが発生した場合 → フェイルクローズ（セキュアバイデフォルト）。

クライアント API キーの強制には、`process.env.REQUIRE_API_KEY` を直接読み取るのではなく、`src/shared/utils/featureFlags.ts` の `isRequireApiKeyEnabled()` を使用します。これは本番環境のインスタンスで重要です。ダッシュボード → Feature Flags で `REQUIRE_API_KEY` を切り替えると DB オーバーライドが保存され、即座に `/v1/*`、`/v1beta/*`、`/models`、`/responses`、`/chat/completions`、`/codex/*` および、このヘルパーを共有する他のクライアント API 認証チェックに影響します。フィーチャーフラグストアを読み取れない場合、クライアント API 認証はフェイルクローズし、キーを要求します。

## 破壊的変更 — v3.8.0

`/api/v1/agents/tasks/*` および `/api/resilience/model-cooldowns` エンドポイントは、**管理認証が必須**になりました（コミット `588a0333`）。以前のように `manage` スコープを持たない通常の API キーを送信するクライアントには、`403` が返されます。移行方法：API Keys ダッシュボードでキーに `manage` スコープを付与するか、ログイン済みのダッシュボードセッションを使用してください。

## 動作変更 — v3.8.2

`/api/mcp/*`（リモート MCP サーバー）は引き続きデフォルトで LOCAL_ONLY ですが、`Authorization: Bearer <api-key>` ヘッダーに `manage` スコープが含まれている場合、ループバック以外からのリクエストも受け付けるようになりました。この例外は、`src/server/authz/routeGuard.ts` の `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` を介してパスごとに明示的に制御されます。同じく LOCAL_ONLY プレフィックスである `/api/cli-tools/runtime/*` は、任意のサブプロセスを起動できるため、意図的にバイパスできないようになっています。ループバック以外から `/api/mcp/*` に送信された匿名リクエストには、引き続き `403 LOCAL_ONLY` が返されます。新しい LOCAL_ONLY パスのデフォルトは、今後も厳格なループバック限定です。[ルートガードの階層](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)を参照してください。

## テスト

- ユニットテスト：`tests/unit/authz/` — `classify.test.ts`、`pipeline.test.ts`、`client-api-policy.test.ts`、`management-policy.test.ts`、`public-policy.test.ts`。
- パブリック許可リスト：`tests/unit/public-api-routes.test.ts`。
- 対象を絞って実行：`node --import tsx/esm --test tests/unit/authz/classify.test.ts`。

## デバッグ

パイプラインは、レスポンスに常に以下のヘッダーを付与します。

```
x-request-id:               <相関 ID。エラーボディにも同じ値が含まれる>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

認証済みリクエストの場合、アップストリーム（ハンドラー側）のリクエストヘッダーには以下も含まれます。

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<末尾 4 文字> | "dashboard" | "anonymous"
x-omniroute-auth-label:     （任意）
x-omniroute-auth-scopes:    カンマ区切りのリスト
```

ハンドラー内では `assertAuth(req, expectedClass)` を使用してください。ミドルウェアが迂回された場合、コード `AUTHZ_NOT_INITIALIZED` の `AuthzAssertionError` がスローされます（テストで設定のリグレッションを検出する際に役立ちます）。

## 関連項目

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — エンドポイントごとの認証マーカー
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 認証イベントの監査ログ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — 3つのスコープ名前空間とMCPツールスコープカタログ
- ソース: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
