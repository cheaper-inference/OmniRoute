// `omniroute resilience config set` had no way to set the p2c latency weight, the only
// resilience knob that PATCH /api/resilience accepts as `{ p2cLatency: { weight } }` (#20445).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

interface MockFetchInit {
  method?: string;
  body?: string;
}

interface Captured {
  url: string;
  method: string;
  body: Record<string, unknown> | null;
}

const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
};
const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_EXIT = process.exit;
const ORIGINAL_STDERR_WRITE = process.stderr.write.bind(process.stderr);
const ORIGINAL_STDOUT_WRITE = process.stdout.write.bind(process.stdout);
const ORIGINAL_LOG = console.log;

class ExitCalled extends Error {
  constructor(readonly code: number | undefined) {
    super(`process.exit(${code})`);
  }
}

async function runConfigSet(args: string[]) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-p2c-"));
  process.env.DATA_DIR = dataDir;
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20128";
  const calls: Captured[] = [];
  let stderr = "";
  globalThis.fetch = (async (url: string, init?: MockFetchInit) => {
    calls.push({
      url: String(url),
      method: init?.method ?? "GET",
      body: init?.body ? JSON.parse(init.body) : null,
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as unknown as typeof fetch;
  process.exit = ((code?: number) => {
    throw new ExitCalled(code);
  }) as typeof process.exit;
  process.stderr.write = ((chunk: string | Uint8Array) => {
    stderr += String(chunk);
    return true;
  }) as typeof process.stderr.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  console.log = () => {};

  let exitCode: number | undefined;
  try {
    const { registerResilience } = await import("../../bin/cli/commands/resilience.mjs");
    const { Command } = await import("commander");
    const prog = new Command().exitOverride();
    registerResilience(prog);
    try {
      await prog.parseAsync(["node", "omniroute", "resilience", "config", "set", ...args], {
        from: "node",
      });
    } catch (err) {
      if (err instanceof ExitCalled) exitCode = err.code;
      else throw err;
    }
  } finally {
    globalThis.fetch = ORIGINAL_FETCH;
    process.exit = ORIGINAL_EXIT;
    process.stderr.write = ORIGINAL_STDERR_WRITE as typeof process.stderr.write;
    process.stdout.write = ORIGINAL_STDOUT_WRITE as typeof process.stdout.write;
    console.log = ORIGINAL_LOG;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
  return { calls, exitCode, stderr };
}

function resiliencePatches(calls: Captured[]) {
  return calls.filter((c) => c.method === "PATCH" && c.url.includes("/api/resilience"));
}

test("resilience config set --p2c-latency-weight sends { p2cLatency: { weight } } to /api/resilience", async () => {
  const { calls, exitCode } = await runConfigSet(["--p2c-latency-weight", "8"]);
  assert.equal(exitCode, undefined);
  const patches = resiliencePatches(calls);
  assert.equal(patches.length, 1);
  assert.deepEqual(patches[0].body, { p2cLatency: { weight: 8 } });
});

test("resilience config set --p2c-latency-weight accepts 0 (off) and keeps other flags", async () => {
  const { calls } = await runConfigSet(["--p2c-latency-weight", "0", "--threshold", "3"]);
  const patches = resiliencePatches(calls);
  assert.equal(patches.length, 1);
  assert.deepEqual(patches[0].body, { p2cLatency: { weight: 0 }, threshold: 3 });
});

for (const bad of ["21", "-1", "abc"]) {
  test(`resilience config set --p2c-latency-weight ${bad} exits 1 without a request`, async () => {
    const { calls, exitCode, stderr } = await runConfigSet(["--p2c-latency-weight", bad]);
    assert.equal(exitCode, 1);
    assert.match(stderr, /--p2c-latency-weight must be an integer from 0 to 20/);
    assert.equal(resiliencePatches(calls).length, 0);
  });
}

test("resilience config set without --p2c-latency-weight sends no p2cLatency", async () => {
  const { calls } = await runConfigSet(["--threshold", "5"]);
  const patches = resiliencePatches(calls);
  assert.equal(patches.length, 1);
  assert.deepEqual(patches[0].body, { threshold: 5 });
});
