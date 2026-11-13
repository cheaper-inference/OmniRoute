// scripts/merge-queue/classify.mjs — WP1 (pure). Plan §3.5: base-red vs PR-red vs infra.
//
// A red candidate is classified from normalized failure signatures (one per failing run). The
// base-red verdict needs POSITIVE evidence: a CI run of the same profile on the bare base SHA
// (contracts.baseCheckRef) that fails the same checks with the same failing tests/gates.

/**
 * @typedef {import("./checks.mjs").CheckRun} CheckRun
 * @typedef {import("./contracts.mjs").FailureSignature} FailureSignature
 * @typedef {import("./contracts.mjs").BaseCheck} BaseCheck
 */

/**
 * @typedef {object} Annotation      normalized by github.listCheckRunAnnotations
 * @property {string|null} path
 * @property {string|null} title
 * @property {string} message
 * @property {string} level          notice | warning | failure
 */

/** Messages GitHub/runners emit when the machine, not the code, failed. */
const INFRA_PATTERNS = [
  /runner has received a shutdown signal/i,
  /lost communication with the server/i,
  /the hosted runner encountered an error/i,
  /the self-hosted runner .* (?:is offline|was lost|stopped)/i,
  /CreateArtifact[\s\S]{0,200}\b404\b|\b404\b[\s\S]{0,200}CreateArtifact/i,
  /no space left on device/i,
  /the job was not acquired by runner/i,
];

/** Generic GitHub annotations that say a job failed/was cancelled without naming a test. */
const GENERIC_PATTERNS = [
  /^process completed with exit code \d+\.?$/i,
  /^the operation was canceled\.?$/i,
  /^the job (?:running on runner .* )?has exceeded the maximum execution time/i,
];

