import assert from "node:assert/strict";
import test from "node:test";
import {
  API_KEY_ID,
  assertOnlySurvivor,
  BILLED_COST,
  captureOwner,
  cleanup,
  clearGeminiThoughtSignatures,
  completed,
  CONN,
  costRules,
  history,
  idleFallback,
  KEY,
  MODEL,
  pending,
  PROVIDER,
  stream,
  STREAM_IDLE_TIMEOUT_MS,
  translateRequest,
} from "./_helpers/pendingTerminalCleanup.ts";

test.beforeEach(() => {
  history.clearPendingRequests();
  costRules.resetCostData();
});
test.afterEach(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
});
test.after(async () => {
  history.clearPendingRequests();
  costRules.resetCostData();
  await cleanup();
});

test("completed retention failure releases only the terminal attempt and its bytes", (t) => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  const fault = new Error("controlled completed storage failure");
  const clone = t.mock.method(globalThis, "structuredClone", () => {
    throw fault;
  });
  assert.throws(
    () => history.finalizePendingRequestById(terminal, { status: 200 }),
    (error) => error === fault
  );
  clone.mock.restore();
  assertOnlySurvivor(survivor, survivorBytes);
  assert.equal(completed.getCompletedDetails().has(terminal), false);
  assert.equal(history.finalizePendingRequestById(terminal, { status: 200 }), false);
  assertOnlySurvivor(survivor, survivorBytes);
});

test("terminal streaming bookkeeping failure releases pending without changing client output", async (t) => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  const warnings: unknown[][] = [];
  t.mock.method(console, "debug", (...args: unknown[]) => {
    warnings.push(args);
  });
  const result = await stream(terminal, true);
  assert.match(result.text, /fixture answer/);
  assert.match(result.text, /\[DONE\]/);
  assert.equal(result.outcome.result.success, true);
  assert.equal(result.released(), 1);
  assert.ok(warnings.some((args) => String(args[0]).includes("onComplete callback error")));
  assertOnlySurvivor(survivor, survivorBytes);
  assert.equal(completed.getCompletedDetails().get(terminal)?.status, 200);
  result.outcome.carry.onPipelineStreamError?.({ message: "late failure", statusCode: 502 });
  assert.equal(result.writes(), 0);
  assert.equal(result.failures(), 0);
  assert.equal(costRules.getCostSummary(API_KEY_ID).totalEntries, 0);
  assertOnlySurvivor(survivor, survivorBytes);
});

test("successful stream records once and duplicate terminal signals leave concurrent attempts untouched", async () => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  const result = await stream(terminal, false);
  for (let i = 0; i < 100 && costRules.getCostSummary(API_KEY_ID).totalEntries === 0; i++) {
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  assert.equal(costRules.getCostSummary(API_KEY_ID).totalEntries, 1);
  assert.equal(costRules.getDailyTotal(API_KEY_ID), BILLED_COST);
  assert.match(result.text, /fixture answer/);
  assert.equal(result.writes(), 1);
  assert.equal(result.failures(), 0);
  assert.equal(result.released(), 1);
  assertOnlySurvivor(survivor, survivorBytes);
  const normal = completed.getCompletedDetails().get(terminal);
  assert.equal(normal?.status, 200);
  assert.ok(normal?.clientResponse);
  assert.ok(normal?.providerResponse);
  const stats = completed.getCompletedDetailsCacheStats();
  assert.equal(stats.entries, 1);
  assert.equal(stats.cleanupTimers, 1);
  assert.ok(stats.bytes > 0 && stats.bytes <= completed.MAX_COMPLETED_DETAILS_BYTES);
  for (let i = 0; i < 2; i++) {
    assert.equal(
      result.outcome.carry.onPipelineStreamError?.({
        message: "late terminal signal",
        statusCode: 502,
      }),
      true
    );
    assert.equal(
      result.outcome.carry.onClientDisconnectFinalize?.({ reason: "late disconnect", duration: 0 }),
      true
    );
    assert.equal(history.finalizePendingRequestById(terminal, { status: 499 }), false);
  }
  assert.equal(result.writes(), 1);
  assert.equal(result.failures(), 0);
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(costRules.getCostSummary(API_KEY_ID).totalEntries, 1);
  assert.equal(costRules.getDailyTotal(API_KEY_ID), BILLED_COST);
  assert.deepEqual(completed.getCompletedDetailsCacheStats(), stats);
  assert.equal(completed.getCompletedDetails().get(terminal), normal);
  assertOnlySurvivor(survivor, survivorBytes);
});

