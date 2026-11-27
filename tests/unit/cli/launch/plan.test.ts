// plan.mjs: context, validation, redaction, dry-run render.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LaunchError,
  createPlan,
  defineAdapter,
  findTokenSites,
  assetRef,
} from "../../../../bin/cli/launch/contract.mjs";
import {
  buildContext,
  dryRunDocument,
  planLaunch,
  redactPlan,
  renderDryRunJson,
  renderDryRunText,
  validatePlan,
} from "../../../../bin/cli/launch/core/plan.mjs";
import { fixtureCtx } from "./_helpers/fixtureCtx.mjs";
import type {
  LaunchContext,
  LaunchPlan,
  LaunchModelRow,
} from "../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };

function adapterWith(planFn: (ctx: LaunchContext) => LaunchPlan, extra: object = {}) {
  return defineAdapter({
    contract: { major: 1, minor: 1 },
    id: "fixture-tool",
    binaries: ["fixture-tool"],
    capabilities: {
      protocol: "openai-chat",
      modelList: { strategy: "inject", view: { name: "fixture", filter: {} }, injectLimit: 3 },
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

function goodPlan(ctx: LaunchContext, parts: object = {}) {
  const plan = createPlan("fixture-tool", {
    argv: ["--config", "${TMP}/c.json"],
    env: { set: { KEY: "${TOKEN}" }, unset: ["OTHER"] },
    tempFiles: [
      {
        path: "c.json",
        contents: `{"k":"\${TOKEN}","asset":${assetRef("x/y.md", { json: true })}}`,
      },
    ],
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 3 },
    ...parts,
  });
  return { ...plan, secretSites: findTokenSites(plan) };
}

test("buildContext freezes, uses the ${TOKEN} placeholder and keeps the session id", () => {
  const view = fixtureCtx().view;
  const ctx = buildContext({
    platform: "linux",
    homeDir: "/h",
    baseEnv: { PATH: "/bin" },
    cwd: "/w",
    gateway: { rootUrl: "http://127.0.0.1:1", origin: "auto-started" },
    auth: { source: "session", sessionId: "s1" },
    view,
    model: view.rows[0],
    tool: { command: "/bin/t", shell: false, features: { a: true } },
    passthroughArgs: ["-x"],
    passthroughJson: {},
    settings: { summary: false },
  });
  assert.equal(ctx.auth.token, "${TOKEN}");
  assert.equal(ctx.auth.sessionId, "s1");
  assert.equal(ctx.auth.sentinel, "omniroute-no-auth");
  assert.equal(ctx.settings.summary, false);
  assert.equal(ctx.settings.privateMode, false);
  assert.ok(Object.isFrozen(ctx) && Object.isFrozen(ctx.tool.features));
  assert.equal(typeof ctx.util.tempPath, "function");
});

test("validatePlan accepts a good plan", () => {
  const ctx = fixtureCtx();
  const adapter = adapterWith((c) => goodPlan(c));
  assert.doesNotThrow(() => validatePlan(goodPlan(ctx), ctx, adapter));
});

test("validatePlan rejects each broken invariant as Internal", () => {
  const ctx = fixtureCtx();
  const adapter = adapterWith((c) => goodPlan(c));
  const cases: Array<[string, Record<string, unknown>, RegExp]> = [
    ["token in argv", { argv: ["--key", "${TOKEN}"] }, /in argv/],
    ["undeclared secret", { secretSites: [] }, /not in secretSites/],
    [
      "escaping file",
      { tempFiles: [{ path: "../x", contents: "" }], secretSites: [] },
      /escapes its root/,
    ],
    [
      "absolute file",
      { tempFiles: [{ path: "/etc/x", contents: "" }], secretSites: [] },
      /escapes its root/,
    ],
    [
      "contents and asset",
      { tempFiles: [{ path: "a", contents: "x", asset: "a/b" }], secretSites: [] },
      /exactly one/,
    ],
    [
      "bad env key",
      { env: { set: { "BAD-KEY": "x" }, unset: [] }, secretSites: [] },
      /invalid env key/,
    ],
    [
      "set and unset",
      { env: { set: { A: "1" }, unset: ["A"] }, secretSites: [] },
      /both set and unset/,
    ],
    [
      "wrong hash",
      { modelList: { strategy: "inject", viewHash: "nope", injected: 0 } },
      /viewHash/,
    ],
    [
      "too many injected",
      { modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 99 } },
      /injected/,
    ],
    [
      "wrong strategy",
      { modelList: { strategy: "both", viewHash: ctx.view.hash, injected: 0 } },
      /strategy/,
    ],
    ["tool outside teardown", { argv: ["${TOOL}"] }, /teardown argv only/],
    [
      "asset token in env",
      { env: { set: { A: "${ASSET:x}" }, unset: [] }, secretSites: [] },
      /asset tokens/,
    ],
    ["needsTempDir false", { needsTempDir: false }, /needsTempDir/],
    ["bad teardown", { teardown: [{ argv: [], timeoutMs: 0, onError: "explode" }] }, /teardown/],
    ["wrong tool", { tool: "other" }, /plan\.tool/],
  ];
  for (const [name, patch, pattern] of cases) {
    const plan = { ...goodPlan(ctx), ...patch };
    assert.throws(
      () => validatePlan(plan, ctx, adapter),
      (error: ErrLike) => error.code === "Internal" && pattern.test(error.message),
      name
    );
  }
});

test("validatePlan: tempDirs (1.2) accepted under tmp and state, bad ones rejected", () => {
  const ctx = fixtureCtx();
  const adapter = adapterWith((c) => goodPlan(c));
  const good = {
    ...goodPlan(ctx),
    tempDirs: [
      { path: "locks" },
      { path: "a/b", root: "tmp", mode: 0o755 },
      { path: "data", root: "state", mode: 0o700 },
    ],
  };
  assert.doesNotThrow(() => validatePlan(good, ctx, adapter));

  const cases: Array<[string, Record<string, unknown>, RegExp]> = [
    ["traversal", [{ path: "../x" }], /temp dir path "\.\.\/x" escapes its root/],
    ["inner traversal", [{ path: "a/../../x" }], /escapes its root/],
    ["absolute", [{ path: "/etc/x" }], /escapes its root/],
    ["windows absolute", [{ path: "C:\\x" }], /escapes its root/],
    ["empty", [{ path: "" }], /escapes its root/],
    ["bad root", [{ path: "x", root: "home" }], /root must be tmp \| state/],
    ["world writable", [{ path: "x", mode: 0o777 }], /mode must/],
    ["owner cannot enter", [{ path: "x", mode: 0o600 }], /mode must/],
    ["duplicate", [{ path: "x" }, { path: "x", root: "tmp" }], /declared twice/],
    ["clashes with a file", [{ path: "c.json" }], /also a temp file/],
    ["not an array", { path: "x" }, /tempDirs must be an array/],
  ];
  for (const [name, tempDirs, pattern] of cases) {
    const plan = { ...goodPlan(ctx), tempDirs };
    assert.throws(
      () => validatePlan(plan, ctx, adapter),
      (error: ErrLike) => error.code === "Internal" && pattern.test(error.message),
      name
    );
  }

  // A tmp-root tempDir alone requires the tmp dir.
  const bare = createPlan("fixture-tool", {
    tempDirs: [{ path: "locks" }],
    needsTempDir: false,
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 0 },
  });
  assert.throws(
    () => validatePlan(bare, ctx, adapter),
    (error: ErrLike) => error.code === "Internal" && /needsTempDir/.test(error.message)
  );
  const stateOnly = createPlan("fixture-tool", {
    tempDirs: [{ path: "locks", root: "state" }],
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 0 },
  });
  assert.equal(stateOnly.needsTempDir, false);
  assert.doesNotThrow(() => validatePlan(stateOnly, ctx, adapter));
});

