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
  status: counts.critical ? 1 : 0,
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
  assert.ok(report.results.every((scope) => /^[a-f0-9]{64}$/.test(scope.lockSha256)));
});

test("a critical result in any subpackage blocks while retaining the other receipts", (t) => {
  const root = mkdtempSync(join(tmpdir(), "dependency-audit-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const scope of AUDIT_SCOPES) {
    mkdirSync(join(root, scope), { recursive: true });
    writeFileSync(join(root, scope, "package-lock.json"), "{}");
  }
  const report = auditDependencies({
    root,
    run: (_cmd, _args, options) => result(options.cwd.endsWith("plugin-v2") ? { critical: 1 } : {}),
  });
  assert.equal(report.ok, false);
  assert.equal(report.complete, true);
  assert.equal(report.results.length, 5);
  assert.equal(report.results.find((r) => r.scope.endsWith("plugin-v2")).state, "FAIL");
});

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

test("high advisories remain visible under the existing warning policy", () => {
  const r = evaluateAuditResult(result({ high: 2 }));
  assert.equal(r.state, "PASS");
  assert.equal(r.counts.high, 2);
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

for (const [errorCode, reason, signal] of [
  ["ETIMEDOUT", "execution-timeout", "SIGTERM"],
  ["ENOENT", "execution-error", null],
  ["ENOBUFS", "execution-output-limit", "SIGTERM"],
]) {
  test(`returned ${errorCode} is classified before parsing empty stdout`, () => {
    const measured = evaluateAuditResult({
      stdout: "",
      stderr: "fixture-private-diagnostic",
      status: null,
      signal,
      error: { code: errorCode, message: "fixture-private-diagnostic" },
    });
    assert.equal(measured.state, "INCOMPLETE");
    assert.equal(measured.reason, reason);
    assert.equal(measured.errorCode, errorCode);
    assert.equal(measured.signal, signal);
    assert.equal(measured.exitCode, null);
    assert.equal(measured.counts, undefined);
    assert.equal(measured.report, undefined);
    assert.doesNotMatch(JSON.stringify(measured), /fixture-private-diagnostic/);
  });
}

test("a signalled audit cannot classify a valid JSON report as measured findings", () => {
  const measured = evaluateAuditResult({ ...result({ critical: 1 }), signal: "SIGKILL" });
  assert.equal(measured.state, "INCOMPLETE");
  assert.equal(measured.reason, "execution-signal");
  assert.equal(measured.errorCode, null);
  assert.equal(measured.signal, "SIGKILL");
  assert.equal(measured.exitCode, 1);
  assert.equal(measured.counts, undefined);
  assert.equal(measured.report, undefined);
});

test("invalid JSON without an execution failure remains a parsing failure", () => {
  const measured = evaluateAuditResult({ status: 0, stdout: "not-json", signal: null });
  assert.equal(measured.state, "INCOMPLETE");
  assert.equal(measured.reason, "invalid-json");
  assert.equal(measured.counts, undefined);
});

test("execution metadata accepts only known codes, signals and numeric exit codes", () => {
  const measured = evaluateAuditResult({
    stdout: "",
    stderr: "fixture-private-diagnostic",
    status: "fixture-private-diagnostic",
    signal: "fixture-private-diagnostic",
    error: {
      code: "fixture-private-diagnostic",
      message: "fixture-private-diagnostic",
      env: { TOKEN: "fixture-private-diagnostic" },
    },
  });
  assert.equal(measured.state, "INCOMPLETE");
  assert.equal(measured.reason, "execution-error");
  assert.equal(measured.errorCode, "UNKNOWN");
  assert.equal(measured.signal, "UNKNOWN");
  assert.equal(measured.exitCode, null);
  assert.doesNotMatch(JSON.stringify(measured), /fixture-private-diagnostic|TOKEN/);
});

test("a returned timeout preserves scope metadata and the four other audit results", (t) => {
  const root = mkdtempSync(join(tmpdir(), "dependency-audit-timeout-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const scope of AUDIT_SCOPES) {
    mkdirSync(join(root, scope), { recursive: true });
    writeFileSync(join(root, scope, "package-lock.json"), "{}");
  }
  const report = auditDependencies({
    root,
    run: (_cmd, _args, options) =>
      options.cwd === root
        ? {
            stdout: "",
            stderr: "fixture-private-diagnostic",
            status: null,
            signal: "SIGTERM",
            error: { code: "ETIMEDOUT", message: "fixture-private-diagnostic" },
          }
        : result(),
  });
  assert.equal(report.complete, false);
  assert.equal(report.ok, false);
  assert.equal(report.results.length, AUDIT_SCOPES.length);
  assert.equal(report.results.filter((scope) => scope.state === "PASS").length, 4);
  const failed = report.results.find((scope) => scope.scope === ".");
  assert.equal(failed.state, "INCOMPLETE");
  assert.equal(failed.reason, "execution-timeout");
  assert.equal(failed.errorCode, "ETIMEDOUT");
  assert.equal(failed.signal, "SIGTERM");
  assert.equal(failed.exitCode, null);
  assert.match(failed.lockSha256, /^[a-f0-9]{64}$/);
  assert.doesNotMatch(JSON.stringify(report), /fixture-private-diagnostic/);
});

test("thrown invocation failures retain only allowlisted metadata", (t) => {
  const root = mkdtempSync(join(tmpdir(), "dependency-audit-invocation-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, "package-lock.json"), "{}");
  const report = auditDependencies({
    root,
    scopes: ["."],
    run: () => {
      throw Object.assign(new Error("fixture-private-diagnostic"), {
        code: "fixture-private-diagnostic",
      });
    },
  });
  assert.equal(report.complete, false);
  assert.equal(report.ok, false);
  assert.equal(report.results[0].state, "INCOMPLETE");
  assert.equal(report.results[0].reason, "audit-invocation-failed");
  assert.equal(report.results[0].errorCode, "UNKNOWN");
  assert.equal(report.results[0].signal, null);
  assert.equal(report.results[0].exitCode, null);
  assert.doesNotMatch(JSON.stringify(report), /fixture-private-diagnostic/);
});
