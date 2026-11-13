// Docs counts gate in two modes (plan "derived numbers and texts resolved only at release",
// 2026-11-13). A feature PR is judged only on what it did to a managed number; the release mode
// keeps the strict comparison with the live code; the release refresh plans the rewrites.
//
// Everything here runs on facts and file contents held in memory, plus tiny throwaway git
// repositories for the diff base — never the tsx facts probe.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

type Claim = { value: unknown; start: number; end: number; text: string; key?: string };
type Verdict = { ok: boolean; detail: string };
type Check = {
  label: string;
  actual: unknown;
  docKey: string;
  strict: boolean;
  scope: "derived" | "invariant" | "release-only";
  files: string[];
  requireClaim?: boolean;
  validate?: (content: string) => Verdict;
  extract?: (content: string) => Claim[];
};
type Violation = { file: string; label: string; kind: string; detail: string };
type GateResult = {
  mode: string;
  exitCode: number;
  strict: number;
  soft: number;
  infra: { kind: string; detail: string } | null;
  lines: string[];
  footer: { stream: string; text: string }[];
  violations: Violation[];
};
type Reader = (file: string) => string | null;
type Plan = {
  files: {
    path: string;
    before: string;
    after: string;
    changes: { label: string; from: string; to: string; index: number }[];
  }[];
  manual: { path: string; label: string; detail: string }[];
};

const gate = (await import("../../scripts/check/check-docs-counts-sync.mjs")) as unknown as {
  buildChecks: (opts?: { facts?: unknown }) => Check[];
  evaluatePrDiff: (args: {
    checks: Check[];
    readBase?: Reader;
    readHead?: Reader;
    writerBranch?: boolean | string;
    changedFiles?: string[];
  }) => { violations: Violation[]; lines: string[] };
  runCountsGate: (opts: Record<string, unknown>) => GateResult;
  planDerivedRewrites: (args: { facts: unknown; readFile: Reader }) => Plan;
  resolveCountsDiffBase: (args: {
    env: Record<string, string>;
    cwd: string;
  }) => { sha: string; ref: string } | null;
  isDerivedWriterBranch: (branch: string) => boolean;
  __setSpawnSyncForTest: (fn: unknown) => void;
  __resetSpawnSyncForTest: () => void;
};
const claimsLib = (await import("../../scripts/check/lib/derivedClaims.mjs")) as unknown as {
  locateVersionClaims: (content: string) => Claim[];
};
const bump = (await import("../../scripts/release/bump-version-claims.mjs")) as unknown as {
  findVersionClaims: (content: string) => Claim[];
};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Facts in the scripts/release/facts.mjs document format (section 3 of the phase contract).
const FACTS = {
  schemaVersion: 1,
  version: "3.8.54",
  providers: 393,
  providerReferenceTotal: 393,
  migrations: 239,
  locales: 66,
  routingStrategies: 21,
  scoringFactors: 16,
  coverageFloors: { statements: 67.33, lines: 67.33, functions: 72.02, branches: 65.08 },
  executors: 177,
  oauthProviders: 32,
  a2aSkills: 6,
  cloudAgents: 4,
  code: {
    freeSteady: 1.4e9,
    entries: 120,
    freeFirst: 1.6e9,
    freeGated: 6e6,
    freePools: 30,
    engines: 5,
    cliTotal: 33,
    cliCode: 25,
    cliAgent: 8,
    mcpTools: 110,
    mcpScopes: 33,
    providers: 393,
    freeForever: 40,
    modePacks: [
      "ship-fast",
      "cost-saver",
      "quality-first",
      "offline-friendly",
      "balanced",
      "chaos-mode",
    ],
    catalogDate: "2026-11-01",
    sortBy: "reliability",
    intelligentKeys: 16,
    hardStop: 10,
    trainsOnPrompts: 5,
    freeTierCount: 50,
    freeTierReg: 49,
    manifestFreeTier: 49,
  },
};

const mem =
  (files: Record<string, string | null>): Reader =>
  (file) =>
    Object.prototype.hasOwnProperty.call(files, file) ? files[file] : null;

const readReal: Reader = (file) => {
  const abs = path.join(ROOT, file);
  return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
};

