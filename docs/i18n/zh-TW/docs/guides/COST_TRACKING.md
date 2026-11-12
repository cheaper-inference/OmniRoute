# Cost & Spend Tracking (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md)

---

OmniRoute 如何估算、記錄及回報每個請求的成本——以及為什麼儀表板上的數字是**節省追蹤器**，而不是帳單。

另請參閱：[使用者指南](./USER_GUIDE.md) · [功能展示](./FEATURES.md)

---

## 它是什麼（以及不是什麼）

OmniRoute 會將權杖數量乘以模型的定價費率，為每個補全請求計算以美元計價的單次請求成本。這些數字會用於**成本**儀表板、`omniroute cost` / `omniroute usage` CLI、CSV/JSON 匯出，以及各 API 金鑰的預算。

> **儀表板上的「成本」是節省追蹤器，而不是帳單。** OmniRoute 絕不會向你收費
> ——它會將你的請求路由至你已連接的提供者（你自己的訂閱、免費方案及 API
> 金鑰）。如果「總成本 $290」完全來自免費模型，這表示你大約**省下了原本可能要支付給付費 API 的 $290**。此數字是以標準牌價估算相同流量原本可能產生的費用，讓你能查看用量集中在哪裡，以及透過路由至較便宜／免費的提供者節省了多少費用。

此定位已直接載明於專案的 [README](../../README.md)（「儀表板上的『成本』是節省追蹤器，而不是帳單」）。

由於此數字是估算值：

- 它取決於 OmniRoute 為每個模型提供的定價表。沒有定價項目的模型會產生 `0` 成本（在瀏覽器中顯示為「舊版／免費」資料列）。
- 免費方案及訂閱流量仍會累計_估算_成本——這是你節省的金額，而不是應付金額。

---

## 如何估算成本

### 定價來源

成本來自[`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts)中的合併定價表，按優先順序排列（**最高的第一個**）：

1. **使用者覆蓋**—價格在儀表板中或透過`PATCH /api/pricing` （ `pricing`命名空間）設定。
2. **models.dev 同步**—定價從`https://models.dev/api.json` （ `models_dev_pricing`命名空間）取得。
3. **LiteLLM同步**—價格取自LiteLLM的公共`model_prices_and_context_window.json` （ `pricing_synced`命名空間）。
4. **硬編碼預設值**—費率以[`src/shared/constants/pricing/`](../../src/shared/constants/pricing/)出貨。

對於相同的provider/model，來自較高優先層的值會覆蓋較低層中的匹配欄位；上層缺少的欄位仍然可以來自下層。即使兩個獨立的同步作業同時運行，順序也是固定的。 `GET /api/pricing?includeSources=1`返回`pricing`和`sourceMap`，其每個模型標籤（`user`、 `modelsDev`、 `litellm`、 `default`）標識包含該模型的最高優先層。

**LiteLLM同步**是選擇加入，預設為停用。它的環境變數（參見[`.env.example`](../../.env.example) ）是：

| 環境變數                | 預設      | 目的                                           |
| ----------------------- | --------- | ---------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | 啟用後台LiteLLM定價同步。                      |
| `PRICING_SYNC_INTERVAL` | `86400`   | 同步間隔以秒為單位（每天）。                   |
| `PRICING_SYNC_SOURCES`  | `litellm` | 僅用於此同步的來源選擇；目前僅支援`litellm` 。 |

**models.dev 同步**與LiteLLM同步分開，預設也是停用的。在設定（models.dev 同步）中啟用它或使用這些變數：

| 環境變數                   | 預設         | 目的                                                                                              |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _（未設定）_ | 取消設定遵循設定切換； `1/true/on/yes`強制打開， `0/false/off/no`強制關閉（即使「設定」啟用它）。 |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`      | 預設 models.dev 同步間隔（以秒為單位）（每日）。                                                  |

`PRICING_SYNC_SOURCES`確實**不是**啟用 models.dev；它僅控制LiteLLM同步。刪除使用者覆蓋不會清除同步的命名空間；下一個可用的定價層將生效。對於未定價的型號，請在新增手動覆蓋之前檢查同步設定和`sourceMap` 。

### 成本公式

成本是根據[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`) 中的代幣計數和每百萬代幣費率計算每個請求的成本：

