# 🌐 OmniRoute Proxy Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md)

---

> **繞過地理封鎖、保護您的身分，並透過任意代理路由 AI 流量——完全沒有複雜的設定。**

OmniRoute 包含功能完整的代理管理系統，可讓您透過 HTTP、HTTPS 或 SOCKS5 代理路由上游 AI 提供者的流量。無論您身處受封鎖的地區、需要輪替 IP，或希望使用隱匿式指紋偽裝——本指南都將完整說明。

---

## 目錄

- [為什麼要使用代理？](#why-use-proxies)
- [架構概覽](#architecture-overview)
- [4 層代理系統](#4-level-proxy-system)
- [代理登錄管理（CRUD）](#proxy-registry-crud)
- [1proxy 免費代理市集](#1proxy-free-proxy-marketplace)
- [代理輪替](#proxy-rotation)
- [反偵測與隱匿](#anti-detection--stealth)
- [上游代理模式](#upstream-proxy-modes)
- [儀表板 UI](#dashboard-ui)
- [API 參考](#api-reference)
- [環境變數](#environment-variables)
- [疑難排解](#troubleshooting)

---

## 為什麼要使用代理？

許多 AI 提供者會依地理區域限制存取。位於**俄羅斯、中國、伊朗、古巴、土耳其**及其他國家／地區的開發人員會遇到如下錯誤：

```
unsupported_country_region_territory
```

即使不在受封鎖的地區，代理也適用於以下用途：

| 使用情境         | 說明                                                       |
| ---------------- | ---------------------------------------------------------- |
| **繞過地理限制** | 從受封鎖的國家／地區存取 OpenAI、Anthropic、Codex、Copilot |
| **IP 輪替**      | 將請求分散到多個 IP，以避免速率限制                        |
| **隱私**         | 對上游提供者隱藏您的真實 IP                                |
| **法規遵循**     | 透過特定司法管轄區路由流量                                 |
| **測試**         | 模擬來自不同地區的請求                                     |

---

## 架構概覽

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute 伺服器                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 代理        │    │ 代理         │    │ 代理             │  │
│  │ 登錄管理    │───▶│ 分派器       │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │（已快取）    │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy 同步 │                        │ 上游             │  │
│  │（免費集區） │                        │ 提供者 API       │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### 核心元件

| 元件              | 檔案                                         | 作用                                                |
| ----------------- | -------------------------------------------- | --------------------------------------------------- |
| **代理登錄管理**  | `src/lib/db/proxies.ts`                      | 對代理項目及範圍指派執行 CRUD                       |
| **代理分派器**    | `open-sse/utils/proxyDispatcher.ts`          | 建立具有快取功能的 `undici` ProxyAgent/SOCKS 分派器 |
| **代理 Fetch**    | `open-sse/utils/proxyFetch.ts`               | 封裝 `fetch()` 並注入代理分派器                     |
| **設定路由**      | `src/app/api/settings/proxy/route.ts`        | 舊版代理設定 API（GET/PUT/DELETE）                  |
| **管理路由**      | `src/app/api/v1/management/proxies/route.ts` | 登錄管理 CRUD API（GET/POST/PATCH/DELETE）          |
| **1proxy 資料庫** | `src/lib/db/oneproxy.ts`                     | 免費代理市集的持久化儲存                            |

---

## 新帳戶的預設代理狀態

在**設定→代理→全域配置**， 使用**預設為新連線啟用代理**選擇新新增的提供者帳戶的初始代理狀態。

新設定控制新新增的提供者帳戶的初始代理狀態。它不會更改現有帳戶或替換全域代理交換器。它的初始值保留了先前的行為。將其關閉一次以建立預設情況下停用代理程式的未來帳戶。

此首選項透過現有設定API儲存為`defaultNewConnectionProxyEnabled` 。從未儲存時預設為`true` 。儲存`false`對後續新帳戶生效，無需重新啟動。 `POST /api/providers`接受可選的嚴格布林值`proxyEnabled`；明確`true`或`false`優先於建立預設值。省略重複帳戶或OAuth重新連線會保留該帳戶的儲存狀態。之後仍可以啟用或停用個人帳號。

選擇性提供者傳輸使用新帳戶的目標安裝預設設置，並在替換現有帳戶時保留目標策略。代理切換不是便攜式傳輸欄位。完整備份還原和歷史JSON/SQL遷移保留其現有的復原語義，包括已儲存的帳戶值和舊模式預設值；完整設定還原也可以還原此首選項。

此首選項不會分配代理或確定代理是否健康或正在使用。實際路由仍然取決於全域代理交換器和適用的代理程式配置。沒有持久帳戶的綜合提供者、帳戶建立前的OAuth流量、 environment/system代理程式和外部後端網路均超出其範圍。

## 四層級代理系統

OmniRoute 支援在**四個獨立範圍**設定代理，並依優先順序解析：

```
優先順序（最高 → 最低）：

  1. 🔵 帳戶／連線代理  →  每個 API 金鑰／OAuth 連線
  2. 🟡 提供者代理      →  每個提供者（例如所有 OpenAI 流量）
  3. 🟠 組合代理        →  每個組合／路由設定
  4. 🟢 全域代理        →  所有流量、所有提供者
```

### 解析方式

當 OmniRoute 將請求傳送至上游提供者時，會呼叫 `resolveProxyForConnectionFromRegistry()`，依序檢查每個層級：

1. **帳戶層級** — 是否有代理指派給此特定連線 ID？
2. **提供者層級** — 是否有代理指派給此提供者（例如 `openai`）？
3. **全域層級** — 是否已設定全域代理？
4. **無代理** — 直接連線至提供者。

第一個符合項目優先。這表示您可以設定全域代理作為備援，並針對特定提供者或連線覆寫該設定。

### 會經由代理處理的內容

| 流量類型        | 經由代理？ | 備註                                        |
| --------------- | ---------- | ------------------------------------------- |
| 聊天補全        | ✅         | 所有 `/v1/chat/completions` 請求            |
| 嵌入            | ✅         | `/v1/embeddings`                            |
| 圖像生成        | ✅         | `/v1/images/generations`                    |
| 音訊（TTS/STT） | ✅         | `/v1/audio/*`                               |
| OAuth 權杖交換  | ✅         | 解決 `unsupported_country_region_territory` |
| 連線測試        | ✅         | 「測試連線」按鈕會使用代理                  |
| 權杖重新整理    | ✅         | 背景 OAuth 更新                             |
| 模型同步        | ✅         | 模型清單與探索                              |

---

## 代理登錄（CRUD）

代理登錄是一個 SQLite 資料表（`proxy_registry`），用於儲存您的所有代理。每個代理包含：

| 欄位       | 類型 | 說明                                |
| ---------- | ---- | ----------------------------------- |
| `id`       | UUID | 唯一識別碼                          |
| `name`     | 字串 | 人類可讀的標籤                      |
| `type`     | 字串 | 通訊協定：`http`、`https`、`socks5` |
| `host`     | 字串 | 代理主機名稱或 IP                   |
| `port`     | 整數 | 連接埠號碼                          |
| `username` | 字串 | 驗證使用者名稱（靜態加密）          |
| `password` | 字串 | 驗證密碼（靜態加密）                |
| `region`   | 字串 | 地理區域標籤                        |
| `notes`    | 字串 | 自由文字備註                        |
| `status`   | 字串 | `active` 或 `inactive`              |
| `source`   | 字串 | `manual` 或 `oneproxy`              |

### 建立代理

**透過儀表板：**

1. 前往**設定 → 代理**
2. 按一下**新增代理**
3. 填寫類型、主機、連接埠，以及選填的驗證認證
4. 儲存

**透過 API：**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### 更新代理

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **注意：**除非您明確傳送非空白的替代值，否則會保留認證。為 `username`/`password` 傳送空字串時，將保留已儲存的值。

### 刪除代理

```bash
# 如果代理已指派給任何範圍，操作將失敗
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# 強制刪除（同時移除指派）
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### 列出代理

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### 將代理指派給範圍

```bash
# 指派給全域範圍
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# 指派給特定提供者
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# 指派給特定連線／金鑰
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### 解析有效代理

檢查指定連線將使用哪個代理：

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

傳回已解析的代理及其層級（`account`、`provider` 或 `global`）和來源。

### 批次指派

一次將一個代理指派給多個提供者或連線：

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### 匯入／匯出

代理包含在**備份／還原**系統中。匯出 OmniRoute 設定時：

1. 前往**儀表板 → 設定 → 備份**
2. 按一下**匯出** — 代理登錄與指派也會包含在內
3. 若要還原，請按一下**匯入**並上傳備份檔案

代理登錄也支援**依 host+port 執行 upsert** — 如果您匯入已存在的代理（主機和連接埠相同），系統會更新該代理，而不是建立重複項目。

### 舊版遷移

如果您在較舊版本（引入 registry 之前）中設定了代理伺服器，OmniRoute 會自動遷移這些設定：

```
舊版 key_value 儲存區 → proxy_registry + proxy_assignments
```

升級後首次啟動時，此程序只會執行一次。若要重新執行，請使用 `migrateLegacyProxyConfigToRegistry({ force: true })`。

---

## 1proxy 免費代理市場

> 🆕**貢獻者： [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) （問題[#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) ）

OmniRoute與**[1個代理](https://1proxy-api.aitradepulse.com)**社區平台提供訪問**數百個免費且經過驗證的代理**來自世界各地。这对于没有自己的代理基础设施的用户来说是完美的。

### 它是如何運作的

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **同步**— OmniRoute從 1proxy API取得經過驗證的代理
2. **店鋪**—代理與`source = 'oneproxy'`保存在同一個`proxy_registry`表中
3. **篩選**— Filter by protocol, country, quality score
4. **旋轉**— Pick the best proxy using quality, random, or sequential strategies
5. **自動降解**— Failed proxies get their quality score reduced; below threshold → marked inactive

### 同步代理

**透過儀表板：**

1. 前往**設定→ 1proxy**選項卡
2. 點選**“立即同步”**
3. View stats: total proxies, active count, average quality, by-country breakdown

**透過API：**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### 過濾代理

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### 代理品質得分

每個 1proxy 代理程式都帶有元資料：

| 場地            | 描述                                 |
| --------------- | ------------------------------------ |
| `qualityScore`  | 1proxy 驗證的 0-100 評級             |
| `latencyMs`     | 測量的網路延遲                       |
| `anonymity`     | `transparent`、 `anonymous`或`elite` |
| `googleAccess`  | proxy是否可以存取Google服務          |
| `countryCode`   | 兩個字母的ISO國家/地區代碼           |
| `lastValidated` | 上次驗證的時間戳                     |

品質分數動態調整：

- **失敗的請求**降低10分
- **≤分數降至 10** →代理標記為`inactive`
- 不活動的代理被排除在輪換之外

### 輪換策略

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### 斷路器

1proxy 同步有一個內建斷路器：

- 後**連續 5 次同步失敗**，進一步的同步嘗試被阻止
- 重置： `resetOneproxyCircuitBreaker()`或重新啟動伺服器
- 同步狀態可在`GET /api/settings/oneproxy?action=status`上取得

### 清除1proxy代理

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## 反偵測與隱身

OmniRoute不僅透過代理—路由流量，它還使流量看起來合法：

### TLS指紋欺騙

使用`wreq-js`產生類似瀏覽器的TLS指紋，繞過標記非瀏覽器TLS握手的機器人偵測系統。

### CLI指紋比對

這**CLI指紋切換**(`Settings → Security`) 重新排序HTTP標頭和JSON正文欄位以符合本機CLI二進位檔案的確切簽章（Claude Code、 Codex等）。這有效**在上面**代理：

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

你兩者都得到**IP掩碼**和**要求真實性**同時地。

### 代理IP保存

儀表板中的顏色編碼徽章顯示哪個代理級別處於活動狀態：

| 徽章 | 等級   | 意義                              |
| ---- | ------ | --------------------------------- |
| 🟢   | 全球的 | 所有流量都經過此代理              |
| 🟡   | 提供者 | 僅代理該提供者的流量              |
| 🔵   | 聯繫   | 這個特定的key/account使用這個代理 |

徽章也顯示已解析的代理程式IP以供驗證。

---

## 上游代理模式

針對使用 CLIProxyAPI 模式的提供者，OmniRoute 支援三種上游代理模式：

| 模式          | 說明                                   |
| ------------- | -------------------------------------- |
| `native`      | OmniRoute 直接處理代理路由（預設）     |
| `cliproxyapi` | 委派給外部 CLIProxyAPI 執行個體        |
| `fallback`    | 先嘗試原生模式，失敗時改用 CLIProxyAPI |

依提供者進行設定：

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## 儀表板使用者介面

### 設定 → 代理分頁

- **全域代理**設定（設定一次即可套用至所有流量）
- **依提供者設定代理**覆寫
- **依連線設定代理**指派
- 透過已設定代理進行**連線測試**
- 顯示作用中代理層級的**彩色徽章**

### 設定 → 1proxy 分頁

- 用於擷取免費代理的**立即同步**按鈕
- **統計資訊卡**：總數、作用中、平均品質、上次同步
- **篩選條件**：通訊協定、國家／地區代碼、最低品質
- **代理表格**，包含主機、通訊協定、國家／地區、品質分數、延遲、匿名性、Google 存取能力
- **同步狀態**面板，包含成功／失敗追蹤及連續失敗次數
- 使用**全部清除**移除所有 1proxy 項目

---

## API 參考

### 代理設定 API

| 方法     | 端點                                           | 說明               |
| -------- | ---------------------------------------------- | ------------------ |
| `GET`    | `/api/settings/proxy`                          | 取得完整代理設定   |
| `GET`    | `/api/settings/proxy?level=global`             | 取得全域代理       |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | 取得提供者代理     |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | 解析實際使用的代理 |
| `PUT`    | `/api/settings/proxy`                          | 更新代理設定       |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | 移除指定層級的代理 |

### 代理登錄 API

| 方法     | 端點                                              | 說明             |
| -------- | ------------------------------------------------- | ---------------- |
| `GET`    | `/api/v1/management/proxies`                      | 列出所有代理     |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | 依 ID 取得代理   |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | 取得代理指派     |
| `POST`   | `/api/v1/management/proxies`                      | 建立代理         |
| `PATCH`  | `/api/v1/management/proxies`                      | 更新代理         |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | 刪除代理         |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | 強制刪除         |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | 批次指派         |
| `GET`    | `/api/v1/management/proxies/assignments`          | 列出指派         |
| `GET`    | `/api/v1/management/proxies/health`               | 代理健康狀態統計 |

### 通道 API

若要將您的 OmniRoute 執行個體公開至公用網際網路（Cloudflare/ngrok/Tailscale），而非透過代理路由對外流量，請參閱 [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md)。通道 REST API 位於 `/api/tunnels/{cloudflared,ngrok,tailscale}/*`，且與上述對外代理鏈彼此獨立。

### 1proxy API

| 方法     | 端點                                   | 說明               |
| -------- | -------------------------------------- | ------------------ |
| `GET`    | `/api/settings/oneproxy`               | 列出 1proxy 代理   |
| `GET`    | `/api/settings/oneproxy?action=stats`  | 取得統計與同步狀態 |
| `GET`    | `/api/settings/oneproxy?action=status` | 僅取得同步狀態     |
| `POST`   | `/api/settings/oneproxy`               | 觸發同步           |
| `POST`   | `/api/settings/oneproxy/rotate`        | 輪替至下一個代理   |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | 刪除一個代理       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | 全部清除           |

### 上游代理 API

| 方法     | 端點                              | 說明             |
| -------- | --------------------------------- | ---------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | 取得上游代理設定 |
| `PUT`    | `/api/upstream-proxy/:providerId` | 設定上游代理模式 |
| `DELETE` | `/api/upstream-proxy/:providerId` | 移除上游代理設定 |

---

## 環境變數

| 變數                  | 預設值 | 說明                                                      |
| --------------------- | ------ | --------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | 啟用 SOCKS5 代理支援（在 `.env.example` 中預設為 `true`） |

---

## 疑難排解

### 「SOCKS5 代理已停用」

在您的 `.env` 檔案中設定 `ENABLE_SOCKS5_PROXY=true`，然後重新啟動。

### 透過代理時出現「socket hang up」錯誤

使用會中斷閒置連線的廉價代理時，這是正常現象。OmniRoute 已透過以下方式處理此問題：

- 停用代理連線的持續連線（`keepAliveTimeout: 1`）
- 停用管線化（`pipelining: 0`）
- 快取分派器，以避免重複握手

如果問題持續發生，請嘗試使用其他代理，或使用 1proxy 輪替功能。

### OAuth 期間出現「unsupported_country_region_territory」

請確認在啟動 OAuth 流程**之前**已設定代理。OmniRoute 會透過已設定的代理路由 OAuth 權杖交換。請先設定全域或提供者層級的代理，然後再連線。

### 未使用代理

請檢查解析順序：

1. 使用 `GET /api/settings/proxy?resolve=your-connection-id` 驗證
2. 檢查代理的 `status` 是否為 `active`（而非 `inactive`）
3. 確保代理指派範圍與您的連線相符

### 1proxy 同步失敗

檢查同步狀態：

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

如果 `consecutiveFailures >= 5`，表示斷路器已觸發。請重新啟動伺服器以重設，或等待手動重設。

---

## 資料庫結構描述

### `proxy_registry` 資料表

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' 或 'oneproxy'
  quality_score INTEGER,                     -- 0-100（僅限 1proxy）
  latency_ms INTEGER,                        -- 毫秒（僅限 1proxy）
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- 是否可存取 Google？（1proxy）
  last_validated TEXT,                       -- ISO 時間戳記（1proxy）
  country_code TEXT,                         -- ISO 2 字母代碼（1proxy）
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` 資料表

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global'、'provider'、'account'、'combo'
  scope_id TEXT,              -- 提供者 ID、連線 ID 或組合 ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## 代理健康狀態檢查（v3.8.16+）

OmniRoute 的**代理快速失敗**機制（`src/lib/proxyHealth.ts`）會透過快速 TCP 連線檢查，在 2 秒內偵測無回應的代理，然後**快取結果**，以避免每個請求都產生額外負擔。

### 運作方式

```
請求 ──▶ ProxyHealthCache.get(url)
          │
          ├─ 快取命中且仍為最新？  ──▶ 傳回快取的狀態
          │
          └─ 快取未命中／已過期？  ──▶ TCP 連線至 host:port
                                         （逾時：FAST_FAIL_TIMEOUT_MS）
                                         ──▶ 快取 HEALTH_CACHE_TTL_MS
                                         ──▶ 傳回結果
```

若無此機制，無回應的代理會讓每個請求在失敗前，於完整的 `PROXY_TIMEOUT_MS` 期間內持續阻塞（預設為 30 秒）。

### 可調整的環境變數

| 變數                         | 預設值  | 用途                                |
| ---------------------------- | ------- | ----------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | 每次健康狀態檢查的 TCP 連線逾時時間 |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | 健康狀態結果的快取時間              |

**建議值：**

| 情境              | 快速失敗逾時時間 | 快取 TTL | 理由                                             |
| ----------------- | ---------------- | -------- | ------------------------------------------------ |
| 高輸送量 API 閘道 | 1500ms           | 60000ms  | 積極地快速失敗，並使用較長的快取時間以減少檢查   |
| 地理分散式節點    | 3000ms           | 15000ms  | 較慢的網路需要更多時間；較短的快取可加快容錯移轉 |
| 開發／測試        | 1000ms           | 10000ms  | 快速反覆測試本機代理                             |
| 隱匿／反偵測      | 2500ms           | 45000ms  | 避免快速探查觸發速率限制                         |

### 檢查代理健康狀態

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// 強制重新檢查特定代理
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

當快取項目已超過 `HEALTH_CACHE_TTL_MS`，且下一個請求將觸發全新檢查時，`stale` 旗標會是 `true`。

### 依代理類型設定的預設值

健康狀態檢查會根據 URL 配置使用合理的預設值：

| 配置                       | 預設連接埠 |
| -------------------------- | ---------- |
| `http://`                  | 8080       |
| `https://`                 | 443        |
| `socks5://` / `socks5h://` | 1080       |

URL 中的自訂連接埠（`http://host:9999`）一律優先於配置的預設值。

---

## Proxy 分析與可觀測性

OmniRoute 會追蹤各個 Proxy 的使用情況，協助營運人員診斷路由模式、延遲突增與重複發生的故障。

### 追蹤的資料

對於透過已設定 Proxy 傳送的每個請求，OmniRoute 都會記錄：

| 指標         | 說明                                  |
| ------------ | ------------------------------------- |
| `proxy_url`  | 完整的 Proxy URL（驗證憑證會被遮蔽）  |
| `provider`   | 上游提供者 ID（openai、anthropic 等） |
| `latency_ms` | 包含 Proxy 交握在內的總往返時間       |
| `connect_ms` | 僅限 TCP 連線時間                     |
| `status`     | 上游傳回的 HTTP 狀態碼                |
| `error`      | 請求失敗時的錯誤類別                  |
| `timestamp`  | ISO 8601 UTC                          |

### 存取資料

```bash
# 最近的 Proxy 事件
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

實際端點為 `/api/usage/proxy-logs`（請參閱 `src/app/api/usage/proxy-logs/route.ts`）。此端點支援：

- `GET /api/usage/proxy-logs` — 擷取 Proxy 日誌
- `DELETE /api/usage/proxy-logs` — 清除所有 Proxy 日誌

如有需要，可透過 SQL 直接查詢 `proxy_logs` 資料表中的彙總統計資料。儀表板 UI 也可能提供彙總檢視。

### 常見模式

**偵測狀態不穩定的 Proxy**（在成功與失敗之間交替）：

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**尋找速度緩慢的 Proxy**（p95 延遲 > 2 秒）：

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## 輪替策略決策樹

當多個 Proxy 被指派至某個範圍時，OmniRoute 會使用**輪替策略**來選擇各個請求所使用的 Proxy。此策略會在範圍層級進行設定（全域、個別提供者、個別帳戶、個別組合）。

### 可用策略

| 策略              | 適用時機                       | 取捨                                                |
| ----------------- | ------------------------------ | --------------------------------------------------- |
| `quality`（預設） | 正式環境中使用品質不一的 Proxy | 偏好高評分的 Proxy；低評分的 Proxy 可能無法獲得流量 |
| `random`          | 負載分配、隱私保護             | 平均分配；忽略品質訊號                              |
| `sequential`      | 偵錯、確定性測試               | 依序循環使用 Proxy；行為易於理解                    |

### 決策樹

```
                    您的 Proxy 是否有品質分數？
                    │
        ┌───────────┴───────────┐
        │                       │
       是                       否
        │                       │
   所有 Proxy 的品質            │
   是否大致相同？               │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  是         否               使用
   │         │              `random`
   │         │              （平均分配可
   │         │              隨時間累積
   │         │              品質資料）
   │         │
   │    使用 `quality`
   │    （最適合品質
   │    不一的情況）
   │
使用 `random`
（平均分散
負載）
```

## 自動排除您自己的代理故障

1proxy 市場池已經自行自動降級失敗的代理（請參閱[代理品質分數](#proxy-quality-scores)）。對於代理**你**新增至登錄機碼後，背景執行狀況排程器（`src/lib/proxyHealth/scheduler.ts`）提供相同的「自動從鏈中排除失效成員」行為，而不刪除任何內容：

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

它如何融入多代理鏈：

1. 調度程式每個`PROXY_HEALTH_INTERVAL_MS`都會偵測每個已註冊的代理程式（預設 10 分鐘；最少 1 分鐘）。
2. `PROXY_AUTO_REMOVE_AFTER`連續之後**確鑿**失敗（真正的連線失敗—逾時或偵測目標自己的 5xx 永遠不會計數，請參閱[代理運行狀況檢查](#proxy-health-checking-v3816)），代理程式的`status`設定為`dead`。
3. `dead`是pool/rotation解析使用的活動狀態過濾器排除的狀態之一，因此作用域的輪換（循環/隨機/黏性/延遲/會話—請參閱[輪換策略決策樹](#rotation-strategy-decision-tree)）立即停止將該代理移交給新請求。池中的其他代理不會受到影響，整個池永遠不會默默地回退到直接連接—看到[4 級代理系統](#4-level-proxy-system)故障關閉防護。
4. 調度程序以相同的時間間隔不斷探測`dead`代理。下一個成功的探測會將`status`翻轉回`active` ，並重新進入旋轉—無需手動重新添加。

這是故意的**選擇加入且非破壞性**：預設情況下，調度程序僅計算和記錄失敗（請參閱`decision.ts`中的策略 C），並且`PROXY_AUTO_DISABLE`永遠不會刪除行—這就是單獨的、更積極的`PROXY_AUTO_REMOVE`標誌的用途。如果兩者都設定為`true`， `PROXY_AUTO_REMOVE`獲勝（即將刪除的代理程式對於中間的軟禁用沒有用處）。有關完整變數列表，請參閱[環境配置](../reference/ENVIRONMENT.md)參考。

---

> 📖**相關文件：**
>
> - [使用者指南](../guides/USER_GUIDE.md)—常規設定和配置 - [API參考](../reference/API_REFERENCE.md)—完整的API文件 -[環境配置](../reference/ENVIRONMENT.md)—所有環境變量
