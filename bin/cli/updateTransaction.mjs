// Managed update with automatic recovery for a global npm install on Linux, under the
// CLI-managed service (`omniroute serve --daemon`, pid file in DATA_DIR).
//
// SELF-CONTAINED ON PURPOSE: this file is copied out of the package tree before it runs as the
// coordinator, because the tree it lives in is replaced by `npm install -g` while it works. It
// may import `node:` builtins only; a test enforces that. Never import anything else here.
//
// Flow (`runManagedUpdate`): pre-flight, lock, stop the old service, snapshot the data and the
// installed package, install the exact target version, start it and wait for readiness. If
// the target cannot be proven ready, restore the previous package and data pair ONCE and
// prove the previous version ready again. A failed restoration keeps the snapshot and reports
// manual recovery. The 200 of an old process never confirms a swap: the probe must name a
// process that is not one of the stopped ones.
//
// Every side effect sits behind `ManagedUpdateDependencies`, so the orchestration is tested
// with fakes and never installs a package or signals a process.
//
// Scope: Linux, global npm install, daemon-shaped CLI service. Docker, Electron, Windows,
// source installs and other supervisors (systemd units, pm2, the foreground supervisor) are
// "unsupported" and keep the update flow they had before.

import { execFile, spawn } from "node:child_process";
import {
  closeSync,
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  statfsSync,
  lstatSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * @typedef {{
 *   operationId: string,
 *   previousVersion: string,
 *   targetVersion: string,
 *   readinessTimeoutMs: number,
 *   pollIntervalMs?: number,
 * }} ManagedUpdatePlan
 *
 * @typedef {"updated" | "rolled-back" | "manual-recovery" | "unsupported"} ManagedUpdateStatus
 *
 * @typedef {{
 *   operationId: string,
 *   status: ManagedUpdateStatus,
 *   runningVersion: string | null,
 *   reason?: string,
 *   refused?: boolean,
 *   persisted?: false,
 *   recovery?: { steps: string[] },
 * }} ManagedUpdateOutcome
 *
 * @typedef {{
 *   dataDir: string,
 *   packageRoot: string,
 *   shape: "daemon",
 *   port: number,
 *   oldPids: number[],
 *   nodePath: string,
 *   npmPath: string,
 * }} ManagedUpdateRuntime
 *
 * @typedef {{ id: string, path: string, packagePath?: string }} ManagedUpdateSnapshot
 *
 * @typedef {{
 *   now: () => number,
 *   sleep: (ms: number) => Promise<void>,
 *   record: (state: Record<string, unknown>) => Promise<void> | void,
 *   acquireLock: (plan: ManagedUpdatePlan) => Promise<{ release: () => Promise<void> | void }>,
 *   prepare: (plan: ManagedUpdatePlan) => Promise<{ kind: "ok" } | { kind: "unsupported" | "refused", reason: string }>,
 *   stopOld: (plan: ManagedUpdatePlan) => Promise<{ stopped: boolean, pids?: number[] }>,
 *   snapshot: (plan: ManagedUpdatePlan) => Promise<ManagedUpdateSnapshot>,
 *   installTarget: (plan: ManagedUpdatePlan) => Promise<void>,
 *   start: (role: "target" | "previous") => Promise<{ pid?: number }>,
 *   probe: (expectation: { expectedVersion: string, excludePids: number[], role: string }) => Promise<{ status: "ready", pid: number, version: string } | { status: "pending" }>,
 *   stopCandidate: (plan: ManagedUpdatePlan) => Promise<{ stopped: boolean, pids?: number[] }>,
 *   restorePrevious: (snapshot: ManagedUpdateSnapshot | null, touched: { package: boolean, data: boolean }) => Promise<void>,
 *   discardSnapshot: (snapshot: ManagedUpdateSnapshot) => Promise<void> | void,
 * }} ManagedUpdateDependencies
 */

export const COORDINATOR_ARG = "--managed-update-coordinator";
const STATE_DIR_NAME = "managed-update";
const OPERATION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EXACT_VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const TERMINAL_STATUSES = new Set(["updated", "rolled-back", "manual-recovery", "unsupported"]);
const DEFAULT_POLL_MS = 1000;
// The terminal record is the only place a reader learns the verdict, so it gets a bounded
// retry (a full disk often frees up, or the partial temp file is gone by the next try).
const TERMINAL_WRITE_ATTEMPTS = 3;
const TERMINAL_WRITE_BACKOFF_MS = 250;

export function isExactVersion(value) {
  return typeof value === "string" && value.length <= 64 && EXACT_VERSION_PATTERN.test(value);
}

export function isOperationId(value) {
  return typeof value === "string" && OPERATION_ID_PATTERN.test(value);
}

export function isTerminalStatus(status) {
  return TERMINAL_STATUSES.has(status);
}

function validatePlan(plan) {
  if (!plan || typeof plan !== "object") return "plan";
  if (!isOperationId(plan.operationId)) return "operationId";
  if (!isExactVersion(plan.previousVersion)) return "previousVersion";
  if (!isExactVersion(plan.targetVersion)) return "targetVersion";
  const timeout = plan.readinessTimeoutMs;
  if (!Number.isInteger(timeout) || timeout < 1 || timeout > 3_600_000) return "readinessTimeoutMs";
  if (plan.pollIntervalMs !== undefined) {
    if (!Number.isInteger(plan.pollIntervalMs) || plan.pollIntervalMs < 1) return "pollIntervalMs";
  }
  return null;
}

// ---------------------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------------------

function recoverySteps({ previousVersion, snapshot, port }) {
  const steps = [
    "Stop OmniRoute: `omniroute stop`.",
    snapshot?.path
      ? `Your data from before the update is preserved at ${snapshot.path}. Move the current DATA_DIR contents aside (do not delete them), then copy that snapshot back into DATA_DIR.`
      : "No data snapshot was taken, so the data was not changed by this update.",
    snapshot?.packagePath
      ? `A copy of the previous package is preserved at ${snapshot.packagePath}.`
      : null,
    `Reinstall the previous version if needed: \`npm install -g omniroute@${previousVersion}\`.`,
    `Start OmniRoute again: \`omniroute serve --daemon${port ? ` --port ${port}` : ""}\`.`,
  ];
  return { steps: steps.filter(Boolean) };
}

async function persistTerminalRecord(deps, state) {
  for (let attempt = 1; attempt <= TERMINAL_WRITE_ATTEMPTS; attempt += 1) {
    try {
      await deps.record({ ...state, updatedAt: new Date().toISOString() });
      return true;
    } catch {
      if (attempt < TERMINAL_WRITE_ATTEMPTS) {
        await deps.sleep(TERMINAL_WRITE_BACKOFF_MS * attempt);
      }
    }
  }
  return false;
}

/**
 * @param {ManagedUpdatePlan} plan
 * @param {ManagedUpdateDependencies} deps
 * @returns {Promise<ManagedUpdateOutcome>}
 */
export async function runManagedUpdate(plan, deps) {
  const operationId = isOperationId(plan?.operationId) ? plan.operationId : "invalid";
  if (validatePlan(plan) !== null) {
    return { operationId, status: "unsupported", runningVersion: null, reason: "invalid-plan" };
  }
  const pollMs = plan.pollIntervalMs ?? DEFAULT_POLL_MS;
  const state = {
    operationId,
    status: "running",
    phase: "preflight",
    previousVersion: plan.previousVersion,
    targetVersion: plan.targetVersion,
    runningVersion: null,
    startedAt: new Date().toISOString(),
  };

  // The first durable record is strict: with no way to report, nothing may change.
  try {
    await deps.record({ ...state, updatedAt: new Date().toISOString() });
  } catch {
    return {
      operationId,
      status: "unsupported",
      runningVersion: null,
      reason: "state-unwritable",
    };
  }

  // Interim records are best effort: a full disk must not turn a recoverable failure into a
  // second one. The terminal record is not (see `finish`).
  const update = async (patch) => {
    Object.assign(state, patch);
    try {
      await deps.record({ ...state, updatedAt: new Date().toISOString() });
    } catch {
      // ignored on purpose, see above
    }
  };

  // The terminal record is retried within a bound. If it still cannot be written, the outcome
  // says so (`persisted: false`) and the coordinator reports it: the last durable record is
  // then an interim one and no reader can see this verdict. Snapshots are discarded before this
  // write on purpose, and only after the target or the previous install is proven ready: that
  // frees disk for the write and loses no recovery data.
  const finish = async (status, runningVersion, reason, extra = {}) => {
    Object.assign(state, {
      status,
      phase: "finished",
      runningVersion,
      reason: reason ?? undefined,
      ...extra,
    });
    const persisted = await persistTerminalRecord(deps, state);
    /** @type {ManagedUpdateOutcome} */
    const outcome = { operationId, status, runningVersion };
    if (reason) outcome.reason = reason;
    if (extra.refused) outcome.refused = true;
    if (!persisted) {
      outcome.persisted = false;
      if (extra.recovery) outcome.recovery = extra.recovery;
    }
    return outcome;
  };

  let lock;
  try {
    lock = await deps.acquireLock(plan);
  } catch (err) {
    const reason = err?.code === "update-in-progress" ? "update-in-progress" : "lock-failed";
    return finish("unsupported", null, reason, { refused: true });
  }

  try {
    return await runLocked();
  } catch {
    // Reaching here means a dependency broke its own contract. The service state is unknown.
    return finish("manual-recovery", null, "unexpected-error", {
      recovery: recoverySteps({ previousVersion: plan.previousVersion, snapshot: null }),
    });
  } finally {
    try {
      await lock.release();
    } catch {
      // releasing a lock is best effort
    }
  }

  async function runLocked() {
    let pre;
    try {
      pre = await deps.prepare(plan);
    } catch {
      return finish("unsupported", null, "prepare-failed", { refused: true });
    }
    if (pre?.kind !== "ok") {
      return finish("unsupported", null, pre?.reason ?? "unsupported", {
        refused: pre?.kind === "refused",
      });
    }

    await update({ phase: "stopping" });
    let stop;
    try {
      stop = await deps.stopOld(plan);
    } catch {
      stop = { stopped: false, pids: [] };
    }
    if (!stop?.stopped) {
      return finish("manual-recovery", null, "old-process-did-not-stop", {
        recovery: recoverySteps({ previousVersion: plan.previousVersion, snapshot: null }),
      });
    }
    const stoppedPids = [...(stop.pids ?? [])];

    const touched = { package: false, data: false };
    /** @type {ManagedUpdateSnapshot | null} */
    let snapshot = null;
    let failure = null;

    await update({ phase: "snapshot" });
    try {
      snapshot = await deps.snapshot(plan);
      await update({
        snapshotPath: snapshot.path,
        previousPackagePath: snapshot.packagePath ?? undefined,
      });
    } catch {
      failure = "snapshot-failed";
    }

    if (!failure) {
      await update({ phase: "installing" });
      touched.package = true;
      try {
        await deps.installTarget(plan);
      } catch {
        failure = "install-failed";
      }
    }

    if (!failure) {
      await update({ phase: "starting" });
      // Starting the candidate is what lets it migrate the data.
      touched.data = true;
      try {
        await deps.start("target");
      } catch {
        failure = "start-failed";
      }
    }

    if (!failure) {
      await update({ phase: "verifying" });
      const ready = await waitReady(plan.targetVersion, stoppedPids, "target");
      if (ready.ok) {
        if (snapshot) await safeDiscard(snapshot);
        return finish("updated", plan.targetVersion, undefined);
      }
      failure = ready.staleSeen ? "old-process-still-answering" : "target-not-ready";
    }

    // ---- recovery: exactly once ------------------------------------------------------------
    await update({ phase: "restoring", reason: failure });
    const exclude = [...stoppedPids];
    const manual = (reason) =>
      finish("manual-recovery", null, reason, {
        recovery: recoverySteps({
          previousVersion: plan.previousVersion,
          snapshot,
          port: undefined,
        }),
      });

    if (touched.data) {
      let candidate;
      try {
        candidate = await deps.stopCandidate(plan);
      } catch {
        candidate = { stopped: false, pids: [] };
      }
      exclude.push(...(candidate?.pids ?? []));
      // Never restore data underneath a candidate that may still be writing it.
      if (!candidate?.stopped) return manual("candidate-did-not-stop");
    }

    if (touched.package || touched.data) {
      try {
        await deps.restorePrevious(snapshot, { package: touched.package, data: touched.data });
      } catch {
        return manual("restore-failed");
      }
    }

    try {
      await deps.start("previous");
    } catch {
      return manual("previous-start-failed");
    }
    const previousReady = await waitReady(plan.previousVersion, exclude, "previous");
    if (!previousReady.ok) return manual("previous-not-ready");

    if (snapshot) await safeDiscard(snapshot);
    return finish("rolled-back", plan.previousVersion, failure);
  }

  async function safeDiscard(snapshot) {
    try {
      await deps.discardSnapshot(snapshot);
    } catch {
      // A leftover snapshot is wasted disk, not a failed update.
    }
  }

  async function waitReady(expectedVersion, excludePids, role) {
    const deadline = deps.now() + plan.readinessTimeoutMs;
    let staleSeen = false;
    for (;;) {
      let result = null;
      try {
        result = await deps.probe({ expectedVersion, excludePids: [...excludePids], role });
      } catch {
        result = null;
      }
      if (result?.status === "ready") {
        if (excludePids.includes(result.pid)) staleSeen = true;
        else if (result.version === expectedVersion) return { ok: true, pid: result.pid };
      }
      const left = deadline - deps.now();
      if (left <= 0) return { ok: false, staleSeen };
      await deps.sleep(Math.max(1, Math.min(pollMs, left)));
    }
  }
}

// ---------------------------------------------------------------------------------------
// Durable state and lock (DATA_DIR/managed-update)
// ---------------------------------------------------------------------------------------

export function operationDir(dataDir, operationId) {
  if (!isOperationId(operationId)) throw new Error("Invalid operation id");
  return join(dataDir, STATE_DIR_NAME, operationId);
}

export function createStateStore(dataDir, operationId) {
  const dir = operationDir(dataDir, operationId);
  const file = join(dir, "state.json");
  return {
    dir,
    record(state) {
      mkdirSync(dir, { recursive: true, mode: 0o700 });
      const tmp = `${file}.${process.pid}.tmp`;
      try {
        writeFileSync(tmp, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
        renameSync(tmp, file);
      } catch (err) {
        // A half-written temp file would keep the disk full for the next attempt.
        try {
          rmSync(tmp, { force: true });
        } catch {
          // nothing more to do
        }
        throw err;
      }
    },
  };
}

export function readManagedUpdateState(dataDir, operationId) {
  if (!isOperationId(operationId)) return null;
  try {
    const parsed = JSON.parse(
      readFileSync(join(operationDir(dataDir, operationId), "state.json"), "utf8")
    );
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function defaultIsPidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err?.code === "EPERM";
  }
}

function lockPath(dataDir) {
  return join(dataDir, STATE_DIR_NAME, "lock");
}

function readLockHolder(dataDir) {
  try {
    return JSON.parse(readFileSync(lockPath(dataDir), "utf8"));
  } catch {
    return null;
  }
}

export function isLockHeld(dataDir, { isPidAlive = defaultIsPidAlive } = {}) {
  if (!existsSync(lockPath(dataDir))) return false;
  const holder = readLockHolder(dataDir);
  return Boolean(holder && isPidAlive(holder.pid));
}

export async function acquireFileLock(
  dataDir,
  operationId,
  { isPidAlive = defaultIsPidAlive } = {}
) {
  const file = lockPath(dataDir);
  mkdirSync(dirname(file), { recursive: true, mode: 0o700 });
  const body = JSON.stringify({ operationId, pid: process.pid, at: new Date().toISOString() });
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      writeFileSync(file, body, { flag: "wx", mode: 0o600 });
      return {
        async release() {
          const holder = readLockHolder(dataDir);
          if (holder?.operationId === operationId) {
            try {
              unlinkSync(file);
            } catch {
              // already gone
            }
          }
        },
      };
    } catch (err) {
      if (err?.code !== "EEXIST") throw err;
      const holder = readLockHolder(dataDir);
      if (holder && isPidAlive(holder.pid)) break;
      // A holder that died without releasing: reclaim once.
      try {
        unlinkSync(file);
      } catch {
        // someone else reclaimed it first; the next attempt decides
      }
    }
  }
  const error = new Error("Another managed update is running");
  error.code = "update-in-progress";
  throw error;
}

