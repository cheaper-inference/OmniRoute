import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-crud-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const combosDb = await import("../../../src/lib/db/combos.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("Kimi pricing keeps legacy models, canonical fields and pricing-layer priority", async () => {
  const db = core.getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "kimi",
    JSON.stringify({ layered: { prompt: 1, completion: 2 } })
  );
  const userPrices = {
    moonshot: {
      shared: { prompt: 10, completion: 30, nested: { legacy: true } },
      layered: { prompt: 0 },
      "moonshot/raw": { prompt: 4 },
    },
    kimi: {
      shared: { prompt: 20, cacheRead: 0, nested: { canonical: true } },
      "kimi/raw": { prompt: 5 },
    },
  };
  for (const [provider, models] of Object.entries(userPrices)) {
    db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "pricing",
      provider,
      JSON.stringify(models)
    );
  }
  for (const provider of ["kimi", "moonshot"]) {
    assert.deepEqual(await settingsDb.getPricingForModel(provider, "shared"), {
      prompt: 20,
      completion: 30,
      cacheRead: 0,
      nested: { legacy: true, canonical: true },
    });
    assert.deepEqual(await settingsDb.getPricingForModel(provider, "layered"), {
      prompt: 0,
      completion: 2,
    });
    assert.deepEqual(await settingsDb.getPricingForModel(provider, "moonshot/raw"), { prompt: 4 });
    assert.deepEqual(await settingsDb.getPricingForModel(provider, "kimi/raw"), { prompt: 5 });
  }
  const { pricing, sourceMap } = await settingsDb.getPricingWithSources();
  assert.equal(pricing.moonshot, undefined);
  assert.equal(sourceMap.kimi.layered, "user");
  const nativeRows = () =>
    db
      .prepare(
        "SELECT key,value FROM key_value WHERE namespace='pricing' AND key IN ('kimi','moonshot') ORDER BY key"
      )
      .all();
  const untouched = nativeRows();
  await settingsDb.updatePricing({ openrouter: { "moonshot/raw": { prompt: 77 } } });
  assert.deepEqual(nativeRows(), untouched);
  await settingsDb.resetPricing("kimi", "shared");
  for (const provider of ["kimi", "moonshot"]) {
    assert.equal(await settingsDb.getPricingForModel(provider, "shared"), null);
  }
  await settingsDb.resetPricing("moonshot", "kimi/raw");
  assert.equal(await settingsDb.getPricingForModel("kimi", "kimi/raw"), null);
  assert.deepEqual(await settingsDb.getPricingForModel("kimi", "moonshot/raw"), { prompt: 4 });
  await settingsDb.resetPricing("moonshot");
  assert.equal(await settingsDb.getPricingForModel("kimi", "moonshot/raw"), null);
  assert.deepEqual(await settingsDb.getPricingForModel("kimi", "layered"), {
    prompt: 1,
    completion: 2,
  });
  assert.deepEqual(await settingsDb.getPricingForModel("openrouter", "moonshot/raw"), {
    prompt: 77,
  });
});

test("either Kimi API spelling updates the canonical user price with whole-model replacement", async () => {
  const db = core.getDbInstance();
  await settingsDb.updatePricing({
    kimi: { shared: { prompt: 10, completion: 20 }, untouched: { prompt: 2 } },
  });
  await settingsDb.updatePricing({ moonshot: { shared: { prompt: 0 } } });
  for (const provider of ["kimi", "moonshot"]) {
    assert.deepEqual(await settingsDb.getPricingForModel(provider, "shared"), { prompt: 0 });
    assert.deepEqual(await settingsDb.getPricingForModel(provider, "untouched"), { prompt: 2 });
  }
  await settingsDb.updatePricing({ kimi: { shared: { prompt: 4 } } });
  assert.deepEqual(await settingsDb.getPricingForModel("moonshot", "shared"), { prompt: 4 });
  const updated = await settingsDb.updatePricing({
    kimi: { shared: { prompt: 7 } },
    moonshot: { shared: { prompt: 9, completion: 3 }, "moonshot/raw": { prompt: 5 } },
  });
  assert.deepEqual(updated.kimi.shared, { prompt: 7, completion: 3 });
  assert.deepEqual(await settingsDb.getPricingForModel("moonshot", "moonshot/raw"), { prompt: 5 });
  assert.equal(updated.moonshot, undefined);
  assert.equal(
    db.prepare("SELECT value FROM key_value WHERE namespace='pricing' AND key='moonshot'").get(),
    undefined
  );
});

for (const provider of ["moonshot", "kimi"]) {
  test("late legacy combo retains its assigned proxy for " + provider, async () => {
    const connection = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: "native proxy fixture",
      apiKey: "synthetic-proxy-key",
    });
    assert.ok(typeof connection.id === "string");
    core
      .getDbInstance()
      .prepare("UPDATE provider_connections SET proxy_enabled=1 WHERE id=?")
      .run(connection.id);
    const combo = await combosDb.createCombo({
      name: "late-legacy-combo",
      models: [{ model: "moonshot/moonshot/custom" }],
      strategy: "priority",
    });
    await settingsDb.setProxyForLevel("combo", combo.id, {
      type: "https",
      host: "native-proxy.fixture.invalid",
      port: 443,
    });
    const resolved = await settingsDb.resolveProxyForConnection(connection.id);
    assert.equal(resolved.level, "combo");
    assert.equal(resolved.levelId, combo.id);
    assert.ok(resolved.proxy);
    assert.equal(resolved.proxy.host, "native-proxy.fixture.invalid");

    const foreign = await providersDb.createProviderConnection({
      provider: "openrouter",
      authType: "apikey",
      name: "foreign proxy fixture",
      apiKey: "synthetic-foreign-key",
    });
    assert.ok(typeof foreign.id === "string");
    core
      .getDbInstance()
      .prepare("UPDATE provider_connections SET proxy_enabled=1 WHERE id=?")
      .run(foreign.id);
    const foreignCombo = await combosDb.createCombo({
      name: "foreign-wire-combo",
      models: [{ model: "openrouter/moonshot/custom" }],
      strategy: "priority",
    });
    await settingsDb.setProxyForLevel("combo", foreignCombo.id, {
      type: "https",
      host: "foreign-proxy.fixture.invalid",
      port: 443,
    });
    const foreignResult = await settingsDb.resolveProxyForConnection(foreign.id);
    assert.equal(foreignResult.levelId, foreignCombo.id);
    assert.ok(foreignResult.proxy);
    assert.equal(foreignResult.proxy.host, "foreign-proxy.fixture.invalid");
  });
}
