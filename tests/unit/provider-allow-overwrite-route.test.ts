import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * POST /api/providers: `allowOverwrite: false` turns a name or key match into HTTP 409
 * PROVIDER_NAME_CONFLICT (with the existing id) instead of replacing the stored key. A body
 * without the field keeps the upsert. Nothing else about the route changes.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-allow-overwrite-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "allow-overwrite-route-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/providers/route.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
const { settleConnectionFollowUpsAfterEachTest } =
  await import("../helpers/connectionFollowUps.ts");

settleConnectionFollowUpsAfterEachTest();

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const post = async (body: Record<string, unknown>) =>
  POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: { provider: "openai", ...body },
    })
  );
const storedKey = async (id: string) =>
  ((await providersDb.getProviderConnectionById(id)) as { apiKey?: string } | null)?.apiKey;

test("allowOverwrite:false answers 409 PROVIDER_NAME_CONFLICT with the existing id; omitted still upserts", async () => {
  const created = await post({ name: "key A", apiKey: "sk-route-first" });
  assert.equal(created.status, 201);
  const existingId = ((await created.json()) as { connection: { id: string } }).connection.id;

  const refused = await post({ name: "key A", apiKey: "sk-route-second", allowOverwrite: false });
  assert.equal(refused.status, 409);
  const body = (await refused.json()) as { error: { code?: string; existingId?: string } };
  assert.equal(body.error.code, "PROVIDER_NAME_CONFLICT");
  assert.equal(body.error.existingId, existingId);
  assert.equal(await storedKey(existingId), "sk-route-first");

  const replaced = await post({ name: "key A", apiKey: "sk-route-second" });
  assert.equal(replaced.status, 201);
  assert.equal(await storedKey(existingId), "sk-route-second");
});

test("a non-boolean allowOverwrite is a validation error", async () => {
  const response = await post({ name: "key A", apiKey: "sk-route-first", allowOverwrite: "no" });
  assert.equal(response.status, 400);
});
