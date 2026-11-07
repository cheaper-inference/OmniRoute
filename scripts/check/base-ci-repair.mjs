#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const work = path.join(root, ".ci-work/base-ci-repair");
const boundary = path.join(root, "open-sse/utils/connectGuardDispatcher.ts");
const fixture = "tests/unit/executor-dispatch-connect-guard-13330.test.ts";
const base = "7f3cbb046b3706bf0bbc047b7eaa0cbada8d9e50";
const env = {
  ...process.env,
  HOME: path.join(work, "home"),
  DATA_DIR: path.join(work, "data"),
  TMPDIR: path.join(work, "temp"),
  npm_config_cache: path.join(work, "npm-cache"),
};

async function run(label, command, args, wallMs, idleMs, expectedFailure = false) {
  const started = Date.now();
  console.log(`[${new Date().toISOString()}] [INFO] [base-ci-repair] start=${label}`);
  const child = spawn(command, args, {
    cwd: root,
    env,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  let failure;
  let idleTimer;
  let escalation;
  const signal = (value) => {
    if (!child.pid) return;
    try {
      process.kill(-child.pid, value);
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  };
  const stop = (reason) => {
    if (failure) return;
    failure = new Error(`${label}: ${reason}`);
    signal("SIGTERM");
    escalation = setTimeout(() => signal("SIGKILL"), 2_000);
  };
  const resetIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => stop("idle timeout"), idleMs);
  };
  const wallTimer = setTimeout(() => stop("wall timeout"), wallMs);
  const interrupt = () => stop("interrupted");
  process.on("SIGTERM", interrupt);
  process.on("SIGINT", interrupt);
  resetIdle();
  for (const stream of [child.stdout, child.stderr]) {
    stream.on("data", (bytes) => {
      resetIdle();
      output += bytes.toString("utf8");
      process.stdout.write(bytes);
    });
  }
  try {
    const code = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    if (failure) throw failure;
    assert.equal(code === 0, !expectedFailure, `${label}: unexpected exit=${code}`);
    console.log(
      `[${new Date().toISOString()}] [INFO] [base-ci-repair] complete=${label} ms=${Date.now() - started}`
    );
    return output;
  } finally {
    clearTimeout(wallTimer);
    clearTimeout(idleTimer);
    clearTimeout(escalation);
    process.off("SIGTERM", interrupt);
    process.off("SIGINT", interrupt);
    signal("SIGKILL");
    if (child.pid) {
      const deadline = Date.now() + 3_000;
      while (true) {
        try {
          process.kill(-child.pid, 0);
        } catch (error) {
          if (error.code === "ESRCH") break;
          throw error;
        }
        assert.ok(Date.now() < deadline, `Owned group ${child.pid} survived cleanup`);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  }
}

async function main() {
  assert.equal(process.platform, "linux");
  assert.equal(process.env.GITHUB_ACTIONS, "true", "Hosted execution only");
  await fs.mkdir(work, { recursive: true });
  for (const dir of [env.HOME, env.DATA_DIR, env.TMPDIR]) await fs.mkdir(dir, { recursive: true });
  await run("locked install", "npm", ["ci", "--no-audit", "--no-fund"], 480_000, 180_000);
  const current = await fs.readFile(boundary, "utf8");
  const old = await run(
    "read original boundary",
    "git",
    ["show", `${base}:open-sse/utils/connectGuardDispatcher.ts`],
    20_000,
    10_000
  );
  const args = [
    "--import",
    "tsx/esm",
    "--import",
    "./tests/_setup/isolateDataDir.ts",
    "--test",
    "--test-concurrency=1",
    "--test-timeout=20000",
    "--test-reporter=spec",
  ];
  try {
    await fs.writeFile(boundary, old, "utf8");
    const red = await run(
      "legacy native RED",
      process.execPath,
      [...args, "--test-name-pattern=native fetch after an ambient reset", fixture],
      30_000,
      15_000,
      true
    );
    assert.match(
      red,
      /invalid onRequestStart method/,
      "RED must identify the original protocol mismatch"
    );
  } finally {
    await fs.writeFile(boundary, current, "utf8");
  }
  await run(
    "guarded native and modern GREEN",
    process.execPath,
    [...args, fixture],
    40_000,
    20_000
  );
  await run(
    "generated artifacts",
    process.execPath,
    ["--import", "tsx/esm", "scripts/skills/generate-agent-skills.mjs"],
    30_000,
    15_000
  );
  await run(
    "translation evidence",
    process.execPath,
    ["scripts/i18n/check-translation-drift.mjs"],
    30_000,
    15_000
  );
}

try {
  await main();
} catch (error) {
  console.error(`[${new Date().toISOString()}] [ERROR] [base-ci-repair] ${error.message}`);
  process.exitCode = 1;
} finally {
  await fs.rm(work, { recursive: true, force: true });
}
