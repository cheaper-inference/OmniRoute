import { readFileSync } from "node:fs";
import { emit } from "../output.mjs";

// Local side of `omniroute sync import` (the upload lives in sync.mjs): reading and
// sanity-checking the backup, and the dry run, which must never reach the server.

const SQLITE_MAGIC = Buffer.from("SQLite format 3\0", "latin1");
const MIN_SQLITE_BYTES = 4096;
// Kept in sync with REQUIRED_TABLES in src/app/api/db-backups/import/route.ts.
const IMPORT_REQUIRED_TABLES = ["provider_connections", "provider_nodes", "combos", "api_keys"];

function importFail(message, exitCode = 2) {
  process.stderr.write(`Error: sync import: ${message}\n`);
  return exitCode;
}

/** Cheap local check run before any upload: is this file a SQLite database at all? */
function checkSqliteShape(buf) {
  if (
    buf.length < SQLITE_MAGIC.length ||
    !buf.subarray(0, SQLITE_MAGIC.length).equals(SQLITE_MAGIC)
  ) {
    return (
      "the file is not a SQLite database. `sync import` restores a .sqlite backup " +
      "(e.g. from `omniroute backup` or the dashboard); the JSON written by `sync bundle` " +
      "cannot be imported here."
    );
  }
  if (buf.length < MIN_SQLITE_BYTES) return "the file is too small to be a valid SQLite database.";
  return null;
}

/**
 * Open the backup read-only and run the checks the server would (integrity + required
 * tables), returning what an import would load. `skipped` when no local SQLite driver is
 * available — the dry run then rests on the header check alone.
 */
async function inspectBackupLocally(filePath) {
  let withReadonlySqlite;
  try {
    ({ withReadonlySqlite } = await import("../sqlite.mjs"));
  } catch (err) {
    return { skipped: err?.message || "SQLite driver unavailable" };
  }
  try {
    return await withReadonlySqlite(filePath, (db) => {
      const integrity = db.pragma("integrity_check", { simple: true });
      if (integrity !== "ok") {
        return { error: "database integrity check failed; the file may be corrupted." };
      }
      const tables = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table'")
        .all()
        .map((r) => r.name);
      const missing = IMPORT_REQUIRED_TABLES.filter((t) => !tables.includes(t));
      if (missing.length > 0) {
        return { error: `not an OmniRoute database; missing tables: ${missing.join(", ")}` };
      }
      const count = (table) => db.prepare(`SELECT COUNT(*) AS cnt FROM ${table}`).get()?.cnt ?? 0;
      const schemaVersion = tables.includes("_omniroute_migrations")
        ? (db
            .prepare(
              "SELECT version FROM _omniroute_migrations ORDER BY CAST(version AS INTEGER) DESC, version DESC LIMIT 1"
            )
            .get()?.version ?? null)
        : null;
      return {
        connectionCount: count("provider_connections"),
        nodeCount: count("provider_nodes"),
        comboCount: count("combos"),
        apiKeyCount: count("api_keys"),
        schemaVersion,
      };
    });
  } catch (err) {
    return { error: `cannot open the file as SQLite: ${err?.message || "unknown error"}` };
  }
}

/**
 * Validate the backup locally and print what an import would load. NEVER contacts the
 * server: an older server ignores `dryRun` and would replace the live database.
 */
export async function runImportDryRun(filePath, buf, globalOpts) {
  const report = await inspectBackupLocally(filePath);
  if (report.error) return importFail(report.error);
  const summary = {
    dryRun: true,
    valid: true,
    file: filePath,
    sizeBytes: buf.length,
    ...(report.skipped
      ? { deepChecks: `skipped (${report.skipped}); only the SQLite header was verified` }
      : report),
    note: "No request was sent to the server; the live database was not modified.",
  };
  emit(summary, globalOpts);
  return 0;
}

/**
 * Read the backup and run the cheap header check every import starts with. Returns
 * `{ buf }`, or `{ exitCode }` after printing why the file cannot be imported.
 */
export function readImportFile(filePath) {
  let buf;
  try {
    buf = readFileSync(filePath);
  } catch (err) {
    return { exitCode: importFail(`cannot read ${filePath}: ${err?.code || err?.message}`, 1) };
  }
  const shapeError = checkSqliteShape(buf);
  if (shapeError) return { exitCode: importFail(shapeError) };
  return { buf };
}
