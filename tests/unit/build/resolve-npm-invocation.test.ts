/**
 * #16321 — `check:pack-artifact` failed under `bun run` with
 * `❌ Pack artifact validation failed: /home/temp/.bun/bin/bun:1` followed by
 * raw ELF bytes. The validator used `process.env.npm_execpath` as a JS entry
 * point without checking what it pointed at; Bun sets it to its own binary, so
 * the validator ran `node /path/to/bun …` and Node dumped the executable into
 * the error output. `resolveNpmInvocation` must never do that.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveNpmInvocation } from "../../../scripts/build/resolveNpmEntry.ts";

const POSIX_PREFIX = "/opt/hostedtoolcache/node/24.18.0/x64";
const POSIX_NODE = `${POSIX_PREFIX}/bin/node`;
const POSIX_NPM_CLI = `${POSIX_PREFIX}/lib/node_modules/npm/bin/npm-cli.js`;

const BUN_BINARY = "/home/temp/.bun/bin/bun";

test("npm run: runs the resolved npm-cli.js through the current node binary", () => {
  const invocation = resolveNpmInvocation(["run", "build:cli"], {
    execPath: POSIX_NODE,
    npmExecPath: POSIX_NPM_CLI,
    exists: (p) => p === POSIX_NPM_CLI,
  });

  assert.deepEqual(invocation, {
    command: POSIX_NODE,
    args: [POSIX_NPM_CLI, "run", "build:cli"],
  });
});

test("bun run: npm_execpath pointing at the bun binary is never used as a JS entry", () => {
  const invocation = resolveNpmInvocation(["pack", "--dry-run", "--json"], {
    execPath: POSIX_NODE,
    // Bun sets npm_execpath to its own ELF binary.
    npmExecPath: BUN_BINARY,
    exists: (p) => p === POSIX_NPM_CLI,
  });

  assert.equal(invocation.command, POSIX_NODE);
  assert.deepEqual(invocation.args, [POSIX_NPM_CLI, "pack", "--dry-run", "--json"]);
  assert.ok(
    !invocation.args.includes(BUN_BINARY),
    "the bun binary must never be passed to node as a script (#16321)"
  );
});

test("falls back to the plain npm command when no bundled npm-cli.js exists", () => {
  const invocation = resolveNpmInvocation(["pack"], {
    execPath: POSIX_NODE,
    npmExecPath: BUN_BINARY,
    exists: () => false,
    platform: "linux",
  });

  assert.deepEqual(invocation, { command: "npm", args: ["pack"] });
});

test("Windows fallback uses npm.cmd (never the bun binary)", () => {
  const invocation = resolveNpmInvocation(["pack"], {
    execPath: "C:\\nodejs\\node.exe",
    npmExecPath: "C:\\bun\\bun.exe",
    exists: () => false,
    platform: "win32",
  });

  assert.deepEqual(invocation, { command: "npm.cmd", args: ["pack"] });
});

test("explicit null npmEntry forces the fallback command", () => {
  const invocation = resolveNpmInvocation(["run", "build:cli"], {
    execPath: POSIX_NODE,
    npmEntry: null,
    platform: "linux",
  });

  assert.deepEqual(invocation, { command: "npm", args: ["run", "build:cli"] });
});
