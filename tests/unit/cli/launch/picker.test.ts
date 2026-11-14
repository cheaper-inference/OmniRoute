import { test } from "node:test";
import assert from "node:assert/strict";

import { pickModel, suggestIds } from "../../../../bin/cli/launch/core/picker.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";
import type { LaunchModelRow } from "../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };
type SelectorRequest = { rows: LaunchModelRow[] };

const view = fixtureCtx().view;
const withAuto = fixtureCtx({
  rows: [...fixtureCtx().view.rows, { id: "auto/best-coding", capabilities: [], kind: "auto" }],
}).view;
const base = { tool: "t", modelPolicy: "optional" as const, view };

test("flag wins; not in view -> ModelNotFound with suggestions; below min context -> ModelUnsuitable", async () => {
  assert.equal(
    (await pickModel({ ...base, flagModel: "openai/gpt-5.2", savedDefault: "fastest" })).model.id,
    "openai/gpt-5.2"
  );
  await assert.rejects(
    pickModel({ ...base, flagModel: "openai/gpt-5.3" }),
    (e: ErrLike) => e.code === "ModelNotFound" && /openai\/gpt-5\.2/.test(e.hint)
  );
  await assert.rejects(
    pickModel({ ...base, flagModel: "small/ctx-32k", minContextTokens: 64000 }),
    (e: ErrLike) => e.code === "ModelUnsuitable"
  );
});

test("saved default > last launch > picker > auto/best-coding > first row", async () => {
  assert.deepEqual(
    (await pickModel({ ...base, savedDefault: "fastest", lastModel: "openai/gpt-5.2" })).source,
    "default"
  );
  assert.equal(
    (await pickModel({ ...base, savedDefault: "gone", lastModel: "openai/gpt-5.2" })).model.id,
    "openai/gpt-5.2"
  );
  let asked: SelectorRequest | undefined;
  const selector = async (req: SelectorRequest) => ((asked = req), "fastest");
  const picked = await pickModel({ ...base, interactive: true, selector });
  assert.equal(picked.model.id, "fastest");
  assert.equal(picked.source, "picker");
  assert.equal(asked!.rows.length, view.rows.length);
  assert.equal((await pickModel({ ...base, view: withAuto })).model.id, "auto/best-coding");
  assert.equal((await pickModel(base)).model.id, view.rows[0].id);
  assert.equal((await pickModel(base)).source, "first");
});

test("--pick opens the picker despite a saved default; no TTY / --yes never prompts", async () => {
  const selector = async () => "openai/gpt-5.2";
  assert.equal(
    (
      await pickModel({
        ...base,
        savedDefault: "fastest",
        forcePick: true,
        interactive: true,
        selector,
      })
    ).model.id,
    "openai/gpt-5.2"
  );
  const never = async () => assert.fail("must not prompt");
  assert.equal((await pickModel({ ...base, interactive: false, selector: never })).source, "first");
});

test("picker hides rows below minContextTokens; none policy; required with an empty view", async () => {
  let rows: LaunchModelRow[] = [];
  await pickModel({
    ...base,
    minContextTokens: 100000,
    interactive: true,
    selector: async (r: SelectorRequest) => ((rows = r.rows), null),
  });
  assert.ok(rows.every((r) => r.contextTokens === undefined || r.contextTokens >= 100000));
  assert.ok(!rows.some((r) => r.id === "small/ctx-32k"));
  assert.equal((await pickModel({ ...base, modelPolicy: "none" })).model, undefined);
  await assert.rejects(
    pickModel({ ...base, modelPolicy: "none", flagModel: "x" }),
    (e: ErrLike) => e.code === "UsageError"
  );
  const empty = fixtureCtx({ rows: [] }).view;
  await assert.rejects(
    pickModel({ ...base, view: empty, modelPolicy: "required" }),
    (e: ErrLike) => e.code === "ModelRequired"
  );
  assert.equal((await pickModel({ ...base, view: empty })).model, undefined);
});

test("suggestIds", () => {
  assert.deepEqual(suggestIds("gpt-5.2", ["openai/gpt-5.2", "x/y"]), ["openai/gpt-5.2"]);
  assert.deepEqual(suggestIds("zzzzzzzzzzzz", ["a/b"]), []);
});
