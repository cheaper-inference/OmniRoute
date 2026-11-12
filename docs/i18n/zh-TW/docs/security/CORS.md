# CORS Configuration & Security (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md)

---

OmniRoute控制哪些**瀏覽器起源**可以從單一集中的白名單中讀取跨來源回應。模型是**預設失敗關閉**：在您選擇加入之前，不允許任何來源。本頁記錄了白名單如何解析、 `CORS_ALLOW_ALL=true`實際公開的內容（以及重要的是，它的作用）**不是**）、如何安全地設定開發與生產，以及當通配符生效時儀表板顯示的運行時警告。

**事實來源：** `src/server/cors/origins.ts` （`resolveAllowedOrigin`、 `applyCorsHeaders`、 `getCorsStatus`）。允許清單應用一次，在中間件 (`src/server/authz/pipeline.ts`) 中， —每路由處理程序本身不會設定`Access-Control-Allow-Origin` 。

## 原點是如何解析的

對於每個請求，中間件按以下順序計算`Access-Control-Allow-Origin`值：

1. **`CORS_ALLOW_ALL=true`** （或傳統的`CORS_ORIGIN=*`） →回顯呼叫者的`Origin` （或`*` ，當沒有`Origin`標頭時），使用`Vary: Origin`以便快取保持正確。相同的`applyCorsHeaders()`阻塞點也將`Vary: Accept-Encoding`附加到令牌驗證的`/v1*`/`/v1beta*`表面上的每個 2xx-with-body 回應（`relaxForTokenAuth`， RFC 9110 §12.5.5，問題#6737），因此downstream/shared快取可以正確區分壓縮與未壓縮變體。
2. 否則，請求`Origin`會被規範化（小寫，刪除尾部斜線）並與**合併白名單**:
   - 環境**`CORS_ALLOWED_ORIGINS`** —逗號分隔列表，以及
   - 運行時**`corsOrigins`**設定（儀表板→安全→ _CORS 允許來源_），透過`setRuntimeAllowedOrigins()`從`src/lib/config/runtimeSettings.ts`注入。
3. 沒有匹配→**沒有發出`Access-Control-Allow-Origin`標頭**。瀏覽器阻止跨域讀取。這是預期的故障關閉預設值。

