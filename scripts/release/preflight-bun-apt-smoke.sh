#!/usr/bin/env bash
# scripts/release/preflight-bun-apt-smoke.sh — proves Dockerfile.bun's `runner-web` stage installs
# on the Bun base image and that its Chromium launches, WITHOUT the 12 GB Next build the real stage
# sits on.
#
# The stage is `continue-on-error` in docker-publish.yml, so a broken install (dead apt packages
# such as gconf-service, stdc++6, fonts-kacst on v3.8.52 — #17236) never fails the build job; it
# only surfaced when the manifest guard tripped over the missing bun-web digest (#17223). And a
# stage that installs fine can still ship a browser Playwright cannot find: 3.8.54-web-bun had
# Debian's chromium but nothing under PLAYWRIGHT_BROWSERS_PATH, so chromium.launch() failed.
#
# This smoke replays the stage itself (FROM runner-base AS runner-web, every instruction up to the
# next FROM) in a throwaway image on a Docker host (default: the .113 build VPS, which the devbox
# reaches over ssh; set PREFLIGHT_DOCKER_HOST="" to build locally). The checkout's playwright and
# playwright-core packages stand in for the standalone build's node_modules. As the bun user it then
# launches Chromium through Playwright headless, headed under a private Xvfb, and through the
# /usr/bin/chromium path the system-browser lookups use.
#
# Usage: scripts/release/preflight-bun-apt-smoke.sh [Dockerfile.bun]
# Env:   PREFLIGHT_DOCKER_HOST  ssh target with Docker (default root@192.168.0.113); "" = local docker
set -euo pipefail
ROOT=$(git rev-parse --show-toplevel)
DOCKERFILE=${1:-"$ROOT/Dockerfile.bun"}
HOST=${PREFLIGHT_DOCKER_HOST-root@192.168.0.113}
OUT="$ROOT/_artifacts/preflight"
CTX="$OUT/bun-web-smoke"
REMOTE_CTX=/tmp/omniroute-bun-web-smoke

BASE=$(awk '/^FROM .* AS runner-base$/ { print $2; exit }' "$DOCKERFILE")
[ -n "$BASE" ] || { echo "runner-base FROM line not found in $DOCKERFILE" >&2; exit 2; }
# Every instruction of the runner-web stage, verbatim, minus its ENTRYPOINT.
STAGE=$(awk '
  /^FROM runner-base AS runner-web$/ { stage = 1; next }
  stage && /^FROM / { exit }
  stage && !/^ENTRYPOINT / { print }
' "$DOCKERFILE")
[ -n "$STAGE" ] || { echo "runner-web stage not found in $DOCKERFILE" >&2; exit 2; }

for pkg in playwright playwright-core; do
  [ -f "$ROOT/node_modules/$pkg/package.json" ] || {
    echo "node_modules/$pkg missing — run npm ci first" >&2
    exit 2
  }
done

rm -rf "$CTX"
mkdir -p "$CTX/node_modules"
cp -rL "$ROOT/node_modules/playwright" "$ROOT/node_modules/playwright-core" "$CTX/node_modules/"

cat > "$CTX/probe.cjs" <<'PROBE'
// Launches Chromium the three ways the app does; any failure exits 1.
const { spawn } = require("node:child_process");
const { chromium } = require("/app/node_modules/playwright-core");

async function launch(label, options) {
  const browser = await chromium.launch({ args: ["--no-sandbox"], ...options });
  const page = await (await browser.newContext()).newPage();
  await page.setContent("<title>ok</title>");
  if ((await page.title()) !== "ok") throw new Error(`${label}: page did not render`);
  console.log(`[probe] ${label} OK (Chromium ${browser.version()})`);
  await browser.close();
}

(async () => {
  const xvfb = spawn("Xvfb", [":99", "-screen", "0", "1280x800x24"], { stdio: "ignore" });
  await new Promise((resolve) => setTimeout(resolve, 1500));
  try {
    await launch("headless", { headless: true });
    await launch("headed under Xvfb", { headless: false, env: { ...process.env, DISPLAY: ":99" } });
    await launch("/usr/bin/chromium", { headless: true, executablePath: "/usr/bin/chromium" });
  } finally {
    xvfb.kill();
  }
})().catch((error) => {
  console.log(`[probe] FAIL: ${String(error && error.message).split("\n")[0]}`);
  process.exit(1);
});
PROBE

{
  echo "FROM $BASE"
  echo "WORKDIR /app"
  echo "COPY node_modules/ /app/node_modules/"
  printf '%s\n' "$STAGE"
  echo "COPY probe.cjs /tmp/probe.cjs"
  echo "RUN bun /tmp/probe.cjs"
} > "$CTX/Dockerfile"

FILTER='\[probe\]|^#[0-9]+ (DONE|ERROR)|E: |Package .* (is not|has no)'
echo "[bun-web-smoke] base=$BASE host=${HOST:-local}"
# The build's exit status decides; grep only trims the log (and finds nothing on some failures).
set +e
if [ -z "$HOST" ]; then
  docker build --no-cache --progress=plain -t omniroute-bun-web-smoke "$CTX" 2>&1 \
    | grep -E "$FILTER"
  status=${PIPESTATUS[0]}
  docker image rm -f omniroute-bun-web-smoke >/dev/null 2>&1
else
  # shellcheck disable=SC2029
  tar -C "$CTX" -czf - . | ssh -o BatchMode=yes "$HOST" \
    "rm -rf $REMOTE_CTX && mkdir -p $REMOTE_CTX && tar -xzf - -C $REMOTE_CTX && cd $REMOTE_CTX && docker build --no-cache --progress=plain -t omniroute-bun-web-smoke . 2>&1 | grep -E '$FILTER'; s=\${PIPESTATUS[0]}; docker image rm -f omniroute-bun-web-smoke >/dev/null 2>&1; rm -rf $REMOTE_CTX; exit \$s"
  status=$?
fi
set -e
[ "$status" -eq 0 ] || { echo "[bun-web-smoke] ❌ runner-web failed on $BASE" >&2; exit "$status"; }
echo "[bun-web-smoke] ✅ runner-web installs on $BASE and its Chromium launches"
