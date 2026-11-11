# Cost & Spend Tracking (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

OmniRoute 如何估算、记录和报告每个请求的成本——以及为什么仪表板中的数字是一个**节省追踪器**，而不是账单。

另请参阅：[用户指南](./USER_GUIDE.md) · [功能展示](./FEATURES.md)

---

## 它是什么（以及不是什么）

OmniRoute 通过将 token 数量乘以模型的定价费率，为每次补全计算以美元计价的单请求成本。这些数字用于支持**成本**仪表板、`omniroute cost` / `omniroute usage` CLI、CSV/JSON 导出以及每个 API 密钥的预算。

> **仪表板中的“成本”是一个节省追踪器，而不是账单。** OmniRoute 绝不会向你收费——它会将你的请求路由到你已经连接的提供者（你自己的订阅、免费套餐和 API 密钥）。如果完全使用免费模型而累计出“$290 总成本”，这意味着你大约有 **$290 _没有支付给_** 付费 API。该数字是对相同流量按标准标价计算时所需成本的_估算_，这样你就能了解使用量集中在哪里，以及通过路由到更便宜或免费的提供者节省了多少钱。

项目的 [README](../../README.md) 中直接说明了这一定位（“仪表板中的‘成本’是一个节省追踪器，而不是账单”）。

由于该数字属于估算值：

- 它取决于 OmniRoute 为每个模型维护的定价表。没有定价条目的模型产生的成本为 `0`（在浏览器中显示为“旧版 / 免费”行）。
- 免费套餐和订阅流量仍会累计_估算_成本——这是你节省的金额，而不是应付金额。

---

## 如何估算成本

### 定价来源

成本来自[`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts)中的合并定价表，按优先顺序排列（**最高的第一个**）：

1. **用户覆盖**—价格在仪表板中或通过`PATCH /api/pricing` （ `pricing`命名空间）设置。
2. **models.dev 同步**—定价从`https://models.dev/api.json` （ `models_dev_pricing`命名空间）获取。
3. **LiteLLM同步**—价格取自LiteLLM的公共`model_prices_and_context_window.json` （ `pricing_synced`命名空间）。
4. **硬编码默认值**—费率以[`src/shared/constants/pricing/`](../../src/shared/constants/pricing/)发货。

对于相同的provider/model，来自较高优先级层的值会覆盖较低层中的匹配字段；上层缺少的字段仍然可以来自下层。即使两个独立的同步作业同时运行，顺序也是固定的。 `GET /api/pricing?includeSources=1`返回`pricing`和`sourceMap`，其每个模型标签（`user`、 `modelsDev`、 `litellm`、 `default`）标识包含该模型的最高优先级层。

**LiteLLM同步**是选择加入，默认情况下禁用。它的环境变量（参见[`.env.example`](../../.env.example) ）是：

| 环境变量                | 默认      | 目的                                         |
| ----------------------- | --------- | -------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | 启用后台LiteLLM定价同步。                    |
| `PRICING_SYNC_INTERVAL` | `86400`   | 同步间隔以秒为单位（每天）。                 |
| `PRICING_SYNC_SOURCES`  | `litellm` | 仅用于此同步的源选择；目前仅支持`litellm` 。 |

**models.dev 同步**与LiteLLM同步分开，默认情况下也是禁用的。在设置（models.dev 同步）中启用它或使用这些变量：

| 环境变量                   | 默认         | 目的                                                                                            |
| -------------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _（未设置）_ | 取消设置遵循设置切换； `1/true/on/yes`强制打开， `0/false/off/no`强制关闭（即使“设置”启用它）。 |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`      | 默认 models.dev 同步间隔（以秒为单位）（每日）。                                                |

`PRICING_SYNC_SOURCES`确实**不是**启用 models.dev；它仅控制LiteLLM同步。删除用户覆盖不会清除同步的命名空间；下一个可用的定价层将生效。对于未定价的型号，请在添加手动覆盖之前检查同步设置和`sourceMap` 。

### 成本公式

成本是根据[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`) 中的代币计数和每百万代币费率计算每个请求的成本：

