import { closeSync, mkdirSync, openSync, writeSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const PREFIX = "[unit-progress] ";
const PHASES = new Set(["primary", "dashboard", "serial"]);

function identity(environment) {
  const keep = (key, pattern) => (pattern.test(environment[key] || "") ? environment[key] : null);
  return {
    phase: PHASES.has(environment.OMNIROUTE_UNIT_PHASE)
      ? environment.OMNIROUTE_UNIT_PHASE
      : "unknown",
    shard: keep("TEST_SHARD", /^\d+\/\d+$/),
    sha: keep("GITHUB_SHA", /^[0-9a-f]{40}$/),
    runId: keep("GITHUB_RUN_ID", /^\d+$/),
    runAttempt: keep("GITHUB_RUN_ATTEMPT", /^\d+$/),
  };
}

function wrapperFile(event, cwd) {
  if (event.type !== "test:dequeue" && event.type !== "test:complete") return null;
  const data = event.data;
  // Child events describe test bodies, not completion of the isolated file process.
  if (!data || data.entryFile || data.nesting !== 0) return null;
  if (typeof data.file !== "string" || typeof data.name !== "string") return null;
  if (/[\0\r\n]/.test(data.file) || /[\0\r\n]/.test(data.name)) return null;
  if (resolve(cwd, data.name) !== resolve(cwd, data.file)) return null;
  const file = relative(cwd, resolve(cwd, data.file)).split(sep).join("/");
  return /^tests\/unit\/.+\.test\.(?:[cm]?[jt]s)$/.test(file) ? file : null;
}

function artifactSink(cwd, metadata) {
  let descriptor;
  let failed = false;
  try {
    const directory = join(cwd, ".artifacts", "unit-progress");
    mkdirSync(directory, { recursive: true });
    const shard = (metadata.shard || "unknown").replace("/", "-of-");
    descriptor = openSync(
      join(directory, `${metadata.phase}-${shard}-${process.pid}.jsonl`),
      "wx",
      0o600
    );
  } catch {
    failed = true;
  }
  return {
    get failed() {
      return failed;
    },
    write(record) {
      if (failed) return;
      try {
        writeSync(descriptor, `${JSON.stringify(record)}\n`);
      } catch {
        failed = true;
      }
    },
    close() {
      if (descriptor === undefined) return;
      try {
        closeSync(descriptor);
      } catch {
        failed = true;
      }
    },
  };
}

/** Observe file wrappers only; never change test selection, signals, or exit codes. */
export async function* createUnitProgressReporter(source, options = {}) {
  const cwd = options.cwd || process.cwd();
  const metadata = identity(options.environment || process.env);
  const now = options.now || Date.now;
  const heartbeatMs = options.heartbeatMs ?? 30000;
  const sink = options.sink || artifactSink(cwd, metadata);
  const active = new Map();
  const completed = new Set();
  const startedAt = now();
  let startedFiles = 0;
  let timer;
  const record = (event, extra = {}) => ({
    schemaVersion: 1,
    event,
    ...metadata,
    at: new Date(now()).toISOString(),
    ...extra,
  });
  const snapshot = (event) =>
    record(event, {
      elapsedMs: Math.max(0, now() - startedAt),
      startedFiles,
      completedFiles: completed.size,
      activeFiles: [...active].map(([file, at]) => ({ file, elapsedMs: Math.max(0, now() - at) })),
      artifactWriteFailed: Boolean(sink.failed),
    });
  const line = (value) => `${PREFIX}${JSON.stringify(value)}\n`;
  const tick = () =>
    new Promise((done) => {
      timer = setTimeout(() => done({ heartbeat: true }), heartbeatMs);
      timer.unref?.();
    });
  const iterator = source[Symbol.asyncIterator]();
  let next = iterator.next().then((result) => ({ result }));
  let heartbeat = tick();
  try {
    const start = snapshot("phase-start");
    sink.write(start);
    yield line(start);
    while (true) {
      const received = await Promise.race([next, heartbeat]);
      if (received.heartbeat) {
        const status = snapshot("heartbeat");
        sink.write(status);
        yield line(status);
        heartbeat = tick();
        continue;
      }
      if (received.result.done) break;
      const event = received.result.value;
      const file = wrapperFile(event, cwd);
      if (file && event.type === "test:dequeue" && !active.has(file) && !completed.has(file)) {
        active.set(file, now());
        startedFiles++;
        sink.write(record("file-start", { file }));
      } else if (file && event.type === "test:complete" && active.has(file)) {
        sink.write(
          record("file-end", {
            file,
            elapsedMs: Math.max(0, now() - active.get(file)),
            passed: event.data.details?.passed === true,
          })
        );
        active.delete(file);
        completed.add(file);
      }
      next = iterator.next().then((result) => ({ result }));
    }
    const end = snapshot("phase-end");
    sink.write(end);
    yield line(end);
  } finally {
    clearTimeout(timer);
    sink.close();
  }
}

export default async function* unitProgressReporter(source) {
  yield* createUnitProgressReporter(source);
}
