/**
 * How a combo step picks its account, as the dashboard should show it.
 *
 * `dynamic` is the existing wording for a step that pins nothing: the strategy
 * picks any account of the provider. `deleted` is the state that used to be
 * invisible: the step still pins an account whose connection was removed, so
 * the target cannot run until the user repoints or removes the step. Reporting
 * it as `dynamic` (the previous behaviour) hid both the deletion and the fact
 * that traffic was being served by a different account than the one pinned.
 */

export type ComboStepAccountState = "pinned" | "deleted" | "unroutable" | "dynamic";

interface StepAccountShape {
  connectionId?: unknown;
  allowedConnectionIds?: unknown;
}

function trimId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function baseConnectionId(connectionId: string): string {
  return connectionId.split("|fp|")[0];
}

/** A pinned id matches a live row directly or through one of its fingerprints. */
function idIsLive(connectionId: string, liveConnectionIds: readonly string[]): boolean {
  const base = baseConnectionId(connectionId);
  return liveConnectionIds.some(
    (liveId) => liveId === connectionId || baseConnectionId(liveId) === base
  );
}

/**
 * Connection ids from a builder provider's connection list, or null when the
 * list is not present. An absent list must not be read as "the account was
 * deleted", so it stays null instead of collapsing to an empty array.
 */
export function listLiveConnectionIds(connections: unknown): string[] | null {
  if (!Array.isArray(connections)) return null;
  return connections
    .map((connection) =>
      connection &&
      typeof connection === "object" &&
      typeof (connection as { id?: unknown }).id === "string"
        ? ((connection as { id: string }).id as string)
        : null
    )
    .filter((id): id is string => id !== null);
}

/**
 * Connection ids to judge a step against.
 *
 * `providersLoaded` says whether the builder payload has any provider entry at
 * all: during the first render, or after the payload failed to load, the list
 * is unknown and nothing may be reported as deleted. Once the payload is
 * loaded, a provider that is absent from it has no connections left (the
 * payload is built from the connection table), so its steps resolve against an
 * empty list and surface as deleted/unroutable instead of "dynamic account".
 */
export function resolveLiveConnectionIds({
  providersLoaded,
  providerConnections,
}: {
  providersLoaded: boolean;
  providerConnections: unknown;
}): string[] | null {
  if (!providersLoaded) return null;
  return listLiveConnectionIds(providerConnections) ?? [];
}

/**
 * Account label of the connection a step pins, matching fingerprint-expanded
 * ids (`<rowId>|fp|<fp>`) against the row they came from, so a fingerprint pin
 * keeps its label instead of falling back to a truncated id.
 */
export function findComboStepConnectionLabel(
  connections: unknown,
  connectionId: unknown
): string | null {
  const id = trimId(connectionId);
  if (!id || !Array.isArray(connections)) return null;

  const base = baseConnectionId(id);
  const match = connections.find((connection) => {
    if (!connection || typeof connection !== "object") return false;
    const candidateId = (connection as { id?: unknown }).id;
    if (typeof candidateId !== "string") return false;
    return candidateId === id || baseConnectionId(candidateId) === base;
  }) as { label?: unknown } | undefined;

  const label = match && typeof match.label === "string" ? match.label.trim() : "";
  return label.length > 0 ? label : null;
}

/**
 * `liveConnectionIds` is the provider's current connection list, or null when
 * the caller has not loaded it: an unknown list must not be reported as
 * "the account was deleted".
 */
export function resolveComboStepAccountState(
  step: StepAccountShape | null | undefined,
  liveConnectionIds: readonly string[] | null
): ComboStepAccountState {
  if (!step || typeof step !== "object") return "dynamic";
  // A pin is the target the user chose, so it decides the state on its own:
  // the allowlist can still name live accounts, but the step will not use them
  // while the pin is set.
  const connectionId = trimId(step.connectionId);
  if (connectionId) {
    if (liveConnectionIds === null) return "pinned";
    return idIsLive(connectionId, liveConnectionIds) ? "pinned" : "deleted";
  }

  const allowlist = Array.isArray(step.allowedConnectionIds)
    ? step.allowedConnectionIds.map(trimId).filter((id): id is string => id !== null)
    : [];
  if (allowlist.length > 0 && liveConnectionIds !== null) {
    return allowlist.some((id) => idIsLive(id, liveConnectionIds)) ? "dynamic" : "unroutable";
  }

  return "dynamic";
}

export function formatComboStepAccountLabel(
  state: ComboStepAccountState,
  { connectionId, connectionLabel }: { connectionId?: unknown; connectionLabel?: unknown } = {}
): string {
  const id = trimId(connectionId);
  const shortId = id ? id.slice(0, 8) : "";
  switch (state) {
    case "deleted":
      return `deleted account (${shortId})`;
    case "unroutable":
      return "no available account";
    case "pinned": {
      const label = typeof connectionLabel === "string" ? connectionLabel.trim() : "";
      return label || `acct ${shortId}`;
    }
    default:
      return "dynamic account";
  }
}
