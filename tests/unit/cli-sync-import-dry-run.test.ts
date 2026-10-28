// `omniroute sync import --dry-run` used to POST the backup to /api/db-backups/import with
// `?dryRun=true` — a flag the route never read — so the "dry run" replaced the live database.
// Even with the route now honouring dryRun, an OLDER server still ignores it, so the CLI must
// never send the replacing request in dry-run mode: it validates the file locally and prints
// a summary instead.
//
// These tests drive the REAL commander wiring of `registerSync()` with `fetch` stubbed.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import { Command } from "commander";

import { registerSync } from "../../bin/cli/commands/sync.mjs";

const CLI_TOKEN = "test-cli-token-sync-import";

type Captured = { url: string; method: string; body: unknown; headers: Headers };

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function runImport(args: string[], respond: () => Response = () => jsonResponse(200, {})) {
  const calls: Captured[] = [];
  const exitCodes: number[] = [];
  const stderr: string[] = [];
  const stdout: string[] = [];

  const origFetch = globalThis.fetch;
  const origExit = process.exit;
  const origErr = process.stderr.write.bind(process.stderr);
  const origOut = process.stdout.write.bind(process.stdout);
  const origEnv = {
    base: process.env.OMNIROUTE_BASE_URL,
    token: process.env.OMNIROUTE_CLI_TOKEN,
    key: process.env.OMNIROUTE_API_KEY,
  };

  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20999";
  process.env.OMNIROUTE_CLI_TOKEN = CLI_TOKEN;
  delete process.env.OMNIROUTE_API_KEY;

  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      method: String(init.method ?? "GET").toUpperCase(),
      body: init.body,
      headers: new Headers(init.headers),
    });
    return respond();
  }) as typeof fetch;
  process.exit = ((code?: number) => {
    exitCodes.push(code ?? 0);
    throw new Error(`__exit_${code ?? 0}__`);
  }) as typeof process.exit;
  process.stderr.write = ((chunk: string | Uint8Array) => {
    stderr.push(String(chunk));
    return true;
  }) as typeof process.stderr.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    stdout.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;

  let thrown: unknown = null;
  try {
    const program = new Command().exitOverride().option("--output <format>");
    registerSync(program);
    await program.parseAsync(["node", "omniroute", "--output", "json", "sync", "import", ...args]);
  } catch (err) {
    thrown = err;
  } finally {
    globalThis.fetch = origFetch;
    process.exit = origExit;
    process.stderr.write = origErr;
    process.stdout.write = origOut;
    for (const [envKey, value] of [
      ["OMNIROUTE_BASE_URL", origEnv.base],
      ["OMNIROUTE_CLI_TOKEN", origEnv.token],
      ["OMNIROUTE_API_KEY", origEnv.key],
    ] as const) {
      if (value === undefined) delete process.env[envKey];
      else process.env[envKey] = value;
    }
  }

  const err = thrown as Error | null;
  if (err && !/^__exit_\d+__$/.test(err.message)) throw err;
  return { calls, exitCodes, stderr: stderr.join(""), stdout: stdout.join("") };
}

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-import-"));
test.after(() => fs.rmSync(dir, { recursive: true, force: true }));

/** A minimal OmniRoute-shaped SQLite backup with the tables the import route requires. */
function makeBackup(name: string, { apiKeys = 2, withRequiredTables = true } = {}) {
  const file = path.join(dir, name);
  const db = new Database(file);
  try {
    db.exec("CREATE TABLE provider_connections (id TEXT PRIMARY KEY)");
    db.exec("CREATE TABLE provider_nodes (id TEXT PRIMARY KEY)");
    db.exec("CREATE TABLE combos (id TEXT PRIMARY KEY)");
    if (withRequiredTables) db.exec("CREATE TABLE api_keys (id TEXT PRIMARY KEY, name TEXT)");
    db.exec("CREATE TABLE _omniroute_migrations (version TEXT, name TEXT)");
    db.prepare("INSERT INTO _omniroute_migrations VALUES (?, ?)").run("206", "latest");
    db.prepare("INSERT INTO provider_connections VALUES (?)").run("conn-1");
    if (withRequiredTables) {
      for (let i = 0; i < apiKeys; i++) {
        db.prepare("INSERT INTO api_keys VALUES (?, ?)").run(`key-${i}`, `k${i}`);
      }
    }
  } finally {
    db.close();
  }
  return file;
}

