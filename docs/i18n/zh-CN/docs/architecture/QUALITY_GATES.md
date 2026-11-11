# Quality Gates Reference (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

本文档是 OmniRoute 中所有 CI 质量门禁的权威参考。
它描述了每个门禁、门禁所验证的内容、其运行所在的 CI 作业、采用棘轮基线还是通过/失败策略，以及该门禁会阻止构建还是仅提供建议。

有关简要概述和允许列表策略，请参阅 `AGENTS.md` 中的“Quality Gates & Ratchets”部分。有关同一系统的关键评估、成熟度分类和工具无关的复现计划，请参阅
[质量门禁手册](../ops/QUALITY_GATE_PLAYBOOK.md)。

---

## 门库存和执行情况

### 考生录取

CI和 Quality Gates 工作流程各自发出稳定的结论： `Gate / CI`和`Gate / Quality`。他们的版本化准入政策根据需要或建议枚举了每个上游工作。适用的所需作业必须成功：缺失、取消、跳过、待处理和未知结果无法建立PASS。有效的仅文档或仅目录分类可能会使代码通道不适用；普通草案PR不是被接受的候选者。 `hotfix`标签并不放弃证据。

两个工作流程都涵盖PRs到main/release分支、推送到`main`、手动调度和合并组事件。推送、调度和合并组运行完整选择。受信任的 Mergify 队列草稿还运行适用的`full-code`/`full-code-e2e`作业；普通PRs跳过它们。在手动合并之前，对确切的候选者运行完整调度。推送到`release/**`不会启动这些工作流程； Release-Green 单独观察合并基地（`docs/ops/RUNNER_BOX.md` →托管通道）。分叉和合并组使用托管运行器来执行作业，否则会选择自托管运行器；在推出之前必须验证足够的托管容量。

普通的PR运行快速选择。准入策略的`full-code`和`full-code-e2e`通道（E2E、集成、包工件、 Electron烟雾、 Bun SQLite、生态系统和协议客户端）仅在 Mergify 队列草稿或完整运行上运行： `gh workflow run ci.yml --ref <branch>`。

每张JSON收据都标识已签出的SHA、工作流程运行和尝试。 CLI拒绝checkout/event SHA不匹配。工作流测试将策略成员资格绑定到判定作业的`needs`列表，因此新的或删除的通道不会悄无声息地消失。这些收据涵盖了它们自己的工作流程，而不是发布、部署或现有咨询扫描仪的内部结构。进行分支机构规则中要求的适用检查是一项单独的管理变更；定义他们的工作本身并不能保护分支机构。

`API Route Typecheck`是一种独立的工作流程检查，位于聚合判决和本地完整观察者的静态配置文件之外。单独检查其结果以查找确切的候选者。 `.github/workflows/api-route-typecheck.yml`在PRs上运行到`main`或`release/**`中，推送到任一分支系列、手动调度和`checks_requested`类型的`merge_group`事件。它没有路径过滤器。合并组查看`merge_group.head_sha`；其他事件查看`github.sha`。所有事件都使用相同的API诊断门和门单元测试。 PR基地重定向请求新的检查； body/title编辑使用仅观察名称`Admission not requested / API Route Typecheck` ，并且不能替代准入检查。

### 在接受减速器中保留证据

`scripts/quality/validate-release-acceptance.mjs`减少提供的计划及其清单；它没有确定该计划涵盖完整的发布渠道。其报告明确规定了`releaseAcceptance: false`，即使该计划是`VERIFIED`。 `release-acceptance.yml`工作流程仍然使用影子装置，而不是真正的构建、打包、启动或促销收据。

CLI要求`--evidence-root`验证保留的证据。文件解析为`<evidence-root>/<artifact_id>/<member>`并散列为SHA-256。没有证据的PASS记录、丢失或更改的文件、不安全的路径或符号链接会阻止验证。丢失的文件并不等同于空的成功日志。现有的SHA/run/attempt检查保持独立：匹配的字节无法挽救陈旧的收据。文件完整性并不是执行真实性或工件升级的证明。

### DAST使用经过验证的CI构建

所需的`dast-smoke` CI作业在`build`之后调用`.github/workflows/dast-smoke.yml` 。它遵循与构建相同的code/draft选择，包括支持的分叉PRs、发布目标PRs和合并组。丢失、失败、取消或意外跳过的DAST作业会阻止`Gate / CI`。可复用的工作流程没有独立的PR/dispatch触发器；手动验证使用CI的调度，因此构建和消费者保持在一次运行中。

`scripts/ci/next-build-provenance.mjs`使用其 tar 摘要、 repository/event/run、生产者尝试、 head/base/checkout/tree、工作流身份、锁定文件、精确节点version/ABI、平台和捆绑器来密封完整的 Next 工件。 DAST从`needs.build.outputs`选择不可变的工件ID ，需要下载摘要验证，并在通过`scripts/ci/unpack-ci-build.py`提取其两个允许列表成员之前，根据生产者摘要独立地对ZIP进行哈希处理。在提取 Next 树之前，清单和 tar 存档还必须与独立生产者输出匹配。它从不搜索最新的成功分支构建。当ID和所有输入仍然匹配时，部分重新运行可以重用相同的生产者尝试；收据记录了两次尝试。

