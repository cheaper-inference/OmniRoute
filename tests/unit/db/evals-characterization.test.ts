/**
 * Characterization — src/lib/db/evals.ts (eval suites, cases and run history).
 *
 * Pins the observable behaviour of the synchronous exports so moving the SQL
 * behind a repository can be shown not to change it: stored columns, decoding
 * fallbacks for odd rows, list ordering/filters/limits, the routing query, the
 * scorecard, suite validation and its all-or-nothing write, and the late-column
 * repair of an older eval_suites/eval_cases table. Quirks are pinned, not fixed.
 * Every test here passes on the code before the move and after it.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-evals-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const evalsDb = await import("../../../src/lib/db/evals.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

type Row = Record<string, unknown>;

function db() {
  return core.getDbInstance() as unknown as {
    prepare: (sql: string) => {
      all: (...p: unknown[]) => Row[];
      get: (...p: unknown[]) => Row | undefined;
      run: (...p: unknown[]) => { changes: number };
    };
    exec: (sql: string) => void;
  };
}

const SUMMARY = { total: 4, passed: 3, failed: 1, passRate: 75 };

function run(overrides: Record<string, unknown> = {}) {
  return evalsDb.saveEvalRun({
    suiteId: "golden-set",
    suiteName: "Golden",
    target: { type: "model", id: "m-a", label: "Model A" },
    summary: SUMMARY,
    results: [{ caseId: "c1", passed: true }],
    ...overrides,
  } as Parameters<typeof evalsDb.saveEvalRun>[0]);
}

function insertRawRun(values: Row) {
  const row: Row = {
    id: "raw",
    run_group_id: null,
    suite_id: "s",
    suite_name: "S",
    target_type: "model",
    target_id: "m",
    target_label: "L",
    api_key_id: null,
    pass_rate: 0,
    total: 0,
    passed: 0,
    failed: 0,
    avg_latency_ms: 0,
    summary_json: "{}",
    results_json: "[]",
    outputs_json: null,
    created_at: "2026-01-01T00:00:00.000Z",
    ...values,
  };
  const cols = Object.keys(row);
  db()
    .prepare(
      `INSERT INTO eval_runs (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`
    )
    .run(...cols.map((c) => row[c]));
}

const CASE = {
  name: "says hi",
  input: { messages: [{ role: "user", content: "hi" }] },
  expected: { strategy: "contains" as const, value: "hello" },
};

// ─── exports stay synchronous ───────────────────────────────────────────────

test("base exports are present and synchronous", () => {
  for (const name of [
    "deleteCustomEvalSuite",
    "getCustomEvalSuite",
    "getEvalScorecard",
    "listCustomEvalSuites",
    "listEvalRuns",
    "listModelEvalRunsForRouting",
    "saveCustomEvalSuite",
    "saveEvalRun",
    "serializeEvalTargetKey",
  ]) {
    assert.equal(typeof (evalsDb as Record<string, unknown>)[name], "function", name);
  }
  const saved = run();
  assert.ok(!(saved instanceof Promise));
  assert.ok(Array.isArray(evalsDb.listEvalRuns()));
  assert.ok(Array.isArray(evalsDb.listCustomEvalSuites()));
  assert.ok(Array.isArray(evalsDb.listModelEvalRunsForRouting({ targetIds: ["m-a"] })));
  assert.equal(evalsDb.getCustomEvalSuite("nope"), null);
  assert.equal(evalsDb.deleteCustomEvalSuite("nope"), false);
});

test("serializeEvalTargetKey trims ids and maps blank/missing to __default__", () => {
  assert.equal(evalsDb.serializeEvalTargetKey("model", "  m-a "), "model:m-a");
  assert.equal(evalsDb.serializeEvalTargetKey("combo", "   "), "combo:__default__");
  assert.equal(evalsDb.serializeEvalTargetKey("suite-default", null), "suite-default:__default__");
  assert.equal(evalsDb.serializeEvalTargetKey("model"), "model:__default__");
});

// ─── saveEvalRun ─────────────────────────────────────────────────────────────

test("saveEvalRun returns the normalized run and stores every column", () => {
  const saved = run({
    runGroupId: "grp",
    target: { type: "model", id: "  m-a  ", label: "Model A" },
    apiKeyId: "key-1",
    avgLatencyMs: 12.6,
    outputs: { c1: "out" },
    createdAt: "2026-03-01T00:00:00.000Z",
  });
  assert.match(saved.id, /^[0-9a-f-]{36}$/);
  assert.deepEqual(
    { ...saved, id: "<id>" },
    {
      id: "<id>",
      runGroupId: "grp",
      suiteId: "golden-set",
      suiteName: "Golden",
      target: { type: "model", id: "m-a", key: "model:m-a", label: "Model A" },
      apiKeyId: "key-1",
      avgLatencyMs: 13,
      summary: SUMMARY,
      results: [{ caseId: "c1", passed: true }],
      outputs: { c1: "out" },
      createdAt: "2026-03-01T00:00:00.000Z",
    }
  );
  const row = db().prepare("SELECT * FROM eval_runs WHERE id = ?").get(saved.id);
  assert.deepEqual(row, {
    id: saved.id,
    run_group_id: "grp",
    suite_id: "golden-set",
    suite_name: "Golden",
    target_type: "model",
    target_id: "m-a",
    target_label: "Model A",
    api_key_id: "key-1",
    pass_rate: 75,
    total: 4,
    passed: 3,
    failed: 1,
    avg_latency_ms: 13,
    summary_json: JSON.stringify(SUMMARY),
    results_json: JSON.stringify([{ caseId: "c1", passed: true }]),
    outputs_json: JSON.stringify({ c1: "out" }),
    created_at: "2026-03-01T00:00:00.000Z",
  });
});

test("saveEvalRun defaults: empty group/key to null, blank target id to null, bad latency to 0", () => {
  const before = Date.now();
  const saved = run({
    runGroupId: "",
    apiKeyId: "",
    target: { type: "combo", id: "   ", label: "Combo" },
    avgLatencyMs: Number.NaN,
    outputs: undefined,
  });
  assert.equal(saved.runGroupId, null);
  assert.equal(saved.apiKeyId, null);
  assert.deepEqual(saved.target, {
    type: "combo",
    id: null,
    key: "combo:__default__",
    label: "Combo",
  });
  assert.equal(saved.avgLatencyMs, 0);
  assert.deepEqual(saved.outputs, {});
  assert.ok(Date.parse(saved.createdAt) >= before - 1000);
  const row = db().prepare("SELECT * FROM eval_runs WHERE id = ?").get(saved.id)!;
  assert.equal(row.run_group_id, null);
  assert.equal(row.target_id, null);
  assert.equal(row.outputs_json, "{}");
  assert.equal(run({ avgLatencyMs: -40 }).avgLatencyMs, 0);
});

test("characterization: saveEvalRun returns the label as given while the target id is trimmed", () => {
  const saved = run({ target: { type: "model", id: " m ", label: "  Spaced  " } });
  assert.equal(saved.target.label, "  Spaced  ");
  // Read back, the label is trimmed by the decoder.
  assert.equal(evalsDb.listEvalRuns()[0].target.label, "Spaced");
});

// ─── listEvalRuns ────────────────────────────────────────────────────────────

test("listEvalRuns orders newest first and filters by suite and run group", () => {
  run({ suiteId: "a", runGroupId: "g1", createdAt: "2026-01-01T00:00:00.000Z" });
  run({ suiteId: "a", runGroupId: "g2", createdAt: "2026-01-03T00:00:00.000Z" });
  run({ suiteId: "b", runGroupId: "g1", createdAt: "2026-01-02T00:00:00.000Z" });
  assert.deepEqual(
    evalsDb.listEvalRuns().map((r) => [r.suiteId, r.runGroupId]),
    [
      ["a", "g2"],
      ["b", "g1"],
      ["a", "g1"],
    ]
  );
  assert.deepEqual(
    evalsDb.listEvalRuns({ suiteId: "a" }).map((r) => r.runGroupId),
    ["g2", "g1"]
  );
  assert.deepEqual(
    evalsDb.listEvalRuns({ runGroupId: "g1" }).map((r) => r.suiteId),
    ["b", "a"]
  );
  assert.deepEqual(evalsDb.listEvalRuns({ suiteId: "a", runGroupId: "g1" }).length, 1);
  // Empty strings are not filters.
  assert.equal(evalsDb.listEvalRuns({ suiteId: "", runGroupId: "" }).length, 3);
});

test("listEvalRuns limit: default 20, clamped to 1..200, fractions floored", () => {
  for (let i = 0; i < 205; i++) {
    insertRawRun({
      id: `r${i}`,
      created_at: `2026-01-01T00:00:${String(i % 60).padStart(2, "0")}.${String(i).padStart(3, "0")}Z`,
    });
  }
  assert.equal(evalsDb.listEvalRuns().length, 20);
  assert.equal(evalsDb.listEvalRuns({ limit: 0 }).length, 1);
  assert.equal(evalsDb.listEvalRuns({ limit: -5 }).length, 1);
  assert.equal(evalsDb.listEvalRuns({ limit: 3.9 }).length, 3);
  assert.equal(evalsDb.listEvalRuns({ limit: 999 }).length, 200);
  assert.equal(evalsDb.listEvalRuns({ limit: Number.NaN }).length, 20);
});

test("run decoding falls back for odd rows", () => {
  insertRawRun({
    id: "odd",
    run_group_id: "   ",
    target_type: "weird",
    target_id: "  ",
    target_label: "   ",
    api_key_id: "  ",
    pass_rate: 50,
    total: 2,
    passed: 1,
    failed: 1,
    avg_latency_ms: 7,
    summary_json: "not json",
    results_json: JSON.stringify([{ a: 1 }, 5, null, [1], { b: 2 }]),
    outputs_json: JSON.stringify({ x: 1, y: null, z: "s" }),
  });
  const [r] = evalsDb.listEvalRuns();
  assert.deepEqual(r, {
    id: "odd",
    runGroupId: null,
    suiteId: "s",
    suiteName: "S",
    target: {
      type: "suite-default",
      id: null,
      key: "suite-default:__default__",
      label: "Suite defaults",
    },
    apiKeyId: null,
    avgLatencyMs: 7,
    summary: { total: 2, passed: 1, failed: 1, passRate: 50 },
    results: [{ a: 1 }, { b: 2 }],
    outputs: { x: "1", y: "", z: "s" },
    createdAt: "2026-01-01T00:00:00.000Z",
  });
});

test("run decoding: default labels per target type and partial summary JSON", () => {
  insertRawRun({
    id: "m",
    target_type: "model",
    target_id: null,
    target_label: "",
    created_at: "2026-01-03",
  });
  insertRawRun({
    id: "c",
    target_type: "combo",
    target_id: "cx",
    target_label: " ",
    created_at: "2026-01-02",
  });
  insertRawRun({
    id: "p",
    target_type: "combo",
    target_id: null,
    target_label: "",
    total: 9,
    passed: 8,
    summary_json: JSON.stringify({ total: 3, passRate: "66" }),
    results_json: "{}",
    outputs_json: "[1,2]",
    created_at: "2026-01-01",
  });
  const runs = evalsDb.listEvalRuns();
  assert.deepEqual(
    runs.map((r) => r.target.label),
    ["Model: Unknown", "Combo: cx", "Combo: Unknown"]
  );
  const partial = runs[2];
  assert.deepEqual(partial.summary, { total: 3, passed: 8, failed: 0, passRate: 66 });
  assert.deepEqual(partial.results, []);
  // A JSON array in outputs_json is not a record.
  assert.deepEqual(partial.outputs, {});
});

test("characterization: run decoding keeps padded text as stored (only blank group/key become null)", () => {
  insertRawRun({
    id: " pad ",
    run_group_id: " g ",
    suite_id: " s ",
    suite_name: " S ",
    api_key_id: " k ",
    created_at: " 2026-01-01 ",
  });
  const [r] = evalsDb.listEvalRuns();
  assert.equal(r.id, " pad ");
  assert.equal(r.runGroupId, " g ");
  assert.equal(r.suiteId, " s ");
  assert.equal(r.suiteName, " S ");
  assert.equal(r.apiKeyId, " k ");
  assert.equal(r.createdAt, " 2026-01-01 ");
});

// ─── listModelEvalRunsForRouting ─────────────────────────────────────────────

test("routing query: empty or blank target ids return [] without reading", () => {
  run();
  assert.deepEqual(evalsDb.listModelEvalRunsForRouting({ targetIds: [] }), []);
  assert.deepEqual(evalsDb.listModelEvalRunsForRouting({ targetIds: ["  ", ""] }), []);
});

test("routing query: model runs only, trimmed/deduped targets, suite filter, newest first", () => {
  run({
    target: { type: "model", id: "m-a", label: "A" },
    suiteId: "s1",
    createdAt: "2026-01-01T00:00:00.000Z",
  });
  run({
    target: { type: "model", id: "m-b", label: "B" },
    suiteId: "s2",
    createdAt: "2026-01-02T00:00:00.000Z",
  });
  run({
    target: { type: "combo", id: "m-a", label: "C" },
    suiteId: "s1",
    createdAt: "2026-01-03T00:00:00.000Z",
  });
  run({
    target: { type: "model", id: "m-c", label: "X" },
    suiteId: "s1",
    createdAt: "2026-01-04T00:00:00.000Z",
  });
  const got = evalsDb.listModelEvalRunsForRouting({ targetIds: [" m-a ", "m-b", "m-a"] });
  assert.deepEqual(
    got.map((r) => r.target.label),
    ["B", "A"]
  );
  const s1 = evalsDb.listModelEvalRunsForRouting({
    targetIds: ["m-a", "m-b"],
    suiteIds: [" s1 ", ""],
  });
  assert.deepEqual(
    s1.map((r) => r.target.label),
    ["A"]
  );
  const blankSuites = evalsDb.listModelEvalRunsForRouting({
    targetIds: ["m-a", "m-b"],
    suiteIds: ["  "],
  });
  assert.equal(blankSuites.length, 2);
});

test("routing query: maxAgeHours cuts off older runs; non-positive ignores age", () => {
  const now = Date.now();
  run({
    target: { type: "model", id: "m", label: "fresh" },
    createdAt: new Date(now - 30 * 60 * 1000).toISOString(),
  });
  run({
    target: { type: "model", id: "m", label: "stale" },
    createdAt: new Date(now - 5 * 3600 * 1000).toISOString(),
  });
  assert.deepEqual(
    evalsDb
      .listModelEvalRunsForRouting({ targetIds: ["m"], maxAgeHours: 1 })
      .map((r) => r.target.label),
    ["fresh"]
  );
  assert.equal(evalsDb.listModelEvalRunsForRouting({ targetIds: ["m"], maxAgeHours: 0 }).length, 2);
  assert.equal(
    evalsDb.listModelEvalRunsForRouting({ targetIds: ["m"], maxAgeHours: -1 }).length,
    2
  );
});

test("routing query limit: explicit clamp 1..1000, default min 50 scaled by targets and suites", () => {
  for (let i = 0; i < 130; i++) {
    insertRawRun({
      id: `r${i}`,
      target_type: "model",
      target_id: i % 2 ? "m1" : "m2",
      suite_id: "s1",
      created_at: `2026-01-01T00:${String(Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}Z`,
    });
  }
  assert.equal(evalsDb.listModelEvalRunsForRouting({ targetIds: ["m1"] }).length, 50);
  // 2 targets × max(3, 5) × 2 = 20 → raised to the floor of 50.
  assert.equal(evalsDb.listModelEvalRunsForRouting({ targetIds: ["m1", "m2"] }).length, 50);
  // 2 targets × 1 suite → max(3, 1)=3 → 12 → 50; explicit limits are honoured.
  assert.equal(
    evalsDb.listModelEvalRunsForRouting({ targetIds: ["m1", "m2"], suiteIds: ["s1"] }).length,
    50
  );
  assert.equal(
    evalsDb.listModelEvalRunsForRouting({ targetIds: ["m1", "m2"], limit: 0 }).length,
    1
  );
  assert.equal(
    evalsDb.listModelEvalRunsForRouting({ targetIds: ["m1", "m2"], limit: 7.8 }).length,
    7
  );
  assert.equal(
    evalsDb.listModelEvalRunsForRouting({ targetIds: ["m1", "m2"], limit: 5000 }).length,
    130
  );
  const many = Array.from({ length: 12 }, (_, i) => (i === 0 ? "m1" : i === 1 ? "m2" : `x${i}`));
  // Duplicated ids are collapsed before sizing the default limit.
  assert.equal(evalsDb.listModelEvalRunsForRouting({ targetIds: Array(13).fill("m1") }).length, 50);
  // 12 targets × 5 × 2 = 120 rows cap.
  assert.equal(evalsDb.listModelEvalRunsForRouting({ targetIds: many }).length, 120);
});

// ─── getEvalScorecard ────────────────────────────────────────────────────────

test("getEvalScorecard: null when empty; latest run per suite+target; suite filter", () => {
  assert.equal(evalsDb.getEvalScorecard(), null);
  run({
    suiteId: "a",
    suiteName: "A",
    target: { type: "model", id: "m", label: "M" },
    summary: { total: 2, passed: 0, failed: 2, passRate: 0 },
    createdAt: "2026-01-01",
  });
  run({
    suiteId: "a",
    suiteName: "A",
    target: { type: "model", id: "m", label: "M" },
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
    createdAt: "2026-01-02",
  });
  run({
    suiteId: "a",
    suiteName: "A",
    target: { type: "combo", id: "c", label: "C" },
    summary: { total: 3, passed: 1, failed: 2, passRate: 33 },
    createdAt: "2026-01-03",
  });
  run({
    suiteId: "b",
    suiteName: "B",
    target: { type: "model", id: "m", label: "M" },
    summary: { total: 1, passed: 1, failed: 0, passRate: 100 },
    createdAt: "2026-01-04",
  });
  assert.deepEqual(evalsDb.getEvalScorecard(), {
    suites: 3,
    totalCases: 6,
    totalPassed: 4,
    overallPassRate: 67,
    perSuite: [
      { id: "b:model:m", name: "B · M", passRate: 100 },
      { id: "a:combo:c", name: "A · C", passRate: 33 },
      { id: "a:model:m", name: "A · M", passRate: 100 },
    ],
  });
  assert.deepEqual(
    evalsDb.getEvalScorecard({ suiteId: "b" })?.perSuite.map((s) => s.id),
    ["b:model:m"]
  );
  // limit only looks at the newest N runs.
  assert.deepEqual(evalsDb.getEvalScorecard({ limit: 1 })?.suites, 1);
});

test("getEvalScorecard looks at the newest 50 runs by default", () => {
  for (let i = 0; i < 60; i++) {
    insertRawRun({
      id: `r${i}`,
      suite_id: `s${i}`,
      created_at: `2026-01-01T00:00:${String(i).padStart(2, "0")}Z`,
    });
  }
  const card = evalsDb.getEvalScorecard();
  assert.equal(card?.suites, 50);
  assert.equal(card?.perSuite[0].id, "s59:model:m");
});

test("getEvalScorecard: zero cases gives a 0% overall rate", () => {
  run({ summary: { total: 0, passed: 0, failed: 0, passRate: 0 } });
  assert.equal(evalsDb.getEvalScorecard()?.overallPassRate, 0);
});

// ─── custom suites ───────────────────────────────────────────────────────────

test("saveCustomEvalSuite creates a suite with sanitized cases in order", () => {
  const suite = evalsDb.saveCustomEvalSuite({
    id: "  suite-1 ",
    name: "  My Suite ",
    description: "  desc ",
    cases: [
      {
        id: " k1 ",
        name: " first ",
        model: "  gpt ",
        input: {
          messages: [
            { role: " user ", content: "hi" },
            { role: "", content: "dropped" },
            { role: "user", content: "   " },
            "junk" as unknown as { role: string; content: string },
          ],
          max_tokens: 12.7,
        },
        expected: { strategy: "exact", value: "hello" },
        tags: [" a ", "", "b"],
      },
      {
        name: "second",
        model: "   ",
        input: { messages: [{ role: "user", content: "x" }], max_tokens: -3 },
        expected: { strategy: "custom" },
      },
      {
        name: "third",
        input: { messages: [{ role: "user", content: "y" }] },
        expected: { strategy: "bogus" as "contains", value: "v" },
      },
    ],
  });
  assert.equal(suite.id, "suite-1");
  assert.equal(suite.name, "My Suite");
  assert.equal(suite.description, "desc");
  assert.equal(suite.source, "custom");
  assert.equal(suite.caseCount, 3);
  assert.equal(suite.createdAt, suite.updatedAt);
  const [c1, c2, c3] = suite.cases;
  assert.deepEqual(
    { ...c1, createdAt: "", updatedAt: "" },
    {
      id: "k1",
      suiteId: "suite-1",
      name: "first",
      model: "gpt",
      input: { messages: [{ role: "user", content: "hi" }], max_tokens: 12 },
      expected: { strategy: "exact", value: "hello" },
      tags: ["a", "b"],
      sortOrder: 0,
      createdAt: "",
      updatedAt: "",
    }
  );
  assert.match(c2.id, /^[0-9a-f-]{36}$/);
  assert.equal("model" in c2, false);
  assert.deepEqual(c2.input, { messages: [{ role: "user", content: "x" }] });
  assert.deepEqual(c2.expected, { strategy: "custom" });
  assert.deepEqual(c2.tags, []);
  assert.equal(c2.sortOrder, 1);
  assert.deepEqual(c3.expected, { strategy: "contains", value: "v" });
  const rawCase = db().prepare("SELECT * FROM eval_cases WHERE id = 'k1'").get()!;
  assert.equal(rawCase.model, "gpt");
  assert.equal(
    rawCase.input_json,
    JSON.stringify({ messages: [{ role: "user", content: "hi" }], max_tokens: 12 })
  );
  assert.equal(rawCase.tags_json, JSON.stringify(["a", "b"]));
  assert.equal(rawCase.expected_value, "hello");
  const rawCustom = db().prepare("SELECT * FROM eval_cases WHERE sort_order = 1").get()!;
  assert.equal(rawCustom.expected_value, null);
  assert.equal(rawCustom.model, null);
});

test("saveCustomEvalSuite update keeps created_at, replaces every case and clears a blank description", async () => {
  const created = evalsDb.saveCustomEvalSuite({
    id: "s",
    name: "S",
    description: "d",
    cases: [CASE, { ...CASE, id: "old", name: "old" }],
  });
  await new Promise((r) => setTimeout(r, 5));
  const updated = evalsDb.saveCustomEvalSuite({
    id: "s",
    name: "S2",
    description: "   ",
    cases: [{ ...CASE, name: "new" }],
  });
  assert.equal(updated.createdAt, created.createdAt);
  assert.ok(updated.updatedAt > created.updatedAt);
  assert.equal(updated.name, "S2");
  assert.equal("description" in updated, false);
  assert.deepEqual(
    updated.cases.map((c) => c.name),
    ["new"]
  );
  assert.equal(db().prepare("SELECT COUNT(*) AS n FROM eval_cases").get()!.n, 1);
  assert.equal(db().prepare("SELECT description FROM eval_suites").get()!.description, null);
});

test("saveCustomEvalSuite validation errors write nothing and keep the previous suite", () => {
  const before = evalsDb.saveCustomEvalSuite({ id: "keep", name: "Keep", cases: [CASE] });
  const bad: Array<[Record<string, unknown>, string]> = [
    [{ name: "  ", cases: [CASE] }, "Suite name is required"],
    [{ name: "x", cases: [] }, "At least one eval case is required"],
    [{ name: "x", cases: "nope" }, "At least one eval case is required"],
    [{ name: "x", cases: [CASE, { ...CASE, name: " " }] }, "Case 2 is missing a name"],
    [
      { name: "x", cases: [{ ...CASE, input: { messages: [] } }] },
      "Case 1 must include at least one message",
    ],
    [
      { name: "x", cases: [{ ...CASE, expected: { strategy: "regex", value: "  " } }] },
      "Case 1 must include an expected value",
    ],
  ];
  for (const [input, message] of bad) {
    assert.throws(() => evalsDb.saveCustomEvalSuite({ id: "keep", ...input } as never), {
      message,
    });
  }
  assert.deepEqual(evalsDb.getCustomEvalSuite("keep"), before);
  assert.equal(db().prepare("SELECT COUNT(*) AS n FROM eval_suites").get()!.n, 1);
});

test("characterization: a case id reused by another suite fails the save and rolls it back", () => {
  evalsDb.saveCustomEvalSuite({ id: "one", name: "One", cases: [{ ...CASE, id: "shared" }] });
  assert.throws(() =>
    evalsDb.saveCustomEvalSuite({ id: "two", name: "Two", cases: [{ ...CASE, id: "shared" }] })
  );
  assert.equal(evalsDb.getCustomEvalSuite("two"), null);
  assert.equal(evalsDb.getCustomEvalSuite("one")?.cases[0].id, "shared");
});

test("listCustomEvalSuites orders by updated_at then created_at, cases by sort order then id", () => {
  const d = db();
  evalsDb.listCustomEvalSuites(); // ensure tables
  d.prepare(
    "INSERT INTO eval_suites (id, name, description, created_at, updated_at) VALUES (?,?,?,?,?)"
  ).run("old", "Old", "", "2026-01-01", "2026-01-01");
  d.prepare(
    "INSERT INTO eval_suites (id, name, description, created_at, updated_at) VALUES (?,?,?,?,?)"
  ).run("tie-a", "TA", null, "2026-01-01", "2026-02-01");
  d.prepare(
    "INSERT INTO eval_suites (id, name, description, created_at, updated_at) VALUES (?,?,?,?,?)"
  ).run("tie-b", "TB", "x", "2026-01-05", "2026-02-01");
  const ins = d.prepare(
    "INSERT INTO eval_cases (id, suite_id, sort_order, name, model, input_json, expected_strategy, expected_value, tags_json, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
  );
  ins.run(
    "z",
    "old",
    1,
    "Z",
    null,
    '{"messages":[{"role":"user","content":"q"}]}',
    "regex",
    "v",
    '["t"]',
    "2026-01-01",
    "2026-01-01"
  );
  ins.run(
    "b",
    "old",
    0,
    "B",
    " m ",
    "not json",
    "exact",
    "   ",
    "nope",
    "2026-01-02",
    "2026-01-02"
  );
  ins.run("a", "old", 0, "A", null, "{}", "weird", null, null, "2026-01-02", "2026-01-02");
  ins.run("orphan", "ghost", 0, "O", null, "{}", "contains", "v", null, "2026-01-01", "2026-01-01");
  const suites = evalsDb.listCustomEvalSuites();
  assert.deepEqual(
    suites.map((s) => s.id),
    ["tie-b", "tie-a", "old"]
  );
  assert.equal("description" in suites[2], false);
  assert.deepEqual(
    suites[2].cases.map((c) => c.id),
    ["a", "b", "z"]
  );
  const [a, b, z] = suites[2].cases;
  assert.deepEqual(a.expected, { strategy: "contains" });
  assert.deepEqual(a.input, { messages: [] });
  assert.equal(b.model, "m");
  assert.deepEqual(b.expected, { strategy: "exact" });
  assert.deepEqual(b.tags, []);
  assert.deepEqual(z.tags, ["t"]);
  assert.deepEqual(z.input, { messages: [{ role: "user", content: "q" }] });
  assert.equal(
    suites.every((s) => s.caseCount === s.cases.length),
    true
  );
});

test("getCustomEvalSuite trims the id; blank id returns null", () => {
  evalsDb.saveCustomEvalSuite({ id: "g", name: "G", cases: [CASE] });
  assert.equal(evalsDb.getCustomEvalSuite("  g  ")?.id, "g");
  assert.equal(evalsDb.getCustomEvalSuite("   "), null);
});

test("deleteCustomEvalSuite removes the suite and its cases; blank or unknown id is false", () => {
  evalsDb.saveCustomEvalSuite({ id: "del", name: "Del", cases: [CASE, { ...CASE, name: "2" }] });
  evalsDb.saveCustomEvalSuite({ id: "stay", name: "Stay", cases: [CASE] });
  assert.equal(evalsDb.deleteCustomEvalSuite("  "), false);
  assert.equal(evalsDb.deleteCustomEvalSuite(" del "), true);
  assert.equal(evalsDb.deleteCustomEvalSuite("del"), false);
  assert.equal(
    db().prepare("SELECT COUNT(*) AS n FROM eval_cases WHERE suite_id = 'del'").get()!.n,
    0
  );
  assert.equal(evalsDb.getCustomEvalSuite("stay")?.caseCount, 1);
});

test("characterization: deleting orphan cases of a missing suite still returns false", () => {
  evalsDb.listCustomEvalSuites();
  db()
    .prepare(
      "INSERT INTO eval_cases (id, suite_id, name, input_json, expected_strategy, created_at, updated_at) VALUES ('o','ghost','O','{}','contains','x','x')"
    )
    .run();
  assert.equal(evalsDb.deleteCustomEvalSuite("ghost"), false);
  assert.equal(db().prepare("SELECT COUNT(*) AS n FROM eval_cases").get()!.n, 0);
});

test("suite access repairs an older eval_suites/eval_cases table missing late columns", () => {
  const d = db();
  d.exec("DROP TABLE IF EXISTS eval_cases");
  d.exec("DROP TABLE IF EXISTS eval_suites");
  d.exec("CREATE TABLE eval_suites (id TEXT PRIMARY KEY, name TEXT NOT NULL)");
  d.exec(
    "CREATE TABLE eval_cases (id TEXT PRIMARY KEY, suite_id TEXT NOT NULL, name TEXT NOT NULL)"
  );
  d.exec("INSERT INTO eval_suites (id, name) VALUES ('legacy', 'Legacy')");
  d.exec("INSERT INTO eval_cases (id, suite_id, name) VALUES ('lc', 'legacy', 'LC')");
  const suites = evalsDb.listCustomEvalSuites();
  assert.deepEqual(suites, [
    {
      id: "legacy",
      name: "Legacy",
      source: "custom",
      caseCount: 1,
      cases: [
        {
          id: "lc",
          suiteId: "legacy",
          name: "LC",
          input: { messages: [] },
          expected: { strategy: "contains" },
          tags: [],
          sortOrder: 0,
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const suiteCols = d
    .prepare("PRAGMA table_info(eval_suites)")
    .all()
    .map((r) => r.name);
  const caseCols = d
    .prepare("PRAGMA table_info(eval_cases)")
    .all()
    .map((r) => r.name);
  assert.deepEqual(suiteCols, ["id", "name", "description", "created_at", "updated_at"]);
  assert.deepEqual(caseCols, [
    "id",
    "suite_id",
    "name",
    "sort_order",
    "model",
    "input_json",
    "expected_strategy",
    "expected_value",
    "tags_json",
    "created_at",
    "updated_at",
  ]);
  const idx = d
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'index' AND name IN ('idx_eval_suites_updated_at','idx_eval_cases_suite_order') ORDER BY name"
    )
    .all()
    .map((r) => r.name);
  assert.deepEqual(idx, ["idx_eval_cases_suite_order", "idx_eval_suites_updated_at"]);
});

test("delete and save also repair a missing suite table before writing", () => {
  const d = db();
  d.exec("DROP TABLE IF EXISTS eval_cases");
  d.exec("DROP TABLE IF EXISTS eval_suites");
  assert.equal(evalsDb.deleteCustomEvalSuite("x"), false);
  d.exec("DROP TABLE IF EXISTS eval_cases");
  d.exec("DROP TABLE IF EXISTS eval_suites");
  assert.equal(evalsDb.saveCustomEvalSuite({ id: "n", name: "N", cases: [CASE] }).caseCount, 1);
});
