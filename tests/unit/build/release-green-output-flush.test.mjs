import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Writable } from "node:stream";
import { fileURLToPath } from "node:url";
import { setImmediate as immediate, setTimeout as delay } from "node:timers/promises";
import test from "node:test";
import { writeObserverJson } from "../../../scripts/quality/validate-release-green.mjs";
import { copyReleaseGreenModuleFixture } from "../../_helpers/copyReleaseGreenModuleFixture.mjs";
import { writeReleaseGreenEslintFixture } from "../../_helpers/writeReleaseGreenEslintFixture.mjs";

const observerUrl = new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url);

test("observer JSON delivery waits for the stream write callback", async () => {
  let finishWrite;
  let received;
  const output = new Writable({
    write(chunk, _encoding, callback) {
      received = chunk.toString();
      finishWrite = callback;
    },
  });
  let delivered = false;
  const writing = writeObserverJson({ schemaVersion: 1, releaseGreen: true }, output).then(() => {
    delivered = true;
  });
  await immediate();
  assert.equal(delivered, false);
  assert.deepEqual(JSON.parse(received), { schemaVersion: 1, releaseGreen: true });
  finishWrite();
  await writing;
  assert.equal(delivered, true);
  assert.equal(output.listenerCount("error"), 0);
});

test("observer JSON delivery rejects stream failure instead of certifying delivery", async () => {
  const failure = Object.assign(new Error("synthetic output failure"), { code: "EPIPE" });
  const output = new Writable({
    write(_chunk, _encoding, callback) {
      callback(failure);
    },
  });
  await assert.rejects(
    writeObserverJson({ releaseGreen: true }, output),
    (error) => error === failure
  );
  await immediate();
  assert.equal(output.listenerCount("error"), 0);
});

for (const exitCode of [0, 1]) {
  test(
    `large observer JSON drains to a slow pipe before exit ${exitCode}`,
    { timeout: 20000 },
    async (t) => {
      const directory = mkdtempSync(join(tmpdir(), "observer-output-"));
      t.after(() => rmSync(directory, { recursive: true, force: true }));
      const scriptDir = join(directory, "scripts", "ad-hoc");
      mkdirSync(scriptDir, { recursive: true });
      const script = join(scriptDir, "emit-observer-report.mjs");
      const payloadSize = 1024 * 1024;
      writeFileSync(
        script,
        [
          `import { writeObserverJson } from ${JSON.stringify(observerUrl.href)};`,
          `await writeObserverJson({ schemaVersion: 1, releaseGreen: ${exitCode === 0}, payload: "x".repeat(${payloadSize}) });`,
          `process.exit(${exitCode});`,
        ].join("\n")
      );
      const child = spawn(process.execPath, [script], { stdio: ["ignore", "pipe", "pipe"] });
      t.after(() => {
        if (child.exitCode === null) child.kill();
      });
      const closed = once(child, "close");
      child.stderr.resume();
      await once(child.stdout, "readable");
      await delay(25);
      assert.equal(
        child.exitCode,
        null,
        "the child must wait until its blocked output is consumed"
      );
      let output = "";
      for await (const chunk of child.stdout) output += chunk.toString();
      const [actualExitCode, signal] = await closed;
      assert.equal(actualExitCode, exitCode);
      assert.equal(signal, null);
      const report = JSON.parse(output);
      assert.equal(report.schemaVersion, 1);
      assert.equal(report.releaseGreen, exitCode === 0);
      assert.equal(report.payload.length, payloadSize);
      assert.equal(report.payload, "x".repeat(payloadSize));
    }
  );
}

test(
  "a blocked final JSON write remains interruptible by the observer supervisor",
  {
    skip: process.platform === "win32",
    timeout: 20000,
  },
  async (t) => {
    const root = fileURLToPath(new URL("../../../", import.meta.url));
    const artifacts = join(root, "_artifacts");
    mkdirSync(artifacts, { recursive: true });
    const directory = mkdtempSync(join(artifacts, "observer-output-cancel-"));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    copyReleaseGreenModuleFixture(root, directory);
    mkdirSync(join(directory, "bin"));
    mkdirSync(join(directory, "scripts/ad-hoc"));
    mkdirSync(join(directory, "config/quality"), { recursive: true });
    writeFileSync(join(directory, "package.json"), '{"type":"commonjs"}');
    writeFileSync(
      join(directory, "config/quality/quality-baseline.json"),
      JSON.stringify({
        metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 0 } },
      })
    );
    const executable = (name, body) =>
      writeFileSync(join(directory, "bin", name), `#!${process.execPath}\n${body}`, {
        mode: 0o755,
      });
    executable("git", `console.log("${"1".repeat(40)}");`);
    writeReleaseGreenEslintFixture(join(directory, "bin"));
    executable(
      "npm",
      [
        'if(process.argv[3] === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");',
        'if(process.argv[3] === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");',
      ].join("\n")
    );
    const preload = join(directory, "scripts/ad-hoc/block-final-output.mjs");
    writeFileSync(
      preload,
      [
        "process.stdout.write = () => {",
        "  setInterval(() => {}, 1000);",
        '  process.stderr.write("OBSERVER_OUTPUT_BLOCKED\\n");',
        "  return false;",
        "};",
      ].join("\n")
    );
    const child = spawn(
      process.execPath,
      [
        "--import",
        preload,
        join(directory, "scripts/quality/validate-release-green.mjs"),
        "--quick",
        "--json",
      ],
      {
        cwd: directory,
        env: { ...process.env, PATH: join(directory, "bin"), GITHUB_OUTPUT: "" },
        stdio: ["ignore", "pipe", "pipe"],
        signal: t.signal,
        killSignal: "SIGKILL",
      }
    );
    t.after(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
    });
    const closed = once(child, "close");
    closed.catch(() => {});
    const blocked = new Promise((resolve, reject) => {
      let pending = "";
      child.stderr.on("data", (chunk) => {
        pending += chunk.toString();
        if (pending.includes("OBSERVER_OUTPUT_BLOCKED")) resolve();
      });
      child.once("close", () =>
        reject(new Error("observer exited before reaching the final write"))
      );
      child.once("error", reject);
    });
    child.stdout.resume();
    await blocked;
    child.kill("SIGTERM");
    const [exitCode, signal] = await closed;
    assert.equal(exitCode, 1);
    assert.equal(signal, null);
  }
);
