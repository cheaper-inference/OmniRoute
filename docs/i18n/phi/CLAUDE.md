# CLAUDE.md (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Ang lahat ng mga patakaran ng proyekto ay nakatira sa [`AGENTS.md`](AGENTS.md)** — ang nag-iisang pinagmumulan ng katotohanan para sa bawat katulong AI ; nilo-load na ito ng import sa itaas. Huwag muling magdagdag ng mga panuntunan ng proyekto dito. Lahat ng nasa ibaba ay nalalapat ONLY sa Claude Code — operational refinements ng mga panuntunang tinukoy na sa `AGENTS.md`.

## Worktree isolation — Claude Mga detalye ng code

- Kumpirmahin ang base branch sa operator sa pamamagitan ng `AskUserQuestion` (Hard Rule #19) maliban kung sinabi na nila sa iyo.
- Gawin ang worktree na may `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (ito ay dumarating sa ilalim `.claude/worktrees/`, mga hard-link `node_modules` at mga kopya `.husky/_`), pagkatapos ay tawagan `EnterWorktree` gamit ang `path` nito. Palaging ipasa ang base: kung wala ito, pinipili ng script ang pinakamataas na `release/*`, na maaaring hindi ang kinumpirma ng operator. Ang worktree na mismong nililikha `EnterWorktree` ay walang hard link o hook, kaya walang pre-commit gate na tumatakbo dito.

## Mga subagents at git

Ang bawat subagent na pumipindot sa git (Agent tool o Workflow script) ay nakakakuha ng Hard Rule #22 a's `git stash` ban verbatim sa prompt nito — ang naitalang pag-ulit ng insidente ng pagtatago ay dumating sa pamamagitan ng isang subagent.

## Pagpaplano ng mga artifact — superpowers path overrides

Ang mga kasanayan sa superpower ay nag-aanunsyo ng mga default sa ilalim ng `docs/superpowers/plans/`, `docs/superpowers/specs/` at `docs/research/`. Isulat muli ang bawat isa sa katumbas nitong `_tasks/` sa `AGENTS.md` → "Mga Artifact sa Pagpaplano at Pananaliksik" bago isulat, at i-commit ito sa `git -C _tasks …`, hindi kailanman sa pangunahing repo.

## Scratch file — `_artifacts/`, hindi `/tmp`

Ino-override ng proyektong ito ang scratchpad ng session ng harness (`/tmp/claude-*/…`). Sumulat ng mga pansamantalang file — export, nabuong mga zip, one-off intermediate na output — hanggang `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: isang gitignored root `_*` path, para mahanap at matanggal ng operator ang lahat ng scratch sa isang lugar. Ang mga matibay na plano, spec, pananaliksik at hand-off ay napupunta sa `_tasks/` sa halip (Hard Rule #23).

## Pulang base

Para maubos ang naipon na pulang estado (base tip + red PRs), gamitin ang `/sweep-reds` skill.
