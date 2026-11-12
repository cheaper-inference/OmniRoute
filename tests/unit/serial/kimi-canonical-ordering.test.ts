import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-fallback-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const domain = await import("../../../src/lib/db/domainState.ts");
const fallback = await import("../../../src/domain/fallbackPolicy.ts");
let db: ReturnType<typeof core.getDbInstance>;
test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  db = core.getDbInstance();
  fallback.resetAllFallbacks();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
});
test.afterEach(() => {
  fallback.resetAllFallbacks();
  core.resetDbInstance();
});
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

for (const ties of [false, true]) {
  test("migrated fallback consumer preserves priority and stable ties: " + ties, () => {
    fallback.registerFallback(
      "moonshot/order",
      ties
        ? [
            { provider: "openai" },
            { provider: "openrouter", priority: 5 },
            { provider: "mistral", priority: 5 },
          ]
        : [
            { provider: "moonshot", priority: -1 },
            { provider: "openai", priority: 1 },
            { provider: "openrouter", priority: 5 },
          ]
    );
    fallback.registerFallback(
      "kimi/order",
      ties
        ? [
            { provider: "deepseek" },
            { provider: "anthropic", priority: 5 },
            { provider: "google", priority: 5 },
          ]
        : [
            { provider: "anthropic", priority: 9 },
            { provider: "kimi", priority: 4, enabled: false },
            { provider: "deepseek", priority: 3 },
          ]
    );
    // Reopen persisted writer output with an empty policy cache, as after an upgrade.
    const persisted = domain.loadAllFallbackChains();
    fallback.resetAllFallbacks();
    for (const [model, chain] of Object.entries(persisted))
      domain.saveFallbackChain(model, chain as Parameters<typeof domain.saveFallbackChain>[1]);
    runMigrations(db);
    const expected = ties
      ? ["deepseek", "openai", "anthropic", "google", "openrouter", "mistral"]
      : ["openai", "deepseek", "kimi", "openrouter", "anthropic"];
    assert.equal(fallback.getNextFallback("kimi/order"), expected[0]);
    assert.deepEqual(
      domain.loadFallbackChain("kimi/order")?.map((entry) => entry.provider),
      expected
    );
    assert.deepEqual(
      fallback
        .resolveFallbackChain("kimi/order")
        .map((entry: { provider: string }) => entry.provider),
      expected.filter((provider) => provider !== "kimi")
    );
    assert.equal(fallback.getNextFallback("kimi/order", [expected[0]]), expected[1]);
    const once = domain.loadFallbackChain("kimi/order");
    if (!ties)
      assert.deepEqual(
        once?.find((entry) => entry.provider === "kimi"),
        { provider: "kimi", priority: 4, enabled: false }
      );
    db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
    runMigrations(db);
    assert.deepEqual(domain.loadFallbackChain("kimi/order"), once);
  });
}

test("fallback migration leaves unsupported arrays and malformed collisions in their existing order/keys", () => {
  for (const [model, chain] of [
    ["moonshot/unknown", JSON.stringify([{ provider: "openai", priority: 1 }, 42])],
    ["kimi/unknown", JSON.stringify([{ provider: "anthropic", priority: 9 }, "opaque"])],
    ["moonshot/broken", "{broken"],
    ["kimi/broken", "[]"],
  ])
    db.prepare("INSERT INTO domain_fallback_chains(model,chain) VALUES(?,?)").run(model, chain);
  const rows = () =>
    db.prepare("SELECT model,chain FROM domain_fallback_chains ORDER BY model").all();
  const before = rows();
  runMigrations(db);
  assert.deepEqual(rows(), before);
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.deepEqual(rows(), before);
});

for (const legacyFirst of [false, true])
  for (const canonicalEnabled of [false, true]) {
    test(
      "single-row fallback resolves alias collision before ordering: " +
        legacyFirst +
        "/" +
        canonicalEnabled,
      () => {
        const legacy = { provider: "moonshot", priority: 1, enabled: !canonicalEnabled };
        const canonical = { provider: "kimi", priority: 2, enabled: canonicalEnabled };
        const other = { provider: "openai", priority: 3, enabled: true };
        domain.saveFallbackChain("ordinary-model", [
          ...(legacyFirst ? [legacy, canonical] : [canonical, legacy]),
          other,
        ]);
        runMigrations(db);
        assert.equal(
          fallback.getNextFallback("ordinary-model"),
          canonicalEnabled ? "kimi" : "openai"
        );
        assert.deepEqual(domain.loadFallbackChain("ordinary-model"), [canonical, other]);
        const once = db
          .prepare("SELECT chain FROM domain_fallback_chains WHERE model='ordinary-model'")
          .get()?.chain;
        db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
        runMigrations(db);
        assert.equal(
          db.prepare("SELECT chain FROM domain_fallback_chains WHERE model='ordinary-model'").get()
            ?.chain,
          once
        );
      }
    );
  }

