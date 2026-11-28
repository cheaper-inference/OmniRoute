import type { QuotaSchedule } from "@/lib/quota/schedules";

export type { QuotaSchedule } from "@/lib/quota/schedules";

export interface QuotaGroup {
  id: string;
  name: string;
  createdAt: string;
}

export type QuotaModelCapUnit = "percent" | "requests" | "tokens" | "usd";

export interface ModelCap {
  poolId: string;
  apiKeyId: string;
  model: string;
  capValue: number;
  capUnit: QuotaModelCapUnit;
}

/** A schedule as submitted by a caller: the id and poolId are assigned by the repository. */
export type ScheduleInput = Omit<QuotaSchedule, "id" | "poolId"> & { id?: string };

/** Quota groups. Persistence only; the DB facade owns catalog-cache invalidation. */
export interface QuotaGroupRepository {
  /** Creation time ascending. */
  list(): Promise<QuotaGroup[]>;
  findById(id: string): Promise<QuotaGroup | null>;
  findNameById(id: string): Promise<string | null>;
  create(name: string): Promise<QuotaGroup>;
  /** Resolves false when the group does not exist. */
  rename(id: string, name: string): Promise<boolean>;
  /**
   * Rejects for the protected seed group and for groups still referenced by a
   * pool; resolves false when the group does not exist.
   */
  deleteById(id: string): Promise<boolean>;
}

/** Per-(pool, API key, model) budget caps. */
export interface QuotaModelCapRepository {
  find(poolId: string, apiKeyId: string, model: string): Promise<ModelCap | null>;
  /** Caps of one API key in one pool, model ascending. */
  listForApiKey(poolId: string, apiKeyId: string): Promise<ModelCap[]>;
  /** Inserts or replaces value and unit for the (pool, key, model) triple. */
  upsert(cap: ModelCap): Promise<void>;
}

/** Time-aware quota windows of a pool. Definitions only; no counters. */
export interface QuotaScheduleRepository {
  /**
   * Priority descending, then id ascending. Resolves [] when the schedule store
   * is unavailable: schedules are additive and must never block traffic.
   */
  listForPool(poolId: string): Promise<QuotaSchedule[]>;
  /** Atomically replaces the pool's whole set and returns it in list order. */
  replaceForPool(poolId: string, schedules: ScheduleInput[]): Promise<QuotaSchedule[]>;
  /** Removes every schedule of the pool; resolves the removed count (0 when unavailable). */
  deleteForPool(poolId: string): Promise<number>;
}
