#!/usr/bin/env bash
# shellcheck disable=SC2016  # the embedded `node -e` programs use JS template literals on purpose
# ci-discriminate.sh — tell a PR's own CI reds from the ones it inherits from its base.
#
#   scripts/dev/ci-discriminate.sh <PR> [--ref-pr <N> | --base-red <issue>] [--repo <owner/repo>]
#
# For every failing check of <PR> the script downloads the job log through `gh`, strips the
# timestamps and colours, keeps the signature lines (✖ / ✗ / ::error / "gate(s) failed" /
# "[cycles] FAIL" / "i18n-check] FAIL" / TSnnnn / REGRESS — minus `printf` echo lines), drops
# durations, and writes the sorted unique set to <main checkout>/_artifacts/ci-disc/<PR>.txt
# (override the directory with CI_DISC_DIR). Each line is then classified:
#
#   own        names a file of `gh pr diff <PR> --name-only`, or carries the complexity
#              ratchet marker "REGRESSÃO (código novo)"
#   inherited  present in the reference set: the same extraction for --ref-pr (a near-empty
#              PR on the same base), or the body + comments of the --base-red issue
#   unknown    everything else — read the log before calling it flaky
#
# Checks still QUEUED / PENDING / IN_PROGRESS are listed explicitly: they are not a pass.
# Exit code: 1 when own > 0, 0 otherwise (2 on usage errors). Read-only: the only `gh`
# calls are `pr checks`, `pr diff`, `issue view` and `api .../jobs/<id>/logs`. GH_BIN overrides
# the `gh` binary (tests point it at a stub).
set -euo pipefail

usage() {
  cat >&2 <<'EOF'
usage: ci-discriminate.sh <PR> [--ref-pr <N> | --base-red <issue>] [--repo <owner/repo>]
  --ref-pr <N>       reference PR whose reds are inherited (same base, ideally near-empty)
  --base-red <issue> base-red issue whose body/comments list the inherited reds
  --repo <slug>      GitHub repository (default cheaper-inference/OmniRoute)
env: GH_BIN (gh binary), CI_DISC_DIR (where <PR>.txt lands; default <main checkout>/_artifacts/ci-disc)
EOF
}

die() {
  echo "ci-discriminate: $*" >&2
  exit 2
}

GH="${GH_BIN:-gh}"
REPO="cheaper-inference/OmniRoute"
PR=""
REF_PR=""
BASE_RED=""

while [ $# -gt 0 ]; do
  case "$1" in
    --ref-pr | --base-red | --repo)
      [ $# -ge 2 ] || die "missing value for $1"
      case "$1" in
        --ref-pr) REF_PR="$2" ;;
        --base-red) BASE_RED="$2" ;;
        --repo) REPO="$2" ;;
      esac
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
      [ -z "$PR" ] || {
        usage
        die "unexpected argument: $1"
      }
      PR="$1"
      shift
      ;;
  esac
done

[ -n "$PR" ] || {
  usage
  exit 2
}
[ -z "$REF_PR" ] || [ -z "$BASE_RED" ] || die "--ref-pr and --base-red are mutually exclusive"

# <main checkout>/_artifacts/ci-disc — from a worktree, the common git dir lives in the main
# checkout, so its parent is the shared place every session already uses for scratch output.
resolve_out_dir() {
  if [ -n "${CI_DISC_DIR:-}" ]; then
    printf '%s\n' "$CI_DISC_DIR"
  elif common=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null); then
    printf '%s/_artifacts/ci-disc\n' "$(dirname "$common")"
  else
    printf '%s/_artifacts/ci-disc\n' "$PWD"
  fi
}

OUT_DIR=$(resolve_out_dir)
mkdir -p "$OUT_DIR"
WORK="$OUT_DIR/.work-$PR-$$"
mkdir -p "$WORK"
trap 'rm -rf "$WORK"' EXIT
ERR_FILE="$WORK/stderr"
LAST_ERR=""

SIG_RE='(^|[[:space:]])✖ |(^|[[:space:]])✗ |::error|gate\(s\) failed|\[cycles\] FAIL|i18n-check\] FAIL|TS[0-9]{4}|REGRESS'

