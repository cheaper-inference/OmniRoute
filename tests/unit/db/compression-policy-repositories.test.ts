import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "compression-policy-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { compressionRepositories } =
  await import("../../../src/lib/db/repositories/compressionRepositories.ts");
const settingsFacade = await import("../../../src/lib/db/compression.ts");
const combosFacade = await import("../../../src/lib/db/compressionCombos.ts");

const { settings, combos } = compressionRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function combo(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    name: id,
    description: "",
    pipeline: [{ engine: "lite" as const }],
    languagePacks: ["en"],
    outputMode: false,
    outputModeIntensity: "full",
    outputStyles: [],
    isDefault: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

test("facades hand out the composition-root repositories", () => {
  assert.equal(settingsFacade.getCompressionSettingsRepository(), settings);
  assert.equal(combosFacade.getCompressionComboRepository(), combos);
});

test("settings repository: rows are stored and returned untouched", async () => {
  assert.equal(await promised(settings.get("missing")), undefined);
  await promised(
    settings.write([
      { key: "a", value: '"x"' },
      { key: "b", value: "{broken" },
    ])
  );
  assert.equal(await settings.get("a"), '"x"');
  assert.equal(await settings.get("b"), "{broken");
  const rows = await promised(settings.list());
  assert.deepEqual(
    rows.filter((row) => row.key === "a" || row.key === "b"),
    [
      { key: "a", value: '"x"' },
      { key: "b", value: "{broken" },
    ]
  );
});

test("settings repository: function writes see the row stored before the write", async () => {
  const seen: unknown[] = [];
  await settings.write([{ key: "m", value: "1" }]);
  await settings.write([
    { key: "m", value: (stored) => (seen.push(stored), `${stored}+2`) },
    { key: "n", value: (stored) => (seen.push(stored), "fresh") },
  ]);
  assert.deepEqual(seen, ["1", undefined]);
  assert.equal(await settings.get("m"), "1+2");
  assert.equal(await settings.get("n"), "fresh");
});

test("settings repository: a throwing write rolls the whole batch back", async () => {
  await settings.write([{ key: "keep", value: "old" }]);
  await assert.rejects(
    settings.write([
      { key: "keep", value: "new" },
      {
        key: "boom",
        value: () => {
          throw new Error("boom");
        },
      },
    ]),
    /boom/
  );
  assert.equal(await settings.get("keep"), "old");
  assert.equal(await settings.get("boom"), undefined);
});

test("combo repository: seeded default, ordering and read normalization", async () => {
  const seeded = await promised(combos.list());
  assert.deepEqual(
    seeded.map((row) => row.id),
    ["default-caveman"]
  );
  assert.equal((await promised(combos.findDefault()))?.id, "default-caveman");
  await promised(combos.insert(combo("zeta")));
  await combos.insert(
    combo("Alpha", { pipeline: [{ engine: "lite" }, { engine: "nope" }], languagePacks: [] })
  );
  assert.deepEqual(
    (await combos.list()).map((row) => row.id),
    ["default-caveman", "Alpha", "zeta"]
  );
  const alpha = await promised(combos.findById("Alpha"));
  assert.deepEqual(alpha?.pipeline, [{ engine: "lite" }]);
  assert.deepEqual(alpha?.languagePacks, ["en"]);
  assert.equal(await combos.findById("missing"), null);
});

test("combo repository: default flag is exclusive on insert, update and setDefault", async () => {
  await combos.insert(combo("a", { isDefault: true }));
  assert.equal((await combos.findById("default-caveman"))?.isDefault, false);
  await promised(combos.setDefault("default-caveman", "2026-02-01T00:00:00.000Z"));
  assert.equal((await combos.findDefault())?.id, "default-caveman");
  assert.equal((await combos.findById("a"))?.isDefault, false);
  await promised(combos.update(combo("a", { isDefault: true, name: "renamed" })));
  const a = await combos.findById("a");
  assert.equal(a?.isDefault, true);
  assert.equal(a?.name, "renamed");
  assert.equal((await combos.findById("default-caveman"))?.isDefault, false);
});

test("combo repository: updatePipeline stores an empty pipeline as empty", async () => {
  await combos.insert(combo("p"));
  await promised(combos.updatePipeline("p", [], "2026-03-01T00:00:00.000Z"));
  const p = await combos.findById("p");
  assert.deepEqual(p?.pipeline, []);
  assert.equal(p?.updatedAt, "2026-03-01T00:00:00.000Z");
});

test("combo repository: assignments, replacement and delete", async () => {
  await combos.insert(combo("a"));
  await combos.insert(combo("b"));
  await promised(combos.assign("a", "r1"));
  await combos.assign("b", "r1");
  assert.equal((await promised(combos.findForRoutingCombo("r1")))?.id, "b");
  assert.deepEqual(await promised(combos.listAssignments("a")), []);

  await promised(combos.replaceAssignments("a", ["r2", "r1"]));
  assert.deepEqual(
    (await combos.listAssignments("a")).map((row) => row.routingComboId),
    ["r1", "r2"]
  );
  assert.deepEqual(await combos.listAssignments("b"), []);

  assert.equal(await promised(combos.deleteById("b")), true);
  assert.equal(await combos.deleteById("b"), false);
  assert.equal(await combos.findById("b"), null);
});
