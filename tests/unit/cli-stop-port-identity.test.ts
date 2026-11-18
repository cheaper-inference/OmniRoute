import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { killByPort } = await import("../../bin/cli/commands/stop.mjs");

// The port fallback of `omniroute stop` signals whatever listens on the port. A listener whose
// command line does not name OmniRoute (or cannot be read) is someone else's server: it must be
// left alone, and the port must not be reported free.

type Kill = [number, string | number];

const KEEP_ALIVE = "console.log('up');setTimeout(()=>{},60000)";

// An OmniRoute child is proven by its entrypoint, so it runs a script file whose path names
// OmniRoute; a stranger runs inline code.
const fixtureDirs: string[] = [];
test.after(() => {
  for (const dir of fixtureDirs) fs.rmSync(dir, { recursive: true, force: true });
});

function omnirouteEntrypoint() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fixture-"));
  fixtureDirs.push(dir);
  fs.mkdirSync(path.join(dir, "omniroute"));
  const file = path.join(dir, "omniroute", "server.js");
  fs.writeFileSync(file, KEEP_ALIVE);
  return file;
}

async function startChild(kind: "stranger" | "omniroute" = "stranger") {
  const args = kind === "omniroute" ? [omnirouteEntrypoint()] : ["-e", KEEP_ALIVE];
  const child = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "ignore"] });
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
  const ours = await startChild("omniroute");
  try {
    const { deps, kills } = portDeps([ours.pid!]);
    assert.equal(await killByPort(20128, deps), true);
    assert.deepEqual(kills, [[ours.pid!, "SIGTERM"]]);
  } finally {
    ours.kill("SIGKILL");
  }
});

test("killByPort signals only the OmniRoute listener when a stranger shares the port", async () => {
  const ours = await startChild("omniroute");
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

// The pid can exit during the 1s grace wait and be reused by an unrelated process, which then
// reads as running. The SIGKILL escalation must prove identity again instead of trusting the
// first pass.
test("killByPort re-proves identity before SIGKILL so a reused pid is not killed", async () => {
  const kills: Kill[] = [];
  const identities = ["ours", "foreign"];
  const freed = await killByPort(20128, {
    platform: "linux",
    execFileAsync: async () => ({ stdout: "1000790\n", stderr: "" }),
    classifyPidIdentity: () => identities.shift() ?? "foreign",
    processKill: (pid: number, signal: string | number) => {
      kills.push([pid, signal]);
      return true;
    },
    // The OmniRoute process exited on SIGTERM; a stranger now holds the same pid.
    isPidRunning: () => true,
    sleep: async () => {},
  });
  assert.deepEqual(kills, [[1000790, "SIGTERM"]], "the reused pid must not get SIGKILL");
  assert.equal(freed, true, "our process is gone, so the port is no longer held by it");
});

test("killByPort still escalates to SIGKILL when the survivor is still OmniRoute", async () => {
  const kills: Kill[] = [];
  const freed = await killByPort(20128, {
    platform: "linux",
    execFileAsync: async () => ({ stdout: "1000791\n", stderr: "" }),
    classifyPidIdentity: () => "ours",
    processKill: (pid: number, signal: string | number) => {
      kills.push([pid, signal]);
      return true;
    },
    isPidRunning: () => !kills.some(([, signal]) => signal === "SIGKILL"),
    sleep: async () => {},
  });
  assert.deepEqual(kills, [
    [1000791, "SIGTERM"],
    [1000791, "SIGKILL"],
  ]);
  assert.equal(freed, true);
});

test("killByPort does not signal a pid that was already gone when classified", async () => {
  const kills: Kill[] = [];
  const freed = await killByPort(20128, {
    platform: "linux",
    execFileAsync: async () => ({ stdout: "1000792\n", stderr: "" }),
    classifyPidIdentity: () => "gone",
    processKill: (pid: number, signal: string | number) => {
      kills.push([pid, signal]);
      return true;
    },
    isPidRunning: () => false,
    sleep: async () => {},
  });
  assert.deepEqual(kills, [], "a pid with no process behind it is not signalled");
  assert.equal(freed, true);
});
