#!/usr/bin/env bash
# shellcheck disable=SC2016  # the embedded `node -e` programs use JS template literals on purpose
# audit-worktree.sh — read-only "trust but verify" pass over a worker's worktree.
#
#   scripts/dev/audit-worktree.sh <worktree-path> [--base <ref>] [--repo <owner/repo>]
#
# Prints, in order: dirty files; commits since the merge-base with the base; `git diff --stat`;
# protected-surface hits; assertion / test lines removed under tests/; per-file
# eslint-suppressions.json counts that went UP versus the base; new keys in
# test-masking-allowlist.json; leftover tsconfig.*tmp*.json / scratch files; and, when an open
# PR exists for the branch, whether its head on GitHub equals the local HEAD.
#
# --base defaults to origin/<highest release/v*> as listed by `git ls-remote --heads origin`.
# Every comparison is working tree versus merge-base, so uncommitted edits count too.
#
# Final line: audit-worktree: dirty=<n> protected=<n> removed_asserts=<n> suppressions_up=<n>
#             allowlist_new=<n> tmp_files=<n> pr=<#N|none> head=<ok|mismatch|none>
# Exit 1 when protected > 0, tmp_files > 0 or the PR head does not match (2 on usage errors).
# The script never writes to the worktree; the only `gh` call is `pr list`. GH_BIN overrides
# the `gh` binary (tests point it at a stub).
set -euo pipefail

usage() {
  cat >&2 <<'EOF'
usage: audit-worktree.sh <worktree-path> [--base <ref>] [--repo <owner/repo>]
  --base <ref>   ref to diff against (default origin/<highest release/v*> on origin)
  --repo <slug>  GitHub repository for the PR lookup (default: origin URL, else cheaper-inference/OmniRoute)
env: GH_BIN (gh binary)
EOF
}

die() {
  echo "audit-worktree: $*" >&2
  exit 2
}

GH="${GH_BIN:-gh}"
WT=""
BASE=""
REPO=""

while [ $# -gt 0 ]; do
  case "$1" in
    --base | --repo)
      [ $# -ge 2 ] || die "missing value for $1"
      if [ "$1" = --base ]; then BASE="$2"; else REPO="$2"; fi
      shift 2
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    -*)
      usage
      die "unknown option: $1"
      ;;
    *)
      [ -z "$WT" ] || {
        usage
        die "unexpected argument: $1"
      }
      WT="$1"
      shift
      ;;
  esac
done

[ -n "$WT" ] || {
  usage
  exit 2
}
[ -d "$WT" ] || die "$WT is not a directory"
cd "$WT"
[ "$(git rev-parse --is-inside-work-tree 2>/dev/null || true)" = "true" ] ||
  die "$WT is not a git work tree"
cd "$(git rev-parse --show-toplevel)"

PROTECTED_RE='(^|/)(AGENTS\.md|CLAUDE\.md|GEMINI\.md|llm\.txt|SKILL\.md)$|^\.agents/|^\.claude/|^config/quality/skill-templates/'
TMP_RE='(^|/)tsconfig\.[^/]*tmp[^/]*\.json$|\.(orig|rej|tmp)$'

count_lines() {
  printf '%s' "$1" | grep -c . || true
}

# $1 label, $2 body → "label (n):" + indented body or "(none)".
section() {
  local n
  n=$(count_lines "$2")
  printf '%s (%s):\n' "$1" "$n"
  if [ "$n" -gt 0 ]; then printf '%s\n' "$2" | sed 's/^/  /'; else echo "  (none)"; fi
  echo
}

# ---- base ----------------------------------------------------------------------------------
if [ -z "$BASE" ]; then
  latest=$(git ls-remote --heads origin 'release/v*' 2>/dev/null | sed 's#.*refs/heads/##' | sort -V | tail -n 1 || true)
  [ -n "$latest" ] || die "origin has no release/v* branch; pass --base <ref>"
  BASE="origin/$latest"