test("completed cleanup scheduling failure still releases pending after storing the normal record", (t) => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  const fault = new Error("controlled completed timer failure");
  const original = globalThis.setTimeout;
  const timer = t.mock.method(
    globalThis,
    "setTimeout",
    (...args: Parameters<typeof setTimeout>) => {
      if (args[1] === 120_000) throw fault;
      return original(...args);
    }
  );
  assert.throws(
    () =>
      history.finalizePendingRequestById(terminal, {
        status: 200,
        providerResponse: { content: "provider fixture" },
        clientResponse: { content: "client fixture" },
      }),
    (error) => error === fault
  );
  timer.mock.restore();
  assertOnlySurvivor(survivor, survivorBytes);
  assert.equal(completed.getCompletedDetails().get(terminal)?.status, 200);
  assert.equal(history.finalizePendingRequestById(terminal, { status: 200 }), false);
});

test("connection bookkeeping failure still finalizes the exact pending ID", async (t) => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  t.mock.method(console, "debug", () => {});
  const result = await stream(terminal, "connection");
  assert.match(result.text, /fixture answer/);
  assert.equal(result.outcome.result.success, true);
  assert.equal(result.writes(), 0);
  assertOnlySurvivor(survivor, survivorBytes);
  assert.equal(completed.getCompletedDetails().get(terminal)?.connectionId, CONN);
});

test("terminal metadata normalization failure also releases the pending attempt", () => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  const fault = new Error("controlled terminal metadata failure");
  assert.throws(
    () =>
      history.finalizePendingRequestById(terminal, {
        get status(): number {
          throw fault;
        },
      }),
    (error) => error === fault
  );
  assertOnlySurvivor(survivor, survivorBytes);
  assert.equal(completed.getCompletedDetails().has(terminal), false);
});

test("normal finalization releases the original pending bytes when response metadata changes", () => {
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  const terminal = pending();
  const metadata = {
    status: 200,
    providerRequest: { model: MODEL, messages: [{ role: "user", content: "replaced request" }] },
    providerResponse: { content: "provider fixture".repeat(10) },
    clientResponse: { content: "client fixture".repeat(20) },
  };
  assert.equal(history.finalizePendingRequestById(terminal, metadata), true);
  assertOnlySurvivor(survivor, survivorBytes);
  const normal = completed.getCompletedDetails().get(terminal);
  assert.equal(normal?.status, 200);
  assert.deepEqual(normal?.providerRequest, metadata.providerRequest);
  assert.deepEqual(normal?.providerResponse, metadata.providerResponse);
  assert.deepEqual(normal?.clientResponse, metadata.clientResponse);
  assert.ok(typeof normal?.completedAt === "number");
  assert.ok(typeof normal?.durationMs === "number" && normal.durationMs >= 0);
  assert.equal(history.finalizePendingRequestById(terminal, { status: 499 }), false);
  assertOnlySurvivor(survivor, survivorBytes);
  assert.equal(history.finalizePendingRequestById(survivor, metadata), true);
  assert.equal(history.getPendingById().size, 0);
  assert.equal(history.getPendingRetainedBytes(), 0);
  assert.deepEqual(Object.keys(history.getPendingRequests().byModel), []);
  assert.deepEqual(Object.keys(history.getPendingRequests().byAccount), []);
});

