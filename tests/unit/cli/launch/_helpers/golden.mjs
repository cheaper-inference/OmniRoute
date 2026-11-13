// Golden-file assertions and plan invariants for adapter tests (architecture 5.1, 16.2 step 1).

import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ASSET_ROOT,
  PLACEHOLDERS,
  findAssetRefs,
  PLAN_VERSION,
  findTokenSites,
  isValidEnvKey,
  json,
  validateAssetPath,
} from "../../../../../bin/cli/launch/contract.mjs";

export const GOLDEN_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "golden");
/** Absolute path of bin/cli/launch/assets (contract ASSET_ROOT). */
export const ASSETS_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
  ASSET_ROOT
);

function assertAsset(relpath, where, assetsDir) {
  assert.doesNotThrow(
    () => validateAssetPath(relpath),
    `asset path ${relpath} in ${where} is valid`
  );
  if (assetsDir !== false) {
    assert.ok(
      existsSync(join(assetsDir, relpath)),
      `asset ${relpath} (${where}) exists in ${assetsDir}`
    );
  }
}

const NAME_PART = /^[a-z0-9][a-z0-9._-]*$/;

/** Path of `tests/unit/cli/launch/golden/<id>.<case>.json`. */
export function goldenPath(id, caseName, dir = GOLDEN_DIR) {
  if (!NAME_PART.test(id) || !NAME_PART.test(caseName)) {
    throw new Error(`golden names must match ${NAME_PART}: ${id}.${caseName}`);
  }
  return join(dir, `${id}.${caseName}.json`);
}

/** Canonical golden text: sorted keys, 2-space indent, trailing newline. */
export function serializeGolden(plan) {
  return `${json(plan, { indent: 2 })}\n`;
}

/**
 * Deep-equal `plan` against its golden file. `UPDATE_GOLDEN=1` (re)writes the file instead.
 * @param {string} id adapter id
 * @param {string} caseName e.g. "default", "win32", "no-model"
 * @param {unknown} plan
 * @param {{ dir?: string, update?: boolean }} [options] test overrides
 */
export function assertGolden(id, caseName, plan, options = {}) {
  const path = goldenPath(id, caseName, options.dir);
  const update = options.update ?? process.env.UPDATE_GOLDEN === "1";
  const text = serializeGolden(plan);
  if (update) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
    return;
  }
  if (!existsSync(path)) {
    assert.fail(`missing golden ${path}; run with UPDATE_GOLDEN=1 to create it`);
  }
  const expected = JSON.parse(readFileSync(path, "utf8"));
  assert.deepStrictEqual(JSON.parse(text), expected, `plan differs from golden ${path}`);
}

function isRelativeSafe(path) {
  const s = String(path);
  if (s === "" || s.startsWith("/") || s.startsWith("\\") || /^[A-Za-z]:/.test(s)) return false;
  return !s.split(/[\\/]/).some((part) => part === ".." || part === "" || part === ".");
}

function mentionsPlaceholder(plan, placeholder) {
  const haystack = JSON.stringify([plan.argv, plan.env, plan.teardown, plan.preflight]);
  return haystack.includes(placeholder);
}

/**
 * Boundary-test invariants of section 16.2 step 1, for one (plan, ctx) pair.
 *
 * @param {import("../../../../../bin/cli/launch/contract.d.ts").LaunchPlan} plan
 * @param {import("../../../../../bin/cli/launch/contract.d.ts").LaunchContext} ctx
 * @param {object} [options]
 * @param {{ plan(ctx: object): object, capabilities?: object }} [options.adapter] when given,
 *   plan() is re-run twice and must deep-equal `plan` (determinism), and the declared
 *   strategy must match `plan.modelList.strategy`
 * @param {string[] | ((plan: object) => string[])} [options.injectedIds] the ids the plan tells
 *   the tool about (extracted by the adapter test); must equal ctx.view ids cut by injectLimit
 * @param {boolean} [options.serverView] server-view adapters: asserts injected === 0 and that
 *   `injectedIds` (when given) is empty; skips the full-view comparison
 * @param {string} [options.singleModel] single-model tools: the chosen model id. Asserts
 *   injected === 1, ctx.model.id equals it and `injectedIds` (when given) deep-equals [id]; skips
 *   the full-view comparison
 * @param {number} [options.injectLimit] defaults to adapter.capabilities.modelList.injectLimit
 * @param {string | false} [options.assetsDir] where referenced assets must exist (default
 *   ASSETS_DIR); false skips the existence check but still validates paths
 */
