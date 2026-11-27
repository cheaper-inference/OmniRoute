import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  AUDIT_SCOPES,
  evaluateAuditResult,
  auditDependencies,
} from "../../../scripts/quality/audit-dependencies.mjs";

const result = (counts = {}) => ({
  status: counts.critical || counts.high ? 1 : 0,
  stdout: JSON.stringify({
    auditReportVersion: 2,
    metadata: {
      vulnerabilities: {
        info: 0,
        low: 0,
        moderate: 0,
        high: 0,
        critical: 0,
        total: Object.values(counts).reduce((a, b) => a + b, 0),
        ...counts,
      },
    },
  }),
});

test("all five independent package roots are audited", (t) => {
  assert.deepEqual(AUDIT_SCOPES, [
    ".",
    "electron",
    "@omniroute/opencode-plugin",
    "@omniroute/opencode-plugin-v2",
    "@omniroute/opencode-provider",
  ]);
  const root = mkdtempSync(join(tmpdir(), "dependency-audit-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const scope of AUDIT_SCOPES) {
    mkdirSync(join(root, scope), { recursive: true });
    writeFileSync(join(root, scope, "package-lock.json"), "{}");
  }
  const calls = [];
  const report = auditDependencies({
    root,
    run: (_cmd, args, options) => {
      calls.push({ args, cwd: options.cwd });
      return result();
    },
  });
  assert.equal(report.ok, true);
  assert.equal(calls.length, 5);
  assert.deepEqual(
    calls.map((call) => call.cwd),
    AUDIT_SCOPES.map((scope) => join(root, scope))
  );
  for (const { args } of calls) {
    assert.deepEqual(args, ["audit", "--json", "--audit-level=high"]);
  }
  assert.ok(report.results.every((scope) => /^[a-f0-9]{64}$/.test(scope.lockSha256)));
});

for (const severity of ["high", "critical"]) {
  test(`a ${severity} result in a subpackage blocks while retaining the other receipts`, (t) => {
    const root = mkdtempSync(join(tmpdir(), "dependency-audit-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    for (const scope of AUDIT_SCOPES) {
      mkdirSync(join(root, scope), { recursive: true });
      writeFileSync(join(root, scope, "package-lock.json"), "{}");
    }
    const report = auditDependencies({
      root,
      run: (_cmd, _args, options) =>
        result(options.cwd.endsWith("plugin-v2") ? { [severity]: 1 } : {}),
    });
    assert.equal(report.ok, false);
    assert.equal(report.complete, true);
    assert.equal(report.results.length, 5);
    const blocked = report.results.find((receipt) => receipt.scope.endsWith("plugin-v2"));
    assert.equal(blocked.state, "FAIL");
    assert.equal(blocked.counts[severity], 1);
  });
}

test("missing lockfiles are incomplete evidence", () => {
  const report = auditDependencies({
    root: "/nonexistent-audit-root",
    run: () => {
      throw new Error("must not run");
    },
  });
  assert.equal(report.ok, false);
  assert.equal(report.complete, false);
  assert.equal(report.results.length, 5);
});

test("moderate advisories remain visible and pass", () => {
  const r = evaluateAuditResult(result({ moderate: 3 }));
  assert.equal(r.state, "PASS");
  assert.equal(r.counts.moderate, 3);
});

test("invalid audit JSON is incomplete even when npm exits successfully", () => {
  const r = evaluateAuditResult({ status: 0, stdout: '{"auditReportVersion":' });
  assert.equal(r.state, "INCOMPLETE");
});

test("an invocation failure retains the other package receipts and cannot pass", (t) => {
  const root = mkdtempSync(join(tmpdir(), "dependency-audit-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const scope of AUDIT_SCOPES) {
    mkdirSync(join(root, scope), { recursive: true });
    writeFileSync(join(root, scope, "package-lock.json"), "{}");
  }
  const report = auditDependencies({
    root,
    run: (_cmd, _args, options) => {
      if (options.cwd.endsWith("electron")) throw new Error("spawn failed");
      return result();
    },
  });
  assert.equal(report.complete, false);
  assert.equal(report.ok, false);
  assert.equal(report.results.length, 5);
  assert.equal(report.results.filter((receipt) => receipt.state === "PASS").length, 4);
  assert.equal(report.results[1].state, "INCOMPLETE");
});

for (const bad of [
  { status: 0, stdout: "" },
  { status: 1, stdout: '{"error":{"code":"ENOAUDIT"}}' },
  { ...result(), signal: "SIGTERM" },
  { ...result(), status: 2 },
  { ...result(), error: { code: "ETIMEDOUT" } },
  { status: 0, stdout: '{"auditReportVersion":2,"metadata":{"vulnerabilities":{"critical":0}}}' },
]) {
  test("unavailable or malformed audit data cannot pass", () =>
    assert.equal(evaluateAuditResult(bad).state, "INCOMPLETE"));
}
