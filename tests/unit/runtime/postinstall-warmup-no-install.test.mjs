// tests/unit/runtime/postinstall-warmup-no-install.test.mjs
//
// #21001 (parent #20998): the postinstall chain
//   scripts/build/postinstall.mjs → scripts/postinstall.mjs → warmUpRuntimes()
//   → loadSqliteRuntime() → installRuntime()
// used to reach `npm install --prefix ~/.omniroute/runtime better-sqlite3@^13.0.2`
// — an unpinned network install triggered by `npm install omniroute`.
//
// These tests run the REAL warm-up in a sandboxed subprocess where:
//   - HOME/USERPROFILE point at a temp dir (no writes to the developer's ~/.omniroute),
//   - a FAKE `npm` earlier on PATH records every invocation and exits 1, so no
//     real npm, no registry traffic and no lifecycle script can ever run,
//   - optionally a module resolve hook makes the bundled better-sqlite3
//     unimportable, forcing the fallback chain down to the install decision so
//     the guard is exercised even on a machine where the native driver works.
// The fake-npm log is the oracle: the warm-up must leave it empty.
import test from "node:test";
import assert from "node:assert/strict";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const INDEX_URL = pathToFileURL(join(ROOT, "bin", "cli", "runtime", "index.mjs")).href;
const SQLITE_URL = pathToFileURL(join(ROOT, "bin", "cli", "runtime", "sqliteRuntime.mjs")).href;

/** Temp HOME + a fake npm that logs argv and fails. */
function makeSandbox() {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-warmup-"));
  const bin = join(dir, "bin");
  mkdirSync(bin);
  const log = join(dir, "npm-calls.log");
  const isWin = process.platform === "win32";
  const npmPath = join(bin, isWin ? "npm.cmd" : "npm");
  writeFileSync(
    npmPath,
    isWin
      ? `@echo off\r\necho %* >> "${log}"\r\nexit /b 1\r\n`
      : `#!/bin/sh\necho "$@" >> "${log}"\nexit 1\n`
  );
  if (!isWin) chmodSync(npmPath, 0o755);
  return { dir, bin, log };
}

/**
 * Run warmUpRuntimes() + one explicit resolution inside the sandbox.
 * forceFallback makes the bundled driver unimportable so the chain reaches the
 * install decision (step 3) instead of short-circuiting at step 1.
 */
function runWarmUp({ allowInstall, forceFallback = false }) {
  const { dir, bin, log } = makeSandbox();
  try {
    const stubUrl = pathToFileURL(join(dir, "unavailable-better-sqlite3.mjs")).href;
    if (forceFallback) {
      writeFileSync(
        join(dir, "unavailable-better-sqlite3.mjs"),
        'throw new Error("stub: bundled better-sqlite3 is unavailable in this scenario");\n'
      );
    }
    const code = [
      forceFallback
        ? [
            'const { registerHooks } = await import("node:module");',
            "registerHooks({",
            "  resolve(specifier, context, nextResolve) {",
            `    if (specifier === "better-sqlite3") return { url: ${JSON.stringify(stubUrl)}, shortCircuit: true };`,
            "    return nextResolve(specifier, context);",
            "  },",
            "});",
          ].join("\n")
        : "",
      `const index = await import(${JSON.stringify(INDEX_URL)});`,
      "await index.warmUpRuntimes();",
      `const rt = await import(${JSON.stringify(SQLITE_URL)});`,
      "rt.clearRuntimeCache();",
      `const resolved = await rt.loadSqliteRuntime({ allowInstall: ${allowInstall} });`,
      "process.stdout.write(JSON.stringify({ source: resolved.source, kind: resolved.driver?.kind ?? null }));",
    ]
      .filter(Boolean)
      .join("\n");

    const env = { ...process.env, HOME: dir, USERPROFILE: dir };
    for (const key of Object.keys(env)) {
      if (key.toLowerCase() === "path") delete env[key];
    }
    env.PATH = `${bin}${delimiter}${process.env.PATH ?? ""}`;

    const res = spawnSync(process.execPath, ["--input-type=module", "-e", code], {
      cwd: dir,
      env,
      encoding: "utf8",
      timeout: 120_000,
    });
    const calls = existsSync(log) ? readFileSync(log, "utf8") : "";
    let payload = null;
    try {
      payload = JSON.parse(res.stdout ?? "");
    } catch {
      payload = null;
    }
    return { res, calls, payload };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("postinstall warm-up resolves a driver without invoking npm at all", () => {
  const { res, calls, payload } = runWarmUp({ allowInstall: false });
  assert.equal(res.status, 0, `warm-up subprocess failed: ${res.stderr}`);
  assert.equal(calls, "", `warm-up must not spawn npm; fake npm recorded:\n${calls}`);
  assert.ok(payload, `expected a resolution payload, got stdout: ${res.stdout}`);
  assert.notEqual(
    payload.source,
    "runtime-installed-now",
    "the warm-up must never report a freshly installed runtime"
  );
  assert.ok(
    ["bundled", "runtime", "node-sqlite", "sql-js", "bun-sqlite"].includes(payload.source),
    `unexpected driver source: ${payload.source}`
  );
});

test("forced fallback: the warm-up skips the install step and still resolves a driver", () => {
  const { res, calls, payload } = runWarmUp({ allowInstall: false, forceFallback: true });
  assert.equal(res.status, 0, `subprocess failed: ${res.stderr}`);
  assert.ok(payload, `expected a resolution payload, got stdout: ${res.stdout} / ${res.stderr}`);
  // Steps 1 and 2 are unavailable by construction, so reaching a stdlib/WASM
  // driver proves the chain passed THROUGH the install decision without taking it.
  assert.ok(
    ["node-sqlite", "sql-js"].includes(payload.source),
    `expected the post-install fallbacks, got ${payload.source}`
  );
  assert.equal(calls, "", `allowInstall:false must not spawn npm; recorded:\n${calls}`);
});

test("positive control: with install allowed the attempt is observable and exact-pinned", () => {
  const { res, calls, payload } = runWarmUp({ allowInstall: true, forceFallback: true });
  assert.equal(res.status, 0, `subprocess failed: ${res.stderr}`);
  assert.ok(calls, "the harness must observe an install attempt when allowInstall is true");
  assert.match(calls, /install --prefix/, `expected the runtime install, got: ${calls}`);
  assert.match(
    calls,
    /better-sqlite3@\d+\.\d+\.\d+/,
    `the lazy runtime install must be exact-pinned, got: ${calls}`
  );
  assert.doesNotMatch(
    calls,
    /better-sqlite3@[\^~]/,
    `a caret/tilde range re-resolves from the registry on every install: ${calls}`
  );
  // The fake npm exits 1, so nothing was actually installed.
  assert.notEqual(payload?.source, "runtime-installed-now");
});

test("warmUpRuntimes is wired to allowInstall: false (postinstall entry point)", () => {
  const source = readFileSync(join(ROOT, "bin", "cli", "runtime", "index.mjs"), "utf8");
  const body = source.slice(source.indexOf("export async function warmUpRuntimes"));
  assert.match(
    body,
    /loadSqliteRuntime\(\{\s*allowInstall:\s*false\s*\}\)/,
    "scripts/postinstall.mjs reaches the network only through this call — it must stay opt-out"
  );
});
