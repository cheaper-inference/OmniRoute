import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-wildcard-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const combos = await import("../../src/lib/db/combos.ts");
const models = await import("../../src/lib/db/models.ts");
const { expandProviderWildcardsInCombo } =
  await import("../../open-sse/services/combo/providerWildcard.ts");

let db: ReturnType<typeof core.getDbInstance>;
test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
});
test.afterEach(() => core.resetDbInstance());
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

async function seedCatalog(provider: string) {
  const id = provider + ":account";
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO provider_connections(id,provider,is_active,synced_models_at,created_at,updated_at) VALUES(?,?,1,?,?,?)"
  ).run(id, provider, now, now, now);
  await models.replaceSyncedAvailableModelsForConnection(provider, id, [
    { id: "moonshot/custom" },
    { id: "kimi/custom" },
  ]);
  return id;
}

for (const provider of ["moonshot", "openrouter"]) {
  test(
    "migrated structured wildcard preserves wire pattern and pinned accounts: " + provider,
    async () => {
      const connectionId = await seedCatalog(provider);
      const allowedConnectionIds = [connectionId, "kimi:account"];
      await combos.createCombo({
        name: "wire-wildcard",
        models: [
          {
            kind: "provider-wildcard",
            providerId: provider,
            modelPattern: "moonshot/*",
            connectionId,
            allowedConnectionIds,
            weight: 37,
            label: "wire pattern",
          },
        ],
      });
      runMigrations(db);
      const combo = await combos.getComboByName("wire-wildcard");
      assert.ok(combo);
      const canonical = provider === "moonshot" ? "kimi" : provider;
      const expanded = await expandProviderWildcardsInCombo(combo);
      assert.deepEqual(
        expanded.models.map((step) => (step as Record<string, unknown>).model),
        [canonical + "/moonshot/custom"]
      );
      const stored = (combo.models as Record<string, unknown>[])[0];
      assert.equal(stored.providerId, canonical);
      assert.equal(stored.modelPattern, "moonshot/*");
      for (const step of [stored, ...(expanded.models as Record<string, unknown>[])]) {
        assert.equal(step.connectionId, connectionId);
        assert.deepEqual(step.allowedConnectionIds, allowedConnectionIds);
        assert.equal(step.weight, 37);
        assert.equal(step.label, "wire pattern");
      }
      const once = db.prepare("SELECT data FROM combos WHERE name='wire-wildcard'").get()?.data;
      db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
      runMigrations(db);
      assert.equal(
        db.prepare("SELECT data FROM combos WHERE name='wire-wildcard'").get()?.data,
        once
      );
    }
  );
}

test("legacy string wildcard changes only its outer local provider prefix", async () => {
  await seedCatalog("moonshot");
  db.prepare(
    "INSERT INTO combos(id,name,data,created_at,updated_at) VALUES('legacy','legacy',?,'old','old')"
  ).run(JSON.stringify({ name: "legacy", models: ["moonshot/moonshot/*"] }));
  runMigrations(db);
  const raw = JSON.parse(
    String(db.prepare("SELECT data FROM combos WHERE id='legacy'").get()?.data)
  );
  assert.deepEqual(raw.models, ["kimi/moonshot/*"]);
  const combo = await combos.getComboByName("legacy");
  assert.ok(combo);
  const expanded = await expandProviderWildcardsInCombo(combo);
  assert.deepEqual(
    expanded.models.map((step) => (step as Record<string, unknown>).model),
    ["kimi/moonshot/custom"]
  );
});
