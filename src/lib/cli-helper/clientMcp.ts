import { createHash, createHmac, randomBytes } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import {
  applyEdits,
  modify,
  parseTree,
  type JSONPath,
  type Node,
  type ParseError,
} from "jsonc-parser";
import { parse, stringify } from "smol-toml";
import { parseDocument } from "yaml";
import { z } from "zod";

import {
  ensureCliConfigWriteAllowed,
  getCodexClientConfigHome,
} from "@/shared/services/cliRuntime";

import { getHermesConfigPath } from "./config-generator/hermesHome";
import { readPrivateConfigFile, writePrivateConfigFile } from "./privateConfigFile";

export const clientMcpClient = z.enum(["codex", "hermes", "kimi-code", "codebuddy"]);
export type Client = z.infer<typeof clientMcpClient>;
type Mapping = Record<string, unknown>;
type Transport = "stdio" | "http" | "unknown";

const base = { client: clientMcpClient, revision: z.string().regex(/^[a-f0-9]{64}$/) };
export const clientMcpName = z
  .string()
  .regex(/^[A-Za-z0-9_.-]{1,128}$/)
  .refine((key) => !Object.hasOwn(Object.prototype, key));
const commandArg = z
  .string()
  .max(4096)
  .regex(/^[^\u0000\r\n]*$/);
