import assert from "node:assert/strict";
import test from "node:test";
import {
  assertOnlySurvivor,
  captureLogger,
  captureOwner,
  cleanup,
  completed,
  CONN,
  correlatedAttempts,
  costRules,
  createPassthroughStreamWithLogger,
  finalizePendingScope,
  history,
  idleFallback,
  KEY,
  MODEL,
  pending,
  PROVIDER,
  stream,
  STREAM_IDLE_TIMEOUT_MS,
  updatePendingScope,
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

for (const failure of ["none", "storage", "scheduling"] as const) {
  test(`real logger capture and preview updates conserve sibling bytes after ${failure} finalization`, async (t) => {
    const survivor = pending();
    const survivorBytes = history.getPendingRetainedBytes();
    const terminal = pending();
    const logger = await captureLogger(terminal);
    const providerResponse = { content: "updated provider preview".repeat(10) };
    assert.equal(history.updatePendingRequestById(terminal, { providerResponse }), true);
    logger.appendProviderChunk("captured after the first preview update".repeat(64));
    assert.equal(logger.getPipelinePayloads()?.streamChunks?.provider?.length, 2);
    const clientResponse = { content: "updated client preview".repeat(20) };
    history.updatePendingRequest(MODEL, PROVIDER, CONN, { clientResponse });
    const detail = history.getPendingById().get(terminal);
    assert.deepEqual(detail?.providerResponse, providerResponse);
    assert.deepEqual(detail?.clientResponse, clientResponse);
    assert.equal(detail?.streamChunks?.provider?.length, 2);
    const fault = new Error(`controlled captured ${failure} failure`);
    const clone =
      failure === "storage"
        ? t.mock.method(globalThis, "structuredClone", () => {
            throw fault;
          })
        : null;
    const original = globalThis.setTimeout;
    const timer =
      failure === "scheduling"
        ? t.mock.method(globalThis, "setTimeout", (...args: Parameters<typeof setTimeout>) => {
            if (args[1] === 120_000) throw fault;
            return original(...args);
          })
        : null;
    if (failure === "none") {
      assert.equal(history.finalizePendingRequestById(terminal, { status: 200 }), true);
    } else {
      assert.throws(
        () => history.finalizePendingRequestById(terminal, { status: 200 }),
        (error) => error === fault
      );
    }
    clone?.mock.restore();
    timer?.mock.restore();
    assertOnlySurvivor(survivor, survivorBytes);
    if (failure !== "storage") {
      const stored = completed.getCompletedDetails().get(terminal);
      assert.deepEqual(stored?.providerResponse, providerResponse);
      assert.deepEqual(stored?.clientResponse, clientResponse);
      assert.match(stored?.streamChunks?.provider?.[0] ?? "", /captured provider fixture/);
      assert.equal(stored?.streamChunks?.provider?.length, 2);
    }
    for (let i = 0; i < 2; i++) {
      assert.equal(history.finalizePendingRequestById(terminal, { status: 499 }), false);
      history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, terminal);
      assertOnlySurvivor(survivor, survivorBytes);
    }
    assert.equal(history.finalizePendingRequestById(survivor, { status: 200 }), true);
    assert.equal(history.getPendingRetainedBytes(), 0);
    assert.equal(history.getPendingById().size, 0);
  });
}

