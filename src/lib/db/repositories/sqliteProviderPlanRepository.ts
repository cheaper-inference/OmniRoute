/**
 * SQLite implementation of the provider plan store (provider_plans table).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle. SQL text is unchanged from the pre-repository module.
 */

import type {
  ProviderPlan,
  ProviderPlanRepository,
  QuotaDimension,
} from "@/domain/persistence/providerNodeRepositories";
import { getDbInstance } from "../core";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

interface PlanRow {
  connection_id: string;
  provider: string;
  dimensions_json: string;
  source: string;
  updated_at: string;
}

function rowToPlan(row: PlanRow): ProviderPlan {
  let dimensions: QuotaDimension[] = [];
  try {
    dimensions = JSON.parse(row.dimensions_json) as QuotaDimension[];
  } catch {
    // Malformed JSON — return empty dimensions rather than throwing
    dimensions = [];
  }
  return {
    connectionId: row.connection_id,
    provider: row.provider,
    dimensions,
    source: row.source as "auto" | "manual",
  };
}

function findPlan(connectionId: string): ProviderPlan | null {
  const row = getDb()
    .prepare<PlanRow>(
      `SELECT connection_id, provider, dimensions_json, source, updated_at
       FROM provider_plans WHERE connection_id = ?`
    )
    .get(connectionId);
  if (!row) return null;
  return rowToPlan(row);
}

function listPlans(): ProviderPlan[] {
  const rows = getDb()
    .prepare<PlanRow>(
      `SELECT connection_id, provider, dimensions_json, source, updated_at
       FROM provider_plans ORDER BY provider ASC`
    )
    .all();
  return rows.map(rowToPlan);
}

function upsertPlan(
  connectionId: string,
  provider: string,
  dimensions: QuotaDimension[],
  source: "auto" | "manual",
  updatedAt: string
): void {
  const dimensionsJson = JSON.stringify(dimensions);

  getDb()
    .prepare(
      `INSERT INTO provider_plans (connection_id, provider, dimensions_json, source, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(connection_id)
       DO UPDATE SET
         provider = excluded.provider,
         dimensions_json = excluded.dimensions_json,
         source = excluded.source,
         updated_at = excluded.updated_at`
    )
    .run(connectionId, provider, dimensionsJson, source, updatedAt);
}

function deletePlan(connectionId: string): boolean {
  const result = getDb()
    .prepare("DELETE FROM provider_plans WHERE connection_id = ?")
    .run(connectionId);
  return result.changes > 0;
}

export const sqliteProviderPlanRepository: ProviderPlanRepository = {
  findByConnectionId: async (connectionId) => findPlan(connectionId),
  list: async () => listPlans(),
  upsert: async (connectionId, provider, dimensions, source, updatedAt) =>
    upsertPlan(connectionId, provider, dimensions, source, updatedAt),
  delete: async (connectionId) => deletePlan(connectionId),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * plan resolver behind quota enforcement and the plan routes read plans without
 * awaiting.
 */
export const sqliteProviderPlanLegacySync = {
  findByConnectionId: findPlan,
  list: listPlans,
  upsert: upsertPlan,
  delete: deletePlan,
};
