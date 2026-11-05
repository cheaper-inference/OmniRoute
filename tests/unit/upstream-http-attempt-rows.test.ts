import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, afterEach, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-http-attempts-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const { resetDbInstance, getDbInstance } = await import("../../src/lib/db/core.ts");
const { getCallLogs, closeCallLogSaves, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { createPreparedRequestLogger, runWithCapture } =
  await import("../../open-sse/utils/providerRequestLogging.ts");
const { sendAntigravityRequest, toSafeAntigravityLog } =
  await import("../../open-sse/executors/antigravity/executeAttempt.ts");
const { normalizeExecutorResult } =
  await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
const { observeProviderHttpSend } = await import("../../open-sse/utils/providerRequestLogging.ts");
const { selectHttpResponse } = await import("../../open-sse/utils/providerHttpAttempts.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { executeWithUpstreamStartTimeout } =
  await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
const { markEmptyTurnExecution } = await import("../../open-sse/utils/emptyTurnPolicy.ts");
const { runNonStreamingProviderLeg } =
  await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
const { baseInput } = await import("./_helpers/nonStreamingProviderLegFixtures.ts");
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
type Selection = import("../../open-sse/utils/providerHttpAttempts.ts").HttpAttemptSelection;
let sequence = 0;
function fixture() {
  const id = `http-attempt-${++sequence}-${randomUUID()}`;
  const capture = createPreparedRequestLogger(
    { logTargetRequest() {} },
    { id, model: "test-model", provider: "openai", connectionId: null }
  );
  const context: Parameters<typeof persistAttemptLogs>[1] = {
    traceId: id,
    pendingRequestId: id,
    correlationId: id,
    provider: "openai",
    model: "test-model",
    connectionId: "account-initial",
    credentials: {},
    skillRequestId: id,
    detailedLoggingEnabled: false,
    reqLogger: null,
    clientRawRequest: null,
    requestedModel: "test-model",
    startTime: Date.now(),
    body: null,
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: null,
    apiKeyInfo: null,
    noLogEnabled: false,
    httpAttempts: capture.httpAttempts,
  };
  return { id, capture, context };
}
async function finish(f: ReturnType<typeof fixture>, selection: Selection | null, status = 200) {
  persistAttemptLogs({ status, upstreamHttpSelection: selection }, f.context);
  assert.equal(await waitForCallLogSaves(10_000), true);
  return getCallLogs({ correlationId: f.id, limit: 100 });
}
function wire(status = 200, connectionId = "account-wire") {
  return observeProviderHttpSend(
    { provider: "openai", model: "test-model", connectionId, endpoint: "chat_completions" },
    async () => new Response(null, { status })
  );
}

after(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

test("real Antigravity 403 header retry persists one intermediate and one final row", async () => {
  const correlationId = "http-attempt-403-200";
  const capture = createPreparedRequestLogger(
    { logTargetRequest() {} },
    { id: correlationId, model: "test-model", provider: "antigravity", connectionId: null }
  );
  const sentHeaders: Headers[] = [];
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sentHeaders.push(new Headers(init?.headers));
    return Response.json({ ok: true }, { status: sentHeaders.length === 1 ? 403 : 200 });
  }) as typeof fetch;
  const selected = await runWithCapture(capture, async () => {
    const result = await sendAntigravityRequest(
      "antigravity",
      "https://provider.example/v1internal:streamGenerateContent",
      "test-model",
      { "x-goog-user-project": "fixture-quota-project" },
      { model: "test-model", project: "fixture-quota-project", request: {} },
      { connectionId: "test-account", providerSpecificData: { clientProfile: "ide" } },
      false,
      undefined,
      toSafeAntigravityLog(null),
      0,
      { value: 0 },
      correlationId
    );
    return normalizeExecutorResult({
      ...result,
      upstreamHttpSelection: result.upstreamHttpSelection,
    });
  });
  assert.equal(sentHeaders.length, 2, "the real quota-header branch must resend");
  persistAttemptLogs(
    { status: 200, upstreamHttpSelection: selected.upstreamHttpSelection ?? null },
    {
      traceId: correlationId,
      pendingRequestId: correlationId,
      correlationId,
      provider: "antigravity",
      model: "test-model",
      connectionId: "test-account",
      credentials: {},
      skillRequestId: correlationId,
      detailedLoggingEnabled: false,
      reqLogger: null,
      clientRawRequest: null,
      requestedModel: "test-model",
      startTime: Date.now(),
      body: null,
      sourceFormat: "openai",
      targetFormat: "gemini",
      comboName: null,
      comboStepId: null,
      comboExecutionKey: null,
      tokensCompressed: null,
      apiKeyInfo: null,
      noLogEnabled: false,
      httpAttempts: capture.httpAttempts,
    }
  );
  assert.equal(await waitForCallLogSaves(10_000), true);
  const rows = await getCallLogs({ correlationId, limit: 10 });
  assert.deepEqual(rows.map((row) => row.status).sort(), [200, 403]);
  assert.equal(new Set(rows.map((row) => row.id)).size, 2);
  assert.equal(sentHeaders.length, 2);
  assert.equal(sentHeaders[1].has("x-goog-user-project"), false);
});

test("Base observes body repair, identical retries and transport fallback with snapped accounts", async () => {
  for (const kind of ["repair", "identical", "transport"] as const) {
    const f = fixture();
    const bodies: string[] = [];
    const error = new Error("secret transport diagnostic");
    globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
      bodies.push(String(init?.body));
      if (bodies.length === 1) {
        if (kind === "transport") throw error;
        return Response.json(
          { error: { message: "Unsupported parameter: reasoning_effort" } },
          { status: kind === "repair" ? 400 : 429, headers: { "retry-after": "0" } }
        );
      }
      return Response.json({ choices: [{ message: { content: "done" } }] });
    }) as typeof fetch;
    const result = await runWithCapture(f.capture, () =>
      new BaseExecutor("openai", {
        baseUrls: ["https://first.example", "https://second.example"],
      }).execute({
        model: "test-model",
        body: {
          model: "wire-model",
          messages: [{ role: "user", content: "hello" }],
          reasoning_effort: "high",
        },
        stream: false,
        credentials: { apiKey: "fixture", connectionId: "account-wire" },
      })
    );
    const normalized = normalizeExecutorResult(result);
    const rows = await finish(f, normalized.upstreamHttpSelection);
    assert.equal(bodies.length, 2, kind);
    assert.equal(rows.length, 2, kind);
    assert.equal(
      rows.every((row) => row.upstreamHttp?.send?.model === "wire-model"),
      true,
      "metadata uses the serialized wire model"
    );
    assert.equal(
      rows.find((row) => row.requestType === "upstream_http_attempt")?.connectionId,
      "account-wire"
    );
    if (kind === "identical") assert.equal(bodies[0], bodies[1]);
    if (kind === "repair") assert.notEqual(bodies[0], bodies[1]);
    if (kind === "transport") {
      const attempt = rows.find((row) => row.requestType === "upstream_http_attempt");
      assert.equal(attempt?.status, 0);
      assert.equal(attempt?.upstreamHttp?.send?.outcome, "transport_error");
      assert.equal(attempt?.error, "Upstream transport error");
    }
  }
});

