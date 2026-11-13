import { createHash, randomUUID } from "node:crypto";
import { createServer, type Server, type ServerResponse } from "node:http";
import { mkdir, rm } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { z } from "zod";
import type { ZcodeClientLike } from "../zcodeProtocol.ts";
type Turn = { signal: AbortSignal; deadline: number };

// Bound awaited RPCs as well as the intervals between polls. Older injected
// clients may ignore the signal, so the bridge also observes it locally.
async function duringTurn<T>(operation: () => Promise<T>, signal: AbortSignal): Promise<T> {
  signal.throwIfAborted();
  let onAbort: () => void;
  const aborted = new Promise<never>((_resolve, reject) => {
    onAbort = () => reject(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    return await Promise.race([operation(), aborted]);
  } finally {
    signal.removeEventListener("abort", onAbort!);
  }
}

function call(
  client: ZcodeClientLike,
  channel: string,
  method: string,
  args: unknown[],
  turn: Turn
): Promise<unknown> {
  return duringTurn(
    () =>
      client.call(channel, method, args, {
        timeoutMs: Math.max(1, turn.deadline - Date.now()),
        signal: turn.signal,
      }),
    turn.signal
  );
}

async function cleanupCall(client: ZcodeClientLike, method: string, args: unknown[]) {
  const controller = new AbortController();
  const deadline = Date.now() + 5000;
  const timer = setTimeout(
    () => controller.abort(new Error("ZCode native cleanup timed out")),
    5000
  );
  try {
    return await call(client, "zcode-agent", method, args, {
      signal: controller.signal,
      deadline,
    });
  } finally {
    clearTimeout(timer);
  }
}

type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};
const list = (value: unknown): RecordValue[] => (Array.isArray(value) ? value.map(record) : []);
const assistantUsage = (snapshot: unknown): RecordValue => {
  const messages = list(record(snapshot).messages);
  const response = messages
    .filter(
      (message) => record(record(record(message).info).semantics).kind === "assistant_response"
    )
    .at(-1);
  const info = record(record(response).info);
  const tokens = record(info.tokens);
  const cache = record(tokens.cache);
  return {
    inputTokens: tokens.input ?? 0,
    outputTokens: tokens.output ?? 0,
    totalTokens: tokens.total ?? Number(tokens.input ?? 0) + Number(tokens.output ?? 0),
    reasoningTokens: tokens.reasoning ?? 0,
    cacheReadTokens: cache.read ?? 0,
    cacheWriteTokens: cache.write ?? 0,
  };
};
const canonical = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.entries(record(value))
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, item]) => [key, canonical(item)])
        )
      : value;
const digest = (value: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(value)))
    .digest("hex");
const historyDigest = (messages: RecordValue[]) =>
  digest(
    messages.map((message) => ({
      role: message.role,
      content: message.content || "",
      tool_call_id: message.tool_call_id,
      tool_calls: message.tool_calls,
    }))
  );
const rpcSchema = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.union([z.string(), z.number()]).optional(),
  method: z.string(),
  params: z.record(z.string(), z.unknown()).optional(),
});

export class NativeSessionError extends Error {
  constructor(
    message: string,
    public status = 502
  ) {
    super(message);
  }
}
// An expired/changed native session can be reconstructed only from actual
// assistant calls paired with caller results. Never invent a missing result.
function validateCompletedNativeResults(messages: RecordValue[], required: string[]): void {
  const calls = new Map<string, RecordValue>();
  const results = new Set<string>();
  for (const message of messages) {
    if (message.role === "assistant") {
      for (const call of list(message.tool_calls)) {
        const id = String(call.id || "");
        if (!id.startsWith("call_zcn_")) continue;
        if (calls.has(id)) throw new NativeSessionError("Duplicate native tool call", 400);
        calls.set(id, call);
      }
    }
    if (message.role === "tool") {
      const id = String(message.tool_call_id || "");
      if (!id.startsWith("call_zcn_")) continue;
      if (!calls.has(id) || results.has(id))
        throw new NativeSessionError(
          "Native tool result requires one preceding caller tool call",
          400
        );
      results.add(id);
    }
  }
  if (required.some((id) => !results.has(id)) || [...calls.keys()].some((id) => !results.has(id)))
    throw new NativeSessionError("All pending ZCode tool results are required exactly once", 400);
}

