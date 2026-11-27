// tests/unit/security-remediation-20998.test.mjs
//
// Regression guards for the four remediations of issue #20998 (release/v3.8.55
// security gate, base commit 5ffa68e835442a12ed1204a2eebf4076c298aecb):
//
//   1. P1 — undici 8.12.3 / 7.30.1 are affected by CVE-2026-116592
//      (GHSA-mqg3-3v4r-cm32): an originless Agent composing the redirect +
//      shared-cache interceptors caches a redirect-laundered response under the
//      trusted request key, dropping an intermediate hop's Vary / no-cache.
//      Fixed in 8.12.4 and 7.30.2. Both release lines must stay above the fix,
//      and the manifest floors must not let a fresh resolve land back on a
//      vulnerable version.
//   2. P1 — Dockerfile.bun shipped no REQUIRE_API_KEY default, so a published
//      Bun image with `-p 20128:20128` was keyless AND world-reachable. The
//      Node Dockerfile already defaults to true (#13679); the Bun image must
//      match, with an explicit documented override.
//   3. P2 — the Android/Termux SQLite repair in scripts/build/postinstall.mjs
//      ran `npm install better-sqlite3 --build-from-source --force` inside
//      dist/, which has no lockfile: an unpinned registry install outside the
//      root package-lock.json integrity guarantees. It must rebuild the
//      already-installed, locked package instead.
//   4. P2 — the docs-lint CI job ran `npx --yes markdownlint-cli2`, downloading
//      whatever version the registry served that day. The tool must be a
//      pinned manifest/lockfile dependency executed from node_modules/.bin.
//
// Follow-up review findings (independent review of the first cut, REQUEST_CHANGES):
//   #20999 — the undici guards must cover EVERY audit scope lockfile (electron and
//            @omniroute/opencode-plugin-v2 shipped affected copies too).
//   #21001 — the transitive postinstall warm-up (scripts/postinstall.mjs →
//            bin/cli/runtime/sqliteRuntime.mjs) also performed an unpinned
//            `npm install better-sqlite3@^13.0.2`; the Android rebuild must
//            resolve hoisted/global installs, strip npm's global-location env,
//            and never fall back to a compile-input-less dist/ source rebuild.
//   #21002 — config/quality/gate-manifest.json mirrors every lint/test alias
//            command; lint:md must stay in sync with package.json.
//
// Every assertion reads source/manifests as text: importing postinstall.mjs
// would execute the real hook (spawning npm, touching ~/.omniroute), and this
// file must stay runnable without an installed dependency tree. Behavioural
// coverage lives in tests/unit/build/sqlite-rebuild-plan.test.mjs (pure planner)
// and tests/unit/runtime/postinstall-warmup-no-install.test.mjs (sandboxed npm).
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { AUDIT_SCOPES } from "../../scripts/quality/audit-dependencies.mjs";

const ROOT = new URL("../../", import.meta.url);
const read = (rel) => readFileSync(new URL(rel, ROOT), "utf8");
const readJson = (rel) => JSON.parse(read(rel));

/** Numeric [major, minor, patch] tuple of a plain "x.y.z" version. */
function tuple(version) {
  const parts = String(version)
    .split(".")
    .map((n) => Number.parseInt(n, 10));
  assert.equal(parts.length, 3, `expected a plain x.y.z version, got ${version}`);
  assert.ok(
    parts.every((n) => Number.isSafeInteger(n)),
    `non-numeric version component in ${version}`
  );
  return parts;
}

/** true when `version` >= `floor` (both plain x.y.z). */
function atLeast(version, floor) {
  const a = tuple(version);
  const b = tuple(floor);
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return true;
}

/** Minimum version a "^x.y.z" (or exact "x.y.z") range can resolve to. */
function rangeFloor(range) {
  const match = /^[\^~]?(\d+\.\d+\.\d+)$/.exec(String(range).trim());
  assert.ok(match, `expected a ^x.y.z / x.y.z range, got ${range}`);
  return match[1];
}

// The "must not contain" guards below check EXECUTABLE content: the remediation
// comments quote the removed command on purpose (reviewers need the history), so
// full-line comments are stripped before matching.

