#!/usr/bin/env bash
# Keeps ONE pull request open that syncs packages/ui-kit to the newest upstream release. The UI Kit
# upstream watch workflow calls it when the pinned kit is behind. It never merges: every kit release
# still needs a visual check on the local VPS before it lands.
#
# One rolling branch, not one per version, because upstream can ship several releases a day:
#   - the open PR's branch is rebuilt from the release branch when a newer release is out;
#   - a branch already at the newest release is left alone, so a build under review doesn't move;
#   - an open PR with commits pushed by hand is never overwritten: a sync often needs fixes;
#   - a PR for this version that a maintainer closed unmerged stays closed.
#
# Without HAS_PR_TOKEN=true the branch is still pushed and no PR is opened: the default GITHUB_TOKEN
# can't create PRs in this repository, and a PR it opened wouldn't trigger CI anyway.
#
# Environment: REPO, BASE, LATEST_VERSION, LATEST_COMMIT, PINNED_COMMIT; optional KIT_TOKEN,
# HAS_PR_TOKEN, BASE_RED_ISSUE, KIT_URL. Writes `decision`, `branch` and `pr_url` to GITHUB_OUTPUT.
set -euo pipefail

: "${REPO:?}" "${BASE:?}" "${LATEST_VERSION:?}" "${LATEST_COMMIT:?}" "${PINNED_COMMIT:?}"
KIT_URL="${KIT_URL:-https://github.com/keak-ai/cheaper-inference-ui-kit.git}"
BRANCH="chore/ui-kit-sync-latest"
BOT_EMAIL="41898282+github-actions[bot]@users.noreply.github.com"
CLONE="_references/cheaper-inference-ui-kit"
TITLE="chore(dashboard): sync the vendored CI UI Kit to ${LATEST_VERSION}"
FRAGMENT="changelog.d/maintenance/0000-ui-kit-${LATEST_VERSION//./-}.md"

report() {
  echo "$1=$2" >> "${GITHUB_OUTPUT:-/dev/null}"
}

upstream_version() {
  sed -n 's/^- version:[[:space:]]*//p' | head -1
}

report branch "$BRANCH"

OPEN_PR=$(gh pr list --repo "$REPO" --head "$BRANCH" --state open --json url --jq '.[0].url // empty')
if [ -z "$OPEN_PR" ]; then
  DECLINED=$(gh pr list --repo "$REPO" --head "$BRANCH" --state closed --limit 100 --json title,mergedAt \
    | jq --arg title "$TITLE" '[.[] | select(.mergedAt == null and .title == $title)] | length')
  if [ "$DECLINED" != 0 ]; then
    echo "The sync PR for ${LATEST_VERSION} was closed without merging; leaving it closed."
    report decision declined
    exit 0
  fi
fi

REMOTE_SHA=$(git ls-remote --heads origin "$BRANCH" | cut -f1)
REMOTE_VERSION=""
if [ -n "$REMOTE_SHA" ]; then
  git fetch -q --depth=1 origin "$BRANCH"
  REMOTE_VERSION=$(git show FETCH_HEAD:packages/ui-kit/UPSTREAM.md | upstream_version)
  REMOTE_AUTHOR=$(git log -1 --format=%ae FETCH_HEAD)
  if [ -n "$OPEN_PR" ] && [ "$REMOTE_VERSION" != "$LATEST_VERSION" ] && [ "$REMOTE_AUTHOR" != "$BOT_EMAIL" ]; then
    echo "$OPEN_PR has commits pushed by hand; not overwriting them with ${LATEST_VERSION}."
    report decision hand-edited
    exit 0
  fi
fi

if [ "$REMOTE_VERSION" = "$LATEST_VERSION" ]; then
  echo "$BRANCH is already at ${LATEST_VERSION}."
  if [ -n "$OPEN_PR" ]; then
    # Not edited: rewriting the body every day would untick the checklist.
    report decision current
    report pr_url "$OPEN_PR"
    exit 0
  fi
