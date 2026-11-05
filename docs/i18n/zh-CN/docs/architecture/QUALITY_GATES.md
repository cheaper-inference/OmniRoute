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

### 静态扫描库存

版本化的 npm-alias 库存和静态扫描成员资格位于`config/quality/gate-manifest.json`中。运行`npm run check:gate-manifest`以验证脚本名称和针对`package.json`的确切命令；添加、删除和命令漂移都会使本地挂钩和CI中的更改分类作业失败。别名不是工作流作业、矩阵实例或测试用例：这些计数不得以可互换的形式呈现。

使用`npm run quality:scan -- --list`或`npm run quality:scan:fast -- --list`检查选定的别名而不执行它们。运行程序调用 npm 入口点，因此其运行时（包括配置的Bun ）被保留。清单将这些配置文件之外的别名记录为单独调用的，并且在只读扫描配置文件中禁止维护命令。

这些配置文件仅涵盖静态扫描。他们不证明产品测试、覆盖范围、包装、外部检查或候选者的完全发布验收。工作流准入使用链接的`config/quality/admission-policy.json`和`scripts/quality/admission-verdict.mjs`。发布观察者资料保持独立；独立检查其适用的支票和收据。下面的散文清单仅供参考，并不是门实际运行的证据。

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

桶再导出和动态导入仅是分辨率诊断；他们绝不会造成阻碍性的发现。在`config/quality/forgotten-sibling-allowlist.json`中查看异常情况。每个条目必须命名消费者和候选测试，给出具体的理由，并链接GitHub问题或拉取请求。格式错误的条目无法关闭。异常无法抑制已删除的候选测试或添加`.skip`/`.todo`的 diff ；断言弱化和其他屏蔽仍然由独立阻塞的`check:test-masking`门拥有。

### 职位： `lint`

在每个PR到`main`上运行。失败时块合并。