- **輸入令牌**（減去快取讀取和快取創建令牌） × `input`速率。
- **快取讀取令牌**× `cached`速率（回落到輸入速率）。
- **快取創建令牌**× `cache_creation`速率（回落到輸入速率）。
- **輸出代幣**× `output`率。
- **推理標記**× `reasoning`速率（回落到輸出速率）。

所有費率均解釋為每 1,000,000 個代幣的USD 。 Codex “快速”/“優先”或“靈活”服務層應用成本乘數 (`getCodexFastCostMultiplier`) — ，例如，靈活按 50% 代幣折扣計費，表現為**彈性儲蓄**在儀表板中。

首先將模型名稱標準化（去除`openai/`或`accounts/fireworks/models/`等提供者路徑前綴），以便歷史行仍與價格相符。

### 如何記錄支出

- 每個請求的成本是在請求完成時計算的。共享配額消耗透過[`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts)安排在下一個事件循環標記上。
- API 金鑰支出由[`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts)批次緩衝和刷新（預設 60 秒刷新間隔，1,000 個條目緩衝區）。可透過以下方式調整：

  | 環境變數                            | 預設    | 目的                       |
  | ----------------------------------- | ------- | -------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | 刷新間隔（以毫秒為單位）。 |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | 刷新前的最大緩衝條目。     |

成本更喜歡提供者報告的確切費用（`provider_cost_usd`），然後是目錄定價的請求快照（`calculated_cost_usd`），然後是當前目錄中的代幣重新定價。存儲的成本不會透過其代幣計數再次收取。當目錄價格發生變化時，舊的僅令牌行仍然會發生變化。

### OCR與嵌入

- 成功的`/v1/ocr`請求使用上游`usage_info.pages_processed`，而不是請求的頁面範圍或傳回的頁面物件的數量。估計是頁數× `ocr_cost_per_page` （絕對USD/page，**不是**USD/million）。
- 帶有文件或邊界框註釋的請求需要單獨的`ocr_cost_per_annotated_page`費率。如果沒有它，成本仍然未知；普通OCR資費並沒有悄悄被取代。
- LiteLLM同步將其上游`annotation_cost_per_page`欄位對應到`ocr_cost_per_annotated_page`，保留絕對USD/page值和僅註釋條目，包括顯式零。提供的規範欄位優先；無效的別名值將被忽略。用戶定價覆蓋保留其正常優先順序。請參閱[LiteLLM的OCR定價要點](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking)。
- OCR使用儲存頁數、單價、計算的USD成本、 API密鑰和選定的連接。頁面永遠不會表示為令牌。呼叫日誌包含計費元數據，而不是文件URLs、 PDF位元組或提取的文字。
- 成功的`/v1/embeddings`請求會記錄每個實體批次的一個使用行，包括在同一毫秒內完成的單獨批次。提供者報告的費用優先於代幣估算；組合包裝不增加費用。
- 使用歷史記錄、成本分析、 provider/account視窗、API 金鑰支出限制、請求成本分類帳和每日使用情況匯總包含這些費用。無日誌鍵保留數位記錄而不保留來源文字。
- 缺少使用量或資費的是**未知**，不是免費的：省略回應成本標頭，現有的無價使用策略適用於有限的API鑰。明確配置的零費率仍然有效的零成本使用。

這是僅向前會計。從未寫入使用歷史記錄的舊OCR/embedding呼叫無法從此遷移重建。目錄估算是USD估算，而不是發票，且不包括貨幣兌換、稅金或折扣。

### 語音和圖像

