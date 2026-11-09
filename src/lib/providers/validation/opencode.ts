import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  isOpencodeFreeTierRefusal,
  isOpencodeGeoBlocked,
  isOpencodeUserBlocked,
} from "@omniroute/open-sse/executors/opencodeGeoBlock.ts";
import { isCloudflareFingerprintRejection } from "@omniroute/open-sse/services/errorClassifier.ts";
import { buildOpencodeBackgroundHeaders } from "@omniroute/open-sse/utils/opencodeHeaders.ts";
import { addModelsSuffix, resolveBaseUrl } from "./urlHelpers";
import { toValidationErrorResult, validationRead } from "./transport";

/** Workspace seed for the background identity — the same keys discovery reads. */
function readWorkspaceSeed(providerSpecificData: unknown): string | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const record = providerSpecificData as Record<string, unknown>;
  for (const key of ["openCodeGoWorkspaceId", "opencodeGoWorkspaceId", "workspaceId"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return null;
}

/** 403/451 that refuses the client identity or request shape, never the key itself. */
function isOpencodeRequestRefusal(status: number, body: string): boolean {
  return (
    isOpencodeFreeTierRefusal(status, body) ||
    isOpencodeGeoBlocked(status, body) ||
    isOpencodeUserBlocked(status, body) ||
    isCloudflareFingerprintRejection(body)
  );
}

type OpencodeProbeResult = {
  valid: boolean;
  error: string | null;
  warning?: string;
};

/** Catalog URL for the Test: an explicit override, else the registry's test/models URL. */
function resolveOpencodeModelsUrl(provider: string, psd: Record<string, unknown>): string {
  const entry = getRegistryEntry(provider);
  const baseUrl = resolveBaseUrl(
    { ...entry, baseUrl: entry?.testKeyBaseUrl || entry?.baseUrl },
    psd
  );
  const overrideModelsUrl = typeof psd.modelsUrl === "string" ? psd.modelsUrl.trim() : "";
  return (
    overrideModelsUrl || entry?.testKeyModelsUrl || entry?.modelsUrl || addModelsSuffix(baseUrl)
  );
}

/** `x-api-key` auth plus the discovery CLI identity; never a bearer (#17996). */
function buildOpencodeProbeHeaders(
  apiKey: string | undefined,
  psd: Record<string, unknown>
): Record<string, string> {
  return {
    Accept: "application/json",
    ...(apiKey ? { "x-api-key": apiKey } : {}),
    ...buildOpencodeBackgroundHeaders({ seed: readWorkspaceSeed(psd) }),
  };
}

/** Maps the catalog probe response to a validation result. */
async function mapOpencodeProbeResponse(response: Response): Promise<OpencodeProbeResult> {
  if (response.ok) return { valid: true, error: null };
  if (response.status === 401) return { valid: false, error: "Invalid API key" };

  if (response.status === 403 || response.status === 451) {
    const body = await response.text().catch(() => "");
    if (isOpencodeRequestRefusal(response.status, body)) {
      return {
        valid: false,
        error: `OpenCode refused this client's identity (${response.status}); the API key was not rejected`,
      };
    }
    return { valid: false, error: "Invalid API key" };
  }

  if (response.status === 429) {
    return {
      valid: true,
      error: null,
      warning: "Provider accepted the key but is rate limited (429)",
    };
  }

  if (response.status >= 500) {
    return { valid: false, error: `Provider unavailable (${response.status})` };
  }

  return { valid: false, error: `Validation failed: ${response.status}` };
}

/**
 * Connection test for the OpenCode family (opencode-zen, opencode-go).
 *
 * Probes the model catalog with the exact request shape model discovery uses
 * (`buildOpencodeModelsDiscoveryEntry` in providerModelsConfig.ts): the OpenCode
 * CLI identity from `buildOpencodeBackgroundHeaders()` and `x-api-key` auth, which
 * the catalog accepts where a bearer answers 401 (#17996). The URL is unchanged
 * from the generic probe (opencode-go validates on zen/v1, #532).
 *
 * There is deliberately no chat fallback: the registry's first model is a
 * free-tier model, which the keyed `/zen/v1` lane refuses with 403 FreeTierError
 * no matter how valid the key is, so the generic OpenAI-like chat probe used to
 * turn that refusal into "Invalid API key".
 */
export async function validateOpencodeProvider({
  provider,
  apiKey,
  providerSpecificData = {},
  isLocal = false,
}: {
  provider: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown> | null;
  isLocal?: boolean;
}) {
  const psd = providerSpecificData || {};
  try {
    const response = await validationRead(
      resolveOpencodeModelsUrl(provider, psd),
      { method: "GET", headers: buildOpencodeProbeHeaders(apiKey, psd) },
      isLocal
    );
    return await mapOpencodeProbeResponse(response);
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}
