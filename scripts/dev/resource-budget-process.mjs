import { readFileSync, readdirSync } from "node:fs";
import { constants as osConstants } from "node:os";
import { setTimeout as delay } from "node:timers/promises";

const EXIT_STATE = 78;

class ProcessIdentityError extends Error {
  constructor(message) {
    super(message);
    this.exitCode = EXIT_STATE;
  }
}

export function readBootId() {
  try {
    const value = readFileSync("/proc/sys/kernel/random/boot_id", "utf8").trim();
    if (!/^[0-9a-f-]{36}$/i.test(value)) throw new Error("invalid boot_id format");
    return value;
  } catch (error) {
    throw new ProcessIdentityError(`cannot establish Linux boot identity: ${error.message}`);
  }
}

function parseProcStat(statLine) {
  const closeParen = statLine.lastIndexOf(")");
  if (closeParen < 2 || statLine[closeParen + 1] !== " ") {
    throw new Error("invalid /proc/<pid>/stat format");
  }
  const fieldsAfterComm = statLine
    .slice(closeParen + 2)
    .trim()
    .split(/\s+/);
  const startTicks = fieldsAfterComm[19];
  const processGroup = fieldsAfterComm[2];
  if (!/^[0-9]+$/.test(startTicks ?? "")) throw new Error("missing process start time");
  if (!/^[0-9]+$/.test(processGroup ?? "")) throw new Error("missing process group");
  return {
    startTicks,
    processGroup: Number(processGroup),
    state: fieldsAfterComm[0],
    threadCount: fieldsAfterComm[17],
  };
}

function isExitedZombie(record) {
  return record.state === "Z" && record.threadCount === "1";
}

export function parseProcStartTicks(statLine) {
  return parseProcStat(statLine).startTicks;
}

function readProcessIdentity(pid) {
  let statLine;
  try {
    statLine = readFileSync(`/proc/${pid}/stat`, "utf8");
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ESRCH") return { kind: "MISSING" };
    return { kind: "UNKNOWN", reason: error.message };
  }
  try {
    return { kind: "PRESENT", startTicks: parseProcStartTicks(statLine) };
  } catch (error) {
    return { kind: "UNKNOWN", reason: error.message };
  }
}

function readProcessRecord(pid) {
  try {
    return { kind: "PRESENT", ...parseProcStat(readFileSync(`/proc/${pid}/stat`, "utf8")) };
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ESRCH") return { kind: "MISSING" };
    return { kind: "UNKNOWN", reason: error.message };
  }
}

function processScanReason(error) {
  const knownCodes = new Set([
    "EACCES",
    "EPERM",
    "EIO",
    "EBADF",
    "ENOENT",
    "ESRCH",
    "EMFILE",
    "ENFILE",
    "ENOTDIR",
  ]);
  if (knownCodes.has(error?.code)) return `PROC_STAT_${error.code}`;
  const parseReasons = new Map([
    ["invalid /proc/<pid>/stat format", "PROC_STAT_FORMAT_INVALID"],
    ["missing process start time", "PROC_STAT_START_TICKS_MISSING"],
    ["missing process group", "PROC_STAT_GROUP_MISSING"],
  ]);
  return parseReasons.get(error?.message) ?? "PROC_STAT_UNCLASSIFIED_ERROR";
}

