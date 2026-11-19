import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  REQUIRED_SQLJS_RUNTIME_FILES,
  REQUIRED_MACHINE_TOKEN_RUNTIME_FILES,
  FORBIDDEN_DOCS_RUNTIME_PATHS,
  REQUIRED_DOCS_RUNTIME_FILES,
  pickTarball,
  evaluateBoot,
  pickPort,
  findMissingSqlJsRuntimeFiles,
  findMissingMachineTokenRuntimeFiles,
  findForbiddenDocsRuntimePaths,
  findMissingDocsRuntimeFiles,
  evaluateMachineTokenAuth,
  evaluateSqlJsRoundTrip,
  evaluateRestartPersistence,
  derivePackagedCliToken,
  PACKED_TARBALL_ENV,
  resolvePrebuiltTarballOption,
  readTarballManifest,
  verifyPrebuiltTarball,
  obtainTarball,
} from "../../scripts/check/check-pack-boot.mjs";
import {
  makeFakeRoot,
  makeFixtureTarball,
  runGateWithNpmShim,
} from "../helpers/packedTarballGate.ts";

// WS1.2 (T1, v3.8.49 quality plan) — pure-function guards for the tarball boot-smoke
// gate that kills the #7065 class (published artifact crashes on every boot because a
// packaging list drifted; 3rd recurrence). The end-to-end path runs in CI's
// package-artifact job; these tests pin the decision logic.

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-pack-boot.mjs"
);

test("pickTarball extracts the filename from npm pack --json output", () => {
  assert.equal(
    pickTarball('[{"filename":"omniroute-3.8.49.tgz","size":1}]'),
    "omniroute-3.8.49.tgz"
  );
});

test("pickTarball normalizes scoped slashes to the on-disk dash form", () => {
  assert.equal(pickTarball('[{"filename":"@scope/pkg-1.0.0.tgz"}]'), "@scope-pkg-1.0.0.tgz");
});

test("pickTarball throws on empty/odd npm output instead of booting garbage", () => {
  assert.throws(() => pickTarball("[]"));
  assert.throws(() => pickTarball("{}"));
});

test("evaluateBoot passes on HTTP 200 + matching version, whatever the health status", () => {
  const r = evaluateBoot(200, { version: "3.8.49", status: "warning" }, "3.8.49");
  assert.equal(r.ok, true);
  assert.deepEqual(r.failures, []);
});

test("evaluateBoot fails on non-200, non-JSON body, and version mismatch", () => {
  assert.equal(evaluateBoot(503, { version: "3.8.49" }, "3.8.49").ok, false);
  assert.equal(evaluateBoot(200, null, "3.8.49").ok, false);
  const wrong = evaluateBoot(200, { version: "3.8.48" }, "3.8.49");
  assert.equal(wrong.ok, false);
  assert.match(wrong.failures[0], /3\.8\.48/);
});

test("pickPort stays inside the reserved smoke range for any pid", () => {
  for (const seed of [0, 1, 4000, 65535, 123456]) {
    const p = pickPort(seed);
    assert.ok(p >= 23000 && p < 27000, `port ${p} out of range for seed ${seed}`);
  }
});

test("installed package contract requires sql.js metadata, entrypoint, and WASM", () => {
  const present = new Set(REQUIRED_SQLJS_RUNTIME_FILES.map((file) => path.join("/pkg", file)));
  assert.deepEqual(
    findMissingSqlJsRuntimeFiles("/pkg", (file) => present.has(file)),
    []
  );

  // Dependency-based packaging (#11242): sql.js is a declared dependency, so the
  // contract path is the npm-installed <packageRoot>/node_modules/sql.js location,
  // never the old vendored dist/node_modules one (banned from the tarball).
  present.delete(path.join("/pkg", "node_modules/sql.js/dist/sql-wasm.wasm"));
  assert.deepEqual(
    findMissingSqlJsRuntimeFiles("/pkg", (file) => present.has(file)),
    ["node_modules/sql.js/dist/sql-wasm.wasm"]
  );
});

