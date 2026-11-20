// tests/unit/build/check-codeql-ratchet.test.ts
// TDD unit tests for scripts/check/check-codeql-ratchet.mjs — Task 7.3 CodeQL ratchet.
//
// Strategy: test the exported pure function without calling the GitHub API.
// All fixtures are synthetic GitHub API responses.
//   - parseCodeQLAlerts() — filters + counts open, non-dismissed CodeQL alerts
//                           (Hard Rule #14: dismissed alerts do not count)
import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import {
  parseCodeQLAlerts,
  evaluateCodeqlRatchet,
} from "../../../scripts/check/check-codeql-ratchet.mjs";

type RatchetVerdict = { regressed: boolean; improved: boolean };
const evaluate = evaluateCodeqlRatchet as (current: number, baseline: number) => RatchetVerdict;

// ---------------------------------------------------------------------------
// Fixtures — synthetic GitHub code-scanning/alerts API responses
// ---------------------------------------------------------------------------

/** Helper to build a minimal alert object. */
function makeAlert(
  overrides: {
    number?: number;
    state?: "open" | "dismissed" | "fixed";
    tool?: string;
    ruleId?: string;
    severity?: string;
    securitySeverity?: string;
    dismissedReason?: string | null;
  } = {}
) {
  return {
    number: overrides.number ?? 1,
    state: overrides.state ?? "open",
    dismissed_reason: overrides.dismissedReason ?? null,
    dismissed_at: overrides.dismissedReason ? "2026-01-01T00:00:00Z" : null,
    tool: {
      name: overrides.tool ?? "CodeQL",
      guid: null,
      version: "2.16.0",
    },
    rule: {
      id: overrides.ruleId ?? "js/sql-injection",
      name: overrides.ruleId ?? "SQL Injection",
      severity: overrides.severity ?? "error",
      security_severity_level: overrides.securitySeverity ?? "high",
      description: "Vulnerability description",
    },
    most_recent_instance: {
      ref: "refs/heads/main",
      state: overrides.state ?? "open",
    },
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
    url: "https://api.github.com/repos/owner/repo/code-scanning/alerts/1",
    html_url: "https://github.com/owner/repo/security/code-scanning/1",
  };
}

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — invalid input
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: null retorna alertCount=0", () => {
  const result = parseCodeQLAlerts(null);
  assert.equal(result.alertCount, 0);
  assert.deepEqual(result.bySeverity, {});
  assert.deepEqual(result.byRule, {});
});

test("parseCodeQLAlerts: undefined retorna alertCount=0", () => {
  const result = parseCodeQLAlerts(undefined as unknown as null);
  assert.equal(result.alertCount, 0);
});

test("parseCodeQLAlerts: object (non-array) returns alertCount=0", () => {
  const result = parseCodeQLAlerts({ number: 1, state: "open" } as unknown as null);
  assert.equal(result.alertCount, 0);
});