fi
git rev-parse -q --verify "$BASE^{commit}" >/dev/null || die "base $BASE not found locally (fetch it first)"
MB=$(git merge-base "$BASE" HEAD)
HEAD_SHA=$(git rev-parse HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "audit-worktree: $PWD"
echo "branch: $BRANCH @ ${HEAD_SHA:0:12} — base: $BASE (merge-base ${MB:0:12})"
echo

# ---- 1. dirty ------------------------------------------------------------------------------
DIRTY=$(git status --short --untracked-files=all)
section "dirty" "$DIRTY"

# ---- 2. commits ----------------------------------------------------------------------------
section "commits $(printf '%s' "$MB" | cut -c1-12)..HEAD" "$(git log --oneline "$MB..HEAD")"

# ---- 3. diff --stat (working tree vs merge-base) ------------------------------------------
echo "diff --stat vs merge-base:"
STAT=$(git diff --stat "$MB")
if [ -n "$STAT" ]; then printf '%s\n' "$STAT" | sed 's/^/  /'; else echo "  (none)"; fi
echo

# Changed files = tracked changes versus the merge-base plus untracked files.
CHANGED=$({
  git diff --name-only "$MB"
  git ls-files --others --exclude-standard
} | sort -u)

# ---- 4. protected surfaces -----------------------------------------------------------------
PROTECTED=$(printf '%s\n' "$CHANGED" | { grep -E "$PROTECTED_RE" || true; })
section "protected surfaces" "$PROTECTED"

# ---- 5. removed assertion / test lines under tests/ ---------------------------------------
REMOVED=""
while IFS= read -r f; do
  [ -n "$f" ] || continue
  hits=$(git diff "$MB" -- "$f" | { grep -E '^-' || true; } | { grep -vE '^---' || true; } |
    { grep -E 'assert|test\(|it\(' || true; })
  [ -z "$hits" ] || REMOVED+="$(printf '%s\n' "$hits" | sed "s#^#$f: #")"$'\n'
done < <(printf '%s\n' "$CHANGED" | { grep -E '^tests/' || true; })
section "removed assert/test lines under tests/" "$REMOVED"

# ---- 6. eslint-suppressions.json counts that went up --------------------------------------
# Both versions are parsed with node: base from `git show <merge-base>:<path>` on stdin, head
# from the working tree. A file or rule missing on one side counts as 0.
SUPP_PATH="config/quality/eslint-suppressions.json"
SUPP_UP=$({ git show "$MB:$SUPP_PATH" 2>/dev/null || echo '{}'; } | node -e '
  const fs = require("fs");
  const base = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  const head = fs.existsSync(process.argv[1]) ? JSON.parse(fs.readFileSync(process.argv[1], "utf8")) : {};
  for (const [file, rules] of Object.entries(head)) {
    if (file.startsWith("_") || typeof rules !== "object" || rules === null) continue;
    const up = [];
    for (const [rule, v] of Object.entries(rules)) {
      const h = Number((v && v.count) || 0);
      const b = Number(((base[file] || {})[rule] || {}).count || 0);
      if (h > b) up.push(`${rule} ${b} → ${h}`);
    }
    if (up.length) process.stdout.write(`${file}: ${up.join(", ")}\n`);
  }' "$SUPP_PATH")
section "eslint-suppressions.json counts UP vs base (only DOWN is allowed)" "$SUPP_UP"

# ---- 7. new test-masking-allowlist.json keys ----------------------------------------------
ALLOW_PATH="config/quality/test-masking-allowlist.json"
ALLOW_NEW=$({ git show "$MB:$ALLOW_PATH" 2>/dev/null || echo '{}'; } | node -e '
  const fs = require("fs");
  const base = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  const head = fs.existsSync(process.argv[1]) ? JSON.parse(fs.readFileSync(process.argv[1], "utf8")) : {};
  for (const [key, reason] of Object.entries(head)) {
    if (key.startsWith("_") || key in base) continue;
    const text = String(reason).replace(/\s+/g, " ");
    process.stdout.write(`${key}: ${text.length > 120 ? text.slice(0, 117) + "..." : text}\n`);
  }' "$ALLOW_PATH")
section "new test-masking-allowlist.json keys (each needs a concrete justification)" "$ALLOW_NEW"

# ---- 8. leftover tsconfig.*tmp*.json / scratch files --------------------------------------
TMP_FILES=$({
  git ls-files --cached --others --exclude-standard | { grep -E "$TMP_RE" || true; }
  find . -maxdepth 1 -name 'tsconfig.*tmp*.json' | sed 's#^\./##'
} | sort -u)
section "leftover tsconfig.*tmp*.json / scratch files" "$TMP_FILES"

# ---- 9. PR head vs local HEAD --------------------------------------------------------------
PR_NUM="none"
HEAD_STATE="none"
if [ -z "$REPO" ]; then
  REPO=$(git remote get-url origin 2>/dev/null | sed -nE 's#.*github\.com[:/]([^/]+/[^/.]+)(\.git)?/?$#\1#p' || true)
  [ -n "$REPO" ] || REPO="cheaper-inference/OmniRoute"
fi
echo "pull request:"
if [ "$BRANCH" = "HEAD" ]; then
  echo "  detached HEAD — no branch to look up"
elif ! command -v "$GH" >/dev/null 2>&1; then
  echo "  gh not available ($GH) — PR lookup skipped"
else
  PR_JSON=$("$GH" pr list --repo "$REPO" --head "$BRANCH" --state open --json number,headRefOid,url 2>/dev/null || echo '[]')
  PR_LINE=$(printf '%s' "$PR_JSON" | node -e '
    let s = "";
    process.stdin.on("data", (d) => (s += d)).on("end", () => {
      let rows = [];
      try { rows = JSON.parse(s || "[]"); } catch { rows = []; }
      const p = Array.isArray(rows) ? rows[0] : undefined;
      process.stdout.write(p ? `${p.number} ${p.headRefOid || "-"} ${p.url || "-"}` : "none - -");
    });')
  read -r PR_NUM PR_OID PR_URL <<<"$PR_LINE"
  if [ "$PR_NUM" = "none" ]; then
    echo "  no open PR for $BRANCH in $REPO"
  else
    PR_NUM="#$PR_NUM"
    if [ "$PR_OID" = "$HEAD_SHA" ]; then
      HEAD_STATE="ok"
      echo "  PUSH LANDED — PR $PR_NUM head ${PR_OID:0:12} == local HEAD ($PR_URL)"
    else
      HEAD_STATE="mismatch"
      echo "  HEAD NOT PUSHED — PR $PR_NUM head ${PR_OID:0:12} != local HEAD ${HEAD_SHA:0:12} ($PR_URL)"
    fi
  fi
fi
if [ "$BRANCH" != "HEAD" ] && REMOTE_SHA=$(git rev-parse -q --verify "refs/remotes/origin/$BRANCH" 2>/dev/null); then
  if [ "$REMOTE_SHA" = "$HEAD_SHA" ]; then
    echo "  origin/$BRANCH == HEAD"
  else
    echo "  origin/$BRANCH at ${REMOTE_SHA:0:12} differs from HEAD ${HEAD_SHA:0:12} (last fetch/push)"
  fi
fi
echo

# ---- summary -------------------------------------------------------------------------------
N_DIRTY=$(count_lines "$DIRTY")
N_PROTECTED=$(count_lines "$PROTECTED")
N_REMOVED=$(count_lines "$REMOVED")
N_SUPP=$(count_lines "$SUPP_UP")
N_ALLOW=$(count_lines "$ALLOW_NEW")
N_TMP=$(count_lines "$TMP_FILES")
echo "audit-worktree: dirty=$N_DIRTY protected=$N_PROTECTED removed_asserts=$N_REMOVED suppressions_up=$N_SUPP allowlist_new=$N_ALLOW tmp_files=$N_TMP pr=$PR_NUM head=$HEAD_STATE"
[ "$N_PROTECTED" -eq 0 ] && [ "$N_TMP" -eq 0 ] && [ "$HEAD_STATE" != "mismatch" ]