test("installed package contract requires jsdom and no translated docs mirrors", () => {
  // 2026-11-17: the npm package no longer ships docs/i18n (the 3.8.54 tarball hit npm's 413).
  assert.deepEqual([...REQUIRED_DOCS_RUNTIME_FILES], ["node_modules/jsdom/package.json"]);
  assert.deepEqual([...FORBIDDEN_DOCS_RUNTIME_PATHS], ["dist/docs/i18n"]);

  // jsdom is a declared dependency, so npm places it at <packageRoot>/node_modules.
  const present = new Set([path.join("/pkg", "node_modules/jsdom/package.json")]);
  assert.deepEqual(
    findMissingDocsRuntimeFiles("/pkg", (file) => present.has(file)),
    []
  );
  assert.deepEqual(
    findForbiddenDocsRuntimePaths("/pkg", (file) => present.has(file)),
    []
  );

  present.delete(path.join("/pkg", "node_modules/jsdom/package.json"));
  assert.deepEqual(
    findMissingDocsRuntimeFiles("/pkg", (file) => present.has(file)),
    ["node_modules/jsdom/package.json"]
  );

  // The mirrors coming back into the tarball fails the smoke.
  present.add(path.join("/pkg", "dist/docs/i18n"));
  assert.deepEqual(
    findForbiddenDocsRuntimePaths("/pkg", (file) => present.has(file)),
    ["dist/docs/i18n"]
  );
});

test("installed package contract requires a resolvable node-machine-id CommonJS runtime", () => {
  const present = new Set(
    REQUIRED_MACHINE_TOKEN_RUNTIME_FILES.map((file) => path.join("/pkg", file))
  );
  assert.deepEqual(
    findMissingMachineTokenRuntimeFiles("/pkg", (file) => present.has(file)),
    []
  );

  present.delete(path.join("/pkg", "node_modules/node-machine-id/index.js"));
  assert.deepEqual(
    findMissingMachineTokenRuntimeFiles("/pkg", (file) => present.has(file)),
    ["node_modules/node-machine-id/index.js"]
  );
});

test("machine-token smoke requires no/invalid credentials to fail and the packaged CLI token to pass", () => {
  assert.deepEqual(
    evaluateMachineTokenAuth({
      cliToken: "a".repeat(64),
      unauthenticatedStatus: 401,
      invalidStatus: 401,
      authenticatedStatus: 200,
    }),
    { ok: true, failures: [] }
  );

  for (const candidate of [
    { cliToken: "", unauthenticatedStatus: 401, invalidStatus: 401, authenticatedStatus: 200 },
    {
      cliToken: "a".repeat(64),
      unauthenticatedStatus: 200,
      invalidStatus: 401,
      authenticatedStatus: 200,
    },
    {
      cliToken: "a".repeat(64),
      unauthenticatedStatus: 401,
      invalidStatus: 200,
      authenticatedStatus: 200,
    },
    {
      cliToken: "a".repeat(64),
      unauthenticatedStatus: 401,
      invalidStatus: 401,
      authenticatedStatus: 401,
    },
    {
      cliToken: createHmac("sha256", "").update("omniroute-cli-auth-v1").digest("hex"),
      unauthenticatedStatus: 401,
      invalidStatus: 401,
      authenticatedStatus: 200,
    },
  ]) {
    assert.equal(evaluateMachineTokenAuth(candidate).ok, false);
  }
});

test("sql.js round trip requires the forced-driver marker plus PATCH and GET persistence", () => {
  const passing = evaluateSqlJsRoundTrip({
    startupOutput: "[DB] Pre-initializing sql.js WASM (synchronous drivers unavailable)...",
    beforeValue: true,
    patchedValue: false,
    readBackValue: false,
  });
  assert.deepEqual(passing, { ok: true, failures: [] });

  const failing = evaluateSqlJsRoundTrip({
    startupOutput: "[DB] SQLite database ready",
    beforeValue: false,
    patchedValue: true,
    readBackValue: false,
  });
  assert.equal(failing.ok, false);
  assert.equal(failing.failures.length, 2);
  assert.match(failing.failures[0], /forced sql\.js startup path/);
  assert.match(failing.failures[1], /GET debugMode/);
});

