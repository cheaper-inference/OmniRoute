# Authorization Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md)

---

> **真實來源：** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **上次更新：** 2026-09-22 — 範圍命名空間指向 MCP-SERVER.md

OmniRoute 具有一個路由感知授權管道，用於把關每個 API 請求。分類是**確定性**且**故障關閉**的 — 任何無法分類的內容最終都會歸類為 `MANAGEMENT`，並要求會話或管理級別的令牌。本頁解釋了供維護路由或設計新端點的工程師使用的模型。

![授權管道（3 種路由類別 + 策略評估）](../diagrams/exported/authz-pipeline.svg)

> 來源：[diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 兩種認證模式

### 1. API 金鑰（Bearer）

用於相容 OpenAI、Anthropic、Gemini 的用戶端 API，以及金鑰具有 `manage` 範圍時的部分管理路由。

```
Authorization: Bearer <api-key>
```

由 `src/sse/services/auth.ts` 中的 `isValidApiKey()` / `extractApiKey()` 驗證，並透過 `src/shared/utils/apiAuth.ts` 重新匯出。驗證器也會把 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境變數視為持久的直通金鑰（issue #1350）。

### 2. 儀表板工作階段（auth_token Cookie）

用於儀表板頁面與管理操作。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

只有當 JWT 通過驗證**且**帶有 `authenticated: true` 時，該 Cookie 才算是工作階段（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。Cookie 的每個使用端（儀表板路由守衛（`isDashboardSessionAuthenticated()`）、授權管線的刷新、WebSocket 交握、即時伺服器、`/api/settings/require-login`、`/api/auth/status`）都透過該輔助函式判斷。另外，使用 `JWT_SECRET` 簽署的其他 JWT 也存在：Cursor CLI 直通會為金鑰持有者核發 `iss "omniroute" / aud "cursor-cli"` 的權杖，這些權杖永遠不會被視為工作階段（#13298）。

由 `src/shared/utils/apiAuth.ts` 中的 `isDashboardSessionAuthenticated()` 驗證。當 JWT 在其 30 天效期內剩餘不到 7 天時，授權管線會自動刷新它。

工作階段也可能在 30 天到期前結束，因為每個核發者都透過 `mintDashboardSessionToken`（包含核發時間 `iat` 與識別碼 `jti`）產生 JWT，而驗證器會檢查兩項設定：`sessionsValidAfter`（修改密碼時設定，使此前核發的所有工作階段全部失效，修改密碼的瀏覽器會取得新的 Cookie），以及 `revokedDashboardSessions`（`POST /api/auth/logout` 會把已登出工作階段的 `jti` 加入其中）。舊版本核發的工作階段不帶這兩項宣告，在首次修改密碼之前一直有效。若無法讀取這些設定，則不信任該工作階段。

部分管理路由**二擇一**即可：Cookie，或在 API 金鑰具有 `manage`（或 `admin`）範圍時使用 `Bearer <key>`。這正是 v3.8 新增的「可透過 API 呼叫設定」工作流程的基礎。

#### 選用的 OIDC 登入閘門（#6973）

儀表板管理員登入也支援一種**選用的** OIDC（OpenID Connect）流程，與預設的密碼登入並存，密碼登入不會被移除，只是作為補充：

- 僅當 `settings.oidcEnabled === true` **並且** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` 全部已設定（設定 → 認證）時才啟用。否則
  `GET /api/auth/oidc/login` 回傳 `400`。
- `GET /api/auth/oidc/login` 從核發者的 `/.well-known/openid-configuration` 探索
  `authorization_endpoint`（退回為 `<issuer>/authorize`），根據傳入請求建立重新導向 URI
  （會辨識 `x-forwarded-proto`），並帶著隨機的 `state` 重新導向至身分提供者；該 `state` 存放在
  `httpOnly` 的 `oidc_state` Cookie 中。
- `GET /api/auth/oidc/callback` 驗證 `state`，交換授權碼，並透過核發者的 JWKS
  （`jose` 的 `createRemoteJWKSet`，依 JWKS URI 快取）驗證 ID 權杖簽章，同時檢查
  `issuer` / `audience`。必須設定 `oidcAllowedSubjects` 允許清單：它會與權杖的 `sub` 宣告或
  `email` 宣告比對。僅當 `email_verified === true` 時才採信 email 宣告，因此身分提供者上未驗證的信箱永遠無法通過閘門；
  若清單為空，回呼會拒絕所有登入（`not_configured`）。
- 登入成功後，它核發的 `auth_token` JWT 與密碼登入完全**相同**（同為 30 天效期，見
  `src/app/api/auth/login/route.ts`），因此儀表板工作階段管線的其餘部分（自動刷新、Cookie 旗標）保持不變。
  OIDC 只改變 Cookie 的核發方式，不改變它授予的權限。
- 所有 `oidc*` 設定（`oidcEnabled`、`oidcDisablePasswordLogin`、`oidcIssuer`、`oidcClientId`、
  `oidcClientSecret`、`oidcAllowedSubjects`、`oidcRedirectPath`、`oidcScopes`）都位於
  `SECURITY_IMPACTING_SETTINGS_KEYS`（`src/shared/constants/securityImpactingSettings.ts`）中：
  除非請求主體以 `currentPassword` 帶上管理密碼，否則 `PATCH /api/settings` 會回傳 `400 PASSWORD_REQUIRED`
  （密碼錯誤時回傳 `401 PASSWORD_MISMATCH`）。`oidcDisablePasswordLogin` 會拒絕密碼 _登入_
  （`POST /api/auth/login`），但保留已儲存的密碼雜湊，重新驗證時仍會以 `currentPassword` 與之比對。
- `corsOrigins` 與 `bruteForceProtection` 同樣位於 `SECURITY_IMPACTING_SETTINGS_KEYS` 中：放寬其中任一項都會削弱登入防護，
  因此它們同樣需要以 `currentPassword` 重新驗證（安全分頁會要求輸入），而且 JSON 匯入時會捨棄它們。
- 每一個安全策略鍵（`SECURITY_IMPACTING_SETTINGS_KEYS` 中的項目、所有 `oidc*` 鍵，以及儀表板工作階段狀態）在
  `PATCH /api/settings` 上都**僅限操作員**：即使送出正確的 `currentPassword`，具有 `manage` 範圍的 API 金鑰或
  `oma_` 存取權杖也會被以 `403` 拒絕，且此拒絕會被記錄為 `settings.update_failed`，原因為
  `reason: OPERATOR_REQUIRED`（`src/lib/api/operatorCredential.ts` 中的 `requireOperatorCredential()`）。
  一般設定（佈景主題、顯示偏好）對 `manage` 金鑰或 `admin` 存取權杖仍可寫入。對 `/api/settings` 本身的每次修改
  （以及 `/api/settings/require-login` 的修改）還需要 `admin` 存取權杖範圍（`src/server/authz/accessScopes.ts`
  中的 `ADMIN_MUTATION_EXACT_PATHS`，精確路徑比對）。`GET` 仍為 `read`；其他 `/api/settings/*` 子路由
  （代理、組合預設值、模型別名、壓縮、清理……）維持依方法推斷的 `write` 範圍。
- `POST /api/settings/import-json` 會略過該重新驗證，因此在寫入前會移除 `IMPORT_STRIPPED_SETTINGS_KEYS`
  （同一檔案）中的所有鍵：密碼與 `currentPassword`、每個 `SECURITY_IMPACTING_SETTINGS_KEYS` 項目，以及儀表板工作階段狀態
  （`sessionsValidAfter`、`revokedDashboardSessions`）。因此，匯入較舊的備份無法讓已因密碼修改或登出而結束的工作階段復活。

## 路由類別

`src/server/authz/types.ts` 定義了三種類別；任何無法被確定性分類的路由都會退回為 `MANAGEMENT`。

| 類別         | 說明                                                                                                                                  | 所需認證                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `PUBLIC`     | 明確安全的路由：登入、登出、狀態、初始化、健康檢查、新手引導啟動。                                                                    | 無                                                        |
| `CLIENT_API` | 模型服務端點：`/api/v1/*`、`/api/v1beta/*`，以及別名 `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 當有效的 `REQUIRE_API_KEY` 功能旗標啟用時需要 Bearer 金鑰 |
| `MANAGEMENT` | 儀表板頁面、設定、提供者、金鑰、管理與診斷端點。                                                                                      | 儀表板工作階段，或具有 `manage` 範圍的 Bearer             |

部分 `MANAGEMENT` 操作是**僅限操作員**的：只有 `manage` 金鑰是不夠的。匯出已儲存的憑證（`GET /api/settings/export-json`、`GET /api/db-backups/export`、`GET /api/db-backups/exportAll`）、將備份還原到現有資料之上（`POST /api/db-backups/import`，包括 `dryRun=true`；依 id 進行的 `POST /api/db-backups` 還原；`POST /api/settings/import-json`）、銷毀還原點（`DELETE /api/db-backups` 的清理，以及 `PATCH /api/db-backups`，因為它持久化的保留策略會驅動每次備份後的自動修剪）時，需要儀表板工作階段、本機 CLI 主體，或已停用登入。核發同步權杖（`POST /api/sync/tokens`）以及核發 `admin` CLI 存取權杖（`POST /api/cli/tokens`）在所有登入模式下都需要儀表板工作階段或本機 CLI 主體。任何範圍的 API 金鑰與 `oma_` 存取權杖都不是操作員憑證：在需要操作員憑證的地方，它們會收到 `403`。檢查邏輯位於 `src/lib/api/operatorCredential.ts`（`resolveOperatorCredential()` / `requireOperatorCredential()`）。變更登入設定同樣僅限操作員：一旦存在密碼，`POST /api/settings/require-login`（設定管理密碼 / 切換 `requireLogin`）只接受這些憑證。首次執行的引導視窗（尚無密碼）維持不變；儀表板工作階段必須傳送 `currentPassword` 才能取代密碼（缺少或錯誤時回傳 `403`，並記錄為 `settings.update_failed`）。本機 CLI 以及已停用登入的執行個體保留復原路徑，可以在不提供密碼的情況下設定密碼，因為兩者都綁定到擁有資料目錄的主機。

## 管線

```
傳入請求 → src/proxy.ts
  → src/server/authz/pipeline.ts 中的 runAuthzPipeline()
    1. 移除受信任的內部標頭（x-omniroute-auth-*、x-omniroute-route-class）
    2. 產生請求 ID，透過 classifyRoute() 分類路由
    3. 若 pathname == "/" → 重新導向至 /dashboard
    4. 若正在排空（優雅關閉）且為 /api/* → 503
    5. 若為非 GET 的 /api/* → 執行 checkBodySize() 防護檢查
    6. 若為 OPTIONS → CORS 預檢回應 204
    7. 若 options.enforce == false → 附帶路由類別標頭直接放行
    8. 否則：POLICIES[routeClass].evaluate(ctx)
       - allow  → 加入 x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → 回傳包含 correlation_id 的 JSON 錯誤（儀表板頁面 → 302 /login）
```

受信任的內部標頭（定義於 `src/server/authz/headers.ts`）會在分類前**從傳入請求中移除**——用戶端無法預先填入 `x-omniroute-auth-*` 來冒充主體。

### 原則契約

每個路由類別在 `src/server/authz/policies/` 中都有一項原則：

- **`publicPolicy`**（`policies/public.ts`）——一律回傳 `allow({ kind: "anonymous", id: "anonymous" })`。
- **`clientApiPolicy`**（`policies/clientApi.ts`）——擷取 Bearer，並透過 `validateApiKey()` 驗證。只有在有效的 `REQUIRE_API_KEY` 功能旗標停用時，才會回退至匿名存取。有效旗標透過 `isRequireApiKeyEnabled()`（`DB 功能旗標覆寫 > process.env.REQUIRE_API_KEY > 預設值`）解析，因此儀表板功能旗標和環境變數會一致地管理 `/api/v1/*`、`/api/v1beta/*` 及其別名；解析器失敗時會採取拒絕存取的安全預設。允許具有儀表板工作階段的請求存取用戶端 API 路由（包括儀表板模型目錄所使用的 `/api/v1/models`）。
- **`managementPolicy`**（`policies/management.ts`）——接受儀表板工作階段、內部模型同步請求（比對 `/api/providers/[name]/(sync-models|models)`），或在 `isAuthRequired()` 回傳 false 時完全略過驗證。當存在 Bearer 權杖但無效時回傳 403（`AUTH_001`），否則回傳 401。此原則也會在任何驗證分支之前強制執行路由防護層級（LOCAL_ONLY / ALWAYS_PROTECTED）——請參閱[路由防護層級](../security/ROUTE_GUARD_TIERS.md)。`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` 中的 LOCAL_ONLY 路徑（目前為 `/api/mcp/`），可在 Bearer 金鑰具有 `manage` 範圍時從非迴路位址存取；無論範圍為何，所有其他 LOCAL_ONLY 路徑仍嚴格限制為僅能從迴路位址存取。

成功的原則會回傳 `AuthSubject`，其 `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`。下游處理常式可透過 `src/server/authz/assertAuth.ts` 中的 `assertAuth(request, "CLIENT_API")` 讀取該主體，而無須重新執行驗證邏輯。

## 公開路由清單

`src/shared/constants/publicApiRoutes.ts` 是明確的允許清單：

此清單依照**形狀**拆分，而這項拆分至關重要（GHSA-74g9-q8f6-793h）：前綴會使用
`startsWith()` 進行比對，因此也會比對所有開頭字元相同的相鄰路徑。
將 `/api/usage/om-usage` 作為前綴，會把 `/api/usage/om-usage<anything>` 標記為公開，而 Next 會將其解析至
`/api/usage/[connectionId]`——一個本身沒有驗證機制的處理常式。

```ts
// 真正的子樹。每個項目都必須以 "/" 結尾（由單元測試斷言）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // 在 classify 中視為 CLIENT_API，而非「無需驗證的公開路由」
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 單一路由，採用完全比對（無論是否有結尾斜線）。
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

// 唯讀的單一路由，也套用 CORS 來源限制放寬。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// 不套用 CORS 限制放寬的唯讀單一路由。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

唯讀路由**僅**在使用安全方法時才是公開的。請注意：`classifyRoute()` 會將 `/api/v1/*` 和 `/api/v1beta/*` 排除在 PUBLIC 後備分類之外——這些路由一律為 `CLIENT_API`，因此仍會套用 Bearer 金鑰政策。

## 新增路由

### 模式 1——公開用戶端 API 端點（Bearer 驗證）

位於 `/api/v1/` 和 `/api/v1beta/` 下的路由會自動分類為 `CLIENT_API`。中介軟體會強制執行 Bearer 檢查；路由處理常式不需要再次執行，但可在有需要時讀取主體。

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... 處理常式邏輯
}
```

### 模式 2——管理端點（工作階段或 Bearer + manage）

使用 `src/lib/api/requireManagementAuth.ts` 中的 `requireManagementAuth()`：

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... 處理常式邏輯
}
```

`requireManagementAuth()` 成功時會傳回 `null`，失敗時則會傳回包含 JSON 錯誤的 `Response`：

- 401 `AUTH_001`「需要驗證」——完全沒有憑證
- 403——Bearer 無效，**或**已提供 Bearer，但金鑰缺少 `manage` / `admin` 範圍

對於 `"manage"` 或 `"admin"`，`hasManageScope(scopes)` 會傳回 true。

### 模式 3——新增至公開允許清單

請根據形狀選擇集合，而非貪圖方便。單一路由應放入 `PUBLIC_API_ROUTES_EXACT`（若僅限 GET，則放入 `PUBLIC_READONLY_CORS_API_ROUTES`）；只有真正的子樹才能放入 `PUBLIC_API_ROUTE_PREFIXES`，且它**必須以 `/` 結尾**。將單一路由放入前綴清單，也會一併公開所有開頭字元相同的相鄰路徑——包括日後新增的動態區段同層路由（GHSA-74g9-q8f6-793h）。請更新 `tests/unit/public-api-routes.test.ts`、`tests/unit/authz/public-route-exact-match.test.ts` 和 `tests/unit/authz/classify.test.ts` 中的單元測試。

## 範圍

三個命名空間。每個檢查器只讀取其自身的字串。關於為什麼 `manage` 會使 `read:compression` 的 `scopeMatches` 失敗，以及為什麼 `read` 存取權杖無法 `PATCH /api/keys/{id}` 的並排說明，請參閱[三個範圍命名空間](../frameworks/MCP-SERVER.md#three-scope-namespaces)。

API 金鑰帶有一個 `scopes` 陣列（以 JSON 格式儲存在 `api_keys.scopes` 中，請參閱 `src/lib/db/apiKeys.ts`）。

### 管理範圍

- `manage` / `admin` — `hasManageScope`。對管理 API 路由的 Bearer 存取。
- `mcp:connect`、`self:usage`、`self:account-quota` 和
  `policy:bypass-provider-quota` 是附加的精確匹配範圍。它們位於
  `MANAGEMENT_API_KEY_SCOPES` 之外。`mcp:connect` 僅開啟
  `/api/mcp/` 非迴路（non-loopback）的劃分。

### MCP 工具範圍

目錄和匹配規則（相同字串，或以 `*` 結尾的已授予範圍）：
[MCP 工具範圍](../frameworks/MCP-SERVER.md#mcp-tool-scopes)。
`src/shared/constants/mcpScopes.ts` 中的 `MCP_SCOPE_LIST` 是原始的類型化
子集，而非完整的目錄。在 `resolveCallerScopeContext()` 從 MCP 驗證資訊、請求中繼資料或 `OMNIROUTE_MCP_SCOPES` 解析範圍後，執行會在
`open-sse/mcp-server/scopeEnforcement.ts` 中進行。除非 `OMNIROUTE_MCP_ENFORCE_SCOPES=true`，否則它會保持關閉。

### 存取權杖範圍

`oma_live_…` 權杖上的 `read` / `write` / `admin`，按 `scopeSatisfies` 排序
（`src/lib/accessTokens/scopes.ts`）。此排序僅適用於存取權杖憑證。請參閱
[管理驗證](../guides/MANAGEMENT-AUTH.md)。

## 認證需求開關

`src/shared/utils/apiAuth.ts` 中的 `isAuthRequired()` 決定某個請求是否需要**任何**認證：

- `settings.requireLogin === false` → 全域停用認證，但以下情況除外：始終受保護的層級（參見 [路由守衛層級](../security/ROUTE_GUARD_TIERS.md)），以及核發其所接受憑證的呼叫。這些呼叫需要與開啟登入時相同的憑證：核發同步權杖、以任何範圍核發 CLI 存取權杖、建立具有 `manage`/`admin` 範圍的 API 金鑰、把該範圍授予某個金鑰，或重新產生、顯示此類金鑰（`src/lib/api/requireManagementAuth.ts` 中的 `requireCredentialForManagementScopedKey()`）。僅用於推論的金鑰仍保持開放。
- 未設定密碼**且**未設定 `INITIAL_PASSWORD` 環境變數 → 引導模式允許使用新手引導精靈與回送（loopback）請求，但暴露在網路上的請求仍需要憑證。
- 任何資料庫錯誤 → 失敗時預設拒絕（fail closed，即預設安全）。

用戶端 API 金鑰的強制執行使用 `src/shared/utils/featureFlags.ts` 中的 `isRequireApiKeyEnabled()`，而非直接讀取 `process.env.REQUIRE_API_KEY`。這對已部署的執行個體很重要：在儀表板 → 功能旗標中切換 `REQUIRE_API_KEY` 會儲存一個資料庫覆寫值，並立即影響 `/v1/*`、`/v1beta/*`、`/models`、`/responses`、`/chat/completions`、`/codex/*` 以及其他共用此輔助函式的用戶端 API 認證檢查。若無法讀取功能旗標儲存區，用戶端 API 認證會失敗時預設拒絕，並要求提供金鑰。

## 破壞性變更 — v3.8.0

`/api/v1/agents/tasks/*` 與 `/api/resilience/model-cooldowns` 端點**現在需要管理驗證**（提交 `588a0333`）。先前傳送不含 `manage` 範圍之一般 API 金鑰的用戶端會收到 `403`。遷移方式：在 API Keys 儀表板中將 `manage` 範圍授予該金鑰，或使用已登入的儀表板工作階段。

## 行為變更 — v3.8.2

`/api/mcp/*`（遠端 MCP 伺服器）預設仍為 LOCAL_ONLY，但現在當 `Authorization: Bearer <api-key>` 標頭所帶的金鑰具有 `manage` 範圍時，會接受非迴路位址請求。此例外會透過 `src/server/authz/routeGuard.ts` 中的 `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`，明確地依各路徑加以控管；同屬 LOCAL_ONLY 的前綴 `/api/cli-tools/runtime/*` 刻意不允許略過此限制，因為它可以產生任意子行程。來自非迴路位址、對 `/api/mcp/*` 發出的匿名請求仍會傳回 `403 LOCAL_ONLY`——任何新的 LOCAL_ONLY 路徑預設仍會嚴格限制為僅允許迴路位址。請參閱[路由防護層級](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## 測試

- 單元測試：`tests/unit/authz/` — `classify.test.ts`、`pipeline.test.ts`、`client-api-policy.test.ts`、`management-policy.test.ts`、`public-policy.test.ts`。
- 公開允許清單：`tests/unit/public-api-routes.test.ts`。
- 執行特定測試：`node --import tsx/esm --test tests/unit/authz/classify.test.ts`。

## 偵錯

管線一律會在回應中加上：

```
x-request-id:               <關聯 ID，也會回傳於錯誤回應本文中>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

對於已驗證的請求，上游（處理常式端）的請求標頭還會包含：

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<末 4 碼> | "dashboard" | "anonymous"
x-omniroute-auth-label:     （選用）
x-omniroute-auth-scopes:    以逗號分隔的清單
```

請在處理常式內使用 `assertAuth(req, expectedClass)`——若中介軟體遭到繞過，它會擲出代碼為 `AUTHZ_NOT_INITIALIZED` 的 `AuthzAssertionError`（有助於在測試中發現設定退步問題）。

## 參閱

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 每個端點的身份驗證標記
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 身份驗證事件的稽核日誌
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — 三個範圍命名空間和 MCP 工具範圍目錄
- 來源：`src/server/authz/`、`src/lib/api/requireManagementAuth.ts`