type Tool = { name: string; description?: string; inputSchema: RecordValue };
type PendingTool = {
  id: string;
  rpcId: string | number;
  name: string;
  input: RecordValue;
  response: ServerResponse;
  delivered: boolean;
};
type WorkspaceLease = { workspacePath: string; release: () => Promise<void> };

async function leaseWorkspace(root: string, signal: AbortSignal): Promise<WorkspaceLease> {
  const directory = resolve(root);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  for (let slot = 0; ; slot++) {
    signal.throwIfAborted();
    const workspacePath = join(directory, `workspace-${slot}`);
    const leasePath = join(directory, `.workspace-${slot}.lease`);
    try {
      // Atomic across bridge instances and processes. An uncertain cleanup leaves
      // this lease in place, including after a bridge/process is recreated.
      await mkdir(leasePath, { mode: 0o700 });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST") continue;
      throw error;
    }
    try {
      await mkdir(workspacePath, { recursive: true, mode: 0o700 });
    } catch (error) {
      await rm(leasePath, { recursive: true, force: true });
      throw error;
    }
    return {
      workspacePath,
      release: () => rm(leasePath, { recursive: true, force: true }),
    };
  }
}

type Run = {
  client: ZcodeClientLike;
  sessionId: string;
  workspace: { workspacePath: string; workspaceIdentity: string };
  workspaceLease?: WorkspaceLease;
  sessionCreationPending?: boolean;
  scope: string;
  history: RecordValue[];
  toolsHash: string;
  pending: PendingTool[];
  toolsListed: boolean;
  reportedUsage: Record<string, number>;
  relay: Server;
  busy: boolean;
  expires?: ReturnType<typeof setTimeout>;
};

export interface NativeSessionOptions {
  clientFactory: () => ZcodeClientLike;
  workspaceRoot: string;
  reuseWorkspaces?: boolean;
  timeoutMs?: number;
  continuationTimeoutMs?: number;
  pollMs?: number;
}

/** A caller tool is a suspended MCP request. Only the caller supplies its result. */
export class NativeZcodeSessionBridge {
  private continuations = new Map<string, Run>();
  private runs = new Set<Run>();
  private recovering = new Set<string>();
  private projectIds = new Map<string, string>();
  constructor(private options: NativeSessionOptions) {}
  async close(): Promise<void> {
    await Promise.allSettled([...this.runs].map((run) => this.dispose(run)));
  }

  /**
   * @executorRecovery native
   * @executorRecoveryReason Native session RPC owns continuation and does not dispatch a BaseExecutor HTTP payload.
   * @executorRecoveryTest tests/unit/zcode-native-continuation-recovery.test.ts
   */
  async execute(input: {
    scope: string;
    selection: { providerId: string; modelId: string; options?: { reasoningLevel?: string } };
    messages: RecordValue[];
    tools: Tool[];
    signal?: AbortSignal | null;
    deadline?: number;
  }): Promise<RecordValue> {
    const controller = new AbortController();
    const deadline = Math.min(
      input.deadline ?? Infinity,
      Date.now() + (this.options.timeoutMs ?? 120_000)
    );
    const onAbort = () => controller.abort(new NativeSessionError("ZCode request cancelled", 499));
    const timer = setTimeout(
      () => controller.abort(new NativeSessionError("ZCode native session timed out", 504)),
      Math.max(1, deadline - Date.now())
    );
    input.signal?.addEventListener("abort", onAbort, { once: true });
    if (input.signal?.aborted) onAbort();
    if (Date.now() >= deadline)
      controller.abort(new NativeSessionError("ZCode native session timed out", 504));
    try {
      controller.signal.throwIfAborted();
      return await this.executeTurn(input, { signal: controller.signal, deadline });
    } finally {
      clearTimeout(timer);
      input.signal?.removeEventListener("abort", onAbort);
    }
  }

