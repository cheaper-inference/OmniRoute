import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("flat-capacity-entry-");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const log = { info() {}, warn() {}, debug() {}, error() {} };
let sequence = 0;
test.after(async () => {
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});
test.afterEach(() => sem.resetAll());

async function fixture() {
  const id = ++sequence;
  const account = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "flat-" + id,
    apiKey: "synthetic-only-" + id,
    isActive: true,
    maxConcurrent: 1,
  });
  const connectionId = String(account.id);
  const child = {
    name: "flat-child-" + id,
    strategy: "priority",
    config: { maxRetries: 0, maxSetRetries: 0, retryDelayMs: 0, comboTimeoutMs: 2000 },
    models: [{ kind: "model", provider: "openai", model: "gpt-4o-mini", connectionId }],
  };
  let calls = 0;
  const options = {
    body: { stream: false, messages: [{ role: "user", content: "fixture" }] },
    combo: child,
    allCombos: [child],
    settings: {},
    log,
    isModelAvailable: async () => true,
    handleSingleModel: async () => {
      calls++;
      const done = await sem.acquire("openai:" + connectionId, { maxConcurrency: 1 });
      done();
      return Response.json({ choices: [{ message: { role: "assistant", content: "served" } }] });
    },
  };
  // Warm the actual modules before observing admission timing.
  assert.equal((await handleComboChat(options)).status, 200);
  calls = 0;
  return { connectionId, child, options, calls: () => calls };
}

for (const mode of ["plain", "flatten-reference", "execute-no-reference"] as const) {
  test("root common full pool waits with zero set retries: " + mode, async () => {
    const f = await fixture();
    const combo =
      mode === "flatten-reference"
        ? {
            ...f.child,
            name: "flat-parent-" + sequence,
            config: { ...f.child.config, nestedComboMode: "flatten" },
            models: [{ kind: "combo-ref", comboName: f.child.name }],
          }
        : {
            ...f.child,
            config: {
              ...f.child.config,
              ...(mode === "execute-no-reference" ? { nestedComboMode: "execute" } : {}),
            },
          };
    const busy = await sem.acquire("openai:" + f.connectionId, { maxConcurrency: 1 });
    let settled = false;
    const response = handleComboChat({ ...f.options, combo, allCombos: [combo, f.child] }).then(
      (r) => {
        settled = true;
        return r;
      }
    );
    try {
      await pause(75);
      assert.equal(settled, false, "root common capacity must park, not terminate");
      assert.equal(f.calls(), 0);
      const released = Date.now();
      busy();
      assert.equal((await response).status, 200);
      assert.equal(f.calls(), 1);
      assert.ok(Date.now() - released < 500, "release wakes without retry delay");
    } finally {
      busy();
      await response;
    }
  });
}

for (const protectedTarget of [false, true]) {
  test("legacy child common preserves cap skip/protected stop: " + protectedTarget, async () => {
    const f = await fixture();
    const child = {
      ...f.child,
      models: [
        { ...f.child.models[0], fallbackOnlyOnQuotaExhaustion: protectedTarget },
        { kind: "model", provider: "openai", model: "gpt-4o" },
      ],
    };
    const parent = {
      name: "legacy-parent-" + sequence,
      strategy: "priority",
      config: { ...child.config, nestedComboMode: "execute" },
      models: [{ kind: "combo-ref", comboName: child.name }],
    };
    const busy = await sem.acquire("openai:" + f.connectionId, { maxConcurrency: 1 });
    const models: string[] = [];
    try {
      const response = await handleComboChat({
        ...f.options,
        combo: child,
        nesting: {
          depth: 1,
          maxDepth: 10,
          visitedComboNames: [parent.name],
          rootComboName: parent.name,
          attemptBudget: { count: 0, limit: 50 },
        },
        allCombos: [parent, child],
        handleSingleModel: async (_body, model) => {
          models.push(model);
          return Response.json({
            choices: [{ message: { role: "assistant", content: "legacy" } }],
          });
        },
      });
      assert.equal(response.status, protectedTarget ? 503 : 200);
      assert.deepEqual(models, protectedTarget ? [] : ["openai/gpt-4o"]);
      assert.equal(sem.getStats()["openai:" + f.connectionId]?.queued, 0);
    } finally {
      busy();
    }
  });
}

test("actual execute parent skips a capacity-busy child without a logical wait", async () => {
  const f = await fixture();
  const parent = {
    name: "legacy-outer-" + sequence,
    strategy: "priority",
    config: { ...f.child.config, nestedComboMode: "execute" },
    models: [{ kind: "combo-ref", comboName: f.child.name }],
  };
  const busy = await sem.acquire("openai:" + f.connectionId, { maxConcurrency: 1 });
  try {
    const response = await handleComboChat({
      ...f.options,
      combo: parent,
      allCombos: [parent, f.child],
    });
    assert.equal(response.status, 503);
    assert.equal(f.calls(), 0);
    assert.equal(sem.getStats()["openai:" + f.connectionId]?.queued, 0);
  } finally {
    busy();
  }
});

