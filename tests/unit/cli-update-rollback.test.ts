/**
 * Managed update with automatic recovery (`omniroute update --apply --rollback-on-failure`).
 *
 * Every dependency of the coordinator (package swap, process control, snapshot, readiness
 * probe, durable state) is injected, so nothing here installs a package, signals a process or
 * touches a real service. The few tests that use the real helpers run against temp
 * directories only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tx = await import("../../bin/cli/updateTransaction.mjs");
const update = await import("../../bin/cli/commands/update.mjs");

const OPERATION_ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";

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

type Probe = { status: "ready"; pid: number; version: string } | { status: "pending" };
type Expectation = { expectedVersion: string; excludePids: number[]; role: string };
type StopResult = { stopped: boolean; pids?: number[] };
type Touched = { package: boolean; data: boolean };
type Behaviour = {
  lockHeld?: boolean;
  prepare?: { kind: string; reason?: string };
  stopOld?: StopResult;
  snapshotFails?: boolean;
  installFails?: boolean;
  startFails?: string[];
  restoreFails?: boolean;
  stopCandidate?: StopResult;
  probe?: (phase: string, expectation: Expectation) => Probe;
};
type StateRecord = {
  operationId: string;
  status: string;
  phase: string;
  previousVersion: string;
  targetVersion: string;
  snapshotPath?: string;
  recovery?: { steps: string[] };
};

/**
 * Builds a full fake dependency set with a fake clock. `behaviour` decides what every step
 * does; every call is appended to `events` so tests assert the exact order.
 */
function makeDeps(behaviour: Behaviour = {}) {
  const events: string[] = [];
  const records: StateRecord[] = [];
  let clock = 0;
  const calls = {
    restorePrevious: [] as Array<{ snapshot: unknown; touched: Touched }>,
    discard: 0,
    release: 0,
    probes: [] as Expectation[],
  };
  const OLD_PIDS = [4100, 4101];
  const CANDIDATE_PID = 5200;
  const PREVIOUS_PID = 6300;
  let phase: "target" | "previous" = "target";

  const deps = {
    now: () => clock,
    sleep: async (ms: number) => {
      clock += ms;
    },
    record: async (state: StateRecord) => {
      records.push(JSON.parse(JSON.stringify(state)));
    },
    acquireLock: async () => {
      events.push("lock");
      if (behaviour.lockHeld) {
        const err = Object.assign(new Error("another managed update is running"), {
          code: "update-in-progress",
        });
        throw err;
      }
      return {
        release: async () => {
          calls.release += 1;
          events.push("unlock");
        },
      };
    },
    prepare: async () => {
      events.push("prepare");
      return behaviour.prepare ?? { kind: "ok" };
    },
    stopOld: async () => {
      events.push("stop-old");
      return behaviour.stopOld ?? { stopped: true, pids: OLD_PIDS };
    },
    snapshot: async () => {
      events.push("snapshot");
      if (behaviour.snapshotFails) throw new Error("disk full");
      return { id: "snap-1", path: "/snapshots/snap-1" };
    },
    installTarget: async () => {
      events.push("install-target");
      if (behaviour.installFails) throw new Error("npm exited with 1");
    },
    start: async (role: "target" | "previous") => {
      events.push(`start-${role}`);
      phase = role;
      if (behaviour.startFails?.includes(role)) throw new Error(`spawn failed (${role})`);
      return { pid: role === "target" ? CANDIDATE_PID : PREVIOUS_PID };
    },
    probe: async (expectation: Expectation): Promise<Probe> => {
      calls.probes.push(expectation);
      if (behaviour.probe) return behaviour.probe(phase, expectation);
      return {
        status: "ready",
        pid: phase === "target" ? CANDIDATE_PID : PREVIOUS_PID,
        version: expectation.expectedVersion,
      };
    },
    stopCandidate: async () => {
      events.push("stop-candidate");
      return behaviour.stopCandidate ?? { stopped: true, pids: [CANDIDATE_PID] };
    },
    restorePrevious: async (snapshot: unknown, touched: Touched) => {
      events.push("restore-previous");
      calls.restorePrevious.push({ snapshot, touched });
      if (behaviour.restoreFails) throw new Error("copy back failed");
    },
    discardSnapshot: async () => {
      calls.discard += 1;
      events.push("discard-snapshot");
    },
  };
  return { deps, events, records, calls, OLD_PIDS, CANDIDATE_PID, PREVIOUS_PID };
}