test("Antigravity terminal failures, ordinary success and CLI/consumer controls", async () => {
  for (const [statuses, profile, project] of [
    [[403, 403], "ide", "fixture-quota-project"],
    [[200], "ide", "fixture-quota-project"],
    [[403], "cli", "fixture-quota-project"],
    [[403], "ide", "aicode-consumers"],
  ] as const) {
    const f = fixture();
    let sends = 0;
    globalThis.fetch = (async () =>
      new Response(null, { status: statuses[sends++] ?? 500 })) as typeof fetch;
    const result = await runWithCapture(f.capture, () =>
      sendAntigravityRequest(
        "antigravity",
        "https://provider.example/content",
        "test-model",
        {},
        { model: "test-model", project, request: {} },
        { connectionId: "account-wire", providerSpecificData: { clientProfile: profile } },
        false,
        undefined,
        toSafeAntigravityLog(null),
        0,
        { value: 0 },
        f.id
      )
    );
    const rows = await finish(f, result.upstreamHttpSelection, result.response.status);
    assert.equal(sends, statuses.length);
    assert.equal(rows.length, sends);
  }
});

test("actual Antigravity non-streaming synthesis and Codex SSE conversion retain HTTP200 identity", async () => {
  for (const provider of ["antigravity", "codex"] as const) {
    const f = fixture();
    const payload =
      provider === "codex"
        ? 'event: error\ndata: {"error":{"message":"Selected model is at capacity. Please try a different model."}}\n\n'
        : 'data: {"response":{"candidates":[{"content":{"parts":[{"text":"done"}]},"finishReason":"STOP"}]}}\n\n';
    globalThis.fetch = (async () =>
      new Response(payload, { headers: { "content-type": "text/event-stream" } })) as typeof fetch;
    const executor = provider === "codex" ? new CodexExecutor() : new AntigravityExecutor();
    const result = normalizeExecutorResult(
      await runWithCapture(f.capture, () =>
        executor.execute({
          model: provider === "codex" ? "gpt-5.5" : "gemini-2.5-flash",
          body: {
            messages: [{ role: "user", content: "hello" }],
            input: [{ role: "user", content: "hello" }],
          },
          stream: provider === "codex",
          credentials: {
            accessToken: "fixture",
            connectionId: "account-wire",
            projectId: "fixture-quota-project",
            providerSpecificData: { projectId: "fixture-quota-project", clientProfile: "cli" },
          },
        })
      )
    );
    const rows = await finish(f, result.upstreamHttpSelection, result.response.status);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].upstreamHttp?.send?.status, 200);
    assert.equal(rows[0].status, provider === "codex" ? 503 : 200);
  }
});

