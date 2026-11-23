# Guardrails (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md)

---

> **事實來源：** `src/lib/guardrails/`
> **上次更新：** 2026-08-29 — v3.8.51（Video Bridge 逐字稿來源由呼叫端宣告，
> 尚未由伺服器驗證 — 已依 #11661 釐清）

護欄會在 OmniRoute 與上游提供者之間的邊界強制執行安全、政策及內容轉換。每個護欄都可以檢查請求承載資料（`preCall`）和上游回應（`postCall`），並可選擇拒絕、轉換或註解這些內容。

系統採用**失敗時開放**機制：如果護欄在執行期間擲出例外，登錄檔會記錄錯誤並繼續執行下一個護欄，而不會讓請求失敗。封鎖一律是明確的決定（`block: true`），絕不會因意外而發生。

## 內建防護機制

登錄檔會在匯入時依優先順序自動載入六個防護機制
（請參閱 `registry.ts` → `registerDefaultGuardrails()`）：

| 優先順序 | 名稱                | 階段           | 檔案                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先順序數字較小者會**先**執行。

### 視覺橋接器（`visionBridge.ts`）— 模態橋接 PR-1

攔截送往**非視覺模型**且包含影像的請求，並將整個請求重新路由至支援視覺的模型，或在呼叫上游之前，以可設定的視覺模型所產生的文字描述取代影像部分。這讓純文字提供者能夠透明地處理多模態承載資料。

流程：

1. 若目標模型已支援視覺，則跳過（除非它出現在強制橋接清單 `isVisionBridgeForcedModel` 中）。
2. 透過 `extractImageParts(messages)`
   （`visionBridgeHelpers.ts`）擷取影像部分；該函式會委派給 `open-sse/utils/mediaParts.ts` 中的**統一媒體偵測器**
   `detectMediaParts()`——這是與組合相容性篩選器共用的唯一事實來源。
   擷取僅允許可由 `replaceImageParts` 重新拼接回去之形狀的頂層部分
   （擷取↔取代契約）：OpenAI `image_url`、Anthropic base64
   `source.type:"base64"`、Anthropic URL
   `source.type:"url"`，以及 Responses API `input_image`。巢狀命中項目和
   僅指示器形狀屬於組合篩選器的處理範圍，絕不會被擷取。
   若未找到任何項目，則跳過。
3. 透過 `resolveVisionBridgeRuntimeSettings()`
   （`src/shared/constants/modalityBridgeDefaults.ts`）解析執行階段設定：新的 `modalityBridge*`
   設定鍵優先；舊版 `visionBridge*` 鍵仍保留為**一個週期的備援**
   （回復窗口）。停用橋接器時，會在遍歷任何媒體之前跳過。
4. 模式選擇器（`modalityBridgeVisionMode`，請參閱下表）決定重新路由或描述。重新路由會傳回僅替換 `model`
   的 `modifiedPayload`，以及中繼資料 `{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑：將影像數量限制為 `maxImages`、組合可感知任務的提示詞、查詢描述快取、**平行**
   呼叫視覺模型（`Promise.allSettled`），並在原位置注入 `[Image N]: <description>` 文字部分。
   描述失敗時會產生 `null`，並**保留**原始影像部分（#4012）——但在組合描述路徑中，若所有描述均失敗，
   則已確認不支援視覺的上游會改為收到
   `(unavailable — no vision-capable provider connected)` 替代文字（#8430）。
6. 傳回 `modifiedPayload` + 中繼資料（`imagesProcessed`、`descriptions`、
   `processingTimeMs`、`visionModel`）。

#### 模式選擇器（`modalityBridgeVisionMode`）

| 模式       | 預設值 | 行為                                                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | 舊版啟發式規則，保持不變（#6640/#7204）：非組合/`auto/` 模型會重新路由至最佳視覺模型，除非原始模型已有可用的認證資訊（此時會進行描述）；組合目標一律進行描述。                        |
| `describe` |        | 一律進行描述——完全跳過重新路由區塊；永遠由使用者選擇的模型作答。                                                                                                                      |
| `reroute`  |        | 強制重新路由：略過保留已有認證資訊模型的防護條件。重新路由**目標**的認證資訊防護條件仍然適用——若不存在可用的視覺目標，請求會轉而進入描述流程，以免原始影像傳送至純文字後端（#8430）。 |

強制模式會在執行自動啟發式規則**之前**短路；`auto` 行為與 PR-1 前的防護機制逐位元組完全相同。

#### API 金鑰範圍（`visionBridgeKeyScope.ts`）

當呼叫者的 API 金鑰限制 `allowedConnections`、配額池
（`allowedQuotas`）或模型（`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`）時，橋接器只會在該金鑰可使用的連線上，選擇該金鑰可使用的重新路由和描述模型。接著，描述呼叫一律透過 OmniRoute 自我迴圈並附帶
`x-omniroute-self-loop-key-id` 標頭進行，因此接收端的聊天請求會再次強制執行該金鑰的連線和模型政策。`enforceApiKeyPolicy()`
只有在自我迴圈 bearer 同時存在時才會接受該標頭，因此它只能縮小存取範圍，而無法解析的 id 會遭到拒絕。

若該金鑰沒有任何獲准使用的視覺模型，描述路徑會讓出處理，請求將原封不動地通過，其故障開放行為與停用的防護機制相同（中繼資料 `{ skipped: true, reason: "no_permitted_vision_model" }`）。
沒有金鑰的請求，以及沒有這些限制的金鑰，其行為與先前完全相同。

#### 可感知任務的描述提示詞（`modalityBridgeVisionTaskAware`）

預設值為 **true**。`composeVisionPrompt()`（`visionBridgeHelpers.ts`）會將
**最後一則使用者訊息**的文字（截斷至 500 個字元）附加到基礎
描述提示詞，使描述更貼近使用者實際詢問的內容
（codex-vision-proxy 模式），並要求視覺模型轉錄可見文字。
關閉此旗標或沒有使用者文字時，將原封不動地使用基礎提示詞。

描述自我迴圈本身的 OpenAI 相容請求（`visionBridgeHelpers.ts` 中的
`callVisionModelSingle()`）一律要求 `image_url.detail: "high"` —
無條件套用於每個呼叫端／提供者，不受任何用戶端訊號控制。
對於此提示詞所要求的文字轉錄任務，低細節取樣會降低 OCR 準確度，
因此無論原始傳入請求使用何種細節等級，描述呼叫本身一律要求高細節。
這只會影響內部描述請求的主體；不會改變 OmniRoute 在主要請求中
轉送呼叫端自身 `image_url.detail` 的方式 — 該預設值會另外套用，
且僅適用於偵測到的 OpenCode 用戶端，相關邏輯位於
`defaultImageDetail()`（`open-sse/handlers/chatCore/upstreamBody.ts`）。
描述自我迴圈的 Anthropic 線路格式分支沒有 `detail` 欄位，
不受這兩種預設值影響。

#### 描述輸出上限（`modalityBridgeVisionMaxChars`）

| 鍵                             | 預設值 | 範圍             |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` 或 100–50000 |

