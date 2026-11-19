import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Opt-in refusal to overwrite: a caller that scripts pool imports or key rotation can send
 * `allowOverwrite: false` and get PROVIDER_NAME_CONFLICT (409 on the API) instead of silently
 * replacing a stored key when a name or key value matches. Omitting the field keeps the upsert.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-allow-overwrite-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "allow-overwrite-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const create = (data: Record<string, unknown>) =>
  providersDb.createProviderConnection({ provider: "openai", authType: "apikey", ...data });
const storedKey = async (id: string) =>
  ((await providersDb.getProviderConnectionById(id)) as { apiKey?: string } | null)?.apiKey;

test("allowOverwrite:false refuses a reused name and leaves the stored key; omitted keeps the upsert", async () => {
  const first = (await create({ name: "key A", apiKey: "sk-first-secret" })) as { id: string };

  await assert.rejects(
    create({ name: "key A", apiKey: "sk-second-secret", allowOverwrite: false }),
    (error: { code?: string; existingId?: string }) => {
      assert.equal(error.code, "PROVIDER_NAME_CONFLICT");
      assert.equal(error.existingId, first.id);
      return true;
    }
  );
  assert.equal(
    await storedKey(first.id),
    "sk-first-secret",
    "a refused call must not change the key"
  );

  const replaced = (await create({ name: "key A", apiKey: "sk-second-secret" })) as { id: string };
  assert.equal(replaced.id, first.id, "without the flag the same call is today's upsert");
  assert.equal(await storedKey(first.id), "sk-second-secret");
});

test("allowOverwrite:false also refuses a reused key value under another name", async () => {
  const first = (await create({ name: "key A", apiKey: "sk-shared-secret" })) as { id: string };

  await assert.rejects(
    create({ name: "key B", apiKey: "sk-shared-secret", allowOverwrite: false }),
    (error: { code?: string; existingId?: string }) =>
      error.code === "PROVIDER_NAME_CONFLICT" && error.existingId === first.id
  );
  assert.equal((await providersDb.getProviderConnections({ provider: "openai" })).length, 1);
});

test("allowOverwrite:false with a new name and a new key inserts a second connection", async () => {
  await create({ name: "key A", apiKey: "sk-first-secret" });

  const second = (await create({
    name: "key B",
    apiKey: "sk-other-secret",
    allowOverwrite: false,
  })) as { id: string };

  assert.equal((await providersDb.getProviderConnections({ provider: "openai" })).length, 2);
  const stored = (await providersDb.getProviderConnectionById(second.id)) as Record<
    string,
    unknown
  >;
  assert.equal(JSON.stringify([second, stored]).includes("allowOverwrite"), false);
});

test("allowOverwrite:true behaves like omitted: an existing name is still replaced", async () => {
  const first = (await create({ name: "key A", apiKey: "sk-first-secret" })) as { id: string };

  const again = (await create({
    name: "key A",
    apiKey: "sk-second-secret",
    allowOverwrite: true,
  })) as { id: string };

  assert.equal(again.id, first.id);
  assert.equal(await storedKey(first.id), "sk-second-secret");
  // The merge path spreads the request into the returned row: the flag must be stripped before it.
  assert.equal(
    "allowOverwrite" in again,
    false,
    "the request switch must not be merged into the row"
  );
});
