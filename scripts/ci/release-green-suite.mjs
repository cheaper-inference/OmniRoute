#!/usr/bin/env node
// Writes the result of one hosted Release-Green suite job (a `suites` matrix leg of
// nightly-release-green.yml) for the validator's --suites-from reader.
// Usage: node scripts/ci/release-green-suite.mjs <name> <exitCode> <logFile> <outDir>
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { firstFailureLine } from "../quality/validate-release-green.mjs";

const NAME_RE = /^(unit-\d+|integration-\d+|vitest)$/;

/** The JSON one suite job reports: its name, exit code and first failure line. */
export function suiteResult(name, exitCode, log) {
  if (!NAME_RE.test(name)) throw new Error(`unknown suite name: ${name}`);
  const code = Number(exitCode);
  if (!Number.isInteger(code) || code < 0 || code > 255) {
    throw new Error(`invalid exit code: ${exitCode}`);
  }
  return { name, code, detail: code === 0 ? "pass" : firstFailureLine(log) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [name, exitCode, logFile, outDir] = process.argv.slice(2);
  let log = "";
  try {
    log = readFileSync(logFile, "utf8");
  } catch {
    log = "";
  }
  const result = suiteResult(name, exitCode, log);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${name}.json`), `${JSON.stringify(result)}\n`);
  console.log(`[release-green-suite] ${name}: exit ${result.code}`);
}
