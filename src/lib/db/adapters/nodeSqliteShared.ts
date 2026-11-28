import fs from "node:fs";
import type { OpenWitness, PreparedStatement, RunResult, SqliteAdapter } from "./types";

export interface NodeSqliteDatabaseLike {
  prepare(sql: string): {
    run(...p: unknown[]): { changes: number | bigint; lastInsertRowid: number | bigint };
    get(...p: unknown[]): unknown;
    all(...p: unknown[]): unknown[];
    // node:sqlite (DatabaseSync) statements expose these tuning setters. They
    // are optional here so the shared adapter also accepts lighter test doubles.
    setAllowUnknownNamedParameters?(enabled: boolean): void;
    setAllowBareNamedParameters?(enabled: boolean): void;
    // node:sqlite statements carry no finalize member on the real driver
    // (DatabaseSync exposes run/get/all/iterate), so eviction and close lean on
    // the handle's own close. Optional here so a double that models an explicit
    // finalization can assert the adapter calls it when it is present.
    finalize?(): void;
  };
  exec(sql: string): void;
  // `DatabaseSync.isTransaction` is a boolean on Node 24.18.0. Optional here so
  // test doubles without it keep compiling; the adapter reports `undefined`
  // in that case, which callers treat as "state unknown".
  readonly isTransaction?: boolean;
  // Native DatabaseSync exposes this witness; lightweight doubles may omit it.
  readonly isOpen?: boolean;
  close(): void;
}

const MAX_STMT_CACHE_SIZE = 200;

// node:sqlite hands back rows whose prototype is `null` (Object.create(null)),
// whereas better-sqlite3 (the driver we ship and run in production/CI) returns
// ordinary Object.prototype rows. The difference is invisible for normal
// property access but breaks callers that compare rows with structural
// equality that also checks the prototype (e.g. Node's assert.deepStrictEqual,
// used by unit tests written against the better-sqlite3 row shape). Normalize
// every row to a plain object so the node:sqlite fallback is behaviourally
// identical to the native better-sqlite3 path.
function toPlainRow<T>(row: T): T {
  if (row === null || typeof row !== "object") return row;
  return { ...(row as Record<string, unknown>) } as T;
}

// node:sqlite binds a string only up to its first NUL byte and drops the rest
// without any error, so "a\0b" is stored as "a". Strip NULs from string params
// (never from Buffers) so text is not silently cut. Also coerces undefined -> null
// (see normalizeBindParams).
function normalizeBindValue(value: unknown): unknown {
  if (value === undefined) return null;
  return typeof value === "string" ? value.replaceAll("\0", "") : value;
}

// better-sqlite3 (the production/CI driver) and sql.js both accept `undefined`
// as a bound value and treat it as SQL NULL. node:sqlite is stricter and throws
// "Provided value cannot be bound to SQLite parameter N" for undefined. Several
// call sites pass undefined for absent optional columns (e.g. a capability sync
// that omits modalities_input), so coerce undefined -> null here to keep the
// node:sqlite fallback behaviourally compatible with the native driver. This
// handles both positional params and a single named-params object.
function normalizeBindParams(params: unknown[]): unknown[] {
  const [first] = params;
  const isLoneNamedParamsObject =
    params.length === 1 &&
    first !== null &&
    typeof first === "object" &&
    !Array.isArray(first) &&
    !Buffer.isBuffer(first) &&
    !(first instanceof Uint8Array);
  if (isLoneNamedParamsObject) {
    const source = first as Record<string, unknown>;
    const normalized: Record<string, unknown> = {};
    for (const key of Object.keys(source)) {
      normalized[key] = normalizeBindValue(source[key]);
    }
    return [normalized];
  }
  return params.map(normalizeBindValue);
}

export interface NodeSqliteAdapterCloseHooks {
  /** Runs before every driver close attempt while the handle is still open. */
  onBeforeClose?: (options?: { checkpoint?: boolean }) => void;
  /** Runs once after the driver confirms close and the adapter marks itself closed. */
  onClosed?: () => void;
}

