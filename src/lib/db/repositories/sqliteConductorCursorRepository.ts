/**
 * SQLite implementation for the conductor SSE cursor in `key_value`
 * (namespace `conductor`, key `last_event_id`).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text and JSON encoding are unchanged from the original
 * `conductorBridge.ts`; only JSON parsing errors are swallowed, a failing
 * database read still throws. Resolve the database at call time.
 */
import type { ConductorCursorRepository } from "@/domain/persistence/localToolStateRepositories";
import { getDbInstance } from "../core";

const NAMESPACE = "conductor";
const CURSOR_KEY = "last_event_id";

function getCursorSync(): string | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, CURSOR_KEY) as { value: string } | undefined;
  if (!row) return null;
  try {
    const parsed = JSON.parse(row.value);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function setCursorSync(value: string): void {
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    CURSOR_KEY,
    JSON.stringify(value)
  );
}

export const sqliteConductorCursorRepository: ConductorCursorRepository = {
  async get() {
    return getCursorSync();
  },
  async set(value) {
    setCursorSync(value);
  },
};

/**
 * SQLite-only synchronous access retained for the conductor boot code, which
 * hands these to the SSE bridge as synchronous cursor callbacks.
 */
export const sqliteConductorCursorLegacySync = {
  get: getCursorSync,
  set: setCursorSync,
};