test("planLaunch runs middleware around plan(), adds modelWarnings, validates last", () => {
  const ctx = fixtureCtx();
  const adapter = adapterWith((c) => goodPlan(c, { notes: [c.settings.tag ?? "none"] }), {
    modelWarnings: (row: LaunchModelRow) => [`warn ${row.id}`],
  });
  const middleware = [
    {
      id: "late",
      order: 600,
      afterPlan: (plan: LaunchPlan) => ({ ...plan, notes: [...plan.notes, "late"] }),
    },
    {
      id: "tag",
      order: 100,
      beforePlan: (c: LaunchContext) => ({ ...c, settings: { ...c.settings, tag: "t1" } }),
    },
  ];
  const { plan, appliedMiddleware } = planLaunch(adapter, ctx, { middleware });
  assert.deepEqual(plan.notes, ["t1", "late"]);
  assert.deepEqual(plan.warnings, [`warn ${ctx.model!.id}`]);
  assert.deepEqual(appliedMiddleware, ["tag", "late"]);

  const smuggler = [
    { id: "evil", afterPlan: (p: LaunchPlan) => ({ ...p, argv: [...p.argv, "${TOKEN}"] }) },
  ];
  assert.throws(() => planLaunch(adapter, ctx, { middleware: smuggler }), /in argv/);
});