| 環境變數               | 意義                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV的確切來源允許（建議）。                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` →回顯任何來源（通配符）。僅限開發。                   |
| `CORS_ORIGIN`          | 遺產。 `*`行為類似於`CORS_ALLOW_ALL`；將單一值加入到允許清單中。 |

## `CORS_ALLOW_ALL=true`真正暴露的威脅模型—

通用的OWASP警告（「通配符CORS =任何站點都可以呼叫你的API」）值得認真對待，但OmniRoute的曝光是**比一般情況更窄**，因為一個具體的實施事實：

> **中央`applyCorsHeaders()`從不發出`Access-Control-Allow-Credentials`。**除非伺服器發送`Access-Control-Allow-Credentials: true`，否則瀏覽器不會公開_credentialed_（帶有 cookie 的）跨網域回應。 OmniRoute的共享CORS路徑永遠不會。

即使使用`CORS_ALLOW_ALL=true`，這對每個表面意味著什麼：

| 表面                           | 認證機制              | 通配符CORS的作用                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 儀表板 / MANAGEMENT `/api/*`   | Cookie 會話           | 起源已得到回應，但是**沒有`Allow-Credentials`**瀏覽器**區塊**經過認證的閱讀。惡意跨來源站點**無法閱讀**您經過身份驗證的儀表板回應，且會話 cookie 不會公開。                                                                                                                                                                                                           |
| 客戶API `/v1/*`, `/v1beta/*`   | 承載/ `x-api-key`標頭 | 已經寬容了**按設計**(`relaxForTokenAuth`)：瀏覽器永遠不會自動附加`Authorization`/`x-api-key`，因此攻擊者的頁面無法提供您的金鑰。寬鬆的回顯需要經過驗證的主題（經過驗證的API金鑰或儀表板會話），而不僅僅是憑證標頭，並且從不包含`Access-Control-Allow-Credentials`。匿名回應 (`REQUIRE_API_KEY=false`) 使用配置的來源允許列表，包括明確`CORS_ALLOW_ALL=true`選擇加入。 |
| 公共只讀（`/api/health`，...） | 沒有任何              | 不敏感；通配符是無害的。                                                                                                                                                                                                                                                                                                                                              |

所以**殘差**`CORS_ALLOW_ALL=true`的暴露僅限於： (a) 非認證的跨源**讀**已經未經驗證的數據，以及 (b) 讓CORS**飛行前通行證**在管理路由—上，它仍然需要跨來源頁面無法提供的身份驗證。這是**不是**共享CORS路徑上的會話劫持或憑證盜竊向量。

### 正品異常— `/api/v1/agents/`

雲端代理路由（`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`）設定它們的**自己的**CORS標頭（`src/lib/cloudAgent/api.ts`、 `getCloudAgentCorsHeaders`）和**做**與`Access-Control-Allow-Credentials: true`一起發出`Access-Control-Allow-Origin: <origin>|*` 。這是起源迴聲和憑證共存的單一表面，並且它是**獨立於`CORS_ALLOW_ALL`** 。這些路由經過管理驗證（`requireManagementAuth`）；在脫離主機的情況下公開儀表板的操作員應該意識到，這是回應標頭允許跨域憑證讀取的地方。將其收緊到明確的許可名單與此CORS指南分開進行追蹤。

## 生產清單

- **切勿在生產中設定`CORS_ALLOW_ALL=true` 。**保持其未設定狀態。
- 設定一個**明確的**原始清單—環境變數或安全性選項卡欄位：

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- 如果OmniRoute在反向代理/隧道（nginx、Caddy、 Cloudflare Tunnel、 Tailscale）後面運行，則CORS是**不是**您唯一的控制—環迴路由保護仍然保護能夠產生的路由（請參閱[ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ）。不要偽造`X-Forwarded-For: 127.0.0.1`來「修復」403；重新開啟路由防護關閉的RCE類。
- 確認運行時狀態：儀表板顯示**持久的琥珀色旗幟**每當`CORS_ALLOW_ALL=true`處於活動狀態時， `/api/settings/authz-inventory`都會傳回`cors: { allowAll, allowedOrigins }`信封監控工具可以輪詢的情況下，在儀表板→安全→授權清單下。

## 開發便利性—允許特定的本地起源

即使在開發中，你也很少需要通配符。僅允許您使用的開發伺服器：

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

來源匹配時不區分大小寫，忽略尾部斜杠，因此`http://localhost:3000`和`http://localhost:3000/`是等效的。可以在運行時設定相同的CSV**儀表板→安全→ CORS允許的來源**無需重新啟動。

## API金鑰與 cookie 會話

- **承載/ `x-api-key` （ `/v1/*`推理面）：**瀏覽器永遠不會自動附加這些。 CORS在這裡不是一個有意義的障礙— API關鍵是障礙—這就是為什麼該表面是故意允許的，以便瀏覽器和Electron客戶端可以讀取他們已經有權獲得的回應。寬鬆的回顯需要經過驗證的主題（經過驗證的API金鑰或儀表板會話），而不僅僅是憑證標頭，並且從不包含`Access-Control-Allow-Credentials`。匿名回應 (`REQUIRE_API_KEY=false`) 使用配置的來源允許列表，包括明確`CORS_ALLOW_ALL=true`選擇加入。驗證拒絕 (401) 保持可讀，以便客戶端可以顯示已撤銷或輸入錯誤的密鑰 (#5242)：管道本身的 401 保留回顯，並且在管道將其作為匿名服務後拒絕密鑰本身的路由（配置了管理身份驗證的`/v1/models`和`/v1beta/models` ，所有者範圍的`/v1/files`、 `/v1/media`將自動配置`credentialRejectionHeaders()`.回顯以攜帶憑證標頭（`Authorization`、 `x-api-key`、 `x-goog-api-key`或`auth_token` cookie） `/v1/batches` `/v1/session-leases`為關鍵，而不是在路由檢查的其中一個上，並且永遠不會與`Access-Control-Allow-Credentials`配對；主體是一個固定誤差包絡線。由`requireManagementAuth()`保護的`/api/v1/`下的管理路由（`/api/v1/management/*`、 `/api/v1/registered-keys`、 `/api/v1/providers/[provider]/limits`、 `/api/v1/accounts/[id]/limits`、 `/api/v1/issues/report`）不使用此憑證拒絕例外：使用`REQUIRE_API_KEY=false`時，它們的401/403回應遵循配置的CORS來源策略。
- **Cookie 會話（儀表板）：**受故障關閉預設值保護**和**由於共享路徑上缺少`Access-Control-Allow-Credentials` 。讓management/dashboard起源遠離任何允許的配置；它們必須完全保持故障關閉狀態。

## WebSocket握手（`/v1/responses`、 `/v1/ws`）

瀏覽器不會將CORS應用於WebSocket，因此返回推理輸出的WebSocket傳輸會檢查握手`Origin`本身 (`src/server/origin/wsOrigin.ts`)：回應WebSocket (`/v1/responses`)，並且當OmniRoute運行通過`npm start` / `npm run dev`時， `/v1/ws`和`/api/v1/ws`橋接器將`/v1/chat/completions`、 `/v1/messages`和`/v1/responses`作為幀進行傳輸。橋接器向`/api/v1/ws?handshake=1`請求判決並拒絕升級，除非該路由運行了檢查。身份驗證要求仍然單獨適用。來源檢查在以下情況通過：

- 它沒有`Origin`標頭（Codex CLI、 SDKs和其他非瀏覽器客戶端）；
- `Origin`由上面的白名單允許（`CORS_ALLOWED_ORIGINS`、 `corsOrigins`設定、 `CORS_ORIGIN`、 `CORS_ALLOW_ALL`）；
- `Origin`是OmniRoute自己的公共來源之一（配置的公共基礎URL、受信任代理的轉發來源或作為IP文字或`localhost` —給出的直接loopback/LAN主機，與儀表板突變檢查使用的候選者相同）；或者
- 它帶有一個有效的API密鑰，就像在HTTP `/v1/*`表面上一樣。

其他任何事情都會得到`403 ws_origin_forbidden`。儀表板會話 cookie 不會免除外部`Origin`，因為瀏覽器將其附加到任何頁面的套接字。另一個端口上的`localhost`不被視為同源；將此類開發起源添加到`CORS_ALLOWED_ORIGINS`。

## 範例： OmniRoute前面的反向代理

CORS是由OmniRoute本身強制執行的，因此代理通常應該**不是**新增或重寫`Access-Control-*`標頭（雙標頭會破壞瀏覽器）。終止TLS並轉發—讓OmniRoute應答預檢：

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

在OmniRoute （`CORS_ALLOWED_ORIGINS`或安全性標籤）中設定允許的瀏覽器來源，而不是在代理程式中。

## 原始檔

| 憂慮                            | 文件                                                                 |
| ------------------------------- | -------------------------------------------------------------------- |
| 許可名單決議+ `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| 中間件應用程式（單一事實來源）  | `src/server/authz/pipeline.ts`                                       |
| 設定→運行時源注入               | `src/lib/config/runtimeSettings.ts`                                  |
| 儀表板的運行時狀態              | `src/app/api/settings/authz-inventory/route.ts`                      |
| 儀表板警告橫幅                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS允許的來源字段              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent 每路由CORS （例外） | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket握手`Origin`檢查       | `src/server/origin/wsOrigin.ts`                                      |

## 參見

- [路由保護層](./ROUTE_GUARD_TIERS.md)—環回強制執行可產生的路由（單獨的補充控制）。
- [授權指南](../architecture/AUTHZ_GUIDE.md)—完整的身份驗證管道。
