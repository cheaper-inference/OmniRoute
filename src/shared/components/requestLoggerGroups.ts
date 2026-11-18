import { isHttpLogError, parseUpstreamHttp, UPSTREAM_HTTP_ATTEMPT } from "../utils/upstreamHttp";

type GroupRow = {
  id: string;
  correlationId?: string | null;
  timestamp: string;
  status: number;
  requestType?: string | null;
  active?: boolean;
  error?: unknown;
  upstreamHttp?: unknown;
};
function countGroupRows(
  group: GroupRow[],
  summaries: Map<string, ReturnType<typeof parseUpstreamHttp>>
): number {
  let groupSize = 0;
  const represented = new Set<string>();
  for (const row of group) {
    const summary = parseUpstreamHttp(row.upstreamHttp);
    if (summary && summaries.has(summary.groupId)) {
      if (!represented.has(summary.groupId)) {
        const logicalSummary = summaries.get(summary.groupId);
        groupSize += logicalSummary?.role === "logical" ? logicalSummary.total : 0;
        represented.add(summary.groupId);
      }
    } else groupSize++;
  }
  return groupSize;
}

function getGroupStatus(
  logicalRows: GroupRow[],
  logical: GroupRow[],
  summaries: Map<string, ReturnType<typeof parseUpstreamHttp>>
): "healed" | "failed" | null {
  const final = logical[0];
  const priorFailure =
    logical.slice(1).some(isHttpLogError) ||
    [...summaries.values()].some((summary) => summary?.role === "logical" && summary.failed > 0);
  const succeeded = final && !isHttpLogError(final) && final.status >= 200 && final.status < 400;
  return logicalRows[0]?.active
    ? null
    : final && isHttpLogError(final)
      ? "failed"
      : succeeded && priorFailure
        ? "healed"
        : null;
}

export function requestGroupMetadata(rows: GroupRow[]) {
  const groups = new Map<string, GroupRow[]>();
  for (const row of rows) {
    if (!row.correlationId) continue;
    const group = groups.get(row.correlationId) ?? [];
    group.push(row);
    groups.set(row.correlationId, group);
  }
  const result = new Map<string, { groupSize: number; groupStatus: "healed" | "failed" | null }>();
  for (const [cid, group] of groups) {
    const logicalRows = group
      .filter((row) => row.requestType !== UPSTREAM_HTTP_ATTEMPT)
      .sort(
        (a, b) =>
          Date.parse(b.timestamp) - Date.parse(a.timestamp) ||
          Number(b.active === true) - Number(a.active === true)
      );
    const logical = logicalRows.filter((row) => !row.active);
    const summaries = new Map<string, ReturnType<typeof parseUpstreamHttp>>();
    for (const row of logical) {
      const summary = parseUpstreamHttp(row.upstreamHttp);
      if (summary?.role === "logical") summaries.set(summary.groupId, summary);
    }
    const groupSize = countGroupRows(group, summaries);
    const groupStatus = getGroupStatus(logicalRows, logical, summaries);
    result.set(cid, {
      groupSize: Math.max(1, groupSize),
      groupStatus,
    });
  }
  return result;
}

export function sortRelatedLogs<T extends Pick<GroupRow, "id" | "timestamp" | "upstreamHttp">>(
  rows: readonly T[],
  legacyStart: (row: T) => number
): T[] {
  const textOrder = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  const entries = rows.map((row) => {
    const summary = parseUpstreamHttp(row.upstreamHttp);
    const time = summary?.send
      ? summary.send.startedAt
      : summary
        ? Date.parse(row.timestamp)
        : legacyStart(row);
    return {
      row,
      collector: Boolean(summary),
      key: summary ? `collector:${summary.groupId}` : `legacy:${row.id}`,
      ordinal: summary?.send?.ordinal ?? (summary?.role === "logical" ? summary.total + 1 : 0),
      time: Number.isFinite(time) ? time : 0,
    };
  });
  const collectors = new Map<string, typeof entries>();
  for (const entry of entries) {
    if (!entry.collector) continue;
    const group = collectors.get(entry.key) ?? [];
    group.push(entry);
    collectors.set(entry.key, group);
  }
  // Clamp only the ordering key; row timestamps and displayed request times stay intact.
  for (const group of collectors.values()) {
    group.sort((a, b) => a.ordinal - b.ordinal || textOrder(a.row.id, b.row.id));
    let predecessor = Number.NEGATIVE_INFINITY;
    for (const entry of group) {
      entry.time = Math.max(entry.time, predecessor);
      predecessor = entry.time;
    }
  }
  return entries
    .sort(
      (a, b) =>
        a.time - b.time ||
        textOrder(a.key, b.key) ||
        a.ordinal - b.ordinal ||
        textOrder(a.row.id, b.row.id)
    )
    .map(({ row }) => row);
}
