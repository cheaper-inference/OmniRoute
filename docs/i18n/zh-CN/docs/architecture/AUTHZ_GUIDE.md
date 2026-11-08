# Authorization Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **事实来源：** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **最后更新：** 2026-09-22 — 范围命名空间指向 MCP-SERVER.md

OmniRoute 拥有一个路由感知的授权管道，用于守卫每个 API 请求。分类是**确定性**的且**故障关闭**的——任何无法分类的内容最终都会被归类为 `MANAGEMENT`，并要求会话或管理级别的令牌。本页面为维护路由或设计新端点的工程师解释了该模型。

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> 来源：[diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 两种身份验证模式

### 1. API 密钥（Bearer）

用于 OpenAI/Anthropic/Gemini 兼容的客户端 API，以及密钥具有 `manage` 作用域时的部分管理路由。

```
Authorization: Bearer <api-key>
```

由 `src/sse/services/auth.ts` 中的 `isValidApiKey()` / `extractApiKey()` 验证，并通过 `src/shared/utils/apiAuth.ts` 重新导出。验证器还接受 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 环境变量作为持久透传密钥（issue #1350）。

### 2. Dashboard 会话（auth_token cookie）

用于 Dashboard 页面和管理操作。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

只有在 JWT 验证通过**并且**携带 `authenticated: true` 时，Cookie 才是会话
（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。Cookie 的每个使用者（Dashboard 路由守卫（`isDashboardSessionAuthenticated()`）、授权管道刷新、WebSocket 握手、实时
服务器、`/api/settings/require-login`、`/api/auth/status`）都会通过该辅助函数。
使用 `JWT_SECRET` 签名的其他 JWT 也存在——Cursor CLI 透传功能会为密钥持有者生成
`iss "omniroute" / aud "cursor-cli"` 令牌——但它们绝不是会话
（#13298）。

由 `src/shared/utils/apiAuth.ts` 中的 `isDashboardSessionAuthenticated()` 验证。当 JWT 的 30 天有效期剩余时间少于 7 天时，管道会自动刷新该 JWT。

会话也可能在 30 天到期前结束，因为每个生成器都会经过 `mintDashboardSessionToken`（包含签发时间 `iat` 和 ID `jti`），验证器会检查两个设置：密码更改时设置的 `sessionsValidAfter`，使得在该时间之前签发的所有会话都无法继续验证（更改密码的浏览器会获得新的 Cookie）；以及 `revokedDashboardSessions`，`POST /api/auth/logout` 会将已登出会话的 `jti` 添加到其中。较旧版本生成的会话不包含这两个声明，并会一直有效，直到首次更改密码。如果无法读取这些设置，则不会信任该会话。

某些管理路由接受**任一**模式：Cookie，或具有 `manage`（或 `admin`）作用域的 `Bearer <key>`。这正是 v3.8 中新增的“可通过 API 调用配置”工作流所依赖的机制。

#### 可选的 OIDC 登录门控（#6973）

Dashboard 管理员登录还支持在默认密码登录之外选择性启用 OIDC（OpenID Connect）流程
——密码登录不会被移除，只会得到补充：

- 仅当 `settings.oidcEnabled === true` **且** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` 均已配置时启用（Settings → Auth）。
  否则，`GET /api/auth/oidc/login` 返回 `400`。
- `GET /api/auth/oidc/login` 从
  issuer 的 `/.well-known/openid-configuration` 发现
  `authorization_endpoint`（回退到 `<issuer>/authorize`），根据传入请求构建重定向 URI（支持
  `x-forwarded-proto`），并使用存储在 `httpOnly` 的 `oidc_state` Cookie
  中的随机 `state` 将请求重定向到 IdP。
- `GET /api/auth/oidc/callback` 验证 `state`，交换授权码，并通过 issuer 的 JWKS
  使用 `jose` 的 `createRemoteJWKSet` 验证 ID token 的签名（按 JWKS URI
  缓存），同时检查 `issuer`/`audience`。进入控制台要求配置非空的
  `oidcAllowedSubjects` 列表、`oidcAdmissionClaim` 策略，或同时配置二者。主题列表仅在
  `email_verified === true` 时匹配 `sub` 或 `email`。可选的声明策略接受以点分隔的 ID-token
  声明路径（例如 `realm_access.roles`）以及一个已接受值数组；解析出的声明必须是字符串数组，
  且至少包含一个已接受的值。如果两种策略都已配置，则两者都必须通过。缺失或格式错误的声明
  将默认拒绝；如果两种策略都未配置，回调将拒绝登录（`not_configured`）。现有的仅主题配置
  将保持不变。
- Keycloak 通常会将 realm 角色映射到访问令牌中，而不一定映射到 ID 令牌中。若要要求 realm
  角色 `admin`，请为此客户端配置一个协议映射器，将 `realm_access.roles` 包含到其 **ID
  token** 中，然后将 `oidcAdmissionClaim` 设置为 `{ "path": "realm_access.roles", "values": ["admin"] }`。
  启用仅基于角色的准入前，请检查此客户端实际的 ID-token 声明；应用不会读取访问令牌中的角色。
  IdP 端拒绝令牌可以作为补充，但不能替代应用端的这一检查。
- 成功后，它会签发与密码登录完全相同的 30 天 `auth_token` JWT（`src/app/api/auth/login/route.ts`），
  因此其余的控制台会话流程（自动刷新、Cookie 标志）保持不变——OIDC 只替代 Cookie 的签发方式，
  不会改变其授予的权限。IdP 角色/组的变更不会使现有 OmniRoute 会话失效；注销、密码轮换或会话
  过期仍决定其生命周期。
- 每个 `oidc*` 设置（`oidcEnabled`、`oidcDisablePasswordLogin`、
  `oidcIssuer`、`oidcClientId`、`oidcClientSecret`、`oidcAllowedSubjects`、
  `oidcAdmissionClaim`、`oidcRedirectPath`、`oidcScopes`）都位于
  `SECURITY_IMPACTING_SETTINGS_KEYS`（`src/shared/constants/securityImpactingSettings.ts`）中：
  `PATCH /api/settings` 要求请求体携带管理密码作为 `currentPassword`，否则返回
  `400 PASSWORD_REQUIRED`（密码错误时返回 `401 PASSWORD_MISMATCH`）。
  `oidcDisablePasswordLogin` 会拒绝密码_登录_（`POST /api/auth/login`），但会保留已存储的密码哈希，
  且重新认证仍会根据该哈希检查 `currentPassword`。
- `corsOrigins` 和 `bruteForceProtection` 也位于 `SECURITY_IMPACTING_SETTINGS_KEYS`
  中：放宽任一设置都会削弱登录防护，因此它们同样需要使用 `currentPassword` 重新认证
  （Security 标签页会要求输入该密码），并且 JSON 导入会丢弃它们。
- 每个安全策略键——`SECURITY_IMPACTING_SETTINGS_KEYS` 中的条目、每个 `oidc*` 键以及控制台会话状态——
  在 `PATCH /api/settings` 上都**仅限操作员**：具有 manage 权限范围的 API 密钥或 `oma_` 访问令牌
  即使携带正确的 `currentPassword` 也会被拒绝并返回 `403`，且该拒绝会以
  `settings.update_failed` 及 `reason: OPERATOR_REQUIRED` 记录审计日志
  （`src/lib/api/operatorCredential.ts` 中的 `requireOperatorCredential()`）。
  普通设置（主题、显示偏好）仍可由 `manage` 密钥或 `admin` 访问令牌写入。
  `/api/settings` 本身的每次变更（以及 `/api/settings/require-login` 的变更）还需要
  `admin` 访问令牌范围（`src/server/authz/accessScopes.ts` 中的 `ADMIN_MUTATION_EXACT_PATHS`，
  采用精确路径匹配）；`GET` 仍保持 `read`，而其他 `/api/settings/*` 子路由（代理、组合默认值、
  模型别名、压缩、清理等）继续使用根据方法推断的 `write` 范围。
- `POST /api/settings/import-json` 会跳过该重新认证，因此写入前会丢弃
  `IMPORT_STRIPPED_SETTINGS_KEYS` 中的每个键（同一文件）：密码和
  `currentPassword`、`SECURITY_IMPACTING_SETTINGS_KEYS` 中的每个条目，以及控制台会话状态
  （`sessionsValidAfter`、`revokedDashboardSessions`）。
  因此，导入较旧的备份不会重新恢复已因密码变更或注销而结束的会话。

#### 可选的 TOTP 双因素登录 (#16619)

从 Settings → Security 中注册；在操作员启用前处于关闭状态
（`src/server/auth/dashboardMfa.ts`）。

- **涵盖内容：**密码登录（`POST /api/auth/login`，随后需要
  `POST /api/auth/mfa/verify`）以及 `omniroute connect`（`POST /api/cli/connect`，
  该接口拒绝仅使用密码的交换，并将验证码作为 `totp` 传入）。
- **不涵盖内容：**OIDC / SSO 登录（`/api/auth/oidc/callback`）不会要求 OmniRoute TOTP。
  它依赖身份提供者自身的第二重身份验证，因此如果启用了 OIDC，请在 IdP 中强制启用 MFA。
- **恢复**（设备丢失、没有剩余恢复码，或某个因素已无法验证，例如
  `STORAGE_ENCRYPTION_KEY` 发生更改）：
  1. 使用 `OMNIROUTE_DISABLE_MFA=true` 重启服务器。
  2. 在主机本身上（环回对端和环回 `Host`，例如
     `http://localhost:20128`）使用密码登录。仅对此来源跳过第二重身份验证；其他所有来源仍需要验证码。
  3. 在设置 → 安全 → 禁用中，输入密码并将验证码留空。只有在该变量已设置且请求来自主机时，`POST /api/auth/mfa/disable` 才接受不包含 `code` 的请求体；它仍然要求控制面板会话和当前密码，并会以
     `auth.mfa.disabled` 以及 `secondFactor: "recovery_switch"` 记录审计日志。
  4. 取消设置 `OMNIROUTE_DISABLE_MFA`，重启，并在需要时重新注册。

## 路由类别

`src/server/authz/types.ts` 定义了三种类别；任何无法被确定性分类的路由都会回退为 `MANAGEMENT`。

| 类别         | 说明                                                                                                                                  | 所需认证                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `PUBLIC`     | 明确安全的路由：登录、登出、状态、初始化、健康检查、新手引导启动。                                                                    | 无                                                        |
| `CLIENT_API` | 模型服务端点：`/api/v1/*`、`/api/v1beta/*`，以及别名 `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 当有效的 `REQUIRE_API_KEY` 功能开关启用时需要 Bearer 密钥 |
| `MANAGEMENT` | 仪表板页面、设置、提供者、密钥、管理和诊断端点。                                                                                      | 仪表板会话，或具有 `manage` 范围的 Bearer                 |

部分 `MANAGEMENT` 操作是**仅限操作员**的：只有 `manage` 密钥是不够的。导出已存储的凭证（`GET /api/settings/export-json`、`GET /api/db-backups/export`、`GET /api/db-backups/exportAll`）、将备份还原到现有数据之上（`POST /api/db-backups/import`，包括 `dryRun=true`；按 id 进行的 `POST /api/db-backups` 还原；`POST /api/settings/import-json`）、销毁还原点（`DELETE /api/db-backups` 的清理，以及 `PATCH /api/db-backups`，因为它持久化的保留策略会驱动每次备份后的自动修剪）时，需要仪表板会话、本地 CLI 主体，或已禁用登录。签发同步令牌（`POST /api/sync/tokens`）以及签发 `admin` CLI 访问令牌（`POST /api/cli/tokens`）在所有登录模式下都需要仪表板会话或本地 CLI 主体。任何范围的 API 密钥和 `oma_` 访问令牌都不是操作员凭证：在需要操作员凭证的地方，它们会收到 `403`。检查逻辑位于 `src/lib/api/operatorCredential.ts`（`resolveOperatorCredential()` / `requireOperatorCredential()`）。更改登录设置同样仅限操作员：一旦存在密码，`POST /api/settings/require-login`（设置管理密码 / 切换 `requireLogin`）只接受这些凭证。首次运行的引导窗口（尚无密码）保持不变；仪表板会话必须发送 `currentPassword` 才能替换密码（缺失或错误时返回 `403`，并记录为 `settings.update_failed`）。本地 CLI 以及已禁用登录的实例保留恢复路径，可以在不提供密码的情况下设置密码，因为二者都绑定到拥有数据目录的主机。

## 管道

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

可信内部标头（在`src/server/authz/headers.ts`中定义）是**从传入请求中剥离**分类之前—客户端无法预先填充`x-omniroute-auth-*`来模拟主题。

### 保单合同

每个路由类在`src/server/authz/policies/`中都有一个策略：

- **`publicPolicy`** (`policies/public.ts`) —始终返回`allow({ kind: "anonymous", id: "anonymous" })`。
- **`clientApiPolicy`** (`policies/clientApi.ts`) —提取 Bearer，通过`validateApiKey()`进行验证。仅当有效`REQUIRE_API_KEY`功能标志被禁用时才会转为匿名。有效标志通过`isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) 解析，因此仪表板功能标志和环境变量一致地管理`/api/v1/*`、 `/api/v1beta/*`和别名；解析器故障无法关闭。允许客户端API路由（包括仪表板模型目录使用的`/api/v1/models`）上的仪表板会话请求。当启用 Entra ID SSO时，结构上是 Entra 令牌的 Bearer（三个 base64url 段、 `RS*` alg、 `kid`）由SSO分支处理**前**`validateApiKey()`及其判决是最终的—它永远不会落入 API 密钥路径或降级为匿名分支，因此身份提供者中断不能成为开放访问。静态API密钥不受影响。参见[Entra ID SSO](../security/ENTRA_SSO.md) 。
- **`managementPolicy`** (`policies/management.ts`) —接受仪表板会话、内部模型同步请求（与`/api/providers/[name]/(sync-models|models)`匹配），或者如果`isAuthRequired()`返回 false，则完全跳过。当不记名令牌存在但无效时返回 403 (`AUTH_001`)，否则返回 401。还在任何 auth 分支—查看[Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)之前强制执行路由保护层 (LOCAL_ONLY / ALWAYS_PROTECTED)。当 Bearer key 携带`manage`范围时，可以从非环回访问`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`中的LOCAL_ONLY路径（今天： `/api/mcp/`）；无论范围如何，所有其他LOCAL_ONLY路径都保持严格环回。

成功的策略会返回`AuthSubject`和`kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`。下游处理程序可以通过`src/server/authz/assertAuth.ts`中的`assertAuth(request, "CLIENT_API")`读取它，而不是重新运行身份验证逻辑。

## 公共路由列表

`src/shared/constants/publicApiRoutes.ts` 是明确的允许列表：

该列表按**形状**拆分，拆分方式会影响安全性（GHSA-74g9-q8f6-793h）：前缀使用
`startsWith()` 进行匹配，因此也会匹配所有共享其开头字符的相邻路径。
`/api/usage/om-usage` 作为前缀会将 `/api/usage/om-usage<anything>` 标记为 PUBLIC，而 Next 会将其解析为
`/api/usage/[connectionId]` — 一个自身没有身份验证的处理程序。

```ts
// 真正的子树。每个条目都必须以 "/" 结尾（由单元测试断言）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // 在 classify 中视为 CLIENT_API，而不是“无身份验证的公共路由”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 单一路由，进行精确匹配（带或不带尾部斜杠均可）。
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // 对选择启用 TOTP 的登录流程第 2 步；需要 MFA-pending cookie
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// 只读单一路由，也采用 CORS origin 放宽策略。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// 不采用 CORS 放宽策略的只读单一路由。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

只读路由仅对安全方法公开。注意：`classifyRoute()` 会将 `/api/v1/*` 和 `/api/v1beta/*` 排除在 PUBLIC 回退逻辑之外——它们始终是 `CLIENT_API`，因此仍会应用 Bearer-key 策略。

## 添加新路由

### 模式 1——公共客户端 API 端点（Bearer 身份验证）

`/api/v1/` 和 `/api/v1beta/` 下的路由会自动归类为 `CLIENT_API`。中间件会强制执行 Bearer 检查；路由处理程序不需要重复执行，但可以在有用时读取主体信息。

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... 处理程序逻辑
}
```

### 模式 2——管理端点（会话或 Bearer + manage）

使用 `src/lib/api/requireManagementAuth.ts` 中的 `requireManagementAuth()`：

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... 处理程序逻辑
}
```

`requireManagementAuth()` 成功时返回 `null`，失败时返回 JSON 错误 `Response`：

- 401 `AUTH_001` "需要身份验证"——完全没有凭据
- 403——Bearer 无效，**或者**存在 Bearer 但密钥缺少 `manage` / `admin` 作用域

对于 `"manage"` 或 `"admin"`，`hasManageScope(scopes)` 返回 true。

### 模式 3——添加到公共允许列表

应根据形态而非便利性选择集合。单一路由应放入 `PUBLIC_API_ROUTES_EXACT`（如果仅限 GET，则放入 `PUBLIC_READONLY_CORS_API_ROUTES`）；只有真正的子树才应放入 `PUBLIC_API_ROUTE_PREFIXES`，并且它**必须以 `/` 结尾**。将单一路由放入前缀列表，还会公开所有与其具有相同起始字符的相邻路径——包括以后添加的动态段同级路由（GHSA-74g9-q8f6-793h）。更新 `tests/unit/public-api-routes.test.ts`、`tests/unit/authz/public-route-exact-match.test.ts` 和 `tests/unit/authz/classify.test.ts` 中的单元测试。

## 作用域

三个命名空间。每个检查器只读取自己的字符串。关于 `manage` 为何在 `read:compression` 上 `scopeMatches` 失败，以及 `read` 访问令牌为何不能 `PATCH /api/keys/{id}` 的并排解释，请参阅[三个作用域命名空间](../frameworks/MCP-SERVER.md#three-scope-namespaces)。

API 密钥带有一个 `scopes` 数组（以 JSON 格式存储在 `api_keys.scopes` 中，请参阅 `src/lib/db/apiKeys.ts`）。

### 管理作用域

- `manage` / `admin` — `hasManageScope`。对管理 API 路由的持有者访问权限。
- `mcp:connect`、`self:usage`、`self:account-quota` 和 `policy:bypass-provider-quota` 是附加的精确匹配作用域。它们位于 `MANAGEMENT_API_KEY_SCOPES` 之外。`mcp:connect` 仅开放 `/api/mcp/` 非回环的特殊区域。

### MCP 工具作用域

目录和匹配规则（相同字符串，或以 `*` 结尾的已授予作用域）：[MCP 工具作用域](../frameworks/MCP-SERVER.md#mcp-tool-scopes)。`src/shared/constants/mcpScopes.ts` 中的 `MCP_SCOPE_LIST` 是原始的类型化子集，而非完整的目录。在 `resolveCallerScopeContext()` 从 MCP 认证信息、请求元数据或 `OMNIROUTE_MCP_SCOPES` 解析作用域后，强制执行在 `open-sse/mcp-server/scopeEnforcement.ts` 中运行。除非 `OMNIROUTE_MCP_ENFORCE_SCOPES=true`，否则它保持关闭。

### 访问令牌作用域

在 `oma_live_…` 令牌上的 `read` / `write` / `admin`，按 `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) 排名。此排名仅适用于访问令牌凭据。请参阅[管理认证](../guides/MANAGEMENT-AUTH.md)。

## 认证要求开关

`src/shared/utils/apiAuth.ts` 中的 `isAuthRequired()` 决定某个请求是否需要**任何**认证：

- `settings.requireLogin === false` → 全局禁用认证，但以下情况除外：始终受保护的层级（参见 [路由守卫层级](../security/ROUTE_GUARD_TIERS.md)），以及发放其所接受凭证的调用。这些调用需要与开启登录时相同的凭证：签发同步令牌、以任意范围签发 CLI 访问令牌、创建具有 `manage`/`admin` 范围的 API 密钥、把该范围授予某个密钥，或重新生成、显示此类密钥（`src/lib/api/requireManagementAuth.ts` 中的 `requireCredentialForManagementScopedKey()`）。仅用于推理的密钥仍保持开放。
- 未配置密码**并且**未设置 `INITIAL_PASSWORD` 环境变量 → 引导模式允许使用新手引导向导和回环请求，但暴露在网络上的请求仍需要凭证。
- 任何数据库错误 → 失败时默认拒绝（fail closed，即默认安全）。

客户端 API 密钥的强制执行使用 `src/shared/utils/featureFlags.ts` 中的 `isRequireApiKeyEnabled()`，而不是直接读取 `process.env.REQUIRE_API_KEY`。这对已部署的实例很重要：在仪表板 → 功能开关中切换 `REQUIRE_API_KEY` 会存储一个数据库覆盖值，并立即影响 `/v1/*`、`/v1beta/*`、`/models`、`/responses`、`/chat/completions`、`/codex/*` 以及其他共享此辅助函数的客户端 API 认证检查。如果无法读取功能开关存储，客户端 API 认证将失败时默认拒绝，并要求提供密钥。

## 破坏性变更 — v3.8.0

`/api/v1/agents/tasks/*` 和 `/api/resilience/model-cooldowns` 端点**现在需要管理身份验证**（提交 `588a0333`）。此前发送不含 `manage` 作用域的普通 API 密钥的客户端将收到 `403`。迁移方式：在 API Keys 仪表板中为密钥授予 `manage` 作用域，或使用已登录的仪表板会话。

## 行为变更 — v3.8.2

`/api/mcp/*`（远程 MCP 服务器）默认仍为 LOCAL_ONLY，但当 `Authorization: Bearer <api-key>` 标头中的密钥具有 `manage` 作用域时，现在会接受非环回请求。此例外通过 `src/server/authz/routeGuard.ts` 中的 `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` 按路径显式控制；同级的 LOCAL_ONLY 前缀 `/api/cli-tools/runtime/*` 被有意设为不可绕过，因为它可以生成任意子进程。来自非环回地址、对 `/api/mcp/*` 的匿名请求仍会返回 `403 LOCAL_ONLY`——任何新增 LOCAL_ONLY 路径的默认策略仍为严格仅限环回。参见[路由守卫层级](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## 测试

- 单元测试：`tests/unit/authz/` — `classify.test.ts`、`pipeline.test.ts`、`client-api-policy.test.ts`、`management-policy.test.ts`、`public-policy.test.ts`。
- 公开允许列表：`tests/unit/public-api-routes.test.ts`。
- 运行指定测试：`node --import tsx/esm --test tests/unit/authz/classify.test.ts`。

## 调试

管道始终使用以下标记标记响应：

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

对于经过身份验证的请求，上游（处理程序端）请求标头还包括：

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

在处理程序—中使用`assertAuth(req, expectedClass)`如果中间件被绕过，它会抛出带有代码`AUTHZ_NOT_INITIALIZED`的`AuthzAssertionError` （有助于在测试中捕获配置回归）。

## 参见

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 每个端点的认证标记
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 认证事件的审计日志
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — 三个范围命名空间和 MCP 工具范围目录
  来源：`src/server/authz/`，`src/lib/api/requireManagementAuth.ts`
