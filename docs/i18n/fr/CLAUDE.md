# CLAUDE.md (Français)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Toutes les règles du projet vivent dans [`AGENTS.md`](AGENTS.md)** — la source unique de vérité pour chaque assistant AI ; l'importation ci-dessus le charge déjà. Ne réajoutez pas de règles de projet ici. Tout ce qui suit s'applique ONLY aux raffinements opérationnels du code Claude — des règles déjà définies dans `AGENTS.md`.

## Isolation de l'arbre de travail — Claude Spécificités du code

- Confirmez la branche de base avec l'opérateur via `AskUserQuestion` (Hard Rule #19) à moins qu'il ne vous l'ait déjà dit.
- Créez l'arbre de travail avec `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (il atterrit sous `.claude/worktrees/`, établit des liens physiques `node_modules` et copie `.husky/_`), puis appelez `EnterWorktree` avec son `path`. Passez toujours la base : sans elle, le script sélectionne le `release/*` le plus élevé, qui peut ne pas être celui confirmé par l'opérateur. Un arbre de travail que `EnterWorktree` crée lui-même n'a ni les liens physiques ni les hooks, donc aucune porte de pré-validation ne s'y exécute.

## Sous-agents et git

Chaque sous-agent qui touche git (outil d'agent ou script de workflow) obtient l'interdiction `git stash` de Hard Rule #22 a textuellement dans son invite — la récurrence enregistrée de l'incident de cache est passée par un sous-agent.

## Planification des artefacts de remplacement du chemin des super pouvoirs —

Les compétences de superpuissances annoncent les défauts sous `docs/superpowers/plans/`, `docs/superpowers/specs/` et `docs/research/`. Réécrivez chacun dans son équivalent `_tasks/` dans `AGENTS.md` → "Planning & Research Artifacts" avant d'écrire, et validez-le avec `git -C _tasks …`, jamais dans le dépôt principal.

## Fichiers scratch — `_artifacts/`, pas `/tmp`

Ce projet remplace le bloc-notes de session du harnais (`/tmp/claude-*/…`). Écrivez des fichiers temporaires, des exportations —, des zips générés, des sorties intermédiaires uniques — vers `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: un chemin `_*` racine gitignoré, afin que l'opérateur trouve et supprime toutes les rayures en un seul endroit. Les plans, spécifications, recherches et transferts durables sont plutôt confiés à `_tasks/` (Hard Rule #23).

## Socle rouge

Pour drainer un état rouge accumulé (pointe de base + rouge PRs), utilisez la compétence `/sweep-reds`.
