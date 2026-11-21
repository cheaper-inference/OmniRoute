// plan.mjs validatePlan: exact problem messages and their order in the joined Internal error.

import { test } from "node:test";
import assert from "node:assert/strict";

import { createPlan, defineAdapter } from "../../../../bin/cli/launch/contract.mjs";
import { validatePlan } from "../../../../bin/cli/launch/core/plan.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";
import type { LaunchAdapter, LaunchPlan } from "../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string };

function adapterFor(strategy: string, injectLimit?: number): LaunchAdapter {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "fixture-tool",
    binaries: ["fixture-tool"],
    capabilities: {
      protocol: "openai-chat",
      modelList: { strategy, view: { name: "fixture", filter: {} }, injectLimit },
      model: "optional",
      install: { commands: {} },
      supportsProfile: false,
      platforms: ["linux"],
      tier: "core",
    },
    plan: () => createPlan("fixture-tool", {}),
  });
}

const PREFIX = "adapter fixture-tool produced an invalid plan: ";

function problemsOf(plan: object, adapter: LaunchAdapter): string[] {
  try {
    validatePlan(plan as LaunchPlan, fixtureCtx(), adapter);
  } catch (error) {
    const err = error as ErrLike;
    assert.equal(err.code, "Internal");
    assert.ok(err.message?.startsWith(PREFIX), err.message);
    return err.message!.slice(PREFIX.length).split("; ");
  }
  return [];
}

function basePlan(parts: object = {}) {
  const ctx = fixtureCtx();
  return {
    ...createPlan("fixture-tool", {
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 0 },
    }),
    ...parts,
  };
}

test("validatePlan throws 'returned no plan' for a missing or non-object plan", () => {
  for (const plan of [undefined, null, 0, "plan"]) {
    assert.throws(
      () => validatePlan(plan as unknown as LaunchPlan, fixtureCtx(), adapterFor("inject")),
      (error: ErrLike) =>
        error.code === "Internal" && error.message === "adapter fixture-tool returned no plan"
    );
  }
});

test("validatePlan reports every problem, in check order", () => {
  const plan = {
    planVersion: 0,
    tool: "x",
    argv: ["${TOOL}", 1],
    env: { set: { "BAD-K": 1, A: "${ASSET:x}" }, unset: ["bad-u", "A"] },
    secretSites: [],
    cwd: "${TMP}",
    tempFiles: [
      { path: "a", asset: "../q", mergeBase: { path: "m" } },
      { path: "b", contents: 3, mode: 0o644 },
      { path: "c", contents: "${ASSET:../z} ${ASSET:", root: "home" },
      { path: "b", contents: "", asset: "x/y.md" },
    ],
    tempDirs: [{ path: "b" }, { path: "d", mode: 0o777 }, { path: "d" }],
    teardown: [{ argv: [], timeoutMs: 0, onError: "explode", env: "home" }],
    modelList: { strategy: "inject", viewHash: "nope", injected: 1 },
  };
  assert.deepEqual(problemsOf(plan, adapterFor("server-view")), [
    "planVersion must be 1",
    'plan.tool "x" != fixture-tool',
    "argv must be an array of strings",
    'invalid env key "BAD-K"',
    "env.set.BAD-K must be a string",
    'invalid env.unset key "bad-u"',
    "A is both set and unset",
    "${TOOL} is valid in teardown argv only",
    "asset tokens are valid only inside tempFiles contents",
    'a: invalid asset path "../q"',
    "a: mergeBase requires contents",
    "b: contents must be a string",
    "b: mode must be 0600 or 0700",
    "temp file c: root must be tmp | state",
    "c: malformed ${ASSET:...} token",
    'c: invalid asset path "../z"',
    "b: exactly one of contents / asset",
    "temp file tmp:b written twice",
    "temp dir tmp:b is also a temp file",
    "temp dir d: mode must give the owner rwx and refuse group/other write",
    "temp dir tmp:d declared twice",
    "plan uses ${TMP} but needsTempDir is false",
    "teardown argv must be a non-empty string array",
    "teardown timeoutMs must be > 0",
    "teardown onError must be warn | ignore",
    "teardown env must be plan | base",
    "modelList.strategy must be server-view",
    "modelList.viewHash must equal ctx.view.hash",
    "server-view plans inject nothing",
    "notes must be an array",
    "warnings must be an array",
    "preflight must be an array",
    "postExitChecks must be an array",
    "cleanup is required",
  ]);
});

test("validatePlan flags non-JSON plan data and env of the wrong shape", () => {
  let calls = 0;
  const unstable = { toJSON: () => calls++ };
  assert.deepEqual(problemsOf(basePlan({ extra: unstable }), adapterFor("inject")), [
    "plan is not plain JSON data",
  ]);
  assert.deepEqual(problemsOf(basePlan({ extra: 1n }), adapterFor("inject")), [
    "plan is not JSON-serializable",
  ]);
  assert.deepEqual(problemsOf(basePlan({ env: { set: 5, unset: "" } }), adapterFor("inject")), [
    "env must be {set, unset[]}",
  ]);
  assert.deepEqual(problemsOf(basePlan({ env: null }), adapterFor("inject")), []);
});

test("validatePlan: a state-root file with string contents needs no tmp dir", () => {
  const plan = basePlan({
    tempFiles: [{ path: "s.json", root: "state", contents: "{}", mode: 0o700 }],
  });
  assert.equal(validatePlan(plan as LaunchPlan, fixtureCtx(), adapterFor("inject")), plan);
});

test("validatePlan: injected is capped by injectLimit and by the view size", () => {
  const rows = fixtureCtx().view.rows.length;
  const over = (injected: number) =>
    basePlan({
      modelList: { strategy: "inject", viewHash: fixtureCtx().view.hash, injected },
    });
  assert.deepEqual(problemsOf(over(3), adapterFor("inject", 2)), [
    "modelList.injected must be an integer 0..2",
  ]);
  assert.deepEqual(problemsOf(over(rows + 1), adapterFor("inject")), [
    `modelList.injected must be an integer 0..${rows}`,
  ]);
  assert.deepEqual(problemsOf(over(1.5), adapterFor("inject", 50)), [
    `modelList.injected must be an integer 0..${rows}`,
  ]);
  assert.deepEqual(problemsOf(over(rows), adapterFor("inject")), []);
});

test("validatePlan: a null temp dir entry is checked as an empty path", () => {
  assert.deepEqual(
    problemsOf(basePlan({ tempDirs: [null], needsTempDir: true }), adapterFor("inject")),
    ["temp dir path undefined escapes its root"]
  );
});

test("validatePlan: a null temp dir root defaults to tmp", () => {
  assert.deepEqual(
    problemsOf(basePlan({ tempDirs: [{ path: "d", root: null }] }), adapterFor("inject")),
    ["plan uses ${TMP} but needsTempDir is false"]
  );
});

test("validatePlan: a non-iterable env.unset or tempFiles still throws a TypeError", () => {
  for (const parts of [{ env: { set: {}, unset: {} } }, { tempFiles: {} }]) {
    assert.throws(
      () => validatePlan(basePlan(parts) as LaunchPlan, fixtureCtx(), adapterFor("inject")),
      TypeError
    );
  }
});
