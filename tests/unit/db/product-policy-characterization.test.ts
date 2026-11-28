/**
 * Characterization of the public feature-flag override and PII settings DB
 * helpers. Uses only the long-standing exports so it runs unchanged before and
 * after the repository extraction: namespaces and keys on disk, defaults and
 * fallbacks, flag-definition validation, evaluation precedence, read caches and
 * their invalidation, and model-catalog invalidation.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "product-policy-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const flags = await import("../../../src/lib/db/featureFlags.ts");
const pii = await import("../../../src/lib/db/piiSettings.ts");
const resolver = await import("../../../src/shared/utils/featureFlags.ts");

const CATALOG_FLAG = "MODEL_CATALOG_INCLUDE_NAMES";
const PLAIN_FLAG = "PII_RESPONSE_SANITIZATION";
const ENUM_FLAG = "UNPRICED_USAGE_BUDGET_POLICY";

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
  pii.clearPiiSettingsCache();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rows(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

function rawWrite(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

function catalogVersion(): number {
  return readCache.getModelCatalogCacheVersion();
}

function withEnv(key: string, value: string | undefined, fn: () => void): void {
  const previous = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env[key];
    else process.env[key] = previous;
  }
}

// ── feature flags ───────────────────────────────────────────────────────────

test("flag overrides are stored verbatim under the feature_flags namespace", () => {
  assert.deepEqual(flags.getFeatureFlagOverrides(), {});
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), undefined);

  flags.setFeatureFlagOverride(PLAIN_FLAG, " TRUE ");
  flags.setFeatureFlagOverride(CATALOG_FLAG, "false");
  assert.deepEqual(rows("feature_flags"), [
    { key: CATALOG_FLAG, value: "false" },
    { key: PLAIN_FLAG, value: " TRUE " },
  ]);
  assert.deepEqual(flags.getFeatureFlagOverrides(), {
    [CATALOG_FLAG]: "false",
    [PLAIN_FLAG]: " TRUE ",
  });
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), " TRUE ");

  flags.setFeatureFlagOverride(PLAIN_FLAG, "false");
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "false", "replaces in place");
  assert.equal(rows("feature_flags").length, 2);

  // Rows written by other tools in the namespace are listed too.
  rawWrite("feature_flags", "SOME_UNDEFINED_KEY", "x");
  assert.equal(flags.getFeatureFlagOverrides().SOME_UNDEFINED_KEY, "x");
});

test("flag writes validate keys and enum values before touching the store", () => {
  assert.throws(
    () => flags.setFeatureFlagOverride("NOT_A_REAL_FLAG", "true"),
    /Unknown feature flag key: NOT_A_REAL_FLAG/
  );
  assert.throws(
    () => flags.setFeatureFlagOverride(ENUM_FLAG, "nope"),
    /Invalid value "nope" for enum flag UNPRICED_USAGE_BUDGET_POLICY\. Allowed: /
  );
  assert.deepEqual(rows("feature_flags"), []);

  flags.setFeatureFlagOverride(ENUM_FLAG, "count_as_zero");
  assert.equal(flags.getFeatureFlagOverride(ENUM_FLAG), "count_as_zero");

  // Removal does not validate: unknown keys are a silent no-op.
  flags.removeFeatureFlagOverride("NOT_A_REAL_FLAG");
  assert.equal(rows("feature_flags").length, 1);
});

test("flag evaluation order is DB override > non-empty env > definition default", () => {
  withEnv(PLAIN_FLAG, undefined, () => {
    assert.equal(resolver.resolveFeatureFlag(PLAIN_FLAG), "false");
    assert.equal(resolver.isFeatureFlagEnabled(PLAIN_FLAG), false);
  });
  withEnv(PLAIN_FLAG, "", () => {
    assert.equal(resolver.resolveFeatureFlag(PLAIN_FLAG), "false", "empty env is ignored");
  });
  withEnv(PLAIN_FLAG, "yes", () => {
    assert.equal(resolver.resolveFeatureFlag(PLAIN_FLAG), "yes");
    assert.equal(resolver.isFeatureFlagEnabled(PLAIN_FLAG), true);

    flags.setFeatureFlagOverride(PLAIN_FLAG, "false");
    assert.equal(resolver.resolveFeatureFlag(PLAIN_FLAG), "false", "DB wins over env");
    const entry = resolver.resolveAllFeatureFlags().find((f) => f.key === PLAIN_FLAG);
    assert.equal(entry?.source, "db");

    flags.removeFeatureFlagOverride(PLAIN_FLAG);
    assert.equal(resolver.resolveFeatureFlag(PLAIN_FLAG), "yes", "env again after removal");
    const after = resolver.resolveAllFeatureFlags().find((f) => f.key === PLAIN_FLAG);
    assert.equal(after?.source, "env");
  });
});

test("flag reads are cached per key until a writer in the module invalidates", () => {
  flags.setFeatureFlagOverride(PLAIN_FLAG, "true");
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "true");

  rawWrite("feature_flags", PLAIN_FLAG, "false");
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "true", "raw edit hidden by cache");
  assert.deepEqual(
    flags.getFeatureFlagOverrides(),
    { [PLAIN_FLAG]: "false" },
    "the full listing is never cached"
  );

  flags.clearFeatureFlagOverrideCache(PLAIN_FLAG);
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "false");

  // Misses are cached too.
  assert.equal(flags.getFeatureFlagOverride(CATALOG_FLAG), undefined);
  rawWrite("feature_flags", CATALOG_FLAG, "true");
  assert.equal(flags.getFeatureFlagOverride(CATALOG_FLAG), undefined);
  flags.clearFeatureFlagOverrideCache();
  assert.equal(flags.getFeatureFlagOverride(CATALOG_FLAG), "true");

  flags.clearAllFeatureFlagOverrides();
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), undefined);
  assert.equal(flags.getFeatureFlagOverride(CATALOG_FLAG), undefined);
});

test("flag cache entries expire after the short TTL", async () => {
  flags.setFeatureFlagOverride(PLAIN_FLAG, "true");
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "true");
  rawWrite("feature_flags", PLAIN_FLAG, "false");
  await new Promise((resolve) => setTimeout(resolve, 1100));
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "false");
});

test("a reopened database starts with an empty flag cache", () => {
  flags.setFeatureFlagOverride(PLAIN_FLAG, "true");
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), "true");
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  assert.equal(flags.getFeatureFlagOverride(PLAIN_FLAG), undefined);
});

test("only catalog-relevant flag writes invalidate the model catalog", () => {
  let before = catalogVersion();
  flags.setFeatureFlagOverride(PLAIN_FLAG, "true");
  flags.removeFeatureFlagOverride(PLAIN_FLAG);
  assert.equal(catalogVersion(), before, "plain flag writes leave the catalog alone");

  flags.setFeatureFlagOverride(CATALOG_FLAG, "true");
  assert.ok(catalogVersion() > before, "catalog flag set invalidates");

  before = catalogVersion();
  flags.removeFeatureFlagOverride(CATALOG_FLAG);
  assert.ok(catalogVersion() > before, "catalog flag removal invalidates");

  before = catalogVersion();
  flags.removeFeatureFlagOverride(CATALOG_FLAG);
  assert.ok(catalogVersion() > before, "removal invalidates even when no row existed");

  before = catalogVersion();
  flags.setFeatureFlagOverride(PLAIN_FLAG, "true");
  flags.clearAllFeatureFlagOverrides();
  assert.equal(catalogVersion(), before, "clear-all without a catalog flag does not invalidate");
  assert.deepEqual(rows("feature_flags"), []);

  flags.setFeatureFlagOverride("MODELS_DEV_EFFORT_TIERS_ENABLED", "true");
  before = catalogVersion();
  flags.clearAllFeatureFlagOverrides();
  assert.ok(catalogVersion() > before, "clear-all with a catalog flag invalidates");
  assert.deepEqual(rows("feature_flags"), []);
});

// ── PII settings ────────────────────────────────────────────────────────────

test("PII settings default to every built-in type and no custom patterns", () => {
  assert.deepEqual(pii.getPiiSettings(), { enabledTypes: null, customPatterns: [] });
  assert.deepEqual(rows("pii_settings"), []);
});

test("PII settings are stored as JSON under the pii_settings namespace", () => {
  const pattern = { id: "p1", name: "Ticket", type: "regex", pattern: "T-\\d+" };
  const saved = pii.setPiiSettings({ enabledTypes: ["email"], customPatterns: [pattern] });
  assert.deepEqual(saved, { enabledTypes: ["email"], customPatterns: [pattern] });
  assert.deepEqual(rows("pii_settings"), [
    { key: "customPatterns", value: JSON.stringify([pattern]) },
    { key: "enabledTypes", value: JSON.stringify(["email"]) },
  ]);

  // Partial updates leave the other key untouched.
  assert.deepEqual(pii.setPiiSettings({ enabledTypes: [] }), {
    enabledTypes: [],
    customPatterns: [pattern],
  });
  assert.deepEqual(pii.setPiiSettings({ customPatterns: [] }), {
    enabledTypes: [],
    customPatterns: [],
  });
  assert.deepEqual(pii.setPiiSettings({}), { enabledTypes: [], customPatterns: [] });

  // null deletes the selection row (back to "all types"); the patterns row stays.
  assert.deepEqual(pii.setPiiSettings({ enabledTypes: null }), {
    enabledTypes: null,
    customPatterns: [],
  });
  assert.deepEqual(rows("pii_settings"), [{ key: "customPatterns", value: "[]" }]);
});

test("PII reads fall back on malformed rows and drop malformed entries", () => {
  rawWrite("pii_settings", "enabledTypes", "not-json");
  rawWrite("pii_settings", "customPatterns", JSON.stringify({ pattern: "x" }));
  assert.deepEqual(pii.getPiiSettings(), { enabledTypes: null, customPatterns: [] });

  pii.clearPiiSettingsCache();
  rawWrite("pii_settings", "enabledTypes", JSON.stringify(["email", 7, null, "phone"]));
  rawWrite(
    "pii_settings",
    "customPatterns",
    JSON.stringify([null, "x", { pattern: 1 }, { name: "no pattern" }, { pattern: "ok" }])
  );
  assert.deepEqual(pii.getPiiSettings(), {
    enabledTypes: ["email", "phone"],
    customPatterns: [{ pattern: "ok" }],
  });
});

test("PII reads are cached until a writer or an explicit clear invalidates", async () => {
  const first = pii.getPiiSettings();
  assert.equal(pii.getPiiSettings(), first, "the cached object is handed back");

  rawWrite("pii_settings", "enabledTypes", JSON.stringify(["email"]));
  assert.equal(pii.getPiiSettings(), first, "raw edit hidden by cache");
  pii.clearPiiSettingsCache();
  const second = pii.getPiiSettings();
  assert.notEqual(second, first);
  assert.deepEqual(second.enabledTypes, ["email"]);

  const saved = pii.setPiiSettings({ enabledTypes: ["phone"] });
  assert.equal(pii.getPiiSettings(), saved, "the write result seeds the cache");

  rawWrite("pii_settings", "enabledTypes", JSON.stringify(["iban"]));
  await new Promise((resolve) => setTimeout(resolve, 1100));
  assert.deepEqual(pii.getPiiSettings().enabledTypes, ["iban"], "the TTL expires");
});

test("a reopened database does not serve the previous PII cache", () => {
  pii.setPiiSettings({ enabledTypes: ["email"] });
  assert.deepEqual(pii.getPiiSettings().enabledTypes, ["email"]);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  assert.deepEqual(pii.getPiiSettings(), { enabledTypes: null, customPatterns: [] });
});
