import { test } from "node:test";
import assert from "node:assert/strict";
import { access, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NativeZcodeSessionBridge } from "../../open-sse/executors/zcode/nativeSession.ts";

type Input = Parameters<NativeZcodeSessionBridge["execute"]>[0];
type Message = Input["messages"][number];
type CallerCall = { id: string; name: string; input: unknown };
const notice: Message = {
  role: "developer",
  content:
    "<tools>\nAdded deferred tool namespaces:\n- mcp__gptadmin: ## GrepMesh search routing\n</tools>",
};
const base: Input = {
  scope: "account-a:start:caller-a",
  selection: { providerId: "account:zai-start-plan", modelId: "GLM-5.3-Flash" },
  messages: [{ role: "user", content: "Call echo exactly once, then report its result" }],
  tools: [{ name: "echo", inputSchema: { type: "object" } }],
};

function assistant(call: CallerCall): Message {
  return {
    role: "assistant",
    content: "",
    tool_calls: [
      {
        id: call.id,
        type: "function",
        function: { name: call.name, arguments: JSON.stringify(call.input) },
      },
    ],
  };
}
function returned(call: CallerCall, value: string): Message[] {
  return [
    ...base.messages,
    assistant(call),
    { role: "tool", tool_call_id: call.id, content: value },
  ];
}
function callerCall(result: Record<string, unknown>): CallerCall {
  assert.equal(result.finishReason, "tool-calls");
  const calls = result.toolCalls as CallerCall[];
  assert.equal(calls.length, 1);
  return calls[0];
}

async function harness(
  options: { firstCallsTool?: boolean; closeFails?: boolean; usageFails?: boolean } = {}
) {
  const root = await mkdtemp(join(tmpdir(), "native-continuation-metadata-"));
  const events: string[] = [];
  const clients: Array<{
    workspace: string;
    prompt: string;
    model?: unknown;
    allowlist?: unknown;
    toolReply?: string;
    request?: Promise<void>;
    cancelled: boolean;
  }> = [];
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    pollMs: 2,
    timeoutMs: 3000,
    clientFactory: () => {
      const index = clients.length;
      const state: (typeof clients)[number] = { workspace: "", prompt: "", cancelled: false };
      clients.push(state);
      let relayUrl = "";
      let headers: Record<string, string> = {};
      return {
        async start() {},
        async close() {
          events.push("client-close:" + index);
          await state.request;
        },
        async call(_channel, method, args) {
          const params = args[0] as Record<string, unknown>;
          if (method === "saveProject") return { id: "project-" + index };
          if (method === "createSession") {
            events.push("create:" + index);
            if (index > 0) {
              await assert.rejects(access(clients[index - 1].workspace), { code: "ENOENT" });
            }
            state.workspace = String(params.workspacePath);
            state.model = params.model;
            state.allowlist = params.toolAllowlist;
            const server = (
              params.mcpServers as Array<{
                url: string;
                headers: Array<{ name: string; value: string }>;
              }>
            )[0];
            relayUrl = server.url;
            headers = Object.fromEntries(server.headers.map((h) => [h.name, h.value]));
            return { session: { sessionId: "session-" + index } };
          }
          if (method === "sendPrompt") {
            state.prompt = String(params.content);
            await fetch(relayUrl, {
              method: "POST",
              headers,
              body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "tools/list" }),
            });
            if (index === 0 && options.firstCallsTool !== false) {
              state.request = (async () => {
                try {
                  const response = await fetch(relayUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                      jsonrpc: "2.0",
                      id: 1,
                      method: "tools/call",
                      params: { name: "tool_0", arguments: { value: 7 } },
                    }),
                  });
                  const body = (await response.json()) as {
                    result: { content: Array<{ text: string }> };
                  };
                  state.toolReply = body.result.content[0].text;
                  events.push("tool-result:" + index);
                } catch {
                  state.cancelled = true;
                  events.push("tool-cancelled:" + index);
                }
              })();
            }
            return { accepted: true };
          }
          if (method === "getTaskTokenUsage") {
            if (options.usageFails) throw new Error("usage unavailable");
            return { totalTokens: 0 };
          }
          if (method === "readSession") {
            if (index === 0 && options.firstCallsTool !== false && !state.toolReply) {
              return { session: { status: "running" }, messages: [] };
            }
            const messages = state.toolReply
              ? []
              : (JSON.parse(state.prompt.slice(state.prompt.indexOf("\n") + 1)) as Message[]);
            const result =
              state.toolReply ??
              messages.filter((m) => m.role === "tool").at(-1)?.content ??
              "fresh";
            return {
              session: { status: "idle" },
              messages: [
                {
                  info: { finish: "stop", semantics: { kind: "assistant_response" } },
                  parts: [{ type: "text", text: result }],
                },
              ],
            };
          }
          if (method === "closeSession") {
            events.push("close-session:" + index);
            if (options.closeFails && index === 0) throw new Error("native close failed");
            await new Promise((resolve) => setTimeout(resolve, 20));
            return true;
          }
          if (method === "disposeWorkspace") {
            assert.equal(params.releasePreparation, true);
            events.push("dispose-workspace:" + index);
            return true;
          }
          throw new Error("Unexpected method " + method);
        },
      };
    },
  });
  return {
    root,
    bridge,
    clients,
    events,
    async close() {
      await bridge.close();
      await rm(root, { recursive: true, force: true });
    },
  };
}

