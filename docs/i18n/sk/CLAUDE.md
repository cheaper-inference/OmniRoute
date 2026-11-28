# CLAUDE.md (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Všetky pravidlá projektu žijú v [`AGENTS.md`](AGENTS.md)** — jediný zdroj pravdy pre každého asistenta AI ; vyššie uvedený import ho už načítava. Nepridávajte sem pravidlá projektu. Všetko nižšie platí ONLY na Claude Kód — prevádzkové vylepšenia pravidiel už definovaných v `AGENTS.md`.

## Izolácia pracovného stromu — Claude Špecifiká kódu

- Potvrďte základnú vetvu u operátora cez `AskUserQuestion` (Hard Rule #19), pokiaľ vám to už nepovedal.
- Vytvorte pracovný strom pomocou `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (pristane pod `.claude/worktrees/`, prepojí `node_modules` a skopíruje `.husky/_`), potom zavolajte `EnterWorktree` s jeho `path`. Vždy prejdite základom: bez neho skript vyberie najvyššie `release/*`, čo nemusí byť to, ktoré operátor potvrdil. Pracovný strom, ktorý `EnterWorktree` vytvorí sám, nemá ani pevné články, ani háčiky, takže v ňom nebeží žiadna predbežná brána.

## Subagenty a git

Každý podagent, ktorý sa dotkne git (nástroj agenta alebo skript pracovného toku), dostane doslovný zákaz #22 a `git stash` vo svojej výzve — zaznamenané opakovanie incidentu so skrýšou prišlo cez podagenta.

## Plánovanie artefaktov prepíše cestu superschopností —

Superschopnosti oznamujú predvolené hodnoty pod `docs/superpowers/plans/`, `docs/superpowers/specs/` a `docs/research/`. Pred zápisom prepíšte každý na jeho ekvivalent `_tasks/` v `AGENTS.md` → „Plánovanie a výskum artefaktov“ a potvrďte ho pomocou `git -C _tasks …`, nikdy nie v hlavnom repo.

## Scratch súbory — `_artifacts/`, nie `/tmp`

Tento projekt prepíše zápisník relácie relácie (`/tmp/claude-*/…`). Zapisujte dočasné súbory exporty —, generované zipsy, jednorazové prechodné výstupy — až `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorovaná koreňová cesta `_*`, takže operátor nájde a odstráni všetky škrabance na jednom mieste. Odolné plány, špecifikácie, výskum a odovzdania idú namiesto toho do `_tasks/` (Hard Rule #23).

## Červená základňa

Ak chcete vypustiť nahromadený červený stav (základná špička + červená PRs), použite zručnosť `/sweep-reds`.
