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

GLM 5.3 基本模型和`glm-5.3-{low,high,max}`具有顯式`supportsVision:false` registry/spec資料。 GLM 5.3 Flash 變體仍然是原生視覺型號。 Claude Code的`/v1/messages`路由進入共享`handleChat`預先呼叫護欄鏈**前**Claude 到 OpenAI 的翻譯；嵌套的`Read`工具結果圖像必須在翻譯將其提升為OpenAI `image_url`內容 (#17069) 之前進行描述或處理。

攔截針對的影像承載請求**非視覺模型**並將整個請求重新路由到支援視覺的模型，或在上游呼叫之前用可配置視覺模型產生的文字描述取代圖像部分。這使得純文字提供者能夠透明地處理多模式負載。

流動：

1. 如果目標模型已經支援視覺，則跳過（除非它出現在強制橋列表`isVisionBridgeForcedModel`中）。
2. 透過`extractImageParts(messages)` (`visionBridgeHelpers.ts`) 提取圖像部分，委託給**統一媒體偵測器**`open-sse/utils/mediaParts.ts` —的`detectMediaParts()`與組合相容性過濾器共用單一事實來源。提取列入`replaceImageParts`可以拼接回來的形狀（提取↔替換合約）： OpenAI `image_url`、 Anthropic base64 `source.type:"base64"`、 Anthropic URL `source.type:"url"`和 Responses API `input_image`。嵌套在Claude代碼`tool_result.content`和回應工具輸出中的匹配圖像也會被提取並替換到其原始路徑；僅指示符形狀是組合過濾器材料，不會被提取。如果沒有找到則跳過。
3. 透過`resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) 解析執行時間設定：新的`modalityBridge*`設定鍵 win；遺留的`visionBridge*`鑰仍然是**單週期回退**（回滾視窗）。當橋被禁用時，在任何媒體遍歷之前跳過。
4. 模式選擇器（`modalityBridgeVisionMode`，見下表）決定重新路由與描述。重新路由返回`modifiedPayload`僅交換`model` ，加上元`{ rerouted, fromModel, toModel, imagesKept }`。
5. 描述路徑：在`maxImages`上捕捉影像，寫任務感知提示，查閱描述快取，呼叫視覺模型**並聯**(`Promise.allSettled`)，並在其位置注入`[Image N]: <description>`文字部分。失敗的描述會產生`null`：為unknown/vision-capable目標（#4012）保留原始影像，但**已確認的純文字直接目標**或零視覺組合為每個未描述的影像取得明確的`(unavailable — no vision-capable provider connected)`文字存根，包括部分失敗和超出描述呼叫上限 (#17069) 的影像。現有的全部失敗的組合描述後備仍然存在（#8430）。
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

`0` （預設）意味著**沒有上限**— `callVisionModel()`傳回的描述未經修改地傳遞，保留現有行為。 100–50000 範圍內的任何值都會在將描述拼接回`[Image N]: <description>` （ `src/lib/guardrails/visionBridge.ts`中的`VisionBridgeGuardrail.preCall()` ）之前截斷帶有`…`後綴的描述。對於細節繁重的OCR任務，下游模型需要完整轉錄，請提高此值；降低它以限制閒聊視覺模型上的代幣使用。儀表板欄位位於「Vision」標籤的「進階」面板（ `ModalityBridgeVisionTab.tsx`中的`modality-bridge-max-chars` ）中，並將 1 到 99 之間的任何值限制在 100 下限，同時保留顯式`0`不變— `0`本身就是一個有效的Zod值 (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)，而不僅僅是「未設定」的預設值。

#### 描述快取（`modalityBridge/bridgeCache.ts`）

用於描述輸出的記憶體中LRU + TTL快取，在進程範圍內共享。具有長度前綴幀的密鑰= `sha256(imageRef + composedPrompt + configuredBridgeModel)` （無字段邊界衝突）。模型組件是**配置好的**橋接模型，而不是實際回答— `callVisionModel`模型可能會在內部回退，並且每次嘗試鍵入都會使快取碎片化。失敗的描述永遠不會被快取。設定:

| 鑰匙                            | 預設   | 範圍    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 遠程影像歸一化（自循環describe/base64獲取）

當橋獲取一個**偏僻的**圖像本身— Anthropic描述自呼叫和 claude-wire-format base64 轉換 (`ensureBase64ImagesForClaudeWire`)，兩者均透過`visionBridgeHelpers.ts` —中的`fetchRemoteImageAsDataUri()`產生的資料URI在嵌入視覺模型請求之前透過`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) 傳遞。超大圖像被縮小到**2048px 長邊**（匹配調整大小上限OpenAI/Anthropic已經應用於伺服器端），這會在不改變視覺模型所看到的內容的情況下削減上傳bytes/latency 。調整大小使用`sharp`，透過動態導入載入：在其本機二進位檔案無法載入的平台上， `normalizeDataUri()`**從不拋出**—它會回退到原始位元組的直通，因此describe/base64-conversion路徑始終保持工作。非圖像位元組（未返回可解碼圖像的提取）也會原封不動地傳遞。這種標準化的範圍僅限於橋接器為其自己的自呼叫—獲取的圖像，它永遠不會應用於呼叫者的原始直通有效負載，這與僅選擇加入突變原則（硬規則#20）一致。

#### 設定架構+遷移

