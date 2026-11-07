type JsonRecord = Record<string, unknown>;
type ToolIdentity = { namespace: string; name: string };

const OUTPUT_ITEM_EVENT_TYPES = new Set([
  "response.output_item.added",
  "response.output_item.done",
]);
const CALL_ARGUMENT_EVENT =
  /^response\.(function_call_arguments|custom_tool_call_input)\.(delta|done)$/;

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

function toCallItem(value: unknown): JsonRecord | null {
  const item = toRecord(value);
  if (!item) return null;
  if (item.type !== "function_call" && item.type !== "custom_tool_call") return null;
  if (typeof item.name !== "string" || item.name.length === 0) return null;
  return item;
}

function restoreNamespace(item: JsonRecord, identity: ToolIdentity | null): boolean {
  if (identity?.namespace) {
    if (item.namespace === identity.namespace) return false;
    item.namespace = identity.namespace;
    return true;
  }
  // Empty namespace is explicit evidence that this client identity is flat.
  if (identity && Object.prototype.hasOwnProperty.call(item, "namespace")) {
    delete item.namespace;
    return true;
  }
  return false;
}

function restoreCallItem(
  value: unknown,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  const item = toCallItem(value);
  if (!item) return false;

  // Both ledgers are keyed by the emitted provider wire name. Resolve them before
  // replacing item.name: an alias value is a client name, not an identity-map key.
  const wireName = item.name as string;
  const identity = identities ? toToolIdentity(identities.get(wireName)) : null;
  const alias = aliases?.get(wireName);
  const restoredName = identity?.name ?? (typeof alias === "string" && alias ? alias : null);
  if (!restoredName) return false;

  let changed = false;
  if (item.name !== restoredName) {
    item.name = restoredName;
    changed = true;
  }
  return restoreNamespace(item, identity) || changed;
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

/** The client name for an emitted wire name, from either ledger, or null. */
function clientNameFor(
  wireName: string,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): string | null {
  const identity = identities ? toToolIdentity(identities.get(wireName)) : null;
  const alias = aliases?.get(wireName);
  return identity?.name ?? (typeof alias === "string" && alias ? alias : null);
}

/** A record naming a tool by `name` (argument events, declarations, choices). */
function restoreNameField(
  value: unknown,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  const record = toRecord(value);
  if (!record || typeof record.name !== "string" || !record.name) return false;
  const restored = clientNameFor(record.name, aliases, identities);
  if (!restored || restored === record.name) return false;
  record.name = restored;
  return true;
}

/** Echoed tool declarations: flat entries and namespace children, never containers. */
function restoreDeclarations(
  tools: unknown,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  if (!Array.isArray(tools)) return false;
  let changed = false;
  for (const tool of tools) {
    const record = toRecord(tool);
    if (!record) continue;
    if (record.type === "namespace") {
      if (!Array.isArray(record.tools)) continue;
      for (const child of record.tools) {
        changed = restoreNameField(child, aliases, identities) || changed;
      }
    } else {
      changed = restoreNameField(record, aliases, identities) || changed;
    }
  }
  return changed;
}

/** An echoed tool_choice: a forced tool, or the descriptors of an allowed_tools choice. */
function restoreToolChoice(
  choice: unknown,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  const record = toRecord(choice);
  if (!record) return false;
  if (record.type === "allowed_tools")
    return restoreDeclarations(record.tools, aliases, identities);
  return restoreNameField(record, aliases, identities);
}

/** Every name in a Responses response object: output calls, tools and tool_choice. */
function restoreResponseObject(
  response: JsonRecord,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  let changed = Array.isArray(response.output)
    ? restoreOutput(response.output, aliases, identities)
    : false;
  changed = restoreDeclarations(response.tools, aliases, identities) || changed;
  return restoreToolChoice(response.tool_choice, aliases, identities) || changed;
}

function restoreEnvelope(
  root: JsonRecord,
  aliases: ReadonlyMap<string, string> | null,
  identities: ReadonlyMap<string, unknown> | null
): boolean {
  // A whole response object (non-streaming) carries output, tools and tool_choice itself.
  let changed = restoreResponseObject(root, aliases, identities);
  if (typeof root.type !== "string") return changed;

  if (OUTPUT_ITEM_EVENT_TYPES.has(root.type)) {
    changed = restoreCallItem(root.item, aliases, identities) || changed;
  }

  // response.function_call_arguments.* / custom_tool_call_input.* name their call too.
  if (CALL_ARGUMENT_EVENT.test(root.type)) {
    changed = restoreNameField(root, aliases, identities) || changed;
  }

  // Every event that carries the response (created, in_progress, completed, failed, ...)
  // echoes its tools and output, not only the terminal ones.
  const response = toRecord(root.response);
  if (response) changed = restoreResponseObject(response, aliases, identities) || changed;

  return changed;
}

/**
 * Restore provider aliases on every tool name a Responses payload carries — call items
 * (output, output_item events), argument events, and the echoed tools/tool_choice of any
 * response object — using two independent ledgers keyed by the emitted wire name. A valid
 * identity is authoritative for call items; otherwise a valid alias restores only the
 * client name. Alias spelling is never parsed to invent a namespace.
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
  return root ? restoreEnvelope(root, validAliases, validIdentities) : false;
}