for (const formats of [
  { name: "passthrough", targetFormat: "openai", clientResponseFormat: "openai" },
  { name: "translation", targetFormat: "openai", clientResponseFormat: "claude" },
  {
    name: "Responses translation",
    targetFormat: "openai-responses",
    clientResponseFormat: "openai",
  },
]) {
  for (const mode of ["success", "bookkeeping", "idle", "cancel"] as const) {
    test(`real logger ${formats.name} ${mode} preserves captured output and sibling accounting`, async (t) => {
      const survivor = pending();
      const survivorBytes = history.getPendingRetainedBytes();
      const terminal = pending();
      const logger = await captureLogger(terminal);
      history.updatePendingRequestById(terminal, {
        providerRequest: {
          model: MODEL,
          messages: [{ role: "user", content: "updated after capture" }],
        },
      });
      let idleTick: (() => void) | undefined;
      const original = globalThis.setInterval;
      t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
        if (delay === 10_000) idleTick = callback;
        return original(callback, delay);
      });
      t.mock.method(console, "debug", () => {});
      t.mock.method(console, "warn", () => {});
      const responseMessage = {
        type: "message",
        id: "msg_fixture",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: "fixture answer" }],
      };
      const responsesWire = [
        { type: "response.created", response: { id: "resp_fixture", status: "in_progress" } },
        {
          type: "response.output_item.added",
          output_index: 0,
          item: { ...responseMessage, status: "in_progress", content: [] },
        },
        {
          type: "response.output_text.delta",
          item_id: "msg_fixture",
          output_index: 0,
          content_index: 0,
          delta: "fixture answer",
        },
        { type: "response.output_item.done", output_index: 0, item: responseMessage },
        {
          type: "response.completed",
          response: {
            id: "resp_fixture",
            status: "completed",
            output: [responseMessage],
            usage: { input_tokens: 10, output_tokens: 2, total_tokens: 12 },
          },
        },
      ]
        .map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`)
        .join("");
      const result = await stream(terminal, mode === "bookkeeping" || mode === "idle", {
        ...formats,
        wire: formats.targetFormat === "openai-responses" ? responsesWire : undefined,
        rawConnectionId: null,
        reqLogger: logger,
        lifecycle: mode === "cancel" ? "cancel" : undefined,
        idle:
          mode === "idle"
            ? () => {
                assert.ok(idleTick, "the real SSE watchdog must have registered");
                const now = Date.now();
                t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
                idleTick();
              }
            : undefined,
      });
      t.after(() => result.controller.handleDisconnect("close captured fixture after assertions"));
      assertOnlySurvivor(survivor, survivorBytes);
      assert.ok(logger.getPipelinePayloads()?.streamChunks?.provider?.length);
      if (mode !== "cancel") {
        const stored = completed.getCompletedDetails().get(terminal);
        assert.match(stored?.streamChunks?.provider?.[0] ?? "", /captured provider fixture/);
        assert.match(result.text, mode === "idle" ? /Idle timeout/ : /fixture answer|\[DONE\]/);
        assert.ok((stored?.streamChunks?.provider?.length ?? 0) > 1);
      }
      const writes = result.writes();
      const failures = result.failures();
      for (let i = 0; i < 2; i++) {
        result.controller.handleDisconnect("duplicate captured terminal signal");
        result.outcome.carry.onPipelineStreamError?.({
          message: "duplicate captured error",
          statusCode: 502,
        });
        assert.equal(history.finalizePendingRequestById(terminal, { status: 499 }), false);
        assertOnlySurvivor(survivor, survivorBytes);
        assert.equal(result.released(), 1);
        assert.equal(result.writes(), writes);
        assert.equal(result.failures(), failures);
      }
    });
  }
}

test("real captured logger fallback releases its exact ID and preserves sibling bytes", async (t) => {
  const terminal = pending();
  const terminalBytes = history.getPendingRetainedBytes();
  const survivor = pending();
  const survivorBytes = history.getPendingRetainedBytes() - terminalBytes;
  const logger = await captureLogger(terminal);
  history.updatePendingRequestById(terminal, { clientResponse: { content: "fallback preview" } });
  await idleFallback(t, captureOwner(terminal), null, logger);
  assertOnlySurvivor(survivor, survivorBytes);
  assert.match(
    logger.getPipelinePayloads()?.streamChunks?.provider?.[0] ?? "",
    /captured provider fixture/
  );
  for (let i = 0; i < 2; i++) {
    history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, terminal);
    assert.equal(history.finalizePendingRequestById(terminal, { status: 499 }), false);
    assertOnlySurvivor(survivor, survivorBytes);
  }
});

for (const scenario of [
  {
    name: "different connections: A completes",
    sameConnection: false,
    terminal: "A",
    mode: "success",
  },
  {
    name: "different connections: A idle bookkeeping failure",
    sameConnection: false,
    terminal: "A",
    mode: "idle",
  },
  {
    name: "different connections: A lower fallback",
    sameConnection: false,
    terminal: "A",
    mode: "fallback",
  },
  {
    name: "different connections: A controller cancellation",
    sameConnection: false,
    terminal: "A",
    mode: "cancel",
  },
  { name: "same connection: A completes", sameConnection: true, terminal: "A", mode: "success" },
  {
    name: "same connection: B completes first",
    sameConnection: true,
    terminal: "B",
    mode: "success",
  },
  {
    name: "same connection: B idle bookkeeping failure",
    sameConnection: true,
    terminal: "B",
    mode: "idle",
  },
] as const) {
  test(`admission ownership: ${scenario.name}`, async (t) => {
    const pair = correlatedAttempts(scenario.sameConnection);
    const terminalOwner = scenario.terminal === "A" ? pair.ownerA : pair.ownerB;
    const terminalConnection = scenario.terminal === "A" ? CONN : pair.connectionB;
    const survivor = scenario.terminal === "A" ? pair.detailB : pair.detailA;
    const survivorOwner = scenario.terminal === "A" ? pair.ownerB : pair.ownerA;
    const survivorBytes = scenario.terminal === "A" ? pair.bytesB : pair.bytesA;
    if (scenario.mode === "fallback") {
      await idleFallback(t, terminalOwner, terminalConnection);
    } else {
      let idleTick: (() => void) | undefined;
      const original = globalThis.setInterval;
      t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
        if (delay === 10_000) idleTick = callback;
        return original(callback, delay);
      });
      t.mock.method(console, "debug", () => {});
      t.mock.method(console, "warn", () => {});
      const result = await stream(pair.id, scenario.mode === "idle", {
        rawConnectionId: terminalConnection,
        currentConnectionId: terminalConnection,
        pendingConnectionId: terminalConnection,
        pendingRequestOwner: terminalOwner,
        lifecycle: scenario.mode === "cancel" ? "cancel" : undefined,
        idle:
          scenario.mode === "idle"
            ? () => {
                assert.ok(idleTick);
                const now = Date.now();
                t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
                idleTick();
              }
            : undefined,
      });
      t.after(() => result.controller.handleDisconnect("close shared-correlation fixture"));
      assert.equal(result.outcome.result.response.headers.get("x-omniroute-request-id"), pair.id);
      assert.equal(result.released(), 1);
      result.outcome.carry.onPipelineStreamError?.({
        message: "duplicate terminal callback",
        statusCode: 502,
      });
      result.controller.handleDisconnect("duplicate shared-correlation disconnect");
      assert.equal(result.released(), 1);
    }
    assert.deepEqual(pair.bucket(), [survivor]);
    assert.equal(history.getPendingRetainedBytes(), survivorBytes);
    assert.equal(history.getPendingRequests().byModel[KEY], 1);
    assert.equal(history.getPendingRequests().byAccount[survivor.connectionId!]?.[KEY], 1);
    assert.equal(
      history.getPendingById().get(pair.id),
      scenario.terminal === "A" ? survivor : undefined
    );
    assert.equal(history.finalizePendingRequestById(terminalOwner, { status: 499 }), false);
    history.trackPendingRequest(
      MODEL,
      PROVIDER,
      terminalConnection,
      false,
      undefined,
      terminalOwner
    );
    assert.deepEqual(pair.bucket(), [survivor]);
    assert.equal(history.getPendingRetainedBytes(), survivorBytes);
    assert.equal(history.finalizePendingRequestById(survivorOwner, { status: 200 }), true);
    assert.equal(history.getPendingRetainedBytes(), 0);
    assert.equal(history.getPendingById().size, 0);
    assert.deepEqual(pair.bucket(), []);
    assert.equal(history.getPendingRequests().byModel[KEY] ?? 0, 0);
  });
}

for (const sameConnection of [false, true]) {
  test(`admission ownership: late A after sequential ID reuse (same connection ${sameConnection})`, async (t) => {
    const correlationId = "sequential-correlation";
    const id = history.trackPendingRequest(MODEL, PROVIDER, CONN, true, { correlationId });
    assert.ok(id);
    const ownerA = captureOwner(id);
    let idleTick: (() => void) | undefined;
    const original = globalThis.setInterval;
    t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
      if (delay === 10_000) idleTick = callback;
      return original(callback, delay);
    });
    t.mock.method(console, "debug", () => {});
    t.mock.method(console, "warn", () => {});
    const transform = createPassthroughStreamWithLogger(
      PROVIDER,
      null,
      null,
      MODEL,
      CONN,
      null,
      null,
      null,
      () => {
        throw new Error("controlled late A fallback failure");
      },
      null,
      null,
      null,
      ownerA
    );
    history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, ownerA);
    const connectionB = sameConnection ? CONN : "sequential-connection-B";
    assert.equal(
      history.trackPendingRequest(MODEL, PROVIDER, connectionB, true, { correlationId }),
      id
    );
    const ownerB = captureOwner(id);
    const detailB = history.getPendingById().get(id);
    const bytesB = history.getPendingRetainedBytes();
    assert.ok(idleTick);
    const now = Date.now();
    t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
    idleTick();
    await assert.rejects(new Response(transform.readable).text(), /Idle timeout/);
    assert.equal(history.getPendingById().get(id), detailB);
    assert.equal(history.getPendingRequests().byModel[KEY], 1);
    assert.equal(history.getPendingRequests().byAccount[connectionB]?.[KEY], 1);
    assert.equal(history.getPendingRetainedBytes(), bytesB);
    assert.equal(history.updatePendingRequestById(ownerA, { status: 499 }), false);
    assert.equal(history.finalizePendingRequestById(ownerA, { status: 499 }), false);
    assert.equal(history.finalizePendingRequestById(ownerB, { status: 200 }), true);
    assert.equal(history.getPendingRetainedBytes(), 0);
  });

  test(`admission ownership: scoped updates stay on A (same connection ${sameConnection})`, () => {
    const pair = correlatedAttempts(sameConnection);
    const scopeA = {
      id: pair.id,
      model: MODEL,
      provider: PROVIDER,
      connectionId: CONN,
      owner: typeof pair.ownerA === "string" ? undefined : pair.ownerA,
    };
    const payload = { content: "A-specific preview" };
    updatePendingScope(scopeA, { providerResponse: payload });
    assert.deepEqual(pair.detailA.providerResponse, payload);
    assert.equal(pair.detailB.providerResponse, undefined);
    finalizePendingScope(scopeA, { status: 200 });
    assert.deepEqual(pair.bucket(), [pair.detailB]);
    assert.equal(history.getPendingById().get(pair.id), pair.detailB);
    assert.equal(history.getPendingRetainedBytes(), pair.bytesB);
    assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 200 }), true);
    assert.equal(history.getPendingRetainedBytes(), 0);
  });
}

for (const failure of ["normalization", "storage", "scheduling"] as const) {
  test(`admission ownership: B-first ${failure} fault preserves older A in the same bucket`, (t) => {
    const pair = correlatedAttempts(true);
    const fault = new Error(`controlled owned ${failure} fault`);
    if (failure === "storage")
      t.mock.method(globalThis, "structuredClone", () => {
        throw fault;
      });
    const original = globalThis.setTimeout;
    if (failure === "scheduling")
      t.mock.method(globalThis, "setTimeout", (...args: Parameters<typeof setTimeout>) => {
        if (args[1] === 120_000) throw fault;
        return original(...args);
      });
    const metadata =
      failure === "normalization"
        ? {
            get status(): number {
              throw fault;
            },
          }
        : { status: 200 };
    assert.throws(
      () => history.finalizePendingRequestById(pair.ownerB, metadata),
      (error) => error === fault
    );
    t.mock.restoreAll();
    assert.deepEqual(pair.bucket(), [pair.detailA]);
    assert.equal(history.getPendingById().has(pair.id), false);
    assert.equal(history.getPendingRetainedBytes(), pair.bytesA);
    assert.equal(history.getPendingRequests().byModel[KEY], 1);
    assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 499 }), false);
    assert.equal(history.finalizePendingRequestById(pair.ownerA, { status: 200 }), true);
    assert.equal(history.getPendingRetainedBytes(), 0);
  });
}

test("admission ownership: an empty indexed owner never decrements model-only counters", () => {
  history.trackPendingRequest(MODEL, PROVIDER, null, true);
  history.trackPendingRequest(MODEL, PROVIDER, null, true);
  const missing = captureOwner("withdrawn-indexed-attempt");
  history.trackPendingRequest(MODEL, PROVIDER, null, false, undefined, missing);
  assert.equal(history.getPendingRequests().byModel[KEY], 2);
  assert.equal(history.updatePendingRequestById(missing, { status: 499 }), false);
  assert.equal(history.finalizePendingRequestById(missing, { status: 499 }), false);
  assert.equal(history.getPendingRetainedBytes(), 0);
});

for (const sameConnection of [false, true]) {
  test(`legacy string fallback stays connection anchored after correlation reuse (same connection ${sameConnection})`, async (t) => {
    const pair = correlatedAttempts(sameConnection);
    await idleFallback(t, pair.id, CONN);
    assert.deepEqual(pair.bucket(), [pair.detailB]);
    assert.equal(history.getPendingById().get(pair.id), pair.detailB);
    assert.equal(history.getPendingRetainedBytes(), pair.bytesB);
    assert.equal(history.getPendingRequests().byModel[KEY], 1);
    assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 200 }), true);
    assert.equal(history.getPendingRetainedBytes(), 0);
  });
}

test("legacy string fallback without an owner connection does not promote the latest map entry", async (t) => {
  const pair = correlatedAttempts(false);
  await idleFallback(t, pair.id, null);
  assert.deepEqual(pair.bucket(), [pair.detailA, pair.detailB]);
  assert.equal(history.getPendingById().get(pair.id), pair.detailB);
  assert.equal(history.getPendingRetainedBytes(), pair.bytesA + pair.bytesB);
  assert.equal(history.getPendingRequests().byModel[KEY], 2);
  assert.equal(history.finalizePendingRequestById(pair.ownerA, { status: 200 }), true);
  assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 200 }), true);
  assert.equal(history.getPendingRetainedBytes(), 0);
});

test("owned finalization rechecks object membership after normalization withdraws the attempt", () => {
  const pair = correlatedAttempts(true);
  let withdrawals = 0;
  assert.equal(
    history.finalizePendingRequestById(pair.ownerA, {
      get status() {
        if (withdrawals++ === 0) {
          history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, pair.ownerA);
        }
        return 200;
      },
    }),
    true
  );
  assert.deepEqual(pair.bucket(), [pair.detailB]);
  assert.equal(history.getPendingById().get(pair.id), pair.detailB);
  assert.equal(history.getPendingRetainedBytes(), pair.bytesB);
  assert.equal(history.getPendingRequests().byModel[KEY], 1);
  assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 200 }), true);
  assert.equal(history.getPendingRetainedBytes(), 0);
});

test("reentrant pending update cannot charge an owned attempt removed during normalization", () => {
  const pair = correlatedAttempts(true);
  let removed = false;
  const updated = history.updatePendingRequestById(pair.ownerA, {
    clientResponse: { content: "new preview for withdrawn A" },
    get status() {
      if (!removed) {
        removed = true;
        history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, pair.ownerA);
      }
      return 200;
    },
  });
  assert.deepEqual(pair.bucket(), [pair.detailB]);
  assert.equal(history.getPendingById().get(pair.id), pair.detailB);
  assert.equal(history.getPendingRetainedBytes(), pair.bytesB);
  assert.equal(updated, false);
  assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 200 }), true);
  assert.equal(history.getPendingRetainedBytes(), 0);
});

test("reentrant preview update during finalization releases the attempt's current charge", () => {
  const pair = correlatedAttempts(true);
  let updated = false;
  assert.equal(
    history.finalizePendingRequestById(pair.ownerA, {
      get status() {
        if (!updated) {
          updated = true;
          history.updatePendingRequestById(pair.ownerA, {
            clientResponse: { content: "reentrant charged A preview" },
          });
        }
        return 200;
      },
    }),
    true
  );
  assert.deepEqual(pair.bucket(), [pair.detailB]);
  assert.equal(history.getPendingById().get(pair.id), pair.detailB);
  assert.equal(history.getPendingRetainedBytes(), pair.bytesB);
  assert.equal(history.finalizePendingRequestById(pair.ownerB, { status: 200 }), true);
  assert.equal(history.getPendingRetainedBytes(), 0);
});

test("legacy preview update rechecks its selected detail after normalization withdraws it", () => {
  const pair = correlatedAttempts(true);
  let removed = false;
  history.updatePendingRequest(MODEL, PROVIDER, CONN, {
    clientResponse: { content: "new preview for withdrawn B" },
    get status() {
      if (!removed) {
        removed = true;
        history.trackPendingRequest(MODEL, PROVIDER, CONN, false, undefined, pair.ownerB);
      }
      return 200;
    },
  });
  assert.deepEqual(pair.bucket(), [pair.detailA]);
  assert.equal(history.getPendingRetainedBytes(), pair.bytesA);
  assert.equal(history.finalizePendingRequestById(pair.ownerA, { status: 200 }), true);
  assert.equal(history.getPendingRetainedBytes(), 0);
});
