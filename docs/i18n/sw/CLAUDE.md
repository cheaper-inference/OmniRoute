# CLAUDE.md (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Sheria zote za mradi zinaishi katika [`AGENTS.md`](AGENTS.md)** — chanzo kimoja cha ukweli kwa kila msaidizi wa AI ; uagizaji hapo juu tayari unaipakia. Usiongeze tena sheria za mradi hapa. Kila kitu hapa chini kinatumika ONLY kwa Claude Kanuni — uboreshaji wa uendeshaji wa sheria zilizofafanuliwa tayari katika `AGENTS.md`.

## Kutengwa kwa mti wa kazi — Claude Maadili ya Msimbo

- Thibitisha tawi la msingi na opereta kupitia `AskUserQuestion` (Hard Rule #19) isipokuwa kama wamekuambia tayari.
- Unda mti wa kazi kwa `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (inatua chini ya `.claude/worktrees/`, hard-links `node_modules` na nakala `.husky/_`), kisha piga `EnterWorktree` na `path` yake . Pitisha msingi kila wakati: bila hiyo hati huchagua ya juu zaidi `release/*`, ambayo inaweza kuwa sio ile ambayo operator alithibitisha. Mti wa kazi ambao `EnterWorktree` huunda peke yake hauna viunganishi ngumu wala ndoano, kwa hivyo hakuna lango la kabla ya ahadi linaloingia ndani yake.

## Subagents na git

Kila wakala mdogo anayegusa git (Zana ya Wakala au hati ya mtiririko wa kazi) hupata Neno Ngumu #22 a's `git stash` ya kupiga marufuku kwa haraka — urudiaji uliorekodiwa wa tukio la kuficha ulikuja kupitia ajenti ndogo.

## Upangaji wa vibaki vya programu — nguvu kuu hubatilishwa

Ujuzi wa Superpowers unatangaza chaguomsingi chini ya `docs/superpowers/plans/`, `docs/superpowers/specs/` na `docs/research/`. Andika upya kila moja kwa `_tasks/` yake inayolingana katika `AGENTS.md` → "Artifacts za Kupanga na Utafiti" kabla ya kuandika, na uifanye na `git -C _tasks …`, kamwe katika repo kuu.

## Changua faili — `_artifacts/`, sio `/tmp`

Mradi huu unabatilisha padi ya kukwaruza ya kipindi cha kuunganisha (`/tmp/claude-*/…`). Andika faili za muda zinazouzwa nje —, zipu zinazozalishwa, matokeo ya kati ya mara moja — hadi `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: njia `_*` iliyopuuzwa, ili opereta apate na kufuta mikwaruzo yote katika sehemu moja. Mipango ya kudumu, vipimo, utafiti na miondoko ya mkono huenda kwa `_tasks/` badala yake ( Kanuni Ngumu #23).

## Msingi nyekundu

Ili kuondoa hali nyekundu iliyokusanywa (ncha ya msingi + red PRs), tumia ujuzi wa `/sweep-reds`.
