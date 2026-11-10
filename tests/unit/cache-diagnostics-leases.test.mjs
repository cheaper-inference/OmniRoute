import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fork, spawnSync } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import { createCacheDiagnosticsSink } from "../../bin/cli/runtime/cacheDiagnosticsSink.mjs";

test("real preload relinquishes leases before the application shutdown owner exits", () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "diagnostic-shutdown-"));
  const root = fileURLToPath(new URL("../../", import.meta.url));
  try {
    for (let i = 0; i < 6; i++) {
      const child = spawnSync(
        process.execPath,
        [
          "--import",
          "tsx/esm",
          "--import",
          "./bin/cli/runtime/cacheDiagnosticsPreload.mjs",
          "tests/fixtures/token-breakdown/shutdown-child.mjs",
        ],
        {
          cwd: root,
          env: {
            ...process.env,
            DATA_DIR: data,
            OMNIROUTE_CACHE_DIAGNOSTICS: "1",
            DISABLE_SQLITE_AUTO_BACKUP: "true",
          },
          encoding: "utf8",
          timeout: 15000,
        }
      );
      assert.equal(child.status, 0, child.stderr);
      const files = fs.readdirSync(path.join(data, "cache-diagnostics"));
      assert.equal(files.filter((f) => f.endsWith(".active")).length, 0);
      assert.equal(files.filter((f) => f.endsWith(".closed")).length, Math.min(i + 1, 4));
    }
  } finally {
    fs.rmSync(data, { recursive: true, force: true });
  }
});

test("independent processes sharing a data directory retain accessible active files", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "diagnostic-processes-"));
  const children = [],
    files = [];
  try {
    for (let i = 0; i < 5; i++) {
      const child = fork(
        fileURLToPath(new URL("../fixtures/token-breakdown/sink-child.mjs", import.meta.url)),
        [data],
        { execArgv: [], env: {}, stdio: ["ignore", "ignore", "inherit", "ipc"] }
      );
      children.push(child);
      const [{ file }] = await once(child, "message");
      files.push(file);
    }
    assert.ok(files.every((file) => fs.existsSync(file)));
    for (const child of children) {
      const exit = once(child, "exit");
      child.send("close");
      assert.equal((await exit)[0], 0);
    }
    const retained = files.filter((file) => fs.existsSync(file));
    assert.equal(retained.length, 4);
    for (const file of retained) assert.match(fs.readFileSync(file, "utf8"), /synthetic_close/);
  } finally {
    for (const child of children)
      if (child.exitCode === null) {
        const exit = once(child, "exit");
        child.kill();
        await exit;
      }
    fs.rmSync(data, { recursive: true, force: true });
  }
});

test("rotation retains every active run, including several runs in the same process", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "diagnostic-leases-"));
  const sinks = [];
  try {
    for (let i = 0; i < 7; i++) sinks.push(createCacheDiagnosticsSink(data));
    for (const sink of sinks) {
      assert.ok(fs.existsSync(sink.file));
      assert.equal(sink.write({ event: "synthetic", value: 1 }), true);
    }
    await Promise.all(sinks.map((sink) => sink.close()));
    assert.equal(
      fs.readdirSync(path.join(data, "cache-diagnostics")).filter((p) => p.endsWith(".jsonl"))
        .length,
      4
    );
  } finally {
    await Promise.all(sinks.map((sink) => sink.close()));
    fs.rmSync(data, { recursive: true, force: true });
  }
});
test("unknown ownership, stale active leases and reused PIDs are never inferred closed", async () => {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "diagnostic-unknown-"));
  const dir = path.join(data, "cache-diagnostics");
  fs.mkdirSync(dir);
  const unknown = path.join(dir, `cache-${process.pid}-00000000-0000-4000-8000-000000000001.jsonl`);
  const stale = path.join(dir, `cache-${process.pid}-00000000-0000-4000-8000-000000000002.jsonl`);
  fs.writeFileSync(unknown, "unknown\n");
  fs.writeFileSync(stale, "stale\n");
  fs.writeFileSync(
    stale + ".active",
    JSON.stringify({ version: 1, run: "unverified", pid: process.pid })
  );
  try {
    for (let i = 0; i < 7; i++) {
      const sink = createCacheDiagnosticsSink(data);
      sink.write({ event: "synthetic" });
      await sink.close();
    }
    assert.equal(fs.readFileSync(unknown, "utf8"), "unknown\n");
    assert.equal(fs.readFileSync(stale, "utf8"), "stale\n");
    assert.ok(fs.existsSync(stale + ".active"));
  } finally {
    fs.rmSync(data, { recursive: true, force: true });
  }
});
