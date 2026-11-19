# Compression Engines (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute 壓縮以引擎契約為核心。每種模式可以直接執行單一引擎
（`caveman` 或 `rtk`），也可以執行依序運作多個引擎的確定性堆疊管線。

## 模式

| 模式         | 引擎路徑                                                                              | 預期輸入                             |
| ------------ | ------------------------------------------------------------------------------------- | ------------------------------------ |
| `off`        | none                                                                                  | 精確的提示詞保留                     |
| `lite`       | Caveman lite helpers                                                                  | 低風險的常駐清理                     |
| `standard`   | Caveman                                                                               | 自然語言提示詞濃縮                   |
| `aggressive` | Caveman + history/tool summarizers                                                    | 長時間聊天會話                       |
| `ultra`      | Caveman + pruning helpers                                                             | 上下文限制恢復                       |
| `rtk`        | RTK                                                                                   | 終端機、shell、建置、測試和 Git 輸出 |
| `omniglyph`  | OmniGlyph                                                                             | 在原生提供者線路上的上下文作為圖像   |
| `stacked`    | Pipeline. The request default is `session-dedup -> lite`. `rtk -> caveman` is opt-in. | 混合工具日誌和散文，最大化節省       |

### OmniGlyph 壓縮設定檔

`omniglyph` 引擎（套件 `omniglyph`，1.4.0+）接受一個命名的語義設定檔，可以透過壓縮設定中的 `omniglyph.profile` 全域設定，或透過堆疊管線的步驟配置為每個步驟設定：

| 設定檔        | 邊界                                                            |
| ------------- | --------------------------------------------------------------- |
| `aggressive`  | 預設。已發布收據所衡量的策略 — 圖像系統、工具文件和密集歷史記錄 |
| `balanced`    | 保持即時狀態原生，保護最後 8 輪，折疊較舊的已關閉歷史記錄       |
| `coding-safe` | 保持權限、工具模式和即時工具輸出原生，保護最後 12 輪            |
| `passthrough` | 不轉換地路由；引擎被跳過                                        |

此設定檔是**上限，而非下限**：套件中的 `mergeCompressionProfileOptions` 拒絕讓呼叫者覆寫重新開啟設定檔已關閉的有損通道，因此在 `coding-safe` 下，每個步驟的 `preserveSystemPrompt: false` 無法重新啟用系統壓縮。

在此程式碼庫上測量：`coding-safe` 和 `balanced` 將 `minCompressChars` 提高到最大值，並保持系統、工具模式和工具結果原生，因此尚未累積歷史記錄的會話會在 `below_min_chars` 處停止，並且引擎不會進行任何轉換。這就是為什麼預設是 `aggressive` 而不是最安全的設定檔。

該套件從其環境配置中解析自己的模型範圍和設定檔。OmniRoute 從不委派決策：轉接器將模型閘門固定到套件最嚴格的範圍，因此主機環境設定只能縮小允許列表，而不能將其擴大超出 OmniRoute 測量的收據。

## 引擎登錄檔

登錄檔位於 `open-sse/services/compression/engines/registry.ts`。引擎公開一套共用契約：

- `id`：穩定的引擎 ID，例如 `caveman` 或 `rtk`
- `apply(text, config)`：堆疊管線使用的舊版執行路徑
- `compress(input, config)`：主要執行路徑，回傳文字與統計資料
- `getConfigSchema()`：回傳有效設定的類 JSON Schema 結構
- `validateConfig(config)`：回傳 `{ valid, errors[] }`

註冊使用 `registerCompressionEngine(engine)`（進階情況則使用 `registerEngine`），其會先呼叫 `assertValidEngine()` 和 `validateConfig(defaultConfig)`，然後才接受引擎。
使用 `unregisterCompressionEngine(id)` 可在執行階段移除引擎。

`strategySelector.ts` 會在壓縮執行前註冊內建引擎。如此一來，預覽、執行階段壓縮、堆疊模式、測試及未來的引擎皆可使用相同的執行路徑。

### MCP 描述壓縮（相關）

另一個獨立的登錄檔會在登錄檔層級壓縮 MCP 工具描述中繼資料——請參閱
`open-sse/mcp-server/descriptionCompressor.ts` 和 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)。它會重複使用
Caveman 規則，但作用於工具中繼資料，而非請求承載資料。

