import assert from "node:assert/strict";
import { AsyncResource } from "node:async_hooks";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-capture-error-"));
process.env.DATA_DIR = dataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { trackPendingRequest, getPendingById, capturePendingRequestOwner } =
  await import("../../src/lib/usage/usageHistory.ts");
const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { createPreparedRequestLogger, runWithCapture, captureCurrentProviderBody } =
  await import("../../open-sse/utils/providerRequestLogging.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
const { runStreamingResponse } =
  await import("../../open-sse/handlers/chatCore/streamingResponse.ts");

before(() => coreDb.ensureDbInitialized());
after(async () => {
  await callLogs.closeCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  coreDb.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function jsonResponse(status: number, message = "synthetic failure") {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "content-type": "application/json", "x-response-only": "response-header" },
  });
}

async function fixture(provider = "antigravity") {
  const id = crypto.randomUUID();
  const model = "synthetic-model";
  const connectionId = `connection-${id}`;
  const body = {
    model,
    messages: [
      { role: "user", content: "first" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "old", signature: "old-signature" },
          { type: "text", text: "old answer" },
        ],
      },
      { role: "user", content: "translated-only" },
    ],
  };
  trackPendingRequest(model, provider, connectionId, true, { correlationId: id });
  const pending = [...getPendingById().values()].find((entry) => entry.correlationId === id);
  assert.ok(pending);
  const pendingScope = {
    id: pending.id,
    owner: capturePendingRequestOwner(pending.id),
    model,
    provider,
    connectionId,
  };
  const logger = await createRequestLogger("openai", "openai", model, {
    enabled: true,
    captureStreamChunks: false,
  });
  let targetLogs = 0;
  const reqLogger = {
    ...logger,
    logTargetRequest: (...args: Parameters<typeof logger.logTargetRequest>) => {
      targetLogs++;
      logger.logTargetRequest(...args);
    },
  };
  const capture = createPreparedRequestLogger(reqLogger, pendingScope);
  const credentials = { connectionId };
  const ctx = {
    traceId: id,
    correlationId: id,
    provider,
    model,
    requestedModel: model,
    connectionId,
    credentials,
    detailedLoggingEnabled: true,
    reqLogger,
    pendingRequestId: pending.id,
    startTime: Date.now(),
    body,
    sourceFormat: "openai",
    targetFormat: "openai",
  } as Parameters<typeof persistAttemptLogs>[1];
  const deps = {
    body,
    translatedBody: body,
    currentModel: model,
    effectiveModel: model,
    model,
    provider,
    connectionId,
    credentials,
    managedLease: {},
    pendingConnId: connectionId,
    pendingRequestId: pending.id,
    pendingScope,
    providerRequestCapture: capture,
    reqLogger,
    sourceFormat: "openai",
    targetFormat: "openai",
    stream: true,
    triedModels: new Set([model]),
    getCurrentConnectionId: () => connectionId,
    assertManagedLeaseFence() {},
    getManagedLeaseFenceErrorCode: () => null,
    resolveEffectiveServiceTier: () => "default",
    handleCredentialsRefreshed() {},
    syncExecuteTranslatedBody(next: typeof body) {
      deps.translatedBody = next;
    },
    applyProviderFailureClassification: async () => {},
    persistFailureUsage() {},
    persistAttemptLogs: (args: Parameters<typeof persistAttemptLogs>[0]) =>
      persistAttemptLogs(args, ctx),
    streamController: { signal: new AbortController().signal, handleError() {} },
  };
  return {
    id,
    deps,
    pending,
    reqLogger,
    capture,
    targetLogs: () => targetLogs,
    run: (send: () => Promise<Record<string, unknown>>) =>
      runStreamingResponse({
        ...deps,
        executeProviderRequest: () => runWithCapture(capture, send),
      }),
    async send(
      label: string,
      response = jsonResponse(400),
      wireBody: unknown = { model, request: label }
    ) {
      const url = `https://synthetic.invalid/${label}?key=url-secret`;
      const headers = { authorization: "Bearer request-secret", "x-attempt": label };
      await captureCurrentProviderBody(url, headers, JSON.stringify(wireBody));
      return { response, url, headers, transformedBody: { model, translated: label } };
    },
    persistSuccess() {
      persistAttemptLogs({ status: 200, providerRequest: capture.latest()?.body }, ctx);
    },
    cleanup() {
      trackPendingRequest(model, provider, connectionId, false, undefined, pendingScope.owner);
    },
  };
}