// The target never comes up, and the first answers come from the OLD process (still bound
// to the port in the fake). Only the previous version, restored, is healthy.
function wrongProcessThenFailedCandidate(h: ReturnType<typeof makeDeps>) {
  return (phase: string, expectation: Expectation): Probe => {
    if (phase === "target") {
      return { status: "ready", pid: h.OLD_PIDS[1], version: expectation.expectedVersion };
    }
    return { status: "ready", pid: h.PREVIOUS_PID, version: expectation.expectedVersion };
  };
}

test("a normal update reports updated, never restores, and releases the lock", async () => {
  const h = makeDeps();
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "updated");
  assert.equal(outcome.runningVersion, "3.8.55");
  assert.equal(outcome.operationId, OPERATION_ID);
  assert.equal(h.calls.restorePrevious.length, 0);
  assert.deepEqual(h.events, [
    "lock",
    "prepare",
    "stop-old",
    "snapshot",
    "install-target",
    "start-target",
    "discard-snapshot",
    "unlock",
  ]);
  assert.equal(h.records.at(-1).status, "updated");
});

test("the 200 of the old process never confirms the swap: the candidate fails and the previous pair is restored once", async () => {
  const h = makeDeps();
  h.deps.probe = async (expectation: Expectation) => {
    h.calls.probes.push(expectation);
    return wrongProcessThenFailedCandidate(h)(
      h.events.includes("start-previous") ? "previous" : "target",
      expectation
    );
  };
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "rolled-back");
  assert.equal(outcome.runningVersion, "3.8.54");
  assert.equal(outcome.reason, "old-process-still-answering");
  assert.equal(h.calls.restorePrevious.length, 1);
  assert.deepEqual(h.calls.restorePrevious[0].touched, { package: true, data: true });
  assert.deepEqual(
    h.events.filter((e) => e !== "lock" && e !== "unlock"),
    [
      "prepare",
      "stop-old",
      "snapshot",
      "install-target",
      "start-target",
      "stop-candidate",
      "restore-previous",
      "start-previous",
      "discard-snapshot",
    ]
  );
  // The old pids are excluded when the candidate is judged, and old + candidate pids when the
  // restored previous version is judged.
  assert.deepEqual(h.calls.probes[0].excludePids, h.OLD_PIDS);
  assert.ok(h.calls.probes.at(-1).excludePids.includes(h.CANDIDATE_PID));
});

test("a candidate that never answers within the timeout is rolled back", async () => {
  const h = makeDeps({
    probe: (phase: string, exp: Expectation): Probe =>
      phase === "target"
        ? { status: "pending" }
        : { status: "ready", pid: 6300, version: exp.expectedVersion },
  });
  const outcome = await tx.runManagedUpdate(makePlan({ readinessTimeoutMs: 2_000 }), h.deps);
  assert.equal(outcome.status, "rolled-back");
  assert.equal(outcome.reason, "target-not-ready");
  assert.equal(outcome.runningVersion, "3.8.54");
  assert.equal(h.calls.restorePrevious.length, 1);
});

test("a candidate that reports a different version is not accepted", async () => {
  const h = makeDeps({
    probe: (phase: string, exp: Expectation): Probe =>
      phase === "target"
        ? { status: "ready", pid: 5200, version: "3.8.54" }
        : { status: "ready", pid: 6300, version: exp.expectedVersion },
  });
  const outcome = await tx.runManagedUpdate(makePlan({ readinessTimeoutMs: 1_000 }), h.deps);
  assert.equal(outcome.status, "rolled-back");
  assert.equal(outcome.reason, "target-not-ready");
});

test("a partial install error restores the package only and brings the previous version back", async () => {
  const h = makeDeps({ installFails: true });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "rolled-back");
  assert.equal(outcome.reason, "install-failed");
  assert.equal(h.calls.restorePrevious.length, 1);
  // The candidate never started, so it never touched the data and there is nothing to stop.
  assert.deepEqual(h.calls.restorePrevious[0].touched, { package: true, data: false });
  assert.equal(h.events.includes("stop-candidate"), false);
  assert.equal(h.events.includes("start-target"), false);
  assert.equal(h.events.at(-3), "start-previous");
});

test("a snapshot failure never touches the package: the stopped previous service just comes back", async () => {
  const h = makeDeps({ snapshotFails: true });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "rolled-back");
  assert.equal(outcome.reason, "snapshot-failed");
  assert.equal(h.calls.restorePrevious.length, 0);
  assert.equal(h.events.includes("install-target"), false);
  assert.ok(h.events.includes("start-previous"));
});