### 其他內建引擎

除了 Caveman、RTK 和 LLMLingua-2 之外，登錄檔還隨附數個專門的無損／
結構化引擎（由堆疊管線、playground 和測試使用）：

| 引擎          | ID              | 功能                                                                                                                |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve（H4）：以內容定址參照取代大型連續文字區塊，使重複／大型區塊僅傳送一次，之後均以參照表示。 |
| headroom      | `headroom`      | SmartCrusher（H3 + N5）：將同質 JSON 陣列承載資料無損地壓縮為欄式 `[N rows]` 格式。                                 |
| ionizer       | `ionizer`       | 對非常大型的同質區塊進行首／中／尾資料列取樣，並將省略的中間部分儲存為 CCR 內容定址參照。                           |
| session-dedup | `session-dedup` | 跨輪次的內容定址去重（靈感來自 TokenMizer）：省略同一工作階段先前輪次中已出現的文字。                               |

**CCR 擷取協定指示（#8033）：** 當 CCR 第一次在請求中取代 ≥1 個區塊時，
引擎會在前方加上一則具冪等性的 `system` 訊息（以
`[CCR protocol]` 哨兵標記開頭），向呼叫端說明標記 → 工具契約：何謂
`[CCR retrieve hash=<24hex> chars=N]` 標記、雜湊值必須逐字複製
（全部 24 個十六進位字元——誤抄雜湊值很可能是「找不到區塊」
問題的原因），以及 `[dedup:ref sha=...]` 標記意指「回頭查看歷史記錄」，而非「呼叫
工具」。只有當呼叫端宣告的 `tools[]` 證明它確實可存取
`omniroute_ccr_retrieve` 時，才會注入此提示（請參閱
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` 中的
`callerSupportsCcrRetrieve()`）——無法使用該工具的一般
OpenAI 相容呼叫端，絕不會收到要求呼叫其無法存取之工具的指示。
注入前會掃描訊息歷史記錄以尋找該哨兵標記，藉此確保冪等性，
因此多輪請求（會重播先前訊息）不會每輪都重複堆疊此提示。

## Caveman

Caveman 模式著重於一般散文的語意濃縮：

- 保留程式碼區塊、URL、JSON、路徑及結構化資料
- 移除贅詞、保留語氣、重複脈絡及冗長的連接措辭
- 支援位於 `open-sse/services/compression/rules/` 的語言感知檔案規則套件
- 仍可透過舊版的 `standard`、`aggressive` 及 `ultra` 模式使用

儀表板中的位置為 `Dashboard -> Context & Cache -> Caveman`。

Caveman 上游報告指出，其輸出 token 可減少 `~75%`，基準測試中的平均輸出節省量為 `65%`，
範圍介於 `22-87%`，另有一項輸入壓縮工具可節省 `~46%`。OmniRoute 在記錄堆疊式提示詞／上下文
節省量時，採用 Caveman 的輸入端數據；Caveman 輸出模式仍是獨立的回應行為功能。

## RTK

RTK 模式著重於命令及工具輸出：

- 偵測 `git status`、`git branch`、`git diff`、Vitest/Jest/Pytest、
  Cargo/Go 測試、TypeScript/Vite/Webpack 建置、ESLint、npm 稽核／安裝、Docker 日誌、
  shell `find`/`grep`、堆疊追蹤及一般日誌等輸出類別
- 套用來自 `open-sse/services/compression/engines/rtk/filters/` 的 49 個 JSON 篩選器
- 支援 RTK 風格的宣告式管線：移除 ANSI、取代、符合輸出時短路、
  移除／保留行、逐行截斷、開頭／結尾／最大行數截斷，以及空輸出時的備援
- 支援 `.rtk/filters.json` 中受信任閘門控管的專案篩選器，以及
  `DATA_DIR/rtk/filters.json` 中的全域篩選器
- 移除 ANSI 序列、進度雜訊、重複行及無用的樣板文字
- 保留可採取行動的失敗、警告、摘要、已變更檔案及結尾脈絡
- 可選擇保留經遮蔽的原始輸出，以便透過經驗證的管理路由進行復原／偵錯

儀表板中的位置為 `Dashboard -> Context & Cache -> RTK`。

自訂篩選器、信任、驗證及原始輸出復原的操作詳細資訊，請參閱
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md)。

RTK 上游報告指出，命令輸出壓縮可節省 `60-90%`。其 README 範例顯示，一段
30 分鐘的 Claude Code 工作階段可從 `~118,000` 個 token 降至 `~23,900`，即節省 `79.7%`。

## LLMLingua-2（語意修剪）

LLMLingua-2 模式使用小型 ONNX token 分類器，對散文執行**語意 token 修剪**，
以補充以規則為基礎的 Caveman 與 RTK 引擎：

- 僅壓縮非系統訊息中的散文；圍欄式程式碼區塊及其他受保留的結構絕不會被修改
- 在工作執行緒中執行 `@atjsh/llmlingua-2` 後端（透過 `@huggingface/transformers` 使用 ONNX），
  因此模型推論絕不會阻塞請求事件迴圈
- **可堆疊**（`stackPriority` 35）：在堆疊式管線中，它會於
  結構化引擎（CCR、工作階段去重、headroom、Caveman）之後、`ultra` 之前執行，因為
  語意修剪對已完成結構壓縮的文字最為有效，例如
  `rtk -> caveman -> llmlingua`
- **遇到任何錯誤皆採失敗開放策略**（缺少選用相依套件、工作執行緒衍生、模型載入、推論
  或逾時）→ 原始文字會原封不動地傳回，絕不傳回錯誤

引擎位置：`open-sse/services/compression/engines/llmlingua/`。儀表板中的位置
為 `Dashboard -> Context & Cache -> LLMLingua`。

### 模型

預設模型為 **TinyBERT**（`atjsh/llmlingua-2-js-tinybert-meetingbank`，約 57 MB，
速度快）。可透過引擎設定的 `model` 欄位使用準確度更高的 **BERT-base** 模型
（`Arcoldd/llmlingua4j-bert-base-onnx`，約 710 MB）。首次呼叫時，
`@huggingface/transformers` 會延遲從 HuggingFace Hub 將所選模型下載至
`${DATA_DIR}/models/llmlingua`（`modelStore.ts`）；也可透過 `modelPath` 設定覆寫，
改為指向本機副本（用於離線／實體隔離安裝）。

### 選用相依套件與隨選安裝

可修剪的 LLMLingua 執行階段 peer 堆疊為**選用項目**。有兩個套件在
`package.json` 中宣告為 `optionalDependencies`，且在正式環境建置時維持為**外部相依**
（`scripts/build/prepublish.ts` 不會將其綁定）：

| 套件                 | 版本（固定） | 備註                                     |
| -------------------- | ------------ | ---------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`      | 入口套件；將其他套件宣告為 peer 相依套件 |
| `js-tiktoken`        | `^1.0.20`    | Tokenizer                                |

