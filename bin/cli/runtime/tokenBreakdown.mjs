import { Worker } from "node:worker_threads";
import { runtimeDiagnosticsLog } from "./runtimeDiagnosticsLog.mjs";

export const TOKEN_CATEGORIES = [
  "instructions",
  "toolDefinitions",
  "userMessages",
  "assistantMessages",
  "toolCalls",
  "toolOutputs",
  "other",
];
export const OUTPUT_SOURCES = [
  "fileReads",
  "localSearch",
  "shellCommands",
  "mcpResults",
  "otherOrUnknown",
];
const MAX_BODY_BYTES = 8 * 1024 * 1024;
/** Bound worker-supplied counts to nonnegative safe integers no greater than one billion. */
const numeric = (value) => Number.isSafeInteger(value) && value >= 0 && value <= 1000000000;
/** Return a fixed rejection status without exposing untrusted worker payloads. */
const invalid = () => ({ status: "invalid_result" });

/** Project a worker message onto fixed numeric fields; never forward arbitrary worker strings. */
export function validateTokenBreakdown(value) {
  if (["invalid_json", "oversized"].includes(value?.status)) return { status: value.status };
  if (!["ok", "unavailable_tokenizer"].includes(value?.status)) return invalid();
  /** Copy only validated token, byte, and part counts for every expected category or source. */
  const project = (names, source) => {
    if (
      !source ||
      names.some((name) => ["tokens", "bytes", "parts"].some((k) => !numeric(source[name]?.[k])))
    )
      return null;
    return Object.fromEntries(
      names.map((name) => [
        name,
        Object.fromEntries(["tokens", "bytes", "parts"].map((k) => [k, source[name][k]])),
      ])
    );
  };
  const categories = project(TOKEN_CATEGORIES, value.categories);
  const sources = project(OUTPUT_SOURCES, value.sources);
  if (
    !categories ||
    !sources ||
    ["exactChars", "heuristicChars", "omittedMedia"].some((k) => !numeric(value[k]))
  )
    return invalid();
  const totals = {};
  for (const key of ["tokens", "bytes", "parts"]) {
    totals[key] = TOKEN_CATEGORIES.reduce((n, name) => n + categories[name][key], 0);
    if (
      totals[key] !== value.totals?.[key] ||
      OUTPUT_SOURCES.reduce((n, name) => n + sources[name][key], 0) !== categories.toolOutputs[key]
    )
      return invalid();
  }
  return {
    status: value.status,
    categories,
    sources,
    totals,
    exactChars: value.exactChars,
    heuristicChars: value.heuristicChars,
    omittedMedia: value.omittedMedia,
  };
}

/** One disposable worker, one body, no queue and no inherited gateway preloads or secrets. */
export function createTokenBreakdown({
  timeoutMs = 5000,
  cooldownMs = 1000,
  now = Date.now,
  workerFactory = () =>
    new Worker(new URL("./tokenBreakdownWorker.mjs", import.meta.url), {
      execArgv: [],
      env: {},
      resourceLimits: { maxOldGenerationSizeMb: 128 },
    }),
  log = runtimeDiagnosticsLog,
} = {}) {
  let pending = null,
    stopped = false,
    disabled = false,
    retryAt = 0;
  /** Settle a job once after worker termination, applying cooldown or permanent disablement. */
  async function finish(job, result, permanent = false) {
    if (pending !== job || job.finishing) return;
    job.finishing = true;
    clearTimeout(job.timer);
    try {
      await job.worker?.terminate();
    } catch {
      disabled = true;
      log("ERROR", "Token worker cleanup failed");
    }
    if (permanent) disabled = true;
    if (result.status !== "ok") retryAt = now() + cooldownMs;
    pending = null;
    job.resolve(result);
  }
  /** Estimate one bounded body without queueing; return explicit statuses when work cannot start. */
  function submit(body) {
    if (stopped) return Promise.resolve({ status: "stopped" });
    if (disabled) return Promise.resolve({ status: "unavailable" });
    if (pending) return Promise.resolve({ status: "busy" });
    if (now() < retryAt) return Promise.resolve({ status: "cooldown" });
    if (!(typeof body === "string" || body instanceof Uint8Array))
      return Promise.resolve({ status: "invalid_json" });
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) return Promise.resolve({ status: "oversized" });
    return new Promise((resolve) => {
      const job = { resolve, worker: null, timer: null, finishing: false };
      pending = job;
      try {
        job.worker = workerFactory();
        job.worker.once("message", (result) => {
          void finish(job, validateTokenBreakdown(result));
        });
        job.worker.once("error", (error) => {
          void finish(
            job,
            { status: "unavailable" },
            ["MODULE_NOT_FOUND", "ERR_MODULE_NOT_FOUND", "ERR_WORKER_PATH"].includes(error?.code)
          );
        });
        job.worker.once("exit", () => {
          void finish(job, invalid());
        });
        job.timer = setTimeout(() => {
          log("WARNING", "Token estimation deadline exceeded");
          void finish(job, { status: "timeout" });
        }, timeoutMs);
        job.timer.unref();
        job.worker.postMessage({ body });
      } catch (error) {
        void finish(
          job,
          { status: "unavailable" },
          ["ERR_WORKER_PATH", "ERR_MODULE_NOT_FOUND", "ERR_INVALID_ARG_TYPE"].includes(error?.code)
        );
      }
    });
  }
  return {
    submit,
    /** Reject future submissions and wait for any in-flight worker cleanup to finish. */
    async stop() {
      stopped = true;
      if (pending) {
        const job = pending;
        await finish(job, { status: "stopped" });
        while (pending === job) await new Promise((resolve) => setImmediate(resolve));
      }
    },
  };
}