test("a failed restoration preserves the snapshot and asks for manual recovery", async () => {
  const h = makeDeps({
    restoreFails: true,
    probe: (): Probe => ({ status: "pending" }),
  });
  const outcome = await tx.runManagedUpdate(makePlan({ readinessTimeoutMs: 1_000 }), h.deps);
  assert.equal(outcome.status, "manual-recovery");
  assert.equal(outcome.runningVersion, null);
  assert.equal(h.calls.restorePrevious.length, 1, "restoration is attempted exactly once");
  assert.equal(h.calls.discard, 0, "the snapshot must survive a failed restoration");
  assert.equal(h.events.includes("start-previous"), false);
  const last = h.records.at(-1);
  assert.equal(last.status, "manual-recovery");
  assert.equal(last.snapshotPath, "/snapshots/snap-1");
  assert.ok(Array.isArray(last.recovery?.steps) && last.recovery.steps.length > 0);
});

test("a restored previous version that does not become ready is manual recovery, not rolled-back", async () => {
  const h = makeDeps({ probe: () => ({ status: "pending" }) });
  const outcome = await tx.runManagedUpdate(makePlan({ readinessTimeoutMs: 1_000 }), h.deps);
  assert.equal(outcome.status, "manual-recovery");
  assert.equal(h.calls.discard, 0);
  assert.equal(h.calls.restorePrevious.length, 1);
});

test("the previous version coming back with the candidate's pid is not accepted either", async () => {
  const h = makeDeps({
    probe: (phase: string, exp: Expectation): Probe => ({
      status: "ready",
      pid: phase === "target" ? 4101 : 5200,
      version: exp.expectedVersion,
    }),
  });
  const outcome = await tx.runManagedUpdate(makePlan({ readinessTimeoutMs: 1_000 }), h.deps);
  assert.equal(outcome.status, "manual-recovery");
});

test("a candidate that cannot be stopped leaves the data alone and asks for manual recovery", async () => {
  const h = makeDeps({
    probe: (): Probe => ({ status: "pending" }),
    stopCandidate: { stopped: false, pids: [5200] },
  });
  const outcome = await tx.runManagedUpdate(makePlan({ readinessTimeoutMs: 1_000 }), h.deps);
  assert.equal(outcome.status, "manual-recovery");
  assert.equal(h.calls.restorePrevious.length, 0, "no restore over a live candidate");
  assert.equal(h.calls.discard, 0);
});

test("an old process that cannot be stopped aborts before any change", async () => {
  const h = makeDeps({ stopOld: { stopped: false, pids: [4100] } });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "manual-recovery");
  assert.equal(outcome.reason, "old-process-did-not-stop");
  assert.equal(h.events.includes("snapshot"), false);
  assert.equal(h.events.includes("install-target"), false);
});

test("a concurrent call is refused before anything runs", async () => {
  const h = makeDeps({ lockHeld: true });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "unsupported");
  assert.equal(outcome.reason, "update-in-progress");
  assert.deepEqual(h.events, ["lock"]);
});

test("an unsupported or refused pre-flight changes nothing and keeps the distinction", async () => {
  const unsupported = makeDeps({ prepare: { kind: "unsupported", reason: "not-global-install" } });
  const a = await tx.runManagedUpdate(makePlan(), unsupported.deps);
  assert.equal(a.status, "unsupported");
  assert.equal(a.reason, "not-global-install");
  assert.notEqual(a.refused, true);
  assert.equal(unsupported.events.includes("stop-old"), false);

  const refused = makeDeps({ prepare: { kind: "refused", reason: "insufficient-disk-space" } });
  const b = await tx.runManagedUpdate(makePlan(), refused.deps);
  assert.equal(b.status, "unsupported");
  assert.equal(b.refused, true);
  assert.equal(refused.events.includes("stop-old"), false);
  assert.equal(refused.calls.release, 1);
});

test("a plan with a non-exact version is refused before the lock", async () => {
  for (const targetVersion of ["latest", "^3.8.55", "3.8.55; rm -rf /", "", "3.8"]) {
    const h = makeDeps();
    const outcome = await tx.runManagedUpdate(makePlan({ targetVersion }), h.deps);
    assert.equal(outcome.status, "unsupported", targetVersion);
    assert.equal(outcome.reason, "invalid-plan");
    assert.deepEqual(h.events, []);
  }
  const bad = makeDeps();
  const outcome = await tx.runManagedUpdate(makePlan({ operationId: "../../etc" }), bad.deps);
  assert.equal(outcome.reason, "invalid-plan");
});

test("an unwritable durable record stops the operation before any change", async () => {
  const h = makeDeps();
  h.deps.record = async () => {
    throw new Error("EACCES");
  };
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "unsupported");
  assert.equal(outcome.reason, "state-unwritable");
  assert.equal(h.events.includes("stop-old"), false);
});

