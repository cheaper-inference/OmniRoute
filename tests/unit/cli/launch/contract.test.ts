// Unit tests for the frozen launcher contract (bin/cli/launch/contract.mjs), the shared Zod
// schemas (src/shared/validation/launchView.ts) and the adapter-test helpers.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { load as loadYaml } from "js-yaml";
import { parse as smolParseToml } from "smol-toml";

import * as contract from "../../../../bin/cli/launch/contract.mjs";
import { claudeWindowEnv as utilClaudeWindowEnv } from "../../../../bin/cli/utils/claudeWindowEnv.mjs";
import { selectView as sharedSelectView } from "../../../../src/shared/launch/viewSelect.ts";
import {
  launchSessionPatchSchema,
  modelListSpecSchema,
  serverViewPresentationSchema,
  viewSelectSpecSchema,
} from "../../../../src/shared/validation/launchView.ts";
import { FIXTURE_ROWS, fixtureCtx } from "./_helpers/fixtureCtx.mjs";
import { ASSETS_DIR, assertGolden, checkPlanInvariants, goldenPath } from "./_helpers/golden.mjs";

const {
  ADAPTER_CONTRACT,
  ERROR_CODES,
  EXIT_CODES,
  LaunchError,
  NO_AUTH_SENTINEL,
  PLACEHOLDERS,
  PLAN_VERSION,
  contractVersion,
  createContextUtil,
  createPlan,
  deepFreeze,
  deepMerge,
  defineAdapter,
  dotenv,
  ensureV1,
  findFlag,
  findTokenSites,
  hasFlag,
  injectRows,
  isLaunchError,
  isValidEnvKey,
  json,
  statePath,
  stripTrailingSlash,
  tempPath,
  toml,
  tomlAssign,
  tomlString,
  viewHash,
  yaml,
} = contract;
const { ASSET_ROOT, assetRef, expandAssetRefs, findAssetRefs, validateAssetPath } = contract;

type Plan = ReturnType<typeof createPlan>;
type LaunchAdapter = import("../../../../bin/cli/launch/contract.d.ts").LaunchAdapter;

/** smol-toml returns null-prototype objects; normalize for deepEqual. */
function parseToml(text: string): unknown {
  return JSON.parse(JSON.stringify(smolParseToml(text)));
}

function sampleAdapter(overrides: Record<string, unknown> = {}): LaunchAdapter {
  return {
    contract: { major: 1, minor: 0 },
    id: "sample",
    binaries: ["sample"],
    capabilities: {
      protocol: "openai-chat",
      modelList: {
        strategy: "inject",
        view: { name: "sample", filter: { capabilities: ["tools"] } },
        injectLimit: 2,
      },
      model: "optional",
      install: { commands: { any: ["npm i -g sample"] } },
      supportsProfile: false,
      platforms: ["linux", "darwin", "win32"],
      tier: "core",
      passthrough: [{ flag: "--model", aliases: ["-m"], action: "owned" }],
    },
    plan(ctx: ReturnType<typeof fixtureCtx>) {
      const rows = injectRows(ctx, 2);
      const plan = createPlan("sample", {
        argv: ["--config", ctx.util.tempPath("sample.json")],
        env: { set: { SAMPLE_KEY: ctx.auth.token }, unset: ["OPENAI_API_KEY"] },
        tempFiles: [
          {
            path: "sample.json",
            contents: ctx.util.json({ models: rows.map((row) => row.id) }),
            format: "json",
          },
        ],
        modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
      });
      plan.secretSites = findTokenSites(plan);
      return plan;
    },
    ...overrides,
  } as LaunchAdapter;
}

// ---------- versions and constants ----------

test("contract version and plan version are frozen at 1.0 / 1", () => {
  assert.deepEqual({ ...ADAPTER_CONTRACT }, { major: 1, minor: 3 });
  assert.equal(contractVersion, ADAPTER_CONTRACT);
  assert.ok(Object.isFrozen(ADAPTER_CONTRACT));
  assert.equal(PLAN_VERSION, 1);
  assert.deepEqual(
    { ...PLACEHOLDERS },
    { TMP: "${TMP}", STATE: "${STATE}", TOKEN: "${TOKEN}", TOOL: "${TOOL}" }
  );
  assert.equal(NO_AUTH_SENTINEL, "omniroute-no-auth");
});

test("exit codes follow section 10", () => {
  const expected: Record<string, number | null> = {
    UsageError: 2,
    ModelRequired: 2,
    ModelNotFound: 2,
    ModelUnsuitable: 2,
    ConfigConflict: 2,
    UnsupportedPlatform: 2,
    AuthFailed: 77,
    GatewayUnreachable: 69,
    ToolVersionTooOld: 69,
    GatewayTooOld: 69,
    FeatureUnsupported: 69,
    PreflightFailed: 69,
    NoProviders: 69,
    ViewInvalid: 70,
    Internal: 70,
    PortInUse: 75,
    GatewayStartTimeout: 75,
    StateLocked: 75,
    ToolNotFound: 127,
    BudgetExceeded: null,
  };
  assert.deepEqual({ ...EXIT_CODES }, expected);
  for (const code of Object.keys(expected)) assert.equal(ERROR_CODES[code], code);
});

