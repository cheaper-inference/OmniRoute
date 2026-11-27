// tests/unit/build/sqlite-rebuild-plan.test.mjs
//
// Deterministic unit tests for scripts/build/sqliteRebuildPlan.mjs — the pure
// decision logic behind the better-sqlite3 repair in scripts/build/postinstall.mjs
// (#20998 finding 3, #21001).
//
// Everything is injected (resolver, existence probe, environment), so these tests
// never run the hook, never spawn npm and never touch the network. They cover the
// three layouts the review flagged — global install, hoisted install, nested
// install — plus the refusal to rebuild a compile-input-less tree.
import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";

import {
  localRebuildEnv,
  planBetterSqliteRebuild,
} from "../../../scripts/build/sqliteRebuildPlan.mjs";

const PKG = "better-sqlite3";
const SPEC = `${PKG}/package.json`;

/** Build a plan from a fake install layout. */
function planFor({ resolved, compileInputs = true, env = {} }) {
  const existing = new Set();
  if (resolved && compileInputs) {
    existing.add(join(resolved, "binding.gyp"));
  }
  return planBetterSqliteRebuild({
    resolvePackageJson: (spec) => {
      assert.equal(spec, SPEC, "the planner must resolve the locked package's own manifest");
      if (!resolved) throw new Error(`Cannot find module '${SPEC}'`);
      return join(resolved, "package.json");
    },
    exists: (path) => existing.has(path),
    env,
  });
}

const GLOBAL_ENV = {
  PATH: "/usr/bin:/bin",
  HOME: "/root",
  npm_config_cache: "/root/.npm",
  npm_config_global: "true",
  npm_config_location: "global",
  npm_config_prefix: "/usr/local",
  npm_config_local_prefix: "/usr/local/lib/node_modules/omniroute",
  npm_config_globalconfig: "/usr/local/etc/npmrc",
  npm_config_global_prefix: "/usr/local",
  NPM_CONFIG_GLOBAL: "true",
  GYP_DEFINES: "android_ndk_path=''",
};

// ── layout resolution ────────────────────────────────────────────────────────

test("plan: a nested install rebuilds inside the package's own install root", () => {
  const root = join("/proj", "node_modules", "omniroute");
  const pkgDir = join(root, "node_modules", PKG);
  const plan = planFor({ resolved: pkgDir });
  assert.equal(plan.action, "rebuild");
  assert.equal(plan.cwd, root);
  assert.equal(plan.packageDir, pkgDir);
  assert.equal(plan.binaryFrom, join(pkgDir, "build", "Release", "better_sqlite3.node"));
});

test("plan: a HOISTED install rebuilds at the hoisting root, not at the package dir", () => {
  // npm workspaces / flat installs put better-sqlite3 next to omniroute, so
  // ROOT/node_modules/better-sqlite3 does not exist. Resolving through the
  // module resolver (instead of probing ROOT) is what makes this work.
  const root = join("/proj", "node_modules", "omniroute");
  const hoisted = join("/proj", "node_modules", PKG);
  const plan = planFor({ resolved: hoisted });
  assert.equal(plan.action, "rebuild");
  assert.equal(plan.cwd, join("/proj"));
  assert.notEqual(plan.cwd, root, "must not rebuild in the nested package dir");
  assert.equal(plan.binaryFrom, join(hoisted, "build", "Release", "better_sqlite3.node"));
});

test("plan: a GLOBAL install rebuilds in the global node_modules parent", () => {
  const globalRoot = join("/usr", "local", "lib", "node_modules");
  const plan = planFor({ resolved: join(globalRoot, PKG), env: GLOBAL_ENV });
  assert.equal(plan.action, "rebuild");
  // cwd is the directory OWNING node_modules — npm rebuild reads ./node_modules.
  assert.equal(plan.cwd, join("/usr", "local", "lib"));
});

