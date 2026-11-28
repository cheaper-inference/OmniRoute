/** Opt-in model aliases. Concrete upstream IDs always end with a native tier. */
const FAMILIES = new Map([
  ["gemini-3.8-flash", { name: "Gemini 3.8 Flash", defaultTier: "high" }],
  ["gemini-4-argon", { name: "Gemini 4 Argon", defaultTier: "medium" }],
  ["gemini-4-carbon", { name: "Gemini 4 Carbon", defaultTier: "medium" }],
  ["gemini-4-hydrogen", { name: "Gemini 4 Hydrogen", defaultTier: "high", xhigh: true }],
  ["claude-opus-5-5", { name: "Opus 5.5", defaultTier: "high" }],
]);
const TIERS = ["low", "medium", "high", "xhigh"] as const;

type CatalogRow = {
  id: string;
  name?: string;
  supportedInApi?: boolean;
  catalogOrigin?: string;
  visibility?: string;
  virtualModel?: string;
};
type CatalogAlias = {
  id: string;
  name: string;
  supportedInApi: true;
  source: "imported";
  virtualModel: "antigravity-client-effort";
  supportsThinking: true;
  supportedThinkingEfforts: string[];
};

type Choice = { model: string } | { error: "unsupported_reasoning_effort" };

export function antigravityClientEffortEnabled(): boolean {
  return (
    ["1", "true"].includes(process.env.ANTIGRAVITY_CLIENT_EFFORT_MODELS ?? "") &&
    !["1", "true"].includes(process.env.ANTIGRAVITY_EFFORT_TIER_SELECTION ?? "")
  );
}

export function isAntigravityClientEffortModel(id: string): boolean {
  return antigravityClientEffortEnabled() && FAMILIES.has(id);
}

function eligibleTiers(id: string, rows: readonly CatalogRow[]) {
  const family = FAMILIES.get(id);
  if (!family || rows.some((row) => row.id === id)) return [];
  const ids = new Set(rows.filter(isAdvertisedTier).map((row) => row.id));
  return TIERS.filter((tier) => (tier !== "xhigh" || family.xhigh) && ids.has(`${id}-${tier}`));
}

export function withAntigravityClientEffortModels<T extends CatalogRow>(
  rows: readonly T[],
  enabled = antigravityClientEffortEnabled()
): Array<T | CatalogAlias> {
  if (!enabled) return [...rows];
  const aliases = [...FAMILIES].flatMap<CatalogAlias>(([id, { name }]) => {
    const tiers = eligibleTiers(id, rows);
    return tiers.length
      ? [
          {
            id,
            name,
            supportedInApi: true,
            source: "imported",
            virtualModel: "antigravity-client-effort",
            supportsThinking: true,
            supportedThinkingEfforts: [...tiers],
          },
        ]
      : [];
  });
  return [...rows, ...aliases];
}

/** Use the Claude Code request level only for an optional unsuffixed model. */
export function selectAntigravityClientEffortModel(
  id: string,
  body: { output_config?: unknown },
  rows: readonly CatalogRow[],
  enabled = antigravityClientEffortEnabled()
): Choice | null {
  const family = FAMILIES.get(id);
  if (!enabled || !family || rows.some((row) => row.id === id)) return null;
  const tiers = eligibleTiers(id, rows);
  if (!tiers.length) return null;
  const output = body.output_config;
  const effort =
    output && typeof output === "object" && "effort" in output ? output.effort : undefined;
  if (effort !== undefined) {
    const tier = tiers.find((entry) => entry === effort);
    return tier ? { model: `${id}-${tier}` } : { error: "unsupported_reasoning_effort" };
  }
  const tier = [family.defaultTier, "high", "medium", "low", "xhigh"].find((candidate) =>
    tiers.some((entry) => entry === candidate)
  );
  return { model: `${id}-${tier}` };
}

function isAdvertisedTier(row: CatalogRow): boolean {
  return (
    row.supportedInApi !== false &&
    row.visibility !== "hide" &&
    row.catalogOrigin !== "registry" &&
    row.virtualModel !== "antigravity-client-effort"
  );
}

export type EffortAccount = { connectionId: string; models: readonly CatalogRow[] };

export function planAntigravityClientEffortRoute(
  id: string,
  body: { output_config?: unknown },
  accounts: readonly EffortAccount[],
  allowed: readonly string[] | null,
  enabled = antigravityClientEffortEnabled()
) {
  if (!enabled || !FAMILIES.has(id)) return null;
  const scope = allowed ? new Set(allowed) : null;
  const eligible = accounts.filter(({ connectionId }) => !scope || scope.has(connectionId));
  const choice = selectAntigravityClientEffortModel(
    id,
    body,
    eligible.flatMap(({ models }) => models),
    true
  );
  if (!choice || "error" in choice) return choice;
  return {
    ...choice,
    connectionIds: eligible
      .filter(({ models }) =>
        models.some((row) => row.id === choice.model && isAdvertisedTier(row))
      )
      .map(({ connectionId }) => connectionId),
  };
}
