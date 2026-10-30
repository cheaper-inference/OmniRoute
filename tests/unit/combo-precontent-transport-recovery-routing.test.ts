import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
type Options = import("../../open-sse/services/combo/types.ts").HandleComboChatOptions;
const data = fs.mkdtempSync(path.join(os.tmpdir(), "combo-transport-routing-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.EMPTY_STREAM_SIBLING_RECOVERY_ENABLED = "false";
process.env.STREAM_RECOVERY_ENABLED = "false";
process.env.FETCH_TIMEOUT_MS = "0";
const { handleComboChat, validateResponseQuality } =
  await import("../../open-sse/services/combo.ts");
const { recordSessionModelUsage, getLastSessionModel } =
  await import("../../src/lib/db/contextHandoffs.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getCachedProviderConnectionById } = await import("../../src/lib/db/readCache.ts");
const { getComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { clearNativeCodexTurnPinsForTests } =
  await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { acquire, buildAccountSemaphoreKey, resetAll } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { dispatchEvent } = await import("../../src/lib/webhookDispatcher.ts");
const pinConnection = await createProviderConnection({
  provider: "transport-a",
  authType: "apikey",
  name: "routing-pin",
  isActive: true,
  apiKey: "fixture-only",
});
assert.ok(pinConnection?.id);
const noop = () => {};
const quiet = { info: noop, warn: noop, debug: noop, error: noop };
const encoder = new TextEncoder();
const first = "transport-a/first",
  second = "transport-b/second",
  third = "transport-c/third";
const answer = 'data: {"choices":[{"delta":{"content":"recovered"}}]}\n\ndata: [DONE]\n\n';
const settings = (enabled = true) => ({
  resilienceSettings: { streamRecovery: { enabled }, modelLockout: { enabled: false } },
});
const coded = () => Object.assign(new Error("connection interrupted"), { code: "ECONNRESET" });
const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;
let sequence = 0;
function cut(prefix: string | string[] = "", error: unknown = coded(), beforeError?: () => void) {
  const chunks = typeof prefix === "string" ? (prefix ? [prefix] : []) : prefix;
  let release: () => void = noop;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let pulls = 0;
  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        if (pulls < chunks.length) {
          controller.enqueue(encoder.encode(chunks[pulls++]));
          return;
        }
        await gate;
        beforeError?.();
        controller.error(error);
      },
    },
    { highWaterMark: 0 }
  );
  const instrumentReader = (response: Response): void => {
    const getReader = response.body!.getReader.bind(response.body!);
    response.body!.getReader = (() => {
      const reader = getReader();
      const read = reader.read.bind(reader);
      let reads = 0;
      reader.read = () => {
        if (++reads > chunks.length) release();
        return read();
      };
      return reader;
    }) as typeof response.body.getReader;
  };
  const instrument = (response: Response): Response => {
    instrumentReader(response);
    const clone = response.clone.bind(response);
    response.clone = () => {
      const result = clone();
      instrumentReader(response);
      return instrument(result);
    };
    return response;
  };
  return instrument(new Response(body, { headers: { "Content-Type": "text/event-stream" } }));
}

function setup(
  route: "priority" | "round-robin" | "runtime" | "pin",
  config: Record<string, unknown> = {}
) {
  const name = `transport-${route}-${++sequence}`;
  const child = {
    name: `${name}-child`,
    strategy: "priority",
    models: [{ model: third }],
    config: { maxRetries: 0 },
  };
  const combo = {
    name,
    strategy: route === "round-robin" ? "round-robin" : "priority",
    context_cache_protection: route === "pin",
    models: [
      { model: first },
      { model: second },
      ...(route === "runtime" ? [{ kind: "combo-ref", comboName: child.name }] : []),
    ],
    config: {
      maxRetries: 1,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
      targetTimeoutMs: 1000,
      stickyRoundRobinLimit: 1,
      ...(route === "runtime" ? { nestedComboMode: "execute" } : {}),
      ...config,
    },
  };
  const relayOptions = route === "pin" ? { sessionId: `${name}-session` } : undefined;
  if (relayOptions) {
    recordSessionModelUsage(relayOptions.sessionId, name, first, "transport-a");
    assert.equal(getLastSessionModel(relayOptions.sessionId, name), first);
  }
  return { combo, allCombos: [combo, child], relayOptions };
}
function success() {
  return new Response(answer, { headers: { "Content-Type": "text/event-stream" } });
}
async function invoke(
  fixture: ReturnType<typeof setup>,
  callback: Options["handleSingleModel"],
  extra: Partial<Options> = {}
) {
  return handleComboChat({
    ...fixture,
    body: { stream: true, messages: [{ role: "user", content: "hello" }] },
    settings: settings(),
    hiddenModelsByProvider: new Map(),
    isModelAvailable: async () => true,
    handleSingleModel: callback,
    log: quiet,
    ...extra,
  });
}
async function drain(response: Response) {
  try {
    return await response.text();
  } catch {
    return "read rejected";
  }
}
const failures = (fixture: ReturnType<typeof setup>) =>
  getComboMetrics(fixture.combo.name)?.totalFailures ?? 0;
function probe(fixture: ReturnType<typeof setup>) {
  const ac = new AbortController();
  const calls: string[] = [],
    warnings: string[] = [];
  let errors = 0,
    failuresAtAbort: number | null = null;
  const stop = () => {
    if (ac.signal.aborted) return;
    failuresAtAbort = failures(fixture);
    ac.abort();
  };
  const callback: Options["handleSingleModel"] = async (_body, model) => {
    calls.push(model);
    return calls.length === 1
      ? cut("", coded(), () => {
          errors++;
        })
      : Response.json(
          { error: { message: "must not dispatch after cancellation" } },
          { status: 503 }
        );
  };
  const log = {
    ...quiet,
    warn: (_tag: string, message: string) => {
      warnings.push(message);
    },
  };
  const assertStopped = async (response: Response) => {
    try {
      assert.equal(ac.signal.aborted, true);
      assert.equal(errors, 1, "the original provider delivered the genuine coded failure");
      assert.deepEqual(calls, [first]);
      assert.equal(response.status, 499);
      assert.equal(
        warnings.filter((x) =>
          x.startsWith("Upstream stream transport failed before usable output")
        ).length,
        1
      );
      assert.notEqual(failuresAtAbort, null);
      assert.equal(
        failures(fixture),
        failuresAtAbort,
        "cancellation adds no failure and retains previously recorded failures"
      );
    } finally {
      await drain(response);
    }
  };
  return { ac, calls, warnings, stop, callback, log, assertStopped };
}
test.beforeEach(() => {
  clearAllModelLockouts();
  clearNativeCodexTurnPinsForTests();
  resetAll();
});
test.after(async () => {
  await dispatchEvent("request.completed", {});
  await closeCallLogSaves(2000);
  resetAll();
  resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true });
});

