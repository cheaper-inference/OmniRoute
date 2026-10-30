#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import {
  closeSync,
  chmodSync,
  constants,
  existsSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  renameSync,
  statfsSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import {
  captureOwner,
  classifyOwner,
  killVerifiedGroupMembers,
  listProcessGroupMembers,
  parseProcStartTicks,
  readBootId,
  signalExitCode,
  signalOwnedGroup,
} from "./resource-budget-process.mjs";

export { parseProcStartTicks } from "./resource-budget-process.mjs";
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const STATE_VERSION = 1;
const STATE_DIR_NAME = "omniroute-resource-budget";
const LEDGER_NAME = "leases-v1.json";
const LEDGER_LOCK_NAME = "omniroute-resource-budget.lock";
const COMPAT_LOCK_NAME = "omniroute-new-worktree.lock";
const LOCK_WAIT_SECONDS = 30;
const COMPAT_LOCK_WAIT_SECONDS = 600;
const EXIT_USAGE = 2;
const EXIT_DENIED = 75;
const EXIT_STATE = 78;

class CliError extends Error {
  constructor(message, exitCode = 1) {
    super(message);
    this.exitCode = exitCode;
  }
}

function usage() {
  return [
    "usage:",
    "  resource-budget.mjs reserve --common-dir DIR --reserve-bytes N --floor-bytes N --purpose LABEL --owner-pid PID [--json]",
    "  resource-budget.mjs status --common-dir DIR [--json]",
    "  resource-budget.mjs check --common-dir DIR --lease ID.TOKEN [--json]",
    "  resource-budget.mjs resize --common-dir DIR --lease ID.TOKEN --reserve-bytes N [--json]",
    "  resource-budget.mjs transfer-owner --common-dir DIR --lease ID.TOKEN --owner-pid PID [--json]",
    "  resource-budget.mjs release --common-dir DIR --lease ID.TOKEN [--json]",
    "  resource-budget.mjs reclaim-stale --common-dir DIR --lease-id ID [--json]",
    "  resource-budget.mjs run --common-dir DIR --reserve-bytes N --monitor-floor-bytes N --purpose LABEL [--poll-ms N] [--grace-ms N] -- COMMAND [ARG...]",
  ].join("\n");
}
const OPTION_NAMES = {
  reserve: "common-dir reserve-bytes floor-bytes purpose owner-pid json",
  status: "common-dir json",
  check: "common-dir lease json",
  resize: "common-dir lease reserve-bytes json",
  "transfer-owner": "common-dir lease owner-pid json",
  release: "common-dir lease json",
  "reclaim-stale": "common-dir lease-id json",
  run: "common-dir reserve-bytes monitor-floor-bytes purpose poll-ms grace-ms",
  "group-leader": "disconnect-grace-ms",
};
const OPTION_SETS = Object.fromEntries(
  Object.entries(OPTION_NAMES).map(([command, names]) => [command, new Set(names.split(" "))])
);

function parseOptions(argv, allowed) {
  const values = new Map();
  const flags = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) throw new CliError(`unexpected argument: ${arg}`, EXIT_USAGE);
    const name = arg.slice(2);
    if (!allowed.has(name)) throw new CliError(`unknown option: --${name}`, EXIT_USAGE);
    if (name === "json") {
      if (flags.has(name)) throw new CliError(`duplicate option: --${name}`, EXIT_USAGE);
      flags.add(name);
      continue;
    }
    if (values.has(name)) throw new CliError(`duplicate option: --${name}`, EXIT_USAGE);
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new CliError(`missing value for --${name}`, EXIT_USAGE);
    }
    values.set(name, value);
    index += 1;
  }
  return {
    flag(name) {
      return flags.has(name);
    },
    optional(name) {
      return values.get(name);
    },
    required(name) {
      const value = values.get(name);
      if (value === undefined) throw new CliError(`missing required option: --${name}`, EXIT_USAGE);
      return value;
    },
  };
}

function requireLinux() {
  if (process.platform !== "linux") {
    throw new CliError(
      `resource-budget is supported only on Linux (current platform: ${process.platform})`,
      EXIT_USAGE
    );
  }
  const probe = spawnSync("flock", ["--version"], { encoding: "utf8" });
  if (probe.error?.code === "ENOENT") {
    throw new CliError(
      "resource-budget requires util-linux flock; refusing to run unguarded",
      EXIT_USAGE
    );
  }
  if (probe.status !== 0) {
    throw new CliError(
      `resource-budget could not execute flock: ${probe.stderr.trim()}`,
      EXIT_USAGE
    );
  }
}

function parseUnsigned(value, name, { allowZero = true } = {}) {
  if (!/^(0|[1-9][0-9]*)$/.test(value)) {
    throw new CliError(`--${name} must be an unsigned decimal integer`, EXIT_USAGE);
  }
  const parsed = BigInt(value);
  if (!allowZero && parsed === 0n) {
    throw new CliError(`--${name} must be greater than zero`, EXIT_USAGE);
  }
  return parsed;
}

function parsePid(value) {
  const parsed = Number(value);
  if (!/^[1-9][0-9]*$/.test(value) || !Number.isSafeInteger(parsed)) {
    throw new CliError("--owner-pid must be a positive integer", EXIT_USAGE);
  }
  return parsed;
}

function resolveCommonDir(value) {
  let resolved;
  try {
    resolved = realpathSync(value);
  } catch (error) {
    throw new CliError(`cannot resolve --common-dir ${value}: ${error.message}`, EXIT_USAGE);
  }
  const metadata = lstatSync(resolved);
  if (!metadata.isDirectory()) throw new CliError(`--common-dir is not a directory: ${resolved}`);
  return resolved;
}

function pathsFor(commonDir) {
  const stateDir = join(commonDir, STATE_DIR_NAME);
  return {
    commonDir,
    stateDir,
    ledger: join(stateDir, LEDGER_NAME),
    ledgerLock: join(commonDir, LEDGER_LOCK_NAME),
    compatLock: join(commonDir, COMPAT_LOCK_NAME),
  };
}

function lstatIfPresent(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw new CliError(`cannot inspect protected path ${path}: ${error.message}`, EXIT_STATE);
  }
}

