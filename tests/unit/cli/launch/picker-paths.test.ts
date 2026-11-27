import { test } from "node:test";
import assert from "node:assert/strict";

import { pickModel, suggestIds } from "../../../../bin/cli/launch/core/picker.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";

type ErrLike = { code?: string; message?: string; hint?: string };
type SelectorRequest = { tool: string; rows: { id: string; label: string }[]; defaultId?: string };

const view = fixtureCtx().view;
const emptyView = { ...view, rows: [] };
const withAuto = fixtureCtx({
  rows: [...fixtureCtx().view.rows, { id: "auto/best-coding", capabilities: [], kind: "auto" }],
}).view;
const base = { tool: "t", modelPolicy: "optional" as const, view };

test("modelPolicy none: no model, and --model is a usage error", async () => {
  assert.deepEqual(await pickModel({ ...base, modelPolicy: "none" }), {
    model: undefined,
    source: "none",
  });
  await assert.rejects(
    pickModel({ ...base, modelPolicy: "none", flagModel: "openai/gpt-5.2" }),
    (e: ErrLike) => e.code === "UsageError" && e.message === "t does not take a model; drop --model"
  );
});

test("flag not in view and nothing close: hint points at `omniroute models`", async () => {
  await assert.rejects(
    pickModel({ ...base, flagModel: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz/qqqqqqqqqqqqqqqqqqqq" }),
    (e: ErrLike) =>
      e.code === "ModelNotFound" &&
      e.hint === "list models with `omniroute models`" &&
      /\(6 models\)/.test(e.message)
  );
});

test("saved default beats last; unusable saved falls back to last; auto row is the fallback", async () => {
  const saved = await pickModel({ ...base, savedDefault: "fastest", lastModel: "openai/gpt-5.2" });
  assert.deepEqual([saved.model.id, saved.source], ["fastest", "default"]);
  const last = await pickModel({ ...base, savedDefault: "gone/x", lastModel: "openai/gpt-5.2" });
  assert.deepEqual([last.model.id, last.source], ["openai/gpt-5.2", "last"]);
  const auto = await pickModel({ ...base, view: withAuto });
  assert.deepEqual([auto.model.id, auto.source], ["auto/best-coding", "auto"]);
  const first = await pickModel(base);
  assert.equal(first.source, "first");
  assert.equal(first.model.id, view.rows[0].id);
});

test("picker: defaultId is the saved default under --pick, else the fallback", async () => {
  const seen: SelectorRequest[] = [];
  const selector = async (req: SelectorRequest) => {
    seen.push(req);
    return "openai/gpt-5.2";
  };
  const picked = await pickModel({
    ...base,
    interactive: true,
    forcePick: true,
    savedDefault: "fastest",
    selector,
  });
  assert.deepEqual([picked.model.id, picked.source], ["openai/gpt-5.2", "picker"]);
  assert.equal(seen[0].defaultId, "fastest");
  assert.equal(seen[0].tool, "t");
  assert.ok(seen[0].rows.every((row) => typeof row.label === "string"));
  await pickModel({ ...base, view: withAuto, interactive: true, selector });
  assert.equal(seen[1].defaultId, "auto/best-coding");
});

test("picker: unknown choice throws, cancel falls back, no candidates skips the picker", async () => {
  await assert.rejects(
    pickModel({ ...base, interactive: true, selector: async () => "nope/x" }),
    (e: ErrLike) =>
      e.code === "ModelNotFound" && e.message === "model nope/x is not in the t launch view"
  );
  const cancelled = await pickModel({ ...base, interactive: true, selector: async () => null });
  assert.equal(cancelled.source, "first");
  let called = false;
  const none = await pickModel({
    ...base,
    view: emptyView,
    interactive: true,
    selector: async () => {
      called = true;
      return null;
    },
  });
  assert.equal(called, false);
  assert.deepEqual(none, { model: undefined, source: "none" });
  const notInteractive = await pickModel({ ...base, selector: async () => "openai/gpt-5.2" });
  assert.equal(notInteractive.source, "first");
});

test("required policy with an empty view: ModelRequired with a --model hint", async () => {
  await assert.rejects(
    pickModel({ ...base, modelPolicy: "required", view: emptyView }),
    (e: ErrLike) =>
      e.code === "ModelRequired" &&
      e.message === "t needs a model and none is available" &&
      e.hint === "pass --model <id>"
  );
});

test("suggestIds ranks by edit distance after substring hits", () => {
  const ids = ["openai/gpt-5.2", "openai/gpt-4o", "anthropic/claude", "x/abc"];
  assert.deepEqual(suggestIds("gpt-5.3", ids), ["openai/gpt-5.2", "openai/gpt-4o"]);
  assert.deepEqual(suggestIds("ab", ids, 1), ["x/abc"]);
  assert.deepEqual(suggestIds("kitten", ["a/sitting"]), ["a/sitting"]);
});