`@huggingface/transformers` 固定為 `^4.2.0`（與本機嵌入路徑共用，
也會追蹤至獨立套件組合中）；`@atjsh/llmlingua-2@2.0.5` 對其採用
`"^3.5.2 || ^4.0.0"` 的 peer 相依版本範圍，因此 Transformers.js v3 與 v4 均受支援。自 2.0.4 起，
`@atjsh/llmlingua-2` 不再需要 `@tensorflow/tfjs`，因而從 SLM 堆疊中移除了占用空間最大的單一
元件（TensorFlow.js）。只有上述兩個套件屬於可修剪的 SLM peer 相依套件。除非省略選用
相依套件，否則標準的 `npm install`（開發環境）會自動安裝選用堆疊。

**隨選安裝的原因：**透過 npm 發布的套件、獨立套件組合及 Docker 映像檔
出貨時均**不包含**這些相依套件，以維持精簡。缺少這些套件時，工作執行緒的相依套件
閘門（`worker.ts` 中的 `@atjsh/llmlingua-2` 解析探測）會失敗，而引擎會
**以靜默方式採失敗開放策略**——選取 LLMLingua 將不會執行任何操作（文字原封不動地傳回，
且不會記錄錯誤）。若要在經修剪的環境中啟用它，請安裝選用堆疊：

