import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { setTimeout as nativeSet, clearTimeout as nativeClear } from "node:timers";
import type { ComboLike, HandleSingleModel } from "../../open-sse/services/combo/types.ts";

const originalDataDir = process.env.DATA_DIR;
const originalDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("offline pressure fixture forbids network access");
};
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "combo-process-pressure-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { handleComboChat, resolveComboTargets } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { recordSessionModelUsage, getLastSessionModel } =
  await import("../../src/lib/db/contextHandoffs.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");
const { getLKGP, setLKGP } = await import("../../src/lib/db/settings/lkgp.ts");
const { applySessionStickiness, recordStickyBinding, peekStickyConnectionId } =
  await import("../../open-sse/services/combo/sessionStickiness.ts");
const { checkHeapPressureGuard } = await import("../../open-sse/utils/heapPressure.ts");
const { markLocalProcessPressureResponse } =
  await import("../../open-sse/utils/localPressureResponse.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { getAllModelLockouts, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { clearCooldownState, isProviderInCooldown } =
  await import("../../open-sse/services/providerCooldownTracker.ts");
const semaphore = await import("../../open-sse/services/accountSemaphore.ts");
const eventBus = await import("../../src/lib/events/eventBus.ts");

/** Provides a no-op logger callback for offline routing fixtures. */
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const body = { messages: [{ role: "user", content: "offline pressure regression" }] };
const models = ["providerA/first", "providerB/second"];
let sequence = 0;
const config = {
  maxRetries: 0,
  maxSetRetries: 0,
  retryDelayMs: 0,
  setRetryDelayMs: 0,
  fallbackDelayMs: 0,
};
/** Returns a successful JSON chat response for healthy fallback controls. */
const ok = () => Response.json({ choices: [{ message: { content: "healthy" } }] });
/** Returns a branded local 503 for the requested pressure code with a custody receipt. */
function pressure(code: string): Response {
  const response =
    code === "heap_pressure"
      ? checkHeapPressureGuard(2, 1)!.response
      : markLocalProcessPressureResponse(
          Response.json(
            { error: { code, type: "server_error", message: "Local process pressure" } },
            { status: 503, headers: { "Retry-After": "7" } }
          )
        );
  response.headers.set("X-Pressure-Receipt", "original-verdict");
  return response;
}
/** Returns a uniquely named two-target combo with the strategy and configuration overrides. */
function combo(strategy: string, overrides: Record<string, unknown> = {}): ComboLike {
  return {
    name: `process-pressure-${sequence++}`,
    strategy,
    models,
    config: { ...config, ...overrides },
  };
}
/** Runs the selected combo with the offline request, dispatcher, and optional nested combos. */
function run(
  selected: ComboLike,
  handleSingleModel: HandleSingleModel,
  allCombos: ComboLike[] = []
) {
  return handleComboChat({
    body,
    combo: selected,
    handleSingleModel,
    allCombos,
    log,
    settings: {},
  });
}
/** Asserts original response identity, pressure headers, and unread body bytes, then consumes it. */
async function assertOriginal(response: Response, original: Response, bytes: string) {
  assert.equal(response, original, "terminal pressure retains response identity and custody");
  assert.equal(response.status, 503);
  const expectedRetryAfter = JSON.parse(bytes).error.code === "heap_pressure" ? "5" : "7";
  assert.equal(response.headers.get("Retry-After"), expectedRetryAfter);
  assert.equal(response.headers.get("X-Pressure-Receipt"), "original-verdict");
  assert.equal(response.bodyUsed, false);
  assert.equal(await response.text(), bytes);
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  clearCooldownState();
  semaphore.resetAll();
});
test.after(() => {
  resetDbInstance();
  globalThis.fetch = originalFetch;
  if (originalDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  else process.env.DISABLE_SQLITE_AUTO_BACKUP = originalDisableBackup;
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  // Keep the private fixture on disk for native closure/FD inspection.
});

for (const code of ["resource_pressure", "heap_pressure"]) {
  test(`${code} stops pinned-context redispatch`, async () => {
    const selected = combo("priority");
    selected.context_cache_protection = true;
    await createProviderConnection({
      provider: "providerA",
      authType: "apikey",
      name: "offline pin",
      isActive: true,
    });
    const sessionId = `pressure-session-${sequence}`;
    recordSessionModelUsage(sessionId, selected.name, models[0], "providerA");
    const original = pressure(code);
    const bytes = await original.clone().text();
    const calls: string[] = [];
    const response = await handleComboChat({
      body,
      combo: selected,
      settings: {},
      allCombos: [selected],
      log,
      relayOptions: { sessionId },
      handleSingleModel: async (_body, model) => {
        calls.push(model);
        return calls.length === 1 ? original : ok();
      },
    });
    assert.deepEqual(calls, [models[0]]);
    await assertOriginal(response, original, bytes);
    assert.equal(getLastSessionModel(sessionId, selected.name), models[0]);
  });
  for (const strategy of ["priority", "round-robin"]) {
    test(`${code} stops ${strategy} compatibility last-resort dispatch`, async () => {
      const selected = combo(strategy);
      selected.models = [
        "openai/pressure-kept",
        "openai/pressure-rejected1",
        "openai/pressure-rejected2",
      ];
      saveModelsDevCapabilities({
        openai: Object.fromEntries(
          ["pressure-kept", "pressure-rejected1", "pressure-rejected2"].map((name) => [
            name,
            {
              tool_call: name === "pressure-kept",
              modalities_input: JSON.stringify(["text"]),
              modalities_output: JSON.stringify(["text"]),
              limit_context: 128000,
              limit_output: 4096,
              reasoning: false,
              attachment: false,
              structured_output: true,
              temperature: true,
              knowledge_cutoff: null,
              release_date: null,
              last_updated: null,
              status: null,
              family: null,
              open_weights: false,
              limit_input: 128000,
              interleaved_field: null,
            },
          ])
        ),
      });
      const original = pressure(code);
      const bytes = await original.clone().text();
      const calls: string[] = [];
      const response = await handleComboChat({
        body: { ...body, tools: [{ type: "function", function: { name: "offline" } }] },
        combo: selected,
        settings: {},
        allCombos: [],
        log,
        isModelAvailable: async (model) => !model.endsWith("pressure-kept"),
        handleSingleModel: async (_body, model) => {
          calls.push(model);
          return calls.length === 1 ? original : ok();
        },
      });
      assert.deepEqual(calls, ["openai/pressure-rejected1"]);
      await assertOriginal(response, original, bytes);
    });
  }
  test(`${code} releases a native hedge-delay timer on immediate terminal return`, async (t) => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleared = new Set<ReturnType<typeof setTimeout>>();

    t.mock.method(globalThis, "setTimeout", (fn: () => void, ms: number, ...args: unknown[]) => {
      const timer = nativeSet(fn, ms, ...args);
      if (ms === 180000) timers.push(timer);
      return timer;
    });
    t.mock.method(globalThis, "clearTimeout", (timer: ReturnType<typeof setTimeout>) => {
      cleared.add(timer);
      return nativeClear(timer);
    });
    try {
      const original = pressure(code);
      const calls: string[] = [];
      const response = await run(
        combo("priority", {
          hedging: true,
          zeroLatencyOptimizationsEnabled: true,
          hedgeDelayMs: 180000,
        }),
        async (_body, model) => {
          calls.push(model);
          return original;
        }
      );
      assert.deepEqual(calls, [models[0]]);
      assert.equal(response, original);
      assert.equal(timers.length, 1, "test must observe the actual speculative timer");
      assert.ok(cleared.has(timers[0]), "terminal return must clear its losing hedge timer");
    } finally {
      for (const timer of timers) nativeClear(timer);
    }
  });
  for (const strategy of ["priority", "round-robin", "fill-first"]) {
    for (const retries of [0, 2]) {
      test(`replay_139070680f ${code}: ${strategy} stops retries=${retries}`, async () => {
        const calls: string[] = [];
        const original = pressure(code);
        const bytes = await original.clone().text();
        const selected = combo(strategy, { maxRetries: retries, maxSetRetries: retries });
        const response = await run(selected, async (_body, model) => {
          calls.push(model);
          return calls.length === 1 ? original : ok();
        });
        assert.deepEqual(
          calls,
          [models[0]],
          "process-wide shedding cannot dispatch another target"
        );
        await assertOriginal(response, original, bytes);
        assert.deepEqual(getAllModelLockouts(), []);
        assert.equal(isProviderInCooldown("providerA"), false);
        assert.equal(getCircuitBreaker("providerA").getStatus().failureCount, 0);
        // A shed invocation must release its round-robin slot, not strand capacity.
        assert.equal((await run(selected, async () => ok())).status, 200);
      });
    }
  }
  for (const strategy of ["priority", "round-robin"]) {
    test(`${code} preserves ${strategy} sticky and persisted LKGP bindings`, async () => {
      const connection = await createProviderConnection({
        provider: "providerA",
        authType: "apikey",
        name: "offline affinity",
        isActive: true,
      });
      const selected = combo(strategy);
      assert.ok(typeof connection.id === "string");
      const connectionId = connection.id;
      selected.models = [{ kind: "model", model: models[0], connectionId }, models[1]];
      const targets = resolveComboTargets(selected, []);
      const sticky = await applySessionStickiness(targets, body.messages, selected.name);
      assert.ok(sticky.messageHash);
      recordStickyBinding(sticky.messageHash, connectionId, selected.name);
      await setLKGP(selected.name, selected.name, "providerA", connectionId);
      await setLKGP(selected.name, targets[0].executionKey, "providerA", connectionId);
      const before = await Promise.all([
        getLKGP(selected.name, selected.name),
        getLKGP(selected.name, targets[0].executionKey),
      ]);
      const original = pressure(code);
      const calls: string[] = [];
      const response = await run(selected, async (_body, model) => {
        calls.push(model);
        return original;
      });
      assert.equal(response, original);
      assert.deepEqual(calls, [models[0]]);
      assert.equal(peekStickyConnectionId(sticky.messageHash), connectionId);
      assert.deepEqual(
        await Promise.all([
          getLKGP(selected.name, selected.name),
          getLKGP(selected.name, targets[0].executionKey),
        ]),
        before
      );
      assert.deepEqual(getAllModelLockouts(), []);
      assert.equal(isProviderInCooldown("providerA", connectionId), false);
    });
  }
  for (const childStrategy of ["priority", "round-robin"]) {
    test(`${code} propagates from nested ${childStrategy} without parent retries`, async () => {
      const child = combo(childStrategy);
      const middle = combo("priority", { nestedComboMode: "execute", maxRetries: 2 });
      middle.models = [{ kind: "combo-ref", comboName: child.name }, "providerC/middle"];
      const parent = combo("priority", { nestedComboMode: "execute", maxRetries: 2 });
      parent.models = [{ kind: "combo-ref", comboName: middle.name }, "providerD/outer"];
      const calls: string[] = [];
      const original = pressure(code);
      const bytes = await original.clone().text();
      const response = await run(
        parent,
        async (_body, model) => {
          calls.push(model);
          return calls.length === 1 ? original : ok();
        },
        [parent, middle, child]
      );
      assert.deepEqual(calls, [models[0]]);
      await assertOriginal(response, original, bytes);
    });
  }
  test(`${code} stops a direct execute-mode model unit`, async () => {
    const selected = combo("priority", { nestedComboMode: "execute", maxRetries: 2 });
    const unusedChild = combo("priority");
    selected.models = [models[0], { kind: "combo-ref", comboName: unusedChild.name }];
    const calls: string[] = [];
    const original = pressure(code);
    const bytes = await original.clone().text();
    const response = await run(
      selected,
      async (_body, model) => {
        calls.push(model);
        return calls.length === 1 ? original : ok();
      },
      [selected, unusedChild]
    );
    assert.deepEqual(calls, [models[0]]);
    await assertOriginal(response, original, bytes);
  });
  test(
    `${code} aborts an already-running hedge and closes its owned FD`,
    { timeout: 5000 },
    async () => {
      const selected = combo("priority", {
        hedging: true,
        zeroLatencyOptimizationsEnabled: true,
        hedgeDelayMs: 0,
        targetTimeoutMs: 4000,
      });
      selected.models = [...models, "providerC/must-not-launch"];
      const original = pressure(code);
      const bytes = await original.clone().text();
      const calls: string[] = [];
      let fdClosed = false;
      let aborted = false;
      let settle!: () => void;
      const settled = new Promise<void>((resolve) => {
        settle = resolve;
      });
      const response = await run(selected, async (_body, model, target) => {
        calls.push(model);
        if (model !== models[0]) return original;
        const fd = fs.openSync(path.join(dataDir, `owned-hedge-${sequence}`), "w+");
        const signal = target?.modelAbortSignal;
        assert.ok(signal, "real combo runner must deliver cancellation to the provider leg");
        return new Promise<Response>((resolve) => {
          signal.addEventListener(
            "abort",
            () => {
              aborted = true;
              fs.closeSync(fd);
              assert.throws(() => fs.fstatSync(fd), { code: "EBADF" });
              fdClosed = true;
              resolve(new Response(null, { status: 499 }));
              settle();
            },
            { once: true }
          );
        });
      });
      await settled;
      assert.deepEqual(calls, models);
      assert.equal(aborted, true);
      assert.equal(fdClosed, true);
      await assertOriginal(response, original, bytes);
      assert.deepEqual(getAllModelLockouts(), []);
    }
  );
}

