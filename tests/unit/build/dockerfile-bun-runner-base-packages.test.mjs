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

/** Package names of every `apt-get install` in a stage (flags and shell operators dropped). */
function aptPackages(body) {
  const packages = [];
  for (const match of body.matchAll(/apt-get install((?:[^\n]*\\\n)*[^\n]*)/g)) {
    for (const word of match[1].replace(/\\\n/g, " ").split(/\s+/)) {
      if (word === "&&") break;
      if (word && !word.startsWith("-")) packages.push(word);
    }
  }
  return packages;
}

const bunRunner = stage(read("Dockerfile.bun"), "runner-base");

test("Bun runner-base upgrades the base image packages, like the Node base stage", () => {
  // 3.8.54-bun shipped apt, libapt-pkg7.0 and zlib1g with a published trixie fix
  // because only the builder stage ran `apt-get upgrade`.
  assert.match(bunRunner, /apt-get update \\\n\s*&& apt-get upgrade -y \\/);
  assert.match(stage(read("Dockerfile"), "base"), /apt-get upgrade -y/);
});

test("Bun runner-base installs only what the runtime uses", () => {
  // curl (libcurl4 → Kerberos libraries) and the sqlite3 CLI were never used inside the
  // container — the healthcheck is `bun healthcheck.mjs` and the database is bun:sqlite —
  // and the Node runner ships neither.
  assert.deepEqual(aptPackages(bunRunner), ["libsecret-1-0", "ca-certificates"]);
  assert.match(bunRunner, /CMD bun healthcheck\.mjs/);
  assert.doesNotMatch(bunRunner, /\bcurl\b/);
});

test("Bun runner-base proves bun:sqlite works without the sqlite3 package", () => {
  assert.match(
    bunRunner,
    /RUN bun -e "import \{ Database \} from 'bun:sqlite';[^"]*SELECT 1[^"]*"/
  );
});
