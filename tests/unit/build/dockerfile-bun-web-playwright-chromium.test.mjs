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

const bunDockerfile = read("Dockerfile.bun");
const bunWeb = instructions(stageBody(bunDockerfile, "runner-web"));
const webCommands = bunWeb.replace(/\\\n/g, " ");
const apkPackages = [...webCommands.matchAll(/\bapk add\s+([^&;|\n]+)/g)].flatMap((match) =>
  match[1]
    .trim()
    .split(/\s+/)
    .filter((word) => !word.startsWith("-"))
);

test("Bun runner-web does not install Wolfi Chromium packages", () => {
  assert.doesNotMatch(bunWeb, /\bchromium-driver\b/);
  for (const pkg of apkPackages) {
    assert.doesNotMatch(pkg, /^(?:chromium|chromium-driver)(?:$|[=<>~@])/);
  }
});

test("Bun builder materializes the complete Playwright installer", () => {
  const builder = instructions(stageBody(bunDockerfile, "builder")).replace(/\\\n/g, " ");
  assert.match(
    builder,
    /&&\s+cp -RL node_modules\/playwright node_modules\/playwright-core \/opt\/playwright\/node_modules\/\s+&&\s+test -f \/opt\/playwright\/node_modules\/playwright\/cli\.js$/m
  );
});

test("Bun runner-web installs Playwright's own Chromium without installing OS dependencies through Playwright", () => {
  // 3.8.54-web-bun: chromium.launch() failed with "Executable doesn't exist at
  // /home/bun/.cache/ms-playwright/…" because nothing populated Playwright's browser path.
  assert.match(bunWeb, /^ENV PLAYWRIGHT_BROWSERS_PATH=\/home\/bun\/\.cache\/ms-playwright$/m);
  assert.match(bunWeb, /^COPY --from=builder \/opt\/playwright \/opt\/playwright$/m);
  assert.match(
    webCommands,
    /\bbun \/opt\/playwright\/node_modules\/playwright\/cli\.js install chromium\s*(?:&&|$)/m
  );
  assert.doesNotMatch(bunWeb, /--with-deps\b/);
  assert.match(bunWeb, /chown -R bun:bun \/home\/bun\/\.cache/);
  assert.doesNotMatch(bunWeb, /PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD/);
  const browsersEnv = bunWeb.indexOf("ENV PLAYWRIGHT_BROWSERS_PATH=");
  const install = bunWeb.indexOf(
    "bun /opt/playwright/node_modules/playwright/cli.js install chromium"
  );
  assert.ok(
    browsersEnv !== -1 && browsersEnv < install,
    "browsers path must be set before install"
  );
});

test("Bun runner-web ships Xvfb for headed Chromium (#15300)", () => {
  for (const pkg of ["xvfb", "xkbcomp", "xkeyboard-config"]) {
    assert.ok(apkPackages.includes(pkg), `apk must install ${pkg}`);
  }
  assert.match(webCommands, /&&\s+install -d -o bun -g bun -m 0755 \/tmp\/\.X11-unix\s+&&/);
  assert.doesNotMatch(webCommands, /\bchmod\s+1?7{3}\b/);
});

test("Bun runner-web fails the build if either Chromium executable is missing libraries", () => {
  assert.match(
    webCommands,
    /for bin in "\$PLAYWRIGHT_BROWSERS_PATH"\/\*\/\*\/chrome "\$PLAYWRIGHT_BROWSERS_PATH"\/\*\/\*\/chrome-headless-shell; do/
  );
  assert.match(
    webCommands,
    /missing="\$\(\/lib\/ld-linux-\*\.so\.\* --list "\$bin" 2>&1 \| grep 'not found' \|\| true\)"/
  );
  assert.match(webCommands, /if \[ -n "\$missing" \]; then [^\n]*exit 1; fi;/);
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
  assert.match(smoke, /\^FROM .* AS base\$/);
  assert.match(smoke, /\^FROM .* AS runtime-os\$/);
  assert.match(smoke, /\^FROM runner-base AS runner-web\$/);
  assert.match(smoke, /stage && !\/\^ENTRYPOINT \/ \{ print \}/);
  const generatedDockerfile = smoke.match(/^\{\n([\s\S]*?)\n\} > "\$CTX\/Dockerfile"$/m)?.[1];
  assert.ok(generatedDockerfile, "smoke must generate a Dockerfile");
  assert.deepEqual(
    generatedDockerfile.split("\n").map((line) => line.trim()),
    [
      'echo "FROM $BASE AS base"',
      'echo "FROM scratch AS builder"',
      'echo "COPY node_modules/playwright /opt/playwright/node_modules/playwright"',
      'echo "COPY node_modules/playwright-core /opt/playwright/node_modules/playwright-core"',
      `printf '%s\\n' "$RUNTIME_OS"`,
      'echo "FROM runtime-os"',
      'echo "WORKDIR /app"',
      'echo "COPY node_modules/playwright/index.js node_modules/playwright/index.mjs node_modules/playwright/package.json /app/node_modules/playwright/"',
      'echo "COPY node_modules/playwright-core /app/node_modules/playwright-core"',
      `printf '%s\\n' "$STAGE"`,
      'echo "COPY probe.cjs /tmp/probe.cjs"',
      'echo "RUN bun /tmp/probe.cjs"',
    ]
  );
  assert.match(smoke, /node_modules\/playwright-core/);
  assert.match(smoke, /await launch\("headless", \{ headless: true \}\)/);
  assert.match(smoke, /spawn\("Xvfb", \[":99",/);
  assert.match(
    smoke,
    /await launch\("headed under Xvfb", \{ headless: false, env: \{ \.\.\.process\.env, DISPLAY: ":99" \} \}\)/
  );
  assert.match(
    smoke,
    /await launch\("\/usr\/bin\/chromium", \{ headless: true, executablePath: "\/usr\/bin\/chromium" \}\)/
  );
});