- 成功的`/v1/audio/transcriptions`、 `/v1/audio/speech`和影像產生嘗試共享數值計算。直接呼叫和組合呼叫攜帶呼叫者的API密鑰和所選連接；組合包裝絕不會增加第二次借記。
- 提供者報告的USD勝過目錄估算，包括明確的零收費。 OpenRouter的JSON `usage.cost`標準化為`cost_usd`。否則，測量的令牌使用令牌價格，轉錄秒數使用每秒價格，語音輸入使用 Unicode 字元計數，固定價格圖像使用實際返回的數字，而不是請求的`n`。
- 二進位OpenRouter TTS沒有JSON使用主體。音訊結束或呼叫者取消後， OmniRoute在上查詢其產生的ID**相同的**配置OpenRouter原點。 EU請求永遠不會回退到全域原點。這是一個有界的、只讀的查找；不會重試合成進行記帳。音訊結束後會出現計費記錄：尋找重試在背景運行最多約 52 秒，包括網路截止時間。
- 在該查找過程中，音訊回應具有`X-OmniRoute-Cost-Status: pending`並且沒有回應成本標頭。其最終費用出現在使用歷史記錄、分析和對帳後的關鍵帳本中。如果元資料不可用，則使用配置的費率快照；否則成本仍然未知。
- 秒、字元和圖像計數具有單獨的計費單位字段，絕不會偽造令牌計數。會計僅保留數位用法，而不保留語音文字、文字記錄或圖像位元組。現有的未定價圖像豁免保持不變：真正缺少的圖像資費不會新鎖定有限密鑰，並且回應會省略成本標頭而不是聲明呼叫免費。定價商店故障仍保留故障關閉執行的使用證據。

歷史上的speech/image費用沒有被發明或回填。提供者帳單仍然是發票和未報告費用的電話的參考。

---

## 儀表板：成本頁面

**成本**頁面位於 `/dashboard/costs`
（`src/app/(dashboard)/dashboard/costs/`）。
其主要檢視為**成本概覽**分頁
（`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`），
此分頁會從 `GET /api/usage/analytics` 載入所有資料。

顯示內容：

- **支出資訊方塊** — _今日（1d）_、_7d_、_30d_ 及所選時間範圍的預估支出。
  範圍選擇器：`7d`、`30d`、`90d`、`all`。
- **主要指標** — 時間範圍內的請求數、作用中的提供者、作用中的模型，以及每次請求的
  平均成本。
- **成本探索器** — 可排序及篩選的表格，依**提供者**、**模型**、
  **API 金鑰**、**帳戶**或**服務層級**分組，並顯示成本、請求數、權杖數、每次請求的
  平均成本，以及佔總額的百分比。
- **權杖用量** — 權杖總數／輸入／輸出，以及輸入與輸出比例。
- **路由效率** — 後援次數、後援率，以及所請求模型的涵蓋率。
- **每月預測** — 根據近期每日平均值預測月底支出。
- **期間比較** — 時間範圍前半段與後半段之間的百分比變化。
- **圖表** — 每日成本趨勢、提供者佔比（圓餅圖）、主要提供者、主要模型、各 API 金鑰的成本、
  各帳戶的成本、每週用量模式，以及活動熱度圖。
- **匯出** — 將目前時間範圍下載為 **CSV** 或 **JSON**（當成本資料非零時，
  按鈕才會出現）。

沒有已計價流量時，各列會顯示「舊版／免費」標籤，而不是 `$0`，
以反映節省追蹤器模型。

### 相關的成本子頁面

成本區域也包含下列頁面（皆位於 `/dashboard/costs/` 下）：

- **定價**（`/dashboard/costs/pricing`）— 檢視及覆寫每個模型的價格（呈現
  共用的定價分頁）。
- **預算**（`/dashboard/costs/budget`）— 設定各範圍的支出上限（呈現共用的
  預算分頁）。
- **配額共享**（`/dashboard/costs/quota-share`）— 共用配額集區及消耗率
  檢視。

---

## API 端點

除非另有註明，以下所有端點皆需要管理驗證（loopback/JWT，透過 `requireManagementAuth`）。

### 用量與成本分析

