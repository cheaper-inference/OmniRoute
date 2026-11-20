/**
 * selfView.ts — the self-service quota view of one API key for one provider.
 *
 * Read-only. Lists the quota-share pools the key is allocated in for the provider and, for each
 * countable plan dimension (requests / tokens / usd), the key's share of the pool bucket with the
 * same numbers the quota gate (enforce.ts) uses:
 *   limit     = plan limit × number of pool connections
 *   fairShare = effectiveWeight / 100 × limit   (equal split when every weight in the pool is 0)
 *   consumed  = store.peek(apiKeyId, { poolId, unit, window })
 * Placeholder dimensions (limit not above Number.EPSILON) are skipped, as the gate skips them.
 *
 * A failed quota-store read is reported as `status: "unavailable"` with `consumed`/`remaining`
 * null, never as zero. Database reads (allocations, pools) are not caught: a failure there
 * propagates to the caller instead of being reported as "no pools".
 *
 * The result goes through selfQuotaResponseSchema.parse(), so no pool id, connection id or
 * account identity leaves this module. The builder reads no request, header or environment
 * variable: the pool-ref secret comes in through `deps.secret`.
 */

import { hasSelfAccountQuotaScope, hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import {
  selfQuotaResponseSchema,
  type SelfQuotaPool,
  type SelfQuotaResponse,
  type SelfQuotaShare,
  type SelfQuotaSharedDimension,
} from "@/shared/schemas/selfQuota";
import { isProviderShared } from "@/lib/usage/apiKeySelfServiceAccounts";
import type { PoolAllocation, QuotaPool } from "@/lib/db/quotaPools";
import { PolicySchema, type Policy, type QuotaDimension } from "./dimensions";
import { buildPoolRef } from "./selfPoolRef";
import type { QuotaSelfViewDeps, QuotaSelfViewInput, SelfViewPoolContext } from "./selfViewTypes";
import type { QuotaStore } from "./types";

type ViewStore = Pick<QuotaStore, "peek" | "poolConsumedTotal">;
type CountableUnit = SelfQuotaSharedDimension["unit"];
type CountableDimension = QuotaDimension & { unit: CountableUnit };

type CoreDeps = Required<
  Pick<
    QuotaSelfViewDeps,
    | "now"
    | "listAllocationsForApiKey"
    | "getPool"
    | "resolveConnectionProvider"
    | "resolvePlan"
    | "getQuotaStore"
  >
> & { secret: string };

const COUNTABLE_UNITS: ReadonlySet<string> = new Set<CountableUnit>(["requests", "tokens", "usd"]);
const CLAUDE_FAMILY: ReadonlySet<string> = new Set(["claude", "anthropic"]);
const UNKNOWN_PROVIDER = "unknown";
const STORE_UNAVAILABLE = "store_unavailable";

const DEFAULT_DEPS_LOADERS: Array<{
  keys: Array<keyof CoreDeps>;
  load: () => Promise<Partial<CoreDeps>>;
}> = [
  {
    keys: ["listAllocationsForApiKey", "getPool"],
    load: async () => {
      const m = await import("@/lib/db/quotaPools");
      return { listAllocationsForApiKey: m.listAllocationsForApiKey, getPool: m.getPool };
    },
  },
  {
    keys: ["resolveConnectionProvider"],
    load: async () => ({
      resolveConnectionProvider: (await import("./connectionProvider")).resolveConnectionProvider,
    }),
  },
  {
    keys: ["resolvePlan"],
    load: async () => {
      const { resolvePlan } = await import("./planResolver");
      return { resolvePlan: (connectionId, provider) => resolvePlan(connectionId, provider) };
    },
  },
  {
    keys: ["getQuotaStore"],
    load: async () => ({ getQuotaStore: (await import("./QuotaStore")).getQuotaStore }),
  },
];

async function normalizeDeps(deps: QuotaSelfViewDeps): Promise<CoreDeps> {
  if (!deps.secret) throw new Error("missing_pool_ref_secret");
  const resolved: Partial<CoreDeps> = { now: Date.now };
  for (const loader of DEFAULT_DEPS_LOADERS) {
    if (loader.keys.some((key) => deps[key] === undefined)) {
      Object.assign(resolved, await loader.load());
    }
  }
  for (const [key, value] of Object.entries(deps)) {
    if (value !== undefined) (resolved as Record<string, unknown>)[key] = value;
  }
  return resolved as CoreDeps;
}

/** Same provider, or both in the claude/anthropic family (as saturationSignals treats them). */
function sameProviderFamily(a: string, b: string): boolean {
  return a === b || (CLAUDE_FAMILY.has(a) && CLAUDE_FAMILY.has(b));
}

/** The weight the gate applies: the key's own, or an equal split when all weights are 0. */
function gateEffectiveWeight(pool: QuotaPool, allocation: PoolAllocation): number {
  const allocations = Array.isArray(pool.allocations) ? pool.allocations : [];
  const totalWeight = allocations.reduce(
    (sum, a) => sum + (Number.isFinite(a.weight) ? a.weight : 0),
    0
  );
  if (totalWeight > 0) return allocation.weight;
  return allocations.length > 0 ? 100 / allocations.length : 0;
}

async function resolvePoolContext(
  input: QuotaSelfViewInput,
  deps: CoreDeps,
  poolId: string,
  allocation: PoolAllocation
): Promise<SelfViewPoolContext | null> {
  const pool = deps.getPool(poolId);
  if (!pool) return null;

  const connectionProvider = await deps.resolveConnectionProvider(pool.connectionId);
  const plan = deps.resolvePlan(pool.connectionId, connectionProvider);
  const provider = String(
    connectionProvider !== UNKNOWN_PROVIDER ? connectionProvider : plan.provider
  ).toLowerCase();
  if (!provider || provider === UNKNOWN_PROVIDER) return null;
  if (!sameProviderFamily(provider, input.provider)) return null;

  return {
    pool,
    allocation,
    provider,
    ref: buildPoolRef(input.apiKeyId, pool.id, deps.secret),
    plan,
    effectiveWeight: gateEffectiveWeight(pool, allocation),
    connectionIds: pool.connectionIds?.length ? pool.connectionIds : [pool.connectionId],
    accountVisible:
      hasSelfAccountQuotaScope(input.scopes) &&
      isProviderShared(provider, input.sharedQuotaProviders),
  };
}

/** The key's pools for the provider, in creation order (then name). */
async function resolvePoolContexts(
  input: QuotaSelfViewInput,
  deps: CoreDeps
): Promise<SelfViewPoolContext[]> {
  const contexts: SelfViewPoolContext[] = [];
  const seen = new Set<string>();
  for (const { poolId, allocation } of deps.listAllocationsForApiKey(input.apiKeyId)) {
    if (seen.has(poolId)) continue;
    seen.add(poolId);
    const context = await resolvePoolContext(input, deps, poolId, allocation);
    if (context) contexts.push(context);
  }
  return contexts.sort(
    (a, b) =>
      compareText(a.pool.createdAt, b.pool.createdAt) || compareText(a.pool.name, b.pool.name)
  );
}

function compareText(a: string | undefined, b: string | undefined): number {
  const left = a ?? "";
  const right = b ?? "";
  return left < right ? -1 : left > right ? 1 : 0;
}

async function loadStore(deps: CoreDeps): Promise<ViewStore | null> {
  try {
    return await deps.getQuotaStore();
  } catch {
    return null;
  }
}

/** A store read as a number, or null when the store is missing, throws or returns non-finite. */
async function readStore(read: (() => Promise<number>) | null): Promise<number | null> {
  if (!read) return null;
  try {
    const value = await read();
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function isCountableDimension(dim: QuotaDimension): dim is CountableDimension {
  return COUNTABLE_UNITS.has(dim.unit) && dim.limit > Number.EPSILON;
}

async function buildSharedDimension(
  ctx: SelfViewPoolContext,
  dim: CountableDimension,
  store: ViewStore | null,
  apiKeyId: string
): Promise<SelfQuotaSharedDimension> {
  const limit = dim.limit * ctx.connectionIds.length;
  const fairShare = (ctx.effectiveWeight / 100) * limit;
  const key = { poolId: ctx.pool.id, unit: dim.unit, window: dim.window };

  const consumed = await readStore(store ? () => store.peek(apiKeyId, key) : null);
  const yourShare: SelfQuotaShare =
    consumed === null
      ? {
          fairShare,
          consumed: null,
          remaining: null,
          status: "unavailable",
          reason: STORE_UNAVAILABLE,
        }
      : { fairShare, consumed, remaining: Math.max(0, fairShare - consumed), status: "ok" };

  const dimension: SelfQuotaSharedDimension = {
    unit: dim.unit,
    window: dim.window,
    limit,
    yourShare,
  };
  if (ctx.accountVisible) {
    const used = await readStore(store ? () => store.poolConsumedTotal(ctx.pool.id, key) : null);
    dimension.total =
      used === null
        ? { used: null, status: "unavailable", reason: STORE_UNAVAILABLE }
        : { used, status: "ok" };
  }
  return dimension;
}

/** Unknown policies are reported as "hard", the policy the fair-share engine applies to them. */
function gatePolicy(policy: Policy): Policy {
  return PolicySchema.safeParse(policy).success ? policy : "hard";
}

function allocationCap(allocation: PoolAllocation): SelfQuotaPool["cap"] {
  const { capUnit, capValue } = allocation;
  if (capUnit === undefined || capValue === undefined || !Number.isFinite(capValue)) return null;
  return { unit: capUnit, value: capValue };
}

async function buildPoolView(
  ctx: SelfViewPoolContext,
  store: ViewStore | null,
  apiKeyId: string
): Promise<SelfQuotaPool> {
  const dimensions: SelfQuotaSharedDimension[] = [];
  for (const dim of ctx.plan.dimensions ?? []) {
    if (!isCountableDimension(dim)) continue;
    dimensions.push(await buildSharedDimension(ctx, dim, store, apiKeyId));
  }
  return {
    ref: ctx.ref,
    name: ctx.pool.name,
    provider: ctx.provider,
    borrowMode: "saturation",
    policy: gatePolicy(ctx.allocation.policy),
    weight: ctx.effectiveWeight,
    cap: allocationCap(ctx.allocation),
    accountVisible: ctx.accountVisible,
    dimensions,
    accounts: [],
  };
}

/**
 * Build the self-service quota view of `input.apiKeyId` for `input.provider`.
 * Throws `missing_self_usage_scope` when the key lacks self:usage and `missing_pool_ref_secret`
 * when `deps.secret` is empty.
 */
export async function buildQuotaSelfView(
  input: QuotaSelfViewInput,
  rawDeps: QuotaSelfViewDeps = {}
): Promise<SelfQuotaResponse> {
  if (!hasSelfUsageScope(input.scopes)) throw new Error("missing_self_usage_scope");
  const deps = await normalizeDeps(rawDeps);

  const contexts = await resolvePoolContexts(input, deps);
  const store = contexts.length > 0 ? await loadStore(deps) : null;
  const pools: SelfQuotaPool[] = [];
  for (const ctx of contexts) {
    pools.push(await buildPoolView(ctx, store, input.apiKeyId));
  }

  return selfQuotaResponseSchema.parse({
    provider: input.provider,
    generatedAt: new Date(deps.now()).toISOString(),
    pools,
    availableModels: [],
    expiresAt: input.expiresAt,
    apiBaseUrl: null,
    blocks: { schedules: [], modelCaps: [] },
  });
}
