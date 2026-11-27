// Unit tests for stopPidGracefully and probeHealthPatient (core/gateway/process.mjs), using real
// short-lived child processes spawned here and an injected probe.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import type { ChildProcess } from "node:child_process";

import { pidAlive, waitFor } from "./_fixtures/gateway/harness.mjs";
import {
  probeHealthPatient,
  stopPidGracefully,
} from "../../../../bin/cli/launch/core/gateway/process.mjs";

const posix = process.platform !== "win32";
const children: ChildProcess[] = [];
const extraPids: number[] = [];

after(async () => {
  for (const pid of extraPids) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {}
  }
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) {
      try {
        child.kill("SIGKILL");
      } catch {}
    }
  }
  await waitFor(() => children.every((c) => c.exitCode !== null || c.signalCode !== null), {
    timeoutMs: 5000,
  });
});

/** Spawn a node child running `code`; resolves with its stdout once it printed "ready". */
async function spawnChild(code: string, detached = false) {
  const child = spawn(process.execPath, ["-e", `${code};console.log("ready")`], {
    stdio: ["ignore", "pipe", "ignore"],
    detached,
  });
  children.push(child);
  const output = await new Promise<string>((resolve, reject) => {
    let text = "";
    child.once("error", reject);
    child.stdout?.on("data", (buf: Buffer) => {
      text += String(buf);
      if (text.includes("ready")) resolve(text);
    });
  });
  return { child, output };
}

const IDLE = "setInterval(() => {}, 1000)";
const IGNORE_TERM = `process.on("SIGTERM", () => {});${IDLE}`;

test("stopPidGracefully on a pid that is not running returns true", async () => {
  const res = spawnSync(process.execPath, ["-e", ""]);
  assert.equal(await stopPidGracefully(res.pid as number), true);
});

test("stopPidGracefully stops a child that honours SIGTERM", { skip: !posix }, async () => {
  const { child } = await spawnChild(IDLE);
  assert.equal(await stopPidGracefully(child.pid as number, { timeoutMs: 3000 }), true);
  assert.ok(await waitFor(() => child.signalCode !== null || child.exitCode !== null));
  assert.equal(child.signalCode, "SIGTERM");
});

test("stopPidGracefully SIGKILLs a child that ignores SIGTERM", { skip: !posix }, async () => {
  const { child } = await spawnChild(IGNORE_TERM);
  const started = Date.now();
  assert.equal(await stopPidGracefully(child.pid as number, { timeoutMs: 300 }), true);
  assert.ok(Date.now() - started >= 250, "waited for the grace before SIGKILL");
  assert.ok(await waitFor(() => child.signalCode !== null));
  assert.equal(child.signalCode, "SIGKILL");
});

test("stopPidGracefully with group kills the whole process group", { skip: !posix }, async () => {
  // A detached group leader that ignores SIGTERM and owns a grandchild in its group.
  const code =
    `const c = require("node:child_process").spawn(process.execPath, ` +
    `["-e", ${JSON.stringify(IDLE)}], { stdio: "ignore" });` +
    `console.log("pid=" + c.pid);${IGNORE_TERM}`;
  const { child: leader, output } = await spawnChild(code, true);
  const grandchild = Number.parseInt(/pid=(\d+)/.exec(output)?.[1] ?? "", 10);
  assert.ok(Number.isInteger(grandchild) && grandchild > 0);
  extraPids.push(grandchild);
  assert.ok(pidAlive(grandchild));
  const stopped = await stopPidGracefully(leader.pid as number, { timeoutMs: 200, group: true });
  assert.equal(stopped, true);
  assert.equal(leader.signalCode ?? (await waitFor(() => leader.signalCode)), "SIGKILL");
  assert.ok(await waitFor(() => !pidAlive(grandchild), { timeoutMs: 3000 }));
});

test("probeHealthPatient: true on the first healthy attempt, without backoff", async () => {
  const calls: number[] = [];
  const started = Date.now();
  const ok = await probeHealthPatient("http://x", {
    timeoutsMs: [10, 20],
    backoffMs: 5000,
    probe: async (_url: string, { timeoutMs }: { timeoutMs: number }) => {
      calls.push(timeoutMs);
      return true;
    },
  });
  assert.equal(ok, true);
  assert.deepEqual(calls, [10]);
  assert.ok(Date.now() - started < 1000);
});

test("probeHealthPatient retries with linear backoff until healthy", async () => {
  const calls: Array<{ url: string; timeoutMs: number; at: number }> = [];
  const started = Date.now();
  const ok = await probeHealthPatient("http://y", {
    timeoutsMs: [1, 2, 3],
    backoffMs: 40,
    probe: async (url: string, { timeoutMs }: { timeoutMs: number }) => {
      calls.push({ url, timeoutMs, at: Date.now() - started });
      return calls.length === 3;
    },
  });
  assert.equal(ok, true);
  assert.deepEqual(
    calls.map((c) => [c.url, c.timeoutMs]),
    [
      ["http://y", 1],
      ["http://y", 2],
      ["http://y", 3],
    ]
  );
  // 40 ms before attempt 2, 80 ms more before attempt 3.
  assert.ok(calls[2].at >= 110, `third attempt at ${calls[2].at}ms`);
});

test("probeHealthPatient: false when every attempt fails; backoff 0 never sleeps", async () => {
  let count = 0;
  const started = Date.now();
  const ok = await probeHealthPatient("http://z", {
    timeoutsMs: [1, 1, 1, 1],
    backoffMs: 0,
    probe: async () => {
      count++;
      return false;
    },
  });
  assert.equal(ok, false);
  assert.equal(count, 4);
  assert.ok(Date.now() - started < 500);
});

test("probeHealthPatient: no timeouts means no attempt", async () => {
  let count = 0;
  const ok = await probeHealthPatient("http://z", {
    timeoutsMs: [],
    probe: async () => {
      count++;
      return true;
    },
  });
  assert.equal(ok, false);
  assert.equal(count, 0);
});
