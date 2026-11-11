import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NativeZcodeSessionBridge } from "../../open-sse/executors/zcode/nativeSession.ts";

type Fields = Record<string, unknown>;

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function fixture(
  options: {
    reuse?: boolean;
    pauseReads?: boolean;
    pauseFirstCleanup?: boolean;
    failFirstCleanup?: boolean;
    rejectFirstClose?: boolean;
    unknownFirstCreate?: boolean;
  } = {}
) {
  const root = await mkdtemp(join(tmpdir(), "native-workspace-pool-"));
  const projects = new Map<string, { id: string; roots: Array<{ rootPath: string }> }>();
  const sessions: Array<{ workspacePath: string; projectId: string; id: string }> = [];
  const projectReads: unknown[][] = [];
  const projectSaves: Fields[] = [];
  const reads = deferred();
  const cleanup = deferred();
  const cleanupStarted = deferred();
  const sessionWaiters: Array<{ count: number; done: () => void }> = [];
  const toolRequests: Promise<void>[] = [];
  const bridges: NativeZcodeSessionBridge[] = [];
  let clientCount = 0;

  const makeBridge = () => {
    const bridge = new NativeZcodeSessionBridge({
      workspaceRoot: root,
      reuseWorkspaces: options.reuse ?? true,
      timeoutMs: 2000,
      pollMs: 1,
      clientFactory: () => {
        const index = ++clientCount;
        let relay: { url: string; headers: Record<string, string> } | undefined;
        let reply: string | undefined;
        return {
          async start() {},
          async close() {},
          async call(channel, method, args) {
            const params = args[0] as Fields;
            if (channel === "project" && method === "readProjects") {
              assert.deepEqual(args, [{}]);
              projectReads.push(args);
              return [...projects.values()];
            }
            if (method === "readTree")
              throw new Error("readTree reads all tasks; use the supported readProjects API");
            if (method === "saveProject") {
              assert.equal(params.id, undefined, "remote cannot invent a project ID");
              assert.equal(params.reuseExistingRoot, undefined, "remote flag is unsupported");
              const path = (params.roots as string[])[0];
              const project = {
                id: `project-${projectSaves.length + 1}`,
                roots: [{ rootPath: path }],
              };
              projectSaves.push(params);
              projects.set(project.id, project);
              return project;
            }
            if (method === "createSession") {
              const path = String(params.workspacePath);
              const projectId = String(params.projectId);
              assert(projects.get(projectId)?.roots.some((entry) => entry.rootPath === path));
              const servers = params.mcpServers as Array<{
                url: string;
                headers: Array<{ name: string; value: string }>;
              }>;
              if (servers.length)
                relay = {
                  url: servers[0].url,
                  headers: Object.fromEntries(
                    servers[0].headers.map(({ name, value }) => [name, value])
                  ),
                };
              const id = `session-${index}`;
              sessions.push({ workspacePath: path, projectId, id });
              for (const waiter of sessionWaiters)
                if (sessions.length >= waiter.count) waiter.done();
              if (index === 1 && options.unknownFirstCreate)
                throw new Error("Native createSession result UNKNOWN");
              return { session: { sessionId: id } };
            }
            if (method === "sendPrompt") {
              if (relay) {
                const target = relay;
                toolRequests.push(
                  (async () => {
                    await fetch(target.url, {
                      method: "POST",
                      headers: target.headers,
                      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
                    });
                    const response = await fetch(target.url, {
                      method: "POST",
                      headers: target.headers,
                      body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 2,
                        method: "tools/call",
                        params: { name: "tool_0", arguments: {} },
                      }),
                    });
                    const body = (await response.json()) as {
                      result: { content: Array<{ text: string }> };
                    };
                    reply = body.result.content[0].text;
                  })()
                );
              }
              return { accepted: true };
            }
            if (method === "getTaskTokenUsage") return {};
            if (method === "readSession") {
              if (options.pauseReads) await reads.promise;
              if (relay && reply === undefined)
                return { session: { status: "running" }, messages: [] };
              return {
                session: { status: "idle" },
                messages: [
                  {
                    info: { finish: "stop", semantics: { kind: "assistant_response" } },
                    parts: [{ type: "text", text: reply ?? "done" }],
                  },
                ],
              };
            }
            if (method === "closeSession") return !(index === 1 && options.rejectFirstClose);
            if (method === "disposeWorkspace") {
              assert.equal(params.releasePreparation, true);
              if (index === 1) {
                cleanupStarted.resolve();
                if (options.pauseFirstCleanup) await cleanup.promise;
                if (options.failFirstCleanup) throw new Error("Native cleanup result UNKNOWN");
              }
              return true;
            }
            throw new Error(`Unexpected RPC ${channel}.${method}`);
          },
        };
      },
    });
    bridges.push(bridge);
    return bridge;
  };
  return {
    root,
    projects,
    sessions,
    projectReads,
    projectSaves,
    reads,
    cleanup,
    cleanupStarted,
    makeBridge,
    waitForSessions(count: number) {
      return sessions.length >= count
        ? Promise.resolve()
        : new Promise<void>((done) => sessionWaiters.push({ count, done }));
    },
    async close() {
      reads.resolve();
      cleanup.resolve();
      await Promise.allSettled(bridges.map((bridge) => bridge.close()));
      await Promise.allSettled(toolRequests);
      await rm(root, { recursive: true, force: true });
    },
  };
}