// ---------------------------------------------------------------------------------------
// Snapshots and restoration
// ---------------------------------------------------------------------------------------

function copyFilter(source) {
  try {
    const stats = lstatSync(source);
    // Sockets and FIFOs cannot be copied and carry no data worth restoring.
    return stats.isFile() || stats.isDirectory() || stats.isSymbolicLink();
  } catch {
    return false;
  }
}

const COPY_OPTIONS = {
  recursive: true,
  preserveTimestamps: true,
  verbatimSymlinks: true,
  filter: copyFilter,
};

function measureTree(root, skipTopLevel = new Set()) {
  let files = 0;
  let bytes = 0;
  const walk = (dir, top) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (top && skipTopLevel.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full, false);
      else if (entry.isFile()) {
        files += 1;
        bytes += lstatSync(full).size;
      }
    }
  };
  walk(root, true);
  return { files, bytes };
}

export function snapshotDataDir(dataDir, opDir) {
  const dest = join(opDir, "data-snapshot");
  if (existsSync(dest)) throw new Error("Data snapshot already exists");
  mkdirSync(dest, { recursive: true, mode: 0o700 });
  const skip = new Set([STATE_DIR_NAME]);
  for (const entry of readdirSync(dataDir)) {
    if (skip.has(entry)) continue;
    cpSync(join(dataDir, entry), join(dest, entry), COPY_OPTIONS);
  }
  const before = measureTree(dataDir, skip);
  const after = measureTree(dest);
  if (before.files !== after.files || before.bytes !== after.bytes) {
    throw new Error("Data snapshot does not match the source");
  }
  writeFileSync(join(opDir, "data-snapshot.json"), JSON.stringify(after), { mode: 0o600 });
  return { path: dest, ...after };
}

