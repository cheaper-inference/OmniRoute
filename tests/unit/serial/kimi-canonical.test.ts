import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-canonical-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const { REGISTRY, getRegistryEntry } = await import("../../../open-sse/config/providerRegistry.ts");
const { resolveProviderAlias } = await import("../../../open-sse/services/providerAlias.ts");
const { resolveProviderId } = await import("../../../src/shared/constants/providers.ts");
const { modelPatternMatches } = await import("../../../src/domain/modelPermissions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("Kimi has one API registration and both resolver families retain Moonshot", () => {
  assert.equal(Object.keys(REGISTRY).filter((id) => id === "kimi" || id === "moonshot").length, 1);
  assert.equal(getRegistryEntry("moonshot")?.id, "kimi");
  assert.equal(resolveProviderAlias("moonshot"), "kimi");
  assert.equal(resolveProviderId("moonshot"), "kimi");
});

test("old-prefix patterns match canonical requests in both directions", () => {
  for (const pattern of ["moonshot/*", "moonshot/kimi-k3", "moonshot/kimi-*"]) {
    assert.equal(modelPatternMatches(pattern, ["kimi/kimi-k3"]), true);
  }
  assert.equal(modelPatternMatches("kimi/*", ["moonshot/kimi-k3"]), true);
  assert.equal(modelPatternMatches("kimi/*", ["kimi-coding/kimi-k3"]), false);
});

test("the actual runner consolidates a both-populated provider database", () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE name = ?").run("canonical_kimi_provider");
  for (const provider of ["moonshot", "kimi"]) {
    db.prepare(
      "INSERT INTO provider_connections (id, provider, api_key, provider_specific_data, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(
      provider + "-connection",
      provider,
      "fixture-" + provider,
      JSON.stringify({ baseUrl: "https://api.moonshot.cn/v1", label: "moonshot/preserve" }),
      "2026-01-01",
      "2026-01-01"
    );
  }
  runMigrations(db);
  const rows = db
    .prepare<{ id: string; provider: string }>(
      "SELECT id, provider FROM provider_connections ORDER BY id"
    )
    .all();
  assert.deepEqual(rows, [
    { id: "kimi-connection", provider: "kimi" },
    { id: "moonshot-connection", provider: "kimi" },
  ]);
});
