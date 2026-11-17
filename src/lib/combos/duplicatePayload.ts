type DuplicatedCombo = {
  models?: unknown[];
  strategy?: string;
  config?: unknown;
  routes?: Record<string, unknown> | null;
};

/** Build a duplicate payload without dropping endpoint-specific routing plans. */
export function buildDuplicateComboPayload(
  combo: DuplicatedCombo,
  name: string,
  sanitizedConfig: Record<string, unknown>
) {
  return {
    name,
    models: combo.models,
    strategy: combo.strategy || "priority",
    config: sanitizedConfig,
    ...(combo.routes ? { routes: combo.routes } : {}),
  };
}