test("explicit association distinguishes downstream errors and same-status local outcomes", async () => {
  for (const [statuses, associated, finalStatus] of [
    [[403], false, 503],
    [[200], true, 502],
    [[403, 200], false, 200],
  ] as const) {
    const f = fixture();
    let selected: Selection | null = null;
    await runWithCapture(f.capture, async () => {
      for (const status of statuses) selected = selectHttpResponse(await wire(status));
    });
    const rows = await finish(f, associated ? selected : null, finalStatus);
    assert.equal(rows.length, statuses.length + (associated ? 0 : 1));
    const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
    assert.equal(logical?.status, finalStatus);
    assert.equal(logical?.upstreamHttp?.send?.status ?? null, associated ? statuses.at(-1) : null);
  }
});

test("normalizer, empty-turn wrapper and real provider leg retain one shared selection", async () => {
  const f = fixture();
  const result = await runWithCapture(f.capture, async () => {
    const response = await observeProviderHttpSend(
      {
        provider: "openai",
        model: "test-model",
        connectionId: "account-wire",
        endpoint: "chat_completions",
      },
      async () =>
        Response.json({
          choices: [{ message: { role: "assistant", content: "hello" }, finish_reason: "stop" }],
        })
    );
    const selection = selectHttpResponse(response);
    const wrapped = markEmptyTurnExecution(response, "https://api.openai.com/v1/chat/completions", {
      connectionId: "account-wire",
      apiKey: "fixture",
    });
    assert.notEqual(wrapped, response);
    return normalizeExecutorResult({ response: wrapped, upstreamHttpSelection: selection });
  });
  const leg = await runNonStreamingProviderLeg(
    baseInput({ executeProviderRequest: async () => result, connectionId: "account-wire" })
  );
  assert.equal(leg.kind, "ok");
  assert.equal(leg.upstreamHttpSelection, result.upstreamHttpSelection);
  assert.equal((await finish(f, leg.upstreamHttpSelection)).length, 1);
});

