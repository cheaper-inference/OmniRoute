// @ts-nocheck
// The reasoning draft a combo forwards to the next target travels upstream only. The persisted
// call log, its pipeline capture and every other retained copy of the request must never carry
// it (reasoningCheckpoint.ts: "never written to logs, call captures or metrics").
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const previousDataDir = process.env.DATA_DIR;
const originalEnableRequestLogs = process.env.ENABLE_REQUEST_LOGS;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-holdback-persist-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.ENABLE_REQUEST_LOGS = "true";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { makeCheckpointRequest } =
  await import("../../open-sse/services/combo/reasoningCheckpoint.ts");
const { markUpstreamOnlyBody, takeUpstreamOnlyMarker, SUPPRESS_REQUEST_PERSISTENCE_FIELD } =
  await import("../../open-sse/services/combo/requestPersistence.ts");
const { initialPendingBody, updatePendingScope } =
  await import("../../src/lib/usage/pendingRequestScope.ts");
const { clearPendingRequests, getPendingById, trackPendingRequest } =
  await import("../../src/lib/usage/usageHistory.ts");

const originalFetch = globalThis.fetch;
const DRAFT = "TOP-SECRET-DRAFT-TEXT-4711";

function draftBody() {
  const original = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "hi" }],
  };
  const withDraft = makeCheckpointRequest(
    original,
    { text: "", reasoning: DRAFT, truncated: false },
    "before-answer"
  );
  assert.ok(withDraft, "the fixture must carry a draft");
  return { original, withDraft };
}

async function waitFor(fn, timeoutMs = CALL_LOG_SETTLE_TIMEOUT_MS) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await fn();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function latestCallLog() {
  const rows = await getCallLogs({ limit: 5 });
  // A request kept out of the logs stores no detail artifact (state "none"): the row is the proof.
  const settled = (state) => state === "ready" || state === "none";
  if (!Array.isArray(rows) || rows.length === 0 || !settled(rows[0].detailState)) return null;
  return getCallLogById(rows[0].id);
}

/** Drive the real handleChatCore with a draft-bearing body against a failing upstream. */
async function persistedAfter(mark: boolean) {
  await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
  const sent: string[] = [];
  globalThis.fetch = async (_url, init) => {
    sent.push(String(init?.body ?? ""));
    throw new Error("Connection refused");
  };
  const { original, withDraft } = draftBody();
  const result = await handleChatCore({
    body: mark ? markUpstreamOnlyBody(structuredClone(withDraft)) : structuredClone(withDraft),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(original),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
  });
  assert.equal(result.success, false);
  const detail = await waitFor(latestCallLog);
  assert.ok(detail, "expected a call log to be persisted");
  return { detail, sent };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  core.resetDbInstance();
  if (originalEnableRequestLogs === undefined) delete process.env.ENABLE_REQUEST_LOGS;
  else process.env.ENABLE_REQUEST_LOGS = originalEnableRequestLogs;
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});
process.on("exit", () => fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }));

test("control: an ordinary attempt retains the request it sent, so the checks below can see a leak", async () => {
  const { detail } = await persistedAfter(false);
  assert.ok(JSON.stringify(detail).includes(DRAFT), "the control run must persist the draft");
});

test("an attempt that forwards a draft sends it upstream and persists none of it", async () => {
  const { detail, sent } = await persistedAfter(true);
  assert.ok(
    sent.some((payload) => payload.includes(DRAFT)),
    "the upstream request must still carry the draft"
  );
  assert.ok(
    sent.every((payload) => !payload.includes(SUPPRESS_REQUEST_PERSISTENCE_FIELD)),
    "the marker must never reach the upstream"
  );
  assert.equal(detail.requestBody, null);
  assert.equal(JSON.stringify(detail).includes(DRAFT), false, "no persisted field may hold it");
});

test("the marker is taken off the body it was set on, and only that body", () => {
  const original = { messages: [] };
  const marked = markUpstreamOnlyBody(original);
  assert.equal(SUPPRESS_REQUEST_PERSISTENCE_FIELD in original, false, "the input is not touched");
  assert.equal(takeUpstreamOnlyMarker(marked), true);
  assert.equal(SUPPRESS_REQUEST_PERSISTENCE_FIELD in marked, false);
  assert.equal(takeUpstreamOnlyMarker(marked), false);
  assert.equal(takeUpstreamOnlyMarker(null), false);
});

test("the live request preview of an upstream-only body shows neither the draft nor the reply", () => {
  try {
    const { withDraft } = draftBody();
    assert.equal(
      JSON.stringify(initialPendingBody(withDraft, "m", false, true)).includes(DRAFT),
      false
    );
    assert.ok(JSON.stringify(initialPendingBody(withDraft, "m", false, false)).includes(DRAFT));

    const id = trackPendingRequest("m", "openai", "conn-upstream-only", true);
    assert.ok(id);
    updatePendingScope(
      {
        id,
        model: "m",
        provider: "openai",
        connectionId: "conn-upstream-only",
        upstreamOnly: true,
      },
      {
        providerRequest: withDraft,
        providerResponse: { echo: DRAFT },
        clientResponse: { echo: DRAFT },
        status: 502,
      }
    );
    const pending = getPendingById().get(id);
    assert.ok(pending);
    assert.equal(JSON.stringify(pending).includes(DRAFT), false);
    assert.equal(pending.status, 502, "outcomes are still recorded");
  } finally {
    clearPendingRequests();
  }
});
