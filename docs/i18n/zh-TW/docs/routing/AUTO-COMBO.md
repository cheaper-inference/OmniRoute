# OmniRoute Auto-Combo Engine (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md)

---

> **使用者注意**：想要快速開始嗎？請參閱 [Auto-Combo 使用者指南](../getting-started/AUTO-COMBO-GUIDE.md)，其中提供簡明的說明與範例。

> 具備自適應評分與零設定自動路由的自我管理模型鏈

## 零設定自動路由（`auto/` 前綴）

> **新功能：** 無需建立組合。可直接在任何用戶端中使用 `auto/` 前綴。

### 快速範例

| 模型 ID        | 變體    | 行為                                               |
| -------------- | ------- | -------------------------------------------------- |
| `auto`         | default | 所有已連線的提供者、LKGP 策略、平衡權重            |
| `auto/coding`  | coding  | 品質優先權重，適合程式碼生成                       |
| `auto/fast`    | fast    | 低延遲加權選擇                                     |
| `auto/cheap`   | cheap   | 成本最佳化路由（最低成本優先）                     |
| `auto/offline` | offline | 優先選擇配額可用性最高的提供者                     |
| `auto/smart`   | smart   | 品質優先 + 較高探索率（10%），以便更有效地探索模型 |
| `auto/lkgp`    | lkgp    | 明確使用 LKGP（與預設的 `auto` 相同）              |
| `auto/chaos`   | chaos   | 平行扇出，每個提供者使用一個模型（並非故障注入）   |

### 類別 × 層級組合（`auto/<category>:<tier>`）

OpenRouter 風格的後綴將**路由種類**（類別）與**最佳化方式**（層級）分開，因此你可以自由組合它們（#4235 Phase B，`open-sse/services/autoCombo/suffixComposition.ts`）：

- **類別**（依能力篩選候選池）：`coding` · `reasoning` · `vision` · `chat` · `multimodal`。`vision`/`multimodal` 會保留支援視覺的模型；`reasoning` 會保留推理／思考模型。
- **層級**（選擇評分權重／候選池篩選器）：`fast`（快速交付）· `cheap`（別名 `floor`，節省成本）· `reliable`（斷路器健康狀態 + 延遲穩定性）· `free` / `pro`（透過 `classifyTier` 依模型層級篩選候選池——免費層級與進階層級）。

| 範例                   | 解析結果                                               |
| ---------------------- | ------------------------------------------------------ |
| `auto/coding:fast`     | 程式設計候選池、低延遲權重                             |
| `auto/coding:cheap`    | 程式設計候選池、成本最佳化（別名 `auto/coding:floor`） |
| `auto/reasoning:pro`   | 僅限推理／思考模型、進階層級                           |
| `auto/vision`          | 支援視覺的模型（無層級 → 平衡權重）                    |
| `auto/multimodal:free` | 支援多模態的模型、僅限免費層級                         |

任何有效的 `auto/<category>[:<tier>]` 都會依需求解析；其中經過精選的子集會公布於 `/v1/models` 與儀表板中（`open-sse/services/autoCombo/builtinCatalog.ts` 內的 `AUTO_SUFFIX_VARIANTS`）。篩選採用**故障開放**機制——若限制條件未匹配任何已連線的模型，便會使用完整候選池，確保路由永不中斷。核心評分器（`combo.ts`）保持不變；類別／層級篩選器會套用於 `buildAutoCandidates`。

> **即時模型情報：** 啟用 `ARENA_ELO_SYNC_ENABLED` 旗標時，自動路由的適用性會參考即時 **Arena ELO** 排名與 **models.dev** 層級資料（否則會回退至靜態適用性對照表）。

**使用方式：**

```bash
# 任何支援 OpenAI 格式的 IDE 或 CLI 工具
基礎 URL：http://localhost:20128/v1
API 金鑰：<your-endpoint-key>

# 在程式碼／設定中，將模型設為：
model: "auto"                 # 平衡的預設選項
model: "auto/coding"          # 最適合程式設計工作
model: "auto/fast"            # 可用選項中速度最快
model: "auto/cheap"           # 每個 token 的成本最低
```

**執行流程：**

1. OmniRoute 在 `src/sse/handlers/chat.ts` 中偵測 `auto/` 前綴
2. 從資料庫查詢所有**作用中的提供者連線**
3. 篩選出具有有效憑證（API 金鑰或 OAuth token）的連線
4. 判定每個連線所使用的模型（`connection.defaultModel` 或提供者的第一個模型）
5. 在記憶體中建立**虛擬組合**（不儲存至 DB）
6. 使用所選變體的權重設定檔 + LKGP 策略進行路由

**主要特性：**

- ✅ **永遠啟用：** 無需切換開關、建立組合或進行設定
- ✅ **動態：** 自動反映目前已連線的提供者
- ✅ **工作階段黏著性：** LKGP 確保優先使用上次成功的提供者
- ✅ **支援多帳號：** 每個提供者連線都會成為獨立的候選項目
- ✅ **不寫入 DB：** 虛擬組合僅存在於該次請求中，完全沒有持久化負擔

### 各金鑰的候選項目控制（#7819，Level 1+2）

`GET /v1/auto-combo/{channel}/candidates`（`{channel}` = `auto/` 之後的後綴，或基礎頻道使用字面值 `auto`）是一個**唯讀**端點，用於列出 `auto/*` 頻道目前的候選池，並附加即時可達性資訊。此端點會重複使用現有的韌性讀取機制（絕不直接讀取斷路器的 `state`）：

