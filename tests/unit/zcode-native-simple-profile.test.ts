// LHC:COVERS open-sse/executors/zcode.ts
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createTempDataDir } from "../_setup/tempDataDir.ts";
import type { ExecuteInput, ProviderCredentials } from "../../open-sse/executors/base.ts";
import type { ZcodeExecutorOptions } from "../../open-sse/executors/zcode.ts";
import type { ZcodeCallOptions } from "../../open-sse/executors/zcodeProtocol.ts";

const { dir, cleanup } = createTempDataDir("native-simple-profile-");
const previousTransport = process.env.ZCODE_TRANSPORT;
process.env.ZCODE_TRANSPORT = "native-host";
const { ZcodeExecutor } = await import("../../open-sse/executors/zcode.ts");
const { NativeZcodeHostClient } =
  await import("../../open-sse/executors/zcode/nativeHostClient.ts");
const { NativeZcodeSessionBridge } =
  await import("../../open-sse/executors/zcode/nativeSession.ts");
const { nativeZcodeHosts, nativeAccountFromCredentials } =
  await import("../../open-sse/executors/zcode/nativeHostManager.ts");
test.after(async () => {
  if (previousTransport === undefined) delete process.env.ZCODE_TRANSPORT;
  else process.env.ZCODE_TRANSPORT = previousTransport;
  await cleanup();
});

type RecordValue = Record<string, unknown>;
type Call = { channel: string; method: string; args: unknown[]; options?: ZcodeCallOptions };
const body = { messages: [{ role: "user", content: "Reply" }] };
type BridgeInput = Parameters<InstanceType<typeof NativeZcodeSessionBridge>["execute"]>[0];
type BridgeOptions = ConstructorParameters<typeof NativeZcodeSessionBridge>[0] & {
  reuseWorkspaces?: boolean;
};
let sequence = 0;
function fixture(
  t: TestContext,
  options: {
    generate?: (params: RecordValue) => Promise<unknown>;
    close?: () => Promise<void>;
    getViewError?: Error;
    bridge?: (params: BridgeInput) => Promise<RecordValue>;
    ensure?: (credentials: ProviderCredentials) => Promise<void>;
    start?: (options?: ZcodeCallOptions) => Promise<void>;
    getView?: () => Promise<void>;
  } = {}
) {
  const serverRoot = join(dir, String(sequence++), ".zcode", "server");
  const calls: Call[] = [];
  const ensuredCredentials: ProviderCredentials[] = [];
  const bridgeOptions: BridgeOptions[] = [];
  let bridgeCalls = 0;
  t.mock.method(nativeZcodeHosts, "ensure", async (credentials: ProviderCredentials) => {
    ensuredCredentials.push(credentials);
    await options.ensure?.(credentials);
    return serverRoot;
  });
  t.mock.method(NativeZcodeHostClient.prototype, "start", options.start || (async () => {}));
  t.mock.method(NativeZcodeHostClient.prototype, "close", options.close || (async () => {}));
  t.mock.method(
    NativeZcodeSessionBridge.prototype,
    "execute",
    async function (params: BridgeInput) {
      bridgeCalls++;
      bridgeOptions.push((this as unknown as { options: BridgeOptions }).options);
      if (options.bridge) return options.bridge(params);
      throw new Error("Session bridge is forbidden for the simple profile");
    }
  );
  t.mock.method(
    NativeZcodeHostClient.prototype,
    "call",
    async (channel: string, method: string, args: unknown[], callOptions?: ZcodeCallOptions) => {
      calls.push({ channel, method, args, options: callOptions });
      if (method === "getView") {
        await options.getView?.();
        if (options.getViewError) throw options.getViewError;
        return {
          providers: ["zai", "bigmodel"].flatMap((family) =>
            ["start-plan", "individual-coding-plan"].map((plan) => ({
              providerId: `account:${family}-${plan}`,
              models: [
                {
                  modelId: "GLM-5.3-Flash",
                  config: {
                    optionSpecs: {
                      reasoningLevel: { values: ["low", "high"] },
                      maxOutputTokens: { max: 64000 },
                    },
                  },
                },
              ],
            }))
          ),
        };
      }
      assert.equal(channel, "zcode-agent");
      assert.equal(method, "generateWorkspaceText", "no project/session/MCP RPC is allowed");
      return options.generate
        ? options.generate(args[0] as RecordValue)
        : { text: "ready", finishReason: "stop" };
    }
  );
  return {
    serverRoot,
    calls,
    ensuredCredentials,
    bridgeOptions,
    bridgeCalls: () => bridgeCalls,
    async execute(
      requestBody: RecordValue = body,
      overrides: Partial<ExecuteInput> = {},
      executorOptions: ZcodeExecutorOptions = {}
    ) {
      const result = await new ZcodeExecutor({
        provider: "zcode-individual",
        ...executorOptions,
      }).execute({
        model: "glm-5.3-flash",
        body: requestBody,
        stream: false,
        credentials: {
          connectionId: "fixture",
          authType: "oauth",
          providerSpecificData: { family: "zai" },
        },
        ...overrides,
      });
      const response = "response" in result ? result.response : result;
      return { result, response, json: await response.json() };
    },
  };
}