`0`（預設值）表示**沒有上限** — `callVisionModel()` 傳回的描述會原封不動地
傳遞，以保留現有行為。任何介於 100–50000 的值都會截斷描述並加上
`…` 後綴，之後再以 `[Image N]: <description>` 的形式插回
（`src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`）。
對於下游模型需要完整轉錄內容、細節密集的 OCR 任務，可提高此值；
若要限制話多的視覺模型所使用的 token 數量，則可降低此值。
儀表板欄位位於 Vision 分頁的 Advanced 面板
（`ModalityBridgeVisionTab.tsx` 中的 `modality-bridge-max-chars`），並會將
1 到 99 之間的任何值提高至最低值 100，同時保留明確設定的 `0`
不變 — `0` 本身就是有效的 Zod 值
（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`），
而不只是「未設定」時的預設值。

#### 描述快取（`modalityBridge/bridgeCache.ts`）

供整個程序共用的記憶體內 LRU + TTL 描述輸出快取。
鍵 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`，使用
長度前綴框架（不會發生欄位邊界碰撞）。模型元件是**已設定的**
橋接模型，而非實際回覆的模型 — `callVisionModel` 可能在內部進行後備切換，
若按每次嘗試建立鍵，將使快取碎片化。失敗的描述絕不會被快取。設定如下：

| 鍵                              | 預設值 | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠端圖片正規化（自我迴圈描述／base64 擷取）

當橋接器自行擷取**遠端**圖片時 — 包括 Anthropic 描述自我呼叫，以及
claude 線路格式的 base64 轉換（`ensureBase64ImagesForClaudeWire`），
兩者都透過 `visionBridgeHelpers.ts` 中的 `fetchRemoteImageAsDataUri()` —
產生的資料 URI 在嵌入視覺模型請求之前，會先傳入
`normalizeDataUri()`（`open-sse/utils/imageNormalize.ts`）。
過大的圖片會縮小至**長邊 2048px**（與 OpenAI/Anthropic 已在伺服器端
套用的縮放上限一致），從而減少上傳位元組數／延遲，而不改變視覺模型
所看到的內容。調整大小使用透過動態匯入載入的 `sharp`：在其原生
二進位檔無法載入的平台上，`normalizeDataUri()` **絕不會擲回例外** —
它會退回至直接傳遞原始位元組，因此描述／base64 轉換路徑始終可以繼續運作。
非圖片位元組（擷取結果並非可解碼圖片）也會原封不動地傳遞。
此正規化僅限於橋接器為自身自我呼叫而擷取的圖片 — 絕不會套用於
呼叫端未經處理的直接傳遞承載資料，這與僅限明確選用的修改原則一致
（硬性規則 #20）。

#### 設定結構描述 + 遷移

新的 `modalityBridge*` 鍵會在 `updateSettingsSchema`
（`src/shared/validation/settingsSchemas.ts`）中經過 Zod 驗證：
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCache*` 三個鍵，以及 Audio Bridge 使用的
`modalityBridgeAudio*` 群組。遷移
`141_modality_bridge_settings.sql` 會將現有舊版 `visionBridge*` 值複製到
對應的新鍵（具冪等性，絕不覆寫操作人員已設定的 `modalityBridge*` 值）；
在一個版本週期內，舊版鍵仍會被接受作為讀取後備。

#### 透明度標頭 + 統計資料

經描述轉換的回應會帶有
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
（由 `modalityBridge/bridgeStats.ts` 中的 `buildModalityBridgeHeader()`
建立，並由 `src/sse/handlers/chatHelpers.ts` 中的
`withModalityBridgeHeader()` 加入）。
重新路由的請求**不會**取得此標頭 — 承載資料未經修改，且模型切換已顯示於
回應主體的 `model` 欄位中。

`GET /api/modality-bridge/stats`（管理驗證，與
`GET /api/settings` 相同層級）會傳回記憶體中的各模態計數器
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`，涵蓋 `vision`、`audio` 與
`video`。`averageLatencyMs` 使用 `latencySamples` 作為分母，而非所有嘗試次數；
沒有計時資料的操作不會虛構一筆零毫秒的樣本。`bridged` 仍是成功轉換的
向後相容別名；失敗的嘗試不會增加其計數。
依設計，計數器會在程序重新啟動時重設
（用途是遙測，而非計量）。

#### 儀表板設定

專用的儀表板頁面位於
`/dashboard/settings/modality-bridge`。其可透過 URL 定址的「視覺」、「音訊」
與「視訊」分頁會在切換 `tab` 值時保留查詢參數。
「視覺」分頁提供啟用設定、模式、模型選擇（包括自動預設值）、
任務感知提示、進階逾時／影像／描述長度／快取限制、執行階段
計數器，以及受保護的範例請求。「音訊」分頁也已可用：它提供
啟用設定、僅限 STT 且包含「自動」選項的模型選擇器、逾時／最大剪輯限制、
音訊計數器，以及 `input_audio` 範例測試。「視訊」分頁具備完整功能：它會回報
FFmpeg/ffprobe 執行階段狀態，即四種明確 UI 狀態之一（探測進行中或無法完成時為
`unknown`；儀表板主機並非迴路位址，因而在用戶端略過探測時為 `restricted`；
完成探測並確認缺少時為 `unavailable`；可使用時則為 `available`，並顯示
FFmpeg/ffprobe 版本），可持久保存啟用／模型／影格／視訊／逾時限制，
將模型選擇器篩選為具備視覺能力的模型，並提供視訊計數器。

AI 設定下原有的 Vision Bridge 卡片現在是新頁面的相容性連結；
它不再擁有另一份表單。Media Providers 也會將 Image-to-Text 與
Speech-to-Text 工作流程連結至對應的 Modality Bridge 分頁，同時保留現有的
Speech-to-Text 測試區。

**自身迴路准入略過：**當描述呼叫透過 OmniRoute 自有的
`/v1` 自身迴路（非標準提供者模型）進行路由時，子請求會傳送
`x-omniroute-admission-bypass: internal`，並使用解析後的自身迴路憑證進行驗證——
本機模式下使用本機 `sk_omniroute` 哨兵值，否則使用操作員設定的
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境金鑰（#1350），如此即使在
`REQUIRE_API_KEY=true` 的部署中仍可執行描述呼叫。只有這些完全相符的憑證
才能使用略過機制，因此外部用戶端無法利用該標頭略過准入。

舊版預設值位於 `src/shared/constants/visionBridgeDefaults.ts`；
新的模式／任務感知／快取預設值與設定解析器位於
`src/shared/constants/modalityBridgeDefaults.ts`。防護機制提供
`deps` 建構函式選項，讓測試可注入假的 `getSettings` 與
`callVisionModel` 實作。

### 音訊橋接器（`audioBridge.ts`）— Modality Bridge PR-3

在含音訊的聊天請求抵達尚未確知支援音訊輸入的目標之前將其攔截。
它絕不會重新路由聊天請求：音訊部分會透過既有的 OpenAI 相容多部分端點
進行轉錄，而選定的聊天模型會繼續使用文字轉錄內容。

流程：

1. 透過 `getResolvedModelCapabilities()` 解析 `supportsAudio`。明確的
   提供者登錄中繼資料優先，其次是靜態模型中繼資料，最後是已同步的
   `modalities_input`。已宣告但不含 `audio` 的輸入清單會得到 `false`；
   若沒有任何能力證據，則維持 `null`。`false` 與 `null` 都會啟用
   保守式橋接，而 `true` 則會略過橋接。
