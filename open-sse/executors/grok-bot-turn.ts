import { randomUUID } from "node:crypto";
import type { ExecuteInput } from "./base.ts";
import { HTTP_STATUS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { enqueueCleanup } from "./grok-bot-cleanup-queue.ts";
import {
  CREATE_TIMEOUT_MS,
  DELETE_TIMEOUT_MS,
  HARNESS_TEMPORAL,
  EMPTY_SESSION_ID,
  chatCompletionBody,
  composePrompt,
  errResponse,
  isTimeoutError,
  remoteMcpServers,
  toolCallBody,
  type BridgeController,
  type BridgeTurnOptions,
  type StartedBridge,
  type Transport,
} from "./grok-bot-protocol.ts";
import { createGrokTurnStream } from "./grok-bot-stream.ts";
import { watchGrokBotTurn } from "./grok-bot-watch.ts";

type ClientTool = { function?: { name?: string; description?: string; parameters?: unknown } };
type AdvertisedTool = { name: string; description?: string; inputSchema?: unknown };
type RequestBridge = { url?: string; challenge?: string };
type RequestBody = {
  messages?: unknown[];
  model?: string;
  grokBotBridge?: RequestBridge;
  tools?: unknown[];
  tool_choice?: unknown;
  parallel_tool_calls?: boolean;
};
type DiscoveredTool = { name?: string; toolName?: string };
type Discovery = { tools?: DiscoveredTool[]; servers?: Array<{ tools?: DiscoveredTool[] }> };
type TurnOwner = {
  machineId: string;
  bridgeController: BridgeController | null;
  bridgeLifecycle: string[];
  usedBridgeNonces: Set<string>;
};

function advertisedTools(tools: unknown[]): AdvertisedTool[] {
  return tools.flatMap((tool: ClientTool) => {
    const fn = tool?.function;
    if (!fn || typeof fn.name !== "string" || !fn.name) return [];
    const schema = fn.parameters;
    const inputSchema =
      schema && typeof schema === "object" && !Array.isArray(schema)
        ? schema
        : { type: "object", properties: {} };
    return [{ name: fn.name, description: fn.description, inputSchema }];
  });
}

function requestBridge(body: RequestBody, tools: unknown[]): RequestBridge | undefined {
  return (
    body.grokBotBridge ??
    (tools.length > 0 && body.tool_choice !== "none" && process.env.GROK_BOT_PUBLIC_BRIDGE_URL
      ? { url: process.env.GROK_BOT_PUBLIC_BRIDGE_URL, challenge: randomUUID() }
      : undefined)
  );
}

function isLoopback(url: string | undefined): boolean {
  return /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/.test(url ?? "");
}

function bridgeError(message: string): Response {
  return errResponse(HTTP_STATUS.BAD_GATEWAY ?? 502, message);
}

function discoveryTools(discovery: Discovery): DiscoveredTool[] {
  const direct = Array.isArray(discovery?.tools) ? discovery.tools : [];
  const servers = Array.isArray(discovery?.servers)
    ? discovery.servers.flatMap((server) => (Array.isArray(server?.tools) ? server.tools : []))
    : [];
  return [...direct, ...servers];
}

function isBridgeTool(tool: DiscoveredTool, registered: Set<string>): boolean {
  return (
    tool?.toolName === "bridge_value" ||
    tool?.name === "bridge_value" ||
    tool?.name === "bridge-bridge_value" ||
    (typeof tool?.toolName === "string" && registered.has(tool.toolName)) ||
    (typeof tool?.name === "string" &&
      tool.name.startsWith("bridge-") &&
      registered.has(tool.name.slice("bridge-".length)))
  );
}

async function startBridge(
  controller: BridgeController,
  url: string | undefined,
  options: BridgeTurnOptions
): Promise<StartedBridge> {
  let started: StartedBridge | null = null;
  for (let attempt = 0; attempt < 2 && !started; attempt += 1) {
    try {
      started = await controller.start(url, options);
    } catch (error) {
      if (attempt === 1) throw error;
      await controller.stop();
    }
  }
  if (!started) throw new Error("Bridge start failed");
  return started;
}

/** Request-local ownership of one temporal agent, bridge and response body. */
export class GrokBotTurn {
  private readonly body: RequestBody;
  private readonly model: string;
  private readonly id = `chatcmpl-${randomUUID()}`;
  private readonly agentId = randomUUID();
  private readonly connectionId: string | null;
  private readonly log: ExecuteInput["log"];
  private rowId: string | null = null;
  private createdOk = false;
  private bridgeStartAttempted = false;
  private deleteOwnershipTransferred = false;
  private bridge: RequestBridge | undefined;
  private clientToolList: unknown[] = [];
  private bridgeUrl: string | undefined;
  private bridgeCall: ((challenge: string) => string) | undefined;
  private advertisedToolName: string | undefined;
  private advertised: AdvertisedTool[] = [];
  private startedBridge: StartedBridge | null = null;
  private readonly turnController = new AbortController();

  constructor(
    private readonly input: ExecuteInput,
    private readonly transport: Transport,
    private readonly owner: TurnOwner
  ) {
    this.body = (input.body ?? {}) as RequestBody;
    this.model = input.model ?? this.body.model ?? "grok-bot";
    this.connectionId = input.credentials?.connectionId ?? null;
    this.log = input.log ?? null;
  }

  async run(): Promise<Response> {
    try {
      const createError = await this.createAgent();
      if (createError) return createError;
      const preparationError = await this.prepareBridge();
      if (preparationError) return preparationError;
      const { collect } = await this.send();
      if (this.input.stream !== true) return await this.nonStream(collect);
      const response = createGrokTurnStream({
        model: this.model,
        id: this.id,
        collect,
        startedBridge: this.startedBridge,
        clientToolList: this.clientToolList,
        turnController: this.turnController,
        signal: this.input.signal,
        deleteAgent: () => this.deleteAgent(),
      });
      this.deleteOwnershipTransferred = true;
      return response;
    } catch (error) {
      return this.failureResponse(error);
    } finally {
      await this.cleanup();
    }
  }

  private async createAgent(): Promise<Response | undefined> {
    let created: unknown;
    try {
      created = await this.transport.rpc(
        "CreateGrokBotTemporalAgent",
        {
          agentId: this.agentId,
          name: "omni-grok-bot",
          description:
            "OmniRoute single-conversation bridge agent. Do not use tools, files, network, integrations, memory storage, or computer access.",
          title: "",
          avatarShape: "",
          avatarColor: "",
          harness: HARNESS_TEMPORAL,
          kickstartRequested: false,
          introductionSuppressed: true,
          language: "en",
        },
        { signal: AbortSignal.timeout(CREATE_TIMEOUT_MS) }
      );
    } catch (error) {
      if (isTimeoutError(error)) this.queueCleanup();
      throw error;
    }
    const agent = (created as { agent?: { id?: string; legacyAgentId?: string; harness?: string } })
      ?.agent;
    if (!agent || agent.legacyAgentId !== this.agentId || agent.harness !== "temporal") {
      return bridgeError("CreateGrokBotTemporalAgent returned an invalid agent");
    }
    this.rowId = agent.id ?? null;
    // Cleanup ownership begins immediately, before discovery or send can fail.
    this.createdOk = true;
  }

  private queueCleanup(includeRow = false): void {
    enqueueCleanup({
      connectionId: this.connectionId,
      agentId: this.agentId,
      ...(includeRow ? { rowId: this.rowId } : {}),
      createdAt: new Date().toISOString(),
    });
  }

  private async deleteAgent(): Promise<void> {
    if (!this.rowId) {
      this.queueCleanup();
      return;
    }
    try {
      await this.transport.rpc(
        "DeleteGrokBotAgent",
        { id: this.rowId },
        { signal: AbortSignal.timeout(DELETE_TIMEOUT_MS) }
      );
    } catch (error) {
      this.queueCleanup(true);
      this.log?.warn?.("GROK_BOT", `agent cleanup failed: ${sanitizeErrorMessage(error)}`);
    }
  }

  private validateBridge(): Response | undefined {
    if (!this.bridge) return;
    if (!this.bridge.url) return bridgeError("Request bridge URL is missing");
    if (this.owner.bridgeController && !process.env.GROK_BOT_PUBLIC_BRIDGE_URL)
      return bridgeError("Request bridge is disabled");
    if (this.bridge.url !== process.env.GROK_BOT_PUBLIC_BRIDGE_URL && !isLoopback(this.bridge.url))
      return bridgeError("Request bridge URL must stay on loopback");
    if (!this.owner.bridgeController && !this.bridge.challenge)
      return bridgeError("Request bridge challenge is missing");
  }

  private async prepareBridge(): Promise<Response | undefined> {
    this.clientToolList = Array.isArray(this.body.tools) ? this.body.tools : [];
    this.bridge = requestBridge(this.body, this.clientToolList);
    const invalid = this.validateBridge();
    if (invalid) return invalid;
    this.bridgeUrl = this.bridge?.url;
    if (!this.bridge) return;
    this.owner.bridgeLifecycle.length = 0;
    if (this.owner.bridgeController) {
      const startError = await this.startControllerBridge(this.owner.bridgeController);
      if (startError) return startError;
    } else if (!isLoopback(this.bridgeUrl)) {
      return bridgeError("Request bridge URL must stay on loopback");
    }
    return this.discoverBridge();
  }

  private linkCancellation(): void {
    if (!this.input.signal) return;
    if (this.input.signal.aborted) this.turnController!.abort();
    else
      this.input.signal.addEventListener("abort", () => this.turnController?.abort(), {
        once: true,
      });
  }

  private async startControllerBridge(controller: BridgeController): Promise<Response | undefined> {
    this.bridgeStartAttempted = true;
    this.owner.bridgeLifecycle.push("start");
    this.advertised = advertisedTools(this.clientToolList);
    const options: BridgeTurnOptions = {
      signal: this.turnController.signal,
      onForcedAbort: () => this.turnController?.abort(),
      ...(this.advertised.length ? { tools: this.advertised } : {}),
    };
    this.linkCancellation();
    this.startedBridge = await startBridge(controller, this.bridge!.url, options);
    this.bridgeUrl = this.startedBridge.url;
    this.bridgeCall = this.startedBridge.call;
    const url = this.bridgeUrl ?? "";
    if (
      !/^https:\/\/(?!127\.0\.0\.1|localhost(?:[:/]|$))/.test(url) ||
      !/\/grok-bridge\/[A-Za-z0-9_-]{22}\/mcp$/.test(url) ||
      this.owner.usedBridgeNonces.has(url)
    ) {
      return bridgeError("Request bridge URL must use a public HTTPS path-nonce endpoint");
    }
    this.owner.usedBridgeNonces.add(url);
  }

  private challenge(): string | undefined {
    return this.startedBridge?.challenge ?? this.bridge?.challenge;
  }

  private bridgeServer() {
    return { url: this.bridgeUrl, headers: { Authorization: `Bearer ${this.challenge()}` } };
  }

  private async discoverBridge(): Promise<Response | undefined> {
    const remote = remoteMcpServers();
    const discovery = (await this.transport.rpc("aiserver.v1.DashboardService/ListSandMcpTools", {
      serverIdentifiers: ["bridge", ...Object.keys(remote)],
      mcpConfigJson: JSON.stringify({ mcpServers: { bridge: this.bridgeServer(), ...remote } }),
    })) as Discovery;
    const registered = new Set(this.advertised.map((tool) => tool.name));
    const found = discoveryTools(discovery).find((tool) => isBridgeTool(tool, registered));
    if (!found) return bridgeError("Request bridge tool was not discovered");
    this.advertisedToolName = found.toolName || found.name;
  }

  private turnSignal(): AbortSignal | null {
    if (!this.turnController) return this.input.signal ?? null;
    return this.input.signal
      ? AbortSignal.any([this.input.signal, this.turnController.signal])
      : this.turnController.signal;
  }

  private async send(): Promise<{ collect: Promise<string> }> {
    const prompt = composePrompt(
      this.body.messages ?? [],
      this.challenge(),
      this.advertisedToolName,
      this.advertised.length > 0,
      this.body.tool_choice,
      this.body.parallel_tool_calls !== false
    );
    const messageId = randomUUID();
    const payload: Record<string, unknown> = {
      agentId: this.agentId,
      sessionId: EMPTY_SESSION_ID,
      machineId: this.owner.machineId,
      messageId,
      text: prompt,
      sentAtMs: String(Date.now()),
    };
    const remote = remoteMcpServers();
    if (this.bridge || Object.keys(remote).length > 0) {
      const servers: Record<string, unknown> = {};
      if (this.bridge) servers.bridge = this.bridgeServer();
      Object.assign(servers, remote);
      payload.mcpConfigJson = JSON.stringify({ mcpServers: servers });
    }
    await this.transport.rpc("SendGrokBotUserMessage", payload);
    return {
      collect: watchGrokBotTurn(
        this.transport,
        this.agentId,
        messageId,
        this.turnSignal(),
        this.input.log ?? null
      ),
    };
  }

  private json(value: unknown): Response {
    return new Response(JSON.stringify(value), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  private async nonStream(collect: Promise<string>): Promise<Response> {
    const text = await collect;
    if (this.bridge && text?.trim() === "TOOL_UNAVAILABLE") {
      return errResponse(
        HTTP_STATUS.BAD_GATEWAY ?? 502,
        "Request bridge tool was not called",
        "bridge_not_called"
      );
    }
    if (this.startedBridge?.invocations?.length) {
      return this.json(
        toolCallBody(this.model, this.id, this.startedBridge.invocations, text || null)
      );
    }
    let answer = text;
    if (this.bridgeCall) {
      try {
        answer = this.bridgeCall(this.challenge() ?? "");
      } catch (error) {
        return errResponse(
          HTTP_STATUS.BAD_GATEWAY ?? 502,
          sanitizeErrorMessage(error),
          "bridge_rejected"
        );
      }
    }
    if (!answer) return bridgeError("turn finished without an answer");
    return this.json(chatCompletionBody(this.model, answer, this.id));
  }

  private failureResponse(error: unknown): Response {
    if (
      (error as { errorType?: unknown }).errorType === "incomplete_turn" &&
      this.startedBridge?.invocations?.length
    ) {
      return this.json(toolCallBody(this.model, this.id, this.startedBridge.invocations));
    }
    const errorType = (error as { errorType?: unknown }).errorType;
    return errResponse(
      HTTP_STATUS.BAD_GATEWAY ?? 502,
      sanitizeErrorMessage(error),
      typeof errorType === "string" ? errorType : "upstream_error"
    );
  }

  private async cleanup(): Promise<void> {
    // The stream body owns both resources until collection settles or is cancelled.
    if (this.deleteOwnershipTransferred) return;
    // Remote cleanup precedes bridge stop and has its own independent timeout.
    if (this.createdOk) await this.deleteAgent();
    if (this.startedBridge?.close) {
      this.owner.bridgeLifecycle.push("close");
      this.startedBridge.close("normal");
    } else if (this.bridgeStartAttempted && this.owner.bridgeController) {
      this.owner.bridgeLifecycle.push("stop");
      try {
        await this.owner.bridgeController.stop();
      } catch (error) {
        this.owner.bridgeLifecycle.push("stop-failed");
        this.log?.warn?.("GROK_BOT", `bridge stop failed: ${sanitizeErrorMessage(error)}`);
      }
    }
  }
}
