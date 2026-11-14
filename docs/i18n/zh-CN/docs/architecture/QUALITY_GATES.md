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

CI和 Quality Gates 工作流程各自发出稳定的结论： `Gate / CI`和`Gate / Quality`。他们的版本化准入政策根据需要或建议枚举了每个上游工作。适用的所需作业必须成功：丢失、取消、跳过、待处理和未知结果无法建立PASS。有效的仅文档或仅目录分类可能会使代码通道不适用； PR草案不是被接受的候选者。 `hotfix`标签并不放弃证据。

两个工作流程都涵盖PRs到main/release分支、推送到`main`、手动调度和合并组事件。推送、调度和合并组运行完整选择。推送到`release/**`不会启动它们（2026-10-18）：每个更改都已经在其PR上运行了矩阵，并且合并的组合是 Release-Green 的工作（`docs/ops/RUNNER_BOX.md` →托管通道）。分叉和合并组使用托管运行器来执行作业，否则会选择自托管运行器；在推出之前必须验证足够的托管容量。

普通的PR运行快速选择。准入策略的`full-code`和`full-code-e2e`通道（E2E、集成、包工件、 Electron Smoke、 Bun SQLite、生态系统和协议客户端）仅在 Mergify 队列草稿或完整运行上运行： `gh workflow run ci.yml --ref <branch>`。

每张JSON收据都标识已签出的SHA、工作流运行和尝试。 CLI拒绝checkout/event SHA不匹配。工作流测试将策略成员资格绑定到判定作业的`needs`列表，因此新的或删除的通道不会悄无声息地消失。这些收据涵盖了它们自己的工作流程，而不是发布、部署或现有咨询扫描仪的内部结构。激活分支规则中的两个检查名称是一项单独的管理更改；添加这些工作本身并不能保护分支机构。

### 合并队列

`queue`标签将PR发送到 Mergify 队列 (`.mergify.yml`)。 Mergify 在`mergify/merge-queue/`分支上打开草稿PR ， CI在那里运行完整选择，并且当`Gate / CI`、 `Gate / Quality`和`Merge integrity (changelog + generated skills)`通过时原始PR合并。

Mergify 将其队列摘要写入草稿的描述中，其他应用程序也可以对其进行编辑。此类草稿上的`pull_request` `edited`事件采用自己的并发组 (`-queue-edit-<run_id>`)，因此它无法取消草稿的实际运行，并且它会跳过门和矩阵。只有`Merge integrity`还在运行。跳过的门作业带有不同的检查名称，因为 Mergify 将跳过的`Gate / CI`读取为失败的检查并使PR出列。

出队后，推送并不总是将PR重新排队。评论`@mergifyio queue`吧。

### 在接受减速器中保留证据

`scripts/quality/validate-release-acceptance.mjs`减少提供的计划及其清单；它没有确定该计划涵盖完整的发布渠道。它的报告明确设置了`releaseAcceptance: false`，即使该计划是`VERIFIED`。 `release-acceptance.yml`工作流程仍然使用影子装置，而不是真正的构建、打包、启动或升级收据。

CLI要求`--evidence-root`验证保留的证据。文件解析为`<evidence-root>/<artifact_id>/<member>`并散列为SHA-256。没有证据的PASS记录、丢失或更改的文件、不安全的路径或符号链接都会阻止验证。丢失的文件并不等同于空的成功日志。现有的SHA/run/attempt检查保持独立：匹配的字节无法挽救陈旧的收据。文件完整性并不是执行真实性或工件升级的证明。

### 静态扫描库存

版本化的 npm-alias 库存和静态扫描成员资格位于`config/quality/gate-manifest.json`中。运行`npm run check:gate-manifest`以验证脚本名称和针对`package.json`的确切命令；添加、删除和命令漂移都会使本地挂钩和CI中的更改分类作业失败。别名不是工作流作业、矩阵实例或测试用例：这些计数不得以可互换的形式呈现。

使用`npm run quality:scan -- --list`或`npm run quality:scan:fast -- --list`检查选定的别名而不执行它们。运行程序调用 npm 入口点，因此其运行时（包括配置的Bun ）被保留。清单将这些配置文件之外的别名记录为单独调用的，并且在只读扫描配置文件中禁止维护命令。

这些配置文件仅涵盖静态扫描。他们不证明产品测试、覆盖范围、包装、外部检查或候选者的完全发布验收。工作流准入使用链接的`config/quality/admission-policy.json`和`scripts/quality/admission-verdict.mjs`。发布观察者档案保持独立；独立检查其适用的支票和收据。完整观察者的静态命令在`config/quality/release-green-static-profile.json`中声明，包括`audit:deps`、突变测试选择和翻译检查。加载程序根据package.json和建模CI/Quality声明验证 npm 命令；它拒绝漂移，而不是将 shell 标记作为参数执行。所需的扫描仪SKIP/INCOMPLETE输出无法建立PASS。该配置文件记录其外部排除，并且不会替换托管覆盖范围、测试矩阵、包或部署证据。下面的散文清单仅供参考，并不是门实际运行的证据。

脚本位于`scripts/check/` （策略门）和`scripts/quality/` （棘轮引擎）下。 CI的事实来源是`.github/workflows/ci.yml`。

### 发布PR快速路径 (`quality.yml`)

`.github/workflows/quality.yml`补充了main/release PRs上的CI ，推送到`main`、调度和合并组。 PRs使用路径过滤的快速检查。永久禁用的重复构建已被删除；真正的build/package/boot检查保留在CI中。单元套件和 vitest 仅在CI （`Unit Tests (N/8)`和`Vitest`）中运行。