test("actual Antigravity fallback preserves an evicted earlier selection and bounds retained history", async () => {
  const f = fixture();
  let sends = 0;
  const wireModels: string[] = [];
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    if (
      !String(input).includes("provider.example/content") &&
      !String(input).includes("streamGenerateContent")
    )
      return Response.json({ version: "1.2.3" });
    sends++;
    wireModels.push(JSON.parse(String(init?.body)).model);
    return Response.json(
      { error: { message: "invalid argument" } },
      { status: sends > 34 ? 400 : 200 }
    );
  }) as typeof fetch;
  const selected = await runWithCapture(f.capture, async () => {
    const credentials = {
      accessToken: "fixture",
      connectionId: "account-wire",
      projectId: "fixture-quota-project",
      providerSpecificData: { projectId: "fixture-quota-project", clientProfile: "cli" },
    };
    for (let index = 0; index < 34; index++)
      await sendAntigravityRequest(
        "antigravity",
        "https://provider.example/content",
        "test-model",
        {},
        { model: "test-model", request: {} },
        credentials,
        false,
        undefined,
        toSafeAntigravityLog(null),
        0,
        { value: 0 },
        f.id
      );
    return normalizeExecutorResult(
      await new AntigravityExecutor().execute({
        model: "gemini-3.1-pro-low",
        body: { messages: [{ role: "user", content: "hello" }] },
        stream: false,
        credentials,
      })
    );
  });
  const selectedOrdinal = selected.upstreamHttpSelection?.current?.record.ordinal;
  assert.ok(
    Number(selectedOrdinal) > 30 && Number(selectedOrdinal) < sends,
    "the executor returned an earlier response outside the retained prefix"
  );
  // Service fetches inside dispatch do not become inference observations.
  await runWithCapture(f.capture, async () => {
    globalThis.fetch = async () => new Response(null);
    await fetch(
      "https://user:URL_CANARY@service.example/PATH_CANARY?QUERY_CANARY#FRAGMENT_CANARY",
      { method: "POST", headers: { authorization: "HEADER_CANARY" }, body: "BODY_CANARY" }
    );
  });
  const rows = await finish(f, selected.upstreamHttpSelection, 400);
  assert.equal(rows.length, 32);
  for (const row of rows) {
    const send = row.upstreamHttp?.send;
    assert.equal(send?.model, wireModels[Number(send?.ordinal) - 1]);
  }
  const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
  assert.equal(logical?.upstreamHttp?.send?.ordinal, selectedOrdinal);
  assert.equal(logical?.upstreamHttp?.total, sends);
  assert.equal(logical?.upstreamHttp?.omitted, sends - 32);
  assert.equal(logical?.upstreamHttp?.failed, sends - 34);
  assert.doesNotMatch(JSON.stringify(rows), /CANARY/);
  assert.equal(
    rows.every(
      (row) => new TextEncoder().encode(JSON.stringify(row.upstreamHttp?.send)).length <= 1024
    ),
    true
  );
});

test("concurrent captures and repeated dispatches keep their attribution and send counts", async () => {
  const first = fixture();
  const second = fixture();
  await Promise.all(
    [first, second].map((f, index) =>
      runWithCapture(f.capture, async () => {
        await wire(403, `account-${index}`);
        await Promise.resolve();
        await wire(200, `account-${index}`);
      })
    )
  );
  await runWithCapture(first.capture, () => wire(429, "account-new"));
  const [a, b] = await Promise.all([finish(first, null, 503), finish(second, null, 503)]);
  assert.equal(a.length, 4);
  assert.equal(b.length, 3);
  assert.deepEqual(
    new Set(
      a.filter((row) => row.requestType === "upstream_http_attempt").map((row) => row.connectionId)
    ),
    new Set(["account-0", "account-new"])
  );
  assert.equal(
    b
      .filter((row) => row.requestType === "upstream_http_attempt")
      .every((row) => row.connectionId === "account-1"),
    true
  );
});

for (const [race, late] of [
  ["timeout", "response"],
  ["timeout", "exception"],
  ["abort", "response"],
] as const) {
  test(`outer ${race} seals unsettled sends before a late ${late}`, async () => {
    const f = fixture();
    let resolve!: (response: Response) => void;
    let reject!: (error: Error) => void;
    const pending = new Promise<Response>((yes, no) => {
      resolve = yes;
      reject = no;
    });
    const error = new Error("ERROR_CANARY");
    let underlying!: Promise<Response>;
    const client = new AbortController();
    if (race === "abort")
      setTimeout(() => client.abort(new DOMException("Client aborted", "AbortError")), 5);
    await assert.rejects(
      executeWithUpstreamStartTimeout({
        executor: {},
        provider: "openai",
        model: "test-model",
        connectionTimeoutMs: 10,
        signal: client.signal,
        log: null,
        execute: () =>
          (underlying = runWithCapture(f.capture, () =>
            observeProviderHttpSend(
              {
                provider: "openai",
                model: "test-model",
                connectionId: "account-wire",
                endpoint: "chat_completions",
              },
              () => pending
            )
          )),
      })
    );
    const rows = await finish(f, null, 504);
    const attempt = rows.find((row) => row.requestType === "upstream_http_attempt");
    assert.equal(attempt?.status, 0);
    assert.equal(attempt?.upstreamHttp?.send?.outcome, "no_response_observed");
    assert.equal(attempt?.upstreamHttp?.send?.durationMs, null);
    assert.ok(attempt?.upstreamHttp?.send?.cutoffAt);
    const before = JSON.stringify(rows);
    if (late === "response") {
      const response = new Response(null);
      resolve(response);
      assert.equal(await underlying, response);
      assert.equal(selectHttpResponse(response), null);
    } else {
      reject(error);
      await assert.rejects(underlying, (received) => received === error);
    }
    await runWithCapture(f.capture, () => wire(200));
    assert.equal(JSON.stringify(await getCallLogs({ correlationId: f.id, limit: 100 })), before);
  });
}

