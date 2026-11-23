export interface RunResult {
  changes: number;
  lastInsertRowid: number | bigint;
}

/**
 * A statement whose row shape is known to the caller.
 *
 * Drivers hand back untyped rows, so the generic lives here rather than on each
 * adapter: callers that know their SELECT list write `prepare<Row>(sql)` and get
 * `Row[]` back. Omitting the type argument keeps the old `unknown` behaviour.
 */
export interface PreparedStatement<Row = unknown> {
  run(...params: unknown[]): RunResult;
  get(...params: unknown[]): Row | undefined;
  all(...params: unknown[]): Row[];
}

export interface SqliteAdapter {
  readonly driver: "better-sqlite3" | "node:sqlite" | "bun:sqlite" | "sql.js";
  readonly open: boolean;
  readonly name: string;
  /** Driver transaction state when exposed by the underlying SQLite implementation. */
  readonly inTransaction?: boolean;

  prepare<Row = unknown>(sql: string): PreparedStatement<Row>;
  exec(sql: string): void;
  pragma(pragmaStr: string, options?: { simple?: boolean }): unknown;

  /** Returns a function that, when called, runs fn in a DEFERRED transaction */
  transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T;

  /** Runs fn in an IMMEDIATE transaction (acquires the write lock immediately) */
  immediate(fn: () => void): void;

  /** Native backup or file-copy fallback */
  backup(destination: string): Promise<void>;

  checkpoint(mode?: string): void;
  close(): void;

  readonly raw: unknown;
}
