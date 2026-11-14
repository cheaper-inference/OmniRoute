import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const { killByPort } = await import("../../bin/cli/commands/stop.mjs");

// The port fallback of `omniroute stop` signals whatever listens on the port. A listener whose
// command line does not name OmniRoute (or cannot be read) is someone else's server: it must be
// left alone, and the port must not be reported free.

type Kill = [number, string | number];

async function startChild(...extraArgs: string[]) {
  const child = spawn(
    process.execPath,
    ["-e", "console.log('up');setTimeout(()=>{},60000)", ...extraArgs],
    { stdio: ["ignore", "pipe", "ignore"] }
  );
  await new Promise((resolve) => child.stdout.once("data", resolve));
  return child;
}

function portDeps(listenerPids: number[]) {
  const kills: Kill[] = [];
  const stopped = new Set<number>();
  const deps = {
    platform: "linux",
    execFileAsync: async () => ({ stdout: `${listenerPids.join("\n")}\n`, stderr: "" }),
    processKill: (pid: number, signal: string | number) => {
      kills.push([pid, signal]);
      stopped.add(pid);
      return true;
    },
    isPidRunning: (pid: number) => !stopped.has(pid),
    sleep: async () => {},
  };
  return { deps, kills };
}

async function withErrorLog<T>(logs: string[], fn: () => Promise<T>) {
  const original = console.error;
  console.error = (...args: unknown[]) => logs.push(args.join(" "));
  try {
    return await fn();
  } finally {
    console.error = original;
  }
}

test("killByPort does not signal a listener that does not run OmniRoute", async () => {
  const stranger = await startChild();
  try {
    const { deps, kills } = portDeps([stranger.pid!]);
    const logs: string[] = [];
    const freed = await withErrorLog(logs, () => killByPort(20128, deps));
    assert.deepEqual(kills, [], "an unrelated listener must not be signalled");
    assert.equal(freed, false, "the port is still held, so it is not reported free");
    assert.ok(
      logs.some((line) => line.includes(String(stranger.pid))),
      `the skipped pid is named in the output; got ${JSON.stringify(logs)}`
    );
  } finally {
    stranger.kill("SIGKILL");
  }
});

test("killByPort still stops a listener whose command line names OmniRoute", async () => {
  const ours = await startChild("/fixture/omniroute/server.js");
  try {
    const { deps, kills } = portDeps([ours.pid!]);
    assert.equal(await killByPort(20128, deps), true);
    assert.deepEqual(kills, [[ours.pid!, "SIGTERM"]]);
  } finally {
    ours.kill("SIGKILL");
  }
});

test("killByPort signals only the OmniRoute listener when a stranger shares the port", async () => {
  const ours = await startChild("/fixture/omniroute/server.js");
  const stranger = await startChild();
  try {
    const { deps, kills } = portDeps([stranger.pid!, ours.pid!]);
    const logs: string[] = [];
    const freed = await withErrorLog(logs, () => killByPort(20128, deps));
    assert.deepEqual(kills, [[ours.pid!, "SIGTERM"]]);
    assert.equal(freed, false);
  } finally {
    ours.kill("SIGKILL");
    stranger.kill("SIGKILL");
  }
});

test("killByPort (win32) does not signal a listener with an unproven identity", async () => {
  for (const identity of ["foreign", "unknown"]) {
    const kills: Kill[] = [];
    const logs: string[] = [];
    const freed = await withErrorLog(logs, () =>
      killByPort(20128, {
        platform: "win32",
        execFileAsync: async () => ({
          stdout: "  TCP    0.0.0.0:20128    0.0.0.0:0    LISTENING    1000789\r\n",
          stderr: "",
        }),
        classifyPidIdentity: () => identity,
        processKill: (pid: number, signal: string | number) => {
          kills.push([pid, signal]);
          return true;
        },
        isPidRunning: () => true,
        sleep: async () => {},
      })
    );
    assert.deepEqual(kills, [], `${identity} listener must not be signalled`);
    assert.equal(freed, false);
  }
});
