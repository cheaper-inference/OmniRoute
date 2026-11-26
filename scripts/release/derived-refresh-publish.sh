#!/usr/bin/env bash
# Run from the nightly CI checkout. The file list is sorted and NUL-delimited.
set -euo pipefail

BRANCH="$1"
TITLE="$2"
BODY_FILE="$3"
FILES_FILE="$4"

# The bot must be both author and committer. A maintainer's amend can keep the bot as author.
robot_tip() {
  [ "$(git log -1 --format='%ae %ce' "$1")" = "$BOT_EMAIL $BOT_EMAIL" ]
}

OPEN_PR=$(gh pr list --repo "$GITHUB_REPOSITORY" --head "$BRANCH" --state open \
  --json number,baseRefName,isCrossRepository \
  --jq 'map(select(.isCrossRepository == false)) | .[0] | select(.) | "\(.number) \(.baseRefName)"')
NUM="${OPEN_PR%% *}"
OLD_BASE="${OPEN_PR#* }"
REF="refs/heads/$BRANCH"
REMOTE_SHA=$(git ls-remote --heads origin "$REF" | cut -f1)

if [ -n "$REMOTE_SHA" ]; then
  git fetch -q --depth=1 origin "$REF"
  if [ "$(git rev-parse FETCH_HEAD)" != "$REMOTE_SHA" ]; then
    echo "::error::$BRANCH moved while reading its remote tip. Retry the refresh."
    exit 1
  fi
  if ! robot_tip "$REMOTE_SHA"; then
    echo "\`$BRANCH\` has a tip pushed by hand. Left the branch and any open PR as is." >> "$GITHUB_STEP_SUMMARY"
    exit 0
  fi
fi

if [ ! -s "$FILES_FILE" ]; then
  echo "No refreshed files for \`$BRANCH\` on \`$BASE\`." >> "$GITHUB_STEP_SUMMARY"
  if [ -n "$NUM" ] && [ -n "$REMOTE_SHA" ]; then
    CURRENT_HEAD=$(gh pr view "$NUM" --repo "$GITHUB_REPOSITORY" --json headRefOid --jq .headRefOid)
    if [ "$CURRENT_HEAD" != "$REMOTE_SHA" ]; then
      echo "::error::PR #$NUM moved while checking whether to close it. Retry the refresh."
      exit 1
    fi
    gh pr close "$NUM" --repo "$GITHUB_REPOSITORY" \
      --comment "Closed by the nightly derived refresh. No refreshed files for this PR on \`$BASE\` (${RUN_URL})." > /dev/null
    echo "Closed the stale refresh PR #$NUM." >> "$GITHUB_STEP_SUMMARY"
  fi
  exit 0
fi

mapfile -d '' -t FILES < "$FILES_FILE"
COUNT="${#FILES[@]}"
# Both calls rebuild from the same base and read from the same full staged snapshot.
git checkout -q --detach "$BASE_SHA"
git reset -q --hard "$BASE_SHA"
git --literal-pathspecs diff --binary --no-renames --no-ext-diff --no-textconv \
  "$BASE_SHA" "$REFRESH_TREE" -- "${FILES[@]}" | git apply --index
if ! git diff --cached --name-only --no-renames -z | LC_ALL=C sort -z | cmp -s "$FILES_FILE" -; then
  echo "::error::Staged paths differ from the file list for $BRANCH."
  exit 1
fi

{
  if [ -n "${BASE_RED_ISSUE:-}" ]; then printf '⚠️ base-red inherited: #%s\n\n' "$BASE_RED_ISSUE"; fi
  cat "$BODY_FILE"
  printf '\n## Files (%s)\n\n' "$COUNT"
  # shellcheck disable=SC2016 # The backticks are Markdown code spans.
  git diff --cached --name-only --no-renames | sed -n '1,200{s/^/- `/;s/$/`/;p;}'
} > "${BODY_FILE}.rendered"

REMOTE_PARENTS=""
REMOTE_TREE=""
if [ -n "$REMOTE_SHA" ]; then
  # Read the raw parent header because a depth-1 fetch marks the tip as shallow.
  REMOTE_PARENTS=$(git cat-file commit "$REMOTE_SHA" | sed -n '1,/^$/s/^parent //p')
  REMOTE_TREE=$(git rev-parse "${REMOTE_SHA}^{tree}")
fi
STAGED_TREE=$(git write-tree)
if [ "$REMOTE_PARENTS" = "$BASE_SHA" ] && [ "$REMOTE_TREE" = "$STAGED_TREE" ]; then
  echo "\`$BRANCH\` has the same parent and tree. Skipped commit and push to preserve its SHA." >> "$GITHUB_STEP_SUMMARY"
else
  git -c user.name="$BOT_NAME" -c user.email="$BOT_EMAIL" commit -q -m "$TITLE" \
    -m "npm run release:refresh-derived -- --profile=nightly on ${BASE}: ${COUNT} file(s)." \
    -m "Run: ${RUN_URL}"
  # A missing SHA means the branch must still be absent. A later push invalidates either lease.
  git push -q --force-with-lease="${REF}:${REMOTE_SHA}" origin "HEAD:${REF}"
fi

if [ "$HAS_PR_TOKEN" != "true" ]; then
  {
    echo "\`$BRANCH\` has ${COUNT} refreshed file(s) on origin, but no PR was opened:"
    echo "neither \`DERIVED_REFRESH_PR_TOKEN\` nor \`I18N_REFRESH_TOKEN\` is set. Open it from that branch against \`$BASE\`."
  } >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi

if [ -z "$NUM" ]; then
  URL=$(gh pr create --repo "$GITHUB_REPOSITORY" --base "$BASE" --head "$BRANCH" \
    --title "$TITLE" --body-file "${BODY_FILE}.rendered")
  echo "Opened $URL from \`$BRANCH\`." >> "$GITHUB_STEP_SUMMARY"
else
  gh pr edit "$NUM" --repo "$GITHUB_REPOSITORY" --base "$BASE" --title "$TITLE" \
    --body-file "${BODY_FILE}.rendered" > /dev/null
  if [ "$OLD_BASE" != "$BASE" ]; then
    # gh pr edit --base can fail silently. Hard Rule #21 requires verifying the retarget.
    NEW_BASE=$(gh pr view "$NUM" --repo "$GITHUB_REPOSITORY" --json baseRefName --jq .baseRefName)
    [ "$NEW_BASE" = "$BASE" ] || { echo "::error::retarget of #$NUM to $BASE did not apply"; exit 1; }
  fi
  echo "Updated #$NUM from \`$BRANCH\`." >> "$GITHUB_STEP_SUMMARY"
fi