| 工作                                             | 范围                                                                                    | 阻塞           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- | -------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API文档参考和文档全部                                                    | 是的           |
| `Fast Quality Gates`                             | 代码PRs；静态检查、类型检查、仪表板类型检查、受影响的单元测试、被遗忘的同级测试（咨询） |
| `No new ESLint warnings`                         | 代码PRs；抑制感知的棉绒防护                                                             | 是的，包括叉子 |
| `Merge integrity (changelog + generated skills)` | 非草稿PRs；变更日志和生成的技能同步                                                     | 是的，包括叉子 |

#### 忘记兄弟姐妹测试报告

`npm run check:forgotten-sibling-tests`作为`Fast Quality Gates`的咨询步骤运行，并重用测试影响图背后的导入解析器。对于每个更改的生产模块，当拉取请求差异中缺少候选测试时，它会报告确定性`changed module/symbol -> static consumer -> candidate sibling test`链。 Markdown 摘要和JSON结果将保留为`forgotten-sibling-tests`工作流程工件，以便在任何阻止推出之前进行校准。

桶再导出和动态导入仅用于分辨率诊断；他们绝不会造成阻碍性的发现。在`config/quality/forgotten-sibling-allowlist.json`中查看异常情况。每个条目必须命名消费者和候选测试，给出具体的理由，并链接GitHub问题或拉取请求。格式错误的条目无法关闭。异常无法抑制已删除的候选测试或添加`.skip`/`.todo`的差异；断言弱化和其他屏蔽仍然由独立阻塞的`check:test-masking`门拥有。

### 职位： `lint`

在每个PR到`main`上运行。失败时块合并。