  private async executeTurn(
    input: Parameters<NativeZcodeSessionBridge["execute"]>[0],
    turn: Turn
  ): Promise<RecordValue> {
    const results = input.messages.filter((m) => m.role === "tool");
    const ids = results.map((m) => String(m.tool_call_id || ""));
    if (ids.some((id) => this.recovering.has(id)))
      throw new NativeSessionError("ZCode tool continuation is being recovered", 409);
    const matches = ids.map((id) => this.continuations.get(id)).filter((v): v is Run => !!v);
    let run = matches[0];
    const recoveryIds: string[] = [];
    if (run) {
      if (matches.some((other) => other !== run) || run.scope !== input.scope || run.busy)
        throw new NativeSessionError("ZCode tool continuation does not match this request", 409);
      const outstanding = run.pending.filter((tool) => tool.delivered);
      if (outstanding.some((tool) => ids.filter((id) => id === tool.id).length !== 1))
        throw new NativeSessionError(
          "All pending ZCode tool results are required exactly once",
          400
        );
      const suffix = input.messages.slice(run.history.length);
      const unchanged =
        run.toolsHash === digest(input.tools) &&
        historyDigest(input.messages.slice(0, run.history.length)) === historyDigest(run.history) &&
        suffix.length === outstanding.length &&
        suffix.every(
          (message) =>
            message.role === "tool" && outstanding.some((tool) => tool.id === message.tool_call_id)
        );
      if (!unchanged) {
        validateCompletedNativeResults(
          input.messages,
          outstanding.map((tool) => tool.id)
        );
        for (const tool of outstanding) {
          const call = input.messages
            .flatMap((message) => list(message.tool_calls))
            .find((call) => call.id === tool.id);
          const fn = record(record(call).function);
          let argumentsValue: unknown;
          try {
            argumentsValue = JSON.parse(String(fn.arguments));
          } catch {
            throw new NativeSessionError("Invalid native tool call arguments", 400);
          }
          if (fn.name !== tool.name || digest(argumentsValue) !== digest(tool.input))
            throw new NativeSessionError("Native tool call identity changed", 400);
        }
      }
      run.busy = true;
      clearTimeout(run.expires);
      run.expires = undefined;
      if (!unchanged) {
        // Compression, newly discovered tools and new caller context invalidate the
        // suspended native prompt. Recreate it from the caller's complete current
        // transcript; completed tool results remain history, never relay executions.
        for (const tool of outstanding) {
          this.recovering.add(tool.id);
          recoveryIds.push(tool.id);
        }
        try {
          await this.dispose(run);
          run = await this.start(input, turn);
        } catch (error) {
          for (const id of recoveryIds) this.recovering.delete(id);
          throw error;
        }
      } else {
        for (const tool of outstanding) {
          const result = results.find((m) => m.tool_call_id === tool.id)!;
          this.continuations.delete(tool.id);
          tool.response.writeHead(200, { "content-type": "application/json" });
          tool.response.end(
            JSON.stringify({
              jsonrpc: "2.0",
              id: tool.rpcId,
              result: {
                content: [
                  {
                    type: "text",
                    text:
                      typeof result.content === "string"
                        ? result.content
                        : JSON.stringify(result.content),
                  },
                ],
              },
            })
          );
        }
        run.pending = run.pending.filter((tool) => !outstanding.includes(tool));
        run.history = input.messages;
      }
    } else {
      const nativeResults = results.filter((message) =>
        String(message.tool_call_id || "").startsWith("call_zcn_")
      );
      validateCompletedNativeResults(
        input.messages,
        nativeResults.map((message) => String(message.tool_call_id))
      );
      run = await this.start(input, turn);
    }
    try {
      while (Date.now() < turn.deadline) {
        turn.signal.throwIfAborted();
        if (run.pending.some((tool) => !tool.delivered)) {
          // Let simultaneous tool requests arrive before returning one caller turn.
          await duringTurn(() => new Promise((resolve) => setTimeout(resolve, 40)), turn.signal);
          const pending = run.pending.filter((tool) => !tool.delivered);
          for (const tool of pending) {
            tool.delivered = true;
            this.continuations.set(tool.id, run);
          }
          const calls = pending.map((tool) => ({
            id: tool.id,
            name: tool.name,
            input: tool.input,
          }));
          // The caller tool is already ready. Snapshot and usage are optional
          // projections with one shared budget, never another whole turn.
          const statistics = new AbortController();
          const statisticsTurn: Turn = {
            signal: AbortSignal.any([turn.signal, statistics.signal]),
            deadline: Math.min(turn.deadline, Date.now() + 1000),
          };
          const statisticsTimer = setTimeout(
            () => statistics.abort(new Error("ZCode usage snapshot timed out")),
            Math.max(1, statisticsTurn.deadline - Date.now())
          );
          let usage = assistantUsage(undefined);
          try {
            try {
              usage = assistantUsage(
                await call(
                  run.client,
                  "zcode-agent",
                  "readSession",
                  [{ ...run.workspace, sessionId: run.sessionId, messageLimit: 20 }],
                  statisticsTurn
                )
              );
            } catch {
              // A stalled message projection must not hold the caller tool.
            }
            try {
              // Message projections lag the suspended MCP call; the official
              // session usage endpoint already has the completed model request.
              const aggregate = record(
                await call(
                  run.client,
                  "zcode-agent",
                  "getTaskTokenUsage",
                  [{ ...run.workspace, sessionId: run.sessionId }],
                  statisticsTurn
                )
              );
              usage = {
                inputTokens: Math.max(
                  0,
                  Number(aggregate.inputTokens ?? 0) - run.reportedUsage.inputTokens
                ),
                outputTokens: Math.max(
                  0,
                  Number(aggregate.outputTokens ?? 0) - run.reportedUsage.outputTokens
                ),
                totalTokens: Math.max(
                  0,
                  Number(aggregate.totalTokens ?? 0) - run.reportedUsage.totalTokens
                ),
                reasoningTokens: Math.max(
                  0,
                  Number(aggregate.reasoningTokens ?? 0) - run.reportedUsage.reasoningTokens
                ),
                cacheReadTokens: Math.max(
                  0,
                  Number(aggregate.cacheReadTokens ?? 0) - run.reportedUsage.cacheReadTokens
                ),
                cacheWriteTokens: Math.max(
                  0,
                  Number(aggregate.cacheCreationTokens ?? 0) - run.reportedUsage.cacheWriteTokens
                ),
              };
            } catch {
              // Usage projection is optional; never destroy a ready caller tool
              // merely because native statistics have not arrived yet.
            }
          } finally {
            clearTimeout(statisticsTimer);
          }
          if (input.signal?.aborted) throw new NativeSessionError("ZCode request cancelled", 499);
          for (const key of Object.keys(run.reportedUsage))
            run.reportedUsage[key] += Number(usage[key] ?? 0);
          run.history = [
            ...input.messages,
            {
              role: "assistant",
              content: "",
              tool_calls: calls.map((call) => ({
                id: call.id,
                type: "function",
                function: {
                  name: call.name,
                  arguments: JSON.stringify(call.input),
                },
              })),
            },
          ];
          run.busy = false;
          run.expires = setTimeout(() => {
            void this.dispose(run).catch(() => undefined);
          }, this.options.continuationTimeoutMs ?? 600_000);
          run.expires.unref();
          return {
            text: "",
            finishReason: "tool-calls",
            toolCalls: calls,
            usage,
          };
        }
        const snapshot = record(
          await call(
            run.client,
            "zcode-agent",
            "readSession",
            [
              {
                ...run.workspace,
                sessionId: run.sessionId,
                messageLimit: 20,
              },
            ],
            turn
          )
        );
        const session = record(snapshot.session);
        if (session.status === "error") {
          const error = record(record(snapshot.projection).lastError);
          const detail = `${error.code || ""} ${error.message || ""}`;
          if (
            /\b(?:1005|1310)\b|Weekly\/Monthly Limit Exhausted|quota[_ ](?:exhausted|limit)|rate[_ ]limit/i.test(
              detail
            )
          )
            throw new NativeSessionError("ZCode tariff quota or rate limit reached", 429);
          if (/\b401\b|unauthorized|invalid[_ ]token|authentication/i.test(detail))
            throw new NativeSessionError("ZCode account needs a new login", 401);
          throw new NativeSessionError("ZCode native session failed");
        }
        const messages = list(snapshot.messages);
        const response = messages
          .filter((message) => record(record(message.info).semantics).kind === "assistant_response")
          .at(-1);
        if (response && session.status === "idle" && record(response.info).finish === "stop") {
          if (input.tools.length && !run.toolsListed) {
            throw new NativeSessionError("ZCode caller tools did not connect", 503);
          }
          const text = list(response.parts)
            .filter((part) => part.type === "text")
            .map((part) => String(part.text ?? ""))
            .join("");
          const reasoning = list(response.parts)
            .filter((part) => part.type === "reasoning")
            .map((part) => String(part.text ?? ""))
            .join("\n\n");
          const tokens = record(record(response.info).tokens);
          // The model has completed; cleanup cannot replace its answer.
          await this.dispose(run).catch(() => undefined);
          if (input.signal?.aborted) throw new NativeSessionError("ZCode request cancelled", 499);
          return {
            text,
            reasoning,
            finishReason: "stop",
            usage: {
              inputTokens: tokens.input ?? 0,
              outputTokens: tokens.output ?? 0,
              totalTokens: tokens.total ?? Number(tokens.input ?? 0) + Number(tokens.output ?? 0),
              reasoningTokens: tokens.reasoning ?? 0,
              cacheReadTokens: record(tokens.cache).read ?? 0,
              cacheWriteTokens: record(tokens.cache).write ?? 0,
            },
          };
        }
        await duringTurn(
          () => new Promise((resolve) => setTimeout(resolve, this.options.pollMs ?? 300)),
          turn.signal
        );
      }
      throw new NativeSessionError("ZCode native session timed out", 504);
    } catch (error) {
      await this.dispose(run).catch(() => undefined);
      throw error;
    } finally {
      for (const id of recoveryIds) this.recovering.delete(id);
    }
  }

