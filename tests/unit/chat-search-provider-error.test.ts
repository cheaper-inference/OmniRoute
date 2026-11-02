import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-search-error-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";

const originalFetch = globalThis.fetch;
let fetchCalls = 0;
globalThis.fetch = async () => {
  fetchCalls += 1;
  throw new Error("Unexpected upstream request in the search-provider rejection test");
};

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/chat/completions/route.ts");
const admission = await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { registerLazyExecutor } = await import("../../open-sse/executors/index.ts");
const { SearchProviderChatError } = await import("../../open-sse/utils/searchProviderChatError.ts");

test.before(async () => {
  await providersDb.createProviderConnection({
    provider: "anysearch-search",
    authType: "apikey",
    name: "synthetic-search-provider",
    apiKey: "test-only-search-key",
    isActive: true,
    testStatus: "active",
  });
});

test.after(async () => {
  await new Promise((resolve) => setImmediate(resolve));
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const stream of [false, true]) {
  test(`#17858: search-provider chat rejection is JSON 400 with stream=${stream} and releases admission`, async () => {
    const correlationId = `search-rejection-${stream}`;
    assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
    fetchCalls = 0;
    const body = JSON.stringify({
      model: "anysearch-search/web",
      messages: [{ role: "user", content: "Reply with OK." }],
      stream,
      metadata: { fixturePadding: "x".repeat(admission.CHAT_LARGE_BODY_BYTES) },
    });
    const bytes = new TextEncoder().encode(body);
    let observedHeavyAdmission = false;
    // A declared large body reserves the real heavyweight lease before ingestion.
    // highWaterMark: 0 keeps this observation tied to the route's actual body read.
    const requestBody = new ReadableStream<Uint8Array>(
      {
        pull(controller) {
          observedHeavyAdmission = admission.perConnectionAdmissionController.activeHeavy > 0;
          controller.enqueue(bytes);
          controller.close();
        },
      },
      { highWaterMark: 0 }
    );
    const response = await POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(bytes.byteLength),
          Accept: stream ? "text/event-stream" : "application/json",
          "X-Correlation-Id": correlationId,
        },
        body: requestBody,
        duplex: "half",
      } as RequestInit & { duplex: "half" })
    );

    assert.equal(observedHeavyAdmission, true, "the fixture must acquire real admission");
    assert.equal(response.status, 400);
    assert.match(response.headers.get("content-type") || "", /application\/json/);
    assert.equal(response.headers.get("x-correlation-id"), correlationId);
    // The rejection is now an ordinary chatCore error result, so like every other handleChat
    // 4xx it carries no per-route CORS block (the proxy layer applies CORS); it must never
    // grant a wildcard origin on its own.
    assert.equal(response.headers.get("access-control-allow-origin"), null);
    const text = await response.text();
    const payload = JSON.parse(text) as { error: { message: string; type: string; code: string } };
    assert.match(payload.error.message, /\/v1\/search/);
    assert.equal(payload.error.type, "invalid_request_error");
    assert.equal(payload.error.code, "search_provider_not_chat");
    assert.doesNotMatch(text, /test-only-search-key|node:internal|\bat .+\(|\.claude\/worktrees/);
    assert.equal(fetchCalls, 0, "a rejected search provider must never dispatch upstream");
    assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
  });
}

test("a non-streaming search-provider rejection includes a generated correlation ID", async () => {
  const response = await POST(makeExecutorFailureRequest(false));
  assert.equal(response.status, 400);
  assert.ok(response.headers.get("x-correlation-id"));
  await response.body?.cancel();
  assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
});

test("an existing retired-provider rejection keeps its status and public classification", async () => {
  const response = await POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "felo-web/retired-test-model",
        messages: [{ role: "user", content: "Reply with OK." }],
        stream: false,
      }),
    })
  );

  assert.equal(response.status, 410);
  const payload = (await response.json()) as { error: { code: string; type: string } };
  assert.equal(payload.error.code, "PROVIDER_RETIRED");
  assert.equal(payload.error.type, "provider_error");
  assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
});

function makeExecutorFailureRequest(stream: boolean): Request {
  const body = JSON.stringify({
    model: "anysearch-search/web",
    messages: [{ role: "user", content: "Reply with OK." }],
    metadata: { fixturePadding: "x".repeat(admission.CHAT_LARGE_BODY_BYTES) },
    stream,
  });
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": String(Buffer.byteLength(body)),
    },
    body,
  });
}

test("an unclassified handler rejection is still propagated and releases admission", async () => {
  const failure = Object.assign(new Error("unclassified executor failure"), { status: 400 });
  registerLazyExecutor("anysearch-search", async () => {
    throw failure;
  });

  await assert.rejects(POST(makeExecutorFailureRequest(false)), (error) => error === failure);
  assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
});

test("a search-provider rejection after keepalive stays SSE 200 with a sanitized error and releases admission", async () => {
  let rejectExecutor: (reason: Error) => void;
  const pendingExecutor = new Promise<never>((_resolve, reject) => {
    rejectExecutor = reject;
  });
  registerLazyExecutor("anysearch-search", () => pendingExecutor);

  // Wait for the real wrapper to commit a keepalive, rather than sleeping for an
  // assumed threshold. The executor stays pending until the response is returned.
  const response = await POST(makeExecutorFailureRequest(true));
  const failure = new SearchProviderChatError("anysearch-search");
  failure.message += " api_key=test-only-search-key\n    at handler (/srv/private/chat.ts:10:2)";
  rejectExecutor(failure);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
  assert.ok(response.headers.get("x-correlation-id"));
  const text = await response.text();
  const frames = text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)) as { error?: { code: string; message: string } });
  const error = frames.find((frame) => frame.error)?.error;
  assert.ok(error, "the committed stream must carry the specific error");
  assert.equal(error.code, "search_provider_not_chat");
  assert.match(error.message, /POST \/v1\/search/);
  assert.doesNotMatch(text, /test-only-search-key|\/srv\/private|\bat handler/);
  assert.equal(fetchCalls, 0);
  assert.equal(admission.perConnectionAdmissionController.activeHeavy, 0);
});
