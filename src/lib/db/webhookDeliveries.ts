import type { WebhookDeliveryRepository } from "@/domain/persistence/webhookRepositories";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { webhookRepositories } from "./repositories/webhookRepositories";

export type {
  WebhookDelivery,
  WebhookDeliverySafe,
} from "@/domain/persistence/webhookRepositories";
import type { WebhookDeliverySafe } from "@/domain/persistence/webhookRepositories";

/**
 * Rows live behind WebhookDeliveryRepository; this facade owns error sanitizing and the
 * per-webhook retention cap, and keeps every export synchronous (SQLite-only legacy access).
 */
const legacy = webhookRepositories.legacySync.deliveries;

/** Async persistence contract; it never sanitizes errors on its own. */
export function getWebhookDeliveryRepository(): WebhookDeliveryRepository {
  return webhookRepositories.deliveries;
}

const MAX_DELIVERIES_PER_WEBHOOK = 100;

export function insertDelivery(opts: {
  webhookId: string;
  eventType: string;
  status: string;
  httpStatus?: number | null;
  latencyMs?: number | null;
  error?: string | null;
  payloadSnapshot?: string | null;
}): void {
  // Sanitize the error before persistence so raw stack traces, hostnames or
  // upstream-internal messages never enter the audit log. The audit log is
  // read back via the deliveries API and rendered in the dashboard.
  const sanitizedError = opts.error != null ? sanitizeErrorMessage(opts.error) || null : null;
  legacy.append(
    {
      webhookId: opts.webhookId,
      eventType: opts.eventType,
      status: opts.status,
      httpStatus: opts.httpStatus ?? null,
      latencyMs: opts.latencyMs ?? null,
      error: sanitizedError,
      payloadSnapshot: opts.payloadSnapshot ?? null,
    },
    MAX_DELIVERIES_PER_WEBHOOK
  );
}

/** List recent deliveries excluding `payload_snapshot` (default — used by UI). */
export function getDeliveries(webhookId: string, limit: number): WebhookDeliverySafe[] {
  return legacy.listRecent(webhookId, limit);
}
