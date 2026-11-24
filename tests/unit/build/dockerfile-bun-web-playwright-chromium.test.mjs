import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (rel) => readFileSync(new URL(`../../../${rel}`, import.meta.url), "utf8");

/** Body of one `FROM … AS <name>` stage, up to the next FROM (or EOF). */
function stageBody(dockerfile, name) {
  const lines = dockerfile.split("\n");
  const start = lines.findIndex((line) => new RegExp(`^FROM \\S+ AS ${name}$`).test(line));
  assert.notEqual(start, -1, `stage ${name} not found`);
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => /^FROM /.test(line));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n");
}

/** Instructions only: comment lines dropped, so prose about the old setup does not match. */
const instructions = (body) =>
  body
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");

const bunWeb = instructions(stageBody(read("Dockerfile.bun"), "runner-web"));

test("Bun runner-web does not install Chromium from apt", () => {
  // The Debian chromium / chromium-common / chromium-driver packages carried ~720 HIGH
  // findings with no Debian fix in 3.8.54-web-bun, and chromium-driver was never used.
  assert.doesNotMatch(bunWeb, /\bchromium-driver\b/);
  assert.doesNotMatch(bunWeb, /apt-get install[^\n]*\\\n(?:[^\n]*\\\n)*\s*chromium\s*\\/);
  assert.doesNotMatch(bunWeb, /^\s+chromium\s*\\?$/m);
});

test("Bun runner-web installs Playwright's own Chromium, like the Node runner-web", () => {
  // 3.8.54-web-bun: chromium.launch() failed with "Executable doesn't exist at
  // /home/bun/.cache/ms-playwright/…" because nothing populated Playwright's browser path.
  assert.match(bunWeb, /^ENV PLAYWRIGHT_BROWSERS_PATH=\/home\/bun\/\.cache\/ms-playwright$/m);
  assert.match(bunWeb, /\bbun node_modules\/playwright\/cli\.js install chromium --with-deps\b/);
  assert.match(bunWeb, /chown -R bun:bun \/home\/bun\/\.cache/);
  assert.doesNotMatch(bunWeb, /PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD/);
  const browsersEnv = bunWeb.indexOf("ENV PLAYWRIGHT_BROWSERS_PATH=");
  const install = bunWeb.indexOf("install chromium --with-deps");
  assert.ok(
    browsersEnv !== -1 && browsersEnv < install,
    "browsers path must be set before install"
  );
});

test("Bun runner-web ships Xvfb for headed Chromium (#15300)", () => {
  assert.match(bunWeb, /apt-get install -y --no-install-recommends xvfb/);
});

test("Bun runner-web keeps /usr/bin/chromium for the system-browser lookups", () => {
  // ChatGPT Web, Codex Web and the Adobe Firefly login look for a browser at /usr/bin/chromium.
  assert.match(
    bunWeb,
    /ln -sf "\$\(bun -e '[^']*require\("playwright-core"\)\.chromium\.executablePath\(\)[^']*'\)" \/usr\/bin\/chromium/
  );
  assert.match(bunWeb, /\/usr\/bin\/chromium --version/);
  assert.match(bunWeb, /^ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=\/usr\/bin\/chromium$/m);
  for (const lookup of [
    "open-sse/utils/chatgptWebExecutorAdapter.ts",
    "open-sse/executors/chatgpt-web-codex.ts",
    "open-sse/services/adobeFireflyBrowserLogin.ts",
  ]) {
    assert.match(
      read(lookup),
      /"\/usr\/bin\/chromium"/,
      `${lookup} no longer probes /usr/bin/chromium`
    );
  }
});

test("Bun runner-web drops back to the bun user", () => {
  const users = [...bunWeb.matchAll(/^USER (\S+)$/gm)].map((match) => match[1]);
  assert.equal(users.at(-1), "bun");
});

test("the release preflight smoke builds the real runner-web stage and launches Chromium", () => {
  const smoke = read("scripts/release/preflight-bun-apt-smoke.sh");
  // It must replay the stage itself, not a hand-kept copy of the package list.
  assert.match(smoke, /FROM runner-base AS runner-web/);
  assert.match(smoke, /node_modules\/playwright-core/);
  assert.match(smoke, /headless: false/);
  assert.match(smoke, /Xvfb/);
});
