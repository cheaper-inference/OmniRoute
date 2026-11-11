#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REVIEWED_EXPIRY = "2026-12-02T00:00:00Z";
const TRACKING_ISSUE = "https://github.com/cheaper-inference/OmniRoute/issues/18765";
const REVIEWED_PATHS = {
  "CVE-2026-118764": "usr/local/lib/node_modules/npm/node_modules/minimatch/package.json",
  "CVE-2026-118773": "usr/local/lib/node_modules/npm/node_modules/glob/package.json",
};

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireKeys(value, expected, message) {
  requireCondition(isRecord(value), message);
  const actual = Object.keys(value).sort();
  requireCondition(JSON.stringify(actual) === JSON.stringify(expected.toSorted()), message);
}

// JSON syntax is a YAML subset and avoids installing a YAML parser in the scan job.
// Reject ambiguous duplicate keys: JSON.parse would keep the last occurrence while
// Trivy's YAML decoder rejects the file. JSON.parse has already checked the grammar.
function rejectDuplicateKeys(source) {
  const stack = [];
  for (const match of source.matchAll(/"(?:\\.|[^"\\])*"|[{}\[\],:]/g)) {
    const token = match[0];
    if (token === "{" || token === "[") {
      stack.push({ object: token === "{", keys: new Set(), expectsKey: true });
    } else if (token === "}" || token === "]") {
      stack.pop();
    } else {
      const frame = stack.at(-1);
      if (!frame?.object) continue;
      if (token === ",") frame.expectsKey = true;
      else if (token === ":") frame.expectsKey = false;
      else if (frame.expectsKey && token.startsWith('"')) {
        const key = JSON.parse(token);
        requireCondition(!frame.keys.has(key), "Duplicate policy keys are invalid");
        frame.keys.add(key);
        frame.expectsKey = false;
      }
    }
  }
}

export function parseTrivyIgnorePolicy(source) {
  requireCondition(
    typeof source === "string" && Buffer.byteLength(source) <= 65536,
    "The Trivy policy must be a JSON-formatted YAML document no larger than 64 KiB"
  );
  let policy;
  try {
    policy = JSON.parse(source);
  } catch {
    throw new Error("The Trivy policy must use valid JSON syntax, a YAML subset");
  }
  rejectDuplicateKeys(source);
  return policy;
}

export function validateTrivyIgnorePolicyShape(policy) {
  requireKeys(policy, ["vulnerabilities"], "Only vulnerability exceptions are reviewed");
  requireCondition(
    Array.isArray(policy.vulnerabilities),
    "The vulnerability exceptions must be an array"
  );
  requireCondition(
    policy.vulnerabilities.length <= 2,
    "At most two reviewed exceptions may remain tracked in #18765"
  );
  const seen = new Set();
  for (const entry of policy.vulnerabilities) {
    requireKeys(
      entry,
      ["id", "paths", "expired_at", "statement"],
      "Every exception needs id, paths, expired_at and statement only"
    );
    requireCondition(
      typeof entry.id === "string" && Object.hasOwn(REVIEWED_PATHS, entry.id),
      "An exception has an unreviewed vulnerability ID"
    );
    requireCondition(!seen.has(entry.id), "Duplicate vulnerability exceptions are invalid");
    seen.add(entry.id);
    requireCondition(
      Array.isArray(entry.paths) &&
        entry.paths.length === 1 &&
        entry.paths[0] === REVIEWED_PATHS[entry.id],
      "An exception must use its exact observed npm package path"
    );
    requireCondition(
      typeof entry.expired_at === "string" &&
        /^\d{4}-\d{2}-\d{2}T00:00:00Z$/.test(entry.expired_at),
      "Every expiry must be an explicit UTC midnight timestamp"
    );
    const expiry = Date.parse(entry.expired_at);
    requireCondition(
      Number.isFinite(expiry) &&
        new Date(expiry).toISOString() === entry.expired_at.replace("Z", ".000Z"),
      "The exception expiry is not a valid calendar date"
    );
    requireCondition(
      entry.expired_at === REVIEWED_EXPIRY,
      "The reviewed expiry must remain 2026-12-02T00:00:00Z"
    );
    requireCondition(
      typeof entry.statement === "string" &&
        entry.statement
          .split(/[\s()<>\[\]"'`]+/)
          .some((reference) => reference.replace(/[.,;:!?]+$/, "") === TRACKING_ISSUE),
      "Every exception must retain the tracking issue #18765"
    );
  }
  return { exceptions: seen.size, expiresAt: seen.size ? REVIEWED_EXPIRY : null };
}

export function validateTrivyIgnorePolicy(policy, { now = Date.now() } = {}) {
  requireCondition(Number.isFinite(now), "The policy validation clock must be a finite timestamp");
  const result = validateTrivyIgnorePolicyShape(policy);
  requireCondition(
    result.exceptions === 0 || now < Date.parse(result.expiresAt),
    "The accepted-risk policy has expired; review #18765 before scanning"
  );
  return result;
}

function main(args) {
  try {
    requireCondition(
      args.length <= 1 && (!args[0] || !args[0].startsWith("--")),
      "Usage: node scripts/check/check-trivy-ignore-policy.mjs [policy-file]"
    );
    const file = args[0] || ".trivyignore.yaml";
    requireCondition(fs.statSync(file).size <= 65536, "The Trivy policy exceeds 64 KiB");
    const result = validateTrivyIgnorePolicy(parseTrivyIgnorePolicy(fs.readFileSync(file, "utf8")));
    console.log(
      `Trivy exception configuration valid: ${result.exceptions} entries, expires ${result.expiresAt ?? "not applicable"}. Image scan not performed.`
    );
  } catch (error) {
    // Policy contents are repository configuration, but filesystem errors can include
    // local paths. Emit only controlled validation messages, never a raw stack/path.
    const message =
      error instanceof Error && !Object.hasOwn(error, "code")
        ? error.message
        : "The Trivy policy could not be read";
    console.error(`Trivy exception configuration failed: ${message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2));
}
