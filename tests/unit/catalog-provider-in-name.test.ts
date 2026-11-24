/**
 * Opt-in `catalogProviderInName`: every provider row's `name` ends with
 * " · <Provider>". Default off leaves /v1/models output unchanged.
 * Related: #20369 (inconsistent provider cues in `name`), #4516 (duplicate-name qualifier).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-in-name-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const schemas = await import("../../src/shared/validation/settingsSchemas.ts");
const { labelCatalogModelName, labelCatalogModelNames } =
  await import("../../src/app/api/v1/models/catalogProviderLabel.ts");

type Row = { id: string; name?: string; owned_by?: string };

async function fetchCatalog(): Promise<Row[]> {
  const res = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  assert.equal(res.status, 200);
  return ((await res.json()) as { data: Row[] }).data;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("label helper makes OpenRouter, GitLab Duo and cc/ names consistent", () => {
  assert.equal(
    labelCatalogModelName({
      id: "openrouter/anthropic/claude-haiku-5.5",
      owned_by: "openrouter",
      name: "Anthropic: Claude Haiku 5.5",
    }).name,
    "Claude Haiku 5.5 · OpenRouter"
  );
  assert.equal(
    labelCatalogModelName({
      id: "gitlab-duo/claude-haiku-4-5",
      owned_by: "gitlab-duo",
      name: "Claude Haiku 4.5 (GitLab Duo)",
    }).name,
    "Claude Haiku 4.5 · GitLab Duo"
  );
  assert.equal(
    labelCatalogModelName({
      id: "cc/claude-haiku-5-5",
      owned_by: "claude",
      name: "cc/Claude Haiku 5.5",
    }).name,
    "Claude Haiku 5.5 · Claude Code"
  );
  assert.equal(
    labelCatalogModelName({ id: "gh/gpt-5.5", owned_by: "github", name: "GPT-5.5" }).name,
    "GPT-5.5 · GitHub Copilot"
  );
});

test("label helper is idempotent and leaves combos, unresolvable owners and nameless rows alone", () => {
  const once = labelCatalogModelName({ id: "gh/gpt-5.5", owned_by: "github", name: "GPT-5.5" });
  assert.equal(labelCatalogModelName(once).name, once.name);
  const combo = { id: "my-combo", owned_by: "combo", name: "my-combo" };
  assert.equal(labelCatalogModelName(combo), combo);
  const unknown = { id: "mystery/x", owned_by: "somebody-else", name: "X" };
  assert.equal(labelCatalogModelName(unknown), unknown);
  const nameless = { id: "gh/x", owned_by: "github" };
  assert.equal(labelCatalogModelName(nameless), nameless);
  assert.equal(labelCatalogModelNames([combo])[0], combo);
});

test("OpenRouter rows keep the vendor prefix only when stripping it would collide", () => {
  const rows = [
    { id: "openrouter/meta/llama-3", owned_by: "openrouter", name: "Meta: Llama 3" },
    { id: "openrouter/acme/llama-3", owned_by: "openrouter", name: "Acme: Llama 3" },
    { id: "openrouter/anthropic/claude-x", owned_by: "openrouter", name: "Anthropic: Claude X" },
  ];
  assert.deepEqual(
    labelCatalogModelNames(rows).map((m) => m.name),
    ["Meta: Llama 3 · OpenRouter", "Acme: Llama 3 · OpenRouter", "Claude X · OpenRouter"]
  );
});

test("catalogProviderInName defaults to false and is accepted by the settings schema", async () => {
  assert.equal((await settingsDb.getSettings()).catalogProviderInName, false);
  const parsed = schemas.updateSettingsSchema.safeParse({ catalogProviderInName: true });
  assert.equal(parsed.success && parsed.data.catalogProviderInName, true);
});

test("default off keeps /v1/models names; on labels provider rows only; ids never change", async () => {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "claude-main",
    apiKey: "sk-ant-test",
    isActive: true,
  });

  await settingsDb.updateSettings({ catalogProviderInName: false });
  const off = await fetchCatalog();
  assert.ok(off.length > 0);
  assert.ok(
    off.every((m) => !(m.name || "").includes(" · ")),
    "no label while off"
  );

  await settingsDb.updateSettings({ catalogProviderInName: true });
  const on = await fetchCatalog();
  assert.deepEqual(on.map((m) => m.id).sort(), off.map((m) => m.id).sort(), "ids unchanged");
  const claudeRow = on.find((m) => m.owned_by === "claude" && m.name);
  assert.ok(claudeRow, "a claude row exists");
  assert.ok(claudeRow.name!.endsWith(" · Claude Code"), claudeRow.name);
  for (const m of on.filter((r) => r.owned_by === "combo")) {
    assert.ok(!(m.name || "").includes(" · "), "combos stay unlabeled");
  }

  await settingsDb.updateSettings({ catalogProviderInName: false });
  const back = await fetchCatalog();
  assert.deepEqual(
    back.map((m) => [m.id, m.name]),
    off.map((m) => [m.id, m.name]),
    "turning it off restores the original output (cache key includes the flag)"
  );
});
