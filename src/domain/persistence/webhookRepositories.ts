// ── Webhook subscriptions ───────────────────────────────────────────────────

export type WebhookKind = "slack" | "telegram" | "discord" | "custom";

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string | null;
  enabled: boolean;
  description: string;
  created_at: string;
  last_triggered_at: string | null;
  last_status: number | null;
  failure_count: number;
  kind: WebhookKind;
  metadata_encrypted: string | null;
}

/** A new subscription with every value already chosen by the caller. */
export interface NewWebhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  description: string;
  kind: WebhookKind;
  metadataEncrypted: string | null;
}

/** Columns a partial update may set; undefined fields are left untouched. */
export interface WebhookChanges {
  url?: string;
  events?: string[];
  secret?: string;
  enabled?: boolean;
  description?: string;
  kind?: WebhookKind;
  metadataEncrypted?: string | null;
}

export interface WebhookPage {
  webhooks: Webhook[];
  /** Count of every stored webhook, independent of the page. */
  total: number;
}

/** Persistence only; the DB facade owns ids, secrets and default values. */
export interface WebhookRepository {
  /** Newest first. Without a limit every row is returned and the offset is ignored. */
  list(page?: { limit?: number; offset?: number }): Promise<WebhookPage>;
  findById(id: string): Promise<Webhook | null>;
  listEnabled(): Promise<Webhook[]>;
  insert(webhook: NewWebhook): Promise<void>;
  /** Writes only the defined fields; does nothing when none are defined. */
  update(id: string, changes: WebhookChanges): Promise<void>;
  /** Stored delivery rows go with the webhook through the schema's ON DELETE CASCADE. */
  deleteById(id: string): Promise<boolean>;
  /** Stamps the attempt; success resets the failure streak, failure extends it. */
  recordDeliveryResult(id: string, status: number, success: boolean): Promise<void>;
  /** Disables enabled webhooks whose failure streak reached the threshold; returns how many. */
  disableFailing(threshold: number): Promise<number>;
}

// ── Webhook delivery history ────────────────────────────────────────────────

export interface WebhookDelivery {
  id: number;
  webhook_id: string;
  event_type: string;
  status: string;
  http_status: number | null;
  latency_ms: number | null;
  error: string | null;
  payload_snapshot: string | null;
  created_at: string;
}

/** Safe projection for the deliveries list API — excludes `payload_snapshot`
 *  by default so audit-list responses never leak the captured request body. */
export type WebhookDeliverySafe = Omit<WebhookDelivery, "payload_snapshot">;

export interface NewWebhookDelivery {
  webhookId: string;
  eventType: string;
  status: string;
  httpStatus: number | null;
  latencyMs: number | null;
  /** Already sanitized by the caller. */
  error: string | null;
  payloadSnapshot: string | null;
}

export interface WebhookDeliveryRepository {
  /**
   * Inserts the delivery and, in the same transaction, drops that webhook's rows beyond the
   * newest `retainPerWebhook` (newest = created_at, then id, descending).
   */
  append(delivery: NewWebhookDelivery, retainPerWebhook: number): Promise<void>;
  /** Newest first, without `payload_snapshot`. */
  listRecent(webhookId: string, limit: number): Promise<WebhookDeliverySafe[]>;
}
