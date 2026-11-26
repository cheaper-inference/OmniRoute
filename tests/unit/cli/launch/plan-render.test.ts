// plan.mjs: buildContext optional keys, planLaunch error mapping, redactPlan arg sites and the
// full human dry-run text.

import { test } from "node:test";
import assert from "node:assert/strict";

import { LaunchError, createPlan, defineAdapter } from "../../../../bin/cli/launch/contract.mjs";
import {
  buildContext,
  dryRunDocument,
  planLaunch,
  redactPlan,
  renderDryRunText,
} from "../../../../bin/cli/launch/core/plan.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";
import type { LaunchContext, LaunchPlan } from "../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string; cause?: object };

function adapterWith(planFn: (ctx: LaunchContext) => LaunchPlan, extra: object = {}) {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "fixture-tool",
    binaries: ["fixture-tool"],
    capabilities: {
      protocol: "openai-chat",
      modelList: { strategy: "inject", view: { name: "fixture", filter: {} } },
      model: "optional",
      install: { commands: {} },
      supportsProfile: false,
      platforms: ["linux"],
      tier: "core",
    },
    plan: planFn,
    ...extra,
  });
}

function emptyPlan(ctx: LaunchContext) {
  return createPlan("fixture-tool", {
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 0 },
  });
}

const BASE_INPUT = {
  platform: "linux",
  homeDir: "/h",
  gateway: { rootUrl: "http://127.0.0.1:1", origin: "external" },
  tool: { command: "/bin/t" },
};

test("buildContext: defaults, optional versions and the profile rule", () => {
  const view = fixtureCtx().view;
  const bare = buildContext({ ...BASE_INPUT, view });
  assert.deepEqual(Object.keys(bare), [
    "platform",
    "homeDir",
    "baseEnv",
    "gateway",
    "auth",
    "view",
    "tool",
    "passthroughArgs",
    "passthroughJson",
    "settings",
    "util",
  ]);
  assert.deepEqual(bare.gateway, { rootUrl: "http://127.0.0.1:1", origin: "external" });
  assert.deepEqual(bare.auth, {
    token: "${TOKEN}",
    source: "session",
    sentinel: "omniroute-no-auth",
  });
  assert.deepEqual(bare.tool, { command: "/bin/t", shell: false, features: {} });
  assert.deepEqual(bare.baseEnv, {});
  assert.deepEqual(bare.passthroughArgs, []);
  assert.deepEqual(bare.settings, { summary: true, privateMode: false });

  const full = buildContext({
    ...BASE_INPUT,
    view,
    gateway: { ...BASE_INPUT.gateway, version: "3.8.53" },
    tool: { command: "/bin/t", shell: 1, version: "2.0.0" },
    auth: { source: "none" },
    profile: "work",
    model: view.rows[0],
    cwd: "/w",
  });
  assert.equal(full.gateway.version, "3.8.53");
  assert.equal(full.tool.version, "2.0.0");
  assert.equal(full.tool.shell, true);
  assert.equal(full.auth.source, "none");
  assert.equal("sessionId" in full.auth, false);
  assert.deepEqual(Object.keys(full).slice(-3), ["cwd", "model", "profile"]);

  assert.equal("profile" in buildContext({ ...BASE_INPUT, view, profile: "" }), false);
  assert.equal(buildContext({ ...BASE_INPUT, view, profile: 0 }).profile, 0);
});

test("planLaunch: Internal passes through, non-LaunchError without message says 'error'", () => {
  const ctx = fixtureCtx();
  const internal = new LaunchError("Internal", "inner");
  assert.throws(
    () =>
      planLaunch(
        adapterWith(() => {
          throw internal;
        }),
        ctx
      ),
    (error: ErrLike) => error === internal
  );
  assert.throws(
    () =>
      planLaunch(
        adapterWith(() => {
          throw new LaunchError("AuthFailed", "nope");
        }),
        ctx
      ),
    (error: ErrLike) =>
      error.code === "Internal" && error.message === "adapter fixture-tool threw AuthFailed: nope"
  );
  const thrown = { reason: "no message" };
  assert.throws(
    () =>
      planLaunch(
        adapterWith(() => {
          throw thrown;
        }),
        ctx
      ),
    (error: ErrLike) =>
      error.code === "Internal" &&
      error.message === "adapter fixture-tool plan() failed: error" &&
      error.cause === thrown
  );
});