- **输入令牌**（减去缓存读取和缓存创建令牌） × `input`速率。
- **缓存读取令牌**× `cached`速率（回落到输入速率）。
- **缓存创建令牌**× `cache_creation`速率（回落到输入速率）。
- **输出代币**× `output`率。
- **推理标记**× `reasoning`速率（回落到输出速率）。

所有费率均解释为每 1,000,000 个代币的USD 。 Codex “快速”/“优先”或“灵活”服务层应用成本乘数 (`getCodexFastCostMultiplier`) — ，例如，灵活按 50% 代币折扣计费，表现为**弹性储蓄**在仪表板中。

首先对模型名称进行规范化（去除`openai/`或`accounts/fireworks/models/`等提供者路径前缀），以便历史行仍然与价格匹配。

### 如何记录支出

- 每个请求的成本是在请求完成时计算的。共享配额消耗通过[`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts)安排在下一个事件循环标记上。
- API 密钥支出由[`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts)批量缓冲和刷新（默认 60 秒刷新间隔，1,000 个条目缓冲区）。可通过以下方式调节：

  | 环境变量                            | 默认    | 目的                       |
  | ----------------------------------- | ------- | -------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | 刷新间隔（以毫秒为单位）。 |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | 刷新前的最大缓冲条目。     |

成本更喜欢提供者报告的确切费用（`provider_cost_usd`），然后是目录定价的请求快照（`calculated_cost_usd`），然后是当前目录中的代币重新定价。存储的成本不会通过其代币计数再次收取。当目录价格发生变化时，旧的仅令牌行仍然会发生变化。

### OCR和嵌入

- 成功的`/v1/ocr`请求使用上游`usage_info.pages_processed`，而不是请求的页面范围或返回的页面对象的数量。估计是页数× `ocr_cost_per_page` （绝对USD/page，**不是**USD/million）。
- 带有文档或边界框注释的请求需要单独的`ocr_cost_per_annotated_page`费率。如果没有它，成本仍然未知；普通OCR资费并没有悄然被取代。
- LiteLLM同步将其上游`annotation_cost_per_page`字段映射到`ocr_cost_per_annotated_page`，保留绝对USD/page值和仅注释条目，包括显式零。提供的规范字段优先；无效的别名值将被忽略。用户定价覆盖保留其正常优先级。请参阅[LiteLLM的OCR定价要点](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking)。
- OCR使用存储页数、单价、计算的USD成本、 API密钥和选定的连接。页面永远不会表示为令牌。呼叫日志包含计费元数据，而不是文档URLs、 PDF字节或提取的文本。
- 成功的`/v1/embeddings`请求会记录每个物理批次的一个使用行，包括在同一毫秒内完成的单独批次。提供者报告的费用优先于代币估算；组合包装不增加费用。
- 使用历史记录、成本分析、 provider/account窗口、API 密钥支出限制、请求成本分类账和每日使用情况汇总包含这些费用。无日志键保留数字记录而不保留源文本。
- 缺少使用量或资费的是**未知**，不是免费的：省略响应成本标头，现有的无价使用策略适用于有限的API密钥。明确配置的零费率仍然有效的零成本使用。

这是仅向前会计。从未写入使用历史记录的旧OCR/embedding调用无法从此迁移中重建。目录估算是USD估算，而不是发票，并且不包括货币兑换、税收或折扣。

### 语音和图像