test("safe summaries remain available without artifacts and noLog stays authoritative", async () => {
  const f = fixture();
  f.context.noLogEnabled = true;
  await runWithCapture(f.capture, async () => {
    await wire(403);
  });
  const rows = await finish(f, null, 503);
  assert.equal(
    rows.every((row) => row.upstreamHttp === null && row.requestSummary === null),
    true
  );
  assert.equal(
    rows.every((row) => row.hasRequestBody === false && row.hasResponseBody === false),
    true
  );
  const raw = getDbInstance()
    .prepare(
      "SELECT request_summary, resilience_actions, response_id, tokens_in, tokens_out FROM call_logs WHERE request_type = 'upstream_http_attempt' AND correlation_id = ?"
    )
    .get(f.id) as Record<string, unknown>;
  assert.equal(raw.response_id, null);
  assert.equal(raw.resilience_actions, null);
  assert.equal(raw.tokens_in, 0);
  assert.equal(raw.tokens_out, 0);
});

test("no-send refusal stays empty and logging failures preserve Response and exception identity", async () => {
  const f = fixture();
  const rows = await finish(f, null, 503);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].upstreamHttp, null);
  const active = fixture();
  active.capture.httpAttempts!.begin = () => {
    throw new Error("LOG_CANARY");
  };
  const response = new Response(null);
  const error = new Error("ERROR_CANARY");
  Object.defineProperties(response, {
    body: {
      get() {
        throw new Error("observer read body");
      },
    },
    clone: {
      value() {
        throw new Error("observer cloned body");
      },
    },
  });
  const metadata = {
    provider: "openai",
    model: "test-model",
    connectionId: null,
    endpoint: "unknown" as const,
  };
  await runWithCapture(active.capture, async () => {
    assert.equal(await observeProviderHttpSend(metadata, async () => response), response);
    await assert.rejects(
      observeProviderHttpSend(metadata, async () => {
        throw error;
      }),
      (received) => received === error
    );
  });
  const observed = fixture();
  assert.equal(
    await runWithCapture(observed.capture, () =>
      observeProviderHttpSend(metadata, async () => response)
    ),
    response
  );
});

test("terminal drain freezes an existing selection as well as the persisted snapshot", async () => {
  const f = fixture();
  const response = await runWithCapture(f.capture, () => wire(200));
  const selection = selectHttpResponse(response)!;
  const selected = selection.current;
  const rows = await finish(f, selection);
  selection.current = null;
  assert.equal(selection.current, selected);
  assert.equal(selectHttpResponse(response)?.current, null);
  assert.equal(f.capture.httpAttempts!.drain(selection, 500, "late"), null);
  assert.equal(rows[0].upstreamHttp?.send?.status, 200);
});

test("actual non-streaming chat finalization associates its provider send and preserves usage", async () => {
  const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
  const id = randomUUID();
  globalThis.fetch = (async () =>
    Response.json({
      id: "fixture-response",
      choices: [{ message: { role: "assistant", content: "hello" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
    })) as typeof fetch;
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "hello" }],
  };
  const result = await handleChatCore({
    body,
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "fixture" },
    clientRawRequest: { endpoint: "/v1/chat/completions", body, headers: new Headers() },
    userAgent: "unit-test",
    isCombo: false,
    correlationId: id,
    log: { info() {}, error() {}, warn() {}, debug() {} },
  } as unknown as Parameters<typeof handleChatCore>[0]);
  assert.equal((result as { response: Response }).response.status, 200);
  assert.equal(await waitForCallLogSaves(20_000), true);
  const rows = await getCallLogs({ correlationId: id, limit: 10 });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].upstreamHttp?.send?.status, 200);
  assert.equal(rows[0].upstreamHttp?.total, 1);
  assert.equal(rows[0].tokens.in, 4);
  assert.equal(rows[0].tokens.out, 2);
});

