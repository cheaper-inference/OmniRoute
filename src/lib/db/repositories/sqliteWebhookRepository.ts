/**
 * SQLite implementation for webhooks (migration 011) and webhook_deliveries (migration 069).
 * All queries use db.prepare() (better-sqlite3); only the fixed column list of a partial
 * update is joined into the SQL text, never input values.
 *
 * Async repositories and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */

import type {
  NewWebhook,
  NewWebhookDelivery,
  Webhook,
  WebhookChanges,
  WebhookDeliveryRepository,
  WebhookDeliverySafe,
  WebhookKind,
  WebhookPage,
  WebhookRepository,
} from "@/domain/persistence/webhookRepositories";
import { getDbInstance } from "../core";

interface WebhookRow {
  id: string;
  url: string;
  events: string;
  secret: string | null;
  enabled: number;
  description: string;
  created_at: string;
  last_triggered_at: string | null;
  last_status: number | null;
  failure_count: number;
  kind: string;
  metadata_encrypted: string | null;
}

function rowToWebhook(row: WebhookRow): Webhook {
  return {
    ...row,
    kind: (row.kind as WebhookKind) || "custom",
    events: JSON.parse(row.events || '["*"]'),
    enabled: row.enabled === 1,
  };
}

interface CountResult {
  cnt: number;
}

function listWebhooks(page?: { limit?: number; offset?: number }): WebhookPage {
  const db = getDbInstance();
  const limit = page?.limit;
  const offset = page?.offset ?? 0;
  let sql = "SELECT * FROM webhooks ORDER BY created_at DESC";
  const params: unknown[] = [];
  if (limit !== undefined) {
    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);
  }
  const rows = db.prepare(sql).all(...params) as WebhookRow[];
  const total = (db.prepare("SELECT count(*) as cnt FROM webhooks").get() as CountResult).cnt;
  return { webhooks: rows.map(rowToWebhook), total };
}

function findWebhook(id: string): Webhook | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM webhooks WHERE id = ?").get(id) as WebhookRow | undefined;
  return row ? rowToWebhook(row) : null;
}

function listEnabledWebhooks(): Webhook[] {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM webhooks WHERE enabled = 1").all() as WebhookRow[];
  return rows.map(rowToWebhook);
}

function insertWebhook(webhook: NewWebhook): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO webhooks (id, url, events, secret, description, kind, metadata_encrypted)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    webhook.id,
    webhook.url,
    JSON.stringify(webhook.events),
    webhook.secret,
    webhook.description,
    webhook.kind,
    webhook.metadataEncrypted
  );
}

function updateWebhook(id: string, changes: WebhookChanges): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (changes.url !== undefined) {
    fields.push("url = ?");
    values.push(changes.url);
  }
  if (changes.events !== undefined) {
    fields.push("events = ?");
    values.push(JSON.stringify(changes.events));
  }
  if (changes.secret !== undefined) {
    fields.push("secret = ?");
    values.push(changes.secret);
  }
  if (changes.enabled !== undefined) {
    fields.push("enabled = ?");
    values.push(changes.enabled ? 1 : 0);
  }
  if (changes.description !== undefined) {
    fields.push("description = ?");
    values.push(changes.description);
  }
  if (changes.kind !== undefined) {
    fields.push("kind = ?");
    values.push(changes.kind);
  }
  if (changes.metadataEncrypted !== undefined) {
    fields.push("metadata_encrypted = ?");
    values.push(changes.metadataEncrypted);
  }

  if (fields.length === 0) return;

  values.push(id);
  getDbInstance()
    .prepare(`UPDATE webhooks SET ${fields.join(", ")} WHERE id = ?`)
    .run(...values);
}

function deleteWebhook(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM webhooks WHERE id = ?").run(id);
  return result.changes > 0;
}

function recordDeliveryResult(id: string, status: number, success: boolean): void {
  const db = getDbInstance();
  if (success) {
    db.prepare(
      `UPDATE webhooks SET last_triggered_at = datetime('now'), last_status = ?, failure_count = 0 WHERE id = ?`
    ).run(status, id);
  } else {
    db.prepare(
      `UPDATE webhooks SET last_triggered_at = datetime('now'), last_status = ?, failure_count = failure_count + 1 WHERE id = ?`
    ).run(status, id);
  }
}

function disableFailingWebhooks(threshold: number): number {
  const db = getDbInstance();
  const result = db
    .prepare(`UPDATE webhooks SET enabled = 0 WHERE failure_count >= ? AND enabled = 1`)
    .run(threshold);
  return result.changes;
}

function appendDelivery(delivery: NewWebhookDelivery, retainPerWebhook: number): void {
  const db = getDbInstance();
  const insertStmt = db.prepare(
    `INSERT INTO webhook_deliveries
       (webhook_id, event_type, status, http_status, latency_ms, error, payload_snapshot)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const rotateStmt = db.prepare(
    `DELETE FROM webhook_deliveries
     WHERE webhook_id = ?
       AND id NOT IN (
         SELECT id FROM webhook_deliveries
         WHERE webhook_id = ?
         ORDER BY created_at DESC, id DESC
         LIMIT ?
       )`
  );
  db.transaction(() => {
    insertStmt.run(
      delivery.webhookId,
      delivery.eventType,
      delivery.status,
      delivery.httpStatus,
      delivery.latencyMs,
      delivery.error,
      delivery.payloadSnapshot
    );
    rotateStmt.run(delivery.webhookId, delivery.webhookId, retainPerWebhook);
  })();
}

function listRecentDeliveries(webhookId: string, limit: number): WebhookDeliverySafe[] {
  const db = getDbInstance();
  return db
    .prepare(
      `SELECT id, webhook_id, event_type, status, http_status, latency_ms, error, created_at
       FROM webhook_deliveries
       WHERE webhook_id = ?
       ORDER BY created_at DESC, id DESC
       LIMIT ?`
    )
    .all(webhookId, limit) as WebhookDeliverySafe[];
}

export const sqliteWebhookRepository: WebhookRepository = {
  list: async (page) => listWebhooks(page),
  findById: async (id) => findWebhook(id),
  listEnabled: async () => listEnabledWebhooks(),
  insert: async (webhook) => insertWebhook(webhook),
  update: async (id, changes) => updateWebhook(id, changes),
  deleteById: async (id) => deleteWebhook(id),
  recordDeliveryResult: async (id, status, success) => recordDeliveryResult(id, status, success),
  disableFailing: async (threshold) => disableFailingWebhooks(threshold),
};

export const sqliteWebhookDeliveryRepository: WebhookDeliveryRepository = {
  append: async (delivery, retainPerWebhook) => appendDelivery(delivery, retainPerWebhook),
  listRecent: async (webhookId, limit) => listRecentDeliveries(webhookId, limit),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * management routes and the event dispatcher call the DB facade without awaiting.
 */
export const sqliteWebhookLegacySync = {
  list: listWebhooks,
  findById: findWebhook,
  listEnabled: listEnabledWebhooks,
  insert: insertWebhook,
  update: updateWebhook,
  deleteById: deleteWebhook,
  recordDeliveryResult,
  disableFailing: disableFailingWebhooks,
};

export const sqliteWebhookDeliveryLegacySync = {
  append: appendDelivery,
  listRecent: listRecentDeliveries,
};