type Fixture = Awaited<ReturnType<typeof fixture>>;

async function persistedPipeline(f: Fixture) {
  assert.equal(await callLogs.waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS), true);
  const rows = await callLogs.getCallLogs({ correlationId: f.id, limit: 2 });
  assert.equal(rows.length, 1);
  const row = await callLogs.getCallLogById(rows[0].id);
  assert.equal(row?.detailState, "ready");
  return row?.pipelinePayloads as ReturnType<Fixture["reqLogger"]["getPipelinePayloads"]>;
}

function requestSnapshot(f: Fixture) {
  return f.reqLogger.getPipelinePayloads()?.providerRequest;
}

function assertPersistedRequest(actual: unknown, captured: ReturnType<typeof requestSnapshot>) {
  assert.ok(captured);
  assert.deepEqual(actual, {
    ...captured,
    headers: { ...(captured.headers as Record<string, unknown>), authorization: "[REDACTED]" },
  });
}

for (const thrown of [false, true]) {
  test(`terminal ${thrown ? "transport" : "HTTP"} failure preserves captured request and pending preview`, async () => {
    const f = await fixture();
    let captured: ReturnType<typeof requestSnapshot>;
    let preview: unknown;
    let url: unknown;
    const out = await f.run(async () => {
      const result = await f.send("wire-A");
      captured = requestSnapshot(f);
      preview = f.pending.providerRequest;
      url = f.pending.providerUrl;
      if (thrown) throw new Error("synthetic transport failure");
      return {
        ...result,
        upstreamDiagnostic: { httpStatus: 400, validationCategory: "content_shape" },
      };
    });
    assert.equal(out.response.status, thrown ? 502 : 400);
    assert.deepEqual(requestSnapshot(f), captured);
    assert.equal(f.targetLogs(), 1, "failure must not log a later outgoing request");
    assert.deepEqual(f.pending.providerRequest, preview);
    assert.equal(f.pending.providerUrl, url);
    const pipeline = await persistedPipeline(f);
    assertPersistedRequest(pipeline?.providerRequest, captured);
    assert.doesNotMatch(
      JSON.stringify(pipeline?.providerRequest),
      /request-secret|url-secret|response-header|translated-only/
    );
    if (!thrown) {
      assert.deepEqual(pipeline?.error?.requestBody, captured?.body);
      assert.deepEqual(pipeline?.providerResponse?.diagnostic, {
        antigravityValidation: { httpStatus: 400, validationCategory: "content_shape" },
      });
      assert.equal(pipeline?.providerResponse?.body, undefined);
    }
  });
}

for (const failure of ["http", "transport", "semaphore"] as const) {
  test(`failure before any send (${failure}) persists no provider request`, async () => {
    const f = await fixture();
    const out = await f.run(async () => {
      if (failure !== "http") {
        const error = new Error("synthetic pre-send failure");
        if (failure === "semaphore") Object.assign(error, { code: "SEMAPHORE_TIMEOUT" });
        throw error;
      }
      return { response: jsonResponse(400), url: "", headers: {}, transformedBody: f.deps.body };
    });
    assert.equal(
      out.response.status,
      failure === "http" ? 400 : failure === "semaphore" ? 429 : 502
    );
    assert.equal(f.targetLogs(), 0);
    assert.equal(f.pending.providerRequest, undefined);
    assert.equal(f.pending.providerUrl, undefined);
    const pipeline = await persistedPipeline(f);
    assert.equal(pipeline?.providerRequest, undefined);
    if (failure === "http") assert.equal(pipeline?.error?.requestBody, null);
  });
}