test("LaunchError carries code, hint, exit code and a JSON shape without stack", () => {
  const cause = new Error("inner");
  const error = new LaunchError("ModelRequired", "qwen needs a model", {
    hint: "pass --model",
    cause,
  });
  assert.equal(error.name, "LaunchError");
  assert.equal(error.code, "ModelRequired");
  assert.equal(error.hint, "pass --model");
  assert.equal(error.exitCode, 2);
  assert.equal(error.cause, cause);
  assert.ok(error instanceof Error);
  assert.ok(isLaunchError(error));
  assert.deepEqual(error.toJSON(), {
    error: { code: "ModelRequired", message: "qwen needs a model", hint: "pass --model" },
  });
  assert.ok(!JSON.stringify(error).includes("stack"));
  assert.deepEqual(new LaunchError("Internal", "x").toJSON(), {
    error: { code: "Internal", message: "x" },
  });
  assert.equal(new LaunchError("BudgetExceeded", "cap").exitCode, null);
  assert.throws(() => new LaunchError("Nope" as never, "x"), TypeError);
  assert.equal(isLaunchError(new Error("plain")), false);
});

// ---------- URL helpers ----------

test("stripTrailingSlash and ensureV1", () => {
  assert.equal(stripTrailingSlash("http://h:1///"), "http://h:1");
  assert.equal(stripTrailingSlash("http://h:1"), "http://h:1");
  assert.equal(stripTrailingSlash(""), "");
  assert.equal(ensureV1("http://127.0.0.1:20128"), "http://127.0.0.1:20128/v1");
  assert.equal(ensureV1("http://127.0.0.1:20128/"), "http://127.0.0.1:20128/v1");
  assert.equal(ensureV1("http://127.0.0.1:20128/v1"), "http://127.0.0.1:20128/v1");
  assert.equal(ensureV1("http://127.0.0.1:20128/v1//"), "http://127.0.0.1:20128/v1");
  assert.equal(ensureV1("https://x.example/base"), "https://x.example/base/v1");
});

// ---------- path placeholders ----------

test("tempPath / statePath build placeholders and refuse escapes", () => {
  assert.equal(tempPath("a.json"), "${TMP}/a.json");
  assert.equal(tempPath(".gemini/settings.json"), "${TMP}/.gemini/settings.json");
  assert.equal(tempPath("dir\\file.json"), "${TMP}/dir/file.json");
  assert.equal(statePath("model.json"), "${STATE}/model.json");
  for (const bad of ["", "/etc/passwd", "\\x", "C:\\x", "../x", "a/../b", "a//b"]) {
    assert.throws(
      () => tempPath(bad),
      (error: unknown) => isLaunchError(error),
      bad
    );
    assert.throws(
      () => statePath(bad),
      (error: unknown) => isLaunchError(error),
      bad
    );
  }
});

// ---------- serializers ----------

test("json is canonical: sorted keys, undefined dropped, non-finite rejected", () => {
  assert.equal(
    json({ b: 1, a: { d: [3, undefined], c: 2 }, z: undefined }),
    '{"a":{"c":2,"d":[3,null]},"b":1}'
  );
  assert.equal(json({ b: 1, a: 2 }, { indent: 2 }), '{\n  "a": 2,\n  "b": 1\n}');
  assert.equal(json({ x: "${TOKEN}" }), '{"x":"${TOKEN}"}');
  assert.throws(
    () => json({ n: Number.NaN }),
    (e: unknown) => isLaunchError(e)
  );
  assert.throws(
    () => json({ n: Infinity }),
    (e: unknown) => isLaunchError(e)
  );
  const cyclic: Record<string, unknown> = {};
  cyclic.self = cyclic;
  assert.throws(
    () => json(cyclic),
    (e: unknown) => isLaunchError(e)
  );
  const shared = { v: 1 };
  assert.equal(json({ a: shared, b: shared }), '{"a":{"v":1},"b":{"v":1}}');
});

