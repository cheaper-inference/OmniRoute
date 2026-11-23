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
 * Each pool reports its borrow mode and the key's own lending consent. In a consent pool each
 * countable dimension also reports `borrowAvailable`, the aggregate other keys lend to this key
 * (selfViewLending.ts).
 *
 * `accounts[]` (selfViewAccounts.ts) lists one neutral entry per pool connection with the
 * `percent` dimensions. Account-level readings come from resolveAccountQuotaEntries (the cached
 * provider-limits snapshot behind /v1/me/status, sharing its refresh tracker and 60 s floor), and
 * are asked for only when the pool's `accountVisible` is true, only for the pool's own non-empty
 * connection ids, and never with an empty list (which would mean every active connection).
 * The key's part of each percent window comes from selfViewPercent.ts, which reads the
 * attribution books and the gate's cached readings without writing a book or calling a provider.
 *
 * `blocks` (selfViewBlocks.ts) lists the schedule windows and per-model caps the key is under,
 * each naming its pool only by `ref`. `availableModels` is the list of `qtSd/` model ids the key
 * would see in /v1/models (listQuotaKeyModels; a failed lookup is an empty list) and `expiresAt`
 * is the key's own expiry, passed in by the caller. `apiBaseUrl` is the configured public API
 * origin (resolvePublicApiBaseUrl), never the request's origin.
 *
 * A failed quota-store read is reported as `status: "unavailable"` with `consumed`/`remaining`
 * null, never as zero. Database reads of allocations and pools are not caught: a failure there
 * propagates to the caller instead of being reported as "no pools". The connection-provider and
 * plan lookups handle their own errors and answer "unknown"; a pool whose provider cannot be
 * resolved that way is left out of the answer.
 *
 * The result goes through selfQuotaResponseSchema.parse(), so no pool id, connection id or
 * account identity leaves this module. The builder reads no request or header, and no
 * environment variable itself: the pool-ref secret comes in through `deps.secret`, and the
 * default `resolvePublicApiBaseUrl` reads only the two public-origin variables it documents.
 */

