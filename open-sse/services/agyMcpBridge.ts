/**
 * agyMcpBridge.ts — the bridge side of the `ide-tools` MCP server.
 *
 * agy cannot receive the client's tools directly: it spawns an MCP server
 * itself, from a command in its own config. So the bridge lends it one. A tiny
 * stdio shim (open-sse/lib/agy-mcp-server.mjs) is placed first on agy's PATH as
 * `nc`, which agy dials through `--ide-mcp-port`; every request that shim
 * receives comes back here over a loopback control socket, is matched to the
 * process and turn it belongs to, and the answer travels back the same way.
 *
 * Why the indirection at all: the tools belong to the calling client, and only
 * this process knows them. The shim holds no state, so agy may restart it
 * whenever it likes.
 *
 * Ported from magpie-community/plugins packages/agy-cli mcp-server.mjs and the
 * control half of index.mjs.
 */
import crypto from "node:crypto";
import net from "node:net";

export const PROTOCOL_VERSION = "2025-11-25";
/** agy 1.3.5+: a tools/list entry carrying this _meta key is never deferred. */
export const ALWAYS_LOAD = "antigravity/alwaysLoad";
/** The prefix agy puts on an MCP tool it exposes to the model as a function. */
export const IDE_TOOL_PREFIX = "mcp_ide-tools_";
/** A whole control-line, so a runaway client cannot grow the buffer forever. */
export const CONTROL_LINE_LIMIT = 16 * 1024 * 1024;

/**
 * Only agy's own words are read (title, name) — never rawInput, which the model
 * writes. The whole title must be one of the accepted spellings: a shell
 * command's own text can appear inside its title.
 */
const IDE_TOOL_NAMED =
  /^(?:mcp\(ide-tools\/([^()\s]+)\)|(?:mcp\s+)?"?ide-tools\/([^()\s"]+)"?|mcp_ide-tools_(\S+))$/;

/** The client tool an ACP tool call names, or "" when it names none. */
export function ideToolOf(toolCall: unknown): string {
  if (!toolCall || typeof toolCall !== "object") return "";
  const record = toolCall as { title?: unknown; name?: unknown; toolName?: unknown };
  for (const value of [record.title, record.name, record.toolName]) {
    if (typeof value !== "string") continue;
    const match = IDE_TOOL_NAMED.exec(value.trim().replace(/\?$/, ""));
    if (match) return match[1] || match[2] || match[3];
  }
  return "";
}

/**
 * What agy is told while a client tool has not answered yet. A repeat of the
 * same call waits for the running one instead of starting it a second time, so
 * agy polls by re-issuing the call with identical arguments.
 */
export function stillRunningText(call: { name: string }): string {
  return (
    `${call.name} is still running in the client; no result yet. To keep waiting, call ${call.name} ` +
    "again with exactly the same arguments. That waits for this run and does not start it twice."
  );
}

/** JSON with object keys sorted, so two argument sets compare by value. */
export function stableJSON(value: unknown): string {
  return JSON.stringify(value, (_key, item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return item;
    const record = item as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(record)
        .sort()
        .map((key) => [key, record[key]])
    );
  });
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

// ── The tool catalog agy lists ──────────────────────────────────────────────

export type BridgeTool = Record<string, unknown> & { name?: unknown };

type ListWaiter = { version: number; resolve: () => void; timer: NodeJS.Timeout | null };

/**
 * The client's tools as agy gets them, for one agy process.
 *
 * Two things matter here and both cost something if dropped:
 *
 *   - `_meta["antigravity/alwaysLoad"]`. agy loads an MCP tool on demand, out of
 *     the model's function list, unless the server marks it always loaded —
 *     and a tool the model cannot see is a tool it cannot call.
 *   - The fit. agy holds every listed tool in a 20,000-token budget and drops
 *     whole tools past it, largest first. `fitTools` shortens descriptions
 *     instead, so every tool survives.
 *
 * The fitted list is cached per catalog and rebuilt on every catalog change,
 * because agy re-lists on each `tools/list_changed`.
 */
export class BridgeToolCatalog {
  private tools: BridgeTool[];
  private signature: string;
  private fitted: BridgeTool[] | null = null;
  private fittedFor = "";
  private version = 1;
  private listed = 0;
  private waiters: ListWaiter[] = [];
  private watchers = new Set<net.Socket>();

