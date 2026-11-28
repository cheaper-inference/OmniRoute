/**
 * useModelCompatState — Issue #3501 Phase 1e
 *
 * Owns all model-compat derivations (buildCompatMap, isModelHidden,
 * effectiveNormalizeForProtocol, effectivePreserveForProtocol,
 * anyNormalizeCompatBadge, anyNoPreserveCompatBadge) that used to be
 * inlined in the god-component.
 *
 * Leaf module: imports ONLY from providerPageHelpers and React.
 * No import from ProviderDetailPageClient → zero cycle risk.
 */
import { useMemo, useCallback } from "react";
import { MODEL_COMPAT_PROTOCOL_KEYS } from "@/shared/constants/modelCompat";
import {
  buildCompatMap,
  isModelHiddenFn,
  isModelCombosOnlyFn,
  resolveModelVisibilityFn,
  effectiveNormalizeForProtocol,
  effectivePreserveForProtocol,
  anyNormalizeCompatBadge,
  anyNoPreserveCompatBadge,
  effectiveUpstreamHeadersForProtocol,
  type CompatModelRow,
  type CompatModelMap,
} from "../providerPageHelpers";
import type { ModelVisibilityMode } from "@/shared/utils/modelVisibility";

export interface ModelCompatState {
  /** The computed custom-model map (memoised). */
  customMap: CompatModelMap;
  /** The computed override map (memoised). */
  overrideMap: CompatModelMap;
  /** Stable callback: is the given model hidden? */
  isModelHidden: (modelId: string) => boolean;
  /** Stable callback: is the given model reachable only from a combo? */
  isModelCombosOnly: (modelId: string) => boolean;
  /** Stable callback: the model's three-state visibility, provider default included. */
  resolveModelVisibility: (modelId: string) => ModelVisibilityMode;
  /** Stable callback: effective normalize flag for (modelId, protocol). */
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  /** Stable callback: effective preserve-developer flag for (modelId, protocol). */
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  /** Stable callback: upstream-headers record for (modelId, protocol). */
  getUpstreamHeadersRecord: (modelId: string, protocol: string) => Record<string, string>;
  /** Stable callback: should the normalize compat badge be shown? */
  anyNormalizeCompatBadge: (modelId: string) => boolean;
  /** Stable callback: should the no-preserve compat badge be shown? */
  anyNoPreserveCompatBadge: (modelId: string) => boolean;
}

/**
 * Hook that derives stable compat callbacks from raw model-meta arrays.
 *
 * @param customModels         The `modelMeta.customModels` array from page state.
 * @param modelCompatOverrides The `modelMeta.modelCompatOverrides` array from page state.
 * @param providerId           Provider id, for provider-level runtime defaults (e.g. mistral).
 * @param providerCombosOnly   The provider-level combos-only default (`settings.combosOnlyProviders`).
 */
export function useModelCompatState(
  customModels: CompatModelRow[],
  modelCompatOverrides: Array<CompatModelRow & { id: string }>,
  providerId?: string,
  providerCombosOnly = false
): ModelCompatState {
  const customMap = useMemo(() => buildCompatMap(customModels), [customModels]);
  const overrideMap = useMemo(() => buildCompatMap(modelCompatOverrides), [modelCompatOverrides]);

  const isModelHidden = useCallback(
    (modelId: string) => isModelHiddenFn(modelId, customMap, overrideMap),
    [customMap, overrideMap]
  );

  const isModelCombosOnly = useCallback(
    (modelId: string) => isModelCombosOnlyFn(modelId, customMap, overrideMap, providerCombosOnly),
    [customMap, overrideMap, providerCombosOnly]
  );

  const resolveModelVisibility = useCallback(
    (modelId: string) =>
      resolveModelVisibilityFn(modelId, customMap, overrideMap, providerCombosOnly),
    [customMap, overrideMap, providerCombosOnly]
  );

  const effectiveModelNormalize = useCallback(
    (modelId: string, protocol = MODEL_COMPAT_PROTOCOL_KEYS[0]) =>
      effectiveNormalizeForProtocol(modelId, protocol, customMap, overrideMap, providerId),
    [customMap, overrideMap, providerId]
  );

  const effectiveModelPreserveDeveloper = useCallback(
    (modelId: string, protocol = MODEL_COMPAT_PROTOCOL_KEYS[0]) =>
      effectivePreserveForProtocol(modelId, protocol, customMap, overrideMap),
    [customMap, overrideMap]
  );

  const getUpstreamHeadersRecord = useCallback(
    (modelId: string, protocol: string) =>
      effectiveUpstreamHeadersForProtocol(modelId, protocol, customMap, overrideMap),
    [customMap, overrideMap]
  );

  const anyNormalizeCompatBadgeFn = useCallback(
    (modelId: string) => anyNormalizeCompatBadge(modelId, customMap, overrideMap),
    [customMap, overrideMap]
  );

  const anyNoPreserveCompatBadgeFn = useCallback(
    (modelId: string) => anyNoPreserveCompatBadge(modelId, customMap, overrideMap),
    [customMap, overrideMap]
  );

  return {
    customMap,
    overrideMap,
    isModelHidden,
    isModelCombosOnly,
    resolveModelVisibility,
    effectiveModelNormalize,
    effectiveModelPreserveDeveloper,
    getUpstreamHeadersRecord,
    anyNormalizeCompatBadge: anyNormalizeCompatBadgeFn,
    anyNoPreserveCompatBadge: anyNoPreserveCompatBadgeFn,
  };
}
