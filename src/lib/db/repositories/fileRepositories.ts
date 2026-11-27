import type { FileRepository } from "@/domain/persistence/fileRepository";
import { sqliteFileLegacySync, sqliteFileRepository } from "./sqliteFileRepository";

export interface FileRepositories {
  files: FileRepository;
  legacySync: {
    files: typeof sqliteFileLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * The Files API, the batch processor and the batch sweep call the store
 * synchronously, so that access stays explicitly separate from the Promise
 * contract instead of pretending to be backend-neutral.
 */
export const fileRepositories: FileRepositories = {
  files: sqliteFileRepository,
  legacySync: {
    files: sqliteFileLegacySync,
  },
};