for (const provider of ["zcode-start", "zcode-individual"]) {
  for (const connectionId of ["assigned-account", undefined]) {
    test(`non-OAuth ${provider} accepts the original ${connectionId ?? "noauth"} host binding without ensure`, async (t) => {
      const f = fixture(t, { bridge: async () => ({ text: "assigned-host-ready" }) });
      const previousRoot = process.env.ZCODE_NATIVE_SERVER_ROOT;
      const previousId = process.env.ZCODE_NATIVE_CONNECTION_ID;
      t.after(() => {
        if (previousRoot === undefined) delete process.env.ZCODE_NATIVE_SERVER_ROOT;
        else process.env.ZCODE_NATIVE_SERVER_ROOT = previousRoot;
        if (previousId === undefined) delete process.env.ZCODE_NATIVE_CONNECTION_ID;
        else process.env.ZCODE_NATIVE_CONNECTION_ID = previousId;
      });
      process.env.ZCODE_NATIVE_SERVER_ROOT = f.serverRoot;
      process.env.ZCODE_NATIVE_CONNECTION_ID = connectionId || "noauth";
      const credentials = Object.freeze(connectionId ? { connectionId } : {});
      const result = await f.execute(body, { credentials }, { provider });
      assert.equal(result.response.status, 200);
      assert.equal(f.ensuredCredentials.length, 0);
      assert.deepEqual(credentials, connectionId ? { connectionId } : {});
      assert.deepEqual(
        f.calls.map((call) => call.method),
        provider.endsWith("individual") ? ["getView", "generateWorkspaceText"] : ["getView"]
      );
      if (provider.endsWith("individual")) {
        const params = f.calls[1].args[0] as RecordValue;
        assert.equal(params.workspacePath, join(f.serverRoot, "model-workspace"));
      } else {
        assert.equal(result.json.choices[0].message.content, "assigned-host-ready");
        assert.equal(f.bridgeCalls(), 1);
        assert.equal(f.bridgeOptions[0].workspaceRoot, join(f.serverRoot, "caller-workspaces"));
      }
    });
  }
}

