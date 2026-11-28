# CLAUDE.md (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Iwu oru ngo niile na-ebi na [`AGENTS.md`](AGENTS.md)** — bụ otu isi iyi nke eziokwu maka onye inyeaka AI ọ bụla; mbubata n'elu ebugola ya. Etinyekwala iwu oru ngo ebe a. Ihe niile dị n'okpuru na-emetụta ONLY na Claude Code — nhazi ọrụ nke iwu akọwarala na `AGENTS.md`.

## Nkọwapụta koodu ọrụ osisi — Claude

- Kwado ngalaba ntọala na onye ọrụ site na `AskUserQuestion` (Hard Rule #19) belụsọ na ha agwala gị.
- Mepụta osisi ọrụ na `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (ọ na-ada n'okpuru `.claude/worktrees/`, hard-links `node_modules` na mbipụta `.husky/_`), wee kpọọ `EnterWorktree` na `path` ya. Na-agafe isi mgbe niile: na-enweghị ya script na-ahọrọ `release/*` kachasị elu, nke nwere ike ọ gaghị abụ nke onye ọrụ kwadoro. Osisi na-arụ ọrụ nke `EnterWorktree` na-emepụta n'onwe ya enweghị njikọ siri ike ma ọ bụ nko, ya mere, ọ dịghị ụzọ ntinye ụzọ na-agba ọsọ na ya.

## Subagents na git

Subagent ọ bụla metụrụ git (Agent Tool or Workflow script) na-enweta iwu siri ike #22 a's `git stash` ban verbatim n'ime ngwa ngwa — nlọghachite ndekọ nke ihe ndekọ stash mere site na subgent.

## Ịhazi arịa arịa dị elu — gabigara ụzọ

Nkà ndị nwere ike na-ekwupụta ndabara n'okpuru `docs/superpowers/plans/`, `docs/superpowers/specs/` na `docs/research/`. Degharịa nke ọ bụla na `_tasks/` ya na `AGENTS.md` → "Atụmatụ & Nchọpụta Artifacts" tupu ịde ya, ma tinye ya na `git -C _tasks …`, ọ dịghị mgbe na isi repo.

## Ikpochapụ faịlụ — `_artifacts/`, ọ bụghị `/tmp`

Ihe oru ngo a na-akpochapu ihe nkedo oge nke njikota (`/tmp/claude-*/…`). Dee faịlụ nwa oge — mbupụ, zips emepụtara, mpụta otu oge — gaa `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: ụzọ `_*` mgbọrọgwụ gitignored, yabụ onye ọrụ na-achọpụta ma hichapụ ọkọ niile n'otu ebe. Atụmatụ na-adịgide adịgide, nkọwapụta, nyocha na nkwụsị aka na-aga `_tasks/` (Hard Rule #23).

## Isi uhie

Iji mee ka ọnọdụ uhie chịkọbara (base n'ọnụ + red PRs), jiri nkà `/sweep-reds`.
