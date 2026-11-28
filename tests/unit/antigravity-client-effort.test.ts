import assert from "node:assert/strict";
import test from "node:test";
import * as antigravity from "../../open-sse/config/antigravityClientEffort.ts";

const rows = [
  { id: "claude-opus-5-5-high" },
  { id: "claude-opus-5-5-low" },
  { id: "gemini-4-hydrogen-xhigh" },
  { id: "gemini-4-hydrogen-high" },
  { id: "gemini-4-argon-medium" },
  { id: "gemini-4-argon-low" },
];

test("optional catalog entries are unsuffixed, preserve native tiers, and stay off by default", () => {
  assert.deepEqual(antigravity.withAntigravityClientEffortModels(rows, false), rows);
  const expanded = antigravity.withAntigravityClientEffortModels(rows, true);
  assert.deepEqual(expanded.slice(0, rows.length), rows);
  assert.equal(expanded.find(({ id }) => id === "claude-opus-5-5")?.name, "Opus 5.5");
  assert.equal(expanded.find(({ id }) => id === "gemini-4-hydrogen")?.name, "Gemini 4 Hydrogen");
});

test("only an enabled unsuffixed id follows the Claude Code effort", () => {
  const body = { output_config: { effort: "low" } };
  assert.equal(
    antigravity.selectAntigravityClientEffortModel("claude-opus-5-5", body, rows, false),
    null
  );
  assert.equal(
    antigravity.selectAntigravityClientEffortModel("claude-opus-5-5-high", body, rows, true),
    null
  );
  assert.deepEqual(
    antigravity.selectAntigravityClientEffortModel("claude-opus-5-5", body, rows, true),
    {
      model: "claude-opus-5-5-low",
    }
  );
});

test("omitting effort preserves supported defaults; explicit unknown tiers are not guessed", () => {
  assert.deepEqual(
    antigravity.selectAntigravityClientEffortModel("gemini-4-argon", {}, rows, true),
    {
      model: "gemini-4-argon-medium",
    }
  );
  const body = { output_config: { effort: "xhigh" } };
  assert.deepEqual(
    antigravity.selectAntigravityClientEffortModel("gemini-4-hydrogen", body, rows, true),
    {
      model: "gemini-4-hydrogen-xhigh",
    }
  );
  assert.deepEqual(
    antigravity.selectAntigravityClientEffortModel("claude-opus-5-5", body, rows, true),
    {
      error: "unsupported_reasoning_effort",
    }
  );
  assert.deepEqual(
    antigravity.selectAntigravityClientEffortModel(
      "gemini-4-hydrogen",
      body,
      [{ id: "gemini-4-hydrogen-high" }],
      true
    ),
    {
      error: "unsupported_reasoning_effort",
    }
  );
});

test("disabled, synthetic, and unrelated catalog rows cannot prove eligible native tiers", () => {
  const input = [
    { id: "claude-opus-5-5-high", supportedInApi: false },
    { id: "claude-opus-5-5-medium", catalogOrigin: "registry" },
    { id: "not-antigravity-high" },
  ];
  assert.deepEqual(antigravity.withAntigravityClientEffortModels(input, true), input);
});

test("an existing provider or operator row with the bare id is left alone", () => {
  const input = [...rows, { id: "claude-opus-5-5", name: "My Opus" }];
  assert.equal(
    antigravity
      .withAntigravityClientEffortModels(input, true)
      .filter(({ id }) => id === "claude-opus-5-5").length,
    1
  );
  assert.equal(
    antigravity.selectAntigravityClientEffortModel("claude-opus-5-5", {}, input, true),
    null
  );
});

test("only eligible accounts that advertise the exact selected tier survive", () => {
  assert.deepEqual(
    antigravity.planAntigravityClientEffortRoute(
      "claude-opus-5-5",
      { output_config: { effort: "low" } },
      [
        { connectionId: "one", models: [{ id: "claude-opus-5-5-high" }] },
        { connectionId: "two", models: [{ id: "claude-opus-5-5-low" }] },
        { connectionId: "three", models: [{ id: "claude-opus-5-5-low", visibility: "hide" }] },
        { connectionId: "outside", models: [{ id: "claude-opus-5-5-low" }] },
      ],
      ["one", "two", "three"],
      true
    ),
    { model: "claude-opus-5-5-low", connectionIds: ["two"] }
  );
});

test("an unavailable explicit tier never falls back to another account or tier", () => {
  assert.deepEqual(
    antigravity.planAntigravityClientEffortRoute(
      "gemini-4-hydrogen",
      { output_config: { effort: "xhigh" } },
      [
        { connectionId: "pinned", models: [{ id: "gemini-4-hydrogen-high" }] },
        { connectionId: "outside", models: [{ id: "gemini-4-hydrogen-xhigh" }] },
      ],
      ["pinned"],
      true
    ),
    { error: "unsupported_reasoning_effort" }
  );
});
