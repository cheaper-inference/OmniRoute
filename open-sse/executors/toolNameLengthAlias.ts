import { getRegistryEntry } from "../config/providerRegistry.ts";
import { normalizeOpenAIToolNames } from "../translator/helpers/toolCallHelper.ts";

/**
 * Rewrites every over-limit (or otherwise invalid) tool name in `body` in place and
 * returns the alias → original entries it created. The default handles OpenAI Chat
 * Completions bodies; a surface with a different tool shape (e.g. Responses API flat
 * `tools[].name`) passes its own normalizer.
 */
export type ToolNameNormalizer = (body: unknown, maxLength: number) => Map<string, string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Merges `aliases` into the request-scoped `_toolNameMap` side channel that chatCore
 * consumes to restore the original names in streaming and non-streaming responses.
 * The map is replaced (never mutated, since an upstream step may share it) and kept
 * non-enumerable so it never serializes into the upstream payload.
 */
export function mergeToolNameAliases(
  body: Record<string, unknown>,
  aliases: Map<string, string>
): void {
  if (aliases.size === 0) return;
  const merged =
    body._toolNameMap instanceof Map
      ? new Map(body._toolNameMap as Map<string, string>)
      : new Map<string, string>();
  for (const [alias, original] of aliases) {
    merged.set(alias, original);
  }
  Object.defineProperty(body, "_toolNameMap", {
    value: merged,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

/**
 * Shortens tool names that exceed `maxLength` with a deterministic, collision-safe
 * alias and records alias → original on the body for response restoration.
 * A missing or non-positive-integer limit is a no-op. Returns only the aliases added
 * by this call.
 */
export function applyToolNameLengthAliases(
  body: unknown,
  maxLength: number | null | undefined,
  normalize: ToolNameNormalizer = normalizeOpenAIToolNames
): Map<string, string> {
  if (!isRecord(body) || !Number.isInteger(maxLength) || (maxLength as number) < 1) {
    return new Map();
  }
  const aliases = normalize(body, maxLength as number);
  mergeToolNameAliases(body, aliases);
  return aliases;
}

/** Applies the provider's registry-declared `toolNameMaxLength`, if any. */
export function applyRegistryToolNameLengthAliases(
  provider: string,
  body: unknown,
  normalize?: ToolNameNormalizer
): Map<string, string> {
  return applyToolNameLengthAliases(body, getRegistryEntry(provider)?.toolNameMaxLength, normalize);
}

/**
 * The registry `toolNameMaxLength`, else the connection's
 * `providerSpecificData.toolNameMaxLength`: custom OpenAI chat-format compatible nodes never
 * have a registry entry, so this is how they opt in for a stricter upstream.
 */
export function resolveToolNameMaxLength(
  provider: string,
  providerSpecificData: unknown
): number | undefined {
  const connectionLimit = isRecord(providerSpecificData)
    ? providerSpecificData.toolNameMaxLength
    : undefined;
  return getRegistryEntry(provider)?.toolNameMaxLength ?? (connectionLimit as number | undefined);
}

/**
 * OpenCode chat-completions 400s on tool names over 64 chars (Claude Code MCP names
 * hit this). Called last, on the final body, so the request-scoped `_toolNameMap`
 * restores the originals in the response. Only the OpenAI chat surface is aliased;
 * Claude / Responses surfaces carry their own tool shapes and are left alone.
 */
export function applyOpencodeToolNameLengthAliases(
  provider: string,
  body: unknown,
  targetFormat: string
): void {
  if (targetFormat === "openai") applyRegistryToolNameLengthAliases(provider, body);
}