| 脚本（`npm run ...`）             | 验证                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 阻塞                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:node-runtime`              | Node.js版本在支持范围内                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 是的                                |
| `check:cycles`                    | 跨所有`src/` + `open-sse/`的循环导入（基于 AST，tsconfig `paths`已解决）。只要存在任何循环（自#15281以来失败关闭），Bare 就会退出 1 并列出SCCs。 `check:cycles:ratchet` （ CI运行的）当计数超过`quality-baseline.json` —中的`metrics.cycles`上限时阻塞，当前为14， `direction: down`，因此它只能下降（#15159 G-01/G-02）                                                                                                                                                                                                                                                                                                                                                                                | 是（棘轮）                          |
| `check:boundary`                  | `open-sse → src` coupling: unique file-to-file imports from the engine into the app (`scripts/quality/measure-boundary.mjs`; the edge list is the v4 core/module-split remediation backlog). Bare = advisory report (same as `quality:boundary`). `check:boundary:ratchet` (what CI runs, also in the `quality.yml` fast-gates ratchet loop) blocks when the count exceeds the `metrics.boundaryOpenSseToSrc` ceiling in `quality-baseline.json` — seeded at the measured 771, `direction: down`; `--update` only lowers it; base-relative on PRs (`--base-ref`, see below)                                                                                                                             | 是（棘轮）                          |
| `check:route-validation:t06`      | 所有路由上都存在Zod架构（第 6 层策略）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 是的                                |
| `check:any-budget:t11`            | `@ts-expect-error // any`数量不超过预算（Tier 11 catraca）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                |
| `check:provider-consistency`      | `providers.ts`中的每个提供者在`providerRegistry.ts`中都有一个匹配的条目（反之亦然，在允许列表中）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是的                                |
| `check:model-lifecycle`           | 三个手动维护的路由表与签入的生命周期快照（#11503）保持一致： `FITNESS_TABLE` （`taskFitness.ts`）没有获得`REGISTRY`可以路由的退休ID；每个`BUILT_IN_ALIASES`目标都存在于`REGISTRY`中，但不存在于退休 ID 快照中； `REGISTRY`中的每个已退休 ID 都会转发或列在`allowedRetiredInCatalog`中；并且该快照中没有出现已停用的`DEFAULT_DEGRADATION_MAP`源或目标。这并不能证明模型当前由实时上游提供服务。离线—与`config/quality/model-lifecycle.json`进行比较，使用`npm run quality:refresh-model-lifecycle`手动刷新（网络；未连接到CI）。 `allowedRetiredInCatalog`是一个燃尽棘轮：仅添加具有跟踪问题的条目。                                                                                                     | 是的                                |
| `check:fetch-targets`             | 客户端`src/`中的每个`fetch("/api/...")`都会解析为真正的`route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 是的                                |
| `check:deps`                      | 存储库中每个`package.json`的所有`npm install` -able依赖项都在`dependency-allowlist.json`中；新的未固定或已标记的包裹                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                |
| `audit:deps`                      | `npm audit` （根+电子） —无high/critical咨询（与 osv `check:vuln-ratchet`重叠；请参阅合理化待办事项）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 是的                                |
| `check:lockfile`                  | `package-lock.json`完整性— https 注册表、完整性哈希、无主机覆盖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 是的                                |
| `check:licenses`                  | 生产依赖项的SPDX许可证白名单                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 是的                                |
| `check:tracked-artifacts`         | 没有构建工件/提交的`node_modules`符号链接（也在 husky 预提交中运行；预推送有意为轻— #6716）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 是的                                |
| `check:ai-attribution`            | PR提交、标题或正文中没有AI/bot `Co-Authored-By`预告片或 AI 生成页脚—硬规则#16 （在PR→ `release/**` — `quality.yml`快速门循环中读取事件负载， PRs —无操作和`ci.yml` lint 中PR→ `main`的仅 PR 步骤；还有 husky `commit-msg`钩子；允许人类合著者； #14436）                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | 每个Vitest排除都会命名一个跟踪问题并出现在`config/quality/vitest-exclusions.json` (#13204) 中                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是的                                |
| `check:file-size`                 | 源文件（ `src/`、 `open-sse/`、 `electron/`、 `bin/`中的`.ts`/`.tsx` ）保留在`cap`中，测试文件（`*.test.ts(x)`）保留在`testCap`中；冻结在`file-size-baseline.json` (`frozen` / `testFrozen`) 中的文件不得超过其记录的大小                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                |
| `check:error-helper`              | executors/handlers中的错误响应使用`buildErrorBody()` / `sanitizeErrorMessage()` （硬规则#12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 是的                                |
| `check:migration-numbering`       | 迁移SQL文件按顺序编号，无间隙或重复                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 是的                                |
| `check:public-creds`              | `publicCreds.ts`之外没有文字OAuth `client_id`/`client_secret`或 Firebase Web 密钥（硬规则#11）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 是的                                |
| `check:db-rules`                  | `src/lib/db/`模块之外没有原始SQL ；没有从`localDb.ts`进口桶（硬规则#2/#5）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 是的                                |
| `check:known-symbols`             | 在其调度表中注册的提供程序执行程序、路由策略和转换器与磁盘上的文件—没有孤立或未声明的符号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 是的                                |
| `check:route-guard-membership`    | 每个生成子进程的路由都按`isLocalOnlyPath()`分类（硬规则#15/#17）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 是的                                |
| `check:test-discovery`            | 存储库中的每个`*.test.ts` / `*.spec.ts`文件都由至少一个测试运行程序收集（棘轮： `test-discovery-baseline.json`中的孤儿列表只能缩小）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                |
| `check:test-tla-order`            | `tests/unit`下没有`node:test`文件注册测试，命中顶级`await`，然后注册更多（#18045；棘轮： `test-tla-order-allowlist.json`只能收缩）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 是的                                |
| `check:agent-skills-sync`         | 生成的代理技能工件与其源目录匹配（无偏差）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | 提供者logos/assets带有记录的出处条目                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON配置文件解析并满足 repo lint 规则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | TypeScript编译没有错误（仅建议警告）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 是的                                |
| `typecheck:noimplicit:core`       | 严格`noImplicitAny` —前瞻性；许多预先存在的调用站点仍然需要注释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **咨询**(`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`范围为`src/app/(dashboard)/**` (#7033) — `typecheck:core`的策划的 27 个文件允许列表不包括任何仪表板TSX，并且`next build`也从不对其进行类型检查（`next.config.mjs`设置`ignoreBuildErrors: true`），因此那里的孤立标识符回归（#6625/#6909）对CI是不可见的。与冻结的per-file/per-TS-code计数基线不同（`config/quality/dashboard-typecheck-baseline.json`，与`check:known-symbols`相同的过时执行模式） —只有超出基线计数的NEW错误才会通过门；当预先存在的错误被修复时，使用`--update`逐步降低。                                                                                                                                                                                                        | 是的                                |
| `check:build-typecheck`           | 对`tsconfig.build.json` （`src`、 `open-sse`、 `packages`、 `bin`、 `scripts`、 `electron/**/*.d.ts`）进行整个应用程序生产类型检查，表面`typecheck:core`的 27 个文件白名单和仪表板门不包括在内。与`config/quality/build-typecheck-baseline.json`不同； a new or raised per-(file, code) count fails, a lower count asks you to ratchet.当运行包含新的或提升的对时， `--update`会拒绝，除非通过`--force-regressions` ，并且拒绝新的静默文件，除非通过`--force-nocheck` ，因此加宽基线以变为绿色并授予永久静默是两个单独的故意行为。裸露的`--force`被拒绝。还根据`config/quality/ts-nocheck-baseline.json`扫描`@ts-nocheck`的构建范围，因为使用它的文件根本不报告任何诊断信息，否则对每个门都是不可见的。 | 是的                                |

#### 两个类型检查程序的答案不同

`typecheck:core` and `check:build-typecheck` compile different programs under different options, and the same file can be clean in one and full of errors in the other.

`tsconfig.build.json`设置`"strict": false`，因此`noImplicitAny`关闭。核心配置使用更严格的选项编译一个包含 27 个文件的允许列表，并遵循每个条目的导入图，因此从未出现在构建程序中的文件仍会在那里进行检查。

The consequence matters when judging whether a file is typed:** `check:build-typecheck`下的零诊断并不意味着零**。 Stripping `@ts-nocheck` from 26 files showed 23 of them clean in the build program; sixteen of those surfaced about 120 implicit-any errors in the strict one.在调用文件清理之前检查两者。

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
| `check:vuln-ratchet`     | 如果二进制文件不存在，依赖项漏洞（osv-scanner）不会回归—跳过                                                                                            | **咨询**                         |
| `check:workflows`        | 工作流程 lint (actionlint + zizmor)； missing/broken扫描仪、无效报告或缺少棘轮基线会失败，如INCOMPLETE。有效的结果遵循选定的strict/advisory/ratchet政策 | 需要执行； zizmor 棘轮在CI中阻塞 |
| `check:openapi-breaking` | 公共API合约 (`openapi.yaml`) 与基础分支 (oasdiff) 的重大更改—发出`openapiBreaking=N`；如果 oasdiff 不存在或基本规范无法解析，则跳过                     | **咨询**                         |

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

| 工作流程               | 验证                                                                                                                | 阻塞     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| `nightly-property`     | 使用随机种子+高运行次数进行快速检查属性测试                                                                         | **咨询** |
| `nightly-resilience`   | 堆增长门、混沌故障注入、k6 load/soak                                                                                | **咨询** |
| `nightly-llm-security` | Promptfoo 注入防护（块模式） + garak 探针（在没有提供者机密的情况下跳过）                                           | **咨询** |
| `nightly-schemathesis` | 使用`docs/openapi.yaml` —表面规范违规/未处理的 500 秒（Fase 8 B.4）针对实时OmniRoute进行OpenAPI合约模糊测试（架构） | **咨询** |
| `nightly-mutation`     | Stryker 突变测试分数超过快速单位通道—幸存突变体表面弱断言                                                           | **咨询** |
| `nightly-compat`       | 支持的`engines.node`范围内的节点引擎兼容性矩阵                                                                      | **咨询** |

性能基线（堆、 TTFB、构建时间）被记录，而不是门控：请参阅[`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)。