const checks = gate.buildChecks({ facts: FACTS });
const derived = checks.filter((c) => c.scope === "derived");
const byLabel = (label: string) => {
  const found = checks.find((c) => c.label === label);
  assert.ok(found, `no check labelled ${label}`);
  return found;
};

const mirrorRow = (count: string) =>
  `<table><tr><td><b>Database</b></td><td>better-sqlite3 (SQLite, WAL) + LowDB (JSON) — 137 وحدة، ${count} ترحيلًا</td></tr></table>\n`;

// --- classification ---------------------------------------------------------------------

test("every check declares its scope, and every derived check has a locator", () => {
  const expected: Record<string, Check["scope"]> = {
    "DB migrations count (README mirrors)": "derived",
    "Provider count": "derived",
    "Provider count (secondary docs and skills)": "derived",
    "Provider count (package.json description)": "release-only",
    "DB migrations count": "derived",
    "Package version (docs prose)": "derived",
    "Coverage floor (docs vs blocking ratchet)": "derived",
    "i18n locales count": "release-only",
    "Auto-Combo mode packs": "derived",
    "Auto-Combo mode packs (reference doc must state the count)": "derived",
    "Auto-Combo mode packs (named in the reference doc)": "release-only",
    "mode packs pin quality explicitly (live code)": "invariant",
    "Provider reference total (doc vs live modules)": "release-only",
    "Manifest free-tier capability count (live code)": "release-only",
    "SVG canonical numbers (live code)": "derived",
    "Free-tier headline (live catalog)": "derived",
    "compression engines (live code)": "derived",
    "MCP tools (live code)": "derived",
    "MCP scopes (live code)": "derived",
    "CLI tools (live code)": "derived",
    "free-forever providers (live code)": "derived",
    "free-tier catalog entries (live code)": "derived",
    "recurring pools (live code)": "derived",
    "hard-stop-guaranteed entries (live code)": "derived",
    "training-disclosure entries (live code)": "derived",
    "Free provider rankings sortBy (live code)": "invariant",
    "FREE_CATALOG_CURATED_AT (live code)": "release-only",
    "INTELLIGENT vs DEFAULT (live code)": "invariant",
    "ToS caution (16) (live docs)": "invariant",
    "quality neutral prose (live docs)": "invariant",
    "Executors count": "release-only",
    "Auto-Combo scoring factors count": "derived",
    "Routing strategies count": "release-only",
    "Routing strategies count (prose claims)": "derived",
    "Routing strategies count (services guide)": "derived",
    "OAuth providers count": "release-only",
    "A2A skills count": "release-only",
    "Cloud agents count": "release-only",
  };
  assert.deepEqual(
    Object.fromEntries(checks.map((c) => [c.label, c.scope])),
    expected,
    "a new check must be classified (derived / invariant / release-only)"
  );
  for (const c of derived) assert.equal(typeof c.extract, "function", `${c.label} has no locator`);
});

test("a check built without code facts still collapses into the strict ERR check", () => {
  const err = gate.buildChecks({ facts: { ...FACTS, code: null } }).find((c) => c.actual === "ERR");
  assert.ok(err?.validate);
  assert.equal(err.strict, true);
  assert.match(err.validate("").detail, /readCodeFacts unavailable/);
});

// --- pr mode: the diff matrix ------------------------------------------------------------

test("pr: a file the PR did not touch passes even when the base is behind the code", () => {
  const stale = "OmniRoute routes 392 providers with 101 MCP tools.\n";
  assert.equal(byLabel("Provider count").validate?.(stale).ok, false, "release mode sees drift");
  const { violations } = gate.evaluatePrDiff({
    checks: derived,
    readBase: mem({ "README.md": stale }),
    readHead: mem({ "README.md": stale }),
  });
  assert.deepEqual(violations, []);
});

test("pr: editing a managed number fails — even when the new value is the live one", () => {
  for (const to of ["393", "400"]) {
    const { violations } = gate.evaluatePrDiff({
      checks: derived,
      readBase: mem({ "README.md": "Intro.\nOmniRoute routes 392 providers.\n" }),
      readHead: mem({ "README.md": `Intro.\nOmniRoute routes ${to} providers.\n` }),
    });
    assert.equal(violations.length, 1, JSON.stringify(violations));
    assert.equal(violations[0].kind, "edited-value");
    assert.equal(violations[0].label, "Provider count");
    assert.equal(violations[0].file, "README.md");
    assert.match(violations[0].detail, new RegExp(`"${to} providers" \\(line 2\\)`));
    assert.match(violations[0].detail, /release:refresh-derived/);
  }
});

