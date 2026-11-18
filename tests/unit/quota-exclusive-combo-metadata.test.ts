/**
 * A quota-exclusive key's qtSd/* combos must describe their own targets.
 *
 * Both quota paths in the catalog built combo metadata from the full combo list
 * instead of the combo's resolved targets, so every target lookup missed and the
 * entry lost `effort_tiers`, `vision` and the target's token limits. The fix gives
 * the quota path the same target resolution as an ordinary combo, so a visible
 * copy of each qtSd/* combo (same targets, same connection pin) is the oracle.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the DB modules load, so they are imported dynamically.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-combo-metadata-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-combo-metadata-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { isQuotaModelName } = await import("../../src/lib/quota/quotaModelNaming.ts");

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type CatalogRow = Record<string, unknown> & { id: string };

async function listModels(key: string): Promise<Map<string, CatalogRow>> {
  v1ModelsCatalog.__expireCatalogCacheForTest(
    v1ModelsCatalog.CATALOG_STALE_WHILE_REVALIDATE_MS + 1_000
  );
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { headers: { Authorization: `Bearer ${key}` } })
  );
  assert.equal(res.status, 200);
  const { data } = (await res.json()) as { data: CatalogRow[] };
  return new Map(data.map((row) => [row.id, row]));
}

const MIRROR_PREFIX = "quota-mirror/";
const DESCRIBED_FIELDS = [
  "context_length",
  "max_input_tokens",
  "max_output_tokens",
  "input_modalities",
  "capabilities",
] as const;

test("qtSd/* combos carry the same target metadata as an ordinary combo", async () => {
  const group = groupsDb.createGroup("Meta");
  const conn = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "quota-meta-anthropic",
    apiKey: "sk-ant-quota-meta",
  });
  const pool = poolsDb.createPool({
    connectionId: (conn as Record<string, unknown>).id as string,
    name: "Meta",
    groupId: group.id,
  });
  await syncQuotaCombos(pool.id);

  const quotaCombos = (await combosDb.getCombos()).filter((combo) =>
    isQuotaModelName(String(combo.name))
  );
  assert.ok(quotaCombos.length > 0, "the pool must generate qtSd/* combos");
  for (const combo of quotaCombos) {
    const { id: _id, ...copy } = combo as Record<string, unknown>;
    await combosDb.createCombo({ ...copy, name: `${MIRROR_PREFIX}${combo.name}`, isHidden: false });
  }

  const quotaKey = await apiKeysDb.createApiKey("Quota key", "machine-quota-meta");
  await apiKeysDb.updateApiKeyPermissions(quotaKey.id, { allowedQuotas: [pool.id] });
  const normalKey = await apiKeysDb.createApiKey("Normal key", "machine-normal-meta");

  const quotaRows = await listModels(quotaKey.key);
  const normalRows = await listModels(normalKey.key);

  let withTiers = 0;
  for (const combo of quotaCombos) {
    const quotaRow = quotaRows.get(String(combo.name));
    const mirrorRow = normalRows.get(`${MIRROR_PREFIX}${combo.name}`);
    assert.ok(quotaRow && mirrorRow, `both listings must contain ${combo.name}`);
    for (const field of DESCRIBED_FIELDS) {
      assert.deepEqual(quotaRow[field], mirrorRow[field], `${combo.name}.${field}`);
    }
    const capabilities = quotaRow.capabilities as Record<string, unknown> | undefined;
    if (Array.isArray(capabilities?.effort_tiers)) withTiers++;
  }
  assert.ok(withTiers > 0, "at least one qtSd/* combo must advertise effort_tiers");
});
