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
// Exit 0 = <output.json> holds { "schema", "appliedMigrations" } (BootResult).
// Exit 3 (MIGRATION_FAILED_EXIT_CODE) = a migration failed to apply: <output.json> holds
//   { "migrationFailure": { "file", "message" }, "appliedMigrations" } (BootFailureResult).
//   Recognized from what the runner does on that path (src/lib/db/migrationRunner.ts logs
//   `[Migration] FAILED: <version>_<name> — <message>` and rethrows the same error), never from
//   an arbitrary exception.
// Any other exit = the boot failed for another reason (cause on stderr).
//
// `appliedMigrations` lists the files this boot APPLIED, as `<version>_<name>.sql`, in order:
// every row the boot inserted into _omniroute_migrations. On a database that already has the
// ledger, an AFTER INSERT trigger on it (installed before the boot, removed before the schema
// is read) records each insert. That covers every way the runner applies a migration (plain
// apply, slot replacement after a DELETE, atomic replay, the "duplicate column" replay and the
// idempotency skip, which also inserts the row because the runner considered the file
// pending), and only those: a compatibility relocation moves the row with UPDATE, which fires
// no INSERT trigger. A rowid comparison would not do: after a DELETE of the newest row, SQLite
// hands the next INSERT the same rowid again.
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

/**
 * Canonical form of a table's `CREATE TABLE` text (see canonicalTableDefinition): what no
 * pragma exposes (CHECK, COLLATE, generated columns, AUTOINCREMENT, ...) is compared here.
 */
export type TableDefinition = {
  /** Top-level items of the body (column and table-constraint definitions), normalized, sorted. */
  items: string[];
  /** Module of a virtual table plus the options after the body (WITHOUT ROWID, STRICT). */
  options: string;
};

/** What a boot whose migration failed to apply writes instead of a schema. */
export type MigrationFailure = { file: string; message: string };

/** <output.json> of a boot that succeeded. */
export type BootResult = { schema: NormalizedSchema; appliedMigrations: string[] };

/**
 * <output.json> of a boot whose migration failed. `appliedMigrations` holds the files applied
 * (and committed) before the failure, or null when they could not be read back.
 */
export type BootFailureResult = {
  migrationFailure: MigrationFailure;
  appliedMigrations: string[] | null;
};

/** Exit code of a boot whose migration failed to apply. */
export const MIGRATION_FAILED_EXIT_CODE = 3;

