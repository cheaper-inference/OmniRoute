import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { performance } from "node:perf_hooks";
import { randomUUID } from "node:crypto";
import test from "node:test";
import {
  acquireManagedCliFileLock,
  ensureManagedCliDirectories,
} from "../../src/lib/cliTools/managedCliStorage.ts";

async function fixture(t: { after: (fn: () => Promise<void>) => void }) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "managed-cli-lock-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return ensureManagedCliDirectories(root, "codex");
}

async function contend<T>(count: number, acquire: () => Promise<T>) {
  for (let round = 0; round < 3; round += 1) {
    const attempts = await Promise.allSettled(Array.from({ length: count }, acquire));
    const winners = attempts.filter((result) => result.status === "fulfilled");
    for (const result of attempts) {
      if (result.status === "rejected") assert.equal(result.reason.code, "update_in_progress");
    }
    if (winners.length > 0) return winners;
  }
  return [];
}

test("abandoned empty lock and recovery files cannot permanently block updates", async (t) => {
  const toolDir = await fixture(t);
  await fs.writeFile(path.join(toolDir, "update.lock"), "");
  await fs.writeFile(path.join(toolDir, "update.lock.recovery"), "");
  const release = await acquireManagedCliFileLock(toolDir);
  await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
  await release();
  await (
    await acquireManagedCliFileLock(toolDir)
  )();
});

test("torn legacy metadata recovers while a valid live owner remains protected", async (t) => {
  const toolDir = await fixture(t);
  const lock = path.join(toolDir, "update.lock");
  await fs.writeFile(lock, '{"pid":');
  await (
    await acquireManagedCliFileLock(toolDir)
  )();
  await fs.writeFile(lock, JSON.stringify({ pid: process.pid, owner: "active-legacy-owner" }));
  await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
  assert.equal(JSON.parse(await fs.readFile(lock, "utf8")).owner, "active-legacy-owner");
});

test("old current-PID claims are reclaimable after a server restart", async (t) => {
  const toolDir = await fixture(t);
  const directory = path.join(toolDir, "update-locks");
  await fs.mkdir(directory);
  const claim = path.join(directory, `${process.pid}-${randomUUID()}-1`);
  await fs.writeFile(claim, "");
  const previousProcessTime = new Date(performance.timeOrigin - 60_000);
  await fs.utimes(claim, previousProcessTime, previousProcessTime);
  const release = await acquireManagedCliFileLock(toolDir);
  try {
    await assert.rejects(fs.stat(claim), { code: "ENOENT" });
    await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
  } finally {
    await release();
  }
});

test("valid legacy locks from a previous current-PID incarnation do not block restart", async (t) => {
  const toolDir = await fixture(t);
  const previousProcessTime = new Date(performance.timeOrigin - 60_000);
  for (const name of ["update.lock", "update.lock.recovery"]) {
    const file = path.join(toolDir, name);
    await fs.writeFile(file, JSON.stringify({ pid: process.pid, owner: "previous-incarnation" }));
    await fs.utimes(file, previousProcessTime, previousProcessTime);
  }
  const release = await acquireManagedCliFileLock(toolDir);
  await release();
});

test("incarnation stamps distinguish rapid restarts without stealing a fresh own claim", async (t) => {
  const toolDir = await fixture(t);
  const directory = path.join(toolDir, "update-locks");
  await fs.mkdir(directory);
  const previousStart = Math.floor(performance.timeOrigin) - 1;
  const previousClaim = path.join(directory, `${process.pid}-${previousStart}-${randomUUID()}-1`);
  await fs.writeFile(previousClaim, "");
  const release = await acquireManagedCliFileLock(toolDir);
  try {
    await assert.rejects(fs.stat(previousClaim), { code: "ENOENT" });
    const [freshClaim] = await fs.readdir(directory);
    const earlierTime = new Date(performance.timeOrigin - 60_000);
    await fs.utimes(path.join(directory, freshClaim), earlierTime, earlierTime);
    await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
  } finally {
    await release();
  }
});

test("concurrent recovery attempts retain exactly one live owner", async (t) => {
  const toolDir = await fixture(t);
  await fs.writeFile(path.join(toolDir, "update.lock"), "");
  await fs.writeFile(path.join(toolDir, "update.lock.recovery"), "");
  const winners = await contend(16, () => acquireManagedCliFileLock(toolDir));
  try {
    assert.equal(winners.length, 1);
    await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
  } finally {
    await Promise.all(winners.map((winner) => winner.value()));
  }
  const release = await acquireManagedCliFileLock(toolDir);
  await release();
  await release();
});

