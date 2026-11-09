#!/usr/bin/env bash
# scripts/release/preflight-build.sh — /generate-release Phase 0: the build checks that explode
# only on the tag, run BEFORE the freeze (v3.8.52 lessons, 2026-10-20).
#
# Why this exists: the PR CI never exercises the three surfaces that broke the v3.8.52 tag —
#   • `npm ci` in electron/ (electron-release.yml installs with `ci`; the CI smoke uses `install`,
#     which repairs a stale lock silently — #15157 on v3.8.51, #17212 on v3.8.52);
#   • the Bun `runner-web` image's apt list (best-effort stage, `continue-on-error` — dead packages
#     only surfaced through the manifest guard on the release run, #17223 / #17236);
#   • the README/llm.txt current-version claims the cycle bump used to skip (#17237).
# plus the packaging path npm-publish runs (build:cli → check:pack-boot) and the vitest suite.
#
# Usage:
#   scripts/release/preflight-build.sh            # everything (build:cli can take 25–55 min locally)
#   scripts/release/preflight-build.sh --quick    # lockfiles + version claims only (~20 s)
#   scripts/release/preflight-build.sh --no-build # skip build:cli / pack-boot (CI artifact already proven)
#   scripts/release/preflight-build.sh --no-docker# skip the Dockerfile.bun apt smoke (needs ssh to the .113)
# Logs: _artifacts/preflight/<check>.log (gitignored). Exit 1 on the first class of failure, after
# running every check, so one run lists everything to fix.

set -uo pipefail
ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"
QUICK=0
BUILD=1
DOCKER=1
for a in "$@"; do
  case "$a" in
    --quick) QUICK=1 ;;
    --no-build) BUILD=0 ;;
    --no-docker) DOCKER=0 ;;
    -h | --help)
      sed -n '2,20p' "$0"
      exit 0
      ;;
  esac
done
VERSION=$(node -p "require('./package.json').version")
LOGDIR="$ROOT/_artifacts/preflight"
mkdir -p "$LOGDIR"
FAIL=0
ROWS=()

run() {
  # run <name> <timeout-seconds> <command...>
  local name=$1 to=$2
  shift 2
  local slug log t0 st rc
  slug=$(printf '%s' "$name" | tr -c 'A-Za-z0-9' '_')
  log="$LOGDIR/$slug.log"
  t0=$(date +%s)
  if timeout "$to" "$@" > "$log" 2>&1; then
    st=PASS
  else
    rc=$?
    st="FAIL(rc=$rc)"
    FAIL=1
  fi
  ROWS+=("| $name | $st | $(( $(date +%s) - t0 ))s | $log |")
  echo "[$st] $name ($(( $(date +%s) - t0 ))s)"
}

echo "preflight-build v$VERSION — $(date -u +%Y-%m-%dT%H:%M:%SZ) — quick=$QUICK build=$BUILD docker=$DOCKER"

run "version claims (README.md, llm.txt)" 60 \
  node scripts/release/bump-version-claims.mjs --check --to "$VERSION"
run "root lockfile in sync (npm ci --dry-run)" 300 \
  npm ci --dry-run --ignore-scripts
run "electron lockfile in sync (npm ci --dry-run)" 300 \
  bash -c 'cd electron && npm ci --dry-run --ignore-scripts'

if [ "$QUICK" -eq 0 ]; then
  run "vitest (MCP, autoCombo, cache)" 1200 npm run test:vitest
  if [ "$BUILD" -eq 1 ]; then
    run "build:cli (standalone + CLI bundle)" 4000 npm run build:cli
    run "pack-boot (the tarball users install boots)" 900 npm run check:pack-boot
  fi
  if [ "$DOCKER" -eq 1 ]; then
    run "Dockerfile.bun runner-web apt smoke (.113)" 900 \
      scripts/release/preflight-bun-apt-smoke.sh
  fi
fi

echo
echo "| Check | Result | Time | Log |"
echo "| --- | --- | ---: | --- |"
printf '%s\n' "${ROWS[@]}"
echo
if [ "$FAIL" -ne 0 ]; then
  echo "❌ preflight-build: at least one check failed — fix on the release branch BEFORE the freeze."
  exit 1
fi
echo "✅ preflight-build: every check passed for v$VERSION."
