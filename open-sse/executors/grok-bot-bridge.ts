import { createServer, type Server } from "node:http";
import { LATEST_PROTOCOL_VERSION, SUPPORTED_PROTOCOL_VERSIONS } from "@modelcontextprotocol/sdk/types.js";
import {
  challengeTokenConstantTimeEqual,
  generateBridgeChallenge,
  generateBridgeNonce,
  getGrokBotBridgeRegistry,
  type BridgeCloseReason,
  type BridgeTurnEntry,
  type GrokBotBridgeRegistry,
} from "../services/grokBotBridgeRegistry";

const BEARER_PREFIX = "Bearer ";

/**
 * Registry-backed Grok Bot tool bridge (frozen spec 2026-09-28, fable r20
 * PASS, "Lifecycle" steps 1-7). One turn = one loopback MCP server + one
 * registry entry. The public route `/grok-bridge/<nonce>/mcp` proxies to the
 * registered port after the challenge check, so the local server only ever
 * sees validated requests; it still re-checks the forwarded authorization
 * header as defense in depth.
 */

export const BRIDGE_DRAIN_BUDGET_MS = 30_000;

export const BRIDGE_TOOL_NAME = "bridge_value";

type AdvertisedTool = {
  name: string;
  description?: string;
  inputSchema?: unknown;
};

function advertisedTools(tools: AdvertisedTool[] | undefined): AdvertisedTool[] {
  if (tools && tools.length) return tools;
  return [{
    name: BRIDGE_TOOL_NAME,
    description: "Request-level bridge tool; call exactly once.",
    inputSchema: { type: "object", properties: {}, additionalProperties: true },
  }];
}

type BridgeToolState = {
  challenge: string;
  nonce: string;
  used: boolean;
  calls: number;
  tools: AdvertisedTool[];
  registry: GrokBotBridgeRegistry | null;
  // tools/call 进来时留下的名字和参数。响应仍回 ok，这里只是接住，
  // 还没有送回客户端。
  invocations: Array<{ name: string; arguments: unknown }>;
};

function jsonRpcResult(id: unknown, result: unknown): string {
  return JSON.stringify({ jsonrpc: "2.0", id, result });
}

function jsonRpcError(id: unknown, code: number, message: string): string {
  return JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } });
}

function handleBridgeMcpRequest(
  state: BridgeToolState,
  req: import("node:http").IncomingMessage,
  res: import("node:http").ServerResponse
): void {
  // Authenticate before opening a stream or consuming a request body.
  const auth = req.headers.authorization ?? "";
  if (
    !auth.startsWith(BEARER_PREFIX) ||
    !challengeTokenConstantTimeEqual(auth.slice(BEARER_PREFIX.length), state.challenge)
  ) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "rejected" }));
    return;
  }
  if (req.method === "GET") {
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
    });
    // Cursor advertises protocol 2025-11-25 but reads this stream as the
    // 2024-11-05 HTTP+SSE transport. It takes the first frame as the POST
    // address and closes the stream when that frame is anything else, so the
    // endpoint event has to be the first byte. The data is a path, resolved
    // by the client against the connection origin.
    res.write(`event: endpoint\ndata: /grok-bridge/${state.nonce}/mcp\n\n`);
    res.write(": connected\n\n");
    const heartbeat = setInterval(() => {
      if (!res.destroyed) res.write(": keepalive\n\n");
    }, 5000);
    heartbeat.unref?.();
    res.once("close", () => clearInterval(heartbeat));
    return;
  }
  if (req.method !== "POST") {
    res.writeHead(405, { allow: "GET, POST" }).end();
    return;
  }
  const chunks: Buffer[] = [];
  req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
  req.on("end", () => {
    let body: {
      jsonrpc?: string;
      id?: unknown;
      method?: string;
      params?: { name?: string; protocolVersion?: string; arguments?: unknown };
    };
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}") as typeof body;
    } catch {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "rejected" }));
      return;
    }
    if (body.id === undefined) {
      res.writeHead(202).end();
      return;
    }
    if (body.method === "initialize") {
      const requestedVersion = body.params?.protocolVersion;
      const protocolVersion = requestedVersion && SUPPORTED_PROTOCOL_VERSIONS.includes(requestedVersion)
        ? requestedVersion
        : LATEST_PROTOCOL_VERSION;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(jsonRpcResult(body.id, {
        protocolVersion,
        capabilities: { tools: {} },
        serverInfo: { name: "grok-bot-bridge", version: "1.0.0" },
      }));
      return;
    }
    if (body.method === "ping") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(jsonRpcResult(body.id, {}));
      return;
    }
    if (body.method === "tools/list") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        jsonRpcResult(body.id, {
          tools: state.tools,
        })
      );
      return;
    }
    if (body.method === "tools/call") {
      if (!state.tools.some((tool) => tool.name === body.params?.name)) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(jsonRpcError(body.id, -32601, `unknown tool: ${String(body.params?.name)}`));
        return;
      }
      state.calls += 1;
      const args = body.params?.arguments ?? {};
      const name = body.params?.name ?? "";
      const already = state.invocations.some(
        (call) => call.name === name && JSON.stringify(call.arguments) === JSON.stringify(args)
      );
      if (!already) {
        state.invocations.push({ name, arguments: args });
      }
      if (state.registry) {
        const found = state.registry.lookup(state.nonce);
        if (found.kind === "active") state.registry.holdUntilCap(found.entry);
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        jsonRpcResult(body.id, {
          content: [{ type: "text", text: "ok" }],
        })
      );
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(jsonRpcError(body.id, -32601, `unknown method: ${String(body.method)}`));
  });
}