function assertNotSymlink(path, label) {
  const metadata = lstatIfPresent(path);
  if (!metadata) return;
  if (metadata.isSymbolicLink())
    throw new CliError(`${label} must not be a symlink: ${path}`, EXIT_STATE);
}

function openLockNoFollow(path, label) {
  assertNotSymlink(path, label);
  try {
    return openSync(path, constants.O_CREAT | constants.O_RDWR | constants.O_NOFOLLOW, 0o600);
  } catch (error) {
    throw new CliError(
      `cannot open ${label} without following links: ${error.message}`,
      EXIT_STATE
    );
  }
}

function prepareMutation(paths) {
  assertNotSymlink(paths.stateDir, "resource-budget state directory");
  assertNotSymlink(paths.ledgerLock, "resource-budget mutex");
  mkdirSync(paths.stateDir, { recursive: true, mode: 0o700 });
  chmodSync(paths.stateDir, 0o700);
  const metadata = lstatSync(paths.stateDir);
  if (!metadata.isDirectory()) {
    throw new CliError(
      `resource-budget state path is not a directory: ${paths.stateDir}`,
      EXIT_STATE
    );
  }
}

function emptyLedger() {
  return { version: STATE_VERSION, leases: [] };
}

function validateLedger(value) {
  if (!value || value.version !== STATE_VERSION || !Array.isArray(value.leases)) {
    throw new CliError("resource-budget ledger has an unsupported or corrupt schema", EXIT_STATE);
  }
  for (const lease of value.leases) {
    if (
      !lease ||
      typeof lease.id !== "string" ||
      typeof lease.tokenHash !== "string" ||
      typeof lease.purpose !== "string" ||
      !/^(0|[1-9][0-9]*)$/.test(lease.reservedBytes) ||
      !/^(0|[1-9][0-9]*)$/.test(lease.floorBytes) ||
      !lease.owner ||
      !Number.isSafeInteger(lease.owner.pid) ||
      typeof lease.owner.bootId !== "string" ||
      !/^[0-9]+$/.test(lease.owner.startTicks) ||
      (lease.processGroup !== undefined &&
        (!Number.isSafeInteger(lease.processGroup) || lease.processGroup < 1))
    ) {
      throw new CliError("resource-budget ledger contains a corrupt lease", EXIT_STATE);
    }
  }
  return value;
}

function readLedger(paths) {
  assertNotSymlink(paths.ledger, "resource-budget ledger");
  if (!lstatIfPresent(paths.ledger)) return emptyLedger();
  try {
    return validateLedger(JSON.parse(readFileSync(paths.ledger, "utf8")));
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError(`cannot read resource-budget ledger: ${error.message}`, EXIT_STATE);
  }
}

function writeLedger(paths, ledger) {
  const temporary = join(paths.stateDir, `.${LEDGER_NAME}.${process.pid}.${randomUUID()}.tmp`);
  let fd;
  try {
    fd = openSync(temporary, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY, 0o600);
    writeFileSync(fd, `${JSON.stringify(ledger, null, 2)}\n`, "utf8");
    fsyncSync(fd);
    closeSync(fd);
    fd = undefined;
    renameSync(temporary, paths.ledger);
    const dirFd = openSync(paths.stateDir, constants.O_RDONLY);
    try {
      fsyncSync(dirFd);
    } finally {
      closeSync(dirFd);
    }
  } catch (error) {
    if (fd !== undefined) closeSync(fd);
    if (existsSync(temporary)) unlinkSync(temporary);
    throw error;
  }
}

function availableBytes(commonDir) {
  const stats = statfsSync(commonDir, { bigint: true });
  return stats.bavail * stats.bsize;
}

function sumReserved(leases) {
  return leases.reduce((total, lease) => total + BigInt(lease.reservedBytes), 0n);
}

function highestFloor(leases, candidate = 0n) {
  return leases.reduce(
    (highest, lease) => (BigInt(lease.floorBytes) > highest ? BigInt(lease.floorBytes) : highest),
    candidate
  );
}

export function evaluateAdmission({ available, reserved, requested, floor }) {
  const remaining = available - reserved - requested;
  return { allowed: remaining >= floor, remaining };
}

function parseMilliseconds(value, name, fallback) {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!/^[1-9][0-9]*$/.test(value) || !Number.isSafeInteger(parsed) || parsed > 300_000) {
    throw new CliError(`--${name} must be an integer from 1 to 300000`, EXIT_USAGE);
  }
  return parsed;
}