---

## 速度阶段（2026-08-30 → v4.0 LTS）：所有基线放宽 20%

负责人决定（2026-08-30）：在 v4.0 模块化完成之前，交付速度比维持技术债务红线更重要。所有**数值型**棘轮基线均通过一次可审计的操作放宽了 20%，并在 `config/quality/quality-baseline.json` 中声明了该阶段：

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 变更内容                                                                                                                                                       | 位置                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 越低越好的计数 ×1.2，越高越好的百分比 ÷1.2（覆盖率下限保持为 60，`eslintErrors` 仍为 0，`eslintWarnings` 从 0 调整为冻结抑制项数量的 20%） | `quality-baseline.json`（`_relax_velocity_2026_08_30` 注释列出了每一项变更前 → 变更后的值）            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                               | `complexity-baseline.json`、`duplication-baseline.json`                                                |
| `cap`、`testCap`，以及每个 `frozen[*]` / `testFrozen[*]` 的行数上限 ×1.2                                                                                       | `file-size-baseline.json`                                                                              |
| 每个文件 / 每个 TS 代码的计数 ×1.2                                                                                                                             | `api-typecheck-baseline.json`、`dashboard-typecheck-baseline.json`、`open-sse-typecheck-baseline.json` |
| `THRESHOLD` 从 36 → 30                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| 当 `_policy.requireTighten === false` 时，`--require-tighten` 改为仅提供建议                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 暂停夜间 `bank-ratchet-shrinks`（它会记录测得的收缩量，从而抵消预留空间）                                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

