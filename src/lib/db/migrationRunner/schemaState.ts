import type { SqliteAdapter } from "../adapters/types";
import {
  INITIAL_SCHEMA_SENTINELS,
  LEGACY_VERSION_SLOT_MIGRATIONS,
  PHYSICAL_SCHEMA_SENTINELS,
  RENAMED_MIGRATION_COMPATIBILITY,
} from "./constants";
import { migrationConsole as console } from "./logger";
import { isTimestampVersion } from "./ordering";

type MigrationFile = { version: string; name: string; path: string };

/**
 * Whether a RENAMED_MIGRATION_COMPATIBILITY entry may move its `fromVersion`/`fromName`
 * ledger row (the target file is checked separately by every caller).
 *
 * - Every entry: the old slot is now occupied by ANOTHER file (the original rule).
 * - Only when `toVersion` is a 14-digit timestamp: no file on disk is
 *   `(fromVersion, fromName)` any more. The legacy set is frozen at 239, so a pull request
 *   that ran as `240_x` and was merged as `<stamp>_x` leaves slot 240 empty for good; the
 *   original rule could never fire for it and the migration would run a second time.
 *
 * Entries with a three-digit destination keep exactly the original rule.
 */
export function isCompatibilitySourceEligible(
  files: ReadonlyArray<{ version: string; name: string }>,
  compatibility: { fromVersion: string; fromName: string; toVersion: string }
): boolean {
  const slotReoccupied = files.some(
    (file) => file.version === compatibility.fromVersion && file.name !== compatibility.fromName
  );
  if (slotReoccupied) return true;
  if (!isTimestampVersion(compatibility.toVersion)) return false;
  return !files.some(
    (file) => file.version === compatibility.fromVersion && file.name === compatibility.fromName
  );
}

export function hasTable(db: SqliteAdapter, tableName: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return Boolean(row?.name);
}

export function hasPhysicalTable(db: SqliteAdapter, tableName: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return Boolean(row?.name);
}

export function hasColumn(db: SqliteAdapter, tableName: string, columnName: string): boolean {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name?: string }>;
  return columns.some((column) => column.name === columnName);
}

