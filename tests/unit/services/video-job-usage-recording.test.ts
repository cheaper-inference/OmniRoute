import test from "node:test";
import assert from "node:assert/strict";
import Database from "better-sqlite3";
import { handleVideoJobGeneration } from "../../../open-sse/handlers/videoGeneration/job.ts";
import {
  handleVideoGeneration,
  recordVideoJobCall,
} from "../../../open-sse/handlers/videoGeneration.ts";
import { SQLITE_FILE } from "../../../src/lib/db/core.ts";
import { runWithCallLogApiKeyContext } from "../../../src/lib/usage/callLogApiKeyContext.ts";

/** Read the persisted rows for a model, newest first. */
function rowsFor(table: string, model: string) {
  assert.ok(
    SQLITE_FILE,
    "tests must run with an isolated DATA_DIR (see tests/_setup/isolateDataDir.ts)"
  );
  const db = new Database(SQLITE_FILE, { readonly: true });
  try {
    return db
      .prepare(`SELECT * FROM ${table} WHERE model = ? ORDER BY rowid DESC`)
      .all(model) as Array<Record<string, unknown>>;
  } finally {
    db.close();
  }
}

/** A submit→poll provider that answers the muapi.ai contract. */
function mockJobFetch(requestId: string, pollBody: unknown) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) =>
    String(init?.method ?? "GET") === "POST"
      ? new Response(JSON.stringify({ request_id: requestId }), {
          status: 202,
          headers: { "content-type": "application/json" },
        })
      : new Response(JSON.stringify(pollBody), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
  return () => {
    globalThis.fetch = originalFetch;
  };
}

test("a completed job-preset generation is recorded in call_logs AND usage_history", async () => {
  // The bug: this pipeline wrote neither row, so a job-preset provider was absent from
  // the request log and the usage view while the synchronous video handlers appeared in
  // both. A generation that costs money with no row cannot be matched to a provider bill.
  const restore = mockJobFetch("job-log-1", {
    status: "completed",
    outputs: ["https://cdn.example/clip.mp4"],
  });

  try {
    const result = await handleVideoJobGeneration({
      model: "alibaba/wan-3.0-logcheck",
      presetName: "muapi-video-job",
      body: { prompt: "a paper boat", duration: 5 },
      credentials: { apiKey: "sk-test" },
      provider: "muapi",
      recordCall: recordVideoJobCall,
      pollIntervalMs: 1,
    });
    assert.equal(result.success, true);

    // call_logs — the request-log surface. `path` and `duration` are the names the
    // writer actually reads; `endpoint`/`durationMs` were silently dropped.
    const calls = rowsFor("call_logs", "muapi/alibaba/wan-3.0-logcheck");
    assert.equal(calls.length, 1, "expected exactly one call_logs row");
    assert.equal(calls[0].provider, "muapi");
    assert.equal(calls[0].path, "/v1/videos/generations");
    assert.equal(calls[0].status, 200);
    assert.ok(Number(calls[0].duration) > 0, "duration must not be zero");

    // usage_history — the surface the usage/cost view aggregates.
    const usage = rowsFor("usage_history", "alibaba/wan-3.0-logcheck");
    assert.equal(usage.length, 1, "expected exactly one usage_history row");
    assert.equal(usage[0].provider, "muapi");
    assert.equal(usage[0].endpoint, "video");
    assert.equal(Number(usage[0].success), 1);
    assert.ok(Number(usage[0].latency_ms) > 0, "latency must not be zero");
  } finally {
    restore();
  }
});

test("a failed job is recorded too, so errors are visible", async () => {
  const restore = mockJobFetch("job-log-2", { status: "failed" });

  try {
    const result = await handleVideoJobGeneration({
      model: "alibaba/wan-3.0-kaboom",
      presetName: "muapi-video-job",
      body: { prompt: "x" },
      credentials: { apiKey: "sk-test" },
      provider: "muapi",
      recordCall: recordVideoJobCall,
      pollIntervalMs: 1,
    });
    assert.equal(result.success, false);

    const calls = rowsFor("call_logs", "muapi/alibaba/wan-3.0-kaboom");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].status, 502);
    assert.ok(String(calls[0].error_summary ?? "").length > 0, "failure reason recorded");

    const usage = rowsFor("usage_history", "alibaba/wan-3.0-kaboom");
    assert.equal(usage.length, 1);
    assert.equal(Number(usage[0].success), 0);
  } finally {
    restore();
  }
});

test("the request-scoped api-key context attributes both rows", async () => {
  // The usage writer only trusted a key passed directly on the entry, so a row written
  // by a caller that set the request-scoped context came out unattributed: an attributed
  // call-log row beside an unattributed usage row mis-buckets per-key usage into "unknown".
  const apiKeyId = "11111111-2222-3333-4444-555555555555";
  const restore = mockJobFetch("job-log-3", {
    status: "completed",
    outputs: ["https://cdn.example/clip.mp4"],
  });

  try {
    const result = await runWithCallLogApiKeyContext({ apiKeyId, apiKeyName: "main" }, () =>
      handleVideoJobGeneration({
        model: "alibaba/wan-3.0-attributed",
        presetName: "muapi-video-job",
        body: { prompt: "x" },
        credentials: { apiKey: "sk-test" },
        provider: "muapi",
        recordCall: recordVideoJobCall,
        pollIntervalMs: 1,
      })
    );
    assert.equal(result.success, true);

    const calls = rowsFor("call_logs", "muapi/alibaba/wan-3.0-attributed");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].api_key_id, apiKeyId);

    const usage = rowsFor("usage_history", "alibaba/wan-3.0-attributed");
    assert.equal(usage.length, 1);
    assert.equal(usage[0].api_key_id, apiKeyId, "usage_history must see the same key");
    assert.equal(usage[0].api_key_name, "main");
  } finally {
    restore();
  }
});

test("the video dispatcher wires the recorder into a built-in job-preset provider", async () => {
  // Goes through the public dispatcher (agnes = built-in `agnes-video-job` preset) so
  // the injection itself is covered, not just the recorder: a dispatcher that stops
  // passing `recordCall` would silently drop both rows again.
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) =>
    String(init?.method ?? "GET") === "POST"
      ? new Response(JSON.stringify({ video_id: "agnes-job-1" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      : new Response(
          JSON.stringify({ status: "completed", metadata: { url: "https://cdn.example/a.mp4" } }),
          { status: 200, headers: { "content-type": "application/json" } }
        );

  try {
    const result = await handleVideoGeneration({
      body: { model: "agnes/agnes-video-v2.0", prompt: "a lighthouse", poll_interval_ms: 1 },
      credentials: { apiKey: "sk-test" },
      log: null,
    });
    assert.equal(result.success, true);

    const calls = rowsFor("call_logs", "agnes/agnes-video-v2.0");
    assert.equal(calls.length, 1, "expected exactly one call_logs row");
    assert.equal(calls[0].provider, "agnes");
    assert.equal(calls[0].path, "/v1/videos/generations");

    const usage = rowsFor("usage_history", "agnes-video-v2.0");
    assert.equal(usage.length, 1, "expected exactly one usage_history row");
    assert.equal(usage[0].provider, "agnes");
    assert.equal(usage[0].endpoint, "video");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