新的`modalityBridge*`密鑰在`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) 中經過 Zod 驗證： `modalityBridgeVisionEnabled`、 `modalityBridgeVisionMode`、 `modalityBridgeVisionModel`、 `modalityBridgeVisionTaskAware`、 `modalityBridgeVisionPrompt`、 `modalityBridgeVisionTimeout`、 `modalityBridgeVisionMaxImages`、 `modalityBridgeVisionMaxChars`、 `modalityBridgeCache*`三重奏和音頻橋使用的`modalityBridgeAudio*`組。遷移`141_modality_bridge_settings.sql`將現有的舊`visionBridge*`值複製到匹配的新鍵（冪等，永遠不會覆蓋運算符設定的`modalityBridge*`值）；舊金鑰仍然被接受作為一個發布週期的讀取回退。

#### 透明度標題+統計數據

描述轉換的回應攜帶`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` （由`modalityBridge/bridgeStats.ts`中的`buildModalityBridgeHeader()`構建，由`src/sse/handlers/chatHelpers.ts`中的`withModalityBridgeHeader()`標記）。重新路由的請求獲取**不**header —有效負載未受影響，且模型交換已在回應正文的`model`欄位中可見。

`GET /api/modality-bridge/stats` （管理驗證，與`GET /api/settings`相同層）傳回`vision`、 `audio`和`video`的記憶體中每種模式計數器`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` 。 `averageLatencyMs`使用`latencySamples`（不是所有嘗試）作為其分母；沒有計時的操作不會產生零毫秒樣本。 `bridged`仍然是成功轉換的向後相容別名；失敗的嘗試不會增加它。根據設計，計數器在進程重新啟動時重置（遙測，而不是會計）。

#### 儀表板配置

專用儀表板頁面是`/dashboard/settings/modality-bridge`。其 URL 可尋址`Vision`、 `Audio`和`Video`選項卡在切換`tab`值時保留查詢參數。 Vision 標籤公開啟用、模式、模型選擇（包括自動預設值）、任務感知提示、進階timeout/image/description-length/cache限制、執行時間計數器和受保護的範例請求。 「音訊」標籤也是即時的：它公開支援、具有自動功能的僅 STT 模型選擇器、 timeout/max-clip限制、音訊計數器和`input_audio`樣本測試。 “視頻”選項卡具有功能性：它報告FFmpeg/ffprobe運行時狀態—四種顯式UI狀態之一（探測正在運行或無法完成時的`unknown` 、客戶端跳過探測的非環回儀表板主機上的`restricted` 、探測到並確認丟失後的`unavailable` ，或帶有FFmpeg/ffprobe版本的`available` ） —保留enable/model/frame/video/timeout限制，將模型選擇器過濾為支持視覺的模型，並公開視頻計數器。

之前AI設定下的Vision Bridge卡是新頁面的相容連結；它不再擁有該表格的第二份副本。媒體提供者還將圖像到文字和語音到文字工作流程連結到對應的模態橋選項卡，而無需刪除現有的語音到文字遊樂場。

**Self-loop admission bypass:** when the describe call routes through OmniRoute's own `/v1` self-loop (non-standard provider model), the sub-request sends `x-omniroute-admission-bypass: internal` and is authenticated with the resolved self-loop credential — the local `sk_omniroute` sentinel in local mode, or the operator-configured `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) so `REQUIRE_API_KEY=true` deployments can still run the describe call. The bypass is only honored for those exact credentials, so external clients cannot use the header to skip admission.

舊版預設值位於`src/shared/constants/visionBridgeDefaults.ts`中；新的mode/task-aware/cache預設值和設定解析器位於`src/shared/constants/modalityBridgeDefaults.ts`中。護欄公開了`deps`建構函式選項，因此測試可以注入偽造的`getSettings`和`callVisionModel`實作。

### 音頻橋 (`audioBridge.ts`) —模態橋PR-3

在音訊聊天請求到達未知接受音訊輸入的目標之前攔截它們。它永遠不會重新路由聊天請求：音訊部分透過現有的 OpenAI 相容的多部分端點進行轉錄，並且所選的聊天模型繼續使用文字轉錄。

流動：

1. 透過`getResolvedModelCapabilities()`解析`supportsAudio` 。明確的提供者註冊表元數據獲勝，然後是靜態模型元數據，然後是同步的`modalities_input`。沒有`audio`的聲明輸入清單是`false`；沒有能力證據仍然存在`null`。 `false`和`null`都啟動保守橋，而`true`繞過它。
2. 解析`modalityBridgeAudio*`設定並透過共用`detectMediaParts()`偵測器從每個訊息中提取可拼接的頂級音訊部分。支援的線形狀為OpenAI `input_audio`、 `audio_url`和`source.media_type: "audio/*"`。偵測到嵌套音訊以進行路由，但不會被拼接路徑刪除。工作的上限為`modalityBridgeAudioMaxClips`；後面的部分不變。
3. 尊重已配置的`provider/model`，或讓`selectAudioBridgeModel()`按穩定的目錄順序遍歷`AUDIO_TRANSCRIPTION_PROVIDERS`並選擇具有可用的活動提供者憑證的第一個模型。
4. `callAudioTranscription()`將base64/data-URI音訊轉換為多部分`file`，或透過具有DNS固定和 25 MB綁定的僅限公共出站防護下載遠端`audio_url` 。然後，它POSTs檔案並選擇模型到本機`/v1/audio/transcriptions`自循環，並使用`resolveSelfLoopBearer()`進行身份驗證。現有的轉錄路由執行正常的憑證查找、 cooldown/rate-limit處理和提供者調度。
5. 成功的呼叫將其部分替換為`[Audio N]: <transcript>`。使用`Promise.allSettled`運行的呼叫：單一故障保留原始音訊部分（#4012合約）。如果每次呼叫都失敗且目標被證明為`supportsAudio === false`，則這些部分將變成`[Audio N]: (unavailable — no STT provider connected)` （#8430合約）。對於未知目標（`null`），全部失敗結果保持不變。沒有可用STT憑證的經過驗證的純文字目標會接收相同的明確存根，而不發出網路呼叫。

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

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) 擁有請求遍歷、 capability/policy檢查、每個請求聚合和回應負載。每個視訊工作—獲取、整體結果快取、描述幀序列（融合任何呼叫者聲明的音訊轉錄），以及每次嘗試metrics/abort/cleanup —隱藏在`videoBridgePipeline.ts`中的`processVideoPart`後面，在`preCall`循環內每個視訊部分呼叫一次。此模組還定義了顯式連接埠邊界`VideoMediaBrokerPort` （獲取位元組並提取採樣幀）、 `VideoAudioTranscriptionPort` （將呼叫者聲明的音訊轉錄與採樣字幕融合）和`VideoDrilldownPort` （傳統原始儲存形狀）。產生STT和訊框保留透過`createVideoSttAdapter`和`createVideoDrilldownAdapter`圍繞描述埠組成；後者使用共享的不透明句柄生命週期。

