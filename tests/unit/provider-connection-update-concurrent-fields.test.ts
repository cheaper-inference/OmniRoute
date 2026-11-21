/**
 * updateProviderConnection read the row, awaited the management-password guard,
 * then merged the pre-await snapshot into a full-row write. Two updates to
 * different fields that overlapped on that await lost one of the two writes.
 */
import { after, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conn-race-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("concurrent provider connection updates", () => {
  it("keeps both fields when two updates to different fields overlap", async () => {
    const created = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "original",
      apiKey: "sk-test-placeholder",
      isActive: true,
    });
    const id = String(created.id);

    await Promise.all([
      providersDb.updateProviderConnection(id, { name: "renamed" }),
      providersDb.updateProviderConnection(id, { defaultModel: "gpt-test" }),
    ]);

    const row = (await providersDb.getProviderConnectionById(id)) as Record<string, unknown>;
    assert.equal(row.name, "renamed", "the rename must survive the concurrent model write");
    assert.equal(row.defaultModel, "gpt-test", "the model write must survive the rename");
  });
});
