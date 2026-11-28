import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Lifecycle of the in-memory bridge that stands in for a Responses API call-log
// row until its artifact lands. Entries hold full conversation histories, so
// each one must leave memory once its save settles or its TTL passes.
//
// Its own file on purpose: the sweep timer starts once per process, on the first
// seed, and the sweep test below needs that first seed under mocked timers.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-continuation-bridge-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/db/responsesContinuationStore.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifactWriter = await import("../../src/lib/usage/callLogArtifactWriter.ts");

const API_KEY_ID = "key-bridge-lifecycle";
const INPUT = [{ type: "message", role: "user", content: "history" }];
const OUTPUT = [{ type: "message", role: "assistant", content: "answer" }];
const PIPELINE = {
  clientRawRequest: { body: { input: INPUT } },
  clientResponse: { output: OUTPUT },
};
const STATE = { input: INPUT, output: OUTPUT };
const SEED_TTL_MS = 60_000;
const SWEEP_MS = 30_000;
const MAX_ENTRIES = 512;

test.after(async () => {
  await artifactWriter.closeCallLogArtifactWriter();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seed(responseId: string) {
  store.seedPendingContinuationState(responseId, API_KEY_ID, PIPELINE, false);
}

function resolve(responseId: string) {
  return store.resolvePreviousResponseState(responseId, API_KEY_ID);
}

function fullSave(responseId: string, extra: Record<string, unknown> = {}) {
  return callLogs.saveCallLog({
    method: "POST",
    path: "/v1/responses",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    apiKeyId: API_KEY_ID,
    responseId,
    pipeline: PIPELINE,
    ...extra,
  });
}

function detailStateFor(responseId: string) {
  const row = core
    .getDbInstance()
    .prepare("SELECT detail_state FROM call_logs WHERE response_id = ?")
    .get(responseId) as { detail_state: string } | undefined;
  return row?.detail_state ?? null;
}

async function withCallLogTrigger(
  event: "INSERT" | "UPDATE",
  message: string,
  run: (dropTrigger: () => void) => Promise<void>
) {
  const db = core.getDbInstance();
  const dropTrigger = () => db.exec("DROP TRIGGER IF EXISTS bridge_lifecycle_fault");
  db.exec(`
    CREATE TRIGGER bridge_lifecycle_fault BEFORE ${event} ON call_logs
    BEGIN
      SELECT RAISE(ABORT, '${message}');
    END;
  `);
  try {
    await run(dropTrigger);
  } finally {
    dropTrigger();
  }
}

test("the sweep evicts expired entries that nothing reads again", (t) => {
  t.mock.timers.enable({ apis: ["setInterval", "Date"], now: 1_000_000 });
  seed("resp-swept");
  assert.equal(store.getPendingContinuationStateCount(), 1);

  t.mock.timers.tick(SWEEP_MS);
  assert.equal(store.getPendingContinuationStateCount(), 1);

  t.mock.timers.tick(SWEEP_MS);
  assert.equal(store.getPendingContinuationStateCount(), 0);
});

test("pending count excludes expired entries even before the sweep interval", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_500_000 });
  seed("resp-count-expired");
  assert.equal(store.getPendingContinuationStateCount(), 1);

  // No lookup, fresh insertion, or interval callback has run at this point.
  // The diagnostic must not count a full-history bridge after its TTL.
  t.mock.timers.setTime(1_500_000 + SEED_TTL_MS);
  assert.equal(store.getPendingContinuationStateCount(), 0);
});

test("seeding evicts entries that are already expired", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 2_000_000 });
  seed("resp-expired");
  t.mock.timers.setTime(2_000_000 + SEED_TTL_MS);
  seed("resp-fresh");
  assert.equal(store.getPendingContinuationStateCount(), 1);
  store.clearPendingContinuationState("resp-fresh");
});