公共`/v1`請求路徑從不匯入或呼叫子流程。遠端視訊下載50 MiB綁定；內嵌 Base64 視訊具有保守的 36 MiB解碼每個視訊上限，因此model/messages/framing信封可以保留在 50 MiB的公共JSON請求准入限制內。在分配之前檢查內聯長度和解碼大小估計。初始遠端URL和每個重定向都需要HTTPS ，使用現有的僅限公共出站防護和DNS固定。然後，位元組穿過確切的內部`POST /api/modality-bridge/video/extract`代理邊界。此路由既是`LOCAL_ONLY`又是`SPAWN_CAPABLE`，僅接受每個程序經過驗證的可信任環回請求，並且從不接受URL、檔案系統路徑、可執行檔或參數清單。 API正文大小管道和處理程序的增量正文讀取器獨立強制執行 50 個MiB代理輸入上限。它的有界佇列一次執行一個提取，允許四個掛起作業，並將掛起輸入上限為 100 MiB。

在broker內部， `ffprobe`讀取一個私有的本機檔案；固定格式允許清單不包括播放清單和清單格式。對於允許的 MOV 系列容器，預設情況下外部MOV資料引用保持停用狀態，並且固定命令不會選擇加入它們。 `ffprobe`和`ffmpeg`都使用`file` -only協定白名單、單線程、固定參數數組、無 shell 以及從`PATH`解析的可執行檔。附加圖片封面串流不是可播放的候選人。所有可播放的串流都必須滿足限制，並且在確定性最低索引回退之前首選明確預設串流。影片長度限制為 600 秒，每維 8,192 像素，來源像素為 33,554,432 個。 FFmpeg對 1-16 個中點JPEG幀進行取樣，將長邊縮小到最多 1,024 像素，而不放大較小的輸入，並且從不接收URL。預設採樣為`uniform` 。可選的`scene_aware`和實驗性`segment_aware`策略對已驗證的本地流執行額外的固定FFmpeg傳遞，選擇有界`showinfo`場景時間戳，並在檢測器故障、超時、格式錯誤的輸出或空候選集時確定性地回退到相同的統一中點。分段感知模式根據已驗證的場景間隔按比例分配中點樣本；下面詳細介紹了段感知證據和後備行為。在每個策略中選擇後都會套用 16 幀硬上限。當場景感知請求只有一幀預算時，它使用活動全視訊或焦點視窗的統一中點並報告`policyEffective: uniform`：單一選定的場景幀無法保留兩個時間端。呼叫者可以選擇提供有限焦點窗口（`start`/`end`秒）；邊界被限制為媒體持續時間，拒絕反向或非有限窗口，並且所有採樣策略僅在標準化間隔內執行。產生的視窗包含在採樣元資料和不受信任的描述前綴中，因此下游模型可以將重點摘錄與完整時間軸區分開來。

語意標題焦點是一個單獨的、明確的設定。預設的`full`分析模式保留現有的幀提示，並且從不將請求文字轉送到標題模型。在`focused`模式下，橋僅從同一 Chat 或 Responses 容器中讀取最新的非空用戶編寫的`text`/`input_text` ，將其規範化為NFC，折疊控製字元和空格，並將其限制為 500 個 Unicode 程式碼點。空結果會回退到確切的`full`提示符號。可用提示在專用的不受信任用戶上下文區塊中序列化為JSON ，並且可能僅優先考慮可觀察的細節；它不能覆蓋針對遵循媒體中可見或可聽指令的單獨警告。文字焦點永遠不會推斷`start`/`end`或更改時間採樣器。

#### FU-07結構片段證據

`segment_aware`對已驗證的本地視訊串流使用一次有界預分析。固定濾波器鏈首先縮放至最多 320 像素寬，檢測場景變化和凍結間隔，然後以每秒 1 幀的速度採樣以獲得模糊、平均亮度和spatial/temporal資訊。該通道僅限於 600 個結構樣本、1 個FFmpeg/filter線程、相同的`file` -only協定和容器允許清單、1 個MiB進程輸出綁定，並且在代理程式的共享abort/deadline.內最多保留 30 秒，它從不接受來自請求的命令、過濾器、路徑或URL 。

結構值是確定性取樣證據，而不是語意視訊理解。它們不會推斷主題、動作、字幕、語音或使用者意圖。場景和凍結邊界形成片段；凍結覆蓋、模糊、曝光、空間細節和時間變化僅影響現有 1-16 幀預算的分配方式。完全凍結的段的上限為一幀，而非凍結的段則競爭剩餘的預算。當邊界數量超過幀數時，會保留統一的時間線覆蓋範圍，因此快速的早期剪切無法隱藏較長的尾隨片段。凍結邊界的 1 秒分析解析度內的場景邊界被合併。

缺少過濾器、 malformed/empty證據、偵測器錯誤或有限的預分析逾時無法實現精確的統一中點策略。呼叫者中止或代理截止時間不會失敗開啟：它終止正在進行的子進程，防止稍後的幀提取，並且私有臨時樹在`finally`中被刪除。

`scripts/perf/video-bridge-fu07-eval.ts`產生確定性的真實FFmpeg固定裝置，用於重複資料刪除後的字幕呼叫節省、密集運動預算分配、 blur/exposure/SI-TI證據、長尾快速剪切和逐漸淡出誤報。它記錄預分析牆時間，以及`/usr/bin/time`可用的子CPU和峰值RSS。它的品質檢查只是結構性的預言。真正的字幕模型品質仍然是`HOLD`因為該工具沒有授權端點或凍結判斷。除非`--caption-cost-per-call-usd`提供明確的每次呼叫正估計，否則金錢節省也仍然是`HOLD` ；該腳本永遠不會偽造任何結果。