test("toml assignments match launch-codex and parse as TOML", () => {
  assert.equal(
    toml("model_providers.omniroute.name", "OmniRoute"),
    'model_providers.omniroute.name="OmniRoute"'
  );
  assert.equal(toml("check_for_update_on_startup", false), "check_for_update_on_startup=false");
  assert.equal(toml("model_context_window", 200000), "model_context_window=200000");
  assert.equal(tomlAssign, toml);
  const windowsPath = "C:\\Users\\me\\AppData\\omniroute\\model.json";
  const assignment = toml("model_catalog_json", windowsPath);
  assert.equal(
    assignment,
    'model_catalog_json="C:\\\\Users\\\\me\\\\AppData\\\\omniroute\\\\model.json"'
  );
  assert.deepEqual(parseToml(assignment), { model_catalog_json: windowsPath });
  const tricky = 'quote " tab \t newline \n bell \u0007 emoji 😀';
  assert.deepEqual(parseToml(toml("k", tricky)), { k: tricky });
  assert.equal(toml("a.b c.d", "x"), 'a."b c".d="x"');
  assert.deepEqual(parseToml(toml("a.b c.d", "x")), { a: { "b c": { d: "x" } } });
  assert.deepEqual(parseToml(toml("arr", ["x", 1, true])), { arr: ["x", 1, true] });
  assert.deepEqual(parseToml(toml("t", { name: "n", n: 2 })), { t: { name: "n", n: 2 } });
  assert.equal(toml("t", {}), "t={}");
  assert.equal(tomlString('a"b'), '"a\\"b"');
  assert.throws(
    () => toml("", "x"),
    (e: unknown) => isLaunchError(e)
  );
  assert.throws(
    () => toml("a..b", "x"),
    (e: unknown) => isLaunchError(e)
  );
  assert.throws(
    () => toml("k", Number.NaN),
    (e: unknown) => isLaunchError(e)
  );
});

test("yaml emits safe block YAML that round-trips", () => {
  const value = {
    model: {
      provider: "custom",
      default: "anthropic/claude-sonnet-4-6",
      base_url: "http://127.0.0.1:20128/v1",
      key_env: "OMNIROUTE_API_KEY",
      context_length: 200000,
    },
    flags: { yes: "yes", no: "no", on: "on", nul: "null", num: "123", empty: "", hash: "a #b" },
    colon: "a: b",
    lead: "-x",
    multi: "line1\nline2",
    list: [{ id: "m1", name: "Model 1" }, { id: "m2" }, "plain", 3, true, null],
    nested: [[1, 2], []],
    emptyObj: {},
    emptyList: [],
    bools: [true, false],
    placeholder: "${TMP}/locks",
    literal: "${OMNIROUTE_API_KEY:-omniroute-local}",
    skipped: undefined,
  };
  const text = yaml(value);
  assert.ok(text.endsWith("\n"));
  const { skipped: _skipped, ...expected } = value;
  assert.deepEqual(loadYaml(text), expected);
  assert.match(text, /^model:\n {2}provider: custom\n/);
  assert.equal(yaml([]), "[]\n");
  assert.throws(
    () => yaml({ n: Infinity }),
    (e: unknown) => isLaunchError(e)
  );
});

test("dotenv lines are quoted and validated", () => {
  assert.equal(
    dotenv({
      AIDER_OPENAI_API_BASE: "http://h/v1",
      AIDER_OPENAI_API_KEY: "${TOKEN}",
      SKIP: undefined,
    }),
    'AIDER_OPENAI_API_BASE="http://h/v1"\nAIDER_OPENAI_API_KEY="${TOKEN}"\n'
  );
  assert.equal(dotenv({}), "");
  assert.equal(dotenv({ Q: 'a"b\nc' }), 'Q="a\\"b\\nc"\n');
  assert.throws(
    () => dotenv({ "BAD-KEY": "x" }),
    (e: unknown) => isLaunchError(e)
  );
  assert.ok(isValidEnvKey("ANTHROPIC_BASE_URL"));
  assert.ok(!isValidEnvKey("1X"));
  assert.ok(!isValidEnvKey("A=B"));
  assert.ok(!isValidEnvKey(""));
});

// ---------- data helpers ----------

test("deepMerge merges objects, replaces arrays and scalars, never mutates", () => {
  const user = deepFreeze({
    modelPicker: { old: true },
    permissions: { allow: ["a"] },
    theme: "dark",
  });
  const ours = deepFreeze({
    modelPicker: { replaceBuiltInOptions: true },
    permissions: { allow: ["b"] },
  });
  const merged = deepMerge(user, ours);
  assert.deepEqual(merged, {
    modelPicker: { old: true, replaceBuiltInOptions: true },
    permissions: { allow: ["b"] },
    theme: "dark",
  });
  merged.permissions.allow.push("c");
  assert.deepEqual(user.permissions.allow, ["a"]);
  assert.deepEqual(ours.permissions.allow, ["b"]);
  assert.deepEqual(deepMerge(undefined, { a: 1 }), { a: 1 });
  assert.deepEqual(deepMerge({ a: 1 }, undefined), { a: 1 });
  assert.equal(deepMerge({ a: 1 }, "x"), "x");
  assert.deepEqual(deepMerge({ a: 1 }, { a: undefined }), { a: 1 });
});