允许列表（`eslint-suppressions.json`、`test-masking-allowlist.json`、`test-discovery-baseline.json`
等）**不是**预算，因此未作改动。通过/失败策略门禁（密钥、SQL 规则、
文档/环境契约、i18n 一致性、单元测试）保持不变——红灯测试仍然是红灯测试。

**工具**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` —
  一次性放宽操作（`scripts/quality/relax-baselines.mjs`）；拒绝以相同注释重复运行。
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  按照 CI 的方式测量每个数值型门禁，并输出每个门禁的剩余空间
  （`scripts/quality/baseline-headroom.mjs`）。夜间 `baseline-headroom` 作业会在工作流运行摘要中发布
  该表格，并将其 JSON/Markdown 报告以 `baseline-headroom-<run_id>` 的名称上传，
  保留 90 天。警告行和严重行用于标识距离上限不足 10% 或已超出上限的门禁。
  请将这些报告作为预算正在被消耗的早期预警进行审查；检查违规门禁的 `_rebaseline_*` 注释。该作业
  不再创建或更新永久性议题；#12149 保留了早期报告的历史记录。

**新代码模式（Clean-as-You-Code）— 自 2026-08-30 起，仅用于 PR 快速路径**

在 `pull_request` 事件中，`quality.yml` 会将 `--base-ref <PR base SHA>` 传递给 `check:file-size`、
`check:complexity-ratchets` 和 `check:dead-code`。对于 `check:complexity-ratchets` 和
`check:dead-code`，门禁会将 HEAD 与合并基点进行比较，且**仅限于 PR 修改的文件**
（`scripts/check/newCodeMode.mjs`：在临时 `git worktree` 中实体化合并基点，
分别在其中和 HEAD 上运行 ESLint/knip，然后比较每个文件的计数差异）：

- **阻断性** — PR 在其修改的文件中新增了圈复杂度/认知复杂度违规或无用导出
  （日志中的 `complexityNewCode=`、`cognitiveComplexityNewCode=`、`deadExportsNewCode=`）；
- **建议性** — 全局总数与冻结基线的比较。继承的漂移绝不会让无辜的 PR 变红；
  该漂移会在发布对账时重新冻结，并由预留空间作业监控。

`check:file-size` 按其自身规则使用基础引用（`scripts/check/check-file-size.mjs`，#8522）：
它会检查树中的每个源文件和测试文件，使用 `git show` 读取各文件在 PR 基础版本中的行数，
且仅当文件增长并超过其基线阈值（基线内文件使用 `frozen` / `testFrozen`，基线外文件使用
`cap` / `testCap`）与基础版本大小两者中的较大值时，才判定该文件失败。因此，基础版本中已经
发生漂移的文件绝不会让无辜的 PR 变红。

`check:boundary:ratchet` 将相同规则应用于其唯一的数值
（`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`）：在 PR 事件中，
`quality.yml` 的快速门禁和 `ci.yml` 的 lint 作业都会传入 PR 的基准 SHA；基准提交通过
`git archive` 导出后进行测量；仅当 PR 的 `open-sse → src` 边数量超过
`metrics.boundaryOpenSseToSrc` 与基准提交计数两者中的较大值时，PR 才会失败。超过上限的
基准漂移会被报告（`继承的基准漂移`），但绝不会让无辜的 PR 失败；push → main
仍使用绝对上限，而无法解析的基准 SHA 会在发出警告后回退到该上限。

`workflow_dispatch` 运行、发布前全绿检查和夜间余量作业没有 PR 基准，
因此继续使用绝对（全局）比较。覆盖率、重复率和类型覆盖率目前仍保持全局比较
（其工具无法低成本生成逐文件差异）——它们是采用相同处理方式的候选项。

**在 v4.0 结束此阶段（LTS = 比之前更严格，而不是“恢复正常”）**

1. 在纯净的 `release/v4.0.0` 最新提交上：运行 `npm run quality:headroom --json` 留档，然后依次运行
   `npm run quality:ratchet -- --update`、`check:file-size --update`、
   `check:complexity-ratchets --update`、`check:dead-code --update`，以及每个 typecheck 门禁的
   `--update`——将每个基线都降低到实测值。
2. 从 `quality-baseline.json` 中删除 `_policy`（重新启用 `--require-tighten` 和夜间
   余量积累），并在 `check-openapi-coverage.mjs` 中恢复 `THRESHOLD = 36`（或更高）。
3. 对模块化已取得成效的部分，将阈值收紧到低于实测值：把文件大小 `cap` 恢复为 1000
   （或 800），覆盖率下限提高 5，模块化软件包的无用导出数设为 0。

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

每个不会因预先存在的违规而失败的门禁都使用冻结的允许列表
（例如 `KNOWN_STALE_DOC_REFS`、`KNOWN_MISSING`、`KNOWN_RAW_SQL`）。策略如下：

**修复根本原因；仅当违规预先存在且无法在同一 PR 中修复时，才使用允许列表。**

向允许列表添加条目时：

1. 添加注释以说明理由。
2. 引用跟踪 issue（例如，`// #3498 — 第二阶段功能，尚未实现`）。
3. 在修复该违规的同一 PR 中删除对应条目——如果某个过时条目不再
   屏蔽有效违规，则该条目本身就是缺陷（实现后，6A.3 过时规则检查会
   因孤立的允许列表条目而导致门禁失败）。