export async function runMonitoredCommand({
  command,
  args = [],
  cwd = process.cwd(),
  monitorFloorBytes,
  pollMs = 2_000,
  graceMs = 10_000,
  stdio = "inherit",
  sampleAvailableBytes,
  abortSignal,
  beforeStart,
  compatLockPath,
}) {
  if (!command || !Array.isArray(args)) throw new TypeError("command and args are required");
  if (typeof monitorFloorBytes !== "bigint") {
    throw new TypeError("monitorFloorBytes must be a bigint");
  }
  if (typeof sampleAvailableBytes !== "function") {
    throw new TypeError("sampleAvailableBytes must be a function");
  }
  if (
    !Number.isSafeInteger(pollMs) ||
    pollMs < 1 ||
    !Number.isSafeInteger(graceMs) ||
    graceMs < 1
  ) {
    throw new TypeError("pollMs and graceMs must be positive safe integers");
  }
  const leaderStdio =
    stdio === "ignore"
      ? ["ignore", "ignore", "ignore", "ipc"]
      : ["inherit", "inherit", "inherit", "ipc"];
  const leaderNodeArgs = [
    SCRIPT_PATH,
    "__group-leader",
    "--disconnect-grace-ms",
    String(graceMs),
    "--",
    command,
    ...args,
  ];
  const compatLockFd = compatLockPath
    ? openLockNoFollow(compatLockPath, "new-worktree compatibility lock")
    : undefined;
  const leaderExecutable = compatLockPath ? "flock" : process.execPath;
  const leaderArgs = compatLockPath
    ? [
        "-s",
        "-w",
        String(LOCK_WAIT_SECONDS),
        "-F",
        "/proc/self/fd/4",
        process.execPath,
        ...leaderNodeArgs,
      ]
    : leaderNodeArgs;
  const leader = spawn(leaderExecutable, leaderArgs, {
    cwd,
    detached: true,
    stdio: compatLockFd === undefined ? leaderStdio : [...leaderStdio, compatLockFd],
  });
  if (compatLockFd !== undefined) closeSync(compatLockFd);
  if (!leader.pid) throw new CliError(`failed to start monitored command: ${command}`);
  const owner = captureOwner(leader.pid);
  let leaderClosed = false;
  let leaderCloseResult;
  const leaderClosedPromise = new Promise((resolve, reject) => {
    leader.once("error", reject);
    leader.once("exit", (code, signal) => {
      leaderClosed = true;
      leaderCloseResult = { code, signal };
      resolve(leaderCloseResult);
    });
  });
  let ready;
  let started;
  let commandExit;
  let shutdownRefusal;
  let resolveReady;
  let resolveStarted;
  let resolveCommandExit;
  let resolveShutdownRefusal;
  const readyPromise = new Promise((resolve) => (resolveReady = resolve));
  const startedPromise = new Promise((resolve) => (resolveStarted = resolve));
  const commandExitPromise = new Promise((resolve) => (resolveCommandExit = resolve));
  const shutdownRefusalPromise = new Promise((resolve) => (resolveShutdownRefusal = resolve));
  leader.on("message", (message) => {
    if (!message || typeof message !== "object") return;
    if (message.type === "ready" && !ready) {
      ready = message;
      resolveReady(message);
    }
    if (message.type === "started" && !started) {
      started = message;
      resolveStarted(message);
    }
    if (message.type === "command-exit" && !commandExit) {
      commandExit = message;
      resolveCommandExit(message);
    }
    if (message.type === "shutdown-refused" && !shutdownRefusal) {
      shutdownRefusal = message;
      resolveShutdownRefusal(message);
    }
  });
  await Promise.race([
    readyPromise,
    leaderClosedPromise.then(() => {
      throw new CliError("process-group leader exited before it became ready", EXIT_STATE);
    }),
  ]);
  try {
    if (beforeStart) await beforeStart(leader.pid);
    leader.send({ type: "start" });
    await Promise.race([
      startedPromise,
      leaderClosedPromise.then(() => {
        throw new CliError("process-group leader exited before starting the command", EXIT_STATE);
      }),
    ]);
  } catch (error) {
    if (!leaderClosed && leader.connected) leader.send({ type: "shutdown" });
    await leaderClosedPromise;
    throw error;
  }
  const groupMembersOtherThanLeader = () => {
    const snapshot = listProcessGroupMembers(leader.pid);
    return {
      ...snapshot,
      members: snapshot.members.filter((member) => member.pid !== leader.pid),
    };
  };
  const workloadEvidence = () => ({
    workloadStarted: Number.isSafeInteger(started?.commandPid) && started.commandPid > 0,
    workloadExitCode:
      commandExit?.code !== null && commandExit?.code !== undefined
        ? commandExit.code
        : commandExit?.signal
          ? signalExitCode(commandExit.signal)
          : null,
    workloadSignal: commandExit?.signal ?? null,
  });
  const attachWorkloadEvidence = (cause) => {
    const error =
      cause instanceof Error
        ? cause
        : new CliError(`monitored command failed: ${cause}`, EXIT_STATE);
    Object.assign(error, workloadEvidence());
    if (error.preserveLease && error.workloadStarted && !error.quiescence) {
      error.quiescence = "UNKNOWN";
    }
    return error;
  };
  const lostAnchorError = () => {
    const group = groupMembersOtherThanLeader();
    const error = new CliError(
      `process-group anchor ${leader.pid} exited before quiescence was proven`,
      EXIT_STATE
    );
    error.preserveLease = true;
    error.resourceReason = "anchor-lost";
    error.quiescence = "UNKNOWN";
    error.observedGroupMembers = group.members;
    return error;
  };
  const detachAnchorForHold = () => {
    try {
      if (leader.connected) leader.disconnect();
    } finally {
      leader.unref();
    }
  };
  const requestLeaderShutdown = async () => {
    if (leaderClosed) return;
    if (!leader.connected) {
      const error = new CliError(
        "process-group leader IPC disconnected before cleanup",
        EXIT_STATE
      );
      error.preserveLease = true;
      detachAnchorForHold();
      throw error;
    }
    try {
      leader.send({ type: "shutdown" });
    } catch (cause) {
      const error = new CliError(`could not request leader shutdown: ${cause.message}`, EXIT_STATE);
      error.preserveLease = true;
      detachAnchorForHold();
      throw error;
    }
    const confirmation = await Promise.race([
      leaderClosedPromise.then(() => ({ kind: "closed" })),
      shutdownRefusalPromise.then((refusal) => ({ kind: "refused", refusal })),
      delay(graceMs).then(() => ({ kind: "timeout" })),
    ]);
    if (confirmation.kind === "closed") return;
    const detail =
      confirmation.kind === "refused"
        ? `shutdown refused (remaining=${confirmation.refusal.remaining}, unknown=${confirmation.refusal.unknown})`
        : `shutdown confirmation timed out after ${graceMs}ms`;
    const error = new CliError(detail, EXIT_STATE);
    error.preserveLease = true;
    detachAnchorForHold();
    throw error;
  };
  const waitForOwnedGroupToDrain = async () => {
    const deadline = Date.now() + graceMs;
    while (Date.now() < deadline && !leaderClosed) {
      const snapshot = groupMembersOtherThanLeader();
      if (!snapshot.unknown && snapshot.members.length === 0) return true;
      await delay(Math.min(25, Math.max(1, deadline - Date.now())));
    }
    return false;
  };
  const terminateOwnedGroup = async (reason, signalName) => {
    try {
      if (!leaderClosed) signalOwnedGroup(leader.pid, owner, "SIGTERM");
      const drained = await waitForOwnedGroupToDrain();
      if (leaderClosed) throw lostAnchorError();
      if (!leaderClosed && !drained) {
        const killed = await killVerifiedGroupMembers(leader.pid, leader.pid, graceMs);
        if (!killed) {
          throw new CliError(
            `owned process group ${leader.pid} could not be proven empty`,
            EXIT_STATE
          );
        }
      }
      if (!leaderClosed) await requestLeaderShutdown();
      return { reason, signalName };
    } catch (cause) {
      const error =
        cause instanceof CliError
          ? cause
          : new CliError(`owned process-group cleanup failed: ${cause.message}`, EXIT_STATE);
      error.message = `${error.message}; preserving its anchor and lease`;
      error.preserveLease = true;
      detachAnchorForHold();
      throw error;
    }
  };
  let resolveAbort;
  const abortPromise = new Promise((resolve) => (resolveAbort = resolve));
  const abortListener = () =>
    resolveAbort({ kind: "abort", signalName: abortSignal.reason?.signal ?? "SIGTERM" });
  if (abortSignal) {
    if (abortSignal.aborted) abortListener();
    else abortSignal.addEventListener("abort", abortListener, { once: true });
  }
  let termination;
  try {
    while (!commandExit && !termination) {
      if (leaderClosed) throw lostAnchorError();
      const abortNow = abortSignal?.aborted
        ? { kind: "abort", signalName: abortSignal.reason?.signal ?? "SIGTERM" }
        : undefined;
      if (abortNow) {
        termination = await terminateOwnedGroup("aborted", abortNow.signalName);
        break;
      }
      let sample;
      try {
        sample = await sampleAvailableBytes();
      } catch (error) {
        process.stderr.write(`[resource-budget] capacity sampler failed: ${error.message}\n`);
        termination = await terminateOwnedGroup("monitor-error");
        break;
      }
      const available = typeof sample === "bigint" ? sample : sample?.availableBytes;
      const requiredFloor =
        typeof sample === "bigint" ? monitorFloorBytes : sample?.requiredFloorBytes;
      if (typeof available !== "bigint" || typeof requiredFloor !== "bigint") {
        process.stderr.write("[resource-budget] capacity sampler returned a non-bigint value\n");
        termination = await terminateOwnedGroup("monitor-error");
        break;
      }
      if (available < requiredFloor) {
        process.stderr.write(
          `[resource-budget] capacity floor crossed: available=${available} floor=${requiredFloor}; terminating owned process group ${leader.pid}\n`
        );
        termination = await terminateOwnedGroup("capacity-floor");
        break;
      }
      const event = await Promise.race([
        commandExitPromise.then((value) => ({ kind: "command-exit", value })),
        leaderClosedPromise.then((value) => ({ kind: "leader-closed", value })),
        abortPromise,
        delay(pollMs).then(() => ({ kind: "tick" })),
      ]);
      if (event.kind === "leader-closed" && !commandExit) throw lostAnchorError();
      if (event.kind === "abort") {
        termination = await terminateOwnedGroup("aborted", event.signalName);
        break;
      }
    }
    if (!termination && commandExit) {
      const remaining = groupMembersOtherThanLeader();
      if (!remaining.unknown && remaining.members.length === 0) await requestLeaderShutdown();
      else {
        process.stderr.write(
          `[resource-budget] direct command exited with ${remaining.members.length} owned descendant(s); cleaning the anchored process group before release\n`
        );
        await terminateOwnedGroup("descendant-cleanup");
      }
    }
  } catch (error) {
    throw attachWorkloadEvidence(error);
  } finally {
    if (abortSignal) abortSignal.removeEventListener("abort", abortListener);
  }
  if (termination?.reason === "capacity-floor" || termination?.reason === "monitor-error") {
    return {
      exitCode: EXIT_DENIED,
      reason: termination.reason,
      groupPid: leader.pid,
      quiescence: "PROVEN_EMPTY",
      ...workloadEvidence(),
    };
  }
  if (termination?.reason === "aborted") {
    return {
      exitCode: termination.signalName === "SIGINT" ? 130 : 143,
      reason: "aborted",
      groupPid: leader.pid,
      quiescence: "PROVEN_EMPTY",
      ...workloadEvidence(),
    };
  }
  if (!commandExit) {
    throw new CliError(
      `process-group leader exited without a command result (${leaderCloseResult?.signal ?? "unknown"})`,
      EXIT_STATE
    );
  }
  if (commandExit.code !== null) {
    return {
      exitCode: commandExit.code,
      reason: termination?.reason ?? "child-exit",
      groupPid: leader.pid,
      quiescence: "PROVEN_EMPTY",
      ...workloadEvidence(),
    };
  }
  return {
    exitCode: signalExitCode(commandExit.signal),
    reason: `child-signal-${commandExit.signal}`,
    groupPid: leader.pid,
    quiescence: "PROVEN_EMPTY",
    ...workloadEvidence(),
  };
}

