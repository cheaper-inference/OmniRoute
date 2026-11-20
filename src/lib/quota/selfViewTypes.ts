/**
 * Types shared by the self-service quota view builders (selfView.ts and its sibling modules).
 *
 * Kept in a types-only module so the builders can share them without importing each other.
 */

import type { PoolAllocation, QuotaPool } from "@/lib/db/quotaPools";
import type { ModelCap } from "@/lib/db/quotaModelCaps";
import type { ProviderPlan } from "./dimensions";
import type { QuotaSchedule } from "./schedules";
import type { QuotaStore } from "./types";

/** One entry of resolveAccountQuotaEntries, reduced to the fields the view reads. */
export interface AccountQuotaEntryLike {
  connectionId: string;
  available?: false;
  reason?: string;
  stale?: boolean;
  quotas?: Record<
    string,
    { usedPercentage: number; remainingPercentage: number; resetAt: string | null }
  >;
}

export interface QuotaSelfViewInput {
  apiKeyId: string;
  scopes: string[];
  allowedQuotas: string[];
  expiresAt: string | null;
  sharedQuotaProviders: string[] | null;
  /** Lowercased provider id from the request path. */
  provider: string;
}

/**
 * Dependencies of buildQuotaSelfView. Every data source is injectable; omitted ones are loaded
 * with dynamic import(). `secret` (the server secret used for pool refs) has no default: the
 * caller passes it, so the builder never reads the environment.
 */
export interface QuotaSelfViewDeps {
  now?: () => number;
  secret?: string;
  listAllocationsForApiKey?: (
    apiKeyId: string
  ) => Array<{ poolId: string; allocation: PoolAllocation }>;
  getPool?: (poolId: string) => QuotaPool | null;
  resolveConnectionProvider?: (connectionId: string) => Promise<string>;
  resolvePlan?: (connectionId: string, provider: string) => ProviderPlan;
  getQuotaStore?: () => Promise<Pick<QuotaStore, "peek" | "poolConsumedTotal">>;
  resolveAccountQuotaEntries?: (m: {
    allowedConnections: string[];
    sharedQuotaProviders: string[] | null;
  }) => Promise<AccountQuotaEntryLike[]>;
  listEnabledSchedules?: (poolId: string) => QuotaSchedule[];
  listModelCapsForApiKey?: (poolId: string, apiKeyId: string) => ModelCap[];
  listQuotaKeyModels?: (allowedQuotas: string[]) => Promise<string[]>;
  resolvePublicApiBaseUrl?: () => string | null;
}

/** A pool the key is allocated in, resolved for one provider. Internal ids stay here. */
export interface SelfViewPoolContext {
  pool: QuotaPool;
  allocation: PoolAllocation;
  provider: string;
  ref: string;
  plan: ProviderPlan;
  /** The weight the quota gate applies (equal split when every weight in the pool is 0). */
  effectiveWeight: number;
  connectionIds: string[];
  accountVisible: boolean;
}
