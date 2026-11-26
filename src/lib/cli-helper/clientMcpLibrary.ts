import { createHash } from "node:crypto";
import path from "node:path";
import { z } from "zod";

import { resolveDataDir } from "@/lib/dataPaths";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import {
  ClientMcpError,
  clientMcpClient,
  clientMcpName,
  clientMcpPortableServer,
  nativeMcpDefinition,
  readClientMcpEntries,
  readOptional,
  setClientMcpMembership,
  type Client,
} from "./clientMcp";
import { writePrivateConfigFile } from "./privateConfigFile";

const id = z.string().regex(/^[a-f0-9]{64}$/);
const clients = clientMcpClient.options;
const indexed = z.strictObject({
  sourceClient: clientMcpClient,
  name: clientMcpName,
  links: z.partialRecord(clientMcpClient, id),
});
const indexSchema = z.array(indexed).max(2048);
export const clientMcpLibraryRequest = z
  .strictObject({
    action: z.enum(["import", "enable", "disable", "update", "uninstall"]),
    ids: z
      .array(id)
      .min(1)
      .max(256)
      .refine((ids) => new Set(ids).size === ids.length),
    client: clientMcpClient.optional(),
  })
  .refine(({ action, client }) => !["enable", "disable"].includes(action) || client !== undefined);

type Indexed = z.infer<typeof indexed>;
type Native = ReturnType<typeof readClientMcpEntries>["entries"][number];
type Settings = z.infer<typeof clientMcpPortableServer>;
type Result = { id: string; ok: boolean; error?: string };
type LibraryRow = { sourceClient: Client; name: string; record?: Indexed };
type LibraryRequest = z.infer<typeof clientMcpLibraryRequest>;

function digest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function identity(client: Client, name: string): string {
  return digest([client, name]);
}

function orderKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(orderKeys);
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, orderKeys(item)])
    );
  }
  return value;
}

function fingerprint(definition: Native["definition"]): string {
  const fields = { ...definition };
  delete fields.enabled;
  return digest(orderKeys(fields));
}

function portable(entry: Native | undefined): Settings | undefined {
  if (!entry || entry.transport === "unknown") return undefined;
  const definition = entry.definition;
  if (
    Object.keys(definition).some(
      (key) => !["url", "command", "args", "type", "transport", "enabled"].includes(key)
    )
  )
    return undefined;
  if (definition.type === "sse" || definition.transport === "sse") return undefined;
  const result = clientMcpPortableServer.safeParse(
    entry.transport === "stdio"
      ? { transport: "stdio", command: definition.command, args: definition.args }
      : { transport: "http", url: definition.url }
  );
  return result.success ? result.data : undefined;
}

function readNativeClients() {
  const errors: Partial<Record<Client, string>> = {};
  const native = new Map<Client, ReturnType<typeof readClientMcpEntries>>();
  const entries = new Map<Client, Map<string, Native>>();
  for (const client of clients) {
    try {
      const state = readClientMcpEntries(client);
      native.set(client, state);
      entries.set(client, new Map(state.entries.map((entry) => [entry.name, entry])));
    } catch (error) {
      errors[client] =
        error instanceof ClientMcpError ? error.message : "Could not read native MCP configuration";
    }
  }
  const entry = (client: Client, name: string) => entries.get(client)?.get(name);
  return { native, entry, errors };
}

function indexRows(index: Indexed[]) {
  const rows = new Map<string, LibraryRow>();
  const owned = new Map<string, string>();
  for (const record of index) {
    const key = identity(record.sourceClient, record.name);
    if (rows.has(key)) throw new ClientMcpError("Duplicate local MCP library index entry", 422);
    rows.set(key, { sourceClient: record.sourceClient, name: record.name, record });
    for (const client of clients) {
      if (!record.links[client]) continue;
      const ownedKey = identity(client, record.name);
      if (owned.has(ownedKey))
        throw new ClientMcpError("Conflicting local MCP library index entries", 422);
      owned.set(ownedKey, key);
    }
  }
  return { rows, owned };
}

function readLibrary() {
  const file = path.resolve(resolveDataDir(), "client-mcp-library.json");
  const original = readOptional(file);
  let index: Indexed[];
  try {
    index = original === null ? [] : indexSchema.parse(JSON.parse(original));
  } catch {
    throw new ClientMcpError("Malformed local MCP library index", 422);
  }
  const { native, entry, errors } = readNativeClients();
  const { rows, owned } = indexRows(index);
  for (const [client, state] of native) {
    for (const discovered of state.entries) {
      if (!clientMcpName.safeParse(discovered.name).success) continue;
      const key = identity(client, discovered.name);
      if (!owned.has(key) && !rows.has(key))
        rows.set(key, { sourceClient: client, name: discovered.name });
    }
  }
  return { file, original, index, rows, native, entry, owned, errors };
}

type Library = ReturnType<typeof readLibrary>;

