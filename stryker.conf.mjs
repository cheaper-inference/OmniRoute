// @ts-check
// Stryker mutation-testing config (ESM so `tap.testFiles` can be COMPUTED at load time).
// Stryker 10 picks the first of stryker.conf.{json,js,mjs,cjs} / stryker.config.* it finds;
// this is the only one in the repo — do not add a stryker.conf.json next to it.
//
// Mutation testing for the ~8 critical modules (Task 11 — Fase 7).
// NIGHTLY ONLY — DO NOT run on every PR. Mutation testing is expensive:
//   - Each mutant requires a full test suite execution.
//   - The 8 modules produce ~200–500 mutants; est. 30–90 min per run.
//   - Wired to the nightly CI workflow (.github/workflows/nightly-mutation.yml),
//     NOT to the 'lint' / 'quality-gate' PR jobs.
// TEST RUNNER — @stryker-mutator/tap-runner (NOT vitest):
//   The 8 critical modules are covered by node:test files in tests/unit/
//   (run via `node --import tsx --test`), NOT by vitest. The vitest config
//   only includes a small set of .test.tsx + open-sse/**/__tests__ files, so
//   the vitest-runner would find ZERO covering tests for these modules. The
//   tap-runner spawns each node:test file individually and parses its TAP
//   output, which matches how this repo actually exercises the modules.
//   Each test file is loaded with tsx (TypeScript/ESM) + the project polyfill,
//   the same way `npm run test:unit` runs.
// Install before running (not bundled to avoid E2E / CI bloat):
//   npm install --save-dev @stryker-mutator/core @stryker-mutator/tap-runner
// Run manually:
//   npm run test:mutation                       # full run (slow — nightly budget)
//   npx stryker run --dryRunOnly                 # validate the baseline only (no mutants)
//   (single-module probe: pass `--mutate <file>`; tap.testFiles is computed from MUTATE)
// VALIDATED 2026-06-15: `npx stryker run --dryRunOnly` exits 0 — all 129 covering
// test files run green in the Stryker sandbox and the perTest coverage map builds for
// all 8 instrumented modules (15k+ mutants). The baseline dry-run takes ~20 min with
// concurrency=1; the full mutation phase runs on top (advisory, capped by the workflow
// timeout). So the nightly produces REAL mutation scores for the 8 modules.
// Mutation score per module → quality-baseline.json key 'mutationScore.<module>'
// Direction: up (score can only improve; ratchet blocks drops — wired in a later INT phase).

import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeMutationTestFiles } from "./scripts/quality/mutation-test-files.mjs";

const REPO_ROOT = path.dirname(fileURLToPath(import.meta.url));

