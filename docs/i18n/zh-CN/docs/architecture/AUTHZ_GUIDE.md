# Authorization Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **事实来源：** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **最后更新：** 2026-09-22 — 范围命名空间指向 MCP-SERVER.md

OmniRoute 拥有一个路由感知的授权管道，用于守卫每个 API 请求。分类是**确定性**的且**故障关闭**的——任何无法分类的内容最终都会被归类为 `MANAGEMENT`，并要求会话或管理级别的令牌。本页面为维护路由或设计新端点的工程师解释了该模型。

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> 来源：[diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 两种认证模式

### 1. API 密钥（Bearer）

用于兼容 OpenAI、Anthropic、Gemini 的客户端 API，以及当密钥具有 `manage` 范围时的部分管理路由。

```
Authorization: Bearer <api-key>
```

由 `src/sse/services/auth.ts` 中的 `isValidApiKey()` / `extractApiKey()` 进行校验，并通过 `src/shared/utils/apiAuth.ts` 重新导出。校验器还会把 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 环境变量视为持久的直通密钥（issue #1350）。

### 2. 仪表板会话（auth_token Cookie）

用于仪表板页面和管理操作。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

只有当 JWT 通过验证**并且**携带 `authenticated: true` 时，该 Cookie 才算作会话（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。Cookie 的每个使用方（仪表板路由守卫（`isDashboardSessionAuthenticated()`）、授权管道的刷新、WebSocket 握手、实时服务器、`/api/settings/require-login`、`/api/auth/status`）都通过该辅助函数判断。另外，使用 `JWT_SECRET` 签名的其他 JWT 也存在：Cursor CLI 直通会为密钥持有者签发 `iss "omniroute" / aud "cursor-cli"` 的令牌，这些令牌永远不会被视为会话（#13298）。

由 `src/shared/utils/apiAuth.ts` 中的 `isDashboardSessionAuthenticated()` 验证。当 JWT 在其 30 天有效期内剩余不足 7 天时，授权管道会自动刷新它。

会话也可能在 30 天到期前结束，因为每个签发方都通过 `mintDashboardSessionToken`（包含签发时间 `iat` 和标识符 `jti`）签发 JWT，而验证器会检查两项设置：`sessionsValidAfter`（修改密码时设置，使此前签发的所有会话全部失效，修改密码的浏览器会获得新的 Cookie），以及 `revokedDashboardSessions`（`POST /api/auth/logout` 会把已退出会话的 `jti` 加入其中）。旧版本签发的会话不带这两项声明，在首次修改密码之前一直有效。如果无法读取这些设置，则不信任该会话。

某些管理路由**二选一**即可：Cookie，或者当 API 密钥具有 `manage`（或 `admin`）范围时使用 `Bearer <key>`。这正是 v3.8 新增的“可通过 API 调用配置”工作流的基础。

#### 可选的 OIDC 登录门禁（#6973）

仪表板管理员登录还支持一种**可选的** OIDC（OpenID Connect）流程，与默认的密码登录并存，密码登录不会被移除，只是作为补充：

- 仅当 `settings.oidcEnabled === true` **并且** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` 全部已配置（设置 → 认证）时才启用。否则
  `GET /api/auth/oidc/login` 返回 `400`。
- `GET /api/auth/oidc/login` 从颁发者的 `/.well-known/openid-configuration` 发现
  `authorization_endpoint`（回退为 `<issuer>/authorize`），根据传入请求构建重定向 URI
  （感知 `x-forwarded-proto`），并携带随机 `state` 重定向到身份提供者；该 `state` 存放在
  `httpOnly` 的 `oidc_state` Cookie 中。
- `GET /api/auth/oidc/callback` 校验 `state`，交换授权码，并通过颁发者的 JWKS
  （`jose` 的 `createRemoteJWKSet`，按 JWKS URI 缓存）验证 ID 令牌签名，同时检查
  `issuer` / `audience`。必须配置 `oidcAllowedSubjects` 允许列表：它与令牌的 `sub` 声明或
  `email` 声明匹配。仅当 `email_verified === true` 时才采信 email 声明，因此身份提供者上未经验证的邮箱永远无法通过门禁；
  如果列表为空，回调会拒绝所有登录（`not_configured`）。
- 登录成功后，它签发的 `auth_token` JWT 与密码登录完全**相同**（同为 30 天有效期，见
  `src/app/api/auth/login/route.ts`），因此仪表板会话管道的其余部分（自动刷新、Cookie 标志）保持不变。
  OIDC 只改变 Cookie 的签发方式，不改变它授予的权限。
- 所有 `oidc*` 设置（`oidcEnabled`、`oidcDisablePasswordLogin`、`oidcIssuer`、`oidcClientId`、
  `oidcClientSecret`、`oidcAllowedSubjects`、`oidcRedirectPath`、`oidcScopes`）都位于
  `SECURITY_IMPACTING_SETTINGS_KEYS`（`src/shared/constants/securityImpactingSettings.ts`）中：
  除非请求体以 `currentPassword` 携带管理密码，否则 `PATCH /api/settings` 返回 `400 PASSWORD_REQUIRED`
  （密码错误时返回 `401 PASSWORD_MISMATCH`）。`oidcDisablePasswordLogin` 会拒绝密码 _登录_
  （`POST /api/auth/login`），但保留已存储的密码哈希，重新认证时仍会用 `currentPassword` 与之比对。
- `corsOrigins` 和 `bruteForceProtection` 同样位于 `SECURITY_IMPACTING_SETTINGS_KEYS` 中：放宽其中任何一项都会削弱登录防护，
  因此它们同样需要 `currentPassword` 重新认证（安全选项卡会要求输入），并且 JSON 导入时会丢弃它们。
- 每一个安全策略键（`SECURITY_IMPACTING_SETTINGS_KEYS` 中的条目、所有 `oidc*` 键以及仪表板会话状态）在
  `PATCH /api/settings` 上都**仅限操作员**：即使发送了正确的 `currentPassword`，具有 `manage` 范围的 API 密钥或
  `oma_` 访问令牌也会被以 `403` 拒绝，且该拒绝会被记录为 `settings.update_failed`，原因为
  `reason: OPERATOR_REQUIRED`（`src/lib/api/operatorCredential.ts` 中的 `requireOperatorCredential()`）。
  普通设置（主题、显示偏好）对 `manage` 密钥或 `admin` 访问令牌仍然可写。对 `/api/settings` 本身的每次修改
  （以及 `/api/settings/require-login` 的修改）还需要 `admin` 访问令牌范围（`src/server/authz/accessScopes.ts`
  中的 `ADMIN_MUTATION_EXACT_PATHS`，精确路径匹配）。`GET` 仍为 `read`；其他 `/api/settings/*` 子路由
  （代理、组合默认值、模型别名、压缩、清理……）保持按方法推断的 `write` 范围。
- `POST /api/settings/import-json` 会跳过该重新认证，因此在写入前会删除 `IMPORT_STRIPPED_SETTINGS_KEYS`
  （同一文件）中的所有键：密码和 `currentPassword`、每个 `SECURITY_IMPACTING_SETTINGS_KEYS` 条目，以及仪表板会话状态
  （`sessionsValidAfter`、`revokedDashboardSessions`）。因此，导入较旧的备份无法让已被密码修改或退出登录终止的会话复活。

## 路由类别

`src/server/authz/types.ts` 定义了三种类别；任何无法被确定性分类的路由都会回退为 `MANAGEMENT`。

| 类别         | 说明                                                                                                                                  | 所需认证                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `PUBLIC`     | 明确安全的路由：登录、登出、状态、初始化、健康检查、新手引导启动。                                                                    | 无                                                        |
| `CLIENT_API` | 模型服务端点：`/api/v1/*`、`/api/v1beta/*`，以及别名 `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 当有效的 `REQUIRE_API_KEY` 功能开关启用时需要 Bearer 密钥 |
| `MANAGEMENT` | 仪表板页面、设置、提供者、密钥、管理和诊断端点。                                                                                      | 仪表板会话，或具有 `manage` 范围的 Bearer                 |

部分 `MANAGEMENT` 操作是**仅限操作员**的：只有 `manage` 密钥是不够的。导出已存储的凭证（`GET /api/settings/export-json`、`GET /api/db-backups/export`、`GET /api/db-backups/exportAll`）、将备份还原到现有数据之上（`POST /api/db-backups/import`，包括 `dryRun=true`；按 id 进行的 `POST /api/db-backups` 还原；`POST /api/settings/import-json`）、销毁还原点（`DELETE /api/db-backups` 的清理，以及 `PATCH /api/db-backups`，因为它持久化的保留策略会驱动每次备份后的自动修剪）时，需要仪表板会话、本地 CLI 主体，或已禁用登录。签发同步令牌（`POST /api/sync/tokens`）以及签发 `admin` CLI 访问令牌（`POST /api/cli/tokens`）在所有登录模式下都需要仪表板会话或本地 CLI 主体。任何范围的 API 密钥和 `oma_` 访问令牌都不是操作员凭证：在需要操作员凭证的地方，它们会收到 `403`。检查逻辑位于 `src/lib/api/operatorCredential.ts`（`resolveOperatorCredential()` / `requireOperatorCredential()`）。更改登录设置同样仅限操作员：一旦存在密码，`POST /api/settings/require-login`（设置管理密码 / 切换 `requireLogin`）只接受这些凭证。首次运行的引导窗口（尚无密码）保持不变；仪表板会话必须发送 `currentPassword` 才能替换密码（缺失或错误时返回 `403`，并记录为 `settings.update_failed`）。本地 CLI 以及已禁用登录的实例保留恢复路径，可以在不提供密码的情况下设置密码，因为二者都绑定到拥有数据目录的主机。

## 处理管线

```
传入请求 → src/proxy.ts
  → src/server/authz/pipeline.ts 中的 runAuthzPipeline()
    1. 移除受信任的内部请求头（x-omniroute-auth-*、x-omniroute-route-class）
    2. 生成请求 ID，通过 classifyRoute() 对路由进行分类
    3. 如果 pathname == "/" → 重定向到 /dashboard
    4. 如果正在排空（优雅关闭）且路径为 /api/* → 503
    5. 如果是非 GET 的 /api/* 请求 → 执行 checkBodySize() 防护检查
    6. 如果是 OPTIONS → 返回 CORS 预检响应 204
    7. 如果 options.enforce == false → 透传并附加路由类别请求头
    8. 否则：POLICIES[routeClass].evaluate(ctx)
       - 允许  → 写入 x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - 拒绝 → 返回包含 correlation_id 的 JSON 错误（控制面板页面 → 302 /login）
```

受信任的内部请求头（定义于 `src/server/authz/headers.ts`）会在分类前从传入请求中**移除**——客户端无法预先填充 `x-omniroute-auth-*` 来冒充主体。

### 策略约定

每个路由类别在 `src/server/authz/policies/` 中都有对应的策略：

- **`publicPolicy`**（`policies/public.ts`）——始终返回 `allow({ kind: "anonymous", id: "anonymous" })`。
- **`clientApiPolicy`**（`policies/clientApi.ts`）——提取 Bearer，并通过 `validateApiKey()` 进行验证。仅当有效的 `REQUIRE_API_KEY` 功能标志被禁用时，才回退到匿名访问。有效标志通过 `isRequireApiKeyEnabled()` 解析（`数据库功能标志覆盖 > process.env.REQUIRE_API_KEY > 默认值`），从而使控制面板功能标志和环境变量以一致方式管理 `/api/v1/*`、`/api/v1beta/*` 及其别名；解析器发生故障时默认拒绝访问。允许控制面板会话请求访问客户端 API 路由（包括控制面板模型目录使用的 `/api/v1/models`）。
- **`managementPolicy`**（`policies/management.ts`）——接受控制面板会话、内部模型同步请求（与 `/api/providers/[name]/(sync-models|models)` 匹配），或者在 `isAuthRequired()` 返回 false 时完全跳过认证。当存在 Bearer 令牌但令牌无效时返回 403（`AUTH_001`），否则返回 401。它还会在任何认证分支之前强制执行路由防护层级（LOCAL_ONLY / ALWAYS_PROTECTED）——请参阅[路由防护层级](../security/ROUTE_GUARD_TIERS.md)。当 Bearer 密钥具有 `manage` 作用域时，位于 `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` 中的 LOCAL_ONLY 路径（目前为 `/api/mcp/`）可从非回环地址访问；无论作用域如何，其他所有 LOCAL_ONLY 路径都仍严格限制为仅可从回环地址访问。

策略成功时会返回 `AuthSubject`，其 `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`。下游处理程序可通过 `src/server/authz/assertAuth.ts` 中的 `assertAuth(request, "CLIENT_API")` 读取该主体，而无需重新执行认证逻辑。

## 公共路由列表

`src/shared/constants/publicApiRoutes.ts` 是显式允许列表：

该列表按**形态**拆分，而且这种拆分对安全至关重要（GHSA-74g9-q8f6-793h）：前缀通过
`startsWith()` 匹配，因此也会匹配所有具有相同起始字符的相邻路径。
将 `/api/usage/om-usage` 作为前缀，会把 `/api/usage/om-usage<anything>` 标记为公共路径，而 Next 会将其解析为
`/api/usage/[connectionId]`——一个本身没有身份验证的处理程序。

```ts
// 真正的子树。每个条目都必须以 "/" 结尾（由单元测试断言）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // 在 classify 中被视为 CLIENT_API，而不是“无需身份验证的公共路由”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 单一路由，进行精确匹配（无论是否带有尾部斜杠）。
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

// 同时采用 CORS 来源宽松策略的只读单一路由。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// 不采用 CORS 宽松策略的只读单一路由。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

只读路由仅对安全方法公开。注意：`classifyRoute()` 会从 PUBLIC 的默认归类中排除 `/api/v1/*` 和 `/api/v1beta/*`——它们始终为 `CLIENT_API`，因此 Bearer 密钥策略仍然适用。

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

管道始终会在响应中添加以下标头：

```
x-request-id:               <关联 ID，也会在错误响应正文中返回>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

对于经过身份验证的请求，上游（处理程序侧）请求标头还包括：

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<末 4 位> | "dashboard" | "anonymous"
x-omniroute-auth-label:     （可选）
x-omniroute-auth-scopes:    逗号分隔的列表
```

在处理程序中使用 `assertAuth(req, expectedClass)`——如果中间件被绕过，它会抛出代码为 `AUTHZ_NOT_INITIALIZED` 的 `AuthzAssertionError`（有助于在测试中发现配置回归）。

## 参见

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 每个端点的认证标记
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 认证事件的审计日志
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — 三个范围命名空间和 MCP 工具范围目录
  来源：`src/server/authz/`，`src/lib/api/requireManagementAuth.ts`
