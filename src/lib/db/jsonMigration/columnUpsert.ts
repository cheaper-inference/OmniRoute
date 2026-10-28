/**
 * db/jsonMigration/columnUpsert.ts — schema-driven mapping of a JSON-backup record
 * (camelCase, as produced by the settings export) onto the real table columns.
 *
 * The column list comes from `PRAGMA table_info`, never from a hand-copied subset,
 * so columns added by later migrations are restored automatically instead of being
 * silently reset to their defaults by the import.
 */

import type { SqliteAdapter } from "../adapters/types";
import { toCamelCase } from "../caseMapping";

export type ColumnValues = Record<string, unknown>;
type JsonRecord = Record<string, unknown>;

export type JsonImportTable = "api_keys" | "provider_connections";

const SAFE_IDENTIFIER = /^[a-z_][a-z0-9_]*$/;

function quoteIdentifier(column: string): string {
  if (!SAFE_IDENTIFIER.test(column)) {
    throw new Error(`Refusing to use unexpected column name in JSON import: ${column}`);
  }
  return `"${column}"`;
}

/** Real column names of `table`, read from the live schema. */
export function getTableColumns(db: SqliteAdapter, table: JsonImportTable): string[] {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name?: unknown }>;
  return rows.map((row) => String(row.name ?? "")).filter((name) => SAFE_IDENTIFIER.test(name));
}

/**
 * Reads the backup value for a column. `undefined` means "not carried by this backup".
 * Export shapes: `foo_bar` → `fooBar`; `foo_json` → `foo` (parsed object, see rowToCamel).
 * Raw snake_case keys are accepted as a fallback for hand-written / legacy files.
 */
function readBackupField(record: JsonRecord, column: string): unknown {
  const camel = toCamelCase(column);
  if (column.endsWith("_json")) {
    const base = camel.slice(0, -"Json".length);
    if (record[base] !== undefined) return record[base];
  }
  if (record[camel] !== undefined) return record[camel];
  if (record[column] !== undefined) return record[column];
  return undefined;
}

function toColumnValue(column: string, value: unknown): unknown {
  if (value === null) return null;
  if (column.endsWith("_json")) {
    if (typeof value === "string") return value;
    return typeof value === "object" && !Array.isArray(value) ? JSON.stringify(value) : null;
  }
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

/** Maps every column the backup record carries; absent columns are left out. */
export function mapBackupRecordToColumns(record: JsonRecord, columns: string[]): ColumnValues {
  const values: ColumnValues = {};
  for (const column of columns) {
    const raw = readBackupField(record, column);
    if (raw !== undefined) values[column] = toColumnValue(column, raw);
  }
  return values;
}

/** Current row for `id`, or undefined when the backup row is new to this instance. */
export function selectExistingRow(
  db: SqliteAdapter,
  table: JsonImportTable,
  id: unknown
): ColumnValues | undefined {
  if (typeof id !== "string" || id.length === 0) return undefined;
  return db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id) as ColumnValues | undefined;
}

/**
 * Inserts a new row with the given columns (schema defaults fill the rest) or, when the
 * row already exists, updates ONLY the given columns so anything the backup does not
 * carry keeps its current value.
 */
export function upsertColumns(
  db: SqliteAdapter,
  table: JsonImportTable,
  values: ColumnValues,
  exists: boolean
): void {
  const columns = Object.keys(values);
  if (exists) {
    const assignments = columns
      .filter((column) => column !== "id")
      .map((column) => `${quoteIdentifier(column)} = @${column}`);
    if (assignments.length === 0) return;
    db.prepare(`UPDATE ${table} SET ${assignments.join(", ")} WHERE id = @id`).run(values);
    return;
  }
  const names = columns.map(quoteIdentifier).join(", ");
  const params = columns.map((column) => `@${column}`).join(", ");
  db.prepare(`INSERT INTO ${table} (${names}) VALUES (${params})`).run(values);
}