```bash
# 固定為 package.json optionalDependencies 中宣告的版本
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

移除 `@tensorflow/tfjs`（2.0.4+）後，便消除了先前占主導地位、約 800 MB 的
元件；剩餘空間占用來自 transformers.js 與 onnxruntime-node 執行階段，
以及首次使用時下載的 TinyBERT 模型（約 57 MB，並非透過 npm 下載）。

各環境：

- **開發環境 / `npm install`** — 除非您傳入 `--omit=optional`
  （或 `--no-optional`），否則會自動安裝。無需採取任何動作。
- **全域 npm（`npm i -g omniroute`）/ 獨立安裝** — 在已安裝的套件目錄內執行上述安裝命令，或重新安裝且不要省略選用相依套件。
- **Docker** — 在衍生映像檔層中加入安裝命令；發布的映像檔依設計保持精簡。
- **VPS（PM2）** — 安裝至應用程式的 `node_modules`，然後重新啟動程序，讓 worker 重新探測閘門。
- **原始 Next 獨立版本（`npm run build` → `.build/next/standalone/server.js`）** — 獨立追蹤既不包含 worker，也不包含選用相依套件，因此引擎會悄然採取失敗開放策略。`scripts/build/colocate-standalone.mjs` 會重新套用兩者（worker esbuild + 將選用相依套件閉包納入獨立目錄樹）；每次建置後，它都會透過 `postbuild` npm 掛鉤自動執行。可重複執行，且在相依套件不存在時會柔性失敗。

**確認它已啟用：**選取 LLMLingua 後，實際的自然語言文字確實會縮短（引擎不再採取失敗開放策略），且第一次請求會觸發模型下載至
`${DATA_DIR}/models/llmlingua`。此閘門刻意只探測 `@atjsh/llmlingua-2` —
其他對等相依套件僅支援 ESM，即使存在，`require.resolve` 也會對它們擲回例外 — 因此，如果在 `import()` 時確實缺少任何對等相依套件，worker 仍會採取失敗開放策略。

## 堆疊式管線

堆疊模式會依序執行管線步驟。預設為：

```txt
rtk -> caveman
```

此模式適用於提示中結合命令輸出與人類或助理文字的程式設計代理工作階段。RTK 會先減少冗長的工具日誌，接著由 Caveman 壓縮其餘自然語言。

管線步驟可透過壓縮設定中的 `stackedPipeline` 或壓縮組合進行設定。

當兩個引擎都縮減同一個符合條件的承載內容時，節省效果會疊加：

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP 無障礙樹狀結構篩選器

MCP 無障礙樹狀結構智慧篩選器是一個執行後壓縮層，作用於 MCP **工具結果**，而非提示或上下文。它的目標是由 Playwright、computer-use 和 browser-automation MCP 伺服器等工具所傳回的冗長無障礙樹狀結構與瀏覽器快照承載內容。

### 功能

1. **雜訊移除** — 移除空白的通用／文字項目（`- generic:`、`- text: ""`）
2. **同層項目折疊** — 當連續結構重複的行數 ≥ `collapseThreshold`（預設為 30）時，將其折疊為最前面的 `collapseKeepHead`（預設為 10）行 + 數量摘要 + 最後面的 `collapseKeepTail`（預設為 5）行
3. **參照保留** — Playwright／computer-use 所需的 `[ref=eXX]` 錨點絕不會被修改
4. **硬性截斷** — 如果折疊後的文字仍超過 `maxTextChars`（預設為 50,000），則會截斷內容並附上導覽提示，讓代理能繼續工作

### 引擎位置

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() 進入點
  collapseRepeated.ts ← 同層項目折疊演算法
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### 設定

由全域設定中的 `compression.mcpAccessibility` 控制（遷移 056）。預設設定：

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

此篩選器只會套用至 `type` 為 `"text"` 且長度超過 `minLengthToProcess` 的工具結果承載內容。它不會影響提示壓縮或請求承載內容。

### 預期節省幅度

瀏覽器快照工具結果可節省 60–80%，具體取決於頁面複雜度。折疊演算法相對於行數的複雜度為 O(n)，增加的延遲可忽略不計。

### 此篩選器與上述壓縮引擎的比較

| 面向     | Caveman / RTK / 堆疊式 | MCP 無障礙篩選器                       |
| -------- | ---------------------- | -------------------------------------- |
| 目標     | 請求提示／上下文       | MCP 工具結果                           |
| 觸發方式 | 壓縮模式設定           | `compression.mcpAccessibility.enabled` |
| 範圍     | 所有 SSE 訊息          | 僅限工具結果                           |
| 參照錨點 | 不適用                 | 無條件保留                             |

---

## 壓縮組合

壓縮組合是可指派給路由組合的具名壓縮設定檔：

- `compression_combos`：儲存模式、管線、RTK 設定、語言設定及預設標記
- `compression_combo_assignments`：將壓縮組合對應至路由組合
- 執行階段整合會先解析已指派的壓縮組合，再處理一般組合覆寫
- 分析資料包含 `compression_combo_id` 和 `engine`

儀表板位置：`Dashboard -> Context & Cache -> Compression Combos`。

## 先決條件／操作員指南（CCR 與 session-dedup）

CCR（`ccr`）和 `session-dedup` 會取代或省略文字，並留下**標記**。本節是操作員參考資料，說明如何連接用戶端、讀取兩個標記，以及擷取或診斷被省略的內容。每個引擎的運作機制已在上文說明；本節則是「要如何執行」的層級。

### 傳輸與端點

提供 CCR 工具的 MCP 伺服器可以透過三種方式存取。預設基底 URL 是 `http://localhost:20128`（`OMNIROUTE_BASE_URL`）：