// One `ALTER TABLE <t> ADD COLUMN <c> ...;` statement, anchored at the start of a line so
// commented-out statements (`-- ALTER ...`) never match.
const ADD_COLUMN_STATEMENT =
  /^[ \t]*ALTER[ \t]+TABLE[ \t]+["`]?(\w+)["`]?[ \t]+ADD[ \t]+COLUMN[ \t]+["`]?(\w+)["`]?[^;]*;[^\S\n]*\n?/gim;

/** Removes the `ADD COLUMN` statements whose column already exists; returns the rest of the file. */
export function stripExistingAddColumns(
  sql: string,
  columnExists: (table: string, column: string) => boolean
): { sql: string; skipped: string[] } {
  const skipped: string[] = [];
  const stripped = sql.replace(ADD_COLUMN_STATEMENT, (statement, table: string, column: string) => {
    if (!columnExists(table, column)) return statement;
    skipped.push(`${table}.${column}`);
    return "";
  });
  return { sql: stripped, skipped };
}

/**
 * Follow-up for a migration file that failed with "duplicate column name": runs the file again
 * without the `ADD COLUMN` statements that already landed, then records the ledger row.
 * Returns the skipped `table.column` names. When nothing can be skipped (or the file isn't
 * plain SQL), or the replay fails for any reason, only the ledger row is written.
 */
export function applyMigrationSkippingExistingColumns(
  db: SqliteAdapter,
  migration: { version: string; name: string },
  sql: string | null
): string[] {
  const record = () =>
    db
      .prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)")
      .run(migration.version, migration.name);
  const { sql: rest, skipped } =
    sql === null
      ? { sql: "", skipped: [] as string[] }
      : stripExistingAddColumns(sql, (table, column) => hasColumn(db, table, column));
  if (skipped.length === 0) {
    db.transaction(record)();
    return skipped;
  }
  try {
    db.transaction(() => {
      if (rest.trim()) db.exec(rest);
      record();
    })();
  } catch (err: unknown) {
    // The replay runs in one transaction, so a failure leaves nothing half-applied. Any failure
    // (another duplicate column, a CREATE TABLE/INDEX that already exists, ...) means the schema
    // is ahead of the ledger: fall back to the marker-only behaviour the runner always had, so
    // an idempotent leftover never aborts boot. If even the ledger write fails, that throws.
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[Migration] ${migration.version}_${migration.name}: replay without the existing columns ` +
        `failed (${message}); recording the migration without replaying it.`
    );
    db.transaction(record)();
  }
  return skipped;
}

export function inferPhysicalSchemaBaseline(db: SqliteAdapter): {
  version: string;
  description: string;
} | null {
  for (const sentinel of PHYSICAL_SCHEMA_SENTINELS) {
    if (hasTable(db, sentinel.tableName)) {
      return {
        version: sentinel.version,
        description: sentinel.description,
      };
    }
  }

  const hasInitialSchema = INITIAL_SCHEMA_SENTINELS.every((tableName) => hasTable(db, tableName));
  if (hasInitialSchema) {
    return {
      version: "001",
      description: "initial schema tables",
    };
  }

  return null;
}

export function getPlausiblePendingCount(files: MigrationFile[], baselineVersion: string): number {
  const baseline = Number.parseInt(baselineVersion, 10);
  return files.filter((file) => Number.parseInt(file.version, 10) > baseline).length;
}

/**
 * Detect migration name mismatches — when a migration version number
 * has been reused/renumbered with a different name. This is a strong signal
 * that the migration tracking is corrupted or migrations were renumbered.
 */
export function detectNameMismatches(
  appliedRecords: Array<{ version: string; name: string }>,
  files: MigrationFile[]
): Array<{ version: string; appliedName: string; diskName: string }> {
  const appliedByName = new Map(appliedRecords.map((record) => [record.version, record.name]));
  const mismatches: Array<{ version: string; appliedName: string; diskName: string }> = [];

  for (const file of files) {
    const appliedName = appliedByName.get(file.version);
    if (appliedName && appliedName !== file.name) {
      mismatches.push({
        version: file.version,
        appliedName,
        diskName: file.name,
      });
    }
  }

  return mismatches;
}

type CompatibilityEntry = {
  fromVersion: string;
  fromName: string;
  toVersion: string;
  toName: string;
};
type LedgerRow = { version: string; name: string };
type EntryOutcome =
  { status: "skipped" } | { status: "repaired" } | { status: "blocked"; targetRow: LedgerRow };

function occupiedSlotError(compatibility: CompatibilityEntry, targetRow: LedgerRow): Error {
  return new Error(
    `[Migration] Cannot reconcile ${compatibility.fromVersion}_${compatibility.fromName}: ` +
      `target version ${compatibility.toVersion} is occupied by unknown migration ` +
      `"${targetRow.name}" (expected "${compatibility.toName}").`
  );
}

/**
 * One compatibility entry, exactly as the single pass always handled it, except that an
 * occupied target slot is reported back instead of thrown: the caller decides whether another
 * entry is about to empty that slot.
 */
function reconcileCompatibilityEntry(
  db: SqliteAdapter,
  compatibility: CompatibilityEntry
): EntryOutcome {
  const legacyRow = db
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
    .get(compatibility.fromVersion, compatibility.fromName) as LedgerRow | undefined;
  if (!legacyRow) {
    return { status: "skipped" };
  }

  const targetRow = db
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
    .get(compatibility.toVersion) as LedgerRow | undefined;

  const isSameSlotReplacement = compatibility.fromVersion === compatibility.toVersion;
  if (targetRow && !isSameSlotReplacement && targetRow.name !== compatibility.toName) {
    return { status: "blocked", targetRow };
  }

  const applyRepair = db.transaction(() => {
    if (targetRow) {
      db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
        compatibility.fromVersion,
        compatibility.fromName
      );
    } else {
      db.prepare(
        "UPDATE _omniroute_migrations SET version = ?, name = ? WHERE version = ? AND name = ?"
      ).run(
        compatibility.toVersion,
        compatibility.toName,
        compatibility.fromVersion,
        compatibility.fromName
      );
    }
  });

  applyRepair();
  console.warn(
    `[Migration] Reconciled renamed migration ${compatibility.fromVersion}_${compatibility.fromName} ` +
      `to ${compatibility.toVersion}_${compatibility.toName} to preserve pending migrations.`
  );

  // After the compat rewrite, verify the old version slot is now free.
  // A residual row (from a failed prior run, manual intervention, or edge-case
  // UPDATE conflict) at the old version would shadow a NEW migration file
  // placed at that version number — e.g. 028_create_files_and_batches.sql
  // would be skipped because getAppliedVersions() still sees version "028".
  const residualRow = db
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
    .get(compatibility.fromVersion) as LedgerRow | undefined;
  if (residualRow) {
    console.warn(
      `[Migration] ⚠️  Residual row at version ${compatibility.fromVersion} ` +
        `(name: "${residualRow.name}") still present after compat rewrite — ` +
        `removing to unblock new migration at this version slot.`
    );
    db.prepare("DELETE FROM _omniroute_migrations WHERE version = ?").run(
      compatibility.fromVersion
    );
  }
  return { status: "repaired" };
}

/**
 * Moves the ledger rows of renamed migrations (RENAMED_MIGRATION_COMPATIBILITY) to their new
 * slots, so a database that applied a migration under its old version neither runs it again
 * nor skips the migration that now owns the old slot.
 *
 * The order of the entries does not matter. They run in array order; an entry whose target
 * slot still holds another migration's row would stop the boot, but if another eligible entry
 * moves that row away, the entry waits and is retried after the rest of the pass, until every
 * entry is done. When nothing has to wait, the steps and the result are exactly those of a
 * single pass in array order. When a real conflict remains (a slot held by a row no entry
 * moves, or entries that swap slots), the boot stops with exactly the error the single pass
 * gave: the one for the first entry it found blocked. A warning names the entry that is
 * really stuck when that is a different one.
 *
 * Runs inside the caller's transaction (runImmediateTransaction in migrationRunner.ts), which
 * rolls back the repairs made before an error. Order independence assumes what the runner and
 * the tests already enforce: one file per version and one entry per (fromVersion, fromName).
 * `compatibilityEntries` exists for tests; the runner always uses the constant.
 */
export function reconcileRenumberedMigrations(
  db: SqliteAdapter,
  files: MigrationFile[],
  compatibilityEntries: ReadonlyArray<CompatibilityEntry> = RENAMED_MIGRATION_COMPATIBILITY
): boolean {
  let repaired = false;

  // Eligibility depends only on the files on disk, so it is the same in every pass.
  const eligible = compatibilityEntries.filter(
    (compatibility) =>
      files.some(
        (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
      ) && isCompatibilitySourceEligible(files, compatibility)
  );

  // The entry the single pass in array order would have stopped at, with the row it found.
  let firstBlocked: { compatibility: CompatibilityEntry; targetRow: LedgerRow } | null = null;
  const stopTheBoot = (compatibility: CompatibilityEntry, targetRow: LedgerRow): never => {
    const reported = firstBlocked ?? { compatibility, targetRow };
    if (reported.compatibility !== compatibility) {
      console.warn(
        `[Migration] ${compatibility.fromVersion}_${compatibility.fromName} cannot move: ` +
          `target version ${compatibility.toVersion} holds "${targetRow.name}" ` +
          `(expected "${compatibility.toName}"), and no compatibility entry moves it.`
      );
    }
    throw occupiedSlotError(reported.compatibility, reported.targetRow);
  };

  const deferred = new Set<CompatibilityEntry>();
  let pending: ReadonlyArray<CompatibilityEntry> = eligible;
  while (pending.length > 0) {
    const waiting: Array<{ compatibility: CompatibilityEntry; targetRow: LedgerRow }> = [];
    for (const compatibility of pending) {
      const result = reconcileCompatibilityEntry(db, compatibility);
      if (result.status === "repaired") {
        repaired = true;
        continue;
      }
      if (result.status === "skipped") continue;

      const { targetRow } = result;
      firstBlocked ??= { compatibility, targetRow };
      const movedByAnotherEntry = eligible.some(
        (other) =>
          other !== compatibility &&
          other.fromVersion === targetRow.version &&
          other.fromName === targetRow.name
      );
      if (!movedByAnotherEntry) stopTheBoot(compatibility, targetRow);
      if (!deferred.has(compatibility)) {
        deferred.add(compatibility);
        console.warn(
          `[Migration] Deferring ${compatibility.fromVersion}_${compatibility.fromName}: ` +
            `target version ${compatibility.toVersion} still holds "${targetRow.name}", which ` +
            `another compatibility entry moves first.`
        );
      }
      waiting.push({ compatibility, targetRow });
    }

    // Every pass either finishes an entry or stops here, so the loop always ends.
    if (waiting.length === pending.length) {
      stopTheBoot(waiting[0].compatibility, waiting[0].targetRow);
    }
    pending = waiting.map((entry) => entry.compatibility);
  }

  return repaired;
}

export function rehomeLegacyVersionSlotMigrations(
  db: SqliteAdapter,
  files: MigrationFile[]
): boolean {
  let repaired = false;
  const diskNamesByVersion = new Map(files.map((file) => [file.version, file.name]));

  for (const legacy of LEGACY_VERSION_SLOT_MIGRATIONS) {
    const diskName = diskNamesByVersion.get(legacy.version);
    if (!diskName || diskName === legacy.name) {
      continue;
    }

    const legacyRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(legacy.version, legacy.name) as { version: string; name: string } | undefined;
    if (!legacyRow) {
      continue;
    }

    const legacyVersion = `legacy-${legacy.version}-${legacy.name}`;
    const applyRepair = db.transaction(() => {
      const existingLegacyRow = db
        .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
        .get(legacyVersion) as { version: string } | undefined;

      if (existingLegacyRow) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          legacy.version,
          legacy.name
        );
        return;
      }

      db.prepare("UPDATE _omniroute_migrations SET version = ? WHERE version = ? AND name = ?").run(
        legacyVersion,
        legacy.version,
        legacy.name
      );
    });

    applyRepair();
    repaired = true;
    console.warn(
      `[Migration] Rehomed legacy migration ${legacy.version}_${legacy.name} ` +
        `to ${legacyVersion} so current ${legacy.version}_${diskName} can apply.`
    );
  }

  return repaired;
}

export function hasLedgerRepairCandidates(db: SqliteAdapter, files: MigrationFile[]): boolean {
  const diskNamesByVersion = new Map(files.map((file) => [file.version, file.name]));
  for (const legacy of LEGACY_VERSION_SLOT_MIGRATIONS) {
    const diskName = diskNamesByVersion.get(legacy.version);
    if (!diskName || diskName === legacy.name) continue;
    const row = db
      .prepare("SELECT 1 FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(legacy.version, legacy.name);
    if (row) return true;
  }

  for (const compatibility of RENAMED_MIGRATION_COMPATIBILITY) {
    const hasTargetFile = files.some(
      (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
    );
    const hasSourceFile = isCompatibilitySourceEligible(files, compatibility);
    if (!hasTargetFile || !hasSourceFile) continue;
    const row = db
      .prepare("SELECT 1 FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(compatibility.fromVersion, compatibility.fromName);
    if (row) return true;
  }

  return false;
}
