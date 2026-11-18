/**
 * Render the age of a timestamp as a relative time ("2 hours ago").
 *
 * The connection row shows the age of the last catalog sync and the age of the
 * last discovery outcome; both read the same way, so both go through this
 * helper. Returns null when the timestamp or the clock cannot be read, so
 * callers fall back to their own wording instead of rendering a wrong age.
 */
export function formatRelativeAge(
  timestampMs: number,
  nowMs: number,
  locale: string
): string | null {
  if (!Number.isFinite(timestampMs) || timestampMs <= 0) return null;
  if (!Number.isFinite(nowMs)) return null;

  const ageMinutes = Math.max(0, Math.floor((nowMs - timestampMs) / 60_000));
  const unit = ageMinutes < 60 ? "minute" : ageMinutes < 1440 ? "hour" : "day";
  const value =
    unit === "minute"
      ? ageMinutes
      : unit === "hour"
        ? Math.floor(ageMinutes / 60)
        : Math.floor(ageMinutes / 1440);
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-value, unit);
}

/**
 * Decide whether a connection row should render its `lastError` text.
 *
 * A disabled connection (`isActive === false`) is still counted by the provider
 * card's error badge (`getEffectiveStatus` → error/expired/unavailable, which does
 * not look at `isActive`). Hiding its error text left the operator unable to see
 * *what* failed on a row the dashboard flags as errored. So the error text is shown
 * whenever there is a `lastError`, regardless of the active toggle. (#1447)
 */
export function shouldShowConnectionLastError(connection: {
  lastError?: string;
  isActive?: boolean;
}): boolean {
  return Boolean(connection.lastError);
}

/**
 * Availability-sort input shape — the two resilience-runtime fields that
 * decide whether a connection is currently usable. Deliberately narrow: this
 * mirrors the two fields `ConnectionRow`'s own `effectiveStatus` computation
 * reads (`rateLimitedUntil` = connection cooldown, `testStatus` = last test
 * result), so the "Reorder" button and the row badges never disagree about
 * what "available" means.
 */
export interface AvailabilitySortableConnection {
  testStatus?: string;
  rateLimitedUntil?: string;
}

/**
 * Effective status for a connection, factoring in connection cooldown.
 *
 * A connection can be recorded as `testStatus: "unavailable"` (see the
 * "Connection Cooldown" resilience layer in CLAUDE.md) yet the cooldown
 * itself is lazy — once `rateLimitedUntil` is in the past, the connection is
 * eligible again even though nothing has re-tested it yet. Treat that case
 * as "active" so the reorder button (and the row's own badge, which this
 * mirrors) reflect the lazy-recovery model instead of stale state.
 */
export function getConnectionEffectiveStatus(
  connection: AvailabilitySortableConnection
): string | undefined {
  const isCooldown = Boolean(
    connection.rateLimitedUntil && new Date(connection.rateLimitedUntil).getTime() > Date.now()
  );
  return connection.testStatus === "unavailable" && !isCooldown ? "active" : connection.testStatus;
}

/** A connection is "available" for reorder purposes when its effective status is active/success. */
export function isConnectionAvailable(connection: AvailabilitySortableConnection): boolean {
  const status = getConnectionEffectiveStatus(connection);
  return status === "active" || status === "success";
}

/**
 * Sort connections with available ones first, unavailable ones last.
 *
 * Stable sort: connections within the same availability group keep their
 * relative (existing priority) order, so reordering only moves groups
 * relative to each other, never scrambles ties. `Array.prototype.sort` has
 * been a stable sort in V8/Node since ES2019, so no manual tie-break index
 * is needed here (unlike `handleSwapPriority`'s two-item swap, which reads
 * ordering intent directly instead).
 */
export function sortConnectionsByAvailability<T extends AvailabilitySortableConnection>(
  connections: T[]
): T[] {
  return [...connections].sort((a, b) => {
    const availableA = isConnectionAvailable(a);
    const availableB = isConnectionAvailable(b);
    if (availableA && !availableB) return -1;
    if (!availableA && availableB) return 1;
    return 0;
  });
}

/** One `PUT /api/providers/:id` priority write. */
export interface PriorityUpdate {
  id: string;
  priority: number;
}

interface PrioritizedConnection {
  id?: string;
  priority?: number;
}

/**
 * Writes that persist `next` (an already re-ordered list) as 1-based integer
 * priorities — the only shape `updateProviderConnectionSchema` accepts
 * (`priority` is an integer >= 1). Rows already at their final position are
 * skipped; once every write lands, the provider's priorities are exactly 1..N
 * in `next` order, so the server's `updated_at` tiebreak never decides it.
 */
export function buildPriorityUpdates(next: PrioritizedConnection[]): PriorityUpdate[] {
  const updates: PriorityUpdate[] = [];
  next.forEach((row, i) => {
    const priority = i + 1;
    if (!row.id || row.priority === priority) return;
    updates.push({ id: row.id, priority });
  });
  return updates;
}

const isValidPriority = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 1;

/**
 * Writes for the ▲/▼ swap of `conn1` with its neighbour `conn2`. Distinct
 * stored priorities are swapped as values (operator-chosen gaps such as
 * 10/20/30 survive). A tie (or an invalid stored value) has no value to swap,
 * so the whole list — in the order the panel renders it — is rewritten as
 * 1-based positions with the two rows exchanged.
 */
export function buildSwapPriorityUpdates(
  connections: PrioritizedConnection[],
  conn1: PrioritizedConnection,
  conn2: PrioritizedConnection
): PriorityUpdate[] {
  const p1 = conn1.priority;
  const p2 = conn2.priority;
  if (conn1.id && conn2.id && isValidPriority(p1) && isValidPriority(p2) && p1 !== p2) {
    return [
      { id: conn1.id, priority: p2 },
      { id: conn2.id, priority: p1 },
    ];
  }
  const next = [...connections].sort((a, b) => (a.priority || 0) - (b.priority || 0));
  const i1 = next.findIndex((row) => row.id === conn1.id);
  const i2 = next.findIndex((row) => row.id === conn2.id);
  if (i1 < 0 || i2 < 0) return [];
  [next[i1], next[i2]] = [next[i2], next[i1]];
  return buildPriorityUpdates(next);
}

type PriorityFetch = (
  url: string,
  init: { method: string; headers: Record<string, string>; body: string }
) => Promise<{ ok: boolean; status: number }>;

/**
 * Send priority writes one at a time and stop at the first rejected one, so a
 * failure is surfaced to the caller instead of being silently dropped.
 */
export async function persistPriorityUpdates(
  updates: PriorityUpdate[],
  fetchImpl: PriorityFetch = fetch
): Promise<void> {
  for (const update of updates) {
    const res = await fetchImpl(`/api/providers/${update.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: update.priority }),
    });
    if (!res.ok) throw new Error(`Priority update failed with status ${res.status}`);
  }
}
