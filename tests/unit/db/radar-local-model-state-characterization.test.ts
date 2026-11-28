/**
 * Characterization of the synchronous Radar local model state facade.
 *
 * Pins the validation, merge and row-lifecycle semantics of
 * `src/lib/db/radar.ts` so moving persistence behind a repository cannot
 * change what the management route or the catalog merge observe.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-local-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const radar = await import("../../../src/lib/db/radar.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy Radar helpers must stay synchronous");
  return value;
}

function rawRows(): unknown[] {
  return core
    .getDbInstance()
    .prepare(
      "SELECT provider, model_id, display_name, enabled, tombstoned FROM radar_local_model_state " +
        "ORDER BY provider, model_id"
    )
    .all();
}

test("rejects invalid identities without writing", () => {
  const longModel = "m".repeat(201);
  const cases: Array<[unknown, unknown]> = [
    ["", "model"],
    ["   ", "model"],
    ["-groq", "model"],
    ["bad provider", "model"],
    ["p".repeat(101), "model"],
    [42, "model"],
    ["groq", ""],
    ["groq", "   "],
    ["groq", longModel],
    ["groq", "line\nbreak"],
    ["groq", "del\u007f"],
    ["groq", null],
  ];
  for (const [provider, modelId] of cases) {
    assert.equal(
      synchronous(radar.setRadarLocalModelOverride(provider, modelId, { enabled: true })),
      false
    );
    assert.equal(synchronous(radar.setRadarModelTombstone(provider, modelId, true)), false);
    assert.equal(synchronous(radar.clearRadarLocalModelOverride(provider, modelId)), false);
  }
  assert.deepEqual(rawRows(), []);
});

test("accepts boundary identities and trims both parts", () => {
  const provider = `a${"b".repeat(99)}`;
  const modelId = ` ${"m".repeat(200)} `;
  assert.equal(radar.setRadarLocalModelOverride(` ${provider} `, modelId, { enabled: true }), true);
  assert.equal(radar.setRadarModelTombstone("Open.Router_x-1", "org/model:free", true), true);
  assert.deepEqual(
    radar.listRadarLocalModelState().map((state) => [state.provider, state.modelId]),
    [
      ["Open.Router_x-1", "org/model:free"],
      [provider, "m".repeat(200)],
    ]
  );
});

test("rejects malformed override patches without writing", () => {
  const patches: unknown[] = [
    null,
    undefined,
    "displayName",
    {},
    { other: true },
    { enabled: true, extra: 1 },
    { enabled: "true" },
    { enabled: 0 },
    { displayName: 42 },
    { displayName: "" },
    { displayName: "   " },
    { displayName: "x".repeat(161) },
    { displayName: "tab\there" },
    { displayName: undefined },
  ];
  for (const patch of patches) {
    assert.equal(
      radar.setRadarLocalModelOverride(
        "groq",
        "model",
        patch as Parameters<typeof radar.setRadarLocalModelOverride>[2]
      ),
      false,
      `patch ${JSON.stringify(patch)} must be rejected`
    );
  }
  assert.deepEqual(rawRows(), []);
});

test("display names are trimmed and the 160-character boundary is accepted", () => {
  assert.equal(
    radar.setRadarLocalModelOverride("groq", "model", { displayName: ` ${"x".repeat(160)} ` }),
    true
  );
  assert.equal(radar.listRadarLocalModelState()[0].displayName, "x".repeat(160));
});

test("tombstone writes require a boolean flag", () => {
  for (const flag of ["true", 1, null, undefined]) {
    assert.equal(radar.setRadarModelTombstone("groq", "model", flag as boolean), false);
  }
  assert.deepEqual(rawRows(), []);
});

test("override writes keep the tombstone and tombstone writes keep the overrides", () => {
  assert.equal(radar.setRadarModelTombstone("groq", "model", true), true);
  assert.equal(
    radar.setRadarLocalModelOverride("groq", "model", { displayName: "Name", enabled: false }),
    true
  );
  assert.deepEqual(rawRows(), [
    { provider: "groq", model_id: "model", display_name: "Name", enabled: 0, tombstoned: 1 },
  ]);

  assert.equal(radar.setRadarModelTombstone("groq", "model", false), true);
  assert.deepEqual(rawRows(), [
    { provider: "groq", model_id: "model", display_name: "Name", enabled: 0, tombstoned: 0 },
  ]);

  assert.equal(radar.setRadarLocalModelOverride("groq", "model", { enabled: null }), true);
  assert.equal(radar.setRadarLocalModelOverride("groq", "model", { displayName: null }), true);
  assert.deepEqual(rawRows(), [], "clearing the last field deletes the row");
});

test("enabled=true and enabled=false persist as 1 and 0; null clears", () => {
  assert.equal(radar.setRadarLocalModelOverride("groq", "a", { enabled: true }), true);
  assert.equal(radar.setRadarLocalModelOverride("groq", "b", { enabled: false }), true);
  assert.deepEqual(
    radar.listRadarLocalModelState().map((state) => state.enabled),
    [true, false]
  );
  assert.equal(radar.setRadarLocalModelOverride("groq", "a", { enabled: null }), true);
  assert.deepEqual(
    radar.listRadarLocalModelState().map((state) => state.modelId),
    ["b"]
  );
});

test("clearing or restoring a missing row succeeds and leaves no row", () => {
  assert.equal(radar.clearRadarLocalModelOverride("groq", "missing"), true);
  assert.equal(radar.setRadarModelTombstone("groq", "missing", false), true);
  assert.deepEqual(rawRows(), []);
});

test("list is ordered by provider then model id with mapped fields", () => {
  radar.setRadarLocalModelOverride("zeta", "b", { displayName: "Z" });
  radar.setRadarModelTombstone("alpha", "z", true);
  radar.setRadarLocalModelOverride("alpha", "a", { enabled: true });

  const states = synchronous(radar.listRadarLocalModelState());
  assert.deepEqual(
    states.map(({ updatedAt, ...rest }) => {
      assert.match(updatedAt, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
      return rest;
    }),
    [
      {
        provider: "alpha",
        modelId: "a",
        displayName: null,
        enabled: true,
        tombstoned: false,
      },
      {
        provider: "alpha",
        modelId: "z",
        displayName: null,
        enabled: null,
        tombstoned: true,
      },
      {
        provider: "zeta",
        modelId: "b",
        displayName: "Z",
        enabled: null,
        tombstoned: false,
      },
    ]
  );
});

test("merge state keys by provider:modelId and omits null fields", () => {
  radar.setRadarLocalModelOverride("groq", "named", { displayName: "Named" });
  radar.setRadarLocalModelOverride("groq", "off", { enabled: false });
  radar.setRadarLocalModelOverride("groq", "both", { displayName: "Both", enabled: true });
  radar.setRadarModelTombstone("groq", "both", true);
  radar.setRadarModelTombstone("groq", "hidden", true);

  const merge = synchronous(radar.getRadarLocalMergeState());
  assert.deepEqual(
    [...merge.localOverrides],
    [
      ["groq:both", { displayName: "Both", enabled: true }],
      ["groq:named", { displayName: "Named" }],
      ["groq:off", { enabled: false }],
    ]
  );
  assert.deepEqual([...merge.tombstones], ["groq:both", "groq:hidden"]);
  assert.ok(merge.localOverrides instanceof Map);
  assert.ok(merge.tombstones instanceof Set);
});

test("empty storage yields empty list and empty merge state", () => {
  assert.deepEqual(radar.listRadarLocalModelState(), []);
  const merge = radar.getRadarLocalMergeState();
  assert.equal(merge.localOverrides.size, 0);
  assert.equal(merge.tombstones.size, 0);
});

test("operations resolve the database at call time after a reset", async () => {
  radar.setRadarLocalModelOverride("groq", "model", { displayName: "Before" });
  await resetStorage();
  assert.deepEqual(radar.listRadarLocalModelState(), []);
  assert.equal(radar.setRadarLocalModelOverride("groq", "model", { displayName: "After" }), true);
  assert.equal(radar.listRadarLocalModelState()[0].displayName, "After");
});

test("local model state writes do not touch Radar caches or settings", () => {
  radar.setRadarCache({ version: "v1", tier: "free", payload: "{}", signature: "sig" });
  radar.setRadarOptIn(true);
  const before = { cache: radar.getRadarCache(), settings: radar.getRadarSettings() };

  radar.setRadarLocalModelOverride("groq", "model", { displayName: "Name" });
  radar.setRadarModelTombstone("groq", "model", true);
  radar.clearRadarLocalModelOverride("groq", "model");

  assert.deepEqual(radar.getRadarCache(), before.cache);
  assert.deepEqual(radar.getRadarSettings(), before.settings);
});
