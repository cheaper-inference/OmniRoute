import type { AgentCredentials } from "@/lib/cloudAgent/baseAgent";
import { cloudAgentRepositories } from "@/lib/db/repositories/cloudAgentRepositories";

// The `cloud_agent_credentials` table is provisioned by migration
// `061_cloud_agent_credentials.sql` at database initialization (see
// src/lib/db/migrations/). Do not create it inline here — the project
// migration policy requires versioned, transaction-wrapped DDL.
//
// Persistence and encryption at rest live behind CloudAgentCredentialRepository
// (`cloudAgentRepositories.credentials`). The exports below stay synchronous
// (SQLite-only legacy access) because the credential and health routes call them
// without awaiting.

const legacy = cloudAgentRepositories.legacySync.credentials;

/** Mask API key for display — show last 4 chars only */
export { maskApiKey } from "@/domain/persistence/cloudAgentCredentialRepository";

/** Get decrypted credentials for a provider */
export function getCloudAgentCredentialFromDb(providerId: string): AgentCredentials | null {
  return legacy.findByProviderId(providerId);
}

/** List all credentials with masked keys */
export function listCloudAgentCredentials(): Array<{
  providerId: string;
  apiKey: string;
  baseUrl: string | null;
  updatedAt: string;
}> {
  return legacy.listMasked();
}

/** Save or update credentials (encrypts API key at rest) */
export function saveCloudAgentCredential(
  providerId: string,
  apiKey: string,
  baseUrl?: string
): void {
  legacy.save(providerId, apiKey, baseUrl);
}

/** Delete credentials for a provider */
export function deleteCloudAgentCredential(providerId: string): void {
  legacy.delete(providerId);
}
