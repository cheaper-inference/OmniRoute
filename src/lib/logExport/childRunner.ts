import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, type ChildProcess } from "node:child_process";
import type { Readable } from "node:stream";
import { DATA_DIR } from "../db/core";
import { safeExportError } from "./safeExportError";
import { EXPORT_PROXY_TLS_ENV } from "./childEnvironment";
import type { ExportChildStart, ExportChildReply } from "./childProtocol";

interface ResolutionContext {
  moduleDir?: string;
  cwd?: string;
  entryFile?: string | null;
  fileExists?: (candidate: string) => boolean;
}
/** Same explicit packaging/runtime search order as resolveCallLogArtifactWorker. */
export function resolveLogExportChild(context: ResolutionContext = {}) {
  const moduleDir = context.moduleDir ?? path.dirname(fileURLToPath(import.meta.url));
  const cwd = context.cwd ?? process.cwd();
  const entryFile = context.entryFile === undefined ? process.argv[1] : context.entryFile;
  const exists =
    context.fileExists ??
    ((candidate: string) => Reflect.apply(fs.existsSync, fs, [candidate]) as boolean);
  const relative = "src/lib/logExport/exportChild.js";
  const entryJs = entryFile ? path.join(path.dirname(path.resolve(entryFile)), relative) : null;
  const cwdJs = path.resolve(cwd, relative);
  for (const candidate of [path.join(moduleDir, "exportChild.js"), entryJs, cwdJs]) {
    if (candidate && exists(candidate)) return { childFile: candidate, execArgv: [] as string[] };
  }
  for (const candidate of [
    path.join(moduleDir, "exportChild.ts"),
    path.resolve(cwd, "src/lib/logExport/exportChild.ts"),
  ]) {
    if (exists(candidate)) return { childFile: candidate, execArgv: ["--import", "tsx/esm"] };
  }
  return { childFile: entryJs ?? cwdJs, execArgv: [] as string[] };
}
interface TestOptions {
  modulePath: string;
  beforeAck?: () => Promise<void>;
  onSpawn?: (child: ChildProcess) => void;
  config?: Record<string, unknown>;
}
let testOptions: TestOptions | null = null;
/** Explicit test hook; production never derives this from env, argv, DB or API input. */
export function __setLogExportChildOptionsForTest(options: TestOptions | null): void {
  testOptions = options;
}
function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
function forwardOutput(
  stream: Readable | null,
  log: (message: string) => void,
  secrets: readonly string[],
  observe?: (chunk: string) => void
): () => void {
  if (!stream) return () => {};
  let pending = "";
  let oversized = false;
  stream.setEncoding("utf8");
  const data = (chunk: string) => {
    observe?.(chunk);
    for (const part of chunk.split(/(?<=\n)/)) {
      if (pending.length + part.length > 8192) oversized = true;
      if (!oversized) pending += part;
      if (part.endsWith("\n")) {
        log(
          `[LogExport child] ${oversized ? "[oversized output omitted]" : safeExportError(pending.trimEnd(), secrets)}`
        );
        pending = "";
        oversized = false;
      }
    }
  };
  const end = () => {
    if (pending) log(`[LogExport child] ${safeExportError(pending, secrets)}`);
  };
  stream.on("data", data);
  stream.on("end", end);
  return () => {
    stream.off("data", data);
    stream.off("end", end);
  };
}

type BatchReply = Extract<ExportChildReply, { kind: "batch" }>;

/** Mutable per-run state shared by the IPC handlers below. */
interface ChildRunState {
  done: boolean;
  finishing: boolean;
  processing: boolean;
  failure: Error | null;
  cursor: number;
  exported: number;
  heapExhausted: boolean;
}

interface ReplyContext {
  start: ExportChildStart;
  child: ChildProcess;
  fixture: TestOptions | null;
  onBatch: (cursor: number, count: number) => void;
  stop: (error?: unknown) => void;
}

function buildExportChildEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { DATA_DIR, NODE_ENV: process.env.NODE_ENV ?? "production" };
  if (process.env.ELECTRON_RUN_AS_NODE) env.ELECTRON_RUN_AS_NODE = process.env.ELECTRON_RUN_AS_NODE;
  // Legacy disk filenames depend on local time. Explicit TZ is the only extra path input.
  if (process.env.TZ) env.TZ = process.env.TZ;
  // Preserve outbound routing/TLS trust without copying unrelated server secrets.
  for (const name of EXPORT_PROXY_TLS_ENV) {
    if (process.env[name] !== undefined) env[name] = process.env[name];
  }
  return env;
}

function spawnExportChildProcess(): ChildProcess {
  const { childFile, execArgv } = resolveLogExportChild();
  const heapMb = positiveInteger(process.env.OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB, 1024);
  return spawn(
    process.execPath,
    [
      `--max-old-space-size=${heapMb}`,
      "--disable-warning=ExperimentalWarning",
      ...execArgv,
      childFile,
    ],
    {
      env: buildExportChildEnv(),
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe", "ipc"],
    }
  );
}

