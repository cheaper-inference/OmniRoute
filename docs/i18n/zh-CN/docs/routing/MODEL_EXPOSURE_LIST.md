# Model Exposure Allow/Deny List (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> 选择加入，默认关闭（`modelVisibilityAllowlist`/`modelVisibilityDenylist`都为空，使`/v1/models`目录AND每个`auto/*`候选池字节相同）。 `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) 的同级产品，适用于因与成本无关的原因而需要精选模型列表的运营商。

## 为什么存在这个

`hidePaidModels`回答“这个模型是免费的吗？” `hideAutoCombos`回答“ `auto/*`虚拟 ID 是否应该进行广告？” —也不允许操作员策划模型的任意子集（例如，准确地呈现给定Claude代码/ OpenCode客户端应该看到的模型，与定价无关）。 #11481 将其添加为两个独立的、可选的字符串数组设置。

## 设置

| 钥匙                       | 类型       | 默认 | 意义                                                |
| -------------------------- | ---------- | ---- | --------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]` | 与候选者匹配的条目将其隐藏在catalog/candidate池中。 |
| `modelVisibilityAllowlist` | `string[]` | `[]` | 当非空时，与候选者匹配的ONLY条目保持暴露状态。      |

两者都接受最多 500 个条目，每个条目最多 200 个字符（在`src/shared/validation/settingsSchemas.ts`中经过 Zod 验证）。条目可以是：

- 精确的目录 ID — `"gpt-4o"` （裸模型 ID）或`"openai/gpt-4o"` （提供者前缀），或者
- 使用`*`/`?` —的 glob 模式，例如`"openai/gpt-4*"`或`"anthropic/*"` —通过`ModelRoutingSection`的每模型组合映射和`freeModels.ts::matchesOnlyPaidModels`已使用的相同共享`globToRegex()`匹配器（`src/shared/utils/globPattern.ts`）解析。

优先级：首先检查拒绝列表（被拒绝的条目始终隐藏，即使它也与允许列表匹配）；当允许列表非空时，只有与其匹配的条目才能生存。

## 两个阻塞点，不是一个

#6512 中的教训（ `hidePaidModels` -only目录过滤器仍然让`auto/*`路由到付费模型，因为组合候选池是独立构建的）在这里同样适用。匹配谓词`isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) 是从BOTH调用的：

- `src/app/api/v1/models/catalog.ts` — `/v1/models`列表本身，在相同的 5 个每个源阻塞点`shouldHidePaid()`已经有门（静态`PROVIDER_MODELS`、同步提供程序行、自定义行、别名支持行、托管回退行）。
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` —在等效的`filterPaidOnlyCandidates()`调用之后立即从`virtualFactory.ts::buildPreparedPool`调用，因此被拒绝的模型也永远不能被选入`auto/*`候选池。

## NOT过滤了什么

镜像`hideAutoCombos`的现有行为：发送模型 ID**明确地**（不是通过`auto/*`，也不是通过目录列表发现）在调度—时永远不会被阻止，只有advertisement/candidate-pool成员资格被过滤。这与`hidePaidModels`无关；操作员可能出于与成本无关的原因想要一个精选集，因此这两个设置都构成独立的 AND 过滤器，与`catalog.ts`中现有的多标志组合相同。

设置导出 (`GET /api/settings/export-json`) 逐字包含两个数组，与任何其他设置字段—不同，与`hidePaidModels`的组合步骤导出过滤器不同，这里不存在重新水合风险：导出组合步骤中嵌入的拒绝 id 是操作员自己的显式路由选择，而不是导出边界需要剥离的内容。

## 仅组合列表 (`exposeCombosOnly`)

一个单独的布尔值，默认情况下也选择加入和`false` ，用于组合是公共模型表面而提供程序只是后端的部署。当它是`true`时，公共列表（`GET /v1/models`、 `GET /v1`和基于`getUnifiedModelsResponse()`构建的其他`/v1`发现路由）仅保留带有`owned_by: "combo"`行：用户组合加上内置`auto/*`组合（除非`hideAutoCombos`隐藏它们）。它使用与每个键`catalogScope: "combos"`相同的行测试，并且键自己的allow/deny/scope过滤器仍然适用于顶部。

切换它**设置→路由→型号API列表**，或使用`PATCH /api/settings {"exposeCombosOnly": true}`。

与上面的列表一样，它仅更改广告：

- 显式的`provider/model` id 仍会调度， `GET /v1/models/{id}`仍会解析它；
- 仪表板目录（`GET /api/models/catalog`，由模型选择器使用）没有缩小；
- 它不会镜像到`auto/*`候选池中，因此`auto/*`组合保留其完整池。