每個幀限制為 4 MiB，所有原始幀總共限制為 23 MiB，序列化代理回應限制為 32 MiB。 `finally`中的私有暫存目錄被刪除。 OmniRoute不捆綁FFmpeg且不接受自訂可執行路徑。在新增字幕之前，橋接器會套用保守的視覺重複資料刪除過程：每個JPEG都減少為 16 × 16 灰階緩衝區，並且僅與保留的最後一幀進行比較。對於超過一幀的請求字幕預算，提取會提供最多兩倍於預算的有界候選池，並且永遠不會超過 16 幀。所要求的上限僅在重複資料刪除後應用，並且當預算至少為 2 時，在最終稀疏期間保留第一個和最終選定的候選者。版本化`grayscale-16x16-mean-cells-v2`策略使用平均亮度增量和歸一化增量至少為 0.05 的縮圖單元的比率中的較大者。重複閾值是常數 0.04，選擇它是為了可預測性，而不是作為運行時設定公開。這種輔助高對比度訊號保留了僅平均值比較可以隱藏的小運動和可見文字變化。比較器或解碼器錯誤開啟並保持覆蓋。輸出元資料將提取的候選幀、成功使用的幀和丟棄的視覺重複項分開。

明确标记的视频部分可能会请求带时间戳的联系表。该桥最多构建一个4列、16帧的JPEG网格。每個 512 像素單元將其來源時間戳刻錄到高對比度底部帶中，而相同的時間戳記保留在文字元資料中以供下游關聯和審核。完整的JPEG仍上限為 32 MiB。如果`sharp`无法解码或组合网格，则桥接器会回退到各个JPEG帧；客户端中止仍然通过工作表操作传播。

促銷證據故意與合成成分微基準分開。 `scripts/perf/video-bridge-contact-sheet-eval.ts`為真正的 OpenAI 相容視覺模型定義了模式版本化的A/B工具。它測量提供者報告的令牌、端到端牆延遲（包括工作表組成）、模型呼叫計數和清單定義的事實保留。原始模型回應不會寫入報告；僅保留SHA-256摘要和匹配的事實IDs 。除非傳遞`--execute-real`並配置`--model`、 `OMNIROUTE_BASE_URL`和`OMNIROUTE_API_KEY` ，否則該工具不會進行網路或付費模型呼叫。如果沒有明確的實際運行，其機器可讀的判決仍然是`HOLD`；綜合payload/call-count測量值本身並不能作為晉升證據。

單獨的`scripts/perf/video-bridge-promotion-eval.ts`消耗FU-07或FU-09觀測值。晉升准入需要所有八種綜合場景類型加上經過淨化的真實剪輯、每個角色和案例至少三個測量的重複、所有十個聲明的指標、凍結的media/prompt/expected-fact/settings摘要、獨特的觀察IDs和經過驗證的種子A/B訂單。執行收據綁定語料庫摘要、精確候選SHA和模型修訂。丢失或无效的测量仍然是`HOLD`，包括高于 30 s 的CPU 、高于 512 MiB峰值RSS或高于 30 s 的预分析。这些是证据接纳上限，而不是新的运行时RSS执行保证。

FU-07要求至少 98% 的品質保留和不超過 1.2 倍基線的 p95 延遲，加上等效平均字幕呼叫的 0.05 絕對案例平衡平均召回率改進，或至少減少 10% 的平均去重後字幕呼叫。 FU-09要求至少 0.85 的質量、95% 的保留率、20% 的中位數延遲減少和 10% 的令牌減少。關鍵事實遺失、注入合規性或缺失使用會阻礙晉升。一次執行不能促進任何事情： `--previous-report`確認同一個policy/model的兩個不同的、不重疊的、連續合格的執行revision/candidate/corpus.抽樣實驗無法確認接觸表實驗。

收集器應該在記憶體中對回應進行評分，並保存`responseDigest` plus 指標和觀察綁定，而不是回應文字。消費者也閱讀遺留的原始觀察結果，但絕不會將該文本複製到其報告中。每個觀測值恰好接受`responseDigest`或`rawResponseText`之一。版本控制的允許清單保持為空，並具有不可變的`hold`預設值。合格的條目需要其證據參考、策略、模型修訂、精確候選SHA、清單摘要和兩個不同的運行IDs；衝突的上下文被拒絕。這些元數據是審計合同，不能證明引用的文件包含真實的測量結果。在新增任何條目之前查看實際收據。管理統計端點和視訊儀表板暴露了保守的準備。單獨配置的模型別名不會建立其修訂版本或運行候選SHA，因此當前儀表板報告`HOLD`而不是重複使用來自另一個執行上下文的資格。明確的實驗選擇與推廣是分開的；沒有預設值會自動更改。

當呼叫者已經擁有對齊文字時，可以將可選的`transcript.cues`數組附加到支援的視訊部分。每個提示必須攜帶`text`、探測持續時間內的有限`start`/`end`間隔以及白名單`source` （`client`、 `embedded`或`audio-bridge`）； `confidence`預設為`1`並且必須保持在`0`和`1`之間。完全相同的重複提示被折疊。 OmniRoute永遠不會從此元資料開始轉錄：經過驗證的線索會被複製到具有來源、置信度和間隔的描述結果中，並與幀標題一起呈現為不受信任的觀察結果。無效、超出範圍或無出處的文字將被拒絕，而不是混合到字幕流中。兩個請求正文轉錄通道都將提供的來源標準化為`client`，包括自斷言的`embedded`或`audio-bridge`標籤。只有伺服器擁有的適配器才能透過僅代碼`trustedSource`參數分配這些可信任標籤；請求JSON欄位無法到達該參數。轉錄文本仍然是不受信任的媒體衍生內容，無論其來源如何，並且絕不能確定授權。

