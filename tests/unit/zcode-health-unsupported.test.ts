import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const data = mkdtempSync(join(tmpdir(), "zcode-health-unsupported-"));
process.env.DATA_DIR = data;
const { testOAuthConnection, testSingleConnection } =
  await import("../../src/app/api/providers/[id]/test/route.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  rmSync(data, { recursive: true, force: true });
});
test("unsupported OAuth health checks skip instead of cooling down working native ZCode", async () => {
  const probe = await testOAuthConnection({
    provider: "zcode",
    authType: "oauth",
    accessToken: "fixture",
  });
  assert.equal(probe.skipped, true);
  const row = await createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "native healthy fixture",
    accessToken: "fixture",
    testStatus: "active",
    isActive: true,
  });
  const result = await testSingleConnection(row.id);
  assert.equal(result.skipped, true);
  const current = await getProviderConnectionById(row.id);
  assert.equal(current.testStatus, "active");
  assert.equal(current.rateLimitedUntil ?? null, null);
  assert.equal(current.lastError ?? null, null);
});