for (const route of ["priority", "round-robin", "runtime"] as const) {
  for (const queued of [false, true]) {
    test(`review15: ${route} stops same-target late retry cancellation, queued=${queued}`, async () => {
      const f = setup(route),
        p = probe(f);
      const log = {
        ...p.log,
        info: (_tag: string, message: string) => {
          if (message.includes("(retry 1)")) {
            if (queued) queueMicrotask(p.stop);
            else p.stop();
          }
        },
      };
      const response = await invoke(f, p.callback, { signal: p.ac.signal, log });
      await p.assertStopped(response);
    });
  }
}
for (const pinned of [false, true]) {
  test(`review15: priority stops late sibling dispatch after ${pinned ? "failed pinned prelude" : "target failure"}`, async () => {
    const f = setup(pinned ? "pin" : "priority", { maxRetries: 0 });
    if (pinned) f.combo.models = [{ model: second }, { model: first }];
    const p = probe(f);
    let pinSeen = false;
    const response = await invoke(
      f,
      async (body, model, target) => {
        if (p.calls.length === 0 && pinned) {
          assert.equal(target?.modelPinned, true);
          pinSeen = true;
        }
        return p.callback(body, model, target);
      },
      {
        signal: p.ac.signal,
        log: {
          ...p.log,
          info: (_tag: string, message: string) => {
            if (message.startsWith("Trying model ") && message.includes(second)) p.stop();
          },
        },
      }
    );
    if (pinned) assert.equal(pinSeen, true);
    await p.assertStopped(response);
  });
}
for (const fallback of [false, true]) {
  for (const available of [false, true]) {
    test(`review15: runtime stops after availability cancels, fallback=${fallback}, available=${available}`, async () => {
      const f = setup("runtime", { maxRetries: fallback ? 0 : 1 });
      const guarded = fallback ? 1 : 0;
      Object.assign(f.combo.models[guarded], { fallbackOnlyOnQuotaExhaustion: true });
      const p = probe(f);
      let entered = false;
      const response = await invoke(f, p.callback, {
        signal: p.ac.signal,
        log: p.log,
        isModelAvailable: async (model) => {
          if (p.calls.length === 1) {
            assert.equal(model, fallback ? second : first);
            entered = true;
            await Promise.resolve();
            p.stop();
            return available;
          }
          return true;
        },
      });
      assert.equal(entered, true);
      await p.assertStopped(response);
    });
  }
}
for (const full of [false, true]) {
  test(`review15: runtime capacity cancellation wins before skip accounting, full=${full}`, async () => {
    const f = setup("runtime", { maxRetries: 0 });
    const connection = await createProviderConnection({
      provider: "transport-b",
      authType: "apikey",
      name: f.combo.name,
      isActive: true,
      apiKey: "fixture-only",
    });
    assert.ok(connection?.id);
    Object.assign(f.combo.models[1], {
      connectionId: connection.id,
      fallbackOnlyOnQuotaExhaustion: true,
    });
    const cached = await getCachedProviderConnectionById(connection.id);
    assert.ok(cached);
    const p = probe(f);
    const original = Object.getOwnPropertyDescriptor(cached, "maxConcurrent");
    let stack = "";
    Object.defineProperty(cached, "maxConcurrent", {
      configurable: true,
      get() {
        if (p.calls.length === 1 && !p.ac.signal.aborted) {
          stack = new Error().stack ?? "";
          p.stop();
        }
        return 1;
      },
    });
    const release = full
      ? await acquire(
          buildAccountSemaphoreKey({ provider: "transport-b", accountKey: connection.id }),
          { maxConcurrency: 1 }
        )
      : noop;
    try {
      const response = await invoke(f, p.callback, { signal: p.ac.signal, log: p.log });
      assert.match(stack, /lookupPositiveCap/);
      await p.assertStopped(response);
    } finally {
      release();
      if (original) Object.defineProperty(cached, "maxConcurrent", original);
      else delete cached.maxConcurrent;
    }
  });
}