  constructor(
    tools: BridgeTool[],
    private readonly fit: (tools: BridgeTool[]) => BridgeTool[],
    private readonly listWaitMs = 5_000
  ) {
    this.tools = tools;
    this.signature = JSON.stringify(tools);
  }

  /** The current catalog, unfitted. */
  current(): BridgeTool[] {
    return this.tools;
  }

  /** Whether the client now declares a tool agy has not listed yet. */
  toolsGrew(tools: BridgeTool[]): boolean {
    const known = new Set(this.tools.map((tool) => tool.name));
    return tools.some((tool) => !known.has(tool.name));
  }

  /** Record that agy asked for the list, and release the waiters it satisfies. */
  markListed(): void {
    this.listed = Math.max(this.listed, this.version);
    for (const waiter of this.waiters.filter((item) => item.version <= this.listed)) {
      if (waiter.timer) clearTimeout(waiter.timer);
      waiter.resolve();
    }
    this.waiters = this.waiters.filter((item) => item.version > this.listed);
  }

  /** The tools agy receives, marked always-loaded and fitted to its budget. */
  listTools(): BridgeTool[] {
    this.markListed();
    if (this.fittedFor !== this.signature) {
      this.fitted = this.fit(
        this.tools.map((tool) => ({
          ...tool,
          _meta: { ...(isObject(tool._meta) ? tool._meta : {}), [ALWAYS_LOAD]: true },
        }))
      );
      this.fittedFor = this.signature;
    }
    return this.fitted as BridgeTool[];
  }

  addWatcher(socket: net.Socket): void {
    this.watchers.add(socket);
    socket.once("close", () => this.watchers.delete(socket));
  }

  /**
   * Swap the catalog in place and tell agy to re-list. Resolves once agy has
   * listed the new version, or after the wait budget: agy may have stopped
   * asking, and a caller should not hang for that.
   */
  async updateTools(tools: BridgeTool[]): Promise<void> {
    const signature = JSON.stringify(tools);
    if (signature === this.signature) return;
    this.tools = tools;
    this.signature = signature;
    this.fitted = null;
    this.fittedFor = "";
    await this.announce();
  }

  private async announce(): Promise<void> {
    const version = ++this.version;
    if (!this.watchers.size) return;
    for (const socket of this.watchers) {
      try {
        socket.write(`${JSON.stringify({ event: "tools_changed" })}\n`);
      } catch {
        /* the watcher went away between the check and the write */
      }
    }
    await this.waitForList(version);
  }

  private waitForList(version: number): Promise<void> {
    if (version <= this.listed) return Promise.resolve();
    return new Promise((resolve) => {
      const waiter: ListWaiter = { version, resolve, timer: null };
      waiter.timer = setTimeout(() => {
        this.waiters = this.waiters.filter((item) => item !== waiter);
        resolve();
      }, this.listWaitMs);
      waiter.timer.unref?.();
      this.waiters.push(waiter);
    });
  }

  /** Drop every watcher and release every waiter (the process is going). */
  dispose(): void {
    for (const waiter of this.waiters.splice(0)) {
      if (waiter.timer) clearTimeout(waiter.timer);
      waiter.resolve();
    }
    for (const socket of this.watchers) {
      try {
        socket.destroy();
      } catch {
        /* already gone */
      }
    }
    this.watchers.clear();
  }
}

// ── The control channel ─────────────────────────────────────────────────────

export type ControlCall = {
  kind: "call";
  token: string;
  name: string;
  arguments: unknown;
  meta: unknown;
};

/**
 * One agy process, as the control server sees it. The ACP process wrapper
 * implements this; the server itself stays ignorant of turns and prompts.
 */
export interface BridgePeer {
  readonly token: string;
  /** The tools agy may list, already fitted. */
  listTools(): BridgeTool[];
  /** Keep this socket to push `tools_changed` on. */
  addWatcher(socket: net.Socket): void;
  /**
   * Accept one tool call. The peer answers on `socket` — immediately when the
   * client is done, later when it is not — so nothing here may end it.
   */
  acceptMcpCall(message: ControlCall, socket: net.Socket): void;
}

const peers = new Map<string, BridgePeer>();
let controlServer: net.Server | null = null;
let controlServerPromise: Promise<number> | null = null;