  private async start(
    input: Parameters<NativeZcodeSessionBridge["execute"]>[0],
    turn: Turn
  ): Promise<Run> {
    if (!input.messages.length) throw new NativeSessionError("Messages are required", 400);
    // Keep native names independent of caller punctuation and naming collisions.
    const names = new Map(input.tools.map((tool, index) => [`tool_${index}`, tool]));
    const token = randomUUID();
    let run: Run;
    const relay = createServer((request, response) => {
      void (async () => {
        if (request.headers.authorization !== `Bearer ${token}`) {
          response.writeHead(401).end();
          return;
        }
        if (request.method !== "POST") {
          response.writeHead(405).end();
          return;
        }
        let body = "";
        for await (const chunk of request) {
          body += chunk;
          if (Buffer.byteLength(body) > 1024 * 1024) {
            response.writeHead(413).end();
            return;
          }
        }
        const parsed = rpcSchema.safeParse(JSON.parse(body));
        if (!parsed.success) {
          response.writeHead(400).end();
          return;
        }
        const message = parsed.data;
        if (message.id === undefined) {
          response.writeHead(202).end();
          return;
        }
        const reply = (result: unknown) => {
          response.writeHead(200, { "content-type": "application/json" });
          response.end(JSON.stringify({ jsonrpc: "2.0", id: message.id, result }));
        };
        if (message.method === "initialize")
          reply({
            protocolVersion: "2024-11-05",
            capabilities: { tools: {} },
            serverInfo: { name: "omniroute-caller", version: "1.0.0" },
          });
        else if (message.method === "tools/list") {
          run.toolsListed = true;
          reply({
            tools: [...names].map(([name, tool]) => ({
              ...tool,
              name,
              description: `${tool.name}: ${tool.description || "Caller-provided tool"}`,
              annotations: { readOnlyHint: true },
            })),
          });
        } else if (message.method === "tools/call") {
          const tool = names.get(String(message.params?.name));
          if (!tool || !run) {
            response.writeHead(400).end();
            return;
          }
          run.pending.push({
            id: `call_zcn_${randomUUID().replaceAll("-", "")}`,
            rpcId: message.id,
            name: tool.name,
            input: record(message.params?.arguments),
            response,
            delivered: false,
          });
        } else reply({});
      })().catch(() => {
        if (!response.headersSent) response.writeHead(400);
        response.end();
      });
    });
    await new Promise<void>((resolve, reject) => {
      relay.once("error", reject);
      relay.listen(0, "127.0.0.1", resolve);
    });
    const address = relay.address();
    if (!address || typeof address === "string") throw new NativeSessionError("MCP relay failed");
    let workspacePath = "";
    let workspaceLease: WorkspaceLease | undefined;
    let client: ZcodeClientLike;
    try {
      if (this.options.reuseWorkspaces) {
        workspaceLease = await leaseWorkspace(this.options.workspaceRoot, turn.signal);
        workspacePath = workspaceLease.workspacePath;
      } else {
        workspacePath = join(this.options.workspaceRoot, randomUUID());
        await mkdir(workspacePath, { recursive: true, mode: 0o700 });
      }
      client = this.options.clientFactory();
    } catch (error) {
      relay.closeAllConnections();
      relay.close();
      if (workspaceLease) await workspaceLease.release();
      else if (workspacePath) await rm(workspacePath, { recursive: true, force: true });
      throw error;
    }
    run = {
      client,
      relay,
      sessionId: "",
      scope: input.scope,
      history: input.messages,
      toolsHash: digest(input.tools),
      pending: [],
      toolsListed: false,
      reportedUsage: {
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        reasoningTokens: 0,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
      },
      busy: true,
      workspace: { workspacePath, workspaceIdentity: workspacePath },
      workspaceLease,
    };
    this.runs.add(run);
    try {
      await duringTurn(
        () =>
          client.start({
            timeoutMs: Math.max(1, turn.deadline - Date.now()),
            signal: turn.signal,
          }),
        turn.signal
      );
      const project = await this.project(run, turn);
      run.sessionCreationPending = true;
      const state = record(
        await call(
          client,
          "zcode-agent",
          "createSession",
          [
            {
              ...run.workspace,
              projectId: project.id,
              model: input.selection,
              persistence: "deferred",
              titleGenerationEnabled: false,
              toolAllowlist: [...names.keys()].map((name) => `mcp__omniroute__${name}`),
              mcpServers: names.size
                ? [
                    {
                      name: "omniroute",
                      type: "http",
                      protocolVersion: "legacy",
                      scope: "user",
                      url: `http://127.0.0.1:${address.port}/mcp`,
                      headers: [{ name: "Authorization", value: `Bearer ${token}` }],
                      alwaysLoad: true,
                      timeoutMs: this.options.continuationTimeoutMs ?? 600_000,
                    },
                  ]
                : [],
            },
          ],
          turn
        )
      );
      run.sessionId = String(record(state.session).sessionId || "");
      if (!run.sessionId) throw new NativeSessionError("Native session was not created");
      run.sessionCreationPending = false;
      const content =
        input.messages.length === 1 && typeof input.messages[0].content === "string"
          ? input.messages[0].content
          : `Respond to the latest user request in this caller conversation. Preserve its instructions and history. Only use the provided caller tools.\n${JSON.stringify(input.messages)}`;
      await call(
        client,
        "zcode-agent",
        "sendPrompt",
        [
          {
            ...run.workspace,
            sessionId: run.sessionId,
            modelSelection: input.selection,
            inputId: randomUUID(),
            content,
          },
        ],
        turn
      );
      return run;
    } catch (error) {
      await this.dispose(run).catch(() => undefined);
      throw error;
    }
  }

