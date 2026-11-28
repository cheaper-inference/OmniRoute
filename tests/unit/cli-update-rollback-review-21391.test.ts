/**
 * Review findings on the managed update (PR #21391): each test pins one defect the review found,
 * so it fails on the code before the fix. Everything runs against temp directories or the
 * throwaway fixture install; no real service, npm prefix or data directory is touched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tx = await import("../../bin/cli/updateTransaction.mjs");
const update = await import("../../bin/cli/commands/update.mjs");

const OPERATION_ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";
const OTHER_OPERATION_ID = "11111111-2222-4333-8444-555555555555";

function makePlan(overrides: Record<string, unknown> = {}) {
  return {
    operationId: OPERATION_ID,
    previousVersion: "3.8.54",
    targetVersion: "3.8.55",
    readinessTimeoutMs: 5_000,
    pollIntervalMs: 500,
    ...overrides,
  };
}

function tmp(prefix: string) {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), prefix)));
}

function makePreflightContext(overrides: Record<string, unknown> = {}) {
  return {
    platform: "linux",
    isContainer: () => false,
    isElectron: () => false,
    packageRoot: "/usr/lib/node_modules/omniroute",
    globalRoot: async () => "/usr/lib/node_modules",
    realpath: (p: string) => p,
    installedVersion: () => "3.8.54",
    dataDir: "/data/omniroute",
    service: async () => ({
      shape: "daemon",
      serverPid: 4100,
      supervisorPid: null,
      environment: { DATA_DIR: "/data/omniroute", PORT: "20128", HOME: "/home/x" },
    }),
    lockHeld: () => false,
    diskHeadroom: async () => ({ ok: true }),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------------------
// Thread 1: an update in progress is refused even when the service is already stopped.
// ---------------------------------------------------------------------------------------

test("pre-flight refuses a held lock before it looks at the service, the version or the install", async () => {
  // While a managed update runs, its coordinator has stopped the service (no pid file) and may
  // be replacing the package. None of the "unsupported" answers may win over the lock: they
  // would send the command down the standard flow and install outside the transaction.
  const during: Array<[string, Record<string, unknown>]> = [
    ["service already stopped", { service: async () => null }],
    ["package being replaced", { installedVersion: () => "3.8.55" }],
    ["global root briefly unreadable", { globalRoot: async () => null }],
  ];
  for (const [label, overrides] of during) {
    const result = await tx.preflightManagedUpdate(
      makePreflightContext({ lockHeld: () => true, ...overrides }),
      makePlan()
    );
    assert.deepEqual(result, { kind: "refused", reason: "update-in-progress" }, label);
  }
  // Without a lock the same environments keep the standard flow.
  const free = await tx.preflightManagedUpdate(
    makePreflightContext({ service: async () => null }),
    makePlan()
  );
  assert.deepEqual(free, { kind: "unsupported", reason: "no-managed-service" });
});

test("the CLI stops on a held lock instead of running the standard install", async () => {
  const lines: string[] = [];
  const orig = { log: console.log, error: console.error, warn: console.warn };
  const push = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.log = push;
  console.error = push;
  console.warn = push;
  try {
    const result = await update.runManagedUpdateFromCli({
      current: "3.8.54",
      latest: "3.8.55",
      deps: {
        preflight: async (plan: unknown) =>
          tx.preflightManagedUpdate(
            makePreflightContext({ lockHeld: () => true, service: async () => null }),
            plan
          ),
      },
    });
    assert.deepEqual(result, { handled: true, exitCode: 1 });
    assert.match(lines.join("\n"), /another managed update is already running/);
  } finally {
    Object.assign(console, orig);
  }
});

// Keeps the compiler quiet about helpers the next threads use.
void tmp;
void OTHER_OPERATION_ID;
