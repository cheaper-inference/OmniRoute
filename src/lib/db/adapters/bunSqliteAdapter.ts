import fs from "node:fs";
import type { PreparedStatement, RunResult, SqliteAdapter } from "./types";

/**
 * The Bun runtime already ships a SQLite driver. Keep this adapter deliberately
 * small so the rest of the application can use the same driver contract as
 * better-sqlite3, node:sqlite, and sql.js.
 */
export interface BunSqliteDatabaseLike {
  query(sql: string): {
    run(...params: unknown[]): { changes: number | bigint; lastInsertRowid: number | bigint };
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
  };
  exec(sql: string): void;
  serialize?(): Uint8Array;
  transaction<T>(fn: (...args: unknown[]) => T): {
    (...args: unknown[]): T;
    immediate?: (...args: unknown[]) => T;
  };
  // bun:sqlite exposes this on the database handle. Optional here so test
  // doubles without it keep compiling; the adapter reports `undefined` then,
  // which callers treat as "state unknown".
  readonly inTransaction?: boolean;
  close(): void;
}

function normalizeRunResult(result: {
  changes?: number | bigint;
  lastInsertRowid?: number | bigint;
}): RunResult {
  return {
    changes: Number(result.changes ?? 0),
    lastInsertRowid: Number(result.lastInsertRowid ?? 0),
  };
}

function normalizeParams(params: unknown[]): unknown[] {
  if (params.length !== 1) return params;
  const [first] = params;
  if (
    first === null ||
    typeof first !== "object" ||
    Array.isArray(first) ||
    first instanceof Uint8Array ||
    (typeof Buffer !== "undefined" && Buffer.isBuffer(first))
  ) {
    return params;
  }

  // better-sqlite3 callers use bare object keys for @name, :name, and $name.
  // Bun requires the sigil to match the SQL placeholder, so provide all three
  // aliases just as the sql.js adapter does.
  const expanded: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(first as Record<string, unknown>)) {
    if (/^[:@$]/.test(key)) {
      expanded[key] = value;
    } else {
      expanded[`@${key}`] = value;
      expanded[`:${key}`] = value;
      expanded[`$${key}`] = value;
    }
  }
  return [expanded];
}

// The driver's own flag, guarded by the adapter's flag because reading it after
// close throws on bun; a closed handle holds no transaction, so false is the
// honest answer there. A driver without the flag, or one reporting something
// other than a boolean, is unknown rather than false: false tells the release
// helper it is safe to close, and closing on a guess is the silent rollback the
// helper exists to prevent. A read that throws leaves the state unknown too.
function readTransactionState(db: BunSqliteDatabaseLike, isOpen: boolean): boolean | undefined {
  if (!isOpen) return false;
  try {
    const state = db.inTransaction;
    return typeof state === "boolean" ? state : undefined;
  } catch {
    return undefined;
  }
}

type BunSqliteStatement = ReturnType<BunSqliteDatabaseLike["query"]>;

function wrapBunStatement<Row>(statement: BunSqliteStatement): PreparedStatement<Row> {
  return {
    run(...params: unknown[]): RunResult {
      return normalizeRunResult(statement.run(...normalizeParams(params)));
    },
    get(...params: unknown[]): Row | undefined {
      // bun:sqlite returns null when no row matches; better-sqlite3, node:sqlite and
      // sql.js return undefined, which is the contract the call sites are written to.
      return (statement.get(...normalizeParams(params)) ?? undefined) as Row | undefined;
    },
    all(...params: unknown[]): Row[] {
      return statement.all(...normalizeParams(params)) as Row[];
    },
  };
}

export function createBunSqliteAdapter(db: BunSqliteDatabaseLike, filePath: string): SqliteAdapter {
  let isOpen = true;

  return {
    driver: "bun:sqlite",

    // The adapter owns this flag, so there is no unreadable case: it knows
    // whether it closed the handle.
    readOpenWitness() {
      return isOpen ? "open" : "closed";
    },

    get open() {
      return isOpen;
    },

    get inTransaction() {
      return readTransactionState(db, isOpen);
    },

    get name() {
      return filePath;
    },

    prepare<Row = unknown>(sql: string): PreparedStatement<Row> {
      return wrapBunStatement<Row>(db.query(sql));
    },

    exec(sql: string): void {
      db.exec(sql);
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      const statement = db.query(`PRAGMA ${pragmaStr}`);
      if (options?.simple) {
        const row = statement.get() as Record<string, unknown> | undefined;
        return row ? (Object.values(row)[0] ?? null) : null;
      }
      return statement.all();
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return db.transaction(fn);
    },

    immediate(fn: () => void): void {
      const transaction = db.transaction(fn);
      if (typeof transaction.immediate === "function") {
        transaction.immediate();
        return;
      }
      db.exec("BEGIN IMMEDIATE");
      try {
        fn();
        db.exec("COMMIT");
      } catch (error) {
        try {
          db.exec("ROLLBACK");
        } catch {}
        throw error;
      }
    },

    async backup(destination: string): Promise<void> {
      if (filePath === ":memory:") return;
      try {
        db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
      } catch {}
      await fs.promises.copyFile(filePath, destination);
    },

    checkpoint(mode = "TRUNCATE"): void {
      try {
        db.exec(`PRAGMA wal_checkpoint(${mode})`);
      } catch {}
    },

    close(): void {
      if (!isOpen) return;
      db.close();
      isOpen = false;
    },

    get raw() {
      return db;
    },
  };
}