// 2026-06-18 (Onda 2 budget): chatCore.ts + combo.ts — the two god-files — were REMOVED
// from `mutate`. They dominated ~2/3 of the ~15k mutants; the full 8-module run TIMED OUT
// at the 180min nightly cap (run 27705123780: 16:47:33 -> killed 19:47:48 = exactly 180min;
// the prior 120min scheduled run also timed out). #4078 made concurrency safe but the
// tap-runner re-spawns a node process per test file PER MUTANT, so spawn cost dominates and
// 15k mutants does not fit.
// 2026-06-18 (Onda 3 / Fase 9 T5 re-add): the combo.ts god-file was split into 11 small
// leaf modules under open-sse/services/combo/ (PRs #4162/#4175/#4186/#4196/#4204). The
// routing LOGIC that justified combo.ts being in `mutate` now lives in those leaves, so the
// 10 well-covered combo/* leaves are ADDED back to `mutate` here (comboStructure/autoStrategy/
// validateQuality/shadowRouting/targetSorters/comboPredicates/rrState/comboData + the reset-aware
// quota pair quotaScoring/quotaStrategies, added after #4204 (D7b) merged). They are covered by
// the 24 combo-*.test.ts files already in tap.testFiles (quota by combo-prescreen/combo-config/
// combo-strategy-fallbacks). types.ts is omitted (pure type declarations produce 0 mutants).
// chatCore/* leaves: a covering-test audit found 6 with direct unit coverage (batch g:
// comboContextCache/idempotency/passthroughHelpers/responseHeaders/sanitization/upstreamTimeouts).
// A follow-up then added DEDICATED unit tests for 6 more leaves (tests/unit/chatcore-headers,
// -log-truncation, -memory-extraction, -non-streaming-sse, -passthrough-tool-names,
// -executor-helpers — wired into tap.testFiles above) and added those leaves as batch h
// (headers/logTruncation/memoryExtraction/nonStreamingSse/passthroughToolNames/executorHelpers).
// A later follow-up added dedicated tests (NO mock.module — unavailable under the tap-runner; used
// fetch-override + crafted inputs + temp-DATA_DIR) for telemetryHelpers (both fns, all branches) and
// memorySkillsInjection (getSkillsProviderForFormat fully + injectMemoryAndSkills guards/empty-DB
// path) and added them as batch i.
// The FINAL chatCore leaf, semanticCache.ts, was added to batch i once its cache-HIT block had a
// fixture: chatcore-semantic-cache now SEEDS the real cache via setCachedResponse (the in-memory
// store getCachedResponse checks first — no mock.module needed) under the exact signature
// checkSemanticCache rebuilds, so the HIT branch runs end-to-end (status 200 / 'semantic' / 'HIT' /
// the stream + content-type ternaries / the cost fallback / the side-effect calls all get killed).
// ALL 15 chatCore leaves are now mutated.
// STILL EXCLUDED (follow-ups, NOT in `mutate` yet):
//   - combo.ts + chatCore.ts barrels: their handleComboChat/handleChatCore CORES were not
//     split (out of scope — Fase 3 ChatCoreContext refactor). The barrels are now thin-ish
//     but still large; keep excluded until the cores are split.
// See project memory: Quality Gate v2 / Fase 9 (project-combo-split).
const MUTATE = [
  "open-sse/services/accountFallback.ts",
  "src/sse/services/auth.ts",
  "src/server/authz/routeGuard.ts",
  "open-sse/utils/error.ts",
  "open-sse/utils/publicErrorIdentifiers.ts",
  "open-sse/utils/publicCreds.ts",
  "src/shared/utils/circuitBreaker.ts",
  "open-sse/services/combo/comboStructure.ts",
  "open-sse/services/combo/autoStrategy.ts",
  "open-sse/services/combo/validateQuality.ts",
  "open-sse/services/combo/shadowRouting.ts",
  "open-sse/services/combo/targetSorters.ts",
  "open-sse/services/combo/comboPredicates.ts",
  "open-sse/services/combo/rrState.ts",
  "open-sse/services/combo/comboData.ts",
  "open-sse/services/combo/quotaScoring.ts",
  "open-sse/services/combo/quotaStrategies.ts",
  "open-sse/handlers/chatCore/comboContextCache.ts",
  "open-sse/handlers/chatCore/idempotency.ts",
  "open-sse/handlers/chatCore/passthroughHelpers.ts",
  "open-sse/handlers/chatCore/responseHeaders.ts",
  "open-sse/handlers/chatCore/sanitization.ts",
  "open-sse/handlers/chatCore/upstreamTimeouts.ts",
  "open-sse/handlers/chatCore/headers.ts",
  "open-sse/handlers/chatCore/logTruncation.ts",
  "open-sse/handlers/chatCore/memoryExtraction.ts",
  "open-sse/handlers/chatCore/nonStreamingSse.ts",
  "open-sse/handlers/chatCore/passthroughToolNames.ts",
  "open-sse/handlers/chatCore/executorHelpers.ts",
  "open-sse/handlers/chatCore/telemetryHelpers.ts",
  "open-sse/handlers/chatCore/memorySkillsInjection.ts",
  "open-sse/handlers/chatCore/semanticCache.ts",
];

