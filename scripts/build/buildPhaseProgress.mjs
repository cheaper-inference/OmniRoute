import fs from "node:fs";
import { join, resolve } from "node:path";
import { performance } from "node:perf_hooks";

const INVOCATION = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SHA = /^[0-9a-f]{40}$/;
const PHASES = {
  cli: new Set(["cli", "next-input", "pack-assembly", "cli-sidecars"]),
  next: new Set(["next-process", "standalone-assembly"]),
};
const EVENTS = new Set(["STARTED", "RETURNED", "THREW"]);
const BUILD_PROGRESS_MAX_EVENTS = 16;
const BUILD_PROGRESS_MAX_EVENT_BYTES = 1024;

/** Enable diagnostics only for the already-bound build or package command. */
export function buildProgressEnvironment(phase) {
  if (
    !["build-next", "build-cli"].includes(phase?.phaseId) ||
    !INVOCATION.test(phase.invocationId || "") ||
    !SHA.test(phase.candidateSha || "")
  ) {
    return {};
  }
  return {
    OMNIROUTE_BUILD_PROGRESS: "1",
    OMNIROUTE_BUILD_INVOCATION_ID: phase.invocationId,
    OMNIROUTE_BUILD_CANDIDATE_SHA: phase.candidateSha,
  };
}

/**
 * Bounded diagnostic events, never an acceptance verdict. No output/error payload,
 * timers, signal handlers, retained descriptors, or change to the caller's deadline.
 * A killed write can leave an incomplete JSON file: consumers must reject it.
 */
export function createBuildProgress({ projectRoot, role, env = process.env, fsImpl = fs }) {
  const invocationId = env.OMNIROUTE_BUILD_INVOCATION_ID;
  const candidateSha = env.OMNIROUTE_BUILD_CANDIDATE_SHA;
  let state =
    env.OMNIROUTE_BUILD_PROGRESS !== "1"
      ? "DISABLED"
      : !Object.hasOwn(PHASES, role) ||
          !INVOCATION.test(invocationId || "") ||
          !SHA.test(candidateSha || "")
        ? "INVALID_BINDING"
        : "ENABLED";
  let written = 0;
  const started = performance.now();

  function directory() {
    let current = resolve(projectRoot);
    const requireDirectory = () => {
      const info = fsImpl.lstatSync(current);
      if (
        !info.isDirectory() ||
        info.isSymbolicLink() ||
        (typeof process.getuid === "function" && info.uid !== process.getuid())
      ) {
        throw new Error("UNSAFE_BUILD_PROGRESS_DIRECTORY");
      }
    };
    requireDirectory();
    for (const component of ["_artifacts", "release-green", "build-progress", invocationId]) {
      current = join(current, component);
      try {
        fsImpl.mkdirSync(current, { mode: 0o700 });
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
      requireDirectory();
    }
    return current;
  }

  function record(phase, event, value) {
    if (state !== "ENABLED") return;
    if (!PHASES[role].has(phase) || !EVENTS.has(event)) {
      state = "INVALID_EVENT";
      return;
    }
    if (written >= BUILD_PROGRESS_MAX_EVENTS) {
      state = "LIMIT_REACHED";
      return;
    }
    try {
      // Read a data descriptor only: no error text, getters or arbitrary objects
      // are stringified. RETURNED with a nonzero code is not a successful build.
      const code =
        phase === "next-process" && value && typeof value === "object"
          ? Object.getOwnPropertyDescriptor(value, "code")?.value
          : null;
      const body =
        JSON.stringify({
          schemaVersion: 1,
          evidenceState: "UNVALIDATED",
          invocationId,
          candidateSha,
          role,
          sequence: written,
          phase,
          event,
          at: new Date().toISOString(),
          elapsedMs: Math.round(performance.now() - started),
          inputMode: phase === "next-input" && ["reused", "built"].includes(value) ? value : null,
          exitCode: Number.isInteger(code) && code >= 0 && code <= 255 ? code : null,
        }) + "\n";
      if (Buffer.byteLength(body) > BUILD_PROGRESS_MAX_EVENT_BYTES) {
        state = "LIMIT_REACHED";
        return;
      }
      const file = join(directory(), `${role}-${String(written).padStart(2, "0")}.json`);
      fsImpl.writeFileSync(file, body, {
        flag: fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL,
        mode: 0o600,
      });
      written++;
    } catch {
      // Diagnostics must not mask the original build result or prevent cleanup.
      // Missing/incomplete records remain unvalidated; no success is synthesized.
      state = "WRITE_FAILED";
    }
  }

  return {
    record,
    status: () => ({ state, written }),
    runSync(phase, operation) {
      record(phase, "STARTED");
      try {
        const value = operation();
        record(phase, "RETURNED", value);
        return value;
      } catch (error) {
        record(phase, "THREW");
        throw error;
      }
    },
    async runAsync(phase, operation) {
      record(phase, "STARTED");
      try {
        const value = await operation();
        record(phase, "RETURNED", value);
        return value;
      } catch (error) {
        record(phase, "THREW");
        throw error;
      }
    },
  };
}
