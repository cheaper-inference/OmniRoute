/**
 * Per-connection transport selectors exposed in the connection edit modal.
 *
 * Both settings are optional: an absent key means "inherit the process default"
 * (`OMNIROUTE_CODEX_WS_ENABLED` / `QODER_CLI_TRANSPORT`). The values are read at
 * request time by open-sse/executors/codex.ts (codexTransport) and
 * open-sse/services/qoderCliAcp.ts (qoderCliTransport).
 */

export const CODEX_TRANSPORT_VALUES = ["http", "websocket", "app-server"] as const;
export type CodexTransportValue = (typeof CODEX_TRANSPORT_VALUES)[number];

export const QODER_CLI_TRANSPORT_VALUES = ["print", "acp"] as const;
export type QoderCliTransportValue = (typeof QODER_CLI_TRANSPORT_VALUES)[number];

/** Sentinel used by the `<Select>` for "no per-connection override". */
export const TRANSPORT_DEFAULT_VALUE = "";

function normalizeTransport<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T | typeof TRANSPORT_DEFAULT_VALUE {
  if (typeof value !== "string") return TRANSPORT_DEFAULT_VALUE;
  const normalized = value.trim().toLowerCase();
  return (allowed as readonly string[]).includes(normalized)
    ? (normalized as T)
    : TRANSPORT_DEFAULT_VALUE;
}

export function normalizeCodexTransport(value: unknown): CodexTransportValue | "" {
  return normalizeTransport(value, CODEX_TRANSPORT_VALUES);
}

export function normalizeQoderCliTransport(value: unknown): QoderCliTransportValue | "" {
  return normalizeTransport(value, QODER_CLI_TRANSPORT_VALUES);
}

/**
 * Value to send on save: an explicit `null` clears a stored override (the PUT
 * route shallow-merges, so omitting the key would silently keep the old one).
 */
export function transportPatchValue(value: string): string | null {
  return value.trim() ? value.trim().toLowerCase() : null;
}
