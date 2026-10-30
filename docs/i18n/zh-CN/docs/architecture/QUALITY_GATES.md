# Quality Gates Reference (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

本文档是 OmniRoute 中所有 CI 质量门禁的权威参考。
它描述了每个门禁、门禁所验证的内容、其运行所在的 CI 作业、采用棘轮基线还是通过/失败策略，以及该门禁会阻止构建还是仅提供建议。

有关简要概述和允许列表策略，请参阅 `AGENTS.md` 中的“Quality Gates & Ratchets”部分。有关同一系统的关键评估、成熟度分类和工具无关的复现计划，请参阅
[质量门禁手册](../ops/QUALITY_GATE_PLAYBOOK.md)。

---

## 门禁清单与执行配置

### 候选版本准入

CI 和 Quality Gates 工作流各自生成一个稳定的判定结果：`Gate / CI` 和
`Gate / Quality`。其版本化准入策略将每个上游作业列为必需或建议项。
所有适用的必需作业都必须成功：缺失、已取消、已跳过、待处理和未知结果均无法确定 PASS。
有效的仅文档或仅目录分类可以使代码执行通道不适用；
草稿 PR 不属于可接受的候选版本。`hotfix` 标签不会免除证据要求。

这两个工作流均涵盖合入 main/release 分支的 PR、推送至 `main`、手动分派
以及合并组事件。推送、分派和合并组会运行完整选择。推送至
`release/**` 不会启动这些工作流（2026-10-18）：每项变更都已在其 PR 上运行矩阵，
而合并后组合的验证属于 Release-Green 的职责（`docs/ops/RUNNER_BOX.md` → 托管执行通道）。Fork
和合并组会为原本选择自托管运行器的作业使用托管运行器；
在推出前必须验证托管容量是否充足。

每份 JSON 回执都会标识已检出的 SHA、工作流运行及尝试次数。
CLI 会拒绝检出 SHA 与事件 SHA 不匹配的情况。工作流测试会将策略成员关系
绑定到判定作业的 `needs` 列表，因此新增或移除的执行通道无法悄然消失。
这些回执涵盖的是其自身的工作流，而不是发布、部署或现有建议性扫描器的内部实现。将适用的检查设置为分支规则中的必需检查，是一项单独的管理变更；仅定义这些作业本身并不能保护分支。

`API Route Typecheck` 是一项独立的工作流检查，不属于任何聚合裁决，也不属于本地完整观察器的静态配置。请针对确切的候选版本单独检查其结果。`.github/workflows/api-route-typecheck.yml` 会在以 `main` 或 `release/**` 为目标分支的 PR、推送到上述任一分支系列以及手动调度时运行。它没有路径过滤器。重新指定 PR 的基础分支会请求一项新检查；编辑正文/标题时使用仅观察名称 `Admission not requested / API Route Typecheck`，且无法替代准入检查。该工作流未声明合并组触发器。任何要求此检查的合并队列推广，都必须先确保该检查会针对该事件执行。

### UI 执行容量

CI 以四个 `test-vitest` 矩阵分片运行完整的 UI 清单，每个分片最多使用
两个工作进程，并沿用现有的 15 分钟作业时限。第一个分片还会运行
MCP/autoCombo Vitest 测试套件。必需作业的结果涵盖每个矩阵项；
任一分片失败或被取消都无法确定候选版本准入。

夜间观察器会为每个 UI 分片保留单独的精确候选版本回执，
其中第一个回执包含 MCP 执行。必须具备全部四份回执、日志以及匹配的
执行标识。本地 `npm run test:vitest:ui` 仍会选择完整测试套件；
单次 `--shard` 运行只能作为部分证据。

### 单元测试覆盖率收集

十二个单元测试分片会在现有测试执行期间收集 V8 覆盖率。成功的
分片会运行 `scripts/ci/compact-v8-coverage.mjs`，压缩原始文件而不生成
中间 Istanbul 报告。最终的 Coverage 作业会依据候选 SHA、运行时、源代码根目录和数据哈希
验证全部十二份清单，然后运行 c8 的报告器和现有覆盖率阈值。
输入会保留 c8 的全局文件名顺序；对于混合函数/代码块覆盖率，
按分片预先合并并不安全。缺失、格式错误或不兼容的分片会导致准入失败。
测试失败的分片会单独保留原始诊断覆盖率；这些数据不能进入最终合并。

### 单元测试执行进度回执

共享的 `test:unit:ci:shard` 命令通过 `scripts/ci/unit-progress-reporter.mjs` 记录 `primary`、`dashboard` 和 `serial` 阶段。常规测试报告仍然可用。另有一份仅包含元数据的回执，用于记录每个文件的开始和完成情况；每 30 秒发送一次的心跳会列出仍处于活动状态的文件及其已运行时间。它仅记录允许列表中的执行元数据；测试描述、输出、错误正文和完整环境均不会被序列化。

CI 和 Quality 将 JSONL 文件分别保留为 `unit-progress-ci-<run>-<attempt>-<shard>` 和 `unit-progress-quality-<run>-<attempt>-<shard>`。作业超时可能会阻止后续上传；已经发出的心跳仍可作为诊断依据。心跳缺失也可能表示运行器进程已阻塞或终止。这些回执会保留现有的测试选择、并发设置、截止时间和退出状态；它们并非候选项准入判定。

### 验收结果归约器中的留存证据

`scripts/quality/validate-release-acceptance.mjs` 汇总传入的计划及其清单，并不证明该计划覆盖了完整的发布流水线。即使计划的状态为 `VERIFIED`，其报告也会明确设置 `releaseAcceptance: false`。`release-acceptance.yml` 工作流仍然使用影子测试夹具，而非真实的构建、打包、启动或晋级回执。

CLI 需要 `--evidence-root` 才能核验留存证据。文件按 `<evidence-root>/<artifact_id>/<member>` 路径解析，并计算 SHA-256 哈希。没有证据的 PASS 记录、缺失或已变更的文件、不安全的路径或符号链接都会阻止核验通过。文件缺失不等同于成功执行产生的空日志。现有的 SHA/run/attempt 检查仍然独立：字节相同无法使过期回执有效。文件完整性不能证明执行的真实性或产物已完成晋级。

### 静态扫描清单

版本化的 npm 别名清单和静态扫描成员关系位于
`config/quality/gate-manifest.json`。运行 `npm run check:gate-manifest`，
根据 `package.json` 验证脚本名称和精确命令；新增、移除和
命令漂移都会导致本地钩子以及 CI 中的变更分类作业失败。
别名不是工作流作业、矩阵实例或测试用例：这些计数不得
被描述为可互换。

使用 `npm run quality:scan -- --list` 或 `npm run quality:scan:fast -- --list`
可以在不执行的情况下检查选定的别名。运行器会调用
npm 入口点，因此会保留其运行时配置（包括已配置时的 Bun）。
清单会将这些配置之外的别名记录为单独调用，并且
只读扫描配置中禁止使用维护命令。

这些配置仅涵盖静态扫描。它们不认证产品测试、
覆盖率、打包、外部检查或候选版本的完整发布验收。
工作流准入使用关联的 `config/quality/admission-policy.json` 和
`scripts/quality/admission-verdict.mjs`。发布观察器配置仍保持独立；
请分别检查其适用的检查项和回执。完整观察器的静态
命令在 `config/quality/release-green-static-profile.json` 中声明，其中包括
`audit:deps`、变异测试选择和翻译检查。加载器会根据 package.json
以及建模的 CI/Quality 声明验证 npm 命令；它会拒绝漂移，
而不是将 shell 词元作为参数执行。必需扫描器的 SKIP/INCOMPLETE 输出
无法确定 PASS。该配置会记录其外部排除项，且不能替代
托管覆盖率、测试矩阵、软件包或部署证据。下方的文字清单
仅供参考，不能证明门禁实际运行过。