for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  for (const enabled of [true, false, undefined]) {
    test(`review15: ${route} ordinary recovery policy control, enabled=${enabled}`, async () => {
      const f = setup(route),
        calls: string[] = [];
      const response = await invoke(
        f,
        async (_body, model, target) => {
          if (route === "pin" && calls.length === 0) assert.equal(target?.modelPinned, true);
          calls.push(model);
          return calls.length === 1 ? cut() : success();
        },
        { settings: enabled === undefined ? {} : settings(enabled) }
      );
      try {
        assert.deepEqual(calls, enabled === true ? [first, first] : [first]);
        assert.equal(response.status, 200);
      } finally {
        await drain(response);
      }
    });
  }
}
const stop = [{}, { finishReason: "STOP" }],
  unspecified = [{ finishReason: "FINISH_REASON_UNSPECIFIED" }];
const geminiCases: Array<[string, unknown, boolean]> = [
  ["root terminal plus unrelated wrapper", { candidates: stop, response: { output: [] } }, true],
  [
    "root terminal plus empty wrapped candidates",
    { candidates: stop, response: { candidates: [] } },
    true,
  ],
  [
    "root terminal plus wrapped unspecified",
    { candidates: stop, response: { candidates: unspecified } },
    true,
  ],
  [
    "root unspecified plus wrapped terminal",
    { candidates: unspecified, response: { candidates: stop } },
    true,
  ],
  ["root empty plus wrapped terminal", { candidates: [], response: { candidates: stop } }, true],
  ["both unspecified", { candidates: unspecified, response: { candidates: unspecified } }, false],
];
for (const [label, payload, terminal] of geminiCases) {
  test(`review15: direct quality preserves mixed Gemini ${label}`, async () => {
    const source = cut(frame(payload));
    const result = await validateResponseQuality(source, true, quiet, null, null, false, true);
    try {
      assert.equal(result.valid, terminal);
      if (!terminal) assert.equal(result.upstreamFailure?.transportReadFailure, true);
    } finally {
      void result.clonedResponse?.body?.cancel().catch(noop);
      void source.body?.cancel().catch(noop);
    }
  });
  for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
    test(`review15: positive gate ${route} preserves mixed Gemini ${label}`, async () => {
      const f = setup(route),
        calls: string[] = [];
      const response = await invoke(f, async (_body, model, target) => {
        if (route === "pin" && calls.length === 0) assert.equal(target?.modelPinned, true);
        calls.push(model);
        return !terminal && calls.length > 1 ? success() : cut(frame(payload));
      });
      try {
        assert.deepEqual(calls, terminal ? [first] : [first, first]);
        assert.equal(response.status, 200);
      } finally {
        await drain(response);
      }
    });
  }
}
test("review15: mixed Gemini EOF keeps existing enabled/off behavior", async () => {
  const payload = frame(geminiCases[0][1]),
    outcomes: Array<{ valid: boolean; reason?: string }> = [];
  for (const enabled of [false, true]) {
    const response = new Response(payload, { headers: { "Content-Type": "text/event-stream" } });
    const result = await validateResponseQuality(response, true, quiet, null, null, false, enabled);
    outcomes.push({ valid: result.valid, reason: result.reason });
    if (result.clonedResponse) await drain(result.clonedResponse);
  }
  assert.deepEqual(outcomes[1], outcomes[0]);
});

