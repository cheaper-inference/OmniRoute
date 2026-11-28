/**
 * SQLite implementation for discovery_results (migration 074).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  DiscoveryAuthType,
  DiscoveryMethod,
  DiscoveryResult,
  DiscoveryResultRepository,
  DiscoveryRiskLevel,
  DiscoveryStatus,
} from "@/domain/persistence/modelCatalogRepositories";
import { getDbInstance } from "../core";

interface DiscoveryRow {
  id: number;
  provider_id: string;
  method: string;
  endpoint: string | null;
  auth_type: string | null;
  models: string | null;
  rate_limit: string | null;
  feasibility: number | null;
  risk_level: string | null;
  status: string;
  notes: string | null;
  discovered_at: string;
  verified_at: string | null;
}

function rowToResult(row: DiscoveryRow): DiscoveryResult {
  let models: string[] | undefined;
  if (row.models) {
    try {
      const parsed = JSON.parse(row.models);
      if (Array.isArray(parsed)) models = parsed.map(String);
    } catch {
      models = undefined;
    }
  }
  return {
    id: row.id,
    providerId: row.provider_id,
    method: row.method as DiscoveryMethod,
    endpoint: row.endpoint,
    authType: (row.auth_type as DiscoveryAuthType) ?? "none",
    models,
    rateLimit: row.rate_limit,
    feasibility: row.feasibility ?? 0,
    riskLevel: (row.risk_level as DiscoveryRiskLevel) ?? "none",
    status: row.status as DiscoveryStatus,
    notes: row.notes,
    discoveredAt: row.discovered_at,
    verifiedAt: row.verified_at,
  };
}

function upsertSync(result: DiscoveryResult): DiscoveryResult {
  const db = getDbInstance();
  const models = result.models ? JSON.stringify(result.models) : null;
  db.prepare(
    `INSERT INTO discovery_results
       (provider_id, method, endpoint, auth_type, models, rate_limit, feasibility, risk_level, status, notes)
     VALUES (@provider_id, @method, @endpoint, @auth_type, @models, @rate_limit, @feasibility, @risk_level, @status, @notes)
     ON CONFLICT(provider_id, method, endpoint) DO UPDATE SET
       auth_type = excluded.auth_type,
       models = excluded.models,
       rate_limit = excluded.rate_limit,
       feasibility = excluded.feasibility,
       risk_level = excluded.risk_level,
       status = excluded.status,
       notes = excluded.notes`
  ).run({
    provider_id: result.providerId,
    method: result.method,
    endpoint: result.endpoint ?? null,
    auth_type: result.authType,
    models,
    rate_limit: result.rateLimit ?? null,
    feasibility: result.feasibility,
    risk_level: result.riskLevel,
    status: result.status,
    notes: result.notes ?? null,
  });

  const row = db
    .prepare(
      `SELECT * FROM discovery_results
       WHERE provider_id = ? AND method = ? AND ifnull(endpoint, '') = ifnull(?, '')`
    )
    .get(result.providerId, result.method, result.endpoint ?? null) as DiscoveryRow | undefined;
  // The row was just written, so it must exist.
  return rowToResult(row!);
}

function listSync(providerId?: string): DiscoveryResult[] {
  const db = getDbInstance();
  const rows = providerId
    ? (db
        .prepare(
          "SELECT * FROM discovery_results WHERE provider_id = ? ORDER BY discovered_at DESC, id DESC"
        )
        .all(providerId) as DiscoveryRow[])
    : (db
        .prepare("SELECT * FROM discovery_results ORDER BY discovered_at DESC, id DESC")
        .all() as DiscoveryRow[]);
  return rows.map(rowToResult);
}

function findByIdSync(id: number): DiscoveryResult | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM discovery_results WHERE id = ?").get(id) as
    DiscoveryRow | undefined;
  return row ? rowToResult(row) : null;
}

function markVerifiedSync(id: number): DiscoveryResult | null {
  const db = getDbInstance();
  const info = db
    .prepare(
      "UPDATE discovery_results SET status = 'verified', verified_at = datetime('now') WHERE id = ?"
    )
    .run(id);
  if (info.changes === 0) return null;
  return findByIdSync(id);
}

function removeSync(id: number): boolean {
  const db = getDbInstance();
  const info = db.prepare("DELETE FROM discovery_results WHERE id = ?").run(id);
  return info.changes > 0;
}

export const sqliteDiscoveryResultRepository: DiscoveryResultRepository = {
  async upsert(result) {
    return upsertSync(result);
  },
  async list(providerId) {
    return listSync(providerId);
  },
  async findById(id) {
    return findByIdSync(id);
  },
  async markVerified(id) {
    return markVerifiedSync(id);
  },
  async remove(id) {
    return removeSync(id);
  },
};

/** SQLite-only synchronous access retained for the existing discovery routes and service. */
export const sqliteDiscoveryResultLegacySync = {
  upsert: upsertSync,
  list: listSync,
  findById: findByIdSync,
  markVerified: markVerifiedSync,
  remove: removeSync,
};
