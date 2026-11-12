// Opt-in MOONSHOT_REGION_PROBE: Moonshot keys are tied to one region host. When the default
// host rejects the key as invalid (401/403), try the other host. If it accepts, hand back its
// base URL so it is saved with the connection and requests stop failing in the wrong region.
// A custom base URL is never rewritten.
const REGION_BASE_URLS = ["https://api.moonshot.cn/v1"];

type ValidationResult = {
  valid?: boolean;
  statusCode?: number;
  providerSpecificData?: Record<string, unknown> | null;
  [key: string]: unknown;
};

export function isMoonshotRegionProbeEnabled(): boolean {
  return /^(1|true|yes|on)$/i.test((process.env.MOONSHOT_REGION_PROBE || "").trim());
}

/** Runs `validate` against the other region hosts; returns the first accepted result, else `first`. */
export async function probeMoonshotRegions<R extends ValidationResult>(
  provider: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  first: R,
  validate: (providerSpecificData: Record<string, unknown>) => Promise<R>
): Promise<R> {
  if (!isMoonshotRegionProbeEnabled() || provider !== "moonshot") return first;
  if (
    first.valid ||
    (typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl)
  ) {
    return first;
  }
  // Only a rejected key points at the wrong region; a 5xx or network error says nothing.
  if (!isKeyRejection(first)) return first;
  for (const baseUrl of REGION_BASE_URLS) {
    const next = await validate({ ...(providerSpecificData || {}), baseUrl });
    if (next.valid) {
      return {
        ...next,
        providerSpecificData: { ...(next.providerSpecificData || {}), baseUrl },
      } as R;
    }
  }
  return first;
}

function isKeyRejection(result: ValidationResult): boolean {
  return /invalid api key|invalid authentication|unauthorized|forbidden/i.test(
    String(result.error ?? "")
  );
}
