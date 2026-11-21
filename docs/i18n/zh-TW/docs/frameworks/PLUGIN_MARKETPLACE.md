# Plugin Marketplace (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **真實來源：** `src/lib/plugins/`（`marketplace.ts`、`manager.ts`、`manifest.ts`、
> `scanner.ts`、`loader.ts`）、`src/app/api/plugins/`，以及
> `src/app/(dashboard)/dashboard/plugins/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 隨附一套 WordPress 風格的外掛系統。外掛是自包含的目錄——每個目錄都有一份 `plugin.json` 資訊清單與一個進入點檔案——可掛接至請求管線（`onRequest` / `onResponse` / `onError`）及生命週期事件（`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`）。

**外掛市集**是建構於該系統之上的探索層。它提供可供瀏覽的可安裝外掛目錄。預設情況下，該目錄使用一個小型的內建種子登錄檔；操作人員可以將其指向自訂的遠端登錄檔 URL，在此情況下，擷取作業會受到具備 DNS 解析功能的 SSRF 防護機制保護（請參閱[安全性](#security)）。

每個外掛路由皆**僅限迴路位址**（第 1 層級 — `LOCAL_ONLY`）：外掛會在子行程中載入並執行程式碼，因此無論驗證狀態如何，都無法從非迴路來源存取這些路由。請參閱
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)。

## 它如何適合Together

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

- **註冊表層**— `src/lib/plugins/marketplace.ts`：列出/搜尋目錄，在任何失敗時回退到種子註冊表。
- **生命週期層**— `src/lib/plugins/manager.ts` (`pluginManager` singleton)：安裝、升級、啟用、停用、卸載、掃描、啟動載入。
- **清單層**— `src/lib/plugins/manifest.ts`： Zod模式+預設為`plugin.json`。
- **掃描器**— `src/lib/plugins/scanner.ts`：發現磁碟上插件目錄下的插件。
- **裝載機**— `src/lib/plugins/loader.ts`：在單獨的Node.js子程序中產生每個插件，並透過IPC代理掛鉤呼叫。子級不是沙箱（請參閱下面的“插件執行隔離”）。

## 市集目錄

`listMarketplacePlugins()`（`src/lib/plugins/marketplace.ts`）會傳回
`MarketplaceEntry` 物件的清單：

| 欄位          | 類型     | 備註                     |
| ------------- | -------- | ------------------------ |
| `name`        | string   | kebab-case 外掛名稱      |
| `version`     | string   | semver                   |
| `description` | string   | 簡短摘要                 |
| `author`      | string   | 作者／組織               |
| `license`     | string   | SPDX 風格的授權條款 ID   |
| `downloadUrl` | string   | 來源下載 URL（可為空白） |
| `repository`  | string?  | 選用的儲存庫 URL         |
| `tags`        | string[] | 搜尋／篩選標籤           |
| `downloads`   | number   | 下載次數                 |
| `rating`      | number   | 0–5                      |
| `verified`    | boolean  | 該項目是否標示為已驗證   |
| `lastUpdated` | string   | 類 ISO 日期字串          |

未設定自訂登錄檔 URL 時，目錄會使用內建的 `SEED_REGISTRY`（目前包含 `request-logger`、`rate-limiter`、`cost-tracker` 與 `theme-manager`）。種子登錄檔永遠可用——如果已設定的遠端登錄檔無法連線、傳回非 `200` 狀態，或傳回無法辨識的內容，`listMarketplacePlugins()` 會記錄警告並回退至種子清單。

> 注意：市集**目錄**（瀏覽／搜尋）已完成端對端串接，但從目錄一鍵**安裝**市集外掛的功能尚未實作——目前儀表板中市集項目的「安裝」按鈕只會顯示「即將推出」通知。目前的安裝方式是透過本機路徑安裝流程（`POST /api/plugins`）及磁碟探索（`POST /api/plugins/scan`）。

## REST API

所有端點都需要管理身份驗證（`requireManagementAuth`）**和**僅環回— `/api/plugins`和`/api/plugins/`列在`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) 中。

| 端點                               | 方法   | 描述                                       |
| ---------------------------------- | ------ | ------------------------------------------ |
| `/api/plugins`                     | GET    | 列出已安裝的插件（可選用`?status=`過濾器） |
| `/api/plugins`                     | POST   | 從插件來源目錄安裝插件                     |
| `/api/plugins/scan`                | POST   | 掃描插件目錄並註冊新插件                   |
| `/api/plugins/marketplace`         | GET    | 列出市場目錄條目                           |
| `/api/plugins/marketplace/install` | POST   | 按名稱安裝市場插件                         |
| `/api/plugins/[name]`              | GET    | 獲取已安裝插件的詳細信息                   |
| `/api/plugins/[name]`              | DELETE | 解除安裝插件                               |
| `/api/plugins/[name]/activate`     | POST   | 激活（加載+註冊鉤子）                      |
| `/api/plugins/[name]/deactivate`   | POST   | 停用（觸發`onDeactivate`，註銷鉤子）       |
| `/api/plugins/[name]/config`       | GET    | 取得插件配置+配置模式                      |
| `/api/plugins/[name]/config`       | PUT    | 更新插件配置（根據架構進行驗證）           |