**不要**为了让测试更快通过而添加允许列表条目。门禁显示为绿色但允许列表不断增长，
只会造成质量良好的假象。

### 当你的 PR 触发门禁失败时

1. **仔细阅读门禁输出**——它会准确指出违反规则的文件或符号。
2. **修复违规**——大多数门禁都是确定性的文件系统检查，只要代码正确就会通过。
3. **如果违规预先存在**（即并非由你引入，但门禁现在开始覆盖它）：添加允许列表条目，
   并附上理由注释和跟踪 issue。
4. **如果门禁采用棘轮机制**（覆盖率、ESLint 警告、重复代码、复杂度）：
   你的更改导致指标恶化。修复根本问题；或者在极少数情况下，如果该更改是有意为之且
   指标退化可以接受，则运行 `npm run quality:ratchet -- --update`——但必须在 PR 描述中说明原因。
5. **建议性门禁**（`continue-on-error: true`）仅供参考——它们不会阻止合并，
   但会显示在 CI 摘要中。即便如此，也应修复它们。

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

## 合理化待办清单（ROI 审查 — 第 9 阶段第 3 波）

此清单已于 2026-06-17 与 `ci.yml` 核对（先前版本遗漏了
`audit:deps`、`check:tracked-artifacts`、`check:lockfile`、`check:licenses`、
`check:dead-code`、`check:cognitive-complexity`、`check:type-coverage`、
`check:codeql-ratchet`、`check:pr-evidence`）。对核对后的集合进行 ROI 审查后，
确定了以下合理化候选项。**合并属于机械性的 CI 变更；切换/移除则属于保留给操作者决定的策略事项。**
以下内容尚未应用。

