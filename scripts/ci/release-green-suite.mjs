#!/usr/bin/env node
// Writes the result of one hosted Release-Green suite job (a `suites` matrix leg of
// nightly-release-green.yml) for the validator's --suites-from reader.
// Usage: node scripts/ci/release-green-suite.mjs <name> <exitCode> <logFile> <outDir> <workflowSha> <script> [shard]
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { firstFailureLine, hostedSuiteIdentity } from "../quality/validate-release-green.mjs";

const NAME_RE = /^(unit-\d+|integration-\d+|vitest)$/;

/** The JSON one suite job reports: its name, exit code and first failure line. */
export function suiteResult(name, exitCode, log) {
  if (!NAME_RE.test(name)) throw new Error(`unknown suite name: ${name}`);
  const code = Number(exitCode);
  if (
    !/^(0|[1-9][0-9]*)$/.test(String(exitCode)) ||
    !Number.isInteger(code) ||
    code < 0 ||
    code > 255
  ) {
    throw new Error(`invalid exit code: ${exitCode}`);
  }
  return { name, code, detail: code === 0 ? "pass" : firstFailureLine(log) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [name, exitCode, logFile, outDir, workflowSha, script, shard = ""] = process.argv.slice(2);
  let log = "";
  try {
    log = readFileSync(logFile, "utf8");
  } catch {
    log = "";
  }
  if (!log.trim()) throw new Error("missing or empty hosted suite log");
  const identity = hostedSuiteIdentity(process.cwd(), workflowSha);
  if (!identity) throw new Error("missing hosted suite execution identity");
  const result = {
    ...suiteResult(name, exitCode, log),
    ...identity,
    script: name === "vitest" ? "test:vitest+test:vitest:ui" : script,
    shard,
    logSha256: createHash("sha256").update(log).digest("hex"),
  };
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${name}.log`), log);
  writeFileSync(join(outDir, `${name}.json`), `${JSON.stringify(result)}\n`);
  console.log(`[release-green-suite] ${name}: exit ${result.code}`);
}