test("plan: the rebuild environment can never be redirected to the global tree", () => {
  const plan = planFor({
    resolved: join("/usr", "local", "lib", "node_modules", PKG),
    env: GLOBAL_ENV,
  });
  assert.equal(plan.action, "rebuild");
  for (const key of [
    "npm_config_global",
    "npm_config_location",
    "npm_config_prefix",
    "npm_config_local_prefix",
    "npm_config_globalconfig",
    "npm_config_global_prefix",
    "NPM_CONFIG_GLOBAL",
  ]) {
    assert.ok(!(key in plan.env) || key === "npm_config_location", `${key} must be stripped`);
  }
  assert.equal(plan.env.npm_config_location, "project", "location is pinned to the project tree");
  // Toolchain / cache context survives — stripping must not break the build.
  assert.equal(plan.env.PATH, GLOBAL_ENV.PATH);
  assert.equal(plan.env.HOME, GLOBAL_ENV.HOME);
  assert.equal(plan.env.npm_config_cache, GLOBAL_ENV.npm_config_cache);
  assert.equal(plan.env.GYP_DEFINES, GLOBAL_ENV.GYP_DEFINES);
});

test("plan: the caller's environment object is not mutated", () => {
  const env = { ...GLOBAL_ENV };
  const snapshot = { ...env };
  planFor({ resolved: join("/proj", "node_modules", PKG), env });
  assert.deepEqual(env, snapshot);
});

test("localRebuildEnv: strips location keys case-insensitively and keeps the rest", () => {
  const out = localRebuildEnv({
    NPM_CONFIG_PREFIX: "/opt",
    npm_config_GLOBAL: "true",
    npm_config_registry: "https://registry.npmjs.org/",
    PATH: "/bin",
  });
  assert.ok(!("NPM_CONFIG_PREFIX" in out));
  assert.ok(!("npm_config_GLOBAL" in out));
  assert.equal(out.npm_config_registry, "https://registry.npmjs.org/");
  assert.equal(out.PATH, "/bin");
  assert.equal(out.npm_config_location, "project");
});

// ── refusal paths: no compile inputs, no package, no dist fallback ───────────

test("plan: a compile-input-less tree is NEVER rebuilt (no dist/ source fallback)", () => {
  // The Next-traced dist/node_modules/better-sqlite3 copy carries lib/ + build/
  // only. Rebuilding it cannot work, and fetching a fresh package instead is
  // exactly the unpinned network install #21001 removes.
  const traced = join("/proj", "node_modules", "omniroute", "dist", "node_modules", PKG);
  const plan = planFor({ resolved: traced, compileInputs: false });
  assert.equal(plan.action, "skip");
  assert.equal(plan.reason, "no-compile-inputs");
  assert.equal(plan.cwd, undefined);
  assert.equal(plan.command, undefined, "the planner never produces a shell command");
});

test("plan: an unresolvable (skipped optional) package is skipped, not installed", () => {
  const plan = planFor({ resolved: null });
  assert.equal(plan.action, "skip");
  assert.equal(plan.reason, "unresolved");
});

test("plan: a non-string resolver result is skipped", () => {
  const plan = planBetterSqliteRebuild({
    resolvePackageJson: () => undefined,
    exists: () => true,
    env: {},
  });
  assert.equal(plan.action, "skip");
  assert.equal(plan.reason, "unresolved");
});

test("plan: a layout outside node_modules is refused", () => {
  const plan = planFor({ resolved: join("/opt", "pkgs", PKG) });
  assert.equal(plan.action, "skip");
  assert.equal(plan.reason, "unexpected-layout");
});

test("plan: no plan variant ever names a registry install or a dist rebuild", () => {
  const realLayouts = [
    join("/proj", "node_modules", PKG),
    join("/proj", "node_modules", "omniroute", "node_modules", PKG),
    join("/usr", "local", "lib", "node_modules", PKG),
  ];
  for (const resolved of realLayouts) {
    for (const compileInputs of [true, false]) {
      const plan = planFor({ resolved, compileInputs, env: GLOBAL_ENV });
      const serialized = JSON.stringify(plan);
      assert.doesNotMatch(serialized, /npm install|npm i |registry\.npmjs\.org/);
      assert.ok(!Object.hasOwn(plan, "command"), "planning must not build shell commands");
      if (plan.action === "rebuild") {
        assert.ok(!plan.cwd.includes("dist"), `rebuild cwd must not be dist: ${plan.cwd}`);
      }
    }
  }

  // The traced dist/ copy is only ever a SKIP: it has no compile inputs, and the
  // resolver (which searches node_modules chains, never dist/) cannot select it.
  const traced = planFor({
    resolved: join("/proj", "node_modules", "omniroute", "dist", "node_modules", PKG),
    compileInputs: false,
  });
  assert.equal(traced.action, "skip");
  assert.equal(traced.reason, "no-compile-inputs");
});
