# Authorization Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md)

---

> **真實來源：** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **上次更新：** 2026-09-22 — 範圍命名空間指向 MCP-SERVER.md

OmniRoute 具有一個路由感知授權管道，用於把關每個 API 請求。分類是**確定性**且**故障關閉**的 — 任何無法分類的內容最終都會歸類為 `MANAGEMENT`，並要求會話或管理級別的令牌。本頁解釋了供維護路由或設計新端點的工程師使用的模型。

![授權管道（3 種路由類別 + 策略評估）](../diagrams/exported/authz-pipeline.svg)

> 來源：[diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 兩種驗證模式

### 1. API 金鑰（Bearer）

用於 OpenAI/Anthropic/Gemini 相容的用戶端 API，以及在金鑰具有 `manage` scope 時的部分管理路由。

```
Authorization: Bearer <api-key>
```

由 `src/sse/services/auth.ts` 中的 `isValidApiKey()` / `extractApiKey()` 驗證，並透過 `src/shared/utils/apiAuth.ts` 重新匯出。驗證器也接受 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境變數作為持久的轉送金鑰（issue #1350）。

### 2. Dashboard 工作階段（auth_token cookie）

用於 Dashboard 頁面和管理操作。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

只有在 JWT 通過驗證**且**包含 `authenticated: true` 時，Cookie 才是工作階段
（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。Cookie 的每個使用者（Dashboard 路由守衛（`isDashboardSessionAuthenticated()`）、授權流程重新整理、WebSocket 交握、即時伺服器、`/api/settings/require-login`、`/api/auth/status`）都會透過該輔助函式。
其他使用 `JWT_SECRET` 簽署的 JWT 也存在 — Cursor CLI 轉送會為金鑰持有者簽發
`iss "omniroute" / aud "cursor-cli"` 權杖 — 這些永遠不是工作階段
（#13298）。

由 `src/shared/utils/apiAuth.ts` 中的 `isDashboardSessionAuthenticated()` 驗證。當 JWT 在其 30 天生命週期中剩餘時間少於 7 天時，流程會自動重新整理 JWT。

工作階段也可能在 30 天到期前結束，因為每個簽發者都會透過 `mintDashboardSessionToken`（使用簽發時間 `iat` 和 ID `jti`）處理，而驗證器會檢查兩項設定：密碼變更時設定的 `sessionsValidAfter`，使其之前簽發的每個工作階段都無法再通過驗證（變更密碼的瀏覽器會取得新的 Cookie）；以及 `revokedDashboardSessions`，`POST /api/auth/logout` 會將已登出的工作階段之 `jti` 加入其中。舊版發行版本簽發的工作階段不包含這兩項宣告，會持續有效，直到第一次密碼變更為止。如果無法讀取設定，就不會信任該工作階段。

部分管理路由接受**任一**模式：Cookie，或當 API 金鑰具有 `manage`（或 `admin`）scope 時使用 `Bearer <key>`。這正是 v3.8 新增的「可透過 API 呼叫設定」工作流程所依據的功能。

#### 選用的 OIDC 登入閘道（#6973）

Dashboard 管理員登入也支援選擇啟用的 OIDC（OpenID Connect）流程，
可與預設的密碼登入並行 — 密碼登入絕不會被移除，只會
加以補充：

- 僅在 `settings.oidcEnabled === true` **且** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` 全部完成設定時啟用（設定 → 驗證）。
  否則 `GET /api/auth/oidc/login` 會傳回 `400`。
- `GET /api/auth/oidc/login` 會從 issuer 的
  `/.well-known/openid-configuration` 探索 `authorization_endpoint`（若無則退回
  `<issuer>/authorize`），根據傳入的請求建立重新導向 URI（支援
  `x-forwarded-proto`），並以隨機產生的 `state` 儲存在 `httpOnly`
  `oidc_state` cookie 中，然後重新導向至 IdP。
- `GET /api/auth/oidc/callback` 會驗證 `state`、交換授權碼，並透過 issuer 的 JWKS
  使用 `jose` 的 `createRemoteJWKSet` 驗證 ID token 的簽章（依 JWKS URI
  快取），同時檢查 `issuer` / `audience`。儀表板准入要求非空的
  `oidcAllowedSubjects` 清單、`oidcAdmissionClaim` 原則，或兩者皆具備。主體清單僅在
  `email_verified === true` 時比對 `sub` 或 `email`。選用的 claim 原則會接受以點分隔的
  ID token claim 路徑（例如 `realm_access.roles`）以及一組接受值；解析出的 claim
  必須是字串陣列，且至少包含一個接受值。若兩項原則皆已設定，兩者都必須通過。缺少或格式錯誤的 claim
  會以拒絕方式處理；若未設定任何一項原則，callback 會拒絕登入（`not_configured`）。
  僅設定 subject 的既有配置維持不變。
- Keycloak 通常會將 realm 角色對映至 access token，不一定會對映至 ID token。若要要求
  realm 角色 `admin`，請為此用戶端設定 protocol mapper，將 `realm_access.roles` 納入其
  **ID token**，然後將 `oidcAdmissionClaim` 設為
  `{ "path": "realm_access.roles", "values": ["admin"] }`。啟用僅依角色准入前，請確認此用戶端實際的
  ID token claim；應用程式不會讀取 access-token 角色。IdP 端拒絕 token 可作為補充，但不能取代應用程式端的此項檢查。
- 成功後會簽發與密碼登入所簽發的**完全相同**、有效期 30 天的 `auth_token` JWT
  （`src/app/api/auth/login/route.ts`），因此儀表板其餘的工作階段流程（自動重新整理、cookie
  旗標）均維持不變 — OIDC 僅取代 cookie 的簽發方式，不會改變其授予的權限。IdP 角色／群組的變更不會使現有
  OmniRoute 工作階段失效；登出、密碼輪換或工作階段到期仍決定其生命週期。
- 每個 `oidc*` 設定（`oidcEnabled`、`oidcDisablePasswordLogin`、
  `oidcIssuer`、`oidcClientId`、`oidcClientSecret`、`oidcAllowedSubjects`、
  `oidcAdmissionClaim`、`oidcRedirectPath`、`oidcScopes`）都位於
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  （`src/shared/constants/securityImpactingSettings.ts`）中：`PATCH /api/settings`
  會傳回 `400 PASSWORD_REQUIRED`，除非要求本文以 `currentPassword` 攜帶管理密碼
  （密碼錯誤時傳回 `401 PASSWORD_MISMATCH`）。
  `oidcDisablePasswordLogin` 會拒絕密碼_登入_（`POST /api/auth/login`），但會保留已儲存的密碼雜湊值，
  重新驗證仍會依此檢查 `currentPassword`。
- `corsOrigins` 和 `bruteForceProtection` 也位於 `SECURITY_IMPACTING_SETTINGS_KEYS`
  中：放寬任一設定都會削弱登入防護，因此同樣需要使用 `currentPassword` 重新驗證（Security 分頁會要求輸入），
  而 JSON 匯入會捨棄這兩項設定。
- 每個安全性原則金鑰 — `SECURITY_IMPACTING_SETTINGS_KEYS` 中的項目、每個 `oidc*` 金鑰以及儀表板工作階段狀態 —
  在 `PATCH /api/settings` 上都**僅限操作員**使用：具 manage 範圍的 API 金鑰或
  `oma_` 存取權杖即使傳送正確的 `currentPassword`，仍會被拒絕並傳回 `403`，且拒絕事件會以
  `settings.update_failed`、`reason: OPERATOR_REQUIRED` 記錄稽核
  （`src/lib/api/operatorCredential.ts` 中的 `requireOperatorCredential()`）。
  一般設定（主題、顯示偏好設定）仍可由 `manage` 金鑰或 `admin` 存取權杖寫入。
  `/api/settings` 本身的每次變更（以及 `/api/settings/require-login` 的變更）也需要
  `admin` 存取權杖範圍（`src/server/authz/accessScopes.ts` 中的
  `ADMIN_MUTATION_EXACT_PATHS`，採精確路徑比對）；`GET` 維持 `read`，而其他
  `/api/settings/*` 子路由（代理、組合預設值、模型別名、壓縮、清除等）則維持依方法推導的
  `write` 範圍。
- `POST /api/settings/import-json` 會略過該重新驗證，因此在寫入前會捨棄
  `IMPORT_STRIPPED_SETTINGS_KEYS`（同一檔案）中的每個金鑰：密碼和
  `currentPassword`、每個 `SECURITY_IMPACTING_SETTINGS_KEYS` 項目，以及
  儀表板工作階段狀態（`sessionsValidAfter`、`revokedDashboardSessions`）。
  因此，匯入較舊的備份無法重新啟用已因密碼變更或登出而結束的工作階段。

#### 選用的 TOTP 雙因素登入（#16619）

從設定 → 安全性中註冊；在操作員啟用前均為關閉狀態
（`src/server/auth/dashboardMfa.ts`）。

- **涵蓋內容：**密碼登入（`POST /api/auth/login`，接著需要
  `POST /api/auth/mfa/verify`）以及 `omniroute connect`（`POST /api/cli/connect`，
  會拒絕僅使用密碼的交換，並將代碼作為 `totp` 傳入）。
- **不涵蓋內容：**OIDC / SSO 登入（`/api/auth/oidc/callback`）不會要求 OmniRoute TOTP。它依賴身分提供者本身的第二因素，因此若啟用 OIDC，請在 IdP 中強制執行 MFA。
- **復原**（裝置遺失、沒有剩餘的復原代碼，或某個因素已無法驗證，例如
  `STORAGE_ENCRYPTION_KEY` 變更後）：
  1. 使用 `OMNIROUTE_DISABLE_MFA=true` 重新啟動伺服器。
  2. 在主機本身（迴送對等端與迴送 `Host`，例如
     `http://localhost:20128`）使用密碼登入。僅會針對該來源略過第二因素；其他所有來源仍需要代碼。
  3. 在設定 → 安全性 → 停用中，輸入密碼並將代碼留白。只有在該變數已設定且請求來自主機時，`POST /api/auth/mfa/disable` 才接受不含 `code` 的主體；它仍需要儀表板工作階段與目前的密碼，並會以 `auth.mfa.disabled`（`secondFactor: "recovery_switch"`）記錄稽核。
  4. 取消設定 `OMNIROUTE_DISABLE_MFA`，重新啟動，並視需要再次註冊。

## 路由類別

`src/server/authz/types.ts` 定義了三種類別；任何無法被確定性分類的路由都會退回為 `MANAGEMENT`。

| 類別         | 說明                                                                                                                                  | 所需認證                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `PUBLIC`     | 明確安全的路由：登入、登出、狀態、初始化、健康檢查、新手引導啟動。                                                                    | 無                                                        |
| `CLIENT_API` | 模型服務端點：`/api/v1/*`、`/api/v1beta/*`，以及別名 `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 當有效的 `REQUIRE_API_KEY` 功能旗標啟用時需要 Bearer 金鑰 |
| `MANAGEMENT` | 儀表板頁面、設定、提供者、金鑰、管理與診斷端點。                                                                                      | 儀表板工作階段，或具有 `manage` 範圍的 Bearer             |

部分 `MANAGEMENT` 操作是**僅限操作員**的：只有 `manage` 金鑰是不夠的。匯出已儲存的憑證（`GET /api/settings/export-json`、`GET /api/db-backups/export`、`GET /api/db-backups/exportAll`）、將備份還原到現有資料之上（`POST /api/db-backups/import`，包括 `dryRun=true`；依 id 進行的 `POST /api/db-backups` 還原；`POST /api/settings/import-json`）、銷毀還原點（`DELETE /api/db-backups` 的清理，以及 `PATCH /api/db-backups`，因為它持久化的保留策略會驅動每次備份後的自動修剪）時，需要儀表板工作階段、本機 CLI 主體，或已停用登入。核發同步權杖（`POST /api/sync/tokens`）以及核發 `admin` CLI 存取權杖（`POST /api/cli/tokens`）在所有登入模式下都需要儀表板工作階段或本機 CLI 主體。任何範圍的 API 金鑰與 `oma_` 存取權杖都不是操作員憑證：在需要操作員憑證的地方，它們會收到 `403`。檢查邏輯位於 `src/lib/api/operatorCredential.ts`（`resolveOperatorCredential()` / `requireOperatorCredential()`）。變更登入設定同樣僅限操作員：一旦存在密碼，`POST /api/settings/require-login`（設定管理密碼 / 切換 `requireLogin`）只接受這些憑證。首次執行的引導視窗（尚無密碼）維持不變；儀表板工作階段必須傳送 `currentPassword` 才能取代密碼（缺少或錯誤時回傳 `403`，並記錄為 `settings.update_failed`）。本機 CLI 以及已停用登入的執行個體保留復原路徑，可以在不提供密碼的情況下設定密碼，因為兩者都綁定到擁有資料目錄的主機。

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

可信內部標頭（在`src/server/authz/headers.ts`中定義）是**從傳入請求中剝離**分類之前—客戶端無法預先填入`x-omniroute-auth-*`來模擬主題。

### 保單合約

每個路由類別在`src/server/authz/policies/`中都有一個策略：

- **`publicPolicy`** (`policies/public.ts`) —總是回傳`allow({ kind: "anonymous", id: "anonymous" })`。
- **`clientApiPolicy`** (`policies/clientApi.ts`) —提取 Bearer，透過`validateApiKey()`進行驗證。只有當有效`REQUIRE_API_KEY`功能標誌被停用時才會轉為匿名。有效標誌透過`isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) 解析，因此儀表板功能標誌和環境變數一致地管理`/api/v1/*`、 `/api/v1beta/*`和別名；解析器故障無法關閉。允許客戶端API路由（包括儀表板模型目錄使用的`/api/v1/models`）上的儀表板會話請求。當啟用 Entra ID SSO時，結構上是 Entra 令牌的 Bearer（三個 base64url 段、 `RS*` alg、 `kid`）由SSO分支處理**前**`validateApiKey()`及其判決是最終的—它永遠不會落入 API 金鑰路徑或降級為匿名分支，因此身分提供者中斷不能成為開放存取。靜態API密鑰不受影響。參見[Entra ID SSO](../security/ENTRA_SSO.md) 。
- **`managementPolicy`** (`policies/management.ts`) —接受儀表板會話、內部模型同步請求（與`/api/providers/[name]/(sync-models|models)`匹配），或者如果`isAuthRequired()`返回 false，則完全跳過。當不記名令牌存在但無效時傳回 403 (`AUTH_001`)，否則傳回 401。在任何 auth 分支—也查看[Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)之前強制執行路由保護層 (LOCAL_ONLY / ALWAYS_PROTECTED)。當 Bearer key 攜帶`manage`範圍時，可以從非環回訪問`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`中的LOCAL_ONLY路徑（今天： `/api/mcp/`）；無論範圍如何，所有其他LOCAL_ONLY路徑都保持嚴格環回。

成功的策略會回到`AuthSubject`和`kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`。下游處理程序可以透過`src/server/authz/assertAuth.ts`中的`assertAuth(request, "CLIENT_API")`讀取它，而不是重新運行身份驗證邏輯。

## 公開路由清單

`src/shared/constants/publicApiRoutes.ts` 是明確的允許清單：

此清單依**形狀**分割，而這個分割會影響安全性（GHSA-74g9-q8f6-793h）：前綴會使用
`startsWith()` 進行比對，因此也會比對所有共用其開頭字元的相鄰路徑。
以 `/api/usage/om-usage` 作為前綴，會將 `/api/usage/om-usage<anything>` 標記為 PUBLIC，而 Next 會將其解析為
`/api/usage/[connectionId]` —— 這是一個本身沒有驗證機制的處理常式。

```ts
// 真正的子樹。每個項目都必須以 "/" 結尾（由單元測試斷言）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // 在 classify 中視為 CLIENT_API，而不是「無驗證的公開路由」
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 單一路由，會進行完全比對（可帶或不帶結尾斜線）。
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // 已選擇啟用 TOTP 時的登入步驟 2；需要 MFA-pending cookie
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// 也套用 CORS 來源放寬規則的唯讀單一路由。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// 不套用 CORS 放寬規則的唯讀單一路由。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

唯讀路由只有在安全的方法下才是公開的。注意：`classifyRoute()` 會將 `/api/v1/*` 和 `/api/v1beta/*` 排除在 PUBLIC 的回退處理之外 —— 這些路由一律是 `CLIENT_API`，因此仍會套用 Bearer 金鑰政策。

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

管道始終使用以下標記標記回應：

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

對於經過身份驗證的請求，上游（處理程序端）請求標頭還包括：

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

在處理程序—中使用`assertAuth(req, expectedClass)`如果中間件被繞過，它會拋出帶有代碼`AUTHZ_NOT_INITIALIZED`的`AuthzAssertionError` （有助於在測試中捕獲配置回歸）。

## 參閱

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 每個端點的身份驗證標記
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 身份驗證事件的稽核日誌
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — 三個範圍命名空間和 MCP 工具範圍目錄
- 來源：`src/server/authz/`、`src/lib/api/requireManagementAuth.ts`