for (const [setRetries, cooldownWait] of [
  [0, false],
  [1, false],
  [0, true],
] as const) {
  test(
    "mixed busy/cooling scan preserves authorized retries: " + setRetries + "/" + cooldownWait,
    async () => {
      const f = await fixture();
      const other = await fixture();
      const { lockModel, clearModelLock } =
        await import("../../../open-sse/services/accountFallback.ts");
      const combo = {
        ...f.child,
        config: {
          ...f.child.config,
          maxSetRetries: setRetries,
          setRetryDelayMs: 180,
          comboCooldownWaitEnabled: cooldownWait,
        },
        models: [...f.child.models, { ...other.child.models[0], model: "gpt-4o" }],
      };
      const busy = await sem.acquire("openai:" + f.connectionId, { maxConcurrency: 1 });
      lockModel("openai", other.connectionId, "gpt-4o", "rate_limit", 90);
      const calls: string[] = [],
        retries: string[] = [];
      const response = handleComboChat({
        ...f.options,
        combo,
        log: {
          ...log,
          info(_tag, text) {
            if (String(text).includes("retrying set")) retries.push(String(text));
          },
        },
        handleSingleModel: async (_body, model) => {
          calls.push(model);
          return Response.json({ choices: [{ message: { role: "assistant", content: "mixed" } }] });
        },
      });
      try {
        if (!cooldownWait) {
          await pause(120);
          assert.deepEqual(
            calls,
            [],
            "cooldown expiry alone cannot wake zero-retry capacity waiting"
          );
        }
        if (setRetries || cooldownWait) {
          assert.equal((await response).status, 200);
          assert.deepEqual(
            calls,
            ["openai/gpt-4o"],
            "authorized retry revisits B while A stays busy"
          );
          assert.equal(sem.getStats()["openai:" + f.connectionId]?.running, 1);
          assert.equal(retries.length, setRetries);
        } else {
          assert.equal(sem.getStats()["openai:" + f.connectionId]?.queued, 1);
          busy();
          assert.equal((await response).status, 200);
          assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
          assert.deepEqual(retries, []);
        }
      } finally {
        busy();
        clearModelLock("openai", other.connectionId, "gpt-4o");
        await response;
      }
    }
  );
}

test("pure root capacity scan spends no set retry and protected busy target keeps barrier", async () => {
  const f = await fixture(),
    other = await fixture();
  const combo = {
    ...f.child,
    config: { ...f.child.config, maxSetRetries: 3, setRetryDelayMs: 1 },
    models: [
      { ...f.child.models[0], fallbackOnlyOnQuotaExhaustion: true },
      { ...other.child.models[0], model: "gpt-4o" },
    ],
  };
  const busy = await sem.acquire("openai:" + f.connectionId, { maxConcurrency: 1 });
  const retries: string[] = [],
    calls: string[] = [];
  const response = handleComboChat({
    ...f.options,
    combo,
    log: {
      ...log,
      info(_tag, text) {
        if (String(text).includes("retrying set")) retries.push(String(text));
      },
    },
    handleSingleModel: async (_body, model) => {
      calls.push(model);
      return Response.json({ choices: [{ message: { role: "assistant", content: "protected" } }] });
    },
  });
  try {
    await pause(50);
    assert.deepEqual(calls, []);
    assert.deepEqual(retries, []);
    busy();
    assert.equal((await response).status, 200);
    assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
  } finally {
    busy();
    await response;
  }
});

test("cache/no-executor success after capacity wake acquires no physical upstream permit", async () => {
  const f = await fixture();
  const busy = await sem.acquire("openai:" + f.connectionId, { maxConcurrency: 1 });
  const response = handleComboChat({
    ...f.options,
    handleSingleModel: async () => {
      assert.equal(sem.getStats()["openai:" + f.connectionId]?.running ?? 0, 0);
      return Response.json({ choices: [{ message: { role: "assistant", content: "cached" } }] });
    },
  });
  try {
    for (let i = 0; i < 100 && sem.getStats()["openai:" + f.connectionId]?.queued !== 1; i++)
      await pause(2);
    assert.equal(sem.getStats()["openai:" + f.connectionId]?.queued, 1);
    busy();
    const served = await response;
    assert.equal(served.status, 200);
    assert.match(await served.text(), /cached/);
    assert.equal(sem.getStats()["openai:" + f.connectionId]?.running ?? 0, 0);
    assert.equal(sem.getStats()["openai:" + f.connectionId]?.queued ?? 0, 0);
  } finally {
    busy();
    await response;
  }
});