test("findFlag / hasFlag handle aliases, =value and the -- terminator", () => {
  const args = ["--yolo", "-m", "gpt", "--settings=/x.json", "--", "--model", "late"];
  assert.deepEqual(findFlag(args, ["--model", "-m"]), { index: 1, flag: "-m", value: "gpt" });
  assert.deepEqual(findFlag(args, "--settings"), {
    index: 3,
    flag: "--settings",
    value: "/x.json",
  });
  assert.equal(findFlag(args, "--model"), null, "stops at --");
  assert.ok(hasFlag(args, "--yolo", { takesValue: false }));
  assert.ok(!hasFlag(args, "--provider"));
  assert.equal(findFlag(["--modelx"], "--model"), null);
  assert.deepEqual(findFlag(["--model"], "--model"), {
    index: 0,
    flag: "--model",
    value: undefined,
  });
});

test("injectRows slices the view without re-filtering", () => {
  const ctx = fixtureCtx();
  assert.deepEqual(
    injectRows(ctx).map((row) => row.id),
    ctx.view.rows.map((row) => row.id)
  );
  assert.deepEqual(
    injectRows(ctx, 2).map((row) => row.id),
    ctx.view.rows.slice(0, 2).map((row) => row.id)
  );
  assert.deepEqual(injectRows(ctx, 0), []);
});

// ---------- plan builders ----------

test("createPlan fills every required field and infers needsTempDir", () => {
  const empty = createPlan("x");
  assert.deepEqual(empty, {
    planVersion: 1,
    tool: "x",
    argv: [],
    env: { set: {}, unset: [] },
    tempFiles: [],
    needsTempDir: false,
    secretSites: [],
    notes: [],
    warnings: [],
    preflight: [],
    teardown: [],
    postExitChecks: [],
    modelList: { strategy: "inject", viewHash: "", injected: 0 },
    cleanup: { removeTempDir: true, revokeSession: true },
  });
  assert.equal(createPlan("x", { tempFiles: [{ path: "a", contents: "" }] }).needsTempDir, true);
  assert.equal(
    createPlan("x", { tempFiles: [{ path: "a", root: "state", contents: "" }] }).needsTempDir,
    false
  );
  assert.equal(createPlan("x", { env: { set: { H: "${TMP}" }, unset: [] } }).needsTempDir, true);
  assert.equal(createPlan("x", { argv: ["${TMP}/a"], needsTempDir: false }).needsTempDir, false);
  assert.equal("tempDirs" in empty, false, "tempDirs (1.2) is omitted unless given");
  assert.equal(createPlan("x", { tempDirs: [{ path: "locks" }] }).needsTempDir, true);
  assert.equal(
    createPlan("x", { tempDirs: [{ path: "locks", root: "state" }] }).needsTempDir,
    false
  );
  const dirs = [{ path: "a/b", mode: 0o700 }];
  const withDirs = createPlan("x", { tempDirs: dirs });
  withDirs.tempDirs![0].path = "changed";
  assert.equal(dirs[0].path, "a/b", "input tempDirs not aliased");
  const env = { set: { A: "1" }, unset: ["B"] };
  const plan = createPlan("x", { env });
  plan.env.set.C = "2";
  assert.deepEqual(env, { set: { A: "1" }, unset: ["B"] }, "input env not aliased");
});

test("findTokenSites locates ${TOKEN} in env, argv and files", () => {
  const plan = createPlan("x", {
    argv: ["--key", "${TOKEN}"],
    env: { set: { K: "${TOKEN}", B: "http://h" }, unset: [] },
    tempFiles: [
      { path: "cfg.json", contents: '{"apiKey":"${TOKEN}"}' },
      { path: "other.json", contents: "{}" },
    ],
  });
  assert.deepEqual(findTokenSites(plan), [
    { kind: "env", key: "K" },
    { kind: "arg", key: "1" },
    { kind: "file", key: "cfg.json" },
  ]);
});

test("defineAdapter validates the static shape and freezes data", () => {
  const adapter = defineAdapter(sampleAdapter());
  assert.ok(Object.isFrozen(adapter));
  assert.ok(Object.isFrozen(adapter.capabilities.modelList.view));
  assert.equal(typeof adapter.plan, "function");
  const bad: Array<[Record<string, unknown>, RegExp]> = [
    [{ contract: { major: 2, minor: 0 } }, /contract\.major/],
    [{ contract: { major: 1, minor: 5 } }, /contract\.minor/],
    [{ id: "Bad Id" }, /id must be/],
    [{ binaries: [] }, /binaries/],
    [{ plan: undefined }, /plan must be a function/],
  ];
  for (const [override, message] of bad) {
    assert.throws(() => defineAdapter(sampleAdapter(override)), message);
  }
  const caps = sampleAdapter().capabilities;
  const badCaps: Array<[Record<string, unknown>, RegExp]> = [
    [{ protocol: "smtp" }, /protocol/],
    [{ modelList: { strategy: "magic", view: { name: "x", filter: {} } } }, /strategy/],
    [{ modelList: { strategy: "inject" } }, /view\.name/],
    [{ model: "maybe" }, /capabilities\.model/],
    [{ platforms: ["beos"] }, /platforms/],
    [{ tier: "gold" }, /tier/],
    [{ supportsProfile: undefined }, /supportsProfile/],
    [{ install: undefined }, /install/],
    [{ passthrough: [{ flag: "--x", action: "explode" }] }, /passthrough/],
  ];
  for (const [override, message] of badCaps) {
    assert.throws(
      () => defineAdapter(sampleAdapter({ capabilities: { ...caps, ...override } })),
      message
    );
  }
});

