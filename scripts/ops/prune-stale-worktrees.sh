#!/usr/bin/env bash
# List (or remove with --apply) port-* worktrees whose branch has already been merged into
# main OR has no commits ahead of origin/main. NEVER touch worktrees with
# uncommitted work. Rotate from the main checkout.
set -euo pipefail
APPLY="${1:-}"
git fetch origin main --quiet || true
git worktree list --porcelain | awk '/^worktree /{w=$2} /^branch /{print w" "$2}' | \
while read -r dir ref; do
  case "$dir" in
    *"/.claude/worktrees/"*port-*|*"/.worktrees/"*port-*) ;;
    *) continue ;;
  esac
  br="${ref#refs/heads/}"
  if [ -n "$(git -C "$dir" status --porcelain 2>/dev/null)" ]; then
    echo "SKIP (dirty): $dir"
    continue
  fi
  ahead=$(git -C "$dir" rev-list --count origin/main.."$br" 2>/dev/null || echo "?")
  if [ "$ahead" = "0" ]; then
    if [ "$APPLY" = "--apply" ]; then
      git worktree remove --force "$dir" && git branch -D "$br" 2>/dev/null || true
      echo "REMOVED: $dir ($br)"
    else
      echo "WOULD REMOVE (0 ahead of main): $dir ($br)"
    fi
  else
    echo "KEEP ($ahead ahead): $dir ($br)"
  fi
done
echo "Done.${APPLY:+ (applied)}"
