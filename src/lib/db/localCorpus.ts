/**
 * Local corpus root persistence (`key_value`, namespace `local_corpus`).
 *
 * Persistence lives in `repositories/sqliteLocalCorpusRootRepository.ts`. These
 * exports stay synchronous (SQLite-only legacy access) because the
 * local-corpus settings route and the configured-index loader call them
 * synchronously.
 */

import type { LocalCorpusRootRepository } from "@/domain/persistence/localToolStateRepositories";
import { localToolStateRepositories } from "./repositories/localToolStateRepositories";

export interface LocalCorpusConfig {
  rootPath: string | null;
  configured: boolean;
}

const localCorpusRoot = localToolStateRepositories.legacySync.localCorpusRoot;

/** Async persistence contract for the local corpus root. */
export function getLocalCorpusRootRepository(): LocalCorpusRootRepository {
  return localToolStateRepositories.localCorpusRoot;
}

export function getLocalCorpusRoot(): string | null {
  return localCorpusRoot.get();
}

export function setLocalCorpusRoot(rootPath: string): void {
  localCorpusRoot.set(rootPath);
}

export function clearLocalCorpusRoot(): void {
  localCorpusRoot.clear();
}

export function getLocalCorpusConfig(): LocalCorpusConfig {
  const rootPath = getLocalCorpusRoot();
  return { rootPath, configured: rootPath !== null };
}
