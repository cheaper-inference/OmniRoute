/**
 * A fetch() failure against an Antigravity URL that still has a fallback is a
 * retry, not a failed request: execute() continues to the next base URL and
 * the client gets that answer. Logging it at error fills the error stream
 * with requests that succeeded. Only the last URL, which is rethrown, is an
 * error. Node reports the socket reason on error.cause, which the log must
 * keep — error.message alone is the bare "fetch failed".
 */
import test from "node:test";
import assert from "node:assert/strict";

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-fetch-log-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-antigravity-fetch-log";

const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { seedAntigravityIdeVersionCache, clearAntigravityVersionCaches } =
  await import("../../open-sse/services/antigravityVersion.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  clearAntigravityVersionCaches();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Levels = { error: string[]; warn: string[] };

function capturingLog(): {
  log: { debug(): void; info(): void; warn(...a: unknown[]): void; error(...a: unknown[]): void };
  levels: Levels;
} {
  const levels: Levels = { error: [], warn: [] };
  const log = {
    debug() {},
    info() {},
    warn(...a: unknown[]) {
      levels.warn.push(a.map(String).join(" "));
    },
    error(...a: unknown[]) {
      levels.error.push(a.map(String).join(" "));
    },
  };
  return { log, levels };
}

function fetchFailed(code: string): Error {
  const cause = Object.assign(new Error("read " + code), { code });
  return Object.assign(new TypeError("fetch failed"), { cause });
}

function okSSE(): Response {
  return new Response(
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

const input = {
  model: "antigravity/gemini-3.8-flash-high",
  body: { request: { contents: [] } },
  stream: false,
  credentials: { accessToken: "token", projectId: "project-1" },
};

test("a fetch failure with a fallback URL left logs warn, names the cause, and the request still succeeds", async () => {
  const executor = new AntigravityExecutor();
  executor.config = {
    ...executor.config,
    baseUrls: ["https://daily-cloudcode-pa.googleapis.com", "https://cloudcode-pa.googleapis.com"],
  };
  const originalFetch = globalThis.fetch;
  seedAntigravityIdeVersionCache("2.1.1");
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    if (calls === 1) throw fetchFailed("ECONNRESET");
    return okSSE();
  }) as typeof fetch;
  const { log, levels } = capturingLog();

  try {
    const result = await executor.execute({ ...input, log });
    assert.equal(result.response.status, 200);
    assert.equal(calls, 2, "the fallback URL must be tried");
    assert.equal(levels.error.length, 0, "a recovered failure is not an error");
    assert.equal(levels.warn.length, 1);
    assert.match(levels.warn[0], /cause: ECONNRESET/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a fetch failure on the last URL logs error and still names the cause", async () => {
  const executor = new AntigravityExecutor();
  executor.config = {
    ...executor.config,
    baseUrls: ["https://daily-cloudcode-pa.googleapis.com", "https://cloudcode-pa.googleapis.com"],
  };
  const originalFetch = globalThis.fetch;
  seedAntigravityIdeVersionCache("2.1.1");
  globalThis.fetch = (async () => {
    throw fetchFailed("ECONNRESET");
  }) as typeof fetch;
  const { log, levels } = capturingLog();

  try {
    await assert.rejects(() => executor.execute({ ...input, log }));
    assert.equal(levels.warn.length, 1, "the first URL still has a fallback");
    assert.equal(levels.error.length, 1, "the last URL is the real failure");
    assert.match(levels.error[0], /cause: ECONNRESET/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