for (const provider of ["zcode-start", "zcode-individual"]) {
  for (const connectionId of [undefined, ""]) {
    test(`OAuth ${provider} keeps ${connectionId === undefined ? "missing" : "empty"} connection ID subject to complete-login validation`, async (t) => {
      const f = fixture(t, {
        ensure: async (credentials) => {
          nativeAccountFromCredentials(credentials);
        },
        bridge: async () => ({ text: "unexpected" }),
      });
      const credentials = Object.freeze({
        connectionId,
        authType: "oauth",
        accessToken: "fixture-access",
        idToken: "fixture-id",
        providerSpecificData: { family: "zai", userId: "fixture-user" },
      });
      const result = await f.execute(body, { credentials }, { provider });
      assert.equal(result.response.status, 401);
      assert.equal(f.ensuredCredentials[0].connectionId, connectionId);
      assert.equal(credentials.connectionId, connectionId);
      assert.deepEqual(f.calls, []);
      assert.equal(f.bridgeCalls(), 0);
    });
  }
  for (const binding of [
    "other-account",
    `assigned-account:${provider.endsWith("individual") ? "plain-individual" : "plain-start"}`,
  ]) {
    test(`non-OAuth ${provider} rejects an env binding other than the original ID: ${binding}`, async (t) => {
      const f = fixture(t, { bridge: async () => ({ text: "unexpected" }) });
      const previousRoot = process.env.ZCODE_NATIVE_SERVER_ROOT;
      const previousId = process.env.ZCODE_NATIVE_CONNECTION_ID;
      t.after(() => {
        if (previousRoot === undefined) delete process.env.ZCODE_NATIVE_SERVER_ROOT;
        else process.env.ZCODE_NATIVE_SERVER_ROOT = previousRoot;
        if (previousId === undefined) delete process.env.ZCODE_NATIVE_CONNECTION_ID;
        else process.env.ZCODE_NATIVE_CONNECTION_ID = previousId;
      });
      process.env.ZCODE_NATIVE_SERVER_ROOT = f.serverRoot;
      process.env.ZCODE_NATIVE_CONNECTION_ID = binding;
      const result = await f.execute(
        body,
        { credentials: { connectionId: "assigned-account" } },
        { provider }
      );
      assert.equal(result.response.status, 503);
      assert.equal(f.ensuredCredentials.length, 0);
      assert.deepEqual(f.calls, []);
      assert.equal(f.bridgeCalls(), 0);
    });
  }
}

for (const cancellation of ["deadline", "caller-abort"] as const) {
  test(`completed Start answer survives ${cancellation} while the bridge finishes cleanup`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
    const controller = new AbortController();
    let answerReady!: () => void;
    const ready = new Promise<void>((resolve) => {
      answerReady = resolve;
    });
    let finishCleanup!: () => void;
    const cleanup = new Promise<void>((resolve) => {
      finishCleanup = resolve;
    });
    const f = fixture(t, {
      bridge: async () => {
        answerReady();
        await cleanup;
        return { text: "ready-before-cleanup", usage: { inputTokens: 20, outputTokens: 3 } };
      },
    });
    const operation = f.execute(
      body,
      { signal: controller.signal },
      { provider: "zcode-start", turnTimeoutMs: 1000 }
    );
    try {
      await ready;
      if (cancellation === "deadline") t.mock.timers.tick(1001);
      else controller.abort();
      finishCleanup();
      const result = await operation;
      assert.equal(result.response.status, 200);
      assert.equal(result.json.choices[0].message.content, "ready-before-cleanup");
      assert.equal(result.json.usage.completion_tokens, 3);
    } finally {
      finishCleanup();
      await operation;
    }
  });
}

test("simple native profile returns tools and accepts caller tool results without sessions or projects", async (t) => {
  let turn = 0;
  const f = fixture(t, {
    generate: async () =>
      ++turn === 1
        ? {
            text: "",
            finishReason: "tool-calls",
            toolCalls: [{ id: "call_plain", name: "echo", input: { value: 7 } }],
            usage: { inputTokens: 100, outputTokens: 5 },
          }
        : {
            text: "caller-result",
            finishReason: "stop",
            usage: { inputTokens: 110, outputTokens: 4 },
          },
  });
  const tools = [{ type: "function", function: { name: "echo", parameters: { type: "object" } } }];
  const firstBody = { ...body, tools, max_tokens: 999999 };
  const first = await f.execute(firstBody);
  assert.equal(first.response.status, 200);
  assert.equal(first.json.choices[0].finish_reason, "tool_calls");
  const call = first.json.choices[0].message.tool_calls[0];
  const secondBody = {
    tools,
    messages: [
      ...body.messages,
      { role: "assistant", content: "", tool_calls: [call] },
      { role: "tool", tool_call_id: call.id, content: "caller-result" },
    ],
  };
  const second = await f.execute(secondBody);
  assert.equal(second.response.status, 200);
  assert.equal(second.json.choices[0].message.content, "caller-result");
  assert.equal(second.json.usage.prompt_tokens, 110);
  const generated = f.calls.filter((call) => call.method === "generateWorkspaceText");
  assert.equal(generated.length, 2);
  const initial = generated[0].args[0] as RecordValue;
  const continued = generated[1].args[0] as RecordValue;
  assert.deepEqual(initial.tools, [{ name: "echo", inputSchema: { type: "object" } }]);
  assert.deepEqual(continued.messages, [
    ...body.messages,
    {
      role: "assistant",
      content: "",
      toolCalls: [{ id: "call_plain", name: "echo", input: { value: 7 } }],
    },
    { role: "tool", content: "caller-result", toolCallId: "call_plain", toolName: "echo" },
  ]);
  assert.equal(initial.querySource, "omniroute");
  assert.equal(initial.maxOutputTokens, 64000);
  assert.equal(continued.maxOutputTokens, 64000);
  assert.equal(initial.workspacePath, continued.workspacePath);
  assert.equal(initial.workspaceIdentity, initial.workspacePath);
  assert.equal((await stat(String(initial.workspacePath))).mode & 0o777, 0o700);
  assert.deepEqual(await readdir(String(initial.workspacePath)), []);
  assert.equal(f.bridgeCalls(), 0);
  assert.deepEqual(
    f.calls.map((call) => call.method),
    ["getView", "generateWorkspaceText", "getView", "generateWorkspaceText"]
  );
  assert.equal("transformedBody" in second.result && second.result.transformedBody, secondBody);
});