/** Register one agy process so its shim's calls can find it. */
export function registerBridgePeer(peer: BridgePeer): void {
  peers.set(peer.token, peer);
}

export function unregisterBridgePeer(token: string): void {
  peers.delete(token);
}

export function getBridgePeer(token: string): BridgePeer | undefined {
  return peers.get(token);
}

/** How many agy processes are registered; a test/ops probe. */
export function getBridgePeerCount(): number {
  return peers.size;
}

/**
 * Start the loopback control server on an ephemeral port, once per process.
 * It is unref'd so it never keeps the host alive on its own.
 */
export function ensureControlServer(): Promise<number> {
  if (controlServerPromise) return controlServerPromise;
  controlServerPromise = new Promise((resolve, reject) => {
    const server = net.createServer((socket) => handleControlConnection(socket));
    server.once("error", (error) => {
      controlServerPromise = null;
      reject(error);
    });
    server.listen(0, "127.0.0.1", () => {
      controlServer = server;
      server.unref();
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("agy bridge: the control server reported no port"));
        return;
      }
      resolve(address.port);
    });
  });
  return controlServerPromise;
}

/** The port the control server is listening on, or null before it starts. */
export function controlServerPort(): number | null {
  const address = controlServer?.address();
  return address && typeof address !== "string" ? address.port : null;
}

export function closeControlServer(): Promise<void> {
  const server = controlServer;
  controlServer = null;
  controlServerPromise = null;
  peers.clear();
  if (!server) return Promise.resolve();
  return new Promise((resolve) => server.close(() => resolve()));
}

/**
 * Constant-time token comparison. Both sides are hashed first so the compare is
 * over equal-length buffers: a length difference would otherwise leak through
 * the timing of `timingSafeEqual`'s throw.
 */
export function tokenMatches(left: unknown, right: unknown): boolean {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const a = crypto.createHash("sha256").update(left).digest();
  const b = crypto.createHash("sha256").update(right).digest();
  return crypto.timingSafeEqual(a, b);
}

/** Why a control line was refused, or null when it is acceptable. */
function refusedReason(message: unknown): { code: number; message: string } | null {
  if (!isObject(message)) return { code: -32600, message: "invalid control request" };
  const token = message.token;
  const peer = typeof token === "string" ? peers.get(token) : undefined;
  if (!peer || !tokenMatches(token, peer.token)) {
    return { code: -32603, message: "invalid or expired bridge session" };
  }
  return null;
}

function endWith(socket: net.Socket, payload: unknown): void {
  try {
    socket.end(`${JSON.stringify(payload)}\n`);
  } catch {
    socket.destroy();
  }
}

export function handleControlConnection(socket: net.Socket): void {
  socket.setEncoding("utf8");
  let buffer = "";
  let handled = false;
  socket.on("data", (data: string) => {
    if (handled) return;
    buffer += data;
    if (buffer.length > CONTROL_LINE_LIMIT) {
      socket.destroy();
      return;
    }
    const newline = buffer.indexOf("\n");
    if (newline < 0) return;
    handled = true;

    let message: unknown;
    try {
      message = JSON.parse(buffer.slice(0, newline));
    } catch {
      endWith(socket, { error: { code: -32700, message: "invalid control JSON" } });
      return;
    }

    const refusal = refusedReason(message);
    if (refusal) {
      endWith(socket, { error: refusal });
      return;
    }
    const request = message as Record<string, unknown>;
    const peer = peers.get(request.token as string) as BridgePeer;

    try {
      if (request.kind === "list") {
        endWith(socket, { result: { tools: peer.listTools() } });
        return;
      }
      if (request.kind === "watch") {
        peer.addWatcher(socket);
        return;
      }
      if (request.kind === "call") {
        peer.acceptMcpCall(
          {
            kind: "call",
            token: request.token as string,
            name: String(request.name ?? ""),
            arguments: request.arguments,
            meta: request.meta,
          },
          socket
        );
        return;
      }
      endWith(socket, { error: { code: -32601, message: "unknown control request" } });
    } catch (error) {
      endWith(socket, {
        error: { code: -32603, message: error instanceof Error ? error.message : String(error) },
      });
    }
  });
  socket.on("error", () => {
    /* a control socket that dies mid-line is the shim's problem, not ours */
  });
}