function describeMembership(
  library: Library,
  client: Client,
  id: string,
  row: LibraryRow,
  settings: Settings | undefined
) {
  const { name, record } = row;
  const existing = library.entry(client, name);
  if (!record) {
    return { enabled: Boolean(existing?.enabled), canEnable: false, canDisable: false };
  }
  if (existing && record.links[client] === fingerprint(existing.definition)) {
    const enableSupported = client !== "codebuddy" || existing.definition.enabled !== false;
    return {
      enabled: existing.enabled,
      canEnable: !existing.enabled && enableSupported,
      canDisable: existing.enabled,
    };
  }
  const owner = library.owned.get(identity(client, name));
  return {
    enabled: false,
    canEnable: Boolean(!existing && settings && (!owner || owner === id)),
    canDisable: false,
  };
}

function describe(library: Library) {
  const items = [...library.rows.entries()].map(([id, row]) => {
    const { name, sourceClient, record } = row;
    const source = library.entry(sourceClient, name);
    const settings =
      record && source && record.links[sourceClient] === fingerprint(source.definition)
        ? portable(source)
        : undefined;
    const membership: Partial<Record<Client, ReturnType<typeof describeMembership>>> = {};
    for (const client of clients) {
      if (!library.native.has(client) || (!record && client !== sourceClient)) continue;
      membership[client] = describeMembership(library, client, id, row, settings);
    }
    return { id, name, sourceClient, managed: Boolean(record), clients: membership };
  });
  return { items, errors: library.errors };
}

export function getClientMcpLibrary() {
  return describe(readLibrary());
}

type LibraryChanges = {
  library: Library;
  view: Map<string, ReturnType<typeof describe>["items"][number]>;
  proposed: Map<string, Indexed>;
  operations: Parameters<typeof setClientMcpMembership>[2];
};

function planMembership(
  { library, view, proposed, operations }: LibraryChanges,
  id: string,
  { sourceClient, name, record }: LibraryRow,
  client: Client | undefined,
  enabled: boolean
) {
  const cell = client && view.get(id)?.clients[client];
  if (
    !client ||
    !record ||
    (enabled ? !cell?.canEnable : !cell?.canDisable) ||
    operations.some((operation) => operation.name === name)
  ) {
    return "MCP membership is unavailable or conflicts with another selection";
  }
  const install = library.entry(client, name)
    ? undefined
    : portable(library.entry(sourceClient, name));
  operations.push({ name, enabled, install });
  if (install) {
    proposed.set(id, {
      ...record,
      links: { ...record.links, [client]: fingerprint(nativeMcpDefinition(client, install)) },
    });
  }
}

function planSelection(changes: LibraryChanges, input: LibraryRequest, id: string) {
  const { library, proposed } = changes;
  const row = library.rows.get(id);
  if (!row) return "MCP server was not found";
  if (input.action === "uninstall") {
    if (!proposed.delete(id)) return "MCP server has not been imported";
    return;
  }
  if (input.action !== "import" && input.action !== "update")
    return planMembership(changes, id, row, input.client, input.action === "enable");
  const { sourceClient, name, record } = row;
  const update = input.action === "update";
  const client = update ? (input.client ?? sourceClient) : sourceClient;
  const source = library.entry(client, name);
  if (!source || (update && !record?.links[client])) return "Native MCP definition is unavailable";
  if (!record || update) {
    proposed.set(id, {
      sourceClient,
      name,
      links: { ...record?.links, [client]: fingerprint(source.definition) },
    });
  }
}

function saveLibraryChanges(
  { library, proposed, operations }: LibraryChanges,
  client: Client | undefined
) {
  const destination = operations.length && client ? library.native.get(client) : undefined;
  const writeGuard = destination && ensureCliConfigWriteAllowed(destination.file);
  if (writeGuard) throw new ClientMcpError(writeGuard, 403);
  const checked = indexSchema.safeParse([...proposed.values()]);
  if (!checked.success)
    throw new ClientMcpError("Local MCP library index exceeds the supported size", 422);
  const next = JSON.stringify(checked.data);
  const before = JSON.stringify(library.index);
  const indexChanged = next !== before;
  if (readOptional(library.file) !== library.original) {
    throw new ClientMcpError("MCP library changed; refresh it first", 409);
  }
  try {
    // Save the ownership record before native installation so a successful write remains attributable.
    if (indexChanged) writePrivateConfigFile(library.file, next);
    if (!operations.length) return;
    if (!client || !destination) throw new Error("Native MCP destination is unavailable");
    setClientMcpMembership(client, destination.revision, operations);
  } catch (error) {
    if (indexChanged && readOptional(library.file) === next)
      writePrivateConfigFile(library.file, before);
    return error instanceof ClientMcpError ? error.message : "Could not update the MCP library";
  }
}

export function changeClientMcpLibrary(input: LibraryRequest) {
  const library = readLibrary();
  const changes: LibraryChanges = {
    library,
    view: new Map(describe(library).items.map((item) => [item.id, item])),
    proposed: new Map(
      library.index.map((record) => [identity(record.sourceClient, record.name), record])
    ),
    operations: [],
  };
  const results = input.ids.map((id): Result => {
    const error = planSelection(changes, input, id);
    return error === undefined ? { id, ok: true } : { id, ok: false, error };
  });
  const writeError = saveLibraryChanges(changes, input.client);
  if (writeError !== undefined) {
    for (const result of results) {
      if (result.ok) Object.assign(result, { ok: false, error: writeError });
    }
  }
  return { results, ...getClientMcpLibrary() };
}