test("CLI profile is written and read back before boot with MCP/plugins/hooks/memory/subagent disabled", async (t) => {
  const f = fixture(t);
  const path = join(f.serverRoot, "..", "cli", "config.json");
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(
    path,
    JSON.stringify({
      unrelated: "keep",
      features: { mcp: true, memory: true, subagent: true, other: true },
      mcp: { servers: { foreign: {} } },
      plugins: { enabled: true },
      hooks: { enabled: true },
    })
  );
  t.mock.method(NativeZcodeHostClient.prototype, "start", async () => {
    const config = JSON.parse(await readFile(path, "utf8"));
    assert.deepEqual(config.features, { mcp: false, memory: false, subagent: false, other: true });
    assert.deepEqual(config.mcp.servers, {});
    assert.equal(config.plugins.enabled, false);
    assert.equal(config.hooks.enabled, false);
    assert.equal(config.unrelated, "keep");
    assert.equal((await stat(path)).mode & 0o777, 0o600);
  });
  const result = await f.execute();
  assert.equal(result.response.status, 200);
  assert.equal(f.bridgeCalls(), 0);
});

for (const [family, provider] of [
  ["zai", "zcode-individual"],
  ["bigmodel", "zcode-cn-individual"],
] as const) {
  test(`simple profile pins ${provider} and isolates its local connection without changing credentials`, async (t) => {
    const f = fixture(t);
    const credentials = Object.freeze({
      connectionId: "fixture",
      authType: "oauth",
      providerSpecificData: Object.freeze({ family }),
    });
    const result = await f.execute(body, { credentials }, { provider });
    assert.equal(result.response.status, 200);
    assert.equal("transport" in result.result && result.result.transport, "local-zcode-model");
    assert.equal(f.bridgeCalls(), 0);
    assert.equal(f.ensuredCredentials.length, 1);
    assert.deepEqual(f.ensuredCredentials[0], {
      ...credentials,
      connectionId: "fixture:plain-individual",
    });
    assert.notEqual(f.ensuredCredentials[0], credentials);
    assert.equal(credentials.connectionId, "fixture");
    const params = f.calls.find((call) => call.method === "generateWorkspaceText")!
      .args[0] as RecordValue;
    assert.equal(
      (params.selection as RecordValue).providerId,
      `account:${family}-individual-coding-plan`
    );
    assert.equal(((params.selection as RecordValue).options as RecordValue).reasoningLevel, "high");
  });
}

