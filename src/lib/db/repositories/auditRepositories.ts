import type { AuditLogRepository } from "@/domain/persistence/auditLogRepository";
import { sqliteAuditLogLegacySync, sqliteAuditLogRepository } from "./sqliteAuditLogRepository";

export interface AuditRepositories {
  auditLog: AuditLogRepository;
  legacySync: typeof sqliteAuditLogLegacySync;
}

/**
 * SQLite-only composition root for the administrative audit trail. There is
 * deliberately no backend selection. Legacy synchronous access is kept explicitly
 * separate from the Promise contract instead of pretending to be backend-neutral.
 */
export const auditRepositories: AuditRepositories = {
  auditLog: sqliteAuditLogRepository,
  legacySync: sqliteAuditLogLegacySync,
};
