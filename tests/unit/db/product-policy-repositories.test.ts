import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "product-policy-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { productPolicyRepositories } =
  await import("../../../src/lib/db/repositories/productPolicyRepositories.ts");
const flagFacade = await import("../../../src/lib/db/featureFlags.ts");
const piiFacade = await import("../../../src/lib/db/piiSettings.ts");

const { featureFlagOverrides, piiSettings } = productPolicyRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  piiFacade.clearPiiSettingsCache();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function rows(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

test("facades hand out the composition-root repositories", () => {
  assert.equal(flagFacade.getFeatureFlagOverrideRepository(), featureFlagOverrides);
  assert.equal(piiFacade.getPiiSettingsRepository(), piiSettings);
});

test("feature flag repository: Promise CRUD over the feature_flags namespace", async () => {
  assert.deepEqual(await promised(featureFlagOverrides.list()), {});
  assert.equal(await promised(featureFlagOverrides.find("A")), undefined);
  assert.equal(await promised(featureFlagOverrides.hasAny([])), false);
  assert.equal(await promised(featureFlagOverrides.hasAny(["A"])), false);

  // The repository stores values verbatim and does not validate flag keys;
  // definition and enum validation stay in the facade.
  assert.equal(await promised(featureFlagOverrides.set("A", " raw ")), undefined);
  await featureFlagOverrides.set("B", "2");
  await featureFlagOverrides.set("A", "1");
  assert.deepEqual(rows("feature_flags"), [
    { key: "A", value: "1" },
    { key: "B", value: "2" },
  ]);
  assert.deepEqual(await featureFlagOverrides.list(), { A: "1", B: "2" });
  assert.equal(await featureFlagOverrides.find("A"), "1");
  assert.equal(await featureFlagOverrides.hasAny(["X", "B"]), true);
  assert.equal(await featureFlagOverrides.hasAny(["X", "Y", "Z", "W"]), false);

  assert.equal(await promised(featureFlagOverrides.remove("A")), undefined);
  await featureFlagOverrides.remove("missing");
  assert.deepEqual(await featureFlagOverrides.list(), { B: "2" });

  assert.equal(await promised(featureFlagOverrides.clear()), undefined);
  assert.deepEqual(rows("feature_flags"), []);
});

test("feature flag repository leaves other namespaces alone", async () => {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('settings', 'A', 'keep')")
    .run();
  await featureFlagOverrides.set("A", "1");
  await featureFlagOverrides.clear();
  assert.deepEqual(
    rows("settings").find((row) => row.key === "A"),
    { key: "A", value: "keep" }
  );
  assert.equal(await featureFlagOverrides.find("A"), undefined);
});

test("feature flag repository never touches the facade cache or the catalog", async () => {
  const flag = "MODEL_CATALOG_INCLUDE_NAMES";
  assert.equal(flagFacade.getFeatureFlagOverride(flag), undefined);
  const version = readCache.getModelCatalogCacheVersion();

  await featureFlagOverrides.set(flag, "true");
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
  assert.equal(flagFacade.getFeatureFlagOverride(flag), undefined, "facade cache still serves");
  flagFacade.clearFeatureFlagOverrideCache(flag);
  assert.equal(flagFacade.getFeatureFlagOverride(flag), "true");

  await featureFlagOverrides.clear();
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("PII settings repository: Promise get/update over the pii_settings namespace", async () => {
  assert.deepEqual(await promised(piiSettings.get()), { enabledTypes: null, customPatterns: [] });

  const pattern = { id: "p", name: "P", type: "wildcard" as const, pattern: "id-*" };
  assert.equal(
    await promised(piiSettings.update({ enabledTypes: ["email"], customPatterns: [pattern] })),
    undefined
  );
  assert.deepEqual(rows("pii_settings"), [
    { key: "customPatterns", value: JSON.stringify([pattern]) },
    { key: "enabledTypes", value: JSON.stringify(["email"]) },
  ]);
  assert.deepEqual(await piiSettings.get(), {
    enabledTypes: ["email"],
    customPatterns: [pattern],
  });

  await piiSettings.update({ customPatterns: [] });
  assert.deepEqual(await piiSettings.get(), { enabledTypes: ["email"], customPatterns: [] });

  await piiSettings.update({ enabledTypes: null });
  assert.deepEqual(rows("pii_settings"), [{ key: "customPatterns", value: "[]" }]);
  assert.deepEqual(await piiSettings.get(), { enabledTypes: null, customPatterns: [] });
});

test("PII settings repository returns independent values and leaves the facade cache alone", async () => {
  const a = await piiSettings.get();
  const b = await piiSettings.get();
  assert.notEqual(a, b, "each read decodes a fresh object");

  assert.deepEqual(piiFacade.getPiiSettings().enabledTypes, null);
  await piiSettings.update({ enabledTypes: ["phone"] });
  assert.deepEqual(piiFacade.getPiiSettings().enabledTypes, null, "facade cache still serves");
  piiFacade.clearPiiSettingsCache();
  assert.deepEqual(piiFacade.getPiiSettings().enabledTypes, ["phone"]);
});

// core.ts reaches the flag facade through the shared flag resolver, so these
// modules sit in one import cycle. Each must load first in a fresh process
// without touching a binding of the cycle before it has initialized.
test("every product-policy module loads first in a fresh process", () => {
  const entries = [
    "src/lib/db/repositories/productPolicyRepositories.ts",
    "src/lib/db/repositories/sqliteFeatureFlagOverrideRepository.ts",
    "src/lib/db/repositories/sqlitePiiSettingsRepository.ts",
    "src/lib/db/featureFlags.ts",
    "src/lib/db/piiSettings.ts",
  ];
  for (const entry of entries) {
    const probeDir = fs.mkdtempSync(path.join(os.tmpdir(), "product-policy-import-"));
    try {
      const child = spawnSync(
        process.execPath,
        [
          "--import",
          "tsx/esm",
          "--input-type=module",
          "-e",
          `await import(${JSON.stringify(`./${entry}`)}); console.log("LOADED");`,
        ],
        {
          cwd: process.cwd(),
          env: { ...process.env, DATA_DIR: probeDir, DISABLE_SQLITE_AUTO_BACKUP: "true" },
          encoding: "utf8",
          timeout: 120_000,
        }
      );
      assert.equal(child.status, 0, `${entry}\n${child.stdout}\n${child.stderr}`);
      assert.match(child.stdout, /LOADED/, entry);
    } finally {
      fs.rmSync(probeDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
});
