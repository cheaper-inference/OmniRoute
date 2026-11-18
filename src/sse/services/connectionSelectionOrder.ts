/**
 * Candidate order for per-provider account selection: fill-first and priority take its head,
 * and the other strategies start from it.
 *
 * The pool concatenates one priority-sorted query per provider id in the search pool, requested
 * id first (#922). Each account ranks by its provider id's place in that pool, then by priority.
 * Priorities are numbered per provider id, so another alias's priority 1 does not beat the
 * requested id's priority 2 (#10581, #20478). Within one provider id and priority, the OAuth
 * accounts take the OAuth places in session-availability order (#8940); API-key accounts keep
 * their places.
 *
 * The requested id is the canonical one: model parsing resolves `agy/` to `antigravity` (#8013),
 * so `agy/` and `antigravity/` models both rank the antigravity accounts first.
 */

import { getOAuthSessionAvailability } from "@omniroute/open-sse/services/oauthSessionOccupancy.ts";

interface OrderableConnection {
  id: string;
  provider: string;
  authType?: string | null;
  priority?: number | null;
}

const priorityOf = (connection: OrderableConnection): number => connection.priority || 999;

export function orderConnectionsForSelection<T extends OrderableConnection>(
  connections: readonly T[],
  providersToSearch: readonly string[],
  sessionKey?: string | null
): T[] {
  const rankById = new Map(providersToSearch.map((id, index) => [id, index]));
  const rankOf = (connection: T) => rankById.get(connection.provider) ?? providersToSearch.length;
  const ordered = [...connections].sort(
    (a, b) => rankOf(a) - rankOf(b) || priorityOf(a) - priorityOf(b)
  );

  const oauthPlacesByGroup = new Map<string, number[]>();
  ordered.forEach((connection, index) => {
    if (connection.authType !== "oauth") return;
    const group = `${rankOf(connection)}:${priorityOf(connection)}`;
    const places = oauthPlacesByGroup.get(group);
    if (places) places.push(index);
    else oauthPlacesByGroup.set(group, [index]);
  });
  for (const places of oauthPlacesByGroup.values()) {
    if (places.length > 1) fillByAvailability(ordered, places, sessionKey);
  }
  return ordered;
}

/** Puts the OAuth accounts at `places` in session-availability order, most available first. */
function fillByAvailability<T extends OrderableConnection>(
  ordered: T[],
  places: readonly number[],
  sessionKey?: string | null
): void {
  const byAvailability = places
    .map((place) => ({
      connection: ordered[place],
      availability: getOAuthSessionAvailability(ordered[place].id, sessionKey),
    }))
    .sort((a, b) => b.availability - a.availability);
  places.forEach((place, i) => {
    ordered[place] = byAvailability[i].connection;
  });
}