function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

function parseHandle(handle) {
  const separator = handle.lastIndexOf(".");
  if (separator <= 0 || separator === handle.length - 1) {
    throw new CliError("--lease must be the opaque ID.TOKEN returned by reserve", EXIT_USAGE);
  }
  return { id: handle.slice(0, separator), token: handle.slice(separator + 1) };
}

function tokenMatches(lease, token) {
  const actual = Buffer.from(tokenHash(token), "hex");
  const expected = Buffer.from(lease.tokenHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function authenticatedLease(ledger, handle) {
  const { id, token } = parseHandle(handle);
  const index = ledger.leases.findIndex((lease) => lease.id === id);
  if (index === -1) throw new CliError(`lease not found: ${id}`, EXIT_STATE);
  const lease = ledger.leases[index];
  if (!tokenMatches(lease, token)) throw new CliError(`lease token rejected: ${id}`, EXIT_STATE);
  return { id, index, lease };
}

function requireLiveLease(lease) {
  const classification = classifyOwner(lease.owner);
  if (classification.identity !== "LIVE") {
    throw new CliError(
      `lease ${lease.id} is ${classification.identity} (${classification.reason}); preserved`,
      EXIT_STATE
    );
  }
  return classification;
}

function statusPayload(paths, ledger) {
  const sampledAt = new Date().toISOString();
  const available = availableBytes(paths.commonDir);
  const reserved = sumReserved(ledger.leases);
  let currentBootId;
  let bootError;
  try {
    currentBootId = readBootId();
  } catch (error) {
    bootError = error.message;
  }
  const leases = ledger.leases.map((lease) => {
    const classification = currentBootId
      ? classifyOwner(lease.owner, currentBootId)
      : { identity: "UNKNOWN", reason: bootError };
    const group = lease.processGroup ? listProcessGroupMembers(lease.processGroup) : undefined;
    const quiescence = !group
      ? undefined
      : classification.identity === "LIVE"
        ? "ANCHORED"
        : group.unknown
          ? "UNKNOWN"
          : group.members.length === 0
            ? "PROVEN_EMPTY"
            : "NOT_QUIESCENT";
    return {
      id: lease.id,
      purpose: lease.purpose,
      reservedBytes: lease.reservedBytes,
      floorBytes: lease.floorBytes,
      createdAt: lease.createdAt,
      ownerPid: lease.owner.pid,
      ownerBootId: lease.owner.bootId,
      ownerStartTicks: lease.owner.startTicks,
      ...classification,
      ...(group && {
        processGroup: lease.processGroup,
        quiescence,
        observedGroupMembers: group.members,
      }),
    };
  });
  return {
    version: STATE_VERSION,
    commonDir: paths.commonDir,
    sampledAt,
    availableBytes: available.toString(),
    reservedBytes: reserved.toString(),
    allocatableBytes: (available - reserved).toString(),
    leases,
  };
}

function printPayload(payload, json) {
  if (json) {
    process.stdout.write(`${JSON.stringify(payload)}\n`);
    return;
  }
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

function reserveLocked(options, paths) {
  const requested = parseUnsigned(options.required("reserve-bytes"), "reserve-bytes", {
    allowZero: false,
  });
  const floor = parseUnsigned(options.required("floor-bytes"), "floor-bytes");
  const purpose = options.required("purpose");
  if (!/^[A-Za-z0-9._:/-]{1,128}$/.test(purpose)) {
    throw new CliError("--purpose must be 1-128 safe label characters", EXIT_USAGE);
  }
  const ownerPid = parsePid(options.required("owner-pid"));
  const ledger = readLedger(paths);
  const available = availableBytes(paths.commonDir);
  const reserved = sumReserved(ledger.leases);
  const effectiveFloor = highestFloor(ledger.leases, floor);
  const admission = evaluateAdmission({ available, reserved, requested, floor: effectiveFloor });
  if (!admission.allowed) {
    throw new CliError(
      `capacity denied: available=${available} reserved=${reserved} requested=${requested} floor=${effectiveFloor}`,
      EXIT_DENIED
    );
  }
  const id = randomUUID();
  const token = randomBytes(32).toString("hex");
  const lease = {
    id,
    tokenHash: tokenHash(token),
    purpose,
    reservedBytes: requested.toString(),
    floorBytes: floor.toString(),
    createdAt: new Date().toISOString(),
    owner: captureOwner(ownerPid),
  };
  ledger.leases.push(lease);
  writeLedger(paths, ledger);
  printPayload(
    {
      lease: {
        id,
        handle: `${id}.${token}`,
        purpose,
        reservedBytes: lease.reservedBytes,
        floorBytes: lease.floorBytes,
      },
      remainingBytes: admission.remaining.toString(),
      effectiveFloorBytes: effectiveFloor.toString(),
    },
    options.flag("json")
  );
}

function releaseLocked(options, paths) {
  const ledger = readLedger(paths);
  const { id, index } = authenticatedLease(ledger, options.required("lease"));
  ledger.leases.splice(index, 1);
  writeLedger(paths, ledger);
  printPayload({ released: id }, options.flag("json"));
}

function checkLocked(options, paths) {
  const ledger = readLedger(paths);
  const { id, lease } = authenticatedLease(ledger, options.required("lease"));
  const classification = requireLiveLease(lease);
  const available = availableBytes(paths.commonDir);
  const reserved = sumReserved(ledger.leases);
  const floor = highestFloor(ledger.leases);
  const admission = evaluateAdmission({ available, reserved, requested: 0n, floor });
  if (!admission.allowed) {
    throw new CliError(
      `capacity check denied: available=${available} reserved=${reserved} floor=${floor}`,
      EXIT_DENIED
    );
  }
  printPayload(
    {
      checked: id,
      identity: classification.identity,
      reservedBytes: lease.reservedBytes,
      floorBytes: lease.floorBytes,
      remainingBytes: admission.remaining.toString(),
    },
    options.flag("json")
  );
}

function resizeLocked(options, paths) {
  const requested = parseUnsigned(options.required("reserve-bytes"), "reserve-bytes", {
    allowZero: false,
  });
  const ledger = readLedger(paths);
  const { id, lease } = authenticatedLease(ledger, options.required("lease"));
  requireLiveLease(lease);
  const available = availableBytes(paths.commonDir);
  const otherReservations = sumReserved(ledger.leases) - BigInt(lease.reservedBytes);
  const floor = highestFloor(ledger.leases);
  const admission = evaluateAdmission({
    available,
    reserved: otherReservations,
    requested,
    floor,
  });
  if (!admission.allowed) {
    throw new CliError(
      `capacity resize denied: available=${available} otherReserved=${otherReservations} requested=${requested} floor=${floor}`,
      EXIT_DENIED
    );
  }
  lease.reservedBytes = requested.toString();
  writeLedger(paths, ledger);
  printPayload(
    {
      resized: id,
      reservedBytes: lease.reservedBytes,
      remainingBytes: admission.remaining.toString(),
    },
    options.flag("json")
  );
}

function transferOwnerLocked(options, paths) {
  const ownerPid = parsePid(options.required("owner-pid"));
  const ledger = readLedger(paths);
  const { id, lease } = authenticatedLease(ledger, options.required("lease"));
  requireLiveLease(lease);
  lease.owner = captureOwner(ownerPid);
  lease.processGroup = ownerPid;
  writeLedger(paths, ledger);
  printPayload({ transferred: id, ownerPid }, options.flag("json"));
}

function reclaimStaleLocked(options, paths) {
  const id = options.required("lease-id");
  const ledger = readLedger(paths);
  const index = ledger.leases.findIndex((lease) => lease.id === id);
  if (index === -1) throw new CliError(`lease not found: ${id}`, EXIT_STATE);
  const classification = classifyOwner(ledger.leases[index].owner);
  if (classification.identity !== "STALE") {
    throw new CliError(
      `lease ${id} is ${classification.identity} (${classification.reason}); preserved`,
      EXIT_STATE
    );
  }
  if (ledger.leases[index].processGroup) {
    const group = listProcessGroupMembers(ledger.leases[index].processGroup);
    if (group.unknown || group.members.length > 0) {
      throw new CliError(
        `lease ${id} quiescence is ${group.unknown ? "UNKNOWN" : "NOT_QUIESCENT"}; preserved`,
        EXIT_STATE
      );
    }
  }
  ledger.leases.splice(index, 1);
  writeLedger(paths, ledger);
  printPayload({ reclaimed: id, reason: classification.reason }, options.flag("json"));
}

function statusLocked(options, paths) {
  printPayload(statusPayload(paths, readLedger(paths)), options.flag("json"));
}

function runLockedOperation(command, argv) {
  const options = parseOptions(argv, OPTION_SETS[command]);
  const commonDir = resolveCommonDir(options.required("common-dir"));
  const paths = pathsFor(commonDir);
  if (command === "reserve") reserveLocked(options, paths);
  else if (command === "check") checkLocked(options, paths);
  else if (command === "resize") resizeLocked(options, paths);
  else if (command === "transfer-owner") transferOwnerLocked(options, paths);
  else if (command === "release") releaseLocked(options, paths);
  else if (command === "reclaim-stale") reclaimStaleLocked(options, paths);
  else if (command === "status") statusLocked(options, paths);
  else throw new CliError(`unsupported locked command: ${command}`, EXIT_USAGE);
}

function invokeWithLedgerLock(command, argv) {
  const options = parseOptions(argv, OPTION_SETS[command]);
  const commonDir = resolveCommonDir(options.required("common-dir"));
  const paths = pathsFor(commonDir);
  const mutating = !["check", "status"].includes(command);
  if (mutating) prepareMutation(paths);
  else {
    assertNotSymlink(paths.stateDir, "resource-budget state directory");
    assertNotSymlink(paths.ledgerLock, "resource-budget mutex");
    const hasLedger = Boolean(lstatIfPresent(paths.ledger));
    const hasMutex = Boolean(lstatIfPresent(paths.ledgerLock));
    if (!hasMutex && hasLedger) {
      throw new CliError(
        `resource-budget ledger exists without its mutex; status will not repair it: ${paths.ledgerLock}`,
        EXIT_STATE
      );
    }
    if (!hasLedger && !hasMutex) {
      if (command === "status") {
        printPayload(statusPayload(paths, emptyLedger()), options.flag("json"));
        return 0;
      }
      throw new CliError("lease not found: resource-budget ledger is uninitialized", EXIT_STATE);
    }
  }
  const mode = mutating ? "-x" : "-s";
  const lockFd = openLockNoFollow(paths.ledgerLock, "resource-budget mutex");
  let child;
  try {
    child = spawnSync(
      "flock",
      [
        mode,
        "-w",
        String(LOCK_WAIT_SECONDS),
        "-F",
        "/proc/self/fd/3",
        process.execPath,
        SCRIPT_PATH,
        "__ledger",
        command,
        ...argv,
      ],
      { encoding: "utf8", maxBuffer: 8 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe", lockFd] }
    );
  } finally {
    closeSync(lockFd);
  }
  if (child.stdout) process.stdout.write(child.stdout);
  if (child.stderr) process.stderr.write(child.stderr);
  if (child.error) throw child.error;
  return child.status ?? 1;
}

function splitRunArguments(argv) {
  const separator = argv.indexOf("--");
  if (separator === -1 || separator === argv.length - 1) {
    throw new CliError("run requires -- COMMAND [ARG...]", EXIT_USAGE);
  }
  return { optionArgs: argv.slice(0, separator), commandArgs: argv.slice(separator + 1) };
}

function callCliJson(args) {
  const child = spawnSync(process.execPath, [SCRIPT_PATH, ...args, "--json"], {
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) {
    throw new CliError(
      child.stderr.trim() || `resource-budget ${args[0]} exited ${child.status}`,
      child.status ?? 1
    );
  }
  try {
    return JSON.parse(child.stdout);
  } catch (error) {
    throw new CliError(
      `resource-budget ${args[0]} returned invalid JSON: ${error.message}`,
      EXIT_STATE
    );
  }
}

async function runGroupLeader(argv) {
  const { optionArgs, commandArgs } = splitRunArguments(argv);
  const options = parseOptions(optionArgs, OPTION_SETS["group-leader"]);
  const disconnectGraceMs = parseMilliseconds(
    options.required("disconnect-grace-ms"),
    "disconnect-grace-ms",
    10_000
  );
  const ignoreTermination = () => {};
  process.on("SIGINT", ignoreTermination);
  process.on("SIGTERM", ignoreTermination);
  let child;
  let started = false;
  let disconnectCleanupStarted = false;
  const safeSend = (message) => {
    if (!process.connected) return;
    try {
      process.send(message);
    } catch {
      // The disconnect handler owns cleanup once the controller channel is gone.
    }
  };
  const waitForDrain = async () => {
    const deadline = Date.now() + disconnectGraceMs;
    while (Date.now() < deadline) {
      const snapshot = listProcessGroupMembers(process.pid);
      const others = snapshot.members.filter((member) => member.pid !== process.pid);
      if (!snapshot.unknown && others.length === 0) return true;
      await delay(Math.min(25, Math.max(1, deadline - Date.now())));
    }
    return false;
  };
  const cleanupAfterDisconnect = async () => {
    if (disconnectCleanupStarted) return;
    disconnectCleanupStarted = true;
    if (!started) {
      process.exit(75);
      return;
    }
    try {
      process.kill(-process.pid, "SIGTERM");
    } catch (error) {
      if (error.code !== "ESRCH") process.stderr.write(`[resource-budget] ${error.message}\n`);
    }
    let empty = await waitForDrain();
    if (!empty) {
      empty = await killVerifiedGroupMembers(process.pid, process.pid, disconnectGraceMs);
    }
    if (empty) {
      process.exit(75);
      return;
    }
    process.stderr.write(
      `[resource-budget] HOLD: controller disconnected and process group ${process.pid} could not be proven empty; anchor, compatibility lock, and lease remain live\n`
    );
    setInterval(() => {}, 60_000);
  };
  process.once("disconnect", () => {
    void cleanupAfterDisconnect().catch((error) => {
      process.stderr.write(
        `[resource-budget] HOLD: disconnect cleanup threw (${error.message}); anchor, compatibility lock, and lease remain live\n`
      );
      setInterval(() => {}, 60_000);
    });
  });
  process.on("message", (message) => {
    if (!message || typeof message !== "object") return;
    if (message.type === "start" && !started) {
      started = true;
      child = spawn(commandArgs[0], commandArgs.slice(1), { detached: false, stdio: "inherit" });
      child.once("spawn", () => safeSend({ type: "started", commandPid: child.pid }));
      child.once("error", (error) => {
        safeSend({ type: "started", commandPid: null });
        safeSend({ type: "command-exit", code: 127, signal: null, error: error.message });
      });
      child.once("close", (code, signal) => safeSend({ type: "command-exit", code, signal }));
      return;
    }
    if (message.type === "shutdown") {
      const snapshot = listProcessGroupMembers(process.pid);
      const others = snapshot.members.filter((member) => member.pid !== process.pid);
      if (snapshot.unknown || others.length > 0) {
        safeSend({ type: "shutdown-refused", remaining: others.length, unknown: snapshot.unknown });
        return;
      }
      process.exit(0);
    }
  });
  safeSend({ type: "ready", groupPid: process.pid });
  await new Promise(() => {});
}

async function runCompatLocked(argv) {
  const { optionArgs, commandArgs } = splitRunArguments(argv);
  const options = parseOptions(optionArgs, OPTION_SETS.run);
  const commonDir = resolveCommonDir(options.required("common-dir"));
  const reserveBytes = parseUnsigned(options.required("reserve-bytes"), "reserve-bytes", {
    allowZero: false,
  });
  const monitorFloorBytes = parseUnsigned(
    options.required("monitor-floor-bytes"),
    "monitor-floor-bytes"
  );
  const purpose = options.required("purpose");
  const pollMs = parseMilliseconds(options.optional("poll-ms"), "poll-ms", 2_000);
  const graceMs = parseMilliseconds(options.optional("grace-ms"), "grace-ms", 10_000);
  const controller = new AbortController();
  const abortWith = (signal) => {
    if (!controller.signal.aborted) controller.abort({ signal });
  };
  const onSigint = () => abortWith("SIGINT");
  const onSigterm = () => abortWith("SIGTERM");
  process.on("SIGINT", onSigint);
  process.on("SIGTERM", onSigterm);
  const metrics = { initial: null, minimum: null, final: null, samples: 0, maximumFloor: 0n };
  let handle;
  let leaseId;
  let outcome;
  let failure;
  let sampleFailure;
  let leaseState = "NOT_CREATED";
  let sampleCapacity;
  try {
    const reserved = callCliJson([
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      reserveBytes.toString(),
      "--floor-bytes",
      monitorFloorBytes.toString(),
      "--purpose",
      purpose,
      "--owner-pid",
      String(process.pid),
    ]);
    handle = reserved.lease.handle;
    leaseId = reserved.lease.id;
    leaseState = "ACTIVE";
    process.stderr.write(
      `[resource-budget] lease ${reserved.lease.id} reserved ${reserveBytes} bytes; monitor floor ${monitorFloorBytes}\n`
    );
    if (controller.signal.aborted) {
      outcome = {
        exitCode: controller.signal.reason?.signal === "SIGINT" ? 130 : 143,
        reason: "aborted",
      };
    } else {
      const ownId = reserved.lease.id;
      sampleCapacity = async () => {
        const status = callCliJson(["status", "--common-dir", commonDir]);
        const ownLease = status.leases.find((lease) => lease.id === ownId);
        if (!ownLease) throw new Error(`own lease disappeared: ${ownId}`);
        const otherReservations = BigInt(status.reservedBytes) - BigInt(ownLease.reservedBytes);
        const available = BigInt(status.availableBytes) - otherReservations;
        const requiredFloor = highestFloor(status.leases);
        metrics.initial ??= available;
        metrics.minimum =
          metrics.minimum === null || available < metrics.minimum ? available : metrics.minimum;
        metrics.maximumFloor =
          requiredFloor > metrics.maximumFloor ? requiredFloor : metrics.maximumFloor;
        metrics.final = available;
        metrics.samples += 1;
        return { availableBytes: available, requiredFloorBytes: requiredFloor };
      };
      const initial = await sampleCapacity();
      if (initial.availableBytes < initial.requiredFloorBytes) {
        const error = new CliError("capacity floor crossed before workload start", EXIT_DENIED);
        error.resourceReason = "capacity-floor-before-start";
        throw error;
      }
      outcome = await runMonitoredCommand({
        command: commandArgs[0],
        args: commandArgs.slice(1),
        monitorFloorBytes,
        pollMs,
        graceMs,
        abortSignal: controller.signal,
        compatLockPath: pathsFor(commonDir).compatLock,
        beforeStart: async (groupPid) => {
          callCliJson([
            "transfer-owner",
            "--common-dir",
            commonDir,
            "--lease",
            handle,
            "--owner-pid",
            String(groupPid),
          ]);
        },
        sampleAvailableBytes: sampleCapacity,
      });
    }
  } catch (error) {
    failure = error;
  } finally {
    if (sampleCapacity) {
      try {
        const finalSample = await sampleCapacity();
        if (!failure && finalSample.availableBytes < finalSample.requiredFloorBytes) {
          failure = new CliError("capacity floor crossed at final sample", EXIT_DENIED);
          failure.resourceReason = "capacity-floor-final-sample";
        }
      } catch (error) {
        sampleFailure = error;
        if (!failure && (!outcome || outcome.exitCode === 0)) {
          failure = new CliError(`final capacity sample failed: ${error.message}`, EXIT_DENIED);
          failure.resourceReason = "final-sample-error";
        }
      }
    }
    if (handle && !failure?.preserveLease) {
      try {
        callCliJson(["release", "--common-dir", commonDir, "--lease", handle]);
        leaseState = "RELEASED";
      } catch (error) {
        leaseState = "RELEASE_FAILED";
        if (!failure) failure = error;
        else
          process.stderr.write(`[resource-budget] lease release also failed: ${error.message}\n`);
      }
    } else if (handle && failure?.preserveLease) {
      leaseState = "PRESERVED";
      process.stderr.write(
        "[resource-budget] HOLD: preserving the lease because owned descendants were not proven terminated\n"
      );
    }
    process.off("SIGINT", onSigint);
    process.off("SIGTERM", onSigterm);
  }
  const exitCode = failure?.exitCode ?? outcome?.exitCode ?? 1;
  const resourceHold =
    failure?.preserveLease ||
    failure?.exitCode === EXIT_DENIED ||
    sampleFailure ||
    ["capacity-floor", "monitor-error"].includes(outcome?.reason);
  const classification = resourceHold
    ? "RESOURCE_HOLD"
    : failure
      ? "INCOMPLETE"
      : outcome?.reason === "aborted"
        ? "INTERRUPTED"
        : exitCode === 0
          ? "PASS"
          : "WORKLOAD_FAILED";
  const failureHasWorkloadEvidence =
    failure && Object.prototype.hasOwnProperty.call(failure, "workloadStarted");
  const observedWorkload = failureHasWorkloadEvidence ? failure : outcome;
  process.stderr.write(
    `[resource-budget] receipt ${JSON.stringify({
      schemaVersion: 1,
      classification,
      purpose,
      leaseId: leaseId ?? null,
      leaseState,
      reserveBytes: reserveBytes.toString(),
      monitorFloorBytes: monitorFloorBytes.toString(),
      maximumObservedRequiredFloorBytes: metrics.maximumFloor.toString(),
      initialAvailableBytes: metrics.initial?.toString() ?? null,
      minimumObservedAvailableBytes: metrics.minimum?.toString() ?? null,
      finalAvailableBytes: metrics.final?.toString() ?? null,
      observedSamples: metrics.samples,
      exitCode,
      workloadExitCode: observedWorkload?.workloadExitCode ?? null,
      workloadSignal: observedWorkload?.workloadSignal ?? null,
      reason: failure?.resourceReason ?? outcome?.reason ?? (failure ? "guard-error" : null),
      quiescence:
        failure?.quiescence ??
        outcome?.quiescence ??
        (observedWorkload?.workloadStarted ? "UNKNOWN" : "NOT_STARTED"),
      observedGroupMembers: failure?.observedGroupMembers ?? [],
    })}\n`
  );
  if (failure) throw failure;
  return exitCode;
}

async function invokeCompatRun(argv) {
  const { optionArgs } = splitRunArguments(argv);
  const options = parseOptions(optionArgs, OPTION_SETS.run);
  const commonDir = resolveCommonDir(options.required("common-dir"));
  const paths = pathsFor(commonDir);
  return await new Promise((resolve, reject) => {
    const lockFd = openLockNoFollow(paths.compatLock, "new-worktree compatibility lock");
    const child = spawn(
      "flock",
      [
        "-s",
        "-w",
        String(COMPAT_LOCK_WAIT_SECONDS),
        "-F",
        "/proc/self/fd/3",
        process.execPath,
        SCRIPT_PATH,
        "__compat-run",
        ...argv,
      ],
      { stdio: ["inherit", "inherit", "inherit", lockFd] }
    );
    closeSync(lockFd);
    const forward = (signal) => {
      if (child.exitCode === null && child.signalCode === null) child.kill(signal);
    };
    const onSigint = () => forward("SIGINT");
    const onSigterm = () => forward("SIGTERM");
    process.on("SIGINT", onSigint);
    process.on("SIGTERM", onSigterm);
    const cleanup = () => {
      process.off("SIGINT", onSigint);
      process.off("SIGTERM", onSigterm);
    };
    child.once("error", (error) => {
      cleanup();
      reject(error);
    });
    child.once("close", (code, signal) => {
      cleanup();
      if (code !== null) resolve(code);
      else resolve(signalExitCode(signal));
    });
  });
}

export async function main(argv = process.argv.slice(2)) {
  const [command, ...rest] = argv;
  if (!command) throw new CliError(usage(), EXIT_USAGE);
  if (command === "--help" || command === "-h") {
    process.stdout.write(`${usage()}\n`);
    return 0;
  }
  requireLinux();
  if (command === "__group-leader") return await runGroupLeader(rest);
  if (command === "__ledger") {
    const [lockedCommand, ...lockedArgs] = rest;
    runLockedOperation(lockedCommand, lockedArgs);
    return 0;
  }
  if (command === "__compat-run") return await runCompatLocked(rest);
  if (command === "run") return await invokeCompatRun(rest);
  if (
    ![
      "reserve",
      "check",
      "resize",
      "transfer-owner",
      "release",
      "reclaim-stale",
      "status",
    ].includes(command)
  ) {
    throw new CliError(`${usage()}\n\nunknown command: ${command}`, EXIT_USAGE);
  }
  return invokeWithLedgerLock(command, rest);
}
if (process.argv[1] && realpathSync(process.argv[1]) === SCRIPT_PATH) {
  try {
    process.exitCode = await main();
  } catch (error) {
    if (error instanceof CliError || Number.isInteger(error?.exitCode)) {
      process.stderr.write(`resource-budget: ${error.message}\n`);
      process.exitCode = error.exitCode;
    } else {
      process.stderr.write(`resource-budget: ${error.stack ?? error.message}\n`);
      process.exitCode = 1;
    }
  }
}