test("actual Antigravity pass-through retains npm-undici response identity", async () => {
  const { Response: UndiciResponse } = await import("undici");
  const { buildFinalAntigravityResult } =
    await import("../../open-sse/executors/antigravity/executeAttempt.ts");
  const payload =
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"realm"}]},"finishReason":"STOP"}]}}\n\n';
  for (const [statuses, aborted] of [
    [[200], false],
    [[403, 200], false],
    [[200], true],
  ] as const) {
    const f = fixture();
    let sends = 0;
    globalThis.fetch = (async () => {
      const status = statuses[sends++] ?? 500;
      return new UndiciResponse(status === 200 ? payload : null, {
        status,
        headers: { "content-type": "text/event-stream" },
      });
    }) as typeof fetch;
    const sent = await runWithCapture(f.capture, () =>
      sendAntigravityRequest(
        "antigravity",
        "https://provider.example/content",
        "test-model",
        {},
        { model: "test-model", project: "fixture-quota-project", request: {} },
        { connectionId: "account-wire", providerSpecificData: { clientProfile: "ide" } },
        false,
        undefined,
        toSafeAntigravityLog(null),
        0,
        { value: 0 },
        f.id
      )
    );
    assert.equal(sent.response instanceof Response, false);
    const controller = new AbortController();
    if (aborted) controller.abort();
    const finalResult = buildFinalAntigravityResult(
      false,
      sent.response,
      "https://provider.example/content",
      {},
      {},
      "account-wire",
      controller.signal,
      () => {}
    );
    // A client that already left aborts the first-event peek (#13125): the final builder rejects
    // instead of returning a 499, and the caller persists that 499 with no selected send.
    const result = aborted
      ? await assert.rejects(finalResult, { name: "AbortError" }).then(() => ({
          upstreamHttpSelection: null,
          response: new Response("", { status: 499 }),
        }))
      : normalizeExecutorResult(await finalResult);
    const rows = await finish(f, result.upstreamHttpSelection, result.response.status);
    assert.equal(sends, statuses.length);
    assert.equal(rows.length, statuses.length + Number(aborted));
    assert.equal(rows.filter((row) => row.requestType !== "upstream_http_attempt").length, 1);
    const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
    assert.equal(logical?.upstreamHttp?.total, statuses.length);
    if (aborted) {
      assert.equal(result.upstreamHttpSelection, null);
      assert.equal(logical?.status, 499);
      assert.equal(logical?.upstreamHttp?.send, null);
      assert.equal(new Set(rows.map((row) => row.id)).size, 2);
      assert.equal(
        rows.every((row) => row.correlationId === f.id),
        true
      );
    } else assert.equal(logical?.upstreamHttp?.send?.status, 200);
    assert.deepEqual(
      rows.filter((row) => row.requestType === "upstream_http_attempt").map((row) => row.status),
      aborted ? [200] : statuses.length === 2 ? [403] : []
    );
    assert.equal(result.response.status, aborted ? 499 : 200);
    assert.equal(await result.response.text(), aborted ? "" : payload);
  }
});

import type { ProviderExecutionPipelineInput } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