高級呼叫者可以為同一視頻提供`audioTranscript`軌道；它被視為客戶端提供的文本，而不是伺服器轉錄的證明。融合縫在一個截止日期和中止信號下運行視覺和音頻觀察，在公共時間線上對它們進行排序，折疊精確的重複項，並在只有一側成功時報告部分結果。無效的`audioTranscript`會降級為部分結果—保留視覺描述，並且音訊分支記錄經過淨化的故障碼—而不是使整個視訊失敗。每個分支的可用性、部分標誌和清理後的故障碼都保留在所描述的結果、護欄元資料 (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`)、結果快取元資料和橋融合計數器中。預設視訊橋路徑不會呼叫語音轉文字或下載第二個媒體副本；如果沒有明確的軌道，它仍然只是視訊。

**轉錄本保留（#12150 P1）。**每當視頻橋（本身選擇加入）呈現轉錄提示—時，這會自動應用，沒有單獨的保留標誌。當請求呈現任何轉錄提示（呼叫者聲明的`transcript`或融合的`audioTranscript`）時，護欄將其標記為`videoBridgeObserved`並生成視頻描述—的編輯陰影，其中每個提示的自由文本正文都被替換為`[redacted-video-transcript]`，通過在組裝字串之前替換結構`[music]`提示`[inaudible]`的正文`]`從不解析扁平— ，因此沒有提示—持久的呼叫日誌請求正文將每個視訊派生的文字部分交換為經過內容相等匹配的經過編輯的陰影； `fullText`錨點是從完成的預呼叫 Guardrail 有效負載中重新讀取的，因此在後面的鏈 Guardrail（ PII和憑證掩碼器、優先級10/95）重寫文本並在system-prompt/handoff/memory 。向上游發送到模型的主體保持不變。觀察到的請求也不會填充持久記憶體（請求和回應派生的提取都會被跳過），因此模型本身的回應無法將轉錄文字回顯到記憶體中。

**原始視訊欄位 (#12430)。**當啟用橋接且本機視訊支援未知或不存在時，定義的`transcript`/`audioTranscript`欄位也會啟動`videoBridgeObserved`，即使在描述失敗或`maxVideos`限制之後也是如此。 `null`和空字串計數；缺失欄位和非視訊元資料則不會。保留的副本會編輯這些欄位或省略請求，並且caches/Memory會被繞過。

在這些後備路徑上，有效的呼叫者提示將成為受支援的`text`/`input_text`部分，而不是非標準提供者欄位。請求提供的兩個軌道仍然不受信任的`client`觀察，並明確警告該視頻沒有被描述，時間戳也沒有根據媒體進行驗證。現有的256-cue/64-KiB總預算和每個提示預算同時適用於兩個軌道；時間戳記必須符合經紀商的 600 秒上限和任何提供的焦點視窗。無效的曲目將被丟棄，而不是作為任意文字轉發；除非超出其合併預算，否則仍可使用有效的兄弟姐妹。 Null/empty欄位不加入文字。此後備不會添加任何媒體獲取或轉錄。轉錄擴充欄位將從後備視訊載體及其`video_url`/`source`物件中刪除。 OpenAI電線允許名單仍然嚴格；未知的本地視訊載體仍然可用，已知的純文字目標保留安全標記。結構化修訂陰影保護附加的轉錄文本，而原始呼叫者擁有的請求保持不變。本機支援的目標和停用的橋接器保留其現有的旁路行為。

其他保留的副本使用相同的觀察請求訊號。原始的護欄前用戶端請求快照、記憶體中的待處理請求和早期拒絕的請求日誌在結構上取代了視訊部分中的轉錄欄位；由管道階段和上下文切換合成的字串提示在持久請求主體接收器中進行編輯。持久化的`video_content_removed`標記使`previous_response_id`延續無法關閉，而不是重建故意丟棄的文字。如果觀察到的請求在記錄之前丟失了其每部分的編輯陰影，或者甚至在稍後的請求突變後幾個視頻陰影之一無法匹配，則保留的請求正文將被完全省略，而不是保留部分編輯的轉錄本。

對於觀察到的請求，模型回應可能會引用轉錄本的任何部分，而無需結構化提示邊界。因此，其持久的呼叫日誌`responseBody`被遺漏標記所取代；詳細的管道工件（可以包括upstream/client主體和流塊）不會保留。語意、冪等性和推理重播快取會繞過該請求的讀取和寫入。提供者請求和客戶端可見的回應保持不變。當詳細的工件被省略時，早期的保活位元組將從臨時緩衝區中耗盡。 Kiro的格式錯誤的EventStream警告僅報告有效負載位元組計數，而不報告其內容或JSON解析器的原始錯誤。這並不是說每個不相關的provider/plugin診斷都已經過審核； #11658中追蹤更廣泛的保留匯掃描。

內部`/api/modality-bridge/video/drilldown`生命週期是一個單獨的loopback/token-authenticated快取底層。每個操作還需要一個規範的不透明主體ID。在啟用生產呼叫方之前，它必須從經過驗證的租用戶派生ID ，並且絕不能轉送用戶端選擇的值。快取鍵將該主體綁定到規範會話和視訊引用IDs，僅儲存它們的SHA-256-derived鍵，並將讀取和刪除範圍限定為同一主體。快取每個條目最多儲存 16 個派生JPEG幀，十分鐘後過期，並支援有界`start`/`end`讀取或明確會話刪除。

每個主體僅限於 16 個條目和 64 個MiB規範JPEG資料。這些限制獨立於全域64-entry/256 MiB上限：在考慮全域LRU驅逐之前，主體配額壓力僅驅逐主體最近最少使用的條目。過期的條目將從快取活動的主體和全域記帳中清除，而取消和驗證失敗不會提交部分替換。

快取拒絕在有界全影像`sharp`解碼期間產生警告的非規範 Base64、過多填充、非 JPEG 媒體、格式錯誤或截斷的JPEGs和JPEGs 。它將每個接受的圖像重新編碼為規範的JPEG，從解碼的字節中導出寬度和高度，而不是信任呼叫者字段，並丟棄任何尾隨的多語言字節而不是保留它們。只有有界規範壓縮緩衝區才會計入這兩個配額。 JSON線路限制包含 32 MiB解碼輸入上限的 Base64 開銷。每個儲存的派生都會記錄其經過驗證的JPEG format/resolution、採樣策略、派生版本、創建時間、伺服器計算的內容雜湊、雜湊父引用以及可信任呼叫者的父內容雜湊。在原子快取提交之前，在非同步decode/hash階段之間檢查取消情況。

製作製作人僅在成功的視覺分析後重用已派生的代理幀，無需第二個視頻download/extraction.它需要操作員`modalityBridgeVideoDrilldownEnabled=true`、嚴格的每部分`drilldown: true`和經過身份驗證的 API 密鑰記錄ID。客戶聲明的principal/session值永遠不會建立所有權。如果沒有這三個條件，它就不會散列、調整大小或保留其他幀。保留失敗保留了可用的視覺反應。同意的請求會繞過整個視訊結果快取，因此快取的結果永遠不會重播句柄。

成功的JSON和SSE回應在有界`x-omniroute-video-drilldown`標頭中最多公開四個不透明句柄。授權瀏覽器來源可以讀取該標頭，而無需擴大CORS來源策略。新句柄使用`v1.<32-byte random base64url token>`，註冊表僅保留其SHA-256雜湊值。 reader/header解析器也接受舊的 64 進位標記。經過驗證的公共消費者是`GET /api/v1/video-bridge/drilldown?handle=...`，由`modalityBridgeVideoDrilldownRemoteEnabled=true`獨立控制。即使啟用了舊版`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env 回退，明確持久性 false 也會撤銷存取權限。生產保留具有類似的傳統`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`後備。兩個後備選項均預設為關閉。