export function restoreDataDir(dataDir, snapshotPath, opDir) {
  const kept = join(opDir, "candidate-data");
  mkdirSync(kept, { recursive: true, mode: 0o700 });
  // Move aside, never delete: the candidate's data stays available for diagnosis.
  for (const entry of readdirSync(dataDir)) {
    if (entry === STATE_DIR_NAME) continue;
    renameSync(join(dataDir, entry), join(kept, entry));
  }
  for (const entry of readdirSync(snapshotPath)) {
    cpSync(join(snapshotPath, entry), join(dataDir, entry), COPY_OPTIONS);
  }
  const expected = measureTree(snapshotPath);
  const restored = measureTree(dataDir, new Set([STATE_DIR_NAME]));
  if (expected.files !== restored.files || expected.bytes !== restored.bytes) {
    throw new Error("Restored data does not match the snapshot");
  }
  return { candidateDataPath: kept };
}

export function snapshotPackage(packageRoot, opDir) {
  const dest = join(opDir, "previous-package");
  if (existsSync(dest)) throw new Error("Package copy already exists");
  cpSync(packageRoot, dest, COPY_OPTIONS);
  if (!existsSync(join(dest, "package.json"))) throw new Error("Package copy is incomplete");
  return dest;
}

export function restorePackage(packageRoot, copyPath, operationId, expectedVersion) {
  const base = `${packageRoot}.failed-${String(operationId).slice(0, 8)}`;
  let failedTreePath = base;
  for (let n = 1; existsSync(failedTreePath); n += 1) failedTreePath = `${base}-${n}`;
  // Same directory, so the rename is atomic and never crosses a filesystem.
  if (existsSync(packageRoot)) renameSync(packageRoot, failedTreePath);
  cpSync(copyPath, packageRoot, COPY_OPTIONS);
  const version = readPackageVersion(packageRoot);
  if (version !== expectedVersion) {
    throw new Error(`Restored package reports version ${version}, expected ${expectedVersion}`);
  }
  return { failedTreePath };
}