const input = {
  scope: "owned-account:coding:caller",
  selection: { providerId: "account:zai-start-plan", modelId: "GLM-5.3-Flash" },
  messages: [{ role: "user", content: "Return a short answer" }],
  tools: [],
};

test("workspace reuse bounds sequential project count and caches the exact project", async () => {
  const f = await fixture();
  try {
    const bridge = f.makeBridge();
    for (let i = 0; i < 4; i++) assert.equal((await bridge.execute(input)).text, "done");
    assert.equal(f.projectSaves.length, 1, "sequential sessions must not add projects");
    assert.equal(new Set(f.sessions.map((session) => session.workspacePath)).size, 1);
    assert.equal(f.projectReads.length, 1, "one supported lookup, then cached project ID");
  } finally {
    await f.close();
  }
});

test("concurrent bridges exclusively lease distinct slots and reuse the released pool", async () => {
  const f = await fixture({ pauseReads: true });
  try {
    const first = f.makeBridge();
    const second = f.makeBridge();
    const a = first.execute(input);
    const b = second.execute(input);
    await f.waitForSessions(2);
    assert.notEqual(f.sessions[0].workspacePath, f.sessions[1].workspacePath);
    assert.notEqual(f.sessions[0].projectId, f.sessions[1].projectId);
    f.reads.resolve();
    await Promise.all([a, b]);
    await first.execute(input);
    assert.equal(f.projectSaves.length, 2, "pool size is bounded by concurrent leases");
    assert(
      f.sessions
        .slice(0, 2)
        .some((session) => session.workspacePath === f.sessions[2].workspacePath)
    );
  } finally {
    await f.close();
  }
});

test("bridge recreation finds the same project by exact persisted root", async () => {
  const f = await fixture();
  try {
    const first = f.makeBridge();
    await first.execute(input);
    await first.close();
    const existing = [...f.projects];
    f.projects.clear();
    f.projects.set("unrelated-project", {
      id: "unrelated-project",
      roots: [{ rootPath: f.sessions[0].workspacePath + "-other" }],
    });
    for (const [id, project] of existing) f.projects.set(id, project);
    const second = f.makeBridge();
    await second.execute(input);
    assert.equal(f.sessions[1].workspacePath, f.sessions[0].workspacePath);
    assert.equal(f.sessions[1].projectId, f.sessions[0].projectId);
    assert.equal(f.projectSaves.length, 1, "recreation must look up, not recreate, the project");
    assert.equal(f.projectReads.length, 2);
    assert(f.projects.has("unrelated-project"), "unrelated projects stay untouched");
  } finally {
    await f.close();
  }
});