2. 解析 `modalityBridgeAudio*` 設定，並透過共用的 `detectMediaParts()`
   偵測器，從每則訊息中擷取可拼接的頂層音訊部分。支援的線路格式包括
   OpenAI `input_audio`、`audio_url` 與 `source.media_type: "audio/*"`。
   巢狀音訊會被偵測以供路由使用，但不會由拼接路徑移除。工作量受
   `modalityBridgeAudioMaxClips` 限制；後續部分會保持不變。
3. 採用已設定的 `provider/model`，或讓 `selectAudioBridgeModel()` 依穩定的
   目錄順序巡覽 `AUDIO_TRANSCRIPTION_PROVIDERS`，並選取第一個具有可用且
   啟用中的提供者憑證之模型。
4. `callAudioTranscription()` 會將 base64/data-URI 音訊轉換成多部分
   `file`，或透過僅允許公開位址、具備 DNS 鎖定及 25 MB 上限的輸出防護機制
   下載遠端 `audio_url`。接著，它會將檔案與選定模型 POST 至本機
   `/v1/audio/transcriptions` 自身迴路，並以 `resolveSelfLoopBearer()`
   進行驗證。現有的轉錄路由會執行一般的憑證查找、冷卻／速率限制處理，
   以及提供者分派。
5. 成功的呼叫會將其部分替換為 `[Audio N]: <transcript>`。呼叫會使用
   `Promise.allSettled` 執行：個別失敗時會保留原始音訊部分（#4012 合約）。
   如果所有呼叫都失敗，且已證實目標的 `supportsAudio === false`，這些部分會變成
   `[Audio N]: (unavailable — no STT provider connected)`（#8430 合約）。
   對於未知目標（`null`），全部失敗時會保持原樣。已證實僅支援文字的目標
   若沒有可用的 STT 憑證，則會收到相同的明確替代文字，且不會發出網路呼叫。

成功的轉錄會使用程序全域的 Modality Bridge LRU/TTL 快取。
快取鍵由音訊參照、穩定的 `audio-transcription` 操作標籤，以及選定的
STT 模型組成；失敗永遠不會被快取。音訊嘗試會更新共用的
`bridged`、`cacheHits`、`failures` 與 `lastUsedAt` 計數器。
經轉換的回應會帶有
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；
未經變更的請求不會收到 Audio Bridge 區段。

執行階段設定由資料庫支援，並經過 Zod 驗證：

| 鍵                            | 預設值  | 範圍          |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | 自動或 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

共用快取仍由 `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes` 與 `modalityBridgeCacheMaxEntries` 控制。

### 視訊橋接器（`videoBridge.ts`、`videoBridgePipeline.ts`）

在呼叫已知不原生支援視訊的目標之前，攔截 Chat Completions `messages` 與 Responses
API `input` 中的頂層視訊部分。支援的格式為 `input_video`、`video_url`、`video_source`、HTTPS URL，
以及 `data:video/*;base64,...` 資料 URI。文字中的純檔案名稱不會被視為視訊。

`VideoBridgeGuardrail.preCall`（`videoBridge.ts`）負責請求走訪、
能力／政策檢查、每個請求的彙總，以及回應承載內容。
每段視訊的工作——擷取、完整結果快取、描述影格序列
（會融合呼叫端宣告的任何音訊轉錄），以及每次嘗試的
指標／中止／清理——隱藏於 `videoBridgePipeline.ts` 中的
`processVideoPart` 後方，並在 `preCall` 的迴圈內針對每個視訊部分呼叫一次。
該模組也定義了明確的連接埠邊界 `VideoMediaBrokerPort`
（取得位元組並擷取取樣影格）、`VideoAudioTranscriptionPort`
（將呼叫端宣告的音訊轉錄與取樣字幕融合），以及
`VideoDrilldownPort`（影格深入檢視的持久化邊界；尚未接入
`processVideoPart`——目前只有獨立的 `/api/modality-bridge/video/drilldown`
路由會寫入深入檢視項目）。

公開的 `/v1` 請求路徑絕不匯入或叫用子程序。遠端視訊的下載上限為 50 MiB；
內嵌 base64 視訊具有保守的每段視訊 36 MiB 解碼後上限，
讓模型／訊息／框架封套能維持在公開 JSON 請求的 50 MiB 接納限制內。
在配置記憶體之前，會先檢查內嵌長度與解碼後大小的估算值。初始遠端 URL
及每次重新導向都必須使用 HTTPS，並採用既有具 DNS 固定功能、
僅允許公開位址的對外連線防護。接著，位元組會跨越確切的內部
`POST /api/modality-bridge/video/extract` 代理邊界。該路由同時是
`LOCAL_ONLY` 與 `SPAWN_CAPABLE`，僅接受經每個處理程序驗證的可信任迴路位址請求，
而且絕不接受 URL、檔案系統路徑、可執行檔或引數清單。API 主體大小管線
與處理常式的增量主體讀取器會各自獨立強制執行 50 MiB 的代理輸入上限。
其有界佇列一次執行一項擷取、允許四項待處理工作，並將待處理輸入
限制在 100 MiB。

在代理內部，`ffprobe` 會讀取私有本機檔案；固定格式允許清單會排除播放清單
與資訊清單格式。對於允許的 MOV 系列容器，外部 MOV 資料參照預設維持停用，
而且固定命令不會選擇啟用它們。`ffprobe` 與 `ffmpeg` 都會使用僅限 `file`
的通訊協定允許清單、單一執行緒、固定引數陣列、不使用 shell，且可執行檔
從 `PATH` 解析。附加圖片的封面串流不屬於可播放候選項目。所有可播放串流
都必須符合限制，並且會先選擇明確的預設串流，再使用具確定性的最低索引
後備選項。視訊限制為 600 秒、每個維度 8,192 像素，以及
33,554,432 個來源像素。FFmpeg 會取樣 1–16 個中點 JPEG 影格，
將長邊縮小至最多 1,024 像素，且不放大小型輸入，並且絕不會收到 URL。
取樣預設為 `uniform`。選用的 `scene_aware` 與實驗性 `segment_aware`
政策會對已驗證的本機串流額外執行一次固定的 FFmpeg 處理、
選取有界的 `showinfo` 場景時間戳記，並在偵測器失敗、逾時、輸出格式錯誤
或候選集合為空時，以確定性方式後備至相同的均勻中點。
分段感知模式會依已驗證場景區間的比例分配中點樣本；分段感知證據
與後備行為詳述如下。每項政策都會在選取後套用 16 個影格的硬性上限。
當場景感知請求的預算只有一個影格時，會使用目前完整視訊或聚焦視窗的
均勻中點，並回報 `policyEffective: uniform`：單一選定的場景影格
無法同時保留時間軸兩端。呼叫端可選擇提供有限的聚焦視窗
（`start`/`end` 秒）；邊界會限制在媒體持續時間內，反向或非有限視窗
會遭拒絕，而所有取樣政策只會在正規化後的區間內執行。產生的視窗
會包含在取樣中繼資料與不受信任的描述前置文字中，讓下游模型能區分
聚焦片段與完整時間軸。