`GET /api/plugins` `status`濾波器接受`installed` / `active` / `inactive` / `error`之一。無效值傳回`400`。

### 列出已安裝的插件

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### 從本地路徑安裝

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path`必須是**絕對**目錄路徑**在插件來源目錄內**： `plugin-sources`位於插件根目錄旁邊，因此預設為`~/.omniroute/plugin-sources/` ，或設定該變數時為`<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` （ `src/lib/plugins/installSource.ts`中的`getPluginSourcesDir()` ）。首先複製或克隆外掛程式。當路徑包含`..`或空位元組、位於該目錄外部、透過符號連結在其外部解析、包含目標位於其外部的符號連結或目錄不存在時，將使用`400`拒絕安裝。來源目錄必須包含有效的`plugin.json` （或其中一個的父目錄）。成功後，回應是`201`以及已安裝的插件行。

與其他外掛程式路由不同，即使停用登入（`requireLogin=false`），此路由也需要管理憑證（儀表板會話或管理範圍的API金鑰）：安裝程式碼永遠不是匿名操作。這同樣適用於`POST /api/plugins/marketplace/install` (body `{ "name": "<plugin>" }`)。

### 瀏覽市場

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### 更新插件配置

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config`使用`src/lib/plugins/manifest.ts`中的`configSchema`根據插件的`validatePluginConfig()` （在清單中聲明）驗證主體：每個鍵都必須在架構中聲明，值必須與聲明的類型匹配， `number`字段遵循`min`/`max`，而`select`字段必須與聲明的`enum`匹配。任何違規都會回傳`400`並且不儲存任何內容。聲明沒有`configSchema`插件沒有可配置的鍵，因此使用`400`拒絕請求（「插件沒有聲明任何可配置的鍵」）。

## 設定

### 外掛程式目錄

外掛程式位於 OmniRoute 資料目錄下：

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          #（或 manifest.main 指向的任何檔案）
```

`getDefaultPluginDir()`（`src/lib/plugins/scanner.ts`）會分三個步驟解析該目錄：

1. **`OMNIROUTE_PLUGINS_DIR`**，若已設定 — 無論 `HOME` 為何，皆會逐字採用。這是 Docker/K8s 的明確設定選項；在這些環境中，外掛程式目錄樹會繫結掛載至通常與容器主目錄無關的路徑（#11827）。
2. `<home>/.omniroute/plugins`，其中 `<home>` 來自 `HOME` / `USERPROFILE` 環境變數。
3. `/tmp/.omniroute/plugins`，當程序完全未匯出主目錄時使用。

解析出的目錄會在啟動時以 `scanner.dir_resolved` 記錄一次，並指出最後採用的輸入（`OMNIROUTE_PLUGINS_DIR`、`home` 或 `no-home-fallback`）— 因此，若映像檔無聲地落到步驟 3，記錄會明確指出此情況，而不只是回報空的外掛程式清單。
`POST /api/plugins/scan` 會探索該目錄下任何包含有效
`plugin.json` 的子目錄並加以註冊；同一目錄也是
`pluginManager.install()` 複製外掛程式時使用的根目錄，因此覆寫此目錄會同時移動探索與安裝位置。

> **`OMNIROUTE_PLUGINS_DIR` 並不是 `OMNIROUTE_PLUGIN_PATH`。** 後者僅由
> CLI 命令外掛程式載入器（`bin/cli/plugins.mjs`）讀取，用來尋找會新增 `omniroute` 子命令的 `omniroute-cmd-*` npm
> 套件 — 它不會影響此處所述的執行階段掃描器。相關部分請參閱 [PLUGINS.md](./PLUGINS.md)。

### 自訂市集登錄 URL

市集目錄來源讀取自 `pluginMarketplaceUrl` 設定
（`src/lib/plugins/marketplace.ts` 會讀取 `settings.pluginMarketplaceUrl`）。當其設為 `http(s)` URL 時，`listMarketplacePlugins()` 會擷取該 URL，並接受頂層為項目 JSON 陣列，或包含 `plugins` 陣列的物件；不含字串 `name` 的項目會被篩除。若未設定（或擷取未通過 SSRF 防護／傳回不良回應），則會使用內建的種子登錄。

儀表板的「Marketplace」分頁提供此 URL 的欄位（從
`GET /api/settings` 讀回）。

> 實作注意事項：儀表板的「Save」動作會將
> `pluginMarketplaceUrl` 傳送至 `PATCH /api/settings`。截至撰寫本文時，此
> 鍵尚未在 `updateSettingsSchema`
> （`src/shared/validation/settingsSchemas.ts`）中宣告，因此在依賴它之前，請先確認您所使用版本中的持久化行為 — 一旦該鍵存在於設定儲存區中，**讀取**路徑（`getSettings()` →
> `listMarketplacePlugins()`）便會遵循該鍵。

## 安全

### 僅路由層—環回

插件在產生的子程序中執行程式碼，因此整個`/api/plugins`表面被分類為`LOCAL_ONLY` （第 1 層）。環回強制執行無條件運行**前**任何身份驗證檢查，因此透過隧道到達盒子的洩漏管理令牌仍然無法安裝、啟動或卸載插件。請參閱[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)和硬規則#15 / #17。

### 市場註冊SSRF守衛

自訂註冊表URL是受攻擊者影響的配置，因此在獲取它之前， `listMarketplacePlugins()`通過兩層運行它：

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - 拒絕任何不是`http:` / `https:`內容。
   - 拒絕文字private/loopback/link-local/ULA主機 (IPv4**和**IPv6，包括IPv4-mapped）透過規範的`isPrivateHost` （`src/shared/network/outboundUrlGuard.ts`）。
   - 解決**兩個都**`A`和`AAAA`記錄並拒絕如果**任何**解析的位址是私有—關閉公用主機名稱→私人 IP 旁路。
   - **失敗關閉**： DNS解析失敗會拒絕URL。
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`)：在獲取時重新應用僅限公共的URL防護，並且**阻止重定向**（沒有公共→私有`30x`樞軸）。

