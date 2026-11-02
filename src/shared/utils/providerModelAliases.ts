type AliasMap = Record<string, string>;

function canUseAlias(alias: string, fullModel: string, existingAliases: AliasMap): boolean {
  return !(alias in existingAliases) || existingAliases[alias] === fullModel;
}

export function getDefaultModelAliasBase(modelId: string): string {
  const trimmed = modelId.trim();
  if (!trimmed) return "";

  const segments = trimmed
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  return segments[segments.length - 1] || trimmed;
}

function findSuffixedAlias(
  baseAlias: string,
  displayAlias: string,
  fullModel: string,
  existingAliases: AliasMap
): string | null {
  for (let suffix = 2; suffix <= 5000; suffix += 1) {
    if (displayAlias) {
      const prefixed = `${displayAlias}-${baseAlias}-${suffix}`;
      if (canUseAlias(prefixed, fullModel, existingAliases)) {
        return prefixed;
      }
    }

    const fallback = `${baseAlias}-${suffix}`;
    if (canUseAlias(fallback, fullModel, existingAliases)) {
      return fallback;
    }
  }
  return null;
}

export function resolveManagedModelAlias({
  modelId,
  fullModel,
  providerDisplayAlias,
  existingAliases,
}: {
  modelId: string;
  fullModel: string;
  providerDisplayAlias: string;
  existingAliases: AliasMap;
}): string | null {
  const baseAlias = getDefaultModelAliasBase(modelId);
  if (!baseAlias) return null;

  for (const [alias, value] of Object.entries(existingAliases)) {
    if (value === fullModel) return alias;
  }

  const displayAlias = providerDisplayAlias.trim();
  const candidates: string[] = [];
  const seen = new Set<string>();
  const pushCandidate = (candidate: string) => {
    const trimmed = candidate.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    candidates.push(trimmed);
  };

  pushCandidate(baseAlias);
  if (displayAlias) {
    pushCandidate(`${displayAlias}-${baseAlias}`);
  }

  for (const candidate of candidates) {
    if (canUseAlias(candidate, fullModel, existingAliases)) {
      return candidate;
    }
  }

  return findSuffixedAlias(baseAlias, displayAlias, fullModel, existingAliases);
}
