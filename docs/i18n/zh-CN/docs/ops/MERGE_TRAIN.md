# Merge Queue & Manual Merge-Train Runbook (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## 登陆发布分支

全队列管理着`release/vX.Y.Z`的登陆。在登陆PR之前，请阅读默认分支上`config/merge-queue/config.json`中的顶级`mode` 。请参阅[全方位队列](OMNI_QUEUE.md)。

- **`shadow`**运行验证并将登陆留给手动合并。将`omni-queue`应用到批准的PR最后一个头。使用`npm run queue -- why <PR>`检查资格。等待`npm run queue -- history --base <branch>`那个头的判决。继续`would-land`。在`culprit-found`或`would-dequeue`上，保留合并并修复原因。
- **阴影异常。**相对于当前基本提示具有绿色完整CI列车可以继续行驶，而无需单独的队列判决。当PR头已包含当前基尖时，同样的例外情况也适用。
- **`live`**使用`omni-queue`标签触发登陆。队列单独登陆PR。将合并命令和直接推送保留到队列中。

每次着陆都需要业主的授权和适用的必要检查。仅在业主授权登陆后才可申请`omni-queue` 。接触受保护路径的排队PRs还需要所有者对该PR进行`protected-approved`决策。

“活动版本需要绿色大门”规则集需要头部有绿色`Gate / CI`和`Gate / Quality` 。切勿使用`--admin`绕过红色大门。发布冻结块合并到冻结分支中。参见[硬性规则 21](HARD_RULES_DETAIL.md) 。切勿标记、合并或推送另一个会话正在运行的拉取请求。参见[硬性规则 22](HARD_RULES_DETAIL.md) 。

## 火车拉动请求

1. 在当前版本的基础尖端启动一个火车分支。使用合并提交来集成确切批准的成员头。通过避免挤压和变基来保留他们的提交历史记录。
2. 为火车分支打开一个拉取请求。在当前基本提示上使用其自己的完整CI验证该PR 。着陆前重新检查底座尖端和经批准的成员头。当经过验证的候选者发生变化时，刷新列车及其CI 。
3. 在适用的队列模式下使用合并提交来登陆PR 。在实时模式下，队列的`merge-ff`登陆方法会保留合并提交。原始成员头可以从发布分支访问。 GitHub将成员PRs标记为已合并，并且提交保留其作者。

一个公共示例是[PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071) 。它合并了 18 位PRs成员，并于 2026 年 11 月 24 日进行了合并提交。

从`main`到下一个发布分支的同步也通过合并提交实现。稍后同步需要保留`main`祖先。请参阅[工作树隔离](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash)。

## 本地合并训练验证器

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

验证器获取基本头和PR头并将它们组合在一次性工作树中。它在生成的树上运行一次奇偶校验套件。失败的头获取或合并冲突会弹出该PR ，并且脚本继续处理剩余的PRs。

- **`--plan`**打印所选模式的步骤并退出，无需创建工作树或联系遥控器。与`--fast`结合起来检查快速计划。
- **`--fast`**运行常见的静态门、 `tests/unit/`和`npm run test:vitest`下选定的已更改`node:test`文件。使用快速模式时，每天至少对累积小费运行一次完整的本地验证。
- **完整模式**添加纯静态门并运行`npm run test:unit`和`npm run test:vitest`。

如果基础探针可用，则在未触及的基础上重新运行失败的静态门。该脚本会报告继承的故障，并在每个已识别的违规行也出现在基础上并且总计数未增加时继续。

| 出口 | 意义                                                                                   |
| ---- | -------------------------------------------------------------------------------------- |
| `0`  | 打印计划或完成套件。套件摘要列出了所有继承的静态故障和弹出的PRs。                      |
| `1`  | 参数无效、没有 Git 签出、预检失败或没有登上PR 。                                       |
| `2`  | 套件检查失败，不符合继承条件。操作员可以将批次一分为二，弹出有问题的PR，然后重新运行。 |

本地通行证仅为所有者的档案提供诊断证据。每次登陆仍然需要所有者授权、其自己所需的检查以及影子队列判决（如果适用）。

## 分层

- **根据PR。** CI和 Quality 选择基于更改的路径进行检查。代码PRs运行快速质量门和受影响的测试，并在CI中使用单独的单元和Vitest作业。
- **每个队列候选人。** CI和 Quality 在其队列引用上运行组合候选者的完整配置文件。
- **每个发布提示。** Release-Green 在与其路径过滤器匹配的推送上运行快速硬门。每天 3 次计划的运行使用发布分支的全面扫描。
- **每个版本。**完整的CI矩阵包括E2E分片、包验证、tarball 引导烟雾和覆盖率检查。请[参阅发布清单](RELEASE_CHECKLIST.md)。

## `merge-train.sh`新鲜结帐先决条件

预检在创建工作树之前运行。使用`npm ci`安装依赖项。确认`node_modules/.bin/tsc`可执行并且`node_modules/node_modules`不存在。检查`node_modules/.bin/bun --version`是否成功。

如果跳过Bun安装后，请运行`(cd node_modules/bun && node install.js)`。提供者一致性和已知符号检查使用Bun。验证器将`npm run check:cycles:ratchet`作为阻塞门运行。独立的`npm run check:cycles`命令是建议性的。

## 历史

Mergify 合并队列已于 2026 年 11 月 19 日停用。