function isAcceptableBatch(
  reply: ExportChildReply,
  state: ChildRunState,
  start: ExportChildStart
): reply is BatchReply {
  if (reply.kind !== "batch" || state.processing || state.done) return false;
  const { cursorRowId, count } = reply;
  return (
    Number.isSafeInteger(cursorRowId) &&
    cursorRowId > state.cursor &&
    Number.isSafeInteger(count) &&
    count > 0 &&
    count <= Math.min(start.batchSize, start.maxRowsPerRun - state.exported)
  );
}

async function acknowledgeBatch(
  reply: BatchReply,
  state: ChildRunState,
  ctx: ReplyContext
): Promise<void> {
  try {
    await ctx.fixture?.beforeAck?.();
    if (state.finishing) return;
    ctx.onBatch(reply.cursorRowId, reply.count);
    state.cursor = reply.cursorRowId;
    state.exported += reply.count;
    state.processing = false;
    ctx.child.send({ kind: "ack", cursorRowId: state.cursor }, (err) => {
      if (err) ctx.stop(err);
    });
  } catch (err) {
    ctx.stop(err);
  }
}

function handleChildReply(reply: ExportChildReply, state: ChildRunState, ctx: ReplyContext) {
  if (state.finishing) return;
  if (!reply || typeof reply !== "object") {
    ctx.stop(new Error("Invalid log export child message"));
    return;
  }
  if (reply.kind === "error") {
    ctx.stop(new Error(String(reply.message)));
    return;
  }
  if (reply.kind === "done") {
    if (state.processing) {
      ctx.stop(new Error("Child completed before batch acknowledgement"));
      return;
    }
    state.done = true;
    // Let normal exit flush IPC/stdio; the run timer still bounds a stuck child.
    return;
  }
  if (!isAcceptableBatch(reply, state, ctx.start)) {
    ctx.stop(new Error("Invalid log export child batch"));
    return;
  }
  state.processing = true;
  void acknowledgeBatch(reply, state, ctx);
}

function childExitError(
  state: ChildRunState,
  code: number | null,
  signal: NodeJS.Signals | null
): Error | null {
  if (state.failure) return state.failure;
  if (state.heapExhausted || signal === "SIGABRT" || code === 134) {
    const cause = state.heapExhausted
      ? "V8 heap exhausted (JavaScript heap out of memory)"
      : "aborted (possible V8 heap exhaustion)";
    return new Error(
      `Log export child ${cause}; lower batch size or raise OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB. The cursor remains at the last acknowledged batch.`
    );
  }
  if (!state.done || code !== 0) {
    return new Error(
      `Log export child exited without successful done (code ${code}, signal ${signal})`
    );
  }
  return null;
}

/** Resolves/rejects only once the child has closed, including after TERM → KILL escalation. */
export function runExportChild(
  start: ExportChildStart,
  onBatch: (cursor: number, count: number) => void,
  secretValues: readonly string[]
): Promise<void> {
  const fixture = testOptions;
  const timeoutMs = positiveInteger(
    process.env.OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS,
    15 * 60 * 1000
  );
  const child = spawnExportChildProcess();
  const state: ChildRunState = {
    done: false,
    finishing: false,
    processing: false,
    failure: null,
    cursor: start.cursorRowId,
    exported: 0,
    heapExhausted: false,
  };
  let stderrTail = "";
  const stopStdout = forwardOutput(child.stdout, console.log, secretValues);
  const stopStderr = forwardOutput(child.stderr, console.error, secretValues, (chunk) => {
    const text = stderrTail + chunk;
    state.heapExhausted ||= /Reached heap limit|JavaScript heap out of memory/i.test(text);
    stderrTail = text.slice(-128);
  });
  return new Promise<void>((resolve, reject) => {
    let killTimer: NodeJS.Timeout | undefined;
    const stop = (error?: unknown) => {
      if (state.finishing) return;
      state.finishing = true;
      if (error) state.failure = new Error(safeExportError(error, secretValues));
      child.kill("SIGTERM");
      killTimer = setTimeout(() => {
        child.kill("SIGKILL");
      }, 500);
    };
    const timeout = setTimeout(
      () => stop(new Error(`Log export timed out after ${timeoutMs}ms`)),
      timeoutMs
    );
    const error = (err: Error) => stop(err);
    const ctx: ReplyContext = { start, child, fixture, onBatch, stop };
    const message = (reply: ExportChildReply) => handleChildReply(reply, state, ctx);
    const close = (code: number | null, signal: NodeJS.Signals | null) => {
      state.finishing = true;
      clearTimeout(timeout);
      clearTimeout(killTimer);
      child.off("message", message);
      child.off("error", error);
      child.off("close", close);
      stopStdout();
      stopStderr();
      const failure = childExitError(state, code, signal);
      if (failure) reject(failure);
      else resolve();
    };
    child.on("message", message);
    child.on("error", error);
    child.on("close", close);
    try {
      fixture?.onSpawn?.(child);
      child.send(
        {
          ...start,
          ...(fixture ? { testModulePath: fixture.modulePath, testConfig: fixture.config } : {}),
        },
        (err) => {
          if (err) stop(err);
        }
      );
    } catch (err) {
      stop(err);
    }
  });
}