const WORKER = String.raw`
import fs from "node:fs/promises";
const log = (severity, message) => process.stdout.write(JSON.stringify({
  timestamp: new Date().toISOString(), severity, message
}) + "\n");
process.stdin.resume();
if (process.argv[3] === "choosing") {
  const rename = fs.rename;
  fs.rename = async (from, to) => {
    if (String(from).endsWith("-choosing")) {
      log("INFO", "choosing");
      await new Promise(() => {});
    }
    return rename(from, to);
  };
}
try {
  const { acquireManagedCliFileLock } = await import(process.argv[1]);
  await acquireManagedCliFileLock(process.argv[2]);
  log("INFO", "ready");
} catch (error) {
  log("ERROR", "lock failed");
  process.exitCode = error.code === "update_in_progress" ? 75 : 1;
  process.stdin.pause();
}
`;

async function killWorker(worker: ChildProcess) {
  if (worker.exitCode !== null || worker.signalCode !== null) return;
  const exited = once(worker, "exit");
  worker.kill("SIGKILL");
  await exited;
}

test(
  "a reused Linux PID cannot keep an unrelated lock claim alive",
  {
    skip: process.platform !== "linux",
  },
  async (t) => {
    const toolDir = await fixture(t);
    const worker = spawn(process.execPath, ["-e", "process.stdin.resume()"], {
      stdio: ["pipe", "ignore", "ignore"],
    });
    t.after(() => killWorker(worker));
    await once(worker, "spawn");
    const directory = path.join(toolDir, "update-locks");
    await fs.mkdir(directory);
    const bootId = (await fs.readFile("/proc/sys/kernel/random/boot_id", "utf8")).trim();
    const claim = path.join(directory, `${worker.pid}-${Date.now()}-${randomUUID()}-1`);
    await fs.writeFile(claim, `${bootId}:0`);
    const release = await acquireManagedCliFileLock(toolDir);
    try {
      await assert.rejects(fs.stat(claim), { code: "ENOENT" });
      assert.equal(worker.exitCode, null);
    } finally {
      await release();
    }
  }
);

async function startWorker(
  toolDir: string,
  stage: "choosing" | "ready",
  t: { after: (fn: () => Promise<void>) => void }
) {
  const worker = spawn(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--input-type=module",
      "-e",
      WORKER,
      new URL("../../src/lib/cliTools/managedCliStorage.ts", import.meta.url).href,
      toolDir,
      stage,
    ],
    { stdio: ["pipe", "pipe", "pipe"] }
  );
  t.after(() => killWorker(worker));
  await new Promise<void>((resolve, reject) => {
    const fail = (error: Error) => {
      clearTimeout(timer);
      reject(error);
    };
    const timer = setTimeout(() => fail(new Error("Lock worker did not reach its stage")), 10_000);
    worker.once("error", fail);
    worker.once("exit", (code) =>
      fail(
        Object.assign(new Error("Lock worker exited before acquiring"), {
          code: code === 75 ? "update_in_progress" : undefined,
        })
      )
    );
    worker.stdout!.on("data", (chunk: Buffer) => {
      if (chunk.toString().includes(`"message":"${stage}"`)) {
        clearTimeout(timer);
        resolve();
      }
    });
  });
  return worker;
}

for (const stage of ["choosing", "ready"] as const) {
  test(`a live ${stage} worker is exclusive and its crash does not leave a permanent lock`, async (t) => {
    const toolDir = await fixture(t);
    const worker = await startWorker(toolDir, stage, t);
    await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
    await killWorker(worker);
    const winners = await contend(8, () => acquireManagedCliFileLock(toolDir));
    try {
      assert.equal(winners.length, 1, "only one worker may recover an abandoned claim");
      await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
    } finally {
      await Promise.all(winners.map((winner) => winner.value()));
    }
  });
}

test("independent processes cannot reclaim a crashed owner's lock simultaneously", async (t) => {
  const toolDir = await fixture(t);
  const previous = await startWorker(toolDir, "ready", t);
  await killWorker(previous);
  const winners = await contend(4, () => startWorker(toolDir, "ready", t));
  try {
    assert.equal(winners.length, 1);
    await assert.rejects(acquireManagedCliFileLock(toolDir), { code: "update_in_progress" });
  } finally {
    await Promise.all(winners.map((winner) => killWorker(winner.value)));
  }
  await (
    await acquireManagedCliFileLock(toolDir)
  )();
});