語意字幕聚焦是一項獨立且明確的設定。預設的 `full`
分析模式會保留現有的影格提示詞，而且絕不會將請求文字轉送至字幕模型。
在 `focused` 模式下，橋接器只會從同一個 Chat 或 Responses
容器中讀取最新且非空白、由使用者撰寫的 `text`/`input_text`，
將其正規化為 NFC、摺疊控制字元與空白，並限制為 500 個 Unicode 碼位。
空白結果會後備至完全相同的 `full` 提示詞。可用的提示會在專用的
不受信任使用者內容區塊中序列化為 JSON，且只能優先考量可觀察到的細節；
它無法覆寫另一項警告，也就是不得遵循媒體中可見或可聽到的指示。
文字聚焦絕不會推斷 `start`/`end`，也不會變更時間取樣器。

#### FU-07 結構化分段證據

`segment_aware` 會對已驗證的本機視訊串流執行一次有界限的預分析處理。固定的濾鏡鏈會先將寬度縮放至最多 320 像素，偵測場景變換與畫面凍結區間，然後以每秒 1 影格的頻率取樣，以分析模糊度、平均亮度，以及空間／時間資訊。此處理流程限制為 600 個結構取樣、單一 FFmpeg／濾鏡執行緒、相同的僅限 `file` 通訊協定與容器允許清單、1 MiB 的處理程序輸出上限，以及代理程式共用中止／截止期限內最多 30 秒。它絕不接受來自請求的命令、濾鏡、路徑或 URL。

這些結構值是確定性的取樣證據，而非對視訊的語意理解。它們不會推斷主體、動作、字幕、語音或使用者意圖。場景與凍結邊界會形成片段；凍結涵蓋率、模糊度、曝光、空間細節與時間變化只會影響既有 1–16 影格預算的分配方式。完全凍結的片段上限為一個影格，而非凍結片段則會競爭剩餘預算。當邊界數量多於影格數量時，仍會保留時間軸上的均勻涵蓋，避免前段的快速剪接掩蓋後方的長片段。若場景邊界與凍結邊界之間的距離落在 1 秒分析解析度內，則會將兩者合併。

缺少濾鏡、證據格式錯誤／為空、偵測器錯誤，或有界限的預分析逾時，都會採取開放失敗策略，回復至完全相同的均勻中點政策。呼叫端中止或代理程式截止期限不會採取開放失敗策略：它會終止進行中的子處理程序、阻止後續影格擷取，並在 `finally` 中移除私有暫存目錄樹。

`scripts/perf/video-bridge-fu07-eval.ts` 會產生確定性的真實 FFmpeg 測試資料，用於評估去重後的字幕呼叫節省量、密集動態的預算分配、模糊度／曝光／SI-TI 證據、帶有長尾片段的快速剪接，以及漸變淡入淡出造成的誤判。它會記錄預分析的實際經過時間；若 `/usr/bin/time` 可用，還會記錄子處理程序的 CPU 使用量與 RSS 峰值。其品質檢查僅為結構判定依據。由於此測試工具沒有經授權的端點或固定版本的評審器，真實字幕模型的品質仍維持 `HOLD`。除非 `--caption-cost-per-call-usd` 提供明確且為正值的每次呼叫成本估算，否則金額節省結果也維持 `HOLD`；此指令碼絕不捏造任一結果。

每個影格限制為 4 MiB，所有原始影格合計限制為 23 MiB，而序列化後的代理程式回應限制為 32 MiB。私有暫存目錄會在 `finally` 中移除。OmniRoute 不隨附 FFmpeg，也不接受自訂的可執行檔路徑。在產生字幕前，橋接器會套用保守的視覺去重處理：每張 JPEG 都會縮減為 16×16 灰階緩衝區，且只會與上一個保留的影格比較。當要求的字幕預算超過一個影格時，擷取程序會提供有界限的候選集區，其數量最多為該預算的兩倍，且絕不超過 16 個影格。只有在去重之後才會套用要求的上限；若預算至少為兩個影格，最終刪減時會保留第一個與最後一個選定的候選影格。具版本控管的
`grayscale-16x16-mean-cells-v2` 政策會取平均亮度差與縮圖儲存格比例中的較大值；後者是正規化差異至少為 0.05 的縮圖儲存格比例。重複判定閾值是常數 0.04；選擇固定值是為了可預測性，而非將其公開為執行階段設定。這項次要的高對比訊號能保留僅使用平均值進行比較時可能遭到忽略的細微動態與可見文字變化。比較器或解碼器發生錯誤時會採取開放失敗策略並維持涵蓋範圍。輸出中繼資料會分別列出已擷取的候選影格、成功使用的影格，以及已捨棄的視覺重複影格。

明確標記的視訊部分可要求附有時間戳記的縮圖聯絡表。橋接器最多會建立一個 4 欄、16 影格的 JPEG 網格。每個 512 像素的儲存格都會將其來源時間戳記燒錄至底部的高對比色帶中，而相同的時間戳記也會保留在文字中繼資料內，以供下游建立關聯及稽核。完整 JPEG 的大小仍以 32 MiB 為上限。若 `sharp` 無法解碼或合成網格，橋接器會回復至個別 JPEG 影格；用戶端中止仍會傳遞至聯絡表作業。

升級證據會刻意與合成的影像合成微基準測試分開。`scripts/perf/video-bridge-contact-sheet-eval.ts` 為真實的 OpenAI 相容視覺模型定義具結構描述版本控管的 A/B 測試工具。它會測量提供者回報的權杖數、端對端實際延遲時間（包括聯絡表合成）、模型呼叫次數，以及資訊清單所定義的事實保留率。原始模型回應不會寫入報告；僅保留 SHA-256 摘要與相符的事實 ID。除非傳入 `--execute-real`，並已設定 `--model`、`OMNIROUTE_BASE_URL` 與 `OMNIROUTE_API_KEY`，否則此測試工具不會發出任何網路或付費模型呼叫。若未明確執行該真實測試，其機器可讀的判定結果會維持 `HOLD`；僅憑合成承載資料／呼叫次數的測量結果，不構成升級證據。

當呼叫端已擁有對齊的文字時，可在支援的視訊部分附加選用的 `transcript.cues` 陣列。每個提示都必須包含 `text`、位於探測所得持續時間內的有限 `start`／`end` 區間，以及允許清單中的 `source`（`client`、`embedded` 或 `audio-bridge`）；`confidence` 預設為 `1`，且必須介於 `0` 與 `1` 之間。完全相同的重複提示會合併。OmniRoute 絕不會根據此中繼資料啟動轉錄：經驗證的提示會連同來源、信賴度與區間一起複製至描述結果，並作為不受信任的觀察結果，與影格字幕一併呈現。無效、超出範圍或缺少出處的文字會遭到拒絕，而非混入字幕串流。兩個請求本文轉錄通道都會將所提供的出處正規化為 `client`，其中也包括自行宣稱的 `embedded` 或 `audio-bridge` 標籤。只有伺服器所擁有的配接器，才能透過僅限程式碼使用的 `trustedSource` 引數指派這些受信任標籤；請求中的 JSON 欄位無法傳入該引數。無論出處為何，轉錄文字仍是不受信任且衍生自媒體的內容，絕不能用來決定授權。

