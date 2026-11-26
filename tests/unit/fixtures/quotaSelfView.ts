/**
 * Test factories for the self-service quota view builders (selfView and its sibling modules).
 * Stubs only: nothing here touches a database, the network or the environment.
 */

import type { PoolAllocation, QuotaPool } from "../../../src/lib/db/quotaPools.ts";
import type { ProviderPlan } from "../../../src/lib/quota/dimensions.ts";
import type {
  QuotaSelfViewDeps,
  QuotaSelfViewInput,
  SelfViewPoolContext,
} from "../../../src/lib/quota/selfViewTypes.ts";
import type { QuotaStore } from "../../../src/lib/quota/types.ts";
import {
  SELF_ACCOUNT_QUOTA_SCOPE,
  SELF_USAGE_SCOPE,
} from "../../../src/shared/constants/selfServiceScopes.ts";

export const TEST_POOL_REF_SECRET = "test-pool-ref-secret-0123456789abcdef";

export const BOTH = [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE];

export function input(over: Partial<QuotaSelfViewInput> = {}): QuotaSelfViewInput {
  return {
    apiKeyId: "key-a",
    scopes: [SELF_USAGE_SCOPE],
    allowedQuotas: [],
    expiresAt: null,
    sharedQuotaProviders: null,
    provider: "claude",
    ...over,
  };
}

/** `extra` adds fields such as the lending consent (`lendingPercent`, `lendingUntil`) or a policy. */
export function alloc(
  apiKeyId: string,
  weight: number,
  extra: Partial<Omit<PoolAllocation, "apiKeyId" | "weight">> = {}
): PoolAllocation {
  return { apiKeyId, weight, policy: "hard", ...extra };
}

type LooseDimension = { unit: string; window: string; limit: number };

export type MakeDepsOverrides = Partial<QuotaSelfViewDeps> & {
  /** Merged into every pool. */
  pool?: Partial<QuotaPool>;
  /** Merged into the plan of every pool. */
  plan?: Partial<Omit<ProviderPlan, "dimensions">> & { dimensions?: LooseDimension[] };
  /** Merged into the quota store stub. */
  store?: Partial<Pick<QuotaStore, "peek" | "poolConsumedTotal" | "ledgerRead">>;
};

const CONNECTION_PROVIDERS: Record<string, string> = {
  "conn-secret-1": "claude",
  "conn-secret-3": "codex",
};

function basePools(): QuotaPool[] {
  const pool = (id: string, name: string, connectionId: string, createdAt: string): QuotaPool => ({
    id,
    connectionId,
    connectionIds: [connectionId],
    name,
    groupId: `group-${id}`,
    createdAt,
    allocations: [alloc("key-a", 50), alloc("key-b", 50)],
  });
  return [
    // Listed out of creation order on purpose: the view sorts by createdAt, then name.
    pool("pool-b-id", "Pool B", "conn-secret-1", "2026-01-02T00:00:00.000Z"),
    pool("pool-codex-id", "Pool C", "conn-secret-3", "2026-01-01T12:00:00.000Z"),
    pool("pool-a-id", "Pool A", "conn-secret-1", "2026-01-01T00:00:00.000Z"),
  ];
}

/**
 * Two claude pools ("Pool A", "Pool B") the key is allocated in, plus one codex pool. The codex
 * pool is allocated to other keys by default, so a pool override that changes `allocations`
 * also places "key-a" in it.
 */
export function makeDeps(over: MakeDepsOverrides = {}): QuotaSelfViewDeps {
  const { pool: poolOver, plan: planOver, store: storeOver, ...rest } = over;
  const pools = basePools().map((p) =>
    p.id === "pool-codex-id" && !poolOver?.allocations
      ? { ...p, allocations: [alloc("key-b", 50), alloc("key-c", 50)], ...poolOver }
      : { ...p, ...poolOver }
  );
  const store: Pick<QuotaStore, "peek" | "poolConsumedTotal"> &
    Partial<Pick<QuotaStore, "ledgerRead">> = {
    peek: async () => 120,
    poolConsumedTotal: async () => 400,
    ...storeOver,
  };
  return {
    now: () => Date.parse("2026-05-27T15:30:00.000Z"),
    secret: TEST_POOL_REF_SECRET,
    listAllocationsForApiKey: (apiKeyId) =>
      pools.flatMap((p) =>
        p.allocations
          .filter((a) => a.apiKeyId === apiKeyId)
          .map((allocation) => ({ poolId: p.id, allocation }))
      ),
    getPool: (poolId) => pools.find((p) => p.id === poolId) ?? null,
    resolveConnectionProvider: async (connectionId) =>
      CONNECTION_PROVIDERS[connectionId] ?? "unknown",
    resolvePlan: (connectionId, provider) =>
      ({
        connectionId,
        provider,
        dimensions: [{ unit: "tokens", window: "daily", limit: 1000 }],
        source: "manual",
        ...planOver,
      }) as ProviderPlan,
    getQuotaStore: async () => store,
    // No account data by default, so no test reaches the real provider-limits modules.
    resolveAccountQuotaEntries: async () => [],
    // No schedules, caps or models by default, so no test opens the database through them.
    listEnabledSchedules: () => [],
    listModelCapsForApiKey: () => [],
    listQuotaKeyModels: async () => [],
    // No public API origin by default, so no test depends on the environment.
    resolvePublicApiBaseUrl: () => null,
    // No cached plan-window reading by default, so no test depends on the gate's cache.
    peekPlanWindowReading: () => null,
    // Member usage slices off by default, as for a pool the admin never changed.
    getPoolMemberBreakdown: () => false,
    // Every allocated key can make requests by default.
    countUsablePoolKeys: (poolId) =>
      new Set(pools.find((p) => p.id === poolId)?.allocations.map((a) => a.apiKeyId)).size,
    ...rest,
  };
}

export const PERCENT_PLAN = {
  connectionId: "conn-secret-1",
  provider: "claude",
  dimensions: [
    { unit: "percent", window: "5h", limit: 100 },
    { unit: "percent", window: "weekly", limit: 100 },
  ],
  source: "auto",
} as ProviderPlan;

/** By default the key may see the account data of every pool connection when visible. */
export function ctx(over: Partial<SelfViewPoolContext> = {}): SelfViewPoolContext {
  const pool = basePools().find((p) => p.id === "pool-a-id") as QuotaPool;
  const merged = {
    pool,
    allocation: pool.allocations[0],
    provider: "claude",
    ref: "qpr_testPoolARef0000000",
    plan: PERCENT_PLAN,
    effectiveWeight: 50,
    connectionIds: ["conn-secret-1"],
    accountVisible: true,
    memberBreakdown: false,
    usableMemberCount: 0,
    ...over,
  };
  return {
    ...merged,
    accountConnectionIds:
      over.accountConnectionIds ?? (merged.accountVisible ? merged.connectionIds : []),
  };
}
