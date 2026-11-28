# CLAUDE.md (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Duk dokokin aikin suna rayuwa a cikin [`AGENTS.md`](AGENTS.md)** — tushen gaskiya guda ɗaya ga kowane mataimaki AI ; shigo da kayan da ke sama ya riga ya loda shi. Kada a sake ƙara ƙa'idodin aikin anan. Duk abin da ke ƙasa ya shafi ONLY zuwa Claude Code — gyare-gyaren aiki na ƙa'idodin da aka riga aka ayyana a `AGENTS.md`.

## Keɓewar aiki — Claude ƙayyadaddun lambar

- Tabbatar da reshen tushe tare da mai aiki ta hanyar `AskUserQuestion` (Hard Rule #19) sai dai idan sun riga sun faɗa muku.
- Ƙirƙirar itacen aiki tare da `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (ta sauka ƙarƙashin `.claude/worktrees/`, hard-links `node_modules` da kwafi `.husky/_`), sannan a kira `EnterWorktree` tare da `path`. Koyaushe wuce tushe: ba tare da shi rubutun yana ɗaukar `release/*` mafi girma ba, wanda ƙila ba shine wanda mai aiki ya tabbatar ba. Itacen aiki da `EnterWorktree` ke ƙirƙira da kansa ba shi da maɗauran haɗin kai ko ƙugiya, don haka babu wata ƙofar da ta riga ta yi aiki a ciki.

## Subagents da git

Duk wani wakilin da ya taɓa git (Agent Tool or Workflow script) yana samun Hard Rule #22 a's `git stash` ban verbatim a cikin gaggawar — da aka yi rikodin sake aukuwar lamarin ya zo ta hanyar mai magana.

## Shirye-shiryen kayan tarihi — yana da iko ya wuce hanya

Superpowers skills announce defaults under `docs/superpowers/plans/`, `docs/superpowers/specs/` and `docs/research/`. Sake rubuta kowanne zuwa `_tasks/` daidai yake a cikin `AGENTS.md` → "Tsarin Tsare-tsare & Bincike Abubuwan Kaya" kafin rubutawa, kuma yi shi da `git -C _tasks …`, ba a cikin babban repo ba.

## Scratch fayiloli — `_artifacts/`, ba `/tmp`

Wannan aikin ya ƙetare ɓangarorin ɗorawa na kayan aiki (`/tmp/claude-*/…`). Rubuta fayilolin wucin gadi — fitarwa, samar da zips, matsakaicin fitowar — zuwa `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` na lokaci-lokaci: hanyar `_*` mai gitignored, don haka mai aiki ya nemo kuma yana share duk wani karce a wuri guda. Tsare-tsare masu dorewa, ƙayyadaddun bayanai, bincike da kashe-kashe suna zuwa `_tasks/` maimakon (Hard Dokokin #23).

## Red tushe

Don matse jajayen da aka tara (tushe tip + ja PRs), yi amfani da fasaha `/sweep-reds`.
