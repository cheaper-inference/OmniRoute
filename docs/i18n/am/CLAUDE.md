# CLAUDE.md (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ሁሉም የፕሮጀክት ደንቦች በ [`AGENTS.md`](AGENTS.md) ውስጥ ይኖራሉ** ለእያንዳንዱ AI ረዳት ነጠላ የእውነት ምንጭ — ; ከላይ ያለው ማስመጣት ቀድሞውኑ ይጭነዋል. የፕሮጀክት ደንቦችን እዚህ እንደገና አይጨምሩ። ከዚህ በታች ያለው ሁሉም ነገር ONLY ለ Claude ኮድ — ይተገበራል የሕግ ማሻሻያ አስቀድሞ በ `AGENTS.md` ውስጥ የተገለጹ።

## Worktree ማግለል — Claude ኮድ ዝርዝር

- አስቀድመው ካልነገሩህ በቀር የመሠረቱን ቅርንጫፍ ከኦፕሬተር ጋር በ `AskUserQuestion` (Hard Rule #19) ያረጋግጡ።
- የሥራውን ዛፍ በ `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ይፍጠሩ (በ `.claude/worktrees/` ስር ያረፈ ነው ፣ ሃርድ-ሊንኮች `node_modules` እና `.husky/_` ቅጂዎች) ፣ ከዚያ `EnterWorktree` በ `path` ይደውሉ። ሁልጊዜ መሰረቱን ይለፉ: ያለሱ ስክሪፕቱ ከፍተኛውን `release/*` ይመርጣል, ይህም ኦፕሬተሩ ያረጋገጠው ላይሆን ይችላል. `EnterWorktree` በራሱ የሚፈጥረው የስራ ዛፍ ሃርድ ሊንኮችም ሆነ መንጠቆዎች የሉትም ስለዚህ ምንም ቅድመ ቁርጠኝነት በር አይሰራም።

## ንዑስ ወኪሎች እና git

Git (የወኪል መሳሪያ ወይም የስራ ፍሰት ስክሪፕት)ን የሚነካ እያንዳንዱ ንዑስ ወኪል በፍጥነት — የ Hard Rule #22 a's `git stash` እገዳን በቃል ያገኛል።

## ቅርሶችን ማቀድ — ልዕለ ኃያላን መንገድ ይሽራል።

የኃያላን ችሎታዎች በ `docs/superpowers/plans/`፣ `docs/superpowers/specs/` እና `docs/research/` ስር ያሉ ነባሪዎችን ያስታውቃሉ። ከመጻፍዎ በፊት እያንዳንዱን ወደ `_tasks/` አቻው በ `AGENTS.md` → "እቅድ እና ምርምር ቅርሶች" እንደገና ይፃፉ እና በ `git -C _tasks …` ያስገቡት፣ በጭራሽ በዋናው መዝገብ ውስጥ።

## ፋይሎችን ቧጨራ — `_artifacts/` እንጂ `/tmp` አይደለም።

ይህ ፕሮጀክት የመታጠቂያውን ክፍለ ጊዜ ጭረት ሰሌዳ (`/tmp/claude-*/…`) ይሽራል። ጊዜያዊ ፋይሎችን ይፃፉ — ወደ ውጭ የሚላኩ፣ የመነጩ ዚፕዎች፣ የአንድ ጊዜ መካከለኛ ውጤቶች — ወደ `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: የጂቲግኖይድ ስርወ `_*` መንገድ፣ ስለዚህ ኦፕሬተሩ ሁሉንም ጭረቶች በአንድ ቦታ አግኝቶ ይሰርዛል። ዘላቂ ዕቅዶች፣ ዝርዝር መግለጫዎች፣ ጥናትና ምርምሮች በምትኩ ወደ `_tasks/` ይሄዳሉ (Hard Rule #23)።

## ቀይ መሠረት

የተከማቸ ቀይ ሁኔታን ለማፍሰስ (ቤዝ ቲፕ + ቀይ PRs)፣ የ `/sweep-reds` ችሎታን ይጠቀሙ።