/** Order-independent description of a SQLite schema. */
export type NormalizedSchema = {
  tables: Record<string, ColumnShape[]>;
  definitions: Record<string, TableDefinition | null>;
  /**
   * Table-level constraints per table, as sorted signatures: UNIQUE / PRIMARY KEY constraints
   * (their implicit `sqlite_autoindex_*` indexes are filtered out of `indexes`, so they would
   * otherwise be invisible) and FOREIGN KEYs. CHECK constraints are not exposed by any pragma;
   * they are compared through `definitions`.
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

type SqlToken = {
  kind: "space" | "comment" | "string" | "quoted" | "punct" | "word";
  text: string;
};

const SIMPLE_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
/** Characters around which whitespace never matters in SQL. */
const PUNCTUATION = new Set("(),;=<>!+-*/%|&~.".split(""));
const WHITESPACE_RUN = /\s+/y;
/** A run of characters that are neither whitespace, quotes nor punctuation. */
const WORD_RUN = /[^\s'"`[\]()\-/,;=<>!+*%|&~.]+/y;

/**
 * Splits SQL text into tokens without interpreting it: '...' string literals, "..." `...`
 * [...] quoted identifiers, -- and /* *\/ comments, whitespace runs, single punctuation
 * characters, and runs of anything else. An unterminated literal or comment runs to the end.
 */
export function tokenizeSql(sql: string): SqlToken[] {
  const tokens: SqlToken[] = [];
  let index = 0;
  const readQuoted = (close: string, doubled: boolean): string => {
    let end = index + 1;
    for (;;) {
      const next = sql.indexOf(close, end);
      if (next === -1) return sql.slice(index);
      if (doubled && sql[next + 1] === close) {
        end = next + 2;
        continue;
      }
      return sql.slice(index, next + 1);
    }
  };
  while (index < sql.length) {
    const char = sql[index];
    let token: SqlToken;
    if (/\s/.test(char)) {
      WHITESPACE_RUN.lastIndex = index;
      token = { kind: "space", text: (WHITESPACE_RUN.exec(sql) as RegExpExecArray)[0] };
    } else if (char === "-" && sql[index + 1] === "-") {
      const end = sql.indexOf("\n", index);
      token = { kind: "comment", text: end === -1 ? sql.slice(index) : sql.slice(index, end) };
    } else if (char === "/" && sql[index + 1] === "*") {
      const end = sql.indexOf("*/", index + 2);
      token = { kind: "comment", text: end === -1 ? sql.slice(index) : sql.slice(index, end + 2) };
    } else if (char === "'") {
      token = { kind: "string", text: readQuoted("'", true) };
    } else if (char === '"' || char === "`") {
      token = { kind: "quoted", text: readQuoted(char, true) };
    } else if (char === "[") {
      token = { kind: "quoted", text: readQuoted("]", false) };
    } else if (PUNCTUATION.has(char)) {
      token = { kind: "punct", text: char };
    } else {
      WORD_RUN.lastIndex = index;
      token = { kind: "word", text: WORD_RUN.exec(sql)?.[0] ?? char };
    }
    tokens.push(token);
    index += token.text.length;
  }
  return tokens;
}

/** The name inside a quoted identifier token, with doubled quotes undone. */
function unquoteIdentifier(text: string): string {
  const open = text[0];
  const close = open === "[" ? "]" : open;
  const inner = text.endsWith(close) && text.length > 1 ? text.slice(1, -1) : text.slice(1);
  return open === "[" ? inner : inner.split(close + close).join(close);
}

type NormalizeMode = "statement" | "defaultValue";

/** A quoted token's content as a '...' string literal. */
function asStringLiteral(name: string): string {
  return `'${name.split("'").join("''")}'`;
}

/** Bare words that a DEFAULT reads as keywords, not as the string they spell (case-insensitive). */
const DEFAULT_KEYWORDS = new Set([
  "null",
  "true",
  "false",
  "current_time",
  "current_date",
  "current_timestamp",
]);

/**
 * Whether the word token at `index`, standing alone as a column default, is a string value:
 * SQLite stores `DEFAULT ABC` as the string 'ABC'. Not a keyword of DEFAULT_KEYWORDS, not a
 * number (a word starting with a digit: 10, 0x1F, 1e5) and not the `x` of a blob x'..'.
 */
function isBareWordDefault(tokens: readonly SqlToken[], index: number): boolean {
  const word = tokens[index].text;
  if (DEFAULT_KEYWORDS.has(word.toLowerCase()) || /^[0-9]/.test(word)) return false;
  if (/^x$/i.test(word) && tokens[index + 1]?.kind === "string") return false;
  return true;
}

/**
 * Canonical text of a token run: comments dropped, everything outside '...' literals in lower
 * case (SQL keywords and identifiers are case-insensitive), simple identifiers unquoted (other
 * quoted identifiers re-quoted as "..."), whitespace collapsed to one space and dropped next
 * to punctuation. String literals are kept verbatim, so they stay case-sensitive.
 *
 * A column default is the one place where SQLite reads a name as a string, so there the case
 * is part of the value and the token is rewritten as a '...' literal:
 *   - a quoted token ("..." `...` [...]) in mode "defaultValue" (a column's dflt_value) or right
 *     after `DEFAULT`: DEFAULT "ABC" equals DEFAULT 'ABC' and differs from DEFAULT "abc";
 *   - a bare word standing alone as the default (the whole dflt_value in mode "defaultValue",
 *     or the token right after `DEFAULT`), unless it is NULL, TRUE, FALSE, CURRENT_TIME,
 *     CURRENT_DATE, CURRENT_TIMESTAMP (any case), a number or the `x` of a blob x'..':
 *     DEFAULT ABC equals DEFAULT 'ABC' and differs from DEFAULT abc. Inside an expression
 *     (`DEFAULT (datetime('now'))`) a word is a function or a keyword and is lower-cased.
 * Everywhere else a quoted token is an identifier. The supported drivers (better-sqlite3 and
 * node:sqlite) run with double-quoted string literals (DQS) disabled: `x = "A"` always names
 * column A (a CHECK or partial index with it fails with `no such column`), never a string.
 */
function normalizeTokens(tokens: readonly SqlToken[], mode: NormalizeMode = "statement"): string {
  let out = "";
  let pendingSpace = false;
  let previous: SqlToken["kind"] | null = null;
  // Lower-case text of the last significant token.
  let last: string | null = null;
  const nextSignificant = (from: number): SqlToken | undefined => {
    for (let index = from; index < tokens.length; index += 1) {
      const kind = tokens[index].kind;
      if (kind !== "space" && kind !== "comment") return tokens[index];
    }
    return undefined;
  };
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.kind === "space" || token.kind === "comment") {
      pendingSpace = true;
      continue;
    }
    let text: string;
    if (token.kind === "string") {
      // A blob literal (x'..', the x glued to the quote) is hex digits, which SQLite reads
      // case-insensitively: x'AB' and x'ab' are the same value. Other literals keep their case.
      const glued = tokens[index - 1];
      const isBlob = glued?.kind === "word" && /^x$/i.test(glued.text);
      text = isBlob ? token.text.toLowerCase() : token.text;
    } else if (token.kind === "quoted") {
      const name = unquoteIdentifier(token.text);
      if (mode === "defaultValue" || last === "default") {
        text = asStringLiteral(name);
      } else {
        const lower = name.toLowerCase();
        text = SIMPLE_IDENTIFIER.test(lower) ? lower : `"${lower.split('"').join('""')}"`;
      }
    } else if (
      token.kind === "word" &&
      (mode === "defaultValue"
        ? last === null && nextSignificant(index + 1) === undefined
        : last === "default") &&
      isBareWordDefault(tokens, index)
    ) {
      text = asStringLiteral(token.text);
    } else {
      text = token.text.toLowerCase();
    }
    if (pendingSpace && previous !== null && previous !== "punct" && token.kind !== "punct") {
      out += " ";
    }
    out += text;
    pendingSpace = false;
    previous = token.kind;
    last = token.kind === "string" || token.kind === "quoted" ? token.text : text;
  }
  return out;
}

