# Custom JSON API provider nodes (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

自定义JSON API节点连接不使用OpenAI或Anthropic协议的JSON业务端点。 OmniRoute填充JSON请求模板，将其发送到完整端点URL，从响应路径读取回复并以客户端自己的格式（聊天完成、响应、消息等）将其返回给客户端。

它是一个与`apiType: "custom-json"`兼容的 OpenAI 节点；其 id 的形式为`openai-compatible-custom-json-<suffix>`。仪表板表单尚不可用。通过下面的provider-node API创建和编辑这些节点。

## 创建节点

`POST /api/provider-nodes` （管理授权）：

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

- `baseUrl`是**完全的**端点URL。没有附加任何内容（没有`/chat/completions`，没有`/models`），并且与其他 OpenAI 兼容节点不同，没有默认的URL。它必须是`http(s)`，没有嵌入的凭据或`#fragment`，并且它在保存节点时和每次请求时都传递与每个提供者节点相同的出站URL防护。
- 发送连接密钥（`authType` `bearer`或`api-key`，包括默认值）的节点必须使用`https://`。纯`http://`仅接受环回主机（`localhost`、 `127.0.0.0/8`、 `::1`）或使用`authType: "none"`，不发送密钥。私有LAN地址（`10.x`、 `172.16-31.x`、 `192.168.x`）也不例外：该网络上的任何人都可以读取密钥。保存这样的节点会因`400`失败，并且在发送任何请求之前，先前存储的节点会因具有相同消息的每个请求而失败关闭。对于LAN上的密钥端点，将其放在TLS后面（例如反向代理）。
- `customJson`通过Zod进行验证；未知的密钥将被拒绝。每个字段都是可选的：

| 场地              | 价值观                        | 默认                                                   |
| ----------------- | ----------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`        | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`   | `bearer`                                               |
| `authHeader`      | `api-key`时使用的标头名称     | `X-API-Key`                                            |
| `requestTemplate` | JSON对象（≤ 64 KB，深度≤ 32） | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | 田野路径，或`$`代表全身       | `choices[0].message.content`                           |

- 秘密保留在连接的API密钥中，而不是在模板中。 `bearer`发送`Authorization: Bearer <key>`； `api-key`发送`<authHeader>: <key>`。 auth 标头不能是`Host`、 `Content-Type`、 `Content-Length`、 `Connection`、 `Transfer-Encoding`、 `Authorization`、 `Cookie`或逐跳标头。使用`none`，连接不需要密钥。
- 额外的静态标头使用节点的常规`customHeaders` （与所有其他兼容节点相同的验证；那里不允许使用 auth 标头）。

`PUT /api/provider-nodes/<id>`接受相同的`customJson`并重写`baseUrl`和节点的每个现有连接上的配置。省略`customJson`将保留存储的配置；将`apiType`切换为`chat`或`responses`会将其从节点及其连接中删除。

然后像往常一样添加到节点的连接（带有节点 ID 的`POST /api/providers` ）并请求`<prefix>/<model>`，例如`biz/assistant-v1`。端点不公开任何模型列表，因此请手动添加模型 ID。

## 请求模板

模板是普通的JSON。字符串值可以包含`{{placeholder}}`标记；不会评估或执行任何内容，并且对象键永远不会被替换。

| 占位符               | 价值                                         |
| -------------------- | -------------------------------------------- |
| `{{prompt}}`         | 最新用户消息的文本（用换行符连接的文本部分） |
| `{{messages}}`       | OpenAI聊天格式的对话                         |
| `{{model}}`          | 请求的模型 ID，不带提供者前缀                |
| `{{stream}}`         | 始终`false` —端点使用一份JSON文档进行答复    |
| `{{request.<path>}}` | 翻译后的（OpenAI聊天格式）请求的字段         |

- 恰好是一个占位符的值保持其JSON类型（`"{{messages}}"`成为数组）；较长字符串内的占位符将作为文本插入。
- 解析为空的占位符会导致请求失败并返回HTTP 400，而不是发送不完整的负载。
- 路径使用点表示法和数字索引 (`data.items[0].text`)。 `__proto__`、 `prototype`和`constructor`在键和路径中被拒绝。

## 回应

`responsePath`处的值成为辅助回复：字符串通过，其他JSON值被序列化。缺失或`null`字段，或者不是JSON正文，将返回HTTP 502。上游错误状态将被传递。对于流客户端， OmniRoute等待整个JSON响应，然后将其作为一个内容块加上完成块发出；这不是令牌流。工具调用和使用字段未映射。

## 从未重播过

即使业务请求失败，也可能会产生副作用。 OmniRoute因此发送一次：

- 没有传输重试，也没有重定向；
- 不重试另一个连接（帐户回退） —失败按原样返回并且连接不会冷却；
- 即使回复为空或失败，也不会后退到下一个组合目标。

单独的客户端请求和显式调用多个模型的融合面板仍然独立地调用端点。

## 测试节点

保存连接，连接**测试**按钮和后台运行状况检查从不调用端点：它们仅验证存储的配置并将连接报告为不可验证。

`POST /api/provider-nodes/validate`与`"apiType": "custom-json"`和节点字段（`baseUrl`、 `apiKey`、 `customJson`、可选`customHeaders`和`modelId`）仅发送一个真实请求，其中`ping`作为最新的用户文本。它回答`{ "valid": true }`或上游状态（而不是上游主体）。

## 贮存

配置存储在`provider_nodes.custom_json_config_json` （迁移`240_provider_node_custom_json_config.sql`）中并复制到每个连接的`providerSpecificData.customJson`中。

实现： `open-sse/utils/customJson.ts` （验证和模板）、 `open-sse/executors/customJson.ts` （执行器）、 `open-sse/services/combo/noReplayLatch.ts`和`src/sse/handlers/chat/responsePolicies.ts` （无重放）。
