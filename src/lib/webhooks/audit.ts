import { isDeepStrictEqual } from "node:util";
import { deriveSettingsAuditActor } from "@/lib/api/settingsAudit";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import type { Webhook } from "@/lib/db/webhooks";
import { decryptMetadata } from "@/lib/webhookDispatcher";
import { logger } from "@/shared/utils/logger";

type WebhookAuditAction = "webhook.create" | "webhook.update" | "webhook.delete";

export function getWebhookAuditTarget({ id, kind, url }: Pick<Webhook, "id" | "kind" | "url">) {
  if (kind === "telegram") return `telegram:${id}`;

  try {
    const target = new URL(url);
    if (target.protocol === "http:" || target.protocol === "https:") return target.origin;
  } catch {
    // Older rows may have been stored without the current URL validation.
  }
  return `webhook:${id}`;
}

const WEBHOOK_FIELDS = ["url", "events", "secret", "description", "enabled", "kind"] as const;

function getChangedFields(previous: Webhook, current: Webhook): string[] {
  const fields: string[] = WEBHOOK_FIELDS.filter(
    (field) => !isDeepStrictEqual(previous[field], current[field])
  );
  if (
    previous.metadata_encrypted !== current.metadata_encrypted &&
    !isDeepStrictEqual(
      decryptMetadata(previous.metadata_encrypted),
      decryptMetadata(current.metadata_encrypted)
    )
  ) {
    fields.push("metadata");
  }
  return fields;
}

export async function emitWebhookAuditEvent(
  request: Request,
  action: WebhookAuditAction,
  webhook: Webhook,
  previous?: Webhook
): Promise<void> {
  const { id, kind } = webhook;
  const warn = () => logger.warn({ action, webhookId: id }, "Failed to record webhook audit event");
  try {
    const { ipAddress, requestId } = getAuditRequestContext(request);
    const actor = await deriveSettingsAuditActor(request);
    logAuditEvent(
      {
        action,
        actor,
        resourceType: "webhook",
        status: "success",
        ipAddress: ipAddress ?? undefined,
        requestId,
        target: getWebhookAuditTarget(webhook),
        details: previous
          ? { id, kind, changedFields: getChangedFields(previous, webhook) }
          : { id, kind },
      },
      warn
    );
  } catch {
    warn();
  }
}
