import { getActiveSyncedCatalog } from "../../../src/lib/db/models/activeSyncedCatalog.ts";
import { getComboModelString } from "../../../src/lib/combos/steps.ts";
import { getModelSpec } from "../../../src/shared/constants/modelSpecs.ts";
import {
  resolveNativeReasoningFamily,
  supportsNativeReasoningFamilies,
  type NativeReasoningFamily,
  type NativeReasoningRow,
} from "../nativeReasoningFamilies.ts";

type ComboWithModels = { models?: unknown };
type CatalogLoader = (provider: string) => Promise<{ models: NativeReasoningRow[] }>;
/** Materialize before strategy scoring, availability checks, quota checks and dispatch. */
export async function materializeNativeReasoningCombos<T extends ComboWithModels>(
  combos: T[],
  body: Record<string, unknown>,
  loadCatalog: CatalogLoader = getActiveSyncedCatalog
): Promise<T[]> {
  const snapshots = new Map<string, ReturnType<CatalogLoader>>();
  return Promise.all(
    combos.map(async (combo) => {
      if (!Array.isArray(combo.models)) return combo;
      let changed = false;
      const models = await Promise.all(
        combo.models.map(async (entry) => {
          const address = getComboModelString(entry);
          if (!address) return entry;
          const separator = address.indexOf("/");
          const provider = address.slice(0, separator);
          const model = address.slice(separator + 1);
          if (separator < 0 || !supportsNativeReasoningFamilies(provider)) return entry;
          if (
            typeof entry === "object" &&
            entry.providerId &&
            !supportsNativeReasoningFamilies(entry.providerId)
          )
            return entry;
          if (!snapshots.has(provider)) snapshots.set(provider, loadCatalog(provider));
          const catalog = await snapshots.get(provider)!;
          const family = catalog.models.find(
            (row) => row.id === model && row.catalogOrigin === "reasoning-family"
          );
          if (!family) return entry;
          const choice = resolveNativeReasoningFamily(
            family as NativeReasoningFamily,
            body,
            getModelSpec(address)?.defaultReasoningEffort ||
              getModelSpec(model)?.defaultReasoningEffort
          );
          // Leave unsupported requests for the normal per-target error path; never substitute a tier.
          if (!choice.model) return entry;
          changed = true;
          return typeof entry === "string"
            ? `${provider}/${choice.model}`
            : { ...entry, model: `${provider}/${choice.model}` };
        })
      );
      return changed ? { ...combo, models } : combo;
    })
  );
}
