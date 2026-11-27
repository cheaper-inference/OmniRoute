import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import type { DriftReport, ProviderReport } from "../../scripts/quality/catalog-drift/report.mjs";
import type { IssueRef } from "../../scripts/quality/catalog-drift/issues.mjs";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const {
  applyIssueActions,
  parseMarkers,
  planIssueActions,
  planScoreboardReminder,
  renderIssueBody,
} = await import("../../scripts/quality/catalog-drift/issues.mjs");

const runUrl = "https://example.invalid/run";
const firstFingerprint = "0123456789abcdef";
const otherFingerprint = "fedcba9876543210";

function providerReport(provider: string, overrides: Partial<ProviderReport> = {}): ProviderReport {
  return {
    fingerprint: firstFingerprint,
    consecutiveRuns: 2,
    allProbesFetched: true,
    notInCatalog: false,
    catalogRows: [],
    findings: [
      {
        provider,
        probeId: provider,
        kind: "phrase-missing",
        severity: "drift",
        message: "Expected phrase is missing",
        details: {},
      },
    ],
    ...overrides,
  };
}

function driftReport(providers: DriftReport["providers"], only: string | null = null): DriftReport {
  return {
    schemaVersion: 1,
    runAt: "2026-11-25T00:00:00.000Z",
    catalogCuratedAt: "2026-11-09",
    manifestReviewedAt: "2026-11-25",
    only,
    providers,
    probes: Object.keys(providers).map((provider) => ({
      id: provider,
      provider,
      type: "page-text",
      url: `https://example.invalid/${provider}`,
      status: "drift",
      httpStatus: 200,
      textChars: 1000,
      findings: [],
      stats: null,
    })),
  };
}

function issue(provider: string, overrides: Partial<IssueRef> = {}): IssueRef {
  return {
    number: 17,
    state: "OPEN",
    stateReason: null,
    title: `fix: catalog-drift: ${provider}`,
    body: `<!-- catalog-drift:provider=${provider} -->\n<!-- catalog-drift:fingerprint=${otherFingerprint} -->`,
    ...overrides,
  };
}

test("creates one issue per provider with drift confirmed twice", () => {
  const report = driftReport({
    a: providerReport("a"),
    b: providerReport("b"),
    c: providerReport("c", {
      fingerprint: null,
      findings: [
        {
          provider: "c",
          probeId: "c",
          severity: "info",
          kind: "ids-added",
          message: "A new id",
          details: {},
        },
      ],
    }),
  });
  const actions = planIssueActions({ report, issues: [], runUrl });
  assert.deepEqual(
    actions.filter(({ type }) => type === "create").map(({ title }) => title),
    ["catalog-drift: a", "catalog-drift: b"]
  );
});

test("waits for two runs before opening an issue", () => {
  const report = driftReport({ a: providerReport("a", { consecutiveRuns: 1 }) });
  assert.deepEqual(planIssueActions({ report, issues: [], runUrl }), [
    { provider: "a", type: "none" },
  ]);
});

test("finds the open issue by marker even when triage changed the title", () => {
  const report = driftReport({ a: providerReport("a", { consecutiveRuns: 1 }) });
  const actions = planIssueActions({ report, issues: [issue("a")], runUrl });
  assert.equal(actions.length, 1);
  assert.equal(actions[0].type, "update");
  assert.equal(actions[0].issueNumber, 17);
  assert.ok(actions[0].comment);
});

test("same fingerprint means no edit and no comment", () => {
  const report = driftReport({ a: providerReport("a", { fingerprint: otherFingerprint }) });
  assert.deepEqual(planIssueActions({ report, issues: [issue("a")], runUrl }), [
    { provider: "a", type: "none" },
  ]);
});

test("does not reopen a not-planned issue with the same fingerprint", () => {
  const issues = [issue("a", { state: "CLOSED", stateReason: "NOT_PLANNED" })];
  const same = driftReport({ a: providerReport("a", { fingerprint: otherFingerprint }) });
  const [suppressed] = planIssueActions({ report: same, issues, runUrl });
  assert.equal(suppressed.type, "suppressed");
  assert.equal(suppressed.comment, undefined);
  const changed = driftReport({ a: providerReport("a") });
  assert.equal(planIssueActions({ report: changed, issues, runUrl })[0].type, "create");
});

test("a completed issue with the same fingerprint asks once to update the probe", () => {
  const report = driftReport({ a: providerReport("a", { fingerprint: otherFingerprint }) });
  const closed = issue("a", { state: "CLOSED", stateReason: "COMPLETED" });
  const [first] = planIssueActions({ report, issues: [closed], runUrl });
  assert.equal(first.type, "suppressed");
  assert.match(first.comment ?? "", /manifest\.json/);
  assert.equal(parseMarkers(first.body).staleBaseline, otherFingerprint);
  const [second] = planIssueActions({ report, issues: [{ ...closed, body: first.body }], runUrl });
  assert.equal(second.type, "suppressed");
  assert.equal(second.comment, undefined);
});

test("closes an open issue only when every probe of the provider was fetched and found nothing", () => {
  const issues = [issue("a")];
  for (const allProbesFetched of [true, false]) {
    const report = driftReport({
      a: providerReport("a", { fingerprint: null, allProbesFetched, findings: [] }),
    });
    const [action] = planIssueActions({ report, issues, runUrl });
    assert.equal(action.type, allProbesFetched ? "close" : "none");
    assert.equal(Boolean(action.comment), allProbesFetched);
  }
});