test("pr: reusing a value the base already states is not an edit", () => {
  const { violations } = gate.evaluatePrDiff({
    checks: derived,
    readBase: mem({ "README.md": "OmniRoute routes 392 providers.\n" }),
    readHead: mem({
      "README.md": "OmniRoute routes 392 providers.\nAll 392 providers are listed.\n",
    }),
  });
  assert.deepEqual(violations, []);
});

test("pr: removing a required claim fails (the refresh would lose its marker)", () => {
  const cases: [string, string, string, string][] = [
    [
      "docs/routing/AUTO-COMBO.md",
      "Auto-Combo ships 6 curated mode packs.\n",
      "Auto-Combo ships curated packs.\n",
      "Auto-Combo mode packs (reference doc must state the count)",
    ],
    [
      "docs/reference/FREE_TIERS.md",
      "About ~1.4B free tokens a month, +~6M behind regional identity verification.\n",
      "About ~1.4B free tokens a month.\n",
      "Free-tier headline (live catalog)",
    ],
    [
      "docs/i18n/ar/README.md",
      mirrorRow("239"),
      "<p>no table any more</p>\n",
      "DB migrations count (README mirrors)",
    ],
  ];
  for (const [file, base, head, label] of cases) {
    const { violations } = gate.evaluatePrDiff({
      checks: derived,
      readBase: mem({ [file]: base }),
      readHead: mem({ [file]: head }),
    });
    const removed = violations.filter((v) => v.kind === "removed-required-claim");
    assert.equal(removed.length, 1, `${file}: ${JSON.stringify(violations)}`);
    assert.equal(removed[0].label, label);
  }
});

test("pr: a deleted file and an unchanged file are not judged", () => {
  const { violations } = gate.evaluatePrDiff({
    checks: derived,
    readBase: mem({
      "docs/routing/AUTO-COMBO.md": "6 curated mode packs\n",
      "README.md": "1 providers",
    }),
    readHead: mem({ "docs/routing/AUTO-COMBO.md": null, "README.md": "999 providers\n" }),
    changedFiles: ["docs/routing/AUTO-COMBO.md"],
  });
  assert.deepEqual(violations, []);
});

test("pr: writer branches may write managed numbers", () => {
  const files = {
    readBase: mem({ "README.md": "OmniRoute routes 392 providers.\n" }),
    readHead: mem({ "README.md": "OmniRoute routes 393 providers.\n" }),
    changedFiles: ["README.md"],
  };
  for (const branch of [
    "chore/derived-refresh",
    "release/v3.8.54",
    "docs/i18n-wave-1113",
    "chore/i18n-mirror-refresh",
  ]) {
    assert.equal(gate.isDerivedWriterBranch(branch), true, branch);
    const r = gate.runCountsGate({ mode: "pr", branch, ...files });
    assert.equal(r.exitCode, 0, `${branch}: ${r.lines.join("\n")}`);
    assert.deepEqual(r.violations, []);
  }
  const feature = gate.runCountsGate({ mode: "pr", branch: "feat/new-provider", ...files });
  assert.equal(feature.exitCode, 1);
  assert.equal(feature.violations.length, 1);
  assert.match(feature.footer.map((f) => f.text).join("\n"), /managed-value edit/);
});

test("an invariant that breaks fails in both modes", () => {
  const broken = mem({
    "open-sse/services/autoCombo/modePacks.ts": "  quality: 0.02,\n  quality: 0.03,\n",
    "docs/README.md": "66 languages",
    "docs/guides/I18N.md": "66 locales",
  });
  const pr = gate.runCountsGate({
    mode: "pr",
    branch: "feat/x",
    readBase: broken,
    readHead: broken,
    changedFiles: [],
  });
  assert.equal(pr.exitCode, 1);
  assert.equal(pr.strict, 1);
  assert.ok(
    pr.lines.some((l) =>
      /✗ open-sse\/services\/autoCombo\/modePacks\.ts — only 2 quality pins/.test(l)
    )
  );

  const release = gate.runCountsGate({ mode: "release", facts: FACTS, readHead: broken });
  assert.equal(release.exitCode, 1);
  assert.equal(release.strict, 1, release.lines.join("\n"));
  assert.ok(release.lines.some((l) => /only 2 quality pins/.test(l)));
});

