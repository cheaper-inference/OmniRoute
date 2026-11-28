import type { LogExportDestinationRepository } from "@/domain/persistence/logExportDestinationRepository";
import type {
  WebhookDeliveryRepository,
  WebhookRepository,
} from "@/domain/persistence/webhookRepositories";
import {
  sqliteLogExportDestinationLegacySync,
  sqliteLogExportDestinationRepository,
} from "./sqliteLogExportDestinationRepository";
import {
  sqliteWebhookDeliveryLegacySync,
  sqliteWebhookDeliveryRepository,
  sqliteWebhookLegacySync,
  sqliteWebhookRepository,
} from "./sqliteWebhookRepository";

export interface WebhookRepositories {
  webhooks: WebhookRepository;
  deliveries: WebhookDeliveryRepository;
  logExportDestinations: LogExportDestinationRepository;
  legacySync: {
    webhooks: typeof sqliteWebhookLegacySync;
    deliveries: typeof sqliteWebhookDeliveryLegacySync;
    logExportDestinations: typeof sqliteLogExportDestinationLegacySync;
  };
}

/**
 * SQLite-only composition root for outbound event destinations: webhook subscriptions,
 * their delivery history and log-export destinations. There is deliberately no backend
 * selection. Every existing caller reads and writes without awaiting, so that access stays
 * explicitly separate from the Promise contract instead of pretending to be backend-neutral.
 */
export const webhookRepositories: WebhookRepositories = {
  webhooks: sqliteWebhookRepository,
  deliveries: sqliteWebhookDeliveryRepository,
  logExportDestinations: sqliteLogExportDestinationRepository,
  legacySync: {
    webhooks: sqliteWebhookLegacySync,
    deliveries: sqliteWebhookDeliveryLegacySync,
    logExportDestinations: sqliteLogExportDestinationLegacySync,
  },
};