test("changed compressed history rebases with completed tool results instead of rejecting Start", async () => {
  const h = await harness();
  try {
    const call = callerCall(await h.bridge.execute(base));
    const messages = [
      { role: "user", content: "Compressed caller history" },
      ...returned(call, "completed-once").slice(1),
    ];
    const result = await h.bridge.execute({ ...base, messages });
    assert.equal(result.text, "completed-once");
    assert.equal(h.clients.length, 2);
    assert.equal(h.clients[0].cancelled, true);
    assert.equal(h.clients[0].toolReply, undefined);
    assert.deepEqual(
      JSON.parse(h.clients[1].prompt.slice(h.clients[1].prompt.indexOf("\n") + 1)),
      messages
    );
  } finally {
    await h.close();
  }
});
test("expanded tool catalog and developer context rebase without executing the completed caller tool", async () => {
  const h = await harness();
  try {
    const call = callerCall(await h.bridge.execute(base));
    const messages = [...returned(call, "done"), notice];
    const result = await h.bridge.execute({
      ...base,
      messages,
      tools: [...base.tools, { name: "new_tool", inputSchema: { type: "object" } }],
    });
    assert.equal(result.text, "done");
    assert.equal(h.clients.length, 2);
    assert.equal(h.clients[0].toolReply, undefined);
    assert.deepEqual(
      JSON.parse(h.clients[1].prompt.slice(h.clients[1].prompt.indexOf("\n") + 1)),
      messages
    );
  } finally {
    await h.close();
  }
});
test("complete caller tool history recovers after native process loss or combo fallback", async () => {
  const h = await harness({ firstCallsTool: false });
  try {
    const call = { id: "call_zcn_previous_process", name: "echo", input: { value: 7 } };
    const messages = returned(call, "already-executed");
    const result = await h.bridge.execute({ ...base, messages });
    assert.equal(result.text, "already-executed");
    assert.equal(h.clients.length, 1);
    assert.deepEqual(
      JSON.parse(h.clients[0].prompt.slice(h.clients[0].prompt.indexOf("\n") + 1)),
      messages
    );
  } finally {
    await h.close();
  }
});
test("ordinary continuation still consumes its result in the same run, and caller isolation remains enforced", async () => {
  const h = await harness();
  try {
    const call = callerCall(await h.bridge.execute(base));
    const messages = returned(call, "once");
    await assert.rejects(
      h.bridge.execute({ ...base, scope: "another-caller", messages }),
      /does not match/
    );
    const result = await h.bridge.execute({ ...base, messages });
    assert.equal(result.text, "once");
    assert.equal(h.clients.length, 1);
    assert.equal(h.events.filter((e) => e === "tool-result:0").length, 1);
  } finally {
    await h.close();
  }
});

test("orphaned and duplicate native results cannot create replacement sessions", async () => {
  const h = await harness({ firstCallsTool: false });
  try {
    const call = { id: "call_zcn_previous_process", name: "echo", input: {} };
    const complete = returned(call, "done");
    for (const messages of [
      [...base.messages, complete.at(-1)!],
      [...complete, complete.at(-1)!],
    ]) {
      await assert.rejects(h.bridge.execute({ ...base, messages }), /requires one preceding/);
    }
    assert.equal(h.clients.length, 0);
  } finally {
    await h.close();
  }
});

test("changed pending tool identity is rejected before recovery, and overlapping recovery stays reserved", async () => {
  const h = await harness();
  try {
    const call = callerCall(await h.bridge.execute(base));
    const messages = returned(call, "once");
    const altered = returned({ ...call, name: "wrong" }, "once");
    await assert.rejects(h.bridge.execute({ ...base, messages: altered }), /identity changed/);
    const recoveryMessages = [{ role: "system", content: "new caller context" }, ...messages];
    const recovery = h.bridge.execute({ ...base, messages: recoveryMessages });
    await new Promise((resolve) => setTimeout(resolve, 5));
    await assert.rejects(
      h.bridge.execute({ ...base, messages: recoveryMessages }),
      /being recovered/
    );
    assert.equal((await recovery).text, "once");
    assert.equal(h.clients.length, 2);
  } finally {
    await h.close();
  }
});

test("unavailable usage statistics preserve the ready caller tool and its continuation", async () => {
  const h = await harness({ usageFails: true });
  try {
    const call = callerCall(await h.bridge.execute(base));
    const final = await h.bridge.execute({
      ...base,
      messages: returned(call, "actual-tool-result"),
    });
    assert.equal(final.text, "actual-tool-result");
    assert.equal(h.clients.length, 1);
  } finally {
    await h.close();
  }
});