function readPackageVersion(packageRoot) {
  try {
    const version = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8")).version;
    return typeof version === "string" ? version : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------------------
// Process identity and environment (Linux /proc)
// ---------------------------------------------------------------------------------------

/**
 * @returns {"ours" | "foreign" | "unknown" | "gone"}
 */
export function classifyServerProcess(pid, packageRoot, deps = {}) {
  const read = deps.readFileSync ?? ((file) => readFileSync(file, "utf8"));
  let raw;
  try {
    raw = String(read(`/proc/${pid}/cmdline`));
  } catch (err) {
    return err?.code === "ENOENT" ? "gone" : "unknown";
  }
  const argv = raw.split("\0").filter(Boolean);
  if (argv.length === 0) return "unknown";
  // The first tokens carry the executable and the script. `process.title` rewrites argv in
  // place ("omniroute (v...)"), so the title counts as well.
  const isOurs = argv
    .slice(0, 4)
    .some((token) => token.includes(packageRoot) || /^omniroute(?:\s|$)/i.test(token));
  return isOurs ? "ours" : "foreign";
}

export function readProcessEnvironment(pid, deps = {}) {
  const read = deps.readFileSync ?? ((file) => readFileSync(file, "utf8"));
  try {
    const environment = {};
    for (const pair of String(read(`/proc/${pid}/environ`)).split("\0")) {
      const at = pair.indexOf("=");
      if (at <= 0) continue;
      environment[pair.slice(0, at)] = pair.slice(at + 1);
    }
    return environment;
  } catch {
    return null;
  }
}

function readServicePid(dataDir, service) {
  try {
    const pid = parseInt(readFileSync(join(dataDir, service, ".pid"), "utf8").trim(), 10);
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

// systemd's per-user manager is itself `user@<uid>.service`: every process a person starts
// from a terminal in a graphical or ssh session sits below it, and none of them is "a service".
const USER_MANAGER_UNIT = /^user@\d+\.service$/;

// True when a cgroup path has a systemd service unit of its own in it (`/system.slice/x.service`,
// `.../app.slice/x.service/sub`), not just the per-user manager or a session/app scope.
function cgroupNamesServiceUnit(cgroup) {
  return String(cgroup)
    .split("\n")
    .some((line) =>
      line
        .slice(line.lastIndexOf(":") + 1)
        .split("/")
        .some((segment) => segment.endsWith(".service") && !USER_MANAGER_UNIT.test(segment))
    );
}

function runsUnderServiceManager(pid, environment, read = (file) => readFileSync(file, "utf8")) {
  if (environment && (environment.PM2_HOME || environment.pm_id !== undefined)) return true;
  try {
    // A systemd service unit owns the process: it would restart the old version behind us.
    return cgroupNamesServiceUnit(read(`/proc/${pid}/cgroup`));
  } catch {
    return false;
  }
}

export function detectManagedService(dataDir, packageRoot, deps = {}) {
  const isAlive = deps.isPidAlive ?? defaultIsPidAlive;
  const serverPid = readServicePid(dataDir, "server");
  if (!serverPid || !isAlive(serverPid)) return null;
  if (classifyServerProcess(serverPid, packageRoot, deps) !== "ours") return null;
  const supervisorPid = readServicePid(dataDir, "supervisor");
  const supervised = Boolean(supervisorPid && isAlive(supervisorPid));
  const environment = readProcessEnvironment(serverPid, deps);
  let shape = "daemon";
  if (supervised) shape = "supervisor";
  else if (runsUnderServiceManager(serverPid, environment, deps.readFileSync)) shape = "other";
  return { shape, serverPid, supervisorPid: supervised ? supervisorPid : null, environment };
}

// ---------------------------------------------------------------------------------------
// Pre-flight
// ---------------------------------------------------------------------------------------

const LOOPBACK_HOSTS = new Set(["", "0.0.0.0", "::", "*", "127.0.0.1", "localhost", "::1"]);

/**
 * @param {Record<string, any>} ctx
 * @param {ManagedUpdatePlan} plan
 */
export async function preflightManagedUpdate(ctx, plan) {
  const unsupported = (reason) => ({ kind: "unsupported", reason });
  if (ctx.platform !== "linux") return unsupported("unsupported-platform");
  if (ctx.isContainer()) return unsupported("container");
  if (ctx.isElectron()) return unsupported("electron");
  // First, before anything that can say "unsupported": a running update has already stopped the
  // service (no pid file) and may be swapping the package under the version and global-root
  // checks below. Any "unsupported" answer would send the caller down the standard flow, which
  // installs outside the transaction while the coordinator is snapshotting or installing.
  if (ctx.lockHeld()) return { kind: "refused", reason: "update-in-progress" };

  let globalRoot = null;
  try {
    globalRoot = await ctx.globalRoot();
  } catch {
    globalRoot = null;
  }
  if (!globalRoot) return unsupported("not-global-install");
  const real = ctx.realpath ?? ((value) => value);
  if (real(join(globalRoot, "omniroute")) !== real(ctx.packageRoot)) {
    return unsupported("not-global-install");
  }
  if (ctx.installedVersion() !== plan.previousVersion) return unsupported("version-mismatch");

  const service = await ctx.service();
  if (!service) return unsupported("no-managed-service");
  if (service.shape === "supervisor") return unsupported("supervisor-managed");
  if (service.shape !== "daemon") return unsupported("other-supervisor");
  const environment = service.environment;
  if (!environment) return unsupported("environment-unreadable");

  if (environment.DATA_DIR && resolve(environment.DATA_DIR) !== resolve(ctx.dataDir)) {
    return unsupported("data-dir-mismatch");
  }
  if (environment.OMNIROUTE_TLS_CERT || environment.OMNIROUTE_TLS_KEY) {
    return unsupported("tls-not-supported");
  }
  if (!LOOPBACK_HOSTS.has(String(environment.OMNIROUTE_SERVER_HOST ?? "").trim())) {
    return unsupported("host-not-loopback-reachable");
  }
  const port = Number.parseInt(String(environment.DASHBOARD_PORT || environment.PORT || ""), 10);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) return unsupported("port-unknown");

  const disk = await ctx.diskHeadroom({ dataDir: ctx.dataDir, packageRoot: ctx.packageRoot });
  if (!disk?.ok) return { kind: "refused", reason: "insufficient-disk-space" };

  return {
    kind: "ok",
    runtime: {
      dataDir: ctx.dataDir,
      packageRoot: ctx.packageRoot,
      shape: "daemon",
      port,
      oldPids: [service.serverPid],
      nodePath: ctx.nodePath ?? process.execPath,
      npmPath: ctx.npmPath ?? "npm",
    },
    // Handed to the coordinator process through its own environment; never written to disk.
    environment,
  };
}

async function directorySizeBytes(target, exclude) {
  try {
    const args = ["-sk", ...(exclude ? [`--exclude=${exclude}`] : []), target];
    const { stdout } = await execFileAsync("du", args, { timeout: 120_000 });
    const kilobytes = Number.parseInt(String(stdout).split(/\s+/)[0], 10);
    if (Number.isFinite(kilobytes)) return kilobytes * 1024;
  } catch {
    // fall through to the walk
  }
  return measureTree(target, exclude ? new Set([exclude]) : new Set()).bytes;
}

export async function checkDiskHeadroom({ dataDir, packageRoot }, deps = {}) {
  const sizeOf = deps.sizeOf ?? directorySizeBytes;
  const freeOf =
    deps.freeBytes ??
    ((target) => {
      const stats = statfsSync(target);
      return stats.bavail * stats.bsize;
    });
  const deviceOf = deps.deviceOf ?? ((target) => statSync(target).dev);
  try {
    const dataBytes = await sizeOf(dataDir, STATE_DIR_NAME);
    const packageBytes = await sizeOf(packageRoot);
    const slack = 256 * 1024 * 1024;
    // Data side: the snapshot, the restore copy and the package copy. Package side: the new
    // install and the restore copy while the failed tree is still kept.
    const needs = new Map();
    const add = (target, bytes) => {
      const key = deviceOf(target);
      needs.set(key, { target, bytes: (needs.get(key)?.bytes ?? 0) + bytes });
    };
    add(dataDir, 2 * dataBytes + packageBytes + slack);
    add(dirname(packageRoot), 2 * packageBytes + slack);
    for (const { target, bytes } of needs.values()) {
      if (freeOf(target) < bytes) return { ok: false };
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

function runningInContainer(env = process.env) {
  if (existsSync("/.dockerenv") || env.container) return true;
  try {
    return /docker|kubepods|containerd|libpod/.test(readFileSync("/proc/1/cgroup", "utf8"));
  } catch {
    return false;
  }
}

export async function resolveGlobalNpmRoot() {
  const { stdout } = await execFileAsync("npm", ["root", "-g"], { timeout: 15_000 });
  return String(stdout).trim() || null;
}

/**
 * Real context for `preflightManagedUpdate`. `dataDir` and `packageRoot` come from the caller
 * (the CLI resolves them from its own files, the server from its configuration).
 */
export function createDefaultPreflightContext({
  dataDir,
  packageRoot,
  env = process.env,
  procDeps = {},
}) {
  return {
    platform: process.platform,
    isContainer: () => runningInContainer(env),
    isElectron: () => Boolean(process.versions.electron) || Boolean(env.ELECTRON_RUN_AS_NODE),
    packageRoot,
    globalRoot: resolveGlobalNpmRoot,
    realpath: (target) => {
      try {
        return realpathSync(target);
      } catch {
        return target;
      }
    },
    installedVersion: () => readPackageVersion(packageRoot),
    dataDir,
    service: async () => detectManagedService(dataDir, packageRoot, procDeps),
    lockHeld: () => isLockHeld(dataDir),
    diskHeadroom: (args) => checkDiskHeadroom(args),
    nodePath: process.execPath,
    npmPath: "npm",
  };
}

// ---------------------------------------------------------------------------------------
// Real dependencies
// ---------------------------------------------------------------------------------------

const sleepReal = (ms) => new Promise((done) => setTimeout(done, ms));

async function portIsFree(port) {
  const net = await import("node:net");
  return new Promise((done) => {
    const probe = net.createServer();
    probe.once("error", (err) => {
      probe.close();
      done(err.code !== "EADDRINUSE");
    });
    probe.listen({ port, host: "0.0.0.0" }, () => probe.close(() => done(true)));
  });
}

async function waitForExit(pids, timeoutMs, isAlive) {
  const deadline = Date.now() + timeoutMs;
  while (pids.some((pid) => isAlive(pid))) {
    if (Date.now() >= deadline) return false;
    await sleepReal(200);
  }
  return true;
}

/**
 * Stops OmniRoute processes by pid. A pid whose command line does not name this install is
 * never signalled (the pid may have been reused), and counts as "not stopped".
 */
async function stopProcesses(pids, packageRoot, { graceMs = 20_000, killMs = 5_000 } = {}) {
  const live = [...new Set(pids)].filter((pid) => defaultIsPidAlive(pid));
  for (const pid of live) {
    const identity = classifyServerProcess(pid, packageRoot);
    if (identity !== "ours" && identity !== "gone") return false;
  }
  for (const pid of live) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // gone already
    }
  }
  if (await waitForExit(live, graceMs, defaultIsPidAlive)) return true;
  for (const pid of live) {
    if (!defaultIsPidAlive(pid)) continue;
    if (classifyServerProcess(pid, packageRoot) !== "ours") continue;
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // gone already
    }
  }
  return waitForExit(live, killMs, defaultIsPidAlive);
}

function removePidFileIfOwnedBy(dataDir, service, pids) {
  const pid = readServicePid(dataDir, service);
  if (pid && pids.includes(pid)) {
    try {
      unlinkSync(join(dataDir, service, ".pid"));
    } catch {
      // already gone
    }
  }
}

function assertInside(root, candidate) {
  const base = resolve(root);
  const target = resolve(candidate);
  if (target !== base && !target.startsWith(`${base}/`)) {
    throw new Error("Refusing to touch a path outside the operation directory");
  }
}

/**
 * @param {{ plan: ManagedUpdatePlan, runtime: ManagedUpdateRuntime, environment: Record<string, string | undefined> }} input
 * @returns {ManagedUpdateDependencies}
 */
export function createDefaultDependencies({ plan, runtime, environment }) {
  const opDir = operationDir(runtime.dataDir, plan.operationId);
  const store = createStateStore(runtime.dataDir, plan.operationId);
  const probeUrl = `http://127.0.0.1:${runtime.port}/api/health/ping`;
  let lastStartedPid = null;

  const stopCurrentServices = async () => {
    const found = [
      readServicePid(runtime.dataDir, "server"),
      readServicePid(runtime.dataDir, "supervisor"),
    ];
    const pids = [
      ...new Set(
        [...found, lastStartedPid].filter(
          (pid) => Number.isInteger(pid) && !runtime.oldPids.includes(pid)
        )
      ),
    ];
    const stopped = await stopProcesses(pids, runtime.packageRoot);
    if (stopped) {
      removePidFileIfOwnedBy(runtime.dataDir, "server", pids);
      removePidFileIfOwnedBy(runtime.dataDir, "supervisor", pids);
    }
    return { stopped, pids };
  };

  return {
    now: () => Date.now(),
    sleep: sleepReal,
    record: (state) => store.record(state),
    acquireLock: (p) => acquireFileLock(runtime.dataDir, p.operationId),

    prepare: async (p) => {
      // The environment (platform, container, global install) was proven at launch and cannot
      // change under a running coordinator. What can change is the service and the disk.
      if (readPackageVersion(runtime.packageRoot) !== p.previousVersion) {
        return { kind: "refused", reason: "version-changed" };
      }
      // The supervisor shape was proven at launch; only the identity of the process can change.
      const service = detectManagedService(runtime.dataDir, runtime.packageRoot);
      if (!service || [service.serverPid].join(",") !== runtime.oldPids.join(",")) {
        return { kind: "refused", reason: "service-changed" };
      }
      const disk = await checkDiskHeadroom({
        dataDir: runtime.dataDir,
        packageRoot: runtime.packageRoot,
      });
      if (!disk.ok) return { kind: "refused", reason: "insufficient-disk-space" };
      try {
        await execFileAsync(runtime.npmPath, ["view", `omniroute@${p.targetVersion}`, "version"], {
          timeout: 60_000,
          env: environment,
        });
      } catch {
        return { kind: "refused", reason: "target-unavailable" };
      }
      return { kind: "ok" };
    },

    stopOld: async () => {
      const pids = [...runtime.oldPids];
      const stopped = await stopProcesses(pids, runtime.packageRoot);
      if (!stopped) return { stopped: false, pids };
      removePidFileIfOwnedBy(runtime.dataDir, "server", pids);
      removePidFileIfOwnedBy(runtime.dataDir, "supervisor", pids);
      for (let i = 0; i < 50 && !(await portIsFree(runtime.port)); i += 1) await sleepReal(200);
      return { stopped: await portIsFree(runtime.port), pids };
    },

    snapshot: async (p) => {
      const data = snapshotDataDir(runtime.dataDir, opDir);
      const packagePath = snapshotPackage(runtime.packageRoot, opDir);
      return { id: p.operationId, path: data.path, packagePath };
    },

    installTarget: async (p) => {
      // Exact, validated version; argv array, no shell.
      if (!isExactVersion(p.targetVersion)) throw new Error("Invalid target version");
      const logFile = join(opDir, "install.log");
      try {
        const { stdout, stderr } = await execFileAsync(
          runtime.npmPath,
          [
            "install",
            "-g",
            `omniroute@${p.targetVersion}`,
            "--include=optional",
            "--legacy-peer-deps",
          ],
          { timeout: 15 * 60_000, env: environment, maxBuffer: 32 * 1024 * 1024 }
        );
        writeFileSync(logFile, `${stdout}\n${stderr}`, { mode: 0o600 });
      } catch (err) {
        writeFileSync(
          logFile,
          `${err?.stdout ?? ""}\n${err?.stderr ?? ""}\n${err?.message ?? ""}`,
          {
            mode: 0o600,
          }
        );
        throw err;
      }
      const installed = readPackageVersion(runtime.packageRoot);
      if (installed !== p.targetVersion) {
        throw new Error(`Installed version is ${installed}, expected ${p.targetVersion}`);
      }
    },

    start: async (role) => {
      const logFd = openSync(join(opDir, `start-${role}.log`), "a", 0o600);
      try {
        const child = spawn(
          runtime.nodePath,
          [
            join(runtime.packageRoot, "bin", "omniroute.mjs"),
            "serve",
            "--daemon",
            "--port",
            String(runtime.port),
          ],
          {
            cwd: runtime.packageRoot,
            env: environment,
            detached: true,
            stdio: ["ignore", logFd, logFd],
          }
        );
        await new Promise((done, fail) => {
          child.once("error", fail);
          child.once("spawn", done);
        });
        child.unref();
        lastStartedPid = child.pid ?? null;
        return { pid: child.pid };
      } finally {
        closeSync(logFd);
      }
    },

    probe: async ({ expectedVersion, excludePids }) => {
      const pid = readServicePid(runtime.dataDir, "server");
      if (!pid || excludePids.includes(pid) || !defaultIsPidAlive(pid))
        return { status: "pending" };
      // Every old process is stopped and the port was free before the start, so a ping that
      // answers now belongs to the process the pid file names.
      const response = await fetch(probeUrl, { signal: AbortSignal.timeout(3_000) });
      if (response.status !== 200) return { status: "pending" };
      const body = await response.json().catch(() => null);
      if (body?.status !== "ok") return { status: "pending" };
      const version = readPackageVersion(runtime.packageRoot);
      if (version !== expectedVersion) return { status: "pending" };
      return { status: "ready", pid, version };
    },

    stopCandidate: () => stopCurrentServices(),

    restorePrevious: async (snapshot, touched) => {
      if (!snapshot) throw new Error("No snapshot to restore");
      if (touched.data) restoreDataDir(runtime.dataDir, snapshot.path, opDir);
      if (touched.package) {
        if (!snapshot.packagePath) throw new Error("No package copy to restore");
        restorePackage(
          runtime.packageRoot,
          snapshot.packagePath,
          plan.operationId,
          plan.previousVersion
        );
      }
    },

    discardSnapshot: (snapshot) => {
      for (const target of [snapshot.path, snapshot.packagePath]) {
        if (!target) continue;
        assertInside(opDir, target);
        rmSync(target, { recursive: true, force: true });
      }
    },
  };
}

// ---------------------------------------------------------------------------------------
// Launching and following the coordinator
// ---------------------------------------------------------------------------------------

/**
 * Starts the coordinator detached, from a copy of this file that lives outside the package
 * tree being replaced. The captured service environment goes to the process through `env`,
 * never to disk.
 */
export async function launchManagedUpdateCoordinator({ plan, runtime, environment }, deps = {}) {
  const invalid = validatePlan(plan);
  if (invalid) throw new Error(`Invalid managed update plan (${invalid})`);
  const spawnFn = deps.spawn ?? spawn;
  const opDir = operationDir(runtime.dataDir, plan.operationId);
  mkdirSync(opDir, { recursive: true, mode: 0o700 });

  const installedCopy = join(runtime.packageRoot, "bin", "cli", "updateTransaction.mjs");
  const source = existsSync(installedCopy) ? installedCopy : fileURLToPath(import.meta.url);
  const coordinatorPath = join(opDir, "coordinator.mjs");
  copyFileSync(source, coordinatorPath);

  const planFile = join(opDir, planFileName(plan.operationId));
  writeFileSync(planFile, `${JSON.stringify({ plan, runtime })}\n`, { mode: 0o600 });

  createStateStore(runtime.dataDir, plan.operationId).record({
    operationId: plan.operationId,
    status: "running",
    phase: "preflight",
    previousVersion: plan.previousVersion,
    targetVersion: plan.targetVersion,
    runningVersion: null,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const logFd = openSync(join(opDir, "coordinator.log"), "a", 0o600);
  try {
    const child = spawnFn(runtime.nodePath, [coordinatorPath, COORDINATOR_ARG, planFile], {
      cwd: opDir,
      env: environment,
      detached: true,
      stdio: ["ignore", logFd, logFd],
      windowsHide: true,
    });
    child.unref?.();
  } finally {
    closeSync(logFd);
  }
  return { operationId: plan.operationId };
}

/**
 * Polls the durable state until a terminal status or the deadline. Meant for the CLI, which
 * stays alive while the coordinator replaces the package under it.
 */
export async function waitForManagedUpdateOutcome(dataDir, operationId, options = {}) {
  const { timeoutMs = 20 * 60_000, pollMs = 1000, onPhase } = options;
  const sleep = options.sleep ?? sleepReal;
  const now = options.now ?? Date.now;
  const deadline = now() + timeoutMs;
  let lastPhase = null;
  let last = null;
  for (;;) {
    const state = readManagedUpdateState(dataDir, operationId);
    if (state) {
      last = state;
      if (state.phase !== lastPhase) {
        lastPhase = state.phase;
        onPhase?.(state);
      }
      if (isTerminalStatus(state.status)) return state;
    }
    if (now() >= deadline) return { ...(last ?? { operationId }), timedOut: true };
    await sleep(pollMs);
  }
}

const PLAN_FILE_PATTERN =
  /^plan-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\.json$/;
const MAX_PLAN_PATH_LENGTH = 4096;

/** The only file name the launcher writes the plan to, and the only one the coordinator reads. */
export function planFileName(operationId) {
  if (!isOperationId(operationId)) throw new Error("Invalid operation id");
  return `plan-${operationId}.json`;
}

/**
 * The plan file the coordinator may read, or null. The path comes from a command-line argument,
 * so it is accepted only when it is a regular file (never a link) with the launcher's own name
 * pattern, directly inside `expectedDir` (the operation directory the launcher created and the
 * coordinator copy lives in), and owned by the current user where the platform says so. The
 * returned path is rebuilt from the resolved directory and the validated name.
 */
export function resolveCoordinatorPlanPath(arg, expectedDir, deps = {}) {
  const realpath = deps.realpathSync ?? realpathSync;
  const lstat = deps.lstatSync ?? lstatSync;
  const uid = deps.getuid ? deps.getuid() : process.getuid?.();
  if (typeof arg !== "string" || arg.length === 0 || arg.length > MAX_PLAN_PATH_LENGTH) return null;
  if (arg.includes("\0") || typeof expectedDir !== "string" || expectedDir.length === 0)
    return null;
  try {
    const name = basename(arg);
    if (!PLAN_FILE_PATTERN.test(name)) return null;
    const realDir = realpath(expectedDir);
    const candidate = resolve(arg);
    if (realpath(dirname(candidate)) !== realDir) return null;
    const accepted = join(realDir, name);
    if (!accepted.startsWith(realDir.endsWith(sep) ? realDir : `${realDir}${sep}`)) return null;
    const stats = lstat(accepted);
    if (!stats.isFile() || stats.isSymbolicLink()) return null;
    if (uid !== undefined && stats.uid !== uid) return null;
    return accepted;
  } catch {
    return null;
  }
}

function describeUnpersistedOutcome(outcome) {
  const steps = outcome.recovery?.steps?.length
    ? ` Recovery: ${outcome.recovery.steps.join(" ")}`
    : "";
  return (
    `managed-update ${outcome.operationId}: finished as ${outcome.status}` +
    `${outcome.reason ? ` (${outcome.reason})` : ""}, but the final state could not be written` +
    ` to state.json; its last record is still "running".${steps}`
  );
}

/**
 * Returns the process exit code: 0 updated, 1 not updated, 2 refused input, 3 the verdict could
 * not be written to the state file (it is logged instead, to the coordinator log).
 */
export async function coordinatorMain(planArg, expectedDir, options = {}) {
  const planFile = resolveCoordinatorPlanPath(planArg, expectedDir);
  if (!planFile) return 2;
  let input;
  try {
    input = JSON.parse(readFileSync(planFile, "utf8"));
  } catch {
    return 2;
  }
  const { plan, runtime } = input ?? {};
  if (validatePlan(plan) || !runtime?.dataDir || !runtime?.packageRoot) return 2;
  const createDependencies = options.createDependencies ?? createDefaultDependencies;
  const log = options.log ?? ((line) => process.stderr.write(`${line}\n`));
  const deps = createDependencies({ plan, runtime, environment: { ...process.env } });
  const outcome = await runManagedUpdate(plan, deps);
  if (outcome.persisted === false) {
    log(describeUnpersistedOutcome(outcome));
    return 3;
  }
  return outcome.status === "updated" ? 0 : 1;
}

// Entry point of the detached copy: `node coordinator.mjs --managed-update-coordinator plan-<id>.json`.
// Matching the literal argument (not import.meta.url against argv[1]) keeps it working however
// the file was reached, symlinks included.
if (process.argv[2] === COORDINATOR_ARG && process.argv[3]) {
  coordinatorMain(process.argv[3], dirname(fileURLToPath(import.meta.url)))
    .then((code) => {
      process.exitCode = code;
    })
    .catch(() => {
      process.exitCode = 1;
    });
}
