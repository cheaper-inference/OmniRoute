# Guardrails (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md)

---

> **真實來源:** `src/lib/guardrails/`
> **最後更新:** 2026-10-17 — v3.8.52(新增[涵蓋範圍與限制](#coverage-and-limits):
> 說明 hooks 觸及哪些路由與回應路徑、合併的停用標頭(#16412)、作為強制邊界的注入封鎖模式(#16413),以及在 post-call 之前哪些元件會看到回應)

Guardrails 在 OmniRoute 與上游提供者之間的邊界強制執行安全、政策與內容轉換。每個 guardrail 都能檢查(並選擇性地拒絕、轉換或註解)請求負載(`preCall`)與上游回應(`postCall`)。

本系統採用**失敗開放(fail-open)**設計:若某個 guardrail 在執行時拋出例外,註冊表會記錄該錯誤並繼續執行下一個 guardrail,而不是讓請求失敗。封鎖是一項明確的決定(`block: true`),絕非意外。唯一的例外是已中止的請求:當呼叫方的 `signal` 被中止時,拋出例外的 guardrail 會使 hook 執行被拒絕,而不是被略過。

這些 hooks **並不**會在每個路由或每個回應上執行。在將 guardrail 當作安全控制手段來依賴之前,請先閱讀[涵蓋範圍與限制](#coverage-and-limits)。

## 內建護欄

註冊表在匯入時會依優先順序自動載入六個護欄（請參閱`registry.ts` → `registerDefaultGuardrails()`）：

| 優先事項 | 姓名                | 階段           | 文件                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

運行較低優先級的號碼**第一的**。

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 基本模型和`glm-5.3-{low,high,max}`具有顯式`supportsVision:false` registry/spec資料。 GLM 5.3 Flash 變體仍然是原生視覺型號。 Claude Code的`/v1/messages`路由進入共享`handleChat`預先呼叫護欄鏈**前**Claude 到 OpenAI 的翻譯；嵌套的`Read`工具結果圖像必須在翻譯將其提升為OpenAI `image_url`內容之前進行描述或處理 (#17069)。

攔截針對的影像承載請求**非視覺模型**並將整個請求重新路由到支援視覺的模型，或在上游呼叫之前用可配置視覺模型產生的文字描述取代圖像部分。這使得純文字提供者能夠透明地處理多模式負載。

流動：

1. 如果目標模型已經支援視覺，則跳過（除非它出現在強制橋列表`isVisionBridgeForcedModel`中）。
2. 透過`extractImageParts(messages)` (`visionBridgeHelpers.ts`) 提取圖像部分，委託給**統一媒體偵測器**`open-sse/utils/mediaParts.ts` —的`detectMediaParts()`與組合相容性過濾器共用單一事實來源。提取列入`replaceImageParts`可以拼接回來的形狀（提取↔替換合約）： OpenAI `image_url`、 Anthropic base64 `source.type:"base64"`、 Anthropic URL `source.type:"url"`和 Responses API `input_image`。嵌套在Claude代碼`tool_result.content`和回應工具輸出中的匹配圖像也會被提取並替換到其原始路徑；僅指示符形狀是組合過濾器材料，不會被提取。如果沒有找到則跳過。
3. 透過`resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) 解析執行時間設定：新的`modalityBridge*`設定鍵 win；遺留的`visionBridge*`鑰仍然是**單週期回退**（回滾視窗）。當橋被禁用時，在任何媒體遍歷之前跳過。
4. 模式選擇器（`modalityBridgeVisionMode`，見下表）決定重新路由與描述。重新路由返回`modifiedPayload`僅交換`model` ，加上元`{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑：在`maxImages`上捕捉影像，寫任務感知提示，查閱描述快取，呼叫視覺模型**並聯**(`Promise.allSettled`)，並在其位置注入`[Image N]: <description>`文字部分。失敗的描述會產生`null`：為unknown/vision-capable目標保留原始影像 (#4012)，但是**已確認的純文字直接目標**或零視覺組合為每個未描述的影像取得明確的`(unavailable — no vision-capable provider connected)`文字存根，包括部分失敗和超出描述呼叫上限的影像 (#17069)。現有的全部失敗的組合描述後備仍然存在（#8430）。
6. 返回`modifiedPayload` +元（`imagesProcessed`、 `descriptions`、 `processingTimeMs`、 `visionModel`）。

#### 模式選擇器 (`modalityBridgeVisionMode`)

| 模式       | 預設 | 行為                                                                                                                                                                                     |
| ---------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔    | 傳統啟發式，未受影響（#6640/#7204）：非組合/`auto/`模型重新路由到最佳視覺模型，除非原始模型已經具有可用的憑證（然後描述）；組合目標總是描述。                                            |
| `describe` |      | 始終描述—完全跳過重新路由區塊；使用者選擇的模型總是會回答。                                                                                                                              |
| `reroute`  |      | 強制重新路由：繞過 keep-credentialed-model 防護。改道——**目標**當不存在可用的視覺目標時，Credential Guard 仍然會應用— ，橋會阻止並顯示明顯的錯誤，而不是描述或發送原始圖像到純文字目標。 |

強制模式短路**前**自動啟發式運行； `auto`行為與pre-PR-1護欄位元組相同。

#### API 金鑰範圍 (`visionBridgeKeyScope.ts`)

當呼叫者的API鑰限制`allowedConnections`、配額池 (`allowedQuotas`) 或模型 (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) 時，橋接器僅在金鑰可能使用的連接上選擇重新路由並描述金鑰可能使用的模型。然後，描述呼叫總是使用`x-omniroute-self-loop-key-id`標頭進行OmniRoute自循環，因此接收聊天請求會再次強制執行該金鑰的連線和模型策略。 `enforceApiKeyPolicy()`僅尊重該標頭和自環承載，因此它只能縮小存取範圍，並且拒絕無法解析的 id。

如果密鑰不允許使用視覺模型，則**已確認的純文字目標**使用明確的HTTP 400 在本地拒絕映像請求，而不是將影像位元組轉送到無能力的上游 (#17069)。對於具有未知或本機視覺功能的目標，描述路徑保留其先前的故障開啟行為（meta `{ skipped: true, reason: "no_permitted_vision_model" }`）。沒有金鑰的請求以及沒有這些限制的金鑰的行為與以前完全相同。

#### 任務知覺描述提示（`modalityBridgeVisionTaskAware`）

預設**真的**。 `composeVisionPrompt()` (`visionBridgeHelpers.ts`) 附加文本**最後一條用戶訊息**（截斷為 500 個字元）到基本描述提示，將描述轉向使用者實際詢問的內容（codex-vision-proxy 模式）並要求視覺模型轉錄可見文字。當關閉—標誌或沒有使用者文字—時，基本提示符號將保持不變。

對於每個caller/provider，描述自循環自己的 OpenAI 相容請求（`callVisionModelSingle()` in `visionBridgeHelpers.ts`）始終無條件請求`image_url.detail: "high"` — ，而不是在任何客戶端訊號上門控。低細節採樣會降低該提示所要求的文本轉錄任務的OCR準確性，因此無論原始入站請求使用什麼細節級別，描述呼叫本身始終要求高細節。這只會影響內部描述請求體；它不會改變OmniRoute在主請求—上轉送呼叫者自己的`image_url.detail`方式，預設值是單獨應用，並且僅適用於`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) 中偵測到的OpenCode客戶端。描述自循環的Anthropic有線格式分支沒有`detail`字段，且不受任一預設值的影響。

#### 描述輸出上限（`modalityBridgeVisionMaxChars`）

| 鑰匙                           | 預設 | 範圍            |
| ------------------------------ | ---- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`  | `0`或 100–50000 |

`0` （預設）意味著**沒有上限**— `callVisionModel()`傳回的描述未經修改地傳遞，保留現有行為。 100–50000 範圍內的任何值都會在將描述拼接回`[Image N]: <description>` （ `src/lib/guardrails/visionBridge.ts`中的`VisionBridgeGuardrail.preCall()` ）之前截斷帶有`…`後綴的描述。對於下游模型需要完整轉錄的細節繁重的OCR任務，請提高此值；降低它以限制閒聊視覺模型上的令牌使用。儀表板欄位位於「Vision」標籤的「進階」面板（ `ModalityBridgeVisionTab.tsx`中的`modality-bridge-max-chars` ）中，並將 1 到 99 之間的任何值限制在 100 下限，同時保留顯式`0`不變— `0`本身就是一個有效的Zod值 (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)，而不僅僅是「未設定」的預設值。

#### 描述快取（`modalityBridge/bridgeCache.ts`）

用於描述輸出的記憶體中LRU + TTL快取，在進程範圍內共享。具有長度前綴幀的密鑰= `sha256(imageRef + composedPrompt + configuredBridgeModel)` （無字段邊界衝突）。模型組件是**配置的**橋接模型，而不是實際回答— `callVisionModel`模型可能會在內部回退，並且每次嘗試鍵入都會使快取碎片化。失敗的描述永遠不會被快取。設定:

| 鑰匙                            | 預設   | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠程影像歸一化（自循環describe/base64獲取）

當橋獲取一個**偏僻的**圖像本身— Anthropic描述自呼叫和 claude-wire-format base64 轉換 (`ensureBase64ImagesForClaudeWire`)，兩者均透過`visionBridgeHelpers.ts` —中的`fetchRemoteImageAsDataUri()`產生的資料URI在嵌入視覺模型請求之前透過`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) 傳遞。超大圖像被縮小到**2048px 長邊**（匹配調整大小上限OpenAI/Anthropic已經應用於伺服器端），這會在不改變視覺模型所看到的內容的情況下削減上傳bytes/latency 。調整大小使用`sharp`，透過動態導入載入：在其本機二進位檔案無法載入的平台上， `normalizeDataUri()`**從不拋出**—它會回退到原始位元組的直通，因此describe/base64-conversion路徑始終保持工作。非圖像位元組（未返回可解碼圖像的提取）也會原封不動地傳遞。這種標準化的範圍是橋接器為其自己的自呼叫—獲取的圖像，它永遠不會應用於呼叫者的原始直通有效負載，這與僅選擇加入突變原則（硬規則＃20）一致。

#### 設定架構+遷移

新的`modalityBridge*`密鑰在`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) 中經過 Zod 驗證： `modalityBridgeVisionEnabled`、 `modalityBridgeVisionMode`、 `modalityBridgeVisionModel`、 `modalityBridgeVisionTaskAware`、 `modalityBridgeVisionPrompt`、 `modalityBridgeVisionTimeout`、 `modalityBridgeVisionMaxImages`、 `modalityBridgeVisionMaxChars`、 `modalityBridgeCache*`三重奏和音頻橋使用的`modalityBridgeAudio*`組。遷移`141_modality_bridge_settings.sql`將現有的舊`visionBridge*`值複製到匹配的新鍵（冪等，永遠不會覆蓋運算符設定的`modalityBridge*`值）；舊金鑰仍然被接受作為一個發布週期的讀取回退。

#### 透明度標題+統計數據

描述轉換的回應攜帶`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` （由`modalityBridge/bridgeStats.ts`中的`buildModalityBridgeHeader()`構建，由`src/sse/handlers/chatHelpers.ts`中的`withModalityBridgeHeader()`標記）。重新路由的請求獲取**不**header —有效負載未受影響，且模型交換已在回應正文的`model`欄位中可見。

`GET /api/modality-bridge/stats` （管理驗證，與`GET /api/settings`相同層）傳回`vision`、 `audio`和`video`的記憶體中每種模式計數器`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` 。 `averageLatencyMs`使用`latencySamples`（不是所有嘗試）作為其分母；沒有計時的操作不會產生零毫秒樣本。 `bridged`仍然是成功轉換的向後相容別名；失敗的嘗試不會增加它。根據設計，計數器在進程重新啟動時重置（遙測，而不是會計）。

#### 儀表板配置

專用儀表板頁面是`/dashboard/settings/modality-bridge`。其 URL 可尋址`Vision`、 `Audio`和`Video`選項卡在切換`tab`值時保留查詢參數。 Vision 標籤公開啟用、模式、模型選擇（包括自動預設值）、任務感知提示、進階timeout/image/description-length/cache限制、執行時間計數器和受保護的範例請求。 「音訊」標籤也是即時的：它公開支援、具有自動功能的僅 STT 模型選擇器、 timeout/max-clip限制、音訊計數器和`input_audio`樣本測試。 “視頻”選項卡具有功能性：它報告FFmpeg/ffprobe運行時狀態—四種顯式UI狀態之一（探測正在運行或無法完成時的`unknown` 、客戶端跳過探測的非環回儀表板主機上的`restricted` 、探測到並確認丟失後的`unavailable` ，或帶有FFmpeg/ffprobe版本的`available` ） —保留enable/model/frame/video/timeout限制，將模型選擇器過濾為支持視覺的模型，並公開視頻計數器。

之前AI設定下的Vision Bridge卡是新頁面的兼容性連結；它不再擁有該表格的第二份副本。媒體提供者還將圖像到文字和語音到文字工作流程連結到對應的模態橋選項卡，而無需刪除現有的語音到文字遊樂場。

**自環准入旁路：**當描述呼叫透過OmniRoute自己的`/v1`自迴圈（非標準提供者模型）路由時，子請求發送`x-omniroute-admission-bypass: internal`並使用本地模式下解析的自循環憑證—本地`sk_omniroute`哨兵或操作員配置的`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env 金鑰（#1350）進行驗證，因此`REQUIRE_API_KEY=true`部署仍然可以執行描述。僅針對這些確切的憑證才允許繞過，因此外部用戶端無法使用標頭來跳過存取。

舊版預設值位於`src/shared/constants/visionBridgeDefaults.ts`中；新的mode/task-aware/cache預設值和設定解析器位於`src/shared/constants/modalityBridgeDefaults.ts`中。護欄公開了`deps`建構函式選項，因此測試可以注入偽造的`getSettings`和`callVisionModel`實作。

### 音頻橋 (`audioBridge.ts`) —模態橋PR-3

在音訊聊天請求到達未知接受音訊輸入的目標之前攔截它們。它永遠不會重新路由聊天請求：音訊部分透過現有的 OpenAI 相容的多部分端點進行轉錄，並且所選的聊天模型繼續使用文字轉錄。

流動：

1. 透過`getResolvedModelCapabilities()`解析`supportsAudio` 。明確的提供者註冊表元數據獲勝，然後是靜態模型元數據，然後是同步的`modalities_input`。沒有`audio`的聲明輸入清單是`false`；沒有能力證據仍然存在`null`。 `false`和`null`都啟動保守橋，而`true`繞過它。
2. 解析`modalityBridgeAudio*`設定並透過共用`detectMediaParts()`偵測器從每個訊息中提取可拼接的頂級音訊部分。支援的線形狀為OpenAI `input_audio`、 `audio_url`和`source.media_type: "audio/*"`。偵測到嵌套音訊以進行路由，但不會被拼接路徑刪除。工作的上限為`modalityBridgeAudioMaxClips`；後面的部分不變。
3. 尊重已配置的`provider/model`，或讓`selectAudioBridgeModel()`按穩定的目錄順序遍歷`AUDIO_TRANSCRIPTION_PROVIDERS`並選擇具有可用的活動提供者憑證的第一個模型。
4. `callAudioTranscription()`將base64/data-URI音訊轉換為多部分`file`，或透過具有DNS固定和 25 MB綁定的僅限公共出站防護下載遠端`audio_url` 。然後，它POSTs檔案並選擇模型到本機`/v1/audio/transcriptions`自循環，並使用`resolveSelfLoopBearer()`進行身份驗證。現有的轉錄路由執行正常的憑證查找、 cooldown/rate-limit處理和提供者調度。
5. 成功的呼叫將其部分替換為`[Audio N]: <transcript>`。使用`Promise.allSettled`運行的呼叫：單一故障保留了原始音訊部分（#4012 合約）。如果每次呼叫都失敗且目標被證明為`supportsAudio === false`，則這些部分將變成`[Audio N]: (unavailable — no STT provider connected)` （#8430 合約）。對於未知目標（`null`），全失敗結果保持不變。沒有可用STT憑證的經過驗證的純文字目標會在不發出網路呼叫的情況下接收相同的明確存根。

成功的轉錄使用進程範圍的 Modality Bridge LRU/TTL快取。金鑰結合了音訊參考、穩定的`audio-transcription`操作標籤、以及選定的STT模型；失敗永遠不會被快取。音訊嘗試更新共享`bridged`、 `cacheHits`、 `failures`和`lastUsedAt`計數器。轉換後的回應帶有`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；未觸及的請求不會接收音訊橋段。

運行時設定由 DB 支援並經過 Zod 驗證：

| 鑰匙                          | 預設    | 範圍         |
| ----------------------------- | ------- | ------------ |
| `modalityBridgeAudioEnabled`  | `true`  | —            |
| `modalityBridgeAudioModel`    | `""`    | 自動或STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000  |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10         |

共享快取仍然由`modalityBridgeCacheEnabled`、 `modalityBridgeCacheTtlMinutes`和`modalityBridgeCacheMaxEntries`控制。

### 視訊橋（`videoBridge.ts`、 `videoBridgePipeline.ts`）

在呼叫沒有已知本機影片支援的目標之前，攔截 Chat Completions `messages`和 Responses API `input`中的頂級影片部分。支援的形狀有`input_video`、 `video_url`、 `video_source`、 HTTPS URLs和`data:video/*;base64,...`資料URIs。文字中的純檔案名稱不會被視為影片。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) 擁有請求遍歷、 capability/policy檢查、每個請求聚合和回應負載。每個視訊工作—獲取、整體結果快取、描述幀序列（融合任何呼叫者聲明的音訊轉錄），以及每次嘗試metrics/abort/cleanup —隱藏在`videoBridgePipeline.ts`中的`processVideoPart`後面，在`preCall`循環內每個視訊部分呼叫一次。該模組還定義了顯式連接埠邊界`VideoMediaBrokerPort` （獲取位元組並提取採樣幀）、 `VideoAudioTranscriptionPort` （將呼叫者聲明的音訊記錄與採樣字幕融合）和`VideoDrilldownPort` （幀向下鑽取持久性邊界；尚未連接到`processVideoPart` —僅單獨的`/api/modality-bridge/video/drilldown`路由今天寫入向下鑽取條目）。

公共`/v1`請求路徑從不匯入或呼叫子流程。遠端視訊下載50 MiB綁定；內嵌 Base64 視訊具有保守的 36 MiB解碼每個視訊上限，因此model/messages/framing信封可以保留在 50 MiB的公共JSON請求准入限制內。在分配之前檢查內聯長度和解碼大小估計。初始遠端URL和每個重定向都需要HTTPS ，使用現有的僅限公共出站防護和DNS固定。然後，位元組穿過確切的內部`POST /api/modality-bridge/video/extract`代理邊界。此路由既是`LOCAL_ONLY`又是`SPAWN_CAPABLE`，僅接受每個程序經過驗證的可信任環回請求，並且從不接受URL、檔案系統路徑、可執行檔或參數清單。 API正文大小管道和處理程序的增量正文讀取器獨立強制執行 50 個MiB代理輸入上限。它的有界佇列一次執行一個提取，允許四個掛起作業，並將掛起輸入上限為 100 MiB。

在broker內部， `ffprobe`讀取一個私有的本機檔案；固定格式允許清單不包括播放清單和清單格式。對於允許的 MOV 系列容器，預設情況下外部MOV資料引用保持停用狀態，並且固定命令不會選擇加入它們。 `ffprobe`和`ffmpeg`都使用`file` -only協定白名單、單線程、固定參數數組、無 shell 以及從`PATH`解析的可執行檔。附加圖片封面串流不是可播放的候選人。所有可播放的串流都必須滿足限制，並且在確定性最低索引回退之前首選明確預設串流。影片長度限制為 600 秒，每維 8,192 像素，來源像素為 33,554,432 個。 FFmpeg對 1-16 個中點JPEG幀進行取樣，將長邊縮小到最多 1,024 像素，而不放大較小的輸入，並且從不接收URL。預設採樣為`uniform` 。可選的`scene_aware`和實驗性`segment_aware`策略對已驗證的本地流執行額外的固定FFmpeg傳遞，選擇有界`showinfo`場景時間戳，並在檢測器故障、超時、格式錯誤的輸出或空候選集時確定性地回退到相同的統一中點。分段感知模式根據已驗證的場景間隔按比例分配中點樣本；下面詳細介紹了段感知證據和後備行為。在每個策略中選擇後都會套用 16 幀硬上限。當場景感知請求只有一幀預算時，它使用活動全視訊或焦點視窗的統一中點並報告`policyEffective: uniform`：單一選定的場景幀無法保留兩個時間端。呼叫者可以選擇提供有限焦點窗口（`start`/`end`秒）；邊界被限制為媒體持續時間，拒絕反向或非有限窗口，並且所有採樣策略僅在標準化間隔內執行。產生的視窗包含在採樣元資料和不受信任的描述前綴中，因此下游模型可以將重點摘錄與完整時間軸區分開來。

語意標題焦點是一個單獨的、明確的設定。預設的`full`分析模式保留現有的幀提示，並且從不將請求文字轉送到標題模型。在`focused`模式下，橋僅從同一 Chat 或 Responses 容器中讀取最新的非空用戶編寫的`text`/`input_text` ，將其規範化為NFC，折疊控製字元和空格，並將其限制為 500 個 Unicode 程式碼點。空結果會回退到確切的`full`提示符號。可用提示在專用的不受信任用戶上下文區塊中序列化為JSON ，並且可能僅優先考慮可觀察的細節；它不能覆蓋針對遵循媒體中可見或可聽指令的單獨警告。文字焦點永遠不會推斷`start`/`end`或更改時間採樣器。

#### FU-07結構片段證據

`segment_aware`對已驗證的本地視訊串流使用一次有界預分析。固定濾波器鏈首先縮放至最多 320 像素寬，檢測場景變化和凍結間隔，然後以每秒 1 幀的速度採樣以獲得模糊、平均亮度和spatial/temporal資訊。該通道僅限於 600 個結構樣本、1 個FFmpeg/filter線程、相同的`file` -only協定和容器允許清單、1 個MiB進程輸出綁定，並且在代理程式的共享abort/deadline.內最多保留 30 秒，它從不接受來自請求的命令、過濾器、路徑或URL 。

結構值是確定性取樣證據，而不是語意視訊理解。它們不會推斷主題、動作、字幕、語音或使用者意圖。場景和凍結邊界形成片段；凍結覆蓋範圍、模糊、曝光、空間細節和時間變化僅影響現有 1-16 幀預算的分配方式。完全凍結的段的上限為一幀，而非凍結的段則競爭剩餘的預算。當邊界數量超過幀數時，會保留統一的時間線覆蓋範圍，因此快速的早期剪切無法隱藏較長的尾隨片段。凍結邊界的 1 秒分析解析度內的場景邊界被合併。

缺少過濾器、 malformed/empty證據、偵測器錯誤或有限的預分析逾時無法實現精確的統一中點策略。呼叫者中止或代理截止時間不會失敗開啟：它終止正在進行的子進程，防止稍後的幀提取，並且私有臨時樹在`finally`中被刪除。

`scripts/perf/video-bridge-fu07-eval.ts`產生確定性的真實FFmpeg固定裝置，用於重複資料刪除後的字幕呼叫節省、密集運動預算分配、 blur/exposure/SI-TI證據、長尾快速剪切和逐漸淡出誤報。它記錄預分析牆時間，以及`/usr/bin/time`可用的子CPU和峰值RSS。它的品質檢查只是結構性的預言。真正的字幕模型品質仍然是`HOLD`因為該工具沒有授權端點或凍結判斷。除非`--caption-cost-per-call-usd`提供明確的每次呼叫正估計，否則金錢節省也仍然是`HOLD` ；該腳本永遠不會偽造任何結果。

每個幀限制為 4 MiB，所有原始幀總共限制為 23 MiB，序列化代理回應限制為 32 MiB。 `finally`中的私有暫存目錄被刪除。 OmniRoute不捆綁FFmpeg且不接受自訂可執行路徑。在新增字幕之前，橋接器會套用保守的視覺重複資料刪除過程：每個JPEG都減少為 16 × 16 灰階緩衝區，並且僅與保留的最後一幀進行比較。對於超過一幀的請求字幕預算，提取會提供最多兩倍於預算的有界候選池，但絕不超過 16 幀。所要求的上限僅在重複資料刪除後應用，並且當預算至少為 2 時，在最終稀疏期間保留第一個和最終選定的候選者。版本化`grayscale-16x16-mean-cells-v2`策略使用平均亮度增量和歸一化增量至少為 0.05 的縮圖單元的比率中的較大者。重複閾值是常數 0.04，選擇它是為了可預測性，而不是作為運行時設定公開。這種輔助高對比度訊號保留了僅平均值比較可以隱藏的小運動和可見文字變化。比較器或解碼器錯誤開啟並保持覆蓋。輸出元資料將提取的候選幀、成功使用的幀和丟棄的視覺重複項分開。

明確標記的影片部分可能會請求帶有時間戳記的聯絡表。該橋最多建構一個4列、16幀的JPEG網格。每個 512 像素單元將其來源時間戳刻錄到高對比度底部帶中，而相同的時間戳記保留在文字元資料中以供下游關聯和審核。完整的JPEG仍上限為 32 MiB。如果`sharp`無法解碼或組合網格，則橋接器會回退到各個JPEG訊框；用戶端中止仍會透過工作表操作傳播。

促銷證據故意與合成成分微基準分開。 `scripts/perf/video-bridge-contact-sheet-eval.ts`為真正的 OpenAI 相容視覺模型定義了模式版本化的A/B工具。它測量提供者報告的令牌、端到端牆延遲（包括工作表組成）、模型呼叫計數和清單定義的事實保留。原始模型回應不會寫入報告；僅保留SHA-256摘要和匹配的事實IDs 。除非傳遞`--execute-real`並配置`--model`、 `OMNIROUTE_BASE_URL`和`OMNIROUTE_API_KEY` ，否則該工具不會進行網路或付費模型呼叫。如果沒有明確的實際運行，其機器可讀的判決仍然是`HOLD`；綜合payload/call-count測量值本身並不能作為晉升證據。

當呼叫者已經擁有對齊文字時，可以將可選的`transcript.cues`數組附加到支援的視訊部分。每個提示必須攜帶`text`、探測持續時間內的有限`start`/`end`間隔以及白名單`source` （`client`、 `embedded`或`audio-bridge`）； `confidence`預設為`1`並且必須保持在`0`和`1`之間。完全相同的重複提示被折疊。 OmniRoute永遠不會從此元資料開始轉錄：經過驗證的線索會被複製到具有來源、置信度和間隔的描述結果中，並與幀標題一起呈現為不受信任的觀察結果。無效、超出範圍或無出處的文字將被拒絕，而不是混合到字幕流中。兩個請求正文轉錄通道都將提供的來源標準化為`client`，包括自斷言的`embedded`或`audio-bridge`標籤。只有伺服器擁有的適配器才能透過僅代碼`trustedSource`參數分配這些可信任標籤；請求JSON欄位無法到達該參數。轉錄文本仍然是不受信任的媒體衍生內容，無論其來源如何，並且絕不能確定授權。

高級呼叫者可以為同一視頻提供`audioTranscript`軌道；它被視為客戶端提供的文本，而不是伺服器轉錄的證明。融合縫在一個截止日期和中止信號下運行視覺和音頻觀察，在公共時間線上對它們進行排序，折疊精確的重複項，並在只有一側成功時報告部分結果。無效的`audioTranscript`會降級為部分結果—保留視覺描述，並且音訊分支記錄經過淨化的故障碼—而不是使整個視訊失敗。每個分支的可用性、部分標誌和清理後的故障碼都保留在所描述的結果、護欄元資料 (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`)、結果快取元資料和橋融合計數器中。預設視訊橋路徑不會呼叫語音轉文字或下載第二個媒體副本；如果沒有明確的軌道，它仍然只是視訊。

**成績單保留 (#12150 P1)。**每當視頻橋（本身選擇加入）呈現轉錄提示—時，這會自動應用，沒有單獨的保留標誌。當請求渲染任何轉錄提示（呼叫者聲明的`transcript`或融合的`audioTranscript`）時，護欄將其標記為`videoBridgeObserved`並生成視頻描述—的編輯陰影，其中每個提示的自由文本正文都被`[redacted-video-transcript]`替換，通過在組裝字串之前`[inaudible]`結構`[music]`提示字段來構建`]`從不解析扁平文本，因此沒有提示內容— —持久的呼叫日誌請求正文將每個視訊派生的文字部分交換為經過內容相等匹配的經過編輯的陰影； `fullText`錨點是從完成的預呼叫 Guardrail 有效負載中重新讀取的，因此在後面的鏈 Guardrail（ PII和憑證掩碼器、優先級10/95）重寫文本並在system-prompt/handoff/memory注入文本並在zqo上重塑消息。向上游發送到模型的主體保持不變。觀察到的請求也不會填充持久記憶體（請求和回應派生的提取都會被跳過），因此模型本身的回應無法將轉錄文字回顯到記憶體中。

**原始視訊欄位 (#12430)。**當啟用橋接且本機視訊支援未知或不存在時，定義的`transcript`/`audioTranscript`欄位也會啟動`videoBridgeObserved`，即使在描述失敗或`maxVideos`限制之後也是如此。 `null`和空字串計數；缺失欄位和非視訊元資料則不會。保留的副本會編輯這些欄位或省略請求，並且caches/Memory會被繞過。

在這些後備路徑上，有效的呼叫者提示將成為受支援的`text`/`input_text`部分，而不是非標準提供者欄位。請求提供的兩個軌道仍然不受信任的`client`觀察，並明確警告該視頻沒有被描述，時間戳也沒有根據媒體進行驗證。現有的256-cue/64-KiB總預算和每個提示預算同時適用於兩個軌道；時間戳記必須符合經紀商的 600 秒上限和任何提供的焦點視窗。無效的曲目將被丟棄，而不是作為任意文本轉發；除非超出其合併預算，否則仍可以使用有效的兄弟姐妹。 Null/empty欄位不加入文字。此後備不會添加任何媒體獲取或轉錄。轉錄擴充欄位將從後備視訊載體及其`video_url`/`source`物件中刪除。 OpenAI電線允許名單仍然嚴格；未知的本地視訊載體仍然可用，已知的純文字目標保留安全標記。結構化修訂陰影保護附加的轉錄文本，而原始呼叫者擁有的請求保持不變。本機支援的目標和停用的橋接器保留其現有的旁路行為。

其他保留的副本使用相同的觀察請求訊號。原始的護欄前用戶端請求快照、記憶體中的待處理請求和早期拒絕的請求日誌在結構上取代了視訊部分中的轉錄欄位；由管道階段和上下文切換合成的字串提示在持久請求主體接收器中進行編輯。持久化的`video_content_removed`標記使`previous_response_id`延續無法關閉，而不是重建故意丟棄的文字。如果觀察到的請求在記錄之前丟失了其每部分的編輯陰影，或者甚至在稍後的請求突變後幾個視頻陰影之一無法匹配，則保留的請求正文將被完全省略，而不是保留部分編輯的轉錄本。

對於觀察到的請求，模型回應可能會引用轉錄本的任何部分，而無需結構化提示邊界。因此，其持久的呼叫日誌`responseBody`被遺漏標記所取代；詳細的管道工件（可以包括upstream/client主體和流塊）不會保留。語意、冪等性和推理重播快取會繞過該請求的讀取和寫入。提供者請求和客戶端可見的回應保持不變。當詳細的工件被省略時，早期的保活位元組將從臨時緩衝區中耗盡。 Kiro的格式錯誤的EventStream警告僅報告有效負載位元組計數，而不報告其內容或JSON解析器的原始錯誤。這並不是說每個不相關的provider/plugin診斷都已經過審核；更廣泛的保留匯掃描在#11658 中進行追蹤。

內部`/api/modality-bridge/video/drilldown`生命週期是一個單獨的loopback/token-authenticated快取底層。每個操作還需要一個規範的不透明主體ID。在啟用生產呼叫方之前，它必須從經過驗證的租用戶派生ID ，並且絕不能轉送用戶端選擇的值。快取鍵將該主體綁定到規範會話和視訊引用IDs，僅儲存它們的SHA-256-derived鍵，並將讀取和刪除範圍限定為同一主體。快取每個條目最多儲存 16 個派生JPEG幀，十分鐘後過期，並支援有界`start`/`end`讀取或明確會話刪除。

每個主體僅限於 16 個條目和 64 個MiB規範JPEG資料。這些限制獨立於全域64-entry/256 MiB上限：在考慮全域LRU驅逐之前，主體配額壓力僅驅逐主體最近最少使用的條目。過期的條目將從快取活動的主體和全域記帳中清除，而取消和驗證失敗不會提交部分替換。

快取拒絕在有界全影像`sharp`解碼期間產生警告的非規範 Base64、過多填充、非 JPEG 媒體、格式錯誤或截斷的JPEGs和JPEGs 。它將每個接受的圖像重新編碼為規範的JPEG，從解碼的字節中導出寬度和高度，而不是信任呼叫者字段，並丟棄任何尾隨的多語言字節而不是保留它們。只有有界規範壓縮緩衝區才會計入這兩個配額。 JSON線路限制包含 32 MiB解碼輸入上限的 Base64 開銷。每個儲存的派生都會記錄其經過驗證的JPEG format/resolution、採樣策略、派生版本、創建時間、伺服器計算的內容雜湊、雜湊父引用以及可信任呼叫者的父內容雜湊。在原子快取提交之前，在非同步decode/hash階段之間檢查取消情況。

此部分尚未將生產製作者連接到路線，並且不提供多解析度變體選擇。因此，透明視訊橋請求路徑不會產生額外的工作，而租戶綁定的主體派生和完整的FU-08多重解析度生命週期仍然是明確的後續工作，而不是記錄為完整的行為。

使用配置的視訊模型按順序為幀添加字幕。空白視訊覆蓋繼承視覺設定；如果兩者都是空的，視覺自動佈線器會選擇有效的具有視覺功能的模型。成功的字幕用穩定的`[Video description:`前綴替換原始部分，該前綴還將文本標記為不受信任的媒體派生觀察，並告訴下游模型不要遵循媒體中的指令。幀字幕快取鍵包括JPEG位元組、提示符、時間戳記和有效模型；僅快取成功的字幕。快取條目保留實際成功的生產者模型，包括回退模型；當不同型號生產不同車架時，橋會報告`mixed` 。快取命中重複使用該生產者身份，而不是將其重新標記為請求的路由計劃。整個視訊結果快取取決於每個更改輸出—提示、有效模型、採樣策略、幀計數、語義分析模式、歸一化焦點提示的SHA-256指紋、焦點視窗、 `transcript`、 `audioTranscript`和聯絡表標誌—的輸入，因此更改任何這些維度都是快取未命中，永遠不會重複使用。視覺重複資料刪除策略版本、閾值和有界候選幀計數也在結果快取鍵和元資料中明確顯示；因此，策略變更無法重複使用過時的整個影片描述。結果快取 v4 元資料保留模式和指紋，而不是原始使用者任務。 Guardrail 元資料報告所要求的和有效的分析模式；沒有可用使用者文字的請求`focused`模式將被報告為有效`full`。

護欄會提取每個支援的影片部分，但僅描述`modalityBridgeVideoMaxVideos`。對於被證明具有`supportsVideo === false`目標，失敗和超出限制的影片將成為明確的安全文字標記，因此沒有原始影片能夠倖存下來。當功能未知時，這些部分保留其視頻載體；任何後備轉錄都遵循上面的有界文本轉換。帶有`supportsVideo === true`目標繞過橋。用戶端請求中止訊號透過下載、代理佇列、子程序和字幕呼叫傳播；中止在視訊之間停止，並且永遠不會對原始媒體開放。

運行時設定由 DB 支援並經過 Zod 驗證：

| 鑰匙                                | 預設        | 範圍/行為                                                                 |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 可選運行時，選擇加入                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full`保留通用標題； `focused`使用有界的、不受信任的最新使用者上下文      |
| `modalityBridgeVideoModel`          | `""`        | 繼承Vision Bridge模型                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、 `scene_aware`或比例`segment_aware`；偵測器故障回落至`uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                          |

超過 120 秒的傳統持久性影片逾時值被限制在代理截止日期內；高於該限制的新設定寫入將被拒絕。 `GET /api/modality-bridge/video/runtime`在身份驗證或運行時探測之前需要受信任的標記環回位置，然後需要管理身份驗證。當運行時不可用時，它只會返回`available`、清理後的FFmpeg/ffprobe版本和固定原因。內部擷取端點不是公共上傳API：佇列飽和返回`503`加`Retry-After`，呼叫者斷開連線返回`499`，固定代理截止時間回傳`504`。轉換後的回應將`video->text;model=<visionModel>;parts=<videos>`加入中央`x-omniroute-modality-bridge`標頭，而不刪除視覺或音訊段。

### PII掩碼器 (`piiMasker.ts`)

運行於**兩個都**階段。

- **`preCall`**複製有效負載，遍歷`system`、 `messages`、 `input`和`prompt` （包括純字串項），並將`processPII()` （來自`@/shared/utils/inputSanitizer`）應用於字串`content`/`text`欄位。當`PII_REDACTION_ENABLED=true`時，偵測到的PII會在出站負載中進行編輯。這獨立於`INPUT_SANITIZER_MODE` （僅控制提示注入策略）。關閉密文後，通話會記錄偵測計數，而不會重寫內容。
- **`postCall`**深度複製回應，運行`sanitizePIIResponse()`加上 Responses-API-shape masker（`maskResponsesOutput` —覆蓋`output_text`和`output[].content[].text`）。如果發生任何編輯，修改後的回應將取代原始回應。

護欄永不遮擋；它僅註釋（`meta.detections`， `meta.redacted`）或重寫。

#### 按類型選擇、自訂模式和檢測計數器

**儀表板→設定→安全→ PII屏蔽**選擇_什麼_被屏蔽。它不會打開屏蔽：仍然是`PII_REDACTION_ENABLED` （請求）和`PII_RESPONSE_SANITIZATION` （回應+ SSE），預設情況下兩者都是關閉的。

- **按類型選擇**—內建 ID 列在`src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) 中。未設定意味著每種類型（此設定存在之前的行為）。請求引擎的`ssn_us`模式對應到`ssn`。模板（最小、標準、財務、巴西、 USA、 GDPR、 POPIA、完整）僅填充UI中的複選框。
- **GDPR和POPIA標識符**—十二個內建 ID，涵蓋EU和南非個人識別碼（下表）。它們的正規表示式、驗證器和管轄權標記位於一張表`src/shared/utils/piiPatterns.ts`中，回應清理器 (`src/lib/piiSanitizer.ts`) 和請求屏蔽器 (`src/shared/utils/inputSanitizer.ts`) 都會使用該表。只有當驗證器接受匹配時才會對其進行編輯；僅僅一串數字是遠遠不夠的。在這些 id 存在之前保存縮小選擇的操作員將保持其行為，直到勾選新 id。
- **客製化圖案**—最多 20 個正規表示式或通配符模式（`*` =最多 64 個非空白字符， `?` = 1 個）。匹配變成`[CUSTOM_REDACTED]`。每個模式都經過`compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`)：最多 500 個字符，標誌僅限於`g i m s u`，必須編譯，必須通過`safe-regex` （災難性回溯），並且不得匹配空字串或密文佔位符。儲存和測試時會拒絕失敗的模式，並且在執行時會跳過失敗的儲存行而不是進行編譯。自訂模式僅在屏蔽開啟時運作。
- **檢測計數器**—每個類型計數（從不匹配的值），保存在記憶體中並在重新啟動時重置（`src/lib/pii/piiDetectionStats.ts`）。它們只會在屏蔽開啟時增加。

設定位於`key_value`表（命名空間`pii_settings`、 `src/lib/db/piiSettings.ts`）中，並透過 1 秒快取讀取。 API:

| 方法   | 小路                     | 目的                                                        |
| ------ | ------------------------ | ----------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | 標誌狀態、 `enabledTypes`、 `customPatterns`、偵測計數器    |
| `PUT`  | `/api/settings/pii`      | 替換`enabledTypes` （`null` =全部） and/or `customPatterns` |
| `POST` | `/api/settings/pii/test` | 針對最多 8 個KB的樣本試運行一種模式；沒有儲存任何內容       |

這三個都需要管理身份驗證並使用Zod (`src/shared/validation/schemas/piiSettings.ts`) 驗證主體。

#### GDPR (EU) 和POPIA （南非）標識符

| ID                  | 識別符            | 驗證                                                                  |
| ------------------- | ----------------- | --------------------------------------------------------------------- |
| `iban`              | IBAN              | 已知國家/地區，該國家/地區的確切長度， ISO 13616 MOD-97-10            |
| `eu_vat`            | EU VAT號碼        | 已知的成員國前綴和該州的號碼格式（無VIES查找）                        |
| `es_dni_nie`        | 西班牙語DNI / NIE | 控製字母（值模 23）； NIE是`X/Y/Z` + 7 位數字                         |
| `it_codice_fiscale` | 義大利法典        | odd/even位置表中的控製字母                                            |
| `pl_pesel`          | 波蘭語PESEL       | 加權校驗和以及存在的編碼出生日期                                      |
| `nl_bsn`            | 荷蘭語BSN         | 11 級（重量 9..2、-1）                                                |
| `de_steuer_id`      | 德國Steuer-ID     | ISO 7064 Mod 11,10 加上數字結構規則（無前導 0）                       |
| `se_personnummer`   | 瑞典人號碼        | Luhn 最後十位數字和合理的出生日期（10 或 12 位數字）                  |
| `za_id`             | 南非ID號碼        | Luhn 全部 13 位數字，有效出生month/day，公民身份數字 0 或 1           |
| `za_phone`          | 南非電話          | `+27` / `27`前綴，或用空格或連字符書寫的國家`0..`形式                 |
| `za_vat`            | 南非VAT號碼       | `4`開頭的10位數字**和**「VAT」/「BTW」之前的48個字符                  |
| `za_tax_ref`        | 南非稅務參考號    | 以`0`開頭的 10 位數字 -`3`, Luhn,**和**「tax」/「SARS」之前的48個字符 |

由於純數字格式與訂單號、內部版本號和時間戳發生衝突，因此最弱的格式（`za_vat`、 `za_tax_ref`）需要關鍵字提示，並且裸露的十位`0..`號碼不會被視為南非電話號碼。間隔IBANs (`GB29 NWBK ...`) 不符。在流路徑上，僅在目前區塊內尋找提示。 id 位於通用電話模式之前，因此經過驗證的識別碼保留其自己的佔位符（`[IBAN_REDACTED]`、 `[NL_BSN_REDACTED]`等）。 `gdpr`和`popia`模板分別選擇EU和南非 id。屏蔽本身保持選擇加入狀態（硬規則#20）：這裡沒有任何內容改變功能標誌預設值。

### 立即註射 (`promptInjection.ts`)

偵測使用者提供的內容中的對抗結構並強制執行配置的策略。行為由環境變數和建構函數選項驅動：

| 環境     | 環境變數                                                                                           | 預設   | 影響                                                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 啟用     | `INPUT_SANITIZER_ENABLED`                                                                          | `true` | `false`時，護欄短路。                                                                                                                        |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                    | `warn` | 注入策略： `block`、 `warn`或`log`。 （`redact`被接受用於向後相容，但確實**不是**剝離注入文字；請求PII重寫由`PII_REDACTION_ENABLED`控制。 ） |
| 區塊閾值 | `blockThreshold`選項 / `INPUT_SANITIZER_BLOCK_THRESHOLD` （別名`INJECTION_GUARD_BLOCK_THRESHOLD`） | `high` | 阻止所需的最低嚴重程度。 Medium 預設僅觀察。                                                                                                 |

**模式優先權**(`getMode`): 呼叫者`options.mode` → `INJECTION_GUARD_MODE`**DB功能標誌覆蓋**（儀表板→設定→功能標誌） → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`。因此，儀表板覆蓋會勝過環境變量，因此功能標誌UI控制即時運行的防護（無需重新啟動）。 DB讀取是故障安全的：如果出錯，防護程式會回退到基於 env 的行為，並且當未設定覆蓋時，行為與僅 env 解析相同。

檢測來源：

1. `sanitizeRequest()`來自`@/shared/utils/inputSanitizer` （管道中其他地方使用的共用偵測器集）。
2. 內建`DEFAULT_GUARD_PATTERNS` （目前為`system_override_inline`和`markdown_system_block`，皆為`high`嚴重性）。
3. 透過建構函數選項（字串、正規表示式或`{ name, pattern, severity }`記錄）傳遞的可選`customPatterns` 。

當`mode === "block"`**和**至少一項檢測滿足嚴重性閾值， `preCall`返回`{ block: true, message: "Request rejected: suspicious content detected" }`。在`warn`/`log`模式下，guardrail 會記錄但允許通話。也為需要評估提示而無需透過登錄機碼的呼叫者匯出共用幫助程式`evaluatePromptInjection()` 。

**掃描綁定（v3.8.20）：**探測器僅檢查**前 16 KB** `src/shared/utils/inputSanitizer.ts`中加入的提示文字— `MAX_INJECTION_SCAN_BYTES = 16 * 1024` （16 384 位元組）。 `detectInjection()`和`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`都在運行模式循環之前。注入指令位於輸入頂部附近，因此這可以將正規表示式CPU/GC限制在數百 KB 的有效負載上，而不會削弱偵測（請參閱#3932、#4041）。

### 憑證屏蔽器 (`credentialMasker.ts`)

運行於**兩個都**階段，預設鏈中的最後一個（優先級`95`）。從出站有效負載（訊息內容、工具呼叫參數、工具結果）編輯眾所周知的 API 金鑰/秘密令牌模式**和**提供者回應，因此貼上到提示中的憑證（或由工具結果回顯）不會洩漏給上游提供者或返回給客戶端。

- **僅選擇加入**，與PII編輯相同的約定（硬規則#20-相鄰）：停用，除非`settings.credentialRedactionEnabled === true`**或者**`CREDENTIAL_REDACTION_ENABLED=true`.關閉它後，護欄是一個無操作—它永遠不會阻塞，也不會重寫。
- `redactCredentials()`遍歷完整的payload/response樹（`walkValue()`，原型污染安全，通過`WeakSet`循環安全）並用`[REDACTED:<type>]`佔位符替換匹配項，僅克隆實際更改的分支。
- `CREDENTIAL_PATTERNS`涵蓋LLM提供者金鑰（OpenAI、 OpenAI-proj、 Anthropic、 Google、 Hugging Face、 Replicate）、 VCS/SaaS幣（GitHub、 Slack、 Linear、 Notion、 npm、 Postman、 Discord）、支付金鑰（AWS 、lq 面）、金鑰（ SendGridJWTs、附加 低。 、憑證承載連接字串（`mongodb://user:pass@...`等），以及通用`Authorization`/`x-api-key`/`api-key`/`apikey`標頭值模式。標頭形狀的鍵（`authorization`、 `x-api-key`、 `api-key`、 `apikey`）在結構上進行編輯（僅值，保留`Bearer `/`Basic `等方案前綴），而不是透過通用文字正規表示式。
- 護欄永不遮擋；它只重寫（`modifiedPayload` / `modifiedResponse`）和註解（`meta.credentialsRedacted`， `meta.count`）。

回歸守衛： `tests/unit/credential-masker-guardrail.test.ts`。

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