test("does not touch issues of providers absent from the report", () => {
  const report = driftReport({ a: providerReport("a") }, "a");
  const actions = planIssueActions({ report, issues: [issue("b")], runUrl });
  assert.ok(
    actions.filter(({ provider }) => provider === "b").every(({ type }) => type === "none")
  );
});

test("providers outside the catalog get their own title and body", () => {
  const report = driftReport({ kenari: providerReport("kenari", { notInCatalog: true }) });
  const [action] = planIssueActions({ report, issues: [], runUrl });
  assert.equal(action.title, "catalog-drift: kenari (not listed)");
  assert.match(action.body ?? "", /Not in the catalog yet/);
});

test("refuses to open more than maxCreates issues", () => {
  const providers = Object.fromEntries(
    Array.from({ length: 11 }, (_, index) => [`p${index}`, providerReport(`p${index}`)])
  );
  assert.throws(
    () => planIssueActions({ report: driftReport(providers), issues: [], runUrl, maxCreates: 10 }),
    /would open 11 issues/
  );
});

test("body carries both markers and never the third-party page", () => {
  const report = driftReport({
    a: providerReport("a", {
      catalogRows: Array.from({ length: 39 }, (_, index) => ({
        modelId: `example/model-${index}`,
        poolKey: "provider-free",
        monthlyTokens: 1000000,
        freeType: "recurring-daily",
      })),
      findings: [
        {
          provider: "a",
          probeId: "a",
          severity: "drift",
          kind: "excerpt-changed",
          message: "Page excerpt has changed",
          details: { excerpt: "x".repeat(280) + "hidden tail" },
        },
        {
          provider: "a",
          probeId: "a",
          severity: "info",
          kind: "ids-added",
          message: "A model was added",
          details: {},
        },
      ],
    }),
  });
  const body = renderIssueBody({ report, provider: "a", runUrl });
  const markers = parseMarkers(body);
  assert.equal(markers.provider, "a");
  assert.equal(markers.fingerprint, firstFingerprint);
  assert.ok(body.length < 6000);
  assert.match(body, /and 19 more/);
  assert.match(body, /https:\/\/example\.invalid\/a/);
  assert.match(body, /A model was added/);
  assert.ok(body.includes("x".repeat(280)));
  assert.ok(!body.includes("hidden tail"));
});

test("the scoreboard reminder opens one issue per month", () => {
  const month = "2026-12";
  const action = planScoreboardReminder({ month, issues: [] });
  assert.equal(action.type, "create");
  assert.equal(action.title, "Monthly catalog scoreboard due: 2026-12");
  assert.equal(parseMarkers(action.body).scoreboardMonth, month);
  for (const state of ["OPEN", "CLOSED"] as const) {
    const existing = issue("a", { state, body: action.body });
    assert.equal(planScoreboardReminder({ month, issues: [existing] }).type, "none");
  }
});

test("applyIssueActions calls gh with argument arrays", () => {
  const commands: string[][] = [];
  const contents: string[] = [];
  applyIssueActions(
    [
      { provider: "a", type: "create", title: "catalog-drift: a", body: "new" },
      { provider: "a", type: "update", issueNumber: 1, body: "edited", comment: "changed" },
      { provider: "a", type: "close", issueNumber: 2, comment: "resolved" },
      { provider: "a", type: "suppressed", issueNumber: 3, body: "marked", comment: "stale" },
    ],
    {
      repo: "o/r",
      gh: (args: string[]) => {
        commands.push(args);
        const index = args.indexOf("--body-file");
        if (index >= 0) contents.push(readFileSync(args[index + 1], "utf8"));
        return "";
      },
    }
  );
  assert.deepEqual(
    commands.map((args) => args[1]),
    ["create", "edit", "comment", "close", "edit", "comment"]
  );
  assert.deepEqual(commands[0].slice(0, -1), [
    "issue",
    "create",
    "--repo",
    "o/r",
    "--title",
    "catalog-drift: a",
    "--label",
    "catalog-drift",
    "--body-file",
  ]);
  assert.deepEqual(commands[3], [
    "issue",
    "close",
    "2",
    "--repo",
    "o/r",
    "--reason",
    "completed",
    "--comment",
    "resolved",
  ]);
  assert.deepEqual(contents, ["new", "edited", "changed", "marked", "stale"]);
});

test("runs with plain node and never imports open-sse", (t) => {
  const script = "scripts/quality/catalog-drift/issues.mjs";
  assert.doesNotMatch(
    readFileSync(script, "utf8"),
    /from\s+["'][^"']*open-sse|import\(["'][^"']*open-sse/
  );
  mkdirSync("_artifacts", { recursive: true });
  const dir = mkdtempSync("_artifacts/catalog-drift-issues-");
  t.after(() => rmSync(dir, { recursive: true }));
  const report = join(dir, "report.json");
  const issues = join(dir, "issues.json");
  writeFileSync(report, JSON.stringify(driftReport({ a: providerReport("a") })));
  writeFileSync(issues, "[]");
  const result = spawnSync(
    process.execPath,
    [script, "--report", report, "--repo", "o/r", "--run-url", runUrl, "--issues", issues],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout)[0].type, "create");
});
