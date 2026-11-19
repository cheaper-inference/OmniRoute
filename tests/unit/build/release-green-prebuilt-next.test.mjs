import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const posix = { skip: process.platform === "win32", timeout: 30000 };
const candidateSha = "1".repeat(40);
const oldSha = "2".repeat(40);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

// The composed RC04 observer/gate run for real. Only external commands and the
// product bytes are tiny fixtures. No Next build, npm install or server starts.
function observe(
  t,
  { failFreshProducer = false, emptyFreshProducer = false, foreignProduct = false } = {}
) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const directory = mkdtempSync(join(artifacts, "next-producer-observer-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const path of [
    "scripts/quality",
    "scripts/build",
    "config/quality",
    "bin",
    "node_modules/eslint/bin",
    ".build/next/standalone",
    "dist",
  ])
    mkdirSync(join(directory, path), { recursive: true });
  for (const name of [
    "validate-release-green.mjs",
    "gate-process.mjs",
    "release-green-static-profile.mjs",
    "eslint-measurement.mjs",
  ])
    copyFileSync(join(root, "scripts/quality", name), join(directory, "scripts/quality", name));
  for (const name of ["build-fresh-next.mjs", "standaloneInput.mjs"]) {
    copyFileSync(join(root, "scripts/build", name), join(directory, "scripts/build", name));
  }
  writeFileSync(join(directory, "package.json"), JSON.stringify({ type: "commonjs" }));
  writeFileSync(join(directory, "package-lock.json"), '{"lockfileVersion":3}\n');
  writeFileSync(
    join(directory, "config/quality/quality-baseline.json"),
    JSON.stringify({
      metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 0 } },
    })
  );
  const source = join(directory, ".build/next/standalone/server.js");
  const nextMarker = join(directory, "fresh-next-produced");
  const trace = join(directory, "commands.jsonl");
  const initial = failFreshProducer
    ? `OLD_STANDALONE:${oldSha}`
    : `CURRENT_STANDALONE:${candidateSha}`;
  writeFileSync(source, initial);
  const executable = (name, content) =>
    writeFileSync(join(directory, name), `#!${process.execPath}\n${content}`, { mode: 0o755 });
  executable("bin/git", `if(process.argv[2] === "rev-parse") console.log("${candidateSha}");`);
  executable(
    "bin/npm",
    `
    const fs = require("node:fs");
    const script = process.argv[3];
    const source = ${JSON.stringify(source)};
    fs.appendFileSync(${JSON.stringify(trace)}, JSON.stringify({
      script, args: process.argv.slice(4),
      input: script === "build:cli" ? fs.readFileSync(source, "utf8") : null,
      requirePrebuilt: process.env.OMNIROUTE_REQUIRE_PREBUILT_NEXT || null,
    }) + "\\n");
    if(script === "build") {
      if(${failFreshProducer}) process.exit(23);
      if(${emptyFreshProducer}) process.exit(0);
      fs.mkdirSync(require("node:path").dirname(source), { recursive: true });
      fs.writeFileSync(source, "CURRENT_STANDALONE:${candidateSha}");
      fs.writeFileSync(".build/next/BUILD_ID", "fresh-build-id");
      fs.writeFileSync(${JSON.stringify(nextMarker)}, "fresh");
    }
    if(script === "build:cli") {
      fs.mkdirSync("dist", { recursive: true });
      fs.copyFileSync(source, "dist/server.js");
    }
    if(script === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");
    if(script === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");
  `
  );
  writeFileSync(
    join(directory, "scripts/build/build-next-isolated.mjs"),
    `
    export const getEffectiveBuildMemoryBytes = () => 8 * 1024 ** 3;
    export const resolveNextBuildBundlerFlag = () => "--webpack";
  `
  );
  if (foreignProduct) {
    writeFileSync(
      join(directory, "scripts/quality/gate-process.mjs"),
      `
      import { readFileSync, writeFileSync } from "node:fs";
      import { runGateProcess as actual } from ${JSON.stringify(pathToFileURL(join(root, "scripts/quality/gate-process.mjs")).href)};
      export async function runGateProcess(command, args, options) {
        const result = await actual(command, args, options);
        if(args[0] === "scripts/build/build-fresh-next.mjs" && result.code === 0) {
          const path = ${JSON.stringify(join(directory, ".build/next/.omniroute-next-input.json"))};
          const proof = JSON.parse(readFileSync(path));
          proof.producer.phase.invocationId = "44444444-4444-4444-8444-444444444444";
          writeFileSync(path, JSON.stringify(proof));
        }
        return result;
      }
    `
    );
  }
  writeFileSync(
    join(directory, "scripts/build/write-build-sha.mjs"),
    `
    import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
    appendFileSync(${JSON.stringify(trace)}, JSON.stringify({
      script: "stamp-build-sha", args: [], input: readFileSync("dist/server.js", "utf8"),
    }) + "\\n");
    writeFileSync("dist/BUILD_SHA", "${candidateSha}");
  `
  );
  executable(
    "node_modules/eslint/bin/eslint.js",
    `
    const output = process.argv.indexOf("--output-file");
    require("node:fs").writeFileSync(process.argv[output + 1], JSON.stringify([
      { filePath: "fixture.ts", errorCount: 0, warningCount: 0 },
    ]));
  `
  );
  const result = spawnSync(
    process.execPath,
    [
      join(directory, "scripts/quality/validate-release-green.mjs"),
      "--with-build",
      "--quick",
      "--json",
    ],
    {
      cwd: directory,
      env: { PATH: join(directory, "bin"), LANG: "C.UTF-8" },
      encoding: "utf8",
      timeout: 25000,
      maxBuffer: 8 * 1024 * 1024,
    }
  );
  assert.equal(result.error, undefined);
  const calls = existsSync(trace)
    ? readFileSync(trace, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    : [];
  return {
    ...result,
    calls,
    report: result.stdout.trim() ? JSON.parse(result.stdout) : null,
    distBytes: existsSync(join(directory, "dist/server.js"))
      ? readFileSync(join(directory, "dist/server.js"), "utf8")
      : null,
    stampedSha: existsSync(join(directory, "dist/BUILD_SHA"))
      ? readFileSync(join(directory, "dist/BUILD_SHA"), "utf8")
      : null,
    freshProduced: existsSync(nextMarker),
  };
}

