# CLAUDE.md (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

@AGENTS.md

**所有項目規則都在[`AGENTS.md`](AGENTS.md)中**—每個AI助理的單一事實來源；上面的導入已經加載了它。不要在此處重新新增項目規則。下面的所有內容都將ONLY應用於Claude程式碼—對`AGENTS.md`中已定義的規則進行操作細化。

## 工作樹隔離— Claude程式碼細節

- 透過`AskUserQuestion` （硬規則#19）與操作員確認基本分支，除非他們已經告訴你了。
- 使用`scripts/dev/new-worktree.sh <branch> <confirmed-base>`建立工作樹（它位於`.claude/worktrees/`下，硬連結`node_modules`並複製`.husky/_`），然後使用其`path`呼叫`EnterWorktree` 。始終傳遞基值：如果沒有它，腳本會選擇最高的`release/*`，這可能不是操作員確認的值。 `EnterWorktree`自己創建的工作樹既沒有硬連結也沒有鉤子，因此其中沒有預先提交門運行。

## 子代理和 git

每個接觸 git（代理工具或工作流程腳本）的子代理都會在其提示符中逐字獲得硬規則#22 a 的`git stash`禁令—記錄的存儲事件的重複發生來自子代理。

## 規劃工件—超能力路徑覆蓋

超能力技能在`docs/superpowers/plans/`、 `docs/superpowers/specs/`和`docs/research/`下宣告預設值。在編寫之前，將每個重寫為`AGENTS.md` → “規劃和研究工件”中的`_tasks/`等效項，並使用`git -C _tasks …`提交，而不是在主存儲庫中提交。

## 暫存檔案— `_artifacts/`，而不是`/tmp`

此項目會覆蓋線束的會話暫存器 (`/tmp/claude-*/…`)。寫入臨時檔案—導出、產生的 zip、一次性中間輸出—到`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`：一個 gitignored 根`_*`路徑，因此操作員在一處找到並刪除所有暫存。持久的計劃、規格、研究和移交都交給`_tasks/` （硬規則#23）。

## 紅底

若要排出累積的紅色狀態（基礎提示+紅色PRs），請使用`/sweep-reds`技能。