消費者從經過驗證的金鑰中取得所有權並應用金鑰策略： GET和DELETE都屬於`video`端點類別，包括`/v1`和`/api/v1`別名。具有非空端點白名單的鍵必須包含`video`；不受限制的金鑰保持相容。對於未知、過期和另一個金鑰的句柄，消費者會傳回相同的 404。它接受`variant=preview|standard|detail` （最大JPEG維度320/640/1280，從不升級）、 `limit=1..8` （或舊版`frames`別名，從不兩者兼而有之）、從零開始的`page`和可選的`start`/`end`焦點秒。重複的查詢鍵和反向焦點視窗將被拒絕。每個傳回的變體都有其實際內容和實際解析度元資料的雜湊值，連結到保留的來源。變體是在讀取時派生的，而不是儲存為額外保留的副本。 JSON回應（包括Base64/envelope）的上限為 32 MiB；過大的頁面會傳回 413，且客戶端必須要求較少的訊框。在每次調整大小時讀取檢查取消並在返回之前重新檢查句柄有效性。所有者的`DELETE`是冪等的；刪除或TTL到期會釋放保留的來源和使用記帳。

共享儲存是進程本地的：句柄在重新啟動時過期，並且不能在獨立的OmniRoute進程之間傳輸。管理統計資料僅公開有效的保留/遠端策略和聚合保留的entries/bytes ，而不是媒體、引用、主體IDs或句柄。視訊設定面板顯示這些值，並且可以保留這兩個同意開關。本實施文件並非即時部署或推廣證據；真實模型的驗收情況是單獨追蹤的。

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

超過 120 秒的傳統持久性影片逾時值被限制在代理截止日期內；高於該限制的新設定寫入將被拒絕。 `GET /api/modality-bridge/video/runtime`在身份驗證或運行時探測之前需要受信任的標記環回位置，然後需要管理身份驗證。當運行時不可用時，它只會返回`available`、清理後的FFmpeg/ffprobe版本和固定原因。內部提取端點不是公共上傳API：佇列飽和返回`503`加`Retry-After`，呼叫者斷開連線返回`499`，固定代理截止時間回傳`504`。轉換後的回應將`video->text;model=<visionModel>;parts=<videos>`加入中央`x-omniroute-modality-bridge`標頭，而不刪除視覺或音訊段。

### PII掩碼器 (`piiMasker.ts`)

運行於**兩個都**階段。

- **`preCall`**複製有效負載，遍歷`system`、 `messages`、 `input`和`prompt` （包括純字串項），並將`processPII()` （來自`@/shared/utils/inputSanitizer`）應用於字串`content`/`text`欄位。當`PII_REDACTION_ENABLED=true`時，偵測到的PII會在出站負載中進行編輯。這獨立於`INPUT_SANITIZER_MODE` （僅控制提示注入策略）。關閉密文後，通話會記錄偵測計數，而不會重寫內容。
- **`postCall`**深度複製回應，運行`sanitizePIIResponse()`加上 Responses-API-shape masker（`maskResponsesOutput` —覆蓋`output_text`和`output[].content[].text`）。如果發生任何編輯，修改後的回應將取代原始回應。

護欄永不遮擋；它僅註釋（`meta.detections`， `meta.redacted`）或重寫。

**可逆保管庫（`PII_REVERSIBLE_VAULT_ENABLED`，預設`false`）。**當`PII_REDACTION_ENABLED`和`PII_REVERSIBLE_VAULT_ENABLED`都開啟時（DB覆寫> env >預設值，每個請求讀取一次）， `handleChat`每個客戶端請求 (`src/lib/pii/requestTokenVaultScope.ts`) 開啟一個保管庫，並將其作為`GuardrailContext.tokenVault`傳遞到預先呼叫傳遞。然後，掩碼器會寫入代理標記，例如`<<PII_EMAIL_QWERTYUI_1>>`而不是`[EMAIL_REDACTED]`，用於內建、驗證 (GDPR/POPIA) 和自訂規則等。每個請求的隨機數字是 8 個隨機大寫字母，相同的值在請求中獲得相同的令牌。只有 masker 是薄荷糖：提示注入防護和`/api/guardrails/test`在沒有保險庫的情況下運作並保留佔位符。

