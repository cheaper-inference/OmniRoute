import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-edit-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-image-edit-key-secret";
process.env.JWT_SECRET = "synthetic-image-edit-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const combos = await import("../../src/lib/db/combos.ts");
const providers = await import("../../src/lib/db/providers.ts");
const edits = await import("../../src/app/api/v1/images/edits/route.ts");
const generations = await import("../../src/app/api/v1/images/generations/route.ts");
const { projectComboForEndpoint } =
  await import("../../open-sse/services/combo/endpointCapabilities.ts");

const KREA = "krea/k3-edit";
const NANO_BANANA = "google/gemini-nano-banana-2.1";
const COMBO = "reference-image-edit";
const TARGETS = [`openrouter/${KREA}`, `openrouter/${NANO_BANANA}`];
const PROMPT = "Make the background blue.";
const PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a7x0AAAAASUVORK5CYII=";
const REFERENCE = `data:image/png;base64,${PNG}`;

let key: string;
const savedFetch = globalThis.fetch;

test.before(async () => {
  await providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "synthetic-openrouter",
    apiKey: "sk-or-synthetic-image-edit",
    isActive: true,
    testStatus: "active",
  });
  await combos.createCombo({ name: COMBO, strategy: "priority", models: TARGETS });
  const created = await keys.createApiKey(
    "synthetic-edit-key",
    "image-edit-tests",
    ["self:usage"],
    {
      modelAccessMode: "restricted",
      allowedModels: [],
      allowedCombos: [COMBO],
    }
  );
  await keys.updateApiKeyPermissions(created.id, {
    allowedEndpoints: ["images"],
    allowAutoCombos: false,
    autoResolve: false,
    noLog: true,
  });
  key = created.key;
});

test.afterEach(() => {
  globalThis.fetch = savedFetch;
});

test.after(() => {
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function edit(model: string) {
  const form = new FormData();
  form.set("model", model);
  form.set("prompt", PROMPT);
  form.append("image[]", new Blob([Buffer.from(PNG, "base64")], { type: "image/png" }), "ref.png");
  return edits.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
    })
  );
}

function mockOpenRouter(failKrea = false) {
  const attempts: unknown[] = [];
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), "https://openrouter.ai/api/v1/images");
    assert.equal(init?.method, "POST");
    assert.equal(
      new Headers(init?.headers).get("authorization"),
      "Bearer sk-or-synthetic-image-edit"
    );
    assert.equal(typeof init?.body, "string");
    const body = JSON.parse(String(init?.body));
    attempts.push({
      model: body.model,
      prompt: body.prompt,
      references: body.input_references,
    });
    if (failKrea && body.model === KREA) {
      return Response.json({ error: { message: "Synthetic upstream failure" } }, { status: 502 });
    }
    return Response.json({ data: [{ b64_json: PNG }] });
  };
  return attempts;
}

function expectedAttempt(model: string) {
  return {
    model,
    prompt: PROMPT,
    references: [{ type: "image_url", image_url: { url: REFERENCE } }],
  };
}

test("both OpenRouter models survive edit combo projection in priority order", () => {
  const combo = { name: COMBO, strategy: "priority", models: TARGETS };
  const edits = projectComboForEndpoint(combo, [combo], "image-edits");
  assert.deepEqual(
    edits.combo.models.map((step) => step.model),
    TARGETS
  );
  const generation = projectComboForEndpoint(combo, [combo], "images");
  assert.deepEqual(
    generation.combo.models.map((step) => step.model),
    [TARGETS[1]]
  );
});

test("a multipart image[] request reaches Krea with the exact reference", async () => {
  const attempts = mockOpenRouter();
  const response = await edit(COMBO);
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal((await response.json()).data[0].b64_json, PNG);
  assert.deepEqual(attempts, [expectedAttempt(KREA)]);
});

test("a Krea 502 falls back to Nano Banana 2.1 with the same reference", async () => {
  const attempts = mockOpenRouter(true);
  const response = await edit(COMBO);
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal((await response.json()).data[0].b64_json, PNG);
  assert.deepEqual(attempts, [expectedAttempt(KREA), expectedAttempt(NANO_BANANA)]);
});

test("the combo-scoped key cannot edit through either direct model ID", async () => {
  const attempts = mockOpenRouter();
  for (const model of TARGETS) {
    const response = await edit(model);
    assert.equal(response.status, 403, await response.clone().text());
  }
  assert.deepEqual(attempts, []);
});

test("Krea K3 Edit is not dispatched for direct text-only generation", async () => {
  const attempts = mockOpenRouter();
  const response = await generations.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: TARGETS[0], prompt: PROMPT }),
    })
  );
  assert.equal(response.status, 400);
  assert.match((await response.json()).error.message, /image edits/i);
  assert.deepEqual(attempts, []);
});