任一層失敗的URL都不會中止請求—市場會默默地退回到內建種子註冊表並記錄警告。

> 此防護在PR #3774中專門用於解析 A + AAAA並使用規範`isPrivateHost`而不是IPv4-only檢查。

### 插件執行隔離

> **外掛預設不在沙箱中執行。** 子程序是以 OmniRoute 使用者身分執行的普通 Node.js 程序，沒有 VM 執行環境，也沒有 Node.js 權限旗標。因此，外掛程式碼可以讀寫該使用者能存取的任何檔案、執行程式並存取網路。`requires.permissions` 只決定傳給子程序的環境變數，其他權限不會強制執行。選擇性功能旗標 `PLUGIN_PERMISSION_MODEL_ENABLED` 預設關閉。啟用後，每個外掛依其宣告的權限在 Node.js 權限模型下執行，但 Node.js 無法限制 `network`（請參閱 [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#%E6%AC%8A%E9%99%90%E7%B3%BB%E7%B5%B1)）。請只安裝您信任的外掛。下述的程序隔離可以限制當機和停滯的影響，但不構成安全邊界。

- **行程隔離**— `loadPlugin()` (`src/lib/plugins/loader.ts`) 在單獨的Node.js子程序中產生每個插件，並透過IPC進行通訊。 Hook 呼叫會因`SIGTERM` → `SIGKILL`升級而逾時。
- **環境白名單**—子程序僅接收一組允許的環境變數；僅當清單請求`env`權限時才會授予更廣泛的集。
- **安裝源遏制**— `POST /api/plugins`僅從插件來源目錄讀取（請參閱「從本機路徑安裝」）：該路徑使用`realpath`進行規範化，必須嚴格保留在該目錄內，並且在複製任何內容之前，拒絕攜帶轉義符號連結的來源樹。
- **路徑遏制**— install/upgrade/uninstall斷言插件目錄和`manifest.main`解析**之內**任何複製或遞歸刪除之前的託管外掛根（防止DB路徑被竄改和`manifest.main`中的`../`遍歷）。啟動透過`realpath`解析符號連結並拒絕載入轉義插件目錄的入口點。
- **可選完整性銷**—清單可以宣告`integrity` （`sha256-<base64>`、 SRI格式）欄位。如果存在，載入程式會在載入時驗證條目檔案哈希，並在不匹配時拒絕啟動。它是選擇加入篡改檢測，**不是**安全邊界：它不限制載入的插件可以執行的操作。
- **鉤子中沒有客戶端憑證**—傳遞給`onRequest`、 `onResponse`和`onError`上下文已刪除`authorization`、 `x-api-key`、 `proxy-authorization`和`cookie`標頭，並且API鍵記錄不攜帶鍵值（ `src/lib/plugins/hooks.ts`中的`redactPluginContext()` ）。

## 清單 (`plugin.json`)

由`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) 驗證：

| 場地               | 類型     | 筆記                                                |
| ------------------ | -------- | --------------------------------------------------- |
| `name`             | 細繩     | 必需的; kebab-case (`^[a-z0-9-]+$`)，1–100 個字符   |
| `version`          | 細繩     | 必需的;塞姆弗（`MAJOR.MINOR.PATCH`）                |
| `description`      | 細繩？   | ≤ 500 個字符                                        |
| `author`           | 細繩？   | ≤ 200 個字符                                        |
| `license`          | 細繩？   | 預設為`MIT`                                         |
| `main`             | 細繩？   | 錄入文件；預設為`index.js`                          |
| `source`           | 枚舉？   | `local` \| `marketplace` （預設為`local`）          |
| `tags`             | 細繩[]？ | 搜尋標籤                                            |
| `requires`         | 目的？   | `{ omniroute?, permissions[] }`                     |
| `hooks`            | 目的？   | 布林值聲明外掛程式實作哪個鉤子                      |
| `skills`           | 目的[]？ | 可選技能定義                                        |
| `enabledByDefault` | 布林值？ | 安裝時自動啟動                                      |
| `configSchema`     | 目的？   | 配置字段映射 (`string`/`number`/`boolean`/`select`) |
| `integrity`        | 細繩？   | 可選的`sha256-<base64>`條目檔案 pin                 |

權限來自枚舉`network` / `file-read` / `file-write` / `env` / `exec`。只有`env`具有運行時效果（子層級的環境變數允許清單稍大）；其他的是聲明，不強制執行。

## 生命週期流程

```
安裝（POST /api/plugins，路徑）
  → 掃描／驗證資訊清單 → 複製到暫存區 → 確認主檔案位於目錄內
  → 以不可分割方式重新命名至 ~/.omniroute/plugins/<name> → 插入資料庫資料列
  → 觸發 onInstall → 若 enabledByDefault：啟用

啟用（POST /api/plugins/{name}/activate）
  → realpath 包含範圍檢查 → loadPlugin()（產生子程序）
  → 註冊已宣告的掛鉤 → 狀態 = "active" → 觸發 onActivate

停用（POST /api/plugins/{name}/deactivate）
  → 觸發 onDeactivate（在取消註冊之前）→ 取消註冊掛鉤
  → 終止子程序 → 狀態 = "inactive"

解除安裝（DELETE /api/plugins/{name}）
  → 若為啟用狀態則停用 → 觸發 onUninstall
  → 經包含範圍檢查後，遞迴刪除外掛程式目錄 → 刪除資料庫資料列
```

若對某個目錄重新執行 `install`，且其資訊清單版本**嚴格高於**
已安裝的版本，則會自動升級（全新重新安裝；設定重設為
預設值）。相同或更舊的版本將被拒絕。

## 資料庫

資料表 `plugins`（遷移 `076_create_plugins.sql`）：

| 欄位            | 類型    | 備註                                             |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | 唯一                                             |
| `version`       | TEXT    | semver；預設為 `1.0.0`                           |
| `description`   | TEXT    | 選填                                             |
| `author`        | TEXT    | 選填                                             |
| `license`       | TEXT    | 預設為 `MIT`                                     |
| `main`          | TEXT    | 進入點檔案；預設為 `index.js`                    |
| `source`        | TEXT    | 預設為 `local`                                   |
| `tags`          | TEXT    | JSON 陣列；預設為 `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1；預設為 0                                    |
| `manifest`      | TEXT    | 完整的資訊清單 JSON                              |
| `config`        | TEXT    | JSON；預設為 `{}`                                |
| `config_schema` | TEXT    | JSON；預設為 `{}`                                |
| `hooks`         | TEXT    | 已宣告掛鉤名稱的 JSON 陣列；預設為 `[]`          |
| `permissions`   | TEXT    | JSON 陣列；預設為 `[]`                           |
| `plugin_dir`    | TEXT    | 絕對安裝目錄                                     |
| `error_message` | TEXT    | 當 `status = "error"` 時設定                     |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | 啟用時設定                                       |

外掛程式的指標／分析資料會記錄在其他資料表中
（`090_plugin_metrics.sql`、`091_plugin_analytics.sql`）。

## 儀表板

`/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) 的儀表板頁面提供兩個選項卡：

- **已安裝**—列出了已安裝的插件及其聲明的掛鉤、 activate/deactivate切換按鈕、卸載按鈕和「掃描插件」操作 (`POST /api/plugins/scan`)。
- **市場**—顯示`GET /api/plugins/marketplace`的目錄，其中包含用於設定自訂註冊表URL欄位。

頁面始終顯示警告，提示插件以OmniRoute進程的完全權限運行。

每個插件的設定頁面位於`/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`)。

## 另請參閱

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` 為何僅限回環存取（第 1 級）
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 相關的技能框架
  (`src/lib/skills/`)；外掛程式可在其資訊清單中宣告技能
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — 事件驅動的對外
  整合
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  每個外掛程式路由用於錯誤回應的 `buildErrorBody()` 模式