for (const formats of [
  { name: "passthrough", targetFormat: "openai", clientResponseFormat: "openai" },
  { name: "translation", targetFormat: "openai", clientResponseFormat: "claude" },
  {
    name: "Responses translation",
    targetFormat: "openai-responses",
    clientResponseFormat: "openai",
  },
]) {
  for (const owner of [
    { name: "raw connection", rawConnectionId: CONN },
    { name: "credential connection with null raw ID", rawConnectionId: null },
    { name: "credential connection with omitted raw ID", rawConnectionId: undefined },
    {
      name: "credentials rotated after pending admission",
      rawConnectionId: null,
      currentConnectionId: "terminal-provider-connection",
    },
  ]) {
    test(`${formats.name}: ${owner.name}: idle failure with a throwing completion callback preserves the newer sibling`, async (t) => {
      const terminal = pending();
      const terminalBytes = history.getPendingRetainedBytes();
      const survivor = pending();
      const survivorBytes = history.getPendingRetainedBytes() - terminalBytes;
      let idleTick: (() => void) | undefined;
      const original = globalThis.setInterval;
      t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
        if (delay === 10_000) idleTick = callback;
        return original(callback, delay);
      });
      const warnings: unknown[][] = [];
      t.mock.method(console, "debug", (...args: unknown[]) => warnings.push(args));
      t.mock.method(console, "warn", () => {});
      const result = await stream(terminal, true, {
        ...formats,
        rawConnectionId: owner.rawConnectionId,
        currentConnectionId: owner.currentConnectionId,
        idle: () => {
          assert.ok(idleTick, "the real SSE watchdog must have registered");
          const now = Date.now();
          t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
          idleTick();
        },
      });
      assert.ok(
        warnings.some((args) => String(args[0]).includes("onFailure callback error (idle_timeout)"))
      );
      assertOnlySurvivor(survivor, survivorBytes);
      assert.match(result.text, /Idle timeout/);
      assert.equal(result.readError, undefined);
      assert.equal(completed.getCompletedDetails().get(terminal)?.status, 504);
      assert.equal(result.writes(), 0);
      assert.equal(result.failures(), 0);
      assert.equal(result.released(), 1);
      assert.equal(costRules.getCostSummary(API_KEY_ID).totalEntries, 0);
      for (let i = 0; i < 2; i++) {
        assert.equal(
          result.outcome.carry.onPipelineStreamError?.({
            message: "duplicate timeout",
            statusCode: 504,
          }),
          true
        );
        assert.equal(
          result.outcome.carry.onClientDisconnectFinalize?.({
            reason: "duplicate timeout",
            duration: 0,
          }),
          true
        );
        assert.equal(history.finalizePendingRequestById(terminal, { status: 499 }), false);
        assertOnlySurvivor(survivor, survivorBytes);
      }
      assert.equal(result.released(), 1);
      assert.equal(result.writes(), 0);
      assert.equal(result.failures(), 0);
    });
  }
}

