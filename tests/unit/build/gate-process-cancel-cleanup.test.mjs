import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runGateProcess } from "../../../scripts/quality/gate-process.mjs";

test(
  "cancellation reaps or stops TERM-resistant same-group parent and child",
  {
    skip: process.platform !== "linux",
    timeout: 15000,
  },
  async (t) => {
    const directory = mkdtempSync(join(tmpdir(), "gate-cancel-cleanup-"));
    const logPath = join(directory, "gate.log");
    const program = join(directory, "worker.mjs");
    const controller = new AbortController();
    let pids = [];
    const identities = new Map();
    const processStartTime = (pid) => {
      const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
      // Fields after the final ')' begin at field 3; starttime is field 22.
      return stat.slice(stat.lastIndexOf(") ") + 2).split(" ")[19];
    };
    t.after(() => {
      controller.abort();
      for (const pid of pids) {
        try {
          const originalStartTime = identities.get(pid);
          if (originalStartTime && processStartTime(pid) === originalStartTime) {
            process.kill(pid, "SIGKILL");
          }
        } catch (error) {
          if (error.code !== "ESRCH" && error.code !== "ENOENT") throw error;
        }
      }
      rmSync(directory, { recursive: true, force: true });
    });
    writeFileSync(
      program,
      `
import { spawn } from "node:child_process";
process.on("SIGTERM", () => {});
if (process.argv[2] === "child") {
  console.log("child=" + process.pid);
} else {
  console.log("parent=" + process.pid);
  spawn(process.execPath, [process.argv[1], "child"], { stdio: ["ignore", "inherit", "inherit"] });
}
setInterval(() => {}, 1000);
`
    );
    const result = await runGateProcess(process.execPath, [program], {
      cwd: directory,
      env: {},
      logPath,
      timeout: 10000,
      killGraceMs: 100,
      heartbeatMs: 20,
      signal: controller.signal,
      onHeartbeat() {
        const output = readFileSync(logPath, "utf8");
        pids = [...output.matchAll(/(?:parent|child)=(\d+)/g)].map((match) => Number(match[1]));
        for (const pid of pids) {
          if (!identities.has(pid)) identities.set(pid, processStartTime(pid));
        }
        if (pids.length === 2) controller.abort();
      },
    });
    assert.equal(pids.length, 2, "cancel only after both TERM handlers are installed");
    assert.equal(result.code, 1);
    assert.equal(result.receipt.outcome, "CANCELLED");
    assert.equal(result.receipt.signal, "SIGKILL");
    assert.match(result.out, /child=/);
    const receipt = JSON.parse(readFileSync(result.receiptPath, "utf8"));
    assert.equal(receipt.outcome, "CANCELLED");
    assert.equal(receipt.cleanupError, null);
    for (const pid of pids) {
      try {
        const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
        assert.equal(stat.slice(stat.lastIndexOf(") ") + 2)[0], "Z", `PID ${pid} must not run`);
      } catch (error) {
        assert.equal(error.code, "ENOENT");
      }
    }
  }
);