進階呼叫端可為同一段影片提供 `audioTranscript` 軌道；
它會被視為用戶端提供的文字，而不是伺服器轉錄的證明。
融合接合點會在同一個截止時間與中止訊號下執行視覺和音訊觀察，
依共同時間軸排序、合併完全重複的項目，並在只有一側成功時
回報部分結果。無效的 `audioTranscript` 會降級為該部分結果——保留
視覺描述，且音訊分支會記錄經過淨化的失敗代碼——而不是讓整段影片
處理失敗。各分支的可用性、部分結果旗標，以及經過淨化的失敗代碼，
都會保留在描述結果、護欄中繼資料（`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`）、結果快取中繼資料，以及橋接器
融合計數器中。預設的 Video Bridge 路徑不會叫用語音轉文字，
也不會下載第二份媒體副本；若沒有該明確軌道，則仍然
僅處理影片。

**逐字稿保留（#12150 P1）。** 每當 Video Bridge（其本身需選擇啟用）
呈現逐字稿提示時，便會自動套用此機制——沒有獨立的
保留旗標。當請求呈現任何逐字稿提示（呼叫端宣告的
`transcript` 或融合後的 `audioTranscript`）時，護欄會將其標記為
`videoBridgeObserved`，並產生影片描述的遮蔽影子——
一份完全相同的呈現結果，其中每個提示的自由文字正文都會替換為
`[redacted-video-transcript]`；此結果是在組合字串之前，透過替換結構化提示欄位
所建立（絕不解析攤平後的文字，因此任何提示內容——無論是對抗性或一般內容，
包括含有 `]` 的正文，例如 `[inaudible]`/`[music]`——都無法保留下來）。
持久化呼叫記錄的請求主體會根據內容相等性比對，將每個衍生自影片的
文字部分換成該遮蔽影子；`fullText` 錨點會從完成後的呼叫前護欄
承載資料中重新讀取，因此即使後續鏈式護欄（PII 與
憑證遮罩器，優先順序 10/95）就地改寫描述文字，且
系統提示詞／交接／記憶體注入重塑訊息陣列之後，比對仍能成功。
傳送至上游模型的主體不會變更。已觀察的請求也不會填入
任何持久性 Memory（會略過衍生自請求與回應的擷取），
因此模型本身的回覆無法將逐字稿文字回顯至 Memory。

**原始影片欄位（#12430）。** 啟用橋接器，且原生影片支援未知或不存在時，已定義的 `transcript`/`audioTranscript` 欄位也會啟用 `videoBridgeObserved`，即使描述失敗或達到 `maxVideos` 限制亦然。`null` 和空字串也算；缺少的欄位與非影片中繼資料則不算。保留的副本會遮蔽這些欄位或省略請求，且會繞過快取／Memory。

在這些後援路徑上，有效的呼叫端提示會成為受支援的 `text`/`input_text`
部分，而不是非標準的提供者欄位。請求提供的兩個軌道都仍是不受信任的
`client` 觀察結果，並附有明確警告，指出影片未經描述，且時間戳記
未與媒體核對。既有的 256 個提示／總計 64-KiB，以及每個提示的預算，
會同時套用至兩個軌道；時間戳記必須符合代理程式的 600 秒上限，以及任何
提供的焦點視窗。無效軌道會被捨棄，而不會當作任意文字轉送；除非兩者的
合併預算超標，否則仍可使用有效的同層軌道。Null／空欄位不會新增文字。
此後援機制不會新增任何媒體擷取或轉錄。逐字稿擴充欄位會從後援影片載體
及其 `video_url`/`source` 物件中移除。OpenAI 線路允許清單仍維持嚴格；
原生支援狀態未知的影片載體仍然可用，而已知的純文字目標則保留安全標記。
結構化遮蔽影子會保護附加的逐字稿文字，同時保持呼叫端擁有的原始請求
不變。支援原生處理的目標與已停用的橋接器會維持其既有的繞過行為。

其他保留副本會使用相同的已觀察請求訊號。護欄前的原始用戶端請求快照、
記憶體內待處理請求，以及早期遭拒請求記錄，都會以結構化方式替換影片部分
中的逐字稿欄位；由管線階段與情境交接合成的字串提示，則會在持久化請求主體
接收端進行遮蔽。持久化的 `video_content_removed` 標記會讓
`previous_response_id` 接續以失敗關閉，而不是重建刻意捨棄的文字。
如果已觀察請求在記錄前遺失其逐部分遮蔽影子，或數個影片影子中即使只有
一個在後續請求變更後無法比對，則會完全省略保留的請求主體，而不是保留
僅部分遮蔽的逐字稿。

對於已觀察的請求，模型回應可能會引用逐字稿的任何部分，而沒有結構化的
提示邊界。因此，其持久化呼叫記錄 `responseBody` 會替換為省略標記；
詳細的管線產物（可能包含上游／用戶端主體與串流區塊）不會保留。
語意、冪等性與推理重播快取都會針對該請求繞過讀取與寫入。
提供者請求與用戶端可見的回應不會變更。省略詳細產物時，早期 keepalive
位元組會從暫存緩衝區中排空。Kiro 的格式錯誤 EventStream
警告只會回報承載資料的位元組數，絕不回報其內容或 JSON
剖析器的原始錯誤。
這並不表示每個不相關的提供者／外掛程式診斷都已完成稽核；
更廣泛的保留接收端全面檢查正在 #11658 中追蹤。

內部的 `/api/modality-bridge/video/drilldown` 生命週期是一個獨立、經由迴送/token 驗證的快取基礎層。每個操作也都需要一個標準的不透明主體 ID。在啟用正式環境呼叫端之前，它必須從已驗證的租用戶衍生該 ID，且絕不能轉送由用戶端選取的值。快取鍵會將該主體繫結至標準的工作階段與影片參照 ID，僅儲存其經 SHA-256 衍生的鍵，並將讀取與刪除作業都限定於同一主體。快取中的每個項目最多儲存 16 個衍生的 JPEG 影格，並在十分鐘後使其過期，且支援有界的 `start`/`end` 讀取或明確刪除工作階段。

每個主體最多可有 16 個項目，以及 64 MiB 的標準 JPEG 資料。這些限制獨立於全域的 64 個項目/256 MiB 上限：主體配額壓力只會先逐出該主體最近最少使用的項目，之後才考慮全域 LRU 逐出。快取活動發生時，會從主體與全域計量中清除過期項目，而取消與驗證失敗不會提交部分替換結果。

快取會拒絕非標準 Base64、過多填補、非 JPEG 媒體、格式錯誤或截斷的 JPEG，以及在使用 `sharp` 進行有界完整影像解碼期間產生警告的 JPEG。它會將每個接受的影像重新編碼為標準 JPEG，從解碼後的位元組衍生寬度與高度，而非信任呼叫端欄位，並捨棄任何尾隨的多格式混合位元組，而不予保留。只有有界的標準壓縮緩衝區會計入兩種配額。JSON 傳輸限制包含 32 MiB 解碼輸入上限所需的 Base64 額外負擔。每個儲存的衍生結果都會記錄其經驗證的 JPEG 格式/解析度、取樣政策、衍生版本、建立時間、伺服器計算的內容雜湊，以及經雜湊的父參照與受信任呼叫端提供的父內容雜湊。在不可分割的快取提交之前，會在非同步解碼/雜湊階段之間檢查取消狀態。

