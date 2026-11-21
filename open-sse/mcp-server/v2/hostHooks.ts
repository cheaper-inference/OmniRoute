/**
 * Host hooks for the MCP v2 sidecar.
 *
 * The sidecar lives in open-sse/ and must not import src/ directly (boundary
 * ratchet). The host app registers the real implementations once at startup;
 * until then the defaults below are used, which match the v1 behavior for
 * scope enforcement and fall back to pass-through normalization.
 */

export interface McpV2HostHooks {
  isScopeEnforcementEnabled: () => boolean;
  getComboModelProvider: (value: unknown) => string | null;
  getComboModelString: (value: unknown) => string | null;
  getComboStepTarget: (value: unknown) => string | null;
  normalizeQuotaResponse: (
    raw: unknown,
    filters?: { provider?: string | null; connectionId?: string | null }
  ) => unknown;
}

const defaults: McpV2HostHooks = {
  isScopeEnforcementEnabled: () => false,
  getComboModelProvider: () => null,
  getComboModelString: () => null,
  getComboStepTarget: () => null,
  normalizeQuotaResponse: (raw) => raw,
};

let hooks: McpV2HostHooks = { ...defaults };

export function registerMcpV2HostHooks(next: Partial<McpV2HostHooks>): void {
  hooks = { ...hooks, ...next };
}

export function getMcpV2HostHooks(): McpV2HostHooks {
  return hooks;
}
