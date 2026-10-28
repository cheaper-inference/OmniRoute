#!/usr/bin/env bash
# scripts/dev/typecheck-touched.sh — typecheck only the touched .ts/.tsx files.
#
# `npx tsc -p tsconfig.json` over the whole project takes minutes and OOMs the shared devbox
# (exit 134/137) whenever other sessions are active. This script writes a temporary tsconfig
# that extends ./tsconfig.json with `include` narrowed to the touched files plus the repo's
# ambient `.d.ts`, runs tsc on it with a 6 GB heap, keeps the full log under the MAIN
# checkout's _artifacts/typecheck-touched/ (also when run from a linked worktree) and always
# deletes the temporary tsconfig. `"types": ["node"]` is mandatory: without it the narrow
# include loses Node's types and tsc reports a false `TS2591 Cannot find name 'node:test'`
# on every `node:*` import (recipe verified 2026-10-16).
#
# Usage:
#   scripts/dev/typecheck-touched.sh [--base <ref>] [file ...]
#     file ...       typecheck exactly these .ts/.tsx files
#     --base <ref>   with no files: derive them from
#                    `git diff --name-only $(git merge-base HEAD <ref>)..HEAD`
#   Env:
#     TSC_BIN                 command run instead of `npx tsc` (tests pass a stub)
#     TYPECHECK_TOUCHED_HEAP  --max-old-space-size in MB (default 6144)
#
# Output: the tsc error lines that belong to touched files, then one summary line:
#   typecheck-touched: rc=<tsc rc> touched_errors=<n> other_errors=<m> log=<path>
# Exit codes:
#   0  clean
#   1  errors in touched files
#   2  only errors elsewhere (imported files — read the log), or tsc died without diagnostics
#   64 usage error
set -euo pipefail

TMP_NAME="tsconfig.touched.tmp.json"
HEAP="${TYPECHECK_TOUCHED_HEAP:-6144}"

usage() {
  cat >&2 <<'EOF'
usage: scripts/dev/typecheck-touched.sh [--base <ref>] [file ...]
  file ...       typecheck exactly these .ts/.tsx files
  --base <ref>   with no files, derive them from the diff against merge-base(HEAD, <ref>)
EOF
  exit 64
}

BASE=""
FILES=()
while [ $# -gt 0 ]; do
  case "$1" in
    --base)
      [ $# -ge 2 ] || { echo "typecheck-touched: --base needs a ref" >&2; usage; }
      BASE="$2"
      shift 2
      ;;
    --base=*)
      BASE="${1#--base=}"
      shift
      ;;
    -h | --help) usage ;;
    --)
      shift
      FILES+=("$@")
      break
      ;;
    -*)
      echo "typecheck-touched: unknown option: $1" >&2
      usage
      ;;
    *)
      FILES+=("$1")
      shift
      ;;
  esac
done

ROOT=$(git rev-parse --show-toplevel)
INVOKED_FROM=$PWD
cd "$ROOT"

# Paths are made relative to the worktree root, which is where the temp tsconfig lives and
# what tsc prints in its diagnostics.
to_root_relative() {
  local f=$1
  case "$f" in
    /*) ;;
    *) f="$INVOKED_FROM/$f" ;;
  esac
  f=${f#"$ROOT"/}
  f=${f#./}
  printf '%s' "$f"
}

if [ ${#FILES[@]} -eq 0 ]; then
  if [ -z "$BASE" ]; then
    echo "typecheck-touched: no files given — list the files, or pass --base <ref> to derive them from git" >&2
    usage
  fi
  MERGE_BASE=$(git merge-base HEAD "$BASE") \
    || { echo "typecheck-touched: cannot resolve merge-base of HEAD and '$BASE'" >&2; exit 64; }
  mapfile -t FILES < <(git diff --name-only --diff-filter=d "$MERGE_BASE"..HEAD -- | grep -E '\.tsx?$' || true)
else
  for i in "${!FILES[@]}"; do
    rel=$(to_root_relative "${FILES[$i]}")
    case "$rel" in
      *.ts | *.tsx) ;;
      *)
        echo "typecheck-touched: not a .ts/.tsx file: ${FILES[$i]}" >&2
        usage
        ;;
    esac
    [ -f "$rel" ] || { echo "typecheck-touched: no such file: ${FILES[$i]}" >&2; usage; }
    FILES[i]=$rel
  done
fi

# Logs live under the MAIN checkout's _artifacts/, never inside a linked worktree.
COMMON_DIR=$(git rev-parse --path-format=absolute --git-common-dir)
LOG_DIR="$(dirname "$COMMON_DIR")/_artifacts/typecheck-touched"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/$(date +%Y%m%d-%H%M%S)-$$.log"

if [ ${#FILES[@]} -eq 0 ]; then
  echo "typecheck-touched: no .ts/.tsx files touched since $MERGE_BASE" | tee "$LOG"
  echo "typecheck-touched: rc=0 touched_errors=0 other_errors=0 log=$LOG"
  exit 0
fi

TMP="$ROOT/$TMP_NAME"
# shellcheck disable=SC2064 # TMP is final here; expand now so the trap never sees a changed value
trap "rm -f '$TMP'" EXIT

json_string() {
  local s=$1
  s=${s//\\/\\\\}
  s=${s//\"/\\\"}
  printf '"%s"' "$s"
}

{
  echo '{'
  echo '  "extends": "./tsconfig.json",'
  printf '  "include": ['
  first=1
  for f in "${FILES[@]}" 'src/**/*.d.ts' 'types/**/*.d.ts'; do
    [ "$first" -eq 1 ] || printf ', '
    first=0
    json_string "$f"
  done
  echo '],'
  echo '  "compilerOptions": { "noEmit": true, "types": ["node"], "incremental": false }'
  echo '}'
} >"$TMP"

if [ -n "${TSC_BIN:-}" ]; then
  read -r -a TSC_CMD <<<"$TSC_BIN"
else
  TSC_CMD=(npx tsc)
fi

set +e
NODE_OPTIONS="--max-old-space-size=${HEAP}" "${TSC_CMD[@]}" -p "$TMP" --pretty false >"$LOG" 2>&1
TSC_RC=$?
set -e

declare -A TOUCHED=()
for f in "${FILES[@]}"; do TOUCHED["$f"]=1; done

touched_errors=0
other_errors=0
while IFS= read -r line; do
  path=${line%%(*}
  if [ -n "${TOUCHED[$path]:-}" ]; then
    touched_errors=$((touched_errors + 1))
    printf '%s\n' "$line"
  else
    other_errors=$((other_errors + 1))
  fi
done < <(grep -E '^[^(]+\([0-9]+,[0-9]+\): error TS[0-9]+' "$LOG" || true)

echo "typecheck-touched: rc=$TSC_RC touched_errors=$touched_errors other_errors=$other_errors log=$LOG"

if [ "$touched_errors" -gt 0 ]; then
  exit 1
fi
if [ "$other_errors" -gt 0 ]; then
  echo "typecheck-touched: errors only outside the touched files (imported files) — read the log" >&2
  exit 2
fi
if [ "$TSC_RC" -ne 0 ]; then
  echo "typecheck-touched: tsc exited $TSC_RC without TS diagnostics (OOM?) — read the log" >&2
  exit 2
fi
exit 0