test("pr mode never runs release-only checks and never collects facts", () => {
  gate.__setSpawnSyncForTest(() => {
    throw new Error("pr mode must not start the facts probe");
  });
  try {
    const r = gate.runCountsGate({
      mode: "pr",
      branch: "feat/x",
      readBase: mem({}),
      readHead: mem({}),
      changedFiles: [],
    });
    assert.equal(r.exitCode, 0, r.lines.join("\n"));
    assert.equal(r.lines[0], "Docs counts sync report — mode=pr (flag: --mode=pr)");
    for (const c of checks.filter((x) => x.scope === "release-only")) {
      assert.ok(!r.lines.some((l) => l.startsWith(`\n• ${c.label}:`)), `${c.label} ran in pr mode`);
    }
    for (const c of checks.filter((x) => x.scope === "invariant")) {
      assert.ok(
        r.lines.some((l) => l.startsWith(`\n• ${c.label}:`)),
        `${c.label} did not run`
      );
    }
    const summary = r.lines.find((l) => l.startsWith("• Release-only checks"));
    assert.match(summary ?? "", /Provider reference total \(doc vs live modules\)/);
    assert.match(summary ?? "", /Auto-Combo mode packs \(named in the reference doc\)/);
  } finally {
    gate.__resetSpawnSyncForTest();
  }
});

// --- release mode: infrastructure vs divergence ------------------------------------------

test("release: code facts that cannot be collected exit 2 as infrastructure, not drift", () => {
  const locales = { "docs/README.md": "66 languages", "docs/guides/I18N.md": "66 locales" };
  const infra = gate.runCountsGate({
    mode: "release",
    facts: { ...FACTS, code: null },
    factsError: { kind: "timeout", detail: "probe exceeded 600000 ms" },
    readHead: mem(locales),
  });
  assert.equal(infra.exitCode, 2);
  assert.equal(infra.strict, 0);
  assert.equal(infra.infra?.kind, "timeout");
  // The report itself is unchanged: the ERR check still prints as it always did.
  assert.ok(infra.lines.some((l) => /✗ Code-derived counts — readCodeFacts unavailable/.test(l)));
  assert.match(infra.footer.map((f) => f.text).join("\n"), /NOT a documentation divergence/);

  // A real divergence next to the infrastructure failure still reads as a divergence.
  const both = gate.runCountsGate({
    mode: "release",
    facts: { ...FACTS, code: null },
    factsError: { kind: "exit", detail: "probe exited 1" },
    readHead: mem({ ...locales, "README.md": "OmniRoute routes 392 providers.\n" }),
  });
  assert.equal(both.exitCode, 1);
  assert.equal(both.strict, 1);
  assert.match(both.footer.map((f) => f.text).join("\n"), /Code facts could not be collected/);
});

test("release: a clean in-memory run passes and keeps the historical footer", () => {
  const r = gate.runCountsGate({
    mode: "release",
    facts: FACTS,
    readHead: mem({ "docs/README.md": "66", "docs/guides/I18N.md": "66" }),
  });
  assert.equal(r.lines[0], "Docs counts sync report — mode=release (flag: --mode=release)");
  assert.equal(r.lines[1], "=======================");
  // the soft file-count checks (executors, …) find no file in memory → soft drift, exit 0
  assert.equal(r.exitCode, 0);
  assert.equal(r.strict, 0);
  assert.match(r.footer[0].text, /potential \(soft\) drift/);
  assert.equal(
    gate.runCountsGate({ mode: "release", facts: FACTS, readHead: mem({}), strictSoft: true })
      .exitCode,
    1
  );
});

// --- release refresh plan ------------------------------------------------------------------

