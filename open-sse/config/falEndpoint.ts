/** Legacy OmniRoute IDs are explicit aliases; qualified publisher IDs are opaque. */
const LEGACY_FAL_ENDPOINTS: Record<string, string> = {
  "flux-2-max": "fal-ai/flux-2-max",
  "flux-2-pro": "fal-ai/flux-2-pro",
  "flux-2-flex": "fal-ai/flux-2-flex",
  "flux-pro/v1.1": "fal-ai/flux-pro/v1.1",
  "flux-pro/v1.1-ultra": "fal-ai/flux-pro/v1.1-ultra",
  "flux/dev": "fal-ai/flux/dev",
  "flux/schnell": "fal-ai/flux/schnell",
  "ideogram/v3": "fal-ai/ideogram/v3",
  "bria/text-to-image/3.2": "fal-ai/bria/text-to-image/3.2",
  "bytedance/seedream/v4.5/text-to-image": "fal-ai/bytedance/seedream/v4.5/text-to-image",
  "bytedance/dreamina/v3.1/text-to-image": "fal-ai/bytedance/dreamina/v3.1/text-to-image",
  "recraft/v4/pro/text-to-image": "fal-ai/recraft/v4/pro/text-to-image",
  "recraft/v4/text-to-image": "fal-ai/recraft/v4/text-to-image",
  "stable-diffusion-v35-medium": "fal-ai/stable-diffusion-v35-medium",
  "nano-banana-pro": "fal-ai/nano-banana-pro",
  "nano-banana-2": "fal-ai/nano-banana-2",
  "veo3.1/lite": "fal-ai/veo3.1/lite",
  "ace-step": "fal-ai/ace-step",
};

/**
 * fal model ids are `<owner>/<app>[/path]`. First-party apps live under the
 * `fal-ai` owner; third-party vendors publish under their own owner namespace
 * (bytedance, alibaba, minimax, …).
 *
 * The previous code recognised only `fal-ai/`, `xai/` and `google/` as
 * already-owned and prefixed everything else with `fal-ai/`, which rewrote
 * `bytedance/seedance-2.5/text-to-video` to
 * `fal-ai/bytedance/seedance-2.5/text-to-video`. fal reads the first segment as
 * the app name, so it answered 404 “Application bytedance not found” — leaving
 * every vendor-owned model unreachable even when the registry lists the owner
 * and the account is entitled to it.
 *
 * Owners derived from fal's public video catalogue (24 namespaces, ~157 models
 * that were previously unreachable). Extend the set if fal adds a vendor.
 */
const FAL_VENDOR_OWNERS = new Set([
  "fal-ai",
  "alibaba",
  "argil",
  "blackforestlabs",
  "bria",
  "bytedance",
  "cassetteai",
  "clarityai",
  "creatify",
  "decart",
  "elevenlabs",
  "google",
  "lightricks",
  "luma",
  "minimax",
  "mirage-api",
  "mirelo-ai",
  "moonvalley",
  "nvidia",
  "pixelcut",
  "sonilo",
  "topaz",
  "veed",
  "wan",
  "xai",
]);

/**
 * fal expects `<owner>/<app>[/path]`. An id that already carries a vendor owner
 * is used verbatim; anything else is a first-party app that needs `fal-ai/`.
 */
export function falModelPath(resolvedModel: string): string {
  const owner = resolvedModel.split("/")[0];
  return FAL_VENDOR_OWNERS.has(owner) ? resolvedModel : `fal-ai/${resolvedModel}`;
}

export function isLegacyFalEndpoint(value: string): boolean {
  return value in LEGACY_FAL_ENDPOINTS || Object.values(LEGACY_FAL_ENDPOINTS).includes(value);
}

export function canonicalFalEndpoint(value: string): string {
  const endpoint = LEGACY_FAL_ENDPOINTS[value] ?? value;
  if (
    endpoint.length > 300 ||
    !/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_.-]+)+$/.test(endpoint) ||
    endpoint.split("/").some((segment) => segment === "." || segment === "..")
  ) {
    throw new Error("A fal endpoint must be an owner/app[/subpath] ID");
  }
  return endpoint;
}

/**
 * Compatibility routes receive a selection with its outer `fal-ai/` prefix removed, so a
 * first-party app (`aura-flow`, `kling-video/v2.1/pro/text-to-video`) arrives without an
 * owner. Only /v1/fal/run takes an opaque publisher ID.
 */
export function falSelectionEndpoint(value: string): string {
  if (value in LEGACY_FAL_ENDPOINTS) return LEGACY_FAL_ENDPOINTS[value];
  return canonicalFalEndpoint(value.startsWith("openai/") ? value : falModelPath(value));
}

export function falEditEndpoint(value: string): string {
  const endpoint = falSelectionEndpoint(value);
  if (endpoint.endsWith("/edit")) return endpoint;
  if (endpoint.endsWith("/text-to-image")) return endpoint.replace(/\/text-to-image$/, "/edit");
  // Only these historical aliases implied a separate /edit operation.
  if (/^fal-ai\/flux-2-(max|pro|flex)$/.test(endpoint)) return `${endpoint}/edit`;
  return endpoint;
}

// These transports are documented by fal's realtime guide, not inferred from category names.
const DOCUMENTED_REALTIME = new Set(["fal-ai/fast-lcm-diffusion"]);

export function falRealtimePath(definition: {
  endpoint_id: string;
  openapi: Record<string, unknown>;
}): string | null {
  const value = definition.openapi["x-fal-realtime"];
  const override = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const path =
    typeof override.path === "string"
      ? override.path
      : DOCUMENTED_REALTIME.has(definition.endpoint_id)
        ? "/realtime"
        : null;
  if (path === null) return null;
  if (!/^\/[a-zA-Z0-9_/-]+$/.test(path) || path.includes("//")) {
    throw new Error("Invalid documented fal realtime path");
  }
  return `${canonicalFalEndpoint(definition.endpoint_id)}${path}`;
}