/** JS/MJS source without block comments and full-line // comments. */
function stripJsComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
}

/** YAML source without full-line # comments. */
function stripYamlComments(source) {
  return source
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");
}

// ── 1. undici (CVE-2026-116592 / GHSA-mqg3-3v4r-cm32) ────────────────────────

// OSV affected ranges: 7.30.1 (fixed 7.30.2) and 8.12.2–8.12.3 (fixed 8.12.4).
const UNDICI_FIXED = { 7: "7.30.2", 8: "8.12.4" };
const UNDICI_VULNERABLE = new Set(["7.30.1", "8.12.2", "8.12.3"]);

function lockedUndiciEntries(scope = ".") {
  const lock = readJson(scope === "." ? "package-lock.json" : `${scope}/package-lock.json`);
  return Object.entries(lock.packages ?? {})
    .filter(([path]) => /(^|\/)node_modules\/undici$/.test(path))
    .map(([path, entry]) => ({ scope, path, version: entry.version }));
}

/** Every undici copy in every lockfile the dependency-audit gate covers. */
function allLockedUndiciEntries() {
  return AUDIT_SCOPES.flatMap((scope) => lockedUndiciEntries(scope));
}

test("undici: no locked copy in ANY audit scope is affected by CVE-2026-116592", () => {
  const entries = allLockedUndiciEntries();
  assert.ok(entries.length > 0, "expected undici in the audit-scope lockfiles");
  for (const { scope, path, version } of entries) {
    assert.ok(
      !UNDICI_VULNERABLE.has(version),
      `[${scope}] ${path} resolves undici ${version}, affected by CVE-2026-116592 ` +
        "(cache poisoning / cross-user disclosure via intermediate redirect hops)"
    );
  }
});

test("undici: every locked release line in every scope is at or above its fixed version", () => {
  for (const { scope, path, version } of allLockedUndiciEntries()) {
    const major = tuple(version)[0];
    const floor = UNDICI_FIXED[major];
    if (!floor) continue; // 6.x is not in the advisory's affected ranges
    assert.ok(
      atLeast(version, floor),
      `[${scope}] ${path} resolves undici ${version}; line ${major} must be >= ${floor}`
    );
  }
});

test("undici: the root and every scoped lockfile agree on the fixed release lines", () => {
  // electron ships the 7.x line, @omniroute/opencode-plugin-v2 the 8.x line;
  // both were missed by the first cut of this fix (#20999).
  const electron = lockedUndiciEntries("electron");
  assert.ok(electron.length > 0, "electron/package-lock.json must lock undici");
  for (const entry of electron) {
    assert.equal(tuple(entry.version)[0], 7, `electron stays on the 7.x line: ${entry.version}`);
    assert.ok(atLeast(entry.version, UNDICI_FIXED[7]));
  }
  const pluginV2 = lockedUndiciEntries("@omniroute/opencode-plugin-v2");
  assert.ok(pluginV2.length > 0, "opencode-plugin-v2/package-lock.json must lock undici");
  for (const entry of pluginV2) {
    if (entry.path.includes("node-gyp")) continue; // 6.x, outside the advisory
    assert.equal(tuple(entry.version)[0], 8, `plugin-v2 stays on the 8.x line: ${entry.version}`);
    assert.ok(atLeast(entry.version, UNDICI_FIXED[8]));
  }
});