| 傳輸方式                        | URL／命令                               | 備註                                                                                                                       |
| ------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Streamable HTTP（用戶端，建議） | `http://localhost:20128/api/mcp/stream` | 目前 MCP 用戶端使用的端點。                                                                                                |
| 舊版 SSE 單例                   | `http://localhost:20128/api/mcp/sse`    | 較舊的單例傳輸方式。它會**關閉** streamable 工作階段；請對 `/api/mcp/stream` 使用 `streamable-http` 用戶端，而不是此端點。 |
| stdio                           | `omniroute --mcp`                       | 用於會產生此程序的 IDE MCP 設定。沒有 `--dev` 旗標；`omniroute --mcp` 是 stdio 進入點。                                    |

### 儲存層級（重新啟動後仍會保留的內容）

CCR 是**雙層**儲存區，而非僅儲存在記憶體中：

- **熱記憶體層** — 每個區塊上限為 2 MiB、每個主體上限為 16 MiB、全域上限為 64 MiB。項目的預設 TTL 為 24 小時（最長 7 天）。從記憶體進行完整 MCP 擷取的上限為 256 KiB；更大的內容仍可透過範圍／ grep 模式存取。
- **持久 SQLite 層**（`ccr_blocks`、`COMPRESSION_CCR_DURABLE_STORE`，預設開啟）— 支援記憶體層，因此區塊在 LRU 淘汰、重新啟動，或擷取要求落到另一個執行個體時仍能保留。資料列會保留區塊的 TTL，因此超過 TTL 的區塊會從兩個層級中一併消失。

三個防護機制會限制持久層的大小 — 在以下情況下，區塊只會保留在記憶體中：

1. 區塊超過 **512 KB**（`MAX_DURABLE_BLOCK_BYTES`）；
2. 執行環境是雲端執行環境（沒有本機磁碟）；
3. `COMPRESSION_CCR_DURABLE_STORE=false`。

因此，「區塊消失了」並不一定是重新啟動所造成的：只要持久化寫入成功，本機、非雲端執行環境中的小於 512 KB 區塊，就會透過持久層在重新啟動後保留，直到 TTL 到期為止。該寫入採盡力而為方式，且不在要求路徑上執行：當已有 1,000 個持久化寫入處於待處理狀態時，新的寫入會被捨棄；SQLite 寫入錯誤會被記錄（`[ccr] durable persist failed`）但不會重試；如果在延遲寫入執行前發生損毀，也會遺失該區塊。這類區塊會維持僅存在記憶體中的狀態，並在重新啟動後消失。請參閱[環境參考](../reference/ENVIRONMENT.md)以了解該變數。

### 兩個標記

