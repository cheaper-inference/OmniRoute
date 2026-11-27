import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (rel) => readFileSync(new URL(`../../../${rel}`, import.meta.url), "utf8");

/** Instructions of one `FROM … AS <name>` stage, up to the next FROM, comments dropped. */
function stage(dockerfile, name) {
  const lines = dockerfile.split("\n");
  const start = lines.findIndex((line) => new RegExp(`^FROM \\S+ AS ${name}$`).test(line));
  assert.notEqual(start, -1, `stage ${name} not found`);
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => /^FROM /.test(line));
  return (end === -1 ? rest : rest.slice(0, end)).filter((line) => !/^\s*#/.test(line)).join("\n");
}

/** Package names of every `apk add` in a stage. */
function apkPackages(body) {
  return [...body.replace(/\\\n/g, " ").matchAll(/\bapk add\s+([^&;|\n]+)/g)].flatMap((match) =>
    match[1]
      .trim()
      .split(/\s+/)
      .filter((word) => !word.startsWith("-"))
  );
}

const bunDockerfile = read("Dockerfile.bun");

test("Bun runner-base inherits runtime-os and the Node build base still upgrades its packages", () => {
  assert.match(bunDockerfile, /^FROM runtime-os AS runner-base$/m);
  assert.match(stage(read("Dockerfile"), "base"), /apt-get upgrade -y/);
});

test("Bun runtime-os and runner-base install only what the runtime uses", () => {
  const runtimeOs = stage(bunDockerfile, "runtime-os");
  const bunRunner = stage(bunDockerfile, "runner-base");
  assert.match(runtimeOs, /\bapk add --no-cache\b/);
  assert.deepEqual(apkPackages(runtimeOs), [
    "libsecret",
    "libstdc++",
    "ca-certificates-bundle",
    "tzdata",
  ]);
  assert.deepEqual(apkPackages(bunRunner), []);
  assert.doesNotMatch(`${runtimeOs}\n${bunRunner}`, /\bcurl\b|(?<![\w-])sqlite3(?![\w-])/);
  assert.match(bunRunner, /HEALTHCHECK[^\n]*\\\n\s*CMD bun healthcheck\.mjs\b/);
});

test("Bun runner-base proves bun:sqlite works without the sqlite3 package", () => {
  assert.match(
    stage(bunDockerfile, "runner-base"),
    /RUN bun -e "import \{ Database \} from 'bun:sqlite';[^"]*SELECT 1[^"]*"/
  );
});
