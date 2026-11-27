import type { SqliteAdapter } from "./types";
import {
  createNodeSqliteAdapterFromDatabase,
  type NodeSqliteAdapterCloseHooks,
  type NodeSqliteDatabaseLike,
} from "./nodeSqliteShared";

const CHECKPOINT_INTERVAL_MS = 60_000;

export async function createNodeSqliteAdapter(filePath: string): Promise<SqliteAdapter> {
  // Suprimir ExperimentalWarning
  const origEmit = process.emit.bind(process);
  (process as NodeJS.Process).emit = function (name: string, ...args: unknown[]) {
    if (
      name === "warning" &&
      args[0] !== null &&
      typeof args[0] === "object" &&
      "name" in (args[0] as object) &&
      (args[0] as { name: string }).name === "ExperimentalWarning"
    ) {
      return false;
    }
    return origEmit(name as never, ...(args as never[]));
  } as typeof process.emit;

  const { DatabaseSync } = (await import("node:sqlite" as never)) as {
    DatabaseSync: new (path: string) => NodeSqliteDatabaseLike;
  };

  const db = new DatabaseSync(filePath);

  const checkpointTimer = setInterval(() => {
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    } catch {}
  }, CHECKPOINT_INTERVAL_MS);
  (checkpointTimer as unknown as NodeJS.Timeout).unref?.();

  // Declared before closeHooks so successful close can detach them. Without
  // this, every closed adapter leaves three closures pinned on `process` --
  // each holding this adapter and its DatabaseSync handle alive -- and short-
  // lived adapters (POST /api/db-backups/import opens one per request) trip
  // Node's MaxListenersExceededWarning. #7494 fixed exactly this for sql.js.
  const onBeforeExit = () => {
    adapter.close();
  };
  const onSignal = () => {
    adapter.close();
    process.exit(0);
  };

  const closeHooks: NodeSqliteAdapterCloseHooks = {
    onBeforeClose: (options) => {
      // The release path closes to drop an EXCLUSIVE lock and must not run a
      // checkpoint first; an ordinary close keeps trimming the WAL.
      if (options?.checkpoint === false) return;
      try {
        db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
      } catch {}
    },
    onClosed: () => {
      clearInterval(checkpointTimer as unknown as NodeJS.Timeout);
      process.removeListener("beforeExit", onBeforeExit);
      process.removeListener("SIGINT", onSignal);
      process.removeListener("SIGTERM", onSignal);
    },
  };

  const adapter = createNodeSqliteAdapterFromDatabase(db, filePath, closeHooks);

  process.once("beforeExit", onBeforeExit);
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);

  return adapter;
}