const remoteUrl = z
  .string()
  .max(4096)
  .refine((value) => {
    try {
      const url = new URL(value);
      return (
        /^https?:\/\//i.test(value) &&
        value === value.trim() &&
        !/[\s\\?#]/.test(value) &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  });
export const clientMcpPortableServer = z.discriminatedUnion("transport", [
  z.strictObject({
    transport: z.literal("stdio"),
    command: commandArg.refine((value) => Boolean(value.trim())),
    args: z.array(commandArg).max(64).optional(),
  }),
  z.strictObject({ transport: z.literal("http"), url: remoteUrl }),
]);
const name = clientMcpName;
const server = clientMcpPortableServer;
export const clientMcpMutation = z.discriminatedUnion("action", [
  z.strictObject({ ...base, action: z.literal("add"), name, server }),
  z.strictObject({ ...base, action: z.literal("update"), name, server }),
  z.strictObject({ ...base, action: z.literal("remove"), name }),
  z.strictObject({ ...base, action: z.literal("toggle"), name, enabled: z.boolean() }),
  z.strictObject({ ...base, action: z.literal("restore") }),
]);
type Mutation = z.infer<typeof clientMcpMutation>;

export class ClientMcpError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

const MAX_CONFIG_SIZE = 1024 * 1024;
const revisionKey = randomBytes(32);
const backupSchema = z.strictObject({
  result: z.string().regex(/^[a-f0-9]{64}$/),
  source: z.string().nullable(),
});
const backupsSchema = z.array(backupSchema).min(1).max(2);

export function readOptional(file: string, limit = MAX_CONFIG_SIZE): string | null {
  try {
    for (let dir = path.dirname(file); dir !== path.dirname(dir); dir = path.dirname(dir)) {
      const ancestor = fs.lstatSync(dir, { throwIfNoEntry: false });
      if (ancestor && !ancestor.isDirectory()) {
        throw new ClientMcpError("MCP config must not use a linked directory", 422);
      }
    }
    const stat = fs.lstatSync(file);
    if (!stat.isFile() || stat.size > limit) {
      throw new ClientMcpError("MCP config must be a regular file within the size limit", 422);
    }
    const source = readPrivateConfigFile(file);
    if (source.includes("\uFFFD") || Buffer.byteLength(source) > limit) {
      throw new ClientMcpError("Unsupported MCP config encoding or size", 422);
    }
    return source;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function readSource(client: Client): { file: string; source: string | null } {
  const home = os.homedir();
  if (client !== "codebuddy") {
    const file = path.resolve(
      client === "codex"
        ? path.join(getCodexClientConfigHome(), "config.toml")
        : client === "kimi-code"
          ? path.join(
              process.env.KIMI_CODE_HOME?.trim() || path.join(home, ".kimi-code"),
              "mcp.json"
            )
          : getHermesConfigPath()
    );
    return { file, source: readOptional(file) };
  }
  const override = process.env.CODEBUDDY_CONFIG_DIR?.trim();
  const directory = path.resolve(override || path.join(home, ".codebuddy"));
  const preferred = path.join(directory, ".mcp.json");
  const candidates = [preferred, path.join(directory, "mcp.json")];
  candidates.push(path.join(override ? directory : home, ".codebuddy.json"));
  for (const file of candidates) {
    const source = readOptional(file);
    if (source !== null) return { file, source };
  }
  return { file: preferred, source: null };
}

function invalidConfig(): never {
  throw new ClientMcpError("Malformed or unsupported MCP config", 422);
}

function mapping(value: unknown): Mapping {
  if (!value || typeof value !== "object" || Array.isArray(value)) invalidConfig();
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype) invalidConfig();
  return value as Mapping;
}

function plainMappings(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(plainMappings);
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, plainMappings(child)])
    );
  }
  return value;
}

// Use own entries and reject duplicate keys so a patch can never edit a shadowed value.
function jsonValue(node: Node): unknown {
  if (node.type === "array") return (node.children ?? []).map(jsonValue);
  if (node.type !== "object") return node.value;
  const entries = new Map<string, unknown>();
  for (const property of node.children ?? []) {
    const [key, value] = property.children ?? [];
    if (!key || !value || entries.has(key.value)) invalidConfig();
    entries.set(key.value, jsonValue(value));
  }
  return Object.fromEntries(entries);
}

function readDocument(client: Client, source: string | null): Mapping {
  if (source === null) return {};
  try {
    if (client === "codex") return mapping(plainMappings(parse(source)));
    if (client === "hermes") {
      const doc = parseDocument(source, { version: "1.1", uniqueKeys: true });
      if (doc.errors.length || doc.warnings.length) invalidConfig();
      return doc.contents === null ? {} : mapping(doc.toJS());
    }
    const errors: ParseError[] = [];
    const tree = parseTree(source, errors, { allowTrailingComma: client === "codebuddy" });
    if (!tree || errors.length) invalidConfig();
    return mapping(jsonValue(tree));
  } catch {
    return invalidConfig();
  }
}

function transportOf(entry: Mapping): Transport {
  const declared = entry.type ?? entry.transport;
  if (
    typeof entry.command === "string" &&
    typeof entry.url !== "string" &&
    (declared === undefined || declared === "stdio")
  )
    return "stdio";
  if (
    typeof entry.url === "string" &&
    typeof entry.command !== "string" &&
    (declared === undefined ||
      declared === "http" ||
      declared === "sse" ||
      declared === "streamable-http")
  )
    return "http";
  return "unknown";
}

function fingerprint(source: string): string {
  return createHash("sha256").update(source).digest("hex");
}

function backupPath(file: string): string {
  return `${file}.omniroute-mcp-backup`;
}

function readBackup(file: string, source: string | null): z.infer<typeof backupSchema> | null {
  if (source === null) return null;
  const saved = readOptional(backupPath(file), MAX_CONFIG_SIZE * 12 + 2048);
  if (saved === null) return null;
  let data: unknown;
  try {
    data = JSON.parse(saved);
  } catch {
    throw new ClientMcpError("Malformed MCP backup", 422);
  }
  const backups = backupsSchema.safeParse(data);
  if (!backups.success) throw new ClientMcpError("Malformed MCP backup", 422);
  return backups.data.find((backup) => backup.result === fingerprint(source)) ?? null;
}

function readState(client: Client) {
  const { file, source } = readSource(client);
  const document = readDocument(client, source);
  const section = client === "codex" || client === "hermes" ? "mcp_servers" : "mcpServers";
  const entries = Object.hasOwn(document, section) ? mapping(document[section]) : {};
  const disabled =
    client === "codebuddy" && Array.isArray(document.disabledMcpServers)
      ? document.disabledMcpServers
      : [];
  const servers = Object.entries(entries).map(([name, value]) => {
    const entry = mapping(value);
    return {
      name,
      transport: transportOf(entry),
      enabled: entry.enabled !== false && !disabled.includes(name),
    };
  });
  const backup = readBackup(file, source);
  const revision = createHmac("sha256", revisionKey)
    .update(JSON.stringify([file, source]))
    .digest("hex");
  const view = {
    client,
    file: path.basename(file),
    revision,
    servers,
    canRestore: backup !== null,
    canToggle: client !== "codebuddy",
  };
  return { view, file, source, document, section, entries, backup };
}

export function listClientMcp(client: Client) {
  return readState(client).view;
}

export function readClientMcpEntries(client: Client) {
  const state = readState(client);
  return {
    file: state.file,
    revision: state.view.revision,
    entries: state.view.servers.map((entry) => ({
      ...entry,
      definition: mapping(state.entries[entry.name]),
    })),
  };
}

type Change = { path: JSONPath; value: unknown };

function editToml(
  source: string,
  name: string,
  original: Mapping | undefined,
  next: Mapping | undefined
) {
  const section = (entry: Mapping) =>
    stringify({ mcp_servers: { [name]: entry } } as Parameters<typeof stringify>[0]);
  if (original === undefined && next) return source + (source ? "\n" : "") + section(next);
  const sections = [...source.matchAll(/^[ \t]*(\[.*\])[ \t]*(?:#.*)?\r?$/gm)];
  const spans = sections.flatMap((match, index) => {
    try {
      const header = parse(match[1]).mcp_servers;
      if (!header || typeof header !== "object" || !Object.hasOwn(header, name)) return [];
      const start = match.index;
      const end = sections[index + 1]?.index ?? source.length;
      const text = source.slice(start, end);
      const trailing = /(?:\r?\n[ \t]*(?:#[^\r\n]*)?)*\r?\n?$/.exec(text)?.[0] ?? "";
      if (text.slice(0, text.length - trailing.length).includes("#")) invalidConfig();
      return [{ start, end: end - trailing.length }];
    } catch (error) {
      if (error instanceof ClientMcpError) throw error;
      return [];
    }
  });
  if (!spans.length) invalidConfig();
  for (const { start, end } of spans.reverse()) source = source.slice(0, start) + source.slice(end);
  return next ? source + (source ? "\n" : "") + section(next) : source;
}

function renderEdit(
  state: ReturnType<typeof readState>,
  name: string,
  original: Mapping | undefined,
  next: Mapping | undefined,
  changes: Change[]
): string {
  const { client } = state.view;
  const source = state.source ?? "";
  if (client === "codex") return editToml(source, name, original, next);
  if (client === "hermes") {
    const doc = parseDocument(source || "{}", { version: "1.1", uniqueKeys: true });
    for (const change of changes) {
      if (change.value === undefined) doc.deleteIn(change.path);
      else doc.setIn(change.path, change.value);
    }
    return doc.toString();
  }
  const formattingOptions = {
    insertSpaces: true,
    tabSize: 2,
    eol: source.includes("\r\n") ? "\r\n" : "\n",
  };
  return changes.reduce(
    (text, change) =>
      applyEdits(text, modify(text, change.path, change.value, { formattingOptions })),
    source || "{}\n"
  );
}

function commit(file: string, expected: string | null, source: string | null): void {
  if (readOptional(file) !== expected)
    throw new ClientMcpError("MCP config changed; refresh it first", 409);
  if (source === null) fs.unlinkSync(file);
  else writePrivateConfigFile(file, source);
}

function saveEdited(state: ReturnType<typeof readState>, edited: string) {
  if (edited === state.source) return state.view;
  if (Buffer.byteLength(edited) > MAX_CONFIG_SIZE) invalidConfig();
  writePrivateConfigFile(
    backupPath(state.file),
    JSON.stringify([
      { result: fingerprint(edited), source: state.source },
      ...(state.backup ? [state.backup] : []),
    ])
  );
  commit(state.file, state.source, edited);
  return listClientMcp(state.view.client);
}

function editTomlEnabled(source: string, key: string, enabled: boolean): string {
  const sections = [...source.matchAll(/^[ \t]*(\[[^\r\n]*\])[ \t]*(?:#[^\r\n]*)?\r?$/gm)];
  for (const [index, section] of sections.entries()) {
    let header: unknown;
    try {
      header = parse(section[1]).mcp_servers;
    } catch {
      continue;
    }
    if (!header || typeof header !== "object" || !Object.hasOwn(header, key)) continue;
    const content = mapping(mapping(header)[key]);
    if (Object.keys(content).length) continue;
    const end = sections[index + 1]?.index ?? source.length;
    const offset = section.index + section[0].length;
    const body = source.slice(offset, end);
    const pattern =
      /^([ \t]*(?:enabled|"enabled"|'enabled')[ \t]*=[ \t]*)(true|false)([ \t]*(?:#[^\r\n]*)?\r?)$/m;
    if (pattern.test(body)) {
      return source.slice(0, offset) + body.replace(pattern, `$1${enabled}$3`) + source.slice(end);
    }
    const line = source.indexOf("\n", offset);
    const eol = source.includes("\r\n") ? "\r\n" : "\n";
    return line < 0
      ? source + `${eol}enabled = ${enabled}${eol}`
      : source.slice(0, line + 1) + `enabled = ${enabled}${eol}` + source.slice(line + 1);
  }
  return invalidConfig();
}

type PortableServer = z.infer<typeof clientMcpPortableServer>;
type MembershipChange = { name: string; enabled: boolean; install?: PortableServer };

export function nativeMcpDefinition(client: Client, server: PortableServer): Mapping {
  const definition =
    server.transport === "stdio"
      ? { command: server.command, args: server.args ?? [] }
      : { url: server.url };
  return client === "codebuddy" ? { ...definition, type: server.transport } : definition;
}

function readWritableState(client: Client, revision: string) {
  const state = readState(client);
  const writeGuard = ensureCliConfigWriteAllowed(state.file);
  if (writeGuard) throw new ClientMcpError(writeGuard, 403);
  if (state.view.revision !== revision) {
    throw new ClientMcpError("MCP config changed; refresh it first", 409);
  }
  return state;
}

function codebuddyDisabledNames(disabled: unknown): string[] {
  if (disabled === undefined) return [];
  if (!Array.isArray(disabled) || !disabled.every((item) => typeof item === "string"))
    invalidConfig();
  return [...disabled];
}

function changeCodebuddyMarkers(
  names: string[],
  changes: Change[],
  key: string,
  operation: MembershipChange,
  current: Mapping | undefined
) {
  if (!operation.enabled) {
    if (!names.includes(key)) {
      changes.push({ path: ["disabledMcpServers", names.length], value: key });
      names.push(key);
    }
    return;
  }
  if (current?.enabled === false) {
    throw new ClientMcpError("CodeBuddy MCP server uses an unsupported disabled setting", 422);
  }
  for (let index = names.length - 1; index >= 0; index -= 1) {
    if (names[index] !== key) continue;
    names.splice(index, 1);
    changes.push({ path: ["disabledMcpServers", index], value: undefined });
  }
}

function membershipDefinition(
  client: Client,
  operation: MembershipChange,
  current: Mapping | undefined
) {
  if (operation.install) {
    if (current) throw new ClientMcpError("MCP server name is already occupied", 409);
    return nativeMcpDefinition(client, operation.install);
  }
  if (!current) throw new ClientMcpError("Native MCP server is missing", 409);
  if (client !== "codebuddy" && (current.enabled !== false) !== operation.enabled)
    return { ...current, enabled: operation.enabled };
}

function projectMembership(state: ReturnType<typeof readState>, operations: MembershipChange[]) {
  const { client } = state.view;
  let edited = state.source ?? "";
  const entries = { ...state.entries };
  const disabledNames =
    client === "codebuddy" ? codebuddyDisabledNames(state.document.disabledMcpServers) : [];
  const jsonChanges: Change[] = [];
  const markerChanges: Change[] = [];
  for (const operation of operations) {
    const key = clientMcpName.parse(operation.name);
    const current = Object.hasOwn(entries, key) ? mapping(entries[key]) : undefined;
    const next = membershipDefinition(client, operation, current);
    if (client === "codebuddy")
      changeCodebuddyMarkers(disabledNames, markerChanges, key, operation, current);
    if (!next) continue;

    entries[key] = next;
    if (client === "codex") {
      edited = current
        ? editTomlEnabled(edited, key, operation.enabled)
        : editToml(edited, key, undefined, next);
      continue;
    }
    const path = [state.section, key];
    jsonChanges.push(
      current ? { path: [...path, "enabled"], value: operation.enabled } : { path, value: next }
    );
  }
  return { edited, entries, disabledNames, jsonChanges, markerChanges };
}

/** Project one selection into one native file and produce one rollback point. */
export function setClientMcpMembership(
  client: Client,
  revision: string,
  operations: MembershipChange[]
) {
  const state = readWritableState(client, revision);
  const { edited, entries, disabledNames, jsonChanges, markerChanges } = projectMembership(
    state,
    operations
  );
  const expected = { ...state.document };
  const disabled = state.document.disabledMcpServers;
  if (client === "codebuddy" && !isDeepStrictEqual(disabled ?? [], disabledNames)) {
    expected.disabledMcpServers = disabledNames;
    if (disabled === undefined)
      jsonChanges.push({ path: ["disabledMcpServers"], value: disabledNames });
    else jsonChanges.push(...markerChanges);
  }
  const source = jsonChanges.length
    ? renderEdit(state, "", undefined, undefined, jsonChanges)
    : edited;
  if (Object.keys(entries).length || Object.hasOwn(expected, state.section))
    expected[state.section] = entries;
  if (source === (state.source ?? "")) return state.view;
  if (!isDeepStrictEqual(readDocument(client, source), expected)) invalidConfig();
  return saveEdited(state, source);
}

function mutationEdit(
  state: ReturnType<typeof readState>,
  input: Exclude<Mutation, { action: "restore" }>,
  original: Mapping | undefined
): { next?: Mapping; changes: Change[] } {
  const entryPath = [state.section, input.name];
  if (input.action === "remove") {
    return { changes: [{ path: entryPath, value: undefined }] };
  }
  if (input.action === "toggle") {
    if (!state.view.canToggle)
      throw new ClientMcpError("This client does not support enable or disable here", 422);
    return {
      next: { ...original, enabled: input.enabled },
      changes: [{ path: [...entryPath, "enabled"], value: input.enabled }],
    };
  }
  if (original && transportOf(original) !== input.server.transport)
    throw new ClientMcpError("Changing the transport requires removing and adding the server", 422);
  const fields = nativeMcpDefinition(input.client, input.server);
  if (original) delete fields.type;
  const next = { ...original, ...fields };
  return {
    next,
    changes: original
      ? Object.entries(fields).map(([key, value]) => ({ path: [...entryPath, key], value }))
      : [{ path: entryPath, value: next }],
  };
}

export function mutateClientMcp(input: Mutation) {
  const state = readWritableState(input.client, input.revision);
  if (input.action === "restore") {
    if (!state.backup) throw new ClientMcpError("No backup matches this MCP config", 409);
    readDocument(input.client, state.backup.source);
    commit(state.file, state.source, state.backup.source);
    return listClientMcp(input.client);
  }

  const name = input.name;
  const original = Object.hasOwn(state.entries, name) ? mapping(state.entries[name]) : undefined;
  if (input.action === "add" ? original : !original)
    throw new ClientMcpError(
      input.action === "add" ? "MCP server already exists" : "MCP server does not exist",
      409
    );
  const { next, changes } = mutationEdit(state, input, original);
  const wanted = { ...state.entries };
  if (next) wanted[name] = next;
  else delete wanted[name];
  const edited = renderEdit(state, name, original, next, changes);
  const check = readDocument(input.client, edited);
  // TOML drops an empty implicit table when the final server section is removed.
  if (
    input.client === "codex" &&
    !Object.keys(wanted).length &&
    !Object.hasOwn(check, state.section)
  ) {
    check[state.section] = {};
  }
  if (!isDeepStrictEqual(check, { ...state.document, [state.section]: wanted })) invalidConfig();
  return saveEdited(state, edited);
}
