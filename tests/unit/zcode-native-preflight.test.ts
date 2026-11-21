// LHC:COVERS open-sse/executors/zcode.ts
import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { createTempDataDir } from "../_setup/tempDataDir.ts";
import { NativeZcodeHostClient } from "../../open-sse/executors/zcode/nativeHostClient.ts";
import { nativeZcodeHosts } from "../../open-sse/executors/zcode/nativeHostManager.ts";
import { ZcodeExecutor } from "../../open-sse/executors/zcode.ts";
import type { ZcodeCallOptions } from "../../open-sse/executors/zcodeProtocol.ts";

const { cleanup, dir: dataDir } = createTempDataDir("zcode-preflight-");
const serverRoot = join(dataDir, ".zcode", "server");
test.after(cleanup);
const input = {
  model: "glm-5.3-flash",
  body: { messages: [{ role: "user", content: "Reply" }] },
  stream: false,
  credentials: { connectionId: "fixture", authType: "oauth" },
};
const view = {
  providers: [
    {
      providerId: "account:zai-individual-coding-plan",
      models: [{ modelId: "GLM-5.3-Flash", config: {} }],
    },
  ],
};

for (const phase of ["ensure", "start", "getView"] as const) {
  test(`caller abort interrupts native preflight ${phase}`, async (t) => {
    const controller = new AbortController();
    let release: (() => void) | undefined;
    let entered: () => void;
    const reached = new Promise<void>((resolve) => {
      entered = resolve;
    });
    const stall = () => {
      entered();
      return new Promise<void>((resolve) => {
        release = resolve;
      });
    };
    t.mock.method(nativeZcodeHosts, "ensure", async () => {
      if (phase === "ensure") await stall();
      return serverRoot;
    });
    t.mock.method(NativeZcodeHostClient.prototype, "start", async () => {
      if (phase === "start") await stall();
    });
    t.mock.method(NativeZcodeHostClient.prototype, "call", async () => {
      if (phase === "getView") await stall();
      return view;
    });
    let closed = 0;
    t.mock.method(NativeZcodeHostClient.prototype, "close", async () => {
      closed++;
    });
    const operation = new ZcodeExecutor({ provider: "zcode-individual" }).execute({
      ...input,
      signal: controller.signal,
    });
    let guard: ReturnType<typeof setTimeout> | undefined;
    try {
      await reached;
      controller.abort();
      const result = await Promise.race([
        operation,
        new Promise<never>((_resolve, reject) => {
          guard = setTimeout(() => reject(new Error("preflight ignored caller abort")), 150);
        }),
      ]);
      const response = "response" in result ? result.response : result;
      assert.equal(response.status, 499);
      if (phase !== "ensure") assert.equal(closed, 1);
    } finally {
      clearTimeout(guard);
      release?.();
      await operation;
    }
  });
}

test("native getView and generation share the same turn deadline", async (t) => {
  t.mock.method(nativeZcodeHosts, "ensure", async () => serverRoot);
  t.mock.method(NativeZcodeHostClient.prototype, "start", async () => {});
  t.mock.method(NativeZcodeHostClient.prototype, "close", async () => {});
  let remaining: number | undefined;
  let requestTimeout: unknown;
  t.mock.method(
    NativeZcodeHostClient.prototype,
    "call",
    async (_channel: string, method: string, args: unknown[], options?: ZcodeCallOptions) => {
      if (method === "getView") {
        await new Promise((resolve) => setTimeout(resolve, 40));
        return view;
      }
      assert.equal(method, "generateWorkspaceText");
      remaining = options?.timeoutMs;
      requestTimeout = (args[0] as Record<string, unknown>).requestTimeoutMs;
      return { text: "ready" };
    }
  );
  const result = await new ZcodeExecutor({
    provider: "zcode-individual",
    turnTimeoutMs: 500,
  }).execute(input);
  assert.equal(("response" in result ? result.response : result).status, 200);
  assert.ok(remaining !== undefined && remaining > 0 && remaining <= 470);
  assert.ok(
    typeof requestTimeout === "number" && requestTimeout >= remaining && requestTimeout <= 470
  );
});

test("native preflight deadline expires while getView is awaiting a reply", async (t) => {
  t.mock.method(nativeZcodeHosts, "ensure", async () => serverRoot);
  t.mock.method(NativeZcodeHostClient.prototype, "start", async () => {});
  t.mock.method(NativeZcodeHostClient.prototype, "close", async () => {});
  let release: ((value: unknown) => void) | undefined;
  t.mock.method(
    NativeZcodeHostClient.prototype,
    "call",
    () =>
      new Promise((resolve) => {
        release = resolve;
      })
  );
  const operation = new ZcodeExecutor({ provider: "zcode-individual", turnTimeoutMs: 30 }).execute(
    input
  );
  let guard: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      operation,
      new Promise<never>((_resolve, reject) => {
        guard = setTimeout(() => reject(new Error("preflight ignored the turn deadline")), 150);
      }),
    ]);
    assert.equal(("response" in result ? result.response : result).status, 504);
  } finally {
    clearTimeout(guard);
    release?.(view);
    await operation;
  }
});

test("startup uses the supplied remaining budget and accepts a delayed handshake", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  const client = new NativeZcodeHostClient({ serverRoot: "unused" });
  const internal = client as unknown as { open(): Promise<void>; readyResolve?: () => void };
  t.mock.method(internal, "open", async () => {
    setTimeout(() => internal.readyResolve?.(), 11_000);
  });
  const response = client.start({ timeoutMs: 20_000 }).then(
    () => "ready",
    (error: unknown) => error
  );
  try {
    t.mock.timers.tick(11_000);
    assert.equal(await response, "ready");
  } finally {
    await client.close();
  }
});

for (const [field, code] of [
  ["code", "model_request_cancelled"],
  ["providerCode", "model_request_cancelled"],
  ["code", "unknown_cancelled"],
] as const) {
  test(`native cancellation classification is exact: ${field}=${code}`, async (t) => {
    t.mock.method(nativeZcodeHosts, "ensure", async () => serverRoot);
    t.mock.method(NativeZcodeHostClient.prototype, "start", async () => {});
    t.mock.method(NativeZcodeHostClient.prototype, "close", async () => {});
    t.mock.method(
      NativeZcodeHostClient.prototype,
      "call",
      async (_channel: string, method: string) => {
        if (method === "getView") return view;
        assert.equal(method, "generateWorkspaceText");
        throw Object.assign(
          new Error("ZCode host request failed (rpc=zcode-agent.generateWorkspaceText)"),
          { [field]: code }
        );
      }
    );
    const result = await new ZcodeExecutor({ provider: "zcode-individual" }).execute(input);
    const response = "response" in result ? result.response : result;
    const body = await response.json();
    assert.equal(response.status, 502);
    assert.equal(
      body.error.code,
      code === "model_request_cancelled" ? "upstream_request_cancelled" : "bad_gateway"
    );
    assert.equal(body.notSubmitted, undefined, "native failures never imply safe replay");
    assert.equal(body.error.notSubmitted, undefined);
  });
}
