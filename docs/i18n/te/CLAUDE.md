# CLAUDE.md (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**అన్ని ప్రాజెక్ట్ నియమాలు [`AGENTS.md`](AGENTS.md) లో ఉన్నాయి** — ప్రతి AI అసిస్టెంట్కు సత్యం యొక్క ఏకైక మూలం; పై దిగుమతి ఇప్పటికే దానిని లోడ్ చేస్తుంది. ఇక్కడ ప్రాజెక్ట్ నియమాలను మళ్లీ జోడించవద్దు. క్రింద ఉన్న ప్రతిదీ Claude కోడ్ — కి ONLY వర్తిస్తుంది, `AGENTS.md` లో ఇప్పటికే నిర్వచించబడిన నియమాల యొక్క కార్యాచరణ మెరుగుదలలు.

## వర్క్ట్రీ ఐసోలేషన్ — Claude కోడ్ ప్రత్యేకతలు

- `AskUserQuestion` (హార్డ్ రూల్ #19) ద్వారా ఆపరేటర్తో బేస్ బ్రాంచ్ను నిర్ధారించండి, వారు మీకు ఇప్పటికే చెప్పకపోతే.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` తో వర్క్ట్రీని సృష్టించండి (ఇది `.claude/worktrees/` కింద ల్యాండ్ అవుతుంది, హార్డ్-లింక్లు `node_modules` మరియు కాపీలు `.husky/_`), ఆపై `EnterWorktree` దాని `path` తో కాల్ చేయండి. ఎల్లప్పుడూ ఆధారాన్ని పాస్ చేయండి: అది లేకుండా స్క్రిప్ట్ అత్యధిక `release/*` ఎంచుకుంటుంది, ఇది ఆపరేటర్ ధృవీకరించినది కాకపోవచ్చు. `EnterWorktree` స్వయంగా సృష్టించే వర్క్ట్రీకి హార్డ్ లింక్లు లేదా హుక్స్ లేవు, కాబట్టి దానిలో ప్రీ-కమిట్ గేట్ నడుస్తుంది.

## సబ్జెంట్లు మరియు జిట్

git (ఏజెంట్ టూల్ లేదా వర్క్ఫ్లో స్క్రిప్ట్) తాకిన ప్రతి సబ్జెంట్ దాని ప్రాంప్ట్ — లో హార్డ్ రూల్ #22 a యొక్క `git stash` నిషేధాన్ని పదజాలంగా పొందుతుంది.

## ప్లానింగ్ కళాఖండాలు — సూపర్ పవర్స్ పాత్ ఓవర్రైడ్లు

సూపర్ పవర్స్ నైపుణ్యాలు `docs/superpowers/plans/`, `docs/superpowers/specs/` మరియు `docs/research/` కింద డిఫాల్ట్లను ప్రకటిస్తాయి. వ్రాయడానికి ముందు ప్రతి దాని `_tasks/` సమానమైన `AGENTS.md` → "ప్లానింగ్ & రీసెర్చ్ ఆర్టిఫాక్ట్స్"కి తిరిగి వ్రాయండి మరియు ప్రధాన రెపోలో ఎప్పుడూ `git -C _tasks …`.

## స్క్రాచ్ ఫైల్స్ — `_artifacts/`, `/tmp` కాదు

ఈ ప్రాజెక్ట్ జీను యొక్క సెషన్ స్క్రాచ్ప్యాడ్ (`/tmp/claude-*/…`)ను భర్తీ చేస్తుంది. తాత్కాలిక ఫైల్లు — ఎగుమతులు, ఉత్పత్తి చేయబడిన జిప్లు, `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` — : ఒక gitignored root `_*` మార్గం, కాబట్టి ఆపరేటర్ అన్ని స్క్రాచ్లను ఒకే చోట కనుగొని తొలగిస్తుంది. మన్నికైన ప్లాన్లు, స్పెక్స్, రీసెర్చ్ మరియు హ్యాండ్-ఆఫ్లు బదులుగా `_tasks/` కి వెళ్తాయి (హార్డ్ రూల్ #23).

## రెడ్ బేస్

పేరుకుపోయిన ఎరుపు స్థితిని (బేస్ టిప్ + రెడ్ PRs) హరించడానికి, `/sweep-reds` నైపుణ్యాన్ని ఉపయోగించండి.