# stdin: raw text (job log or issue text) → stdout: normalized, sorted, unique signature lines.
# Normalization makes the three sources comparable: raw job logs render annotations as
# "##[error]<line>" (or "::error::<line>"), the base-red issue quotes reds as markdown bullets
# ("- <line>") and node:test appends a duration; all of that is dropped after the match.
extract_signatures() {
  sed -E 's/\r$//; s/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9:.]+Z ?//; s/\x1b\[[0-9;]*[A-Za-z]//g' |
    { grep -aE "$SIG_RE" || true; } |
    { grep -av printf || true; } |
    sed -E 's/^[[:space:]]+//; s/^(##\[(error|warning)\]|::(error|warning)[^:]*::|[-*] )+//; s/^[[:space:]]+//; s/[[:space:]]+$//; s/ \([0-9.]+ ?m?s\)$//' |
    { grep -av '^$' || true; } |
    sort -u
}

# $1 line → 0 when the reference set carries it. The base-red issue prefixes every red with
# its gate label ("❌ Typecheck (core): <line>"), so a reference line that CONTAINS the PR
# line counts; lines too short to be distinctive must match exactly.
in_reference() {
  [ -s "$REF_FILE" ] || return 1
  if [ "${#1}" -ge 12 ]; then
    grep -qF -- "$1" "$REF_FILE"
  else
    grep -qxF -- "$1" "$REF_FILE"
  fi
}

# $1 job id, $2 destination file. Retries HTTP 5xx up to three attempts; any other error is
# final. Returns 1 with the first stderr line in LAST_ERR when the log could not be fetched.
fetch_job_log() {
  local job="$1" dest="$2" attempt
  for attempt in 1 2 3; do
    if "$GH" api "repos/$REPO/actions/jobs/$job/logs" >"$dest" 2>"$ERR_FILE"; then
      return 0
    fi
    LAST_ERR=$(head -n 1 "$ERR_FILE")
    if [ "$attempt" -lt 3 ] && grep -qE 'HTTP 5[0-9]{2}' "$ERR_FILE"; then
      sleep 1
      continue
    fi
    return 1
  done
  return 1
}

# $1 checks JSON file → TSV "state<TAB>job-or-dash<TAB>link<TAB>name" per check.
checks_tsv() {
  node -e '
    const rows = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    for (const c of rows) {
      const m = /\/actions\/runs\/\d+\/jobs?\/(\d+)/.exec(c.link || "");
      process.stdout.write(`${c.state}\t${m ? m[1] : "-"}\t${c.link || "-"}\t${c.name}\n`);
    }' "$1"
}

# $1 PR number → writes $OUT_DIR/<PR>.txt plus $WORK/{failing,pending,other}-<PR>.txt.
collect_pr() {
  local pr="$1" checks="$WORK/checks-$1.json" raw="$WORK/raw-$1.txt" state job link name
  : >"$raw"
  : >"$WORK/failing-$pr.txt"
  : >"$WORK/pending-$pr.txt"
  : >"$WORK/other-$pr.txt"
  # `gh pr checks` exits 1 when a check failed and 8 while checks are pending — the JSON is
  # still complete, so only an unparsable body is an error.
  "$GH" pr checks "$pr" --repo "$REPO" --json name,state,link >"$checks" 2>"$ERR_FILE" || true
  if ! node -e 'JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))' "$checks" 2>/dev/null; then
    die "could not read the checks of PR #$pr: $(head -n 1 "$ERR_FILE" 2>/dev/null || true)"
  fi
  while IFS=$'\t' read -r state job link name; do
    case "$state" in
      FAILURE | TIMED_OUT | ERROR | ACTION_REQUIRED | STARTUP_FAILURE)
        printf '%s\n' "$name" >>"$WORK/failing-$pr.txt"
        if [ "$job" = "-" ]; then
          printf '[check] %s %s (no job log: %s)\n' "$name" "$state" "$link" >>"$raw"
        elif fetch_job_log "$job" "$WORK/job-$job.log"; then
          extract_signatures <"$WORK/job-$job.log" >>"$raw"
        else
          printf '[check] %s %s (log unavailable: %s)\n' "$name" "$state" "$LAST_ERR" >>"$raw"
        fi
        ;;
      QUEUED | PENDING | IN_PROGRESS | WAITING | REQUESTED)
        printf '%s\n' "$name" >>"$WORK/pending-$pr.txt"
        ;;
      SUCCESS | SKIPPED | NEUTRAL) ;;
      *)
        printf '%s (%s)\n' "$name" "$state" >>"$WORK/other-$pr.txt"
        ;;
    esac
  done < <(checks_tsv "$checks")
  sort -u "$raw" >"$OUT_DIR/$pr.txt"
}

