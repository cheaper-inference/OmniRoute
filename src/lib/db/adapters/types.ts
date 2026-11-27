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

/**
 * What the driver said about the handle, including that it could not say.
 *
 * `open` is a boolean by contract and never throws, so it cannot carry "the
 * read failed". That answer lives here, and a caller about to act on "closed"
 * -- releasing a lock, for instance -- reads this rather than the boolean.
 */
export type OpenWitness = "open" | "closed" | "unreadable";

export interface SqliteAdapter {
  readonly driver: "better-sqlite3" | "node:sqlite" | "bun:sqlite" | "sql.js";
  /**
   * Whether the handle is open. Never throws: a driver that will not answer
   * reads as open, because an unreadable state is not evidence of closure.
   */
  readonly open: boolean;
  /**
   * Tri-state read of the same state, for callers that must not treat an
   * unreadable driver as either an open or a closed handle.
   *
   * Optional: adapters that only track their own close flag answer through
   * `open`, and callers fall back to it when this is absent.
   */
  readOpenWitness?(): OpenWitness;
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
  /** Fecha o handle. Só o adaptador construído por `createNodeSqliteAdapter`
   *  faz checkpoint antes de fechar; nele, `checkpoint: false` pula esse
   *  TRUNCATE, que é o que o caminho de liberação do lock exclusivo pede. Os
   *  demais, inclusive um `node:sqlite` sem hooks, ignoram a opção. */
  close(options?: { checkpoint?: boolean }): void;

  readonly raw: unknown;
}
