import test from "node:test";
import assert from "node:assert/strict";

// The child-process addon probe is a no-op off Windows, so a better-sqlite3 build
// that crashes the process on load (wrong ABI, missing CPU feature) takes the server
// down on Linux instead of falling back. An operator must be able to opt in to the
// probe there; the default stays no-spawn so ordinary boots pay nothing.
const { createBetterSqliteProbe } = await import("../../src/lib/db/adapters/driverFactory.ts");

const ENV = "OMNIROUTE_SQLITE_CHILD_PROBE";
const original = process.env[ENV];
test.afterEach(() => {
  if (original === undefined) delete process.env[ENV];
  else process.env[ENV] = original;
});

function spawnCounter(status: number | null) {
  const calls: string[][] = [];
  return {
    calls,
    spawn: (_command: string, args: string[]) => {
      calls.push(args);
      return { status };
    },
  };
}

test("linux skips the child probe by default", () => {
  delete process.env[ENV];
  const { calls, spawn } = spawnCounter(0);
  const probe = createBetterSqliteProbe({ platform: "linux", execPath: "node", spawn });
  assert.equal(probe(), true);
  assert.equal(calls.length, 0);
});

test("linux runs the child probe when the operator opts in, and a crash gives a bad verdict", () => {
  process.env[ENV] = "1";
  const crashed = spawnCounter(null);
  const probe = createBetterSqliteProbe({
    platform: "linux",
    execPath: "node",
    spawn: crashed.spawn,
  });
  assert.equal(probe(), false);
  assert.equal(probe(), false);
  assert.equal(crashed.calls.length, 1, "the verdict is cached");
});

test("linux opt-in with a healthy addon keeps better-sqlite3", () => {
  process.env[ENV] = "true";
  const healthy = spawnCounter(0);
  const probe = createBetterSqliteProbe({
    platform: "linux",
    execPath: "node",
    spawn: healthy.spawn,
  });
  assert.equal(probe(), true);
  assert.equal(healthy.calls.length, 1);
});

test("any other value of the opt-in variable leaves the probe off", () => {
  process.env[ENV] = "0";
  const { calls, spawn } = spawnCounter(null);
  const probe = createBetterSqliteProbe({ platform: "linux", execPath: "node", spawn });
  assert.equal(probe(), true);
  assert.equal(calls.length, 0);
});