test("success preserves the wire request through the existing success logging path", async () => {
  const f = await fixture();
  try {
    const out = await f.run(() => f.send("success", jsonResponse(200)));
    assert.equal(out.response, undefined);
    assert.deepEqual(out.carry.finalBody, { model: f.deps.model, request: "success" });
    assert.equal(f.pending.stage, "provider_response_started");
    assert.equal(requestSnapshot(f)?.headers?.["x-attempt"], "success");
    f.persistSuccess();
    assertPersistedRequest((await persistedPipeline(f))?.providerRequest, requestSnapshot(f));
  } finally {
    f.cleanup();
  }
});

for (const beforeSend of [false, true]) {
  test(`signature retry ${beforeSend ? "fails before B sends and preserves A" : "captures B and preserves B on terminal error"}`, async () => {
    const f = await fixture("claude");
    let attempts = 0;
    let captured: ReturnType<typeof requestSnapshot>;
    const out = await f.run(async () => {
      attempts++;
      if (attempts === 2 && beforeSend) throw new Error("retry preparation failed");
      const result = await f.send(
        attempts === 1 ? "A" : "B",
        jsonResponse(400, attempts === 1 ? "Invalid signature in thinking block" : "retry rejected")
      );
      captured = requestSnapshot(f);
      return result;
    });
    assert.equal(attempts, 2, "exercise the real pipeline retry");
    assert.equal(out.response.status, beforeSend ? 502 : 400);
    assert.equal(f.targetLogs(), beforeSend ? 1 : 2);
    assert.deepEqual(requestSnapshot(f), captured, "preserve the captured timestamp and attempt");
    assert.equal(requestSnapshot(f)?.headers?.["x-attempt"], beforeSend ? "A" : "B");
    assert.deepEqual(f.pending.providerRequest, {
      model: f.deps.model,
      request: beforeSend ? "A" : "B",
    });
    assertPersistedRequest((await persistedPipeline(f))?.providerRequest, captured);
  });
}

test("concurrent failures retain separate request captures and persisted artifacts", async () => {
  const a = await fixture();
  const b = await fixture();
  let release: () => void;
  const capturedA = new Promise<void>((resolve) => {
    release = resolve;
  });
  const first = a.run(async () => {
    const result = await a.send("concurrent-A");
    release();
    await bFinished;
    return result;
  });
  let finishB: () => void;
  const bFinished = new Promise<void>((resolve) => {
    finishB = resolve;
  });
  const second = b.run(async () => {
    await capturedA;
    const result = await b.send("concurrent-B");
    finishB();
    return result;
  });
  await Promise.all([first, second]);
  for (const [f, label] of [
    [a, "concurrent-A"],
    [b, "concurrent-B"],
  ] as const) {
    assert.equal(f.targetLogs(), 1);
    assert.equal(requestSnapshot(f)?.headers?.["x-attempt"], label);
    assertPersistedRequest((await persistedPipeline(f))?.providerRequest, requestSnapshot(f));
  }
});

test("bounded sinks and settled-dispatch guards survive terminal failure", async () => {
  const f = await fixture();
  let resource: AsyncResource | undefined;
  try {
    await f.run(async () => {
      const result = await f.send("large", jsonResponse(400), {
        model: f.deps.model,
        request: "x".repeat(200_000),
      });
      resource = new AsyncResource("settled-provider-dispatch");
      return result;
    });
    const captured = requestSnapshot(f);
    assert.ok(String((captured?.body as Record<string, unknown>)?.request).length <= 65_536);
    assert.ok(JSON.stringify(f.pending.providerRequest).length < 10_000);
    assert.doesNotMatch(JSON.stringify(captured), /request-secret|url-secret/);
    assert.ok(resource);
    await resource.runInAsyncScope(async () => {
      await captureCurrentProviderBody("https://synthetic.invalid/late", {}, '{"model":"late"}');
      await f.capture.capture({
        url: "https://synthetic.invalid/late",
        headers: {},
        body: { model: "late" },
        bodyString: '{"model":"late"}',
      });
    });
    assert.equal(f.targetLogs(), 1);
    assert.deepEqual(requestSnapshot(f), captured);
    assertPersistedRequest((await persistedPipeline(f))?.providerRequest, captured);
  } finally {
    resource?.emitDestroy();
    f.cleanup();
  }
});

