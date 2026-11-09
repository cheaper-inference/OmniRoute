// Compatibility exports for model-permission helpers plus the runtime settings adapter.
// Authorization matching lives in the domain layer; settings access remains here.

export {
  CLAUDE_CODE_PROVIDER_PREFIXES,
  CLAUDE_CODE_SHORT_ALIASES,
  stripExtendedContextSuffix,
  isPotentialUnprefixedClaudeCodeModel,
  addModelCandidate,
  addProviderAliasScopedCandidates,
  modelPatternMatches,
  hasClaudeCodeWildcardPermission,
  matchesWildcardPattern,
  segmentMatchesWildcard,
} from "@/domain/modelPermissions";

export function isTruthyEnvFlag(value: string | undefined): boolean {
  return typeof value === "string" && /^(1|true|yes|on)$/i.test(value.trim());
}

export async function preferClaudeCodeForUnprefixedClaudeModels(): Promise<boolean> {
  try {
    const { getCachedSettings } = await import("../readCache");
    const settings = await getCachedSettings();
    if (typeof settings.preferClaudeCodeForUnprefixedClaudeModels === "boolean") {
      return settings.preferClaudeCodeForUnprefixedClaudeModels;
    }
  } catch {
    // Standalone DB usage may not have the settings cache ready.
  }
  return isTruthyEnvFlag(process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS);
}