**上文还未记录的项目**（建议性、低信号）：`docs-lint` 作业
（markdownlint + Vale，整个作业设置了 `continue-on-error`），以及独立的扫描器工作流
`semgrep.yml` / `codeql.yml` / `scorecard.yml`。`semgrepFindings: 0` 位于
`quality-baseline.json` 中，但尚未连接到 `ci.yml` 中的阻断式棘轮机制——该指标目前处于孤立状态。

### 合并/去重（机械性变更，风险较低）

每个候选项均已于 2026-06-17 根据实际门禁状态进行验证（信任但要核实）；
事实证明，若干“显而易见”的合并隐藏了技术债务，因而**不能**直接无缝替换。

- **`check:docs-sync` 运行两次**——一次独立运行于 `lint` 作业中，另一次运行于 `check:docs-all`（`docs-sync-strict`）和 husky pre-commit 钩子中。✅ **已完成**——已移除 `lint` 中的独立调用。
- **CVE 扫描**——❌ **无法干净合并。** `audit:deps` 遇到任何高危/严重 CVE 都会硬失败；`check:vuln-ratchet`（osv）仅在相对于基线出现_回退_时失败（当前为 1 个 MODERATE）。两者语义不同——移除 `audit:deps` 将失去针对高危/严重漏洞的绝对门禁。两者均予以保留。
- **循环检测**——✅ **已完成**（#15159 G-01/G-02）。此处旧文本将 `check:cycles` 称为“绿色、精心筛选的”门禁，并以 `check:circular-deps`（dpdm）报告 91 个循环为由，主张继续将其作为阻断门禁。这个绿色状态是一个**假绿**：`check:cycles` 仅扫描了 5 个子目录（450 个文件），只匹配静态 `import|export … from`，并丢弃了所有 `@/` 和 `@omniroute/open-sse/` 说明符，因此无法发现仓库中占主导地位的动态导入 + 别名循环。现已修复：该门禁现在遍历 `src` + `open-sse`（5023 个文件），从 TypeScript AST 收集说明符（因此 `import("…")` 会计入，而类型位置中的 `typeof import("…")` 不会计入），并解析 tsconfig `paths`。检测到的是 **14** 个循环，而非 0 个。由于无法在门禁 PR 中修复 14 个既有循环，`check:cycles` 现在采用**棘轮机制**（`--ratchet`，上限为 `quality-baseline.json` 中的 `metrics.cycles.value = 14`，`direction: down`）——它会阻止任何_回退_，且数量只能下降。CI 运行 `npm run check:cycles:ratchet`。消减工作随 **A-01** 一并推进。`check:circular-deps`（dpdm）继续作为范围更广的建议性第二意见。
- **复杂度**——✅ **已完成**（`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`）：一次 ESLint 遍历，按 ruleId 计数，因此圈复杂度 + 最大行数与认知复杂度的基线保持独立；单独的 `check:complexity` / `check:cognitive-complexity` 仍保留，供本地执行 `--update` 使用。
- **`/api` 反幻觉检查**——✅ **已完成**（`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`）：仅对 `src/app/api` 执行一次 FS 清点，openapi-routes + docs-symbols 仍独立报告；单独的检查仍保留，供本地运行。
- **`check:node-runtime` 在 11 个作业中运行**——⚠️ **ROI 较低。** 每个作业使用独立的运行器，且该检查耗时不到 1 秒；总共节省约 10 秒，却会失去成本低廉的逐作业防护。不值得为此折腾。
- **CI lint 中的 `typecheck:noimplicit:core`**——✅ **已从 lint 作业中移除**（此前为设置了 `continue-on-error` 的建议性检查）；阻断式类型门禁由 `typecheck:core` + `check:type-coverage` 构成。本地脚本予以保留。