- 提供者斷路器——`getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- 連線冷卻——已解析的 `provider_connections` 資料列上的 `rateLimitedUntil` / `testStatus`
- 模型鎖定——`isModelLocked(provider, connectionId, model)`

每個候選項目也會包含此 API 金鑰的 `excluded` 旗標。排除設定會按 API 金鑰分別儲存（`auto_candidate_overrides` 資料表，遷移 `128`）——OmniRoute 是單租戶系統，且沒有 `users` 資料表，因此 `apiKeyId` 是最接近真實各呼叫者身分的識別方式——並透過經過單元測試的純函式 `filterExcludedCandidates()`（`open-sse/services/autoCombo/candidateOverrides.ts`），於 `open-sse/services/autoCombo/virtualFactory.ts` 中的候選池關卡強制執行。此篩選器採用**故障開放**機制：未設定 apiKeyId/頻道或 DB 查詢失敗時，都會保留未篩選的候選池，因此未設定任何覆寫項目的操作者，所看到的路由行為會與此功能推出前逐位元組完全相同。

**延後至後續議題處理：**每個候選項目的權重 + 明確排序（第 3 級
— 整合至現有的加權／優先順序策略路徑），以及為每個 `auto/*` 頻道固定特定的
`combo.ts` 策略（第 4 級）。關於在單一租戶模型下，覆寫設定應維持為每個 API 金鑰各自設定，還是改為全域設定這項未決問題，請參閱 #7819 計畫。

**幕後運作流程：**

```txt
請求：{ model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts 偵測前綴
   ↓
createVirtualAutoCombo('coding') → 從使用中的連線建立 candidatePool
   ↓
handleComboChat（與持久化組合使用相同的引擎）
   ↓
自動評分會為每個請求選擇最佳的提供者／模型
```

**實作檔案：**

| 檔案                                                      | 用途                             |
| --------------------------------------------------------- | -------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | 前綴剖析器（`parseAutoPrefix`）  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 建立虛擬 `AutoComboConfig` 物件  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 用於模擬提供者登錄檔的測試掛鉤   |
| `src/sse/handlers/chat.ts`                                | 整合：自動前綴短路處理           |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` 系統項目 |

## 儲存的自動組合的帳戶首選項

智慧型自動編輯器提供了一個可選的**帳戶偏好**部分。每個連線都可以是首選、正常（預設）、保留或排除。多個連接可以共享一個層。自動在第一個符合條件的層中選擇，保留其scoring/router行為；失敗的嘗試會落入剩餘的具體帳戶，優先於正常帳戶，然後再保留。此組合從不使用排除的連線。

此設定儲存為`config.accountPreferences`，由連接ID鍵入：

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

省略或空的地圖會保留現有的路線。首選項不會啟用已停用的連線、授予 API 金鑰存取權限、復原配額阻止的候選者或繞過預算檢查。每次嘗試都僅限於其特定連接，因此帳戶後備無法跳轉組合路由器後面的層。現有的會話關聯性可能會保留符合條件的帳戶；排除綁定到本機回合的帳戶會停止該回合，而不是默默地更改帳戶。

配置的首選項使用帳戶感知自動路徑：未調度未綁定的上下文快取、智慧管道、混亂和影子快捷方式。這些請求的投機對沖被停用，因此儲備帳戶無法與首選帳戶競爭。其他組合策略不解釋此設定。將組合從「自動」變更為保留已儲存的首選項以供以後切換回來。

## 與實際模型 ID 相符的組合名稱

`name` 與純模型 ID 完全相同的組合（例如名為 `gpt-5.5` 的組合）是**刻意設計且受支援的模式**，而非錯誤：這是 [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) 中所記載，針對各模型 ID 進行提供者備援的機制。由於組合解析會先於純模型 ID 解析進行（`src/sse/services/model.ts` 中的 `getComboForModel()`），因此對純 ID `gpt-5.5` 的請求會透過該組合的目標（例如 `acme-responses/gpt-5.5`、`backup-responses/gpt-5.5`）路由，而不是直接傳送至單一提供者——這重用了為 [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) 建立的「組合優先於重寫」優先順序，並由 `tests/unit/responses-combo-resolution-3227.test.ts` 和 `tests/unit/combo-name-codex-responses-rewrite.test.ts` 進行迴歸測試。

建立組合或重新命名組合，使其名稱遮蔽實際模型 ID，**絕不會遭到拒絕**——否則將破壞此處記載的工作流程。相反地（#8530），當（新）名稱與實際模型 ID 衝突時，`POST /api/combos` 和 `PUT /api/combos/[id]` 會在回應中附加一個非阻斷性的 `warning` 欄位：

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

啟動時，`scanComboModelNameCollisionsAtBoot()`（`src/instrumentation-node.ts`）也會記錄一行 `[STARTUP]` 警告，列出每個遮蔽模型 ID 的現有組合，讓意外遇到此情況（而非依照 #6940 刻意設定）的營運人員能收到提示。偵測輔助函式位於 `src/lib/combos/modelNameCollision.ts`。

## 從用戶端呼叫自訂組合

只有當用戶端在 `model` 欄位中傳送組合的**確切名稱**時，才會使用持久化組合（Settings → Combos）——組合名稱不支援模糊或部分比對，也不涉及 `auto/` 前綴。解析順序（`src/sse/services/model.ts` 中的 `getComboForModel()`）：

1. 組合名稱完全相符（`model: "my-combo"`），
2. `combo/<name>` 前綴（`model: "combo/my-combo"`），
3. 模型→組合的 glob 對應（`/api/model-combo-mappings`）。

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

兩個常見陷阱：

- **`auto` 不會使用您的組合。** `auto`/`auto/*` 會建立自己的零設定候選集，且只有在某個組合的名稱確實為 `auto` 時才會查閱持久化組合（不建議這麼做）。若要透過組合進行路由，請傳送其確切名稱，而不是 `auto`。
- **`openrouter/auto` 是真正的付費 OpenRouter 產品**（「Auto Best Available」），而不是 OmniRoute 別名。它是 OpenRouter 登錄檔（`open-sse/config/providers/registry/openrouter/index.ts`）中唯一的靜態模型項目，且會獨立計費。請使用 Settings → Routing → Hide paid models，將其排除於 `auto` 候選集中。

請參閱 [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) 和 [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111)，以瞭解本文所說明之原始混淆。

## 它是如何工作的（持久自動組合）

自動組合引擎使用以下參數動態地為每個請求選擇最佳的provider/model ：**16因素評分功能**（在`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`中定義）。預設權重總和為`1.0`；自訂權重由`normalizeScoringWeights()`重新標準化。十六個— `cacheAffinity`和`resetWindowAffinity` —中的兩個攜帶預設權重`0`； `reliability`在`DEFAULT_WEIGHTS`中攜帶`0` ，但在通用包中`0.03` ，在`reliability-first`中攜帶`0.04` ，而`quality`在包中攜帶`0.02` （ `quality-first`中攜帶`0.03` ）：它們仍然針對每個候選者進行計算，並且`cacheAffinity`在分數之外門控提示快取重複資料刪除，因此預設情況下，零預設因子不會投票，而套件則預設投票。

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> 來源： [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) （透過`npm run docs:render-diagrams`重新生成）。檔案名稱是歷史的；來源圖和渲染圖顯示了`DEFAULT_WEIGHTS`中聲明的所有 16 個因素。

| 因素                  | 預設權重 | 說明                                                                                                                                        |
| :-------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429   | 剩餘配額/速率限制空間 [0..1]                                                                                                                |
| `health`              | 0.1605   | 斷路器的健康評分（CLOSED= 1.0、 HALF_OPEN= 0.5、 OPEN= 0.0）                                                                                |
| `costInv`             | 0.1429   | 逆**混合**成本（60% 輸入+ 40% 輸出代幣價格，標準化） —更便宜=得分較高                                                                       |
| `latencyInv`          | 0.1143   | 反向 p95 延遲歸一化為池—更快=得分更高                                                                                                       |
| `taskFit`             | 0.0762   | 任務類型適應性（編碼、審查、規劃、分析、調試、文件）                                                                                        |
| `stability`           | 0.0476   | 延遲標準差的基於變異數的穩定性—反應時間波動得分較低的候選者                                                                                 |
| `tierPriority`        | 0.0476   | 帳戶等級優先— Ultra = 1.0、Pro = 0.67、Standard = 0.33、Free = 0.0                                                                          |
| `tierAffinity`        | 0.0476   | 候選人層級與清單推薦層級之間的親和度                                                                                                        |
| `specificityMatch`    | 0.0476   | 請求特異性（清單提示）和模型層之間的匹配                                                                                                    |
| `contextAffinity`     | 0.0476   | 請求的上下文視窗需求與模型的上下文視窗之間的關聯性                                                                                          |
| `sessionAvailability` | 0.0476   | 此會話的候選連線的OAuth會話可用性（`getOAuthSessionAvailability()`；非 OAuth 連線得分 1.0）                                                 |
| `connectionDensity`   | 0.0476   | 在同一提供者的連線之間分散負載（反集中）                                                                                                    |
| `cacheAffinity`       | 0.00     | 透過 Rendezvous 雜湊，優先選擇最有可能已持有此請求提示快取前綴的連線（`open-sse/services/combo/promptCacheAffinity.ts`）；預設停用（#8008） |
| `resetWindowAffinity` | 0.00     | 偏向配額重置視窗有利的連線（預設為停用）                                                                                                    |
| `quality`             | 0.03     | 來自路由事件品質追蹤器的回饋驅動的輸出品質訊號；沒有觀察結果的候選人得到中性 0.5                                                            |
| `reliability`         | 0.00     | 根據 10 個樣本樓層的 24 小時使用歷史記錄觀察到的成功份額`1 - failureRate`（否則為實時指標）；沒有觀察結果的候選讀作 1.0。預設禁用           |

冷啟動後，記憶體中的`quality`追蹤器 (`open-sse/services/routing/quality.ts`) 為空，因此每個候選者都會獲得中立的`0.5`直到第一個觀察結果落地。

> **不可讀的配額（#15347）。**當提供者有配額獲取器但它沒有傳回任何可讀內容（獲取失敗、缺少憑證、僅使用訊息或沒有可解析的`windows`且沒有有限`percentUsed`格式錯誤快照，包括`percentUsed: null`）時，候選者在`quota`軸上對`0`進行評分，其最終得分乘以`UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0.5, `autoStrategy.ts`懲罰模式，與軟狀態懲罰相同。失敗的使用讀取是有關遙測的證據，而不是提供者的證據，因此它的排名嚴格低於任何實際讀數，包括已確認的 100%-used讀數，但絕不會被硬阻止或驅逐。沒有上限的提供者報告`unlimited: true`和分數為完整配額；沒有註冊配額獲取器的提供者根本沒有遙測來源，並保留預設值`100`。

**和：** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`如`DEFAULT_WEIGHTS`中所聲明的；使用者配置的權重在評分之前由`normalizeScoringWeights()`重新歸一化為分佈。

## 模式套件

`open-sse/services/autoCombo/modePacks.ts` 中有 6 個預先定義的權重設定檔。每個套件都會完全取代預設權重，讓選擇偏向某個目標。每個套件的權重總和都已是 `1.0`（以四位小數顯示時為 `0.9999`），因此套件啟用時，`normalizeScoringWeights()` 沒有任何實質需要修正的內容——以下數值在考量四捨五入後，就是評分器實際套用的值。

| 因素                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

注意事項：

- **套件包含 `quality` 和 `reliability`**（`quality 0.02`，`quality-first 0.03`；`reliability 0.03`，`reliability-first 0.04`），並且會完整取代權重映射（`weights = pack`，而非合併）。`DEFAULT_WEIGHTS` 包含 `quality 0.03 / reliability 0`；選擇 `balanced`/`default` 會保留這些預設值，選擇套件則會使用上方列出的套件值。在冷啟動資源池中（尚無觀測資料，因此 `quality 0.5` 且 `reliability 1`），這兩個因素在一般套件下會增加 `+0.04`（`0.03 + 0.01`），在 `quality-first` 下增加 `+0.045`，在 `reliability-first` 下增加 `+0.05`。
- 每個套件中的 `tierAffinity`、`specificityMatch` 和 `resetWindowAffinity` 都明確設為 `0`。
- 各套件的重點一覽：
  - **ship-fast** → latencyInv 0.3048 + health 0.2667（低延遲、健康的連線）
  - **cost-saver** → costInv 0.3324（最便宜的 token 勝出）
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03，為所有套件中最高（最適合任務且表現一致的模型）
  - **offline-friendly** → quota 0.3324 + health 0.2667（不論速度／成本，最大化可用餘裕）
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04，為所有套件中最高（最少意外）
  - **chaos-mode** → health 0.4000 + taskFit 0.1905（權重套件 `auto/chaos` 指派給其面板成員的權重；平行扇出不會讀取這些權重，而且這不是故障注入設定檔，請參閱 [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out)）

### 每個請求的控制項（標頭）— #6023 / #6024 / #6025 / #3470

`auto` 組合可透過三個標頭**針對每個請求**進行引導，而不會變更該組合已儲存的設定。這些標頭僅適用於 `auto` 策略，且只影響攜帶這些標頭的請求；未提供標頭時，會使用該組合已儲存的 `modePack`/`budgetCap`/`budgetFallback`。

| 標頭                          | 接受值                                                                                                                                                                         | 效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | 預設別名（`fast`、`balanced`、`quality`、`cheap`、`reliable`、`offline`）或原始套件名稱（`ship-fast`、`cost-saver`、`quality-first`、`offline-friendly`、`reliability-first`） | 覆寫此請求的評分權重。`balanced`/`default` 會強制使用預設權重（不使用套件）。未知值會被忽略（保留設定）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `X-OmniRoute-Budget`          | 正數（每個請求的最高 USD 金額）                                                                                                                                                | 硬性成本上限：預估成本超過此上限的候選項目會在選擇前被篩除。當**所有**候選項目都超出上限時的處理方式，由下方的 `X-OmniRoute-Budget-Fallback` 控制。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget-Fallback` | `cheapest`（預設，別名：`cheapest-viable`、`soft`）或 `strict`（別名：`block`、`hard`）                                                                                        | `cheapest`：即使全域最便宜的候選項目仍超出上限，也會退回選擇該候選項目（舊版行為）。`strict`：拒絕進行選擇——請求會立即失敗並回傳 `HTTP 402`，而非在未提示的情況下超支。未知值會被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `X-OmniRoute-Effort`          | `auto`（其他值保留）                                                                                                                                                           | 自適應思考預算：當請求**不含**任何形式的推理欄位（`reasoning_effort`、`reasoning`、`thinking`）時，閘道會根據確定性的請求結構訊號（最後一則使用者訊息的長度、截至最後一則使用者訊息的上下文大小、先前的工具結果、工具迴圈深度），將 `auto` 解析為 `low`/`medium`/`high`。訊號範圍僅限於目前回合——最後一則使用者訊息之後的所有內容都會被忽略——因此，工具迴圈中的每個請求都會解析為相同層級（每回合無狀態固定、不保留工作階段狀態，也不會在迴圈中途升級，以免破壞上游提示快取前綴）。用戶端明確指定的推理欄位一律優先。僅適用於上游分派解析為 OpenAI Chat Completions 格式的請求（`targetFormat === FORMATS.OPENAI`）——`reasoning_effort` 是 OpenAI 格式的欄位，因此此標頭對以 Claude 或 Gemini 為目標的請求不會產生作用（請參閱 `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`）。 |

```bash
# 強制使用最快的設定檔、將此請求的費用上限設為 $0.05，並在可能超支時直接封鎖
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

解析是一個純函式（`open-sse/services/autoCombo/requestControls.ts`）；解析後的值會傳入引擎現有的 `config.modePack` / `config.budgetCap` /
`config.budgetFallback` 輸入。組合中儲存的 `config.budgetFallback`（"strict" |
"cheapest"）會設定持續性原則；此標頭則會針對單一請求覆寫該原則。

## 所有路由策略

OmniRoute 的組合引擎支援 **20 種路由策略**（宣告於 `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`）。Auto Combo 引擎本身透過 `auto` 策略公開；其他策略則可供持久化組合使用。

| 策略                | 說明                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | 採用明確優先順序、以第一個目標為優先的有序清單                                                                                        |
| `weighted`          | 根據每個目標的權重進行加權隨機選擇                                                                                                    |
| `round-robin`       | 依序循環使用各目標（採批次處理；見下文）                                                                                              |
| `context-relay`     | 在各目標之間移交上下文（適用於長對話）                                                                                                |
| `fill-first`        | 先用完每個目標的配額，再移至下一個目標                                                                                                |
| `p2c`               | 二選一隨機負載平衡                                                                                                                    |
| `random`            | 均勻隨機選擇                                                                                                                          |
| `least-used`        | 選擇目前負載最低的目標                                                                                                                |
| `cost-optimized`    | 根據目錄定價，將每次請求的成本降至最低                                                                                                |
| `reset-aware` ⭐    | 依配額重設時間排定優先順序——重設週期較短者排名較高                                                                                    |
| `reset-window`      | 優先選擇配額週期即將重設的目標                                                                                                        |
| `headroom`          | 選擇剩餘配額空間最多的目標                                                                                                            |
| `quota-weighted`    | 略過配額已耗盡的帳戶，再依剩餘配額除以進行中負載的比例，從其餘帳戶中選擇；現有對話會繼續固定至原目標                                  |
| `strict-random`     | 不對重複項目進行去重的隨機選擇                                                                                                        |
| `auto`              | 使用 Auto Combo 評分（16 項因素）——**建議使用**                                                                                       |
| `lkgp`              | 最後已知可用路徑（固定使用最近一次成功的提供者，然後回退至規則）                                                                      |
| `context-optimized` | 選擇最符合目前上下文大小的目標                                                                                                        |
| `cache-optimized`   | 依提示快取親和性重新排序目標——最有可能已持有此請求快取前綴的連線會最先嘗試（`open-sse/services/combo/promptCacheAffinity.ts`、#8008） |
| `fusion` 🧬         | 平行分派至一組模型，然後由評審模型綜合產生單一答案（見下文）                                                                          |
| `pipeline`          | 依序執行各目標，將每個步驟的輸出傳入下一個步驟作為輸入；僅回傳最終答案（#6396）                                                       |

⭐ = v3.8.0 新增 · 🧬 = v3.8.36 新增

### `weighted` 語意

`weighted` 是**針對每個請求進行一次按比例隨機抽取**
（`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`），而不是用來均衡分配：

- 每個請求會以 `weight / totalWeight` 的機率抽取**一個**步驟；其餘步驟則依權重由高至低排序，作為該請求的回退鏈。
- 權重為 `0`（或未設定）的步驟，只要有任何其他步驟的權重 > 0，就**永遠不會被抽中**——只有在抽中的步驟失敗後，才可能作為回退選項。僅當**所有**權重皆為 0 時，選擇才會變為均勻隨機。
- 若某步驟的所有目標皆不可用——提供者斷路器為 `OPEN`、連線處於冷卻期、模型遭鎖定——該步驟會在抽取前遭到移除（`open-sse/services/combo/targetResolution.ts`），因此單一健康步驟可能暫時贏得每一個請求。
- `stickyWeightedLimit`（組合設定，預設值 `1` = 關閉）會將抽中的步驟固定使用指定次數的連續成功，之後才重新抽取。

若需嚴格輪替，請使用 `round-robin`；在 `weighted` 中設定相同權重只能達到統計上的平衡，而非嚴格平衡。

### 代理管道模式

具有至少兩個模型的`pipeline`組合可以選擇使用`config.agenticOrchestration.enabled`進行planner/executor路由。第一個目標有規劃和最終答案；第二個目標發出客戶端本機工具呼叫。 OmniRoute從請求協定中偵測工具結果延續，詢問規劃器是否需要另一輪工具，並動態地使執行器或規劃器成為面向客戶的最後一步。

在工具結果延續上，當兩個連續完成的輪次重複相同的工具呼叫且結果不變時，或當兩個連續輪次中的每個明確標記結果失敗時， OmniRoute也會停止執行。更改的結果允許重複呼叫（例如輪詢）。此防護會根據新的使用者請求進行重置，將並行呼叫分組為一輪，並支援Anthropic、聊天完成、回應和Gemini歷史記錄。規劃者收到原因並擁有最終答案，即使它要求另一輪工具也是如此。

第二個目標之後的其他模型是有序執行程式備份。失敗的HTTP回應或傳輸異常將前進到下一個執行器，攜帶相同的規劃器決策和本機工具，但該執行器本身的步驟提示和已解決的連接。第一個成功回應原樣返回，包括SSE流；成功啟動流後出現的失敗無法在此重試。如果所有執行器都失敗，則傳回最後一個失敗的執行器。客戶端中止停止調度。

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

執行器可以在一個回應中發出多個獨立的呼叫。相關呼叫在稍後的客戶端工具結果輪流中進行處理，規劃人員會審查每個結果。 `maxToolRounds`預設為`8` ，接受`1`–`32`；一旦達成，規劃者必須給出最佳的最終答案。內部規劃器決策被緩衝，而選定的面向客戶的回應保留原始的流首選項。

### `round-robin` 黏著批次與帳戶展開

Round-robin 採批次方式，而非每個請求輪替一次：

- `stickyRoundRobinLimit`（依序採用組合設定、`comboStickyRoundRobinLimit`、`settings.stickyRoundRobinLimit`，預設為 **3**）會讓同一目標在連續成功指定次數後才輪替。若要每個請求輪替一次，請將組合覆寫值設為 `1`。組合編輯器會顯示實際生效值及其來源層級。
- `connectionAwareExpansion`（依序採用組合設定、設定，預設為 **false**）會在輪替前，將每個提供者層級的步驟展開成各帳戶目標。B 組策略（priority、weighted、round-robin、random、p2c、least-used、cost-optimized、lkgp、fill-first、strict-random、context-optimized、cache-optimized、context-relay、fusion、pipeline）在啟用此功能前會維持提供者層級的檢視。組合編輯器提供繼承／開啟／關閉選項；繼承會使用全域預設值（關閉）。
- 提示詞快取區域性路由（`promptCacheAffinityEnabled`，預設為 **true**）會重新排序已固定的連線，讓相符的快取鍵持續使用同一帳戶。其優先順序高於跨固定帳戶步驟的 round-robin 與 weighted 輪替。若需要嚴格輪替，請前往「Settings → Combo defaults」將其關閉。此設定無法針對個別組合覆寫。

若要在單一模型上進行多帳戶輪替，建議使用**一個動態帳戶步驟**（`connectionId` 留空、使用整個集區）並將黏著限制設為 `1`，而不是使用三個固定的 `connectionId`。固定步驟加上親和性機制會集中到同一帳戶，即使 RR 計數器持續遞增亦然。

## 融合策略

`fusion`是一種能夠做到這一點的策略**不是**選擇一個目標。它將提示扇出**每個面板模型並行**，然後是一個可設定的**法官模型**從所有小組答覆中綜合出一個最終答案。從上游`decolua/9router`移植（OpenRouter的Fusion設計）；在`open-sse/services/fusion.ts`中實施。

工作原理：

0. **工具軸承旁路**—攜帶非空`tools`數組且`tool_choice`未顯式`"none"`的請求完全跳過面板：它直接路由到單一模型（配置的判斷或`panel[0]`），並且`tools`/`tool_choice`未經修改地通過。小組成員沒有工具存取權限，法官的綜合指令不鼓勵工具呼叫發射，因此agentic/tool-calling客戶端獲得真正的工具呼叫決策，而不是綜合散文（#6771）。
1. **扇出**（僅限非工具承載請求） —提示會立即發送到每個面板模型，強制非流式傳輸並剝離工具（法官需要完整的散文來合成）。
2. **法定人數恩典集合**一旦`minPanel`答案到達， —就會為掉隊者啟動一個短暫的寬限計時器，然後將收集到的任何內容進行整合。這限制了最慢模型對掛起時間的懲罰，並受到硬超時的限制。
3. **判斷綜合**—小組的答案是匿名的（`Source 1`， `Source 2`，... —因此法官權衡實質內容，而不是模型品牌）並交給法官，法官分析共識/矛盾/部分覆蓋/獨特見解/盲點，然後寫入**一**權威答案。判斷呼叫保留客戶端原來的`stream`標誌+工具，因此串流和下游工具使用仍然有效。
4. **優雅降級**— 0 小組回答→ `503`；恰好 1 個倖存者→直接返回答案（無需熔斷）；單型號面板直接回答。

小組成員也可以是引用另一個組合— `combo-ref`步驟 (`{kind: "combo-ref", comboName: "..."}`)，其解析為**一個黑盒子麵板聲音**（完全遞歸調度到引用的組合中，而不是該組合自己的目標的扇出），具有與每個其他組合引用消耗策略已經使用的相同的depth/cycle保護（#6764）。

### 設定

在組合的 `config` blob 上設定（無須進行結構描述移轉 — 它會重複使用現有的
`combos` 資料表）：

| 欄位                                     | 類型     | 預設值         | 用途                                                        |
| :--------------------------------------- | :------- | :------------- | :---------------------------------------------------------- |
| `config.judgeModel`                      | `string` | 第一個面板模型 | 綜合最終答案的模型                                          |
| `config.fusionTuning.minPanel`           | `number` | `2`            | 啟動寬限計時器前所需的成功答案數（限制於 `[2, panelSize]`） |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`         | 達到法定數量後，等待落後模型的時間                          |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`        | 絕對上限，避免單一無回應模型阻塞整個請求                    |

預設值位於 `FUSION_DEFAULTS`（`open-sse/services/fusion.ts`）。

### 範例

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

接著像呼叫任何其他組合一樣呼叫它：`{"model":"fusion-panel","messages":[...]}`。

## 虛擬 Auto-Combo 工廠

Auto Combo 引擎不需要預先定義的組合。相反地，`open-sse/services/autoCombo/virtualFactory.ts` 會即時建立候選項目：

1. 取得 `getProviderConnections({ isActive: true })`（所有已啟用的連線）
2. 篩選出具有有效憑證的連線（API 金鑰或透過 `hasUsableOAuthToken()` 判定為未過期的 OAuth 權杖）
3. 與 `getProviderRegistry()` 交叉比對模型可用性與定價
4. 針對每個 `(provider, model, connection)` 元組建立一個 `VirtualAutoComboCandidate`
5. 選擇 `connection.defaultModel`（或登錄檔中的第一個模型）作為分派目標
6. 使用 16 因子的 `scorePool()` 與變體的權重套件，為每個候選項目評分
7. 傳回產生於記憶體中的 `AutoComboConfig` 給 `handleComboChat()` — 絕不持久化至資料庫

這表示**新增一個已啟用 `auto/*` 的提供者，會自動擴充候選集區** — 不需要手動編輯組合。虛擬組合會針對每個請求重新建立，因此新加入或恢復健康狀態的連線都能立即被採用。

## 自我修復

- **暫時排除**：分數 < 0.2 → 排除 5 分鐘（漸進式退避，最長 30 分鐘）
- **斷路器感知**：OPEN → 自動排除；HALF_OPEN → 探測請求
- **事故模式**：>50% 為 OPEN → 停用探索，最大化穩定性
- **冷卻恢復**：排除期結束後，第一個請求會是縮短逾時時間的「探測」請求

## Bandit 探索

5% 的請求（可設定）會隨機路由至提供者進行探索。在事故模式下停用。

## API

**沒有專用的 `POST /api/combos/auto` 端點**——Auto-Combo 可透過兩種方式使用：

1. **零設定（建議）：** 傳送任何聊天補全請求，並使用 `model: "auto"` 或 `model: "auto/<variant>"`。虛擬工廠會為每個請求建構組合——無須持久化，也無須進行 API 呼叫。

2. **使用 `strategy: "auto"` 的持久化組合：** 透過 `POST /api/combos` 建立一般組合，並設定 `strategy: "auto"`，以及 `config.auto.weights` / `config.auto.candidatePool`。系統會使用相同的評分引擎；該組合會儲存在 `combos` 中，並可透過 ID 重複使用。

若要探索可用項目，`GET /api/combos/auto` 會列出每個變體及其解析後的候選集，另包含 `context_length` / `max_output_tokens`——即候選集中各個視窗的最大值。用戶端（例如 opencode 外掛程式）必須宣告這些值，而非 `0`：內容長度為零會完全停用 opencode 的自動壓縮，導致工作階段持續增長，直到閘道的歷史記錄清除機制破壞上下文。宣告最大值是安全的，因為 Auto-Combo 的上下文預先篩選器會將超大請求路由至具有大型視窗的候選項目。

```bash
# 零設定用法（不建立組合）
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 透過一般 combos 端點建立持久化的自動組合
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### 自動路由器策略

持久化的 `strategy: "auto"` 組合可將 `config.routerStrategy`（或舊版
`config.auto.routerStrategy`）設定為下列其中一項：

- `rules`——預設的加權評分
- `score`——選取已設定加權分數最高的項目。分數完全相同時，會保留設定的
  候選項目順序；現有的 `explorationRate` 會從完整的已排序候選集中取樣。
- `cost` / `eco`——最便宜的健康提供者
- `latency` / `fast`——具有可靠性懲罰的最低 p95 延遲
- `sla-aware` / `sla`——優先選取符合 p95 延遲、錯誤率及選用
  成本 SLO 的候選項目
- `lkgp`——優先使用最後一個已知良好的提供者
- `nadir`——詢問 [Nadir](https://getnadir.com) 的決策 API，判斷提示需要候選集中的哪個模型；需主動啟用，失敗時開放回退至 `rules`

### 路由器策略詳解

Auto-Combo 引擎提供 7 種可插拔的 **RouterStrategy** 實作，
您可透過 `config.routerStrategy`（或舊版 `config.auto.routerStrategy`）進行切換。
每個策略會根據 `RoutingContext`
（任務類型、工具／視覺提示、Token 估算值、選用的 SLA 政策、選用的
最後已知良好提供者），從候選集中挑選一個提供者。

#### 1. `rules`（預設）——16 項因素加權評分

封裝現有的評分引擎。先篩除斷路器狀態為 `OPEN` 的
候選項目，接著使用目前的任務類型及 `getTaskFitness()` 執行 `scorePool()`，
並選取分數最高的提供者。

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**適用情境**：預設選項。適合希望在所有訊號之間取得均衡取捨時使用。

**別名**：`rules`（無別名）

---

#### 2. `cost` / `eco`——最便宜的健康提供者

依 `costPer1MTokens`（遞增）排序候選集，並選取最便宜的提供者。
會先篩除狀態為 `OPEN` 的候選項目。

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**適用情境**：成本敏感型工作負載、批次處理或背景作業。

**別名**：`cost`、`eco`

---

#### 3. `latency` / `fast`——具有可靠性懲罰的最低 p95 延遲

依 `p95LatencyMs + (errorRate * 1000)` 排序。錯誤率懲罰可確保
不可靠的提供者即使名義延遲較低，排名仍會較後。

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**適用情境**：對延遲敏感的工作負載，例如即時聊天、自動完成或
互動式程式設計助理。

**別名**：`latency`、`fast`

---

#### 4. `sla-aware` / `sla`——延遲／錯誤／成本 SLO 合規性

根據每個候選項目符合所設定 SLO 政策的程度進行評分：

| 因素         | 權重 | 公式                                              |
| ------------ | ---- | ------------------------------------------------- |
| 延遲分數     | 35%  | `threshold / max(value, ε)`                       |
| 錯誤分數     | 35%  | `threshold / max(value, ε)`                       |
| 健康狀態分數 | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| 成本分數     | 10%  | `threshold / max(value, ε)` 或反向正規化          |
| 穩定性分數   | 5%   | 反向正規化的延遲標準差                            |

當 `hardConstraints: true` 時，候選項目會先依照**違規分數**
（超出任何 SLO 的程度）排序，再依綜合分數排序。否則只會依照
綜合分數排序。

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... 根據原則對每個候選項目評分：{ targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA 欄位**（在組合設定中設定）：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**適用時機**：具有嚴格延遲、錯誤率或成本預算的正式環境工作負載。

**別名**：`sla-aware`、`sla`

---

#### 5. `lkgp` — 優先使用最後一個已知良好的提供者

會先嘗試**最後一個已知良好的提供者**（若已設定），接著退回使用
`rules` 策略。這適合用於工作階段黏著性——由同一個提供者處理
對話中的後續請求。

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // 退回使用 rules 策略
    return getStrategy("rules").select(pool, context);
  }
}
```

**適用時機**：當您希望由同一個提供者處理多輪對話中的
後續請求時（例如為了快取、上下文連貫性或定價一致性）。

**別名**：`lkgp`（無其他別名）

---

#### 6. `nadir` — 透過 Nadir 依提示選擇模型

上述每種策略都會依據各自的遙測資料對候選項目進行排名；它們都不會讀取
請求。`nadir` 會將最後一輪使用者訊息以及集區中的模型 ID 傳送至
[Nadir](https://getnadir.com) 的決策 API（`POST /v1/bucket`），並路由至 Nadir
從該選單中選出的模型（`simple` → 能勝任的最便宜模型，`complex` →
前沿模型）。提供該模型的連線仍由 `rules` 選擇，因此配額、
健康狀態與成本仍會決定使用哪個帳號。

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` 與 `OMNIROUTE_NADIR_BASE_URL` 是這兩個
字串的備用環境變數。只有自行託管 Nadir 時才需要 `baseUrl`（可接受尾端帶有 `/v1`）。
無金鑰的呼叫會使用 Nadir 的匿名方案，該方案會依每個 IP 限制速率。使用金鑰時
（[建立一個](https://app.getnadir.com/dashboard/api-keys)），每次決策都會
記錄到您的 Nadir 儀表板。完整的設定與驗證說明：
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/)。

傳送至外部的內容包括：最後一則使用者訊息的文字（前 16k 個字元）、候選
模型 ID，以及 `source: "omniroute"` 通道標籤。不會傳送系統提示、歷史記錄、工具或
標頭。

失敗行為採用開放式失效：逾時（預設為 2000 ms）、非 2xx 回應、主機無法連線、
格式錯誤的回應，或選取結果不在集區內時，都會採用 `rules`
決策，且原因前面會加上 `NadirStrategy: fallback (…)`。呼叫失敗後，
該策略會略過網路請求 30 秒，因此服務中斷時每 30 秒只會產生一次逾時，而非
每個請求都發生一次。只有當 Nadir 確實做出選擇時，路由事件才會回報 `strategy: "nadir"`。

**適用時機**：流量中的任務難度不一，且集區橫跨多個模型層級（小型、中型
與前沿模型），而您希望降低一律使用前沿模型所產生的成本。

**別名**：`nadir`（無其他別名）

---

### 自訂路由器策略

您可以透過公開 API 註冊自己的 `RouterStrategy` 實作：

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // 在此加入您的路由邏輯
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

接著使用它：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### 路由器策略選擇指南

| 使用情境     | 策略        | 原因                             |
| ------------ | ----------- | -------------------------------- |
| 均衡工作負載 | `rules`     | 預設值 — 會考量所有因素          |
| 最小化成本   | `cost`      | 一律選擇最便宜的提供者           |
| 最小化延遲   | `latency`   | 選擇速度最快且可靠的提供者       |
| 嚴格的 SLO   | `sla-aware` | 依 p95／錯誤率／成本閾值進行篩選 |
| 多輪對話     | `lkgp`      | 工作階段黏著性                   |
| 混合難度     | `nadir`     | 依每個提示選擇模型層級           |

SLA 感知欄位：

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## 任務適用性

針對 6 種任務類型（`coding`、`review`、`planning`、`analysis`、`debugging`、`documentation`）為 30 多個模型評分。支援萬用字元模式（例如，`*-coder` → 高程式設計分數）。

## Auto 變體摘要

包括不帶變體的 `auto`（預設值），以及在 `autoPrefix.ts` 中宣告的 6 個 `AutoVariant` 值，共有 **7 個可呼叫的模型 ID**：

`auto`、`auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp`

（`AutoVariant` 本身列舉了 6 個值；第 7 個選項是「無變體」——即不帶變體的 `auto`——由 `parseAutoPrefix()` 以 `variant: undefined` 處理。）

## 層級如何融入 Auto-Combo

這個 16 因子評分函式（`open-sse/services/autoCombo/scoring.ts`）將層級歸屬視為兩個訊號：`tierPriority`（0.0476）與 `tierAffinity`（0.0476）。如需完整的 `DEFAULT_WEIGHTS` 設定，請參閱上方的標準[評分因子表](#how-it-works-persisted-auto-combos)；各套件的覆寫設定（ship-fast/cost-saver/quality-first/offline-friendly）則列於「各套件的權重設定檔」表格中。

僅憑層級**不會**強制優先選擇第 1 層級——如果第 1 層級的延遲表現不佳，或成本與品質的取捨並非最佳，第 2 層級就會勝出。若要強制遵循層級順序，請使用組合策略 `priority`，並依層級排列提供者。

若要大幅偏好第 1 層級（訂閱制），請提高 `tierPriority` 的權重：

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

如需層級定義與提供者分類，請參閱 [`docs/guides/TIERS.md`](../guides/TIERS.md)。

## 測試與涵蓋範圍

### 確定性路由決策矩陣（`npm run test:combo:matrix`）

`tests/integration/combo-matrix/*.test.ts` 透過真實的組合管線搭配模擬的上游，端對端驗證全部 19 種公開策略的路由**決策**。涵蓋範圍包括：

- 全部 19 種 `ROUTING_STRATEGY_VALUES` 策略（ordered、weighted、cost、context、fusion，……）。
- `quota-share`（內部）端對端：透過真實的 `selectQuotaShareTarget` 接縫（`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`），驗證 DRR 公平性與飽和度降優先處理。
- 涵蓋所有目標數量的 `context-relay` 通用交接。

此測試套件會在 CI（`test:integration` 作業）中使用 `--test-concurrency=1` 和 `--test-force-exit` 執行，因此結果具確定性，且不需要即時憑證。

### 閘控式即時冒煙測試（不在 CI 中——使用真實提供者）

| 命令                                   | 功能                                                                     |
| :------------------------------------- | :----------------------------------------------------------------------- |
| `npm run test:combo:live`              | 使用 `RUN_COMBO_LIVE=1` 進行程序內真實路由；擷取即時 OmniRoute DB 的快照 |
| `npm run test:combo:live:vps`          | 對即時 OmniRoute 伺服器發出 HTTP 呼叫（設定 `COMBO_LIVE_BASE_URL`）      |
| `npm run test:combo:live:vps:failover` | 同上，但包含刻意設計的容錯移轉情境                                       |

這些冒煙測試會驗證真實的線路路徑（組合 → 提供者 → 完成）。由於需要即時憑證與 VPS 存取權限，因此刻意將其排除於 CI 之外。

---

## 檔案

| 檔案                                                      | 用途                                                                           |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 因子評分函式、`DEFAULT_WEIGHTS`、集區正規化                                 |
| `open-sse/services/autoCombo/taskFitness.ts`              | 模型 × 任務適配度查詢                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | 選擇邏輯、多臂吃角子機、預算上限                                               |
| `open-sse/services/autoCombo/selfHealing.ts`              | 排除、探測、事件模式                                                           |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 種權重設定檔（快速交付、節省成本、品質優先、離線友善、可靠性優先、混沌模式） |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` 前綴剖析器 + 6 種變體                                                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 從即時連線建立記憶體內的 `AutoComboConfig`                                     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 用於模擬提供者登錄檔的測試掛鉤                                                 |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES`（20 種策略）                                         |
| `src/sse/handlers/chat.ts`                                | 整合：auto-prefix 短路處理                                                     |
