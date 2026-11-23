import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";
import type { HandleComboChatOptions } from "../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-safety-stop-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "combo-safety-stop-offline-test-only";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// These cases exercise the opt-in behavior (default off; see the default-off case).
process.env.PROVIDER_SAFETY_STOPS_TERMINAL = "true";
const network = mock.method(globalThis, "fetch", async () => {
  throw new Error("Unexpected network call in offline combo safety tests");
});

const { parseUpstreamError, createErrorResult } = await import("../../open-sse/utils/error.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getComboTrace } = await import("../../open-sse/services/combo/decisionTrace.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const models = ["codex/gpt-5.2", "antigravity/gemini-3-flash"];
const literal =
  "This request was blocked by our safety systems. Reason: Potentially unintended activity.";
let invocation = 0;

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function boundedOutcome(promise: Promise<Response>) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise.then(
        (response) => ({ response }),
        (error: unknown) => ({ error })
      ),
      new Promise<{ timedOut: true }>((resolve) => {
        timer = setTimeout(() => resolve({ timedOut: true }), 200);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function failure(
  status = 400,
  code = "misalignment_policy_violation",
  message = "Policy rejection",
  type = "invalid_request_error"
) {
  return new Response(JSON.stringify({ error: { code, type, message } }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": "offline-safety-id",
      "Retry-After": "7",
    },
  });
}

async function passthroughFailure(code = "content_policy_violation") {
  const parsed = await parseUpstreamError(failure(400, code), "codex");
  return createErrorResult(
    parsed.statusCode,
    parsed.message,
    parsed.retryAfterMs,
    parsed.errorCode,
    parsed.errorType,
    parsed.responseBody,
    { passthrough: true }
  ).response;
}

function success() {
  return Response.json({
    choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
  });
}

function options(strategy = "priority"): HandleComboChatOptions {
  return {
    invocationId: `offline-safety-${++invocation}`,
    body: { messages: [{ role: "user", content: "offline test" }] },
    combo: {
      name: `offline-safety-combo-${invocation}`,
      strategy,
      models,
      config: { maxRetries: 2, maxSetRetries: 2, retryDelayMs: 0, setRetryDelayMs: 0 },
    },
    settings: {},
    allCombos: [],
    handleSingleModel: async () => success(),
    log,
  };
}

async function assertOriginal(response: Response, original: Response, invocationId: string) {
  assert.equal(response.status, original.status);
  assert.equal(response.statusText, original.statusText);
  for (const [name, value] of original.headers) assert.equal(response.headers.get(name), value);
  assert.equal(
    await response.text(),
    await original.text(),
    "original refusal body must survive strategy rewrites"
  );
  assert.equal(response.headers.get("X-OmniRoute-Combo-Trace"), invocationId);
  const trace = getComboTrace(invocationId);
  assert.deepEqual(trace?.terminal, { status: response.status, errorClass: "safety_rejection" });
  assert.ok(!JSON.stringify(trace).includes(literal), "trace must not contain upstream text");
}

for (const strategy of ["priority", "round-robin"]) {
  for (const [status, code, message] of [
    [400, "misalignment_policy_violation", "Policy rejection"],
    [403, "content_policy_violation", "Policy rejection"],
    [400, "bad_request", literal],
    [403, "", literal],
  ] as const) {
    test(`${strategy}: ${status}/${code} is terminal across target and set retries`, async () => {
      const opts = options(strategy);
      const original = failure(status, code, message);
      const calls: string[] = [];
      opts.handleSingleModel = async (_body, model) => {
        calls.push(model);
        return original.clone();
      };
      const response = await handleComboChat(opts);
      assert.equal(calls.length, 1, "no retry or alternate model after explicit safety refusal");
      await assertOriginal(response, original, opts.invocationId!);
    });
  }
}

for (const strategy of ["priority", "round-robin"]) {
  test(`${strategy}: nested execute safety refusal stops children and parent siblings`, async () => {
    const opts = options(strategy);
    const child = {
      name: `${opts.combo.name}-child`,
      strategy: "priority",
      models,
      config: { maxRetries: 2, maxSetRetries: 2, retryDelayMs: 0, setRetryDelayMs: 0 },
    };
    opts.combo.models = [{ kind: "combo-ref", comboName: child.name }, models[1]];
    opts.combo.config = { ...opts.combo.config, nestedComboMode: "execute" };
    opts.allCombos = [opts.combo, child];
    let calls = 0;
    const original = failure(403, "content_policy_violation");
    opts.handleSingleModel = async () => {
      calls++;
      return original.clone();
    };
    const response = await handleComboChat(opts);
    assert.equal(calls, 1);
    await assertOriginal(response, original, opts.invocationId!);
  });
}

test("pipeline preserves an intermediate refusal instead of generic step failure; no final dispatch", async () => {
  const opts = options("pipeline");
  const calls: string[] = [];
  const original = failure(403, "bad_request", literal);
  opts.handleSingleModel = async (_body, model) => {
    calls.push(model);
    return original.clone();
  };
  const response = await handleComboChat(opts);
  assert.equal(calls.length, 1);
  await assertOriginal(response, original, opts.invocationId!);
});

for (const mode of ["hedge", "hedge-passthrough", "fusion", "chaos", "chaos-stream"]) {
  for (const abortThrows of [false, true]) {
    test(
      `${mode}: refusal aborts an admitted sibling (${abortThrows ? "throws" : "499"}) and wins unchanged`,
      { timeout: 5000 },
      async () => {
        const opts = options(mode === "fusion" ? "fusion" : "priority");
        opts.combo.config = {
          ...opts.combo.config,
          judgeModel: mode === "fusion" ? "claude/claude-sonnet-4-6" : undefined,
        };
        if (mode.startsWith("hedge"))
          Object.assign(opts.combo.config!, {
            zeroLatencyOptimizationsEnabled: true,
            hedging: true,
            hedgeDelayMs: 1,
          });
        if (mode.startsWith("chaos"))
          Object.assign(opts.combo.config!, { chaos: { enabled: true } });
        if (mode === "chaos-stream") opts.body.stream = true;
        const firstStarted = deferred<void>();
        const held = deferred<Response>();
        const calls: string[] = [];
        let siblingAborted = false;
        const original =
          mode === "hedge-passthrough"
            ? await passthroughFailure()
            : failure(403, "content_policy_violation");
        opts.handleSingleModel = async (_body, model, target) => {
          calls.push(model);
          if (calls.length === 1) {
            assert.ok(target?.modelAbortSignal, "actual dispatch must carry a cancellation signal");
            firstStarted.resolve();
            return new Promise<Response>((resolve, reject) => {
              const abort = () => {
                siblingAborted = true;
                if (abortThrows) reject(target.modelAbortSignal!.reason);
                else resolve(new Response("cancelled", { status: 499 }));
              };
              if (target.modelAbortSignal!.aborted) abort();
              else target.modelAbortSignal!.addEventListener("abort", abort, { once: true });
              held.promise.then(resolve);
            });
          }
          await firstStarted.promise;
          return original.clone();
        };
        try {
          const outcome = await boundedOutcome(handleComboChat(opts));
          assert.ok("response" in outcome, "refusal must resolve without waiting for its sibling");
          const response = outcome.response;
          assert.equal(calls.length, 2, "no judge, final, or alternate dispatch after refusal");
          assert.equal(
            siblingAborted,
            true,
            "already-running sibling must receive actual signal cancellation"
          );
          await assertOriginal(response, original, opts.invocationId!);
        } finally {
          held.resolve(new Response("teardown", { status: 499 }));
          await new Promise<void>((resolve) => setImmediate(resolve));
        }
      }
    );
  }
}

for (const [status, code, message, type] of [
  [400, "bad_request", "Unsupported parameter: temperature", "invalid_request_error"],
  [400, "bad_request", "context_length_exceeded: maximum context length", "invalid_request_error"],
  [403, "permission_denied", "Permission denied", "permission_error"],
  [429, "rate_limit_exceeded", literal, "invalid_request_error"],
  [503, "upstream_unavailable", literal, "server_error"],
  [400, "bad_request", `${literal} Extra text`, "invalid_request_error"],
  [403, "bad_request", literal, "permission_error"],
] as const) {
  test(`${status}/${code}/${type}: unrelated errors keep ordinary fallback (${message.slice(0, 24)})`, async () => {
    const opts = options();
    opts.combo.config = { maxRetries: 0, retryDelayMs: 0 };
    let calls = 0;
    opts.handleSingleModel = async () =>
      ++calls === 1 ? failure(status, code, message, type) : success();
    const response = await handleComboChat(opts);
    assert.equal(response.status, 200);
    assert.equal(calls, 2);
  });
}

test("the first classified refusal cannot be overwritten by a concurrently parsing refusal", async () => {
  const opts = options("fusion");
  const secondStarted = deferred<void>();
  const original = failure(400, "bad_request", literal);
  const later = failure(403, "content_policy_violation");
  opts.handleSingleModel = async (_body, model, target) => {
    if (model === models[0]) {
      await secondStarted.promise;
      return original.clone();
    }
    const bytes = new TextEncoder().encode(await later.text());
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes);
        target!.modelAbortSignal!.addEventListener("abort", () => controller.close(), {
          once: true,
        });
        secondStarted.resolve();
      },
    });
    return new Response(body, { status: later.status, headers: later.headers });
  };
  const response = await handleComboChat(opts);
  await assertOriginal(response, original, opts.invocationId!);
});

