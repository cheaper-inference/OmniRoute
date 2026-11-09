import { getProviderModels } from "@omniroute/open-sse/config/providerModels.ts";
import {
  CODEX_SPARK_MODEL_ID,
  getCodexModelScope,
  getCodexQuotaWindowFilterForModel,
  isCodexSparkQuotaKey,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import {
  getAntigravityQuotaFamily,
  selectAntigravityQuotaWindowNames,
} from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import {
  claudeQuotaMatchesModel,
  isClaudeQuotaMetadata,
} from "@omniroute/open-sse/services/usage/claudeQuota.ts";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";

export interface AvailabilityScopeInput {
  id: string;
  kind: "account" | "group" | "scoped";
  model: string;
  models?: string[];
  windows: string[];
}

type Catalog = string[];
function ordinaryModel(
  provider: string,
  catalog: Catalog,
  usage: Partial<ProviderLimitsCacheEntry>
): string | undefined {
  if (provider === "codex") return catalog.find((model) => getCodexModelScope(model) === "codex");
  if (provider === "openrouter") return catalog.find((model) => !model.endsWith(":free"));
  if (provider !== "claude" && provider !== "anthropic") return undefined;
  return catalog.find((model) =>
    Object.values(usage.modelQuotas || {}).every((value) => {
      const metadata = (value as { claudeQuota?: unknown })?.claudeQuota;
      return !isClaudeQuotaMetadata(metadata) || !claudeQuotaMatchesModel(metadata, model);
    })
  );
}
function appendOrdinaryScope(
  scopes: AvailabilityScopeInput[],
  provider: string,
  usage: Partial<ProviderLimitsCacheEntry>,
  catalog: Catalog
) {
  const model = ordinaryModel(provider, catalog, usage);
  if (!model) return;
  const names = Object.keys(usage.quotas || {});
  const filter = provider === "codex" ? getCodexQuotaWindowFilterForModel(model) : undefined;
  scopes.push({
    id: "account",
    kind: "account",
    model,
    windows: filter ? names.filter(filter) : names,
  });
}
function appendSpecialScopes(
  scopes: AvailabilityScopeInput[],
  provider: string,
  usage: Partial<ProviderLimitsCacheEntry>,
  catalog: Catalog
) {
  const names = Object.keys(usage.quotas || {});
  if (provider === "openrouter" && names.some((name) => ["free_daily", "free_rpm"].includes(name)))
    scopes.push({
      id: ":free",
      kind: "scoped",
      model: catalog.find((model) => model.endsWith(":free")) || ":free",
      windows: names.filter((name) => ["free_daily", "free_rpm"].includes(name)),
    });
  if (provider === "codex" && names.some(isCodexSparkQuotaKey))
    scopes.push({
      id: "spark",
      kind: "scoped",
      model: CODEX_SPARK_MODEL_ID,
      windows: names.filter(isCodexSparkQuotaKey),
    });
  if (provider === "codex" && names.some((name) => /^code_review/.test(name)))
    scopes.push({
      id: "code_review",
      kind: "scoped",
      model: "code_review",
      windows: names.filter((name) => /^code_review/.test(name)),
    });
}
function appendClaudeScopes(
  scopes: AvailabilityScopeInput[],
  provider: string,
  usage: Partial<ProviderLimitsCacheEntry>,
  catalog: Catalog
) {
  if (provider !== "claude" && provider !== "anthropic") return;
  for (const [id, value] of Object.entries(usage.modelQuotas || {})) {
    const metadata = (value as { claudeQuota?: unknown })?.claudeQuota;
    if (!isClaudeQuotaMetadata(metadata)) continue;
    const model =
      metadata.modelId || catalog.find((candidate) => claudeQuotaMatchesModel(metadata, candidate));
    if (model) scopes.push({ id, kind: "scoped", model, windows: [id] });
  }
}
function hasFamilyEvidence(names: string[], familyCooldowns: unknown): boolean {
  return (
    names.some(
      (name) => /^(gemini|claude_gpt)_/.test(name) || getAntigravityQuotaFamily(name) !== "other"
    ) ||
    (familyCooldowns !== null &&
      typeof familyCooldowns === "object" &&
      !Array.isArray(familyCooldowns) &&
      ["gemini", "claude"].some((family) => Object.hasOwn(familyCooldowns, family)))
  );
}
function inferredGroups(names: string[], catalog: Catalog, familyCooldowns: unknown) {
  if (!hasFamilyEvidence(names, familyCooldowns)) return [];
  return ["gemini", "claude"].flatMap((family) => {
    const familyModels = catalog.filter((model) => getAntigravityQuotaFamily(model) === family);
    if (!familyModels.length) return [];
    const observed = names.filter(
      (name) => !/^(gemini|claude_gpt)_/.test(name) && getAntigravityQuotaFamily(name) === family
    );
    return [
      {
        id: family === "claude" ? "claude_gpt" : family,
        models: observed.length ? observed : familyModels,
      },
    ];
  });
}
function appendAntigravityScopes(
  scopes: AvailabilityScopeInput[],
  provider: string,
  usage: Partial<ProviderLimitsCacheEntry>,
  catalog: Catalog,
  familyCooldowns: unknown
) {
  if (provider !== "antigravity" && provider !== "agy") return;
  const names = Object.keys(usage.quotas || {});
  const groups = usage.quotaGroups?.length
    ? usage.quotaGroups
    : inferredGroups(names, catalog, familyCooldowns);
  for (const group of groups) {
    const id = String(group.id);
    const models = Array.isArray(group.models)
      ? group.models.filter((model): model is string => typeof model === "string")
      : [];
    const family = id === "claude_gpt" ? "claude" : id;
    const alternatives = [
      ...new Set(
        models.length
          ? models
          : [...names, ...catalog].filter(
              (model) =>
                !/_(session|weekly)$/.test(model) && getAntigravityQuotaFamily(model) === family
            )
      ),
    ].sort();
    const model = alternatives[0];
    if (model)
      scopes.push({
        id,
        kind: "group",
        model,
        models: alternatives,
        windows: names.filter((name) => name.startsWith(`${id}_`)),
      });
  }
  for (const name of names) {
    if (/_((session)|(weekly))$/.test(name)) continue;
    scopes.push({
      id: name,
      kind: "scoped",
      model: name,
      windows: selectAntigravityQuotaWindowNames(names, name),
    });
  }
}
/** Representatives are discovered from observations or the router's model/scope catalog. */
export function availabilityScopes(
  provider: string,
  usage: Partial<ProviderLimitsCacheEntry>,
  familyCooldowns: unknown = undefined
): AvailabilityScopeInput[] {
  const scopes: AvailabilityScopeInput[] = [];
  const catalog = getProviderModels(provider).map((model) => model.id);
  appendOrdinaryScope(scopes, provider, usage, catalog);
  appendSpecialScopes(scopes, provider, usage, catalog);
  appendClaudeScopes(scopes, provider, usage, catalog);
  appendAntigravityScopes(scopes, provider, usage, catalog, familyCooldowns);
  return scopes;
}
