import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  PACKED_TARBALL_ENV,
  makeFakeRoot,
  makeFixtureTarball,
  runGateWithNpmShim,
} from "../helpers/packedTarballGate.ts";

/**
 * check:install-upgrade used to `npm pack` the tree itself — 776s and 1389s on the v3.8.54
 * publish attempts (runs 44220411903 / 44254498706 / 44304134021, shared .113 runner) —
 * right after check:pack-boot had packed the same dist/, and before the workflow packed it
 * a third time for the upload. The publish job now packs once and hands that file to the
 * gate via --tarball / OMNIROUTE_PACKED_TARBALL. These run the real gate with npm replaced
 * by a recording shim: a given tarball is installed as-is (no `npm pack`), a missing or
 * mismatched one fails before any npm command, and the gate's work-dir cleanup never
 * deletes the shared tarball the upload step still needs.
 */

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-install-upgrade.mjs"
);

function withRoot(fn: (root: string, workDir: string) => void) {
  const root = makeFakeRoot({ name: "omniroute", version: "3.8.55" });
  const workDir = mkdtempSync(path.join(os.tmpdir(), "install-upgrade-workdir-"));
  try {
    fn(root, workDir);
  } finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(workDir, { recursive: true, force: true });
  }
}

test("a matching prebuilt tarball is installed as-is: no npm pack, and it survives cleanup", () => {
  withRoot((root, workDir) => {
    const tarball = makeFixtureTarball(root, { name: "omniroute", version: "3.8.55" }, "one.tgz");
    const run = runGateWithNpmShim(SCRIPT_PATH, root, ["--skip-upgrade"], {
      [PACKED_TARBALL_ENV]: tarball,
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
    });
    // The shimmed install creates no binary, so the clean boot fails — AFTER the gate asked
    // npm to install exactly the file it was handed.
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stdout, /using prebuilt tarball .*one\.tgz \(v3\.8\.55\) — not packing/);
    assert.match(run.stdout, /prebuilt tarball verified/);
    assert.doesNotMatch(run.stdout, /packing v|packed in/);
    assert.equal(run.npmCalls.length, 1, run.npmCalls.join("\n"));
    assert.match(run.npmCalls[0], /^install -g --prefix \S+ --no-audit --no-fund /);
    assert.ok(run.npmCalls[0].endsWith(` ${tarball}`), run.npmCalls[0]);
    assert.ok(!run.npmCalls.some((c) => c.startsWith("pack")), "must not run npm pack");
    assert.match(run.stderr, /clean: bin not found/);
    assert.equal(existsSync(tarball), true, "the shared tarball must survive the gate's cleanup");
  });
});

test("--tarball wins over OMNIROUTE_PACKED_TARBALL", () => {
  withRoot((root, workDir) => {
    const good = makeFixtureTarball(root, { name: "omniroute", version: "3.8.55" }, "good.tgz");
    const run = runGateWithNpmShim(SCRIPT_PATH, root, ["--skip-upgrade", "--tarball", good], {
      [PACKED_TARBALL_ENV]: path.join(root, "absent.tgz"),
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
    });
    assert.match(run.stdout, /using prebuilt tarball .*good\.tgz/);
    assert.ok(run.npmCalls[0]?.endsWith(` ${good}`), run.npmCalls.join("\n"));
  });
});

test("a prebuilt tarball with another version fails before any npm command", () => {
  withRoot((root, workDir) => {
    const stale = makeFixtureTarball(root, { name: "omniroute", version: "3.8.54" }, "stale.tgz");
    const run = runGateWithNpmShim(SCRIPT_PATH, root, ["--tarball", stale], {
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
    });
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(
      run.stderr,
      /FAIL — prebuilt tarball stale\.tgz does not match \.\/package\.json: version "3\.8\.54" \(expected "3\.8\.55"\)/
    );
    assert.deepEqual(run.npmCalls, [], "no pack, no install, no `npm view` for --from");
  });
});

test("a prebuilt tarball renamed for another registry is refused", () => {
  withRoot((root, workDir) => {
    const renamed = makeFixtureTarball(
      root,
      { name: "@cheaper-inference/omniroute", version: "3.8.55" },
      "renamed.tgz"
    );
    const run = runGateWithNpmShim(SCRIPT_PATH, root, ["--tarball", renamed], {
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
    });
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stderr, /name "@cheaper-inference\/omniroute" \(expected "omniroute"\)/);
    assert.deepEqual(run.npmCalls, []);
  });
});

test("a missing prebuilt tarball fails before any npm command", () => {
  withRoot((root, workDir) => {
    const run = runGateWithNpmShim(SCRIPT_PATH, root, [], {
      [PACKED_TARBALL_ENV]: path.join(root, "absent.tgz"),
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
    });
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stderr, /prebuilt tarball not found: .*absent\.tgz/);
    assert.deepEqual(run.npmCalls, []);
  });
});

test("without a prebuilt tarball the gate still packs the tree itself (local behavior)", () => {
  withRoot((root, workDir) => {
    const run = runGateWithNpmShim(SCRIPT_PATH, root, ["--skip-upgrade"], {
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
    });
    // The shim prints no `npm pack --json` output, so the gate stops right after asking.
    assert.equal(run.status, 1, run.stdout + run.stderr);
    assert.match(run.stdout, /packing v3\.8\.55/);
    assert.match(run.npmCalls[0] ?? "", /^pack --json --pack-destination /);
  });
});
