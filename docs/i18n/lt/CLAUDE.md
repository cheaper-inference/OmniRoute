# CLAUDE.md (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Visos projekto taisyklės galioja [`AGENTS.md`](AGENTS.md)** — vienintelis tiesos šaltinis kiekvienam AI asistentui; aukščiau esantis importas jau įkelia jį. Nepridėkite čia projekto taisyklių iš naujo. Viskas, kas nurodyta toliau, taikoma ONLY Claude Kodo — operatyviniai taisyklių, jau apibrėžtų `AGENTS.md` patobulinimai.

## Darbo medžio izoliacija — Claude Kodo specifika

- Patvirtinkite pagrindinę šaką su operatoriumi naudodami `AskUserQuestion` (kieta taisyklė #19), nebent jis jums jau pasakė.
- Sukurkite darbo medį naudodami `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (jis patenka į `.claude/worktrees/`, susieja `node_modules` ir nukopijuoja `.husky/_`), tada iškvieskite `EnterWorktree` naudodami `path`. Visada perduokite bazę: be jos scenarijus pasirenka aukščiausią `release/*`, kuris gali būti ne tas, kurį patvirtino operatorius. Darbo medis, kurį `EnterWorktree` sukuria pats, neturi nei kietųjų grandžių, nei kabliukų, todėl jame neveikia išankstinio įsipareigojimo vartai.

## Subagentai ir gitas

Kiekvienas antrinis agentas, paliečiantis git (agento įrankis arba darbo eigos scenarijus), gauna griežtą taisyklę #22 a's `git stash` ban pažodžiui savo greitajame — įrašytas atidėjimo incidento pasikartojimas įvyko per antrinį agentą.

## Planuojant artefaktus — supergalių kelio nepaisoma

Supergalių įgūdžiai skelbia numatytuosius nustatymus pagal `docs/superpowers/plans/`, `docs/superpowers/specs/` ir `docs/research/`. Prieš rašydami perrašykite kiekvieną į savo `_tasks/` atitikmenį `AGENTS.md` → "Planavimo ir tyrimo artefaktai" ir įveskite jį naudodami `git -C _tasks …`, niekada pagrindiniame atpirkimo sandoryje.

## Nubraukite failus — `_artifacts/`, o ne `/tmp`

Šis projektas nepaiso diržų seanso bloknoto (`/tmp/claude-*/…`). Rašykite laikinus failus, — eksportus, sugeneruotus ZIP failus, vienkartinius tarpinius išėjimus — iki `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignore root `_*` kelias, todėl operatorius suranda ir ištrina visus įbrėžimus vienoje vietoje. Ilgalaikiai planai, specifikacijos, tyrimai ir perdavimas nukreipiami į `_tasks/` (kieta taisyklė #23).

## Raudona bazė

Norėdami nusausinti susikaupusią raudoną būseną (bazinis galas + red PRs), naudokite `/sweep-reds` įgūdžius.