test("reseeding an id moves it to the back of the eviction order", () => {
  // One slot short of the cap, so the reseed itself evicts nothing.
  const ids = Array.from({ length: MAX_ENTRIES - 1 }, (_, i) => `resp-fifo-${i}`);
  const added = ["resp-fifo-new-1", "resp-fifo-new-2"];
  ids.forEach(seed);
  seed(ids[0]);
  added.forEach(seed);

  assert.equal(store.getPendingContinuationStateCount(), MAX_ENTRIES);
  assert.deepEqual(resolve(ids[0]), STATE);
  assert.equal(resolve(ids[1]), null);

  [...ids, ...added].forEach(store.clearPendingContinuationState);
  assert.equal(store.getPendingContinuationStateCount(), 0);
});

test("a save that publishes its artifact hands over to the durable row", async () => {
  const save = fullSave("resp-ready");
  assert.equal(store.getPendingContinuationStateCount(), 1);
  assert.deepEqual(resolve("resp-ready"), STATE);

  await save;

  assert.equal(detailStateFor("resp-ready"), "ready");
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.deepEqual(resolve("resp-ready"), STATE);
});

test("a metadata-only save leaves the bridge of a full save in place", async () => {
  seed("resp-metadata");
  await callLogs.saveCallLog(
    {
      method: "POST",
      path: "/v1/responses",
      status: 200,
      model: "test-model",
      provider: "test-provider",
      apiKeyId: API_KEY_ID,
      responseId: "resp-metadata",
    },
    true
  );

  assert.equal(store.getPendingContinuationStateCount(), 1);
  assert.deepEqual(resolve("resp-metadata"), STATE);
  store.clearPendingContinuationState("resp-metadata");
});

test("a save with no detail to publish releases the bridge", async () => {
  seed("resp-no-detail");
  await fullSave("resp-no-detail", { noLog: true });

  assert.equal(detailStateFor("resp-no-detail"), "none");
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.equal(resolve("resp-no-detail"), null);
});

test("a failed row insert releases the bridge", async () => {
  await withCallLogTrigger("INSERT", "forced insert failure", async () => {
    await fullSave("resp-insert-failed");
  });

  assert.equal(detailStateFor("resp-insert-failed"), null);
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.equal(resolve("resp-insert-failed"), null);
});

test("the bridge survives a locked insert until the retry lands", async () => {
  await withCallLogTrigger("INSERT", "database is locked", async (dropTrigger) => {
    const save = fullSave("resp-lock-retried");
    await new Promise((done) => setImmediate(done));

    assert.equal(detailStateFor("resp-lock-retried"), null);
    assert.deepEqual(resolve("resp-lock-retried"), STATE);

    dropTrigger();
    await save;
  });

  assert.equal(detailStateFor("resp-lock-retried"), "ready");
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.deepEqual(resolve("resp-lock-retried"), STATE);
});

test("a locked insert whose retry also fails releases the bridge", async () => {
  await withCallLogTrigger("INSERT", "database is locked", async () => {
    await fullSave("resp-lock-failed");
  });

  assert.equal(detailStateFor("resp-lock-failed"), null);
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.equal(resolve("resp-lock-failed"), null);
});

test("a thrown detail publish releases the bridge", async () => {
  await withCallLogTrigger("UPDATE", "forced publish failure", async () => {
    await fullSave("resp-publish-threw");
  });

  assert.equal(detailStateFor("resp-publish-threw"), "pending");
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.equal(resolve("resp-publish-threw"), null);
});

// Keep last: closing the writer is one-way, and every later artifact write gets null.
test("an artifact write that returns null releases the bridge", async () => {
  await artifactWriter.closeCallLogArtifactWriter();
  await fullSave("resp-artifact-null");

  assert.equal(detailStateFor("resp-artifact-null"), "missing");
  assert.equal(store.getPendingContinuationStateCount(), 0);
  assert.equal(resolve("resp-artifact-null"), null);
});