for (const strategy of ["priority", "round-robin"]) {
  for (const failure of [
    () => Response.json({ error: { message: "Real upstream unavailable" } }, { status: 503 }),
    () =>
      Response.json(
        { error: { code: "other_503", message: "resource_pressure in prose" } },
        { status: 503 }
      ),
    () => Response.json({ error: { code: "resource_pressure" } }, { status: 502 }),
    () => new Response("heap_pressure", { status: 503 }),
    // A chained upstream (another gateway) can return the very same pressure bodies; only a
    // response this process shed itself is terminal.
    () =>
      Response.json(
        {
          error: { code: "resource_pressure", type: "server_error", message: "Upstream pressure" },
        },
        { status: 503, headers: { "Retry-After": "7" } }
      ),
    () =>
      Response.json(
        { error: { code: "heap_pressure", type: "server_error", message: "Upstream pressure" } },
        { status: 503, headers: { "Retry-After": "5" } }
      ),
  ]) {
    test(`${strategy} preserves ordinary fallback control ${failure.toString()}`, async () => {
      const calls: string[] = [];
      const result = await run(combo(strategy), async (_body, model) => {
        calls.push(model);
        return calls.length === 1 ? failure() : ok();
      });
      assert.equal(result.status, 200);
      assert.deepEqual(calls, models);
    });
  }
}

