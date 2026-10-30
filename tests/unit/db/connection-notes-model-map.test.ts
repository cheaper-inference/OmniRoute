import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-conn-notes-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(reset);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("createProviderConnection persists notes and modelMap", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    name: "OpenAI Account with Notes and Model Map",
    notes: "Primary account for production fallbacks",
    modelMap: {
      "gpt-4o": "gpt-4o-mini",
      "chatgpt-4o-latest": "gpt-4o",
    },
  });

  assert.ok(created.id);
  assert.equal(created.notes, "Primary account for production fallbacks");
  assert.deepEqual(created.modelMap, {
    "gpt-4o": "gpt-4o-mini",
    "chatgpt-4o-latest": "gpt-4o",
  });

  const fetched = await providersDb.getProviderConnectionById(created.id as string);
  assert.ok(fetched);
  assert.equal(fetched.notes, "Primary account for production fallbacks");
  assert.deepEqual(fetched.modelMap, {
    "gpt-4o": "gpt-4o-mini",
    "chatgpt-4o-latest": "gpt-4o",
  });
});

test("updateProviderConnection updates and clears notes and modelMap", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "anthropic",
    name: "Anthropic Test",
    notes: "Initial note",
    modelMap: { "claude-3-7-sonnet": "claude-3-5-sonnet" },
  });

  // Update
  await providersDb.updateProviderConnection(created.id as string, {
    notes: "Updated note",
    modelMap: { "claude-3-7-sonnet": "claude-3-5-haiku" },
  });

  let fetched = await providersDb.getProviderConnectionById(created.id as string);
  assert.equal(fetched?.notes, "Updated note");
  assert.deepEqual(fetched?.modelMap, { "claude-3-7-sonnet": "claude-3-5-haiku" });

  // Clear notes and modelMap to null
  await providersDb.updateProviderConnection(created.id as string, {
    notes: null,
    modelMap: null,
  });

  fetched = await providersDb.getProviderConnectionById(created.id as string);
  assert.equal(fetched?.notes, null);
  assert.equal(fetched?.modelMap, null);
});

test("getProviderConnections projection allows notes and model_map columns", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "gemini",
    name: "Gemini Projected",
    notes: "Projected notes",
    modelMap: { "gemini-2.5-pro": "gemini-2.5-flash" },
  });

  const list = await providersDb.getProviderConnections(
    { provider: "gemini" },
    undefined,
    undefined,
    ["id", "provider", "notes", "model_map"]
  );

  assert.equal(list.length, 1);
  assert.equal(list[0].id, created.id);
  assert.equal(list[0].notes, "Projected notes");
  assert.deepEqual(list[0].modelMap, { "gemini-2.5-pro": "gemini-2.5-flash" });
});