test("undici: manifest floors cannot resolve back to a vulnerable version", () => {
  const pkg = readJson("package.json");
  const rootRange = pkg.dependencies?.undici;
  assert.ok(rootRange, "undici must stay a direct dependency");
  assert.ok(
    atLeast(rangeFloor(rootRange), UNDICI_FIXED[8]),
    `dependencies.undici "${rootRange}" still allows 8.12.3 — raise the floor to ^8.12.4+`
  );

  // The nested copies come from these overrides; without a floor a fresh
  // `npm install` re-resolves them to the vulnerable 7.30.1.
  const jsdomRange = pkg.overrides?.jsdom?.undici;
  assert.ok(
    jsdomRange && atLeast(rangeFloor(jsdomRange), UNDICI_FIXED[7]),
    `overrides.jsdom.undici "${jsdomRange}" still allows 7.30.1 — raise it to ^7.30.2+`
  );
  const promptfooRange = pkg.overrides?.promptfoo?.["undici@7"];
  assert.ok(
    promptfooRange && atLeast(rangeFloor(promptfooRange), UNDICI_FIXED[7]),
    `overrides.promptfoo["undici@7"] "${promptfooRange}" still allows 7.30.1 — raise it to ^7.30.2+`
  );

  // #20999: the scoped manifests need their own floors, otherwise a fresh
  // `npm install` inside electron/ or @omniroute/opencode-plugin-v2/ re-resolves
  // the vulnerable version even though the root lockfile is clean.
  const electron = readJson("electron/package.json");
  const electronRange = electron.overrides?.undici;
  assert.ok(
    electronRange && atLeast(rangeFloor(electronRange), UNDICI_FIXED[7]),
    `electron overrides.undici "${electronRange}" still allows 7.30.1 — raise it to ^7.30.2+`
  );
  const pluginV2 = readJson("@omniroute/opencode-plugin-v2/package.json");
  const pluginRange =
    pluginV2.overrides?.["undici@8"] ?? pluginV2.overrides?.undici ?? pluginV2.dependencies?.undici;
  assert.ok(
    pluginRange && atLeast(rangeFloor(pluginRange), UNDICI_FIXED[8]),
    `opencode-plugin-v2 must floor undici 8.x at ^8.12.4+ (got "${pluginRange}") — ` +
      "@effect/platform-node pulls ^8.11.2 transitively"
  );
});

// ── 2. Bun container posture ─────────────────────────────────────────────────

/** Split a Dockerfile into its `FROM … AS <name>` stages (order preserved). */
function dockerStages(source) {
  const stages = [];
  let current = null;
  for (const line of source.split("\n")) {
    const from = /^FROM\s+(\S+)(?:\s+AS\s+(\S+))?/i.exec(line.trim());
    if (from) {
      current = { name: from[2] ?? null, base: from[1], body: [] };
      stages.push(current);
      continue;
    }
    if (current) current.body.push(line);
  }
  return stages;
}

const BUN_STAGES = dockerStages(read("Dockerfile.bun"));
const stageBody = (name) => {
  const stage = BUN_STAGES.find((s) => s.name === name);
  assert.ok(stage, `Dockerfile.bun must define a ${name} stage`);
  return stage.body.join("\n");
};

test("Dockerfile.bun ships REQUIRE_API_KEY=true in the RUNNER stage, not the builder", () => {
  // Stage-aware: an ENV in `builder` never reaches the published image, and an
  // ENV in the wrong stage would leave the runtime keyless (#20998 finding 2).
  assert.match(
    stageBody("runner-base"),
    /^ENV REQUIRE_API_KEY=true$/m,
    "the published Bun image must require an API key by default: `docker run -p " +
      "20128:20128 …` passes no --env-file, so an unset flag ships the anonymous " +
      "/v1 proxy keyless AND world-reachable (#13679, #20998)"
  );
  assert.doesNotMatch(
    stageBody("builder"),
    /^ENV REQUIRE_API_KEY=/m,
    "the build stage must not own the runtime auth posture"
  );
});

test("Dockerfile.bun runner-web inherits the keyed runner-base posture", () => {
  const web = BUN_STAGES.find((s) => s.name === "runner-web");
  assert.ok(web, "runner-web stage must exist");
  assert.equal(web.base, "runner-base", "runner-web must inherit runner-base, not a fresh image");
  assert.doesNotMatch(
    web.body.join("\n"),
    /^ENV REQUIRE_API_KEY=/m,
    "runner-web must not redeclare the flag — inheritance is what covers the -web-bun tag"
  );
});

test("Dockerfile.bun documents the explicit keyless override", () => {
  assert.match(
    read("Dockerfile.bun"),
    /-e REQUIRE_API_KEY=false/,
    "the override must be explicit and documented next to the default, matching " +
      "the Node Dockerfile's #13679 comment block"
  );
});

