// #16373: after a log rotation the structured logger must reopen the current
// log path instead of appending to the renamed file through the descriptor the
// pino worker opened at startup — without changing anything else about the
// default logging path (no buffering of its own, backpressure, flushSync/flush,
// exit-time flush of the live transport).
import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const rotation = await import("../../src/lib/logRotation.ts");

function tempDir(label: string): string {
  return mkdtempSync(join(tmpdir(), `omniroute-16373-${label}-`));
}

async function waitFor(predicate: () => boolean, timeoutMs = 3000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (predicate()) return true;
    await new Promise((resolveTick) => setTimeout(resolveTick, 20));
  }
  return predicate();
}

// ── Rotation listeners ──────────────────────────────────────────────────────

test("rotateIfNeeded reports the rotated path and notifies listeners once", () => {
  const dir = tempDir("listeners");
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "x".repeat(150));
  const received: string[] = [];
  const unsubscribe = rotation.onLogRotation((currentPath: string) => received.push(currentPath));
  try {
    const rotatedPath = rotation.rotateIfNeeded(logPath, 100);
    assert.ok(rotatedPath, "rotation must report the rotated file path");
    assert.ok(existsSync(rotatedPath as string), "reported path must exist");
    assert.deepEqual(received, [logPath], "listener gets the current path exactly once");
  } finally {
    unsubscribe();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("no rotation (below size, missing file) means no notification and null", () => {
  const dir = tempDir("silent");
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small\n");
  let calls = 0;
  const unsubscribe = rotation.onLogRotation(() => {
    calls += 1;
  });
  try {
    assert.equal(rotation.rotateIfNeeded(logPath, 50 * 1024 * 1024), null);
    assert.equal(rotation.rotateIfNeeded(join(dir, "missing.log"), 100), null);
    assert.equal(calls, 0);
    assert.ok(existsSync(logPath), "file below the limit stays in place");
  } finally {
    unsubscribe();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a throwing listener does not block others; duplicate subscribe notifies once; unsubscribe stops", () => {
  const dir = tempDir("isolation");
  const logPath = join(dir, "app.log");
  let healthy = 0;
  const healthyListener = () => {
    healthy += 1;
  };
  const failing = rotation.onLogRotation(() => {
    throw new Error("listener down");
  });
  const first = rotation.onLogRotation(healthyListener);
  rotation.onLogRotation(healthyListener);
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    writeFileSync(logPath, "x".repeat(150));
    assert.ok(rotation.rotateIfNeeded(logPath, 100), "rotation still happens");
    assert.equal(
      healthy,
      1,
      "healthy listener runs once despite the failing one and the duplicate"
    );
    first();
    writeFileSync(logPath, "x".repeat(150));
    assert.ok(rotation.rotateIfNeeded(logPath, 100));
    assert.equal(healthy, 1, "unsubscribed listener stays silent");
  } finally {
    console.warn = originalWarn;
    failing();
    first();
    rmSync(dir, { recursive: true, force: true });
  }
});

// ── Periodic check: own vs external rotation, bounded notifications ─────────

async function withRotationTimer(
  logPath: string,
  body: (notifications: () => number) => Promise<void>
): Promise<void> {
  const saved = {
    toFile: process.env.APP_LOG_TO_FILE,
    path: process.env.APP_LOG_FILE_PATH,
    interval: process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS,
    maxSize: process.env.APP_LOG_MAX_FILE_SIZE,
  };
  process.env.APP_LOG_TO_FILE = "true";
  process.env.APP_LOG_FILE_PATH = logPath;
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "25";
  process.env.APP_LOG_MAX_FILE_SIZE = "100";
  let count = 0;
  const unsubscribe = rotation.onLogRotation(() => {
    count += 1;
  });
  rotation.closeLogRotation();
  rotation.initLogRotation();
  try {
    await body(() => count);
  } finally {
    rotation.closeLogRotation();
    unsubscribe();
    for (const [key, value] of [
      ["APP_LOG_TO_FILE", saved.toFile],
      ["APP_LOG_FILE_PATH", saved.path],
      ["APP_LOG_ROTATION_CHECK_INTERVAL_MS", saved.interval],
      ["APP_LOG_MAX_FILE_SIZE", saved.maxSize],
    ] as const) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("external rename notifies once per absence window, never once per tick", async () => {
  const dir = tempDir("external");
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small\n");
  try {
    await withRotationTimer(logPath, async (notifications) => {
      renameSync(logPath, join(dir, "app.external-1.log"));
      assert.ok(await waitFor(() => notifications() === 1), "external rotation is detected");
      // Nobody recreates the file (e.g. the reopen failed): later ticks must not
      // keep rebuilding the writer.
      await new Promise((resolveTick) => setTimeout(resolveTick, 250));
      assert.equal(notifications(), 1, "bounded to one notification while the file is absent");

      // The current file reappears (the writer reopened it) -> re-armed.
      writeFileSync(logPath, "small\n");
      await new Promise((resolveTick) => setTimeout(resolveTick, 100));
      assert.equal(notifications(), 1, "an existing file never notifies");
      renameSync(logPath, join(dir, "app.external-2.log"));
      assert.ok(
        await waitFor(() => notifications() === 2),
        "the next external rotation is detected again"
      );
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("own rotation from the periodic check notifies exactly once", async () => {
  const dir = tempDir("own");
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small\n");
  try {
    await withRotationTimer(logPath, async (notifications) => {
      writeFileSync(logPath, "x".repeat(150));
      assert.ok(await waitFor(() => notifications() === 1), "own rotation notifies");
      // The renamed file is not recreated by this test: the external-rotation
      // check must not re-notify for the rotation this process just did.
      await new Promise((resolveTick) => setTimeout(resolveTick, 250));
      assert.equal(notifications(), 1);
      const rotated = readdirSync(dir).filter((f) => f !== "app.log");
      assert.equal(rotated.length, 1);
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ── ReopenableTransportStream: a pure delegate, no buffering of its own ─────

class FakeTransport extends EventEmitter {
  writes: string[] = [];
  messages: unknown[][] = [];
  calls: string[] = [];
  writeResult = true;
  constructor(readonly id: number) {
    super();
    this.on("message", (...args: unknown[]) => this.messages.push(args));
  }
  write(chunk: string): boolean {
    this.writes.push(chunk);
    return this.writeResult;
  }
  flushSync(): void {
    this.calls.push("flushSync");
  }
  flush(cb: (err?: Error | null) => void): void {
    this.calls.push("flush");
    cb();
  }
  end(): void {
    this.calls.push("end");
    queueMicrotask(() => this.emit("close"));
  }
}

const { ReopenableTransportStream } = await import("../../src/shared/utils/logger.ts");

function makeStream() {
  const generations: FakeTransport[] = [];
  let failNext = false;
  const stream = new ReopenableTransportStream((() => {
    if (failNext) throw new Error("worker spawn failed");
    const next = new FakeTransport(generations.length);
    generations.push(next);
    return next;
  }) as unknown as ConstructorParameters<typeof ReopenableTransportStream>[0]);
  return { stream, generations, failNextBuild: () => (failNext = true) };
}

test("write delegates synchronously and returns the transport's backpressure signal", () => {
  const { stream, generations } = makeStream();
  assert.equal(stream.write("a\n"), true);
  generations[0].writeResult = false;
  assert.equal(stream.write("b\n"), false, "write() must surface the transport's false");
  assert.deepEqual(generations[0].writes, ["a\n", "b\n"], "no buffering in the proxy");
  let drained = 0;
  stream.on("drain", () => {
    drained += 1;
  });
  generations[0].emit("drain");
  assert.equal(drained, 1, "drain of the current transport reaches the proxy");
});

test("reopen switches writes, flushes+ends the previous transport, replays pino's config", async () => {
  const { stream, generations } = makeStream();
  const config = { code: "PINO_CONFIG", config: { messageKey: "msg" } };
  stream.emit("message", config);
  assert.deepEqual(generations[0].messages, [[config]], "pino's config reaches the transport");

  stream.write("before\n");
  await stream.reopen();
  stream.write("after\n");

  assert.equal(generations.length, 2);
  assert.deepEqual(generations[0].writes, ["before\n"]);
  assert.deepEqual(generations[1].writes, ["after\n"]);
  assert.deepEqual(generations[0].calls, ["flushSync", "end"], "previous transport is drained");
  assert.deepEqual(generations[1].messages, [[config]], "config replayed to the new transport");

  // Events from the retired transport no longer reach the proxy.
  let drained = 0;
  let closed = 0;
  stream.on("drain", () => (drained += 1));
  stream.on("close", () => (closed += 1));
  generations[0].emit("drain");
  generations[0].emit("close");
  assert.equal(drained + closed, 0);
  generations[1].emit("drain");
  assert.equal(drained, 1);

  // flushSync / flush / end act on the current transport (exit-time flush).
  stream.flushSync();
  await new Promise<void>((resolveFlush) => stream.flush(() => resolveFlush()));
  stream.end();
  await new Promise((resolveTick) => setImmediate(resolveTick));
  assert.deepEqual(generations[1].calls, ["flushSync", "flush", "end"]);
  assert.equal(closed, 1, "close of the current transport reaches the proxy");

  await stream.reopen();
  assert.equal(generations.length, 2, "reopen after end() is a no-op");
});

test("a failed reopen keeps writing to the current transport and reports on stderr", async () => {
  const { stream, generations, failNextBuild } = makeStream();
  const notices: string[] = [];
  const originalWrite = process.stderr.write.bind(process.stderr);
  (process.stderr as unknown as { write: (chunk: unknown) => boolean }).write = (chunk) => {
    notices.push(String(chunk));
    return true;
  };
  try {
    failNextBuild();
    await stream.reopen();
    // An error emitted on the proxy itself is reported, never thrown (#6360).
    stream.emit("error", new Error("simulated"));
  } finally {
    (process.stderr as unknown as { write: typeof originalWrite }).write = originalWrite;
  }
  stream.write("still-here\n");
  assert.deepEqual(generations[0].writes, ["still-here\n"]);
  assert.deepEqual(generations[0].calls, [], "the live transport is not closed on failure");
  assert.ok(notices.some((line) => line.includes("failed to reopen log file after rotation")));
  assert.ok(notices.some((line) => line.includes("log transport write failed")));
});

// ── Real logger, real worker transport, real process exit ───────────────────

test("shared logger writes to the current file after rotation and flushes it on process exit", () => {
  const dir = tempDir("e2e");
  const logPath = join(dir, "logs", "app.log");
  const lines = 200;
  const code = `
    const { logger } = await import(${JSON.stringify(join(repoRoot, "src/shared/utils/logger.ts"))});
    const { rotateIfNeeded } = await import(${JSON.stringify(join(repoRoot, "src/lib/logRotation.ts"))});
    const { existsSync, readFileSync, readdirSync } = await import("node:fs");
    const { dirname, join } = await import("node:path");
    const path = ${JSON.stringify(logPath)};
    logger.info({ marker: "before-rotation" }, "before");
    const start = Date.now();
    while (!(existsSync(path) && readFileSync(path, "utf8").includes("before-rotation"))) {
      if (Date.now() - start > 8000) { console.error("before line never reached the file"); process.exit(3); }
      await new Promise((r) => setTimeout(r, 20));
    }
    rotateIfNeeded(path, 1);
    const rotatedName = readdirSync(dirname(path)).find((f) => f !== "app.log");
    if (existsSync(path) || !rotatedName) { console.error("no rotation"); process.exit(4); }
    const rotated = join(dirname(path), rotatedName);
    console.error("ROTATED=" + rotated);
    await new Promise((r) => setImmediate(r));
    for (let i = 0; i < ${lines}; i++) logger.info({ marker: "after-rotation-" + i }, "after");
    process.exit(0);
  `;
  try {
    const result = spawnSync(
      process.execPath,
      ["--import", "tsx/esm", "--input-type=module", "-e", code],
      {
        cwd: repoRoot,
        encoding: "utf8",
        timeout: 60_000,
        env: {
          ...process.env,
          NODE_ENV: "production",
          DATA_DIR: dir,
          APP_LOG_TO_FILE: "true",
          APP_LOG_FILE_PATH: logPath,
          APP_LOG_LEVEL: "info",
          APP_LOG_ROTATION_CHECK_INTERVAL_MS: "600000",
        },
        stdio: ["ignore", "ignore", "pipe"],
      }
    );
    assert.equal(result.status, 0, `child failed: ${result.stderr}`);
    const rotatedPath = /ROTATED=(.+)/.exec(result.stderr)?.[1]?.trim();
    assert.ok(rotatedPath && existsSync(rotatedPath), "rotated file exists");
    const rotatedContents = readFileSync(rotatedPath as string, "utf8");
    assert.ok(rotatedContents.includes("before-rotation"), "pre-rotation line stays rotated");
    assert.ok(!rotatedContents.includes("after-rotation-"), "no post-rotation line leaks back");
    assert.ok(existsSync(logPath), "the current log file is recreated");
    const current = readFileSync(logPath, "utf8");
    for (let i = 0; i < lines; i++) {
      assert.ok(
        current.includes(`"marker":"after-rotation-${i}"`),
        `line ${i} written right before process.exit() must be flushed to the current file`
      );
    }
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
