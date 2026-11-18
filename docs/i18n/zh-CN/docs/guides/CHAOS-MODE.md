# Chaos Mode (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **控制面板：** **Chaos Mode**（侧边栏）→ `/dashboard/chaos`  
> **API：** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`（控制面板会话）· `POST /api/skills/collect/chaos`（API 密钥）  
> **源代码：** `src/lib/chaos/chaosExecutor.ts`、`src/lib/chaos/chaosConfig.ts`

Chaos Mode 会将**一个任务同时发送给多个提供者**——每个参与的提供者贡献一个模型实例，你可以并排查看所有回答（或将它们串联起来）。它是一个多模型执行界面，而不是一种路由策略：你正常的 `/v1/chat/completions` 流量绝不会受到它的影响。

**消除歧义——有三种不同的功能名称中都带有“chaos”：**

| 名称           | 功能说明                                                                                                                          | 文档位置                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode** | 此处介绍的控制面板页面和 API：将一个任务分发给多个提供者（并行或协作执行）。                                                      | 本指南                                       |
| `auto/chaos`   | Auto-Combo 模型 ID：并行扇出，每个提供者使用一个模型，每个模型调用上游一次。并非故障注入（[详情](#autochaos-parallel-fan-out)）。 | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos 组合配置 | 启用了 `config.chaos.enabled` 的持久化组合会以相同方式执行扇出（仅限 API）；`judgeModel` 只负责选取最终回答，不会执行综合调用。   | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`：并行扇出

`auto/chaos` **不是**故障注入或韧性测试开关。在 `/v1/chat/completions` 上请求 `model: "auto/chaos"` 时：

1. 构建一个由**每个提供者各一个模型**组成的面板：按照候选池顺序，从每个已连接提供者中选取第一个候选模型，最多包含 5 个成员
   （由 `OMNIROUTE_CHAOS_MAX_PANEL` 控制，上限为 10）
   （`open-sse/services/autoCombo/virtualFactory.ts`）。`chaos-mode` 权重包只设置每个成员的 `weight`；扇出过程不会读取该值。
2. 将同一请求**并行**发送给面板中的每个成员，因此一次请求会为每个面板成员产生一次上游调用
   （`open-sse/services/autoCombo/chaosEngine.ts`，由
   `open-sse/services/combo.ts` 分派）。
3. 在每个面板成员返回结果时，为其流式发送一行状态信息：默认发送一条 SSE 注释
   （`: chaos <index> ok|fail <model>`）；当请求设置
   `stream_options.include_chaos_parts: true` 时，还会发送一个 `omni-chaos-part`
   事件（`model`、`index`、`ok`、`error`）。这些信息不包含回答文本。
4. 将面板中的**一个**回答作为最终的 OpenAI 风格数据块发送：如果第一个面板成员成功，则使用它的回答
   （`auto/chaos` 会将其设为 `judgeModel`）；否则使用最后一个成功成员的回答。其他面板回答不会返回，因此你需要为 N 次调用付费，却只能收到一个补全结果。

## 设置

1. 打开**仪表板→混沌模式**（`/dashboard/chaos`）。
2. 转动它**在**—混沌模式舰船**默认禁用**（`enabled: false`中的`src/lib/chaos/chaosConfig.ts`）。禁用时， `POST /api/chaos/run`会应答`400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`。
3. 选择参与者和默认值（通过设置存储保留每个实例）：

   | 场地                | 意义                                                        | 默认/限制                         |
   | ------------------- | ----------------------------------------------------------- | --------------------------------- |
   | `enabled`           | 主开关                                                      | `false`                           |
   | `defaultMode`       | `parallel`或`collaborative` （见下文）                      | `parallel`                        |
   | `providerOverrides` | 每个提供者的参与（`providerId`、可选`modelId`、 `enabled`） | 每个活跃提供者清空= ，最多 200 个 |
   | `systemPrompt`      | 覆盖内置混沌系统提示                                        | 可选，最多 10 000 个字符          |
   | `timeoutMs`         | 每个模型调用的最长时间                                      | `120000` (5 000–600 000)          |
   | `maxTokens`         | 每个模型调用的`max_tokens`                                  | `4096` (256–128 000)              |

4. 为每个参与的提供者提供**模型**。提供者的模型是其在混沌模式页面上启用的覆盖的`modelId` （它获胜），否则**默认型号**其连接。提供者 ID 永远不会用作模型名称。两者都没有的提供者是**没有被调用**：它在结果中显示为`status: "error"` ，并显示消息 _“没有为此提供程序设置模型。在混沌模式页面上为其设置模型或连接上的默认模型。”_ 和一个空`modelId`，而其他提供程序正常运行。如果没有选定的提供程序具有模型，则在任何上游请求之前运行都会失败，并显示 _“没有提供程序有模型集。...”_（两个端点上的HTTP 500）。
5. 运行一个**从页面本身进行测试**—结果面板显示每个提供者的答案、状态和持续时间。

## 执行模式

- **`parallel`**——每个模型会同时收到相同的任务；你将分别收到所有答案。
- **`collaborative`**——模型以**链式方式**运行：每个模型都会看到上一个模型的输出，并被要求对其进行改进、扩展、批评或提供替代方案。响应中的 `summary` 字段会按照链中的顺序拼接成功的输出（并行运行没有 `summary`）。

## API

### `POST /api/chaos/run` —仪表板会话

Cookie 验证（管理会话—参见[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ）；由仪表板页面使用。

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API密钥

外部调用者的不记名令牌变体。钥匙必须带有**混沌模式权限**（`chaosModeEnabled`），即**默认关闭**—为每个键启用它**仪表板→ API管理器→编辑密钥→权限→混沌模式**。身体和上面一样。

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

两个端点返回相同的形状：

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## 故障排除

- **`400 Chaos Mode is not enabled`** —上面第2步：全局开关关闭。
- **API密钥在`/api/skills/collect/chaos`上被拒绝**—该密钥缺少每个密钥的`chaosModeEnabled`权限（默认情况下关闭；这是一个设置，而不是错误）。
- **供应商展示`No model set for this provider`** —在混沌模式页面上设置其模型或在其连接上设置默认模型（请参阅设置，步骤 4）。
- **结果中缺少您期望的提供者**—检查混沌模式页面上的`providerOverrides` （禁用覆盖排除它）以及提供者连接是否处于活动状态。
