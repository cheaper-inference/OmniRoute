# CLAUDE.md (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Gbogbo ise agbese ofin gbe ni [`AGENTS.md`](AGENTS.md)** — orisun otitọ kanṣoṣo fun gbogbo oluranlọwọ AI ; gbe wọle loke tẹlẹ èyà o. Maṣe tun fi awọn ofin ise agbese kun nibi. Ohun gbogbo ti o wa ni isalẹ n kan ONLY si Claude Code — awọn isọdọtun iṣẹ ṣiṣe ti awọn ofin ti ṣe alaye tẹlẹ ni `AGENTS.md`.

## Worktree ipinya — Claude Code pato

- Jẹrisi ẹka ipilẹ pẹlu oniṣẹ nipasẹ `AskUserQuestion` (Hard Rule #19) ayafi ti wọn ba sọ fun ọ tẹlẹ.
- Ṣẹda igi iṣẹ pẹlu `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (o balẹ labẹ `.claude/worktrees/`, awọn ọna asopọ lile `node_modules` ati awọn ẹda `.husky/_`), lẹhinna pe `EnterWorktree` pẹlu `path` rẹ. Nigbagbogbo kọja ipilẹ: laisi rẹ iwe afọwọkọ n yan `release/*` ti o ga julọ, eyiti o le ma jẹ ọkan ti oniṣẹ jẹrisi. Igi iṣẹ kan ti `EnterWorktree` ṣẹda funrararẹ ko ni awọn ọna asopọ lile tabi awọn ìkọ, nitorina ko si ẹnu-ọna iṣaaju-ifaramọ ti n ṣiṣẹ ninu rẹ.

## Subagents ati git

Gbogbo subagent ti o fọwọkan git (Ọpa Aṣoju tabi iwe afọwọkọ Iṣiṣẹ) gba Ofin Lile #22 a's `git stash` ban verbatim ni kiakia — iwifun ti o gbasilẹ ti isẹlẹ isẹlẹ naa wa nipasẹ abẹlẹ kan.

## Gbimọ onisebaye — superpowers ona dojuiwọn

Awọn ọgbọn Superpowers n kede awọn aseku labẹ `docs/superpowers/plans/`, `docs/superpowers/specs/` ati `docs/research/`. Tun ọkọọkan kọ si `_tasks/` rẹ deede ni `AGENTS.md` → "Igbero & Awọn Iṣẹ iṣe Iwadi" ṣaaju ki o to kọ, ki o si ṣe pẹlu `git -C _tasks …`, kii ṣe ni repo akọkọ.

## Yiyọ awọn faili — `_artifacts/`, kii ṣe `/tmp`

Ise agbese yii dojukọ scratchpad igba ijanu (`/tmp/claude-*/…`). Kọ awọn faili igba diẹ — okeere, awọn zips ti ipilẹṣẹ, awọn abajade agbedemeji ọkan-pipa — si `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: ọna gitignored root `_*`, nitorinaa oniṣẹ wa ati paarẹ gbogbo ibere ni aaye kan. Awọn ero ti o tọ, awọn alaye lẹkunrẹrẹ, iwadii ati awọn piparẹ ọwọ lọ si `_tasks/` dipo (Ofin Lile #23).

## Ipilẹ pupa

Lati fa ipo pupa ti o ṣajọpọ (ipilẹ tip + red PRs), lo ọgbọn `/sweep-reds`.
