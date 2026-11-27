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

const instructions = (body) =>
  body
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");

const nodeWeb = instructions(stageBody(read("Dockerfile"), "runner-web"));
const webCommands = nodeWeb.replace(/\\\n/g, " ");
const apkPackages = [...webCommands.matchAll(/\bapk add\s+([^&;|\n]+)/g)].flatMap((match) =>
  match[1]
    .trim()
    .split(/\s+/)
    .filter((word) => !word.startsWith("-"))
);

test("Node runner-web does not install Wolfi Chromium packages", () => {
  for (const pkg of apkPackages) {
    assert.doesNotMatch(pkg, /^(?:chromium|chromium-driver)(?:$|[=<>~@])/);
  }
});

test("Node runner-web exposes and checks Playwright's Chromium at /usr/bin/chromium", () => {
  const symlinkAndVersion =
    /(?:^RUN\s+|&&\s+)ln -sf "\$\(node -e '[^']*require\("playwright-core"\)\.chromium\.executablePath\(\)[^']*'\)" \/usr\/bin\/chromium\s*&&\s*\/usr\/bin\/chromium --version(?=\s*(?:&&|$))/m;
  assert.ok(
    symlinkAndVersion.test(webCommands),
    "expected the Playwright symlink before --version"
  );
  assert.match(nodeWeb, /^ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=\/usr\/bin\/chromium$/m);
});