| 脚本（`npm run ...`）             | 验证                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 阻塞                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:node-runtime`              | Node.js版本在支持范围内                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是的                                |
| `check:cycles`                    | 跨所有`src/` + `open-sse/`的循环导入（基于 AST，tsconfig `paths`已解决）。只要存在任何循环（自#15281以来失败关闭），Bare 就会退出 1 并列出SCCs。 `check:cycles:ratchet` （ CI运行的）当计数超过`quality-baseline.json` —中的`metrics.cycles`上限时阻塞，当前为14， `direction: down`，因此它只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                     | 是（棘轮）                          |
| `check:boundary`                  | `open-sse → src` coupling: unique file-to-file imports from the engine into the app (`scripts/quality/measure-boundary.mjs`; the edge list is the v4 core/module-split remediation backlog). Bare = advisory report (same as `quality:boundary`). `check:boundary:ratchet` (what CI runs, also in the `quality.yml` fast-gates ratchet loop) blocks when the count exceeds the `metrics.boundaryOpenSseToSrc` ceiling in `quality-baseline.json` — seeded at the measured 771, `direction: down`; `--update` only lowers it; base-relative on PRs (`--base-ref`, see below)                                                                                                                  | 是（棘轮）                          |
| `check:route-validation:t06`      | 所有路由上都存在Zod架构（第 6 层策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是的                                |
| `check:any-budget:t11`            | `@ts-expect-error // any`数量不超过预算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是的                                |
| `check:provider-consistency`      | `providers.ts`中的每个提供者在`providerRegistry.ts`中都有一个匹配的条目（反之亦然，在允许列表中）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是的                                |
| `check:model-lifecycle`           | 三个手动维护的路由表与签入的生命周期快照（#11503）保持一致： `FITNESS_TABLE` （`taskFitness.ts`）没有获得`REGISTRY`可以路由的退休ID；每个`BUILT_IN_ALIASES`目标都存在于`REGISTRY`中，但不存在于退休 ID 快照中； `REGISTRY`中的每个已退休 ID 都会转发或列在`allowedRetiredInCatalog`中；并且该快照中没有出现已停用的`DEFAULT_DEGRADATION_MAP`源或目标。这并不能证明模型当前由实时上游提供服务。离线—与`config/quality/model-lifecycle.json`进行比较，使用`npm run quality:refresh-model-lifecycle`手动刷新（网络；未连接到CI）。 `allowedRetiredInCatalog`是一个燃尽棘轮：仅添加具有跟踪问题的条目。                                                                                          | 是的                                |
| `check:fetch-targets`             | 客户端`src/`中的每个`fetch("/api/...")`都会解析为真正的`route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是的                                |
| `check:deps`                      | 存储库中每个`package.json`的所有`npm install` -able依赖项都在`dependency-allowlist.json`中；新的未固定或已标记的包裹                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `audit:deps`                      | 对所有五个独立锁定文件（root、 Electron、 OpenCode插件v1/v2和提供程序）进行 npm 审核。关键建议块；高度警告仍然是明显的警告。 Missing/failed审计有INCOMPLETE和block；保留每个范围的锁哈希和报告。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是的                                |
| `check:lockfile`                  | `package-lock.json`完整性— https 注册表、完整性哈希、无主机覆盖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                |
| `check:licenses`                  | 生产依赖项的SPDX许可证白名单                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                |
| `check:tracked-artifacts`         | 没有构建工件/提交的`node_modules`符号链接（也在 husky 预提交中运行；预推送有意为轻— #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                |
| `check:ai-attribution`            | PR提交、标题或正文中没有AI/bot `Co-Authored-By`预告片或 AI 生成页脚—硬规则#16 （在PR→ `release/**` — `quality.yml`快速门循环中读取事件负载， PRs —无操作和`ci.yml` lint 中PR→ `main`的仅 PR 步骤；还有 husky `commit-msg`钩子；允许人类合著者； #14436）                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | 每个Vitest排除都会命名一个跟踪问题并出现在`config/quality/vitest-exclusions.json` (#13204) 中                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                |
| `check:file-size`                 | 源文件（ `src/`、 `open-sse/`、 `electron/`、 `bin/`中的`.ts`/`.tsx` ）保留在`cap`中，测试文件（`*.test.ts(x)`）保留在`testCap`中；冻结在`file-size-baseline.json` (`frozen` / `testFrozen`) 中的文件不得超过其记录的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                |
| `check:error-helper`              | executors/handlers中的错误响应使用`buildErrorBody()` / `sanitizeErrorMessage()` （硬规则#12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 是的                                |
| `check:migration-numbering`       | 迁移SQL文件按顺序编号，无间隙或重复                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是的                                |
| `check:public-creds`              | `publicCreds.ts`之外没有文字OAuth `client_id`/`client_secret`或 Firebase Web 密钥（硬规则#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                |
| `check:db-rules`                  | `src/lib/db/`模块之外没有原始SQL ；没有从`localDb.ts`进口桶（硬规则#2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是的                                |
| `check:known-symbols`             | 在其调度表中注册的提供程序执行程序、路由策略和转换器与磁盘上的文件—没有孤立或未声明的符号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                |
| `check:route-guard-membership`    | 每个生成子进程的路由都按`isLocalOnlyPath()`分类（硬规则#15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是的                                |
| `check:test-discovery`            | 存储库中的每个`*.test.ts` / `*.spec.ts`文件都由至少一个测试运行程序收集（棘轮： `test-discovery-baseline.json`中的孤儿列表只能缩小）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `check:test-tla-order`            | `tests/unit`下没有`node:test`文件注册测试，命中顶级`await`，然后注册更多（#18045；棘轮： `test-tla-order-allowlist.json`只能收缩）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是的                                |
| `check:agent-skills-sync`         | 生成的代理技能工件与其源目录匹配（无偏差）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | 提供者logos/assets带有记录的出处条目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON配置文件解析并满足 repo lint 规则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | TypeScript编译没有错误（仅建议警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `typecheck:noimplicit:core`       | 严格`noImplicitAny` —前瞻性；许多预先存在的调用站点仍然需要注释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **咨询**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`范围为`src/app/(dashboard)/**` (#7033) — `typecheck:core`的策划的 27 个文件允许列表不包括任何仪表板TSX，并且`next build`也从不对其进行类型检查（`next.config.mjs`设置`ignoreBuildErrors: true`），因此那里的孤立标识符回归（#6625/#6909）对CI是不可见的。与冻结的per-file/per-TS-code计数基线不同（`config/quality/dashboard-typecheck-baseline.json`，与`check:known-symbols`相同的过时执行模式） —只有超出基线计数的NEW错误才会通过门；当预先存在的错误被修复时，使用`--update`逐步降低。                                                                                                                                                                                             | 是的                                |
| `check:build-typecheck`           | 对`tsconfig.build.json` （`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`）进行整个应用程序生产类型检查，表面`typecheck:core`的 27 个文件白名单和仪表板门不包括在内。与`config/quality/build-typecheck-baseline.json`不同；新的或增加的每个（文件、代码）计数失败，较低的计数要求您进行棘轮调整。当运行包含新的或提升的对时， `--update`会拒绝，除非通过`--force-regressions` ，并且拒绝新的静默文件，除非通过`--force-nocheck` ，因此加宽基线以变为绿色并授予永久静默是两个单独的故意行为。裸露的`--force`被拒绝。还根据`config/quality/ts-nocheck-baseline.json`扫描`@ts-nocheck`的构建范围，因为使用它的文件根本不报告任何诊断信息，否则对每个门都是不可见的。 | 是的                                |

#### 两个类型检查程序的答案不同

`typecheck:core`和`check:build-typecheck`在不同的选项下编译不同的程序，同一个文件可以在一个中是干净的，而在另一个中则充满错误。

`tsconfig.build.json`设置`"strict": false`，因此`noImplicitAny`关闭。核心配置使用更严格的选项编译一个包含 27 个文件的允许列表，并遵循每个条目的导入图，因此从未出现在构建程序中的文件仍会在那里进行检查。

在判断文件是否被输入时，结果很重要：** `check:build-typecheck`下的零诊断并不意味着零**。从 26 个文件中剥离`@ts-nocheck`显示其中 23 个文件在构建程序中是干净的；其中 16 个出现了大约 120 个隐含的严格错误。在调用文件清理之前检查两者。

### 职位： `quality-gate`

在`test-coverage`之后运行。失败时块合并。

| 脚本                         | 验证                                                                                                               | 阻塞           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------- |
| `quality:collect`            | 发出`quality-metrics.json` （ESLint警告计数，合并分片报告的覆盖范围）                                              | 是（棘轮上游） |
| `quality:ratchet`            | `quality-baseline.json`中的每个指标都没有回归（ESLint警告≤基线；覆盖≥基线）                                        | 是的           |
| `check:duplication`          | 代码重复 (jscpd@4) 不超过`quality-baseline.json`中的基线                                                           | 是的           |
| `check:complexity`           | 文件级圈复杂度不超过上限（核心ESLint `complexity` + `max-lines-per-function`）                                     | 是的           |
| `check:cognitive-complexity` | 认知复杂度棘轮 (`eslint-plugin-sonarjs`) —单独ESLint通行证； CI将两者合并为单个`check:complexity-ratchets`步骤运行 | 是的           |
| `check:dead-code`            | 未使用的导出/文件棘轮（刀）与基线相比不会回归                                                                      | 是的           |
| `check:compression-budget`   | 压缩基准预算—每引擎代币节省下限不得回归                                                                            | 是的           |
| `check:type-coverage`        | 百分比型棘轮 (`type-coverage`) 不回归；很大程度上包含`typecheck:noimplicit:core`                                   | 是的           |
| `check:codeql-ratchet`       | 打开CodeQL警报计数不会回归（通过`gh api`读取；无需令牌即可优雅跳过） —刷新节奏和手动触发：请参阅下面的“CodeQL棘轮” | 是的           |

### 职位： `quality-extended`

整个工作都是咨询性的（`continue-on-error: true`）。基于 npm 的棘轮真正运行；当二进制文件仍然不存在时，外部扫描仪通过`gh release download`进行安装并自动跳过（退出 0）。

| 脚本                     | 验证                                                                                                                                                    | 阻塞                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:circular-deps`    | 无循环依赖性 (dpdm)                                                                                                                                     | **咨询**                         |
| `check:bundle-size`      | 捆绑尺寸不超过上限                                                                                                                                      | **咨询**                         |
| `check:secrets`          | 如果二进制文件不存在，秘密扫描 (gitleaks) —会跳过                                                                                                       | **咨询**                         |
| `check:vuln-ratchet`     | 依赖项漏洞（osv-scanner）不会回归—如果未测量， `--ratchet`会像INCOMPLETE一样失败（退出 2）                                                              | **咨询**                         |
| `check:workflows`        | 工作流程 lint (actionlint + zizmor)； missing/broken扫描仪、无效报告或缺少棘轮基线会失败，如INCOMPLETE。有效的结果遵循选定的strict/advisory/ratchet政策 | 需要执行； zizmor 棘轮在CI中阻塞 |
| `check:openapi-breaking` | 针对固定事件提交的公共API合约（PR merge-base、push before、merge-group base； scheduled/manual checkout 第一个父级）；所需测量失败关闭                  | **使用--ratchet进行阻止**        |

### 职位： `docs-sync-strict`

在每个PR到`main`上运行。失败时块合并。

| 脚本                           | 验证                                                                                                           | 阻塞                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | 依次运行下面 6 个子门的元门                                                                                    | 是的                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt版本一致性                                                                        | 是的                        |
| ↳ `check:docs-counts`          | 散文中的计数（提供者计数、迁移计数等）位于实际计数的棘轮窗口内                                                 | 是的                        |
| ↳ `check:env-doc-sync`         | `.env.example`中的每个环境变量都记录在文档表中，反之亦然                                                       | 是的                        |
| ↳ `check:deprecated-versions`  | 文档中没有已弃用的版本字符串                                                                                   | 是的                        |
| ↳ `check:doc-links`            | 文档中的内部降价链接解析为真实文件（`[text]`/`(path)`形式）                                                    | 是的                        |
| ↳ `check:fabricated-docs`      | 文档中引用的路由、环境变量、 CLI命令、挂钩名称和文件路径存在于代码库中。通过`--strict`硬门；没有标志的软故障。 | 是（通过CI中的`--strict` ） |
| `check:cli-i18n`               | CLI命令字符串存在于所有 i18n 语言环境文件中                                                                    | 是的                        |
| `check:openapi-coverage`       | OpenAPI规范至少涵盖真实路线的棘轮地板                                                                          | 是的                        |
| `check:openapi-security-tiers` | `openapi.yaml`中的安全层注释与`routeGuard.ts`分类一致                                                          | **咨询**                    |
| `check:openapi-routes`         | `openapi.yaml`中的每条路径都会解析为真正的`route.ts` （反幻觉）                                                | 是的                        |
| `check:docs-symbols`           | `docs/**/*.md`中的每个`/api/...`引用都会解析为真正的`route.ts` （反幻觉）                                      | 是的                        |
| `i18n translation drift`       | i18n 语言环境文件中未翻译的键—仅发出警告                                                                       | **咨询**                    |

`docs/diagrams/`下的 12 个README SVGs已生成（`scripts/docs/gen-readme-<name>.mjs`； `npm run docs:readme-diagrams`重新生成所有这些）。每个都有一个字节比较单元测试（`tests/unit/docs/readme-*-svg.test.ts`、 job `test-unit`），当提交的文件过时时会失败，并且`check:docs-counts`从其`<text>`节点—读取规范数字，这就是大纲步骤将文件中的每个大纲字符串保持为不可见的`<text>`的原因。 SVG规范数字检查读取`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) 中列出的文件： `docs/diagrams/readme-hero.svg`、 `free-tier-budget.svg`、 `promise-pillars.svg`、 `comparison-table.svg`、 `cli-terminal.svg`、 `tier-cascade.svg`，以及`public/images/tier-flow-dark.svg`和`tier-flow-light.svg`；永久免费、目录条目、循环池和评分因素声明也为`promise-pillars.svg`、 `free-tier-budget.svg`和`strategies-grid.svg`。 `free-tier-budget.svg`从实时目录加载器中提取数据，因此对`FREE_MODEL_BUDGETS`或提供者显示名称的更改会导致CI变红，直到重新生成该文件。

