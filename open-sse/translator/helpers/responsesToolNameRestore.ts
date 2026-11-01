type JsonRecord = Record<string, unknown>;
type ToolIdentity = { namespace: string; name: string };

const OUTPUT_ITEM_EVENT_TYPES = new Set([
  "response.output_item.added",
  "response.output_item.done",
]);
const TERMINAL_EVENT_TYPES = new Set([
  "response.completed",
  "response.incomplete",
  "response.failed",
  "response.done",
  "response.cancelled",
  "response.canceled",
]);

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function toToolIdentity(value: unknown): ToolIdentity | null {
  const identity = toRecord(value);
  if (
    !identity ||
    typeof identity.namespace !== "string" ||
    typeof identity.name !== "string" ||
    identity.name.length === 0
  ) {
    return null;
  }
  return { namespace: identity.namespace, name: identity.name };
}

function restoreCallItem(
  value: unknown,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  const item = toRecord(value);
  if (
    !item ||
    (item.type !== "function_call" && item.type !== "custom_tool_call") ||
    typeof item.name !== "string" ||
    item.name.length === 0
  ) {
    return false;
  }

  // Both ledgers are keyed by the emitted provider wire name. Resolve them before
  // replacing item.name: an alias value is a client name, not an identity-map key.
  const wireName = item.name;
  const identity = identities ? toToolIdentity(identities.get(wireName)) : null;
  const alias = aliases?.get(wireName);
  const restoredName = identity?.name ?? (typeof alias === "string" && alias ? alias : null);
  if (!restoredName) return false;

  let changed = false;
  if (item.name !== restoredName) {
    item.name = restoredName;
    changed = true;
  }

  if (identity?.namespace) {
    if (item.namespace !== identity.namespace) {
      item.namespace = identity.namespace;
      changed = true;
    }
  } else if (identity && Object.prototype.hasOwnProperty.call(item, "namespace")) {
    // Empty namespace is explicit evidence that this client identity is flat.
    delete item.namespace;
    changed = true;
  }

  return changed;
}

function restoreOutput(
  output: unknown[],
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  let changed = false;
  for (const item of output) {
    changed = restoreCallItem(item, aliases, identities) || changed;
  }
  return changed;
}

/**
 * Restore provider aliases on native Responses call items using two independent
 * ledgers keyed by the emitted wire name. A valid identity is authoritative; otherwise
 * a valid alias restores only the client name. Alias spelling is never parsed to invent
 * a namespace.
 */
export function restoreResponsesToolNames(
  payload: unknown,
  aliases: ReadonlyMap<string, string> | null,
  identities?: ReadonlyMap<string, unknown> | null
): boolean {
  const validAliases = aliases instanceof Map && aliases.size > 0 ? aliases : null;
  const validIdentities = identities instanceof Map && identities.size > 0 ? identities : null;
  if (!validAliases && !validIdentities) return false;

  if (Array.isArray(payload)) return restoreOutput(payload, validAliases, validIdentities);

  const root = toRecord(payload);
  if (!root) return false;

  let changed = Array.isArray(root.output)
    ? restoreOutput(root.output, validAliases, validIdentities)
    : false;

  if (typeof root.type !== "string") return changed;

  if (OUTPUT_ITEM_EVENT_TYPES.has(root.type)) {
    changed = restoreCallItem(root.item, validAliases, validIdentities) || changed;
  }

  if (TERMINAL_EVENT_TYPES.has(root.type)) {
    const response = toRecord(root.response);
    if (response && Array.isArray(response.output)) {
      changed = restoreOutput(response.output, validAliases, validIdentities) || changed;
    }
  }

  return changed;
}
