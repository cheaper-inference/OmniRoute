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
  const extras = Array.isArray(existing?.extraApiKeys)
    ? existing.extraApiKeys.filter(
        (key): key is string => typeof key === "string" && key.trim().length > 0
      )
    : [];
  if (
    options.matchKeyGeneration &&
    !credentials.accessToken &&
    !credentials.apiKey &&
    !extras.length
  ) {
    // Matching needs the row's credential material. With none supplied every delta would be dropped,
    // and a silent drop reads exactly like a healthy connection.
    throw new Error("mergeKeyHealthDelta: matchKeyGeneration requires the connection credentials");
  }
  for (const [id, incoming] of Object.entries(healthEntries(patch))) {
    if (options.matchKeyGeneration) {
      const match = /^extra_(\d+)$/.exec(id);
      const material =
        id === "primary"
          ? credentials.accessToken || credentials.apiKey
          : match
            ? extras[Number(match[1])]
            : undefined;
      if (typeof material !== "string" || !material) continue;
      const generation = credentialFingerprint(material);
      if (incoming.generation !== generation) continue;
    }
    const { lastSeq: _lastSeq, ...delta } = incoming;
    const current = health[id];
    if (
      options.preserveKeyVerdict &&
      current &&
      (!current.generation || current.generation === incoming.generation)
    ) {
      health[id] = {
        ...delta,
        status: current.status,
        failures: current.failures,
        rejectedAt: current.rejectedAt ?? null,
      };
    } else {
      health[id] = delta;
    }
  }
  return health;
}
