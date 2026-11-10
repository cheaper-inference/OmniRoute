import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  hasTrustedEmptyTurn,
  markEmptyTurnExecution,
} from "../../open-sse/utils/emptyTurnPolicy.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mistral-empty-turn-"));
const savedDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

test.after(async () => {
  const core = await import("../../src/lib/db/core.ts");
  core.resetDbInstance();
  if (savedDataDir) process.env.DATA_DIR = savedDataDir;
  else delete process.env.DATA_DIR;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const completedEmptyStop = `data: {"id":"chatcmpl-test","object":"chat.completion.chunk","created":1793996585,"model":"zai-glm-5-3-flash","choices":[{"index":0,"delta":{"content":""},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n`;
const credentials = { connectionId: "mistral-conn", apiKey: "test-api-key" };

async function checkTrusted(url: string, payload = completedEmptyStop): Promise<boolean> {
  const response = markEmptyTurnExecution(
    new Response(payload, { headers: { "content-type": "text/event-stream" } }),
    url,
    credentials
  );
  await response.text();
  return hasTrustedEmptyTurn(response);
}

test("Mistral native chat completions endpoint establishes trusted empty turn on normal stop", async () => {
  const trusted = await checkTrusted("https://api.mistral.ai/v1/chat/completions");
  assert.equal(trusted, true);
});

test("Untrusted or spoofed Mistral endpoints do not establish trusted empty turn", async () => {
  assert.equal(
    await checkTrusted("https://api.mistral.ai.attacker.invalid/v1/chat/completions"),
    false
  );
  assert.equal(await checkTrusted("https://api.mistral.ai/v1/other/path"), false);
  assert.equal(await checkTrusted("http://api.mistral.ai/v1/chat/completions"), false);
});

test("getModelNormalizeToolCallId defaults to true for mistral provider and false for other providers", async () => {
  const core = await import("../../src/lib/db/core.ts");
  const modelsDb = await import("../../src/lib/db/models.ts");

  core.resetDbInstance();

  // Mistral models must default to true (9-char tool call IDs)
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "zai-glm-5-3-flash"), true);
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "codestral-latest"), true);

  // Other providers default to false
  assert.equal(modelsDb.getModelNormalizeToolCallId("openai", "gpt-4o"), false);
  assert.equal(modelsDb.getModelNormalizeToolCallId("anthropic", "claude-sonnet"), false);

  // Explicit override on custom model (e.g. false) is respected
  await modelsDb.addCustomModel(
    "mistral",
    "mistral-custom-override",
    "mistral-custom-override",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    undefined,
    undefined,
    undefined,
    { endpointCapabilitySource: "operator" }
  );
  await modelsDb.updateCustomModel("mistral", "mistral-custom-override", {
    normalizeToolCallId: false,
  });
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "mistral-custom-override"), false);

  await new Promise((resolve) => setTimeout(resolve, 50));
  core.resetDbInstance();
});

test("mergeModelCompatOverride retains normalizeToolCallId: false as only setting and supports unsetting", async () => {
  const core = await import("../../src/lib/db/core.ts");
  const modelsDb = await import("../../src/lib/db/models.ts");

  core.resetDbInstance();

  // 1. Explicit normalizeToolCallId: false as the ONLY setting on a compat override row
  modelsDb.mergeModelCompatOverride("mistral", "compat-only-model", {
    normalizeToolCallId: false,
  });

  const overrides = modelsDb.getModelCompatOverrides("mistral");
  const row = overrides.find((o) => o.id === "compat-only-model");
  assert.ok(
    row,
    "compat row must be preserved even when normalizeToolCallId: false is its only property"
  );
  assert.equal(row.normalizeToolCallId, false);
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "compat-only-model"), false);

  // 2. Unsetting via null reverts to provider default (true for Mistral)
  modelsDb.mergeModelCompatOverride("mistral", "compat-only-model", {
    normalizeToolCallId: null,
  });
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "compat-only-model"), true);

  // 3. Write-then-read path for an imported custom-model row
  await modelsDb.addCustomModel(
    "mistral",
    "imported-mistral-model",
    "imported-mistral-model",
    "imported",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    undefined,
    undefined,
    undefined,
    { endpointCapabilitySource: "defaulted" }
  );

  // Default lookup on imported row without explicit normalizeToolCallId yields Mistral default (true)
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "imported-mistral-model"), true);

  // Explicit update on imported row to false takes precedence
  await modelsDb.updateCustomModel("mistral", "imported-mistral-model", {
    normalizeToolCallId: false,
  });
  assert.equal(modelsDb.getModelNormalizeToolCallId("mistral", "imported-mistral-model"), false);

  await new Promise((resolve) => setTimeout(resolve, 50));
  core.resetDbInstance();
});
