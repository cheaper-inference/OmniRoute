import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const testDir = mkdtempSync(join(import.meta.dirname, ".kea-9627-"));
process.env.HOME = testDir;
process.env.DATA_DIR = join(testDir, "data");
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS = "0";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  rmSync(testDir, { recursive: true, force: true });
});

const { POST } = await import("../../src/app/api/v1/chat/completions/route.ts");
const { POST: postMessages } = await import("../../src/app/api/v1/messages/route.ts");

test("KEA-9627: chat completions returns model_not_found for an unknown bare model", async (t) => {
  const upstream = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("An unresolvable model must not reach upstream");
  });

  const response = await POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "kea-9627-nonexistent-model",
        messages: [{ role: "user", content: "Hello" }],
        stream: false,
      }),
    })
  );
  const payload = (await response.json()) as { error?: { code?: string } };

  assert.equal(upstream.mock.callCount(), 0);
  assert.deepEqual(
    { status: response.status, code: payload.error?.code },
    { status: 404, code: "model_not_found" }
  );
});

test("KEA-9627: Messages returns model_not_found for an unknown bare model", async (t) => {
  const upstream = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("An unresolvable model must not reach upstream");
  });

  const response = await postMessages(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "kea-9627-nonexistent-model",
        max_tokens: 32,
        messages: [{ role: "user", content: "Hello" }],
        stream: false,
      }),
    })
  );
  const payload = (await response.json()) as { error?: { code?: string } };

  assert.equal(upstream.mock.callCount(), 0);
  assert.deepEqual(
    { status: response.status, code: payload.error?.code },
    { status: 404, code: "model_not_found" }
  );
});

test("KEA-9627: a combo advances past a local model 404 on the same connection", async () => {
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  const { isProviderInCooldown } =
    await import("../../open-sse/services/providerCooldownTracker.ts");
  const { createProviderConnection, getProviderConnectionById } =
    await import("../../src/lib/db/providers.ts");
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  const { DEFAULT_RESILIENCE_SETTINGS } = await import("../../src/lib/resilience/settings.ts");
  const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");
  const { getCircuitBreaker, STATE } = await import("../../src/shared/utils/circuitBreaker.ts");

  const providerId = "openai";
  const connection = await createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "KEA-9627 fallback",
    apiKey: "test-kea-9627",
    isActive: true,
    testStatus: "active",
  });
  const connectionId = connection.id;
  assert.ok(typeof connectionId === "string");
  // Force an explicitly prefixed stale target through bare-model resolution.
  await updateSettings({ stripModelPrefix: true });

  const missing = "openai/kea-9627-nonexistent-model";
  const available = "openai/gpt-4o";
  const attempts: string[] = [];
  let firstStatus: number | undefined;
  const settings = {
    ...DEFAULT_RESILIENCE_SETTINGS,
    providerCooldown: { ...DEFAULT_RESILIENCE_SETTINGS.providerCooldown, enabled: true },
  };
  const noop = () => {};
  const response = await handleComboChat({
    body: { messages: [{ role: "user", content: "Hello" }], stream: false },
    combo: {
      name: "kea-9627-fallback",
      strategy: "priority",
      models: [missing, available].map((model) => ({ model, providerId, connectionId })),
      config: { maxRetries: 0, fallbackDelayMs: 0 },
    },
    // Exercise dispatch when availability preflight did not already eliminate the stale target.
    isModelAvailable: async () => true,
    handleSingleModel: async (body, model) => {
      attempts.push(model);
      if (model === missing) {
        const resolved = await resolveModelOrError(model, body, "/v1/chat/completions");
        firstStatus = resolved.error?.status;
        assert.ok(resolved.error);
        return resolved.error;
      }
      assert.equal(isProviderInCooldown(providerId, connectionId, settings), false);
      assert.equal(isProviderInCooldown(providerId, undefined, settings), false);
      const breaker = getCircuitBreaker(providerId);
      assert.equal(breaker.state, STATE.CLOSED);
      assert.equal(breaker.failureCount, 0);
      return Response.json({ choices: [{ message: { role: "assistant", content: "Fallback" } }] });
    },
    log: { info: noop, warn: noop, debug: noop, error: noop },
    settings,
  });

  assert.deepEqual(attempts, [missing, available]);
  assert.equal(firstStatus, 404);
  assert.equal(response.status, 200);
  const savedConnection = await getProviderConnectionById(connectionId);
  assert.equal(savedConnection?.testStatus, "active");
  assert.equal(savedConnection?.rateLimitedUntil ?? null, null);
});