for (const change of ["value", "remove-project", "mutate-in-place"] as const) {
  test(`same URL/body retry captures changed headers (${change})`, async () => {
    const f = await fixture();
    const url = "https://synthetic.invalid/same-request";
    const bodyString = '{"model":"synthetic-model","request":"same"}';
    const firstHeaders: Record<string, string> = { "x-goog-user-project": "project-first" };
    let firstPrepared: ReturnType<NonNullable<typeof f.capture.latest>>;
    let lastSnapshot: ReturnType<typeof requestSnapshot>;
    const out = await f.run(async () => {
      await captureCurrentProviderBody(url, firstHeaders, bodyString);
      firstPrepared = f.capture.latest?.();
      const headers = change === "mutate-in-place" ? firstHeaders : { ...firstHeaders };
      if (change === "value") headers["x-goog-user-project"] = "PROJECT-FIRST";
      else delete headers["x-goog-user-project"];
      await captureCurrentProviderBody(url, headers, bodyString);
      lastSnapshot = requestSnapshot(f);
      return { response: jsonResponse(400), url, headers, transformedBody: f.deps.body };
    });
    assert.equal(out.response.status, 400);
    assert.equal(f.targetLogs(), 2, "changed headers must record a new prepared request");
    assert.equal(firstPrepared?.headers["x-goog-user-project"], "project-first");
    assert.equal(
      f.capture.latest?.()?.headers["x-goog-user-project"],
      change === "value" ? "PROJECT-FIRST" : undefined
    );
    assert.equal(
      lastSnapshot?.headers?.["x-goog-user-project"],
      change === "value" ? "PROJECT-FIRST" : undefined
    );
    assert.deepEqual(
      requestSnapshot(f),
      lastSnapshot,
      "terminal error keeps the last capture timestamp"
    );
    const pipeline = await persistedPipeline(f);
    assert.deepEqual(pipeline?.providerRequest, lastSnapshot);
    assert.deepEqual(pipeline?.error?.requestBody, { model: "synthetic-model", request: "same" });
  });
}

for (const headers of [
  { "invalid header name": "synthetic" },
  new Proxy(
    {},
    {
      ownKeys() {
        throw new Error("synthetic-header-failure");
      },
    }
  ),
]) {
  test("invalid/custom capture headers cannot interrupt provider execution or expose logging errors", async () => {
    const f = await fixture();
    const warnings: Array<[string, string]> = [];
    let continued = false;
    try {
      await runWithCapture(f.capture, async () => {
        await captureCurrentProviderBody(
          "https://synthetic.invalid/header-error",
          headers,
          '{"model":"synthetic"}',
          {
            warn: (tag, message) => warnings.push([tag, message]),
          }
        );
        continued = true;
      });
      assert.equal(continued, true);
      assert.equal(f.capture.latest?.(), null);
      assert.equal(f.targetLogs(), 0);
      assert.deepEqual(warnings, [["REQUEST_LOG", "Provider request logging hook failed"]]);
    } finally {
      f.cleanup();
    }
  });
}

test("explicit and fetch captures dedupe equivalent header casing, order and whitespace", async () => {
  const f = await fixture();
  const originalFetch = globalThis.fetch;
  const url = "https://synthetic.invalid/equivalent-headers";
  const bodyString = '{"model":"synthetic-model","request":"same"}';
  let prepared: ReturnType<typeof requestSnapshot>;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls++;
    return jsonResponse(400);
  };
  try {
    await f.run(async () => {
      await captureCurrentProviderBody(
        url,
        { "X-Label": " Case-Preserved ", "X-Goog-User-Project": "project-first" },
        bodyString
      );
      prepared = requestSnapshot(f);
      const headers = { "x-goog-user-project": "project-first", "x-label": "Case-Preserved" };
      const response = await fetch(url, { method: "POST", headers, body: bodyString });
      return { response, url, headers, transformedBody: f.deps.body };
    });
    assert.equal(fetchCalls, 1);
    assert.equal(f.targetLogs(), 1);
    assert.deepEqual(
      requestSnapshot(f),
      prepared,
      "equivalent wrapper capture must not refresh timestamp"
    );
    assert.deepEqual((await persistedPipeline(f))?.providerRequest, prepared);
  } finally {
    globalThis.fetch = originalFetch;
    f.cleanup();
  }
});
