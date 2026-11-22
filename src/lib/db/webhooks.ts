/**
 * Database module: Webhooks
 * CRUD operations for webhook event subscriptions
 *
 * Rows live behind WebhookRepository; this facade owns ids, generated secrets and
 * default values, and keeps every export synchronous (SQLite-only legacy access).
 */

import type {
  Webhook,
  WebhookChanges,
  WebhookKind,
  WebhookRepository,
} from "@/domain/persistence/webhookRepositories";
import crypto from "crypto";
import { webhookRepositories } from "./repositories/webhookRepositories";

export type { Webhook, WebhookKind } from "@/domain/persistence/webhookRepositories";

const legacy = webhookRepositories.legacySync.webhooks;

/** Async persistence contract; it never generates ids, secrets or defaults on its own. */
export function getWebhookRepository(): WebhookRepository {
  return webhookRepositories.webhooks;
}

export function getWebhooks(options?: { limit?: number; offset?: number }): {
  webhooks: Webhook[];
  total: number;
} {
  return legacy.list(options);
}

export function getWebhook(id: string): Webhook | null {
  return legacy.findById(id);
}

export function getEnabledWebhooks(): Webhook[] {
  return legacy.listEnabled();
}

export function createWebhook(data: {
  url: string;
  events?: string[];
  secret?: string;
  description?: string;
  kind?: WebhookKind;
  metadataEncrypted?: string | null;
}): Webhook {
  const id = crypto.randomUUID();
  const secret = data.secret || `whsec_${crypto.randomBytes(24).toString("hex")}`;
  const kind = data.kind || "custom";

  legacy.insert({
    id,
    url: data.url,
    events: data.events || ["*"],
    secret,
    description: data.description || "",
    kind,
    metadataEncrypted: data.metadataEncrypted ?? null,
  });

  return getWebhook(id)!;
}

export function updateWebhook(
  id: string,
  data: Partial<{
    url: string;
    events: string[];
    secret: string;
    enabled: boolean;
    description: string;
    kind: WebhookKind;
    metadataEncrypted: string | null;
  }>
): Webhook | null {
  const existing = getWebhook(id);
  if (!existing) return null;

  const changes: WebhookChanges = {
    url: data.url,
    events: data.events,
    secret: data.secret,
    enabled: data.enabled,
    description: data.description,
    kind: data.kind,
    metadataEncrypted: data.metadataEncrypted,
  };
  if (Object.values(changes).every((value) => value === undefined)) return existing;

  legacy.update(id, changes);

  return getWebhook(id);
}

export function deleteWebhook(id: string): boolean {
  return legacy.deleteById(id);
}

export function recordWebhookDelivery(id: string, status: number, success: boolean): void {
  legacy.recordDeliveryResult(id, status, success);
}

export function disableWebhooksWithHighFailures(threshold = 10): number {
  return legacy.disableFailing(threshold);
}