test("planDerivedRewrites + release mode clear every rewritable STRICT drift (real tree)", () => {
  const shifted = {
    ...FACTS,
    version: "9.9.9",
    providerReferenceTotal: 777,
    migrations: 999,
    scoringFactors: 23,
    routingStrategies: 22,
    coverageFloors: { statements: 99.5, lines: 99.5, functions: 99.5, branches: 99.5 },
    code: {
      ...FACTS.code,
      providers: 777,
      mcpTools: 321,
      mcpScopes: 44,
      freePools: 55,
      entries: 444,
    },
  };
  const plan = gate.planDerivedRewrites({ facts: shifted, readFile: readReal });
  assert.ok(
    plan.files.length > 66,
    `expected the README mirrors and sources, got ${plan.files.length}`
  );
  const after = new Map(plan.files.map((f) => [f.path, f.after]));
  const overlay: Reader = (file) =>
    after.has(file) ? (after.get(file) as string) : readReal(file);
  for (const f of plan.files) {
    assert.notEqual(f.before, f.after);
    for (const ch of f.changes)
      assert.equal(f.before.slice(ch.index, ch.index + ch.from.length), ch.from);
  }

  // After the plan, every STRICT failure is one the plan handed to `manual`.
  const shiftedChecks = gate.buildChecks({ facts: shifted });
  let strictLeft = 0;
  for (const c of shiftedChecks) {
    if (!c.strict || c.actual === 0 || c.actual === "ERR") continue;
    for (const file of c.files) {
      const content = overlay(file);
      if (content == null && c.validate) continue;
      const ok = c.validate
        ? c.validate(content as string).ok
        : (content ?? "").includes(String(c.actual));
      if (ok) continue;
      strictLeft++;
      assert.ok(
        plan.manual.some((m) => m.path === file && m.label === c.label),
        `${file} — ${c.label} is still STRICT after the plan and not listed as manual`
      );
    }
  }
  const release = gate.runCountsGate({ mode: "release", facts: shifted, readHead: overlay });
  assert.equal(release.strict, strictLeft);

  // Idempotent: planning again over the rewritten tree changes nothing.
  assert.deepEqual(gate.planDerivedRewrites({ facts: shifted, readFile: overlay }).files, []);
});

test("planDerivedRewrites keeps a mirror's own digits and leaves the rounded headline to a human", () => {
  const persian = mirrorRow("۲۳۹");
  const plan = gate.planDerivedRewrites({
    facts: { ...FACTS, migrations: 240 },
    readFile: mem({
      "docs/i18n/fa/README.md": persian,
      "docs/reference/FREE_TIERS.md":
        "About ~9.9B free tokens a month, +~6M behind regional identity verification.\n",
    }),
  });
  const fa = plan.files.find((f) => f.path === "docs/i18n/fa/README.md");
  assert.ok(fa);
  assert.ok(fa.after.includes("۲۴۰ ترحيلًا"), fa.after);
  assert.equal(
    byLabel("DB migrations count (README mirrors)").validate?.(fa.after).ok,
    false,
    "fixture facts say 239"
  );
  assert.equal(
    gate
      .buildChecks({ facts: { ...FACTS, migrations: 240 } })
      .find((c) => c.label === "DB migrations count (README mirrors)")
      ?.validate?.(fa.after).ok,
    true
  );
  assert.ok(
    plan.manual.some(
      (m) =>
        m.path === "docs/reference/FREE_TIERS.md" && m.label === "Free-tier headline (live catalog)"
    )
  );
  assert.ok(!plan.files.some((f) => f.path === "docs/reference/FREE_TIERS.md"));
});

// --- shared locators ---------------------------------------------------------------------

test("the gate's version locator finds the same spans as bump-version-claims (real README/llm.txt)", () => {
  for (const file of ["README.md", "llm.txt"]) {
    const content = readReal(file) ?? "";
    const spans = (claims: Claim[]) =>
      [...new Map(claims.map((c) => [c.start, `${c.start}-${c.end}=${c.value}`])).values()].sort();
    const ours = spans(claimsLib.locateVersionClaims(content));
    assert.ok(ours.length > 0, `${file} carries no version claim`);
    assert.deepEqual(ours, spans(bump.findVersionClaims(content)), file);
    for (const c of claimsLib.locateVersionClaims(content)) {
      assert.equal(content.slice(c.start, c.end), c.value);
    }
  }
});

// --- pr base resolution against real (tiny) git repositories --------------------------------

