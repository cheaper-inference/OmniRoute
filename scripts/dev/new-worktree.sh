#!/usr/bin/env bash
# Cria uma worktree isolada seguindo o protocolo obrigatório do AGENTS.md
# (Git Workflow → "Worktree isolation" / Hard Rule #19), incluindo os dois
# passos que são fáceis de esquecer e falham em silêncio:
#
#   1. node_modules por HARD LINK (`cp -al`), nunca symlink — um symlink que
#      resolve fora da raiz mata o Turbopack com um FATAL que culpa a
#      "filesystem root" e não a worktree (incidente 2026-07-31, #9043).
#   2. `.husky/_` copiado — é gitignored, então uma worktree nova NÃO o tem, e
#      `core.hooksPath=.husky/_` aponta para um diretório inexistente: TODOS os
#      hooks de pre-commit ficam mudos, sem aviso nenhum. Foi assim que 59
#      commits com identidade trocada passaram pelo gate entre 29/08 e 02/09
#      (ver .mailmap e scripts/check/check-git-identity.sh).
#
# Concorrência: várias sessões criam worktrees ao mesmo tempo no mesmo .git.
# Sem exclusão mútua, invocações paralelas disputam .git/config ("could not lock
# config file", exit 255) depois que `git branch` já rodou, deixando a branch sem
# worktree (campanha 2026-10: 3 de 6 falharam). Por isso o script:
#   - serializa as invocações com um lock em <git-common-dir>/omniroute-new-worktree.lock
#     (flock; fallback por mkdir quando flock não existe), esperando até
#     NEW_WORKTREE_LOCK_WAIT segundos (padrão 600) com aviso visível;
#   - se `git worktree add` falhar depois de criar a branch, remove a branch
#     (só a que ESTA execução criou) e avisa — repetir o comando basta.
#
# Uso:  scripts/dev/new-worktree.sh <branch> [base-branch]
# Ex.:  scripts/dev/new-worktree.sh fix/12345-algo release/v3.8.51
# Env:  NEW_WORKTREE_LOCK_WAIT  segundos de espera pelo lock (padrão 600)
#       NEW_WORKTREE_NO_FLOCK   força o fallback por mkdir (usado nos testes)

set -euo pipefail

BRANCH="${1:-}"
BASE="${2:-}"

if [ -z "$BRANCH" ]; then
  echo "uso: scripts/dev/new-worktree.sh <branch> [base-branch]" >&2
  echo "  ex: scripts/dev/new-worktree.sh fix/12345-algo release/v3.8.51" >&2
  exit 1
fi

# O checkout PRINCIPAL, mesmo quando este script roda de dentro de outra worktree:
# `--show-toplevel` devolveria a worktree atual, e a nova nasceria aninhada nela.
COMMON_DIR=$(git rev-parse --path-format=absolute --git-common-dir)
MAIN=$(dirname "$COMMON_DIR")
cd "$MAIN"

# ---- exclusão mútua entre invocações paralelas ------------------------------
LOCK="$COMMON_DIR/omniroute-new-worktree.lock"
LOCK_WAIT="${NEW_WORKTREE_LOCK_WAIT:-600}"
MKDIR_LOCK=""

release_lock() {
  if [ -n "$MKDIR_LOCK" ]; then
    rmdir "$MKDIR_LOCK" 2>/dev/null || true
  fi
}
trap release_lock EXIT

acquire_lock() {
  if [ -z "${NEW_WORKTREE_NO_FLOCK:-}" ] && command -v flock >/dev/null 2>&1; then
    exec 9>"$LOCK"
    if ! flock -n 9; then
      echo "another new-worktree.sh is running — waiting (lock $LOCK, up to ${LOCK_WAIT}s)" >&2
      flock -w "$LOCK_WAIT" 9 || {
        echo "lock not released in ${LOCK_WAIT}s: $LOCK" >&2
        exit 1
      }
    fi
    return 0
  fi
  # Fallback sem flock: mkdir é atômico em qualquer sistema de arquivos POSIX.
  local dir="$LOCK.d" waited=0
  until mkdir "$dir" 2>/dev/null; do
    if [ "$waited" -eq 0 ]; then
      echo "another new-worktree.sh is running — waiting (lock $dir, up to ${LOCK_WAIT}s)" >&2
    fi
    if [ "$waited" -ge "$LOCK_WAIT" ]; then
      echo "lock not released in ${LOCK_WAIT}s: $dir" >&2
      exit 1
    fi
    sleep 1
    waited=$((waited + 1))
  done
  MKDIR_LOCK="$dir"
}
acquire_lock

# Sem base explícita, usa a release ativa (maior release/* por semver) — nunca
# `main` e nunca "a branch em que eu estou", conforme a Hard Rule #19.
if [ -z "$BASE" ]; then
  BASE=$(git ls-remote --heads origin 'refs/heads/release/*' \
    | sed 's#.*refs/heads/##' | sort -V | tail -1)
  [ -z "$BASE" ] && { echo "não consegui resolver a release ativa; passe a base explicitamente" >&2; exit 1; }
  echo "base não informada — usando a release ativa: $BASE"
