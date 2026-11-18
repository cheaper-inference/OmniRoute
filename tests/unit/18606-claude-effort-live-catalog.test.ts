import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-effort-18606-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "effort-18606-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel, replaceSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { appendClaudeEffortVariants } = await import("../../open-sse/utils/claudeEffortVariants.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { cleanupTempDataDir } = await import("../_setup/tempDataDir.ts");
const bases = ["claude-haiku-5-5", "claude-opus-5-5", "claude-sonnet-5-5"];

async function seed(provider: string, ids: string[]) {
  const connection = `effort-18606-${provider}`;
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
       (id, provider, is_active, created_at, updated_at) VALUES (?, ?, 1, ?, ?)`
    )
    .run(connection, provider, now, now);
  await replaceSyncedAvailableModelsForConnection(
    provider,
    connection,
    ids.map((id) => ({ id, name: id, source: "imported" as const }))
  );
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  await seed("claude", bases);
});

test.after(() => cleanupTempDataDir(dataDir));

test("every advertised Claude effort id resolves against the authoritative base catalog", async () => {
  assert.equal((await getActiveSyncedCatalog("claude")).authoritative, true);
  const catalog = appendClaudeEffortVariants(bases.map((id) => ({ id: `cc/${id}` })));
  assert.ok(catalog.length > bases.length);
  for (const entry of catalog) {
    const info = await getModelInfo(entry.id);
    assert.equal(info.errorType, undefined, info.errorMessage);
    assert.equal(info.provider, "claude");
    const base = bases.find((id) => entry.id === `cc/${id}` || entry.id.startsWith(`cc/${id}-`));
    assert.equal(info.model, base);
    const effort = entry.id.slice(`cc/${base}`.length + 1);
    assert.equal(info.resolvedThinkingEffort, effort || undefined);
  }
});

test("a variant with no live base is still rejected", async () => {
  await seed("claude", ["claude-haiku-5-5"]);
  const info = await getModelInfo("cc/claude-opus-5-5-xhigh");
  assert.equal(info.errorType, "model_not_found");
});

test("an explicit custom suffixed id stays literal", async () => {
  await addCustomModel("claude", "claude-haiku-5-5-low", "Literal custom model");
  const info = await getModelInfo("cc/claude-haiku-5-5-low");
  assert.equal(info.model, "claude-haiku-5-5-low");
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("an explicit synced suffixed id stays literal", async () => {
  await seed("claude", ["claude-haiku-5-5", "claude-haiku-5-5-low"]);
  const info = await getModelInfo("cc/claude-haiku-5-5-low");
  assert.equal(info.model, "claude-haiku-5-5-low");
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("a non-Claude provider does not gain undeclared effort aliases", async () => {
  await seed("github", ["claude-haiku-5-5"]);
  const info = await getModelInfo("github/claude-haiku-5-5-low");
  assert.equal(info.errorType, "model_not_found");
});

test("an unadvertised effort is still rejected", async () => {
  const info = await getModelInfo("cc/claude-haiku-5-5-ultra");
  assert.equal(info.errorType, "model_not_found");
});
