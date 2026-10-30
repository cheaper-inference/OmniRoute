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
  const entry = getRegistryEntry(provider);
  const psd = providerSpecificData || {};
  const baseUrl = resolveBaseUrl(
    { ...entry, baseUrl: entry?.testKeyBaseUrl || entry?.baseUrl },
    psd
  );
  const overrideModelsUrl = typeof psd.modelsUrl === "string" ? psd.modelsUrl.trim() : "";
  const modelsUrl =
    overrideModelsUrl || entry?.testKeyModelsUrl || entry?.modelsUrl || addModelsSuffix(baseUrl);

  try {
    const response = await validationRead(
      modelsUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
          ...buildOpencodeBackgroundHeaders({ seed: readWorkspaceSeed(psd) }),
        },
      },
      isLocal
    );

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
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}