- 提供者、每個組合腿、重試、融合小組成員和融合法官只能看到令牌。令牌在留下`handleChat`的 2xx 回應上恢復一次：解析的SSE上的每個字段（跨事件拆分的令牌仍然解析；工具呼叫參數是 JSON 轉義的）或JSON主體上的每個字段，並重新計算`Content-Length`。恢復內容和推理文字以及工具呼叫參數。錯誤體 (4xx/5xx) 保留令牌。
- 失敗保持私密：如果鑄造失敗或金庫拒絕某個值（1000 個條目，每個值 256 個字符，總共 64 個KB ），則改為寫入佔位符；保管庫無法解析的令牌，或者失敗的恢復，將保留字面意思並且僅記錄計數。保險庫沒有計時器，也沒有全域狀態；當回應流結束、取消或發生錯誤時，它會被清除。
- 當請求建立令牌時，記憶體提取、冪等性保存和語義快取寫入都會被跳過，因為後面的請求無法解析這些令牌。在呼叫日誌中，提供者請求和回應攜帶令牌；記錄的客戶端請求正文仍然是原始客戶端輸入，與普通編輯一樣。
- 令牌使用每個請求的隨機數，因此提示前綴在每個回合都會發生變化：提供者端提示快取不會在屏蔽回合中命中，並且在稍後回合中返回的令牌（例如透過`previous_response_id`）屬於舊請求並保持原義。

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

這三個都需要管理身份驗證並使用Zod (`src/shared/validation/schemas/piiSettings.ts`) 驗證主體。停用登入 (`requireLogin=false`) 後， `GET`和測試端點處於開啟狀態，但`PUT`仍需要儀表板會話、 `manage` -scope API密鑰、具有寫入範圍或更高範圍的`oma_`存取令牌，或從環回發送的CLI令牌或內部服務令牌。

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

由於純數字格式與訂單號、內部版本號和時間戳發生衝突，因此最弱的格式（`za_vat`、 `za_tax_ref`）需要關鍵字提示，並且裸露的十位`0..`號碼不會被視為南非電話號碼。間隔IBANs (`GB29 NWBK ...`) 不符。在流路徑上，僅在目前區塊內尋找提示。 id 位於通用電話模式之前，因此經過驗證的識別碼保留其自己的佔位符（`[IBAN_REDACTED]`、 `[NL_BSN_REDACTED]`等）。 `gdpr`和`popia`模板分別選擇EU和南非 id。屏蔽本身保持選擇加入（硬規則#20）：這裡沒有任何內容改變功能標誌預設值。

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

**掃描綁定（v3.8.20）：**探測器僅檢查**前 16 KB** `src/shared/utils/inputSanitizer.ts`中加入的提示文字— `MAX_INJECTION_SCAN_BYTES = 16 * 1024` （16 384 位元組）。 `detectInjection()`和`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`都在運行模式循環之前。注入指令位於輸入頂部附近，因此這可以將正規表示式CPU/GC限制在數百 KB 的有效負載上，而不會削弱偵測（請參閱#3932、 #4041）。

### 憑證屏蔽器 (`credentialMasker.ts`)

運行於**兩個都**階段，預設鏈中的最後一個（優先級`95`）。從出站有效負載（訊息內容、工具呼叫參數、工具結果）編輯眾所周知的 API 金鑰/秘密令牌模式**和**提供者回應，因此貼上到提示中的憑證（或由工具結果回顯）不會洩漏給上游提供者或返回給客戶端。

- **僅選擇加入**，與PII編輯相同的約定（硬規則#20-adjacent）：停用，除非`settings.credentialRedactionEnabled === true`**或者**`CREDENTIAL_REDACTION_ENABLED=true`.關閉它後，護欄是一個無操作—它永遠不會阻塞，也不會重寫。
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

## 執行指令

