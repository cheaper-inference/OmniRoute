/** Virtual model families backed exclusively by an authenticated native-tier catalog. */
export const NATIVE_REASONING_EFFORTS = ["low", "medium", "high", "xhigh"] as const;
export type NativeReasoningEffort = (typeof NATIVE_REASONING_EFFORTS)[number];
export type NativeReasoningRow = {
  id: string;
  name?: string;
  supportedInApi?: boolean;
  catalogOrigin?: string;
  defaultThinkingEffort?: string;
  nativeReasoningVariants?: Partial<Record<NativeReasoningEffort, string>>;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  supportsVision?: boolean;
};
export type NativeReasoningFamily = NativeReasoningRow & {
  catalogOrigin: "reasoning-family";
  nativeReasoningVariants: Partial<Record<NativeReasoningEffort, string>>;
  supportedThinkingEfforts: NativeReasoningEffort[];
  defaultThinkingEffort: NativeReasoningEffort;
  supportsThinking: true;
  alwaysThinking: true;
};
export function supportsNativeReasoningFamilies(provider: string): boolean {
  return provider === "antigravity" || provider === "agy";
}

export function buildNativeReasoningFamilies<T extends NativeReasoningRow>(
  provider: string,
  models: readonly T[]
): Array<T & NativeReasoningFamily> {
  if (!supportsNativeReasoningFamilies(provider)) return [];
  const real = models.filter((model) => model.catalogOrigin !== "reasoning-family");
  const ids = new Set(real.map((model) => model.id));
  const groups = new Map<string, Map<NativeReasoningEffort, T>>();
  for (const model of real) {
    if (model.supportedInApi === false || model.catalogOrigin === "registry") continue;
    const match = /^(.*)-(low|medium|high|xhigh)$/.exec(model.id);
    if (!match || !/^(gemini-|claude-|gpt-oss-)/.test(match[1]) || ids.has(match[1])) continue;
    const group = groups.get(match[1]) ?? new Map<NativeReasoningEffort, T>();
    group.set(match[2] as NativeReasoningEffort, model);
    groups.set(match[1], group);
  }
  return [...groups].map(([id, rows]) => {
    const efforts = NATIVE_REASONING_EFFORTS.filter((effort) => rows.has(effort));
    const representative = rows.get(efforts[0])!;
    const legacyDefault = id === "gemini-4-argon" || id === "gpt-oss-120b" ? "medium" : "high";
    const defaults = efforts.map((effort) => rows.get(effort)!.defaultThinkingEffort);
    const preferred = defaults.every((value) => value === defaults[0])
      ? (defaults[0] ?? legacyDefault)
      : legacyDefault;
    const limit = (key: "inputTokenLimit" | "outputTokenLimit") => {
      const values = efforts.map((effort) => rows.get(effort)![key]);
      return values.every((value) => typeof value === "number" && value > 0)
        ? Math.min(...(values as number[]))
        : undefined;
    };
    const defaultEffort =
      efforts.find((effort) => effort === preferred) ??
      efforts.find((effort) => effort === "high") ??
      efforts[0];
    return {
      ...representative,
      id,
      inputTokenLimit: limit("inputTokenLimit"),
      outputTokenLimit: limit("outputTokenLimit"),
      supportsVision: efforts.every((effort) => rows.get(effort)!.supportsVision === true)
        ? true
        : undefined,
      name: (representative.name ?? id)
        .replace(/\s*\((?:low|medium|high|extra|xhigh)\)\s*$/i, "")
        .replace(/-(low|medium|high|xhigh)$/i, ""),
      catalogOrigin: "reasoning-family" as const,
      nativeReasoningVariants: Object.fromEntries(
        efforts.map((effort) => [effort, rows.get(effort)!.id])
      ),
      supportedThinkingEfforts: efforts,
      defaultThinkingEffort: defaultEffort,
      supportsThinking: true as const,
      alwaysThinking: true as const,
    };
  });
}

