import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-capacity-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "systemone-capacity-fixture-only";
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
const gates = await import("../../open-sse/services/accountSemaphore.ts");
const rates = await import("../../open-sse/services/rateLimitManager.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

after(async () => {
  await rates.__resetRateLimitManagerForTests();
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
let cooldownCalls = 0;
const provider = "openrouter",
  model = "typesafe/jev-1.13";
function options(id: string) {
  return {
    provider,
    canonicalModel: provider + "/" + model,
    body: { model, state: "synthetic", questions: { q: { type: "noul", instructions: "yes?" } } },
    credentials: {
      connectionId: id,
      apiKey: "fixture-only",
      maxConcurrent: 1,
      modelConcurrency: { [model]: 1 },
    },
    timeoutMs: 50,
  };
}
function dependencies(
  fetchSystemOne: (_url: string, _credentials: unknown, init: RequestInit) => Promise<Response>
) {
  return {
    fetchSystemOne,
    saveCallLog: async () => {},
    saveRequestUsage: async () => {},
    recordCost: () => {},
    calculateCost: async () => ({ costUsd: 0, priced: false }),
    markAccountUnavailable: async () => {
      cooldownCalls++;
    },
  };
}
const answer = () =>
  Response.json({
    answers: { q: { type: "noul", noul: 0.7 } },
    usage: { input_tokens: 1, output_tokens: 1 },
  });

for (const scope of ["account", "model"] as const) {
  test(`System One honors the shared chat ${scope} gate and releases a timed-out waiter`, async () => {
    await rates.initializeRateLimits();
    const id = "capacity-" + scope;
    const key =
      scope === "account"
        ? gates.buildAccountSemaphoreKey({ provider, accountKey: id })
        : gates.buildModelSemaphoreKey({ provider, accountKey: id, model });
    const release = await gates.acquire(key, { maxConcurrency: 1 });
    let calls = 0;
    try {
      const response = await handleSystemOneProxy(
        options(id),
        dependencies(async () => {
          calls++;
          return answer();
        })
      );
      assert.equal(calls, 0, "A decision bypassed an occupied ordinary-chat capacity gate");
      assert.equal(cooldownCalls, 0, "Local admission must not mark healthy accounts unavailable");
      assert.equal(response.status, 504);
    } finally {
      release();
    }
    const next = await handleSystemOneProxy(
      { ...options(id), timeoutMs: 1000 },
      dependencies(async () => {
        calls++;
        return answer();
      })
    );
    assert.equal(next.status, 200);
    assert.equal(calls, 1);
    assert.ok(Object.values(gates.getStats()).every((x) => x.running === 0 && x.queued === 0));
  });
}
test("shared rate limiter queues decisions behind an ordinary request and cancels without dispatch", async () => {
  await rates.initializeRateLimits();
  const id = "capacity-rate";
  rates.enableRateLimitProtection(id);
  rates.refreshConnectionRateLimits(id, { maxConcurrent: 1, rpm: 1 });
  let release!: () => void, started!: () => void;
  const ready = new Promise<void>((r) => (started = r)),
    hold = new Promise<void>((r) => (release = r));
  const ordinary = rates.withRateLimit(provider, id, null, async () => {
    started();
    await hold;
  });
  await ready;
  let calls = 0;
  try {
    const response = await handleSystemOneProxy(
      options(id),
      dependencies(async () => {
        calls++;
        return answer();
      })
    );
    assert.equal(response.status, 504);
    assert.equal(calls, 0);
  } finally {
    release();
    await ordinary;
    await rates.__resetRateLimitManagerForTests();
  }
});
test("capacity stays held through response body reading and releases on caller cancellation", async () => {
  await rates.initializeRateLimits();
  const id = "capacity-body",
    caller = new AbortController();
  let started!: () => void;
  const ready = new Promise<void>((r) => (started = r));
  const running = handleSystemOneProxy(
    { ...options(id), timeoutMs: 1000, signal: caller.signal },
    dependencies(
      async (_url, _credentials, init) =>
        new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode('{"answers":'));
              init.signal?.addEventListener("abort", () => controller.error(init.signal?.reason), {
                once: true,
              });
              started();
            },
          })
        )
    )
  );
  await ready;
  const key = gates.buildAccountSemaphoreKey({ provider, accountKey: id });
  try {
    assert.equal(
      gates.getStats()[key]?.running,
      1,
      "Capacity released before the JSON body finished"
    );
  } finally {
    caller.abort();
  }
  const response = await running;
  assert.equal(response.status, 499);
  assert.equal(cooldownCalls, 0, "Caller cancellation must not penalize the account");
  assert.ok(Object.values(gates.getStats()).every((x) => x.running === 0 && x.queued === 0));
});
test("fetch errors and malformed bodies release capacity for the next call", async () => {
  const id = "capacity-errors";
  for (const respond of [
    async () => {
      throw new Error("fixture failure");
    },
    async () => Response.json({ answers: {} }),
  ]) {
    await handleSystemOneProxy({ ...options(id), timeoutMs: 1000 }, dependencies(respond));
    assert.ok(Object.values(gates.getStats()).every((x) => x.running === 0 && x.queued === 0));
  }
  assert.equal(
    (
      await handleSystemOneProxy(
        { ...options(id), timeoutMs: 1000 },
        dependencies(async () => answer())
      )
    ).status,
    200
  );
});

test("zero queue-wait budget still waits for a shared slot until the request deadline", async () => {
  await rates.initializeRateLimits();
  const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
  await rates.applyRequestQueueSettings({
    ...resolveResilienceSettings(null).requestQueue,
    maxWaitMs: 0,
  });
  const id = "capacity-unlimited-queue";
  const release = await gates.acquire(
    gates.buildAccountSemaphoreKey({ provider, accountKey: id }),
    { maxConcurrency: 1 }
  );
  let settled = false,
    calls = 0;
  const pending = handleSystemOneProxy(
    { ...options(id), timeoutMs: 1000 },
    dependencies(async () => {
      calls++;
      return answer();
    })
  ).then((response) => {
    settled = true;
    return response;
  });
  try {
    await new Promise((r) => setTimeout(r, 30));
    assert.equal(settled, false, "0 means no queue deadline, not immediate rejection");
    assert.equal(calls, 0);
  } finally {
    release();
  }
  assert.equal((await pending).status, 200);
  await rates.__resetRateLimitManagerForTests();
});
