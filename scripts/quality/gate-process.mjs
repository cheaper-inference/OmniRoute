import { spawn } from "node:child_process";
import {
  closeSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  writeSync,
} from "node:fs";
import { dirname } from "node:path";
import { StringDecoder } from "node:string_decoder";

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

function observeLinuxProcessGroup(processGroup) {
  const members = [];
  let unknown = false;
  const diagnostics = {
    schemaVersion: 1,
    processGroup,
    root: { pid: processGroup, kind: "NOT_LISTED" },
    ownMembers: [],
    unassignedErrors: {},
  };
  const result = () => ({
    members,
    unknown,
    diagnostics: { ...diagnostics, status: unknown ? "UNKNOWN" : "COMPLETE" },
  });
  let entries;
  try {
    // Names avoid Dirent conversion racing with a PID that exits during enumeration.
    entries = readdirSync("/proc");
  } catch (error) {
    unknown = true;
    diagnostics.root.kind = "NOT_SCANNED";
    diagnostics.directoryError = processScanReason(error);
    return result();
  }
  for (const name of entries) {
    if (!/^[0-9]+$/.test(name)) continue;
    const pid = Number(name);
    try {
      const stat = parseProcStat(readFileSync(`/proc/${pid}/stat`, "utf8"));
      if (pid === processGroup && stat.processGroup !== processGroup) {
        diagnostics.root.kind = "GROUP_MISMATCH";
      }
      if (stat.processGroup === processGroup) {
        const member = {
          pid,
          startTicks: stat.startTicks,
          state: stat.state,
          threadCount: stat.threadCount,
          executable: !isExitedZombie(stat),
        };
        diagnostics.ownMembers.push(member);
        if (pid === processGroup) diagnostics.root = { ...member, kind: "PRESENT" };
        // A zombie leader can still have live threads. Only its single-thread
        // exited form is non-executable and waiting for its parent to reap it.
        if (member.executable) members.push({ pid, startTicks: stat.startTicks });
      }
    } catch (error) {
      const missing = error.code === "ENOENT" || error.code === "ESRCH";
      const reasonCode = processScanReason(error);
      if (pid === processGroup) {
        diagnostics.root = { pid, kind: missing ? "MISSING" : "UNKNOWN", reasonCode };
      } else if (!missing) {
        // Unproved membership permits category counts only, never another PID,
        // command, environment, stat contents, or an error message containing a path.
        diagnostics.unassignedErrors[reasonCode] =
          (diagnostics.unassignedErrors[reasonCode] ?? 0) + 1;
      }
      // These two per-PID errors mean that PID disappeared; all other failures
      // keep the observation unknown instead of silently proving an empty group.
      if (!missing) unknown = true;
    }
  }
  return result();
}

