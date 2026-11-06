/**
 * #17168: `omniroute restart` stopped the daemon, then called runServe() without
 * `daemon: true`, so it took the foreground supervisor path and never returned —
 * unusable from scripts and scheduled tasks. A restart must come back detached.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { runRestartCommand } = await import("../../bin/cli/commands/restart.mjs");

function fakeDeps() {
  const calls: { stop?: Record<string, unknown>; serve?: Record<string, unknown> } = {};
  return {
    calls,
    deps: {
      runStopCommand: async (opts: Record<string, unknown>) => {
        calls.stop = opts;
        return 0;
      },
      sleep: async () => {},
      runServe: async (opts: Record<string, unknown>) => {
        calls.serve = opts;
      },
    },
  };
}

test("restart starts the new server detached (daemon) so the CLI returns", async () => {
  const { calls, deps } = fakeDeps();
  const exitCode = await runRestartCommand({}, deps);
  assert.equal(exitCode, 0);
  assert.ok(calls.stop, "the running server is stopped first");
  assert.equal(calls.serve?.daemon, true);
});

test("restart keeps forwarding the explicit port to the detached server", async () => {
  const { calls, deps } = fakeDeps();
  await runRestartCommand({ port: "3000" }, deps);
  assert.equal(calls.serve?.port, "3000");
  assert.equal(calls.serve?.daemon, true);
});
