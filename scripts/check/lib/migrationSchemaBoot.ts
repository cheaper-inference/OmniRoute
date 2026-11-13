// scripts/check/lib/migrationSchemaBoot.ts
//
// Child process of scripts/check/migration-commutation.ts. One run = one REAL boot of the
// database layer (src/lib/db/core.ts → getDbInstance(): inline schema, column healers, the
// `001` seed, then runMigrations) followed by a dump of the normalized schema.
//
// The parent always spawns this file with an explicit environment: a temporary DATA_DIR and
// HOME, OMNIROUTE_MIGRATIONS_DIR pointing at the directory under test, no
// OMNIROUTE_EXTRA_MIGRATIONS_DIRS. The migration runner resolves its directory when its module
// loads, so every boot needs its own process.
//
// Usage: node --import tsx/esm scripts/check/lib/migrationSchemaBoot.ts <output.json>
// Exit 0 = schema written to <output.json>; any other exit = the boot failed (cause on stderr).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type ColumnShape = {
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
};

export type IndexShape = {
  name: string;
  table: string;
  unique: number;
  columns: string[];
  sql: string | null;
};

export type SqlObjectShape = {
  name: string;
  table: string;
  sql: string | null;
};

/** Order-independent description of a SQLite schema. */
export type NormalizedSchema = {
  tables: Record<string, ColumnShape[]>;
  /**
   * Table-level constraints per table, as sorted signatures: UNIQUE / PRIMARY KEY constraints
   * (their implicit `sqlite_autoindex_*` indexes are filtered out of `indexes`, so they would
   * otherwise be invisible) and FOREIGN KEYs. CHECK constraints are not exposed by any pragma
   * and are not compared.
   */
  constraints: Record<string, string[]>;
  indexes: Record<string, IndexShape>;
  triggers: Record<string, SqlObjectShape>;
  views: Record<string, SqlObjectShape>;
};

function readTableConstraints(db: QueryableDb, table: string): string[] {
  const signatures: string[] = [];
  const implicitIndexes = db
    .prepare(
      'SELECT name, "unique" AS isUnique, origin FROM pragma_index_list(?) ' +
        "WHERE origin IN ('u', 'pk')"
    )
    .all(table) as Array<{ name: string; isUnique: number; origin: string }>;
  for (const index of implicitIndexes) {
    const columns = (
      db
        .prepare("SELECT seqno, name FROM pragma_index_info(?) ORDER BY seqno")
        .all(index.name) as Array<{ seqno: number; name: string | null }>
    ).map((column) => String(column.name));
    const kind = index.origin === "pk" ? "PRIMARY KEY" : "UNIQUE";
    signatures.push(`${kind}(${columns.join(", ")})`);
  }
  const foreignKeys = db
    .prepare(
      'SELECT id, seq, "table" AS target, "from" AS fromColumn, "to" AS toColumn, ' +
        "on_update, on_delete FROM pragma_foreign_key_list(?) ORDER BY id, seq"
    )
    .all(table) as Array<{
    id: number;
    seq: number;
    target: string;
    fromColumn: string;
    toColumn: string | null;
    on_update: string;
    on_delete: string;
  }>;
  const byId = new Map<number, typeof foreignKeys>();
  for (const row of foreignKeys) {
    if (!byId.has(row.id)) byId.set(row.id, []);
    byId.get(row.id)!.push(row);
  }
  for (const rows of byId.values()) {
    const first = rows[0];
    signatures.push(
      `FOREIGN KEY(${rows.map((row) => row.fromColumn).join(", ")}) REFERENCES ` +
        `${first.target}(${rows.map((row) => row.toColumn ?? "").join(", ")}) ` +
        `ON UPDATE ${first.on_update} ON DELETE ${first.on_delete}`
    );
  }
  return signatures.sort();
}

type QueryableDb = {
  prepare: (sql: string) => { all: (...params: unknown[]) => unknown[] };
};

/** Collapse whitespace runs and drop the whitespace around punctuation. */
export function normalizeSqlText(sql: string | null | undefined): string | null {
  if (typeof sql !== "string") return null;
  return sql
    .replace(/\s+/g, " ")
    .replace(/\s*([(),;=])\s*/g, "$1")
    .trim();
}