/**
 * Canonical text of an index, trigger or view definition (see normalizeTokens): two
 * statements that differ only in keyword case, spacing, comments or quotes around simple
 * identifiers normalize to the same text.
 */
export function normalizeSqlText(sql: string | null | undefined): string | null {
  if (typeof sql !== "string") return null;
  return normalizeTokens(tokenizeSql(sql));
}

/**
 * Canonical text of a column default (pragma_table_info.dflt_value): an SQL expression, so
 * CURRENT_TIMESTAMP equals current_timestamp, but every quoted token in it is a string literal
 * whose case counts (see normalizeTokens).
 */
export function normalizeDefaultValue(sql: string): string {
  return normalizeTokens(tokenizeSql(sql), "defaultValue");
}

/**
 * Canonical definition of a table from its sqlite_master.sql. The header (CREATE TABLE, IF NOT
 * EXISTS, the table name with or without quotes) is left out: ALTER TABLE ... RENAME TO
 * rewrites it to a quoted name. The body's top-level items are split on commas outside
 * parentheses, literals, quoted identifiers and comments, normalized, and SORTED, so that
 * independent ADD COLUMNs applied in a different order still compare equal. Returns null when
 * the text has no parenthesized body.
 */
export function canonicalTableDefinition(sql: string | null | undefined): TableDefinition | null {
  if (typeof sql !== "string") return null;
  const tokens = tokenizeSql(sql);
  const open = tokens.findIndex((token) => token.kind === "punct" && token.text === "(");
  if (open === -1) return null;
  let depth = 0;
  let close = -1;
  const items: SqlToken[][] = [[]];
  for (let index = open + 1; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.kind === "punct" && token.text === "(") depth += 1;
    if (token.kind === "punct" && token.text === ")") {
      if (depth === 0) {
        close = index;
        break;
      }
      depth -= 1;
    }
    if (depth === 0 && token.kind === "punct" && token.text === ",") {
      items.push([]);
      continue;
    }
    items[items.length - 1].push(token);
  }
  if (close === -1) return null;

  // A virtual table's module (`USING fts5`) sits in the header; keep it with the options.
  const header = normalizeTokens(tokens.slice(0, open));
  const usingAt = header.search(/(^| )using /);
  const module = usingAt === -1 ? "" : header.slice(usingAt).trim();
  const trailing = normalizeTokens(tokens.slice(close + 1))
    .replace(/^[\s,]+|[\s;]+$/g, "")
    .trim();
  return {
    items: items
      .map((item) => normalizeTokens(item))
      .filter((item) => item !== "")
      .sort(),
    options: [module, trailing].filter(Boolean).join(" "),
  };
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
    definitions: {},
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
          // A default is an SQL expression: CURRENT_TIMESTAMP and current_timestamp are equal,
          // ABC, "ABC" and 'ABC' are equal, "ABC" and "abc" are not.
          dflt_value:
            column.dflt_value === null ? null : normalizeDefaultValue(String(column.dflt_value)),
          pk: Number(column.pk),
        }))
        .sort((left, right) => left.name.localeCompare(right.name));
      schema.constraints[entry.name] = readTableConstraints(db, entry.name);
      schema.definitions[entry.name] = canonicalTableDefinition(entry.sql);
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

