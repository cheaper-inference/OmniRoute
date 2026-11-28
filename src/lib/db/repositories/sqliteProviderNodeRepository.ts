/**
 * SQLite implementation of the provider node store (provider_nodes table, plus the
 * key_value "customModels" row a node owns).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle. SQL text is unchanged from the pre-repository module.
 */

import type {
  ProviderNodeFilter,
  ProviderNodeInsert,
  ProviderNodePage,
  ProviderNodeRepository,
  ProviderNodeRow,
  ProviderNodeValues,
} from "@/domain/persistence/providerNodeRepositories";
import { getDbInstance } from "../core";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

function listNodes(filter: ProviderNodeFilter = {}, page?: ProviderNodePage): ProviderNodeRow[] {
  let sql = "SELECT * FROM provider_nodes";
  const params: Record<string, unknown> = {};

  if (filter.type) {
    sql += " WHERE type = @type";
    params.type = filter.type;
  }
  sql += " ORDER BY id ASC";
  if (page && page.limit !== undefined) {
    sql += " LIMIT @limit OFFSET @offset";
    params.limit = page.limit;
    params.offset = page.offset ?? 0;
  }

  return getDb().prepare<ProviderNodeRow>(sql).all(params);
}

function countNodes(filter: ProviderNodeFilter = {}): number {
  let sql = "SELECT count(*) as cnt FROM provider_nodes";
  const params: Record<string, unknown> = {};

  if (filter.type) {
    sql += " WHERE type = @type";
    params.type = filter.type;
  }

  const row = getDb().prepare(sql).get(params) as { cnt: number };
  return row.cnt;
}

function findNodeById(id: string): ProviderNodeRow | null {
  const row = getDb().prepare<ProviderNodeRow>("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  return row ?? null;
}

function insertNode(node: ProviderNodeInsert): boolean {
  const result = getDb()
    .prepare(
      `
    INSERT INTO provider_nodes (id, type, name, prefix, api_type, base_url, chat_path, models_path, icon_url, custom_headers_json, custom_json_config_json, daily_quota_reset_timezone, daily_quota_reset_hour, created_at, updated_at)
    VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @chatPath, @modelsPath, @iconUrl, @customHeadersJson, @customJsonConfigJson, @dailyQuotaResetTimezone, @dailyQuotaResetHour, @createdAt, @updatedAt)
    ON CONFLICT(id) DO NOTHING
  `
    )
    .run(node);
  return (result?.changes ?? 0) > 0;
}

function updateNode(id: string, values: ProviderNodeValues): void {
  getDb()
    .prepare(
      `
    UPDATE provider_nodes SET type = @type, name = @name, prefix = @prefix,
    api_type = @apiType, base_url = @baseUrl, chat_path = @chatPath,
    models_path = @modelsPath, icon_url = @iconUrl,
    custom_headers_json = @customHeadersJson,
    custom_json_config_json = @customJsonConfigJson,
    daily_quota_reset_timezone = @dailyQuotaResetTimezone,
    daily_quota_reset_hour = @dailyQuotaResetHour,
    updated_at = @updatedAt
    WHERE id = @id
  `
    )
    .run({
      id,
      type: values.type,
      name: values.name,
      prefix: values.prefix,
      apiType: values.apiType,
      baseUrl: values.baseUrl,
      chatPath: values.chatPath,
      modelsPath: values.modelsPath,
      iconUrl: values.iconUrl,
      customHeadersJson: values.customHeadersJson,
      customJsonConfigJson: values.customJsonConfigJson,
      dailyQuotaResetTimezone: values.dailyQuotaResetTimezone,
      dailyQuotaResetHour: values.dailyQuotaResetHour,
      updatedAt: values.updatedAt,
    });
}

function deleteNode(id: string): ProviderNodeRow | null {
  const db = getDb();
  const existing = db.prepare<ProviderNodeRow>("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  db.prepare("DELETE FROM provider_nodes WHERE id = ?").run(id);
  // A node's custom models live in key_value keyed by the node id; leaving the
  // row behind keeps deleted nodes surfacing models (9router a8f63f4d).
  db.prepare("DELETE FROM key_value WHERE namespace = 'customModels' AND key = ?").run(id);
  return existing;
}

export const sqliteProviderNodeRepository: ProviderNodeRepository = {
  list: async (filter, page) => listNodes(filter, page),
  count: async (filter) => countNodes(filter),
  findById: async (id) => findNodeById(id),
  insert: async (node) => insertNode(node),
  update: async (id, values) => updateNode(id, values),
  delete: async (id) => deleteNode(id),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * node facade runs every read and write in the caller's turn (no await between the
 * write and its backup/cache invalidation), and the node count is a sync export.
 */
export const sqliteProviderNodeLegacySync = {
  list: listNodes,
  count: countNodes,
  findById: findNodeById,
  insert: insertNode,
  update: updateNode,
  delete: deleteNode,
};
