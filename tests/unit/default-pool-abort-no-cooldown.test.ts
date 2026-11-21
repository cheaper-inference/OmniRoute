import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-abort-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type PoolLike = { rate429count: number; getStats: () => { cooldown?: number; active?: number } };

// llm7 is a registry provider with a session pool: DefaultExecutor builds the pool itself.
async function runWithFetchError(makeError: () => Error): Promise<{
  pool: PoolLike;
  before: number;
}> {
  const executor = new DefaultExecutor("llm7") as unknown as {
    execute: (input: unknown) => Promise<unknown>;
    getPool: () => PoolLike;
  };
  const pool = executor.getPool();
  const before = pool.rate429count;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw makeError();
  }) as typeof fetch;
  try {
    await assert.rejects(() =>
      executor.execute({
        model: "gpt-4o-mini-2024-07-18",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "unit-test-key" },
      })
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
  return { pool, before };
}

test("a client abort does not put the pooled session into cooldown", async () => {
  const { pool, before } = await runWithFetchError(() => {
    const error = new Error("This operation was aborted");
    error.name = "AbortError";
    return error;
  });
  assert.equal(pool.rate429count, before, "an abort is not a rate limit");
});

test("a real upstream failure still cools the session down", async () => {
  const { pool, before } = await runWithFetchError(() => new Error("connect ECONNRESET"));
  assert.equal(pool.rate429count, before + 1);
});