  private async project(run: Run, turn: Turn): Promise<RecordValue> {
    const workspacePath = run.workspace.workspacePath;
    let project: RecordValue | undefined;
    if (run.workspaceLease) {
      const cachedId = this.projectIds.get(workspacePath);
      if (cachedId) return { id: cachedId };
      // Unlike readTree, readProjects omits tasks in the supported native API.
      const projects = list(await call(run.client, "project", "readProjects", [{}], turn));
      project = projects.find((entry) =>
        list(entry.roots).some((root) => root.rootPath === workspacePath)
      );
    }
    project ??= record(
      await call(
        run.client,
        "project",
        "saveProject",
        [
          {
            name: run.workspaceLease ? `OmniRoute ${basename(workspacePath)}` : "OmniRoute request",
            roots: [workspacePath],
          },
        ],
        turn
      )
    );
    if (run.workspaceLease) {
      if (typeof project.id !== "string" || !project.id)
        throw new NativeSessionError("Native project was not created");
      this.projectIds.set(workspacePath, project.id);
    }
    return project;
  }

  private async dispose(run: Run): Promise<void> {
    if (!this.runs.delete(run)) return;
    clearTimeout(run.expires);
    for (const [id, owner] of this.continuations) if (owner === run) this.continuations.delete(id);
    for (const tool of run.pending) tool.response.destroy();
    run.relay.closeAllConnections();
    run.relay.close();
    let cleaned = false;
    try {
      try {
        if (run.sessionId) {
          const closed = await cleanupCall(run.client, "closeSession", [
            { ...run.workspace, sessionId: run.sessionId },
          ]);
          if (run.workspaceLease && closed === false)
            throw new NativeSessionError("Native session cleanup was not acknowledged");
        }
      } finally {
        try {
          // Closing a deferred session does not stop its workspace engine. Native
          // releasePreparation also preserves other sessions in a shared engine.
          await cleanupCall(run.client, "disposeWorkspace", [
            { ...run.workspace, releasePreparation: true },
          ]);
        } finally {
          await run.client.close();
        }
      }
      cleaned = !run.sessionCreationPending;
    } finally {
      if (run.workspaceLease) {
        if (cleaned) await run.workspaceLease.release();
      } else {
        await rm(run.workspace.workspacePath, { recursive: true, force: true });
      }
    }
  }
}
