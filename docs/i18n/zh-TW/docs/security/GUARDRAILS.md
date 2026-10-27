# Guardrails (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md)

---

> **真實來源:** `src/lib/guardrails/`
> **最後更新:** 2026-10-17 — v3.8.52(新增[涵蓋範圍與限制](#coverage-and-limits):
> 說明 hooks 觸及哪些路由與回應路徑、合併的停用標頭(#16412)、作為強制邊界的注入封鎖模式(#16413),以及在 post-call 之前哪些元件會看到回應)

Guardrails 在 OmniRoute 與上游提供者之間的邊界強制執行安全、政策與內容轉換。每個 guardrail 都能檢查(並選擇性地拒絕、轉換或註解)請求負載(`preCall`)與上游回應(`postCall`)。

本系統採用**失敗開放(fail-open)**設計:若某個 guardrail 在執行時拋出例外,註冊表會記錄該錯誤並繼續執行下一個 guardrail,而不是讓請求失敗。封鎖是一項明確的決定(`block: true`),絕非意外。唯一的例外是已中止的請求:當呼叫方的 `signal` 被中止時,拋出例外的 guardrail 會使 hook 執行被拒絕,而不是被略過。

這些 hooks **並不**會在每個路由或每個回應上執行。在將 guardrail 當作安全控制手段來依賴之前,請先閱讀[涵蓋範圍與限制](#coverage-and-limits)。

## 內建 Guardrails

註冊表會在匯入時依優先順序自動載入六個 guardrails
(見 `registry.ts` → `registerDefaultGuardrails()`):

| 優先級 | 名稱                | 階段           | 檔案                  |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先級數字較小者**優先**執行。

### Vision Bridge(`visionBridge.ts`)— Modality Bridge PR-1

GLM 5.3 基礎模型與 `glm-5.3-{low,high,max}` 在註冊表/規格元資料中帶有明確的 `supportsVision:false`。GLM 5.3 Flash 變體仍為原生視覺模型。Claude Code 的 `/v1/messages` 路由會在 Claude-to-OpenAI 轉換**之前**進入共用的 `handleChat` 呼叫前 guardrail 鏈;巢狀的 `Read` 工具結果圖片必須在該轉換將它們提升為 OpenAI `image_url` 內容之前先被描述或處理(#17069)。

攔截針對**非視覺模型**且攜帶圖片的請求,並將整個請求重新導向至具視覺能力的模型,或在上游呼叫之前,以可設定的視覺模型所產生的文字描述取代圖片部分。這讓純文字提供者能透明地處理多模態負載。

流程:

1. 若目標模型已支援視覺則跳過(除非它出現在強制橋接清單
   `isVisionBridgeForcedModel` 中)。
2. 透過 `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`)擷取圖片部分,它會委派給
   `open-sse/utils/mediaParts.ts` 中的**統一媒體偵測器**
   `detectMediaParts()`——這是與 combo 相容性過濾器共用的單一真實來源。
   擷取僅允許 `replaceImageParts` 能夠接回的形狀
   (extract↔replace 合約):OpenAI `image_url`、Anthropic base64
   `source.type:"base64"`、Anthropic URL `source.type:"url"`,以及
   Responses API `input_image`。巢狀於 Claude Code
   `tool_result.content` 與 Responses 工具輸出中的相符圖片
   也會被擷取,並在其原始路徑處替換;僅作指標用的形狀屬於
   combo 過濾器的素材,不會被擷取。
   若未找到任何圖片則跳過。
3. 透過 `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`)解析執行階段設定:
   新的 `modalityBridge*` 設定鍵優先;舊的 `visionBridge*` 鍵仍作為
   **單一週期回退**(回滾窗口)。當橋接停用時,在任何媒體遍歷
   之前即跳過。
4. 模式選擇器(`modalityBridgeVisionMode`,見下表)決定重新導向或
   描述。重新導向會回傳僅替換了 `model` 的 `modifiedPayload`,
   並附上 meta `{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑:將圖片數量限制在 `maxImages` 以內,組成具任務感知的提示,
   查詢描述快取,**平行**呼叫視覺模型
   (`Promise.allSettled`),並在其原位置注入
   `[Image N]: <description>` 文字部分。描述失敗會產生 `null`:
   原始圖片會為未知/具視覺能力的目標保留(#4012),但
   **已確認的純文字直接目標**或零視覺 combo 會為
   每張未描述的圖片取得明確的
   `(unavailable — no vision-capable provider connected)` 文字佔位,
   包括部分失敗以及超出描述呼叫上限的圖片(#17069)。
   現有的全數失敗 combo 描述回退機制維持不變(#8430)。
6. 回傳 `modifiedPayload` 加上 meta(`imagesProcessed`、`descriptions`、
   `processingTimeMs`、`visionModel`)。

#### 模式選擇器(`modalityBridgeVisionMode`)

| 模式       | 預設 | 行為                                                                                                                                                                                   |
| ---------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔    | 舊版啟發式邏輯,維持不變(#6640/#7204):非 combo/`auto/` 模型會重新導向至最佳視覺模型,除非原始模型已具備可用的憑證(則改為 describe);combo 目標一律執行 describe。                         |
| `describe` |      | 一律執行 describe — 完全跳過重新導向區塊;使用者所選的模型一律負責回答。                                                                                                                |
| `reroute`  |      | 強制重新導向:略過保留具憑證模型的防護機制。重新導向**目標**的憑證防護仍然適用 — 當不存在可用的視覺目標時,橋接器會以明確的錯誤加以阻擋,而非執行 describe 或將原始圖片傳送給純文字目標。 |

強制模式會在 auto 啟發式邏輯執行**之前**即短路;`auto` 的行為與
PR-1 之前的防護機制逐位元組完全一致。

#### API 金鑰範圍(`visionBridgeKeyScope.ts`)

當呼叫方的 API 金鑰限制 `allowedConnections`、配額池
(`allowedQuotas`)或模型(`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`)時,橋接器只會
挑選該金鑰可使用的重新導向與 describe 模型,且僅透過該金鑰
可使用的連線。describe 呼叫接著一律透過帶有
`x-omniroute-self-loop-key-id` 標頭的 OmniRoute 自迴路(self-loop)進行,
因此接收端的聊天請求會再次強制執行該金鑰的連線與模型政策。`enforceApiKeyPolicy()`
僅在與自迴路 bearer 同時存在時才採認該標頭,因此它只能
縮小存取範圍,而無法解析的 id 會被拒絕。

若該金鑰未獲准使用任何視覺模型,**已確認的純文字
目標**會在本機以明確的 HTTP 400 拒絕圖片請求,而非
將圖片位元組轉發給無法處理的上游(#17069)。對於視覺能力
未知或原生支援視覺的目標,describe 路徑保留其先前的
失敗開放(fail-open)行為(meta `{ skipped: true, reason: "no_permitted_vision_model" }`)。
沒有金鑰的請求,以及沒有這些限制的金鑰,行為與之前
完全相同。

#### 任務感知 describe 提示(`modalityBridgeVisionTaskAware`)

預設為 **true**。`composeVisionPrompt()`(`visionBridgeHelpers.ts`)會將
**最後一則使用者訊息**的文字(截斷至 500 個字元)附加到基礎
describe 提示中,引導描述朝向使用者實際詢問的內容
(codex-vision-proxy 模式),並要求視覺模型轉錄可見的
文字。當旗標關閉 — 或沒有使用者文字 — 時,基礎提示會
原樣使用。

describe 自迴路自身的 OpenAI 相容請求(`visionBridgeHelpers.ts`
中的 `callVisionModelSingle()`)一律請求 `image_url.detail: "high"` —
無條件地,對每個呼叫方/提供者皆然,不受任何客戶端訊號控制。
低細節取樣會降低 OCR 準確度,而這正是此提示所要求的
文字轉錄任務,因此 describe 呼叫本身一律要求高
細節,無論原始入站請求使用什麼細節等級。這
只影響內部 describe 請求主體;它不會改變 OmniRoute
在主要請求上轉發呼叫方自己的 `image_url.detail` 的方式 —
該預設值是獨立套用的,且僅針對偵測到的 OpenCode 客戶端,於
`defaultImageDetail()`(`open-sse/handlers/chatCore/upstreamBody.ts`)中。
describe 自迴路的 Anthropic 線路格式分支沒有 `detail` 欄位,
不受任一預設值影響。

#### Describe 輸出上限(`modalityBridgeVisionMaxChars`)

| 金鑰                           | 預設 | 範圍             |
| ------------------------------ | ---- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`  | `0` 或 100–50000 |

`0`(預設)表示**無上限** — `callVisionModel()` 回傳的
描述會原樣傳遞,保留現有
行為。100–50000 範圍內的任何值會在描述以
`[Image N]: <description>` 的形式被拼接回去之前,以 `…`
後綴將其截斷
(`src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`)。
對於下游模型需要完整轉錄的重細節 OCR 任務,請調高此值;
調低它則可限制話多的視覺模型的 token 用量。
儀表板欄位位於 Vision 分頁的 Advanced 面板
(`ModalityBridgeVisionTab.tsx` 中的 `modality-bridge-max-chars`),
會將 1 到 99 之間的任何值上調至 100 的下限,同時保持明確的
`0` 不變 — `0` 本身即為有效的 Zod 值
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
而不僅僅是「未設定」的預設值。

#### Describe 快取(`modalityBridge/bridgeCache.ts`)

用於 describe 輸出的記憶體內 LRU + TTL 快取,在整個程序範圍內共享。
鍵 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`,採用
長度前綴框架(無欄位邊界碰撞)。模型組成部分是
**已設定的**橋接模型,而非實際回答的模型 —
`callVisionModel` 可能會在內部回退,而按每次嘗試設鍵會使
快取碎片化。失敗的 describe 永不快取。設定:

| 金鑰                            | 預設   | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠端影像正規化(自迴圈 describe/base64 擷取)

當橋接器自行擷取**遠端**影像時 — Anthropic describe 自我呼叫與
claude-wire-format 的 base64 轉換
(`ensureBase64ImagesForClaudeWire`),兩者皆透過
`visionBridgeHelpers.ts` 中的 `fetchRemoteImageAsDataUri()` — 產生的 data
URI 在嵌入視覺模型請求之前,會先通過 `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`)。過大的影像會被縮小至 **2048px 長邊**(與
OpenAI/Anthropic 已在伺服器端套用的調整大小上限一致),可在不改變視覺模型所見內容的
情況下,減少上傳位元組數/延遲。調整大小使用 `sharp`,透過動態匯入載入:在其原生
二進位檔案無法載入的平台上,`normalizeDataUri()` **絕不擲出錯誤** — 它會回退為
原始位元組的直通,因此 describe/base64 轉換路徑始終維持運作。非影像位元組
(未回傳可解碼影像的擷取)也會原封不動地直通。此正規化僅限於橋接器為其自身
自我呼叫所擷取的影像 — 絕不套用至呼叫方的原始直通負載,符合僅限選擇加入的
修改原則(硬性規則 #20)。

#### 設定結構描述 + 遷移

新的 `modalityBridge*` 鍵會在 `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`)中接受 Zod 驗證:`modalityBridgeVisionEnabled`、
`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、
`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、
`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、
`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` 三鍵組,以及
Audio Bridge 使用的 `modalityBridgeAudio*` 群組。遷移
`141_modality_bridge_settings.sql` 會將現有的舊版
`visionBridge*` 值複製到對應的新鍵(具冪等性,絕不覆寫
操作員設定的 `modalityBridge*` 值);舊版鍵在一個發布週期內
仍會被接受作為讀取回退。

#### 透明度標頭 + 統計資料

經 describe 轉換的回應帶有
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(由 `modalityBridge/bridgeStats.ts` 中的 `buildModalityBridgeHeader()` 建構,
並由 `src/sse/handlers/chatHelpers.ts` 中的 `withModalityBridgeHeader()` 加蓋)。
重新路由的請求**不會**帶有標頭 — 負載未經更動,且模型切換已在回應主體的
`model` 欄位中可見。

`GET /api/modality-bridge/stats`(管理驗證,與
`GET /api/settings` 相同層級)會回傳
`vision`、`audio` 和 `video` 的記憶體內每模態計數器
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`。`averageLatencyMs`
以 `latencySamples`(而非所有嘗試)作為分母;沒有計時資訊的作業不會
虛構出零毫秒的樣本。`bridged` 仍是成功轉換的向後相容別名;
失敗的嘗試不會使其遞增。計數器依設計會在程序重新啟動時重設
(屬遙測性質,而非會計)。

#### 儀表板設定

專用的儀表板頁面為
`/dashboard/settings/modality-bridge`。其可透過 URL 定址的 `Vision`、`Audio`
與 `Video` 分頁在切換 `tab` 值時會保留查詢參數。
Vision 分頁公開了啟用、模式、模型選擇(包括自動預設值)、任務感知提示、
進階逾時/影像/描述長度/快取限制、執行時期
計數器,以及受保護的範例請求。Audio 分頁也已上線:它公開了
啟用、含 Auto 的僅限 STT 模型選擇器、逾時/最大片段限制、音訊
計數器,以及 `input_audio` 範例測試。Video 分頁可正常運作:它會回報
FFmpeg/ffprobe 執行時期狀態 — 四種明確 UI 狀態之一(探測進行中或
無法完成時為 `unknown`;在非 loopback
儀表板主機上探測會在用戶端被跳過,此時為 `restricted`;探測
後確認缺失時為 `unavailable`;或附帶 FFmpeg/ffprobe 版本的
`available`)— 持久保存啟用/模型/影格/影片/逾時限制、
將模型選擇器篩選為具視覺能力的模型,並公開影片計數器。

AI 設定下原有的 Vision Bridge 卡片現在是指向新頁面的相容性連結;
它不再保有表單的第二份副本。Media Providers 也會將「影像轉文字」與
「語音轉文字」工作流程連結至對應的 Modality
Bridge 分頁,同時不移除現有的「語音轉文字」遊樂場。

**自迴圈准入繞過:** 當 describe 呼叫透過 OmniRoute
自身的 `/v1` 自迴圈(非標準提供者模型)路由時,子請求會傳送
`x-omniroute-admission-bypass: internal`,並以解析出的自迴圈憑證
進行驗證 — 本機模式下的本機 `sk_omniroute` 哨兵值,或
操作員設定的 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境變數鍵
(#1350),讓 `REQUIRE_API_KEY=true` 的部署仍可執行 describe 呼叫。
此繞過僅對這些確切憑證生效,因此外部用戶端無法利用該
標頭跳過准入。

舊版預設值位於 `src/shared/constants/visionBridgeDefaults.ts`;
新的模式/任務感知/快取預設值與設定解析器位於
`src/shared/constants/modalityBridgeDefaults.ts`。防護機制公開了
`deps` 建構函式選項,讓測試可注入假的 `getSettings` 與
`callVisionModel` 實作。

### Audio Bridge(`audioBridge.ts`)— Modality Bridge PR-3

在攜帶音訊的聊天請求送達未知可接受音訊輸入的目標之前,先行
攔截。它絕不重新路由聊天請求:音訊部分會透過現有的
OpenAI 相容 multipart 端點進行轉錄,所選的聊天模型則
繼續處理文字轉錄稿。

流程:

1. 透過 `getResolvedModelCapabilities()` 解析 `supportsAudio`。明確的
   提供者註冊表中繼資料優先,其次是靜態模型中繼資料,再其次是已同步的
   `modalities_input`。已宣告的輸入清單若不含 `audio` 即為 `false`;
   沒有任何能力證據時維持 `null`。`false` 與 `null` 都會啟用保守橋接,
   而 `true` 則會繞過它。
2. 解析 `modalityBridgeAudio*` 設定,並透過共用的 `detectMediaParts()`
   偵測器,從每則訊息中擷取可替換的頂層音訊部分。支援的傳輸格式為
   OpenAI `input_audio`、`audio_url` 以及 `source.media_type: "audio/*"`。
   巢狀音訊會被偵測以用於路由,但不會被替換路徑移除。處理量受
   `modalityBridgeAudioMaxClips` 上限限制;後續的部分保持不變。
3. 遵循已設定的 `provider/model`,或讓 `selectAudioBridgeModel()` 依穩定的
   目錄順序走訪 `AUDIO_TRANSCRIPTION_PROVIDERS`,並選取第一個具有可用且
   已啟用之提供者憑證的模型。
4. `callAudioTranscription()` 會將 base64/data-URI 音訊轉換為 multipart
   `file`,或透過具 DNS 鎖定與 25 MB 上限的僅限公開出站防護下載遠端
   `audio_url`。接著將檔案與所選模型 POST 到本機 `/v1/audio/transcriptions`
   自迴圈,並以 `resolveSelfLoopBearer()` 驗證。現有的轉錄路由會執行一般的
   憑證查詢、冷卻/速率限制處理以及提供者調度。
5. 成功的呼叫會將其部分替換為 `[Audio N]: <transcript>`。呼叫以
   `Promise.allSettled` 執行:個別失敗會保留該原始音訊部分(#4012 契約)。
   若所有呼叫皆失敗且目標已證實為 `supportsAudio === false`,這些部分會變成
   `[Audio N]: (unavailable — no STT provider connected)`(#8430 契約)。
   對於未知的目標(`null`),全部失敗的結果保持不變。已證實為純文字且
   沒有可用 STT 憑證的目標,會在不發出網路呼叫的情況下收到相同的明確
   佔位內容。

成功的轉錄會使用全程序的 Modality Bridge LRU/TTL 快取。金鑰結合了音訊參考、
穩定的 `audio-transcription` 操作標籤以及所選的 STT 模型;失敗永不快取。
音訊嘗試會更新共用的 `bridged`、`cacheHits`、`failures` 與 `lastUsedAt`
計數器。轉換後的回應帶有
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
未變動的請求不會獲得 Audio Bridge 區段。

執行期設定由資料庫支援並經 Zod 驗證:

| 鍵                            | 預設值  | 範圍          |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | 自動或 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

共用快取仍由 `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes` 與 `modalityBridgeCacheMaxEntries` 控制。

### Video Bridge(`videoBridge.ts`、`videoBridgePipeline.ts`)

在呼叫不具已知原生視訊支援的目標之前,攔截 Chat Completions `messages`
與 Responses API `input` 中的頂層視訊部分。支援的格式為 `input_video`、
`video_url`、`video_source`、HTTPS URL 以及 `data:video/*;base64,...`
資料 URI。文字中的純檔名不會被視為視訊。

`VideoBridgeGuardrail.preCall`(`videoBridge.ts`)負責請求遍歷、
能力/策略檢查、逐請求彙總以及回應負載。逐視訊的工作——取得、完整結果快取、
描述影格序列(會融合任何呼叫者宣告的音訊轉錄),以及逐次嘗試的
指標/中止/清理——隱藏在 `videoBridgePipeline.ts` 的 `processVideoPart`
之後,於 `preCall` 的迴圈內對每個視訊部分呼叫一次。該模組還定義了明確的
連接埠邊界:`VideoMediaBrokerPort`(取得位元組並抽取取樣影格)、
`VideoAudioTranscriptionPort`(將呼叫者宣告的音訊轉錄與取樣字幕融合),
以及 `VideoDrilldownPort`(影格向下鑽取的持久化邊界;尚未接入
`processVideoPart`——目前只有獨立的 `/api/modality-bridge/video/drilldown`
路由會寫入向下鑽取項目)。

公開的 `/v1` 請求路徑永不匯入或叫用子程序。遠端視訊以 50 MiB 為上限下載;
內嵌 base64 視訊有保守的每視訊 36 MiB 解碼上限,使模型/訊息/框架封套
能維持在 50 MiB 的公開 JSON 請求准入限制之內。內嵌長度與解碼大小估算
會在配置前先行檢查。初始遠端 URL 與每次重新導向都必須使用 HTTPS,並採用
現有的僅限公開出站防護與 DNS 鎖定。位元組接著跨越確切的內部
`POST /api/modality-bridge/video/extract` 代理邊界。該路由同時具備
`LOCAL_ONLY` 與 `SPAWN_CAPABLE`,僅接受經逐程序驗證的信任迴路請求,且
永不接受 URL、檔案系統路徑、可執行檔或引數清單。API 主體大小管線與
處理常式的增量主體讀取器各自獨立強制執行 50 MiB 的代理輸入上限。其
有界佇列一次執行一項抽取,允許四個待處理工作,並將待處理輸入上限設為
100 MiB。

在中介器內部,`ffprobe` 讀取的是私有的本機檔案;固定的格式允許清單會排除播放清單與資訊清單(manifest)格式。對於允許的 MOV 系列容器,外部 MOV 資料參照預設維持停用,且固定指令不會選擇啟用它們。`ffprobe` 與 `ffmpeg` 皆使用僅限 `file` 的通訊協定白名單、單一執行緒、固定引數陣列、不經 shell,並從 `PATH` 解析可執行檔。附加圖片封面串流不屬於可播放候選項。所有可播放串流都必須符合限制,並優先採用明確的預設串流,之後才退回確定性的最低索引備援。影片限制為 600 秒、每個維度 8,192 像素,以及 33,554,432 個來源像素。FFmpeg 會取樣 1–16 個中點 JPEG 影格,將長邊縮減至最多 1,024 像素而不放大較小的輸入,且絕不接收 URL。取樣預設為 `uniform`。選用的 `scene_aware` 與實驗性 `segment_aware` 策略會對已驗證的本機串流額外執行一趟固定的 FFmpeg 處理,選取有界限的 `showinfo` 場景時間戳,並在偵測器失敗、逾時、輸出格式錯誤或候選集合為空時,確定性地退回相同的均勻中點。分段感知模式會依已驗證的場景區間按比例分配中點樣本;分段感知的證據與備援行為將於下文詳述。硬性 16 影格上限會在每個策略中於選取完成後套用。當場景感知請求只有一個影格的預算時,會改用作用中完整影片或焦點視窗的均勻中點,並回報 `policyEffective: uniform`:單一所選的場景影格無法同時保留時間軸的兩端。呼叫方可選擇性提供有限的焦點視窗(`start`/`end` 秒);邊界會夾制於媒體時長內,反向或非有限的視窗會被拒絕,且所有取樣策略僅在正規化後的區間內執行。產生的視窗會納入取樣中繼資料與不受信任的說明前綴中,讓下游模型得以區分焦點摘錄與完整時間軸。

語義字幕焦點是一項獨立且明確的設定。預設的 `full` 分析模式保留現有的影格提示詞,且絕不將請求文字轉送給字幕模型。在 `focused` 模式中,橋接器僅從同一個 Chat 或 Responses 容器讀取最新、非空、由使用者撰寫的 `text`/`input_text`,將其正規化為 NFC、摺疊控制字元與空白字元,並限制為 500 個 Unicode 碼位。若結果為空,則退回與 `full` 完全相同的提示詞。可用的提示會序列化為 JSON,置於專用的不受信任使用者情境區塊中,且僅能優先處理可觀察的細節;它無法覆寫另一項獨立的警告——不得遵循媒體中可見或可聽見的指令。文字焦點絕不會推斷 `start`/`end`,也不會變更時間取樣器。

#### FU-07 結構分段證據

`segment_aware` 會對已驗證的本機影片串流執行一趟有界限的預分析處理。固定濾鏡鏈會先縮放至最多 320 像素寬,偵測場景變化與凍結區間,接著以每秒 1 影格取樣模糊度、平均亮度與空間/時間資訊。此趟處理限制為 600 個結構樣本、單一 FFmpeg/濾鏡執行緒、相同的僅限 `file` 通訊協定與容器允許清單、1 MiB 的處理程序輸出上限,並在中介器共享的中止/期限內最多 30 秒。它絕不接受來自請求的指令、濾鏡、路徑或 URL。

這些結構數值是確定性的取樣證據,而非語義影片理解。它們不會推斷主體、動作、字幕、語音或使用者意圖。場景與凍結邊界構成分段;凍結覆蓋率、模糊度、曝光、空間細節與時間變化,僅影響現有 1–16 影格預算的分配方式。完全凍結的分段上限為一個影格,而非凍結分段則競爭剩餘預算。當邊界數量多於影格數時,會保留均勻的時間軸覆蓋,讓開頭的快速切換無法隱藏冗長的尾部分段。落在凍結邊界 1 秒分析解析度範圍內的場景邊界會被合併。

缺少濾鏡、格式錯誤/空白的證據、偵測器錯誤或有界限的預分析逾時,都會以失效開放方式退回至與均勻中點完全相同的策略。呼叫方中止或中介器期限則不會失效開放:它會終止進行中的子處理程序、阻止後續的影格擷取,且私有暫存樹會在 `finally` 中移除。

`scripts/perf/video-bridge-fu07-eval.ts` 會產生確定性的真實 FFmpeg 測試夾具,涵蓋去重後的字幕呼叫節省、密集動態的預算分配、模糊/曝光/SI-TI 證據、帶有長尾的快速切換,以及漸變淡出的誤判。它會記錄預分析的實際經過時間,並在 `/usr/bin/time` 可用時記錄子處理程序的 CPU 與峰值 RSS。其品質檢查僅為結構性判定標準。真實字幕模型的品質仍維持 `HOLD`,因為此測試框架沒有授權端點或凍結的評判器。除非 `--caption-cost-per-call-usd` 提供明確的正數每次呼叫估值,否則金額節省同樣維持 `HOLD`;此腳本絕不編造任一結果。

每個影格的上限為 4 MiB,所有原始影格合計上限為 23 MiB,序列化後的代理回應上限為 32 MiB。私有的暫存目錄會在 `finally` 中移除。OmniRoute 不內附 FFmpeg,也不接受自訂的執行檔路徑。在產生說明文字之前,橋接器會先執行一輪保守的視覺去重複處理:每張 JPEG 會縮減為 16×16 灰階緩衝區,且僅與最後保留的影格進行比較。當請求的說明文字預算超過一個影格時,擷取階段會提供有上限的候選池,最多為該預算的兩倍,且絕不超過 16 個影格。請求的上限僅在去重複之後才套用;當預算至少為二時,最終精簡過程中會保留第一個與最後一個入選的候選影格。具版本控制的 `grayscale-16x16-mean-cells-v2` 策略採用「平均亮度差值」與「正規化差值至少為 0.05 的縮圖格元比例」兩者中的較大值。重複判定閾值為常數 0.04;此值是為了可預測性而選定,並未開放為執行期設定。這個次要的高對比訊號可保留微小的動作與可見文字變化,這些變化在僅比較平均值時可能會被掩蓋。比較器或解碼器發生錯誤時採失敗開放(fail open)處理,以維持涵蓋範圍。輸出中繼資料會將已擷取的候選影格、成功使用的影格,以及遭捨棄的視覺重複影格分開記錄。

明確標記的影片部分可請求附時間戳記的聯絡表(contact sheet)。橋接器最多建立一個 4 欄、16 影格的 JPEG 網格。每個 512 像素的格元會將其來源時間戳記燒錄至高對比的底部橫帶中,同時相同的時間戳記仍保留於文字中繼資料內,以供下游關聯與稽核之用。完整的 JPEG 仍維持 32 MiB 的上限。若 `sharp` 無法解碼或組成網格,橋接器會退回使用個別的 JPEG 影格;用戶端中止仍會透過聯絡表作業傳播。

升級證據刻意獨立於合成組合微基準測試之外。`scripts/perf/video-bridge-contact-sheet-eval.ts` 定義了一個具結構描述版本控制的 A/B 測試框架,用於真實的 OpenAI 相容視覺模型。它會測量提供者回報的 token 數、端到端實際延遲(包含聯絡表組成時間)、模型呼叫次數,以及清單(manifest)所定義的事實保留率。原始模型回應不會寫入報告;僅保留 SHA-256 摘要與相符的事實 ID。除非傳入 `--execute-real` 且已設定 `--model`、`OMNIROUTE_BASE_URL` 與 `OMNIROUTE_API_KEY`,否則該測試框架不會進行任何網路或付費模型呼叫。若無該次明確的真實執行,其機器可讀的判定仍維持為 `HOLD`;僅憑合成酬載/呼叫次數的測量結果,並不構成升級證據。

當呼叫者已擁有對齊的文字時,可將選用的 `transcript.cues` 陣列附加至支援的影片部分。每個 cue 必須帶有 `text`、位於探測所得時長之內的有限 `start`/`end` 區間,以及白名單內的 `source`(`client`、`embedded` 或 `audio-bridge`);`confidence` 預設為 `1`,且必須維持在 `0` 到 `1` 之間。完全重複的 cue 會被摺疊合併。OmniRoute 絕不會根據此中繼資料啟動轉錄:通過驗證的 cue 會連同來源、信賴度與區間一併複製到描述結果中,並與影格說明文字一起呈現為不受信任的觀察資料。無效、超出範圍或無來源標示的文字會遭到拒絕,而不會混入說明文字串流。兩個請求主體的轉錄通道皆會將所提供的來源標示正規化為 `client`,包括自我宣稱的 `embedded` 或 `audio-bridge` 標籤。只有伺服器擁有的轉接器才能透過僅限程式碼的 `trustedSource` 引數指派這些受信任的標籤;請求中的 JSON 欄位無法觸及該引數。無論其來源標示為何,轉錄文字仍屬於不受信任的媒體衍生內容,且絕不可用於決定授權。

進階呼叫者可為同一影片提供 `audioTranscript` 軌道;它會被視為用戶端提供的文字,而非伺服器端轉錄的證明。融合接合處會在同一個截止期限與同一個中止訊號之下執行視覺與音訊觀察,將其排列於共同時間軸上,摺疊合併完全重複的項目,並在僅有一方成功時回報部分結果。無效的 `audioTranscript` 會降級為該部分結果——保留視覺描述,而音訊分支則記錄經淨化的失敗代碼——而非讓整個影片失敗。各分支可用性、部分結果旗標,以及經淨化的失敗代碼,都會保留在描述結果、護欄中繼資料(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`)、結果快取中繼資料,以及橋接器融合計數器中。預設的 Video Bridge 路徑不會呼叫語音轉文字,也不會下載第二份媒體複本;若沒有該明確軌道,它會維持僅處理影片。

**轉錄保留（#12150 P1）。** 每當視訊橋接器（本身為選用功能）渲染轉錄 cue 時，此機制就會自動套用——沒有獨立的保留旗標。當請求渲染任何轉錄 cue（呼叫方宣告的 `transcript` 或融合的 `audioTranscript`）時，防護機制會將其標記為 `videoBridgeObserved`，並產生視訊描述的遮罩影子——一個完全相同的渲染結果，其中每個 cue 的自由文字主體都被替換為 `[redacted-video-transcript]`，其建構方式是在字串組裝之前替換結構化的 cue 欄位（絕不透過解析扁平化後的文字，因此任何 cue 內容——無論是對抗性的還是普通的，包括含有 `]` 的主體，例如 `[inaudible]`/`[music]`——都無法留存）。持久化的呼叫日誌請求主體會將每個視訊衍生的文字部分換成該遮罩影子，並以內容相等性進行比對；`fullText` 錨點會從完成的呼叫前防護機制負載中重新讀取，因此即使後續鏈式防護機制（PII 與憑證遮罩器，優先級 10/95）就地重寫了描述文字，且系統提示/交接/記憶注入重塑了訊息陣列，比對仍然會成功。傳送至上游模型的主體維持不變。受觀察的請求也不會寫入任何持久的 Memory（請求衍生與回應衍生的擷取都會被略過），因此模型自己的回覆無法將轉錄文字回顯到 Memory 中。

**原始視訊欄位（#12430）。** 當橋接器已啟用且原生視訊支援未知或不存在時，已定義的 `transcript`/`audioTranscript` 欄位也會啟動 `videoBridgeObserved`，即使在描述失敗或達到 `maxVideos` 上限之後亦然。`null` 與空字串都計入；缺失的欄位與非視訊中繼資料則不計入。保留的副本會遮罩這些欄位或省略該請求，並略過快取/Memory。

在這些後退路徑上，有效的呼叫方 cue 會成為受支援的 `text`/`input_text` 部分，而非非標準的提供者欄位。兩條由請求提供的軌道都維持為不受信任的 `client` 觀察結果，並附帶明確警告：視訊未經描述，且時間戳記未對照媒體驗證。現有的 256 個 cue/64 KiB 總量與每個 cue 的預算會一併套用於兩條軌道；時間戳記必須符合代理的 600 秒上限以及任何提供的聚焦視窗。無效的軌道會被捨棄，而不會作為任意文字轉發；有效的同層軌道仍可使用，除非其合併預算超出上限。Null/空欄位不會新增任何文字。此後退機制不會新增任何媒體擷取或轉錄。轉錄擴充欄位會從後退視訊載體及其 `video_url`/`source` 物件中移除。OpenAI 傳輸允許清單維持嚴格；原生支援未知的視訊載體維持可用，而已知的純文字目標保留安全標記。結構化的遮罩影子會保護附加的轉錄文字，而原始的呼叫方擁有的請求維持不變。原生支援的目標與已停用的橋接器保留其現有的略過行為。

其他保留的副本使用相同的受觀察請求訊號。原始的防護機制前用戶端請求快照、記憶體內的待處理請求，以及早期拒絕請求日誌，會以結構化方式替換視訊部分中的轉錄欄位；由管線階段與上下文交接合成的字串提示，會在持久化請求主體接收器處進行遮罩。持久化的 `video_content_removed` 標記會讓 `previous_response_id` 接續採取失敗即關閉（fail closed）的行為，而非重建被刻意捨棄的文字。如果受觀察的請求在記錄之前遺失其逐部分遮罩影子，或在後續請求變更之後，即使數個視訊影子中只有一個比對失敗，保留的請求主體也會被完全省略，而不是保留部分遮罩的轉錄。

對於受觀察的請求，模型回應可能會在沒有結構化 cue 邊界的情況下引用轉錄的任何部分。因此，其持久化的呼叫日誌 `responseBody` 會被替換為省略標記；詳細的管線成品（可能包含上游/用戶端主體與串流區塊）不會被保留。語意、冪等性與推理重播快取會略過該請求的讀取與寫入。提供者請求與用戶端可見的回應維持不變。當詳細成品被省略時，早期的 keepalive 位元組會從暫存緩衝區排出。Kiro 的格式錯誤 EventStream 警告只會回報負載的位元組數，絕不回報其內容或 JSON 剖析器的原始錯誤。這並不表示每個不相關的提供者/外掛程式診斷都已被稽核；更廣泛的保留接收器掃查於 #11658 中追蹤。

內部的 `/api/modality-bridge/video/drilldown` 生命週期是一個獨立的、以回送/權杖驗證的快取基礎層。每個操作還需要一個正規化的不透明主體 ID。在生產環境呼叫方啟用之前，它必須從已驗證的租用戶推導出該 ID，且絕不可轉發用戶端選擇的值。快取金鑰會將該主體綁定至正規化的工作階段與視訊參照 ID，僅儲存其 SHA-256 衍生的金鑰，並將讀取與刪除都限定在同一主體。快取每個項目最多儲存 16 個衍生的 JPEG 影格，並於十分鐘後使其過期，同時支援有界的 `start`/`end` 讀取或明確的工作階段刪除。

每個主體限制為 16 個項目與 64 MiB 的正規化 JPEG 資料。這些限制獨立於全域 64 個項目/256 MiB 的上限：主體配額壓力只會在考慮全域 LRU 逐出之前，先逐出該主體最近最少使用的項目。過期的項目會在快取活動時從主體與全域計量中一併掃除，而取消與驗證失敗不會提交部分替換。

快取會拒絕非規範的 Base64、過多的填充、非 JPEG 媒體、格式錯誤或截斷的 JPEG，以及在有界完整影像 `sharp` 解碼期間產生警告的 JPEG。它會將每張接受的影像重新編碼為規範 JPEG，從解碼後的位元組推導寬度與高度，而非信任呼叫方欄位，並捨棄任何尾隨的 polyglot 位元組而非保留它們。只有有界的規範壓縮緩衝區會計入兩個配額。JSON 傳輸限制包含 32 MiB 解碼輸入上限的 Base64 額外負荷。每個儲存的衍生項目都會記錄其已驗證的 JPEG 格式/解析度、取樣政策、衍生版本、建立時間、伺服器計算的內容雜湊，以及雜湊後的父引用，外加受信任呼叫方的父內容雜湊。在原子性快取提交之前，會在非同步解碼/雜湊階段之間檢查取消。

此批次尚未將生產環境的生產者連接到路由，也不提供多解析度變體選擇。因此，透明的 Video Bridge 請求路徑不會產生額外工作，而租戶綁定的主體推導與完整的 FU-08 多解析度生命週期仍是明確的後續工作，而非記載為已完成的行為。

影格會使用設定的 Video 模型依序產生字幕。空的 Video 覆寫會繼承 Vision 設定；如果兩者皆為空，Vision 自動路由器會選擇有效的視覺能力模型。成功的字幕會以穩定的 `[Video description:` 前綴替換原始部分，該前綴同時將文字標記為不受信任的媒體衍生觀察，並告知下游模型不要遵循在媒體中發現的指令。影格字幕快取鍵包含 JPEG 位元組、提示詞、時間戳記與有效模型；只有成功的字幕會被快取。快取項目保留實際成功的生產者模型，包括後備模型；當不同影格由不同模型產生時，橋接器會報告 `mixed`。快取命中會重複使用該生產者身分，而不是將其重新標記為請求的路由計畫。整部影片結果快取以每個會改變輸出的輸入為鍵——提示詞、有效模型、取樣政策、影格數、語意分析模式、正規化焦點提示的 SHA-256 指紋、焦點視窗、`transcript`、`audioTranscript`，以及聯絡表（contact-sheet）旗標——因此變更任何一個維度都是快取未命中，絕不會是過時的重用。視覺去重政策版本、閾值與有界候選影格數也在結果快取鍵與中繼資料中明確標示；因此政策變更無法重用過時的整部影片描述。結果快取 v4 中繼資料保留模式與指紋，絕不保留原始使用者任務。防護機制中繼資料會同時報告請求的與有效的分析模式；請求 `focused` 模式但沒有可用使用者文字時，會被報告為實際上是 `full`。

防護機制會擷取每個支援的影片部分，但描述的數量不超過 `modalityBridgeVideoMaxVideos`。對於已證明 `supportsVideo === false` 的目標，失敗與超過限制的影片會變成明確的安全文字標記，因此不會有原始影片留存。當能力未知時，這些部分會保留其影片載體；任何後備轉錄都遵循上述的有界文字轉換。`supportsVideo === true` 的目標會繞過橋接器。客戶端請求中止訊號會傳播到下載、代理佇列、子程序與字幕呼叫；中止會在影片之間停止，且絕不會對原始媒體失敗開放（fail open）。

執行時期設定以資料庫為後端並經過 Zod 驗證：

| 鍵                                  | 預設值      | 範圍 / 行為                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 選用執行時期，選擇加入                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 保留通用字幕；`focused` 使用有界、不受信任的最新使用者上下文             |
| `modalityBridgeVideoModel`          | `""`        | 繼承 Vision Bridge 模型                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware` 或比例式 `segment_aware`；偵測器失敗時回退到 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                  |

超過 120 秒的舊版持續儲存 Video 逾時值會被鉗制到代理期限；超過該限制的新設定寫入會被拒絕。`GET /api/modality-bridge/video/runtime` 在驗證或執行時期探測之前，需要先具備受信任標記的回送（loopback）本地性，然後需要管理驗證。它只回傳 `available`、經過清理的 FFmpeg/ffprobe 版本，以及執行時期不可用時的固定原因。內部擷取端點不是公開的上傳 API：佇列飽和回傳 `503` 加上 `Retry-After`，呼叫方斷線回傳 `499`，固定代理期限回傳 `504`。轉換後的回應會在中央 `x-omniroute-modality-bridge` 標頭中加入 `video->text;model=<visionModel>;parts=<videos>`，而不會移除 Vision 或 Audio 區段。

### PII 遮罩器（`piiMasker.ts`）

在**兩個**階段皆會執行。

- **`preCall`** 會複製（clone）payload，走訪 `system`、`messages`、`input` 與 `prompt`（包含純字串項目），並對字串類型的 `content`/`text` 欄位套用 `processPII()`（來自 `@/shared/utils/inputSanitizer`）。當 `PII_REDACTION_ENABLED=true` 時，偵測到的 PII 會在外送的 payload 中被遮罩。這與 `INPUT_SANITIZER_MODE` 相互獨立（後者僅控制 prompt-injection 政策）。遮罩關閉時，呼叫僅記錄偵測計數，不會改寫內容。
- **`postCall`** 會深層複製回應，執行 `sanitizePIIResponse()` 以及 Responses-API 結構的遮罩器（`maskResponsesOutput` — 涵蓋 `output_text` 與 `output[].content[].text`）。只要發生任何遮罩，修改後的回應就會取代原始回應。

此 guardrail 從不阻擋；它只會標註（`meta.detections`、`meta.redacted`）或改寫。

#### 各類型選擇、自訂模式與偵測計數器

**儀表板 → 設定 → 安全性 → PII 遮罩** 選擇要遮罩的_對象_。它並不負責開啟遮罩：開關仍是 `PII_REDACTION_ENABLED`（請求）與 `PII_RESPONSE_SANITIZATION`（回應 + SSE），兩者預設皆關閉。

- **各類型選擇** — 內建 id 列於 `src/shared/constants/piiTypes.ts`（`PII_BUILTIN_TYPES`）。未設定表示涵蓋所有類型（即此設定出現之前的行為）。請求引擎的 `ssn_us` 模式會對應到 `ssn`。範本（Minimal、Standard、Financial、Brazilian、USA、Full）只會填入 UI 中的核取方塊。
- **自訂模式** — 最多 20 個 regex 或萬用字元模式（`*` = 最多 64 個非空白字元，`?` = 一個字元）。符合的內容會變成 `[CUSTOM_REDACTED]`。每個模式都會經過 `compilePiiCustomPattern()`（`src/shared/utils/piiCustomPatterns.ts`）：最多 500 個字元，旗標僅限 `g i m s u`，必須能成功編譯，必須通過 `safe-regex` 檢查（災難性回溯），且不得符合空字串或遮罩佔位符。未通過的模式在儲存與測試時都會被拒絕；已儲存的列若未通過檢查，執行時期會被略過而不予編譯。自訂模式僅在遮罩開啟時執行。
- **偵測計數器** — 各類型計數（絕不記錄符合的值），保存在記憶體中，重新啟動時重置（`src/lib/pii/piiDetectionStats.ts`）。僅在遮罩開啟時才會增加。

設定儲存在 `key_value` 資料表（命名空間 `pii_settings`，`src/lib/db/piiSettings.ts`），並透過 1 秒快取讀取。API：

| 方法   | 路徑                     | 用途                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | 旗標狀態、`enabledTypes`、`customPatterns`、偵測計數器              |
| `PUT`  | `/api/settings/pii`      | 取代 `enabledTypes`（`null` = 全部）和/或 `customPatterns`          |
| `POST` | `/api/settings/pii/test` | 針對最多 8 KB 的樣本對單一模式進行試跑（dry-run）；不會儲存任何內容 |

三個方法皆需要管理驗證（management auth），並使用 Zod 驗證請求主體（`src/shared/validation/schemas/piiSettings.ts`）。

### Prompt Injection（`promptInjection.ts`）

偵測使用者提供內容中的對抗性結構，並執行所設定的政策。行為由環境變數與建構子選項驅動：

| 設定     | 環境變數                                                                                            | 預設值 | 效果                                                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 啟用     | `INPUT_SANITIZER_ENABLED`                                                                           | `true` | 為 `false` 時，guardrail 會直接略過（short-circuit）。                                                                                                     |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn` | Injection 政策：`block`、`warn` 或 `log`。（基於向下相容仍接受 `redact`，但**不會**移除 injection 文字；請求的 PII 改寫由 `PII_REDACTION_ENABLED` 控制。） |
| 阻擋門檻 | `blockThreshold` 選項 / `INPUT_SANITIZER_BLOCK_THRESHOLD`（別名 `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high` | 觸發阻擋所需的最低嚴重性。預設情況下，Medium 僅觀察不阻擋。                                                                                                |

**模式優先順序**（`getMode`）：呼叫端 `options.mode` → `INJECTION_GUARD_MODE` **資料庫功能旗標覆寫**（儀表板 → 設定 → 功能旗標）→ `INJECTION_GUARD_MODE` 環境變數 → `INPUT_SANITIZER_MODE` 環境變數 → `warn`。因此儀表板覆寫優先於環境變數，功能旗標 UI 可即時控制執行中的 guard（無需重新啟動）。資料庫讀取是 fail-safe 的：若發生錯誤，guard 會回退到基於環境變數的行為；未設定覆寫時，行為與僅使用環境變數的解析結果完全相同。

偵測來源：

1. 來自 `@/shared/utils/inputSanitizer` 的 `sanitizeRequest()`（pipeline 中其他位置也使用的共用偵測器集合）。
2. 內建的 `DEFAULT_GUARD_PATTERNS`（目前為 `system_override_inline` 與 `markdown_system_block`，兩者皆為 `high` 嚴重性）。
3. 透過建構子選項傳入的選用 `customPatterns`（字串、regex，或 `{ name, pattern, severity }` 記錄）。

當 `mode === "block"` **且**至少有一項偵測結果達到嚴重度閾值時,`preCall` 會回傳 `{ block: true, message: "Request rejected: suspicious content detected" }`。在 `warn`/`log` 模式下,防護機制會記錄日誌但允許呼叫通過。共用的輔助函式 `evaluatePromptInjection()` 也一併匯出,供需要不經過註冊表、直接評估提示詞的呼叫端使用。

**掃描上限 (v3.8.20):** 偵測器只會檢查合併後提示文字的**前 16 KB** —— 即 `src/shared/utils/inputSanitizer.ts` 中的 `MAX_INJECTION_SCAN_BYTES = 16 * 1024`(16 384 位元組)。`detectInjection()` 與 `evaluatePromptInjection()` 兩者都會在執行模式比對迴圈之前先 `slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令通常位於輸入的開頭附近,因此此上限可在數百 KB 大小的 payload 上限制 regex 的 CPU/GC 開銷,同時不削弱偵測效果(參見 #3932、#4041)。

### 憑證遮蔽器(`credentialMasker.ts`)

於**兩個**階段都會執行,在預設鏈中排在最後(優先級 `95`)。它會從傳出的 payload(訊息內容、工具呼叫參數、工具結果)**以及**提供者回應中,遮蔽常見的 API 金鑰/秘密權杖模式,確保貼進提示詞中的憑證(或由工具結果回顯的憑證)不會洩漏給上游提供者或回傳給用戶端。

- **僅限選擇加入(Opt-in)**,採用與 PII 遮蔽相同的慣例(接近 Hard Rule #20):除非 `settings.credentialRedactionEnabled === true` **或** `CREDENTIAL_REDACTION_ENABLED=true`,否則一律停用。停用時,此防護機制為 no-op —— 既不會阻擋也不會改寫。
- `redactCredentials()` 會走訪完整的 payload/回應樹(透過 `walkValue()`,可防禦原型污染、並透過 `WeakSet` 避免循環參照),將符合的內容替換為 `[REDACTED:<type>]` 佔位符,且只複製實際有變動的分支。
- `CREDENTIAL_PATTERNS` 涵蓋 LLM 提供者金鑰(OpenAI、OpenAI-proj、Anthropic、Google、Hugging Face、Replicate)、VCS/SaaS 權杖(GitHub、Slack、Linear、Notion、npm、Postman、Discord)、支付金鑰(Stripe、Square)、雲端金鑰(AWS 存取金鑰、Twilio、SendGrid、Mailgun)、私鑰/JWT、含憑證的連線字串(`mongodb://user:pass@...` 等),以及通用的 `Authorization`/`x-api-key`/`api-key`/`apikey` 標頭值模式。標頭形式的鍵(`authorization`、`x-api-key`、`api-key`、`apikey`)採結構化方式遮蔽(僅遮蔽值,保留如 `Bearer `/`Basic ` 之類的方案前綴),而非透過通用的文字 regex。
- 此防護機制絕不阻擋;只會改寫(`modifiedPayload` / `modifiedResponse`)並加上註記(`meta.credentialsRedacted`、`meta.count`)。

迴歸防護測試:`tests/unit/credential-masker-guardrail.test.ts`。

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