消费者停留在托管的Linux运行器上，具有只读存储库权限，并且没有存储库机密。它安装生产者的确切 Node 版本，然后将CLI与`OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`组装在一起。 `scripts/build/standaloneInput.mjs`在任何回退构建之前拒绝丢失的独立服务器；正常的本地CLI构建保留其现有的后备。服务器准备就绪、Schemathesis 和 Promptfoo 必须在未更改的 25 分钟作业限制内全部成功。出处收据证明输入身份和字节，而不是成功的DAST扫描。工件过期、运行中断或扫描仪故障仍然不完整或失败的证据；它不能通过咨询包装器变成PASS 。

### UI执行能力

CI将完整的UI库存作为四个`test-vitest`矩阵分片运行，每个分片最多有两名工作人员，并且现有的 15 分钟作业截止时间。第一个分片还运行MCP/autoCombo Vitest套件。所需的工作结果涵盖每个矩阵分支；一个分片的失败或取消不能确定候选人的准入。

夜间观察者为每个UI分片保留一个单独的精确候选收据，包括第一个收据中的MCP执行。需要所有四个收据、日志和匹配的执行身份。当地`npm run test:vitest:ui`仍选择整套；一次`--shard`运行只是部分证据。

### 单位覆盖范围收集

12 个单元分片在现有测试执行期间收集 V8 覆盖率。成功的分片运行`scripts/ci/compact-v8-coverage.mjs`来压缩原始文件，而不生成中间的伊斯坦布尔报告。最终的覆盖作业根据候选SHA、运行时、源根和数据哈希验证所有 12 个清单，然后运行 c8 的报告器和现有覆盖阈值。输入保留 c8 的全局文件名顺序；每个分片的预合并对于混合function/block覆盖来说是不安全的。丢失、格式错误或不兼容的分片将无法准入。失败的测试分片单独保留原始诊断覆盖率；它无法进入最终合并。

### 单位执行进度收据

共享`test:unit:ci:shard`命令通过`scripts/ci/unit-progress-reporter.mjs`记录`primary`、 `dashboard`和`serial`阶段。正常的测试报告仍然可用。单独的仅元数据收据记录每个文件的开始和完成，30 秒的检测信号列出仍处于活动状态的文件及其已用时间。它仅记录列入许可名单的执行元数据；测试描述、输出、错误主体和完整环境未序列化。

CI将JSONL文件保留为`unit-progress-ci-<run>-<attempt>-<shard>`。作业超时可以阻止稍后的上传；已经发出的心跳仍然是诊断证据。丢失心跳还可以反映运行程序进程被阻止或终止。这些收据保留了现有的测试选择、并发性、截止日期和退出状态；它们不是候选人录取判决。

### 合并队列

`queue`标签将PR发送到合并队列 (`.mergify.yml`)。 Mergify 在`mergify/merge-queue/`分支上打开草稿PR ， CI在那里运行完整选择，并且当`Gate / CI`、 `Gate / Quality`和`Merge integrity (changelog + generated skills)`通过时原始PR合并。

Mergify 将其队列摘要写入草稿的描述中。 Body/title-only `pull_request` `edited`事件使用特定于运行的并发组，并且不会重新运行分类、测试矩阵、合并完整性或准入判决。仅观察检查名称不能替换`Gate / CI`或`Gate / Quality`。更改目标库的编辑需要新的候选验证。

出队后，推送并不总是将PR重新排队。评论`@mergifyio queue`吧。

### 静态扫描库存

版本化的 npm-alias 库存和静态扫描成员资格位于`config/quality/gate-manifest.json`中。运行`npm run check:gate-manifest`以根据`package.json`验证脚本名称和确切命令；添加、删除和命令漂移都会使本地挂钩和CI中的更改分类作业失败。别名不是工作流作业、矩阵实例或测试用例：这些计数不得以可互换的形式呈现。

使用`npm run quality:scan -- --list`或`npm run quality:scan:fast -- --list`检查选定的别名而不执行它们。运行程序调用 npm 入口点，因此其运行时（包括配置的Bun ）被保留。清单将这些配置文件之外的别名记录为单独调用的，并且在只读扫描配置文件中禁止维护命令。

这些配置文件仅涵盖静态扫描。他们不证明产品测试、覆盖范围、包装、外部检查或候选者的完全发布验收。工作流准入使用链接的`config/quality/admission-policy.json`和`scripts/quality/admission-verdict.mjs`。发布观察者资料保持独立；独立检查其适用的支票和收据。完整观察者的静态命令在`config/quality/release-green-static-profile.json`中声明，包括`audit:deps`、突变测试选择和翻译检查。加载程序根据package.json和建模的CI/Quality声明验证 npm 命令；它拒绝漂移，而不是将 shell 标记作为参数执行。所需的扫描仪SKIP/INCOMPLETE输出无法建立PASS。该配置文件记录其外部排除，并且不会替换托管覆盖范围、测试矩阵、包或部署证据。下面的散文清单仅供参考，并不是门实际运行的证据。

脚本位于`scripts/check/` （策略门）和`scripts/quality/` （棘轮引擎）下。 CI的事实来源是`.github/workflows/ci.yml`。

### 已发布的文档健康状况

`.github/workflows/i18n-base-health.yml`在选定推送到`main`和`release/v*`以及手动调度后观察文档运行状况。它的过滤器涵盖文档、根 Markdown、 `llm.txt`、翻译state/configuration和相关的 i18n 工具。单个`Published base documentation health`作业使用托管 Ubuntu 和五分钟的截止日期。它执行只读验证并写入诊断收据，无需依赖安装、转换或状态采用。

