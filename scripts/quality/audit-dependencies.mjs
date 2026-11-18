#!/usr/bin/env node
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { constants } from "node:os";
import { pathToFileURL } from "node:url";

export const AUDIT_SCOPES = [
  ".",
  "electron",
  "@omniroute/opencode-plugin",
  "@omniroute/opencode-plugin-v2",
  "@omniroute/opencode-provider",
];
const SEVERITIES = ["info", "low", "moderate", "high", "critical"];
const EXECUTION_ERROR_CODES = new Set([
  ...Object.keys(constants.errno),
  "ERR_CHILD_PROCESS_STDIO_MAXBUFFER",
]);
const EXECUTION_SIGNALS = new Set(Object.keys(constants.signals));

function executionMetadata(result) {
  const errorCode = result.error?.code;
  return {
    errorCode: result.error ? (EXECUTION_ERROR_CODES.has(errorCode) ? errorCode : "UNKNOWN") : null,
    signal: result.signal
      ? EXECUTION_SIGNALS.has(result.signal)
        ? result.signal
        : "UNKNOWN"
      : null,
    exitCode: Number.isSafeInteger(result.status) ? result.status : null,
  };
}

export function evaluateAuditResult(result) {
  // spawnSync returns execution faults instead of throwing them. Inspect those
  // before parsing stdout: an interrupted audit has no completed measurement.
  if (result.error || result.signal) {
    const metadata = executionMetadata(result);
    const reason =
      metadata.errorCode === "ETIMEDOUT"
        ? "execution-timeout"
        : ["ENOBUFS", "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"].includes(metadata.errorCode)
          ? "execution-output-limit"
          : result.error
            ? "execution-error"
            : "execution-signal";
    return { state: "INCOMPLETE", reason, ...metadata };
  }
  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch {
    return { state: "INCOMPLETE", reason: "invalid-json" };
  }
  const counts = report?.metadata?.vulnerabilities;
  if (
    ![0, 1].includes(result.status) ||
    report?.error ||
    report?.auditReportVersion !== 2 ||
    !counts ||
    [...SEVERITIES, "total"].some((key) => !Number.isSafeInteger(counts[key]) || counts[key] < 0) ||
    SEVERITIES.reduce((sum, key) => sum + counts[key], 0) !== counts.total ||
    (result.status === 0) !== (counts.critical === 0)
  ) {
    return { state: "INCOMPLETE", reason: "invalid-or-failed-audit" };
  }
  return { state: counts.critical ? "FAIL" : "PASS", counts, report };
}

export function auditDependencies({
  root = process.cwd(),
  run = spawnSync,
  scopes = AUDIT_SCOPES,
  outputDir,
} = {}) {
  const results = scopes.map((scope) => {
    const cwd = resolve(root, scope);
    const lock = join(cwd, "package-lock.json");
    if (!existsSync(lock)) return { scope, state: "INCOMPLETE", reason: "lockfile-absent" };
    const startedAt = new Date().toISOString();
    let lockSha256;
    let result;
    try {
      lockSha256 = createHash("sha256").update(readFileSync(lock)).digest("hex");
      result = run(
        process.platform === "win32" ? "npm.cmd" : "npm",
        ["audit", "--json", "--audit-level=critical"],
        {
          cwd,
          encoding: "utf8",
          timeout: 120000,
          maxBuffer: 32 * 1024 * 1024,
        }
      );
    } catch (error) {
      return {
        scope,
        ...(lockSha256 ? { lockSha256 } : {}),
        startedAt,
        finishedAt: new Date().toISOString(),
        state: "INCOMPLETE",
        reason: "audit-invocation-failed",
        ...executionMetadata({ error }),
      };
    }
    const evaluated = evaluateAuditResult(result);
    let reportPath;
    if (outputDir && evaluated.report) {
      mkdirSync(outputDir, { recursive: true });
      reportPath = join(
        outputDir,
        `${scope === "." ? "root" : scope.replaceAll(/[^a-z0-9-]/gi, "-")}.json`
      );
      writeFileSync(reportPath, JSON.stringify(evaluated.report, null, 2) + "\n");
    }
    const { report, ...summary } = evaluated;
    return {
      scope,
      lockSha256,
      startedAt,
      finishedAt: new Date().toISOString(),
      ...executionMetadata(result),
      ...summary,
      ...(reportPath ? { reportPath } : {}),
    };
  });
  const complete = results.every((result) => result.state !== "INCOMPLETE");
  return {
    schemaVersion: 1,
    policy: { blockingSeverity: "critical", high: "warning" },
    complete,
    ok: complete && results.every((result) => result.state === "PASS"),
    results,
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const outputDir = resolve("_artifacts/dependency-audit");
  const report = auditDependencies({ outputDir });
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "summary.json"), JSON.stringify(report, null, 2) + "\n");
  for (const result of report.results) {
    console.log(
      `[audit:deps] ${result.scope}: ${result.state} ${result.counts ? JSON.stringify(result.counts) : result.reason}`
    );
    if (result.counts?.high)
      console.log(
        `::warning::${result.scope}: ${result.counts.high} high-severity advisory records (current policy: warning)`
      );
  }
  console.log(`dependencyAudit=${report.complete ? (report.ok ? "PASS" : "FAIL") : "INCOMPLETE"}`);
  process.exitCode = !report.complete ? 2 : report.ok ? 0 : 1;
}
