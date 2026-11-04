import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { FEATURE_FLAG_DEFINITIONS } from "../../../src/shared/constants/featureFlagDefinitions.ts";

test("Feature Flags - Registry length and PII_REVERSIBLE_VAULT_ENABLED definition", () => {
  assert.equal(
    FEATURE_FLAG_DEFINITIONS.length,
    117,
    "Expected exactly 117 feature flags (116 upstream tip + PII_REVERSIBLE_VAULT_ENABLED)",
  );

  const piiFlag = FEATURE_FLAG_DEFINITIONS.find(
    (f) => f.key === "PII_REVERSIBLE_VAULT_ENABLED",
  );
  assert.ok(piiFlag, "PII_REVERSIBLE_VAULT_ENABLED must be defined in registry");
  assert.equal(piiFlag.category, "security");
  assert.equal(piiFlag.defaultValue, "false");
  assert.equal(piiFlag.type, "boolean");

  const auditFlag = FEATURE_FLAG_DEFINITIONS.find(
    (f) => f.key === "API_KEY_AUDIT_CLIENT_DETAILS_ENABLED",
  );
  assert.ok(
    auditFlag,
    "API_KEY_AUDIT_CLIENT_DETAILS_ENABLED must be preserved (preventing #18017 CI regression)",
  );

  const securityFlags = FEATURE_FLAG_DEFINITIONS.filter(
    (f) => f.category === "security",
  );
  assert.equal(
    securityFlags.length,
    12,
    "Security category must contain exactly 12 flags (11 upstream + PII vault)",
  );
});

test("Feature Flags - Documentation sync with FEATURE_FLAGS.md", () => {
  const catalogPath = path.resolve(
    process.cwd(),
    "docs/reference/FEATURE_FLAGS.md",
  );
  const catalog = fs.readFileSync(catalogPath, "utf8");

  const countMatch = catalog.match(/^(\d+) flags across \d+ categories\./m);
  assert.ok(countMatch, "FEATURE_FLAGS.md must declare total count in header");
  assert.equal(
    Number(countMatch[1]),
    FEATURE_FLAG_DEFINITIONS.length,
    "Catalog total must match FEATURE_FLAG_DEFINITIONS.length",
  );

  assert.ok(
    catalog.includes("PII_REVERSIBLE_VAULT_ENABLED"),
    "FEATURE_FLAGS.md must document PII_REVERSIBLE_VAULT_ENABLED",
  );
  assert.ok(
    catalog.includes("### Security (12)"),
    "FEATURE_FLAGS.md must declare 12 security flags",
  );
});

test("Feature Flags - Documentation sync with ENVIRONMENT.md and .env.example", () => {
  const envDocPath = path.resolve(
    process.cwd(),
    "docs/reference/ENVIRONMENT.md",
  );
  const envDoc = fs.readFileSync(envDocPath, "utf8");

  assert.ok(
    envDoc.includes("PII_REVERSIBLE_VAULT_ENABLED"),
    "ENVIRONMENT.md must document PII_REVERSIBLE_VAULT_ENABLED",
  );
  assert.ok(
    envDoc.includes("PII_VAULT_TTL_MS"),
    "ENVIRONMENT.md must document PII_VAULT_TTL_MS",
  );
  assert.ok(
    envDoc.includes("PII_VAULT_MAX_ENTRIES"),
    "ENVIRONMENT.md must document PII_VAULT_MAX_ENTRIES",
  );

  const envExamplePath = path.resolve(process.cwd(), ".env.example");
  const envExample = fs.readFileSync(envExamplePath, "utf8");

  assert.ok(
    envExample.includes("PII_REVERSIBLE_VAULT_ENABLED=false"),
    ".env.example must specify default PII_REVERSIBLE_VAULT_ENABLED=false",
  );
  assert.ok(
    envExample.includes("PII_VAULT_TTL_MS=120000"),
    ".env.example must specify default PII_VAULT_TTL_MS=120000",
  );
  assert.ok(
    envExample.includes("PII_VAULT_MAX_ENTRIES=5000"),
    ".env.example must specify default PII_VAULT_MAX_ENTRIES=5000",
  );
});