for (const [family, provider] of [
  ["zai", "zcode-start"],
  ["bigmodel", "zcode-cn-start"],
] as const) {
  test(`${provider} isolates a clean profile while retaining original coding-session scope`, async (t) => {
    const bridgeInputs: BridgeInput[] = [];
    const f = fixture(t, {
      bridge: async (params) => {
        bridgeInputs.push(params);
        return { text: "legacy-ready", finishReason: "stop" };
      },
    });
    const credentials = Object.freeze({
      connectionId: "fixture",
      authType: "oauth",
      providerSpecificData: Object.freeze({ family }),
    });
    const configPath = join(f.serverRoot, "..", "cli", "config.json");
    const existing = JSON.stringify({
      features: { mcp: true, memory: true, subagent: true },
      mcp: { servers: { existing: {} } },
      plugins: { enabled: true },
      hooks: { enabled: true },
      unrelated: "keep",
    });
    await mkdir(join(configPath, ".."), { recursive: true });
    await writeFile(configPath, existing);
    const result = await f.execute(body, { credentials }, { provider });
    assert.equal(result.response.status, 200);
    assert.equal(result.json.choices[0].message.content, "legacy-ready");
    assert.equal("transport" in result.result && result.result.transport, "local-zcode-session");
    assert.equal("url" in result.result && result.result.url, "zcode://native-host/session");
    assert.equal(f.bridgeCalls(), 1);
    assert.deepEqual(bridgeInputs[0].selection, {
      providerId: `account:${family}-start-plan`,
      modelId: "GLM-5.3-Flash",
      options: { reasoningLevel: "high" },
    });
    assert.deepEqual(bridgeInputs[0].messages, body.messages);
    assert.match(bridgeInputs[0].scope, new RegExp(`^fixture:account:${family}-start-plan:`));
    assert.deepEqual(f.ensuredCredentials[0], {
      ...credentials,
      connectionId: "fixture:plain-start",
    });
    assert.notEqual(f.ensuredCredentials[0], credentials);
    assert.equal(credentials.connectionId, "fixture");
    assert.equal(f.bridgeOptions[0].workspaceRoot, join(f.serverRoot, "caller-workspaces"));
    assert.equal(f.bridgeOptions[0].reuseWorkspaces, true);
    assert.deepEqual(
      f.calls.map((call) => call.method),
      ["getView"]
    );
    const saved = JSON.parse(await readFile(configPath, "utf8"));
    assert.deepEqual(saved.features, { mcp: false, memory: false, subagent: false });
    assert.deepEqual(saved.mcp.servers, {});
    assert.equal(saved.plugins.enabled, false);
    assert.equal(saved.hooks.enabled, false);
    assert.equal(saved.unrelated, "keep");
    await assert.rejects(stat(join(f.serverRoot, "model-workspace")), { code: "ENOENT" });
  });
}

test("Start CLI config is clean before materialization and bridge execution", async (t) => {
  let atBoot: RecordValue | undefined;
  const f = fixture(t, {
    start: async () => {
      const path = join(f.serverRoot, "..", "cli", "config.json");
      atBoot = JSON.parse(await readFile(path, "utf8"));
    },
    bridge: async () => ({ text: "ready" }),
  });
  const path = join(f.serverRoot, "..", "cli", "config.json");
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(path, JSON.stringify({ features: { mcp: true }, plugins: { enabled: true } }));
  const result = await f.execute(body, {}, { provider: "zcode-start" });
  assert.equal(result.response.status, 200);
  assert.deepEqual(atBoot?.features, { mcp: false, subagent: false, memory: false });
  assert.deepEqual(atBoot?.mcp, { servers: {} });
  assert.deepEqual(atBoot?.plugins, { enabled: false });
  assert.deepEqual(atBoot?.hooks, { enabled: false });
});

test("Start start/getView/bridge share one deadline and cancellation signal", async (t) => {
  const controller = new AbortController();
  let now = 1000;
  t.mock.method(Date, "now", () => now);
  let startedWith: ZcodeCallOptions | undefined;
  let bridgeInput: BridgeInput | undefined;
  const f = fixture(t, {
    ensure: async () => {
      now += 25;
    },
    start: async (options) => {
      startedWith = options;
      now += 40;
    },
    getView: async () => {
      now += 60;
    },
    bridge: async (params) => {
      bridgeInput = params;
      return { text: "ready" };
    },
  });
  const result = await f.execute(
    body,
    { signal: controller.signal },
    { provider: "zcode-start", turnTimeoutMs: 500 }
  );
  assert.equal(result.response.status, 200);
  assert.equal(startedWith?.timeoutMs, 475);
  const view = f.calls.find((call) => call.method === "getView")!;
  assert.equal(view.options?.timeoutMs, 435);
  assert.equal(bridgeInput?.deadline, 1500);
  assert.equal(bridgeInput?.signal, controller.signal);
  assert.equal(startedWith?.signal, view.options?.signal);
  assert.equal(bridgeInput?.signal?.aborted, false);
});