test("single-row fallback without legacy aliases retains exact order, duplicates and bytes", () => {
  const chain = [
    { provider: "openai", priority: 9, enabled: true },
    { provider: "kimi", priority: 8, enabled: false },
    { provider: "openai", priority: 1, enabled: true },
    { provider: "anthropic", priority: 2, enabled: true },
  ];
  const raw = JSON.stringify(chain, null, 2);
  db.prepare("INSERT INTO domain_fallback_chains(model,chain) VALUES('ordinary-model',?)").run(raw);
  runMigrations(db);
  assert.equal(
    db.prepare("SELECT chain FROM domain_fallback_chains WHERE model='ordinary-model'").get()
      ?.chain,
    raw
  );
  assert.equal(fallback.getNextFallback("ordinary-model"), "openai");
  assert.deepEqual(domain.loadFallbackChain("ordinary-model"), chain);
});

test("single-row unsupported mixed fallback array stays opaque", () => {
  const raw = JSON.stringify([{ provider: "moonshot", priority: 1, enabled: true }, 42], null, 2);
  db.prepare("INSERT INTO domain_fallback_chains(model,chain) VALUES('mixed-model',?)").run(raw);
  runMigrations(db);
  assert.equal(
    db.prepare("SELECT chain FROM domain_fallback_chains WHERE model='mixed-model'").get()?.chain,
    raw
  );
});

for (const kind of ["malformed", "mixed"])
  for (const supportedLegacy of [false, true]) {
    test("rejected fallback pair retains both raw members: " + kind + "/" + supportedLegacy, () => {
      const supported = JSON.stringify(
        [
          { provider: "openai", priority: 9, enabled: true },
          { provider: "moonshot", priority: 1, enabled: true },
          { provider: "kimi", priority: 2, enabled: false },
        ],
        null,
        2
      );
      const unsupported =
        kind === "malformed"
          ? "{\n  broken"
          : JSON.stringify([{ provider: "moonshot", priority: 3, enabled: true }, 42], null, 2);
      for (const [model, chain] of [
        ["moonshot/rejected", supportedLegacy ? supported : unsupported],
        ["kimi/rejected", supportedLegacy ? unsupported : supported],
      ])
        db.prepare("INSERT INTO domain_fallback_chains(model,chain) VALUES(?,?)").run(model, chain);
      const rows = () =>
        db.prepare("SELECT model,chain FROM domain_fallback_chains ORDER BY model").all();
      const before = rows();
      runMigrations(db);
      assert.deepEqual(rows(), before);
      db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
      runMigrations(db);
      assert.deepEqual(rows(), before);
    });
  }

test("case-variant fallback model key preserves its actual writer row", () => {
  fallback.registerFallback("MOONSHOT/custom", [
    { provider: "openai", priority: 9 },
    { provider: "anthropic", priority: 1 },
  ]);
  fallback.registerFallback("moonshot/lowercase", [{ provider: "openai", priority: 2 }]);
  const persisted = domain.loadAllFallbackChains();
  fallback.resetAllFallbacks();
  for (const [model, chain] of Object.entries(persisted))
    domain.saveFallbackChain(model, chain as Parameters<typeof domain.saveFallbackChain>[1]);
  const rows = () =>
    db.prepare("SELECT model,chain FROM domain_fallback_chains ORDER BY model").all();
  const before = rows().find((row) => row.model === "MOONSHOT/custom");
  assert.ok(before);
  runMigrations(db);
  assert.deepEqual(
    rows().find((row) => row.model === "MOONSHOT/custom"),
    before
  );
  assert.equal(fallback.getNextFallback("MOONSHOT/custom"), "anthropic");
  assert.equal(fallback.getNextFallback("kimi/lowercase"), "openai");
  assert.equal(domain.loadFallbackChain("moonshot/lowercase"), null);
  const once = rows();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.deepEqual(rows(), once);
});
