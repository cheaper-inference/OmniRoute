import type { StartupSecretRepository } from "@/domain/persistence/startupSecretRepository";
import { startupSecretRepositories } from "./repositories/startupSecretRepositories";

/**
 * Persistence lives behind StartupSecretRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because startup restores the secrets
 * into process.env without awaiting, and they keep the existing fallback: any
 * storage or decoding failure reads as "no persisted secret" and a failed write
 * is ignored.
 */
const legacy = startupSecretRepositories.legacySync;

/** Async persistence contract. */
export function getStartupSecretRepository(): StartupSecretRepository {
  return startupSecretRepositories.secrets;
}

export function getPersistedSecret(key: string): string | null {
  try {
    return legacy.find(key);
  } catch {
    return null;
  }
}

export function persistSecret(key: string, value: string): void {
  try {
    legacy.insertIfAbsent(key, value);
  } catch {
    // Non-fatal: secrets still work for the current process if persistence fails.
  }
}