- 成功的`/v1/audio/transcriptions`、 `/v1/audio/speech`和图像生成尝试共享数值计算。直接呼叫和组合呼叫携带呼叫者的API密钥和所选连接；组合包装绝不会增加第二次借记。
- 提供者报告的USD胜过目录估算，包括明确的零收费。 OpenRouter的JSON `usage.cost`标准化为`cost_usd`。否则，测量的令牌使用令牌价格，转录秒数使用每秒价格，语音输入使用 Unicode 字符计数，固定价格图像使用实际返回的数字，而不是请求的`n`。
- 二进制OpenRouter TTS没有JSON使用主体。音频结束或呼叫者取消后， OmniRoute在上查询其生成的ID**相同的**配置OpenRouter原点。 EU请求永远不会回退到全局原点。这是一个有界的、只读的查找；不会重试合成进行记帐。音频结束后会出现计费记录：查找重试在后台运行最多约 52 秒，包括网络截止时间。
- 在该查找过程中，音频响应具有`X-OmniRoute-Cost-Status: pending`并且没有响应成本标头。其最终费用出现在使用历史记录、分析和对账后的关键账本中。如果元数据不可用，则使用配置的费率快照；否则成本仍然未知。
- 秒、字符和图像计数具有单独的计费单位字段，绝不会伪造令牌计数。会计仅保留数字用法，而不保留语音文本、文字记录或图像字节。现有的未定价图像豁免保持不变：真正缺失的图像资费不会新锁定有限密钥，并且响应会省略成本标头而不是声明呼叫免费。定价商店故障仍保留故障关闭执行的使用证据。

历史上的speech/image费用没有被发明或回填。提供者账单仍然是发票和未报告费用的电话的参考。

---

## 仪表盘：成本页面

**成本**页面位于 `/dashboard/costs`
（`src/app/(dashboard)/dashboard/costs/`）。
其主视图是**成本概览**选项卡
（`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`），
该视图通过 `GET /api/usage/analytics` 加载所有数据。

显示内容：

- **支出卡片** — _今天（1d）_、_7d_、_30d_ 以及所选时间窗口的预估支出。范围选择器：`7d`、`30d`、`90d`、`all`。
- **核心指标** — 窗口内的请求数、活跃提供者数、活跃模型数和平均每次请求成本。
- **成本分析器** — 可排序和筛选的表格，按**提供者**、**模型**、**API 密钥**、**账户**或**服务层级**分组，显示成本、请求数、令牌数、平均每次请求成本以及占总成本的百分比。
- **令牌用量** — 令牌总数 / 输入令牌数 / 输出令牌数，以及输入与输出比率。
- **路由效率** — 回退次数、回退率以及请求模型覆盖率。
- **月度预测** — 根据近期日均支出预测月末支出。
- **时段对比** — 时间窗口前半段与后半段之间的百分比变化。
- **图表** — 每日成本趋势、提供者占比（饼图）、主要提供者、主要模型、按 API 密钥统计的成本、按账户统计的成本、每周用量模式以及活动热力图。
- **导出** — 将当前时间窗口的数据下载为 **CSV** 或 **JSON**（当存在非零成本数据时才会显示这些按钮）。

当没有已计价流量时，行会呈现为“旧版 / 免费”标签，而不是 `$0`，以体现节省追踪器模型。

### 成本相关子页面

成本区域还包含以下页面（均位于 `/dashboard/costs/` 下）：

- **定价**（`/dashboard/costs/pricing`）— 查看和覆盖各模型的价格（呈现共享的定价选项卡）。
- **预算**（`/dashboard/costs/budget`）— 设置各作用域的支出限额（呈现共享的预算选项卡）。
- **配额共享**（`/dashboard/costs/quota-share`）— 共享配额池和消耗速率视图。

---

## API 端点

除非另有说明，否则所有这些端点都需要管理身份验证（环回/JWT，通过 `requireManagementAuth`）。

### 用量与成本分析

