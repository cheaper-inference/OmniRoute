# CLAUDE.md (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**所有项目规则都在[`AGENTS.md`](AGENTS.md)中**—每个AI助理的单一事实来源；上面的导入已经加载了它。不要在此处重新添加项目规则。下面的所有内容都将ONLY应用于Claude代码—对`AGENTS.md`中已定义的规则进行操作细化。

## 工作树隔离— Claude代码细节

- 通过`AskUserQuestion` （硬规则#19）与操作员确认基本分支，除非他们已经告诉你了。
- 使用`scripts/dev/new-worktree.sh <branch> <confirmed-base>`创建工作树（它位于`.claude/worktrees/`下，硬链接`node_modules`并复制`.husky/_`），然后使用其`path`调用`EnterWorktree` 。始终传递基值：如果没有它，脚本会选择最高的`release/*`，这可能不是操作员确认的值。 `EnterWorktree`自己创建的工作树既没有硬链接也没有钩子，因此其中没有预提交门运行。

## 子代理和 git

每个接触 git（代理工具或工作流程脚本）的子代理都会在其提示符中逐字获得硬规则#22 a 的`git stash`禁令—记录的存储事件的重复发生来自子代理。

## 规划工件—超能力路径覆盖

超能力技能在`docs/superpowers/plans/`、 `docs/superpowers/specs/`和`docs/research/`下宣布默认值。在编写之前，将每个重写为`AGENTS.md` → “规划和研究工件”中的`_tasks/`等效项，并使用`git -C _tasks …`提交，而不是在主存储库中提交。

## 暂存文件— `_artifacts/`，而不是`/tmp`

该项目会覆盖线束的会话暂存器 (`/tmp/claude-*/…`)。写入临时文件—导出、生成的 zip、一次性中间输出—到`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`：一个 gitignored 根`_*`路径，因此操作员在一处找到并删除所有暂存。持久的计划、规格、研究和移交都交给`_tasks/` （硬规则#23）。

## 红底

要排出累积的红色状态（基础提示+红色PRs），请使用`/sweep-reds`技能。
