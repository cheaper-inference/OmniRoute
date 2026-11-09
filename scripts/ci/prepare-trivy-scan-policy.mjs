#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  parseTrivyIgnorePolicy,
  validateTrivyIgnorePolicy,
  validateTrivyIgnorePolicyShape,
} from "../check/check-trivy-ignore-policy.mjs";

function scope(policy) {
  return policy.vulnerabilities
    .map((entry) => ({
      id: entry.id,
      paths: entry.paths,
      expired_at: entry.expired_at,
      issue: "https://github.com/cheaper-inference/OmniRoute/issues/18765",
    }))
    .toSorted((a, b) => a.id.localeCompare(b.id));
}

export function selectTrivyScanPolicy(reviewedSource, candidateSource, { now = Date.now() } = {}) {
  const reviewed = parseTrivyIgnorePolicy(reviewedSource);
  // Invalid configuration is always an error; unused expiry is not. Older tags
  // without a reviewed policy must still be scanned, with no accepted exceptions.
  validateTrivyIgnorePolicyShape(reviewed);
  if (candidateSource === null) {
    return { mode: "no-exceptions", policy: { vulnerabilities: [] } };
  }
  const candidate = parseTrivyIgnorePolicy(candidateSource);
  validateTrivyIgnorePolicyShape(candidate);
  if (JSON.stringify(scope(candidate)) !== JSON.stringify(scope(reviewed))) {
    throw new Error("Candidate policy does not match the reviewed workflow scope");
  }
  // Expiry belongs to the set that will actually be used by both scans.
  validateTrivyIgnorePolicy(candidate, { now });
  return {
    mode: reviewed.vulnerabilities.length ? "reviewed-exceptions" : "no-exceptions",
    policy: reviewed,
  };
}

function readCandidate(file) {
  try {
    if (!fs.lstatSync(file).isFile()) throw new Error("Candidate policy must be a regular file");
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
  return fs.readFileSync(file, "utf8");
}

function main(args) {
  try {
    if (args.length !== 3 || args.some((arg) => arg.startsWith("--"))) {
      throw new Error(
        "Usage: prepare-trivy-scan-policy.mjs reviewed-policy candidate-policy output-policy"
      );
    }
    const [reviewed, candidate, output] = args;
    if ([reviewed, candidate].some((input) => path.resolve(input) === path.resolve(output))) {
      throw new Error("The effective policy must not overwrite either source policy");
    }
    const selected = selectTrivyScanPolicy(
      fs.readFileSync(reviewed, "utf8"),
      readCandidate(candidate)
    );
    fs.writeFileSync(output, JSON.stringify(selected.policy, null, 2) + "\n");
    console.log(
      JSON.stringify({
        mode: selected.mode,
        exceptions: selected.policy.vulnerabilities.length,
        imageScanned: false,
      })
    );
  } catch (error) {
    const message =
      error instanceof Error && !Object.hasOwn(error, "code")
        ? error.message
        : "A Trivy policy file could not be read or written";
    console.error(`Trivy policy preparation failed: ${message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2));
}