test("streaming chaos must not commit a synthetic 200 before panel safety responses", async () => {
  const opts = options();
  opts.body.stream = true;
  opts.combo.config = { chaos: { enabled: true } };
  const original = failure(403, "content_policy_violation");
  const entered = deferred<void>();
  const release = deferred<Response>();
  let calls = 0;
  opts.handleSingleModel = async () => {
    calls++;
    entered.resolve();
    return release.promise;
  };
  const routed = handleComboChat(opts);
  await entered.promise;
  release.resolve(original.clone());
  const response = await routed;
  assert.equal(calls, 2);
  // Consume the stream on the buggy implementation too, so no panel work leaks.
  const copy = response.clone();
  await response.text();
  await assertOriginal(copy, original, opts.invocationId!);
});

test("streaming chaos waits for asynchronous admission before preserving a refusal", async () => {
  const opts = options();
  opts.body.stream = true;
  opts.combo.config = { chaos: { enabled: true } };
  const original = failure(400, "provider_safety_rejection");
  const admissionEntered = deferred<void>();
  const admit = deferred<boolean>();
  opts.perTargetAdmission = async () => {
    admissionEntered.resolve();
    return admit.promise;
  };
  opts.handleSingleModel = async () => original.clone();
  const routed = handleComboChat(opts);
  await admissionEntered.promise;
  admit.resolve(true);
  const response = await routed;
  const copy = response.clone();
  await response.text();
  await assertOriginal(copy, original, opts.invocationId!);
});

