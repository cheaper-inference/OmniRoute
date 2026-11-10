/** Shared runtime protection state; kept dependency-free for credential selection. */
export const enabledConnections = new Set<string>();

export function isRateLimitEnabled(connectionId: string): boolean {
  return enabledConnections.has(connectionId);
}
