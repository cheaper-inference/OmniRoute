# Guardrails (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md)

---

> **真實來源:** `src/lib/guardrails/`
> **最後更新:** 2026-10-17 — v3.8.52(新增[涵蓋範圍與限制](#coverage-and-limits):
> 說明 hooks 觸及哪些路由與回應路徑、合併的停用標頭(#16412)、作為強制邊界的注入封鎖模式(#16413),以及在 post-call 之前哪些元件會看到回應)

Guardrails 在 OmniRoute 與上游提供者之間的邊界強制執行安全、政策與內容轉換。每個 guardrail 都能檢查(並選擇性地拒絕、轉換或註解)請求負載(`preCall`)與上游回應(`postCall`)。

本系統採用**失敗開放(fail-open)**設計:若某個 guardrail 在執行時拋出例外,註冊表會記錄該錯誤並繼續執行下一個 guardrail,而不是讓請求失敗。封鎖是一項明確的決定(`block: true`),絕非意外。唯一的例外是已中止的請求:當呼叫方的 `signal` 被中止時,拋出例外的 guardrail 會使 hook 執行被拒絕,而不是被略過。

這些 hooks **並不**會在每個路由或每個回應上執行。在將 guardrail 當作安全控制手段來依賴之前,請先閱讀[涵蓋範圍與限制](#coverage-and-limits)。

## 內建防護欄

登錄檔會在匯入時依優先順序自動載入六個防護欄
（請參閱 `registry.ts` → `registerDefaultGuardrails()`）：

| 優先順序 | 名稱                | 階段           | 檔案                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先順序數字越小，會**越先**執行。

### 視覺橋接器 (`visionBridge.ts`) — 模態橋接 PR-1

GLM 5.3 基礎模型與 `glm-5.3-{low,high,max}` 具有明確的
`supportsVision:false` 登錄檔／規格中繼資料。GLM 5.3 Flash 變體仍然是
原生支援視覺的模型。Claude Code 的 `/v1/messages` 路由會在
Claude 到 OpenAI 的轉換**之前**進入共用的 `handleChat` 呼叫前防護欄鏈；
巢狀 `Read` 工具結果中的影像必須在該轉換將其提升為 OpenAI
`image_url` 內容之前獲得描述或處理 (#17069)。

攔截以**非視覺模型**為目標且包含影像的請求，並在上游呼叫之前，
將整個請求重新路由至支援視覺的模型，或使用可設定的視覺模型產生文字描述，
以其取代影像部分。這可讓純文字提供者以透明方式處理多模態承載資料。

流程：

1. 若目標模型已支援視覺，則略過（除非該模型出現在
   強制橋接清單 `isVisionBridgeForcedModel` 中）。
2. 透過 `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) 擷取影像部分；該函式會委派給
   `open-sse/utils/mediaParts.ts` 中的**統一媒體偵測器**
   `detectMediaParts()`——這是與組合相容性篩選器共用的唯一事實來源。
   擷取作業僅允許 `replaceImageParts` 可拼接回去的形狀
   （擷取↔取代契約）：OpenAI `image_url`、Anthropic base64
   `source.type:"base64"`、Anthropic URL `source.type:"url"`，以及 Responses
   API `input_image`。巢狀位於 Claude Code
   `tool_result.content` 與 Responses 工具輸出中的相符影像也會在其原始路徑中
   被擷取並取代；僅含指示器的形狀屬於組合篩選器的處理材料，不會被擷取。
   若未找到任何影像，則略過。
3. 透過 `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) 解析執行階段設定：
   新的 `modalityBridge*` 設定鍵優先；舊版 `visionBridge*` 鍵仍作為
   **單一週期的備援**（回復窗口）。橋接器停用時，會在任何媒體遍歷之前略過。
4. 模式選擇器（`modalityBridgeVisionMode`，請參閱下表）決定要重新路由還是描述。
   重新路由會傳回僅替換 `model` 的 `modifiedPayload`，以及中繼資料
   `{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑：將影像數量限制為 `maxImages`、組合可感知任務的提示詞、
   查詢描述快取、**平行**呼叫視覺模型
   (`Promise.allSettled`)，並在原位置注入 `[Image N]: <description>`
   文字部分。描述失敗時會產生 `null`：對未知／支援視覺的目標會保留原始影像
   (#4012)，但對**已確認的純文字直接目標**或零視覺組合，則會為每個未描述的影像
   插入明確的 `(unavailable — no vision-capable provider connected)` 文字替代內容，
   包括部分失敗的影像與超出描述呼叫上限的影像 (#17069)。現有的全部失敗組合描述
   備援仍會保留 (#8430)。
6. 傳回 `modifiedPayload` + 中繼資料（`imagesProcessed`、`descriptions`、
   `processingTimeMs`、`visionModel`）。

#### 模式選擇器 (`modalityBridgeVisionMode`)

| 模式       | 預設值 | 行為                                                                                                                                                                                 |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | 舊版啟發式邏輯，不作變更 (#6640/#7204)：非組合／`auto/` 模型會重新路由至最佳視覺模型，除非原始模型已具有可用憑證（此時會進行描述）；組合目標一律進行描述。                           |
| `describe` |        | 一律描述——會完全略過重新路由區塊；一律由使用者選擇的模型回答。                                                                                                                       |
| `reroute`  |        | 強制重新路由：略過保留具憑證模型的防護條件。重新路由**目標**的憑證防護條件仍然適用——若不存在可用的視覺目標，橋接器會顯示明確錯誤並封鎖，而不會進行描述或將原始影像傳送給純文字目標。 |

強制模式會在自動啟發式邏輯執行**之前**短路；`auto` 行為
與 PR-1 前的防護欄在位元組層級完全相同。

#### API 金鑰範圍 (`visionBridgeKeyScope.ts`)

當呼叫端的 API 金鑰限制了 `allowedConnections`、配額池
(`allowedQuotas`) 或模型 (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) 時，橋接器只會
選取該金鑰可使用的重新路由與描述模型，以及該金鑰可使用的連線。描述呼叫
接著一律會經由帶有 `x-omniroute-self-loop-key-id` 標頭的 OmniRoute
自迴圈，因此接收端的聊天請求會再次強制套用該金鑰的連線與模型政策。
`enforceApiKeyPolicy()` 僅會在同時具有該標頭與自迴圈 bearer 時採用此標頭，
因此它只能縮小存取範圍，而無法擴大範圍；無法解析的 ID 也會遭到拒絕。

如果該金鑰不允許任何視覺模型，**已確認為純文字的目標**會在本機拒絕影像
請求，並回傳清楚的 HTTP 400，而不是將影像位元組轉送至無法處理的上游
(#17069)。對於視覺能力未知或原生支援視覺的目標，描述路徑會保留先前的
故障開放行為（meta `{ skipped: true, reason: "no_permitted_vision_model" }`）。
不帶金鑰的請求，以及不受這些限制的金鑰，其行為完全維持不變。

#### 具任務感知的描述提示 (`modalityBridgeVisionTaskAware`)

預設為 **true**。`composeVisionPrompt()` (`visionBridgeHelpers.ts`) 會將
**最後一則使用者訊息**的文字（截斷至 500 個字元）附加至基礎描述提示，
使描述聚焦於使用者實際提出的要求（codex-vision-proxy 模式），並要求視覺
模型轉錄可見文字。停用旗標時 — 或沒有使用者文字時 — 會原封不動地使用
基礎提示。

描述自迴圈本身的 OpenAI 相容請求（`visionBridgeHelpers.ts` 中的
`callVisionModelSingle()`）一律要求 `image_url.detail: "high"` —
無條件套用於每個呼叫端／提供者，不受任何用戶端訊號控制。低詳細度取樣會
降低 OCR 準確度，而這正是此提示要求的文字轉錄任務，因此無論原始輸入請求
使用何種詳細度，描述呼叫本身一律要求高詳細度。這只會影響內部描述請求主體；
不會改變 OmniRoute 如何在主要請求中轉送呼叫端自己的 `image_url.detail` —
該預設值會在 `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`)
中分開套用，而且僅適用於偵測到的 OpenCode 用戶端。描述自迴圈的 Anthropic
線格式分支沒有 `detail` 欄位，不受任一預設值影響。

#### 描述輸出上限 (`modalityBridgeVisionMaxChars`)

| 金鑰                           | 預設值 | 範圍             |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` 或 100–50000 |

`0`（預設值）表示**沒有上限** — `callVisionModel()` 傳回的描述會不經修改地
直接傳遞，保留現有行為。100–50000 範圍內的任何值，都會在重新插入為
`[Image N]: <description>` 之前，使用 `…` 後綴截斷描述
（`src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`）。
對於下游模型需要完整轉錄內容的高詳細度 OCR 任務，請提高此值；對於內容
冗長的視覺模型，請降低此值以限制權杖用量。儀表板欄位位於 Vision 分頁的
Advanced 面板（`ModalityBridgeVisionTab.tsx` 中的 `modality-bridge-max-chars`），
會將 1 到 99 之間的任何值向上限制為 100，但明確的 `0` 會保持不變 —
`0` 本身就是有效的 Zod 值（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`），
而不只是「未設定」的預設值。

#### 描述快取 (`modalityBridge/bridgeCache.ts`)

用於描述輸出的程序內 LRU + TTL 快取，供整個程序共用。
金鑰 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`，並使用
長度前綴框架（不會發生欄位邊界衝突）。模型元件是**已設定的**橋接模型，
而不是實際回答的模型 — `callVisionModel` 可能會在內部退回其他模型，而
按照每次嘗試建立金鑰會導致快取碎片化。失敗的描述永遠不會快取。設定如下：

| 金鑰                            | 預設值 | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠端影像正規化（自迴圈描述／base64 擷取）

當橋接器自行擷取**遠端**影像時 — Anthropic 描述自我呼叫，以及 claude 線格式
的 base64 轉換（`ensureBase64ImagesForClaudeWire`）都會透過
`visionBridgeHelpers.ts` 中的 `fetchRemoteImageAsDataUri()` 完成 — 產生的
資料 URI 會先經過 `normalizeDataUri()`
（`open-sse/utils/imageNormalize.ts`），再嵌入視覺模型請求。過大的影像會
縮小至**長邊 2048px**（與 OpenAI／Anthropic 已在伺服器端套用的縮放上限
一致），可減少上傳位元組數與延遲，同時不改變視覺模型所看到的內容。縮放
使用 `sharp`，並透過動態匯入載入：若其原生二進位檔在某個平台上載入失敗，
`normalizeDataUri()` **永不拋出例外** — 它會改為直接傳遞原始位元組，因此
描述／base64 轉換路徑始終能正常運作。非影像位元組（擷取結果未回傳可解碼
影像的情況）也會原封不動地傳遞。此正規化僅套用於橋接器為自身自我呼叫所
擷取的影像 — 絕不會套用於呼叫端原始的直接傳遞內容，符合選擇性套用的變更
原則（硬性規則 #20）。

#### 設定結構描述 + 遷移

新的 `modalityBridge*` 金鑰會在 `updateSettingsSchema`
（`src/shared/validation/settingsSchemas.ts`）中由 Zod 驗證：
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCache*` 三元組，以及 Audio Bridge 使用的
`modalityBridgeAudio*` 群組。遷移
`141_modality_bridge_settings.sql` 會將現有的舊版
`visionBridge*` 值複製到相符的新金鑰（具備冪等性，絕不覆寫
操作員已設定的 `modalityBridge*` 值）；舊版金鑰會在一個版本週期內繼續
作為讀取回退使用。

#### 透明度標頭 + 統計資料

描述轉換後的回應會攜帶
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
（由 `modalityBridge/bridgeStats.ts` 中的 `buildModalityBridgeHeader()` 建立，
並由 `src/sse/handlers/chatHelpers.ts` 中的 `withModalityBridgeHeader()` 加入）。
重新路由的請求不會有任何標頭 — 負載未經變更，而模型替換已經可在回應本文的
`model` 欄位中看見。

`GET /api/modality-bridge/stats`（管理權限驗證，與
`GET /api/settings` 相同層級）會回傳記憶體中的每種模態計數器
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`，涵蓋 `vision`、`audio` 和
`video`。`averageLatencyMs` 使用 `latencySamples`，而非所有嘗試次數，作為
分母；沒有計時資料的操作不會捏造零毫秒樣本。`bridged` 仍是成功轉換的
向後相容別名；失敗的嘗試不會增加此值。
計數器會依設計在程序重新啟動時重設
（這是遙測資料，而非會計資料）。

#### 儀表板設定

專用的儀表板頁面是
`/dashboard/settings/modality-bridge`。其可透過 URL 指定的 `Vision`、`Audio`
和 `Video` 分頁，在切換 `tab` 值時會保留查詢參數。
Vision 分頁提供啟用設定、模式、模型選擇（包括自動預設值）、依任務提示、
進階逾時／影像／描述長度／快取限制、執行階段計數器，以及受保護的範例請求。
Audio 分頁也已可用：提供啟用設定、僅限 STT 的模型選擇器（含 Auto）、
逾時／最長片段限制、音訊計數器，以及 `input_audio` 範例測試。
Video 分頁具備完整功能：會回報 FFmpeg/ffprobe 執行階段狀態 — 四種明確的
UI 狀態之一（探測正在進行或無法完成時為 `unknown`、在非迴路
儀表板主機上因用戶端略過探測時為 `restricted`、探測後確認缺少時為
`unavailable`，或顯示 FFmpeg/ffprobe 版本的 `available`）— 會保存
啟用／模型／影格／影片／逾時限制，將模型選擇器篩選為具備視覺能力的模型，
並提供影片計數器。

AI 設定下原有的 Vision Bridge 卡片是指向新頁面的相容性連結；
它不再擁有第二份表單。Media Providers 也會將 Image-to-Text 和
Speech-to-Text 工作流程連結至對應的 Modality Bridge 分頁，但不會移除現有的
Speech-to-Text playground。

**自我迴圈准入繞過：**當描述呼叫經由 OmniRoute 自身的
`/v1` 自我迴圈（非標準提供者模型）路由時，子請求會傳送
`x-omniroute-admission-bypass: internal`，並使用解析後的自我迴圈憑證進行
驗證 — 本機模式中的本地 `sk_omniroute` 哨兵值，或操作員設定的
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境金鑰（#1350），如此一來
`REQUIRE_API_KEY=true` 的部署仍可執行描述呼叫。只有那些完全相符的憑證才會
獲准使用此繞過機制，因此外部用戶端無法利用該標頭略過准入。

舊版預設值位於 `src/shared/constants/visionBridgeDefaults.ts`；
新的模式／依任務／快取預設值及設定解析器位於
`src/shared/constants/modalityBridgeDefaults.ts`。防護機制提供
`deps` 建構函式選項，因此測試可以注入虛假的 `getSettings` 和
`callVisionModel` 實作。

### Audio Bridge（`audioBridge.ts`）— Modality Bridge PR-3

會在含有音訊的聊天請求送達已知不接受音訊輸入的目標之前攔截這些請求。
它絕不會重新路由聊天請求：音訊部分會透過現有的 OpenAI 相容多部分端點進行
轉錄，而選定的聊天模型會繼續使用文字轉錄內容。

流程：

1. 透過 `getResolvedModelCapabilities()` 解析 `supportsAudio`。明確的
   provider-registry 中繼資料優先，其次是靜態模型中繼資料，最後是同步的
   `modalities_input`。已宣告的輸入清單若不包含 `audio`，則為 `false`；沒有任何
   capability 證據則維持 `null`。`false` 與 `null` 都會啟用保守橋接，而 `true`
   則略過橋接。
2. 解析 `modalityBridgeAudio*` 設定，並透過共用的 `detectMediaParts()`
   偵測器，從每則訊息擷取可拼接的頂層音訊部分。支援的線上格式包括 OpenAI
   `input_audio`、`audio_url`，以及 `source.media_type: "audio/*"`。巢狀音訊會被
   偵測以供路由使用，但不會透過拼接路徑移除。工作量受
   `modalityBridgeAudioMaxClips` 限制；後續部分維持不變。
3. 採用已設定的 `provider/model`，或讓 `selectAudioBridgeModel()` 依穩定的目錄順序
   遍歷 `AUDIO_TRANSCRIPTION_PROVIDERS`，並選取第一個具有可用啟用中 provider
   憑證的模型。
4. `callAudioTranscription()` 會將 base64／data URI 音訊轉換為多部分表單中的
   `file`，或透過具備 DNS 固定功能且僅允許公開來源的輸出防護機制，下載遠端的
   `audio_url`，並設有 25 MB 上限。接著，它會將檔案與選取的模型 POST 至本機
   `/v1/audio/transcriptions` 自迴圈端點，並使用 `resolveSelfLoopBearer()` 進行
   驗證。現有的轉錄路由會執行一般憑證查找、冷卻／速率限制處理，以及 provider
   分派。
5. 成功的呼叫會將其部分替換為 `[Audio N]: <transcript>`。呼叫會使用
   `Promise.allSettled` 執行：個別失敗時保留原始音訊部分（#4012 合約）。若所有
   呼叫都失敗，且已證實目標的 `supportsAudio === false`，則這些部分會變為
   `[Audio N]: (unavailable — no STT provider connected)`（#8430 合約）。對於未知
   目標（`null`），所有呼叫失敗時仍維持原狀。若已證實目標僅支援文字，但沒有可用的
   STT 憑證，則會收到相同的明確 stub，且不會發出網路呼叫。

成功的轉錄會使用程序範圍內的 Modality Bridge LRU／TTL 快取。索引鍵會結合音訊
參照、穩定的 `audio-transcription` 操作標籤，以及選取的 STT 模型；失敗結果永不
快取。音訊嘗試會更新共用的 `bridged`、`cacheHits`、`failures` 與 `lastUsedAt`
計數器。轉換後的回應會攜帶
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；未變更的
請求不會收到 Audio Bridge 區段。

執行階段設定由資料庫提供支援，並經由 Zod 驗證：

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

共用快取仍由 `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes` 與 `modalityBridgeCacheMaxEntries` 控制。

### 影片橋接（`videoBridge.ts`、`videoBridgePipeline.ts`）

在呼叫不具備已知原生影片支援能力的目標之前，攔截 Chat Completions
`messages` 與 Responses API `input` 中的頂層影片部分。支援的格式包括
`input_video`、`video_url`、`video_source`、HTTPS URL，以及
`data:video/*;base64,...` data URI。文字中的一般檔名不會被視為影片。

`VideoBridgeGuardrail.preCall`（`videoBridge.ts`）負責請求遍歷、能力／政策檢查、
每個請求的彙總，以及回應承載內容。每部影片的處理工作——取得資料、完整結果快取、
描述影格序列（其中會融合呼叫端宣告的音訊轉錄），以及每次嘗試的指標／中止／清理——
都封裝在 `videoBridgePipeline.ts` 的 `processVideoPart` 中，並由 `preCall` 的迴圈對
每個影片部分呼叫一次。該模組也定義明確的連接埠邊界：
`VideoMediaBrokerPort`（取得位元組並擷取取樣影格）、
`VideoAudioTranscriptionPort`（將呼叫端宣告的音訊轉錄與取樣字幕融合），以及
`VideoDrilldownPort`（舊版原始儲存區格式）。正式環境的 STT 與影格保留功能會透過
`createVideoSttAdapter` 與 `createVideoDrilldownAdapter` 組合在描述連接埠周圍；
後者使用共用的不透明控制代碼生命週期。

公開的 `/v1` 請求路徑絕不會匯入或呼叫子程序。遠端影片會在 50 MiB 上限下下載；
行內 base64 影片則採用每部影片解碼後 36 MiB 的保守上限，讓模型／訊息／框架封裝
能維持在 50 MiB 的公開 JSON 請求接納上限內。行內長度與解碼大小估算會在配置記憶體
之前檢查。初始遠端 URL 與每次重新導向都必須使用 HTTPS，並採用現有的僅允許公開
來源且具備 DNS 固定功能的輸出防護機制。接著，這些位元組會跨越精確的內部
`POST /api/modality-bridge/video/extract` broker 邊界。該路由同時具備
`LOCAL_ONLY` 與 `SPAWN_CAPABLE`，只接受每個程序驗證、受信任的 loopback 請求，
並且絕不接受 URL、檔案系統路徑、可執行檔或引數清單。API 本文大小管線與處理常式的
增量本文讀取器會各自獨立強制執行 50 MiB 的 broker 輸入上限。其有界佇列一次只執行
一項擷取工作，允許四個待處理工作，並將待處理輸入限制在 100 MiB。

在 broker 內，`ffprobe` 會讀取私有本機檔案；固定格式允許清單排除播放清單與資訊清單格式。對於允許的 MOV 系列容器，外部 MOV 資料參照預設仍為停用狀態，且固定命令不會選擇啟用它們。`ffprobe` 與 `ffmpeg` 都使用僅限 `file` 的通訊協定白名單、單一執行緒、固定的引數陣列、不使用 shell，且從 `PATH` 解析可執行檔。附加圖片封面串流不可作為可播放候選項目。所有可播放串流都必須符合限制，且在確定性地退回最低索引之前，會優先選擇明確的預設串流。影片限制為 600 秒、每個維度 8,192 像素，以及 33,554,432 個來源像素。FFmpeg 會取樣 1–16 個位於中點的 JPEG 畫格，將長邊縮小至最多 1,024 像素，且不會放大小於此尺寸的輸入，並且永遠不會接收 URL。取樣預設為 `uniform`。選用的 `scene_aware` 與實驗性的 `segment_aware` 政策會在已驗證的本機串流上額外執行一次固定的 FFmpeg 傳遞，選取受限的 `showinfo` 場景時間戳記，並在偵測器失敗、逾時、輸出格式錯誤或候選集合為空時，以確定性方式退回相同的均勻中點。區段感知模式會依照已驗證場景區間的比例配置中點取樣；區段感知的證據與退回行為詳述如下。硬性 16 畫格上限會在每個政策完成選取後套用。當場景感知要求只有一個畫格的預算時，會使用作用中的完整影片或焦點視窗的均勻中點，並回報 `policyEffective: uniform`：單一選取的場景畫格無法同時保留時間上的兩端。呼叫端可選擇提供有限的焦點視窗（`start`/`end` 秒）；邊界會限制在媒體時長內，反向或非有限的視窗會被拒絕，且所有取樣政策只會在正規化後的區間內執行。產生的視窗會包含在取樣中繼資料與不受信任的描述前綴中，讓下游模型能區分聚焦的摘錄與完整時間軸。

語意字幕焦點是獨立且明確的設定。預設的 `full` 分析模式會保留現有的畫格提示，且永遠不會將要求文字轉送給字幕模型。在 `focused` 模式中，橋接程式只會從相同 Chat 或 Responses 容器讀取最新一筆由使用者撰寫且非空的 `text`/`input_text`，將其正規化為 NFC、合併控制字元與空白，並限制為 500 個 Unicode 字碼點。空結果會退回精確的 `full` 提示。可使用的提示會以 JSON 序列化，放入專用的不受信任使用者內容區塊中，且只能優先處理可觀察的細節；它不能覆寫另一項獨立警告，即不得遵循媒體中可見或可聽見的指示。文字焦點永遠不會推斷 `start`/`end`，也不會變更時間取樣器。

#### FU-07 結構化區段證據

`segment_aware` 會在已驗證的本機影片串流上執行一次受限制的預分析傳遞。固定篩選器鏈會先將寬度縮放至最多 320 像素，偵測場景變更與凍結區間，然後以每秒 1 個畫格取樣模糊度、平均亮度，以及空間／時間資訊。此傳遞限制為 600 個結構取樣、單一 FFmpeg／篩選器執行緒、相同的僅限 `file` 通訊協定與容器允許清單、1 MiB 的程序輸出上限，以及在 broker 共用的中止／截止時間內最多 30 秒。它永遠不會接受要求中的命令、篩選器、路徑或 URL。

這些結構值是確定性的取樣證據，而不是語意影片理解。它們不會推斷主體、動作、字幕、語音或使用者意圖。場景與凍結邊界會形成區段；凍結涵蓋率、模糊度、曝光、空間細節與時間變化，只會影響現有 1–16 個畫格預算的配置。完全凍結的區段最多配置一個畫格，而非凍結區段則競爭剩餘預算。當邊界數量超過畫格數量時，會保留均勻的時間軸涵蓋範圍，以避免快速的早期剪接掩蓋較長的尾端區段。凍結邊界的 1 秒分析解析度內的場景邊界會合併。

缺少篩選器、證據格式錯誤／為空、偵測器錯誤，或受限制的預分析逾時，都會開放失效至精確的均勻中點政策。呼叫端中止或 broker 截止時間不會開放失效：它會終止進行中的子程序、防止後續畫格擷取，並在 `finally` 中移除私有暫存樹。

`scripts/perf/video-bridge-fu07-eval.ts` 會產生確定性的真實 FFmpeg 測試固定素材，用於評估去重後字幕呼叫的節省、密集動態的預算配置、模糊度／曝光／SI-TI 證據、具有長尾的快速剪接，以及漸淡造成的誤報。它會記錄預分析的實際耗時；若 `/usr/bin/time` 可用，也會記錄子程序 CPU 使用量與峰值 RSS。其品質檢查僅是結構判定器。由於此測試工具沒有獲授權的端點或凍結的評審，實際字幕模型品質仍為 `HOLD`。除非 `--caption-cost-per-call-usd` 提供明確的正數單次呼叫估算值，否則金錢節省也仍為 `HOLD`；此腳本絕不捏造任一結果。

每個影格上限為 4 MiB，所有原始影格合計上限為 23 MiB，序列化的代理回應上限為 32 MiB。私有暫存目錄會在 `finally` 中移除。OmniRoute 不會捆綁 FFmpeg，也不接受自訂可執行檔路徑。在產生字幕之前，橋接器會套用保守的視覺去重流程：每張 JPEG 會縮減為 16×16 的灰階緩衝區，且只會與保留的上一個影格進行比較。當要求的字幕預算超過一個影格時，擷取流程會提供最多為該預算兩倍、且不超過 16 個影格的候選池。要求的上限只會在去重後套用；當預算至少為兩個影格時，最終精簡期間會保留第一個與最後一個選取的候選項。版本化的
`grayscale-16x16-mean-cells-v2` 政策會使用平均亮度差異，以及正規化差異至少為 0.05 的縮圖儲存格比例，兩者取較大值。重複閾值為常數 0.04，選擇此值是為了可預測性，而非將其公開為執行階段設定。這項次要的高對比訊號能保留平均值比較可能隱藏的細微動態與可見文字變更。比較器或解碼器錯誤會採取開放失效策略，並保留涵蓋範圍。輸出中繼資料會區分已擷取的候選項、成功使用的影格，以及捨棄的視覺重複項。

明確標記的影片部分可以要求帶有時間戳記的聯絡表。橋接器會建立最多 4 欄、16 個影格的 JPEG 網格。每個 512 像素的儲存格都會將其來源時間戳記燒錄到高對比度的底部區域，同樣的時間戳記也會保留在文字中繼資料中，以供下游關聯與稽核使用。完整 JPEG 仍受限於 32 MiB。如果 `sharp` 無法解碼或組合網格，橋接器會退回使用個別 JPEG 影格；客戶端中止仍會透過聯絡表作業向上傳遞。

晉級證據刻意與合成組合微基準測試分開。`scripts/perf/video-bridge-contact-sheet-eval.ts` 定義了一個具結構描述版本的 A/B 測試工具，用於真實的 OpenAI 相容視覺模型。它會測量提供者回報的 token、端到端牆鐘延遲（包括聯絡表組合）、模型呼叫次數，以及由資訊清單定義的事實保留率。原始模型回應不會寫入報告；只會保留 SHA-256 摘要與相符的事實 ID。除非傳入 `--execute-real`，且已設定 `--model`、`OMNIROUTE_BASE_URL` 與 `OMNIROUTE_API_KEY`，否則此工具不會進行網路或付費模型呼叫。在沒有明確執行真實測試的情況下，其機器可讀判定仍為 `HOLD`；僅憑合成的承載資料／呼叫次數測量不足以作為晉級證據。

當呼叫端已擁有對齊文字時，可以在受支援的影片部分附加選用的 `transcript.cues` 陣列。每個 cue 都必須包含 `text`、位於探測持續時間內的有限 `start`／`end` 區間，以及列入白名單的 `source`（`client`、`embedded` 或 `audio-bridge`）；`confidence` 預設為 `1`，且必須維持在 `0` 到 `1` 之間。完全重複的 cue 會合併。OmniRoute 絕不會根據此中繼資料啟動轉錄：經驗證的 cue 會連同來源、信心度與區間複製到所述結果中，並與影格字幕一同以不受信任的觀察資料呈現。無效、超出範圍或缺少來源資訊的文字會被拒絕，而不會混入字幕串流。兩個請求主體的轉錄通道都會將提供的來源正規化為 `client`，包括自行宣稱的 `embedded` 或 `audio-bridge` 標籤。只有伺服器擁有的介面卡能透過僅限程式碼使用的 `trustedSource` 引數指派這些受信任標籤；請求 JSON 欄位無法傳入該引數。無論來源為何，轉錄文字仍屬不受信任的媒體衍生內容，絕不能用於決定授權。

進階呼叫端可以為同一部影片提供 `audioTranscript` 音軌；該音軌會被視為客戶端提供的文字，而不是伺服器轉錄的證明。融合介面會在同一個截止時間與中止訊號下執行視覺和音訊觀察，依共同時間軸排序、合併完全重複項，並在只有一側成功時回報部分結果。無效的 `audioTranscript` 會降級為部分結果——保留視覺描述，並由音訊分支記錄經清理的失敗代碼——而不是使整部影片失敗。每個分支的可用性、部分結果旗標，以及經清理的失敗代碼，都會保留在所述結果、護欄中繼資料（`audioFusionRuns`／`audioFusionPartials`／`audioFusionFailureCodes`）、結果快取中繼資料及橋接器融合計數器中。預設的 Video Bridge 路徑不會呼叫語音轉文字，也不會下載第二份媒體副本；在沒有明確音軌的情況下，它仍僅處理影片。

**逐字稿保留 (#12150 P1)。** 每當 Video Bridge（本身需選擇啟用）呈現逐字稿提示時，這項功能會自動套用 — 不存在個別的保留旗標。當要求呈現任何逐字稿提示（呼叫端宣告的 `transcript` 或融合後的 `audioTranscript`）時，防護機制會將其標記為 `videoBridgeObserved`，並產生影片描述的遮蔽影本 — 一份相同的呈現內容，其中每個提示的自由文字本文都會替換為 `[redacted-video-transcript]`；這是透過在組合字串之前替換結構化提示欄位來建立，而不是剖析扁平化文字，因此不會有任何提示內容 — 無論是惡意或一般內容，包括包含 `]` 的本文，例如 `[inaudible]`/`[music]` — 能夠存留。持久化的呼叫記錄要求本文會將每個衍生自影片的文字部分替換為該遮蔽影本，並依內容相等性進行比對；`fullText` 錨點會從完成的呼叫前防護機制承載重新讀取，因此即使後續鏈中的防護機制（優先順序為 10/95 的 PII 與認證資料遮罩器）就地改寫描述文字，或系統提示/交接/記憶體注入重塑訊息陣列，比對仍會成功。傳送至上游模型的本文不變。已觀察的要求也不會填入任何持久化 Memory（會跳過衍生自要求與回應的擷取），因此模型自身的回覆無法將逐字稿文字回響至 Memory。

**原始影片欄位 (#12430)。** 當橋接器已啟用，且原生影片支援未知或不存在時，已定義的 `transcript`/`audioTranscript` 欄位也會啟用 `videoBridgeObserved`，即使描述失敗或達到 `maxVideos` 限制之後亦然。`null` 與空字串都算入；缺少欄位與非影片中繼資料則不算入。保留的複本會遮蔽這些欄位或省略要求，並繞過快取/Memory。

在這些後援路徑上，有效的呼叫端提示會成為受支援的 `text`/`input_text` 部分，而不是非標準的提供者欄位。要求提供的兩條軌道仍是未受信任的 `client` 觀察，並明確警告影片未經描述，且時間戳未針對媒體進行驗證。現有的 256 個提示/64-KiB 總量與每個提示預算會跨兩條軌道共同套用；時間戳必須符合代理程式的 600 秒上限及任何提供的焦點視窗。無效軌道會被捨棄，不會作為任意文字轉送；除非超出其合併預算，否則仍可使用有效的同級軌道。Null/空欄位不會新增文字。此後援不會新增媒體擷取或轉錄。逐字稿擴充欄位會從後援影片承載及其 `video_url`/`source` 物件中移除。OpenAI 線路允許清單仍維持嚴格；未知的原生影片承載仍可使用，而已知的純文字目標則保留安全標記。結構化遮蔽影本會保護附加的逐字稿文字，同時原始的呼叫端擁有要求維持不變。支援原生功能的目標與停用的橋接器則保留現有的繞過行為。

其他保留的複本會使用相同的已觀察要求訊號。原始的防護機制前呼叫端要求快照、記憶體中的擱置要求，以及提早遭拒要求記錄，會在影片部分中以結構方式替換逐字稿欄位；由管線階段與內容交接合成的字串提示，則會在持久化要求本文的寫入端進行遮蔽。持久化的 `video_content_removed` 標記會使 `previous_response_id` 延續在無法安全處理時失敗，而不會重建刻意捨棄的文字。如果已觀察要求的每部分遮蔽影本在記錄前遺失，或多個影片影本中甚至只有一個在後續要求變更後無法比對，則會完全省略保留的要求本文，而不是保留部分遮蔽的逐字稿。

對於已觀察的要求，模型回應可能會引用逐字稿的任何部分，且不一定具有結構化提示邊界。因此，其持久化呼叫記錄 `responseBody` 會替換為省略標記；詳細的管線成品（可能包含上游/呼叫端本文與串流區塊）不會予以保留。語意、冪等性與推理重播快取會針對該要求繞過讀取與寫入。提供者要求與呼叫端可見回應維持不變。省略詳細成品時，早期的 keepalive 位元組會從暫存緩衝區排出。Kiro 的格式錯誤 EventStream 警告只會回報承載位元組計數，絕不回報其內容或 JSON 剖析器的原始錯誤。
這不表示每個無關的提供者/外掛程式診斷都已完成稽核；更廣泛的保留寫入端全面檢查記錄於 #11658。

內部的 `/api/modality-bridge/video/drilldown` 生命週期是獨立的、透過迴路返送/權杖驗證的快取基礎。每項操作也都需要標準化的不透明主體 ID。在啟用生產環境呼叫端之前，該呼叫端必須從已驗證的租戶推導此 ID，且絕不能轉送由用戶端選取的值。快取索引會將該主體繫結至標準化工作階段與影片參照 ID，只儲存其衍生自 SHA-256 的索引，並將讀取與刪除的範圍限定於相同主體。快取每個項目最多儲存 16 個衍生 JPEG 畫格，十分鐘後使其過期，並支援有界限的 `start`/`end` 讀取或明確的工作階段刪除。

每個主體最多可有 16 個項目與 64 MiB 的標準化 JPEG 資料。這些限制與全域 64 個項目/256 MiB 上限彼此獨立：主體配額壓力只會在考慮全域 LRU 驅逐之前，驅逐該主體最近最少使用的項目。快取活動期間，過期項目會從主體與全域記帳中一併清除；取消與驗證失敗不會提交部分替換。

快取會拒絕非規範的 Base64、過多的填補字元、非 JPEG 媒體、格式錯誤或遭截斷的 JPEG，以及在有界完整影像 `sharp` 解碼期間產生警告的 JPEG。它會將每個接受的影像重新編碼為規範的 JPEG，從解碼後的位元組衍生寬度和高度，而不信任呼叫端欄位，並捨棄任何尾端的多型檔案位元組，而不予保留。只有有界的規範壓縮緩衝區會計入兩項配額。JSON 線路限制包含 Base64 額外負荷，以符合 32 MiB 解碼輸入上限。每個儲存的衍生結果都會記錄其已驗證的 JPEG 格式／解析度、取樣原則、衍生版本、建立時間、伺服器計算的內容雜湊、經雜湊處理的父項參照，以及受信任呼叫端的父項內容雜湊。在原子快取提交之前，會於非同步解碼／雜湊階段之間檢查取消狀態。

正式環境的產生器只會在視覺分析成功後重複使用已衍生的 broker 影格，不會再次下載／擷取影片。它要求操作員設定 `modalityBridgeVideoDrilldownEnabled=true`、每個部分都嚴格設定 `drilldown: true`，以及已驗證的 API 金鑰記錄 ID。用戶端宣告的主體／工作階段值永遠不會建立擁有權。若不具備這三項條件，它不會對額外影格進行雜湊、調整大小或保留。保留失敗不會影響可用的視覺回應。已取得同意的要求會略過整部影片結果快取，因此快取結果永遠不會重新播放控制代碼。

成功的 JSON 和 SSE 回應會在有界的 `x-omniroute-video-drilldown` 標頭中公開最多四個不透明控制代碼。已授權的瀏覽器來源可以讀取該標頭，而不會擴大 CORS 來源原則。新控制代碼使用 `v1.<32-byte random base64url token>`，而登錄表只會保留其 SHA-256 雜湊。讀取器／標頭剖析器也接受傳統的 64 位十六進位控制代碼。經驗證的公開取用端是
`GET /api/v1/video-bridge/drilldown?handle=...`，並由 `modalityBridgeVideoDrilldownRemoteEnabled=true` 獨立控管。即使啟用了傳統的 `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` 環境變數後備設定，明確持久化的 false 仍會撤銷取用權限。正式環境的保留功能也有對應的傳統 `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` 後備設定。兩項後備設定預設都為關閉。

取用端會從已驗證的金鑰衍生擁有權，並套用金鑰原則：GET 和 DELETE 都屬於 `video` 端點類別，包括 `/v1` 和 `/api/v1` 別名。具有非空端點允許清單的金鑰必須包含 `video`；不受限制的金鑰則維持相容性。對未知、已過期及屬於其他金鑰的控制代碼，取用端都會回傳相同的 404。它接受 `variant=preview|standard|detail`（JPEG 最大尺寸為 320/640/1280，絕不放大）、`limit=1..8`（或傳統的 `frames` 別名，但兩者不可同時使用）、從零開始的 `page`，以及選用的 `start`／`end` 聚焦秒數。重複的查詢鍵和反轉的聚焦時間範圍都會遭拒。每個傳回的變體都會包含其實際內容的雜湊和實際解析度中繼資料，並連結至保留的來源。變體會在讀取時衍生，而不會儲存為額外的保留複本。JSON 回應（包括 Base64／封裝）上限為 32 MiB；超過大小的頁面會回傳 413，用戶端必須要求較少的影格。讀取會在每次調整大小前後檢查取消狀態，並在回傳前再次檢查控制代碼有效性。擁有者執行的 `DELETE` 具備冪等性；刪除或 TTL 到期會釋放保留的來源和使用量記帳。

共用儲存區是程序本機的：重新啟動後控制代碼會過期，且無法在彼此獨立的 OmniRoute 程序之間轉移。管理統計資料只會公開有效的保留／遠端原則，以及保留項目／位元組的彙總數，不會公開媒體、參照、主體 ID 或控制代碼。Video 設定面板會顯示這些值，並能持久化兩個同意切換開關。本實作文件不是正式部署或推廣的證據；真實模型的驗收會另行追蹤。

影格會使用已設定的 Video 模型依序產生描述。空白的 Video 覆寫設定會繼承 Vision 設定；若兩者皆為空白，Vision 自動路由器會選取有效的視覺能力模型。成功的描述會以穩定的 `[Video description:` 前綴取代原始部分；該前綴也會將文字標記為不受信任、由媒體衍生的觀察，並告知下游模型不要遵循媒體中找到的指示。影格描述快取鍵包含 JPEG 位元組、提示、時間戳記和有效模型；只有成功的描述會被快取。快取項目會保留實際成功產生器模型，包括後備模型；當不同影格由不同模型產生時，bridge 會回報 `mixed`。快取命中時會重複使用該產生器身分，而不會將其重新標記為要求的路由計畫。整部影片結果快取會以所有會變更輸出的輸入建立索引——提示、有效模型、取樣原則、影格數量、語意分析模式、正規化聚焦提示的 SHA-256 指紋、聚焦時間範圍、`transcript`、`audioTranscript` 及聯絡表旗標——因此上述任何維度的變更都會造成快取未命中，絕不會使用過時結果。視覺去重原則版本、閾值和有界候選影格數量，也會明確包含在結果快取鍵和中繼資料中；因此原則變更無法重複使用過時的整部影片描述。結果快取 v4 中繼資料會保留模式和指紋，但絕不保留原始使用者任務。防護欄中繼資料會同時回報要求的和有效的分析模式；若要求的 `focused` 模式沒有可用的使用者文字，則會回報其有效模式為 `full`。

防護欄會擷取每個受支援的視訊部分，但描述的數量不會超過
`modalityBridgeVideoMaxVideos`。對於已證實
`supportsVideo === false` 的目標，失敗及超出數量限制的視訊會成為明確的安全
文字標記，因此不會有原始視訊殘留。當能力未知時，這些部分會保留其視訊載體；
任何備援轉錄文字都會遵循上述受限制的文字轉換。`supportsVideo === true` 的目標
會略過橋接器。
用戶端請求的中止訊號會傳遞至下載、代理程式佇列、子程序及字幕呼叫；中止會在
視訊之間停止，且絕不會失效開放為原始媒體。

執行階段設定由資料庫提供並經 Zod 驗證：

| 金鑰                                | 預設值      | 範圍／行為                                                                        |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 選用的執行階段功能，須明確啟用                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 保留一般字幕；`focused` 使用受限制且不受信任的最新使用者內容               |
| `modalityBridgeVideoModel`          | `""`        | 繼承 Vision Bridge 模型                                                           |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                              |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware` 或按比例的 `segment_aware`；偵測器失敗時回退至 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                               |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                                  |

舊版持久化的 Video 逾時值若超過 120 秒，會被限制在代理程式截止期限內；新設定寫入
若超過該限制則會遭拒。`GET /api/modality-bridge/video/runtime` 在驗證或執行階段
探測之前，需要先通過受信任且帶有戳記的本機迴路位置檢查，之後還需要管理權限驗證。
它只會傳回 `available`、經過清理的 FFmpeg／ffprobe 版本，以及執行階段不可用時的
固定原因。內部擷取端點不是公開上傳 API：佇列飽和時會傳回 `503` 及
`Retry-After`，呼叫端中斷連線時會傳回 `499`，固定的代理程式截止期限到達時會傳回
`504`。轉換後的回應會在中央
`x-omniroute-modality-bridge` 標頭中加入
`video->text;model=<visionModel>;parts=<videos>`，且不會移除 Vision 或 Audio 區段。

### PII 遮罩器（`piiMasker.ts`）

在**兩個**階段執行。

- **`preCall`** 會複製 payload，遍歷 `system`、`messages`、`input` 及
  `prompt`（包括純字串項目），並對字串型的 `content`／`text` 欄位套用
  `processPII()`（來自 `@/shared/utils/inputSanitizer`）。當
  `PII_REDACTION_ENABLED=true` 時，偵測到的 PII 會在對外傳送的 payload 中被遮罩。
  這與 `INPUT_SANITIZER_MODE` 無關（後者只控制提示注入政策）。關閉遮罩時，呼叫會
  記錄偵測計數，但不會重寫內容。
- **`postCall`** 會深層複製回應，執行 `sanitizePIIResponse()` 以及
  Responses API 形狀的遮罩器（`maskResponsesOutput` — 涵蓋
  `output_text` 和 `output[].content[].text`）。若發生任何遮罩，修改後的回應會取代
  原始回應。

防護欄永遠不會封鎖；它只會加入註解（`meta.detections`、
`meta.redacted`）或重寫內容。

#### 依類型選取、自訂模式與偵測計數器

**儀表板 → 設定 → 安全性 → PII 遮罩**會選擇要遮罩的內容。它不會啟用遮罩：
啟用狀態仍由 `PII_REDACTION_ENABLED`（請求）及
`PII_RESPONSE_SANITIZATION`（回應 + SSE）控制，兩者預設皆為關閉。

- **依類型選取** — 內建識別碼列於
  `src/shared/constants/piiTypes.ts`（`PII_BUILTIN_TYPES`）。未設定表示所有類型
  （此設定存在之前的行為）。請求引擎的 `ssn_us` 模式會對應至 `ssn`。範本
  （Minimal、Standard、Financial、Brazilian、USA、GDPR、POPIA、Full）只會在 UI
  中填入核取方塊。
- **GDPR 與 POPIA 識別碼** — 十二個內建識別碼涵蓋歐盟及南非的個人識別碼（如下表）。
  其正規表示式、驗證器及司法管轄區標籤位於單一表格
  `src/shared/utils/piiPatterns.ts` 中，回應清理器（`src/lib/piiSanitizer.ts`）與
  請求遮罩器（`src/shared/utils/inputSanitizer.ts`）都會使用該表格。只有在驗證器
  接受比對結果時，該結果才會被遮罩；單純一串數字永遠不足以觸發遮罩。在這些識別碼
  存在之前便已儲存縮減選取範圍的操作員，會維持原有行為，直到勾選新的識別碼為止。
- **自訂模式** — 最多 20 個正規表示式或萬用字元模式（`*` = 最多 64 個非空白字元，
  `?` = 一個字元）。比對結果會成為 `[CUSTOM_REDACTED]`。每個模式都會經過
  `compilePiiCustomPattern()`
  （`src/shared/utils/piiCustomPatterns.ts`）：最多 500 個字元，旗標僅限
  `g i m s u`，必須能成功編譯，必須通過 `safe-regex`（防止災難性回溯），且不得
  比對空字串或遮罩佔位符。驗證失敗的模式在儲存及測試時都會遭拒，而執行階段會略過
  儲存後失敗的資料列，不予編譯。自訂模式只有在遮罩啟用時才會執行。
- **偵測計數器** — 依類型計數（絕不儲存比對到的值），保存在記憶體中，並在重新啟動
  時重設（`src/lib/pii/piiDetectionStats.ts`）。只有在遮罩啟用時才會增加。

設定儲存在 `key_value` 資料表（命名空間 `pii_settings`、
`src/lib/db/piiSettings.ts`）中，並透過 1 秒快取讀取。API：

| Method | 路徑                     | 用途                                                        |
| ------ | ------------------------ | ----------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | 旗標狀態、`enabledTypes`、`customPatterns`、偵測計數器      |
| `PUT`  | `/api/settings/pii`      | 取代 `enabledTypes`（`null` = 全部）及／或 `customPatterns` |
| `POST` | `/api/settings/pii/test` | 對最多 8 KB 的範例執行單一模式的試執行；不會儲存任何內容    |

三者皆需要管理驗證，並使用 Zod 驗證請求本文
（`src/shared/validation/schemas/piiSettings.ts`）。停用登入時
（`requireLogin=false`），`GET` 和測試端點可公開存取，但 `PUT` 仍需要儀表板工作階段、
具有 `manage` 範圍的 API 金鑰、具有寫入範圍或更高權限的 `oma_` 存取權杖，
或從 loopback 傳送的 CLI 權杖或內部服務權杖。

#### GDPR（歐盟）與 POPIA（南非）識別碼

| Id                  | 識別碼                | 驗證                                                                         |
| ------------------- | --------------------- | ---------------------------------------------------------------------------- |
| `iban`              | IBAN                  | 已知國家、該國家的確切長度、ISO 13616 MOD-97-10                              |
| `eu_vat`            | EU VAT 號碼           | 已知成員國前綴，以及該國的號碼格式（不查詢 VIES）                            |
| `es_dni_nie`        | 西班牙 DNI / NIE      | 控制字母（值 mod 23）；NIE 為 `X/Y/Z` + 7 位數字                             |
| `it_codice_fiscale` | 義大利 Codice Fiscale | 根據奇數／偶數位置表計算控制字母                                             |
| `pl_pesel`          | 波蘭 PESEL            | 加權校驗碼，以及存在的編碼出生日期                                           |
| `nl_bsn`            | 荷蘭 BSN              | 11-proof（權重 9..2、-1）                                                    |
| `de_steuer_id`      | 德國 Steuer-ID        | ISO 7064 Mod 11,10，以及數字結構規則（不得以 0 開頭）                        |
| `se_personnummer`   | 瑞典 personnummer     | 對最後十位數字執行 Luhn，以及合理的出生日期（10 或 12 位數字）               |
| `za_id`             | 南非身分證號碼        | 對全部 13 位數字執行 Luhn、有效的出生月／日、公民身分數字為 0 或 1           |
| `za_phone`          | 南非電話號碼          | `+27` / `27` 前綴，或以空格或連字號書寫的國家格式 `0..`                      |
| `za_vat`            | 南非 VAT 號碼         | 以 `4` 開頭的 10 位數字，**且**前方 48 個字元中包含 "VAT" / "BTW"            |
| `za_tax_ref`        | 南非稅務參考號碼      | 以 `0`-`3` 開頭的 10 位數字、Luhn、**且**前方 48 個字元中包含 "tax" / "SARS" |

由於僅含數字的格式會與訂單編號、組建編號和時間戳記衝突，較弱的格式
（`za_vat`、`za_tax_ref`）需要關鍵字提示，而單獨的十位數字 `0..` 不會被視為南非電話號碼。
含空格的 IBAN（`GB29 NWBK ...`）不會被匹配。在串流路徑上，提示僅會在目前的區塊內查找。
這些識別碼位於通用電話模式之前，因此通過驗證的識別碼會保留自己的佔位符
（`[IBAN_REDACTED]`、`[NL_BSN_REDACTED]`、...）。`gdpr` 和 `popia` 範本
分別選取歐盟和南非識別碼。遮罩本身仍採選擇性啟用（Hard Rule #20）：此處不會改變功能旗標預設值。

### 提示注入（`promptInjection.ts`）

偵測使用者提供內容中的對抗性結構，並強制執行已設定的政策。行為由環境變數和建構函式選項控制：

| 設定     | Env var                                                                                             | 預設值 | 作用                                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 已啟用   | `INPUT_SANITIZER_ENABLED`                                                                           | `true` | 設為 `false` 時，防護機制會短路返回。                                                                                                           |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn` | 注入政策：`block`、`warn` 或 `log`。（為了向後相容，接受 `redact`，但**不會**移除注入文字；請求中的 PII 重寫由 `PII_REDACTION_ENABLED` 控制。） |
| 封鎖閾值 | `blockThreshold` 選項 / `INPUT_SANITIZER_BLOCK_THRESHOLD`（別名 `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high` | 封鎖所需的最低嚴重性。預設情況下，中等嚴重性僅供觀察。                                                                                          |

**模式優先順序**（`getMode`）：呼叫端的 `options.mode` →
`INJECTION_GUARD_MODE` **資料庫功能旗標覆寫**（儀表板 → 設定 →
功能旗標）→ `INJECTION_GUARD_MODE` 環境變數 → `INPUT_SANITIZER_MODE` 環境變數 →
`warn`。因此，儀表板覆寫的優先級高於環境變數，功能旗標 UI 可即時控制執行中的防護機制（無需重新啟動）。
資料庫讀取採故障安全設計：若讀取發生錯誤，防護機制會回退至以環境變數為基礎的行為；
若未設定覆寫值，其行為將與僅使用環境變數解析時完全相同。

偵測來源：

1. `sanitizeRequest()` 來自 `@/shared/utils/inputSanitizer`（管線其他部分也使用的共用偵測器
   集合）。
2. 內建的 `DEFAULT_GUARD_PATTERNS`（目前為 `system_override_inline` 和
   `markdown_system_block`，兩者嚴重性皆為 `high`）。
3. 透過建構函式選項傳入的選用 `customPatterns`（字串、正規表示式，
   或 `{ name, pattern, severity }` 記錄）。

當 `mode === "block"` **且至少有一個偵測結果達到嚴重性
閾值**時，`preCall` 會回傳 `{ block: true, message: "Request rejected:
suspicious content detected" }`。在 `warn`/`log` 模式中，防護機制會記錄日誌但允許呼叫。共用輔助函式 `evaluatePromptInjection()` 也會匯出，供需要在不經過登錄表的情況下評估提示的呼叫端使用。

**掃描上限（v3.8.20）：**偵測器只會檢查串接後提示文字的**前 16 KB** — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384 位元組），位於
`src/shared/utils/inputSanitizer.ts` 中。`detectInjection()` 和
`evaluatePromptInjection()` 都會在執行模式比對迴圈前使用
`slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令位於輸入內容頂端附近，因此這能在數百 KB 的 payload 上限制 regex CPU/GC 使用量，同時不會削弱偵測能力（參見 #3932、#4041）。

### 憑證遮罩器（`credentialMasker.ts`）

在**兩個階段**都會執行，且位於預設鏈結的最後一個位置（優先順序 `95`）。它會從傳出的 payload（訊息內容、工具呼叫引數、工具結果）**以及**提供者回應中，遮罩廣為人知的 API 金鑰／祕密權杖模式，避免貼入提示中的憑證（或工具結果回傳的憑證）洩漏給上游提供者或返回給用戶端。

- **僅選擇性啟用**，採用與 PII 遮罩相同的慣例（接近硬性規則 #20）：除非 `settings.credentialRedactionEnabled === true` **或**
  `CREDENTIAL_REDACTION_ENABLED=true`，否則會停用。停用時，防護機制不會執行任何操作 —
  絕不封鎖，也不會重寫內容。
- `redactCredentials()` 會遍歷完整的 payload／回應樹（`walkValue()`，
  可防範原型污染，並透過 `WeakSet` 防止循環參照），以 `[REDACTED:<type>]` 佔位符取代符合項目，只複製實際發生變更的分支。
- `CREDENTIAL_PATTERNS` 涵蓋 LLM 提供者金鑰（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS／SaaS 權杖（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、付款金鑰（Stripe、Square）、雲端金鑰
  （AWS 存取金鑰、Twilio、SendGrid、Mailgun）、私密金鑰／JWT、
  包含憑證的連線字串（`mongodb://user:pass@...` 等），以及通用的
  `Authorization`／`x-api-key`／`api-key`／`apikey` 標頭值
  模式。標頭形式的金鑰（`authorization`、`x-api-key`、`api-key`、
  `apikey`）會以結構化方式遮罩（僅遮罩值，保留 `Bearer `/`Basic ` 等前綴），而非透過通用文字正規表示式。
- 防護機制絕不會封鎖；它只會重寫（`modifiedPayload`／
  `modifiedResponse`）並加上註記（`meta.credentialsRedacted`、`meta.count`）。

迴歸防護：`tests/unit/credential-masker-guardrail.test.ts`。

## 基礎契約（`base.ts`）

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true 會使整條鏈短路
  message?: string; // 阻擋時顯示的訊息
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // 由 preCall 回傳，用於重寫請求
  modifiedResponse?: TValue; // 由 postCall 回傳，用於重寫回應
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

護欄透過回傳 `void`、`{}` 或 `{ block: false }` 來表示「無變更」。
回傳 `modifiedPayload`／`modifiedResponse` 會取代在鏈中流向下游護欄的值。
`signal?: AbortSignal` 將呼叫端的生命週期帶入護欄。請求中止是刻意為之的 fail-open 例外：媒體橋接器會停止工作並進行清理，而不會將原始媒體還原到已知不支援它的目標。

## 註冊表（`registry.ts`）

單例 `guardrailRegistry` 提供：

- `register(guardrail)` — 新增護欄（或以正規化名稱取代同名護欄），並依 `priority` 升冪重新排序。
- `clear()` / `list()` — 管理用的輔助方法。
- `runPreCallHooks(payload, context)` — 逐一執行啟用中的護欄，透過 `modifiedPayload` 串接傳遞 payload，並在第一個 `block: true` 出現時停止。
- `runPostCallHooks(response, context)` — 在回應端執行相同的流程。
- `resetGuardrailsForTests({ registerDefaults })` — 清除狀態，並可選擇重新註冊預設護欄，以實現乾淨的測試隔離。

兩個執行器都回傳 `{ blocked, payload|response, results, guardrail?, message? }`，其中 `results` 是 `GuardrailExecutionResult` 記錄的陣列，包含每個護欄的 `blocked`、`skipped`、`modified`、`error` 與 `meta` 欄位，便於追蹤。

### 依請求停用護欄

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` 會彙整出目前請求應跳過的護欄名稱去重清單。共有五個通道，依照以下順序讀取並合併為單一清單（去重時以最先出現者為準）：

1. `apiKeyInfo.disabledGuardrails`
2. 請求主體的 `disabledGuardrails`（頂層）
3. 請求主體的 `metadata.disabledGuardrails`（僅當 `metadata` 為物件時）
4. 標頭 `x-omniroute-disabled-guardrails`
5. 舊版標頭 `x-disabled-guardrails`

五個通道全部都會被合併，包括兩個標頭在內：同時傳送
`x-omniroute-disabled-guardrails` 與 `x-disabled-guardrails` 會跳過兩者清單的
聯集，且空白的新式標頭不再遮蔽舊版標頭
（[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)，已於
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) 修復）。

值可以是字串陣列或以逗號分隔的字串；名稱會被去除空白並正規化為小寫
kebab-case（`pii_masker` → `pii-masker`），空白項目會被捨棄。結果會透過
`context.disabledGuardrails` 傳遞給註冊表，註冊表會跳過符合的護欄（在 `results` 中標記為
`skipped: true`）。

停用清單只影響**註冊表**。提示注入（prompt-injection）的 `block` 模式是強制邊界：
注入防護中介軟體
（`src/middleware/promptInjectionGuard.ts`）呼叫 `evaluatePromptInjection()`
時不帶任何呼叫端可控制的停用清單（它過去所做的、已無作用的
`resolveDisabledGuardrails({ body })` 呼叫已於
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) 移除），因此即使請求
停用了 `prompt-injection`，在 `block` 模式下仍會被拒絕。這是刻意
設計的。停用通道由呼叫端控制（請求主體、
metadata、標頭），而呼叫端不得能夠關閉營運者所設定的安全
控制項
（[#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)）。來自
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) 的標頭
聯集只改變哪些註冊表護欄會被跳過；它不會讓用戶端
繞過中介軟體。強制的按金鑰與按群組護欄政策
在 v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) 中追蹤。
請參閱[涵蓋範圍與限制](#coverage-and-limits)。

## 執行順序

對於每個流經 `src/sse/handlers/chat.ts` 與
`open-sse/handlers/chatCore.ts` 的請求(即[涵蓋範圍與限制](#coverage-and-limits)所列的 chat-family 路由):

1. `resolveDisabledGuardrails(...)` 會根據 API 金鑰、請求主體(body)與標頭(headers)建立略過清單。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` 依優先順序由低至高執行各項防護機制(guardrails):
   - 已停用的防護機制會記錄為 `skipped`。
   - 每個防護機制的 `preCall` 可透過 `modifiedPayload` 改寫請求負載。
   - 第一個 `block: true` 會使整條鏈短路(short-circuit),處理程序隨即回傳防護機制的拒絕回應。
     3.(可能已被改寫的)請求負載接著流入 combo 路由與上游分派。
3. **僅限非串流:** 回應組裝完成後,
   `guardrailRegistry.runPostCallHooks(...)` 會對回應執行同一條鏈。此處的 `block: true` 會丟棄上游回應並回傳 HTTP 400。串流回應則完全略過此步驟。

擲出例外的防護機制會以 `error: <message>` 記錄,並透過 `logger.warn` 寫入日誌,但鏈仍會繼續執行——此為設計上的 fail-open(失敗開放)。

## 涵蓋範圍與限制

防護機制註冊表(guardrail registry)僅接入聊天管道(chat pipeline)。這些限制由 `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` 與
`tests/unit/guardrail-pipeline-characterization.test.ts` 鎖定(pin);當行為變更時,請務必審慎地更新這些測試。

### Hook 的執行位置

| Hook / 控制項                  | 執行位置                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`              | 由 `handleChat`(`src/sse/handlers/chat.ts`)處理的請求:`/v1/chat/completions`、`/v1/completions`、`/v1/messages`、`/v1/responses`(以及 `/v1/responses/*`)、`/v1/relay/chat/completions`、`/v1/providers/{provider}/chat/completions`、`/v1/api/chat`、`/v1/antigravity`、`/v1beta/models/*`,以及 Telegram 聊天代理。另包含儀表板測試端點 `/api/guardrails/test`。pre-call 的阻擋會回傳 HTTP 400。 |
| `runPostCallHooks`             | **僅限非串流**的聊天回應(`open-sse/handlers/chatCore/nonStreamingResponse.ts`)。串流回應永遠不會到達此處。                                                                                                                                                                                                                                                                                       |
| 串流 PII                       | `createPiiSseTransform`(`src/lib/streamingPiiTransform.ts`),當 `PII_RESPONSE_SANITIZATION` 開啟時於 `streamingPipeline.ts` 中串接。它並非防護機制,因此停用通道對其無效。                                                                                                                                                                                                                         |
| Injection-guard 中介軟體(舊版) | 所有攜帶提示詞(prompt)的 `/v1` 路由,包含 chat-family 在內(請參閱[路由涵蓋範圍](#injection-guard-route-coverage--red-team-phase-8--block-d))。僅針對提示詞注入(prompt injection)。                                                                                                                                                                                                                |

### 未涵蓋的範圍

- **媒體、嵌入(embeddings)與資料路由**(`/v1/images/*`、`/v1/embeddings`、
  `/v1/audio/*`、`/v1/videos/generations`、`/v1/music/generations`、
  `/v1/rerank`、`/v1/search`、`/v1/moderations`)永遠不會到達註冊表。這些路由不會執行
  PII 遮罩、憑證遮罩或 modality bridge。其唯一的檢查是舊版
  injection-guard 中介軟體。
- **串流回應**沒有 post-call 防護機制:沒有 `pii-masker` 或
  `credential-masker` 的 post-call,也沒有 post-call 阻擋。僅適用串流 PII
  轉換(當 `PII_RESPONSE_SANITIZATION` 開啟時)。在串流回應中被回顯(echo)的憑證
  不會被遮蔽(redact)。
- **停用通道與中介軟體的差異(設計使然):** 中介軟體透過自行呼叫
  `evaluatePromptInjection()` 來評估提示詞注入,不會傳入任何由呼叫方控制的停用清單。`block` 模式是一道強制邊界,呼叫方控制的停用無法繞過,包含
  chat-family 路由在內
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413))。停用
  `prompt-injection` 只會略過註冊表中的防護機制。

### 在 post-call 之前能看到回應的環節

在非串流路徑上,順序為:記憶提取(memory extraction)→ 內建工具執行 → post-call 防護機制 → post-call 阻擋退出 → 語意快取(semantic-cache)儲存。

- **記憶提取**與**工具執行**會在回應經過 post-call 防護機制改寫或封鎖之前就先看到該回應。自
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) 起，當
  `PII_RESPONSE_SANITIZATION` 開啟時，記憶提取會將提取出的文字通過 `sanitizePII` 處理（串流與非串流皆然），但一個之後被 post-call 封鎖的回應，仍已被提供給記憶與工具。
- **語意快取**會在 post-call 之後儲存回應，因此儲存的是改寫後的回應，而被封鎖的回應永遠不會被快取。快取項目以 API 金鑰為鍵值區分。

## 設定

內建防護機制所讀取的環境變數：

| 變數                                  | 使用元件             | 效果                                                                     |
| ------------------------------------- | -------------------- | ------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`   | 設為 `false` 可完全停用偵測。                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`   | 注入政策：`warn`、`block` 或 `log`。舊版值 `redact` 不會改寫注入文字。   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`   | 注入防護的模式；同時也是資料庫功能旗標，會**覆寫**環境變數（DB > ENV）。 |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`   | `MODE=block` 所拒絕的最低嚴重程度：`high`（預設）、`medium` 或 `low`。   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`   | `INPUT_SANITIZER_BLOCK_THRESHOLD` 的舊版別名。                           |
| `PII_REDACTION_ENABLED`               | `pii-masker`         | 設為 `true` 時，請求中的 PII 會被遮罩（獨立於注入模式運作）。            |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（下游） | 控制回應端遮罩器的行為。                                                 |

Modality Bridge 防護機制從資料庫支援的設定儲存（`getSettings()`）讀取執行時期設定，而非環境變數。Vision 的主要鍵為
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes`，以及
`modalityBridgeCacheMaxEntries`。舊版
`visionBridge*` 鍵僅作為文件記載的單一週期讀取回退而被接受；儀表板寫入一律使用主要鍵。預設值與回退解析器位於 `src/shared/constants/modalityBridgeDefaults.ts`，舊版常數則保留於 `src/shared/constants/visionBridgeDefaults.ts`。

Audio 使用 `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout` 和 `modalityBridgeAudioMaxClips`，以及共用的
`modalityBridgeCache*` 設定。Audio 沒有舊版鍵回退機制，因為這些鍵是隨 Modality Bridge 架構一起引入的。

Video 使用 `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos`，以及
`modalityBridgeVideoTimeout`，再加上共用的 `modalityBridgeCache*` 設定。
此功能預設為停用，因為 FFmpeg/ffprobe 屬於選用的營運相依項目，且影格字幕會增加延遲與模型成本。

## 自訂防護機制（Guardrail）

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

步驟：

1. 建立 `src/lib/guardrails/myGuardrail.ts`，並繼承 `BaseGuardrail`。
2. 實作 `preCall` 及/或 `postCall`。
3. 在匯入時註冊（從 `registerDefaultGuardrails` 推入），或在執行期呼叫
   `guardrailRegistry.register(...)`——註冊表會取代任何具有相同正規化名稱的
   既有防護機制。
4. 在 `tests/unit/` 下新增測試（現有範例：
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## 測試

在測試之間使用 `resetGuardrailsForTests()`，以從已知狀態開始。
傳入 `{ registerDefaults: false }` 可從空的註冊表開始，僅註冊受測的
防護機制。Vision Bridge 接受依賴注入（`deps.getSettings`、`deps.callVisionModel`）；
Audio Bridge 則為設定、能力、STT 模型選擇、憑證檢查與轉錄提供對等的
測試接縫（seam）。因此測試無需資料庫或網路存取，即可驗證這兩種流程。

## 另請參閱

- `src/lib/guardrails/` — 實作
- `src/shared/utils/inputSanitizer.ts` — 驅動提示注入（prompt-injection）與
  PII 遮罩的共用偵測器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge 預設值與
  強制橋接模型清單
- `src/shared/constants/modalityBridgeDefaults.ts` — 共用的 Vision/Audio 執行期預設值
- `docs/architecture/RESILIENCE_GUIDE.md` — 正交層（斷路器、冷卻期）
- `docs/reference/ENVIRONMENT.md` — 完整的環境變數參考

## 注入防護路由涵蓋範圍與紅隊測試（Phase 8 · Block D）

注入防護（`createInjectionGuard` / `withInjectionGuard`）涵蓋所有
接受使用者提示的路由。它遵循 `INJECTION_GUARD_MODE`（預設 `warn` = 僅記錄；
`block` = 回傳 HTTP 400 `SECURITY_001`）。

| 類型         | 路由                                                                                                                                                 | 預設模式 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 文字（現有） | `/v1/chat/completions`、`/v1/completions`、`/v1/relay/chat/completions`                                                                              | warn     |
| 生成式       | `/v1/messages`、`/v1/responses`、`/v1/images/generations`、`/v1/images/edits`、`/v1/videos/generations`、`/v1/music/generations`、`/v1/audio/speech` | warn     |
| 資料         | `/v1/embeddings`、`/v1/rerank`、`/v1/search`、`/v1/moderations`                                                                                      | warn     |

文字擷取（`extractMessageContents`）涵蓋 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`。

**紅隊測試（每晚執行，`nightly-llm-security.yml`）：** promptfoo 驗證每個路由在
`INJECTION_GUARD_MODE=block` 下能阻擋 OWASP-LLM 語料庫；garak 執行探測（無密鑰時跳過）。
為保持一致性，納入 `moderations`。阻擋模式是強制邊界：`evaluatePromptInjection()`
會忽略中介軟體傳給它的逐請求停用清單，因此 `disabledGuardrails` **不會**
讓路由豁免於此（[#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)）。

每晚工作流程（`.github/workflows/nightly-llm-security.yml`，cron + 手動
觸發）包含兩個作業：

- **`promptfoo-guard`（阻擋性）** — 以 `INJECTION_GUARD_MODE=block`
  執行 `promptfoo eval -c promptfooconfig.yaml`。每個對抗性案例
  （例如「忽略所有先前的指示……」、DAN 風格的越獄攻擊）都會斷言回應帶有
  `error.code === "SECURITY_001"`，即防護機制確實拒絕了該請求。
- **`garak`（建議性）** — 對本機 OmniRoute 實例
  （`http://localhost:20128/v1`）執行 garak `--probes promptinject,dan,leakreplay`。
  以提供者密鑰（`PROMPTFOO_PROVIDER_KEY`）作為執行門檻；無密鑰時會優雅跳過，
  且指令以 `|| true` 結尾，因此只回報結果而不會讓 CI 失敗。

防護輔助函式（`createInjectionGuard` / `withInjectionGuard`）的涵蓋範圍
橫跨每個帶有提示的 `/v1` 路由；提示文字由
`src/shared/utils/inputSanitizer.ts` 中的 `extractMessageContents()` 從
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` 擷取。