for (const synchronous of [true, false]) {
  test(`streaming chaos propagates a${synchronous ? " synchronous" : "n asynchronous"} admission exception after a peer accepts`, async () => {
    const opts = options();
    opts.body.stream = true;
    opts.combo.config = { chaos: { enabled: true } };
    const original = new Error("offline admission failure");
    let calls = 0;
    opts.perTargetAdmission = ({ modelStr }) => {
      if (modelStr === models[0]) return Promise.resolve(true);
      if (synchronous) throw original;
      return Promise.reject(original);
    };
    opts.handleSingleModel = async () => {
      calls++;
      return success();
    };
    const result = await boundedOutcome(handleComboChat(opts));
    assert.ok(
      "error" in result,
      "admission failure must reject, not strand an accepted header slot"
    );
    assert.equal(result.error, original);
    assert.equal(calls, 0, "the panel cannot dispatch after admission filtering fails");
  });
}

test("streaming chaos cancellation does not wait for pending admission", async () => {
  const opts = options();
  opts.body.stream = true;
  opts.combo.config = { chaos: { enabled: true } };
  const client = new AbortController();
  const original = new Error("offline client disconnected during admission");
  opts.signal = client.signal;
  const entered = deferred<void>();
  const admit = deferred<boolean>();
  let admissions = 0;
  let calls = 0;
  opts.perTargetAdmission = async () => {
    if (++admissions === models.length) entered.resolve();
    return admit.promise;
  };
  opts.handleSingleModel = async () => {
    calls++;
    return success();
  };
  const routed = handleComboChat(opts);
  try {
    await entered.promise;
    client.abort(original);
    const result = await boundedOutcome(routed);
    assert.ok(
      "error" in result,
      "client cancellation must not await a non-cooperative admission hook"
    );
    assert.equal(result.error, original);
    assert.equal(calls, 0);
  } finally {
    admit.resolve(true);
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
});

test("streaming chaos cannot return success when admission completes after cancellation", async () => {
  const opts = options();
  opts.body.stream = true;
  opts.combo.config = { chaos: { enabled: true } };
  const client = new AbortController();
  const original = new Error("offline client disconnected before admission completed");
  opts.signal = client.signal;
  const entered = deferred<void>();
  const admit = deferred<boolean>();
  let admissions = 0;
  let calls = 0;
  opts.perTargetAdmission = async () => {
    if (++admissions === models.length) entered.resolve();
    return admit.promise;
  };
  opts.handleSingleModel = async () => {
    calls++;
    return success();
  };
  const routed = handleComboChat(opts);
  await entered.promise;
  client.abort(original);
  admit.resolve(true);
  const result = await boundedOutcome(routed);
  if ("response" in result) await result.response.body?.cancel();
  assert.ok("error" in result, "late admission must not commit the eager HTTP 200 envelope");
  assert.equal(result.error, original);
  assert.equal(calls, 0);
});

test("streaming chaos keeps successful SSE and tolerates admission skips", async () => {
  const opts = options();
  opts.body.stream = true;
  opts.combo.config = { chaos: { enabled: true } };
  opts.perTargetAdmission = async ({ modelStr }) => modelStr === models[0];
  let calls = 0;
  opts.handleSingleModel = async () => {
    calls++;
    return success();
  };
  const response = await handleComboChat(opts);
  assert.equal(response.status, 200);
  assert.equal(calls, 1);
  assert.match(response.headers.get("content-type")!, /text\/event-stream/);
  assert.match(await response.text(), /OK/);
});

for (const strategy of ["priority", "round-robin", "pipeline"]) {
  test(`${strategy}: public local provider_safety_rejection code is terminal`, async () => {
    const opts = options(strategy);
    const original = failure(400, "provider_safety_rejection", literal);
    let calls = 0;
    opts.handleSingleModel = async () => {
      calls++;
      return original.clone();
    };
    const response = await handleComboChat(opts);
    assert.equal(calls, 1);
    await assertOriginal(response, original, opts.invocationId!);
  });
}

test("a safety latch cannot leak into an overlapping independent request", async () => {
  const opts = options();
  const entered = deferred<void>();
  const release = deferred<Response>();
  const otherOpts = options("pipeline");
  otherOpts.combo.models = [models[0]];
  let otherSignal: AbortSignal | null | undefined;
  otherOpts.handleSingleModel = async (_body, _model, target) => {
    otherSignal = target?.modelAbortSignal;
    entered.resolve();
    return release.promise;
  };
  const other = handleComboChat(otherOpts);
  await entered.promise;
  opts.handleSingleModel = async () => failure();
  try {
    assert.equal((await handleComboChat(opts)).status, 400);
    assert.equal(otherSignal?.aborted, false);
  } finally {
    release.resolve(success());
  }
  assert.equal((await other).status, 200);
  assert.equal((await handleComboChat(options())).status, 200);
});

test("without a refusal, unrelated strategy exceptions still propagate", async () => {
  const opts = options();
  const error = new Error("offline strategy setup error");
  Object.defineProperty(opts.combo, "config", {
    get() {
      throw error;
    },
  });
  await assert.rejects(handleComboChat(opts), (caught) => caught === error);
});

test("without a refusal, client cancellation is not replaced by a safety response", async () => {
  const opts = options();
  const client = new AbortController();
  client.abort(new Error("offline client disconnect"));
  opts.signal = client.signal;
  let calls = 0;
  opts.handleSingleModel = async () => {
    calls++;
    return success();
  };
  const response = await handleComboChat(opts);
  assert.equal(response.status, 499);
  assert.equal(calls, 0);
});

for (const code of [
  "misalignment_policy_violation",
  "content_policy_violation",
  "provider_safety_rejection",
]) {
  test(`priority: passthrough chain ${code} never dispatches an alternate`, async () => {
    const opts = options();
    const original = await passthroughFailure(code);
    let calls = 0;
    opts.handleSingleModel = async () => (++calls === 1 ? original.clone() : success());
    const response = await handleComboChat(opts);
    assert.equal(calls, 1);
    await assertOriginal(response, original, opts.invocationId!);
  });
}

for (const [name, root, nested, terminal] of [
  ["nested safety", undefined, { code: "content_policy_violation" }, true],
  ["empty root allows nested safety", {}, { code: "content_policy_violation" }, true],
  ["nested ordinary", undefined, { code: "bad_request", message: "Unsupported parameter" }, false],
  [
    "nonempty ordinary root wins",
    { code: "bad_request", message: "Unsupported parameter" },
    { code: "content_policy_violation" },
    false,
  ],
  [
    "nonempty safety root wins",
    { code: "content_policy_violation" },
    { code: "bad_request" },
    true,
  ],
] as const) {
  test(`canonical envelope: ${name}`, async () => {
    const opts = options();
    opts.combo.config = { maxRetries: 0, retryDelayMs: 0 };
    const original = Response.json({ error: root, response: { error: nested } }, { status: 400 });
    let calls = 0;
    opts.handleSingleModel = async () => (++calls === 1 ? original.clone() : success());
    const response = await handleComboChat(opts);
    assert.equal(calls, terminal ? 1 : 2);
    if (terminal) await assertOriginal(response, original, opts.invocationId!);
    else assert.equal(response.status, 200);
  });
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  assert.equal(network.mock.callCount(), 0, "all combo safety tests must remain offline");
  network.mock.restore();
});

test("PROVIDER_SAFETY_STOPS_TERMINAL off (default): a safety-coded refusal routes like any other 403", async () => {
  const previous = process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  try {
    const run = async (code: string) => {
      const calls: string[] = [];
      const opts = options();
      opts.handleSingleModel = async (_body, model) => {
        calls.push(model);
        return calls.length === 1 ? failure(403, code) : success();
      };
      const response = await handleComboChat(opts);
      return {
        status: response.status,
        calls,
        terminal: getComboTrace(opts.invocationId as string)?.terminal,
      };
    };
    const safety = await run("misalignment_policy_violation");
    const ordinary = await run("permission_denied");
    assert.equal(safety.status, ordinary.status);
    assert.deepEqual(safety.calls, ordinary.calls);
    assert.notEqual(
      (safety.terminal as { errorClass?: string } | undefined)?.errorClass,
      "safety_rejection"
    );
  } finally {
    if (previous === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = previous;
  }
});
