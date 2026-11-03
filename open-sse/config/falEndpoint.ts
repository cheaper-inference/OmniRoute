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
  "veo3.1/lite": "fal-ai/veo3.1/lite",
  "ace-step": "fal-ai/ace-step",
};

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

export function falEditEndpoint(value: string): string {
  const endpoint = canonicalFalEndpoint(value);
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
