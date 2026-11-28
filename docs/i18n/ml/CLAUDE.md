# CLAUDE.md (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**എല്ലാ പ്രോജക്റ്റ് നിയമങ്ങളും [`AGENTS.md`](AGENTS.md) യിൽ താമസിക്കുന്നു** ഓരോ AI അസിസ്റ്റൻ്റിനുമുള്ള സത്യത്തിൻ്റെ ഏക ഉറവിടം — ; മുകളിലുള്ള ഇറക്കുമതി ഇതിനകം തന്നെ ലോഡ് ചെയ്യുന്നു. ഇവിടെ പദ്ധതി നിയമങ്ങൾ വീണ്ടും ചേർക്കരുത്. ചുവടെയുള്ള എല്ലാം Claude കോഡിന് ONLY ബാധകമാണ് — `AGENTS.md` ൽ ഇതിനകം നിർവചിച്ചിട്ടുള്ള നിയമങ്ങളുടെ പ്രവർത്തന പരിഷ്കരണങ്ങൾ.

## വർക്ക്ട്രീ ഐസൊലേഷൻ — Claude കോഡിൻ്റെ പ്രത്യേകതകൾ

- `AskUserQuestion` (ഹാർഡ് റൂൾ #19) വഴി ഓപ്പറേറ്ററുമായി അടിസ്ഥാന ബ്രാഞ്ച് സ്ഥിരീകരിക്കുക, അവർ ഇതിനകം നിങ്ങളോട് പറഞ്ഞിട്ടില്ലെങ്കിൽ.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ഉപയോഗിച്ച് വർക്ക്ട്രീ സൃഷ്ടിക്കുക (അത് `.claude/worktrees/` കീഴിലാകുന്നു, ഹാർഡ്-ലിങ്കുകൾ `node_modules`, പകർപ്പുകൾ `.husky/_`), തുടർന്ന് `EnterWorktree` അതിൻ്റെ `path` ഉപയോഗിച്ച് വിളിക്കുക. എല്ലായ്പ്പോഴും അടിസ്ഥാനം കൈമാറുക: ഇത് കൂടാതെ സ്ക്രിപ്റ്റ് ഏറ്റവും ഉയർന്ന `release/*` തിരഞ്ഞെടുക്കുന്നു, അത് ഓപ്പറേറ്റർ സ്ഥിരീകരിച്ച ഒന്നായിരിക്കില്ല. `EnterWorktree` സ്വയം സൃഷ്ടിക്കുന്ന ഒരു വർക്ക്ട്രീയ്ക്ക് ഹാർഡ് ലിങ്കുകളോ കൊളുത്തുകളോ ഇല്ല, അതിനാൽ അതിൽ പ്രീ-കമ്മിറ്റ് ഗേറ്റൊന്നും പ്രവർത്തിക്കുന്നില്ല.

## ഉപഘടകങ്ങളും ജിറ്റും

git (ഏജൻ്റ് ടൂൾ അല്ലെങ്കിൽ വർക്ക്ഫ്ലോ സ്ക്രിപ്റ്റ്) സ്പർശിക്കുന്ന എല്ലാ ഉപഘടകത്തിനും ഹാർഡ് റൂൾ #22 a യുടെ `git stash` നിരോധനം അതിൻ്റെ പ്രോംപ്റ്റ് — ൽ പദാനുപദമായി ലഭിക്കുന്നു, സ്റ്റാഷ് സംഭവത്തിൻ്റെ റെക്കോർഡ് ആവർത്തനം ഒരു സബ്ജൻ്റ് വഴിയാണ് വന്നത്.

## ആസൂത്രണ പുരാവസ്തുക്കൾ — സൂപ്പർ പവർ പാത മറികടക്കുന്നു

സൂപ്പർ പവർ കഴിവുകൾ `docs/superpowers/plans/`, `docs/superpowers/specs/`, `docs/research/` എന്നിവയ്ക്ക് കീഴിലുള്ള ഡിഫോൾട്ടുകൾ പ്രഖ്യാപിക്കുന്നു. എഴുതുന്നതിന് മുമ്പ് ഓരോന്നും അതിൻ്റെ `_tasks/` തുല്യമായ `AGENTS.md` → "പ്ലാനിംഗ് & റിസർച്ച് ആർട്ടിഫാക്റ്റുകൾ" എന്നതിലേക്ക് മാറ്റിയെഴുതുക, പ്രധാന റിപ്പോയിലൊരിക്കലും `git -C _tasks …` ഉപയോഗിച്ച് അത് സമർപ്പിക്കുക.

## സ്ക്രാച്ച് ഫയലുകൾ — `_artifacts/`, `/tmp` അല്ല

ഈ പ്രോജക്റ്റ് ഹാർനെസിൻ്റെ സെഷൻ സ്ക്രാച്ച്പാഡ് (`/tmp/claude-*/…`) അസാധുവാക്കുന്നു. താൽക്കാലിക ഫയലുകൾ — കയറ്റുമതി, ജനറേറ്റഡ് സിപ്പുകൾ, ഒറ്റത്തവണ ഇൻ്റർമീഡിയറ്റ് ഔട്ട്പുട്ടുകൾ — `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` എഴുതുക : ഒരു gitignored root `_*` പാത്ത്, അതിനാൽ ഓപ്പറേറ്റർ എല്ലാ സ്ക്രാച്ചുകളും ഒരിടത്ത് കണ്ടെത്തി ഇല്ലാതാക്കുന്നു. ഡ്യൂറബിൾ പ്ലാനുകളും സ്പെസിഫിക്കേഷനുകളും ഗവേഷണങ്ങളും ഹാൻഡ്-ഓഫുകളും പകരം `_tasks/` ലേക്ക് പോകുന്നു (ഹാർഡ് റൂൾ #23).

## ചുവന്ന അടിത്തറ

ഒരു കുമിഞ്ഞുകൂടിയ ചുവന്ന അവസ്ഥ (ബേസ് ടിപ്പ് + റെഡ് PRs) കളയാൻ, `/sweep-reds` വൈദഗ്ദ്ധ്യം ഉപയോഗിക്കുക.