function git(cwd: string, ...args: string[]): string {
  return execFileSync(
    "git",
    [
      "-c",
      "user.name=test",
      "-c",
      "user.email=test@example.invalid",
      "-c",
      "init.defaultBranch=main",
      ...args,
    ],
    { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  ).trim();
}

function commitFile(repo: string, file: string, content: string, message: string): string {
  fs.mkdirSync(path.dirname(path.join(repo, file)), { recursive: true });
  fs.writeFileSync(path.join(repo, file), content);
  git(repo, "add", "-A");
  git(repo, "commit", "-q", "-m", message);
  return git(repo, "rev-parse", "HEAD");
}

/**
 * An origin with main at `baseSha`, a feature branch, and GitHub's PR merge commit stored as
 * refs/pull/1/merge; `moveBase` adds a commit on main BEFORE the merge commit is computed.
 */
function prRepo(
  feature: { file: string; content: string },
  moveBase?: { file: string; content: string }
) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-pr-"));
  const origin = path.join(dir, "origin");
  fs.mkdirSync(origin);
  git(origin, "init", "-q");
  commitFile(origin, "README.md", "OmniRoute routes 392 providers.\n", "c1");
  const eventBase = commitFile(origin, "notes.txt", "base\n", "c2");
  git(origin, "switch", "-q", "-c", "feat/x");
  commitFile(origin, feature.file, feature.content, "feature");
  git(origin, "switch", "-q", "main");
  const mergeBase = moveBase
    ? commitFile(origin, moveBase.file, moveBase.content, "c3")
    : eventBase;
  git(origin, "merge", "-q", "--no-ff", "-m", "merge", "feat/x");
  const merge = git(origin, "rev-parse", "HEAD");
  git(origin, "update-ref", "refs/pull/1/merge", merge);
  git(origin, "reset", "-q", "--hard", mergeBase);
  return { dir, origin, eventBase, mergeBase, merge };
}

/** What actions/checkout does for a pull_request with `fetch-depth: n`. */
function ciCheckout(repo: { dir: string; origin: string; merge: string }, depth: number | null) {
  const ci = fs.mkdtempSync(path.join(repo.dir, "ci-"));
  git(ci, "init", "-q");
  git(ci, "remote", "add", "origin", `file://${repo.origin}`);
  const fetch = ["fetch", "-q", ...(depth ? [`--depth=${depth}`] : []), "origin"];
  git(ci, ...fetch, `+${repo.merge}:refs/remotes/pull/1/merge`);
  if (!depth) git(ci, "fetch", "-q", "origin", "+refs/heads/*:refs/remotes/origin/*");
  git(ci, "checkout", "-q", "--detach", repo.merge);
  return ci;
}

const prEnv = (baseSha: string) => ({
  GITHUB_ACTIONS: "true",
  CI: "true",
  GITHUB_EVENT_NAME: "pull_request",
  GITHUB_HEAD_REF: "feat/x",
  BASE_SHA: baseSha,
});

test("fetch-depth 2 + BASE_SHA: the base resolves on GitHub's PR merge commit", () => {
  const repo = prRepo({ file: "README.md", content: "OmniRoute routes 393 providers.\n" });
  try {
    const ci = ciCheckout(repo, 2);
    assert.equal(
      fs
        .readFileSync(path.join(ci, ".git", "shallow"), "utf8")
        .trim()
        .split("\n").length,
      2
    );
    const base = gate.resolveCountsDiffBase({ env: prEnv(repo.eventBase), cwd: ci });
    assert.equal(base?.sha, repo.eventBase);

    const r = gate.runCountsGate({ mode: "pr", root: ci, env: prEnv(repo.eventBase) });
    assert.equal(r.exitCode, 1, r.lines.join("\n"));
    assert.deepEqual(
      r.violations.map((v) => [v.file, v.kind]),
      [["README.md", "edited-value"]]
    );
  } finally {
    fs.rmSync(repo.dir, { recursive: true, force: true });
  }
});

test("a base that moved after the event: the merge commit's first parent is the base", () => {
  // The release refresh rewrote README.md on main after the PR event; the PR touched notes only.
  const repo = prRepo(
    { file: "notes.txt", content: "feature\n" },
    { file: "README.md", content: "OmniRoute routes 395 providers.\n" }
  );
  try {
    for (const depth of [2, null]) {
      const ci = ciCheckout(repo, depth);
      const base = gate.resolveCountsDiffBase({ env: prEnv(repo.eventBase), cwd: ci });
      assert.equal(base?.sha, repo.mergeBase, `depth ${depth ?? "full"}`);
      const r = gate.runCountsGate({ mode: "pr", root: ci, env: prEnv(repo.eventBase) });
      assert.equal(r.exitCode, 0, `depth ${depth ?? "full"}:\n${r.lines.join("\n")}`);
    }
  } finally {
    fs.rmSync(repo.dir, { recursive: true, force: true });
  }
});

