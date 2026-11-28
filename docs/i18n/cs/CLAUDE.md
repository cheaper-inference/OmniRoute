# CLAUDE.md (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Všechna pravidla projektu žijí v [`AGENTS.md`](AGENTS.md)** — jediný zdroj pravdy pro každého asistenta AI ; výše uvedený import jej již načte. Zde znovu nepřidávejte pravidla projektu. Vše níže platí ONLY na Claude Provozní upřesnění kódu — pravidel již definovaných v `AGENTS.md`.

## Izolace pracovního stromu — Claude Specifika kódu

- Potvrďte základní větev u operátora prostřednictvím `AskUserQuestion` (Hard Rule #19), pokud vám to již neřekl.
- Vytvořte pracovní strom pomocí `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (přistane pod `.claude/worktrees/`, pevně připojí `node_modules` a zkopíruje `.husky/_`), poté zavolejte `EnterWorktree` pomocí jeho `path`. Vždy předejte základ: bez něj skript vybere nejvyšší `release/*`, což nemusí být to, které operátor potvrdil. Pracovní strom, který `EnterWorktree` vytvoří sám, nemá ani pevné odkazy, ani háky, takže v něm neběží žádná brána před potvrzením.

## Subagenty a git

Každý subagent, který se dotkne git (nástroj agenta nebo skript Workflow), dostane ve své výzvě doslovně zákaz #22 a `git stash` — zaznamenané opakování incidentu s skrýší přišlo přes subagenta.

## Plánovací artefakty přepisují cestu superschopností —

Schopnosti superschopnosti oznamují výchozí hodnoty pod `docs/superpowers/plans/`, `docs/superpowers/specs/` a `docs/research/`. Před zápisem každý přepište na jeho ekvivalent `_tasks/` v `AGENTS.md` → "Plánování a výzkum artefaktů" a potvrďte je pomocí `git -C _tasks …`, nikdy v hlavním repo.

## Scratch soubory — `_artifacts/`, ne `/tmp`

Tento projekt přepíše zápisník relace svazku (`/tmp/claude-*/…`). Zápis dočasných souborů exporty —, generované zipy, jednorázové mezivýstupy — až `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorovaná kořenová cesta `_*`, takže operátor najde a odstraní všechny škrábance na jednom místě. Odolné plány, specifikace, výzkum a předání jdou místo toho do `_tasks/` (tvrdé pravidlo #23).

## Červená základna

Chcete-li vypustit nahromaděný červený stav (základní hrot + červená PRs), použijte dovednost `/sweep-reds`.