// tap.testFiles is COMPUTED, not hand-maintained: every unit test (tests/unit/**, *.test.ts,
// outside tests/unit/build/) that imports a module in MUTATE — the same rule
// `npm run check:mutation-test-coverage` (--strict) enforces, shared through
// scripts/quality/mutation-test-files.mjs. A new covering test is picked up automatically;
// nobody edits a list for it. coverageAnalysis:perTest then narrows which files run per
// mutant, and the nightly batches narrow `mutate` with --mutate.
//
// PINNED_TEST_FILES keeps the entries of the former hand list (2026-11-13, 775 unique paths)
// that the import rule does not select, so the computed list is a strict superset of it and
// no mutant loses a killer it had (losing one turns it SURVIVED and false-fails the
// mutationScore ratchet). They are tests that reach a mutated module only INDIRECTLY — through
// the combo.ts / chatCore.ts barrels or other combo*/chatCore* modules, or through the route /
// handler they test — plus a few the old broad grep swept in. Add to this list ONLY a test that
// covers a mutated module solely through such an indirect path; a direct importer needs nothing.
// The former list deliberately left out timing/heap/streaming-sensitive integration tests that
// flake under Stryker's concurrent runners (body-timeout-integration, heap-pressure,
// sse-heartbeat-integration, *-stream-readiness, chatcore-memory-pressure): they do not import a
// mutated module directly, so the rule keeps them out too — keep them out of this list.
const PINNED_TEST_FILES = [
  "tests/unit/14486-cli-connect-insecure-default-gate.test.ts",
  "tests/unit/antigravity-timing-hot-settings.test.ts",
  "tests/unit/api-key-rotator-health.test.ts",
  "tests/unit/appearance-widget-settings-schema.test.ts",
  "tests/unit/auto-combo-context-advertising.test.ts",
  "tests/unit/auto-combo-engine.test.ts",
  "tests/unit/auto-combo-scoring-clamp.test.ts",
  "tests/unit/bootstrap-env-private-modes.test.ts",
  "tests/unit/build/check-circular-deps.test.ts",
  "tests/unit/cc-bridge-openai-image-7777.test.ts",
  "tests/unit/cc-compatible-provider.test.ts",
  "tests/unit/chat-context-relay.test.ts",
  "tests/unit/chat-route-edge-cases.test.ts",
  "tests/unit/chatcore-compression-integration.test.ts",
  "tests/unit/chatcore-imports-cleanly.test.ts",
  "tests/unit/chatcore-sanitization.test.ts",
  "tests/unit/chatcore-strip-stale-headers.test.ts",
  "tests/unit/check-test-discovery.test.ts",
  "tests/unit/claude-code-parity.test.ts",
  "tests/unit/claude-effort-suffix-strip.test.ts",
  "tests/unit/claude-oauth-provider.test.ts",
  "tests/unit/claude-passthrough-stream-boolean.test.ts",
  "tests/unit/claude-passthrough-thinking-2454.test.ts",
  "tests/unit/claude-to-openai-glm-user-turn.test.ts",
  "tests/unit/cli-simulate.test.ts",
  "tests/unit/cline-response-envelope.test.ts",
  "tests/unit/codex-stream-false.test.ts",
  "tests/unit/collect-metrics-module-coverage.test.ts",
  "tests/unit/combo-499-abort.test.ts",
  "tests/unit/combo-allowed-connections-limit.test.ts",
  "tests/unit/combo-auto-candidate-expansion.test.ts",
  "tests/unit/combo-cache-invalidation.test.ts",
  "tests/unit/combo-config.test.ts",
  "tests/unit/combo-health-dashboard.test.ts",
  "tests/unit/combo-health-route.test.ts",
  "tests/unit/combo-hedging.test.ts",
  "tests/unit/combo-max-depth-config.test.ts",
  "tests/unit/combo-omnimodel-tag-stripping.test.ts",
  "tests/unit/combo-pinned-empty-turn.test.ts",
  "tests/unit/combo-prescreen.test.ts",
  "tests/unit/combo-provider-diversity-wiring.test.ts",
  "tests/unit/combo-quality-validator-reasoning.test.ts",
  "tests/unit/combo-quota-soft-penalty.test.ts",
  "tests/unit/combo-round-robin-streaming-lock-3811.test.ts",
  "tests/unit/combo-sessionless-pin-3825.test.ts",
  "tests/unit/combo-strategies.test.ts",
  "tests/unit/combo-streaming-empty-content-failover.test.ts",
  "tests/unit/combo-target-defensive-modelstr.test.ts",
  "tests/unit/complexity-aware-scoring-wiring.test.ts",
  "tests/unit/compression/compression-worker-pool-jam.test.ts",
  "tests/unit/context-pinning-tool-calls.test.ts",
  "tests/unit/correctness/combo.property.test.ts",
  "tests/unit/custom-model-target-format.test.ts",
  "tests/unit/daily-reset-dst-gap.test.ts",
  "tests/unit/data-dir-private-perms.test.ts",
  "tests/unit/db-server-tool-executions-migration.test.ts",
  "tests/unit/db/stats-dbstat-optional.test.ts",
  "tests/unit/egress-lock-allowlist-10880.test.ts",
  "tests/unit/electron-server-env-private-modes.test.ts",
  "tests/unit/executor-antigravity.test.ts",
  "tests/unit/executor-web-cookie-sweep.test.ts",
  "tests/unit/follow-up-transcript.test.ts",
  "tests/unit/gemini-web-missing-browser-3516.test.ts",
  "tests/unit/guardrails-api-3496.test.ts",
  "tests/unit/middleware-hook-realm-isolation.test.ts",
  "tests/unit/model-compat-vision-canonical-resolution-14587.test.ts",
  "tests/unit/non-streaming-client-translate.test.ts",
  "tests/unit/non-streaming-provider-leg.test.ts",
  "tests/unit/oauth-providers-config.test.ts",
  "tests/unit/observability-payloads.test.ts",
  "tests/unit/obsidian-ssrf-guard.test.ts",
  "tests/unit/opencode-muse-spark-min-output.test.ts",
  "tests/unit/opencode-required-proxy-15007.test.ts",
  "tests/unit/opencode-v2-config-11070.test.ts",
  "tests/unit/plan3-p0.test.ts",
  "tests/unit/plugins-route-error-sanitization.test.ts",
  "tests/unit/preferred-account-failover-upstream.test.ts",
  "tests/unit/preferred-account-hot-settings.test.ts",
  "tests/unit/provider-execution-pipeline.test.ts",
  "tests/unit/provider-test-local-runtime-probe.test.ts",
  "tests/unit/proxy-logs-egress-lookup-10880.test.ts",
  "tests/unit/qoder-oauth-config.test.ts",
  "tests/unit/quota-exhaustion-cutoff-opencode.test.ts",
  "tests/unit/quota-groups-route.test.ts",
  "tests/unit/quota-key-models-route.test.ts",
  "tests/unit/quota-pool-log-route.test.ts",
  "tests/unit/quota-streaming-consumption-usd.test.ts",
  "tests/unit/responses-handler.test.ts",
  "tests/unit/responses-ws-proxy-error-sanitization.test.mjs",
  "tests/unit/router-strategies.test.ts",
  "tests/unit/serial/combo-health-autopilot.test.ts",
  "tests/unit/server-owned-tool-loop-flag.test.ts",
  "tests/unit/server-owned-tool-loop.test.ts",
  "tests/unit/service-combo-metrics.test.ts",
  "tests/unit/services-branch-hardening.test.ts",
  "tests/unit/services/combo-metrics-memory.test.ts",
  "tests/unit/skill-execution-fence.test.ts",
  "tests/unit/skills-interception-server-owned.test.ts",
  "tests/unit/stable-json.test.ts",
  "tests/unit/stream-lifecycle-timer-cleanup-18669.test.ts",
  "tests/unit/stream-recovery-toolcall.test.ts",
  "tests/unit/sudo-password-never-reaches-command-stdin.test.ts",
  "tests/unit/system-role-extraction.test.ts",
  "tests/unit/tag-routing.test.ts",
  "tests/unit/token-refresh-race-comprehensive.test.ts",
  "tests/unit/token-refresh-service.test.ts",
  "tests/unit/tool-loop-usage.test.ts",
  "tests/unit/tools-filter-anthropic-format.test.ts",
  "tests/unit/translator-openai-to-gemini-turn-pairing-13848.test.ts",
];

