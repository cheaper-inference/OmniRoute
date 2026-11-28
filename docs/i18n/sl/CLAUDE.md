# CLAUDE.md (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Vsa pravila projekta so v [`AGENTS.md`](AGENTS.md)** — edini vir resnice za vsakega pomočnika AI ; zgornji uvoz ga že naloži. Tukaj ne dodajajte znova projektnih pravil. Vse spodaj velja ONLY za Claude Koda — operativne izboljšave pravil, že definiranih v `AGENTS.md`.

## Izolacija delovnega drevesa — Claude Posebnosti kode

- Potrdite osnovno vejo pri operaterju prek `AskUserQuestion` (Hard Rule #19), razen če vam je že povedal.
- Ustvarite delovno drevo z `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (pristane pod `.claude/worktrees/`, trdo poveže `node_modules` in kopira `.husky/_`), nato pokličite `EnterWorktree` z njegovim `path`. Vedno posredujte osnovo: brez nje skript izbere najvišji `release/*`, ki morda ni tisti, ki ga je potrdil operater. Delovno drevo, ki ga `EnterWorktree` ustvari sam, nima niti trdih povezav niti kavljev, zato v njem ne tečejo vrata pred potrditvijo.

## Subagenti in git

Vsak podagent, ki se dotakne git (agentskega orodja ali skripta poteka dela), dobi dobesedno prepoved `git stash` Hard Rule #22 a v svojem pozivu — zabeležena ponovitev incidenta s shranjevanjem je prišla prek podagenta.

## Načrtovanje artefaktov — superpowers pot preglasi

Spretnosti velemoči napovedujejo privzete vrednosti pod `docs/superpowers/plans/`, `docs/superpowers/specs/` in `docs/research/`. Prepišite vsakega v njegov ekvivalent `_tasks/` v `AGENTS.md` → "Artefakti načrtovanja in raziskovanja" pred pisanjem in ga potrdite z `git -C _tasks …`, nikoli v glavnem repoju.

## Scratch datoteke — `_artifacts/`, ne `/tmp`

Ta projekt preglasi scratchpad seje kabelskega snopa (`/tmp/claude-*/…`). Pisanje začasnih datotek — izvozi, ustvarjeni zip, enkratni vmesni izhodi — v `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignorirana korenska pot `_*`, tako da operater najde in izbriše vse praske na enem mestu. Trajni načrti, specifikacije, raziskave in predaje gredo namesto tega v `_tasks/` (Hard Rule #23).

## Rdeča podlaga

Če želite izprazniti nakopičeno rdeče stanje (osnovna konica + rdeče PRs), uporabite spretnost `/sweep-reds`.
