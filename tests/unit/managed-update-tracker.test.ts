/**
 * Dashboard follow-up of a managed update: the server is stopped during the swap, so the page
 * polls the durable verdict, keeps the last known phase while the server is down, and reports
 * the recovery result after reconnecting. Pure logic, no network.
 */
import test from "node:test";
import assert from "node:assert/strict";

import type {
  ManagedTrackResult,
  ManagedUpdateState,
} from "../../src/app/(dashboard)/dashboard/managedUpdateTracker.ts";
import type {
  UpdatePhase,
  UpdateStep,
} from "../../src/app/(dashboard)/dashboard/UpdateProgressDialog.tsx";

const tracker = await import("../../src/app/(dashboard)/dashboard/managedUpdateTracker.ts");

const OP = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";
const t = (key: string, values?: Record<string, string | number>) =>
  values
    ? `${key}|${Object.entries(values)
        .map(([k, v]) => `${k}=${v}`)
        .join(",")}`
    : key;

function terminalOf(result: ManagedTrackResult): ManagedUpdateState {
  assert.ok(result.kind === "terminal");
  return result.state;
}

function state(overrides: Record<string, unknown> = {}) {
  return {
    operationId: OP,
    status: "running",
    phase: "installing",
    previousVersion: "3.8.54",
    targetVersion: "3.8.55",
    ...overrides,
  };
}

function fakeClock() {
  let clock = 0;
  return {
    now: () => clock,
    wait: async (ms: number) => {
      clock += ms;
    },
  };
}

test("keeps the last known phase while the server is down, then reports the rolled-back verdict", async () => {
  const clock = fakeClock();
  const script: Array<unknown> = [
    state({ phase: "stopping" }),
    state({ phase: "installing" }),
    new Error("fetch failed"), // the server was stopped for the swap
    new Error("fetch failed"),
    new Error("ECONNREFUSED"), // the candidate is not serving yet
    state({ status: "rolled-back", phase: "finished", runningVersion: "3.8.54" }),
  ];
  const seen: string[] = [];
  const disconnected: Array<string | null> = [];
  const result = await tracker.trackManagedUpdate({
    operationId: OP,
    ...clock,
    fetchState: async () => {
      const next = script.shift();
      if (next instanceof Error) throw next;
      return next as never;
    },
    onState: (s: ManagedUpdateState) => seen.push(`${s.status}:${s.phase}`),
    onDisconnected: (last: ManagedUpdateState | null) =>
      disconnected.push(last ? last.phase : null),
  });
  assert.equal(terminalOf(result).status, "rolled-back");
  assert.deepEqual(seen, ["running:stopping", "running:installing", "rolled-back:finished"]);
  // Every outage reported the phase the page had last seen, never an empty state.
  assert.deepEqual(disconnected, ["installing", "installing", "installing"]);
});

test("polling is bounded: no verdict before the deadline is a timeout carrying the last state", async () => {
  const clock = fakeClock();
  let calls = 0;
  const result = await tracker.trackManagedUpdate({
    operationId: OP,
    ...clock,
    intervalMs: 1000,
    deadlineMs: 5000,
    fetchState: async () => {
      calls += 1;
      if (calls === 1) return state({ phase: "snapshot" }) as never;
      throw new Error("down");
    },
    onState: () => {},
  });
  assert.ok(result.kind === "timeout");
  assert.equal(result.lastState?.phase, "snapshot");
  assert.ok(calls >= 5 && calls <= 7, `bounded number of polls, got ${calls}`);
});

test("an unknown operation (null) keeps polling instead of declaring a result", async () => {
  const clock = fakeClock();
  const script = [
    null,
    null,
    state({ status: "updated", phase: "finished", runningVersion: "3.8.55" }),
  ];
  const result = await tracker.trackManagedUpdate({
    operationId: OP,
    ...clock,
    fetchState: async () => script.shift() as never,
    onState: () => {},
  });
  assert.equal(terminalOf(result).status, "updated");
});

