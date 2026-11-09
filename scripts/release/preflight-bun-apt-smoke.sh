#!/usr/bin/env bash
# scripts/release/preflight-bun-apt-smoke.sh — proves the apt list of Dockerfile.bun's `runner-web`
# stage installs on the Bun base image, WITHOUT the 12 GB Next build the real stage sits on.
#
# The stage is `continue-on-error` in docker-publish.yml, so a dead package (gconf-service,
# stdc++6, fonts-kacst on v3.8.52 — #17236) never fails the build job; it only surfaced when the
# manifest guard tripped over the missing bun-web digest (#17223). This smoke runs the same
# `apt-get install` block in a throwaway image on a Docker host (default: the .113 build VPS, which
# the devbox reaches over ssh; set PREFLIGHT_DOCKER_HOST="" to build locally) and asks the installed
# Chromium for its version.
#
# Usage: scripts/release/preflight-bun-apt-smoke.sh [Dockerfile.bun]
# Env:   PREFLIGHT_DOCKER_HOST  ssh target with Docker (default root@192.168.0.113); "" = local docker
set -euo pipefail
ROOT=$(git rev-parse --show-toplevel)
DOCKERFILE=${1:-"$ROOT/Dockerfile.bun"}
HOST=${PREFLIGHT_DOCKER_HOST-root@192.168.0.113}
OUT="$ROOT/_artifacts/preflight"
mkdir -p "$OUT"
SMOKE="$OUT/bun-apt-smoke.Dockerfile"

BASE=$(awk '/^FROM .* AS runner-base$/ { print $2; exit }' "$DOCKERFILE")
[ -n "$BASE" ] || { echo "runner-base FROM line not found in $DOCKERFILE" >&2; exit 2; }
# The RUN apt-get … block of the runner-web stage, verbatim (first RUN after its FROM).
APT_BLOCK=$(awk '
  /^FROM runner-base AS runner-web$/ { stage = 1; next }
  stage && /^RUN apt-get/ { grab = 1 }
  grab { print }
  grab && !/\\$/ { exit }
' "$DOCKERFILE")
[ -n "$APT_BLOCK" ] || { echo "runner-web apt block not found in $DOCKERFILE" >&2; exit 2; }

{
  echo "FROM $BASE"
  echo "USER root"
  printf '%s\n' "$APT_BLOCK"
  echo 'RUN /usr/bin/chromium --version'
} > "$SMOKE"

echo "[bun-apt-smoke] base=$BASE host=${HOST:-local}"
if [ -z "$HOST" ]; then
  docker build --no-cache -f "$SMOKE" -t omniroute-bun-apt-smoke "$OUT"
else
  scp -q -o BatchMode=yes "$SMOKE" "$HOST:/tmp/omniroute-bun-apt-smoke.Dockerfile"
  # shellcheck disable=SC2029
  ssh -o BatchMode=yes "$HOST" 'cd /tmp && docker build --no-cache -f omniroute-bun-apt-smoke.Dockerfile -t omniroute-bun-apt-smoke . 2>&1 | grep -E "^#[0-9]+ (DONE|ERROR)|E: |Chromium [0-9]|Package .* (is not|has no)" ; exit ${PIPESTATUS[0]}'
fi
echo "[bun-apt-smoke] ✅ the runner-web apt list installs on $BASE"
