import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const VERSION = "2.27.5";
const SHA = /^[a-f0-9]{40}$/;
const DIGEST = /^[a-f0-9]{64}$/;
const POSITIVE_ID = /^[1-9]\d*$/;

function hash(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function validIdentity(identity) {
  return (
    SHA.test(identity.commit) &&
    SHA.test(identity.tree) &&
    SHA.test(identity.workflow) &&
    POSITIVE_ID.test(identity.run) &&
    POSITIVE_ID.test(identity.attempt)
  );
}

function fingerprintResult(result, run, rules) {
  const location = result.locations?.[0]?.physicalLocation?.artifactLocation;
  const indexed = run.artifacts?.[location?.index]?.location;
  const uri = location?.uri ?? indexed?.uri;
  const base = location?.uriBaseId ?? indexed?.uriBaseId;
  const lineHash = result.partialFingerprints?.primaryLocationLineHash;
  if (!rules.has(result.ruleId) || typeof lineHash !== "string" || !lineHash.trim()) {
    throw new Error("Missing CodeQL rule or primary-location fingerprint");
  }
  if (result.suppressions?.length) throw new Error("Unexpected SARIF suppression");
  const path = typeof uri === "string" ? decodeURIComponent(uri).replace(/^\.\//, "") : "";
  if (
    !path ||
    path.startsWith("/") ||
    /[:\\\x00]/.test(path) ||
    path.split("/").includes("..") ||
    (base !== undefined && base !== "%SRCROOT%")
  ) {
    throw new Error("CodeQL primary location is outside the repository-relative scope");
  }
  return hash([result.ruleId, path, lineHash]);
}

export function collectCodeqlEvidence(document, identity) {
  if (!validIdentity(identity)) throw new Error("Invalid scan identity");
  const run = document?.runs?.[0];
  const driver = run?.tool?.driver;
  if (
    document?.version !== "2.1.0" ||
    document.runs.length !== 1 ||
    driver?.name !== "CodeQL" ||
    driver.semanticVersion !== VERSION ||
    !Array.isArray(run.results) ||
    !Array.isArray(run.invocations) ||
    !run.invocations.length ||
    run.invocations.some((invocation) => invocation.executionSuccessful !== true)
  ) {
    throw new Error("Expected a complete CodeQL SARIF run with the pinned engine");
  }
  const rules = new Set(
    [driver, ...(run.tool.extensions ?? [])].flatMap((component) =>
      (component.rules ?? []).map((rule) => rule.id)
    )
  );
  if (!rules.size || [...rules].some((rule) => typeof rule !== "string" || !rule)) {
    throw new Error("Missing CodeQL rule inventory");
  }
  return {
    schemaVersion: 1,
    ...identity,
    version: VERSION,
    rules: hash([...rules].sort()),
    findings: run.results.map((result) => fingerprintResult(result, run, rules)).sort(),
  };
}

export function compareCodeqlEvidence(base, candidate, expected) {
  for (const [evidence, commit] of [
    [base, expected.base],
    [candidate, expected.candidate],
  ]) {
    if (
      !validIdentity(evidence) ||
      evidence.schemaVersion !== 1 ||
      evidence.commit !== commit ||
      evidence.workflow !== expected.workflow ||
      evidence.run !== expected.run ||
      evidence.attempt !== expected.attempt ||
      evidence.version !== VERSION ||
      !DIGEST.test(evidence.rules) ||
      !Array.isArray(evidence.findings) ||
      evidence.findings.some((entry) => !DIGEST.test(entry))
    ) {
      throw new Error("Invalid scan evidence or identity mismatch");
    }
  }
  if (base.commit === candidate.commit || base.rules !== candidate.rules) {
    throw new Error("Expected distinct commits scanned with an identical rule inventory");
  }

  const remaining = new Map();
  for (const finding of base.findings) remaining.set(finding, (remaining.get(finding) ?? 0) + 1);
  let added = 0;
  for (const finding of candidate.findings) {
    const count = remaining.get(finding) ?? 0;
    if (count) remaining.set(finding, count - 1);
    else added++;
  }
  const removed = [...remaining.values()].reduce((sum, count) => sum + count, 0);
  return {
    ...expected,
    baseTree: base.tree,
    candidateTree: candidate.tree,
    version: VERSION,
    rules: base.rules,
    before: base.findings.length,
    after: candidate.findings.length,
    added,
    removed,
    verdict: added ? "NEW_FINDINGS" : removed ? "REDUCED" : "UNCHANGED",
    scope: "javascript-typescript-sarif",
    qualityAcceptance: false,
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const [mode, first, second, third] = process.argv.slice(2);
  const load = (path) => JSON.parse(readFileSync(path, "utf8"));
  try {
    const result =
      mode === "collect"
        ? collectCodeqlEvidence(load(first), load(second))
        : mode === "compare"
          ? compareCodeqlEvidence(load(first), load(second), load(third))
          : null;
    if (!result) throw new Error("Expected collect or compare");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`CodeQL evidence incomplete: ${error.message}`);
    process.exitCode = 1;
  }
}