export function checkPlanInvariants(plan, ctx, options = {}) {
  assert.equal(plan.planVersion, PLAN_VERSION, "planVersion");
  assert.equal(typeof plan.tool, "string", "plan.tool");
  assert.ok(Array.isArray(plan.argv), "argv is an array");
  plan.argv.forEach((arg, i) => assert.equal(typeof arg, "string", `argv[${i}] is a string`));

  // JSON-serializable data, nothing else.
  assert.deepStrictEqual(JSON.parse(JSON.stringify(plan)), plan, "plan is plain JSON data");

  // env keys valid, no key both set and unset.
  for (const key of Object.keys(plan.env.set)) {
    assert.ok(isValidEnvKey(key), `env.set key ${key} is valid`);
    assert.equal(typeof plan.env.set[key], "string", `env.set.${key} is a string`);
  }
  for (const key of plan.env.unset) {
    assert.ok(isValidEnvKey(key), `env.unset key ${key} is valid`);
    assert.ok(!(key in plan.env.set), `${key} is both set and unset`);
  }

  // Every ${TOKEN} is a declared secret site; never in argv (13.3 item 5).
  const declared = new Set(plan.secretSites.map((site) => `${site.kind}:${site.key}`));
  for (const site of findTokenSites(plan)) {
    assert.notEqual(
      site.kind,
      "arg",
      `${PLACEHOLDERS.TOKEN} must never be in argv (index ${site.key})`
    );
    assert.ok(
      declared.has(`${site.kind}:${site.key}`),
      `${PLACEHOLDERS.TOKEN} at ${site.kind}:${site.key} is not in secretSites`
    );
  }

  // Asset tokens only inside TempFileSpec.contents.
  const assetsDir = options.assetsDir ?? ASSETS_DIR;
  assert.ok(
    !JSON.stringify([plan.argv, plan.env, plan.teardown, plan.preflight]).includes("${ASSET:"),
    "asset tokens are only valid inside tempFiles contents"
  );

  // Files only under ${TMP} / ${STATE}.
  const seenPaths = new Set();
  for (const file of plan.tempFiles) {
    assert.ok(isRelativeSafe(file.path), `temp file path ${file.path} stays under its root`);
    assert.ok([undefined, "tmp", "state"].includes(file.root), `temp file root ${file.root}`);
    const hasContents = file.contents !== undefined;
    const hasAsset = file.asset !== undefined;
    assert.ok(hasContents !== hasAsset, `${file.path}: exactly one of contents / asset`);
    if (hasContents) {
      assert.equal(typeof file.contents, "string", `contents of ${file.path} is a string`);
      const refs = findAssetRefs(file.contents);
      assert.equal(
        file.contents.split("${ASSET:").length - 1,
        refs.length,
        `${file.path}: every \${ASSET:...} token is well formed`
      );
      for (const ref of refs) assertAsset(ref.path, file.path, assetsDir);
    } else {
      assert.equal(typeof file.asset, "string", `asset of ${file.path} is a string`);
      assert.equal(file.mergeBase, undefined, `${file.path}: mergeBase requires contents`);
      assertAsset(file.asset, file.path, assetsDir);
    }
    const key = `${file.root ?? "tmp"}:${file.path}`;
    assert.ok(!seenPaths.has(key), `temp file ${key} written twice`);
    seenPaths.add(key);
  }
  const usesTmp =
    plan.tempFiles.some((file) => (file.root ?? "tmp") === "tmp") ||
    mentionsPlaceholder(plan, PLACEHOLDERS.TMP);
  if (usesTmp)
    assert.equal(plan.needsTempDir, true, "plan uses ${TMP} so needsTempDir must be true");

  // Model list bookkeeping.
  assert.equal(plan.modelList.viewHash, ctx.view.hash, "modelList.viewHash equals ctx.view.hash");
  const declaredStrategy = options.adapter?.capabilities?.modelList?.strategy;
  if (declaredStrategy) {
    assert.equal(plan.modelList.strategy, declaredStrategy, "plan strategy matches capabilities");
  }
  if (plan.modelList.strategy === "server-view") {
    assert.equal(plan.modelList.injected, 0, "server-view plans inject nothing");
  }
  const resolveIds = () =>
    typeof options.injectedIds === "function" ? options.injectedIds(plan) : options.injectedIds;
  if (options.serverView && options.singleModel !== undefined) {
    assert.fail("checkPlanInvariants: serverView and singleModel are mutually exclusive");
  }
  if (options.serverView) {
    assert.equal(plan.modelList.injected, 0, "serverView: modelList.injected is 0");
    if (options.injectedIds !== undefined) {
      assert.deepStrictEqual(resolveIds(), [], "serverView: injected ids are empty");
    }
  } else if (options.singleModel !== undefined) {
    assert.equal(plan.modelList.injected, 1, "singleModel: modelList.injected is 1");
    assert.equal(ctx.model?.id, options.singleModel, "singleModel: ctx.model is the chosen id");
    if (options.injectedIds !== undefined) {
      assert.deepStrictEqual(resolveIds(), [options.singleModel], "singleModel: injected ids");
    }
  } else if (options.injectedIds !== undefined) {
    const injected = resolveIds();
    const limit = options.injectLimit ?? options.adapter?.capabilities?.modelList?.injectLimit;
    const viewIds = ctx.view.rows.map((row) => row.id);
    const expected = typeof limit === "number" ? viewIds.slice(0, limit) : viewIds;
    assert.deepStrictEqual(
      injected,
      expected,
      "injected ids equal ctx.view ids cut by injectLimit"
    );
    assert.equal(plan.modelList.injected, expected.length, "modelList.injected count");
  }

  // Deterministic across two calls.
  if (options.adapter) {
    const first = options.adapter.plan(ctx);
    const second = options.adapter.plan(ctx);
    assert.deepStrictEqual(first, second, "plan() is deterministic");
    assert.deepStrictEqual(first, plan, "plan() result equals the plan under test");
  }
}