const ANSI_RE = /\u001b\[[0-9;?]*[ -/]*[@-~]/g;
const DURATION_RE = /\(?\b\d+(?:\.\d+)?\s?(?:ms|s|sec|secs|seconds|m|min|mins|minutes)\b\)?/gi;
const SHARD_SUFFIX_RE = /\s*\(\s*\d+\s*\/\s*\d+\s*\)\s*$/;

const text = (v) => String(v ?? "");
const isFailureLevel = (a) => text(a?.level).toLowerCase() === "failure";

function annotationText(a) {
  return `${text(a?.title)}\n${text(a?.message)}`;
}

function isInfraText(s) {
  return INFRA_PATTERNS.some((re) => re.test(s));
}

function isGenericAnnotation(a) {
  const msg = text(a?.message).trim();
  return GENERIC_PATTERNS.some((re) => re.test(msg));
}

/** Failure annotations that point at a real test/gate (not infra, not generic job noise). */
function specificFailures(annotations) {
  return (annotations ?? []).filter(
    (a) => isFailureLevel(a) && !isInfraText(annotationText(a)) && !isGenericAnnotation(a)
  );
}

/**
 * Positive evidence of an infrastructure failure for one run: runner lost / shutdown signal,
 * "lost communication with the server", `CreateArtifact` 404, "No space left on device",
 * startup_failure, job-level timed_out, or cancelled without any failure annotation.
 * Any failure annotation naming a real test/gate wins over infra evidence (not infra).
 * @param {CheckRun} run
 * @param {Annotation[]} annotations
 */
export function isInfraFailure(run, annotations) {
  if (specificFailures(annotations).length > 0) return false;
  const conclusion = run?.conclusion;
  if (conclusion === "startup_failure" || conclusion === "timed_out") return true;
  if (conclusion === "cancelled") return true;
  const haystack = [
    ...(annotations ?? []).map(annotationText),
    text(run?.output?.title),
    text(run?.output?.summary),
    text(run?.output?.text),
  ].join("\n");
  return isInfraText(haystack);
}

/** Lower-case, no ANSI codes, no durations, collapsed whitespace. */
export function normalizeKeyPart(value) {
  return text(value)
    .replace(ANSI_RE, "")
    .toLowerCase()
    .replace(DURATION_RE, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** "Unit Tests (3/8)" → "Unit Tests": shard suffixes move between base and candidate. */
export function normalizeCheckName(name) {
  return text(name).replace(SHARD_SUFFIX_RE, "").trim();
}

function signatureKey(run, annotations) {
  const parts = specificFailures(annotations)
    .map((a) => {
      const label = text(a.title).trim() ? a.title : text(a.message).split("\n")[0];
      return normalizeKeyPart(`${text(a.path)} ${label}`);
    })
    .filter(Boolean);
  if (parts.length) return [...new Set(parts)].sort().join(" | ");
  return normalizeKeyPart(run?.output?.title);
}

/**
 * One signature per failing run. `check` is the run name with any matrix shard suffix removed
 * ("Unit Tests (3/8)" → "Unit Tests"): shards re-balance when files are added, so the same
 * failing test can move between shards from base to candidate. `key` is the normalized failing
 * test/gate identifier from failure annotations (path + title, the first message line when the
 * title is empty; several are sorted and joined with " | "), else from output.title, else "".
 * @param {CheckRun[]} failures
 * @param {Object<number, Annotation[]>} annotationsByRunId
 * @returns {FailureSignature[]}
 */
export function extractSignatures(failures, annotationsByRunId) {
  return (failures ?? []).map((run) => {
    const annotations = annotationsByRunId?.[run?.id] ?? [];
    return {
      check: normalizeCheckName(run?.name),
      key: signatureKey(run, annotations),
      infra: isInfraFailure(run, annotations),
    };
  });
}

function sameFailure(a, b) {
  if (a.check !== b.check) return false;
  return !a.key || !b.key || a.key === b.key;
}

/**
 * Classify a red candidate:
 *  - every signature infra → "infra" (needs at least one signature);
 *  - baseCheck for the SAME base SHA is "green" → "pr-red";
 *  - baseCheck "red" and every non-infra signature matches one of its non-infra signatures
 *    (same `check`, and same `key` when both keys are non-empty) → "base-red"; otherwise
 *    "pr-red";
 *  - no finished baseCheck for this base SHA and baseRedIssueOpen → "needs-base-check";
 *  - otherwise → "pr-red".
 * `matched`/`unmatched` partition the non-infra signatures against the base check.
 * @param {{signatures: FailureSignature[], baseSha: string, baseCheck: BaseCheck|null,
 *          baseRedIssueOpen: boolean}} input
 * @returns {{kind: "infra"|"base-red"|"pr-red"|"needs-base-check", detail: string,
 *            matched: FailureSignature[], unmatched: FailureSignature[]}}
 */
export function classifyRed(input) {
  const signatures = input.signatures ?? [];
  const real = signatures.filter((s) => !s.infra);
  if (signatures.length > 0 && real.length === 0) {
    return {
      kind: "infra",
      detail: `all ${signatures.length} failure(s) are infrastructure`,
      matched: [],
      unmatched: [],
    };
  }

  const bc = input.baseCheck;
  const sameBase = Boolean(bc) && bc.baseSha === input.baseSha;
  if (sameBase && bc.status === "green") {
    return {
      kind: "pr-red",
      detail: `base ${text(input.baseSha).slice(0, 12)} is green on the same profile`,
      matched: [],
      unmatched: real,
    };
  }
  if (sameBase && bc.status === "red") {
    const baseReal = (bc.signatures ?? []).filter((s) => !s.infra);
    const matched = [];
    const unmatched = [];
    for (const sig of real)
      (baseReal.some((b) => sameFailure(sig, b)) ? matched : unmatched).push(sig);
    if (real.length > 0 && unmatched.length === 0) {
      return {
        kind: "base-red",
        detail: `all ${matched.length} failure(s) also fail on base ${text(input.baseSha).slice(0, 12)}`,
        matched,
        unmatched,
      };
    }
    return {
      kind: "pr-red",
      detail:
        `${unmatched.length} failure(s) not seen on base ${text(input.baseSha).slice(0, 12)}: ` +
        unmatched.map((s) => (s.key ? `${s.check} [${s.key}]` : s.check)).join("; "),
      matched,
      unmatched,
    };
  }

  if (input.baseRedIssueOpen) {
    return {
      kind: "needs-base-check",
      detail: "base-red issue open and no finished base check for this base SHA",
      matched: [],
      unmatched: real,
    };
  }
  return {
    kind: "pr-red",
    detail: "no base-red evidence for this base SHA",
    matched: [],
    unmatched: real,
  };
}
