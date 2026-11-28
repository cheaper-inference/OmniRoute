/**
 * Conductor bridge persistence — SSE cursor (`last_event_id`) for the hub mirror.
 *
 * Uses the existing `key_value` table under a dedicated namespace (no migration
 * needed — same pattern as settings.ts). The cursor lets the bridge resume the
 * hub SSE from where it stopped; the hub replay covers the gap.
 *
 * Persistence lives in `repositories/sqliteConductorCursorRepository.ts`. These
 * exports stay synchronous (SQLite-only legacy access) because the conductor
 * boot code passes them to the bridge as synchronous cursor callbacks.
 */

import type { ConductorCursorRepository } from "@/domain/persistence/localToolStateRepositories";
import { localToolStateRepositories } from "./repositories/localToolStateRepositories";

const conductorCursor = localToolStateRepositories.legacySync.conductorCursor;

/** Async persistence contract for the conductor SSE cursor. */
export function getConductorCursorRepository(): ConductorCursorRepository {
  return localToolStateRepositories.conductorCursor;
}

export function getConductorCursor(): string | null {
  return conductorCursor.get();
}

export function setConductorCursor(value: string): void {
  conductorCursor.set(value);
}