/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
const config = {
  $schema: "https://stryker-mutator.io/schemas/stryker-schema.json",
  packageManager: "npm",
  incremental: true,
  incrementalFile: "reports/mutation/stryker-incremental.json",
  testRunner: "tap",
  plugins: ["@stryker-mutator/tap-runner"],
  tap: {
    testFiles: computeMutationTestFiles({
      repoRoot: REPO_ROOT,
      mutate: MUTATE,
      pinned: PINNED_TEST_FILES,
    }),
    nodeArgs: [
      "--import",
      "tsx",
      "--import",
      "./open-sse/utils/setupPolyfill.ts",
      "--import",
      "./tests/_setup/isolateDataDir.ts",
      "--test-reporter=tap",
      "-r",
      "{{hookFile}}",
      "{{testFile}}",
    ],
  },
  mutate: MUTATE,
  // ignorePatterns = files NOT copied into the Stryker sandbox. It does NOT scope
  // what gets mutated (that is the `mutate` array above). The test files MUST be
  // copied so the tap-runner can find covering tests, so DO NOT ignore tests/ here.
  // We only exclude heavy, mutation-irrelevant trees to keep sandbox creation fast:
  // build output, coverage, the huge docs/i18n translation tree, and other worktrees.
  ignorePatterns: [
    ".next",
    "dist",
    "dist-electron",
    ".build",
    "coverage",
    "playwright-report",
    "test-results",
    "reports",
    "docs/i18n",
    ".worktrees",
    ".stryker-tmp",
  ],
  reporters: ["progress", "html", "json"],
  htmlReporter: {
    fileName: "reports/mutation/mutation.html",
  },
  jsonReporter: {
    fileName: "reports/mutation/mutation.json",
  },
  coverageAnalysis: "perTest",
  timeoutMS: 60000,
  timeoutFactor: 2.5,
  // concurrency=4 (was 1): the covering node:test files used to share SQLite/module state via
  // the default DATA_DIR (~/.omniroute), so running them concurrently in the Stryker sandbox
  // caused cross-file races that failed the all-green baseline. tap.nodeArgs now imports
  // ./tests/_setup/isolateDataDir.ts, which gives each spawned test process its own temp
  // DATA_DIR — eliminating the shared on-disk DB, so concurrency>1 is deterministic. A/B
  // verified 2026-06-17: dry-run at concurrency=4 fails WITHOUT the isolation import
  // (account-fallback-service tap exit 9) and passes WITH it. Raise further only if the runner
  // has spare cores.
  concurrency: 4,
  disableTypeChecks: true,
  checkers: [],
  thresholds: {
    high: 70,
    low: 50,
    break: null,
  },
  tempDirName: ".stryker-tmp",
  cleanTempDir: true,
  dryRunTimeoutMinutes: 30,
};

export default config;