test("re-exports are the shared pure modules, not copies", () => {
  assert.equal(contract.claudeWindowEnv, utilClaudeWindowEnv);
  assert.equal(contract.selectView, sharedSelectView);
  assert.deepEqual(contract.claudeWindowEnv(128000), {
    CLAUDE_CODE_MAX_CONTEXT_TOKENS: "128000",
    CLAUDE_CODE_AUTO_COMPACT_WINDOW: "108800",
  });
  assert.equal(viewHash([]), contract.selectView([], { name: "x", filter: {} }).hash);
});

test("createContextUtil exposes exactly the section 2 helpers", () => {
  const util = createContextUtil();
  assert.deepEqual(Object.keys(util).sort(), [
    "ensureV1",
    "json",
    "statePath",
    "tempPath",
    "toml",
    "yaml",
  ]);
  assert.ok(Object.isFrozen(util));
  assert.equal(util.tempPath("x"), "${TMP}/x");
});

// ---------- fixture helper ----------

test("fixtureCtx builds a frozen context with overrides", () => {
  const ctx = fixtureCtx();
  assert.ok(Object.isFrozen(ctx));
  assert.ok(Object.isFrozen(ctx.view.rows[0]));
  assert.equal(ctx.platform, "linux");
  assert.equal(ctx.homeDir, "/home/fixture");
  assert.equal(ctx.auth.token, "${TOKEN}");
  assert.equal(ctx.auth.sentinel, NO_AUTH_SENTINEL);
  assert.equal(ctx.gateway.rootUrl, "http://127.0.0.1:20128");
  assert.equal(ctx.view.rows.length, FIXTURE_ROWS.length);
  assert.equal(ctx.view.hash, viewHash(FIXTURE_ROWS.map((row) => row.id)));
  assert.equal(ctx.model?.id, FIXTURE_ROWS[0].id);
  assert.throws(() => {
    (ctx.baseEnv as Record<string, string>).X = "1";
  }, TypeError);

  const win = fixtureCtx({
    platform: "win32",
    tool: "codex",
    model: "mystery/unknown-context",
    args: ["--yolo"],
    env: { CODEX_HOME: "C:\\c" },
    version: "0.140.0",
    features: { modelPicker: true },
    profile: "work",
    passthroughJson: { "--settings": { a: 1 } },
    shell: true,
  });
  assert.equal(win.homeDir, "C:\\Users\\fixture");
  assert.equal(win.tool.command, "C:\\Program Files\\codex\\codex.exe");
  assert.equal(win.tool.shell, true);
  assert.equal(win.model?.contextTokens, undefined, "row without context");
  assert.deepEqual(win.passthroughArgs, ["--yolo"]);
  assert.equal(win.baseEnv.CODEX_HOME, "C:\\c");
  assert.equal(win.profile, "work");
  assert.deepEqual(win.passthroughJson, { "--settings": { a: 1 } });

  assert.equal(fixtureCtx({ model: null }).model, undefined);
  assert.throws(() => fixtureCtx({ model: "not/in-view" }), /not in the view/);
  const filtered = fixtureCtx({
    viewSpec: { name: "hermes", filter: { minContextTokens: 64000, requireKnownContext: true } },
  });
  assert.ok(filtered.view.rows.every((row) => (row.contextTokens ?? 0) >= 64000));
  assert.equal(filtered.view.name, "hermes");
});

// ---------- golden + invariants helper ----------

