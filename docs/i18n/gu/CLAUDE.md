# CLAUDE.md (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**બધા પ્રોજેક્ટ નિયમો [`AGENTS.md`](AGENTS.md) માં રહે છે** — દરેક AI સહાયક માટે સત્યનો એકમાત્ર સ્ત્રોત છે; ઉપરની આયાત પહેલાથી જ તેને લોડ કરે છે. અહીં પ્રોજેક્ટ નિયમો ફરીથી ઉમેરશો નહીં. નીચેની દરેક વસ્તુ Claude કોડ પર ONLY લાગુ પડે છે `AGENTS.md` માં પહેલેથી જ વ્યાખ્યાયિત નિયમોના — ઓપરેશનલ રિફાઇનમેન્ટ્સ.

## વર્કટ્રી આઇસોલેશન — Claude કોડ સ્પષ્ટીકરણો

- `AskUserQuestion` (હાર્ડ રૂલ #19) દ્વારા ઓપરેટર સાથે બેઝ બ્રાન્ચની પુષ્ટિ કરો સિવાય કે તેઓએ તમને પહેલેથી જ કહ્યું હોય.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` સાથે વર્કટ્રી બનાવો (તે `.claude/worktrees/` હેઠળ આવે છે, હાર્ડ-લિંક `node_modules` અને `.husky/_` ની નકલ કરે છે), પછી `EnterWorktree` તેના `path` સાથે કૉલ કરો. હંમેશા આધાર પસાર કરો: તેના વિના સ્ક્રિપ્ટ સૌથી વધુ `release/*` પસંદ કરે છે, જે ઓપરેટરે પુષ્ટિ કરી હોય તેવું ન પણ હોઈ શકે. એક વર્કટ્રી કે જે `EnterWorktree` પોતે બનાવે છે તેમાં ન તો હાર્ડ લિંક્સ હોય છે કે ન તો હુક્સ, તેથી તેમાં કોઈ પ્રી-કમિટ ગેટ ચાલતો નથી.

## સબજેન્ટ્સ અને ગિટ

ગિટ (એજન્ટ ટૂલ અથવા વર્કફ્લો સ્ક્રિપ્ટ) ને સ્પર્શતા દરેક સબએજન્ટને તેના પ્રોમ્પ્ટ — માં સખત નિયમ #22 ના `git stash` પ્રતિબંધ વર્બેટીમ મળે છે જે સબએજન્ટ દ્વારા સ્ટેશ ઘટનાની રેકોર્ડેડ પુનરાવૃત્તિ આવે છે.

## આયોજન આર્ટિફેક્ટ્સ — સુપરપાવર પાથ ઓવરરાઇડ

સુપરપાવર કુશળતા `docs/superpowers/plans/`, `docs/superpowers/specs/` અને `docs/research/` હેઠળ ડિફોલ્ટ જાહેર કરે છે. લખતા પહેલા દરેકને `AGENTS.md` → "પ્લાનિંગ એન્ડ રિસર્ચ આર્ટિફેક્ટ્સ" માં તેના `_tasks/` સમકક્ષ પર ફરીથી લખો અને તેને `git -C _tasks …` સાથે પ્રતિબદ્ધ કરો, મુખ્ય રેપોમાં ક્યારેય નહીં.

## સ્ક્રેચ ફાઇલો — `_artifacts/`, `/tmp` નહીં

આ પ્રોજેક્ટ હાર્નેસના સત્ર સ્ક્રેચપેડ (`/tmp/claude-*/…`) ને ઓવરરાઇડ કરે છે. અસ્થાયી ફાઇલો લખો — નિકાસ, જનરેટેડ ઝિપ્સ, વન-ઑફ ઇન્ટરમીડિયેટ આઉટપુટ — થી `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: એક gitignored રુટ `_*` પાથ, જેથી ઑપરેટર એક જ જગ્યાએ તમામ સ્ક્રેચ શોધી અને કાઢી નાખે. ટકાઉ યોજનાઓ, સ્પેક્સ, સંશોધન અને હેન્ડ-ઓફ તેના બદલે `_tasks/` પર જાય છે (હાર્ડ રૂલ #23).

## લાલ આધાર

સંચિત લાલ સ્થિતિ (બેઝ ટીપ + રેડ PRs) કાઢવા માટે, `/sweep-reds` કૌશલ્યનો ઉપયોગ કરો.
