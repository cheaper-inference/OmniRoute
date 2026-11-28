/**
 * SQLite implementation for the local corpus root in `key_value`
 * (namespace `local_corpus`, key `root_path`).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text, JSON encoding and the catch-all read (any failure,
 * including a failing database, reads as "not configured") are unchanged from
 * the original `localCorpus.ts`. Resolve the database at call time.
 */
import type { LocalCorpusRootRepository } from "@/domain/persistence/localToolStateRepositories";
import { getDbInstance } from "../core";

const LOCAL_CORPUS_NAMESPACE = "local_corpus";
const LOCAL_CORPUS_ROOT_KEY = "root_path";

type KeyValueRow = {
  value?: string;
};

function getRootSync(): string | null {
  try {
    const row = getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(LOCAL_CORPUS_NAMESPACE, LOCAL_CORPUS_ROOT_KEY) as KeyValueRow | undefined;
    if (typeof row?.value !== "string") return null;
    const parsed = JSON.parse(row.value);
    return typeof parsed === "string" && parsed.trim() ? parsed : null;
  } catch {
    return null;
  }
}

function setRootSync(rootPath: string): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(LOCAL_CORPUS_NAMESPACE, LOCAL_CORPUS_ROOT_KEY, JSON.stringify(rootPath));
}

function clearRootSync(): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(LOCAL_CORPUS_NAMESPACE, LOCAL_CORPUS_ROOT_KEY);
}

export const sqliteLocalCorpusRootRepository: LocalCorpusRootRepository = {
  async get() {
    return getRootSync();
  },
  async set(rootPath) {
    setRootSync(rootPath);
  },
  async clear() {
    clearRootSync();
  },
};

/**
 * SQLite-only synchronous access retained for the local-corpus settings route
 * and the configured-index loader, which read and write the root synchronously.
 */
export const sqliteLocalCorpusRootLegacySync = {
  get: getRootSync,
  set: setRootSync,
  clear: clearRootSync,
};