test("parseCodeQLAlerts: string retorna alertCount=0", () => {
  const result = parseCodeQLAlerts("open" as unknown as null);
  assert.equal(result.alertCount, 0);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — empty array
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: empty array returns alertCount=0", () => {
  const result = parseCodeQLAlerts([]);
  assert.equal(result.alertCount, 0);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — Hard Rule #14: dismissed alerts don't count
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: alert dismissed DOES NOT count (Hard Rule #14)", () => {
  const alerts = [makeAlert({ state: "dismissed", dismissedReason: "false positive" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "dismissed alert must not be counted");
});

test("parseCodeQLAlerts: alert rightly dismissed 'used in tests' DOES NOT count", () => {
  const alerts = [makeAlert({ state: "dismissed", dismissedReason: "used in tests" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0);
});

test("parseCodeQLAlerts: alert dismissed regardless of reason DOES NOT count", () => {
  const alerts = [
    makeAlert({ state: "dismissed", dismissedReason: "wont fix" }),
    makeAlert({ number: 2, state: "dismissed", dismissedReason: "false positive" }),
    makeAlert({ number: 3, state: "dismissed", dismissedReason: "used in tests" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "all dismissed states must be excluded");
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — fixed state does not count
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: fixed alert does NOT count", () => {
  const alerts = [makeAlert({ state: "fixed" as "open" | "dismissed" | "fixed" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "fixed alerts are not open, must not count");
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — CodeQL alerts only (filters other tools)
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: alerts from other tools are ignored", () => {
  const alerts = [
    makeAlert({ tool: "Semgrep", ruleId: "semgrep-rule-1" }),
    makeAlert({ number: 2, tool: "ESLint", ruleId: "eslint-rule-1" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 0, "only CodeQL alerts should be counted");
});

test("parseCodeQLAlerts: tool 'CodeQL' (upper case) account", () => {
  const alerts = [makeAlert({ tool: "CodeQL" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

test("parseCodeQLAlerts: tool 'codeql' (lower case) account (case-insensitive)", () => {
  const alerts = [makeAlert({ tool: "codeql" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

test("parseCodeQLAlerts: tool 'CodeQL Community' also counts (contains 'codeql')", () => {
  const alerts = [makeAlert({ tool: "CodeQL Community" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — alert count open
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: 1 alerta open CodeQL retorna alertCount=1", () => {
  const alerts = [makeAlert({ state: "open" })];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
});

test("parseCodeQLAlerts: 3 alertas open retorna alertCount=3", () => {
  const alerts = [
    makeAlert({ number: 1, state: "open" }),
    makeAlert({ number: 2, state: "open", ruleId: "js/xss" }),
    makeAlert({ number: 3, state: "open", ruleId: "js/path-injection" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 3);
});

test("parseCodeQLAlerts: mix of open, dismissed, fixed — account only open", () => {
  const alerts = [
    makeAlert({ number: 1, state: "open" }),
    makeAlert({ number: 2, state: "dismissed", dismissedReason: "false positive" }),
    makeAlert({ number: 3, state: "fixed" as "open" | "dismissed" | "fixed" }),
    makeAlert({ number: 4, state: "open", ruleId: "js/xss" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 2, "only 2 open, non-dismissed alerts");
});

test("parseCodeQLAlerts: mix of CodeQL and other tools — only counts CodeQL", () => {
  const alerts = [
    makeAlert({ number: 1, tool: "CodeQL", state: "open" }),
    makeAlert({ number: 2, tool: "Semgrep", state: "open" }),
    makeAlert({ number: 3, tool: "CodeQL", state: "open", ruleId: "js/xss" }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 2, "only CodeQL open alerts");
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — severidade
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: coleta bySeverity de security_severity_level", () => {
  const alerts = [
    makeAlert({ number: 1, securitySeverity: "critical" }),
    makeAlert({ number: 2, securitySeverity: "high" }),
    makeAlert({ number: 3, securitySeverity: "medium" }),
    makeAlert({ number: 4, securitySeverity: "high" }), // second high
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 4);
  assert.equal(result.bySeverity["critical"], 1);
  assert.equal(result.bySeverity["high"], 2);
  assert.equal(result.bySeverity["medium"], 1);
});

test("parseCodeQLAlerts: alerta sem security_severity_level usa rule.severity", () => {
  const alerts = [
    {
      ...makeAlert({ number: 1 }),
      rule: {
        id: "js/unused-local-variable",
        name: "Unused variable",
        severity: "warning",
        // sem security_severity_level
        description: "Local var not used",
      },
    },
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
  assert.ok(
    "warning" in result.bySeverity || "unknown" in result.bySeverity,
    "severity should be captured"
  );
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — byRule
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: agrupa por rule.id em byRule", () => {
  const alerts = [
    makeAlert({ number: 1, ruleId: "js/sql-injection" }),
    makeAlert({ number: 2, ruleId: "js/xss" }),
    makeAlert({ number: 3, ruleId: "js/sql-injection" }), // second of the same rule
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.byRule["js/sql-injection"], 2);
  assert.equal(result.byRule["js/xss"], 1);
});

test("parseCodeQLAlerts: alerta sem rule retorna byRule com 'unknown'", () => {
  const alert = {
    number: 1,
    state: "open",
    dismissed_reason: null,
    dismissed_at: null,
    tool: { name: "CodeQL", guid: null, version: "2.16.0" },
    // sem rule
  };
  const result = parseCodeQLAlerts([alert]);
  assert.equal(result.alertCount, 1);
  assert.ok("unknown" in result.byRule);
});

// ---------------------------------------------------------------------------
// parseCodeQLAlerts — dismissed does not contaminate counts
// ---------------------------------------------------------------------------

test("parseCodeQLAlerts: dismissed with the same ruleId as open — dismissed does not appear in byRule", () => {
  const alerts = [
    makeAlert({ number: 1, state: "open", ruleId: "js/sql-injection" }),
    makeAlert({
      number: 2,
      state: "dismissed",
      ruleId: "js/sql-injection",
      dismissedReason: "false positive",
    }),
  ];
  const result = parseCodeQLAlerts(alerts);
  assert.equal(result.alertCount, 1);
  assert.equal(result.byRule["js/sql-injection"], 1, "only the open alert should appear in byRule");
});

// ---------------------------------------------------------------------------
// evaluateCodeqlRatchet — ratchet direction:down (Task 7.3 promote to blocking)
// Mirror of evaluateDeadCode: regression when measured > baseline; the baseline
// is 0 (clean), so ANY open CodeQL alert is a regression that blocks.
// ---------------------------------------------------------------------------

test("evaluateCodeqlRatchet: equal to baseline passes (0 vs 0 — clean)", () => {
  const r = evaluate(0, 0);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateCodeqlRatchet: one more alert than baseline 0 is a regression", () => {
  const r = evaluate(1, 0);
  assert.equal(r.regressed, true, "a single new open CodeQL alert must block");
  assert.equal(r.improved, false);
});

test("evaluateCodeqlRatchet: fewer alerts than a non-zero baseline is an improvement", () => {
  const r = evaluate(2, 5);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateCodeqlRatchet: zero alerts against a non-zero baseline is a maximum improvement", () => {
  const r = evaluate(0, 5);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateCodeqlRatchet: strict integer comparison — any increase regresses", () => {
  assert.equal(evaluate(6, 5).regressed, true);
  assert.equal(evaluate(5, 5).regressed, false);
  assert.equal(evaluate(4, 5).regressed, false);
});
