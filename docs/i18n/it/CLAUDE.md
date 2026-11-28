# CLAUDE.md (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tutte le regole del progetto vivono in [`AGENTS.md`](AGENTS.md)** — l'unica fonte di verità per ogni assistente AI ; l'importazione sopra lo carica già. Non aggiungere nuovamente le regole del progetto qui. Tutto quanto riportato di seguito applica ONLY a Claude Codice — perfezionamenti operativi delle regole già definite in `AGENTS.md`.

## Isolamento dell'albero di lavoro — Claude Specifiche del codice

- Conferma il ramo base con l'operatore tramite `AskUserQuestion` (Hard Rule #19) a meno che non te lo abbiano già detto.
- Crea l'albero di lavoro con `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (si ferma sotto `.claude/worktrees/`, collega `node_modules` e copia `.husky/_`), quindi chiama `EnterWorktree` con il suo `path`. Passa sempre la base: senza di essa lo script sceglie il `release/*` più alto, che potrebbe non essere quello confermato dall'operatore. Un albero di lavoro creato da `EnterWorktree` da solo non ha né collegamenti fisici né hook, quindi al suo interno non viene eseguito alcun gate di pre-commit.

## Subagenti e git

Every subagent that touches git (Agent tool or Workflow script) gets Hard Rule #22a's `git stash` ban verbatim in its prompt — the recorded recurrence of the stash incident came through a subagent.

## Gli artefatti di pianificazione — sostituiscono il percorso dei superpoteri

Le abilità dei superpoteri annunciano valori predefiniti sotto `docs/superpowers/plans/`, `docs/superpowers/specs/` e `docs/research/`. Riscrivi ciascuno nel suo equivalente `_tasks/` in `AGENTS.md` → "Artefatti di pianificazione e ricerca" prima di scrivere e esegui il commit con `git -C _tasks …`, mai nel repository principale.

## Scratch file — `_artifacts/`, non `/tmp`

Questo progetto sovrascrive lo scratchpad della sessione del cablaggio (`/tmp/claude-*/…`). Scrivi file temporanei, esportazioni —, zip generati, output intermedi una tantum — a `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: un percorso `_*` root gitignorato, in modo che l'operatore trovi ed elimini tutti i dati in un unico posto. Piani durevoli, specifiche, ricerche e trasferimenti vanno invece a `_tasks/` (Hard Rule #23).

## Base rossa

Per drenare uno stato rosso accumulato (punta base + rosso PRs), utilizzare l'abilità `/sweep-reds`.
