# CLAUDE.md (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Ir-regoli kollha tal-progett joqoghdu [`AGENTS.md`](AGENTS.md)** — is-sors uniku tal-verità għal kull assistent AI ; l-importazzjoni ta 'hawn fuq diġà tagħbha. Iżżidx mill-ġdid ir-regoli tal-proġett hawn. Kollox hawn taħt japplika ONLY għal Claude Kodiċi — ir-raffinamenti operattivi tar-regoli diġà definiti `AGENTS.md`.

## L-iżolament tas-siġar tax-xogħol — Claude L-ispeċifiċitajiet tal-kodiċi

- Ikkonferma l-fergħa bażi mal-operatur permezz ta' `AskUserQuestion` (Hard Rule #19) sakemm ma jkunux diġà qalulek.
- Oħloq is-siġra tax-xogħol bi `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (tinżel taħt `.claude/worktrees/`, hard-links `node_modules` u tikkopja `.husky/_`), imbagħad sejjaħ `EnterWorktree` bi `path` tagħha . Dejjem għaddi l-bażi: mingħajrha l-iskrittura jagħżel l-ogħla `release/*`, li jista 'ma jkunx dak li kkonferma l-operatur. Worktree li `EnterWorktree` joħloq waħdu la għandu l-hard links u lanqas il-ganċijiet, għalhekk l-ebda pre-commit gate ma jmur fiha.

## Subaġenti u git

Every subagent that touches git (Agent tool or Workflow script) gets Hard Rule #22a's `git stash` ban verbatim in its prompt — the recorded recurrence of the stash incident came through a subagent.

## Ippjanar artifacts — superpotenzi path overrides

Il-ħiliet tas-superpotenzi jħabbru nuqqasijiet taħt `docs/superpowers/plans/`, `docs/superpowers/specs/` u `docs/research/`. Ikteb mill-ġdid kull wieħed għall-ekwivalenti `_tasks/` tiegħu `AGENTS.md` → "Artifatti tal-Ippjanar u r-Riċerka" qabel ma tikteb, u kkommettiha `git -C _tasks …`, qatt fir-repo prinċipali.

## Scratch files — `_artifacts/`, mhux `/tmp`

Dan il-proġett jegħleb is-scratchpad tas-sessjoni tal-arness (`/tmp/claude-*/…`). Ikteb fajls temporanji esportazzjonijiet —, zips iġġenerati, outputs intermedji ta 'darba — sa `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: mogħdija ta' għerq `_*` gitignored, sabiex l-operatur isib u jħassar il-bidu kollu f'post wieħed. Pjanijiet durabbli, specs, riċerka u hand-offs imorru għal `_tasks/` minflok (Hard Rule #23).

## Bażi ħamra

Biex tbattal stat aħmar akkumulat (ponta bażi + red PRs), uża l-ħila `/sweep-reds`.
