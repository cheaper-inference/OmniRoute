/** Real native route queued admission, synthetic connections and intercepted fetch only. */
import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-queued-connection-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "queued-connection-fixture-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/api/v1/systemone/route.ts");
const { acquire, getStats } = await import("../../open-sse/services/accountSemaphore.ts");
const originalFetch = globalThis.fetch;
after(async () => {
  const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await closeCallLogSaves();
  globalThis.fetch = originalFetch;
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

for (const [name, mutation, expected] of [
  ["disabled", { isActive: false }, 403],
  ["deleted", null, 403],
  ["model excluded", { providerSpecificData: { excludedModels: ["jev-1.14.0"] } }, 403],
  ["tier changed", { providerSpecificData: { systemOneTier: "free" } }, 403],
  [
    "endpoint changed",
    { providerSpecificData: { systemOneUrl: "https://api.typesafe.ai/v1/systemone?revision=2" } },
    409,
  ],
  ["credential changed", { apiKey: "changed-synthetic-native-key" }, 409],
  ["provider identity changed", { provider: "openrouter" }, 403],
  ["terminal status", { testStatus: "banned" }, 403],
  ["cooldown", { rateLimitedUntil: new Date(Date.now() + 120_000).toISOString() }, 403],
  ["concurrency changed", { maxConcurrent: 2 }, 409],
  [
    "model concurrency changed",
    { rateLimitOverrides: { modelConcurrency: { "jev-1.14.0": 1 } } },
    409,
  ],
  [
    "benign metadata changed",
    {
      name: "Renamed fixture",
      providerSpecificData: { observedQuotaPercent: 50, displayHint: "fixture only" },
    },
    200,
  ],
  [
    "other model concurrency changed",
    { rateLimitOverrides: { modelConcurrency: { "other-model": 1 } } },
    200,
  ],
  ["unchanged", {}, 200],
] as const) {
  test(`queued native connection ${name} is revalidated before physical dispatch`, async () => {
    const connection = await providers.createProviderConnection({
      provider: "typesafe",
      authType: "apikey",
      name: `queued ${name} fixture`,
      apiKey: `synthetic-native-key-${name}`,
      isActive: true,
      maxConcurrent: 1,
    });
    const client = await keys.createApiKey("queued connection client", "synthetic-machine", [], {
      allowedConnections: [String(connection.id)],
    });
    const semaphore = `typesafe:${connection.id}`;
    const release = await acquire(semaphore, { maxConcurrency: 1 });
    let calls = 0;
    const previousFetch = globalThis.fetch;
    globalThis.fetch = (async (url) => {
      calls++;
      assert.equal(String(url), "https://api.typesafe.ai/v1/systemone");
      return Response.json({
        model: "jev-1.14.0",
        answers: { lamp: { type: "noul", noul: 1 } },
        usage: { input_tokens: 3, output_tokens: 1, cost: 0 },
      });
    }) as typeof fetch;
    const req = new Request("http://localhost/v1/systemone", {
      method: "POST",
      headers: { authorization: `Bearer ${client.key}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: "typesafe/jev-1.14.0",
        state: "Synthetic lamp",
        questions: { lamp: { type: "noul", instructions: "Is the lamp on?" } },
      }),
    });
    const pending = route.POST(req);
    try {
      for (let n = 0; n < 200 && !getStats()[semaphore]?.queued; n++)
        await new Promise((resolve) => setTimeout(resolve, 5));
      assert.equal(getStats()[semaphore]?.queued, 1);
      if (mutation === null) await providers.deleteProviderConnection(String(connection.id));
      else if (Object.keys(mutation).length)
        await providers.updateProviderConnection(String(connection.id), mutation);
      release();
      const result = await pending;
      assert.equal(result.status, expected, await result.clone().text());
      assert.equal(calls, expected === 200 ? 1 : 0);
      const row = core
        .getDbInstance()
        .prepare("SELECT COUNT(*) AS total FROM usage_history WHERE api_key_id = ?")
        .get(client.id);
      assert.equal(row.total, expected === 200 ? 1 : 0);
      assert.doesNotMatch(await result.text(), /synthetic-native-key/);
    } finally {
      release();
      await pending;
      globalThis.fetch = previousFetch;
      await providers.deleteProviderConnection(String(connection.id));
    }
  });
}

test("caller cancellation removes queued native admission without dispatching or recording usage", async () => {
  const connection = await providers.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    name: "cancelled queued connection",
    apiKey: "synthetic-native-cancel-key",
    isActive: true,
    maxConcurrent: 1,
  });
  const client = await keys.createApiKey("cancelled queue client", "synthetic-machine", [], {
    allowedConnections: [String(connection.id)],
  });
  const semaphore = `typesafe:${connection.id}`;
  const release = await acquire(semaphore, { maxConcurrency: 1 });
  const controller = new AbortController();
  let calls = 0;
  const saved = globalThis.fetch;
  globalThis.fetch = (async () => {
    calls++;
    throw new Error("Unexpected cancelled dispatch");
  }) as typeof fetch;
  const pending = route.POST(
    new Request("http://localhost/v1/systemone", {
      method: "POST",
      signal: controller.signal,
      headers: { authorization: `Bearer ${client.key}` },
      body: JSON.stringify({
        model: "typesafe/jev-1.14.0",
        state: "Synthetic",
        questions: { q: { type: "noul", instructions: "True?" } },
      }),
    })
  );
  try {
    for (let n = 0; n < 200 && !getStats()[semaphore]?.queued; n++)
      await new Promise((resolve) => setTimeout(resolve, 5));
    assert.equal(getStats()[semaphore]?.queued, 1);
    controller.abort();
    assert.equal((await pending).status, 499);
    assert.equal(calls, 0);
    assert.equal(getStats()[semaphore]?.queued ?? 0, 0);
    assert.equal(
      core
        .getDbInstance()
        .prepare("SELECT COUNT(*) AS total FROM usage_history WHERE api_key_id = ?")
        .get(client.id).total,
      0
    );
  } finally {
    release();
    await pending;
    globalThis.fetch = saved;
    await providers.deleteProviderConnection(String(connection.id));
  }
});
