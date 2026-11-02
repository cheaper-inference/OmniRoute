import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const gateUrl = new URL("../../../scripts/quality/gate-process.mjs", import.meta.url).href;
const processUrl = new URL("../../../scripts/dev/resource-budget-process.mjs", import.meta.url)
  .href;
const sentinel = "PRIVATE_PROCESS_SENTINEL";
const unrelatedPid = "7777777";

// Each mock lives in a separate Node process. Every /proc read is intercepted;
// there is no inspection or signalling of a real unrelated process. Only the
// runner's own short-lived shell is spawned for the receipt cases.
function observe(scenario) {
  const directory = mkdtempSync(join(tmpdir(), "gate-diagnostic-"));
  try {
    const source = `
      import fs from "node:fs";
      import { syncBuiltinESMExports } from "node:module";
      const scenario = ${JSON.stringify(scenario)};
      const realRead = fs.readFileSync;
      const realDirectory = fs.readdirSync;
      let statReads = 0;
      const directoryEntry = (name) => ({name, isDirectory: () => true});
      const scanOnly = ["conservation", "dirent-race", "malformed-with-live", "directory-ENOENT", "directory-EACCES"].includes(scenario);
      fs.readdirSync = (file, ...args) => {
        if (String(file) !== "/proc") return realDirectory(file, ...args);
        const withFileTypes = args[0]?.withFileTypes === true;
        if (scenario.startsWith("directory-")) {
          throw Object.assign(new Error("synthetic directory failure"), {code: scenario.slice("directory-".length)});
        }
        if (scenario === "dirent-race" && withFileTypes) {
          // Node converts DT_UNKNOWN to Dirent with an implicit lstat. A PID
          // disappearing there aborts the entire typed enumeration.
          throw Object.assign(new Error("synthetic vanished entry"), {code: "ENOENT"});
        }
        const names = scanOnly ? ["303", ${JSON.stringify(unrelatedPid)}, "self"] : [${JSON.stringify(unrelatedPid)}, "self"];
        return withFileTypes ? names.map(directoryEntry) : names;
      };
      fs.readFileSync = (file, ...args) => {
        const requested = String(file);
        if (!requested.startsWith("/proc/")) return realRead(file, ...args);
        statReads++;
        if (scanOnly) {
          // Fixed Linux stat fixtures: one member of synthetic group 301 and
          // one other group. No parser or filtering logic is copied here.
          if (requested === "/proc/303/stat") {
            return "303 (owned fixture) S 1 301 301 0 -1 4194304 0 0 0 0 0 0 0 0 20 0 1 0 456 0\\n";
          }
          if (requested === "/proc/7777777/stat") {
            if (scenario === "dirent-race") throw Object.assign(new Error("synthetic disappeared PID"), {code: "ENOENT"});
            if (scenario === "malformed-with-live") return "";
            return "7777777 (${sentinel}) S 1 7777777 7777777 0 -1 4194304 0 0 0 0 0 0 0 0 20 0 1 0 999 0\\n";
          }
        } else if (requested === "/proc/7777777/stat") {
          if (scenario === "empty-stat") {
            // A hypothetical second read would report disappearance. The
            // diagnostic must not turn the first incomplete read into PASS.
            if (statReads === 1) return "";
            throw Object.assign(new Error("synthetic disappearance"), {code: "ENOENT"});
          }
          throw Object.assign(new Error(${JSON.stringify(sentinel)}), {
            code: scenario === "unreadable-stat" ? "EACCES" : ${JSON.stringify(sentinel)},
          });
        }
        throw new Error("unexpected synthetic procfs read");
      };
      syncBuiltinESMExports();
      if (scanOnly) {
        const {listProcessGroupMembers} = await import(${JSON.stringify(processUrl)});
        const plain = listProcessGroupMembers(301);
        const plainReads = statReads;
        const observed = listProcessGroupMembers(301, {includeDiagnostics: true});
        console.log(JSON.stringify({plain, observed, plainReads, diagnosticReads: statReads - plainReads}));
      } else {
        const {runGateProcess} = await import(${JSON.stringify(gateUrl)});
        const result = await runGateProcess("/bin/sh", ["-c", "exit 0"], {
          cwd: ${JSON.stringify(directory)},
          env: {PATH: "/usr/bin:/bin", LANG: "C.UTF-8"},
          logPath: ${JSON.stringify(join(directory, "synthetic-output.txt"))},
          timeout: 20000, killGraceMs: 1000,
        });
        const {outcome, exitCode, processGroupObservation} = result.receipt;
        console.log(JSON.stringify({code: result.code, outcome, exitCode, processGroupObservation, statReads}));
      }
    `;
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", source], {
      encoding: "utf8",
      timeout: 25000,
      env: { PATH: "/usr/bin:/bin", LANG: "C.UTF-8" },
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

for (const [scenario, expectedReason] of [
  ["empty-stat", "PROC_STAT_FORMAT_INVALID"],
  ["unreadable-stat", "PROC_STAT_EACCES"],
  ["unclassified-error", "PROC_STAT_UNCLASSIFIED_ERROR"],
]) {
  test(
    `${scenario} remains a cleanup failure with useful, private diagnostics`,
    { skip: process.platform !== "linux" },
    () => {
      const result = observe(scenario);
      assert.equal(result.exitCode, 0);
      assert.equal(result.outcome, "CLEANUP_ERROR");
      assert.notEqual(result.code, 0);
      assert.equal(result.statReads, 1);
      assert.equal(result.processGroupObservation.status, "UNKNOWN");
      assert.equal(result.processGroupObservation.root.kind, "NOT_LISTED");
      assert.deepEqual(result.processGroupObservation.ownMembers, []);
      assert.deepEqual(result.processGroupObservation.unassignedErrors, { [expectedReason]: 1 });
      const diagnostic = JSON.stringify(result.processGroupObservation);
      assert.ok(!diagnostic.includes(unrelatedPid));
      assert.ok(!diagnostic.includes(sentinel));
      assert.ok(!diagnostic.includes("/proc/"));
    }
  );
}

test(
  "requesting diagnostics preserves membership, verdict and procfs reads for existing callers",
  { skip: process.platform !== "linux" },
  () => {
    const { plain, observed, plainReads, diagnosticReads } = observe("conservation");
    assert.deepEqual(plain, { members: [{ pid: 303, startTicks: "456" }], unknown: false });
    assert.deepEqual({ members: observed.members, unknown: observed.unknown }, plain);
    assert.equal(plainReads, 2);
    assert.equal(diagnosticReads, plainReads);
    assert.equal(observed.diagnostics.status, "COMPLETE");
    assert.deepEqual(
      observed.diagnostics.ownMembers.map(({ pid }) => pid),
      [303]
    );
    const diagnostic = JSON.stringify(observed.diagnostics);
    assert.ok(!diagnostic.includes(unrelatedPid));
    assert.ok(!diagnostic.includes(sentinel));
  }
);

test(
  "a PID disappearing during Dirent conversion cannot hide a live group member",
  { skip: process.platform !== "linux" },
  () => {
    const { plain, observed, plainReads, diagnosticReads } = observe("dirent-race");
    assert.deepEqual(plain, { members: [{ pid: 303, startTicks: "456" }], unknown: false });
    assert.deepEqual({ members: observed.members, unknown: observed.unknown }, plain);
    assert.equal(observed.diagnostics.status, "COMPLETE");
    assert.deepEqual(
      observed.diagnostics.ownMembers.map(({ pid }) => pid),
      [303]
    );
    assert.equal(plainReads, 2);
    assert.equal(diagnosticReads, 2);
  }
);

test(
  "a malformed stat remains unknown even when another live member is known",
  { skip: process.platform !== "linux" },
  () => {
    const { observed } = observe("malformed-with-live");
    assert.equal(observed.unknown, true);
    assert.equal(observed.diagnostics.status, "UNKNOWN");
    assert.deepEqual(observed.members, [{ pid: 303, startTicks: "456" }]);
    assert.deepEqual(observed.diagnostics.unassignedErrors, { PROC_STAT_FORMAT_INVALID: 1 });
  }
);

test(
  "real directory enumeration failures remain unknown without retry",
  { skip: process.platform !== "linux" },
  () => {
    for (const code of ["ENOENT", "EACCES"]) {
      const { observed, plainReads, diagnosticReads } = observe(`directory-${code}`);
      assert.equal(observed.unknown, true);
      assert.equal(observed.diagnostics.root.kind, "NOT_SCANNED");
      assert.equal(observed.diagnostics.directoryError, `PROC_STAT_${code}`);
      assert.deepEqual(observed.members, []);
      assert.equal(plainReads, 0);
      assert.equal(diagnosticReads, 0);
    }
  }
);
