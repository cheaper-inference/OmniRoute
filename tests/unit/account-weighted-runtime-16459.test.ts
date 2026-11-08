import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-weighted-16459-"));
process.env.DATA_DIR = DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const scope of ["global", "provider"] as const) {
  test(`#16459 persisted legacy ${scope} weighted still selects exactly like fill-first`, async () => {
    core.resetDbInstance();
    fs.rmSync(DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const ids: string[] = [];
    for (let index = 0; index < 3; index++) {
      const connection = (await providersDb.createProviderConnection({
        provider: "glm",
        authType: "apikey",
        apiKey: `sk-weighted-fixture-${index}`,
        isActive: true,
        testStatus: "active",
        priority: index + 1,
      })) as { id: string };
      ids.push(connection.id);
    }

    const sequences: string[][] = [];
    for (const strategy of ["weighted", "fill-first"]) {
      // Bypass input validation: an existing database can still hold the legacy value.
      await settingsDb.updateSettings({
        fallbackStrategy: scope === "global" ? strategy : "round-robin",
        providerStrategies: scope === "provider" ? { glm: { fallbackStrategy: strategy } } : {},
      });
      const persisted = await settingsDb.getSettings();
      const providerStrategies = persisted.providerStrategies as Record<
        string,
        { fallbackStrategy: string }
      >;
      assert.equal(
        scope === "global" ? persisted.fallbackStrategy : providerStrategies.glm.fallbackStrategy,
        strategy
      );
      const selectedIds: string[] = [];
      for (let dispatch = 0; dispatch < 12; dispatch++) {
        const selected = (await getProviderCredentials("glm", null, null, "glm-4.6")) as {
          connectionId: string;
        } | null;
        assert.ok(selected);
        selectedIds.push(selected.connectionId);
      }
      const failover = (await getProviderCredentials("glm", ids[0], null, "glm-4.6")) as {
        connectionId: string;
      } | null;
      assert.equal(failover?.connectionId, ids[1], "must skip the excluded top-priority account");
      sequences.push(selectedIds);
    }
    assert.deepEqual(sequences[0], Array(12).fill(ids[0]));
    assert.deepEqual(sequences[0], sequences[1]);
  });
}