import { hasSelfAccountQuotaScope, hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import { createLogger } from "@/shared/utils/logger";
import {
  selfQuotaResponseSchema,
  type SelfQuotaPool,
  type SelfQuotaResponse,
  type SelfQuotaShare,
  type SelfQuotaSharedDimension,
} from "@/shared/schemas/selfQuota";
import {
  defaultQuotaRefreshTracker,
  isProviderShared,
  resolveAccountQuotaEntries,
} from "@/lib/usage/apiKeySelfServiceAccounts";
import type { PoolAllocation, QuotaPool } from "@/lib/db/quotaPools";
import { effectiveWeights } from "./consentBorrow";
import { PolicySchema, type Policy, type QuotaDimension } from "./dimensions";
import { buildPoolRef } from "./selfPoolRef";
import { buildSelfViewAccounts } from "./selfViewAccounts";
import { buildSelfViewBlocks } from "./selfViewBlocks";
import { selfBorrowAvailable, selfLendingFields } from "./selfViewLending";
import { attachCountableMembers, readMemberBreakdown } from "./selfViewMembers";
import { readPercentShares } from "./selfViewPercent";
import { loadViewStore, readViewStore, type ViewStore } from "./selfViewStore";
import type {
  AccountQuotaEntryLike,
  QuotaSelfViewDeps,
  QuotaSelfViewInput,
  SelfViewPoolContext,
} from "./selfViewTypes";

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
    | "resolveAccountQuotaEntries"
    | "listEnabledSchedules"
    | "listModelCapsForApiKey"
    | "listQuotaKeyModels"
    | "resolvePublicApiBaseUrl"
    | "peekPlanWindowReading"
    | "getPoolMemberBreakdown"
    | "countUsablePoolKeys"
  >
> & { secret: string };

const log = createLogger("quota:self-view");

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
  {
    // Same sources and process-wide refresh tracker as /v1/me/status, so the 60 s refresh
    // floor per connection holds across both routes. Only this view asks for the model-scoped
    // windows, which feed `modelWindows`.
    keys: ["resolveAccountQuotaEntries"],
    load: async () => {
      const [providers, limitsCache, limits] = await Promise.all([
        import("@/lib/db/providers"),
        import("@/lib/db/providerLimits"),
        import("@/lib/usage/providerLimits"),
      ]);
      return {
        resolveAccountQuotaEntries: (metadata) =>
          resolveAccountQuotaEntries(
            metadata,
            {
              now: Date.now,
              getProviderConnectionById: providers.getProviderConnectionById,
              getProviderConnections: providers.getProviderConnections,
              getProviderLimitsCache: limitsCache.getProviderLimitsCache,
              fetchAndPersistProviderLimits: limits.fetchAndPersistProviderLimits,
              quotaRefreshTracker: defaultQuotaRefreshTracker,
            },
            { includeModelQuotas: true }
          ),
      };
    },
  },
  {
    keys: ["listEnabledSchedules"],
    load: async () => ({
      listEnabledSchedules: (await import("@/lib/db/quotaSchedules")).listEnabledSchedules,
    }),
  },
  {
    keys: ["listModelCapsForApiKey"],
    load: async () => ({
      listModelCapsForApiKey: (await import("@/lib/db/quotaModelCaps")).listModelCapsForApiKey,
    }),
  },
  {
    keys: ["listQuotaKeyModels"],
    load: async () => {
      const { listQuotaKeyModels } = await import("./quotaKeyModels");
      return { listQuotaKeyModels: (allowedQuotas) => listQuotaKeyModels(allowedQuotas) };
    },
  },
  {
    keys: ["resolvePublicApiBaseUrl"],
    load: async () => {
      const { resolvePublicApiBaseUrl } = await import("@/server/origin/publicApiBaseUrl");
      return { resolvePublicApiBaseUrl: () => resolvePublicApiBaseUrl() };
    },
  },
  {
    // Only looks at the quota gate's cache: the view never reads the provider.
    keys: ["peekPlanWindowReading"],
    load: async () => ({
      peekPlanWindowReading: (await import("./saturationSignals")).peekPlanWindowReading,
    }),
  },
  {
    keys: ["getPoolMemberBreakdown", "countUsablePoolKeys"],
    load: async () => {
      const m = await import("@/lib/db/quotaMemberBreakdown");
      return {
        getPoolMemberBreakdown: m.getPoolMemberBreakdown,
        countUsablePoolKeys: m.countUsablePoolKeys,
      };
    },
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
  const index = allocations.findIndex((a) => a.apiKeyId === allocation.apiKeyId);
  return index < 0 ? 0 : effectiveWeights(allocations)[index];
}

/**
 * The key's allocation is taken from the pool as read here, not from the earlier allocation list.
 * A pool the key is no longer allocated in gives no context.
 */
async function resolvePoolContext(
  input: QuotaSelfViewInput,
  deps: CoreDeps,
  poolId: string
): Promise<SelfViewPoolContext | null> {
  const pool = deps.getPool(poolId);
  if (!pool) return null;
  const allocations: PoolAllocation[] = Array.isArray(pool.allocations) ? pool.allocations : [];
  const allocation = allocations.find((a) => a.apiKeyId === input.apiKeyId);
  if (!allocation) return null;

  const connectionProvider = await deps.resolveConnectionProvider(pool.connectionId);
  const plan = deps.resolvePlan(pool.connectionId, connectionProvider);
  const provider = String(
    connectionProvider !== UNKNOWN_PROVIDER ? connectionProvider : plan.provider
  ).toLowerCase();
  if (!provider || provider === UNKNOWN_PROVIDER) return null;
  if (!sameProviderFamily(provider, input.provider)) return null;

  const connectionIds = pool.connectionIds?.length ? pool.connectionIds : [pool.connectionId];
  const accountVisible =
    hasSelfAccountQuotaScope(input.scopes) &&
    isProviderShared(provider, input.sharedQuotaProviders);
  return {
    pool,
    allocation,
    provider,
    ref: buildPoolRef(input.apiKeyId, pool.id, deps.secret),
    plan,
    effectiveWeight: gateEffectiveWeight(pool, allocation),
    connectionIds,
    accountVisible,
    accountConnectionIds: accountConnectionIdsOf(
      connectionIds,
      accountVisible,
      input.allowedConnections
    ),
    ...readMemberBreakdown({
      poolId: pool.id,
      accountVisible,
      nowMs: deps.now(),
      getOption: deps.getPoolMemberBreakdown,
      countUsable: deps.countUsablePoolKeys,
    }),
  };
}

/**
 * The pool connections whose account data the key may see: none without account visibility,
 * otherwise the pool's connections, limited to the key's allowed connections when it has any
 * (an absent or empty list is no restriction, as in /v1/me/status).
 */
function accountConnectionIdsOf(
  connectionIds: string[],
  accountVisible: boolean,
  allowedConnections: string[] | undefined
): string[] {
  if (!accountVisible) return [];
  const allowed = (allowedConnections ?? []).filter((id) => typeof id === "string" && id);
  if (allowed.length === 0) return connectionIds;
  const allowedSet = new Set(allowed);
  return connectionIds.filter((id) => allowedSet.has(id));
}

/** The key's pools for the provider, in creation order (then name). */
async function resolvePoolContexts(
  input: QuotaSelfViewInput,
  deps: CoreDeps
): Promise<SelfViewPoolContext[]> {
  const contexts: SelfViewPoolContext[] = [];
  const seen = new Set<string>();
  for (const { poolId } of deps.listAllocationsForApiKey(input.apiKeyId)) {
    if (seen.has(poolId)) continue;
    seen.add(poolId);
    const context = await resolvePoolContext(input, deps, poolId);
    if (context) contexts.push(context);
  }
  return contexts.sort(
    (a, b) =>
      compareText(a.pool.createdAt, b.pool.createdAt) || compareText(a.pool.name, b.pool.name)
  );
}

/**
 * The key's pools for `input.provider`, each with its `ref` (the PATCH route finds the pool a ref
 * names among these). Defaults are loaded as buildQuotaSelfView loads them.
 */
export async function resolveSelfPoolContexts(
  input: QuotaSelfViewInput,
  rawDeps: QuotaSelfViewDeps = {}
): Promise<SelfViewPoolContext[]> {
  return resolvePoolContexts(input, await normalizeDeps(rawDeps));
}

function compareText(a: string | undefined, b: string | undefined): number {
  const left = a ?? "";
  const right = b ?? "";
  return left < right ? -1 : left > right ? 1 : 0;
}

function isCountableDimension(dim: QuotaDimension): dim is CountableDimension {
  return COUNTABLE_UNITS.has(dim.unit) && dim.limit > Number.EPSILON;
}

/** The key's own numbers in one dimension. A failed read is unavailable, never zero. */
function ownShare(fairShare: number, consumed: number | null): SelfQuotaShare {
  if (consumed === null) {
    return {
      fairShare,
      consumed: null,
      remaining: null,
      status: "unavailable",
      reason: STORE_UNAVAILABLE,
    };
  }
  return { fairShare, consumed, remaining: Math.max(0, fairShare - consumed), status: "ok" };
}

async function buildSharedDimension(
  ctx: SelfViewPoolContext,
  dim: CountableDimension,
  store: ViewStore | null,
  apiKeyId: string,
  nowMs: number
): Promise<SelfQuotaSharedDimension> {
  const limit = dim.limit * ctx.connectionIds.length;
  const fairShare = (ctx.effectiveWeight / 100) * limit;
  const key = { poolId: ctx.pool.id, unit: dim.unit, window: dim.window };

  const consumed = await readViewStore(store ? () => store.peek(apiKeyId, key) : null);
  const borrow = await selfBorrowAvailable({
    ctx,
    apiKeyId,
    limit,
    consumed,
    nowMs,
    peek: store ? (id) => store.peek(id, key) : null,
  });
  const yourShare: SelfQuotaShare = { ...ownShare(fairShare, consumed), ...borrow };

  const dimension: SelfQuotaSharedDimension = {
    unit: dim.unit,
    window: dim.window,
    limit,
    yourShare,
  };
  if (ctx.accountVisible) {
    const used = await readViewStore(
      store ? () => store.poolConsumedTotal(ctx.pool.id, key) : null
    );
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

/**
 * Account entries for the pool connections the key may see (`accountConnectionIds`). Null when
 * the key has no account visibility for the pool. An empty list when its allowed connections
 * exclude every pool connection, or when the lookup fails (those accounts are reported
 * unavailable, with a server-side warning: the error stays in the log, never in the view). Never called with an empty id list: resolveAccountQuotaEntries would read every active
 * connection.
 */
async function resolvePoolAccountEntries(
  ctx: SelfViewPoolContext,
  input: QuotaSelfViewInput,
  deps: CoreDeps
): Promise<AccountQuotaEntryLike[] | null> {
  if (!ctx.accountVisible) return null;
  const allowedConnections = ctx.accountConnectionIds.filter((id) => typeof id === "string" && id);
  if (allowedConnections.length === 0) return [];
  try {
    return await deps.resolveAccountQuotaEntries({
      allowedConnections,
      sharedQuotaProviders: input.sharedQuotaProviders,
    });
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, poolId: ctx.pool.id },
      "self-service quota view: account lookup failed"
    );
    return [];
  }
}

async function buildPoolView(
  ctx: SelfViewPoolContext,
  store: ViewStore | null,
  input: QuotaSelfViewInput,
  deps: CoreDeps
): Promise<SelfQuotaPool> {
  const nowMs = deps.now();
  const dimensions: SelfQuotaSharedDimension[] = [];
  for (const dim of ctx.plan.dimensions ?? []) {
    if (!isCountableDimension(dim)) continue;
    dimensions.push(await buildSharedDimension(ctx, dim, store, input.apiKeyId, nowMs));
  }
  const secret = deps.secret;
  await attachCountableMembers({ ctx, dimensions, store, apiKeyId: input.apiKeyId, secret });
  const shares = await readPercentShares({
    ctx,
    apiKeyId: input.apiKeyId,
    allowedConnections: input.allowedConnections,
    store,
    now: deps.now(),
    peekReading: deps.peekPlanWindowReading,
  });
  return {
    ref: ctx.ref,
    name: ctx.pool.name,
    provider: ctx.provider,
    ...selfLendingFields(ctx, nowMs),
    policy: gatePolicy(ctx.allocation.policy),
    weight: ctx.effectiveWeight,
    cap: allocationCap(ctx.allocation),
    accountVisible: ctx.accountVisible,
    dimensions,
    accounts: buildSelfViewAccounts(
      ctx,
      await resolvePoolAccountEntries(ctx, input, deps),
      deps.now(),
      { shares, viewerApiKeyId: input.apiKeyId, secret }
    ),
  };
}

/** The key's `qtSd/` model ids; a failed lookup is an empty list and a server-side warning. */
async function resolveAvailableModels(
  input: QuotaSelfViewInput,
  deps: CoreDeps
): Promise<string[]> {
  try {
    return await deps.listQuotaKeyModels(input.allowedQuotas);
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message },
      "self-service quota view: available models lookup failed"
    );
    return [];
  }
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
  // Loaded once per view: the blocks builder gets this same instance (or null).
  const store = contexts.length > 0 ? await loadViewStore(deps.getQuotaStore) : null;
  const pools: SelfQuotaPool[] = [];
  for (const ctx of contexts) {
    pools.push(await buildPoolView(ctx, store, input, deps));
  }

  return selfQuotaResponseSchema.parse({
    provider: input.provider,
    generatedAt: new Date(deps.now()).toISOString(),
    pools,
    availableModels: await resolveAvailableModels(input, deps),
    expiresAt: input.expiresAt,
    apiBaseUrl: deps.resolvePublicApiBaseUrl(),
    blocks: await buildSelfViewBlocks(input.apiKeyId, contexts, {
      ...deps,
      getQuotaStore: async () => store,
    }),
  });
}