export function createNodeSqliteAdapterFromDatabase(
  db: NodeSqliteDatabaseLike,
  filePath: string,
  closeHooks: NodeSqliteAdapterCloseHooks = {}
): SqliteAdapter {
  let _isOpen = true;
  let transactionDepth = 0;
  type NodeSqliteStatement = ReturnType<NodeSqliteDatabaseLike["prepare"]>;
  interface CachedStatement {
    stmt: NodeSqliteStatement;
  }
  const stmtCache = new Map<string, CachedStatement>();

  function finalizeStatement(stmt: NodeSqliteStatement | undefined) {
    if (!stmt) return;
    // The membership check reads the driver object too, so it sits inside the
    // guard: a statement whose `has` trap throws must not abort the sweep that
    // follows, or the cache stays populated and onClosed never runs.
    try {
      if ("finalize" in stmt) {
        (stmt as NodeSqliteStatement & { finalize: () => void }).finalize();
      }
    } catch {}
  }

  function getCached(sql: string) {
    let entry = stmtCache.get(sql);
    if (entry) {
      stmtCache.delete(sql);
      stmtCache.set(sql, entry);
    } else {
      const stmt = db.prepare(sql);
      // better-sqlite3 (the production/CI driver) silently ignores named
      // parameters supplied in the bind object that the SQL text does not
      // reference. node:sqlite instead throws "Unknown named parameter '<x>'".
      // Several call sites deliberately pass a superset params object (e.g. an
      // UPDATE that omits @createdAt while the shared params builder still
      // includes it), so relax node:sqlite to match better-sqlite3 and keep the
      // fallback driver behaviourally compatible.
      stmt.setAllowUnknownNamedParameters?.(true);
      if (stmtCache.size >= MAX_STMT_CACHE_SIZE) {
        const oldestKey = stmtCache.keys().next().value;
        if (oldestKey !== undefined) {
          finalizeStatement(stmtCache.get(oldestKey)?.stmt);
          stmtCache.delete(oldestKey);
        }
      }
      entry = { stmt };
      stmtCache.set(sql, entry);
    }
    return entry.stmt;
  }

  function runSavepoint<T>(fn: (...args: unknown[]) => T, ...args: unknown[]): T {
    const sp = `sp_${Math.random().toString(36).slice(2)}`;
    db.exec(`SAVEPOINT "${sp}"`);
    try {
      const result = fn(...args);
      db.exec(`RELEASE "${sp}"`);
      return result;
    } catch (err) {
      try {
        db.exec(`ROLLBACK TO "${sp}"`);
        db.exec(`RELEASE "${sp}"`);
      } catch {}
      throw err;
    }
  }

  function runImmediate(fn: () => void): void {
    if (transactionDepth > 0) {
      runSavepoint(fn);
      return;
    }

    db.exec("BEGIN IMMEDIATE");
    transactionDepth += 1;
    try {
      fn();
      db.exec("COMMIT");
    } catch (error) {
      try {
        db.exec("ROLLBACK");
      } catch {} // The failed transaction may already have released its write lock.
      throw error;
    } finally {
      transactionDepth -= 1;
    }
  }

  function close(options?: { checkpoint?: boolean }) {
    // A repeated close is a normal path now: releaseExclusiveLock() calls it
    // again after a refusal, and a second release on a closed handle is
    // allowed.
    if (!_isOpen) return;
    // The caller supplies any checkpoint in onBeforeClose. Keeping the shared
    // adapter free of checkpoint policy lets callers select a non-blocking
    // mode appropriate to their release path.
    try {
      closeHooks.onBeforeClose?.(options);
    } catch {}
    let closeReturned = false;
    try {
      db.close();
      closeReturned = true;
    } catch {}
    // Native state wins even if close throws or returns without closing. A
    // lightweight double without this property keeps the legacy return check.
    try {
      if ("isOpen" in db) {
        if (db.isOpen !== false) return;
      } else if (!closeReturned) {
        return;
      }
    } catch {
      return;
    }
    // Only flip the flag once the driver actually closed. A caller reading
    // `open` as the witness for "the lock is released" gets the truth.
    _isOpen = false;
    // finalizeStatement guards its own driver call, so one refusing statement
    // cannot strand the rest; the cache is cleared regardless.
    for (const entry of stmtCache.values()) {
      finalizeStatement(entry.stmt);
    }
    stmtCache.clear();
    try {
      closeHooks.onClosed?.();
    } catch {}
  }

  /**
   * The driver's own state, with "could not answer" as a third value.
   *
   * A driver that exposes the property but answers with something other than a
   * boolean, or throws while reading it, leaves the handle's state unknown. The
   * boolean `open` cannot say that without throwing, so it reports "not shown
   * closed" and callers acting on a release read this instead.
   */
  function readOpenWitness(): OpenWitness {
    if (!_isOpen) return "closed";
    try {
      // Presence detection reads the driver object too: a proxy's `has` trap
      // can throw where a plain property read would not, and close() already
      // guards the same operator for the same reason.
      if (!("isOpen" in db)) return "open";
      const state: unknown = db.isOpen;
      if (state === true) return "open";
      if (state === false) return "closed";
      return "unreadable";
    } catch {
      return "unreadable";
    }
  }

  return {
    driver: "node:sqlite",
    readOpenWitness,
    get open() {
      // The interface promises a boolean and no exception; a handle the driver
      // will not describe is not evidence of closure, so it reads as open.
      return readOpenWitness() !== "closed";
    },
    get inTransaction() {
      // `DatabaseSync.isTransaction` throws ERR_INVALID_STATE once the database
      // is closed, so closure has to be checked first. After close the honest
      // answer is false: a closed handle holds no transaction. The driver's own
      // flag counts too -- a caller can close the handle it owns, and the
      // adapter's flag stays true through that.
      try {
        if (readOpenWitness() === "closed") return false;
        const state = db.isTransaction;
        // A driver that does not expose the flag, or exposes it as something
        // other than a boolean, is reported as unknown rather than false.
        // Returning false here would tell releaseExclusiveLock() it is safe to
        // close, and closing on a guess is the silent rollback it exists to
        // prevent.
        return typeof state === "boolean" ? state : undefined;
      } catch {
        // A read that throws leaves the state unknown for the same reason.
        return undefined;
      }
    },
    get name() {
      return filePath;
    },
    prepare<Row = unknown>(sql: string): PreparedStatement<Row> {
      const stmt = getCached(sql);
      return {
        run(...params: unknown[]): RunResult {
          const r = stmt.run(...normalizeBindParams(params));
          return {
            changes: Number(r.changes ?? 0),
            lastInsertRowid: Number(r.lastInsertRowid ?? 0),
          };
        },
        get(...params: unknown[]): Row | undefined {
          return toPlainRow(stmt.get(...normalizeBindParams(params))) as Row | undefined;
        },
        all(...params: unknown[]): Row[] {
          return (stmt.all(...normalizeBindParams(params)) as unknown[]).map((row) =>
            toPlainRow(row)
          ) as Row[];
        },
      };
    },
    exec(sql: string): void {
      db.exec(sql);
    },
    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      const sql = `PRAGMA ${pragmaStr}`;
      if (options?.simple) {
        const row = db.prepare(sql).get() as Record<string, unknown> | undefined;
        if (!row) return null;
        return Object.values(row)[0] ?? null;
      }
      return db.prepare(sql).all();
    },
    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => {
        transactionDepth += 1;
        try {
          return runSavepoint(fn, ...args);
        } finally {
          transactionDepth -= 1;
        }
      };
    },
    immediate(fn: () => void): void {
      runImmediate(fn);
    },
    async backup(destination: string): Promise<void> {
      const { backup } = await import("node:sqlite");
      if (typeof backup === "function") {
        await backup(db as never, destination);
        return;
      }

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
    close,
    get raw() {
      return db;
    },
  };
}