test("review15: queued pin cancellation crosses timeout resolution without invoking provider", async () => {
  const f = setup("pin"),
    ac = new AbortController(),
    calls: string[] = [];
  let armed = false;
  const response = await invoke(
    f,
    async (_body, model) => {
      calls.push(model);
      return success();
    },
    {
      signal: ac.signal,
      log: {
        ...quiet,
        info: (_tag: string, message: string) => {
          if (message.startsWith("Bypassing strategy")) {
            armed = true;
            queueMicrotask(() => ac.abort());
          }
        },
      },
    }
  );
  try {
    assert.equal(armed, true);
    assert.equal(ac.signal.aborted, true);
    assert.deepEqual(calls, []);
    assert.equal(response.status, 499);
    assert.equal(failures(f), 0);
  } finally {
    await drain(response);
  }
});
for (const route of ["priority", "round-robin", "runtime", "pin"] as const) {
  test(`review15: ${route} cancels a returned non-OK body before cancellation accounting`, async () => {
    const f = setup(route, { maxRetries: 0 }),
      ac = new AbortController(),
      calls: string[] = [];
    f.combo.models = [
      Object.assign({ model: first }, { fallbackOnlyOnQuotaExhaustion: true }),
      ...(route === "runtime" ? [{ kind: "combo-ref", comboName: f.allCombos[1].name }] : []),
    ];
    let cancelled = false;
    const response = await invoke(
      f,
      async (_body, model, target) => {
        if (route === "pin" && calls.length === 0) assert.equal(target?.modelPinned, true);
        calls.push(model);
        ac.abort();
        let sent = false;
        return new Response(
          new ReadableStream<Uint8Array>(
            {
              pull(controller) {
                if (!sent) {
                  sent = true;
                  controller.enqueue(encoder.encode('{"error":{"message":"cancelled result"}}'));
                } else controller.close();
              },
              cancel() {
                cancelled = true;
              },
            },
            { highWaterMark: 0 }
          ),
          { status: 503, headers: { "Content-Type": "application/json" } }
        );
      },
      { signal: ac.signal }
    );
    try {
      await new Promise((resolve) => setImmediate(resolve));
      assert.deepEqual(calls, [first]);
      assert.equal(response.status, 499);
      assert.equal(failures(f), 0);
      assert.equal(cancelled, true);
    } finally {
      await drain(response);
    }
  });
  test(`review15: ${route} non-streaming ordinary retry remains unchanged`, async () => {
    const f = setup(route),
      calls: string[] = [];
    const response = await invoke(
      f,
      async (_body, model) => {
        calls.push(model);
        return calls.length === 1
          ? Response.json({ error: { message: "service busy" } }, { status: 503 })
          : Response.json({ choices: [{ message: { content: "ok" } }] });
      },
      { body: { stream: false, messages: [{ role: "user", content: "hello" }] } }
    );
    try {
      assert.deepEqual(calls, [first, first]);
      assert.equal(response.status, 200);
    } finally {
      await drain(response);
    }
  });
}