test("source guard: the gate polls the real health endpoint of the INSTALLED binary", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(
    src.includes('"install", "-g", "--prefix"'),
    "must install the packed tarball into a clean prefix"
  );
  assert.ok(src.includes("/api/monitoring/health"), "must poll the health endpoint");
  assert.ok(src.includes("/api/settings"), "must verify a real application write and read");
  assert.ok(src.includes("/api/cli/whoami"), "must exercise the machine-token auth endpoint");
  assert.ok(src.includes("x-omniroute-cli-token"), "must send the official machine-token header");
  const postinstall = readFileSync(
    fileURLToPath(new URL("../../scripts/build/postinstall.mjs", import.meta.url)),
    "utf8"
  );
  assert.ok(postinstall.includes('["sql.js", "node-machine-id"]'));
  assert.ok(postinstall.includes('join(ROOT, "dist", "node_modules", packageName)'));
  assert.ok(
    src.includes('OMNIROUTE_PACK_BOOT_FORCE_SQLJS: "1"'),
    "must force the packaged sql.js tier during this smoke"
  );
  assert.ok(src.includes("MAX_SERVER_OUTPUT_CHARS"));
  assert.ok(!src.includes("while (tail.length > 80)"), "must not discard early startup proof");
  assert.ok(src.indexOf("npm") < src.indexOf("spawn"), "pack+install must precede the boot spawn");
});

test("restart persistence requires the reboot value to match the boot #1 written value", () => {
  assert.deepEqual(evaluateRestartPersistence({ expectedValue: true, restartValue: true }), {
    ok: true,
    failures: [],
  });
  assert.deepEqual(evaluateRestartPersistence({ expectedValue: false, restartValue: false }), {
    ok: true,
    failures: [],
  });

  const mismatch = evaluateRestartPersistence({ expectedValue: true, restartValue: false });
  assert.equal(mismatch.ok, false);
  assert.equal(mismatch.failures.length, 1);
  assert.match(mismatch.failures[0], /after restart/);
});

test("source guard: the gate reboots on the SAME DATA_DIR and reads debugMode as a strict boolean", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(src.includes("boot #2"), "must run a second boot to prove disk persistence");

  // Count only the CALLS, not the `function spawnServer(` declaration: the calls are the
  // destructuring-assignment form `= spawnServer(...)`. Capture each call's arg list and
  // assert both pass the SAME shared dataDir variable — that is what makes boot #2 read
  // boot #1's disk state.
  const calls = [...src.matchAll(/= spawnServer\(([^)]*)\)/g)];
  assert.equal(calls.length, 2, "must spawn exactly two boots (write, then reboot to verify)");
  for (const call of calls) {
    assert.equal(
      call[1],
      "binPath, port, dataDir",
      "both boots must pass the same shared dataDir variable"
    );
  }

  assert.ok(
    src.includes("evaluateRestartPersistence"),
    "must evaluate the value read back after the reboot"
  );
  // readSettingsDebugMode must reject a missing/malformed field instead of coercing it, or
  // a false expectedValue could pass on an empty response.
  assert.ok(
    src.includes('typeof body.debugMode !== "boolean"'),
    "must require debugMode to be a real boolean, not coerce it"
  );
});

test("source guard: final shutdown only deletes the workspace after a CONFIRMED stop", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(
    src.includes("shutdownConfirmed"),
    "must gate temp-dir deletion on a confirmed process-group stop"
  );
  assert.ok(src.includes("primaryError"), "must report the smoke failure distinctly");
  assert.ok(src.includes("cleanupError"), "must report a final-shutdown failure distinctly");
  assert.ok(
    src.includes("hasExited(child)"),
    "stopChild/waitForHealthy must read authoritative exit state, not a stale boolean"
  );
});