test(
  "Next observer harness preserves real RC04 command receipts for small fixture commands",
  posix,
  (t) => {
    const result = observe(t);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.report.releaseGreen, true);
    assert.equal(result.distBytes, `CURRENT_STANDALONE:${candidateSha}`);
    const phases = result.report.commandReceipts.filter((entry) => entry.packPhase);
    assert.deepEqual(
      phases.map((entry) => entry.packPhase.phaseId),
      ["build-next", "build-cli", "stamp-build-sha", "validate-pack-artifact"]
    );
    assert.equal(result.freshProduced, true);
    assert.equal(result.calls.find((entry) => entry.script === "build:cli").requirePrebuilt, "1");
    for (const receipt of phases) {
      assert.match(receipt.invocationId, uuid);
      assert.equal(receipt.packPhase.invocationId, receipt.invocationId);
      assert.equal(receipt.packPhase.candidateSha, candidateSha);
      assert.equal(receipt.outcome, "PASS");
      assert.equal(receipt.exitCode, 0);
    }
  }
);

for (const [name, options] of [
  ["successful producer without new output", { emptyFreshProducer: true }],
  ["product from a foreign command UUID", { foreignProduct: true }],
]) {
  test(`Next observer rejects ${name} before stamping`, posix, (t) => {
    const result = observe(t, options);
    assert.equal(result.status, 1, result.stderr);
    assert.equal(result.report.releaseGreen, false);
    assert.equal(
      result.calls.some((entry) => entry.script === "build:cli"),
      false
    );
    assert.equal(result.stampedSha, null);
    const pack = result.report.checks.find((entry) => entry.id === "pack-artifact");
    assert.equal(pack.phaseId, "build-next");
    assert.match(pack.causeId, uuid);
    if (options.foreignProduct) assert.equal(pack.evidenceState, "INCOMPLETE");
  });
}

test(
  "Next observer cannot restamp stale standalone when the current producer would fail",
  posix,
  (t) => {
    const result = observe(t, { failFreshProducer: true });
    assert.equal(
      result.status,
      1,
      `stale input was accepted: ${JSON.stringify({ calls: result.calls, distBytes: result.distBytes, stampedSha: result.stampedSha })}`
    );
    assert.equal(result.report.releaseGreen, false);
    const pack = result.report.checks.find((entry) => entry.id === "pack-artifact");
    assert.equal(pack.ok, false);
    assert.equal(
      result.calls.some((entry) => entry.script === "build:cli"),
      false
    );
    assert.equal(
      result.calls.some((entry) => entry.script === "stamp-build-sha"),
      false
    );
    assert.equal(
      result.calls.some((entry) => entry.script === "check:pack-artifact"),
      false
    );
    assert.equal(result.freshProduced, false);
    assert.equal(result.stampedSha, null, "a new label cannot certify previous product bytes");
  }
);
