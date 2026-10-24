import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-preset-characterization-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const presets = await import("../../src/lib/db/playgroundPresets.ts");
const input = {
  name: "Preset",
  endpoint: "chat.completions",
  model: "gpt-4o",
  system: "Keep me",
  params: { temperature: 0.5 },
};

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function changes(): unknown {
  return core.getDbInstance().prepare("SELECT total_changes() AS count").get();
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("list ignores offset without limit and keeps the full count under pagination", () => {
  const first = presets.createPlaygroundPreset(input);
  const second = presets.createPlaygroundPreset({ ...input, name: "Second" });
  const third = presets.createPlaygroundPreset({ ...input, name: "Third" });
  const db = core.getDbInstance();
  const setTimestamp = db.prepare("UPDATE playground_presets SET created_at = ? WHERE id = ?");
  setTimestamp.run("2026-01-01 00:00:00", first.id);
  setTimestamp.run("2026-01-02 00:00:00", second.id);
  setTimestamp.run("2026-01-03 00:00:00", third.id);

  const all = presets.listPlaygroundPresets();
  assert.deepEqual(
    all.items.map((item) => item.id),
    [third.id, second.id, first.id]
  );
  assert.deepEqual(presets.listPlaygroundPresets({ offset: 2 }), all);
  assert.deepEqual(presets.listPlaygroundPresets({ limit: 1 }), {
    items: all.items.slice(0, 1),
    total: 3,
  });
  assert.deepEqual(presets.listPlaygroundPresets({ limit: 1, offset: 1 }), {
    items: all.items.slice(1, 2),
    total: 3,
  });
  assert.deepEqual(presets.listPlaygroundPresets({ limit: 0 }), { items: [], total: 3 });
  assert.deepEqual(presets.listPlaygroundPresets({ limit: 1, offset: 99 }), {
    items: [],
    total: 3,
  });
});

test("timestamp ties retain SQLite's created_at-only ordering", () => {
  for (const name of ["Zulu", "Alpha", "Middle"]) {
    presets.createPlaygroundPreset({ ...input, name });
  }
  const db = core.getDbInstance();
  // Deliberately reverse lexical id order relative to insertion order, so adding
  // an id/name tie-breaker changes this fixture's observed order.
  db.prepare("UPDATE playground_presets SET id = ?, created_at = ? WHERE name = ?").run(
    "z",
    "2026-01-01 00:00:00",
    "Zulu"
  );
  db.prepare("UPDATE playground_presets SET id = ?, created_at = ? WHERE name = ?").run(
    "a",
    "2026-01-01 00:00:00",
    "Alpha"
  );
  db.prepare("UPDATE playground_presets SET id = ?, created_at = ? WHERE name = ?").run(
    "m",
    "2026-01-01 00:00:00",
    "Middle"
  );
  const expected = db.prepare("SELECT id FROM playground_presets ORDER BY created_at DESC").all();
  assert.deepEqual(
    presets.listPlaygroundPresets().items.map(({ id }) => ({ id })),
    expected
  );
});

test("empty, undefined-only, and missing-row patches perform no writes", () => {
  const created = presets.createPlaygroundPreset(input);
  const before = changes();
  assert.deepEqual(presets.updatePlaygroundPreset(created.id, {}), created);
  assert.deepEqual(
    presets.updatePlaygroundPreset(created.id, {
      name: undefined,
      endpoint: undefined,
      model: undefined,
      params: undefined,
    }),
    created
  );
  assert.equal(presets.updatePlaygroundPreset("missing", { name: "Ghost" }), null);
  assert.deepEqual(changes(), before);
});

test("an explicit undefined system key clears it while other undefined fields are skipped", () => {
  const created = presets.createPlaygroundPreset(input);
  const updated = presets.updatePlaygroundPreset(created.id, {
    system: undefined,
    name: undefined,
    endpoint: undefined,
    model: undefined,
    params: undefined,
  });
  assert.deepEqual(updated, { ...created, system: null });
  assert.deepEqual(presets.getPlaygroundPreset(created.id), updated);
});

test("create normalizes nullish values and returns the stored column-default timestamp", () => {
  for (const value of [undefined, null]) {
    const created = presets.createPlaygroundPreset({
      ...input,
      system: value,
      // Characterize the runtime fallback without widening the public input type.
      params: value as unknown as Record<string, unknown>,
    });
    assert.equal(created.system, null);
    assert.deepEqual(created.params, {});
    const stored = core
      .getDbInstance()
      .prepare("SELECT system, params_json, created_at FROM playground_presets WHERE id = ?")
      .get(created.id);
    assert.deepEqual(stored, { system: null, params_json: "{}", created_at: created.created_at });
    assert.match(created.created_at, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  }
});

test("row mapping rejects malformed, null, array, and primitive params in get and list", () => {
  const created = presets.createPlaygroundPreset(input);
  for (const raw of ["broken{", "null", "[]", "[1,2]", "42", "true", '"text"']) {
    core
      .getDbInstance()
      .prepare("UPDATE playground_presets SET params_json = ? WHERE id = ?")
      .run(raw, created.id);
    assert.deepEqual(presets.getPlaygroundPreset(created.id)?.params, {}, raw);
    assert.deepEqual(presets.listPlaygroundPresets().items[0].params, {}, raw);
  }
  const object = { nested: { enabled: true }, values: [1, null] };
  core
    .getDbInstance()
    .prepare("UPDATE playground_presets SET params_json = ? WHERE id = ?")
    .run(JSON.stringify(object), created.id);
  assert.deepEqual(presets.getPlaygroundPreset(created.id)?.params, object);
  assert.deepEqual(presets.listPlaygroundPresets().items[0].params, object);
});

test("the loaded facade reopens a recreated database at the same DATA_DIR", () => {
  const old = presets.createPlaygroundPreset(input);
  resetStorage();
  assert.deepEqual(presets.listPlaygroundPresets(), { items: [], total: 0 });
  assert.equal(presets.getPlaygroundPreset(old.id), null);
  const fresh = presets.createPlaygroundPreset({ ...input, name: "Fresh" });
  assert.deepEqual(presets.getPlaygroundPreset(fresh.id), fresh);
  assert.equal(presets.listPlaygroundPresets().total, 1);
});