### 职位： `i18n-ui-coverage`

| 脚本                              | 验证                                                                                                                                  | 阻塞     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` （内联） | UI i18n 密钥覆盖率为≥ 65%                                                                                                             | 是的     |
| `check-ui-value-drift` （内联）   | 重写的英语**价值**不留下过时的翻译                                                                                                    | 是的     |
| `check-new-key-coverage` （内联） | 一个**新的**英文密钥在每个语言环境中都被翻译— `__MISSING__:`标记被拒绝                                                                | 是的     |
| `check-translation-ratio`         | 每个语言环境的实际翻译比例（与英语相同/占位符/允许列表之外的缺失部分）不得超过`config/quality/i18n-translation-baseline.json` + slack | **咨询** |

需要`fetch-depth: 0` —值漂移门将`en.json`与合并基础进行比较。

#### `check-ui-value-drift` —陈旧翻译门

捕获其他门在结构上看不到的国际化回归：英语值被重写，并且从_先前_英语派生的翻译保留下来，因此非英语用户继续阅读措辞自信、现在错误的副本。

这是真的发货了。当Antigravity登录助手登陆（#5203）时， `oauthModal.googleOAuthWarning`被重写；** 43 个语言环境中的 39 个**保留文本告诉操作员“复制完整的URL并将其粘贴到下面” —是该提供者无法完成的流程。直到#8463才注意到它，因为：

- `sync-ui-keys`仅回填以下键**缺席的**，从来没有那些**陈旧**;
- `check-ui-keys-coverage`计算密钥_存在_，因此过时的翻译分数被覆盖；
- `check-translation-drift`跟踪`docs/i18n/<locale>/**.md`文档镜像—它从不读取`src/i18n/messages/*.json`。自 2026-09 重新同步以来，作业`docs-sync-strict`被阻塞：编辑核心文档→ `npm run i18n:run -- --files=<doc>` （部分级别，便宜）。

**差异感知，不支持基线。**它将合并基础上的`en.json`与工作树进行比较；对于每个英文值发生变化的键，任何仍保留未更改翻译的语言环境都是陈旧的。这是故意的**冻结先前存在的债务**— a diff 无法揭示长期翻译来自哪个古英语，因此门仅判断当前更改涉及的内容。另一种方法（每个键的哈希基线）将花费~ 600 KB生成的文件，3 ×最大的现有基线，在每个 i18n PR上搅动。

满足它的方法有两种：

1. 更新受影响的翻译，或
2. 将它们设置为`__MISSING__:<new english>` —运行时然后提供更正的英语（`src/i18n/request.ts::deepMergeFallback`、 #7258）和用于翻译的密钥队列。

如果字符串的**意义**改变了，更喜欢**重命名密钥**：新密钥无法继承过时的翻译。这就是#8463使用的模式。

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

当无法读取基本目录时使用`SKIP reason=base-unresolved`退出 0（没有基本引用的浅克隆），镜像`check-openapi-breaking`。

### 职位： `i18n`

完整的 i18n 验证矩阵（每个区域一项作业）。整个工作都是咨询性的。

| 脚本                            | 验证                     | 阻塞                                          |
| ------------------------------- | ------------------------ | --------------------------------------------- |
| `validate_translation.py quick` | 每个语言环境的翻译完整性 | **咨询**（`continue-on-error: true`整个工作） |

### 职位： `pr-test-policy`

仅在拉取请求上运行。

| 脚本                   | 验证                                                                                              | 阻塞 |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | 更改`src/`、 `open-sse/`、 `electron/`或`bin/`中的生产代码的PRs必须包含或更新测试（硬规则#8）     | 是的 |
| `check:test-masking`   | 更改的测试文件不会减少净断言计数或添加`assert.ok(true)`同义反复                                   | 是的 |
| `check:pr-evidence`    | PR主体引用了test/VPS变更证据（通过 greping PR散文—脆弱化来机械化 Hard Rule #18 ，请参阅 Backlog） | 是的 |

### 职位： `test-vitest`

在`build`之后运行。失败时块合并。

| 套房             | 验证                                                     | 阻塞                                                                        |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `test:vitest`    | MCP服务器（110 个工具）、 autoCombo、缓存— vitest runner | 是的                                                                        |
| `test:vitest:ui` | UI组件测试— vitest runner                                | **阻塞**—预先存在的故障在`vitest.config.ts`中被明确排除；新的失败使工作失败 |

### 每晚工作流程（计划的、建议的）

它们按照 cron 计划（和`workflow_dispatch`）运行，而不是在PRs上运行。一切都是咨询性的。

| 工作流程               | 验证                                                                                                                                                | 阻塞     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | 使用随机种子+高运行次数进行快速检查属性测试                                                                                                         | **咨询** |
| `nightly-resilience`   | 堆增长门、混沌故障注入、k6 load/soak                                                                                                                | **咨询** |
| `nightly-llm-security` | Promptfoo 注入防护（块模式） + garak 探针（在没有提供者机密的情况下跳过）                                                                           | **咨询** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) against a live OmniRoute using `docs/openapi.yaml` — surfaces spec violations / unhandled 500s (Fase 8 B.4) | **咨询** |
| `nightly-mutation`     | Stryker 突变测试分数超过快速单位通道—幸存突变体表面弱断言                                                                                           | **咨询** |
| `nightly-compat`       | 支持的`engines.node`范围内的节点引擎兼容性矩阵                                                                                                      | **咨询** |

性能基线（堆、 TTFB、构建时间）被记录，而不是门控：请参阅[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)。

---

## Velocity阶段（2026-08-30 → v4.0 LTS）：每个基线放松20%

所有者决定（2026-08-30）：在 v4.0 模块化之前，运输速度比持有债务额度更重要。每一个**数字**棘轮基线在一次可审计的过程中放宽了 20%，并且该阶段在`config/quality/quality-baseline.json`中声明：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 发生了什么变化                                                                                                                               | 在哪里                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` —计数越低越好× 1.2，百分比越高越好÷ 1.2（覆盖范围保持 60， `eslintErrors`保持 0， `eslintWarnings` 0 →冻结抑制计数的 20%） | `quality-baseline.json` （`_relax_velocity_2026_08_30`注释列出了→之前的每一个之后）                    |
| `count` ×1.2 / `percentage` ×1.2                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`、 `testCap`、每`frozen[*]` / `testFrozen[*]`线上限× 1.2                                                                                | `file-size-baseline.json`                                                                              |
| 每个文件/每个 TS 代码计数× 1.2                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten`成为顾问，而`_policy.requireTighten === false`                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 每晚`bank-ratchet-shrinks`暂停（它将存储测量的收缩并撤消净空）                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

允许列表（`eslint-suppressions.json`、 `test-masking-allowlist.json`、 `test-discovery-baseline.json`等）是**不是**预算并没有受到影响。 Pass/fail策略门（秘密、 SQL规则、 docs/env合约、i18n 奇偶校验、单元测试）未更改—红色测试仍然是红色测试。

**工装**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` —一次性松弛 (`scripts/quality/relax-baselines.mjs`)；拒绝用同一个音符跑两次。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —按照CI方式测量每个数字门，并打印每个门的剩余空间 (`scripts/quality/baseline-headroom.mjs`)。每晚`baseline-headroom`作业在工作流运行摘要中发布表，并将其JSON/Markdown报告上传为`baseline-headroom-<run_id>`，保留 90 天。警告行和关键行标识在其上限 10% 以内或已经超过上限的门。审查这些报告，将其作为预算消耗的预警；检查有问题的门的`_rebaseline_*`注释。该作业不再创建或更新永久性问题； #12149保留较早的报告历史。

**新代码模式（Clean-as-You-Code） —自 2026 年 8 月 30 日起，仅PR快速路径**

在`pull_request`事件中， `quality.yml`将`--base-ref <PR base SHA>`传递给`check:file-size`、 `check:complexity-ratchets`和`check:dead-code`。对于`check:complexity-ratchets`和`check:dead-code`门将HEAD与合并基进行比较**仅限于PR触及的文件**（`scripts/check/newCodeMode.mjs`：合并基础在一次性`git worktree`中具体化， ESLint/knip在那里运行，并且在HEAD上，每个文件的计数有所不同）：

- **阻塞**— PR在其更改的文件中添加了cyclomatic/cognitive违规或死导出（日志中的`complexityNewCode=`、 `cognitiveComplexityNewCode=`、 `deadExportsNewCode=` ）；
- **咨询**—全局总数与冻结基线。继承的漂移永远不会红一个无辜的PR；漂移在发布协调时被重新冻结，并由净空作业监视。

`check:file-size`根据自己的条件使用基准引用（`scripts/check/check-file-size.mjs`、 #8522）：它检查树中的每个源文件和测试文件，使用`git show`读取PR基准处的每个文件的行计数，并且仅当文件增长超过其基准上限（`frozen` / `testFrozen`，或`cap` / `testCap`对于基准线之外的文件）及其基准大小的较大者时，该文件才会失败。因此，已经在基地漂流的文件永远不会红了无辜的PR。

`check:boundary:ratchet`相同的规则应用于其单个数字 (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`)：在PR事件中， `quality.yml`快速门和`ci.yml` lint 作业都会传递PR基础SHA，基础提交是从`git archive`导出测量的，并且PR仅当其`open-sse → src`边缘计数超过`metrics.boundaryOpenSseToSrc`和基础计数中的较大者时才会失败。报告了上限以上的基础漂移（`base drift herdado`），但从未红过无辜的PR； Push → main 保持绝对上限，无法解析的基础SHA会回退到它并发出警告。

`workflow_dispatch`运行、release-green 扫描和 nightly headroom 作业没有PR基础并保持绝对（全局）比较。目前，覆盖率、重复和类型覆盖率保持全局（他们的工具不会廉价地生成每个文件的差异） —候选者进行相同的处理。

**在 v4.0 阶段结束（LTS =比以前更紧，而不是“恢复正常”）**

1. 在纯`release/v4.0.0`提示上： `npm run quality:headroom --json`为记录，然后`npm run quality:ratchet -- --update`、 `check:file-size --update`、 `check:complexity-ratchets --update`、 `check:dead-code --update`，每个类型检查门的`--update` —每个基线都会下降到测量值。
2. 从`quality-baseline.json`中删除`_policy` （重新装备`--require-tighten`和夜间银行业务），在`check-openapi-coverage.mjs`中恢复`THRESHOLD = 36` （或更高版本）。
3. 在模块化获得回报的情况下收紧超出测量值：文件大小`cap`回到 1000（或 800），覆盖范围+ 5，模块化包的死出口 0。

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

## 允许名单政策

每个不会因预先存在的违规而失败的门都使用冻结的允许列表（例如， `KNOWN_STALE_DOC_REFS`、 `KNOWN_MISSING`、 `KNOWN_RAW_SQL`）。政策是：

**修复根本原因；仅当违规行为预先存在并且无法在同一PR中修复时才使用允许列表。**

将条目添加到白名单时：

1. 包括带有理由的评论。
2. 参考跟踪问题（例如`// #3498 — Phase 2 feature, not yet implemented`）。
3. 删除同一PR中修复违规的条目—不再抑制活动违规的过时条目本身就是一个缺陷（6A.3 过时执行一旦实施，将使孤立的允许列表条目上的大门失败）。

做**不是**添加白名单条目以使测试更快通过。允许名单不断增加的绿色大门是一种错误的质量感。

### 当您的PR上的门出现故障时

1. **仔细阅读门输出**—它会准确地告诉您哪个文件或符号违反了规则。
2. **修复违规行为**—大多数门都是确定性文件系统检查，只要代码正确，它们就会通过。
3. **如果违规行为是预先存在的**（即，您没有引入它，但门现在覆盖了它）：添加一个带有理由注释和跟踪问题的允许列表条目。
4. **如果门是棘轮**（覆盖范围、 ESLint警告、重复、复杂性）：您的更改使指标变得更糟。修复根本问题，或者（很少）运行`npm run quality:ratchet -- --update`如果更改是有意的并且指标降级是可接受的— ，但在PR描述中记录原因。
5. **咨询门**(`continue-on-error: true`) 是信息性—它们不会阻止合并，但会出现在CI摘要中。无论如何修复它们。

---

## 添加新门禁

1. 创建 `scripts/check/check-<name>.mjs`（或 `.ts`）。策略门禁以 0/1 退出。
   棘轮式门禁通过 `collect-metrics.mjs` 将指标写入 `quality-metrics.json`。
2. 将 `"check:<name>": "node scripts/check/check-<name>.mjs"` 添加到 `package.json`。
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

## 合理化待办事项列表（ROI审查— Fase 9 Onda 3）

该清单已于 2026 年 6 月 17 日与`ci.yml`进行核对（之前版本省略了`audit:deps`、 `check:tracked-artifacts`、 `check:lockfile`、 `check:licenses`、 `check:dead-code`、 `check:cognitive-complexity`、 `check:type-coverage`、 `check:codeql-ratchet`、 `check:pr-evidence`）。对协调集的ROI审查确定了以下合理化候选者。**合并是机械的CI更改； flips/drops是为运营商保留的政策决定。**以下内容尚未应用。

**上面也未记录**（咨询，低信号）： `docs-lint`作业（markdownlint + Vale，整个作业`continue-on-error`）和独立扫描仪工作流程`semgrep.yml` / `codeql.yml` / `scorecard.yml`。 `semgrepFindings: 0`位于`quality-baseline.json`中，但未连接到`ci.yml` —中的阻塞棘轮，该指标当前是孤立的。

### 合并/重复数据删除（机械，风险较低）

每个候选者均于 2026 年 6 月 17 日根据实时门状态进行了验证（信任但验证）；几次“明显”的合并最终被证明是为了隐藏债务，**不是**干净的插入。

- **`check:docs-sync`运行两次**—独立于`lint`作业中，并再次位于`check:docs-all` (`docs-sync-strict`) 和 husky 预提交挂钩中。 ✅**DONE** —独立`lint`调用已删除。
- **CVE扫描**— ❌**NOT干净的合并。** `audit:deps`阻止所有五个锁定文件中的关键建议和不完整审计，同时根据当前政策将高级建议报告为警告； `check:vuln-ratchet` (osv) 仅在与签入基线相比的_回归_上失败，并在需要时拒绝丢失的测量。不同的语义—删除`audit:deps`会丢失绝对关键门和独立包审计收据。两者都保留。
- **循环检测**— ✅**DONE** （#15159 G-01/G-02）。这里的旧文本将`check:cycles`称为“绿色的、精心策划的”门，并证明保持其阻塞是合理的，因为`check:circular-deps` (dpdm) 报告了 91 个周期。那个绿色是一个**假绿**： `check:cycles`扫描了 5 个子目录（450 个文件），仅匹配静态`import|export … from`，并删除了每个`@/`和`@omniroute/open-sse/`说明符，因此它看不到主导存储库的动态导入+别名循环。已修复：门现在行走`src` + `open-sse` （5023 个文件），从TypeScript AST收集说明符（因此`import("…")`计数，而类型位置`typeof import("…")`不计数），并解析 tsconfig `paths`。它发现**14**周期，而不是 0。因为 14 个预先存在的周期无法固定在门PR中， `check:cycles`现在是**棘轮**(`--ratchet`, `quality-baseline.json`, `direction: down`中的上限`metrics.cycles.value = 14` ) —它阻止任何_回归_并且计数只能下降。 CI运行`npm run check:cycles:ratchet`。烧毁游乐设施**A-01** 。 `check:circular-deps` (dpdm) 仍作为更广泛的第二意见提供咨询。
- **复杂**— ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`)：一次ESLint步行，按ruleId计数，因此圈+最大线和认知基线保持独立；个别`check:complexity` / `check:cognitive-complexity`保留为本地`--update`。
- **`/api`抗幻觉**— ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`的一个FS库存，openapi-routes + docs-symbols 仍然独立报告；个人留下来进行本地跑步。
- **`check:node-runtime`运行 11 个作业**— ⚠️**低ROI。**每个都是一个单独的跑步者，检查是< 1s；总共节省~ 10 秒，防止失去一个廉价的每工作警卫。不值得流失。
- **`typecheck:noimplicit:core`上CI lint** — ✅**从 lint 作业中删除**（曾为`continue-on-error`提供咨询）；阻挡类型表面为`typecheck:core` + `check:type-coverage`。保留本地脚本。

### 翻转/决定（运营商策略）

- `check:openapi-security-tiers` （咨询） — ❌**NOT完全可以翻转。**它退出 0，但警告`LOCAL_ONLY_API_PREFIXES`下的多个`traffic-inspector`路由缺少`x-loopback-only: true`注释。强制执行它需要首先将这些注释添加到`openapi.yaml` 。
- `typecheck:noimplicit:core` （咨询） —很大程度上包含在阻塞`check:type-coverage`棘轮中。翻转到棘轮或放下多余的第二次`tsc`通道。
- `test:vitest:ui` （现在**阻塞**) —预先存在的故障在`vitest.config.ts`中通过`// #8618`跟踪注释明确排除；新的失败使工作失败。
- `check:secrets` （gitleaks，阻止棘轮冻结在 3 个记录的误报） —将 3 个列入白名单以达到 0，或降级为咨询。 GitHub本机秘密扫描+ `check:public-creds`重叠。
- `check:pr-evidence` （阻塞，greps PR-body散文） —假阳性风险高；如果放弃，则会削弱硬规则#18执行，因此这是一个真正的政策呼吁。
- `semgrep` （独立咨询） —与OWASP系列的CodeQL重叠；将其基线连接到棘轮或下降器。

---

## 相关文档

- 供应链（来源、 SBOM、Trivy、记分卡）： [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` —按键设置奇偶校验门

`scripts/i18n/check-key-completeness.mjs` （`npm run i18n:check-keys`，工作`i18n-ui-coverage`）。将每个`src/i18n/messages/<locale>.json`的叶密钥集与`en.json`进行比较，并且在任何缺失或额外的叶上失败，无论密钥何时添加。 `__MISSING__:`占位符算作存在（它们的内容是比率门的事）。它是两个diff-based/percentage门的绝对补充： `check-ui-keys-coverage`强制每个区域设置 80% 的下限（ ~ 13,000 个中的 43 个缺失键仍读取 99.7%），而`check-new-key-coverage`仅判断PR添加到`en.json`的键。区域设置批处理是从其分支被剪切当天的`en.json`生成的，并在基础不断添加键的同时翻译数天；批次PR本身不添加密钥，因此当批次 1 (#13044) 在 9 个语言环境中缺少 43 个密钥，而批次 2 (#13660) 在 8 个语言环境中缺少 10 个密钥时 (2026-09-15)，两个兄弟姐妹都保持沉默。用`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`修复红色； `extra`叶子表示源已删除它—将其从语言环境中删除。 `--warn`报告没有失败。 `--catalog=cli`对`bin/cli/locales` (`npm run i18n:check-keys:cli`) 进行相同的比较；这两个步骤都在 job `i18n-ui-coverage`中。

#### `check-new-key-coverage` —新钥匙 i18n 门

`check-ui-value-drift`的兄弟姐妹。那个人抓住了一个英语值，那就是**重写**而它的翻译却被抛在了身后；这个抓住了一个英文键**额外**而有些地区从未收到过。

`check-ui-keys-coverage`无法看到此类：它对每个区域设置强制执行百分比下限，并且~ 13,000 个缺失键中的 11 个键的覆盖率保持在 99.9%。每种语言的百分比无法表达“此功能未翻译” —整个功能可以在没有文本的情况下登陆新的语言环境，并且永远不会移动数字。

它编码的事件：编排画布的第 3 阶段将其 11 个键翻译到当时存在的 42 个语言环境中。几个小时后，欧盟语言批次 (#13044) 将存储库带到了 51 个语言环境，而 9 个新成员 (`el`、 `et`、 `ga`、 `hr`、 `lt`、 `lv`、 `mt`、 `sl`、 `sr`) 从未收到它们。 `deepMergeFallback`用英文代替了缺失的键，因此故障模式是未翻译的UI而不是空白的UI — real，并且通过构造保持沉默。

就像它的兄弟一样**差异感知**，将合并基础上的英语与工作树进行比较，因此预先存在的间隙保持冻结，并且门不需要迁移即可打开。

**`__MISSING__:<english>`标记不满足它（自 2026-09-17 起）。**它曾经是记录的延迟—运行时回退到正确的英语—直到 2026 年 9 月 16 日的八个功能PRs添加了 61 个键并将标记标记到所有 65 个语言环境中而不是翻译：此门接受了每一个，没有任何东西阻止PRs，然后阻塞真实翻译比率门在每个人的发布提示上失败（pt-BR 3.2 % > 2.5 % + 0.5）。标记现在被判定为缺失翻译。使用`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`修复红色，或与`npm run i18n:translate-new-keys`并行的所有语言环境（`scripts/i18n/translate-new-keys.sh`，分离安全，拒绝在没有`OMNIROUTE_TRANSLATION_*` env 的情况下启动）。必须保持英文的键（固定的product/engine/flag名称）属于`scripts/i18n/untranslatable-keys.json`，切勿位于标记后面。 `vi`完全禁止标记（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` —停车测试门

`vitest.config.ts`的`exclude`列表中的文件是一个未运行的测试，对于读取该树的人来说，它看起来像是覆盖范围。评论`// #8618 — pre-existing failure; remove this exclusion when fixed`后面累积了 62 个文件。问题#8618于 2026 年 8 月 11 日关闭，而它跟踪的列表从 45 个条目增加到 62 个，每个新条目都继承了一条指向死问题的评论。当列表最终被逐个文件（#13204）测量时，** 62 个中的 51 个通过了当前树，没有更改源代码**。

该门要求每一个解析为真实文件的排除项（a）命名跟踪问题并（b）以其测量状态出现在`config/quality/vitest-exclusions.json`中，因此添加一个是专用文件中的可审查差异，而不是在 60 条目数组中多一行。它故意不重新运行排除的测试— ，这会花费~ 10 分钟并且属于定期作业；最后一次测量时的库存记录。