此階段尚未將正式環境的產生端連接至該路由，也未提供多解析度變體選擇。因此，透明的 Video Bridge 請求路徑不會增加任何工作，而受租用戶約束的主體衍生，以及完整的 FU-08 多解析度生命週期，仍明確屬於後續工作，而非記錄為已完成的行為。

影格會使用已設定的 Video 模型依序產生字幕。空白的 Video 覆寫值會繼承 Vision 設定；若兩者皆為空白，則由 Vision 自動路由器選取實際採用且支援視覺功能的模型。成功產生的字幕會以穩定的 `[Video description:` 前綴取代原始部分；該前綴也會將文字標示為源自不受信任媒體的觀察內容，並告知下游模型不要遵循媒體中出現的指示。影格字幕快取鍵包含 JPEG 位元組、提示詞、時間戳記與實際採用的模型；只有成功產生的字幕才會被快取。快取項目會保留實際成功的產生端模型，包括後援模型；當不同影格由不同模型產生時，Bridge 會回報 `mixed`。快取命中時會重用該產生端身分，而不會將其重新標示為所要求的路由方案。整部影片的結果快取會根據每個會改變輸出的輸入建立鍵值，包括提示詞、實際採用的模型、取樣政策、影格數、語意分析模式、正規化焦點提示的 SHA-256 指紋、焦點視窗、`transcript`、`audioTranscript` 與聯絡表旗標，因此只要其中任何維度有所變更，就會造成快取未命中，絕不會重用過時結果。視覺去重複政策版本、閾值與有界候選影格數也會明確納入結果快取鍵與中繼資料；因此，政策變更無法重用過時的整部影片描述。結果快取 v4 中繼資料會保留模式與指紋，但絕不保留原始使用者任務。防護機制中繼資料會同時回報要求的分析模式與實際採用的分析模式；若要求 `focused` 模式但沒有可用的使用者文字，則會回報實際採用 `full` 模式。

防護機制會擷取每個受支援的影片部分，但描述的影片數不會超過 `modalityBridgeVideoMaxVideos`。對於已證實 `supportsVideo === false` 的目標，處理失敗與超出限制的影片會轉換成明確且安全的文字標記，確保不會保留任何原始影片。當功能支援狀態未知時，這些部分會保留其影片載體；任何後援逐字稿都會遵循上述有界文字轉換。`supportsVideo === true` 的目標會略過 Bridge。用戶端請求的中止訊號會傳播至下載、代理程式佇列、子行程與字幕呼叫；中止會在影片之間停止處理，且絕不會以開放失效方式傳遞原始媒體。

執行階段設定由資料庫支援，並經 Zod 驗證：

| 鍵                                  | 預設值      | 範圍／行為                                                                           |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | 選用的執行階段功能，需明確啟用                                                       |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 保留通用字幕；`focused` 使用有界且不受信任的最新使用者內容                    |
| `modalityBridgeVideoModel`          | `""`        | 繼承 Vision Bridge 模型                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware`，或按比例的 `segment_aware`；偵測器失敗時會退回至 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                                     |

舊版持久化的 Video 逾時值若超過 120 秒，會被限制為代理程式的截止時間；
新設定若寫入超過此限制的值，則會遭到拒絕。
`GET /api/modality-bridge/video/runtime` 在驗證或探查執行階段之前，
要求可信任且已加蓋標記的回送本機性，之後還需要管理驗證。
它只會回傳 `available`、經清理的 FFmpeg/ffprobe 版本，以及執行階段無法使用時的固定原因。
內部擷取端點並非公開上傳 API：佇列飽和時會回傳 `503` 及 `Retry-After`，
呼叫端中斷連線時會回傳 `499`，固定代理程式截止時間到期時則會回傳 `504`。轉換後的回應會將
`video->text;model=<visionModel>;parts=<videos>` 新增至中央
`x-omniroute-modality-bridge` 標頭，而不移除 Vision 或 Audio 區段。

### PII 遮罩器（`piiMasker.ts`）

會在**兩個**階段執行。

- **`preCall`** 會複製承載資料、巡覽 `system`、`messages`、`input` 與
  `prompt`（包括純字串項目），並對字串 `content`／`text` 欄位套用
  `processPII()`（來自 `@/shared/utils/inputSanitizer`）。當
  `PII_REDACTION_ENABLED=true` 時，偵測到的 PII 會在送出的承載資料中被遮蔽。
  這與 `INPUT_SANITIZER_MODE` 無關（後者只控制提示注入政策）。
  關閉遮蔽時，呼叫會記錄偵測計數，但不會改寫內容。
- **`postCall`** 會深層複製回應、執行 `sanitizePIIResponse()`，以及
  Responses API 結構遮罩器（`maskResponsesOutput`——涵蓋
  `output_text` 與 `output[].content[].text`）。若發生任何遮蔽，
  修改後的回應會取代原始回應。

此防護機制絕不會封鎖；它只會加上註記（`meta.detections`、
`meta.redacted`）或進行改寫。

#### 依類型選擇、自訂模式與偵測計數器

**儀表板 → 設定 → 安全性 → PII 遮罩**用於選擇要遮蔽的_內容_。
它不會啟用遮罩：啟用仍分別由 `PII_REDACTION_ENABLED`（請求）與
`PII_RESPONSE_SANITIZATION`（回應 + SSE）控制，兩者預設皆為關閉。

- **依類型選擇**——內建 ID 列於
  `src/shared/constants/piiTypes.ts`（`PII_BUILTIN_TYPES`）。未設定表示所有
  類型（此設定存在之前的行為）。請求引擎的
  `ssn_us` 模式會對應至 `ssn`。範本（Minimal、Standard、Financial、
  Brazilian、USA、Full）只會在 UI 中填入核取方塊。
- **自訂模式**——最多可有 20 個規則運算式或萬用字元模式（`*` = 最多 64 個
  非空白字元，`?` = 一個字元）。相符項目會變成 `[CUSTOM_REDACTED]`。
  每個模式都會經過 `compilePiiCustomPattern()`
  （`src/shared/utils/piiCustomPatterns.ts`）處理：長度最多 500 個字元，旗標僅限
  `g i m s u`、必須可編譯、必須通過 `safe-regex`（災難性
  回溯）檢查，且不得與空字串或遮蔽預留位置相符。
  不合格的模式在儲存與測試時都會遭到拒絕；已儲存但不合格的資料列
  在執行階段會被略過，而不會進行編譯。自訂模式只會在遮罩啟用時執行。
- **偵測計數器**——依類型計數（絕不包含相符值），保存在
  記憶體中，並於重新啟動時重設（`src/lib/pii/piiDetectionStats.ts`）。它們只會
  在遮罩啟用時增加。

設定儲存於 `key_value` 資料表（命名空間 `pii_settings`，
`src/lib/db/piiSettings.ts`），並透過 1 秒快取讀取。API：

| 方法   | 路徑                     | 用途                                                        |
| ------ | ------------------------ | ----------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | 旗標狀態、`enabledTypes`、`customPatterns`、偵測計數器      |
| `PUT`  | `/api/settings/pii`      | 取代 `enabledTypes`（`null` = 全部）及／或 `customPatterns` |
| `POST` | `/api/settings/pii/test` | 以最多 8 KB 的範例對單一模式進行試執行；不會儲存任何內容    |

這三者都需要管理驗證，並使用 Zod
（`src/shared/validation/schemas/piiSettings.ts`）驗證主體。

### 提示注入（`promptInjection.ts`）

偵測使用者提供內容中的對抗性結構，並強制執行已設定的政策。
其行為由環境變數與建構函式選項決定：

| 設定     | 環境變數                                                                                            | 預設值 | 效果                                                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 啟用     | `INPUT_SANITIZER_ENABLED`                                                                           | `true` | 設為 `false` 時，防護機制會直接略過。                                                                                                               |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn` | 注入政策：`block`、`warn` 或 `log`。（為了向後相容，也接受 `redact`，但它**不會**移除注入文字；請求中的 PII 重寫由 `PII_REDACTION_ENABLED` 控制。） |
| 封鎖閾值 | `blockThreshold` 選項 / `INPUT_SANITIZER_BLOCK_THRESHOLD`（別名 `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high` | 觸發封鎖所需的最低嚴重程度。使用預設值時，`Medium` 僅供觀察。                                                                                       |

