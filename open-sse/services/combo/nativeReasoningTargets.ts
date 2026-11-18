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
/** Whether the operator left this combo address visible (same check the target filter runs). */
type AddressVisibility = (address: string, providerId: string) => boolean;
type MaterializeContext = {
  body: Record<string, unknown>;
  loadCatalog: CatalogLoader;
  isVisible?: AddressVisibility;
  snapshots: Map<string, ReturnType<CatalogLoader>>;
};

function explicitProviderId(entry: unknown): string | null {
  if (!entry || typeof entry !== "object") return null;
  const providerId = (entry as { providerId?: unknown }).providerId;
  return typeof providerId === "string" && providerId ? providerId : null;
}

/** The concrete tier address for one combo entry, or null to leave the entry unchanged. */
async function materializeEntryAddress(
  entry: unknown,
  context: MaterializeContext
): Promise<string | null> {
  const address = getComboModelString(entry);
  if (!address) return null;
  const separator = address.indexOf("/");
  if (separator < 0) return null;
  const provider = address.slice(0, separator);
  const model = address.slice(separator + 1);
  if (!supportsNativeReasoningFamilies(provider)) return null;
  const providerId = explicitProviderId(entry);
  if (providerId && !supportsNativeReasoningFamilies(providerId)) return null;
  // A family the operator hid stays as written, so the regular visibility filter drops
  // it instead of a visible tier silently standing in for it.
  if (context.isVisible && !context.isVisible(address, providerId || provider)) return null;
  if (!context.snapshots.has(provider)) {
    context.snapshots.set(provider, context.loadCatalog(provider));
  }
  const catalog = await context.snapshots.get(provider)!;
  const family = catalog.models.find(
    (row) => row.id === model && row.catalogOrigin === "reasoning-family"
  );
  if (!family) return null;
  const choice = resolveNativeReasoningFamily(
    family as NativeReasoningFamily,
    context.body,
    getModelSpec(address)?.defaultReasoningEffort || getModelSpec(model)?.defaultReasoningEffort
  );
  // Leave unsupported requests for the normal per-target error path; never substitute a tier.
  return choice.model ? `${provider}/${choice.model}` : null;
}

/** Materialize before strategy scoring, availability checks, quota checks and dispatch. */
export async function materializeNativeReasoningCombos<T extends ComboWithModels>(
  combos: T[],
  body: Record<string, unknown>,
  loadCatalog: CatalogLoader = getActiveSyncedCatalog,
  isVisible?: AddressVisibility
): Promise<T[]> {
  const context: MaterializeContext = { body, loadCatalog, isVisible, snapshots: new Map() };
  return Promise.all(
    combos.map(async (combo) => {
      if (!Array.isArray(combo.models)) return combo;
      let changed = false;
      const models = await Promise.all(
        combo.models.map(async (entry) => {
          const concrete = await materializeEntryAddress(entry, context);
          if (!concrete) return entry;
          changed = true;
          return typeof entry === "string" ? concrete : { ...entry, model: concrete };
        })
      );
      return changed ? { ...combo, models } : combo;
    })
  );
}

type ComboCollection<T> = T[] | { combos?: T[] } | null | undefined;

/**
 * Materialize the request's combo and the nested combos it may reference in one pass,
 * keeping the collection's original shape.
 */
export async function materializeNativeReasoningComboRequest<
  C extends ComboWithModels,
  N extends ComboWithModels,
>(
  combo: C,
  allCombos: ComboCollection<N>,
  body: Record<string, unknown>,
  isVisible?: AddressVisibility
): Promise<{ combo: C; allCombos: ComboCollection<N> }> {
  const nested: N[] = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const [materializedCombo, ...materializedNested] =
    await materializeNativeReasoningCombos<ComboWithModels>(
      [combo, ...nested],
      body,
      getActiveSyncedCatalog,
      isVisible
    );
  const combos = materializedNested as N[];
  return {
    combo: materializedCombo as C,
    allCombos: Array.isArray(allCombos) ? combos : { ...allCombos, combos },
  };
}
