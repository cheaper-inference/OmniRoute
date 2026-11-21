// A credential rotation must not overwrite a value an operator replaced while the
// exchange was running. updateProviderConnection offers a compare-and-swap fence for
// that: the comparison runs inside the same transaction as the write.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "omniroute-provider-cas-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.STORAGE_ENCRYPTION_KEY = "provider-cas-synthetic-key";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

type Row = Record<string, unknown> & { id: string; providerSpecificData?: Record<string, unknown> };

async function createConnection(name: string, psd: Record<string, unknown>): Promise<Row> {
  const created = (await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-cas-${name}`,
    providerSpecificData: psd,
  })) as Row;
  return created;
}

test("a fenced write applies only while providerSpecificData is unchanged", async () => {
  core.resetDbInstance();
  const created = await createConnection("cas", { sensenovaRefreshToken: "v1" });
  const id = created.id;

  const before = (await providers.getProviderConnectionById(id)) as Row;
  const expected = before.providerSpecificData as Record<string, unknown>;

  const applied = await providers.updateProviderConnection(
    id,
    { providerSpecificData: { ...expected, sensenovaRefreshToken: "v2" } },
    { expectedProviderSpecificData: expected }
  );
  assert.ok(applied, "the matching fence must allow the write");
  const afterApply = (await providers.getProviderConnectionById(id)) as Row;
  assert.equal(afterApply.providerSpecificData?.sensenovaRefreshToken, "v2");

  // An operator replaces the credential between the exchange's read and this write.
  const operatorPsd = { ...(afterApply.providerSpecificData as Record<string, unknown>) };
  operatorPsd.sensenovaRefreshToken = "operator";
  await providers.updateProviderConnection(id, { providerSpecificData: operatorPsd });

  const stale = await providers.updateProviderConnection(
    id,
    { providerSpecificData: { ...expected, sensenovaRefreshToken: "v3" } },
    { expectedProviderSpecificData: expected }
  );
  assert.equal(stale, null, "a stale fence must refuse the write");

  const final = (await providers.getProviderConnectionById(id)) as Row;
  assert.equal(
    final.providerSpecificData?.sensenovaRefreshToken,
    "operator",
    "the operator's value must survive"
  );
});