**模式優先順序**（`getMode`）：呼叫端的 `options.mode` →
`INJECTION_GUARD_MODE` **資料庫功能旗標覆寫**（Dashboard → Settings →
Feature Flags）→ `INJECTION_GUARD_MODE` 環境變數 → `INPUT_SANITIZER_MODE` 環境變數 →
`warn`。因此，儀表板覆寫的優先順序高於環境變數，讓 Feature
Flags UI 能即時控制執行中的防護機制（無須重新啟動）。資料庫讀取採用故障安全機制：
若發生錯誤，防護機制會回退至基於環境變數的行為；若未設定任何
覆寫，其行為會與僅使用環境變數進行解析時完全相同。

偵測來源：

1. 來自 `@/shared/utils/inputSanitizer` 的 `sanitizeRequest()`（在管線其他位置
   使用的共用偵測器集合）。
2. 內建的 `DEFAULT_GUARD_PATTERNS`（目前為 `system_override_inline` 與
   `markdown_system_block`，兩者的嚴重程度皆為 `high`）。
3. 透過建構函式選項傳入的選用 `customPatterns`（字串、正規表示式，
   或 `{ name, pattern, severity }` 記錄）。

當 `mode === "block"`，**且**至少有一項偵測結果達到嚴重程度
閾值時，`preCall` 會傳回 `{ block: true, message: "Request rejected:
suspicious content detected" }`。在 `warn`/`log` 模式下，防護機制會記錄事件，但
允許呼叫繼續執行。另有匯出的共用輔助函式 `evaluatePromptInjection()`，
供需要在不經過登錄機制的情況下評估提示詞的呼叫端使用。

**掃描上限（v3.8.20）：**偵測器只會檢查合併後提示文字的**前 16 KB** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384 位元組），定義於
`src/shared/utils/inputSanitizer.ts`。`detectInjection()` 與
`evaluatePromptInjection()` 都會在執行模式迴圈之前呼叫
`slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令通常位於輸入內容的前段，因此這項
限制可約束數百 KB 酬載上的正規表示式 CPU/GC 用量，而不會削弱偵測能力（參見
#3932、#4041）。

### 憑證遮罩器（`credentialMasker.ts`）

在**兩個**階段中執行，並且是預設鏈中的最後一項（優先順序為 `95`）。它會從
向外傳送的酬載（訊息內容、工具呼叫引數、工具結果）**以及**提供者回應中遮蔽
常見的 API 金鑰／祕密權杖模式，因此貼入提示詞的憑證（或由工具結果回傳的憑證）
不會洩漏給上游提供者或傳回用戶端。

- **僅限選擇啟用**，其慣例與 PII 遮蔽相同（與硬性規則 #20 相關）：
  除非 `settings.credentialRedactionEnabled === true` **或**
  `CREDENTIAL_REDACTION_ENABLED=true`，否則停用。停用時，此防護機制不會執行任何操作 —
  絕不封鎖，也絕不重寫。
- `redactCredentials()` 會遍歷完整的酬載／回應樹狀結構（`walkValue()`，
  可防止原型污染，並透過 `WeakSet` 安全處理循環參照），將相符項目替換為
  `[REDACTED:<type>]` 預留位置，且僅複製實際發生變更的分支。
- `CREDENTIAL_PATTERNS` 涵蓋 LLM 提供者金鑰（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaS 權杖（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、付款金鑰（Stripe、Square）、雲端
  金鑰（AWS 存取金鑰、Twilio、SendGrid、Mailgun）、私密金鑰／JWT、
  包含憑證的連線字串（`mongodb://user:pass@...` 等），以及通用的
  `Authorization`/`x-api-key`/`api-key`/`apikey` 標頭值
  模式。類似標頭的鍵（`authorization`、`x-api-key`、`api-key`、
  `apikey`）會以結構化方式進行遮蔽（僅遮蔽值，並保留
  `Bearer `/`Basic ` 等配置前綴），而非透過通用文字正規表示式處理。
- 此防護機制絕不封鎖；它只會重寫（`modifiedPayload` /
  `modifiedResponse`）並加上註釋（`meta.credentialsRedacted`、`meta.count`）。

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
  block?: boolean; // true 會使鏈結短路
  message?: string; // 阻擋時顯示
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // 由 preCall 傳回以重寫請求
  modifiedResponse?: TValue; // 由 postCall 傳回以重寫回應
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

防護欄可透過傳回 `void`、`{}` 或 `{ block: false }` 來表示「無變更」。傳回 `modifiedPayload`/`modifiedResponse` 會取代沿著鏈結傳遞給下游防護欄的值。
`signal?: AbortSignal` 會將呼叫端的生命週期帶入防護欄。請求中止是刻意設計的開放式失敗例外：媒體橋接器會停止工作並執行清理，而不會將原始媒體還原至已知不支援該媒體的目標。

## 登錄檔（`registry.ts`）

單例 `guardrailRegistry` 提供：

- `register(guardrail)` — 新增防護欄（或依正規化名稱取代現有防護欄），並依 `priority` 升冪重新排序。
- `clear()` / `list()` — 管理輔助方法。
- `runPreCallHooks(payload, context)` — 逐一執行啟用中的防護欄，透過 `modifiedPayload` 傳遞酬載，並在第一個 `block: true` 時停止。
- `runPostCallHooks(response, context)` — 在回應端執行相同流程。
- `resetGuardrailsForTests({ registerDefaults })` — 清除狀態，並可選擇重新註冊預設防護欄，以確保測試彼此完全隔離。

兩個執行器都會傳回 `{ blocked, payload|response, results, guardrail?, message? }`，其中 `results` 是 `GuardrailExecutionResult` 記錄陣列，包含每個防護欄的 `blocked`、`skipped`、`modified`、`error` 與 `meta` 欄位，便於追蹤。