for (const [kind, error, status, code] of [
  [
    "quota",
    Object.assign(new Error("native quota"), { providerCode: 1310 }),
    429,
    "insufficient_quota",
  ],
  ["error", new Error("original native fault"), 502, "bad_gateway"],
] as const) {
  test(`late cleanup abort preserves already received ${kind}`, async (t) => {
    const controller = new AbortController();
    const f = fixture(t, {
      generate: async () => {
        throw error;
      },
      close: async () => {
        controller.abort();
        await new Promise((resolve) => setTimeout(resolve, 5));
      },
    });
    const result = await f.execute(body, { signal: controller.signal });
    assert.equal(result.response.status, status);
    assert.equal(result.json.error.code, code);
    assert.equal(result.json.notSubmitted, undefined);
    if (kind === "error") assert.match(result.json.error.message, /original native fault/);
  });
}

test("a completed text survives a late cleanup abort", async (t) => {
  const controller = new AbortController();
  const f = fixture(t, {
    close: async () => {
      controller.abort();
    },
  });
  const result = await f.execute(body, { signal: controller.signal });
  assert.equal(result.response.status, 200);
  assert.equal(result.json.choices[0].message.content, "ready");
});

test("provider route rejection is request-scoped and cannot ban a shared account", async (t) => {
  const f = fixture(t, {
    generate: async () => {
      throw Object.assign(new Error("safe blocked route"), { providerReason: "unusual_activity" });
    },
  });
  const result = await f.execute();
  assert.equal(result.response.status, 502);
  assert.equal(result.json.error.code, "upstream_response_failed");
  assert.equal(result.json.error.type, "upstream_response_failed");
  assert.equal(
    result.json.error.message,
    "ZCode text-generation request context was rejected by upstream"
  );
  assert.equal(result.json.notSubmitted, undefined);
  const { isRequestScopedUpstreamFailure } =
    await import("../../open-sse/services/combo/comboPredicates.ts");
  assert.equal(isRequestScopedUpstreamFailure(result.json.error), true);
});

test("an unconfirmed native RPC business code is not enough to claim exhausted quota", async (t) => {
  const f = fixture(t, {
    generate: async () => {
      throw Object.assign(new Error("ZCode host request failed"), { providerCode: 1005 });
    },
  });
  const result = await f.execute();
  assert.equal(result.response.status, 502);
  assert.equal(result.json.error.code, "bad_gateway");
});

// Real Start RPC cancellation/deadlines are covered by zcode-native-timeout.test.ts.
// Its bridge owns the deadline and the ready-answer cleanup shield.
for (const provider of ["zcode-individual"])
  for (const mode of ["abort", "deadline"] as const) {
    test(`${provider} observes ${mode} while awaiting generation or its coding bridge`, async (t) => {
      const controller = new AbortController();
      let entered: () => void;
      const reached = new Promise<void>((resolve) => {
        entered = resolve;
      });
      let release: ((value: RecordValue) => void) | undefined;
      const stall = async () => {
        entered();
        return new Promise<RecordValue>((resolve) => {
          release = resolve;
        });
      };
      const f = fixture(t, { generate: stall, bridge: stall });
      const operation = f.execute(
        body,
        { signal: controller.signal },
        { provider, turnTimeoutMs: mode === "deadline" ? 100 : 1000 }
      );
      let guard: ReturnType<typeof setTimeout> | undefined;
      try {
        await Promise.race([
          reached,
          operation.then(() => {
            throw new Error("generation RPC never started");
          }),
        ]);
        if (mode === "abort") controller.abort();
        const result = await Promise.race([
          operation,
          new Promise<never>((_resolve, reject) => {
            guard = setTimeout(() => reject(new Error("RPC did not observe cancellation")), 500);
          }),
        ]);
        assert.equal(result.response.status, mode === "abort" ? 499 : 504);
      } finally {
        clearTimeout(guard);
        release?.({ text: "late" });
        await operation;
      }
    });
  }