test("planLaunch maps adapter errors: allowed codes pass, others become Internal", () => {
  const ctx = fixtureCtx();
  assert.throws(
    () =>
      planLaunch(
        adapterWith(() => {
          throw new LaunchError("ModelRequired", "need a model");
        }),
        ctx
      ),
    (e: ErrLike) => e.code === "ModelRequired"
  );
  assert.throws(
    () =>
      planLaunch(
        adapterWith(() => {
          throw new LaunchError("AuthFailed", "x");
        }),
        ctx
      ),
    (e: ErrLike) => e.code === "Internal"
  );
  assert.throws(
    () =>
      planLaunch(
        adapterWith(() => {
          throw new TypeError("boom");
        }),
        ctx
      ),
    (e: ErrLike) => e.code === "Internal" && /boom/.test(e.message)
  );
});

test("redactPlan scrubs real secrets and redacts secret sites without the placeholder", () => {
  const ctx = fixtureCtx();
  const plan = goodPlan(ctx, {
    env: { set: { KEY: "olx_abc_secretsecret", OTHER: "Bearer olx_abc_secretsecret" }, unset: [] },
  });
  plan.secretSites = [
    { kind: "env", key: "KEY" },
    { kind: "file", key: "c.json" },
  ];
  const out = redactPlan(plan, ["olx_abc_secretsecret"]);
  assert.equal(out.env.set.KEY, "${TOKEN}");
  assert.equal(out.env.set.OTHER, "Bearer ${TOKEN}");
  assert.ok(!JSON.stringify(out).includes("secretsecret"));
  const unknown = redactPlan({ ...plan, env: { set: { KEY: "literal-key" }, unset: [] } }, []);
  assert.equal(unknown.env.set.KEY, "<redacted>");
  assert.equal(plan.env.set.KEY, "olx_abc_secretsecret", "input not mutated");
});

test("dry-run document keeps asset refs, adds compat keys; text render lists files", () => {
  const ctx = fixtureCtx();
  const plan = goodPlan(ctx);
  const doc = dryRunDocument(redactPlan(plan), {
    gateway: {
      rootUrl: "http://127.0.0.1:20128",
      origin: "auto-started",
      status: "would auto-start on 127.0.0.1:20128",
    },
    auth: { source: "none" },
    command: "/usr/local/bin/fixture-tool",
    shell: false,
    model: "anthropic/claude-sonnet-4-6",
    view: { name: "fixture", hash: ctx.view.hash, size: ctx.view.rows.length },
    baseEnv: { OTHER: "1" },
    appliedMiddleware: [],
  });
  assert.equal(doc.planVersion, 1);
  assert.equal(doc.target, "fixture-tool");
  assert.equal(doc.baseUrl, "http://127.0.0.1:20128");
  assert.deepEqual(doc.args, plan.argv);
  assert.deepEqual(doc.env.changedOrAdded, ["KEY"]);
  assert.deepEqual(doc.env.removed, ["OTHER"]);
  assert.equal(doc.auth.present, false);
  assert.equal(doc.configOverlay, "${TMP}/c.json");
  const jsonText = renderDryRunJson(doc);
  assert.ok(jsonText.includes("${ASSET:x/y.md:json}"), "asset ref shown, not asset text");
  const text = renderDryRunText(doc);
  assert.match(text, /would auto-start on 127\.0\.0\.1:20128/);
  assert.match(text, /file \$\{TMP\}\/c\.json:/);
  assert.match(text, /env unset: OTHER/);
});