| 方法  | 端點                     | 用途                                                                                                                                                      |
| ----- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/usage/analytics`   | 完整的成本／用量分析：摘要、每日趨勢，以及依提供者／模型／API 金鑰／帳戶／層級分類的資料。查詢：`range`、`startDate`、`endDate`、`apiKeyIds`、`presets`。 |
| `GET` | `/api/usage/utilization` | 各提供者隨時間變化的配額使用率。查詢：`range`（`1h`/`24h`/`7d`/`30d`）、`provider`。                                                                      |
| `GET` | `/api/usage/history`     | 原始用量歷史記錄。                                                                                                                                        |
| `GET` | `/api/usage/call-logs`   | 各請求的呼叫記錄（模型、權杖、成本、延遲、狀態）。                                                                                                        |
| `GET` | `/api/usage/quota`       | 提供者配額狀態。                                                                                                                                          |
| `GET` | `/api/usage/proxy-logs`  | Proxy 請求記錄。                                                                                                                                          |

### 預算

| 方法   | 端點                     | 用途                                                            |
| ------ | ------------------------ | --------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | 單一 API 金鑰的成本摘要與預算檢查（需要 `apiKeyId` 查詢參數）。 |
| `POST` | `/api/usage/budget`      | 設定 API 金鑰的每日／每週／每月美元上限及警告閾值。             |
| `GET`  | `/api/usage/budget/bulk` | 跨 API 金鑰的批次預算摘要。                                     |

> 預算 API 的範圍是各個 **API 金鑰**（`apiKeyId`）。由
> `GET /api/usage/budget` 傳回的上限包括 `dailyLimitUsd`、`weeklyLimitUsd`、`monthlyLimitUsd`、
> `warningThreshold`，以及累計總額（`totalCostToday`、`totalCostMonth` 等）。

### 定價

| 方法     | 端點                    | 用途                                                                                                    |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | 合併四層價格（使用者、models.dev、LiteLLM、預設值）。`?includeSources=1` 傳回 `pricing` + `sourceMap`。 |
| `PATCH`  | `/api/pricing`          | 覆寫 `{ provider: { model: { input, output, cached, … } } }` 的定價。                                   |
| `DELETE` | `/api/pricing`          | 移除使用者價格覆寫值（可透過 `?provider=&model=` 限定範圍）；同步費率或內建預設值仍作為後備來源。       |
| `GET`    | `/api/pricing/defaults` | 顯示每 1M 的預設後援費率。                                                                              |
| `GET`    | `/api/pricing/models`   | 以模型為索引的定價。                                                                                    |
| `POST`   | `/api/pricing/sync`     | 觸發從外部來源（LiteLLM）進行手動同步。                                                                 |
| `GET`    | `/api/pricing/sync`     | 目前的同步狀態。                                                                                        |
| `DELETE` | `/api/pricing/sync`     | 僅清除 LiteLLM 同步價格（`pricing_synced`）；models.dev 資料獨立儲存。                                  |

### 其他與成本相關的端點

| 方法  | 端點                          | 用途                                               |
| ----- | ----------------------------- | -------------------------------------------------- |
| `GET` | `/api/free-tier/summary`      | 免費模型的權杖總量、本月已用量，以及剩餘免費額度。 |
| `GET` | `/api/quota/pools/[id]/usage` | 共用配額集區的使用量。                             |

---

## CLI

OmniRoute 的 CLI 提供成本、用量與定價命令（註冊於
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)）。

### `omniroute cost`

彙總自 `/api/usage/analytics` 的成本報告。

```bash
omniroute cost                          # 最近 30 天，依提供者分組
omniroute cost --period 7d              # 最近 7 天
omniroute cost --group-by model         # 依 provider | model | combo | api-key | day 分組
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

欄位：群組、請求數、輸入／輸出 token 數、成本（USD），以及占總計的百分比。最後會印出總計列
（使用 `--quiet` 或 `--output json` 時不顯示）。

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # 各提供者的成本摘要
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# 預算
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` 會讀取 `GET /api/pricing/defaults`。若要改為編輯個別模型的
> 價格，請使用儀表板的 **定價** 頁面或 `PATCH /api/pricing`。

---

## 疑難排解

- **所有成本都顯示為 $0／「舊版／免費」。** 使用中的模型沒有定價項目。
  啟用外部同步（`PRICING_SYNC_ENABLED=true`）並執行 `omniroute pricing sync`，或
  透過定價頁面／`PATCH /api/pricing` 手動設定價格。
- **歷史模型的定價不正確。** 修正價格（覆寫或重新同步）——每次讀取分析資料時，
  都會根據 token 數重新計算成本，因此估算值會溯及更新。
- **支出資料落後於即時狀況。** 各金鑰的支出會批次處理；如果需要更新的數字，請調低
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`。

---

如需瞭解此功能在整體儀表板中的位置，請參閱[使用者指南](./USER_GUIDE.md)與
[功能展示](./FEATURES.md)。