export function withNativeReasoningFamilies<T extends NativeReasoningRow>(
  provider: string,
  models: T[],
  isHidden?: (model: string) => boolean
): T[] {
  if (!supportsNativeReasoningFamilies(provider)) return models;
  const real = models.filter((model) => model.catalogOrigin !== "reasoning-family");
  const families = buildNativeReasoningFamilies(provider, real).flatMap((family) => {
    if (!isHidden) return [family];
    if (isHidden(family.id)) return [];
    const efforts = family.supportedThinkingEfforts.filter(
      (effort) => !isHidden(family.nativeReasoningVariants[effort]!)
    );
    if (!efforts.length) return [];
    return [
      {
        ...family,
        supportedThinkingEfforts: efforts,
        nativeReasoningVariants: Object.fromEntries(
          efforts.map((effort) => [effort, family.nativeReasoningVariants[effort]])
        ),
        defaultThinkingEffort: efforts.includes(family.defaultThinkingEffort)
          ? family.defaultThinkingEffort
          : efforts.includes("high")
            ? ("high" as const)
            : efforts[0],
      },
    ];
  });
  return [...real, ...families];
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
export function resolveNativeReasoningFamily(
  family: NativeReasoningFamily,
  body: Record<string, unknown>,
  configuredDefault?: string
): { model?: string; effort?: NativeReasoningEffort; error?: "unsupported_reasoning_effort" } {
  const raw =
    record(body.reasoning).effort ??
    body.reasoning_effort ??
    record(body.output_config).effort ??
    configuredDefault ??
    family.defaultThinkingEffort;
  const effort = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  const model = family.nativeReasoningVariants[effort as NativeReasoningEffort];
  if (!model) return { error: "unsupported_reasoning_effort" };
  return { model, effort: effort as NativeReasoningEffort };
}

function nativeReasoningVariantIds(
  provider: string,
  catalog: readonly NativeReasoningRow[]
): string[] {
  if (!supportsNativeReasoningFamilies(provider)) return [];
  return catalog
    .filter(
      (row) =>
        row.catalogOrigin !== "registry" &&
        row.supportedInApi !== false &&
        /^(?:gemini-|claude-|gpt-oss-).+-(low|medium|high|xhigh)$/.test(row.id)
    )
    .map((row) => row.id);
}

export function filterForcedReasoningModels<T extends NativeReasoningRow>(
  provider: string,
  models: T[],
  hide: boolean,
  catalog: readonly NativeReasoningRow[] = models
): T[] {
  if (!hide || !supportsNativeReasoningFamilies(provider)) return models;
  const hiddenIds = new Set(nativeReasoningVariantIds(provider, catalog));
  return models.filter((model) => !hiddenIds.has(model.id));
}

export function hideForcedReasoningModelsSetting(
  provider: string
): "antigravityHideForcedReasoningModels" | "agyHideForcedReasoningModels" | null {
  return provider === "antigravity"
    ? "antigravityHideForcedReasoningModels"
    : provider === "agy"
      ? "agyHideForcedReasoningModels"
      : null;
}

export function shouldHideForcedReasoningModel(
  provider: string,
  model: string,
  settings: Record<string, unknown>,
  catalogs: Record<string, NativeReasoningRow[]>
): boolean {
  const key = hideForcedReasoningModelsSetting(provider);
  if (!key || settings[key] !== true) return false;
  return nativeReasoningVariantIds(provider, catalogs[provider] || []).includes(model);
}

/** Preserve a native Gemini 4 tier on the final Cloud Code wire, including xhigh. */
export function applyNativeReasoningTierToEnvelope<T extends Record<string, unknown>>(
  body: T,
  model: string
): T {
  const match = /^gemini-4-.+-(low|medium|high|xhigh)$/.exec(model);
  if (!match) return body;
  const request = record(body.request);
  const generation = record(request.generationConfig);
  const thinking = { ...record(generation.thinkingConfig) };
  delete thinking.thinkingBudget;
  delete thinking.thinking_budget;
  thinking.thinkingLevel = match[1];
  if (thinking.includeThoughts !== false) thinking.includeThoughts = true;
  return {
    ...body,
    request: { ...request, generationConfig: { ...generation, thinkingConfig: thinking } },
  };
}