export type StartedBridgeTurn = {
  /** Public URL in path-nonce form: `<publicBase>/grok-bridge/<nonce>/mcp`. */
  url: string;
  nonce: string;
  challenge: string;
  /**
   * Post-turn canary, same contract as the previous tunnel-era helper:
   * throws on a wrong challenge or a repeat call, returns "ok" otherwise.
   */
  call: (challenge: string) => string;
  /** tools/call 进来时留下的名字和参数，按到达顺序。 */
  invocations: Array<{ name: string; arguments: unknown }>;
  /** Registry close; "normal" drains (async, non-blocking), forced reasons tear down now. */
  close: (reason: BridgeCloseReason) => boolean;
};

export type StartBridgeTurnOptions = {
  publicBaseUrl: string;
  registry?: GrokBotBridgeRegistry;
  /** Turn-scoped cancel: abort converges on the registry "cancel" close (spec step 9). */
  signal?: AbortSignal | null;
  /** Remote cleanup hook, invoked once local teardown has settled (spec step 13; slice 4c wires the agent delete). */
  onLocallyClosed?: (reason: BridgeCloseReason) => void;
  /**
   * Forced-teardown hook chained after the listener destroy. The executor
   * aborts the turn-scoped signal here so the upstream watch, its reconnect
   * loop, and the stream all observe the same forced close (spec steps 9/12/16).
   */
  onForcedAbort?: () => void;
  /** Test seam for the drain budget. */
  drainBudgetMs?: number;
  /** 客户端带来的工具。不传时桥只挂 bridge_value，和原来一样。 */
  tools?: AdvertisedTool[];
};

export async function startBridgeTurn(options: StartBridgeTurnOptions): Promise<StartedBridgeTurn> {
  const registry = options.registry ?? getGrokBotBridgeRegistry();
  const drainBudgetMs = options.drainBudgetMs ?? BRIDGE_DRAIN_BUDGET_MS;

  // Lifecycle step 1: nonce and challenge before any bind.
  const nonce = generateBridgeNonce();
  const challenge = generateBridgeChallenge();
  // The registry default clock is Date.now-based; createdAt must share that
  // timebase for the registration-time cap re-check to be exact.
  const createdAt = Date.now();

  // Lifecycle step 2: create the listener and retain a destroy handle before
  // any await, so the cap path can reach it even while the bind promise is
  // unsettled. A destroy that lands before the bind resolves is re-applied
  // idempotently once the listen callback fires.
  const state: BridgeToolState = {
    challenge, nonce, used: false, calls: 0, invocations: [],
    tools: advertisedTools(options.tools),
    registry: options.registry ?? null,
  };
  const server: Server = createServer((req, res) => handleBridgeMcpRequest(state, req, res));
  let destroyed = false;
  const destroyServer = () => {
    if (destroyed) return;
    destroyed = true;
    (server as { closeAllConnections?: () => void }).closeAllConnections?.();
    // server.close() throws ERR_SERVER_NOT_RUNNING when the listener never
    // reached the listening state (e.g. a bind failure); gate on the live
    // flag so every teardown path stays exception-free.
    if (server.listening) server.close(() => {});
  };
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  }).catch((err) => {
    // A bind failure still leaves a created listener object behind; close it
    // before the error propagates so no kernel socket outlives the refusal.
    destroyServer();
    throw err;
  });
  // If a hook destroyed the turn while the bind promise was unsettled, the
  // listen callback may still have fired afterwards; finish teardown once.
  if (destroyed && server.listening) {
    (server as { closeAllConnections?: () => void }).closeAllConnections?.();
    server.close(() => {});
  }
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;

  let drainTimer: ReturnType<typeof setTimeout> | null = null;
  const armDrain = (entry: import("../services/grokBotBridgeRegistry").BridgeTurnEntry) => {
    drainTimer = setTimeout(() => {
      drainTimer = null;
      destroyServer();
      // Local teardown has settled; the registry marks the close exactly once
      // and hands remote cleanup to its own budget.
      registry.settleClosed(entry, "normal");
    }, drainBudgetMs);
    drainTimer.unref?.();
  };

  // Lifecycle step 3: register inside the registry critical section. A
  // refusal closes the just-started server before the error returns.
  let registeredEntry: BridgeTurnEntry | null = null;
  const registered = registry.register({
    nonce,
    port,
    createdAt,
    challenge,
    hooks: {
      onDraining: () => {
        if (registeredEntry) armDrain(registeredEntry);
      },
      onForcedAbort: () => {
        if (drainTimer) {
          clearTimeout(drainTimer);
          drainTimer = null;
        }
        destroyServer();
        options.onForcedAbort?.();
      },
      onLocallyClosed: (reason) => options.onLocallyClosed?.(reason),
    },
  });
  if ("reason" in registered) {
    if (drainTimer) {
      clearTimeout(drainTimer);
      drainTimer = null;
    }
    destroyServer();
    throw new Error(`bridge registration refused: ${registered.reason}`);
  }
  registeredEntry = registered.entry;

  if (options.signal) {
    options.signal.addEventListener(
      "abort",
      () => {
        registry.close(nonce, "cancel");
      },
      { once: true }
    );
  }

  return {
    url: `${options.publicBaseUrl.replace(/\/$/, "")}/grok-bridge/${nonce}/mcp`,
    nonce,
    challenge,
    invocations: state.invocations,
    call(value: string) {
      if (value !== challenge) throw new Error("Rejected challenge");
      if (state.used) throw new Error("Repeat call rejected");
      if (state.calls < 1) throw new Error("Bridge tool was not called");
      state.used = true;
      return "ok";
    },
    close(reason: BridgeCloseReason) {
      return registry.close(nonce, reason);
    },
  };
}