### 針對個別請求停用防護欄

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` 會彙整目前請求中應略過的防護欄名稱，並移除重複項目。來源如下（全部皆為選用，且會全部合併）：

- `apiKeyInfo.disabledGuardrails`
- 請求主體的 `disabledGuardrails`（頂層）
- 請求主體的 `metadata.disabledGuardrails`
- 標頭 `x-omniroute-disabled-guardrails`（或舊版
  `x-disabled-guardrails`）

值可以是字串陣列或以逗號分隔的字串；名稱會正規化為小寫 kebab-case（`pii_masker` → `pii-masker`）。結果會透過 `context.disabledGuardrails` 傳遞至登錄檔，登錄檔會略過相符的防護欄（在 `results` 中標記為 `skipped: true`）。

## 執行順序

對於每個流經 `src/sse/handlers/chat.ts` 和
`open-sse/handlers/chatCore.ts` 的請求：

1. `resolveDisabledGuardrails(...)` 根據 API 金鑰、請求本文和標頭建立略過清單。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` 依優先順序由低至高執行護欄：
   - 停用的護欄會被記錄為 `skipped`。
   - 每個護欄的 `preCall` 都可以透過 `modifiedPayload` 改寫承載資料。
   - 第一個 `block: true` 會使鏈結短路，處理常式會傳回護欄拒絕回應。
3. （可能已改寫的）承載資料會進入組合路由及上游分派。
4. 組合回應後，`guardrailRegistry.runPostCallHooks(...)`
   會對回應執行相同的鏈結。此處的 `block: true` 會捨棄上游回應。

擲回例外的護欄會以 `error: <message>` 記錄，並透過
`logger.warn` 寫入日誌，但鏈結仍會繼續執行——此設計採用失敗開放原則。

## 組態

內建護欄所讀取的環境變數：

| 變數                                  | 使用者               | 效果                                                                   |
| ------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`   | 設為 `false` 可完全停用偵測。                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`   | 注入政策：`warn`、`block` 或 `log`。舊版值 `redact` 不會改寫注入文字。 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`   | 注入護欄的模式；同時也是會**覆寫**環境變數的 DB 功能旗標（DB > ENV）。 |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`   | `MODE=block` 拒絕請求的最低嚴重性：`high`（預設）、`medium` 或 `low`。 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`   | `INPUT_SANITIZER_BLOCK_THRESHOLD` 的舊版別名。                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`         | 設為 `true` 時，將遮蔽請求中的 PII（與注入模式無關）。                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（下游） | 控制回應端遮蔽器的行為。                                               |

Modality Bridge 護欄會從由 DB 支援的設定儲存區（`getSettings()`）讀取執行階段組態，而非環境變數。Vision 的主要鍵為
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes` 和
`modalityBridgeCacheMaxEntries`。舊版
`visionBridge*` 鍵僅作為文件所述、為期一個週期的讀取後備方案；儀表板寫入時會使用主要鍵。預設值和後備解析器位於 `src/shared/constants/modalityBridgeDefaults.ts`，舊版常數則保留於 `src/shared/constants/visionBridgeDefaults.ts`。

Audio 使用 `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout` 和 `modalityBridgeAudioMaxClips`，並搭配共用的
`modalityBridgeCache*` 設定。Audio 沒有舊版鍵後備方案，因為這些鍵是隨 Modality Bridge 結構描述一同引入的。

Video 使用 `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos` 和
`modalityBridgeVideoTimeout`，並搭配共用的 `modalityBridgeCache*` 設定。
其預設為停用，因為 FFmpeg/ffprobe 是選用的作業相依項目，而且畫面字幕生成會增加延遲和模型成本。

## 自訂護欄

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

1. 建立繼承 `BaseGuardrail` 的 `src/lib/guardrails/myGuardrail.ts`。
2. 實作 `preCall` 和／或 `postCall`。
3. 可在匯入時註冊（從 `registerDefaultGuardrails` 推送），或在執行階段
   呼叫 `guardrailRegistry.register(...)`——登錄檔會取代任何具有相同正規化名稱的
   既有護欄。
4. 在 `tests/unit/` 下新增測試（現有範例：
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## 測試

在各測試之間使用 `resetGuardrailsForTests()`，以從已知狀態開始。
傳入 `{ registerDefaults: false }` 可從空白登錄檔開始，並僅註冊受測護欄。
Vision Bridge 支援相依性注入（`deps.getSettings`、`deps.callVisionModel`）；
Audio Bridge 則公開用於設定、功能、STT 模型選擇、憑證檢查及轉錄的
對等介面。因此，測試可在不存取資料庫或網路的情況下執行這兩種流程。

## 另請參閱

- `src/lib/guardrails/` — 實作
- `src/shared/utils/inputSanitizer.ts` — 支援提示注入偵測與 PII 遮蔽的共用偵測器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge 預設值及
  強制橋接模型清單
- `src/shared/constants/modalityBridgeDefaults.ts` — 共用的 Vision/Audio 執行階段預設值
- `docs/architecture/RESILIENCE_GUIDE.md` — 正交層（斷路器、冷卻時間）
- `docs/reference/ENVIRONMENT.md` — 完整環境變數參考

## 注入護欄的路由涵蓋範圍與紅隊測試（第 8 階段 · 區塊 D）

注入護欄（`createInjectionGuard` / `withInjectionGuard`）涵蓋所有
接受使用者提示的路由。它遵循 `INJECTION_GUARD_MODE`（預設為 `warn` = 僅記錄；
`block` = 傳回 HTTP 400 `SECURITY_001`）。

| 類型         | 路由                                                                                                                                                 | 預設模式 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 文字（既有） | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn     |
| 生成式       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn     |
| 資料         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn     |

文字擷取（`extractMessageContents`）涵蓋 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`。

**紅隊測試（每晚執行，`nightly-llm-security.yml`）：** promptfoo 會驗證每個路由在
`INJECTION_GUARD_MODE=block` 下皆會封鎖 OWASP-LLM 語料庫；garak 則執行探測
（沒有密鑰時跳過）。為維持一致性，`moderations` 也包含在內——使用封鎖模式的
運維人員可透過 `resolveDisabledGuardrails` 將其豁免。

每晚執行的工作流程（`.github/workflows/nightly-llm-security.yml`，cron + 手動
觸發）包含兩個作業：

- **`promptfoo-guard`（阻斷性）**——使用 `INJECTION_GUARD_MODE=block`
  執行 `promptfoo eval -c promptfooconfig.yaml`。每個對抗性案例（例如「忽略所有
  先前指示……」、DAN 風格越獄）都會斷言回應包含
  `error.code === "SECURITY_001"`，也就是護欄確實拒絕了該請求。
- **`garak`（建議性）**——針對本機 OmniRoute 執行個體
  （`http://localhost:20128/v1`）執行 garak `--probes promptinject,dan,leakreplay`。
  此作業以提供者密鑰（`PROMPTFOO_PROVIDER_KEY`）作為執行條件；若無密鑰則妥善跳過，
  並加上 `|| true` 後綴，因此它只會回報結果，而不會導致 CI 失敗。

護欄輔助函式（`createInjectionGuard` / `withInjectionGuard`）的涵蓋範圍
包括每個含提示內容的 `/v1` 路由；提示文字由
`src/shared/utils/inputSanitizer.ts` 中的 `extractMessageContents()` 從
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
擷取。
