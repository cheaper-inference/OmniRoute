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

  /** Retorna uma função que quando chamada executa fn em uma transação DEFERRED */
  transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T;

  /** Executa fn em uma transação IMMEDIATE (adquire write lock imediatamente) */
  immediate(fn: () => void): void;

  /** Backup nativo ou file-copy fallback */
  backup(destination: string): Promise<void>;

  checkpoint(mode?: string): void;
  close(): void;

  readonly raw: unknown;
}
