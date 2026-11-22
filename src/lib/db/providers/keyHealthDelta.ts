import { keyHealthEntries } from "@/shared/utils/keyHealthEntries";
import { credentialFingerprint } from "@/shared/utils/credentialFingerprint";

interface HealthRecord {
  status?: unknown;
  failures?: unknown;
  rejectedAt?: unknown;
  generation?: unknown;
  lastSeq?: unknown;
  [key: string]: unknown;
}

/** A transaction accepts key ids only; JSON metadata must not become health entries. */
function healthEntries(value: unknown): Record<string, HealthRecord> {
  return keyHealthEntries<HealthRecord>(value);
}

export interface KeyHealthMergeOptions {
  mergeApiKeyHealth?: boolean;
  preserveKeyVerdict?: boolean;
  matchKeyGeneration?: boolean;
}

/** Merge observed key deltas using the current row, never a caller's sibling snapshot. */
export function mergeKeyHealthDelta(
  existing: Record<string, unknown> | null,
  patch: unknown,
  credentials: { apiKey?: unknown; accessToken?: unknown },
  options: KeyHealthMergeOptions
): Record<string, HealthRecord> {
  const health = healthEntries(existing?.apiKeyHealth);
  const extras = extraKeyMaterial(existing);
  for (const [id, incoming] of Object.entries(healthEntries(patch))) {
    const applies = options.matchKeyGeneration
      ? matchesCredentialGeneration(credentials, extras, id, incoming)
      : true;
    if (applies) health[id] = mergedEntry(health[id], incoming, options);
  }
  return health;
}

/**
 * Matching needs the row's credential material. With none supplied every delta would be dropped,
 * and a silent drop reads exactly like a healthy connection.
 */
function matchesCredentialGeneration(
  credentials: { apiKey?: unknown; accessToken?: unknown },
  extras: string[],
  id: string,
  incoming: HealthRecord
): boolean {
  if (!credentials.accessToken && !credentials.apiKey && !extras.length) {
    throw new Error("mergeKeyHealthDelta: matchKeyGeneration requires the connection credentials");
  }
  const match = /^extra_(\d+)$/.exec(id);
  const material =
    id === "primary"
      ? credentials.accessToken || credentials.apiKey
      : match
        ? extras[Number(match[1])]
        : undefined;
  if (typeof material !== "string" || !material) return false;
  return incoming.generation === credentialFingerprint(material);
}

/** The non-blank spare keys of the row, in the order the entry ids refer to them. */
function extraKeyMaterial(existing: Record<string, unknown> | null): string[] {
  if (!Array.isArray(existing?.extraApiKeys)) return [];
  return existing.extraApiKeys.filter(
    (key): key is string => typeof key === "string" && key.trim().length > 0
  );
}

/** A preserved verdict keeps the observation that produced it, never the incoming one. */
function mergedEntry(
  current: HealthRecord | undefined,
  incoming: HealthRecord,
  options: KeyHealthMergeOptions
): HealthRecord {
  const { lastSeq: _lastSeq, ...delta } = incoming;
  const keepsVerdict =
    options.preserveKeyVerdict &&
    current &&
    (!current.generation || current.generation === incoming.generation);
  return keepsVerdict && current
    ? {
        ...delta,
        status: current.status,
        failures: current.failures,
        rejectedAt: current.rejectedAt ?? null,
      }
    : delta;
}