| 方法  | 端点                     | 用途                                                                                                                                               |
| ----- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/usage/analytics`   | 完整的成本/用量分析：汇总、每日趋势，以及按提供者/模型/API 密钥/账户/层级统计。查询参数：`range`、`startDate`、`endDate`、`apiKeyIds`、`presets`。 |
| `GET` | `/api/usage/utilization` | 各提供者随时间变化的配额利用率。查询参数：`range`（`1h`/`24h`/`7d`/`30d`）、`provider`。                                                           |
| `GET` | `/api/usage/history`     | 原始用量历史记录。                                                                                                                                 |
| `GET` | `/api/usage/call-logs`   | 每次请求的调用日志（模型、令牌数、成本、延迟、状态）。                                                                                             |
| `GET` | `/api/usage/quota`       | 提供者配额状态。                                                                                                                                   |
| `GET` | `/api/usage/proxy-logs`  | 代理请求日志。                                                                                                                                     |

### 预算

| 方法   | 端点                     | 用途                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | 单个 API 密钥的成本汇总和预算检查（必须提供 `apiKeyId` 查询参数）。 |
| `POST` | `/api/usage/budget`      | 为 API 密钥设置每日/每周/每月美元限额和警告阈值。                   |
| `GET`  | `/api/usage/budget/bulk` | 跨 API 密钥批量获取预算汇总。                                       |

> 预算 API 的作用域是每个 **API 密钥**（`apiKeyId`）。由
> `GET /api/usage/budget` 返回的限额包括 `dailyLimitUsd`、`weeklyLimitUsd`、`monthlyLimitUsd`、
> `warningThreshold`，以及累计总额（`totalCostToday`、`totalCostMonth` 等）。

### 定价

| 方法     | 端点                    | 用途                                                                                                  |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | 合并四层价格（用户、models.dev、LiteLLM、默认值）。`?includeSources=1` 返回 `pricing` + `sourceMap`。 |
| `PATCH`  | `/api/pricing`          | 覆盖 `{ provider: { model: { input, output, cached, … } } }` 的定价。                                 |
| `DELETE` | `/api/pricing`          | 移除用户价格覆盖值（可用 `?provider=&model=` 限定范围）；同步费率或内置默认值仍作为回退来源。         |
| `GET`    | `/api/pricing/defaults` | 显示每 100 万单位的默认回退费率。                                                                     |
| `GET`    | `/api/pricing/models`   | 按模型键控的定价。                                                                                    |
| `POST`   | `/api/pricing/sync`     | 触发从外部来源（LiteLLM）手动同步。                                                                   |
| `GET`    | `/api/pricing/sync`     | 当前同步状态。                                                                                        |
| `DELETE` | `/api/pricing/sync`     | 仅清除 LiteLLM 同步价格（`pricing_synced`）；models.dev 数据单独存储。                                |

### 其他与成本相关的端点

| 方法  | 端点                          | 用途                                           |
| ----- | ----------------------------- | ---------------------------------------------- |
| `GET` | `/api/free-tier/summary`      | 免费模型的令牌总额、本月已用量和剩余免费额度。 |
| `GET` | `/api/quota/pools/[id]/usage` | 共享配额池的使用量。                           |

---

## CLI

OmniRoute 的 CLI 提供成本、用量和定价命令（注册于
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)）。

### `omniroute cost`

从 `/api/usage/analytics` 聚合生成的成本报告。

```bash
omniroute cost                          # 最近 30 天，按提供者分组
omniroute cost --period 7d              # 最近 7 天
omniroute cost --group-by model         # 按 provider | model | combo | api-key | day 分组
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

列包括：分组、请求数、输入/输出 token 数、成本（USD）以及占总成本的百分比。末尾会打印总计行
（使用 `--quiet` 或 `--output json` 时不显示）。

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # 各提供者的成本汇总
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# 预算
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` 会读取 `GET /api/pricing/defaults`。如需改为编辑单个模型的
> 价格，请使用 **定价** 仪表板页面或 `PATCH /api/pricing`。

---

## 故障排除

- **所有成本均显示为 $0 /“旧版 / 免费”。** 当前使用的模型没有定价条目。
  请启用外部同步（`PRICING_SYNC_ENABLED=true`）并运行 `omniroute pricing sync`，或
  通过定价页面 / `PATCH /api/pricing` 手动设置价格。
- **某个历史模型的定价有误。** 请修正价格（覆盖或重新同步）——每次读取分析数据时，都会根据
  token 数重新计算成本，因此估算值会追溯更新。
- **支出数据滞后于实时数据。** 每个密钥的支出采用批量处理；如果需要更新的数据，请降低
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`。

---

有关此功能在整个仪表板中的位置，请参阅[用户指南](./USER_GUIDE.md)和
[功能图库](./FEATURES.md)。
