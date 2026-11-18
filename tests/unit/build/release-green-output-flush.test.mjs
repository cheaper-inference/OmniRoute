import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const cliOptions = { skip: process.platform === "win32", timeout: 20000 };
const sha = "1".repeat(40);

// Run the actual observer with tiny command doubles. Only its stdout transport is
// fault-injected; the report, exit decision and signal handlers remain production code.
function observerFixture(t, { exitCode = 0, transport }) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const dir = mkdtempSync(join(artifacts, "observer-output-"));
  for (const path of ["scripts/quality", "scripts/ad-hoc", "config/quality", "bin"])
    mkdirSync(join(dir, path), { recursive: true });
  for (const name of [
    "validate-release-green.mjs",
    "gate-process.mjs",
    "release-green-static-profile.mjs",
    "eslint-measurement.mjs",
  ]) {
    copyFileSync(join(root, "scripts/quality", name), join(dir, "scripts/quality", name));
  }
  writeFileSync(join(dir, "package.json"), JSON.stringify({ type: "commonjs" }));
  writeFileSync(
    join(dir, "config/quality/quality-baseline.json"),
    JSON.stringify({
      metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 0 } },
    })
  );
  const executable = (name, body) =>
    writeFileSync(join(dir, name), `#!${process.execPath}\n${body}`, { mode: 0o755 });
  executable("bin/git", `console.log("${sha}");`);
  executable(
    "bin/npm",
    `
      const script = process.argv[3];
      if(script === "typecheck:core") process.exit(${exitCode});
      if(script === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");
      if(script === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");
    `
  );
  const lint = `
    const fs = require("node:fs");
    const report = JSON.stringify([{ filePath: "fixture.ts", errorCount: 0, warningCount: 0 }]);
    const index = process.argv.indexOf("--output-file");
    if(index >= 0) fs.writeFileSync(process.argv[index + 1], report);
    else console.log(report);
  `;
  executable("bin/npx", lint);
  mkdirSync(join(dir, "node_modules/eslint/bin"), { recursive: true });
  executable("node_modules/eslint/bin/eslint.js", lint);
  const preload = join(dir, "scripts/ad-hoc/output-transport.mjs");
  writeFileSync(
    preload,
    `
      const originalWrite = process.stdout.write.bind(process.stdout);
      process.stdout.write = (chunk, encoding, callback) => {
        let report;
        try { report = JSON.parse(String(chunk)); } catch {
          return originalWrite(chunk, encoding, callback);
        }
        if(report?.candidateSha !== "${sha}" || !Array.isArray(report.commandReceipts)) {
          return originalWrite(chunk, encoding, callback);
        }
        ${transport}
      };
    `
  );
  const child = spawn(
    process.execPath,
    [
      "--import",
      preload,
      join(dir, "scripts/quality/validate-release-green.mjs"),
      "--quick",
      "--json",
    ],
    {
      cwd: dir,
      env: { ...process.env, PATH: join(dir, "bin"), GITHUB_OUTPUT: "" },
      stdio: ["ignore", "pipe", "pipe"],
      signal: t.signal,
      killSignal: "SIGKILL",
    }
  );
  const closed = once(child, "close");
  closed.catch(() => {});
  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });
  t.after(async () => {
    child.stdout.resume();
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
    await closed.catch(() => {});
    rmSync(dir, { recursive: true, force: true });
  });
  return { child, closed, stderr: () => stderr };
}

for (const exitCode of [0, 1]) {
  test(
    `the observer delivers large JSON to a slow pipe before exit ${exitCode}`,
    cliOptions,
    async (t) => {
      const payloadSize = 1024 * 1024;
      const { child, closed, stderr } = observerFixture(t, {
        exitCode,
        transport: `
          report.fixturePayload = "x".repeat(${payloadSize});
          return originalWrite(JSON.stringify(report) + "\\n", encoding, callback);
        `,
      });
      await once(child.stdout, "readable");
      // The consumer deliberately leaves more than a pipe buffer queued. There is no
      // wall-clock PASS threshold: the assertion is on complete bytes and the real exit.
      await delay(25);
      let output = "";
      for await (const chunk of child.stdout) output += chunk.toString();
      const [actualExitCode, signal] = await closed;
      assert.equal(actualExitCode, exitCode, stderr());
      assert.equal(signal, null);
      const report = JSON.parse(output);
      assert.equal(report.candidateSha, sha);
      assert.equal(report.releaseGreen, exitCode === 0);
      assert.equal(report.fixturePayload, "x".repeat(payloadSize));
    }
  );
}

test("a final JSON write error cannot certify observer evidence", cliOptions, async (t) => {
  const { child, closed, stderr } = observerFixture(t, {
    transport: `
      const done = typeof encoding === "function" ? encoding : callback;
      const error = Object.assign(new Error("fixture output failure"), { code: "EPIPE" });
      process.nextTick(() => {
        if(done) done(error);
        process.stdout.emit("error", error);
      });
      return false;
    `,
  });
  child.stdout.resume();
  const [exitCode, signal] = await closed;
  assert.equal(exitCode, 1, stderr());
  assert.equal(signal, null);
  assert.match(stderr(), /Observer JSON output failed; evidence is incomplete/);
});

test("a blocked final JSON write remains interruptible by SIGTERM", cliOptions, async (t) => {
  const { child, closed, stderr } = observerFixture(t, {
    transport: `
      setInterval(() => {}, 1000);
      process.stderr.write("OBSERVER_OUTPUT_BLOCKED\\n");
      return false;
    `,
  });
  const blocked = new Promise((resolve, reject) => {
    child.stderr.on("data", () => {
      if (stderr().includes("OBSERVER_OUTPUT_BLOCKED")) resolve();
    });
    child.once("close", () => reject(new Error("observer exited before cancellation")));
    child.once("error", reject);
  });
  child.stdout.resume();
  await blocked;
  const signalled = child.kill("SIGTERM");
  const [exitCode, signal] = await closed;
  assert.equal(signalled, true, "observer must remain alive until final delivery or cancellation");
  assert.equal(exitCode, 1, stderr());
  assert.equal(signal, null);
});