### 切换/决策（操作者策略）

- `check:openapi-security-tiers`（建议性）——❌ **无法直接干净地切换。** 它以 0 退出，但会警告 `LOCAL_ONLY_API_PREFIXES` 下的若干 `traffic-inspector` 路由缺少 `x-loopback-only: true` 注解。若要强制执行，必须先将这些注解添加到 `openapi.yaml`。
- `typecheck:noimplicit:core`（建议性）——已大体被阻断式 `check:type-coverage` 棘轮涵盖。可将其改为棘轮，或移除这个冗余的第二次 `tsc` 执行。
- `test:vitest:ui`（现为**阻断式**）——既有失败已在 `vitest.config.ts` 中通过 `// #8618` 跟踪注释明确排除；新失败将导致作业失败。
- `check:secrets`（gitleaks，阻断式棘轮，冻结于 3 个已记录的误报）——将这 3 项加入允许列表以降至 0，或将其降级为建议性检查。它与 GitHub 原生 secret-scanning + `check:public-creds` 重叠。
- `check:pr-evidence`（阻断式，使用 grep 检查 PR 正文）——误报风险较高；若移除，将削弱对硬性规则 #18 的执行，因此这确实需要策略决策。
- `semgrep`（独立的建议性检查）——在 OWASP 类别方面与 CodeQL 重叠；将其基线接入棘轮机制，或将其移除。

---

## 相关文档

