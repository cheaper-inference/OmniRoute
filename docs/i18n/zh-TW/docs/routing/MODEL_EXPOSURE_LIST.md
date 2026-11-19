# Model Exposure Allow/Deny List (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> 選擇加入，預設為關閉（`modelVisibilityAllowlist`/`modelVisibilityDenylist`都為空，使`/v1/models`目錄AND每個`auto/*`候選池位元組相同）。 `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) 的同級產品，適用於因與成本無關的原因而需要精選模型清單的營運商。

## 為什麼存在這個

`hidePaidModels`回答「這個模型是免費的嗎？」 `hideAutoCombos`回答「 `auto/*`虛擬 ID 是否應該進行廣告？」 —也不允許操作員規劃模型的任意子集（例如，準確地呈現給定Claude代碼/ OpenCode客戶端應該看到的模型，與定價無關）。 #11481 將其新增為兩個獨立的、可選的字串陣列設定。

## 設定

| 鑰匙                       | 類型       | 預設 | 意義                                                |
| -------------------------- | ---------- | ---- | --------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]` | 與候選人匹配的條目將其隱藏在catalog/candidate池中。 |
| `modelVisibilityAllowlist` | `string[]` | `[]` | 當非空時，與候選者匹配的ONLY條目保持暴露狀態。      |

兩者都接受最多 500 個條目，每個條目最多 200 個字元（在`src/shared/validation/settingsSchemas.ts`中經過 Zod 驗證）。條目可以是：

- 精確的目錄 ID — `"gpt-4o"` （裸模型 ID）或`"openai/gpt-4o"` （提供者前綴），或者
- 使用`*`/`?` —的 glob 模式，例如`"openai/gpt-4*"`或`"anthropic/*"` —透過`ModelRoutingSection`的每個模型組合映射和`freeModels.ts::matchesOnlyPaidModels`已使用的相同共享`globToRegex()`匹配器（`src/shared/utils/globPattern.ts`）解析。

優先順序：首先檢查拒絕清單（被拒絕的條目始終隱藏，即使它也與允許清單相符）；當允許清單非空時，只有與其匹配的條目才能生存。

## 兩個阻塞點，不是一個

#6512 中的教訓（ `hidePaidModels` -only目錄過濾器仍然讓`auto/*`路由到付費模型，因為組合候選池是獨立建構的）在這裡同樣適用。匹配謂詞`isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) 是從BOTH呼叫的：

- `src/app/api/v1/models/catalog.ts` — `/v1/models`清單本身，在相同的 5 個每個來源阻塞點`shouldHidePaid()`已經有閘門（靜態`PROVIDER_MODELS`、同步提供者行、自訂行、別名支援行、託管後備行）。
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` —在等效的`filterPaidOnlyCandidates()`呼叫之後立即從`virtualFactory.ts::buildPreparedPool`呼叫，因此被拒絕的模型也永遠不能被選入`auto/*`候選池。

## NOT過濾了什麼

鏡像`hideAutoCombos`的現有行為：傳送模型 ID**明確地**（不是透過`auto/*`，也不是透過目錄清單發現）在調度—時永遠不會被阻止，只有advertisement/candidate-pool成員資格被過濾。這與`hidePaidModels`無關；操作員可能出於與成本無關的原因想要一個精選集，因此這兩個設置都構成獨立的 AND 過濾器，與`catalog.ts`中現有的多標誌組合相同。

設定導出 (`GET /api/settings/export-json`) 逐字包含兩個數組，與任何其他設定字段—不同，與`hidePaidModels`的組合步驟導出過濾器不同，這裡不存在重新水合風險：導出組合步驟中嵌入的拒絕 id 是操作員自己的明確路由選擇，而不是導出邊界需要剝離的內容。

## 僅組合列表 (`exposeCombosOnly`)

一個單獨的布林值，預設也選擇加入和`false` ，用於組合是公共模型表面而提供程式只是後端的部署。當它是`true`時，公共列表（`GET /v1/models`、 `GET /v1`和基於`getUnifiedModelsResponse()`構建的其他`/v1`發現路由）僅保留帶有`owned_by: "combo"`行：用戶組合加上內建`auto/*`組合（除非`hideAutoCombos`隱藏它們）。它使用與每個鍵`catalogScope: "combos"`相同的行測試，並且鍵自己的allow/deny/scope過濾器仍然適用於頂部。

切換它**設定→路由→型號API列表**，或使用`PATCH /api/settings {"exposeCombosOnly": true}`。

與上面的列表一樣，它僅更改廣告：

- 顯式的`provider/model` id 仍會調度， `GET /v1/models/{id}`仍會解析它；
- 儀表板目錄（`GET /api/models/catalog`，由模型選擇器使用）沒有縮小；
- 它不會鏡像到`auto/*`候選池中，因此`auto/*`組合保留其完整池。