# $1 issue number → the signature lines quoted in its body and comments (markdown bullets
# stripped so "- 2 gate(s) failed" matches the raw log line).
collect_issue() {
  local issue="$1" json="$WORK/issue-$1.json"
  "$GH" issue view "$issue" --repo "$REPO" --json body,comments >"$json" 2>"$ERR_FILE" ||
    die "could not read issue #$issue: $(head -n 1 "$ERR_FILE" 2>/dev/null || true)"
  node -e '
    const i = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    const parts = [i.body || "", ...(i.comments || []).map((c) => c.body || "")];
    process.stdout.write(parts.join("\n") + "\n");' "$json" |
    extract_signatures >"$REF_FILE"
}

# $1 file, $2 label → prints "label (n):" followed by the indented lines or "(none)".
print_section() {
  local file="$1" label="$2" n
  n=$(grep -c . "$file" || true)
  printf '%s (%s):\n' "$label" "$n"
  if [ "$n" -gt 0 ]; then
    sed 's/^/  /' "$file"
  else
    echo "  (none)"
  fi
  echo
}

count_lines() {
  grep -c . "$1" || true
}

# ---- gather --------------------------------------------------------------------------------
collect_pr "$PR"
REF_FILE="$WORK/reference.txt"
: >"$REF_FILE"
REF_LABEL="none"
if [ -n "$REF_PR" ]; then
  collect_pr "$REF_PR"
  cp "$OUT_DIR/$REF_PR.txt" "$REF_FILE"
  REF_LABEL="PR #$REF_PR"
elif [ -n "$BASE_RED" ]; then
  collect_issue "$BASE_RED"
  REF_LABEL="issue #$BASE_RED"
fi

DIFF_FILES="$WORK/diff.txt"
"$GH" pr diff "$PR" --repo "$REPO" --name-only 2>"$ERR_FILE" | { grep -v '^$' || true; } >"$DIFF_FILES" ||
  die "could not read the diff of PR #$PR: $(head -n 1 "$ERR_FILE" 2>/dev/null || true)"

# ---- classify ------------------------------------------------------------------------------
: >"$WORK/own.txt"
: >"$WORK/inherited.txt"
: >"$WORK/unknown.txt"
while IFS= read -r line; do
  in_ref=0
  if in_reference "$line"; then in_ref=1; fi
  if [[ "$line" == *"REGRESSÃO (código novo)"* ]] ||
    { [ -s "$DIFF_FILES" ] && printf '%s\n' "$line" | grep -qF -f "$DIFF_FILES"; }; then
    if [ "$in_ref" = 1 ]; then
      printf '%s  [also in %s]\n' "$line" "$REF_LABEL" >>"$WORK/own.txt"
    else
      printf '%s\n' "$line" >>"$WORK/own.txt"
    fi
  elif [ "$in_ref" = 1 ]; then
    printf '%s\n' "$line" >>"$WORK/inherited.txt"
  else
    printf '%s\n' "$line" >>"$WORK/unknown.txt"
  fi
done <"$OUT_DIR/$PR.txt"

# ---- report --------------------------------------------------------------------------------
echo "ci-discriminate: PR #$PR ($REPO) — reference: $REF_LABEL"
echo "failing checks ($(count_lines "$WORK/failing-$PR.txt")): $(paste -sd ',' "$WORK/failing-$PR.txt" | sed 's/,/, /g')"
if [ -s "$WORK/pending-$PR.txt" ]; then
  echo "pending — not a pass ($(count_lines "$WORK/pending-$PR.txt")): $(paste -sd ',' "$WORK/pending-$PR.txt" | sed 's/,/, /g')"
else
  echo "pending — not a pass (0): none"
fi
if [ -s "$WORK/other-$PR.txt" ]; then
  echo "other non-pass states ($(count_lines "$WORK/other-$PR.txt")): $(paste -sd ',' "$WORK/other-$PR.txt" | sed 's/,/, /g')"
fi
echo "signatures: $OUT_DIR/$PR.txt ($(count_lines "$OUT_DIR/$PR.txt") lines)"
echo
print_section "$WORK/own.txt" "own"
print_section "$WORK/inherited.txt" "inherited"
print_section "$WORK/unknown.txt" "unknown"

OWN=$(count_lines "$WORK/own.txt")
INHERITED=$(count_lines "$WORK/inherited.txt")
UNKNOWN=$(count_lines "$WORK/unknown.txt")
echo "ci-discriminate: own=$OWN inherited=$INHERITED unknown=$UNKNOWN"
[ "$OWN" -eq 0 ]