fi

DIR=".claude/worktrees/${BRANCH##*/}"
[ -e "$DIR" ] && { echo "já existe: $DIR" >&2; exit 1; }

git fetch origin "$BASE" --quiet

# ---- criação com rollback da branch ----------------------------------------
# `git worktree add -b` cria a branch ANTES da worktree; se a worktree falhar, a
# branch sobra e o próximo `-b` morre com "already exists". Só removemos a branch
# que esta execução criou, e só enquanto nenhuma worktree a tiver em uso.
BRANCH_PREEXISTED=0
git show-ref --verify --quiet "refs/heads/$BRANCH" && BRANCH_PREEXISTED=1

rollback_branch() {
  [ "$BRANCH_PREEXISTED" -eq 0 ] || return 0
  git show-ref --verify --quiet "refs/heads/$BRANCH" || return 0
  git worktree prune
  if git worktree list --porcelain | grep -qx "branch refs/heads/$BRANCH"; then
    return 0
  fi
  if git branch -D "$BRANCH" >/dev/null 2>&1; then
    echo "rollback: branch $BRANCH removida (a worktree não chegou a existir) — basta repetir o comando" >&2
  else
    echo "rollback: não consegui remover a branch $BRANCH; remova com 'git branch -D $BRANCH' antes de repetir" >&2
  fi
}

set +e
git worktree add "$DIR" -b "$BRANCH" "origin/$BASE"
ADD_RC=$?
set -e
if [ "$ADD_RC" -ne 0 ]; then
  echo "git worktree add falhou (rc=$ADD_RC)" >&2
  rollback_branch
  exit "$ADD_RC"
fi

# `.husky/_` PRIMEIRO: é minúsculo e é o que decide se os gates locais rodam.
# Copiar node_modules antes seria arriscar abortar (set -e) numa árvore de ~10 GB
# e deixar a worktree sem hook nenhum — exatamente o defeito que este script existe
# para impedir.
if [ -d "$MAIN/.husky/_" ]; then
  cp -a "$MAIN/.husky/_" "$DIR/.husky/_"
else
  echo "AVISO: .husky/_ não existe no checkout principal — rode 'npm install' lá primeiro" >&2
fi

# node_modules: hard links, ~5s e disco quase zero (inodes compartilhados).
# Um `cp -al SRC DEST` com DEST já existente aninharia SRC DENTRO dele
# (node_modules/node_modules), então DEST não pode existir aqui.
if [ -d "$MAIN/node_modules/node_modules" ]; then
  echo "AVISO: $MAIN/node_modules/node_modules existe — resíduo de um cp -al aninhado." >&2
  echo "       Ele infla a cópia e esgota o limite de hard links; convém removê-lo." >&2
fi
if [ -d "$MAIN/node_modules" ]; then
  # Falha parcial (limite de hard links, disco) não pode derrubar a worktree inteira:
  # os hooks já estão no lugar e o npm install continua sendo uma saída válida.
  if cp -al "$MAIN/node_modules" "$DIR/node_modules" 2>"$DIR/.cp-node-modules.log"; then
    echo "node_modules: $(ls "$DIR/node_modules" | wc -l) entradas (hard links)"
    rm -f "$DIR/.cp-node-modules.log"
  else
    echo "AVISO: a cópia de node_modules falhou parcialmente (veja $DIR/.cp-node-modules.log)." >&2
    echo "       Primeiras linhas:" >&2
    head -3 "$DIR/.cp-node-modules.log" >&2
  fi
else
  echo "AVISO: node_modules não existe no checkout principal — rode 'npm install' lá primeiro" >&2
fi

# Verificação: o hook precisa estar REALMENTE ativo, não apenas presente.
# Sem core.hooksPath o git usa <git-common-dir>/hooks; numa worktree `.git` é só um ponteiro.
HOOKS_PATH=$(git -C "$DIR" config --get core.hooksPath \
  || echo "$(git -C "$DIR" rev-parse --path-format=absolute --git-common-dir)/hooks")
# Como o git ao rodar o hook: caminho absoluto vale como está; relativo parte da worktree.
case "$HOOKS_PATH" in
  /*) HOOKS_DIR="$HOOKS_PATH" ;;
  *) HOOKS_DIR="$DIR/$HOOKS_PATH" ;;
esac
if [ -x "$HOOKS_DIR/pre-commit" ]; then
  echo "hooks: ativos ($HOOKS_PATH/pre-commit)"
else
  echo "AVISO: pre-commit NÃO está ativo em $HOOKS_DIR — os gates locais não vão rodar" >&2
  exit 1
fi

echo
echo "pronto: $DIR  (branch $BRANCH, base $BASE)"
echo "  cd $DIR"