`scripts/i18n/check-base-health.mjs`要求零源哈希、缺失目标、目标哈希、陈旧翻译和部分缓存不一致。它还验证了当前的核心document/locale范围及其记录的来源。无效的上下文、不完整的覆盖范围或中断的检查器会产生`INCOMPLETE`；确认漂移产生`FAIL`。两者都返回失败的退出状态。收据绑定到结帐SHA、工作流程、运行和尝试，并保留为`i18n-base-health-<sha>-<run>-<attempt>`。

这是对已发表的基础的独立观察。它不添加PR或合并组事件、所需的PR检查、npm 别名或静态扫描配置文件成员。底层检查器还会以绝对模式阻止所有五个类。普通PR准备与入院保持分开。成功上传无法将失败的健康结果转为PASS。

普通的PR使用`--preflight`和`--baseline-evidence`生成的基础报告。仅当完整翻译记录和实际目标字节相对于该确切基数没有变化时，它才可能使英语源处于待处理状态。新的目标或部分缓存不一致仍然会阻塞，并且不完整的证据无法授权准备。该报告分别公开了`preparationPending`和`mergeReady` ：成功的准备并不能使待处理的翻译做好合并的准备。在入场前刷新组合候选中受影响的镜像。受信任的 Mergify 队列候选者、 `merge_group`、分支推送和手动CI运行使用绝对检查器，没有`--warn`或继承故障宽恕。丢失目标哈希值和因删除记录的核心文件而缩小的范围无法产生成功的绝对判决。

### 发布PR快速路径（`quality.yml`）

`.github/workflows/quality.yml`在main/release PRs上补充CI ，推送到`main`，调度和合并组。 PRs使用路径过滤快速检查。永久禁用的重复构建已被删除；真正的build/package/boot检查保留在CI中。单元套件和 vitest 仅在CI （`Unit Tests (N/12)`和`Vitest`）中运行。

| 工作                                             | 范围                                                                                                    | 阻塞           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API文档参考和全部文档                                                                    | 是的           |
| `Fast Quality Gates`                             | 代码PRs；静态检查、类型检查、仪表板类型检查、受影响的单元测试                                           | 是的           |
| `Forgotten sibling tests`                        | 代码PRs；更改的模块可追溯到静态消费者和候选兄弟测试；桶和动态导入路径被报告为咨询诊断，并引用白名单例外 | **咨询**       |
| `No new ESLint warnings`                         | 代码PRs；抑制感知的棉绒防护                                                                             | 是的，包括叉子 |
| `Merge integrity (changelog + generated skills)` | 非草稿PRs；变更日志和生成的技能同步                                                                     | 是的，包括叉子 |

#### 忘记兄弟姐妹测试报告

`npm run check:forgotten-sibling-tests`作为`Fast Quality Gates`的咨询步骤运行，并重用测试影响图背后的导入解析器。对于每个更改的生产模块，当拉取请求差异中缺少候选测试时，它会报告确定性`changed module/symbol -> static consumer -> candidate sibling test`链。 Markdown 摘要和JSON结果将保留为`forgotten-sibling-tests`工作流程工件，以便在任何阻止推出之前进行校准。

桶再导出和动态导入仅用于分辨率诊断；他们绝不会造成阻碍性的发现。在`config/quality/forgotten-sibling-allowlist.json`中实时查看异常情况。每个条目必须命名消费者和候选测试，给出具体的理由，并链接GitHub问题或拉取请求。格式错误的条目无法关闭。异常不能抑制已删除的候选测试或添加`.skip`/`.todo`的差异；断言弱化和其他屏蔽仍然由独立阻塞的`check:test-masking`门拥有。

### 职位： `lint`

在每个PR到`main`上运行。失败时块合并。

