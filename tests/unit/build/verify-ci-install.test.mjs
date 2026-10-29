import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { parse } from "yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const action = parse(readFileSync(join(root, ".github/actions/npm-ci-retry/action.yml"), "utf8"));

function probe(
  sqlite,
  esbuild = "exports.transformSync = () => ({ code: 'const value = 1;' });",
  installedVitest = "5.0.3",
  prepare = () => {}
) {
  const fixture = mkdtempSync(join(tmpdir(), "omniroute-install-probe-"));
  try {
    const manifest = {
      dependencies: { "better-sqlite3": "1.0.0", esbuild: "1.0.0" },
      devDependencies: { vitest: "^5.0.0" },
    };
    writeFileSync(join(fixture, "package.json"), JSON.stringify(manifest));
    const packages = { "": manifest };
    for (const name of ["better-sqlite3", "esbuild", "vitest"]) {
      const version = name === "vitest" ? "5.0.3" : "1.0.0";
      packages[`node_modules/${name}`] = { version };
      if (name === "better-sqlite3" && sqlite === null) continue;
      mkdirSync(join(fixture, "node_modules", name), { recursive: true });
      writeFileSync(
        join(fixture, "node_modules", name, "package.json"),
        JSON.stringify({ name, version: name === "vitest" ? installedVitest : version })
      );
    }
    writeFileSync(
      join(fixture, "package-lock.json"),
      JSON.stringify({ lockfileVersion: 3, packages })
    );
    for (const [name, source] of [
      ["better-sqlite3", sqlite],
      ["esbuild", esbuild],
    ]) {
      if (source === null) continue;
      const file = join(fixture, "node_modules", name, "index.js");
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, source);
    }
    const script = join(root, "scripts/ci/verify-ci-install.mjs");
    if (existsSync(script)) {
      const destination = join(fixture, "scripts/ci/verify-ci-install.mjs");
      mkdirSync(dirname(destination), { recursive: true });
      cpSync(script, destination);
    }
    prepare(fixture);
    // A composite executes each run block in its own shell. After npm returns
    // zero, run its real admission probe; without one the install is admitted.
    const verification = action.runs.steps.find((step) => step.id === "verify-install");
    assert.equal(verification?.if, undefined, "native verification also covers cache hits");
    return spawnSync(
      "bash",
      ["--noprofile", "--norc", "-eo", "pipefail", "-c", verification?.run ?? "exit 0"],
      {
        cwd: fixture,
        encoding: "utf8",
        timeout: 15000,
      }
    );
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
}

const workingSqlite = `module.exports = class Database {
  constructor(filename) { if (filename !== ':memory:') throw Error('persistent DB touched'); }
  prepare() { return { get: () => ({ value: 42 }) }; }
  close() { require('node:fs').writeFileSync('closed', 'yes'); }
};`;

test("install admission rejects a present SQLite package with no loadable native binary", () => {
  const result = probe(
    "module.exports = class { constructor() { throw Error('missing native binary'); } };"
  );
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, result.stdout);
});

test("install admission rejects a missing SQLite package", () => {
  const result = probe(null);
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, result.stdout);
});

test("install admission rejects an unusable SQLite query", () => {
  const result = probe(workingSqlite.replace("({ value: 42 })", "({ value: 0 })"));
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, result.stdout);
});

test("install admission rejects an unusable esbuild binary", () => {
  const result = probe(
    workingSqlite,
    "exports.transformSync = () => { throw Error('missing esbuild binary'); };"
  );
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, result.stdout);
});

test("usable SQLite and esbuild runtimes pass install admission", () => {
  const result = probe(workingSqlite);
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
});

test("install admission rejects an old test runner even when native probes pass", () => {
  const result = probe(workingSqlite, undefined, "4.1.11");
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, "borrowed dependencies must match the candidate lockfile");
  assert.match(result.stderr, /vitest.*lockfile/i);
});

for (const [name, change, message] of [
  ["missing lockfile", (dir) => rmSync(join(dir, "package-lock.json")), /package-lock/],
  [
    "missing runner metadata",
    (dir) => rmSync(join(dir, "node_modules/vitest/package.json")),
    /vitest/,
  ],
  ["corrupt lockfile", (dir) => writeFileSync(join(dir, "package-lock.json"), "{"), /JSON/],
  [
    "missing runner version",
    (dir) => {
      const file = join(dir, "package-lock.json");
      const lock = JSON.parse(readFileSync(file, "utf8"));
      delete lock.packages["node_modules/vitest"].version;
      writeFileSync(file, JSON.stringify(lock));
    },
    /vitest.*lockfile/,
  ],
  [
    "changed dependency declaration",
    (dir) => {
      const file = join(dir, "package.json");
      const manifest = JSON.parse(readFileSync(file, "utf8"));
      manifest.devDependencies.vitest = "^6.0.0";
      writeFileSync(file, JSON.stringify(manifest));
    },
    /vitest.*declaration.*lockfile/,
  ],
]) {
  test(`install admission rejects ${name} without a successful version-parity receipt`, () => {
    const result = probe(workingSqlite, undefined, undefined, change);
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, message);
    assert.doesNotMatch(result.stdout, /"status":"PASS"/);
  });
}
