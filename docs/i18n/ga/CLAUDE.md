# CLAUDE.md (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Cónaíonn rialacha uile an tionscadail i [`AGENTS.md`](AGENTS.md)** — an fhoinse amháin fírinne do gach cúntóir AI ; lódálann an t-allmhairiú thuas é cheana féin. Ná cuir rialacha tionscadail leis seo arís. Baineann gach rud thíos le ONLY le Claude Code — mionchoigeartuithe oibríochtúla ar na rialacha atá sainmhínithe cheana féin i `AGENTS.md`.

## Sonraíochtaí Cód leithlisiú Worktree — Claude

- Deimhnigh an bonnbhrainse leis an oibreoir trí `AskUserQuestion` ( Hard Riail #19) mura ndúirt siad leat cheana féin.
- Cruthaigh an crann oibre le `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (tuirlingíonn sé faoi `.claude/worktrees/`, crua-naisc `node_modules` agus cóipeanna `.husky/_`), ansin glaoigh ar `EnterWorktree` lena `path`. Pasáil an bonn i gcónaí: gan é roghnaíonn an script an `release/*` is airde , agus b'fhéidir nach é an ceann a dheimhnigh an t-oibreoir. Níl na naisc chrua ná na crúcaí ag crann oibre a chruthaíonn `EnterWorktree` leis féin, agus mar sin ní ritheann geata réamhthiomanta ann.

## Substaintí agus git

Faigheann gach foghníomhaire a bhaineann le git (Uirlis Ghníomhaire nó script Sreabhadh Oibre) Riail Crua #22 a's `git stash` ban verbatim in its prompt — tháinig atarlú taifeadta na heachtra stash trí fhoghníomhaire.

## Déantáin phleanála sáraíonn cosán superpowers —

Fógraíonn scileanna superpowers mainneachtainí faoi `docs/superpowers/plans/`, `docs/superpowers/specs/` agus `docs/research/`. Athscríobh gach ceann go dtí a choibhéis `_tasks/` in `AGENTS.md` → "Déantúsáin Phleanála & Taighde" sula scríobhann tú é, agus tiomnaigh le `git -C _tasks …`, nach bhfuil sa phríomhrepo riamh.

## Comhaid scratch — `_artifacts/`, ní `/tmp`

Sáraíonn an tionscadal seo scratchpad seisiún an úmacha (`/tmp/claude-*/…`). Scríobh comhaid shealadacha onnmhairí —, zips ginte, aschuir idirmheánacha aonuaire — go `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: cosán fréimhe gitignored `_*`, mar sin aimsíonn agus scriosann an t-oibreoir gach scratch in aon áit amháin. Téann pleananna buan, sonraíochtaí, taighde agus lámhdhírithe go `_tasks/` ina ionad sin (Rail chrua #23).

## Bonn dearg

Chun staid carntha dearg a dhraenáil (bonn tip + red PRs), bain úsáid as an scil `/sweep-reds`.
