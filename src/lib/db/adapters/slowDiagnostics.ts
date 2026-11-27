import { performance } from "node:perf_hooks";
import { interpretOpenFlag } from "./openFlagWitness";
import type { OpenWitness, PreparedStatement, SqliteAdapter } from "./types";

const WARN_EVERY_MS = 10_000;
type Operation =
  | "prepare"
  | "run"
  | "get"
  | "all"
  | "exec"
  | "pragma"
  | "transaction"
  | "immediate"
  | "checkpoint"
  | "close";

export function readSlowSqliteThreshold(value: string | undefined): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : null;
}

/** Opt-in synchronous-operation timing; never inspect SQL, bindings, rows or errors. */
export function instrumentSqliteAdapter(
  db: SqliteAdapter,
  options: { thresholdMs?: number | null; now?: () => number; log?: (message: string) => void } = {}
): SqliteAdapter {
  const thresholdMs =
    options.thresholdMs === undefined
      ? readSlowSqliteThreshold(process.env.OMNIROUTE_SQLITE_SLOW_MS)
      : options.thresholdMs;
  if (thresholdMs === null || !Number.isFinite(thresholdMs) || thresholdMs < 1) return db;
  const now = options.now ?? (() => performance.now());
  const log = options.log ?? ((message: string) => console.warn(message));
  let lastWarnAt = -Infinity;
  function measure<T>(operation: Operation, fn: () => T): T {
    const start = now();
    try {
      return fn();
    } finally {
      const end = now();
      const elapsedMs = end - start;
      if (elapsedMs >= thresholdMs! && end - lastWarnAt >= WARN_EVERY_MS) {
        lastWarnAt = end;
        // A diagnostic sink must never mask either a DB result or its original error.
        try {
          log(
            `[SQLITE-SLOW] driver=${db.driver} operation=${operation} elapsedMs=${Math.round(elapsedMs)}`
          );
        } catch {}
      }
    }
  }
  const readOpenWitness = (): OpenWitness => {
    // Forwarding matters: a wrapper that drops the tri-state turns an
    // unreadable driver into a plain boolean for every caller behind it.
    // A delegate that throws on the lookup or the call is unreadable, not a
    // witness, so neither may escape this boundary.
    try {
      const read = db.readOpenWitness;
      if (typeof read === "function") return read.call(db);
    } catch {
      return "unreadable";
    }
    // A delegate without the reader answers through `open`, and only an
    // exact boolean is an answer. A falsy non-boolean is not evidence that
    // the handle closed, so it stays unreadable.
    try {
      const open: unknown = db.open;
      return interpretOpenFlag(open).state;
    } catch {
      return "unreadable";
    }
  };

  return {
    get driver() {
      return db.driver;
    },
    get open() {
      // `open` is a boolean on this interface and may not throw. A delegate
      // whose read fails is not evidence of closure, so it answers open here;
      // the tri-state read is the one that can say unreadable without lying.
      return readOpenWitness() !== "closed";
    },
    readOpenWitness,
    get name() {
      return db.name;
    },
    get inTransaction() {
      return db.inTransaction;
    },
    get raw() {
      return db.raw;
    },
    prepare<Row = unknown>(sql: string): PreparedStatement<Row> {
      const stmt = measure("prepare", () => db.prepare<Row>(sql)) as PreparedStatement<Row>;
      return {
        run: (...params) => measure("run", () => stmt.run(...params)),
        get: (...params) => measure("get", () => stmt.get(...params)) as Row | undefined,
        all: (...params) => measure("all", () => stmt.all(...params)) as Row[],
      };
    },
    exec(sql) {
      measure("exec", () => db.exec(sql));
    },
    pragma(sql, opts) {
      return measure("pragma", () => db.pragma(sql, opts));
    },
    transaction(fn) {
      const tx = db.transaction(fn);
      // Preserve driver-specific transaction properties and the caller's this/arguments.
      return new Proxy(tx, {
        apply(target, thisArg, args) {
          return measure("transaction", () => Reflect.apply(target, thisArg, args));
        },
      });
    },
    immediate(fn) {
      measure("immediate", () => db.immediate(fn));
    },
    // Async elapsed time is not evidence of blocking the event loop.
    backup(destination) {
      return db.backup(destination);
    },
    checkpoint(mode) {
      measure("checkpoint", () => db.checkpoint(mode));
    },
    close(options) {
      measure("close", () => db.close(options));
    },
  };
}