test("pr base: unresolvable in CI is exit 2; local, no-PR and queue runs skip the diff", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-nobase-"));
  try {
    git(dir, "init", "-q");
    commitFile(dir, "README.md", "OmniRoute routes 392 providers.\n", "only");

    const ci = gate.runCountsGate({ mode: "pr", root: dir, env: prEnv("0".repeat(40)) });
    assert.equal(ci.exitCode, 2, ci.lines.join("\n"));
    assert.equal(ci.infra?.kind, "base");
    assert.match(ci.footer.map((f) => f.text).join("\n"), /NOT a documentation divergence/);

    const local = gate.runCountsGate({ mode: "pr", root: dir, env: {} });
    assert.equal(local.exitCode, 0);
    assert.ok(
      local.lines.some((l) => /PR diff base: skipped — no merge base found locally/.test(l))
    );

    const scheduled = gate.runCountsGate({
      mode: "pr",
      root: dir,
      env: {
        GITHUB_ACTIONS: "true",
        GITHUB_EVENT_NAME: "schedule",
        GITHUB_REF_NAME: "release/v3.8.54",
      },
    });
    assert.equal(scheduled.exitCode, 0);
    assert.ok(scheduled.lines.some((l) => /no pull request in this run \(schedule\)/.test(l)));

    for (const env of [
      { GITHUB_ACTIONS: "true", GITHUB_EVENT_NAME: "merge_group", BASE_SHA: "0".repeat(40) },
      { ...prEnv("0".repeat(40)), GITHUB_HEAD_REF: "mergify/merge-queue/abc" },
    ]) {
      const queued = gate.runCountsGate({ mode: "pr", root: dir, env });
      assert.equal(queued.exitCode, 0, queued.lines.join("\n"));
      assert.ok(queued.lines.some((l) => /queue batch/.test(l)));
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("planDerivedRewrites moves every strategy-count claim #15159 pins (real tree)", () => {
  const live = gate.planDerivedRewrites({ facts: FACTS, readFile: readReal });
  const next = FACTS.routingStrategies + 1;
  const plan = gate.planDerivedRewrites({
    facts: { ...FACTS, routingStrategies: next },
    readFile: readReal,
  });
  const after = (file: string) =>
    plan.files.find((f) => f.path === file)?.after ?? (readReal(file) as string);
  const counts = (text: string, re: RegExp) => [...text.matchAll(re)].map((m) => Number(m[1]));
  // the same regexes tests/unit/routing-strategy-docs-sync-15159.test.ts reads
  assert.deepEqual(counts(after("AGENTS.md"), /(\d+)\s+public strategies/g), [next]);
  const row = after("AGENTS.md")
    .split("\n")
    .find((l) => /Auto-Combo \(.*strategies\)/.test(l));
  assert.equal(Number(row?.match(/(\d+)\s+strategies/)?.[1]), next);
  const services = after("open-sse/services/AGENTS.md")
    .split("\n")
    .find((l) => /\*\*Strategies\*\*/.test(l));
  assert.equal(Number(services?.match(/\((\d+)\)/)?.[1]), next);
  const autoCombo = counts(
    after("docs/routing/AUTO-COMBO.md"),
    /(\d+)\s+(?:routing\s+)?strategies/g
  );
  assert.ok(autoCombo.length >= 2);
  assert.ok(
    autoCombo.every((n) => n === next),
    String(autoCombo)
  );
  for (const file of ["llm.txt", "docs/architecture/RESILIENCE_GUIDE.md", "README.md"]) {
    assert.ok(
      counts(after(file), /(\d+)\*{0,2}\s+(?:routing\s+)?strategies/g).every((n) => n === next),
      file
    );
  }
  // with the tree's own count nothing about strategies is planned
  const strategyLabels = /^Routing strategies count/;
  assert.ok(!live.files.some((f) => f.changes.some((c) => strategyLabels.test(c.label))));
  assert.ok(!plan.manual.some((m) => strategyLabels.test(m.label)), JSON.stringify(plan.manual));
});
