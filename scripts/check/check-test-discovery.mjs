#!/usr/bin/env node
// scripts/check/check-test-discovery.mjs
// Gate 6A.1 — test discovery: every *.test.ts|tsx / *.spec.ts|tsx file in the repo must
// ser COLETADO por pelo menos um runner que efetivamente RODA via npm script ou CI.
//
// WHY: audit 2026-06-09 found ≈135 tests in subdirectories of tests/unit/
// that no runner collects (the `tests/unit/*.test.ts` glob is top-level-only), including
// tests/unit/authz/routeGuard.test.ts (Hard Rules #15/#17) — whose asserts ALREADY FAIL,
// rotting without anyone seeing. Test that doesn't run is the definitive false green: all
// investimento anti test-masking protege asserts que nem executam.
//
// Modelo: COLLECTORS declara explicitamente o glob de cada runner REAL + as fontes
// (package.json / ci.yml / vitest configs) where the pattern should appear verbatim
// (drift-check: changed the glob in the source without updating here → the gate fails asking for sync).
// "Coletado" = casado pelo glob de um runner executado por script npm ou job de CI.
// Config includes that NO script executes (e.g. vitest.config.ts without filter) NO
// count — dead config does not run test.
//
// Ratchet: pre-existing orphans are frozen in test-discovery-baseline.json
// (visible, decreasing debt). Orphan NEW → fail. Baseline entry that is no longer
// be orphaned (relinked/deleted) → fail requesting removal (stale-allowlist enforcement).
// --update rewrites the baseline with the current state (use only to REMOVE relinks;
// new additions should be fixed, not frozen — that's the point of the gate).
//
// Documented limitations:
// - Vitest exclude must be literal; dynamic expressions fail closed.
// - Quarantine has a separate collector and never counts as active/healthy execution.
// - @omniroute/* are outside the walk (they have their own CI: opencode-*-ci.yml).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseVitestExcludes, validateQuarantine } from "../quality/quarantine-contract.mjs";

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/test-discovery-baseline.json")
);
const UPDATE = process.argv.includes("--update");

// Roots scanned for test files.
const WALK_ROOTS = ["tests", "src", "open-sse", "electron", "bin"];
const WALK_EXCLUDE = new Set(["node_modules", ".next", "dist", "coverage", ".git"]);
const TEST_FILE_RE = /\.(test|spec)\.(ts|tsx|mjs)$/;

