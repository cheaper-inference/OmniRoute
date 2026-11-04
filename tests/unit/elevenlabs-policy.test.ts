/**
 * Regression tests for #12574: the ElevenLabs proxy routes (speech-to-text,
 * text-to-speech/[voiceId], voices, sound effects and music) must enforce API key policy
 * like every other billable /v1/* route, and their endpoint category must
 * be resolvable so allowedEndpoints scoping takes effect.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-elevenlabs-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "elevenlabs-policy-test-secret";

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const costRules = await import("../../src/domain/costRules.ts");
const voicesRoute = await import("../../src/app/api/v1/voices/route.ts");
const speechRoute = await import("../../src/app/api/v1/text-to-speech/[voiceId]/route.ts");
const transcriptionRoute = await import("../../src/app/api/v1/speech-to-text/route.ts");

const { nativeGenerationRoutes } = await import("./helpers/elevenLabsGenerationRoutes.ts");
const originalFetch = globalThis.fetch;
const ELEVENLABS_API_KEY = "test-elevenlabs-key";

function seedElevenLabsCredential() {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
         (id, provider, auth_type, is_active, api_key, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run("elevenlabs-policy-test", "elevenlabs", "apikey", 1, ELEVENLABS_API_KEY, now, now);
  readCache.invalidateDbCache("connections");
}

function stubUpstream() {
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    return Response.json({ voices: [] });
  }) as typeof fetch;
  return () => called;
}

async function callAllNativeRoutes(apiKey: string) {
  const auth = { Authorization: `Bearer ${apiKey}` };
  const voicesResponse = await voicesRoute.GET(
    new Request("http://localhost/v1/voices", { headers: auth })
  );
  const speechResponse = await speechRoute.POST(
    new Request("http://localhost/v1/text-to-speech/voice_123", {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: "{}",
    }),
    { params: Promise.resolve({ voiceId: "voice_123" }) }
  );
  const transcriptionResponse = await transcriptionRoute.POST(
    new Request("http://localhost/v1/speech-to-text", {
      method: "POST",
      headers: auth,
      body: new FormData(),
    })
  );
  const generationResponses = await Promise.all(
    nativeGenerationRoutes.map(({ route, body, path: routePath }) =>
      route.POST(
        new Request(`http://localhost${routePath}`, {
          method: "POST",
          headers: { ...auth, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      )
    )
  );
  return [voicesResponse, speechResponse, transcriptionResponse, ...generationResponses];
}

test.beforeEach(async () => {
  await core.ensureDbInitialized();
  seedElevenLabsCredential();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an over-budget key is rejected with 429 on all native ElevenLabs routes without reaching upstream", async () => {
  const key = await apiKeysDb.createApiKey("EL Budget Key", "machine-elevenlabs-budget");
  costRules.setBudget(key.id, { dailyLimitUsd: 1, warningThreshold: 0.5 });
  costRules.recordCost(key.id, 2);

  const upstreamWasCalled = stubUpstream();
  const responses = await callAllNativeRoutes(key.key);

  for (const response of responses) {
    assert.equal(response.status, 429);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.match(body.error?.message ?? "", /Daily budget exceeded/);
  }
  assert.equal(upstreamWasCalled(), false);
});

test("a key scoped away from the elevenlabs category is rejected with 403 on all native routes", async () => {
  const key = await apiKeysDb.createApiKey("EL Scoped Key", "machine-elevenlabs-scope");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedEndpoints: ["chat"] });

  const upstreamWasCalled = stubUpstream();
  const responses = await callAllNativeRoutes(key.key);

  for (const response of responses) {
    assert.equal(response.status, 403);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.match(body.error?.message ?? "", /(elevenlabs|music).*not allowed/i);
  }
  assert.equal(upstreamWasCalled(), false);
});

test("an unrestricted key still proxies through to the upstream successfully", async () => {
  const key = await apiKeysDb.createApiKey("EL Unrestricted Key", "machine-elevenlabs-ok");

  const upstreamWasCalled = stubUpstream();
  const response = await voicesRoute.GET(
    new Request("http://localhost/v1/voices", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(upstreamWasCalled(), true);
});

for (const { path: routePath, route, body, defaultModel } of nativeGenerationRoutes) {
  test(`${routePath} enforces explicit and default model restrictions`, async () => {
    const key = await apiKeysDb.createApiKey("EL Model Key", `machine-model-${routePath}`);
    await apiKeysDb.updateApiKeyPermissions(key.id, { allowedModels: ["openai/gpt-4.1"] });
    const upstreamWasCalled = stubUpstream();
    for (const payload of [body, { ...body, model_id: defaultModel }]) {
      const response = await route.POST(
        new Request(`http://localhost${routePath}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${key.key}` },
          body: JSON.stringify(payload),
        })
      );
      assert.equal(response.status, 403);
    }
    assert.equal(upstreamWasCalled(), false);
    await apiKeysDb.updateApiKeyPermissions(key.id, {
      allowedModels: [`elevenlabs/${defaultModel}`],
    });
    const response = await route.POST(
      new Request(`http://localhost${routePath}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key.key}` },
        body: JSON.stringify(body),
      })
    );
    assert.equal(response.status, 200);
  });
}

test("sound generation requires elevenlabs access and native music requires music access", async () => {
  const key = await apiKeysDb.createApiKey("EL Category Key", "machine-elevenlabs-categories");
  stubUpstream();
  for (const allowedCategory of ["elevenlabs", "music"]) {
    await apiKeysDb.updateApiKeyPermissions(key.id, { allowedEndpoints: [allowedCategory] });
    for (const { route, body, path: routePath } of nativeGenerationRoutes) {
      const response = await route.POST(
        new Request(`http://localhost${routePath}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${key.key}` },
          body: JSON.stringify(body),
        })
      );
      assert.equal(
        response.status,
        (routePath === "/v1/sound-generation") === (allowedCategory === "elevenlabs") ? 200 : 403
      );
    }
  }
});
