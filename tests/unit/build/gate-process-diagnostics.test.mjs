import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const gateUrl = new URL("../../../scripts/quality/gate-process.mjs", import.meta.url).href;
const linux = { skip: process.platform !== "linux", timeout: 12000 };
const sentinel = "PRIVATE_PROCESS_SENTINEL";
const unrelatedPid = "7777777";

// All procfs reads in this child are synthetic. runGateProcess only spawns and
// supervises its own empty Node process; no third-party PID is a cleanup target.
function observe(scenario) {
  const directory = mkdtempSync(join(tmpdir(), "gate-diagnostic-"));
  try {
    const source = `
      import fs from "node:fs";
      import childProcess from "node:child_process";
      import { syncBuiltinESMExports } from "node:module";
      const scenario = ${JSON.stringify(scenario)};
      const realRead = fs.readFileSync;
      const realDirectory = fs.readdirSync;
      let statReads = 0;
      let ownPid;
      const signals = [];
      if(scenario === "zombie-leader-with-live-threads") {
        const realSpawn = childProcess.spawn;
        childProcess.spawn = (...args) => {
          const child = realSpawn(...args);
          ownPid = child.pid;
          return child;
        };
        const realKill = process.kill.bind(process);
        process.kill = (pid, signal) => {
          if(pid !== -ownPid) throw new Error("cleanup target is not the fixture child group");
          signals.push(signal);
          return realKill(pid, signal);
        };
      }
      fs.readdirSync = (file, ...args) => {
        if(String(file) !== "/proc") return realDirectory(file, ...args);
        if(scenario === "zombie-leader-with-live-threads") return [String(ownPid)];
        if(scenario.startsWith("directory-")) {
          throw Object.assign(new Error(${JSON.stringify(sentinel)}), {
            code: scenario.slice("directory-".length),
          });
        }
        return [${JSON.stringify(unrelatedPid)}, "self"];
      };
      fs.readFileSync = (file, ...args) => {
        const requested = String(file);
        if(!requested.startsWith("/proc/")) return realRead(file, ...args);
        statReads++;
        if(scenario === "zombie-leader-with-live-threads") {
          if(requested !== "/proc/" + ownPid + "/stat") {
            throw new Error("synthetic stat requested outside the fixture child");
          }
          const fields = Array(20).fill("0");
          fields[0] = "Z";
          fields[2] = String(ownPid);
          fields[17] = "2";
          fields[19] = "123";
          return ownPid + " (fixture (own) child) " + fields.join(" ");
        }
        if(requested !== "/proc/${unrelatedPid}/stat") {
          throw new Error("unexpected synthetic procfs read");
        }
        if(scenario === "empty-stat") {
          // A later disappearance must not rewrite the first incomplete observation.
          if(statReads === 1) return "";
          throw Object.assign(new Error("synthetic disappearance"), {code: "ENOENT"});
        }
        const code = scenario.startsWith("gone-") ? scenario.slice("gone-".length)
          : scenario === "unreadable-stat" ? "EACCES" : ${JSON.stringify(sentinel)};
        throw Object.assign(new Error(${JSON.stringify(sentinel)}), {code});
      };
      syncBuiltinESMExports();
      const {runGateProcess} = await import(${JSON.stringify(gateUrl)});
      const result = await runGateProcess(process.execPath, ["-e", ""], {
        cwd: ${JSON.stringify(directory)},
        env: {PATH: process.env.PATH, LANG: "C.UTF-8"},
        logPath: ${JSON.stringify(join(directory, "synthetic-output.txt"))},
        timeout: 5000, killGraceMs: 100,
      });
      const {outcome, exitCode, processGroupObservation} = result.receipt;
      console.log(JSON.stringify({code: result.code, outcome, exitCode, processGroupObservation, statReads, ownPid, signals}));
    `;
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", source], {
      encoding: "utf8",
      timeout: 8000,
      env: { PATH: process.env.PATH, LANG: "C.UTF-8" },
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("a zombie leader with live threads remains executable", linux, () => {
  const result = observe("zombie-leader-with-live-threads");
  assert.equal(result.exitCode, 0);
  assert.equal(result.outcome, "ORPHANED_DESCENDANTS");
  assert.notEqual(result.code, 0);
  assert.equal(result.statReads, 1);
  assert.deepEqual(result.signals, ["SIGTERM", "SIGKILL"]);
  assert.equal(result.processGroupObservation.status, "COMPLETE");
  assert.deepEqual(result.processGroupObservation.ownMembers, [
    {
      pid: result.ownPid,
      startTicks: "123",
      state: "Z",
      threadCount: "2",
      executable: true,
    },
  ]);
  assert.equal(result.processGroupObservation.root.kind, "PRESENT");
});

for (const [scenario, reason] of [
  ["empty-stat", "PROC_STAT_FORMAT_INVALID"],
  ["unreadable-stat", "PROC_STAT_EACCES"],
  ["unclassified-error", "PROC_STAT_UNCLASSIFIED_ERROR"],
]) {
  test(`${scenario} remains unknown without exposing other processes`, linux, () => {
    const result = observe(scenario);
    assert.equal(result.exitCode, 0);
    assert.equal(result.outcome, "CLEANUP_ERROR");
    assert.notEqual(result.code, 0);
    assert.equal(result.statReads, 1);
    const diagnostic = result.processGroupObservation;
    assert.equal(diagnostic.status, "UNKNOWN");
    assert.equal(diagnostic.root.kind, "NOT_LISTED");
    assert.deepEqual(diagnostic.ownMembers, []);
    assert.deepEqual(diagnostic.unassignedErrors, { [reason]: 1 });
    const text = JSON.stringify(diagnostic);
    assert.ok(!text.includes(unrelatedPid));
    assert.ok(!text.includes(sentinel));
    assert.ok(!text.includes("/proc/"));
  });
}

for (const code of ["ENOENT", "EACCES"]) {
  test(`a /proc directory ${code} failure is not an empty process group`, linux, () => {
    const result = observe(`directory-${code}`);
    assert.equal(result.exitCode, 0);
    assert.equal(result.outcome, "CLEANUP_ERROR");
    assert.notEqual(result.code, 0);
    assert.equal(result.statReads, 0);
    const diagnostic = result.processGroupObservation;
    assert.equal(diagnostic.status, "UNKNOWN");
    assert.equal(diagnostic.root.kind, "NOT_SCANNED");
    assert.equal(diagnostic.directoryError, `PROC_STAT_${code}`);
    assert.deepEqual(diagnostic.ownMembers, []);
    assert.deepEqual(diagnostic.unassignedErrors, {});
    assert.ok(!JSON.stringify(diagnostic).includes(sentinel));
  });
}

for (const code of ["ENOENT", "ESRCH"]) {
  test(`a PID that disappeared with ${code} is not a live descendant`, linux, () => {
    const result = observe(`gone-${code}`);
    assert.equal(result.code, 0);
    assert.equal(result.outcome, "PASS");
    assert.equal(result.exitCode, 0);
  });
}
