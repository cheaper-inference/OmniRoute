/**
 * Deleting a combo must revoke its name from every API key's `allowed_combos`.
 *
 * Grants are stored by combo NAME. Before this fix the name stayed in the
 * allow-list after the combo row was deleted, so a combo later created under the
 * same name was silently granted to every key that had the old one.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-grants-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-grant-revoke-test-secret";

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { isComboNameAllowedForKey } = await import("../../src/shared/utils/apiKeyPolicy.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR))
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else throw error;
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createCombo(name: string): Promise<string> {
  const combo = (await combosDb.createCombo({
    name,
    strategy: "priority",
    models: ["openai/gpt-4"],
  })) as Record<string, unknown>;
  assert.ok(typeof combo?.id === "string", "combo fixture must return an id");
  return combo.id as string;
}

async function createKey(name: string, allowedCombos: string[]) {
  const key = (await apiKeysDb.createApiKey(name, "machine-test", [], { allowedCombos })) as {
    id: string;
    key: string;
  };
  assert.ok(key?.id && key?.key, "key fixture must return id and key");
  return key;
}

async function allowedCombosOf(id: string): Promise<string[] | null> {
  const key = (await apiKeysDb.getApiKeyById(id)) as { allowedCombos?: string[] } | null;
  return key?.allowedCombos ?? null;
}

function rawAllowedCombos(id: string): unknown {
  const row = core
    .getDbInstance()
    .prepare("SELECT allowed_combos FROM api_keys WHERE id = ?")
    .get(id) as { allowed_combos: unknown } | undefined;
  return row?.allowed_combos;
}

test("deleting a combo strips its name (bare and combo/ prefixed) from restricted keys", async () => {
  const c1 = await createCombo("c1");
  await createCombo("other");
  const keyA = await createKey("A", ["c1", "other"]);
  const keyB = await createKey("B", ["combo/c1", "other", "c10"]);

  assert.equal(await combosDb.deleteCombo(c1), true);

  assert.deepEqual(await allowedCombosOf(keyA.id), ["other"]);
  assert.deepEqual(await allowedCombosOf(keyB.id), ["other", "c10"]);
});

test("a combo recreated under the same name is NOT granted to keys that had the old one", async () => {
  const c1 = await createCombo("c1");
  const keyA = await createKey("A", ["c1", "other"]);
  assert.equal(isComboNameAllowedForKey(await allowedCombosOf(keyA.id), "c1"), true);

  await combosDb.deleteCombo(c1);
  await createCombo("c1");

  assert.equal(isComboNameAllowedForKey(await allowedCombosOf(keyA.id), "c1"), false);
});

test("the cached key metadata is invalidated so the revoked grant stops applying at once", async () => {
  const c1 = await createCombo("c1");
  const keyA = await createKey("A", ["c1"]);
  const before = await apiKeysDb.getApiKeyMetadata(keyA.key);
  assert.deepEqual(before?.allowedCombos, ["c1"]);

  await combosDb.deleteCombo(c1);

  const after = await apiKeysDb.getApiKeyMetadata(keyA.key);
  assert.deepEqual(after?.allowedCombos, []);
});

test("a key whose only grant was the deleted combo stays restricted ([] — never NULL)", async () => {
  const c1 = await createCombo("c1");
  const keyA = await createKey("A", ["c1"]);

  await combosDb.deleteCombo(c1);

  assert.equal(rawAllowedCombos(keyA.id), "[]");
  assert.deepEqual(await allowedCombosOf(keyA.id), []);
  assert.equal(isComboNameAllowedForKey(await allowedCombosOf(keyA.id), "c1"), false);
});

test("combo/* keys and unrelated keys are left untouched", async () => {
  const c1 = await createCombo("c1");
  const allKey = await createKey("all", ["combo/*"]);
  const otherKey = await createKey("other", ["other", "c1-suffix"]);
  const rawAllBefore = rawAllowedCombos(allKey.id);
  const rawOtherBefore = rawAllowedCombos(otherKey.id);

  await combosDb.deleteCombo(c1);

  assert.equal(rawAllowedCombos(allKey.id), rawAllBefore);
  assert.equal(rawAllowedCombos(otherKey.id), rawOtherBefore);
});

test("the grant survives while another case variant of the name still exists", async () => {
  const upper = await createCombo("C1");
  const lower = await createCombo("c1");
  const keyA = await createKey("A", ["c1"]);

  await combosDb.deleteCombo(upper);
  assert.deepEqual(await allowedCombosOf(keyA.id), ["c1"]);

  await combosDb.deleteCombo(lower);
  assert.deepEqual(await allowedCombosOf(keyA.id), []);
});

test("a case-variant grant is revoked when the last matching combo is deleted", async () => {
  const c1 = await createCombo("Main");
  const keyA = await createKey("A", ["main", "combo/MAIN", "other"]);

  await combosDb.deleteCombo(c1);

  assert.deepEqual(await allowedCombosOf(keyA.id), ["other"]);
});

test("if the key update fails the combo deletion is rolled back", async () => {
  const c1 = await createCombo("c1");
  const keyA = await createKey("A", ["c1"]);
  core
    .getDbInstance()
    .exec(
      "CREATE TRIGGER fail_key_update BEFORE UPDATE ON api_keys BEGIN SELECT RAISE(ABORT, 'grant cleanup failure'); END;"
    );

  await assert.rejects(() => combosDb.deleteCombo(c1), /grant cleanup failure/);

  assert.ok(await combosDb.getComboById(c1), "combo row must still exist after rollback");
  core.getDbInstance().exec("DROP TRIGGER fail_key_update");
  assert.deepEqual(await allowedCombosOf(keyA.id), ["c1"]);
});

test("deleting a missing combo returns false and leaves keys untouched", async () => {
  const keyA = await createKey("A", ["c1"]);
  const rawBefore = rawAllowedCombos(keyA.id);

  assert.equal(await combosDb.deleteCombo("missing-id"), false);

  assert.equal(rawAllowedCombos(keyA.id), rawBefore);
});
