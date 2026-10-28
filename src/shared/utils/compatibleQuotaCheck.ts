/**
 * "Quota check" preset for OpenAI- and Anthropic-compatible provider nodes.
 *
 * The quota fetcher for compatible connections (`open-sse/services/usage/openaiCompatible.ts`)
 * reads a per-connection `providerSpecificData.quotaEndpoint` mapping. Writing that mapping by
 * hand is the only way to configure it, so the node's edit modal offers a toggle that writes a
 * standard one instead:
 *
 *   GET {baseUrl}{quotaPath}        quotaPath defaults to /credits
 *   → { "credits": 123.45, "total"?: 500, "used"?: 376.55 }
 *
 * The generated endpoint carries `preset: "standard-credits"` so it can be recognised later.
 * Only a preset endpoint is ever replaced or removed by the toggle: an endpoint an operator
 * wrote by hand has no preset marker and is left exactly as it is.
 *
 * Kept free of server imports so the dashboard can read the toggle state from connections.
 */
import {
  ANTHROPIC_COMPATIBLE_PREFIX,
  OPENAI_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";

const STANDARD_CREDITS_QUOTA_PRESET = "standard-credits";
export const DEFAULT_COMPATIBLE_QUOTA_PATH = "/credits";

type CompatibleQuotaAuth = "bearer" | "x-api-key";

interface CompatibleQuotaCheckSetting {
  enabled: boolean;
  path?: string;
}

interface StandardCreditsQuotaEndpoint {
  preset: typeof STANDARD_CREDITS_QUOTA_PRESET;
  quotaPath: string;
  url: string;
  method: "GET";
  auth: CompatibleQuotaAuth;
  quotas: {
    credits: { remaining: string; total: string; used: string; displayName: string };
  };
}

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/** `openai-compatible-*` and `anthropic-compatible-*` (CC-compatible included). */
export function isCompatibleQuotaProvider(providerId: unknown): boolean {
  return (
    typeof providerId === "string" &&
    (providerId.startsWith(OPENAI_COMPATIBLE_PREFIX) ||
      providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
  );
}

/** Anthropic-compatible upstreams authenticate with `x-api-key`; everything else with Bearer. */
export function compatibleQuotaAuthFor(providerId: string): CompatibleQuotaAuth {
  return providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX) ? "x-api-key" : "bearer";
}

export function buildStandardCreditsQuotaEndpoint(
  baseUrl: string,
  quotaPath: string = DEFAULT_COMPATIBLE_QUOTA_PATH,
  auth: CompatibleQuotaAuth = "bearer"
): StandardCreditsQuotaEndpoint {
  const path = quotaPath.trim() || DEFAULT_COMPATIBLE_QUOTA_PATH;
  return {
    preset: STANDARD_CREDITS_QUOTA_PRESET,
    quotaPath: path,
    url: `${baseUrl.trim().replace(/\/+$/, "")}${path}`,
    method: "GET",
    auth,
    quotas: {
      credits: { remaining: "$.credits", total: "$.total", used: "$.used", displayName: "Credits" },
    },
  };
}

function presetEndpointOf(providerSpecificData: unknown): JsonRecord | null {
  const endpoint = asRecord(asRecord(providerSpecificData)?.quotaEndpoint);
  return endpoint?.preset === STANDARD_CREDITS_QUOTA_PRESET ? endpoint : null;
}

function presetPathOf(endpoint: JsonRecord): string {
  return typeof endpoint.quotaPath === "string" && endpoint.quotaPath
    ? endpoint.quotaPath
    : DEFAULT_COMPATIBLE_QUOTA_PATH;
}

/** Toggle state for a node, read off its connections: on when any carries the preset. */
export function readCompatibleQuotaCheck(
  connections: ReadonlyArray<{ providerSpecificData?: unknown }>
): { enabled: boolean; path: string } {
  for (const connection of connections) {
    const endpoint = presetEndpointOf(connection?.providerSpecificData);
    if (endpoint) return { enabled: true, path: presetPathOf(endpoint) };
  }
  return { enabled: false, path: DEFAULT_COMPATIBLE_QUOTA_PATH };
}

/**
 * Apply the node-level toggle to one connection's providerSpecificData (returns a copy).
 *
 * - A hand-written `quotaEndpoint` (no preset marker) always wins and is never touched.
 * - `setting` undefined (a client that does not send the toggle): an existing preset is
 *   regenerated so it follows a changed base URL; nothing is added.
 * - `enabled` writes the preset; disabled removes a preset.
 */
export function applyCompatibleQuotaCheck(
  providerSpecificData: JsonRecord,
  options: { setting?: CompatibleQuotaCheckSetting; baseUrl: string; auth: CompatibleQuotaAuth }
): JsonRecord {
  const current = providerSpecificData.quotaEndpoint;
  const preset = presetEndpointOf(providerSpecificData);
  if (current !== undefined && current !== null && !preset) return providerSpecificData;

  const { setting, baseUrl, auth } = options;
  const next = { ...providerSpecificData };
  if (setting ? setting.enabled : preset !== null) {
    const path = setting?.path || (preset ? presetPathOf(preset) : DEFAULT_COMPATIBLE_QUOTA_PATH);
    next.quotaEndpoint = buildStandardCreditsQuotaEndpoint(baseUrl, path, auth);
  } else {
    delete next.quotaEndpoint;
  }
  return next;
}

/**
 * A connection added to a node whose existing connections already use the preset gets the
 * same preset, so the node-level toggle keeps covering keys added after it was switched on.
 */
export function inheritCompatibleQuotaCheck(
  providerSpecificData: JsonRecord,
  siblings: ReadonlyArray<{ providerSpecificData?: unknown }>,
  options: { baseUrl: string; auth: CompatibleQuotaAuth }
): JsonRecord {
  if (providerSpecificData.quotaEndpoint !== undefined) return providerSpecificData;
  const state = readCompatibleQuotaCheck(siblings);
  if (!state.enabled) return providerSpecificData;
  return {
    ...providerSpecificData,
    quotaEndpoint: buildStandardCreditsQuotaEndpoint(options.baseUrl, state.path, options.auth),
  };
}
