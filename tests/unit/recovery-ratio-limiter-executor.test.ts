import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const FLAG = "OMNIROUTE_RECOVERY_RATIO_LIMIT";

// One provider id per test: the pool state is keyed by provider, so no test sees another's
// counts and the test needs no reset hook. The clock is fixed, so the window never slides.
async function send429(provider: string): Promise<{ calls: number; status: number }> {
  const originalFetch = globalThis.fetch;
  const originalDelay = BaseExecutor.RETRY_CONFIG.delayMs;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(JSON.stringify({ error: { message: "slow down" } }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  };
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  try {
    const result = await new DefaultExecutor(provider).execute({
      model: "test-model",
      body: { model: "test-model", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-key" },
    });
    return { calls, status: result.response.status };
  } finally {
    globalThis.fetch = originalFetch;
    BaseExecutor.RETRY_CONFIG.delayMs = originalDelay;
  }
}

test.beforeEach(() => mock.timers.enable({ apis: ["Date"], now: 1_000_000 }));
test.afterEach(() => {
  mock.timers.reset();
  delete process.env[FLAG];
});

test("flag unset: a 429 is retried in place as before (initial send + 2 retries), every time", async () => {
  delete process.env[FLAG];
  for (let i = 0; i < 4; i += 1) {
    const out = await send429("openai");
    assert.equal(out.calls, 3);
    assert.equal(out.status, 429);
  }
});

test("flag on: the floor of 3 pays for the first retries, then the 429 is returned at once", async () => {
  process.env[FLAG] = "true";
  const sent: number[] = [];
  for (let i = 0; i < 4; i += 1) sent.push((await send429("groq")).calls);
  // call 1: initial + 2 retries (2 of the 3 floor slots); call 2: initial + 1 retry (the 3rd
  // slot) and the next retry is refused; calls 3 and 4: the initial send only.
  assert.deepEqual(sent, [3, 2, 1, 1]);
  const last = await send429("groq");
  assert.equal(last.status, 429, "the caller still gets the 429 and can rotate");
});

test("flag on: a refused retry does not stop a later initial send, and pools are separate", async () => {
  process.env[FLAG] = "true";
  for (let i = 0; i < 3; i += 1) await send429("mistral");
  assert.equal((await send429("mistral")).calls, 1, "pool spent");
  assert.equal((await send429("together")).calls, 3, "another pool has its own budget");
});