- 供应链（来源证明、SBOM、Trivy、Scorecard）：[`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 键集合一致性门禁

`scripts/i18n/check-key-completeness.mjs`（`npm run i18n:check-keys`，作业 `i18n-ui-coverage`）。
将每个 `src/i18n/messages/<locale>.json` 的叶子键集合与 `en.json` 进行比较，只要存在缺失或多余的叶子键就会失败，而不考虑该键是何时添加的。`__MISSING__:` 占位符
会被视为键已存在（其内容由比例门禁负责检查）。它是另外两个基于差异/百分比的门禁的绝对补充：`check-ui-keys-coverage` 对每个区域设置强制执行 80% 的下限
（约 13,000 个键中缺失 43 个时仍会显示为 99.7%），而 `check-new-key-coverage` 只检查
PR 添加到 `en.json` 中的键。区域设置批次是基于其分支切出当天的 `en.json` 生成的，
并会持续翻译数日，而基础分支仍在不断添加键；批次 PR 本身不会添加任何键，因此，当批次 1（#13044）合并时，九个区域设置缺少 43 个键；批次 2（#13660）合并时，八个区域设置缺少 10 个键（2026-09-15），两个同级门禁均未发出警报。可使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` 修复失败；`extra` 叶子键
表示源语言中已将其删除——请从相应区域设置中删除该键。`--warn` 仅报告问题而不会使检查失败。
`--catalog=cli` 对 `bin/cli/locales` 执行相同的比较（`npm run i18n:check-keys:cli`）；
这两个步骤都位于作业 `i18n-ui-coverage` 中。

#### `check-new-key-coverage` — 新键 i18n 门禁

`check-ui-value-drift` 的同级门禁。后者用于捕获英文值被**重写**但其翻译未同步更新的情况；本门禁用于捕获英文键被**添加**但部分区域设置从未收到该键的情况。

`check-ui-keys-coverage` 无法发现此类问题：它对每个区域设置强制执行百分比下限，而在约 13,000 个叶子键中缺少 11 个键时，覆盖率仍为 99.9%。每种语言的百分比无法表达“此功能发布时未翻译”——整个功能可能在新的区域设置中完全没有文本，却根本不会改变该数字。

它所记录的事故如下：Orchestration Canvas 的第 3 阶段在当时已有的 42 个区域设置中翻译了其 11 个键。几小时后，欧盟语言批次（#13044）将仓库扩展到 51 个区域设置，而新增的九个区域设置（`el`、`et`、`ga`、`hr`、`lt`、`lv`、`mt`、`sl`、`sr`）从未收到这些键。`deepMergeFallback` 会用英文替代缺失的键，因此故障表现为 UI 未翻译，而非 UI 空白——这是一个真实存在且在设计上不会发出警报的问题。

与其同级门禁一样，它也**感知差异**，会将合并基点处的英文内容与工作树进行比较，因此预先存在的缺口会保持冻结，启用该门禁无需进行迁移。

**`__MISSING__:<english>` 标记无法通过此门禁（自 2026-09-17 起）。** 它过去是文档中规定的延期处理方式——运行时会回退到正确的英文——直到 2026-09-16 的八个功能 PR 添加了 61 个键，却没有进行翻译，而是将该标记写入全部 65 个区域设置中：此门禁接受了所有这些标记，没有任何检查阻止这些 PR，随后阻塞式真实翻译比例门禁在发布分支顶端对所有人失败（pt-BR 3.2% > 2.5% + 0.5）。现在，标记会被判定为缺失翻译。可使用
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` 修复失败，也可使用 `npm run i18n:translate-new-keys`（`scripts/i18n/translate-new-keys.sh`，
可安全地脱离终端运行；如果没有 `OMNIROUTE_TRANSLATION_*` 环境变量则拒绝启动）并行处理所有区域设置。必须保留英文的键（固定的产品/引擎/标志名称）应放入 `scripts/i18n/untranslatable-keys.json`，
绝不能隐藏在标记后。`vi` 完全禁止使用标记（`tests/unit/i18n-vi-completeness.test.ts`）。

#### `check-vitest-exclusions` — 暂停测试门禁

`vitest.config.ts` 的 `exclude` 列表中的文件是不会运行的测试，而对于查看代码树的人而言，它看起来却像是覆盖率的一部分。共有 62 个文件堆积在注释
`// #8618 — 修复后移除此排除项的既有故障` 之后。问题 #8618 已于
2026-08-11 关闭，但其跟踪的列表却从 45 项增长到 62 项，每个新增项都继承了指向一个已关闭问题的注释。最终逐个文件测量该列表时（#13204），**62 个文件中有 51 个无需更改任何源代码便可针对当前代码树通过测试**。

该门禁要求每个可解析为真实文件的排除项都必须 (a) 指明一个跟踪问题，并且
(b) 出现在 `config/quality/vitest-exclusions.json` 中并附带其测量状态，因此，添加排除项会成为专用文件中可审查的差异，而不是在包含 60 项的数组中再添加一行。它刻意不会重新运行被排除的测试——这需要约 10 分钟，应由周期性作业负责；清单会记录每个测试上次测量的时间。