脚本位于 `scripts/check/`（策略门禁）和 `scripts/quality/`（棘轮引擎）下。
CI 的事实来源是 `.github/workflows/ci.yml`。

### 已发布基础文档的健康状态

`.github/workflows/i18n-base-health.yml` 会在选定内容推送到 `main` 和 `release/v*` 后以及手动触发时检查文档健康状态。其过滤器涵盖文档、根目录 Markdown 文件、`llm.txt`、翻译状态/配置以及相关的 i18n 工具。唯一的 `Published base documentation health` 作业使用托管的 Ubuntu 运行器，超时时间为五分钟。它执行只读验证并写入诊断回执，不会安装依赖项、进行翻译或采纳状态。

`scripts/i18n/check-base-health.mjs` 要求不存在源哈希、目标缺失、目标哈希、过时翻译和章节缓存不一致的问题。它还会验证当前核心文档/语言区域范围及其记录的来源信息。上下文无效、覆盖不完整或检查器中断会产生 `INCOMPLETE`；确认存在漂移则会产生 `FAIL`。这两种情况都会返回表示失败的退出状态。回执与检出 SHA、工作流、运行编号和尝试次数绑定，并以 `i18n-base-health-<sha>-<run>-<attempt>` 的名称保留。

这是对已发布基础版本的独立观察。它不会添加 PR 或合并组事件、必需的 PR 检查、npm 别名或静态扫描配置文件成员。现有的差异化 PR 策略与底层检查器的建议性分类仍彼此独立。即使上传成功，也无法将失败的健康检查结果转为 PASS。

### Release PR 快速路径（`quality.yml`）

`.github/workflows/quality.yml` 对 main/release PR、推送至 `main`、
分派和合并组提供 CI 补充。PR 使用按路径筛选的快速检查。永久
禁用的重复构建已被移除；真正的构建/打包/启动检查仍保留在 CI 中。

| 作业                                             | 范围                                                                                                                    | 阻塞性        |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | 文档/代码 PR；API 文档引用和 docs-all                                                                                   | 是            |
| `Fast Quality Gates`                             | 代码 PR；静态检查、类型检查、仪表板类型检查、受影响的单元测试                                                           | 是            |
| `Forgotten sibling tests`                        | 代码 PR；将已更改模块追踪到静态使用方和候选同级测试；桶文件和动态导入路径作为建议性诊断报告，并应用所引用的允许列表例外 | **建议性**    |
| `Vitest (fast-path)`                             | 代码 PR；快速 vitest 测试套件                                                                                           | 是            |
| `Unit Tests fast-path`                           | 代码 PR；4 分片单元测试套件                                                                                             | 是            |
| `No new ESLint warnings`                         | 代码 PR；可识别抑制项的 lint 防护检查                                                                                   | 是，包括 fork |
| `Merge integrity (changelog + generated skills)` | 非草稿 PR；变更日志与生成的技能同步                                                                                     | 是，包括 fork |

#### 遗漏的同级测试报告

`npm run check:forgotten-sibling-tests` 复用测试影响映射所使用的导入解析器。
对于每个已更改的生产模块，当候选测试未出现在拉取请求的差异中时，它会报告确定性的
`changed module/symbol -> static consumer -> candidate sibling test` 链。Markdown 摘要和 JSON 结果会作为
`forgotten-sibling-tests` 工作流制品保留，以便在任何阻塞性推广之前进行校准。

桶式重新导出和动态导入仅作为解析诊断；它们绝不会产生
阻塞性发现。已审核的例外位于
`config/quality/forgotten-sibling-allowlist.json`。每个条目都必须指定使用方和候选
测试，提供具体理由，并链接到 GitHub 议题或拉取请求。格式错误的条目会以
失败关闭方式处理。例外无法抑制已删除的候选测试，也无法抑制添加了 `.skip`/`.todo` 的差异；
断言弱化和其他掩盖行为仍由独立的阻塞性
`check:test-masking` 门禁负责。

### 作业：`lint`

在每个面向 `main` 的 PR 上运行。失败时阻止合并。

