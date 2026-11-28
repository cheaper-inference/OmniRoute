# CLAUDE.md (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Todas as regras do projeto residem em [`AGENTS.md`](AGENTS.md)** — a única fonte de verdade para cada assistente AI ; a importação acima já o carrega. Não volte a adicionar as regras do projeto aqui. Tudo o que está abaixo se aplica ONLY aos refinamentos operacionais do código Claude — de regras já definidas em `AGENTS.md`.

## Isolamento da árvore de trabalho — Claude Especificações do código

- Confirme a ramificação base com a operadora através da `AskUserQuestion` (regra rígida #19), a menos que já o tenham informado.
- Crie a árvore de trabalho com `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (chega a `.claude/worktrees/`, liga `node_modules` e copia `.husky/_`) e, em seguida, chame `EnterWorktree` com o seu `path`. Passe sempre a base: sem ela o script escolhe o maior `release/*`, que pode não ser o confirmado pelo operador. Uma árvore de trabalho que `EnterWorktree` cria por si só não tem ligações físicas nem ganchos, pelo que nenhuma porta de pré-confirmação é executada nela.

## Subagentes e git

Cada subagente que toca no git (ferramenta de agente ou script de fluxo de trabalho) obtém a regra rígida #22 a `git stash` ban literalmente no seu prompt — a recorrência registada do incidente de stash veio através de um subagente.

## Planeamento de substituições de caminho de superpoderes de artefactos —

As habilidades de superpoderes anunciam padrões em `docs/superpowers/plans/`, `docs/superpowers/specs/` e `docs/research/`. Reescreva cada um no seu `_tasks/` equivalente em `AGENTS.md` → "Planning & Research Artifacts" antes de escrever e envie-o com `git -C _tasks …`, nunca no repositório principal.

## Ficheiros de rascunho — `_artifacts/`, não `/tmp`

Este projeto substitui o scratchpad da sessão do chicote (`/tmp/claude-*/…`). Escrever ficheiros temporários, exportações —, zips gerados, saídas intermédias únicas — para `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: um caminho `_*` raiz ignorado pelo git, para que o operador encontre e exclua todos os riscos num só local. Planos duráveis, especificações, pesquisas e transferências vão para `_tasks/` (regra rígida #23).

## Base vermelha

Para drenar um estado vermelho acumulado (ponta base + red PRs), utilize a habilidade `/sweep-reds`.