test("caller continuation keeps its slot until the external tool result completes", async () => {
  const f = await fixture();
  try {
    const bridge = f.makeBridge();
    const toolInput = { ...input, tools: [{ name: "echo", inputSchema: { type: "object" } }] };
    const first = await bridge.execute(toolInput);
    assert.equal(first.finishReason, "tool-calls");
    const call = (first.toolCalls as Array<{ id: string; name: string; input: Fields }>)[0];
    await bridge.execute(input);
    assert.notEqual(f.sessions[1].workspacePath, f.sessions[0].workspacePath);
    const result = await bridge.execute({
      ...toolInput,
      messages: [
        ...input.messages,
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: call.id,
              type: "function",
              function: { name: call.name, arguments: JSON.stringify(call.input) },
            },
          ],
        },
        { role: "tool", tool_call_id: call.id, content: "caller-result" },
      ],
    });
    assert.equal(result.text, "caller-result");
    assert.equal(f.sessions.length, 2, "continuation must use the suspended native session");
    await bridge.execute(input);
    assert.equal(f.sessions[2].workspacePath, f.sessions[0].workspacePath);
    assert.equal(f.projectSaves.length, 2);
  } finally {
    await f.close();
  }
});

test("a slot remains leased while native cleanup is still pending", async () => {
  const f = await fixture({ pauseFirstCleanup: true });
  try {
    const first = f.makeBridge().execute(input);
    await f.cleanupStarted.promise;
    const second = f.makeBridge();
    await second.execute(input);
    assert.notEqual(f.sessions[0].workspacePath, f.sessions[1].workspacePath);
    f.cleanup.resolve();
    await first;
    await second.execute(input);
    assert.equal(f.sessions[2].workspacePath, f.sessions[0].workspacePath);
    assert.equal(f.projectSaves.length, 2);
  } finally {
    await f.close();
  }
});

test("UNKNOWN cleanup quarantines a slot across bridge recreation", async () => {
  const f = await fixture({ failFirstCleanup: true });
  try {
    const first = f.makeBridge();
    assert.equal((await first.execute(input)).text, "done", "cleanup must preserve an answer");
    await first.close();
    const second = f.makeBridge();
    await second.execute(input);
    assert.notEqual(f.sessions[1].workspacePath, f.sessions[0].workspacePath);
    await second.execute(input);
    assert.equal(f.sessions[2].workspacePath, f.sessions[1].workspacePath);
    assert.equal(f.projectSaves.length, 2, "the unknown slot must never return to the free pool");
  } finally {
    await f.close();
  }
});

test("negative close acknowledgement does not release a reusable slot", async () => {
  const f = await fixture({ rejectFirstClose: true });
  try {
    const first = f.makeBridge();
    await first.execute(input);
    await first.close();
    await f.makeBridge().execute(input);
    assert.notEqual(f.sessions[0].workspacePath, f.sessions[1].workspacePath);
    assert.equal(f.projectSaves.length, 2);
  } finally {
    await f.close();
  }
});

test("an unknown createSession outcome cannot hand its slot to a recreated bridge", async () => {
  const f = await fixture({ unknownFirstCreate: true });
  try {
    const first = f.makeBridge();
    await assert.rejects(first.execute(input), /createSession result UNKNOWN/);
    await first.close();
    const second = f.makeBridge();
    await second.execute(input);
    assert.notEqual(f.sessions[0].workspacePath, f.sessions[1].workspacePath);
    await second.execute(input);
    assert.equal(f.sessions[2].workspacePath, f.sessions[1].workspacePath);
    assert.equal(f.projectSaves.length, 2);
  } finally {
    await f.close();
  }
});

test("workspace reuse remains opt-in and default workspaces are removed", async () => {
  const f = await fixture({ reuse: false });
  try {
    const bridge = f.makeBridge();
    await bridge.execute(input);
    await bridge.execute(input);
    assert.notEqual(f.sessions[0].workspacePath, f.sessions[1].workspacePath);
    assert.equal(f.projectSaves.length, 2);
    assert.equal(f.projectReads.length, 0);
    assert.deepEqual(await readdir(f.root), []);
  } finally {
    await f.close();
  }
});