else
  (
    if [ -n "${KIT_TOKEN:-}" ]; then
      AUTH=$(printf 'x-access-token:%s' "$KIT_TOKEN" | base64 -w0)
      echo "::add-mask::$AUTH"
      # Scoped to the kit's URL and passed through the environment, never argv or .git/config.
      export GIT_CONFIG_COUNT=1
      export GIT_CONFIG_KEY_0="http.${KIT_URL}.extraheader"
      export GIT_CONFIG_VALUE_0="AUTHORIZATION: basic $AUTH"
    fi
    git clone -q "$KIT_URL" "$CLONE"
    scripts/dev/sync-ui-kit.sh "$LATEST_COMMIT"
    node scripts/check/check-ui-kit-snapshot.mjs
  )
  SYNCED_VERSION=$(upstream_version < packages/ui-kit/UPSTREAM.md)
  if [ "$SYNCED_VERSION" != "$LATEST_VERSION" ]; then
    echo "Tag v${LATEST_VERSION} holds version ${SYNCED_VERSION}; refusing to open a PR." >&2
    exit 1
  fi
  # shellcheck disable=SC2016 # the backticks are Markdown code spans, not substitutions
  printf -- '- **chore(dashboard):** the vendored Keak CI UI Kit moves to %s (`packages/ui-kit`, upstream `%s`).\n' \
    "$LATEST_VERSION" "${LATEST_COMMIT:0:7}" > "$FRAGMENT"
  git switch -q -c "$BRANCH"
  git add packages/ui-kit package-lock.json "$FRAGMENT"
  git -c user.name="github-actions[bot]" \
    -c user.email="$BOT_EMAIL" \
    commit -q -m "$TITLE" \
    -m "packages/ui-kit moves from upstream ${PINNED_COMMIT:0:7} to ${LATEST_COMMIT:0:7} (${LATEST_VERSION}) through scripts/dev/sync-ui-kit.sh."
  # The lease refuses to overwrite a commit somebody pushed to the branch after we read it.
  git push -q --force-with-lease="${BRANCH}:${REMOTE_SHA}" origin "HEAD:refs/heads/${BRANCH}"
  echo "Pushed $BRANCH at ${LATEST_VERSION}."
fi

if [ "${HAS_PR_TOKEN:-}" != "true" ]; then
  echo "UI_KIT_SYNC_PR_TOKEN is not set: the branch is pushed, but no PR was opened."
  report decision branch-only
  exit 0
fi

BODY=$(mktemp)
# shellcheck disable=SC2016 # the backticks are Markdown code spans, not substitutions
{
  if [ -n "${BASE_RED_ISSUE:-}" ]; then printf '⚠️ base-red inherited: #%s\n\n' "$BASE_RED_ISSUE"; fi
  printf '## Summary\n\nSyncs the vendored Keak CI UI Kit (`packages/ui-kit`) to `%s` (upstream `%s`). The UI Kit upstream watch keeps this one PR at the newest release.\n\n' \
    "$LATEST_VERSION" "${LATEST_COMMIT:0:7}"
  printf 'Upstream changes: https://github.com/keak-ai/cheaper-inference-ui-kit/compare/%s...%s\n\n' \
    "$PINNED_COMMIT" "$LATEST_COMMIT"
  printf '## Before merge\n\n'
  printf -- '- [ ] CI is green, or every red check is inherited from the base.\n'
  printf -- '- [ ] Any dependency the kit added is already in `package.json`.\n'
  printf -- '- [ ] Visual check of a build of this branch on the local VPS (`deploy-vps-local`), in both themes.\n'
  printf -- '- [ ] The changelog fragment names the visible changes.\n'
} > "$BODY"

if [ -n "$OPEN_PR" ]; then
  gh pr edit "$OPEN_PR" --repo "$REPO" --base "$BASE" --title "$TITLE" --body-file "$BODY" > /dev/null
  PR_URL="$OPEN_PR"
  report decision updated
else
  PR_URL=$(gh pr create --repo "$REPO" --base "$BASE" --head "$BRANCH" --title "$TITLE" --body-file "$BODY")
  report decision opened
fi
report pr_url "$PR_URL"
echo "Sync PR: $PR_URL"
