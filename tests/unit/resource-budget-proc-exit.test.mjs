import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const helperUrl = new URL("../../scripts/dev/resource-budget-process.mjs", import.meta.url).href;

function probe(body) {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", body], {
    encoding: "utf8",
    timeout: 5_000,
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("a native proc stat descriptor whose process exited is missing, not unknown", () => {
  const result = probe(`
    import assert from "node:assert/strict";
    import { spawn } from "node:child_process";
    import { once } from "node:events";
    import fs from "node:fs";
    import { syncBuiltinESMExports } from "node:module";
    const { captureOwner, classifyOwner, listProcessGroupMembers, killVerifiedGroupMembers } =
      await import(${JSON.stringify(helperUrl)});
    const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
      detached: true,
      stdio: "ignore",
    });
    const originalRead = fs.readFileSync;
    const originalList = fs.readdirSync;
    const originalKill = process.kill;
    let fd;
    try {
      await once(child, "spawn");
      const owner = captureOwner(child.pid);
      const path = "/proc/" + child.pid + "/stat";
      const statBeforeExit = originalRead(path, "utf8");
      const entries = originalList("/proc").filter((name) => name === String(child.pid));
      assert.equal(entries.length, 1);
      fd = fs.openSync(path, "r");
      const exited = once(child, "exit");
      child.kill("SIGTERM");
      await exited;
      assert.throws(() => originalRead(fd, "utf8"), { code: "ESRCH" });
      fs.readdirSync = (path, ...args) =>
        String(path) === "/proc"
          ? args[0]?.withFileTypes
            ? entries.map((name) => ({ name, isDirectory: () => true }))
            : entries
          : originalList(path, ...args);
      fs.readFileSync = (value, ...args) =>
        String(value) === path ? originalRead(fd, ...args) : originalRead(value, ...args);
      syncBuiltinESMExports();
      const snapshot = listProcessGroupMembers(child.pid);
      const identity = classifyOwner(owner);
      const drained = await killVerifiedGroupMembers(child.pid, -1, 50);
      let reads = 0;
      fs.readFileSync = (value, ...args) => {
        if (String(value) !== path) return originalRead(value, ...args);
        reads += 1;
        return reads === 1 ? statBeforeExit : originalRead(fd, ...args);
      };
      const signals = [];
      process.kill = (...args) => signals.push(args);
      syncBuiltinESMExports();
      const drainedBetweenScanAndSignal = await killVerifiedGroupMembers(child.pid, -1, 50);
      console.log(JSON.stringify({
        nativeError: "ESRCH", snapshot, identity, drained, drainedBetweenScanAndSignal, signals,
      }));
    } finally {
      fs.readFileSync = originalRead;
      fs.readdirSync = originalList;
      process.kill = originalKill;
      syncBuiltinESMExports();
      if (fd !== undefined) fs.closeSync(fd);
      if (child.exitCode === null && child.signalCode === null) {
        const exited = once(child, "exit");
        child.kill("SIGKILL");
        await exited;
      }
    }
  `);
  assert.equal(result.nativeError, "ESRCH");
  assert.deepEqual(result.snapshot, { members: [], unknown: false });
  assert.deepEqual(result.identity, { identity: "STALE", reason: "pid-missing" });
  assert.equal(result.drained, true);
  assert.equal(result.drainedBetweenScanAndSignal, true);
  assert.deepEqual(result.signals, []);
});

for (const failure of ["EACCES", "EPERM", "EIO", "malformed"]) {
  test(`proc ${failure} remains unknown and cannot authorize cleanup`, () => {
    const result = probe(`
      import fs from "node:fs";
      import { syncBuiltinESMExports } from "node:module";
      const { captureOwner, classifyOwner, listProcessGroupMembers, killVerifiedGroupMembers } =
        await import(${JSON.stringify(helperUrl)});
      const owner = captureOwner(process.pid);
      const path = "/proc/" + process.pid + "/stat";
      const originalRead = fs.readFileSync;
      const failure = ${JSON.stringify(failure)};
      fs.readdirSync = (_path, options) => options?.withFileTypes
        ? [{ name: String(process.pid), isDirectory: () => true }]
        : [String(process.pid)];
      fs.readFileSync = (value, ...args) => {
        if (String(value) !== path) return originalRead(value, ...args);
        if (failure === "malformed") return "invalid proc stat";
        throw Object.assign(new Error("fixture proc read failure"), { code: failure });
      };
      const signals = [];
      process.kill = (...args) => signals.push(args);
      syncBuiltinESMExports();
      const snapshot = listProcessGroupMembers(process.pid);
      const identity = classifyOwner(owner);
      const drained = await killVerifiedGroupMembers(process.pid, -1, 50);
      console.log(JSON.stringify({ snapshot, identity, drained, signals }));
    `);
    assert.deepEqual(result.snapshot, { members: [], unknown: true });
    assert.equal(result.identity.identity, "UNKNOWN");
    assert.equal(result.drained, false);
    assert.deepEqual(result.signals, []);
  });
}
