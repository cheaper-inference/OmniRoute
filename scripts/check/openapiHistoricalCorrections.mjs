import { createHash } from "node:crypto";

const SHA256 = /^[0-9a-f]{64}$/;
const SHA = /^[0-9a-f]{40}$/;
const METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS", "TRACE"]);
const FIELDS = ["id", "level", "operation", "path", "section", "fingerprint"];
const TRACKING_ISSUE = "https://github.com/cheaper-inference/OmniRoute/issues/17267";

export function hashOpenapiSource(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function requireValue(condition, reason) {
  if (!condition) throw new Error(reason);
}

function findingKey(finding) {
  requireValue(
    finding !== null &&
      typeof finding === "object" &&
      !Array.isArray(finding) &&
      typeof finding.id === "string" &&
      /^[a-z][a-z0-9-]+$/.test(finding.id) &&
      Number.isInteger(finding.level) &&
      finding.level >= 1 &&
      finding.level <= 3 &&
      METHODS.has(finding.operation) &&
      typeof finding.path === "string" &&
      finding.path.startsWith("/") &&
      typeof finding.section === "string" &&
      finding.section.length > 0 &&
      typeof finding.fingerprint === "string" &&
      /^[0-9a-f]{12,64}$/.test(finding.fingerprint),
    "invalid-finding"
  );
  return JSON.stringify(FIELDS.map((field) => finding[field]));
}

/** Scanner findings retain their original bytes/fields; the key is only for exact matching. */
export function validateOpenapiReport(report) {
  requireValue(Array.isArray(report), "invalid-report");
  const keys = new Set();
  const fingerprints = new Set();
  for (const finding of report) {
    const key = findingKey(finding);
    requireValue(!keys.has(key) && !fingerprints.has(finding.fingerprint), "duplicate-finding");
    keys.add(key);
    fingerprints.add(finding.fingerprint);
  }
  return report;
}

function validatePolicy(policy) {
  requireValue(policy?.schemaVersion === 1 && Array.isArray(policy.corrections), "invalid-policy");
  const ids = new Set();
  const findingKeys = new Set();
  const fingerprints = new Set();
  for (const entry of policy.corrections) {
    requireValue(
      entry?.status === "historical_spec_correction" &&
        typeof entry.id === "string" &&
        /^[a-z][a-z0-9-]+$/.test(entry.id) &&
        !ids.has(entry.id) &&
        entry.trackingIssue === TRACKING_ISSUE &&
        typeof entry.justification === "string" &&
        entry.justification.trim().length >= 80 &&
        SHA.test(entry.baseSha || "") &&
        SHA.test(entry.reviewedCandidateSha || "") &&
        SHA256.test(entry.baseSpecSha256 || "") &&
        SHA256.test(entry.candidateSpecSha256 || "") &&
        entry.baseSpecSha256 !== entry.candidateSpecSha256 &&
        entry.scannerVersion === "1.19.1" &&
        /^\d{4}-\d{2}-\d{2}$/.test(entry.expiresOn || "") &&
        Number.isFinite(Date.parse(`${entry.expiresOn}T00:00:00Z`)) &&
        new Date(`${entry.expiresOn}T00:00:00Z`).toISOString().slice(0, 10) === entry.expiresOn &&
        Array.isArray(entry.contractSources) &&
        entry.contractSources.length > 0 &&
        Array.isArray(entry.findings) &&
        entry.findings.length > 0,
      "unbounded-or-undocumented-correction"
    );
    ids.add(entry.id);
    const paths = new Set();
    for (const source of entry.contractSources) {
      requireValue(
        typeof source.path === "string" &&
          /^(src|open-sse)\/[A-Za-z0-9_@./[\]-]+\.ts$/.test(source.path) &&
          !source.path.split("/").some((part) => part === "." || part === "..") &&
          !paths.has(source.path) &&
          SHA256.test(source.baseSha256 || "") &&
          SHA256.test(source.candidateSha256 || ""),
        "invalid-contract-source-binding"
      );
      paths.add(source.path);
    }
    validateOpenapiReport(entry.findings);
    for (const finding of entry.findings) {
      const key = findingKey(finding);
      requireValue(
        !findingKeys.has(key) && !fingerprints.has(finding.fingerprint),
        "duplicate-correction"
      );
      findingKeys.add(key);
      fingerprints.add(finding.fingerprint);
    }
  }
}

/**
 * A reviewed historical correction is bound to the complete old/new spec and contract sources.
 * Unrelated comparisons gain no allowance; the numeric baseline never authorizes an unknown.
 * readContract returns immutable base/candidate bytes plus the actual candidate worktree bytes.
 */
export function assessOpenapiHistoricalCorrections({
  report,
  policy,
  comparison,
  baseSpec,
  candidateSpec,
  scannerVersion,
  readContract,
  now = new Date(),
}) {
  validateOpenapiReport(report);
  validatePolicy(policy);
  requireValue(
    SHA.test(comparison?.baseSha || "") && SHA.test(comparison?.candidateSha || ""),
    "invalid-comparison"
  );
  const matched = new Map();
  const observed = new Set(report.map(findingKey));
  const activeCorrections = [];
  for (const entry of policy.corrections) {
    // Once the event base already contains the correction, this historical record is inactive.
    // Do not turn an unrelated zero-findings comparison into a stale-allowlist failure.
    if (entry.baseSha !== comparison.baseSha) continue;
    requireValue(
      hashOpenapiSource(baseSpec) === entry.baseSpecSha256 &&
        hashOpenapiSource(candidateSpec) === entry.candidateSpecSha256,
      "historical-spec-binding-mismatch"
    );
    requireValue(scannerVersion === entry.scannerVersion, "historical-scanner-binding-mismatch");
    requireValue(entry.expiresOn > now.toISOString().slice(0, 10), "historical-correction-expired");
    for (const source of entry.contractSources) {
      const bytes = readContract(source.path);
      requireValue(
        hashOpenapiSource(bytes.base) === source.baseSha256 &&
          hashOpenapiSource(bytes.candidate) === source.candidateSha256 &&
          hashOpenapiSource(bytes.worktree) === source.candidateSha256,
        "historical-contract-binding-mismatch"
      );
    }
    for (const finding of entry.findings) {
      const key = findingKey(finding);
      requireValue(observed.has(key), "historical-finding-missing-or-changed");
      matched.set(key, entry);
    }
    activeCorrections.push(entry.id);
  }
  const accepted = [];
  const unknown = [];
  for (const finding of report) {
    const entry = matched.get(findingKey(finding));
    if (entry)
      accepted.push({ finding, correctionId: entry.id, trackingIssue: entry.trackingIssue });
    else unknown.push(finding);
  }
  return {
    raw: report,
    rawCount: report.length,
    accepted,
    acceptedCount: accepted.length,
    unknown,
    unknownCount: unknown.length,
    activeCorrections,
  };
}
