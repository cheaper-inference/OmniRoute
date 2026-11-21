/**
 * db/autoCandidateOverrides.ts — Per-API-key candidate exclusions for `auto/*`
 * channels (#7819, Level 2 of the "per-user candidate control" feature).
 *
 * OmniRoute is single-tenant (no `users` table, no `user_id`/`userId` column
 * anywhere under `src/lib/db/`) — `apiKeyId` is the closest real per-caller
 * identity this app has, so overrides are keyed by (apiKeyId, autoChannel,
 * connectionId) rather than "per user". See the Open Question in the #7819
 * plan for the follow-up decision on whether this should instead be global.
 *
 * Exclusions are a simple row-per-candidate set. Persistence lives behind the
 * Promise-based AutoCandidateOverrideRepository; these exports delegate to it.
 */
import type {
  AutoCandidateOverride,
  AutoCandidateOverrideRepository,
} from "@/domain/persistence/modelOverrideRepositories";
import { modelOverrideRepositories } from "./repositories/modelOverrideRepositories";

export type { AutoCandidateOverride } from "@/domain/persistence/modelOverrideRepositories";

/** Route- and service-facing async persistence contract. */
export function getAutoCandidateOverrideRepository(): AutoCandidateOverrideRepository {
  return modelOverrideRepositories.autoCandidates;
}

/**
 * Returns the set of connection IDs excluded by this API key for this auto
 * channel. Empty set when no overrides exist (the default, unconfigured
 * path) — callers should treat an empty set as "no filtering needed" rather
 * than iterating a lookup for every candidate.
 */
export async function getExcludedConnectionIds(
  apiKeyId: string,
  autoChannel: string
): Promise<Set<string>> {
  return modelOverrideRepositories.autoCandidates.listExcludedConnectionIds(apiKeyId, autoChannel);
}

/**
 * Sets (or clears) the excluded flag for one candidate connection, scoped to
 * one API key + auto channel. Idempotent — re-setting the same value is a
 * no-op write via UPSERT.
 */
export async function setExcluded(
  apiKeyId: string,
  autoChannel: string,
  connectionId: string,
  excluded: boolean
): Promise<AutoCandidateOverride> {
  return modelOverrideRepositories.autoCandidates.setExcluded(
    apiKeyId,
    autoChannel,
    connectionId,
    excluded
  );
}

/** Lists all override rows for one API key + auto channel (excluded and not). */
export async function listOverrides(
  apiKeyId: string,
  autoChannel: string
): Promise<AutoCandidateOverride[]> {
  return modelOverrideRepositories.autoCandidates.list(apiKeyId, autoChannel);
}