test("planLaunch: modelWarnings is skipped without a model and an empty list keeps the plan", () => {
  const ctx = fixtureCtx();
  let calls = 0;
  const noModel = { ...ctx, model: undefined } as LaunchContext;
  const counting = adapterWith(emptyPlan, {
    modelWarnings: () => {
      calls += 1;
      return ["w"];
    },
  });
  assert.deepEqual(planLaunch(counting, noModel).plan.warnings, []);
  assert.equal(calls, 0);

  const planned = emptyPlan(ctx);
  const same = adapterWith(() => planned, { modelWarnings: () => [] });
  assert.equal(planLaunch(same, ctx).plan, planned);
  const nullish = adapterWith(() => planned, { modelWarnings: () => null });
  assert.equal(planLaunch(nullish, ctx).plan, planned);
  assert.deepEqual(planLaunch(adapterWith(emptyPlan), ctx).appliedMiddleware, []);
});

test("redactPlan: arg sites without the placeholder are redacted, others kept", () => {
  const plan = {
    ...createPlan("fixture-tool", { argv: ["--key", "literal", "${TOKEN}-x"] }),
    secretSites: [
      { kind: "arg", key: "1" },
      { kind: "arg", key: "2" },
      { kind: "arg", key: "9" },
      { kind: "env", key: "MISSING" },
      { kind: "file", key: "c.json" },
      { kind: "toString", key: "0" },
    ],
  };
  const out = redactPlan(plan as LaunchPlan);
  assert.deepEqual(out.argv, ["--key", "<redacted>", "${TOKEN}-x"]);
  assert.equal(out.env.set.MISSING, undefined);
  assert.deepEqual(
    redactPlan({ ...plan, argv: ["abcd", "xabcdx"], secretSites: [] } as LaunchPlan, [
      "abcd",
      "abc",
      undefined,
    ]).argv,
    ["${TOKEN}", "x${TOKEN}x"]
  );
});

test("renderDryRunText renders every section in order", () => {
  const ctx = fixtureCtx();
  const plan = createPlan("fixture-tool", {
    argv: ["-c", "${STATE}/s.json"],
    env: { set: { B: "2", A: "1" }, unset: [] },
    tempFiles: [
      { path: "s.json", root: "state", contents: "{\n}", mergeBase: { path: "~/.t/s.json" } },
      { path: "p.md", asset: "fixture/p.md" },
    ],
    teardown: [{ argv: ["${TOOL}", "logout"], timeoutMs: 100, onError: "warn" }],
    preflight: [{ kind: "free-port", why: "callback" }],
    notes: ["n1"],
    warnings: ["w1"],
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 0 },
  });
  const doc = dryRunDocument(plan, {
    gateway: { rootUrl: "http://127.0.0.1:20128", origin: "external" },
    auth: { source: "session", sessionId: "s1" },
    command: "/bin/t",
    shell: true,
    view: { name: "fixture", hash: "0123456789abcdef", size: 6 },
    baseEnv: {},
    appliedMiddleware: ["m1", "m2"],
  });
  assert.equal(doc.auth.sessionId, "s1");
  assert.equal(doc.model, null);
  assert.equal(doc.configOverlay, "${STATE}/s.json, ${TMP}/p.md");
  assert.equal(
    renderDryRunText(doc),
    [
      "tool: fixture-tool",
      "command: /bin/t [shell]",
      "gateway: http://127.0.0.1:20128 (external)",
      "auth: session (session token as ${TOKEN})",
      "model: (none)",
      "view: fixture 6 models, hash 0123456789ab, strategy inject, injected 0",
      'argv: ["-c","${STATE}/s.json"]',
      "env set: A=1",
      "env set: B=2",
      "file ${STATE}/s.json (merged over ~/.t/s.json):",
      "  | {",
      "  | }",
      "file ${TMP}/p.md: asset fixture/p.md",
      "teardown: ${TOOL} logout",
      "preflight: free-port (callback)",
      "middleware: m1, m2",
      "note: n1",
      "warning: w1",
      "",
    ].join("\n")
  );
  const empty = dryRunDocument(emptyPlan(ctx), {
    gateway: { rootUrl: "http://x", origin: "o" },
    auth: { source: "none" },
    command: "/bin/t",
    view: { name: "v", hash: "h", size: 0 },
  });
  assert.equal(empty.configOverlay, null);
  assert.deepEqual(empty.appliedMiddleware, []);
  assert.equal(empty.shell, false);
});