/** What the migration runner logs right before rethrowing the error of a failed migration. */
const FAILED_MIGRATION_LINE = /^\[Migration\] FAILED: (\S+) — ([\s\S]*)$/;

class MigrationFailedError extends Error {
  constructor(readonly failure: MigrationFailure) {
    super(`a migration ${failure.file} falhou ao ser aplicada: ${failure.message}`);
  }
}

/**
 * Runs `boot`, and turns the error the migration runner throws for a migration that failed to
 * apply into a MigrationFailedError. The runner logs `[Migration] FAILED: <version>_<name> —
 * <message>` and rethrows the same error, so the error is recognized only when its message is
 * the one that line carried and the named file exists in the migrations directory.
 */
export async function withMigrationFailureDetection<T>(
  migrationsDir: string,
  boot: () => Promise<T> | T
): Promise<T> {
  let lastFailure: { migration: string; message: string } | null = null;
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (args.length === 1 && typeof args[0] === "string") {
      const match = FAILED_MIGRATION_LINE.exec(args[0]);
      if (match) lastFailure = { migration: match[1], message: match[2] };
    }
    originalError.apply(console, args);
  };
  try {
    return await boot();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const failure = lastFailure as { migration: string; message: string } | null;
    if (failure && failure.message === message) {
      const file = `${failure.migration}.sql`;
      if (fs.existsSync(path.join(migrationsDir, file))) {
        throw new MigrationFailedError({ file, message });
      }
    }
    throw error;
  } finally {
    console.error = originalError;
  }
}

/** Records every row inserted into the ledger; created and dropped by this file only. */
const PROBE_TABLE = "_migration_commutation_ledger_inserts";
const PROBE_TRIGGER = "_migration_commutation_ledger_insert_probe";

type ProbeDb = {
  exec: (sql: string) => unknown;
  prepare: (sql: string) => {
    all: (...params: unknown[]) => unknown[];
    get: (...params: unknown[]) => unknown;
  };
};

function hasLedgerTable(db: ProbeDb): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(LEDGER_TABLE)
  );
}

/**
 * Installs the ledger-insert probe on a database that already has the ledger. Returns false
 * (nothing installed) when there is no ledger yet: then every ledger row after the boot was
 * inserted by it.
 */
export function installLedgerInsertProbe(db: ProbeDb): boolean {
  if (!hasLedgerTable(db)) return false;
  db.exec(
    `CREATE TABLE ${PROBE_TABLE} (seq INTEGER PRIMARY KEY, version TEXT NOT NULL, ` +
      `name TEXT NOT NULL);\n` +
      `CREATE TRIGGER ${PROBE_TRIGGER} AFTER INSERT ON ${LEDGER_TABLE} BEGIN ` +
      `INSERT INTO ${PROBE_TABLE} (version, name) VALUES (new.version, new.name); END;`
  );
  return true;
}

