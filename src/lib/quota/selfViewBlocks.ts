/**
 * selfViewBlocks.ts — the `blocks` part of the self-service quota view: what the quota gate
 * (enforce.ts) would currently hold the key to, per pool, besides the fair-share buckets.
 *
 * Schedules: the pool's enabled schedules resolved at `now` exactly as the gate resolves them.
 * A pool without schedules (or with only blackout rows, none active) gets no entry. A closed
 * window reports why and, when an allow window is configured, the seconds until it reopens. An
 * open window reports its reserve floors and, when it carries a budget, whether OmniRoute's own
 * consumption in the schedule bucket (`scheduleBucketPoolId`) has reached it.
 *
 * Model caps: the key's own per-model caps in the pool (placeholders at or below
 * Number.EPSILON are skipped, as the gate skips them), with the key's consumption in the
 * per-model bucket the gate reads ("<poolId>:model:<model>", hourly).
 *
 * A store that fails to load and a failed or non-finite store read are `null` (never zero, never
 * "not reached"; selfViewStore.ts). Inside a view build the store comes from selfView.ts, which
 * loads it once for both builders. A failed schedule or cap lookup leaves that pool without
 * those entries, which is also what the gate does with it (listSchedules and the gate's cap read
 * both fail open); the error is logged here.
 *
 * Every entry names its pool only by the opaque `ref`. The schedule label (text the pool
 * administrator wrote, shown to key holders as written) and the cap's model name are the only
 * free text copied.
 */

import { createLogger } from "@/shared/utils/logger";
import type { SelfQuotaBlocks } from "@/shared/schemas/selfQuota";
import type { ModelCap } from "@/lib/db/quotaModelCaps";
import { resolveActiveSchedule, scheduleBucketPoolId, type QuotaSchedule } from "./schedules";
import { loadViewStore, readViewStore, type ViewStore } from "./selfViewStore";
import type { SelfViewPoolContext } from "./selfViewTypes";

type ScheduleBlock = SelfQuotaBlocks["schedules"][number];
type ModelCapBlock = SelfQuotaBlocks["modelCaps"][number];

interface SelfViewBlocksDeps {
  now: () => number;
  listEnabledSchedules: (poolId: string) => QuotaSchedule[];
  listModelCapsForApiKey: (poolId: string, apiKeyId: string) => ModelCap[];
  /** May answer null: selfView.ts hands over the store it already loaded, or null if it failed. */
  getQuotaStore: () => Promise<ViewStore | null>;
}

const log = createLogger("quota:self-view");

/** A lookup's rows, or [] (with a server-side warning) when it throws. */
function readRows<T>(ctx: SelfViewPoolContext, what: string, read: () => T[]): T[] {
  try {
    const rows = read();
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, poolId: ctx.pool.id },
      `self-service quota view: ${what} lookup failed`
    );
    return [];
  }
}

async function scheduleBudget(
  ctx: SelfViewPoolContext,
  schedule: QuotaSchedule,
  store: ViewStore | null
): Promise<ScheduleBlock["budget"]> {
  const { budgetValue, budgetUnit, budgetWindow } = schedule;
  if (budgetValue === undefined || budgetUnit === undefined) return null;
  const key = {
    poolId: scheduleBucketPoolId(ctx.pool.id, schedule.id),
    unit: budgetUnit,
    window: budgetWindow,
  };
  const consumed = await readViewStore(
    store ? () => store.poolConsumedTotal(ctx.pool.id, key) : null
  );
  return {
    unit: budgetUnit,
    window: budgetWindow,
    exhausted: consumed === null ? null : consumed >= budgetValue,
  };
}

async function scheduleBlock(
  ctx: SelfViewPoolContext,
  deps: SelfViewBlocksDeps,
  store: ViewStore | null
): Promise<ScheduleBlock | null> {
  const schedules = readRows(ctx, "schedule", () => deps.listEnabledSchedules(ctx.pool.id));
  const verdict = resolveActiveSchedule(schedules, deps.now());
  if (verdict.kind === "unscheduled") return null;
  if (verdict.kind === "closed") {
    return {
      pool: ctx.ref,
      state: "closed",
      reason: verdict.reason,
      label: verdict.schedule?.label ?? null,
      retryAfterSeconds: verdict.retryAfterSeconds ?? null,
      reserves: [],
      budget: null,
    };
  }
  const { schedule } = verdict;
  return {
    pool: ctx.ref,
    state: "open",
    reason: null,
    label: schedule.label ?? null,
    retryAfterSeconds: null,
    reserves: schedule.reserves.map(({ window, percent }) => ({ window, percent })),
    budget: await scheduleBudget(ctx, schedule, store),
  };
}

async function modelCapBlocks(
  apiKeyId: string,
  ctx: SelfViewPoolContext,
  deps: SelfViewBlocksDeps,
  store: ViewStore | null
): Promise<ModelCapBlock[]> {
  const caps = readRows(ctx, "model cap", () => deps.listModelCapsForApiKey(ctx.pool.id, apiKeyId));
  const blocks: ModelCapBlock[] = [];
  for (const cap of caps) {
    // Only this key's real caps: placeholders are not enforced by the gate.
    if (cap.apiKeyId !== apiKeyId) continue;
    if (!Number.isFinite(cap.capValue) || cap.capValue <= Number.EPSILON) continue;
    const key = {
      poolId: `${ctx.pool.id}:model:${cap.model}`,
      unit: cap.capUnit,
      window: "hourly" as const,
    };
    const consumed = await readViewStore(store ? () => store.peek(apiKeyId, key) : null);
    blocks.push({
      pool: ctx.ref,
      model: cap.model,
      unit: cap.capUnit,
      window: "hourly",
      cap: cap.capValue,
      consumed,
      reached: consumed === null ? null : consumed >= cap.capValue,
    });
  }
  return blocks;
}

/** The schedule windows and per-model caps the key is under, pool by pool, in pool order. */
export async function buildSelfViewBlocks(
  apiKeyId: string,
  pools: SelfViewPoolContext[],
  deps: SelfViewBlocksDeps
): Promise<SelfQuotaBlocks> {
  const blocks: SelfQuotaBlocks = { schedules: [], modelCaps: [] };
  if (pools.length === 0) return blocks;
  const store = await loadViewStore(deps.getQuotaStore);
  for (const ctx of pools) {
    const schedule = await scheduleBlock(ctx, deps, store);
    if (schedule) blocks.schedules.push(schedule);
    blocks.modelCaps.push(...(await modelCapBlocks(apiKeyId, ctx, deps, store)));
  }
  return blocks;
}
