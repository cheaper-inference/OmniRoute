import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import Database from "better-sqlite3";

import type { SqliteAdapter } from "../../../src/lib/db/adapters/types";

// Shared set-up for the exclusive-lock arms: a database on disk, a holder that
// really holds, and a child process that reads under a timeout. Kept out of the
// test modules so each of them stays under the repository's file-size cap.

export type ChildResult = { code: number | null; stdout: string; stderr: string };

// Generous: a healthy child exits in 0.2 s, so this only fires on a wedge.
export const CHILD_TIMEOUT_MS = 30_000;

// tests/unit/db -> package root.
export const PROJECT_ROOT = path.resolve(import.meta.dirname, "../../..");

export function runChild(script: string, env: Record<string, string>): Promise<ChildResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["--import", "tsx/esm", "--input-type=module", "-e", script],
      {
        // Resolved from this file, not from cwd: a workspace runner that
        // changes directory would otherwise break the child's module graph.
        cwd: PROJECT_ROOT,
        env: { ...process.env, ...env },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
    child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({
        code: null,
        stdout,
        stderr: `${stderr}\n[runChild] killed after ${CHILD_TIMEOUT_MS} ms without exit`,
      });
    }, CHILD_TIMEOUT_MS);

    child.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.once("exit", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

export function tempDir(name: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), `lockrel-${name}-`));
}

// Cleanup must not mask the failure an arm is reporting: a retained cursor
// keeps the handle busy, so close() throws and would replace the real
// AssertionError with a TypeError from a finally block.
export function closeQuietly(adapter: SqliteAdapter): void {
  try {
    if (adapter.open) adapter.close();
  } catch {
    // Intentionally ignored; see comment above.
  }
}

export function makeDb(dir: string, file = "db.sqlite"): string {
  return path.join(dir, file);
}

// A holder that sets the exclusive mode and then writes. The write is the part
// this fixture depends on: with better-sqlite3 13.0.3 on a WAL database the next
// reader gets SQLITE_BUSY until its own busy timeout runs out. Earlier notes
// here described read shapes instead and quoted a figure for them; that figure
// did not reproduce consistently, so those descriptions were withdrawn.
export function openExclusiveHolder(file: string): Database.Database {
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("locking_mode = EXCLUSIVE");
  db.exec("CREATE TABLE IF NOT EXISTS t(v INTEGER)");
  db.exec("INSERT INTO t VALUES (1)");
  db.prepare("SELECT v FROM t").all();
  return db;
}

export async function readInChild(file: string): Promise<ChildResult> {
  return runChild(
    `
    const Database = (await import("better-sqlite3")).default;
    const db = new Database(process.env.DB_FILE, { timeout: 2000 });
    const row = db.prepare("SELECT v FROM t ORDER BY v DESC LIMIT 1").get();
    db.close();
    console.log(JSON.stringify(row));
    `,
    { DB_FILE: file }
  );
}
