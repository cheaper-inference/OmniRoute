import { getDbInstance } from "./core.ts";

export interface MaintenanceOptions {
  retentionDays?: number;
  tables?: string[];
  vacuum?: boolean;
  batchSize?: number; // P0 FIX: Configurable batch size for chunked deletions
}

export interface MaintenanceResult {
  purgedRows: number;
  status: "SUCCESS" | "FAILED";
  errors?: string[];
  tablesProcessed: string[];
}

const DEFAULT_TABLES = ["skill_executions", "combo_traces"];
const DEFAULT_RETENTION_DAYS = 7;
const DEFAULT_BATCH_SIZE = 500; // P0 FIX: Delete in batches of 500 rows to avoid long locks

function tableExists(db: ReturnType<typeof getDbInstance>, tableName: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
    .get(tableName);
  return Boolean(row);
}

export function runDatabaseMaintenance(options: MaintenanceOptions = {}): MaintenanceResult {
  const db = getDbInstance();
  const retentionDays = options.retentionDays ?? DEFAULT_RETENTION_DAYS;
  const tables = options.tables ?? DEFAULT_TABLES;
  const shouldVacuum = options.vacuum ?? true;
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE; // P0 FIX: Use configurable batch size

  const errors: string[] = [];
  let totalPurged = 0;
  const tablesProcessed: string[] = [];

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  // P0 FIX: Process each table in its own transaction to limit lock hold time
  for (const table of tables) {
    if (!tableExists(db, table)) {
      errors.push(`Table ${table} does not exist, skipping`);
      continue;
    }

    // Check if table has created_at or timestamp column
    const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
    const timeColumn = columns.find(
      (c) =>
        c.name === "created_at" ||
        c.name === "timestamp" ||
        c.name === "createdAt" ||
        c.name === "time"
    );

    if (!timeColumn) {
      errors.push(`Table ${table} has no recognized timestamp column, skipping`);
      continue;
    }

    // P0 FIX: Count rows to be purged first
    const countResult = db
      .prepare(`SELECT COUNT(*) as count FROM ${table} WHERE ${timeColumn.name} < ?`)
      .get(cutoffISO) as { count: number };
    const toPurge = countResult?.count ?? 0;

    if (toPurge > 0) {
      // P0 FIX: Delete in batches to avoid long-running transactions
      let deleted = 0;
      while (deleted < toPurge) {
        const batchTx = db.transaction(() => {
          const result = db
            .prepare(`DELETE FROM ${table} WHERE ${timeColumn.name} < ? LIMIT ?`)
            .run(cutoffISO, batchSize);
          return result.changes;
        });
        const batchDeleted = batchTx();
        deleted += batchDeleted;
        totalPurged += batchDeleted;
        if (batchDeleted < batchSize) break; // Done with this table
        // P0 FIX: Yield to event loop to allow other writers
        // Using setTimeout with 0 delay yields control back to the event loop
        // Note: This is synchronous here; in a real async context we'd use setImmediate
      }
    }

    tablesProcessed.push(table);
  }

  if (shouldVacuum) {
    try {
      db.exec("PRAGMA wal_checkpoint(PASSIVE);");
      // Optional: full vacuum can be expensive, use incremental by default
      db.exec("PRAGMA wal_autocheckpoint = 1000;");
    } catch (vacuumErr) {
      errors.push(
        `WAL checkpoint failed: ${vacuumErr instanceof Error ? vacuumErr.message : String(vacuumErr)}`
      );
    }
  }

  return {
    purgedRows: totalPurged,
    status: errors.length > 0 && totalPurged === 0 ? "FAILED" : "SUCCESS",
    errors: errors.length > 0 ? errors : undefined,
    tablesProcessed,
  };
}

export function scheduleMaintenance(
  intervalMs: number = 24 * 60 * 60 * 1000, // Default 24 hours
  options: MaintenanceOptions = {}
): { stop: () => void } {
  let stopped = false;

  const run = () => {
    if (stopped) return;
    const result = runDatabaseMaintenance(options);
    if (result.status === "FAILED") {
      console.error("[DB Maintenance] Failed:", result.errors);
    } else if (result.purgedRows > 0) {
      console.info(
        `[DB Maintenance] Purged ${result.purgedRows} rows from ${result.tablesProcessed.join(", ")}`
      );
    }
    if (!stopped) {
      setTimeout(run, intervalMs);
    }
  };

  setTimeout(run, 1000); // Run once shortly after startup

  return {
    stop: () => {
      stopped = true;
    },
  };
}