test("Dockerfile.bun never re-enables the keyless default in any stage", () => {
  assert.doesNotMatch(
    read("Dockerfile.bun"),
    /^ENV REQUIRE_API_KEY=(false|0|no)\s*$/m,
    "a keyless ENV in any stage reopens the hole"
  );
  assert.doesNotMatch(
    read("Dockerfile.bun"),
    /^ARG REQUIRE_API_KEY=/m,
    "a build ARG would let the posture be baked off at build time"
  );
});

test("the npm/CLI local-first REQUIRE_API_KEY default stays false (#13679 constraint)", () => {
  assert.match(
    read("src/shared/constants/featureFlagDefinitions.ts"),
    /key:\s*"REQUIRE_API_KEY"[\s\S]{0,200}?defaultValue:\s*"false"/,
    "#20998 changes the shipped container posture only — the local-dev default " +
      "must not move (tests/unit/issue-13679-container-posture-require-api-key.test.ts)"
  );
});

// ── 3. postinstall SQLite repair: no unpinned network install ────────────────

const POSTINSTALL = stripJsComments(read("scripts/build/postinstall.mjs"));

/** Both literals of the `const rebuildCmd = isAndroid ? "…" : "…"` assignment. */
function rebuildCommands() {
  const match = /const rebuildCmd = isAndroid\s*\?\s*"([^"]+)"\s*:\s*"([^"]+)"/.exec(POSTINSTALL);
  assert.ok(match, "the rebuild command assignment must stay a two-literal ternary");
  return [match[1], match[2]];
}

test("postinstall: the SQLite repair never runs `npm install better-sqlite3`", () => {
  assert.doesNotMatch(
    POSTINSTALL,
    /npm install better-sqlite3/,
    "dist/ has no lockfile: `npm install better-sqlite3` resolves the newest " +
      "registry release, unpinned and outside the root lockfile's integrity " +
      "guarantees (#20998 finding 3)"
  );
});

test("postinstall: every executed rebuild command is offline, audit-free and install-free", () => {
  for (const command of rebuildCommands()) {
    assert.match(
      command,
      /^npm (run build-release|rebuild better-sqlite3)( |$)/,
      `not an in-place build/rebuild command: ${command}`
    );
    assert.doesNotMatch(command, /\bnpm (install|i|add)\b/, `registry install: ${command}`);
    assert.match(command, /--offline/, `must not reach the registry: ${command}`);
    assert.match(command, /--no-audit/, `audit is a network round-trip: ${command}`);
    assert.match(command, /--no-fund/, `fund is a network round-trip: ${command}`);
    assert.doesNotMatch(command, /--force/, `--force re-resolves from the registry: ${command}`);
  }
});

test("postinstall: the Android branch invokes better-sqlite3's explicit source-build script", () => {
  // better-sqlite3 13.x sets `"gypfile": false` with no `install` hook, so
  // `npm rebuild --build-from-source` exits without compiling on Android/Termux.
  // Running `npm run build-release` inside `plan.packageDir` invokes `node-gyp
  // rebuild --release --force_build=1` via npm's bundled node-gyp on PATH.
  const [android, other] = rebuildCommands();
  assert.equal(
    android,
    "npm run build-release --offline --no-audit --no-fund",
    "Termux/Android must run better-sqlite3's explicit build-release script offline"
  );
  assert.equal(
    other,
    "npm rebuild better-sqlite3 --offline --no-audit --no-fund",
    "other platforms keep the plain offline rebuild"
  );

  const installedManifest = new URL("node_modules/better-sqlite3/package.json", ROOT);
  if (existsSync(installedManifest)) {
    const sqlitePkg = JSON.parse(readFileSync(installedManifest, "utf8"));
    assert.equal(
      typeof sqlitePkg.scripts?.["build-release"],
      "string",
      "installed better-sqlite3 must expose scripts['build-release']"
    );
    assert.match(
      sqlitePkg.scripts["build-release"],
      /\bnode-gyp\s+rebuild\b/,
      "better-sqlite3 build-release must invoke node-gyp rebuild"
    );
  }
});

test("postinstall: exactly one spawn site, and it runs the planned rebuild", () => {
  const calls = POSTINSTALL.match(/execSync\(/g) ?? [];
  assert.equal(calls.length, 1, "the hook must have a single, guarded spawn site");
  assert.match(POSTINSTALL, /execSync\(rebuildCmd, \{/, "the spawn must use the guarded command");
  assert.match(
    POSTINSTALL,
    /const rebuildCwd =\s*plan\.action === "rebuild" \? \(isAndroid \? plan\.packageDir : plan\.cwd\) : ROOT;/,
    "rebuildCwd must guard on plan.action === 'rebuild' and select packageDir on Android, cwd elsewhere"
  );
  assert.match(POSTINSTALL, /cwd: rebuildCwd,/, "the cwd must come from the planner, not dist/");
  assert.doesNotMatch(
    POSTINSTALL,
    /cwd: join\(ROOT, "dist"\)/,
    "the compile-input-less dist/ tree must never be a rebuild cwd (#21001)"
  );
});

test("postinstall: the rebuild location comes from the injectable planner", () => {
  assert.match(
    POSTINSTALL,
    /import \{ planBetterSqliteRebuild \} from "\.\/sqliteRebuildPlan\.mjs";/
  );
  assert.match(POSTINSTALL, /resolvePackageJson: \(spec\) => requireFromPackage\.resolve\(spec\)/);
  assert.match(POSTINSTALL, /exists: existsSync/);
  assert.match(POSTINSTALL, /env: process\.env/);
  // A skipped plan must fall through to the manual hints, never to a rebuild.
  assert.match(POSTINSTALL, /if \(plan\.action === "rebuild"\) \{/);
  assert.match(POSTINSTALL, /No rebuildable better-sqlite3 install/);
});

test("postinstall: the rebuild keeps the Android gyp setup and the longer timeout", () => {
  // The source build only succeeds on Termux with the ndk variable defined and
  // common.gypi patched; dropping either turns the repair into a silent no-op.
  assert.match(POSTINSTALL, /env\.GYP_DEFINES = "android_ndk_path=''"/);
  assert.match(POSTINSTALL, /patchNodeGypCommonGypi\(\);/);
  assert.match(POSTINSTALL, /timeout: isAndroid \? 600_000 : 300_000/);
  // The environment must be the planner's sanitised copy, not raw process.env.
  assert.match(POSTINSTALL, /const env = \{ \.\.\.plan\.env \};/);
});

test("postinstall warm-up: the transitive runtime install is closed and exact-pinned", () => {
  // scripts/build/postinstall.mjs → scripts/postinstall.mjs → warmUpRuntimes()
  // → loadSqliteRuntime() → installRuntime() was the second unpinned path (#21001).
  const warm = read("scripts/postinstall.mjs");
  assert.match(warm, /warmUpRuntimes\(\)/, "the warm-up chain must stay intact");
  const runtime = stripJsComments(read("bin/cli/runtime/sqliteRuntime.mjs"));
  assert.match(
    runtime,
    /if \(allowInstall\) \{[\s\S]{0,200}?await installRuntime\(\);/,
    "the lazy install must be opt-in so the postinstall warm-up cannot reach it"
  );
  assert.match(
    runtime,
    /export async function loadSqliteRuntime\(\{ allowInstall = true \} = \{\}\)/
  );

  const pin = /export const BETTER_SQLITE3_VERSION = "([^"]+)"/.exec(runtime);
  assert.ok(pin, "BETTER_SQLITE3_VERSION must stay exported");
  const locked = readJson("package-lock.json").packages?.["node_modules/better-sqlite3"]?.version;
  assert.ok(locked, "better-sqlite3 must be locked in the root lockfile");
  assert.equal(
    pin[1],
    `better-sqlite3@${locked}`,
    "the lazy runtime install must pin the exact locked version — a caret range " +
      "re-resolves from the registry outside the lockfile's integrity guarantees"
  );
});

// ── 4. CI markdownlint-cli2 must be locked and local ─────────────────────────

const CI = stripYamlComments(read(".github/workflows/ci.yml"));

/** Body of the docs-lint job (up to the next top-level job key). */
function docsLintJob() {
  const start = CI.indexOf("\n  docs-lint:");
  assert.notEqual(start, -1, "docs-lint job not found in ci.yml");
  const rest = CI.slice(start + 1);
  const next = rest.slice("\n  docs-lint:".length).search(/\n  [A-Za-z0-9_-]+:\n/);
  return next === -1 ? rest : rest.slice(0, next + "\n  docs-lint:".length);
}

test("ci: markdownlint-cli2 is no longer downloaded unpinned via npx", () => {
  assert.doesNotMatch(
    CI,
    /npx\s+--yes\s+markdownlint-cli2/,
    "`npx --yes markdownlint-cli2` runs whatever version the registry serves " +
      "today — no lockfile, no integrity pin (#20998 finding 4)"
  );
});

test("ci: docs-lint installs the locked tree before running the local binary", () => {
  const job = docsLintJob();
  const install = job.indexOf("uses: ./.github/actions/npm-ci-retry");
  const run = job.indexOf("./node_modules/.bin/markdownlint-cli2");
  assert.notEqual(install, -1, "docs-lint must install the lockfile-pinned tree");
  assert.notEqual(run, -1, "docs-lint must execute ./node_modules/.bin/markdownlint-cli2");
  assert.ok(install < run, "the locked install must precede the local binary run");
});

test("ci: the markdownlint step stays advisory", () => {
  const job = docsLintJob();
  const step = job.slice(job.indexOf("./node_modules/.bin/markdownlint-cli2"));
  assert.match(
    step.split("\n")[0],
    /\|\| true\s*$/,
    "docs-lint is warning-first by repo policy; pinning the tool must not make it blocking"
  );
});

test("ci: the Vale prose lint step stays independent of npm-ci-retry failures", () => {
  const job = docsLintJob();
  const valeIdx = job.indexOf("- name: Vale prose lint (Microsoft style, advisory)");
  assert.notEqual(valeIdx, -1, "Vale prose lint step must exist in docs-lint");
  const valeStep = job.slice(valeIdx);
  assert.match(
    valeStep,
    /^- name: Vale prose lint \(Microsoft style, advisory\)\n\s+if: \$\{\{ !cancelled\(\) \}\}/,
    "Vale must carry `if: ${{ !cancelled() }}` so an npm-ci-retry failure does not skip it"
  );
  assert.match(valeStep, /continue-on-error: true/);
});

test("markdownlint-cli2 is an exact-pinned devDependency present in the lockfile", () => {
  const pkg = readJson("package.json");
  const range = pkg.devDependencies?.["markdownlint-cli2"];
  assert.ok(range, "markdownlint-cli2 must be declared in devDependencies");
  assert.match(
    range,
    /^\d+\.\d+\.\d+$/,
    `expected an exact pin (no ^/~), got "${range}" — a range re-resolves on every install`
  );

  const lock = readJson("package-lock.json");
  const entry = lock.packages?.["node_modules/markdownlint-cli2"];
  assert.ok(entry, "markdownlint-cli2 must be locked in package-lock.json");
  assert.equal(entry.version, range, "lockfile version must match the manifest pin");
  assert.match(
    entry.resolved ?? "",
    /^https:\/\/registry\.npmjs\.org\//,
    "the locked tarball must come from the official registry over HTTPS"
  );
  assert.match(
    entry.integrity ?? "",
    /^sha512-/,
    "the locked tarball needs a sha512 integrity hash"
  );
  assert.equal(
    lock.packages?.[""]?.devDependencies?.["markdownlint-cli2"],
    range,
    "the lockfile root manifest mirror must carry the same pin"
  );
});

test("lint:md runs the pinned local binary, not npx", () => {
  const script = readJson("package.json").scripts?.["lint:md"];
  assert.ok(script, "lint:md script must exist");
  assert.doesNotMatch(script, /npx/, "local lint:md must use the locked install too");
  assert.match(script, /^markdownlint-cli2 /);
});

test("markdownlint-cli2 is on the anti-slopsquatting dependency allowlist", () => {
  const allowlist = readJson("config/quality/dependency-allowlist.json");
  assert.ok(
    (allowlist.allowed ?? []).includes("markdownlint-cli2"),
    "check-deps.mjs blocks any manifest dependency missing from the allowlist"
  );
  assert.ok(
    allowlist._justifications?.["markdownlint-cli2"],
    "a new allowlist entry needs a recorded justification (repo convention)"
  );
});

test("the markdownlint math chain cannot lock a katex below 0.18.2", () => {
  // markdownlint -> micromark-extension-math declares katex ^0.16.0, and every
  // 0.16.x / 0.17.x is a read-side prototype-pollution gadget that treats an
  // inherited `trust` value as explicitly enabled (GHSA-238p-pmpm-9mq7 /
  // CVE-2026-103923, fixed in 0.18.2). Adding the pinned tool must not smuggle
  // that copy in: the override forces the same ^0.18.2 floor the repo already
  // applies to mermaid's katex.
  const pkg = readJson("package.json");
  const override = pkg.overrides?.["micromark-extension-math"]?.katex;
  assert.ok(
    override && atLeast(rangeFloor(override), "0.18.2"),
    `overrides["micromark-extension-math"].katex "${override}" must floor at ^0.18.2`
  );

  const lock = readJson("package-lock.json");
  for (const [path, entry] of Object.entries(lock.packages ?? {})) {
    if (!/(^|\/)node_modules\/katex$/.test(path)) continue;
    assert.ok(
      atLeast(entry.version, "0.18.2"),
      `${path} locks katex ${entry.version}, affected by GHSA-238p-pmpm-9mq7`
    );
  }
});

// ── 5. gate-manifest parity (#21002) ────────────────────────────────────────

test("gate-manifest: lint:md mirrors package.json exactly (no command drift)", () => {
  // scripts/quality/gate-manifest.mjs fails on any drift between the committed
  // inventory and the manifest scripts; the first cut updated package.json only.
  const script = readJson("package.json").scripts?.["lint:md"];
  const manifest = readJson("config/quality/gate-manifest.json");
  const entry = (manifest.aliases ?? []).find((a) => a.name === "lint:md");
  assert.ok(entry, "lint:md must stay inventoried in gate-manifest.json");
  assert.equal(entry.command, script, "gate-manifest command drift: lint:md");
  assert.doesNotMatch(entry.command, /npx/, "the inventoried command must run the locked binary");
});

// ── 6. lockfile provenance for every touched entry (#20999) ─────────────────

test("lockfiles: every undici entry in every scope is registry-pinned with sha512", () => {
  for (const scope of AUDIT_SCOPES) {
    const file = scope === "." ? "package-lock.json" : `${scope}/package-lock.json`;
    const lock = readJson(file);
    for (const [path, entry] of Object.entries(lock.packages ?? {})) {
      if (!/(^|\/)node_modules\/undici$/.test(path)) continue;
      assert.match(
        entry.resolved ?? "",
        /^https:\/\/registry\.npmjs\.org\/undici\/-\/undici-\d+\.\d+\.\d+\.tgz$/,
        `[${scope}] ${path} must resolve to the official registry tarball`
      );
      assert.match(
        entry.integrity ?? "",
        /^sha512-[A-Za-z0-9+/=]+$/,
        `[${scope}] ${path} needs a sha512 integrity hash`
      );
      assert.ok(
        entry.resolved.endsWith(`undici-${entry.version}.tgz`),
        `[${scope}] ${path} resolved URL and version disagree`
      );
    }
  }
});

test("lockfiles: the scoped undici copies sit on their fixed release lines", () => {
  // electron ships the 7.x line and @omniroute/opencode-plugin-v2 the 8.x line;
  // both must be at/above the advisory's fixed version, and the unrelated 6.x
  // copy under node-gyp must stay untouched (outside the affected ranges).
  for (const scope of ["electron", "@omniroute/opencode-plugin-v2"]) {
    const lock = readJson(`${scope}/package-lock.json`);
    const entries = Object.entries(lock.packages ?? {}).filter(([p]) =>
      /(^|\/)node_modules\/undici$/.test(p)
    );
    assert.ok(entries.length > 0, `[${scope}] expected a locked undici`);
    for (const [path, entry] of entries) {
      if (path.includes("node-gyp")) continue;
      const major = tuple(entry.version)[0];
      assert.ok(
        atLeast(entry.version, UNDICI_FIXED[major]),
        `[${scope}] ${path} is below the fixed version`
      );
    }
  }
});
