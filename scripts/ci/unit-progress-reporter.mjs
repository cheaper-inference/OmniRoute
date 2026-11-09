import { closeSync, mkdirSync, openSync, writeSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import {
  createUnitDiagnostics,
  diagnosticIdentity,
  createIntegrationDiagnostics,
  integrationDiagnosticIdentity,
  integrationSourcePath,
} from "./unit-diagnostics.mjs";

const UNIT_POLICY = {
  prefix: "[unit-progress] ",
  directory: "unit-progress",
  identity: diagnosticIdentity,
  diagnostics: createUnitDiagnostics,
  acceptsFile: (file) => /^tests\/unit\/.+\.test\.(?:[cm]?[jt]s)$/.test(file),
};
const INTEGRATION_POLICY = {
  prefix: "[integration-progress] ",
  directory: "integration-progress",
  identity: integrationDiagnosticIdentity,
  diagnostics: createIntegrationDiagnostics,
  acceptsFile: (file, cwd) => integrationSourcePath(file, cwd) === file,
};
const PHASES = new Set(["primary", "dashboard", "serial"]);

function identity(environment, policy) {
  const keep = (key, pattern) => (pattern.test(environment[key] || "") ? environment[key] : null);
  return {
    phase:
      policy === INTEGRATION_POLICY
        ? "integration"
        : PHASES.has(environment.OMNIROUTE_UNIT_PHASE)
          ? environment.OMNIROUTE_UNIT_PHASE
          : "unknown",
    shard: keep("TEST_SHARD", /^\d+\/\d+$/),
    sha: keep("GITHUB_SHA", /^[0-9a-f]{40}$/),
    runId: keep("GITHUB_RUN_ID", /^\d+$/),
    runAttempt: keep("GITHUB_RUN_ATTEMPT", /^\d+$/),
    ...policy.identity(environment),
  };
}

function wrapperFile(event, cwd, policy) {
  if (event.type !== "test:dequeue" && event.type !== "test:complete") return null;
  const data = event.data;
  // Child events describe test bodies, not completion of the isolated file process.
  if (!data || data.entryFile || data.nesting !== 0) return null;
  if (typeof data.file !== "string" || typeof data.name !== "string") return null;
  if (/[\0\r\n]/.test(data.file) || /[\0\r\n]/.test(data.name)) return null;
  if (resolve(cwd, data.name) !== resolve(cwd, data.file)) return null;
  const file = relative(cwd, resolve(cwd, data.file)).split(sep).join("/");
  return policy.acceptsFile(file, cwd) ? file : null;
}

function artifactSink(cwd, metadata, policy) {
  let descriptor;
  let failed = false;
  try {
    const directory = join(cwd, ".artifacts", policy.directory);
    mkdirSync(directory, { recursive: true });
    const shard = (metadata.shard || "unknown").replace("/", "-of-");
    descriptor = openSync(
      join(
        directory,
        `${metadata.phase}-${shard}-${metadata.invocationId || "unbound"}-${process.pid}.jsonl`
      ),
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

/** Metadata-only diagnostics; never change test selection, signals, or exit codes. */
export async function* createUnitProgressReporter(source, options = {}) {
  yield* createProgressReporter(source, options, UNIT_POLICY);
}

export async function* createIntegrationProgressReporter(source, options = {}) {
  yield* createProgressReporter(source, options, INTEGRATION_POLICY);
}

async function* createProgressReporter(source, options, policy) {
  const cwd = options.cwd || process.cwd();
  const metadata = identity(options.environment || process.env, policy);
  const now = options.now || Date.now;
  const heartbeatMs = options.heartbeatMs ?? 30000;
  const sink = options.sink || artifactSink(cwd, metadata, policy);
  const active = new Map();
  const completed = new Set();
  const diagnostics = policy.diagnostics(cwd);
  const startedAt = now();
  let startedFiles = 0;
  let timer;
  const record = (event, extra = {}) => ({
    schemaVersion: 2,
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
  const line = (value) => `${policy.prefix}${JSON.stringify(value)}\n`;
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
      const failure = diagnostics.observe(event);
      if (failure) sink.write(record("test-failure", failure));
      const file = wrapperFile(event, cwd, policy);
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
    const end = {
      ...snapshot("phase-end"),
      diagnostics: diagnostics.snapshot({
        activeFiles: active.size,
        artifactWriteFailed: Boolean(sink.failed),
      }),
    };
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
