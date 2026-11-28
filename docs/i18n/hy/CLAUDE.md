# CLAUDE.md (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Ծրագրի բոլոր կանոնները ապրում են [`AGENTS.md`](AGENTS.md) ում** — ճշմարտության միակ աղբյուրը AI յուրաքանչյուր օգնականի համար. վերևում ներմուծումն արդեն բեռնում է այն: Այստեղ նորից մի ավելացրեք նախագծի կանոնները: Ստորև բերված ամեն ինչ վերաբերում է ONLY ին Claude Code — գործառնական ճշգրտումներին, որոնք արդեն սահմանված են `AGENTS.md` ում:

## Worktree մեկուսացում — Claude օրենսգրքի առանձնահատկությունները

- Հաստատեք բազային ճյուղը օպերատորի հետ `AskUserQuestion` (Hard Rule #19) միջոցով, եթե նրանք արդեն ձեզ չեն ասել:
- Ստեղծեք աշխատանքային ծառը `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ով (այն ընկնում է `.claude/worktrees/` տակ, կոշտ հղումներ է անում `node_modules` և պատճենում `.husky/_`), այնուհետև կանչեք `EnterWorktree` իր `path`: Միշտ անցեք բազան. առանց դրա սկրիպտը ընտրում է ամենաբարձր `release/*`, որը չի կարող լինել այն, ինչ հաստատել է օպերատորը: Աշխատանքային ծառը, որն ինքն իրեն ստեղծում է `EnterWorktree`, չունի ոչ կոշտ կապեր, ոչ էլ կեռիկներ, այնպես որ դրա մեջ ոչ մի նախահաստատման դարպաս չի անցնում:

## Subagents եւ git

Յուրաքանչյուր ենթագենտ, որը դիպչում է git-ին (Գործակալի գործիք կամ Workflow script) ստանում է Hard Rule #22 a-ի `git stash` արգելքը բառացիորեն իր հուշման մեջ — գաղտնի միջադեպի գրանցված կրկնությունը տեղի է ունեցել ենթագենտի միջոցով:

## Պլանավորման արտեֆակտներ — superpowers ուղին անտեսում է

Գերտերությունների հմտությունները հայտարարում են լռելյայններ `docs/superpowers/plans/`, `docs/superpowers/specs/` և `docs/research/` ներքո: Գրելուց առաջ յուրաքանչյուրը վերագրեք իր `_tasks/` համարժեքին `AGENTS.md` → «Planning & Research Artifacts»-ում և կատարեք այն `git -C _tasks …` ով, երբեք հիմնական ռեպոում:

## Scratch ֆայլեր — `_artifacts/`, ոչ թե `/tmp`

Այս նախագիծը անտեսում է ամրագոտիների նստաշրջանի քերծվածքը (`/tmp/claude-*/…`): Գրեք ժամանակավոր ֆայլեր — արտահանում, գեներացված zips, միանվագ միջանկյալ ելքեր — ից `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`. անտեսված արմատ `_*` ուղի, այնպես որ օպերատորը գտնի և ջնջի բոլոր քերծվածքները մեկ տեղում: Փոխարենը դիմացկուն պլանները, ակնոցները, հետազոտությունները և հանձնումները գնում են `_tasks/` ին (Hard Rule #23):

## Կարմիր հիմք

Կուտակված կարմիր վիճակը չորացնելու համար (հիմնական ծայրը + red PRs), օգտագործեք `/sweep-reds` հմտությունը:
