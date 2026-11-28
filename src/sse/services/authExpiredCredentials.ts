import { isKimiCoding } from "@omniroute/open-sse/services/kimiConcurrency.ts";

export function buildAllExpiredCredentials(connections: Array<{ testStatus: string | null }>) {
  const statusCounts = new Map<string, number>();
  for (const connection of connections) {
    const key = (connection.testStatus || "expired").trim().toLowerCase() || "expired";
    statusCounts.set(key, (statusCounts.get(key) || 0) + 1);
  }
  const expiredStatus =
    [...statusCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "expired";
  return {
    allExpired: true as const,
    expiredCount: connections.length,
    expiredStatus,
  };
}

/** Rows have already been scoped to the caller and pin by credential selection. */
export function buildClosedKimiPool(
  provider: string,
  connections: Array<{ isActive: boolean; testStatus: string | null }>
) {
  if (!isKimiCoding(provider) || !connections.length) return null;
  const statuses = connections.map((row) => (row.testStatus ?? "").trim().toLowerCase());
  const isTerminal = (status: string) =>
    ["banned", "expired", "credits_exhausted"].includes(status);
  if (connections.some((row, i) => row.isActive && !isTerminal(statuses[i]))) return null;
  if (statuses.every((s) => s === "expired") || statuses.every((s) => s === "credits_exhausted"))
    return null;
  return {
    ...buildAllExpiredCredentials(connections),
    closedReason: statuses.some(isTerminal) ? ("blocked" as const) : ("disabled" as const),
  };
}
