import { canonicalKimiProvider } from "@omniroute/open-sse/config/kimiProvider.ts";
import { createHash } from "node:crypto";
import { resolveUsageAccountIdentity } from "@/lib/usage/accountIdentity";
import type { SessionAccountAffinityRecord } from "./store";

export type AffinityAccountConnection = Parameters<typeof resolveUsageAccountIdentity>[0];

const verifiedLegacyDigests = new Map<string, string>();

function digest(connection: AffinityAccountConnection, provider: string): string {
  const { accountKey } = resolveUsageAccountIdentity({ ...connection, provider });
  return createHash("sha256").update(accountKey).digest("hex");
}

export function sessionAffinityAccountIdentity(
  connection: AffinityAccountConnection,
  provider: string
): string {
  const canonical = canonicalKimiProvider(provider);
  const identity = digest(connection, canonical);
  if (canonical === "kimi") {
    if (verifiedLegacyDigests.size >= 1024)
      verifiedLegacyDigests.delete(verifiedLegacyDigests.keys().next().value!);
    verifiedLegacyDigests.set(identity, digest(connection, "moonshot"));
  }
  return identity;
}

/** Equivalence is granted only after computing both digests from the same real candidate. */
export function matchesSessionAffinityIdentity(
  actual: string,
  expected: string,
  provider: string
): boolean {
  return (
    actual === expected ||
    (canonicalKimiProvider(provider) === "kimi" && verifiedLegacyDigests.get(expected) === actual)
  );
}

export function resolveSessionAffinityConnection<T extends { id: string }>(
  record: SessionAccountAffinityRecord | null,
  connections: T[],
  provider: string
): T | null {
  if (!record) return null;
  if (record.accountIdentity) {
    // Every candidate has a usage identity (connection-scoped when metadata is absent).
    // A contradictory local id must never override the recorded identity.
    return (
      connections.find((candidate) =>
        matchesSessionAffinityIdentity(
          record.accountIdentity!,
          sessionAffinityAccountIdentity(candidate, provider),
          provider
        )
      ) ?? null
    );
  }
  return connections.find((candidate) => candidate.id === record.connectionId) ?? null;
}
