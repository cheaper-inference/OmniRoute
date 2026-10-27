/**
 * A restricted key's /v1/models must list only models the key can call.
 *
 * Observed: a key restricted to `cc/*` listed ~105 rows from other providers
 * (`dva/claude-opus-5-high`, `ddgw/claude-haiku-4-5`); every chat request to them
 * returned 403 "Model ... is not allowed for this API key".
 *
 * Cause: the catalog filter also checks each row's bare `root` (#781), and with
 * `preferClaudeCodeForUnprefixedClaudeModels` on, the permission check expands any
 * bare `claude-*` name to `cc/<name>` — which `cc/*` matches. Dispatch checks only
 * the requested id, so those rows were listed but refused.
 *
 * Rules:
 *   R1 With the preference on, a `cc/*` key lists cc/, claude/ and their no-think/
 *      variants, and no dva/ or ddgw/ rows.
 *   R2 Every listed provider row passes isModelAllowedForKey(key, id) — with the
 *      preference on and off.
 *   R3 The root fallback still serves a bare allowlist entry (#781).
 *   R4 A no-think/ id is judged as the real model it dispatches to.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-bare-root-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-claude-bare-root";
delete process.env.INITIAL_PASSWORD;
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { isCatalogModelAllowedForKey } =
  await import("../../src/app/api/v1/models/catalogKeyFilter.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedClaudeCodeConnection() {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "claude-bare-root",
    accessToken: "cc-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function restrictedKey(name: string, allowedModels: string[]) {
  const created = await apiKeysDb.createApiKey(name, `machine-${name}`);
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels,
  } as Parameters<typeof apiKeysDb.updateApiKeyPermissions>[1]);
  apiKeysDb.resetApiKeyState();
  return created.key;
}

async function catalogIds(apiKey?: string): Promise<string[]> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string; owned_by?: string }> };
  return body.data.filter((m) => m.owned_by !== "combo").map((m) => m.id);
}

const hasPrefix = (ids: string[], prefix: string) => ids.some((id) => id.startsWith(prefix));

test("R1: a cc/* key lists cc/, claude/ and no-think/ variants, not dva/ or ddgw/", async () => {
  await seedClaudeCodeConnection();
  await settingsDb.updateSettings({ preferClaudeCodeForUnprefixedClaudeModels: true });
  const key = await restrictedKey("cc-only", ["cc/*"]);

  // Precondition: the unfiltered catalog does carry the other providers' claude-* rows.
  const all = await catalogIds();
  assert.ok(hasPrefix(all, "dva/claude-"), "fixture: dva/ claude rows exist in the catalog");
  assert.ok(hasPrefix(all, "ddgw/claude-"), "fixture: ddgw/ claude rows exist in the catalog");

  const ids = await catalogIds(key);
  assert.ok(hasPrefix(ids, "cc/"), "cc/ models are listed");
  assert.ok(hasPrefix(ids, "claude/"), "claude/ models are listed");
  assert.ok(hasPrefix(ids, "no-think/cc/"), "no-think/cc/ variants are listed");
  assert.ok(hasPrefix(ids, "no-think/claude/"), "no-think/claude/ variants are listed");
  assert.deepEqual(
    ids.filter((id) => /^(no-think\/)?(dva|ddgw)\//.test(id)),
    [],
    "no dva/ or ddgw/ row may be listed for a cc/* key"
  );
});

for (const prefer of [true, false]) {
  test(`R2: every listed row is callable by its id (prefer Claude Code: ${prefer})`, async () => {
    await seedClaudeCodeConnection();
    await settingsDb.updateSettings({ preferClaudeCodeForUnprefixedClaudeModels: prefer });
    const key = await restrictedKey(`invariant-${prefer}`, ["cc/*"]);

    const ids = await catalogIds(key);
    assert.ok(ids.length > 0);
    const refused: string[] = [];
    for (const id of ids) {
      if (!(await apiKeysDb.isModelAllowedForKey(key, id))) refused.push(id);
    }
    assert.deepEqual(refused, [], "listed rows that a chat request would refuse");
  });
}

test("R3: the root fallback needs a bare allowlist entry", async () => {
  await settingsDb.updateSettings({ preferClaudeCodeForUnprefixedClaudeModels: true });
  const ccKey = await restrictedKey("cc-wildcard", ["cc/*"]);
  const bareKey = await restrictedKey("bare-claude", ["claude-opus-5-high"]);
  const dvaRow = { id: "dva/claude-opus-5-high", root: "claude-opus-5-high" };

  assert.equal(
    await isCatalogModelAllowedForKey(
      ccKey,
      dvaRow,
      { allowedModels: ["cc/*"], blockedModels: [] },
      apiKeysDb
    ),
    false,
    "cc/* must not admit another provider's row through its bare claude-* root"
  );
  assert.equal(
    await isCatalogModelAllowedForKey(
      bareKey,
      dvaRow,
      { allowedModels: ["claude-opus-5-high"], blockedModels: [] },
      apiKeysDb
    ),
    true,
    "a bare allowlist entry still matches the row's root (#781)"
  );
});

test("R4: a no-think/ id is judged as the model it dispatches to", async () => {
  const key = await restrictedKey("cc-no-think", ["cc/*"]);

  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "no-think/cc/claude-opus-5"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "no-think/claude/claude-opus-5"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "no-think/dva/claude-opus-5-high"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "no-think/"), false);
});