| 標記                                  | 含義                                                                                               | 模型應採取的動作                                                                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `[CCR retrieve hash=<24hex> chars=N]` | 大型區塊已使用內容定址方式儲存。                                                                   | 使用**原封不動複製的 24 位十六進位雜湊**呼叫 `omniroute_ccr_retrieve`，以取回原始文字。                                              |
| `[dedup:ref sha=…]`                   | `session-dedup` 已省略同一工作階段較早回合中已傳送的文字。這是**刻意的回溯參照**，不是遺失或錯誤。 | **不要**呼叫任何工具，也**不要**嘗試「重建」該文字。文字的首次出現才是標準副本；目前回合永遠不會被重寫，而是在之後的回合中進行去重。 |

`[dedup:ref]` 回溯參照是刻意的通訊協定決策 — 不會進行傳送前重建。請將其視為「這段完全相同的文字稍早已在此工作階段中傳送過」。

### 用戶端先決條件

- **金鑰 (stdio)：** stdio 呼叫端不攜帶每個要求的身分，因此會使用 `OMNIROUTE_API_KEY`（設定於 MCP 伺服器的 `env` 中）進行驗證。若沒有此金鑰，呼叫端會是匿名的，需要主體的工具可能會降級。
- **`tools[]` 是注入的前置條件。** 只有當要求所宣告的 `tools[]` 證明用戶端確實能夠存取 `omniroute_ccr_retrieve` 時，才會注入 CCR 擷取協定指示 (#8033)。比對採用以分隔符號（`__`、`.`、`/`、`:`）界定的尾端區段比對——絕不採用單純的子字串比對——因此像 `mcp__gateway__omniroute_ccr_retrieve` 這類具命名空間的名稱仍會被計入。缺少或不相符的 `tools[]` 表示不會注入該指示，這是設計上的行為。
- **`codemode:false`（OpenCode 用戶端）。** OpenCode 預設使用 Code Mode，只會向模型宣告其原生工具，**不會**將 MCP 工具放入原生的 `tools[]` 清單。請在 MCP 伺服器項目上設定 `codemode: false`，讓 `omniroute_ccr_*` 工具被宣告。這是**用戶端**設定，不是 OmniRoute 設定。OpenCode 將工具命名為 `<server>_<tool>`，因此名為 `omniroute` 的伺服器會公開 `omniroute_omniroute_ccr_retrieve`；`_` 是比對的分隔符號之一，因此當要求攜帶 CCR 標記時，CCR 指示會以該名稱注入。
- **主體。** 儲存與擷取會依經過驗證的主體（每個 API 金鑰）隔離。每個金鑰只能看見自己的區塊。

### 每個工具的範圍

對於狹義範圍的 HTTP/SSE 呼叫端，範圍強制執行一律開啟。`omniroute_` CCR 工具需要：

| 工具                     | 範圍                |
| ------------------------ | ------------------- |
| `omniroute_ccr_store`    | `write:compression` |
| `omniroute_ccr_delete`   | `write:compression` |
| `omniroute_ccr_retrieve` | `read:compression`  |
| `omniroute_ccr_inspect`  | `read:compression`  |
| `omniroute_ccr_list`     | `read:compression`  |
| `omniroute_ccr_stats`    | `read:compression`  |

缺少範圍會傳回**MCP 工具錯誤結果**（`isError: true`，而不是 HTTP 403——`403 LOCAL_ONLY` 是獨立的迴路位址路由守衛驗證）：`Error: Insufficient MCP scopes for <tool>. Missing: <scope>.` 最小化的遠端金鑰可以持有 `mcp:connect`（授權 `/api/mcp/` 僅限本機的例外路徑），以及其所需的特定讀取/寫入範圍。

### 用戶端矩陣

| 用戶端            | 傳輸方式                                  | 使用的設定                                                                                                                                                                                                               | 是否宣告 `tools[]`？（→ 注入 CCR 指示）                                                                                                            |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code       | streamable-http                           | `claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream`                                                                                                                                        | 是——具備 MCP 能力；會注入。                                                                                                                        |
| Cursor / Cline    | `stdio` **或** `streamable-http`          | stdio：在 `env` 中設定 `OMNIROUTE_API_KEY` 的 `omniroute --mcp`；或指向 `http://localhost:20128/api/mcp/stream` 的遠端 MCP 項目（請參閱 [設定指南 → MCP 用戶端設定](../guides/SETUP_GUIDE.md#mcp-client-configuration)） | 是——宣告 `omniroute_ccr_*` 工具。                                                                                                                  |
| OpenCode          | streamable-http                           | `opencode mcp add omniroute --url http://localhost:20128/api/mcp/stream`，以及 `codemode: false`                                                                                                                         | 只有在 `codemode: false` 時才會宣告工具；接著會注入，名稱為 `omniroute_omniroute_ccr_retrieve`（請參閱 [用戶端前置條件](#client-prerequisites)）。 |
| OpenAI-compatible | OpenAI-compatible HTTP (chat completions) | 使用標準聊天完成用戶端連線至 OpenAI-compatible 端點                                                                                                                                                                      | **永遠不會**——純 OpenAI-compatible 呼叫端永遠不會被告知要呼叫該工具，也不會注入該指示。                                                            |

### 擷取限制與分頁

MCP 工具文字結果會在 `mcpAccessibility.maxTextChars` 附近截斷（預設為 `50000`）。區塊的 `full` 擷取上限為 256 KiB——**不存在無限制的完整擷取**。當區塊的 `chars=N` 很大時，請改用分頁，而不要提取整個區塊：

- 經驗法則：**`chars > 40000` → 使用 `mode`**，絕不要使用不帶參數的 full。
- `mode:"grep"`——逐行比對 regex `pattern`，最多 1,000 個相符行（`unique: true` 會移除重複項），最適合「找出我需要的那一行」。
- `mode:"lines"`——以 1 為索引的行範圍；需要同時提供 `start` 和 `end`。
- `mode:"head"` / `mode:"tail"`——前/後 `n` 行。
- `mode:"stats"`——提供行數、字元數與位元組數，不包含本文內容。

使用帶有 `start`/`end` 的 `mode:"lines"`，以分頁方式逐步讀取長區塊，而不要一次要求整個區塊。

### 工具命名

目前 retrieve 工具的名稱為 `omniroute_ccr_retrieve`（`omniroute_` 前綴是為了解決跨伺服器名稱衝突而採用的過時權宜方案）。更簡潔的有界後綴工具名稱，以及修正 MCP JSON 結果在字串中途遭截斷的問題，已列為上游後續工作；本頁僅記錄目前已發布的行為。

### 工作階段生命週期

Streamable-HTTP 工作階段在閒置後會逾時，伺服器也會清理這些工作階段；閒置時間視窗由 `OMNIROUTE_MCP_SESSION_IDLE_MS` 設定（預設為 5 分鐘；此處以名稱引用，而非硬式編碼值，因此即使其值變更，本頁內容也不會過時）。閒置後遭清理的工作階段會出現 HTTP 404，並顯示 `Unknown Mcp-Session-Id` — 解決方法是重新連線或重新啟動工作階段，**而不是**輪替金鑰、變更範圍或重新命名工具。

## API 介面

| 路由                                   | 用途                                         |
| -------------------------------------- | -------------------------------------------- |
| `/api/settings/compression`            | 全域壓縮設定（包含 `mcpAccessibility` 設定） |
| `/api/compression/preview`             | 預覽任何壓縮模式                             |
| `/api/compression/language-packs`      | 列出可用的 Caveman 語言套件                  |
| `/api/context/caveman/config`          | Caveman 設定別名                             |
| `/api/context/rtk/config`              | RTK 預設值及設定                             |
| `/api/context/rtk/filters`             | RTK 篩選器目錄                               |
| `/api/context/rtk/test`                | RTK 預覽／測試端點                           |
| `/api/context/rtk/raw-output/[id]`     | 經驗證且已遮蔽敏感資訊的原始輸出復原         |
| `/api/context/combos`                  | 壓縮組合 CRUD                                |
| `/api/context/combos/[id]/assignments` | 路由組合指派 CRUD                            |
| `/api/context/analytics`               | 壓縮分析別名                                 |

管理路由需要管理驗證或 API 金鑰原則檢查。

## MCP 工具

壓縮功能提供五個 MCP 工具：

| 工具                                | 範圍                | 用途                         |
| ----------------------------------- | ------------------- | ---------------------------- |
| `omniroute_compression_status`      | `read:compression`  | 設定、分析資料、快取統計資料 |
| `omniroute_compression_configure`   | `write:compression` | 更新全域設定                 |
| `omniroute_set_compression_engine`  | `write:compression` | 設定模式及選用的管線         |
| `omniroute_list_compression_combos` | `read:compression`  | 列出壓縮組合                 |
| `omniroute_compression_combo_stats` | `read:compression`  | 讀取組合／引擎分析資料       |

## 範圍與排除項目

**嵌入向量絕不會被壓縮。** `open-sse/handlers/embeddings.ts` 絕不會呼叫任何
壓縮引擎——請求／回應主體會原封不動地直接傳遞給執行器。
目前這是由結構所保證（嵌入向量與聊天補全使用彼此獨立的處理常式），而非
執行階段檢查，但這表示 #8034 中的向量失真疑慮在嵌入向量路徑中沒有暴露面。

**個別模型／端點排除篩選器（#8034）。** 對於聊天補全，操作人員可以指定
絕不可壓縮的模型 ID／`provider/model` 目標——若日後壓縮功能接入更接近嵌入向量的路徑，
這會是很有用的防護措施；一般而言，對任何要求提示詞逐位元組完全一致的模型
（確定性評估、對快取敏感的前綴等）也很有幫助。

- 設定欄位：全域壓縮設定中的 `exclusions?: string[]`
  （`GET`/`PUT /api/settings/compression`），透過現有的 `key_value` 壓縮
  命名空間（`src/lib/db/compression.ts`）持久化——不新增資料表。
- 儀表板分頁：**Dashboard → Compression → Exclusions**
  （`/dashboard/compression/exclusions`）。
- 模式語法：`*` 是唯一的萬用字元。模式中的所有其他正規表示式中繼字元都會在
  比對前逸出，因此 `gpt-5.6` 只會比對該字面字串，絕不會比對 `gpt-5x6`
  （可防範 ReDoS、長度有界，且無巢狀量詞）。模式會以不區分大小寫的方式，
  同時與裸模型 ID 及 `provider/model` 組合字串進行比對——`gpt-5-6`、
  `openai/gpt-5-6` 和 `openai/*` 全都有效，而僅使用 `*` 會排除所有模型。
- 比對：位於 `open-sse/services/compression/exclusions.ts` 中的
  `isCompressionExcluded()`／`normalizeCompressionExclusions()`。`chatCore.ts` 會在解析
  壓縮設定後立即檢查被排除的目標，且是在**任何引擎執行之前**；若比對成功，
  其處理方式與全域停用壓縮完全相同——可證明請求主體逐位元組完全一致。
  此次略過會透過 `writeCompressionSkip(..., "excluded")` 記錄，以便在分析資料中查看。
- 預設值（清單為空／不存在）：與 #8034 之前的行為相同——不排除任何項目。

## 已知限制

- **LLMLingua-2 (SLM) 需要位於同一位置的選用相依套件。** Worker 只有在正式環境建置中，當 `@atjsh/llmlingua-2` 及其對等相依套件共同置於 `dist/node_modules` 時才會執行（請參閱 `scripts/build/colocateOptionals.mjs`、#4286）。若缺少這些套件，引擎會採用開放式失敗處理（回傳原始文字）。Worker 的解析已不再依賴 `import.meta.url`（它在獨立套件組合中無法運作），而是以執行階段的 cwd / `argv[1]` 為基準。
- **Caveman 語言套件 `de` / `fr` / `ja` 並不完整。** 它們隨附 `context` +
  `filler` + `structural` 規則，但不含 `dedup` / `ultra` 套件，因此對這些語言而言，`ultra` 強度
  並不會比 `full` 更強（它們只會使用各自的規則，不會在未告知的情況下
  回退至英文的 `dedup`/`ultra` 規則，否則可能會破壞外語文字）。
  `en` / `es` / `id` / `pt-BR` 是完整的。歡迎為這些不完整的套件貢獻 `dedup.json` + `ultra.json`。
- **堆疊式遙測僅列出實際執行壓縮的引擎。** 在堆疊式管線中，若某個步驟的
  引擎已執行但節省率為 0%，則會回傳 `stats:null`，因此不會出現在
  `engineBreakdown` 中——這與該步驟被略過的情況無法區分。若要區分
  「已執行，0%」與「已略過」，則需要變更明細模型，目前已延後處理。

## 驗證

此區域的專注閘門如下：

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