// REAL runners and their globs. `sources`: files where `anchor` (default: itself
// glob) must appear textually — if the runner changes, this gate requires sync.
export const COLLECTORS = [
  // Node native runner — test:unit / test:unit:fast / shards / test:coverage. O CI
  // (test-unit ×8) now calls the npm script test:unit:ci:shard
  // (single source, master plan CI QW-d tests) — wiring is anchored by script NAME
  // in workflows (dedicated entry below), and globs live ONLY in package.json.
  { glob: "tests/unit/*.test.ts", sources: ["package.json"] },
  // Node native runner — subdiretórios religados pela 6A.1c (2026-06-09). Braces
  // explicit to NOT include tests/unit/autoCombo/** (vitest tests — matter
  // "vitest" and explode in the node runner) NOR tests/unit/dashboard/** (own invocation
  // below). New subdir: add here AND in the scripts (the drift-check + the
  // orphans force keeping in sync).
  {
    glob: "tests/unit/{api,auth,authz,build,chatcore,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,translator,ui,usage}/**/*.test.ts",
    sources: ["package.json"],
  },
  // Node native runner — tests/unit/dashboard/** runs in a separate invocation with the hook
  // tsx COMPLETE (--import tsx): the dashboard components graph pulls
  // @lobehub/icons, whose build es/ does internal require() for files with ESM syntax —
  // sem o patch CJS do tsx isso estoura "Unexpected token 'export'" (visto no Node
  // 24.18 of the IC; on local 24.16 it becomes a crawl of ~60s/file). The rest of the suite rotates
  // under tsx/esm (~-50% bootstrap per process). Master plan tests+CI, QW-b.
  { glob: "tests/unit/dashboard/**/*.test.ts", sources: ["package.json"] },
  // Concurrency flake quarantine (improvements plan v3.8.46, P0.3): files
  // sensitive to CPU/timing contention (class glm-3580 / quota-division /
  // provider-health-autopilot) rodam num passo dedicado --test-concurrency=1 ao FIM
  // of each runner. Out of the above parallel globs by own directory.
  { glob: "tests/unit/serial/**/*.test.ts", sources: ["package.json"] },
  // Rewired orphans (QW-c master plan): .test.mjs files (top-level + db/ + feature-triage/) — outside glob
  // *.test.ts history, never ran in any job (53 cases recovered).
  { glob: "tests/unit/**/*.test.mjs", sources: ["package.json"] },
  // Wiring CI→npm script (single source): ci.yml unit jobs MUST invoke the script
  // canonical (the quality.yml fast-unit came out on 2026-10-26: it duplicated the
  // ci.yml em todo PR) — se renomearem/inlinarem, este gate
  test-unit // requires sync (replaces the glob textual anchors that existed in the workflows).
  {
    glob: "tests/unit/*.test.ts",
    sources: ["package.json", ".github/workflows/ci.yml"],
    anchors: {
      ".github/workflows/ci.yml": "test:unit:ci:shard",
    },
  },
  // Node native runner — test:integration (top-level only)
  { glob: "tests/integration/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:services:int (gated RUN_SERVICES_INT=1; embedded-service
  // installer/lifecycle tests — slow, network-dependent, never runs unopted in CI)
  { glob: "tests/integration/services/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:combo:matrix / test:integration (combo strategy decision matrix, 17 strategies)
  { glob: "tests/integration/combo-matrix/*.test.ts", sources: ["package.json"] },
  // Node native runner — test:combo:live (gated real-upstream smoke; RUN_COMBO_LIVE=1 + VPS creds)
  { glob: "tests/integration/combo-live/*.live.test.ts", sources: ["package.json"] },
  // Node native runner — test:boundary:live (gated real-upstream smoke; RUN_BOUNDARY_LIVE=1,
  // hits omniroute.vhost2.harre.dynv6.net — never runs unopted in CI)
  { glob: "tests/boundary/*.live.test.ts", sources: ["package.json"] },
  // Node native runner — test:system
  { glob: "tests/e2e/system-failover.test.ts", sources: ["package.json"] },
  // vitest.mcp.config.ts — test:vitest
  { glob: "open-sse/mcp-server/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "open-sse/services/autoCombo/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "open-sse/services/combo/__tests__/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  // Single-file include: the rest of open-sse/services/__tests__/ are frozen orphans
  // (empty/dormant stubs); only this one is wired to run under test:vitest.
  {
    glob: "open-sse/services/__tests__/antigravity-quota-family.test.ts",
    sources: ["vitest.mcp.config.ts"],
  },
  // #8890 landed this suite here without wiring a runner, so it had never run once.
  {
    glob: "open-sse/services/__tests__/fail-fast-concurrency-gate.test.ts",
    sources: ["vitest.mcp.config.ts"],
  },
  { glob: "tests/unit/autoCombo/**/*.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "tests/unit/api/**/*.spec.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/lib/memory/__tests__/generic-backend.test.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "tests/unit/encryption.spec.ts", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/shared/components/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/shared/hooks/__tests__/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  { glob: "src/app/(dashboard)/**/__tests__/**/*.test.tsx", sources: ["vitest.mcp.config.ts"] },
  // vitest.config.ts via test:vitest:ui. The script uses the config-wide include list.
  {
    glob: "tests/unit/**/*.test.tsx",
    sources: ["package.json", "vitest.config.ts"],
    anchors: { "package.json": "test:vitest:ui", "vitest.config.ts": "tests/unit/**/*.test.tsx" },
  },
  // vitest.config.ts include — open-sse/__tests__ files collected by vitest.config.ts.
  // These were previously listed as orphans because the COLLECTORS only modelled the
  // tests/unit/**/*.test.tsx include; the open-sse globs were missing. Both the top-level
  // glob and the more-specific services sub-path glob from vitest.config.ts are listed so
  // the drift-check anchors remain exact matches to the config file text.
  {
    glob: "open-sse/**/__tests__/**/*.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "open-sse/**/__tests__/**/*.test.ts" },
  },
  // vitest.config.ts include — src/lib/memory and src/lib/skills __tests__ collected by vitest.config.ts.
  {
    glob: "src/lib/memory/__tests__/**/*.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "src/lib/memory/__tests__/**/*.test.ts" },
  },
  {
    glob: "src/lib/skills/__tests__/**/*.test.ts",
    sources: ["vitest.config.ts"],
    anchors: { "vitest.config.ts": "src/lib/skills/__tests__/**/*.test.ts" },
  },
  // Playwright — test:e2e: the script calls the runner without a glob (like this `npm run test:e2e -- <spec>`
  // filtra de verdade) e a coleta vem do playwright.config.ts (testDir ./tests/e2e +
  // testMatch **/*.spec.ts).
  {
    glob: "tests/e2e/*.spec.ts",
    sources: ["package.json", "playwright.config.ts"],
    anchors: {
      "package.json": '"test:e2e": "node scripts/dev/run-playwright-tests.mjs"',
      "playwright.config.ts": 'testDir: "./tests/e2e"',
    },
  },
  // Runners custom — test:ecosystem / test:protocols:e2e (spawn vitest with the file)
  { glob: "tests/e2e/ecosystem.test.ts", sources: ["scripts/dev/run-ecosystem-tests.mjs"] },
  {
    glob: "tests/e2e/protocol-clients.test.ts",
    sources: ["scripts/dev/run-protocol-clients-tests.mjs"],
  },
  // Playwright — real homologation suite (npm run homolog, L4 UI): run.mjs invokes
  // `playwright test -c tests/homolog/ui/playwright.config.ts` (testMatch **/*.spec.ts).
  {
    glob: "tests/homolog/ui/*.spec.ts",
    sources: ["scripts/homolog/run.mjs"],
    anchors: { "scripts/homolog/run.mjs": "tests/homolog/ui/playwright.config.ts" },
  },
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Converte um glob em RegExp ancorada. Suporta `*`, `**` (com ou sem barra) e `{a,b}`. */
export function globToRegExp(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        if (glob[i + 2] === "/") {
          re = "(?:.*/)?"; // "**/" — zero or more directories
          i += 2;
        } else {
          re += ".*"; // "**" solto
          i += 1;
        }
      } else {
        re += "[^/]*"; // "*" does not cross "/"
      }
    } else if (c === "{") {
      const end = glob.indexOf("}", i);
      const alts = glob
        .slice(i + 1, end)
        .split(",")
        .map(escapeRe);
      re += "(?:" + alts.join("|") + ")";
      i = end;
    } else {
      re += escapeRe(c);
    }
  }
  return new RegExp("^" + re + "$");
}

/** Test files not matched by NO collector globs (order preserved). */
export function findOrphans(files, globs) {
  const collectors = globs.map((entry) => {
    const collector = typeof entry === "string" ? { glob: entry } : entry;
    return {
      include: globToRegExp(collector.glob),
      exclude: (collector.exclude ?? []).map(globToRegExp),
    };
  });
  return files.filter(
    (file) =>
      !collectors.some(
        (collector) =>
          collector.include.test(file) && !collector.exclude.some((exclude) => exclude.test(file))
      )
  );
}

/**
 * Compares current orphans to the frozen baseline.
 * - newOrphans: current orphan outside the baseline → new test that DOESN'T RUN (fail).
 * - stale: baseline entry that is no longer orphaned (relinked/deleted) → remove (fail).
 */
export function evaluateAgainstBaseline(orphans, baselineList) {
  const baseSet = new Set(baselineList);
  const orphanSet = new Set(orphans);
  return {
    newOrphans: orphans.filter((o) => !baseSet.has(o)),
    stale: baselineList.filter((b) => !orphanSet.has(b)),
  };
}

/**
 * Drift-check: each declared glob (or its anchor per source) must appear textually
 * in ALL your sources. Returns drift messages.
 */
export function findCollectorDrift(collectors, contents) {
  const drift = [];
  for (const c of collectors) {
    for (const source of c.sources) {
      const anchor = c.anchors?.[source] ?? c.glob;
      const body = contents[source];
      if (body === undefined || !body.includes(anchor)) {
        drift.push(
          `glob "${c.glob}" (anchor "${anchor}") not found in ${source} — has the runner changed? Sync COLLECTORS in check-test-discovery.mjs`
        );
      }
    }
  }
  return drift;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (WALK_EXCLUDE.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (TEST_FILE_RE.test(e.name)) acc.push(p);
  }
  return acc;
}

function collectTestFiles() {
  const out = [];
  for (const root of WALK_ROOTS) {
    for (const f of walk(path.join(ROOT, root))) {
      out.push(path.relative(ROOT, f).replace(/\\/g, "/"));
    }
  }
  return out.sort();
}

function main() {
  // 1) drift dos collectors vs fontes reais
  const contents = {};
  for (const c of COLLECTORS) {
    for (const s of c.sources) {
      if (contents[s] === undefined) {
        const p = path.join(ROOT, s);
        contents[s] = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : undefined;
      }
    }
  }
  const drift = findCollectorDrift(COLLECTORS, contents);

  // 2) orphans vs baseline
  const files = collectTestFiles();
  const modeled = COLLECTORS.map((collector) => {
    const config = collector.sources.find((source) => /^vitest.*\.config\.ts$/.test(source));
    return { ...collector, exclude: config ? parseVitestExcludes(contents[config]) : [] };
  });
  const inventory = JSON.parse(
    fs.readFileSync(path.join(ROOT, "config/quality/vitest-exclusions.json"), "utf8")
  );
  const quarantineErrors = validateQuarantine(inventory.excluded);
  const quarantineConfig = fs.readFileSync(path.join(ROOT, "vitest.quarantine.config.ts"), "utf8");
  const quarantineWorkflow = fs.readFileSync(
    path.join(ROOT, ".github/workflows/test-quarantine.yml"),
    "utf8"
  );
  if (
    !quarantineConfig.includes("inventory.excluded.map") ||
    !quarantineWorkflow.includes("vitest run --config vitest.quarantine.config.ts")
  ) {
    quarantineErrors.push("quarantine execution wiring missing");
  }
  if (quarantineErrors.length) drift.push(...quarantineErrors);
  const quarantined = new Set(inventory.excluded.map((entry) => entry.file));
  const inactive = findOrphans(files, modeled);
  // Only a valid, wired quarantine may account for a non-active file.
  const orphans = inactive.filter((file) => quarantineErrors.length || !quarantined.has(file));
  if (!fs.existsSync(BASELINE_PATH) && !UPDATE) {
    console.error(
      `[test-discovery] FAIL — ${path.basename(BASELINE_PATH)} missing. Bootstrap:\n` +
        ` node scripts/check/check-test-discovery.mjs --update (generates baseline with current orphans)`
    );
    process.exit(2);
  }
  const baseline = fs.existsSync(BASELINE_PATH)
    ? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"))
    : {
        _comment:
          "Test-discovery ratchet (check-test-discovery.mjs). Each entry is a test file that NO runner collects (it never runs) — split frozen in audit 6A.1 (2026-06-09). You can only DECREASE: reconnect the test (by adjusting the runner glob or moving the file) and remove the entry via --update. DO NOT add new orphans — fix the runner.",
        orphans: [],
      };
  const { newOrphans, stale } = evaluateAgainstBaseline(orphans, baseline.orphans || []);

  if (UPDATE && newOrphans.length > 0) {
    console.error(
      `[test-discovery] FAIL — --update cannot freeze ${newOrphans.length} new orphan(s); wire their runner instead.`
    );
    process.exit(1);
  }
  if (UPDATE && drift.length === 0) {
    baseline.orphans = orphans;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
    console.log(
      `[test-discovery] baseline rewritten: ${orphans.length} orphan(s) (${stale.length} removed, ${newOrphans.length} added — additions should be fixed, not frozen)`
    );
    return;
  }

  const problems = [];
  for (const d of drift) problems.push(`  ✗ [drift] ${d}`);
  for (const o of newOrphans) {
    problems.push(
      ` ✗ [NEW orphan] ${o} — no runner picks up this file (it NEVER runs). Move it to a collected path or adjust the runner.`
    );
  }
  for (const s of stale) {
    problems.push(
      ` ✗ [stale] ${s} — no longer orphaned (relinked/removed). Remove from baseline: node scripts/check/check-test-discovery.mjs --update`
    );
  }

  if (problems.length) {
    console.error(`[test-discovery] ${problems.length} problem(s):\n` + problems.join("\n"));
    process.exit(1);
  }
  console.log(
    `[test-discovery] OK — ${files.length} test files, ${COLLECTORS.length} collectors, ${quarantined.size} quarantined inventoried file(s) (not active PASS), ${(baseline.orphans || []).length} frozen orphan(s) (debt tracked, only decreasing)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