test("sync import --dry-run never sends a request to the server", async () => {
  const file = makeBackup("valid-dry.sqlite");
  const { calls, exitCodes, stdout } = await runImport([file, "--dry-run"]);

  assert.deepEqual(
    calls.map((c) => `${c.method} ${c.url}`),
    [],
    "no network call in dry-run mode"
  );
  assert.deepEqual(exitCodes, [], "a valid backup is a successful dry run");
  const summary = JSON.parse(stdout);
  assert.equal(summary.dryRun, true);
  assert.equal(summary.valid, true);
  assert.equal(summary.apiKeyCount, 2);
  assert.equal(summary.connectionCount, 1);
  assert.equal(summary.schemaVersion, "206");
});

test("sync import --dry-run reports a backup missing required tables (exit 2, no request)", async () => {
  const file = makeBackup("missing-tables.sqlite", { withRequiredTables: false });
  const { calls, exitCodes, stderr } = await runImport([file, "--dry-run"]);

  assert.equal(calls.length, 0);
  assert.deepEqual(exitCodes, [2]);
  assert.match(stderr, /api_keys/);
  assert.doesNotMatch(stderr, /\n\s+at /, "no stack trace");
});

test("sync import rejects a JSON bundle locally (it is not a SQLite backup)", async () => {
  const file = path.join(dir, "bundle.json");
  fs.writeFileSync(file, JSON.stringify({ settings: {}, combos: [] }).padEnd(8192, " "));

  for (const extra of [[], ["--dry-run"]]) {
    const { calls, exitCodes, stderr } = await runImport([file, ...extra]);
    assert.equal(calls.length, 0, "an obviously wrong file must not be uploaded");
    assert.deepEqual(exitCodes, [2]);
    assert.match(stderr, /not a SQLite database/i);
    assert.match(stderr, /sync bundle/);
  }
});

test("sync import reports an unreadable path without a stack trace", async () => {
  const { calls, exitCodes, stderr } = await runImport([path.join(dir, "nope.sqlite")]);
  assert.equal(calls.length, 0);
  assert.deepEqual(exitCodes, [1]);
  assert.match(stderr, /cannot read/i);
  assert.doesNotMatch(stderr, /\n\s+at /);
});

test("sync import (no --dry-run) uploads the file with the loopback CLI credential", async () => {
  const file = makeBackup("valid-real.sqlite");
  const { calls, exitCodes, stdout } = await runImport([file], () =>
    jsonResponse(200, { imported: true, filename: "valid-real.sqlite", apiKeyCount: 2 })
  );

  assert.deepEqual(exitCodes, []);
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.method, "POST");
  const url = new URL(call.url);
  assert.equal(url.pathname, "/api/db-backups/import");
  assert.equal(url.searchParams.get("dryRun"), null, "a real import does not carry dryRun");
  assert.equal(url.searchParams.get("filename"), "valid-real.sqlite");
  assert.equal(call.headers.get("content-type"), "application/octet-stream");
  assert.equal(call.headers.get("x-omniroute-cli-token"), CLI_TOKEN);
  assert.deepEqual(Buffer.from(call.body as Uint8Array), fs.readFileSync(file));
  assert.equal(JSON.parse(stdout).imported, true);
});

test("sync import turns a 403 into a clear credential error (exit 4, no stack)", async () => {
  const file = makeBackup("valid-403.sqlite");
  const { exitCodes, stderr } = await runImport([file], () =>
    jsonResponse(403, { error: { message: "API key lacks 'manage' scope." } })
  );

  assert.deepEqual(exitCodes, [4]);
  assert.match(stderr, /HTTP 403/);
  assert.match(stderr, /manage/);
  assert.match(stderr, /local CLI/);
  assert.doesNotMatch(stderr, /\n\s+at /);
});

test("sync import surfaces the route's 400 validation message", async () => {
  const file = makeBackup("valid-400.sqlite");
  const { exitCodes, stderr } = await runImport([file], () =>
    jsonResponse(400, { error: "Invalid OmniRoute database. Missing tables: combos" })
  );

  assert.deepEqual(exitCodes, [2]);
  assert.match(stderr, /HTTP 400/);
  assert.match(stderr, /Missing tables: combos/);
});