test("the durable state walks the phases and ends in a terminal status", async () => {
  const h = makeDeps();
  await tx.runManagedUpdate(makePlan(), h.deps);
  const phases = h.records.map((r) => r.phase);
  assert.deepEqual(
    [...new Set(phases)],
    ["preflight", "stopping", "snapshot", "installing", "starting", "verifying", "finished"]
  );
  assert.equal(h.records[0].status, "running");
  assert.equal(h.records.at(-1).status, "updated");
  for (const record of h.records) {
    assert.equal(record.operationId, OPERATION_ID);
    assert.equal(record.previousVersion, "3.8.54");
    assert.equal(record.targetVersion, "3.8.55");
  }
});

// ---------------------------------------------------------------------------------------
// Real helpers on temp directories only.
// ---------------------------------------------------------------------------------------

type SpawnOptionsLike = {
  detached?: boolean;
  shell?: unknown;
  stdio: unknown[];
  env: Record<string, string>;
};
type FakeCommand = {
  command: () => FakeCommand;
  description: () => FakeCommand;
  option: (flags: string, description?: string, defaultValue?: unknown) => FakeCommand;
  action: () => FakeCommand;
};

function tmp(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

test("state store: round-trips, rejects a path-like id, and never leaves a partial file", () => {
  const dataDir = tmp("omni-tx-state-");
  try {
    const store = tx.createStateStore(dataDir, OPERATION_ID);
    store.record({ operationId: OPERATION_ID, status: "running", phase: "stopping" });
    const read = tx.readManagedUpdateState(dataDir, OPERATION_ID);
    assert.equal(read.status, "running");
    assert.equal(read.phase, "stopping");
    assert.equal(tx.readManagedUpdateState(dataDir, "0b8f3c1e-2d4a-4f6b-9c7d-ffffffffffff"), null);
    assert.equal(tx.readManagedUpdateState(dataDir, "../../etc/passwd"), null);
    assert.throws(() => tx.createStateStore(dataDir, "../escape"), /operation id/i);
    const leftovers = fs
      .readdirSync(path.join(dataDir, "managed-update", OPERATION_ID))
      .filter((f) => f.endsWith(".tmp"));
    assert.deepEqual(leftovers, []);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("lock: a second holder is refused, a dead holder's lock is reclaimed, release frees it", async () => {
  const dataDir = tmp("omni-tx-lock-");
  try {
    const first = await tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive: () => true });
    await assert.rejects(
      tx.acquireFileLock(dataDir, "11111111-2222-4333-8444-555555555555", {
        isPidAlive: () => true,
      }),
      (err: { code?: string }) => err.code === "update-in-progress"
    );
    await first.release();
    const second = await tx.acquireFileLock(dataDir, "11111111-2222-4333-8444-555555555555", {
      isPidAlive: () => true,
    });
    // Holder died without releasing.
    const reclaimed = await tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive: () => false });
    await reclaimed.release();
    await second.release().catch(() => {});
    assert.equal(fs.existsSync(path.join(dataDir, "managed-update", "lock")), false);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("data snapshot and restore: the candidate's data is moved aside, never deleted", () => {
  const dataDir = tmp("omni-tx-data-");
  try {
    fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "ORIGINAL-DB");
    fs.writeFileSync(path.join(dataDir, "storage.sqlite-wal"), "ORIGINAL-WAL");
    fs.mkdirSync(path.join(dataDir, "server"));
    fs.writeFileSync(path.join(dataDir, "server", "state.json"), "{}");
    const opDir = tx.operationDir(dataDir, OPERATION_ID);
    fs.mkdirSync(opDir, { recursive: true });

    const snap = tx.snapshotDataDir(dataDir, opDir);
    assert.equal(fs.readFileSync(path.join(snap.path, "storage.sqlite"), "utf8"), "ORIGINAL-DB");
    assert.ok(!fs.existsSync(path.join(snap.path, "managed-update")), "must not copy itself");

    // The candidate migrates the database and adds a file.
    fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "MIGRATED-DB");
    fs.writeFileSync(path.join(dataDir, "new-file"), "x");

    tx.restoreDataDir(dataDir, snap.path, opDir);
    assert.equal(fs.readFileSync(path.join(dataDir, "storage.sqlite"), "utf8"), "ORIGINAL-DB");
    assert.equal(fs.readFileSync(path.join(dataDir, "storage.sqlite-wal"), "utf8"), "ORIGINAL-WAL");
    assert.equal(fs.existsSync(path.join(dataDir, "new-file")), false);
    // Candidate data is preserved for diagnosis.
    const kept = path.join(opDir, "candidate-data");
    assert.equal(fs.readFileSync(path.join(kept, "storage.sqlite"), "utf8"), "MIGRATED-DB");
    assert.equal(fs.readFileSync(path.join(kept, "new-file"), "utf8"), "x");
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("package snapshot and restore: the replaced tree is moved aside next to it", () => {
  const root = tmp("omni-tx-pkg-");
  try {
    const pkgRoot = path.join(root, "lib", "node_modules", "omniroute");
    fs.mkdirSync(path.join(pkgRoot, "bin"), { recursive: true });
    fs.writeFileSync(path.join(pkgRoot, "package.json"), JSON.stringify({ version: "3.8.54" }));
    fs.writeFileSync(path.join(pkgRoot, "bin", "omniroute.mjs"), "#!/usr/bin/env node\n", {
      mode: 0o755,
    });
    const opDir = path.join(root, "op");
    fs.mkdirSync(opDir);

    const copy = tx.snapshotPackage(pkgRoot, opDir);
    // npm replaces the tree.
    fs.rmSync(pkgRoot, { recursive: true });
    fs.mkdirSync(pkgRoot);
    fs.writeFileSync(path.join(pkgRoot, "package.json"), JSON.stringify({ version: "3.8.55" }));

    const result = tx.restorePackage(pkgRoot, copy, OPERATION_ID, "3.8.54");
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8")).version,
      "3.8.54"
    );
    assert.equal(
      (fs.statSync(path.join(pkgRoot, "bin", "omniroute.mjs")).mode & 0o111) !== 0,
      true,
      "executable bit survives"
    );
    assert.ok(result.failedTreePath.startsWith(`${pkgRoot}.failed-`));
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(result.failedTreePath, "package.json"), "utf8")).version,
      "3.8.55"
    );
    // A restored tree that does not report the previous version is an error.
    assert.throws(() => tx.restorePackage(pkgRoot, copy, OPERATION_ID, "9.9.9"), /version/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------------------
// Pre-flight.
// ---------------------------------------------------------------------------------------

function makePreflightContext(overrides: Record<string, unknown> = {}) {
  const base = {
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
  return base;
}

test("pre-flight accepts a global npm install on Linux under the CLI-managed service", async () => {
  const result = await tx.preflightManagedUpdate(makePreflightContext(), makePlan());
  assert.equal(result.kind, "ok");
  assert.equal(result.runtime.port, 20128);
  assert.equal(result.runtime.shape, "daemon");
  assert.equal(result.runtime.dataDir, "/data/omniroute");
  assert.equal(result.runtime.packageRoot, "/usr/lib/node_modules/omniroute");
  assert.deepEqual(result.runtime.oldPids, [4100]);
  // The captured environment is handed back for the coordinator process, not persisted.
  assert.equal(result.environment.HOME, "/home/x");
});

test("pre-flight leaves every other environment on today's flow (unsupported)", async () => {
  const cases: Array<[string, Record<string, unknown>]> = [
    ["unsupported-platform", { platform: "win32" }],
    ["container", { isContainer: () => true }],
    ["electron", { isElectron: () => true }],
    ["not-global-install", { globalRoot: async () => "/somewhere/else" }],
    ["not-global-install", { globalRoot: async () => null }],
    ["no-managed-service", { service: async () => null }],
    [
      "data-dir-mismatch",
      {
        service: async () => ({
          shape: "daemon",
          serverPid: 1,
          supervisorPid: null,
          environment: { DATA_DIR: "/other", PORT: "20128" },
        }),
      },
    ],
    [
      "environment-unreadable",
      {
        service: async () => ({
          shape: "daemon",
          serverPid: 1,
          supervisorPid: null,
          environment: null,
        }),
      },
    ],
    [
      "port-unknown",
      {
        service: async () => ({
          shape: "daemon",
          serverPid: 1,
          supervisorPid: null,
          environment: { DATA_DIR: "/data/omniroute" },
        }),
      },
    ],
    [
      "tls-not-supported",
      {
        service: async () => ({
          shape: "daemon",
          serverPid: 1,
          supervisorPid: null,
          environment: { DATA_DIR: "/data/omniroute", PORT: "20128", OMNIROUTE_TLS_CERT: "/c.pem" },
        }),
      },
    ],
    [
      "supervisor-managed",
      {
        service: async () => ({
          shape: "supervisor",
          serverPid: 1,
          supervisorPid: 2,
          environment: { DATA_DIR: "/data/omniroute", PORT: "20128" },
        }),
      },
    ],
    [
      "other-supervisor",
      {
        service: async () => ({
          shape: "other",
          serverPid: 1,
          supervisorPid: null,
          environment: { DATA_DIR: "/data/omniroute", PORT: "20128" },
        }),
      },
    ],
    [
      "host-not-loopback-reachable",
      {
        service: async () => ({
          shape: "daemon",
          serverPid: 1,
          supervisorPid: null,
          environment: {
            DATA_DIR: "/data/omniroute",
            PORT: "20128",
            OMNIROUTE_SERVER_HOST: "10.0.0.5",
          },
        }),
      },
    ],
    ["version-mismatch", { installedVersion: () => "3.0.0" }],
  ];
  for (const [reason, overrides] of cases) {
    const result = await tx.preflightManagedUpdate(makePreflightContext(overrides), makePlan());
    assert.equal(result.kind, "unsupported", reason);
    assert.equal(result.reason, reason);
  }
});

test("pre-flight refuses (not falls back) when recovery cannot be guaranteed", async () => {
  const noDisk = await tx.preflightManagedUpdate(
    makePreflightContext({ diskHeadroom: async () => ({ ok: false }) }),
    makePlan()
  );
  assert.equal(noDisk.kind, "refused");
  assert.equal(noDisk.reason, "insufficient-disk-space");

  const locked = await tx.preflightManagedUpdate(
    makePreflightContext({ lockHeld: () => true }),
    makePlan()
  );
  assert.equal(locked.kind, "refused");
  assert.equal(locked.reason, "update-in-progress");
});

test("process identity: only a command line that names the install counts, and /proc errors are unknown", () => {
  const cmd = (...argv: string[]) => argv.join("\0") + "\0";
  const ours = tx.classifyServerProcess(4100, "/usr/lib/node_modules/omniroute", {
    readFileSync: () => cmd("/usr/bin/node", "/usr/lib/node_modules/omniroute/dist/server.js"),
  });
  assert.equal(ours, "ours");
  const titled = tx.classifyServerProcess(4100, "/usr/lib/node_modules/omniroute", {
    readFileSync: () => cmd("omniroute (v3.8.54)"),
  });
  assert.equal(titled, "ours");
  const foreign = tx.classifyServerProcess(4100, "/usr/lib/node_modules/omniroute", {
    readFileSync: () => cmd("/usr/bin/node", "/srv/other-app/server.js"),
  });
  assert.equal(foreign, "foreign");
  const unknown = tx.classifyServerProcess(4100, "/usr/lib/node_modules/omniroute", {
    readFileSync: () => {
      throw new Error("EACCES");
    },
  });
  assert.equal(unknown, "unknown");
});

test("service detection: a CLI daemon is proven, a systemd unit, pm2 or a supervisor is not", () => {
  const dataDir = tmp("omni-tx-detect-");
  try {
    fs.mkdirSync(path.join(dataDir, "server"));
    fs.writeFileSync(path.join(dataDir, "server", ".pid"), "4100");
    const pkg = "/usr/lib/node_modules/omniroute";
    const procfs =
      (cgroup: string, environ = "DATA_DIR=/d\0PORT=1\0") =>
      (file: string) => {
        if (file.endsWith("/cmdline")) return `/usr/bin/node\0${pkg}/dist/server.js\0`;
        if (file.endsWith("/environ")) return environ;
        if (file.endsWith("/cgroup")) return cgroup;
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      };
    const alive = () => true;

    const daemon = tx.detectManagedService(dataDir, pkg, {
      isPidAlive: alive,
      readFileSync: procfs("0::/user.slice/user-1000.slice/session-3.scope\n"),
    });
    assert.equal(daemon.shape, "daemon");
    assert.equal(daemon.serverPid, 4100);
    assert.equal(daemon.environment.PORT, "1");

    // The per-user systemd manager is not a service of the app: a daemon started from a
    // terminal sits below it.
    const userSession = tx.detectManagedService(dataDir, pkg, {
      isPidAlive: alive,
      readFileSync: procfs(
        "0::/user.slice/user-1000.slice/user@1000.service/app.slice/app-gnome-terminal-1.scope\n"
      ),
    });
    assert.equal(userSession.shape, "daemon");

    const nestedUnit = tx.detectManagedService(dataDir, pkg, {
      isPidAlive: alive,
      readFileSync: procfs("0::/system.slice/hosted-compute-agent.service/job-1\n"),
    });
    assert.equal(nestedUnit.shape, "other");

    const systemd = tx.detectManagedService(dataDir, pkg, {
      isPidAlive: alive,
      readFileSync: procfs("0::/system.slice/omniroute.service\n"),
    });
    assert.equal(systemd.shape, "other");

    const pm2 = tx.detectManagedService(dataDir, pkg, {
      isPidAlive: alive,
      readFileSync: procfs("0::/user.slice/session-3.scope\n", "PM2_HOME=/x\0DATA_DIR=/d\0"),
    });
    assert.equal(pm2.shape, "other");

    fs.mkdirSync(path.join(dataDir, "supervisor"));
    fs.writeFileSync(path.join(dataDir, "supervisor", ".pid"), "4099");
    const supervised = tx.detectManagedService(dataDir, pkg, {
      isPidAlive: alive,
      readFileSync: procfs("0::/user.slice/session-3.scope\n"),
    });
    assert.equal(supervised.shape, "supervisor");

    // A dead pid file, or a live pid that is not this install, is no service at all.
    assert.equal(
      tx.detectManagedService(dataDir, pkg, { isPidAlive: () => false, readFileSync: procfs("") }),
      null
    );
    assert.equal(
      tx.detectManagedService(dataDir, "/somewhere/else/omniroute", {
        isPidAlive: alive,
        readFileSync: procfs(""),
      }),
      null
    );
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("disk headroom counts the snapshot, the package copy and the restore on the right devices", async () => {
  const sizes: Record<string, number> = { "/data": 10, "/lib/omniroute": 4 };
  const call = (free: Record<string, number>, devices: Record<string, number>) =>
    tx.checkDiskHeadroom(
      { dataDir: "/data", packageRoot: "/lib/omniroute" },
      {
        sizeOf: async (target: string) => sizes[target] * 1024 * 1024,
        freeBytes: (target: string) => free[target] * 1024 * 1024,
        deviceOf: (target: string) => devices[target],
      }
    );
  // Different devices: data needs 2*10+4+256 MB, the package side 2*4+256 MB.
  assert.deepEqual(await call({ "/data": 281, "/lib": 265 }, { "/data": 1, "/lib": 2 }), {
    ok: true,
  });
  assert.deepEqual(await call({ "/data": 279, "/lib": 265 }, { "/data": 1, "/lib": 2 }), {
    ok: false,
  });
  assert.deepEqual(await call({ "/data": 281, "/lib": 263 }, { "/data": 1, "/lib": 2 }), {
    ok: false,
  });
  // One device: both needs add up (280 + 264).
  assert.deepEqual(await call({ "/data": 543, "/lib": 543 }, { "/data": 1, "/lib": 1 }), {
    ok: false,
  });
  assert.deepEqual(await call({ "/data": 544, "/lib": 544 }, { "/data": 1, "/lib": 1 }), {
    ok: true,
  });
});

test("environment capture parses /proc/<pid>/environ and returns null when unreadable", () => {
  const env = tx.readProcessEnvironment(42, {
    readFileSync: () => "A=1\0B=two=2\0\0C=\0",
  });
  assert.deepEqual(env, { A: "1", B: "two=2", C: "" });
  assert.equal(
    tx.readProcessEnvironment(42, {
      readFileSync: () => {
        throw new Error("EACCES");
      },
    }),
    null
  );
});

// ---------------------------------------------------------------------------------------
// Launching the coordinator (detached, outside the replaced tree).
// ---------------------------------------------------------------------------------------

test("launch copies the coordinator out of the package tree and spawns it detached with an argv array", async () => {
  const dataDir = tmp("omni-tx-launch-");
  const spawned: Array<{ cmd: string; args: string[]; options: SpawnOptionsLike }> = [];
  try {
    const result = await tx.launchManagedUpdateCoordinator(
      {
        plan: makePlan(),
        runtime: {
          dataDir,
          packageRoot: "/usr/lib/node_modules/omniroute",
          shape: "daemon",
          port: 20128,
          oldPids: [4100],
          nodePath: "/usr/bin/node",
          npmPath: "npm",
        },
        environment: { SECRET_TOKEN: "do-not-persist", PATH: "/usr/bin" },
      },
      {
        spawn: (cmd: string, args: string[], options: SpawnOptionsLike) => {
          spawned.push({ cmd, args, options });
          return { pid: 777, unref() {} };
        },
      }
    );
    assert.equal(result.operationId, OPERATION_ID);
    assert.equal(spawned.length, 1);
    const { cmd, args, options } = spawned[0];
    assert.equal(cmd, "/usr/bin/node");
    assert.equal(options.detached, true);
    assert.equal(options.shell, undefined);
    assert.equal(options.stdio[0], "ignore");
    assert.equal(options.env.SECRET_TOKEN, "do-not-persist");
    const script = args[0];
    assert.ok(script.startsWith(path.join(dataDir, "managed-update", OPERATION_ID)));
    assert.ok(fs.existsSync(script), "coordinator copy exists outside the package tree");
    assert.deepEqual(args.slice(1, 2), ["--managed-update-coordinator"]);
    const planFile = args[2];
    const persisted = fs.readFileSync(planFile, "utf8");
    assert.ok(!persisted.includes("do-not-persist"), "captured environment is never written");
    assert.equal(JSON.parse(persisted).plan.targetVersion, "3.8.55");
    // The copied coordinator must be self-contained: node: builtins only.
    const source = fs.readFileSync(script, "utf8");
    const imports = [...source.matchAll(/^import .* from ["']([^"']+)["']/gm)].map((m) => m[1]);
    assert.ok(imports.length > 0);
    for (const spec of imports) assert.ok(spec.startsWith("node:"), `non-builtin import ${spec}`);
    // The initial durable state is readable immediately, before the coordinator wakes up.
    assert.equal(tx.readManagedUpdateState(dataDir, OPERATION_ID).status, "running");
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------------------
// CLI wiring.
// ---------------------------------------------------------------------------------------

function captureConsole() {
  const lines: string[] = [];
  const orig = { log: console.log, error: console.error, warn: console.warn };
  const push = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.log = push;
  console.error = push;
  console.warn = push;
  return {
    lines,
    restore() {
      Object.assign(console, orig);
    },
  };
}

test("update.mjs registers --rollback-on-failure, default off", () => {
  const options: Array<{ flags: string; defaultValue?: unknown }> = [];
  const fakeCommand: FakeCommand = {
    command: () => fakeCommand,
    description: () => fakeCommand,
    option: (flags: string, _d?: string, def?: unknown) => {
      options.push({ flags, defaultValue: def });
      return fakeCommand;
    },
    action: () => fakeCommand,
  };
  update.registerUpdate({ command: () => fakeCommand });
  const flag = options.find((o) => o.flags.startsWith("--rollback-on-failure"));
  assert.ok(flag, "--rollback-on-failure must be registered");
  assert.equal(flag.defaultValue, undefined);
});

test("runManagedUpdateFromCli: unsupported environment keeps today's flow; refused stops; recovery reports honestly", async () => {
  const base = {
    current: "3.8.54",
    latest: "3.8.55",
    deps: {
      preflight: async () => ({ kind: "unsupported", reason: "container" }),
    },
  };
  const out = captureConsole();
  try {
    const fallback = await update.runManagedUpdateFromCli(base);
    assert.equal(fallback.handled, false);
    assert.match(out.lines.join("\n"), /container/);

    const refused = await update.runManagedUpdateFromCli({
      ...base,
      deps: { preflight: async () => ({ kind: "refused", reason: "insufficient-disk-space" }) },
    });
    assert.equal(refused.handled, true);
    assert.equal(refused.exitCode, 1);

    for (const [status, exitCode, pattern] of [
      ["updated", 0, /3\.8\.55/],
      ["rolled-back", 1, /rolled back|restored/i],
      ["manual-recovery", 1, /manual/i],
    ] as const) {
      out.lines.length = 0;
      const result = await update.runManagedUpdateFromCli({
        ...base,
        deps: {
          preflight: async () => ({ kind: "ok", runtime: {}, environment: {} }),
          launch: async () => ({ operationId: OPERATION_ID }),
          wait: async () => ({
            operationId: OPERATION_ID,
            status,
            phase: "finished",
            previousVersion: "3.8.54",
            targetVersion: "3.8.55",
            runningVersion:
              status === "manual-recovery" ? null : status === "updated" ? "3.8.55" : "3.8.54",
            snapshotPath:
              status === "manual-recovery" ? "/data/managed-update/x/data-snapshot" : undefined,
          }),
        },
      });
      assert.equal(result.handled, true, status);
      assert.equal(result.exitCode, exitCode, status);
      assert.match(out.lines.join("\n"), pattern, status);
    }
  } finally {
    out.restore();
  }
});

test("without the option, runUpdateCommand never touches the managed path", async () => {
  const fakeBin = tmp("omni-tx-fakebin-");
  fs.writeFileSync(
    path.join(fakeBin, "npm"),
    `#!/bin/sh\nif [ "$1" = "view" ]; then echo "0.0.1"; exit 0; fi\nexit 0\n`,
    { mode: 0o755 }
  );
  const origPath = process.env.PATH;
  process.env.PATH = fakeBin + path.delimiter + (origPath ?? "");
  const out = captureConsole();
  try {
    // 0.0.1 is older than the running package: "already up to date", no apply, no managed path.
    const code = await update.runUpdateCommand({ yes: true, backup: false });
    assert.equal(code, 0);
    assert.doesNotMatch(out.lines.join("\n"), /rollback|managed/i);
  } finally {
    out.restore();
    if (origPath === undefined) delete process.env.PATH;
    else process.env.PATH = origPath;
    fs.rmSync(fakeBin, { recursive: true, force: true });
  }
});