test("round-robin closes the live attempt it opened before a terminal pressure shed", async () => {
  const seen: string[] = [];
  const unsubscribers = (["combo.target.attempt", "combo.target.failed"] as const).map((event) =>
    eventBus.on(event, () => seen.push(event))
  );
  try {
    const original = pressure("resource_pressure");
    const response = await run(combo("round-robin"), async () => original);
    assert.equal(response, original);
    assert.deepEqual(seen, ["combo.target.attempt", "combo.target.failed"]);
  } finally {
    for (const unsubscribe of unsubscribers) unsubscribe();
  }
});

test("internal header wrappers keep the local pressure brand when they must clone", async () => {
  const { withSelectedConnectionHeader } =
    await import("../../src/sse/handlers/chat/selectedConnectionHeader.ts");
  const { isMarkedLocalProcessPressureResponse } =
    await import("../../open-sse/utils/localPressureResponse.ts");
  const shed = pressure("resource_pressure");
  // Immutable headers force the wrapper down its clone path.
  const frozen = new Response(shed.body, { status: 503, headers: shed.headers });
  Object.defineProperty(frozen, "headers", {
    value: new Proxy(new Headers(shed.headers), {
      /** Rejects header mutations while binding all other header methods to their target. */
      get(target, prop) {
        if (prop === "set")
          return () => {
            throw new TypeError("immutable");
          };
        const value = Reflect.get(target, prop);
        return typeof value === "function" ? value.bind(target) : value;
      },
    }),
  });
  markLocalProcessPressureResponse(frozen);
  const wrapped = withSelectedConnectionHeader(frozen, "conn-1");
  assert.notEqual(wrapped, frozen);
  assert.equal(isMarkedLocalProcessPressureResponse(wrapped), true);
});
