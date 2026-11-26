#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { gzipSync, gunzipSync } from "node:zlib";

const DATABASE_URL = process.env.DATABASE_URL?.trim();
const ENABLED = process.env.OMNIROUTE_NEON_PERSISTENCE !== "0" && Boolean(DATABASE_URL);
const DATA_DIR = process.env.DATA_DIR?.trim() || path.join(os.homedir(), ".omniroute");
const SQLITE_FILE = path.join(DATA_DIR, "storage.sqlite");
const INTERVAL_MS = Math.max(60_000, Number(process.env.OMNIROUTE_NEON_SNAPSHOT_INTERVAL_MS || 300_000));
const RETENTION = Math.max(1, Math.min(100, Number(process.env.OMNIROUTE_NEON_SNAPSHOT_RETENTION || 12)));
const TABLE = "omniroute_sqlite_snapshots";

function command(name, args, options = {}) {
  const result = spawnSync(name, args, {
    encoding: "utf8",
    stdio: [options.input ? "pipe" : "ignore", "pipe", "pipe"],
    input: options.input,
    maxBuffer: 1024 * 1024 * 1024,
    ...options,
  });
  if (result.status !== 0) {
    const stderr = String(result.stderr || "").trim();
    throw new Error(`${name} failed (${result.status}): ${stderr || "unknown error"}`);
  }
  return String(result.stdout || "");
}

function assertTooling() {
  command("psql", ["--version"]);
  command("sqlite3", ["--version"]);
}

function postgresEnv() {
  const url = new URL(DATABASE_URL);
  return {
    ...process.env,
    PGHOST: url.hostname,
    PGPORT: url.port || "5432",
    PGUSER: decodeURIComponent(url.username),
    PGPASSWORD: decodeURIComponent(url.password),
    PGDATABASE: decodeURIComponent(url.pathname.replace(/^\\//, "")),
    ...(url.searchParams.get("sslmode") ? { PGSSLMODE: url.searchParams.get("sslmode") } : {}),
    ...(url.searchParams.get("channel_binding")
      ? { PGCHANNELBINDING: url.searchParams.get("channel_binding") }
      : {}),
  };
}

function psql(args, input) {
  return command(
    "psql",
    ["-v", "ON_ERROR_STOP=1", "-X", ...args],
    input === undefined ? { env: postgresEnv() } : { input, env: postgresEnv() }
  );
}

function ensureTable() {
  psql(["-c", `CREATE TABLE IF NOT EXISTS ${TABLE} (id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), payload TEXT NOT NULL); CREATE INDEX IF NOT EXISTS ${TABLE}_created_at_idx ON ${TABLE}(created_at DESC);`]);
}

function latestPayload() {
  return psql(["-At", "-c", `SELECT payload FROM ${TABLE} ORDER BY created_at DESC, id DESC LIMIT 1;`]).trim();
}

function cleanupSnapshots() {
  psql(["-c", `DELETE FROM ${TABLE} WHERE id NOT IN (SELECT id FROM ${TABLE} ORDER BY created_at DESC, id DESC LIMIT ${RETENTION});`]);
}

function createSqliteBackup() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SQLITE_FILE)) throw new Error(`SQLite database does not exist: ${SQLITE_FILE}`);
  const temp = path.join(DATA_DIR, `.neon-snapshot-${process.pid}-${Date.now()}.sqlite`);
  try {
    command("sqlite3", [SQLITE_FILE, `.backup '${temp.replaceAll("'", "''")}'`]);
    return temp;
  } catch (error) {
    try { fs.rmSync(temp, { force: true }); } catch {}
    throw error;
  }
}

function snapshot() {
  if (!ENABLED) return false;
  let temp;
  try {
    assertTooling();
    ensureTable();
    temp = createSqliteBackup();
    const dump = command("sqlite3", [temp, ".dump"]);
    const payload = gzipSync(Buffer.from(dump, "utf8"), { level: 9 }).toString("base64");
    psql(["-c", `\\copy ${TABLE}(payload) FROM STDIN`], `${payload}\n`);
    cleanupSnapshots();
    console.log(`[NEON] snapshot saved (${Math.round(Buffer.byteLength(payload, "utf8") / 1024)} KiB compressed payload)`);
    return true;
  } catch (error) {
    console.warn(`[NEON] snapshot failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  } finally {
    if (temp) {
      try { fs.rmSync(temp, { force: true }); } catch {}
    }
  }
}

function restore() {
  if (!ENABLED || fs.existsSync(SQLITE_FILE)) return false;
  assertTooling();
  ensureTable();
  const payload = latestPayload();
  if (!payload) {
    console.log("[NEON] no Neon snapshot exists yet; SQLite will initialize normally");
    return false;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const dumpFile = path.join(DATA_DIR, `.neon-restore-${process.pid}-${Date.now()}.sql`);
  try {
    const dump = gunzipSync(Buffer.from(payload, "base64"));
    fs.writeFileSync(dumpFile, dump, { mode: 0o600 });
    const tempDb = `${SQLITE_FILE}.neon-restore-${process.pid}`;
    try {
      command("sqlite3", [tempDb], { input: fs.readFileSync(dumpFile) });
      fs.renameSync(tempDb, SQLITE_FILE);
    } finally {
      try { fs.rmSync(tempDb, { force: true }); } catch {}
    }
    console.log("[NEON] restored the latest SQLite snapshot from Neon");
    return true;
  } finally {
    try { fs.rmSync(dumpFile, { force: true }); } catch {}
  }
}

export function runCli() {
  const commandName = process.argv[2] || "snapshot";
  if (!ENABLED) {
    console.error("DATABASE_URL is not configured; Neon persistence is disabled.");
    process.exitCode = 2;
    return;
  }
  if (commandName === "restore") restore();
  else if (commandName === "snapshot") snapshot();
  else if (commandName === "ensure") { assertTooling(); ensureTable(); }
  else throw new Error(`Unknown command: ${commandName}`);
}

if (import.meta.url === `file://${process.argv[1]}`) runCli();