test("step rows follow the phase, mark the failed forward step on a rollback and never invent success", () => {
  const rows = (s: Record<string, unknown>, opts?: { disconnected?: boolean }) =>
    Object.fromEntries(
      tracker
        .managedStateToSteps(state(s) as never, t, opts)
        .map((r: UpdateStep) => [r.step, r.status])
    );
  assert.deepEqual(rows({ phase: "stopping" }), {
    "managed-stop": "running",
    "managed-snapshot": "pending",
    "managed-install": "pending",
    "managed-verify": "pending",
  });
  assert.deepEqual(rows({ phase: "verifying" }), {
    "managed-stop": "done",
    "managed-snapshot": "done",
    "managed-install": "done",
    "managed-verify": "running",
  });
  assert.deepEqual(rows({ status: "rolled-back", phase: "finished", reason: "target-not-ready" }), {
    "managed-stop": "done",
    "managed-snapshot": "done",
    "managed-install": "done",
    "managed-verify": "failed",
    "managed-restore": "done",
  });
  assert.deepEqual(rows({ status: "rolled-back", phase: "finished", reason: "install-failed" }), {
    "managed-stop": "done",
    "managed-snapshot": "done",
    "managed-install": "failed",
    "managed-verify": "pending",
    "managed-restore": "done",
  });
  assert.equal(
    rows({ status: "manual-recovery", phase: "finished", reason: "restore-failed" })[
      "managed-restore"
    ],
    "failed"
  );
  assert.equal(
    tracker
      .managedStateToSteps(state({ phase: "installing" }) as never, t, { disconnected: true })
      .find((r: UpdateStep) => r.step === "managed-install")?.message,
    "managedUpdateReconnecting"
  );
});

test("outcome views: updated reloads, rollback names both versions, manual recovery lists the steps and the snapshot", () => {
  const updated = tracker.managedOutcomeView(
    state({ status: "updated", phase: "finished", runningVersion: "3.8.55" }) as never,
    t
  );
  assert.equal(updated.phase, "done");
  assert.match(updated.complete.message, /updated/);

  const rolled = tracker.managedOutcomeView(
    state({ status: "rolled-back", phase: "finished", runningVersion: "3.8.54" }) as never,
    t
  );
  assert.equal(rolled.phase, "failed");
  assert.equal(rolled.recovery.status, "done");
  assert.match(rolled.recovery.message, /target=3\.8\.55/);
  assert.match(rolled.recovery.message, /version=3\.8\.54/);

  const manual = tracker.managedOutcomeView(
    state({
      status: "manual-recovery",
      phase: "finished",
      snapshotPath: "/data/managed-update/x/data-snapshot",
      recovery: { steps: ["Stop OmniRoute", "Copy the snapshot back"] },
    }) as never,
    t
  );
  assert.equal(manual.phase, "failed");
  assert.equal(manual.recovery.status, "failed");
  assert.match(manual.recovery.message, /Stop OmniRoute/);
  assert.match(manual.recovery.message, /\/data\/managed-update\/x\/data-snapshot/);

  assert.deepEqual(tracker.managedOutcomeView(state() as never, t), { phase: "running" });
});

test("followManagedUpdate drives the dialog through an outage to the recovered verdict", async () => {
  const clock = fakeClock();
  const responses: Array<Response | Error> = [
    Response.json(state({ phase: "installing" })),
    new TypeError("fetch failed"),
    Response.json(state({ status: "rolled-back", phase: "finished", runningVersion: "3.8.54" })),
  ];
  const phases: UpdatePhase[] = [];
  let lastSteps: Array<{ step: string; status: string }> = [];
  const result = await tracker.followManagedUpdate({
    operationId: OP,
    targetVersion: "3.8.55",
    currentVersion: "3.8.54",
    t,
    ...clock,
    fetchFn: (async () => {
      const next = responses.shift()!;
      if (next instanceof Error) throw next;
      return next;
    }) as typeof fetch,
    setPhase: (p: UpdatePhase) => phases.push(p),
    setSteps: (s: UpdateStep[]) => {
      lastSteps = s;
    },
  });
  assert.equal(result.kind, "terminal");
  assert.equal(phases.at(0), "running");
  assert.equal(phases.at(-1), "failed");
  assert.ok(lastSteps.some((s) => s.step === "recovery" && s.status === "done"));
});

test("followManagedUpdate: a non-OK answer is treated as an outage, and the deadline ends as failed with a timeout row", async () => {
  const clock = fakeClock();
  let phase = "";
  let steps: Array<{ step: string; status: string }> = [];
  const result = await tracker.followManagedUpdate({
    operationId: OP,
    targetVersion: "3.8.55",
    currentVersion: "3.8.54",
    t,
    ...clock,
    intervalMs: 1000,
    deadlineMs: 3000,
    fetchFn: (async () => new Response("nope", { status: 503 })) as typeof fetch,
    setPhase: (p: UpdatePhase) => {
      phase = p;
    },
    setSteps: (s: UpdateStep[]) => {
      steps = s;
    },
  });
  assert.equal(result.kind, "timeout");
  assert.equal(phase, "failed");
  assert.ok(steps.some((s) => s.step === "error"));
});