test("signature pipeline persistence selects the recovered HTTP send", async () => {
  const { runProviderExecutionPipeline } =
    await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
  const f = fixture();
  let sends = 0;
  globalThis.fetch = (async () =>
    ++sends === 1
      ? Response.json(
          {
            error: {
              message: "invalid signature in thinking block",
              type: "invalid_request_error",
            },
          },
          { status: 400 }
        )
      : Response.json({
          id: "msg-ok",
          type: "message",
          role: "assistant",
          content: [{ type: "text", text: "recovered" }],
        })) as typeof fetch;
  const input: ProviderExecutionPipelineInput = {
    policy: { allowAccountRotation: false, allowModelFallback: false },
    target: {
      provider: "claude",
      requestedModel: "test-model",
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: false,
    },
    connection: {
      initialConnectionId: "account-wire",
      getCurrentConnectionId: () => "account-wire",
      getCredentials: () => ({ connectionId: "account-wire" }),
      replaceCredentials() {},
      onCredentialsRefreshed() {},
      assertManagedLeaseFence() {},
      getProviderCredentials: async () => null,
    },
    wire: {
      body: {},
      currentModel: "test-model",
      triedModels: new Set(["test-model"]),
      setBodyAndModel(body, model) {
        input.wire.body = body;
        input.wire.currentModel = model;
      },
    },
    state: {
      updatePendingStage() {},
      recordRateLimitHeaders() {},
      recordRateLimitBody() {},
      writeTerminalStatus: async () => {},
      persistConnectionPatch() {},
      setConnectionRateLimitedUntil() {},
      lockModel() {},
      recordAntigravityQuotaState: async () => {},
      markAccountSemaphoreBlocked() {},
      isolateProbeFailures: () => false,
    },
    sendProviderAttempt: async (model) => {
      const response = await observeProviderHttpSend(
        { provider: "claude", model, connectionId: "account-wire", endpoint: "messages" },
        () => fetch("https://provider.example/messages", { method: "POST" })
      );
      return {
        response,
        upstreamHttpSelection: selectHttpResponse(response),
        url: "https://provider.example/messages",
        headers: {},
        transformedBody: input.wire.body,
      };
    },
  };
  input.wire.body = {
    model: "test-model",
    messages: [
      { role: "user", content: "q1" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "old" },
          { type: "text", text: "a1" },
        ],
      },
      { role: "user", content: "q2" },
    ],
  };
  const outcome = await runWithCapture(f.capture, () => runProviderExecutionPipeline(input));
  assert.equal(outcome.kind, "response");
  assert.equal(sends, 2);
  const rows = await finish(
    f,
    outcome.upstreamHttpSelection ?? null,
    outcome.kind === "response" ? outcome.response.status : outcome.result.status
  );
  assert.equal(rows.length, 2);
  assert.deepEqual(
    rows.filter((row) => row.requestType === "upstream_http_attempt").map((row) => row.status),
    [400]
  );
  assert.equal(
    rows.find((row) => row.requestType !== "upstream_http_attempt")?.upstreamHttp?.send?.ordinal,
    2
  );
});

test("invalid empty fallback persistence selects the fallback parse outcome send", async () => {
  for (const kind of ["invalid_sse", "invalid_json"] as const) {
    const f = fixture();
    let sends = 0;
    let fallbackModel = "";
    globalThis.fetch = (async () => {
      if (++sends === 1)
        return Response.json({
          id: "empty",
          choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 0 },
        });
      return new Response(
        kind === "invalid_sse"
          ? 'data: {"error":{"message":"fixture malformed provider output"}}\n\n'
          : "not-json",
        {
          headers: {
            "content-type": kind === "invalid_sse" ? "text/event-stream" : "application/json",
          },
        }
      );
    }) as typeof fetch;
    const outcome = await runWithCapture(f.capture, () =>
      runNonStreamingProviderLeg(
        baseInput({
          clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
          allowModelFallback: true,
          provider: "gemini",
          model: "gemini-3-pro",
          connectionId: "account-wire",
          executeProviderRequest: async (model) => {
            if (sends > 0) fallbackModel = model;
            const response = await observeProviderHttpSend(
              {
                provider: "gemini",
                model,
                connectionId: "account-wire",
                endpoint: "generate_content",
              },
              () => fetch("https://provider.example/content", { method: "POST" })
            );
            return {
              response,
              upstreamHttpSelection: selectHttpResponse(response),
              url: "https://provider.example/content",
              headers: {},
              transformedBody: { model },
            };
          },
        })
      )
    );
    assert.equal(sends, 2);
    assert.equal(outcome.kind, "error");
    if (outcome.kind !== "error") continue;
    assert.equal(outcome.result.errorCode, kind + "_payload");
    const rows = await finish(f, outcome.upstreamHttpSelection ?? null, 502);
    assert.equal(rows.length, 2);
    const final = rows.find((row) => row.requestType !== "upstream_http_attempt");
    assert.equal(final?.upstreamHttp?.send?.ordinal, 2);
    assert.equal(final?.upstreamHttp?.send?.model, fallbackModel);
    assert.equal(
      rows.find((row) => row.requestType === "upstream_http_attempt")?.upstreamHttp?.send?.ordinal,
      1
    );
  }
});