對於流經`src/sse/handlers/chat.ts`和`open-sse/handlers/chatCore.ts`每個請求（[覆蓋範圍和限制](#coverage-and-limits)下列出的聊天系列路由）：

1. `resolveDisabledGuardrails(...)`從API鍵、正文和標頭建構跳過列表。
2. `guardrailRegistry.runPreCallHooks(body, ctx)`依優先權升序運行護欄：
   - 禁用的護欄記錄為`skipped`。
   - 每個護欄的`preCall`可以透過`modifiedPayload`重寫有效負載。
   - 第一個`block: true`使鏈短路，處理程序返回護欄拒絕回應。
3. （可能重寫的）有效負載流入組合路由和上游調度。
4. **僅非串流媒體：**組裝回應後， `guardrailRegistry.runPostCallHooks(...)`在回應上運行相同的鏈。 `block: true`這裡刪除上游回應並返回HTTP 400。串流回應完全跳過此步驟。
5. **僅限可逆保險庫：**當請求鑄造令牌時， `handleChat`在呼叫後掛鉤和流式PII轉換之後在其返回的 2xx 回應上恢復它們，因此`PII_RESPONSE_SANITIZATION`看到的是令牌和模型生成的PII，而不是恢復的原始令牌。

拋出的護欄由`error: <message>`記錄並透過`logger.warn`記錄，但該鏈按設計繼續—故障開啟。

## 覆蓋範圍和限制

護欄註冊表僅連接到聊天管道。这些限制由`tests/unit/guardrail-pipeline-wiring-characterization.test.ts`和`tests/unit/guardrail-pipeline-characterization.test.ts`固定；当行为发生变化时，有意更新这些测试。

### 鉤子運行的地方

| 掛鉤/控制              | 運行於                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`      | `handleChat` (`src/sse/handlers/chat.ts`) 处理的请求： `/v1/chat/completions`、 `/v1/completions`、 `/v1/messages`、 `/v1/responses` （和`/v1/responses/*`）、 `/v1/relay/chat/completions`、 `/v1/providers/{provider}/chat/completions`、 `/v1/api/chat`、 `/v1/antigravity`、 `/v1beta/models/*`和Telegram聊天代理。還有儀表板測試端點`/api/guardrails/test`。預呼叫塊返回HTTP 400。 |
| `runPostCallHooks`     | **非串流媒體**僅聊天回覆 (`open-sse/handlers/chatCore/nonStreamingResponse.ts`)。串流回應永遠不會到達它。                                                                                                                                                                                                                                                                               |
| 串流媒體PII            | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), piped in `streamingPipeline.ts` when `PII_RESPONSE_SANITIZATION` is on. It is not a guardrail, so the disable channels don't affect it.                                                                                                                                                                                   |
| 可逆PII保險庫          | 當`PII_REDACTION_ENABLED`和`PII_REVERSIBLE_VAULT_ENABLED`開啟時，請求僅由`handleChat`處理。令牌由`pii-masker`预调用铸造，并在`handleChat`出口 (`src/lib/pii/requestTokenVaultScope.ts`) 处恢复。对请求禁用`pii-masker`意味着不会生成任何内容。                                                                                                                                          |
| 注入防護中間件（舊版） | 每个带有提示的`/v1`路线，包括聊天系列（请参阅[路线覆盖范围](#injection-guard-route-coverage--red-team-phase-8--block-d)）。僅立即註射。                                                                                                                                                                                                                                                 |

### 哪些內容不包括在內

- **媒體、嵌入與資料路由**（`/v1/images/*`、 `/v1/embeddings`、 `/v1/audio/*`、 `/v1/videos/generations`、 `/v1/music/generations`、 `/v1/rerank`、 `/v1/search`、 `/v1/moderations`）永遠不會到達登錄機碼。那里没有PII屏蔽、凭证屏蔽或模态桥。他们唯一的检查是遗留的注入防护中间件。
- **串流回應**没有调用后护栏：没有`pii-masker`或`credential-masker`调用后，也没有调用后阻止。僅適用流式PII變換（當`PII_RESPONSE_SANITIZATION`開啟時）。串流回應中回顯的憑證不會被編輯。
- **停用通道與中間件（依設計）：**中间件通过自己对`evaluatePromptInjection()`的调用来评估提示注入，而不传递任何调用者控制的禁用列表。 `block`模式是调用者控制的禁用无法绕过的强制边界，包括在聊天家庭路由 ( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) ) 上。禁用`prompt-injection`僅跳過註冊表防護。

### 通話後會看到什麼回复

On the non-streaming path the order is: memory extraction → built-in tool execution → post-call guardrails → post-call block exit → semantic-cache store.

- **記憶擷取**和**工具執行**在调用后护栏可以重写或阻止它之前查看响应。自從[#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401)以來，當`PII_RESPONSE_SANITIZATION`打開時（流式和非流式），記憶體提取通過`sanitizePII`運行提取的文本，但是呼叫後稍後塊的回應仍然提供給記憶體和工具。
- **語意快取**存储调用后的响应，因此它存储重写的响应，并且永远不会缓存阻塞的响应。快取條目按API鍵進行鍵控。

## 配置

內建護欄讀取的環境變數：

| 多變的                                | 使用者                     | 影響                                                               |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | 設定`false`以完全停用偵測。                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | 注入策略： `warn`、 `block`或`log`。舊值`redact`不會重寫注入文字。 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | 注射防護模式；還有一個DB功能標誌**覆蓋**環境變數 (DB > ENV)。      |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | `MODE=block`拒絕的最低嚴重性： `high` （預設）、 `medium`或`low`。 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD`的舊別名。                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | 當`true`時，請求PII被編輯（與注入模式無關）。                      |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | 使用`PII_REDACTION_ENABLED`，鑄造可逆令牌並在 2xx 回應中恢復它們。 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` （下游）      | 控制回應端遮罩行為。                                               |

Modality Bridge 護欄從資料庫支援的設定儲存 (`getSettings()`) 讀取執行時間配置，而不是環境變數。 Vision 的主鍵是`modalityBridgeVisionEnabled`、 `modalityBridgeVisionMode`、 `modalityBridgeVisionModel`、 `modalityBridgeVisionTaskAware`、 `modalityBridgeVisionPrompt`、 `modalityBridgeVisionTimeout`、 `modalityBridgeVisionMaxImages`、 `modalityBridgeVisionMaxChars`、 `modalityBridgeCacheEnabled`、 `modalityBridgeCacheTtlMinutes`和`modalityBridgeCacheMaxEntries`。僅接受舊版`visionBridge*`密鑰作為記錄的單週期讀取回退；儀表板寫入使用主鍵。預設值和後備解析器位於`src/shared/constants/modalityBridgeDefaults.ts`中，遺留常數保留在`src/shared/constants/visionBridgeDefaults.ts`中。

音訊使用`modalityBridgeAudioEnabled`、 `modalityBridgeAudioModel`、 `modalityBridgeAudioTimeout`和`modalityBridgeAudioMaxClips`以及共享`modalityBridgeCache*`設定。音訊沒有舊金鑰回退，因為這些金鑰是透過模態橋架構引入的。

影片使用`modalityBridgeVideoEnabled`、 `modalityBridgeVideoAnalysisMode`、 `modalityBridgeVideoModel`、 `modalityBridgeVideoFrameCount`、 `modalityBridgeVideoSamplingPolicy`、 `modalityBridgeVideoMaxVideos`和`modalityBridgeVideoTimeout`，以及共享`modalityBridgeCache*`設定。預設情況下它是禁用的，因為FFmpeg/ffprobe是可選的操作依賴項，並且幀字幕會增加延遲和模型成本。

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