for (const rawConnectionId of [null, undefined]) {
  test(`credential-only Gemini stream preserves follow-up signatures with raw ID ${String(rawConnectionId)}`, async () => {
    clearGeminiThoughtSignatures();
    try {
      const model = "gemini-2.5-flash";
      const signature = "fixture-gemini-thought-signature";
      const id = history.trackPendingRequest(model, "gemini", CONN, true);
      assert.ok(id);
      const chunk = {
        candidates: [
          {
            content: {
              role: "model",
              parts: [
                {
                  functionCall: { id: "call_fixture", name: "lookup", args: { place: "Tokyo" } },
                  thoughtSignature: signature,
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
        usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 2, totalTokenCount: 12 },
      };
      const result = await stream(id, false, {
        provider: "gemini",
        model,
        targetFormat: "gemini",
        rawConnectionId,
        wire: `data: ${JSON.stringify(chunk)}\n\n`,
      });
      type ToolCall = { id?: string };
      const calls = result.text
        .split("\n")
        .filter((line) => line.startsWith("data: {"))
        .flatMap((line) => {
          const payload = JSON.parse(line.slice(6)) as {
            choices?: Array<{ delta?: { tool_calls?: ToolCall[] } }>;
          };
          return payload.choices?.flatMap((choice) => choice.delta?.tool_calls ?? []) ?? [];
        });
      const callId = calls.find((call) => call.id)?.id;
      assert.ok(callId, "the real Gemini stream must emit a client tool-call ID");
      const followup = translateRequest(
        "openai",
        "gemini",
        model,
        {
          model,
          messages: [
            { role: "user", content: "Look up Tokyo" },
            {
              role: "assistant",
              content: null,
              tool_calls: [
                {
                  id: callId,
                  type: "function",
                  function: { name: "lookup", arguments: JSON.stringify({ place: "Tokyo" }) },
                },
              ],
            },
            { role: "tool", tool_call_id: callId, content: "sunny" },
          ],
        },
        false,
        { connectionId: CONN },
        "gemini",
        null,
        { signatureNamespace: rawConnectionId }
      ) as {
        contents: Array<{ parts: Array<{ functionCall?: unknown; thoughtSignature?: string }> }>;
      };
      const part = followup.contents
        .flatMap((content) => content.parts)
        .find((entry) => entry.functionCall);
      assert.equal(part?.thoughtSignature, signature);
      assert.equal(history.getPendingById().has(id), false);
      assert.equal(history.getPendingRetainedBytes(), 0);
    } finally {
      clearGeminiThoughtSignatures();
    }
  });
}

test("fallback resolves a live explicit ID's registered owner with no raw connection", async (t) => {
  const terminal = pending();
  const terminalBytes = history.getPendingRetainedBytes();
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes() - terminalBytes;
  await idleFallback(t, captureOwner(terminal), null);
  assertOnlySurvivor(survivor, survivorBytes);
});

test("an explicit ID absent before stream construction leaves its sibling counters intact", async (t) => {
  const terminal = pending();
  history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, terminal);
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes();
  await idleFallback(t, terminal, null);
  assertOnlySurvivor(survivor, survivorBytes);
});

test("fallback without an explicit ID preserves legacy FIFO cleanup", async (t) => {
  pending();
  const firstBytes = history.getPendingRetainedBytes();
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes() - firstBytes;
  await idleFallback(t, null, CONN);
  assertOnlySurvivor(survivor, survivorBytes);
});

test("fallback without an explicit ID preserves model-only cleanup", async (t) => {
  history.trackPendingRequest(MODEL, PROVIDER, null, true);
  assert.equal(history.getPendingRequests().byModel[KEY], 1);
  await idleFallback(t, null, null);
  assert.equal(history.getPendingRequests().byModel[KEY], 0);
  assert.equal(history.getPendingById().size, 0);
  assert.equal(history.getPendingRetainedBytes(), 0);
});

for (const mode of ["success", "idle", "cancel", "abort", "error", "readiness"] as const) {
  test(`model-only generated-ID ${mode} releases one of two same-model admissions`, async (t) => {
    assert.equal(history.trackPendingRequest(MODEL, PROVIDER, null, true), undefined);
    assert.equal(history.trackPendingRequest(MODEL, PROVIDER, null, true), undefined);
    assert.equal(history.getPendingRequests().byModel[KEY], 2);
    let idleTick: (() => void) | undefined;
    const original = globalThis.setInterval;
    t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
      if (delay === 10_000) idleTick = callback;
      return original(callback, delay);
    });
    t.mock.method(console, "warn", () => {});
    t.mock.method(console, "debug", () => {});
    const result = await stream(`generated-model-only-log-${mode}`, mode === "idle", {
      rawConnectionId: null,
      pendingConnectionId: null,
      currentConnectionId: null,
      readinessFailure: mode === "readiness",
      lifecycle: mode === "cancel" || mode === "abort" || mode === "error" ? mode : undefined,
      idle:
        mode === "idle"
          ? () => {
              assert.ok(idleTick);
              const now = Date.now();
              t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
              idleTick();
            }
          : undefined,
    });
    if (mode === "success") assert.match(result.text, /fixture answer/);
    if (mode === "abort") {
      assert.deepEqual(result.abortState, {
        pendingCount: 1,
        pendingIds: [],
        bytes: 0,
      });
    }
    if (mode === "idle") assert.match(result.text, /Idle timeout/);
    if (mode === "readiness") assert.equal(result.outcome.result.success, false);
    assert.equal(result.released(), 1);
    assert.equal(history.getPendingRequests().byModel[KEY], 1);
    assert.equal(history.getPendingById().size, 0);
    assert.equal(history.getPendingRetainedBytes(), 0);
    for (let i = 0; i < 2; i++) {
      result.controller.handleDisconnect("duplicate disconnect");
      result.outcome.carry.onPipelineStreamError?.({ message: "duplicate error", statusCode: 502 });
      assert.equal(history.getPendingRequests().byModel[KEY], 1);
      assert.equal(result.released(), 1);
    }
  });
}

for (const rawConnectionId of [null, undefined]) {
  for (const stale of [false, true]) {
    test(`real indexed controller cancellation preserves its sibling (raw ${String(rawConnectionId)}, stale ${stale})`, async () => {
      const terminal = pending();
      const terminalBytes = history.getPendingRetainedBytes();
      if (stale) history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, terminal);
      const survivor = pending();
      const survivorBytes = stale
        ? history.getPendingRetainedBytes()
        : history.getPendingRetainedBytes() - terminalBytes;
      const result = await stream(terminal, false, { rawConnectionId, lifecycle: "cancel" });
      assert.equal(result.released(), 1);
      assertOnlySurvivor(survivor, survivorBytes);
      result.outcome.carry.onPipelineStreamError?.({
        message: "settle cancellation",
        statusCode: 499,
      });
      result.controller.handleDisconnect("duplicate cancellation");
      assertOnlySurvivor(survivor, survivorBytes);
      assert.equal(result.released(), 1);
    });
  }
}
