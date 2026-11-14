import type { ClassifiedEndpoint, LineageIdentity, LocalEndpoint, MetadataRecord } from "./types.ts";
import { parseVersionIdentity } from "./version.ts";

const OWNER_PREFIXES: Record<string, string> = {
  anthropic: "claude",
  claude: "claude",
  openai: "gpt",
  codex: "gpt",
  moonshot: "moonshot",
  deepseek: "deepseek",
  qwen: "qwen",
  minimax: "minimax",
  google: "gemini",
  gemini: "gemini",
  xai: "grok",
  grok: "grok",
  mistral: "mistral",
};

const KNOWN_LINES: Record<string, string> = {
  fable: "claude",
  opus: "claude",
  sonnet: "claude",
  haiku: "claude",
  astra: "gpt",
  sol: "gpt",
  terra: "gpt",
  luna: "gpt",
  hydrogen: "gpt",
};

const MODALITY_TOKENS = new Set(["coder", "code", "vl", "vision", "instruct"]);
const REASONING_TOKENS = new Set(["thinking", "low", "medium", "high", "xhigh", "none"]);
const TRANSPORT_TOKENS = new Set(["cc", "gh", "cpa", "agy", "cxa", "openai", "anthropic"]);

function tokens(modelId: string): string[] {
  return modelId
    .toLowerCase()
    .replace(/_/g, "-")
    .split(/[^a-z0-9.]+/)
    .filter(Boolean)
    .flatMap((token) => {
      const match = /^([a-z][a-z-]*)(\d+(?:\.\d+)*)$/.exec(token);
      return match ? [match[1], match[2]] : [token];
    });
}

function lineageFromFamilyId(familyId: string): LineageIdentity | null {
  const parts = familyId.toLowerCase().split("/").filter(Boolean);
  if (parts.length < 2) return null;
  return { owner: parts[0], line: parts[1], modality: parts[2] ?? null };
}

function conservativeLineage(modelTokens: string[], endpoint: LocalEndpoint): LineageIdentity | null {
  for (const token of modelTokens) {
    const owner = KNOWN_LINES[token];
    if (owner) return { owner, line: token };
  }

  const providerOwner = OWNER_PREFIXES[endpoint.providerId.toLowerCase()];
  if (!providerOwner) return null;

  // Branded lines remain distinct by product token and modality.
  const brandToken = modelTokens.find(
    (token) =>
      token === providerOwner &&
      !TRANSPORT_TOKENS.has(token),
  );
  if (!brandToken) return null;
  const modality = modelTokens.find((token) => MODALITY_TOKENS.has(token)) ?? null;
  return { owner: providerOwner, line: brandToken, modality };
}

export function classifyLocalEndpoint(
  endpoint: LocalEndpoint,
  metadata?: MetadataRecord | null,
): ClassifiedEndpoint | null {
  const modelTokens = tokens(endpoint.modelId);
  const lineage = endpoint.localFamilyId
    ? lineageFromFamilyId(endpoint.localFamilyId)
    : metadata?.familyId
      ? lineageFromFamilyId(metadata.familyId)
      : conservativeLineage(modelTokens, endpoint);
  if (!lineage) return null;

  const version = parseVersionIdentity(modelTokens);
  if (!version) return null;

  return {
    endpoint,
    lineage,
    version,
    isReasoningVariant: modelTokens.some((token) => REASONING_TOKENS.has(token)),
  };
}