// #13679/#13909 made the CLI token salt per-install, persisted under <DATA_DIR>. The
// smoke boots the server on an isolated DATA_DIR, so the token it sends must be derived
// against that SAME DATA_DIR — derived without it, the CLI resolves a different salt,
// the server rejects the token, and /api/monitoring/health answers the anonymous view
// ("version undefined", release PR #11442 Package Artifact).
test("derivePackagedCliToken derives the token against the server's DATA_DIR salt", () => {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const dataDir = mkdtempSync(path.join(os.tmpdir(), "pack-boot-cli-token-"));
  const otherDataDir = mkdtempSync(path.join(os.tmpdir(), "pack-boot-cli-token-other-"));
  const savedCliSalt = process.env.OMNIROUTE_CLI_SALT;
  delete process.env.OMNIROUTE_CLI_SALT;
  try {
    const token = derivePackagedCliToken(repoRoot, dataDir);
    assert.match(token, /^[0-9a-f]{64}$/);
    assert.equal(
      existsSync(path.join(dataDir, "cli-token-salt.json")),
      true,
      "the salt must be established inside the smoke's DATA_DIR"
    );
    // Stable for the same DATA_DIR, different for another install's DATA_DIR.
    assert.equal(derivePackagedCliToken(repoRoot, dataDir), token);
    assert.notEqual(derivePackagedCliToken(repoRoot, otherDataDir), token);
  } finally {
    if (savedCliSalt === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = savedCliSalt;
    rmSync(dataDir, { recursive: true, force: true });
    rmSync(otherDataDir, { recursive: true, force: true });
  }
});

// ─── Prebuilt tarball (pack once per publish) ─────────────────────────────────────
//
// The v3.8.54 publish packed the same dist/ four times per attempt (this gate,
// check:install-upgrade, the stage-npm hand-off and GitHub Packages) at 13–36 min each on
// the shared self-hosted runner. The workflow now packs once and passes the file through
// --tarball / OMNIROUTE_PACKED_TARBALL; these tests pin that a given tarball is validated
// and installed WITHOUT packing, and that a wrong or missing one is refused.

function runGate(cwd: string, args: string[], env: Record<string, string> = {}) {
  return runGateWithNpmShim(SCRIPT_PATH, cwd, args, env);
}

test("resolvePrebuiltTarballOption: --tarball wins over the env, env is the fallback, none → null", () => {
  assert.equal(PACKED_TARBALL_ENV, "OMNIROUTE_PACKED_TARBALL");
  assert.equal(
    resolvePrebuiltTarballOption(["--tarball", "/a.tgz"], { OMNIROUTE_PACKED_TARBALL: "/b.tgz" }),
    "/a.tgz"
  );
  assert.equal(
    resolvePrebuiltTarballOption([], { OMNIROUTE_PACKED_TARBALL: " /b.tgz " }),
    "/b.tgz"
  );
  assert.equal(resolvePrebuiltTarballOption([], {}), null);
  assert.equal(resolvePrebuiltTarballOption([], { OMNIROUTE_PACKED_TARBALL: "  " }), null);
  assert.throws(() => resolvePrebuiltTarballOption(["--tarball"], {}), /needs a path/);
  assert.throws(() => resolvePrebuiltTarballOption(["--tarball", "--from"], {}), /needs a path/);
});

test("obtainTarball with a matching prebuilt tarball returns it and never packs", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "pack-boot-prebuilt-"));
  try {
    const tarball = makeFixtureTarball(dir, { name: "omniroute", version: "3.8.55" });
    assert.deepEqual(readTarballManifest(tarball), { name: "omniroute", version: "3.8.55" });
    let packCalls = 0;
    const result = obtainTarball({
      root: dir,
      destDir: dir,
      prebuilt: path.relative(process.cwd(), tarball),
      expectedName: "omniroute",
      expectedVersion: "3.8.55",
      pack: () => {
        packCalls += 1;
        return '[{"filename":"should-not-happen.tgz"}]';
      },
    });
    assert.equal(packCalls, 0, "a given tarball must not be packed again");
    assert.deepEqual(result, { tarball, packed: false });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("obtainTarball without a prebuilt tarball packs exactly once (local behavior unchanged)", () => {
  const calls: Array<[string, string]> = [];
  const result = obtainTarball({
    root: "/repo",
    destDir: "/work",
    prebuilt: null,
    expectedName: "omniroute",
    expectedVersion: "3.8.55",
    pack: (cwd: string, dest: string) => {
      calls.push([cwd, dest]);
      return '[{"filename":"omniroute-3.8.55.tgz"}]';
    },
  });
  assert.deepEqual(calls, [["/repo", "/work"]]);
  assert.deepEqual(result, { tarball: path.join("/work", "omniroute-3.8.55.tgz"), packed: true });
});

test("a prebuilt tarball with the wrong version or name is refused, without packing", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "pack-boot-mismatch-"));
  try {
    const stale = makeFixtureTarball(dir, { name: "omniroute", version: "3.8.54" }, "stale.tgz");
    const renamed = makeFixtureTarball(
      dir,
      { name: "@cheaper-inference/omniroute", version: "3.8.55" },
      "renamed.tgz"
    );
    const pack = () => {
      throw new Error("must not pack");
    };
    assert.throws(
      () =>
        obtainTarball({
          root: dir,
          destDir: dir,
          prebuilt: stale,
          expectedName: "omniroute",
          expectedVersion: "3.8.55",
          pack,
        }),
      /version "3\.8\.54" \(expected "3\.8\.55"\)/
    );
    assert.throws(
      () =>
        obtainTarball({
          root: dir,
          destDir: dir,
          prebuilt: renamed,
          expectedName: "omniroute",
          expectedVersion: "3.8.55",
          pack,
        }),
      /name "@cheaper-inference\/omniroute" \(expected "omniroute"\)/
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a missing or non-tarball prebuilt file is refused", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "pack-boot-missing-"));
  try {
    const expected = { expectedName: "omniroute", expectedVersion: "3.8.55" };
    assert.throws(
      () => verifyPrebuiltTarball(path.join(dir, "nope.tgz"), expected),
      /prebuilt tarball not found: .*nope\.tgz/
    );
    const notTar = path.join(dir, "garbage.tgz");
    writeFileSync(notTar, "not a tarball");
    assert.throws(() => verifyPrebuiltTarball(notTar, expected), /not an npm tarball/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("gate run: a missing OMNIROUTE_PACKED_TARBALL fails fast and packs nothing", () => {
  const root = makeFakeRoot({ name: "omniroute", version: "3.8.55" });
  try {
    const run = runGate(root, [], { [PACKED_TARBALL_ENV]: path.join(root, "absent.tgz") });
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stderr, /prebuilt tarball not found/);
    assert.doesNotMatch(run.stdout, /packing v/);
    assert.deepEqual(run.npmCalls, [], "no npm command may run before the tarball is validated");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("gate run: --tarball with a mismatched version fails fast and packs nothing", () => {
  const root = makeFakeRoot({ name: "omniroute", version: "3.8.55" });
  try {
    const stale = makeFixtureTarball(root, { name: "omniroute", version: "3.8.54" }, "stale.tgz");
    const run = runGate(root, ["--tarball", stale]);
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stderr, /does not match \.\/package\.json: version "3\.8\.54"/);
    assert.doesNotMatch(run.stdout, /packing v/);
    assert.deepEqual(run.npmCalls, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("gate run: a matching prebuilt tarball is installed as-is, never repacked, never deleted", () => {
  const root = makeFakeRoot({ name: "omniroute", version: "3.8.55" });
  try {
    const tarball = makeFixtureTarball(root, { name: "omniroute", version: "3.8.55" }, "one.tgz");
    const run = runGate(root, [], { [PACKED_TARBALL_ENV]: tarball });
    // The shimmed install creates nothing, so the install-contract check fails — AFTER the
    // gate asked npm to install exactly the file it was handed, and nothing else.
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stdout, /using prebuilt tarball .*one\.tgz \(v3\.8\.55\) — not packing/);
    assert.doesNotMatch(run.stdout, /packing v/);
    assert.equal(run.npmCalls.length, 1, run.npmCalls.join("\n"));
    assert.match(run.npmCalls[0], /^install -g --prefix \S+ /);
    assert.ok(run.npmCalls[0].endsWith(` ${tarball}`), run.npmCalls[0]);
    assert.ok(!run.npmCalls.some((c) => c.startsWith("pack")), "must not run npm pack");
    assert.match(run.stderr, /sql\.js runtime contract/);
    assert.equal(existsSync(tarball), true, "the shared tarball must survive the gate's cleanup");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
