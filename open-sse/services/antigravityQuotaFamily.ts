const ANTIGRAVITY_PROVIDER_ID = "antigravity";

export type AntigravityQuotaFamily = "gemini" | "claude" | "argon" | "other";

function normalizeModelId(model: string | null | undefined): string {
  return String(model || "")
    .trim()
    .toLowerCase();
}

/**
 * Classify Antigravity models by the quota bucket Google Cloud Code/Antigravity
 * appears to enforce. This is intentionally conservative:
 * - gemini-* / google/gemini-* variants share the Gemini family quota.
 * - claude-* and legacy cloud-* aliases are treated as the Claude/Cloud family.
 * - unknown models remain exact-model scoped for compatibility.
 */
export function getAntigravityQuotaFamily(
  model: string | null | undefined
): AntigravityQuotaFamily {
  const normalized = normalizeModelId(model).replace(/^(antigravity|agy)\//, "");
  const slashIndex = normalized.indexOf("/");
  const bare = slashIndex >= 0 ? normalized.slice(slashIndex + 1) : normalized;

  if (
    bare === "argon_weekly" ||
    bare === "gemini_4_argon_weekly" ||
    bare.includes("argon") ||
    bare.startsWith("gemini-4")
  ) {
    return "argon";
  }
  if (bare.startsWith("gemini-") || bare.includes("/gemini-") || bare.includes("gemini")) {
    return "gemini";
  }
  if (
    bare.startsWith("claude-") ||
    bare.startsWith("cloud-") ||
    bare.includes("/claude-") ||
    bare.includes("/cloud-") ||
    bare.includes("anthropic")
  ) {
    return "claude";
  }
  return "other";
}

export function getQuotaScopedModelForProvider(
  provider: string | null | undefined,
  model: string | null | undefined
): string | null {
  if (!model) return null;
  if (provider !== "antigravity" && provider !== "agy") return model;
  const family = getAntigravityQuotaFamily(model);
  return family === "other" ? model : `family:${family}`;
}

export function getQuotaScopeLabelForProvider(
  provider: string | null | undefined,
  model: string | null | undefined
): string {
  if (provider !== "antigravity" && provider !== "agy") return "model";
  return getAntigravityQuotaFamily(model) === "other" ? "model" : "family";
}

export function getQuotaFetchScope(
  provider: string | null | undefined,
  model: string | null | undefined
): string {
  if (provider !== "antigravity" && provider !== "agy") return "*";
  return getQuotaScopedModelForProvider(provider, model) ?? "*";
}

export function isAntigravityQuotaProvider(provider: string | null | undefined): boolean {
  return provider === "antigravity" || provider === "agy";
}

export function quotaWindowNamesForScope(
  names: string[],
  scope?: { provider?: string | null; requestedModel?: string | null }
): string[] {
  if (!scope?.requestedModel || !isAntigravityQuotaProvider(scope.provider)) return names;
  const scoped = selectAntigravityQuotaWindowNames(names, scope.requestedModel);
  if (scoped.length > 0) return scoped;
  // Argon has its own pool: a window set with neither Argon nor Gemini buckets says nothing
  // about it, so scan none (fail open). Gemini and Claude keep the shipped all-windows fallback.
  if (getAntigravityQuotaFamily(scope.requestedModel) === "argon") return [];
  return names;
}

/**
 * Finite `percentUsed` from a raw quota field, or `null` when it is absent, blank or
 * non-numeric. `Number(null)`, `Number("")`, `Number(" ")` and `Number(false)` are all 0,
 * which would read an unreported window as "0% used" (#15347).
 */
export function finitePercentUsed(raw: unknown): number | null {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (typeof raw === "string" && raw.trim() !== "") {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/** Min remaining % across scoped windows, or 100 when an Antigravity family scope matched none. */
export function remainingPercentFromQuotaWindows(
  rawWindows: Record<string, unknown>,
  scope?: { provider?: string | null; requestedModel?: string | null }
): number | null {
  const names = Object.keys(rawWindows);
  const namesToScan = quotaWindowNamesForScope(names, scope);
  let minRemaining: number | null = null;
  for (const name of namesToScan) {
    const windowInfo = rawWindows[name];
    if (!windowInfo || typeof windowInfo !== "object") continue;
    const percentUsed = finitePercentUsed((windowInfo as Record<string, unknown>).percentUsed);
    if (percentUsed === null) continue;
    const remaining = Math.max(0, Math.min(100, (1 - percentUsed) * 100));
    minRemaining = minRemaining === null ? remaining : Math.min(minRemaining, remaining);
  }
  if (minRemaining !== null) return minRemaining;
  if (scope?.requestedModel && namesToScan !== names) return 100;
  return null;
}

const FAMILY_AGGREGATE_WINDOWS: Record<AntigravityQuotaFamily, string[]> = {
  gemini: ["gemini_session", "gemini_weekly"],
  claude: ["claude_gpt_session", "claude_gpt_weekly"],
  argon: ["gemini_4_argon_weekly", "argon_weekly"],
  other: [],
};

/**
 * Argon with no dedicated Argon window (e.g. Ultra plans) draws from the Gemini pool:
 * prefer the Gemini aggregates, then any Gemini-family window.
 */
function argonFallbackWindowNames(quotaNames: string[]): string[] {
  const geminiAggregates = FAMILY_AGGREGATE_WINDOWS.gemini.filter((key) =>
    quotaNames.includes(key)
  );
  if (geminiAggregates.length > 0) return geminiAggregates;
  return quotaNames.filter((windowName) => getAntigravityQuotaFamily(windowName) === "gemini");
}

/**
 * Windows that belong to the requested Antigravity family. Claude weekly must
 * not ride along on a Gemini request (and the reverse).
 */
export function selectAntigravityQuotaWindowNames(
  quotaNames: string[],
  requestedModel: string | null | undefined
): string[] {
  if (!requestedModel) return quotaNames;
  const requestedFamily = getAntigravityQuotaFamily(requestedModel);
  const cleanRequestedModel = requestedModel.replace(/^(antigravity|agy)\//, "");
  const bareModel = cleanRequestedModel.includes("/")
    ? cleanRequestedModel.slice(cleanRequestedModel.lastIndexOf("/") + 1)
    : cleanRequestedModel;

  if (requestedFamily === "other") {
    return quotaNames.filter((windowName) => {
      const bare = windowName.replace(/^(antigravity|agy)\//, "");
      return bare === bareModel || bare === cleanRequestedModel;
    });
  }

  const familyAggregates = FAMILY_AGGREGATE_WINDOWS[requestedFamily];

  let exactWindows = quotaNames.filter((windowName) => {
    const bare = windowName.replace(/^(antigravity|agy)\//, "");
    return bare === bareModel;
  });

  // Live Antigravity discovery can expose a stable public Flash id while quota
  // telemetry is keyed by the technical `-tiered` upstream id. Only fall back
  // to that technical bucket when the exact public bucket is absent, so an
  // unrelated Gemini sibling can never dilute exact-model exhaustion. This is
  // intentionally version-agnostic for newly discovered Gemini Flash releases.
  if (exactWindows.length === 0) {
    const flashMatch = bareModel.match(/^(gemini-\d+(?:\.\d+)*-flash)(?:-(?:high|medium|low))?$/);
    if (flashMatch) {
      const technicalTieredModel = `${flashMatch[1]}-tiered`;
      exactWindows = quotaNames.filter((windowName) => {
        const bare = windowName.replace(/^(antigravity|agy)\//, "");
        return bare === technicalTieredModel;
      });
    }
  }

  const aggregateWindows = familyAggregates.filter((key) => quotaNames.includes(key));
  const scoped = [...exactWindows, ...aggregateWindows];
  if (scoped.length > 0) return scoped;
  if (requestedFamily === "argon") return argonFallbackWindowNames(quotaNames);

  return quotaNames.filter(
    (windowName) => getAntigravityQuotaFamily(windowName) === requestedFamily
  );
}
