import type { ClassifiedEndpoint } from "./types.ts";

export const EFFORT_TOKENS = ["high", "low", "medium", "xhigh", "max", "none", "minimal"] as const;
export type Effort = (typeof EFFORT_TOKENS)[number];

const EFFORT = new Set<string>(EFFORT_TOKENS);

/** Product words that look like suffixes but are never an effort tier. */
export const NOT_EFFORT = new Set([
  "flash", "pro", "mini", "nano", "turbo", "lite", "preview", "lightning", "fast", "thinking",
]);

/**
 * One quota surface per account group. agy is the same Google account pool as
 * antigravity; dv/dva/cpa-devin are the same Devin account as devin-desktop.
 */
export function quotaSurface(providerId: string): string {
  const id = providerId.toLowerCase();
  if (id === "agy") return "antigravity";
  if (id === "dv" || id === "dva" || id === "cpa-devin" || id === "cpa/devin") return "devin-desktop";
  return id;
}

/**
 * Class rank inside one exact model. Lower is earlier.
 * 0 native subscription, 1 same-model extra credit, 2 same-model cross-provider.
 * null means the provider is banned from this family.
 */
export function classRank(owner: string, providerId: string): number | null {
  const p = providerId.toLowerCase();
  if (owner === "gpt") {
    if (p === "codex" || p === "cx") return 0;
    if (p === "codex-app-server" || p === "cxa") return 0;
    if (p === "github" || p === "github-copilot" || p === "copilot" || p === "gh") return 1;
    if (p === "opencode-go" || p === "opencode") return 2;
    return null;
  }
  if (owner === "gemini") {
    if (p === "antigravity" || p === "agy" || p === "gemini-cli" || p === "gemini") return 0;
    return null;
  }
  if (owner === "claude") {
    if (p === "claude" || p === "cc") return 0;
    if (p === "github" || p === "github-copilot" || p === "copilot" || p === "gh") return 1;
    if (p === "antigravity" || p === "agy") return 2;
    return null;
  }
  if (owner === "swe") {
    if (p === "devin-desktop") return 0;
    return null;
  }
  return null;
}

export function orderEndpoints(owner: string, endpoints: ClassifiedEndpoint[]): ClassifiedEndpoint[] {
  const seen = new Set<string>();
  const kept: ClassifiedEndpoint[] = [];
  const ranked = endpoints
    .map((endpoint) => ({ endpoint, rank: classRank(owner, endpoint.endpoint.providerId) }))
    .filter((item): item is { endpoint: ClassifiedEndpoint; rank: number } => item.rank !== null)
    .sort((a, b) => {
      const surface = quotaSurface(a.endpoint.endpoint.providerId).localeCompare(quotaSurface(b.endpoint.endpoint.providerId));
      const canonical = Number(a.endpoint.endpoint.providerId !== quotaSurface(a.endpoint.endpoint.providerId)) - Number(b.endpoint.endpoint.providerId !== quotaSurface(b.endpoint.endpoint.providerId));
      return a.rank - b.rank || surface || canonical || a.endpoint.endpoint.providerId.localeCompare(b.endpoint.endpoint.providerId);
    });
  for (const item of ranked) {
    const surface = quotaSurface(item.endpoint.endpoint.providerId);
    if (seen.has(surface)) continue;
    seen.add(surface);
    kept.push(item.endpoint);
  }
  return kept;
}

export function effortOf(modelId: string): Effort | null {
  const leaf = modelId.slice(modelId.lastIndexOf("/") + 1).toLowerCase();
  const parts = leaf.split("-");
  const last = parts[parts.length - 1];
  return EFFORT.has(last) ? (last as Effort) : null;
}

export function stripEffort(modelId: string): string {
  const slash = modelId.lastIndexOf("/");
  const prefix = modelId.slice(0, slash + 1);
  const leaf = modelId.slice(slash + 1);
  const parts = leaf.split("-");
  if (EFFORT.has(parts[parts.length - 1]?.toLowerCase())) parts.pop();
  return prefix + parts.join("-");
}

/** The exact id a provider must serve for an effort alias: base plus one suffix. */
export function effortId(modelId: string, effort: Effort): string {
  return `${stripEffort(modelId)}-${effort}`;
}