| 脚本 (`npm run ...`)              | 验证内容                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 阻断性                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js 版本是否处于支持的范围内                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:test-tla-order`            | `tests/unit` 下不存在这样的 `node:test` 文件：先注册测试，再遇到顶层 `await`，然后继续注册更多测试（#18045；棘轮机制：`test-tla-order-allowlist.json` 只能缩减）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:cycles`                    | 检查整个 `src/` + `open-sse/` 中的循环导入（基于 AST，并解析 tsconfig `paths`）。只要存在任何循环，基础检查就会以退出码 1 退出（自 #15281 起采用失败关闭策略），并列出强连通分量（SCC）。`check:cycles:ratchet`（CI 实际运行的检查）会在数量超过 `quality-baseline.json` 中的 `metrics.cycles` 上限时阻断——当前上限为 14，`direction: down`，因此只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                | 是（棘轮机制）                          |
| `check:boundary`                  | `open-sse → src` 耦合：从引擎导入应用的唯一文件到文件导入（`scripts/quality/measure-boundary.mjs`；边列表是 v4 核心/模块拆分修复待办列表）。基础检查 = 提示性报告（与 `quality:boundary` 相同）。`check:boundary:ratchet`（CI 实际运行的检查，也位于 `quality.yml` 的快速门禁棘轮循环中）会在数量超过 `quality-baseline.json` 中的 `metrics.boundaryOpenSseToSrc` 上限时阻断——初始值设为实测的 771，`direction: down`；`--update` 只能降低该值；PR 中相对于基准分支进行检查（`--base-ref`，见下文）                                                                                                                                                                          | 是（棘轮机制）                          |
| `check:route-validation:t06`      | 所有路由上都存在 Zod schema（第 6 级策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` 的数量未超过预算（第 11 级关卡）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:provider-consistency`      | `providers.ts` 中的每个提供者在 `providerRegistry.ts` 中都有匹配的条目（反之亦然，但仅限允许列表范围内）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是                                      |
| `check:model-lifecycle`           | 确保三个手动维护的路由表与已检入的生命周期快照（#11503）保持一致：`FITNESS_TABLE`（`taskFitness.ts`）不会为任何已停用但 `REGISTRY` 仍可路由的 ID 评分；每个 `BUILT_IN_ALIASES` 目标都存在于 `REGISTRY` 中，且不存在于已停用 ID 快照中；`REGISTRY` 中仍存在的每个已停用 ID 都已被转发或列入 `allowedRetiredInCatalog`；并且 `DEFAULT_DEGRADATION_MAP` 的源或目标均未在该快照中显示为已停用。这并不能证明某个模型当前正由实时上游提供服务。离线检查——与 `config/quality/model-lifecycle.json` 进行比较；该文件通过 `npm run quality:refresh-model-lifecycle` 手动刷新（需要网络；未接入 CI）。`allowedRetiredInCatalog` 是一个只减不增的棘轮机制：仅在有跟踪议题时才添加条目。 | 是                                      |
| `check:fetch-targets`             | 客户端 `src/` 中的每个 `fetch("/api/...")` 都能解析到实际存在的 `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:deps`                      | 仓库内每个 `package.json` 中所有可通过 `npm install` 安装的依赖都列在 `dependency-allowlist.json` 中；新增的未锁定版本或疑似拼写劫持的软件包会被标记                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是                                      |
| `audit:deps`                      | 对全部五个独立锁文件（根目录、Electron、OpenCode 插件 v1/v2 和 provider）执行 npm 审计。严重级别公告会阻止通过；高级别公告仍显示为警告。缺失/失败的审计会被标记为 INCOMPLETE 并阻止通过；保留各作用域的锁文件哈希和报告。                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:lockfile`                  | `package-lock.json` 完整性 — 使用 https registry、包含完整性哈希、无主机覆盖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是                                      |
| `check:licenses`                  | 生产依赖项的 SPDX 许可证允许列表                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是                                      |
| `check:tracked-artifacts`         | 不允许构建产物 / 已提交的 `node_modules` 符号链接（也在 husky pre-commit 中运行；有意保持 pre-push 轻量 — #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是                                      |
| `check:ai-attribution`            | PR 提交、标题或正文中不得包含 AI/bot `Co-Authored-By` 尾注或 AI 生成页脚 — 硬性规则 #16（位于针对 PR→`release/**` 的 `quality.yml` 快速门禁循环中 — 读取事件载荷，非 PR 时不执行操作 — 并作为 `ci.yml` lint 中针对 PR→`main` 的仅限 PR 步骤；husky `commit-msg` 钩子中也会检查；允许人类共同作者；#14436）                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | 每个 Vitest 排除项都必须注明一个跟踪 issue，并出现在 `config/quality/vitest-exclusions.json` 中（#13204）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是                                      |
| `check:file-size`                 | 源文件（`src/`、`open-sse/`、`electron/`、`bin/` 中的 `.ts`/`.tsx`）不得超过 `cap`，测试文件（`*.test.ts(x)`）不得超过 `testCap`；冻结在 `file-size-baseline.json` 中的文件（`frozen` / `testFrozen`）不得超过其记录的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:error-helper`              | 执行器/处理器中的错误响应使用 `buildErrorBody()` / `sanitizeErrorMessage()`（硬性规则 #12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是                                      |
| `check:migration-numbering`       | 迁移 SQL 文件按顺序编号，不得有缺号或重复编号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是                                      |
| `check:public-creds`              | 除 `publicCreds.ts` 外，不得存在 OAuth `client_id`/`client_secret` 或 Firebase Web 密钥字面量（硬性规则 #11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是                                      |
| `check:db-rules`                  | `src/lib/db/` 模块之外不得使用原始 SQL；不得从 `localDb.ts` 进行桶式导入（硬性规则 #2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:known-symbols`             | 在相应分派表中注册的提供程序执行器、路由策略和转换器必须与磁盘上的文件匹配——不得存在孤立或未声明的符号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是                                      |
| `check:route-guard-membership`    | 每个生成子进程的路由均由 `isLocalOnlyPath()` 分类（硬性规则 #15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是                                      |
| `check:test-discovery`            | 仓库中的每个 `*.test.ts` / `*.spec.ts` 文件均由至少一个测试运行器收集（棘轮机制：`test-discovery-baseline.json` 中的孤立文件列表只能缩短）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是                                      |
| `check:agent-skills-sync`         | 生成的 agent-skills 构件与其源目录一致（无偏差）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | 提供者徽标/资源均包含已记录的来源条目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON 配置文件可被解析并符合仓库的 lint 规则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | TypeScript 编译无错误（仅有提示性警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是                                      |
| `typecheck:noimplicit:core`       | 严格的 `noImplicitAny`——面向未来；许多预先存在的调用点仍需添加类型注解                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **提示性**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | 作用域限定为 `src/app/(dashboard)/**` 的 `tsc` (#7033) — `typecheck:core` 精选的 27 文件允许列表不包含任何 dashboard TSX，且 `next build` 也从不对其进行类型检查（`next.config.mjs` 设置了 `ignoreBuildErrors: true`），因此其中的孤立标识符回归 (#6625/#6909) 对 CI 不可见。与按文件/TS 代码计数冻结的基线（`config/quality/dashboard-typecheck-baseline.json`，采用与 `check:known-symbols` 相同的过期强制检查模式）进行差异比较 — 只有超出基线计数的新错误才会导致门禁失败；修复已有错误时，使用 `--update` 逐步降低基线。                                                                                                                                                | 是                                      |

### 作业：`quality-gate`

在 `test-coverage` 之后运行。失败时阻止合并。

| 脚本                         | 验证内容                                                                                                                      | 阻塞性               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | 输出 `quality-metrics.json`（ESLint 警告计数、来自合并分片报告的覆盖率）                                                      | 是（棘轮检查的上游） |
| `quality:ratchet`            | `quality-baseline.json` 中的每项指标均未回退（ESLint 警告数 ≤ 基线；覆盖率 ≥ 基线）                                           | 是                   |
| `check:duplication`          | 代码重复率 (jscpd@4) 不超过 `quality-baseline.json` 中的基线                                                                  | 是                   |
| `check:complexity`           | 文件级圈复杂度不超过上限（核心 ESLint `complexity` + `max-lines-per-function`）                                               | 是                   |
| `check:cognitive-complexity` | 认知复杂度棘轮检查 (`eslint-plugin-sonarjs`) — 独立的 ESLint 检查；CI 将两者合并为单个 `check:complexity-ratchets` 步骤运行   | 是                   |
| `check:dead-code`            | 未使用的导出/文件棘轮检查 (knip) 相较基线没有回退                                                                             | 是                   |
| `check:compression-budget`   | 压缩基准预算 — 各引擎的令牌节省率下限不得回退                                                                                 | 是                   |
| `check:type-coverage`        | 类型化百分比棘轮检查 (`type-coverage`) 不得回退；基本涵盖 `typecheck:noimplicit:core`                                         | 是                   |
| `check:codeql-ratchet`       | 未解决的 CodeQL 警报数不得回退（通过 `gh api` 读取；无令牌时优雅跳过）— 刷新频率和手动触发方式：请参阅下文的“CodeQL 棘轮检查” | 是                   |

### 作业：`quality-extended`

该作业会阻止适用的候选项。包大小、密钥发现项、漏洞
发现项、工作流发现项和 OpenAPI 更改均通过必需的棘轮检查进行检查。
循环依赖诊断仍仅供参考。必须安装扫描器：
`scripts/ci/install-quality-scanners.sh` 会配置固定版本并传播
安装失败。工具缺失、报告无效或基线缺失会使
必需的扫描器门禁处于“未完成”状态。

| 脚本                     | 验证内容                                                                                                                                              | 阻断策略                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:circular-deps`    | 无循环依赖（dpdm）                                                                                                                                    | **建议性**                        |
| `check:bundle-size`      | 包大小不超过上限；无法获得测量结果时视为失败                                                                                                          | **使用 --ratchet 时阻断**         |
| `check:secrets`          | Gitleaks 检测结果不得回退；必需的扫描会拒绝工具/源/基线缺失、扫描失败和报告无效的情况                                                                 | **使用 --ratchet 时阻断**         |
| `check:vuln-ratchet`     | 依赖项漏洞不得回退；必需的扫描会拒绝工具缺失、报告无效或基线缺失的情况                                                                                | **使用 --ratchet 时阻断**         |
| `check:workflows`        | 工作流 lint（actionlint + zizmor）；扫描器缺失/损坏、报告无效或棘轮基线缺失时，将以 INCOMPLETE 状态失败。有效的检测结果遵循所选的严格/建议性/棘轮策略 | 必须执行；CI 中 zizmor 棘轮会阻断 |
| `check:openapi-breaking` | 根据固定的事件提交验证公共 API 契约（PR 合并基准、推送前提交、合并组基准；计划/手动签出时使用第一父提交）；必需的测量失败时默认拒绝                   | **使用 --ratchet 时阻断**         |

### 作业：`docs-sync-strict`

对于目标分支为 `main` 或 `release/**` 的拉取请求，此作业仅对非草稿（或来自可信队列）且被归类为文档或代码变更的候选运行。它也在非 PR 的 CI 事件中运行；此工作流的 push 触发器仅覆盖 `main`，不覆盖 `release/**`。以非零退出码结束的步骤会阻断作业；仅报告的发现以及下文记载的豁免不会阻断。

| 脚本                           | 验证内容                                                                                                                                                                                                                                                                             | 阻断策略                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `check:docs-all`               | 按顺序运行以下 7 个子门禁的元门禁                                                                                                                                                                                                                                                    | 是                                                                                        |
| ↳ `check:docs-sync`            | 软件包、OpenAPI 和 CHANGELOG 的版本一致性，`llm.txt` 镜像的精确一致性，已翻译 CHANGELOG 的章节与大小不变量，以及不存在已被替代的重复文档                                                                                                                                             | 是                                                                                        |
| ↳ `check:docs-frontmatter`     | 已编译的文档页面包含有效的 frontmatter 标题                                                                                                                                                                                                                                          | 是                                                                                        |
| ↳ `check:docs-counts`          | 高置信度的计数不变量采用严格检查；启发式文件计数检查仅发出警告，除非脚本收到 `--strict` 参数（CI 元门禁不会传入该参数）                                                                                                                                                              | 严格层级阻断；宽松层级仅供参考                                                            |
| ↳ `check:env-doc-sync`         | 应用明确的忽略项、仅文档项和仅环境项允许列表后，源代码中的环境变量读取、`.env.example` 与 `docs/reference/ENVIRONMENT.md` 保持一致                                                                                                                                                   | 是，但已记录的允许列表例外除外                                                            |
| ↳ `check:deprecated-versions`  | 报告安全历史上下文之外可能过时的版本及过时的更新日期，忽略的文档除外                                                                                                                                                                                                                 | 当前 CI 配置中仅供参考（未传入 `--strict`）                                               |
| ↳ `check:doc-links`            | 文档中的内部 markdown 链接解析到真实文件（`[text]`/`(path)` 形式）                                                                                                                                                                                                                   | 是                                                                                        |
| ↳ `check:fabricated-docs`      | 文档中引用的路由、环境变量、CLI 命令、钩子名称和文件路径在代码库中存在。通过 `--strict` 实施硬门禁；不带该标志时为软失败。                                                                                                                                                           | 是（CI 中通过 `--strict`）                                                                |
| `check:cli-i18n`               | CLI 使用的 `t()` 键存在于 `en` 中；`pt-BR` 保留所有顶层章节；`zh-CN` 和 `zh-TW` 包含 `en` 的每个键                                                                                                                                                                                   | 是                                                                                        |
| `check:openapi-coverage`       | OpenAPI 规范对真实路由的覆盖率至少达到棘轮下限                                                                                                                                                                                                                                       | 是                                                                                        |
| `check:openapi-security-tiers` | 声明的 `x-loopback-only`/`x-always-protected` 注解必须得到 `routeGuard.ts` 的支持；解析器错误和正向检查不匹配会阻断。反向检查在仅限本地访问的前缀下发现缺少 `x-loopback-only` 时发出警告，且仅通过模式定义的路由不参与该反向检查。                                                   | 解析器和正向检查阻断；反向检查仅供参考                                                    |
| `check:openapi-routes`         | 应用有理由支持的 `KNOWN_STALE_SPEC` 允许列表后，`openapi.yaml` 中的每个 `/api...` 路径都须忽略参数差异匹配到真实路由；允许列表中过时的条目也会导致失败                                                                                                                               | 是                                                                                        |
| `check:docs-symbols`           | 非镜像的规范文档中的内部 `/api/...` URL 引用须匹配到真实路由或路由族；代理、上游、占位符及文件引用，以及有理由支持的 `KNOWN_STALE_DOC_REFS` 条目均被排除，允许列表中过时的条目会导致失败                                                                                             | 是                                                                                        |
| `i18n translation drift`       | 检查核心文档的源/目标哈希及翻译来源。PR 比较仅允许完全相同的继承失败；源、缺失目标、目标哈希、过时翻译或章节缓存方面新增或未经验证的不一致均会阻止通过。在 PR 比较之外，源/缺失目标/目标哈希失败会阻止通过，而过时翻译和不一致的章节缓存仍仅作警告。缺少旧格式的章节缓存不属于失败。 | PR 中新增或未经验证的差异会阻止通过；完全相同的继承差异仅作警告；非 PR 规则取决于失败类型 |

### 作业：`i18n-ui-coverage`

| 脚本                             | 验证内容                                                                                                                                | 阻断性   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage`（内联） | UI i18n 键覆盖率 ≥ 65%                                                                                                                  | 是       |
| `check-ui-value-drift`（内联）   | 重写后的英文**值**不会留下过时的翻译                                                                                                    | 是       |
| `check-new-key-coverage`（内联） | **新增的**英文键已在所有语言区域中翻译——拒绝 `__MISSING__:` 标记                                                                        | 是       |
| `check-translation-ratio`        | 每个语言区域的真实翻译比率（白名单之外与英文相同的值、占位符或缺失项）不得超过 `config/quality/i18n-translation-baseline.json` + 宽限值 | **阻断** |

需要 `fetch-depth: 0`——值漂移门禁会将 `en.json` 与合并基准进行差异比较。

#### `check-ui-value-drift`——过时翻译门禁

捕获其他门禁在结构上无法发现的一种 i18n 回归：英文值被重写，但基于_先前_英文生成的翻译仍然保留，导致非英语用户继续读到措辞笃定但现已错误的文案。

这确实曾发布到生产环境。当 Antigravity 登录辅助程序上线时（#5203），`oauthModal.googleOAuthWarning` 被重写；**43 个语言区域中有 39 个**仍保留着要求操作人员“复制完整 URL 并粘贴到下方”的文本——而该提供者根本无法通过这一流程完成操作。直到 #8463 才发现此问题，原因如下：

- `sync-ui-keys` 只回填**不存在**的键，从不处理**过时**的键；
- `check-ui-keys-coverage` 统计键是否_存在_，因此过时翻译也会被计为已覆盖；
- `check-translation-drift` 跟踪的是 `docs/i18n/<locale>/**.md` 文档镜像——它从不读取 `src/i18n/messages/*.json`。自 2026-09 重新同步以来，它在作业 `docs-sync-strict` 中具有阻断性：编辑核心文档 → `npm run i18n:run -- --files=<doc>`（按章节处理，成本低）。

**感知差异，而非基于基线。** 它将合并基准处的 `en.json` 与工作树进行比较；对于英文值发生变化的每个键，任何仍保留原封不动翻译的语言区域都被视为过时。这会刻意**冻结既有债务**——差异无法揭示长期存在的翻译源自哪个旧英文值，因此门禁只评判当前变更所触及的内容。替代方案（按键维护哈希基线）需要一个约 600 KB 的生成文件，是现有最大基线的 3 倍，并且会在每个 i18n PR 中频繁变动。

可通过两种方式满足该门禁：

1. 更新受影响的翻译，或
2. 将其设为 `__MISSING__:<new english>`——随后运行时会提供修正后的英文（`src/i18n/request.ts::deepMergeFallback`，#7258），并将该键加入待翻译队列。

如果字符串的**含义**发生了变化，优先选择**重命名键**：新键不会继承过时翻译。#8463 使用的就是这种模式。

```bash
npm run i18n:check-value-drift          # 严格模式（CI 运行的模式）
npm run i18n:check-value-drift:warn     # 仅报告
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

值漂移门禁和新键门禁共享来自
`scripts/i18n/resolve-ui-diff-base.mjs` 的同一个不可变比较基准。工作流会将相同的基准、基准分支顶端和
候选 SHA 传递给这两项检查。PR/基准分支重定向、推送和合并组运行均使用各自的事件
上下文。调度候选分支时，需要存在与其完全匹配的开放 PR，或显式提供
`i18n_base_sha` 输入。在未提供该输入的情况下，调度或定时观测 `main` 或 `release/vX.Y.Z`
时，会将最后一次提交与其第一个父提交进行比较；这并不是对
所有继承的翻译债务进行审计。本地调用需要显式指定比较基准，
例如上面的 `BASE_REF` 命令。

比较上下文缺失或存在歧义、必需的目录文件无法读取或无效，以及
候选项发生变化时，都会产生 `INCOMPLETE`，退出代码为 **2**，包括警告模式下。
目录文件通过 `scripts/i18n/read-ui-catalog.mjs` 读取；读取失败时不会用
空对象替代。基准不可用或输入不完整均不能判定为 PASS。

### 作业：`i18n`

完整的 i18n 验证矩阵（每个语言区域一个作业）。整个作业均为建议性。

| 脚本                            | 验证内容                 | 阻断性                                                 |
| ------------------------------- | ------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | 每个语言区域的翻译完整性 | **建议性**（整个作业设置了 `continue-on-error: true`） |

### 作业：`pr-test-policy`

仅在拉取请求中运行。

| 脚本                   | 验证内容                                                                                           | 阻断性 |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | 修改 `src/`、`open-sse/`、`electron/` 或 `bin/` 中生产代码的 PR 必须包含或更新测试（硬性规则 #8）  | 是     |
| `check:test-masking`   | 变更的测试文件不会减少断言净数量，也不会添加 `assert.ok(true)` 这类恒真断言                        | 是     |
| `check:pr-evidence`    | PR 正文需引用该变更的测试/VPS 证据（通过 grep PR 文本将硬性规则 #18 机制化——较脆弱，参见待办事项） | 是     |

### 作业：`test-vitest`

需要 `changes` 分类作业。适用的矩阵分片失败时会阻止合并。

| 测试套件         | 验证内容                                                  | 阻断性                                                                   |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `test:vitest`    | MCP 服务器（110 个工具）、autoCombo、缓存 — vitest 运行器 | 是                                                                       |
| `test:vitest:ui` | UI 组件测试 — vitest 运行器                               | **阻断** — `vitest.config.ts` 中已明确排除既有失败；新失败会导致任务失败 |

### 夜间工作流（定时执行，建议性）

这些工作流按 cron 计划运行（也可通过 `workflow_dispatch` 触发），绝不会在 PR 上运行。它们均为建议性工作流。

| 工作流                 | 验证内容                                                                                                                              | 阻断性     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | 使用随机种子和高运行次数的 fast-check 属性测试                                                                                        | **建议性** |
| `nightly-resilience`   | 堆增长门禁、混沌故障注入、k6 负载/浸泡测试                                                                                            | **建议性** |
| `nightly-llm-security` | promptfoo 注入防护（阻止模式）+ garak 探测（没有提供者密钥时跳过）                                                                    | **建议性** |
| `nightly-schemathesis` | 使用 `docs/openapi.yaml` 对实时 OmniRoute 进行 OpenAPI 契约模糊测试（schemathesis）— 暴露规范违规问题/未处理的 500 错误（阶段 8 B.4） | **建议性** |
| `nightly-mutation`     | 对快速单元测试通道运行 Stryker 变异测试并评分 — 存活的变异体会暴露薄弱的断言                                                          | **建议性** |
| `nightly-compat`       | 针对受支持的 `engines.node` 范围执行 Node 引擎兼容性矩阵测试                                                                          | **建议性** |

性能基线（堆、TTFB、构建时间）仅记录，不设门禁：请参阅 [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md)（`npm run perf:lts-baseline`）。

---

## 速度阶段（2026-08-30 → v4.0 LTS）：所有基线均放宽 20%

负责人决定（2026-08-30）：在 v4.0 模块化完成之前，交付速度比控制技术债务更重要。所有**数值型**棘轮基线均通过一次可审计的操作放宽了 20%，并在 `config/quality/quality-baseline.json` 中声明了该阶段：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 变更内容                                                                                                                                                       | 位置                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 越低越好的计数 ×1.2，越高越好的百分比 ÷1.2（覆盖率下限保持为 60，`eslintErrors` 保持为 0，`eslintWarnings` 从 0 调整为冻结抑制数量的 20%） | `quality-baseline.json`（`_relax_velocity_2026_08_30` 注释列出了每项调整前 → 调整后的值）              |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                               | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`，以及每个 `frozen[*]` / `testFrozen[*]` 行数上限 ×1.2                                                                                         | `file-size-baseline.json`                                                                              |
| 每文件 / 每 TS 代码计数 ×1.2                                                                                                                                   | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 从 36 → 30                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| 当 `_policy.requireTighten === false` 时，`--require-tighten` 改为仅提供建议                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 暂停每晚的 `bank-ratchet-shrinks`（它会记录测得的缩减并抵消预留空间）                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

允许列表（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json` 等）**不是**预算，因此未作改动。通过/失败策略门禁（机密信息、SQL 规则、文档/环境契约、i18n 一致性、单元测试）保持不变——测试失败仍然就是失败。

**工具**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 一次性放宽操作（`scripts/quality/relax-baselines.mjs`）；拒绝使用相同注释重复运行。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — 按照与 CI 相同的方式测量每个数值型门禁，并输出各门禁的剩余空间（`scripts/quality/baseline-headroom.mjs`）。每晚运行的 `baseline-headroom` 作业会在工作流运行摘要中发布表格，并将其 JSON/Markdown 报告作为 `baseline-headroom-<run_id>` 上传，保留 90 天。警告行和严重行用于标识距上限不足 10% 或已经超限的门禁。请将这些报告作为预算正在被消耗的早期预警进行审查；检查对应门禁的 `_rebaseline_*` 注释。该作业不再创建或更新永久性议题；#12149 保留了之前的报告历史记录。

**新代码模式（Clean-as-You-Code）— 自 2026-08-30 起，仅用于 PR 快速路径**

在 `pull_request` 事件中，`quality.yml` 会将 `--base-ref <PR base SHA>` 传递给 `check:file-size`、`check:complexity-ratchets` 和 `check:dead-code`。对于 `check:complexity-ratchets` 和 `check:dead-code`，门禁会比较 HEAD 与合并基点，且**仅限于 PR 修改的文件**（`scripts/check/newCodeMode.mjs`：在一次性 `git worktree` 中具现化合并基点，分别在该工作树和 HEAD 上运行 ESLint/knip，然后对每文件计数求差）：

- **阻断性** — PR 在其修改的文件中新增了圈复杂度/认知复杂度违规或死导出（日志中的 `complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=`）；
- **提示性** — 全局总量与冻结基线的对比。继承的偏差绝不会导致无辜的 PR
  标红；该偏差会被持续跟踪，以便在发布对账时修复，并由余量任务监控。

`check:file-size` 按其自身规则使用基础引用（`scripts/check/check-file-size.mjs`，#8522）：它会检查代码树中的每个源文件和测试文件，使用 `git show` 读取各文件在 PR 基础版本中的行数，并且只有当文件增长后超过其基线上限（基线内文件使用 `frozen` / `testFrozen`，基线外文件使用 `cap` / `testCap`）与基础版本大小二者中的较大值时，才会判定该文件失败。因此，基础版本中已经发生漂移的文件绝不会导致无辜的 PR 失败。

`check:boundary:ratchet` 将相同的规则应用于其单一数值
（`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`）：在 PR 事件中，
`quality.yml` 快速门禁和 `ci.yml` lint 作业都会传入 PR 的基准 SHA；基准提交通过
`git archive` 导出进行测量；仅当 PR 的 `open-sse → src` 边数量超过
`metrics.boundaryOpenSseToSrc` 与基准分支计数两者中的较大值时，PR 才会失败。高于上限的
基准漂移会被报告（`base drift herdado`），但绝不会导致无辜的 PR 失败；push → main
仍使用绝对上限，而无法解析的基准 SHA 会回退到该上限并发出警告。

`workflow_dispatch` 运行、发布前全绿检查和每夜余量作业没有 PR 基准，
因此继续使用绝对（全局）比较。目前，覆盖率、重复率和类型覆盖率仍采用全局比较
（其工具无法以较低成本生成逐文件差异）——它们是采用相同处理方式的候选项。

**在 v4.0 结束此阶段（LTS = 比以前更严格，而不是“恢复正常”）**

1. 在纯净的 `release/v4.0.0` 分支尖端上：运行 `npm run quality:headroom --json`
   以留档，然后运行 `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`，以及每个类型检查门禁的
   `--update`——每项基线都会降至实测值。
2. 从 `quality-baseline.json` 中删除 `_policy`（重新启用 `--require-tighten` 和每夜
   余量积累），并在 `check-openapi-coverage.mjs` 中恢复 `THRESHOLD = 36`（或更高）。
3. 对模块化已取得成效的部分，将阈值收紧至低于实测值：将文件大小 `cap` 恢复到 1000
   （或 800），覆盖率下限提高 5，模块化包的无用导出数量设为 0。

## 棘轮基线（`quality-baseline.json`）

棘轮引擎（`scripts/quality/check-quality-ratchet.mjs`）读取 `quality-baseline.json`，
并将其与最新收集的 `quality-metrics.json` 进行比较。任何退化幅度超过其 epsilon 的指标
都会导致构建失败。

当前跟踪的指标：

| 指标                  | 方向   | 含义                    |
| --------------------- | ------ | ----------------------- |
| `eslintWarnings`      | `down` | ESLint 警告数量不得增加 |
| `coverage.statements` | `up`   | 语句覆盖率不得下降      |
| `coverage.lines`      | `up`   | 行覆盖率不得下降        |
| `coverage.functions`  | `up`   | 函数覆盖率不得下降      |
| `coverage.branches`   | `up`   | 分支覆盖率不得下降      |

若指标确实有所改善，请按以下方式更新基线：

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 标志会将当前测量值写入 `quality-baseline.json`。
请将此文件与改进该指标的变更一同提交。若 PR 改进了某项指标却未更新基线，
`--require-tighten` 将检测到这一情况（Fase 6A.5，尚待实现）。

### CodeQL 棘轮：刷新频率和手动触发

`check:codeql-ratchet` 读取的是**按计划刷新，而非每个 PR 都刷新的仓库状态。**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` 报告
`state: configured`、`schedule: weekly`：这是 GitHub 的默认设置扫描，而非每次推送时
都执行的分析。因此，在修复警报的 PR 合并后，棘轮会继续读取旧的、更高的数量，
直到下一次计划扫描运行——在扫描结果更新前，它会在每个打开的 PR 上报告退化，
包括修复该问题的 PR 自身的后续 PR。

**手动刷新**：`gh workflow run codeql.yml --ref release/vX.Y.Z` 会重新运行
分析，并在几分钟内重新发布警报。请先阅读 `.github/workflows/codeql.yml`——
其文件头说明，该工作流仅支持 `workflow_dispatch`，**因为它与 GitHub 的“默认设置”冲突**
（`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`）。
恢复 `push`/`pull_request`/`schedule` 触发器前，**仓库所有者必须先执行一项操作**：
Settings → Code security → CodeQL: Default → Advanced。在完成此切换之前，不要添加
`schedule:` 触发器——否则只会产生失败的运行。

**数量下降后收紧基线**——`node scripts/check/check-codeql-ratchet.mjs
--update` 会将新的测量数量写入 `quality-baseline.json` →
`metrics.codeqlAlerts.value`，这样棘轮就不会悄然允许警报数量回升到旧的上限。
实际示例（2026-09-02/03）：PR #12502 修复了 7 个真实警报
（测得的未关闭警报从 13 降至 6）；PR #12530 将冻结的基线从 11 收紧至 6，以与之匹配；
随后为剩余 6 个警报逐一提供理由并将其驳回，使未关闭警报数量降至 0。

**驳回警报由操作人员决定（硬性规则 #14）**——若未在驳回评论中记录技术理由，
绝不可驳回 CodeQL 警报：上游协议要求使用 `won't fix`，测试夹具使用 `used in tests`，
CodeQL 无法识别的清理程序使用 `false positive`
（先例：`docs/security/ERROR_SANITIZATION.md`）。

---

## 测试重试策略（WS5.4，v3.8.49）

重试策略按 runner 分别设置，绝不进行全局无差别重试——无差别重试会将真实回归变成不可见的不稳定问题：

| Runner            | 策略                                                                                               | 原因                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Playwright (e2e)  | 仅在 CI 中设置 `retries: 1`，并启用 `trace: on-first-retry`                                        | 浏览器/网络时序确实具有不确定性；进行一次带跟踪的重试，可将不稳定问题转化为可诊断的产物 |
| Vitest            | 不进行全局重试。经证实存在不稳定性的测试会显式设置单测试重试（在 diff 中可见，并在 PR 中接受审查） | 将隔离列表保留在仓库中，绝不使其变得不透明                                              |
| node:test（单元） | 任何情况下都不重试                                                                                 | 不稳定的单元测试就是测试本身的缺陷——修复它，不要靠重新运行碰运气                        |

不稳定性遥测上线后的目标 SLO（WS5.2/5.3）：每个测试的不稳定率 <1%
（“立即修复”阈值），每条流水线的通过率 ≥95%。这些是行业参考值——
应根据我们自己的测量结果重新校准。

## 发布级棘轮漂移（WS5.5，v3.8.49）

当棘轮指标（文件大小、复杂度、eslint 警告）在纯净发布
tip 上发生回归时——即多个合并的组合导致了回归，且没有任何单个 PR 能在
其自身分支上复现该回归——修复工作应由**发布负责人一次性在发布分支上**
完成：优先选择提取/重构；只有在添加有据可查的理由条目后，才能重新设定基线。
绝不要将组合漂移归咎于某个贡献者的 PR，也绝不要按 PR 重新设定基线（那会隐藏真实回归）。
首先进行辨别：在假定是你的 PR 导致问题之前，先在探测用 worktree 中针对纯净 tip
复现失败状态。

## 固化棘轮收缩——向下调整（#8584）

棘轮机制只有一半是自动化的，而且自动化的是错误的那一半。**提高**上限只需手动编辑
JSON，十秒钟即可完成，也是解除红色 PR 阻塞的最快方式。**降低**上限则需要有人运行
`--update` 并提交结果——而在 `bank-ratchet-shrinks` 作业上线之前，没有任何工作流会执行它。
其可测量的后果（2026-07-25）是：已有 18 个冻结文件达到或低于 800 行的新文件上限，其中最严重的
高达 132 倍（`src/shared/validation/schemas.ts` 只有 19 行，却保留着 2,523 的上限）；
复杂度上限经过约 37 条重新设定基线的说明后从 `1794 → 2169`，期间只有一次下降（−1）；
而“在下个周期通过 `--update` 收紧”这句话写了 31 次，却只兑现了一次。若某个上限在促成它的代码
已不复存在后仍被保留，就会悄无声息地将每次已完成的拆分转化为留给下一个文件编辑者的增长额度。

`nightly-release-green.yml` → 作业 **`bank-ratchet-shrinks`** 闭合了这一循环：

|        |                                                                                              |
| ------ | -------------------------------------------------------------------------------------------- |
| 运行于 | `schedule`（每天 3 次）+ `workflow_dispatch`——特意**不**在 `push` 时运行                     |
| 测量   | 最高版本的 `release/vX.Y.Z`，采用与 `release-green` 相同的解析与注入防护                     |
| 写入   | `check:file-size --update` 和 `check:complexity-ratchets --update`（两者在设计上都只能收缩） |
| 验证   | `npm run check:ratchet-bank`（`scripts/quality/verify-ratchet-bank.mjs`）                    |
| 交付   | 一个始终保持最新、以发布分支为目标的 PR——强制更新，绝不重复骚扰                              |

固化操作采用批处理而非每次 push 都执行，因为它没有时延要求（8 小时内固化收缩即可），
而每次合并都运行会在集中合并期间反复重建 PR 分支，并且每次都要承担完整 ESLint 扫描的成本。
检测仍在 push 时执行（`release-green`）；只有固化操作采用批处理。

### 安全验证器

该作业会在无人值守的情况下写入基线，因此 `verify-ratchet-bank.mjs` 是确保这种做法
可以接受的关键。它会比较执行 `--update` 后的树与 `HEAD`，并且在任何提交产生之前
**中止作业**——不会创建 PR——除非每项更改都属于以下情况之一：

- `frozen` / `testFrozen` 中的数字条目被**降低**或**移除**
- `complexity-baseline.json` → `count` 被**降低**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` 被**降低**

任何其他更改都会导致失败：提高数字、新增条目、更改 `cap`/`testCap`，或者
删除/改写 `_rebaseline_*` 说明（这些说明是记录各个上限存在原因的审计轨迹，
与文件条目一同存储在同一个 `frozen` 对象中）。
一个能够提高上限的机器人只会比现状更糟。回归防护：
`tests/unit/verify-ratchet-bank.test.ts`。

该作业绝不会推送到 `release/*`——PR 由人工合并，因此错误的测量结果无法在未经审查的情况下落地。

## 允许列表策略

所有不会因既有违规而失败的门禁都使用冻结的允许列表
（例如 `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）。策略如下：

**修复根本原因；仅当违规是既有问题且无法在同一 PR 中修复时，才使用允许列表。**

向允许列表添加条目时：

1. 添加注释说明理由。
2. 引用跟踪议题（例如 `// #3498 — Phase 2 feature, not yet implemented`）。
3. 在修复该违规的同一 PR 中移除相应条目——如果某个过时条目不再
   抑制有效违规，那么该条目本身就是缺陷（6A.3 过时执行检查一旦实现，
   将导致孤立的允许列表条目无法通过门禁）。

**不要**为了让测试更快通过而添加允许列表条目。门禁显示为绿色，但允许列表却不断增长，
只会造成质量良好的错觉。

### 当门禁在你的 PR 上失败时

1. **仔细阅读门禁输出**——它会明确指出违反规则的文件或符号。
2. **修复违规**——大多数门禁都是确定性的文件系统检查，只要代码正确，就会通过。
3. **如果违规是既有问题**（即并非由你引入，而是门禁现在开始覆盖该问题）：
   添加一个允许列表条目，并附上理由注释和跟踪议题。
4. **如果门禁采用棘轮机制**（覆盖率、ESLint 警告、重复度、复杂度）：
   说明你的更改使指标变差。请修复底层问题；或者在极少数情况下，如果该更改是有意为之，
   且指标下降可以接受，则运行 `npm run quality:ratchet -- --update`——但必须在 PR 描述中说明原因。
5. **建议性门禁**（`continue-on-error: true`）仅供参考——它们不会阻止合并，
   但会显示在 CI 摘要中。即便如此，也应修复这些问题。

---

## 添加新门禁

1. 创建 `scripts/check/check-<name>.mjs`（或 `.ts`）。策略门禁以 0/1 退出。
   棘轮式门禁通过 `collect-metrics.mjs` 将指标写入 `quality-metrics.json`。
2. 将 `"check:<name>": "node scripts/check/check-<name>.mjs"` 添加到 `package.json`，并
   在 `config/quality/gate-manifest.json` 中同步该别名及其确切命令。
   更改或移除现有验证别名时，也应执行相同的同步操作。
   运行 `npm run check:gate-manifest`；pre-commit 钩子和 CI 变更分类
   会强制执行此约定。
3. 在 `.github/workflows/ci.yml` 的相应作业下接入它
   （策略 → `lint` 或 `docs-sync-strict`；棘轮 → `quality-gate`）。
4. 如果它有允许列表，请使用
   `scripts/check/lib/allowlist.mjs` 中的 `reportStaleEntries()`，以便自动检测过时条目。
5. 在 `tests/unit/build/` 中编写测试，覆盖该门禁的检测逻辑。
6. 更新本文档（向相关作业表格添加一行）。

---

## 智能体工具：LSP-in-the-loop（选择启用）

除 CI 门禁外，OmniRoute 还提供了一个**选择启用**的 `agent-lsp` 脚手架
（项目级 `.mcp.json`，Fase 7 Task 15）。创建 `.mcp.json`
以向编码智能体公开 TypeScript 语言服务器，使其在编写代码**之前**解析符号/
诊断信息——作为 `typecheck:core` 的“先编译再声明”配套机制，从源头减少“虚构符号”错误。
它被刻意设计为不会自动加载（你需要选择并验证 MCP↔LSP 桥接方案）；损坏的条目只会记录
连接错误，绝不会中断会话。

---

## 合理化待办事项（ROI 审查 — 阶段 9 第 3 波）

此清单已于 2026-06-17 对照 `ci.yml` 完成核对（先前版本遗漏了
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`）。对核对后集合进行 ROI 审查时，
识别出了以下合理化候选项。**合并属于机械性的 CI 变更；切换/移除属于
保留给操作人员的策略决策。**以下内容均尚未应用。

**上文同样未记录的内容**（建议性、低信号）：`docs-lint` 作业
（markdownlint + Vale，整个作业启用 `continue-on-error`），以及独立的扫描器工作流
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`semgrepFindings: 0` 位于
`quality-baseline.json` 中，但未连接至 `ci.yml` 中的阻断式棘轮机制——该指标
目前处于孤立状态。

### 合并 / 去重（机械性操作，风险较低）

每个候选项均已于 2026-06-17 根据实际门禁状态进行验证（信任但要核实）；
若干“显而易见”的合并实际上掩盖了技术债务，**并非**可直接替换的干净方案。

- **`check:docs-sync` 运行两次**——一次在 `lint` 作业中独立运行，另一次在 `check:docs-all`（`docs-sync-strict`）及 husky pre-commit hook 中运行。✅ **已完成**——已移除 `lint` 中的独立调用。
- **CVE 扫描**——❌ **无法干净合并。** `audit:deps` 会对全部五个 lockfile 中的严重公告和不完整审计进行阻断，同时根据当前策略将高危公告报告为警告；而 `check:vuln-ratchet`（osv）仅在相对于已签入基线发生_回退_时失败，并会在要求测量值但测量值缺失时拒绝通过。两者语义不同——移除 `audit:deps` 将失去绝对严重级别门禁和独立的软件包审计凭证。两者均应保留。
- **循环检测**——✅ **已完成**（#15159 G-01/G-02）。此处旧文本将 `check:cycles` 称为“绿色、经过筛选”的门禁，并以 `check:circular-deps`（dpdm）报告了 91 个循环为由，论证应继续将其作为阻断项。这个绿色结果是一个**假绿**：`check:cycles` 仅扫描了 5 个子目录（450 个文件），只匹配静态 `import|export … from`，并丢弃所有 `@/` 和 `@omniroute/open-sse/` 说明符，因此无法发现占据仓库大多数的动态导入 + 别名循环。现已修复：该门禁现在会遍历 `src` + `open-sse`（5023 个文件），从 TypeScript AST 中收集说明符（因此 `import("…")` 会计入，而类型位置中的 `typeof import("…")` 不会），并解析 tsconfig `paths`。它检测到 **14** 个循环，而非 0 个。由于无法在门禁 PR 中修复 14 个既存循环，`check:cycles` 现已改为**棘轮机制**（`--ratchet`，上限为 `quality-baseline.json` 中的 `metrics.cycles.value = 14`，`direction: down`）——它会阻断任何_回退_，且数量只能下降。CI 运行 `npm run check:cycles:ratchet`。逐步清零工作随 **A-01** 一并推进。`check:circular-deps`（dpdm）继续作为覆盖面更广的建议性第二意见。
- **复杂度**——✅ **已完成**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：单次 ESLint 遍历，按 ruleId 计数，因此圈复杂度 + 最大行数基线与认知复杂度基线保持独立；单独的 `check:complexity` / `check:cognitive-complexity` 予以保留，供本地使用 `--update`。
- **`/api` 反幻觉检查**——✅ **已完成**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：对 `src/app/api` 执行一次文件系统清点，openapi-routes + docs-symbols 仍分别独立报告；单独检查予以保留，供本地运行。
- **`check:node-runtime` 在 11 个作业中运行**——⚠️ **ROI 较低。** 每个作业使用独立 runner，且该检查耗时不到 1 秒；总节省时间约为 10 秒，但代价是失去廉价的逐作业防护。不值得为此折腾。
- **CI lint 中的 `typecheck:noimplicit:core`**——✅ **已从 lint 作业中移除**（此前为启用 `continue-on-error` 的建议性检查）；阻断式类型覆盖面由 `typecheck:core` + `check:type-coverage` 提供。本地脚本予以保留。

### 切换 / 决策（操作人员策略）

- `check:openapi-security-tiers`（建议性）——❌ **无法直接干净地切换。** 它以状态码 0 退出，但会警告 `LOCAL_ONLY_API_PREFIXES` 下的若干 `traffic-inspector` 路由缺少 `x-loopback-only: true` 注解。强制执行前，必须先将这些注解添加到 `openapi.yaml`。
- `typecheck:noimplicit:core`（建议性）——大体上已被阻断式 `check:type-coverage` 棘轮机制覆盖。可将其切换为棘轮机制，或移除冗余的第二次 `tsc` 执行。
- `test:vitest:ui`（现为**阻断式**）——既存失败已在 `vitest.config.ts` 中明确排除，并带有 `// #8618` 跟踪注释；新增失败会导致作业失败。
- `check:secrets`（gitleaks，阻断式棘轮机制）——当前上限为 `quality-baseline.json` 中的 `metrics.secretFindings`。任何例外均需在 `.gitleaks.toml` 中添加有充分理由的条目；无法获得测量值时状态为 INCOMPLETE。该扫描是对 GitHub 原生密钥扫描及 `check:public-creds` 的补充。
- `check:pr-evidence`（阻断式，对 PR 正文文本执行 grep）——误报风险较高；若移除，则会削弱对 Hard Rule #18 的执行，因此这是一项真正的策略决策。
- `semgrep`（建议性的独立检查）——在 OWASP 类别方面与 CodeQL 重叠；应将其基线接入棘轮机制，或将其移除。

---

## 相关文档

- 供应链（来源证明、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 键集合一致性门禁

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`，作业 `i18n-ui-coverage`）。
将每个 `src/i18n/messages/<locale>.json` 的叶子键集合与 `en.json` 进行比较，只要存在任何缺失或多余的叶子键，就会失败，无论该键是何时添加的。`__MISSING__:` 占位符视为存在（其内容属于比例门禁的职责范围）。它是另外两个基于差异/百分比的门禁的绝对补充：`check-ui-keys-coverage` 对每个区域设置 80 % 的覆盖率下限（约 13,000 个键中缺失 43 个，覆盖率仍显示为 99.7 %），而 `check-new-key-coverage` 只检查 PR 添加到 `en.json` 的键。区域批次基于其分支切出当天的 `en.json` 生成，并在基础分支持续添加键的同时进行数天的翻译；批次 PR 本身不添加任何键，因此，当批次 1（#13044）合入时，九个区域缺少 43 个键，而批次 2（#13660）合入时，八个区域缺少 10 个键（2026-09-15），这两个同级门禁都未发出警报。若出现红灯，请使用 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 修复；`extra` 叶子键表示源文件已将其移除——请从对应区域中删除它。`--warn` 仅报告而不会导致失败。`--catalog=cli` 会对 `bin/cli/locales` 执行相同的比较（`npm run i18n:check-keys:cli`）；这两个步骤都位于作业 `i18n-ui-coverage` 中。

#### `check-new-key-coverage` — 新键国际化门禁

`check-ui-value-drift` 的同级门禁。后者会捕获英文值被**重写**但其翻译未同步更新的情况；本门禁则会捕获新增英文键但某些区域从未收到该键的情况。

`check-ui-keys-coverage` 无法发现这类问题：它对每个区域执行百分比下限，而约 13,000 个叶子键中缺失 11 个时，覆盖率仍为 99.9%。按语言计算的百分比无法表达“此功能发布时未翻译”——整个功能可能在新区域中没有任何文本，却完全不会影响该数字。

它所记录的事故如下：Orchestration Canvas 的第 3 阶段在当时已有的 42 个区域中翻译了其 11 个键。几小时后，欧盟语言批次（#13044）将仓库扩展到 51 个区域，而新增的九个区域（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）从未收到这些键。`deepMergeFallback` 会用英文替代缺失的键，因此故障表现为未翻译的 UI，而不是空白 UI——这是一个真实的问题，并且其设计决定了它不会产生告警。

与同级门禁一样，它也**感知差异**：将合并基准处的英文内容与工作树进行比较，因此既有缺口会保持冻结，启用该门禁时无需进行迁移。

**`__MISSING__:<english>` 标记无法满足该门禁（自 2026-09-17 起）。** 它过去是文档中规定的延期方式——运行时会回退到正确的英文——直到 2026-09-16 的八个功能 PR 添加了 61 个键，并将该标记填入全部 65 个区域，而不是进行翻译：此门禁接受了所有这些 PR，没有任何机制阻止它们，而阻塞式真实翻译比例门禁随后在发布分支顶端对所有人失败（pt-BR 3.2 % > 2.5 % + 0.5）。现在，标记会被判定为缺失翻译。若出现红灯，请使用 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 修复，也可以使用 `npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`，可安全脱离终端运行；如果没有 `OMNIROUTE_TRANSLATION_*` 环境变量，则拒绝启动）并行处理所有区域。必须保持英文的键（固定的产品名、引擎名或标志名）应放入 `scripts/i18n/untranslatable-keys.json`，绝不能隐藏在标记之后。`vi` 完全禁止标记（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 暂停测试门禁

`vitest.config.ts` 的 `exclude` 列表中的文件是不会运行的测试，但对于查看代码树的人而言，它们看起来像是测试覆盖的一部分。注释 `// #8618 — pre-existing failure; remove this exclusion when fixed` 下累积了 62 个文件。Issue #8618 于 2026-08-11 关闭，但它所跟踪的列表却从 45 项增长到 62 项，每个新增项都继承了指向已关闭 Issue 的注释。最终逐文件测量该列表时（#13204），**62 个文件中有 51 个无需更改任何源代码即可通过当前代码树的测试**。

该门禁要求，每个可解析为真实文件的排除项都必须 (a) 指明一个跟踪 Issue，并且 (b) 连同其测量状态一起出现在 `config/quality/vitest-exclusions.json` 中。这样，新增排除项就会成为专用文件中可审查的差异，而不是在一个包含 60 项的数组中再增加一行。它有意不重新运行被排除的测试——这会花费约 10 分钟，应该放在定期作业中执行；清单会记录每项最后一次测量的时间。