test("local tool execution error is unassociated while a following provider error selects its own leg", async () => {
  const { runServerOwnedToolLoop } = await import("../../src/lib/skills/serverOwnedToolLoop.ts");
  const { ServerOwnedExecutionError } = await import("../../src/lib/skills/interception.ts");
  for (const localError of [true, false]) {
    const f = fixture();
    let sends = 0;
    const execute = async () => {
      const response = await observeProviderHttpSend(
        {
          provider: "openai",
          model: "test-model",
          connectionId: "account-wire",
          endpoint: "chat_completions",
        },
        async () => {
          sends++;
          return sends === 1
            ? Response.json({
                choices: [
                  {
                    message: {
                      role: "assistant",
                      content: null,
                      tool_calls: [
                        {
                          id: "tool-call",
                          type: "function",
                          function: { name: "memory_search", arguments: '{"query":"fixture"}' },
                        },
                      ],
                    },
                    finish_reason: "tool_calls",
                  },
                ],
                usage: { prompt_tokens: 2, completion_tokens: 1, total_tokens: 3 },
              })
            : Response.json({ error: { message: "provider leg refused" } }, { status: 503 });
        }
      );
      return {
        response,
        upstreamHttpSelection: selectHttpResponse(response),
        url: "https://provider.example/chat",
        headers: {},
        transformedBody: { model: "test-model" },
      };
    };
    const runLeg = () =>
      runWithCapture(f.capture, () =>
        runNonStreamingProviderLeg(
          baseInput({
            connectionId: "account-wire",
            allowModelFallback: false,
            allowAccountRotation: false,
            executeProviderRequest: execute,
          })
        )
      );
    const initialLeg = await runLeg();
    assert.equal(initialLeg.kind, "ok");
    if (initialLeg.kind !== "ok") continue;
    const result = await runServerOwnedToolLoop({
      initialLeg,
      sourceBody: { model: "test-model", messages: [{ role: "user", content: "fixture" }] },
      sourceFormat: "openai",
      skillsModelId: "test-model",
      executionContext: {
        apiKeyId: "fixture",
        sessionId: f.id,
        requestId: f.id,
        builtinToolNames: ["memory_search"],
      },
      executeServerOwned: async (calls) => {
        if (localError)
          throw new ServerOwnedExecutionError("fixture tool failure", "TOOL_EXECUTION_ERROR", 500);
        return calls.map((call) => ({
          id: call.id,
          name: call.name,
          result: { hits: [] },
          replayed: false,
        }));
      },
      resumeUpstream: runLeg,
      deadlineAtMs: performance.now() + 120_000,
    });
    assert.equal(result.kind, "error");
    assert.equal(sends, localError ? 1 : 2);
    assert.equal(result.cumulativeUsage?.total_tokens, 3);
    assert.equal(result.receipts.length, sends);
    const rows = await finish(f, result.upstreamHttpSelection ?? null, localError ? 500 : 503);
    assert.equal(rows.length, 2);
    assert.equal(new Set(rows.map((row) => row.id)).size, 2);
    assert.equal(
      rows.every((row) => row.correlationId === f.id),
      true
    );
    const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
    assert.equal(logical?.upstreamHttp?.total, sends);
    assert.equal(logical?.upstreamHttp?.send?.ordinal ?? null, localError ? null : 2);
    assert.equal(rows.find((row) => row.requestType === "upstream_http_attempt")?.status, 200);
  }
});

test("actual keyless inference with null credentials sends once and records null connection attribution", async () => {
  const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
  const f = fixture();
  let sends = 0;
  globalThis.fetch = (async () => {
    sends++;
    return Response.json({ ok: true });
  }) as typeof fetch;
  const input = {
    model: "big-pickle",
    stream: false,
    credentials: null,
    body: { model: "big-pickle", messages: [{ role: "user", content: "fixture" }] },
  };
  const result = normalizeExecutorResult(
    await runWithCapture(f.capture, () => new OpencodeExecutor("opencode-zen").execute(input))
  );
  assert.equal(sends, 1);
  assert.equal(result.response.status, 200);
  assert.equal(input.credentials, null);
  const saved = await finish(f, result.upstreamHttpSelection);
  assert.equal(saved.length, 1);
  assert.equal(saved[0].upstreamHttp?.total, 1);
  assert.equal(saved[0].upstreamHttp?.send?.status, 200);
  assert.equal(saved[0].upstreamHttp?.send?.connectionId, null);
});
