# CLAUDE.md (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ច្បាប់គម្រោងទាំងអស់រស់នៅក្នុង [`AGENTS.md`](AGENTS.md)** — ប្រភពនៃសេចក្តីពិតតែមួយសម្រាប់គ្រប់ជំនួយការ AI ; ការនាំចូលខាងលើផ្ទុកវារួចហើយ។ កុំបញ្ចូលច្បាប់គម្រោងឡើងវិញនៅទីនេះ។ អ្វីគ្រប់យ៉ាងខាងក្រោមអនុវត្ត ONLY ទៅ Claude Code — ប្រតិបត្តិការកែលម្អនៃច្បាប់ដែលបានកំណត់រួចហើយនៅក្នុង `AGENTS.md`។

## ភាពឯកោ Worktree — Claude កូដជាក់លាក់

- បញ្ជាក់សាខាមូលដ្ឋានជាមួយប្រតិបត្តិករតាមរយៈ `AskUserQuestion` (Hard Rule #19) លុះត្រាតែពួកគេបានប្រាប់អ្នករួចហើយ។
- បង្កើត worktree ជាមួយ `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (វាស្ថិតនៅក្រោម `.claude/worktrees/`, hard-links `node_modules` និង copies `.husky/_`) បន្ទាប់មកហៅ `EnterWorktree` ជាមួយ `path` របស់វា។ តែងតែឆ្លងកាត់មូលដ្ឋាន៖ ដោយគ្មានវា ស្គ្រីបជ្រើសរើស `release/*` ខ្ពស់បំផុត ដែលប្រហែលជាមិនមែនជាអ្វីដែលប្រតិបត្តិករបានបញ្ជាក់នោះទេ។ មែកធាងការងារដែល `EnterWorktree` បង្កើតដោយខ្លួនវាមិនមានតំណភ្ជាប់រឹង ឬទំពក់ទេ ដូច្នេះគ្មានច្រកទ្វារដែលដំណើរការជាមុននៅក្នុងវាទេ។

## Subagents និង git

រាល់ភ្នាក់ងាររងដែលប៉ះ git (Agent tool ឬ Workflow script) ទទួលបាន Hard Rule #22 a's `git stash` ban verbatim in prompt — របស់វា ការកើតឡើងដដែលៗនៃឧប្បត្តិហេតុ stash បានកើតឡើងតាមរយៈ subagent មួយ។

## ការធ្វើផែនការវត្ថុបុរាណ — មហាអំណាចហួសពីផ្លូវ

ជំនាញមហាអំណាចប្រកាសលំនាំដើមក្រោម `docs/superpowers/plans/`, `docs/superpowers/specs/` និង `docs/research/`។ សរសេរឡើងវិញនីមួយៗទៅសមមូល `_tasks/` របស់វានៅក្នុង `AGENTS.md` → "ការធ្វើផែនការ & ស្រាវជ្រាវវត្ថុបុរាណ" មុនពេលសរសេរ ហើយបញ្ចូលវាជាមួយ `git -C _tasks …` ដែលមិនដែលមាននៅក្នុង repo មេ។

## ឯកសារកោស — `_artifacts/` មិនមែន `/tmp` ទេ។

គម្រោងនេះបដិសេធផ្ទាំងកោសនៃសម័យរបស់ខ្សែ (`/tmp/claude-*/…`)។ សរសេរឯកសារបណ្តោះអាសន្ន — នាំចេញ ការបង្ហាប់ដែលបានបង្កើត លទ្ធផលកម្រិតមធ្យមមួយចេញ — ទៅ `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: ផ្លូវ `_*` ឫស gitignored ដូច្នេះប្រតិបត្តិករស្វែងរក និងលុបការកោសទាំងអស់នៅកន្លែងតែមួយ។ ផែនការប្រើប្រាស់បានយូរ លក្ខណៈពិសេស ការស្រាវជ្រាវ និងការប្រគល់ជូនទៅ `_tasks/` ជំនួសវិញ (Hard Rule #23) ។

## មូលដ្ឋានក្រហម

ដើម្បីបង្ហូរស្ថានភាពក្រហមដែលបានបង្គរ (ព័ត៌មានជំនួយមូលដ្ឋាន + ក្រហម PRs) សូមប្រើជំនាញ `/sweep-reds` ។