function toFileNames(rows: unknown[]): string[] {
  return (rows as Array<{ version: string; name: string }>).map(
    (row) => `${row.version}_${row.name}.sql`
  );
}

/**
 * The files the boot applied (see the header). With the probe installed: what it recorded,
 * after checking that the trigger survived the boot (a boot that rebuilt the ledger would have
 * dropped it, and its silence would read as "nothing applied"). Without it: every ledger row.
 */
export function readAppliedMigrations(db: ProbeDb, probeInstalled: boolean): string[] {
  if (!probeInstalled) {
    return toFileNames(
      db.prepare(`SELECT version, name FROM ${LEDGER_TABLE} ORDER BY rowid`).all()
    );
  }
  const trigger = db
    .prepare("SELECT 1 FROM sqlite_master WHERE type = 'trigger' AND name = ? AND tbl_name = ?")
    .get(PROBE_TRIGGER, LEDGER_TABLE);
  if (!trigger) {
    throw new Error(
      `o gatilho ${PROBE_TRIGGER} sumiu de ${LEDGER_TABLE} durante o boot: não há como saber ` +
        "quais migrations o boot aplicou"
    );
  }
  return toFileNames(db.prepare(`SELECT version, name FROM ${PROBE_TABLE} ORDER BY seq`).all());
}

/** Drops the probe, so it never shows up in the schema being compared. */
export function removeLedgerInsertProbe(db: ProbeDb): void {
  db.exec(`DROP TRIGGER IF EXISTS ${PROBE_TRIGGER};\nDROP TABLE IF EXISTS ${PROBE_TABLE};`);
}

async function main(): Promise<void> {
  const outputFile = process.argv[2];
  if (!outputFile) {
    throw new Error("uso: migrationSchemaBoot.ts <arquivo-de-saída.json>");
  }
  const migrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
  if (!process.env.DATA_DIR || !migrationsDir) {
    throw new Error("DATA_DIR e OMNIROUTE_MIGRATIONS_DIR são obrigatórios no processo de boot");
  }
  const core = await import("../../../src/lib/db/core.ts");
  const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");
  const sqliteFile = core.SQLITE_FILE;
  if (!sqliteFile) throw new Error("SQLITE_FILE indisponível: o boot exige o modo local");
  const openSide = (): ProbeDb & { close: () => void } => {
    const side = tryOpenSync(sqliteFile);
    if (!side) {
      throw new Error(`nenhum driver SQLite síncrono abre ${sqliteFile} para a sonda do ledger`);
    }
    return side as unknown as ProbeDb & { close: () => void };
  };

  let probeInstalled = false;
  if (fs.existsSync(sqliteFile)) {
    const side = openSide();
    try {
      probeInstalled = installLedgerInsertProbe(side);
    } finally {
      side.close();
    }
  }

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  try {
    const db = (await withMigrationFailureDetection(migrationsDir, () =>
      core.getDbInstance()
    )) as unknown as ProbeDb;
    const appliedMigrations = readAppliedMigrations(db, probeInstalled);
    if (probeInstalled) removeLedgerInsertProbe(db);
    const schema = readNormalizedSchema(db);
    const result: BootResult = { schema, appliedMigrations };
    fs.writeFileSync(outputFile, JSON.stringify(result));
  } catch (error) {
    if (error instanceof MigrationFailedError) {
      // Each migration commits on its own, so what ran before the failure is in the file.
      let appliedMigrations: string[] | null = null;
      try {
        core.resetDbInstance();
        const side = openSide();
        try {
          appliedMigrations = readAppliedMigrations(side, probeInstalled);
        } finally {
          side.close();
        }
      } catch {
        appliedMigrations = null;
      }
      const result: BootFailureResult = { migrationFailure: error.failure, appliedMigrations };
      fs.writeFileSync(outputFile, JSON.stringify(result));
    }
    throw error;
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
      if (error instanceof MigrationFailedError) {
        process.stderr.write(`[migration-schema-boot] ${error.message}\n`);
        process.exit(MIGRATION_FAILED_EXIT_CODE);
      }
      const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
      process.stderr.write(`[migration-schema-boot] boot falhou: ${message}\n`);
      process.exit(1);
    }
  );
}
