/**
 * Vision Bridge must stay inside the caller API key's scope.
 *
 * When the routed model lacks vision, the bridge describes the image with a
 * vision model through an internal self-loop. Both the choice of that model and
 * the describe call itself must respect the caller key's `allowedConnections`
 * and model allow/deny lists — otherwise a restricted key sends its image to a
 * connection/provider it was never granted. With no permitted vision model the
 * bridge steps aside and the request passes through unchanged (fail-open, as if
 * the guardrail were disabled). Keys without restrictions are unaffected.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vision-key-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "vision-key-scope-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
const { callVisionModel } = await import("../../src/lib/guardrails/visionBridgeHelpers.ts");
const { clearSelectionCache } = await import("../../src/lib/guardrails/visionBridgeRouter.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");

const TEXT_MODEL = "groq/llama-3.3-70b-versatile";
// Describe cache off: every case must observe its own describe call.
const SETTINGS = {
  visionBridgeEnabled: true,
  modalityBridgeVisionMode: "describe",
  modalityBridgeCacheEnabled: false,
};

type DescribeCall = { imageUrl: string; config: Record<string, unknown> };

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.clearApiKeyCaches();
  clearSelectionCache();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-vision-scope`,
    apiKey: `sk-${provider}-vision-scope`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function seedKeyInfo(permissions: Record<string, unknown>) {
  const key = await apiKeysDb.createApiKey(`vision-scope-${Date.now()}`, "machine-vision-scope");
  if (Object.keys(permissions).length > 0) {
    await apiKeysDb.updateApiKeyPermissions(key.id, permissions);
  }
  apiKeysDb.clearApiKeyCaches();
  const info = await apiKeysDb.getApiKeyMetadata(key.key);
  assert.ok(info, "seeded key must resolve");
  return info as unknown as Record<string, unknown>;
}

function imagePayload() {
  return {
    model: TEXT_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } },
        ],
      },
    ],
  };
}

function guardrailWithCapture() {
  const calls: DescribeCall[] = [];
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => SETTINGS,
      callVisionModel: async (imageUrl, config) => {
        calls.push({ imageUrl, config: config as unknown as Record<string, unknown> });
        return "a described image";
      },
    },
  });
  return { calls, guardrail };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a key restricted to one connection only describes with a vision model on that connection", async () => {
  await seedConnection("groq");
  await seedConnection("openai"); // default bridge model provider — NOT allowed for the key
  const gemini = await seedConnection("gemini");
  const apiKeyInfo = await seedKeyInfo({ allowedConnections: [gemini.id] });
  const { calls, guardrail } = guardrailWithCapture();

  const result = await guardrail.preCall(imagePayload(), { model: TEXT_MODEL, apiKeyInfo });

  assert.equal(result.block, false);
  assert.equal(calls.length, 1);
  assert.match(String(calls[0].config.model), /^gemini\//);
  const scope = calls[0].config.keyScope as { apiKeyId?: string } | undefined;
  assert.equal(scope?.apiKeyId, apiKeyInfo.id, "the describe call must carry the key scope");
});

test("no permitted vision connection → bridge skipped, request passes through unchanged", async () => {
  const groq = await seedConnection("groq");
  await seedConnection("openai");
  await seedConnection("gemini");
  const apiKeyInfo = await seedKeyInfo({ allowedConnections: [groq.id] });
  const { calls, guardrail } = guardrailWithCapture();

  const result = await guardrail.preCall(imagePayload(), { model: TEXT_MODEL, apiKeyInfo });

  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined, "the payload must pass through untouched");
  assert.equal(calls.length, 0, "no describe call may leave the key's scope");
});

test("model allowlist without any vision model → bridge skipped", async () => {
  await seedConnection("groq");
  await seedConnection("openai");
  const apiKeyInfo = await seedKeyInfo({ allowedModels: [TEXT_MODEL] });
  const { calls, guardrail } = guardrailWithCapture();

  const result = await guardrail.preCall(imagePayload(), { model: TEXT_MODEL, apiKeyInfo });

  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(calls.length, 0);
});

test("blocked vision models are never chosen for the describe call", async () => {
  await seedConnection("groq");
  await seedConnection("openai");
  await seedConnection("gemini");
  const apiKeyInfo = await seedKeyInfo({ blockedModels: ["openai/*"] });
  const { calls, guardrail } = guardrailWithCapture();

  await guardrail.preCall(imagePayload(), { model: TEXT_MODEL, apiKeyInfo });

  assert.equal(calls.length, 1);
  assert.doesNotMatch(String(calls[0].config.model), /^openai\//);
});

test("an unrestricted key keeps the configured bridge model and no key scope (unchanged)", async () => {
  await seedConnection("groq");
  await seedConnection("openai");
  const apiKeyInfo = await seedKeyInfo({});
  const { calls, guardrail } = guardrailWithCapture();

  await guardrail.preCall(imagePayload(), { model: TEXT_MODEL, apiKeyInfo });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].config.model, "openai/gpt-4o-mini");
  assert.equal(calls[0].config.keyScope, undefined);
  assert.equal(calls[0].config.routeThroughOmniRoute, undefined);
});

test("a request without an API key keeps the configured bridge model (unchanged)", async () => {
  await seedConnection("groq");
  await seedConnection("openai");
  const { calls, guardrail } = guardrailWithCapture();

  await guardrail.preCall(imagePayload(), { model: TEXT_MODEL });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].config.model, "openai/gpt-4o-mini");
  assert.equal(calls[0].config.keyScope, undefined);
});

test("a scoped describe call goes through the OmniRoute self-loop carrying the key id", async () => {
  const captured: Array<{ url: string; headers: Record<string, string> }> = [];
  const fetchImpl = (async (url: string, init: RequestInit = {}) => {
    captured.push({ url: String(url), headers: (init.headers || {}) as Record<string, string> });
    return new Response(JSON.stringify({ choices: [{ message: { content: "described" } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as unknown as typeof fetch;

  const description = await callVisionModel(
    "data:image/png;base64,iVBORw0KGgo=",
    {
      model: "openai/gpt-4o-mini",
      prompt: "describe",
      timeoutMs: 5000,
      maxImages: 1,
      fetchImpl,
      keyScope: {
        apiKeyId: "key-under-test",
        cacheScope: "key-under-test:scope",
        hasUsableCredentials: async () => true,
      },
    },
    undefined,
    { maxFallbackAttempts: 1 },
    { hasUsableCredentials: async () => true }
  );

  assert.equal(description, "described");
  assert.equal(captured.length, 1);
  assert.match(captured[0].url, /^http:\/\/localhost:\d+\/v1\/chat\/completions$/);
  assert.equal(captured[0].headers.Authorization, `Bearer ${resolveSelfLoopBearer()}`);
  assert.equal(captured[0].headers["x-omniroute-self-loop-key-id"], "key-under-test");
});