| 脚本（`npm run ...`）             | 验证                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 阻塞                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `check:node-runtime`              | Node.js版本在支持范围内                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是的                                  |
| `check:cycles`                    | 跨所有`src/` + `open-sse/`循环导入（基于 AST，已解决 tsconfig `paths` ）。只要存在任何循环（自#15281以来失败关闭），Bare 就会退出 1 并列出SCCs。 `check:cycles:ratchet` （ CI运行的）当计数超过`quality-baseline.json` —中的`metrics.cycles`上限时阻塞，当前为14， `direction: down`，因此它只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                       | 是（棘轮）                            |
| `check:boundary`                  | `open-sse → src`耦合：从引擎到应用程序的独特文件到文件导入（`scripts/quality/measure-boundary.mjs`；边缘列表是 v4 core/module-split修复待办事项）。裸=咨询报告（与`quality:boundary`相同）。当计数超过`quality-baseline.json` —中的`metrics.boundaryOpenSseToSrc`上限（以测量的 771、 `direction: down`种子）时， `check:boundary:ratchet` （ CI运行的内容，也在`quality.yml`快速门棘轮循环中）会阻塞； `--update`只是降低了它； PRs上的相对基数（`--base-ref`，见下文）                                                                                                                                                                                                       | 是（棘轮）                            |
| `check:route-validation:t06`      | 所有路由上都存在Zod架构（第 6 层策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                  |
| `check:any-budget:t11`            | `@ts-expect-error // any`数量不超过预算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                  |
| `check:provider-consistency`      | `providers.ts`中的每个提供者在`providerRegistry.ts`中都有一个匹配的条目（反之亦然，在允许列表中）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                  |
| `check:model-lifecycle`           | 三个手动维护的路由表与签入的生命周期快照（#11503）保持一致： `FITNESS_TABLE` （`taskFitness.ts`）没有获得`REGISTRY`可以路由的退休ID；每个`BUILT_IN_ALIASES`目标都存在于`REGISTRY`中，并且不存在于退休 ID 快照中； `REGISTRY`中的每个已退休 ID 都会转发或列在`allowedRetiredInCatalog`中；并且该快照中没有出现已停用的`DEFAULT_DEGRADATION_MAP`源或目标。这并不能证明模型当前由实时上游提供服务。离线—与`config/quality/model-lifecycle.json`进行比较，用`npm run quality:refresh-model-lifecycle`手动刷新（网络；未连接到CI）。 `allowedRetiredInCatalog`是一个燃尽棘轮：仅添加具有跟踪问题的条目。                                                                            | 是的                                  |
| `check:fetch-targets`             | 客户端`src/`中的每个`fetch("/api/...")`都会解析为真正的`route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                  |
| `check:deps`                      | 仓库中每个`package.json`的所有`npm install` -able依赖项都在`dependency-allowlist.json`中；新的未固定或已标记的包裹                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是的                                  |
| `audit:deps`                      | 对所有五个独立锁定文件（根、 Electron、 OpenCode插件v1/v2和提供程序）进行 npm 审核。关键建议块；高度警告仍然是明显的警告。 Missing/failed审计是INCOMPLETE和区块；保留每个范围的锁哈希值和报告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                  |
| `check:lockfile`                  | `package-lock.json`完整性— https 注册表、完整性哈希、无主机覆盖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                  |
| `check:licenses`                  | 生产依赖项的SPDX许可证许可名单                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                  |
| `check:tracked-artifacts`         | 没有构建工件/提交的`node_modules`符号链接（也在 husky 预提交中运行；预推送有意为轻— #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                  |
| `check:ai-attribution`            | PR提交中没有AI/bot `Co-Authored-By`预告片或 AI 生成页脚、标题或正文—硬规则#16 （在PR→ `release/**` —的`quality.yml`快速门循环中读取事件负载、 PRs —无操作和PR→ `main`的`ci.yml` lint 中的仅 PR 步骤；还有哈士奇`commit-msg`钩子；允许人类合著者； #14436）                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | 每个Vitest排除都会命名一个跟踪问题并出现在`config/quality/vitest-exclusions.json` (#13204) 中                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                  |
| `check:file-size`                 | 源文件（ `src/`、 `open-sse/`、 `electron/`、 `bin/`中的`.ts`/`.tsx` ）位于`cap`内，测试文件（`*.test.ts(x)`）位于`testCap`内；冻结在`file-size-baseline.json` (`frozen` / `testFrozen`) 中的文件不得超过其记录的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是的                                  |
| `check:error-helper`              | executors/handlers中的错误响应使用`buildErrorBody()` / `sanitizeErrorMessage()` （硬规则#12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                  |
| `check:migration-numbering`       | 迁移SQL文件按顺序编号，无间隙或重复                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是的                                  |
| `check:public-creds`              | `publicCreds.ts`之外没有文字OAuth `client_id`/`client_secret`或 Firebase Web 密钥（硬规则#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                  |
| `check:db-rules`                  | `src/lib/db/`模块之外没有原始SQL ；没有从`localDb.ts`进口桶（硬规则#2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                  |
| `check:known-symbols`             | 在其调度表中注册的提供程序执行程序、路由策略和转换器与磁盘上的文件—匹配，没有孤立或未声明的符号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                  |
| `check:route-guard-membership`    | 每条生成子进程的路由均按`isLocalOnlyPath()`分类（硬规则#15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                  |
| `check:test-discovery`            | 存储库中的每个`*.test.ts` / `*.spec.ts`文件都由至少一个测试运行程序收集（棘轮： `test-discovery-baseline.json`中的孤儿列表只能缩小）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是的                                  |
| `check:test-tla-order`            | `tests/unit`下没有`node:test`文件注册一个测试，命中一个顶级`await`，然后注册更多（#18045；棘轮： `test-tla-order-allowlist.json`只能收缩）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                  |
| `check:agent-skills-sync`         | 生成的代理技能工件与其源目录相匹配（无偏差）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | 提供者logos/assets带有记录的出处条目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON配置文件解析并满足 repo lint 规则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScript编译没有错误（仅限建议警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                  |
| `typecheck:noimplicit:core`       | 严格`noImplicitAny` —前瞻；许多预先存在的调用站点仍然需要注释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **咨询**（`continue-on-error: true`） |
| `check:dashboard-typecheck`       | `tsc`范围为`src/app/(dashboard)/**` (#7033) — `typecheck:core`策划的 27 个文件允许列表不包括任何仪表板TSX，并且`next build`也从不对其进行类型检查（`next.config.mjs`设置`ignoreBuildErrors: true`），因此那里的孤立标识符回归（#6625/#6909）对于CI是不可见的。与冻结的per-file/per-TS-code计数基线（`config/quality/dashboard-typecheck-baseline.json`，与`check:known-symbols`相同的陈旧执行模式）相比， —只有超出基线计数的NEW错误才会通过门；当预先存在的错误被修复时，使用`--update`逐步降低。                                                                                                                                                                             | 是的                                  |
| `check:build-typecheck`           | 对`tsconfig.build.json` （`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`）进行全应用生产类型检查，表面`typecheck:core`的27文件白名单和仪表板门不覆盖。与`config/quality/build-typecheck-baseline.json`不同；新的或增加的每个（文件、代码）计数失败，较低的计数要求您进行棘轮调整。当运行包含新的或加注的对时， `--update`会拒绝，除非`--force-regressions`通过，并且拒绝新的静默文件，除非`--force-nocheck`通过，因此加宽基线以获得绿色和授予永久静默是两个单独的故意行为。裸露的`--force`会被拒绝。还根据`config/quality/ts-nocheck-baseline.json`扫描`@ts-nocheck`的构建范围，因为使用它的文件根本不报告任何诊断信息，否则对每个门都是不可见的。 | 是的                                  |

#### 两个类型检查程序的答案不同

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) 和`check:build-typecheck`在不同的选项下编译不同的程序，同一个文件可以在一个中是干净的，在另一个中充满错误。

`tsconfig.build.json`设置`"strict": false`，因此`noImplicitAny`关闭。核心配置使用更严格的选项编译一个包含 27 个文件的允许列表，并遵循每个条目的导入图，因此从未出现在构建程序中的文件仍会在那里进行检查。

在判断文件是否被输入时，结果很重要：**`check:build-typecheck`下的零诊断并不意味着零**。从 26 个文件中剥离`@ts-nocheck`显示其中 23 个文件在构建程序中是干净的；其中 16 个出现了大约 120 个隐含的严格错误。在调用文件清理之前检查两者。

### 职位： `quality-gate`

在`test-coverage`之后运行。失败时块合并。

| 脚本                         | 验证                                                                                                              | 阻塞           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------- |
| `quality:collect`            | 发出`quality-metrics.json` （ESLint警告计数、合并分片报告的覆盖范围）                                             | 是（棘轮上游） |
| `quality:ratchet`            | `quality-baseline.json`中的每个指标都没有回归（ESLint警告≤基线；覆盖≥基线）                                       | 是的           |
| `check:duplication`          | 代码重复 (jscpd@4) 不超过`quality-baseline.json`中的基线                                                          | 是的           |
| `check:complexity`           | 文件级圈复杂度不超过上限（核心ESLint `complexity` + `max-lines-per-function`）                                    | 是的           |
| `check:cognitive-complexity` | 认知复杂度棘轮（`eslint-plugin-sonarjs`） —单独ESLint通过； CI将两者合并为单个`check:complexity-ratchets`步骤运行 | 是的           |
| `check:dead-code`            | 未使用的导出/文件棘轮（刀）与基线相比不会回归                                                                     | 是的           |
| `check:compression-budget`   | 压缩基准预算—每引擎代币节省下限不得回归                                                                           | 是的           |
| `check:type-coverage`        | 百分比式棘轮（`type-coverage`）不回归；很大程度上包含`typecheck:noimplicit:core`                                  | 是的           |

### 工作： `codeql-scan`和`codeql-admission`

`codeql-scan`生成所有配置的分析类别。该作业成功后， `codeql-admission`验证其确切上传和候选警报棘轮。两者都是`Gate / CI`必需的依赖项，包括仅文档候选者。管理激活和金丝雀要求在下面的“CodeQL棘轮”中描述。

| 脚本                   | 验证                                                                                                             | 阻塞 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | ---- |
| `check:codeql-ratchet` | 候选ref/SHA和所有配置的分析类别在警报棘轮之前必须是最新的；缺少证据块。全球库存保持独立—请参阅下面的“CodeQL棘轮” | 是的 |

### 职位： `quality-extended`

该职位会阻止适用的候选人。使用所需的棘轮检查捆绑包大小、秘密发现、漏洞发现、工作流程发现和OpenAPI更改。循环依赖诊断仍然是建议性的。需要安装扫描仪： `scripts/ci/install-quality-scanners.sh`提供固定版本并传播安装失败。缺少工具、无效报告或缺少基线会离开所需的扫描仪门INCOMPLETE。

| 脚本                     | 验证                                                                                                                                                  | 阻塞                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:circular-deps`    | 无循环依赖性 (dpdm)                                                                                                                                   | **咨询**                          |
| `check:bundle-size`      | 捆扎尺寸不超过上限；不可用的测量失败                                                                                                                  | **使用--ratchet进行阻止**         |
| `check:secrets`          | Gitleaks 的发现不会回归；所需的扫描拒绝丢失的tools/source/baseline、失败的扫描和无效的报告                                                            | **使用--ratchet进行阻止**         |
| `check:vuln-ratchet`     | 依赖漏洞不会回归；所需的扫描拒绝丢失的工具、无效的报告或丢失的基线                                                                                    | **使用--ratchet进行阻止**         |
| `check:workflows`        | 工作流程 lint (actionlint + zizmor)； missing/broken扫描仪、无效报告或缺少棘轮基线会因INCOMPLETE失败。有效的结果遵循所选的strict/advisory/ratchet政策 | 需要执行； CI中的 zizmor 棘轮阻塞 |
| `check:openapi-breaking` | 针对固定事件提交的公共API合约（PR合并基础、推送之前、合并组基础； scheduled/manual检查第一个父级）；所需测量失败关闭                                  | **使用--ratchet进行阻止**         |

### 职位： `docs-sync-strict`

对于`main`或`release/**`的拉取请求，此作业仅针对分类为文档或代码更改的非草稿（或受信任队列）候选者运行。它还在非 PR CI活动中运行；此工作流程的推送触发器仅涵盖`main` ，而不涵盖`release/**`。退出非零的步骤会阻塞作业；以下仅报告的调查结果和记录的豁免则不然。

| 脚本                           | 验证                                                                                                                                                                                                                                             | 阻塞                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `check:docs-all`               | 依次运行下面 7 个子门的元门                                                                                                                                                                                                                      | 是的                                                                                       |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG版本一致性、精确的`llm.txt`镜像、翻译的CHANGELOG section/size不变量以及不存在被取代的重复文档                                                                                                                           | 是的                                                                                       |
| ↳ `check:docs-frontmatter`     | 编译的文档页面带有有效的前题标题                                                                                                                                                                                                                 | 是的                                                                                       |
| ↳ `check:docs-counts`          | 高置信度计数不变量是严格的；启发式文件计数检查仅发出警告，除非脚本收到`--strict` （ CI元门不会通过它）                                                                                                                                           | 严格的层级封锁；软层咨询                                                                   |
| ↳ `check:env-doc-sync`         | 源 env 读取、 `.env.example`和`docs/reference/ENVIRONMENT.md`在显式忽略、仅文档和仅环境白名单后达成一致                                                                                                                                          | 是的，在记录的许可名单之外                                                                 |
| ↳ `check:deprecated-versions`  | 报告安全历史上下文之外的潜在过时版本和过时更新日期，不包括忽略的文档                                                                                                                                                                             | 当前CI接线中的咨询（`--strict`未通过）                                                     |
| ↳ `check:doc-links`            | 文档中的内部降价链接解析为真实文件（`[text]`/`(path)`形式）                                                                                                                                                                                      | 是的                                                                                       |
| ↳ `check:fabricated-docs`      | 文档中引用的路由、环境变量、 CLI命令、挂钩名称和文件路径存在于代码库中。通过`--strict`硬门；没有标志的软故障。                                                                                                                                   | 是（通过CI中的`--strict` ）                                                                |
| `check:cli-i18n`               | 使用的CLI `t()`密钥存在于`en`中； `pt-BR`保留每个顶级部分； `zh-CN`和`zh-TW`包含`en`中的每个密钥                                                                                                                                                 | 是的                                                                                       |
| `check:openapi-coverage`       | OpenAPI规范至少涵盖真实路线的棘轮地板                                                                                                                                                                                                            | 是的                                                                                       |
| `check:openapi-security-tiers` | 声明的`x-loopback-only`/`x-always-protected`注释必须得到`routeGuard.ts`的支持；解析器和转发不匹配块。对仅本地前缀下丢失的`x-loopback-only`进行反向检查会发出警告，并且仅模式路由将从该反向传递中排除。                                           | Parser/forward检查阻塞；反向检查咨询                                                       |
| `check:openapi-routes`         | `openapi.yaml`中的每个`/api...`路径在合理的`KNOWN_STALE_SPEC`白名单之后，不敏感地解析为真实路由；过时的白名单条目也会失败                                                                                                                        | 是的                                                                                       |
| `check:docs-symbols`           | 规范非镜像文档中的内部`/api/...` URL引用解析为真实路由或路由族； proxy/upstream/placeholder/file引用和合理的`KNOWN_STALE_DOC_REFS`条目被排除，过时的允许列表条目失败                                                                             | 是的                                                                                       |
| `i18n translation drift`       | 绝对准入要求零源、缺失目标、目标哈希、过时翻译和部分缓存不一致。普通的PR准备可能会保留精确的继承证据或仅英语的未决更改，且完整状态和目标字节未更改；其报告单独宣布合并准备就绪。缺少目标哈希值和不完整的基础证据块。遗留节缓存不存在并不是故障。 | 所有五个班级均阻止queue/base录取；普通准备工作只允许经过证明的继承工作或仅限英语的待定工作 |

生成`docs/diagrams/`下的12个README SVGs （`scripts/docs/gen-readme-<name>.mjs`； `npm run docs:readme-diagrams`重新生成全部）。每个都有一个字节比较单元测试（`tests/unit/docs/readme-*-svg.test.ts`，作业`test-unit`），当提交的文件过时时会失败，并且`check:docs-counts`从其`<text>`节点—读取规范数字，这就是大纲步骤将文件中的每个大纲字符串保持为不可见的`<text>`的原因。 SVG规范数字检查读取`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) 中列出的文件： `docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`，以及`public/images/tier-flow-dark.svg`和`tier-flow-light.svg`；永久免费、目录条目、循环池和评分因素声明也为`promise-pillars.svg`、 `free-tier-budget.svg`和`strategies-grid.svg`。 `free-tier-budget.svg`从实时目录加载器中绘制其图形，因此对`FREE_MODEL_BUDGETS`或提供者显示名称的更改会使CI变红，直到重新生成该文件。

### 职位： `i18n-ui-coverage`

| 脚本                              | 验证                                                                                                                                  | 阻塞     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` （内联） | UI i18n 密钥覆盖率为≥ 65%                                                                                                             | 是的     |
| `check-ui-value-drift` （内联）   | 重写的英语**价值**不留下过时的翻译                                                                                                    | 是的     |
| `check-new-key-coverage` （内联） | 一个**新的**英文密钥在每个语言环境中都被翻译— `__MISSING__:`标记被拒绝                                                                | 是的     |
| `check-translation-ratio`         | 每个语言环境的实际翻译比例（与英语相同/占位符/允许列表之外的缺失部分）不得超过`config/quality/i18n-translation-baseline.json` + slack | **阻塞** |

需要`fetch-depth: 0` —值漂移门将`en.json`与合并基础进行比较。

#### `check-ui-value-drift` —过时翻译门

捕获其他门在结构上看不到的国际化回归：英语值被重写，并且从_先前_英语派生的翻译保留下来，因此非英语用户继续阅读措辞自信、现在错误的副本。

这是真的发货了。 `oauthModal.googleOAuthWarning`在Antigravity登录助手落地时进行了重写（#5203）；**43 个语言环境中的 39 个**保留文本告诉操作员“复制完整的URL并将其粘贴到下面” —是该提供者无法完成的流程。在#8463之前，它没有引起人们的注意，因为：

- `sync-ui-keys`仅回填以下密钥**缺席的**，从来没有那些**陈旧**;
- `check-ui-keys-coverage`计算关键_存在_，因此过时的翻译分数被覆盖；
- `check-translation-drift`跟踪`docs/i18n/<locale>/**.md`文档镜像—它从不读取`src/i18n/messages/*.json`。自 2026-09 重新同步以来，作业`docs-sync-strict`被阻止：编辑核心文档→ `npm run i18n:run -- --files=<doc>` （部分级别，便宜）。

**差异感知，不支持基线。**它将合并基础上的`en.json`与工作树进行比较；对于每个英文值发生变化的键，任何仍保留未更改翻译的语言环境都是陈旧的。这是故意的**冻结先前存在的债务**— a diff 无法揭示长期翻译来自哪个古英语，因此门仅判断当前更改涉及的内容。替代方案（每个密钥哈希基线）将花费~ 600 KB生成的文件，3 ×最大的现有基线，在每个 i18n PR上搅动。

满足它的方法有两种：

1. 更新受影响的翻译，或
2. 将它们设置为`__MISSING__:<new english>` —运行时然后提供校正后的英语（`src/i18n/request.ts::deepMergeFallback`、 #7258）和用于翻译的密钥队列。

如果字符串的**意义**改变了，更喜欢**重命名密钥**：新密钥无法继承过时的翻译。这就是#8463使用的模式。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

价值漂移和新密钥门与`scripts/i18n/resolve-ui-diff-base.mjs`有一个不可改变的比较。工作流程将相同的基础、基础尖端和候选SHAs传递给这两项检查。 PR/base-retarget、push 和 merge-group 运行使用它们的事件上下文。调度候选分支需要其精确的开放PR或显式`i18n_base_sha`输入。没有该输入的`main`或`release/vX.Y.Z`的调度或计划观察会将最后一次提交与其第一个父级进行比较；它不是对所有继承的翻译债务的审计。本地调用需要显式比较基，例如上面的`BASE_REF`命令。

缺少或不明确的比较上下文、不可读或无效的所需目录以及更改的候选会产生带有退出代码`INCOMPLETE`**2** ，包括在警告模式下。目录读取使用`scripts/i18n/read-ui-catalog.mjs`；读取失败不会被空对象替换。不可用的基础或不完整的输入都无法建立PASS。

### 职位： `i18n`

完整的 i18n 验证矩阵（每个区域一项作业）。整个工作都是咨询性的。

| 脚本                            | 验证                     | 阻塞                                          |
| ------------------------------- | ------------------------ | --------------------------------------------- |
| `validate_translation.py quick` | 每个语言环境的翻译完整性 | **咨询**（`continue-on-error: true`整个工作） |

### 职位： `pr-test-policy`

仅在拉取请求上运行。

| 脚本                   | 验证                                                                                          | 阻塞 |
| ---------------------- | --------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | 更改`src/`、 `open-sse/`、 `electron/`或`bin/`中的生产代码的PRs必须包含或更新测试（硬规则#8） | 是的 |
| `check:test-masking`   | 更改的测试文件不会减少净断言计数或添加`assert.ok(true)`同义反复                               | 是的 |
| `check:pr-evidence`    | PR机构引用了test/VPS变更证据（通过 grep PR散文—脆弱性来机械化硬规则#18 ，请参阅 Backlog）     | 是的 |

### 职位： `test-vitest`

需要`changes`分类作业。适用的矩阵分片在失败时会阻止合并。

| 套房             | 验证                                                     | 阻塞                                                                        |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `test:vitest`    | MCP服务器（110 个工具）、 autoCombo、缓存— vitest runner | 是的                                                                        |
| `test:vitest:ui` | UI组件测试— vitest runner                                | **阻塞**—预先存在的故障在`vitest.config.ts`中被明确排除；新的失败使工作失败 |

### 每晚工作流程（预定、建议）

它们按照 cron 计划（和`workflow_dispatch`）运行，而不是在PRs上运行。一切都是咨询性的。

| 工作流程               | 验证                                                                                                              | 阻塞     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | 使用随机种子+高运行次数进行快速检查属性测试                                                                       | **咨询** |
| `nightly-resilience`   | 堆增长门、混沌故障注入、k6 load/soak                                                                              | **咨询** |
| `nightly-llm-security` | Promptfoo 注入防护（块模式） + garak 探针（在没有提供者机密的情况下跳过）                                         | **咨询** |
| `nightly-schemathesis` | 使用`docs/openapi.yaml` —对实时OmniRoute进行OpenAPI合约模糊测试（架构），表面违反规范/未处理 500 秒（Fase 8 B.4） | **咨询** |
| `nightly-mutation`     | Stryker 突变测试分数超过快速单位通道—幸存突变体表面弱断言                                                         | **咨询** |
| `nightly-compat`       | 支持的`engines.node`范围内的节点引擎兼容性矩阵                                                                    | **咨询** |

性能基线（堆、 TTFB、构建时间）被记录，而不是门控：请参阅[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)。

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

### CodeQL棘轮：候选人准入和存储库清单

CI通过显式依赖链拥有候选CodeQL准入： `codeql-scan`调用`codeql.yml`中的四语言矩阵，然后`codeql-admission`运行`node scripts/check/check-codeql-ratchet.mjs --candidate`。 `Gate / CI`需要两个结果。质量保留自己的数字检查，但在生产者完成之前不会询问扫描仪；仅`Gate / Quality`并不能完成候选人录取。对于仅提供文档的候选人， CodeQL仍然是必需的。

`config/quality/codeql-admission-policy.json`中的策略选择 Actions、 C/C++、 JavaScript/TypeScript和 Python、查询套件默认值、远程威胁模型和构建模式 none。生产者预检拒绝挂起的激活记录并在显式目标列表之外进行分支。目前的目标是main， release/v3.8.54.合约测试将这个有限列表和维护推送触发器与包版本进行比较；下一个版本需要审核入职。 CI现有的更广泛发布的PR触发器被保留，但未登录的目标在提取之前报告HOLD而不是获取未测量的PASS。

每个矩阵作业记录其实际的SARIF上传ID、语言、类别、运行和尝试、调用者工作流身份、事件ref/head/base/merge SHA和策略哈希。相关作业仅下载本次运行的收据并验证工件摘要。它需要所有四个类别、一个成功的制作者并完成每个精确上传的处理。它使用API的 sarif_id 过滤器，而不是在分支上找到的最新分析。部分重新运行可能会重用同一运行和候选者的早期尝试中的成功类别，从而保留生成尝试；当前失败的生产商无法重复使用以前的绿色证据。

CodeQL操作等待处理，但其固定实现可以在状态读取失败或耗尽等待后发出警告并继续。因此，入场需再次验证处理。缺少类别、待处理、失败或取消的作业、过时的身份、不完整的分页或不可用的APIs产生HOLD并退出 2。独立扫描仪工作流程不存在固定等待。未扫描的PR无法通过，因为警报查询返回 0。高于`metrics.codeqlAlerts.value`测量计数退出 1；不会提高基线来吸收另一个分支的警报。[上传状态和分析查找](https://docs.github.com/en/rest/code-scanning/code-scanning)。

收据记录上传和分析IDs、类别、工具版本、 ref/SHA、基线和警报编号。 SARIF identity/result计数、最小规则计数和精确警报实例仍然是强制性的。在接受之前会重新检查PR/analysis身份。这些检查建立配置的类别覆盖范围，而不是每个提取的源文件的清单。 C/C++无构建提取不包括项目构建期间生成的代码。来源排除仍然需要审查，贡献者归因需要可比较的精确基础证据。

`codeql-maintenance.yml`提供主动发布的推送扫描和每周时间表，而无需重复PR/main生产者。 `nightly-codeql-inventory.yml`将存储库范围的基线保持独立，并在测量不可用时使用`--strict-measurement`和失败。当地遗产收藏家的优雅跳过不是候选人入场。在验证了较低的全球计数后，紧缩仍然是一个明确的`--update` 。

配置默认设置时不得发布高级工作流程： GitHub拒绝该组合。其版本化策略仍处于待定状态，直到回读经过审查的管理过渡。在发布之前，操作员会固定存储库、 head/base/tree、 policy/patch/rollback哈希值和观察到的设置状态； `node scripts/quality/codeql-producer.mjs verify-admin-readback`检查提供的预期和实际JSON记录。这是一个技术防护，而不是操作员批准或获取新读回的替代品。 PR令牌从不请求管理访问权限。推出和任何扫描仪更改都需要单独的回读以及真正的PR、分叉和合并组兼容性证据。

分叉使用托管运行器，无需持久凭据即可签出，生产者中没有项目install/build ，也没有继承的存储库机密。 GitHub支持SARIF上传pull_request事件及其减少的分叉令牌；首次出资执行批准仍然是GitHub政策。切勿使用 pull_request_target 执行不受信任的代码。在考虑迁移完成之前，请确认受控金丝雀中的实际令牌权限、analysis_key 和所有类别环境。[分叉上传规则](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible)，[冲突的设置模式](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows)。

**解雇由操作员决定（硬规则#14）** —绝不会在未在驳回评论中记录技术理由的情况下驳回CodeQL警报： `won't fix`表示上游协议要求， `used in tests`表示测试夹具， `false positive`表示CodeQL无法看到的消毒剂（先例： `docs/security/ERROR_SANITIZATION.md`）。

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

**上文同样未记录的项目**（建议性、信号较弱）：`docs-lint` 作业（markdownlint + Vale，整个作业设置 `continue-on-error`）以及独立扫描器工作流 `semgrep.yml` / `scorecard.yml`。CodeQL 现在在 `Gate / CI` 下包含必需的生产与准入作业，并受上述激活要求约束。`quality-baseline.json` 中有 `semgrepFindings: 0`，但 `ci.yml` 没有将其接入阻塞性棘轮——该指标目前没有对应的执行检查。

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
