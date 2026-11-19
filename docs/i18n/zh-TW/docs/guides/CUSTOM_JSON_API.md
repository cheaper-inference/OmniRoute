# Custom JSON API provider nodes (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md)

---

自訂JSON API節點連接不使用OpenAI或Anthropic協定的JSON業務端點。 OmniRoute填充JSON請求模板，將其傳送至完整端點URL，從回應路徑讀取回覆並以客戶端自己的格式（聊天完成、回應、訊息等）將其傳回給客戶端。

它是一個與`apiType: "custom-json"`相容的 OpenAI 節點；其 id 的形式為`openai-compatible-custom-json-<suffix>`。儀表板表單尚不可用。透過下面的provider-node API建立和編輯這些節點。

## 建立節點

`POST /api/provider-nodes` （管理授權）：

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl`是**完全的**端點URL。沒有附加任何內容（沒有`/chat/completions`，沒有`/models`），並且與其他 OpenAI 相容節點不同，沒有預設的URL。它必須是`http(s)`，沒有嵌入的憑證或`#fragment`，並且它在保存節點時和每次請求時都傳遞與每個提供者節點相同的出站URL防護。
- 發送連線金鑰（`authType` `bearer`或`api-key`，包括預設值）的節點必須使用`https://`。純`http://`僅接受環回主機（`localhost`、 `127.0.0.0/8`、 `::1`）或使用`authType: "none"`，不傳送金鑰。私有LAN位址（`10.x`、 `172.16-31.x`、 `192.168.x`）也不例外：該網路上的任何人都可以讀取金鑰。保存這樣的節點會因`400`失敗，並且在發送任何請求之前，先前儲存的節點會因具有相同訊息的每個請求而失敗關閉。對於LAN上的金鑰端點，將其放在TLS後面（例如反向代理）。
- `customJson`透過Zod進行驗證；未知的金鑰將被拒絕。每個欄位都是可選的：

| 場地              | 價值觀                        | 預設                                                   |
| ----------------- | ----------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`        | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`   | `bearer`                                               |
| `authHeader`      | `api-key`時所使用的標頭名稱   | `X-API-Key`                                            |
| `requestTemplate` | JSON物件（≤ 64 KB，深度≤ 32） | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | 田野路徑，或`$`代表全身       | `choices[0].message.content`                           |

- 秘密保留在連接的API密鑰中，而不是在模板中。 `bearer`發送`Authorization: Bearer <key>`； `api-key`發送`<authHeader>: <key>`。 auth 標頭不能是`Host`、 `Content-Type`、 `Content-Length`、 `Connection`、 `Transfer-Encoding`、 `Authorization`、 `Cookie`或逐跳標頭。使用`none`，連線不需要金鑰。
- 額外的靜態標頭使用節點的常規`customHeaders` （與所有其他相容節點相同的驗證；那裡不允許使用 auth 標頭）。

`PUT /api/provider-nodes/<id>`接受相同的`customJson`並重寫`baseUrl`和節點的每個現有連接上的配置。省略`customJson`將保留儲存的配置；將`apiType`切換為`chat`或`responses`會將其從節點及其連接中刪除。

然後像往常一樣添加到節點的連接（帶有節點 ID 的`POST /api/providers` ）並請求`<prefix>/<model>`，例如`biz/assistant-v1`。端點不公開任何模型列表，因此請手動新增模型 ID。

## 請求模板

模板是普通的JSON。字串值可以包含`{{placeholder}}`標記；不會評估或執行任何內容，並且物件鍵永遠不會被替換。

| 佔位符               | 價值                                         |
| -------------------- | -------------------------------------------- |
| `{{prompt}}`         | 最新用戶訊息的文字（用換行符連接的文字部分） |
| `{{messages}}`       | OpenAI聊天格式的對話                         |
| `{{model}}`          | 請求的模型 ID，不含提供者前綴                |
| `{{stream}}`         | 始終`false` —端點使用一份JSON文件進行答复    |
| `{{request.<path>}}` | 翻譯後的（OpenAI聊天格式）請求的字段         |

- 恰好是一個佔位符的值保持其JSON類型（`"{{messages}}"`成為數組）；較長字串內的佔位符將插入文字。
- 解析為空的佔位符會導致請求失敗並傳回HTTP 400，而不是發送不完整的負載。
- 路徑使用點表示法和數字索引 (`data.items[0].text`)。 `__proto__`、 `prototype`和`constructor`在鍵和路徑中被拒絕。

## 回應

`responsePath`處的值成為輔助回應：字串通過，其他JSON值被序列化。缺失或`null`字段，或不是JSON正文，將傳回HTTP 502。上游錯誤狀態將會被傳遞。對於串流客戶端， OmniRoute等待整個JSON回應，然後將其作為一個內容區塊加上完成區塊發出；這不是令牌流。工具呼叫和使用字段未映射。

## 從未重播過

即使業務請求失敗，也可能產生副作用。 OmniRoute因此發送一次：

- 沒有傳輸重試，也沒有重定向；
- 不重試另一個連線（帳戶回退） —失敗按原樣返回且連線不會冷卻；
- 即使回復為空或失敗，也不會後退到下一個組合目標。

單獨的客戶端請求和明確地呼叫多個模型的融合面板仍然獨立地呼叫端點。

## 測試節點

儲存連接，連接**測試**按鈕和後台運行狀況檢查從不呼叫端點：它們僅驗證儲存的配置並將連線報告為不可驗證。

`POST /api/provider-nodes/validate`與`"apiType": "custom-json"`和節點欄位（`baseUrl`、 `apiKey`、 `customJson`、可選`customHeaders`和`modelId`）僅發送一個真實請求，其中`ping`作為最新的使用者文字。它回答`{ "valid": true }`或上游狀態（而不是上游主體）。

## 貯存

配置儲存在`provider_nodes.custom_json_config_json` （遷移`240_provider_node_custom_json_config.sql`）中並複製到每個連接的`providerSpecificData.customJson`。

實作： `open-sse/utils/customJson.ts` （驗證和範本）、 `open-sse/executors/customJson.ts` （執行器）、 `open-sse/services/combo/noReplayLatch.ts`和`src/sse/handlers/chat/responsePolicies.ts` （無重播）。
