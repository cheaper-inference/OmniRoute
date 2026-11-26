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

function installedFingerprint(client: Client, server: Settings): string {
  const definition =
    server.transport === "stdio"
      ? { command: server.command, args: server.args ?? [] }
      : { url: server.url };
  return fingerprint(
    client === "codebuddy" ? { ...definition, type: server.transport } : definition
  );
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
  const rows = new Map<string, { sourceClient: Client; name: string; record?: Indexed }>();
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

function describe(library: ReturnType<typeof readLibrary>) {
  const items = [...library.rows.entries()].map(([id, { name, sourceClient, record }]) => {
    const source = library.entry(sourceClient, name);
    const settings =
      record && source && record.links[sourceClient] === fingerprint(source.definition)
        ? portable(source)
        : undefined;
    const membership: Partial<
      Record<Client, { enabled: boolean; canEnable: boolean; canDisable: boolean }>
    > = {};
    for (const client of clients) {
      if (!library.native.has(client) || (!record && client !== sourceClient)) continue;
      const existing = library.entry(client, name);
      const linked =
        record && existing && record.links[client] === fingerprint(existing.definition);
      const owner = library.owned.get(identity(client, name));
      const enableSupported = client !== "codebuddy" || existing?.definition.enabled !== false;
      membership[client] = {
        enabled: Boolean((linked || (!record && client === sourceClient)) && existing?.enabled),
        canEnable: Boolean(
          record &&
          (linked
            ? !existing.enabled && enableSupported
            : !existing && settings && (!owner || owner === id))
        ),
        canDisable: Boolean(linked && existing.enabled),
      };
    }
    return { id, name, sourceClient, managed: Boolean(record), clients: membership };
  });
  return { items, errors: library.errors };
}

export function getClientMcpLibrary() {
  return describe(readLibrary());
}

export function changeClientMcpLibrary(input: z.infer<typeof clientMcpLibraryRequest>) {
  const library = readLibrary();
  const view = new Map(describe(library).items.map((item) => [item.id, item]));
  const proposed = new Map(
    library.index.map((record) => [identity(record.sourceClient, record.name), record])
  );
  const operations: Parameters<typeof setClientMcpMembership>[2] = [];
  const results: Result[] = [];
  for (const id of input.ids) {
    const row = library.rows.get(id);
    const reject = (error: string) => results.push({ id, ok: false, error });
    if (!row) {
      reject("MCP server was not found");
      continue;
    }
    const { sourceClient, name, record } = row;
    if (input.action === "import" || input.action === "update") {
      const client = input.action === "update" ? (input.client ?? sourceClient) : sourceClient;
      const source = library.entry(client, name);
      if (!source || (input.action === "update" && !record?.links[client])) {
        reject("Native MCP definition is unavailable");
        continue;
      }
      if (!record || input.action === "update") {
        proposed.set(id, {
          sourceClient,
          name,
          links: { ...record?.links, [client]: fingerprint(source.definition) },
        });
      }
    } else if (input.action === "uninstall") {
      if (!proposed.delete(id)) {
        reject("MCP server has not been imported");
        continue;
      }
    } else {
      const client = input.client;
      const cell = view.get(id)?.clients[client];
      const enabled = input.action === "enable";
      if (
        !record ||
        (enabled ? !cell?.canEnable : !cell?.canDisable) ||
        operations.some((operation) => operation.name === name)
      ) {
        reject("MCP membership is unavailable or conflicts with another selection");
        continue;
      }
      const install = library.entry(client, name)
        ? undefined
        : portable(library.entry(sourceClient, name));
      operations.push({ name, enabled, install });
      if (install)
        proposed.set(id, {
          ...record,
          links: { ...record.links, [client]: installedFingerprint(client, install) },
        });
    }
    results.push({ id, ok: true });
  }

  const destination = operations.length ? library.native.get(input.client) : undefined;
  const writeGuard = destination && ensureCliConfigWriteAllowed(destination.file);
  if (writeGuard) throw new ClientMcpError(writeGuard, 403);
  const checked = indexSchema.safeParse([...proposed.values()]);
  if (!checked.success)
    throw new ClientMcpError("Local MCP library index exceeds the supported size", 422);
  const next = JSON.stringify(checked.data);
  const before = JSON.stringify(library.index);
  if (readOptional(library.file) !== library.original) {
    throw new ClientMcpError("MCP library changed; refresh it first", 409);
  }
  try {
    // Save the ownership record before native installation so a successful write remains attributable.
    if (next !== before) writePrivateConfigFile(library.file, next);
    if (operations.length) {
      setClientMcpMembership(input.client, library.native.get(input.client).revision, operations);
    }
  } catch (error) {
    if (next !== before && readOptional(library.file) === next)
      writePrivateConfigFile(library.file, before);
    const message =
      error instanceof ClientMcpError ? error.message : "Could not update the MCP library";
    for (const result of results) {
      if (result.ok) Object.assign(result, { ok: false, error: message });
    }
  }
  return { results, ...getClientMcpLibrary() };
}
