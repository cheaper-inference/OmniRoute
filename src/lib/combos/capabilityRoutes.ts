import { COMBO_ENDPOINTS, type ComboEndpoint } from "@omniroute/open-sse/config/comboEndpoints.ts";
import { normalizeComboModels, type ComboStep } from "./steps";
import { stripDeadComboConfigKeys } from "./deadConfigKeys";

export type ComboCapabilityRoute = {
  models: ComboStep[];
  strategy: string;
  config?: Record<string, unknown>;
};

export type ComboCapabilityRoutes = Partial<Record<ComboEndpoint, ComboCapabilityRoute>>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

/** Normalize persisted endpoint plans into the same model-step shape as Chat. */
export function normalizeComboCapabilityRoutes(
  routes: unknown,
  options: { comboName: string; allCombos: never }
): ComboCapabilityRoutes | undefined {
  if (!isRecord(routes)) return undefined;
  const normalized: ComboCapabilityRoutes = {};
  for (const endpoint of COMBO_ENDPOINTS) {
    const route = routes[endpoint];
    if (!isRecord(route) || !Array.isArray(route.models)) continue;
    normalized[endpoint] = {
      models: normalizeComboModels(route.models, {
        comboName: options.comboName,
        allCombos: options.allCombos,
      }),
      strategy: typeof route.strategy === "string" ? route.strategy : "priority",
      ...(isRecord(route.config) ? { config: stripDeadComboConfigKeys(route.config) } : {}),
    };
  }
  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

/** Include route references in the existing DAG validator without changing its contract. */
export function comboWithCapabilityRouteSteps<T extends Record<string, unknown>>(combo: T): T {
  const routes = isRecord(combo.routes) ? combo.routes : {};
  const routeSteps = COMBO_ENDPOINTS.flatMap((endpoint) => {
    const route = routes[endpoint];
    return isRecord(route) && Array.isArray(route.models) ? route.models : [];
  });
  return {
    ...combo,
    models: [...(Array.isArray(combo.models) ? combo.models : []), ...routeSteps],
  };
}