export function listProcessGroupMembers(processGroup, { includeDiagnostics = false } = {}) {
  const members = [];
  let unknown = false;
  const diagnostics = includeDiagnostics
    ? {
        schemaVersion: 1,
        processGroup,
        root: { pid: processGroup, kind: "NOT_LISTED" },
        ownMembers: [],
        unassignedErrors: {},
      }
    : null;
  const result = () =>
    diagnostics
      ? {
          members,
          unknown,
          diagnostics: { ...diagnostics, status: unknown ? "UNKNOWN" : "COMPLETE" },
        }
      : { members, unknown };
  let entries;
  try {
    // Dirent conversion may lstat a PID that exits during enumeration. Names
    // avoid that whole-scan race; each stat below keeps its own failure policy.
    entries = readdirSync("/proc");
  } catch (error) {
    unknown = true;
    if (diagnostics) {
      diagnostics.root.kind = "NOT_SCANNED";
      diagnostics.directoryError = processScanReason(error);
    }
    return result();
  }
  for (const name of entries) {
    if (!/^[0-9]+$/.test(name)) continue;
    const pid = Number(name);
    try {
      const stat = parseProcStat(readFileSync(`/proc/${pid}/stat`, "utf8"));
      if (diagnostics && pid === processGroup && stat.processGroup !== processGroup) {
        diagnostics.root.kind = "GROUP_MISMATCH";
      }
      if (diagnostics && stat.processGroup === processGroup) {
        const member = {
          pid,
          startTicks: stat.startTicks,
          state: stat.state,
          threadCount: stat.threadCount,
          executable: !isExitedZombie(stat),
        };
        diagnostics.ownMembers.push(member);
        if (pid === processGroup) diagnostics.root = { ...member, kind: "PRESENT" };
      }
      // A single-thread zombie has exited; only its parent/subreaper can reap it.
      // A zombie thread-group leader may still have live threads, so its thread
      // count must be exactly one before excluding it from executable members.
      if (stat.processGroup === processGroup && !isExitedZombie(stat)) {
        members.push({ pid, startTicks: stat.startTicks });
      }
    } catch (error) {
      const missing = error.code === "ENOENT" || error.code === "ESRCH";
      if (diagnostics) {
        const reasonCode = processScanReason(error);
        if (pid === processGroup) {
          diagnostics.root = { pid, kind: missing ? "MISSING" : "UNKNOWN", reasonCode };
        } else if (!missing) {
          // Membership is unproved. Retain only category counts, never that PID,
          // its stat/command/environment, or a platform error message with a path.
          diagnostics.unassignedErrors[reasonCode] =
            (diagnostics.unassignedErrors[reasonCode] ?? 0) + 1;
        }
      }
      // procfs can return ESRCH when a process exits after its stat file is opened.
      // Both disappearance errors prove this PID is gone; other failures stay unknown.
      if (!missing) unknown = true;
    }
  }
  return result();
}

export async function killVerifiedGroupMembers(processGroup, leaderPid, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const snapshot = listProcessGroupMembers(processGroup);
    if (snapshot.unknown) return false;
    const members = snapshot.members.filter((member) => member.pid !== leaderPid);
    if (members.length === 0) return true;
    for (const member of members) {
      const current = readProcessRecord(member.pid);
      if (
        current.kind === "UNKNOWN" ||
        (current.kind === "PRESENT" &&
          (current.processGroup !== processGroup || current.startTicks !== member.startTicks))
      ) {
        return false;
      }
      if (current.kind === "MISSING" || isExitedZombie(current)) continue;
      try {
        process.kill(member.pid, "SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") return false;
      }
    }
    await delay(25);
  }
  const finalSnapshot = listProcessGroupMembers(processGroup);
  return (
    !finalSnapshot.unknown && finalSnapshot.members.every((member) => member.pid === leaderPid)
  );
}

export function captureOwner(pid) {
  const processIdentity = readProcessIdentity(pid);
  if (processIdentity.kind !== "PRESENT") {
    throw new ProcessIdentityError(`cannot establish owner process identity for PID ${pid}`);
  }
  return { pid, bootId: readBootId(), startTicks: processIdentity.startTicks };
}

export function classifyOwner(owner, currentBootId = readBootId()) {
  if (owner.bootId !== currentBootId) return { identity: "STALE", reason: "boot-changed" };
  const current = readProcessIdentity(owner.pid);
  if (current.kind === "MISSING") return { identity: "STALE", reason: "pid-missing" };
  if (current.kind === "UNKNOWN") return { identity: "UNKNOWN", reason: current.reason };
  if (current.startTicks !== owner.startTicks) {
    return { identity: "STALE", reason: "pid-reused" };
  }
  return { identity: "LIVE", reason: "identity-matched" };
}

export function signalOwnedGroup(pid, owner, signal) {
  if (classifyOwner(owner).identity !== "LIVE") {
    throw new ProcessIdentityError(
      `refusing ${signal}: child PID ${pid} identity is no longer provably owned`
    );
  }
  try {
    process.kill(-pid, signal);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") return false;
    throw error;
  }
}

export function signalExitCode(signal) {
  return 128 + (osConstants.signals[signal] ?? 0);
}
