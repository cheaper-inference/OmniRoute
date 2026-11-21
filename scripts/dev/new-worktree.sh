#!/usr/bin/env bash
# Create an isolated worktree following the mandatory AGENTS.md protocol
# (Git Workflow → "Worktree isolation" / Hard Rule #19), incluindo os dois
# steps that are easy to forget and fail silently:
#
# 1. node_modules by HARD LINK (`cp -al`), never symlink — a symlink that
#      resolve fora da raiz mata o Turbopack com um FATAL que culpa a
# "filesystem root" and not the worktree (incident 2026-07-31, #9043).
#2. `.husky/_` copied — it's gitignored, so a new worktree DOESN'T have it, and
# `core.hooksPath=.husky/_` points to a non-existent directory: ALL
# pre-commit hooks are silent, without any warning. That's how 59
#      commits com identidade trocada passaram pelo gate entre 29/08 e 02/09
#      (ver .mailmap e scripts/check/check-git-identity.sh).
#
# Concurrency: multiple sessions create worktrees at the same time in the same .git.
# Without mutual exclusion, parallel invocations fight over .git/config ("could not lock
# config file", exit 255) after `git branch` has already run, leaving the branch without
# worktree (campanha 2026-10: 3 de 6 falharam). Por isso o script:
#   - serializes invocations with a lock in <git-common-dir>/omniroute-new-worktree.lock
# (flock; fallback by mkdir when flock does not exist), waiting until
# NEW_WORKTREE_LOCK_WAIT seconds (default 600) with visible warning;
#   - se `git worktree add` falhar depois de criar a branch, remove a branch
# (only the one that THIS execution created) and warns — repeating the command is enough.
#
# Uso:  scripts/dev/new-worktree.sh <branch> [base-branch]
# Ex.:  scripts/dev/new-worktree.sh fix/12345-algo release/v3.8.51
# Env: NEW_WORKTREE_LOCK_WAIT seconds to wait for lock (default 600)
#       NEW_WORKTREE_NO_FLOCK   forces the mkdir fallback (used in tests)

set -euo pipefail

BRANCH="${1:-}"
BASE="${2:-}"

if [ -z "$BRANCH" ]; then
  echo "uso: scripts/dev/new-worktree.sh <branch> [base-branch]" >&2
  echo "  ex: scripts/dev/new-worktree.sh fix/12345-algo release/v3.8.51" >&2
  exit 1
fi

# O checkout PRINCIPAL, mesmo quando este script roda de dentro de outra worktree:
# `--show-toplevel` would return the current worktree, and the new one would be born nested within it.
COMMON_DIR=$(git rev-parse --path-format=absolute --git-common-dir)
MAIN=$(dirname "$COMMON_DIR")
cd "$MAIN"

# ---- mutual exclusion between parallel invocations ------------------------------
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
  # Non-flock fallback: mkdir is atomic on any POSIX filesystem.
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

# No explicit basis, uses the active release (highest release/* by semver) — never
# `main` and never "the branch I'm on", as per Hard Rule #19.
if [ -z "$BASE" ]; then
  BASE=$(git ls-remote --heads origin 'refs/heads/release/*' \
    | sed 's#.*refs/heads/##' | sort -V | tail -1)
  [ -z "$BASE" ] && { echo "I was unable to resolve the active release; pass the base explicitly" >&2; exit 1; }
  echo "base not specified — using the active release: $BASE"
fi

DIR=".claude/worktrees/${BRANCH##*/}"
[ -e "$DIR" ] && { echo "already exists: $DIR" >&2; exit 1; }

git fetch origin "$BASE" --quiet

# ---- creation with branch rollback ----------------------------------------
# `git worktree add -b` creates the branch BEFORE the worktree; if the worktree fails, the
# branch lingers and the next `-b` dies with "already exists". We only remove the branch
# that this run created, and only while no worktree is using it.
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
    echo "rollback: branch $BRANCH removed (the worktree never existed) — just repeat the command" >&2
  else
    echo "rollback: unable to remove branch $BRANCH; remove with 'git branch -D $BRANCH' before retrying" >&2
  fi
}

set +e
git worktree add "$DIR" -b "$BRANCH" "origin/$BASE"
ADD_RC=$?
set -e
if [ "$ADD_RC" -ne 0 ]; then
  echo "git worktree add failed (rc=$ADD_RC)" >&2
  rollback_branch
  exit "$ADD_RC"
fi

# `.husky/_` FIRST: it is tiny and decides whether local gates run.
# Copying node_modules first would risk aborting (set -e) on a ~10 GB tree
# and leave the worktree without any hook — exactly the flaw this script exists
# to prevent.
if [ -d "$MAIN/.husky/_" ]; then
  cp -a "$MAIN/.husky/_" "$DIR/.husky/_"
else
  echo "WARNING: .husky/_ does not exist in the main checkout — run 'npm install' there first" >&2
fi

# node_modules: hard links, ~5s e disco quase zero (inodes compartilhados).
# A `cp -al SRC DEST` with DEST already existing would nest SRC INSIDE it
# (node_modules/node_modules), so DEST cannot exist here.
if [ -d "$MAIN/node_modules/node_modules" ]; then
  echo "WARNING: $MAIN/node_modules/node_modules exists — residue of a nested cp -al." >&2
  echo " It inflates the copy and exhausts the hard link limit; you may want to remove it." >&2
fi
if [ -d "$MAIN/node_modules" ]; then
  # Partial failure (limit of hard links, disk) cannot bring down the entire worktree:
  # the hooks are already in place and npm install remains a valid output.
  if cp -al "$MAIN/node_modules" "$DIR/node_modules" 2>"$DIR/.cp-node-modules.log"; then
    echo "node_modules: $(ls "$DIR/node_modules" | wc -l) entradas (hard links)"
    rm -f "$DIR/.cp-node-modules.log"
  else
    echo "WARNING: Copying node_modules partially failed (see $DIR/.cp-node-modules.log)." >&2
    echo "First lines:" >&2
    head -3 "$DIR/.cp-node-modules.log" >&2
  fi
else
  echo "WARNING: node_modules does not exist in the main checkout — run 'npm install' there first" >&2
fi

# Verification: the hook needs to be REALLY active, not just present.
# Without core.hooksPath git uses <git-common-dir>/hooks; in a worktree `.git` is just a pointer.
HOOKS_PATH=$(git -C "$DIR" config --get core.hooksPath \
  || echo "$(git -C "$DIR" rev-parse --path-format=absolute --git-common-dir)/hooks")
# Like git when running the hook: absolute path is valid as is; relative part of the worktree.
case "$HOOKS_PATH" in
  /*) HOOKS_DIR="$HOOKS_PATH" ;;
  *) HOOKS_DIR="$DIR/$HOOKS_PATH" ;;
esac
if [ -x "$HOOKS_DIR/pre-commit" ]; then
  echo "hooks: ativos ($HOOKS_PATH/pre-commit)"
else
  echo "WARNING: pre-commit is NOT active in $HOOKS_DIR — local gates will not run" >&2
  exit 1
fi

echo
echo "pronto: $DIR  (branch $BRANCH, base $BASE)"
echo "  cd $DIR"