/** Run one gate without a shell; persist progress before computing its verdict. */
export async function runGateProcess(command, args, options) {
  const {
    cwd,
    env = process.env,
    logPath,
    timeout = 30 * 60 * 1000,
    heartbeatMs = 15000,
    killGraceMs = 1000,
    maxBuffer = 256 * 1024 * 1024,
    signal,
    onHeartbeat = () => {},
  } = options;
  if (!logPath || !Number.isFinite(timeout) || timeout <= 0) {
    throw new Error("Gate execution requires a log path and positive timeout");
  }
  mkdirSync(dirname(logPath), { recursive: true });
  const fd = openSync(logPath, "wx", 0o600);
  const startedAt = new Date().toISOString();
  const started = performance.now();
  let lastOutputAt = startedAt;
  let bytes = 0;
  let out = "";
  let fault = signal?.aborted ? "CANCELLED" : null;
  let spawnError = null;
  let child;
  let escalation;
  let timer;
  let heartbeat;
  let closed = false;
  let settled = false;
  let exitCode = null;
  let exitSignal = null;
  let cleanupError = null;
  let processGroupObservation = null;
  let resolveDone;
  const done = new Promise((resolve) => {
    resolveDone = resolve;
  });

  const finish = () => {
    if (settled || !closed || escalation) return;
    settled = true;
    resolveDone();
  };
  const killTree = (killSignal) => {
    if (!child?.pid) return;
    try {
      if (process.platform === "win32") {
        // The release runners are POSIX. Windows still kills descendants, not only npm.cmd.
        const killer = spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
          stdio: "ignore",
          windowsHide: true,
        });
        killer.on("error", () => {
          cleanupError = "taskkill failed";
        });
      } else {
        process.kill(-child.pid, killSignal);
      }
    } catch (error) {
      if (error.code !== "ESRCH") cleanupError = error.code || "cleanup failed";
    }
  };
  const terminate = (reason) => {
    fault ||= reason;
    if (escalation || settled) return;
    killTree("SIGTERM");
    escalation = setTimeout(() => {
      killTree("SIGKILL");
      escalation = null;
      finish();
    }, killGraceMs);
  };
  const cancel = () => terminate("CANCELLED");
  const capture = (chunk, decoder) => {
    bytes += chunk.length;
    lastOutputAt = new Date().toISOString();
    try {
      writeSync(fd, chunk);
    } catch {
      terminate("EVIDENCE_ERROR");
    }
    if (bytes <= maxBuffer) out += decoder.write(chunk);
    else terminate("OUTPUT_LIMIT");
  };

  try {
    if (fault) closed = true;
    else {
      child = spawn(command, args, {
        cwd,
        env,
        shell: false,
        detached: process.platform !== "win32",
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      });
      for (const stream of [child.stdout, child.stderr]) {
        const decoder = new StringDecoder("utf8");
        stream.on("data", (chunk) => capture(chunk, decoder));
        stream.on("end", () => {
          if (bytes <= maxBuffer) out += decoder.end();
        });
      }
      child.on("error", (error) => {
        spawnError = error.code || "spawn failed";
        fault ||= "SPAWN_ERROR";
      });
      child.on("exit", (code, receivedSignal) => {
        exitCode = code;
        exitSignal = receivedSignal;
        if (process.platform === "linux" && child.pid) {
          try {
            const group = observeLinuxProcessGroup(child.pid);
            processGroupObservation = group.diagnostics;
            if (group.unknown) terminate("CLEANUP_ERROR");
            else if (group.members.length > 0) terminate("ORPHANED_DESCENDANTS");
          } catch {
            processGroupObservation = { status: "UNKNOWN", reasonCode: "PROCESS_SCAN_EXCEPTION" };
            terminate("CLEANUP_ERROR");
          }
        } else if (process.platform !== "win32" && child.pid) {
          try {
            process.kill(-child.pid, 0);
            terminate("ORPHANED_DESCENDANTS");
          } catch (error) {
            if (error.code !== "ESRCH") terminate("CLEANUP_ERROR");
          }
        }
      });
      child.on("close", () => {
        closed = true;
        finish();
      });
      signal?.addEventListener("abort", cancel, { once: true });
      if (signal?.aborted) cancel();
      timer = setTimeout(() => terminate("TIMEOUT"), timeout);
      heartbeat = setInterval(() => {
        try {
          onHeartbeat({ elapsedMs: Math.round(performance.now() - started), bytes, lastOutputAt });
        } catch {
          terminate("EVIDENCE_ERROR");
        }
      }, heartbeatMs);
    }
    finish();
    await done;
  } finally {
    clearTimeout(timer);
    clearInterval(heartbeat);
    signal?.removeEventListener("abort", cancel);
    closeSync(fd);
  }
  const outcome = cleanupError
    ? "CLEANUP_ERROR"
    : fault || (exitSignal ? "SIGNAL" : exitCode === 0 ? "PASS" : "FAIL");
  const code =
    outcome === "PASS"
      ? 0
      : outcome === "TIMEOUT"
        ? 124
        : outcome === "FAIL" && exitCode > 0
          ? exitCode
          : 1;
  const receipt = {
    schemaVersion: 1,
    startedAt,
    completedAt: new Date().toISOString(),
    durationMs: Math.round(performance.now() - started),
    lastOutputAt,
    bytes,
    outcome,
    exitCode,
    signal: exitSignal,
    spawnError,
    cleanupError,
    processGroupObservation,
    logPath,
  };
  const receiptPath = `${logPath}.json`;
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, { flag: "wx", mode: 0o600 });
  if (outcome !== "PASS" && outcome !== "FAIL")
    out += `\nGate execution ${outcome}; see ${receiptPath}\n`;
  return { code, out, receipt, receiptPath };
}