test("assertGolden writes with update, then compares, and fails on drift or missing file", () => {
  const dir = mkdtempSync(join(tmpdir(), "olx-golden-"));
  try {
    const plan = createPlan("sample", { argv: ["a"] });
    assert.throws(() => assertGolden("sample", "default", plan, { dir }), /missing golden/);
    assertGolden("sample", "default", plan, { dir, update: true });
    const path = goldenPath("sample", "default", dir);
    assert.ok(existsSync(path));
    assert.equal(readFileSync(path, "utf8"), `${json(plan, { indent: 2 })}\n`);
    assertGolden("sample", "default", plan, { dir });
    assert.throws(
      () => assertGolden("sample", "default", createPlan("sample", { argv: ["b"] }), { dir }),
      /differs from golden/
    );
    assert.throws(() => goldenPath("../x", "y", dir), /golden names/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("checkPlanInvariants accepts a good adapter plan", () => {
  const adapter = defineAdapter(sampleAdapter());
  const ctx = fixtureCtx({ tool: "sample", viewSpec: adapter.capabilities.modelList.view });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, {
    adapter,
    injectedIds: (p: Plan) => JSON.parse(p.tempFiles[0].contents ?? "{}").models,
  });
});

test("checkPlanInvariants catches each broken invariant", () => {
  const adapter = defineAdapter(sampleAdapter());
  const ctx = fixtureCtx({ tool: "sample", viewSpec: adapter.capabilities.modelList.view });
  const good = (): Plan => adapter.plan(ctx);
  const cases: Array<[string, (plan: Plan) => void, RegExp, Record<string, unknown>?]> = [
    ["token undeclared", (p) => (p.secretSites = []), /not in secretSites/],
    ["token in argv", (p) => p.argv.push("${TOKEN}"), /never be in argv/],
    ["absolute file", (p) => (p.tempFiles[0].path = "/etc/x"), /stays under its root/],
    ["escaping file", (p) => (p.tempFiles[0].path = "../x"), /stays under its root/],
    ["duplicate file", (p) => p.tempFiles.push({ ...p.tempFiles[0] }), /written twice/],
    ["needsTempDir", (p) => (p.needsTempDir = false), /needsTempDir/],
    ["bad env key", (p) => (p.env.set["BAD-KEY"] = "x"), /is valid/],
    ["set and unset", (p) => p.env.unset.push("SAMPLE_KEY"), /both set and unset/],
    ["hash", (p) => (p.modelList.viewHash = "0".repeat(64)), /viewHash/],
    ["strategy", (p) => (p.modelList.strategy = "both"), /strategy matches/, { adapter }],
    [
      "server-view injected",
      (p) => {
        p.modelList.strategy = "server-view";
        p.modelList.injected = 1;
      },
      /inject nothing/,
    ],
    ["planVersion", (p) => ((p as { planVersion: number }).planVersion = 2), /planVersion/],
    ["non-JSON", (p) => ((p as unknown as { notes: unknown[] }).notes = [() => 1]), /plain JSON/],
  ];
  for (const [name, mutate, message, options] of cases) {
    const plan = good();
    mutate(plan);
    assert.throws(() => checkPlanInvariants(plan, ctx, options ?? {}), message, name);
  }

  // Injected ids that re-filter the view, or ignore the limit, are caught.
  assert.throws(
    () => checkPlanInvariants(good(), ctx, { injectedIds: [ctx.view.rows[1].id], injectLimit: 2 }),
    /injected ids equal ctx\.view ids/
  );
  assert.throws(
    () =>
      checkPlanInvariants(good(), ctx, { injectedIds: ctx.view.rows.slice(0, 2).map((r) => r.id) }),
    /injected ids equal ctx\.view ids/
  );

  // Non-deterministic plan() is caught.
  let calls = 0;
  const flaky = defineAdapter(
    sampleAdapter({
      plan(c: ReturnType<typeof fixtureCtx>) {
        calls++;
        return createPlan("sample", {
          notes: [`call ${calls}`],
          modelList: { strategy: "inject", viewHash: c.view.hash, injected: 0 },
        });
      },
    })
  );
  assert.throws(
    () => checkPlanInvariants(flaky.plan(ctx), ctx, { adapter: flaky }),
    /deterministic/
  );
});

// ---------- shared Zod schemas ----------

test("viewSelectSpecSchema accepts the section 2.3 / 14 adapter views and rejects junk", () => {
  const valid = [
    {
      name: "claude-code",
      filter: { kinds: ["chat"], capabilities: ["tools"], minContextTokens: 32000 },
      order: "preferences",
    },
    { name: "hermes", filter: { minContextTokens: 64000, requireKnownContext: true } },
    {
      name: "codex",
      filter: {
        protocols: ["openai-responses"],
        includeIds: ["openai/*"],
        excludeIds: ["*-mini"],
        combos: false,
      },
      limit: 200,
    },
    { name: "goose", filter: {} },
  ];
  for (const spec of valid) assert.ok(viewSelectSpecSchema.safeParse(spec).success, spec.name);
  const invalid = [
    { filter: {} },
    { name: "Bad Name", filter: {} },
    { name: "x" },
    { name: "x", filter: { protocols: ["smtp"] } },
    { name: "x", filter: { kinds: ["video"] } },
    { name: "x", filter: { minContextTokens: -1 } },
    { name: "x", filter: { minContextTokens: 1.5 } },
    { name: "x", filter: { unknown: true } },
    { name: "x", filter: {}, order: "random" },
    { name: "x", filter: {}, limit: -1 },
    { name: "x", filter: {}, extra: 1 },
  ];
  for (const spec of invalid) {
    assert.equal(viewSelectSpecSchema.safeParse(spec).success, false, JSON.stringify(spec));
  }
});

test("serverViewPresentationSchema and modelListSpecSchema", () => {
  assert.ok(serverViewPresentationSchema.safeParse({ shape: "codex" }).success);
  assert.ok(serverViewPresentationSchema.safeParse({ prefix: "claude/", mode: "replace" }).success);
  assert.ok(!serverViewPresentationSchema.safeParse({ prefix: "claude" }).success);
  assert.ok(!serverViewPresentationSchema.safeParse({ mode: "mirror" }).success);
  assert.ok(!serverViewPresentationSchema.safeParse({ shape: "xml" }).success);

  const view = { name: "v", filter: {} };
  assert.ok(modelListSpecSchema.safeParse({ strategy: "inject", view, injectLimit: 200 }).success);
  assert.ok(
    modelListSpecSchema.safeParse({ strategy: "both", view, serve: { shape: "codex" } }).success
  );
  assert.ok(modelListSpecSchema.safeParse({ strategy: "server-view", view }).success);
  assert.ok(!modelListSpecSchema.safeParse({ strategy: "inject", view, serve: {} }).success);
  assert.ok(
    !modelListSpecSchema.safeParse({ strategy: "server-view", view, injectLimit: 5 }).success
  );
  assert.ok(!modelListSpecSchema.safeParse({ strategy: "inject" }).success);
  assert.ok(modelListSpecSchema.safeParse(sampleAdapter().capabilities.modelList).success);
});

test("launchSessionPatchSchema checks ids, uniqueness and the hash", () => {
  const ids = ["a", "b"];
  const view = {
    hash: viewHash(ids),
    ids,
    serve: { shape: "codex" },
    spec: { name: "codex", filter: {} },
  };
  assert.ok(launchSessionPatchSchema.safeParse({ view }).success);
  assert.ok(launchSessionPatchSchema.safeParse({ heartbeat: true }).success);
  assert.ok(launchSessionPatchSchema.safeParse({ heartbeat: true, view }).success);
  assert.ok(launchSessionPatchSchema.safeParse({ view: { hash: viewHash([]), ids: [] } }).success);
  assert.ok(!launchSessionPatchSchema.safeParse({}).success);
  assert.ok(!launchSessionPatchSchema.safeParse({ heartbeat: false }).success);
  assert.ok(
    !launchSessionPatchSchema.safeParse({ view: { ...view, hash: viewHash(["b", "a"]) } }).success
  );
  assert.ok(!launchSessionPatchSchema.safeParse({ view: { ...view, hash: "ABC" } }).success);
  assert.ok(
    !launchSessionPatchSchema.safeParse({ view: { hash: viewHash(["a", "a"]), ids: ["a", "a"] } })
      .success
  );
  assert.ok(!launchSessionPatchSchema.safeParse({ view: { ...view, extra: 1 } }).success);
  assert.ok(!launchSessionPatchSchema.safeParse({ view, other: 1 }).success);
});

// ---------- launcher assets (contract 1.1) ----------

test("validateAssetPath accepts relative forward-slash paths and rejects escapes", () => {
  assert.equal(ASSET_ROOT, "bin/cli/launch/assets");
  for (const good of ["codex/base-instructions.md", "pi/omniroute.ts", "a.txt", "a/b/c_d-e.1"]) {
    assert.equal(validateAssetPath(good), good);
  }
  const bad = [
    "",
    "/abs/x.md",
    "C:/x.md",
    "C:\\x.md",
    "codex\\base.md",
    "../x.md",
    "a/../b.md",
    "./a.md",
    "a/./b.md",
    "a//b.md",
    "a/",
    ".hidden",
    "a/.hidden",
    "a b.md",
    "a:b.md",
    "a}b.md",
    undefined,
    42,
  ];
  for (const path of bad) {
    assert.throws(
      () => validateAssetPath(path as string),
      (e: unknown) => isLaunchError(e),
      String(path)
    );
  }
});

test("assetRef builds tokens that findAssetRefs parses back", () => {
  assert.equal(assetRef("codex/base-instructions.md"), "${ASSET:codex/base-instructions.md}");
  assert.equal(
    assetRef("codex/base-instructions.md", { json: true }),
    "${ASSET:codex/base-instructions.md:json}"
  );
  assert.throws(
    () => assetRef("../x"),
    (e: unknown) => isLaunchError(e)
  );
  const contents = `{"a":${assetRef("x/a.md", { json: true })},"b":"${assetRef("y.txt")}"}`;
  assert.deepEqual(findAssetRefs(contents), [
    { token: "${ASSET:x/a.md:json}", path: "x/a.md", json: true },
    { token: "${ASSET:y.txt}", path: "y.txt", json: false },
  ]);
  assert.deepEqual(findAssetRefs(undefined), []);
  assert.deepEqual(findAssetRefs("${TMP}/x ${TOKEN} ${OMNIROUTE_API_KEY:-x}"), []);
});

test("expandAssetRefs inserts raw or JSON-quoted text and keeps asset text literal", () => {
  const text = 'Line "one"\n\tsecond ${TOKEN} \\ end';
  const read = (relpath: string) => {
    assert.equal(relpath, "codex/base-instructions.md");
    return text;
  };
  const entry = `{"slug":"m","base_instructions":${assetRef("codex/base-instructions.md", { json: true })}}`;
  const expanded = expandAssetRefs(entry, read);
  assert.deepEqual(JSON.parse(expanded), { slug: "m", base_instructions: text });
  assert.equal(expandAssetRefs(`<${assetRef("codex/base-instructions.md")}>`, read), `<${text}>`);
  assert.equal(expandAssetRefs("no tokens ${TMP}", read), "no tokens ${TMP}");
  let called = false;
  assert.throws(
    () =>
      expandAssetRefs("${ASSET:a/../b}", () => {
        called = true;
        return "";
      }),
    (e: unknown) => isLaunchError(e)
  );
  assert.equal(called, false, "invalid path rejected before reading");
});

test("createPlan and findTokenSites accept asset-backed files", () => {
  const plan = createPlan("x", {
    tempFiles: [{ path: "ext/omniroute.ts", asset: "pi/omniroute.ts" }],
  });
  assert.equal(plan.needsTempDir, true);
  assert.deepEqual(findTokenSites(plan), []);
});

test("checkPlanInvariants accepts asset files and asset tokens, rejects misuse", () => {
  const assetsDir = mkdtempSync(join(tmpdir(), "olx-assets-"));
  try {
    mkdirSync(join(assetsDir, "codex"));
    writeFileSync(join(assetsDir, "codex", "base-instructions.md"), "You are Codex.");
    writeFileSync(join(assetsDir, "codex", "ext.ts"), "export default 1;");
    const ctx = fixtureCtx();
    const base = (): Plan =>
      createPlan("x", {
        tempFiles: [
          {
            path: "model.json",
            root: "state",
            contents: `{"models":[{"base_instructions":${assetRef("codex/base-instructions.md", { json: true })}}]}`,
            format: "json",
          },
          { path: "ext.ts", asset: "codex/ext.ts", format: "ts" },
        ],
        modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 0 },
      });
    checkPlanInvariants(base(), ctx, { assetsDir });
    // Existence check can be skipped, path validation cannot.
    checkPlanInvariants(base(), ctx, { assetsDir: false });

    const cases: Array<[string, (plan: Plan) => void, RegExp]> = [
      ["missing asset file", (p) => (p.tempFiles[1].asset = "codex/nope.ts"), /exists/],
      [
        "missing token asset",
        (p) => (p.tempFiles[0].contents = assetRef("codex/none.md")),
        /exists/,
      ],
      ["both", (p) => (p.tempFiles[1].contents = "x"), /exactly one of contents \/ asset/],
      ["neither", (p) => delete p.tempFiles[1].asset, /exactly one of contents \/ asset/],
      ["bad asset path", (p) => (p.tempFiles[1].asset = "../etc/passwd"), /is valid/],
      ["bad token path", (p) => (p.tempFiles[0].contents = "${ASSET:a/../b}"), /is valid/],
      ["malformed token", (p) => (p.tempFiles[0].contents = "${ASSET:a b}"), /well formed/],
      [
        "mergeBase with asset",
        (p) => (p.tempFiles[1].mergeBase = { path: "/x.json", format: "json" }),
        /mergeBase requires contents/,
      ],
      [
        "token in env",
        (p) => (p.env.set.X = assetRef("codex/ext.ts")),
        /only valid inside tempFiles contents/,
      ],
      [
        "token in argv",
        (p) => p.argv.push(assetRef("codex/ext.ts")),
        /only valid inside tempFiles contents/,
      ],
    ];
    for (const [name, mutate, message] of cases) {
      const plan = base();
      mutate(plan);
      assert.throws(() => checkPlanInvariants(plan, ctx, { assetsDir }), message, name);
    }
  } finally {
    rmSync(assetsDir, { recursive: true, force: true });
  }
  assert.ok(ASSETS_DIR.endsWith(join("bin", "cli", "launch", "assets")));
});

test("defineAdapter accepts contract minor 1 to 3 and refuses minor 4", () => {
  assert.ok(defineAdapter(sampleAdapter({ contract: { major: 1, minor: 1 } })));
  assert.ok(defineAdapter(sampleAdapter({ contract: { major: 1, minor: 2 } })));
  assert.ok(defineAdapter(sampleAdapter({ contract: { major: 1, minor: 3 } })));
  assert.throws(
    () => defineAdapter(sampleAdapter({ contract: { major: 1, minor: 4 } })),
    /contract\.minor/
  );
});