/** The migration ledger's rows differ by design; its columns do not. */
const LEDGER_TABLE = "_omniroute_migrations";

export function readNormalizedSchema(db: QueryableDb): NormalizedSchema {
  const master = db
    .prepare(
      "SELECT type, name, tbl_name, sql FROM sqlite_master " +
        "WHERE name NOT LIKE 'sqlite\\_%' ESCAPE '\\' ORDER BY type, name"
    )
    .all() as Array<{ type: string; name: string; tbl_name: string; sql: string | null }>;

  const schema: NormalizedSchema = {
    tables: {},
    constraints: {},
    indexes: {},
    triggers: {},
    views: {},
  };

  for (const entry of master) {
    if (entry.type === "table") {
      const columns = db
        .prepare(
          'SELECT name, type, "notnull" AS isNotNull, dflt_value, pk FROM pragma_table_info(?)'
        )
        .all(entry.name) as Array<Omit<ColumnShape, "notnull"> & { isNotNull: number }>;
      schema.tables[entry.name] = columns
        .map((column) => ({
          name: String(column.name),
          type: String(column.type ?? ""),
          notnull: Number(column.isNotNull),
          dflt_value: column.dflt_value === null ? null : String(column.dflt_value),
          pk: Number(column.pk),
        }))
        .sort((left, right) => left.name.localeCompare(right.name));
      schema.constraints[entry.name] = readTableConstraints(db, entry.name);
    } else if (entry.type === "index") {
      const listing = db
        .prepare('SELECT name, "unique" AS isUnique FROM pragma_index_list(?)')
        .all(entry.tbl_name) as Array<{ name: string; isUnique: number }>;
      const unique = Number(listing.find((row) => row.name === entry.name)?.isUnique ?? 0);
      // Index column order is part of what the index means, so it is kept.
      const columns = (
        db
          .prepare("SELECT seqno, cid, name FROM pragma_index_info(?) ORDER BY seqno")
          .all(entry.name) as Array<{ seqno: number; cid: number; name: string | null }>
      ).map((column) => (column.name === null ? `<expr:${column.cid}>` : String(column.name)));
      schema.indexes[entry.name] = {
        name: entry.name,
        table: entry.tbl_name,
        unique,
        columns,
        sql: normalizeSqlText(entry.sql),
      };
    } else if (entry.type === "trigger") {
      schema.triggers[entry.name] = {
        name: entry.name,
        table: entry.tbl_name,
        sql: normalizeSqlText(entry.sql),
      };
    } else if (entry.type === "view") {
      schema.views[entry.name] = {
        name: entry.name,
        table: entry.tbl_name,
        sql: normalizeSqlText(entry.sql),
      };
    }
  }

  // Only the CONTENT of the ledger is excluded; the table itself stays in the comparison.
  if (!schema.tables[LEDGER_TABLE]) {
    throw new Error(`a tabela ${LEDGER_TABLE} não existe depois do boot`);
  }
  return schema;
}

async function main(): Promise<void> {
  const outputFile = process.argv[2];
  if (!outputFile) {
    throw new Error("uso: migrationSchemaBoot.ts <arquivo-de-saída.json>");
  }
  if (!process.env.DATA_DIR || !process.env.OMNIROUTE_MIGRATIONS_DIR) {
    throw new Error("DATA_DIR e OMNIROUTE_MIGRATIONS_DIR são obrigatórios no processo de boot");
  }
  const core = await import("../../../src/lib/db/core.ts");
  try {
    const db = core.getDbInstance() as unknown as QueryableDb;
    const schema = readNormalizedSchema(db);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(schema));
  } finally {
    core.resetDbInstance();
  }
}

const invokedDirectly =
  typeof process.argv[1] === "string" &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main().then(
    () => process.exit(0),
    (error: unknown) => {
      const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
      process.stderr.write(`[migration-schema-boot] boot falhou: ${message}\n`);
      process.exit(1);
    }
  );
}
